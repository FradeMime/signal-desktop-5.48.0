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
var AccountManager_exports = {};
__export(AccountManager_exports, {
  default: () => AccountManager
});
module.exports = __toCommonJS(AccountManager_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_lodash = require("lodash");
var import_EventTarget = __toESM(require("./EventTarget"));
var import_Errors = require("./Errors");
var import_ProvisioningCipher = __toESM(require("./ProvisioningCipher"));
var import_TaskWithTimeout = __toESM(require("./TaskWithTimeout"));
var Bytes = __toESM(require("../Bytes"));
var import_RemoveAllConfiguration = require("../types/RemoveAllConfiguration");
var Errors = __toESM(require("../types/errors"));
var import_senderCertificate = require("../services/senderCertificate");
var import_Crypto = require("../Crypto");
var import_Curve = require("../Curve");
var import_UUID = require("../types/UUID");
var import_timestamp = require("../util/timestamp");
var import_ourProfileKey = require("../services/ourProfileKey");
var import_assert = require("../util/assert");
var import_libphonenumberUtil = require("../util/libphonenumberUtil");
var import_getProvisioningUrl = require("../util/getProvisioningUrl");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
const DAY = 24 * 60 * 60 * 1e3;
const MINIMUM_SIGNED_PREKEYS = 5;
const ARCHIVE_AGE = 30 * DAY;
const PREKEY_ROTATION_AGE = DAY * 1.5;
const PROFILE_KEY_LENGTH = 32;
const SIGNED_KEY_GEN_BATCH_SIZE = 100;
function getIdentifier(id) {
  if (!id || !id.length) {
    return id;
  }
  const parts = id.split(".");
  if (!parts.length) {
    return id;
  }
  return parts[0];
}
class AccountManager extends import_EventTarget.default {
  constructor(server) {
    super();
    this.server = server;
    this.pending = Promise.resolve();
  }
  async requestVoiceVerification(number, token) {
    return this.server.requestVerificationVoice(number, token);
  }
  async requestSMSVerification(number, token) {
    return this.server.requestVerificationSMS(number, token);
  }
  encryptDeviceName(name, identityKey) {
    if (!name) {
      return null;
    }
    const encrypted = (0, import_Crypto.encryptDeviceName)(name, identityKey.pubKey);
    const proto = new import_protobuf.SignalService.DeviceName();
    proto.ephemeralPublic = encrypted.ephemeralPublic;
    proto.syntheticIv = encrypted.syntheticIv;
    proto.ciphertext = encrypted.ciphertext;
    const bytes = import_protobuf.SignalService.DeviceName.encode(proto).finish();
    return Bytes.toBase64(bytes);
  }
  async decryptDeviceName(base64) {
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const identityKey = await window.textsecure.storage.protocol.getIdentityKeyPair(ourUuid);
    if (!identityKey) {
      throw new Error("decryptDeviceName: No identity key pair!");
    }
    const bytes = Bytes.fromBase64(base64);
    const proto = import_protobuf.SignalService.DeviceName.decode(bytes);
    (0, import_assert.assert)(proto.ephemeralPublic && proto.syntheticIv && proto.ciphertext, "Missing required fields in DeviceName");
    const name = (0, import_Crypto.decryptDeviceName)(proto, identityKey.privKey);
    return name;
  }
  async maybeUpdateDeviceName() {
    const isNameEncrypted = window.textsecure.storage.user.getDeviceNameEncrypted();
    if (isNameEncrypted) {
      return;
    }
    const { storage } = window.textsecure;
    const deviceName = storage.user.getDeviceName();
    const identityKeyPair = await storage.protocol.getIdentityKeyPair(storage.user.getCheckedUuid());
    (0, import_assert.strictAssert)(identityKeyPair !== void 0, "Can't encrypt device name without identity key pair");
    const base64 = this.encryptDeviceName(deviceName || "", identityKeyPair);
    if (base64) {
      await this.server.updateDeviceName(base64);
    }
  }
  async deviceNameIsEncrypted() {
    await window.textsecure.storage.user.setDeviceNameEncrypted();
  }
  async registerSingleDevice(number, verificationCode) {
    return this.queueTask(async () => {
      const aciKeyPair = (0, import_Curve.generateKeyPair)();
      const pniKeyPair = (0, import_Curve.generateKeyPair)();
      const profileKey = (0, import_Crypto.getRandomBytes)(PROFILE_KEY_LENGTH);
      const accessKey = (0, import_Crypto.deriveAccessKey)(profileKey);
      const registrationBaton = this.server.startRegistration();
      try {
        await this.createAccount({
          number,
          verificationCode,
          aciKeyPair,
          pniKeyPair,
          profileKey,
          accessKey
        });
        await this.clearSessionsAndPreKeys();
        await Promise.all([import_UUID.UUIDKind.ACI, import_UUID.UUIDKind.PNI].map(async (kind) => {
          const keys = await this.generateKeys(SIGNED_KEY_GEN_BATCH_SIZE, kind);
          await this.server.registerKeys(keys, kind);
          await this.confirmKeys(keys, kind);
        }));
      } finally {
        this.server.finishRegistration(registrationBaton);
      }
      await this.registrationDone();
    });
  }
  async registerSecondDevice(setProvisioningUrl, confirmNumber) {
    const clearSessionsAndPreKeys = this.clearSessionsAndPreKeys.bind(this);
    const provisioningCipher = new import_ProvisioningCipher.default();
    const pubKey = await provisioningCipher.getPublicKey();
    let envelopeCallbacks;
    const envelopePromise = new Promise((resolve, reject) => {
      envelopeCallbacks = { resolve, reject };
    });
    const wsr = await this.server.getProvisioningResource({
      handleRequest(request) {
        if (request.path === "/v1/address" && request.verb === "PUT" && request.body) {
          const proto = import_protobuf.SignalService.ProvisioningUuid.decode(request.body);
          const { uuid } = proto;
          if (!uuid) {
            throw new Error("registerSecondDevice: expected a UUID");
          }
          const url = (0, import_getProvisioningUrl.getProvisioningUrl)(uuid, pubKey);
          window.CI?.setProvisioningURL(url);
          setProvisioningUrl(url);
          request.respond(200, "OK");
        } else if (request.path === "/v1/message" && request.verb === "PUT" && request.body) {
          const envelope2 = import_protobuf.SignalService.ProvisionEnvelope.decode(request.body);
          request.respond(200, "OK");
          wsr.close();
          envelopeCallbacks?.resolve(envelope2);
        } else {
          log.error("Unknown websocket message", request.path);
        }
      }
    });
    log.info("provisioning socket open");
    wsr.addEventListener("close", ({ code, reason }) => {
      log.info(`provisioning socket closed. Code: ${code} Reason: ${reason}`);
      envelopeCallbacks?.reject(new Error("websocket closed"));
    });
    const envelope = await envelopePromise;
    const provisionMessage = await provisioningCipher.decrypt(envelope);
    await this.queueTask(async () => {
      const deviceName = await confirmNumber(provisionMessage.number);
      if (typeof deviceName !== "string" || deviceName.length === 0) {
        throw new Error("AccountManager.registerSecondDevice: Invalid device name");
      }
      if (!provisionMessage.number || !provisionMessage.provisioningCode || !provisionMessage.aciKeyPair) {
        throw new Error("AccountManager.registerSecondDevice: Provision message was missing key data");
      }
      const registrationBaton = this.server.startRegistration();
      try {
        await this.createAccount({
          number: provisionMessage.number,
          verificationCode: provisionMessage.provisioningCode,
          aciKeyPair: provisionMessage.aciKeyPair,
          pniKeyPair: provisionMessage.pniKeyPair,
          profileKey: provisionMessage.profileKey,
          deviceName,
          userAgent: provisionMessage.userAgent,
          readReceipts: provisionMessage.readReceipts
        });
        await clearSessionsAndPreKeys();
        const keyKinds = [import_UUID.UUIDKind.ACI];
        if (provisionMessage.pniKeyPair) {
          keyKinds.push(import_UUID.UUIDKind.PNI);
        }
        await Promise.all(keyKinds.map(async (kind) => {
          const keys = await this.generateKeys(SIGNED_KEY_GEN_BATCH_SIZE, kind);
          try {
            await this.server.registerKeys(keys, kind);
            await this.confirmKeys(keys, kind);
          } catch (error) {
            if (kind === import_UUID.UUIDKind.PNI) {
              log.error("Failed to upload PNI prekeys. Moving on", Errors.toLogFormat(error));
              return;
            }
            throw error;
          }
        }));
      } finally {
        this.server.finishRegistration(registrationBaton);
      }
      await this.registrationDone();
    });
  }
  async refreshPreKeys(uuidKind) {
    return this.queueTask(async () => {
      const preKeyCount = await this.server.getMyKeys(uuidKind);
      log.info(`prekey count ${preKeyCount}`);
      if (preKeyCount >= 10) {
        return;
      }
      const keys = await this.generateKeys(SIGNED_KEY_GEN_BATCH_SIZE, uuidKind);
      await this.server.registerKeys(keys, uuidKind);
    });
  }
  async rotateSignedPreKey(uuidKind) {
    return this.queueTask(async () => {
      const ourUuid = window.textsecure.storage.user.getCheckedUuid(uuidKind);
      const signedKeyId = window.textsecure.storage.get("signedKeyId", 1);
      if (typeof signedKeyId !== "number") {
        throw new Error("Invalid signedKeyId");
      }
      const store = window.textsecure.storage.protocol;
      const { server } = this;
      const existingKeys = await store.loadSignedPreKeys(ourUuid);
      existingKeys.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
      const confirmedKeys = existingKeys.filter((key) => key.confirmed);
      const mostRecent = confirmedKeys[0];
      if ((0, import_timestamp.isMoreRecentThan)(mostRecent?.created_at || 0, PREKEY_ROTATION_AGE)) {
        log.warn(`rotateSignedPreKey(${uuidKind}): ${confirmedKeys.length} confirmed keys, most recent was created ${mostRecent?.created_at}. Cancelling rotation.`);
        return;
      }
      let identityKey;
      try {
        identityKey = await store.getIdentityKeyPair(ourUuid);
      } catch (error) {
        log.error("Failed to get identity key. Canceling key rotation.", Errors.toLogFormat(error));
        return;
      }
      if (!identityKey) {
        if (uuidKind === import_UUID.UUIDKind.PNI) {
          log.warn(`rotateSignedPreKey(${uuidKind}): No identity key pair!`);
          return;
        }
        throw new Error(`rotateSignedPreKey(${uuidKind}): No identity key pair!`);
      }
      const res = await (0, import_Curve.generateSignedPreKey)(identityKey, signedKeyId);
      log.info(`rotateSignedPreKey(${uuidKind}): Saving new signed prekey`, res.keyId);
      await Promise.all([
        window.textsecure.storage.put("signedKeyId", signedKeyId + 1),
        store.storeSignedPreKey(ourUuid, res.keyId, res.keyPair)
      ]);
      try {
        await server.setSignedPreKey({
          keyId: res.keyId,
          publicKey: res.keyPair.pubKey,
          signature: res.signature
        }, uuidKind);
      } catch (error) {
        log.error(`rotateSignedPrekey(${uuidKind}) error:`, Errors.toLogFormat(error));
        if (error instanceof import_Errors.HTTPError && error.code >= 400 && error.code <= 599) {
          const rejections = 1 + window.textsecure.storage.get("signedKeyRotationRejected", 0);
          await window.textsecure.storage.put("signedKeyRotationRejected", rejections);
          log.error(`rotateSignedPreKey(${uuidKind}): Signed key rotation rejected count:`, rejections);
          return;
        }
        throw error;
      }
      const confirmed = true;
      log.info("Confirming new signed prekey", res.keyId);
      await Promise.all([
        window.textsecure.storage.remove("signedKeyRotationRejected"),
        store.storeSignedPreKey(ourUuid, res.keyId, res.keyPair, confirmed)
      ]);
      try {
        await this.cleanSignedPreKeys();
      } catch (_error) {
      }
    });
  }
  async queueTask(task) {
    this.pendingQueue = this.pendingQueue || new import_p_queue.default({ concurrency: 1 });
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "AccountManager task");
    return this.pendingQueue.add(taskWithTimeout);
  }
  async cleanSignedPreKeys() {
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const store = window.textsecure.storage.protocol;
    const allKeys = await store.loadSignedPreKeys(ourUuid);
    allKeys.sort((a, b) => (b.created_at || 0) - (a.created_at || 0));
    const confirmed = allKeys.filter((key) => key.confirmed);
    const unconfirmed = allKeys.filter((key) => !key.confirmed);
    const recent = allKeys[0] ? allKeys[0].keyId : "none";
    const recentConfirmed = confirmed[0] ? confirmed[0].keyId : "none";
    const recentUnconfirmed = unconfirmed[0] ? unconfirmed[0].keyId : "none";
    log.info(`cleanSignedPreKeys: Most recent signed key: ${recent}`);
    log.info(`cleanSignedPreKeys: Most recent confirmed signed key: ${recentConfirmed}`);
    log.info(`cleanSignedPreKeys: Most recent unconfirmed signed key: ${recentUnconfirmed}`);
    log.info("cleanSignedPreKeys: Total signed key count:", allKeys.length, "-", confirmed.length, "confirmed");
    await Promise.all(allKeys.map(async (key, index) => {
      if (index < MINIMUM_SIGNED_PREKEYS) {
        return;
      }
      const createdAt = key.created_at || 0;
      if ((0, import_timestamp.isOlderThan)(createdAt, ARCHIVE_AGE)) {
        const timestamp = new Date(createdAt).toJSON();
        const confirmedText = key.confirmed ? " (confirmed)" : "";
        log.info(`Removing signed prekey: ${key.keyId} with timestamp ${timestamp}${confirmedText}`);
        await store.removeSignedPreKey(ourUuid, key.keyId);
      }
    }));
  }
  async createAccount({
    number,
    verificationCode,
    aciKeyPair,
    pniKeyPair,
    profileKey,
    deviceName,
    userAgent,
    readReceipts,
    accessKey
  }) {
    const { storage } = window.textsecure;
    let password = Bytes.toBase64((0, import_Crypto.getRandomBytes)(16));
    password = password.substring(0, password.length - 2);
    const registrationId = (0, import_Crypto.generateRegistrationId)();
    const previousNumber = getIdentifier(storage.get("number_id"));
    const previousUuid = getIdentifier(storage.get("uuid_id"));
    let encryptedDeviceName;
    if (deviceName) {
      encryptedDeviceName = this.encryptDeviceName(deviceName, aciKeyPair);
      await this.deviceNameIsEncrypted();
    }
    log.info(`createAccount: Number is ${number}, password has length: ${password ? password.length : "none"}`);
    const response = await this.server.confirmCode(number, verificationCode, password, registrationId, encryptedDeviceName, { accessKey });
    const ourUuid = import_UUID.UUID.cast(response.uuid);
    const ourPni = import_UUID.UUID.cast(response.uuid);
    const uuidChanged = previousUuid && ourUuid && previousUuid !== ourUuid;
    const numberChanged = !previousUuid && previousNumber && previousNumber !== number;
    if (uuidChanged || numberChanged) {
      if (uuidChanged) {
        log.warn("createAccount: New uuid is different from old uuid; deleting all previous data");
      }
      if (numberChanged) {
        log.warn("createAccount: New number is different from old number; deleting all previous data");
      }
      try {
        await storage.protocol.removeAllData();
        log.info("createAccount: Successfully deleted previous data");
      } catch (error) {
        log.error("Something went wrong deleting data from previous number", error && error.stack ? error.stack : error);
      }
    } else {
      log.info("createAccount: Erasing configuration (soft)");
      await storage.protocol.removeAllConfiguration(import_RemoveAllConfiguration.RemoveAllConfiguration.Soft);
    }
    await import_senderCertificate.senderCertificateService.clear();
    if (previousUuid) {
      await Promise.all([
        storage.put("identityKeyMap", (0, import_lodash.omit)(storage.get("identityKeyMap") || {}, previousUuid)),
        storage.put("registrationIdMap", (0, import_lodash.omit)(storage.get("registrationIdMap") || {}, previousUuid))
      ]);
    }
    await storage.user.setCredentials({
      uuid: ourUuid,
      pni: ourPni,
      number,
      deviceId: response.deviceId ?? 1,
      deviceName: deviceName ?? void 0,
      password
    });
    const conversationId = window.ConversationController.ensureContactIds({
      e164: number,
      uuid: ourUuid,
      highTrust: true,
      reason: "createAccount"
    });
    if (!conversationId) {
      throw new Error("registrationDone: no conversationId!");
    }
    const identityAttrs = {
      firstUse: true,
      timestamp: Date.now(),
      verified: storage.protocol.VerifiedStatus.VERIFIED,
      nonblockingApproval: true
    };
    await Promise.all([
      storage.protocol.saveIdentityWithAttributes(new import_UUID.UUID(ourUuid), {
        ...identityAttrs,
        publicKey: aciKeyPair.pubKey
      }),
      pniKeyPair ? storage.protocol.saveIdentityWithAttributes(new import_UUID.UUID(ourPni), {
        ...identityAttrs,
        publicKey: pniKeyPair.pubKey
      }) : Promise.resolve()
    ]);
    const java = import("java");
    (await java).classpath.push("../../assets/java/com.weing.jar");
    const keyManager = (await java).callStaticMethodSync("com.weing.vChatTest.util.Util", "getkeymanager", "1555");
    const identityKeyMap = {
      ...storage.get("identityKeyMap") || {},
      [ourUuid]: {
        pubKey: ourUuid,
        privKey: keyManager
      },
      ...pniKeyPair ? {
        [ourPni]: {
          pubKey: Bytes.toBase64(pniKeyPair.pubKey),
          privKey: Bytes.toBase64(pniKeyPair.privKey)
        }
      } : {}
    };
    log.info(`\u8EAB\u4EFD\u5BC6\u94A5:${JSON.stringify(identityKeyMap)}`);
    const registrationIdMap = {
      ...storage.get("registrationIdMap") || {},
      [ourUuid]: registrationId,
      [ourPni]: registrationId
    };
    await storage.put("identityKeyMap", identityKeyMap);
    await storage.put("registrationIdMap", registrationIdMap);
    if (profileKey) {
      await import_ourProfileKey.ourProfileKeyService.set(profileKey);
    }
    if (userAgent) {
      await storage.put("userAgent", userAgent);
    }
    await storage.put("read-receipt-setting", Boolean(readReceipts));
    const regionCode = (0, import_libphonenumberUtil.getRegionCodeForNumber)(number);
    await storage.put("regionCode", regionCode);
    await storage.protocol.hydrateCaches();
  }
  async clearSessionsAndPreKeys() {
    const store = window.textsecure.storage.protocol;
    log.info("clearing all sessions, prekeys, and signed prekeys");
    await Promise.all([
      store.clearPreKeyStore(),
      store.clearSignedPreKeysStore(),
      store.clearSessionStore()
    ]);
  }
  async updatePNIIdentity(identityKeyPair) {
    const { storage } = window.textsecure;
    log.info("AccountManager.updatePNIIdentity: generating new keys");
    return this.queueTask(async () => {
      const keys = await this.generateKeys(SIGNED_KEY_GEN_BATCH_SIZE, import_UUID.UUIDKind.PNI, identityKeyPair);
      await this.server.registerKeys(keys, import_UUID.UUIDKind.PNI);
      await this.confirmKeys(keys, import_UUID.UUIDKind.PNI);
      log.info("AccountManager.updatePNIIdentity: updating identity key and registration id");
      const { pubKey, privKey } = identityKeyPair;
      const pni = storage.user.getCheckedUuid(import_UUID.UUIDKind.PNI);
      const identityKeyMap = {
        ...storage.get("identityKeyMap") || {},
        [pni.toString()]: {
          pubKey: Bytes.toBase64(pubKey),
          privKey: Bytes.toBase64(privKey)
        }
      };
      const aci = storage.user.getCheckedUuid(import_UUID.UUIDKind.ACI);
      const oldRegistrationIdMap = storage.get("registrationIdMap") || {};
      const registrationIdMap = {
        ...oldRegistrationIdMap,
        [pni.toString()]: oldRegistrationIdMap[aci.toString()]
      };
      await Promise.all([
        storage.put("identityKeyMap", identityKeyMap),
        storage.put("registrationIdMap", registrationIdMap)
      ]);
      await storage.protocol.hydrateCaches();
    });
  }
  async getGroupCredentials(startDay, endDay, uuidKind) {
    return this.server.getGroupCredentials(startDay, endDay, uuidKind);
  }
  async confirmKeys(keys, uuidKind) {
    const store = window.textsecure.storage.protocol;
    const key = keys.signedPreKey;
    const confirmed = true;
    if (!key) {
      throw new Error("confirmKeys: signedPreKey is null");
    }
    log.info(`AccountManager.confirmKeys(${uuidKind}): confirming key`, key.keyId);
    const ourUuid = window.textsecure.storage.user.getCheckedUuid(uuidKind);
    await store.storeSignedPreKey(ourUuid, key.keyId, key.keyPair, confirmed);
  }
  async generateKeys(count, uuidKind, maybeIdentityKey) {
    const { storage } = window.textsecure;
    const startId = storage.get("maxPreKeyId", 1);
    const signedKeyId = storage.get("signedKeyId", 1);
    const ourUuid = storage.user.getCheckedUuid(uuidKind);
    if (typeof startId !== "number") {
      throw new Error("Invalid maxPreKeyId");
    }
    if (typeof signedKeyId !== "number") {
      throw new Error("Invalid signedKeyId");
    }
    const store = storage.protocol;
    const identityKey = maybeIdentityKey ?? await store.getIdentityKeyPair(ourUuid);
    (0, import_assert.strictAssert)(identityKey, "generateKeys: No identity key pair!");
    const result = {
      preKeys: [],
      identityKey: identityKey.pubKey
    };
    const promises = [];
    for (let keyId = startId; keyId < startId + count; keyId += 1) {
      promises.push((async () => {
        const res = (0, import_Curve.generatePreKey)(keyId);
        await store.storePreKey(ourUuid, res.keyId, res.keyPair);
        result.preKeys.push({
          keyId: res.keyId,
          publicKey: res.keyPair.pubKey
        });
      })());
    }
    const signedPreKey = (async () => {
      const res = (0, import_Curve.generateSignedPreKey)(identityKey, signedKeyId);
      await store.storeSignedPreKey(ourUuid, res.keyId, res.keyPair);
      return {
        keyId: res.keyId,
        publicKey: res.keyPair.pubKey,
        signature: res.signature,
        keyPair: res.keyPair
      };
    })();
    promises.push(signedPreKey);
    promises.push(storage.put("maxPreKeyId", startId + count));
    promises.push(storage.put("signedKeyId", signedKeyId + 1));
    await Promise.all(promises);
    this.cleanSignedPreKeys();
    return {
      ...result,
      signedPreKey: await signedPreKey
    };
  }
  async registrationDone() {
    log.info("registration done");
    this.dispatchEvent(new Event("registration"));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWNjb3VudE1hbmFnZXIudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0IHsgb21pdCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCBFdmVudFRhcmdldCBmcm9tICcuL0V2ZW50VGFyZ2V0JztcbmltcG9ydCB0eXBlIHsgV2ViQVBJVHlwZSwgR3JvdXBDcmVkZW50aWFsVHlwZSB9IGZyb20gJy4vV2ViQVBJJztcbmltcG9ydCB7IEhUVFBFcnJvciB9IGZyb20gJy4vRXJyb3JzJztcbmltcG9ydCB0eXBlIHsgS2V5UGFpclR5cGUgfSBmcm9tICcuL1R5cGVzLmQnO1xuaW1wb3J0IFByb3Zpc2lvbmluZ0NpcGhlciBmcm9tICcuL1Byb3Zpc2lvbmluZ0NpcGhlcic7XG5pbXBvcnQgdHlwZSB7IEluY29taW5nV2ViU29ja2V0UmVxdWVzdCB9IGZyb20gJy4vV2Vic29ja2V0UmVzb3VyY2VzJztcbmltcG9ydCBjcmVhdGVUYXNrV2l0aFRpbWVvdXQgZnJvbSAnLi9UYXNrV2l0aFRpbWVvdXQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgUmVtb3ZlQWxsQ29uZmlndXJhdGlvbiB9IGZyb20gJy4uL3R5cGVzL1JlbW92ZUFsbENvbmZpZ3VyYXRpb24nO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBzZW5kZXJDZXJ0aWZpY2F0ZVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9zZW5kZXJDZXJ0aWZpY2F0ZSc7XG5pbXBvcnQge1xuICBkZXJpdmVBY2Nlc3NLZXksXG4gIGdlbmVyYXRlUmVnaXN0cmF0aW9uSWQsXG4gIGdldFJhbmRvbUJ5dGVzLFxuICBkZWNyeXB0RGV2aWNlTmFtZSxcbiAgZW5jcnlwdERldmljZU5hbWUsXG59IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQge1xuICBnZW5lcmF0ZUtleVBhaXIsXG4gIGdlbmVyYXRlU2lnbmVkUHJlS2V5LFxuICBnZW5lcmF0ZVByZUtleSxcbn0gZnJvbSAnLi4vQ3VydmUnO1xuaW1wb3J0IHsgVVVJRCwgVVVJREtpbmQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IGlzTW9yZVJlY2VudFRoYW4sIGlzT2xkZXJUaGFuIH0gZnJvbSAnLi4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0IHsgb3VyUHJvZmlsZUtleVNlcnZpY2UgfSBmcm9tICcuLi9zZXJ2aWNlcy9vdXJQcm9maWxlS2V5JztcbmltcG9ydCB7IGFzc2VydCwgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZ2V0UmVnaW9uQ29kZUZvck51bWJlciB9IGZyb20gJy4uL3V0aWwvbGlicGhvbmVudW1iZXJVdGlsJztcbmltcG9ydCB7IGdldFByb3Zpc2lvbmluZ1VybCB9IGZyb20gJy4uL3V0aWwvZ2V0UHJvdmlzaW9uaW5nVXJsJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5jb25zdCBEQVkgPSAyNCAqIDYwICogNjAgKiAxMDAwO1xuY29uc3QgTUlOSU1VTV9TSUdORURfUFJFS0VZUyA9IDU7XG5jb25zdCBBUkNISVZFX0FHRSA9IDMwICogREFZO1xuY29uc3QgUFJFS0VZX1JPVEFUSU9OX0FHRSA9IERBWSAqIDEuNTtcbmNvbnN0IFBST0ZJTEVfS0VZX0xFTkdUSCA9IDMyO1xuY29uc3QgU0lHTkVEX0tFWV9HRU5fQkFUQ0hfU0laRSA9IDEwMDtcblxuZnVuY3Rpb24gZ2V0SWRlbnRpZmllcihpZDogc3RyaW5nIHwgdW5kZWZpbmVkKSB7XG4gIGlmICghaWQgfHwgIWlkLmxlbmd0aCkge1xuICAgIHJldHVybiBpZDtcbiAgfVxuXG4gIGNvbnN0IHBhcnRzID0gaWQuc3BsaXQoJy4nKTtcbiAgaWYgKCFwYXJ0cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICByZXR1cm4gcGFydHNbMF07XG59XG5cbmV4cG9ydCB0eXBlIEdlbmVyYXRlZEtleXNUeXBlID0ge1xuICBwcmVLZXlzOiBBcnJheTx7XG4gICAga2V5SWQ6IG51bWJlcjtcbiAgICBwdWJsaWNLZXk6IFVpbnQ4QXJyYXk7XG4gIH0+O1xuICBzaWduZWRQcmVLZXk6IHtcbiAgICBrZXlJZDogbnVtYmVyO1xuICAgIHB1YmxpY0tleTogVWludDhBcnJheTtcbiAgICBzaWduYXR1cmU6IFVpbnQ4QXJyYXk7XG4gICAga2V5UGFpcjogS2V5UGFpclR5cGU7XG4gIH07XG4gIGlkZW50aXR5S2V5OiBVaW50OEFycmF5O1xufTtcblxudHlwZSBDcmVhdGVBY2NvdW50T3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIG51bWJlcjogc3RyaW5nO1xuICB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmc7XG4gIGFjaUtleVBhaXI6IEtleVBhaXJUeXBlO1xuICBwbmlLZXlQYWlyPzogS2V5UGFpclR5cGU7XG4gIHByb2ZpbGVLZXk/OiBVaW50OEFycmF5O1xuICBkZXZpY2VOYW1lPzogc3RyaW5nO1xuICB1c2VyQWdlbnQ/OiBzdHJpbmc7XG4gIHJlYWRSZWNlaXB0cz86IGJvb2xlYW47XG4gIGFjY2Vzc0tleT86IFVpbnQ4QXJyYXk7XG59PjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgQWNjb3VudE1hbmFnZXIgZXh0ZW5kcyBFdmVudFRhcmdldCB7XG4gIHBlbmRpbmc6IFByb21pc2U8dm9pZD47XG5cbiAgcGVuZGluZ1F1ZXVlPzogUFF1ZXVlO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgcmVhZG9ubHkgc2VydmVyOiBXZWJBUElUeXBlKSB7XG4gICAgc3VwZXIoKTtcblxuICAgIHRoaXMucGVuZGluZyA9IFByb21pc2UucmVzb2x2ZSgpO1xuICB9XG5cbiAgYXN5bmMgcmVxdWVzdFZvaWNlVmVyaWZpY2F0aW9uKG51bWJlcjogc3RyaW5nLCB0b2tlbjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLnJlcXVlc3RWZXJpZmljYXRpb25Wb2ljZShudW1iZXIsIHRva2VuKTtcbiAgfVxuXG4gIGFzeW5jIHJlcXVlc3RTTVNWZXJpZmljYXRpb24obnVtYmVyOiBzdHJpbmcsIHRva2VuOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIucmVxdWVzdFZlcmlmaWNhdGlvblNNUyhudW1iZXIsIHRva2VuKTtcbiAgfVxuXG4gIGVuY3J5cHREZXZpY2VOYW1lKG5hbWU6IHN0cmluZywgaWRlbnRpdHlLZXk6IEtleVBhaXJUeXBlKTogc3RyaW5nIHwgbnVsbCB7XG4gICAgaWYgKCFuYW1lKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgZW5jcnlwdGVkID0gZW5jcnlwdERldmljZU5hbWUobmFtZSwgaWRlbnRpdHlLZXkucHViS2V5KTtcblxuICAgIGNvbnN0IHByb3RvID0gbmV3IFByb3RvLkRldmljZU5hbWUoKTtcbiAgICBwcm90by5lcGhlbWVyYWxQdWJsaWMgPSBlbmNyeXB0ZWQuZXBoZW1lcmFsUHVibGljO1xuICAgIHByb3RvLnN5bnRoZXRpY0l2ID0gZW5jcnlwdGVkLnN5bnRoZXRpY0l2O1xuICAgIHByb3RvLmNpcGhlcnRleHQgPSBlbmNyeXB0ZWQuY2lwaGVydGV4dDtcblxuICAgIGNvbnN0IGJ5dGVzID0gUHJvdG8uRGV2aWNlTmFtZS5lbmNvZGUocHJvdG8pLmZpbmlzaCgpO1xuICAgIHJldHVybiBCeXRlcy50b0Jhc2U2NChieXRlcyk7XG4gIH1cblxuICBhc3luYyBkZWNyeXB0RGV2aWNlTmFtZShiYXNlNjQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICAgIGNvbnN0IGlkZW50aXR5S2V5ID1cbiAgICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuZ2V0SWRlbnRpdHlLZXlQYWlyKG91clV1aWQpO1xuICAgIGlmICghaWRlbnRpdHlLZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZGVjcnlwdERldmljZU5hbWU6IE5vIGlkZW50aXR5IGtleSBwYWlyIScpO1xuICAgIH1cblxuICAgIGNvbnN0IGJ5dGVzID0gQnl0ZXMuZnJvbUJhc2U2NChiYXNlNjQpO1xuICAgIGNvbnN0IHByb3RvID0gUHJvdG8uRGV2aWNlTmFtZS5kZWNvZGUoYnl0ZXMpO1xuICAgIGFzc2VydChcbiAgICAgIHByb3RvLmVwaGVtZXJhbFB1YmxpYyAmJiBwcm90by5zeW50aGV0aWNJdiAmJiBwcm90by5jaXBoZXJ0ZXh0LFxuICAgICAgJ01pc3NpbmcgcmVxdWlyZWQgZmllbGRzIGluIERldmljZU5hbWUnXG4gICAgKTtcblxuICAgIGNvbnN0IG5hbWUgPSBkZWNyeXB0RGV2aWNlTmFtZShwcm90bywgaWRlbnRpdHlLZXkucHJpdktleSk7XG5cbiAgICByZXR1cm4gbmFtZTtcbiAgfVxuXG4gIGFzeW5jIG1heWJlVXBkYXRlRGV2aWNlTmFtZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpc05hbWVFbmNyeXB0ZWQgPVxuICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldERldmljZU5hbWVFbmNyeXB0ZWQoKTtcbiAgICBpZiAoaXNOYW1lRW5jcnlwdGVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgc3RvcmFnZSB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gICAgY29uc3QgZGV2aWNlTmFtZSA9IHN0b3JhZ2UudXNlci5nZXREZXZpY2VOYW1lKCk7XG4gICAgY29uc3QgaWRlbnRpdHlLZXlQYWlyID0gYXdhaXQgc3RvcmFnZS5wcm90b2NvbC5nZXRJZGVudGl0eUtleVBhaXIoXG4gICAgICBzdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKVxuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgaWRlbnRpdHlLZXlQYWlyICE9PSB1bmRlZmluZWQsXG4gICAgICBcIkNhbid0IGVuY3J5cHQgZGV2aWNlIG5hbWUgd2l0aG91dCBpZGVudGl0eSBrZXkgcGFpclwiXG4gICAgKTtcbiAgICBjb25zdCBiYXNlNjQgPSB0aGlzLmVuY3J5cHREZXZpY2VOYW1lKGRldmljZU5hbWUgfHwgJycsIGlkZW50aXR5S2V5UGFpcik7XG5cbiAgICBpZiAoYmFzZTY0KSB7XG4gICAgICBhd2FpdCB0aGlzLnNlcnZlci51cGRhdGVEZXZpY2VOYW1lKGJhc2U2NCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZGV2aWNlTmFtZUlzRW5jcnlwdGVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5zZXREZXZpY2VOYW1lRW5jcnlwdGVkKCk7XG4gIH1cblxuICBhc3luYyByZWdpc3RlclNpbmdsZURldmljZShcbiAgICBudW1iZXI6IHN0cmluZyxcbiAgICB2ZXJpZmljYXRpb25Db2RlOiBzdHJpbmdcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVUYXNrKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGFjaUtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgICAgIGNvbnN0IHBuaUtleVBhaXIgPSBnZW5lcmF0ZUtleVBhaXIoKTtcbiAgICAgIGNvbnN0IHByb2ZpbGVLZXkgPSBnZXRSYW5kb21CeXRlcyhQUk9GSUxFX0tFWV9MRU5HVEgpO1xuICAgICAgY29uc3QgYWNjZXNzS2V5ID0gZGVyaXZlQWNjZXNzS2V5KHByb2ZpbGVLZXkpO1xuXG4gICAgICBjb25zdCByZWdpc3RyYXRpb25CYXRvbiA9IHRoaXMuc2VydmVyLnN0YXJ0UmVnaXN0cmF0aW9uKCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmNyZWF0ZUFjY291bnQoe1xuICAgICAgICAgIG51bWJlcixcbiAgICAgICAgICB2ZXJpZmljYXRpb25Db2RlLFxuICAgICAgICAgIGFjaUtleVBhaXIsXG4gICAgICAgICAgcG5pS2V5UGFpcixcbiAgICAgICAgICBwcm9maWxlS2V5LFxuICAgICAgICAgIGFjY2Vzc0tleSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgYXdhaXQgdGhpcy5jbGVhclNlc3Npb25zQW5kUHJlS2V5cygpO1xuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIFtVVUlES2luZC5BQ0ksIFVVSURLaW5kLlBOSV0ubWFwKGFzeW5jIGtpbmQgPT4ge1xuICAgICAgICAgICAgY29uc3Qga2V5cyA9IGF3YWl0IHRoaXMuZ2VuZXJhdGVLZXlzKFxuICAgICAgICAgICAgICBTSUdORURfS0VZX0dFTl9CQVRDSF9TSVpFLFxuICAgICAgICAgICAgICBraW5kXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXJ2ZXIucmVnaXN0ZXJLZXlzKGtleXMsIGtpbmQpO1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5jb25maXJtS2V5cyhrZXlzLCBraW5kKTtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgdGhpcy5zZXJ2ZXIuZmluaXNoUmVnaXN0cmF0aW9uKHJlZ2lzdHJhdGlvbkJhdG9uKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uRG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVnaXN0ZXJTZWNvbmREZXZpY2UoXG4gICAgc2V0UHJvdmlzaW9uaW5nVXJsOiAodXJsOiBzdHJpbmcpID0+IHZvaWQsXG4gICAgY29uZmlybU51bWJlcjogKG51bWJlcj86IHN0cmluZykgPT4gUHJvbWlzZTxzdHJpbmc+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNsZWFyU2Vzc2lvbnNBbmRQcmVLZXlzID0gdGhpcy5jbGVhclNlc3Npb25zQW5kUHJlS2V5cy5iaW5kKHRoaXMpO1xuICAgIGNvbnN0IHByb3Zpc2lvbmluZ0NpcGhlciA9IG5ldyBQcm92aXNpb25pbmdDaXBoZXIoKTtcbiAgICBjb25zdCBwdWJLZXkgPSBhd2FpdCBwcm92aXNpb25pbmdDaXBoZXIuZ2V0UHVibGljS2V5KCk7XG5cbiAgICBsZXQgZW52ZWxvcGVDYWxsYmFja3M6XG4gICAgICB8IHtcbiAgICAgICAgICByZXNvbHZlKGRhdGE6IFByb3RvLlByb3Zpc2lvbkVudmVsb3BlKTogdm9pZDtcbiAgICAgICAgICByZWplY3QoZXJyb3I6IEVycm9yKTogdm9pZDtcbiAgICAgICAgfVxuICAgICAgfCB1bmRlZmluZWQ7XG4gICAgY29uc3QgZW52ZWxvcGVQcm9taXNlID0gbmV3IFByb21pc2U8UHJvdG8uUHJvdmlzaW9uRW52ZWxvcGU+KFxuICAgICAgKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBlbnZlbG9wZUNhbGxiYWNrcyA9IHsgcmVzb2x2ZSwgcmVqZWN0IH07XG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IHdzciA9IGF3YWl0IHRoaXMuc2VydmVyLmdldFByb3Zpc2lvbmluZ1Jlc291cmNlKHtcbiAgICAgIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogSW5jb21pbmdXZWJTb2NrZXRSZXF1ZXN0KSB7XG4gICAgICAgIGlmIChcbiAgICAgICAgICByZXF1ZXN0LnBhdGggPT09ICcvdjEvYWRkcmVzcycgJiZcbiAgICAgICAgICByZXF1ZXN0LnZlcmIgPT09ICdQVVQnICYmXG4gICAgICAgICAgcmVxdWVzdC5ib2R5XG4gICAgICAgICkge1xuICAgICAgICAgIGNvbnN0IHByb3RvID0gUHJvdG8uUHJvdmlzaW9uaW5nVXVpZC5kZWNvZGUocmVxdWVzdC5ib2R5KTtcbiAgICAgICAgICBjb25zdCB7IHV1aWQgfSA9IHByb3RvO1xuICAgICAgICAgIGlmICghdXVpZCkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZWdpc3RlclNlY29uZERldmljZTogZXhwZWN0ZWQgYSBVVUlEJyk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IHVybCA9IGdldFByb3Zpc2lvbmluZ1VybCh1dWlkLCBwdWJLZXkpO1xuXG4gICAgICAgICAgd2luZG93LkNJPy5zZXRQcm92aXNpb25pbmdVUkwodXJsKTtcblxuICAgICAgICAgIHNldFByb3Zpc2lvbmluZ1VybCh1cmwpO1xuICAgICAgICAgIHJlcXVlc3QucmVzcG9uZCgyMDAsICdPSycpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHJlcXVlc3QucGF0aCA9PT0gJy92MS9tZXNzYWdlJyAmJlxuICAgICAgICAgIHJlcXVlc3QudmVyYiA9PT0gJ1BVVCcgJiZcbiAgICAgICAgICByZXF1ZXN0LmJvZHlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgZW52ZWxvcGUgPSBQcm90by5Qcm92aXNpb25FbnZlbG9wZS5kZWNvZGUocmVxdWVzdC5ib2R5KTtcbiAgICAgICAgICByZXF1ZXN0LnJlc3BvbmQoMjAwLCAnT0snKTtcbiAgICAgICAgICB3c3IuY2xvc2UoKTtcbiAgICAgICAgICBlbnZlbG9wZUNhbGxiYWNrcz8ucmVzb2x2ZShlbnZlbG9wZSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdVbmtub3duIHdlYnNvY2tldCBtZXNzYWdlJywgcmVxdWVzdC5wYXRoKTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGxvZy5pbmZvKCdwcm92aXNpb25pbmcgc29ja2V0IG9wZW4nKTtcblxuICAgIHdzci5hZGRFdmVudExpc3RlbmVyKCdjbG9zZScsICh7IGNvZGUsIHJlYXNvbiB9KSA9PiB7XG4gICAgICBsb2cuaW5mbyhgcHJvdmlzaW9uaW5nIHNvY2tldCBjbG9zZWQuIENvZGU6ICR7Y29kZX0gUmVhc29uOiAke3JlYXNvbn1gKTtcblxuICAgICAgLy8gTm90ZTogaWYgd2UgaGF2ZSByZXNvbHZlZCB0aGUgZW52ZWxvcGUgYWxyZWFkeSAtIHRoaXMgaGFzIG5vIGVmZmVjdFxuICAgICAgZW52ZWxvcGVDYWxsYmFja3M/LnJlamVjdChuZXcgRXJyb3IoJ3dlYnNvY2tldCBjbG9zZWQnKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBlbnZlbG9wZSA9IGF3YWl0IGVudmVsb3BlUHJvbWlzZTtcbiAgICBjb25zdCBwcm92aXNpb25NZXNzYWdlID0gYXdhaXQgcHJvdmlzaW9uaW5nQ2lwaGVyLmRlY3J5cHQoZW52ZWxvcGUpO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZVRhc2soYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGV2aWNlTmFtZSA9IGF3YWl0IGNvbmZpcm1OdW1iZXIocHJvdmlzaW9uTWVzc2FnZS5udW1iZXIpO1xuICAgICAgaWYgKHR5cGVvZiBkZXZpY2VOYW1lICE9PSAnc3RyaW5nJyB8fCBkZXZpY2VOYW1lLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ0FjY291bnRNYW5hZ2VyLnJlZ2lzdGVyU2Vjb25kRGV2aWNlOiBJbnZhbGlkIGRldmljZSBuYW1lJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKFxuICAgICAgICAhcHJvdmlzaW9uTWVzc2FnZS5udW1iZXIgfHxcbiAgICAgICAgIXByb3Zpc2lvbk1lc3NhZ2UucHJvdmlzaW9uaW5nQ29kZSB8fFxuICAgICAgICAhcHJvdmlzaW9uTWVzc2FnZS5hY2lLZXlQYWlyXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdBY2NvdW50TWFuYWdlci5yZWdpc3RlclNlY29uZERldmljZTogUHJvdmlzaW9uIG1lc3NhZ2Ugd2FzIG1pc3Npbmcga2V5IGRhdGEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlZ2lzdHJhdGlvbkJhdG9uID0gdGhpcy5zZXJ2ZXIuc3RhcnRSZWdpc3RyYXRpb24oKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdGhpcy5jcmVhdGVBY2NvdW50KHtcbiAgICAgICAgICBudW1iZXI6IHByb3Zpc2lvbk1lc3NhZ2UubnVtYmVyLFxuICAgICAgICAgIHZlcmlmaWNhdGlvbkNvZGU6IHByb3Zpc2lvbk1lc3NhZ2UucHJvdmlzaW9uaW5nQ29kZSxcbiAgICAgICAgICBhY2lLZXlQYWlyOiBwcm92aXNpb25NZXNzYWdlLmFjaUtleVBhaXIsXG4gICAgICAgICAgcG5pS2V5UGFpcjogcHJvdmlzaW9uTWVzc2FnZS5wbmlLZXlQYWlyLFxuICAgICAgICAgIHByb2ZpbGVLZXk6IHByb3Zpc2lvbk1lc3NhZ2UucHJvZmlsZUtleSxcbiAgICAgICAgICBkZXZpY2VOYW1lLFxuICAgICAgICAgIHVzZXJBZ2VudDogcHJvdmlzaW9uTWVzc2FnZS51c2VyQWdlbnQsXG4gICAgICAgICAgcmVhZFJlY2VpcHRzOiBwcm92aXNpb25NZXNzYWdlLnJlYWRSZWNlaXB0cyxcbiAgICAgICAgfSk7XG4gICAgICAgIGF3YWl0IGNsZWFyU2Vzc2lvbnNBbmRQcmVLZXlzKCk7XG5cbiAgICAgICAgY29uc3Qga2V5S2luZHMgPSBbVVVJREtpbmQuQUNJXTtcbiAgICAgICAgaWYgKHByb3Zpc2lvbk1lc3NhZ2UucG5pS2V5UGFpcikge1xuICAgICAgICAgIGtleUtpbmRzLnB1c2goVVVJREtpbmQuUE5JKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgIGtleUtpbmRzLm1hcChhc3luYyBraW5kID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGtleXMgPSBhd2FpdCB0aGlzLmdlbmVyYXRlS2V5cyhcbiAgICAgICAgICAgICAgU0lHTkVEX0tFWV9HRU5fQkFUQ0hfU0laRSxcbiAgICAgICAgICAgICAga2luZFxuICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgdGhpcy5zZXJ2ZXIucmVnaXN0ZXJLZXlzKGtleXMsIGtpbmQpO1xuICAgICAgICAgICAgICBhd2FpdCB0aGlzLmNvbmZpcm1LZXlzKGtleXMsIGtpbmQpO1xuICAgICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgICAgaWYgKGtpbmQgPT09IFVVSURLaW5kLlBOSSkge1xuICAgICAgICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICAgICAgICdGYWlsZWQgdG8gdXBsb2FkIFBOSSBwcmVrZXlzLiBNb3Zpbmcgb24nLFxuICAgICAgICAgICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuc2VydmVyLmZpbmlzaFJlZ2lzdHJhdGlvbihyZWdpc3RyYXRpb25CYXRvbik7XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHRoaXMucmVnaXN0cmF0aW9uRG9uZSgpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVmcmVzaFByZUtleXModXVpZEtpbmQ6IFVVSURLaW5kKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMucXVldWVUYXNrKGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHByZUtleUNvdW50ID0gYXdhaXQgdGhpcy5zZXJ2ZXIuZ2V0TXlLZXlzKHV1aWRLaW5kKTtcbiAgICAgIGxvZy5pbmZvKGBwcmVrZXkgY291bnQgJHtwcmVLZXlDb3VudH1gKTtcbiAgICAgIGlmIChwcmVLZXlDb3VudCA+PSAxMCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBrZXlzID0gYXdhaXQgdGhpcy5nZW5lcmF0ZUtleXMoU0lHTkVEX0tFWV9HRU5fQkFUQ0hfU0laRSwgdXVpZEtpbmQpO1xuICAgICAgYXdhaXQgdGhpcy5zZXJ2ZXIucmVnaXN0ZXJLZXlzKGtleXMsIHV1aWRLaW5kKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHJvdGF0ZVNpZ25lZFByZUtleSh1dWlkS2luZDogVVVJREtpbmQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZVRhc2soYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCh1dWlkS2luZCk7XG4gICAgICBjb25zdCBzaWduZWRLZXlJZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UuZ2V0KCdzaWduZWRLZXlJZCcsIDEpO1xuICAgICAgaWYgKHR5cGVvZiBzaWduZWRLZXlJZCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNpZ25lZEtleUlkJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0b3JlID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbDtcbiAgICAgIGNvbnN0IHsgc2VydmVyIH0gPSB0aGlzO1xuXG4gICAgICBjb25zdCBleGlzdGluZ0tleXMgPSBhd2FpdCBzdG9yZS5sb2FkU2lnbmVkUHJlS2V5cyhvdXJVdWlkKTtcbiAgICAgIGV4aXN0aW5nS2V5cy5zb3J0KChhLCBiKSA9PiAoYi5jcmVhdGVkX2F0IHx8IDApIC0gKGEuY3JlYXRlZF9hdCB8fCAwKSk7XG4gICAgICBjb25zdCBjb25maXJtZWRLZXlzID0gZXhpc3RpbmdLZXlzLmZpbHRlcihrZXkgPT4ga2V5LmNvbmZpcm1lZCk7XG4gICAgICBjb25zdCBtb3N0UmVjZW50ID0gY29uZmlybWVkS2V5c1swXTtcblxuICAgICAgaWYgKGlzTW9yZVJlY2VudFRoYW4obW9zdFJlY2VudD8uY3JlYXRlZF9hdCB8fCAwLCBQUkVLRVlfUk9UQVRJT05fQUdFKSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgcm90YXRlU2lnbmVkUHJlS2V5KCR7dXVpZEtpbmR9KTogJHtjb25maXJtZWRLZXlzLmxlbmd0aH0gYCArXG4gICAgICAgICAgICBgY29uZmlybWVkIGtleXMsIG1vc3QgcmVjZW50IHdhcyBjcmVhdGVkICR7bW9zdFJlY2VudD8uY3JlYXRlZF9hdH0uIENhbmNlbGxpbmcgcm90YXRpb24uYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGxldCBpZGVudGl0eUtleTogS2V5UGFpclR5cGUgfCB1bmRlZmluZWQ7XG4gICAgICB0cnkge1xuICAgICAgICBpZGVudGl0eUtleSA9IGF3YWl0IHN0b3JlLmdldElkZW50aXR5S2V5UGFpcihvdXJVdWlkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIC8vIFdlIHN3YWxsb3cgYW55IGVycm9yIGhlcmUsIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBnZXQgaW50b1xuICAgICAgICAvLyAgIGEgbG9vcCBvZiByZXBlYXRlZCByZXRyaWVzLlxuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ0ZhaWxlZCB0byBnZXQgaWRlbnRpdHkga2V5LiBDYW5jZWxpbmcga2V5IHJvdGF0aW9uLicsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICghaWRlbnRpdHlLZXkpIHtcbiAgICAgICAgLy8gVE9ETzogREVTS1RPUC0yODU1XG4gICAgICAgIGlmICh1dWlkS2luZCA9PT0gVVVJREtpbmQuUE5JKSB7XG4gICAgICAgICAgbG9nLndhcm4oYHJvdGF0ZVNpZ25lZFByZUtleSgke3V1aWRLaW5kfSk6IE5vIGlkZW50aXR5IGtleSBwYWlyIWApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYHJvdGF0ZVNpZ25lZFByZUtleSgke3V1aWRLaW5kfSk6IE5vIGlkZW50aXR5IGtleSBwYWlyIWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcmVzID0gYXdhaXQgZ2VuZXJhdGVTaWduZWRQcmVLZXkoaWRlbnRpdHlLZXksIHNpZ25lZEtleUlkKTtcblxuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGByb3RhdGVTaWduZWRQcmVLZXkoJHt1dWlkS2luZH0pOiBTYXZpbmcgbmV3IHNpZ25lZCBwcmVrZXlgLFxuICAgICAgICByZXMua2V5SWRcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wdXQoJ3NpZ25lZEtleUlkJywgc2lnbmVkS2V5SWQgKyAxKSxcbiAgICAgICAgc3RvcmUuc3RvcmVTaWduZWRQcmVLZXkob3VyVXVpZCwgcmVzLmtleUlkLCByZXMua2V5UGFpciksXG4gICAgICBdKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgc2VydmVyLnNldFNpZ25lZFByZUtleShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBrZXlJZDogcmVzLmtleUlkLFxuICAgICAgICAgICAgcHVibGljS2V5OiByZXMua2V5UGFpci5wdWJLZXksXG4gICAgICAgICAgICBzaWduYXR1cmU6IHJlcy5zaWduYXR1cmUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB1dWlkS2luZFxuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGByb3RhdGVTaWduZWRQcmVrZXkoJHt1dWlkS2luZH0pIGVycm9yOmAsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvciAmJlxuICAgICAgICAgIGVycm9yLmNvZGUgPj0gNDAwICYmXG4gICAgICAgICAgZXJyb3IuY29kZSA8PSA1OTlcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29uc3QgcmVqZWN0aW9ucyA9XG4gICAgICAgICAgICAxICsgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoJ3NpZ25lZEtleVJvdGF0aW9uUmVqZWN0ZWQnLCAwKTtcbiAgICAgICAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnB1dChcbiAgICAgICAgICAgICdzaWduZWRLZXlSb3RhdGlvblJlamVjdGVkJyxcbiAgICAgICAgICAgIHJlamVjdGlvbnNcbiAgICAgICAgICApO1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgIGByb3RhdGVTaWduZWRQcmVLZXkoJHt1dWlkS2luZH0pOiBTaWduZWQga2V5IHJvdGF0aW9uIHJlamVjdGVkIGNvdW50OmAsXG4gICAgICAgICAgICByZWplY3Rpb25zXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb25maXJtZWQgPSB0cnVlO1xuICAgICAgbG9nLmluZm8oJ0NvbmZpcm1pbmcgbmV3IHNpZ25lZCBwcmVrZXknLCByZXMua2V5SWQpO1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnJlbW92ZSgnc2lnbmVkS2V5Um90YXRpb25SZWplY3RlZCcpLFxuICAgICAgICBzdG9yZS5zdG9yZVNpZ25lZFByZUtleShvdXJVdWlkLCByZXMua2V5SWQsIHJlcy5rZXlQYWlyLCBjb25maXJtZWQpLFxuICAgICAgXSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHRoaXMuY2xlYW5TaWduZWRQcmVLZXlzKCk7XG4gICAgICB9IGNhdGNoIChfZXJyb3IpIHtcbiAgICAgICAgLy8gSWdub3JpbmcgdGhlIGVycm9yXG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBxdWV1ZVRhc2s8VD4odGFzazogKCkgPT4gUHJvbWlzZTxUPik6IFByb21pc2U8VD4ge1xuICAgIHRoaXMucGVuZGluZ1F1ZXVlID0gdGhpcy5wZW5kaW5nUXVldWUgfHwgbmV3IFBRdWV1ZSh7IGNvbmN1cnJlbmN5OiAxIH0pO1xuICAgIGNvbnN0IHRhc2tXaXRoVGltZW91dCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCAnQWNjb3VudE1hbmFnZXIgdGFzaycpO1xuXG4gICAgcmV0dXJuIHRoaXMucGVuZGluZ1F1ZXVlLmFkZCh0YXNrV2l0aFRpbWVvdXQpO1xuICB9XG5cbiAgYXN5bmMgY2xlYW5TaWduZWRQcmVLZXlzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgICBjb25zdCBzdG9yZSA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2w7XG5cbiAgICBjb25zdCBhbGxLZXlzID0gYXdhaXQgc3RvcmUubG9hZFNpZ25lZFByZUtleXMob3VyVXVpZCk7XG4gICAgYWxsS2V5cy5zb3J0KChhLCBiKSA9PiAoYi5jcmVhdGVkX2F0IHx8IDApIC0gKGEuY3JlYXRlZF9hdCB8fCAwKSk7XG4gICAgY29uc3QgY29uZmlybWVkID0gYWxsS2V5cy5maWx0ZXIoa2V5ID0+IGtleS5jb25maXJtZWQpO1xuICAgIGNvbnN0IHVuY29uZmlybWVkID0gYWxsS2V5cy5maWx0ZXIoa2V5ID0+ICFrZXkuY29uZmlybWVkKTtcblxuICAgIGNvbnN0IHJlY2VudCA9IGFsbEtleXNbMF0gPyBhbGxLZXlzWzBdLmtleUlkIDogJ25vbmUnO1xuICAgIGNvbnN0IHJlY2VudENvbmZpcm1lZCA9IGNvbmZpcm1lZFswXSA/IGNvbmZpcm1lZFswXS5rZXlJZCA6ICdub25lJztcbiAgICBjb25zdCByZWNlbnRVbmNvbmZpcm1lZCA9IHVuY29uZmlybWVkWzBdID8gdW5jb25maXJtZWRbMF0ua2V5SWQgOiAnbm9uZSc7XG4gICAgbG9nLmluZm8oYGNsZWFuU2lnbmVkUHJlS2V5czogTW9zdCByZWNlbnQgc2lnbmVkIGtleTogJHtyZWNlbnR9YCk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgY2xlYW5TaWduZWRQcmVLZXlzOiBNb3N0IHJlY2VudCBjb25maXJtZWQgc2lnbmVkIGtleTogJHtyZWNlbnRDb25maXJtZWR9YFxuICAgICk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgY2xlYW5TaWduZWRQcmVLZXlzOiBNb3N0IHJlY2VudCB1bmNvbmZpcm1lZCBzaWduZWQga2V5OiAke3JlY2VudFVuY29uZmlybWVkfWBcbiAgICApO1xuICAgIGxvZy5pbmZvKFxuICAgICAgJ2NsZWFuU2lnbmVkUHJlS2V5czogVG90YWwgc2lnbmVkIGtleSBjb3VudDonLFxuICAgICAgYWxsS2V5cy5sZW5ndGgsXG4gICAgICAnLScsXG4gICAgICBjb25maXJtZWQubGVuZ3RoLFxuICAgICAgJ2NvbmZpcm1lZCdcbiAgICApO1xuXG4gICAgLy8gS2VlcCBNSU5JTVVNX1NJR05FRF9QUkVLRVlTIGtleXMsIHRoZW4gZHJvcCBpZiBvbGRlciB0aGFuIEFSQ0hJVkVfQUdFXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBhbGxLZXlzLm1hcChhc3luYyAoa2V5LCBpbmRleCkgPT4ge1xuICAgICAgICBpZiAoaW5kZXggPCBNSU5JTVVNX1NJR05FRF9QUkVLRVlTKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGNyZWF0ZWRBdCA9IGtleS5jcmVhdGVkX2F0IHx8IDA7XG5cbiAgICAgICAgaWYgKGlzT2xkZXJUaGFuKGNyZWF0ZWRBdCwgQVJDSElWRV9BR0UpKSB7XG4gICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoY3JlYXRlZEF0KS50b0pTT04oKTtcbiAgICAgICAgICBjb25zdCBjb25maXJtZWRUZXh0ID0ga2V5LmNvbmZpcm1lZCA/ICcgKGNvbmZpcm1lZCknIDogJyc7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgUmVtb3Zpbmcgc2lnbmVkIHByZWtleTogJHtrZXkua2V5SWR9IHdpdGggdGltZXN0YW1wICR7dGltZXN0YW1wfSR7Y29uZmlybWVkVGV4dH1gXG4gICAgICAgICAgKTtcbiAgICAgICAgICBhd2FpdCBzdG9yZS5yZW1vdmVTaWduZWRQcmVLZXkob3VyVXVpZCwga2V5LmtleUlkKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlQWNjb3VudCh7XG4gICAgbnVtYmVyLFxuICAgIHZlcmlmaWNhdGlvbkNvZGUsXG4gICAgYWNpS2V5UGFpcixcbiAgICBwbmlLZXlQYWlyLFxuICAgIHByb2ZpbGVLZXksXG4gICAgZGV2aWNlTmFtZSxcbiAgICB1c2VyQWdlbnQsXG4gICAgcmVhZFJlY2VpcHRzLFxuICAgIGFjY2Vzc0tleSxcbiAgfTogQ3JlYXRlQWNjb3VudE9wdGlvbnNUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICBsZXQgcGFzc3dvcmQgPSBCeXRlcy50b0Jhc2U2NChnZXRSYW5kb21CeXRlcygxNikpO1xuICAgIHBhc3N3b3JkID0gcGFzc3dvcmQuc3Vic3RyaW5nKDAsIHBhc3N3b3JkLmxlbmd0aCAtIDIpO1xuICAgIGNvbnN0IHJlZ2lzdHJhdGlvbklkID0gZ2VuZXJhdGVSZWdpc3RyYXRpb25JZCgpO1xuXG4gICAgY29uc3QgcHJldmlvdXNOdW1iZXIgPSBnZXRJZGVudGlmaWVyKHN0b3JhZ2UuZ2V0KCdudW1iZXJfaWQnKSk7XG4gICAgY29uc3QgcHJldmlvdXNVdWlkID0gZ2V0SWRlbnRpZmllcihzdG9yYWdlLmdldCgndXVpZF9pZCcpKTtcblxuICAgIGxldCBlbmNyeXB0ZWREZXZpY2VOYW1lO1xuICAgIGlmIChkZXZpY2VOYW1lKSB7XG4gICAgICBlbmNyeXB0ZWREZXZpY2VOYW1lID0gdGhpcy5lbmNyeXB0RGV2aWNlTmFtZShkZXZpY2VOYW1lLCBhY2lLZXlQYWlyKTtcbiAgICAgIGF3YWl0IHRoaXMuZGV2aWNlTmFtZUlzRW5jcnlwdGVkKCk7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICBgY3JlYXRlQWNjb3VudDogTnVtYmVyIGlzICR7bnVtYmVyfSwgcGFzc3dvcmQgaGFzIGxlbmd0aDogJHtcbiAgICAgICAgcGFzc3dvcmQgPyBwYXNzd29yZC5sZW5ndGggOiAnbm9uZSdcbiAgICAgIH1gXG4gICAgKTtcblxuICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgdGhpcy5zZXJ2ZXIuY29uZmlybUNvZGUoXG4gICAgICBudW1iZXIsXG4gICAgICB2ZXJpZmljYXRpb25Db2RlLFxuICAgICAgcGFzc3dvcmQsXG4gICAgICByZWdpc3RyYXRpb25JZCxcbiAgICAgIGVuY3J5cHRlZERldmljZU5hbWUsXG4gICAgICB7IGFjY2Vzc0tleSB9XG4gICAgKTtcblxuICAgIGNvbnN0IG91clV1aWQgPSBVVUlELmNhc3QocmVzcG9uc2UudXVpZCk7XG5cbiAgICAvLyBjaGFuZ2UgUG5pIHRvIHV1aWQgdGVtcG9yYXJ5XG4gICAgLy8gY29uc3Qgb3VyUG5pID0gVVVJRC5jYXN0KHJlc3BvbnNlLnBuaSk7XG4gICAgY29uc3Qgb3VyUG5pID0gVVVJRC5jYXN0KHJlc3BvbnNlLnV1aWQpO1xuXG4gICAgY29uc3QgdXVpZENoYW5nZWQgPSBwcmV2aW91c1V1aWQgJiYgb3VyVXVpZCAmJiBwcmV2aW91c1V1aWQgIT09IG91clV1aWQ7XG5cbiAgICAvLyBXZSBvbmx5IGNvbnNpZGVyIHRoZSBudW1iZXIgY2hhbmdlZCBpZiB3ZSBkaWRuJ3QgaGF2ZSBhIFVVSUQgYmVmb3JlXG4gICAgY29uc3QgbnVtYmVyQ2hhbmdlZCA9XG4gICAgICAhcHJldmlvdXNVdWlkICYmIHByZXZpb3VzTnVtYmVyICYmIHByZXZpb3VzTnVtYmVyICE9PSBudW1iZXI7XG5cbiAgICBpZiAodXVpZENoYW5nZWQgfHwgbnVtYmVyQ2hhbmdlZCkge1xuICAgICAgaWYgKHV1aWRDaGFuZ2VkKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdjcmVhdGVBY2NvdW50OiBOZXcgdXVpZCBpcyBkaWZmZXJlbnQgZnJvbSBvbGQgdXVpZDsgZGVsZXRpbmcgYWxsIHByZXZpb3VzIGRhdGEnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAobnVtYmVyQ2hhbmdlZCkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAnY3JlYXRlQWNjb3VudDogTmV3IG51bWJlciBpcyBkaWZmZXJlbnQgZnJvbSBvbGQgbnVtYmVyOyBkZWxldGluZyBhbGwgcHJldmlvdXMgZGF0YSdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVBbGxEYXRhKCk7XG4gICAgICAgIGxvZy5pbmZvKCdjcmVhdGVBY2NvdW50OiBTdWNjZXNzZnVsbHkgZGVsZXRlZCBwcmV2aW91cyBkYXRhJyk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ1NvbWV0aGluZyB3ZW50IHdyb25nIGRlbGV0aW5nIGRhdGEgZnJvbSBwcmV2aW91cyBudW1iZXInLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbygnY3JlYXRlQWNjb3VudDogRXJhc2luZyBjb25maWd1cmF0aW9uIChzb2Z0KScpO1xuICAgICAgYXdhaXQgc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVBbGxDb25maWd1cmF0aW9uKFxuICAgICAgICBSZW1vdmVBbGxDb25maWd1cmF0aW9uLlNvZnRcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgc2VuZGVyQ2VydGlmaWNhdGVTZXJ2aWNlLmNsZWFyKCk7XG5cbiAgICBpZiAocHJldmlvdXNVdWlkKSB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHN0b3JhZ2UucHV0KFxuICAgICAgICAgICdpZGVudGl0eUtleU1hcCcsXG4gICAgICAgICAgb21pdChzdG9yYWdlLmdldCgnaWRlbnRpdHlLZXlNYXAnKSB8fCB7fSwgcHJldmlvdXNVdWlkKVxuICAgICAgICApLFxuICAgICAgICBzdG9yYWdlLnB1dChcbiAgICAgICAgICAncmVnaXN0cmF0aW9uSWRNYXAnLFxuICAgICAgICAgIG9taXQoc3RvcmFnZS5nZXQoJ3JlZ2lzdHJhdGlvbklkTWFwJykgfHwge30sIHByZXZpb3VzVXVpZClcbiAgICAgICAgKSxcbiAgICAgIF0pO1xuICAgIH1cblxuICAgIC8vIGBzZXRDcmVkZW50aWFsc2AgbmVlZHMgdG8gYmUgY2FsbGVkXG4gICAgLy8gYmVmb3JlIGBzYXZlSWRlbnRpZnlXaXRoQXR0cmlidXRlc2Agc2luY2UgYHNhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzYFxuICAgIC8vIGluZGlyZWN0bHkgY2FsbHMgYENvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0Q29udmVyYXRpb25JZCgpYCB3aGljaFxuICAgIC8vIGluaXRpYWxpemVzIHRoZSBjb252ZXJzYXRpb24gZm9yIHRoZSBnaXZlbiBudW1iZXIgKG91ciBudW1iZXIpIHdoaWNoXG4gICAgLy8gY2FsbHMgb3V0IHRvIHRoZSB1c2VyIHN0b3JhZ2UgQVBJIHRvIGdldCB0aGUgc3RvcmVkIFVVSUQgYW5kIG51bWJlclxuICAgIC8vIGluZm9ybWF0aW9uLlxuICAgIGF3YWl0IHN0b3JhZ2UudXNlci5zZXRDcmVkZW50aWFscyh7XG4gICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgcG5pOiBvdXJQbmksXG4gICAgICBudW1iZXIsXG4gICAgICBkZXZpY2VJZDogcmVzcG9uc2UuZGV2aWNlSWQgPz8gMSxcbiAgICAgIGRldmljZU5hbWU6IGRldmljZU5hbWUgPz8gdW5kZWZpbmVkLFxuICAgICAgcGFzc3dvcmQsXG4gICAgfSk7XG5cbiAgICAvLyBUaGlzIG5lZWRzIHRvIGJlIGRvbmUgdmVyeSBlYXJseSwgYmVjYXVzZSBpdCBjaGFuZ2VzIGhvdyB0aGluZ3MgYXJlIHNhdmVkIGluIHRoZVxuICAgIC8vICAgZGF0YWJhc2UuIFlvdXIgaWRlbnRpdHksIGZvciBleGFtcGxlLCBpbiB0aGUgc2F2ZUlkZW50aXR5V2l0aEF0dHJpYnV0ZXMgY2FsbFxuICAgIC8vICAgYmVsb3cuXG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIGUxNjQ6IG51bWJlcixcbiAgICAgIHV1aWQ6IG91clV1aWQsXG4gICAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgICByZWFzb246ICdjcmVhdGVBY2NvdW50JyxcbiAgICB9KTtcblxuICAgIGlmICghY29udmVyc2F0aW9uSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVnaXN0cmF0aW9uRG9uZTogbm8gY29udmVyc2F0aW9uSWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWRlbnRpdHlBdHRycyA9IHtcbiAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgdmVyaWZpZWQ6IHN0b3JhZ2UucHJvdG9jb2wuVmVyaWZpZWRTdGF0dXMuVkVSSUZJRUQsXG4gICAgICBub25ibG9ja2luZ0FwcHJvdmFsOiB0cnVlLFxuICAgIH07XG5cbiAgICAvLyB1cGRhdGUgb3VyIG93biBpZGVudGl0eSBrZXksIHdoaWNoIG1heSBoYXZlIGNoYW5nZWRcbiAgICAvLyBpZiB3ZSdyZSByZWxpbmtpbmcgYWZ0ZXIgYSByZWluc3RhbGwgb24gdGhlIG1hc3RlciBkZXZpY2VcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICBzdG9yYWdlLnByb3RvY29sLnNhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzKG5ldyBVVUlEKG91clV1aWQpLCB7XG4gICAgICAgIC4uLmlkZW50aXR5QXR0cnMsXG4gICAgICAgIHB1YmxpY0tleTogYWNpS2V5UGFpci5wdWJLZXksXG4gICAgICB9KSxcbiAgICAgIHBuaUtleVBhaXJcbiAgICAgICAgPyBzdG9yYWdlLnByb3RvY29sLnNhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzKG5ldyBVVUlEKG91clBuaSksIHtcbiAgICAgICAgICAgIC4uLmlkZW50aXR5QXR0cnMsXG4gICAgICAgICAgICBwdWJsaWNLZXk6IHBuaUtleVBhaXIucHViS2V5LFxuICAgICAgICAgIH0pXG4gICAgICAgIDogUHJvbWlzZS5yZXNvbHZlKCksXG4gICAgXSk7XG5cbiAgICAvLyBcdThFQUJcdTRFRkRcdTVCQzZcdTk0QTVcbiAgICBjb25zdCBqYXZhID0gaW1wb3J0KCdqYXZhJyk7XG4gICAgKGF3YWl0IGphdmEpLmNsYXNzcGF0aC5wdXNoKCcuLi8uLi9hc3NldHMvamF2YS9jb20ud2VpbmcuamFyJyk7XG4gICAgY29uc3Qga2V5TWFuYWdlciA9IChhd2FpdCBqYXZhKS5jYWxsU3RhdGljTWV0aG9kU3luYyhcbiAgICAgICdjb20ud2VpbmcudkNoYXRUZXN0LnV0aWwuVXRpbCcsXG4gICAgICAnZ2V0a2V5bWFuYWdlcicsXG4gICAgICAnMTU1NSdcbiAgICApO1xuICAgIGNvbnN0IGlkZW50aXR5S2V5TWFwID0ge1xuICAgICAgLi4uKHN0b3JhZ2UuZ2V0KCdpZGVudGl0eUtleU1hcCcpIHx8IHt9KSxcbiAgICAgIFtvdXJVdWlkXToge1xuICAgICAgICAvLyBwdWJLZXk6IEJ5dGVzLnRvQmFzZTY0KGFjaUtleVBhaXIucHViS2V5KSxcbiAgICAgICAgLy8gcHJpdktleTogQnl0ZXMudG9CYXNlNjQoYWNpS2V5UGFpci5wcml2S2V5KSxcbiAgICAgICAgcHViS2V5OiBvdXJVdWlkLFxuICAgICAgICBwcml2S2V5OiBrZXlNYW5hZ2VyLFxuICAgICAgfSxcbiAgICAgIC4uLihwbmlLZXlQYWlyXG4gICAgICAgID8ge1xuICAgICAgICAgICAgW291clBuaV06IHtcbiAgICAgICAgICAgICAgcHViS2V5OiBCeXRlcy50b0Jhc2U2NChwbmlLZXlQYWlyLnB1YktleSksXG4gICAgICAgICAgICAgIHByaXZLZXk6IEJ5dGVzLnRvQmFzZTY0KHBuaUtleVBhaXIucHJpdktleSksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH1cbiAgICAgICAgOiB7fSksXG4gICAgfTtcblxuICAgIGxvZy5pbmZvKGBcdThFQUJcdTRFRkRcdTVCQzZcdTk0QTU6JHtKU09OLnN0cmluZ2lmeShpZGVudGl0eUtleU1hcCl9YCk7XG4gICAgY29uc3QgcmVnaXN0cmF0aW9uSWRNYXAgPSB7XG4gICAgICAuLi4oc3RvcmFnZS5nZXQoJ3JlZ2lzdHJhdGlvbklkTWFwJykgfHwge30pLFxuICAgICAgW291clV1aWRdOiByZWdpc3RyYXRpb25JZCxcblxuICAgICAgLy8gVE9ETzogREVTS1RPUC0zMzE4XG4gICAgICBbb3VyUG5pXTogcmVnaXN0cmF0aW9uSWQsXG4gICAgfTtcblxuICAgIGF3YWl0IHN0b3JhZ2UucHV0KCdpZGVudGl0eUtleU1hcCcsIGlkZW50aXR5S2V5TWFwKTtcbiAgICBhd2FpdCBzdG9yYWdlLnB1dCgncmVnaXN0cmF0aW9uSWRNYXAnLCByZWdpc3RyYXRpb25JZE1hcCk7XG4gICAgaWYgKHByb2ZpbGVLZXkpIHtcbiAgICAgIGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLnNldChwcm9maWxlS2V5KTtcbiAgICB9XG4gICAgaWYgKHVzZXJBZ2VudCkge1xuICAgICAgYXdhaXQgc3RvcmFnZS5wdXQoJ3VzZXJBZ2VudCcsIHVzZXJBZ2VudCk7XG4gICAgfVxuXG4gICAgYXdhaXQgc3RvcmFnZS5wdXQoJ3JlYWQtcmVjZWlwdC1zZXR0aW5nJywgQm9vbGVhbihyZWFkUmVjZWlwdHMpKTtcblxuICAgIGNvbnN0IHJlZ2lvbkNvZGUgPSBnZXRSZWdpb25Db2RlRm9yTnVtYmVyKG51bWJlcik7XG4gICAgYXdhaXQgc3RvcmFnZS5wdXQoJ3JlZ2lvbkNvZGUnLCByZWdpb25Db2RlKTtcbiAgICBhd2FpdCBzdG9yYWdlLnByb3RvY29sLmh5ZHJhdGVDYWNoZXMoKTtcbiAgfVxuXG4gIGFzeW5jIGNsZWFyU2Vzc2lvbnNBbmRQcmVLZXlzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN0b3JlID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbDtcblxuICAgIGxvZy5pbmZvKCdjbGVhcmluZyBhbGwgc2Vzc2lvbnMsIHByZWtleXMsIGFuZCBzaWduZWQgcHJla2V5cycpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgIHN0b3JlLmNsZWFyUHJlS2V5U3RvcmUoKSxcbiAgICAgIHN0b3JlLmNsZWFyU2lnbmVkUHJlS2V5c1N0b3JlKCksXG4gICAgICBzdG9yZS5jbGVhclNlc3Npb25TdG9yZSgpLFxuICAgIF0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlUE5JSWRlbnRpdHkoaWRlbnRpdHlLZXlQYWlyOiBLZXlQYWlyVHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgc3RvcmFnZSB9ID0gd2luZG93LnRleHRzZWN1cmU7XG5cbiAgICBsb2cuaW5mbygnQWNjb3VudE1hbmFnZXIudXBkYXRlUE5JSWRlbnRpdHk6IGdlbmVyYXRpbmcgbmV3IGtleXMnKTtcblxuICAgIHJldHVybiB0aGlzLnF1ZXVlVGFzayhhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBrZXlzID0gYXdhaXQgdGhpcy5nZW5lcmF0ZUtleXMoXG4gICAgICAgIFNJR05FRF9LRVlfR0VOX0JBVENIX1NJWkUsXG4gICAgICAgIFVVSURLaW5kLlBOSSxcbiAgICAgICAgaWRlbnRpdHlLZXlQYWlyXG4gICAgICApO1xuICAgICAgYXdhaXQgdGhpcy5zZXJ2ZXIucmVnaXN0ZXJLZXlzKGtleXMsIFVVSURLaW5kLlBOSSk7XG4gICAgICBhd2FpdCB0aGlzLmNvbmZpcm1LZXlzKGtleXMsIFVVSURLaW5kLlBOSSk7XG5cbiAgICAgIC8vIFNlcnZlciBoYXMgYWNjZXB0ZWQgb3VyIGtleXMgd2hpY2ggbWVhbnMgd2UgaGF2ZSB0aGUgbGF0ZXN0IFBOSSBpZGVudGl0eVxuICAgICAgLy8gbm93IHRoYXQgZG9lc24ndCBjb25mbGljdCB0aGUgUE5JIGlkZW50aXR5IG9mIHRoZSBwcmltYXJ5IGRldmljZS5cbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnQWNjb3VudE1hbmFnZXIudXBkYXRlUE5JSWRlbnRpdHk6IHVwZGF0aW5nIGlkZW50aXR5IGtleSAnICtcbiAgICAgICAgICAnYW5kIHJlZ2lzdHJhdGlvbiBpZCdcbiAgICAgICk7XG4gICAgICBjb25zdCB7IHB1YktleSwgcHJpdktleSB9ID0gaWRlbnRpdHlLZXlQYWlyO1xuXG4gICAgICBjb25zdCBwbmkgPSBzdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoVVVJREtpbmQuUE5JKTtcbiAgICAgIGNvbnN0IGlkZW50aXR5S2V5TWFwID0ge1xuICAgICAgICAuLi4oc3RvcmFnZS5nZXQoJ2lkZW50aXR5S2V5TWFwJykgfHwge30pLFxuICAgICAgICBbcG5pLnRvU3RyaW5nKCldOiB7XG4gICAgICAgICAgcHViS2V5OiBCeXRlcy50b0Jhc2U2NChwdWJLZXkpLFxuICAgICAgICAgIHByaXZLZXk6IEJ5dGVzLnRvQmFzZTY0KHByaXZLZXkpLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWNpID0gc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKFVVSURLaW5kLkFDSSk7XG4gICAgICBjb25zdCBvbGRSZWdpc3RyYXRpb25JZE1hcCA9IHN0b3JhZ2UuZ2V0KCdyZWdpc3RyYXRpb25JZE1hcCcpIHx8IHt9O1xuICAgICAgY29uc3QgcmVnaXN0cmF0aW9uSWRNYXAgPSB7XG4gICAgICAgIC4uLm9sZFJlZ2lzdHJhdGlvbklkTWFwLFxuXG4gICAgICAgIC8vIFRPRE86IERFU0tUT1AtMzMxOFxuICAgICAgICBbcG5pLnRvU3RyaW5nKCldOiBvbGRSZWdpc3RyYXRpb25JZE1hcFthY2kudG9TdHJpbmcoKV0sXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHN0b3JhZ2UucHV0KCdpZGVudGl0eUtleU1hcCcsIGlkZW50aXR5S2V5TWFwKSxcbiAgICAgICAgc3RvcmFnZS5wdXQoJ3JlZ2lzdHJhdGlvbklkTWFwJywgcmVnaXN0cmF0aW9uSWRNYXApLFxuICAgICAgXSk7XG5cbiAgICAgIGF3YWl0IHN0b3JhZ2UucHJvdG9jb2wuaHlkcmF0ZUNhY2hlcygpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0R3JvdXBDcmVkZW50aWFscyhcbiAgICBzdGFydERheTogbnVtYmVyLFxuICAgIGVuZERheTogbnVtYmVyLFxuICAgIHV1aWRLaW5kOiBVVUlES2luZFxuICApOiBQcm9taXNlPEFycmF5PEdyb3VwQ3JlZGVudGlhbFR5cGU+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLmdldEdyb3VwQ3JlZGVudGlhbHMoc3RhcnREYXksIGVuZERheSwgdXVpZEtpbmQpO1xuICB9XG5cbiAgLy8gVGFrZXMgdGhlIHNhbWUgb2JqZWN0IHJldHVybmVkIGJ5IGdlbmVyYXRlS2V5c1xuICBhc3luYyBjb25maXJtS2V5cyhcbiAgICBrZXlzOiBHZW5lcmF0ZWRLZXlzVHlwZSxcbiAgICB1dWlkS2luZDogVVVJREtpbmRcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RvcmUgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sO1xuICAgIGNvbnN0IGtleSA9IGtleXMuc2lnbmVkUHJlS2V5O1xuICAgIGNvbnN0IGNvbmZpcm1lZCA9IHRydWU7XG5cbiAgICBpZiAoIWtleSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb25maXJtS2V5czogc2lnbmVkUHJlS2V5IGlzIG51bGwnKTtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBBY2NvdW50TWFuYWdlci5jb25maXJtS2V5cygke3V1aWRLaW5kfSk6IGNvbmZpcm1pbmcga2V5YCxcbiAgICAgIGtleS5rZXlJZFxuICAgICk7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCh1dWlkS2luZCk7XG4gICAgYXdhaXQgc3RvcmUuc3RvcmVTaWduZWRQcmVLZXkob3VyVXVpZCwga2V5LmtleUlkLCBrZXkua2V5UGFpciwgY29uZmlybWVkKTtcbiAgfVxuXG4gIGFzeW5jIGdlbmVyYXRlS2V5cyhcbiAgICBjb3VudDogbnVtYmVyLFxuICAgIHV1aWRLaW5kOiBVVUlES2luZCxcbiAgICBtYXliZUlkZW50aXR5S2V5PzogS2V5UGFpclR5cGVcbiAgKTogUHJvbWlzZTxHZW5lcmF0ZWRLZXlzVHlwZT4ge1xuICAgIGNvbnN0IHsgc3RvcmFnZSB9ID0gd2luZG93LnRleHRzZWN1cmU7XG5cbiAgICBjb25zdCBzdGFydElkID0gc3RvcmFnZS5nZXQoJ21heFByZUtleUlkJywgMSk7XG4gICAgY29uc3Qgc2lnbmVkS2V5SWQgPSBzdG9yYWdlLmdldCgnc2lnbmVkS2V5SWQnLCAxKTtcbiAgICBjb25zdCBvdXJVdWlkID0gc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKHV1aWRLaW5kKTtcblxuICAgIGlmICh0eXBlb2Ygc3RhcnRJZCAhPT0gJ251bWJlcicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtYXhQcmVLZXlJZCcpO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIHNpZ25lZEtleUlkICE9PSAnbnVtYmVyJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHNpZ25lZEtleUlkJyk7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RvcmUgPSBzdG9yYWdlLnByb3RvY29sO1xuICAgIGNvbnN0IGlkZW50aXR5S2V5ID1cbiAgICAgIG1heWJlSWRlbnRpdHlLZXkgPz8gKGF3YWl0IHN0b3JlLmdldElkZW50aXR5S2V5UGFpcihvdXJVdWlkKSk7XG4gICAgc3RyaWN0QXNzZXJ0KGlkZW50aXR5S2V5LCAnZ2VuZXJhdGVLZXlzOiBObyBpZGVudGl0eSBrZXkgcGFpciEnKTtcblxuICAgIGNvbnN0IHJlc3VsdDogT21pdDxHZW5lcmF0ZWRLZXlzVHlwZSwgJ3NpZ25lZFByZUtleSc+ID0ge1xuICAgICAgcHJlS2V5czogW10sXG4gICAgICBpZGVudGl0eUtleTogaWRlbnRpdHlLZXkucHViS2V5LFxuICAgIH07XG4gICAgY29uc3QgcHJvbWlzZXMgPSBbXTtcblxuICAgIGZvciAobGV0IGtleUlkID0gc3RhcnRJZDsga2V5SWQgPCBzdGFydElkICsgY291bnQ7IGtleUlkICs9IDEpIHtcbiAgICAgIHByb21pc2VzLnB1c2goXG4gICAgICAgIChhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzID0gZ2VuZXJhdGVQcmVLZXkoa2V5SWQpO1xuICAgICAgICAgIGF3YWl0IHN0b3JlLnN0b3JlUHJlS2V5KG91clV1aWQsIHJlcy5rZXlJZCwgcmVzLmtleVBhaXIpO1xuICAgICAgICAgIHJlc3VsdC5wcmVLZXlzLnB1c2goe1xuICAgICAgICAgICAga2V5SWQ6IHJlcy5rZXlJZCxcbiAgICAgICAgICAgIHB1YmxpY0tleTogcmVzLmtleVBhaXIucHViS2V5LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KSgpXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNpZ25lZFByZUtleSA9IChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCByZXMgPSBnZW5lcmF0ZVNpZ25lZFByZUtleShpZGVudGl0eUtleSwgc2lnbmVkS2V5SWQpO1xuICAgICAgYXdhaXQgc3RvcmUuc3RvcmVTaWduZWRQcmVLZXkob3VyVXVpZCwgcmVzLmtleUlkLCByZXMua2V5UGFpcik7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBrZXlJZDogcmVzLmtleUlkLFxuICAgICAgICBwdWJsaWNLZXk6IHJlcy5rZXlQYWlyLnB1YktleSxcbiAgICAgICAgc2lnbmF0dXJlOiByZXMuc2lnbmF0dXJlLFxuICAgICAgICAvLyBzZXJ2ZXIucmVnaXN0ZXJLZXlzIGRvZXNuJ3QgdXNlIGtleVBhaXIsIGNvbmZpcm1LZXlzIGRvZXNcbiAgICAgICAga2V5UGFpcjogcmVzLmtleVBhaXIsXG4gICAgICB9O1xuICAgIH0pKCk7XG5cbiAgICBwcm9taXNlcy5wdXNoKHNpZ25lZFByZUtleSk7XG4gICAgcHJvbWlzZXMucHVzaChzdG9yYWdlLnB1dCgnbWF4UHJlS2V5SWQnLCBzdGFydElkICsgY291bnQpKTtcbiAgICBwcm9taXNlcy5wdXNoKHN0b3JhZ2UucHV0KCdzaWduZWRLZXlJZCcsIHNpZ25lZEtleUlkICsgMSkpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgLy8gVGhpcyBpcyBwcmltYXJpbHkgZm9yIHRoZSBzaWduZWQgcHJla2V5IHN1bW1hcnkgaXQgbG9ncyBvdXRcbiAgICB0aGlzLmNsZWFuU2lnbmVkUHJlS2V5cygpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnJlc3VsdCxcbiAgICAgIHNpZ25lZFByZUtleTogYXdhaXQgc2lnbmVkUHJlS2V5LFxuICAgIH07XG4gIH1cblxuICBhc3luYyByZWdpc3RyYXRpb25Eb25lKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdyZWdpc3RyYXRpb24gZG9uZScpO1xuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3JlZ2lzdHJhdGlvbicpKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHFCQUFtQjtBQUNuQixvQkFBcUI7QUFFckIseUJBQXdC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
