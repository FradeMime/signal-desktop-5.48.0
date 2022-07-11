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
var SignalProtocolStore_exports = {};
__export(SignalProtocolStore_exports, {
  GLOBAL_ZONE: () => GLOBAL_ZONE,
  SignalProtocolStore: () => SignalProtocolStore,
  freezePreKey: () => freezePreKey,
  freezePublicKey: () => freezePublicKey,
  freezeSession: () => freezeSession,
  freezeSignedPreKey: () => freezeSignedPreKey,
  hydratePreKey: () => hydratePreKey,
  hydratePublicKey: () => hydratePublicKey,
  hydrateSession: () => hydrateSession,
  hydrateSignedPreKey: () => hydrateSignedPreKey
});
module.exports = __toCommonJS(SignalProtocolStore_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_lodash = require("lodash");
var import_zod = require("zod");
var import_libsignal_client = require("@signalapp/libsignal-client");
var Bytes = __toESM(require("./Bytes"));
var import_Crypto = require("./Crypto");
var import_assert = require("./util/assert");
var import_isNotNil = require("./util/isNotNil");
var import_Zone = require("./util/Zone");
var import_timestamp = require("./util/timestamp");
var import_sessionTranslation = require("./util/sessionTranslation");
var import_UUID = require("./types/UUID");
var import_QualifiedAddress = require("./types/QualifiedAddress");
var log = __toESM(require("./logging/log"));
var import_singleProtoJobQueue = require("./jobs/singleProtoJobQueue");
var Errors = __toESM(require("./types/errors"));
var import_SendMessage = __toESM(require("./textsecure/SendMessage"));
const TIMESTAMP_THRESHOLD = 5 * 1e3;
const VerifiedStatus = {
  DEFAULT: 0,
  VERIFIED: 1,
  UNVERIFIED: 2
};
function validateVerifiedStatus(status) {
  if (status === VerifiedStatus.DEFAULT || status === VerifiedStatus.VERIFIED || status === VerifiedStatus.UNVERIFIED) {
    return true;
  }
  return false;
}
const identityKeySchema = import_zod.z.object({
  id: import_zod.z.string(),
  publicKey: import_zod.z.instanceof(Uint8Array),
  firstUse: import_zod.z.boolean(),
  timestamp: import_zod.z.number().refine((value) => value % 1 === 0 && value > 0),
  verified: import_zod.z.number().refine(validateVerifiedStatus),
  nonblockingApproval: import_zod.z.boolean()
});
function validateIdentityKey(attrs) {
  identityKeySchema.parse(attrs);
  return true;
}
const GLOBAL_ZONE = new import_Zone.Zone("GLOBAL_ZONE");
async function _fillCaches(object, field, itemsPromise) {
  const items = await itemsPromise;
  const cache = /* @__PURE__ */ new Map();
  for (let i = 0, max = items.length; i < max; i += 1) {
    const fromDB = items[i];
    const { id } = fromDB;
    cache.set(id, {
      fromDB,
      hydrated: false
    });
  }
  log.info(`SignalProtocolStore: Finished caching ${field} data`);
  object[field] = cache;
}
function hydrateSession(session) {
  return import_libsignal_client.SessionRecord.deserialize(Buffer.from(session.record, "base64"));
}
function hydratePublicKey(identityKey) {
  return import_libsignal_client.PublicKey.deserialize(Buffer.from(identityKey.publicKey));
}
function hydratePreKey(preKey) {
  const publicKey = import_libsignal_client.PublicKey.deserialize(Buffer.from(preKey.publicKey));
  const privateKey = import_libsignal_client.PrivateKey.deserialize(Buffer.from(preKey.privateKey));
  return import_libsignal_client.PreKeyRecord.new(preKey.keyId, publicKey, privateKey);
}
function hydrateSignedPreKey(signedPreKey) {
  const createdAt = signedPreKey.created_at;
  const pubKey = import_libsignal_client.PublicKey.deserialize(Buffer.from(signedPreKey.publicKey));
  const privKey = import_libsignal_client.PrivateKey.deserialize(Buffer.from(signedPreKey.privateKey));
  const signature = Buffer.from([]);
  return import_libsignal_client.SignedPreKeyRecord.new(signedPreKey.keyId, createdAt, pubKey, privKey, signature);
}
function freezeSession(session) {
  return session.serialize().toString("base64");
}
function freezePublicKey(publicKey) {
  return publicKey.serialize();
}
function freezePreKey(preKey) {
  const keyPair = {
    pubKey: preKey.publicKey().serialize(),
    privKey: preKey.privateKey().serialize()
  };
  return keyPair;
}
function freezeSignedPreKey(signedPreKey) {
  const keyPair = {
    pubKey: signedPreKey.publicKey().serialize(),
    privKey: signedPreKey.privateKey().serialize()
  };
  return keyPair;
}
const EventsMixin = /* @__PURE__ */ __name(function EventsMixin2() {
  Object.assign(this, window.Backbone.Events);
}, "EventsMixin");
class SignalProtocolStore extends EventsMixin {
  constructor() {
    super(...arguments);
    this.VerifiedStatus = VerifiedStatus;
    this.ourIdentityKeys = /* @__PURE__ */ new Map();
    this.ourRegistrationIds = /* @__PURE__ */ new Map();
    this.senderKeyQueues = /* @__PURE__ */ new Map();
    this.sessionQueues = /* @__PURE__ */ new Map();
    this.currentZoneDepth = 0;
    this.zoneQueue = [];
    this.pendingSessions = /* @__PURE__ */ new Map();
    this.pendingSenderKeys = /* @__PURE__ */ new Map();
    this.pendingUnprocessed = /* @__PURE__ */ new Map();
  }
  async hydrateCaches() {
    await Promise.all([
      (async () => {
        this.ourIdentityKeys.clear();
        const map = await window.Signal.Data.getItemById("identityKeyMap");
        if (!map) {
          return;
        }
        for (const key of Object.keys(map.value)) {
          const { privKey, pubKey } = map.value[key];
          this.ourIdentityKeys.set(new import_UUID.UUID(key).toString(), {
            privKey: Bytes.fromBase64(privKey),
            pubKey: Bytes.fromBase64(pubKey)
          });
        }
      })(),
      (async () => {
        this.ourRegistrationIds.clear();
        const map = await window.Signal.Data.getItemById("registrationIdMap");
        if (!map) {
          return;
        }
        for (const key of Object.keys(map.value)) {
          this.ourRegistrationIds.set(new import_UUID.UUID(key).toString(), map.value[key]);
        }
      })(),
      _fillCaches(this, "identityKeys", window.Signal.Data.getAllIdentityKeys()),
      _fillCaches(this, "sessions", window.Signal.Data.getAllSessions()),
      _fillCaches(this, "preKeys", window.Signal.Data.getAllPreKeys()),
      _fillCaches(this, "senderKeys", window.Signal.Data.getAllSenderKeys()),
      _fillCaches(this, "signedPreKeys", window.Signal.Data.getAllSignedPreKeys())
    ]);
  }
  async getIdentityKeyPair(ourUuid) {
    return this.ourIdentityKeys.get(ourUuid.toString());
  }
  async getLocalRegistrationId(ourUuid) {
    return this.ourRegistrationIds.get(ourUuid.toString());
  }
  async loadPreKey(ourUuid, keyId) {
    if (!this.preKeys) {
      throw new Error("loadPreKey: this.preKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    const entry = this.preKeys.get(id);
    if (!entry) {
      log.error("Failed to fetch prekey:", id);
      return void 0;
    }
    if (entry.hydrated) {
      log.info("Successfully fetched prekey (cache hit):", id);
      return entry.item;
    }
    const item = hydratePreKey(entry.fromDB);
    this.preKeys.set(id, {
      hydrated: true,
      fromDB: entry.fromDB,
      item
    });
    log.info("Successfully fetched prekey (cache miss):", id);
    return item;
  }
  async storePreKey(ourUuid, keyId, keyPair) {
    if (!this.preKeys) {
      throw new Error("storePreKey: this.preKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    if (this.preKeys.has(id)) {
      throw new Error(`storePreKey: prekey ${id} already exists!`);
    }
    const fromDB = {
      id,
      keyId,
      ourUuid: ourUuid.toString(),
      publicKey: keyPair.pubKey,
      privateKey: keyPair.privKey
    };
    await window.Signal.Data.createOrUpdatePreKey(fromDB);
    this.preKeys.set(id, {
      hydrated: false,
      fromDB
    });
  }
  async removePreKey(ourUuid, keyId) {
    if (!this.preKeys) {
      throw new Error("removePreKey: this.preKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    try {
      this.trigger("removePreKey", ourUuid);
    } catch (error) {
      log.error("removePreKey error triggering removePreKey:", error && error.stack ? error.stack : error);
    }
    this.preKeys.delete(id);
    await window.Signal.Data.removePreKeyById(id);
  }
  async clearPreKeyStore() {
    if (this.preKeys) {
      this.preKeys.clear();
    }
    await window.Signal.Data.removeAllPreKeys();
  }
  async loadSignedPreKey(ourUuid, keyId) {
    if (!this.signedPreKeys) {
      throw new Error("loadSignedPreKey: this.signedPreKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    const entry = this.signedPreKeys.get(id);
    if (!entry) {
      log.error("Failed to fetch signed prekey:", id);
      return void 0;
    }
    if (entry.hydrated) {
      log.info("Successfully fetched signed prekey (cache hit):", id);
      return entry.item;
    }
    const item = hydrateSignedPreKey(entry.fromDB);
    this.signedPreKeys.set(id, {
      hydrated: true,
      item,
      fromDB: entry.fromDB
    });
    log.info("Successfully fetched signed prekey (cache miss):", id);
    return item;
  }
  async loadSignedPreKeys(ourUuid) {
    if (!this.signedPreKeys) {
      throw new Error("loadSignedPreKeys: this.signedPreKeys not yet cached!");
    }
    if (arguments.length > 1) {
      throw new Error("loadSignedPreKeys takes one argument");
    }
    const entries = Array.from(this.signedPreKeys.values());
    return entries.filter(({ fromDB }) => fromDB.ourUuid === ourUuid.toString()).map((entry) => {
      const preKey = entry.fromDB;
      return {
        pubKey: preKey.publicKey,
        privKey: preKey.privateKey,
        created_at: preKey.created_at,
        keyId: preKey.keyId,
        confirmed: preKey.confirmed
      };
    });
  }
  async storeSignedPreKey(ourUuid, keyId, keyPair, confirmed) {
    if (!this.signedPreKeys) {
      throw new Error("storeSignedPreKey: this.signedPreKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    const fromDB = {
      id,
      ourUuid: ourUuid.toString(),
      keyId,
      publicKey: keyPair.pubKey,
      privateKey: keyPair.privKey,
      created_at: Date.now(),
      confirmed: Boolean(confirmed)
    };
    await window.Signal.Data.createOrUpdateSignedPreKey(fromDB);
    this.signedPreKeys.set(id, {
      hydrated: false,
      fromDB
    });
  }
  async removeSignedPreKey(ourUuid, keyId) {
    if (!this.signedPreKeys) {
      throw new Error("removeSignedPreKey: this.signedPreKeys not yet cached!");
    }
    const id = `${ourUuid.toString()}:${keyId}`;
    this.signedPreKeys.delete(id);
    await window.Signal.Data.removeSignedPreKeyById(id);
  }
  async clearSignedPreKeysStore() {
    if (this.signedPreKeys) {
      this.signedPreKeys.clear();
    }
    await window.Signal.Data.removeAllSignedPreKeys();
  }
  async enqueueSenderKeyJob(qualifiedAddress, task, zone = GLOBAL_ZONE) {
    return this.withZone(zone, "enqueueSenderKeyJob", async () => {
      const queue = this._getSenderKeyQueue(qualifiedAddress);
      return queue.add(task);
    });
  }
  _createSenderKeyQueue() {
    return new import_p_queue.default({
      concurrency: 1,
      timeout: 1e3 * 60 * 2,
      throwOnTimeout: true
    });
  }
  _getSenderKeyQueue(senderId) {
    const cachedQueue = this.senderKeyQueues.get(senderId.toString());
    if (cachedQueue) {
      return cachedQueue;
    }
    const freshQueue = this._createSenderKeyQueue();
    this.senderKeyQueues.set(senderId.toString(), freshQueue);
    return freshQueue;
  }
  getSenderKeyId(senderKeyId, distributionId) {
    return `${senderKeyId.toString()}--${distributionId}`;
  }
  async saveSenderKey(qualifiedAddress, distributionId, record, { zone = GLOBAL_ZONE } = {}) {
    await this.withZone(zone, "saveSenderKey", async () => {
      if (!this.senderKeys) {
        throw new Error("saveSenderKey: this.senderKeys not yet cached!");
      }
      const senderId = qualifiedAddress.toString();
      try {
        const id = this.getSenderKeyId(qualifiedAddress, distributionId);
        const fromDB = {
          id,
          senderId,
          distributionId,
          data: record.serialize(),
          lastUpdatedDate: Date.now()
        };
        this.pendingSenderKeys.set(id, {
          hydrated: true,
          fromDB,
          item: record
        });
        if (!zone.supportsPendingSenderKeys()) {
          await this.commitZoneChanges("saveSenderKey");
        }
      } catch (error) {
        const errorString = error && error.stack ? error.stack : error;
        log.error(`saveSenderKey: failed to save senderKey ${senderId}/${distributionId}: ${errorString}`);
      }
    });
  }
  async getSenderKey(qualifiedAddress, distributionId, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "getSenderKey", async () => {
      if (!this.senderKeys) {
        throw new Error("getSenderKey: this.senderKeys not yet cached!");
      }
      const senderId = qualifiedAddress.toString();
      try {
        const id = this.getSenderKeyId(qualifiedAddress, distributionId);
        const map = this.pendingSenderKeys.has(id) ? this.pendingSenderKeys : this.senderKeys;
        const entry = map.get(id);
        if (!entry) {
          log.error("Failed to fetch sender key:", id);
          return void 0;
        }
        if (entry.hydrated) {
          log.info("Successfully fetched sender key (cache hit):", id);
          return entry.item;
        }
        const item = import_libsignal_client.SenderKeyRecord.deserialize(Buffer.from(entry.fromDB.data));
        this.senderKeys.set(id, {
          hydrated: true,
          item,
          fromDB: entry.fromDB
        });
        log.info("Successfully fetched sender key(cache miss):", id);
        return item;
      } catch (error) {
        const errorString = error && error.stack ? error.stack : error;
        log.error(`getSenderKey: failed to load sender key ${senderId}/${distributionId}: ${errorString}`);
        return void 0;
      }
    });
  }
  async removeSenderKey(qualifiedAddress, distributionId) {
    if (!this.senderKeys) {
      throw new Error("getSenderKey: this.senderKeys not yet cached!");
    }
    const senderId = qualifiedAddress.toString();
    try {
      const id = this.getSenderKeyId(qualifiedAddress, distributionId);
      await window.Signal.Data.removeSenderKeyById(id);
      this.senderKeys.delete(id);
    } catch (error) {
      const errorString = error && error.stack ? error.stack : error;
      log.error(`removeSenderKey: failed to remove senderKey ${senderId}/${distributionId}: ${errorString}`);
    }
  }
  async removeAllSenderKeys() {
    return this.withZone(GLOBAL_ZONE, "removeAllSenderKeys", async () => {
      if (this.senderKeys) {
        this.senderKeys.clear();
      }
      if (this.pendingSenderKeys) {
        this.pendingSenderKeys.clear();
      }
      await window.Signal.Data.removeAllSenderKeys();
    });
  }
  async enqueueSessionJob(qualifiedAddress, task, zone = GLOBAL_ZONE) {
    return this.withZone(zone, "enqueueSessionJob", async () => {
      const queue = this._getSessionQueue(qualifiedAddress);
      return queue.add(task);
    });
  }
  _createSessionQueue() {
    return new import_p_queue.default({
      concurrency: 1,
      timeout: 1e3 * 60 * 2,
      throwOnTimeout: true
    });
  }
  _getSessionQueue(id) {
    const cachedQueue = this.sessionQueues.get(id.toString());
    if (cachedQueue) {
      return cachedQueue;
    }
    const freshQueue = this._createSessionQueue();
    this.sessionQueues.set(id.toString(), freshQueue);
    return freshQueue;
  }
  async withZone(zone, name, body) {
    const debugName = `withZone(${zone.name}:${name})`;
    if (this.currentZone && this.currentZone !== zone) {
      const start = Date.now();
      log.info(`${debugName}: locked by ${this.currentZone.name}, waiting`);
      return new Promise((resolve, reject) => {
        const callback = /* @__PURE__ */ __name(async () => {
          const duration = Date.now() - start;
          log.info(`${debugName}: unlocked after ${duration}ms`);
          try {
            resolve(await this.withZone(zone, name, body));
          } catch (error) {
            reject(error);
          }
        }, "callback");
        this.zoneQueue.push({ zone, callback });
      });
    }
    this.enterZone(zone, name);
    let result;
    try {
      result = await body();
    } catch (error) {
      if (this.isInTopLevelZone()) {
        await this.revertZoneChanges(name, error);
      }
      this.leaveZone(zone);
      throw error;
    }
    if (this.isInTopLevelZone()) {
      await this.commitZoneChanges(name);
    }
    this.leaveZone(zone);
    return result;
  }
  async commitZoneChanges(name) {
    const { pendingSenderKeys, pendingSessions, pendingUnprocessed } = this;
    if (pendingSenderKeys.size === 0 && pendingSessions.size === 0 && pendingUnprocessed.size === 0) {
      return;
    }
    log.info(`commitZoneChanges(${name}): pending sender keys ${pendingSenderKeys.size}, pending sessions ${pendingSessions.size}, pending unprocessed ${pendingUnprocessed.size}`);
    this.pendingSenderKeys = /* @__PURE__ */ new Map();
    this.pendingSessions = /* @__PURE__ */ new Map();
    this.pendingUnprocessed = /* @__PURE__ */ new Map();
    await window.Signal.Data.commitDecryptResult({
      senderKeys: Array.from(pendingSenderKeys.values()).map(({ fromDB }) => fromDB),
      sessions: Array.from(pendingSessions.values()).map(({ fromDB }) => fromDB),
      unprocessed: Array.from(pendingUnprocessed.values())
    });
    const { sessions } = this;
    (0, import_assert.assert)(sessions !== void 0, "Can't commit unhydrated session storage");
    pendingSessions.forEach((value, key) => {
      sessions.set(key, value);
    });
    const { senderKeys } = this;
    (0, import_assert.assert)(senderKeys !== void 0, "Can't commit unhydrated sender key storage");
    pendingSenderKeys.forEach((value, key) => {
      senderKeys.set(key, value);
    });
  }
  async revertZoneChanges(name, error) {
    log.info(`revertZoneChanges(${name}): pending sender keys size ${this.pendingSenderKeys.size}, pending sessions size ${this.pendingSessions.size}, pending unprocessed size ${this.pendingUnprocessed.size}`, error && error.stack);
    this.pendingSenderKeys.clear();
    this.pendingSessions.clear();
    this.pendingUnprocessed.clear();
  }
  isInTopLevelZone() {
    return this.currentZoneDepth === 1;
  }
  enterZone(zone, name) {
    this.currentZoneDepth += 1;
    if (this.currentZoneDepth === 1) {
      (0, import_assert.assert)(this.currentZone === void 0, "Should not be in the zone");
      this.currentZone = zone;
      if (zone !== GLOBAL_ZONE) {
        log.info(`SignalProtocolStore.enterZone(${zone.name}:${name})`);
      }
    }
  }
  leaveZone(zone) {
    (0, import_assert.assert)(this.currentZone === zone, "Should be in the correct zone");
    this.currentZoneDepth -= 1;
    (0, import_assert.assert)(this.currentZoneDepth >= 0, "Unmatched number of leaveZone calls");
    if (this.currentZoneDepth !== 0) {
      return;
    }
    if (zone !== GLOBAL_ZONE) {
      log.info(`SignalProtocolStore.leaveZone(${zone.name})`);
    }
    this.currentZone = void 0;
    const next = this.zoneQueue.shift();
    if (!next) {
      return;
    }
    const toEnter = [next];
    while (this.zoneQueue[0]?.zone === next.zone) {
      const elem = this.zoneQueue.shift();
      (0, import_assert.assert)(elem, "Zone element should be present");
      toEnter.push(elem);
    }
    log.info(`SignalProtocolStore: running blocked ${toEnter.length} jobs in zone ${next.zone.name}`);
    for (const { callback } of toEnter) {
      callback();
    }
  }
  async loadSession(qualifiedAddress, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "loadSession", async () => {
      if (!this.sessions) {
        throw new Error("loadSession: this.sessions not yet cached!");
      }
      if (qualifiedAddress === null || qualifiedAddress === void 0) {
        throw new Error("loadSession: qualifiedAddress was undefined/null");
      }
      const id = qualifiedAddress.toString();
      try {
        const map = this.pendingSessions.has(id) ? this.pendingSessions : this.sessions;
        const entry = map.get(id);
        if (!entry) {
          return void 0;
        }
        if (entry.hydrated) {
          return entry.item;
        }
        return await this._maybeMigrateSession(entry.fromDB, { zone });
      } catch (error) {
        const errorString = error && error.stack ? error.stack : error;
        log.error(`loadSession: failed to load session ${id}: ${errorString}`);
        return void 0;
      }
    });
  }
  async loadSessions(qualifiedAddresses, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "loadSessions", async () => {
      const sessions = await Promise.all(qualifiedAddresses.map(async (address) => this.loadSession(address, { zone })));
      return sessions.filter(import_isNotNil.isNotNil);
    });
  }
  async _maybeMigrateSession(session, { zone = GLOBAL_ZONE } = {}) {
    if (!this.sessions) {
      throw new Error("_maybeMigrateSession: this.sessions not yet cached!");
    }
    if (session.version === 2) {
      const item = hydrateSession(session);
      const map = this.pendingSessions.has(session.id) ? this.pendingSessions : this.sessions;
      map.set(session.id, {
        hydrated: true,
        item,
        fromDB: session
      });
      return item;
    }
    if (session.version !== void 0) {
      throw new Error("_maybeMigrateSession: Unknown session version type!");
    }
    const ourUuid = new import_UUID.UUID(session.ourUuid);
    const keyPair = await this.getIdentityKeyPair(ourUuid);
    if (!keyPair) {
      throw new Error("_maybeMigrateSession: No identity key for ourself!");
    }
    const localRegistrationId = await this.getLocalRegistrationId(ourUuid);
    if (!(0, import_lodash.isNumber)(localRegistrationId)) {
      throw new Error("_maybeMigrateSession: No registration id for ourself!");
    }
    const localUserData = {
      identityKeyPublic: keyPair.pubKey,
      registrationId: localRegistrationId
    };
    log.info(`_maybeMigrateSession: Migrating session with id ${session.id}`);
    const sessionProto = (0, import_sessionTranslation.sessionRecordToProtobuf)(JSON.parse(session.record), localUserData);
    const record = import_libsignal_client.SessionRecord.deserialize(Buffer.from((0, import_sessionTranslation.sessionStructureToBytes)(sessionProto)));
    await this.storeSession(import_QualifiedAddress.QualifiedAddress.parse(session.id), record, {
      zone
    });
    return record;
  }
  async storeSession(qualifiedAddress, record, { zone = GLOBAL_ZONE } = {}) {
    await this.withZone(zone, "storeSession", async () => {
      if (!this.sessions) {
        throw new Error("storeSession: this.sessions not yet cached!");
      }
      if (qualifiedAddress === null || qualifiedAddress === void 0) {
        throw new Error("storeSession: qualifiedAddress was undefined/null");
      }
      const { uuid, deviceId } = qualifiedAddress;
      const conversationId = window.ConversationController.ensureContactIds({
        uuid: uuid.toString()
      });
      (0, import_assert.strictAssert)(conversationId !== void 0, "storeSession: Ensure contact ids failed");
      const id = qualifiedAddress.toString();
      try {
        const fromDB = {
          id,
          version: 2,
          ourUuid: qualifiedAddress.ourUuid.toString(),
          conversationId,
          uuid: uuid.toString(),
          deviceId,
          record: record.serialize().toString("base64")
        };
        const newSession = {
          hydrated: true,
          fromDB,
          item: record
        };
        (0, import_assert.assert)(this.currentZone, "Must run in the zone");
        this.pendingSessions.set(id, newSession);
        if (!zone.supportsPendingSessions()) {
          await this.commitZoneChanges("storeSession");
        }
      } catch (error) {
        const errorString = error && error.stack ? error.stack : error;
        log.error(`storeSession: Save failed for ${id}: ${errorString}`);
        throw error;
      }
    });
  }
  async getOpenDevices(ourUuid, identifiers, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "getOpenDevices", async () => {
      if (!this.sessions) {
        throw new Error("getOpenDevices: this.sessions not yet cached!");
      }
      if (identifiers.length === 0) {
        return { devices: [], emptyIdentifiers: [] };
      }
      try {
        const uuidsOrIdentifiers = new Set(identifiers.map((identifier) => import_UUID.UUID.lookup(identifier)?.toString() || identifier));
        const allSessions = this._getAllSessions();
        const entries = allSessions.filter(({ fromDB }) => fromDB.ourUuid === ourUuid.toString() && uuidsOrIdentifiers.has(fromDB.uuid));
        const openEntries = await Promise.all(entries.map(async (entry) => {
          if (entry.hydrated) {
            const record2 = entry.item;
            if (record2.hasCurrentState()) {
              return { record: record2, entry };
            }
            return void 0;
          }
          const record = await this._maybeMigrateSession(entry.fromDB, {
            zone
          });
          if (record.hasCurrentState()) {
            return { record, entry };
          }
          return void 0;
        }));
        const devices = openEntries.map((item) => {
          if (!item) {
            return void 0;
          }
          const { entry, record } = item;
          const { uuid } = entry.fromDB;
          uuidsOrIdentifiers.delete(uuid);
          const id = entry.fromDB.deviceId;
          const registrationId = record.remoteRegistrationId();
          return {
            identifier: uuid,
            id,
            registrationId
          };
        }).filter(import_isNotNil.isNotNil);
        const emptyIdentifiers = Array.from(uuidsOrIdentifiers.values());
        return {
          devices,
          emptyIdentifiers
        };
      } catch (error) {
        log.error("getOpenDevices: Failed to get devices", error && error.stack ? error.stack : error);
        throw error;
      }
    });
  }
  async getDeviceIds({
    ourUuid,
    identifier
  }) {
    const { devices } = await this.getOpenDevices(ourUuid, [identifier]);
    return devices.map((device) => device.id);
  }
  async removeSession(qualifiedAddress) {
    return this.withZone(GLOBAL_ZONE, "removeSession", async () => {
      if (!this.sessions) {
        throw new Error("removeSession: this.sessions not yet cached!");
      }
      const id = qualifiedAddress.toString();
      log.info("removeSession: deleting session for", id);
      try {
        await window.Signal.Data.removeSessionById(id);
        this.sessions.delete(id);
        this.pendingSessions.delete(id);
      } catch (e) {
        log.error(`removeSession: Failed to delete session for ${id}`);
      }
    });
  }
  async removeAllSessions(identifier) {
    return this.withZone(GLOBAL_ZONE, "removeAllSessions", async () => {
      if (!this.sessions) {
        throw new Error("removeAllSessions: this.sessions not yet cached!");
      }
      if (identifier === null || identifier === void 0) {
        throw new Error("removeAllSessions: identifier was undefined/null");
      }
      log.info("removeAllSessions: deleting sessions for", identifier);
      const id = window.ConversationController.getConversationId(identifier);
      (0, import_assert.strictAssert)(id, `removeAllSessions: Conversation not found: ${identifier}`);
      const entries = Array.from(this.sessions.values());
      for (let i = 0, max = entries.length; i < max; i += 1) {
        const entry = entries[i];
        if (entry.fromDB.conversationId === id) {
          this.sessions.delete(entry.fromDB.id);
          this.pendingSessions.delete(entry.fromDB.id);
        }
      }
      await window.Signal.Data.removeSessionsByConversation(id);
    });
  }
  async _archiveSession(entry, zone) {
    if (!entry) {
      return;
    }
    const addr = import_QualifiedAddress.QualifiedAddress.parse(entry.fromDB.id);
    await this.enqueueSessionJob(addr, async () => {
      const item = entry.hydrated ? entry.item : await this._maybeMigrateSession(entry.fromDB, { zone });
      if (!item.hasCurrentState()) {
        return;
      }
      item.archiveCurrentState();
      await this.storeSession(addr, item, { zone });
    }, zone);
  }
  async archiveSession(qualifiedAddress) {
    return this.withZone(GLOBAL_ZONE, "archiveSession", async () => {
      if (!this.sessions) {
        throw new Error("archiveSession: this.sessions not yet cached!");
      }
      const id = qualifiedAddress.toString();
      log.info(`archiveSession: session for ${id}`);
      const entry = this.pendingSessions.get(id) || this.sessions.get(id);
      await this._archiveSession(entry);
    });
  }
  async archiveSiblingSessions(encodedAddress, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "archiveSiblingSessions", async () => {
      if (!this.sessions) {
        throw new Error("archiveSiblingSessions: this.sessions not yet cached!");
      }
      log.info("archiveSiblingSessions: archiving sibling sessions for", encodedAddress.toString());
      const { uuid, deviceId } = encodedAddress;
      const allEntries = this._getAllSessions();
      const entries = allEntries.filter((entry) => entry.fromDB.uuid === uuid.toString() && entry.fromDB.deviceId !== deviceId);
      await Promise.all(entries.map(async (entry) => {
        await this._archiveSession(entry, zone);
      }));
    });
  }
  async archiveAllSessions(uuid) {
    return this.withZone(GLOBAL_ZONE, "archiveAllSessions", async () => {
      if (!this.sessions) {
        throw new Error("archiveAllSessions: this.sessions not yet cached!");
      }
      log.info("archiveAllSessions: archiving all sessions for", uuid.toString());
      const allEntries = this._getAllSessions();
      const entries = allEntries.filter((entry) => entry.fromDB.uuid === uuid.toString());
      await Promise.all(entries.map(async (entry) => {
        await this._archiveSession(entry);
      }));
    });
  }
  async clearSessionStore() {
    return this.withZone(GLOBAL_ZONE, "clearSessionStore", async () => {
      if (this.sessions) {
        this.sessions.clear();
      }
      this.pendingSessions.clear();
      await window.Signal.Data.removeAllSessions();
    });
  }
  async lightSessionReset(qualifiedAddress) {
    const id = qualifiedAddress.toString();
    const sessionResets = window.storage.get("sessionResets", {});
    const lastReset = sessionResets[id];
    const ONE_HOUR = 60 * 60 * 1e3;
    if (lastReset && (0, import_timestamp.isMoreRecentThan)(lastReset, ONE_HOUR)) {
      log.warn(`lightSessionReset/${id}: Skipping session reset, last reset at ${lastReset}`);
      return;
    }
    sessionResets[id] = Date.now();
    window.storage.put("sessionResets", sessionResets);
    try {
      const { uuid } = qualifiedAddress;
      const conversationId = window.ConversationController.ensureContactIds({
        uuid: uuid.toString()
      });
      (0, import_assert.assert)(conversationId, `lightSessionReset/${id}: missing conversationId`);
      const conversation = window.ConversationController.get(conversationId);
      (0, import_assert.assert)(conversation, `lightSessionReset/${id}: missing conversation`);
      log.warn(`lightSessionReset/${id}: Resetting session`);
      await this.archiveSession(qualifiedAddress);
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getNullMessage({
        uuid: uuid.toString()
      }));
    } catch (error) {
      delete sessionResets[id];
      window.storage.put("sessionResets", sessionResets);
      log.error(`lightSessionReset/${id}: Encountered error`, Errors.toLogFormat(error));
    }
  }
  getIdentityRecord(uuid) {
    if (!this.identityKeys) {
      throw new Error("getIdentityRecord: this.identityKeys not yet cached!");
    }
    const id = uuid.toString();
    try {
      const entry = this.identityKeys.get(id);
      if (!entry) {
        return void 0;
      }
      return entry.fromDB;
    } catch (e) {
      log.error(`getIdentityRecord: Failed to get identity record for identifier ${id}`);
      return void 0;
    }
  }
  async getOrMigrateIdentityRecord(uuid) {
    if (!this.identityKeys) {
      throw new Error("getOrMigrateIdentityRecord: this.identityKeys not yet cached!");
    }
    const result = this.getIdentityRecord(uuid);
    if (result) {
      return result;
    }
    const newId = uuid.toString();
    const conversation = window.ConversationController.get(newId);
    if (!conversation) {
      return void 0;
    }
    const conversationId = conversation.id;
    const record = this.identityKeys.get(`conversation:${conversationId}`);
    if (!record) {
      return void 0;
    }
    const newRecord = {
      ...record.fromDB,
      id: newId
    };
    log.info(`SignalProtocolStore: migrating identity key from ${record.fromDB.id} to ${newRecord.id}`);
    await this._saveIdentityKey(newRecord);
    this.identityKeys.delete(record.fromDB.id);
    await window.Signal.Data.removeIdentityKeyById(record.fromDB.id);
    return newRecord;
  }
  async isTrustedIdentity(encodedAddress, publicKey, direction) {
    if (!this.identityKeys) {
      throw new Error("isTrustedIdentity: this.identityKeys not yet cached!");
    }
    if (encodedAddress === null || encodedAddress === void 0) {
      throw new Error("isTrustedIdentity: encodedAddress was undefined/null");
    }
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const isOurIdentifier = encodedAddress.uuid.isEqual(ourUuid);
    const identityRecord = await this.getOrMigrateIdentityRecord(encodedAddress.uuid);
    if (isOurIdentifier) {
      if (identityRecord && identityRecord.publicKey) {
        return (0, import_Crypto.constantTimeEqual)(identityRecord.publicKey, publicKey);
      }
      log.warn("isTrustedIdentity: No local record for our own identifier. Returning true.");
      return true;
    }
    switch (direction) {
      case import_libsignal_client.Direction.Sending:
        return this.isTrustedForSending(publicKey, identityRecord);
      case import_libsignal_client.Direction.Receiving:
        return true;
      default:
        throw new Error(`isTrustedIdentity: Unknown direction: ${direction}`);
    }
  }
  isTrustedForSending(publicKey, identityRecord) {
    if (!identityRecord) {
      log.info("isTrustedForSending: No previous record, returning true...");
      return true;
    }
    const existing = identityRecord.publicKey;
    if (!existing) {
      log.info("isTrustedForSending: Nothing here, returning true...");
      return true;
    }
    if (!(0, import_Crypto.constantTimeEqual)(existing, publicKey)) {
      log.info("isTrustedForSending: Identity keys don't match...");
      return false;
    }
    if (identityRecord.verified === VerifiedStatus.UNVERIFIED) {
      log.error("isTrustedIdentity: Needs unverified approval!");
      return false;
    }
    if (this.isNonBlockingApprovalRequired(identityRecord)) {
      log.error("isTrustedForSending: Needs non-blocking approval!");
      return false;
    }
    return true;
  }
  async loadIdentityKey(uuid) {
    if (uuid === null || uuid === void 0) {
      throw new Error("loadIdentityKey: uuid was undefined/null");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    if (identityRecord) {
      return identityRecord.publicKey;
    }
    return void 0;
  }
  async _saveIdentityKey(data) {
    if (!this.identityKeys) {
      throw new Error("_saveIdentityKey: this.identityKeys not yet cached!");
    }
    const { id } = data;
    await window.Signal.Data.createOrUpdateIdentityKey(data);
    this.identityKeys.set(id, {
      hydrated: false,
      fromDB: data
    });
  }
  async saveIdentity(encodedAddress, publicKey, nonblockingApproval = false, { zone } = {}) {
    if (!this.identityKeys) {
      throw new Error("saveIdentity: this.identityKeys not yet cached!");
    }
    if (encodedAddress === null || encodedAddress === void 0) {
      throw new Error("saveIdentity: encodedAddress was undefined/null");
    }
    if (!(publicKey instanceof Uint8Array)) {
      publicKey = Bytes.fromBinary(publicKey);
    }
    if (typeof nonblockingApproval !== "boolean") {
      nonblockingApproval = false;
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(encodedAddress.uuid);
    const id = encodedAddress.uuid.toString();
    if (!identityRecord || !identityRecord.publicKey) {
      log.info("saveIdentity: Saving new identity...");
      await this._saveIdentityKey({
        id,
        publicKey,
        firstUse: true,
        timestamp: Date.now(),
        verified: VerifiedStatus.DEFAULT,
        nonblockingApproval
      });
      return false;
    }
    const oldpublicKey = identityRecord.publicKey;
    if (!(0, import_Crypto.constantTimeEqual)(oldpublicKey, publicKey)) {
      log.info("saveIdentity: Replacing existing identity...");
      const previousStatus = identityRecord.verified;
      let verifiedStatus;
      if (previousStatus === VerifiedStatus.VERIFIED || previousStatus === VerifiedStatus.UNVERIFIED) {
        verifiedStatus = VerifiedStatus.UNVERIFIED;
      } else {
        verifiedStatus = VerifiedStatus.DEFAULT;
      }
      await this._saveIdentityKey({
        id,
        publicKey,
        firstUse: false,
        timestamp: Date.now(),
        verified: verifiedStatus,
        nonblockingApproval
      });
      try {
        this.trigger("keychange", encodedAddress.uuid);
      } catch (error) {
        log.error("saveIdentity: error triggering keychange:", error && error.stack ? error.stack : error);
      }
      await this.archiveSiblingSessions(encodedAddress, {
        zone
      });
      return true;
    }
    if (this.isNonBlockingApprovalRequired(identityRecord)) {
      log.info("saveIdentity: Setting approval status...");
      identityRecord.nonblockingApproval = nonblockingApproval;
      await this._saveIdentityKey(identityRecord);
      return false;
    }
    return false;
  }
  isNonBlockingApprovalRequired(identityRecord) {
    return !identityRecord.firstUse && (0, import_timestamp.isMoreRecentThan)(identityRecord.timestamp, TIMESTAMP_THRESHOLD) && !identityRecord.nonblockingApproval;
  }
  async saveIdentityWithAttributes(uuid, attributes) {
    if (uuid === null || uuid === void 0) {
      throw new Error("saveIdentityWithAttributes: uuid was undefined/null");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    const id = uuid.toString();
    const uuidKind = window.textsecure.storage.user.getOurUuidKind(uuid);
    if (uuidKind !== import_UUID.UUIDKind.PNI) {
      window.ConversationController.getOrCreate(id, "private");
    }
    const updates = {
      ...identityRecord,
      ...attributes,
      id
    };
    if (validateIdentityKey(updates)) {
      await this._saveIdentityKey(updates);
    }
  }
  async setApproval(uuid, nonblockingApproval) {
    if (uuid === null || uuid === void 0) {
      throw new Error("setApproval: uuid was undefined/null");
    }
    if (typeof nonblockingApproval !== "boolean") {
      throw new Error("setApproval: Invalid approval status");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    if (!identityRecord) {
      throw new Error(`setApproval: No identity record for ${uuid}`);
    }
    identityRecord.nonblockingApproval = nonblockingApproval;
    await this._saveIdentityKey(identityRecord);
  }
  async setVerified(uuid, verifiedStatus, publicKey) {
    if (uuid === null || uuid === void 0) {
      throw new Error("setVerified: uuid was undefined/null");
    }
    if (!validateVerifiedStatus(verifiedStatus)) {
      throw new Error("setVerified: Invalid verified status");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    if (!identityRecord) {
      throw new Error(`setVerified: No identity record for ${uuid.toString()}`);
    }
    if (!publicKey || (0, import_Crypto.constantTimeEqual)(identityRecord.publicKey, publicKey)) {
      identityRecord.verified = verifiedStatus;
      if (validateIdentityKey(identityRecord)) {
        await this._saveIdentityKey(identityRecord);
      }
    } else {
      log.info("setVerified: No identity record for specified publicKey");
    }
  }
  async getVerified(uuid) {
    if (uuid === null || uuid === void 0) {
      throw new Error("getVerified: uuid was undefined/null");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    if (!identityRecord) {
      throw new Error(`getVerified: No identity record for ${uuid}`);
    }
    const verifiedStatus = identityRecord.verified;
    if (validateVerifiedStatus(verifiedStatus)) {
      return verifiedStatus;
    }
    return VerifiedStatus.DEFAULT;
  }
  async processVerifiedMessage(uuid, verifiedStatus, publicKey) {
    if (uuid === null || uuid === void 0) {
      throw new Error("processVerifiedMessage: uuid was undefined/null");
    }
    if (!validateVerifiedStatus(verifiedStatus)) {
      throw new Error("processVerifiedMessage: Invalid verified status");
    }
    if (publicKey !== void 0 && !(publicKey instanceof Uint8Array)) {
      throw new Error("processVerifiedMessage: Invalid public key");
    }
    const identityRecord = await this.getOrMigrateIdentityRecord(uuid);
    let isEqual = false;
    if (identityRecord && publicKey) {
      isEqual = (0, import_Crypto.constantTimeEqual)(publicKey, identityRecord.publicKey);
    }
    if (isEqual || !publicKey) {
      await this.setVerified(uuid, verifiedStatus, publicKey);
      return false;
    }
    await this.saveIdentityWithAttributes(uuid, {
      publicKey,
      verified: verifiedStatus,
      firstUse: false,
      timestamp: Date.now(),
      nonblockingApproval: verifiedStatus === VerifiedStatus.VERIFIED
    });
    if (identityRecord) {
      try {
        this.trigger("keychange", uuid);
      } catch (error) {
        log.error("processVerifiedMessage error triggering keychange:", Errors.toLogFormat(error));
      }
      return true;
    }
    return false;
  }
  isUntrusted(uuid) {
    if (uuid === null || uuid === void 0) {
      throw new Error("isUntrusted: uuid was undefined/null");
    }
    const identityRecord = this.getIdentityRecord(uuid);
    if (!identityRecord) {
      throw new Error(`isUntrusted: No identity record for ${uuid.toString()}`);
    }
    if ((0, import_timestamp.isMoreRecentThan)(identityRecord.timestamp, TIMESTAMP_THRESHOLD) && !identityRecord.nonblockingApproval && !identityRecord.firstUse) {
      return true;
    }
    return false;
  }
  async removeIdentityKey(uuid) {
    if (!this.identityKeys) {
      throw new Error("removeIdentityKey: this.identityKeys not yet cached!");
    }
    const id = uuid.toString();
    this.identityKeys.delete(id);
    await window.Signal.Data.removeIdentityKeyById(id);
    await this.removeAllSessions(id);
  }
  getUnprocessedCount() {
    return this.withZone(GLOBAL_ZONE, "getUnprocessedCount", async () => {
      return window.Signal.Data.getUnprocessedCount();
    });
  }
  getAllUnprocessedAndIncrementAttempts() {
    return this.withZone(GLOBAL_ZONE, "getAllUnprocessed", async () => {
      return window.Signal.Data.getAllUnprocessedAndIncrementAttempts();
    });
  }
  getUnprocessedById(id) {
    return this.withZone(GLOBAL_ZONE, "getUnprocessedById", async () => {
      return window.Signal.Data.getUnprocessedById(id);
    });
  }
  addUnprocessed(data, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "addUnprocessed", async () => {
      this.pendingUnprocessed.set(data.id, data);
      if (!zone.supportsPendingUnprocessed()) {
        await this.commitZoneChanges("addUnprocessed");
      }
    });
  }
  addMultipleUnprocessed(array, { zone = GLOBAL_ZONE } = {}) {
    return this.withZone(zone, "addMultipleUnprocessed", async () => {
      for (const elem of array) {
        this.pendingUnprocessed.set(elem.id, elem);
      }
      if (!zone.supportsPendingUnprocessed()) {
        await this.commitZoneChanges("addMultipleUnprocessed");
      }
    });
  }
  updateUnprocessedWithData(id, data) {
    return this.withZone(GLOBAL_ZONE, "updateUnprocessedWithData", async () => {
      await window.Signal.Data.updateUnprocessedWithData(id, data);
    });
  }
  updateUnprocessedsWithData(items) {
    return this.withZone(GLOBAL_ZONE, "updateUnprocessedsWithData", async () => {
      await window.Signal.Data.updateUnprocessedsWithData(items);
    });
  }
  removeUnprocessed(idOrArray) {
    return this.withZone(GLOBAL_ZONE, "removeUnprocessed", async () => {
      await window.Signal.Data.removeUnprocessed(idOrArray);
    });
  }
  removeAllUnprocessed() {
    return this.withZone(GLOBAL_ZONE, "removeAllUnprocessed", async () => {
      await window.Signal.Data.removeAllUnprocessed();
    });
  }
  async removeAllData() {
    await window.Signal.Data.removeAll();
    await this.hydrateCaches();
    window.storage.reset();
    await window.storage.fetch();
    window.ConversationController.reset();
    await window.ConversationController.load();
  }
  async removeAllConfiguration(mode) {
    await window.Signal.Data.removeAllConfiguration(mode);
    await this.hydrateCaches();
    window.storage.reset();
    await window.storage.fetch();
  }
  _getAllSessions() {
    const union = /* @__PURE__ */ new Map();
    this.sessions?.forEach((value, key) => {
      union.set(key, value);
    });
    this.pendingSessions.forEach((value, key) => {
      union.set(key, value);
    });
    return Array.from(union.values());
  }
}
window.SignalProtocolStore = SignalProtocolStore;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GLOBAL_ZONE,
  SignalProtocolStore,
  freezePreKey,
  freezePublicKey,
  freezeSession,
  freezeSignedPreKey,
  hydratePreKey,
  hydratePublicKey,
  hydrateSession,
  hydrateSignedPreKey
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2lnbmFsUHJvdG9jb2xTdG9yZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcblxuaW1wb3J0IHtcbiAgRGlyZWN0aW9uLFxuICBQcmVLZXlSZWNvcmQsXG4gIFByaXZhdGVLZXksXG4gIFB1YmxpY0tleSxcbiAgU2VuZGVyS2V5UmVjb3JkLFxuICBTZXNzaW9uUmVjb3JkLFxuICBTaWduZWRQcmVLZXlSZWNvcmQsXG59IGZyb20gJ0BzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudCc7XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4vQnl0ZXMnO1xuaW1wb3J0IHsgY29uc3RhbnRUaW1lRXF1YWwgfSBmcm9tICcuL0NyeXB0byc7XG5pbXBvcnQgeyBhc3NlcnQsIHN0cmljdEFzc2VydCB9IGZyb20gJy4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuL3V0aWwvaXNOb3ROaWwnO1xuaW1wb3J0IHsgWm9uZSB9IGZyb20gJy4vdXRpbC9ab25lJztcbmltcG9ydCB7IGlzTW9yZVJlY2VudFRoYW4gfSBmcm9tICcuL3V0aWwvdGltZXN0YW1wJztcbmltcG9ydCB7XG4gIHNlc3Npb25SZWNvcmRUb1Byb3RvYnVmLFxuICBzZXNzaW9uU3RydWN0dXJlVG9CeXRlcyxcbn0gZnJvbSAnLi91dGlsL3Nlc3Npb25UcmFuc2xhdGlvbic7XG5pbXBvcnQgdHlwZSB7XG4gIERldmljZVR5cGUsXG4gIElkZW50aXR5S2V5VHlwZSxcbiAgSWRlbnRpdHlLZXlJZFR5cGUsXG4gIEtleVBhaXJUeXBlLFxuICBPdXRlclNpZ25lZFByZWtleVR5cGUsXG4gIFByZUtleUlkVHlwZSxcbiAgUHJlS2V5VHlwZSxcbiAgU2VuZGVyS2V5SWRUeXBlLFxuICBTZW5kZXJLZXlUeXBlLFxuICBTZXNzaW9uSWRUeXBlLFxuICBTZXNzaW9uUmVzZXRzVHlwZSxcbiAgU2Vzc2lvblR5cGUsXG4gIFNpZ25lZFByZUtleUlkVHlwZSxcbiAgU2lnbmVkUHJlS2V5VHlwZSxcbiAgVW5wcm9jZXNzZWRUeXBlLFxuICBVbnByb2Nlc3NlZFVwZGF0ZVR5cGUsXG59IGZyb20gJy4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCB0eXBlIHsgUmVtb3ZlQWxsQ29uZmlndXJhdGlvbiB9IGZyb20gJy4vdHlwZXMvUmVtb3ZlQWxsQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IFVVSUQsIFVVSURLaW5kIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgQWRkcmVzcyB9IGZyb20gJy4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgdHlwZSB7IFF1YWxpZmllZEFkZHJlc3NTdHJpbmdUeXBlIH0gZnJvbSAnLi90eXBlcy9RdWFsaWZpZWRBZGRyZXNzJztcbmltcG9ydCB7IFF1YWxpZmllZEFkZHJlc3MgfSBmcm9tICcuL3R5cGVzL1F1YWxpZmllZEFkZHJlc3MnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JRdWV1ZSB9IGZyb20gJy4vam9icy9zaW5nbGVQcm90b0pvYlF1ZXVlJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciBmcm9tICcuL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuXG5jb25zdCBUSU1FU1RBTVBfVEhSRVNIT0xEID0gNSAqIDEwMDA7IC8vIDUgc2Vjb25kc1xuXG5jb25zdCBWZXJpZmllZFN0YXR1cyA9IHtcbiAgREVGQVVMVDogMCxcbiAgVkVSSUZJRUQ6IDEsXG4gIFVOVkVSSUZJRUQ6IDIsXG59O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVZlcmlmaWVkU3RhdHVzKHN0YXR1czogbnVtYmVyKTogYm9vbGVhbiB7XG4gIGlmIChcbiAgICBzdGF0dXMgPT09IFZlcmlmaWVkU3RhdHVzLkRFRkFVTFQgfHxcbiAgICBzdGF0dXMgPT09IFZlcmlmaWVkU3RhdHVzLlZFUklGSUVEIHx8XG4gICAgc3RhdHVzID09PSBWZXJpZmllZFN0YXR1cy5VTlZFUklGSUVEXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuY29uc3QgaWRlbnRpdHlLZXlTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGlkOiB6LnN0cmluZygpLFxuICBwdWJsaWNLZXk6IHouaW5zdGFuY2VvZihVaW50OEFycmF5KSxcbiAgZmlyc3RVc2U6IHouYm9vbGVhbigpLFxuICB0aW1lc3RhbXA6IHoubnVtYmVyKCkucmVmaW5lKCh2YWx1ZTogbnVtYmVyKSA9PiB2YWx1ZSAlIDEgPT09IDAgJiYgdmFsdWUgPiAwKSxcbiAgdmVyaWZpZWQ6IHoubnVtYmVyKCkucmVmaW5lKHZhbGlkYXRlVmVyaWZpZWRTdGF0dXMpLFxuICBub25ibG9ja2luZ0FwcHJvdmFsOiB6LmJvb2xlYW4oKSxcbn0pO1xuXG5mdW5jdGlvbiB2YWxpZGF0ZUlkZW50aXR5S2V5KGF0dHJzOiB1bmtub3duKTogYXR0cnMgaXMgSWRlbnRpdHlLZXlUeXBlIHtcbiAgLy8gV2UnbGwgdGhyb3cgaWYgdGhpcyBkb2Vzbid0IG1hdGNoXG4gIGlkZW50aXR5S2V5U2NoZW1hLnBhcnNlKGF0dHJzKTtcbiAgcmV0dXJuIHRydWU7XG59XG5cbnR5cGUgSGFzSWRUeXBlPFQ+ID0ge1xuICBpZDogVDtcbn07XG50eXBlIENhY2hlRW50cnlUeXBlPERCVHlwZSwgSHlkcmF0ZWRUeXBlPiA9XG4gIHwge1xuICAgICAgaHlkcmF0ZWQ6IGZhbHNlO1xuICAgICAgZnJvbURCOiBEQlR5cGU7XG4gICAgfVxuICB8IHsgaHlkcmF0ZWQ6IHRydWU7IGZyb21EQjogREJUeXBlOyBpdGVtOiBIeWRyYXRlZFR5cGUgfTtcblxudHlwZSBNYXBGaWVsZHMgPVxuICB8ICdpZGVudGl0eUtleXMnXG4gIHwgJ3ByZUtleXMnXG4gIHwgJ3NlbmRlcktleXMnXG4gIHwgJ3Nlc3Npb25zJ1xuICB8ICdzaWduZWRQcmVLZXlzJztcblxuZXhwb3J0IHR5cGUgU2Vzc2lvblRyYW5zYWN0aW9uT3B0aW9ucyA9IHtcbiAgcmVhZG9ubHkgem9uZT86IFpvbmU7XG59O1xuXG5leHBvcnQgY29uc3QgR0xPQkFMX1pPTkUgPSBuZXcgWm9uZSgnR0xPQkFMX1pPTkUnKTtcblxuYXN5bmMgZnVuY3Rpb24gX2ZpbGxDYWNoZXM8SUQsIFQgZXh0ZW5kcyBIYXNJZFR5cGU8SUQ+LCBIeWRyYXRlZFR5cGU+KFxuICBvYmplY3Q6IFNpZ25hbFByb3RvY29sU3RvcmUsXG4gIGZpZWxkOiBNYXBGaWVsZHMsXG4gIGl0ZW1zUHJvbWlzZTogUHJvbWlzZTxBcnJheTxUPj5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBpdGVtcyA9IGF3YWl0IGl0ZW1zUHJvbWlzZTtcblxuICBjb25zdCBjYWNoZSA9IG5ldyBNYXA8SUQsIENhY2hlRW50cnlUeXBlPFQsIEh5ZHJhdGVkVHlwZT4+KCk7XG4gIGZvciAobGV0IGkgPSAwLCBtYXggPSBpdGVtcy5sZW5ndGg7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGZyb21EQiA9IGl0ZW1zW2ldO1xuICAgIGNvbnN0IHsgaWQgfSA9IGZyb21EQjtcblxuICAgIGNhY2hlLnNldChpZCwge1xuICAgICAgZnJvbURCLFxuICAgICAgaHlkcmF0ZWQ6IGZhbHNlLFxuICAgIH0pO1xuICB9XG5cbiAgbG9nLmluZm8oYFNpZ25hbFByb3RvY29sU3RvcmU6IEZpbmlzaGVkIGNhY2hpbmcgJHtmaWVsZH0gZGF0YWApO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ24sIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgb2JqZWN0W2ZpZWxkXSA9IGNhY2hlIGFzIGFueTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVTZXNzaW9uKHNlc3Npb246IFNlc3Npb25UeXBlKTogU2Vzc2lvblJlY29yZCB7XG4gIHJldHVybiBTZXNzaW9uUmVjb3JkLmRlc2VyaWFsaXplKEJ1ZmZlci5mcm9tKHNlc3Npb24ucmVjb3JkLCAnYmFzZTY0JykpO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGh5ZHJhdGVQdWJsaWNLZXkoaWRlbnRpdHlLZXk6IElkZW50aXR5S2V5VHlwZSk6IFB1YmxpY0tleSB7XG4gIHJldHVybiBQdWJsaWNLZXkuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20oaWRlbnRpdHlLZXkucHVibGljS2V5KSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZVByZUtleShwcmVLZXk6IFByZUtleVR5cGUpOiBQcmVLZXlSZWNvcmQge1xuICBjb25zdCBwdWJsaWNLZXkgPSBQdWJsaWNLZXkuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20ocHJlS2V5LnB1YmxpY0tleSkpO1xuICBjb25zdCBwcml2YXRlS2V5ID0gUHJpdmF0ZUtleS5kZXNlcmlhbGl6ZShCdWZmZXIuZnJvbShwcmVLZXkucHJpdmF0ZUtleSkpO1xuICByZXR1cm4gUHJlS2V5UmVjb3JkLm5ldyhwcmVLZXkua2V5SWQsIHB1YmxpY0tleSwgcHJpdmF0ZUtleSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaHlkcmF0ZVNpZ25lZFByZUtleShcbiAgc2lnbmVkUHJlS2V5OiBTaWduZWRQcmVLZXlUeXBlXG4pOiBTaWduZWRQcmVLZXlSZWNvcmQge1xuICBjb25zdCBjcmVhdGVkQXQgPSBzaWduZWRQcmVLZXkuY3JlYXRlZF9hdDtcbiAgY29uc3QgcHViS2V5ID0gUHVibGljS2V5LmRlc2VyaWFsaXplKEJ1ZmZlci5mcm9tKHNpZ25lZFByZUtleS5wdWJsaWNLZXkpKTtcbiAgY29uc3QgcHJpdktleSA9IFByaXZhdGVLZXkuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20oc2lnbmVkUHJlS2V5LnByaXZhdGVLZXkpKTtcbiAgY29uc3Qgc2lnbmF0dXJlID0gQnVmZmVyLmZyb20oW10pO1xuXG4gIHJldHVybiBTaWduZWRQcmVLZXlSZWNvcmQubmV3KFxuICAgIHNpZ25lZFByZUtleS5rZXlJZCxcbiAgICBjcmVhdGVkQXQsXG4gICAgcHViS2V5LFxuICAgIHByaXZLZXksXG4gICAgc2lnbmF0dXJlXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBmcmVlemVTZXNzaW9uKHNlc3Npb246IFNlc3Npb25SZWNvcmQpOiBzdHJpbmcge1xuICByZXR1cm4gc2Vzc2lvbi5zZXJpYWxpemUoKS50b1N0cmluZygnYmFzZTY0Jyk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJlZXplUHVibGljS2V5KHB1YmxpY0tleTogUHVibGljS2V5KTogVWludDhBcnJheSB7XG4gIHJldHVybiBwdWJsaWNLZXkuc2VyaWFsaXplKCk7XG59XG5leHBvcnQgZnVuY3Rpb24gZnJlZXplUHJlS2V5KHByZUtleTogUHJlS2V5UmVjb3JkKTogS2V5UGFpclR5cGUge1xuICBjb25zdCBrZXlQYWlyID0ge1xuICAgIHB1YktleTogcHJlS2V5LnB1YmxpY0tleSgpLnNlcmlhbGl6ZSgpLFxuICAgIHByaXZLZXk6IHByZUtleS5wcml2YXRlS2V5KCkuc2VyaWFsaXplKCksXG4gIH07XG4gIHJldHVybiBrZXlQYWlyO1xufVxuZXhwb3J0IGZ1bmN0aW9uIGZyZWV6ZVNpZ25lZFByZUtleShcbiAgc2lnbmVkUHJlS2V5OiBTaWduZWRQcmVLZXlSZWNvcmRcbik6IEtleVBhaXJUeXBlIHtcbiAgY29uc3Qga2V5UGFpciA9IHtcbiAgICBwdWJLZXk6IHNpZ25lZFByZUtleS5wdWJsaWNLZXkoKS5zZXJpYWxpemUoKSxcbiAgICBwcml2S2V5OiBzaWduZWRQcmVLZXkucHJpdmF0ZUtleSgpLnNlcmlhbGl6ZSgpLFxuICB9O1xuICByZXR1cm4ga2V5UGFpcjtcbn1cblxuLy8gV2UgYWRkIGEgdGhpcyBwYXJhbWV0ZXIgdG8gYXZvaWQgYW4gJ2ltcGxpY2l0IGFueScgZXJyb3Igb24gdGhlIG5leHQgbGluZVxuY29uc3QgRXZlbnRzTWl4aW4gPSBmdW5jdGlvbiBFdmVudHNNaXhpbih0aGlzOiB1bmtub3duKSB7XG4gIE9iamVjdC5hc3NpZ24odGhpcywgd2luZG93LkJhY2tib25lLkV2ZW50cyk7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG59IGFzIGFueSBhcyB0eXBlb2Ygd2luZG93LkJhY2tib25lLkV2ZW50c01peGluO1xuXG50eXBlIFNlc3Npb25DYWNoZUVudHJ5ID0gQ2FjaGVFbnRyeVR5cGU8U2Vzc2lvblR5cGUsIFNlc3Npb25SZWNvcmQ+O1xudHlwZSBTZW5kZXJLZXlDYWNoZUVudHJ5ID0gQ2FjaGVFbnRyeVR5cGU8U2VuZGVyS2V5VHlwZSwgU2VuZGVyS2V5UmVjb3JkPjtcblxudHlwZSBab25lUXVldWVFbnRyeVR5cGUgPSBSZWFkb25seTx7XG4gIHpvbmU6IFpvbmU7XG4gIGNhbGxiYWNrKCk6IHZvaWQ7XG59PjtcblxuZXhwb3J0IGNsYXNzIFNpZ25hbFByb3RvY29sU3RvcmUgZXh0ZW5kcyBFdmVudHNNaXhpbiB7XG4gIC8vIEVudW1zIHVzZWQgYWNyb3NzIHRoZSBhcHBcblxuICBWZXJpZmllZFN0YXR1cyA9IFZlcmlmaWVkU3RhdHVzO1xuXG4gIC8vIENhY2hlZCB2YWx1ZXNcblxuICBwcml2YXRlIG91cklkZW50aXR5S2V5cyA9IG5ldyBNYXA8VVVJRFN0cmluZ1R5cGUsIEtleVBhaXJUeXBlPigpO1xuXG4gIHByaXZhdGUgb3VyUmVnaXN0cmF0aW9uSWRzID0gbmV3IE1hcDxVVUlEU3RyaW5nVHlwZSwgbnVtYmVyPigpO1xuXG4gIGlkZW50aXR5S2V5cz86IE1hcDxcbiAgICBJZGVudGl0eUtleUlkVHlwZSxcbiAgICBDYWNoZUVudHJ5VHlwZTxJZGVudGl0eUtleVR5cGUsIFB1YmxpY0tleT5cbiAgPjtcblxuICBzZW5kZXJLZXlzPzogTWFwPFNlbmRlcktleUlkVHlwZSwgU2VuZGVyS2V5Q2FjaGVFbnRyeT47XG5cbiAgc2Vzc2lvbnM/OiBNYXA8U2Vzc2lvbklkVHlwZSwgU2Vzc2lvbkNhY2hlRW50cnk+O1xuXG4gIHByZUtleXM/OiBNYXA8UHJlS2V5SWRUeXBlLCBDYWNoZUVudHJ5VHlwZTxQcmVLZXlUeXBlLCBQcmVLZXlSZWNvcmQ+PjtcblxuICBzaWduZWRQcmVLZXlzPzogTWFwPFxuICAgIFNpZ25lZFByZUtleUlkVHlwZSxcbiAgICBDYWNoZUVudHJ5VHlwZTxTaWduZWRQcmVLZXlUeXBlLCBTaWduZWRQcmVLZXlSZWNvcmQ+XG4gID47XG5cbiAgc2VuZGVyS2V5UXVldWVzID0gbmV3IE1hcDxRdWFsaWZpZWRBZGRyZXNzU3RyaW5nVHlwZSwgUFF1ZXVlPigpO1xuXG4gIHNlc3Npb25RdWV1ZXMgPSBuZXcgTWFwPFNlc3Npb25JZFR5cGUsIFBRdWV1ZT4oKTtcblxuICBwcml2YXRlIGN1cnJlbnRab25lPzogWm9uZTtcblxuICBwcml2YXRlIGN1cnJlbnRab25lRGVwdGggPSAwO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgem9uZVF1ZXVlOiBBcnJheTxab25lUXVldWVFbnRyeVR5cGU+ID0gW107XG5cbiAgcHJpdmF0ZSBwZW5kaW5nU2Vzc2lvbnMgPSBuZXcgTWFwPFNlc3Npb25JZFR5cGUsIFNlc3Npb25DYWNoZUVudHJ5PigpO1xuXG4gIHByaXZhdGUgcGVuZGluZ1NlbmRlcktleXMgPSBuZXcgTWFwPFNlbmRlcktleUlkVHlwZSwgU2VuZGVyS2V5Q2FjaGVFbnRyeT4oKTtcblxuICBwcml2YXRlIHBlbmRpbmdVbnByb2Nlc3NlZCA9IG5ldyBNYXA8c3RyaW5nLCBVbnByb2Nlc3NlZFR5cGU+KCk7XG5cbiAgYXN5bmMgaHlkcmF0ZUNhY2hlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm91cklkZW50aXR5S2V5cy5jbGVhcigpO1xuICAgICAgICBjb25zdCBtYXAgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SXRlbUJ5SWQoJ2lkZW50aXR5S2V5TWFwJyk7XG4gICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWFwLnZhbHVlKSkge1xuICAgICAgICAgIGNvbnN0IHsgcHJpdktleSwgcHViS2V5IH0gPSBtYXAudmFsdWVba2V5XTtcbiAgICAgICAgICB0aGlzLm91cklkZW50aXR5S2V5cy5zZXQobmV3IFVVSUQoa2V5KS50b1N0cmluZygpLCB7XG4gICAgICAgICAgICBwcml2S2V5OiBCeXRlcy5mcm9tQmFzZTY0KHByaXZLZXkpLFxuICAgICAgICAgICAgcHViS2V5OiBCeXRlcy5mcm9tQmFzZTY0KHB1YktleSksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH0pKCksXG4gICAgICAoYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aGlzLm91clJlZ2lzdHJhdGlvbklkcy5jbGVhcigpO1xuICAgICAgICBjb25zdCBtYXAgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0SXRlbUJ5SWQoJ3JlZ2lzdHJhdGlvbklkTWFwJyk7XG4gICAgICAgIGlmICghbWFwKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBrZXkgb2YgT2JqZWN0LmtleXMobWFwLnZhbHVlKSkge1xuICAgICAgICAgIHRoaXMub3VyUmVnaXN0cmF0aW9uSWRzLnNldChuZXcgVVVJRChrZXkpLnRvU3RyaW5nKCksIG1hcC52YWx1ZVtrZXldKTtcbiAgICAgICAgfVxuICAgICAgfSkoKSxcbiAgICAgIF9maWxsQ2FjaGVzPHN0cmluZywgSWRlbnRpdHlLZXlUeXBlLCBQdWJsaWNLZXk+KFxuICAgICAgICB0aGlzLFxuICAgICAgICAnaWRlbnRpdHlLZXlzJyxcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLmdldEFsbElkZW50aXR5S2V5cygpXG4gICAgICApLFxuICAgICAgX2ZpbGxDYWNoZXM8c3RyaW5nLCBTZXNzaW9uVHlwZSwgU2Vzc2lvblJlY29yZD4oXG4gICAgICAgIHRoaXMsXG4gICAgICAgICdzZXNzaW9ucycsXG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5nZXRBbGxTZXNzaW9ucygpXG4gICAgICApLFxuICAgICAgX2ZpbGxDYWNoZXM8c3RyaW5nLCBQcmVLZXlUeXBlLCBQcmVLZXlSZWNvcmQ+KFxuICAgICAgICB0aGlzLFxuICAgICAgICAncHJlS2V5cycsXG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5nZXRBbGxQcmVLZXlzKClcbiAgICAgICksXG4gICAgICBfZmlsbENhY2hlczxzdHJpbmcsIFNlbmRlcktleVR5cGUsIFNlbmRlcktleVJlY29yZD4oXG4gICAgICAgIHRoaXMsXG4gICAgICAgICdzZW5kZXJLZXlzJyxcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLmdldEFsbFNlbmRlcktleXMoKVxuICAgICAgKSxcbiAgICAgIF9maWxsQ2FjaGVzPHN0cmluZywgU2lnbmVkUHJlS2V5VHlwZSwgU2lnbmVkUHJlS2V5UmVjb3JkPihcbiAgICAgICAgdGhpcyxcbiAgICAgICAgJ3NpZ25lZFByZUtleXMnLFxuICAgICAgICB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0QWxsU2lnbmVkUHJlS2V5cygpXG4gICAgICApLFxuICAgIF0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0SWRlbnRpdHlLZXlQYWlyKG91clV1aWQ6IFVVSUQpOiBQcm9taXNlPEtleVBhaXJUeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMub3VySWRlbnRpdHlLZXlzLmdldChvdXJVdWlkLnRvU3RyaW5nKCkpO1xuICB9XG5cbiAgYXN5bmMgZ2V0TG9jYWxSZWdpc3RyYXRpb25JZChvdXJVdWlkOiBVVUlEKTogUHJvbWlzZTxudW1iZXIgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy5vdXJSZWdpc3RyYXRpb25JZHMuZ2V0KG91clV1aWQudG9TdHJpbmcoKSk7XG4gIH1cblxuICAvLyBQcmVLZXlzXG5cbiAgYXN5bmMgbG9hZFByZUtleShcbiAgICBvdXJVdWlkOiBVVUlELFxuICAgIGtleUlkOiBudW1iZXJcbiAgKTogUHJvbWlzZTxQcmVLZXlSZWNvcmQgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoIXRoaXMucHJlS2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkUHJlS2V5OiB0aGlzLnByZUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWQ6IFByZUtleUlkVHlwZSA9IGAke291clV1aWQudG9TdHJpbmcoKX06JHtrZXlJZH1gO1xuXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLnByZUtleXMuZ2V0KGlkKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBsb2cuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBwcmVrZXk6JywgaWQpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAoZW50cnkuaHlkcmF0ZWQpIHtcbiAgICAgIGxvZy5pbmZvKCdTdWNjZXNzZnVsbHkgZmV0Y2hlZCBwcmVrZXkgKGNhY2hlIGhpdCk6JywgaWQpO1xuICAgICAgcmV0dXJuIGVudHJ5Lml0ZW07XG4gICAgfVxuXG4gICAgY29uc3QgaXRlbSA9IGh5ZHJhdGVQcmVLZXkoZW50cnkuZnJvbURCKTtcbiAgICB0aGlzLnByZUtleXMuc2V0KGlkLCB7XG4gICAgICBoeWRyYXRlZDogdHJ1ZSxcbiAgICAgIGZyb21EQjogZW50cnkuZnJvbURCLFxuICAgICAgaXRlbSxcbiAgICB9KTtcbiAgICBsb2cuaW5mbygnU3VjY2Vzc2Z1bGx5IGZldGNoZWQgcHJla2V5IChjYWNoZSBtaXNzKTonLCBpZCk7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBhc3luYyBzdG9yZVByZUtleShcbiAgICBvdXJVdWlkOiBVVUlELFxuICAgIGtleUlkOiBudW1iZXIsXG4gICAga2V5UGFpcjogS2V5UGFpclR5cGVcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnByZUtleXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3RvcmVQcmVLZXk6IHRoaXMucHJlS2V5cyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZDogUHJlS2V5SWRUeXBlID0gYCR7b3VyVXVpZC50b1N0cmluZygpfToke2tleUlkfWA7XG4gICAgaWYgKHRoaXMucHJlS2V5cy5oYXMoaWQpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHN0b3JlUHJlS2V5OiBwcmVrZXkgJHtpZH0gYWxyZWFkeSBleGlzdHMhYCk7XG4gICAgfVxuXG4gICAgY29uc3QgZnJvbURCID0ge1xuICAgICAgaWQsXG4gICAgICBrZXlJZCxcbiAgICAgIG91clV1aWQ6IG91clV1aWQudG9TdHJpbmcoKSxcbiAgICAgIHB1YmxpY0tleToga2V5UGFpci5wdWJLZXksXG4gICAgICBwcml2YXRlS2V5OiBrZXlQYWlyLnByaXZLZXksXG4gICAgfTtcblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5jcmVhdGVPclVwZGF0ZVByZUtleShmcm9tREIpO1xuICAgIHRoaXMucHJlS2V5cy5zZXQoaWQsIHtcbiAgICAgIGh5ZHJhdGVkOiBmYWxzZSxcbiAgICAgIGZyb21EQixcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZVByZUtleShvdXJVdWlkOiBVVUlELCBrZXlJZDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnByZUtleXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlUHJlS2V5OiB0aGlzLnByZUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWQ6IFByZUtleUlkVHlwZSA9IGAke291clV1aWQudG9TdHJpbmcoKX06JHtrZXlJZH1gO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMudHJpZ2dlcigncmVtb3ZlUHJlS2V5Jywgb3VyVXVpZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ3JlbW92ZVByZUtleSBlcnJvciB0cmlnZ2VyaW5nIHJlbW92ZVByZUtleTonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5wcmVLZXlzLmRlbGV0ZShpZCk7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZVByZUtleUJ5SWQoaWQpO1xuICB9XG5cbiAgYXN5bmMgY2xlYXJQcmVLZXlTdG9yZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodGhpcy5wcmVLZXlzKSB7XG4gICAgICB0aGlzLnByZUtleXMuY2xlYXIoKTtcbiAgICB9XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUFsbFByZUtleXMoKTtcbiAgfVxuXG4gIC8vIFNpZ25lZCBQcmVLZXlzXG5cbiAgYXN5bmMgbG9hZFNpZ25lZFByZUtleShcbiAgICBvdXJVdWlkOiBVVUlELFxuICAgIGtleUlkOiBudW1iZXJcbiAgKTogUHJvbWlzZTxTaWduZWRQcmVLZXlSZWNvcmQgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAoIXRoaXMuc2lnbmVkUHJlS2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkU2lnbmVkUHJlS2V5OiB0aGlzLnNpZ25lZFByZUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWQ6IFNpZ25lZFByZUtleUlkVHlwZSA9IGAke291clV1aWQudG9TdHJpbmcoKX06JHtrZXlJZH1gO1xuXG4gICAgY29uc3QgZW50cnkgPSB0aGlzLnNpZ25lZFByZUtleXMuZ2V0KGlkKTtcbiAgICBpZiAoIWVudHJ5KSB7XG4gICAgICBsb2cuZXJyb3IoJ0ZhaWxlZCB0byBmZXRjaCBzaWduZWQgcHJla2V5OicsIGlkKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKGVudHJ5Lmh5ZHJhdGVkKSB7XG4gICAgICBsb2cuaW5mbygnU3VjY2Vzc2Z1bGx5IGZldGNoZWQgc2lnbmVkIHByZWtleSAoY2FjaGUgaGl0KTonLCBpZCk7XG4gICAgICByZXR1cm4gZW50cnkuaXRlbTtcbiAgICB9XG5cbiAgICBjb25zdCBpdGVtID0gaHlkcmF0ZVNpZ25lZFByZUtleShlbnRyeS5mcm9tREIpO1xuICAgIHRoaXMuc2lnbmVkUHJlS2V5cy5zZXQoaWQsIHtcbiAgICAgIGh5ZHJhdGVkOiB0cnVlLFxuICAgICAgaXRlbSxcbiAgICAgIGZyb21EQjogZW50cnkuZnJvbURCLFxuICAgIH0pO1xuICAgIGxvZy5pbmZvKCdTdWNjZXNzZnVsbHkgZmV0Y2hlZCBzaWduZWQgcHJla2V5IChjYWNoZSBtaXNzKTonLCBpZCk7XG4gICAgcmV0dXJuIGl0ZW07XG4gIH1cblxuICBhc3luYyBsb2FkU2lnbmVkUHJlS2V5cyhcbiAgICBvdXJVdWlkOiBVVUlEXG4gICk6IFByb21pc2U8QXJyYXk8T3V0ZXJTaWduZWRQcmVrZXlUeXBlPj4ge1xuICAgIGlmICghdGhpcy5zaWduZWRQcmVLZXlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWRTaWduZWRQcmVLZXlzOiB0aGlzLnNpZ25lZFByZUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgaWYgKGFyZ3VtZW50cy5sZW5ndGggPiAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xvYWRTaWduZWRQcmVLZXlzIHRha2VzIG9uZSBhcmd1bWVudCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKHRoaXMuc2lnbmVkUHJlS2V5cy52YWx1ZXMoKSk7XG4gICAgcmV0dXJuIGVudHJpZXNcbiAgICAgIC5maWx0ZXIoKHsgZnJvbURCIH0pID0+IGZyb21EQi5vdXJVdWlkID09PSBvdXJVdWlkLnRvU3RyaW5nKCkpXG4gICAgICAubWFwKGVudHJ5ID0+IHtcbiAgICAgICAgY29uc3QgcHJlS2V5ID0gZW50cnkuZnJvbURCO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHB1YktleTogcHJlS2V5LnB1YmxpY0tleSxcbiAgICAgICAgICBwcml2S2V5OiBwcmVLZXkucHJpdmF0ZUtleSxcbiAgICAgICAgICBjcmVhdGVkX2F0OiBwcmVLZXkuY3JlYXRlZF9hdCxcbiAgICAgICAgICBrZXlJZDogcHJlS2V5LmtleUlkLFxuICAgICAgICAgIGNvbmZpcm1lZDogcHJlS2V5LmNvbmZpcm1lZCxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuICB9XG5cbiAgLy8gTm90ZSB0aGF0IHRoaXMgaXMgYWxzbyBjYWxsZWQgaW4gdXBkYXRlIHNjZW5hcmlvcywgZm9yIGNvbmZpcm1pbmcgdGhhdCBzaWduZWQgcHJla2V5c1xuICAvLyAgIGhhdmUgaW5kZWVkIGJlZW4gYWNjZXB0ZWQgYnkgdGhlIHNlcnZlci5cbiAgYXN5bmMgc3RvcmVTaWduZWRQcmVLZXkoXG4gICAgb3VyVXVpZDogVVVJRCxcbiAgICBrZXlJZDogbnVtYmVyLFxuICAgIGtleVBhaXI6IEtleVBhaXJUeXBlLFxuICAgIGNvbmZpcm1lZD86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLnNpZ25lZFByZUtleXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3RvcmVTaWduZWRQcmVLZXk6IHRoaXMuc2lnbmVkUHJlS2V5cyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZDogU2lnbmVkUHJlS2V5SWRUeXBlID0gYCR7b3VyVXVpZC50b1N0cmluZygpfToke2tleUlkfWA7XG5cbiAgICBjb25zdCBmcm9tREIgPSB7XG4gICAgICBpZCxcbiAgICAgIG91clV1aWQ6IG91clV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGtleUlkLFxuICAgICAgcHVibGljS2V5OiBrZXlQYWlyLnB1YktleSxcbiAgICAgIHByaXZhdGVLZXk6IGtleVBhaXIucHJpdktleSxcbiAgICAgIGNyZWF0ZWRfYXQ6IERhdGUubm93KCksXG4gICAgICBjb25maXJtZWQ6IEJvb2xlYW4oY29uZmlybWVkKSxcbiAgICB9O1xuXG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmNyZWF0ZU9yVXBkYXRlU2lnbmVkUHJlS2V5KGZyb21EQik7XG4gICAgdGhpcy5zaWduZWRQcmVLZXlzLnNldChpZCwge1xuICAgICAgaHlkcmF0ZWQ6IGZhbHNlLFxuICAgICAgZnJvbURCLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlU2lnbmVkUHJlS2V5KG91clV1aWQ6IFVVSUQsIGtleUlkOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuc2lnbmVkUHJlS2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVTaWduZWRQcmVLZXk6IHRoaXMuc2lnbmVkUHJlS2V5cyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZDogU2lnbmVkUHJlS2V5SWRUeXBlID0gYCR7b3VyVXVpZC50b1N0cmluZygpfToke2tleUlkfWA7XG4gICAgdGhpcy5zaWduZWRQcmVLZXlzLmRlbGV0ZShpZCk7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZVNpZ25lZFByZUtleUJ5SWQoaWQpO1xuICB9XG5cbiAgYXN5bmMgY2xlYXJTaWduZWRQcmVLZXlzU3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuc2lnbmVkUHJlS2V5cykge1xuICAgICAgdGhpcy5zaWduZWRQcmVLZXlzLmNsZWFyKCk7XG4gICAgfVxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVBbGxTaWduZWRQcmVLZXlzKCk7XG4gIH1cblxuICAvLyBTZW5kZXIgS2V5XG5cbiAgLy8gUmUtZW50cmFudCBzZW5kZXIga2V5IHRyYW5zYWN0aW9uIHJvdXRpbmUuIE9ubHkgb25lIHNlbmRlciBrZXkgdHJhbnNhY3Rpb24gY291bGRcbiAgLy8gYmUgcnVubmluZyBhdCB0aGUgc2FtZSB0aW1lLlxuICAvL1xuICAvLyBXaGlsZSBpbiB0cmFuc2FjdGlvbjpcbiAgLy9cbiAgLy8gLSBgc2F2ZVNlbmRlcktleSgpYCBhZGRzIHRoZSB1cGRhdGVkIHNlc3Npb24gdG8gdGhlIGBwZW5kaW5nU2VuZGVyS2V5c2BcbiAgLy8gLSBgZ2V0U2VuZGVyS2V5KClgIGxvb2tzIHVwIHRoZSBzZXNzaW9uIGZpcnN0IGluIGBwZW5kaW5nU2VuZGVyS2V5c2AgYW5kIG9ubHlcbiAgLy8gICB0aGVuIGluIHRoZSBtYWluIGBzZW5kZXJLZXlzYCBzdG9yZVxuICAvL1xuICAvLyBXaGVuIHRyYW5zYWN0aW9uIGVuZHM6XG4gIC8vXG4gIC8vIC0gc3VjY2Vzc2Z1bGx5OiBwZW5kaW5nIHNlbmRlciBrZXkgc3RvcmVzIGFyZSBiYXRjaGVkIGludG8gdGhlIGRhdGFiYXNlXG4gIC8vIC0gd2l0aCBhbiBlcnJvcjogcGVuZGluZyBzZW5kZXIga2V5IHN0b3JlcyBhcmUgcmV2ZXJ0ZWRcblxuICBhc3luYyBlbnF1ZXVlU2VuZGVyS2V5Sm9iPFQ+KFxuICAgIHF1YWxpZmllZEFkZHJlc3M6IFF1YWxpZmllZEFkZHJlc3MsXG4gICAgdGFzazogKCkgPT4gUHJvbWlzZTxUPixcbiAgICB6b25lID0gR0xPQkFMX1pPTkVcbiAgKTogUHJvbWlzZTxUPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoem9uZSwgJ2VucXVldWVTZW5kZXJLZXlKb2InLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZSA9IHRoaXMuX2dldFNlbmRlcktleVF1ZXVlKHF1YWxpZmllZEFkZHJlc3MpO1xuXG4gICAgICByZXR1cm4gcXVldWUuYWRkPFQ+KHRhc2spO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlU2VuZGVyS2V5UXVldWUoKTogUFF1ZXVlIHtcbiAgICByZXR1cm4gbmV3IFBRdWV1ZSh7XG4gICAgICBjb25jdXJyZW5jeTogMSxcbiAgICAgIHRpbWVvdXQ6IDEwMDAgKiA2MCAqIDIsXG4gICAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldFNlbmRlcktleVF1ZXVlKHNlbmRlcklkOiBRdWFsaWZpZWRBZGRyZXNzKTogUFF1ZXVlIHtcbiAgICBjb25zdCBjYWNoZWRRdWV1ZSA9IHRoaXMuc2VuZGVyS2V5UXVldWVzLmdldChzZW5kZXJJZC50b1N0cmluZygpKTtcbiAgICBpZiAoY2FjaGVkUXVldWUpIHtcbiAgICAgIHJldHVybiBjYWNoZWRRdWV1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBmcmVzaFF1ZXVlID0gdGhpcy5fY3JlYXRlU2VuZGVyS2V5UXVldWUoKTtcbiAgICB0aGlzLnNlbmRlcktleVF1ZXVlcy5zZXQoc2VuZGVySWQudG9TdHJpbmcoKSwgZnJlc2hRdWV1ZSk7XG4gICAgcmV0dXJuIGZyZXNoUXVldWU7XG4gIH1cblxuICBwcml2YXRlIGdldFNlbmRlcktleUlkKFxuICAgIHNlbmRlcktleUlkOiBRdWFsaWZpZWRBZGRyZXNzLFxuICAgIGRpc3RyaWJ1dGlvbklkOiBzdHJpbmdcbiAgKTogU2VuZGVyS2V5SWRUeXBlIHtcbiAgICByZXR1cm4gYCR7c2VuZGVyS2V5SWQudG9TdHJpbmcoKX0tLSR7ZGlzdHJpYnV0aW9uSWR9YDtcbiAgfVxuXG4gIGFzeW5jIHNhdmVTZW5kZXJLZXkoXG4gICAgcXVhbGlmaWVkQWRkcmVzczogUXVhbGlmaWVkQWRkcmVzcyxcbiAgICBkaXN0cmlidXRpb25JZDogc3RyaW5nLFxuICAgIHJlY29yZDogU2VuZGVyS2V5UmVjb3JkLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLndpdGhab25lKHpvbmUsICdzYXZlU2VuZGVyS2V5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNlbmRlcktleXMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzYXZlU2VuZGVyS2V5OiB0aGlzLnNlbmRlcktleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbmRlcklkID0gcXVhbGlmaWVkQWRkcmVzcy50b1N0cmluZygpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpZCA9IHRoaXMuZ2V0U2VuZGVyS2V5SWQocXVhbGlmaWVkQWRkcmVzcywgZGlzdHJpYnV0aW9uSWQpO1xuXG4gICAgICAgIGNvbnN0IGZyb21EQjogU2VuZGVyS2V5VHlwZSA9IHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICBzZW5kZXJJZCxcbiAgICAgICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgICAgICBkYXRhOiByZWNvcmQuc2VyaWFsaXplKCksXG4gICAgICAgICAgbGFzdFVwZGF0ZWREYXRlOiBEYXRlLm5vdygpLFxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMucGVuZGluZ1NlbmRlcktleXMuc2V0KGlkLCB7XG4gICAgICAgICAgaHlkcmF0ZWQ6IHRydWUsXG4gICAgICAgICAgZnJvbURCLFxuICAgICAgICAgIGl0ZW06IHJlY29yZCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gQ3VycmVudCB6b25lIGRvZXNuJ3Qgc3VwcG9ydCBwZW5kaW5nIHNlc3Npb25zIC0gY29tbWl0IGltbWVkaWF0ZWx5XG4gICAgICAgIGlmICghem9uZS5zdXBwb3J0c1BlbmRpbmdTZW5kZXJLZXlzKCkpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNvbW1pdFpvbmVDaGFuZ2VzKCdzYXZlU2VuZGVyS2V5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVycm9yU3RyaW5nID0gZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yO1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYHNhdmVTZW5kZXJLZXk6IGZhaWxlZCB0byBzYXZlIHNlbmRlcktleSAke3NlbmRlcklkfS8ke2Rpc3RyaWJ1dGlvbklkfTogJHtlcnJvclN0cmluZ31gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXRTZW5kZXJLZXkoXG4gICAgcXVhbGlmaWVkQWRkcmVzczogUXVhbGlmaWVkQWRkcmVzcyxcbiAgICBkaXN0cmlidXRpb25JZDogc3RyaW5nLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPFNlbmRlcktleVJlY29yZCB8IHVuZGVmaW5lZD4ge1xuICAgIHJldHVybiB0aGlzLndpdGhab25lKHpvbmUsICdnZXRTZW5kZXJLZXknLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2VuZGVyS2V5cykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNlbmRlcktleTogdGhpcy5zZW5kZXJLZXlzIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZW5kZXJJZCA9IHF1YWxpZmllZEFkZHJlc3MudG9TdHJpbmcoKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgaWQgPSB0aGlzLmdldFNlbmRlcktleUlkKHF1YWxpZmllZEFkZHJlc3MsIGRpc3RyaWJ1dGlvbklkKTtcblxuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLnBlbmRpbmdTZW5kZXJLZXlzLmhhcyhpZClcbiAgICAgICAgICA/IHRoaXMucGVuZGluZ1NlbmRlcktleXNcbiAgICAgICAgICA6IHRoaXMuc2VuZGVyS2V5cztcbiAgICAgICAgY29uc3QgZW50cnkgPSBtYXAuZ2V0KGlkKTtcblxuICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggc2VuZGVyIGtleTonLCBpZCk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS5oeWRyYXRlZCkge1xuICAgICAgICAgIGxvZy5pbmZvKCdTdWNjZXNzZnVsbHkgZmV0Y2hlZCBzZW5kZXIga2V5IChjYWNoZSBoaXQpOicsIGlkKTtcbiAgICAgICAgICByZXR1cm4gZW50cnkuaXRlbTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGl0ZW0gPSBTZW5kZXJLZXlSZWNvcmQuZGVzZXJpYWxpemUoXG4gICAgICAgICAgQnVmZmVyLmZyb20oZW50cnkuZnJvbURCLmRhdGEpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2VuZGVyS2V5cy5zZXQoaWQsIHtcbiAgICAgICAgICBoeWRyYXRlZDogdHJ1ZSxcbiAgICAgICAgICBpdGVtLFxuICAgICAgICAgIGZyb21EQjogZW50cnkuZnJvbURCLFxuICAgICAgICB9KTtcbiAgICAgICAgbG9nLmluZm8oJ1N1Y2Nlc3NmdWxseSBmZXRjaGVkIHNlbmRlciBrZXkoY2FjaGUgbWlzcyk6JywgaWQpO1xuICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVycm9yU3RyaW5nID0gZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yO1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYGdldFNlbmRlcktleTogZmFpbGVkIHRvIGxvYWQgc2VuZGVyIGtleSAke3NlbmRlcklkfS8ke2Rpc3RyaWJ1dGlvbklkfTogJHtlcnJvclN0cmluZ31gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyByZW1vdmVTZW5kZXJLZXkoXG4gICAgcXVhbGlmaWVkQWRkcmVzczogUXVhbGlmaWVkQWRkcmVzcyxcbiAgICBkaXN0cmlidXRpb25JZDogc3RyaW5nXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghdGhpcy5zZW5kZXJLZXlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFNlbmRlcktleTogdGhpcy5zZW5kZXJLZXlzIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgIH1cblxuICAgIGNvbnN0IHNlbmRlcklkID0gcXVhbGlmaWVkQWRkcmVzcy50b1N0cmluZygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGlkID0gdGhpcy5nZXRTZW5kZXJLZXlJZChxdWFsaWZpZWRBZGRyZXNzLCBkaXN0cmlidXRpb25JZCk7XG5cbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVTZW5kZXJLZXlCeUlkKGlkKTtcblxuICAgICAgdGhpcy5zZW5kZXJLZXlzLmRlbGV0ZShpZCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yU3RyaW5nID0gZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yO1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgcmVtb3ZlU2VuZGVyS2V5OiBmYWlsZWQgdG8gcmVtb3ZlIHNlbmRlcktleSAke3NlbmRlcklkfS8ke2Rpc3RyaWJ1dGlvbklkfTogJHtlcnJvclN0cmluZ31gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUFsbFNlbmRlcktleXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdyZW1vdmVBbGxTZW5kZXJLZXlzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKHRoaXMuc2VuZGVyS2V5cykge1xuICAgICAgICB0aGlzLnNlbmRlcktleXMuY2xlYXIoKTtcbiAgICAgIH1cbiAgICAgIGlmICh0aGlzLnBlbmRpbmdTZW5kZXJLZXlzKSB7XG4gICAgICAgIHRoaXMucGVuZGluZ1NlbmRlcktleXMuY2xlYXIoKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVBbGxTZW5kZXJLZXlzKCk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBTZXNzaW9uIFF1ZXVlXG5cbiAgYXN5bmMgZW5xdWV1ZVNlc3Npb25Kb2I8VD4oXG4gICAgcXVhbGlmaWVkQWRkcmVzczogUXVhbGlmaWVkQWRkcmVzcyxcbiAgICB0YXNrOiAoKSA9PiBQcm9taXNlPFQ+LFxuICAgIHpvbmU6IFpvbmUgPSBHTE9CQUxfWk9ORVxuICApOiBQcm9taXNlPFQ+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZSh6b25lLCAnZW5xdWV1ZVNlc3Npb25Kb2InLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBxdWV1ZSA9IHRoaXMuX2dldFNlc3Npb25RdWV1ZShxdWFsaWZpZWRBZGRyZXNzKTtcblxuICAgICAgcmV0dXJuIHF1ZXVlLmFkZDxUPih0YXNrKTtcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgX2NyZWF0ZVNlc3Npb25RdWV1ZSgpOiBQUXVldWUge1xuICAgIHJldHVybiBuZXcgUFF1ZXVlKHtcbiAgICAgIGNvbmN1cnJlbmN5OiAxLFxuICAgICAgdGltZW91dDogMTAwMCAqIDYwICogMixcbiAgICAgIHRocm93T25UaW1lb3V0OiB0cnVlLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0U2Vzc2lvblF1ZXVlKGlkOiBRdWFsaWZpZWRBZGRyZXNzKTogUFF1ZXVlIHtcbiAgICBjb25zdCBjYWNoZWRRdWV1ZSA9IHRoaXMuc2Vzc2lvblF1ZXVlcy5nZXQoaWQudG9TdHJpbmcoKSk7XG4gICAgaWYgKGNhY2hlZFF1ZXVlKSB7XG4gICAgICByZXR1cm4gY2FjaGVkUXVldWU7XG4gICAgfVxuXG4gICAgY29uc3QgZnJlc2hRdWV1ZSA9IHRoaXMuX2NyZWF0ZVNlc3Npb25RdWV1ZSgpO1xuICAgIHRoaXMuc2Vzc2lvblF1ZXVlcy5zZXQoaWQudG9TdHJpbmcoKSwgZnJlc2hRdWV1ZSk7XG4gICAgcmV0dXJuIGZyZXNoUXVldWU7XG4gIH1cblxuICAvLyBTZXNzaW9uc1xuXG4gIC8vIFJlLWVudHJhbnQgc2Vzc2lvbiB0cmFuc2FjdGlvbiByb3V0aW5lLiBPbmx5IG9uZSBzZXNzaW9uIHRyYW5zYWN0aW9uIGNvdWxkXG4gIC8vIGJlIHJ1bm5pbmcgYXQgdGhlIHNhbWUgdGltZS5cbiAgLy9cbiAgLy8gV2hpbGUgaW4gdHJhbnNhY3Rpb246XG4gIC8vXG4gIC8vIC0gYHN0b3JlU2Vzc2lvbigpYCBhZGRzIHRoZSB1cGRhdGVkIHNlc3Npb24gdG8gdGhlIGBwZW5kaW5nU2Vzc2lvbnNgXG4gIC8vIC0gYGxvYWRTZXNzaW9uKClgIGxvb2tzIHVwIHRoZSBzZXNzaW9uIGZpcnN0IGluIGBwZW5kaW5nU2Vzc2lvbnNgIGFuZCBvbmx5XG4gIC8vICAgdGhlbiBpbiB0aGUgbWFpbiBgc2Vzc2lvbnNgIHN0b3JlXG4gIC8vXG4gIC8vIFdoZW4gdHJhbnNhY3Rpb24gZW5kczpcbiAgLy9cbiAgLy8gLSBzdWNjZXNzZnVsbHk6IHBlbmRpbmcgc2Vzc2lvbiBzdG9yZXMgYXJlIGJhdGNoZWQgaW50byB0aGUgZGF0YWJhc2VcbiAgLy8gLSB3aXRoIGFuIGVycm9yOiBwZW5kaW5nIHNlc3Npb24gc3RvcmVzIGFyZSByZXZlcnRlZFxuXG4gIHB1YmxpYyBhc3luYyB3aXRoWm9uZTxUPihcbiAgICB6b25lOiBab25lLFxuICAgIG5hbWU6IHN0cmluZyxcbiAgICBib2R5OiAoKSA9PiBQcm9taXNlPFQ+XG4gICk6IFByb21pc2U8VD4ge1xuICAgIGNvbnN0IGRlYnVnTmFtZSA9IGB3aXRoWm9uZSgke3pvbmUubmFtZX06JHtuYW1lfSlgO1xuXG4gICAgLy8gQWxsb3cgcmUtZW50ZXJpbmcgZnJvbSBMaWJTaWduYWxTdG9yZXNcbiAgICBpZiAodGhpcy5jdXJyZW50Wm9uZSAmJiB0aGlzLmN1cnJlbnRab25lICE9PSB6b25lKSB7XG4gICAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG5cbiAgICAgIGxvZy5pbmZvKGAke2RlYnVnTmFtZX06IGxvY2tlZCBieSAke3RoaXMuY3VycmVudFpvbmUubmFtZX0sIHdhaXRpbmdgKTtcblxuICAgICAgcmV0dXJuIG5ldyBQcm9taXNlPFQ+KChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgY29uc3QgY2FsbGJhY2sgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZHVyYXRpb24gPSBEYXRlLm5vdygpIC0gc3RhcnQ7XG4gICAgICAgICAgbG9nLmluZm8oYCR7ZGVidWdOYW1lfTogdW5sb2NrZWQgYWZ0ZXIgJHtkdXJhdGlvbn1tc2ApO1xuXG4gICAgICAgICAgLy8gQ2FsbCBgLndpdGhab25lYCBzeW5jaHJvbm91c2x5IGZyb20gYHRoaXMuem9uZVF1ZXVlYCB0byBhdm9pZFxuICAgICAgICAgIC8vIGV4dHJhIGluLWJldHdlZW4gdGlja3Mgd2hpbGUgd2UgYXJlIG9uIG1pY3JvdGFza3MgcXVldWUuXG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHJlc29sdmUoYXdhaXQgdGhpcy53aXRoWm9uZSh6b25lLCBuYW1lLCBib2R5KSk7XG4gICAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9O1xuXG4gICAgICAgIHRoaXMuem9uZVF1ZXVlLnB1c2goeyB6b25lLCBjYWxsYmFjayB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuZW50ZXJab25lKHpvbmUsIG5hbWUpO1xuXG4gICAgbGV0IHJlc3VsdDogVDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgYm9keSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAodGhpcy5pc0luVG9wTGV2ZWxab25lKCkpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5yZXZlcnRab25lQ2hhbmdlcyhuYW1lLCBlcnJvcik7XG4gICAgICB9XG4gICAgICB0aGlzLmxlYXZlWm9uZSh6b25lKTtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzSW5Ub3BMZXZlbFpvbmUoKSkge1xuICAgICAgYXdhaXQgdGhpcy5jb21taXRab25lQ2hhbmdlcyhuYW1lKTtcbiAgICB9XG4gICAgdGhpcy5sZWF2ZVpvbmUoem9uZSk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBjb21taXRab25lQ2hhbmdlcyhuYW1lOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHBlbmRpbmdTZW5kZXJLZXlzLCBwZW5kaW5nU2Vzc2lvbnMsIHBlbmRpbmdVbnByb2Nlc3NlZCB9ID0gdGhpcztcblxuICAgIGlmIChcbiAgICAgIHBlbmRpbmdTZW5kZXJLZXlzLnNpemUgPT09IDAgJiZcbiAgICAgIHBlbmRpbmdTZXNzaW9ucy5zaXplID09PSAwICYmXG4gICAgICBwZW5kaW5nVW5wcm9jZXNzZWQuc2l6ZSA9PT0gMFxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgYGNvbW1pdFpvbmVDaGFuZ2VzKCR7bmFtZX0pOiBgICtcbiAgICAgICAgYHBlbmRpbmcgc2VuZGVyIGtleXMgJHtwZW5kaW5nU2VuZGVyS2V5cy5zaXplfSwgYCArXG4gICAgICAgIGBwZW5kaW5nIHNlc3Npb25zICR7cGVuZGluZ1Nlc3Npb25zLnNpemV9LCBgICtcbiAgICAgICAgYHBlbmRpbmcgdW5wcm9jZXNzZWQgJHtwZW5kaW5nVW5wcm9jZXNzZWQuc2l6ZX1gXG4gICAgKTtcblxuICAgIHRoaXMucGVuZGluZ1NlbmRlcktleXMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5wZW5kaW5nU2Vzc2lvbnMgPSBuZXcgTWFwKCk7XG4gICAgdGhpcy5wZW5kaW5nVW5wcm9jZXNzZWQgPSBuZXcgTWFwKCk7XG5cbiAgICAvLyBDb21taXQgYm90aCBzZW5kZXIga2V5cywgc2Vzc2lvbnMgYW5kIHVucHJvY2Vzc2VkIGluIHRoZSBzYW1lIGRhdGFiYXNlIHRyYW5zYWN0aW9uXG4gICAgLy8gICB0byB1bnJvbGwgYm90aCBvbiBlcnJvci5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY29tbWl0RGVjcnlwdFJlc3VsdCh7XG4gICAgICBzZW5kZXJLZXlzOiBBcnJheS5mcm9tKHBlbmRpbmdTZW5kZXJLZXlzLnZhbHVlcygpKS5tYXAoXG4gICAgICAgICh7IGZyb21EQiB9KSA9PiBmcm9tREJcbiAgICAgICksXG4gICAgICBzZXNzaW9uczogQXJyYXkuZnJvbShwZW5kaW5nU2Vzc2lvbnMudmFsdWVzKCkpLm1hcChcbiAgICAgICAgKHsgZnJvbURCIH0pID0+IGZyb21EQlxuICAgICAgKSxcbiAgICAgIHVucHJvY2Vzc2VkOiBBcnJheS5mcm9tKHBlbmRpbmdVbnByb2Nlc3NlZC52YWx1ZXMoKSksXG4gICAgfSk7XG5cbiAgICAvLyBBcHBseSBjaGFuZ2VzIHRvIGluLW1lbW9yeSBzdG9yYWdlIGFmdGVyIHN1Y2Nlc3NmdWwgREIgd3JpdGUuXG5cbiAgICBjb25zdCB7IHNlc3Npb25zIH0gPSB0aGlzO1xuICAgIGFzc2VydChzZXNzaW9ucyAhPT0gdW5kZWZpbmVkLCBcIkNhbid0IGNvbW1pdCB1bmh5ZHJhdGVkIHNlc3Npb24gc3RvcmFnZVwiKTtcbiAgICBwZW5kaW5nU2Vzc2lvbnMuZm9yRWFjaCgodmFsdWUsIGtleSkgPT4ge1xuICAgICAgc2Vzc2lvbnMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgeyBzZW5kZXJLZXlzIH0gPSB0aGlzO1xuICAgIGFzc2VydChcbiAgICAgIHNlbmRlcktleXMgIT09IHVuZGVmaW5lZCxcbiAgICAgIFwiQ2FuJ3QgY29tbWl0IHVuaHlkcmF0ZWQgc2VuZGVyIGtleSBzdG9yYWdlXCJcbiAgICApO1xuICAgIHBlbmRpbmdTZW5kZXJLZXlzLmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHNlbmRlcktleXMuc2V0KGtleSwgdmFsdWUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyByZXZlcnRab25lQ2hhbmdlcyhuYW1lOiBzdHJpbmcsIGVycm9yOiBFcnJvcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYHJldmVydFpvbmVDaGFuZ2VzKCR7bmFtZX0pOiBgICtcbiAgICAgICAgYHBlbmRpbmcgc2VuZGVyIGtleXMgc2l6ZSAke3RoaXMucGVuZGluZ1NlbmRlcktleXMuc2l6ZX0sIGAgK1xuICAgICAgICBgcGVuZGluZyBzZXNzaW9ucyBzaXplICR7dGhpcy5wZW5kaW5nU2Vzc2lvbnMuc2l6ZX0sIGAgK1xuICAgICAgICBgcGVuZGluZyB1bnByb2Nlc3NlZCBzaXplICR7dGhpcy5wZW5kaW5nVW5wcm9jZXNzZWQuc2l6ZX1gLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2tcbiAgICApO1xuICAgIHRoaXMucGVuZGluZ1NlbmRlcktleXMuY2xlYXIoKTtcbiAgICB0aGlzLnBlbmRpbmdTZXNzaW9ucy5jbGVhcigpO1xuICAgIHRoaXMucGVuZGluZ1VucHJvY2Vzc2VkLmNsZWFyKCk7XG4gIH1cblxuICBwcml2YXRlIGlzSW5Ub3BMZXZlbFpvbmUoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuY3VycmVudFpvbmVEZXB0aCA9PT0gMTtcbiAgfVxuXG4gIHByaXZhdGUgZW50ZXJab25lKHpvbmU6IFpvbmUsIG5hbWU6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuY3VycmVudFpvbmVEZXB0aCArPSAxO1xuICAgIGlmICh0aGlzLmN1cnJlbnRab25lRGVwdGggPT09IDEpIHtcbiAgICAgIGFzc2VydCh0aGlzLmN1cnJlbnRab25lID09PSB1bmRlZmluZWQsICdTaG91bGQgbm90IGJlIGluIHRoZSB6b25lJyk7XG4gICAgICB0aGlzLmN1cnJlbnRab25lID0gem9uZTtcblxuICAgICAgaWYgKHpvbmUgIT09IEdMT0JBTF9aT05FKSB7XG4gICAgICAgIGxvZy5pbmZvKGBTaWduYWxQcm90b2NvbFN0b3JlLmVudGVyWm9uZSgke3pvbmUubmFtZX06JHtuYW1lfSlgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGxlYXZlWm9uZSh6b25lOiBab25lKTogdm9pZCB7XG4gICAgYXNzZXJ0KHRoaXMuY3VycmVudFpvbmUgPT09IHpvbmUsICdTaG91bGQgYmUgaW4gdGhlIGNvcnJlY3Qgem9uZScpO1xuXG4gICAgdGhpcy5jdXJyZW50Wm9uZURlcHRoIC09IDE7XG4gICAgYXNzZXJ0KHRoaXMuY3VycmVudFpvbmVEZXB0aCA+PSAwLCAnVW5tYXRjaGVkIG51bWJlciBvZiBsZWF2ZVpvbmUgY2FsbHMnKTtcblxuICAgIC8vIFNpbmNlIHdlIGFsbG93IHJlLWVudGVyaW5nIHpvbmVzIHdlIG1pZ2h0IGFjdHVhbGx5IGJlIGluIHR3byBvdmVybGFwcGluZ1xuICAgIC8vIGFzeW5jIGNhbGxzLiBMZWF2ZSB0aGUgem9uZSBhbmQgeWllbGQgdG8gYW5vdGhlciBvbmUgb25seSBpZiB0aGVyZSBhcmVcbiAgICAvLyBubyBhY3RpdmUgem9uZSB1c2VycyBhbnltb3JlLlxuICAgIGlmICh0aGlzLmN1cnJlbnRab25lRGVwdGggIT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoem9uZSAhPT0gR0xPQkFMX1pPTkUpIHtcbiAgICAgIGxvZy5pbmZvKGBTaWduYWxQcm90b2NvbFN0b3JlLmxlYXZlWm9uZSgke3pvbmUubmFtZX0pYCk7XG4gICAgfVxuXG4gICAgdGhpcy5jdXJyZW50Wm9uZSA9IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IG5leHQgPSB0aGlzLnpvbmVRdWV1ZS5zaGlmdCgpO1xuICAgIGlmICghbmV4dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHRvRW50ZXIgPSBbbmV4dF07XG5cbiAgICB3aGlsZSAodGhpcy56b25lUXVldWVbMF0/LnpvbmUgPT09IG5leHQuem9uZSkge1xuICAgICAgY29uc3QgZWxlbSA9IHRoaXMuem9uZVF1ZXVlLnNoaWZ0KCk7XG4gICAgICBhc3NlcnQoZWxlbSwgJ1pvbmUgZWxlbWVudCBzaG91bGQgYmUgcHJlc2VudCcpO1xuXG4gICAgICB0b0VudGVyLnB1c2goZWxlbSk7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICBgU2lnbmFsUHJvdG9jb2xTdG9yZTogcnVubmluZyBibG9ja2VkICR7dG9FbnRlci5sZW5ndGh9IGpvYnMgaW4gYCArXG4gICAgICAgIGB6b25lICR7bmV4dC56b25lLm5hbWV9YFxuICAgICk7XG4gICAgZm9yIChjb25zdCB7IGNhbGxiYWNrIH0gb2YgdG9FbnRlcikge1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBsb2FkU2Vzc2lvbihcbiAgICBxdWFsaWZpZWRBZGRyZXNzOiBRdWFsaWZpZWRBZGRyZXNzLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPFNlc3Npb25SZWNvcmQgfCB1bmRlZmluZWQ+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZSh6b25lLCAnbG9hZFNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2Vzc2lvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdsb2FkU2Vzc2lvbjogdGhpcy5zZXNzaW9ucyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHF1YWxpZmllZEFkZHJlc3MgPT09IG51bGwgfHwgcXVhbGlmaWVkQWRkcmVzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbG9hZFNlc3Npb246IHF1YWxpZmllZEFkZHJlc3Mgd2FzIHVuZGVmaW5lZC9udWxsJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlkID0gcXVhbGlmaWVkQWRkcmVzcy50b1N0cmluZygpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBtYXAgPSB0aGlzLnBlbmRpbmdTZXNzaW9ucy5oYXMoaWQpXG4gICAgICAgICAgPyB0aGlzLnBlbmRpbmdTZXNzaW9uc1xuICAgICAgICAgIDogdGhpcy5zZXNzaW9ucztcbiAgICAgICAgY29uc3QgZW50cnkgPSBtYXAuZ2V0KGlkKTtcblxuICAgICAgICBpZiAoIWVudHJ5KSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChlbnRyeS5oeWRyYXRlZCkge1xuICAgICAgICAgIHJldHVybiBlbnRyeS5pdGVtO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gV2UnbGwgZWl0aGVyIGp1c3QgaHlkcmF0ZSB0aGUgaXRlbSBvciB3ZSdsbCBmdWxseSBtaWdyYXRlIHRoZSBzZXNzaW9uXG4gICAgICAgIC8vICAgYW5kIHNhdmUgaXQgdG8gdGhlIGRhdGFiYXNlLlxuICAgICAgICByZXR1cm4gYXdhaXQgdGhpcy5fbWF5YmVNaWdyYXRlU2Vzc2lvbihlbnRyeS5mcm9tREIsIHsgem9uZSB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVycm9yU3RyaW5nID0gZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yO1xuICAgICAgICBsb2cuZXJyb3IoYGxvYWRTZXNzaW9uOiBmYWlsZWQgdG8gbG9hZCBzZXNzaW9uICR7aWR9OiAke2Vycm9yU3RyaW5nfWApO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbG9hZFNlc3Npb25zKFxuICAgIHF1YWxpZmllZEFkZHJlc3NlczogQXJyYXk8UXVhbGlmaWVkQWRkcmVzcz4sXG4gICAgeyB6b25lID0gR0xPQkFMX1pPTkUgfTogU2Vzc2lvblRyYW5zYWN0aW9uT3B0aW9ucyA9IHt9XG4gICk6IFByb21pc2U8QXJyYXk8U2Vzc2lvblJlY29yZD4+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZSh6b25lLCAnbG9hZFNlc3Npb25zJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgc2Vzc2lvbnMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgcXVhbGlmaWVkQWRkcmVzc2VzLm1hcChhc3luYyBhZGRyZXNzID0+XG4gICAgICAgICAgdGhpcy5sb2FkU2Vzc2lvbihhZGRyZXNzLCB7IHpvbmUgfSlcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIHNlc3Npb25zLmZpbHRlcihpc05vdE5pbCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9tYXliZU1pZ3JhdGVTZXNzaW9uKFxuICAgIHNlc3Npb246IFNlc3Npb25UeXBlLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPFNlc3Npb25SZWNvcmQ+IHtcbiAgICBpZiAoIXRoaXMuc2Vzc2lvbnMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignX21heWJlTWlncmF0ZVNlc3Npb246IHRoaXMuc2Vzc2lvbnMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgLy8gQWxyZWFkeSBtaWdyYXRlZCwgaHlkcmF0ZSBhbmQgdXBkYXRlIGNhY2hlXG4gICAgaWYgKHNlc3Npb24udmVyc2lvbiA9PT0gMikge1xuICAgICAgY29uc3QgaXRlbSA9IGh5ZHJhdGVTZXNzaW9uKHNlc3Npb24pO1xuXG4gICAgICBjb25zdCBtYXAgPSB0aGlzLnBlbmRpbmdTZXNzaW9ucy5oYXMoc2Vzc2lvbi5pZClcbiAgICAgICAgPyB0aGlzLnBlbmRpbmdTZXNzaW9uc1xuICAgICAgICA6IHRoaXMuc2Vzc2lvbnM7XG4gICAgICBtYXAuc2V0KHNlc3Npb24uaWQsIHtcbiAgICAgICAgaHlkcmF0ZWQ6IHRydWUsXG4gICAgICAgIGl0ZW0sXG4gICAgICAgIGZyb21EQjogc2Vzc2lvbixcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gaXRlbTtcbiAgICB9XG5cbiAgICAvLyBOb3QgeWV0IGNvbnZlcnRlZCwgbmVlZCB0byB0cmFuc2xhdGUgdG8gbmV3IGZvcm1hdCBhbmQgc2F2ZVxuICAgIGlmIChzZXNzaW9uLnZlcnNpb24gIT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdfbWF5YmVNaWdyYXRlU2Vzc2lvbjogVW5rbm93biBzZXNzaW9uIHZlcnNpb24gdHlwZSEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBvdXJVdWlkID0gbmV3IFVVSUQoc2Vzc2lvbi5vdXJVdWlkKTtcblxuICAgIGNvbnN0IGtleVBhaXIgPSBhd2FpdCB0aGlzLmdldElkZW50aXR5S2V5UGFpcihvdXJVdWlkKTtcbiAgICBpZiAoIWtleVBhaXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignX21heWJlTWlncmF0ZVNlc3Npb246IE5vIGlkZW50aXR5IGtleSBmb3Igb3Vyc2VsZiEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhbFJlZ2lzdHJhdGlvbklkID0gYXdhaXQgdGhpcy5nZXRMb2NhbFJlZ2lzdHJhdGlvbklkKG91clV1aWQpO1xuICAgIGlmICghaXNOdW1iZXIobG9jYWxSZWdpc3RyYXRpb25JZCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignX21heWJlTWlncmF0ZVNlc3Npb246IE5vIHJlZ2lzdHJhdGlvbiBpZCBmb3Igb3Vyc2VsZiEnKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhbFVzZXJEYXRhID0ge1xuICAgICAgaWRlbnRpdHlLZXlQdWJsaWM6IGtleVBhaXIucHViS2V5LFxuICAgICAgcmVnaXN0cmF0aW9uSWQ6IGxvY2FsUmVnaXN0cmF0aW9uSWQsXG4gICAgfTtcblxuICAgIGxvZy5pbmZvKGBfbWF5YmVNaWdyYXRlU2Vzc2lvbjogTWlncmF0aW5nIHNlc3Npb24gd2l0aCBpZCAke3Nlc3Npb24uaWR9YCk7XG4gICAgY29uc3Qgc2Vzc2lvblByb3RvID0gc2Vzc2lvblJlY29yZFRvUHJvdG9idWYoXG4gICAgICBKU09OLnBhcnNlKHNlc3Npb24ucmVjb3JkKSxcbiAgICAgIGxvY2FsVXNlckRhdGFcbiAgICApO1xuICAgIGNvbnN0IHJlY29yZCA9IFNlc3Npb25SZWNvcmQuZGVzZXJpYWxpemUoXG4gICAgICBCdWZmZXIuZnJvbShzZXNzaW9uU3RydWN0dXJlVG9CeXRlcyhzZXNzaW9uUHJvdG8pKVxuICAgICk7XG5cbiAgICBhd2FpdCB0aGlzLnN0b3JlU2Vzc2lvbihRdWFsaWZpZWRBZGRyZXNzLnBhcnNlKHNlc3Npb24uaWQpLCByZWNvcmQsIHtcbiAgICAgIHpvbmUsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcmVjb3JkO1xuICB9XG5cbiAgYXN5bmMgc3RvcmVTZXNzaW9uKFxuICAgIHF1YWxpZmllZEFkZHJlc3M6IFF1YWxpZmllZEFkZHJlc3MsXG4gICAgcmVjb3JkOiBTZXNzaW9uUmVjb3JkLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLndpdGhab25lKHpvbmUsICdzdG9yZVNlc3Npb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMuc2Vzc2lvbnMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdzdG9yZVNlc3Npb246IHRoaXMuc2Vzc2lvbnMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgICB9XG5cbiAgICAgIGlmIChxdWFsaWZpZWRBZGRyZXNzID09PSBudWxsIHx8IHF1YWxpZmllZEFkZHJlc3MgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3JlU2Vzc2lvbjogcXVhbGlmaWVkQWRkcmVzcyB3YXMgdW5kZWZpbmVkL251bGwnKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHsgdXVpZCwgZGV2aWNlSWQgfSA9IHF1YWxpZmllZEFkZHJlc3M7XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgIHV1aWQ6IHV1aWQudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBjb252ZXJzYXRpb25JZCAhPT0gdW5kZWZpbmVkLFxuICAgICAgICAnc3RvcmVTZXNzaW9uOiBFbnN1cmUgY29udGFjdCBpZHMgZmFpbGVkJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGlkID0gcXVhbGlmaWVkQWRkcmVzcy50b1N0cmluZygpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBmcm9tREIgPSB7XG4gICAgICAgICAgaWQsXG4gICAgICAgICAgdmVyc2lvbjogMixcbiAgICAgICAgICBvdXJVdWlkOiBxdWFsaWZpZWRBZGRyZXNzLm91clV1aWQudG9TdHJpbmcoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICB1dWlkOiB1dWlkLnRvU3RyaW5nKCksXG4gICAgICAgICAgZGV2aWNlSWQsXG4gICAgICAgICAgcmVjb3JkOiByZWNvcmQuc2VyaWFsaXplKCkudG9TdHJpbmcoJ2Jhc2U2NCcpLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IG5ld1Nlc3Npb24gPSB7XG4gICAgICAgICAgaHlkcmF0ZWQ6IHRydWUsXG4gICAgICAgICAgZnJvbURCLFxuICAgICAgICAgIGl0ZW06IHJlY29yZCxcbiAgICAgICAgfTtcblxuICAgICAgICBhc3NlcnQodGhpcy5jdXJyZW50Wm9uZSwgJ011c3QgcnVuIGluIHRoZSB6b25lJyk7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nU2Vzc2lvbnMuc2V0KGlkLCBuZXdTZXNzaW9uKTtcblxuICAgICAgICAvLyBDdXJyZW50IHpvbmUgZG9lc24ndCBzdXBwb3J0IHBlbmRpbmcgc2Vzc2lvbnMgLSBjb21taXQgaW1tZWRpYXRlbHlcbiAgICAgICAgaWYgKCF6b25lLnN1cHBvcnRzUGVuZGluZ1Nlc3Npb25zKCkpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmNvbW1pdFpvbmVDaGFuZ2VzKCdzdG9yZVNlc3Npb24nKTtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgZXJyb3JTdHJpbmcgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICAgIGxvZy5lcnJvcihgc3RvcmVTZXNzaW9uOiBTYXZlIGZhaWxlZCBmb3IgJHtpZH06ICR7ZXJyb3JTdHJpbmd9YCk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0T3BlbkRldmljZXMoXG4gICAgb3VyVXVpZDogVVVJRCxcbiAgICBpZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPixcbiAgICB7IHpvbmUgPSBHTE9CQUxfWk9ORSB9OiBTZXNzaW9uVHJhbnNhY3Rpb25PcHRpb25zID0ge31cbiAgKTogUHJvbWlzZTx7XG4gICAgZGV2aWNlczogQXJyYXk8RGV2aWNlVHlwZT47XG4gICAgZW1wdHlJZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPjtcbiAgfT4ge1xuICAgIHJldHVybiB0aGlzLndpdGhab25lKHpvbmUsICdnZXRPcGVuRGV2aWNlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXNzaW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldE9wZW5EZXZpY2VzOiB0aGlzLnNlc3Npb25zIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgICAgfVxuICAgICAgaWYgKGlkZW50aWZpZXJzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICByZXR1cm4geyBkZXZpY2VzOiBbXSwgZW1wdHlJZGVudGlmaWVyczogW10gfTtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgdXVpZHNPcklkZW50aWZpZXJzID0gbmV3IFNldChcbiAgICAgICAgICBpZGVudGlmaWVycy5tYXAoXG4gICAgICAgICAgICBpZGVudGlmaWVyID0+IFVVSUQubG9va3VwKGlkZW50aWZpZXIpPy50b1N0cmluZygpIHx8IGlkZW50aWZpZXJcbiAgICAgICAgICApXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgYWxsU2Vzc2lvbnMgPSB0aGlzLl9nZXRBbGxTZXNzaW9ucygpO1xuICAgICAgICBjb25zdCBlbnRyaWVzID0gYWxsU2Vzc2lvbnMuZmlsdGVyKFxuICAgICAgICAgICh7IGZyb21EQiB9KSA9PlxuICAgICAgICAgICAgZnJvbURCLm91clV1aWQgPT09IG91clV1aWQudG9TdHJpbmcoKSAmJlxuICAgICAgICAgICAgdXVpZHNPcklkZW50aWZpZXJzLmhhcyhmcm9tREIudXVpZClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgb3BlbkVudHJpZXM6IEFycmF5PFxuICAgICAgICAgIHwgdW5kZWZpbmVkXG4gICAgICAgICAgfCB7XG4gICAgICAgICAgICAgIGVudHJ5OiBTZXNzaW9uQ2FjaGVFbnRyeTtcbiAgICAgICAgICAgICAgcmVjb3JkOiBTZXNzaW9uUmVjb3JkO1xuICAgICAgICAgICAgfVxuICAgICAgICA+ID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgZW50cmllcy5tYXAoYXN5bmMgZW50cnkgPT4ge1xuICAgICAgICAgICAgaWYgKGVudHJ5Lmh5ZHJhdGVkKSB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlY29yZCA9IGVudHJ5Lml0ZW07XG4gICAgICAgICAgICAgIGlmIChyZWNvcmQuaGFzQ3VycmVudFN0YXRlKCkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4geyByZWNvcmQsIGVudHJ5IH07XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjb25zdCByZWNvcmQgPSBhd2FpdCB0aGlzLl9tYXliZU1pZ3JhdGVTZXNzaW9uKGVudHJ5LmZyb21EQiwge1xuICAgICAgICAgICAgICB6b25lLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocmVjb3JkLmhhc0N1cnJlbnRTdGF0ZSgpKSB7XG4gICAgICAgICAgICAgIHJldHVybiB7IHJlY29yZCwgZW50cnkgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGRldmljZXMgPSBvcGVuRW50cmllc1xuICAgICAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgICAgICBpZiAoIWl0ZW0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHsgZW50cnksIHJlY29yZCB9ID0gaXRlbTtcblxuICAgICAgICAgICAgY29uc3QgeyB1dWlkIH0gPSBlbnRyeS5mcm9tREI7XG4gICAgICAgICAgICB1dWlkc09ySWRlbnRpZmllcnMuZGVsZXRlKHV1aWQpO1xuXG4gICAgICAgICAgICBjb25zdCBpZCA9IGVudHJ5LmZyb21EQi5kZXZpY2VJZDtcblxuICAgICAgICAgICAgY29uc3QgcmVnaXN0cmF0aW9uSWQgPSByZWNvcmQucmVtb3RlUmVnaXN0cmF0aW9uSWQoKTtcblxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgaWRlbnRpZmllcjogdXVpZCxcbiAgICAgICAgICAgICAgaWQsXG4gICAgICAgICAgICAgIHJlZ2lzdHJhdGlvbklkLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuICAgICAgICBjb25zdCBlbXB0eUlkZW50aWZpZXJzID0gQXJyYXkuZnJvbSh1dWlkc09ySWRlbnRpZmllcnMudmFsdWVzKCkpO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgZGV2aWNlcyxcbiAgICAgICAgICBlbXB0eUlkZW50aWZpZXJzLFxuICAgICAgICB9O1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICdnZXRPcGVuRGV2aWNlczogRmFpbGVkIHRvIGdldCBkZXZpY2VzJyxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBnZXREZXZpY2VJZHMoe1xuICAgIG91clV1aWQsXG4gICAgaWRlbnRpZmllcixcbiAgfTogUmVhZG9ubHk8e1xuICAgIG91clV1aWQ6IFVVSUQ7XG4gICAgaWRlbnRpZmllcjogc3RyaW5nO1xuICB9Pik6IFByb21pc2U8QXJyYXk8bnVtYmVyPj4ge1xuICAgIGNvbnN0IHsgZGV2aWNlcyB9ID0gYXdhaXQgdGhpcy5nZXRPcGVuRGV2aWNlcyhvdXJVdWlkLCBbaWRlbnRpZmllcl0pO1xuICAgIHJldHVybiBkZXZpY2VzLm1hcCgoZGV2aWNlOiBEZXZpY2VUeXBlKSA9PiBkZXZpY2UuaWQpO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlU2Vzc2lvbihxdWFsaWZpZWRBZGRyZXNzOiBRdWFsaWZpZWRBZGRyZXNzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdyZW1vdmVTZXNzaW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgaWYgKCF0aGlzLnNlc3Npb25zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlU2Vzc2lvbjogdGhpcy5zZXNzaW9ucyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaWQgPSBxdWFsaWZpZWRBZGRyZXNzLnRvU3RyaW5nKCk7XG4gICAgICBsb2cuaW5mbygncmVtb3ZlU2Vzc2lvbjogZGVsZXRpbmcgc2Vzc2lvbiBmb3InLCBpZCk7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlU2Vzc2lvbkJ5SWQoaWQpO1xuICAgICAgICB0aGlzLnNlc3Npb25zLmRlbGV0ZShpZCk7XG4gICAgICAgIHRoaXMucGVuZGluZ1Nlc3Npb25zLmRlbGV0ZShpZCk7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIGxvZy5lcnJvcihgcmVtb3ZlU2Vzc2lvbjogRmFpbGVkIHRvIGRlbGV0ZSBzZXNzaW9uIGZvciAke2lkfWApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlQWxsU2Vzc2lvbnMoaWRlbnRpZmllcjogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdyZW1vdmVBbGxTZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXNzaW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3JlbW92ZUFsbFNlc3Npb25zOiB0aGlzLnNlc3Npb25zIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoaWRlbnRpZmllciA9PT0gbnVsbCB8fCBpZGVudGlmaWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVBbGxTZXNzaW9uczogaWRlbnRpZmllciB3YXMgdW5kZWZpbmVkL251bGwnKTtcbiAgICAgIH1cblxuICAgICAgbG9nLmluZm8oJ3JlbW92ZUFsbFNlc3Npb25zOiBkZWxldGluZyBzZXNzaW9ucyBmb3InLCBpZGVudGlmaWVyKTtcblxuICAgICAgY29uc3QgaWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRDb252ZXJzYXRpb25JZChpZGVudGlmaWVyKTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgaWQsXG4gICAgICAgIGByZW1vdmVBbGxTZXNzaW9uczogQ29udmVyc2F0aW9uIG5vdCBmb3VuZDogJHtpZGVudGlmaWVyfWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKHRoaXMuc2Vzc2lvbnMudmFsdWVzKCkpO1xuXG4gICAgICBmb3IgKGxldCBpID0gMCwgbWF4ID0gZW50cmllcy5sZW5ndGg7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBlbnRyeSA9IGVudHJpZXNbaV07XG4gICAgICAgIGlmIChlbnRyeS5mcm9tREIuY29udmVyc2F0aW9uSWQgPT09IGlkKSB7XG4gICAgICAgICAgdGhpcy5zZXNzaW9ucy5kZWxldGUoZW50cnkuZnJvbURCLmlkKTtcbiAgICAgICAgICB0aGlzLnBlbmRpbmdTZXNzaW9ucy5kZWxldGUoZW50cnkuZnJvbURCLmlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlU2Vzc2lvbnNCeUNvbnZlcnNhdGlvbihpZCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIF9hcmNoaXZlU2Vzc2lvbihlbnRyeT86IFNlc3Npb25DYWNoZUVudHJ5LCB6b25lPzogWm9uZSkge1xuICAgIGlmICghZW50cnkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRyID0gUXVhbGlmaWVkQWRkcmVzcy5wYXJzZShlbnRyeS5mcm9tREIuaWQpO1xuXG4gICAgYXdhaXQgdGhpcy5lbnF1ZXVlU2Vzc2lvbkpvYihcbiAgICAgIGFkZHIsXG4gICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBlbnRyeS5oeWRyYXRlZFxuICAgICAgICAgID8gZW50cnkuaXRlbVxuICAgICAgICAgIDogYXdhaXQgdGhpcy5fbWF5YmVNaWdyYXRlU2Vzc2lvbihlbnRyeS5mcm9tREIsIHsgem9uZSB9KTtcblxuICAgICAgICBpZiAoIWl0ZW0uaGFzQ3VycmVudFN0YXRlKCkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpdGVtLmFyY2hpdmVDdXJyZW50U3RhdGUoKTtcblxuICAgICAgICBhd2FpdCB0aGlzLnN0b3JlU2Vzc2lvbihhZGRyLCBpdGVtLCB7IHpvbmUgfSk7XG4gICAgICB9LFxuICAgICAgem9uZVxuICAgICk7XG4gIH1cblxuICBhc3luYyBhcmNoaXZlU2Vzc2lvbihxdWFsaWZpZWRBZGRyZXNzOiBRdWFsaWZpZWRBZGRyZXNzKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdhcmNoaXZlU2Vzc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXNzaW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyY2hpdmVTZXNzaW9uOiB0aGlzLnNlc3Npb25zIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpZCA9IHF1YWxpZmllZEFkZHJlc3MudG9TdHJpbmcoKTtcblxuICAgICAgbG9nLmluZm8oYGFyY2hpdmVTZXNzaW9uOiBzZXNzaW9uIGZvciAke2lkfWApO1xuXG4gICAgICBjb25zdCBlbnRyeSA9IHRoaXMucGVuZGluZ1Nlc3Npb25zLmdldChpZCkgfHwgdGhpcy5zZXNzaW9ucy5nZXQoaWQpO1xuXG4gICAgICBhd2FpdCB0aGlzLl9hcmNoaXZlU2Vzc2lvbihlbnRyeSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBhcmNoaXZlU2libGluZ1Nlc3Npb25zKFxuICAgIGVuY29kZWRBZGRyZXNzOiBBZGRyZXNzLFxuICAgIHsgem9uZSA9IEdMT0JBTF9aT05FIH06IFNlc3Npb25UcmFuc2FjdGlvbk9wdGlvbnMgPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZSh6b25lLCAnYXJjaGl2ZVNpYmxpbmdTZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXNzaW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2FyY2hpdmVTaWJsaW5nU2Vzc2lvbnM6IHRoaXMuc2Vzc2lvbnMgbm90IHlldCBjYWNoZWQhJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ2FyY2hpdmVTaWJsaW5nU2Vzc2lvbnM6IGFyY2hpdmluZyBzaWJsaW5nIHNlc3Npb25zIGZvcicsXG4gICAgICAgIGVuY29kZWRBZGRyZXNzLnRvU3RyaW5nKClcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHsgdXVpZCwgZGV2aWNlSWQgfSA9IGVuY29kZWRBZGRyZXNzO1xuXG4gICAgICBjb25zdCBhbGxFbnRyaWVzID0gdGhpcy5fZ2V0QWxsU2Vzc2lvbnMoKTtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSBhbGxFbnRyaWVzLmZpbHRlcihcbiAgICAgICAgZW50cnkgPT5cbiAgICAgICAgICBlbnRyeS5mcm9tREIudXVpZCA9PT0gdXVpZC50b1N0cmluZygpICYmXG4gICAgICAgICAgZW50cnkuZnJvbURCLmRldmljZUlkICE9PSBkZXZpY2VJZFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGVudHJpZXMubWFwKGFzeW5jIGVudHJ5ID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9hcmNoaXZlU2Vzc2lvbihlbnRyeSwgem9uZSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgYXJjaGl2ZUFsbFNlc3Npb25zKHV1aWQ6IFVVSUQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZShHTE9CQUxfWk9ORSwgJ2FyY2hpdmVBbGxTZXNzaW9ucycsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghdGhpcy5zZXNzaW9ucykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2FyY2hpdmVBbGxTZXNzaW9uczogdGhpcy5zZXNzaW9ucyBub3QgeWV0IGNhY2hlZCEnKTtcbiAgICAgIH1cblxuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdhcmNoaXZlQWxsU2Vzc2lvbnM6IGFyY2hpdmluZyBhbGwgc2Vzc2lvbnMgZm9yJyxcbiAgICAgICAgdXVpZC50b1N0cmluZygpXG4gICAgICApO1xuXG4gICAgICBjb25zdCBhbGxFbnRyaWVzID0gdGhpcy5fZ2V0QWxsU2Vzc2lvbnMoKTtcbiAgICAgIGNvbnN0IGVudHJpZXMgPSBhbGxFbnRyaWVzLmZpbHRlcihcbiAgICAgICAgZW50cnkgPT4gZW50cnkuZnJvbURCLnV1aWQgPT09IHV1aWQudG9TdHJpbmcoKVxuICAgICAgKTtcblxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGVudHJpZXMubWFwKGFzeW5jIGVudHJ5ID0+IHtcbiAgICAgICAgICBhd2FpdCB0aGlzLl9hcmNoaXZlU2Vzc2lvbihlbnRyeSk7XG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgY2xlYXJTZXNzaW9uU3RvcmUoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdjbGVhclNlc3Npb25TdG9yZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGlmICh0aGlzLnNlc3Npb25zKSB7XG4gICAgICAgIHRoaXMuc2Vzc2lvbnMuY2xlYXIoKTtcbiAgICAgIH1cbiAgICAgIHRoaXMucGVuZGluZ1Nlc3Npb25zLmNsZWFyKCk7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlQWxsU2Vzc2lvbnMoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGxpZ2h0U2Vzc2lvblJlc2V0KHF1YWxpZmllZEFkZHJlc3M6IFF1YWxpZmllZEFkZHJlc3MpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpZCA9IHF1YWxpZmllZEFkZHJlc3MudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IHNlc3Npb25SZXNldHMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoXG4gICAgICAnc2Vzc2lvblJlc2V0cycsXG4gICAgICA8U2Vzc2lvblJlc2V0c1R5cGU+e31cbiAgICApO1xuXG4gICAgY29uc3QgbGFzdFJlc2V0ID0gc2Vzc2lvblJlc2V0c1tpZF07XG5cbiAgICBjb25zdCBPTkVfSE9VUiA9IDYwICogNjAgKiAxMDAwO1xuICAgIGlmIChsYXN0UmVzZXQgJiYgaXNNb3JlUmVjZW50VGhhbihsYXN0UmVzZXQsIE9ORV9IT1VSKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBsaWdodFNlc3Npb25SZXNldC8ke2lkfTogU2tpcHBpbmcgc2Vzc2lvbiByZXNldCwgbGFzdCByZXNldCBhdCAke2xhc3RSZXNldH1gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNlc3Npb25SZXNldHNbaWRdID0gRGF0ZS5ub3coKTtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3Nlc3Npb25SZXNldHMnLCBzZXNzaW9uUmVzZXRzKTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHV1aWQgfSA9IHF1YWxpZmllZEFkZHJlc3M7XG5cbiAgICAgIC8vIEZpcnN0LCBmZXRjaCB0aGlzIGNvbnZlcnNhdGlvblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgdXVpZDogdXVpZC50b1N0cmluZygpLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQoY29udmVyc2F0aW9uSWQsIGBsaWdodFNlc3Npb25SZXNldC8ke2lkfTogbWlzc2luZyBjb252ZXJzYXRpb25JZGApO1xuXG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgYXNzZXJ0KGNvbnZlcnNhdGlvbiwgYGxpZ2h0U2Vzc2lvblJlc2V0LyR7aWR9OiBtaXNzaW5nIGNvbnZlcnNhdGlvbmApO1xuXG4gICAgICBsb2cud2FybihgbGlnaHRTZXNzaW9uUmVzZXQvJHtpZH06IFJlc2V0dGluZyBzZXNzaW9uYCk7XG5cbiAgICAgIC8vIEFyY2hpdmUgb3BlbiBzZXNzaW9uIHdpdGggdGhpcyBkZXZpY2VcbiAgICAgIGF3YWl0IHRoaXMuYXJjaGl2ZVNlc3Npb24ocXVhbGlmaWVkQWRkcmVzcyk7XG5cbiAgICAgIC8vIEVucXVldWUgYSBudWxsIG1lc3NhZ2Ugd2l0aCBuZXdseS1jcmVhdGVkIHNlc3Npb25cbiAgICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKFxuICAgICAgICBNZXNzYWdlU2VuZGVyLmdldE51bGxNZXNzYWdlKHtcbiAgICAgICAgICB1dWlkOiB1dWlkLnRvU3RyaW5nKCksXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBJZiB3ZSBmYWlsZWQgdG8gZG8gdGhlIHNlc3Npb24gcmVzZXQsIHRoZW4gd2UnbGwgYWxsb3cgYW5vdGhlciBhdHRlbXB0IHNvb25lclxuICAgICAgLy8gICB0aGFuIG9uZSBob3VyIGZyb20gbm93LlxuICAgICAgZGVsZXRlIHNlc3Npb25SZXNldHNbaWRdO1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdzZXNzaW9uUmVzZXRzJywgc2Vzc2lvblJlc2V0cyk7XG5cbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYGxpZ2h0U2Vzc2lvblJlc2V0LyR7aWR9OiBFbmNvdW50ZXJlZCBlcnJvcmAsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gSWRlbnRpdHkgS2V5c1xuXG4gIGdldElkZW50aXR5UmVjb3JkKHV1aWQ6IFVVSUQpOiBJZGVudGl0eUtleVR5cGUgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5pZGVudGl0eUtleXMpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0SWRlbnRpdHlSZWNvcmQ6IHRoaXMuaWRlbnRpdHlLZXlzIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gdXVpZC50b1N0cmluZygpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGVudHJ5ID0gdGhpcy5pZGVudGl0eUtleXMuZ2V0KGlkKTtcbiAgICAgIGlmICghZW50cnkpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGVudHJ5LmZyb21EQjtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBnZXRJZGVudGl0eVJlY29yZDogRmFpbGVkIHRvIGdldCBpZGVudGl0eSByZWNvcmQgZm9yIGlkZW50aWZpZXIgJHtpZH1gXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRPck1pZ3JhdGVJZGVudGl0eVJlY29yZChcbiAgICB1dWlkOiBVVUlEXG4gICk6IFByb21pc2U8SWRlbnRpdHlLZXlUeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCF0aGlzLmlkZW50aXR5S2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnZ2V0T3JNaWdyYXRlSWRlbnRpdHlSZWNvcmQ6IHRoaXMuaWRlbnRpdHlLZXlzIG5vdCB5ZXQgY2FjaGVkISdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXRJZGVudGl0eVJlY29yZCh1dWlkKTtcbiAgICBpZiAocmVzdWx0KSB7XG4gICAgICByZXR1cm4gcmVzdWx0O1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0lkID0gdXVpZC50b1N0cmluZygpO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChuZXdJZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBjb252ZXJzYXRpb24uaWQ7XG4gICAgY29uc3QgcmVjb3JkID0gdGhpcy5pZGVudGl0eUtleXMuZ2V0KGBjb252ZXJzYXRpb246JHtjb252ZXJzYXRpb25JZH1gKTtcbiAgICBpZiAoIXJlY29yZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBuZXdSZWNvcmQgPSB7XG4gICAgICAuLi5yZWNvcmQuZnJvbURCLFxuICAgICAgaWQ6IG5ld0lkLFxuICAgIH07XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBTaWduYWxQcm90b2NvbFN0b3JlOiBtaWdyYXRpbmcgaWRlbnRpdHkga2V5IGZyb20gJHtyZWNvcmQuZnJvbURCLmlkfSBgICtcbiAgICAgICAgYHRvICR7bmV3UmVjb3JkLmlkfWBcbiAgICApO1xuXG4gICAgYXdhaXQgdGhpcy5fc2F2ZUlkZW50aXR5S2V5KG5ld1JlY29yZCk7XG5cbiAgICB0aGlzLmlkZW50aXR5S2V5cy5kZWxldGUocmVjb3JkLmZyb21EQi5pZCk7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZUlkZW50aXR5S2V5QnlJZChyZWNvcmQuZnJvbURCLmlkKTtcblxuICAgIHJldHVybiBuZXdSZWNvcmQ7XG4gIH1cblxuICBhc3luYyBpc1RydXN0ZWRJZGVudGl0eShcbiAgICBlbmNvZGVkQWRkcmVzczogQWRkcmVzcyxcbiAgICBwdWJsaWNLZXk6IFVpbnQ4QXJyYXksXG4gICAgZGlyZWN0aW9uOiBudW1iZXJcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLmlkZW50aXR5S2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpc1RydXN0ZWRJZGVudGl0eTogdGhpcy5pZGVudGl0eUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgaWYgKGVuY29kZWRBZGRyZXNzID09PSBudWxsIHx8IGVuY29kZWRBZGRyZXNzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNUcnVzdGVkSWRlbnRpdHk6IGVuY29kZWRBZGRyZXNzIHdhcyB1bmRlZmluZWQvbnVsbCcpO1xuICAgIH1cbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG4gICAgY29uc3QgaXNPdXJJZGVudGlmaWVyID0gZW5jb2RlZEFkZHJlc3MudXVpZC5pc0VxdWFsKG91clV1aWQpO1xuXG4gICAgY29uc3QgaWRlbnRpdHlSZWNvcmQgPSBhd2FpdCB0aGlzLmdldE9yTWlncmF0ZUlkZW50aXR5UmVjb3JkKFxuICAgICAgZW5jb2RlZEFkZHJlc3MudXVpZFxuICAgICk7XG5cbiAgICBpZiAoaXNPdXJJZGVudGlmaWVyKSB7XG4gICAgICBpZiAoaWRlbnRpdHlSZWNvcmQgJiYgaWRlbnRpdHlSZWNvcmQucHVibGljS2V5KSB7XG4gICAgICAgIHJldHVybiBjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eVJlY29yZC5wdWJsaWNLZXksIHB1YmxpY0tleSk7XG4gICAgICB9XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ2lzVHJ1c3RlZElkZW50aXR5OiBObyBsb2NhbCByZWNvcmQgZm9yIG91ciBvd24gaWRlbnRpZmllci4gUmV0dXJuaW5nIHRydWUuJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHN3aXRjaCAoZGlyZWN0aW9uKSB7XG4gICAgICBjYXNlIERpcmVjdGlvbi5TZW5kaW5nOlxuICAgICAgICByZXR1cm4gdGhpcy5pc1RydXN0ZWRGb3JTZW5kaW5nKHB1YmxpY0tleSwgaWRlbnRpdHlSZWNvcmQpO1xuICAgICAgY2FzZSBEaXJlY3Rpb24uUmVjZWl2aW5nOlxuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgaXNUcnVzdGVkSWRlbnRpdHk6IFVua25vd24gZGlyZWN0aW9uOiAke2RpcmVjdGlvbn1gKTtcbiAgICB9XG4gIH1cblxuICBpc1RydXN0ZWRGb3JTZW5kaW5nKFxuICAgIHB1YmxpY0tleTogVWludDhBcnJheSxcbiAgICBpZGVudGl0eVJlY29yZD86IElkZW50aXR5S2V5VHlwZVxuICApOiBib29sZWFuIHtcbiAgICBpZiAoIWlkZW50aXR5UmVjb3JkKSB7XG4gICAgICBsb2cuaW5mbygnaXNUcnVzdGVkRm9yU2VuZGluZzogTm8gcHJldmlvdXMgcmVjb3JkLCByZXR1cm5pbmcgdHJ1ZS4uLicpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBpZGVudGl0eVJlY29yZC5wdWJsaWNLZXk7XG5cbiAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICBsb2cuaW5mbygnaXNUcnVzdGVkRm9yU2VuZGluZzogTm90aGluZyBoZXJlLCByZXR1cm5pbmcgdHJ1ZS4uLicpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghY29uc3RhbnRUaW1lRXF1YWwoZXhpc3RpbmcsIHB1YmxpY0tleSkpIHtcbiAgICAgIGxvZy5pbmZvKFwiaXNUcnVzdGVkRm9yU2VuZGluZzogSWRlbnRpdHkga2V5cyBkb24ndCBtYXRjaC4uLlwiKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKGlkZW50aXR5UmVjb3JkLnZlcmlmaWVkID09PSBWZXJpZmllZFN0YXR1cy5VTlZFUklGSUVEKSB7XG4gICAgICBsb2cuZXJyb3IoJ2lzVHJ1c3RlZElkZW50aXR5OiBOZWVkcyB1bnZlcmlmaWVkIGFwcHJvdmFsIScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc05vbkJsb2NraW5nQXBwcm92YWxSZXF1aXJlZChpZGVudGl0eVJlY29yZCkpIHtcbiAgICAgIGxvZy5lcnJvcignaXNUcnVzdGVkRm9yU2VuZGluZzogTmVlZHMgbm9uLWJsb2NraW5nIGFwcHJvdmFsIScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgbG9hZElkZW50aXR5S2V5KHV1aWQ6IFVVSUQpOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodXVpZCA9PT0gbnVsbCB8fCB1dWlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbG9hZElkZW50aXR5S2V5OiB1dWlkIHdhcyB1bmRlZmluZWQvbnVsbCcpO1xuICAgIH1cbiAgICBjb25zdCBpZGVudGl0eVJlY29yZCA9IGF3YWl0IHRoaXMuZ2V0T3JNaWdyYXRlSWRlbnRpdHlSZWNvcmQodXVpZCk7XG5cbiAgICBpZiAoaWRlbnRpdHlSZWNvcmQpIHtcbiAgICAgIHJldHVybiBpZGVudGl0eVJlY29yZC5wdWJsaWNLZXk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3NhdmVJZGVudGl0eUtleShkYXRhOiBJZGVudGl0eUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIXRoaXMuaWRlbnRpdHlLZXlzKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ19zYXZlSWRlbnRpdHlLZXk6IHRoaXMuaWRlbnRpdHlLZXlzIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgaWQgfSA9IGRhdGE7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleShkYXRhKTtcbiAgICB0aGlzLmlkZW50aXR5S2V5cy5zZXQoaWQsIHtcbiAgICAgIGh5ZHJhdGVkOiBmYWxzZSxcbiAgICAgIGZyb21EQjogZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVJZGVudGl0eShcbiAgICBlbmNvZGVkQWRkcmVzczogQWRkcmVzcyxcbiAgICBwdWJsaWNLZXk6IFVpbnQ4QXJyYXksXG4gICAgbm9uYmxvY2tpbmdBcHByb3ZhbCA9IGZhbHNlLFxuICAgIHsgem9uZSB9OiBTZXNzaW9uVHJhbnNhY3Rpb25PcHRpb25zID0ge31cbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgaWYgKCF0aGlzLmlkZW50aXR5S2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzYXZlSWRlbnRpdHk6IHRoaXMuaWRlbnRpdHlLZXlzIG5vdCB5ZXQgY2FjaGVkIScpO1xuICAgIH1cblxuICAgIGlmIChlbmNvZGVkQWRkcmVzcyA9PT0gbnVsbCB8fCBlbmNvZGVkQWRkcmVzcyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NhdmVJZGVudGl0eTogZW5jb2RlZEFkZHJlc3Mgd2FzIHVuZGVmaW5lZC9udWxsJyk7XG4gICAgfVxuICAgIGlmICghKHB1YmxpY0tleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIHB1YmxpY0tleSA9IEJ5dGVzLmZyb21CaW5hcnkocHVibGljS2V5KTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBub25ibG9ja2luZ0FwcHJvdmFsICE9PSAnYm9vbGVhbicpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbm9uYmxvY2tpbmdBcHByb3ZhbCA9IGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5UmVjb3JkID0gYXdhaXQgdGhpcy5nZXRPck1pZ3JhdGVJZGVudGl0eVJlY29yZChcbiAgICAgIGVuY29kZWRBZGRyZXNzLnV1aWRcbiAgICApO1xuXG4gICAgY29uc3QgaWQgPSBlbmNvZGVkQWRkcmVzcy51dWlkLnRvU3RyaW5nKCk7XG5cbiAgICBpZiAoIWlkZW50aXR5UmVjb3JkIHx8ICFpZGVudGl0eVJlY29yZC5wdWJsaWNLZXkpIHtcbiAgICAgIC8vIExvb2t1cCBmYWlsZWQsIG9yIHRoZSBjdXJyZW50IGtleSB3YXMgcmVtb3ZlZCwgc28gc2F2ZSB0aGlzIG9uZS5cbiAgICAgIGxvZy5pbmZvKCdzYXZlSWRlbnRpdHk6IFNhdmluZyBuZXcgaWRlbnRpdHkuLi4nKTtcbiAgICAgIGF3YWl0IHRoaXMuX3NhdmVJZGVudGl0eUtleSh7XG4gICAgICAgIGlkLFxuICAgICAgICBwdWJsaWNLZXksXG4gICAgICAgIGZpcnN0VXNlOiB0cnVlLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIHZlcmlmaWVkOiBWZXJpZmllZFN0YXR1cy5ERUZBVUxULFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBvbGRwdWJsaWNLZXkgPSBpZGVudGl0eVJlY29yZC5wdWJsaWNLZXk7XG4gICAgaWYgKCFjb25zdGFudFRpbWVFcXVhbChvbGRwdWJsaWNLZXksIHB1YmxpY0tleSkpIHtcbiAgICAgIGxvZy5pbmZvKCdzYXZlSWRlbnRpdHk6IFJlcGxhY2luZyBleGlzdGluZyBpZGVudGl0eS4uLicpO1xuICAgICAgY29uc3QgcHJldmlvdXNTdGF0dXMgPSBpZGVudGl0eVJlY29yZC52ZXJpZmllZDtcbiAgICAgIGxldCB2ZXJpZmllZFN0YXR1cztcbiAgICAgIGlmIChcbiAgICAgICAgcHJldmlvdXNTdGF0dXMgPT09IFZlcmlmaWVkU3RhdHVzLlZFUklGSUVEIHx8XG4gICAgICAgIHByZXZpb3VzU3RhdHVzID09PSBWZXJpZmllZFN0YXR1cy5VTlZFUklGSUVEXG4gICAgICApIHtcbiAgICAgICAgdmVyaWZpZWRTdGF0dXMgPSBWZXJpZmllZFN0YXR1cy5VTlZFUklGSUVEO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdmVyaWZpZWRTdGF0dXMgPSBWZXJpZmllZFN0YXR1cy5ERUZBVUxUO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB0aGlzLl9zYXZlSWRlbnRpdHlLZXkoe1xuICAgICAgICBpZCxcbiAgICAgICAgcHVibGljS2V5LFxuICAgICAgICBmaXJzdFVzZTogZmFsc2UsXG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgdmVyaWZpZWQ6IHZlcmlmaWVkU3RhdHVzLFxuICAgICAgICBub25ibG9ja2luZ0FwcHJvdmFsLFxuICAgICAgfSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIHRoaXMudHJpZ2dlcigna2V5Y2hhbmdlJywgZW5jb2RlZEFkZHJlc3MudXVpZCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ3NhdmVJZGVudGl0eTogZXJyb3IgdHJpZ2dlcmluZyBrZXljaGFuZ2U6JyxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gUGFzcyB0aGUgem9uZSB0byBmYWNpbGl0YXRlIHRyYW5zYWN0aW9uYWwgc2Vzc2lvbiB1c2UgaW5cbiAgICAgIC8vIE1lc3NhZ2VSZWNlaXZlci50c1xuICAgICAgYXdhaXQgdGhpcy5hcmNoaXZlU2libGluZ1Nlc3Npb25zKGVuY29kZWRBZGRyZXNzLCB7XG4gICAgICAgIHpvbmUsXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICh0aGlzLmlzTm9uQmxvY2tpbmdBcHByb3ZhbFJlcXVpcmVkKGlkZW50aXR5UmVjb3JkKSkge1xuICAgICAgbG9nLmluZm8oJ3NhdmVJZGVudGl0eTogU2V0dGluZyBhcHByb3ZhbCBzdGF0dXMuLi4nKTtcblxuICAgICAgaWRlbnRpdHlSZWNvcmQubm9uYmxvY2tpbmdBcHByb3ZhbCA9IG5vbmJsb2NraW5nQXBwcm92YWw7XG4gICAgICBhd2FpdCB0aGlzLl9zYXZlSWRlbnRpdHlLZXkoaWRlbnRpdHlSZWNvcmQpO1xuXG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaXNOb25CbG9ja2luZ0FwcHJvdmFsUmVxdWlyZWQoaWRlbnRpdHlSZWNvcmQ6IElkZW50aXR5S2V5VHlwZSk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAoXG4gICAgICAhaWRlbnRpdHlSZWNvcmQuZmlyc3RVc2UgJiZcbiAgICAgIGlzTW9yZVJlY2VudFRoYW4oaWRlbnRpdHlSZWNvcmQudGltZXN0YW1wLCBUSU1FU1RBTVBfVEhSRVNIT0xEKSAmJlxuICAgICAgIWlkZW50aXR5UmVjb3JkLm5vbmJsb2NraW5nQXBwcm92YWxcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgc2F2ZUlkZW50aXR5V2l0aEF0dHJpYnV0ZXMoXG4gICAgdXVpZDogVVVJRCxcbiAgICBhdHRyaWJ1dGVzOiBQYXJ0aWFsPElkZW50aXR5S2V5VHlwZT5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHV1aWQgPT09IG51bGwgfHwgdXVpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzOiB1dWlkIHdhcyB1bmRlZmluZWQvbnVsbCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5UmVjb3JkID0gYXdhaXQgdGhpcy5nZXRPck1pZ3JhdGVJZGVudGl0eVJlY29yZCh1dWlkKTtcbiAgICBjb25zdCBpZCA9IHV1aWQudG9TdHJpbmcoKTtcblxuICAgIC8vIFdoZW4gc2F2aW5nIGEgUE5JIGlkZW50aXR5IC0gZG9uJ3QgY3JlYXRlIGEgc2VwYXJhdGUgY29udmVyc2F0aW9uXG4gICAgY29uc3QgdXVpZEtpbmQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0T3VyVXVpZEtpbmQodXVpZCk7XG4gICAgaWYgKHV1aWRLaW5kICE9PSBVVUlES2luZC5QTkkpIHtcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKGlkLCAncHJpdmF0ZScpO1xuICAgIH1cblxuICAgIGNvbnN0IHVwZGF0ZXM6IFBhcnRpYWw8SWRlbnRpdHlLZXlUeXBlPiA9IHtcbiAgICAgIC4uLmlkZW50aXR5UmVjb3JkLFxuICAgICAgLi4uYXR0cmlidXRlcyxcbiAgICAgIGlkLFxuICAgIH07XG5cbiAgICBpZiAodmFsaWRhdGVJZGVudGl0eUtleSh1cGRhdGVzKSkge1xuICAgICAgYXdhaXQgdGhpcy5fc2F2ZUlkZW50aXR5S2V5KHVwZGF0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldEFwcHJvdmFsKHV1aWQ6IFVVSUQsIG5vbmJsb2NraW5nQXBwcm92YWw6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodXVpZCA9PT0gbnVsbCB8fCB1dWlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0QXBwcm92YWw6IHV1aWQgd2FzIHVuZGVmaW5lZC9udWxsJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2Ygbm9uYmxvY2tpbmdBcHByb3ZhbCAhPT0gJ2Jvb2xlYW4nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NldEFwcHJvdmFsOiBJbnZhbGlkIGFwcHJvdmFsIHN0YXR1cycpO1xuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5UmVjb3JkID0gYXdhaXQgdGhpcy5nZXRPck1pZ3JhdGVJZGVudGl0eVJlY29yZCh1dWlkKTtcblxuICAgIGlmICghaWRlbnRpdHlSZWNvcmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgc2V0QXBwcm92YWw6IE5vIGlkZW50aXR5IHJlY29yZCBmb3IgJHt1dWlkfWApO1xuICAgIH1cblxuICAgIGlkZW50aXR5UmVjb3JkLm5vbmJsb2NraW5nQXBwcm92YWwgPSBub25ibG9ja2luZ0FwcHJvdmFsO1xuICAgIGF3YWl0IHRoaXMuX3NhdmVJZGVudGl0eUtleShpZGVudGl0eVJlY29yZCk7XG4gIH1cblxuICBhc3luYyBzZXRWZXJpZmllZChcbiAgICB1dWlkOiBVVUlELFxuICAgIHZlcmlmaWVkU3RhdHVzOiBudW1iZXIsXG4gICAgcHVibGljS2V5PzogVWludDhBcnJheVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAodXVpZCA9PT0gbnVsbCB8fCB1dWlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VmVyaWZpZWQ6IHV1aWQgd2FzIHVuZGVmaW5lZC9udWxsJyk7XG4gICAgfVxuICAgIGlmICghdmFsaWRhdGVWZXJpZmllZFN0YXR1cyh2ZXJpZmllZFN0YXR1cykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0VmVyaWZpZWQ6IEludmFsaWQgdmVyaWZpZWQgc3RhdHVzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWRlbnRpdHlSZWNvcmQgPSBhd2FpdCB0aGlzLmdldE9yTWlncmF0ZUlkZW50aXR5UmVjb3JkKHV1aWQpO1xuXG4gICAgaWYgKCFpZGVudGl0eVJlY29yZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzZXRWZXJpZmllZDogTm8gaWRlbnRpdHkgcmVjb3JkIGZvciAke3V1aWQudG9TdHJpbmcoKX1gKTtcbiAgICB9XG5cbiAgICBpZiAoIXB1YmxpY0tleSB8fCBjb25zdGFudFRpbWVFcXVhbChpZGVudGl0eVJlY29yZC5wdWJsaWNLZXksIHB1YmxpY0tleSkpIHtcbiAgICAgIGlkZW50aXR5UmVjb3JkLnZlcmlmaWVkID0gdmVyaWZpZWRTdGF0dXM7XG5cbiAgICAgIGlmICh2YWxpZGF0ZUlkZW50aXR5S2V5KGlkZW50aXR5UmVjb3JkKSkge1xuICAgICAgICBhd2FpdCB0aGlzLl9zYXZlSWRlbnRpdHlLZXkoaWRlbnRpdHlSZWNvcmQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbygnc2V0VmVyaWZpZWQ6IE5vIGlkZW50aXR5IHJlY29yZCBmb3Igc3BlY2lmaWVkIHB1YmxpY0tleScpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFZlcmlmaWVkKHV1aWQ6IFVVSUQpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIGlmICh1dWlkID09PSBudWxsIHx8IHV1aWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRWZXJpZmllZDogdXVpZCB3YXMgdW5kZWZpbmVkL251bGwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBpZGVudGl0eVJlY29yZCA9IGF3YWl0IHRoaXMuZ2V0T3JNaWdyYXRlSWRlbnRpdHlSZWNvcmQodXVpZCk7XG4gICAgaWYgKCFpZGVudGl0eVJlY29yZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBnZXRWZXJpZmllZDogTm8gaWRlbnRpdHkgcmVjb3JkIGZvciAke3V1aWR9YCk7XG4gICAgfVxuXG4gICAgY29uc3QgdmVyaWZpZWRTdGF0dXMgPSBpZGVudGl0eVJlY29yZC52ZXJpZmllZDtcbiAgICBpZiAodmFsaWRhdGVWZXJpZmllZFN0YXR1cyh2ZXJpZmllZFN0YXR1cykpIHtcbiAgICAgIHJldHVybiB2ZXJpZmllZFN0YXR1cztcbiAgICB9XG5cbiAgICByZXR1cm4gVmVyaWZpZWRTdGF0dXMuREVGQVVMVDtcbiAgfVxuXG4gIC8vIFNlZSBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1pT1MtUHJpdmF0ZS9ibG9iL2UzMmMyZGZmMGQwM2Y2NzQ2N2I0ZGY2MjFkODRiMTE0MTJkNTBjZGIvU2lnbmFsU2VydmljZUtpdC9zcmMvTWVzc2FnZXMvT1dTSWRlbnRpdHlNYW5hZ2VyLm0jTDMxN1xuICAvLyBmb3IgcmVmZXJlbmNlLlxuICBhc3luYyBwcm9jZXNzVmVyaWZpZWRNZXNzYWdlKFxuICAgIHV1aWQ6IFVVSUQsXG4gICAgdmVyaWZpZWRTdGF0dXM6IG51bWJlcixcbiAgICBwdWJsaWNLZXk/OiBVaW50OEFycmF5XG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGlmICh1dWlkID09PSBudWxsIHx8IHV1aWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdwcm9jZXNzVmVyaWZpZWRNZXNzYWdlOiB1dWlkIHdhcyB1bmRlZmluZWQvbnVsbCcpO1xuICAgIH1cbiAgICBpZiAoIXZhbGlkYXRlVmVyaWZpZWRTdGF0dXModmVyaWZpZWRTdGF0dXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3NWZXJpZmllZE1lc3NhZ2U6IEludmFsaWQgdmVyaWZpZWQgc3RhdHVzJyk7XG4gICAgfVxuICAgIGlmIChwdWJsaWNLZXkgIT09IHVuZGVmaW5lZCAmJiAhKHB1YmxpY0tleSBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3Byb2Nlc3NWZXJpZmllZE1lc3NhZ2U6IEludmFsaWQgcHVibGljIGtleScpO1xuICAgIH1cblxuICAgIGNvbnN0IGlkZW50aXR5UmVjb3JkID0gYXdhaXQgdGhpcy5nZXRPck1pZ3JhdGVJZGVudGl0eVJlY29yZCh1dWlkKTtcblxuICAgIGxldCBpc0VxdWFsID0gZmFsc2U7XG5cbiAgICBpZiAoaWRlbnRpdHlSZWNvcmQgJiYgcHVibGljS2V5KSB7XG4gICAgICBpc0VxdWFsID0gY29uc3RhbnRUaW1lRXF1YWwocHVibGljS2V5LCBpZGVudGl0eVJlY29yZC5wdWJsaWNLZXkpO1xuICAgIH1cblxuICAgIC8vIEp1c3QgdXBkYXRlIHZlcmlmaWVkIHN0YXR1cyBpZiB0aGUga2V5IGlzIHRoZSBzYW1lIG9yIG5vdCBwcmVzZW50XG4gICAgaWYgKGlzRXF1YWwgfHwgIXB1YmxpY0tleSkge1xuICAgICAgYXdhaXQgdGhpcy5zZXRWZXJpZmllZCh1dWlkLCB2ZXJpZmllZFN0YXR1cywgcHVibGljS2V5KTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLnNhdmVJZGVudGl0eVdpdGhBdHRyaWJ1dGVzKHV1aWQsIHtcbiAgICAgIHB1YmxpY0tleSxcbiAgICAgIHZlcmlmaWVkOiB2ZXJpZmllZFN0YXR1cyxcbiAgICAgIGZpcnN0VXNlOiBmYWxzZSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIG5vbmJsb2NraW5nQXBwcm92YWw6IHZlcmlmaWVkU3RhdHVzID09PSBWZXJpZmllZFN0YXR1cy5WRVJJRklFRCxcbiAgICB9KTtcblxuICAgIGlmIChpZGVudGl0eVJlY29yZCkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdrZXljaGFuZ2UnLCB1dWlkKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAncHJvY2Vzc1ZlcmlmaWVkTWVzc2FnZSBlcnJvciB0cmlnZ2VyaW5nIGtleWNoYW5nZTonLFxuICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgLy8gdHJ1ZSBzaWduaWZpZXMgdGhhdCB3ZSBvdmVyd3JvdGUgYSBwcmV2aW91cyBrZXkgd2l0aCBhIG5ldyBvbmVcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlzVW50cnVzdGVkKHV1aWQ6IFVVSUQpOiBib29sZWFuIHtcbiAgICBpZiAodXVpZCA9PT0gbnVsbCB8fCB1dWlkID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaXNVbnRydXN0ZWQ6IHV1aWQgd2FzIHVuZGVmaW5lZC9udWxsJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWRlbnRpdHlSZWNvcmQgPSB0aGlzLmdldElkZW50aXR5UmVjb3JkKHV1aWQpO1xuICAgIGlmICghaWRlbnRpdHlSZWNvcmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgaXNVbnRydXN0ZWQ6IE5vIGlkZW50aXR5IHJlY29yZCBmb3IgJHt1dWlkLnRvU3RyaW5nKCl9YCk7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgaXNNb3JlUmVjZW50VGhhbihpZGVudGl0eVJlY29yZC50aW1lc3RhbXAsIFRJTUVTVEFNUF9USFJFU0hPTEQpICYmXG4gICAgICAhaWRlbnRpdHlSZWNvcmQubm9uYmxvY2tpbmdBcHByb3ZhbCAmJlxuICAgICAgIWlkZW50aXR5UmVjb3JkLmZpcnN0VXNlXG4gICAgKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBhc3luYyByZW1vdmVJZGVudGl0eUtleSh1dWlkOiBVVUlEKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlkZW50aXR5S2V5cykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdyZW1vdmVJZGVudGl0eUtleTogdGhpcy5pZGVudGl0eUtleXMgbm90IHlldCBjYWNoZWQhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWQgPSB1dWlkLnRvU3RyaW5nKCk7XG4gICAgdGhpcy5pZGVudGl0eUtleXMuZGVsZXRlKGlkKTtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlSWRlbnRpdHlLZXlCeUlkKGlkKTtcbiAgICBhd2FpdCB0aGlzLnJlbW92ZUFsbFNlc3Npb25zKGlkKTtcbiAgfVxuXG4gIC8vIE5vdCB5ZXQgcHJvY2Vzc2VkIG1lc3NhZ2VzIC0gZm9yIHJlc2lsaWVuY3lcbiAgZ2V0VW5wcm9jZXNzZWRDb3VudCgpOiBQcm9taXNlPG51bWJlcj4ge1xuICAgIHJldHVybiB0aGlzLndpdGhab25lKEdMT0JBTF9aT05FLCAnZ2V0VW5wcm9jZXNzZWRDb3VudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0VW5wcm9jZXNzZWRDb3VudCgpO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cygpOiBQcm9taXNlPEFycmF5PFVucHJvY2Vzc2VkVHlwZT4+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZShHTE9CQUxfWk9ORSwgJ2dldEFsbFVucHJvY2Vzc2VkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgcmV0dXJuIHdpbmRvdy5TaWduYWwuRGF0YS5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVbnByb2Nlc3NlZEJ5SWQoaWQ6IHN0cmluZyk6IFByb21pc2U8VW5wcm9jZXNzZWRUeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdnZXRVbnByb2Nlc3NlZEJ5SWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICByZXR1cm4gd2luZG93LlNpZ25hbC5EYXRhLmdldFVucHJvY2Vzc2VkQnlJZChpZCk7XG4gICAgfSk7XG4gIH1cblxuICBhZGRVbnByb2Nlc3NlZChcbiAgICBkYXRhOiBVbnByb2Nlc3NlZFR5cGUsXG4gICAgeyB6b25lID0gR0xPQkFMX1pPTkUgfTogU2Vzc2lvblRyYW5zYWN0aW9uT3B0aW9ucyA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLndpdGhab25lKHpvbmUsICdhZGRVbnByb2Nlc3NlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIHRoaXMucGVuZGluZ1VucHJvY2Vzc2VkLnNldChkYXRhLmlkLCBkYXRhKTtcblxuICAgICAgLy8gQ3VycmVudCB6b25lIGRvZXNuJ3Qgc3VwcG9ydCBwZW5kaW5nIHVucHJvY2Vzc2VkIC0gY29tbWl0IGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXpvbmUuc3VwcG9ydHNQZW5kaW5nVW5wcm9jZXNzZWQoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmNvbW1pdFpvbmVDaGFuZ2VzKCdhZGRVbnByb2Nlc3NlZCcpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYWRkTXVsdGlwbGVVbnByb2Nlc3NlZChcbiAgICBhcnJheTogQXJyYXk8VW5wcm9jZXNzZWRUeXBlPixcbiAgICB7IHpvbmUgPSBHTE9CQUxfWk9ORSB9OiBTZXNzaW9uVHJhbnNhY3Rpb25PcHRpb25zID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoem9uZSwgJ2FkZE11bHRpcGxlVW5wcm9jZXNzZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBmb3IgKGNvbnN0IGVsZW0gb2YgYXJyYXkpIHtcbiAgICAgICAgdGhpcy5wZW5kaW5nVW5wcm9jZXNzZWQuc2V0KGVsZW0uaWQsIGVsZW0pO1xuICAgICAgfVxuICAgICAgLy8gQ3VycmVudCB6b25lIGRvZXNuJ3Qgc3VwcG9ydCBwZW5kaW5nIHVucHJvY2Vzc2VkIC0gY29tbWl0IGltbWVkaWF0ZWx5XG4gICAgICBpZiAoIXpvbmUuc3VwcG9ydHNQZW5kaW5nVW5wcm9jZXNzZWQoKSkge1xuICAgICAgICBhd2FpdCB0aGlzLmNvbW1pdFpvbmVDaGFuZ2VzKCdhZGRNdWx0aXBsZVVucHJvY2Vzc2VkJyk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICB1cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgZGF0YTogVW5wcm9jZXNzZWRVcGRhdGVUeXBlXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLndpdGhab25lKEdMT0JBTF9aT05FLCAndXBkYXRlVW5wcm9jZXNzZWRXaXRoRGF0YScsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhKGlkLCBkYXRhKTtcbiAgICB9KTtcbiAgfVxuXG4gIHVwZGF0ZVVucHJvY2Vzc2Vkc1dpdGhEYXRhKFxuICAgIGl0ZW1zOiBBcnJheTx7IGlkOiBzdHJpbmc7IGRhdGE6IFVucHJvY2Vzc2VkVXBkYXRlVHlwZSB9PlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy53aXRoWm9uZShcbiAgICAgIEdMT0JBTF9aT05FLFxuICAgICAgJ3VwZGF0ZVVucHJvY2Vzc2Vkc1dpdGhEYXRhJyxcbiAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZVVucHJvY2Vzc2Vkc1dpdGhEYXRhKGl0ZW1zKTtcbiAgICAgIH1cbiAgICApO1xuICB9XG5cbiAgcmVtb3ZlVW5wcm9jZXNzZWQoaWRPckFycmF5OiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdyZW1vdmVVbnByb2Nlc3NlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVVbnByb2Nlc3NlZChpZE9yQXJyYXkpO1xuICAgIH0pO1xuICB9XG5cbiAgcmVtb3ZlQWxsVW5wcm9jZXNzZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMud2l0aFpvbmUoR0xPQkFMX1pPTkUsICdyZW1vdmVBbGxVbnByb2Nlc3NlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVBbGxVbnByb2Nlc3NlZCgpO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlQWxsRGF0YSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlQWxsKCk7XG4gICAgYXdhaXQgdGhpcy5oeWRyYXRlQ2FjaGVzKCk7XG5cbiAgICB3aW5kb3cuc3RvcmFnZS5yZXNldCgpO1xuICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLmZldGNoKCk7XG5cbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5yZXNldCgpO1xuICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmxvYWQoKTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZUFsbENvbmZpZ3VyYXRpb24obW9kZTogUmVtb3ZlQWxsQ29uZmlndXJhdGlvbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVBbGxDb25maWd1cmF0aW9uKG1vZGUpO1xuICAgIGF3YWl0IHRoaXMuaHlkcmF0ZUNhY2hlcygpO1xuXG4gICAgd2luZG93LnN0b3JhZ2UucmVzZXQoKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5mZXRjaCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBfZ2V0QWxsU2Vzc2lvbnMoKTogQXJyYXk8U2Vzc2lvbkNhY2hlRW50cnk+IHtcbiAgICBjb25zdCB1bmlvbiA9IG5ldyBNYXA8c3RyaW5nLCBTZXNzaW9uQ2FjaGVFbnRyeT4oKTtcblxuICAgIHRoaXMuc2Vzc2lvbnM/LmZvckVhY2goKHZhbHVlLCBrZXkpID0+IHtcbiAgICAgIHVuaW9uLnNldChrZXksIHZhbHVlKTtcbiAgICB9KTtcbiAgICB0aGlzLnBlbmRpbmdTZXNzaW9ucy5mb3JFYWNoKCh2YWx1ZSwga2V5KSA9PiB7XG4gICAgICB1bmlvbi5zZXQoa2V5LCB2YWx1ZSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gQXJyYXkuZnJvbSh1bmlvbi52YWx1ZXMoKSk7XG4gIH1cbn1cblxud2luZG93LlNpZ25hbFByb3RvY29sU3RvcmUgPSBTaWduYWxQcm90b2NvbFN0b3JlO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHFCQUFtQjtBQUNuQixvQkFBeUI7QUFDekIsaUJBQWtCO0FBRWxCLDhCQVFPO0FBRVAsWUFBdUI7QUFDdkIsb0JBQWtDO0FBQ2xDLG9CQUFxQztBQUNyQyxzQkFBeUI7QUFDekIsa0JBQXFCO0FBQ3JCLHVCQUFpQztBQUNqQyxnQ0FHTztBQXFCUCxrQkFBK0I7QUFHL0IsOEJBQWlDO0FBQ2pDLFVBQXFCO0FBQ3JCLGlDQUFvQztBQUNwQyxhQUF3QjtBQUN4Qix5QkFBMEI7QUFFMUIsTUFBTSxzQkFBc0Is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
