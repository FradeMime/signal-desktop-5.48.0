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
var MessageReceiver_exports = {};
__export(MessageReceiver_exports, {
  default: () => MessageReceiver
});
module.exports = __toCommonJS(MessageReceiver_exports);
var import_lodash = require("lodash");
var import_p_queue = __toESM(require("p-queue"));
var import_uuid = require("uuid");
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_LibSignalStores = require("../LibSignalStores");
var import_Curve = require("../Curve");
var import_assert = require("../util/assert");
var import_batcher = require("../util/batcher");
var import_dropNull = require("../util/dropNull");
var import_normalizeUuid = require("../util/normalizeUuid");
var import_parseIntOrThrow = require("../util/parseIntOrThrow");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_Zone = require("../util/Zone");
var import_Crypto = require("../Crypto");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_UUID = require("../types/UUID");
var Errors = __toESM(require("../types/errors"));
var import_RemoteConfig = require("../RemoteConfig");
var import_protobuf = require("../protobuf");
var import_groups = require("../groups");
var import_TaskWithTimeout = __toESM(require("./TaskWithTimeout"));
var import_processDataMessage = require("./processDataMessage");
var import_processSyncMessage = require("./processSyncMessage");
var import_EventTarget = __toESM(require("./EventTarget"));
var import_downloadAttachment = require("./downloadAttachment");
var import_ContactsParser = require("./ContactsParser");
var import_Errors = require("./Errors");
var Bytes = __toESM(require("../Bytes"));
var import_messageReceiverEvents = require("./messageReceiverEvents");
var log = __toESM(require("../logging/log"));
var durations = __toESM(require("../util/durations"));
var import_areArraysMatchingSets = require("../util/areArraysMatchingSets");
var import_generateBlurHash = require("../util/generateBlurHash");
var import_MIME = require("../types/MIME");
const GROUPV1_ID_LENGTH = 16;
const GROUPV2_ID_LENGTH = 32;
const RETRY_TIMEOUT = 2 * 60 * 1e3;
var TaskType = /* @__PURE__ */ ((TaskType2) => {
  TaskType2["Encrypted"] = "Encrypted";
  TaskType2["Decrypted"] = "Decrypted";
  return TaskType2;
})(TaskType || {});
class MessageReceiver extends import_EventTarget.default {
  constructor({ server, storage, serverTrustRoot }) {
    super();
    this.server = server;
    this.storage = storage;
    this.count = 0;
    this.processedCount = 0;
    if (!serverTrustRoot) {
      throw new Error("Server trust root is required!");
    }
    this.serverTrustRoot = Bytes.fromBase64(serverTrustRoot);
    this.incomingQueue = new import_p_queue.default({
      concurrency: 1,
      throwOnTimeout: true
    });
    this.appQueue = new import_p_queue.default({
      concurrency: 1,
      throwOnTimeout: true
    });
    this.encryptedQueue = new import_p_queue.default({
      concurrency: 1,
      throwOnTimeout: true
    });
    this.decryptedQueue = new import_p_queue.default({
      concurrency: 1,
      throwOnTimeout: true
    });
    this.decryptAndCacheBatcher = (0, import_batcher.createBatcher)({
      name: "MessageReceiver.decryptAndCacheBatcher",
      wait: 75,
      maxSize: 30,
      processBatch: (items) => {
        this.decryptAndCacheBatch(items);
      }
    });
    this.cacheRemoveBatcher = (0, import_batcher.createBatcher)({
      name: "MessageReceiver.cacheRemoveBatcher",
      wait: 75,
      maxSize: 30,
      processBatch: this.cacheRemoveBatch.bind(this)
    });
  }
  getAndResetProcessedCount() {
    const count = this.processedCount;
    this.processedCount = 0;
    return count;
  }
  handleRequest(request) {
    log.info("MessageReceiver: got request", request.verb, request.path);
    if (request.path !== "/api/v1/message") {
      request.respond(200, "OK");
      if (request.verb === "PUT" && request.path === "/api/v1/queue/empty") {
        this.incomingQueue.add((0, import_TaskWithTimeout.default)(async () => {
          this.onEmpty();
        }, "incomingQueue/onEmpty"));
      }
      return;
    }
    const job = /* @__PURE__ */ __name(async () => {
      const headers = request.headers || [];
      if (!request.body) {
        throw new Error("MessageReceiver.handleRequest: request.body was falsey!");
      }
      const plaintext = request.body;
      try {
        const decoded = import_protobuf.SignalService.Envelope.decode(plaintext);
        const serverTimestamp = decoded.serverTimestamp?.toNumber();
        const ourUuid = this.storage.user.getCheckedUuid();
        const envelope = {
          id: (0, import_uuid.v4)().replace(/-/g, ""),
          receivedAtCounter: window.Signal.Util.incrementMessageCounter(),
          receivedAtDate: Date.now(),
          messageAgeSec: this.calculateMessageAge(headers, serverTimestamp),
          type: decoded.type,
          source: decoded.source,
          sourceUuid: decoded.sourceUuid ? (0, import_normalizeUuid.normalizeUuid)(decoded.sourceUuid, "MessageReceiver.handleRequest.sourceUuid") : void 0,
          sourceDevice: decoded.sourceDevice,
          destinationUuid: decoded.destinationUuid ? new import_UUID.UUID((0, import_normalizeUuid.normalizeUuid)(decoded.destinationUuid, "MessageReceiver.handleRequest.destinationUuid")) : ourUuid,
          timestamp: decoded.timestamp?.toNumber(),
          content: (0, import_dropNull.dropNull)(decoded.content),
          serverGuid: decoded.serverGuid,
          serverTimestamp
        };
        this.decryptAndCache(envelope, plaintext, request);
        this.processedCount += 1;
      } catch (e) {
        request.respond(500, "Bad encrypted websocket message");
        log.error("Error handling incoming message:", Errors.toLogFormat(e));
        await this.dispatchAndWait(new import_messageReceiverEvents.ErrorEvent(e));
      }
    }, "job");
    this.incomingQueue.add((0, import_TaskWithTimeout.default)(job, "incomingQueue/websocket"));
  }
  reset() {
    this.incomingQueue.add((0, import_TaskWithTimeout.default)(async () => this.queueAllCached(), "incomingQueue/queueAllCached"));
    this.count = 0;
    this.isEmptied = false;
    this.stoppingProcessing = false;
  }
  stopProcessing() {
    log.info("MessageReceiver.stopProcessing");
    this.stoppingProcessing = true;
  }
  hasEmptied() {
    return Boolean(this.isEmptied);
  }
  async drain() {
    const waitForEncryptedQueue = /* @__PURE__ */ __name(async () => this.addToQueue(async () => {
      log.info("drained");
    }, "drain/waitForDecrypted", "Decrypted" /* Decrypted */), "waitForEncryptedQueue");
    const waitForIncomingQueue = /* @__PURE__ */ __name(async () => this.addToQueue(waitForEncryptedQueue, "drain/waitForEncrypted", "Encrypted" /* Encrypted */), "waitForIncomingQueue");
    return this.incomingQueue.add((0, import_TaskWithTimeout.default)(waitForIncomingQueue, "drain/waitForIncoming"));
  }
  addEventListener(name, handler) {
    return super.addEventListener(name, handler);
  }
  removeEventListener(name, handler) {
    return super.removeEventListener(name, handler);
  }
  async dispatchAndWait(event) {
    this.appQueue.add((0, import_TaskWithTimeout.default)(async () => Promise.all(this.dispatchEvent(event)), "dispatchEvent"));
  }
  calculateMessageAge(headers, serverTimestamp) {
    let messageAgeSec = 0;
    if (serverTimestamp) {
      let it = headers.length;
      while (--it >= 0) {
        const match = headers[it].match(/^X-Signal-Timestamp:\s*(\d+)\s*$/);
        if (match && match.length === 2) {
          const timestamp = Number(match[1]);
          if (timestamp > serverTimestamp) {
            messageAgeSec = Math.floor((timestamp - serverTimestamp) / 1e3);
          }
          break;
        }
      }
    }
    return messageAgeSec;
  }
  async addToQueue(task, id, taskType) {
    if (taskType === "Encrypted" /* Encrypted */) {
      this.count += 1;
    }
    const queue = taskType === "Encrypted" /* Encrypted */ ? this.encryptedQueue : this.decryptedQueue;
    try {
      return await queue.add((0, import_TaskWithTimeout.default)(task, id));
    } finally {
      this.updateProgress(this.count);
    }
  }
  onEmpty() {
    const emitEmpty = /* @__PURE__ */ __name(async () => {
      await Promise.all([
        this.decryptAndCacheBatcher.flushAndWait(),
        this.cacheRemoveBatcher.flushAndWait()
      ]);
      log.info("MessageReceiver: emitting 'empty' event");
      this.dispatchEvent(new import_messageReceiverEvents.EmptyEvent());
      this.isEmptied = true;
      this.maybeScheduleRetryTimeout();
      const { pendingPNIIdentityEvent } = this;
      this.pendingPNIIdentityEvent = void 0;
      if (pendingPNIIdentityEvent) {
        await this.dispatchAndWait(pendingPNIIdentityEvent);
      }
    }, "emitEmpty");
    const waitForDecryptedQueue = /* @__PURE__ */ __name(async () => {
      log.info("MessageReceiver: finished processing messages after 'empty', now waiting for application");
      this.appQueue.add((0, import_TaskWithTimeout.default)(emitEmpty, "emitEmpty"));
    }, "waitForDecryptedQueue");
    const waitForEncryptedQueue = /* @__PURE__ */ __name(async () => {
      this.addToQueue(waitForDecryptedQueue, "onEmpty/waitForDecrypted", "Decrypted" /* Decrypted */);
    }, "waitForEncryptedQueue");
    const waitForIncomingQueue = /* @__PURE__ */ __name(async () => {
      this.count = 0;
      this.addToQueue(waitForEncryptedQueue, "onEmpty/waitForEncrypted", "Encrypted" /* Encrypted */);
    }, "waitForIncomingQueue");
    const waitForCacheAddBatcher = /* @__PURE__ */ __name(async () => {
      await this.decryptAndCacheBatcher.onIdle();
      this.incomingQueue.add((0, import_TaskWithTimeout.default)(waitForIncomingQueue, "onEmpty/waitForIncoming"));
    }, "waitForCacheAddBatcher");
    waitForCacheAddBatcher();
  }
  updateProgress(count) {
    if (count % 10 !== 0) {
      return;
    }
    this.dispatchEvent(new import_messageReceiverEvents.ProgressEvent({ count }));
  }
  async queueAllCached() {
    const items = await this.getAllFromCache();
    const max = items.length;
    for (let i = 0; i < max; i += 1) {
      await this.queueCached(items[i]);
    }
  }
  async queueCached(item) {
    log.info("MessageReceiver.queueCached", item.id);
    try {
      let envelopePlaintext;
      if (item.envelope && item.version === 2) {
        envelopePlaintext = Bytes.fromBase64(item.envelope);
      } else if (item.envelope && typeof item.envelope === "string") {
        envelopePlaintext = Bytes.fromBinary(item.envelope);
      } else {
        throw new Error("MessageReceiver.queueCached: item.envelope was malformed");
      }
      const decoded = import_protobuf.SignalService.Envelope.decode(envelopePlaintext);
      const ourUuid = this.storage.user.getCheckedUuid();
      const envelope = {
        id: item.id,
        receivedAtCounter: item.receivedAtCounter ?? item.timestamp,
        receivedAtDate: item.receivedAtCounter === null ? Date.now() : item.timestamp,
        messageAgeSec: item.messageAgeSec || 0,
        type: decoded.type,
        source: decoded.source || item.source,
        sourceUuid: decoded.sourceUuid || item.sourceUuid,
        sourceDevice: decoded.sourceDevice || item.sourceDevice,
        destinationUuid: new import_UUID.UUID(decoded.destinationUuid || item.destinationUuid || ourUuid.toString()),
        timestamp: decoded.timestamp?.toNumber(),
        content: (0, import_dropNull.dropNull)(decoded.content),
        serverGuid: decoded.serverGuid,
        serverTimestamp: item.serverTimestamp || decoded.serverTimestamp?.toNumber()
      };
      const { decrypted } = item;
      if (decrypted) {
        let payloadPlaintext;
        if (item.version === 2) {
          payloadPlaintext = Bytes.fromBase64(decrypted);
        } else if (typeof decrypted === "string") {
          payloadPlaintext = Bytes.fromBinary(decrypted);
        } else {
          throw new Error("Cached decrypted value was not a string!");
        }
        this.addToQueue(async () => {
          this.queueDecryptedEnvelope(envelope, payloadPlaintext);
        }, "queueDecryptedEnvelope", "Encrypted" /* Encrypted */);
      } else {
        this.queueCachedEnvelope(item, envelope);
      }
    } catch (error) {
      log.error("queueCached error handling item", item.id, "removing it. Error:", Errors.toLogFormat(error));
      try {
        const { id } = item;
        await this.storage.protocol.removeUnprocessed(id);
      } catch (deleteError) {
        log.error("queueCached error deleting item", item.id, "Error:", Errors.toLogFormat(deleteError));
      }
    }
  }
  getEnvelopeId(envelope) {
    const { timestamp } = envelope;
    let prefix = "";
    if (envelope.sourceUuid || envelope.source) {
      const sender = envelope.sourceUuid || envelope.source;
      prefix += `${sender}.${envelope.sourceDevice} `;
    }
    prefix += `> ${envelope.destinationUuid.toString()}`;
    return `${prefix} ${timestamp} (${envelope.id})`;
  }
  clearRetryTimeout() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.retryCachedTimeout);
    this.retryCachedTimeout = void 0;
  }
  maybeScheduleRetryTimeout() {
    if (this.isEmptied) {
      this.clearRetryTimeout();
      this.retryCachedTimeout = setTimeout(() => {
        this.incomingQueue.add((0, import_TaskWithTimeout.default)(async () => this.queueAllCached(), "queueAllCached"));
      }, RETRY_TIMEOUT);
    }
  }
  async getAllFromCache() {
    log.info("getAllFromCache");
    const count = await this.storage.protocol.getUnprocessedCount();
    if (count > 1500) {
      await this.storage.protocol.removeAllUnprocessed();
      log.warn(`There were ${count} messages in cache. Deleted all instead of reprocessing`);
      return [];
    }
    const items = await this.storage.protocol.getAllUnprocessedAndIncrementAttempts();
    log.info("getAllFromCache loaded", items.length, "saved envelopes");
    return items;
  }
  async decryptAndCacheBatch(items) {
    log.info("MessageReceiver.decryptAndCacheBatch", items.length);
    const decrypted = [];
    const storageProtocol = this.storage.protocol;
    try {
      const zone = new import_Zone.Zone("decryptAndCacheBatch", {
        pendingSenderKeys: true,
        pendingSessions: true,
        pendingUnprocessed: true
      });
      const storesMap = /* @__PURE__ */ new Map();
      const failed = [];
      await storageProtocol.withZone(zone, "MessageReceiver", async () => {
        await Promise.all(items.map(async ({ data, envelope }) => {
          try {
            const { destinationUuid } = envelope;
            const uuidKind = this.storage.user.getOurUuidKind(destinationUuid);
            if (uuidKind === import_UUID.UUIDKind.Unknown) {
              log.warn(`MessageReceiver.decryptAndCacheBatch: Rejecting envelope ${this.getEnvelopeId(envelope)}, unknown uuid: ${destinationUuid}`);
              return;
            }
            let stores = storesMap.get(destinationUuid.toString());
            if (!stores) {
              stores = {
                senderKeyStore: new import_LibSignalStores.SenderKeys({
                  ourUuid: destinationUuid,
                  zone
                }),
                sessionStore: new import_LibSignalStores.Sessions({
                  zone,
                  ourUuid: destinationUuid
                }),
                identityKeyStore: new import_LibSignalStores.IdentityKeys({
                  zone,
                  ourUuid: destinationUuid
                }),
                zone
              };
              storesMap.set(destinationUuid.toString(), stores);
            }
            const result = await this.queueEncryptedEnvelope(stores, envelope, uuidKind);
            if (result.plaintext) {
              decrypted.push({
                plaintext: result.plaintext,
                envelope: result.envelope,
                data
              });
            }
          } catch (error) {
            failed.push(data);
            log.error("MessageReceiver.decryptAndCacheBatch error when processing the envelope", Errors.toLogFormat(error));
          }
        }));
        log.info(`MessageReceiver.decryptAndCacheBatch storing ${decrypted.length} decrypted envelopes, keeping ${failed.length} failed envelopes.`);
        const unprocesseds = decrypted.map(({ envelope, data, plaintext }) => {
          return {
            ...data,
            source: envelope.source,
            sourceUuid: envelope.sourceUuid,
            sourceDevice: envelope.sourceDevice,
            destinationUuid: envelope.destinationUuid.toString(),
            serverGuid: envelope.serverGuid,
            serverTimestamp: envelope.serverTimestamp,
            decrypted: Bytes.toBase64(plaintext)
          };
        });
        await storageProtocol.addMultipleUnprocessed(unprocesseds.concat(failed), { zone });
      });
      log.info("MessageReceiver.decryptAndCacheBatch acknowledging receipt");
      for (const { request } of items) {
        try {
          request.respond(200, "OK");
        } catch (error) {
          log.error("decryptAndCacheBatch: Failed to send 200 to server; still queuing envelope");
        }
      }
    } catch (error) {
      log.error("decryptAndCache error trying to add messages to cache:", Errors.toLogFormat(error));
      items.forEach((item) => {
        item.request.respond(500, "Failed to cache message");
      });
      return;
    }
    await Promise.all(decrypted.map(async ({ envelope, plaintext }) => {
      try {
        await this.queueDecryptedEnvelope(envelope, plaintext);
      } catch (error) {
        log.error("decryptAndCache error when processing decrypted envelope", Errors.toLogFormat(error));
      }
    }));
    log.info("MessageReceiver.decryptAndCacheBatch fully processed");
    this.maybeScheduleRetryTimeout();
  }
  decryptAndCache(envelope, plaintext, request) {
    const { id } = envelope;
    const data = {
      id,
      version: 2,
      envelope: Bytes.toBase64(plaintext),
      receivedAtCounter: envelope.receivedAtCounter,
      timestamp: envelope.timestamp,
      attempts: 1,
      messageAgeSec: envelope.messageAgeSec
    };
    this.decryptAndCacheBatcher.add({
      request,
      envelope,
      data
    });
  }
  async cacheRemoveBatch(items) {
    await this.storage.protocol.removeUnprocessed(items);
  }
  removeFromCache(envelope) {
    const { id } = envelope;
    this.cacheRemoveBatcher.add(id);
  }
  async queueDecryptedEnvelope(envelope, plaintext) {
    const id = this.getEnvelopeId(envelope);
    log.info("queueing decrypted envelope", id);
    const task = this.handleDecryptedEnvelope.bind(this, envelope, plaintext);
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, `queueDecryptedEnvelope ${id}`);
    try {
      await this.addToQueue(taskWithTimeout, "dispatchEvent", "Decrypted" /* Decrypted */);
    } catch (error) {
      log.error(`queueDecryptedEnvelope error handling envelope ${id}:`, Errors.toLogFormat(error));
    }
  }
  async queueEncryptedEnvelope(stores, envelope, uuidKind) {
    let logId = this.getEnvelopeId(envelope);
    log.info(`queueing ${uuidKind} envelope`, logId);
    const task = /* @__PURE__ */ __name(async () => {
      const unsealedEnvelope = await this.unsealEnvelope(stores, envelope, uuidKind);
      if (!unsealedEnvelope) {
        return { plaintext: void 0, envelope };
      }
      logId = this.getEnvelopeId(unsealedEnvelope);
      this.addToQueue(async () => this.dispatchEvent(new import_messageReceiverEvents.EnvelopeEvent(unsealedEnvelope)), "dispatchEvent", "Decrypted" /* Decrypted */);
      return this.decryptEnvelope(stores, unsealedEnvelope, uuidKind);
    }, "task");
    try {
      return await this.addToQueue(task, `MessageReceiver: unseal and decrypt ${logId}`, "Encrypted" /* Encrypted */);
    } catch (error) {
      const args = [
        "queueEncryptedEnvelope error handling envelope",
        logId,
        ":",
        Errors.toLogFormat(error)
      ];
      if (error instanceof import_Errors.WarnOnlyError) {
        log.warn(...args);
      } else {
        log.error(...args);
      }
      throw error;
    }
  }
  async queueCachedEnvelope(data, envelope) {
    this.decryptAndCacheBatcher.add({
      request: {
        respond(code, status) {
          log.info(`queueCachedEnvelope: fake response with code ${code} and status ${status}`);
        }
      },
      envelope,
      data
    });
  }
  async handleDecryptedEnvelope(envelope, plaintext) {
    if (this.stoppingProcessing) {
      return;
    }
    if (envelope.content) {
      await this.innerHandleContentMessage(envelope, plaintext);
      return;
    }
    this.removeFromCache(envelope);
    throw new Error("Received message with no content");
  }
  async unsealEnvelope(stores, envelope, uuidKind) {
    const logId = this.getEnvelopeId(envelope);
    if (this.stoppingProcessing) {
      log.warn(`MessageReceiver.unsealEnvelope(${logId}): dropping`);
      throw new Error("Sealed envelope dropped due to stopping processing");
    }
    if (envelope.type !== import_protobuf.SignalService.Envelope.Type.UNIDENTIFIED_SENDER) {
      return {
        ...envelope,
        cipherTextBytes: envelope.content,
        cipherTextType: envelopeTypeToCiphertextType(envelope.type)
      };
    }
    if (uuidKind === import_UUID.UUIDKind.PNI) {
      log.warn(`MessageReceiver.unsealEnvelope(${logId}): dropping for PNI`);
      return void 0;
    }
    (0, import_assert.strictAssert)(uuidKind === import_UUID.UUIDKind.ACI, "Sealed non-ACI envelope");
    const ciphertext = envelope.content;
    if (!ciphertext) {
      this.removeFromCache(envelope);
      throw new Error("Received message with no content");
    }
    log.info(`MessageReceiver.unsealEnvelope(${logId}): unidentified message`);
    const messageContent = await (0, import_libsignal_client.sealedSenderDecryptToUsmc)(Buffer.from(ciphertext), stores.identityKeyStore);
    const certificate = messageContent.senderCertificate();
    const originalSource = envelope.source;
    const originalSourceUuid = envelope.sourceUuid;
    const newEnvelope = {
      ...envelope,
      cipherTextBytes: messageContent.contents(),
      cipherTextType: messageContent.msgType(),
      source: (0, import_dropNull.dropNull)(certificate.senderE164()),
      sourceUuid: (0, import_normalizeUuid.normalizeUuid)(certificate.senderUuid(), "MessageReceiver.unsealEnvelope.UNIDENTIFIED_SENDER.sourceUuid"),
      sourceDevice: certificate.senderDeviceId(),
      unidentifiedDeliveryReceived: !(originalSource || originalSourceUuid),
      contentHint: messageContent.contentHint(),
      groupId: messageContent.groupId()?.toString("base64"),
      certificate,
      unsealedContent: messageContent
    };
    this.validateUnsealedEnvelope(newEnvelope);
    return newEnvelope;
  }
  async decryptEnvelope(stores, envelope, uuidKind) {
    const logId = this.getEnvelopeId(envelope);
    if (this.stoppingProcessing) {
      log.warn(`MessageReceiver.decryptEnvelope(${logId}): dropping unsealed`);
      throw new Error("Unsealed envelope dropped due to stopping processing");
    }
    if (envelope.type === import_protobuf.SignalService.Envelope.Type.RECEIPT) {
      await this.onDeliveryReceipt(envelope);
      return { plaintext: void 0, envelope };
    }
    let ciphertext;
    if (envelope.content) {
      ciphertext = envelope.content;
    } else {
      this.removeFromCache(envelope);
      (0, import_assert.strictAssert)(false, "Contentless envelope should be handled by unsealEnvelope");
    }
    log.info(`MessageReceiver.decryptEnvelope(${logId})`);
    const plaintext = await this.decrypt(stores, envelope, ciphertext, uuidKind);
    if (!plaintext) {
      log.warn("MessageReceiver.decryptEnvelope: plaintext was falsey");
      return { plaintext, envelope };
    }
    let isGroupV2 = false;
    try {
      const content = import_protobuf.SignalService.Content.decode(plaintext);
      isGroupV2 = Boolean(content.dataMessage?.groupV2);
      if (content.senderKeyDistributionMessage && Bytes.isNotEmpty(content.senderKeyDistributionMessage)) {
        await this.handleSenderKeyDistributionMessage(stores, envelope, content.senderKeyDistributionMessage);
      }
    } catch (error) {
      log.error(`MessageReceiver.decryptEnvelope: Failed to process sender key distribution message: ${Errors.toLogFormat(error)}`);
    }
    if (!isGroupV2 && (envelope.source && this.isBlocked(envelope.source) || envelope.sourceUuid && this.isUuidBlocked(envelope.sourceUuid))) {
      log.info("MessageReceiver.decryptEnvelope: Dropping non-GV2 message from blocked sender");
      return { plaintext: void 0, envelope };
    }
    return { plaintext, envelope };
  }
  validateUnsealedEnvelope(envelope) {
    const { unsealedContent: messageContent, certificate } = envelope;
    (0, import_assert.strictAssert)(messageContent !== void 0, "Missing message content for sealed sender message");
    (0, import_assert.strictAssert)(certificate !== void 0, "Missing sender certificate for sealed sender message");
    if (!envelope.serverTimestamp) {
      throw new Error("MessageReceiver.decryptSealedSender: Sealed sender message was missing serverTimestamp");
    }
    const serverCertificate = certificate.serverCertificate();
    if (!(0, import_Curve.verifySignature)(this.serverTrustRoot, serverCertificate.certificateData(), serverCertificate.signature())) {
      throw new Error("MessageReceiver.validateUnsealedEnvelope: Server certificate trust root validation failed");
    }
    if (!(0, import_Curve.verifySignature)(serverCertificate.key().serialize(), certificate.certificate(), certificate.signature())) {
      throw new Error("MessageReceiver.validateUnsealedEnvelope: Server certificate server signature validation failed");
    }
    const logId = this.getEnvelopeId(envelope);
    if (envelope.serverTimestamp > certificate.expiration()) {
      throw new Error(`MessageReceiver.validateUnsealedEnvelope: Sender certificate is expired for envelope ${logId}`);
    }
    return void 0;
  }
  async onDeliveryReceipt(envelope) {
    await this.dispatchAndWait(new import_messageReceiverEvents.DeliveryEvent({
      timestamp: envelope.timestamp,
      envelopeTimestamp: envelope.serverTimestamp,
      source: envelope.source,
      sourceUuid: envelope.sourceUuid,
      sourceDevice: envelope.sourceDevice
    }, this.removeFromCache.bind(this, envelope)));
  }
  unpad(paddedPlaintext) {
    for (let i = paddedPlaintext.length - 1; i >= 0; i -= 1) {
      if (paddedPlaintext[i] === 128) {
        return new Uint8Array(paddedPlaintext.slice(0, i));
      }
      if (paddedPlaintext[i] !== 0) {
        throw new Error("Invalid padding");
      }
    }
    return paddedPlaintext;
  }
  async decryptSealedSender({ senderKeyStore, sessionStore, identityKeyStore, zone }, envelope, ciphertext) {
    const localE164 = this.storage.user.getNumber();
    const { destinationUuid } = envelope;
    const localDeviceId = (0, import_parseIntOrThrow.parseIntOrThrow)(this.storage.user.getDeviceId(), "MessageReceiver.decryptSealedSender: localDeviceId");
    const logId = this.getEnvelopeId(envelope);
    const { unsealedContent: messageContent, certificate } = envelope;
    (0, import_assert.strictAssert)(messageContent !== void 0, "Missing message content for sealed sender message");
    (0, import_assert.strictAssert)(certificate !== void 0, "Missing sender certificate for sealed sender message");
    const unidentifiedSenderTypeEnum = import_protobuf.SignalService.UnidentifiedSenderMessage.Message.Type;
    if (messageContent.msgType() === unidentifiedSenderTypeEnum.PLAINTEXT_CONTENT) {
      log.info(`MessageReceiver.decryptSealedSender(${logId}): unidentified message/plaintext contents`);
      const plaintextContent = import_libsignal_client.PlaintextContent.deserialize(messageContent.contents());
      return {
        plaintext: plaintextContent.body()
      };
    }
    if (messageContent.msgType() === unidentifiedSenderTypeEnum.SENDERKEY_MESSAGE) {
      log.info(`MessageReceiver.decryptSealedSender(${logId}): unidentified message/sender key contents`);
      const sealedSenderIdentifier2 = certificate.senderUuid();
      const sealedSenderSourceDevice = certificate.senderDeviceId();
      const address2 = new import_QualifiedAddress.QualifiedAddress(destinationUuid, import_Address.Address.create(sealedSenderIdentifier2, sealedSenderSourceDevice));
      const plaintext = await this.storage.protocol.enqueueSenderKeyJob(address2, () => (0, import_libsignal_client.groupDecrypt)(import_libsignal_client.ProtocolAddress.new(sealedSenderIdentifier2, sealedSenderSourceDevice), senderKeyStore, messageContent.contents()), zone);
      return { plaintext };
    }
    log.info(`MessageReceiver.decryptSealedSender(${logId}): unidentified message/passing to sealedSenderDecryptMessage`);
    const preKeyStore = new import_LibSignalStores.PreKeys({ ourUuid: destinationUuid });
    const signedPreKeyStore = new import_LibSignalStores.SignedPreKeys({ ourUuid: destinationUuid });
    const sealedSenderIdentifier = envelope.sourceUuid;
    (0, import_assert.strictAssert)(sealedSenderIdentifier !== void 0, "Empty sealed sender identifier");
    (0, import_assert.strictAssert)(envelope.sourceDevice !== void 0, "Empty sealed sender device");
    const address = new import_QualifiedAddress.QualifiedAddress(destinationUuid, import_Address.Address.create(sealedSenderIdentifier, envelope.sourceDevice));
    const unsealedPlaintext = await this.storage.protocol.enqueueSessionJob(address, () => (0, import_libsignal_client.sealedSenderDecryptMessage)(Buffer.from(ciphertext), import_libsignal_client.PublicKey.deserialize(Buffer.from(this.serverTrustRoot)), envelope.serverTimestamp, localE164 || null, destinationUuid.toString(), localDeviceId, sessionStore, identityKeyStore, preKeyStore, signedPreKeyStore), zone);
    return { unsealedPlaintext };
  }
  async innerDecrypt(stores, envelope, ciphertext, uuidKind) {
    const { sessionStore, identityKeyStore, zone } = stores;
    const logId = this.getEnvelopeId(envelope);
    const envelopeTypeEnum = import_protobuf.SignalService.Envelope.Type;
    const identifier = envelope.sourceUuid;
    const { sourceDevice } = envelope;
    const { destinationUuid } = envelope;
    const preKeyStore = new import_LibSignalStores.PreKeys({ ourUuid: destinationUuid });
    const signedPreKeyStore = new import_LibSignalStores.SignedPreKeys({ ourUuid: destinationUuid });
    (0, import_assert.strictAssert)(identifier !== void 0, "Empty identifier");
    (0, import_assert.strictAssert)(sourceDevice !== void 0, "Empty source device");
    const address = new import_QualifiedAddress.QualifiedAddress(destinationUuid, import_Address.Address.create(identifier, sourceDevice));
    if (uuidKind === import_UUID.UUIDKind.PNI && envelope.type !== envelopeTypeEnum.PREKEY_BUNDLE) {
      log.warn(`MessageReceiver.innerDecrypt(${logId}): non-PreKey envelope on PNI`);
      return void 0;
    }
    (0, import_assert.strictAssert)(uuidKind === import_UUID.UUIDKind.PNI || uuidKind === import_UUID.UUIDKind.ACI, `Unsupported uuidKind: ${uuidKind}`);
    if (envelope.type === envelopeTypeEnum.PLAINTEXT_CONTENT) {
      log.info(`decrypt/${logId}: plaintext message`);
      const buffer = Buffer.from(ciphertext);
      const plaintextContent = import_libsignal_client.PlaintextContent.deserialize(buffer);
      return this.unpad(plaintextContent.body());
    }
    if (envelope.type === envelopeTypeEnum.CIPHERTEXT) {
      log.info(`decrypt/${logId}: ciphertext message`);
      if (!identifier) {
        throw new Error("MessageReceiver.innerDecrypt: No identifier for CIPHERTEXT message");
      }
      if (!sourceDevice) {
        throw new Error("MessageReceiver.innerDecrypt: No sourceDevice for CIPHERTEXT message");
      }
      const signalMessage = import_libsignal_client.SignalMessage.deserialize(Buffer.from(ciphertext));
      const plaintext = await this.storage.protocol.enqueueSessionJob(address, async () => this.unpad(await (0, import_libsignal_client.signalDecrypt)(signalMessage, import_libsignal_client.ProtocolAddress.new(identifier, sourceDevice), sessionStore, identityKeyStore)), zone);
      return plaintext;
    }
    if (envelope.type === envelopeTypeEnum.PREKEY_BUNDLE) {
      log.info(`decrypt/${logId}: prekey message`);
      if (!identifier) {
        throw new Error("MessageReceiver.innerDecrypt: No identifier for PREKEY_BUNDLE message");
      }
      if (!sourceDevice) {
        throw new Error("MessageReceiver.innerDecrypt: No sourceDevice for PREKEY_BUNDLE message");
      }
      const preKeySignalMessage = import_libsignal_client.PreKeySignalMessage.deserialize(Buffer.from(ciphertext));
      const plaintext = await this.storage.protocol.enqueueSessionJob(address, async () => this.unpad(await (0, import_libsignal_client.signalDecryptPreKey)(preKeySignalMessage, import_libsignal_client.ProtocolAddress.new(identifier, sourceDevice), sessionStore, identityKeyStore, preKeyStore, signedPreKeyStore)), zone);
      return plaintext;
    }
    if (envelope.type === envelopeTypeEnum.UNIDENTIFIED_SENDER) {
      log.info(`decrypt/${logId}: unidentified message`);
      const { plaintext, unsealedPlaintext } = await this.decryptSealedSender(stores, envelope, ciphertext);
      if (plaintext) {
        return this.unpad(plaintext);
      }
      if (unsealedPlaintext) {
        const content = unsealedPlaintext.message();
        if (!content) {
          throw new Error("MessageReceiver.innerDecrypt: Content returned was falsey!");
        }
        return this.unpad(content);
      }
      throw new Error("Unexpected lack of plaintext from unidentified sender");
    }
    throw new Error("Unknown message type");
  }
  async decrypt(stores, envelope, ciphertext, uuidKind) {
    try {
      return await this.innerDecrypt(stores, envelope, ciphertext, uuidKind);
    } catch (error) {
      const uuid = envelope.sourceUuid;
      const deviceId = envelope.sourceDevice;
      if (error?.name === "TimeoutError" || error?.message?.includes?.("task did not complete in time")) {
        this.removeFromCache(envelope);
        throw error;
      }
      if (error?.message?.includes?.("message with old counter")) {
        this.removeFromCache(envelope);
        throw error;
      }
      if (error?.message?.includes?.("trust root validation failed")) {
        this.removeFromCache(envelope);
        throw error;
      }
      if (envelope.source && this.isBlocked(envelope.source) || envelope.sourceUuid && this.isUuidBlocked(envelope.sourceUuid)) {
        log.info("MessageReceiver.decrypt: Error from blocked sender; no further processing");
        this.removeFromCache(envelope);
        throw error;
      }
      if (uuid && deviceId) {
        const { cipherTextBytes, cipherTextType } = envelope;
        const event = new import_messageReceiverEvents.DecryptionErrorEvent({
          cipherTextBytes,
          cipherTextType,
          contentHint: envelope.contentHint,
          groupId: envelope.groupId,
          receivedAtCounter: envelope.receivedAtCounter,
          receivedAtDate: envelope.receivedAtDate,
          senderDevice: deviceId,
          senderUuid: uuid,
          timestamp: envelope.timestamp
        }, () => this.removeFromCache(envelope));
        this.addToQueue(async () => this.dispatchEvent(event), "decrypted/dispatchEvent", "Decrypted" /* Decrypted */);
      } else {
        const envelopeId = this.getEnvelopeId(envelope);
        this.removeFromCache(envelope);
        log.error(`MessageReceiver.decrypt: Envelope ${envelopeId} missing uuid or deviceId`);
      }
      throw error;
    }
  }
  async handleSentMessage(envelope, sentContainer) {
    log.info("MessageReceiver.handleSentMessage", this.getEnvelopeId(envelope));
    const {
      destination,
      destinationUuid,
      timestamp,
      message: msg,
      expirationStartTimestamp,
      unidentifiedStatus,
      isRecipientUpdate
    } = sentContainer;
    if (!msg) {
      throw new Error("MessageReceiver.handleSentMessage: message was falsey!");
    }
    let p = Promise.resolve();
    if (msg.flags && msg.flags & import_protobuf.SignalService.DataMessage.Flags.END_SESSION) {
      if (destinationUuid) {
        p = this.handleEndSession(new import_UUID.UUID(destinationUuid));
      } else if (destination) {
        const theirUuid = import_UUID.UUID.lookup(destination);
        if (theirUuid) {
          p = this.handleEndSession(theirUuid);
        } else {
          log.warn(`handleSentMessage: uuid not found for ${destination}`);
          p = Promise.resolve();
        }
      } else {
        throw new Error("MessageReceiver.handleSentMessage: Cannot end session with falsey destination");
      }
    }
    await p;
    const message = await this.processDecrypted(envelope, msg);
    const groupId = this.getProcessedGroupId(message);
    const isBlocked = groupId ? this.isGroupBlocked(groupId) : false;
    const { source, sourceUuid } = envelope;
    const ourE164 = this.storage.user.getNumber();
    const ourUuid = this.storage.user.getCheckedUuid().toString();
    const isMe = source && ourE164 && source === ourE164 || sourceUuid && ourUuid && sourceUuid === ourUuid;
    const isLeavingGroup = Boolean(!message.groupV2 && message.group && message.group.type === import_protobuf.SignalService.GroupContext.Type.QUIT);
    if (groupId && isBlocked && !(isMe && isLeavingGroup)) {
      log.warn(`Message ${this.getEnvelopeId(envelope)} ignored; destined for blocked group`);
      this.removeFromCache(envelope);
      return void 0;
    }
    const ev = new import_messageReceiverEvents.SentEvent({
      destination: (0, import_dropNull.dropNull)(destination),
      destinationUuid: (0, import_dropNull.dropNull)(destinationUuid),
      timestamp: timestamp?.toNumber(),
      serverTimestamp: envelope.serverTimestamp,
      device: envelope.sourceDevice,
      unidentifiedStatus,
      message,
      isRecipientUpdate: Boolean(isRecipientUpdate),
      receivedAtCounter: envelope.receivedAtCounter,
      receivedAtDate: envelope.receivedAtDate,
      expirationStartTimestamp: expirationStartTimestamp?.toNumber()
    }, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleStoryMessage(envelope, msg) {
    const logId = this.getEnvelopeId(envelope);
    log.info("MessageReceiver.handleStoryMessage", logId);
    const attachments = [];
    if (msg.fileAttachment) {
      const attachment = (0, import_processDataMessage.processAttachment)(msg.fileAttachment);
      attachments.push(attachment);
    }
    if (msg.textAttachment) {
      const { text } = msg.textAttachment;
      if (!text) {
        throw new Error("Text attachments must have text!");
      }
      attachments.push({
        size: text.length,
        contentType: import_MIME.APPLICATION_OCTET_STREAM,
        textAttachment: msg.textAttachment,
        blurHash: (0, import_generateBlurHash.generateBlurHash)((msg.textAttachment.color || msg.textAttachment.gradient?.startColor) ?? void 0)
      });
    }
    const groupV2 = msg.group ? (0, import_processDataMessage.processGroupV2Context)(msg.group) : void 0;
    if (groupV2 && this.isGroupBlocked(groupV2.id)) {
      log.warn(`MessageReceiver.handleStoryMessage: envelope ${this.getEnvelopeId(envelope)} ignored; destined for blocked group`);
      this.removeFromCache(envelope);
      return;
    }
    const expireTimer = Math.min(Math.floor((envelope.serverTimestamp + durations.DAY - Date.now()) / 1e3), durations.DAY / 1e3);
    if (expireTimer <= 0) {
      log.info("MessageReceiver.handleStoryMessage: story already expired", logId);
      this.removeFromCache(envelope);
      return;
    }
    const ev = new import_messageReceiverEvents.MessageEvent({
      source: envelope.source,
      sourceUuid: envelope.sourceUuid,
      sourceDevice: envelope.sourceDevice,
      timestamp: envelope.timestamp,
      serverGuid: envelope.serverGuid,
      serverTimestamp: envelope.serverTimestamp,
      unidentifiedDeliveryReceived: Boolean(envelope.unidentifiedDeliveryReceived),
      message: {
        attachments,
        expireTimer,
        flags: 0,
        groupV2,
        isStory: true,
        isViewOnce: false,
        timestamp: envelope.timestamp
      },
      receivedAtCounter: envelope.receivedAtCounter,
      receivedAtDate: envelope.receivedAtDate
    }, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleDataMessage(envelope, msg) {
    const logId = this.getEnvelopeId(envelope);
    log.info("MessageReceiver.handleDataMessage", logId);
    const isStoriesEnabled = (0, import_RemoteConfig.isEnabled)("desktop.stories") || (0, import_RemoteConfig.isEnabled)("desktop.internalUser");
    if (!isStoriesEnabled && msg.storyContext) {
      log.info(`MessageReceiver.handleDataMessage/${logId}: Dropping incoming dataMessage with storyContext field`);
      this.removeFromCache(envelope);
      return void 0;
    }
    let p = Promise.resolve();
    const destination = envelope.sourceUuid;
    if (!destination) {
      throw new Error("MessageReceiver.handleDataMessage: source and sourceUuid were falsey");
    }
    if (this.isInvalidGroupData(msg, envelope)) {
      this.removeFromCache(envelope);
      return void 0;
    }
    await this.checkGroupV1Data(msg);
    if (msg.flags && msg.flags & import_protobuf.SignalService.DataMessage.Flags.END_SESSION) {
      p = this.handleEndSession(new import_UUID.UUID(destination));
    }
    if (msg.flags && msg.flags & import_protobuf.SignalService.DataMessage.Flags.PROFILE_KEY_UPDATE) {
      (0, import_assert.strictAssert)(msg.profileKey && msg.profileKey.length > 0, "PROFILE_KEY_UPDATE without profileKey");
      const ev2 = new import_messageReceiverEvents.ProfileKeyUpdateEvent({
        source: envelope.source,
        sourceUuid: envelope.sourceUuid,
        profileKey: Bytes.toBase64(msg.profileKey)
      }, this.removeFromCache.bind(this, envelope));
      return this.dispatchAndWait(ev2);
    }
    await p;
    const message = await this.processDecrypted(envelope, msg);
    const groupId = this.getProcessedGroupId(message);
    const isBlocked = groupId ? this.isGroupBlocked(groupId) : false;
    const { source, sourceUuid } = envelope;
    const ourE164 = this.storage.user.getNumber();
    const ourUuid = this.storage.user.getCheckedUuid().toString();
    const isMe = source && ourE164 && source === ourE164 || sourceUuid && ourUuid && sourceUuid === ourUuid;
    const isLeavingGroup = Boolean(!message.groupV2 && message.group && message.group.type === import_protobuf.SignalService.GroupContext.Type.QUIT);
    if (groupId && isBlocked && !(isMe && isLeavingGroup)) {
      log.warn(`Message ${this.getEnvelopeId(envelope)} ignored; destined for blocked group`);
      this.removeFromCache(envelope);
      return void 0;
    }
    const ev = new import_messageReceiverEvents.MessageEvent({
      source: envelope.source,
      sourceUuid: envelope.sourceUuid,
      sourceDevice: envelope.sourceDevice,
      timestamp: envelope.timestamp,
      serverGuid: envelope.serverGuid,
      serverTimestamp: envelope.serverTimestamp,
      unidentifiedDeliveryReceived: Boolean(envelope.unidentifiedDeliveryReceived),
      message,
      receivedAtCounter: envelope.receivedAtCounter,
      receivedAtDate: envelope.receivedAtDate
    }, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async maybeUpdateTimestamp(envelope) {
    const { retryPlaceholders } = window.Signal.Services;
    if (!retryPlaceholders) {
      log.warn("maybeUpdateTimestamp: retry placeholders not available!");
      return envelope;
    }
    const { timestamp } = envelope;
    const identifier = envelope.groupId || envelope.sourceUuid;
    const conversation = window.ConversationController.get(identifier);
    try {
      if (!conversation) {
        const idForLogging = envelope.groupId ? `groupv2(${envelope.groupId})` : envelope.sourceUuid;
        log.info(`maybeUpdateTimestamp/${timestamp}: No conversation found for identifier ${idForLogging}`);
        return envelope;
      }
      const logId = `${conversation.idForLogging()}/${timestamp}`;
      const item = await retryPlaceholders.findByMessageAndRemove(conversation.id, timestamp);
      if (item && item.wasOpened) {
        log.info(`maybeUpdateTimestamp/${logId}: found retry placeholder, but conversation was opened. No updates made.`);
      } else if (item) {
        log.info(`maybeUpdateTimestamp/${logId}: found retry placeholder. Updating receivedAtCounter/receivedAtDate`);
        return {
          ...envelope,
          receivedAtCounter: item.receivedAtCounter,
          receivedAtDate: item.receivedAt
        };
      }
    } catch (error) {
      log.error(`maybeUpdateTimestamp/${timestamp}: Failed to process message: ${Errors.toLogFormat(error)}`);
    }
    return envelope;
  }
  async innerHandleContentMessage(incomingEnvelope, plaintext) {
    const content = import_protobuf.SignalService.Content.decode(plaintext);
    const envelope = await this.maybeUpdateTimestamp(incomingEnvelope);
    if (content.decryptionErrorMessage && Bytes.isNotEmpty(content.decryptionErrorMessage)) {
      await this.handleDecryptionError(envelope, content.decryptionErrorMessage);
      return;
    }
    if (content.syncMessage) {
      await this.handleSyncMessage(envelope, (0, import_processSyncMessage.processSyncMessage)(content.syncMessage));
      return;
    }
    if (content.dataMessage) {
      await this.handleDataMessage(envelope, content.dataMessage);
      return;
    }
    if (content.nullMessage) {
      await this.handleNullMessage(envelope);
      return;
    }
    if (content.callingMessage) {
      await this.handleCallingMessage(envelope, content.callingMessage);
      return;
    }
    if (content.receiptMessage) {
      await this.handleReceiptMessage(envelope, content.receiptMessage);
      return;
    }
    if (content.typingMessage) {
      await this.handleTypingMessage(envelope, content.typingMessage);
      return;
    }
    const isStoriesEnabled = (0, import_RemoteConfig.isEnabled)("desktop.stories") || (0, import_RemoteConfig.isEnabled)("desktop.internalUser");
    if (content.storyMessage) {
      if (isStoriesEnabled) {
        await this.handleStoryMessage(envelope, content.storyMessage);
        return;
      }
      const logId = this.getEnvelopeId(envelope);
      log.info(`innerHandleContentMessage/${logId}: Dropping incoming message with storyMessage field`);
      this.removeFromCache(envelope);
      return;
    }
    this.removeFromCache(envelope);
    if (Bytes.isEmpty(content.senderKeyDistributionMessage)) {
      throw new Error("Unsupported content message");
    }
  }
  async handleDecryptionError(envelope, decryptionError) {
    const logId = this.getEnvelopeId(envelope);
    log.info(`handleDecryptionError: ${logId}`);
    const buffer = Buffer.from(decryptionError);
    const request = import_libsignal_client.DecryptionErrorMessage.deserialize(buffer);
    const { sourceUuid, sourceDevice } = envelope;
    if (!sourceUuid || !sourceDevice) {
      log.error(`handleDecryptionError/${logId}: Missing uuid or device!`);
      this.removeFromCache(envelope);
      return;
    }
    const event = new import_messageReceiverEvents.RetryRequestEvent({
      groupId: envelope.groupId,
      requesterDevice: sourceDevice,
      requesterUuid: sourceUuid,
      ratchetKey: request.ratchetKey(),
      senderDevice: request.deviceId(),
      sentAt: request.timestamp()
    }, () => this.removeFromCache(envelope));
    await this.dispatchEvent(event);
  }
  async handleSenderKeyDistributionMessage(stores, envelope, distributionMessage) {
    const envelopeId = this.getEnvelopeId(envelope);
    log.info(`handleSenderKeyDistributionMessage/${envelopeId}`);
    const identifier = envelope.sourceUuid;
    const { sourceDevice } = envelope;
    if (!identifier) {
      throw new Error(`handleSenderKeyDistributionMessage: No identifier for envelope ${envelopeId}`);
    }
    if (!(0, import_lodash.isNumber)(sourceDevice)) {
      throw new Error(`handleSenderKeyDistributionMessage: Missing sourceDevice for envelope ${envelopeId}`);
    }
    const sender = import_libsignal_client.ProtocolAddress.new(identifier, sourceDevice);
    const senderKeyDistributionMessage = import_libsignal_client.SenderKeyDistributionMessage.deserialize(Buffer.from(distributionMessage));
    const { destinationUuid } = envelope;
    const address = new import_QualifiedAddress.QualifiedAddress(destinationUuid, import_Address.Address.create(identifier, sourceDevice));
    await this.storage.protocol.enqueueSenderKeyJob(address, () => (0, import_libsignal_client.processSenderKeyDistributionMessage)(sender, senderKeyDistributionMessage, stores.senderKeyStore), stores.zone);
  }
  async handleCallingMessage(envelope, callingMessage) {
    this.removeFromCache(envelope);
    await window.Signal.Services.calling.handleCallingMessage(envelope, callingMessage);
  }
  async handleReceiptMessage(envelope, receiptMessage) {
    (0, import_assert.strictAssert)(receiptMessage.timestamp, "Receipt message without timestamp");
    let EventClass;
    switch (receiptMessage.type) {
      case import_protobuf.SignalService.ReceiptMessage.Type.DELIVERY:
        EventClass = import_messageReceiverEvents.DeliveryEvent;
        break;
      case import_protobuf.SignalService.ReceiptMessage.Type.READ:
        EventClass = import_messageReceiverEvents.ReadEvent;
        break;
      case import_protobuf.SignalService.ReceiptMessage.Type.VIEWED:
        EventClass = import_messageReceiverEvents.ViewEvent;
        break;
      default:
        return;
    }
    await Promise.all(receiptMessage.timestamp.map(async (rawTimestamp) => {
      const ev = new EventClass({
        timestamp: rawTimestamp?.toNumber(),
        envelopeTimestamp: envelope.timestamp,
        source: envelope.source,
        sourceUuid: envelope.sourceUuid,
        sourceDevice: envelope.sourceDevice
      }, this.removeFromCache.bind(this, envelope));
      await this.dispatchAndWait(ev);
    }));
  }
  async handleTypingMessage(envelope, typingMessage) {
    this.removeFromCache(envelope);
    if (envelope.timestamp && typingMessage.timestamp) {
      const envelopeTimestamp = envelope.timestamp;
      const typingTimestamp = typingMessage.timestamp?.toNumber();
      if (typingTimestamp !== envelopeTimestamp) {
        log.warn(`Typing message envelope timestamp (${envelopeTimestamp}) did not match typing timestamp (${typingTimestamp})`);
        return;
      }
    }
    (0, import_assert.strictAssert)(envelope.sourceDevice !== void 0, "TypingMessage requires sourceDevice in the envelope");
    const { groupId, timestamp, action } = typingMessage;
    let groupIdString;
    let groupV2IdString;
    if (groupId && groupId.byteLength > 0) {
      if (groupId.byteLength === GROUPV1_ID_LENGTH) {
        groupIdString = Bytes.toBinary(groupId);
        groupV2IdString = this.deriveGroupV2FromV1(groupId);
      } else if (groupId.byteLength === GROUPV2_ID_LENGTH) {
        groupV2IdString = Bytes.toBase64(groupId);
      } else {
        log.error("handleTypingMessage: Received invalid groupId value");
      }
    }
    await this.dispatchEvent(new import_messageReceiverEvents.TypingEvent({
      sender: envelope.source,
      senderUuid: envelope.sourceUuid,
      senderDevice: envelope.sourceDevice,
      typing: {
        typingMessage,
        timestamp: timestamp?.toNumber() ?? Date.now(),
        started: action === import_protobuf.SignalService.TypingMessage.Action.STARTED,
        stopped: action === import_protobuf.SignalService.TypingMessage.Action.STOPPED,
        groupId: groupIdString,
        groupV2Id: groupV2IdString
      }
    }));
  }
  handleNullMessage(envelope) {
    log.info("MessageReceiver.handleNullMessage", this.getEnvelopeId(envelope));
    this.removeFromCache(envelope);
  }
  isInvalidGroupData(message, envelope) {
    const { group, groupV2 } = message;
    if (group) {
      const { id } = group;
      (0, import_assert.strictAssert)(id, "Group data has no id");
      const isInvalid = id.byteLength !== GROUPV1_ID_LENGTH;
      if (isInvalid) {
        log.info("isInvalidGroupData: invalid GroupV1 message from", this.getEnvelopeId(envelope));
      }
      return isInvalid;
    }
    if (groupV2) {
      const { masterKey } = groupV2;
      (0, import_assert.strictAssert)(masterKey, "Group v2 data has no masterKey");
      const isInvalid = masterKey.byteLength !== import_groups.MASTER_KEY_LENGTH;
      if (isInvalid) {
        log.info("isInvalidGroupData: invalid GroupV2 message from", this.getEnvelopeId(envelope));
      }
      return isInvalid;
    }
    return false;
  }
  deriveGroupV2FromV1(groupId) {
    if (groupId.byteLength !== GROUPV1_ID_LENGTH) {
      throw new Error(`deriveGroupV2FromV1: had id with wrong byteLength: ${groupId.byteLength}`);
    }
    const masterKey = (0, import_Crypto.deriveMasterKeyFromGroupV1)(groupId);
    const data = (0, import_groups.deriveGroupFields)(masterKey);
    return Bytes.toBase64(data.id);
  }
  async checkGroupV1Data(message) {
    const { group } = message;
    if (!group) {
      return;
    }
    if (!group.id) {
      throw new Error("deriveGroupV1Data: had falsey id");
    }
    const { id } = group;
    if (id.byteLength !== GROUPV1_ID_LENGTH) {
      throw new Error(`deriveGroupV1Data: had id with wrong byteLength: ${id.byteLength}`);
    }
  }
  getProcessedGroupId(message) {
    if (message.groupV2) {
      return message.groupV2.id;
    }
    if (message.group && message.group.id) {
      return message.group.id;
    }
    return void 0;
  }
  getGroupId(message) {
    if (message.groupV2) {
      (0, import_assert.strictAssert)(message.groupV2.masterKey, "Missing groupV2.masterKey");
      const { id } = (0, import_groups.deriveGroupFields)(message.groupV2.masterKey);
      return Bytes.toBase64(id);
    }
    if (message.group && message.group.id) {
      return Bytes.toBinary(message.group.id);
    }
    return void 0;
  }
  getDestination(sentMessage) {
    if (sentMessage.message && sentMessage.message.groupV2) {
      return `groupv2(${this.getGroupId(sentMessage.message)})`;
    }
    if (sentMessage.message && sentMessage.message.group) {
      (0, import_assert.strictAssert)(sentMessage.message.group.id, "group without id");
      return `group(${this.getGroupId(sentMessage.message)})`;
    }
    return sentMessage.destination || sentMessage.destinationUuid;
  }
  async handleSyncMessage(envelope, syncMessage) {
    const ourNumber = this.storage.user.getNumber();
    const ourUuid = this.storage.user.getCheckedUuid();
    const fromSelfSource = envelope.source && envelope.source === ourNumber;
    const fromSelfSourceUuid = envelope.sourceUuid && envelope.sourceUuid === ourUuid.toString();
    if (!fromSelfSource && !fromSelfSourceUuid) {
      throw new Error("Received sync message from another number");
    }
    const ourDeviceId = this.storage.user.getDeviceId();
    if (envelope.sourceDevice == ourDeviceId) {
      throw new Error("Received sync message from our own device");
    }
    if (syncMessage.sent) {
      const sentMessage = syncMessage.sent;
      if (!sentMessage || !sentMessage.message) {
        throw new Error("MessageReceiver.handleSyncMessage: sync sent message was missing message");
      }
      if (this.isInvalidGroupData(sentMessage.message, envelope)) {
        this.removeFromCache(envelope);
        return void 0;
      }
      await this.checkGroupV1Data(sentMessage.message);
      (0, import_assert.strictAssert)(sentMessage.timestamp, "sent message without timestamp");
      log.info("sent message to", this.getDestination(sentMessage), sentMessage.timestamp?.toNumber(), "from", this.getEnvelopeId(envelope));
      return this.handleSentMessage(envelope, sentMessage);
    }
    if (syncMessage.contacts) {
      this.handleContacts(envelope, syncMessage.contacts);
      return void 0;
    }
    if (syncMessage.groups) {
      this.handleGroups(envelope, syncMessage.groups);
      return void 0;
    }
    if (syncMessage.blocked) {
      return this.handleBlocked(envelope, syncMessage.blocked);
    }
    if (syncMessage.request) {
      log.info("Got SyncMessage Request");
      this.removeFromCache(envelope);
      return void 0;
    }
    if (syncMessage.read && syncMessage.read.length) {
      return this.handleRead(envelope, syncMessage.read);
    }
    if (syncMessage.verified) {
      log.info("Got verified sync message, dropping");
      this.removeFromCache(envelope);
      return void 0;
    }
    if (syncMessage.configuration) {
      return this.handleConfiguration(envelope, syncMessage.configuration);
    }
    if (syncMessage.stickerPackOperation && syncMessage.stickerPackOperation.length > 0) {
      return this.handleStickerPackOperation(envelope, syncMessage.stickerPackOperation);
    }
    if (syncMessage.viewOnceOpen) {
      return this.handleViewOnceOpen(envelope, syncMessage.viewOnceOpen);
    }
    if (syncMessage.messageRequestResponse) {
      return this.handleMessageRequestResponse(envelope, syncMessage.messageRequestResponse);
    }
    if (syncMessage.fetchLatest) {
      return this.handleFetchLatest(envelope, syncMessage.fetchLatest);
    }
    if (syncMessage.keys) {
      return this.handleKeys(envelope, syncMessage.keys);
    }
    if (syncMessage.pniIdentity) {
      return this.handlePNIIdentity(envelope, syncMessage.pniIdentity);
    }
    if (syncMessage.viewed && syncMessage.viewed.length) {
      return this.handleViewed(envelope, syncMessage.viewed);
    }
    this.removeFromCache(envelope);
    log.warn(`handleSyncMessage/${this.getEnvelopeId(envelope)}: Got empty SyncMessage`);
    return Promise.resolve();
  }
  async handleConfiguration(envelope, configuration) {
    log.info("got configuration sync message");
    const ev = new import_messageReceiverEvents.ConfigurationEvent(configuration, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleViewOnceOpen(envelope, sync) {
    log.info("got view once open sync message");
    const ev = new import_messageReceiverEvents.ViewOnceOpenSyncEvent({
      source: (0, import_dropNull.dropNull)(sync.sender),
      sourceUuid: sync.senderUuid ? (0, import_normalizeUuid.normalizeUuid)(sync.senderUuid, "handleViewOnceOpen.senderUuid") : void 0,
      timestamp: sync.timestamp?.toNumber()
    }, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleMessageRequestResponse(envelope, sync) {
    log.info("got message request response sync message");
    const { groupId } = sync;
    let groupIdString;
    let groupV2IdString;
    if (groupId && groupId.byteLength > 0) {
      if (groupId.byteLength === GROUPV1_ID_LENGTH) {
        groupIdString = Bytes.toBinary(groupId);
        groupV2IdString = this.deriveGroupV2FromV1(groupId);
      } else if (groupId.byteLength === GROUPV2_ID_LENGTH) {
        groupV2IdString = Bytes.toBase64(groupId);
      } else {
        this.removeFromCache(envelope);
        log.error("Received message request with invalid groupId");
        return void 0;
      }
    }
    const ev = new import_messageReceiverEvents.MessageRequestResponseEvent({
      threadE164: (0, import_dropNull.dropNull)(sync.threadE164),
      threadUuid: sync.threadUuid ? (0, import_normalizeUuid.normalizeUuid)(sync.threadUuid, "handleMessageRequestResponse.threadUuid") : void 0,
      messageRequestResponseType: sync.type,
      groupId: groupIdString,
      groupV2Id: groupV2IdString
    }, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleFetchLatest(envelope, sync) {
    log.info("got fetch latest sync message");
    const ev = new import_messageReceiverEvents.FetchLatestEvent(sync.type, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleKeys(envelope, sync) {
    log.info("got keys sync message");
    if (!sync.storageService) {
      return void 0;
    }
    const ev = new import_messageReceiverEvents.KeysEvent(sync.storageService, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handlePNIIdentity(envelope, { publicKey, privateKey }) {
    log.info("MessageReceiver: got pni identity sync message");
    if (!publicKey || !privateKey) {
      log.warn("MessageReceiver: empty pni identity sync message");
      return void 0;
    }
    const ev = new import_messageReceiverEvents.PNIIdentityEvent({ publicKey, privateKey }, this.removeFromCache.bind(this, envelope));
    if (this.isEmptied) {
      log.info("MessageReceiver: emitting pni identity sync message");
      return this.dispatchAndWait(ev);
    }
    log.info("MessageReceiver: scheduling pni identity sync message");
    this.pendingPNIIdentityEvent?.confirm();
    this.pendingPNIIdentityEvent = ev;
  }
  async handleStickerPackOperation(envelope, operations) {
    const ENUM = import_protobuf.SignalService.SyncMessage.StickerPackOperation.Type;
    log.info("got sticker pack operation sync message");
    const stickerPacks = operations.map((operation) => ({
      id: operation.packId ? Bytes.toHex(operation.packId) : void 0,
      key: operation.packKey ? Bytes.toBase64(operation.packKey) : void 0,
      isInstall: operation.type === ENUM.INSTALL,
      isRemove: operation.type === ENUM.REMOVE
    }));
    const ev = new import_messageReceiverEvents.StickerPackEvent(stickerPacks, this.removeFromCache.bind(this, envelope));
    return this.dispatchAndWait(ev);
  }
  async handleRead(envelope, read) {
    log.info("MessageReceiver.handleRead", this.getEnvelopeId(envelope));
    const results = [];
    for (const { timestamp, sender, senderUuid } of read) {
      const ev = new import_messageReceiverEvents.ReadSyncEvent({
        envelopeTimestamp: envelope.timestamp,
        timestamp: timestamp?.toNumber(),
        sender: (0, import_dropNull.dropNull)(sender),
        senderUuid: senderUuid ? (0, import_normalizeUuid.normalizeUuid)(senderUuid, "handleRead.senderUuid") : void 0
      }, this.removeFromCache.bind(this, envelope));
      results.push(this.dispatchAndWait(ev));
    }
    await Promise.all(results);
  }
  async handleViewed(envelope, viewed) {
    log.info("MessageReceiver.handleViewed", this.getEnvelopeId(envelope));
    await Promise.all(viewed.map(async ({ timestamp, senderE164, senderUuid }) => {
      const ev = new import_messageReceiverEvents.ViewSyncEvent({
        envelopeTimestamp: envelope.timestamp,
        timestamp: timestamp?.toNumber(),
        senderE164: (0, import_dropNull.dropNull)(senderE164),
        senderUuid: senderUuid ? (0, import_normalizeUuid.normalizeUuid)(senderUuid, "handleViewed.senderUuid") : void 0
      }, this.removeFromCache.bind(this, envelope));
      await this.dispatchAndWait(ev);
    }));
  }
  async handleContacts(envelope, contacts) {
    log.info("MessageReceiver: handleContacts");
    const { blob } = contacts;
    if (!blob) {
      throw new Error("MessageReceiver.handleContacts: blob field was missing");
    }
    this.removeFromCache(envelope);
    const attachmentPointer = await this.handleAttachment(blob);
    const results = [];
    const contactBuffer = new import_ContactsParser.ContactBuffer(attachmentPointer.data);
    let contactDetails = contactBuffer.next();
    while (contactDetails !== void 0) {
      const contactEvent = new import_messageReceiverEvents.ContactEvent(contactDetails, envelope.receivedAtCounter);
      results.push(this.dispatchAndWait(contactEvent));
      contactDetails = contactBuffer.next();
    }
    await Promise.all(results);
    const finalEvent = new import_messageReceiverEvents.ContactSyncEvent();
    await this.dispatchAndWait(finalEvent);
    log.info("handleContacts: finished");
  }
  async handleGroups(envelope, groups) {
    log.info("group sync");
    const { blob } = groups;
    this.removeFromCache(envelope);
    if (!blob) {
      throw new Error("MessageReceiver.handleGroups: blob field was missing");
    }
    const attachmentPointer = await this.handleAttachment(blob);
    const groupBuffer = new import_ContactsParser.GroupBuffer(attachmentPointer.data);
    let groupDetails = groupBuffer.next();
    const promises = [];
    while (groupDetails) {
      const { id } = groupDetails;
      (0, import_assert.strictAssert)(id, "Group details without id");
      if (id.byteLength !== 16) {
        log.error(`onGroupReceived: Id was ${id} bytes, expected 16 bytes. Dropping group.`);
        continue;
      }
      const ev2 = new import_messageReceiverEvents.GroupEvent({
        ...groupDetails,
        id: Bytes.toBinary(id)
      }, envelope.receivedAtCounter);
      const promise = this.dispatchAndWait(ev2).catch((e) => {
        log.error("error processing group", e);
      });
      groupDetails = groupBuffer.next();
      promises.push(promise);
    }
    await Promise.all(promises);
    const ev = new import_messageReceiverEvents.GroupSyncEvent();
    return this.dispatchAndWait(ev);
  }
  async handleBlocked(envelope, blocked) {
    const allIdentifiers = [];
    let changed = false;
    if (blocked.numbers) {
      const previous = this.storage.get("blocked", []);
      log.info("handleBlocked: Blocking these numbers:", blocked.numbers);
      await this.storage.put("blocked", blocked.numbers);
      if (!(0, import_areArraysMatchingSets.areArraysMatchingSets)(previous, blocked.numbers)) {
        changed = true;
        allIdentifiers.push(...previous);
        allIdentifiers.push(...blocked.numbers);
      }
    }
    if (blocked.uuids) {
      const previous = this.storage.get("blocked-uuids", []);
      const uuids = blocked.uuids.map((uuid, index) => {
        return (0, import_normalizeUuid.normalizeUuid)(uuid, `handleBlocked.uuids.${index}`);
      });
      log.info("handleBlocked: Blocking these uuids:", uuids);
      await this.storage.put("blocked-uuids", uuids);
      if (!(0, import_areArraysMatchingSets.areArraysMatchingSets)(previous, uuids)) {
        changed = true;
        allIdentifiers.push(...previous);
        allIdentifiers.push(...blocked.uuids);
      }
    }
    if (blocked.groupIds) {
      const previous = this.storage.get("blocked-groups", []);
      const groupV1Ids = [];
      const groupIds = [];
      blocked.groupIds.forEach((groupId) => {
        if (groupId.byteLength === GROUPV1_ID_LENGTH) {
          groupV1Ids.push(Bytes.toBinary(groupId));
          groupIds.push(this.deriveGroupV2FromV1(groupId));
        } else if (groupId.byteLength === GROUPV2_ID_LENGTH) {
          groupIds.push(Bytes.toBase64(groupId));
        } else {
          log.error("handleBlocked: Received invalid groupId value");
        }
      });
      log.info("handleBlocked: Blocking these groups - v2:", groupIds.map((groupId) => `groupv2(${groupId})`), "v1:", groupV1Ids.map((groupId) => `group(${groupId})`));
      const ids = [...groupIds, ...groupV1Ids];
      await this.storage.put("blocked-groups", ids);
      if (!(0, import_areArraysMatchingSets.areArraysMatchingSets)(previous, ids)) {
        changed = true;
        allIdentifiers.push(...previous);
        allIdentifiers.push(...ids);
      }
    }
    this.removeFromCache(envelope);
    if (changed) {
      log.info("handleBlocked: Block list changed, forcing re-render.");
      const uniqueIdentifiers = Array.from(new Set(allIdentifiers));
      window.ConversationController.forceRerender(uniqueIdentifiers);
    }
  }
  isBlocked(number) {
    return this.storage.blocked.isBlocked(number);
  }
  isUuidBlocked(uuid) {
    return this.storage.blocked.isUuidBlocked(uuid);
  }
  isGroupBlocked(groupId) {
    return this.storage.blocked.isGroupBlocked(groupId);
  }
  async handleAttachment(attachment) {
    const cleaned = (0, import_processDataMessage.processAttachment)(attachment);
    return (0, import_downloadAttachment.downloadAttachment)(this.server, cleaned);
  }
  async handleEndSession(theirUuid) {
    log.info(`handleEndSession: closing sessions for ${theirUuid.toString()}`);
    await this.storage.protocol.archiveAllSessions(theirUuid);
  }
  async processDecrypted(envelope, decrypted) {
    return (0, import_processDataMessage.processDataMessage)(decrypted, envelope.timestamp);
  }
}
function envelopeTypeToCiphertextType(type) {
  const { Type } = import_protobuf.SignalService.Envelope;
  if (type === Type.CIPHERTEXT) {
    return import_libsignal_client.CiphertextMessageType.Whisper;
  }
  if (type === Type.KEY_EXCHANGE) {
    throw new Error("envelopeTypeToCiphertextType: Cannot process KEY_EXCHANGE messages");
  }
  if (type === Type.PLAINTEXT_CONTENT) {
    return import_libsignal_client.CiphertextMessageType.Plaintext;
  }
  if (type === Type.PREKEY_BUNDLE) {
    return import_libsignal_client.CiphertextMessageType.PreKey;
  }
  if (type === Type.RECEIPT) {
    return import_libsignal_client.CiphertextMessageType.Plaintext;
  }
  if (type === Type.UNIDENTIFIED_SENDER) {
    throw new Error("envelopeTypeToCiphertextType: Cannot process UNIDENTIFIED_SENDER messages");
  }
  if (type === Type.UNKNOWN) {
    throw new Error("envelopeTypeToCiphertextType: Cannot process UNKNOWN messages");
  }
  throw new Error(`envelopeTypeToCiphertextType: Unknown type ${type}`);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlY2VpdmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tYml0d2lzZSAqL1xuXG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0IHsgdjQgYXMgZ2V0R3VpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIFNlYWxlZFNlbmRlckRlY3J5cHRpb25SZXN1bHQsXG4gIFNlbmRlckNlcnRpZmljYXRlLFxuICBVbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlQ29udGVudCxcbn0gZnJvbSAnQHNpZ25hbGFwcC9saWJzaWduYWwtY2xpZW50JztcbmltcG9ydCB7XG4gIENpcGhlcnRleHRNZXNzYWdlVHlwZSxcbiAgRGVjcnlwdGlvbkVycm9yTWVzc2FnZSxcbiAgZ3JvdXBEZWNyeXB0LFxuICBQbGFpbnRleHRDb250ZW50LFxuICBQcmVLZXlTaWduYWxNZXNzYWdlLFxuICBwcm9jZXNzU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZSxcbiAgUHJvdG9jb2xBZGRyZXNzLFxuICBQdWJsaWNLZXksXG4gIHNlYWxlZFNlbmRlckRlY3J5cHRNZXNzYWdlLFxuICBzZWFsZWRTZW5kZXJEZWNyeXB0VG9Vc21jLFxuICBTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlLFxuICBzaWduYWxEZWNyeXB0LFxuICBzaWduYWxEZWNyeXB0UHJlS2V5LFxuICBTaWduYWxNZXNzYWdlLFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQge1xuICBJZGVudGl0eUtleXMsXG4gIFByZUtleXMsXG4gIFNlbmRlcktleXMsXG4gIFNlc3Npb25zLFxuICBTaWduZWRQcmVLZXlzLFxufSBmcm9tICcuLi9MaWJTaWduYWxTdG9yZXMnO1xuaW1wb3J0IHsgdmVyaWZ5U2lnbmF0dXJlIH0gZnJvbSAnLi4vQ3VydmUnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHR5cGUgeyBCYXRjaGVyVHlwZSB9IGZyb20gJy4uL3V0aWwvYmF0Y2hlcic7XG5pbXBvcnQgeyBjcmVhdGVCYXRjaGVyIH0gZnJvbSAnLi4vdXRpbC9iYXRjaGVyJztcbmltcG9ydCB7IGRyb3BOdWxsIH0gZnJvbSAnLi4vdXRpbC9kcm9wTnVsbCc7XG5pbXBvcnQgeyBub3JtYWxpemVVdWlkIH0gZnJvbSAnLi4vdXRpbC9ub3JtYWxpemVVdWlkJztcbmltcG9ydCB7IHBhcnNlSW50T3JUaHJvdyB9IGZyb20gJy4uL3V0aWwvcGFyc2VJbnRPclRocm93JztcbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi4vdXRpbC9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5pbXBvcnQgeyBab25lIH0gZnJvbSAnLi4vdXRpbC9ab25lJztcbmltcG9ydCB7IGRlcml2ZU1hc3RlcktleUZyb21Hcm91cFYxIH0gZnJvbSAnLi4vQ3J5cHRvJztcbmltcG9ydCB0eXBlIHsgRG93bmxvYWRlZEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBVVUlELCBVVUlES2luZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBpc0VuYWJsZWQgfSBmcm9tICcuLi9SZW1vdGVDb25maWcnO1xuXG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHsgZGVyaXZlR3JvdXBGaWVsZHMsIE1BU1RFUl9LRVlfTEVOR1RIIH0gZnJvbSAnLi4vZ3JvdXBzJztcblxuaW1wb3J0IGNyZWF0ZVRhc2tXaXRoVGltZW91dCBmcm9tICcuL1Rhc2tXaXRoVGltZW91dCc7XG5pbXBvcnQge1xuICBwcm9jZXNzQXR0YWNobWVudCxcbiAgcHJvY2Vzc0RhdGFNZXNzYWdlLFxuICBwcm9jZXNzR3JvdXBWMkNvbnRleHQsXG59IGZyb20gJy4vcHJvY2Vzc0RhdGFNZXNzYWdlJztcbmltcG9ydCB7IHByb2Nlc3NTeW5jTWVzc2FnZSB9IGZyb20gJy4vcHJvY2Vzc1N5bmNNZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgRXZlbnRIYW5kbGVyIH0gZnJvbSAnLi9FdmVudFRhcmdldCc7XG5pbXBvcnQgRXZlbnRUYXJnZXQgZnJvbSAnLi9FdmVudFRhcmdldCc7XG5pbXBvcnQgeyBkb3dubG9hZEF0dGFjaG1lbnQgfSBmcm9tICcuL2Rvd25sb2FkQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IEluY29taW5nV2ViU29ja2V0UmVxdWVzdCB9IGZyb20gJy4vV2Vic29ja2V0UmVzb3VyY2VzJztcbmltcG9ydCB7IENvbnRhY3RCdWZmZXIsIEdyb3VwQnVmZmVyIH0gZnJvbSAnLi9Db250YWN0c1BhcnNlcic7XG5pbXBvcnQgdHlwZSB7IFdlYkFQSVR5cGUgfSBmcm9tICcuL1dlYkFQSSc7XG5pbXBvcnQgdHlwZSB7IFN0b3JhZ2UgfSBmcm9tICcuL1N0b3JhZ2UnO1xuaW1wb3J0IHsgV2Fybk9ubHlFcnJvciB9IGZyb20gJy4vRXJyb3JzJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCB0eXBlIHtcbiAgUHJvY2Vzc2VkQXR0YWNobWVudCxcbiAgUHJvY2Vzc2VkRGF0YU1lc3NhZ2UsXG4gIFByb2Nlc3NlZFN5bmNNZXNzYWdlLFxuICBQcm9jZXNzZWRTZW50LFxuICBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgSVJlcXVlc3RIYW5kbGVyLFxuICBVbnByb2Nlc3NlZFR5cGUsXG59IGZyb20gJy4vVHlwZXMuZCc7XG5pbXBvcnQge1xuICBFbXB0eUV2ZW50LFxuICBFbnZlbG9wZUV2ZW50LFxuICBQcm9ncmVzc0V2ZW50LFxuICBUeXBpbmdFdmVudCxcbiAgRXJyb3JFdmVudCxcbiAgRGVsaXZlcnlFdmVudCxcbiAgRGVjcnlwdGlvbkVycm9yRXZlbnQsXG4gIFNlbnRFdmVudCxcbiAgUHJvZmlsZUtleVVwZGF0ZUV2ZW50LFxuICBNZXNzYWdlRXZlbnQsXG4gIFJldHJ5UmVxdWVzdEV2ZW50LFxuICBSZWFkRXZlbnQsXG4gIFZpZXdFdmVudCxcbiAgQ29uZmlndXJhdGlvbkV2ZW50LFxuICBWaWV3T25jZU9wZW5TeW5jRXZlbnQsXG4gIE1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VFdmVudCxcbiAgRmV0Y2hMYXRlc3RFdmVudCxcbiAgS2V5c0V2ZW50LFxuICBQTklJZGVudGl0eUV2ZW50LFxuICBTdGlja2VyUGFja0V2ZW50LFxuICBSZWFkU3luY0V2ZW50LFxuICBWaWV3U3luY0V2ZW50LFxuICBDb250YWN0RXZlbnQsXG4gIENvbnRhY3RTeW5jRXZlbnQsXG4gIEdyb3VwRXZlbnQsXG4gIEdyb3VwU3luY0V2ZW50LFxufSBmcm9tICcuL21lc3NhZ2VSZWNlaXZlckV2ZW50cyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGFyZUFycmF5c01hdGNoaW5nU2V0cyB9IGZyb20gJy4uL3V0aWwvYXJlQXJyYXlzTWF0Y2hpbmdTZXRzJztcbmltcG9ydCB7IGdlbmVyYXRlQmx1ckhhc2ggfSBmcm9tICcuLi91dGlsL2dlbmVyYXRlQmx1ckhhc2gnO1xuaW1wb3J0IHsgQVBQTElDQVRJT05fT0NURVRfU1RSRUFNIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5cbmNvbnN0IEdST1VQVjFfSURfTEVOR1RIID0gMTY7XG5jb25zdCBHUk9VUFYyX0lEX0xFTkdUSCA9IDMyO1xuY29uc3QgUkVUUllfVElNRU9VVCA9IDIgKiA2MCAqIDEwMDA7XG5cbnR5cGUgVW5zZWFsZWRFbnZlbG9wZSA9IFJlYWRvbmx5PFxuICBQcm9jZXNzZWRFbnZlbG9wZSAmIHtcbiAgICB1bmlkZW50aWZpZWREZWxpdmVyeVJlY2VpdmVkPzogYm9vbGVhbjtcbiAgICBjb250ZW50SGludD86IG51bWJlcjtcbiAgICBncm91cElkPzogc3RyaW5nO1xuICAgIGNpcGhlclRleHRCeXRlcz86IFVpbnQ4QXJyYXk7XG4gICAgY2lwaGVyVGV4dFR5cGU/OiBudW1iZXI7XG4gICAgY2VydGlmaWNhdGU/OiBTZW5kZXJDZXJ0aWZpY2F0ZTtcbiAgICB1bnNlYWxlZENvbnRlbnQ/OiBVbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlQ29udGVudDtcbiAgfVxuPjtcblxudHlwZSBEZWNyeXB0UmVzdWx0ID0gUmVhZG9ubHk8e1xuICBlbnZlbG9wZTogVW5zZWFsZWRFbnZlbG9wZTtcbiAgcGxhaW50ZXh0PzogVWludDhBcnJheTtcbn0+O1xuXG50eXBlIERlY3J5cHRTZWFsZWRTZW5kZXJSZXN1bHQgPSBSZWFkb25seTx7XG4gIHBsYWludGV4dD86IFVpbnQ4QXJyYXk7XG4gIHVuc2VhbGVkUGxhaW50ZXh0PzogU2VhbGVkU2VuZGVyRGVjcnlwdGlvblJlc3VsdDtcbn0+O1xuXG50eXBlIENhY2hlQWRkSXRlbVR5cGUgPSB7XG4gIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZTtcbiAgZGF0YTogVW5wcm9jZXNzZWRUeXBlO1xuICByZXF1ZXN0OiBQaWNrPEluY29taW5nV2ViU29ja2V0UmVxdWVzdCwgJ3Jlc3BvbmQnPjtcbn07XG5cbnR5cGUgTG9ja2VkU3RvcmVzID0ge1xuICByZWFkb25seSBzZW5kZXJLZXlTdG9yZTogU2VuZGVyS2V5cztcbiAgcmVhZG9ubHkgc2Vzc2lvblN0b3JlOiBTZXNzaW9ucztcbiAgcmVhZG9ubHkgaWRlbnRpdHlLZXlTdG9yZTogSWRlbnRpdHlLZXlzO1xuICByZWFkb25seSB6b25lPzogWm9uZTtcbn07XG5cbmVudW0gVGFza1R5cGUge1xuICBFbmNyeXB0ZWQgPSAnRW5jcnlwdGVkJyxcbiAgRGVjcnlwdGVkID0gJ0RlY3J5cHRlZCcsXG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VSZWNlaXZlck9wdGlvbnMgPSB7XG4gIHNlcnZlcjogV2ViQVBJVHlwZTtcbiAgc3RvcmFnZTogU3RvcmFnZTtcbiAgc2VydmVyVHJ1c3RSb290OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlUmVjZWl2ZXJcbiAgZXh0ZW5kcyBFdmVudFRhcmdldFxuICBpbXBsZW1lbnRzIElSZXF1ZXN0SGFuZGxlclxue1xuICBwcml2YXRlIHNlcnZlcjogV2ViQVBJVHlwZTtcblxuICBwcml2YXRlIHN0b3JhZ2U6IFN0b3JhZ2U7XG5cbiAgcHJpdmF0ZSBhcHBRdWV1ZTogUFF1ZXVlO1xuXG4gIHByaXZhdGUgZGVjcnlwdEFuZENhY2hlQmF0Y2hlcjogQmF0Y2hlclR5cGU8Q2FjaGVBZGRJdGVtVHlwZT47XG5cbiAgcHJpdmF0ZSBjYWNoZVJlbW92ZUJhdGNoZXI6IEJhdGNoZXJUeXBlPHN0cmluZz47XG5cbiAgcHJpdmF0ZSBjb3VudDogbnVtYmVyO1xuXG4gIHByaXZhdGUgcHJvY2Vzc2VkQ291bnQ6IG51bWJlcjtcblxuICBwcml2YXRlIGluY29taW5nUXVldWU6IFBRdWV1ZTtcblxuICBwcml2YXRlIGlzRW1wdGllZD86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBlbmNyeXB0ZWRRdWV1ZTogUFF1ZXVlO1xuXG4gIHByaXZhdGUgZGVjcnlwdGVkUXVldWU6IFBRdWV1ZTtcblxuICBwcml2YXRlIHJldHJ5Q2FjaGVkVGltZW91dDogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG5cbiAgcHJpdmF0ZSBzZXJ2ZXJUcnVzdFJvb3Q6IFVpbnQ4QXJyYXk7XG5cbiAgcHJpdmF0ZSBzdG9wcGluZ1Byb2Nlc3Npbmc/OiBib29sZWFuO1xuXG4gIHByaXZhdGUgcGVuZGluZ1BOSUlkZW50aXR5RXZlbnQ/OiBQTklJZGVudGl0eUV2ZW50O1xuXG4gIGNvbnN0cnVjdG9yKHsgc2VydmVyLCBzdG9yYWdlLCBzZXJ2ZXJUcnVzdFJvb3QgfTogTWVzc2FnZVJlY2VpdmVyT3B0aW9ucykge1xuICAgIHN1cGVyKCk7XG5cbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICB0aGlzLnN0b3JhZ2UgPSBzdG9yYWdlO1xuXG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5wcm9jZXNzZWRDb3VudCA9IDA7XG5cbiAgICBpZiAoIXNlcnZlclRydXN0Um9vdCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZXJ2ZXIgdHJ1c3Qgcm9vdCBpcyByZXF1aXJlZCEnKTtcbiAgICB9XG4gICAgdGhpcy5zZXJ2ZXJUcnVzdFJvb3QgPSBCeXRlcy5mcm9tQmFzZTY0KHNlcnZlclRydXN0Um9vdCk7XG5cbiAgICB0aGlzLmluY29taW5nUXVldWUgPSBuZXcgUFF1ZXVlKHtcbiAgICAgIGNvbmN1cnJlbmN5OiAxLFxuICAgICAgdGhyb3dPblRpbWVvdXQ6IHRydWUsXG4gICAgfSk7XG4gICAgdGhpcy5hcHBRdWV1ZSA9IG5ldyBQUXVldWUoe1xuICAgICAgY29uY3VycmVuY3k6IDEsXG4gICAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgICB9KTtcblxuICAgIC8vIEFsbCBlbnZlbG9wZXMgc3RhcnQgaW4gZW5jcnlwdGVkUXVldWUgYW5kIHByb2dyZXNzIHRvIGRlY3J5cHRlZFF1ZXVlXG4gICAgdGhpcy5lbmNyeXB0ZWRRdWV1ZSA9IG5ldyBQUXVldWUoe1xuICAgICAgY29uY3VycmVuY3k6IDEsXG4gICAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgICB9KTtcbiAgICB0aGlzLmRlY3J5cHRlZFF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gICAgICBjb25jdXJyZW5jeTogMSxcbiAgICAgIHRocm93T25UaW1lb3V0OiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdGhpcy5kZWNyeXB0QW5kQ2FjaGVCYXRjaGVyID0gY3JlYXRlQmF0Y2hlcjxDYWNoZUFkZEl0ZW1UeXBlPih7XG4gICAgICBuYW1lOiAnTWVzc2FnZVJlY2VpdmVyLmRlY3J5cHRBbmRDYWNoZUJhdGNoZXInLFxuICAgICAgd2FpdDogNzUsXG4gICAgICBtYXhTaXplOiAzMCxcbiAgICAgIHByb2Nlc3NCYXRjaDogKGl0ZW1zOiBBcnJheTxDYWNoZUFkZEl0ZW1UeXBlPikgPT4ge1xuICAgICAgICAvLyBOb3QgcmV0dXJuaW5nIHRoZSBwcm9taXNlIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIHN0YWxsXG4gICAgICAgIC8vIHRoZSBiYXRjaC5cbiAgICAgICAgdGhpcy5kZWNyeXB0QW5kQ2FjaGVCYXRjaChpdGVtcyk7XG4gICAgICB9LFxuICAgIH0pO1xuICAgIHRoaXMuY2FjaGVSZW1vdmVCYXRjaGVyID0gY3JlYXRlQmF0Y2hlcjxzdHJpbmc+KHtcbiAgICAgIG5hbWU6ICdNZXNzYWdlUmVjZWl2ZXIuY2FjaGVSZW1vdmVCYXRjaGVyJyxcbiAgICAgIHdhaXQ6IDc1LFxuICAgICAgbWF4U2l6ZTogMzAsXG4gICAgICBwcm9jZXNzQmF0Y2g6IHRoaXMuY2FjaGVSZW1vdmVCYXRjaC5iaW5kKHRoaXMpLFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGdldEFuZFJlc2V0UHJvY2Vzc2VkQ291bnQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBjb3VudCA9IHRoaXMucHJvY2Vzc2VkQ291bnQ7XG4gICAgdGhpcy5wcm9jZXNzZWRDb3VudCA9IDA7XG4gICAgcmV0dXJuIGNvdW50O1xuICB9XG5cbiAgcHVibGljIGhhbmRsZVJlcXVlc3QocmVxdWVzdDogSW5jb21pbmdXZWJTb2NrZXRSZXF1ZXN0KTogdm9pZCB7XG4gICAgLy8gV2UgZG8gdGhlIG1lc3NhZ2UgZGVjcnlwdGlvbiBoZXJlLCBpbnN0ZWFkIG9mIGluIHRoZSBvcmRlcmVkIHBlbmRpbmcgcXVldWUsXG4gICAgLy8gdG8gYXZvaWQgZXhwb3NpbmcgdGhlIHRpbWUgaXQgdG9vayB1cyB0byBwcm9jZXNzIG1lc3NhZ2VzIHRocm91Z2ggdGhlIHRpbWUtdG8tYWNrLlxuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXI6IGdvdCByZXF1ZXN0JywgcmVxdWVzdC52ZXJiLCByZXF1ZXN0LnBhdGgpO1xuICAgIGlmIChyZXF1ZXN0LnBhdGggIT09ICcvYXBpL3YxL21lc3NhZ2UnKSB7XG4gICAgICByZXF1ZXN0LnJlc3BvbmQoMjAwLCAnT0snKTtcblxuICAgICAgaWYgKHJlcXVlc3QudmVyYiA9PT0gJ1BVVCcgJiYgcmVxdWVzdC5wYXRoID09PSAnL2FwaS92MS9xdWV1ZS9lbXB0eScpIHtcbiAgICAgICAgdGhpcy5pbmNvbWluZ1F1ZXVlLmFkZChcbiAgICAgICAgICBjcmVhdGVUYXNrV2l0aFRpbWVvdXQoYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5vbkVtcHR5KCk7XG4gICAgICAgICAgfSwgJ2luY29taW5nUXVldWUvb25FbXB0eScpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgam9iID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaGVhZGVycyA9IHJlcXVlc3QuaGVhZGVycyB8fCBbXTtcblxuICAgICAgaWYgKCFyZXF1ZXN0LmJvZHkpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNZXNzYWdlUmVjZWl2ZXIuaGFuZGxlUmVxdWVzdDogcmVxdWVzdC5ib2R5IHdhcyBmYWxzZXkhJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwbGFpbnRleHQgPSByZXF1ZXN0LmJvZHk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGRlY29kZWQgPSBQcm90by5FbnZlbG9wZS5kZWNvZGUocGxhaW50ZXh0KTtcbiAgICAgICAgY29uc3Qgc2VydmVyVGltZXN0YW1wID0gZGVjb2RlZC5zZXJ2ZXJUaW1lc3RhbXA/LnRvTnVtYmVyKCk7XG5cbiAgICAgICAgY29uc3Qgb3VyVXVpZCA9IHRoaXMuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgICAgICAgY29uc3QgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlID0ge1xuICAgICAgICAgIC8vIE1ha2Ugbm9uLXByaXZhdGUgZW52ZWxvcGUgSURzIGRhc2hsZXNzIHNvIHRoZXkgZG9uJ3QgZ2V0IHJlZGFjdGVkXG4gICAgICAgICAgLy8gICBmcm9tIGxvZ3NcbiAgICAgICAgICBpZDogZ2V0R3VpZCgpLnJlcGxhY2UoLy0vZywgJycpLFxuICAgICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgICAgICByZWNlaXZlZEF0RGF0ZTogRGF0ZS5ub3coKSxcbiAgICAgICAgICAvLyBDYWxjdWxhdGUgdGhlIG1lc3NhZ2UgYWdlICh0aW1lIG9uIHNlcnZlcikuXG4gICAgICAgICAgbWVzc2FnZUFnZVNlYzogdGhpcy5jYWxjdWxhdGVNZXNzYWdlQWdlKGhlYWRlcnMsIHNlcnZlclRpbWVzdGFtcCksXG5cbiAgICAgICAgICAvLyBQcm90by5FbnZlbG9wZSBmaWVsZHNcbiAgICAgICAgICB0eXBlOiBkZWNvZGVkLnR5cGUsXG4gICAgICAgICAgc291cmNlOiBkZWNvZGVkLnNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VVdWlkOiBkZWNvZGVkLnNvdXJjZVV1aWRcbiAgICAgICAgICAgID8gbm9ybWFsaXplVXVpZChcbiAgICAgICAgICAgICAgICBkZWNvZGVkLnNvdXJjZVV1aWQsXG4gICAgICAgICAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5oYW5kbGVSZXF1ZXN0LnNvdXJjZVV1aWQnXG4gICAgICAgICAgICAgIClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgIHNvdXJjZURldmljZTogZGVjb2RlZC5zb3VyY2VEZXZpY2UsXG4gICAgICAgICAgZGVzdGluYXRpb25VdWlkOiBkZWNvZGVkLmRlc3RpbmF0aW9uVXVpZFxuICAgICAgICAgICAgPyBuZXcgVVVJRChcbiAgICAgICAgICAgICAgICBub3JtYWxpemVVdWlkKFxuICAgICAgICAgICAgICAgICAgZGVjb2RlZC5kZXN0aW5hdGlvblV1aWQsXG4gICAgICAgICAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVJlcXVlc3QuZGVzdGluYXRpb25VdWlkJ1xuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgOiBvdXJVdWlkLFxuICAgICAgICAgIHRpbWVzdGFtcDogZGVjb2RlZC50aW1lc3RhbXA/LnRvTnVtYmVyKCksXG4gICAgICAgICAgY29udGVudDogZHJvcE51bGwoZGVjb2RlZC5jb250ZW50KSxcbiAgICAgICAgICBzZXJ2ZXJHdWlkOiBkZWNvZGVkLnNlcnZlckd1aWQsXG4gICAgICAgICAgc2VydmVyVGltZXN0YW1wLFxuICAgICAgICB9O1xuXG4gICAgICAgIC8vIEFmdGVyIHRoaXMgcG9pbnQsIGRlY29kaW5nIGVycm9ycyBhcmUgbm90IHRoZSBzZXJ2ZXInc1xuICAgICAgICAvLyAgIGZhdWx0LCBhbmQgd2Ugc2hvdWxkIGhhbmRsZSB0aGVtIGdyYWNlZnVsbHkgYW5kIHRlbGwgdGhlXG4gICAgICAgIC8vICAgdXNlciB0aGV5IHJlY2VpdmVkIGFuIGludmFsaWQgbWVzc2FnZVxuXG4gICAgICAgIHRoaXMuZGVjcnlwdEFuZENhY2hlKGVudmVsb3BlLCBwbGFpbnRleHQsIHJlcXVlc3QpO1xuICAgICAgICB0aGlzLnByb2Nlc3NlZENvdW50ICs9IDE7XG4gICAgICB9IGNhdGNoIChlKSB7XG4gICAgICAgIHJlcXVlc3QucmVzcG9uZCg1MDAsICdCYWQgZW5jcnlwdGVkIHdlYnNvY2tldCBtZXNzYWdlJyk7XG4gICAgICAgIGxvZy5lcnJvcignRXJyb3IgaGFuZGxpbmcgaW5jb21pbmcgbWVzc2FnZTonLCBFcnJvcnMudG9Mb2dGb3JtYXQoZSkpO1xuICAgICAgICBhd2FpdCB0aGlzLmRpc3BhdGNoQW5kV2FpdChuZXcgRXJyb3JFdmVudChlKSk7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuaW5jb21pbmdRdWV1ZS5hZGQoXG4gICAgICBjcmVhdGVUYXNrV2l0aFRpbWVvdXQoam9iLCAnaW5jb21pbmdRdWV1ZS93ZWJzb2NrZXQnKVxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVzZXQoKTogdm9pZCB7XG4gICAgLy8gV2UgYWx3YXlzIHByb2Nlc3Mgb3VyIGNhY2hlIGJlZm9yZSBwcm9jZXNzaW5nIGEgbmV3IHdlYnNvY2tldCBtZXNzYWdlXG4gICAgdGhpcy5pbmNvbWluZ1F1ZXVlLmFkZChcbiAgICAgIGNyZWF0ZVRhc2tXaXRoVGltZW91dChcbiAgICAgICAgYXN5bmMgKCkgPT4gdGhpcy5xdWV1ZUFsbENhY2hlZCgpLFxuICAgICAgICAnaW5jb21pbmdRdWV1ZS9xdWV1ZUFsbENhY2hlZCdcbiAgICAgIClcbiAgICApO1xuXG4gICAgdGhpcy5jb3VudCA9IDA7XG4gICAgdGhpcy5pc0VtcHRpZWQgPSBmYWxzZTtcbiAgICB0aGlzLnN0b3BwaW5nUHJvY2Vzc2luZyA9IGZhbHNlO1xuICB9XG5cbiAgcHVibGljIHN0b3BQcm9jZXNzaW5nKCk6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXIuc3RvcFByb2Nlc3NpbmcnKTtcbiAgICB0aGlzLnN0b3BwaW5nUHJvY2Vzc2luZyA9IHRydWU7XG4gIH1cblxuICBwdWJsaWMgaGFzRW1wdGllZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbih0aGlzLmlzRW1wdGllZCk7XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgZHJhaW4oKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgd2FpdEZvckVuY3J5cHRlZFF1ZXVlID0gYXN5bmMgKCkgPT5cbiAgICAgIHRoaXMuYWRkVG9RdWV1ZShcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGxvZy5pbmZvKCdkcmFpbmVkJyk7XG4gICAgICAgIH0sXG4gICAgICAgICdkcmFpbi93YWl0Rm9yRGVjcnlwdGVkJyxcbiAgICAgICAgVGFza1R5cGUuRGVjcnlwdGVkXG4gICAgICApO1xuXG4gICAgY29uc3Qgd2FpdEZvckluY29taW5nUXVldWUgPSBhc3luYyAoKSA9PlxuICAgICAgdGhpcy5hZGRUb1F1ZXVlKFxuICAgICAgICB3YWl0Rm9yRW5jcnlwdGVkUXVldWUsXG4gICAgICAgICdkcmFpbi93YWl0Rm9yRW5jcnlwdGVkJyxcbiAgICAgICAgVGFza1R5cGUuRW5jcnlwdGVkXG4gICAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuaW5jb21pbmdRdWV1ZS5hZGQoXG4gICAgICBjcmVhdGVUYXNrV2l0aFRpbWVvdXQod2FpdEZvckluY29taW5nUXVldWUsICdkcmFpbi93YWl0Rm9ySW5jb21pbmcnKVxuICAgICk7XG4gIH1cblxuICAvL1xuICAvLyBFdmVudFRhcmdldCB0eXBlc1xuICAvL1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdlbXB0eScsXG4gICAgaGFuZGxlcjogKGV2OiBFbXB0eUV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3Byb2dyZXNzJyxcbiAgICBoYW5kbGVyOiAoZXY6IFByb2dyZXNzRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAndHlwaW5nJyxcbiAgICBoYW5kbGVyOiAoZXY6IFR5cGluZ0V2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ2Vycm9yJyxcbiAgICBoYW5kbGVyOiAoZXY6IEVycm9yRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAnZGVsaXZlcnknLFxuICAgIGhhbmRsZXI6IChldjogRGVsaXZlcnlFdmVudCkgPT4gdm9pZFxuICApOiB2b2lkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdkZWNyeXB0aW9uLWVycm9yJyxcbiAgICBoYW5kbGVyOiAoZXY6IERlY3J5cHRpb25FcnJvckV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3NlbnQnLFxuICAgIGhhbmRsZXI6IChldjogU2VudEV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3Byb2ZpbGVLZXlVcGRhdGUnLFxuICAgIGhhbmRsZXI6IChldjogUHJvZmlsZUtleVVwZGF0ZUV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ21lc3NhZ2UnLFxuICAgIGhhbmRsZXI6IChldjogTWVzc2FnZUV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3JldHJ5LXJlcXVlc3QnLFxuICAgIGhhbmRsZXI6IChldjogUmV0cnlSZXF1ZXN0RXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAncmVhZCcsXG4gICAgaGFuZGxlcjogKGV2OiBSZWFkRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAndmlldycsXG4gICAgaGFuZGxlcjogKGV2OiBWaWV3RXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAnY29uZmlndXJhdGlvbicsXG4gICAgaGFuZGxlcjogKGV2OiBDb25maWd1cmF0aW9uRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAndmlld09uY2VPcGVuU3luYycsXG4gICAgaGFuZGxlcjogKGV2OiBWaWV3T25jZU9wZW5TeW5jRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAnbWVzc2FnZVJlcXVlc3RSZXNwb25zZScsXG4gICAgaGFuZGxlcjogKGV2OiBNZXNzYWdlUmVxdWVzdFJlc3BvbnNlRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAnZmV0Y2hMYXRlc3QnLFxuICAgIGhhbmRsZXI6IChldjogRmV0Y2hMYXRlc3RFdmVudCkgPT4gdm9pZFxuICApOiB2b2lkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdrZXlzJyxcbiAgICBoYW5kbGVyOiAoZXY6IEtleXNFdmVudCkgPT4gdm9pZFxuICApOiB2b2lkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdwbmlJZGVudGl0eScsXG4gICAgaGFuZGxlcjogKGV2OiBQTklJZGVudGl0eUV2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3N0aWNrZXItcGFjaycsXG4gICAgaGFuZGxlcjogKGV2OiBTdGlja2VyUGFja0V2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ3JlYWRTeW5jJyxcbiAgICBoYW5kbGVyOiAoZXY6IFJlYWRTeW5jRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAndmlld1N5bmMnLFxuICAgIGhhbmRsZXI6IChldjogVmlld1N5bmNFdmVudCkgPT4gdm9pZFxuICApOiB2b2lkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdjb250YWN0JyxcbiAgICBoYW5kbGVyOiAoZXY6IENvbnRhY3RFdmVudCkgPT4gdm9pZFxuICApOiB2b2lkO1xuXG4gIHB1YmxpYyBvdmVycmlkZSBhZGRFdmVudExpc3RlbmVyKFxuICAgIG5hbWU6ICdjb250YWN0U3luYycsXG4gICAgaGFuZGxlcjogKGV2OiBDb250YWN0U3luY0V2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ2dyb3VwJyxcbiAgICBoYW5kbGVyOiAoZXY6IEdyb3VwRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihcbiAgICBuYW1lOiAnZ3JvdXBTeW5jJyxcbiAgICBoYW5kbGVyOiAoZXY6IEdyb3VwU3luY0V2ZW50KSA9PiB2b2lkXG4gICk6IHZvaWQ7XG5cbiAgcHVibGljIG92ZXJyaWRlIGFkZEV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogJ2VudmVsb3BlJyxcbiAgICBoYW5kbGVyOiAoZXY6IEVudmVsb3BlRXZlbnQpID0+IHZvaWRcbiAgKTogdm9pZDtcblxuICBwdWJsaWMgb3ZlcnJpZGUgYWRkRXZlbnRMaXN0ZW5lcihuYW1lOiBzdHJpbmcsIGhhbmRsZXI6IEV2ZW50SGFuZGxlcik6IHZvaWQge1xuICAgIHJldHVybiBzdXBlci5hZGRFdmVudExpc3RlbmVyKG5hbWUsIGhhbmRsZXIpO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbW92ZUV2ZW50TGlzdGVuZXIoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGhhbmRsZXI6IEV2ZW50SGFuZGxlclxuICApOiB2b2lkIHtcbiAgICByZXR1cm4gc3VwZXIucmVtb3ZlRXZlbnRMaXN0ZW5lcihuYW1lLCBoYW5kbGVyKTtcbiAgfVxuXG4gIC8vXG4gIC8vIFByaXZhdGVcbiAgLy9cblxuICBwcml2YXRlIGFzeW5jIGRpc3BhdGNoQW5kV2FpdChldmVudDogRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLmFwcFF1ZXVlLmFkZChcbiAgICAgIGNyZWF0ZVRhc2tXaXRoVGltZW91dChcbiAgICAgICAgYXN5bmMgKCkgPT4gUHJvbWlzZS5hbGwodGhpcy5kaXNwYXRjaEV2ZW50KGV2ZW50KSksXG4gICAgICAgICdkaXNwYXRjaEV2ZW50J1xuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGNhbGN1bGF0ZU1lc3NhZ2VBZ2UoXG4gICAgaGVhZGVyczogUmVhZG9ubHlBcnJheTxzdHJpbmc+LFxuICAgIHNlcnZlclRpbWVzdGFtcD86IG51bWJlclxuICApOiBudW1iZXIge1xuICAgIGxldCBtZXNzYWdlQWdlU2VjID0gMDsgLy8gRGVmYXVsdCB0byAwIGluIGNhc2Ugb2YgdW5yZWxpYWJsZSBwYXJhbWV0ZXJzLlxuXG4gICAgaWYgKHNlcnZlclRpbWVzdGFtcCkge1xuICAgICAgLy8gVGhlICdYLVNpZ25hbC1UaW1lc3RhbXAnIGlzIHVzdWFsbHkgdGhlIGxhc3QgaXRlbSwgc28gc3RhcnQgdGhlcmUuXG4gICAgICBsZXQgaXQgPSBoZWFkZXJzLmxlbmd0aDtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wbHVzcGx1c1xuICAgICAgd2hpbGUgKC0taXQgPj0gMCkge1xuICAgICAgICBjb25zdCBtYXRjaCA9IGhlYWRlcnNbaXRdLm1hdGNoKC9eWC1TaWduYWwtVGltZXN0YW1wOlxccyooXFxkKylcXHMqJC8pO1xuICAgICAgICBpZiAobWF0Y2ggJiYgbWF0Y2gubGVuZ3RoID09PSAyKSB7XG4gICAgICAgICAgY29uc3QgdGltZXN0YW1wID0gTnVtYmVyKG1hdGNoWzFdKTtcblxuICAgICAgICAgIC8vIE9uZSBmaW5hbCBzYW5pdHkgY2hlY2ssIHRoZSB0aW1lc3RhbXAgd2hlbiBhIG1lc3NhZ2UgaXMgcHVsbGVkIGZyb21cbiAgICAgICAgICAvLyB0aGUgc2VydmVyIHNob3VsZCBiZSBsYXRlciB0aGFuIHdoZW4gaXQgd2FzIHB1c2hlZC5cbiAgICAgICAgICBpZiAodGltZXN0YW1wID4gc2VydmVyVGltZXN0YW1wKSB7XG4gICAgICAgICAgICBtZXNzYWdlQWdlU2VjID0gTWF0aC5mbG9vcigodGltZXN0YW1wIC0gc2VydmVyVGltZXN0YW1wKSAvIDEwMDApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2VBZ2VTZWM7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGFkZFRvUXVldWU8VD4oXG4gICAgdGFzazogKCkgPT4gUHJvbWlzZTxUPixcbiAgICBpZDogc3RyaW5nLFxuICAgIHRhc2tUeXBlOiBUYXNrVHlwZVxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBpZiAodGFza1R5cGUgPT09IFRhc2tUeXBlLkVuY3J5cHRlZCkge1xuICAgICAgdGhpcy5jb3VudCArPSAxO1xuICAgIH1cblxuICAgIGNvbnN0IHF1ZXVlID1cbiAgICAgIHRhc2tUeXBlID09PSBUYXNrVHlwZS5FbmNyeXB0ZWRcbiAgICAgICAgPyB0aGlzLmVuY3J5cHRlZFF1ZXVlXG4gICAgICAgIDogdGhpcy5kZWNyeXB0ZWRRdWV1ZTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgcXVldWUuYWRkKGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCBpZCkpO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLnVwZGF0ZVByb2dyZXNzKHRoaXMuY291bnQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgb25FbXB0eSgpOiB2b2lkIHtcbiAgICBjb25zdCBlbWl0RW1wdHkgPSBhc3luYyAoKSA9PiB7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMuZGVjcnlwdEFuZENhY2hlQmF0Y2hlci5mbHVzaEFuZFdhaXQoKSxcbiAgICAgICAgdGhpcy5jYWNoZVJlbW92ZUJhdGNoZXIuZmx1c2hBbmRXYWl0KCksXG4gICAgICBdKTtcblxuICAgICAgbG9nLmluZm8oXCJNZXNzYWdlUmVjZWl2ZXI6IGVtaXR0aW5nICdlbXB0eScgZXZlbnRcIik7XG4gICAgICB0aGlzLmRpc3BhdGNoRXZlbnQobmV3IEVtcHR5RXZlbnQoKSk7XG4gICAgICB0aGlzLmlzRW1wdGllZCA9IHRydWU7XG5cbiAgICAgIHRoaXMubWF5YmVTY2hlZHVsZVJldHJ5VGltZW91dCgpO1xuXG4gICAgICAvLyBFbWl0IFBOSSBpZGVudGl0eSBldmVudCBhZnRlciBwcm9jZXNzaW5nIHRoZSBxdWV1ZVxuICAgICAgY29uc3QgeyBwZW5kaW5nUE5JSWRlbnRpdHlFdmVudCB9ID0gdGhpcztcbiAgICAgIHRoaXMucGVuZGluZ1BOSUlkZW50aXR5RXZlbnQgPSB1bmRlZmluZWQ7XG4gICAgICBpZiAocGVuZGluZ1BOSUlkZW50aXR5RXZlbnQpIHtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNwYXRjaEFuZFdhaXQocGVuZGluZ1BOSUlkZW50aXR5RXZlbnQpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBjb25zdCB3YWl0Rm9yRGVjcnlwdGVkUXVldWUgPSBhc3luYyAoKSA9PiB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgXCJNZXNzYWdlUmVjZWl2ZXI6IGZpbmlzaGVkIHByb2Nlc3NpbmcgbWVzc2FnZXMgYWZ0ZXIgJ2VtcHR5Jywgbm93IHdhaXRpbmcgZm9yIGFwcGxpY2F0aW9uXCJcbiAgICAgICk7XG5cbiAgICAgIC8vIFdlIGRvbid0IGF3YWl0IGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRoaXMgdG8gZ2F0ZSBmdXR1cmUgbWVzc2FnZSBwcm9jZXNzaW5nXG4gICAgICB0aGlzLmFwcFF1ZXVlLmFkZChjcmVhdGVUYXNrV2l0aFRpbWVvdXQoZW1pdEVtcHR5LCAnZW1pdEVtcHR5JykpO1xuICAgIH07XG5cbiAgICBjb25zdCB3YWl0Rm9yRW5jcnlwdGVkUXVldWUgPSBhc3luYyAoKSA9PiB7XG4gICAgICB0aGlzLmFkZFRvUXVldWUoXG4gICAgICAgIHdhaXRGb3JEZWNyeXB0ZWRRdWV1ZSxcbiAgICAgICAgJ29uRW1wdHkvd2FpdEZvckRlY3J5cHRlZCcsXG4gICAgICAgIFRhc2tUeXBlLkRlY3J5cHRlZFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2FpdEZvckluY29taW5nUXVldWUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBOb3RlOiB0aGlzLmNvdW50IGlzIHVzZWQgaW4gYWRkVG9RdWV1ZVxuICAgICAgLy8gUmVzZXR0aW5nIGNvdW50IHNvIGV2ZXJ5dGhpbmcgZnJvbSB0aGUgd2Vic29ja2V0IGFmdGVyIHRoaXMgc3RhcnRzIGF0IHplcm9cbiAgICAgIHRoaXMuY291bnQgPSAwO1xuXG4gICAgICB0aGlzLmFkZFRvUXVldWUoXG4gICAgICAgIHdhaXRGb3JFbmNyeXB0ZWRRdWV1ZSxcbiAgICAgICAgJ29uRW1wdHkvd2FpdEZvckVuY3J5cHRlZCcsXG4gICAgICAgIFRhc2tUeXBlLkVuY3J5cHRlZFxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgd2FpdEZvckNhY2hlQWRkQmF0Y2hlciA9IGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHRoaXMuZGVjcnlwdEFuZENhY2hlQmF0Y2hlci5vbklkbGUoKTtcbiAgICAgIHRoaXMuaW5jb21pbmdRdWV1ZS5hZGQoXG4gICAgICAgIGNyZWF0ZVRhc2tXaXRoVGltZW91dCh3YWl0Rm9ySW5jb21pbmdRdWV1ZSwgJ29uRW1wdHkvd2FpdEZvckluY29taW5nJylcbiAgICAgICk7XG4gICAgfTtcblxuICAgIHdhaXRGb3JDYWNoZUFkZEJhdGNoZXIoKTtcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlUHJvZ3Jlc3MoY291bnQ6IG51bWJlcik6IHZvaWQge1xuICAgIC8vIGNvdW50IGJ5IDEwc1xuICAgIGlmIChjb3VudCAlIDEwICE9PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgUHJvZ3Jlc3NFdmVudCh7IGNvdW50IH0pKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcXVldWVBbGxDYWNoZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgaXRlbXMgPSBhd2FpdCB0aGlzLmdldEFsbEZyb21DYWNoZSgpO1xuICAgIGNvbnN0IG1heCA9IGl0ZW1zLmxlbmd0aDtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSArPSAxKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgYXdhaXQgdGhpcy5xdWV1ZUNhY2hlZChpdGVtc1tpXSk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBxdWV1ZUNhY2hlZChpdGVtOiBVbnByb2Nlc3NlZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnTWVzc2FnZVJlY2VpdmVyLnF1ZXVlQ2FjaGVkJywgaXRlbS5pZCk7XG4gICAgdHJ5IHtcbiAgICAgIGxldCBlbnZlbG9wZVBsYWludGV4dDogVWludDhBcnJheTtcblxuICAgICAgaWYgKGl0ZW0uZW52ZWxvcGUgJiYgaXRlbS52ZXJzaW9uID09PSAyKSB7XG4gICAgICAgIGVudmVsb3BlUGxhaW50ZXh0ID0gQnl0ZXMuZnJvbUJhc2U2NChpdGVtLmVudmVsb3BlKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5lbnZlbG9wZSAmJiB0eXBlb2YgaXRlbS5lbnZlbG9wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZW52ZWxvcGVQbGFpbnRleHQgPSBCeXRlcy5mcm9tQmluYXJ5KGl0ZW0uZW52ZWxvcGUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNZXNzYWdlUmVjZWl2ZXIucXVldWVDYWNoZWQ6IGl0ZW0uZW52ZWxvcGUgd2FzIG1hbGZvcm1lZCdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGVjb2RlZCA9IFByb3RvLkVudmVsb3BlLmRlY29kZShlbnZlbG9wZVBsYWludGV4dCk7XG5cbiAgICAgIGNvbnN0IG91clV1aWQgPSB0aGlzLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgICBjb25zdCBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUgPSB7XG4gICAgICAgIGlkOiBpdGVtLmlkLFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogaXRlbS5yZWNlaXZlZEF0Q291bnRlciA/PyBpdGVtLnRpbWVzdGFtcCxcbiAgICAgICAgcmVjZWl2ZWRBdERhdGU6XG4gICAgICAgICAgaXRlbS5yZWNlaXZlZEF0Q291bnRlciA9PT0gbnVsbCA/IERhdGUubm93KCkgOiBpdGVtLnRpbWVzdGFtcCxcbiAgICAgICAgbWVzc2FnZUFnZVNlYzogaXRlbS5tZXNzYWdlQWdlU2VjIHx8IDAsXG5cbiAgICAgICAgLy8gUHJvdG8uRW52ZWxvcGUgZmllbGRzXG4gICAgICAgIHR5cGU6IGRlY29kZWQudHlwZSxcbiAgICAgICAgc291cmNlOiBkZWNvZGVkLnNvdXJjZSB8fCBpdGVtLnNvdXJjZSxcbiAgICAgICAgc291cmNlVXVpZDogZGVjb2RlZC5zb3VyY2VVdWlkIHx8IGl0ZW0uc291cmNlVXVpZCxcbiAgICAgICAgc291cmNlRGV2aWNlOiBkZWNvZGVkLnNvdXJjZURldmljZSB8fCBpdGVtLnNvdXJjZURldmljZSxcbiAgICAgICAgZGVzdGluYXRpb25VdWlkOiBuZXcgVVVJRChcbiAgICAgICAgICBkZWNvZGVkLmRlc3RpbmF0aW9uVXVpZCB8fCBpdGVtLmRlc3RpbmF0aW9uVXVpZCB8fCBvdXJVdWlkLnRvU3RyaW5nKClcbiAgICAgICAgKSxcbiAgICAgICAgdGltZXN0YW1wOiBkZWNvZGVkLnRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgICAgY29udGVudDogZHJvcE51bGwoZGVjb2RlZC5jb250ZW50KSxcbiAgICAgICAgc2VydmVyR3VpZDogZGVjb2RlZC5zZXJ2ZXJHdWlkLFxuICAgICAgICBzZXJ2ZXJUaW1lc3RhbXA6XG4gICAgICAgICAgaXRlbS5zZXJ2ZXJUaW1lc3RhbXAgfHwgZGVjb2RlZC5zZXJ2ZXJUaW1lc3RhbXA/LnRvTnVtYmVyKCksXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB7IGRlY3J5cHRlZCB9ID0gaXRlbTtcbiAgICAgIGlmIChkZWNyeXB0ZWQpIHtcbiAgICAgICAgbGV0IHBheWxvYWRQbGFpbnRleHQ6IFVpbnQ4QXJyYXk7XG5cbiAgICAgICAgaWYgKGl0ZW0udmVyc2lvbiA9PT0gMikge1xuICAgICAgICAgIHBheWxvYWRQbGFpbnRleHQgPSBCeXRlcy5mcm9tQmFzZTY0KGRlY3J5cHRlZCk7XG4gICAgICAgIH0gZWxzZSBpZiAodHlwZW9mIGRlY3J5cHRlZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBwYXlsb2FkUGxhaW50ZXh0ID0gQnl0ZXMuZnJvbUJpbmFyeShkZWNyeXB0ZWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignQ2FjaGVkIGRlY3J5cHRlZCB2YWx1ZSB3YXMgbm90IGEgc3RyaW5nIScpO1xuICAgICAgICB9XG5cbiAgICAgICAgLy8gTWFpbnRhaW4gaW52YXJpYW50OiBlbmNyeXB0ZWQgcXVldWUgPT4gZGVjcnlwdGVkIHF1ZXVlXG4gICAgICAgIHRoaXMuYWRkVG9RdWV1ZShcbiAgICAgICAgICBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnF1ZXVlRGVjcnlwdGVkRW52ZWxvcGUoZW52ZWxvcGUsIHBheWxvYWRQbGFpbnRleHQpO1xuICAgICAgICAgIH0sXG4gICAgICAgICAgJ3F1ZXVlRGVjcnlwdGVkRW52ZWxvcGUnLFxuICAgICAgICAgIFRhc2tUeXBlLkVuY3J5cHRlZFxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5xdWV1ZUNhY2hlZEVudmVsb3BlKGl0ZW0sIGVudmVsb3BlKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAncXVldWVDYWNoZWQgZXJyb3IgaGFuZGxpbmcgaXRlbScsXG4gICAgICAgIGl0ZW0uaWQsXG4gICAgICAgICdyZW1vdmluZyBpdC4gRXJyb3I6JyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgeyBpZCB9ID0gaXRlbTtcbiAgICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnByb3RvY29sLnJlbW92ZVVucHJvY2Vzc2VkKGlkKTtcbiAgICAgIH0gY2F0Y2ggKGRlbGV0ZUVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAncXVldWVDYWNoZWQgZXJyb3IgZGVsZXRpbmcgaXRlbScsXG4gICAgICAgICAgaXRlbS5pZCxcbiAgICAgICAgICAnRXJyb3I6JyxcbiAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZGVsZXRlRXJyb3IpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRFbnZlbG9wZUlkKGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSk6IHN0cmluZyB7XG4gICAgY29uc3QgeyB0aW1lc3RhbXAgfSA9IGVudmVsb3BlO1xuXG4gICAgbGV0IHByZWZpeCA9ICcnO1xuXG4gICAgaWYgKGVudmVsb3BlLnNvdXJjZVV1aWQgfHwgZW52ZWxvcGUuc291cmNlKSB7XG4gICAgICBjb25zdCBzZW5kZXIgPSBlbnZlbG9wZS5zb3VyY2VVdWlkIHx8IGVudmVsb3BlLnNvdXJjZTtcbiAgICAgIHByZWZpeCArPSBgJHtzZW5kZXJ9LiR7ZW52ZWxvcGUuc291cmNlRGV2aWNlfSBgO1xuICAgIH1cblxuICAgIHByZWZpeCArPSBgPiAke2VudmVsb3BlLmRlc3RpbmF0aW9uVXVpZC50b1N0cmluZygpfWA7XG5cbiAgICByZXR1cm4gYCR7cHJlZml4fSAke3RpbWVzdGFtcH0gKCR7ZW52ZWxvcGUuaWR9KWA7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyUmV0cnlUaW1lb3V0KCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMucmV0cnlDYWNoZWRUaW1lb3V0KTtcbiAgICB0aGlzLnJldHJ5Q2FjaGVkVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgbWF5YmVTY2hlZHVsZVJldHJ5VGltZW91dCgpOiB2b2lkIHtcbiAgICBpZiAodGhpcy5pc0VtcHRpZWQpIHtcbiAgICAgIHRoaXMuY2xlYXJSZXRyeVRpbWVvdXQoKTtcbiAgICAgIHRoaXMucmV0cnlDYWNoZWRUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHRoaXMuaW5jb21pbmdRdWV1ZS5hZGQoXG4gICAgICAgICAgY3JlYXRlVGFza1dpdGhUaW1lb3V0KFxuICAgICAgICAgICAgYXN5bmMgKCkgPT4gdGhpcy5xdWV1ZUFsbENhY2hlZCgpLFxuICAgICAgICAgICAgJ3F1ZXVlQWxsQ2FjaGVkJ1xuICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgIH0sIFJFVFJZX1RJTUVPVVQpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0QWxsRnJvbUNhY2hlKCk6IFByb21pc2U8QXJyYXk8VW5wcm9jZXNzZWRUeXBlPj4ge1xuICAgIGxvZy5pbmZvKCdnZXRBbGxGcm9tQ2FjaGUnKTtcbiAgICBjb25zdCBjb3VudCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5wcm90b2NvbC5nZXRVbnByb2Nlc3NlZENvdW50KCk7XG5cbiAgICBpZiAoY291bnQgPiAxNTAwKSB7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHJvdG9jb2wucmVtb3ZlQWxsVW5wcm9jZXNzZWQoKTtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgVGhlcmUgd2VyZSAke2NvdW50fSBtZXNzYWdlcyBpbiBjYWNoZS4gRGVsZXRlZCBhbGwgaW5zdGVhZCBvZiByZXByb2Nlc3NpbmdgXG4gICAgICApO1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IGl0ZW1zID1cbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wcm90b2NvbC5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG4gICAgbG9nLmluZm8oJ2dldEFsbEZyb21DYWNoZSBsb2FkZWQnLCBpdGVtcy5sZW5ndGgsICdzYXZlZCBlbnZlbG9wZXMnKTtcblxuICAgIHJldHVybiBpdGVtcztcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVjcnlwdEFuZENhY2hlQmF0Y2goXG4gICAgaXRlbXM6IEFycmF5PENhY2hlQWRkSXRlbVR5cGU+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXIuZGVjcnlwdEFuZENhY2hlQmF0Y2gnLCBpdGVtcy5sZW5ndGgpO1xuXG4gICAgY29uc3QgZGVjcnlwdGVkOiBBcnJheTxcbiAgICAgIFJlYWRvbmx5PHtcbiAgICAgICAgcGxhaW50ZXh0OiBVaW50OEFycmF5O1xuICAgICAgICBkYXRhOiBVbnByb2Nlc3NlZFR5cGU7XG4gICAgICAgIGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlO1xuICAgICAgfT5cbiAgICA+ID0gW107XG5cbiAgICBjb25zdCBzdG9yYWdlUHJvdG9jb2wgPSB0aGlzLnN0b3JhZ2UucHJvdG9jb2w7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgem9uZSA9IG5ldyBab25lKCdkZWNyeXB0QW5kQ2FjaGVCYXRjaCcsIHtcbiAgICAgICAgcGVuZGluZ1NlbmRlcktleXM6IHRydWUsXG4gICAgICAgIHBlbmRpbmdTZXNzaW9uczogdHJ1ZSxcbiAgICAgICAgcGVuZGluZ1VucHJvY2Vzc2VkOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHN0b3Jlc01hcCA9IG5ldyBNYXA8VVVJRFN0cmluZ1R5cGUsIExvY2tlZFN0b3Jlcz4oKTtcbiAgICAgIGNvbnN0IGZhaWxlZDogQXJyYXk8VW5wcm9jZXNzZWRUeXBlPiA9IFtdO1xuXG4gICAgICAvLyBCZWxvdyB3ZTpcbiAgICAgIC8vXG4gICAgICAvLyAxLiBFbnRlciB6b25lXG4gICAgICAvLyAyLiBEZWNyeXB0IGFsbCBiYXRjaGVkIGVudmVsb3Blc1xuICAgICAgLy8gMy4gUGVyc2lzdCBib3RoIGRlY3J5cHRlZCBlbnZlbG9wZXMgYW5kIGVudmVsb3BlcyB0aGF0IHdlIGZhaWxlZCB0b1xuICAgICAgLy8gICAgZGVjcnlwdCAoZm9yIGZ1dHVyZSByZXRyaWVzLCBzZWUgYGF0dGVtcHRzYCBmaWVsZClcbiAgICAgIC8vIDQuIExlYXZlIHpvbmUgYW5kIGNvbW1pdCBhbGwgcGVuZGluZyBzZXNzaW9ucyBhbmQgdW5wcm9jZXNzZWRzXG4gICAgICAvLyA1LiBBY2tub3dsZWRnZSBlbnZlbG9wZXMgKGNhbid0IGZhaWwpXG4gICAgICAvLyA2LiBGaW5hbGx5IHByb2Nlc3MgZGVjcnlwdGVkIGVudmVsb3Blc1xuICAgICAgYXdhaXQgc3RvcmFnZVByb3RvY29sLndpdGhab25lKHpvbmUsICdNZXNzYWdlUmVjZWl2ZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsPHZvaWQ+KFxuICAgICAgICAgIGl0ZW1zLm1hcChhc3luYyAoeyBkYXRhLCBlbnZlbG9wZSB9KSA9PiB7XG4gICAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgICBjb25zdCB7IGRlc3RpbmF0aW9uVXVpZCB9ID0gZW52ZWxvcGU7XG4gICAgICAgICAgICAgIGNvbnN0IHV1aWRLaW5kID1cbiAgICAgICAgICAgICAgICB0aGlzLnN0b3JhZ2UudXNlci5nZXRPdXJVdWlkS2luZChkZXN0aW5hdGlvblV1aWQpO1xuICAgICAgICAgICAgICBpZiAodXVpZEtpbmQgPT09IFVVSURLaW5kLlVua25vd24pIHtcbiAgICAgICAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgICAgICAgICdNZXNzYWdlUmVjZWl2ZXIuZGVjcnlwdEFuZENhY2hlQmF0Y2g6ICcgK1xuICAgICAgICAgICAgICAgICAgICBgUmVqZWN0aW5nIGVudmVsb3BlICR7dGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKX0sIGAgK1xuICAgICAgICAgICAgICAgICAgICBgdW5rbm93biB1dWlkOiAke2Rlc3RpbmF0aW9uVXVpZH1gXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBsZXQgc3RvcmVzID0gc3RvcmVzTWFwLmdldChkZXN0aW5hdGlvblV1aWQudG9TdHJpbmcoKSk7XG4gICAgICAgICAgICAgIGlmICghc3RvcmVzKSB7XG4gICAgICAgICAgICAgICAgc3RvcmVzID0ge1xuICAgICAgICAgICAgICAgICAgc2VuZGVyS2V5U3RvcmU6IG5ldyBTZW5kZXJLZXlzKHtcbiAgICAgICAgICAgICAgICAgICAgb3VyVXVpZDogZGVzdGluYXRpb25VdWlkLFxuICAgICAgICAgICAgICAgICAgICB6b25lLFxuICAgICAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmU6IG5ldyBTZXNzaW9ucyh7XG4gICAgICAgICAgICAgICAgICAgIHpvbmUsXG4gICAgICAgICAgICAgICAgICAgIG91clV1aWQ6IGRlc3RpbmF0aW9uVXVpZCxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgaWRlbnRpdHlLZXlTdG9yZTogbmV3IElkZW50aXR5S2V5cyh7XG4gICAgICAgICAgICAgICAgICAgIHpvbmUsXG4gICAgICAgICAgICAgICAgICAgIG91clV1aWQ6IGRlc3RpbmF0aW9uVXVpZCxcbiAgICAgICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgICAgICAgem9uZSxcbiAgICAgICAgICAgICAgICB9O1xuICAgICAgICAgICAgICAgIHN0b3Jlc01hcC5zZXQoZGVzdGluYXRpb25VdWlkLnRvU3RyaW5nKCksIHN0b3Jlcyk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnF1ZXVlRW5jcnlwdGVkRW52ZWxvcGUoXG4gICAgICAgICAgICAgICAgc3RvcmVzLFxuICAgICAgICAgICAgICAgIGVudmVsb3BlLFxuICAgICAgICAgICAgICAgIHV1aWRLaW5kXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmIChyZXN1bHQucGxhaW50ZXh0KSB7XG4gICAgICAgICAgICAgICAgZGVjcnlwdGVkLnB1c2goe1xuICAgICAgICAgICAgICAgICAgcGxhaW50ZXh0OiByZXN1bHQucGxhaW50ZXh0LFxuICAgICAgICAgICAgICAgICAgZW52ZWxvcGU6IHJlc3VsdC5lbnZlbG9wZSxcbiAgICAgICAgICAgICAgICAgIGRhdGEsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGZhaWxlZC5wdXNoKGRhdGEpO1xuICAgICAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0QW5kQ2FjaGVCYXRjaCBlcnJvciB3aGVuICcgK1xuICAgICAgICAgICAgICAgICAgJ3Byb2Nlc3NpbmcgdGhlIGVudmVsb3BlJyxcbiAgICAgICAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmRlY3J5cHRBbmRDYWNoZUJhdGNoIHN0b3JpbmcgJyArXG4gICAgICAgICAgICBgJHtkZWNyeXB0ZWQubGVuZ3RofSBkZWNyeXB0ZWQgZW52ZWxvcGVzLCBrZWVwaW5nIGAgK1xuICAgICAgICAgICAgYCR7ZmFpbGVkLmxlbmd0aH0gZmFpbGVkIGVudmVsb3Blcy5gXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gU3RvcmUgYm90aCBkZWNyeXB0ZWQgYW5kIGZhaWxlZCB1bnByb2Nlc3NlZCBlbnZlbG9wZXNcbiAgICAgICAgY29uc3QgdW5wcm9jZXNzZWRzOiBBcnJheTxVbnByb2Nlc3NlZFR5cGU+ID0gZGVjcnlwdGVkLm1hcChcbiAgICAgICAgICAoeyBlbnZlbG9wZSwgZGF0YSwgcGxhaW50ZXh0IH0pID0+IHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIC4uLmRhdGEsXG5cbiAgICAgICAgICAgICAgc291cmNlOiBlbnZlbG9wZS5zb3VyY2UsXG4gICAgICAgICAgICAgIHNvdXJjZVV1aWQ6IGVudmVsb3BlLnNvdXJjZVV1aWQsXG4gICAgICAgICAgICAgIHNvdXJjZURldmljZTogZW52ZWxvcGUuc291cmNlRGV2aWNlLFxuICAgICAgICAgICAgICBkZXN0aW5hdGlvblV1aWQ6IGVudmVsb3BlLmRlc3RpbmF0aW9uVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBzZXJ2ZXJHdWlkOiBlbnZlbG9wZS5zZXJ2ZXJHdWlkLFxuICAgICAgICAgICAgICBzZXJ2ZXJUaW1lc3RhbXA6IGVudmVsb3BlLnNlcnZlclRpbWVzdGFtcCxcbiAgICAgICAgICAgICAgZGVjcnlwdGVkOiBCeXRlcy50b0Jhc2U2NChwbGFpbnRleHQpLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgc3RvcmFnZVByb3RvY29sLmFkZE11bHRpcGxlVW5wcm9jZXNzZWQoXG4gICAgICAgICAgdW5wcm9jZXNzZWRzLmNvbmNhdChmYWlsZWQpLFxuICAgICAgICAgIHsgem9uZSB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgbG9nLmluZm8oJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0QW5kQ2FjaGVCYXRjaCBhY2tub3dsZWRnaW5nIHJlY2VpcHQnKTtcblxuICAgICAgLy8gQWNrbm93bGVkZ2UgYWxsIGVudmVsb3Blc1xuICAgICAgZm9yIChjb25zdCB7IHJlcXVlc3QgfSBvZiBpdGVtcykge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIHJlcXVlc3QucmVzcG9uZCgyMDAsICdPSycpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdkZWNyeXB0QW5kQ2FjaGVCYXRjaDogRmFpbGVkIHRvIHNlbmQgMjAwIHRvIHNlcnZlcjsgc3RpbGwgcXVldWluZyBlbnZlbG9wZSdcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ2RlY3J5cHRBbmRDYWNoZSBlcnJvciB0cnlpbmcgdG8gYWRkIG1lc3NhZ2VzIHRvIGNhY2hlOicsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG5cbiAgICAgIGl0ZW1zLmZvckVhY2goaXRlbSA9PiB7XG4gICAgICAgIGl0ZW0ucmVxdWVzdC5yZXNwb25kKDUwMCwgJ0ZhaWxlZCB0byBjYWNoZSBtZXNzYWdlJyk7XG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGRlY3J5cHRlZC5tYXAoYXN5bmMgKHsgZW52ZWxvcGUsIHBsYWludGV4dCB9KSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdGhpcy5xdWV1ZURlY3J5cHRlZEVudmVsb3BlKGVudmVsb3BlLCBwbGFpbnRleHQpO1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdkZWNyeXB0QW5kQ2FjaGUgZXJyb3Igd2hlbiBwcm9jZXNzaW5nIGRlY3J5cHRlZCBlbnZlbG9wZScsXG4gICAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuXG4gICAgbG9nLmluZm8oJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0QW5kQ2FjaGVCYXRjaCBmdWxseSBwcm9jZXNzZWQnKTtcblxuICAgIHRoaXMubWF5YmVTY2hlZHVsZVJldHJ5VGltZW91dCgpO1xuICB9XG5cbiAgcHJpdmF0ZSBkZWNyeXB0QW5kQ2FjaGUoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIHBsYWludGV4dDogVWludDhBcnJheSxcbiAgICByZXF1ZXN0OiBJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3RcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBpZCB9ID0gZW52ZWxvcGU7XG4gICAgY29uc3QgZGF0YTogVW5wcm9jZXNzZWRUeXBlID0ge1xuICAgICAgaWQsXG4gICAgICB2ZXJzaW9uOiAyLFxuICAgICAgZW52ZWxvcGU6IEJ5dGVzLnRvQmFzZTY0KHBsYWludGV4dCksXG4gICAgICByZWNlaXZlZEF0Q291bnRlcjogZW52ZWxvcGUucmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICB0aW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgIGF0dGVtcHRzOiAxLFxuICAgICAgbWVzc2FnZUFnZVNlYzogZW52ZWxvcGUubWVzc2FnZUFnZVNlYyxcbiAgICB9O1xuICAgIHRoaXMuZGVjcnlwdEFuZENhY2hlQmF0Y2hlci5hZGQoe1xuICAgICAgcmVxdWVzdCxcbiAgICAgIGVudmVsb3BlLFxuICAgICAgZGF0YSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2FjaGVSZW1vdmVCYXRjaChpdGVtczogQXJyYXk8c3RyaW5nPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVVbnByb2Nlc3NlZChpdGVtcyk7XG4gIH1cblxuICBwcml2YXRlIHJlbW92ZUZyb21DYWNoZShlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUpOiB2b2lkIHtcbiAgICBjb25zdCB7IGlkIH0gPSBlbnZlbG9wZTtcbiAgICB0aGlzLmNhY2hlUmVtb3ZlQmF0Y2hlci5hZGQoaWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBxdWV1ZURlY3J5cHRlZEVudmVsb3BlKFxuICAgIGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlLFxuICAgIHBsYWludGV4dDogVWludDhBcnJheVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG4gICAgbG9nLmluZm8oJ3F1ZXVlaW5nIGRlY3J5cHRlZCBlbnZlbG9wZScsIGlkKTtcblxuICAgIGNvbnN0IHRhc2sgPSB0aGlzLmhhbmRsZURlY3J5cHRlZEVudmVsb3BlLmJpbmQodGhpcywgZW52ZWxvcGUsIHBsYWludGV4dCk7XG4gICAgY29uc3QgdGFza1dpdGhUaW1lb3V0ID0gY3JlYXRlVGFza1dpdGhUaW1lb3V0KFxuICAgICAgdGFzayxcbiAgICAgIGBxdWV1ZURlY3J5cHRlZEVudmVsb3BlICR7aWR9YFxuICAgICk7XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5hZGRUb1F1ZXVlKFxuICAgICAgICB0YXNrV2l0aFRpbWVvdXQsXG4gICAgICAgICdkaXNwYXRjaEV2ZW50JyxcbiAgICAgICAgVGFza1R5cGUuRGVjcnlwdGVkXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBxdWV1ZURlY3J5cHRlZEVudmVsb3BlIGVycm9yIGhhbmRsaW5nIGVudmVsb3BlICR7aWR9OmAsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBxdWV1ZUVuY3J5cHRlZEVudmVsb3BlKFxuICAgIHN0b3JlczogTG9ja2VkU3RvcmVzLFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICB1dWlkS2luZDogVVVJREtpbmRcbiAgKTogUHJvbWlzZTxEZWNyeXB0UmVzdWx0PiB7XG4gICAgbGV0IGxvZ0lkID0gdGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKTtcbiAgICBsb2cuaW5mbyhgcXVldWVpbmcgJHt1dWlkS2luZH0gZW52ZWxvcGVgLCBsb2dJZCk7XG5cbiAgICBjb25zdCB0YXNrID0gYXN5bmMgKCk6IFByb21pc2U8RGVjcnlwdFJlc3VsdD4gPT4ge1xuICAgICAgY29uc3QgdW5zZWFsZWRFbnZlbG9wZSA9IGF3YWl0IHRoaXMudW5zZWFsRW52ZWxvcGUoXG4gICAgICAgIHN0b3JlcyxcbiAgICAgICAgZW52ZWxvcGUsXG4gICAgICAgIHV1aWRLaW5kXG4gICAgICApO1xuXG4gICAgICAvLyBEcm9wcGVkIGVhcmx5XG4gICAgICBpZiAoIXVuc2VhbGVkRW52ZWxvcGUpIHtcbiAgICAgICAgcmV0dXJuIHsgcGxhaW50ZXh0OiB1bmRlZmluZWQsIGVudmVsb3BlIH07XG4gICAgICB9XG5cbiAgICAgIGxvZ0lkID0gdGhpcy5nZXRFbnZlbG9wZUlkKHVuc2VhbGVkRW52ZWxvcGUpO1xuXG4gICAgICB0aGlzLmFkZFRvUXVldWUoXG4gICAgICAgIGFzeW5jICgpID0+IHRoaXMuZGlzcGF0Y2hFdmVudChuZXcgRW52ZWxvcGVFdmVudCh1bnNlYWxlZEVudmVsb3BlKSksXG4gICAgICAgICdkaXNwYXRjaEV2ZW50JyxcbiAgICAgICAgVGFza1R5cGUuRGVjcnlwdGVkXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gdGhpcy5kZWNyeXB0RW52ZWxvcGUoc3RvcmVzLCB1bnNlYWxlZEVudmVsb3BlLCB1dWlkS2luZCk7XG4gICAgfTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5hZGRUb1F1ZXVlKFxuICAgICAgICB0YXNrLFxuICAgICAgICBgTWVzc2FnZVJlY2VpdmVyOiB1bnNlYWwgYW5kIGRlY3J5cHQgJHtsb2dJZH1gLFxuICAgICAgICBUYXNrVHlwZS5FbmNyeXB0ZWRcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGFyZ3MgPSBbXG4gICAgICAgICdxdWV1ZUVuY3J5cHRlZEVudmVsb3BlIGVycm9yIGhhbmRsaW5nIGVudmVsb3BlJyxcbiAgICAgICAgbG9nSWQsXG4gICAgICAgICc6JyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKSxcbiAgICAgIF07XG4gICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBXYXJuT25seUVycm9yKSB7XG4gICAgICAgIGxvZy53YXJuKC4uLmFyZ3MpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmVycm9yKC4uLmFyZ3MpO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBxdWV1ZUNhY2hlZEVudmVsb3BlKFxuICAgIGRhdGE6IFVucHJvY2Vzc2VkVHlwZSxcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGVcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5kZWNyeXB0QW5kQ2FjaGVCYXRjaGVyLmFkZCh7XG4gICAgICByZXF1ZXN0OiB7XG4gICAgICAgIHJlc3BvbmQoY29kZSwgc3RhdHVzKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAncXVldWVDYWNoZWRFbnZlbG9wZTogZmFrZSByZXNwb25zZSAnICtcbiAgICAgICAgICAgICAgYHdpdGggY29kZSAke2NvZGV9IGFuZCBzdGF0dXMgJHtzdGF0dXN9YFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZW52ZWxvcGUsXG4gICAgICBkYXRhLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gQ2FsbGVkIGFmdGVyIGBkZWNyeXB0RW52ZWxvcGVgIGRlY3J5cHRlZCB0aGUgbWVzc2FnZS5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVEZWNyeXB0ZWRFbnZlbG9wZShcbiAgICBlbnZlbG9wZTogVW5zZWFsZWRFbnZlbG9wZSxcbiAgICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKHRoaXMuc3RvcHBpbmdQcm9jZXNzaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGVudmVsb3BlLmNvbnRlbnQpIHtcbiAgICAgIGF3YWl0IHRoaXMuaW5uZXJIYW5kbGVDb250ZW50TWVzc2FnZShlbnZlbG9wZSwgcGxhaW50ZXh0KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY2VpdmVkIG1lc3NhZ2Ugd2l0aCBubyBjb250ZW50Jyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHVuc2VhbEVudmVsb3BlKFxuICAgIHN0b3JlczogTG9ja2VkU3RvcmVzLFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICB1dWlkS2luZDogVVVJREtpbmRcbiAgKTogUHJvbWlzZTxVbnNlYWxlZEVudmVsb3BlIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgbG9nSWQgPSB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpO1xuXG4gICAgaWYgKHRoaXMuc3RvcHBpbmdQcm9jZXNzaW5nKSB7XG4gICAgICBsb2cud2FybihgTWVzc2FnZVJlY2VpdmVyLnVuc2VhbEVudmVsb3BlKCR7bG9nSWR9KTogZHJvcHBpbmdgKTtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VhbGVkIGVudmVsb3BlIGRyb3BwZWQgZHVlIHRvIHN0b3BwaW5nIHByb2Nlc3NpbmcnKTtcbiAgICB9XG5cbiAgICBpZiAoZW52ZWxvcGUudHlwZSAhPT0gUHJvdG8uRW52ZWxvcGUuVHlwZS5VTklERU5USUZJRURfU0VOREVSKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5lbnZlbG9wZSxcbiAgICAgICAgY2lwaGVyVGV4dEJ5dGVzOiBlbnZlbG9wZS5jb250ZW50LFxuICAgICAgICBjaXBoZXJUZXh0VHlwZTogZW52ZWxvcGVUeXBlVG9DaXBoZXJ0ZXh0VHlwZShlbnZlbG9wZS50eXBlKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKHV1aWRLaW5kID09PSBVVUlES2luZC5QTkkpIHtcbiAgICAgIGxvZy53YXJuKGBNZXNzYWdlUmVjZWl2ZXIudW5zZWFsRW52ZWxvcGUoJHtsb2dJZH0pOiBkcm9wcGluZyBmb3IgUE5JYCk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0cmljdEFzc2VydCh1dWlkS2luZCA9PT0gVVVJREtpbmQuQUNJLCAnU2VhbGVkIG5vbi1BQ0kgZW52ZWxvcGUnKTtcblxuICAgIGNvbnN0IGNpcGhlcnRleHQgPSBlbnZlbG9wZS5jb250ZW50O1xuICAgIGlmICghY2lwaGVydGV4dCkge1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCBtZXNzYWdlIHdpdGggbm8gY29udGVudCcpO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKGBNZXNzYWdlUmVjZWl2ZXIudW5zZWFsRW52ZWxvcGUoJHtsb2dJZH0pOiB1bmlkZW50aWZpZWQgbWVzc2FnZWApO1xuICAgIGNvbnN0IG1lc3NhZ2VDb250ZW50ID0gYXdhaXQgc2VhbGVkU2VuZGVyRGVjcnlwdFRvVXNtYyhcbiAgICAgIEJ1ZmZlci5mcm9tKGNpcGhlcnRleHQpLFxuICAgICAgc3RvcmVzLmlkZW50aXR5S2V5U3RvcmVcbiAgICApO1xuXG4gICAgLy8gSGVyZSB3ZSB0YWtlIHRoaXMgc2VuZGVyIGluZm9ybWF0aW9uIGFuZCBhdHRhY2ggaXQgYmFjayB0byB0aGUgZW52ZWxvcGVcbiAgICAvLyAgIHRvIG1ha2UgdGhlIHJlc3Qgb2YgdGhlIGFwcCB3b3JrIHByb3Blcmx5LlxuICAgIGNvbnN0IGNlcnRpZmljYXRlID0gbWVzc2FnZUNvbnRlbnQuc2VuZGVyQ2VydGlmaWNhdGUoKTtcblxuICAgIGNvbnN0IG9yaWdpbmFsU291cmNlID0gZW52ZWxvcGUuc291cmNlO1xuICAgIGNvbnN0IG9yaWdpbmFsU291cmNlVXVpZCA9IGVudmVsb3BlLnNvdXJjZVV1aWQ7XG5cbiAgICBjb25zdCBuZXdFbnZlbG9wZTogVW5zZWFsZWRFbnZlbG9wZSA9IHtcbiAgICAgIC4uLmVudmVsb3BlLFxuXG4gICAgICBjaXBoZXJUZXh0Qnl0ZXM6IG1lc3NhZ2VDb250ZW50LmNvbnRlbnRzKCksXG4gICAgICBjaXBoZXJUZXh0VHlwZTogbWVzc2FnZUNvbnRlbnQubXNnVHlwZSgpLFxuXG4gICAgICAvLyBPdmVyd3JpdGUgRW52ZWxvcGUgZmllbGRzXG4gICAgICBzb3VyY2U6IGRyb3BOdWxsKGNlcnRpZmljYXRlLnNlbmRlckUxNjQoKSksXG4gICAgICBzb3VyY2VVdWlkOiBub3JtYWxpemVVdWlkKFxuICAgICAgICBjZXJ0aWZpY2F0ZS5zZW5kZXJVdWlkKCksXG4gICAgICAgICdNZXNzYWdlUmVjZWl2ZXIudW5zZWFsRW52ZWxvcGUuVU5JREVOVElGSUVEX1NFTkRFUi5zb3VyY2VVdWlkJ1xuICAgICAgKSxcbiAgICAgIHNvdXJjZURldmljZTogY2VydGlmaWNhdGUuc2VuZGVyRGV2aWNlSWQoKSxcblxuICAgICAgLy8gVW5zZWFsZWRFbnZlbG9wZS1vbmx5IGZpZWxkc1xuICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcnlSZWNlaXZlZDogIShvcmlnaW5hbFNvdXJjZSB8fCBvcmlnaW5hbFNvdXJjZVV1aWQpLFxuICAgICAgY29udGVudEhpbnQ6IG1lc3NhZ2VDb250ZW50LmNvbnRlbnRIaW50KCksXG4gICAgICBncm91cElkOiBtZXNzYWdlQ29udGVudC5ncm91cElkKCk/LnRvU3RyaW5nKCdiYXNlNjQnKSxcbiAgICAgIGNlcnRpZmljYXRlLFxuICAgICAgdW5zZWFsZWRDb250ZW50OiBtZXNzYWdlQ29udGVudCxcbiAgICB9O1xuXG4gICAgLy8gVGhpcyB3aWxsIHRocm93IGlmIHRoZXJlJ3MgYSBwcm9ibGVtXG4gICAgdGhpcy52YWxpZGF0ZVVuc2VhbGVkRW52ZWxvcGUobmV3RW52ZWxvcGUpO1xuXG4gICAgcmV0dXJuIG5ld0VudmVsb3BlO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBkZWNyeXB0RW52ZWxvcGUoXG4gICAgc3RvcmVzOiBMb2NrZWRTdG9yZXMsXG4gICAgZW52ZWxvcGU6IFVuc2VhbGVkRW52ZWxvcGUsXG4gICAgdXVpZEtpbmQ6IFVVSURLaW5kXG4gICk6IFByb21pc2U8RGVjcnlwdFJlc3VsdD4ge1xuICAgIGNvbnN0IGxvZ0lkID0gdGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKTtcblxuICAgIGlmICh0aGlzLnN0b3BwaW5nUHJvY2Vzc2luZykge1xuICAgICAgbG9nLndhcm4oYE1lc3NhZ2VSZWNlaXZlci5kZWNyeXB0RW52ZWxvcGUoJHtsb2dJZH0pOiBkcm9wcGluZyB1bnNlYWxlZGApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdVbnNlYWxlZCBlbnZlbG9wZSBkcm9wcGVkIGR1ZSB0byBzdG9wcGluZyBwcm9jZXNzaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKGVudmVsb3BlLnR5cGUgPT09IFByb3RvLkVudmVsb3BlLlR5cGUuUkVDRUlQVCkge1xuICAgICAgYXdhaXQgdGhpcy5vbkRlbGl2ZXJ5UmVjZWlwdChlbnZlbG9wZSk7XG4gICAgICByZXR1cm4geyBwbGFpbnRleHQ6IHVuZGVmaW5lZCwgZW52ZWxvcGUgfTtcbiAgICB9XG5cbiAgICBsZXQgY2lwaGVydGV4dDogVWludDhBcnJheTtcbiAgICBpZiAoZW52ZWxvcGUuY29udGVudCkge1xuICAgICAgY2lwaGVydGV4dCA9IGVudmVsb3BlLmNvbnRlbnQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgICdDb250ZW50bGVzcyBlbnZlbG9wZSBzaG91bGQgYmUgaGFuZGxlZCBieSB1bnNlYWxFbnZlbG9wZSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYE1lc3NhZ2VSZWNlaXZlci5kZWNyeXB0RW52ZWxvcGUoJHtsb2dJZH0pYCk7XG4gICAgY29uc3QgcGxhaW50ZXh0ID0gYXdhaXQgdGhpcy5kZWNyeXB0KFxuICAgICAgc3RvcmVzLFxuICAgICAgZW52ZWxvcGUsXG4gICAgICBjaXBoZXJ0ZXh0LFxuICAgICAgdXVpZEtpbmRcbiAgICApO1xuXG4gICAgaWYgKCFwbGFpbnRleHQpIHtcbiAgICAgIGxvZy53YXJuKCdNZXNzYWdlUmVjZWl2ZXIuZGVjcnlwdEVudmVsb3BlOiBwbGFpbnRleHQgd2FzIGZhbHNleScpO1xuICAgICAgcmV0dXJuIHsgcGxhaW50ZXh0LCBlbnZlbG9wZSB9O1xuICAgIH1cblxuICAgIC8vIE5vdGU6IHdlIG5lZWQgdG8gcHJvY2VzcyB0aGlzIGFzIHBhcnQgb2YgZGVjcnlwdGlvbiwgYmVjYXVzZSB3ZSBtaWdodCBuZWVkIHRoaXNcbiAgICAvLyAgIHNlbmRlciBrZXkgdG8gZGVjcnlwdCB0aGUgbmV4dCBtZXNzYWdlIGluIHRoZSBxdWV1ZSFcbiAgICBsZXQgaXNHcm91cFYyID0gZmFsc2U7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udGVudCA9IFByb3RvLkNvbnRlbnQuZGVjb2RlKHBsYWludGV4dCk7XG5cbiAgICAgIGlzR3JvdXBWMiA9IEJvb2xlYW4oY29udGVudC5kYXRhTWVzc2FnZT8uZ3JvdXBWMik7XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29udGVudC5zZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlICYmXG4gICAgICAgIEJ5dGVzLmlzTm90RW1wdHkoY29udGVudC5zZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlKVxuICAgICAgKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZShcbiAgICAgICAgICBzdG9yZXMsXG4gICAgICAgICAgZW52ZWxvcGUsXG4gICAgICAgICAgY29udGVudC5zZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0RW52ZWxvcGU6IEZhaWxlZCB0byBwcm9jZXNzIHNlbmRlciAnICtcbiAgICAgICAgICBga2V5IGRpc3RyaWJ1dGlvbiBtZXNzYWdlOiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBXZSB3YW50IHRvIHByb2Nlc3MgR3JvdXBWMiB1cGRhdGVzLCBldmVuIGZyb20gYmxvY2tlZCB1c2Vycy4gV2UnbGwgZHJvcCB0aGVtIGxhdGVyLlxuICAgIGlmIChcbiAgICAgICFpc0dyb3VwVjIgJiZcbiAgICAgICgoZW52ZWxvcGUuc291cmNlICYmIHRoaXMuaXNCbG9ja2VkKGVudmVsb3BlLnNvdXJjZSkpIHx8XG4gICAgICAgIChlbnZlbG9wZS5zb3VyY2VVdWlkICYmIHRoaXMuaXNVdWlkQmxvY2tlZChlbnZlbG9wZS5zb3VyY2VVdWlkKSkpXG4gICAgKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0RW52ZWxvcGU6IERyb3BwaW5nIG5vbi1HVjIgbWVzc2FnZSBmcm9tIGJsb2NrZWQgc2VuZGVyJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiB7IHBsYWludGV4dDogdW5kZWZpbmVkLCBlbnZlbG9wZSB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IHBsYWludGV4dCwgZW52ZWxvcGUgfTtcbiAgfVxuXG4gIHByaXZhdGUgdmFsaWRhdGVVbnNlYWxlZEVudmVsb3BlKGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlKTogdm9pZCB7XG4gICAgY29uc3QgeyB1bnNlYWxlZENvbnRlbnQ6IG1lc3NhZ2VDb250ZW50LCBjZXJ0aWZpY2F0ZSB9ID0gZW52ZWxvcGU7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgbWVzc2FnZUNvbnRlbnQgIT09IHVuZGVmaW5lZCxcbiAgICAgICdNaXNzaW5nIG1lc3NhZ2UgY29udGVudCBmb3Igc2VhbGVkIHNlbmRlciBtZXNzYWdlJ1xuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgY2VydGlmaWNhdGUgIT09IHVuZGVmaW5lZCxcbiAgICAgICdNaXNzaW5nIHNlbmRlciBjZXJ0aWZpY2F0ZSBmb3Igc2VhbGVkIHNlbmRlciBtZXNzYWdlJ1xuICAgICk7XG5cbiAgICBpZiAoIWVudmVsb3BlLnNlcnZlclRpbWVzdGFtcCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmRlY3J5cHRTZWFsZWRTZW5kZXI6ICcgK1xuICAgICAgICAgICdTZWFsZWQgc2VuZGVyIG1lc3NhZ2Ugd2FzIG1pc3Npbmcgc2VydmVyVGltZXN0YW1wJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXJ2ZXJDZXJ0aWZpY2F0ZSA9IGNlcnRpZmljYXRlLnNlcnZlckNlcnRpZmljYXRlKCk7XG5cbiAgICBpZiAoXG4gICAgICAhdmVyaWZ5U2lnbmF0dXJlKFxuICAgICAgICB0aGlzLnNlcnZlclRydXN0Um9vdCxcbiAgICAgICAgc2VydmVyQ2VydGlmaWNhdGUuY2VydGlmaWNhdGVEYXRhKCksXG4gICAgICAgIHNlcnZlckNlcnRpZmljYXRlLnNpZ25hdHVyZSgpXG4gICAgICApXG4gICAgKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNZXNzYWdlUmVjZWl2ZXIudmFsaWRhdGVVbnNlYWxlZEVudmVsb3BlOiAnICtcbiAgICAgICAgICAnU2VydmVyIGNlcnRpZmljYXRlIHRydXN0IHJvb3QgdmFsaWRhdGlvbiBmYWlsZWQnXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICF2ZXJpZnlTaWduYXR1cmUoXG4gICAgICAgIHNlcnZlckNlcnRpZmljYXRlLmtleSgpLnNlcmlhbGl6ZSgpLFxuICAgICAgICBjZXJ0aWZpY2F0ZS5jZXJ0aWZpY2F0ZSgpLFxuICAgICAgICBjZXJ0aWZpY2F0ZS5zaWduYXR1cmUoKVxuICAgICAgKVxuICAgICkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLnZhbGlkYXRlVW5zZWFsZWRFbnZlbG9wZTogJyArXG4gICAgICAgICAgJ1NlcnZlciBjZXJ0aWZpY2F0ZSBzZXJ2ZXIgc2lnbmF0dXJlIHZhbGlkYXRpb24gZmFpbGVkJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2dJZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG5cbiAgICBpZiAoZW52ZWxvcGUuc2VydmVyVGltZXN0YW1wID4gY2VydGlmaWNhdGUuZXhwaXJhdGlvbigpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNZXNzYWdlUmVjZWl2ZXIudmFsaWRhdGVVbnNlYWxlZEVudmVsb3BlOiAnICtcbiAgICAgICAgICBgU2VuZGVyIGNlcnRpZmljYXRlIGlzIGV4cGlyZWQgZm9yIGVudmVsb3BlICR7bG9nSWR9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBvbkRlbGl2ZXJ5UmVjZWlwdChlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmRpc3BhdGNoQW5kV2FpdChcbiAgICAgIG5ldyBEZWxpdmVyeUV2ZW50KFxuICAgICAgICB7XG4gICAgICAgICAgdGltZXN0YW1wOiBlbnZlbG9wZS50aW1lc3RhbXAsXG4gICAgICAgICAgZW52ZWxvcGVUaW1lc3RhbXA6IGVudmVsb3BlLnNlcnZlclRpbWVzdGFtcCxcbiAgICAgICAgICBzb3VyY2U6IGVudmVsb3BlLnNvdXJjZSxcbiAgICAgICAgICBzb3VyY2VVdWlkOiBlbnZlbG9wZS5zb3VyY2VVdWlkLFxuICAgICAgICAgIHNvdXJjZURldmljZTogZW52ZWxvcGUuc291cmNlRGV2aWNlLFxuICAgICAgICB9LFxuICAgICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVucGFkKHBhZGRlZFBsYWludGV4dDogVWludDhBcnJheSk6IFVpbnQ4QXJyYXkge1xuICAgIGZvciAobGV0IGkgPSBwYWRkZWRQbGFpbnRleHQubGVuZ3RoIC0gMTsgaSA+PSAwOyBpIC09IDEpIHtcbiAgICAgIGlmIChwYWRkZWRQbGFpbnRleHRbaV0gPT09IDB4ODApIHtcbiAgICAgICAgcmV0dXJuIG5ldyBVaW50OEFycmF5KHBhZGRlZFBsYWludGV4dC5zbGljZSgwLCBpKSk7XG4gICAgICB9XG4gICAgICBpZiAocGFkZGVkUGxhaW50ZXh0W2ldICE9PSAweDAwKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBwYWRkaW5nJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHBhZGRlZFBsYWludGV4dDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVjcnlwdFNlYWxlZFNlbmRlcihcbiAgICB7IHNlbmRlcktleVN0b3JlLCBzZXNzaW9uU3RvcmUsIGlkZW50aXR5S2V5U3RvcmUsIHpvbmUgfTogTG9ja2VkU3RvcmVzLFxuICAgIGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlLFxuICAgIGNpcGhlcnRleHQ6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTxEZWNyeXB0U2VhbGVkU2VuZGVyUmVzdWx0PiB7XG4gICAgY29uc3QgbG9jYWxFMTY0ID0gdGhpcy5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gICAgY29uc3QgeyBkZXN0aW5hdGlvblV1aWQgfSA9IGVudmVsb3BlO1xuICAgIGNvbnN0IGxvY2FsRGV2aWNlSWQgPSBwYXJzZUludE9yVGhyb3coXG4gICAgICB0aGlzLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpLFxuICAgICAgJ01lc3NhZ2VSZWNlaXZlci5kZWNyeXB0U2VhbGVkU2VuZGVyOiBsb2NhbERldmljZUlkJ1xuICAgICk7XG5cbiAgICBjb25zdCBsb2dJZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG5cbiAgICBjb25zdCB7IHVuc2VhbGVkQ29udGVudDogbWVzc2FnZUNvbnRlbnQsIGNlcnRpZmljYXRlIH0gPSBlbnZlbG9wZTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBtZXNzYWdlQ29udGVudCAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ01pc3NpbmcgbWVzc2FnZSBjb250ZW50IGZvciBzZWFsZWQgc2VuZGVyIG1lc3NhZ2UnXG4gICAgKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBjZXJ0aWZpY2F0ZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ01pc3Npbmcgc2VuZGVyIGNlcnRpZmljYXRlIGZvciBzZWFsZWQgc2VuZGVyIG1lc3NhZ2UnXG4gICAgKTtcblxuICAgIGNvbnN0IHVuaWRlbnRpZmllZFNlbmRlclR5cGVFbnVtID1cbiAgICAgIFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZS5UeXBlO1xuXG4gICAgaWYgKFxuICAgICAgbWVzc2FnZUNvbnRlbnQubXNnVHlwZSgpID09PSB1bmlkZW50aWZpZWRTZW5kZXJUeXBlRW51bS5QTEFJTlRFWFRfQ09OVEVOVFxuICAgICkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBNZXNzYWdlUmVjZWl2ZXIuZGVjcnlwdFNlYWxlZFNlbmRlcigke2xvZ0lkfSk6IGAgK1xuICAgICAgICAgICd1bmlkZW50aWZpZWQgbWVzc2FnZS9wbGFpbnRleHQgY29udGVudHMnXG4gICAgICApO1xuICAgICAgY29uc3QgcGxhaW50ZXh0Q29udGVudCA9IFBsYWludGV4dENvbnRlbnQuZGVzZXJpYWxpemUoXG4gICAgICAgIG1lc3NhZ2VDb250ZW50LmNvbnRlbnRzKClcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHBsYWludGV4dDogcGxhaW50ZXh0Q29udGVudC5ib2R5KCksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIG1lc3NhZ2VDb250ZW50Lm1zZ1R5cGUoKSA9PT0gdW5pZGVudGlmaWVkU2VuZGVyVHlwZUVudW0uU0VOREVSS0VZX01FU1NBR0VcbiAgICApIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgTWVzc2FnZVJlY2VpdmVyLmRlY3J5cHRTZWFsZWRTZW5kZXIoJHtsb2dJZH0pOiBgICtcbiAgICAgICAgICAndW5pZGVudGlmaWVkIG1lc3NhZ2Uvc2VuZGVyIGtleSBjb250ZW50cydcbiAgICAgICk7XG4gICAgICBjb25zdCBzZWFsZWRTZW5kZXJJZGVudGlmaWVyID0gY2VydGlmaWNhdGUuc2VuZGVyVXVpZCgpO1xuICAgICAgY29uc3Qgc2VhbGVkU2VuZGVyU291cmNlRGV2aWNlID0gY2VydGlmaWNhdGUuc2VuZGVyRGV2aWNlSWQoKTtcblxuICAgICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgICBkZXN0aW5hdGlvblV1aWQsXG4gICAgICAgIEFkZHJlc3MuY3JlYXRlKHNlYWxlZFNlbmRlcklkZW50aWZpZXIsIHNlYWxlZFNlbmRlclNvdXJjZURldmljZSlcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHBsYWludGV4dCA9IGF3YWl0IHRoaXMuc3RvcmFnZS5wcm90b2NvbC5lbnF1ZXVlU2VuZGVyS2V5Sm9iKFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICAoKSA9PlxuICAgICAgICAgIGdyb3VwRGVjcnlwdChcbiAgICAgICAgICAgIFByb3RvY29sQWRkcmVzcy5uZXcoXG4gICAgICAgICAgICAgIHNlYWxlZFNlbmRlcklkZW50aWZpZXIsXG4gICAgICAgICAgICAgIHNlYWxlZFNlbmRlclNvdXJjZURldmljZVxuICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIHNlbmRlcktleVN0b3JlLFxuICAgICAgICAgICAgbWVzc2FnZUNvbnRlbnQuY29udGVudHMoKVxuICAgICAgICAgICksXG4gICAgICAgIHpvbmVcbiAgICAgICk7XG4gICAgICByZXR1cm4geyBwbGFpbnRleHQgfTtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBNZXNzYWdlUmVjZWl2ZXIuZGVjcnlwdFNlYWxlZFNlbmRlcigke2xvZ0lkfSk6IGAgK1xuICAgICAgICAndW5pZGVudGlmaWVkIG1lc3NhZ2UvcGFzc2luZyB0byBzZWFsZWRTZW5kZXJEZWNyeXB0TWVzc2FnZSdcbiAgICApO1xuXG4gICAgY29uc3QgcHJlS2V5U3RvcmUgPSBuZXcgUHJlS2V5cyh7IG91clV1aWQ6IGRlc3RpbmF0aW9uVXVpZCB9KTtcbiAgICBjb25zdCBzaWduZWRQcmVLZXlTdG9yZSA9IG5ldyBTaWduZWRQcmVLZXlzKHsgb3VyVXVpZDogZGVzdGluYXRpb25VdWlkIH0pO1xuXG4gICAgY29uc3Qgc2VhbGVkU2VuZGVySWRlbnRpZmllciA9IGVudmVsb3BlLnNvdXJjZVV1aWQ7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgc2VhbGVkU2VuZGVySWRlbnRpZmllciAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ0VtcHR5IHNlYWxlZCBzZW5kZXIgaWRlbnRpZmllcidcbiAgICApO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGVudmVsb3BlLnNvdXJjZURldmljZSAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ0VtcHR5IHNlYWxlZCBzZW5kZXIgZGV2aWNlJ1xuICAgICk7XG4gICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgZGVzdGluYXRpb25VdWlkLFxuICAgICAgQWRkcmVzcy5jcmVhdGUoc2VhbGVkU2VuZGVySWRlbnRpZmllciwgZW52ZWxvcGUuc291cmNlRGV2aWNlKVxuICAgICk7XG4gICAgY29uc3QgdW5zZWFsZWRQbGFpbnRleHQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UucHJvdG9jb2wuZW5xdWV1ZVNlc3Npb25Kb2IoXG4gICAgICBhZGRyZXNzLFxuICAgICAgKCkgPT5cbiAgICAgICAgc2VhbGVkU2VuZGVyRGVjcnlwdE1lc3NhZ2UoXG4gICAgICAgICAgQnVmZmVyLmZyb20oY2lwaGVydGV4dCksXG4gICAgICAgICAgUHVibGljS2V5LmRlc2VyaWFsaXplKEJ1ZmZlci5mcm9tKHRoaXMuc2VydmVyVHJ1c3RSb290KSksXG4gICAgICAgICAgZW52ZWxvcGUuc2VydmVyVGltZXN0YW1wLFxuICAgICAgICAgIGxvY2FsRTE2NCB8fCBudWxsLFxuICAgICAgICAgIGRlc3RpbmF0aW9uVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgIGxvY2FsRGV2aWNlSWQsXG4gICAgICAgICAgc2Vzc2lvblN0b3JlLFxuICAgICAgICAgIGlkZW50aXR5S2V5U3RvcmUsXG4gICAgICAgICAgcHJlS2V5U3RvcmUsXG4gICAgICAgICAgc2lnbmVkUHJlS2V5U3RvcmVcbiAgICAgICAgKSxcbiAgICAgIHpvbmVcbiAgICApO1xuXG4gICAgcmV0dXJuIHsgdW5zZWFsZWRQbGFpbnRleHQgfTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5uZXJEZWNyeXB0KFxuICAgIHN0b3JlczogTG9ja2VkU3RvcmVzLFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LFxuICAgIHV1aWRLaW5kOiBVVUlES2luZFxuICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCB7IHNlc3Npb25TdG9yZSwgaWRlbnRpdHlLZXlTdG9yZSwgem9uZSB9ID0gc3RvcmVzO1xuXG4gICAgY29uc3QgbG9nSWQgPSB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpO1xuICAgIGNvbnN0IGVudmVsb3BlVHlwZUVudW0gPSBQcm90by5FbnZlbG9wZS5UeXBlO1xuXG4gICAgY29uc3QgaWRlbnRpZmllciA9IGVudmVsb3BlLnNvdXJjZVV1aWQ7XG4gICAgY29uc3QgeyBzb3VyY2VEZXZpY2UgfSA9IGVudmVsb3BlO1xuXG4gICAgY29uc3QgeyBkZXN0aW5hdGlvblV1aWQgfSA9IGVudmVsb3BlO1xuICAgIGNvbnN0IHByZUtleVN0b3JlID0gbmV3IFByZUtleXMoeyBvdXJVdWlkOiBkZXN0aW5hdGlvblV1aWQgfSk7XG4gICAgY29uc3Qgc2lnbmVkUHJlS2V5U3RvcmUgPSBuZXcgU2lnbmVkUHJlS2V5cyh7IG91clV1aWQ6IGRlc3RpbmF0aW9uVXVpZCB9KTtcblxuICAgIHN0cmljdEFzc2VydChpZGVudGlmaWVyICE9PSB1bmRlZmluZWQsICdFbXB0eSBpZGVudGlmaWVyJyk7XG4gICAgc3RyaWN0QXNzZXJ0KHNvdXJjZURldmljZSAhPT0gdW5kZWZpbmVkLCAnRW1wdHkgc291cmNlIGRldmljZScpO1xuXG4gICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgZGVzdGluYXRpb25VdWlkLFxuICAgICAgQWRkcmVzcy5jcmVhdGUoaWRlbnRpZmllciwgc291cmNlRGV2aWNlKVxuICAgICk7XG5cbiAgICBpZiAoXG4gICAgICB1dWlkS2luZCA9PT0gVVVJREtpbmQuUE5JICYmXG4gICAgICBlbnZlbG9wZS50eXBlICE9PSBlbnZlbG9wZVR5cGVFbnVtLlBSRUtFWV9CVU5ETEVcbiAgICApIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgTWVzc2FnZVJlY2VpdmVyLmlubmVyRGVjcnlwdCgke2xvZ0lkfSk6IGAgK1xuICAgICAgICAgICdub24tUHJlS2V5IGVudmVsb3BlIG9uIFBOSSdcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN0cmljdEFzc2VydChcbiAgICAgIHV1aWRLaW5kID09PSBVVUlES2luZC5QTkkgfHwgdXVpZEtpbmQgPT09IFVVSURLaW5kLkFDSSxcbiAgICAgIGBVbnN1cHBvcnRlZCB1dWlkS2luZDogJHt1dWlkS2luZH1gXG4gICAgKTtcblxuICAgIGlmIChlbnZlbG9wZS50eXBlID09PSBlbnZlbG9wZVR5cGVFbnVtLlBMQUlOVEVYVF9DT05URU5UKSB7XG4gICAgICBsb2cuaW5mbyhgZGVjcnlwdC8ke2xvZ0lkfTogcGxhaW50ZXh0IG1lc3NhZ2VgKTtcbiAgICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGNpcGhlcnRleHQpO1xuICAgICAgY29uc3QgcGxhaW50ZXh0Q29udGVudCA9IFBsYWludGV4dENvbnRlbnQuZGVzZXJpYWxpemUoYnVmZmVyKTtcblxuICAgICAgcmV0dXJuIHRoaXMudW5wYWQocGxhaW50ZXh0Q29udGVudC5ib2R5KCkpO1xuICAgIH1cbiAgICBpZiAoZW52ZWxvcGUudHlwZSA9PT0gZW52ZWxvcGVUeXBlRW51bS5DSVBIRVJURVhUKSB7XG4gICAgICBsb2cuaW5mbyhgZGVjcnlwdC8ke2xvZ0lkfTogY2lwaGVydGV4dCBtZXNzYWdlYCk7XG4gICAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNZXNzYWdlUmVjZWl2ZXIuaW5uZXJEZWNyeXB0OiBObyBpZGVudGlmaWVyIGZvciBDSVBIRVJURVhUIG1lc3NhZ2UnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAoIXNvdXJjZURldmljZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5pbm5lckRlY3J5cHQ6IE5vIHNvdXJjZURldmljZSBmb3IgQ0lQSEVSVEVYVCBtZXNzYWdlJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2lnbmFsTWVzc2FnZSA9IFNpZ25hbE1lc3NhZ2UuZGVzZXJpYWxpemUoQnVmZmVyLmZyb20oY2lwaGVydGV4dCkpO1xuXG4gICAgICBjb25zdCBwbGFpbnRleHQgPSBhd2FpdCB0aGlzLnN0b3JhZ2UucHJvdG9jb2wuZW5xdWV1ZVNlc3Npb25Kb2IoXG4gICAgICAgIGFkZHJlc3MsXG4gICAgICAgIGFzeW5jICgpID0+XG4gICAgICAgICAgdGhpcy51bnBhZChcbiAgICAgICAgICAgIGF3YWl0IHNpZ25hbERlY3J5cHQoXG4gICAgICAgICAgICAgIHNpZ25hbE1lc3NhZ2UsXG4gICAgICAgICAgICAgIFByb3RvY29sQWRkcmVzcy5uZXcoaWRlbnRpZmllciwgc291cmNlRGV2aWNlKSxcbiAgICAgICAgICAgICAgc2Vzc2lvblN0b3JlLFxuICAgICAgICAgICAgICBpZGVudGl0eUtleVN0b3JlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgem9uZVxuICAgICAgKTtcbiAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuICAgIGlmIChlbnZlbG9wZS50eXBlID09PSBlbnZlbG9wZVR5cGVFbnVtLlBSRUtFWV9CVU5ETEUpIHtcbiAgICAgIGxvZy5pbmZvKGBkZWNyeXB0LyR7bG9nSWR9OiBwcmVrZXkgbWVzc2FnZWApO1xuICAgICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmlubmVyRGVjcnlwdDogTm8gaWRlbnRpZmllciBmb3IgUFJFS0VZX0JVTkRMRSBtZXNzYWdlJ1xuICAgICAgICApO1xuICAgICAgfVxuICAgICAgaWYgKCFzb3VyY2VEZXZpY2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdNZXNzYWdlUmVjZWl2ZXIuaW5uZXJEZWNyeXB0OiBObyBzb3VyY2VEZXZpY2UgZm9yIFBSRUtFWV9CVU5ETEUgbWVzc2FnZSdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHByZUtleVNpZ25hbE1lc3NhZ2UgPSBQcmVLZXlTaWduYWxNZXNzYWdlLmRlc2VyaWFsaXplKFxuICAgICAgICBCdWZmZXIuZnJvbShjaXBoZXJ0ZXh0KVxuICAgICAgKTtcblxuICAgICAgY29uc3QgcGxhaW50ZXh0ID0gYXdhaXQgdGhpcy5zdG9yYWdlLnByb3RvY29sLmVucXVldWVTZXNzaW9uSm9iKFxuICAgICAgICBhZGRyZXNzLFxuICAgICAgICBhc3luYyAoKSA9PlxuICAgICAgICAgIHRoaXMudW5wYWQoXG4gICAgICAgICAgICBhd2FpdCBzaWduYWxEZWNyeXB0UHJlS2V5KFxuICAgICAgICAgICAgICBwcmVLZXlTaWduYWxNZXNzYWdlLFxuICAgICAgICAgICAgICBQcm90b2NvbEFkZHJlc3MubmV3KGlkZW50aWZpZXIsIHNvdXJjZURldmljZSksXG4gICAgICAgICAgICAgIHNlc3Npb25TdG9yZSxcbiAgICAgICAgICAgICAgaWRlbnRpdHlLZXlTdG9yZSxcbiAgICAgICAgICAgICAgcHJlS2V5U3RvcmUsXG4gICAgICAgICAgICAgIHNpZ25lZFByZUtleVN0b3JlXG4gICAgICAgICAgICApXG4gICAgICAgICAgKSxcbiAgICAgICAgem9uZVxuICAgICAgKTtcbiAgICAgIHJldHVybiBwbGFpbnRleHQ7XG4gICAgfVxuICAgIGlmIChlbnZlbG9wZS50eXBlID09PSBlbnZlbG9wZVR5cGVFbnVtLlVOSURFTlRJRklFRF9TRU5ERVIpIHtcbiAgICAgIGxvZy5pbmZvKGBkZWNyeXB0LyR7bG9nSWR9OiB1bmlkZW50aWZpZWQgbWVzc2FnZWApO1xuICAgICAgY29uc3QgeyBwbGFpbnRleHQsIHVuc2VhbGVkUGxhaW50ZXh0IH0gPSBhd2FpdCB0aGlzLmRlY3J5cHRTZWFsZWRTZW5kZXIoXG4gICAgICAgIHN0b3JlcyxcbiAgICAgICAgZW52ZWxvcGUsXG4gICAgICAgIGNpcGhlcnRleHRcbiAgICAgICk7XG5cbiAgICAgIGlmIChwbGFpbnRleHQpIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudW5wYWQocGxhaW50ZXh0KTtcbiAgICAgIH1cblxuICAgICAgaWYgKHVuc2VhbGVkUGxhaW50ZXh0KSB7XG4gICAgICAgIGNvbnN0IGNvbnRlbnQgPSB1bnNlYWxlZFBsYWludGV4dC5tZXNzYWdlKCk7XG5cbiAgICAgICAgaWYgKCFjb250ZW50KSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5pbm5lckRlY3J5cHQ6IENvbnRlbnQgcmV0dXJuZWQgd2FzIGZhbHNleSEnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFJldHVybiBqdXN0IHRoZSBjb250ZW50IGJlY2F1c2UgdGhhdCBtYXRjaGVzIHRoZSBzaWduYXR1cmUgb2YgdGhlIG90aGVyXG4gICAgICAgIC8vICAgZGVjcnlwdCBtZXRob2RzIHVzZWQgYWJvdmUuXG4gICAgICAgIHJldHVybiB0aGlzLnVucGFkKGNvbnRlbnQpO1xuICAgICAgfVxuXG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1VuZXhwZWN0ZWQgbGFjayBvZiBwbGFpbnRleHQgZnJvbSB1bmlkZW50aWZpZWQgc2VuZGVyJyk7XG4gICAgfVxuICAgIHRocm93IG5ldyBFcnJvcignVW5rbm93biBtZXNzYWdlIHR5cGUnKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZGVjcnlwdChcbiAgICBzdG9yZXM6IExvY2tlZFN0b3JlcyxcbiAgICBlbnZlbG9wZTogVW5zZWFsZWRFbnZlbG9wZSxcbiAgICBjaXBoZXJ0ZXh0OiBVaW50OEFycmF5LFxuICAgIHV1aWRLaW5kOiBVVUlES2luZFxuICApOiBQcm9taXNlPFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ+IHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHRoaXMuaW5uZXJEZWNyeXB0KHN0b3JlcywgZW52ZWxvcGUsIGNpcGhlcnRleHQsIHV1aWRLaW5kKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgdXVpZCA9IGVudmVsb3BlLnNvdXJjZVV1aWQ7XG4gICAgICBjb25zdCBkZXZpY2VJZCA9IGVudmVsb3BlLnNvdXJjZURldmljZTtcblxuICAgICAgLy8gSm9iIHRpbWVkIG91dCwgbm90IGEgZGVjcnlwdGlvbiBlcnJvclxuICAgICAgaWYgKFxuICAgICAgICBlcnJvcj8ubmFtZSA9PT0gJ1RpbWVvdXRFcnJvcicgfHxcbiAgICAgICAgZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzPy4oJ3Rhc2sgZGlkIG5vdCBjb21wbGV0ZSBpbiB0aW1lJylcbiAgICAgICkge1xuICAgICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICAvLyBXZSBkb24ndCBkbyBhbnl0aGluZyBpZiBpdCdzIGp1c3QgYSBkdXBsaWNhdGVkIG1lc3NhZ2VcbiAgICAgIGlmIChlcnJvcj8ubWVzc2FnZT8uaW5jbHVkZXM/LignbWVzc2FnZSB3aXRoIG9sZCBjb3VudGVyJykpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgZG9uJ3QgZG8gYSBsaWdodCBzZXNzaW9uIHJlc2V0IGlmIGl0J3MgYW4gZXJyb3Igd2l0aCB0aGUgc2VhbGVkIHNlbmRlclxuICAgICAgLy8gICB3cmFwcGVyLCBzaW5jZSB3ZSBkb24ndCB0cnVzdCB0aGUgc2VuZGVyIGluZm9ybWF0aW9uLlxuICAgICAgaWYgKGVycm9yPy5tZXNzYWdlPy5pbmNsdWRlcz8uKCd0cnVzdCByb290IHZhbGlkYXRpb24gZmFpbGVkJykpIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKFxuICAgICAgICAoZW52ZWxvcGUuc291cmNlICYmIHRoaXMuaXNCbG9ja2VkKGVudmVsb3BlLnNvdXJjZSkpIHx8XG4gICAgICAgIChlbnZlbG9wZS5zb3VyY2VVdWlkICYmIHRoaXMuaXNVdWlkQmxvY2tlZChlbnZlbG9wZS5zb3VyY2VVdWlkKSlcbiAgICAgICkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmRlY3J5cHQ6IEVycm9yIGZyb20gYmxvY2tlZCBzZW5kZXI7IG5vIGZ1cnRoZXIgcHJvY2Vzc2luZydcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgaWYgKHV1aWQgJiYgZGV2aWNlSWQpIHtcbiAgICAgICAgY29uc3QgeyBjaXBoZXJUZXh0Qnl0ZXMsIGNpcGhlclRleHRUeXBlIH0gPSBlbnZlbG9wZTtcbiAgICAgICAgY29uc3QgZXZlbnQgPSBuZXcgRGVjcnlwdGlvbkVycm9yRXZlbnQoXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2lwaGVyVGV4dEJ5dGVzLFxuICAgICAgICAgICAgY2lwaGVyVGV4dFR5cGUsXG4gICAgICAgICAgICBjb250ZW50SGludDogZW52ZWxvcGUuY29udGVudEhpbnQsXG4gICAgICAgICAgICBncm91cElkOiBlbnZlbG9wZS5ncm91cElkLFxuICAgICAgICAgICAgcmVjZWl2ZWRBdENvdW50ZXI6IGVudmVsb3BlLnJlY2VpdmVkQXRDb3VudGVyLFxuICAgICAgICAgICAgcmVjZWl2ZWRBdERhdGU6IGVudmVsb3BlLnJlY2VpdmVkQXREYXRlLFxuICAgICAgICAgICAgc2VuZGVyRGV2aWNlOiBkZXZpY2VJZCxcbiAgICAgICAgICAgIHNlbmRlclV1aWQ6IHV1aWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgICAgICB9LFxuICAgICAgICAgICgpID0+IHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKVxuICAgICAgICApO1xuXG4gICAgICAgIC8vIEF2b2lkIGRlYWRsb2NrcyBieSBzY2hlZHVsaW5nIHByb2Nlc3Npbmcgb24gZGVjcnlwdGVkIHF1ZXVlXG4gICAgICAgIHRoaXMuYWRkVG9RdWV1ZShcbiAgICAgICAgICBhc3luYyAoKSA9PiB0aGlzLmRpc3BhdGNoRXZlbnQoZXZlbnQpLFxuICAgICAgICAgICdkZWNyeXB0ZWQvZGlzcGF0Y2hFdmVudCcsXG4gICAgICAgICAgVGFza1R5cGUuRGVjcnlwdGVkXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCBlbnZlbG9wZUlkID0gdGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKTtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYE1lc3NhZ2VSZWNlaXZlci5kZWNyeXB0OiBFbnZlbG9wZSAke2VudmVsb3BlSWR9IG1pc3NpbmcgdXVpZCBvciBkZXZpY2VJZGBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTZW50TWVzc2FnZShcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgc2VudENvbnRhaW5lcjogUHJvY2Vzc2VkU2VudFxuICApIHtcbiAgICBsb2cuaW5mbygnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVNlbnRNZXNzYWdlJywgdGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKSk7XG4gICAgY29uc3Qge1xuICAgICAgZGVzdGluYXRpb24sXG4gICAgICBkZXN0aW5hdGlvblV1aWQsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICBtZXNzYWdlOiBtc2csXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICB1bmlkZW50aWZpZWRTdGF0dXMsXG4gICAgICBpc1JlY2lwaWVudFVwZGF0ZSxcbiAgICB9ID0gc2VudENvbnRhaW5lcjtcblxuICAgIGlmICghbXNnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2VSZWNlaXZlci5oYW5kbGVTZW50TWVzc2FnZTogbWVzc2FnZSB3YXMgZmFsc2V5IScpO1xuICAgIH1cblxuICAgIGxldCBwOiBQcm9taXNlPHZvaWQ+ID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgaWYgKG1zZy5mbGFncyAmJiBtc2cuZmxhZ3MgJiBQcm90by5EYXRhTWVzc2FnZS5GbGFncy5FTkRfU0VTU0lPTikge1xuICAgICAgaWYgKGRlc3RpbmF0aW9uVXVpZCkge1xuICAgICAgICBwID0gdGhpcy5oYW5kbGVFbmRTZXNzaW9uKG5ldyBVVUlEKGRlc3RpbmF0aW9uVXVpZCkpO1xuICAgICAgfSBlbHNlIGlmIChkZXN0aW5hdGlvbikge1xuICAgICAgICBjb25zdCB0aGVpclV1aWQgPSBVVUlELmxvb2t1cChkZXN0aW5hdGlvbik7XG4gICAgICAgIGlmICh0aGVpclV1aWQpIHtcbiAgICAgICAgICBwID0gdGhpcy5oYW5kbGVFbmRTZXNzaW9uKHRoZWlyVXVpZCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLndhcm4oYGhhbmRsZVNlbnRNZXNzYWdlOiB1dWlkIG5vdCBmb3VuZCBmb3IgJHtkZXN0aW5hdGlvbn1gKTtcbiAgICAgICAgICBwID0gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVNlbnRNZXNzYWdlOiBDYW5ub3QgZW5kIHNlc3Npb24gd2l0aCBmYWxzZXkgZGVzdGluYXRpb24nXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICAgIGF3YWl0IHA7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgdGhpcy5wcm9jZXNzRGVjcnlwdGVkKGVudmVsb3BlLCBtc2cpO1xuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLmdldFByb2Nlc3NlZEdyb3VwSWQobWVzc2FnZSk7XG4gICAgY29uc3QgaXNCbG9ja2VkID0gZ3JvdXBJZCA/IHRoaXMuaXNHcm91cEJsb2NrZWQoZ3JvdXBJZCkgOiBmYWxzZTtcbiAgICBjb25zdCB7IHNvdXJjZSwgc291cmNlVXVpZCB9ID0gZW52ZWxvcGU7XG4gICAgY29uc3Qgb3VyRTE2NCA9IHRoaXMuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgIGNvbnN0IG91clV1aWQgPSB0aGlzLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG4gICAgY29uc3QgaXNNZSA9XG4gICAgICAoc291cmNlICYmIG91ckUxNjQgJiYgc291cmNlID09PSBvdXJFMTY0KSB8fFxuICAgICAgKHNvdXJjZVV1aWQgJiYgb3VyVXVpZCAmJiBzb3VyY2VVdWlkID09PSBvdXJVdWlkKTtcbiAgICBjb25zdCBpc0xlYXZpbmdHcm91cCA9IEJvb2xlYW4oXG4gICAgICAhbWVzc2FnZS5ncm91cFYyICYmXG4gICAgICAgIG1lc3NhZ2UuZ3JvdXAgJiZcbiAgICAgICAgbWVzc2FnZS5ncm91cC50eXBlID09PSBQcm90by5Hcm91cENvbnRleHQuVHlwZS5RVUlUXG4gICAgKTtcblxuICAgIGlmIChncm91cElkICYmIGlzQmxvY2tlZCAmJiAhKGlzTWUgJiYgaXNMZWF2aW5nR3JvdXApKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYE1lc3NhZ2UgJHt0aGlzLmdldEVudmVsb3BlSWQoXG4gICAgICAgICAgZW52ZWxvcGVcbiAgICAgICAgKX0gaWdub3JlZDsgZGVzdGluZWQgZm9yIGJsb2NrZWQgZ3JvdXBgXG4gICAgICApO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBldiA9IG5ldyBTZW50RXZlbnQoXG4gICAgICB7XG4gICAgICAgIGRlc3RpbmF0aW9uOiBkcm9wTnVsbChkZXN0aW5hdGlvbiksXG4gICAgICAgIGRlc3RpbmF0aW9uVXVpZDogZHJvcE51bGwoZGVzdGluYXRpb25VdWlkKSxcbiAgICAgICAgdGltZXN0YW1wOiB0aW1lc3RhbXA/LnRvTnVtYmVyKCksXG4gICAgICAgIHNlcnZlclRpbWVzdGFtcDogZW52ZWxvcGUuc2VydmVyVGltZXN0YW1wLFxuICAgICAgICBkZXZpY2U6IGVudmVsb3BlLnNvdXJjZURldmljZSxcbiAgICAgICAgdW5pZGVudGlmaWVkU3RhdHVzLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBpc1JlY2lwaWVudFVwZGF0ZTogQm9vbGVhbihpc1JlY2lwaWVudFVwZGF0ZSksXG4gICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiBlbnZlbG9wZS5yZWNlaXZlZEF0Q291bnRlcixcbiAgICAgICAgcmVjZWl2ZWRBdERhdGU6IGVudmVsb3BlLnJlY2VpdmVkQXREYXRlLFxuICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlU3RvcnlNZXNzYWdlKFxuICAgIGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlLFxuICAgIG1zZzogUHJvdG8uSVN0b3J5TWVzc2FnZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBsb2dJZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG4gICAgbG9nLmluZm8oJ01lc3NhZ2VSZWNlaXZlci5oYW5kbGVTdG9yeU1lc3NhZ2UnLCBsb2dJZCk7XG5cbiAgICBjb25zdCBhdHRhY2htZW50czogQXJyYXk8UHJvY2Vzc2VkQXR0YWNobWVudD4gPSBbXTtcblxuICAgIGlmIChtc2cuZmlsZUF0dGFjaG1lbnQpIHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBwcm9jZXNzQXR0YWNobWVudChtc2cuZmlsZUF0dGFjaG1lbnQpO1xuICAgICAgYXR0YWNobWVudHMucHVzaChhdHRhY2htZW50KTtcbiAgICB9XG5cbiAgICBpZiAobXNnLnRleHRBdHRhY2htZW50KSB7XG4gICAgICBjb25zdCB7IHRleHQgfSA9IG1zZy50ZXh0QXR0YWNobWVudDtcbiAgICAgIGlmICghdGV4dCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RleHQgYXR0YWNobWVudHMgbXVzdCBoYXZlIHRleHQhJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIFRPRE8gREVTS1RPUC0zNzE0IHdlIHNob3VsZCBkb3dubG9hZCB0aGUgc3RvcnkgbGluayBwcmV2aWV3IGltYWdlXG4gICAgICBhdHRhY2htZW50cy5wdXNoKHtcbiAgICAgICAgc2l6ZTogdGV4dC5sZW5ndGgsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBBUFBMSUNBVElPTl9PQ1RFVF9TVFJFQU0sXG4gICAgICAgIHRleHRBdHRhY2htZW50OiBtc2cudGV4dEF0dGFjaG1lbnQsXG4gICAgICAgIGJsdXJIYXNoOiBnZW5lcmF0ZUJsdXJIYXNoKFxuICAgICAgICAgIChtc2cudGV4dEF0dGFjaG1lbnQuY29sb3IgfHxcbiAgICAgICAgICAgIG1zZy50ZXh0QXR0YWNobWVudC5ncmFkaWVudD8uc3RhcnRDb2xvcikgPz9cbiAgICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgY29uc3QgZ3JvdXBWMiA9IG1zZy5ncm91cCA/IHByb2Nlc3NHcm91cFYyQ29udGV4dChtc2cuZ3JvdXApIDogdW5kZWZpbmVkO1xuICAgIGlmIChncm91cFYyICYmIHRoaXMuaXNHcm91cEJsb2NrZWQoZ3JvdXBWMi5pZCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVN0b3J5TWVzc2FnZTogZW52ZWxvcGUgJHt0aGlzLmdldEVudmVsb3BlSWQoXG4gICAgICAgICAgZW52ZWxvcGVcbiAgICAgICAgKX0gaWdub3JlZDsgZGVzdGluZWQgZm9yIGJsb2NrZWQgZ3JvdXBgXG4gICAgICApO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV4cGlyZVRpbWVyID0gTWF0aC5taW4oXG4gICAgICBNYXRoLmZsb29yKFxuICAgICAgICAoZW52ZWxvcGUuc2VydmVyVGltZXN0YW1wICsgZHVyYXRpb25zLkRBWSAtIERhdGUubm93KCkpIC8gMTAwMFxuICAgICAgKSxcbiAgICAgIGR1cmF0aW9ucy5EQVkgLyAxMDAwXG4gICAgKTtcblxuICAgIGlmIChleHBpcmVUaW1lciA8PSAwKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ01lc3NhZ2VSZWNlaXZlci5oYW5kbGVTdG9yeU1lc3NhZ2U6IHN0b3J5IGFscmVhZHkgZXhwaXJlZCcsXG4gICAgICAgIGxvZ0lkXG4gICAgICApO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGV2ID0gbmV3IE1lc3NhZ2VFdmVudChcbiAgICAgIHtcbiAgICAgICAgc291cmNlOiBlbnZlbG9wZS5zb3VyY2UsXG4gICAgICAgIHNvdXJjZVV1aWQ6IGVudmVsb3BlLnNvdXJjZVV1aWQsXG4gICAgICAgIHNvdXJjZURldmljZTogZW52ZWxvcGUuc291cmNlRGV2aWNlLFxuICAgICAgICB0aW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgICAgc2VydmVyR3VpZDogZW52ZWxvcGUuc2VydmVyR3VpZCxcbiAgICAgICAgc2VydmVyVGltZXN0YW1wOiBlbnZlbG9wZS5zZXJ2ZXJUaW1lc3RhbXAsXG4gICAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJ5UmVjZWl2ZWQ6IEJvb2xlYW4oXG4gICAgICAgICAgZW52ZWxvcGUudW5pZGVudGlmaWVkRGVsaXZlcnlSZWNlaXZlZFxuICAgICAgICApLFxuICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgYXR0YWNobWVudHMsXG4gICAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgICAgZmxhZ3M6IDAsXG4gICAgICAgICAgZ3JvdXBWMixcbiAgICAgICAgICBpc1N0b3J5OiB0cnVlLFxuICAgICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICAgIHRpbWVzdGFtcDogZW52ZWxvcGUudGltZXN0YW1wLFxuICAgICAgICB9LFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogZW52ZWxvcGUucmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICAgIHJlY2VpdmVkQXREYXRlOiBlbnZlbG9wZS5yZWNlaXZlZEF0RGF0ZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRGF0YU1lc3NhZ2UoXG4gICAgZW52ZWxvcGU6IFVuc2VhbGVkRW52ZWxvcGUsXG4gICAgbXNnOiBQcm90by5JRGF0YU1lc3NhZ2VcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbG9nSWQgPSB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpO1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXIuaGFuZGxlRGF0YU1lc3NhZ2UnLCBsb2dJZCk7XG5cbiAgICBjb25zdCBpc1N0b3JpZXNFbmFibGVkID1cbiAgICAgIGlzRW5hYmxlZCgnZGVza3RvcC5zdG9yaWVzJykgfHwgaXNFbmFibGVkKCdkZXNrdG9wLmludGVybmFsVXNlcicpO1xuICAgIGlmICghaXNTdG9yaWVzRW5hYmxlZCAmJiBtc2cuc3RvcnlDb250ZXh0KSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYE1lc3NhZ2VSZWNlaXZlci5oYW5kbGVEYXRhTWVzc2FnZS8ke2xvZ0lkfTogRHJvcHBpbmcgaW5jb21pbmcgZGF0YU1lc3NhZ2Ugd2l0aCBzdG9yeUNvbnRleHQgZmllbGRgXG4gICAgICApO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBsZXQgcDogUHJvbWlzZTx2b2lkPiA9IFByb21pc2UucmVzb2x2ZSgpO1xuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gZW52ZWxvcGUuc291cmNlVXVpZDtcbiAgICBpZiAoIWRlc3RpbmF0aW9uKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdNZXNzYWdlUmVjZWl2ZXIuaGFuZGxlRGF0YU1lc3NhZ2U6IHNvdXJjZSBhbmQgc291cmNlVXVpZCB3ZXJlIGZhbHNleSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNJbnZhbGlkR3JvdXBEYXRhKG1zZywgZW52ZWxvcGUpKSB7XG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuY2hlY2tHcm91cFYxRGF0YShtc2cpO1xuXG4gICAgaWYgKG1zZy5mbGFncyAmJiBtc2cuZmxhZ3MgJiBQcm90by5EYXRhTWVzc2FnZS5GbGFncy5FTkRfU0VTU0lPTikge1xuICAgICAgcCA9IHRoaXMuaGFuZGxlRW5kU2Vzc2lvbihuZXcgVVVJRChkZXN0aW5hdGlvbikpO1xuICAgIH1cblxuICAgIGlmIChtc2cuZmxhZ3MgJiYgbXNnLmZsYWdzICYgUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuUFJPRklMRV9LRVlfVVBEQVRFKSB7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIG1zZy5wcm9maWxlS2V5ICYmIG1zZy5wcm9maWxlS2V5Lmxlbmd0aCA+IDAsXG4gICAgICAgICdQUk9GSUxFX0tFWV9VUERBVEUgd2l0aG91dCBwcm9maWxlS2V5J1xuICAgICAgKTtcblxuICAgICAgY29uc3QgZXYgPSBuZXcgUHJvZmlsZUtleVVwZGF0ZUV2ZW50KFxuICAgICAgICB7XG4gICAgICAgICAgc291cmNlOiBlbnZlbG9wZS5zb3VyY2UsXG4gICAgICAgICAgc291cmNlVXVpZDogZW52ZWxvcGUuc291cmNlVXVpZCxcbiAgICAgICAgICBwcm9maWxlS2V5OiBCeXRlcy50b0Jhc2U2NChtc2cucHJvZmlsZUtleSksXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlLmJpbmQodGhpcywgZW52ZWxvcGUpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgICB9XG4gICAgYXdhaXQgcDtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCB0aGlzLnByb2Nlc3NEZWNyeXB0ZWQoZW52ZWxvcGUsIG1zZyk7XG4gICAgY29uc3QgZ3JvdXBJZCA9IHRoaXMuZ2V0UHJvY2Vzc2VkR3JvdXBJZChtZXNzYWdlKTtcbiAgICBjb25zdCBpc0Jsb2NrZWQgPSBncm91cElkID8gdGhpcy5pc0dyb3VwQmxvY2tlZChncm91cElkKSA6IGZhbHNlO1xuICAgIGNvbnN0IHsgc291cmNlLCBzb3VyY2VVdWlkIH0gPSBlbnZlbG9wZTtcbiAgICBjb25zdCBvdXJFMTY0ID0gdGhpcy5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHRoaXMuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBpc01lID1cbiAgICAgIChzb3VyY2UgJiYgb3VyRTE2NCAmJiBzb3VyY2UgPT09IG91ckUxNjQpIHx8XG4gICAgICAoc291cmNlVXVpZCAmJiBvdXJVdWlkICYmIHNvdXJjZVV1aWQgPT09IG91clV1aWQpO1xuICAgIGNvbnN0IGlzTGVhdmluZ0dyb3VwID0gQm9vbGVhbihcbiAgICAgICFtZXNzYWdlLmdyb3VwVjIgJiZcbiAgICAgICAgbWVzc2FnZS5ncm91cCAmJlxuICAgICAgICBtZXNzYWdlLmdyb3VwLnR5cGUgPT09IFByb3RvLkdyb3VwQ29udGV4dC5UeXBlLlFVSVRcbiAgICApO1xuXG4gICAgaWYgKGdyb3VwSWQgJiYgaXNCbG9ja2VkICYmICEoaXNNZSAmJiBpc0xlYXZpbmdHcm91cCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgTWVzc2FnZSAke3RoaXMuZ2V0RW52ZWxvcGVJZChcbiAgICAgICAgICBlbnZlbG9wZVxuICAgICAgICApfSBpZ25vcmVkOyBkZXN0aW5lZCBmb3IgYmxvY2tlZCBncm91cGBcbiAgICAgICk7XG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV2ID0gbmV3IE1lc3NhZ2VFdmVudChcbiAgICAgIHtcbiAgICAgICAgc291cmNlOiBlbnZlbG9wZS5zb3VyY2UsXG4gICAgICAgIHNvdXJjZVV1aWQ6IGVudmVsb3BlLnNvdXJjZVV1aWQsXG4gICAgICAgIHNvdXJjZURldmljZTogZW52ZWxvcGUuc291cmNlRGV2aWNlLFxuICAgICAgICB0aW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgICAgc2VydmVyR3VpZDogZW52ZWxvcGUuc2VydmVyR3VpZCxcbiAgICAgICAgc2VydmVyVGltZXN0YW1wOiBlbnZlbG9wZS5zZXJ2ZXJUaW1lc3RhbXAsXG4gICAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJ5UmVjZWl2ZWQ6IEJvb2xlYW4oXG4gICAgICAgICAgZW52ZWxvcGUudW5pZGVudGlmaWVkRGVsaXZlcnlSZWNlaXZlZFxuICAgICAgICApLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICByZWNlaXZlZEF0Q291bnRlcjogZW52ZWxvcGUucmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICAgIHJlY2VpdmVkQXREYXRlOiBlbnZlbG9wZS5yZWNlaXZlZEF0RGF0ZSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICk7XG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgbWF5YmVVcGRhdGVUaW1lc3RhbXAoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlXG4gICk6IFByb21pc2U8UHJvY2Vzc2VkRW52ZWxvcGU+IHtcbiAgICBjb25zdCB7IHJldHJ5UGxhY2Vob2xkZXJzIH0gPSB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzO1xuICAgIGlmICghcmV0cnlQbGFjZWhvbGRlcnMpIHtcbiAgICAgIGxvZy53YXJuKCdtYXliZVVwZGF0ZVRpbWVzdGFtcDogcmV0cnkgcGxhY2Vob2xkZXJzIG5vdCBhdmFpbGFibGUhJyk7XG4gICAgICByZXR1cm4gZW52ZWxvcGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyB0aW1lc3RhbXAgfSA9IGVudmVsb3BlO1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBlbnZlbG9wZS5ncm91cElkIHx8IGVudmVsb3BlLnNvdXJjZVV1aWQ7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICAgIGNvbnN0IGlkRm9yTG9nZ2luZyA9IGVudmVsb3BlLmdyb3VwSWRcbiAgICAgICAgICA/IGBncm91cHYyKCR7ZW52ZWxvcGUuZ3JvdXBJZH0pYFxuICAgICAgICAgIDogZW52ZWxvcGUuc291cmNlVXVpZDtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYG1heWJlVXBkYXRlVGltZXN0YW1wLyR7dGltZXN0YW1wfTogTm8gY29udmVyc2F0aW9uIGZvdW5kIGZvciBpZGVudGlmaWVyICR7aWRGb3JMb2dnaW5nfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIGVudmVsb3BlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBsb2dJZCA9IGAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0vJHt0aW1lc3RhbXB9YDtcbiAgICAgIGNvbnN0IGl0ZW0gPSBhd2FpdCByZXRyeVBsYWNlaG9sZGVycy5maW5kQnlNZXNzYWdlQW5kUmVtb3ZlKFxuICAgICAgICBjb252ZXJzYXRpb24uaWQsXG4gICAgICAgIHRpbWVzdGFtcFxuICAgICAgKTtcbiAgICAgIGlmIChpdGVtICYmIGl0ZW0ud2FzT3BlbmVkKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBtYXliZVVwZGF0ZVRpbWVzdGFtcC8ke2xvZ0lkfTogZm91bmQgcmV0cnkgcGxhY2Vob2xkZXIsIGJ1dCBjb252ZXJzYXRpb24gd2FzIG9wZW5lZC4gTm8gdXBkYXRlcyBtYWRlLmBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgbWF5YmVVcGRhdGVUaW1lc3RhbXAvJHtsb2dJZH06IGZvdW5kIHJldHJ5IHBsYWNlaG9sZGVyLiBVcGRhdGluZyByZWNlaXZlZEF0Q291bnRlci9yZWNlaXZlZEF0RGF0ZWBcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmVudmVsb3BlLFxuICAgICAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiBpdGVtLnJlY2VpdmVkQXRDb3VudGVyLFxuICAgICAgICAgIHJlY2VpdmVkQXREYXRlOiBpdGVtLnJlY2VpdmVkQXQsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYG1heWJlVXBkYXRlVGltZXN0YW1wLyR7dGltZXN0YW1wfTogRmFpbGVkIHRvIHByb2Nlc3MgbWVzc2FnZTogJHtFcnJvcnMudG9Mb2dGb3JtYXQoXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBlbnZlbG9wZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaW5uZXJIYW5kbGVDb250ZW50TWVzc2FnZShcbiAgICBpbmNvbWluZ0VudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBwbGFpbnRleHQ6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgY29udGVudCA9IFByb3RvLkNvbnRlbnQuZGVjb2RlKHBsYWludGV4dCk7XG4gICAgY29uc3QgZW52ZWxvcGUgPSBhd2FpdCB0aGlzLm1heWJlVXBkYXRlVGltZXN0YW1wKGluY29taW5nRW52ZWxvcGUpO1xuXG4gICAgaWYgKFxuICAgICAgY29udGVudC5kZWNyeXB0aW9uRXJyb3JNZXNzYWdlICYmXG4gICAgICBCeXRlcy5pc05vdEVtcHR5KGNvbnRlbnQuZGVjcnlwdGlvbkVycm9yTWVzc2FnZSlcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlRGVjcnlwdGlvbkVycm9yKFxuICAgICAgICBlbnZlbG9wZSxcbiAgICAgICAgY29udGVudC5kZWNyeXB0aW9uRXJyb3JNZXNzYWdlXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGVudC5zeW5jTWVzc2FnZSkge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVTeW5jTWVzc2FnZShcbiAgICAgICAgZW52ZWxvcGUsXG4gICAgICAgIHByb2Nlc3NTeW5jTWVzc2FnZShjb250ZW50LnN5bmNNZXNzYWdlKVxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnQuZGF0YU1lc3NhZ2UpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlRGF0YU1lc3NhZ2UoZW52ZWxvcGUsIGNvbnRlbnQuZGF0YU1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGVudC5udWxsTWVzc2FnZSkge1xuICAgICAgYXdhaXQgdGhpcy5oYW5kbGVOdWxsTWVzc2FnZShlbnZlbG9wZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb250ZW50LmNhbGxpbmdNZXNzYWdlKSB7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZUNhbGxpbmdNZXNzYWdlKGVudmVsb3BlLCBjb250ZW50LmNhbGxpbmdNZXNzYWdlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGNvbnRlbnQucmVjZWlwdE1lc3NhZ2UpIHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlUmVjZWlwdE1lc3NhZ2UoZW52ZWxvcGUsIGNvbnRlbnQucmVjZWlwdE1lc3NhZ2UpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAoY29udGVudC50eXBpbmdNZXNzYWdlKSB7XG4gICAgICBhd2FpdCB0aGlzLmhhbmRsZVR5cGluZ01lc3NhZ2UoZW52ZWxvcGUsIGNvbnRlbnQudHlwaW5nTWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaXNTdG9yaWVzRW5hYmxlZCA9XG4gICAgICBpc0VuYWJsZWQoJ2Rlc2t0b3Auc3RvcmllcycpIHx8IGlzRW5hYmxlZCgnZGVza3RvcC5pbnRlcm5hbFVzZXInKTtcbiAgICBpZiAoY29udGVudC5zdG9yeU1lc3NhZ2UpIHtcbiAgICAgIGlmIChpc1N0b3JpZXNFbmFibGVkKSB7XG4gICAgICAgIGF3YWl0IHRoaXMuaGFuZGxlU3RvcnlNZXNzYWdlKGVudmVsb3BlLCBjb250ZW50LnN0b3J5TWVzc2FnZSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbG9nSWQgPSB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpO1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBpbm5lckhhbmRsZUNvbnRlbnRNZXNzYWdlLyR7bG9nSWR9OiBEcm9wcGluZyBpbmNvbWluZyBtZXNzYWdlIHdpdGggc3RvcnlNZXNzYWdlIGZpZWxkYFxuICAgICAgKTtcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG5cbiAgICBpZiAoQnl0ZXMuaXNFbXB0eShjb250ZW50LnNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1Vuc3VwcG9ydGVkIGNvbnRlbnQgbWVzc2FnZScpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlRGVjcnlwdGlvbkVycm9yKFxuICAgIGVudmVsb3BlOiBVbnNlYWxlZEVudmVsb3BlLFxuICAgIGRlY3J5cHRpb25FcnJvcjogVWludDhBcnJheVxuICApIHtcbiAgICBjb25zdCBsb2dJZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG4gICAgbG9nLmluZm8oYGhhbmRsZURlY3J5cHRpb25FcnJvcjogJHtsb2dJZH1gKTtcblxuICAgIGNvbnN0IGJ1ZmZlciA9IEJ1ZmZlci5mcm9tKGRlY3J5cHRpb25FcnJvcik7XG4gICAgY29uc3QgcmVxdWVzdCA9IERlY3J5cHRpb25FcnJvck1lc3NhZ2UuZGVzZXJpYWxpemUoYnVmZmVyKTtcblxuICAgIGNvbnN0IHsgc291cmNlVXVpZCwgc291cmNlRGV2aWNlIH0gPSBlbnZlbG9wZTtcbiAgICBpZiAoIXNvdXJjZVV1aWQgfHwgIXNvdXJjZURldmljZSkge1xuICAgICAgbG9nLmVycm9yKGBoYW5kbGVEZWNyeXB0aW9uRXJyb3IvJHtsb2dJZH06IE1pc3NpbmcgdXVpZCBvciBkZXZpY2UhYCk7XG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXZlbnQgPSBuZXcgUmV0cnlSZXF1ZXN0RXZlbnQoXG4gICAgICB7XG4gICAgICAgIGdyb3VwSWQ6IGVudmVsb3BlLmdyb3VwSWQsXG4gICAgICAgIHJlcXVlc3RlckRldmljZTogc291cmNlRGV2aWNlLFxuICAgICAgICByZXF1ZXN0ZXJVdWlkOiBzb3VyY2VVdWlkLFxuICAgICAgICByYXRjaGV0S2V5OiByZXF1ZXN0LnJhdGNoZXRLZXkoKSxcbiAgICAgICAgc2VuZGVyRGV2aWNlOiByZXF1ZXN0LmRldmljZUlkKCksXG4gICAgICAgIHNlbnRBdDogcmVxdWVzdC50aW1lc3RhbXAoKSxcbiAgICAgIH0sXG4gICAgICAoKSA9PiB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSlcbiAgICApO1xuICAgIGF3YWl0IHRoaXMuZGlzcGF0Y2hFdmVudChldmVudCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UoXG4gICAgc3RvcmVzOiBMb2NrZWRTdG9yZXMsXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIGRpc3RyaWJ1dGlvbk1lc3NhZ2U6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgZW52ZWxvcGVJZCA9IHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSk7XG4gICAgbG9nLmluZm8oYGhhbmRsZVNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UvJHtlbnZlbG9wZUlkfWApO1xuXG4gICAgLy8gTm90ZTogd2UgZG9uJ3QgY2FsbCByZW1vdmVGcm9tQ2FjaGUgaGVyZSBiZWNhdXNlIHRoaXMgbWVzc2FnZSBjYW4gYmUgY29tYmluZWRcbiAgICAvLyAgIHdpdGggYSBkYXRhTWVzc2FnZSwgZm9yIGV4YW1wbGUuIFRoYXQgcHJvY2Vzc2luZyB3aWxsIGRpY3RhdGUgY2FjaGUgcmVtb3ZhbC5cblxuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBlbnZlbG9wZS5zb3VyY2VVdWlkO1xuICAgIGNvbnN0IHsgc291cmNlRGV2aWNlIH0gPSBlbnZlbG9wZTtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGhhbmRsZVNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2U6IE5vIGlkZW50aWZpZXIgZm9yIGVudmVsb3BlICR7ZW52ZWxvcGVJZH1gXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAoIWlzTnVtYmVyKHNvdXJjZURldmljZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGhhbmRsZVNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2U6IE1pc3Npbmcgc291cmNlRGV2aWNlIGZvciBlbnZlbG9wZSAke2VudmVsb3BlSWR9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZW5kZXIgPSBQcm90b2NvbEFkZHJlc3MubmV3KGlkZW50aWZpZXIsIHNvdXJjZURldmljZSk7XG4gICAgY29uc3Qgc2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZSA9XG4gICAgICBTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlLmRlc2VyaWFsaXplKFxuICAgICAgICBCdWZmZXIuZnJvbShkaXN0cmlidXRpb25NZXNzYWdlKVxuICAgICAgKTtcbiAgICBjb25zdCB7IGRlc3RpbmF0aW9uVXVpZCB9ID0gZW52ZWxvcGU7XG4gICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgZGVzdGluYXRpb25VdWlkLFxuICAgICAgQWRkcmVzcy5jcmVhdGUoaWRlbnRpZmllciwgc291cmNlRGV2aWNlKVxuICAgICk7XG5cbiAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHJvdG9jb2wuZW5xdWV1ZVNlbmRlcktleUpvYihcbiAgICAgIGFkZHJlc3MsXG4gICAgICAoKSA9PlxuICAgICAgICBwcm9jZXNzU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZShcbiAgICAgICAgICBzZW5kZXIsXG4gICAgICAgICAgc2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZSxcbiAgICAgICAgICBzdG9yZXMuc2VuZGVyS2V5U3RvcmVcbiAgICAgICAgKSxcbiAgICAgIHN0b3Jlcy56b25lXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlQ2FsbGluZ01lc3NhZ2UoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIGNhbGxpbmdNZXNzYWdlOiBQcm90by5JQ2FsbGluZ01lc3NhZ2VcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuU2VydmljZXMuY2FsbGluZy5oYW5kbGVDYWxsaW5nTWVzc2FnZShcbiAgICAgIGVudmVsb3BlLFxuICAgICAgY2FsbGluZ01lc3NhZ2VcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVSZWNlaXB0TWVzc2FnZShcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgcmVjZWlwdE1lc3NhZ2U6IFByb3RvLklSZWNlaXB0TWVzc2FnZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBzdHJpY3RBc3NlcnQocmVjZWlwdE1lc3NhZ2UudGltZXN0YW1wLCAnUmVjZWlwdCBtZXNzYWdlIHdpdGhvdXQgdGltZXN0YW1wJyk7XG5cbiAgICBsZXQgRXZlbnRDbGFzczogdHlwZW9mIERlbGl2ZXJ5RXZlbnQgfCB0eXBlb2YgUmVhZEV2ZW50IHwgdHlwZW9mIFZpZXdFdmVudDtcbiAgICBzd2l0Y2ggKHJlY2VpcHRNZXNzYWdlLnR5cGUpIHtcbiAgICAgIGNhc2UgUHJvdG8uUmVjZWlwdE1lc3NhZ2UuVHlwZS5ERUxJVkVSWTpcbiAgICAgICAgRXZlbnRDbGFzcyA9IERlbGl2ZXJ5RXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQcm90by5SZWNlaXB0TWVzc2FnZS5UeXBlLlJFQUQ6XG4gICAgICAgIEV2ZW50Q2xhc3MgPSBSZWFkRXZlbnQ7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBQcm90by5SZWNlaXB0TWVzc2FnZS5UeXBlLlZJRVdFRDpcbiAgICAgICAgRXZlbnRDbGFzcyA9IFZpZXdFdmVudDtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICAvLyBUaGlzIGNhbiBoYXBwZW4gaWYgd2UgZ2V0IGEgcmVjZWlwdCB0eXBlIHdlIGRvbid0IGtub3cgYWJvdXQgeWV0LCB3aGljaFxuICAgICAgICAvLyAgIGlzIHRvdGFsbHkgZmluZS5cbiAgICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgcmVjZWlwdE1lc3NhZ2UudGltZXN0YW1wLm1hcChhc3luYyByYXdUaW1lc3RhbXAgPT4ge1xuICAgICAgICBjb25zdCBldiA9IG5ldyBFdmVudENsYXNzKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcDogcmF3VGltZXN0YW1wPy50b051bWJlcigpLFxuICAgICAgICAgICAgZW52ZWxvcGVUaW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgICAgICAgIHNvdXJjZTogZW52ZWxvcGUuc291cmNlLFxuICAgICAgICAgICAgc291cmNlVXVpZDogZW52ZWxvcGUuc291cmNlVXVpZCxcbiAgICAgICAgICAgIHNvdXJjZURldmljZTogZW52ZWxvcGUuc291cmNlRGV2aWNlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUuYmluZCh0aGlzLCBlbnZlbG9wZSlcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgdGhpcy5kaXNwYXRjaEFuZFdhaXQoZXYpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVUeXBpbmdNZXNzYWdlKFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICB0eXBpbmdNZXNzYWdlOiBQcm90by5JVHlwaW5nTWVzc2FnZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG5cbiAgICBpZiAoZW52ZWxvcGUudGltZXN0YW1wICYmIHR5cGluZ01lc3NhZ2UudGltZXN0YW1wKSB7XG4gICAgICBjb25zdCBlbnZlbG9wZVRpbWVzdGFtcCA9IGVudmVsb3BlLnRpbWVzdGFtcDtcbiAgICAgIGNvbnN0IHR5cGluZ1RpbWVzdGFtcCA9IHR5cGluZ01lc3NhZ2UudGltZXN0YW1wPy50b051bWJlcigpO1xuXG4gICAgICBpZiAodHlwaW5nVGltZXN0YW1wICE9PSBlbnZlbG9wZVRpbWVzdGFtcCkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgVHlwaW5nIG1lc3NhZ2UgZW52ZWxvcGUgdGltZXN0YW1wICgke2VudmVsb3BlVGltZXN0YW1wfSkgZGlkIG5vdCBtYXRjaCB0eXBpbmcgdGltZXN0YW1wICgke3R5cGluZ1RpbWVzdGFtcH0pYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgZW52ZWxvcGUuc291cmNlRGV2aWNlICE9PSB1bmRlZmluZWQsXG4gICAgICAnVHlwaW5nTWVzc2FnZSByZXF1aXJlcyBzb3VyY2VEZXZpY2UgaW4gdGhlIGVudmVsb3BlJ1xuICAgICk7XG5cbiAgICBjb25zdCB7IGdyb3VwSWQsIHRpbWVzdGFtcCwgYWN0aW9uIH0gPSB0eXBpbmdNZXNzYWdlO1xuXG4gICAgbGV0IGdyb3VwSWRTdHJpbmc6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBsZXQgZ3JvdXBWMklkU3RyaW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWYgKGdyb3VwSWQgJiYgZ3JvdXBJZC5ieXRlTGVuZ3RoID4gMCkge1xuICAgICAgaWYgKGdyb3VwSWQuYnl0ZUxlbmd0aCA9PT0gR1JPVVBWMV9JRF9MRU5HVEgpIHtcbiAgICAgICAgZ3JvdXBJZFN0cmluZyA9IEJ5dGVzLnRvQmluYXJ5KGdyb3VwSWQpO1xuICAgICAgICBncm91cFYySWRTdHJpbmcgPSB0aGlzLmRlcml2ZUdyb3VwVjJGcm9tVjEoZ3JvdXBJZCk7XG4gICAgICB9IGVsc2UgaWYgKGdyb3VwSWQuYnl0ZUxlbmd0aCA9PT0gR1JPVVBWMl9JRF9MRU5HVEgpIHtcbiAgICAgICAgZ3JvdXBWMklkU3RyaW5nID0gQnl0ZXMudG9CYXNlNjQoZ3JvdXBJZCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsb2cuZXJyb3IoJ2hhbmRsZVR5cGluZ01lc3NhZ2U6IFJlY2VpdmVkIGludmFsaWQgZ3JvdXBJZCB2YWx1ZScpO1xuICAgICAgfVxuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuZGlzcGF0Y2hFdmVudChcbiAgICAgIG5ldyBUeXBpbmdFdmVudCh7XG4gICAgICAgIHNlbmRlcjogZW52ZWxvcGUuc291cmNlLFxuICAgICAgICBzZW5kZXJVdWlkOiBlbnZlbG9wZS5zb3VyY2VVdWlkLFxuICAgICAgICBzZW5kZXJEZXZpY2U6IGVudmVsb3BlLnNvdXJjZURldmljZSxcbiAgICAgICAgdHlwaW5nOiB7XG4gICAgICAgICAgdHlwaW5nTWVzc2FnZSxcbiAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcD8udG9OdW1iZXIoKSA/PyBEYXRlLm5vdygpLFxuICAgICAgICAgIHN0YXJ0ZWQ6IGFjdGlvbiA9PT0gUHJvdG8uVHlwaW5nTWVzc2FnZS5BY3Rpb24uU1RBUlRFRCxcbiAgICAgICAgICBzdG9wcGVkOiBhY3Rpb24gPT09IFByb3RvLlR5cGluZ01lc3NhZ2UuQWN0aW9uLlNUT1BQRUQsXG5cbiAgICAgICAgICBncm91cElkOiBncm91cElkU3RyaW5nLFxuICAgICAgICAgIGdyb3VwVjJJZDogZ3JvdXBWMklkU3RyaW5nLFxuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBoYW5kbGVOdWxsTWVzc2FnZShlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZU51bGxNZXNzYWdlJywgdGhpcy5nZXRFbnZlbG9wZUlkKGVudmVsb3BlKSk7XG4gICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICB9XG5cbiAgcHJpdmF0ZSBpc0ludmFsaWRHcm91cERhdGEoXG4gICAgbWVzc2FnZTogUHJvdG8uSURhdGFNZXNzYWdlLFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZVxuICApOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGdyb3VwLCBncm91cFYyIH0gPSBtZXNzYWdlO1xuXG4gICAgaWYgKGdyb3VwKSB7XG4gICAgICBjb25zdCB7IGlkIH0gPSBncm91cDtcbiAgICAgIHN0cmljdEFzc2VydChpZCwgJ0dyb3VwIGRhdGEgaGFzIG5vIGlkJyk7XG4gICAgICBjb25zdCBpc0ludmFsaWQgPSBpZC5ieXRlTGVuZ3RoICE9PSBHUk9VUFYxX0lEX0xFTkdUSDtcblxuICAgICAgaWYgKGlzSW52YWxpZCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnaXNJbnZhbGlkR3JvdXBEYXRhOiBpbnZhbGlkIEdyb3VwVjEgbWVzc2FnZSBmcm9tJyxcbiAgICAgICAgICB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBpc0ludmFsaWQ7XG4gICAgfVxuXG4gICAgaWYgKGdyb3VwVjIpIHtcbiAgICAgIGNvbnN0IHsgbWFzdGVyS2V5IH0gPSBncm91cFYyO1xuICAgICAgc3RyaWN0QXNzZXJ0KG1hc3RlcktleSwgJ0dyb3VwIHYyIGRhdGEgaGFzIG5vIG1hc3RlcktleScpO1xuICAgICAgY29uc3QgaXNJbnZhbGlkID0gbWFzdGVyS2V5LmJ5dGVMZW5ndGggIT09IE1BU1RFUl9LRVlfTEVOR1RIO1xuXG4gICAgICBpZiAoaXNJbnZhbGlkKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdpc0ludmFsaWRHcm91cERhdGE6IGludmFsaWQgR3JvdXBWMiBtZXNzYWdlIGZyb20nLFxuICAgICAgICAgIHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSlcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBpc0ludmFsaWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcHJpdmF0ZSBkZXJpdmVHcm91cFYyRnJvbVYxKGdyb3VwSWQ6IFVpbnQ4QXJyYXkpOiBzdHJpbmcge1xuICAgIGlmIChncm91cElkLmJ5dGVMZW5ndGggIT09IEdST1VQVjFfSURfTEVOR1RIKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBkZXJpdmVHcm91cFYyRnJvbVYxOiBoYWQgaWQgd2l0aCB3cm9uZyBieXRlTGVuZ3RoOiAke2dyb3VwSWQuYnl0ZUxlbmd0aH1gXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBtYXN0ZXJLZXkgPSBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShncm91cElkKTtcbiAgICBjb25zdCBkYXRhID0gZGVyaXZlR3JvdXBGaWVsZHMobWFzdGVyS2V5KTtcblxuICAgIHJldHVybiBCeXRlcy50b0Jhc2U2NChkYXRhLmlkKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2hlY2tHcm91cFYxRGF0YShcbiAgICBtZXNzYWdlOiBSZWFkb25seTxQcm90by5JRGF0YU1lc3NhZ2U+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgZ3JvdXAgfSA9IG1lc3NhZ2U7XG5cbiAgICBpZiAoIWdyb3VwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFncm91cC5pZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdkZXJpdmVHcm91cFYxRGF0YTogaGFkIGZhbHNleSBpZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgaWQgfSA9IGdyb3VwO1xuICAgIGlmIChpZC5ieXRlTGVuZ3RoICE9PSBHUk9VUFYxX0lEX0xFTkdUSCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZGVyaXZlR3JvdXBWMURhdGE6IGhhZCBpZCB3aXRoIHdyb25nIGJ5dGVMZW5ndGg6ICR7aWQuYnl0ZUxlbmd0aH1gXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgZ2V0UHJvY2Vzc2VkR3JvdXBJZChcbiAgICBtZXNzYWdlOiBQcm9jZXNzZWREYXRhTWVzc2FnZVxuICApOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmIChtZXNzYWdlLmdyb3VwVjIpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmdyb3VwVjIuaWQ7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLmdyb3VwICYmIG1lc3NhZ2UuZ3JvdXAuaWQpIHtcbiAgICAgIHJldHVybiBtZXNzYWdlLmdyb3VwLmlkO1xuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRHcm91cElkKG1lc3NhZ2U6IFByb3RvLklEYXRhTWVzc2FnZSk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgaWYgKG1lc3NhZ2UuZ3JvdXBWMikge1xuICAgICAgc3RyaWN0QXNzZXJ0KG1lc3NhZ2UuZ3JvdXBWMi5tYXN0ZXJLZXksICdNaXNzaW5nIGdyb3VwVjIubWFzdGVyS2V5Jyk7XG4gICAgICBjb25zdCB7IGlkIH0gPSBkZXJpdmVHcm91cEZpZWxkcyhtZXNzYWdlLmdyb3VwVjIubWFzdGVyS2V5KTtcbiAgICAgIHJldHVybiBCeXRlcy50b0Jhc2U2NChpZCk7XG4gICAgfVxuICAgIGlmIChtZXNzYWdlLmdyb3VwICYmIG1lc3NhZ2UuZ3JvdXAuaWQpIHtcbiAgICAgIHJldHVybiBCeXRlcy50b0JpbmFyeShtZXNzYWdlLmdyb3VwLmlkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXREZXN0aW5hdGlvbihzZW50TWVzc2FnZTogUHJvdG8uU3luY01lc3NhZ2UuSVNlbnQpIHtcbiAgICBpZiAoc2VudE1lc3NhZ2UubWVzc2FnZSAmJiBzZW50TWVzc2FnZS5tZXNzYWdlLmdyb3VwVjIpIHtcbiAgICAgIHJldHVybiBgZ3JvdXB2Migke3RoaXMuZ2V0R3JvdXBJZChzZW50TWVzc2FnZS5tZXNzYWdlKX0pYDtcbiAgICB9XG4gICAgaWYgKHNlbnRNZXNzYWdlLm1lc3NhZ2UgJiYgc2VudE1lc3NhZ2UubWVzc2FnZS5ncm91cCkge1xuICAgICAgc3RyaWN0QXNzZXJ0KHNlbnRNZXNzYWdlLm1lc3NhZ2UuZ3JvdXAuaWQsICdncm91cCB3aXRob3V0IGlkJyk7XG4gICAgICByZXR1cm4gYGdyb3VwKCR7dGhpcy5nZXRHcm91cElkKHNlbnRNZXNzYWdlLm1lc3NhZ2UpfSlgO1xuICAgIH1cbiAgICByZXR1cm4gc2VudE1lc3NhZ2UuZGVzdGluYXRpb24gfHwgc2VudE1lc3NhZ2UuZGVzdGluYXRpb25VdWlkO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTeW5jTWVzc2FnZShcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgc3luY01lc3NhZ2U6IFByb2Nlc3NlZFN5bmNNZXNzYWdlXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG91ck51bWJlciA9IHRoaXMuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgIGNvbnN0IG91clV1aWQgPSB0aGlzLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3QgZnJvbVNlbGZTb3VyY2UgPSBlbnZlbG9wZS5zb3VyY2UgJiYgZW52ZWxvcGUuc291cmNlID09PSBvdXJOdW1iZXI7XG4gICAgY29uc3QgZnJvbVNlbGZTb3VyY2VVdWlkID1cbiAgICAgIGVudmVsb3BlLnNvdXJjZVV1aWQgJiYgZW52ZWxvcGUuc291cmNlVXVpZCA9PT0gb3VyVXVpZC50b1N0cmluZygpO1xuICAgIGlmICghZnJvbVNlbGZTb3VyY2UgJiYgIWZyb21TZWxmU291cmNlVXVpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCBzeW5jIG1lc3NhZ2UgZnJvbSBhbm90aGVyIG51bWJlcicpO1xuICAgIH1cblxuICAgIGNvbnN0IG91ckRldmljZUlkID0gdGhpcy5zdG9yYWdlLnVzZXIuZ2V0RGV2aWNlSWQoKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgZXFlcWVxXG4gICAgaWYgKGVudmVsb3BlLnNvdXJjZURldmljZSA9PSBvdXJEZXZpY2VJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdSZWNlaXZlZCBzeW5jIG1lc3NhZ2UgZnJvbSBvdXIgb3duIGRldmljZScpO1xuICAgIH1cbiAgICBpZiAoc3luY01lc3NhZ2Uuc2VudCkge1xuICAgICAgY29uc3Qgc2VudE1lc3NhZ2UgPSBzeW5jTWVzc2FnZS5zZW50O1xuXG4gICAgICBpZiAoIXNlbnRNZXNzYWdlIHx8ICFzZW50TWVzc2FnZS5tZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVN5bmNNZXNzYWdlOiBzeW5jIHNlbnQgbWVzc2FnZSB3YXMgbWlzc2luZyBtZXNzYWdlJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAodGhpcy5pc0ludmFsaWRHcm91cERhdGEoc2VudE1lc3NhZ2UubWVzc2FnZSwgZW52ZWxvcGUpKSB7XG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5jaGVja0dyb3VwVjFEYXRhKHNlbnRNZXNzYWdlLm1lc3NhZ2UpO1xuXG4gICAgICBzdHJpY3RBc3NlcnQoc2VudE1lc3NhZ2UudGltZXN0YW1wLCAnc2VudCBtZXNzYWdlIHdpdGhvdXQgdGltZXN0YW1wJyk7XG5cbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnc2VudCBtZXNzYWdlIHRvJyxcbiAgICAgICAgdGhpcy5nZXREZXN0aW5hdGlvbihzZW50TWVzc2FnZSksXG4gICAgICAgIHNlbnRNZXNzYWdlLnRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgICAgJ2Zyb20nLFxuICAgICAgICB0aGlzLmdldEVudmVsb3BlSWQoZW52ZWxvcGUpXG4gICAgICApO1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU2VudE1lc3NhZ2UoZW52ZWxvcGUsIHNlbnRNZXNzYWdlKTtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLmNvbnRhY3RzKSB7XG4gICAgICB0aGlzLmhhbmRsZUNvbnRhY3RzKGVudmVsb3BlLCBzeW5jTWVzc2FnZS5jb250YWN0cyk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoc3luY01lc3NhZ2UuZ3JvdXBzKSB7XG4gICAgICB0aGlzLmhhbmRsZUdyb3VwcyhlbnZlbG9wZSwgc3luY01lc3NhZ2UuZ3JvdXBzKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGlmIChzeW5jTWVzc2FnZS5ibG9ja2VkKSB7XG4gICAgICByZXR1cm4gdGhpcy5oYW5kbGVCbG9ja2VkKGVudmVsb3BlLCBzeW5jTWVzc2FnZS5ibG9ja2VkKTtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLnJlcXVlc3QpIHtcbiAgICAgIGxvZy5pbmZvKCdHb3QgU3luY01lc3NhZ2UgUmVxdWVzdCcpO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLnJlYWQgJiYgc3luY01lc3NhZ2UucmVhZC5sZW5ndGgpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVJlYWQoZW52ZWxvcGUsIHN5bmNNZXNzYWdlLnJlYWQpO1xuICAgIH1cbiAgICBpZiAoc3luY01lc3NhZ2UudmVyaWZpZWQpIHtcbiAgICAgIGxvZy5pbmZvKCdHb3QgdmVyaWZpZWQgc3luYyBtZXNzYWdlLCBkcm9wcGluZycpO1xuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLmNvbmZpZ3VyYXRpb24pIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUNvbmZpZ3VyYXRpb24oZW52ZWxvcGUsIHN5bmNNZXNzYWdlLmNvbmZpZ3VyYXRpb24pO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBzeW5jTWVzc2FnZS5zdGlja2VyUGFja09wZXJhdGlvbiAmJlxuICAgICAgc3luY01lc3NhZ2Uuc3RpY2tlclBhY2tPcGVyYXRpb24ubGVuZ3RoID4gMFxuICAgICkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlU3RpY2tlclBhY2tPcGVyYXRpb24oXG4gICAgICAgIGVudmVsb3BlLFxuICAgICAgICBzeW5jTWVzc2FnZS5zdGlja2VyUGFja09wZXJhdGlvblxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLnZpZXdPbmNlT3Blbikge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVmlld09uY2VPcGVuKGVudmVsb3BlLCBzeW5jTWVzc2FnZS52aWV3T25jZU9wZW4pO1xuICAgIH1cbiAgICBpZiAoc3luY01lc3NhZ2UubWVzc2FnZVJlcXVlc3RSZXNwb25zZSkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlTWVzc2FnZVJlcXVlc3RSZXNwb25zZShcbiAgICAgICAgZW52ZWxvcGUsXG4gICAgICAgIHN5bmNNZXNzYWdlLm1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VcbiAgICAgICk7XG4gICAgfVxuICAgIGlmIChzeW5jTWVzc2FnZS5mZXRjaExhdGVzdCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlRmV0Y2hMYXRlc3QoZW52ZWxvcGUsIHN5bmNNZXNzYWdlLmZldGNoTGF0ZXN0KTtcbiAgICB9XG4gICAgaWYgKHN5bmNNZXNzYWdlLmtleXMpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZUtleXMoZW52ZWxvcGUsIHN5bmNNZXNzYWdlLmtleXMpO1xuICAgIH1cbiAgICBpZiAoc3luY01lc3NhZ2UucG5pSWRlbnRpdHkpIHtcbiAgICAgIHJldHVybiB0aGlzLmhhbmRsZVBOSUlkZW50aXR5KGVudmVsb3BlLCBzeW5jTWVzc2FnZS5wbmlJZGVudGl0eSk7XG4gICAgfVxuICAgIGlmIChzeW5jTWVzc2FnZS52aWV3ZWQgJiYgc3luY01lc3NhZ2Uudmlld2VkLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIHRoaXMuaGFuZGxlVmlld2VkKGVudmVsb3BlLCBzeW5jTWVzc2FnZS52aWV3ZWQpO1xuICAgIH1cblxuICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlKGVudmVsb3BlKTtcbiAgICBsb2cud2FybihcbiAgICAgIGBoYW5kbGVTeW5jTWVzc2FnZS8ke3RoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSl9OiBHb3QgZW1wdHkgU3luY01lc3NhZ2VgXG4gICAgKTtcbiAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUNvbmZpZ3VyYXRpb24oXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIGNvbmZpZ3VyYXRpb246IFByb3RvLlN5bmNNZXNzYWdlLklDb25maWd1cmF0aW9uXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdnb3QgY29uZmlndXJhdGlvbiBzeW5jIG1lc3NhZ2UnKTtcbiAgICBjb25zdCBldiA9IG5ldyBDb25maWd1cmF0aW9uRXZlbnQoXG4gICAgICBjb25maWd1cmF0aW9uLFxuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUuYmluZCh0aGlzLCBlbnZlbG9wZSlcbiAgICApO1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoQW5kV2FpdChldik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVZpZXdPbmNlT3BlbihcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgc3luYzogUHJvdG8uU3luY01lc3NhZ2UuSVZpZXdPbmNlT3BlblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnZ290IHZpZXcgb25jZSBvcGVuIHN5bmMgbWVzc2FnZScpO1xuXG4gICAgY29uc3QgZXYgPSBuZXcgVmlld09uY2VPcGVuU3luY0V2ZW50KFxuICAgICAge1xuICAgICAgICBzb3VyY2U6IGRyb3BOdWxsKHN5bmMuc2VuZGVyKSxcbiAgICAgICAgc291cmNlVXVpZDogc3luYy5zZW5kZXJVdWlkXG4gICAgICAgICAgPyBub3JtYWxpemVVdWlkKHN5bmMuc2VuZGVyVXVpZCwgJ2hhbmRsZVZpZXdPbmNlT3Blbi5zZW5kZXJVdWlkJylcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgdGltZXN0YW1wOiBzeW5jLnRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgIH0sXG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaEFuZFdhaXQoZXYpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBzeW5jOiBQcm90by5TeW5jTWVzc2FnZS5JTWVzc2FnZVJlcXVlc3RSZXNwb25zZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnZ290IG1lc3NhZ2UgcmVxdWVzdCByZXNwb25zZSBzeW5jIG1lc3NhZ2UnKTtcblxuICAgIGNvbnN0IHsgZ3JvdXBJZCB9ID0gc3luYztcblxuICAgIGxldCBncm91cElkU3RyaW5nOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgbGV0IGdyb3VwVjJJZFN0cmluZzogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlmIChncm91cElkICYmIGdyb3VwSWQuYnl0ZUxlbmd0aCA+IDApIHtcbiAgICAgIGlmIChncm91cElkLmJ5dGVMZW5ndGggPT09IEdST1VQVjFfSURfTEVOR1RIKSB7XG4gICAgICAgIGdyb3VwSWRTdHJpbmcgPSBCeXRlcy50b0JpbmFyeShncm91cElkKTtcbiAgICAgICAgZ3JvdXBWMklkU3RyaW5nID0gdGhpcy5kZXJpdmVHcm91cFYyRnJvbVYxKGdyb3VwSWQpO1xuICAgICAgfSBlbHNlIGlmIChncm91cElkLmJ5dGVMZW5ndGggPT09IEdST1VQVjJfSURfTEVOR1RIKSB7XG4gICAgICAgIGdyb3VwVjJJZFN0cmluZyA9IEJ5dGVzLnRvQmFzZTY0KGdyb3VwSWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuICAgICAgICBsb2cuZXJyb3IoJ1JlY2VpdmVkIG1lc3NhZ2UgcmVxdWVzdCB3aXRoIGludmFsaWQgZ3JvdXBJZCcpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGV2ID0gbmV3IE1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VFdmVudChcbiAgICAgIHtcbiAgICAgICAgdGhyZWFkRTE2NDogZHJvcE51bGwoc3luYy50aHJlYWRFMTY0KSxcbiAgICAgICAgdGhyZWFkVXVpZDogc3luYy50aHJlYWRVdWlkXG4gICAgICAgICAgPyBub3JtYWxpemVVdWlkKFxuICAgICAgICAgICAgICBzeW5jLnRocmVhZFV1aWQsXG4gICAgICAgICAgICAgICdoYW5kbGVNZXNzYWdlUmVxdWVzdFJlc3BvbnNlLnRocmVhZFV1aWQnXG4gICAgICAgICAgICApXG4gICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlOiBzeW5jLnR5cGUsXG4gICAgICAgIGdyb3VwSWQ6IGdyb3VwSWRTdHJpbmcsXG4gICAgICAgIGdyb3VwVjJJZDogZ3JvdXBWMklkU3RyaW5nLFxuICAgICAgfSxcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlLmJpbmQodGhpcywgZW52ZWxvcGUpXG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoQW5kV2FpdChldik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUZldGNoTGF0ZXN0KFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBzeW5jOiBQcm90by5TeW5jTWVzc2FnZS5JRmV0Y2hMYXRlc3RcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ2dvdCBmZXRjaCBsYXRlc3Qgc3luYyBtZXNzYWdlJyk7XG5cbiAgICBjb25zdCBldiA9IG5ldyBGZXRjaExhdGVzdEV2ZW50KFxuICAgICAgc3luYy50eXBlLFxuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUuYmluZCh0aGlzLCBlbnZlbG9wZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlS2V5cyhcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgc3luYzogUHJvdG8uU3luY01lc3NhZ2UuSUtleXNcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ2dvdCBrZXlzIHN5bmMgbWVzc2FnZScpO1xuXG4gICAgaWYgKCFzeW5jLnN0b3JhZ2VTZXJ2aWNlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGV2ID0gbmV3IEtleXNFdmVudChcbiAgICAgIHN5bmMuc3RvcmFnZVNlcnZpY2UsXG4gICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICk7XG5cbiAgICByZXR1cm4gdGhpcy5kaXNwYXRjaEFuZFdhaXQoZXYpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVQTklJZGVudGl0eShcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgeyBwdWJsaWNLZXksIHByaXZhdGVLZXkgfTogUHJvdG8uU3luY01lc3NhZ2UuSVBuaUlkZW50aXR5XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXI6IGdvdCBwbmkgaWRlbnRpdHkgc3luYyBtZXNzYWdlJyk7XG5cbiAgICBpZiAoIXB1YmxpY0tleSB8fCAhcHJpdmF0ZUtleSkge1xuICAgICAgbG9nLndhcm4oJ01lc3NhZ2VSZWNlaXZlcjogZW1wdHkgcG5pIGlkZW50aXR5IHN5bmMgbWVzc2FnZScpO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBldiA9IG5ldyBQTklJZGVudGl0eUV2ZW50KFxuICAgICAgeyBwdWJsaWNLZXksIHByaXZhdGVLZXkgfSxcbiAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlLmJpbmQodGhpcywgZW52ZWxvcGUpXG4gICAgKTtcblxuICAgIGlmICh0aGlzLmlzRW1wdGllZCkge1xuICAgICAgbG9nLmluZm8oJ01lc3NhZ2VSZWNlaXZlcjogZW1pdHRpbmcgcG5pIGlkZW50aXR5IHN5bmMgbWVzc2FnZScpO1xuICAgICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgICB9XG5cbiAgICBsb2cuaW5mbygnTWVzc2FnZVJlY2VpdmVyOiBzY2hlZHVsaW5nIHBuaSBpZGVudGl0eSBzeW5jIG1lc3NhZ2UnKTtcbiAgICB0aGlzLnBlbmRpbmdQTklJZGVudGl0eUV2ZW50Py5jb25maXJtKCk7XG4gICAgdGhpcy5wZW5kaW5nUE5JSWRlbnRpdHlFdmVudCA9IGV2O1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVTdGlja2VyUGFja09wZXJhdGlvbihcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgb3BlcmF0aW9uczogQXJyYXk8UHJvdG8uU3luY01lc3NhZ2UuSVN0aWNrZXJQYWNrT3BlcmF0aW9uPlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBFTlVNID0gUHJvdG8uU3luY01lc3NhZ2UuU3RpY2tlclBhY2tPcGVyYXRpb24uVHlwZTtcbiAgICBsb2cuaW5mbygnZ290IHN0aWNrZXIgcGFjayBvcGVyYXRpb24gc3luYyBtZXNzYWdlJyk7XG5cbiAgICBjb25zdCBzdGlja2VyUGFja3MgPSBvcGVyYXRpb25zLm1hcChvcGVyYXRpb24gPT4gKHtcbiAgICAgIGlkOiBvcGVyYXRpb24ucGFja0lkID8gQnl0ZXMudG9IZXgob3BlcmF0aW9uLnBhY2tJZCkgOiB1bmRlZmluZWQsXG4gICAgICBrZXk6IG9wZXJhdGlvbi5wYWNrS2V5ID8gQnl0ZXMudG9CYXNlNjQob3BlcmF0aW9uLnBhY2tLZXkpIDogdW5kZWZpbmVkLFxuICAgICAgaXNJbnN0YWxsOiBvcGVyYXRpb24udHlwZSA9PT0gRU5VTS5JTlNUQUxMLFxuICAgICAgaXNSZW1vdmU6IG9wZXJhdGlvbi50eXBlID09PSBFTlVNLlJFTU9WRSxcbiAgICB9KSk7XG5cbiAgICBjb25zdCBldiA9IG5ldyBTdGlja2VyUGFja0V2ZW50KFxuICAgICAgc3RpY2tlclBhY2tzLFxuICAgICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUuYmluZCh0aGlzLCBlbnZlbG9wZSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlUmVhZChcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgcmVhZDogQXJyYXk8UHJvdG8uU3luY01lc3NhZ2UuSVJlYWQ+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXIuaGFuZGxlUmVhZCcsIHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSkpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBmb3IgKGNvbnN0IHsgdGltZXN0YW1wLCBzZW5kZXIsIHNlbmRlclV1aWQgfSBvZiByZWFkKSB7XG4gICAgICBjb25zdCBldiA9IG5ldyBSZWFkU3luY0V2ZW50KFxuICAgICAgICB7XG4gICAgICAgICAgZW52ZWxvcGVUaW1lc3RhbXA6IGVudmVsb3BlLnRpbWVzdGFtcCxcbiAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgICAgICBzZW5kZXI6IGRyb3BOdWxsKHNlbmRlciksXG4gICAgICAgICAgc2VuZGVyVXVpZDogc2VuZGVyVXVpZFxuICAgICAgICAgICAgPyBub3JtYWxpemVVdWlkKHNlbmRlclV1aWQsICdoYW5kbGVSZWFkLnNlbmRlclV1aWQnKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICAgIHRoaXMucmVtb3ZlRnJvbUNhY2hlLmJpbmQodGhpcywgZW52ZWxvcGUpXG4gICAgICApO1xuICAgICAgcmVzdWx0cy5wdXNoKHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGV2KSk7XG4gICAgfVxuICAgIGF3YWl0IFByb21pc2UuYWxsKHJlc3VsdHMpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVWaWV3ZWQoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIHZpZXdlZDogUmVhZG9ubHlBcnJheTxQcm90by5TeW5jTWVzc2FnZS5JVmlld2VkPlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnTWVzc2FnZVJlY2VpdmVyLmhhbmRsZVZpZXdlZCcsIHRoaXMuZ2V0RW52ZWxvcGVJZChlbnZlbG9wZSkpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgdmlld2VkLm1hcChhc3luYyAoeyB0aW1lc3RhbXAsIHNlbmRlckUxNjQsIHNlbmRlclV1aWQgfSkgPT4ge1xuICAgICAgICBjb25zdCBldiA9IG5ldyBWaWV3U3luY0V2ZW50KFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVudmVsb3BlVGltZXN0YW1wOiBlbnZlbG9wZS50aW1lc3RhbXAsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcD8udG9OdW1iZXIoKSxcbiAgICAgICAgICAgIHNlbmRlckUxNjQ6IGRyb3BOdWxsKHNlbmRlckUxNjQpLFxuICAgICAgICAgICAgc2VuZGVyVXVpZDogc2VuZGVyVXVpZFxuICAgICAgICAgICAgICA/IG5vcm1hbGl6ZVV1aWQoc2VuZGVyVXVpZCwgJ2hhbmRsZVZpZXdlZC5zZW5kZXJVdWlkJylcbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB0aGlzLnJlbW92ZUZyb21DYWNoZS5iaW5kKHRoaXMsIGVudmVsb3BlKVxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB0aGlzLmRpc3BhdGNoQW5kV2FpdChldik7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUNvbnRhY3RzKFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBjb250YWN0czogUHJvdG8uU3luY01lc3NhZ2UuSUNvbnRhY3RzXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdNZXNzYWdlUmVjZWl2ZXI6IGhhbmRsZUNvbnRhY3RzJyk7XG4gICAgY29uc3QgeyBibG9iIH0gPSBjb250YWN0cztcbiAgICBpZiAoIWJsb2IpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWVzc2FnZVJlY2VpdmVyLmhhbmRsZUNvbnRhY3RzOiBibG9iIGZpZWxkIHdhcyBtaXNzaW5nJyk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuXG4gICAgLy8gTm90ZTogd2UgZG8gbm90IHJldHVybiBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0byBibG9jayB0aGUgbmV4dCBtZXNzYWdlIG9uXG4gICAgLy8gICB0aGlzIGF0dGFjaG1lbnQgZG93bmxvYWQgYW5kIGEgbG90IG9mIHByb2Nlc3Npbmcgb2YgdGhhdCBhdHRhY2htZW50LlxuICAgIGNvbnN0IGF0dGFjaG1lbnRQb2ludGVyID0gYXdhaXQgdGhpcy5oYW5kbGVBdHRhY2htZW50KGJsb2IpO1xuICAgIGNvbnN0IHJlc3VsdHMgPSBbXTtcbiAgICBjb25zdCBjb250YWN0QnVmZmVyID0gbmV3IENvbnRhY3RCdWZmZXIoYXR0YWNobWVudFBvaW50ZXIuZGF0YSk7XG4gICAgbGV0IGNvbnRhY3REZXRhaWxzID0gY29udGFjdEJ1ZmZlci5uZXh0KCk7XG4gICAgd2hpbGUgKGNvbnRhY3REZXRhaWxzICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGNvbnN0IGNvbnRhY3RFdmVudCA9IG5ldyBDb250YWN0RXZlbnQoXG4gICAgICAgIGNvbnRhY3REZXRhaWxzLFxuICAgICAgICBlbnZlbG9wZS5yZWNlaXZlZEF0Q291bnRlclxuICAgICAgKTtcbiAgICAgIHJlc3VsdHMucHVzaCh0aGlzLmRpc3BhdGNoQW5kV2FpdChjb250YWN0RXZlbnQpKTtcblxuICAgICAgY29udGFjdERldGFpbHMgPSBjb250YWN0QnVmZmVyLm5leHQoKTtcbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyZXN1bHRzKTtcblxuICAgIGNvbnN0IGZpbmFsRXZlbnQgPSBuZXcgQ29udGFjdFN5bmNFdmVudCgpO1xuICAgIGF3YWl0IHRoaXMuZGlzcGF0Y2hBbmRXYWl0KGZpbmFsRXZlbnQpO1xuXG4gICAgbG9nLmluZm8oJ2hhbmRsZUNvbnRhY3RzOiBmaW5pc2hlZCcpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVHcm91cHMoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIGdyb3VwczogUHJvdG8uU3luY01lc3NhZ2UuSUdyb3Vwc1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnZ3JvdXAgc3luYycpO1xuICAgIGNvbnN0IHsgYmxvYiB9ID0gZ3JvdXBzO1xuXG4gICAgdGhpcy5yZW1vdmVGcm9tQ2FjaGUoZW52ZWxvcGUpO1xuXG4gICAgaWYgKCFibG9iKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01lc3NhZ2VSZWNlaXZlci5oYW5kbGVHcm91cHM6IGJsb2IgZmllbGQgd2FzIG1pc3NpbmcnKTtcbiAgICB9XG5cbiAgICAvLyBOb3RlOiB3ZSBkbyBub3QgcmV0dXJuIGhlcmUgYmVjYXVzZSB3ZSBkb24ndCB3YW50IHRvIGJsb2NrIHRoZSBuZXh0IG1lc3NhZ2Ugb25cbiAgICAvLyAgIHRoaXMgYXR0YWNobWVudCBkb3dubG9hZCBhbmQgYSBsb3Qgb2YgcHJvY2Vzc2luZyBvZiB0aGF0IGF0dGFjaG1lbnQuXG4gICAgY29uc3QgYXR0YWNobWVudFBvaW50ZXIgPSBhd2FpdCB0aGlzLmhhbmRsZUF0dGFjaG1lbnQoYmxvYik7XG4gICAgY29uc3QgZ3JvdXBCdWZmZXIgPSBuZXcgR3JvdXBCdWZmZXIoYXR0YWNobWVudFBvaW50ZXIuZGF0YSk7XG4gICAgbGV0IGdyb3VwRGV0YWlscyA9IGdyb3VwQnVmZmVyLm5leHQoKTtcbiAgICBjb25zdCBwcm9taXNlcyA9IFtdO1xuICAgIHdoaWxlIChncm91cERldGFpbHMpIHtcbiAgICAgIGNvbnN0IHsgaWQgfSA9IGdyb3VwRGV0YWlscztcbiAgICAgIHN0cmljdEFzc2VydChpZCwgJ0dyb3VwIGRldGFpbHMgd2l0aG91dCBpZCcpO1xuXG4gICAgICBpZiAoaWQuYnl0ZUxlbmd0aCAhPT0gMTYpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGBvbkdyb3VwUmVjZWl2ZWQ6IElkIHdhcyAke2lkfSBieXRlcywgZXhwZWN0ZWQgMTYgYnl0ZXMuIERyb3BwaW5nIGdyb3VwLmBcbiAgICAgICAgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGV2ID0gbmV3IEdyb3VwRXZlbnQoXG4gICAgICAgIHtcbiAgICAgICAgICAuLi5ncm91cERldGFpbHMsXG4gICAgICAgICAgaWQ6IEJ5dGVzLnRvQmluYXJ5KGlkKSxcbiAgICAgICAgfSxcbiAgICAgICAgZW52ZWxvcGUucmVjZWl2ZWRBdENvdW50ZXJcbiAgICAgICk7XG4gICAgICBjb25zdCBwcm9taXNlID0gdGhpcy5kaXNwYXRjaEFuZFdhaXQoZXYpLmNhdGNoKGUgPT4ge1xuICAgICAgICBsb2cuZXJyb3IoJ2Vycm9yIHByb2Nlc3NpbmcgZ3JvdXAnLCBlKTtcbiAgICAgIH0pO1xuICAgICAgZ3JvdXBEZXRhaWxzID0gZ3JvdXBCdWZmZXIubmV4dCgpO1xuICAgICAgcHJvbWlzZXMucHVzaChwcm9taXNlKTtcbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgICBjb25zdCBldiA9IG5ldyBHcm91cFN5bmNFdmVudCgpO1xuICAgIHJldHVybiB0aGlzLmRpc3BhdGNoQW5kV2FpdChldik7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUJsb2NrZWQoXG4gICAgZW52ZWxvcGU6IFByb2Nlc3NlZEVudmVsb3BlLFxuICAgIGJsb2NrZWQ6IFByb3RvLlN5bmNNZXNzYWdlLklCbG9ja2VkXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGFsbElkZW50aWZpZXJzID0gW107XG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcblxuICAgIGlmIChibG9ja2VkLm51bWJlcnMpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5zdG9yYWdlLmdldCgnYmxvY2tlZCcsIFtdKTtcblxuICAgICAgbG9nLmluZm8oJ2hhbmRsZUJsb2NrZWQ6IEJsb2NraW5nIHRoZXNlIG51bWJlcnM6JywgYmxvY2tlZC5udW1iZXJzKTtcbiAgICAgIGF3YWl0IHRoaXMuc3RvcmFnZS5wdXQoJ2Jsb2NrZWQnLCBibG9ja2VkLm51bWJlcnMpO1xuXG4gICAgICBpZiAoIWFyZUFycmF5c01hdGNoaW5nU2V0cyhwcmV2aW91cywgYmxvY2tlZC5udW1iZXJzKSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgYWxsSWRlbnRpZmllcnMucHVzaCguLi5wcmV2aW91cyk7XG4gICAgICAgIGFsbElkZW50aWZpZXJzLnB1c2goLi4uYmxvY2tlZC5udW1iZXJzKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGJsb2NrZWQudXVpZHMpIHtcbiAgICAgIGNvbnN0IHByZXZpb3VzID0gdGhpcy5zdG9yYWdlLmdldCgnYmxvY2tlZC11dWlkcycsIFtdKTtcbiAgICAgIGNvbnN0IHV1aWRzID0gYmxvY2tlZC51dWlkcy5tYXAoKHV1aWQsIGluZGV4KSA9PiB7XG4gICAgICAgIHJldHVybiBub3JtYWxpemVVdWlkKHV1aWQsIGBoYW5kbGVCbG9ja2VkLnV1aWRzLiR7aW5kZXh9YCk7XG4gICAgICB9KTtcbiAgICAgIGxvZy5pbmZvKCdoYW5kbGVCbG9ja2VkOiBCbG9ja2luZyB0aGVzZSB1dWlkczonLCB1dWlkcyk7XG4gICAgICBhd2FpdCB0aGlzLnN0b3JhZ2UucHV0KCdibG9ja2VkLXV1aWRzJywgdXVpZHMpO1xuXG4gICAgICBpZiAoIWFyZUFycmF5c01hdGNoaW5nU2V0cyhwcmV2aW91cywgdXVpZHMpKSB7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICBhbGxJZGVudGlmaWVycy5wdXNoKC4uLnByZXZpb3VzKTtcbiAgICAgICAgYWxsSWRlbnRpZmllcnMucHVzaCguLi5ibG9ja2VkLnV1aWRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoYmxvY2tlZC5ncm91cElkcykge1xuICAgICAgY29uc3QgcHJldmlvdXMgPSB0aGlzLnN0b3JhZ2UuZ2V0KCdibG9ja2VkLWdyb3VwcycsIFtdKTtcbiAgICAgIGNvbnN0IGdyb3VwVjFJZHM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgICAgIGNvbnN0IGdyb3VwSWRzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgICAgIGJsb2NrZWQuZ3JvdXBJZHMuZm9yRWFjaChncm91cElkID0+IHtcbiAgICAgICAgaWYgKGdyb3VwSWQuYnl0ZUxlbmd0aCA9PT0gR1JPVVBWMV9JRF9MRU5HVEgpIHtcbiAgICAgICAgICBncm91cFYxSWRzLnB1c2goQnl0ZXMudG9CaW5hcnkoZ3JvdXBJZCkpO1xuICAgICAgICAgIGdyb3VwSWRzLnB1c2godGhpcy5kZXJpdmVHcm91cFYyRnJvbVYxKGdyb3VwSWQpKTtcbiAgICAgICAgfSBlbHNlIGlmIChncm91cElkLmJ5dGVMZW5ndGggPT09IEdST1VQVjJfSURfTEVOR1RIKSB7XG4gICAgICAgICAgZ3JvdXBJZHMucHVzaChCeXRlcy50b0Jhc2U2NChncm91cElkKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdoYW5kbGVCbG9ja2VkOiBSZWNlaXZlZCBpbnZhbGlkIGdyb3VwSWQgdmFsdWUnKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ2hhbmRsZUJsb2NrZWQ6IEJsb2NraW5nIHRoZXNlIGdyb3VwcyAtIHYyOicsXG4gICAgICAgIGdyb3VwSWRzLm1hcChncm91cElkID0+IGBncm91cHYyKCR7Z3JvdXBJZH0pYCksXG4gICAgICAgICd2MTonLFxuICAgICAgICBncm91cFYxSWRzLm1hcChncm91cElkID0+IGBncm91cCgke2dyb3VwSWR9KWApXG4gICAgICApO1xuXG4gICAgICBjb25zdCBpZHMgPSBbLi4uZ3JvdXBJZHMsIC4uLmdyb3VwVjFJZHNdO1xuICAgICAgYXdhaXQgdGhpcy5zdG9yYWdlLnB1dCgnYmxvY2tlZC1ncm91cHMnLCBpZHMpO1xuXG4gICAgICBpZiAoIWFyZUFycmF5c01hdGNoaW5nU2V0cyhwcmV2aW91cywgaWRzKSkge1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgYWxsSWRlbnRpZmllcnMucHVzaCguLi5wcmV2aW91cyk7XG4gICAgICAgIGFsbElkZW50aWZpZXJzLnB1c2goLi4uaWRzKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICB0aGlzLnJlbW92ZUZyb21DYWNoZShlbnZlbG9wZSk7XG5cbiAgICBpZiAoY2hhbmdlZCkge1xuICAgICAgbG9nLmluZm8oJ2hhbmRsZUJsb2NrZWQ6IEJsb2NrIGxpc3QgY2hhbmdlZCwgZm9yY2luZyByZS1yZW5kZXIuJyk7XG4gICAgICBjb25zdCB1bmlxdWVJZGVudGlmaWVycyA9IEFycmF5LmZyb20obmV3IFNldChhbGxJZGVudGlmaWVycykpO1xuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZm9yY2VSZXJlbmRlcih1bmlxdWVJZGVudGlmaWVycyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBpc0Jsb2NrZWQobnVtYmVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5zdG9yYWdlLmJsb2NrZWQuaXNCbG9ja2VkKG51bWJlcik7XG4gIH1cblxuICBwcml2YXRlIGlzVXVpZEJsb2NrZWQodXVpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIHRoaXMuc3RvcmFnZS5ibG9ja2VkLmlzVXVpZEJsb2NrZWQodXVpZCk7XG4gIH1cblxuICBwcml2YXRlIGlzR3JvdXBCbG9ja2VkKGdyb3VwSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0aGlzLnN0b3JhZ2UuYmxvY2tlZC5pc0dyb3VwQmxvY2tlZChncm91cElkKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlQXR0YWNobWVudChcbiAgICBhdHRhY2htZW50OiBQcm90by5JQXR0YWNobWVudFBvaW50ZXJcbiAgKTogUHJvbWlzZTxEb3dubG9hZGVkQXR0YWNobWVudFR5cGU+IHtcbiAgICBjb25zdCBjbGVhbmVkID0gcHJvY2Vzc0F0dGFjaG1lbnQoYXR0YWNobWVudCk7XG4gICAgcmV0dXJuIGRvd25sb2FkQXR0YWNobWVudCh0aGlzLnNlcnZlciwgY2xlYW5lZCk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUVuZFNlc3Npb24odGhlaXJVdWlkOiBVVUlEKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oYGhhbmRsZUVuZFNlc3Npb246IGNsb3Npbmcgc2Vzc2lvbnMgZm9yICR7dGhlaXJVdWlkLnRvU3RyaW5nKCl9YCk7XG4gICAgYXdhaXQgdGhpcy5zdG9yYWdlLnByb3RvY29sLmFyY2hpdmVBbGxTZXNzaW9ucyh0aGVpclV1aWQpO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBwcm9jZXNzRGVjcnlwdGVkKFxuICAgIGVudmVsb3BlOiBQcm9jZXNzZWRFbnZlbG9wZSxcbiAgICBkZWNyeXB0ZWQ6IFByb3RvLklEYXRhTWVzc2FnZVxuICApOiBQcm9taXNlPFByb2Nlc3NlZERhdGFNZXNzYWdlPiB7XG4gICAgcmV0dXJuIHByb2Nlc3NEYXRhTWVzc2FnZShkZWNyeXB0ZWQsIGVudmVsb3BlLnRpbWVzdGFtcCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZW52ZWxvcGVUeXBlVG9DaXBoZXJ0ZXh0VHlwZSh0eXBlOiBudW1iZXIgfCB1bmRlZmluZWQpOiBudW1iZXIge1xuICBjb25zdCB7IFR5cGUgfSA9IFByb3RvLkVudmVsb3BlO1xuXG4gIGlmICh0eXBlID09PSBUeXBlLkNJUEhFUlRFWFQpIHtcbiAgICByZXR1cm4gQ2lwaGVydGV4dE1lc3NhZ2VUeXBlLldoaXNwZXI7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFR5cGUuS0VZX0VYQ0hBTkdFKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2VudmVsb3BlVHlwZVRvQ2lwaGVydGV4dFR5cGU6IENhbm5vdCBwcm9jZXNzIEtFWV9FWENIQU5HRSBtZXNzYWdlcydcbiAgICApO1xuICB9XG4gIGlmICh0eXBlID09PSBUeXBlLlBMQUlOVEVYVF9DT05URU5UKSB7XG4gICAgcmV0dXJuIENpcGhlcnRleHRNZXNzYWdlVHlwZS5QbGFpbnRleHQ7XG4gIH1cbiAgaWYgKHR5cGUgPT09IFR5cGUuUFJFS0VZX0JVTkRMRSkge1xuICAgIHJldHVybiBDaXBoZXJ0ZXh0TWVzc2FnZVR5cGUuUHJlS2V5O1xuICB9XG4gIGlmICh0eXBlID09PSBUeXBlLlJFQ0VJUFQpIHtcbiAgICByZXR1cm4gQ2lwaGVydGV4dE1lc3NhZ2VUeXBlLlBsYWludGV4dDtcbiAgfVxuICBpZiAodHlwZSA9PT0gVHlwZS5VTklERU5USUZJRURfU0VOREVSKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2VudmVsb3BlVHlwZVRvQ2lwaGVydGV4dFR5cGU6IENhbm5vdCBwcm9jZXNzIFVOSURFTlRJRklFRF9TRU5ERVIgbWVzc2FnZXMnXG4gICAgKTtcbiAgfVxuICBpZiAodHlwZSA9PT0gVHlwZS5VTktOT1dOKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2VudmVsb3BlVHlwZVRvQ2lwaGVydGV4dFR5cGU6IENhbm5vdCBwcm9jZXNzIFVOS05PV04gbWVzc2FnZXMnXG4gICAgKTtcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcihgZW52ZWxvcGVUeXBlVG9DaXBoZXJ0ZXh0VHlwZTogVW5rbm93biB0eXBlICR7dHlwZX1gKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxvQkFBeUI7QUFDekIscUJBQW1CO0FBQ25CLGtCQUE4QjtBQU85Qiw4QkFlTztBQUVQLDZCQU1PO0FBQ1AsbUJBQWdDO0FBQ2hDLG9CQUE2QjtBQUU3QixxQkFBOEI7QUFDOUIsc0JBQXlCO0FBQ3pCLDJCQUE4QjtBQUM5Qiw2QkFBZ0M7QUFDaEMscUNBQXdDO0FBQ3hDLGtCQUFxQjtBQUNyQixvQkFBMkM7QUFFM0MscUJBQXdCO0FBQ3hCLDhCQUFpQztBQUVqQyxrQkFBK0I7QUFDL0IsYUFBd0I7QUFDeEIsMEJBQTBCO0FBRTFCLHNC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
