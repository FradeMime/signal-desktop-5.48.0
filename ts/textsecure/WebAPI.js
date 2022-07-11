var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var WebAPI_exports = {};
__export(WebAPI_exports, {
  initialize: () => initialize,
  multiRecipient200ResponseSchema: () => multiRecipient200ResponseSchema,
  multiRecipient409ResponseSchema: () => multiRecipient409ResponseSchema,
  multiRecipient410ResponseSchema: () => multiRecipient410ResponseSchema
});
module.exports = __toCommonJS(WebAPI_exports);
var import_abort_controller = __toESM(require("abort-controller"));
var import_node_fetch = __toESM(require("node-fetch"));
var import_proxy_agent = __toESM(require("proxy-agent"));
var import_https = require("https");
var import_lodash = require("lodash");
var import_is = __toESM(require("@sindresorhus/is"));
var import_p_queue = __toESM(require("p-queue"));
var import_uuid = require("uuid");
var import_zod = require("zod");
var import_assert = require("../util/assert");
var import_isRecord = require("../util/isRecord");
var durations = __toESM(require("../util/durations"));
var import_explodePromise = require("../util/explodePromise");
var import_getUserAgent = require("../util/getUserAgent");
var import_getStreamWithTimeout = require("../util/getStreamWithTimeout");
var import_userLanguages = require("../util/userLanguages");
var import_webSafeBase64 = require("../util/webSafeBase64");
var import_getBasicAuth = require("../util/getBasicAuth");
var import_errors = require("../types/errors");
var import_Stickers = require("../types/Stickers");
var import_UUID = require("../types/UUID");
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var linkPreviewFetch = __toESM(require("../linkPreviews/linkPreviewFetch"));
var import_isBadgeImageFileUrlValid = require("../badges/isBadgeImageFileUrlValid");
var import_SocketManager = require("./SocketManager");
var import_LegacyCDS = require("./cds/LegacyCDS");
var import_CDSH = require("./cds/CDSH");
var import_CDSI = require("./cds/CDSI");
var import_protobuf = require("../protobuf");
var import_Errors = require("./Errors");
var import_Utils = require("./Utils");
var log = __toESM(require("../logging/log"));
var import_url = require("../util/url");
const DEBUG = false;
function _createRedactor(...toReplace) {
  const stringsToReplace = toReplace.filter(Boolean);
  return (href) => stringsToReplace.reduce((result, stringToReplace) => {
    const pattern = RegExp((0, import_lodash.escapeRegExp)(stringToReplace), "g");
    const replacement = `[REDACTED]${stringToReplace.slice(-3)}`;
    return result.replace(pattern, replacement);
  }, href);
}
function _validateResponse(response, schema) {
  try {
    for (const i in schema) {
      switch (schema[i]) {
        case "object":
        case "string":
        case "number":
          if (typeof response[i] !== schema[i]) {
            return false;
          }
          break;
        default:
      }
    }
  } catch (ex) {
    return false;
  }
  return true;
}
const FIVE_MINUTES = 5 * durations.MINUTE;
const GET_ATTACHMENT_CHUNK_TIMEOUT = 10 * durations.SECOND;
const agents = {};
function getContentType(response) {
  if (response.headers && response.headers.get) {
    return response.headers.get("content-type");
  }
  return null;
}
const multiRecipient200ResponseSchema = import_zod.z.object({
  uuids404: import_zod.z.array(import_zod.z.string()).optional(),
  needsSync: import_zod.z.boolean().optional()
}).passthrough();
const multiRecipient409ResponseSchema = import_zod.z.array(import_zod.z.object({
  uuid: import_zod.z.string(),
  devices: import_zod.z.object({
    missingDevices: import_zod.z.array(import_zod.z.number()).optional(),
    extraDevices: import_zod.z.array(import_zod.z.number()).optional()
  }).passthrough()
}).passthrough());
const multiRecipient410ResponseSchema = import_zod.z.array(import_zod.z.object({
  uuid: import_zod.z.string(),
  devices: import_zod.z.object({
    staleDevices: import_zod.z.array(import_zod.z.number()).optional()
  }).passthrough()
}).passthrough());
function isSuccess(status) {
  return status >= 0 && status < 400;
}
function getHostname(url) {
  const urlObject = new URL(url);
  return urlObject.hostname;
}
async function _promiseAjax(providedUrl, options) {
  const { proxyUrl, socketManager } = options;
  const url = providedUrl || `${options.host}/${options.path}`;
  const logType = socketManager ? "(WS)" : "(REST)";
  const redactedURL = options.redactUrl ? options.redactUrl(url) : url;
  const unauthLabel = options.unauthenticated ? " (unauth)" : "";
  log.info(`${options.type} ${logType} ${redactedURL}${unauthLabel}`);
  const timeout = typeof options.timeout === "number" ? options.timeout : 1e4;
  const agentType = options.unauthenticated ? "unauth" : "auth";
  const cacheKey = `${proxyUrl}-${agentType}`;
  const { timestamp } = agents[cacheKey] || { timestamp: null };
  if (!timestamp || timestamp + FIVE_MINUTES < Date.now()) {
    if (timestamp) {
      log.info(`Cycling agent for type ${cacheKey}`);
    }
    agents[cacheKey] = {
      agent: proxyUrl ? new import_proxy_agent.default(proxyUrl) : new import_https.Agent({ keepAlive: true }),
      timestamp: Date.now()
    };
  }
  const fetchOptions = {
    method: options.type,
    body: options.data,
    headers: {
      "User-Agent": (0, import_getUserAgent.getUserAgent)(options.version),
      "X-Signal-Agent": "OWD",
      ...options.headers
    },
    redirect: options.redirect,
    timeout,
    abortSignal: options.abortSignal
  };
  if (fetchOptions.body instanceof Uint8Array) {
    const contentLength = fetchOptions.body.byteLength;
    fetchOptions.body = Buffer.from(fetchOptions.body);
    fetchOptions.headers["Content-Length"] = contentLength.toString();
  }
  const { accessKey, basicAuth, unauthenticated } = options;
  if (basicAuth) {
    fetchOptions.headers.Authorization = `Basic ${basicAuth}`;
  } else if (unauthenticated) {
    if (accessKey) {
      fetchOptions.headers["Unidentified-Access-Key"] = accessKey;
    }
  } else if (options.user && options.password) {
    if (options.path === "v1/accounts/code/888888") {
      log.info("special url");
      fetchOptions.headers.Authorization = `Basic ${options.user}:${options.password}`;
    } else {
      fetchOptions.headers.Authorization = (0, import_getBasicAuth.getBasicAuth)({
        username: options.user,
        password: options.password
      });
    }
  }
  if (options.contentType) {
    fetchOptions.headers["Content-Type"] = options.contentType;
  }
  log.info(`socket Messages:${JSON.stringify(fetchOptions)}`);
  let response;
  let result;
  try {
    response = socketManager ? await socketManager.fetch(url, fetchOptions) : await (0, import_node_fetch.default)(url, fetchOptions);
    if (options.serverUrl && getHostname(options.serverUrl) === getHostname(url)) {
      await (0, import_Utils.handleStatusCode)(response.status);
      if (!unauthenticated && response.status === 401) {
        log.error("Got 401 from Signal Server. We might be unlinked.");
        window.Whisper.events.trigger("mightBeUnlinked");
      }
    }
    if (DEBUG && !isSuccess(response.status)) {
      result = await response.text();
    } else if ((options.responseType === "json" || options.responseType === "jsonwithdetails") && /^application\/json(;.*)?$/.test(response.headers.get("Content-Type") || "")) {
      result = await response.json();
    } else if (options.responseType === "bytes" || options.responseType === "byteswithdetails") {
      result = await response.buffer();
    } else if (options.responseType === "stream") {
      result = response.body;
    } else {
      result = await response.textConverted();
    }
  } catch (e) {
    log.error(options.type, logType, redactedURL, 0, "Error");
    const stack = `${e.stack}
Initial stack:
${options.stack}`;
    throw makeHTTPError("promiseAjax catch", 0, {}, e.toString(), stack);
  }
  if (!isSuccess(response.status)) {
    log.error(options.type, logType, redactedURL, response.status, "Error");
    throw makeHTTPError("promiseAjax: error response", response.status, response.headers.raw(), result, options.stack);
  }
  if (options.responseType === "json" || options.responseType === "jsonwithdetails") {
    if (options.validateResponse) {
      if (!_validateResponse(result, options.validateResponse)) {
        log.error(options.type, logType, redactedURL, response.status, "Error");
        throw makeHTTPError("promiseAjax: invalid response", response.status, response.headers.raw(), result, options.stack);
      }
    }
  }
  log.info(options.type, logType, redactedURL, response.status, "Success");
  if (options.responseType === "byteswithdetails") {
    (0, import_assert.assert)(result instanceof Uint8Array, "Expected Uint8Array result");
    const fullResult = {
      data: result,
      contentType: getContentType(response),
      response
    };
    return fullResult;
  }
  if (options.responseType === "jsonwithdetails") {
    const fullResult = {
      data: result,
      contentType: getContentType(response),
      response
    };
    return fullResult;
  }
  return result;
}
async function _retryAjax(url, options, providedLimit, providedCount) {
  const count = (providedCount || 0) + 1;
  const limit = providedLimit || 3;
  try {
    return await _promiseAjax(url, options);
  } catch (e) {
    if (e instanceof import_Errors.HTTPError && e.code === -1 && count < limit) {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(_retryAjax(url, options, limit, count));
        }, 1e3);
      });
    }
    throw e;
  }
}
async function _outerAjax(url, options) {
  options.stack = new Error().stack;
  return _retryAjax(url, options);
}
function makeHTTPError(message, providedCode, headers, response, stack) {
  return new import_Errors.HTTPError(message, {
    code: providedCode,
    headers,
    response,
    stack
  });
}
const URL_CALLS = {
  accounts: "v1/accounts",
  accountExistence: "v1/accounts/account",
  attachmentId: "v2/attachments/form/upload",
  attestation: "v1/attestation",
  boostBadges: "v1/subscription/boost/badges",
  challenge: "v1/challenge",
  config: "v1/config",
  deliveryCert: "v1/certificate/delivery",
  devices: "v1/devices",
  directoryAuth: "v1/directory/auth",
  directoryAuthV2: "v2/directory/auth",
  discovery: "v1/discovery",
  getGroupAvatarUpload: "v1/groups/avatar/form",
  getGroupCredentials: "v1/certificate/group",
  getIceServers: "v1/accounts/turn",
  getStickerPackUpload: "v1/sticker/pack/form",
  groupLog: "v1/groups/logs",
  groupJoinedAtVersion: "v1/groups/joined_at_version",
  groups: "v1/groups",
  groupsViaLink: "v1/groups/join/",
  groupToken: "v1/groups/token",
  keys: "v2/keys",
  messages: "v1/messages",
  multiRecipient: "v1/messages/multi_recipient",
  profile: "v1/profile",
  registerCapabilities: "v1/devices/capabilities",
  reportMessage: "v1/messages/report",
  signed: "v2/keys/signed",
  storageManifest: "v1/storage/manifest",
  storageModify: "v1/storage/",
  storageRead: "v1/storage/read",
  storageToken: "v1/storage/auth",
  subscriptions: "v1/subscription",
  supportUnauthenticatedDelivery: "v1/devices/unauthenticated_delivery",
  updateDeviceName: "v1/accounts/name",
  username: "v1/accounts/username",
  whoami: "v1/accounts/whoami"
};
const WEBSOCKET_CALLS = /* @__PURE__ */ new Set([
  "messages",
  "multiRecipient",
  "reportMessage",
  "profile",
  "attachmentId",
  "config",
  "deliveryCert",
  "getGroupCredentials",
  "devices",
  "registerCapabilities",
  "supportUnauthenticatedDelivery",
  "directoryAuth",
  "directoryAuthV2",
  "storageToken"
]);
const uploadAvatarHeadersZod = import_zod.z.object({
  acl: import_zod.z.string(),
  algorithm: import_zod.z.string(),
  credential: import_zod.z.string(),
  date: import_zod.z.string(),
  key: import_zod.z.string(),
  policy: import_zod.z.string(),
  signature: import_zod.z.string()
}).passthrough();
function initialize({
  url,
  storageUrl,
  updatesUrl,
  directoryConfig,
  cdnUrlObject,
  certificateAuthority,
  contentProxyUrl,
  proxyUrl,
  version
}) {
  if (!import_is.default.string(url)) {
    throw new Error("WebAPI.initialize: Invalid server url");
  }
  if (!import_is.default.string(storageUrl)) {
    throw new Error("WebAPI.initialize: Invalid storageUrl");
  }
  if (!import_is.default.string(updatesUrl)) {
    throw new Error("WebAPI.initialize: Invalid updatesUrl");
  }
  if (!import_is.default.object(cdnUrlObject)) {
    throw new Error("WebAPI.initialize: Invalid cdnUrlObject");
  }
  if (!import_is.default.string(cdnUrlObject["0"])) {
    throw new Error("WebAPI.initialize: Missing CDN 0 configuration");
  }
  if (!import_is.default.string(cdnUrlObject["2"])) {
    throw new Error("WebAPI.initialize: Missing CDN 2 configuration");
  }
  if (!import_is.default.string(certificateAuthority)) {
    throw new Error("WebAPI.initialize: Invalid certificateAuthority");
  }
  if (!import_is.default.string(contentProxyUrl)) {
    throw new Error("WebAPI.initialize: Invalid contentProxyUrl");
  }
  if (proxyUrl && !import_is.default.string(proxyUrl)) {
    throw new Error("WebAPI.initialize: Invalid proxyUrl");
  }
  if (!import_is.default.string(version)) {
    throw new Error("WebAPI.initialize: Invalid version");
  }
  return {
    connect
  };
  function connect({
    username: initialUsername,
    password: initialPassword,
    useWebSocket = true
  }) {
    let username = initialUsername;
    let password = initialPassword;
    const PARSE_RANGE_HEADER = /\/(\d+)$/;
    const PARSE_GROUP_LOG_RANGE_HEADER = /^versions\s+(\d{1,10})-(\d{1,10})\/(\d{1,10})/;
    let activeRegistration;
    const socketManager = new import_SocketManager.SocketManager({
      url,
      certificateAuthority,
      version,
      proxyUrl
    });
    socketManager.on("statusChange", () => {
      window.Whisper.events.trigger("socketStatusChange");
    });
    socketManager.on("authError", () => {
      window.Whisper.events.trigger("unlinkAndDisconnect");
    });
    if (useWebSocket) {
      socketManager.authenticate({ username, password });
    }
    let cds;
    if (directoryConfig.directoryVersion === 1) {
      const { directoryUrl, directoryEnclaveId, directoryTrustAnchor } = directoryConfig;
      cds = new import_LegacyCDS.LegacyCDS({
        logger: log,
        directoryEnclaveId,
        directoryTrustAnchor,
        proxyUrl,
        async putAttestation(auth, publicKey) {
          const data = JSON.stringify({
            clientPublic: Bytes.toBase64(publicKey)
          });
          const result = await _outerAjax(null, {
            certificateAuthority,
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            host: directoryUrl,
            path: `${URL_CALLS.attestation}/${directoryEnclaveId}`,
            user: auth.username,
            password: auth.password,
            responseType: "jsonwithdetails",
            data,
            timeout: 3e4,
            version
          });
          const { response, data: responseBody } = result;
          const cookie = response.headers.get("set-cookie") ?? void 0;
          return { cookie, responseBody };
        },
        async fetchDiscoveryData(auth, data, cookie) {
          const response = await _outerAjax(null, {
            certificateAuthority,
            type: "PUT",
            headers: cookie ? {
              cookie
            } : void 0,
            contentType: "application/json; charset=utf-8",
            host: directoryUrl,
            path: `${URL_CALLS.discovery}/${directoryEnclaveId}`,
            user: auth.username,
            password: auth.password,
            responseType: "json",
            timeout: 3e4,
            data: JSON.stringify(data),
            version
          });
          return {
            requestId: Bytes.fromBase64(response.requestId),
            iv: Bytes.fromBase64(response.iv),
            data: Bytes.fromBase64(response.data),
            mac: Bytes.fromBase64(response.mac)
          };
        },
        async getAuth() {
          return await _ajax({
            call: "directoryAuth",
            httpType: "GET",
            responseType: "json"
          });
        }
      });
    } else if (directoryConfig.directoryVersion === 2) {
      const { directoryV2Url, directoryV2PublicKey, directoryV2CodeHashes } = directoryConfig;
      cds = new import_CDSH.CDSH({
        logger: log,
        proxyUrl,
        url: directoryV2Url,
        publicKey: directoryV2PublicKey,
        codeHashes: directoryV2CodeHashes,
        certificateAuthority,
        version,
        async getAuth() {
          return await _ajax({
            call: "directoryAuthV2",
            httpType: "GET",
            responseType: "json"
          });
        }
      });
    } else if (directoryConfig.directoryVersion === 3) {
      const { directoryV3Url, directoryV3MRENCLAVE, directoryV3Root } = directoryConfig;
      cds = new import_CDSI.CDSI({
        logger: log,
        proxyUrl,
        url: directoryV3Url,
        mrenclave: directoryV3MRENCLAVE,
        root: directoryV3Root,
        certificateAuthority,
        version,
        async getAuth() {
          return await _ajax({
            call: "directoryAuthV2",
            httpType: "GET",
            responseType: "json"
          });
        }
      });
    }
    let fetchForLinkPreviews;
    if (proxyUrl) {
      const agent = new import_proxy_agent.default(proxyUrl);
      fetchForLinkPreviews = /* @__PURE__ */ __name((href, init) => (0, import_node_fetch.default)(href, { ...init, agent }), "fetchForLinkPreviews");
    } else {
      fetchForLinkPreviews = import_node_fetch.default;
    }
    return {
      getSocketStatus,
      checkSockets,
      onOnline,
      onOffline,
      registerRequestHandler,
      unregisterRequestHandler,
      authenticate,
      logout,
      checkAccountExistence,
      confirmCode,
      createGroup,
      deleteUsername,
      finishRegistration,
      fetchLinkPreviewImage,
      fetchLinkPreviewMetadata,
      getAttachment,
      getAvatar,
      getConfig,
      getDevices,
      getGroup,
      getGroupAvatar,
      getGroupCredentials,
      getGroupExternalCredential,
      getGroupFromLink,
      getGroupLog,
      getHasSubscription,
      getIceServers,
      getKeysForIdentifier,
      getKeysForIdentifierUnauth,
      getMyKeys,
      getProfile,
      getProfileForUsername,
      getProfileUnauth,
      getBadgeImageFile,
      getBoostBadgesFromServer,
      getProvisioningResource,
      getSenderCertificate,
      getSticker,
      getStickerPackManifest,
      getStorageCredentials,
      getStorageManifest,
      getStorageRecords,
      getUuidsForE164s,
      getUuidsForE164sV2,
      makeProxiedRequest,
      makeSfuRequest,
      modifyGroup,
      modifyStorageRecords,
      putAttachment,
      putProfile,
      putStickers,
      putUsername,
      registerCapabilities,
      registerKeys,
      registerSupportForUnauthenticatedDelivery,
      reportMessage,
      requestVerificationSMS,
      requestVerificationVoice,
      sendMessages,
      sendMessagesUnauth,
      sendWithSenderKey,
      setSignedPreKey,
      startRegistration,
      updateDeviceName,
      uploadAvatar,
      uploadGroupAvatar,
      whoami,
      sendChallengeResponse
    };
    async function _ajax(param) {
      if (!param.unauthenticated && activeRegistration && !param.isRegistration) {
        log.info("WebAPI: request blocked by active registration");
        const start = Date.now();
        await activeRegistration.promise;
        const duration = Date.now() - start;
        log.info(`WebAPI: request unblocked after ${duration}ms`);
      }
      if (!param.urlParameters) {
        param.urlParameters = "";
      }
      const useWebSocketForEndpoint = useWebSocket && WEBSOCKET_CALLS.has(param.call);
      const outerParams = {
        socketManager: useWebSocketForEndpoint ? socketManager : void 0,
        basicAuth: param.basicAuth,
        certificateAuthority,
        contentType: param.contentType || "application/json; charset=utf-8",
        data: param.data || (param.jsonData ? JSON.stringify(param.jsonData) : void 0),
        headers: param.headers,
        host: param.host || url,
        password: param.password ?? password,
        path: URL_CALLS[param.call] + param.urlParameters,
        proxyUrl,
        responseType: param.responseType,
        timeout: param.timeout,
        type: param.httpType,
        user: param.username ?? username,
        redactUrl: param.redactUrl,
        serverUrl: url,
        validateResponse: param.validateResponse,
        version,
        unauthenticated: param.unauthenticated,
        accessKey: param.accessKey
      };
      try {
        return await _outerAjax(null, outerParams);
      } catch (e) {
        if (!(e instanceof import_Errors.HTTPError)) {
          throw e;
        }
        const translatedError = (0, import_Utils.translateError)(e);
        if (translatedError) {
          throw translatedError;
        }
        throw e;
      }
    }
    function uuidKindToQuery(kind) {
      let value;
      if (kind === import_UUID.UUIDKind.ACI) {
        value = "aci";
      } else if (kind === import_UUID.UUIDKind.PNI) {
        value = "pni";
      } else {
        throw new Error(`Unsupported UUIDKind: ${kind}`);
      }
      return `identity=${value}`;
    }
    async function whoami() {
      const response = await _ajax({
        call: "whoami",
        httpType: "GET",
        responseType: "json"
      });
      if (!(0, import_isRecord.isRecord)(response)) {
        return {};
      }
      return {
        uuid: (0, import_UUID.isValidUuid)(response.uuid) ? response.uuid : void 0,
        pni: (0, import_UUID.isValidUuid)(response.pni) ? response.pni : void 0,
        number: typeof response.number === "string" ? response.number : void 0,
        username: typeof response.username === "string" ? response.username : void 0
      };
    }
    async function sendChallengeResponse(challengeResponse) {
      await _ajax({
        call: "challenge",
        httpType: "PUT",
        jsonData: challengeResponse
      });
    }
    async function authenticate({
      username: newUsername,
      password: newPassword
    }) {
      username = newUsername;
      password = newPassword;
      if (useWebSocket) {
        await socketManager.authenticate({ username, password });
      }
    }
    async function logout() {
      username = "";
      password = "";
      if (useWebSocket) {
        await socketManager.logout();
      }
    }
    function getSocketStatus() {
      return socketManager.getStatus();
    }
    function checkSockets() {
      socketManager.check();
    }
    async function onOnline() {
      await socketManager.onOnline();
    }
    async function onOffline() {
      await socketManager.onOffline();
    }
    function registerRequestHandler(handler) {
      socketManager.registerRequestHandler(handler);
    }
    function unregisterRequestHandler(handler) {
      socketManager.unregisterRequestHandler(handler);
    }
    async function getConfig() {
      const res = await _ajax({
        call: "config",
        httpType: "GET",
        responseType: "json"
      });
      return res.config.filter(({ name }) => name.startsWith("desktop.") || name.startsWith("global."));
    }
    async function getSenderCertificate(omitE164) {
      return await _ajax({
        call: "deliveryCert",
        httpType: "GET",
        responseType: "json",
        validateResponse: { certificate: "string" },
        ...omitE164 ? { urlParameters: "?includeE164=false" } : {}
      });
    }
    async function getStorageCredentials() {
      return await _ajax({
        call: "storageToken",
        httpType: "GET",
        responseType: "json",
        schema: { username: "string", password: "string" }
      });
    }
    async function getStorageManifest(options = {}) {
      const { credentials, greaterThanVersion } = options;
      const { data, response } = await _ajax({
        call: "storageManifest",
        contentType: "application/x-protobuf",
        host: storageUrl,
        httpType: "GET",
        responseType: "byteswithdetails",
        urlParameters: greaterThanVersion ? `/version/${greaterThanVersion}` : "",
        ...credentials
      });
      if (response.status === 204) {
        throw makeHTTPError("promiseAjax: error response", response.status, response.headers.raw(), data, new Error().stack);
      }
      return data;
    }
    async function getStorageRecords(data, options = {}) {
      const { credentials } = options;
      return _ajax({
        call: "storageRead",
        contentType: "application/x-protobuf",
        data,
        host: storageUrl,
        httpType: "PUT",
        responseType: "bytes",
        ...credentials
      });
    }
    async function modifyStorageRecords(data, options = {}) {
      const { credentials } = options;
      return _ajax({
        call: "storageModify",
        contentType: "application/x-protobuf",
        data,
        host: storageUrl,
        httpType: "PUT",
        responseType: "bytes",
        ...credentials
      });
    }
    async function registerSupportForUnauthenticatedDelivery() {
      await _ajax({
        call: "supportUnauthenticatedDelivery",
        httpType: "PUT",
        responseType: "json"
      });
    }
    async function registerCapabilities(capabilities) {
      await _ajax({
        call: "registerCapabilities",
        httpType: "PUT",
        jsonData: capabilities
      });
    }
    function getProfileUrl(identifier, {
      profileKeyVersion,
      profileKeyCredentialRequest,
      credentialType = "profileKey"
    }) {
      let profileUrl = `/${identifier}`;
      if (profileKeyVersion !== void 0) {
        profileUrl += `/${profileKeyVersion}`;
        if (profileKeyCredentialRequest !== void 0) {
          profileUrl += `/${profileKeyCredentialRequest}?credentialType=${credentialType}`;
        }
      } else {
        (0, import_assert.strictAssert)(profileKeyCredentialRequest === void 0, "getProfileUrl called without version, but with request");
      }
      return profileUrl;
    }
    async function getProfile(identifier, options) {
      const { profileKeyVersion, profileKeyCredentialRequest, userLanguages } = options;
      return await _ajax({
        call: "profile",
        httpType: "GET",
        urlParameters: getProfileUrl(identifier, options),
        headers: {
          "Accept-Language": (0, import_userLanguages.formatAcceptLanguageHeader)(userLanguages)
        },
        responseType: "json",
        redactUrl: _createRedactor(identifier, profileKeyVersion, profileKeyCredentialRequest)
      });
    }
    async function getProfileForUsername(usernameToFetch) {
      return await _ajax({
        call: "profile",
        httpType: "GET",
        urlParameters: `/username/${usernameToFetch}`,
        responseType: "json",
        redactUrl: _createRedactor(usernameToFetch)
      });
    }
    async function putProfile(jsonData) {
      const res = await _ajax({
        call: "profile",
        httpType: "PUT",
        responseType: "json",
        jsonData
      });
      if (!res) {
        return;
      }
      return uploadAvatarHeadersZod.parse(res);
    }
    async function getProfileUnauth(identifier, options) {
      const {
        accessKey,
        profileKeyVersion,
        profileKeyCredentialRequest,
        userLanguages
      } = options;
      return await _ajax({
        call: "profile",
        httpType: "GET",
        urlParameters: getProfileUrl(identifier, options),
        headers: {
          "Accept-Language": (0, import_userLanguages.formatAcceptLanguageHeader)(userLanguages)
        },
        responseType: "json",
        unauthenticated: true,
        accessKey,
        redactUrl: _createRedactor(identifier, profileKeyVersion, profileKeyCredentialRequest)
      });
    }
    async function getBadgeImageFile(imageFileUrl) {
      (0, import_assert.strictAssert)((0, import_isBadgeImageFileUrlValid.isBadgeImageFileUrlValid)(imageFileUrl, updatesUrl), "getBadgeImageFile got an invalid URL. Was bad data saved?");
      return _outerAjax(imageFileUrl, {
        certificateAuthority,
        contentType: "application/octet-stream",
        proxyUrl,
        responseType: "bytes",
        timeout: 0,
        type: "GET",
        redactUrl: (href) => {
          const parsedUrl = (0, import_url.maybeParseUrl)(href);
          if (!parsedUrl) {
            return href;
          }
          const { pathname } = parsedUrl;
          const pattern = RegExp((0, import_lodash.escapeRegExp)(pathname), "g");
          return href.replace(pattern, `[REDACTED]${pathname.slice(-3)}`);
        },
        version
      });
    }
    async function getBoostBadgesFromServer(userLanguages) {
      return _ajax({
        call: "boostBadges",
        httpType: "GET",
        headers: {
          "Accept-Language": (0, import_userLanguages.formatAcceptLanguageHeader)(userLanguages)
        },
        responseType: "json"
      });
    }
    async function getAvatar(path) {
      return _outerAjax(`${cdnUrlObject["0"]}/${path}`, {
        certificateAuthority,
        contentType: "application/octet-stream",
        proxyUrl,
        responseType: "bytes",
        timeout: 0,
        type: "GET",
        redactUrl: (href) => {
          const pattern = RegExp((0, import_lodash.escapeRegExp)(path), "g");
          return href.replace(pattern, `[REDACTED]${path.slice(-3)}`);
        },
        version
      });
    }
    async function deleteUsername() {
      await _ajax({
        call: "username",
        httpType: "DELETE"
      });
    }
    async function putUsername(newUsername) {
      await _ajax({
        call: "username",
        httpType: "PUT",
        urlParameters: `/${newUsername}`
      });
    }
    async function reportMessage(senderUuid, serverGuid) {
      await _ajax({
        call: "reportMessage",
        httpType: "POST",
        urlParameters: `/${senderUuid}/${serverGuid}`,
        responseType: "bytes"
      });
    }
    async function requestVerificationSMS(number, token) {
      await _ajax({
        call: "accounts",
        httpType: "GET",
        urlParameters: `/sms/code/${number}?captcha=${token}`
      });
    }
    async function requestVerificationVoice(number, token) {
      await _ajax({
        call: "accounts",
        httpType: "GET",
        urlParameters: `/voice/code/${number}?captcha=${token}`
      });
    }
    async function checkAccountExistence(uuid) {
      try {
        await _ajax({
          httpType: "HEAD",
          call: "accountExistence",
          urlParameters: `/${uuid.toString()}`,
          unauthenticated: true,
          accessKey: void 0
        });
        return true;
      } catch (error) {
        if (error instanceof import_Errors.HTTPError && error.code === 404) {
          return false;
        }
        throw error;
      }
    }
    function startRegistration() {
      (0, import_assert.strictAssert)(activeRegistration === void 0, "Registration already in progress");
      activeRegistration = (0, import_explodePromise.explodePromise)();
      log.info("WebAPI: starting registration");
      return activeRegistration;
    }
    function finishRegistration(registration) {
      (0, import_assert.strictAssert)(activeRegistration !== void 0, "No active registration");
      (0, import_assert.strictAssert)(activeRegistration === registration, "Invalid registration baton");
      log.info("WebAPI: finishing registration");
      const current = activeRegistration;
      activeRegistration = void 0;
      current.resolve();
    }
    async function confirmCode(number, code, newPassword, registrationId, deviceName, options = {}) {
      const capabilities = {
        announcementGroup: true,
        giftBadges: true,
        "gv2-3": true,
        "gv1-migration": true,
        senderKey: true,
        changeNumber: true,
        stories: true
      };
      const { accessKey } = options;
      const jsonData = {
        capabilities,
        fetchesMessages: true,
        name: deviceName || void 0,
        registrationId,
        supportsSms: false,
        unidentifiedAccessKey: accessKey ? Bytes.toBase64(accessKey) : void 0,
        unrestrictedUnidentifiedAccess: false
      };
      const call = deviceName ? "devices" : "accounts";
      const urlPrefix = deviceName ? "/" : "/code/";
      await logout();
      username = number;
      password = newPassword;
      const response = await _ajax({
        isRegistration: true,
        call,
        httpType: "PUT",
        responseType: "json",
        urlParameters: urlPrefix + code,
        jsonData
      });
      username = `${response.uuid || number}.${response.deviceId || 1}`;
      password = newPassword;
      return response;
    }
    async function updateDeviceName(deviceName) {
      await _ajax({
        call: "updateDeviceName",
        httpType: "PUT",
        jsonData: {
          deviceName
        }
      });
    }
    async function getIceServers() {
      return await _ajax({
        call: "getIceServers",
        httpType: "GET",
        responseType: "json"
      });
    }
    async function getDevices() {
      return await _ajax({
        call: "devices",
        httpType: "GET",
        responseType: "json"
      });
    }
    async function registerKeys(genKeys, uuidKind) {
      const preKeys = genKeys.preKeys.map((key) => ({
        keyId: key.keyId,
        publicKey: Bytes.toBase64(key.publicKey)
      }));
      const keys = {
        identityKey: Bytes.toBase64(genKeys.identityKey),
        signedPreKey: {
          keyId: genKeys.signedPreKey.keyId,
          publicKey: Bytes.toBase64(genKeys.signedPreKey.publicKey),
          signature: Bytes.toBase64(genKeys.signedPreKey.signature)
        },
        preKeys
      };
      await _ajax({
        isRegistration: true,
        call: "keys",
        urlParameters: `?${uuidKindToQuery(uuidKind)}`,
        httpType: "PUT",
        jsonData: keys
      });
    }
    async function setSignedPreKey(signedPreKey, uuidKind) {
      await _ajax({
        call: "signed",
        urlParameters: `?${uuidKindToQuery(uuidKind)}`,
        httpType: "PUT",
        jsonData: {
          keyId: signedPreKey.keyId,
          publicKey: Bytes.toBase64(signedPreKey.publicKey),
          signature: Bytes.toBase64(signedPreKey.signature)
        }
      });
    }
    async function getMyKeys(uuidKind) {
      const result = await _ajax({
        call: "keys",
        urlParameters: `?${uuidKindToQuery(uuidKind)}`,
        httpType: "GET",
        responseType: "json",
        validateResponse: { count: "number" }
      });
      return result.count;
    }
    function handleKeys(res) {
      if (!Array.isArray(res.devices)) {
        throw new Error("Invalid response");
      }
      const devices = res.devices.map((device) => {
        if (!_validateResponse(device, { signedPreKey: "object" }) || !_validateResponse(device.signedPreKey, {
          publicKey: "string",
          signature: "string"
        })) {
          throw new Error("Invalid signedPreKey");
        }
        let preKey;
        if (device.preKey) {
          if (!_validateResponse(device, { preKey: "object" }) || !_validateResponse(device.preKey, { publicKey: "string" })) {
            throw new Error("Invalid preKey");
          }
          preKey = {
            keyId: device.preKey.keyId,
            publicKey: Bytes.fromBase64(device.preKey.publicKey)
          };
        }
        return {
          deviceId: device.deviceId,
          registrationId: device.registrationId,
          preKey,
          signedPreKey: {
            keyId: device.signedPreKey.keyId,
            publicKey: Bytes.fromBase64(device.signedPreKey.publicKey),
            signature: Bytes.fromBase64(device.signedPreKey.signature)
          }
        };
      });
      return {
        devices,
        identityKey: Bytes.fromBase64(res.identityKey)
      };
    }
    async function getKeysForIdentifier(identifier, deviceId) {
      const keys = await _ajax({
        call: "keys",
        httpType: "GET",
        urlParameters: `/${identifier}/${deviceId || "*"}`,
        responseType: "json",
        validateResponse: { identityKey: "string", devices: "object" }
      });
      return handleKeys(keys);
    }
    async function getKeysForIdentifierUnauth(identifier, deviceId, { accessKey } = {}) {
      const keys = await _ajax({
        call: "keys",
        httpType: "GET",
        urlParameters: `/${identifier}/${deviceId || "*"}`,
        responseType: "json",
        validateResponse: { identityKey: "string", devices: "object" },
        unauthenticated: true,
        accessKey
      });
      return handleKeys(keys);
    }
    async function sendMessagesUnauth(destination, messages, timestamp, online, { accessKey } = {}) {
      let jsonData;
      if (online) {
        jsonData = { messages, timestamp, online: true };
      } else {
        jsonData = { messages, timestamp };
      }
      await _ajax({
        call: "messages",
        httpType: "PUT",
        urlParameters: `/${destination}`,
        jsonData,
        responseType: "json",
        unauthenticated: true,
        accessKey
      });
    }
    async function sendMessages(destination, messages, timestamp, online) {
      let jsonData;
      if (online) {
        jsonData = { messages, timestamp, online: true };
      } else {
        jsonData = { messages, timestamp };
      }
      await _ajax({
        call: "messages",
        httpType: "PUT",
        urlParameters: `/${destination}`,
        jsonData,
        responseType: "json"
      });
    }
    async function sendWithSenderKey(data, accessKeys, timestamp, online) {
      const response = await _ajax({
        call: "multiRecipient",
        httpType: "PUT",
        contentType: "application/vnd.signal-messenger.mrm",
        data,
        urlParameters: `?ts=${timestamp}&online=${online ? "true" : "false"}`,
        responseType: "json",
        unauthenticated: true,
        accessKey: Bytes.toBase64(accessKeys)
      });
      const parseResult = multiRecipient200ResponseSchema.safeParse(response);
      if (parseResult.success) {
        return parseResult.data;
      }
      log.warn("WebAPI: invalid response from sendWithSenderKey", (0, import_errors.toLogFormat)(parseResult.error));
      return response;
    }
    function redactStickerUrl(stickerUrl) {
      return stickerUrl.replace(/(\/stickers\/)([^/]+)(\/)/, (_, begin, packId, end) => `${begin}${(0, import_Stickers.redactPackId)(packId)}${end}`);
    }
    async function getSticker(packId, stickerId) {
      if (!(0, import_Stickers.isPackIdValid)(packId)) {
        throw new Error("getSticker: pack ID was invalid");
      }
      return _outerAjax(`${cdnUrlObject["0"]}/stickers/${packId}/full/${stickerId}`, {
        certificateAuthority,
        proxyUrl,
        responseType: "bytes",
        type: "GET",
        redactUrl: redactStickerUrl,
        version
      });
    }
    async function getStickerPackManifest(packId) {
      if (!(0, import_Stickers.isPackIdValid)(packId)) {
        throw new Error("getStickerPackManifest: pack ID was invalid");
      }
      return _outerAjax(`${cdnUrlObject["0"]}/stickers/${packId}/manifest.proto`, {
        certificateAuthority,
        proxyUrl,
        responseType: "bytes",
        type: "GET",
        redactUrl: redactStickerUrl,
        version
      });
    }
    function makePutParams({
      key,
      credential,
      acl,
      algorithm,
      date,
      policy,
      signature
    }, encryptedBin) {
      const boundaryString = `----------------${(0, import_uuid.v4)().replace(/-/g, "")}`;
      const CRLF = "\r\n";
      const getSection = /* @__PURE__ */ __name((name, value) => [
        `--${boundaryString}`,
        `Content-Disposition: form-data; name="${name}"${CRLF}`,
        value
      ].join(CRLF), "getSection");
      const start = [
        getSection("key", key),
        getSection("x-amz-credential", credential),
        getSection("acl", acl),
        getSection("x-amz-algorithm", algorithm),
        getSection("x-amz-date", date),
        getSection("policy", policy),
        getSection("x-amz-signature", signature),
        getSection("Content-Type", "application/octet-stream"),
        `--${boundaryString}`,
        'Content-Disposition: form-data; name="file"',
        `Content-Type: application/octet-stream${CRLF}${CRLF}`
      ].join(CRLF);
      const end = `${CRLF}--${boundaryString}--${CRLF}`;
      const startBuffer = Buffer.from(start, "utf8");
      const attachmentBuffer = Buffer.from(encryptedBin);
      const endBuffer = Buffer.from(end, "utf8");
      const contentLength = startBuffer.length + attachmentBuffer.length + endBuffer.length;
      const data = Buffer.concat([startBuffer, attachmentBuffer, endBuffer], contentLength);
      return {
        data,
        contentType: `multipart/form-data; boundary=${boundaryString}`,
        headers: {
          "Content-Length": contentLength.toString()
        }
      };
    }
    async function putStickers(encryptedManifest, encryptedStickers, onProgress) {
      const { packId, manifest, stickers } = await _ajax({
        call: "getStickerPackUpload",
        responseType: "json",
        httpType: "GET",
        urlParameters: `/${encryptedStickers.length}`
      });
      const manifestParams = makePutParams(manifest, encryptedManifest);
      await _outerAjax(`${cdnUrlObject["0"]}/`, {
        ...manifestParams,
        certificateAuthority,
        proxyUrl,
        timeout: 0,
        type: "POST",
        version
      });
      const queue = new import_p_queue.default({
        concurrency: 3,
        timeout: 1e3 * 60 * 2,
        throwOnTimeout: true
      });
      await Promise.all(stickers.map(async (sticker, index) => {
        const stickerParams = makePutParams(sticker, encryptedStickers[index]);
        await queue.add(async () => _outerAjax(`${cdnUrlObject["0"]}/`, {
          ...stickerParams,
          certificateAuthority,
          proxyUrl,
          timeout: 0,
          type: "POST",
          version
        }));
        if (onProgress) {
          onProgress();
        }
      }));
      return packId;
    }
    async function getAttachment(cdnKey, cdnNumber) {
      const abortController = new import_abort_controller.default();
      const cdnUrl = (0, import_lodash.isNumber)(cdnNumber) ? cdnUrlObject[cdnNumber] || cdnUrlObject["0"] : cdnUrlObject["0"];
      const stream = await _outerAjax(`${cdnUrl}/attachments/${cdnKey}`, {
        certificateAuthority,
        proxyUrl,
        responseType: "stream",
        timeout: 0,
        type: "GET",
        redactUrl: _createRedactor(cdnKey),
        version,
        abortSignal: abortController.signal
      });
      return (0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
        name: `getAttachment(${cdnKey})`,
        timeout: GET_ATTACHMENT_CHUNK_TIMEOUT,
        abortController
      });
    }
    async function putAttachment(encryptedBin) {
      const response = await _ajax({
        call: "attachmentId",
        httpType: "GET",
        responseType: "json"
      });
      const { attachmentIdString } = response;
      const params = makePutParams(response, encryptedBin);
      await _outerAjax(`${cdnUrlObject["0"]}/attachments/`, {
        ...params,
        certificateAuthority,
        proxyUrl,
        timeout: 0,
        type: "POST",
        version
      });
      return attachmentIdString;
    }
    function getHeaderPadding() {
      const max = (0, import_Crypto.getRandomValue)(1, 64);
      let characters = "";
      for (let i = 0; i < max; i += 1) {
        characters += String.fromCharCode((0, import_Crypto.getRandomValue)(65, 122));
      }
      return characters;
    }
    async function fetchLinkPreviewMetadata(href, abortSignal) {
      return linkPreviewFetch.fetchLinkPreviewMetadata(fetchForLinkPreviews, href, abortSignal);
    }
    async function fetchLinkPreviewImage(href, abortSignal) {
      return linkPreviewFetch.fetchLinkPreviewImage(fetchForLinkPreviews, href, abortSignal);
    }
    async function makeProxiedRequest(targetUrl, options = {}) {
      const { returnUint8Array, start, end } = options;
      const headers = {
        "X-SignalPadding": getHeaderPadding()
      };
      if (import_is.default.number(start) && import_is.default.number(end)) {
        headers.Range = `bytes=${start}-${end}`;
      }
      const result = await _outerAjax(targetUrl, {
        responseType: returnUint8Array ? "byteswithdetails" : void 0,
        proxyUrl: contentProxyUrl,
        type: "GET",
        redirect: "follow",
        redactUrl: () => "[REDACTED_URL]",
        headers,
        version
      });
      if (!returnUint8Array) {
        return result;
      }
      const { response } = result;
      if (!response.headers || !response.headers.get) {
        throw new Error("makeProxiedRequest: Problem retrieving header value");
      }
      const range = response.headers.get("content-range");
      const match = PARSE_RANGE_HEADER.exec(range || "");
      if (!match || !match[1]) {
        throw new Error(`makeProxiedRequest: Unable to parse total size from ${range}`);
      }
      const totalSize = parseInt(match[1], 10);
      return {
        totalSize,
        result
      };
    }
    async function makeSfuRequest(targetUrl, type, headers, body) {
      return _outerAjax(targetUrl, {
        certificateAuthority,
        data: body,
        headers,
        proxyUrl,
        responseType: "byteswithdetails",
        timeout: 0,
        type,
        version
      });
    }
    function generateGroupAuth(groupPublicParamsHex, authCredentialPresentationHex) {
      return Bytes.toBase64(Bytes.fromString(`${groupPublicParamsHex}:${authCredentialPresentationHex}`));
    }
    async function getGroupCredentials(startDay, endDay, uuidKind) {
      const response = await _ajax({
        call: "getGroupCredentials",
        urlParameters: `/${startDay}/${endDay}?${uuidKindToQuery(uuidKind)}`,
        httpType: "GET",
        responseType: "json"
      });
      return response.credentials;
    }
    async function getGroupExternalCredential(options) {
      const basicAuth = generateGroupAuth(options.groupPublicParamsHex, options.authCredentialPresentationHex);
      const response = await _ajax({
        basicAuth,
        call: "groupToken",
        httpType: "GET",
        contentType: "application/x-protobuf",
        responseType: "bytes",
        host: storageUrl
      });
      return import_protobuf.SignalService.GroupExternalCredential.decode(response);
    }
    function verifyAttributes(attributes) {
      const { key, credential, acl, algorithm, date, policy, signature } = attributes;
      if (!key || !credential || !acl || !algorithm || !date || !policy || !signature) {
        throw new Error("verifyAttributes: Missing value from AvatarUploadAttributes");
      }
      return {
        key,
        credential,
        acl,
        algorithm,
        date,
        policy,
        signature
      };
    }
    async function uploadAvatar(uploadAvatarRequestHeaders, avatarData) {
      const verified = verifyAttributes(uploadAvatarRequestHeaders);
      const { key } = verified;
      const manifestParams = makePutParams(verified, avatarData);
      await _outerAjax(`${cdnUrlObject["0"]}/`, {
        ...manifestParams,
        certificateAuthority,
        proxyUrl,
        timeout: 0,
        type: "POST",
        version
      });
      return key;
    }
    async function uploadGroupAvatar(avatarData, options) {
      const basicAuth = generateGroupAuth(options.groupPublicParamsHex, options.authCredentialPresentationHex);
      const response = await _ajax({
        basicAuth,
        call: "getGroupAvatarUpload",
        httpType: "GET",
        responseType: "bytes",
        host: storageUrl
      });
      const attributes = import_protobuf.SignalService.AvatarUploadAttributes.decode(response);
      const verified = verifyAttributes(attributes);
      const { key } = verified;
      const manifestParams = makePutParams(verified, avatarData);
      await _outerAjax(`${cdnUrlObject["0"]}/`, {
        ...manifestParams,
        certificateAuthority,
        proxyUrl,
        timeout: 0,
        type: "POST",
        version
      });
      return key;
    }
    async function getGroupAvatar(key) {
      return _outerAjax(`${cdnUrlObject["0"]}/${key}`, {
        certificateAuthority,
        proxyUrl,
        responseType: "bytes",
        timeout: 0,
        type: "GET",
        version,
        redactUrl: _createRedactor(key)
      });
    }
    async function createGroup(group, options) {
      const basicAuth = generateGroupAuth(options.groupPublicParamsHex, options.authCredentialPresentationHex);
      const data = import_protobuf.SignalService.Group.encode(group).finish();
      await _ajax({
        basicAuth,
        call: "groups",
        contentType: "application/x-protobuf",
        data,
        host: storageUrl,
        httpType: "PUT"
      });
    }
    async function getGroup(options) {
      const basicAuth = generateGroupAuth(options.groupPublicParamsHex, options.authCredentialPresentationHex);
      const response = await _ajax({
        basicAuth,
        call: "groups",
        contentType: "application/x-protobuf",
        host: storageUrl,
        httpType: "GET",
        responseType: "bytes"
      });
      return import_protobuf.SignalService.Group.decode(response);
    }
    async function getGroupFromLink(inviteLinkPassword, auth) {
      const basicAuth = generateGroupAuth(auth.groupPublicParamsHex, auth.authCredentialPresentationHex);
      const safeInviteLinkPassword = inviteLinkPassword ? (0, import_webSafeBase64.toWebSafeBase64)(inviteLinkPassword) : void 0;
      const response = await _ajax({
        basicAuth,
        call: "groupsViaLink",
        contentType: "application/x-protobuf",
        host: storageUrl,
        httpType: "GET",
        responseType: "bytes",
        urlParameters: safeInviteLinkPassword ? `${safeInviteLinkPassword}` : void 0,
        redactUrl: _createRedactor(safeInviteLinkPassword)
      });
      return import_protobuf.SignalService.GroupJoinInfo.decode(response);
    }
    async function modifyGroup(changes, options, inviteLinkBase64) {
      const basicAuth = generateGroupAuth(options.groupPublicParamsHex, options.authCredentialPresentationHex);
      const data = import_protobuf.SignalService.GroupChange.Actions.encode(changes).finish();
      const safeInviteLinkPassword = inviteLinkBase64 ? (0, import_webSafeBase64.toWebSafeBase64)(inviteLinkBase64) : void 0;
      const response = await _ajax({
        basicAuth,
        call: "groups",
        contentType: "application/x-protobuf",
        data,
        host: storageUrl,
        httpType: "PATCH",
        responseType: "bytes",
        urlParameters: safeInviteLinkPassword ? `?inviteLinkPassword=${safeInviteLinkPassword}` : void 0,
        redactUrl: safeInviteLinkPassword ? _createRedactor(safeInviteLinkPassword) : void 0
      });
      return import_protobuf.SignalService.GroupChange.decode(response);
    }
    async function getGroupLog(options, credentials) {
      const basicAuth = generateGroupAuth(credentials.groupPublicParamsHex, credentials.authCredentialPresentationHex);
      const {
        startVersion,
        includeFirstState,
        includeLastState,
        maxSupportedChangeEpoch
      } = options;
      if (startVersion === void 0) {
        const { data: joinedData } = await _ajax({
          basicAuth,
          call: "groupJoinedAtVersion",
          contentType: "application/x-protobuf",
          host: storageUrl,
          httpType: "GET",
          responseType: "byteswithdetails"
        });
        const { joinedAtVersion } = import_protobuf.SignalService.Member.decode(joinedData);
        return getGroupLog({
          ...options,
          startVersion: joinedAtVersion
        }, credentials);
      }
      const withDetails = await _ajax({
        basicAuth,
        call: "groupLog",
        contentType: "application/x-protobuf",
        host: storageUrl,
        httpType: "GET",
        responseType: "byteswithdetails",
        urlParameters: `/${startVersion}?includeFirstState=${Boolean(includeFirstState)}&includeLastState=${Boolean(includeLastState)}&maxSupportedChangeEpoch=${Number(maxSupportedChangeEpoch)}`
      });
      const { data, response } = withDetails;
      const changes = import_protobuf.SignalService.GroupChanges.decode(data);
      if (response && response.status === 206) {
        const range = response.headers.get("Content-Range");
        const match = PARSE_GROUP_LOG_RANGE_HEADER.exec(range || "");
        const start = match ? parseInt(match[1], 10) : void 0;
        const end = match ? parseInt(match[2], 10) : void 0;
        const currentRevision = match ? parseInt(match[3], 10) : void 0;
        if (match && import_is.default.number(start) && import_is.default.number(end) && import_is.default.number(currentRevision)) {
          return {
            changes,
            start,
            end,
            currentRevision
          };
        }
      }
      return {
        changes
      };
    }
    async function getHasSubscription(subscriberId) {
      const formattedId = (0, import_webSafeBase64.toWebSafeBase64)(Bytes.toBase64(subscriberId));
      const data = await _ajax({
        call: "subscriptions",
        httpType: "GET",
        urlParameters: `/${formattedId}`,
        responseType: "json",
        unauthenticated: true,
        accessKey: void 0,
        redactUrl: _createRedactor(formattedId)
      });
      return (0, import_isRecord.isRecord)(data) && (0, import_isRecord.isRecord)(data.subscription) && Boolean(data.subscription.active);
    }
    function getProvisioningResource(handler) {
      return socketManager.getProvisioningResource(handler);
    }
    async function getUuidsForE164s(e164s) {
      const map = await cds.request({
        e164s
      });
      const result = {};
      for (const [key, value] of map) {
        result[key] = value.pni ?? value.aci ?? null;
      }
      return result;
    }
    async function getUuidsForE164sV2({
      e164s,
      acis,
      accessKeys
    }) {
      return cds.request({
        e164s,
        acis,
        accessKeys
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initialize,
  multiRecipient200ResponseSchema,
  multiRecipient409ResponseSchema,
  multiRecipient410ResponseSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2ViQVBJLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tcGFyYW0tcmVhc3NpZ24gKi9cbi8qIGVzbGludC1kaXNhYmxlIGd1YXJkLWZvci1pbiAqL1xuLyogZXNsaW50LWRpc2FibGUgbm8tcmVzdHJpY3RlZC1zeW50YXggKi9cbi8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnkgKi9cblxuaW1wb3J0IEFib3J0Q29udHJvbGxlciBmcm9tICdhYm9ydC1jb250cm9sbGVyJztcbmltcG9ydCB0eXBlIHsgUmVzcG9uc2UgfSBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBmZXRjaCBmcm9tICdub2RlLWZldGNoJztcbmltcG9ydCBQcm94eUFnZW50IGZyb20gJ3Byb3h5LWFnZW50JztcbmltcG9ydCB7IEFnZW50IH0gZnJvbSAnaHR0cHMnO1xuaW1wb3J0IHR5cGUgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGVzY2FwZVJlZ0V4cCwgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IGlzIGZyb20gJ0BzaW5kcmVzb3JodXMvaXMnO1xuaW1wb3J0IFBRdWV1ZSBmcm9tICdwLXF1ZXVlJztcbmltcG9ydCB7IHY0IGFzIGdldEd1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IHogfSBmcm9tICd6b2QnO1xuaW1wb3J0IHR5cGUgeyBSZWFkYWJsZSB9IGZyb20gJ3N0cmVhbSc7XG5cbmltcG9ydCB7IGFzc2VydCwgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IEV4cGxvZGVQcm9taXNlUmVzdWx0VHlwZSB9IGZyb20gJy4uL3V0aWwvZXhwbG9kZVByb21pc2UnO1xuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi91dGlsL2V4cGxvZGVQcm9taXNlJztcbmltcG9ydCB7IGdldFVzZXJBZ2VudCB9IGZyb20gJy4uL3V0aWwvZ2V0VXNlckFnZW50JztcbmltcG9ydCB7IGdldFN0cmVhbVdpdGhUaW1lb3V0IH0gZnJvbSAnLi4vdXRpbC9nZXRTdHJlYW1XaXRoVGltZW91dCc7XG5pbXBvcnQgeyBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlciB9IGZyb20gJy4uL3V0aWwvdXNlckxhbmd1YWdlcyc7XG5pbXBvcnQgeyB0b1dlYlNhZmVCYXNlNjQgfSBmcm9tICcuLi91dGlsL3dlYlNhZmVCYXNlNjQnO1xuaW1wb3J0IHsgZ2V0QmFzaWNBdXRoIH0gZnJvbSAnLi4vdXRpbC9nZXRCYXNpY0F1dGgnO1xuaW1wb3J0IHR5cGUgeyBTb2NrZXRTdGF0dXMgfSBmcm9tICcuLi90eXBlcy9Tb2NrZXRTdGF0dXMnO1xuaW1wb3J0IHsgdG9Mb2dGb3JtYXQgfSBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgaXNQYWNrSWRWYWxpZCwgcmVkYWN0UGFja0lkIH0gZnJvbSAnLi4vdHlwZXMvU3RpY2tlcnMnO1xuaW1wb3J0IHR5cGUgeyBVVUlELCBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgaXNWYWxpZFV1aWQsIFVVSURLaW5kIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBnZXRSYW5kb21WYWx1ZSB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgKiBhcyBsaW5rUHJldmlld0ZldGNoIGZyb20gJy4uL2xpbmtQcmV2aWV3cy9saW5rUHJldmlld0ZldGNoJztcbmltcG9ydCB7IGlzQmFkZ2VJbWFnZUZpbGVVcmxWYWxpZCB9IGZyb20gJy4uL2JhZGdlcy9pc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQnO1xuXG5pbXBvcnQgeyBTb2NrZXRNYW5hZ2VyIH0gZnJvbSAnLi9Tb2NrZXRNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgQ0RTQXV0aFR5cGUsIENEU1Jlc3BvbnNlVHlwZSB9IGZyb20gJy4vY2RzL1R5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBDRFNCYXNlIH0gZnJvbSAnLi9jZHMvQ0RTQmFzZSc7XG5pbXBvcnQgeyBMZWdhY3lDRFMgfSBmcm9tICcuL2Nkcy9MZWdhY3lDRFMnO1xuaW1wb3J0IHR5cGUgeyBMZWdhY3lDRFNQdXRBdHRlc3RhdGlvblJlc3BvbnNlVHlwZSB9IGZyb20gJy4vY2RzL0xlZ2FjeUNEUyc7XG5pbXBvcnQgeyBDRFNIIH0gZnJvbSAnLi9jZHMvQ0RTSCc7XG5pbXBvcnQgeyBDRFNJIH0gZnJvbSAnLi9jZHMvQ0RTSSc7XG5pbXBvcnQgdHlwZSBXZWJTb2NrZXRSZXNvdXJjZSBmcm9tICcuL1dlYnNvY2tldFJlc291cmNlcyc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5pbXBvcnQgeyBIVFRQRXJyb3IgfSBmcm9tICcuL0Vycm9ycyc7XG5pbXBvcnQgdHlwZSBNZXNzYWdlU2VuZGVyIGZyb20gJy4vU2VuZE1lc3NhZ2UnO1xuaW1wb3J0IHR5cGUge1xuICBXZWJBUElDcmVkZW50aWFscyxcbiAgSVJlcXVlc3RIYW5kbGVyLFxuICBTdG9yYWdlU2VydmljZUNhbGxPcHRpb25zVHlwZSxcbiAgU3RvcmFnZVNlcnZpY2VDcmVkZW50aWFscyxcbn0gZnJvbSAnLi9UeXBlcy5kJztcbmltcG9ydCB7IGhhbmRsZVN0YXR1c0NvZGUsIHRyYW5zbGF0ZUVycm9yIH0gZnJvbSAnLi9VdGlscyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgbWF5YmVQYXJzZVVybCB9IGZyb20gJy4uL3V0aWwvdXJsJztcblxuLy8gTm90ZTogdGhpcyB3aWxsIGJyZWFrIHNvbWUgY29kZSB0aGF0IGV4cGVjdHMgdG8gYmUgYWJsZSB0byB1c2UgZXJyLnJlc3BvbnNlIHdoZW4gYVxuLy8gICB3ZWIgcmVxdWVzdCBmYWlscywgYmVjYXVzZSBpdCB3aWxsIGZvcmNlIGl0IHRvIHRleHQuIEJ1dCBpdCBpcyB2ZXJ5IHVzZWZ1bCBmb3Jcbi8vICAgZGVidWdnaW5nIGZhaWxlZCByZXF1ZXN0cy5cbmNvbnN0IERFQlVHID0gZmFsc2U7XG5cbmZ1bmN0aW9uIF9jcmVhdGVSZWRhY3RvcihcbiAgLi4udG9SZXBsYWNlOiBSZWFkb25seUFycmF5PHN0cmluZyB8IHVuZGVmaW5lZD5cbik6IFJlZGFjdFVybCB7XG4gIC8vIE5PVEU6IEl0IHdvdWxkIGJlIG5pY2UgdG8gcmVtb3ZlIHRoaXMgY2FzdCwgYnV0IFR5cGVTY3JpcHQgZG9lc24ndCBzdXBwb3J0XG4gIC8vICAgaXQuIEhvd2V2ZXIsIHRoZXJlIGlzIFthbiBpc3N1ZV1bMF0gdGhhdCBkaXNjdXNzZXMgdGhpcyBpbiBtb3JlIGRldGFpbC5cbiAgLy8gWzBdOiBodHRwczovL2dpdGh1Yi5jb20vTWljcm9zb2Z0L1R5cGVTY3JpcHQvaXNzdWVzLzE2MDY5XG4gIGNvbnN0IHN0cmluZ3NUb1JlcGxhY2UgPSB0b1JlcGxhY2UuZmlsdGVyKEJvb2xlYW4pIGFzIEFycmF5PHN0cmluZz47XG4gIHJldHVybiBocmVmID0+XG4gICAgc3RyaW5nc1RvUmVwbGFjZS5yZWR1Y2UoKHJlc3VsdDogc3RyaW5nLCBzdHJpbmdUb1JlcGxhY2U6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgcGF0dGVybiA9IFJlZ0V4cChlc2NhcGVSZWdFeHAoc3RyaW5nVG9SZXBsYWNlKSwgJ2cnKTtcbiAgICAgIGNvbnN0IHJlcGxhY2VtZW50ID0gYFtSRURBQ1RFRF0ke3N0cmluZ1RvUmVwbGFjZS5zbGljZSgtMyl9YDtcbiAgICAgIHJldHVybiByZXN1bHQucmVwbGFjZShwYXR0ZXJuLCByZXBsYWNlbWVudCk7XG4gICAgfSwgaHJlZik7XG59XG5cbmZ1bmN0aW9uIF92YWxpZGF0ZVJlc3BvbnNlKHJlc3BvbnNlOiBhbnksIHNjaGVtYTogYW55KSB7XG4gIHRyeSB7XG4gICAgZm9yIChjb25zdCBpIGluIHNjaGVtYSkge1xuICAgICAgc3dpdGNoIChzY2hlbWFbaV0pIHtcbiAgICAgICAgY2FzZSAnb2JqZWN0JzpcbiAgICAgICAgY2FzZSAnc3RyaW5nJzpcbiAgICAgICAgY2FzZSAnbnVtYmVyJzpcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3BvbnNlW2ldICE9PSBzY2hlbWFbaV0pIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICB9XG4gICAgfVxuICB9IGNhdGNoIChleCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiB0cnVlO1xufVxuXG5jb25zdCBGSVZFX01JTlVURVMgPSA1ICogZHVyYXRpb25zLk1JTlVURTtcbmNvbnN0IEdFVF9BVFRBQ0hNRU5UX0NIVU5LX1RJTUVPVVQgPSAxMCAqIGR1cmF0aW9ucy5TRUNPTkQ7XG5cbnR5cGUgQWdlbnRDYWNoZVR5cGUgPSB7XG4gIFtuYW1lOiBzdHJpbmddOiB7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgYWdlbnQ6IFJldHVyblR5cGU8dHlwZW9mIFByb3h5QWdlbnQ+IHwgQWdlbnQ7XG4gIH07XG59O1xuY29uc3QgYWdlbnRzOiBBZ2VudENhY2hlVHlwZSA9IHt9O1xuXG5mdW5jdGlvbiBnZXRDb250ZW50VHlwZShyZXNwb25zZTogUmVzcG9uc2UpIHtcbiAgaWYgKHJlc3BvbnNlLmhlYWRlcnMgJiYgcmVzcG9uc2UuaGVhZGVycy5nZXQpIHtcbiAgICByZXR1cm4gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtdHlwZScpO1xuICB9XG5cbiAgcmV0dXJuIG51bGw7XG59XG5cbnR5cGUgRmV0Y2hIZWFkZXJMaXN0VHlwZSA9IHsgW25hbWU6IHN0cmluZ106IHN0cmluZyB9O1xuZXhwb3J0IHR5cGUgSGVhZGVyTGlzdFR5cGUgPSB7IFtuYW1lOiBzdHJpbmddOiBzdHJpbmcgfCBSZWFkb25seUFycmF5PHN0cmluZz4gfTtcbnR5cGUgSFRUUENvZGVUeXBlID0gJ0dFVCcgfCAnUE9TVCcgfCAnUFVUJyB8ICdERUxFVEUnIHwgJ1BBVENIJyB8ICdIRUFEJztcblxudHlwZSBSZWRhY3RVcmwgPSAodXJsOiBzdHJpbmcpID0+IHN0cmluZztcblxudHlwZSBQcm9taXNlQWpheE9wdGlvbnNUeXBlID0ge1xuICBzb2NrZXRNYW5hZ2VyPzogU29ja2V0TWFuYWdlcjtcbiAgYmFzaWNBdXRoPzogc3RyaW5nO1xuICBjZXJ0aWZpY2F0ZUF1dGhvcml0eT86IHN0cmluZztcbiAgY29udGVudFR5cGU/OiBzdHJpbmc7XG4gIGRhdGE/OiBVaW50OEFycmF5IHwgc3RyaW5nO1xuICBoZWFkZXJzPzogSGVhZGVyTGlzdFR5cGU7XG4gIGhvc3Q/OiBzdHJpbmc7XG4gIHBhc3N3b3JkPzogc3RyaW5nO1xuICBwYXRoPzogc3RyaW5nO1xuICBwcm94eVVybD86IHN0cmluZztcbiAgcmVkYWN0VXJsPzogUmVkYWN0VXJsO1xuICByZWRpcmVjdD86ICdlcnJvcicgfCAnZm9sbG93JyB8ICdtYW51YWwnO1xuICByZXNwb25zZVR5cGU/OlxuICAgIHwgJ2pzb24nXG4gICAgfCAnanNvbndpdGhkZXRhaWxzJ1xuICAgIHwgJ2J5dGVzJ1xuICAgIHwgJ2J5dGVzd2l0aGRldGFpbHMnXG4gICAgfCAnc3RyZWFtJztcbiAgc2VydmVyVXJsPzogc3RyaW5nO1xuICBzdGFjaz86IHN0cmluZztcbiAgdGltZW91dD86IG51bWJlcjtcbiAgdHlwZTogSFRUUENvZGVUeXBlO1xuICB1c2VyPzogc3RyaW5nO1xuICB2YWxpZGF0ZVJlc3BvbnNlPzogYW55O1xuICB2ZXJzaW9uOiBzdHJpbmc7XG4gIGFib3J0U2lnbmFsPzogQWJvcnRTaWduYWw7XG59ICYgKFxuICB8IHtcbiAgICAgIHVuYXV0aGVudGljYXRlZD86IGZhbHNlO1xuICAgICAgYWNjZXNzS2V5Pzogc3RyaW5nO1xuICAgIH1cbiAgfCB7XG4gICAgICB1bmF1dGhlbnRpY2F0ZWQ6IHRydWU7XG4gICAgICBhY2Nlc3NLZXk6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICB9XG4pO1xuXG50eXBlIEpTT05XaXRoRGV0YWlsc1R5cGU8RGF0YSA9IHVua25vd24+ID0ge1xuICBkYXRhOiBEYXRhO1xuICBjb250ZW50VHlwZTogc3RyaW5nIHwgbnVsbDtcbiAgcmVzcG9uc2U6IFJlc3BvbnNlO1xufTtcbnR5cGUgQnl0ZXNXaXRoRGV0YWlsc1R5cGUgPSB7XG4gIGRhdGE6IFVpbnQ4QXJyYXk7XG4gIGNvbnRlbnRUeXBlOiBzdHJpbmcgfCBudWxsO1xuICByZXNwb25zZTogUmVzcG9uc2U7XG59O1xuXG5leHBvcnQgY29uc3QgbXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVNjaGVtYSA9IHpcbiAgLm9iamVjdCh7XG4gICAgdXVpZHM0MDQ6IHouYXJyYXkoei5zdHJpbmcoKSkub3B0aW9uYWwoKSxcbiAgICBuZWVkc1N5bmM6IHouYm9vbGVhbigpLm9wdGlvbmFsKCksXG4gIH0pXG4gIC5wYXNzdGhyb3VnaCgpO1xuZXhwb3J0IHR5cGUgTXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVR5cGUgPSB6LmluZmVyPFxuICB0eXBlb2YgbXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVNjaGVtYVxuPjtcblxuZXhwb3J0IGNvbnN0IG11bHRpUmVjaXBpZW50NDA5UmVzcG9uc2VTY2hlbWEgPSB6LmFycmF5KFxuICB6XG4gICAgLm9iamVjdCh7XG4gICAgICB1dWlkOiB6LnN0cmluZygpLFxuICAgICAgZGV2aWNlczogelxuICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICBtaXNzaW5nRGV2aWNlczogei5hcnJheSh6Lm51bWJlcigpKS5vcHRpb25hbCgpLFxuICAgICAgICAgIGV4dHJhRGV2aWNlczogei5hcnJheSh6Lm51bWJlcigpKS5vcHRpb25hbCgpLFxuICAgICAgICB9KVxuICAgICAgICAucGFzc3Rocm91Z2goKSxcbiAgICB9KVxuICAgIC5wYXNzdGhyb3VnaCgpXG4pO1xuZXhwb3J0IHR5cGUgTXVsdGlSZWNpcGllbnQ0MDlSZXNwb25zZVR5cGUgPSB6LmluZmVyPFxuICB0eXBlb2YgbXVsdGlSZWNpcGllbnQ0MDlSZXNwb25zZVNjaGVtYVxuPjtcblxuZXhwb3J0IGNvbnN0IG11bHRpUmVjaXBpZW50NDEwUmVzcG9uc2VTY2hlbWEgPSB6LmFycmF5KFxuICB6XG4gICAgLm9iamVjdCh7XG4gICAgICB1dWlkOiB6LnN0cmluZygpLFxuICAgICAgZGV2aWNlczogelxuICAgICAgICAub2JqZWN0KHtcbiAgICAgICAgICBzdGFsZURldmljZXM6IHouYXJyYXkoei5udW1iZXIoKSkub3B0aW9uYWwoKSxcbiAgICAgICAgfSlcbiAgICAgICAgLnBhc3N0aHJvdWdoKCksXG4gICAgfSlcbiAgICAucGFzc3Rocm91Z2goKVxuKTtcbmV4cG9ydCB0eXBlIE11bHRpUmVjaXBpZW50NDEwUmVzcG9uc2VUeXBlID0gei5pbmZlcjxcbiAgdHlwZW9mIG11bHRpUmVjaXBpZW50NDEwUmVzcG9uc2VTY2hlbWFcbj47XG5cbmZ1bmN0aW9uIGlzU3VjY2VzcyhzdGF0dXM6IG51bWJlcik6IGJvb2xlYW4ge1xuICByZXR1cm4gc3RhdHVzID49IDAgJiYgc3RhdHVzIDwgNDAwO1xufVxuXG5mdW5jdGlvbiBnZXRIb3N0bmFtZSh1cmw6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IHVybE9iamVjdCA9IG5ldyBVUkwodXJsKTtcbiAgcmV0dXJuIHVybE9iamVjdC5ob3N0bmFtZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX3Byb21pc2VBamF4KFxuICBwcm92aWRlZFVybDogc3RyaW5nIHwgbnVsbCxcbiAgb3B0aW9uczogUHJvbWlzZUFqYXhPcHRpb25zVHlwZVxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGNvbnN0IHsgcHJveHlVcmwsIHNvY2tldE1hbmFnZXIgfSA9IG9wdGlvbnM7XG5cbiAgY29uc3QgdXJsID0gcHJvdmlkZWRVcmwgfHwgYCR7b3B0aW9ucy5ob3N0fS8ke29wdGlvbnMucGF0aH1gO1xuICBjb25zdCBsb2dUeXBlID0gc29ja2V0TWFuYWdlciA/ICcoV1MpJyA6ICcoUkVTVCknO1xuICBjb25zdCByZWRhY3RlZFVSTCA9IG9wdGlvbnMucmVkYWN0VXJsID8gb3B0aW9ucy5yZWRhY3RVcmwodXJsKSA6IHVybDtcblxuICBjb25zdCB1bmF1dGhMYWJlbCA9IG9wdGlvbnMudW5hdXRoZW50aWNhdGVkID8gJyAodW5hdXRoKScgOiAnJztcbiAgbG9nLmluZm8oYCR7b3B0aW9ucy50eXBlfSAke2xvZ1R5cGV9ICR7cmVkYWN0ZWRVUkx9JHt1bmF1dGhMYWJlbH1gKTtcblxuICBjb25zdCB0aW1lb3V0ID0gdHlwZW9mIG9wdGlvbnMudGltZW91dCA9PT0gJ251bWJlcicgPyBvcHRpb25zLnRpbWVvdXQgOiAxMDAwMDtcblxuICBjb25zdCBhZ2VudFR5cGUgPSBvcHRpb25zLnVuYXV0aGVudGljYXRlZCA/ICd1bmF1dGgnIDogJ2F1dGgnO1xuICBjb25zdCBjYWNoZUtleSA9IGAke3Byb3h5VXJsfS0ke2FnZW50VHlwZX1gO1xuXG4gIGNvbnN0IHsgdGltZXN0YW1wIH0gPSBhZ2VudHNbY2FjaGVLZXldIHx8IHsgdGltZXN0YW1wOiBudWxsIH07XG4gIGlmICghdGltZXN0YW1wIHx8IHRpbWVzdGFtcCArIEZJVkVfTUlOVVRFUyA8IERhdGUubm93KCkpIHtcbiAgICBpZiAodGltZXN0YW1wKSB7XG4gICAgICBsb2cuaW5mbyhgQ3ljbGluZyBhZ2VudCBmb3IgdHlwZSAke2NhY2hlS2V5fWApO1xuICAgIH1cbiAgICBhZ2VudHNbY2FjaGVLZXldID0ge1xuICAgICAgYWdlbnQ6IHByb3h5VXJsXG4gICAgICAgID8gbmV3IFByb3h5QWdlbnQocHJveHlVcmwpXG4gICAgICAgIDogbmV3IEFnZW50KHsga2VlcEFsaXZlOiB0cnVlIH0pLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH07XG4gIH1cblxuICAvLyBhZ2VudCAmIGNhIDogY2hhbmdlIGh0dHBzIHRvIGh0dHAgYXQgZGV2ZWxvcG1lbnQgZW52aXJvbm1lbnRcbiAgLy8gY29uc3QgeyBhZ2VudCB9ID0gYWdlbnRzW2NhY2hlS2V5XTtcblxuICBjb25zdCBmZXRjaE9wdGlvbnMgPSB7XG4gICAgbWV0aG9kOiBvcHRpb25zLnR5cGUsXG4gICAgYm9keTogb3B0aW9ucy5kYXRhLFxuICAgIGhlYWRlcnM6IHtcbiAgICAgICdVc2VyLUFnZW50JzogZ2V0VXNlckFnZW50KG9wdGlvbnMudmVyc2lvbiksXG4gICAgICAnWC1TaWduYWwtQWdlbnQnOiAnT1dEJyxcbiAgICAgIC4uLm9wdGlvbnMuaGVhZGVycyxcbiAgICB9IGFzIEZldGNoSGVhZGVyTGlzdFR5cGUsXG4gICAgcmVkaXJlY3Q6IG9wdGlvbnMucmVkaXJlY3QsXG4gICAgLy8gYWdlbnQsXG4gICAgLy8gY2E6IG9wdGlvbnMuY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgdGltZW91dCxcbiAgICBhYm9ydFNpZ25hbDogb3B0aW9ucy5hYm9ydFNpZ25hbCxcbiAgfTtcblxuICBpZiAoZmV0Y2hPcHRpb25zLmJvZHkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgLy8gbm9kZS1mZXRjaCBkb2Vzbid0IHN1cHBvcnQgVWludDhBcnJheSwgb25seSBub2RlIEJ1ZmZlclxuICAgIGNvbnN0IGNvbnRlbnRMZW5ndGggPSBmZXRjaE9wdGlvbnMuYm9keS5ieXRlTGVuZ3RoO1xuICAgIGZldGNoT3B0aW9ucy5ib2R5ID0gQnVmZmVyLmZyb20oZmV0Y2hPcHRpb25zLmJvZHkpO1xuXG4gICAgLy8gbm9kZS1mZXRjaCBkb2Vzbid0IHNldCBjb250ZW50LWxlbmd0aCBsaWtlIFMzIHJlcXVpcmVzXG4gICAgZmV0Y2hPcHRpb25zLmhlYWRlcnNbJ0NvbnRlbnQtTGVuZ3RoJ10gPSBjb250ZW50TGVuZ3RoLnRvU3RyaW5nKCk7XG4gIH1cblxuICBjb25zdCB7IGFjY2Vzc0tleSwgYmFzaWNBdXRoLCB1bmF1dGhlbnRpY2F0ZWQgfSA9IG9wdGlvbnM7XG4gIGlmIChiYXNpY0F1dGgpIHtcbiAgICBmZXRjaE9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gYEJhc2ljICR7YmFzaWNBdXRofWA7XG4gIH0gZWxzZSBpZiAodW5hdXRoZW50aWNhdGVkKSB7XG4gICAgaWYgKGFjY2Vzc0tleSkge1xuICAgICAgLy8gQWNjZXNzIGtleSBpcyBhbHJlYWR5IGEgQmFzZTY0IHN0cmluZ1xuICAgICAgZmV0Y2hPcHRpb25zLmhlYWRlcnNbJ1VuaWRlbnRpZmllZC1BY2Nlc3MtS2V5J10gPSBhY2Nlc3NLZXk7XG4gICAgfVxuICB9IGVsc2UgaWYgKG9wdGlvbnMudXNlciAmJiBvcHRpb25zLnBhc3N3b3JkKSB7XG4gICAgLy8gYWNjb3VudHMvY29kZSBkbyBub3QgbmVlZCBiYXNlNjRcbiAgICBpZiAob3B0aW9ucy5wYXRoID09PSAndjEvYWNjb3VudHMvY29kZS84ODg4ODgnKSB7XG4gICAgICBsb2cuaW5mbygnc3BlY2lhbCB1cmwnKTtcbiAgICAgIGZldGNoT3B0aW9ucy5oZWFkZXJzLkF1dGhvcml6YXRpb24gPSBgQmFzaWMgJHtvcHRpb25zLnVzZXJ9OiR7b3B0aW9ucy5wYXNzd29yZH1gO1xuICAgIH0gZWxzZSB7XG4gICAgICBmZXRjaE9wdGlvbnMuaGVhZGVycy5BdXRob3JpemF0aW9uID0gZ2V0QmFzaWNBdXRoKHtcbiAgICAgICAgdXNlcm5hbWU6IG9wdGlvbnMudXNlcixcbiAgICAgICAgcGFzc3dvcmQ6IG9wdGlvbnMucGFzc3dvcmQsXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBpZiAob3B0aW9ucy5jb250ZW50VHlwZSkge1xuICAgIGZldGNoT3B0aW9ucy5oZWFkZXJzWydDb250ZW50LVR5cGUnXSA9IG9wdGlvbnMuY29udGVudFR5cGU7XG4gIH1cblxuICAvLyBwcmludCBzZW5kIHNvY2tldCBtZXNzYWdlc1xuICBsb2cuaW5mbyhgc29ja2V0IE1lc3NhZ2VzOiR7SlNPTi5zdHJpbmdpZnkoZmV0Y2hPcHRpb25zKX1gKTtcblxuICBsZXQgcmVzcG9uc2U6IFJlc3BvbnNlO1xuICBsZXQgcmVzdWx0OiBzdHJpbmcgfCBVaW50OEFycmF5IHwgUmVhZGFibGUgfCB1bmtub3duO1xuICB0cnkge1xuICAgIHJlc3BvbnNlID0gc29ja2V0TWFuYWdlclxuICAgICAgPyBhd2FpdCBzb2NrZXRNYW5hZ2VyLmZldGNoKHVybCwgZmV0Y2hPcHRpb25zKVxuICAgICAgOiBhd2FpdCBmZXRjaCh1cmwsIGZldGNoT3B0aW9ucyk7XG5cbiAgICBpZiAoXG4gICAgICBvcHRpb25zLnNlcnZlclVybCAmJlxuICAgICAgZ2V0SG9zdG5hbWUob3B0aW9ucy5zZXJ2ZXJVcmwpID09PSBnZXRIb3N0bmFtZSh1cmwpXG4gICAgKSB7XG4gICAgICBhd2FpdCBoYW5kbGVTdGF0dXNDb2RlKHJlc3BvbnNlLnN0YXR1cyk7XG5cbiAgICAgIGlmICghdW5hdXRoZW50aWNhdGVkICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gNDAxKSB7XG4gICAgICAgIGxvZy5lcnJvcignR290IDQwMSBmcm9tIFNpZ25hbCBTZXJ2ZXIuIFdlIG1pZ2h0IGJlIHVubGlua2VkLicpO1xuICAgICAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcignbWlnaHRCZVVubGlua2VkJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKERFQlVHICYmICFpc1N1Y2Nlc3MocmVzcG9uc2Uuc3RhdHVzKSkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UudGV4dCgpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICAob3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICdqc29uJyB8fFxuICAgICAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb253aXRoZGV0YWlscycpICYmXG4gICAgICAvXmFwcGxpY2F0aW9uXFwvanNvbig7LiopPyQvLnRlc3QoXG4gICAgICAgIHJlc3BvbnNlLmhlYWRlcnMuZ2V0KCdDb250ZW50LVR5cGUnKSB8fCAnJ1xuICAgICAgKVxuICAgICkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuanNvbigpO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ2J5dGVzJyB8fFxuICAgICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICdieXRlc3dpdGhkZXRhaWxzJ1xuICAgICkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgcmVzcG9uc2UuYnVmZmVyKCk7XG4gICAgfSBlbHNlIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ3N0cmVhbScpIHtcbiAgICAgIHJlc3VsdCA9IHJlc3BvbnNlLmJvZHk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdCA9IGF3YWl0IHJlc3BvbnNlLnRleHRDb252ZXJ0ZWQoKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICBsb2cuZXJyb3Iob3B0aW9ucy50eXBlLCBsb2dUeXBlLCByZWRhY3RlZFVSTCwgMCwgJ0Vycm9yJyk7XG4gICAgY29uc3Qgc3RhY2sgPSBgJHtlLnN0YWNrfVxcbkluaXRpYWwgc3RhY2s6XFxuJHtvcHRpb25zLnN0YWNrfWA7XG4gICAgdGhyb3cgbWFrZUhUVFBFcnJvcigncHJvbWlzZUFqYXggY2F0Y2gnLCAwLCB7fSwgZS50b1N0cmluZygpLCBzdGFjayk7XG4gIH1cblxuICBpZiAoIWlzU3VjY2VzcyhyZXNwb25zZS5zdGF0dXMpKSB7XG4gICAgbG9nLmVycm9yKG9wdGlvbnMudHlwZSwgbG9nVHlwZSwgcmVkYWN0ZWRVUkwsIHJlc3BvbnNlLnN0YXR1cywgJ0Vycm9yJyk7XG5cbiAgICB0aHJvdyBtYWtlSFRUUEVycm9yKFxuICAgICAgJ3Byb21pc2VBamF4OiBlcnJvciByZXNwb25zZScsXG4gICAgICByZXNwb25zZS5zdGF0dXMsXG4gICAgICByZXNwb25zZS5oZWFkZXJzLnJhdygpLFxuICAgICAgcmVzdWx0LFxuICAgICAgb3B0aW9ucy5zdGFja1xuICAgICk7XG4gIH1cblxuICBpZiAoXG4gICAgb3B0aW9ucy5yZXNwb25zZVR5cGUgPT09ICdqc29uJyB8fFxuICAgIG9wdGlvbnMucmVzcG9uc2VUeXBlID09PSAnanNvbndpdGhkZXRhaWxzJ1xuICApIHtcbiAgICBpZiAob3B0aW9ucy52YWxpZGF0ZVJlc3BvbnNlKSB7XG4gICAgICBpZiAoIV92YWxpZGF0ZVJlc3BvbnNlKHJlc3VsdCwgb3B0aW9ucy52YWxpZGF0ZVJlc3BvbnNlKSkge1xuICAgICAgICBsb2cuZXJyb3Iob3B0aW9ucy50eXBlLCBsb2dUeXBlLCByZWRhY3RlZFVSTCwgcmVzcG9uc2Uuc3RhdHVzLCAnRXJyb3InKTtcbiAgICAgICAgdGhyb3cgbWFrZUhUVFBFcnJvcihcbiAgICAgICAgICAncHJvbWlzZUFqYXg6IGludmFsaWQgcmVzcG9uc2UnLFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICByZXNwb25zZS5oZWFkZXJzLnJhdygpLFxuICAgICAgICAgIHJlc3VsdCxcbiAgICAgICAgICBvcHRpb25zLnN0YWNrXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgbG9nLmluZm8ob3B0aW9ucy50eXBlLCBsb2dUeXBlLCByZWRhY3RlZFVSTCwgcmVzcG9uc2Uuc3RhdHVzLCAnU3VjY2VzcycpO1xuXG4gIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ2J5dGVzd2l0aGRldGFpbHMnKSB7XG4gICAgYXNzZXJ0KHJlc3VsdCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXksICdFeHBlY3RlZCBVaW50OEFycmF5IHJlc3VsdCcpO1xuICAgIGNvbnN0IGZ1bGxSZXN1bHQ6IEJ5dGVzV2l0aERldGFpbHNUeXBlID0ge1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY29udGVudFR5cGU6IGdldENvbnRlbnRUeXBlKHJlc3BvbnNlKSxcbiAgICAgIHJlc3BvbnNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gZnVsbFJlc3VsdDtcbiAgfVxuXG4gIGlmIChvcHRpb25zLnJlc3BvbnNlVHlwZSA9PT0gJ2pzb253aXRoZGV0YWlscycpIHtcbiAgICBjb25zdCBmdWxsUmVzdWx0OiBKU09OV2l0aERldGFpbHNUeXBlID0ge1xuICAgICAgZGF0YTogcmVzdWx0LFxuICAgICAgY29udGVudFR5cGU6IGdldENvbnRlbnRUeXBlKHJlc3BvbnNlKSxcbiAgICAgIHJlc3BvbnNlLFxuICAgIH07XG5cbiAgICByZXR1cm4gZnVsbFJlc3VsdDtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9yZXRyeUFqYXgoXG4gIHVybDogc3RyaW5nIHwgbnVsbCxcbiAgb3B0aW9uczogUHJvbWlzZUFqYXhPcHRpb25zVHlwZSxcbiAgcHJvdmlkZWRMaW1pdD86IG51bWJlcixcbiAgcHJvdmlkZWRDb3VudD86IG51bWJlclxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIGNvbnN0IGNvdW50ID0gKHByb3ZpZGVkQ291bnQgfHwgMCkgKyAxO1xuICBjb25zdCBsaW1pdCA9IHByb3ZpZGVkTGltaXQgfHwgMztcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCBfcHJvbWlzZUFqYXgodXJsLCBvcHRpb25zKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGlmIChlIGluc3RhbmNlb2YgSFRUUEVycm9yICYmIGUuY29kZSA9PT0gLTEgJiYgY291bnQgPCBsaW1pdCkge1xuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlKHJlc29sdmUgPT4ge1xuICAgICAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgICAgICByZXNvbHZlKF9yZXRyeUFqYXgodXJsLCBvcHRpb25zLCBsaW1pdCwgY291bnQpKTtcbiAgICAgICAgfSwgMTAwMCk7XG4gICAgICB9KTtcbiAgICB9XG4gICAgdGhyb3cgZTtcbiAgfVxufVxuXG5mdW5jdGlvbiBfb3V0ZXJBamF4KFxuICBwcm92aWRlZFVybDogc3RyaW5nIHwgbnVsbCxcbiAgb3B0aW9uczogUHJvbWlzZUFqYXhPcHRpb25zVHlwZSAmIHsgcmVzcG9uc2VUeXBlOiAnanNvbicgfVxuKTogUHJvbWlzZTx1bmtub3duPjtcbmZ1bmN0aW9uIF9vdXRlckFqYXgoXG4gIHByb3ZpZGVkVXJsOiBzdHJpbmcgfCBudWxsLFxuICBvcHRpb25zOiBQcm9taXNlQWpheE9wdGlvbnNUeXBlICYgeyByZXNwb25zZVR5cGU6ICdqc29ud2l0aGRldGFpbHMnIH1cbik6IFByb21pc2U8SlNPTldpdGhEZXRhaWxzVHlwZT47XG5mdW5jdGlvbiBfb3V0ZXJBamF4KFxuICBwcm92aWRlZFVybDogc3RyaW5nIHwgbnVsbCxcbiAgb3B0aW9uczogUHJvbWlzZUFqYXhPcHRpb25zVHlwZSAmIHsgcmVzcG9uc2VUeXBlPzogJ2J5dGVzJyB9XG4pOiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuZnVuY3Rpb24gX291dGVyQWpheChcbiAgcHJvdmlkZWRVcmw6IHN0cmluZyB8IG51bGwsXG4gIG9wdGlvbnM6IFByb21pc2VBamF4T3B0aW9uc1R5cGUgJiB7IHJlc3BvbnNlVHlwZTogJ2J5dGVzd2l0aGRldGFpbHMnIH1cbik6IFByb21pc2U8Qnl0ZXNXaXRoRGV0YWlsc1R5cGU+O1xuZnVuY3Rpb24gX291dGVyQWpheChcbiAgcHJvdmlkZWRVcmw6IHN0cmluZyB8IG51bGwsXG4gIG9wdGlvbnM6IFByb21pc2VBamF4T3B0aW9uc1R5cGUgJiB7IHJlc3BvbnNlVHlwZT86ICdzdHJlYW0nIH1cbik6IFByb21pc2U8UmVhZGFibGU+O1xuZnVuY3Rpb24gX291dGVyQWpheChcbiAgcHJvdmlkZWRVcmw6IHN0cmluZyB8IG51bGwsXG4gIG9wdGlvbnM6IFByb21pc2VBamF4T3B0aW9uc1R5cGVcbik6IFByb21pc2U8dW5rbm93bj47XG5cbmFzeW5jIGZ1bmN0aW9uIF9vdXRlckFqYXgoXG4gIHVybDogc3RyaW5nIHwgbnVsbCxcbiAgb3B0aW9uczogUHJvbWlzZUFqYXhPcHRpb25zVHlwZVxuKTogUHJvbWlzZTx1bmtub3duPiB7XG4gIG9wdGlvbnMuc3RhY2sgPSBuZXcgRXJyb3IoKS5zdGFjazsgLy8ganVzdCBpbiBjYXNlLCBzYXZlIHN0YWNrIGhlcmUuXG5cbiAgcmV0dXJuIF9yZXRyeUFqYXgodXJsLCBvcHRpb25zKTtcbn1cblxuZnVuY3Rpb24gbWFrZUhUVFBFcnJvcihcbiAgbWVzc2FnZTogc3RyaW5nLFxuICBwcm92aWRlZENvZGU6IG51bWJlcixcbiAgaGVhZGVyczogSGVhZGVyTGlzdFR5cGUsXG4gIHJlc3BvbnNlOiB1bmtub3duLFxuICBzdGFjaz86IHN0cmluZ1xuKSB7XG4gIHJldHVybiBuZXcgSFRUUEVycm9yKG1lc3NhZ2UsIHtcbiAgICBjb2RlOiBwcm92aWRlZENvZGUsXG4gICAgaGVhZGVycyxcbiAgICByZXNwb25zZSxcbiAgICBzdGFjayxcbiAgfSk7XG59XG5cbmNvbnN0IFVSTF9DQUxMUyA9IHtcbiAgYWNjb3VudHM6ICd2MS9hY2NvdW50cycsXG4gIGFjY291bnRFeGlzdGVuY2U6ICd2MS9hY2NvdW50cy9hY2NvdW50JyxcbiAgYXR0YWNobWVudElkOiAndjIvYXR0YWNobWVudHMvZm9ybS91cGxvYWQnLFxuICBhdHRlc3RhdGlvbjogJ3YxL2F0dGVzdGF0aW9uJyxcbiAgYm9vc3RCYWRnZXM6ICd2MS9zdWJzY3JpcHRpb24vYm9vc3QvYmFkZ2VzJywgLy9cbiAgY2hhbGxlbmdlOiAndjEvY2hhbGxlbmdlJyxcbiAgY29uZmlnOiAndjEvY29uZmlnJyxcbiAgZGVsaXZlcnlDZXJ0OiAndjEvY2VydGlmaWNhdGUvZGVsaXZlcnknLFxuICBkZXZpY2VzOiAndjEvZGV2aWNlcycsXG4gIGRpcmVjdG9yeUF1dGg6ICd2MS9kaXJlY3RvcnkvYXV0aCcsXG4gIGRpcmVjdG9yeUF1dGhWMjogJ3YyL2RpcmVjdG9yeS9hdXRoJyxcbiAgZGlzY292ZXJ5OiAndjEvZGlzY292ZXJ5JyxcbiAgZ2V0R3JvdXBBdmF0YXJVcGxvYWQ6ICd2MS9ncm91cHMvYXZhdGFyL2Zvcm0nLFxuICBnZXRHcm91cENyZWRlbnRpYWxzOiAndjEvY2VydGlmaWNhdGUvZ3JvdXAnLFxuICBnZXRJY2VTZXJ2ZXJzOiAndjEvYWNjb3VudHMvdHVybicsXG4gIGdldFN0aWNrZXJQYWNrVXBsb2FkOiAndjEvc3RpY2tlci9wYWNrL2Zvcm0nLFxuICBncm91cExvZzogJ3YxL2dyb3Vwcy9sb2dzJyxcbiAgZ3JvdXBKb2luZWRBdFZlcnNpb246ICd2MS9ncm91cHMvam9pbmVkX2F0X3ZlcnNpb24nLCAvL1xuICBncm91cHM6ICd2MS9ncm91cHMnLFxuICBncm91cHNWaWFMaW5rOiAndjEvZ3JvdXBzL2pvaW4vJyxcbiAgZ3JvdXBUb2tlbjogJ3YxL2dyb3Vwcy90b2tlbicsXG4gIGtleXM6ICd2Mi9rZXlzJyxcbiAgbWVzc2FnZXM6ICd2MS9tZXNzYWdlcycsXG4gIG11bHRpUmVjaXBpZW50OiAndjEvbWVzc2FnZXMvbXVsdGlfcmVjaXBpZW50JyxcbiAgcHJvZmlsZTogJ3YxL3Byb2ZpbGUnLFxuICByZWdpc3RlckNhcGFiaWxpdGllczogJ3YxL2RldmljZXMvY2FwYWJpbGl0aWVzJyxcbiAgcmVwb3J0TWVzc2FnZTogJ3YxL21lc3NhZ2VzL3JlcG9ydCcsXG4gIHNpZ25lZDogJ3YyL2tleXMvc2lnbmVkJyxcbiAgc3RvcmFnZU1hbmlmZXN0OiAndjEvc3RvcmFnZS9tYW5pZmVzdCcsXG4gIHN0b3JhZ2VNb2RpZnk6ICd2MS9zdG9yYWdlLycsXG4gIHN0b3JhZ2VSZWFkOiAndjEvc3RvcmFnZS9yZWFkJyxcbiAgc3RvcmFnZVRva2VuOiAndjEvc3RvcmFnZS9hdXRoJyxcbiAgc3Vic2NyaXB0aW9uczogJ3YxL3N1YnNjcmlwdGlvbicsXG4gIHN1cHBvcnRVbmF1dGhlbnRpY2F0ZWREZWxpdmVyeTogJ3YxL2RldmljZXMvdW5hdXRoZW50aWNhdGVkX2RlbGl2ZXJ5JyxcbiAgdXBkYXRlRGV2aWNlTmFtZTogJ3YxL2FjY291bnRzL25hbWUnLFxuICB1c2VybmFtZTogJ3YxL2FjY291bnRzL3VzZXJuYW1lJyxcbiAgd2hvYW1pOiAndjEvYWNjb3VudHMvd2hvYW1pJyxcbn07XG5cbmNvbnN0IFdFQlNPQ0tFVF9DQUxMUyA9IG5ldyBTZXQ8a2V5b2YgdHlwZW9mIFVSTF9DQUxMUz4oW1xuICAvLyBNZXNzYWdlQ29udHJvbGxlclxuICAnbWVzc2FnZXMnLFxuICAnbXVsdGlSZWNpcGllbnQnLFxuICAncmVwb3J0TWVzc2FnZScsXG5cbiAgLy8gUHJvZmlsZUNvbnRyb2xsZXJcbiAgJ3Byb2ZpbGUnLFxuXG4gIC8vIEF0dGFjaG1lbnRDb250cm9sbGVyVjJcbiAgJ2F0dGFjaG1lbnRJZCcsXG5cbiAgLy8gUmVtb3RlQ29uZmlnQ29udHJvbGxlclxuICAnY29uZmlnJyxcblxuICAvLyBDZXJ0aWZpY2F0ZVxuICAnZGVsaXZlcnlDZXJ0JyxcbiAgJ2dldEdyb3VwQ3JlZGVudGlhbHMnLFxuXG4gIC8vIERldmljZXNcbiAgJ2RldmljZXMnLFxuICAncmVnaXN0ZXJDYXBhYmlsaXRpZXMnLFxuICAnc3VwcG9ydFVuYXV0aGVudGljYXRlZERlbGl2ZXJ5JyxcblxuICAvLyBEaXJlY3RvcnlcbiAgJ2RpcmVjdG9yeUF1dGgnLFxuICAnZGlyZWN0b3J5QXV0aFYyJyxcblxuICAvLyBTdG9yYWdlXG4gICdzdG9yYWdlVG9rZW4nLFxuXSk7XG5cbnR5cGUgRGlyZWN0b3J5VjFPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgZGlyZWN0b3J5VmVyc2lvbjogMTtcbiAgZGlyZWN0b3J5VXJsOiBzdHJpbmc7XG4gIGRpcmVjdG9yeUVuY2xhdmVJZDogc3RyaW5nO1xuICBkaXJlY3RvcnlUcnVzdEFuY2hvcjogc3RyaW5nO1xufT47XG5cbnR5cGUgRGlyZWN0b3J5VjJPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgZGlyZWN0b3J5VmVyc2lvbjogMjtcbiAgZGlyZWN0b3J5VjJVcmw6IHN0cmluZztcbiAgZGlyZWN0b3J5VjJQdWJsaWNLZXk6IHN0cmluZztcbiAgZGlyZWN0b3J5VjJDb2RlSGFzaGVzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG59PjtcblxudHlwZSBEaXJlY3RvcnlWM09wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBkaXJlY3RvcnlWZXJzaW9uOiAzO1xuICBkaXJlY3RvcnlWM1VybDogc3RyaW5nO1xuICBkaXJlY3RvcnlWM01SRU5DTEFWRTogc3RyaW5nO1xuICBkaXJlY3RvcnlWM1Jvb3Q6IHN0cmluZztcbn0+O1xuXG50eXBlIE9wdGlvbmFsRGlyZWN0b3J5RmllbGRzVHlwZSA9IHtcbiAgZGlyZWN0b3J5VXJsPzogdW5rbm93bjtcbiAgZGlyZWN0b3J5RW5jbGF2ZUlkPzogdW5rbm93bjtcbiAgZGlyZWN0b3J5VHJ1c3RBbmNob3I/OiB1bmtub3duO1xuICBkaXJlY3RvcnlWMlVybD86IHVua25vd247XG4gIGRpcmVjdG9yeVYyUHVibGljS2V5PzogdW5rbm93bjtcbiAgZGlyZWN0b3J5VjJDb2RlSGFzaGVzPzogdW5rbm93bjtcbiAgZGlyZWN0b3J5VjNVcmw/OiB1bmtub3duO1xuICBkaXJlY3RvcnlWM01SRU5DTEFWRT86IHVua25vd247XG4gIGRpcmVjdG9yeVYzUm9vdD86IHVua25vd247XG59O1xuXG50eXBlIERpcmVjdG9yeU9wdGlvbnNUeXBlID0gT3B0aW9uYWxEaXJlY3RvcnlGaWVsZHNUeXBlICZcbiAgKERpcmVjdG9yeVYxT3B0aW9uc1R5cGUgfCBEaXJlY3RvcnlWMk9wdGlvbnNUeXBlIHwgRGlyZWN0b3J5VjNPcHRpb25zVHlwZSk7XG5cbnR5cGUgSW5pdGlhbGl6ZU9wdGlvbnNUeXBlID0ge1xuICB1cmw6IHN0cmluZztcbiAgc3RvcmFnZVVybDogc3RyaW5nO1xuICB1cGRhdGVzVXJsOiBzdHJpbmc7XG4gIGNkblVybE9iamVjdDoge1xuICAgIHJlYWRvbmx5ICcwJzogc3RyaW5nO1xuICAgIHJlYWRvbmx5IFtwcm9wTmFtZTogc3RyaW5nXTogc3RyaW5nO1xuICB9O1xuICBjZXJ0aWZpY2F0ZUF1dGhvcml0eTogc3RyaW5nO1xuICBjb250ZW50UHJveHlVcmw6IHN0cmluZztcbiAgcHJveHlVcmw6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBkaXJlY3RvcnlDb25maWc6IERpcmVjdG9yeU9wdGlvbnNUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZVR5cGUgPSBSZWFkb25seTx7XG4gIHR5cGU6IG51bWJlcjtcbiAgZGVzdGluYXRpb25EZXZpY2VJZDogbnVtYmVyO1xuICBkZXN0aW5hdGlvblJlZ2lzdHJhdGlvbklkOiBudW1iZXI7XG4gIGNvbnRlbnQ6IHN0cmluZztcbn0+O1xuXG50eXBlIEFqYXhPcHRpb25zVHlwZSA9IHtcbiAgYmFzaWNBdXRoPzogc3RyaW5nO1xuICBjYWxsOiBrZXlvZiB0eXBlb2YgVVJMX0NBTExTO1xuICBjb250ZW50VHlwZT86IHN0cmluZztcbiAgZGF0YT86IFVpbnQ4QXJyYXkgfCBCdWZmZXIgfCBVaW50OEFycmF5IHwgc3RyaW5nO1xuICBoZWFkZXJzPzogSGVhZGVyTGlzdFR5cGU7XG4gIGhvc3Q/OiBzdHJpbmc7XG4gIGh0dHBUeXBlOiBIVFRQQ29kZVR5cGU7XG4gIGpzb25EYXRhPzogdW5rbm93bjtcbiAgcGFzc3dvcmQ/OiBzdHJpbmc7XG4gIHJlZGFjdFVybD86IFJlZGFjdFVybDtcbiAgcmVzcG9uc2VUeXBlPzogJ2pzb24nIHwgJ2J5dGVzJyB8ICdieXRlc3dpdGhkZXRhaWxzJyB8ICdzdHJlYW0nO1xuICBzY2hlbWE/OiB1bmtub3duO1xuICB0aW1lb3V0PzogbnVtYmVyO1xuICB1cmxQYXJhbWV0ZXJzPzogc3RyaW5nO1xuICB1c2VybmFtZT86IHN0cmluZztcbiAgdmFsaWRhdGVSZXNwb25zZT86IGFueTtcbiAgaXNSZWdpc3RyYXRpb24/OiB0cnVlO1xufSAmIChcbiAgfCB7XG4gICAgICB1bmF1dGhlbnRpY2F0ZWQ/OiBmYWxzZTtcbiAgICAgIGFjY2Vzc0tleT86IHN0cmluZztcbiAgICB9XG4gIHwge1xuICAgICAgdW5hdXRoZW50aWNhdGVkOiB0cnVlO1xuICAgICAgYWNjZXNzS2V5OiB1bmRlZmluZWQgfCBzdHJpbmc7XG4gICAgfVxuKTtcblxuZXhwb3J0IHR5cGUgV2ViQVBJQ29ubmVjdE9wdGlvbnNUeXBlID0gV2ViQVBJQ3JlZGVudGlhbHMgJiB7XG4gIHVzZVdlYlNvY2tldD86IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBXZWJBUElDb25uZWN0VHlwZSA9IHtcbiAgY29ubmVjdDogKG9wdGlvbnM6IFdlYkFQSUNvbm5lY3RPcHRpb25zVHlwZSkgPT4gV2ViQVBJVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIENhcGFiaWxpdGllc1R5cGUgPSB7XG4gIGFubm91bmNlbWVudEdyb3VwOiBib29sZWFuO1xuICBnaWZ0QmFkZ2VzOiBib29sZWFuO1xuICAnZ3YxLW1pZ3JhdGlvbic6IGJvb2xlYW47XG4gIHNlbmRlcktleTogYm9vbGVhbjtcbiAgY2hhbmdlTnVtYmVyOiBib29sZWFuO1xuICBzdG9yaWVzOiBib29sZWFuO1xufTtcbmV4cG9ydCB0eXBlIENhcGFiaWxpdGllc1VwbG9hZFR5cGUgPSB7XG4gIGFubm91bmNlbWVudEdyb3VwOiB0cnVlO1xuICBnaWZ0QmFkZ2VzOiB0cnVlO1xuICAnZ3YyLTMnOiB0cnVlO1xuICAnZ3YxLW1pZ3JhdGlvbic6IHRydWU7XG4gIHNlbmRlcktleTogdHJ1ZTtcbiAgY2hhbmdlTnVtYmVyOiB0cnVlO1xuICBzdG9yaWVzOiB0cnVlO1xufTtcblxudHlwZSBTdGlja2VyUGFja01hbmlmZXN0VHlwZSA9IFVpbnQ4QXJyYXk7XG5cbmV4cG9ydCB0eXBlIEdyb3VwQ3JlZGVudGlhbFR5cGUgPSB7XG4gIGNyZWRlbnRpYWw6IHN0cmluZztcbiAgcmVkZW1wdGlvblRpbWU6IG51bWJlcjtcbn07XG5leHBvcnQgdHlwZSBHcm91cENyZWRlbnRpYWxzVHlwZSA9IHtcbiAgZ3JvdXBQdWJsaWNQYXJhbXNIZXg6IHN0cmluZztcbiAgYXV0aENyZWRlbnRpYWxQcmVzZW50YXRpb25IZXg6IHN0cmluZztcbn07XG5leHBvcnQgdHlwZSBHZXRHcm91cExvZ09wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBzdGFydFZlcnNpb246IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgaW5jbHVkZUZpcnN0U3RhdGU6IGJvb2xlYW47XG4gIGluY2x1ZGVMYXN0U3RhdGU6IGJvb2xlYW47XG4gIG1heFN1cHBvcnRlZENoYW5nZUVwb2NoOiBudW1iZXI7XG59PjtcbmV4cG9ydCB0eXBlIEdyb3VwTG9nUmVzcG9uc2VUeXBlID0ge1xuICBjdXJyZW50UmV2aXNpb24/OiBudW1iZXI7XG4gIHN0YXJ0PzogbnVtYmVyO1xuICBlbmQ/OiBudW1iZXI7XG4gIGNoYW5nZXM6IFByb3RvLkdyb3VwQ2hhbmdlcztcbn07XG5cbmV4cG9ydCB0eXBlIFByb2ZpbGVSZXF1ZXN0RGF0YVR5cGUgPSB7XG4gIGFib3V0OiBzdHJpbmcgfCBudWxsO1xuICBhYm91dEVtb2ppOiBzdHJpbmcgfCBudWxsO1xuICBhdmF0YXI6IGJvb2xlYW47XG4gIHNhbWVBdmF0YXI6IGJvb2xlYW47XG4gIGNvbW1pdG1lbnQ6IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBwYXltZW50QWRkcmVzczogc3RyaW5nIHwgbnVsbDtcbiAgdmVyc2lvbjogc3RyaW5nO1xufTtcblxuY29uc3QgdXBsb2FkQXZhdGFySGVhZGVyc1pvZCA9IHpcbiAgLm9iamVjdCh7XG4gICAgYWNsOiB6LnN0cmluZygpLFxuICAgIGFsZ29yaXRobTogei5zdHJpbmcoKSxcbiAgICBjcmVkZW50aWFsOiB6LnN0cmluZygpLFxuICAgIGRhdGU6IHouc3RyaW5nKCksXG4gICAga2V5OiB6LnN0cmluZygpLFxuICAgIHBvbGljeTogei5zdHJpbmcoKSxcbiAgICBzaWduYXR1cmU6IHouc3RyaW5nKCksXG4gIH0pXG4gIC5wYXNzdGhyb3VnaCgpO1xuZXhwb3J0IHR5cGUgVXBsb2FkQXZhdGFySGVhZGVyc1R5cGUgPSB6LmluZmVyPHR5cGVvZiB1cGxvYWRBdmF0YXJIZWFkZXJzWm9kPjtcblxuZXhwb3J0IHR5cGUgUHJvZmlsZVR5cGUgPSBSZWFkb25seTx7XG4gIGlkZW50aXR5S2V5Pzogc3RyaW5nO1xuICBuYW1lPzogc3RyaW5nO1xuICBhYm91dD86IHN0cmluZztcbiAgYWJvdXRFbW9qaT86IHN0cmluZztcbiAgYXZhdGFyPzogc3RyaW5nO1xuICB1bmlkZW50aWZpZWRBY2Nlc3M/OiBzdHJpbmc7XG4gIHVucmVzdHJpY3RlZFVuaWRlbnRpZmllZEFjY2Vzcz86IHN0cmluZztcbiAgdXVpZD86IHN0cmluZztcbiAgY3JlZGVudGlhbD86IHN0cmluZztcbiAgY2FwYWJpbGl0aWVzPzogQ2FwYWJpbGl0aWVzVHlwZTtcbiAgcGF5bWVudEFkZHJlc3M/OiBzdHJpbmc7XG4gIGJhZGdlcz86IHVua25vd247XG59PjtcblxuZXhwb3J0IHR5cGUgR2V0SWNlU2VydmVyc1Jlc3VsdFR5cGUgPSBSZWFkb25seTx7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIHBhc3N3b3JkOiBzdHJpbmc7XG4gIHVybHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn0+O1xuXG5leHBvcnQgdHlwZSBHZXREZXZpY2VzUmVzdWx0VHlwZSA9IFJlYWRvbmx5QXJyYXk8XG4gIFJlYWRvbmx5PHtcbiAgICBpZDogbnVtYmVyO1xuICAgIG5hbWU6IHN0cmluZztcbiAgICBsYXN0U2VlbjogbnVtYmVyO1xuICAgIGNyZWF0ZWQ6IG51bWJlcjtcbiAgfT5cbj47XG5cbmV4cG9ydCB0eXBlIEdldFNlbmRlckNlcnRpZmljYXRlUmVzdWx0VHlwZSA9IFJlYWRvbmx5PHsgY2VydGlmaWNhdGU6IHN0cmluZyB9PjtcblxuZXhwb3J0IHR5cGUgTWFrZVByb3hpZWRSZXF1ZXN0UmVzdWx0VHlwZSA9XG4gIHwgVWludDhBcnJheVxuICB8IHtcbiAgICAgIHJlc3VsdDogQnl0ZXNXaXRoRGV0YWlsc1R5cGU7XG4gICAgICB0b3RhbFNpemU6IG51bWJlcjtcbiAgICB9O1xuXG5leHBvcnQgdHlwZSBXaG9hbWlSZXN1bHRUeXBlID0gUmVhZG9ubHk8e1xuICB1dWlkPzogVVVJRFN0cmluZ1R5cGU7XG4gIHBuaT86IFVVSURTdHJpbmdUeXBlO1xuICBudW1iZXI/OiBzdHJpbmc7XG4gIHVzZXJuYW1lPzogc3RyaW5nO1xufT47XG5cbmV4cG9ydCB0eXBlIENvbmZpcm1Db2RlUmVzdWx0VHlwZSA9IFJlYWRvbmx5PHtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIHBuaTogVVVJRFN0cmluZ1R5cGU7XG4gIGRldmljZUlkPzogbnVtYmVyO1xufT47XG5cbmV4cG9ydCB0eXBlIEdldFV1aWRzRm9yRTE2NHNWMk9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBlMTY0czogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICBhY2lzOiBSZWFkb25seUFycmF5PFVVSURTdHJpbmdUeXBlPjtcbiAgYWNjZXNzS2V5czogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufT47XG5cbnR5cGUgR2V0UHJvZmlsZUNvbW1vbk9wdGlvbnNUeXBlID0gUmVhZG9ubHk8XG4gIHtcbiAgICB1c2VyTGFuZ3VhZ2VzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gICAgY3JlZGVudGlhbFR5cGU/OiAncG5pJyB8ICdwcm9maWxlS2V5JztcbiAgfSAmIChcbiAgICB8IHtcbiAgICAgICAgcHJvZmlsZUtleVZlcnNpb24/OiB1bmRlZmluZWQ7XG4gICAgICAgIHByb2ZpbGVLZXlDcmVkZW50aWFsUmVxdWVzdD86IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB8IHtcbiAgICAgICAgcHJvZmlsZUtleVZlcnNpb246IHN0cmluZztcbiAgICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0Pzogc3RyaW5nO1xuICAgICAgfVxuICApXG4+O1xuXG5leHBvcnQgdHlwZSBHZXRQcm9maWxlT3B0aW9uc1R5cGUgPSBHZXRQcm9maWxlQ29tbW9uT3B0aW9uc1R5cGUgJlxuICBSZWFkb25seTx7XG4gICAgYWNjZXNzS2V5PzogdW5kZWZpbmVkO1xuICB9PjtcblxuZXhwb3J0IHR5cGUgR2V0UHJvZmlsZVVuYXV0aE9wdGlvbnNUeXBlID0gR2V0UHJvZmlsZUNvbW1vbk9wdGlvbnNUeXBlICZcbiAgUmVhZG9ubHk8e1xuICAgIGFjY2Vzc0tleTogc3RyaW5nO1xuICB9PjtcblxuZXhwb3J0IHR5cGUgV2ViQVBJVHlwZSA9IHtcbiAgc3RhcnRSZWdpc3RyYXRpb24oKTogdW5rbm93bjtcbiAgZmluaXNoUmVnaXN0cmF0aW9uKGJhdG9uOiB1bmtub3duKTogdm9pZDtcbiAgY29uZmlybUNvZGU6IChcbiAgICBudW1iZXI6IHN0cmluZyxcbiAgICBjb2RlOiBzdHJpbmcsXG4gICAgbmV3UGFzc3dvcmQ6IHN0cmluZyxcbiAgICByZWdpc3RyYXRpb25JZDogbnVtYmVyLFxuICAgIGRldmljZU5hbWU/OiBzdHJpbmcgfCBudWxsLFxuICAgIG9wdGlvbnM/OiB7IGFjY2Vzc0tleT86IFVpbnQ4QXJyYXkgfVxuICApID0+IFByb21pc2U8Q29uZmlybUNvZGVSZXN1bHRUeXBlPjtcbiAgY3JlYXRlR3JvdXA6IChcbiAgICBncm91cDogUHJvdG8uSUdyb3VwLFxuICAgIG9wdGlvbnM6IEdyb3VwQ3JlZGVudGlhbHNUeXBlXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZGVsZXRlVXNlcm5hbWU6ICgpID0+IFByb21pc2U8dm9pZD47XG4gIGdldEF0dGFjaG1lbnQ6IChjZG5LZXk6IHN0cmluZywgY2RuTnVtYmVyPzogbnVtYmVyKSA9PiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICBnZXRBdmF0YXI6IChwYXRoOiBzdHJpbmcpID0+IFByb21pc2U8VWludDhBcnJheT47XG4gIGdldERldmljZXM6ICgpID0+IFByb21pc2U8R2V0RGV2aWNlc1Jlc3VsdFR5cGU+O1xuICBnZXRIYXNTdWJzY3JpcHRpb246IChzdWJzY3JpYmVySWQ6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8Ym9vbGVhbj47XG4gIGdldEdyb3VwOiAob3B0aW9uczogR3JvdXBDcmVkZW50aWFsc1R5cGUpID0+IFByb21pc2U8UHJvdG8uR3JvdXA+O1xuICBnZXRHcm91cEZyb21MaW5rOiAoXG4gICAgaW52aXRlTGlua1Bhc3N3b3JkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgYXV0aDogR3JvdXBDcmVkZW50aWFsc1R5cGVcbiAgKSA9PiBQcm9taXNlPFByb3RvLkdyb3VwSm9pbkluZm8+O1xuICBnZXRHcm91cEF2YXRhcjogKGtleTogc3RyaW5nKSA9PiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICBnZXRHcm91cENyZWRlbnRpYWxzOiAoXG4gICAgc3RhcnREYXk6IG51bWJlcixcbiAgICBlbmREYXk6IG51bWJlcixcbiAgICB1dWlkS2luZDogVVVJREtpbmRcbiAgKSA9PiBQcm9taXNlPEFycmF5PEdyb3VwQ3JlZGVudGlhbFR5cGU+PjtcbiAgZ2V0R3JvdXBFeHRlcm5hbENyZWRlbnRpYWw6IChcbiAgICBvcHRpb25zOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICApID0+IFByb21pc2U8UHJvdG8uR3JvdXBFeHRlcm5hbENyZWRlbnRpYWw+O1xuICBnZXRHcm91cExvZzogKFxuICAgIG9wdGlvbnM6IEdldEdyb3VwTG9nT3B0aW9uc1R5cGUsXG4gICAgY3JlZGVudGlhbHM6IEdyb3VwQ3JlZGVudGlhbHNUeXBlXG4gICkgPT4gUHJvbWlzZTxHcm91cExvZ1Jlc3BvbnNlVHlwZT47XG4gIGdldEljZVNlcnZlcnM6ICgpID0+IFByb21pc2U8R2V0SWNlU2VydmVyc1Jlc3VsdFR5cGU+O1xuICBnZXRLZXlzRm9ySWRlbnRpZmllcjogKFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgICBkZXZpY2VJZD86IG51bWJlclxuICApID0+IFByb21pc2U8U2VydmVyS2V5c1R5cGU+O1xuICBnZXRLZXlzRm9ySWRlbnRpZmllclVuYXV0aDogKFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgICBkZXZpY2VJZD86IG51bWJlcixcbiAgICBvcHRpb25zPzogeyBhY2Nlc3NLZXk/OiBzdHJpbmcgfVxuICApID0+IFByb21pc2U8U2VydmVyS2V5c1R5cGU+O1xuICBnZXRNeUtleXM6ICh1dWlkS2luZDogVVVJREtpbmQpID0+IFByb21pc2U8bnVtYmVyPjtcbiAgZ2V0UHJvZmlsZTogKFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgICBvcHRpb25zOiBHZXRQcm9maWxlT3B0aW9uc1R5cGVcbiAgKSA9PiBQcm9taXNlPFByb2ZpbGVUeXBlPjtcbiAgZ2V0UHJvZmlsZUZvclVzZXJuYW1lOiAodXNlcm5hbWU6IHN0cmluZykgPT4gUHJvbWlzZTxQcm9maWxlVHlwZT47XG4gIGdldFByb2ZpbGVVbmF1dGg6IChcbiAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgb3B0aW9uczogR2V0UHJvZmlsZVVuYXV0aE9wdGlvbnNUeXBlXG4gICkgPT4gUHJvbWlzZTxQcm9maWxlVHlwZT47XG4gIGdldEJhZGdlSW1hZ2VGaWxlOiAoaW1hZ2VVcmw6IHN0cmluZykgPT4gUHJvbWlzZTxVaW50OEFycmF5PjtcbiAgZ2V0Qm9vc3RCYWRnZXNGcm9tU2VydmVyOiAoXG4gICAgdXNlckxhbmd1YWdlczogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4gICkgPT4gUHJvbWlzZTx1bmtub3duPjtcbiAgZ2V0UHJvdmlzaW9uaW5nUmVzb3VyY2U6IChcbiAgICBoYW5kbGVyOiBJUmVxdWVzdEhhbmRsZXJcbiAgKSA9PiBQcm9taXNlPFdlYlNvY2tldFJlc291cmNlPjtcbiAgZ2V0U2VuZGVyQ2VydGlmaWNhdGU6IChcbiAgICB3aXRoVXVpZD86IGJvb2xlYW5cbiAgKSA9PiBQcm9taXNlPEdldFNlbmRlckNlcnRpZmljYXRlUmVzdWx0VHlwZT47XG4gIGdldFN0aWNrZXI6IChwYWNrSWQ6IHN0cmluZywgc3RpY2tlcklkOiBudW1iZXIpID0+IFByb21pc2U8VWludDhBcnJheT47XG4gIGdldFN0aWNrZXJQYWNrTWFuaWZlc3Q6IChwYWNrSWQ6IHN0cmluZykgPT4gUHJvbWlzZTxTdGlja2VyUGFja01hbmlmZXN0VHlwZT47XG4gIGdldFN0b3JhZ2VDcmVkZW50aWFsczogTWVzc2FnZVNlbmRlclsnZ2V0U3RvcmFnZUNyZWRlbnRpYWxzJ107XG4gIGdldFN0b3JhZ2VNYW5pZmVzdDogTWVzc2FnZVNlbmRlclsnZ2V0U3RvcmFnZU1hbmlmZXN0J107XG4gIGdldFN0b3JhZ2VSZWNvcmRzOiBNZXNzYWdlU2VuZGVyWydnZXRTdG9yYWdlUmVjb3JkcyddO1xuICBnZXRVdWlkc0ZvckUxNjRzOiAoXG4gICAgZTE2NHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuICApID0+IFByb21pc2U8RGljdGlvbmFyeTxVVUlEU3RyaW5nVHlwZSB8IG51bGw+PjtcbiAgZ2V0VXVpZHNGb3JFMTY0c1YyOiAoXG4gICAgb3B0aW9uczogR2V0VXVpZHNGb3JFMTY0c1YyT3B0aW9uc1R5cGVcbiAgKSA9PiBQcm9taXNlPENEU1Jlc3BvbnNlVHlwZT47XG4gIGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YTogKFxuICAgIGhyZWY6IHN0cmluZyxcbiAgICBhYm9ydFNpZ25hbDogQWJvcnRTaWduYWxcbiAgKSA9PiBQcm9taXNlPG51bGwgfCBsaW5rUHJldmlld0ZldGNoLkxpbmtQcmV2aWV3TWV0YWRhdGE+O1xuICBmZXRjaExpbmtQcmV2aWV3SW1hZ2U6IChcbiAgICBocmVmOiBzdHJpbmcsXG4gICAgYWJvcnRTaWduYWw6IEFib3J0U2lnbmFsXG4gICkgPT4gUHJvbWlzZTxudWxsIHwgbGlua1ByZXZpZXdGZXRjaC5MaW5rUHJldmlld0ltYWdlPjtcbiAgbWFrZVByb3hpZWRSZXF1ZXN0OiAoXG4gICAgdGFyZ2V0VXJsOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IFByb3hpZWRSZXF1ZXN0T3B0aW9uc1R5cGVcbiAgKSA9PiBQcm9taXNlPE1ha2VQcm94aWVkUmVxdWVzdFJlc3VsdFR5cGU+O1xuICBtYWtlU2Z1UmVxdWVzdDogKFxuICAgIHRhcmdldFVybDogc3RyaW5nLFxuICAgIHR5cGU6IEhUVFBDb2RlVHlwZSxcbiAgICBoZWFkZXJzOiBIZWFkZXJMaXN0VHlwZSxcbiAgICBib2R5OiBVaW50OEFycmF5IHwgdW5kZWZpbmVkXG4gICkgPT4gUHJvbWlzZTxCeXRlc1dpdGhEZXRhaWxzVHlwZT47XG4gIG1vZGlmeUdyb3VwOiAoXG4gICAgY2hhbmdlczogUHJvdG8uR3JvdXBDaGFuZ2UuSUFjdGlvbnMsXG4gICAgb3B0aW9uczogR3JvdXBDcmVkZW50aWFsc1R5cGUsXG4gICAgaW52aXRlTGlua0Jhc2U2ND86IHN0cmluZ1xuICApID0+IFByb21pc2U8UHJvdG8uSUdyb3VwQ2hhbmdlPjtcbiAgbW9kaWZ5U3RvcmFnZVJlY29yZHM6IE1lc3NhZ2VTZW5kZXJbJ21vZGlmeVN0b3JhZ2VSZWNvcmRzJ107XG4gIHB1dEF0dGFjaG1lbnQ6IChlbmNyeXB0ZWRCaW46IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPjtcbiAgcHV0UHJvZmlsZTogKFxuICAgIGpzb25EYXRhOiBQcm9maWxlUmVxdWVzdERhdGFUeXBlXG4gICkgPT4gUHJvbWlzZTxVcGxvYWRBdmF0YXJIZWFkZXJzVHlwZSB8IHVuZGVmaW5lZD47XG4gIHB1dFN0aWNrZXJzOiAoXG4gICAgZW5jcnlwdGVkTWFuaWZlc3Q6IFVpbnQ4QXJyYXksXG4gICAgZW5jcnlwdGVkU3RpY2tlcnM6IEFycmF5PFVpbnQ4QXJyYXk+LFxuICAgIG9uUHJvZ3Jlc3M/OiAoKSA9PiB2b2lkXG4gICkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICBwdXRVc2VybmFtZTogKG5ld1VzZXJuYW1lOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIHJlZ2lzdGVyQ2FwYWJpbGl0aWVzOiAoY2FwYWJpbGl0aWVzOiBDYXBhYmlsaXRpZXNVcGxvYWRUeXBlKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZWdpc3RlcktleXM6IChnZW5LZXlzOiBLZXlzVHlwZSwgdXVpZEtpbmQ6IFVVSURLaW5kKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZWdpc3RlclN1cHBvcnRGb3JVbmF1dGhlbnRpY2F0ZWREZWxpdmVyeTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcmVwb3J0TWVzc2FnZTogKHNlbmRlclV1aWQ6IHN0cmluZywgc2VydmVyR3VpZDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xuICByZXF1ZXN0VmVyaWZpY2F0aW9uU01TOiAobnVtYmVyOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIHJlcXVlc3RWZXJpZmljYXRpb25Wb2ljZTogKG51bWJlcjogc3RyaW5nLCB0b2tlbjogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+O1xuICBjaGVja0FjY291bnRFeGlzdGVuY2U6ICh1dWlkOiBVVUlEKSA9PiBQcm9taXNlPGJvb2xlYW4+O1xuICBzZW5kTWVzc2FnZXM6IChcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nLFxuICAgIG1lc3NhZ2VBcnJheTogUmVhZG9ubHlBcnJheTxNZXNzYWdlVHlwZT4sXG4gICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgb25saW5lPzogYm9vbGVhblxuICApID0+IFByb21pc2U8dm9pZD47XG4gIHNlbmRNZXNzYWdlc1VuYXV0aDogKFxuICAgIGRlc3RpbmF0aW9uOiBzdHJpbmcsXG4gICAgbWVzc2FnZUFycmF5OiBSZWFkb25seUFycmF5PE1lc3NhZ2VUeXBlPixcbiAgICB0aW1lc3RhbXA6IG51bWJlcixcbiAgICBvbmxpbmU/OiBib29sZWFuLFxuICAgIG9wdGlvbnM/OiB7IGFjY2Vzc0tleT86IHN0cmluZyB9XG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgc2VuZFdpdGhTZW5kZXJLZXk6IChcbiAgICBwYXlsb2FkOiBVaW50OEFycmF5LFxuICAgIGFjY2Vzc0tleXM6IFVpbnQ4QXJyYXksXG4gICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgb25saW5lPzogYm9vbGVhblxuICApID0+IFByb21pc2U8TXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVR5cGU+O1xuICBzZXRTaWduZWRQcmVLZXk6IChcbiAgICBzaWduZWRQcmVLZXk6IFNpZ25lZFByZUtleVR5cGUsXG4gICAgdXVpZEtpbmQ6IFVVSURLaW5kXG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgdXBkYXRlRGV2aWNlTmFtZTogKGRldmljZU5hbWU6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbiAgdXBsb2FkQXZhdGFyOiAoXG4gICAgdXBsb2FkQXZhdGFyUmVxdWVzdEhlYWRlcnM6IFVwbG9hZEF2YXRhckhlYWRlcnNUeXBlLFxuICAgIGF2YXRhckRhdGE6IFVpbnQ4QXJyYXlcbiAgKSA9PiBQcm9taXNlPHN0cmluZz47XG4gIHVwbG9hZEdyb3VwQXZhdGFyOiAoXG4gICAgYXZhdGFyRGF0YTogVWludDhBcnJheSxcbiAgICBvcHRpb25zOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICApID0+IFByb21pc2U8c3RyaW5nPjtcbiAgd2hvYW1pOiAoKSA9PiBQcm9taXNlPFdob2FtaVJlc3VsdFR5cGU+O1xuICBzZW5kQ2hhbGxlbmdlUmVzcG9uc2U6IChjaGFsbGVuZ2VSZXNwb25zZTogQ2hhbGxlbmdlVHlwZSkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZ2V0Q29uZmlnOiAoKSA9PiBQcm9taXNlPFxuICAgIEFycmF5PHsgbmFtZTogc3RyaW5nOyBlbmFibGVkOiBib29sZWFuOyB2YWx1ZTogc3RyaW5nIHwgbnVsbCB9PlxuICA+O1xuICBhdXRoZW50aWNhdGU6IChjcmVkZW50aWFsczogV2ViQVBJQ3JlZGVudGlhbHMpID0+IFByb21pc2U8dm9pZD47XG4gIGxvZ291dDogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgZ2V0U29ja2V0U3RhdHVzOiAoKSA9PiBTb2NrZXRTdGF0dXM7XG4gIHJlZ2lzdGVyUmVxdWVzdEhhbmRsZXI6IChoYW5kbGVyOiBJUmVxdWVzdEhhbmRsZXIpID0+IHZvaWQ7XG4gIHVucmVnaXN0ZXJSZXF1ZXN0SGFuZGxlcjogKGhhbmRsZXI6IElSZXF1ZXN0SGFuZGxlcikgPT4gdm9pZDtcbiAgY2hlY2tTb2NrZXRzOiAoKSA9PiB2b2lkO1xuICBvbk9ubGluZTogKCkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgb25PZmZsaW5lOiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xufTtcblxuZXhwb3J0IHR5cGUgU2lnbmVkUHJlS2V5VHlwZSA9IHtcbiAga2V5SWQ6IG51bWJlcjtcbiAgcHVibGljS2V5OiBVaW50OEFycmF5O1xuICBzaWduYXR1cmU6IFVpbnQ4QXJyYXk7XG59O1xuXG5leHBvcnQgdHlwZSBLZXlzVHlwZSA9IHtcbiAgaWRlbnRpdHlLZXk6IFVpbnQ4QXJyYXk7XG4gIHNpZ25lZFByZUtleTogU2lnbmVkUHJlS2V5VHlwZTtcbiAgcHJlS2V5czogQXJyYXk8e1xuICAgIGtleUlkOiBudW1iZXI7XG4gICAgcHVibGljS2V5OiBVaW50OEFycmF5O1xuICB9Pjtcbn07XG5cbmV4cG9ydCB0eXBlIFNlcnZlcktleXNUeXBlID0ge1xuICBkZXZpY2VzOiBBcnJheTx7XG4gICAgZGV2aWNlSWQ6IG51bWJlcjtcbiAgICByZWdpc3RyYXRpb25JZDogbnVtYmVyO1xuICAgIHNpZ25lZFByZUtleToge1xuICAgICAga2V5SWQ6IG51bWJlcjtcbiAgICAgIHB1YmxpY0tleTogVWludDhBcnJheTtcbiAgICAgIHNpZ25hdHVyZTogVWludDhBcnJheTtcbiAgICB9O1xuICAgIHByZUtleT86IHtcbiAgICAgIGtleUlkOiBudW1iZXI7XG4gICAgICBwdWJsaWNLZXk6IFVpbnQ4QXJyYXk7XG4gICAgfTtcbiAgfT47XG4gIGlkZW50aXR5S2V5OiBVaW50OEFycmF5O1xufTtcblxuZXhwb3J0IHR5cGUgQ2hhbGxlbmdlVHlwZSA9IHtcbiAgcmVhZG9ubHkgdHlwZTogJ3JlY2FwdGNoYSc7XG4gIHJlYWRvbmx5IHRva2VuOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGNhcHRjaGE6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFByb3hpZWRSZXF1ZXN0T3B0aW9uc1R5cGUgPSB7XG4gIHJldHVyblVpbnQ4QXJyYXk/OiBib29sZWFuO1xuICBzdGFydD86IG51bWJlcjtcbiAgZW5kPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgVG9wTGV2ZWxUeXBlID0ge1xuICBtdWx0aVJlY2lwaWVudDIwMFJlc3BvbnNlU2NoZW1hOiB0eXBlb2YgbXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVNjaGVtYTtcbiAgbXVsdGlSZWNpcGllbnQ0MDlSZXNwb25zZVNjaGVtYTogdHlwZW9mIG11bHRpUmVjaXBpZW50NDA5UmVzcG9uc2VTY2hlbWE7XG4gIG11bHRpUmVjaXBpZW50NDEwUmVzcG9uc2VTY2hlbWE6IHR5cGVvZiBtdWx0aVJlY2lwaWVudDQxMFJlc3BvbnNlU2NoZW1hO1xuICBpbml0aWFsaXplOiAob3B0aW9uczogSW5pdGlhbGl6ZU9wdGlvbnNUeXBlKSA9PiBXZWJBUElDb25uZWN0VHlwZTtcbn07XG5cbi8vIFdlIGZpcnN0IHNldCB1cCB0aGUgZGF0YSB0aGF0IHdvbid0IGNoYW5nZSBkdXJpbmcgdGhpcyBzZXNzaW9uIG9mIHRoZSBhcHBcbmV4cG9ydCBmdW5jdGlvbiBpbml0aWFsaXplKHtcbiAgdXJsLFxuICBzdG9yYWdlVXJsLFxuICB1cGRhdGVzVXJsLFxuICBkaXJlY3RvcnlDb25maWcsXG4gIGNkblVybE9iamVjdCxcbiAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gIGNvbnRlbnRQcm94eVVybCxcbiAgcHJveHlVcmwsXG4gIHZlcnNpb24sXG59OiBJbml0aWFsaXplT3B0aW9uc1R5cGUpOiBXZWJBUElDb25uZWN0VHlwZSB7XG4gIGlmICghaXMuc3RyaW5nKHVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFQSS5pbml0aWFsaXplOiBJbnZhbGlkIHNlcnZlciB1cmwnKTtcbiAgfVxuICBpZiAoIWlzLnN0cmluZyhzdG9yYWdlVXJsKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQVBJLmluaXRpYWxpemU6IEludmFsaWQgc3RvcmFnZVVybCcpO1xuICB9XG4gIGlmICghaXMuc3RyaW5nKHVwZGF0ZXNVcmwpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBUEkuaW5pdGlhbGl6ZTogSW52YWxpZCB1cGRhdGVzVXJsJyk7XG4gIH1cbiAgaWYgKCFpcy5vYmplY3QoY2RuVXJsT2JqZWN0KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQVBJLmluaXRpYWxpemU6IEludmFsaWQgY2RuVXJsT2JqZWN0Jyk7XG4gIH1cbiAgaWYgKCFpcy5zdHJpbmcoY2RuVXJsT2JqZWN0WycwJ10pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBUEkuaW5pdGlhbGl6ZTogTWlzc2luZyBDRE4gMCBjb25maWd1cmF0aW9uJyk7XG4gIH1cbiAgaWYgKCFpcy5zdHJpbmcoY2RuVXJsT2JqZWN0WycyJ10pKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBUEkuaW5pdGlhbGl6ZTogTWlzc2luZyBDRE4gMiBjb25maWd1cmF0aW9uJyk7XG4gIH1cbiAgaWYgKCFpcy5zdHJpbmcoY2VydGlmaWNhdGVBdXRob3JpdHkpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdXZWJBUEkuaW5pdGlhbGl6ZTogSW52YWxpZCBjZXJ0aWZpY2F0ZUF1dGhvcml0eScpO1xuICB9XG4gIGlmICghaXMuc3RyaW5nKGNvbnRlbnRQcm94eVVybCkpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1dlYkFQSS5pbml0aWFsaXplOiBJbnZhbGlkIGNvbnRlbnRQcm94eVVybCcpO1xuICB9XG4gIGlmIChwcm94eVVybCAmJiAhaXMuc3RyaW5nKHByb3h5VXJsKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQVBJLmluaXRpYWxpemU6IEludmFsaWQgcHJveHlVcmwnKTtcbiAgfVxuICBpZiAoIWlzLnN0cmluZyh2ZXJzaW9uKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignV2ViQVBJLmluaXRpYWxpemU6IEludmFsaWQgdmVyc2lvbicpO1xuICB9XG5cbiAgLy8gVGhhbmtzIHRvIGZ1bmN0aW9uLWhvaXN0aW5nLCB3ZSBjYW4gcHV0IHRoaXMgcmV0dXJuIHN0YXRlbWVudCBiZWZvcmUgYWxsIG9mIHRoZVxuICAvLyAgIGJlbG93IGZ1bmN0aW9uIGRlZmluaXRpb25zLlxuICByZXR1cm4ge1xuICAgIGNvbm5lY3QsXG4gIH07XG5cbiAgLy8gVGhlbiB3ZSBjb25uZWN0IHRvIHRoZSBzZXJ2ZXIgd2l0aCB1c2VyLXNwZWNpZmljIGluZm9ybWF0aW9uLiBUaGlzIGlzIHRoZSBvbmx5IEFQSVxuICAvLyAgIGV4cG9zZWQgdG8gdGhlIGJyb3dzZXIgY29udGV4dCwgZW5zdXJpbmcgdGhhdCBpdCBjYW4ndCBjb25uZWN0IHRvIGFyYml0cmFyeVxuICAvLyAgIGxvY2F0aW9ucy5cbiAgZnVuY3Rpb24gY29ubmVjdCh7XG4gICAgdXNlcm5hbWU6IGluaXRpYWxVc2VybmFtZSxcbiAgICBwYXNzd29yZDogaW5pdGlhbFBhc3N3b3JkLFxuICAgIHVzZVdlYlNvY2tldCA9IHRydWUsXG4gIH06IFdlYkFQSUNvbm5lY3RPcHRpb25zVHlwZSkge1xuICAgIGxldCB1c2VybmFtZSA9IGluaXRpYWxVc2VybmFtZTtcbiAgICBsZXQgcGFzc3dvcmQgPSBpbml0aWFsUGFzc3dvcmQ7XG4gICAgY29uc3QgUEFSU0VfUkFOR0VfSEVBREVSID0gL1xcLyhcXGQrKSQvO1xuICAgIGNvbnN0IFBBUlNFX0dST1VQX0xPR19SQU5HRV9IRUFERVIgPVxuICAgICAgL152ZXJzaW9uc1xccysoXFxkezEsMTB9KS0oXFxkezEsMTB9KVxcLyhcXGR7MSwxMH0pLztcblxuICAgIGxldCBhY3RpdmVSZWdpc3RyYXRpb246IEV4cGxvZGVQcm9taXNlUmVzdWx0VHlwZTx2b2lkPiB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHNvY2tldE1hbmFnZXIgPSBuZXcgU29ja2V0TWFuYWdlcih7XG4gICAgICB1cmwsXG4gICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eSxcbiAgICAgIHZlcnNpb24sXG4gICAgICBwcm94eVVybCxcbiAgICB9KTtcblxuICAgIHNvY2tldE1hbmFnZXIub24oJ3N0YXR1c0NoYW5nZScsICgpID0+IHtcbiAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCdzb2NrZXRTdGF0dXNDaGFuZ2UnKTtcbiAgICB9KTtcblxuICAgIHNvY2tldE1hbmFnZXIub24oJ2F1dGhFcnJvcicsICgpID0+IHtcbiAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCd1bmxpbmtBbmREaXNjb25uZWN0Jyk7XG4gICAgfSk7XG5cbiAgICBpZiAodXNlV2ViU29ja2V0KSB7XG4gICAgICBzb2NrZXRNYW5hZ2VyLmF1dGhlbnRpY2F0ZSh7IHVzZXJuYW1lLCBwYXNzd29yZCB9KTtcbiAgICB9XG5cbiAgICBsZXQgY2RzOiBDRFNCYXNlO1xuICAgIGlmIChkaXJlY3RvcnlDb25maWcuZGlyZWN0b3J5VmVyc2lvbiA9PT0gMSkge1xuICAgICAgY29uc3QgeyBkaXJlY3RvcnlVcmwsIGRpcmVjdG9yeUVuY2xhdmVJZCwgZGlyZWN0b3J5VHJ1c3RBbmNob3IgfSA9XG4gICAgICAgIGRpcmVjdG9yeUNvbmZpZztcblxuICAgICAgY2RzID0gbmV3IExlZ2FjeUNEUyh7XG4gICAgICAgIGxvZ2dlcjogbG9nLFxuICAgICAgICBkaXJlY3RvcnlFbmNsYXZlSWQsXG4gICAgICAgIGRpcmVjdG9yeVRydXN0QW5jaG9yLFxuICAgICAgICBwcm94eVVybCxcblxuICAgICAgICBhc3luYyBwdXRBdHRlc3RhdGlvbihhdXRoLCBwdWJsaWNLZXkpIHtcbiAgICAgICAgICBjb25zdCBkYXRhID0gSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICAgICAgY2xpZW50UHVibGljOiBCeXRlcy50b0Jhc2U2NChwdWJsaWNLZXkpLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IChhd2FpdCBfb3V0ZXJBamF4KG51bGwsIHtcbiAgICAgICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICAgICAgdHlwZTogJ1BVVCcsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICAgICAgaG9zdDogZGlyZWN0b3J5VXJsLFxuICAgICAgICAgICAgcGF0aDogYCR7VVJMX0NBTExTLmF0dGVzdGF0aW9ufS8ke2RpcmVjdG9yeUVuY2xhdmVJZH1gLFxuICAgICAgICAgICAgdXNlcjogYXV0aC51c2VybmFtZSxcbiAgICAgICAgICAgIHBhc3N3b3JkOiBhdXRoLnBhc3N3b3JkLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbndpdGhkZXRhaWxzJyxcbiAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICB0aW1lb3V0OiAzMDAwMCxcbiAgICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgfSkpIGFzIEpTT05XaXRoRGV0YWlsc1R5cGU8TGVnYWN5Q0RTUHV0QXR0ZXN0YXRpb25SZXNwb25zZVR5cGU+O1xuXG4gICAgICAgICAgY29uc3QgeyByZXNwb25zZSwgZGF0YTogcmVzcG9uc2VCb2R5IH0gPSByZXN1bHQ7XG5cbiAgICAgICAgICBjb25zdCBjb29raWUgPSByZXNwb25zZS5oZWFkZXJzLmdldCgnc2V0LWNvb2tpZScpID8/IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHJldHVybiB7IGNvb2tpZSwgcmVzcG9uc2VCb2R5IH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXN5bmMgZmV0Y2hEaXNjb3ZlcnlEYXRhKGF1dGgsIGRhdGEsIGNvb2tpZSkge1xuICAgICAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IF9vdXRlckFqYXgobnVsbCwge1xuICAgICAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgICAgICB0eXBlOiAnUFVUJyxcbiAgICAgICAgICAgIGhlYWRlcnM6IGNvb2tpZVxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIGNvb2tpZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi9qc29uOyBjaGFyc2V0PXV0Zi04JyxcbiAgICAgICAgICAgIGhvc3Q6IGRpcmVjdG9yeVVybCxcbiAgICAgICAgICAgIHBhdGg6IGAke1VSTF9DQUxMUy5kaXNjb3Zlcnl9LyR7ZGlyZWN0b3J5RW5jbGF2ZUlkfWAsXG4gICAgICAgICAgICB1c2VyOiBhdXRoLnVzZXJuYW1lLFxuICAgICAgICAgICAgcGFzc3dvcmQ6IGF1dGgucGFzc3dvcmQsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICAgIHRpbWVvdXQ6IDMwMDAwLFxuICAgICAgICAgICAgZGF0YTogSlNPTi5zdHJpbmdpZnkoZGF0YSksXG4gICAgICAgICAgICB2ZXJzaW9uLFxuICAgICAgICAgIH0pKSBhcyB7XG4gICAgICAgICAgICByZXF1ZXN0SWQ6IHN0cmluZztcbiAgICAgICAgICAgIGl2OiBzdHJpbmc7XG4gICAgICAgICAgICBkYXRhOiBzdHJpbmc7XG4gICAgICAgICAgICBtYWM6IHN0cmluZztcbiAgICAgICAgICB9O1xuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIHJlcXVlc3RJZDogQnl0ZXMuZnJvbUJhc2U2NChyZXNwb25zZS5yZXF1ZXN0SWQpLFxuICAgICAgICAgICAgaXY6IEJ5dGVzLmZyb21CYXNlNjQocmVzcG9uc2UuaXYpLFxuICAgICAgICAgICAgZGF0YTogQnl0ZXMuZnJvbUJhc2U2NChyZXNwb25zZS5kYXRhKSxcbiAgICAgICAgICAgIG1hYzogQnl0ZXMuZnJvbUJhc2U2NChyZXNwb25zZS5tYWMpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0sXG5cbiAgICAgICAgYXN5bmMgZ2V0QXV0aCgpIHtcbiAgICAgICAgICByZXR1cm4gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgICAgIGNhbGw6ICdkaXJlY3RvcnlBdXRoJyxcbiAgICAgICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICAgIH0pKSBhcyBDRFNBdXRoVHlwZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoZGlyZWN0b3J5Q29uZmlnLmRpcmVjdG9yeVZlcnNpb24gPT09IDIpIHtcbiAgICAgIGNvbnN0IHsgZGlyZWN0b3J5VjJVcmwsIGRpcmVjdG9yeVYyUHVibGljS2V5LCBkaXJlY3RvcnlWMkNvZGVIYXNoZXMgfSA9XG4gICAgICAgIGRpcmVjdG9yeUNvbmZpZztcblxuICAgICAgY2RzID0gbmV3IENEU0goe1xuICAgICAgICBsb2dnZXI6IGxvZyxcbiAgICAgICAgcHJveHlVcmwsXG5cbiAgICAgICAgdXJsOiBkaXJlY3RvcnlWMlVybCxcbiAgICAgICAgcHVibGljS2V5OiBkaXJlY3RvcnlWMlB1YmxpY0tleSxcbiAgICAgICAgY29kZUhhc2hlczogZGlyZWN0b3J5VjJDb2RlSGFzaGVzLFxuICAgICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eSxcbiAgICAgICAgdmVyc2lvbixcblxuICAgICAgICBhc3luYyBnZXRBdXRoKCkge1xuICAgICAgICAgIHJldHVybiAoYXdhaXQgX2FqYXgoe1xuICAgICAgICAgICAgY2FsbDogJ2RpcmVjdG9yeUF1dGhWMicsXG4gICAgICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgICB9KSkgYXMgQ0RTQXV0aFR5cGU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKGRpcmVjdG9yeUNvbmZpZy5kaXJlY3RvcnlWZXJzaW9uID09PSAzKSB7XG4gICAgICBjb25zdCB7IGRpcmVjdG9yeVYzVXJsLCBkaXJlY3RvcnlWM01SRU5DTEFWRSwgZGlyZWN0b3J5VjNSb290IH0gPVxuICAgICAgICBkaXJlY3RvcnlDb25maWc7XG5cbiAgICAgIGNkcyA9IG5ldyBDRFNJKHtcbiAgICAgICAgbG9nZ2VyOiBsb2csXG4gICAgICAgIHByb3h5VXJsLFxuXG4gICAgICAgIHVybDogZGlyZWN0b3J5VjNVcmwsXG4gICAgICAgIG1yZW5jbGF2ZTogZGlyZWN0b3J5VjNNUkVOQ0xBVkUsXG4gICAgICAgIHJvb3Q6IGRpcmVjdG9yeVYzUm9vdCxcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHZlcnNpb24sXG5cbiAgICAgICAgYXN5bmMgZ2V0QXV0aCgpIHtcbiAgICAgICAgICByZXR1cm4gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgICAgIGNhbGw6ICdkaXJlY3RvcnlBdXRoVjInLFxuICAgICAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgICAgfSkpIGFzIENEU0F1dGhUeXBlO1xuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgbGV0IGZldGNoRm9yTGlua1ByZXZpZXdzOiBsaW5rUHJldmlld0ZldGNoLkZldGNoRm47XG4gICAgaWYgKHByb3h5VXJsKSB7XG4gICAgICBjb25zdCBhZ2VudCA9IG5ldyBQcm94eUFnZW50KHByb3h5VXJsKTtcbiAgICAgIGZldGNoRm9yTGlua1ByZXZpZXdzID0gKGhyZWYsIGluaXQpID0+IGZldGNoKGhyZWYsIHsgLi4uaW5pdCwgYWdlbnQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGZldGNoRm9yTGlua1ByZXZpZXdzID0gZmV0Y2g7XG4gICAgfVxuXG4gICAgLy8gVGhhbmtzLCBmdW5jdGlvbiBob2lzdGluZyFcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0U29ja2V0U3RhdHVzLFxuICAgICAgY2hlY2tTb2NrZXRzLFxuICAgICAgb25PbmxpbmUsXG4gICAgICBvbk9mZmxpbmUsXG4gICAgICByZWdpc3RlclJlcXVlc3RIYW5kbGVyLFxuICAgICAgdW5yZWdpc3RlclJlcXVlc3RIYW5kbGVyLFxuICAgICAgYXV0aGVudGljYXRlLFxuICAgICAgbG9nb3V0LFxuICAgICAgY2hlY2tBY2NvdW50RXhpc3RlbmNlLFxuICAgICAgY29uZmlybUNvZGUsXG4gICAgICBjcmVhdGVHcm91cCxcbiAgICAgIGRlbGV0ZVVzZXJuYW1lLFxuICAgICAgZmluaXNoUmVnaXN0cmF0aW9uLFxuICAgICAgZmV0Y2hMaW5rUHJldmlld0ltYWdlLFxuICAgICAgZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhLFxuICAgICAgZ2V0QXR0YWNobWVudCxcbiAgICAgIGdldEF2YXRhcixcbiAgICAgIGdldENvbmZpZyxcbiAgICAgIGdldERldmljZXMsXG4gICAgICBnZXRHcm91cCxcbiAgICAgIGdldEdyb3VwQXZhdGFyLFxuICAgICAgZ2V0R3JvdXBDcmVkZW50aWFscyxcbiAgICAgIGdldEdyb3VwRXh0ZXJuYWxDcmVkZW50aWFsLFxuICAgICAgZ2V0R3JvdXBGcm9tTGluayxcbiAgICAgIGdldEdyb3VwTG9nLFxuICAgICAgZ2V0SGFzU3Vic2NyaXB0aW9uLFxuICAgICAgZ2V0SWNlU2VydmVycyxcbiAgICAgIGdldEtleXNGb3JJZGVudGlmaWVyLFxuICAgICAgZ2V0S2V5c0ZvcklkZW50aWZpZXJVbmF1dGgsXG4gICAgICBnZXRNeUtleXMsXG4gICAgICBnZXRQcm9maWxlLFxuICAgICAgZ2V0UHJvZmlsZUZvclVzZXJuYW1lLFxuICAgICAgZ2V0UHJvZmlsZVVuYXV0aCxcbiAgICAgIGdldEJhZGdlSW1hZ2VGaWxlLFxuICAgICAgZ2V0Qm9vc3RCYWRnZXNGcm9tU2VydmVyLFxuICAgICAgZ2V0UHJvdmlzaW9uaW5nUmVzb3VyY2UsXG4gICAgICBnZXRTZW5kZXJDZXJ0aWZpY2F0ZSxcbiAgICAgIGdldFN0aWNrZXIsXG4gICAgICBnZXRTdGlja2VyUGFja01hbmlmZXN0LFxuICAgICAgZ2V0U3RvcmFnZUNyZWRlbnRpYWxzLFxuICAgICAgZ2V0U3RvcmFnZU1hbmlmZXN0LFxuICAgICAgZ2V0U3RvcmFnZVJlY29yZHMsXG4gICAgICBnZXRVdWlkc0ZvckUxNjRzLFxuICAgICAgZ2V0VXVpZHNGb3JFMTY0c1YyLFxuICAgICAgbWFrZVByb3hpZWRSZXF1ZXN0LFxuICAgICAgbWFrZVNmdVJlcXVlc3QsXG4gICAgICBtb2RpZnlHcm91cCxcbiAgICAgIG1vZGlmeVN0b3JhZ2VSZWNvcmRzLFxuICAgICAgcHV0QXR0YWNobWVudCxcbiAgICAgIHB1dFByb2ZpbGUsXG4gICAgICBwdXRTdGlja2VycyxcbiAgICAgIHB1dFVzZXJuYW1lLFxuICAgICAgcmVnaXN0ZXJDYXBhYmlsaXRpZXMsXG4gICAgICByZWdpc3RlcktleXMsXG4gICAgICByZWdpc3RlclN1cHBvcnRGb3JVbmF1dGhlbnRpY2F0ZWREZWxpdmVyeSxcbiAgICAgIHJlcG9ydE1lc3NhZ2UsXG4gICAgICByZXF1ZXN0VmVyaWZpY2F0aW9uU01TLFxuICAgICAgcmVxdWVzdFZlcmlmaWNhdGlvblZvaWNlLFxuICAgICAgc2VuZE1lc3NhZ2VzLFxuICAgICAgc2VuZE1lc3NhZ2VzVW5hdXRoLFxuICAgICAgc2VuZFdpdGhTZW5kZXJLZXksXG4gICAgICBzZXRTaWduZWRQcmVLZXksXG4gICAgICBzdGFydFJlZ2lzdHJhdGlvbixcbiAgICAgIHVwZGF0ZURldmljZU5hbWUsXG4gICAgICB1cGxvYWRBdmF0YXIsXG4gICAgICB1cGxvYWRHcm91cEF2YXRhcixcbiAgICAgIHdob2FtaSxcbiAgICAgIHNlbmRDaGFsbGVuZ2VSZXNwb25zZSxcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gX2FqYXgoXG4gICAgICBwYXJhbTogQWpheE9wdGlvbnNUeXBlICYgeyByZXNwb25zZVR5cGU/OiAnYnl0ZXMnIH1cbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXk+O1xuICAgIGZ1bmN0aW9uIF9hamF4KFxuICAgICAgcGFyYW06IEFqYXhPcHRpb25zVHlwZSAmIHsgcmVzcG9uc2VUeXBlOiAnYnl0ZXN3aXRoZGV0YWlscycgfVxuICAgICk6IFByb21pc2U8Qnl0ZXNXaXRoRGV0YWlsc1R5cGU+O1xuICAgIGZ1bmN0aW9uIF9hamF4KFxuICAgICAgcGFyYW06IEFqYXhPcHRpb25zVHlwZSAmIHsgcmVzcG9uc2VUeXBlOiAnc3RyZWFtJyB9XG4gICAgKTogUHJvbWlzZTxSZWFkYWJsZT47XG4gICAgZnVuY3Rpb24gX2FqYXgoXG4gICAgICBwYXJhbTogQWpheE9wdGlvbnNUeXBlICYgeyByZXNwb25zZVR5cGU6ICdqc29uJyB9XG4gICAgKTogUHJvbWlzZTx1bmtub3duPjtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIF9hamF4KHBhcmFtOiBBamF4T3B0aW9uc1R5cGUpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgIGlmIChcbiAgICAgICAgIXBhcmFtLnVuYXV0aGVudGljYXRlZCAmJlxuICAgICAgICBhY3RpdmVSZWdpc3RyYXRpb24gJiZcbiAgICAgICAgIXBhcmFtLmlzUmVnaXN0cmF0aW9uXG4gICAgICApIHtcbiAgICAgICAgbG9nLmluZm8oJ1dlYkFQSTogcmVxdWVzdCBibG9ja2VkIGJ5IGFjdGl2ZSByZWdpc3RyYXRpb24nKTtcbiAgICAgICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgICBhd2FpdCBhY3RpdmVSZWdpc3RyYXRpb24ucHJvbWlzZTtcbiAgICAgICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XG4gICAgICAgIGxvZy5pbmZvKGBXZWJBUEk6IHJlcXVlc3QgdW5ibG9ja2VkIGFmdGVyICR7ZHVyYXRpb259bXNgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFwYXJhbS51cmxQYXJhbWV0ZXJzKSB7XG4gICAgICAgIHBhcmFtLnVybFBhcmFtZXRlcnMgPSAnJztcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXNlV2ViU29ja2V0Rm9yRW5kcG9pbnQgPVxuICAgICAgICB1c2VXZWJTb2NrZXQgJiYgV0VCU09DS0VUX0NBTExTLmhhcyhwYXJhbS5jYWxsKTtcblxuICAgICAgY29uc3Qgb3V0ZXJQYXJhbXMgPSB7XG4gICAgICAgIHNvY2tldE1hbmFnZXI6IHVzZVdlYlNvY2tldEZvckVuZHBvaW50ID8gc29ja2V0TWFuYWdlciA6IHVuZGVmaW5lZCxcbiAgICAgICAgYmFzaWNBdXRoOiBwYXJhbS5iYXNpY0F1dGgsXG4gICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICBjb250ZW50VHlwZTogcGFyYW0uY29udGVudFR5cGUgfHwgJ2FwcGxpY2F0aW9uL2pzb247IGNoYXJzZXQ9dXRmLTgnLFxuICAgICAgICBkYXRhOlxuICAgICAgICAgIHBhcmFtLmRhdGEgfHxcbiAgICAgICAgICAocGFyYW0uanNvbkRhdGEgPyBKU09OLnN0cmluZ2lmeShwYXJhbS5qc29uRGF0YSkgOiB1bmRlZmluZWQpLFxuICAgICAgICBoZWFkZXJzOiBwYXJhbS5oZWFkZXJzLFxuICAgICAgICBob3N0OiBwYXJhbS5ob3N0IHx8IHVybCxcbiAgICAgICAgcGFzc3dvcmQ6IHBhcmFtLnBhc3N3b3JkID8/IHBhc3N3b3JkLFxuICAgICAgICBwYXRoOiBVUkxfQ0FMTFNbcGFyYW0uY2FsbF0gKyBwYXJhbS51cmxQYXJhbWV0ZXJzLFxuICAgICAgICBwcm94eVVybCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiBwYXJhbS5yZXNwb25zZVR5cGUsXG4gICAgICAgIHRpbWVvdXQ6IHBhcmFtLnRpbWVvdXQsXG4gICAgICAgIHR5cGU6IHBhcmFtLmh0dHBUeXBlLFxuICAgICAgICB1c2VyOiBwYXJhbS51c2VybmFtZSA/PyB1c2VybmFtZSxcbiAgICAgICAgcmVkYWN0VXJsOiBwYXJhbS5yZWRhY3RVcmwsXG4gICAgICAgIHNlcnZlclVybDogdXJsLFxuICAgICAgICB2YWxpZGF0ZVJlc3BvbnNlOiBwYXJhbS52YWxpZGF0ZVJlc3BvbnNlLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICB1bmF1dGhlbnRpY2F0ZWQ6IHBhcmFtLnVuYXV0aGVudGljYXRlZCxcbiAgICAgICAgYWNjZXNzS2V5OiBwYXJhbS5hY2Nlc3NLZXksXG4gICAgICB9O1xuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgX291dGVyQWpheChudWxsLCBvdXRlclBhcmFtcyk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGlmICghKGUgaW5zdGFuY2VvZiBIVFRQRXJyb3IpKSB7XG4gICAgICAgICAgdGhyb3cgZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB0cmFuc2xhdGVkRXJyb3IgPSB0cmFuc2xhdGVFcnJvcihlKTtcbiAgICAgICAgaWYgKHRyYW5zbGF0ZWRFcnJvcikge1xuICAgICAgICAgIHRocm93IHRyYW5zbGF0ZWRFcnJvcjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHV1aWRLaW5kVG9RdWVyeShraW5kOiBVVUlES2luZCk6IHN0cmluZyB7XG4gICAgICBsZXQgdmFsdWU6IHN0cmluZztcbiAgICAgIGlmIChraW5kID09PSBVVUlES2luZC5BQ0kpIHtcbiAgICAgICAgdmFsdWUgPSAnYWNpJztcbiAgICAgIH0gZWxzZSBpZiAoa2luZCA9PT0gVVVJREtpbmQuUE5JKSB7XG4gICAgICAgIHZhbHVlID0gJ3BuaSc7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuc3VwcG9ydGVkIFVVSURLaW5kOiAke2tpbmR9YCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gYGlkZW50aXR5PSR7dmFsdWV9YDtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiB3aG9hbWkoKTogUHJvbWlzZTxXaG9hbWlSZXN1bHRUeXBlPiB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ3dob2FtaScsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFpc1JlY29yZChyZXNwb25zZSkpIHtcbiAgICAgICAgcmV0dXJuIHt9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB1dWlkOiBpc1ZhbGlkVXVpZChyZXNwb25zZS51dWlkKSA/IHJlc3BvbnNlLnV1aWQgOiB1bmRlZmluZWQsXG4gICAgICAgIHBuaTogaXNWYWxpZFV1aWQocmVzcG9uc2UucG5pKSA/IHJlc3BvbnNlLnBuaSA6IHVuZGVmaW5lZCxcbiAgICAgICAgbnVtYmVyOlxuICAgICAgICAgIHR5cGVvZiByZXNwb25zZS5udW1iZXIgPT09ICdzdHJpbmcnID8gcmVzcG9uc2UubnVtYmVyIDogdW5kZWZpbmVkLFxuICAgICAgICB1c2VybmFtZTpcbiAgICAgICAgICB0eXBlb2YgcmVzcG9uc2UudXNlcm5hbWUgPT09ICdzdHJpbmcnID8gcmVzcG9uc2UudXNlcm5hbWUgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIHNlbmRDaGFsbGVuZ2VSZXNwb25zZShjaGFsbGVuZ2VSZXNwb25zZTogQ2hhbGxlbmdlVHlwZSkge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnY2hhbGxlbmdlJyxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgICBqc29uRGF0YTogY2hhbGxlbmdlUmVzcG9uc2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBhdXRoZW50aWNhdGUoe1xuICAgICAgdXNlcm5hbWU6IG5ld1VzZXJuYW1lLFxuICAgICAgcGFzc3dvcmQ6IG5ld1Bhc3N3b3JkLFxuICAgIH06IFdlYkFQSUNyZWRlbnRpYWxzKSB7XG4gICAgICB1c2VybmFtZSA9IG5ld1VzZXJuYW1lO1xuICAgICAgcGFzc3dvcmQgPSBuZXdQYXNzd29yZDtcblxuICAgICAgaWYgKHVzZVdlYlNvY2tldCkge1xuICAgICAgICBhd2FpdCBzb2NrZXRNYW5hZ2VyLmF1dGhlbnRpY2F0ZSh7IHVzZXJuYW1lLCBwYXNzd29yZCB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBsb2dvdXQoKSB7XG4gICAgICB1c2VybmFtZSA9ICcnO1xuICAgICAgcGFzc3dvcmQgPSAnJztcblxuICAgICAgaWYgKHVzZVdlYlNvY2tldCkge1xuICAgICAgICBhd2FpdCBzb2NrZXRNYW5hZ2VyLmxvZ291dCgpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFNvY2tldFN0YXR1cygpOiBTb2NrZXRTdGF0dXMge1xuICAgICAgcmV0dXJuIHNvY2tldE1hbmFnZXIuZ2V0U3RhdHVzKCk7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gY2hlY2tTb2NrZXRzKCk6IHZvaWQge1xuICAgICAgLy8gSW50ZW50aW9uYWxseSBub3QgYXdhaXRpbmdcbiAgICAgIHNvY2tldE1hbmFnZXIuY2hlY2soKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvbk9ubGluZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIGF3YWl0IHNvY2tldE1hbmFnZXIub25PbmxpbmUoKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBvbk9mZmxpbmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICBhd2FpdCBzb2NrZXRNYW5hZ2VyLm9uT2ZmbGluZSgpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZ2lzdGVyUmVxdWVzdEhhbmRsZXIoaGFuZGxlcjogSVJlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgICBzb2NrZXRNYW5hZ2VyLnJlZ2lzdGVyUmVxdWVzdEhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gdW5yZWdpc3RlclJlcXVlc3RIYW5kbGVyKGhhbmRsZXI6IElSZXF1ZXN0SGFuZGxlcik6IHZvaWQge1xuICAgICAgc29ja2V0TWFuYWdlci51bnJlZ2lzdGVyUmVxdWVzdEhhbmRsZXIoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0Q29uZmlnKCkge1xuICAgICAgdHlwZSBSZXNUeXBlID0ge1xuICAgICAgICBjb25maWc6IEFycmF5PHsgbmFtZTogc3RyaW5nOyBlbmFibGVkOiBib29sZWFuOyB2YWx1ZTogc3RyaW5nIHwgbnVsbCB9PjtcbiAgICAgIH07XG4gICAgICBjb25zdCByZXMgPSAoYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnY29uZmlnJyxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgIH0pKSBhcyBSZXNUeXBlO1xuXG4gICAgICByZXR1cm4gcmVzLmNvbmZpZy5maWx0ZXIoXG4gICAgICAgICh7IG5hbWUgfTogeyBuYW1lOiBzdHJpbmcgfSkgPT5cbiAgICAgICAgICBuYW1lLnN0YXJ0c1dpdGgoJ2Rlc2t0b3AuJykgfHwgbmFtZS5zdGFydHNXaXRoKCdnbG9iYWwuJylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0U2VuZGVyQ2VydGlmaWNhdGUob21pdEUxNjQ/OiBib29sZWFuKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ2RlbGl2ZXJ5Q2VydCcsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHZhbGlkYXRlUmVzcG9uc2U6IHsgY2VydGlmaWNhdGU6ICdzdHJpbmcnIH0sXG4gICAgICAgIC4uLihvbWl0RTE2NCA/IHsgdXJsUGFyYW1ldGVyczogJz9pbmNsdWRlRTE2ND1mYWxzZScgfSA6IHt9KSxcbiAgICAgIH0pKSBhcyBHZXRTZW5kZXJDZXJ0aWZpY2F0ZVJlc3VsdFR5cGU7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk6IFByb21pc2U8U3RvcmFnZVNlcnZpY2VDcmVkZW50aWFscz4ge1xuICAgICAgcmV0dXJuIChhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdzdG9yYWdlVG9rZW4nLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICBzY2hlbWE6IHsgdXNlcm5hbWU6ICdzdHJpbmcnLCBwYXNzd29yZDogJ3N0cmluZycgfSxcbiAgICAgIH0pKSBhcyBTdG9yYWdlU2VydmljZUNyZWRlbnRpYWxzO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0b3JhZ2VNYW5pZmVzdChcbiAgICAgIG9wdGlvbnM6IFN0b3JhZ2VTZXJ2aWNlQ2FsbE9wdGlvbnNUeXBlID0ge31cbiAgICApOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgICAgIGNvbnN0IHsgY3JlZGVudGlhbHMsIGdyZWF0ZXJUaGFuVmVyc2lvbiB9ID0gb3B0aW9ucztcblxuICAgICAgY29uc3QgeyBkYXRhLCByZXNwb25zZSB9ID0gYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnc3RvcmFnZU1hbmlmZXN0JyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXByb3RvYnVmJyxcbiAgICAgICAgaG9zdDogc3RvcmFnZVVybCxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlc3dpdGhkZXRhaWxzJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogZ3JlYXRlclRoYW5WZXJzaW9uXG4gICAgICAgICAgPyBgL3ZlcnNpb24vJHtncmVhdGVyVGhhblZlcnNpb259YFxuICAgICAgICAgIDogJycsXG4gICAgICAgIC4uLmNyZWRlbnRpYWxzLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZS5zdGF0dXMgPT09IDIwNCkge1xuICAgICAgICB0aHJvdyBtYWtlSFRUUEVycm9yKFxuICAgICAgICAgICdwcm9taXNlQWpheDogZXJyb3IgcmVzcG9uc2UnLFxuICAgICAgICAgIHJlc3BvbnNlLnN0YXR1cyxcbiAgICAgICAgICByZXNwb25zZS5oZWFkZXJzLnJhdygpLFxuICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgbmV3IEVycm9yKCkuc3RhY2tcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGRhdGE7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcmFnZVJlY29yZHMoXG4gICAgICBkYXRhOiBVaW50OEFycmF5LFxuICAgICAgb3B0aW9uczogU3RvcmFnZVNlcnZpY2VDYWxsT3B0aW9uc1R5cGUgPSB7fVxuICAgICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgICAgY29uc3QgeyBjcmVkZW50aWFscyB9ID0gb3B0aW9ucztcblxuICAgICAgcmV0dXJuIF9hamF4KHtcbiAgICAgICAgY2FsbDogJ3N0b3JhZ2VSZWFkJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXByb3RvYnVmJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaG9zdDogc3RvcmFnZVVybCxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIC4uLmNyZWRlbnRpYWxzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gbW9kaWZ5U3RvcmFnZVJlY29yZHMoXG4gICAgICBkYXRhOiBVaW50OEFycmF5LFxuICAgICAgb3B0aW9uczogU3RvcmFnZVNlcnZpY2VDYWxsT3B0aW9uc1R5cGUgPSB7fVxuICAgICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgICAgY29uc3QgeyBjcmVkZW50aWFscyB9ID0gb3B0aW9ucztcblxuICAgICAgcmV0dXJuIF9hamF4KHtcbiAgICAgICAgY2FsbDogJ3N0b3JhZ2VNb2RpZnknLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtcHJvdG9idWYnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBob3N0OiBzdG9yYWdlVXJsLFxuICAgICAgICBodHRwVHlwZTogJ1BVVCcsXG4gICAgICAgIC8vIElmIHdlIHJ1biBpbnRvIGEgY29uZmxpY3QsIHRoZSBjdXJyZW50IG1hbmlmZXN0IGlzIHJldHVybmVkIC1cbiAgICAgICAgLy8gICBpdCB3aWxsIHdpbGwgYmUgYW4gVWludDhBcnJheSBhdCB0aGUgcmVzcG9uc2Uga2V5IG9uIHRoZSBFcnJvclxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIC4uLmNyZWRlbnRpYWxzLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJTdXBwb3J0Rm9yVW5hdXRoZW50aWNhdGVkRGVsaXZlcnkoKSB7XG4gICAgICBhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdzdXBwb3J0VW5hdXRoZW50aWNhdGVkRGVsaXZlcnknLFxuICAgICAgICBodHRwVHlwZTogJ1BVVCcsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVnaXN0ZXJDYXBhYmlsaXRpZXMoY2FwYWJpbGl0aWVzOiBDYXBhYmlsaXRpZXNVcGxvYWRUeXBlKSB7XG4gICAgICBhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdyZWdpc3RlckNhcGFiaWxpdGllcycsXG4gICAgICAgIGh0dHBUeXBlOiAnUFVUJyxcbiAgICAgICAganNvbkRhdGE6IGNhcGFiaWxpdGllcyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb2ZpbGVVcmwoXG4gICAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgICB7XG4gICAgICAgIHByb2ZpbGVLZXlWZXJzaW9uLFxuICAgICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3QsXG4gICAgICAgIGNyZWRlbnRpYWxUeXBlID0gJ3Byb2ZpbGVLZXknLFxuICAgICAgfTogR2V0UHJvZmlsZUNvbW1vbk9wdGlvbnNUeXBlXG4gICAgKSB7XG4gICAgICBsZXQgcHJvZmlsZVVybCA9IGAvJHtpZGVudGlmaWVyfWA7XG4gICAgICBpZiAocHJvZmlsZUtleVZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBwcm9maWxlVXJsICs9IGAvJHtwcm9maWxlS2V5VmVyc2lvbn1gO1xuICAgICAgICBpZiAocHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0ICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBwcm9maWxlVXJsICs9XG4gICAgICAgICAgICBgLyR7cHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0fWAgK1xuICAgICAgICAgICAgYD9jcmVkZW50aWFsVHlwZT0ke2NyZWRlbnRpYWxUeXBlfWA7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3QgPT09IHVuZGVmaW5lZCxcbiAgICAgICAgICAnZ2V0UHJvZmlsZVVybCBjYWxsZWQgd2l0aG91dCB2ZXJzaW9uLCBidXQgd2l0aCByZXF1ZXN0J1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gcHJvZmlsZVVybDtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRQcm9maWxlKFxuICAgICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgICAgb3B0aW9uczogR2V0UHJvZmlsZU9wdGlvbnNUeXBlXG4gICAgKSB7XG4gICAgICBjb25zdCB7IHByb2ZpbGVLZXlWZXJzaW9uLCBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3QsIHVzZXJMYW5ndWFnZXMgfSA9XG4gICAgICAgIG9wdGlvbnM7XG5cbiAgICAgIHJldHVybiAoYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAncHJvZmlsZScsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogZ2V0UHJvZmlsZVVybChpZGVudGlmaWVyLCBvcHRpb25zKSxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQtTGFuZ3VhZ2UnOiBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcih1c2VyTGFuZ3VhZ2VzKSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHJlZGFjdFVybDogX2NyZWF0ZVJlZGFjdG9yKFxuICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgcHJvZmlsZUtleVZlcnNpb24sXG4gICAgICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWxSZXF1ZXN0XG4gICAgICAgICksXG4gICAgICB9KSkgYXMgUHJvZmlsZVR5cGU7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0UHJvZmlsZUZvclVzZXJuYW1lKHVzZXJuYW1lVG9GZXRjaDogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ3Byb2ZpbGUnLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IGAvdXNlcm5hbWUvJHt1c2VybmFtZVRvRmV0Y2h9YCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHJlZGFjdFVybDogX2NyZWF0ZVJlZGFjdG9yKHVzZXJuYW1lVG9GZXRjaCksXG4gICAgICB9KSkgYXMgUHJvZmlsZVR5cGU7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcHV0UHJvZmlsZShcbiAgICAgIGpzb25EYXRhOiBQcm9maWxlUmVxdWVzdERhdGFUeXBlXG4gICAgKTogUHJvbWlzZTxVcGxvYWRBdmF0YXJIZWFkZXJzVHlwZSB8IHVuZGVmaW5lZD4ge1xuICAgICAgY29uc3QgcmVzID0gYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAncHJvZmlsZScsXG4gICAgICAgIGh0dHBUeXBlOiAnUFVUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIGpzb25EYXRhLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghcmVzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHVwbG9hZEF2YXRhckhlYWRlcnNab2QucGFyc2UocmVzKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRQcm9maWxlVW5hdXRoKFxuICAgICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgICAgb3B0aW9uczogR2V0UHJvZmlsZVVuYXV0aE9wdGlvbnNUeXBlXG4gICAgKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGFjY2Vzc0tleSxcbiAgICAgICAgcHJvZmlsZUtleVZlcnNpb24sXG4gICAgICAgIHByb2ZpbGVLZXlDcmVkZW50aWFsUmVxdWVzdCxcbiAgICAgICAgdXNlckxhbmd1YWdlcyxcbiAgICAgIH0gPSBvcHRpb25zO1xuXG4gICAgICByZXR1cm4gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ3Byb2ZpbGUnLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IGdldFByb2ZpbGVVcmwoaWRlbnRpZmllciwgb3B0aW9ucyksXG4gICAgICAgIGhlYWRlcnM6IHtcbiAgICAgICAgICAnQWNjZXB0LUxhbmd1YWdlJzogZm9ybWF0QWNjZXB0TGFuZ3VhZ2VIZWFkZXIodXNlckxhbmd1YWdlcyksXG4gICAgICAgIH0sXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICB1bmF1dGhlbnRpY2F0ZWQ6IHRydWUsXG4gICAgICAgIGFjY2Vzc0tleSxcbiAgICAgICAgcmVkYWN0VXJsOiBfY3JlYXRlUmVkYWN0b3IoXG4gICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICBwcm9maWxlS2V5VmVyc2lvbixcbiAgICAgICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbFJlcXVlc3RcbiAgICAgICAgKSxcbiAgICAgIH0pKSBhcyBQcm9maWxlVHlwZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRCYWRnZUltYWdlRmlsZShcbiAgICAgIGltYWdlRmlsZVVybDogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGlzQmFkZ2VJbWFnZUZpbGVVcmxWYWxpZChpbWFnZUZpbGVVcmwsIHVwZGF0ZXNVcmwpLFxuICAgICAgICAnZ2V0QmFkZ2VJbWFnZUZpbGUgZ290IGFuIGludmFsaWQgVVJMLiBXYXMgYmFkIGRhdGEgc2F2ZWQ/J1xuICAgICAgKTtcblxuICAgICAgcmV0dXJuIF9vdXRlckFqYXgoaW1hZ2VGaWxlVXJsLCB7XG4gICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIHRpbWVvdXQ6IDAsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICByZWRhY3RVcmw6IChocmVmOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXJzZWRVcmwgPSBtYXliZVBhcnNlVXJsKGhyZWYpO1xuICAgICAgICAgIGlmICghcGFyc2VkVXJsKSB7XG4gICAgICAgICAgICByZXR1cm4gaHJlZjtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgeyBwYXRobmFtZSB9ID0gcGFyc2VkVXJsO1xuICAgICAgICAgIGNvbnN0IHBhdHRlcm4gPSBSZWdFeHAoZXNjYXBlUmVnRXhwKHBhdGhuYW1lKSwgJ2cnKTtcbiAgICAgICAgICByZXR1cm4gaHJlZi5yZXBsYWNlKHBhdHRlcm4sIGBbUkVEQUNURURdJHtwYXRobmFtZS5zbGljZSgtMyl9YCk7XG4gICAgICAgIH0sXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRCb29zdEJhZGdlc0Zyb21TZXJ2ZXIoXG4gICAgICB1c2VyTGFuZ3VhZ2VzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbiAgICApOiBQcm9taXNlPHVua25vd24+IHtcbiAgICAgIHJldHVybiBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdib29zdEJhZGdlcycsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgaGVhZGVyczoge1xuICAgICAgICAgICdBY2NlcHQtTGFuZ3VhZ2UnOiBmb3JtYXRBY2NlcHRMYW5ndWFnZUhlYWRlcih1c2VyTGFuZ3VhZ2VzKSxcbiAgICAgICAgfSxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRBdmF0YXIocGF0aDogc3RyaW5nKSB7XG4gICAgICAvLyBVc2luZyBfb3V0ZXJBSkFYLCBzaW5jZSBpdCdzIG5vdCBoYXJkY29kZWQgdG8gdGhlIFNpZ25hbCBTZXJ2ZXIuIFVubGlrZSBvdXJcbiAgICAgIC8vICAgYXR0YWNobWVudCBDRE4sIGl0IHVzZXMgb3VyIHNlbGYtc2lnbmVkIGNlcnRpZmljYXRlLCBzbyB3ZSBwYXNzIGl0IGluLlxuICAgICAgcmV0dXJuIF9vdXRlckFqYXgoYCR7Y2RuVXJsT2JqZWN0WycwJ119LyR7cGF0aH1gLCB7XG4gICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL29jdGV0LXN0cmVhbScsXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIHRpbWVvdXQ6IDAsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICByZWRhY3RVcmw6IChocmVmOiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBwYXR0ZXJuID0gUmVnRXhwKGVzY2FwZVJlZ0V4cChwYXRoKSwgJ2cnKTtcbiAgICAgICAgICByZXR1cm4gaHJlZi5yZXBsYWNlKHBhdHRlcm4sIGBbUkVEQUNURURdJHtwYXRoLnNsaWNlKC0zKX1gKTtcbiAgICAgICAgfSxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVVzZXJuYW1lKCkge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAndXNlcm5hbWUnLFxuICAgICAgICBodHRwVHlwZTogJ0RFTEVURScsXG4gICAgICB9KTtcbiAgICB9XG4gICAgYXN5bmMgZnVuY3Rpb24gcHV0VXNlcm5hbWUobmV3VXNlcm5hbWU6IHN0cmluZykge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAndXNlcm5hbWUnLFxuICAgICAgICBodHRwVHlwZTogJ1BVVCcsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IGAvJHtuZXdVc2VybmFtZX1gLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVwb3J0TWVzc2FnZShcbiAgICAgIHNlbmRlclV1aWQ6IHN0cmluZyxcbiAgICAgIHNlcnZlckd1aWQ6IHN0cmluZ1xuICAgICk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAncmVwb3J0TWVzc2FnZScsXG4gICAgICAgIGh0dHBUeXBlOiAnUE9TVCcsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IGAvJHtzZW5kZXJVdWlkfS8ke3NlcnZlckd1aWR9YCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYnl0ZXMnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFZlcmlmaWNhdGlvblNNUyhudW1iZXI6IHN0cmluZywgdG9rZW46IHN0cmluZykge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnYWNjb3VudHMnLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IGAvc21zL2NvZGUvJHtudW1iZXJ9P2NhcHRjaGE9JHt0b2tlbn1gLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFZlcmlmaWNhdGlvblZvaWNlKG51bWJlcjogc3RyaW5nLCB0b2tlbjogc3RyaW5nKSB7XG4gICAgICBhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdhY2NvdW50cycsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYC92b2ljZS9jb2RlLyR7bnVtYmVyfT9jYXB0Y2hhPSR7dG9rZW59YCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGNoZWNrQWNjb3VudEV4aXN0ZW5jZSh1dWlkOiBVVUlEKSB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBfYWpheCh7XG4gICAgICAgICAgaHR0cFR5cGU6ICdIRUFEJyxcbiAgICAgICAgICBjYWxsOiAnYWNjb3VudEV4aXN0ZW5jZScsXG4gICAgICAgICAgdXJsUGFyYW1ldGVyczogYC8ke3V1aWQudG9TdHJpbmcoKX1gLFxuICAgICAgICAgIHVuYXV0aGVudGljYXRlZDogdHJ1ZSxcbiAgICAgICAgICBhY2Nlc3NLZXk6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSFRUUEVycm9yICYmIGVycm9yLmNvZGUgPT09IDQwNCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIGZ1bmN0aW9uIHN0YXJ0UmVnaXN0cmF0aW9uKCkge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBhY3RpdmVSZWdpc3RyYXRpb24gPT09IHVuZGVmaW5lZCxcbiAgICAgICAgJ1JlZ2lzdHJhdGlvbiBhbHJlYWR5IGluIHByb2dyZXNzJ1xuICAgICAgKTtcblxuICAgICAgYWN0aXZlUmVnaXN0cmF0aW9uID0gZXhwbG9kZVByb21pc2U8dm9pZD4oKTtcbiAgICAgIGxvZy5pbmZvKCdXZWJBUEk6IHN0YXJ0aW5nIHJlZ2lzdHJhdGlvbicpO1xuXG4gICAgICByZXR1cm4gYWN0aXZlUmVnaXN0cmF0aW9uO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGZpbmlzaFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb246IHVua25vd24pIHtcbiAgICAgIHN0cmljdEFzc2VydChhY3RpdmVSZWdpc3RyYXRpb24gIT09IHVuZGVmaW5lZCwgJ05vIGFjdGl2ZSByZWdpc3RyYXRpb24nKTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgYWN0aXZlUmVnaXN0cmF0aW9uID09PSByZWdpc3RyYXRpb24sXG4gICAgICAgICdJbnZhbGlkIHJlZ2lzdHJhdGlvbiBiYXRvbidcbiAgICAgICk7XG5cbiAgICAgIGxvZy5pbmZvKCdXZWJBUEk6IGZpbmlzaGluZyByZWdpc3RyYXRpb24nKTtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSBhY3RpdmVSZWdpc3RyYXRpb247XG4gICAgICBhY3RpdmVSZWdpc3RyYXRpb24gPSB1bmRlZmluZWQ7XG4gICAgICBjdXJyZW50LnJlc29sdmUoKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBjb25maXJtQ29kZShcbiAgICAgIG51bWJlcjogc3RyaW5nLFxuICAgICAgY29kZTogc3RyaW5nLFxuICAgICAgbmV3UGFzc3dvcmQ6IHN0cmluZyxcbiAgICAgIHJlZ2lzdHJhdGlvbklkOiBudW1iZXIsXG4gICAgICBkZXZpY2VOYW1lPzogc3RyaW5nIHwgbnVsbCxcbiAgICAgIG9wdGlvbnM6IHsgYWNjZXNzS2V5PzogVWludDhBcnJheSB9ID0ge31cbiAgICApIHtcbiAgICAgIGNvbnN0IGNhcGFiaWxpdGllczogQ2FwYWJpbGl0aWVzVXBsb2FkVHlwZSA9IHtcbiAgICAgICAgYW5ub3VuY2VtZW50R3JvdXA6IHRydWUsXG4gICAgICAgIGdpZnRCYWRnZXM6IHRydWUsXG4gICAgICAgICdndjItMyc6IHRydWUsXG4gICAgICAgICdndjEtbWlncmF0aW9uJzogdHJ1ZSxcbiAgICAgICAgc2VuZGVyS2V5OiB0cnVlLFxuICAgICAgICBjaGFuZ2VOdW1iZXI6IHRydWUsXG4gICAgICAgIHN0b3JpZXM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGFjY2Vzc0tleSB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IGpzb25EYXRhID0ge1xuICAgICAgICBjYXBhYmlsaXRpZXMsXG4gICAgICAgIGZldGNoZXNNZXNzYWdlczogdHJ1ZSxcbiAgICAgICAgbmFtZTogZGV2aWNlTmFtZSB8fCB1bmRlZmluZWQsXG4gICAgICAgIHJlZ2lzdHJhdGlvbklkLFxuICAgICAgICBzdXBwb3J0c1NtczogZmFsc2UsXG4gICAgICAgIHVuaWRlbnRpZmllZEFjY2Vzc0tleTogYWNjZXNzS2V5XG4gICAgICAgICAgPyBCeXRlcy50b0Jhc2U2NChhY2Nlc3NLZXkpXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIHVucmVzdHJpY3RlZFVuaWRlbnRpZmllZEFjY2VzczogZmFsc2UsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBjYWxsID0gZGV2aWNlTmFtZSA/ICdkZXZpY2VzJyA6ICdhY2NvdW50cyc7XG4gICAgICBjb25zdCB1cmxQcmVmaXggPSBkZXZpY2VOYW1lID8gJy8nIDogJy9jb2RlLyc7XG5cbiAgICAgIC8vIFJlc2V0IG9sZCB3ZWJzb2NrZXQgY3JlZGVudGlhbHMgYW5kIGRpc2Nvbm5lY3QuXG4gICAgICAvLyBBY2NvdW50TWFuYWdlciBpcyBvdXIgb25seSBjYWxsZXIgYW5kIGl0IHdpbGwgdHJpZ2dlclxuICAgICAgLy8gYHJlZ2lzdHJhdGlvbl9kb25lYCB3aGljaCB3aWxsIHVwZGF0ZSBjcmVkZW50aWFscy5cbiAgICAgIGF3YWl0IGxvZ291dCgpO1xuXG4gICAgICAvLyBVcGRhdGUgUkVTVCBjcmVkZW50aWFscywgdGhvdWdoLiBXZSBuZWVkIHRoZW0gZm9yIHRoZSBjYWxsIGJlbG93XG4gICAgICB1c2VybmFtZSA9IG51bWJlcjtcbiAgICAgIHBhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgaXNSZWdpc3RyYXRpb246IHRydWUsXG4gICAgICAgIGNhbGwsXG4gICAgICAgIGh0dHBUeXBlOiAnUFVUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHVybFBhcmFtZXRlcnM6IHVybFByZWZpeCArIGNvZGUsXG4gICAgICAgIGpzb25EYXRhLFxuICAgICAgfSkpIGFzIENvbmZpcm1Db2RlUmVzdWx0VHlwZTtcblxuICAgICAgLy8gU2V0IGZpbmFsIFJFU1QgY3JlZGVudGlhbHMgdG8gbGV0IGByZWdpc3RlcktleXNgIHN1Y2NlZWQuXG4gICAgICB1c2VybmFtZSA9IGAke3Jlc3BvbnNlLnV1aWQgfHwgbnVtYmVyfS4ke3Jlc3BvbnNlLmRldmljZUlkIHx8IDF9YDtcbiAgICAgIHBhc3N3b3JkID0gbmV3UGFzc3dvcmQ7XG5cbiAgICAgIHJldHVybiByZXNwb25zZTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiB1cGRhdGVEZXZpY2VOYW1lKGRldmljZU5hbWU6IHN0cmluZykge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAndXBkYXRlRGV2aWNlTmFtZScsXG4gICAgICAgIGh0dHBUeXBlOiAnUFVUJyxcbiAgICAgICAganNvbkRhdGE6IHtcbiAgICAgICAgICBkZXZpY2VOYW1lLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SWNlU2VydmVycygpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnZ2V0SWNlU2VydmVycycsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB9KSkgYXMgR2V0SWNlU2VydmVyc1Jlc3VsdFR5cGU7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0RGV2aWNlcygpIHtcbiAgICAgIHJldHVybiAoYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnZGV2aWNlcycsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICB9KSkgYXMgR2V0RGV2aWNlc1Jlc3VsdFR5cGU7XG4gICAgfVxuXG4gICAgdHlwZSBKU09OU2lnbmVkUHJlS2V5VHlwZSA9IHtcbiAgICAgIGtleUlkOiBudW1iZXI7XG4gICAgICBwdWJsaWNLZXk6IHN0cmluZztcbiAgICAgIHNpZ25hdHVyZTogc3RyaW5nO1xuICAgIH07XG5cbiAgICB0eXBlIEpTT05LZXlzVHlwZSA9IHtcbiAgICAgIGlkZW50aXR5S2V5OiBzdHJpbmc7XG4gICAgICBzaWduZWRQcmVLZXk6IEpTT05TaWduZWRQcmVLZXlUeXBlO1xuICAgICAgcHJlS2V5czogQXJyYXk8e1xuICAgICAgICBrZXlJZDogbnVtYmVyO1xuICAgICAgICBwdWJsaWNLZXk6IHN0cmluZztcbiAgICAgIH0+O1xuICAgIH07XG5cbiAgICBhc3luYyBmdW5jdGlvbiByZWdpc3RlcktleXMoZ2VuS2V5czogS2V5c1R5cGUsIHV1aWRLaW5kOiBVVUlES2luZCkge1xuICAgICAgY29uc3QgcHJlS2V5cyA9IGdlbktleXMucHJlS2V5cy5tYXAoa2V5ID0+ICh7XG4gICAgICAgIGtleUlkOiBrZXkua2V5SWQsXG4gICAgICAgIHB1YmxpY0tleTogQnl0ZXMudG9CYXNlNjQoa2V5LnB1YmxpY0tleSksXG4gICAgICB9KSk7XG5cbiAgICAgIGNvbnN0IGtleXM6IEpTT05LZXlzVHlwZSA9IHtcbiAgICAgICAgaWRlbnRpdHlLZXk6IEJ5dGVzLnRvQmFzZTY0KGdlbktleXMuaWRlbnRpdHlLZXkpLFxuICAgICAgICBzaWduZWRQcmVLZXk6IHtcbiAgICAgICAgICBrZXlJZDogZ2VuS2V5cy5zaWduZWRQcmVLZXkua2V5SWQsXG4gICAgICAgICAgcHVibGljS2V5OiBCeXRlcy50b0Jhc2U2NChnZW5LZXlzLnNpZ25lZFByZUtleS5wdWJsaWNLZXkpLFxuICAgICAgICAgIHNpZ25hdHVyZTogQnl0ZXMudG9CYXNlNjQoZ2VuS2V5cy5zaWduZWRQcmVLZXkuc2lnbmF0dXJlKSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJlS2V5cyxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IF9hamF4KHtcbiAgICAgICAgaXNSZWdpc3RyYXRpb246IHRydWUsXG4gICAgICAgIGNhbGw6ICdrZXlzJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYD8ke3V1aWRLaW5kVG9RdWVyeSh1dWlkS2luZCl9YCxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgICBqc29uRGF0YToga2V5cyxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIHNldFNpZ25lZFByZUtleShcbiAgICAgIHNpZ25lZFByZUtleTogU2lnbmVkUHJlS2V5VHlwZSxcbiAgICAgIHV1aWRLaW5kOiBVVUlES2luZFxuICAgICkge1xuICAgICAgYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnc2lnbmVkJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYD8ke3V1aWRLaW5kVG9RdWVyeSh1dWlkS2luZCl9YCxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgICBqc29uRGF0YToge1xuICAgICAgICAgIGtleUlkOiBzaWduZWRQcmVLZXkua2V5SWQsXG4gICAgICAgICAgcHVibGljS2V5OiBCeXRlcy50b0Jhc2U2NChzaWduZWRQcmVLZXkucHVibGljS2V5KSxcbiAgICAgICAgICBzaWduYXR1cmU6IEJ5dGVzLnRvQmFzZTY0KHNpZ25lZFByZUtleS5zaWduYXR1cmUpLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdHlwZSBTZXJ2ZXJLZXlDb3VudFR5cGUgPSB7XG4gICAgICBjb3VudDogbnVtYmVyO1xuICAgIH07XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRNeUtleXModXVpZEtpbmQ6IFVVSURLaW5kKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IChhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdrZXlzJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYD8ke3V1aWRLaW5kVG9RdWVyeSh1dWlkS2luZCl9YCxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgdmFsaWRhdGVSZXNwb25zZTogeyBjb3VudDogJ251bWJlcicgfSxcbiAgICAgIH0pKSBhcyBTZXJ2ZXJLZXlDb3VudFR5cGU7XG5cbiAgICAgIHJldHVybiByZXN1bHQuY291bnQ7XG4gICAgfVxuXG4gICAgdHlwZSBTZXJ2ZXJLZXlSZXNwb25zZVR5cGUgPSB7XG4gICAgICBkZXZpY2VzOiBBcnJheTx7XG4gICAgICAgIGRldmljZUlkOiBudW1iZXI7XG4gICAgICAgIHJlZ2lzdHJhdGlvbklkOiBudW1iZXI7XG4gICAgICAgIHNpZ25lZFByZUtleToge1xuICAgICAgICAgIGtleUlkOiBudW1iZXI7XG4gICAgICAgICAgcHVibGljS2V5OiBzdHJpbmc7XG4gICAgICAgICAgc2lnbmF0dXJlOiBzdHJpbmc7XG4gICAgICAgIH07XG4gICAgICAgIHByZUtleT86IHtcbiAgICAgICAgICBrZXlJZDogbnVtYmVyO1xuICAgICAgICAgIHB1YmxpY0tleTogc3RyaW5nO1xuICAgICAgICB9O1xuICAgICAgfT47XG4gICAgICBpZGVudGl0eUtleTogc3RyaW5nO1xuICAgIH07XG5cbiAgICBmdW5jdGlvbiBoYW5kbGVLZXlzKHJlczogU2VydmVyS2V5UmVzcG9uc2VUeXBlKTogU2VydmVyS2V5c1R5cGUge1xuICAgICAgaWYgKCFBcnJheS5pc0FycmF5KHJlcy5kZXZpY2VzKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVzcG9uc2UnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGV2aWNlcyA9IHJlcy5kZXZpY2VzLm1hcChkZXZpY2UgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgIV92YWxpZGF0ZVJlc3BvbnNlKGRldmljZSwgeyBzaWduZWRQcmVLZXk6ICdvYmplY3QnIH0pIHx8XG4gICAgICAgICAgIV92YWxpZGF0ZVJlc3BvbnNlKGRldmljZS5zaWduZWRQcmVLZXksIHtcbiAgICAgICAgICAgIHB1YmxpY0tleTogJ3N0cmluZycsXG4gICAgICAgICAgICBzaWduYXR1cmU6ICdzdHJpbmcnLFxuICAgICAgICAgIH0pXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBzaWduZWRQcmVLZXknKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBwcmVLZXk7XG4gICAgICAgIGlmIChkZXZpY2UucHJlS2V5KSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgIV92YWxpZGF0ZVJlc3BvbnNlKGRldmljZSwgeyBwcmVLZXk6ICdvYmplY3QnIH0pIHx8XG4gICAgICAgICAgICAhX3ZhbGlkYXRlUmVzcG9uc2UoZGV2aWNlLnByZUtleSwgeyBwdWJsaWNLZXk6ICdzdHJpbmcnIH0pXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcHJlS2V5Jyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcHJlS2V5ID0ge1xuICAgICAgICAgICAga2V5SWQ6IGRldmljZS5wcmVLZXkua2V5SWQsXG4gICAgICAgICAgICBwdWJsaWNLZXk6IEJ5dGVzLmZyb21CYXNlNjQoZGV2aWNlLnByZUtleS5wdWJsaWNLZXkpLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGRldmljZUlkOiBkZXZpY2UuZGV2aWNlSWQsXG4gICAgICAgICAgcmVnaXN0cmF0aW9uSWQ6IGRldmljZS5yZWdpc3RyYXRpb25JZCxcbiAgICAgICAgICBwcmVLZXksXG4gICAgICAgICAgc2lnbmVkUHJlS2V5OiB7XG4gICAgICAgICAgICBrZXlJZDogZGV2aWNlLnNpZ25lZFByZUtleS5rZXlJZCxcbiAgICAgICAgICAgIHB1YmxpY0tleTogQnl0ZXMuZnJvbUJhc2U2NChkZXZpY2Uuc2lnbmVkUHJlS2V5LnB1YmxpY0tleSksXG4gICAgICAgICAgICBzaWduYXR1cmU6IEJ5dGVzLmZyb21CYXNlNjQoZGV2aWNlLnNpZ25lZFByZUtleS5zaWduYXR1cmUpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZGV2aWNlcyxcbiAgICAgICAgaWRlbnRpdHlLZXk6IEJ5dGVzLmZyb21CYXNlNjQocmVzLmlkZW50aXR5S2V5KSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0S2V5c0ZvcklkZW50aWZpZXIoaWRlbnRpZmllcjogc3RyaW5nLCBkZXZpY2VJZD86IG51bWJlcikge1xuICAgICAgY29uc3Qga2V5cyA9IChhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdrZXlzJyxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBgLyR7aWRlbnRpZmllcn0vJHtkZXZpY2VJZCB8fCAnKid9YCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHZhbGlkYXRlUmVzcG9uc2U6IHsgaWRlbnRpdHlLZXk6ICdzdHJpbmcnLCBkZXZpY2VzOiAnb2JqZWN0JyB9LFxuICAgICAgfSkpIGFzIFNlcnZlcktleVJlc3BvbnNlVHlwZTtcbiAgICAgIHJldHVybiBoYW5kbGVLZXlzKGtleXMpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEtleXNGb3JJZGVudGlmaWVyVW5hdXRoKFxuICAgICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgICAgZGV2aWNlSWQ/OiBudW1iZXIsXG4gICAgICB7IGFjY2Vzc0tleSB9OiB7IGFjY2Vzc0tleT86IHN0cmluZyB9ID0ge31cbiAgICApIHtcbiAgICAgIGNvbnN0IGtleXMgPSAoYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAna2V5cycsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYC8ke2lkZW50aWZpZXJ9LyR7ZGV2aWNlSWQgfHwgJyonfWAsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgICB2YWxpZGF0ZVJlc3BvbnNlOiB7IGlkZW50aXR5S2V5OiAnc3RyaW5nJywgZGV2aWNlczogJ29iamVjdCcgfSxcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgICBhY2Nlc3NLZXksXG4gICAgICB9KSkgYXMgU2VydmVyS2V5UmVzcG9uc2VUeXBlO1xuICAgICAgcmV0dXJuIGhhbmRsZUtleXMoa2V5cyk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gc2VuZE1lc3NhZ2VzVW5hdXRoKFxuICAgICAgZGVzdGluYXRpb246IHN0cmluZyxcbiAgICAgIG1lc3NhZ2VzOiBSZWFkb25seUFycmF5PE1lc3NhZ2VUeXBlPixcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyLFxuICAgICAgb25saW5lPzogYm9vbGVhbixcbiAgICAgIHsgYWNjZXNzS2V5IH06IHsgYWNjZXNzS2V5Pzogc3RyaW5nIH0gPSB7fVxuICAgICkge1xuICAgICAgbGV0IGpzb25EYXRhO1xuICAgICAgaWYgKG9ubGluZSkge1xuICAgICAgICBqc29uRGF0YSA9IHsgbWVzc2FnZXMsIHRpbWVzdGFtcCwgb25saW5lOiB0cnVlIH07XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqc29uRGF0YSA9IHsgbWVzc2FnZXMsIHRpbWVzdGFtcCB9O1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdtZXNzYWdlcycsXG4gICAgICAgIGh0dHBUeXBlOiAnUFVUJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYC8ke2Rlc3RpbmF0aW9ufWAsXG4gICAgICAgIGpzb25EYXRhLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgICBhY2Nlc3NLZXksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBzZW5kTWVzc2FnZXMoXG4gICAgICBkZXN0aW5hdGlvbjogc3RyaW5nLFxuICAgICAgbWVzc2FnZXM6IFJlYWRvbmx5QXJyYXk8TWVzc2FnZVR5cGU+LFxuICAgICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgICBvbmxpbmU/OiBib29sZWFuXG4gICAgKSB7XG4gICAgICBsZXQganNvbkRhdGE7XG4gICAgICBpZiAob25saW5lKSB7XG4gICAgICAgIGpzb25EYXRhID0geyBtZXNzYWdlcywgdGltZXN0YW1wLCBvbmxpbmU6IHRydWUgfTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGpzb25EYXRhID0geyBtZXNzYWdlcywgdGltZXN0YW1wIH07XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ21lc3NhZ2VzJyxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBgLyR7ZGVzdGluYXRpb259YCxcbiAgICAgICAganNvbkRhdGEsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gc2VuZFdpdGhTZW5kZXJLZXkoXG4gICAgICBkYXRhOiBVaW50OEFycmF5LFxuICAgICAgYWNjZXNzS2V5czogVWludDhBcnJheSxcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyLFxuICAgICAgb25saW5lPzogYm9vbGVhblxuICAgICk6IFByb21pc2U8TXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVR5cGU+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgX2FqYXgoe1xuICAgICAgICBjYWxsOiAnbXVsdGlSZWNpcGllbnQnLFxuICAgICAgICBodHRwVHlwZTogJ1BVVCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vdm5kLnNpZ25hbC1tZXNzZW5nZXIubXJtJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYD90cz0ke3RpbWVzdGFtcH0mb25saW5lPSR7b25saW5lID8gJ3RydWUnIDogJ2ZhbHNlJ31gLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgICAgdW5hdXRoZW50aWNhdGVkOiB0cnVlLFxuICAgICAgICBhY2Nlc3NLZXk6IEJ5dGVzLnRvQmFzZTY0KGFjY2Vzc0tleXMpLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBwYXJzZVJlc3VsdCA9IG11bHRpUmVjaXBpZW50MjAwUmVzcG9uc2VTY2hlbWEuc2FmZVBhcnNlKHJlc3BvbnNlKTtcbiAgICAgIGlmIChwYXJzZVJlc3VsdC5zdWNjZXNzKSB7XG4gICAgICAgIHJldHVybiBwYXJzZVJlc3VsdC5kYXRhO1xuICAgICAgfVxuXG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ1dlYkFQSTogaW52YWxpZCByZXNwb25zZSBmcm9tIHNlbmRXaXRoU2VuZGVyS2V5JyxcbiAgICAgICAgdG9Mb2dGb3JtYXQocGFyc2VSZXN1bHQuZXJyb3IpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHJlc3BvbnNlIGFzIE11bHRpUmVjaXBpZW50MjAwUmVzcG9uc2VUeXBlO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHJlZGFjdFN0aWNrZXJVcmwoc3RpY2tlclVybDogc3RyaW5nKSB7XG4gICAgICByZXR1cm4gc3RpY2tlclVybC5yZXBsYWNlKFxuICAgICAgICAvKFxcL3N0aWNrZXJzXFwvKShbXi9dKykoXFwvKS8sXG4gICAgICAgIChfLCBiZWdpbjogc3RyaW5nLCBwYWNrSWQ6IHN0cmluZywgZW5kOiBzdHJpbmcpID0+XG4gICAgICAgICAgYCR7YmVnaW59JHtyZWRhY3RQYWNrSWQocGFja0lkKX0ke2VuZH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldFN0aWNrZXIocGFja0lkOiBzdHJpbmcsIHN0aWNrZXJJZDogbnVtYmVyKSB7XG4gICAgICBpZiAoIWlzUGFja0lkVmFsaWQocGFja0lkKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN0aWNrZXI6IHBhY2sgSUQgd2FzIGludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfb3V0ZXJBamF4KFxuICAgICAgICBgJHtjZG5VcmxPYmplY3RbJzAnXX0vc3RpY2tlcnMvJHtwYWNrSWR9L2Z1bGwvJHtzdGlja2VySWR9YCxcbiAgICAgICAge1xuICAgICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICAgIHByb3h5VXJsLFxuICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2J5dGVzJyxcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICByZWRhY3RVcmw6IHJlZGFjdFN0aWNrZXJVcmwsXG4gICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRTdGlja2VyUGFja01hbmlmZXN0KHBhY2tJZDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWlzUGFja0lkVmFsaWQocGFja0lkKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFN0aWNrZXJQYWNrTWFuaWZlc3Q6IHBhY2sgSUQgd2FzIGludmFsaWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBfb3V0ZXJBamF4KFxuICAgICAgICBgJHtjZG5VcmxPYmplY3RbJzAnXX0vc3RpY2tlcnMvJHtwYWNrSWR9L21hbmlmZXN0LnByb3RvYCxcbiAgICAgICAge1xuICAgICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICAgIHByb3h5VXJsLFxuICAgICAgICAgIHJlc3BvbnNlVHlwZTogJ2J5dGVzJyxcbiAgICAgICAgICB0eXBlOiAnR0VUJyxcbiAgICAgICAgICByZWRhY3RVcmw6IHJlZGFjdFN0aWNrZXJVcmwsXG4gICAgICAgICAgdmVyc2lvbixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0eXBlIFNlcnZlckF0dGFjaG1lbnRUeXBlID0ge1xuICAgICAga2V5OiBzdHJpbmc7XG4gICAgICBjcmVkZW50aWFsOiBzdHJpbmc7XG4gICAgICBhY2w6IHN0cmluZztcbiAgICAgIGFsZ29yaXRobTogc3RyaW5nO1xuICAgICAgZGF0ZTogc3RyaW5nO1xuICAgICAgcG9saWN5OiBzdHJpbmc7XG4gICAgICBzaWduYXR1cmU6IHN0cmluZztcbiAgICB9O1xuXG4gICAgZnVuY3Rpb24gbWFrZVB1dFBhcmFtcyhcbiAgICAgIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjcmVkZW50aWFsLFxuICAgICAgICBhY2wsXG4gICAgICAgIGFsZ29yaXRobSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgcG9saWN5LFxuICAgICAgICBzaWduYXR1cmUsXG4gICAgICB9OiBTZXJ2ZXJBdHRhY2htZW50VHlwZSxcbiAgICAgIGVuY3J5cHRlZEJpbjogVWludDhBcnJheVxuICAgICkge1xuICAgICAgLy8gTm90ZTogd2hlbiB1c2luZyB0aGUgYm91bmRhcnkgc3RyaW5nIGluIHRoZSBQT1NUIGJvZHksIGl0IG5lZWRzIHRvIGJlIHByZWZpeGVkIGJ5XG4gICAgICAvLyAgIGFuIGV4dHJhIC0tLCBhbmQgdGhlIGZpbmFsIGJvdW5kYXJ5IHN0cmluZyBhdCB0aGUgZW5kIGdldHMgYSAtLSBwcmVmaXggYW5kIGEgLS1cbiAgICAgIC8vICAgc3VmZml4LlxuICAgICAgY29uc3QgYm91bmRhcnlTdHJpbmcgPSBgLS0tLS0tLS0tLS0tLS0tLSR7Z2V0R3VpZCgpLnJlcGxhY2UoLy0vZywgJycpfWA7XG4gICAgICBjb25zdCBDUkxGID0gJ1xcclxcbic7XG4gICAgICBjb25zdCBnZXRTZWN0aW9uID0gKG5hbWU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT5cbiAgICAgICAgW1xuICAgICAgICAgIGAtLSR7Ym91bmRhcnlTdHJpbmd9YCxcbiAgICAgICAgICBgQ29udGVudC1EaXNwb3NpdGlvbjogZm9ybS1kYXRhOyBuYW1lPVwiJHtuYW1lfVwiJHtDUkxGfWAsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIF0uam9pbihDUkxGKTtcblxuICAgICAgY29uc3Qgc3RhcnQgPSBbXG4gICAgICAgIGdldFNlY3Rpb24oJ2tleScsIGtleSksXG4gICAgICAgIGdldFNlY3Rpb24oJ3gtYW16LWNyZWRlbnRpYWwnLCBjcmVkZW50aWFsKSxcbiAgICAgICAgZ2V0U2VjdGlvbignYWNsJywgYWNsKSxcbiAgICAgICAgZ2V0U2VjdGlvbigneC1hbXotYWxnb3JpdGhtJywgYWxnb3JpdGhtKSxcbiAgICAgICAgZ2V0U2VjdGlvbigneC1hbXotZGF0ZScsIGRhdGUpLFxuICAgICAgICBnZXRTZWN0aW9uKCdwb2xpY3knLCBwb2xpY3kpLFxuICAgICAgICBnZXRTZWN0aW9uKCd4LWFtei1zaWduYXR1cmUnLCBzaWduYXR1cmUpLFxuICAgICAgICBnZXRTZWN0aW9uKCdDb250ZW50LVR5cGUnLCAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyksXG4gICAgICAgIGAtLSR7Ym91bmRhcnlTdHJpbmd9YCxcbiAgICAgICAgJ0NvbnRlbnQtRGlzcG9zaXRpb246IGZvcm0tZGF0YTsgbmFtZT1cImZpbGVcIicsXG4gICAgICAgIGBDb250ZW50LVR5cGU6IGFwcGxpY2F0aW9uL29jdGV0LXN0cmVhbSR7Q1JMRn0ke0NSTEZ9YCxcbiAgICAgIF0uam9pbihDUkxGKTtcbiAgICAgIGNvbnN0IGVuZCA9IGAke0NSTEZ9LS0ke2JvdW5kYXJ5U3RyaW5nfS0tJHtDUkxGfWA7XG5cbiAgICAgIGNvbnN0IHN0YXJ0QnVmZmVyID0gQnVmZmVyLmZyb20oc3RhcnQsICd1dGY4Jyk7XG4gICAgICBjb25zdCBhdHRhY2htZW50QnVmZmVyID0gQnVmZmVyLmZyb20oZW5jcnlwdGVkQmluKTtcbiAgICAgIGNvbnN0IGVuZEJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGVuZCwgJ3V0ZjgnKTtcblxuICAgICAgY29uc3QgY29udGVudExlbmd0aCA9XG4gICAgICAgIHN0YXJ0QnVmZmVyLmxlbmd0aCArIGF0dGFjaG1lbnRCdWZmZXIubGVuZ3RoICsgZW5kQnVmZmVyLmxlbmd0aDtcbiAgICAgIGNvbnN0IGRhdGEgPSBCdWZmZXIuY29uY2F0KFxuICAgICAgICBbc3RhcnRCdWZmZXIsIGF0dGFjaG1lbnRCdWZmZXIsIGVuZEJ1ZmZlcl0sXG4gICAgICAgIGNvbnRlbnRMZW5ndGhcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBgbXVsdGlwYXJ0L2Zvcm0tZGF0YTsgYm91bmRhcnk9JHtib3VuZGFyeVN0cmluZ31gLFxuICAgICAgICBoZWFkZXJzOiB7XG4gICAgICAgICAgJ0NvbnRlbnQtTGVuZ3RoJzogY29udGVudExlbmd0aC50b1N0cmluZygpLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBwdXRTdGlja2VycyhcbiAgICAgIGVuY3J5cHRlZE1hbmlmZXN0OiBVaW50OEFycmF5LFxuICAgICAgZW5jcnlwdGVkU3RpY2tlcnM6IEFycmF5PFVpbnQ4QXJyYXk+LFxuICAgICAgb25Qcm9ncmVzcz86ICgpID0+IHZvaWRcbiAgICApIHtcbiAgICAgIC8vIEdldCBtYW5pZmVzdCBhbmQgc3RpY2tlciB1cGxvYWQgcGFyYW1ldGVyc1xuICAgICAgY29uc3QgeyBwYWNrSWQsIG1hbmlmZXN0LCBzdGlja2VycyB9ID0gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ2dldFN0aWNrZXJQYWNrVXBsb2FkJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgdXJsUGFyYW1ldGVyczogYC8ke2VuY3J5cHRlZFN0aWNrZXJzLmxlbmd0aH1gLFxuICAgICAgfSkpIGFzIHtcbiAgICAgICAgcGFja0lkOiBzdHJpbmc7XG4gICAgICAgIG1hbmlmZXN0OiBTZXJ2ZXJBdHRhY2htZW50VHlwZTtcbiAgICAgICAgc3RpY2tlcnM6IFJlYWRvbmx5QXJyYXk8U2VydmVyQXR0YWNobWVudFR5cGU+O1xuICAgICAgfTtcblxuICAgICAgLy8gVXBsb2FkIG1hbmlmZXN0XG4gICAgICBjb25zdCBtYW5pZmVzdFBhcmFtcyA9IG1ha2VQdXRQYXJhbXMobWFuaWZlc3QsIGVuY3J5cHRlZE1hbmlmZXN0KTtcbiAgICAgIC8vIFRoaXMgaXMgZ29pbmcgdG8gdGhlIENETiwgbm90IHRoZSBzZXJ2aWNlLCBzbyB3ZSB1c2UgX291dGVyQWpheFxuICAgICAgYXdhaXQgX291dGVyQWpheChgJHtjZG5VcmxPYmplY3RbJzAnXX0vYCwge1xuICAgICAgICAuLi5tYW5pZmVzdFBhcmFtcyxcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9KTtcblxuICAgICAgLy8gVXBsb2FkIHN0aWNrZXJzXG4gICAgICBjb25zdCBxdWV1ZSA9IG5ldyBQUXVldWUoe1xuICAgICAgICBjb25jdXJyZW5jeTogMyxcbiAgICAgICAgdGltZW91dDogMTAwMCAqIDYwICogMixcbiAgICAgICAgdGhyb3dPblRpbWVvdXQ6IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBzdGlja2Vycy5tYXAoYXN5bmMgKHN0aWNrZXI6IFNlcnZlckF0dGFjaG1lbnRUeXBlLCBpbmRleDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RpY2tlclBhcmFtcyA9IG1ha2VQdXRQYXJhbXMoXG4gICAgICAgICAgICBzdGlja2VyLFxuICAgICAgICAgICAgZW5jcnlwdGVkU3RpY2tlcnNbaW5kZXhdXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCBxdWV1ZS5hZGQoYXN5bmMgKCkgPT5cbiAgICAgICAgICAgIF9vdXRlckFqYXgoYCR7Y2RuVXJsT2JqZWN0WycwJ119L2AsIHtcbiAgICAgICAgICAgICAgLi4uc3RpY2tlclBhcmFtcyxcbiAgICAgICAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgICAgICAgIHByb3h5VXJsLFxuICAgICAgICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgICAgICAgIHZlcnNpb24sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICk7XG4gICAgICAgICAgaWYgKG9uUHJvZ3Jlc3MpIHtcbiAgICAgICAgICAgIG9uUHJvZ3Jlc3MoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG4gICAgICApO1xuXG4gICAgICAvLyBEb25lIVxuICAgICAgcmV0dXJuIHBhY2tJZDtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRBdHRhY2htZW50KGNkbktleTogc3RyaW5nLCBjZG5OdW1iZXI/OiBudW1iZXIpIHtcbiAgICAgIGNvbnN0IGFib3J0Q29udHJvbGxlciA9IG5ldyBBYm9ydENvbnRyb2xsZXIoKTtcblxuICAgICAgY29uc3QgY2RuVXJsID0gaXNOdW1iZXIoY2RuTnVtYmVyKVxuICAgICAgICA/IGNkblVybE9iamVjdFtjZG5OdW1iZXJdIHx8IGNkblVybE9iamVjdFsnMCddXG4gICAgICAgIDogY2RuVXJsT2JqZWN0WycwJ107XG4gICAgICAvLyBUaGlzIGlzIGdvaW5nIHRvIHRoZSBDRE4sIG5vdCB0aGUgc2VydmljZSwgc28gd2UgdXNlIF9vdXRlckFqYXhcbiAgICAgIGNvbnN0IHN0cmVhbSA9IGF3YWl0IF9vdXRlckFqYXgoYCR7Y2RuVXJsfS9hdHRhY2htZW50cy8ke2NkbktleX1gLCB7XG4gICAgICAgIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgICBwcm94eVVybCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnc3RyZWFtJyxcbiAgICAgICAgdGltZW91dDogMCxcbiAgICAgICAgdHlwZTogJ0dFVCcsXG4gICAgICAgIHJlZGFjdFVybDogX2NyZWF0ZVJlZGFjdG9yKGNkbktleSksXG4gICAgICAgIHZlcnNpb24sXG4gICAgICAgIGFib3J0U2lnbmFsOiBhYm9ydENvbnRyb2xsZXIuc2lnbmFsLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBnZXRTdHJlYW1XaXRoVGltZW91dChzdHJlYW0sIHtcbiAgICAgICAgbmFtZTogYGdldEF0dGFjaG1lbnQoJHtjZG5LZXl9KWAsXG4gICAgICAgIHRpbWVvdXQ6IEdFVF9BVFRBQ0hNRU5UX0NIVU5LX1RJTUVPVVQsXG4gICAgICAgIGFib3J0Q29udHJvbGxlcixcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHR5cGUgUHV0QXR0YWNobWVudFJlc3BvbnNlVHlwZSA9IFNlcnZlckF0dGFjaG1lbnRUeXBlICYge1xuICAgICAgYXR0YWNobWVudElkU3RyaW5nOiBzdHJpbmc7XG4gICAgfTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIHB1dEF0dGFjaG1lbnQoZW5jcnlwdGVkQmluOiBVaW50OEFycmF5KSB7XG4gICAgICBjb25zdCByZXNwb25zZSA9IChhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdhdHRhY2htZW50SWQnLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2pzb24nLFxuICAgICAgfSkpIGFzIFB1dEF0dGFjaG1lbnRSZXNwb25zZVR5cGU7XG5cbiAgICAgIGNvbnN0IHsgYXR0YWNobWVudElkU3RyaW5nIH0gPSByZXNwb25zZTtcblxuICAgICAgY29uc3QgcGFyYW1zID0gbWFrZVB1dFBhcmFtcyhyZXNwb25zZSwgZW5jcnlwdGVkQmluKTtcblxuICAgICAgLy8gVGhpcyBpcyBnb2luZyB0byB0aGUgQ0ROLCBub3QgdGhlIHNlcnZpY2UsIHNvIHdlIHVzZSBfb3V0ZXJBamF4XG4gICAgICBhd2FpdCBfb3V0ZXJBamF4KGAke2NkblVybE9iamVjdFsnMCddfS9hdHRhY2htZW50cy9gLCB7XG4gICAgICAgIC4uLnBhcmFtcyxcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGF0dGFjaG1lbnRJZFN0cmluZztcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBnZXRIZWFkZXJQYWRkaW5nKCkge1xuICAgICAgY29uc3QgbWF4ID0gZ2V0UmFuZG9tVmFsdWUoMSwgNjQpO1xuICAgICAgbGV0IGNoYXJhY3RlcnMgPSAnJztcblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgICAgICBjaGFyYWN0ZXJzICs9IFN0cmluZy5mcm9tQ2hhckNvZGUoZ2V0UmFuZG9tVmFsdWUoNjUsIDEyMikpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gY2hhcmFjdGVycztcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBmZXRjaExpbmtQcmV2aWV3TWV0YWRhdGEoXG4gICAgICBocmVmOiBzdHJpbmcsXG4gICAgICBhYm9ydFNpZ25hbDogQWJvcnRTaWduYWxcbiAgICApIHtcbiAgICAgIHJldHVybiBsaW5rUHJldmlld0ZldGNoLmZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICAgICAgZmV0Y2hGb3JMaW5rUHJldmlld3MsXG4gICAgICAgIGhyZWYsXG4gICAgICAgIGFib3J0U2lnbmFsXG4gICAgICApO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGZldGNoTGlua1ByZXZpZXdJbWFnZShcbiAgICAgIGhyZWY6IHN0cmluZyxcbiAgICAgIGFib3J0U2lnbmFsOiBBYm9ydFNpZ25hbFxuICAgICkge1xuICAgICAgcmV0dXJuIGxpbmtQcmV2aWV3RmV0Y2guZmV0Y2hMaW5rUHJldmlld0ltYWdlKFxuICAgICAgICBmZXRjaEZvckxpbmtQcmV2aWV3cyxcbiAgICAgICAgaHJlZixcbiAgICAgICAgYWJvcnRTaWduYWxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gbWFrZVByb3hpZWRSZXF1ZXN0KFxuICAgICAgdGFyZ2V0VXJsOiBzdHJpbmcsXG4gICAgICBvcHRpb25zOiBQcm94aWVkUmVxdWVzdE9wdGlvbnNUeXBlID0ge31cbiAgICApOiBQcm9taXNlPE1ha2VQcm94aWVkUmVxdWVzdFJlc3VsdFR5cGU+IHtcbiAgICAgIGNvbnN0IHsgcmV0dXJuVWludDhBcnJheSwgc3RhcnQsIGVuZCB9ID0gb3B0aW9ucztcbiAgICAgIGNvbnN0IGhlYWRlcnM6IEhlYWRlckxpc3RUeXBlID0ge1xuICAgICAgICAnWC1TaWduYWxQYWRkaW5nJzogZ2V0SGVhZGVyUGFkZGluZygpLFxuICAgICAgfTtcblxuICAgICAgaWYgKGlzLm51bWJlcihzdGFydCkgJiYgaXMubnVtYmVyKGVuZCkpIHtcbiAgICAgICAgaGVhZGVycy5SYW5nZSA9IGBieXRlcz0ke3N0YXJ0fS0ke2VuZH1gO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBfb3V0ZXJBamF4KHRhcmdldFVybCwge1xuICAgICAgICByZXNwb25zZVR5cGU6IHJldHVyblVpbnQ4QXJyYXkgPyAnYnl0ZXN3aXRoZGV0YWlscycgOiB1bmRlZmluZWQsXG4gICAgICAgIHByb3h5VXJsOiBjb250ZW50UHJveHlVcmwsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICByZWRpcmVjdDogJ2ZvbGxvdycsXG4gICAgICAgIHJlZGFjdFVybDogKCkgPT4gJ1tSRURBQ1RFRF9VUkxdJyxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgdmVyc2lvbixcbiAgICAgIH0pO1xuXG4gICAgICBpZiAoIXJldHVyblVpbnQ4QXJyYXkpIHtcbiAgICAgICAgcmV0dXJuIHJlc3VsdCBhcyBVaW50OEFycmF5O1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHJlc3BvbnNlIH0gPSByZXN1bHQgYXMgQnl0ZXNXaXRoRGV0YWlsc1R5cGU7XG4gICAgICBpZiAoIXJlc3BvbnNlLmhlYWRlcnMgfHwgIXJlc3BvbnNlLmhlYWRlcnMuZ2V0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWFrZVByb3hpZWRSZXF1ZXN0OiBQcm9ibGVtIHJldHJpZXZpbmcgaGVhZGVyIHZhbHVlJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJhbmdlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ2NvbnRlbnQtcmFuZ2UnKTtcbiAgICAgIGNvbnN0IG1hdGNoID0gUEFSU0VfUkFOR0VfSEVBREVSLmV4ZWMocmFuZ2UgfHwgJycpO1xuXG4gICAgICBpZiAoIW1hdGNoIHx8ICFtYXRjaFsxXSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYG1ha2VQcm94aWVkUmVxdWVzdDogVW5hYmxlIHRvIHBhcnNlIHRvdGFsIHNpemUgZnJvbSAke3JhbmdlfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdG90YWxTaXplID0gcGFyc2VJbnQobWF0Y2hbMV0sIDEwKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdG90YWxTaXplLFxuICAgICAgICByZXN1bHQ6IHJlc3VsdCBhcyBCeXRlc1dpdGhEZXRhaWxzVHlwZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gbWFrZVNmdVJlcXVlc3QoXG4gICAgICB0YXJnZXRVcmw6IHN0cmluZyxcbiAgICAgIHR5cGU6IEhUVFBDb2RlVHlwZSxcbiAgICAgIGhlYWRlcnM6IEhlYWRlckxpc3RUeXBlLFxuICAgICAgYm9keTogVWludDhBcnJheSB8IHVuZGVmaW5lZFxuICAgICk6IFByb21pc2U8Qnl0ZXNXaXRoRGV0YWlsc1R5cGU+IHtcbiAgICAgIHJldHVybiBfb3V0ZXJBamF4KHRhcmdldFVybCwge1xuICAgICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eSxcbiAgICAgICAgZGF0YTogYm9keSxcbiAgICAgICAgaGVhZGVycyxcbiAgICAgICAgcHJveHlVcmwsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2J5dGVzd2l0aGRldGFpbHMnLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICB0eXBlLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gR3JvdXBzXG5cbiAgICBmdW5jdGlvbiBnZW5lcmF0ZUdyb3VwQXV0aChcbiAgICAgIGdyb3VwUHVibGljUGFyYW1zSGV4OiBzdHJpbmcsXG4gICAgICBhdXRoQ3JlZGVudGlhbFByZXNlbnRhdGlvbkhleDogc3RyaW5nXG4gICAgKSB7XG4gICAgICByZXR1cm4gQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIEJ5dGVzLmZyb21TdHJpbmcoXG4gICAgICAgICAgYCR7Z3JvdXBQdWJsaWNQYXJhbXNIZXh9OiR7YXV0aENyZWRlbnRpYWxQcmVzZW50YXRpb25IZXh9YFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHR5cGUgQ3JlZGVudGlhbFJlc3BvbnNlVHlwZSA9IHtcbiAgICAgIGNyZWRlbnRpYWxzOiBBcnJheTxHcm91cENyZWRlbnRpYWxUeXBlPjtcbiAgICB9O1xuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0R3JvdXBDcmVkZW50aWFscyhcbiAgICAgIHN0YXJ0RGF5OiBudW1iZXIsXG4gICAgICBlbmREYXk6IG51bWJlcixcbiAgICAgIHV1aWRLaW5kOiBVVUlES2luZFxuICAgICk6IFByb21pc2U8QXJyYXk8R3JvdXBDcmVkZW50aWFsVHlwZT4+IHtcbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gKGF3YWl0IF9hamF4KHtcbiAgICAgICAgY2FsbDogJ2dldEdyb3VwQ3JlZGVudGlhbHMnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBgLyR7c3RhcnREYXl9LyR7ZW5kRGF5fT8ke3V1aWRLaW5kVG9RdWVyeSh1dWlkS2luZCl9YCxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdqc29uJyxcbiAgICAgIH0pKSBhcyBDcmVkZW50aWFsUmVzcG9uc2VUeXBlO1xuXG4gICAgICByZXR1cm4gcmVzcG9uc2UuY3JlZGVudGlhbHM7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0R3JvdXBFeHRlcm5hbENyZWRlbnRpYWwoXG4gICAgICBvcHRpb25zOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICAgICk6IFByb21pc2U8UHJvdG8uR3JvdXBFeHRlcm5hbENyZWRlbnRpYWw+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBvcHRpb25zLmdyb3VwUHVibGljUGFyYW1zSGV4LFxuICAgICAgICBvcHRpb25zLmF1dGhDcmVkZW50aWFsUHJlc2VudGF0aW9uSGV4XG4gICAgICApO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9hamF4KHtcbiAgICAgICAgYmFzaWNBdXRoLFxuICAgICAgICBjYWxsOiAnZ3JvdXBUb2tlbicsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXByb3RvYnVmJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYnl0ZXMnLFxuICAgICAgICBob3N0OiBzdG9yYWdlVXJsLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBQcm90by5Hcm91cEV4dGVybmFsQ3JlZGVudGlhbC5kZWNvZGUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIHZlcmlmeUF0dHJpYnV0ZXMoYXR0cmlidXRlczogUHJvdG8uSUF2YXRhclVwbG9hZEF0dHJpYnV0ZXMpIHtcbiAgICAgIGNvbnN0IHsga2V5LCBjcmVkZW50aWFsLCBhY2wsIGFsZ29yaXRobSwgZGF0ZSwgcG9saWN5LCBzaWduYXR1cmUgfSA9XG4gICAgICAgIGF0dHJpYnV0ZXM7XG5cbiAgICAgIGlmIChcbiAgICAgICAgIWtleSB8fFxuICAgICAgICAhY3JlZGVudGlhbCB8fFxuICAgICAgICAhYWNsIHx8XG4gICAgICAgICFhbGdvcml0aG0gfHxcbiAgICAgICAgIWRhdGUgfHxcbiAgICAgICAgIXBvbGljeSB8fFxuICAgICAgICAhc2lnbmF0dXJlXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICd2ZXJpZnlBdHRyaWJ1dGVzOiBNaXNzaW5nIHZhbHVlIGZyb20gQXZhdGFyVXBsb2FkQXR0cmlidXRlcydcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAga2V5LFxuICAgICAgICBjcmVkZW50aWFsLFxuICAgICAgICBhY2wsXG4gICAgICAgIGFsZ29yaXRobSxcbiAgICAgICAgZGF0ZSxcbiAgICAgICAgcG9saWN5LFxuICAgICAgICBzaWduYXR1cmUsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIHVwbG9hZEF2YXRhcihcbiAgICAgIHVwbG9hZEF2YXRhclJlcXVlc3RIZWFkZXJzOiBVcGxvYWRBdmF0YXJIZWFkZXJzVHlwZSxcbiAgICAgIGF2YXRhckRhdGE6IFVpbnQ4QXJyYXlcbiAgICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgICAgY29uc3QgdmVyaWZpZWQgPSB2ZXJpZnlBdHRyaWJ1dGVzKHVwbG9hZEF2YXRhclJlcXVlc3RIZWFkZXJzKTtcbiAgICAgIGNvbnN0IHsga2V5IH0gPSB2ZXJpZmllZDtcblxuICAgICAgY29uc3QgbWFuaWZlc3RQYXJhbXMgPSBtYWtlUHV0UGFyYW1zKHZlcmlmaWVkLCBhdmF0YXJEYXRhKTtcblxuICAgICAgYXdhaXQgX291dGVyQWpheChgJHtjZG5VcmxPYmplY3RbJzAnXX0vYCwge1xuICAgICAgICAuLi5tYW5pZmVzdFBhcmFtcyxcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiB1cGxvYWRHcm91cEF2YXRhcihcbiAgICAgIGF2YXRhckRhdGE6IFVpbnQ4QXJyYXksXG4gICAgICBvcHRpb25zOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICAgICk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgICBjb25zdCBiYXNpY0F1dGggPSBnZW5lcmF0ZUdyb3VwQXV0aChcbiAgICAgICAgb3B0aW9ucy5ncm91cFB1YmxpY1BhcmFtc0hleCxcbiAgICAgICAgb3B0aW9ucy5hdXRoQ3JlZGVudGlhbFByZXNlbnRhdGlvbkhleFxuICAgICAgKTtcblxuICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBfYWpheCh7XG4gICAgICAgIGJhc2ljQXV0aCxcbiAgICAgICAgY2FsbDogJ2dldEdyb3VwQXZhdGFyVXBsb2FkJyxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIGhvc3Q6IHN0b3JhZ2VVcmwsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBQcm90by5BdmF0YXJVcGxvYWRBdHRyaWJ1dGVzLmRlY29kZShyZXNwb25zZSk7XG5cbiAgICAgIGNvbnN0IHZlcmlmaWVkID0gdmVyaWZ5QXR0cmlidXRlcyhhdHRyaWJ1dGVzKTtcbiAgICAgIGNvbnN0IHsga2V5IH0gPSB2ZXJpZmllZDtcblxuICAgICAgY29uc3QgbWFuaWZlc3RQYXJhbXMgPSBtYWtlUHV0UGFyYW1zKHZlcmlmaWVkLCBhdmF0YXJEYXRhKTtcblxuICAgICAgYXdhaXQgX291dGVyQWpheChgJHtjZG5VcmxPYmplY3RbJzAnXX0vYCwge1xuICAgICAgICAuLi5tYW5pZmVzdFBhcmFtcyxcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICB0aW1lb3V0OiAwLFxuICAgICAgICB0eXBlOiAnUE9TVCcsXG4gICAgICAgIHZlcnNpb24sXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIGtleTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRHcm91cEF2YXRhcihrZXk6IHN0cmluZyk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgICAgcmV0dXJuIF9vdXRlckFqYXgoYCR7Y2RuVXJsT2JqZWN0WycwJ119LyR7a2V5fWAsIHtcbiAgICAgICAgY2VydGlmaWNhdGVBdXRob3JpdHksXG4gICAgICAgIHByb3h5VXJsLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICAgIHRpbWVvdXQ6IDAsXG4gICAgICAgIHR5cGU6ICdHRVQnLFxuICAgICAgICB2ZXJzaW9uLFxuICAgICAgICByZWRhY3RVcmw6IF9jcmVhdGVSZWRhY3RvcihrZXkpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gY3JlYXRlR3JvdXAoXG4gICAgICBncm91cDogUHJvdG8uSUdyb3VwLFxuICAgICAgb3B0aW9uczogR3JvdXBDcmVkZW50aWFsc1R5cGVcbiAgICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBvcHRpb25zLmdyb3VwUHVibGljUGFyYW1zSGV4LFxuICAgICAgICBvcHRpb25zLmF1dGhDcmVkZW50aWFsUHJlc2VudGF0aW9uSGV4XG4gICAgICApO1xuICAgICAgY29uc3QgZGF0YSA9IFByb3RvLkdyb3VwLmVuY29kZShncm91cCkuZmluaXNoKCk7XG5cbiAgICAgIGF3YWl0IF9hamF4KHtcbiAgICAgICAgYmFzaWNBdXRoLFxuICAgICAgICBjYWxsOiAnZ3JvdXBzJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXByb3RvYnVmJyxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgaG9zdDogc3RvcmFnZVVybCxcbiAgICAgICAgaHR0cFR5cGU6ICdQVVQnLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0R3JvdXAoXG4gICAgICBvcHRpb25zOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICAgICk6IFByb21pc2U8UHJvdG8uR3JvdXA+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBvcHRpb25zLmdyb3VwUHVibGljUGFyYW1zSGV4LFxuICAgICAgICBvcHRpb25zLmF1dGhDcmVkZW50aWFsUHJlc2VudGF0aW9uSGV4XG4gICAgICApO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9hamF4KHtcbiAgICAgICAgYmFzaWNBdXRoLFxuICAgICAgICBjYWxsOiAnZ3JvdXBzJyxcbiAgICAgICAgY29udGVudFR5cGU6ICdhcHBsaWNhdGlvbi94LXByb3RvYnVmJyxcbiAgICAgICAgaG9zdDogc3RvcmFnZVVybCxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICByZXNwb25zZVR5cGU6ICdieXRlcycsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFByb3RvLkdyb3VwLmRlY29kZShyZXNwb25zZSk7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0R3JvdXBGcm9tTGluayhcbiAgICAgIGludml0ZUxpbmtQYXNzd29yZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgICAgYXV0aDogR3JvdXBDcmVkZW50aWFsc1R5cGVcbiAgICApOiBQcm9taXNlPFByb3RvLkdyb3VwSm9pbkluZm8+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBhdXRoLmdyb3VwUHVibGljUGFyYW1zSGV4LFxuICAgICAgICBhdXRoLmF1dGhDcmVkZW50aWFsUHJlc2VudGF0aW9uSGV4XG4gICAgICApO1xuICAgICAgY29uc3Qgc2FmZUludml0ZUxpbmtQYXNzd29yZCA9IGludml0ZUxpbmtQYXNzd29yZFxuICAgICAgICA/IHRvV2ViU2FmZUJhc2U2NChpbnZpdGVMaW5rUGFzc3dvcmQpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICBjb25zdCByZXNwb25zZSA9IGF3YWl0IF9hamF4KHtcbiAgICAgICAgYmFzaWNBdXRoLFxuICAgICAgICBjYWxsOiAnZ3JvdXBzVmlhTGluaycsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC1wcm90b2J1ZicsXG4gICAgICAgIGhvc3Q6IHN0b3JhZ2VVcmwsXG4gICAgICAgIGh0dHBUeXBlOiAnR0VUJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYnl0ZXMnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBzYWZlSW52aXRlTGlua1Bhc3N3b3JkXG4gICAgICAgICAgPyBgJHtzYWZlSW52aXRlTGlua1Bhc3N3b3JkfWBcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgcmVkYWN0VXJsOiBfY3JlYXRlUmVkYWN0b3Ioc2FmZUludml0ZUxpbmtQYXNzd29yZCksXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIFByb3RvLkdyb3VwSm9pbkluZm8uZGVjb2RlKHJlc3BvbnNlKTtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBtb2RpZnlHcm91cChcbiAgICAgIGNoYW5nZXM6IFByb3RvLkdyb3VwQ2hhbmdlLklBY3Rpb25zLFxuICAgICAgb3B0aW9uczogR3JvdXBDcmVkZW50aWFsc1R5cGUsXG4gICAgICBpbnZpdGVMaW5rQmFzZTY0Pzogc3RyaW5nXG4gICAgKTogUHJvbWlzZTxQcm90by5JR3JvdXBDaGFuZ2U+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBvcHRpb25zLmdyb3VwUHVibGljUGFyYW1zSGV4LFxuICAgICAgICBvcHRpb25zLmF1dGhDcmVkZW50aWFsUHJlc2VudGF0aW9uSGV4XG4gICAgICApO1xuICAgICAgY29uc3QgZGF0YSA9IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuZW5jb2RlKGNoYW5nZXMpLmZpbmlzaCgpO1xuICAgICAgY29uc3Qgc2FmZUludml0ZUxpbmtQYXNzd29yZCA9IGludml0ZUxpbmtCYXNlNjRcbiAgICAgICAgPyB0b1dlYlNhZmVCYXNlNjQoaW52aXRlTGlua0Jhc2U2NClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgX2FqYXgoe1xuICAgICAgICBiYXNpY0F1dGgsXG4gICAgICAgIGNhbGw6ICdncm91cHMnLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtcHJvdG9idWYnLFxuICAgICAgICBkYXRhLFxuICAgICAgICBob3N0OiBzdG9yYWdlVXJsLFxuICAgICAgICBodHRwVHlwZTogJ1BBVENIJyxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnYnl0ZXMnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBzYWZlSW52aXRlTGlua1Bhc3N3b3JkXG4gICAgICAgICAgPyBgP2ludml0ZUxpbmtQYXNzd29yZD0ke3NhZmVJbnZpdGVMaW5rUGFzc3dvcmR9YFxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICByZWRhY3RVcmw6IHNhZmVJbnZpdGVMaW5rUGFzc3dvcmRcbiAgICAgICAgICA/IF9jcmVhdGVSZWRhY3RvcihzYWZlSW52aXRlTGlua1Bhc3N3b3JkKVxuICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBQcm90by5Hcm91cENoYW5nZS5kZWNvZGUocmVzcG9uc2UpO1xuICAgIH1cblxuICAgIGFzeW5jIGZ1bmN0aW9uIGdldEdyb3VwTG9nKFxuICAgICAgb3B0aW9uczogR2V0R3JvdXBMb2dPcHRpb25zVHlwZSxcbiAgICAgIGNyZWRlbnRpYWxzOiBHcm91cENyZWRlbnRpYWxzVHlwZVxuICAgICk6IFByb21pc2U8R3JvdXBMb2dSZXNwb25zZVR5cGU+IHtcbiAgICAgIGNvbnN0IGJhc2ljQXV0aCA9IGdlbmVyYXRlR3JvdXBBdXRoKFxuICAgICAgICBjcmVkZW50aWFscy5ncm91cFB1YmxpY1BhcmFtc0hleCxcbiAgICAgICAgY3JlZGVudGlhbHMuYXV0aENyZWRlbnRpYWxQcmVzZW50YXRpb25IZXhcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgc3RhcnRWZXJzaW9uLFxuICAgICAgICBpbmNsdWRlRmlyc3RTdGF0ZSxcbiAgICAgICAgaW5jbHVkZUxhc3RTdGF0ZSxcbiAgICAgICAgbWF4U3VwcG9ydGVkQ2hhbmdlRXBvY2gsXG4gICAgICB9ID0gb3B0aW9ucztcblxuICAgICAgLy8gSWYgd2UgZG9uJ3Qga25vdyBzdGFydGluZyByZXZpc2lvbiAtIGZldGNoIGl0IGZyb20gdGhlIHNlcnZlclxuICAgICAgaWYgKHN0YXJ0VmVyc2lvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIGNvbnN0IHsgZGF0YTogam9pbmVkRGF0YSB9ID0gYXdhaXQgX2FqYXgoe1xuICAgICAgICAgIGJhc2ljQXV0aCxcbiAgICAgICAgICBjYWxsOiAnZ3JvdXBKb2luZWRBdFZlcnNpb24nLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24veC1wcm90b2J1ZicsXG4gICAgICAgICAgaG9zdDogc3RvcmFnZVVybCxcbiAgICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgICAgcmVzcG9uc2VUeXBlOiAnYnl0ZXN3aXRoZGV0YWlscycsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHsgam9pbmVkQXRWZXJzaW9uIH0gPSBQcm90by5NZW1iZXIuZGVjb2RlKGpvaW5lZERhdGEpO1xuXG4gICAgICAgIHJldHVybiBnZXRHcm91cExvZyhcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5vcHRpb25zLFxuICAgICAgICAgICAgc3RhcnRWZXJzaW9uOiBqb2luZWRBdFZlcnNpb24sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBjcmVkZW50aWFsc1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3aXRoRGV0YWlscyA9IGF3YWl0IF9hamF4KHtcbiAgICAgICAgYmFzaWNBdXRoLFxuICAgICAgICBjYWxsOiAnZ3JvdXBMb2cnLFxuICAgICAgICBjb250ZW50VHlwZTogJ2FwcGxpY2F0aW9uL3gtcHJvdG9idWYnLFxuICAgICAgICBob3N0OiBzdG9yYWdlVXJsLFxuICAgICAgICBodHRwVHlwZTogJ0dFVCcsXG4gICAgICAgIHJlc3BvbnNlVHlwZTogJ2J5dGVzd2l0aGRldGFpbHMnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOlxuICAgICAgICAgIGAvJHtzdGFydFZlcnNpb259P2AgK1xuICAgICAgICAgIGBpbmNsdWRlRmlyc3RTdGF0ZT0ke0Jvb2xlYW4oaW5jbHVkZUZpcnN0U3RhdGUpfSZgICtcbiAgICAgICAgICBgaW5jbHVkZUxhc3RTdGF0ZT0ke0Jvb2xlYW4oaW5jbHVkZUxhc3RTdGF0ZSl9JmAgK1xuICAgICAgICAgIGBtYXhTdXBwb3J0ZWRDaGFuZ2VFcG9jaD0ke051bWJlcihtYXhTdXBwb3J0ZWRDaGFuZ2VFcG9jaCl9YCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgeyBkYXRhLCByZXNwb25zZSB9ID0gd2l0aERldGFpbHM7XG4gICAgICBjb25zdCBjaGFuZ2VzID0gUHJvdG8uR3JvdXBDaGFuZ2VzLmRlY29kZShkYXRhKTtcblxuICAgICAgaWYgKHJlc3BvbnNlICYmIHJlc3BvbnNlLnN0YXR1cyA9PT0gMjA2KSB7XG4gICAgICAgIGNvbnN0IHJhbmdlID0gcmVzcG9uc2UuaGVhZGVycy5nZXQoJ0NvbnRlbnQtUmFuZ2UnKTtcbiAgICAgICAgY29uc3QgbWF0Y2ggPSBQQVJTRV9HUk9VUF9MT0dfUkFOR0VfSEVBREVSLmV4ZWMocmFuZ2UgfHwgJycpO1xuXG4gICAgICAgIGNvbnN0IHN0YXJ0ID0gbWF0Y2ggPyBwYXJzZUludChtYXRjaFsxXSwgMTApIDogdW5kZWZpbmVkO1xuICAgICAgICBjb25zdCBlbmQgPSBtYXRjaCA/IHBhcnNlSW50KG1hdGNoWzJdLCAxMCkgOiB1bmRlZmluZWQ7XG4gICAgICAgIGNvbnN0IGN1cnJlbnRSZXZpc2lvbiA9IG1hdGNoID8gcGFyc2VJbnQobWF0Y2hbM10sIDEwKSA6IHVuZGVmaW5lZDtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgbWF0Y2ggJiZcbiAgICAgICAgICBpcy5udW1iZXIoc3RhcnQpICYmXG4gICAgICAgICAgaXMubnVtYmVyKGVuZCkgJiZcbiAgICAgICAgICBpcy5udW1iZXIoY3VycmVudFJldmlzaW9uKVxuICAgICAgICApIHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY2hhbmdlcyxcbiAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgZW5kLFxuICAgICAgICAgICAgY3VycmVudFJldmlzaW9uLFxuICAgICAgICAgIH07XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgY2hhbmdlcyxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0SGFzU3Vic2NyaXB0aW9uKFxuICAgICAgc3Vic2NyaWJlcklkOiBVaW50OEFycmF5XG4gICAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgICBjb25zdCBmb3JtYXR0ZWRJZCA9IHRvV2ViU2FmZUJhc2U2NChCeXRlcy50b0Jhc2U2NChzdWJzY3JpYmVySWQpKTtcbiAgICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBfYWpheCh7XG4gICAgICAgIGNhbGw6ICdzdWJzY3JpcHRpb25zJyxcbiAgICAgICAgaHR0cFR5cGU6ICdHRVQnLFxuICAgICAgICB1cmxQYXJhbWV0ZXJzOiBgLyR7Zm9ybWF0dGVkSWR9YCxcbiAgICAgICAgcmVzcG9uc2VUeXBlOiAnanNvbicsXG4gICAgICAgIHVuYXV0aGVudGljYXRlZDogdHJ1ZSxcbiAgICAgICAgYWNjZXNzS2V5OiB1bmRlZmluZWQsXG4gICAgICAgIHJlZGFjdFVybDogX2NyZWF0ZVJlZGFjdG9yKGZvcm1hdHRlZElkKSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gKFxuICAgICAgICBpc1JlY29yZChkYXRhKSAmJlxuICAgICAgICBpc1JlY29yZChkYXRhLnN1YnNjcmlwdGlvbikgJiZcbiAgICAgICAgQm9vbGVhbihkYXRhLnN1YnNjcmlwdGlvbi5hY3RpdmUpXG4gICAgICApO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGdldFByb3Zpc2lvbmluZ1Jlc291cmNlKFxuICAgICAgaGFuZGxlcjogSVJlcXVlc3RIYW5kbGVyXG4gICAgKTogUHJvbWlzZTxXZWJTb2NrZXRSZXNvdXJjZT4ge1xuICAgICAgcmV0dXJuIHNvY2tldE1hbmFnZXIuZ2V0UHJvdmlzaW9uaW5nUmVzb3VyY2UoaGFuZGxlcik7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gZ2V0VXVpZHNGb3JFMTY0cyhcbiAgICAgIGUxNjRzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbiAgICApOiBQcm9taXNlPERpY3Rpb25hcnk8VVVJRFN0cmluZ1R5cGUgfCBudWxsPj4ge1xuICAgICAgY29uc3QgbWFwID0gYXdhaXQgY2RzLnJlcXVlc3Qoe1xuICAgICAgICBlMTY0cyxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCByZXN1bHQ6IERpY3Rpb25hcnk8VVVJRFN0cmluZ1R5cGUgfCBudWxsPiA9IHt9O1xuICAgICAgZm9yIChjb25zdCBba2V5LCB2YWx1ZV0gb2YgbWFwKSB7XG4gICAgICAgIHJlc3VsdFtrZXldID0gdmFsdWUucG5pID8/IHZhbHVlLmFjaSA/PyBudWxsO1xuICAgICAgfVxuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9XG5cbiAgICBhc3luYyBmdW5jdGlvbiBnZXRVdWlkc0ZvckUxNjRzVjIoe1xuICAgICAgZTE2NHMsXG4gICAgICBhY2lzLFxuICAgICAgYWNjZXNzS2V5cyxcbiAgICB9OiBHZXRVdWlkc0ZvckUxNjRzVjJPcHRpb25zVHlwZSk6IFByb21pc2U8Q0RTUmVzcG9uc2VUeXBlPiB7XG4gICAgICByZXR1cm4gY2RzLnJlcXVlc3Qoe1xuICAgICAgICBlMTY0cyxcbiAgICAgICAgYWNpcyxcbiAgICAgICAgYWNjZXNzS2V5cyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBLDhCQUE0QjtBQUU1Qix3QkFBa0I7QUFDbEIseUJBQXVCO0FBQ3ZCLG1CQUFzQjtBQUV0QixvQkFBdUM7QUFDdkMsZ0JBQWU7QUFDZixxQkFBbUI7QUFDbkIsa0JBQThCO0FBQzlCLGlCQUFrQjtBQUdsQixvQkFBcUM7QUFDckMsc0JBQXlCO0FBQ3pCLGdCQUEyQjtBQUUzQiw0QkFBK0I7QUFDL0IsMEJBQTZCO0FBQzdCLGtDQUFxQztBQUNyQywyQkFBMkM7QUFDM0MsMkJBQWdDO0FBQ2hDLDBCQUE2QjtBQUU3QixvQkFBNEI7QUFDNUIsc0JBQTRDO0FBRTVDLGtCQUFzQztBQUN0QyxZQUF1QjtBQUN2QixvQkFBK0I7QUFDL0IsdUJBQWtDO0FBQ2xDLHNDQUF5QztBQUV6QywyQkFBOEI7QUFHOUIsdUJBQTBCO0FBRTFCLGtCQUFxQjtBQUNyQixrQkFBcUI7QUFFckIsc0JBQXVDO0FBRXZDLG9CQUEwQjtBQVExQixtQkFBaUQ7QUFDakQsVUFBcUI7QUFDckIsaUJBQThCO0FBSzlCLE1BQU0sUUFBUTtBQUVkLDRCQUNLLFdBQ1E7QUFJWCxRQUFNLG1CQUFtQixVQUFVLE9BQU8sT0FBTztBQUNqRCxTQUFPLFVBQ0wsaUJBQWlCLE9BQU8sQ0FBQyxRQUFnQixvQkFBNEI7QUFDbkUsVUFBTSxV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
