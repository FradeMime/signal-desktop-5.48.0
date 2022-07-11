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
var SocketManager_exports = {};
__export(SocketManager_exports, {
  SocketManager: () => SocketManager
});
module.exports = __toCommonJS(SocketManager_exports);
var import_url = __toESM(require("url"));
var import_proxy_agent = __toESM(require("proxy-agent"));
var import_node_fetch = require("node-fetch");
var import_querystring = __toESM(require("querystring"));
var import_events = __toESM(require("events"));
var import_assert = require("../util/assert");
var import_BackOff = require("../util/BackOff");
var durations = __toESM(require("../util/durations"));
var import_sleep = require("../util/sleep");
var import_SocketStatus = require("../types/SocketStatus");
var Errors = __toESM(require("../types/errors"));
var Bytes = __toESM(require("../Bytes"));
var log = __toESM(require("../logging/log"));
var import_WebsocketResources = __toESM(require("./WebsocketResources"));
var import_Errors = require("./Errors");
var import_WebSocket = require("./WebSocket");
const FIVE_MINUTES = 5 * durations.MINUTE;
const JITTER = 5 * durations.SECOND;
class SocketManager extends import_events.default {
  constructor(options) {
    super();
    this.options = options;
    this.backOff = new import_BackOff.BackOff(import_BackOff.FIBONACCI_TIMEOUTS, {
      jitter: JITTER
    });
    this.status = import_SocketStatus.SocketStatus.CLOSED;
    this.requestHandlers = /* @__PURE__ */ new Set();
    this.incomingRequestQueue = new Array();
    this.isOffline = false;
    if (options.proxyUrl) {
      this.proxyAgent = new import_proxy_agent.default(options.proxyUrl);
    }
  }
  getStatus() {
    return this.status;
  }
  async authenticate(credentials) {
    if (this.isOffline) {
      throw new import_Errors.HTTPError("SocketManager offline", {
        code: 0,
        headers: {},
        stack: new Error().stack
      });
    }
    const { username, password } = credentials;
    if (!username && !password) {
      log.warn("SocketManager authenticate was called without credentials");
      return;
    }
    if (this.credentials && this.credentials.username === username && this.credentials.password === password && this.authenticated) {
      try {
        await this.authenticated.getResult();
      } catch (error) {
        log.warn(`SocketManager: failed to wait for existing authenticated socket  due to error: ${Errors.toLogFormat(error)}`);
      }
      return;
    }
    this.credentials = credentials;
    log.info("SocketManager: connecting authenticated socket");
    this.setStatus(import_SocketStatus.SocketStatus.CONNECTING);
    const process = this.connectResource({
      name: "authenticated",
      path: "/v1/websocket/",
      query: { login: username, password },
      resourceOptions: {
        keepalive: { path: "/v1/keepalive" },
        handleRequest: (req) => {
          this.queueOrHandleRequest(req);
        }
      }
    });
    this.authenticated?.abort();
    this.authenticated = process;
    const reconnect = /* @__PURE__ */ __name(async () => {
      const timeout = this.backOff.getAndIncrement();
      log.info(`SocketManager: reconnecting authenticated socket after ${timeout}ms`);
      await (0, import_sleep.sleep)(timeout);
      if (this.isOffline) {
        log.info("SocketManager: cancelled reconnect because we are offline");
        return;
      }
      if (this.authenticated) {
        log.info("SocketManager: authenticated socket already reconnected");
        return;
      }
      (0, import_assert.strictAssert)(this.credentials !== void 0, "Missing credentials");
      try {
        await this.authenticate(this.credentials);
      } catch (error) {
        log.info(`SocketManager: authenticated socket failed to reconnect due to error ${Errors.toLogFormat(error)}`);
        return reconnect();
      }
    }, "reconnect");
    let authenticated;
    try {
      authenticated = await process.getResult();
      this.setStatus(import_SocketStatus.SocketStatus.OPEN);
    } catch (error) {
      log.warn(`SocketManager: authenticated socket connection failed with error: ${Errors.toLogFormat(error)}`);
      if (this.authenticated !== process) {
        return;
      }
      this.dropAuthenticated(process);
      if (error instanceof import_Errors.HTTPError) {
        const { code } = error;
        if (code === 401 || code === 403) {
          this.emit("authError", error);
          return;
        }
        if (!(code >= 500 && code <= 599) && code !== -1) {
          return;
        }
      }
      reconnect();
      return;
    }
    log.info("SocketManager: connected authenticated socket");
    window.logAuthenticatedConnect?.();
    this.backOff.reset();
    authenticated.addEventListener("close", ({ code, reason }) => {
      if (this.authenticated !== process) {
        return;
      }
      log.warn(`SocketManager: authenticated socket closed with code=${code} and reason=${reason}`);
      this.dropAuthenticated(process);
      if (code === 3e3) {
        return;
      }
      reconnect();
    });
  }
  async getAuthenticatedResource() {
    if (!this.authenticated) {
      (0, import_assert.strictAssert)(this.credentials !== void 0, "Missing credentials");
      await this.authenticate(this.credentials);
    }
    (0, import_assert.strictAssert)(this.authenticated !== void 0, "Authentication failed");
    return this.authenticated.getResult();
  }
  async getProvisioningResource(handler) {
    return this.connectResource({
      name: "provisioning",
      path: "/v1/websocket/provisioning/",
      resourceOptions: {
        handleRequest: (req) => {
          handler.handleRequest(req);
        },
        keepalive: { path: "/v1/keepalive/provisioning" }
      }
    }).getResult();
  }
  async fetch(url, init) {
    const headers = new import_node_fetch.Headers(init.headers);
    let resource;
    if (this.isAuthenticated(headers)) {
      resource = await this.getAuthenticatedResource();
    } else {
      resource = await this.getUnauthenticatedResource();
      await this.startUnauthenticatedExpirationTimer(resource);
    }
    const { path } = import_url.default.parse(url);
    (0, import_assert.strictAssert)(path, "Fetch can't have empty path");
    const { method = "GET", body, timeout } = init;
    let bodyBytes;
    if (body === void 0) {
      bodyBytes = void 0;
    } else if (body instanceof Uint8Array) {
      bodyBytes = body;
    } else if (body instanceof ArrayBuffer) {
      throw new Error("Unsupported body type: ArrayBuffer");
    } else if (typeof body === "string") {
      bodyBytes = Bytes.fromString(body);
    } else {
      throw new Error(`Unsupported body type: ${typeof body}`);
    }
    const {
      status,
      message: statusText,
      response,
      headers: flatResponseHeaders
    } = await resource.sendRequest({
      verb: method,
      path,
      body: bodyBytes,
      headers: Array.from(headers.entries()).map(([key, value]) => {
        return `${key}:${value}`;
      }),
      timeout
    });
    const responseHeaders = flatResponseHeaders.map((header) => {
      const [key, value] = header.split(":", 2);
      (0, import_assert.strictAssert)(value !== void 0, "Invalid header!");
      return [key, value];
    });
    return new import_node_fetch.Response(response, {
      status,
      statusText,
      headers: responseHeaders
    });
  }
  registerRequestHandler(handler) {
    this.requestHandlers.add(handler);
    const queue = this.incomingRequestQueue;
    if (queue.length === 0) {
      return;
    }
    log.info(`SocketManager: processing ${queue.length} queued incoming requests`);
    this.incomingRequestQueue = [];
    for (const req of queue) {
      this.queueOrHandleRequest(req);
    }
  }
  unregisterRequestHandler(handler) {
    this.requestHandlers.delete(handler);
  }
  async check() {
    if (this.isOffline) {
      return;
    }
    log.info("SocketManager.check");
    await Promise.all([
      SocketManager.checkResource(this.authenticated),
      SocketManager.checkResource(this.unauthenticated)
    ]);
  }
  async onOnline() {
    log.info("SocketManager.onOnline");
    this.isOffline = false;
    if (this.credentials) {
      await this.authenticate(this.credentials);
    }
  }
  async onOffline() {
    log.info("SocketManager.onOffline");
    this.isOffline = true;
    const { authenticated, unauthenticated } = this;
    if (authenticated) {
      authenticated.abort();
      this.dropAuthenticated(authenticated);
    }
    if (unauthenticated) {
      unauthenticated.abort();
      this.dropUnauthenticated(unauthenticated);
    }
  }
  async logout() {
    const { authenticated } = this;
    if (authenticated) {
      authenticated.abort();
      this.dropAuthenticated(authenticated);
    }
    this.credentials = void 0;
  }
  setStatus(status) {
    if (this.status === status) {
      return;
    }
    this.status = status;
    this.emit("statusChange");
  }
  async getUnauthenticatedResource() {
    if (this.isOffline) {
      throw new import_Errors.HTTPError("SocketManager offline", {
        code: 0,
        headers: {},
        stack: new Error().stack
      });
    }
    if (this.unauthenticated) {
      return this.unauthenticated.getResult();
    }
    log.info("SocketManager: connecting unauthenticated socket");
    const process = this.connectResource({
      name: "unauthenticated",
      path: "/v1/websocket/",
      resourceOptions: {
        keepalive: { path: "/v1/keepalive" }
      }
    });
    this.unauthenticated = process;
    let unauthenticated;
    try {
      unauthenticated = await this.unauthenticated.getResult();
    } catch (error) {
      log.info(`SocketManager: failed to connect unauthenticated socket  due to error: ${Errors.toLogFormat(error)}`);
      this.dropUnauthenticated(process);
      throw error;
    }
    log.info("SocketManager: connected unauthenticated socket");
    unauthenticated.addEventListener("close", ({ code, reason }) => {
      if (this.unauthenticated !== process) {
        return;
      }
      log.warn(`SocketManager: unauthenticated socket closed with code=${code} and reason=${reason}`);
      this.dropUnauthenticated(process);
    });
    return this.unauthenticated.getResult();
  }
  connectResource({
    name,
    path,
    resourceOptions,
    query = {}
  }) {
    const queryWithDefaults = {
      agent: "OWD",
      version: this.options.version,
      ...query
    };
    const url = `${this.options.url}${path}?${import_querystring.default.encode(queryWithDefaults)}`;
    return (0, import_WebSocket.connect)({
      name,
      url,
      certificateAuthority: this.options.certificateAuthority,
      version: this.options.version,
      proxyAgent: this.proxyAgent,
      createResource(socket) {
        return new import_WebsocketResources.default(socket, resourceOptions);
      }
    });
  }
  static async checkResource(process) {
    if (!process) {
      return;
    }
    const resource = await process.getResult();
    resource.forceKeepAlive();
  }
  dropAuthenticated(process) {
    if (this.authenticated !== process) {
      return;
    }
    this.incomingRequestQueue = [];
    this.authenticated = void 0;
    this.setStatus(import_SocketStatus.SocketStatus.CLOSED);
  }
  dropUnauthenticated(process) {
    if (this.unauthenticated !== process) {
      return;
    }
    this.unauthenticated = void 0;
    if (!this.unauthenticatedExpirationTimer) {
      return;
    }
    clearTimeout(this.unauthenticatedExpirationTimer);
    this.unauthenticatedExpirationTimer = void 0;
  }
  async startUnauthenticatedExpirationTimer(expected) {
    const process = this.unauthenticated;
    (0, import_assert.strictAssert)(process !== void 0, "Unauthenticated socket must be connected");
    const unauthenticated = await process.getResult();
    (0, import_assert.strictAssert)(unauthenticated === expected, "Unauthenticated resource should be the same");
    if (this.unauthenticatedExpirationTimer) {
      return;
    }
    log.info("SocketManager: starting expiration timer for unauthenticated socket");
    this.unauthenticatedExpirationTimer = setTimeout(async () => {
      log.info("SocketManager: shutting down unauthenticated socket after timeout");
      unauthenticated.shutdown();
      if (this.unauthenticated !== process) {
        return;
      }
      this.dropUnauthenticated(process);
      try {
        await this.getUnauthenticatedResource();
      } catch (error) {
        log.warn(`SocketManager: failed to reconnect unauthenticated socket due to error: ${Errors.toLogFormat(error)}`);
      }
    }, FIVE_MINUTES);
  }
  queueOrHandleRequest(req) {
    if (this.requestHandlers.size === 0) {
      this.incomingRequestQueue.push(req);
      log.info(`SocketManager: request handler unavailable, queued request. Queue size: ${this.incomingRequestQueue.length}`);
      return;
    }
    for (const handlers of this.requestHandlers) {
      try {
        handlers.handleRequest(req);
      } catch (error) {
        log.warn(`SocketManager: got exception while handling incoming request, error: ${Errors.toLogFormat(error)}`);
      }
    }
  }
  isAuthenticated(headers) {
    if (!this.credentials) {
      return false;
    }
    const authorization = headers.get("Authorization");
    if (!authorization) {
      return false;
    }
    const [basic, base64] = authorization.split(/\s+/, 2);
    if (basic.toLowerCase() !== "basic" || !base64) {
      return false;
    }
    const [username, password] = Bytes.toString(Bytes.fromBase64(base64)).split(":", 2);
    return username === this.credentials.username && password === this.credentials.password;
  }
  on(type, listener) {
    return super.on(type, listener);
  }
  emit(type, ...args) {
    return super.emit(type, ...args);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SocketManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU29ja2V0TWFuYWdlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgVVJMIGZyb20gJ3VybCc7XG5pbXBvcnQgUHJveHlBZ2VudCBmcm9tICdwcm94eS1hZ2VudCc7XG5pbXBvcnQgdHlwZSB7IFJlcXVlc3RJbml0IH0gZnJvbSAnbm9kZS1mZXRjaCc7XG5pbXBvcnQgeyBSZXNwb25zZSwgSGVhZGVycyB9IGZyb20gJ25vZGUtZmV0Y2gnO1xuaW1wb3J0IHR5cGUgeyBjb25uZWN0aW9uIGFzIFdlYlNvY2tldCB9IGZyb20gJ3dlYnNvY2tldCc7XG5pbXBvcnQgcXMgZnJvbSAncXVlcnlzdHJpbmcnO1xuaW1wb3J0IEV2ZW50TGlzdGVuZXIgZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHR5cGUgeyBBYm9ydGFibGVQcm9jZXNzIH0gZnJvbSAnLi4vdXRpbC9BYm9ydGFibGVQcm9jZXNzJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IEJhY2tPZmYsIEZJQk9OQUNDSV9USU1FT1VUUyB9IGZyb20gJy4uL3V0aWwvQmFja09mZic7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IFNvY2tldFN0YXR1cyB9IGZyb20gJy4uL3R5cGVzL1NvY2tldFN0YXR1cyc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmltcG9ydCB0eXBlIHtcbiAgV2ViU29ja2V0UmVzb3VyY2VPcHRpb25zLFxuICBJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3QsXG59IGZyb20gJy4vV2Vic29ja2V0UmVzb3VyY2VzJztcbmltcG9ydCBXZWJTb2NrZXRSZXNvdXJjZSBmcm9tICcuL1dlYnNvY2tldFJlc291cmNlcyc7XG5pbXBvcnQgeyBIVFRQRXJyb3IgfSBmcm9tICcuL0Vycm9ycyc7XG5pbXBvcnQgdHlwZSB7IFdlYkFQSUNyZWRlbnRpYWxzLCBJUmVxdWVzdEhhbmRsZXIgfSBmcm9tICcuL1R5cGVzLmQnO1xuaW1wb3J0IHsgY29ubmVjdCBhcyBjb25uZWN0V2ViU29ja2V0IH0gZnJvbSAnLi9XZWJTb2NrZXQnO1xuXG5jb25zdCBGSVZFX01JTlVURVMgPSA1ICogZHVyYXRpb25zLk1JTlVURTtcblxuY29uc3QgSklUVEVSID0gNSAqIGR1cmF0aW9ucy5TRUNPTkQ7XG5cbmV4cG9ydCB0eXBlIFNvY2tldE1hbmFnZXJPcHRpb25zID0gUmVhZG9ubHk8e1xuICB1cmw6IHN0cmluZztcbiAgY2VydGlmaWNhdGVBdXRob3JpdHk6IHN0cmluZztcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBwcm94eVVybD86IHN0cmluZztcbn0+O1xuXG4vLyBUaGlzIGNsYXNzIG1hbmFnZXMgdHdvIHdlYnNvY2tldCByZXNvdXJjZXM6XG4vL1xuLy8gLSBBdXRoZW50aWNhdGVkIFdlYlNvY2tldFJlc291cmNlIHdoaWNoIHVzZXMgc3VwcGxpZWQgV2ViQVBJQ3JlZGVudGlhbHMgYW5kXG4vLyAgIGF1dG9tYXRpY2FsbHkgcmVjb25uZWN0cyBvbiBjbG9zZWQgc29ja2V0ICh1c2luZyBiYWNrIG9mZilcbi8vIC0gVW5hdXRoZW50aWNhdGVkIFdlYlNvY2tldFJlc291cmNlIHRoYXQgaXMgY3JlYXRlZCBvbiB0aGUgZmlyc3Qgb3V0Z29pbmdcbi8vICAgdW5hdXRoZW50aWNhdGVkIHJlcXVlc3QgYW5kIGlzIHBlcmlvZGljYWxseSByb3RhdGVkICg1IG1pbnV0ZXMgc2luY2UgZmlyc3Rcbi8vICAgYWN0aXZpdHkgb24gdGhlIHNvY2tldCkuXG4vL1xuLy8gSW5jb21pbmcgcmVxdWVzdHMgb24gYXV0aGVudGljYXRlZCByZXNvdXJjZSBhcmUgZnVubmVsZWQgaW50byB0aGUgcmVnaXN0ZXJlZFxuLy8gcmVxdWVzdCBoYW5kbGVycyAoYHJlZ2lzdGVyUmVxdWVzdEhhbmRsZXJgKSBvciBxdWV1ZWQgaW50ZXJuYWxseSB1bnRpbCBhdFxuLy8gbGVhc3Qgb25lIHN1Y2ggcmVxdWVzdCBoYW5kbGVyIGJlY29tZXMgYXZhaWxhYmxlLlxuLy9cbi8vIEluY29taW5nIHJlcXVlc3RzIG9uIHVuYXV0aGVudGljYXRlZCByZXNvdXJjZSBhcmUgbm90IGN1cnJlbnRseSBzdXBwb3J0ZWQuXG4vLyBXZWJTb2NrZXRSZXNvdXJjZSBpcyByZXNwb25zaWJsZSBmb3IgdGhlaXIgaW1tZWRpYXRlIHRlcm1pbmF0aW9uLlxuZXhwb3J0IGNsYXNzIFNvY2tldE1hbmFnZXIgZXh0ZW5kcyBFdmVudExpc3RlbmVyIHtcbiAgcHJpdmF0ZSBiYWNrT2ZmID0gbmV3IEJhY2tPZmYoRklCT05BQ0NJX1RJTUVPVVRTLCB7XG4gICAgaml0dGVyOiBKSVRURVIsXG4gIH0pO1xuXG4gIHByaXZhdGUgYXV0aGVudGljYXRlZD86IEFib3J0YWJsZVByb2Nlc3M8V2ViU29ja2V0UmVzb3VyY2U+O1xuXG4gIHByaXZhdGUgdW5hdXRoZW50aWNhdGVkPzogQWJvcnRhYmxlUHJvY2VzczxXZWJTb2NrZXRSZXNvdXJjZT47XG5cbiAgcHJpdmF0ZSB1bmF1dGhlbnRpY2F0ZWRFeHBpcmF0aW9uVGltZXI/OiBOb2RlSlMuVGltZW91dDtcblxuICBwcml2YXRlIGNyZWRlbnRpYWxzPzogV2ViQVBJQ3JlZGVudGlhbHM7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwcm94eUFnZW50PzogUmV0dXJuVHlwZTx0eXBlb2YgUHJveHlBZ2VudD47XG5cbiAgcHJpdmF0ZSBzdGF0dXMgPSBTb2NrZXRTdGF0dXMuQ0xPU0VEO1xuXG4gIHByaXZhdGUgcmVxdWVzdEhhbmRsZXJzID0gbmV3IFNldDxJUmVxdWVzdEhhbmRsZXI+KCk7XG5cbiAgcHJpdmF0ZSBpbmNvbWluZ1JlcXVlc3RRdWV1ZSA9IG5ldyBBcnJheTxJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3Q+KCk7XG5cbiAgcHJpdmF0ZSBpc09mZmxpbmUgPSBmYWxzZTtcblxuICBjb25zdHJ1Y3Rvcihwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IFNvY2tldE1hbmFnZXJPcHRpb25zKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIGlmIChvcHRpb25zLnByb3h5VXJsKSB7XG4gICAgICB0aGlzLnByb3h5QWdlbnQgPSBuZXcgUHJveHlBZ2VudChvcHRpb25zLnByb3h5VXJsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgZ2V0U3RhdHVzKCk6IFNvY2tldFN0YXR1cyB7XG4gICAgcmV0dXJuIHRoaXMuc3RhdHVzO1xuICB9XG5cbiAgLy8gVXBkYXRlIFdlYkFQSUNyZWRlbnRpYWxzIGFuZCByZWNvbm5lY3QgYXV0aGVudGljYXRlZCByZXNvdXJjZSBpZlxuICAvLyBjcmVkZW50aWFscyBjaGFuZ2VkXG4gIHB1YmxpYyBhc3luYyBhdXRoZW50aWNhdGUoY3JlZGVudGlhbHM6IFdlYkFQSUNyZWRlbnRpYWxzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaXNPZmZsaW5lKSB7XG4gICAgICB0aHJvdyBuZXcgSFRUUEVycm9yKCdTb2NrZXRNYW5hZ2VyIG9mZmxpbmUnLCB7XG4gICAgICAgIGNvZGU6IDAsXG4gICAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgICBzdGFjazogbmV3IEVycm9yKCkuc3RhY2ssXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHVzZXJuYW1lLCBwYXNzd29yZCB9ID0gY3JlZGVudGlhbHM7XG4gICAgaWYgKCF1c2VybmFtZSAmJiAhcGFzc3dvcmQpIHtcbiAgICAgIGxvZy53YXJuKCdTb2NrZXRNYW5hZ2VyIGF1dGhlbnRpY2F0ZSB3YXMgY2FsbGVkIHdpdGhvdXQgY3JlZGVudGlhbHMnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzICYmXG4gICAgICB0aGlzLmNyZWRlbnRpYWxzLnVzZXJuYW1lID09PSB1c2VybmFtZSAmJlxuICAgICAgdGhpcy5jcmVkZW50aWFscy5wYXNzd29yZCA9PT0gcGFzc3dvcmQgJiZcbiAgICAgIHRoaXMuYXV0aGVudGljYXRlZFxuICAgICkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5hdXRoZW50aWNhdGVkLmdldFJlc3VsdCgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgJ1NvY2tldE1hbmFnZXI6IGZhaWxlZCB0byB3YWl0IGZvciBleGlzdGluZyBhdXRoZW50aWNhdGVkIHNvY2tldCAnICtcbiAgICAgICAgICAgIGAgZHVlIHRvIGVycm9yOiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSBjcmVkZW50aWFscztcblxuICAgIGxvZy5pbmZvKCdTb2NrZXRNYW5hZ2VyOiBjb25uZWN0aW5nIGF1dGhlbnRpY2F0ZWQgc29ja2V0Jyk7XG5cbiAgICB0aGlzLnNldFN0YXR1cyhTb2NrZXRTdGF0dXMuQ09OTkVDVElORyk7XG5cbiAgICBjb25zdCBwcm9jZXNzID0gdGhpcy5jb25uZWN0UmVzb3VyY2Uoe1xuICAgICAgbmFtZTogJ2F1dGhlbnRpY2F0ZWQnLFxuICAgICAgcGF0aDogJy92MS93ZWJzb2NrZXQvJyxcbiAgICAgIHF1ZXJ5OiB7IGxvZ2luOiB1c2VybmFtZSwgcGFzc3dvcmQgfSxcbiAgICAgIHJlc291cmNlT3B0aW9uczoge1xuICAgICAgICBrZWVwYWxpdmU6IHsgcGF0aDogJy92MS9rZWVwYWxpdmUnIH0sXG4gICAgICAgIGhhbmRsZVJlcXVlc3Q6IChyZXE6IEluY29taW5nV2ViU29ja2V0UmVxdWVzdCk6IHZvaWQgPT4ge1xuICAgICAgICAgIHRoaXMucXVldWVPckhhbmRsZVJlcXVlc3QocmVxKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICAvLyBDYW5jZWwgcHJldmlvdXMgY29ubmVjdCBhdHRlbXB0IG9yIGNsb3NlIHNvY2tldFxuICAgIHRoaXMuYXV0aGVudGljYXRlZD8uYWJvcnQoKTtcblxuICAgIHRoaXMuYXV0aGVudGljYXRlZCA9IHByb2Nlc3M7XG5cbiAgICBjb25zdCByZWNvbm5lY3QgPSBhc3luYyAoKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCB0aW1lb3V0ID0gdGhpcy5iYWNrT2ZmLmdldEFuZEluY3JlbWVudCgpO1xuXG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ1NvY2tldE1hbmFnZXI6IHJlY29ubmVjdGluZyBhdXRoZW50aWNhdGVkIHNvY2tldCAnICtcbiAgICAgICAgICBgYWZ0ZXIgJHt0aW1lb3V0fW1zYFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgc2xlZXAodGltZW91dCk7XG4gICAgICBpZiAodGhpcy5pc09mZmxpbmUpIHtcbiAgICAgICAgbG9nLmluZm8oJ1NvY2tldE1hbmFnZXI6IGNhbmNlbGxlZCByZWNvbm5lY3QgYmVjYXVzZSB3ZSBhcmUgb2ZmbGluZScpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQpIHtcbiAgICAgICAgbG9nLmluZm8oJ1NvY2tldE1hbmFnZXI6IGF1dGhlbnRpY2F0ZWQgc29ja2V0IGFscmVhZHkgcmVjb25uZWN0ZWQnKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzdHJpY3RBc3NlcnQodGhpcy5jcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkLCAnTWlzc2luZyBjcmVkZW50aWFscycpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmF1dGhlbnRpY2F0ZSh0aGlzLmNyZWRlbnRpYWxzKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdTb2NrZXRNYW5hZ2VyOiBhdXRoZW50aWNhdGVkIHNvY2tldCBmYWlsZWQgdG8gcmVjb25uZWN0ICcgK1xuICAgICAgICAgICAgYGR1ZSB0byBlcnJvciAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gcmVjb25uZWN0KCk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIGxldCBhdXRoZW50aWNhdGVkOiBXZWJTb2NrZXRSZXNvdXJjZTtcbiAgICB0cnkge1xuICAgICAgYXV0aGVudGljYXRlZCA9IGF3YWl0IHByb2Nlc3MuZ2V0UmVzdWx0KCk7XG4gICAgICB0aGlzLnNldFN0YXR1cyhTb2NrZXRTdGF0dXMuT1BFTik7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnU29ja2V0TWFuYWdlcjogYXV0aGVudGljYXRlZCBzb2NrZXQgY29ubmVjdGlvbiBmYWlsZWQgd2l0aCAnICtcbiAgICAgICAgICBgZXJyb3I6ICR7RXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKX1gXG4gICAgICApO1xuXG4gICAgICAvLyBUaGUgc29ja2V0IHdhcyBkZWxpYmVyYXRlbHkgY2xvc2VkLCBkb24ndCBmb2xsb3cgdXBcbiAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQgIT09IHByb2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmRyb3BBdXRoZW50aWNhdGVkKHByb2Nlc3MpO1xuXG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IpIHtcbiAgICAgICAgY29uc3QgeyBjb2RlIH0gPSBlcnJvcjtcblxuICAgICAgICBpZiAoY29kZSA9PT0gNDAxIHx8IGNvZGUgPT09IDQwMykge1xuICAgICAgICAgIHRoaXMuZW1pdCgnYXV0aEVycm9yJywgZXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNvZGUgPj0gNTAwICYmIGNvZGUgPD0gNTk5KSAmJiBjb2RlICE9PSAtMSkge1xuICAgICAgICAgIC8vIE5vIHJlY29ubmVjdCBhdHRlbXB0IHNob3VsZCBiZSBtYWRlXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJlY29ubmVjdCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdTb2NrZXRNYW5hZ2VyOiBjb25uZWN0ZWQgYXV0aGVudGljYXRlZCBzb2NrZXQnKTtcblxuICAgIHdpbmRvdy5sb2dBdXRoZW50aWNhdGVkQ29ubmVjdD8uKCk7XG4gICAgdGhpcy5iYWNrT2ZmLnJlc2V0KCk7XG5cbiAgICBhdXRoZW50aWNhdGVkLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKHsgY29kZSwgcmVhc29uIH0pOiB2b2lkID0+IHtcbiAgICAgIGlmICh0aGlzLmF1dGhlbnRpY2F0ZWQgIT09IHByb2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ1NvY2tldE1hbmFnZXI6IGF1dGhlbnRpY2F0ZWQgc29ja2V0IGNsb3NlZCAnICtcbiAgICAgICAgICBgd2l0aCBjb2RlPSR7Y29kZX0gYW5kIHJlYXNvbj0ke3JlYXNvbn1gXG4gICAgICApO1xuICAgICAgdGhpcy5kcm9wQXV0aGVudGljYXRlZChwcm9jZXNzKTtcblxuICAgICAgaWYgKGNvZGUgPT09IDMwMDApIHtcbiAgICAgICAgLy8gSW50ZW50aW9uYWwgZGlzY29ubmVjdFxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJlY29ubmVjdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgLy8gRWl0aGVyIHJldHVybnMgY3VycmVudGx5IGNvbm5lY3RpbmcvYWN0aXZlIGF1dGhlbnRpY2F0ZWRcbiAgLy8gV2ViU29ja2V0UmVzb3VyY2Ugb3IgY29ubmVjdHMgYSBmcmVzaCBvbmUuXG4gIHB1YmxpYyBhc3luYyBnZXRBdXRoZW50aWNhdGVkUmVzb3VyY2UoKTogUHJvbWlzZTxXZWJTb2NrZXRSZXNvdXJjZT4ge1xuICAgIGlmICghdGhpcy5hdXRoZW50aWNhdGVkKSB7XG4gICAgICBzdHJpY3RBc3NlcnQodGhpcy5jcmVkZW50aWFscyAhPT0gdW5kZWZpbmVkLCAnTWlzc2luZyBjcmVkZW50aWFscycpO1xuICAgICAgYXdhaXQgdGhpcy5hdXRoZW50aWNhdGUodGhpcy5jcmVkZW50aWFscyk7XG4gICAgfVxuXG4gICAgc3RyaWN0QXNzZXJ0KHRoaXMuYXV0aGVudGljYXRlZCAhPT0gdW5kZWZpbmVkLCAnQXV0aGVudGljYXRpb24gZmFpbGVkJyk7XG4gICAgcmV0dXJuIHRoaXMuYXV0aGVudGljYXRlZC5nZXRSZXN1bHQoKTtcbiAgfVxuXG4gIC8vIENyZWF0ZXMgbmV3IFdlYlNvY2tldFJlc291cmNlIGZvciBBY2NvdW50TWFuYWdlcidzIHByb3Zpc2lvbmluZ1xuICBwdWJsaWMgYXN5bmMgZ2V0UHJvdmlzaW9uaW5nUmVzb3VyY2UoXG4gICAgaGFuZGxlcjogSVJlcXVlc3RIYW5kbGVyXG4gICk6IFByb21pc2U8V2ViU29ja2V0UmVzb3VyY2U+IHtcbiAgICByZXR1cm4gdGhpcy5jb25uZWN0UmVzb3VyY2Uoe1xuICAgICAgbmFtZTogJ3Byb3Zpc2lvbmluZycsXG4gICAgICBwYXRoOiAnL3YxL3dlYnNvY2tldC9wcm92aXNpb25pbmcvJyxcbiAgICAgIHJlc291cmNlT3B0aW9uczoge1xuICAgICAgICBoYW5kbGVSZXF1ZXN0OiAocmVxOiBJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3QpOiB2b2lkID0+IHtcbiAgICAgICAgICBoYW5kbGVyLmhhbmRsZVJlcXVlc3QocmVxKTtcbiAgICAgICAgfSxcbiAgICAgICAga2VlcGFsaXZlOiB7IHBhdGg6ICcvdjEva2VlcGFsaXZlL3Byb3Zpc2lvbmluZycgfSxcbiAgICAgIH0sXG4gICAgfSkuZ2V0UmVzdWx0KCk7XG4gIH1cblxuICAvLyBGZXRjaC1jb21wYXRpYmxlIHdyYXBwZXIgYXJvdW5kIHVuZGVybHlpbmcgdW5hdXRoZW50aWNhdGVkL2F1dGhlbnRpY2F0ZWRcbiAgLy8gd2Vic29ja2V0IHJlc291cmNlcy4gVGhpcyB3cmFwcGVyIHN1cHBvcnRzIG9ubHkgbGltaXRlZCBudW1iZXIgb2YgZmVhdHVyZXNcbiAgLy8gb2Ygbm9kZS1mZXRjaCBkZXNwaXRlIGJlaW5nIEFQSSBjb21wYXRpYmxlLlxuICBwdWJsaWMgYXN5bmMgZmV0Y2godXJsOiBzdHJpbmcsIGluaXQ6IFJlcXVlc3RJbml0KTogUHJvbWlzZTxSZXNwb25zZT4ge1xuICAgIGNvbnN0IGhlYWRlcnMgPSBuZXcgSGVhZGVycyhpbml0LmhlYWRlcnMpO1xuXG4gICAgbGV0IHJlc291cmNlOiBXZWJTb2NrZXRSZXNvdXJjZTtcbiAgICBpZiAodGhpcy5pc0F1dGhlbnRpY2F0ZWQoaGVhZGVycykpIHtcbiAgICAgIHJlc291cmNlID0gYXdhaXQgdGhpcy5nZXRBdXRoZW50aWNhdGVkUmVzb3VyY2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzb3VyY2UgPSBhd2FpdCB0aGlzLmdldFVuYXV0aGVudGljYXRlZFJlc291cmNlKCk7XG4gICAgICBhd2FpdCB0aGlzLnN0YXJ0VW5hdXRoZW50aWNhdGVkRXhwaXJhdGlvblRpbWVyKHJlc291cmNlKTtcbiAgICB9XG5cbiAgICBjb25zdCB7IHBhdGggfSA9IFVSTC5wYXJzZSh1cmwpO1xuICAgIHN0cmljdEFzc2VydChwYXRoLCBcIkZldGNoIGNhbid0IGhhdmUgZW1wdHkgcGF0aFwiKTtcblxuICAgIGNvbnN0IHsgbWV0aG9kID0gJ0dFVCcsIGJvZHksIHRpbWVvdXQgfSA9IGluaXQ7XG5cbiAgICBsZXQgYm9keUJ5dGVzOiBVaW50OEFycmF5IHwgdW5kZWZpbmVkO1xuICAgIGlmIChib2R5ID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJvZHlCeXRlcyA9IHVuZGVmaW5lZDtcbiAgICB9IGVsc2UgaWYgKGJvZHkgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICBib2R5Qnl0ZXMgPSBib2R5O1xuICAgIH0gZWxzZSBpZiAoYm9keSBpbnN0YW5jZW9mIEFycmF5QnVmZmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGJvZHkgdHlwZTogQXJyYXlCdWZmZXInKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBib2R5ID09PSAnc3RyaW5nJykge1xuICAgICAgYm9keUJ5dGVzID0gQnl0ZXMuZnJvbVN0cmluZyhib2R5KTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBib2R5IHR5cGU6ICR7dHlwZW9mIGJvZHl9YCk7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgc3RhdHVzLFxuICAgICAgbWVzc2FnZTogc3RhdHVzVGV4dCxcbiAgICAgIHJlc3BvbnNlLFxuICAgICAgaGVhZGVyczogZmxhdFJlc3BvbnNlSGVhZGVycyxcbiAgICB9ID0gYXdhaXQgcmVzb3VyY2Uuc2VuZFJlcXVlc3Qoe1xuICAgICAgdmVyYjogbWV0aG9kLFxuICAgICAgcGF0aCxcbiAgICAgIGJvZHk6IGJvZHlCeXRlcyxcbiAgICAgIGhlYWRlcnM6IEFycmF5LmZyb20oaGVhZGVycy5lbnRyaWVzKCkpLm1hcCgoW2tleSwgdmFsdWVdKSA9PiB7XG4gICAgICAgIHJldHVybiBgJHtrZXl9OiR7dmFsdWV9YDtcbiAgICAgIH0pLFxuICAgICAgdGltZW91dCxcbiAgICB9KTtcblxuICAgIGNvbnN0IHJlc3BvbnNlSGVhZGVyczogQXJyYXk8W3N0cmluZywgc3RyaW5nXT4gPSBmbGF0UmVzcG9uc2VIZWFkZXJzLm1hcChcbiAgICAgIGhlYWRlciA9PiB7XG4gICAgICAgIGNvbnN0IFtrZXksIHZhbHVlXSA9IGhlYWRlci5zcGxpdCgnOicsIDIpO1xuICAgICAgICBzdHJpY3RBc3NlcnQodmFsdWUgIT09IHVuZGVmaW5lZCwgJ0ludmFsaWQgaGVhZGVyIScpO1xuICAgICAgICByZXR1cm4gW2tleSwgdmFsdWVdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICByZXR1cm4gbmV3IFJlc3BvbnNlKHJlc3BvbnNlLCB7XG4gICAgICBzdGF0dXMsXG4gICAgICBzdGF0dXNUZXh0LFxuICAgICAgaGVhZGVyczogcmVzcG9uc2VIZWFkZXJzLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHJlZ2lzdGVyUmVxdWVzdEhhbmRsZXIoaGFuZGxlcjogSVJlcXVlc3RIYW5kbGVyKTogdm9pZCB7XG4gICAgdGhpcy5yZXF1ZXN0SGFuZGxlcnMuYWRkKGhhbmRsZXIpO1xuXG4gICAgY29uc3QgcXVldWUgPSB0aGlzLmluY29taW5nUmVxdWVzdFF1ZXVlO1xuICAgIGlmIChxdWV1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBTb2NrZXRNYW5hZ2VyOiBwcm9jZXNzaW5nICR7cXVldWUubGVuZ3RofSBxdWV1ZWQgaW5jb21pbmcgcmVxdWVzdHNgXG4gICAgKTtcbiAgICB0aGlzLmluY29taW5nUmVxdWVzdFF1ZXVlID0gW107XG4gICAgZm9yIChjb25zdCByZXEgb2YgcXVldWUpIHtcbiAgICAgIHRoaXMucXVldWVPckhhbmRsZVJlcXVlc3QocmVxKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgdW5yZWdpc3RlclJlcXVlc3RIYW5kbGVyKGhhbmRsZXI6IElSZXF1ZXN0SGFuZGxlcik6IHZvaWQge1xuICAgIHRoaXMucmVxdWVzdEhhbmRsZXJzLmRlbGV0ZShoYW5kbGVyKTtcbiAgfVxuXG4gIC8vIEZvcmNlIGtlZXAtYWxpdmUgY2hlY2tzIG9uIFdlYlNvY2tldFJlc291cmNlc1xuICBwdWJsaWMgYXN5bmMgY2hlY2soKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuaXNPZmZsaW5lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ1NvY2tldE1hbmFnZXIuY2hlY2snKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBTb2NrZXRNYW5hZ2VyLmNoZWNrUmVzb3VyY2UodGhpcy5hdXRoZW50aWNhdGVkKSxcbiAgICAgIFNvY2tldE1hbmFnZXIuY2hlY2tSZXNvdXJjZSh0aGlzLnVuYXV0aGVudGljYXRlZCksXG4gICAgXSk7XG4gIH1cblxuICAvLyBQdXRzIFNvY2tldE1hbmFnZXIgaW50byBcIm9ubGluZVwiIHN0YXRlIGFuZCByZWNvbm5lY3RzIHRoZSBhdXRoZW50aWNhdGVkXG4gIC8vIFdlYlNvY2tldFJlc291cmNlIChpZiB0aGVyZSBhcmUgdmFsaWQgY3JlZGVudGlhbHMpXG4gIHB1YmxpYyBhc3luYyBvbk9ubGluZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnU29ja2V0TWFuYWdlci5vbk9ubGluZScpO1xuICAgIHRoaXMuaXNPZmZsaW5lID0gZmFsc2U7XG5cbiAgICBpZiAodGhpcy5jcmVkZW50aWFscykge1xuICAgICAgYXdhaXQgdGhpcy5hdXRoZW50aWNhdGUodGhpcy5jcmVkZW50aWFscyk7XG4gICAgfVxuICB9XG5cbiAgLy8gUHV0cyBTb2NrZXRNYW5hZ2VyIGludG8gXCJvZmZsaW5lXCIgc3RhdGUgYW5kIGdyYWNlZnVsbHkgZGlzY29ubmVjdHMgYm90aFxuICAvLyB1bmF1dGhlbnRpY2F0ZWQgYW5kIGF1dGhlbnRpY2F0ZWQgcmVzb3VyY2VzLlxuICBwdWJsaWMgYXN5bmMgb25PZmZsaW5lKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdTb2NrZXRNYW5hZ2VyLm9uT2ZmbGluZScpO1xuICAgIHRoaXMuaXNPZmZsaW5lID0gdHJ1ZTtcblxuICAgIGNvbnN0IHsgYXV0aGVudGljYXRlZCwgdW5hdXRoZW50aWNhdGVkIH0gPSB0aGlzO1xuICAgIGlmIChhdXRoZW50aWNhdGVkKSB7XG4gICAgICBhdXRoZW50aWNhdGVkLmFib3J0KCk7XG4gICAgICB0aGlzLmRyb3BBdXRoZW50aWNhdGVkKGF1dGhlbnRpY2F0ZWQpO1xuICAgIH1cbiAgICBpZiAodW5hdXRoZW50aWNhdGVkKSB7XG4gICAgICB1bmF1dGhlbnRpY2F0ZWQuYWJvcnQoKTtcbiAgICAgIHRoaXMuZHJvcFVuYXV0aGVudGljYXRlZCh1bmF1dGhlbnRpY2F0ZWQpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBsb2dvdXQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBhdXRoZW50aWNhdGVkIH0gPSB0aGlzO1xuICAgIGlmIChhdXRoZW50aWNhdGVkKSB7XG4gICAgICBhdXRoZW50aWNhdGVkLmFib3J0KCk7XG4gICAgICB0aGlzLmRyb3BBdXRoZW50aWNhdGVkKGF1dGhlbnRpY2F0ZWQpO1xuICAgIH1cblxuICAgIHRoaXMuY3JlZGVudGlhbHMgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvL1xuICAvLyBQcml2YXRlXG4gIC8vXG5cbiAgcHJpdmF0ZSBzZXRTdGF0dXMoc3RhdHVzOiBTb2NrZXRTdGF0dXMpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5zdGF0dXMgPT09IHN0YXR1cykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuc3RhdHVzID0gc3RhdHVzO1xuICAgIHRoaXMuZW1pdCgnc3RhdHVzQ2hhbmdlJyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGdldFVuYXV0aGVudGljYXRlZFJlc291cmNlKCk6IFByb21pc2U8V2ViU29ja2V0UmVzb3VyY2U+IHtcbiAgICBpZiAodGhpcy5pc09mZmxpbmUpIHtcbiAgICAgIHRocm93IG5ldyBIVFRQRXJyb3IoJ1NvY2tldE1hbmFnZXIgb2ZmbGluZScsIHtcbiAgICAgICAgY29kZTogMCxcbiAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgIHN0YWNrOiBuZXcgRXJyb3IoKS5zdGFjayxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnVuYXV0aGVudGljYXRlZCkge1xuICAgICAgcmV0dXJuIHRoaXMudW5hdXRoZW50aWNhdGVkLmdldFJlc3VsdCgpO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdTb2NrZXRNYW5hZ2VyOiBjb25uZWN0aW5nIHVuYXV0aGVudGljYXRlZCBzb2NrZXQnKTtcblxuICAgIGNvbnN0IHByb2Nlc3MgPSB0aGlzLmNvbm5lY3RSZXNvdXJjZSh7XG4gICAgICBuYW1lOiAndW5hdXRoZW50aWNhdGVkJyxcbiAgICAgIHBhdGg6ICcvdjEvd2Vic29ja2V0LycsXG4gICAgICByZXNvdXJjZU9wdGlvbnM6IHtcbiAgICAgICAga2VlcGFsaXZlOiB7IHBhdGg6ICcvdjEva2VlcGFsaXZlJyB9LFxuICAgICAgfSxcbiAgICB9KTtcbiAgICB0aGlzLnVuYXV0aGVudGljYXRlZCA9IHByb2Nlc3M7XG5cbiAgICBsZXQgdW5hdXRoZW50aWNhdGVkOiBXZWJTb2NrZXRSZXNvdXJjZTtcbiAgICB0cnkge1xuICAgICAgdW5hdXRoZW50aWNhdGVkID0gYXdhaXQgdGhpcy51bmF1dGhlbnRpY2F0ZWQuZ2V0UmVzdWx0KCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnU29ja2V0TWFuYWdlcjogZmFpbGVkIHRvIGNvbm5lY3QgdW5hdXRoZW50aWNhdGVkIHNvY2tldCAnICtcbiAgICAgICAgICBgIGR1ZSB0byBlcnJvcjogJHtFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpfWBcbiAgICAgICk7XG4gICAgICB0aGlzLmRyb3BVbmF1dGhlbnRpY2F0ZWQocHJvY2Vzcyk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbygnU29ja2V0TWFuYWdlcjogY29ubmVjdGVkIHVuYXV0aGVudGljYXRlZCBzb2NrZXQnKTtcblxuICAgIHVuYXV0aGVudGljYXRlZC5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICh7IGNvZGUsIHJlYXNvbiB9KTogdm9pZCA9PiB7XG4gICAgICBpZiAodGhpcy51bmF1dGhlbnRpY2F0ZWQgIT09IHByb2Nlc3MpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ1NvY2tldE1hbmFnZXI6IHVuYXV0aGVudGljYXRlZCBzb2NrZXQgY2xvc2VkICcgK1xuICAgICAgICAgIGB3aXRoIGNvZGU9JHtjb2RlfSBhbmQgcmVhc29uPSR7cmVhc29ufWBcbiAgICAgICk7XG5cbiAgICAgIHRoaXMuZHJvcFVuYXV0aGVudGljYXRlZChwcm9jZXNzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB0aGlzLnVuYXV0aGVudGljYXRlZC5nZXRSZXN1bHQoKTtcbiAgfVxuXG4gIHByaXZhdGUgY29ubmVjdFJlc291cmNlKHtcbiAgICBuYW1lLFxuICAgIHBhdGgsXG4gICAgcmVzb3VyY2VPcHRpb25zLFxuICAgIHF1ZXJ5ID0ge30sXG4gIH06IHtcbiAgICBuYW1lOiBzdHJpbmc7XG4gICAgcGF0aDogc3RyaW5nO1xuICAgIHJlc291cmNlT3B0aW9uczogV2ViU29ja2V0UmVzb3VyY2VPcHRpb25zO1xuICAgIHF1ZXJ5PzogUmVjb3JkPHN0cmluZywgc3RyaW5nPjtcbiAgfSk6IEFib3J0YWJsZVByb2Nlc3M8V2ViU29ja2V0UmVzb3VyY2U+IHtcbiAgICBjb25zdCBxdWVyeVdpdGhEZWZhdWx0cyA9IHtcbiAgICAgIGFnZW50OiAnT1dEJyxcbiAgICAgIHZlcnNpb246IHRoaXMub3B0aW9ucy52ZXJzaW9uLFxuICAgICAgLi4ucXVlcnksXG4gICAgfTtcblxuICAgIGNvbnN0IHVybCA9IGAke3RoaXMub3B0aW9ucy51cmx9JHtwYXRofT8ke3FzLmVuY29kZShxdWVyeVdpdGhEZWZhdWx0cyl9YDtcblxuICAgIHJldHVybiBjb25uZWN0V2ViU29ja2V0KHtcbiAgICAgIG5hbWUsXG4gICAgICB1cmwsXG4gICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eTogdGhpcy5vcHRpb25zLmNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgdmVyc2lvbjogdGhpcy5vcHRpb25zLnZlcnNpb24sXG4gICAgICBwcm94eUFnZW50OiB0aGlzLnByb3h5QWdlbnQsXG5cbiAgICAgIGNyZWF0ZVJlc291cmNlKHNvY2tldDogV2ViU29ja2V0KTogV2ViU29ja2V0UmVzb3VyY2Uge1xuICAgICAgICByZXR1cm4gbmV3IFdlYlNvY2tldFJlc291cmNlKHNvY2tldCwgcmVzb3VyY2VPcHRpb25zKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBhc3luYyBjaGVja1Jlc291cmNlKFxuICAgIHByb2Nlc3M/OiBBYm9ydGFibGVQcm9jZXNzPFdlYlNvY2tldFJlc291cmNlPlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXByb2Nlc3MpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCByZXNvdXJjZSA9IGF3YWl0IHByb2Nlc3MuZ2V0UmVzdWx0KCk7XG4gICAgcmVzb3VyY2UuZm9yY2VLZWVwQWxpdmUoKTtcbiAgfVxuXG4gIHByaXZhdGUgZHJvcEF1dGhlbnRpY2F0ZWQoXG4gICAgcHJvY2VzczogQWJvcnRhYmxlUHJvY2VzczxXZWJTb2NrZXRSZXNvdXJjZT5cbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuYXV0aGVudGljYXRlZCAhPT0gcHJvY2Vzcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuaW5jb21pbmdSZXF1ZXN0UXVldWUgPSBbXTtcbiAgICB0aGlzLmF1dGhlbnRpY2F0ZWQgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5zZXRTdGF0dXMoU29ja2V0U3RhdHVzLkNMT1NFRCk7XG4gIH1cblxuICBwcml2YXRlIGRyb3BVbmF1dGhlbnRpY2F0ZWQoXG4gICAgcHJvY2VzczogQWJvcnRhYmxlUHJvY2VzczxXZWJTb2NrZXRSZXNvdXJjZT5cbiAgKTogdm9pZCB7XG4gICAgaWYgKHRoaXMudW5hdXRoZW50aWNhdGVkICE9PSBwcm9jZXNzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy51bmF1dGhlbnRpY2F0ZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKCF0aGlzLnVuYXV0aGVudGljYXRlZEV4cGlyYXRpb25UaW1lcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjbGVhclRpbWVvdXQodGhpcy51bmF1dGhlbnRpY2F0ZWRFeHBpcmF0aW9uVGltZXIpO1xuICAgIHRoaXMudW5hdXRoZW50aWNhdGVkRXhwaXJhdGlvblRpbWVyID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBzdGFydFVuYXV0aGVudGljYXRlZEV4cGlyYXRpb25UaW1lcihcbiAgICBleHBlY3RlZDogV2ViU29ja2V0UmVzb3VyY2VcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgcHJvY2VzcyA9IHRoaXMudW5hdXRoZW50aWNhdGVkO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIHByb2Nlc3MgIT09IHVuZGVmaW5lZCxcbiAgICAgICdVbmF1dGhlbnRpY2F0ZWQgc29ja2V0IG11c3QgYmUgY29ubmVjdGVkJ1xuICAgICk7XG5cbiAgICBjb25zdCB1bmF1dGhlbnRpY2F0ZWQgPSBhd2FpdCBwcm9jZXNzLmdldFJlc3VsdCgpO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIHVuYXV0aGVudGljYXRlZCA9PT0gZXhwZWN0ZWQsXG4gICAgICAnVW5hdXRoZW50aWNhdGVkIHJlc291cmNlIHNob3VsZCBiZSB0aGUgc2FtZSdcbiAgICApO1xuXG4gICAgaWYgKHRoaXMudW5hdXRoZW50aWNhdGVkRXhwaXJhdGlvblRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICAnU29ja2V0TWFuYWdlcjogc3RhcnRpbmcgZXhwaXJhdGlvbiB0aW1lciBmb3IgdW5hdXRoZW50aWNhdGVkIHNvY2tldCdcbiAgICApO1xuICAgIHRoaXMudW5hdXRoZW50aWNhdGVkRXhwaXJhdGlvblRpbWVyID0gc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ1NvY2tldE1hbmFnZXI6IHNodXR0aW5nIGRvd24gdW5hdXRoZW50aWNhdGVkIHNvY2tldCBhZnRlciB0aW1lb3V0J1xuICAgICAgKTtcbiAgICAgIHVuYXV0aGVudGljYXRlZC5zaHV0ZG93bigpO1xuXG4gICAgICAvLyBUaGUgc29ja2V0IGlzIGVpdGhlciBkZWxpYmVyYXRlbHkgY2xvc2VkIG9yIHJlY29ubmVjdGVkIGFscmVhZHlcbiAgICAgIGlmICh0aGlzLnVuYXV0aGVudGljYXRlZCAhPT0gcHJvY2Vzcykge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZHJvcFVuYXV0aGVudGljYXRlZChwcm9jZXNzKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5nZXRVbmF1dGhlbnRpY2F0ZWRSZXNvdXJjZSgpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgJ1NvY2tldE1hbmFnZXI6IGZhaWxlZCB0byByZWNvbm5lY3QgdW5hdXRoZW50aWNhdGVkIHNvY2tldCAnICtcbiAgICAgICAgICAgIGBkdWUgdG8gZXJyb3I6ICR7RXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSwgRklWRV9NSU5VVEVTKTtcbiAgfVxuXG4gIHByaXZhdGUgcXVldWVPckhhbmRsZVJlcXVlc3QocmVxOiBJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3QpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5yZXF1ZXN0SGFuZGxlcnMuc2l6ZSA9PT0gMCkge1xuICAgICAgdGhpcy5pbmNvbWluZ1JlcXVlc3RRdWV1ZS5wdXNoKHJlcSk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ1NvY2tldE1hbmFnZXI6IHJlcXVlc3QgaGFuZGxlciB1bmF2YWlsYWJsZSwgJyArXG4gICAgICAgICAgYHF1ZXVlZCByZXF1ZXN0LiBRdWV1ZSBzaXplOiAke3RoaXMuaW5jb21pbmdSZXF1ZXN0UXVldWUubGVuZ3RofWBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgaGFuZGxlcnMgb2YgdGhpcy5yZXF1ZXN0SGFuZGxlcnMpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGhhbmRsZXJzLmhhbmRsZVJlcXVlc3QocmVxKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdTb2NrZXRNYW5hZ2VyOiBnb3QgZXhjZXB0aW9uIHdoaWxlIGhhbmRsaW5nIGluY29taW5nIHJlcXVlc3QsICcgK1xuICAgICAgICAgICAgYGVycm9yOiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgaXNBdXRoZW50aWNhdGVkKGhlYWRlcnM6IEhlYWRlcnMpOiBib29sZWFuIHtcbiAgICBpZiAoIXRoaXMuY3JlZGVudGlhbHMpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBhdXRob3JpemF0aW9uID0gaGVhZGVycy5nZXQoJ0F1dGhvcml6YXRpb24nKTtcbiAgICBpZiAoIWF1dGhvcml6YXRpb24pIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBbYmFzaWMsIGJhc2U2NF0gPSBhdXRob3JpemF0aW9uLnNwbGl0KC9cXHMrLywgMik7XG5cbiAgICBpZiAoYmFzaWMudG9Mb3dlckNhc2UoKSAhPT0gJ2Jhc2ljJyB8fCAhYmFzZTY0KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgW3VzZXJuYW1lLCBwYXNzd29yZF0gPSBCeXRlcy50b1N0cmluZyhCeXRlcy5mcm9tQmFzZTY0KGJhc2U2NCkpLnNwbGl0KFxuICAgICAgJzonLFxuICAgICAgMlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgdXNlcm5hbWUgPT09IHRoaXMuY3JlZGVudGlhbHMudXNlcm5hbWUgJiZcbiAgICAgIHBhc3N3b3JkID09PSB0aGlzLmNyZWRlbnRpYWxzLnBhc3N3b3JkXG4gICAgKTtcbiAgfVxuXG4gIC8vIEV2ZW50RW1pdHRlciB0eXBlc1xuXG4gIHB1YmxpYyBvdmVycmlkZSBvbihcbiAgICB0eXBlOiAnYXV0aEVycm9yJyxcbiAgICBjYWxsYmFjazogKGVycm9yOiBIVFRQRXJyb3IpID0+IHZvaWRcbiAgKTogdGhpcztcbiAgcHVibGljIG92ZXJyaWRlIG9uKHR5cGU6ICdzdGF0dXNDaGFuZ2UnLCBjYWxsYmFjazogKCkgPT4gdm9pZCk6IHRoaXM7XG5cbiAgcHVibGljIG92ZXJyaWRlIG9uKFxuICAgIHR5cGU6IHN0cmluZyB8IHN5bWJvbCxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIGxpc3RlbmVyOiAoLi4uYXJnczogQXJyYXk8YW55PikgPT4gdm9pZFxuICApOiB0aGlzIHtcbiAgICByZXR1cm4gc3VwZXIub24odHlwZSwgbGlzdGVuZXIpO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIGVtaXQodHlwZTogJ2F1dGhFcnJvcicsIGVycm9yOiBIVFRQRXJyb3IpOiBib29sZWFuO1xuICBwdWJsaWMgb3ZlcnJpZGUgZW1pdCh0eXBlOiAnc3RhdHVzQ2hhbmdlJyk6IGJvb2xlYW47XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHVibGljIG92ZXJyaWRlIGVtaXQodHlwZTogc3RyaW5nIHwgc3ltYm9sLCAuLi5hcmdzOiBBcnJheTxhbnk+KTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHN1cGVyLmVtaXQodHlwZSwgLi4uYXJncyk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxpQkFBZ0I7QUFDaEIseUJBQXVCO0FBRXZCLHdCQUFrQztBQUVsQyx5QkFBZTtBQUNmLG9CQUEwQjtBQUcxQixvQkFBNkI7QUFDN0IscUJBQTRDO0FBQzVDLGdCQUEyQjtBQUMzQixtQkFBc0I7QUFDdEIsMEJBQTZCO0FBQzdCLGFBQXdCO0FBQ3hCLFlBQXVCO0FBQ3ZCLFVBQXFCO0FBTXJCLGdDQUE4QjtBQUM5QixvQkFBMEI7QUFFMUIsdUJBQTRDO0FBRTVDLE1BQU0sZUFBZSxJQUFJLFVBQVU7QUFFbkMsTUFBTSxTQUFTLElBQUksVUFBVTtBQXVCdEIsTUFBTSxzQkFBc0Isc0JBQWM7QUFBQSxFQXVCL0MsWUFBNkIsU0FBK0I7QUFDMUQsVUFBTTtBQURxQjtBQXRCckIsbUJBQVUsSUFBSSx1QkFBUSxtQ0FBb0I7QUFBQSxNQUNoRCxRQUFRO0FBQUEsSUFDVixDQUFDO0FBWU8sa0JBQVMsaUNBQWE7QUFFdEIsMkJBQWtCLG9CQUFJLElBQXFCO0FBRTNDLGdDQUF1QixJQUFJLE1BQWdDO0FBRTNELHFCQUFZO0FBS2xCLFFBQUksUUFBUSxVQUFVO0FBQ3BCLFdBQUssYUFBYSxJQUFJLDJCQUFXLFFBQVEsUUFBUTtBQUFBLElBQ25EO0FBQUEsRUFDRjtBQUFBLEVBRU8sWUFBMEI7QUFDL0IsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLFFBSWEsYUFBYSxhQUErQztBQUN2RSxRQUFJLEtBQUssV0FBVztBQUNsQixZQUFNLElBQUksd0JBQVUseUJBQXlCO0FBQUEsUUFDM0MsTUFBTTtBQUFBLFFBQ04sU0FBUyxDQUFDO0FBQUEsUUFDVixPQUFPLElBQUksTUFBTSxFQUFFO0FBQUEsTUFDckIsQ0FBQztBQUFBLElBQ0g7QUFFQSxVQUFNLEVBQUUsVUFBVSxhQUFhO0FBQy9CLFFBQUksQ0FBQyxZQUFZLENBQUMsVUFBVTtBQUMxQixVQUFJLEtBQUssMkRBQTJEO0FBQ3BFO0FBQUEsSUFDRjtBQUVBLFFBQ0UsS0FBSyxlQUNMLEtBQUssWUFBWSxhQUFhLFlBQzlCLEtBQUssWUFBWSxhQUFhLFlBQzlCLEtBQUssZUFDTDtBQUNBLFVBQUk7QUFDRixjQUFNLEtBQUssY0FBYyxVQUFVO0FBQUEsTUFDckMsU0FBUyxPQUFQO0FBQ0EsWUFBSSxLQUNGLGtGQUNvQixPQUFPLFlBQVksS0FBSyxHQUM5QztBQUFBLE1BQ0Y7QUFDQTtBQUFBLElBQ0Y7QUFFQSxTQUFLLGNBQWM7QUFFbkIsUUFBSSxLQUFLLGdEQUFnRDtBQUV6RCxTQUFLLFVBQVUsaUNBQWEsVUFBVTtBQUV0QyxVQUFNLFVBQVUsS0FBSyxnQkFBZ0I7QUFBQSxNQUNuQyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixPQUFPLEVBQUUsT0FBTyxVQUFVLFNBQVM7QUFBQSxNQUNuQyxpQkFBaUI7QUFBQSxRQUNmLFdBQVcsRUFBRSxNQUFNLGdCQUFnQjtBQUFBLFFBQ25DLGVBQWUsQ0FBQyxRQUF3QztBQUN0RCxlQUFLLHFCQUFxQixHQUFHO0FBQUEsUUFDL0I7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDO0FBR0QsU0FBSyxlQUFlLE1BQU07QUFFMUIsU0FBSyxnQkFBZ0I7QUFFckIsVUFBTSxZQUFZLG1DQUEyQjtBQUMzQyxZQUFNLFVBQVUsS0FBSyxRQUFRLGdCQUFnQjtBQUU3QyxVQUFJLEtBQ0YsMERBQ1csV0FDYjtBQUVBLFlBQU0sd0JBQU0sT0FBTztBQUNuQixVQUFJLEtBQUssV0FBVztBQUNsQixZQUFJLEtBQUssMkRBQTJEO0FBQ3BFO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxlQUFlO0FBQ3RCLFlBQUksS0FBSyx5REFBeUQ7QUFDbEU7QUFBQSxNQUNGO0FBRUEsc0NBQWEsS0FBSyxnQkFBZ0IsUUFBVyxxQkFBcUI7QUFFbEUsVUFBSTtBQUNGLGNBQU0sS0FBSyxhQUFhLEtBQUssV0FBVztBQUFBLE1BQzFDLFNBQVMsT0FBUDtBQUNBLFlBQUksS0FDRix3RUFDa0IsT0FBTyxZQUFZLEtBQUssR0FDNUM7QUFDQSxlQUFPLFVBQVU7QUFBQSxNQUNuQjtBQUFBLElBQ0YsR0E5QmtCO0FBZ0NsQixRQUFJO0FBQ0osUUFBSTtBQUNGLHNCQUFnQixNQUFNLFFBQVEsVUFBVTtBQUN4QyxXQUFLLFVBQVUsaUNBQWEsSUFBSTtBQUFBLElBQ2xDLFNBQVMsT0FBUDtBQUNBLFVBQUksS0FDRixxRUFDWSxPQUFPLFlBQVksS0FBSyxHQUN0QztBQUdBLFVBQUksS0FBSyxrQkFBa0IsU0FBUztBQUNsQztBQUFBLE1BQ0Y7QUFFQSxXQUFLLGtCQUFrQixPQUFPO0FBRTlCLFVBQUksaUJBQWlCLHlCQUFXO0FBQzlCLGNBQU0sRUFBRSxTQUFTO0FBRWpCLFlBQUksU0FBUyxPQUFPLFNBQVMsS0FBSztBQUNoQyxlQUFLLEtBQUssYUFBYSxLQUFLO0FBQzVCO0FBQUEsUUFDRjtBQUVBLFlBQUksQ0FBRSxTQUFRLE9BQU8sUUFBUSxRQUFRLFNBQVMsSUFBSTtBQUVoRDtBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsZ0JBQVU7QUFDVjtBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQUssK0NBQStDO0FBRXhELFdBQU8sMEJBQTBCO0FBQ2pDLFNBQUssUUFBUSxNQUFNO0FBRW5CLGtCQUFjLGlCQUFpQixTQUFTLENBQUMsRUFBRSxNQUFNLGFBQW1CO0FBQ2xFLFVBQUksS0FBSyxrQkFBa0IsU0FBUztBQUNsQztBQUFBLE1BQ0Y7QUFFQSxVQUFJLEtBQ0Ysd0RBQ2UsbUJBQW1CLFFBQ3BDO0FBQ0EsV0FBSyxrQkFBa0IsT0FBTztBQUU5QixVQUFJLFNBQVMsS0FBTTtBQUVqQjtBQUFBLE1BQ0Y7QUFFQSxnQkFBVTtBQUFBLElBQ1osQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUlhLDJCQUF1RDtBQUNsRSxRQUFJLENBQUMsS0FBSyxlQUFlO0FBQ3ZCLHNDQUFhLEtBQUssZ0JBQWdCLFFBQVcscUJBQXFCO0FBQ2xFLFlBQU0sS0FBSyxhQUFhLEtBQUssV0FBVztBQUFBLElBQzFDO0FBRUEsb0NBQWEsS0FBSyxrQkFBa0IsUUFBVyx1QkFBdUI7QUFDdEUsV0FBTyxLQUFLLGNBQWMsVUFBVTtBQUFBLEVBQ3RDO0FBQUEsUUFHYSx3QkFDWCxTQUM0QjtBQUM1QixXQUFPLEtBQUssZ0JBQWdCO0FBQUEsTUFDMUIsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ04saUJBQWlCO0FBQUEsUUFDZixlQUFlLENBQUMsUUFBd0M7QUFDdEQsa0JBQVEsY0FBYyxHQUFHO0FBQUEsUUFDM0I7QUFBQSxRQUNBLFdBQVcsRUFBRSxNQUFNLDZCQUE2QjtBQUFBLE1BQ2xEO0FBQUEsSUFDRixDQUFDLEVBQUUsVUFBVTtBQUFBLEVBQ2Y7QUFBQSxRQUthLE1BQU0sS0FBYSxNQUFzQztBQUNwRSxVQUFNLFVBQVUsSUFBSSwwQkFBUSxLQUFLLE9BQU87QUFFeEMsUUFBSTtBQUNKLFFBQUksS0FBSyxnQkFBZ0IsT0FBTyxHQUFHO0FBQ2pDLGlCQUFXLE1BQU0sS0FBSyx5QkFBeUI7QUFBQSxJQUNqRCxPQUFPO0FBQ0wsaUJBQVcsTUFBTSxLQUFLLDJCQUEyQjtBQUNqRCxZQUFNLEtBQUssb0NBQW9DLFFBQVE7QUFBQSxJQUN6RDtBQUVBLFVBQU0sRUFBRSxTQUFTLG1CQUFJLE1BQU0sR0FBRztBQUM5QixvQ0FBYSxNQUFNLDZCQUE2QjtBQUVoRCxVQUFNLEVBQUUsU0FBUyxPQUFPLE1BQU0sWUFBWTtBQUUxQyxRQUFJO0FBQ0osUUFBSSxTQUFTLFFBQVc7QUFDdEIsa0JBQVk7QUFBQSxJQUNkLFdBQVcsZ0JBQWdCLFlBQVk7QUFDckMsa0JBQVk7QUFBQSxJQUNkLFdBQVcsZ0JBQWdCLGFBQWE7QUFDdEMsWUFBTSxJQUFJLE1BQU0sb0NBQW9DO0FBQUEsSUFDdEQsV0FBVyxPQUFPLFNBQVMsVUFBVTtBQUNuQyxrQkFBWSxNQUFNLFdBQVcsSUFBSTtBQUFBLElBQ25DLE9BQU87QUFDTCxZQUFNLElBQUksTUFBTSwwQkFBMEIsT0FBTyxNQUFNO0FBQUEsSUFDekQ7QUFFQSxVQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBLFNBQVM7QUFBQSxRQUNQLE1BQU0sU0FBUyxZQUFZO0FBQUEsTUFDN0IsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBLE1BQU07QUFBQSxNQUNOLFNBQVMsTUFBTSxLQUFLLFFBQVEsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLENBQUMsS0FBSyxXQUFXO0FBQzNELGVBQU8sR0FBRyxPQUFPO0FBQUEsTUFDbkIsQ0FBQztBQUFBLE1BQ0Q7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLGtCQUEyQyxvQkFBb0IsSUFDbkUsWUFBVTtBQUNSLFlBQU0sQ0FBQyxLQUFLLFNBQVMsT0FBTyxNQUFNLEtBQUssQ0FBQztBQUN4QyxzQ0FBYSxVQUFVLFFBQVcsaUJBQWlCO0FBQ25ELGFBQU8sQ0FBQyxLQUFLLEtBQUs7QUFBQSxJQUNwQixDQUNGO0FBRUEsV0FBTyxJQUFJLDJCQUFTLFVBQVU7QUFBQSxNQUM1QjtBQUFBLE1BQ0E7QUFBQSxNQUNBLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFTyx1QkFBdUIsU0FBZ0M7QUFDNUQsU0FBSyxnQkFBZ0IsSUFBSSxPQUFPO0FBRWhDLFVBQU0sUUFBUSxLQUFLO0FBQ25CLFFBQUksTUFBTSxXQUFXLEdBQUc7QUFDdEI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUNGLDZCQUE2QixNQUFNLGlDQUNyQztBQUNBLFNBQUssdUJBQXVCLENBQUM7QUFDN0IsZUFBVyxPQUFPLE9BQU87QUFDdkIsV0FBSyxxQkFBcUIsR0FBRztBQUFBLElBQy9CO0FBQUEsRUFDRjtBQUFBLEVBRU8seUJBQXlCLFNBQWdDO0FBQzlELFNBQUssZ0JBQWdCLE9BQU8sT0FBTztBQUFBLEVBQ3JDO0FBQUEsUUFHYSxRQUF1QjtBQUNsQyxRQUFJLEtBQUssV0FBVztBQUNsQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQUsscUJBQXFCO0FBQzlCLFVBQU0sUUFBUSxJQUFJO0FBQUEsTUFDaEIsY0FBYyxjQUFjLEtBQUssYUFBYTtBQUFBLE1BQzlDLGNBQWMsY0FBYyxLQUFLLGVBQWU7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBSWEsV0FBMEI7QUFDckMsUUFBSSxLQUFLLHdCQUF3QjtBQUNqQyxTQUFLLFlBQVk7QUFFakIsUUFBSSxLQUFLLGFBQWE7QUFDcEIsWUFBTSxLQUFLLGFBQWEsS0FBSyxXQUFXO0FBQUEsSUFDMUM7QUFBQSxFQUNGO0FBQUEsUUFJYSxZQUEyQjtBQUN0QyxRQUFJLEtBQUsseUJBQXlCO0FBQ2xDLFNBQUssWUFBWTtBQUVqQixVQUFNLEVBQUUsZUFBZSxvQkFBb0I7QUFDM0MsUUFBSSxlQUFlO0FBQ2pCLG9CQUFjLE1BQU07QUFDcEIsV0FBSyxrQkFBa0IsYUFBYTtBQUFBLElBQ3RDO0FBQ0EsUUFBSSxpQkFBaUI7QUFDbkIsc0JBQWdCLE1BQU07QUFDdEIsV0FBSyxvQkFBb0IsZUFBZTtBQUFBLElBQzFDO0FBQUEsRUFDRjtBQUFBLFFBRWEsU0FBd0I7QUFDbkMsVUFBTSxFQUFFLGtCQUFrQjtBQUMxQixRQUFJLGVBQWU7QUFDakIsb0JBQWMsTUFBTTtBQUNwQixXQUFLLGtCQUFrQixhQUFhO0FBQUEsSUFDdEM7QUFFQSxTQUFLLGNBQWM7QUFBQSxFQUNyQjtBQUFBLEVBTVEsVUFBVSxRQUE0QjtBQUM1QyxRQUFJLEtBQUssV0FBVyxRQUFRO0FBQzFCO0FBQUEsSUFDRjtBQUVBLFNBQUssU0FBUztBQUNkLFNBQUssS0FBSyxjQUFjO0FBQUEsRUFDMUI7QUFBQSxRQUVjLDZCQUF5RDtBQUNyRSxRQUFJLEtBQUssV0FBVztBQUNsQixZQUFNLElBQUksd0JBQVUseUJBQXlCO0FBQUEsUUFDM0MsTUFBTTtBQUFBLFFBQ04sU0FBUyxDQUFDO0FBQUEsUUFDVixPQUFPLElBQUksTUFBTSxFQUFFO0FBQUEsTUFDckIsQ0FBQztBQUFBLElBQ0g7QUFFQSxRQUFJLEtBQUssaUJBQWlCO0FBQ3hCLGFBQU8sS0FBSyxnQkFBZ0IsVUFBVTtBQUFBLElBQ3hDO0FBRUEsUUFBSSxLQUFLLGtEQUFrRDtBQUUzRCxVQUFNLFVBQVUsS0FBSyxnQkFBZ0I7QUFBQSxNQUNuQyxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxRQUNmLFdBQVcsRUFBRSxNQUFNLGdCQUFnQjtBQUFBLE1BQ3JDO0FBQUEsSUFDRixDQUFDO0FBQ0QsU0FBSyxrQkFBa0I7QUFFdkIsUUFBSTtBQUNKLFFBQUk7QUFDRix3QkFBa0IsTUFBTSxLQUFLLGdCQUFnQixVQUFVO0FBQUEsSUFDekQsU0FBUyxPQUFQO0FBQ0EsVUFBSSxLQUNGLDBFQUNvQixPQUFPLFlBQVksS0FBSyxHQUM5QztBQUNBLFdBQUssb0JBQW9CLE9BQU87QUFDaEMsWUFBTTtBQUFBLElBQ1I7QUFFQSxRQUFJLEtBQUssaURBQWlEO0FBRTFELG9CQUFnQixpQkFBaUIsU0FBUyxDQUFDLEVBQUUsTUFBTSxhQUFtQjtBQUNwRSxVQUFJLEtBQUssb0JBQW9CLFNBQVM7QUFDcEM7QUFBQSxNQUNGO0FBRUEsVUFBSSxLQUNGLDBEQUNlLG1CQUFtQixRQUNwQztBQUVBLFdBQUssb0JBQW9CLE9BQU87QUFBQSxJQUNsQyxDQUFDO0FBRUQsV0FBTyxLQUFLLGdCQUFnQixVQUFVO0FBQUEsRUFDeEM7QUFBQSxFQUVRLGdCQUFnQjtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFFBQVEsQ0FBQztBQUFBLEtBTTZCO0FBQ3RDLFVBQU0sb0JBQW9CO0FBQUEsTUFDeEIsT0FBTztBQUFBLE1BQ1AsU0FBUyxLQUFLLFFBQVE7QUFBQSxTQUNuQjtBQUFBLElBQ0w7QUFFQSxVQUFNLE1BQU0sR0FBRyxLQUFLLFFBQVEsTUFBTSxRQUFRLDJCQUFHLE9BQU8saUJBQWlCO0FBRXJFLFdBQU8sOEJBQWlCO0FBQUEsTUFDdEI7QUFBQSxNQUNBO0FBQUEsTUFDQSxzQkFBc0IsS0FBSyxRQUFRO0FBQUEsTUFDbkMsU0FBUyxLQUFLLFFBQVE7QUFBQSxNQUN0QixZQUFZLEtBQUs7QUFBQSxNQUVqQixlQUFlLFFBQXNDO0FBQ25ELGVBQU8sSUFBSSxrQ0FBa0IsUUFBUSxlQUFlO0FBQUEsTUFDdEQ7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsZUFFcUIsY0FDbkIsU0FDZTtBQUNmLFFBQUksQ0FBQyxTQUFTO0FBQ1o7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLE1BQU0sUUFBUSxVQUFVO0FBQ3pDLGFBQVMsZUFBZTtBQUFBLEVBQzFCO0FBQUEsRUFFUSxrQkFDTixTQUNNO0FBQ04sUUFBSSxLQUFLLGtCQUFrQixTQUFTO0FBQ2xDO0FBQUEsSUFDRjtBQUVBLFNBQUssdUJBQXVCLENBQUM7QUFDN0IsU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyxVQUFVLGlDQUFhLE1BQU07QUFBQSxFQUNwQztBQUFBLEVBRVEsb0JBQ04sU0FDTTtBQUNOLFFBQUksS0FBSyxvQkFBb0IsU0FBUztBQUNwQztBQUFBLElBQ0Y7QUFFQSxTQUFLLGtCQUFrQjtBQUN2QixRQUFJLENBQUMsS0FBSyxnQ0FBZ0M7QUFDeEM7QUFBQSxJQUNGO0FBQ0EsaUJBQWEsS0FBSyw4QkFBOEI7QUFDaEQsU0FBSyxpQ0FBaUM7QUFBQSxFQUN4QztBQUFBLFFBRWMsb0NBQ1osVUFDZTtBQUNmLFVBQU0sVUFBVSxLQUFLO0FBQ3JCLG9DQUNFLFlBQVksUUFDWiwwQ0FDRjtBQUVBLFVBQU0sa0JBQWtCLE1BQU0sUUFBUSxVQUFVO0FBQ2hELG9DQUNFLG9CQUFvQixVQUNwQiw2Q0FDRjtBQUVBLFFBQUksS0FBSyxnQ0FBZ0M7QUFDdkM7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUNGLHFFQUNGO0FBQ0EsU0FBSyxpQ0FBaUMsV0FBVyxZQUFZO0FBQzNELFVBQUksS0FDRixtRUFDRjtBQUNBLHNCQUFnQixTQUFTO0FBR3pCLFVBQUksS0FBSyxvQkFBb0IsU0FBUztBQUNwQztBQUFBLE1BQ0Y7QUFFQSxXQUFLLG9CQUFvQixPQUFPO0FBRWhDLFVBQUk7QUFDRixjQUFNLEtBQUssMkJBQTJCO0FBQUEsTUFDeEMsU0FBUyxPQUFQO0FBQ0EsWUFBSSxLQUNGLDJFQUNtQixPQUFPLFlBQVksS0FBSyxHQUM3QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLEdBQUcsWUFBWTtBQUFBLEVBQ2pCO0FBQUEsRUFFUSxxQkFBcUIsS0FBcUM7QUFDaEUsUUFBSSxLQUFLLGdCQUFnQixTQUFTLEdBQUc7QUFDbkMsV0FBSyxxQkFBcUIsS0FBSyxHQUFHO0FBQ2xDLFVBQUksS0FDRiwyRUFDaUMsS0FBSyxxQkFBcUIsUUFDN0Q7QUFDQTtBQUFBLElBQ0Y7QUFDQSxlQUFXLFlBQVksS0FBSyxpQkFBaUI7QUFDM0MsVUFBSTtBQUNGLGlCQUFTLGNBQWMsR0FBRztBQUFBLE1BQzVCLFNBQVMsT0FBUDtBQUNBLFlBQUksS0FDRix3RUFDWSxPQUFPLFlBQVksS0FBSyxHQUN0QztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRVEsZ0JBQWdCLFNBQTJCO0FBQ2pELFFBQUksQ0FBQyxLQUFLLGFBQWE7QUFDckIsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixRQUFRLElBQUksZUFBZTtBQUNqRCxRQUFJLENBQUMsZUFBZTtBQUNsQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sQ0FBQyxPQUFPLFVBQVUsY0FBYyxNQUFNLE9BQU8sQ0FBQztBQUVwRCxRQUFJLE1BQU0sWUFBWSxNQUFNLFdBQVcsQ0FBQyxRQUFRO0FBQzlDLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxDQUFDLFVBQVUsWUFBWSxNQUFNLFNBQVMsTUFBTSxXQUFXLE1BQU0sQ0FBQyxFQUFFLE1BQ3BFLEtBQ0EsQ0FDRjtBQUVBLFdBQ0UsYUFBYSxLQUFLLFlBQVksWUFDOUIsYUFBYSxLQUFLLFlBQVk7QUFBQSxFQUVsQztBQUFBLEVBVWdCLEdBQ2QsTUFFQSxVQUNNO0FBQ04sV0FBTyxNQUFNLEdBQUcsTUFBTSxRQUFRO0FBQUEsRUFDaEM7QUFBQSxFQU1nQixLQUFLLFNBQTBCLE1BQTJCO0FBQ3hFLFdBQU8sTUFBTSxLQUFLLE1BQU0sR0FBRyxJQUFJO0FBQUEsRUFDakM7QUFDRjtBQXhsQk8iLAogICJuYW1lcyI6IFtdCn0K
