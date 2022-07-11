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
var storage_exports = {};
__export(storage_exports, {
  enableStorageService: () => enableStorageService,
  eraseAllStorageServiceState: () => eraseAllStorageServiceState,
  runStorageServiceSyncJob: () => runStorageServiceSyncJob,
  storageServiceUploadJob: () => storageServiceUploadJob
});
module.exports = __toCommonJS(storage_exports);
var import_lodash = require("lodash");
var import_p_map = __toESM(require("p-map"));
var import_long = __toESM(require("long"));
var import_Client = __toESM(require("../sql/Client"));
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_storageRecordOps = require("./storageRecordOps");
var import_storageConstants = require("./storageConstants");
var import_assert = require("../util/assert");
var import_dropNull = require("../util/dropNull");
var durations = __toESM(require("../util/durations"));
var import_BackOff = require("../util/BackOff");
var import_JobQueue = require("../util/JobQueue");
var import_sleep = require("../util/sleep");
var import_timestamp = require("../util/timestamp");
var import_ourProfileKey = require("./ourProfileKey");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var Errors = __toESM(require("../types/errors"));
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
const {
  eraseStorageServiceStateFromConversations,
  updateConversation,
  updateConversations
} = import_Client.default;
const uploadBucket = [];
const validRecordTypes = /* @__PURE__ */ new Set([
  0,
  1,
  2,
  3,
  4
]);
const backOff = new import_BackOff.BackOff([
  durations.SECOND,
  5 * durations.SECOND,
  30 * durations.SECOND,
  2 * durations.MINUTE,
  5 * durations.MINUTE
]);
const conflictBackOff = new import_BackOff.BackOff([
  durations.SECOND,
  5 * durations.SECOND,
  30 * durations.SECOND
]);
function redactStorageID(storageID, version, conversation) {
  const convoId = conversation ? ` ${conversation?.idForLogging()}` : "";
  return `${version ?? "?"}:${storageID.substring(0, 3)}${convoId}`;
}
function redactExtendedStorageID({
  storageID,
  storageVersion
}) {
  return redactStorageID(storageID, storageVersion);
}
async function encryptRecord(storageID, storageRecord) {
  const storageItem = new import_protobuf.SignalService.StorageItem();
  const storageKeyBuffer = storageID ? Bytes.fromBase64(String(storageID)) : generateStorageID();
  const storageKeyBase64 = window.storage.get("storageKey");
  if (!storageKeyBase64) {
    throw new Error("No storage key");
  }
  const storageKey = Bytes.fromBase64(storageKeyBase64);
  const storageItemKey = (0, import_Crypto.deriveStorageItemKey)(storageKey, Bytes.toBase64(storageKeyBuffer));
  const encryptedRecord = (0, import_Crypto.encryptProfile)(import_protobuf.SignalService.StorageRecord.encode(storageRecord).finish(), storageItemKey);
  storageItem.key = storageKeyBuffer;
  storageItem.value = encryptedRecord;
  return storageItem;
}
function generateStorageID() {
  return (0, import_Crypto.getRandomBytes)(16);
}
async function generateManifest(version, previousManifest, isNewManifest = false) {
  log.info(`storageService.upload(${version}): generating manifest new=${isNewManifest}`);
  await window.ConversationController.checkForConflicts();
  const ITEM_TYPE = import_protobuf.SignalService.ManifestRecord.Identifier.Type;
  const postUploadUpdateFunctions = [];
  const insertKeys = [];
  const deleteKeys = [];
  const manifestRecordKeys = /* @__PURE__ */ new Set();
  const newItems = /* @__PURE__ */ new Set();
  const conversations = window.getConversations();
  for (let i = 0; i < conversations.length; i += 1) {
    const conversation = conversations.models[i];
    const identifier = new import_protobuf.SignalService.ManifestRecord.Identifier();
    let storageRecord;
    const conversationType = (0, import_whatTypeOfConversation.typeofConversation)(conversation.attributes);
    if (conversationType === import_whatTypeOfConversation.ConversationTypes.Me) {
      storageRecord = new import_protobuf.SignalService.StorageRecord();
      storageRecord.account = await (0, import_storageRecordOps.toAccountRecord)(conversation);
      identifier.type = ITEM_TYPE.ACCOUNT;
    } else if (conversationType === import_whatTypeOfConversation.ConversationTypes.Direct) {
      if (!conversation.get("uuid")) {
        continue;
      }
      const validationError = conversation.validate();
      if (validationError) {
        const droppedID = conversation.get("storageID");
        const droppedVersion = conversation.get("storageVersion");
        if (!droppedID) {
          continue;
        }
        const recordID = redactStorageID(droppedID, droppedVersion, conversation);
        log.warn(`storageService.generateManifest(${version}): skipping contact=${recordID} due to local validation error=${validationError}`);
        conversation.unset("storageID");
        deleteKeys.push(Bytes.fromBase64(droppedID));
        continue;
      }
      storageRecord = new import_protobuf.SignalService.StorageRecord();
      storageRecord.contact = await (0, import_storageRecordOps.toContactRecord)(conversation);
      identifier.type = ITEM_TYPE.CONTACT;
    } else if (conversationType === import_whatTypeOfConversation.ConversationTypes.GroupV2) {
      storageRecord = new import_protobuf.SignalService.StorageRecord();
      storageRecord.groupV2 = await (0, import_storageRecordOps.toGroupV2Record)(conversation);
      identifier.type = ITEM_TYPE.GROUPV2;
    } else if (conversationType === import_whatTypeOfConversation.ConversationTypes.GroupV1) {
      storageRecord = new import_protobuf.SignalService.StorageRecord();
      storageRecord.groupV1 = await (0, import_storageRecordOps.toGroupV1Record)(conversation);
      identifier.type = ITEM_TYPE.GROUPV1;
    } else {
      log.warn(`storageService.upload(${version}): unknown conversation=${conversation.idForLogging()}`);
    }
    if (!storageRecord) {
      continue;
    }
    const currentStorageID = conversation.get("storageID");
    const currentStorageVersion = conversation.get("storageVersion");
    const currentRedactedID = currentStorageID ? redactStorageID(currentStorageID, currentStorageVersion) : void 0;
    const isNewItem = isNewManifest || Boolean(conversation.get("needsStorageServiceSync")) || !currentStorageID;
    const storageID = isNewItem ? Bytes.toBase64(generateStorageID()) : currentStorageID;
    let storageItem;
    try {
      storageItem = await encryptRecord(storageID, storageRecord);
    } catch (err) {
      log.error(`storageService.upload(${version}): encrypt record failed:`, Errors.toLogFormat(err));
      throw err;
    }
    identifier.raw = storageItem.key;
    if (isNewItem) {
      newItems.add(storageItem);
      insertKeys.push(storageID);
      const newRedactedID = redactStorageID(storageID, version, conversation);
      if (currentStorageID) {
        log.info(`storageService.upload(${version}): updating from=${currentRedactedID} to=${newRedactedID}`);
        deleteKeys.push(Bytes.fromBase64(currentStorageID));
      } else {
        log.info(`storageService.upload(${version}): adding key=${newRedactedID}`);
      }
      postUploadUpdateFunctions.push(() => {
        conversation.set({
          needsStorageServiceSync: false,
          storageVersion: version,
          storageID
        });
        updateConversation(conversation.attributes);
      });
    }
    manifestRecordKeys.add(identifier);
  }
  const unknownRecordsArray = (window.storage.get("storage-service-unknown-records") || []).filter((record) => !validRecordTypes.has(record.itemType));
  const redactedUnknowns = unknownRecordsArray.map(redactExtendedStorageID);
  log.info(`storageService.upload(${version}): adding unknown records=${JSON.stringify(redactedUnknowns)} count=${redactedUnknowns.length}`);
  unknownRecordsArray.forEach((record) => {
    const identifier = new import_protobuf.SignalService.ManifestRecord.Identifier();
    identifier.type = record.itemType;
    identifier.raw = Bytes.fromBase64(record.storageID);
    manifestRecordKeys.add(identifier);
  });
  const recordsWithErrors = window.storage.get("storage-service-error-records", new Array());
  const redactedErrors = recordsWithErrors.map(redactExtendedStorageID);
  log.info(`storageService.upload(${version}): adding error records=${JSON.stringify(redactedErrors)} count=${redactedErrors.length}`);
  recordsWithErrors.forEach((record) => {
    const identifier = new import_protobuf.SignalService.ManifestRecord.Identifier();
    identifier.type = record.itemType;
    identifier.raw = Bytes.fromBase64(record.storageID);
    manifestRecordKeys.add(identifier);
  });
  const storedPendingDeletes = window.storage.get("storage-service-pending-deletes", []);
  const redactedPendingDeletes = storedPendingDeletes.map(redactExtendedStorageID);
  log.info(`storageService.upload(${version}): deleting extra keys=${JSON.stringify(redactedPendingDeletes)} count=${redactedPendingDeletes.length}`);
  for (const { storageID } of storedPendingDeletes) {
    deleteKeys.push(Bytes.fromBase64(storageID));
  }
  const rawDuplicates = /* @__PURE__ */ new Set();
  const typeRawDuplicates = /* @__PURE__ */ new Set();
  let hasAccountType = false;
  manifestRecordKeys.forEach((identifier) => {
    (0, import_assert.strictAssert)(identifier.raw, "manifest record key without raw identifier");
    const storageID = Bytes.toBase64(identifier.raw);
    const typeAndRaw = `${identifier.type}+${storageID}`;
    if (rawDuplicates.has(identifier.raw) || typeRawDuplicates.has(typeAndRaw)) {
      log.warn(`storageService.upload(${version}): removing from duplicate item from the manifest`, redactStorageID(storageID), identifier.type);
      manifestRecordKeys.delete(identifier);
    }
    rawDuplicates.add(identifier.raw);
    typeRawDuplicates.add(typeAndRaw);
    const hasDeleteKey = deleteKeys.find((key) => Bytes.toBase64(key) === storageID);
    if (hasDeleteKey) {
      log.warn(`storageService.upload(${version}): removing key which has been deleted`, redactStorageID(storageID), identifier.type);
      manifestRecordKeys.delete(identifier);
    }
    if (identifier.type === ITEM_TYPE.ACCOUNT) {
      if (hasAccountType) {
        log.warn(`storageService.upload(${version}): removing duplicate account`, redactStorageID(storageID));
        manifestRecordKeys.delete(identifier);
      }
      hasAccountType = true;
    }
  });
  rawDuplicates.clear();
  typeRawDuplicates.clear();
  const storageKeyDuplicates = /* @__PURE__ */ new Set();
  newItems.forEach((storageItem) => {
    (0, import_assert.strictAssert)(storageItem.key, "New storage item without key");
    const storageID = Bytes.toBase64(storageItem.key);
    if (storageKeyDuplicates.has(storageID)) {
      log.warn(`storageService.upload(${version}): removing duplicate identifier from inserts`, redactStorageID(storageID));
      newItems.delete(storageItem);
    }
    storageKeyDuplicates.add(storageID);
  });
  storageKeyDuplicates.clear();
  if (previousManifest) {
    const pendingInserts = /* @__PURE__ */ new Set();
    const pendingDeletes = /* @__PURE__ */ new Set();
    const remoteKeys = /* @__PURE__ */ new Set();
    (previousManifest.keys ?? []).forEach((identifier) => {
      (0, import_assert.strictAssert)(identifier.raw, "Identifier without raw field");
      const storageID = Bytes.toBase64(identifier.raw);
      remoteKeys.add(storageID);
    });
    const localKeys = /* @__PURE__ */ new Set();
    manifestRecordKeys.forEach((identifier) => {
      (0, import_assert.strictAssert)(identifier.raw, "Identifier without raw field");
      const storageID = Bytes.toBase64(identifier.raw);
      localKeys.add(storageID);
      if (!remoteKeys.has(storageID)) {
        pendingInserts.add(storageID);
      }
    });
    remoteKeys.forEach((storageID) => {
      if (!localKeys.has(storageID)) {
        pendingDeletes.add(storageID);
      }
    });
    if (deleteKeys.length !== pendingDeletes.size) {
      const localDeletes = deleteKeys.map((key) => redactStorageID(Bytes.toBase64(key)));
      const remoteDeletes = [];
      pendingDeletes.forEach((id) => remoteDeletes.push(redactStorageID(id)));
      log.error(`storageService.upload(${version}): delete key sizes do not match`, "local", localDeletes.join(","), "remote", remoteDeletes.join(","));
      throw new Error("invalid write delete keys length do not match");
    }
    if (newItems.size !== pendingInserts.size) {
      throw new Error("invalid write insert items length do not match");
    }
    deleteKeys.forEach((key) => {
      const storageID = Bytes.toBase64(key);
      if (!pendingDeletes.has(storageID)) {
        throw new Error("invalid write delete key missing from pending deletes");
      }
    });
    insertKeys.forEach((storageID) => {
      if (!pendingInserts.has(storageID)) {
        throw new Error("invalid write insert key missing from pending inserts");
      }
    });
  }
  const manifestRecord = new import_protobuf.SignalService.ManifestRecord();
  manifestRecord.version = import_long.default.fromNumber(version);
  manifestRecord.sourceDevice = window.storage.user.getDeviceId() ?? 0;
  manifestRecord.keys = Array.from(manifestRecordKeys);
  const storageKeyBase64 = window.storage.get("storageKey");
  if (!storageKeyBase64) {
    throw new Error("No storage key");
  }
  const storageKey = Bytes.fromBase64(storageKeyBase64);
  const storageManifestKey = (0, import_Crypto.deriveStorageManifestKey)(storageKey, import_long.default.fromNumber(version));
  const encryptedManifest = (0, import_Crypto.encryptProfile)(import_protobuf.SignalService.ManifestRecord.encode(manifestRecord).finish(), storageManifestKey);
  const storageManifest = new import_protobuf.SignalService.StorageManifest();
  storageManifest.version = manifestRecord.version;
  storageManifest.value = encryptedManifest;
  return {
    postUploadUpdateFunctions,
    deleteKeys,
    newItems,
    storageManifest
  };
}
async function uploadManifest(version, {
  postUploadUpdateFunctions,
  deleteKeys,
  newItems,
  storageManifest
}) {
  if (!window.textsecure.messaging) {
    throw new Error("storageService.uploadManifest: We are offline!");
  }
  if (newItems.size === 0 && deleteKeys.length === 0) {
    log.info(`storageService.upload(${version}): nothing to upload`);
    return;
  }
  const credentials = window.storage.get("storageCredentials");
  try {
    log.info(`storageService.upload(${version}): inserting=${newItems.size} deleting=${deleteKeys.length}`);
    const writeOperation = new import_protobuf.SignalService.WriteOperation();
    writeOperation.manifest = storageManifest;
    writeOperation.insertItem = Array.from(newItems);
    writeOperation.deleteKey = deleteKeys;
    await window.textsecure.messaging.modifyStorageRecords(import_protobuf.SignalService.WriteOperation.encode(writeOperation).finish(), {
      credentials
    });
    log.info(`storageService.upload(${version}): upload complete, updating items=${postUploadUpdateFunctions.length}`);
    postUploadUpdateFunctions.forEach((fn) => fn());
  } catch (err) {
    log.error(`storageService.upload(${version}): failed!`, Errors.toLogFormat(err));
    if (err.code === 409) {
      if (conflictBackOff.isFull()) {
        log.error(`storageService.upload(${version}): exceeded maximum consecutive conflicts`);
        return;
      }
      log.info(`storageService.upload(${version}): conflict found with version=${version}, running sync job times=${conflictBackOff.getIndex()}`);
      throw err;
    }
    throw err;
  }
  log.info(`storageService.upload(${version}): setting new manifestVersion`);
  window.storage.put("manifestVersion", version);
  conflictBackOff.reset();
  backOff.reset();
  try {
    await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getFetchManifestSyncMessage());
  } catch (error) {
    log.error(`storageService.upload(${version}): Failed to queue sync message`, Errors.toLogFormat(error));
  }
}
async function stopStorageServiceSync(reason) {
  log.warn("storageService.stopStorageServiceSync", Errors.toLogFormat(reason));
  await window.storage.remove("storageKey");
  if (backOff.isFull()) {
    log.warn("storageService.stopStorageServiceSync: too many consecutive stops");
    return;
  }
  await (0, import_sleep.sleep)(backOff.getAndIncrement());
  log.info("storageService.stopStorageServiceSync: requesting new keys");
  setTimeout(async () => {
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("stopStorageServiceSync: We are primary device; not sending key sync request");
      return;
    }
    try {
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestKeySyncMessage());
    } catch (error) {
      log.error("storageService.stopStorageServiceSync: Failed to queue sync message", Errors.toLogFormat(error));
    }
  });
}
async function createNewManifest() {
  log.info("storageService.createNewManifest: creating new manifest");
  const version = window.storage.get("manifestVersion", 0);
  const { postUploadUpdateFunctions, newItems, storageManifest } = await generateManifest(version, void 0, true);
  await uploadManifest(version, {
    postUploadUpdateFunctions,
    deleteKeys: [],
    newItems,
    storageManifest
  });
}
async function decryptManifest(encryptedManifest) {
  const { version, value } = encryptedManifest;
  const storageKeyBase64 = window.storage.get("storageKey");
  if (!storageKeyBase64) {
    throw new Error("No storage key");
  }
  const storageKey = Bytes.fromBase64(storageKeyBase64);
  const storageManifestKey = (0, import_Crypto.deriveStorageManifestKey)(storageKey, (0, import_dropNull.dropNull)(version));
  (0, import_assert.strictAssert)(value, "StorageManifest has no value field");
  const decryptedManifest = (0, import_Crypto.decryptProfile)(value, storageManifestKey);
  return import_protobuf.SignalService.ManifestRecord.decode(decryptedManifest);
}
async function fetchManifest(manifestVersion) {
  log.info("storageService.sync: fetch start");
  if (!window.textsecure.messaging) {
    throw new Error("storageService.sync: we are offline!");
  }
  try {
    const credentials = await window.textsecure.messaging.getStorageCredentials();
    window.storage.put("storageCredentials", credentials);
    const manifestBinary = await window.textsecure.messaging.getStorageManifest({
      credentials,
      greaterThanVersion: manifestVersion
    });
    const encryptedManifest = import_protobuf.SignalService.StorageManifest.decode(manifestBinary);
    try {
      return decryptManifest(encryptedManifest);
    } catch (err) {
      await stopStorageServiceSync(err);
      return;
    }
  } catch (err) {
    if (err.code === 204) {
      log.info("storageService.sync: no newer manifest, ok");
      return;
    }
    log.error("storageService.sync: failed!", Errors.toLogFormat(err));
    if (err.code === 404) {
      await createNewManifest();
      return;
    }
    throw err;
  }
}
async function mergeRecord(storageVersion, itemToMerge) {
  const { itemType, storageID, storageRecord } = itemToMerge;
  const ITEM_TYPE = import_protobuf.SignalService.ManifestRecord.Identifier.Type;
  let mergeResult = { hasConflict: false, details: [] };
  let isUnsupported = false;
  let hasError = false;
  let updatedConversations = new Array();
  const needProfileFetch = new Array();
  try {
    if (itemType === ITEM_TYPE.UNKNOWN) {
      log.warn("storageService.mergeRecord: Unknown item type", storageID);
    } else if (itemType === ITEM_TYPE.CONTACT && storageRecord.contact) {
      mergeResult = await (0, import_storageRecordOps.mergeContactRecord)(storageID, storageVersion, storageRecord.contact);
    } else if (itemType === ITEM_TYPE.GROUPV1 && storageRecord.groupV1) {
      mergeResult = await (0, import_storageRecordOps.mergeGroupV1Record)(storageID, storageVersion, storageRecord.groupV1);
    } else if (itemType === ITEM_TYPE.GROUPV2 && storageRecord.groupV2) {
      mergeResult = await (0, import_storageRecordOps.mergeGroupV2Record)(storageID, storageVersion, storageRecord.groupV2);
    } else if (itemType === ITEM_TYPE.ACCOUNT && storageRecord.account) {
      mergeResult = await (0, import_storageRecordOps.mergeAccountRecord)(storageID, storageVersion, storageRecord.account);
    } else {
      isUnsupported = true;
      log.warn(`storageService.merge(${redactStorageID(storageID, storageVersion)}): unknown item type=${itemType}`);
    }
    const redactedID = redactStorageID(storageID, storageVersion, mergeResult.conversation);
    const oldID = mergeResult.oldStorageID ? redactStorageID(mergeResult.oldStorageID, mergeResult.oldStorageVersion) : "?";
    updatedConversations = [
      ...updatedConversations,
      ...mergeResult.updatedConversations ?? []
    ];
    if (mergeResult.needsProfileFetch) {
      (0, import_assert.strictAssert)(mergeResult.conversation, "needsProfileFetch, but no convo");
      needProfileFetch.push(mergeResult.conversation);
    }
    log.info(`storageService.merge(${redactedID}): merged item type=${itemType} oldID=${oldID} conflict=${mergeResult.hasConflict} shouldDrop=${Boolean(mergeResult.shouldDrop)} details=${JSON.stringify(mergeResult.details)}`);
  } catch (err) {
    hasError = true;
    const redactedID = redactStorageID(storageID, storageVersion);
    log.error(`storageService.merge(${redactedID}): error with item type=${itemType} details=${Errors.toLogFormat(err)}`);
  }
  return {
    hasConflict: mergeResult.hasConflict,
    shouldDrop: Boolean(mergeResult.shouldDrop),
    hasError,
    isUnsupported,
    itemType,
    storageID,
    updatedConversations,
    needProfileFetch
  };
}
async function processManifest(manifest, version) {
  if (!window.textsecure.messaging) {
    throw new Error("storageService.processManifest: We are offline!");
  }
  const remoteKeysTypeMap = /* @__PURE__ */ new Map();
  (manifest.keys || []).forEach(({ raw, type }) => {
    (0, import_assert.strictAssert)(raw, "Identifier without raw field");
    remoteKeysTypeMap.set(Bytes.toBase64(raw), type);
  });
  const remoteKeys = new Set(remoteKeysTypeMap.keys());
  const localVersions = /* @__PURE__ */ new Map();
  const conversations = window.getConversations();
  conversations.forEach((conversation) => {
    const storageID = conversation.get("storageID");
    if (storageID) {
      localVersions.set(storageID, conversation.get("storageVersion"));
    }
  });
  const unknownRecordsArray = window.storage.get("storage-service-unknown-records") || [];
  const stillUnknown = unknownRecordsArray.filter((record) => {
    if (!validRecordTypes.has(record.itemType)) {
      localVersions.set(record.storageID, record.storageVersion);
      return false;
    }
    return true;
  });
  const remoteOnlySet = /* @__PURE__ */ new Set();
  for (const key of remoteKeys) {
    if (!localVersions.has(key)) {
      remoteOnlySet.add(key);
    }
  }
  const localOnlySet = /* @__PURE__ */ new Set();
  for (const key of localVersions.keys()) {
    if (!remoteKeys.has(key)) {
      localOnlySet.add(key);
    }
  }
  const redactedRemoteOnly = Array.from(remoteOnlySet).map((id) => redactStorageID(id, version));
  const redactedLocalOnly = Array.from(localOnlySet).map((id) => redactStorageID(id, localVersions.get(id)));
  log.info(`storageService.process(${version}): localRecords=${conversations.length} localKeys=${localVersions.size} unknownKeys=${stillUnknown.length} remoteKeys=${remoteKeys.size}`);
  log.info(`storageService.process(${version}): remoteOnlyCount=${remoteOnlySet.size} remoteOnlyKeys=${JSON.stringify(redactedRemoteOnly)}`);
  log.info(`storageService.process(${version}): localOnlyCount=${localOnlySet.size} localOnlyKeys=${JSON.stringify(redactedLocalOnly)}`);
  const remoteOnlyRecords = /* @__PURE__ */ new Map();
  remoteOnlySet.forEach((storageID) => {
    remoteOnlyRecords.set(storageID, {
      storageID,
      itemType: remoteKeysTypeMap.get(storageID)
    });
  });
  let conflictCount = 0;
  if (remoteOnlyRecords.size) {
    conflictCount = await processRemoteRecords(version, remoteOnlyRecords);
  }
  window.getConversations().forEach((conversation) => {
    const storageID = conversation.get("storageID");
    if (storageID && !remoteKeys.has(storageID)) {
      const storageVersion = conversation.get("storageVersion");
      const missingKey = redactStorageID(storageID, storageVersion, conversation);
      log.info(`storageService.process(${version}): localKey=${missingKey} was not in remote manifest`);
      conversation.unset("storageID");
      conversation.unset("storageVersion");
      updateConversation(conversation.attributes);
    }
  });
  log.info(`storageService.process(${version}): conflictCount=${conflictCount}`);
  return conflictCount;
}
async function processRemoteRecords(storageVersion, remoteOnlyRecords) {
  const storageKeyBase64 = window.storage.get("storageKey");
  if (!storageKeyBase64) {
    throw new Error("No storage key");
  }
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available");
  }
  const storageKey = Bytes.fromBase64(storageKeyBase64);
  log.info(`storageService.process(${storageVersion}): fetching remote keys count=${remoteOnlyRecords.size}`);
  const credentials = window.storage.get("storageCredentials");
  const batches = (0, import_lodash.chunk)(Array.from(remoteOnlyRecords.keys()), import_storageConstants.MAX_READ_KEYS);
  const storageItems = (await (0, import_p_map.default)(batches, async (batch) => {
    const readOperation = new import_protobuf.SignalService.ReadOperation();
    readOperation.readKey = batch.map(Bytes.fromBase64);
    const storageItemsBuffer = await messaging.getStorageRecords(import_protobuf.SignalService.ReadOperation.encode(readOperation).finish(), {
      credentials
    });
    return import_protobuf.SignalService.StorageItems.decode(storageItemsBuffer).items ?? [];
  }, { concurrency: 5 })).flat();
  const missingKeys = new Set(remoteOnlyRecords.keys());
  const decryptedStorageItems = await (0, import_p_map.default)(storageItems, async (storageRecordWrapper) => {
    const { key, value: storageItemCiphertext } = storageRecordWrapper;
    if (!key || !storageItemCiphertext) {
      const error = new Error(`storageService.process(${storageVersion}): missing key and/or Ciphertext`);
      await stopStorageServiceSync(error);
      throw error;
    }
    const base64ItemID = Bytes.toBase64(key);
    missingKeys.delete(base64ItemID);
    const storageItemKey = (0, import_Crypto.deriveStorageItemKey)(storageKey, base64ItemID);
    let storageItemPlaintext;
    try {
      storageItemPlaintext = (0, import_Crypto.decryptProfile)(storageItemCiphertext, storageItemKey);
    } catch (err) {
      log.error(`storageService.process(${storageVersion}): Error decrypting storage item`, Errors.toLogFormat(err));
      await stopStorageServiceSync(err);
      throw err;
    }
    const storageRecord = import_protobuf.SignalService.StorageRecord.decode(storageItemPlaintext);
    const remoteRecord = remoteOnlyRecords.get(base64ItemID);
    if (!remoteRecord) {
      throw new Error(`Got a remote record that wasn't requested with storageID: ${base64ItemID}`);
    }
    return {
      itemType: remoteRecord.itemType,
      storageID: base64ItemID,
      storageRecord
    };
  }, { concurrency: 5 });
  const redactedMissingKeys = Array.from(missingKeys).map((id) => redactStorageID(id, storageVersion));
  log.info(`storageService.process(${storageVersion}): missing remote keys=${JSON.stringify(redactedMissingKeys)} count=${missingKeys.size}`);
  const ITEM_TYPE = import_protobuf.SignalService.ManifestRecord.Identifier.Type;
  const droppedKeys = /* @__PURE__ */ new Set();
  const masterKeys = /* @__PURE__ */ new Map();
  for (const { itemType, storageID, storageRecord } of decryptedStorageItems) {
    if (itemType === ITEM_TYPE.GROUPV2 && storageRecord.groupV2?.masterKey) {
      masterKeys.set(Bytes.toBase64(storageRecord.groupV2.masterKey), storageID);
    }
  }
  let accountItem;
  const prunedStorageItems = decryptedStorageItems.filter((item) => {
    const { itemType, storageID, storageRecord } = item;
    if (itemType === ITEM_TYPE.ACCOUNT) {
      if (accountItem !== void 0) {
        log.warn(`storageService.process(${storageVersion}): duplicate account record=${redactStorageID(storageID, storageVersion)} previous=${redactStorageID(accountItem.storageID, storageVersion)}`);
        droppedKeys.add(accountItem.storageID);
      }
      accountItem = item;
      return false;
    }
    if (itemType !== ITEM_TYPE.GROUPV1 || !storageRecord.groupV1?.id) {
      return true;
    }
    const masterKey = (0, import_Crypto.deriveMasterKeyFromGroupV1)(storageRecord.groupV1.id);
    const gv2StorageID = masterKeys.get(Bytes.toBase64(masterKey));
    if (!gv2StorageID) {
      return true;
    }
    log.warn(`storageService.process(${storageVersion}): dropping GV1 record=${redactStorageID(storageID, storageVersion)} GV2 record=${redactStorageID(gv2StorageID, storageVersion)} is in the same manifest`);
    droppedKeys.add(storageID);
    return false;
  });
  try {
    log.info(`storageService.process(${storageVersion}): attempting to merge records=${prunedStorageItems.length}`);
    if (accountItem !== void 0) {
      log.info(`storageService.process(${storageVersion}): account record=${redactStorageID(accountItem.storageID, storageVersion)}`);
    }
    const mergedRecords = [
      ...await (0, import_p_map.default)(prunedStorageItems, (item) => mergeRecord(storageVersion, item), { concurrency: 32 }),
      ...accountItem ? [await mergeRecord(storageVersion, accountItem)] : []
    ];
    log.info(`storageService.process(${storageVersion}): processed records=${mergedRecords.length}`);
    const updatedConversations = mergedRecords.map((record) => record.updatedConversations).flat().map((convo) => convo.attributes);
    await updateConversations(updatedConversations);
    log.info(`storageService.process(${storageVersion}): updated conversations=${updatedConversations.length}`);
    const needProfileFetch = mergedRecords.map((record) => record.needProfileFetch).flat();
    log.info(`storageService.process(${storageVersion}): kicking off profile fetches=${needProfileFetch.length}`);
    (0, import_p_map.default)(needProfileFetch, (convo) => convo.getProfiles(), { concurrency: 3 });
    const unknownRecords = /* @__PURE__ */ new Map();
    const previousUnknownRecords = window.storage.get("storage-service-unknown-records", new Array());
    previousUnknownRecords.forEach((record) => {
      unknownRecords.set(record.storageID, record);
    });
    const newRecordsWithErrors = [];
    let conflictCount = 0;
    mergedRecords.forEach((mergedRecord) => {
      if (mergedRecord.isUnsupported) {
        unknownRecords.set(mergedRecord.storageID, {
          itemType: mergedRecord.itemType,
          storageID: mergedRecord.storageID,
          storageVersion
        });
      } else if (mergedRecord.hasError) {
        newRecordsWithErrors.push({
          itemType: mergedRecord.itemType,
          storageID: mergedRecord.storageID,
          storageVersion
        });
      }
      if (mergedRecord.hasConflict) {
        conflictCount += 1;
      }
      if (mergedRecord.shouldDrop) {
        droppedKeys.add(mergedRecord.storageID);
      }
    });
    const redactedDroppedKeys = Array.from(droppedKeys.values()).map((key) => redactStorageID(key, storageVersion));
    log.info(`storageService.process(${storageVersion}): dropped keys=${JSON.stringify(redactedDroppedKeys)} count=${redactedDroppedKeys.length}`);
    const newUnknownRecords = Array.from(unknownRecords.values()).filter((record) => !validRecordTypes.has(record.itemType));
    const redactedNewUnknowns = newUnknownRecords.map(redactExtendedStorageID);
    log.info(`storageService.process(${storageVersion}): unknown records=${JSON.stringify(redactedNewUnknowns)} count=${redactedNewUnknowns.length}`);
    await window.storage.put("storage-service-unknown-records", newUnknownRecords);
    const redactedErrorRecords = newRecordsWithErrors.map(redactExtendedStorageID);
    log.info(`storageService.process(${storageVersion}): error records=${JSON.stringify(redactedErrorRecords)} count=${redactedErrorRecords.length}`);
    await window.storage.put("storage-service-error-records", newRecordsWithErrors);
    const pendingDeletes = [...missingKeys, ...droppedKeys].map((storageID) => ({
      storageID,
      storageVersion
    }));
    const redactedPendingDeletes = pendingDeletes.map(redactExtendedStorageID);
    log.info(`storageService.process(${storageVersion}): pending deletes=${JSON.stringify(redactedPendingDeletes)} count=${redactedPendingDeletes.length}`);
    await window.storage.put("storage-service-pending-deletes", pendingDeletes);
    if (conflictCount === 0) {
      conflictBackOff.reset();
    }
    return conflictCount;
  } catch (err) {
    log.error(`storageService.process(${storageVersion}): failed to process remote records`, Errors.toLogFormat(err));
  }
  return 0;
}
async function sync(ignoreConflicts = false) {
  if (!window.storage.get("storageKey")) {
    throw new Error("storageService.sync: Cannot start; no storage key!");
  }
  log.info(`storageService.sync: starting... ignoreConflicts=${ignoreConflicts}`);
  let manifest;
  try {
    const previousFetchComplete = window.storage.get("storageFetchComplete");
    const manifestFromStorage = window.storage.get("manifestVersion");
    if (!previousFetchComplete && (0, import_lodash.isNumber)(manifestFromStorage)) {
      window.storage.put("storageFetchComplete", true);
    }
    const localManifestVersion = manifestFromStorage || 0;
    log.info(`storageService.sync: fetching latest after version=${localManifestVersion}`);
    manifest = await fetchManifest(localManifestVersion);
    if (!manifest) {
      log.info(`storageService.sync: no updates, version=${localManifestVersion}`);
      return void 0;
    }
    (0, import_assert.strictAssert)(manifest.version !== void 0 && manifest.version !== null, "Manifest without version");
    const version = manifest.version?.toNumber() ?? 0;
    log.info(`storageService.sync: updating to remoteVersion=${version} sourceDevice=${manifest.sourceDevice ?? "?"} from version=${localManifestVersion}`);
    const conflictCount = await processManifest(manifest, version);
    log.info(`storageService.sync: updated to version=${version} conflicts=${conflictCount}`);
    await window.storage.put("manifestVersion", version);
    const hasConflicts = conflictCount !== 0;
    if (hasConflicts && !ignoreConflicts) {
      await upload(true);
    }
    await window.storage.put("storageFetchComplete", true);
  } catch (err) {
    log.error("storageService.sync: error processing manifest", Errors.toLogFormat(err));
  }
  log.info("storageService.sync: complete");
  return manifest;
}
async function upload(fromSync = false) {
  if (!window.textsecure.messaging) {
    throw new Error("storageService.upload: We are offline!");
  }
  if (fromSync) {
    uploadBucket.push(Date.now());
    if (uploadBucket.length >= 3) {
      const [firstMostRecentWrite] = uploadBucket;
      if ((0, import_timestamp.isMoreRecentThan)(5 * durations.MINUTE, firstMostRecentWrite)) {
        throw new Error("storageService.uploadManifest: too many writes too soon.");
      }
      uploadBucket.shift();
    }
  }
  if (!window.storage.get("storageKey")) {
    log.info("storageService.upload: no storageKey, requesting new keys");
    backOff.reset();
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("storageService.upload: We are primary device; not sending key sync request");
      return;
    }
    try {
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getRequestKeySyncMessage());
    } catch (error) {
      log.error("storageService.upload: Failed to queue sync message", Errors.toLogFormat(error));
    }
    return;
  }
  let previousManifest;
  if (!fromSync) {
    const ignoreConflicts = true;
    previousManifest = await sync(ignoreConflicts);
  }
  const localManifestVersion = window.storage.get("manifestVersion", 0);
  const version = Number(localManifestVersion) + 1;
  log.info(`storageService.upload(${version}): will update to manifest version`);
  try {
    const generatedManifest = await generateManifest(version, previousManifest, false);
    await uploadManifest(version, generatedManifest);
    await window.storage.put("storage-service-pending-deletes", []);
  } catch (err) {
    if (err.code === 409) {
      await (0, import_sleep.sleep)(conflictBackOff.getAndIncrement());
      log.info("storageService.upload: pushing sync on the queue");
      setTimeout(runStorageServiceSyncJob);
      return;
    }
    log.error(`storageService.upload(${version}): error`, Errors.toLogFormat(err));
  }
}
let storageServiceEnabled = false;
function enableStorageService() {
  storageServiceEnabled = true;
}
async function eraseAllStorageServiceState({
  keepUnknownFields = false
} = {}) {
  log.info("storageService.eraseAllStorageServiceState: starting...");
  await Promise.all([
    window.storage.remove("manifestVersion"),
    keepUnknownFields ? Promise.resolve() : window.storage.remove("storage-service-unknown-records"),
    window.storage.remove("storageCredentials")
  ]);
  await eraseStorageServiceStateFromConversations();
  log.info("storageService.eraseAllStorageServiceState: complete");
}
const storageServiceUploadJob = (0, import_lodash.debounce)(() => {
  if (!storageServiceEnabled) {
    log.info("storageService.storageServiceUploadJob: called before enabled");
    return;
  }
  (0, import_JobQueue.storageJobQueue)(async () => {
    await upload();
  }, `upload v${window.storage.get("manifestVersion")}`);
}, 500);
const runStorageServiceSyncJob = (0, import_lodash.debounce)(() => {
  if (!storageServiceEnabled) {
    log.info("storageService.runStorageServiceSyncJob: called before enabled");
    return;
  }
  import_ourProfileKey.ourProfileKeyService.blockGetWithPromise((0, import_JobQueue.storageJobQueue)(async () => {
    await sync();
    window.Whisper.events.trigger("storageService:syncComplete");
  }, `sync v${window.storage.get("manifestVersion")}`));
}, 500);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enableStorageService,
  eraseAllStorageServiceState,
  runStorageServiceSyncJob,
  storageServiceUploadJob
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcmFnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGRlYm91bmNlLCBpc051bWJlciwgY2h1bmsgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHBNYXAgZnJvbSAncC1tYXAnO1xuaW1wb3J0IExvbmcgZnJvbSAnbG9uZyc7XG5cbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHtcbiAgZ2V0UmFuZG9tQnl0ZXMsXG4gIGRlcml2ZVN0b3JhZ2VJdGVtS2V5LFxuICBkZXJpdmVTdG9yYWdlTWFuaWZlc3RLZXksXG4gIGVuY3J5cHRQcm9maWxlLFxuICBkZWNyeXB0UHJvZmlsZSxcbiAgZGVyaXZlTWFzdGVyS2V5RnJvbUdyb3VwVjEsXG59IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQge1xuICBtZXJnZUFjY291bnRSZWNvcmQsXG4gIG1lcmdlQ29udGFjdFJlY29yZCxcbiAgbWVyZ2VHcm91cFYxUmVjb3JkLFxuICBtZXJnZUdyb3VwVjJSZWNvcmQsXG4gIHRvQWNjb3VudFJlY29yZCxcbiAgdG9Db250YWN0UmVjb3JkLFxuICB0b0dyb3VwVjFSZWNvcmQsXG4gIHRvR3JvdXBWMlJlY29yZCxcbn0gZnJvbSAnLi9zdG9yYWdlUmVjb3JkT3BzJztcbmltcG9ydCB0eXBlIHsgTWVyZ2VSZXN1bHRUeXBlIH0gZnJvbSAnLi9zdG9yYWdlUmVjb3JkT3BzJztcbmltcG9ydCB7IE1BWF9SRUFEX0tFWVMgfSBmcm9tICcuL3N0b3JhZ2VDb25zdGFudHMnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGRyb3BOdWxsIH0gZnJvbSAnLi4vdXRpbC9kcm9wTnVsbCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgQmFja09mZiB9IGZyb20gJy4uL3V0aWwvQmFja09mZic7XG5pbXBvcnQgeyBzdG9yYWdlSm9iUXVldWUgfSBmcm9tICcuLi91dGlsL0pvYlF1ZXVlJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgeyBpc01vcmVSZWNlbnRUaGFuIH0gZnJvbSAnLi4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0IHsgb3VyUHJvZmlsZUtleVNlcnZpY2UgfSBmcm9tICcuL291clByb2ZpbGVLZXknO1xuaW1wb3J0IHtcbiAgQ29udmVyc2F0aW9uVHlwZXMsXG4gIHR5cGVvZkNvbnZlcnNhdGlvbixcbn0gZnJvbSAnLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JRdWV1ZSB9IGZyb20gJy4uL2pvYnMvc2luZ2xlUHJvdG9Kb2JRdWV1ZSc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB0eXBlIHtcbiAgRXh0ZW5kZWRTdG9yYWdlSUQsXG4gIFJlbW90ZVJlY29yZCxcbiAgVW5rbm93blJlY29yZCxcbn0gZnJvbSAnLi4vdHlwZXMvU3RvcmFnZVNlcnZpY2UuZCc7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciBmcm9tICcuLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcblxudHlwZSBJTWFuaWZlc3RSZWNvcmRJZGVudGlmaWVyID0gUHJvdG8uTWFuaWZlc3RSZWNvcmQuSUlkZW50aWZpZXI7XG5cbmNvbnN0IHtcbiAgZXJhc2VTdG9yYWdlU2VydmljZVN0YXRlRnJvbUNvbnZlcnNhdGlvbnMsXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbixcbiAgdXBkYXRlQ29udmVyc2F0aW9ucyxcbn0gPSBkYXRhSW50ZXJmYWNlO1xuXG5jb25zdCB1cGxvYWRCdWNrZXQ6IEFycmF5PG51bWJlcj4gPSBbXTtcblxuY29uc3QgdmFsaWRSZWNvcmRUeXBlcyA9IG5ldyBTZXQoW1xuICAwLCAvLyBVTktOT1dOXG4gIDEsIC8vIENPTlRBQ1RcbiAgMiwgLy8gR1JPVVBWMVxuICAzLCAvLyBHUk9VUFYyXG4gIDQsIC8vIEFDQ09VTlRcbl0pO1xuXG5jb25zdCBiYWNrT2ZmID0gbmV3IEJhY2tPZmYoW1xuICBkdXJhdGlvbnMuU0VDT05ELFxuICA1ICogZHVyYXRpb25zLlNFQ09ORCxcbiAgMzAgKiBkdXJhdGlvbnMuU0VDT05ELFxuICAyICogZHVyYXRpb25zLk1JTlVURSxcbiAgNSAqIGR1cmF0aW9ucy5NSU5VVEUsXG5dKTtcblxuY29uc3QgY29uZmxpY3RCYWNrT2ZmID0gbmV3IEJhY2tPZmYoW1xuICBkdXJhdGlvbnMuU0VDT05ELFxuICA1ICogZHVyYXRpb25zLlNFQ09ORCxcbiAgMzAgKiBkdXJhdGlvbnMuU0VDT05ELFxuXSk7XG5cbmZ1bmN0aW9uIHJlZGFjdFN0b3JhZ2VJRChcbiAgc3RvcmFnZUlEOiBzdHJpbmcsXG4gIHZlcnNpb24/OiBudW1iZXIsXG4gIGNvbnZlcnNhdGlvbj86IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBzdHJpbmcge1xuICBjb25zdCBjb252b0lkID0gY29udmVyc2F0aW9uID8gYCAke2NvbnZlcnNhdGlvbj8uaWRGb3JMb2dnaW5nKCl9YCA6ICcnO1xuICByZXR1cm4gYCR7dmVyc2lvbiA/PyAnPyd9OiR7c3RvcmFnZUlELnN1YnN0cmluZygwLCAzKX0ke2NvbnZvSWR9YDtcbn1cblxuZnVuY3Rpb24gcmVkYWN0RXh0ZW5kZWRTdG9yYWdlSUQoe1xuICBzdG9yYWdlSUQsXG4gIHN0b3JhZ2VWZXJzaW9uLFxufTogRXh0ZW5kZWRTdG9yYWdlSUQpOiBzdHJpbmcge1xuICByZXR1cm4gcmVkYWN0U3RvcmFnZUlEKHN0b3JhZ2VJRCwgc3RvcmFnZVZlcnNpb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbmNyeXB0UmVjb3JkKFxuICBzdG9yYWdlSUQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgc3RvcmFnZVJlY29yZDogUHJvdG8uSVN0b3JhZ2VSZWNvcmRcbik6IFByb21pc2U8UHJvdG8uU3RvcmFnZUl0ZW0+IHtcbiAgY29uc3Qgc3RvcmFnZUl0ZW0gPSBuZXcgUHJvdG8uU3RvcmFnZUl0ZW0oKTtcblxuICBjb25zdCBzdG9yYWdlS2V5QnVmZmVyID0gc3RvcmFnZUlEXG4gICAgPyBCeXRlcy5mcm9tQmFzZTY0KFN0cmluZyhzdG9yYWdlSUQpKVxuICAgIDogZ2VuZXJhdGVTdG9yYWdlSUQoKTtcblxuICBjb25zdCBzdG9yYWdlS2V5QmFzZTY0ID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlS2V5Jyk7XG4gIGlmICghc3RvcmFnZUtleUJhc2U2NCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gc3RvcmFnZSBrZXknKTtcbiAgfVxuICBjb25zdCBzdG9yYWdlS2V5ID0gQnl0ZXMuZnJvbUJhc2U2NChzdG9yYWdlS2V5QmFzZTY0KTtcbiAgY29uc3Qgc3RvcmFnZUl0ZW1LZXkgPSBkZXJpdmVTdG9yYWdlSXRlbUtleShcbiAgICBzdG9yYWdlS2V5LFxuICAgIEJ5dGVzLnRvQmFzZTY0KHN0b3JhZ2VLZXlCdWZmZXIpXG4gICk7XG5cbiAgY29uc3QgZW5jcnlwdGVkUmVjb3JkID0gZW5jcnlwdFByb2ZpbGUoXG4gICAgUHJvdG8uU3RvcmFnZVJlY29yZC5lbmNvZGUoc3RvcmFnZVJlY29yZCkuZmluaXNoKCksXG4gICAgc3RvcmFnZUl0ZW1LZXlcbiAgKTtcblxuICBzdG9yYWdlSXRlbS5rZXkgPSBzdG9yYWdlS2V5QnVmZmVyO1xuICBzdG9yYWdlSXRlbS52YWx1ZSA9IGVuY3J5cHRlZFJlY29yZDtcblxuICByZXR1cm4gc3RvcmFnZUl0ZW07XG59XG5cbmZ1bmN0aW9uIGdlbmVyYXRlU3RvcmFnZUlEKCk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZ2V0UmFuZG9tQnl0ZXMoMTYpO1xufVxuXG50eXBlIEdlbmVyYXRlZE1hbmlmZXN0VHlwZSA9IHtcbiAgcG9zdFVwbG9hZFVwZGF0ZUZ1bmN0aW9uczogQXJyYXk8KCkgPT4gdW5rbm93bj47XG4gIGRlbGV0ZUtleXM6IEFycmF5PFVpbnQ4QXJyYXk+O1xuICBuZXdJdGVtczogU2V0PFByb3RvLklTdG9yYWdlSXRlbT47XG4gIHN0b3JhZ2VNYW5pZmVzdDogUHJvdG8uSVN0b3JhZ2VNYW5pZmVzdDtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlTWFuaWZlc3QoXG4gIHZlcnNpb246IG51bWJlcixcbiAgcHJldmlvdXNNYW5pZmVzdD86IFByb3RvLklNYW5pZmVzdFJlY29yZCxcbiAgaXNOZXdNYW5pZmVzdCA9IGZhbHNlXG4pOiBQcm9taXNlPEdlbmVyYXRlZE1hbmlmZXN0VHlwZT4ge1xuICBsb2cuaW5mbyhcbiAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBnZW5lcmF0aW5nIG1hbmlmZXN0IGAgK1xuICAgICAgYG5ldz0ke2lzTmV3TWFuaWZlc3R9YFxuICApO1xuXG4gIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmNoZWNrRm9yQ29uZmxpY3RzKCk7XG5cbiAgY29uc3QgSVRFTV9UWVBFID0gUHJvdG8uTWFuaWZlc3RSZWNvcmQuSWRlbnRpZmllci5UeXBlO1xuXG4gIGNvbnN0IHBvc3RVcGxvYWRVcGRhdGVGdW5jdGlvbnM6IEFycmF5PCgpID0+IHVua25vd24+ID0gW107XG4gIGNvbnN0IGluc2VydEtleXM6IEFycmF5PHN0cmluZz4gPSBbXTtcbiAgY29uc3QgZGVsZXRlS2V5czogQXJyYXk8VWludDhBcnJheT4gPSBbXTtcbiAgY29uc3QgbWFuaWZlc3RSZWNvcmRLZXlzOiBTZXQ8SU1hbmlmZXN0UmVjb3JkSWRlbnRpZmllcj4gPSBuZXcgU2V0KCk7XG4gIGNvbnN0IG5ld0l0ZW1zOiBTZXQ8UHJvdG8uSVN0b3JhZ2VJdGVtPiA9IG5ldyBTZXQoKTtcblxuICBjb25zdCBjb252ZXJzYXRpb25zID0gd2luZG93LmdldENvbnZlcnNhdGlvbnMoKTtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBjb252ZXJzYXRpb25zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9ucy5tb2RlbHNbaV07XG4gICAgY29uc3QgaWRlbnRpZmllciA9IG5ldyBQcm90by5NYW5pZmVzdFJlY29yZC5JZGVudGlmaWVyKCk7XG5cbiAgICBsZXQgc3RvcmFnZVJlY29yZDtcblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvblR5cGUgPSB0eXBlb2ZDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgIGlmIChjb252ZXJzYXRpb25UeXBlID09PSBDb252ZXJzYXRpb25UeXBlcy5NZSkge1xuICAgICAgc3RvcmFnZVJlY29yZCA9IG5ldyBQcm90by5TdG9yYWdlUmVjb3JkKCk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgc3RvcmFnZVJlY29yZC5hY2NvdW50ID0gYXdhaXQgdG9BY2NvdW50UmVjb3JkKGNvbnZlcnNhdGlvbik7XG4gICAgICBpZGVudGlmaWVyLnR5cGUgPSBJVEVNX1RZUEUuQUNDT1VOVDtcbiAgICB9IGVsc2UgaWYgKGNvbnZlcnNhdGlvblR5cGUgPT09IENvbnZlcnNhdGlvblR5cGVzLkRpcmVjdCkge1xuICAgICAgLy8gQ29udGFjdHMgbXVzdCBoYXZlIFVVSURcbiAgICAgIGlmICghY29udmVyc2F0aW9uLmdldCgndXVpZCcpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB2YWxpZGF0aW9uRXJyb3IgPSBjb252ZXJzYXRpb24udmFsaWRhdGUoKTtcbiAgICAgIGlmICh2YWxpZGF0aW9uRXJyb3IpIHtcbiAgICAgICAgY29uc3QgZHJvcHBlZElEID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZUlEJyk7XG4gICAgICAgIGNvbnN0IGRyb3BwZWRWZXJzaW9uID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKTtcbiAgICAgICAgaWYgKCFkcm9wcGVkSUQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHJlY29yZElEID0gcmVkYWN0U3RvcmFnZUlEKFxuICAgICAgICAgIGRyb3BwZWRJRCxcbiAgICAgICAgICBkcm9wcGVkVmVyc2lvbixcbiAgICAgICAgICBjb252ZXJzYXRpb25cbiAgICAgICAgKTtcblxuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgc3RvcmFnZVNlcnZpY2UuZ2VuZXJhdGVNYW5pZmVzdCgke3ZlcnNpb259KTogYCArXG4gICAgICAgICAgICBgc2tpcHBpbmcgY29udGFjdD0ke3JlY29yZElEfSBgICtcbiAgICAgICAgICAgIGBkdWUgdG8gbG9jYWwgdmFsaWRhdGlvbiBlcnJvcj0ke3ZhbGlkYXRpb25FcnJvcn1gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnZlcnNhdGlvbi51bnNldCgnc3RvcmFnZUlEJyk7XG4gICAgICAgIGRlbGV0ZUtleXMucHVzaChCeXRlcy5mcm9tQmFzZTY0KGRyb3BwZWRJRCkpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgc3RvcmFnZVJlY29yZCA9IG5ldyBQcm90by5TdG9yYWdlUmVjb3JkKCk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgc3RvcmFnZVJlY29yZC5jb250YWN0ID0gYXdhaXQgdG9Db250YWN0UmVjb3JkKGNvbnZlcnNhdGlvbik7XG4gICAgICBpZGVudGlmaWVyLnR5cGUgPSBJVEVNX1RZUEUuQ09OVEFDVDtcbiAgICB9IGVsc2UgaWYgKGNvbnZlcnNhdGlvblR5cGUgPT09IENvbnZlcnNhdGlvblR5cGVzLkdyb3VwVjIpIHtcbiAgICAgIHN0b3JhZ2VSZWNvcmQgPSBuZXcgUHJvdG8uU3RvcmFnZVJlY29yZCgpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIHN0b3JhZ2VSZWNvcmQuZ3JvdXBWMiA9IGF3YWl0IHRvR3JvdXBWMlJlY29yZChjb252ZXJzYXRpb24pO1xuICAgICAgaWRlbnRpZmllci50eXBlID0gSVRFTV9UWVBFLkdST1VQVjI7XG4gICAgfSBlbHNlIGlmIChjb252ZXJzYXRpb25UeXBlID09PSBDb252ZXJzYXRpb25UeXBlcy5Hcm91cFYxKSB7XG4gICAgICBzdG9yYWdlUmVjb3JkID0gbmV3IFByb3RvLlN0b3JhZ2VSZWNvcmQoKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICBzdG9yYWdlUmVjb3JkLmdyb3VwVjEgPSBhd2FpdCB0b0dyb3VwVjFSZWNvcmQoY29udmVyc2F0aW9uKTtcbiAgICAgIGlkZW50aWZpZXIudHlwZSA9IElURU1fVFlQRS5HUk9VUFYxO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogYCArXG4gICAgICAgICAgYHVua25vd24gY29udmVyc2F0aW9uPSR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFzdG9yYWdlUmVjb3JkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBjdXJyZW50U3RvcmFnZUlEID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZUlEJyk7XG4gICAgY29uc3QgY3VycmVudFN0b3JhZ2VWZXJzaW9uID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKTtcblxuICAgIGNvbnN0IGN1cnJlbnRSZWRhY3RlZElEID0gY3VycmVudFN0b3JhZ2VJRFxuICAgICAgPyByZWRhY3RTdG9yYWdlSUQoY3VycmVudFN0b3JhZ2VJRCwgY3VycmVudFN0b3JhZ2VWZXJzaW9uKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBpc05ld0l0ZW0gPVxuICAgICAgaXNOZXdNYW5pZmVzdCB8fFxuICAgICAgQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCduZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYycpKSB8fFxuICAgICAgIWN1cnJlbnRTdG9yYWdlSUQ7XG5cbiAgICBjb25zdCBzdG9yYWdlSUQgPSBpc05ld0l0ZW1cbiAgICAgID8gQnl0ZXMudG9CYXNlNjQoZ2VuZXJhdGVTdG9yYWdlSUQoKSlcbiAgICAgIDogY3VycmVudFN0b3JhZ2VJRDtcblxuICAgIGxldCBzdG9yYWdlSXRlbTtcbiAgICB0cnkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIHN0b3JhZ2VJdGVtID0gYXdhaXQgZW5jcnlwdFJlY29yZChzdG9yYWdlSUQsIHN0b3JhZ2VSZWNvcmQpO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBlbmNyeXB0IHJlY29yZCBmYWlsZWQ6YCxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycilcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnI7XG4gICAgfVxuICAgIGlkZW50aWZpZXIucmF3ID0gc3RvcmFnZUl0ZW0ua2V5O1xuXG4gICAgLy8gV2hlbiBhIGNsaWVudCBuZWVkcyB0byB1cGRhdGUgYSBnaXZlbiByZWNvcmQgaXQgc2hvdWxkIGNyZWF0ZSBpdFxuICAgIC8vIHVuZGVyIGEgbmV3IGtleSBhbmQgZGVsZXRlIHRoZSBleGlzdGluZyBrZXkuXG4gICAgaWYgKGlzTmV3SXRlbSkge1xuICAgICAgbmV3SXRlbXMuYWRkKHN0b3JhZ2VJdGVtKTtcblxuICAgICAgaW5zZXJ0S2V5cy5wdXNoKHN0b3JhZ2VJRCk7XG4gICAgICBjb25zdCBuZXdSZWRhY3RlZElEID0gcmVkYWN0U3RvcmFnZUlEKHN0b3JhZ2VJRCwgdmVyc2lvbiwgY29udmVyc2F0aW9uKTtcbiAgICAgIGlmIChjdXJyZW50U3RvcmFnZUlEKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IGAgK1xuICAgICAgICAgICAgYHVwZGF0aW5nIGZyb209JHtjdXJyZW50UmVkYWN0ZWRJRH0gYCArXG4gICAgICAgICAgICBgdG89JHtuZXdSZWRhY3RlZElEfWBcbiAgICAgICAgKTtcbiAgICAgICAgZGVsZXRlS2V5cy5wdXNoKEJ5dGVzLmZyb21CYXNlNjQoY3VycmVudFN0b3JhZ2VJRCkpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogYWRkaW5nIGtleT0ke25ld1JlZGFjdGVkSUR9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBwb3N0VXBsb2FkVXBkYXRlRnVuY3Rpb25zLnB1c2goKCkgPT4ge1xuICAgICAgICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICAgICAgICBuZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYzogZmFsc2UsXG4gICAgICAgICAgc3RvcmFnZVZlcnNpb246IHZlcnNpb24sXG4gICAgICAgICAgc3RvcmFnZUlELFxuICAgICAgICB9KTtcbiAgICAgICAgdXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIG1hbmlmZXN0UmVjb3JkS2V5cy5hZGQoaWRlbnRpZmllcik7XG4gIH1cblxuICBjb25zdCB1bmtub3duUmVjb3Jkc0FycmF5OiBSZWFkb25seUFycmF5PFVua25vd25SZWNvcmQ+ID0gKFxuICAgIHdpbmRvdy5zdG9yYWdlLmdldCgnc3RvcmFnZS1zZXJ2aWNlLXVua25vd24tcmVjb3JkcycpIHx8IFtdXG4gICkuZmlsdGVyKChyZWNvcmQ6IFVua25vd25SZWNvcmQpID0+ICF2YWxpZFJlY29yZFR5cGVzLmhhcyhyZWNvcmQuaXRlbVR5cGUpKTtcblxuICBjb25zdCByZWRhY3RlZFVua25vd25zID0gdW5rbm93blJlY29yZHNBcnJheS5tYXAocmVkYWN0RXh0ZW5kZWRTdG9yYWdlSUQpO1xuXG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IGFkZGluZyB1bmtub3duIGAgK1xuICAgICAgYHJlY29yZHM9JHtKU09OLnN0cmluZ2lmeShyZWRhY3RlZFVua25vd25zKX0gYCArXG4gICAgICBgY291bnQ9JHtyZWRhY3RlZFVua25vd25zLmxlbmd0aH1gXG4gICk7XG5cbiAgLy8gV2hlbiB1cGRhdGluZyB0aGUgbWFuaWZlc3QsIGVuc3VyZSBhbGwgXCJ1bmtub3duXCIga2V5cyBhcmUgYWRkZWQgdG8gdGhlXG4gIC8vIG5ldyBtYW5pZmVzdCwgc28gd2UgZG9uJ3QgaW5hZHZlcnRlbnRseSBkZWxldGUgc29tZXRoaW5nIHdlIGRvbid0IHVuZGVyc3RhbmRcbiAgdW5rbm93blJlY29yZHNBcnJheS5mb3JFYWNoKChyZWNvcmQ6IFVua25vd25SZWNvcmQpID0+IHtcbiAgICBjb25zdCBpZGVudGlmaWVyID0gbmV3IFByb3RvLk1hbmlmZXN0UmVjb3JkLklkZW50aWZpZXIoKTtcbiAgICBpZGVudGlmaWVyLnR5cGUgPSByZWNvcmQuaXRlbVR5cGU7XG4gICAgaWRlbnRpZmllci5yYXcgPSBCeXRlcy5mcm9tQmFzZTY0KHJlY29yZC5zdG9yYWdlSUQpO1xuXG4gICAgbWFuaWZlc3RSZWNvcmRLZXlzLmFkZChpZGVudGlmaWVyKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVjb3Jkc1dpdGhFcnJvcnM6IFJlYWRvbmx5QXJyYXk8VW5rbm93blJlY29yZD4gPSB3aW5kb3cuc3RvcmFnZS5nZXQoXG4gICAgJ3N0b3JhZ2Utc2VydmljZS1lcnJvci1yZWNvcmRzJyxcbiAgICBuZXcgQXJyYXk8VW5rbm93blJlY29yZD4oKVxuICApO1xuICBjb25zdCByZWRhY3RlZEVycm9ycyA9IHJlY29yZHNXaXRoRXJyb3JzLm1hcChyZWRhY3RFeHRlbmRlZFN0b3JhZ2VJRCk7XG5cbiAgbG9nLmluZm8oXG4gICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogYWRkaW5nIGVycm9yIGAgK1xuICAgICAgYHJlY29yZHM9JHtKU09OLnN0cmluZ2lmeShyZWRhY3RlZEVycm9ycyl9IGNvdW50PSR7cmVkYWN0ZWRFcnJvcnMubGVuZ3RofWBcbiAgKTtcblxuICAvLyBUaGVzZSByZWNvcmRzIGZhaWxlZCB0byBtZXJnZSBpbiB0aGUgcHJldmlvdXMgZmV0Y2hNYW5pZmVzdCwgYnV0IHdlIHN0aWxsXG4gIC8vIG5lZWQgdG8gaW5jbHVkZSB0aGVtIHNvIHRoYXQgdGhlIG1hbmlmZXN0IGlzIGNvbXBsZXRlXG4gIHJlY29yZHNXaXRoRXJyb3JzLmZvckVhY2goKHJlY29yZDogVW5rbm93blJlY29yZCkgPT4ge1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBuZXcgUHJvdG8uTWFuaWZlc3RSZWNvcmQuSWRlbnRpZmllcigpO1xuICAgIGlkZW50aWZpZXIudHlwZSA9IHJlY29yZC5pdGVtVHlwZTtcbiAgICBpZGVudGlmaWVyLnJhdyA9IEJ5dGVzLmZyb21CYXNlNjQocmVjb3JkLnN0b3JhZ2VJRCk7XG5cbiAgICBtYW5pZmVzdFJlY29yZEtleXMuYWRkKGlkZW50aWZpZXIpO1xuICB9KTtcblxuICAvLyBEZWxldGUga2V5cyB0aGF0IHdlIHdhbnRlZCB0byBkcm9wIGR1cmluZyB0aGUgcHJvY2Vzc2luZyBvZiB0aGUgbWFuaWZlc3QuXG4gIGNvbnN0IHN0b3JlZFBlbmRpbmdEZWxldGVzID0gd2luZG93LnN0b3JhZ2UuZ2V0KFxuICAgICdzdG9yYWdlLXNlcnZpY2UtcGVuZGluZy1kZWxldGVzJyxcbiAgICBbXVxuICApO1xuICBjb25zdCByZWRhY3RlZFBlbmRpbmdEZWxldGVzID0gc3RvcmVkUGVuZGluZ0RlbGV0ZXMubWFwKFxuICAgIHJlZGFjdEV4dGVuZGVkU3RvcmFnZUlEXG4gICk7XG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IGAgK1xuICAgICAgYGRlbGV0aW5nIGV4dHJhIGtleXM9JHtKU09OLnN0cmluZ2lmeShyZWRhY3RlZFBlbmRpbmdEZWxldGVzKX0gYCArXG4gICAgICBgY291bnQ9JHtyZWRhY3RlZFBlbmRpbmdEZWxldGVzLmxlbmd0aH1gXG4gICk7XG5cbiAgZm9yIChjb25zdCB7IHN0b3JhZ2VJRCB9IG9mIHN0b3JlZFBlbmRpbmdEZWxldGVzKSB7XG4gICAgZGVsZXRlS2V5cy5wdXNoKEJ5dGVzLmZyb21CYXNlNjQoc3RvcmFnZUlEKSk7XG4gIH1cblxuICAvLyBWYWxpZGF0ZSBiZWZvcmUgd3JpdGluZ1xuXG4gIGNvbnN0IHJhd0R1cGxpY2F0ZXMgPSBuZXcgU2V0KCk7XG4gIGNvbnN0IHR5cGVSYXdEdXBsaWNhdGVzID0gbmV3IFNldCgpO1xuICBsZXQgaGFzQWNjb3VudFR5cGUgPSBmYWxzZTtcbiAgbWFuaWZlc3RSZWNvcmRLZXlzLmZvckVhY2goaWRlbnRpZmllciA9PiB7XG4gICAgLy8gRW5zdXJlIHRoZXJlIGFyZSBubyBkdXBsaWNhdGUgU3RvcmFnZUlkZW50aWZpZXJzIGluIHlvdXIgbWFuaWZlc3RcbiAgICAvLyAgIFRoaXMgY2FuIGJlIGJyb2tlbiBkb3duIGludG8gdHdvIHBhcnRzOlxuICAgIC8vICAgICBUaGVyZSBhcmUgbm8gZHVwbGljYXRlIHR5cGUrcmF3IHBhaXJzXG4gICAgLy8gICAgIFRoZXJlIGFyZSBubyBkdXBsaWNhdGUgcmF3IGJ5dGVzXG4gICAgc3RyaWN0QXNzZXJ0KGlkZW50aWZpZXIucmF3LCAnbWFuaWZlc3QgcmVjb3JkIGtleSB3aXRob3V0IHJhdyBpZGVudGlmaWVyJyk7XG4gICAgY29uc3Qgc3RvcmFnZUlEID0gQnl0ZXMudG9CYXNlNjQoaWRlbnRpZmllci5yYXcpO1xuICAgIGNvbnN0IHR5cGVBbmRSYXcgPSBgJHtpZGVudGlmaWVyLnR5cGV9KyR7c3RvcmFnZUlEfWA7XG4gICAgaWYgKFxuICAgICAgcmF3RHVwbGljYXRlcy5oYXMoaWRlbnRpZmllci5yYXcpIHx8XG4gICAgICB0eXBlUmF3RHVwbGljYXRlcy5oYXModHlwZUFuZFJhdylcbiAgICApIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiByZW1vdmluZyBmcm9tIGR1cGxpY2F0ZSBpdGVtIGAgK1xuICAgICAgICAgICdmcm9tIHRoZSBtYW5pZmVzdCcsXG4gICAgICAgIHJlZGFjdFN0b3JhZ2VJRChzdG9yYWdlSUQpLFxuICAgICAgICBpZGVudGlmaWVyLnR5cGVcbiAgICAgICk7XG4gICAgICBtYW5pZmVzdFJlY29yZEtleXMuZGVsZXRlKGlkZW50aWZpZXIpO1xuICAgIH1cbiAgICByYXdEdXBsaWNhdGVzLmFkZChpZGVudGlmaWVyLnJhdyk7XG4gICAgdHlwZVJhd0R1cGxpY2F0ZXMuYWRkKHR5cGVBbmRSYXcpO1xuXG4gICAgLy8gRW5zdXJlIGFsbCBkZWxldGVzIGFyZSBub3QgcHJlc2VudCBpbiB0aGUgbWFuaWZlc3RcbiAgICBjb25zdCBoYXNEZWxldGVLZXkgPSBkZWxldGVLZXlzLmZpbmQoXG4gICAgICBrZXkgPT4gQnl0ZXMudG9CYXNlNjQoa2V5KSA9PT0gc3RvcmFnZUlEXG4gICAgKTtcbiAgICBpZiAoaGFzRGVsZXRlS2V5KSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogcmVtb3Zpbmcga2V5IHdoaWNoIGhhcyBiZWVuIGRlbGV0ZWRgLFxuICAgICAgICByZWRhY3RTdG9yYWdlSUQoc3RvcmFnZUlEKSxcbiAgICAgICAgaWRlbnRpZmllci50eXBlXG4gICAgICApO1xuICAgICAgbWFuaWZlc3RSZWNvcmRLZXlzLmRlbGV0ZShpZGVudGlmaWVyKTtcbiAgICB9XG5cbiAgICAvLyBFbnN1cmUgdGhhdCB0aGVyZSBpcyAqZXhhY3RseSogb25lIEFjY291bnQgdHlwZSBpbiB0aGUgbWFuaWZlc3RcbiAgICBpZiAoaWRlbnRpZmllci50eXBlID09PSBJVEVNX1RZUEUuQUNDT1VOVCkge1xuICAgICAgaWYgKGhhc0FjY291bnRUeXBlKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IHJlbW92aW5nIGR1cGxpY2F0ZSBhY2NvdW50YCxcbiAgICAgICAgICByZWRhY3RTdG9yYWdlSUQoc3RvcmFnZUlEKVxuICAgICAgICApO1xuICAgICAgICBtYW5pZmVzdFJlY29yZEtleXMuZGVsZXRlKGlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgICAgaGFzQWNjb3VudFR5cGUgPSB0cnVlO1xuICAgIH1cbiAgfSk7XG5cbiAgcmF3RHVwbGljYXRlcy5jbGVhcigpO1xuICB0eXBlUmF3RHVwbGljYXRlcy5jbGVhcigpO1xuXG4gIGNvbnN0IHN0b3JhZ2VLZXlEdXBsaWNhdGVzID0gbmV3IFNldDxzdHJpbmc+KCk7XG5cbiAgbmV3SXRlbXMuZm9yRWFjaChzdG9yYWdlSXRlbSA9PiB7XG4gICAgLy8gRW5zdXJlIHRoZXJlIGFyZSBubyBkdXBsaWNhdGUgU3RvcmFnZUlkZW50aWZpZXJzIGluIHlvdXIgbGlzdCBvZiBpbnNlcnRzXG4gICAgc3RyaWN0QXNzZXJ0KHN0b3JhZ2VJdGVtLmtleSwgJ05ldyBzdG9yYWdlIGl0ZW0gd2l0aG91dCBrZXknKTtcblxuICAgIGNvbnN0IHN0b3JhZ2VJRCA9IEJ5dGVzLnRvQmFzZTY0KHN0b3JhZ2VJdGVtLmtleSk7XG4gICAgaWYgKHN0b3JhZ2VLZXlEdXBsaWNhdGVzLmhhcyhzdG9yYWdlSUQpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogYCArXG4gICAgICAgICAgJ3JlbW92aW5nIGR1cGxpY2F0ZSBpZGVudGlmaWVyIGZyb20gaW5zZXJ0cycsXG4gICAgICAgIHJlZGFjdFN0b3JhZ2VJRChzdG9yYWdlSUQpXG4gICAgICApO1xuICAgICAgbmV3SXRlbXMuZGVsZXRlKHN0b3JhZ2VJdGVtKTtcbiAgICB9XG4gICAgc3RvcmFnZUtleUR1cGxpY2F0ZXMuYWRkKHN0b3JhZ2VJRCk7XG4gIH0pO1xuXG4gIHN0b3JhZ2VLZXlEdXBsaWNhdGVzLmNsZWFyKCk7XG5cbiAgLy8gSWYgd2UgaGF2ZSBhIGNvcHkgb2Ygd2hhdCB0aGUgY3VycmVudCByZW1vdGUgbWFuaWZlc3QgaXMgdGhlbiB3ZSBydW4gdGhlc2VcbiAgLy8gYWRkaXRpb25hbCB2YWxpZGF0aW9ucyBjb21wYXJpbmcgb3VyIHBlbmRpbmcgbWFuaWZlc3QgdG8gdGhlIHJlbW90ZVxuICAvLyBtYW5pZmVzdDpcbiAgaWYgKHByZXZpb3VzTWFuaWZlc3QpIHtcbiAgICBjb25zdCBwZW5kaW5nSW5zZXJ0czogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gICAgY29uc3QgcGVuZGluZ0RlbGV0ZXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuXG4gICAgY29uc3QgcmVtb3RlS2V5czogU2V0PHN0cmluZz4gPSBuZXcgU2V0KCk7XG4gICAgKHByZXZpb3VzTWFuaWZlc3Qua2V5cyA/PyBbXSkuZm9yRWFjaChcbiAgICAgIChpZGVudGlmaWVyOiBJTWFuaWZlc3RSZWNvcmRJZGVudGlmaWVyKSA9PiB7XG4gICAgICAgIHN0cmljdEFzc2VydChpZGVudGlmaWVyLnJhdywgJ0lkZW50aWZpZXIgd2l0aG91dCByYXcgZmllbGQnKTtcbiAgICAgICAgY29uc3Qgc3RvcmFnZUlEID0gQnl0ZXMudG9CYXNlNjQoaWRlbnRpZmllci5yYXcpO1xuICAgICAgICByZW1vdGVLZXlzLmFkZChzdG9yYWdlSUQpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBsb2NhbEtleXM6IFNldDxzdHJpbmc+ID0gbmV3IFNldCgpO1xuICAgIG1hbmlmZXN0UmVjb3JkS2V5cy5mb3JFYWNoKChpZGVudGlmaWVyOiBJTWFuaWZlc3RSZWNvcmRJZGVudGlmaWVyKSA9PiB7XG4gICAgICBzdHJpY3RBc3NlcnQoaWRlbnRpZmllci5yYXcsICdJZGVudGlmaWVyIHdpdGhvdXQgcmF3IGZpZWxkJyk7XG4gICAgICBjb25zdCBzdG9yYWdlSUQgPSBCeXRlcy50b0Jhc2U2NChpZGVudGlmaWVyLnJhdyk7XG4gICAgICBsb2NhbEtleXMuYWRkKHN0b3JhZ2VJRCk7XG5cbiAgICAgIGlmICghcmVtb3RlS2V5cy5oYXMoc3RvcmFnZUlEKSkge1xuICAgICAgICBwZW5kaW5nSW5zZXJ0cy5hZGQoc3RvcmFnZUlEKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJlbW90ZUtleXMuZm9yRWFjaChzdG9yYWdlSUQgPT4ge1xuICAgICAgaWYgKCFsb2NhbEtleXMuaGFzKHN0b3JhZ2VJRCkpIHtcbiAgICAgICAgcGVuZGluZ0RlbGV0ZXMuYWRkKHN0b3JhZ2VJRCk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoZGVsZXRlS2V5cy5sZW5ndGggIT09IHBlbmRpbmdEZWxldGVzLnNpemUpIHtcbiAgICAgIGNvbnN0IGxvY2FsRGVsZXRlcyA9IGRlbGV0ZUtleXMubWFwKGtleSA9PlxuICAgICAgICByZWRhY3RTdG9yYWdlSUQoQnl0ZXMudG9CYXNlNjQoa2V5KSlcbiAgICAgICk7XG4gICAgICBjb25zdCByZW1vdGVEZWxldGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gICAgICBwZW5kaW5nRGVsZXRlcy5mb3JFYWNoKGlkID0+IHJlbW90ZURlbGV0ZXMucHVzaChyZWRhY3RTdG9yYWdlSUQoaWQpKSk7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IGRlbGV0ZSBrZXkgc2l6ZXMgZG8gbm90IG1hdGNoYCxcbiAgICAgICAgJ2xvY2FsJyxcbiAgICAgICAgbG9jYWxEZWxldGVzLmpvaW4oJywnKSxcbiAgICAgICAgJ3JlbW90ZScsXG4gICAgICAgIHJlbW90ZURlbGV0ZXMuam9pbignLCcpXG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdpbnZhbGlkIHdyaXRlIGRlbGV0ZSBrZXlzIGxlbmd0aCBkbyBub3QgbWF0Y2gnKTtcbiAgICB9XG4gICAgaWYgKG5ld0l0ZW1zLnNpemUgIT09IHBlbmRpbmdJbnNlcnRzLnNpemUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW52YWxpZCB3cml0ZSBpbnNlcnQgaXRlbXMgbGVuZ3RoIGRvIG5vdCBtYXRjaCcpO1xuICAgIH1cbiAgICBkZWxldGVLZXlzLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIGNvbnN0IHN0b3JhZ2VJRCA9IEJ5dGVzLnRvQmFzZTY0KGtleSk7XG4gICAgICBpZiAoIXBlbmRpbmdEZWxldGVzLmhhcyhzdG9yYWdlSUQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnaW52YWxpZCB3cml0ZSBkZWxldGUga2V5IG1pc3NpbmcgZnJvbSBwZW5kaW5nIGRlbGV0ZXMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gICAgaW5zZXJ0S2V5cy5mb3JFYWNoKHN0b3JhZ2VJRCA9PiB7XG4gICAgICBpZiAoIXBlbmRpbmdJbnNlcnRzLmhhcyhzdG9yYWdlSUQpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnaW52YWxpZCB3cml0ZSBpbnNlcnQga2V5IG1pc3NpbmcgZnJvbSBwZW5kaW5nIGluc2VydHMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBtYW5pZmVzdFJlY29yZCA9IG5ldyBQcm90by5NYW5pZmVzdFJlY29yZCgpO1xuICBtYW5pZmVzdFJlY29yZC52ZXJzaW9uID0gTG9uZy5mcm9tTnVtYmVyKHZlcnNpb24pO1xuICBtYW5pZmVzdFJlY29yZC5zb3VyY2VEZXZpY2UgPSB3aW5kb3cuc3RvcmFnZS51c2VyLmdldERldmljZUlkKCkgPz8gMDtcbiAgbWFuaWZlc3RSZWNvcmQua2V5cyA9IEFycmF5LmZyb20obWFuaWZlc3RSZWNvcmRLZXlzKTtcblxuICBjb25zdCBzdG9yYWdlS2V5QmFzZTY0ID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlS2V5Jyk7XG4gIGlmICghc3RvcmFnZUtleUJhc2U2NCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gc3RvcmFnZSBrZXknKTtcbiAgfVxuICBjb25zdCBzdG9yYWdlS2V5ID0gQnl0ZXMuZnJvbUJhc2U2NChzdG9yYWdlS2V5QmFzZTY0KTtcbiAgY29uc3Qgc3RvcmFnZU1hbmlmZXN0S2V5ID0gZGVyaXZlU3RvcmFnZU1hbmlmZXN0S2V5KFxuICAgIHN0b3JhZ2VLZXksXG4gICAgTG9uZy5mcm9tTnVtYmVyKHZlcnNpb24pXG4gICk7XG4gIGNvbnN0IGVuY3J5cHRlZE1hbmlmZXN0ID0gZW5jcnlwdFByb2ZpbGUoXG4gICAgUHJvdG8uTWFuaWZlc3RSZWNvcmQuZW5jb2RlKG1hbmlmZXN0UmVjb3JkKS5maW5pc2goKSxcbiAgICBzdG9yYWdlTWFuaWZlc3RLZXlcbiAgKTtcblxuICBjb25zdCBzdG9yYWdlTWFuaWZlc3QgPSBuZXcgUHJvdG8uU3RvcmFnZU1hbmlmZXN0KCk7XG4gIHN0b3JhZ2VNYW5pZmVzdC52ZXJzaW9uID0gbWFuaWZlc3RSZWNvcmQudmVyc2lvbjtcbiAgc3RvcmFnZU1hbmlmZXN0LnZhbHVlID0gZW5jcnlwdGVkTWFuaWZlc3Q7XG5cbiAgcmV0dXJuIHtcbiAgICBwb3N0VXBsb2FkVXBkYXRlRnVuY3Rpb25zLFxuICAgIGRlbGV0ZUtleXMsXG4gICAgbmV3SXRlbXMsXG4gICAgc3RvcmFnZU1hbmlmZXN0LFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGxvYWRNYW5pZmVzdChcbiAgdmVyc2lvbjogbnVtYmVyLFxuICB7XG4gICAgcG9zdFVwbG9hZFVwZGF0ZUZ1bmN0aW9ucyxcbiAgICBkZWxldGVLZXlzLFxuICAgIG5ld0l0ZW1zLFxuICAgIHN0b3JhZ2VNYW5pZmVzdCxcbiAgfTogR2VuZXJhdGVkTWFuaWZlc3RUeXBlXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3JhZ2VTZXJ2aWNlLnVwbG9hZE1hbmlmZXN0OiBXZSBhcmUgb2ZmbGluZSEnKTtcbiAgfVxuXG4gIGlmIChuZXdJdGVtcy5zaXplID09PSAwICYmIGRlbGV0ZUtleXMubGVuZ3RoID09PSAwKSB7XG4gICAgbG9nLmluZm8oYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogbm90aGluZyB0byB1cGxvYWRgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjcmVkZW50aWFscyA9IHdpbmRvdy5zdG9yYWdlLmdldCgnc3RvcmFnZUNyZWRlbnRpYWxzJyk7XG4gIHRyeSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBpbnNlcnRpbmc9JHtuZXdJdGVtcy5zaXplfSBgICtcbiAgICAgICAgYGRlbGV0aW5nPSR7ZGVsZXRlS2V5cy5sZW5ndGh9YFxuICAgICk7XG5cbiAgICBjb25zdCB3cml0ZU9wZXJhdGlvbiA9IG5ldyBQcm90by5Xcml0ZU9wZXJhdGlvbigpO1xuICAgIHdyaXRlT3BlcmF0aW9uLm1hbmlmZXN0ID0gc3RvcmFnZU1hbmlmZXN0O1xuICAgIHdyaXRlT3BlcmF0aW9uLmluc2VydEl0ZW0gPSBBcnJheS5mcm9tKG5ld0l0ZW1zKTtcbiAgICB3cml0ZU9wZXJhdGlvbi5kZWxldGVLZXkgPSBkZWxldGVLZXlzO1xuXG4gICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLm1vZGlmeVN0b3JhZ2VSZWNvcmRzKFxuICAgICAgUHJvdG8uV3JpdGVPcGVyYXRpb24uZW5jb2RlKHdyaXRlT3BlcmF0aW9uKS5maW5pc2goKSxcbiAgICAgIHtcbiAgICAgICAgY3JlZGVudGlhbHMsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogdXBsb2FkIGNvbXBsZXRlLCB1cGRhdGluZyBgICtcbiAgICAgICAgYGl0ZW1zPSR7cG9zdFVwbG9hZFVwZGF0ZUZ1bmN0aW9ucy5sZW5ndGh9YFxuICAgICk7XG5cbiAgICAvLyB1cGRhdGUgY29udmVyc2F0aW9ucyB3aXRoIHRoZSBuZXcgc3RvcmFnZUlEXG4gICAgcG9zdFVwbG9hZFVwZGF0ZUZ1bmN0aW9ucy5mb3JFYWNoKGZuID0+IGZuKCkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBmYWlsZWQhYCxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnIpXG4gICAgKTtcblxuICAgIGlmIChlcnIuY29kZSA9PT0gNDA5KSB7XG4gICAgICBpZiAoY29uZmxpY3RCYWNrT2ZmLmlzRnVsbCgpKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBleGNlZWRlZCBtYXhpbXVtIGNvbnNlY3V0aXZlIGAgK1xuICAgICAgICAgICAgJ2NvbmZsaWN0cydcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnVwbG9hZCgke3ZlcnNpb259KTogY29uZmxpY3QgZm91bmQgd2l0aCBgICtcbiAgICAgICAgICBgdmVyc2lvbj0ke3ZlcnNpb259LCBydW5uaW5nIHN5bmMgam9iIGAgK1xuICAgICAgICAgIGB0aW1lcz0ke2NvbmZsaWN0QmFja09mZi5nZXRJbmRleCgpfWBcbiAgICAgICk7XG5cbiAgICAgIHRocm93IGVycjtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICBsb2cuaW5mbyhgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBzZXR0aW5nIG5ldyBtYW5pZmVzdFZlcnNpb25gKTtcbiAgd2luZG93LnN0b3JhZ2UucHV0KCdtYW5pZmVzdFZlcnNpb24nLCB2ZXJzaW9uKTtcbiAgY29uZmxpY3RCYWNrT2ZmLnJlc2V0KCk7XG4gIGJhY2tPZmYucmVzZXQoKTtcblxuICB0cnkge1xuICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKE1lc3NhZ2VTZW5kZXIuZ2V0RmV0Y2hNYW5pZmVzdFN5bmNNZXNzYWdlKCkpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IEZhaWxlZCB0byBxdWV1ZSBzeW5jIG1lc3NhZ2VgLFxuICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICk7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gc3RvcFN0b3JhZ2VTZXJ2aWNlU3luYyhyZWFzb246IEVycm9yKSB7XG4gIGxvZy53YXJuKCdzdG9yYWdlU2VydmljZS5zdG9wU3RvcmFnZVNlcnZpY2VTeW5jJywgRXJyb3JzLnRvTG9nRm9ybWF0KHJlYXNvbikpO1xuXG4gIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnc3RvcmFnZUtleScpO1xuXG4gIGlmIChiYWNrT2ZmLmlzRnVsbCgpKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICAnc3RvcmFnZVNlcnZpY2Uuc3RvcFN0b3JhZ2VTZXJ2aWNlU3luYzogdG9vIG1hbnkgY29uc2VjdXRpdmUgc3RvcHMnXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBhd2FpdCBzbGVlcChiYWNrT2ZmLmdldEFuZEluY3JlbWVudCgpKTtcbiAgbG9nLmluZm8oJ3N0b3JhZ2VTZXJ2aWNlLnN0b3BTdG9yYWdlU2VydmljZVN5bmM6IHJlcXVlc3RpbmcgbmV3IGtleXMnKTtcbiAgc2V0VGltZW91dChhc3luYyAoKSA9PiB7XG4gICAgaWYgKHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmFyZVdlUHJpbWFyeURldmljZSgpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ3N0b3BTdG9yYWdlU2VydmljZVN5bmM6IFdlIGFyZSBwcmltYXJ5IGRldmljZTsgbm90IHNlbmRpbmcga2V5IHN5bmMgcmVxdWVzdCdcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaW5nbGVQcm90b0pvYlF1ZXVlLmFkZChNZXNzYWdlU2VuZGVyLmdldFJlcXVlc3RLZXlTeW5jTWVzc2FnZSgpKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnc3RvcmFnZVNlcnZpY2Uuc3RvcFN0b3JhZ2VTZXJ2aWNlU3luYzogRmFpbGVkIHRvIHF1ZXVlIHN5bmMgbWVzc2FnZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlTmV3TWFuaWZlc3QoKSB7XG4gIGxvZy5pbmZvKCdzdG9yYWdlU2VydmljZS5jcmVhdGVOZXdNYW5pZmVzdDogY3JlYXRpbmcgbmV3IG1hbmlmZXN0Jyk7XG5cbiAgY29uc3QgdmVyc2lvbiA9IHdpbmRvdy5zdG9yYWdlLmdldCgnbWFuaWZlc3RWZXJzaW9uJywgMCk7XG5cbiAgY29uc3QgeyBwb3N0VXBsb2FkVXBkYXRlRnVuY3Rpb25zLCBuZXdJdGVtcywgc3RvcmFnZU1hbmlmZXN0IH0gPVxuICAgIGF3YWl0IGdlbmVyYXRlTWFuaWZlc3QodmVyc2lvbiwgdW5kZWZpbmVkLCB0cnVlKTtcblxuICBhd2FpdCB1cGxvYWRNYW5pZmVzdCh2ZXJzaW9uLCB7XG4gICAgcG9zdFVwbG9hZFVwZGF0ZUZ1bmN0aW9ucyxcbiAgICAvLyB3ZSBoYXZlIGNyZWF0ZWQgYSBuZXcgbWFuaWZlc3QsIHRoZXJlIHNob3VsZCBiZSBubyBrZXlzIHRvIGRlbGV0ZVxuICAgIGRlbGV0ZUtleXM6IFtdLFxuICAgIG5ld0l0ZW1zLFxuICAgIHN0b3JhZ2VNYW5pZmVzdCxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlY3J5cHRNYW5pZmVzdChcbiAgZW5jcnlwdGVkTWFuaWZlc3Q6IFByb3RvLklTdG9yYWdlTWFuaWZlc3Rcbik6IFByb21pc2U8UHJvdG8uTWFuaWZlc3RSZWNvcmQ+IHtcbiAgY29uc3QgeyB2ZXJzaW9uLCB2YWx1ZSB9ID0gZW5jcnlwdGVkTWFuaWZlc3Q7XG5cbiAgY29uc3Qgc3RvcmFnZUtleUJhc2U2NCA9IHdpbmRvdy5zdG9yYWdlLmdldCgnc3RvcmFnZUtleScpO1xuICBpZiAoIXN0b3JhZ2VLZXlCYXNlNjQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHN0b3JhZ2Uga2V5Jyk7XG4gIH1cbiAgY29uc3Qgc3RvcmFnZUtleSA9IEJ5dGVzLmZyb21CYXNlNjQoc3RvcmFnZUtleUJhc2U2NCk7XG4gIGNvbnN0IHN0b3JhZ2VNYW5pZmVzdEtleSA9IGRlcml2ZVN0b3JhZ2VNYW5pZmVzdEtleShcbiAgICBzdG9yYWdlS2V5LFxuICAgIGRyb3BOdWxsKHZlcnNpb24pXG4gICk7XG5cbiAgc3RyaWN0QXNzZXJ0KHZhbHVlLCAnU3RvcmFnZU1hbmlmZXN0IGhhcyBubyB2YWx1ZSBmaWVsZCcpO1xuICBjb25zdCBkZWNyeXB0ZWRNYW5pZmVzdCA9IGRlY3J5cHRQcm9maWxlKHZhbHVlLCBzdG9yYWdlTWFuaWZlc3RLZXkpO1xuXG4gIHJldHVybiBQcm90by5NYW5pZmVzdFJlY29yZC5kZWNvZGUoZGVjcnlwdGVkTWFuaWZlc3QpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaE1hbmlmZXN0KFxuICBtYW5pZmVzdFZlcnNpb246IG51bWJlclxuKTogUHJvbWlzZTxQcm90by5NYW5pZmVzdFJlY29yZCB8IHVuZGVmaW5lZD4ge1xuICBsb2cuaW5mbygnc3RvcmFnZVNlcnZpY2Uuc3luYzogZmV0Y2ggc3RhcnQnKTtcblxuICBpZiAoIXdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcignc3RvcmFnZVNlcnZpY2Uuc3luYzogd2UgYXJlIG9mZmxpbmUhJyk7XG4gIH1cblxuICB0cnkge1xuICAgIGNvbnN0IGNyZWRlbnRpYWxzID1cbiAgICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZy5nZXRTdG9yYWdlQ3JlZGVudGlhbHMoKTtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3N0b3JhZ2VDcmVkZW50aWFscycsIGNyZWRlbnRpYWxzKTtcblxuICAgIGNvbnN0IG1hbmlmZXN0QmluYXJ5ID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLmdldFN0b3JhZ2VNYW5pZmVzdChcbiAgICAgIHtcbiAgICAgICAgY3JlZGVudGlhbHMsXG4gICAgICAgIGdyZWF0ZXJUaGFuVmVyc2lvbjogbWFuaWZlc3RWZXJzaW9uLFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3QgZW5jcnlwdGVkTWFuaWZlc3QgPSBQcm90by5TdG9yYWdlTWFuaWZlc3QuZGVjb2RlKG1hbmlmZXN0QmluYXJ5KTtcblxuICAgIHRyeSB7XG4gICAgICByZXR1cm4gZGVjcnlwdE1hbmlmZXN0KGVuY3J5cHRlZE1hbmlmZXN0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGF3YWl0IHN0b3BTdG9yYWdlU2VydmljZVN5bmMoZXJyKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGlmIChlcnIuY29kZSA9PT0gMjA0KSB7XG4gICAgICBsb2cuaW5mbygnc3RvcmFnZVNlcnZpY2Uuc3luYzogbm8gbmV3ZXIgbWFuaWZlc3QsIG9rJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmVycm9yKCdzdG9yYWdlU2VydmljZS5zeW5jOiBmYWlsZWQhJywgRXJyb3JzLnRvTG9nRm9ybWF0KGVycikpO1xuXG4gICAgaWYgKGVyci5jb2RlID09PSA0MDQpIHtcbiAgICAgIGF3YWl0IGNyZWF0ZU5ld01hbmlmZXN0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyO1xuICB9XG59XG5cbnR5cGUgTWVyZ2VhYmxlSXRlbVR5cGUgPSB7XG4gIGl0ZW1UeXBlOiBudW1iZXI7XG4gIHN0b3JhZ2VJRDogc3RyaW5nO1xuICBzdG9yYWdlUmVjb3JkOiBQcm90by5JU3RvcmFnZVJlY29yZDtcbn07XG5cbnR5cGUgTWVyZ2VkUmVjb3JkVHlwZSA9IFVua25vd25SZWNvcmQgJiB7XG4gIGhhc0NvbmZsaWN0OiBib29sZWFuO1xuICBzaG91bGREcm9wOiBib29sZWFuO1xuICBoYXNFcnJvcjogYm9vbGVhbjtcbiAgaXNVbnN1cHBvcnRlZDogYm9vbGVhbjtcbiAgdXBkYXRlZENvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+O1xuICBuZWVkUHJvZmlsZUZldGNoOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvbk1vZGVsPjtcbn07XG5cbmFzeW5jIGZ1bmN0aW9uIG1lcmdlUmVjb3JkKFxuICBzdG9yYWdlVmVyc2lvbjogbnVtYmVyLFxuICBpdGVtVG9NZXJnZTogTWVyZ2VhYmxlSXRlbVR5cGVcbik6IFByb21pc2U8TWVyZ2VkUmVjb3JkVHlwZT4ge1xuICBjb25zdCB7IGl0ZW1UeXBlLCBzdG9yYWdlSUQsIHN0b3JhZ2VSZWNvcmQgfSA9IGl0ZW1Ub01lcmdlO1xuXG4gIGNvbnN0IElURU1fVFlQRSA9IFByb3RvLk1hbmlmZXN0UmVjb3JkLklkZW50aWZpZXIuVHlwZTtcblxuICBsZXQgbWVyZ2VSZXN1bHQ6IE1lcmdlUmVzdWx0VHlwZSA9IHsgaGFzQ29uZmxpY3Q6IGZhbHNlLCBkZXRhaWxzOiBbXSB9O1xuICBsZXQgaXNVbnN1cHBvcnRlZCA9IGZhbHNlO1xuICBsZXQgaGFzRXJyb3IgPSBmYWxzZTtcbiAgbGV0IHVwZGF0ZWRDb252ZXJzYXRpb25zID0gbmV3IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPigpO1xuICBjb25zdCBuZWVkUHJvZmlsZUZldGNoID0gbmV3IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPigpO1xuXG4gIHRyeSB7XG4gICAgaWYgKGl0ZW1UeXBlID09PSBJVEVNX1RZUEUuVU5LTk9XTikge1xuICAgICAgbG9nLndhcm4oJ3N0b3JhZ2VTZXJ2aWNlLm1lcmdlUmVjb3JkOiBVbmtub3duIGl0ZW0gdHlwZScsIHN0b3JhZ2VJRCk7XG4gICAgfSBlbHNlIGlmIChpdGVtVHlwZSA9PT0gSVRFTV9UWVBFLkNPTlRBQ1QgJiYgc3RvcmFnZVJlY29yZC5jb250YWN0KSB7XG4gICAgICBtZXJnZVJlc3VsdCA9IGF3YWl0IG1lcmdlQ29udGFjdFJlY29yZChcbiAgICAgICAgc3RvcmFnZUlELFxuICAgICAgICBzdG9yYWdlVmVyc2lvbixcbiAgICAgICAgc3RvcmFnZVJlY29yZC5jb250YWN0XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAoaXRlbVR5cGUgPT09IElURU1fVFlQRS5HUk9VUFYxICYmIHN0b3JhZ2VSZWNvcmQuZ3JvdXBWMSkge1xuICAgICAgbWVyZ2VSZXN1bHQgPSBhd2FpdCBtZXJnZUdyb3VwVjFSZWNvcmQoXG4gICAgICAgIHN0b3JhZ2VJRCxcbiAgICAgICAgc3RvcmFnZVZlcnNpb24sXG4gICAgICAgIHN0b3JhZ2VSZWNvcmQuZ3JvdXBWMVxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGl0ZW1UeXBlID09PSBJVEVNX1RZUEUuR1JPVVBWMiAmJiBzdG9yYWdlUmVjb3JkLmdyb3VwVjIpIHtcbiAgICAgIG1lcmdlUmVzdWx0ID0gYXdhaXQgbWVyZ2VHcm91cFYyUmVjb3JkKFxuICAgICAgICBzdG9yYWdlSUQsXG4gICAgICAgIHN0b3JhZ2VWZXJzaW9uLFxuICAgICAgICBzdG9yYWdlUmVjb3JkLmdyb3VwVjJcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpdGVtVHlwZSA9PT0gSVRFTV9UWVBFLkFDQ09VTlQgJiYgc3RvcmFnZVJlY29yZC5hY2NvdW50KSB7XG4gICAgICBtZXJnZVJlc3VsdCA9IGF3YWl0IG1lcmdlQWNjb3VudFJlY29yZChcbiAgICAgICAgc3RvcmFnZUlELFxuICAgICAgICBzdG9yYWdlVmVyc2lvbixcbiAgICAgICAgc3RvcmFnZVJlY29yZC5hY2NvdW50XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc1Vuc3VwcG9ydGVkID0gdHJ1ZTtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgc3RvcmFnZVNlcnZpY2UubWVyZ2UoJHtyZWRhY3RTdG9yYWdlSUQoXG4gICAgICAgICAgc3RvcmFnZUlELFxuICAgICAgICAgIHN0b3JhZ2VWZXJzaW9uXG4gICAgICAgICl9KTogdW5rbm93biBpdGVtIHR5cGU9JHtpdGVtVHlwZX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlZGFjdGVkSUQgPSByZWRhY3RTdG9yYWdlSUQoXG4gICAgICBzdG9yYWdlSUQsXG4gICAgICBzdG9yYWdlVmVyc2lvbixcbiAgICAgIG1lcmdlUmVzdWx0LmNvbnZlcnNhdGlvblxuICAgICk7XG4gICAgY29uc3Qgb2xkSUQgPSBtZXJnZVJlc3VsdC5vbGRTdG9yYWdlSURcbiAgICAgID8gcmVkYWN0U3RvcmFnZUlEKG1lcmdlUmVzdWx0Lm9sZFN0b3JhZ2VJRCwgbWVyZ2VSZXN1bHQub2xkU3RvcmFnZVZlcnNpb24pXG4gICAgICA6ICc/JztcbiAgICB1cGRhdGVkQ29udmVyc2F0aW9ucyA9IFtcbiAgICAgIC4uLnVwZGF0ZWRDb252ZXJzYXRpb25zLFxuICAgICAgLi4uKG1lcmdlUmVzdWx0LnVwZGF0ZWRDb252ZXJzYXRpb25zID8/IFtdKSxcbiAgICBdO1xuICAgIGlmIChtZXJnZVJlc3VsdC5uZWVkc1Byb2ZpbGVGZXRjaCkge1xuICAgICAgc3RyaWN0QXNzZXJ0KG1lcmdlUmVzdWx0LmNvbnZlcnNhdGlvbiwgJ25lZWRzUHJvZmlsZUZldGNoLCBidXQgbm8gY29udm8nKTtcbiAgICAgIG5lZWRQcm9maWxlRmV0Y2gucHVzaChtZXJnZVJlc3VsdC5jb252ZXJzYXRpb24pO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLm1lcmdlKCR7cmVkYWN0ZWRJRH0pOiBtZXJnZWQgaXRlbSB0eXBlPSR7aXRlbVR5cGV9IGAgK1xuICAgICAgICBgb2xkSUQ9JHtvbGRJRH0gYCArXG4gICAgICAgIGBjb25mbGljdD0ke21lcmdlUmVzdWx0Lmhhc0NvbmZsaWN0fSBgICtcbiAgICAgICAgYHNob3VsZERyb3A9JHtCb29sZWFuKG1lcmdlUmVzdWx0LnNob3VsZERyb3ApfSBgICtcbiAgICAgICAgYGRldGFpbHM9JHtKU09OLnN0cmluZ2lmeShtZXJnZVJlc3VsdC5kZXRhaWxzKX1gXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgaGFzRXJyb3IgPSB0cnVlO1xuICAgIGNvbnN0IHJlZGFjdGVkSUQgPSByZWRhY3RTdG9yYWdlSUQoc3RvcmFnZUlELCBzdG9yYWdlVmVyc2lvbik7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLm1lcmdlKCR7cmVkYWN0ZWRJRH0pOiBlcnJvciB3aXRoIGAgK1xuICAgICAgICBgaXRlbSB0eXBlPSR7aXRlbVR5cGV9IGAgK1xuICAgICAgICBgZGV0YWlscz0ke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnIpfWBcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNDb25mbGljdDogbWVyZ2VSZXN1bHQuaGFzQ29uZmxpY3QsXG4gICAgc2hvdWxkRHJvcDogQm9vbGVhbihtZXJnZVJlc3VsdC5zaG91bGREcm9wKSxcbiAgICBoYXNFcnJvcixcbiAgICBpc1Vuc3VwcG9ydGVkLFxuICAgIGl0ZW1UeXBlLFxuICAgIHN0b3JhZ2VJRCxcbiAgICB1cGRhdGVkQ29udmVyc2F0aW9ucyxcbiAgICBuZWVkUHJvZmlsZUZldGNoLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzTWFuaWZlc3QoXG4gIG1hbmlmZXN0OiBQcm90by5JTWFuaWZlc3RSZWNvcmQsXG4gIHZlcnNpb246IG51bWJlclxuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3JhZ2VTZXJ2aWNlLnByb2Nlc3NNYW5pZmVzdDogV2UgYXJlIG9mZmxpbmUhJyk7XG4gIH1cblxuICBjb25zdCByZW1vdGVLZXlzVHlwZU1hcCA9IG5ldyBNYXAoKTtcbiAgKG1hbmlmZXN0LmtleXMgfHwgW10pLmZvckVhY2goKHsgcmF3LCB0eXBlIH06IElNYW5pZmVzdFJlY29yZElkZW50aWZpZXIpID0+IHtcbiAgICBzdHJpY3RBc3NlcnQocmF3LCAnSWRlbnRpZmllciB3aXRob3V0IHJhdyBmaWVsZCcpO1xuICAgIHJlbW90ZUtleXNUeXBlTWFwLnNldChCeXRlcy50b0Jhc2U2NChyYXcpLCB0eXBlKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVtb3RlS2V5cyA9IG5ldyBTZXQocmVtb3RlS2V5c1R5cGVNYXAua2V5cygpKTtcbiAgY29uc3QgbG9jYWxWZXJzaW9ucyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXIgfCB1bmRlZmluZWQ+KCk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9ucyA9IHdpbmRvdy5nZXRDb252ZXJzYXRpb25zKCk7XG4gIGNvbnZlcnNhdGlvbnMuZm9yRWFjaCgoY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCkgPT4ge1xuICAgIGNvbnN0IHN0b3JhZ2VJRCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3N0b3JhZ2VJRCcpO1xuICAgIGlmIChzdG9yYWdlSUQpIHtcbiAgICAgIGxvY2FsVmVyc2lvbnMuc2V0KHN0b3JhZ2VJRCwgY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKSk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCB1bmtub3duUmVjb3Jkc0FycmF5OiBSZWFkb25seUFycmF5PFVua25vd25SZWNvcmQ+ID1cbiAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3N0b3JhZ2Utc2VydmljZS11bmtub3duLXJlY29yZHMnKSB8fCBbXTtcblxuICBjb25zdCBzdGlsbFVua25vd24gPSB1bmtub3duUmVjb3Jkc0FycmF5LmZpbHRlcigocmVjb3JkOiBVbmtub3duUmVjb3JkKSA9PiB7XG4gICAgLy8gRG8gbm90IGluY2x1ZGUgYW55IHVua25vd24gcmVjb3JkcyB0aGF0IHdlIGFscmVhZHkgc3VwcG9ydFxuICAgIGlmICghdmFsaWRSZWNvcmRUeXBlcy5oYXMocmVjb3JkLml0ZW1UeXBlKSkge1xuICAgICAgbG9jYWxWZXJzaW9ucy5zZXQocmVjb3JkLnN0b3JhZ2VJRCwgcmVjb3JkLnN0b3JhZ2VWZXJzaW9uKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH0pO1xuXG4gIGNvbnN0IHJlbW90ZU9ubHlTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBrZXkgb2YgcmVtb3RlS2V5cykge1xuICAgIGlmICghbG9jYWxWZXJzaW9ucy5oYXMoa2V5KSkge1xuICAgICAgcmVtb3RlT25seVNldC5hZGQoa2V5KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCBsb2NhbE9ubHlTZXQgPSBuZXcgU2V0PHN0cmluZz4oKTtcbiAgZm9yIChjb25zdCBrZXkgb2YgbG9jYWxWZXJzaW9ucy5rZXlzKCkpIHtcbiAgICBpZiAoIXJlbW90ZUtleXMuaGFzKGtleSkpIHtcbiAgICAgIGxvY2FsT25seVNldC5hZGQoa2V5KTtcbiAgICB9XG4gIH1cblxuICBjb25zdCByZWRhY3RlZFJlbW90ZU9ubHkgPSBBcnJheS5mcm9tKHJlbW90ZU9ubHlTZXQpLm1hcChpZCA9PlxuICAgIHJlZGFjdFN0b3JhZ2VJRChpZCwgdmVyc2lvbilcbiAgKTtcbiAgY29uc3QgcmVkYWN0ZWRMb2NhbE9ubHkgPSBBcnJheS5mcm9tKGxvY2FsT25seVNldCkubWFwKGlkID0+XG4gICAgcmVkYWN0U3RvcmFnZUlEKGlkLCBsb2NhbFZlcnNpb25zLmdldChpZCkpXG4gICk7XG5cbiAgbG9nLmluZm8oXG4gICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHt2ZXJzaW9ufSk6IGxvY2FsUmVjb3Jkcz0ke2NvbnZlcnNhdGlvbnMubGVuZ3RofSBgICtcbiAgICAgIGBsb2NhbEtleXM9JHtsb2NhbFZlcnNpb25zLnNpemV9IHVua25vd25LZXlzPSR7c3RpbGxVbmtub3duLmxlbmd0aH0gYCArXG4gICAgICBgcmVtb3RlS2V5cz0ke3JlbW90ZUtleXMuc2l6ZX1gXG4gICk7XG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7dmVyc2lvbn0pOiBgICtcbiAgICAgIGByZW1vdGVPbmx5Q291bnQ9JHtyZW1vdGVPbmx5U2V0LnNpemV9IGAgK1xuICAgICAgYHJlbW90ZU9ubHlLZXlzPSR7SlNPTi5zdHJpbmdpZnkocmVkYWN0ZWRSZW1vdGVPbmx5KX1gXG4gICk7XG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7dmVyc2lvbn0pOiBgICtcbiAgICAgIGBsb2NhbE9ubHlDb3VudD0ke2xvY2FsT25seVNldC5zaXplfSBgICtcbiAgICAgIGBsb2NhbE9ubHlLZXlzPSR7SlNPTi5zdHJpbmdpZnkocmVkYWN0ZWRMb2NhbE9ubHkpfWBcbiAgKTtcblxuICBjb25zdCByZW1vdGVPbmx5UmVjb3JkcyA9IG5ldyBNYXA8c3RyaW5nLCBSZW1vdGVSZWNvcmQ+KCk7XG4gIHJlbW90ZU9ubHlTZXQuZm9yRWFjaChzdG9yYWdlSUQgPT4ge1xuICAgIHJlbW90ZU9ubHlSZWNvcmRzLnNldChzdG9yYWdlSUQsIHtcbiAgICAgIHN0b3JhZ2VJRCxcbiAgICAgIGl0ZW1UeXBlOiByZW1vdGVLZXlzVHlwZU1hcC5nZXQoc3RvcmFnZUlEKSxcbiAgICB9KTtcbiAgfSk7XG5cbiAgbGV0IGNvbmZsaWN0Q291bnQgPSAwO1xuICBpZiAocmVtb3RlT25seVJlY29yZHMuc2l6ZSkge1xuICAgIGNvbmZsaWN0Q291bnQgPSBhd2FpdCBwcm9jZXNzUmVtb3RlUmVjb3Jkcyh2ZXJzaW9uLCByZW1vdGVPbmx5UmVjb3Jkcyk7XG4gIH1cblxuICAvLyBQb3N0LW1lcmdlLCBpZiBvdXIgbG9jYWwgcmVjb3JkcyBjb250YWluIGFueSBzdG9yYWdlIElEcyB0aGF0IHdlcmUgbm90XG4gIC8vIHByZXNlbnQgaW4gdGhlIHJlbW90ZSBtYW5pZmVzdCB0aGVuIHdlJ2xsIG5lZWQgdG8gY2xlYXIgaXQsIGdlbmVyYXRlIGFcbiAgLy8gbmV3IHN0b3JhZ2VJRCBmb3IgdGhhdCByZWNvcmQsIGFuZCB1cGxvYWQuXG4gIC8vIFRoaXMgbWlnaHQgaGFwcGVuIGlmIGEgZGV2aWNlIHB1c2hlcyBhIG1hbmlmZXN0IHdoaWNoIGRvZXNuJ3QgY29udGFpblxuICAvLyB0aGUga2V5cyB0aGF0IHdlIGhhdmUgaW4gb3VyIGxvY2FsIGRhdGFiYXNlLlxuICB3aW5kb3cuZ2V0Q29udmVyc2F0aW9ucygpLmZvckVhY2goKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwpID0+IHtcbiAgICBjb25zdCBzdG9yYWdlSUQgPSBjb252ZXJzYXRpb24uZ2V0KCdzdG9yYWdlSUQnKTtcbiAgICBpZiAoc3RvcmFnZUlEICYmICFyZW1vdGVLZXlzLmhhcyhzdG9yYWdlSUQpKSB7XG4gICAgICBjb25zdCBzdG9yYWdlVmVyc2lvbiA9IGNvbnZlcnNhdGlvbi5nZXQoJ3N0b3JhZ2VWZXJzaW9uJyk7XG4gICAgICBjb25zdCBtaXNzaW5nS2V5ID0gcmVkYWN0U3RvcmFnZUlEKFxuICAgICAgICBzdG9yYWdlSUQsXG4gICAgICAgIHN0b3JhZ2VWZXJzaW9uLFxuICAgICAgICBjb252ZXJzYXRpb25cbiAgICAgICk7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHt2ZXJzaW9ufSk6IGxvY2FsS2V5PSR7bWlzc2luZ0tleX0gd2FzIG5vdCBgICtcbiAgICAgICAgICAnaW4gcmVtb3RlIG1hbmlmZXN0J1xuICAgICAgKTtcbiAgICAgIGNvbnZlcnNhdGlvbi51bnNldCgnc3RvcmFnZUlEJyk7XG4gICAgICBjb252ZXJzYXRpb24udW5zZXQoJ3N0b3JhZ2VWZXJzaW9uJyk7XG4gICAgICB1cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfSk7XG5cbiAgbG9nLmluZm8oXG4gICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHt2ZXJzaW9ufSk6IGNvbmZsaWN0Q291bnQ9JHtjb25mbGljdENvdW50fWBcbiAgKTtcblxuICByZXR1cm4gY29uZmxpY3RDb3VudDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc1JlbW90ZVJlY29yZHMoXG4gIHN0b3JhZ2VWZXJzaW9uOiBudW1iZXIsXG4gIHJlbW90ZU9ubHlSZWNvcmRzOiBNYXA8c3RyaW5nLCBSZW1vdGVSZWNvcmQ+XG4pOiBQcm9taXNlPG51bWJlcj4ge1xuICBjb25zdCBzdG9yYWdlS2V5QmFzZTY0ID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlS2V5Jyk7XG4gIGlmICghc3RvcmFnZUtleUJhc2U2NCkge1xuICAgIHRocm93IG5ldyBFcnJvcignTm8gc3RvcmFnZSBrZXknKTtcbiAgfVxuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZScpO1xuICB9XG5cbiAgY29uc3Qgc3RvcmFnZUtleSA9IEJ5dGVzLmZyb21CYXNlNjQoc3RvcmFnZUtleUJhc2U2NCk7XG5cbiAgbG9nLmluZm8oXG4gICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBmZXRjaGluZyByZW1vdGUga2V5cyBgICtcbiAgICAgIGBjb3VudD0ke3JlbW90ZU9ubHlSZWNvcmRzLnNpemV9YFxuICApO1xuXG4gIGNvbnN0IGNyZWRlbnRpYWxzID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlQ3JlZGVudGlhbHMnKTtcbiAgY29uc3QgYmF0Y2hlcyA9IGNodW5rKEFycmF5LmZyb20ocmVtb3RlT25seVJlY29yZHMua2V5cygpKSwgTUFYX1JFQURfS0VZUyk7XG5cbiAgY29uc3Qgc3RvcmFnZUl0ZW1zID0gKFxuICAgIGF3YWl0IHBNYXAoXG4gICAgICBiYXRjaGVzLFxuICAgICAgYXN5bmMgKFxuICAgICAgICBiYXRjaDogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4gICAgICApOiBQcm9taXNlPEFycmF5PFByb3RvLklTdG9yYWdlSXRlbT4+ID0+IHtcbiAgICAgICAgY29uc3QgcmVhZE9wZXJhdGlvbiA9IG5ldyBQcm90by5SZWFkT3BlcmF0aW9uKCk7XG4gICAgICAgIHJlYWRPcGVyYXRpb24ucmVhZEtleSA9IGJhdGNoLm1hcChCeXRlcy5mcm9tQmFzZTY0KTtcblxuICAgICAgICBjb25zdCBzdG9yYWdlSXRlbXNCdWZmZXIgPSBhd2FpdCBtZXNzYWdpbmcuZ2V0U3RvcmFnZVJlY29yZHMoXG4gICAgICAgICAgUHJvdG8uUmVhZE9wZXJhdGlvbi5lbmNvZGUocmVhZE9wZXJhdGlvbikuZmluaXNoKCksXG4gICAgICAgICAge1xuICAgICAgICAgICAgY3JlZGVudGlhbHMsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBQcm90by5TdG9yYWdlSXRlbXMuZGVjb2RlKHN0b3JhZ2VJdGVtc0J1ZmZlcikuaXRlbXMgPz8gW107XG4gICAgICB9LFxuICAgICAgeyBjb25jdXJyZW5jeTogNSB9XG4gICAgKVxuICApLmZsYXQoKTtcblxuICBjb25zdCBtaXNzaW5nS2V5cyA9IG5ldyBTZXQ8c3RyaW5nPihyZW1vdGVPbmx5UmVjb3Jkcy5rZXlzKCkpO1xuXG4gIGNvbnN0IGRlY3J5cHRlZFN0b3JhZ2VJdGVtcyA9IGF3YWl0IHBNYXAoXG4gICAgc3RvcmFnZUl0ZW1zLFxuICAgIGFzeW5jIChcbiAgICAgIHN0b3JhZ2VSZWNvcmRXcmFwcGVyOiBQcm90by5JU3RvcmFnZUl0ZW1cbiAgICApOiBQcm9taXNlPE1lcmdlYWJsZUl0ZW1UeXBlPiA9PiB7XG4gICAgICBjb25zdCB7IGtleSwgdmFsdWU6IHN0b3JhZ2VJdGVtQ2lwaGVydGV4dCB9ID0gc3RvcmFnZVJlY29yZFdyYXBwZXI7XG5cbiAgICAgIGlmICgha2V5IHx8ICFzdG9yYWdlSXRlbUNpcGhlcnRleHQpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBgICtcbiAgICAgICAgICAgICdtaXNzaW5nIGtleSBhbmQvb3IgQ2lwaGVydGV4dCdcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgc3RvcFN0b3JhZ2VTZXJ2aWNlU3luYyhlcnJvcik7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBiYXNlNjRJdGVtSUQgPSBCeXRlcy50b0Jhc2U2NChrZXkpO1xuICAgICAgbWlzc2luZ0tleXMuZGVsZXRlKGJhc2U2NEl0ZW1JRCk7XG5cbiAgICAgIGNvbnN0IHN0b3JhZ2VJdGVtS2V5ID0gZGVyaXZlU3RvcmFnZUl0ZW1LZXkoc3RvcmFnZUtleSwgYmFzZTY0SXRlbUlEKTtcblxuICAgICAgbGV0IHN0b3JhZ2VJdGVtUGxhaW50ZXh0O1xuICAgICAgdHJ5IHtcbiAgICAgICAgc3RvcmFnZUl0ZW1QbGFpbnRleHQgPSBkZWNyeXB0UHJvZmlsZShcbiAgICAgICAgICBzdG9yYWdlSXRlbUNpcGhlcnRleHQsXG4gICAgICAgICAgc3RvcmFnZUl0ZW1LZXlcbiAgICAgICAgKTtcbiAgICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBgICtcbiAgICAgICAgICAgICdFcnJvciBkZWNyeXB0aW5nIHN0b3JhZ2UgaXRlbScsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycilcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgc3RvcFN0b3JhZ2VTZXJ2aWNlU3luYyhlcnIpO1xuICAgICAgICB0aHJvdyBlcnI7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0b3JhZ2VSZWNvcmQgPSBQcm90by5TdG9yYWdlUmVjb3JkLmRlY29kZShzdG9yYWdlSXRlbVBsYWludGV4dCk7XG5cbiAgICAgIGNvbnN0IHJlbW90ZVJlY29yZCA9IHJlbW90ZU9ubHlSZWNvcmRzLmdldChiYXNlNjRJdGVtSUQpO1xuICAgICAgaWYgKCFyZW1vdGVSZWNvcmQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIFwiR290IGEgcmVtb3RlIHJlY29yZCB0aGF0IHdhc24ndCByZXF1ZXN0ZWQgd2l0aCBcIiArXG4gICAgICAgICAgICBgc3RvcmFnZUlEOiAke2Jhc2U2NEl0ZW1JRH1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGl0ZW1UeXBlOiByZW1vdGVSZWNvcmQuaXRlbVR5cGUsXG4gICAgICAgIHN0b3JhZ2VJRDogYmFzZTY0SXRlbUlELFxuICAgICAgICBzdG9yYWdlUmVjb3JkLFxuICAgICAgfTtcbiAgICB9LFxuICAgIHsgY29uY3VycmVuY3k6IDUgfVxuICApO1xuXG4gIGNvbnN0IHJlZGFjdGVkTWlzc2luZ0tleXMgPSBBcnJheS5mcm9tKG1pc3NpbmdLZXlzKS5tYXAoaWQgPT5cbiAgICByZWRhY3RTdG9yYWdlSUQoaWQsIHN0b3JhZ2VWZXJzaW9uKVxuICApO1xuXG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogbWlzc2luZyByZW1vdGUgYCArXG4gICAgICBga2V5cz0ke0pTT04uc3RyaW5naWZ5KHJlZGFjdGVkTWlzc2luZ0tleXMpfSBgICtcbiAgICAgIGBjb3VudD0ke21pc3NpbmdLZXlzLnNpemV9YFxuICApO1xuXG4gIGNvbnN0IElURU1fVFlQRSA9IFByb3RvLk1hbmlmZXN0UmVjb3JkLklkZW50aWZpZXIuVHlwZTtcbiAgY29uc3QgZHJvcHBlZEtleXMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAvLyBEcm9wIGFsbCBHVjEgcmVjb3JkcyBmb3Igd2hpY2ggd2UgaGF2ZSBHVjIgcmVjb3JkIGluIHRoZSBzYW1lIG1hbmlmZXN0XG4gIGNvbnN0IG1hc3RlcktleXMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICBmb3IgKGNvbnN0IHsgaXRlbVR5cGUsIHN0b3JhZ2VJRCwgc3RvcmFnZVJlY29yZCB9IG9mIGRlY3J5cHRlZFN0b3JhZ2VJdGVtcykge1xuICAgIGlmIChpdGVtVHlwZSA9PT0gSVRFTV9UWVBFLkdST1VQVjIgJiYgc3RvcmFnZVJlY29yZC5ncm91cFYyPy5tYXN0ZXJLZXkpIHtcbiAgICAgIG1hc3RlcktleXMuc2V0KFxuICAgICAgICBCeXRlcy50b0Jhc2U2NChzdG9yYWdlUmVjb3JkLmdyb3VwVjIubWFzdGVyS2V5KSxcbiAgICAgICAgc3RvcmFnZUlEXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGxldCBhY2NvdW50SXRlbTogTWVyZ2VhYmxlSXRlbVR5cGUgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3QgcHJ1bmVkU3RvcmFnZUl0ZW1zID0gZGVjcnlwdGVkU3RvcmFnZUl0ZW1zLmZpbHRlcihpdGVtID0+IHtcbiAgICBjb25zdCB7IGl0ZW1UeXBlLCBzdG9yYWdlSUQsIHN0b3JhZ2VSZWNvcmQgfSA9IGl0ZW07XG4gICAgaWYgKGl0ZW1UeXBlID09PSBJVEVNX1RZUEUuQUNDT1VOVCkge1xuICAgICAgaWYgKGFjY291bnRJdGVtICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBkdXBsaWNhdGUgYWNjb3VudCBgICtcbiAgICAgICAgICAgIGByZWNvcmQ9JHtyZWRhY3RTdG9yYWdlSUQoc3RvcmFnZUlELCBzdG9yYWdlVmVyc2lvbil9IGAgK1xuICAgICAgICAgICAgYHByZXZpb3VzPSR7cmVkYWN0U3RvcmFnZUlEKGFjY291bnRJdGVtLnN0b3JhZ2VJRCwgc3RvcmFnZVZlcnNpb24pfWBcbiAgICAgICAgKTtcbiAgICAgICAgZHJvcHBlZEtleXMuYWRkKGFjY291bnRJdGVtLnN0b3JhZ2VJRCk7XG4gICAgICB9XG5cbiAgICAgIGFjY291bnRJdGVtID0gaXRlbTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXRlbVR5cGUgIT09IElURU1fVFlQRS5HUk9VUFYxIHx8ICFzdG9yYWdlUmVjb3JkLmdyb3VwVjE/LmlkKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBtYXN0ZXJLZXkgPSBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShzdG9yYWdlUmVjb3JkLmdyb3VwVjEuaWQpO1xuICAgIGNvbnN0IGd2MlN0b3JhZ2VJRCA9IG1hc3RlcktleXMuZ2V0KEJ5dGVzLnRvQmFzZTY0KG1hc3RlcktleSkpO1xuICAgIGlmICghZ3YyU3RvcmFnZUlEKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBsb2cud2FybihcbiAgICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogZHJvcHBpbmcgYCArXG4gICAgICAgIGBHVjEgcmVjb3JkPSR7cmVkYWN0U3RvcmFnZUlEKHN0b3JhZ2VJRCwgc3RvcmFnZVZlcnNpb24pfSBgICtcbiAgICAgICAgYEdWMiByZWNvcmQ9JHtyZWRhY3RTdG9yYWdlSUQoZ3YyU3RvcmFnZUlELCBzdG9yYWdlVmVyc2lvbil9IGAgK1xuICAgICAgICAnaXMgaW4gdGhlIHNhbWUgbWFuaWZlc3QnXG4gICAgKTtcbiAgICBkcm9wcGVkS2V5cy5hZGQoc3RvcmFnZUlEKTtcblxuICAgIHJldHVybiBmYWxzZTtcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogYCArXG4gICAgICAgIGBhdHRlbXB0aW5nIHRvIG1lcmdlIHJlY29yZHM9JHtwcnVuZWRTdG9yYWdlSXRlbXMubGVuZ3RofWBcbiAgICApO1xuICAgIGlmIChhY2NvdW50SXRlbSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBhY2NvdW50IGAgK1xuICAgICAgICAgIGByZWNvcmQ9JHtyZWRhY3RTdG9yYWdlSUQoYWNjb3VudEl0ZW0uc3RvcmFnZUlELCBzdG9yYWdlVmVyc2lvbil9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXJnZWRSZWNvcmRzID0gW1xuICAgICAgLi4uKGF3YWl0IHBNYXAoXG4gICAgICAgIHBydW5lZFN0b3JhZ2VJdGVtcyxcbiAgICAgICAgKGl0ZW06IE1lcmdlYWJsZUl0ZW1UeXBlKSA9PiBtZXJnZVJlY29yZChzdG9yYWdlVmVyc2lvbiwgaXRlbSksXG4gICAgICAgIHsgY29uY3VycmVuY3k6IDMyIH1cbiAgICAgICkpLFxuXG4gICAgICAvLyBNZXJnZSBBY2NvdW50IHJlY29yZHMgbGFzdCBzaW5jZSBpdCBjb250YWlucyB0aGUgcGlubmVkIGNvbnZlcnNhdGlvbnNcbiAgICAgIC8vIGFuZCB3ZSBuZWVkIGFsbCBvdGhlciByZWNvcmRzIG1lcmdlZCBmaXJzdCBiZWZvcmUgd2UgY2FuIGZpbmQgdGhlIHBpbm5lZFxuICAgICAgLy8gcmVjb3JkcyBpbiBvdXIgZGJcbiAgICAgIC4uLihhY2NvdW50SXRlbSA/IFthd2FpdCBtZXJnZVJlY29yZChzdG9yYWdlVmVyc2lvbiwgYWNjb3VudEl0ZW0pXSA6IFtdKSxcbiAgICBdO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICBgc3RvcmFnZVNlcnZpY2UucHJvY2Vzcygke3N0b3JhZ2VWZXJzaW9ufSk6IGAgK1xuICAgICAgICBgcHJvY2Vzc2VkIHJlY29yZHM9JHttZXJnZWRSZWNvcmRzLmxlbmd0aH1gXG4gICAgKTtcblxuICAgIGNvbnN0IHVwZGF0ZWRDb252ZXJzYXRpb25zID0gbWVyZ2VkUmVjb3Jkc1xuICAgICAgLm1hcChyZWNvcmQgPT4gcmVjb3JkLnVwZGF0ZWRDb252ZXJzYXRpb25zKVxuICAgICAgLmZsYXQoKVxuICAgICAgLm1hcChjb252byA9PiBjb252by5hdHRyaWJ1dGVzKTtcbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zKHVwZGF0ZWRDb252ZXJzYXRpb25zKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBgICtcbiAgICAgICAgYHVwZGF0ZWQgY29udmVyc2F0aW9ucz0ke3VwZGF0ZWRDb252ZXJzYXRpb25zLmxlbmd0aH1gXG4gICAgKTtcblxuICAgIGNvbnN0IG5lZWRQcm9maWxlRmV0Y2ggPSBtZXJnZWRSZWNvcmRzXG4gICAgICAubWFwKHJlY29yZCA9PiByZWNvcmQubmVlZFByb2ZpbGVGZXRjaClcbiAgICAgIC5mbGF0KCk7XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogYCArXG4gICAgICAgIGBraWNraW5nIG9mZiBwcm9maWxlIGZldGNoZXM9JHtuZWVkUHJvZmlsZUZldGNoLmxlbmd0aH1gXG4gICAgKTtcblxuICAgIC8vIEludGVudGlvbmFsbHkgbm90IGF3YWl0aW5nXG4gICAgcE1hcChuZWVkUHJvZmlsZUZldGNoLCBjb252byA9PiBjb252by5nZXRQcm9maWxlcygpLCB7IGNvbmN1cnJlbmN5OiAzIH0pO1xuXG4gICAgLy8gQ29sbGVjdCBmdWxsIG1hcCBvZiBwcmV2aW91c2x5IGFuZCBjdXJyZW50bHkgdW5rbm93biByZWNvcmRzXG4gICAgY29uc3QgdW5rbm93blJlY29yZHM6IE1hcDxzdHJpbmcsIFVua25vd25SZWNvcmQ+ID0gbmV3IE1hcCgpO1xuXG4gICAgY29uc3QgcHJldmlvdXNVbmtub3duUmVjb3JkczogUmVhZG9ubHlBcnJheTxVbmtub3duUmVjb3JkPiA9XG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoXG4gICAgICAgICdzdG9yYWdlLXNlcnZpY2UtdW5rbm93bi1yZWNvcmRzJyxcbiAgICAgICAgbmV3IEFycmF5PFVua25vd25SZWNvcmQ+KClcbiAgICAgICk7XG4gICAgcHJldmlvdXNVbmtub3duUmVjb3Jkcy5mb3JFYWNoKChyZWNvcmQ6IFVua25vd25SZWNvcmQpID0+IHtcbiAgICAgIHVua25vd25SZWNvcmRzLnNldChyZWNvcmQuc3RvcmFnZUlELCByZWNvcmQpO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbmV3UmVjb3Jkc1dpdGhFcnJvcnM6IEFycmF5PFVua25vd25SZWNvcmQ+ID0gW107XG5cbiAgICBsZXQgY29uZmxpY3RDb3VudCA9IDA7XG5cbiAgICBtZXJnZWRSZWNvcmRzLmZvckVhY2goKG1lcmdlZFJlY29yZDogTWVyZ2VkUmVjb3JkVHlwZSkgPT4ge1xuICAgICAgaWYgKG1lcmdlZFJlY29yZC5pc1Vuc3VwcG9ydGVkKSB7XG4gICAgICAgIHVua25vd25SZWNvcmRzLnNldChtZXJnZWRSZWNvcmQuc3RvcmFnZUlELCB7XG4gICAgICAgICAgaXRlbVR5cGU6IG1lcmdlZFJlY29yZC5pdGVtVHlwZSxcbiAgICAgICAgICBzdG9yYWdlSUQ6IG1lcmdlZFJlY29yZC5zdG9yYWdlSUQsXG4gICAgICAgICAgc3RvcmFnZVZlcnNpb24sXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChtZXJnZWRSZWNvcmQuaGFzRXJyb3IpIHtcbiAgICAgICAgbmV3UmVjb3Jkc1dpdGhFcnJvcnMucHVzaCh7XG4gICAgICAgICAgaXRlbVR5cGU6IG1lcmdlZFJlY29yZC5pdGVtVHlwZSxcbiAgICAgICAgICBzdG9yYWdlSUQ6IG1lcmdlZFJlY29yZC5zdG9yYWdlSUQsXG4gICAgICAgICAgc3RvcmFnZVZlcnNpb24sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAobWVyZ2VkUmVjb3JkLmhhc0NvbmZsaWN0KSB7XG4gICAgICAgIGNvbmZsaWN0Q291bnQgKz0gMTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lcmdlZFJlY29yZC5zaG91bGREcm9wKSB7XG4gICAgICAgIGRyb3BwZWRLZXlzLmFkZChtZXJnZWRSZWNvcmQuc3RvcmFnZUlEKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGNvbnN0IHJlZGFjdGVkRHJvcHBlZEtleXMgPSBBcnJheS5mcm9tKGRyb3BwZWRLZXlzLnZhbHVlcygpKS5tYXAoa2V5ID0+XG4gICAgICByZWRhY3RTdG9yYWdlSUQoa2V5LCBzdG9yYWdlVmVyc2lvbilcbiAgICApO1xuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnByb2Nlc3MoJHtzdG9yYWdlVmVyc2lvbn0pOiBgICtcbiAgICAgICAgYGRyb3BwZWQga2V5cz0ke0pTT04uc3RyaW5naWZ5KHJlZGFjdGVkRHJvcHBlZEtleXMpfSBgICtcbiAgICAgICAgYGNvdW50PSR7cmVkYWN0ZWREcm9wcGVkS2V5cy5sZW5ndGh9YFxuICAgICk7XG5cbiAgICAvLyBGaWx0ZXIgb3V0IGFsbCB0aGUgdW5rbm93biByZWNvcmRzIHdlJ3JlIGFscmVhZHkgc3VwcG9ydGluZ1xuICAgIGNvbnN0IG5ld1Vua25vd25SZWNvcmRzID0gQXJyYXkuZnJvbSh1bmtub3duUmVjb3Jkcy52YWx1ZXMoKSkuZmlsdGVyKFxuICAgICAgKHJlY29yZDogVW5rbm93blJlY29yZCkgPT4gIXZhbGlkUmVjb3JkVHlwZXMuaGFzKHJlY29yZC5pdGVtVHlwZSlcbiAgICApO1xuICAgIGNvbnN0IHJlZGFjdGVkTmV3VW5rbm93bnMgPSBuZXdVbmtub3duUmVjb3Jkcy5tYXAocmVkYWN0RXh0ZW5kZWRTdG9yYWdlSUQpO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICBgc3RvcmFnZVNlcnZpY2UucHJvY2Vzcygke3N0b3JhZ2VWZXJzaW9ufSk6IGAgK1xuICAgICAgICBgdW5rbm93biByZWNvcmRzPSR7SlNPTi5zdHJpbmdpZnkocmVkYWN0ZWROZXdVbmtub3ducyl9IGAgK1xuICAgICAgICBgY291bnQ9JHtyZWRhY3RlZE5ld1Vua25vd25zLmxlbmd0aH1gXG4gICAgKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoXG4gICAgICAnc3RvcmFnZS1zZXJ2aWNlLXVua25vd24tcmVjb3JkcycsXG4gICAgICBuZXdVbmtub3duUmVjb3Jkc1xuICAgICk7XG5cbiAgICBjb25zdCByZWRhY3RlZEVycm9yUmVjb3JkcyA9IG5ld1JlY29yZHNXaXRoRXJyb3JzLm1hcChcbiAgICAgIHJlZGFjdEV4dGVuZGVkU3RvcmFnZUlEXG4gICAgKTtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogYCArXG4gICAgICAgIGBlcnJvciByZWNvcmRzPSR7SlNPTi5zdHJpbmdpZnkocmVkYWN0ZWRFcnJvclJlY29yZHMpfSBgICtcbiAgICAgICAgYGNvdW50PSR7cmVkYWN0ZWRFcnJvclJlY29yZHMubGVuZ3RofWBcbiAgICApO1xuICAgIC8vIFJlZnJlc2ggdGhlIGxpc3Qgb2YgcmVjb3JkcyB0aGF0IGhhZCBlcnJvcnMgd2l0aCBldmVyeSBwdXNoLCB0aGF0IHdheVxuICAgIC8vIHRoaXMgbGlzdCBkb2Vzbid0IGdyb3cgdW5ib3VuZGVkIGFuZCB3ZSBrZWVwIHRoZSBsaXN0IG9mIHN0b3JhZ2Uga2V5c1xuICAgIC8vIGZyZXNoLlxuICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnB1dChcbiAgICAgICdzdG9yYWdlLXNlcnZpY2UtZXJyb3ItcmVjb3JkcycsXG4gICAgICBuZXdSZWNvcmRzV2l0aEVycm9yc1xuICAgICk7XG5cbiAgICAvLyBTdG9yZS9vdmVyd3JpdGUga2V5cyBwZW5kaW5nIGRlbGV0aW9uLCBidXQgdXNlIHRoZW0gb25seSB3aGVuIHdlIGhhdmUgdG9cbiAgICAvLyB1cGxvYWQgYSBuZXcgbWFuaWZlc3QgdG8gYXZvaWQgb3NjaWxsYXRpb24uXG4gICAgY29uc3QgcGVuZGluZ0RlbGV0ZXMgPSBbLi4ubWlzc2luZ0tleXMsIC4uLmRyb3BwZWRLZXlzXS5tYXAoc3RvcmFnZUlEID0+ICh7XG4gICAgICBzdG9yYWdlSUQsXG4gICAgICBzdG9yYWdlVmVyc2lvbixcbiAgICB9KSk7XG4gICAgY29uc3QgcmVkYWN0ZWRQZW5kaW5nRGVsZXRlcyA9IHBlbmRpbmdEZWxldGVzLm1hcChyZWRhY3RFeHRlbmRlZFN0b3JhZ2VJRCk7XG4gICAgbG9nLmluZm8oXG4gICAgICBgc3RvcmFnZVNlcnZpY2UucHJvY2Vzcygke3N0b3JhZ2VWZXJzaW9ufSk6IGAgK1xuICAgICAgICBgcGVuZGluZyBkZWxldGVzPSR7SlNPTi5zdHJpbmdpZnkocmVkYWN0ZWRQZW5kaW5nRGVsZXRlcyl9IGAgK1xuICAgICAgICBgY291bnQ9JHtyZWRhY3RlZFBlbmRpbmdEZWxldGVzLmxlbmd0aH1gXG4gICAgKTtcbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wdXQoJ3N0b3JhZ2Utc2VydmljZS1wZW5kaW5nLWRlbGV0ZXMnLCBwZW5kaW5nRGVsZXRlcyk7XG5cbiAgICBpZiAoY29uZmxpY3RDb3VudCA9PT0gMCkge1xuICAgICAgY29uZmxpY3RCYWNrT2ZmLnJlc2V0KCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGNvbmZsaWN0Q291bnQ7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgIGBzdG9yYWdlU2VydmljZS5wcm9jZXNzKCR7c3RvcmFnZVZlcnNpb259KTogYCArXG4gICAgICAgICdmYWlsZWQgdG8gcHJvY2VzcyByZW1vdGUgcmVjb3JkcycsXG4gICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyKVxuICAgICk7XG4gIH1cblxuICAvLyBjb25mbGljdENvdW50XG4gIHJldHVybiAwO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzeW5jKFxuICBpZ25vcmVDb25mbGljdHMgPSBmYWxzZVxuKTogUHJvbWlzZTxQcm90by5NYW5pZmVzdFJlY29yZCB8IHVuZGVmaW5lZD4ge1xuICBpZiAoIXdpbmRvdy5zdG9yYWdlLmdldCgnc3RvcmFnZUtleScpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzdG9yYWdlU2VydmljZS5zeW5jOiBDYW5ub3Qgc3RhcnQ7IG5vIHN0b3JhZ2Uga2V5IScpO1xuICB9XG5cbiAgbG9nLmluZm8oXG4gICAgYHN0b3JhZ2VTZXJ2aWNlLnN5bmM6IHN0YXJ0aW5nLi4uIGlnbm9yZUNvbmZsaWN0cz0ke2lnbm9yZUNvbmZsaWN0c31gXG4gICk7XG5cbiAgbGV0IG1hbmlmZXN0OiBQcm90by5NYW5pZmVzdFJlY29yZCB8IHVuZGVmaW5lZDtcbiAgdHJ5IHtcbiAgICAvLyBJZiB3ZSd2ZSBwcmV2aW91c2x5IGludGVyYWN0ZWQgd2l0aCBzdHJhZ2Ugc2VydmljZSwgdXBkYXRlICdmZXRjaENvbXBsZXRlJyByZWNvcmRcbiAgICBjb25zdCBwcmV2aW91c0ZldGNoQ29tcGxldGUgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3N0b3JhZ2VGZXRjaENvbXBsZXRlJyk7XG4gICAgY29uc3QgbWFuaWZlc3RGcm9tU3RvcmFnZSA9IHdpbmRvdy5zdG9yYWdlLmdldCgnbWFuaWZlc3RWZXJzaW9uJyk7XG4gICAgaWYgKCFwcmV2aW91c0ZldGNoQ29tcGxldGUgJiYgaXNOdW1iZXIobWFuaWZlc3RGcm9tU3RvcmFnZSkpIHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgnc3RvcmFnZUZldGNoQ29tcGxldGUnLCB0cnVlKTtcbiAgICB9XG5cbiAgICBjb25zdCBsb2NhbE1hbmlmZXN0VmVyc2lvbiA9IG1hbmlmZXN0RnJvbVN0b3JhZ2UgfHwgMDtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgJ3N0b3JhZ2VTZXJ2aWNlLnN5bmM6IGZldGNoaW5nIGxhdGVzdCAnICtcbiAgICAgICAgYGFmdGVyIHZlcnNpb249JHtsb2NhbE1hbmlmZXN0VmVyc2lvbn1gXG4gICAgKTtcbiAgICBtYW5pZmVzdCA9IGF3YWl0IGZldGNoTWFuaWZlc3QobG9jYWxNYW5pZmVzdFZlcnNpb24pO1xuXG4gICAgLy8gR3VhcmRpbmcgYWdhaW5zdCBubyBtYW5pZmVzdHMgYmVpbmcgcmV0dXJuZWQsIGV2ZXJ5dGhpbmcgc2hvdWxkIGJlIG9rXG4gICAgaWYgKCFtYW5pZmVzdCkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBzdG9yYWdlU2VydmljZS5zeW5jOiBubyB1cGRhdGVzLCB2ZXJzaW9uPSR7bG9jYWxNYW5pZmVzdFZlcnNpb259YFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgbWFuaWZlc3QudmVyc2lvbiAhPT0gdW5kZWZpbmVkICYmIG1hbmlmZXN0LnZlcnNpb24gIT09IG51bGwsXG4gICAgICAnTWFuaWZlc3Qgd2l0aG91dCB2ZXJzaW9uJ1xuICAgICk7XG4gICAgY29uc3QgdmVyc2lvbiA9IG1hbmlmZXN0LnZlcnNpb24/LnRvTnVtYmVyKCkgPz8gMDtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnN5bmM6IHVwZGF0aW5nIHRvIHJlbW90ZVZlcnNpb249JHt2ZXJzaW9ufSBgICtcbiAgICAgICAgYHNvdXJjZURldmljZT0ke21hbmlmZXN0LnNvdXJjZURldmljZSA/PyAnPyd9IGZyb20gYCArXG4gICAgICAgIGB2ZXJzaW9uPSR7bG9jYWxNYW5pZmVzdFZlcnNpb259YFxuICAgICk7XG5cbiAgICBjb25zdCBjb25mbGljdENvdW50ID0gYXdhaXQgcHJvY2Vzc01hbmlmZXN0KG1hbmlmZXN0LCB2ZXJzaW9uKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYHN0b3JhZ2VTZXJ2aWNlLnN5bmM6IHVwZGF0ZWQgdG8gdmVyc2lvbj0ke3ZlcnNpb259IGAgK1xuICAgICAgICBgY29uZmxpY3RzPSR7Y29uZmxpY3RDb3VudH1gXG4gICAgKTtcblxuICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnB1dCgnbWFuaWZlc3RWZXJzaW9uJywgdmVyc2lvbik7XG5cbiAgICBjb25zdCBoYXNDb25mbGljdHMgPSBjb25mbGljdENvdW50ICE9PSAwO1xuICAgIGlmIChoYXNDb25mbGljdHMgJiYgIWlnbm9yZUNvbmZsaWN0cykge1xuICAgICAgYXdhaXQgdXBsb2FkKHRydWUpO1xuICAgIH1cblxuICAgIC8vIFdlIG5vdyBrbm93IHRoYXQgd2UndmUgc3VjY2Vzc2Z1bGx5IGNvbXBsZXRlZCBhIHN0b3JhZ2Ugc2VydmljZSBmZXRjaFxuICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnB1dCgnc3RvcmFnZUZldGNoQ29tcGxldGUnLCB0cnVlKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ3N0b3JhZ2VTZXJ2aWNlLnN5bmM6IGVycm9yIHByb2Nlc3NpbmcgbWFuaWZlc3QnLFxuICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycilcbiAgICApO1xuICB9XG5cbiAgbG9nLmluZm8oJ3N0b3JhZ2VTZXJ2aWNlLnN5bmM6IGNvbXBsZXRlJyk7XG4gIHJldHVybiBtYW5pZmVzdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBsb2FkKGZyb21TeW5jID0gZmFsc2UpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3N0b3JhZ2VTZXJ2aWNlLnVwbG9hZDogV2UgYXJlIG9mZmxpbmUhJyk7XG4gIH1cblxuICAvLyBSYXRlIGxpbWl0IHVwbG9hZHMgY29taW5nIGZyb20gc3luY2luZ1xuICBpZiAoZnJvbVN5bmMpIHtcbiAgICB1cGxvYWRCdWNrZXQucHVzaChEYXRlLm5vdygpKTtcbiAgICBpZiAodXBsb2FkQnVja2V0Lmxlbmd0aCA+PSAzKSB7XG4gICAgICBjb25zdCBbZmlyc3RNb3N0UmVjZW50V3JpdGVdID0gdXBsb2FkQnVja2V0O1xuXG4gICAgICBpZiAoaXNNb3JlUmVjZW50VGhhbig1ICogZHVyYXRpb25zLk1JTlVURSwgZmlyc3RNb3N0UmVjZW50V3JpdGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnc3RvcmFnZVNlcnZpY2UudXBsb2FkTWFuaWZlc3Q6IHRvbyBtYW55IHdyaXRlcyB0b28gc29vbi4nXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHVwbG9hZEJ1Y2tldC5zaGlmdCgpO1xuICAgIH1cbiAgfVxuXG4gIGlmICghd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlS2V5JykpIHtcbiAgICAvLyByZXF1ZXN0aW5nIG5ldyBrZXlzIHJ1bnMgdGhlIHN5bmMgam9iIHdoaWNoIHdpbGwgZGV0ZWN0IHRoZSBjb25mbGljdFxuICAgIC8vIGFuZCByZS1ydW4gdGhlIHVwbG9hZCBqb2Igb25jZSB3ZSdyZSBtZXJnZWQgYW5kIHVwLXRvLWRhdGUuXG4gICAgbG9nLmluZm8oJ3N0b3JhZ2VTZXJ2aWNlLnVwbG9hZDogbm8gc3RvcmFnZUtleSwgcmVxdWVzdGluZyBuZXcga2V5cycpO1xuICAgIGJhY2tPZmYucmVzZXQoKTtcblxuICAgIGlmICh3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5hcmVXZVByaW1hcnlEZXZpY2UoKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdzdG9yYWdlU2VydmljZS51cGxvYWQ6IFdlIGFyZSBwcmltYXJ5IGRldmljZTsgbm90IHNlbmRpbmcga2V5IHN5bmMgcmVxdWVzdCdcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKE1lc3NhZ2VTZW5kZXIuZ2V0UmVxdWVzdEtleVN5bmNNZXNzYWdlKCkpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdzdG9yYWdlU2VydmljZS51cGxvYWQ6IEZhaWxlZCB0byBxdWV1ZSBzeW5jIG1lc3NhZ2UnLFxuICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBwcmV2aW91c01hbmlmZXN0OiBQcm90by5NYW5pZmVzdFJlY29yZCB8IHVuZGVmaW5lZDtcbiAgaWYgKCFmcm9tU3luYykge1xuICAgIC8vIFN5bmNpbmcgYmVmb3JlIHdlIHVwbG9hZCBzbyB0aGF0IHdlIHJlcGFpciBhbnkgdW5rbm93biByZWNvcmRzIGFuZFxuICAgIC8vIHJlY29yZHMgd2l0aCBlcnJvcnMgYXMgd2VsbCBhcyBlbnN1cmUgdGhhdCB3ZSBoYXZlIHRoZSBsYXRlc3QgdXAgdG8gZGF0ZVxuICAgIC8vIG1hbmlmZXN0LlxuICAgIC8vIFdlIGFyZSBnb2luZyB0byB1cGxvYWQgYWZ0ZXIgdGhpcyBzeW5jIHNvIHdlIGNhbiBpZ25vcmUgYW55IGNvbmZsaWN0c1xuICAgIC8vIHRoYXQgYXJpc2UgZHVyaW5nIHRoZSBzeW5jLlxuICAgIGNvbnN0IGlnbm9yZUNvbmZsaWN0cyA9IHRydWU7XG4gICAgcHJldmlvdXNNYW5pZmVzdCA9IGF3YWl0IHN5bmMoaWdub3JlQ29uZmxpY3RzKTtcbiAgfVxuXG4gIGNvbnN0IGxvY2FsTWFuaWZlc3RWZXJzaW9uID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdtYW5pZmVzdFZlcnNpb24nLCAwKTtcbiAgY29uc3QgdmVyc2lvbiA9IE51bWJlcihsb2NhbE1hbmlmZXN0VmVyc2lvbikgKyAxO1xuXG4gIGxvZy5pbmZvKFxuICAgIGBzdG9yYWdlU2VydmljZS51cGxvYWQoJHt2ZXJzaW9ufSk6IHdpbGwgdXBkYXRlIHRvIG1hbmlmZXN0IHZlcnNpb25gXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBnZW5lcmF0ZWRNYW5pZmVzdCA9IGF3YWl0IGdlbmVyYXRlTWFuaWZlc3QoXG4gICAgICB2ZXJzaW9uLFxuICAgICAgcHJldmlvdXNNYW5pZmVzdCxcbiAgICAgIGZhbHNlXG4gICAgKTtcbiAgICBhd2FpdCB1cGxvYWRNYW5pZmVzdCh2ZXJzaW9uLCBnZW5lcmF0ZWRNYW5pZmVzdCk7XG5cbiAgICAvLyBDbGVhciBwZW5kaW5nIGRlbGV0ZSBrZXlzIGFmdGVyIHN1Y2Nlc3NmdWwgdXBsb2FkXG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KCdzdG9yYWdlLXNlcnZpY2UtcGVuZGluZy1kZWxldGVzJywgW10pO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBpZiAoZXJyLmNvZGUgPT09IDQwOSkge1xuICAgICAgYXdhaXQgc2xlZXAoY29uZmxpY3RCYWNrT2ZmLmdldEFuZEluY3JlbWVudCgpKTtcbiAgICAgIGxvZy5pbmZvKCdzdG9yYWdlU2VydmljZS51cGxvYWQ6IHB1c2hpbmcgc3luYyBvbiB0aGUgcXVldWUnKTtcbiAgICAgIC8vIFRoZSBzeW5jIGpvYiB3aWxsIGNoZWNrIGZvciBjb25mbGljdHMgYW5kIGFzIHBhcnQgb2YgdGhhdCBjb25mbGljdFxuICAgICAgLy8gY2hlY2sgaWYgYW4gaXRlbSBuZWVkcyBzeW5jIGFuZCBkb2Vzbid0IG1hdGNoIHdpdGggdGhlIHJlbW90ZSByZWNvcmRcbiAgICAgIC8vIGl0J2xsIGtpY2sgb2ZmIGFub3RoZXIgdXBsb2FkLlxuICAgICAgc2V0VGltZW91dChydW5TdG9yYWdlU2VydmljZVN5bmNKb2IpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsb2cuZXJyb3IoXG4gICAgICBgc3RvcmFnZVNlcnZpY2UudXBsb2FkKCR7dmVyc2lvbn0pOiBlcnJvcmAsXG4gICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyKVxuICAgICk7XG4gIH1cbn1cblxubGV0IHN0b3JhZ2VTZXJ2aWNlRW5hYmxlZCA9IGZhbHNlO1xuXG5leHBvcnQgZnVuY3Rpb24gZW5hYmxlU3RvcmFnZVNlcnZpY2UoKTogdm9pZCB7XG4gIHN0b3JhZ2VTZXJ2aWNlRW5hYmxlZCA9IHRydWU7XG59XG5cbi8vIE5vdGU6IHRoaXMgZnVuY3Rpb24gaXMgbWVhbnQgdG8gYmUgY2FsbGVkIGJlZm9yZSBDb252ZXJzYXRpb25Db250cm9sbGVyIGlzIGh5ZHJhdGVkLlxuLy8gICBJdCBnb2VzIGRpcmVjdGx5IHRvIHRoZSBkYXRhYmFzZSwgc28gaW4tbWVtb3J5IGNvbnZlcnNhdGlvbnMgd2lsbCBiZSBvdXQgb2YgZGF0ZS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlcmFzZUFsbFN0b3JhZ2VTZXJ2aWNlU3RhdGUoe1xuICBrZWVwVW5rbm93bkZpZWxkcyA9IGZhbHNlLFxufTogeyBrZWVwVW5rbm93bkZpZWxkcz86IGJvb2xlYW4gfSA9IHt9KTogUHJvbWlzZTx2b2lkPiB7XG4gIGxvZy5pbmZvKCdzdG9yYWdlU2VydmljZS5lcmFzZUFsbFN0b3JhZ2VTZXJ2aWNlU3RhdGU6IHN0YXJ0aW5nLi4uJyk7XG4gIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICB3aW5kb3cuc3RvcmFnZS5yZW1vdmUoJ21hbmlmZXN0VmVyc2lvbicpLFxuICAgIGtlZXBVbmtub3duRmllbGRzXG4gICAgICA/IFByb21pc2UucmVzb2x2ZSgpXG4gICAgICA6IHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnc3RvcmFnZS1zZXJ2aWNlLXVua25vd24tcmVjb3JkcycpLFxuICAgIHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnc3RvcmFnZUNyZWRlbnRpYWxzJyksXG4gIF0pO1xuICBhd2FpdCBlcmFzZVN0b3JhZ2VTZXJ2aWNlU3RhdGVGcm9tQ29udmVyc2F0aW9ucygpO1xuICBsb2cuaW5mbygnc3RvcmFnZVNlcnZpY2UuZXJhc2VBbGxTdG9yYWdlU2VydmljZVN0YXRlOiBjb21wbGV0ZScpO1xufVxuXG5leHBvcnQgY29uc3Qgc3RvcmFnZVNlcnZpY2VVcGxvYWRKb2IgPSBkZWJvdW5jZSgoKSA9PiB7XG4gIGlmICghc3RvcmFnZVNlcnZpY2VFbmFibGVkKSB7XG4gICAgbG9nLmluZm8oJ3N0b3JhZ2VTZXJ2aWNlLnN0b3JhZ2VTZXJ2aWNlVXBsb2FkSm9iOiBjYWxsZWQgYmVmb3JlIGVuYWJsZWQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdG9yYWdlSm9iUXVldWUoYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHVwbG9hZCgpO1xuICB9LCBgdXBsb2FkIHYke3dpbmRvdy5zdG9yYWdlLmdldCgnbWFuaWZlc3RWZXJzaW9uJyl9YCk7XG59LCA1MDApO1xuXG5leHBvcnQgY29uc3QgcnVuU3RvcmFnZVNlcnZpY2VTeW5jSm9iID0gZGVib3VuY2UoKCkgPT4ge1xuICBpZiAoIXN0b3JhZ2VTZXJ2aWNlRW5hYmxlZCkge1xuICAgIGxvZy5pbmZvKCdzdG9yYWdlU2VydmljZS5ydW5TdG9yYWdlU2VydmljZVN5bmNKb2I6IGNhbGxlZCBiZWZvcmUgZW5hYmxlZCcpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIG91clByb2ZpbGVLZXlTZXJ2aWNlLmJsb2NrR2V0V2l0aFByb21pc2UoXG4gICAgc3RvcmFnZUpvYlF1ZXVlKGFzeW5jICgpID0+IHtcbiAgICAgIGF3YWl0IHN5bmMoKTtcblxuICAgICAgLy8gTm90aWZ5IGxpc3RlbmVycyBhYm91dCBzeW5jIGNvbXBsZXRpb25cbiAgICAgIHdpbmRvdy5XaGlzcGVyLmV2ZW50cy50cmlnZ2VyKCdzdG9yYWdlU2VydmljZTpzeW5jQ29tcGxldGUnKTtcbiAgICB9LCBgc3luYyB2JHt3aW5kb3cuc3RvcmFnZS5nZXQoJ21hbmlmZXN0VmVyc2lvbicpfWApXG4gICk7XG59LCA1MDApO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdB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
