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
var Client_exports = {};
__export(Client_exports, {
  default: () => Client_default
});
module.exports = __toCommonJS(Client_exports);
var import_electron = require("electron");
var import_fs_extra = __toESM(require("fs-extra"));
var import_pify = __toESM(require("pify"));
var import_lodash = require("lodash");
var import_Conversation = require("../types/Conversation");
var import_expiringMessagesDeletion = require("../services/expiringMessagesDeletion");
var import_tapToViewMessagesDeletionService = require("../services/tapToViewMessagesDeletionService");
var Bytes = __toESM(require("../Bytes"));
var import_Message2 = require("../types/Message2");
var import_batcher = require("../util/batcher");
var import_assert = require("../util/assert");
var import_cleanDataForIpc = require("./cleanDataForIpc");
var import_TaskWithTimeout = __toESM(require("../textsecure/TaskWithTimeout"));
var log = __toESM(require("../logging/log"));
var import_formatJobForInsert = require("../jobs/formatJobForInsert");
var import_cleanup = require("../util/cleanup");
var import_Server = __toESM(require("./Server"));
var import_errors = require("./errors");
if (import_electron.ipcRenderer && import_electron.ipcRenderer.setMaxListeners) {
  import_electron.ipcRenderer.setMaxListeners(0);
} else {
  log.warn("sql/Client: ipc is not available!");
}
const getRealPath = (0, import_pify.default)(import_fs_extra.default.realpath);
const MIN_TRACE_DURATION = 10;
const SQL_CHANNEL_KEY = "sql-channel";
const ERASE_SQL_KEY = "erase-sql-key";
const ERASE_ATTACHMENTS_KEY = "erase-attachments";
const ERASE_STICKERS_KEY = "erase-stickers";
const ERASE_TEMP_KEY = "erase-temp";
const ERASE_DRAFTS_KEY = "erase-drafts";
const CLEANUP_ORPHANED_ATTACHMENTS_KEY = "cleanup-orphaned-attachments";
const ENSURE_FILE_PERMISSIONS = "ensure-file-permissions";
var RendererState = /* @__PURE__ */ ((RendererState2) => {
  RendererState2["InMain"] = "InMain";
  RendererState2["Opening"] = "Opening";
  RendererState2["InRenderer"] = "InRenderer";
  RendererState2["Closing"] = "Closing";
  return RendererState2;
})(RendererState || {});
const _jobs = /* @__PURE__ */ Object.create(null);
const _DEBUG = false;
let _jobCounter = 0;
let _shuttingDown = false;
let _shutdownCallback = null;
let _shutdownPromise = null;
let state = "InMain" /* InMain */;
const startupQueries = /* @__PURE__ */ new Map();
const dataInterface = {
  close,
  removeDB,
  removeIndexedDBFiles,
  createOrUpdateIdentityKey,
  getIdentityKeyById,
  bulkAddIdentityKeys,
  removeIdentityKeyById,
  removeAllIdentityKeys,
  getAllIdentityKeys,
  createOrUpdatePreKey,
  getPreKeyById,
  bulkAddPreKeys,
  removePreKeyById,
  removeAllPreKeys,
  getAllPreKeys,
  createOrUpdateSignedPreKey,
  getSignedPreKeyById,
  bulkAddSignedPreKeys,
  removeSignedPreKeyById,
  removeAllSignedPreKeys,
  getAllSignedPreKeys,
  createOrUpdateItem,
  getItemById,
  removeItemById,
  removeAllItems,
  getAllItems,
  createOrUpdateSenderKey,
  getSenderKeyById,
  removeAllSenderKeys,
  getAllSenderKeys,
  removeSenderKeyById,
  insertSentProto,
  deleteSentProtosOlderThan,
  deleteSentProtoByMessageId,
  insertProtoRecipients,
  deleteSentProtoRecipient,
  getSentProtoByRecipient,
  removeAllSentProtos,
  getAllSentProtos,
  _getAllSentProtoRecipients,
  _getAllSentProtoMessageIds,
  createOrUpdateSession,
  createOrUpdateSessions,
  commitDecryptResult,
  bulkAddSessions,
  removeSessionById,
  removeSessionsByConversation,
  removeAllSessions,
  getAllSessions,
  eraseStorageServiceStateFromConversations,
  getConversationCount,
  saveConversation,
  saveConversations,
  getConversationById,
  updateConversation,
  updateConversations,
  removeConversation,
  updateAllConversationColors,
  getAllConversations,
  getAllConversationIds,
  getAllGroupsInvolvingUuid,
  searchMessages,
  searchMessagesInConversation,
  getMessageCount,
  getStoryCount,
  saveMessage,
  saveMessages,
  removeMessage,
  removeMessages,
  getTotalUnreadForConversation,
  getUnreadByConversationAndMarkRead,
  getUnreadReactionsAndMarkRead,
  markReactionAsRead,
  removeReactionFromConversation,
  addReaction,
  _getAllReactions,
  _removeAllReactions,
  getMessageBySender,
  getMessageById,
  getMessagesById,
  _getAllMessages,
  _removeAllMessages,
  getAllMessageIds,
  getMessagesBySentAt,
  getExpiredMessages,
  getMessagesUnexpectedlyMissingExpirationStartTimestamp,
  getSoonestMessageExpiry,
  getNextTapToViewMessageTimestampToAgeOut,
  getTapToViewMessagesNeedingErase,
  getOlderMessagesByConversation,
  getOlderStories,
  getNewerMessagesByConversation,
  getMessageMetricsForConversation,
  getConversationRangeCenteredOnMessage,
  getConversationMessageStats,
  getLastConversationMessage,
  hasGroupCallHistoryMessage,
  migrateConversationMessages,
  getUnprocessedCount,
  getAllUnprocessedAndIncrementAttempts,
  getUnprocessedById,
  updateUnprocessedWithData,
  updateUnprocessedsWithData,
  removeUnprocessed,
  removeAllUnprocessed,
  getAttachmentDownloadJobById,
  getNextAttachmentDownloadJobs,
  saveAttachmentDownloadJob,
  resetAttachmentDownloadPending,
  setAttachmentDownloadJobPending,
  removeAttachmentDownloadJob,
  removeAllAttachmentDownloadJobs,
  createOrUpdateStickerPack,
  updateStickerPackStatus,
  createOrUpdateSticker,
  updateStickerLastUsed,
  addStickerPackReference,
  deleteStickerPackReference,
  getStickerCount,
  deleteStickerPack,
  getAllStickerPacks,
  getAllStickers,
  getRecentStickers,
  clearAllErrorStickerPackAttempts,
  updateEmojiUsage,
  getRecentEmojis,
  getAllBadges,
  updateOrCreateBadges,
  badgeImageFileDownloaded,
  _getAllStoryDistributions,
  _getAllStoryDistributionMembers,
  _deleteAllStoryDistributions,
  createNewStoryDistribution,
  getAllStoryDistributionsWithMembers,
  getStoryDistributionWithMembers,
  modifyStoryDistribution,
  modifyStoryDistributionMembers,
  deleteStoryDistribution,
  _getAllStoryReads,
  _deleteAllStoryReads,
  addNewStoryRead,
  getLastStoryReadsForAuthor,
  countStoryReadsByConversation,
  removeAll,
  removeAllConfiguration,
  getMessagesNeedingUpgrade,
  getMessagesWithVisualMediaAttachments,
  getMessagesWithFileAttachments,
  getMessageServerGuidsForSpam,
  getJobsInQueue,
  insertJob,
  deleteJob,
  processGroupCallRingRequest,
  processGroupCallRingCancelation,
  cleanExpiredGroupCallRings,
  getMaxMessageCounter,
  getStatisticsForLogging,
  shutdown,
  removeAllMessagesInConversation,
  removeOtherData,
  cleanupOrphanedAttachments,
  ensureFilePermissions,
  startInRendererProcess,
  goBackToMainProcess,
  _jobs
};
var Client_default = dataInterface;
async function startInRendererProcess(isTesting = false) {
  (0, import_assert.strictAssert)(state === "InMain" /* InMain */, `startInRendererProcess: expected ${state} to be ${"InMain" /* InMain */}`);
  log.info("data.startInRendererProcess: switching to renderer process");
  state = "Opening" /* Opening */;
  if (!isTesting) {
    import_electron.ipcRenderer.send("database-ready");
    await new Promise((resolve) => {
      import_electron.ipcRenderer.once("database-ready", () => {
        resolve();
      });
    });
  }
  const configDir = await getRealPath(import_electron.ipcRenderer.sendSync("get-user-data-path"));
  const key = import_electron.ipcRenderer.sendSync("user-config-key");
  await import_Server.default.initializeRenderer({ configDir, key });
  log.info("data.startInRendererProcess: switched to renderer process");
  state = "InRenderer" /* InRenderer */;
}
async function goBackToMainProcess() {
  if (state === "InMain" /* InMain */) {
    log.info("goBackToMainProcess: Already in the main process");
    return;
  }
  (0, import_assert.strictAssert)(state === "InRenderer" /* InRenderer */, `goBackToMainProcess: expected ${state} to be ${"InRenderer" /* InRenderer */}`);
  log.info("data.goBackToMainProcess: switching to main process");
  const closePromise = close();
  state = "Closing" /* Closing */;
  await closePromise;
  state = "InMain" /* InMain */;
  const entries = Array.from(startupQueries.entries());
  startupQueries.clear();
  entries.sort((a, b) => b[1] - a[1]).filter(([_, duration]) => duration > MIN_TRACE_DURATION).forEach(([query, duration]) => {
    log.info(`startup query: ${query} ${duration}ms`);
  });
  log.info("data.goBackToMainProcess: switched to main process");
}
const channelsAsUnknown = (0, import_lodash.fromPairs)((0, import_lodash.compact)((0, import_lodash.map)((0, import_lodash.toPairs)(dataInterface), ([name, value]) => {
  if ((0, import_lodash.isFunction)(value)) {
    return [name, makeChannel(name)];
  }
  return null;
})));
const channels = channelsAsUnknown;
function _cleanData(data) {
  const { cleaned, pathsChanged } = (0, import_cleanDataForIpc.cleanDataForIpc)(data);
  if (pathsChanged.length) {
    log.info(`_cleanData cleaned the following paths: ${pathsChanged.join(", ")}`);
  }
  return cleaned;
}
function _cleanMessageData(data) {
  if (!data.received_at) {
    (0, import_assert.assert)(false, "received_at was not set on the message");
    data.received_at = window.Signal.Util.incrementMessageCounter();
  }
  return _cleanData((0, import_lodash.omit)(data, ["dataMessage"]));
}
async function _shutdown() {
  const jobKeys = Object.keys(_jobs);
  log.info(`data.shutdown: shutdown requested. ${jobKeys.length} jobs outstanding`);
  if (_shutdownPromise) {
    await _shutdownPromise;
    return;
  }
  _shuttingDown = true;
  if (jobKeys.length === 0 || _DEBUG) {
    return;
  }
  _shutdownPromise = new Promise((resolve, reject) => {
    _shutdownCallback = /* @__PURE__ */ __name((error) => {
      log.info("data.shutdown: process complete");
      if (error) {
        reject(error);
        return;
      }
      resolve();
    }, "_shutdownCallback");
  });
  await _shutdownPromise;
}
function _makeJob(fnName) {
  if (_shuttingDown && fnName !== "close") {
    throw new Error(`Rejecting SQL channel job (${fnName}); application is shutting down`);
  }
  _jobCounter += 1;
  const id = _jobCounter;
  if (_DEBUG) {
    log.info(`SQL channel job ${id} (${fnName}) started`);
  }
  _jobs[id] = {
    fnName,
    start: Date.now()
  };
  return id;
}
function _updateJob(id, data) {
  const { resolve, reject } = data;
  const { fnName, start } = _jobs[id];
  _jobs[id] = {
    ..._jobs[id],
    ...data,
    resolve: (value) => {
      _removeJob(id);
      const end = Date.now();
      if (_DEBUG) {
        log.info(`SQL channel job ${id} (${fnName}) succeeded in ${end - start}ms`);
      }
      return resolve(value);
    },
    reject: (error) => {
      _removeJob(id);
      const end = Date.now();
      log.info(`SQL channel job ${id} (${fnName}) failed in ${end - start}ms`);
      return reject(error);
    }
  };
}
function _removeJob(id) {
  if (_DEBUG) {
    _jobs[id].complete = true;
    return;
  }
  delete _jobs[id];
  if (_shutdownCallback) {
    const keys = Object.keys(_jobs);
    if (keys.length === 0) {
      _shutdownCallback();
    }
  }
}
function _getJob(id) {
  return _jobs[id];
}
if (import_electron.ipcRenderer && import_electron.ipcRenderer.on) {
  import_electron.ipcRenderer.on(`${SQL_CHANNEL_KEY}-done`, (_, jobId, errorForDisplay, result) => {
    const job = _getJob(jobId);
    if (!job) {
      throw new Error(`Received SQL channel reply to job ${jobId}, but did not have it in our registry!`);
    }
    const { resolve, reject, fnName } = job;
    if (!resolve || !reject) {
      throw new Error(`SQL channel job ${jobId} (${fnName}): didn't have a resolve or reject`);
    }
    if (errorForDisplay) {
      return reject(new Error(`Error received from SQL channel job ${jobId} (${fnName}): ${errorForDisplay}`));
    }
    return resolve(result);
  });
} else {
  log.warn("sql/Client: ipc.on is not available!");
}
function makeChannel(fnName) {
  return async (...args) => {
    if (state === "InRenderer" /* InRenderer */) {
      const serverFnName = fnName;
      const start = Date.now();
      try {
        return await import_Server.default[serverFnName](...args);
      } catch (error) {
        if ((0, import_errors.isCorruptionError)(error)) {
          log.error(`Detected sql corruption in renderer process. Restarting the application immediately. Error: ${error.message}`);
          import_electron.ipcRenderer?.send("database-error", error.stack);
        }
        log.error(`Renderer SQL channel job (${fnName}) error ${error.message}`);
        throw error;
      } finally {
        const duration = Date.now() - start;
        startupQueries.set(serverFnName, (startupQueries.get(serverFnName) || 0) + duration);
        if (duration > MIN_TRACE_DURATION || _DEBUG) {
          log.info(`Renderer SQL channel job (${fnName}) completed in ${duration}ms`);
        }
      }
    }
    const jobId = _makeJob(fnName);
    return (0, import_TaskWithTimeout.default)(() => new Promise((resolve, reject) => {
      try {
        import_electron.ipcRenderer.send(SQL_CHANNEL_KEY, jobId, fnName, ...args);
        _updateJob(jobId, {
          resolve,
          reject,
          args: _DEBUG ? args : void 0
        });
      } catch (error) {
        _removeJob(jobId);
        reject(error);
      }
    }), `SQL channel job ${jobId} (${fnName})`)();
  };
}
function keysToBytes(keys, data) {
  const updated = (0, import_lodash.cloneDeep)(data);
  const max = keys.length;
  for (let i = 0; i < max; i += 1) {
    const key = keys[i];
    const value = (0, import_lodash.get)(data, key);
    if (value) {
      (0, import_lodash.set)(updated, key, Bytes.fromBase64(value));
    }
  }
  return updated;
}
function keysFromBytes(keys, data) {
  const updated = (0, import_lodash.cloneDeep)(data);
  const max = keys.length;
  for (let i = 0; i < max; i += 1) {
    const key = keys[i];
    const value = (0, import_lodash.get)(data, key);
    if (value) {
      (0, import_lodash.set)(updated, key, Bytes.toBase64(value));
    }
  }
  return updated;
}
async function shutdown() {
  log.info("Client.shutdown");
  await _shutdown();
  await close();
}
async function close() {
  await channels.close();
}
async function removeDB() {
  await channels.removeDB();
}
async function removeIndexedDBFiles() {
  await channels.removeIndexedDBFiles();
}
const IDENTITY_KEY_KEYS = ["publicKey"];
async function createOrUpdateIdentityKey(data) {
  const updated = keysFromBytes(IDENTITY_KEY_KEYS, data);
  await channels.createOrUpdateIdentityKey(updated);
}
async function getIdentityKeyById(id) {
  const data = await channels.getIdentityKeyById(id);
  return keysToBytes(IDENTITY_KEY_KEYS, data);
}
async function bulkAddIdentityKeys(array) {
  const updated = (0, import_lodash.map)(array, (data) => keysFromBytes(IDENTITY_KEY_KEYS, data));
  await channels.bulkAddIdentityKeys(updated);
}
async function removeIdentityKeyById(id) {
  await channels.removeIdentityKeyById(id);
}
async function removeAllIdentityKeys() {
  await channels.removeAllIdentityKeys();
}
async function getAllIdentityKeys() {
  const keys = await channels.getAllIdentityKeys();
  return keys.map((key) => keysToBytes(IDENTITY_KEY_KEYS, key));
}
async function createOrUpdatePreKey(data) {
  const updated = keysFromBytes(PRE_KEY_KEYS, data);
  await channels.createOrUpdatePreKey(updated);
}
async function getPreKeyById(id) {
  const data = await channels.getPreKeyById(id);
  return keysToBytes(PRE_KEY_KEYS, data);
}
async function bulkAddPreKeys(array) {
  const updated = (0, import_lodash.map)(array, (data) => keysFromBytes(PRE_KEY_KEYS, data));
  await channels.bulkAddPreKeys(updated);
}
async function removePreKeyById(id) {
  await channels.removePreKeyById(id);
}
async function removeAllPreKeys() {
  await channels.removeAllPreKeys();
}
async function getAllPreKeys() {
  const keys = await channels.getAllPreKeys();
  return keys.map((key) => keysToBytes(PRE_KEY_KEYS, key));
}
const PRE_KEY_KEYS = ["privateKey", "publicKey"];
async function createOrUpdateSignedPreKey(data) {
  const updated = keysFromBytes(PRE_KEY_KEYS, data);
  await channels.createOrUpdateSignedPreKey(updated);
}
async function getSignedPreKeyById(id) {
  const data = await channels.getSignedPreKeyById(id);
  return keysToBytes(PRE_KEY_KEYS, data);
}
async function getAllSignedPreKeys() {
  const keys = await channels.getAllSignedPreKeys();
  return keys.map((key) => keysToBytes(PRE_KEY_KEYS, key));
}
async function bulkAddSignedPreKeys(array) {
  const updated = (0, import_lodash.map)(array, (data) => keysFromBytes(PRE_KEY_KEYS, data));
  await channels.bulkAddSignedPreKeys(updated);
}
async function removeSignedPreKeyById(id) {
  await channels.removeSignedPreKeyById(id);
}
async function removeAllSignedPreKeys() {
  await channels.removeAllSignedPreKeys();
}
const ITEM_KEYS = {
  senderCertificate: ["value.serialized"],
  senderCertificateNoE164: ["value.serialized"],
  subscriberId: ["value"],
  profileKey: ["value"]
};
async function createOrUpdateItem(data) {
  const { id } = data;
  if (!id) {
    throw new Error("createOrUpdateItem: Provided data did not have a truthy id");
  }
  const keys = ITEM_KEYS[id];
  const updated = Array.isArray(keys) ? keysFromBytes(keys, data) : data;
  await channels.createOrUpdateItem(updated);
}
async function getItemById(id) {
  const keys = ITEM_KEYS[id];
  const data = await channels.getItemById(id);
  return Array.isArray(keys) ? keysToBytes(keys, data) : data;
}
async function getAllItems() {
  const items = await channels.getAllItems();
  const result = /* @__PURE__ */ Object.create(null);
  for (const id of Object.keys(items)) {
    const key = id;
    const value = items[key];
    const keys = ITEM_KEYS[key];
    const deserializedValue = Array.isArray(keys) ? keysToBytes(keys, { value }).value : value;
    result[key] = deserializedValue;
  }
  return result;
}
async function removeItemById(id) {
  await channels.removeItemById(id);
}
async function removeAllItems() {
  await channels.removeAllItems();
}
async function createOrUpdateSenderKey(key) {
  await channels.createOrUpdateSenderKey(key);
}
async function getSenderKeyById(id) {
  return channels.getSenderKeyById(id);
}
async function removeAllSenderKeys() {
  await channels.removeAllSenderKeys();
}
async function getAllSenderKeys() {
  return channels.getAllSenderKeys();
}
async function removeSenderKeyById(id) {
  return channels.removeSenderKeyById(id);
}
async function insertSentProto(proto, options) {
  return channels.insertSentProto(proto, {
    ...options,
    messageIds: (0, import_lodash.uniq)(options.messageIds)
  });
}
async function deleteSentProtosOlderThan(timestamp) {
  await channels.deleteSentProtosOlderThan(timestamp);
}
async function deleteSentProtoByMessageId(messageId) {
  await channels.deleteSentProtoByMessageId(messageId);
}
async function insertProtoRecipients(options) {
  await channels.insertProtoRecipients(options);
}
async function deleteSentProtoRecipient(options) {
  await channels.deleteSentProtoRecipient(options);
}
async function getSentProtoByRecipient(options) {
  return channels.getSentProtoByRecipient(options);
}
async function removeAllSentProtos() {
  await channels.removeAllSentProtos();
}
async function getAllSentProtos() {
  return channels.getAllSentProtos();
}
async function _getAllSentProtoRecipients() {
  return channels._getAllSentProtoRecipients();
}
async function _getAllSentProtoMessageIds() {
  return channels._getAllSentProtoMessageIds();
}
async function createOrUpdateSession(data) {
  await channels.createOrUpdateSession(data);
}
async function createOrUpdateSessions(array) {
  await channels.createOrUpdateSessions(array);
}
async function commitDecryptResult(options) {
  await channels.commitDecryptResult(options);
}
async function bulkAddSessions(array) {
  await channels.bulkAddSessions(array);
}
async function removeSessionById(id) {
  await channels.removeSessionById(id);
}
async function removeSessionsByConversation(conversationId) {
  await channels.removeSessionsByConversation(conversationId);
}
async function removeAllSessions() {
  await channels.removeAllSessions();
}
async function getAllSessions() {
  const sessions = await channels.getAllSessions();
  return sessions;
}
async function getConversationCount() {
  return channels.getConversationCount();
}
async function saveConversation(data) {
  await channels.saveConversation(data);
}
async function saveConversations(array) {
  await channels.saveConversations(array);
}
async function getConversationById(id) {
  return channels.getConversationById(id);
}
const updateConversationBatcher = (0, import_batcher.createBatcher)({
  name: "sql.Client.updateConversationBatcher",
  wait: 500,
  maxSize: 20,
  processBatch: async (items) => {
    const byId = (0, import_lodash.groupBy)(items, (item) => item.id);
    const ids = Object.keys(byId);
    const mostRecent = ids.map((id) => {
      const maybeLast = (0, import_lodash.last)(byId[id]);
      (0, import_assert.assert)(maybeLast !== void 0, "Empty array in `groupBy` result");
      return maybeLast;
    });
    await updateConversations(mostRecent);
  }
});
function updateConversation(data) {
  updateConversationBatcher.add(data);
}
async function updateConversations(array) {
  const { cleaned, pathsChanged } = (0, import_cleanDataForIpc.cleanDataForIpc)(array);
  (0, import_assert.assert)(!pathsChanged.length, `Paths were cleaned: ${JSON.stringify(pathsChanged)}`);
  await channels.updateConversations(cleaned);
}
async function removeConversation(id) {
  const existing = await getConversationById(id);
  if (existing) {
    await channels.removeConversation(id);
    await (0, import_Conversation.deleteExternalFiles)(existing, {
      deleteAttachmentData: window.Signal.Migrations.deleteAttachmentData
    });
  }
}
async function eraseStorageServiceStateFromConversations() {
  await channels.eraseStorageServiceStateFromConversations();
}
async function getAllConversations() {
  return channels.getAllConversations();
}
async function getAllConversationIds() {
  const ids = await channels.getAllConversationIds();
  return ids;
}
async function getAllGroupsInvolvingUuid(uuid) {
  return channels.getAllGroupsInvolvingUuid(uuid);
}
function handleSearchMessageJSON(messages) {
  return messages.map((message) => ({
    json: message.json,
    bodyRanges: [],
    ...JSON.parse(message.json),
    snippet: message.snippet
  }));
}
async function searchMessages(query, { limit } = {}) {
  const messages = await channels.searchMessages(query, { limit });
  return handleSearchMessageJSON(messages);
}
async function searchMessagesInConversation(query, conversationId, { limit } = {}) {
  const messages = await channels.searchMessagesInConversation(query, conversationId, { limit });
  return handleSearchMessageJSON(messages);
}
async function getMessageCount(conversationId) {
  return channels.getMessageCount(conversationId);
}
async function getStoryCount(conversationId) {
  return channels.getStoryCount(conversationId);
}
async function saveMessage(data, options) {
  const id = await channels.saveMessage(_cleanMessageData(data), {
    ...options,
    jobToInsert: options.jobToInsert && (0, import_formatJobForInsert.formatJobForInsert)(options.jobToInsert)
  });
  import_expiringMessagesDeletion.expiringMessagesDeletionService.update();
  import_tapToViewMessagesDeletionService.tapToViewMessagesDeletionService.update();
  return id;
}
async function saveMessages(arrayOfMessages, options) {
  await channels.saveMessages(arrayOfMessages.map((message) => _cleanMessageData(message)), options);
  import_expiringMessagesDeletion.expiringMessagesDeletionService.update();
  import_tapToViewMessagesDeletionService.tapToViewMessagesDeletionService.update();
}
async function removeMessage(id) {
  const message = await getMessageById(id);
  if (message) {
    await channels.removeMessage(id);
    await (0, import_cleanup.cleanupMessage)(message);
  }
}
async function removeMessages(ids) {
  await channels.removeMessages(ids);
}
async function getMessageById(id) {
  return channels.getMessageById(id);
}
async function getMessagesById(messageIds) {
  if (!messageIds.length) {
    return [];
  }
  return channels.getMessagesById(messageIds);
}
async function _getAllMessages() {
  return channels._getAllMessages();
}
async function _removeAllMessages() {
  await channels._removeAllMessages();
}
async function getAllMessageIds() {
  const ids = await channels.getAllMessageIds();
  return ids;
}
async function getMessageBySender({
  source,
  sourceUuid,
  sourceDevice,
  sent_at
}) {
  return channels.getMessageBySender({
    source,
    sourceUuid,
    sourceDevice,
    sent_at
  });
}
async function getTotalUnreadForConversation(conversationId, options) {
  return channels.getTotalUnreadForConversation(conversationId, options);
}
async function getUnreadByConversationAndMarkRead(options) {
  return channels.getUnreadByConversationAndMarkRead(options);
}
async function getUnreadReactionsAndMarkRead(options) {
  return channels.getUnreadReactionsAndMarkRead(options);
}
async function markReactionAsRead(targetAuthorUuid, targetTimestamp) {
  return channels.markReactionAsRead(targetAuthorUuid, targetTimestamp);
}
async function removeReactionFromConversation(reaction) {
  return channels.removeReactionFromConversation(reaction);
}
async function addReaction(reactionObj) {
  return channels.addReaction(reactionObj);
}
async function _getAllReactions() {
  return channels._getAllReactions();
}
async function _removeAllReactions() {
  await channels._removeAllReactions();
}
function handleMessageJSON(messages) {
  return messages.map((message) => JSON.parse(message.json));
}
async function getOlderMessagesByConversation(conversationId, {
  isGroup,
  limit = 100,
  messageId,
  receivedAt = Number.MAX_VALUE,
  sentAt = Number.MAX_VALUE,
  storyId
}) {
  const messages = await channels.getOlderMessagesByConversation(conversationId, {
    isGroup,
    limit,
    receivedAt,
    sentAt,
    messageId,
    storyId
  });
  return handleMessageJSON(messages);
}
async function getOlderStories(options) {
  return channels.getOlderStories(options);
}
async function getNewerMessagesByConversation(conversationId, {
  isGroup,
  limit = 100,
  receivedAt = 0,
  sentAt = 0,
  storyId
}) {
  const messages = await channels.getNewerMessagesByConversation(conversationId, {
    isGroup,
    limit,
    receivedAt,
    sentAt,
    storyId
  });
  return handleMessageJSON(messages);
}
async function getConversationMessageStats({
  conversationId,
  isGroup,
  ourUuid
}) {
  const { preview, activity, hasUserInitiatedMessages } = await channels.getConversationMessageStats({
    conversationId,
    isGroup,
    ourUuid
  });
  return {
    preview,
    activity,
    hasUserInitiatedMessages
  };
}
async function getLastConversationMessage({
  conversationId
}) {
  return channels.getLastConversationMessage({ conversationId });
}
async function getMessageMetricsForConversation(conversationId, storyId, isGroup) {
  const result = await channels.getMessageMetricsForConversation(conversationId, storyId, isGroup);
  return result;
}
async function getConversationRangeCenteredOnMessage(options) {
  const result = await channels.getConversationRangeCenteredOnMessage(options);
  return {
    ...result,
    older: handleMessageJSON(result.older),
    newer: handleMessageJSON(result.newer)
  };
}
function hasGroupCallHistoryMessage(conversationId, eraId) {
  return channels.hasGroupCallHistoryMessage(conversationId, eraId);
}
async function migrateConversationMessages(obsoleteId, currentId) {
  await channels.migrateConversationMessages(obsoleteId, currentId);
}
async function removeAllMessagesInConversation(conversationId, {
  logId
}) {
  let messages;
  do {
    const chunkSize = 20;
    log.info(`removeAllMessagesInConversation/${logId}: Fetching chunk of ${chunkSize} messages`);
    messages = await getOlderMessagesByConversation(conversationId, {
      limit: chunkSize,
      isGroup: true,
      storyId: void 0
    });
    if (!messages.length) {
      return;
    }
    const ids = messages.map((message) => message.id);
    log.info(`removeAllMessagesInConversation/${logId}: Cleanup...`);
    const queue = new window.PQueue({ concurrency: 3, timeout: 1e3 * 60 * 2 });
    queue.addAll(messages.map((message) => async () => (0, import_cleanup.cleanupMessage)(message)));
    await queue.onIdle();
    log.info(`removeAllMessagesInConversation/${logId}: Deleting...`);
    await channels.removeMessages(ids);
  } while (messages.length > 0);
}
async function getMessagesBySentAt(sentAt) {
  return channels.getMessagesBySentAt(sentAt);
}
async function getExpiredMessages() {
  return channels.getExpiredMessages();
}
function getMessagesUnexpectedlyMissingExpirationStartTimestamp() {
  return channels.getMessagesUnexpectedlyMissingExpirationStartTimestamp();
}
function getSoonestMessageExpiry() {
  return channels.getSoonestMessageExpiry();
}
async function getNextTapToViewMessageTimestampToAgeOut() {
  return channels.getNextTapToViewMessageTimestampToAgeOut();
}
async function getTapToViewMessagesNeedingErase() {
  return channels.getTapToViewMessagesNeedingErase();
}
async function getUnprocessedCount() {
  return channels.getUnprocessedCount();
}
async function getAllUnprocessedAndIncrementAttempts() {
  return channels.getAllUnprocessedAndIncrementAttempts();
}
async function getUnprocessedById(id) {
  return channels.getUnprocessedById(id);
}
async function updateUnprocessedWithData(id, data) {
  await channels.updateUnprocessedWithData(id, data);
}
async function updateUnprocessedsWithData(array) {
  await channels.updateUnprocessedsWithData(array);
}
async function removeUnprocessed(id) {
  await channels.removeUnprocessed(id);
}
async function removeAllUnprocessed() {
  await channels.removeAllUnprocessed();
}
async function getAttachmentDownloadJobById(id) {
  return channels.getAttachmentDownloadJobById(id);
}
async function getNextAttachmentDownloadJobs(limit, options) {
  return channels.getNextAttachmentDownloadJobs(limit, options);
}
async function saveAttachmentDownloadJob(job) {
  await channels.saveAttachmentDownloadJob(_cleanData(job));
}
async function setAttachmentDownloadJobPending(id, pending) {
  await channels.setAttachmentDownloadJobPending(id, pending);
}
async function resetAttachmentDownloadPending() {
  await channels.resetAttachmentDownloadPending();
}
async function removeAttachmentDownloadJob(id) {
  await channels.removeAttachmentDownloadJob(id);
}
async function removeAllAttachmentDownloadJobs() {
  await channels.removeAllAttachmentDownloadJobs();
}
async function getStickerCount() {
  return channels.getStickerCount();
}
async function createOrUpdateStickerPack(pack) {
  await channels.createOrUpdateStickerPack(pack);
}
async function updateStickerPackStatus(packId, status, options) {
  await channels.updateStickerPackStatus(packId, status, options);
}
async function createOrUpdateSticker(sticker) {
  await channels.createOrUpdateSticker(sticker);
}
async function updateStickerLastUsed(packId, stickerId, timestamp) {
  await channels.updateStickerLastUsed(packId, stickerId, timestamp);
}
async function addStickerPackReference(messageId, packId) {
  await channels.addStickerPackReference(messageId, packId);
}
async function deleteStickerPackReference(messageId, packId) {
  return channels.deleteStickerPackReference(messageId, packId);
}
async function deleteStickerPack(packId) {
  const paths = await channels.deleteStickerPack(packId);
  return paths;
}
async function getAllStickerPacks() {
  const packs = await channels.getAllStickerPacks();
  return packs;
}
async function getAllStickers() {
  const stickers = await channels.getAllStickers();
  return stickers;
}
async function getRecentStickers() {
  const recentStickers = await channels.getRecentStickers();
  return recentStickers;
}
async function clearAllErrorStickerPackAttempts() {
  await channels.clearAllErrorStickerPackAttempts();
}
async function updateEmojiUsage(shortName) {
  await channels.updateEmojiUsage(shortName);
}
async function getRecentEmojis(limit = 32) {
  return channels.getRecentEmojis(limit);
}
function getAllBadges() {
  return channels.getAllBadges();
}
async function updateOrCreateBadges(badges) {
  if (badges.length) {
    await channels.updateOrCreateBadges(badges);
  }
}
function badgeImageFileDownloaded(url, localPath) {
  return channels.badgeImageFileDownloaded(url, localPath);
}
async function _getAllStoryDistributions() {
  return channels._getAllStoryDistributions();
}
async function _getAllStoryDistributionMembers() {
  return channels._getAllStoryDistributionMembers();
}
async function _deleteAllStoryDistributions() {
  await channels._deleteAllStoryDistributions();
}
async function createNewStoryDistribution(distribution) {
  await channels.createNewStoryDistribution(distribution);
}
async function getAllStoryDistributionsWithMembers() {
  return channels.getAllStoryDistributionsWithMembers();
}
async function getStoryDistributionWithMembers(id) {
  return channels.getStoryDistributionWithMembers(id);
}
async function modifyStoryDistribution(distribution) {
  await channels.modifyStoryDistribution(distribution);
}
async function modifyStoryDistributionMembers(id, options) {
  await channels.modifyStoryDistributionMembers(id, options);
}
async function deleteStoryDistribution(id) {
  await channels.deleteStoryDistribution(id);
}
async function _getAllStoryReads() {
  return channels._getAllStoryReads();
}
async function _deleteAllStoryReads() {
  await channels._deleteAllStoryReads();
}
async function addNewStoryRead(read) {
  return channels.addNewStoryRead(read);
}
async function getLastStoryReadsForAuthor(options) {
  return channels.getLastStoryReadsForAuthor(options);
}
async function countStoryReadsByConversation(conversationId) {
  return channels.countStoryReadsByConversation(conversationId);
}
async function removeAll() {
  await channels.removeAll();
}
async function removeAllConfiguration(type) {
  await channels.removeAllConfiguration(type);
}
async function cleanupOrphanedAttachments() {
  await callChannel(CLEANUP_ORPHANED_ATTACHMENTS_KEY);
}
async function ensureFilePermissions() {
  await callChannel(ENSURE_FILE_PERMISSIONS);
}
async function removeOtherData() {
  await Promise.all([
    callChannel(ERASE_SQL_KEY),
    callChannel(ERASE_ATTACHMENTS_KEY),
    callChannel(ERASE_STICKERS_KEY),
    callChannel(ERASE_TEMP_KEY),
    callChannel(ERASE_DRAFTS_KEY)
  ]);
}
async function callChannel(name) {
  return (0, import_TaskWithTimeout.default)(() => new Promise((resolve, reject) => {
    import_electron.ipcRenderer.send(name);
    import_electron.ipcRenderer.once(`${name}-done`, (_, error) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  }), `callChannel call to ${name}`)();
}
async function getMessagesNeedingUpgrade(limit, { maxVersion = import_Message2.CURRENT_SCHEMA_VERSION }) {
  const messages = await channels.getMessagesNeedingUpgrade(limit, {
    maxVersion
  });
  return messages;
}
async function getMessagesWithVisualMediaAttachments(conversationId, { limit }) {
  return channels.getMessagesWithVisualMediaAttachments(conversationId, {
    limit
  });
}
async function getMessagesWithFileAttachments(conversationId, { limit }) {
  return channels.getMessagesWithFileAttachments(conversationId, {
    limit
  });
}
function getMessageServerGuidsForSpam(conversationId) {
  return channels.getMessageServerGuidsForSpam(conversationId);
}
function getJobsInQueue(queueType) {
  return channels.getJobsInQueue(queueType);
}
function insertJob(job) {
  return channels.insertJob(job);
}
function deleteJob(id) {
  return channels.deleteJob(id);
}
function processGroupCallRingRequest(ringId) {
  return channels.processGroupCallRingRequest(ringId);
}
function processGroupCallRingCancelation(ringId) {
  return channels.processGroupCallRingCancelation(ringId);
}
async function cleanExpiredGroupCallRings() {
  await channels.cleanExpiredGroupCallRings();
}
async function updateAllConversationColors(conversationColor, customColorData) {
  return channels.updateAllConversationColors(conversationColor, customColorData);
}
function getMaxMessageCounter() {
  return channels.getMaxMessageCounter();
}
function getStatisticsForLogging() {
  return channels.getStatisticsForLogging();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2xpZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tYXdhaXQtaW4tbG9vcCAqL1xuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlcyAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L2Jhbi10eXBlcyAqL1xuaW1wb3J0IHsgaXBjUmVuZGVyZXIgYXMgaXBjIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IGZzIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQge1xuICBjbG9uZURlZXAsXG4gIGNvbXBhY3QsXG4gIGZyb21QYWlycyxcbiAgZ2V0LFxuICBncm91cEJ5LFxuICBpc0Z1bmN0aW9uLFxuICBsYXN0LFxuICBtYXAsXG4gIG9taXQsXG4gIHNldCxcbiAgdG9QYWlycyxcbiAgdW5pcSxcbn0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHsgZGVsZXRlRXh0ZXJuYWxGaWxlcyB9IGZyb20gJy4uL3R5cGVzL0NvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBleHBpcmluZ01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvZXhwaXJpbmdNZXNzYWdlc0RlbGV0aW9uJztcbmltcG9ydCB7IHRhcFRvVmlld01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvdGFwVG9WaWV3TWVzc2FnZXNEZWxldGlvblNlcnZpY2UnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgQ1VSUkVOVF9TQ0hFTUFfVkVSU0lPTiB9IGZyb20gJy4uL3R5cGVzL01lc3NhZ2UyJztcbmltcG9ydCB7IGNyZWF0ZUJhdGNoZXIgfSBmcm9tICcuLi91dGlsL2JhdGNoZXInO1xuaW1wb3J0IHsgYXNzZXJ0LCBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBjbGVhbkRhdGFGb3JJcGMgfSBmcm9tICcuL2NsZWFuRGF0YUZvcklwYyc7XG5pbXBvcnQgdHlwZSB7IFJlYWN0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzL1JlYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkNvbG9yVHlwZSwgQ3VzdG9tQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vYmFkZ2VzL3R5cGVzJztcbmltcG9ydCB0eXBlIHsgUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IFJlbW92ZUFsbENvbmZpZ3VyYXRpb24gfSBmcm9tICcuLi90eXBlcy9SZW1vdmVBbGxDb25maWd1cmF0aW9uJztcbmltcG9ydCBjcmVhdGVUYXNrV2l0aFRpbWVvdXQgZnJvbSAnLi4vdGV4dHNlY3VyZS9UYXNrV2l0aFRpbWVvdXQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuaW1wb3J0IHR5cGUgeyBTdG9yZWRKb2IgfSBmcm9tICcuLi9qb2JzL3R5cGVzJztcbmltcG9ydCB7IGZvcm1hdEpvYkZvckluc2VydCB9IGZyb20gJy4uL2pvYnMvZm9ybWF0Sm9iRm9ySW5zZXJ0JztcbmltcG9ydCB7IGNsZWFudXBNZXNzYWdlIH0gZnJvbSAnLi4vdXRpbC9jbGVhbnVwJztcblxuaW1wb3J0IHR5cGUge1xuICBBdHRhY2htZW50RG93bmxvYWRKb2JUeXBlLFxuICBDbGllbnRJbnRlcmZhY2UsXG4gIENsaWVudEpvYlR5cGUsXG4gIENsaWVudFNlYXJjaFJlc3VsdE1lc3NhZ2VUeXBlLFxuICBDb252ZXJzYXRpb25UeXBlLFxuICBEZWxldGVTZW50UHJvdG9SZWNpcGllbnRPcHRpb25zVHlwZSxcbiAgSWRlbnRpdHlLZXlJZFR5cGUsXG4gIElkZW50aXR5S2V5VHlwZSxcbiAgSXRlbUtleVR5cGUsXG4gIEl0ZW1UeXBlLFxuICBDb252ZXJzYXRpb25NZXNzYWdlU3RhdHNUeXBlLFxuICBNZXNzYWdlVHlwZSxcbiAgTWVzc2FnZVR5cGVVbmh5ZHJhdGVkLFxuICBQcmVLZXlJZFR5cGUsXG4gIFByZUtleVR5cGUsXG4gIFNlbmRlcktleUlkVHlwZSxcbiAgU2VuZGVyS2V5VHlwZSxcbiAgU2VudE1lc3NhZ2VEQlR5cGUsXG4gIFNlbnRNZXNzYWdlc1R5cGUsXG4gIFNlbnRQcm90b1R5cGUsXG4gIFNlbnRQcm90b1dpdGhNZXNzYWdlSWRzVHlwZSxcbiAgU2VudFJlY2lwaWVudHNEQlR5cGUsXG4gIFNlbnRSZWNpcGllbnRzVHlwZSxcbiAgU2VydmVySW50ZXJmYWNlLFxuICBTZXJ2ZXJTZWFyY2hSZXN1bHRNZXNzYWdlVHlwZSxcbiAgU2Vzc2lvbklkVHlwZSxcbiAgU2Vzc2lvblR5cGUsXG4gIFNpZ25lZFByZUtleUlkVHlwZSxcbiAgU2lnbmVkUHJlS2V5VHlwZSxcbiAgU3RpY2tlclBhY2tTdGF0dXNUeXBlLFxuICBTdGlja2VyUGFja1R5cGUsXG4gIFN0aWNrZXJUeXBlLFxuICBTdG9yeURpc3RyaWJ1dGlvbk1lbWJlclR5cGUsXG4gIFN0b3J5RGlzdHJpYnV0aW9uVHlwZSxcbiAgU3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVyc1R5cGUsXG4gIFN0b3J5UmVhZFR5cGUsXG4gIFVucHJvY2Vzc2VkVHlwZSxcbiAgVW5wcm9jZXNzZWRVcGRhdGVUeXBlLFxufSBmcm9tICcuL0ludGVyZmFjZSc7XG5pbXBvcnQgU2VydmVyIGZyb20gJy4vU2VydmVyJztcbmltcG9ydCB7IGlzQ29ycnVwdGlvbkVycm9yIH0gZnJvbSAnLi9lcnJvcnMnO1xuXG4vLyBXZSBsaXN0ZW4gdG8gYSBsb3Qgb2YgZXZlbnRzIG9uIGlwYywgb2Z0ZW4gb24gdGhlIHNhbWUgY2hhbm5lbC4gVGhpcyBwcmV2ZW50c1xuLy8gICBhbnkgd2FybmluZ3MgdGhhdCBtaWdodCBiZSBzZW50IHRvIHRoZSBjb25zb2xlIGluIHRoYXQgY2FzZS5cbmlmIChpcGMgJiYgaXBjLnNldE1heExpc3RlbmVycykge1xuICBpcGMuc2V0TWF4TGlzdGVuZXJzKDApO1xufSBlbHNlIHtcbiAgbG9nLndhcm4oJ3NxbC9DbGllbnQ6IGlwYyBpcyBub3QgYXZhaWxhYmxlIScpO1xufVxuXG5jb25zdCBnZXRSZWFsUGF0aCA9IHBpZnkoZnMucmVhbHBhdGgpO1xuXG5jb25zdCBNSU5fVFJBQ0VfRFVSQVRJT04gPSAxMDtcblxuY29uc3QgU1FMX0NIQU5ORUxfS0VZID0gJ3NxbC1jaGFubmVsJztcbmNvbnN0IEVSQVNFX1NRTF9LRVkgPSAnZXJhc2Utc3FsLWtleSc7XG5jb25zdCBFUkFTRV9BVFRBQ0hNRU5UU19LRVkgPSAnZXJhc2UtYXR0YWNobWVudHMnO1xuY29uc3QgRVJBU0VfU1RJQ0tFUlNfS0VZID0gJ2VyYXNlLXN0aWNrZXJzJztcbmNvbnN0IEVSQVNFX1RFTVBfS0VZID0gJ2VyYXNlLXRlbXAnO1xuY29uc3QgRVJBU0VfRFJBRlRTX0tFWSA9ICdlcmFzZS1kcmFmdHMnO1xuY29uc3QgQ0xFQU5VUF9PUlBIQU5FRF9BVFRBQ0hNRU5UU19LRVkgPSAnY2xlYW51cC1vcnBoYW5lZC1hdHRhY2htZW50cyc7XG5jb25zdCBFTlNVUkVfRklMRV9QRVJNSVNTSU9OUyA9ICdlbnN1cmUtZmlsZS1wZXJtaXNzaW9ucyc7XG5cbnR5cGUgQ2xpZW50Sm9iVXBkYXRlVHlwZSA9IHtcbiAgcmVzb2x2ZTogRnVuY3Rpb247XG4gIHJlamVjdDogRnVuY3Rpb247XG4gIGFyZ3M/OiBBcnJheTxhbnk+O1xufTtcblxuZW51bSBSZW5kZXJlclN0YXRlIHtcbiAgSW5NYWluID0gJ0luTWFpbicsXG4gIE9wZW5pbmcgPSAnT3BlbmluZycsXG4gIEluUmVuZGVyZXIgPSAnSW5SZW5kZXJlcicsXG4gIENsb3NpbmcgPSAnQ2xvc2luZycsXG59XG5cbmNvbnN0IF9qb2JzOiB7IFtpZDogc3RyaW5nXTogQ2xpZW50Sm9iVHlwZSB9ID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbmNvbnN0IF9ERUJVRyA9IGZhbHNlO1xubGV0IF9qb2JDb3VudGVyID0gMDtcbmxldCBfc2h1dHRpbmdEb3duID0gZmFsc2U7XG5sZXQgX3NodXRkb3duQ2FsbGJhY2s6IEZ1bmN0aW9uIHwgbnVsbCA9IG51bGw7XG5sZXQgX3NodXRkb3duUHJvbWlzZTogUHJvbWlzZTxhbnk+IHwgbnVsbCA9IG51bGw7XG5sZXQgc3RhdGUgPSBSZW5kZXJlclN0YXRlLkluTWFpbjtcbmNvbnN0IHN0YXJ0dXBRdWVyaWVzID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcblxuLy8gQmVjYXVzZSB3ZSBjYW4ndCBmb3JjZSB0aGlzIG1vZHVsZSB0byBjb25mb3JtIHRvIGFuIGludGVyZmFjZSwgd2UgbmFycm93IG91ciBleHBvcnRzXG4vLyAgIHRvIHRoaXMgb25lIGRlZmF1bHQgZXhwb3J0LCB3aGljaCBkb2VzIGNvbmZvcm0gdG8gdGhlIGludGVyZmFjZS5cbi8vIE5vdGU6IEluIEphdmFzY3JpcHQsIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgLmRlZmF1bHQgcHJvcGVydHkgd2hlbiByZXF1aXJpbmcgaXRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNDIwXG5jb25zdCBkYXRhSW50ZXJmYWNlOiBDbGllbnRJbnRlcmZhY2UgPSB7XG4gIGNsb3NlLFxuICByZW1vdmVEQixcbiAgcmVtb3ZlSW5kZXhlZERCRmlsZXMsXG5cbiAgY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleSxcbiAgZ2V0SWRlbnRpdHlLZXlCeUlkLFxuICBidWxrQWRkSWRlbnRpdHlLZXlzLFxuICByZW1vdmVJZGVudGl0eUtleUJ5SWQsXG4gIHJlbW92ZUFsbElkZW50aXR5S2V5cyxcbiAgZ2V0QWxsSWRlbnRpdHlLZXlzLFxuXG4gIGNyZWF0ZU9yVXBkYXRlUHJlS2V5LFxuICBnZXRQcmVLZXlCeUlkLFxuICBidWxrQWRkUHJlS2V5cyxcbiAgcmVtb3ZlUHJlS2V5QnlJZCxcbiAgcmVtb3ZlQWxsUHJlS2V5cyxcbiAgZ2V0QWxsUHJlS2V5cyxcblxuICBjcmVhdGVPclVwZGF0ZVNpZ25lZFByZUtleSxcbiAgZ2V0U2lnbmVkUHJlS2V5QnlJZCxcbiAgYnVsa0FkZFNpZ25lZFByZUtleXMsXG4gIHJlbW92ZVNpZ25lZFByZUtleUJ5SWQsXG4gIHJlbW92ZUFsbFNpZ25lZFByZUtleXMsXG4gIGdldEFsbFNpZ25lZFByZUtleXMsXG5cbiAgY3JlYXRlT3JVcGRhdGVJdGVtLFxuICBnZXRJdGVtQnlJZCxcbiAgcmVtb3ZlSXRlbUJ5SWQsXG4gIHJlbW92ZUFsbEl0ZW1zLFxuICBnZXRBbGxJdGVtcyxcblxuICBjcmVhdGVPclVwZGF0ZVNlbmRlcktleSxcbiAgZ2V0U2VuZGVyS2V5QnlJZCxcbiAgcmVtb3ZlQWxsU2VuZGVyS2V5cyxcbiAgZ2V0QWxsU2VuZGVyS2V5cyxcbiAgcmVtb3ZlU2VuZGVyS2V5QnlJZCxcblxuICBpbnNlcnRTZW50UHJvdG8sXG4gIGRlbGV0ZVNlbnRQcm90b3NPbGRlclRoYW4sXG4gIGRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkLFxuICBpbnNlcnRQcm90b1JlY2lwaWVudHMsXG4gIGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCxcbiAgZ2V0U2VudFByb3RvQnlSZWNpcGllbnQsXG4gIHJlbW92ZUFsbFNlbnRQcm90b3MsXG4gIGdldEFsbFNlbnRQcm90b3MsXG4gIF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzLFxuICBfZ2V0QWxsU2VudFByb3RvTWVzc2FnZUlkcyxcblxuICBjcmVhdGVPclVwZGF0ZVNlc3Npb24sXG4gIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvbnMsXG4gIGNvbW1pdERlY3J5cHRSZXN1bHQsXG4gIGJ1bGtBZGRTZXNzaW9ucyxcbiAgcmVtb3ZlU2Vzc2lvbkJ5SWQsXG4gIHJlbW92ZVNlc3Npb25zQnlDb252ZXJzYXRpb24sXG4gIHJlbW92ZUFsbFNlc3Npb25zLFxuICBnZXRBbGxTZXNzaW9ucyxcblxuICBlcmFzZVN0b3JhZ2VTZXJ2aWNlU3RhdGVGcm9tQ29udmVyc2F0aW9ucyxcbiAgZ2V0Q29udmVyc2F0aW9uQ291bnQsXG4gIHNhdmVDb252ZXJzYXRpb24sXG4gIHNhdmVDb252ZXJzYXRpb25zLFxuICBnZXRDb252ZXJzYXRpb25CeUlkLFxuICB1cGRhdGVDb252ZXJzYXRpb24sXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbnMsXG4gIHJlbW92ZUNvbnZlcnNhdGlvbixcbiAgdXBkYXRlQWxsQ29udmVyc2F0aW9uQ29sb3JzLFxuXG4gIGdldEFsbENvbnZlcnNhdGlvbnMsXG4gIGdldEFsbENvbnZlcnNhdGlvbklkcyxcbiAgZ2V0QWxsR3JvdXBzSW52b2x2aW5nVXVpZCxcblxuICBzZWFyY2hNZXNzYWdlcyxcbiAgc2VhcmNoTWVzc2FnZXNJbkNvbnZlcnNhdGlvbixcblxuICBnZXRNZXNzYWdlQ291bnQsXG4gIGdldFN0b3J5Q291bnQsXG4gIHNhdmVNZXNzYWdlLFxuICBzYXZlTWVzc2FnZXMsXG4gIHJlbW92ZU1lc3NhZ2UsXG4gIHJlbW92ZU1lc3NhZ2VzLFxuICBnZXRUb3RhbFVucmVhZEZvckNvbnZlcnNhdGlvbixcbiAgZ2V0VW5yZWFkQnlDb252ZXJzYXRpb25BbmRNYXJrUmVhZCxcbiAgZ2V0VW5yZWFkUmVhY3Rpb25zQW5kTWFya1JlYWQsXG4gIG1hcmtSZWFjdGlvbkFzUmVhZCxcbiAgcmVtb3ZlUmVhY3Rpb25Gcm9tQ29udmVyc2F0aW9uLFxuICBhZGRSZWFjdGlvbixcbiAgX2dldEFsbFJlYWN0aW9ucyxcbiAgX3JlbW92ZUFsbFJlYWN0aW9ucyxcbiAgZ2V0TWVzc2FnZUJ5U2VuZGVyLFxuICBnZXRNZXNzYWdlQnlJZCxcbiAgZ2V0TWVzc2FnZXNCeUlkLFxuICBfZ2V0QWxsTWVzc2FnZXMsXG4gIF9yZW1vdmVBbGxNZXNzYWdlcyxcbiAgZ2V0QWxsTWVzc2FnZUlkcyxcbiAgZ2V0TWVzc2FnZXNCeVNlbnRBdCxcbiAgZ2V0RXhwaXJlZE1lc3NhZ2VzLFxuICBnZXRNZXNzYWdlc1VuZXhwZWN0ZWRseU1pc3NpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gIGdldFNvb25lc3RNZXNzYWdlRXhwaXJ5LFxuICBnZXROZXh0VGFwVG9WaWV3TWVzc2FnZVRpbWVzdGFtcFRvQWdlT3V0LFxuICBnZXRUYXBUb1ZpZXdNZXNzYWdlc05lZWRpbmdFcmFzZSxcbiAgZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICBnZXRPbGRlclN0b3JpZXMsXG4gIGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbixcbiAgZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb24sXG4gIGdldENvbnZlcnNhdGlvblJhbmdlQ2VudGVyZWRPbk1lc3NhZ2UsXG4gIGdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyxcbiAgZ2V0TGFzdENvbnZlcnNhdGlvbk1lc3NhZ2UsXG4gIGhhc0dyb3VwQ2FsbEhpc3RvcnlNZXNzYWdlLFxuICBtaWdyYXRlQ29udmVyc2F0aW9uTWVzc2FnZXMsXG5cbiAgZ2V0VW5wcm9jZXNzZWRDb3VudCxcbiAgZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cyxcbiAgZ2V0VW5wcm9jZXNzZWRCeUlkLFxuICB1cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhLFxuICB1cGRhdGVVbnByb2Nlc3NlZHNXaXRoRGF0YSxcbiAgcmVtb3ZlVW5wcm9jZXNzZWQsXG4gIHJlbW92ZUFsbFVucHJvY2Vzc2VkLFxuXG4gIGdldEF0dGFjaG1lbnREb3dubG9hZEpvYkJ5SWQsXG4gIGdldE5leHRBdHRhY2htZW50RG93bmxvYWRKb2JzLFxuICBzYXZlQXR0YWNobWVudERvd25sb2FkSm9iLFxuICByZXNldEF0dGFjaG1lbnREb3dubG9hZFBlbmRpbmcsXG4gIHNldEF0dGFjaG1lbnREb3dubG9hZEpvYlBlbmRpbmcsXG4gIHJlbW92ZUF0dGFjaG1lbnREb3dubG9hZEpvYixcbiAgcmVtb3ZlQWxsQXR0YWNobWVudERvd25sb2FkSm9icyxcblxuICBjcmVhdGVPclVwZGF0ZVN0aWNrZXJQYWNrLFxuICB1cGRhdGVTdGlja2VyUGFja1N0YXR1cyxcbiAgY3JlYXRlT3JVcGRhdGVTdGlja2VyLFxuICB1cGRhdGVTdGlja2VyTGFzdFVzZWQsXG4gIGFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlLFxuICBkZWxldGVTdGlja2VyUGFja1JlZmVyZW5jZSxcbiAgZ2V0U3RpY2tlckNvdW50LFxuICBkZWxldGVTdGlja2VyUGFjayxcbiAgZ2V0QWxsU3RpY2tlclBhY2tzLFxuICBnZXRBbGxTdGlja2VycyxcbiAgZ2V0UmVjZW50U3RpY2tlcnMsXG4gIGNsZWFyQWxsRXJyb3JTdGlja2VyUGFja0F0dGVtcHRzLFxuXG4gIHVwZGF0ZUVtb2ppVXNhZ2UsXG4gIGdldFJlY2VudEVtb2ppcyxcblxuICBnZXRBbGxCYWRnZXMsXG4gIHVwZGF0ZU9yQ3JlYXRlQmFkZ2VzLFxuICBiYWRnZUltYWdlRmlsZURvd25sb2FkZWQsXG5cbiAgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9ucyxcbiAgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVycyxcbiAgX2RlbGV0ZUFsbFN0b3J5RGlzdHJpYnV0aW9ucyxcbiAgY3JlYXRlTmV3U3RvcnlEaXN0cmlidXRpb24sXG4gIGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzLFxuICBnZXRTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzLFxuICBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbixcbiAgbW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzLFxuICBkZWxldGVTdG9yeURpc3RyaWJ1dGlvbixcblxuICBfZ2V0QWxsU3RvcnlSZWFkcyxcbiAgX2RlbGV0ZUFsbFN0b3J5UmVhZHMsXG4gIGFkZE5ld1N0b3J5UmVhZCxcbiAgZ2V0TGFzdFN0b3J5UmVhZHNGb3JBdXRob3IsXG4gIGNvdW50U3RvcnlSZWFkc0J5Q29udmVyc2F0aW9uLFxuXG4gIHJlbW92ZUFsbCxcbiAgcmVtb3ZlQWxsQ29uZmlndXJhdGlvbixcblxuICBnZXRNZXNzYWdlc05lZWRpbmdVcGdyYWRlLFxuICBnZXRNZXNzYWdlc1dpdGhWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLFxuICBnZXRNZXNzYWdlc1dpdGhGaWxlQXR0YWNobWVudHMsXG4gIGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0sXG5cbiAgZ2V0Sm9ic0luUXVldWUsXG4gIGluc2VydEpvYixcbiAgZGVsZXRlSm9iLFxuXG4gIHByb2Nlc3NHcm91cENhbGxSaW5nUmVxdWVzdCxcbiAgcHJvY2Vzc0dyb3VwQ2FsbFJpbmdDYW5jZWxhdGlvbixcbiAgY2xlYW5FeHBpcmVkR3JvdXBDYWxsUmluZ3MsXG5cbiAgZ2V0TWF4TWVzc2FnZUNvdW50ZXIsXG5cbiAgZ2V0U3RhdGlzdGljc0ZvckxvZ2dpbmcsXG5cbiAgLy8gQ2xpZW50LXNpZGUgb25seVxuXG4gIHNodXRkb3duLFxuICByZW1vdmVBbGxNZXNzYWdlc0luQ29udmVyc2F0aW9uLFxuXG4gIHJlbW92ZU90aGVyRGF0YSxcbiAgY2xlYW51cE9ycGhhbmVkQXR0YWNobWVudHMsXG4gIGVuc3VyZUZpbGVQZXJtaXNzaW9ucyxcblxuICAvLyBDbGllbnQtc2lkZSBvbmx5LCBhbmQgdGVzdC1vbmx5XG5cbiAgc3RhcnRJblJlbmRlcmVyUHJvY2VzcyxcbiAgZ29CYWNrVG9NYWluUHJvY2VzcyxcbiAgX2pvYnMsXG59O1xuXG5leHBvcnQgZGVmYXVsdCBkYXRhSW50ZXJmYWNlO1xuXG5hc3luYyBmdW5jdGlvbiBzdGFydEluUmVuZGVyZXJQcm9jZXNzKGlzVGVzdGluZyA9IGZhbHNlKTogUHJvbWlzZTx2b2lkPiB7XG4gIHN0cmljdEFzc2VydChcbiAgICBzdGF0ZSA9PT0gUmVuZGVyZXJTdGF0ZS5Jbk1haW4sXG4gICAgYHN0YXJ0SW5SZW5kZXJlclByb2Nlc3M6IGV4cGVjdGVkICR7c3RhdGV9IHRvIGJlICR7UmVuZGVyZXJTdGF0ZS5Jbk1haW59YFxuICApO1xuXG4gIGxvZy5pbmZvKCdkYXRhLnN0YXJ0SW5SZW5kZXJlclByb2Nlc3M6IHN3aXRjaGluZyB0byByZW5kZXJlciBwcm9jZXNzJyk7XG4gIHN0YXRlID0gUmVuZGVyZXJTdGF0ZS5PcGVuaW5nO1xuXG4gIGlmICghaXNUZXN0aW5nKSB7XG4gICAgaXBjLnNlbmQoJ2RhdGFiYXNlLXJlYWR5Jyk7XG5cbiAgICBhd2FpdCBuZXcgUHJvbWlzZTx2b2lkPihyZXNvbHZlID0+IHtcbiAgICAgIGlwYy5vbmNlKCdkYXRhYmFzZS1yZWFkeScsICgpID0+IHtcbiAgICAgICAgcmVzb2x2ZSgpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBjb25maWdEaXIgPSBhd2FpdCBnZXRSZWFsUGF0aChpcGMuc2VuZFN5bmMoJ2dldC11c2VyLWRhdGEtcGF0aCcpKTtcbiAgY29uc3Qga2V5ID0gaXBjLnNlbmRTeW5jKCd1c2VyLWNvbmZpZy1rZXknKTtcblxuICBhd2FpdCBTZXJ2ZXIuaW5pdGlhbGl6ZVJlbmRlcmVyKHsgY29uZmlnRGlyLCBrZXkgfSk7XG5cbiAgbG9nLmluZm8oJ2RhdGEuc3RhcnRJblJlbmRlcmVyUHJvY2Vzczogc3dpdGNoZWQgdG8gcmVuZGVyZXIgcHJvY2VzcycpO1xuXG4gIHN0YXRlID0gUmVuZGVyZXJTdGF0ZS5JblJlbmRlcmVyO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnb0JhY2tUb01haW5Qcm9jZXNzKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoc3RhdGUgPT09IFJlbmRlcmVyU3RhdGUuSW5NYWluKSB7XG4gICAgbG9nLmluZm8oJ2dvQmFja1RvTWFpblByb2Nlc3M6IEFscmVhZHkgaW4gdGhlIG1haW4gcHJvY2VzcycpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN0cmljdEFzc2VydChcbiAgICBzdGF0ZSA9PT0gUmVuZGVyZXJTdGF0ZS5JblJlbmRlcmVyLFxuICAgIGBnb0JhY2tUb01haW5Qcm9jZXNzOiBleHBlY3RlZCAke3N0YXRlfSB0byBiZSAke1JlbmRlcmVyU3RhdGUuSW5SZW5kZXJlcn1gXG4gICk7XG5cbiAgLy8gV2UgZG9uJ3QgbmVlZCB0byB3YWl0IGZvciBwZW5kaW5nIHF1ZXJpZXMgc2luY2UgdGhleSBhcmUgc3luY2hyb25vdXMuXG4gIGxvZy5pbmZvKCdkYXRhLmdvQmFja1RvTWFpblByb2Nlc3M6IHN3aXRjaGluZyB0byBtYWluIHByb2Nlc3MnKTtcbiAgY29uc3QgY2xvc2VQcm9taXNlID0gY2xvc2UoKTtcblxuICAvLyBJdCBzaG91bGQgYmUgdGhlIGxhc3QgcXVlcnkgd2UgcnVuIGluIHJlbmRlcmVyIHByb2Nlc3NcbiAgc3RhdGUgPSBSZW5kZXJlclN0YXRlLkNsb3Npbmc7XG4gIGF3YWl0IGNsb3NlUHJvbWlzZTtcbiAgc3RhdGUgPSBSZW5kZXJlclN0YXRlLkluTWFpbjtcblxuICAvLyBQcmludCBxdWVyeSBzdGF0aXN0aWNzIGZvciB3aG9sZSBzdGFydHVwXG4gIGNvbnN0IGVudHJpZXMgPSBBcnJheS5mcm9tKHN0YXJ0dXBRdWVyaWVzLmVudHJpZXMoKSk7XG4gIHN0YXJ0dXBRdWVyaWVzLmNsZWFyKCk7XG5cbiAgLy8gU29ydCBieSBkZWNyZWFzaW5nIGR1cmF0aW9uXG4gIGVudHJpZXNcbiAgICAuc29ydCgoYSwgYikgPT4gYlsxXSAtIGFbMV0pXG4gICAgLmZpbHRlcigoW18sIGR1cmF0aW9uXSkgPT4gZHVyYXRpb24gPiBNSU5fVFJBQ0VfRFVSQVRJT04pXG4gICAgLmZvckVhY2goKFtxdWVyeSwgZHVyYXRpb25dKSA9PiB7XG4gICAgICBsb2cuaW5mbyhgc3RhcnR1cCBxdWVyeTogJHtxdWVyeX0gJHtkdXJhdGlvbn1tc2ApO1xuICAgIH0pO1xuXG4gIGxvZy5pbmZvKCdkYXRhLmdvQmFja1RvTWFpblByb2Nlc3M6IHN3aXRjaGVkIHRvIG1haW4gcHJvY2VzcycpO1xufVxuXG5jb25zdCBjaGFubmVsc0FzVW5rbm93biA9IGZyb21QYWlycyhcbiAgY29tcGFjdChcbiAgICBtYXAodG9QYWlycyhkYXRhSW50ZXJmYWNlKSwgKFtuYW1lLCB2YWx1ZV06IFtzdHJpbmcsIGFueV0pID0+IHtcbiAgICAgIGlmIChpc0Z1bmN0aW9uKHZhbHVlKSkge1xuICAgICAgICByZXR1cm4gW25hbWUsIG1ha2VDaGFubmVsKG5hbWUpXTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSlcbiAgKVxuKSBhcyBhbnk7XG5cbmNvbnN0IGNoYW5uZWxzOiBTZXJ2ZXJJbnRlcmZhY2UgPSBjaGFubmVsc0FzVW5rbm93bjtcblxuZnVuY3Rpb24gX2NsZWFuRGF0YShcbiAgZGF0YTogdW5rbm93blxuKTogUmV0dXJuVHlwZTx0eXBlb2YgY2xlYW5EYXRhRm9ySXBjPlsnY2xlYW5lZCddIHtcbiAgY29uc3QgeyBjbGVhbmVkLCBwYXRoc0NoYW5nZWQgfSA9IGNsZWFuRGF0YUZvcklwYyhkYXRhKTtcblxuICBpZiAocGF0aHNDaGFuZ2VkLmxlbmd0aCkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYF9jbGVhbkRhdGEgY2xlYW5lZCB0aGUgZm9sbG93aW5nIHBhdGhzOiAke3BhdGhzQ2hhbmdlZC5qb2luKCcsICcpfWBcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGNsZWFuZWQ7XG59XG5cbmZ1bmN0aW9uIF9jbGVhbk1lc3NhZ2VEYXRhKGRhdGE6IE1lc3NhZ2VUeXBlKTogTWVzc2FnZVR5cGUge1xuICAvLyBFbnN1cmUgdGhhdCBhbGwgbWVzc2FnZXMgaGF2ZSB0aGUgcmVjZWl2ZWRfYXQgc2V0IHByb3Blcmx5XG4gIGlmICghZGF0YS5yZWNlaXZlZF9hdCkge1xuICAgIGFzc2VydChmYWxzZSwgJ3JlY2VpdmVkX2F0IHdhcyBub3Qgc2V0IG9uIHRoZSBtZXNzYWdlJyk7XG4gICAgZGF0YS5yZWNlaXZlZF9hdCA9IHdpbmRvdy5TaWduYWwuVXRpbC5pbmNyZW1lbnRNZXNzYWdlQ291bnRlcigpO1xuICB9XG4gIHJldHVybiBfY2xlYW5EYXRhKG9taXQoZGF0YSwgWydkYXRhTWVzc2FnZSddKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9zaHV0ZG93bigpIHtcbiAgY29uc3Qgam9iS2V5cyA9IE9iamVjdC5rZXlzKF9qb2JzKTtcbiAgbG9nLmluZm8oXG4gICAgYGRhdGEuc2h1dGRvd246IHNodXRkb3duIHJlcXVlc3RlZC4gJHtqb2JLZXlzLmxlbmd0aH0gam9icyBvdXRzdGFuZGluZ2BcbiAgKTtcblxuICBpZiAoX3NodXRkb3duUHJvbWlzZSkge1xuICAgIGF3YWl0IF9zaHV0ZG93blByb21pc2U7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBfc2h1dHRpbmdEb3duID0gdHJ1ZTtcblxuICAvLyBObyBvdXRzdGFuZGluZyBqb2JzLCByZXR1cm4gaW1tZWRpYXRlbHlcbiAgaWYgKGpvYktleXMubGVuZ3RoID09PSAwIHx8IF9ERUJVRykge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIE91dHN0YW5kaW5nIGpvYnM7IHdlIG5lZWQgdG8gd2FpdCB1bnRpbCB0aGUgbGFzdCBvbmUgaXMgZG9uZVxuICBfc2h1dGRvd25Qcm9taXNlID0gbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIF9zaHV0ZG93bkNhbGxiYWNrID0gKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgbG9nLmluZm8oJ2RhdGEuc2h1dGRvd246IHByb2Nlc3MgY29tcGxldGUnKTtcbiAgICAgIGlmIChlcnJvcikge1xuICAgICAgICByZWplY3QoZXJyb3IpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgcmVzb2x2ZSgpO1xuICAgIH07XG4gIH0pO1xuXG4gIGF3YWl0IF9zaHV0ZG93blByb21pc2U7XG59XG5cbmZ1bmN0aW9uIF9tYWtlSm9iKGZuTmFtZTogc3RyaW5nKSB7XG4gIGlmIChfc2h1dHRpbmdEb3duICYmIGZuTmFtZSAhPT0gJ2Nsb3NlJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBSZWplY3RpbmcgU1FMIGNoYW5uZWwgam9iICgke2ZuTmFtZX0pOyBhcHBsaWNhdGlvbiBpcyBzaHV0dGluZyBkb3duYFxuICAgICk7XG4gIH1cblxuICBfam9iQ291bnRlciArPSAxO1xuICBjb25zdCBpZCA9IF9qb2JDb3VudGVyO1xuXG4gIGlmIChfREVCVUcpIHtcbiAgICBsb2cuaW5mbyhgU1FMIGNoYW5uZWwgam9iICR7aWR9ICgke2ZuTmFtZX0pIHN0YXJ0ZWRgKTtcbiAgfVxuICBfam9ic1tpZF0gPSB7XG4gICAgZm5OYW1lLFxuICAgIHN0YXJ0OiBEYXRlLm5vdygpLFxuICB9O1xuXG4gIHJldHVybiBpZDtcbn1cblxuZnVuY3Rpb24gX3VwZGF0ZUpvYihpZDogbnVtYmVyLCBkYXRhOiBDbGllbnRKb2JVcGRhdGVUeXBlKSB7XG4gIGNvbnN0IHsgcmVzb2x2ZSwgcmVqZWN0IH0gPSBkYXRhO1xuICBjb25zdCB7IGZuTmFtZSwgc3RhcnQgfSA9IF9qb2JzW2lkXTtcblxuICBfam9ic1tpZF0gPSB7XG4gICAgLi4uX2pvYnNbaWRdLFxuICAgIC4uLmRhdGEsXG4gICAgcmVzb2x2ZTogKHZhbHVlOiBhbnkpID0+IHtcbiAgICAgIF9yZW1vdmVKb2IoaWQpO1xuICAgICAgY29uc3QgZW5kID0gRGF0ZS5ub3coKTtcbiAgICAgIGlmIChfREVCVUcpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYFNRTCBjaGFubmVsIGpvYiAke2lkfSAoJHtmbk5hbWV9KSBzdWNjZWVkZWQgaW4gJHtlbmQgLSBzdGFydH1tc2BcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc29sdmUodmFsdWUpO1xuICAgIH0sXG4gICAgcmVqZWN0OiAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICBfcmVtb3ZlSm9iKGlkKTtcbiAgICAgIGNvbnN0IGVuZCA9IERhdGUubm93KCk7XG4gICAgICBsb2cuaW5mbyhgU1FMIGNoYW5uZWwgam9iICR7aWR9ICgke2ZuTmFtZX0pIGZhaWxlZCBpbiAke2VuZCAtIHN0YXJ0fW1zYCk7XG5cbiAgICAgIHJldHVybiByZWplY3QoZXJyb3IpO1xuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIF9yZW1vdmVKb2IoaWQ6IG51bWJlcikge1xuICBpZiAoX0RFQlVHKSB7XG4gICAgX2pvYnNbaWRdLmNvbXBsZXRlID0gdHJ1ZTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGRlbGV0ZSBfam9ic1tpZF07XG5cbiAgaWYgKF9zaHV0ZG93bkNhbGxiYWNrKSB7XG4gICAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKF9qb2JzKTtcbiAgICBpZiAoa2V5cy5sZW5ndGggPT09IDApIHtcbiAgICAgIF9zaHV0ZG93bkNhbGxiYWNrKCk7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIF9nZXRKb2IoaWQ6IG51bWJlcikge1xuICByZXR1cm4gX2pvYnNbaWRdO1xufVxuXG5pZiAoaXBjICYmIGlwYy5vbikge1xuICBpcGMub24oYCR7U1FMX0NIQU5ORUxfS0VZfS1kb25lYCwgKF8sIGpvYklkLCBlcnJvckZvckRpc3BsYXksIHJlc3VsdCkgPT4ge1xuICAgIGNvbnN0IGpvYiA9IF9nZXRKb2Ioam9iSWQpO1xuICAgIGlmICgham9iKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBSZWNlaXZlZCBTUUwgY2hhbm5lbCByZXBseSB0byBqb2IgJHtqb2JJZH0sIGJ1dCBkaWQgbm90IGhhdmUgaXQgaW4gb3VyIHJlZ2lzdHJ5IWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgeyByZXNvbHZlLCByZWplY3QsIGZuTmFtZSB9ID0gam9iO1xuXG4gICAgaWYgKCFyZXNvbHZlIHx8ICFyZWplY3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYFNRTCBjaGFubmVsIGpvYiAke2pvYklkfSAoJHtmbk5hbWV9KTogZGlkbid0IGhhdmUgYSByZXNvbHZlIG9yIHJlamVjdGBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yRm9yRGlzcGxheSkge1xuICAgICAgcmV0dXJuIHJlamVjdChcbiAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgIGBFcnJvciByZWNlaXZlZCBmcm9tIFNRTCBjaGFubmVsIGpvYiAke2pvYklkfSAoJHtmbk5hbWV9KTogJHtlcnJvckZvckRpc3BsYXl9YFxuICAgICAgICApXG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiByZXNvbHZlKHJlc3VsdCk7XG4gIH0pO1xufSBlbHNlIHtcbiAgbG9nLndhcm4oJ3NxbC9DbGllbnQ6IGlwYy5vbiBpcyBub3QgYXZhaWxhYmxlIScpO1xufVxuXG5mdW5jdGlvbiBtYWtlQ2hhbm5lbChmbk5hbWU6IHN0cmluZykge1xuICByZXR1cm4gYXN5bmMgKC4uLmFyZ3M6IEFycmF5PGFueT4pID0+IHtcbiAgICAvLyBEdXJpbmcgc3RhcnR1cCB3ZSB3YW50IHRvIGF2b2lkIHRoZSBoaWdoIG92ZXJoZWFkIG9mIElQQyBzbyB3ZSB1dGlsaXplXG4gICAgLy8gdGhlIGRiIHRoYXQgZXhpc3RzIGluIHRoZSByZW5kZXJlciBwcm9jZXNzIHRvIGJlIGFibGUgdG8gYm9vdCB1cCBxdWlja2x5XG4gICAgLy8gb25jZSB0aGUgYXBwIGlzIHJ1bm5pbmcgd2Ugc3dpdGNoIGJhY2sgdG8gdGhlIG1haW4gcHJvY2VzcyB0byBhdm9pZCB0aGVcbiAgICAvLyBVSSBmcm9tIGxvY2tpbmcgdXAgd2hlbmV2ZXIgd2UgZG8gY29zdGx5IGRiIG9wZXJhdGlvbnMuXG4gICAgaWYgKHN0YXRlID09PSBSZW5kZXJlclN0YXRlLkluUmVuZGVyZXIpIHtcbiAgICAgIGNvbnN0IHNlcnZlckZuTmFtZSA9IGZuTmFtZSBhcyBrZXlvZiBTZXJ2ZXJJbnRlcmZhY2U7XG4gICAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIC8vIElnbm9yaW5nIHRoaXMgZXJyb3IgVFMyNTU2OiBFeHBlY3RlZCAzIGFyZ3VtZW50cywgYnV0IGdvdCAwIG9yIG1vcmUuXG4gICAgICAgIHJldHVybiBhd2FpdCAoU2VydmVyW3NlcnZlckZuTmFtZV0gYXMgRnVuY3Rpb24pKC4uLmFyZ3MpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGlzQ29ycnVwdGlvbkVycm9yKGVycm9yKSkge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdEZXRlY3RlZCBzcWwgY29ycnVwdGlvbiBpbiByZW5kZXJlciBwcm9jZXNzLiAnICtcbiAgICAgICAgICAgICAgYFJlc3RhcnRpbmcgdGhlIGFwcGxpY2F0aW9uIGltbWVkaWF0ZWx5LiBFcnJvcjogJHtlcnJvci5tZXNzYWdlfWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGlwYz8uc2VuZCgnZGF0YWJhc2UtZXJyb3InLCBlcnJvci5zdGFjayk7XG4gICAgICAgIH1cbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGBSZW5kZXJlciBTUUwgY2hhbm5lbCBqb2IgKCR7Zm5OYW1lfSkgZXJyb3IgJHtlcnJvci5tZXNzYWdlfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9IGZpbmFsbHkge1xuICAgICAgICBjb25zdCBkdXJhdGlvbiA9IERhdGUubm93KCkgLSBzdGFydDtcblxuICAgICAgICBzdGFydHVwUXVlcmllcy5zZXQoXG4gICAgICAgICAgc2VydmVyRm5OYW1lLFxuICAgICAgICAgIChzdGFydHVwUXVlcmllcy5nZXQoc2VydmVyRm5OYW1lKSB8fCAwKSArIGR1cmF0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGR1cmF0aW9uID4gTUlOX1RSQUNFX0RVUkFUSU9OIHx8IF9ERUJVRykge1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYFJlbmRlcmVyIFNRTCBjaGFubmVsIGpvYiAoJHtmbk5hbWV9KSBjb21wbGV0ZWQgaW4gJHtkdXJhdGlvbn1tc2BcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgam9iSWQgPSBfbWFrZUpvYihmbk5hbWUpO1xuXG4gICAgcmV0dXJuIGNyZWF0ZVRhc2tXaXRoVGltZW91dChcbiAgICAgICgpID0+XG4gICAgICAgIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgaXBjLnNlbmQoU1FMX0NIQU5ORUxfS0VZLCBqb2JJZCwgZm5OYW1lLCAuLi5hcmdzKTtcblxuICAgICAgICAgICAgX3VwZGF0ZUpvYihqb2JJZCwge1xuICAgICAgICAgICAgICByZXNvbHZlLFxuICAgICAgICAgICAgICByZWplY3QsXG4gICAgICAgICAgICAgIGFyZ3M6IF9ERUJVRyA/IGFyZ3MgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgICAgX3JlbW92ZUpvYihqb2JJZCk7XG5cbiAgICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgICAgfVxuICAgICAgICB9KSxcbiAgICAgIGBTUUwgY2hhbm5lbCBqb2IgJHtqb2JJZH0gKCR7Zm5OYW1lfSlgXG4gICAgKSgpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBrZXlzVG9CeXRlcyhrZXlzOiBBcnJheTxzdHJpbmc+LCBkYXRhOiBhbnkpIHtcbiAgY29uc3QgdXBkYXRlZCA9IGNsb25lRGVlcChkYXRhKTtcblxuICBjb25zdCBtYXggPSBrZXlzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGtleSA9IGtleXNbaV07XG4gICAgY29uc3QgdmFsdWUgPSBnZXQoZGF0YSwga2V5KTtcblxuICAgIGlmICh2YWx1ZSkge1xuICAgICAgc2V0KHVwZGF0ZWQsIGtleSwgQnl0ZXMuZnJvbUJhc2U2NCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1cGRhdGVkO1xufVxuXG5mdW5jdGlvbiBrZXlzRnJvbUJ5dGVzKGtleXM6IEFycmF5PHN0cmluZz4sIGRhdGE6IGFueSkge1xuICBjb25zdCB1cGRhdGVkID0gY2xvbmVEZWVwKGRhdGEpO1xuXG4gIGNvbnN0IG1heCA9IGtleXMubGVuZ3RoO1xuICBmb3IgKGxldCBpID0gMDsgaSA8IG1heDsgaSArPSAxKSB7XG4gICAgY29uc3Qga2V5ID0ga2V5c1tpXTtcbiAgICBjb25zdCB2YWx1ZSA9IGdldChkYXRhLCBrZXkpO1xuXG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBzZXQodXBkYXRlZCwga2V5LCBCeXRlcy50b0Jhc2U2NCh2YWx1ZSkpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB1cGRhdGVkO1xufVxuXG4vLyBUb3AtbGV2ZWwgY2FsbHNcblxuYXN5bmMgZnVuY3Rpb24gc2h1dGRvd24oKSB7XG4gIGxvZy5pbmZvKCdDbGllbnQuc2h1dGRvd24nKTtcblxuICAvLyBTdG9wIGFjY2VwdGluZyBuZXcgU1FMIGpvYnMsIGZsdXNoIG91dHN0YW5kaW5nIHF1ZXVlXG4gIGF3YWl0IF9zaHV0ZG93bigpO1xuXG4gIC8vIENsb3NlIGRhdGFiYXNlXG4gIGF3YWl0IGNsb3NlKCk7XG59XG5cbi8vIE5vdGU6IHdpbGwgbmVlZCB0byByZXN0YXJ0IHRoZSBhcHAgYWZ0ZXIgY2FsbGluZyB0aGlzLCB0byBzZXQgdXAgYWZyZXNoXG5hc3luYyBmdW5jdGlvbiBjbG9zZSgpIHtcbiAgYXdhaXQgY2hhbm5lbHMuY2xvc2UoKTtcbn1cblxuLy8gTm90ZTogd2lsbCBuZWVkIHRvIHJlc3RhcnQgdGhlIGFwcCBhZnRlciBjYWxsaW5nIHRoaXMsIHRvIHNldCB1cCBhZnJlc2hcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZURCKCkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVEQigpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVJbmRleGVkREJGaWxlcygpIHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlSW5kZXhlZERCRmlsZXMoKTtcbn1cblxuLy8gSWRlbnRpdHkgS2V5c1xuXG5jb25zdCBJREVOVElUWV9LRVlfS0VZUyA9IFsncHVibGljS2V5J107XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZUlkZW50aXR5S2V5KGRhdGE6IElkZW50aXR5S2V5VHlwZSkge1xuICBjb25zdCB1cGRhdGVkID0ga2V5c0Zyb21CeXRlcyhJREVOVElUWV9LRVlfS0VZUywgZGF0YSk7XG4gIGF3YWl0IGNoYW5uZWxzLmNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkodXBkYXRlZCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRJZGVudGl0eUtleUJ5SWQoaWQ6IElkZW50aXR5S2V5SWRUeXBlKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjaGFubmVscy5nZXRJZGVudGl0eUtleUJ5SWQoaWQpO1xuXG4gIHJldHVybiBrZXlzVG9CeXRlcyhJREVOVElUWV9LRVlfS0VZUywgZGF0YSk7XG59XG5hc3luYyBmdW5jdGlvbiBidWxrQWRkSWRlbnRpdHlLZXlzKGFycmF5OiBBcnJheTxJZGVudGl0eUtleVR5cGU+KSB7XG4gIGNvbnN0IHVwZGF0ZWQgPSBtYXAoYXJyYXksIGRhdGEgPT4ga2V5c0Zyb21CeXRlcyhJREVOVElUWV9LRVlfS0VZUywgZGF0YSkpO1xuICBhd2FpdCBjaGFubmVscy5idWxrQWRkSWRlbnRpdHlLZXlzKHVwZGF0ZWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlSWRlbnRpdHlLZXlCeUlkKGlkOiBJZGVudGl0eUtleUlkVHlwZSkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVJZGVudGl0eUtleUJ5SWQoaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsSWRlbnRpdHlLZXlzKCkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVBbGxJZGVudGl0eUtleXMoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbElkZW50aXR5S2V5cygpIHtcbiAgY29uc3Qga2V5cyA9IGF3YWl0IGNoYW5uZWxzLmdldEFsbElkZW50aXR5S2V5cygpO1xuXG4gIHJldHVybiBrZXlzLm1hcChrZXkgPT4ga2V5c1RvQnl0ZXMoSURFTlRJVFlfS0VZX0tFWVMsIGtleSkpO1xufVxuXG4vLyBQcmUgS2V5c1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVByZUtleShkYXRhOiBQcmVLZXlUeXBlKSB7XG4gIGNvbnN0IHVwZGF0ZWQgPSBrZXlzRnJvbUJ5dGVzKFBSRV9LRVlfS0VZUywgZGF0YSk7XG4gIGF3YWl0IGNoYW5uZWxzLmNyZWF0ZU9yVXBkYXRlUHJlS2V5KHVwZGF0ZWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0UHJlS2V5QnlJZChpZDogUHJlS2V5SWRUeXBlKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjaGFubmVscy5nZXRQcmVLZXlCeUlkKGlkKTtcblxuICByZXR1cm4ga2V5c1RvQnl0ZXMoUFJFX0tFWV9LRVlTLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGJ1bGtBZGRQcmVLZXlzKGFycmF5OiBBcnJheTxQcmVLZXlUeXBlPikge1xuICBjb25zdCB1cGRhdGVkID0gbWFwKGFycmF5LCBkYXRhID0+IGtleXNGcm9tQnl0ZXMoUFJFX0tFWV9LRVlTLCBkYXRhKSk7XG4gIGF3YWl0IGNoYW5uZWxzLmJ1bGtBZGRQcmVLZXlzKHVwZGF0ZWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlUHJlS2V5QnlJZChpZDogUHJlS2V5SWRUeXBlKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZVByZUtleUJ5SWQoaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsUHJlS2V5cygpIHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlQWxsUHJlS2V5cygpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsUHJlS2V5cygpIHtcbiAgY29uc3Qga2V5cyA9IGF3YWl0IGNoYW5uZWxzLmdldEFsbFByZUtleXMoKTtcblxuICByZXR1cm4ga2V5cy5tYXAoa2V5ID0+IGtleXNUb0J5dGVzKFBSRV9LRVlfS0VZUywga2V5KSk7XG59XG5cbi8vIFNpZ25lZCBQcmUgS2V5c1xuXG5jb25zdCBQUkVfS0VZX0tFWVMgPSBbJ3ByaXZhdGVLZXknLCAncHVibGljS2V5J107XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNpZ25lZFByZUtleShkYXRhOiBTaWduZWRQcmVLZXlUeXBlKSB7XG4gIGNvbnN0IHVwZGF0ZWQgPSBrZXlzRnJvbUJ5dGVzKFBSRV9LRVlfS0VZUywgZGF0YSk7XG4gIGF3YWl0IGNoYW5uZWxzLmNyZWF0ZU9yVXBkYXRlU2lnbmVkUHJlS2V5KHVwZGF0ZWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0U2lnbmVkUHJlS2V5QnlJZChpZDogU2lnbmVkUHJlS2V5SWRUeXBlKSB7XG4gIGNvbnN0IGRhdGEgPSBhd2FpdCBjaGFubmVscy5nZXRTaWduZWRQcmVLZXlCeUlkKGlkKTtcblxuICByZXR1cm4ga2V5c1RvQnl0ZXMoUFJFX0tFWV9LRVlTLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFNpZ25lZFByZUtleXMoKSB7XG4gIGNvbnN0IGtleXMgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxTaWduZWRQcmVLZXlzKCk7XG5cbiAgcmV0dXJuIGtleXMubWFwKChrZXk6IFNpZ25lZFByZUtleVR5cGUpID0+IGtleXNUb0J5dGVzKFBSRV9LRVlfS0VZUywga2V5KSk7XG59XG5hc3luYyBmdW5jdGlvbiBidWxrQWRkU2lnbmVkUHJlS2V5cyhhcnJheTogQXJyYXk8U2lnbmVkUHJlS2V5VHlwZT4pIHtcbiAgY29uc3QgdXBkYXRlZCA9IG1hcChhcnJheSwgZGF0YSA9PiBrZXlzRnJvbUJ5dGVzKFBSRV9LRVlfS0VZUywgZGF0YSkpO1xuICBhd2FpdCBjaGFubmVscy5idWxrQWRkU2lnbmVkUHJlS2V5cyh1cGRhdGVkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVNpZ25lZFByZUtleUJ5SWQoaWQ6IFNpZ25lZFByZUtleUlkVHlwZSkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVTaWduZWRQcmVLZXlCeUlkKGlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbFNpZ25lZFByZUtleXMoKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZUFsbFNpZ25lZFByZUtleXMoKTtcbn1cblxuLy8gSXRlbXNcblxuY29uc3QgSVRFTV9LRVlTOiBQYXJ0aWFsPFJlY29yZDxJdGVtS2V5VHlwZSwgQXJyYXk8c3RyaW5nPj4+ID0ge1xuICBzZW5kZXJDZXJ0aWZpY2F0ZTogWyd2YWx1ZS5zZXJpYWxpemVkJ10sXG4gIHNlbmRlckNlcnRpZmljYXRlTm9FMTY0OiBbJ3ZhbHVlLnNlcmlhbGl6ZWQnXSxcbiAgc3Vic2NyaWJlcklkOiBbJ3ZhbHVlJ10sXG4gIHByb2ZpbGVLZXk6IFsndmFsdWUnXSxcbn07XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZUl0ZW08SyBleHRlbmRzIEl0ZW1LZXlUeXBlPihkYXRhOiBJdGVtVHlwZTxLPikge1xuICBjb25zdCB7IGlkIH0gPSBkYXRhO1xuICBpZiAoIWlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2NyZWF0ZU9yVXBkYXRlSXRlbTogUHJvdmlkZWQgZGF0YSBkaWQgbm90IGhhdmUgYSB0cnV0aHkgaWQnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGtleXMgPSBJVEVNX0tFWVNbaWRdO1xuICBjb25zdCB1cGRhdGVkID0gQXJyYXkuaXNBcnJheShrZXlzKSA/IGtleXNGcm9tQnl0ZXMoa2V5cywgZGF0YSkgOiBkYXRhO1xuXG4gIGF3YWl0IGNoYW5uZWxzLmNyZWF0ZU9yVXBkYXRlSXRlbSh1cGRhdGVkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEl0ZW1CeUlkPEsgZXh0ZW5kcyBJdGVtS2V5VHlwZT4oXG4gIGlkOiBLXG4pOiBQcm9taXNlPEl0ZW1UeXBlPEs+IHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IGtleXMgPSBJVEVNX0tFWVNbaWRdO1xuICBjb25zdCBkYXRhID0gYXdhaXQgY2hhbm5lbHMuZ2V0SXRlbUJ5SWQoaWQpO1xuXG4gIHJldHVybiBBcnJheS5pc0FycmF5KGtleXMpID8ga2V5c1RvQnl0ZXMoa2V5cywgZGF0YSkgOiBkYXRhO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsSXRlbXMoKSB7XG4gIGNvbnN0IGl0ZW1zID0gYXdhaXQgY2hhbm5lbHMuZ2V0QWxsSXRlbXMoKTtcblxuICBjb25zdCByZXN1bHQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGZvciAoY29uc3QgaWQgb2YgT2JqZWN0LmtleXMoaXRlbXMpKSB7XG4gICAgY29uc3Qga2V5ID0gaWQgYXMgSXRlbUtleVR5cGU7XG4gICAgY29uc3QgdmFsdWUgPSBpdGVtc1trZXldO1xuXG4gICAgY29uc3Qga2V5cyA9IElURU1fS0VZU1trZXldO1xuXG4gICAgY29uc3QgZGVzZXJpYWxpemVkVmFsdWUgPSBBcnJheS5pc0FycmF5KGtleXMpXG4gICAgICA/IGtleXNUb0J5dGVzKGtleXMsIHsgdmFsdWUgfSkudmFsdWVcbiAgICAgIDogdmFsdWU7XG5cbiAgICByZXN1bHRba2V5XSA9IGRlc2VyaWFsaXplZFZhbHVlO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUl0ZW1CeUlkKGlkOiBJdGVtS2V5VHlwZSkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVJdGVtQnlJZChpZCk7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVBbGxJdGVtcygpIHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlQWxsSXRlbXMoKTtcbn1cblxuLy8gU2VuZGVyIEtleXNcblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVTZW5kZXJLZXkoa2V5OiBTZW5kZXJLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNoYW5uZWxzLmNyZWF0ZU9yVXBkYXRlU2VuZGVyS2V5KGtleSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRTZW5kZXJLZXlCeUlkKFxuICBpZDogU2VuZGVyS2V5SWRUeXBlXG4pOiBQcm9taXNlPFNlbmRlcktleVR5cGUgfCB1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFNlbmRlcktleUJ5SWQoaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsU2VuZGVyS2V5cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlQWxsU2VuZGVyS2V5cygpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsU2VuZGVyS2V5cygpOiBQcm9taXNlPEFycmF5PFNlbmRlcktleVR5cGU+PiB7XG4gIHJldHVybiBjaGFubmVscy5nZXRBbGxTZW5kZXJLZXlzKCk7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVTZW5kZXJLZXlCeUlkKGlkOiBTZW5kZXJLZXlJZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLnJlbW92ZVNlbmRlcktleUJ5SWQoaWQpO1xufVxuXG4vLyBTZW50IFByb3Rvc1xuXG5hc3luYyBmdW5jdGlvbiBpbnNlcnRTZW50UHJvdG8oXG4gIHByb3RvOiBTZW50UHJvdG9UeXBlLFxuICBvcHRpb25zOiB7XG4gICAgbWVzc2FnZUlkczogU2VudE1lc3NhZ2VzVHlwZTtcbiAgICByZWNpcGllbnRzOiBTZW50UmVjaXBpZW50c1R5cGU7XG4gIH1cbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIHJldHVybiBjaGFubmVscy5pbnNlcnRTZW50UHJvdG8ocHJvdG8sIHtcbiAgICAuLi5vcHRpb25zLFxuICAgIG1lc3NhZ2VJZHM6IHVuaXEob3B0aW9ucy5tZXNzYWdlSWRzKSxcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBkZWxldGVTZW50UHJvdG9zT2xkZXJUaGFuKHRpbWVzdGFtcDogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNoYW5uZWxzLmRlbGV0ZVNlbnRQcm90b3NPbGRlclRoYW4odGltZXN0YW1wKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkKG1lc3NhZ2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNoYW5uZWxzLmRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkKG1lc3NhZ2VJZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGluc2VydFByb3RvUmVjaXBpZW50cyhvcHRpb25zOiB7XG4gIGlkOiBudW1iZXI7XG4gIHJlY2lwaWVudFV1aWQ6IHN0cmluZztcbiAgZGV2aWNlSWRzOiBBcnJheTxudW1iZXI+O1xufSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaGFubmVscy5pbnNlcnRQcm90b1JlY2lwaWVudHMob3B0aW9ucyk7XG59XG5hc3luYyBmdW5jdGlvbiBkZWxldGVTZW50UHJvdG9SZWNpcGllbnQoXG4gIG9wdGlvbnM6XG4gICAgfCBEZWxldGVTZW50UHJvdG9SZWNpcGllbnRPcHRpb25zVHlwZVxuICAgIHwgUmVhZG9ubHlBcnJheTxEZWxldGVTZW50UHJvdG9SZWNpcGllbnRPcHRpb25zVHlwZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaGFubmVscy5kZWxldGVTZW50UHJvdG9SZWNpcGllbnQob3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFNlbnRQcm90b0J5UmVjaXBpZW50KG9wdGlvbnM6IHtcbiAgbm93OiBudW1iZXI7XG4gIHJlY2lwaWVudFV1aWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG59KTogUHJvbWlzZTxTZW50UHJvdG9XaXRoTWVzc2FnZUlkc1R5cGUgfCB1bmRlZmluZWQ+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFNlbnRQcm90b0J5UmVjaXBpZW50KG9wdGlvbnMpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsU2VudFByb3RvcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlQWxsU2VudFByb3RvcygpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsU2VudFByb3RvcygpOiBQcm9taXNlPEFycmF5PFNlbnRQcm90b1R5cGU+PiB7XG4gIHJldHVybiBjaGFubmVscy5nZXRBbGxTZW50UHJvdG9zKCk7XG59XG5cbi8vIFRlc3Qtb25seTpcbmFzeW5jIGZ1bmN0aW9uIF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCk6IFByb21pc2U8XG4gIEFycmF5PFNlbnRSZWNpcGllbnRzREJUeXBlPlxuPiB7XG4gIHJldHVybiBjaGFubmVscy5fZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpO1xufVxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKTogUHJvbWlzZTxBcnJheTxTZW50TWVzc2FnZURCVHlwZT4+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLl9nZXRBbGxTZW50UHJvdG9NZXNzYWdlSWRzKCk7XG59XG5cbi8vIFNlc3Npb25zXG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvbihkYXRhOiBTZXNzaW9uVHlwZSkge1xuICBhd2FpdCBjaGFubmVscy5jcmVhdGVPclVwZGF0ZVNlc3Npb24oZGF0YSk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNlc3Npb25zKGFycmF5OiBBcnJheTxTZXNzaW9uVHlwZT4pIHtcbiAgYXdhaXQgY2hhbm5lbHMuY3JlYXRlT3JVcGRhdGVTZXNzaW9ucyhhcnJheSk7XG59XG5hc3luYyBmdW5jdGlvbiBjb21taXREZWNyeXB0UmVzdWx0KG9wdGlvbnM6IHtcbiAgc2VuZGVyS2V5czogQXJyYXk8U2VuZGVyS2V5VHlwZT47XG4gIHNlc3Npb25zOiBBcnJheTxTZXNzaW9uVHlwZT47XG4gIHVucHJvY2Vzc2VkOiBBcnJheTxVbnByb2Nlc3NlZFR5cGU+O1xufSkge1xuICBhd2FpdCBjaGFubmVscy5jb21taXREZWNyeXB0UmVzdWx0KG9wdGlvbnMpO1xufVxuYXN5bmMgZnVuY3Rpb24gYnVsa0FkZFNlc3Npb25zKGFycmF5OiBBcnJheTxTZXNzaW9uVHlwZT4pIHtcbiAgYXdhaXQgY2hhbm5lbHMuYnVsa0FkZFNlc3Npb25zKGFycmF5KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVNlc3Npb25CeUlkKGlkOiBTZXNzaW9uSWRUeXBlKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZVNlc3Npb25CeUlkKGlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlU2Vzc2lvbnNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZDogc3RyaW5nKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZVNlc3Npb25zQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsU2Vzc2lvbnMoKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZUFsbFNlc3Npb25zKCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRBbGxTZXNzaW9ucygpIHtcbiAgY29uc3Qgc2Vzc2lvbnMgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxTZXNzaW9ucygpO1xuXG4gIHJldHVybiBzZXNzaW9ucztcbn1cblxuLy8gQ29udmVyc2F0aW9uXG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnZlcnNhdGlvbkNvdW50KCkge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0Q29udmVyc2F0aW9uQ291bnQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZUNvbnZlcnNhdGlvbihkYXRhOiBDb252ZXJzYXRpb25UeXBlKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnNhdmVDb252ZXJzYXRpb24oZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVDb252ZXJzYXRpb25zKGFycmF5OiBBcnJheTxDb252ZXJzYXRpb25UeXBlPikge1xuICBhd2FpdCBjaGFubmVscy5zYXZlQ29udmVyc2F0aW9ucyhhcnJheSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnZlcnNhdGlvbkJ5SWQoaWQ6IHN0cmluZykge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0Q29udmVyc2F0aW9uQnlJZChpZCk7XG59XG5cbmNvbnN0IHVwZGF0ZUNvbnZlcnNhdGlvbkJhdGNoZXIgPSBjcmVhdGVCYXRjaGVyPENvbnZlcnNhdGlvblR5cGU+KHtcbiAgbmFtZTogJ3NxbC5DbGllbnQudXBkYXRlQ29udmVyc2F0aW9uQmF0Y2hlcicsXG4gIHdhaXQ6IDUwMCxcbiAgbWF4U2l6ZTogMjAsXG4gIHByb2Nlc3NCYXRjaDogYXN5bmMgKGl0ZW1zOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPikgPT4ge1xuICAgIC8vIFdlIG9ubHkgY2FyZSBhYm91dCB0aGUgbW9zdCByZWNlbnQgdXBkYXRlIGZvciBlYWNoIGNvbnZlcnNhdGlvblxuICAgIGNvbnN0IGJ5SWQgPSBncm91cEJ5KGl0ZW1zLCBpdGVtID0+IGl0ZW0uaWQpO1xuICAgIGNvbnN0IGlkcyA9IE9iamVjdC5rZXlzKGJ5SWQpO1xuICAgIGNvbnN0IG1vc3RSZWNlbnQgPSBpZHMubWFwKChpZDogc3RyaW5nKTogQ29udmVyc2F0aW9uVHlwZSA9PiB7XG4gICAgICBjb25zdCBtYXliZUxhc3QgPSBsYXN0KGJ5SWRbaWRdKTtcbiAgICAgIGFzc2VydChtYXliZUxhc3QgIT09IHVuZGVmaW5lZCwgJ0VtcHR5IGFycmF5IGluIGBncm91cEJ5YCByZXN1bHQnKTtcbiAgICAgIHJldHVybiBtYXliZUxhc3Q7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb25zKG1vc3RSZWNlbnQpO1xuICB9LFxufSk7XG5cbmZ1bmN0aW9uIHVwZGF0ZUNvbnZlcnNhdGlvbihkYXRhOiBDb252ZXJzYXRpb25UeXBlKSB7XG4gIHVwZGF0ZUNvbnZlcnNhdGlvbkJhdGNoZXIuYWRkKGRhdGEpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVDb252ZXJzYXRpb25zKGFycmF5OiBBcnJheTxDb252ZXJzYXRpb25UeXBlPikge1xuICBjb25zdCB7IGNsZWFuZWQsIHBhdGhzQ2hhbmdlZCB9ID0gY2xlYW5EYXRhRm9ySXBjKGFycmF5KTtcbiAgYXNzZXJ0KFxuICAgICFwYXRoc0NoYW5nZWQubGVuZ3RoLFxuICAgIGBQYXRocyB3ZXJlIGNsZWFuZWQ6ICR7SlNPTi5zdHJpbmdpZnkocGF0aHNDaGFuZ2VkKX1gXG4gICk7XG4gIGF3YWl0IGNoYW5uZWxzLnVwZGF0ZUNvbnZlcnNhdGlvbnMoY2xlYW5lZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUNvbnZlcnNhdGlvbihpZDogc3RyaW5nKSB7XG4gIGNvbnN0IGV4aXN0aW5nID0gYXdhaXQgZ2V0Q29udmVyc2F0aW9uQnlJZChpZCk7XG5cbiAgLy8gTm90ZTogSXQncyBpbXBvcnRhbnQgdG8gaGF2ZSBhIGZ1bGx5IGRhdGFiYXNlLWh5ZHJhdGVkIG1vZGVsIHRvIGRlbGV0ZSBoZXJlIGJlY2F1c2VcbiAgLy8gICBpdCBuZWVkcyB0byBkZWxldGUgYWxsIGFzc29jaWF0ZWQgb24tZGlzayBmaWxlcyBhbG9uZyB3aXRoIHRoZSBkYXRhYmFzZSBkZWxldGUuXG4gIGlmIChleGlzdGluZykge1xuICAgIGF3YWl0IGNoYW5uZWxzLnJlbW92ZUNvbnZlcnNhdGlvbihpZCk7XG4gICAgYXdhaXQgZGVsZXRlRXh0ZXJuYWxGaWxlcyhleGlzdGluZywge1xuICAgICAgZGVsZXRlQXR0YWNobWVudERhdGE6IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdHRhY2htZW50RGF0YSxcbiAgICB9KTtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBlcmFzZVN0b3JhZ2VTZXJ2aWNlU3RhdGVGcm9tQ29udmVyc2F0aW9ucygpIHtcbiAgYXdhaXQgY2hhbm5lbHMuZXJhc2VTdG9yYWdlU2VydmljZVN0YXRlRnJvbUNvbnZlcnNhdGlvbnMoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQ29udmVyc2F0aW9ucygpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldEFsbENvbnZlcnNhdGlvbnMoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQ29udmVyc2F0aW9uSWRzKCkge1xuICBjb25zdCBpZHMgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxDb252ZXJzYXRpb25JZHMoKTtcblxuICByZXR1cm4gaWRzO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxHcm91cHNJbnZvbHZpbmdVdWlkKHV1aWQ6IFVVSURTdHJpbmdUeXBlKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRBbGxHcm91cHNJbnZvbHZpbmdVdWlkKHV1aWQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVTZWFyY2hNZXNzYWdlSlNPTihcbiAgbWVzc2FnZXM6IEFycmF5PFNlcnZlclNlYXJjaFJlc3VsdE1lc3NhZ2VUeXBlPlxuKTogQXJyYXk8Q2xpZW50U2VhcmNoUmVzdWx0TWVzc2FnZVR5cGU+IHtcbiAgcmV0dXJuIG1lc3NhZ2VzLm1hcChtZXNzYWdlID0+ICh7XG4gICAganNvbjogbWVzc2FnZS5qc29uLFxuXG4gICAgLy8gRW1wdHkgYXJyYXkgaXMgYSBkZWZhdWx0IHZhbHVlLiBgbWVzc2FnZS5qc29uYCBoYXMgdGhlIHJlYWwgZmllbGRcbiAgICBib2R5UmFuZ2VzOiBbXSxcblxuICAgIC4uLkpTT04ucGFyc2UobWVzc2FnZS5qc29uKSxcbiAgICBzbmlwcGV0OiBtZXNzYWdlLnNuaXBwZXQsXG4gIH0pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VhcmNoTWVzc2FnZXMoXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIHsgbGltaXQgfTogeyBsaW1pdD86IG51bWJlciB9ID0ge31cbikge1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGNoYW5uZWxzLnNlYXJjaE1lc3NhZ2VzKHF1ZXJ5LCB7IGxpbWl0IH0pO1xuXG4gIHJldHVybiBoYW5kbGVTZWFyY2hNZXNzYWdlSlNPTihtZXNzYWdlcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaE1lc3NhZ2VzSW5Db252ZXJzYXRpb24oXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHsgbGltaXQgfTogeyBsaW1pdD86IG51bWJlciB9ID0ge31cbikge1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGNoYW5uZWxzLnNlYXJjaE1lc3NhZ2VzSW5Db252ZXJzYXRpb24oXG4gICAgcXVlcnksXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgeyBsaW1pdCB9XG4gICk7XG5cbiAgcmV0dXJuIGhhbmRsZVNlYXJjaE1lc3NhZ2VKU09OKG1lc3NhZ2VzKTtcbn1cblxuLy8gTWVzc2FnZVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlQ291bnQoY29udmVyc2F0aW9uSWQ/OiBzdHJpbmcpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldE1lc3NhZ2VDb3VudChjb252ZXJzYXRpb25JZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0b3J5Q291bnQoY29udmVyc2F0aW9uSWQ6IHN0cmluZykge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0U3RvcnlDb3VudChjb252ZXJzYXRpb25JZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVNZXNzYWdlKFxuICBkYXRhOiBNZXNzYWdlVHlwZSxcbiAgb3B0aW9uczoge1xuICAgIGpvYlRvSW5zZXJ0PzogUmVhZG9ubHk8U3RvcmVkSm9iPjtcbiAgICBmb3JjZVNhdmU/OiBib29sZWFuO1xuICAgIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB9XG4pIHtcbiAgY29uc3QgaWQgPSBhd2FpdCBjaGFubmVscy5zYXZlTWVzc2FnZShfY2xlYW5NZXNzYWdlRGF0YShkYXRhKSwge1xuICAgIC4uLm9wdGlvbnMsXG4gICAgam9iVG9JbnNlcnQ6IG9wdGlvbnMuam9iVG9JbnNlcnQgJiYgZm9ybWF0Sm9iRm9ySW5zZXJ0KG9wdGlvbnMuam9iVG9JbnNlcnQpLFxuICB9KTtcblxuICBleHBpcmluZ01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlLnVwZGF0ZSgpO1xuICB0YXBUb1ZpZXdNZXNzYWdlc0RlbGV0aW9uU2VydmljZS51cGRhdGUoKTtcblxuICByZXR1cm4gaWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVNZXNzYWdlcyhcbiAgYXJyYXlPZk1lc3NhZ2VzOiBSZWFkb25seUFycmF5PE1lc3NhZ2VUeXBlPixcbiAgb3B0aW9uczogeyBmb3JjZVNhdmU/OiBib29sZWFuOyBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZSB9XG4pIHtcbiAgYXdhaXQgY2hhbm5lbHMuc2F2ZU1lc3NhZ2VzKFxuICAgIGFycmF5T2ZNZXNzYWdlcy5tYXAobWVzc2FnZSA9PiBfY2xlYW5NZXNzYWdlRGF0YShtZXNzYWdlKSksXG4gICAgb3B0aW9uc1xuICApO1xuXG4gIGV4cGlyaW5nTWVzc2FnZXNEZWxldGlvblNlcnZpY2UudXBkYXRlKCk7XG4gIHRhcFRvVmlld01lc3NhZ2VzRGVsZXRpb25TZXJ2aWNlLnVwZGF0ZSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVNZXNzYWdlKGlkOiBzdHJpbmcpIHtcbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKGlkKTtcblxuICAvLyBOb3RlOiBJdCdzIGltcG9ydGFudCB0byBoYXZlIGEgZnVsbHkgZGF0YWJhc2UtaHlkcmF0ZWQgbW9kZWwgdG8gZGVsZXRlIGhlcmUgYmVjYXVzZVxuICAvLyAgIGl0IG5lZWRzIHRvIGRlbGV0ZSBhbGwgYXNzb2NpYXRlZCBvbi1kaXNrIGZpbGVzIGFsb25nIHdpdGggdGhlIGRhdGFiYXNlIGRlbGV0ZS5cbiAgaWYgKG1lc3NhZ2UpIHtcbiAgICBhd2FpdCBjaGFubmVscy5yZW1vdmVNZXNzYWdlKGlkKTtcbiAgICBhd2FpdCBjbGVhbnVwTWVzc2FnZShtZXNzYWdlKTtcbiAgfVxufVxuXG4vLyBOb3RlOiB0aGlzIG1ldGhvZCB3aWxsIG5vdCBjbGVhbiB1cCBleHRlcm5hbCBmaWxlcywganVzdCBkZWxldGUgZnJvbSBTUUxcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZU1lc3NhZ2VzKGlkczogQXJyYXk8c3RyaW5nPikge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVNZXNzYWdlcyhpZHMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlQnlJZChpZDogc3RyaW5nKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRNZXNzYWdlQnlJZChpZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VzQnlJZChtZXNzYWdlSWRzOiBBcnJheTxzdHJpbmc+KSB7XG4gIGlmICghbWVzc2FnZUlkcy5sZW5ndGgpIHtcbiAgICByZXR1cm4gW107XG4gIH1cbiAgcmV0dXJuIGNoYW5uZWxzLmdldE1lc3NhZ2VzQnlJZChtZXNzYWdlSWRzKTtcbn1cblxuLy8gRm9yIHRlc3Rpbmcgb25seVxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbE1lc3NhZ2VzKCkge1xuICByZXR1cm4gY2hhbm5lbHMuX2dldEFsbE1lc3NhZ2VzKCk7XG59XG5hc3luYyBmdW5jdGlvbiBfcmVtb3ZlQWxsTWVzc2FnZXMoKSB7XG4gIGF3YWl0IGNoYW5uZWxzLl9yZW1vdmVBbGxNZXNzYWdlcygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxNZXNzYWdlSWRzKCkge1xuICBjb25zdCBpZHMgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxNZXNzYWdlSWRzKCk7XG5cbiAgcmV0dXJuIGlkcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZUJ5U2VuZGVyKHtcbiAgc291cmNlLFxuICBzb3VyY2VVdWlkLFxuICBzb3VyY2VEZXZpY2UsXG4gIHNlbnRfYXQsXG59OiB7XG4gIHNvdXJjZTogc3RyaW5nO1xuICBzb3VyY2VVdWlkOiBzdHJpbmc7XG4gIHNvdXJjZURldmljZTogbnVtYmVyO1xuICBzZW50X2F0OiBudW1iZXI7XG59KSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRNZXNzYWdlQnlTZW5kZXIoe1xuICAgIHNvdXJjZSxcbiAgICBzb3VyY2VVdWlkLFxuICAgIHNvdXJjZURldmljZSxcbiAgICBzZW50X2F0LFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHtcbiAgICBzdG9yeUlkOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZDtcbiAgICBpc0dyb3VwOiBib29sZWFuO1xuICB9XG4pIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFRvdGFsVW5yZWFkRm9yQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCBvcHRpb25zKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VW5yZWFkQnlDb252ZXJzYXRpb25BbmRNYXJrUmVhZChvcHRpb25zOiB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGlzR3JvdXA/OiBib29sZWFuO1xuICBuZXdlc3RVbnJlYWRBdDogbnVtYmVyO1xuICByZWFkQXQ/OiBudW1iZXI7XG4gIHN0b3J5SWQ/OiBVVUlEU3RyaW5nVHlwZTtcbn0pIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFVucmVhZEJ5Q29udmVyc2F0aW9uQW5kTWFya1JlYWQob3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVucmVhZFJlYWN0aW9uc0FuZE1hcmtSZWFkKG9wdGlvbnM6IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgbmV3ZXN0VW5yZWFkQXQ6IG51bWJlcjtcbiAgc3RvcnlJZD86IFVVSURTdHJpbmdUeXBlO1xufSkge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0VW5yZWFkUmVhY3Rpb25zQW5kTWFya1JlYWQob3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1hcmtSZWFjdGlvbkFzUmVhZChcbiAgdGFyZ2V0QXV0aG9yVXVpZDogc3RyaW5nLFxuICB0YXJnZXRUaW1lc3RhbXA6IG51bWJlclxuKSB7XG4gIHJldHVybiBjaGFubmVscy5tYXJrUmVhY3Rpb25Bc1JlYWQodGFyZ2V0QXV0aG9yVXVpZCwgdGFyZ2V0VGltZXN0YW1wKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlUmVhY3Rpb25Gcm9tQ29udmVyc2F0aW9uKHJlYWN0aW9uOiB7XG4gIGVtb2ppOiBzdHJpbmc7XG4gIGZyb21JZDogc3RyaW5nO1xuICB0YXJnZXRBdXRob3JVdWlkOiBzdHJpbmc7XG4gIHRhcmdldFRpbWVzdGFtcDogbnVtYmVyO1xufSkge1xuICByZXR1cm4gY2hhbm5lbHMucmVtb3ZlUmVhY3Rpb25Gcm9tQ29udmVyc2F0aW9uKHJlYWN0aW9uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkUmVhY3Rpb24ocmVhY3Rpb25PYmo6IFJlYWN0aW9uVHlwZSkge1xuICByZXR1cm4gY2hhbm5lbHMuYWRkUmVhY3Rpb24ocmVhY3Rpb25PYmopO1xufVxuXG5hc3luYyBmdW5jdGlvbiBfZ2V0QWxsUmVhY3Rpb25zKCkge1xuICByZXR1cm4gY2hhbm5lbHMuX2dldEFsbFJlYWN0aW9ucygpO1xufVxuYXN5bmMgZnVuY3Rpb24gX3JlbW92ZUFsbFJlYWN0aW9ucygpIHtcbiAgYXdhaXQgY2hhbm5lbHMuX3JlbW92ZUFsbFJlYWN0aW9ucygpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVNZXNzYWdlSlNPTihcbiAgbWVzc2FnZXM6IEFycmF5PE1lc3NhZ2VUeXBlVW5oeWRyYXRlZD5cbik6IEFycmF5PE1lc3NhZ2VUeXBlPiB7XG4gIHJldHVybiBtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiBKU09OLnBhcnNlKG1lc3NhZ2UuanNvbikpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHtcbiAgICBpc0dyb3VwLFxuICAgIGxpbWl0ID0gMTAwLFxuICAgIG1lc3NhZ2VJZCxcbiAgICByZWNlaXZlZEF0ID0gTnVtYmVyLk1BWF9WQUxVRSxcbiAgICBzZW50QXQgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIHN0b3J5SWQsXG4gIH06IHtcbiAgICBpc0dyb3VwOiBib29sZWFuO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIG1lc3NhZ2VJZD86IHN0cmluZztcbiAgICByZWNlaXZlZEF0PzogbnVtYmVyO1xuICAgIHNlbnRBdD86IG51bWJlcjtcbiAgICBzdG9yeUlkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIH1cbikge1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGNoYW5uZWxzLmdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICB7XG4gICAgICBpc0dyb3VwLFxuICAgICAgbGltaXQsXG4gICAgICByZWNlaXZlZEF0LFxuICAgICAgc2VudEF0LFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgc3RvcnlJZCxcbiAgICB9XG4gICk7XG5cbiAgcmV0dXJuIGhhbmRsZU1lc3NhZ2VKU09OKG1lc3NhZ2VzKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldE9sZGVyU3RvcmllcyhvcHRpb25zOiB7XG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBsaW1pdD86IG51bWJlcjtcbiAgcmVjZWl2ZWRBdD86IG51bWJlcjtcbiAgc2VudEF0PzogbnVtYmVyO1xuICBzb3VyY2VVdWlkPzogc3RyaW5nO1xufSk6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGU+PiB7XG4gIHJldHVybiBjaGFubmVscy5nZXRPbGRlclN0b3JpZXMob3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAge1xuICAgIGlzR3JvdXAsXG4gICAgbGltaXQgPSAxMDAsXG4gICAgcmVjZWl2ZWRBdCA9IDAsXG4gICAgc2VudEF0ID0gMCxcbiAgICBzdG9yeUlkLFxuICB9OiB7XG4gICAgaXNHcm91cDogYm9vbGVhbjtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICByZWNlaXZlZEF0PzogbnVtYmVyO1xuICAgIHNlbnRBdD86IG51bWJlcjtcbiAgICBzdG9yeUlkOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZDtcbiAgfVxuKSB7XG4gIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgY2hhbm5lbHMuZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKFxuICAgIGNvbnZlcnNhdGlvbklkLFxuICAgIHtcbiAgICAgIGlzR3JvdXAsXG4gICAgICBsaW1pdCxcbiAgICAgIHJlY2VpdmVkQXQsXG4gICAgICBzZW50QXQsXG4gICAgICBzdG9yeUlkLFxuICAgIH1cbiAgKTtcblxuICByZXR1cm4gaGFuZGxlTWVzc2FnZUpTT04obWVzc2FnZXMpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzKHtcbiAgY29udmVyc2F0aW9uSWQsXG4gIGlzR3JvdXAsXG4gIG91clV1aWQsXG59OiB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGlzR3JvdXA/OiBib29sZWFuO1xuICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZTtcbn0pOiBQcm9taXNlPENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0c1R5cGU+IHtcbiAgY29uc3QgeyBwcmV2aWV3LCBhY3Rpdml0eSwgaGFzVXNlckluaXRpYXRlZE1lc3NhZ2VzIH0gPVxuICAgIGF3YWl0IGNoYW5uZWxzLmdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGlzR3JvdXAsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuXG4gIHJldHVybiB7XG4gICAgcHJldmlldyxcbiAgICBhY3Rpdml0eSxcbiAgICBoYXNVc2VySW5pdGlhdGVkTWVzc2FnZXMsXG4gIH07XG59XG5hc3luYyBmdW5jdGlvbiBnZXRMYXN0Q29udmVyc2F0aW9uTWVzc2FnZSh7XG4gIGNvbnZlcnNhdGlvbklkLFxufToge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xufSkge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0TGFzdENvbnZlcnNhdGlvbk1lc3NhZ2UoeyBjb252ZXJzYXRpb25JZCB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VNZXRyaWNzRm9yQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBzdG9yeUlkPzogVVVJRFN0cmluZ1R5cGUsXG4gIGlzR3JvdXA/OiBib29sZWFuXG4pIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hhbm5lbHMuZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb24oXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgc3RvcnlJZCxcbiAgICBpc0dyb3VwXG4gICk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldENvbnZlcnNhdGlvblJhbmdlQ2VudGVyZWRPbk1lc3NhZ2Uob3B0aW9uczoge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBpc0dyb3VwOiBib29sZWFuO1xuICBsaW1pdD86IG51bWJlcjtcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIHJlY2VpdmVkQXQ6IG51bWJlcjtcbiAgc2VudEF0PzogbnVtYmVyO1xuICBzdG9yeUlkOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZDtcbn0pIHtcbiAgY29uc3QgcmVzdWx0ID0gYXdhaXQgY2hhbm5lbHMuZ2V0Q29udmVyc2F0aW9uUmFuZ2VDZW50ZXJlZE9uTWVzc2FnZShvcHRpb25zKTtcblxuICByZXR1cm4ge1xuICAgIC4uLnJlc3VsdCxcbiAgICBvbGRlcjogaGFuZGxlTWVzc2FnZUpTT04ocmVzdWx0Lm9sZGVyKSxcbiAgICBuZXdlcjogaGFuZGxlTWVzc2FnZUpTT04ocmVzdWx0Lm5ld2VyKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaGFzR3JvdXBDYWxsSGlzdG9yeU1lc3NhZ2UoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGVyYUlkOiBzdHJpbmdcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICByZXR1cm4gY2hhbm5lbHMuaGFzR3JvdXBDYWxsSGlzdG9yeU1lc3NhZ2UoY29udmVyc2F0aW9uSWQsIGVyYUlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIG1pZ3JhdGVDb252ZXJzYXRpb25NZXNzYWdlcyhcbiAgb2Jzb2xldGVJZDogc3RyaW5nLFxuICBjdXJyZW50SWQ6IHN0cmluZ1xuKSB7XG4gIGF3YWl0IGNoYW5uZWxzLm1pZ3JhdGVDb252ZXJzYXRpb25NZXNzYWdlcyhvYnNvbGV0ZUlkLCBjdXJyZW50SWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVBbGxNZXNzYWdlc0luQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICB7XG4gICAgbG9nSWQsXG4gIH06IHtcbiAgICBsb2dJZDogc3RyaW5nO1xuICB9XG4pIHtcbiAgbGV0IG1lc3NhZ2VzO1xuICBkbyB7XG4gICAgY29uc3QgY2h1bmtTaXplID0gMjA7XG4gICAgbG9nLmluZm8oXG4gICAgICBgcmVtb3ZlQWxsTWVzc2FnZXNJbkNvbnZlcnNhdGlvbi8ke2xvZ0lkfTogRmV0Y2hpbmcgY2h1bmsgb2YgJHtjaHVua1NpemV9IG1lc3NhZ2VzYFxuICAgICk7XG4gICAgLy8gWWVzLCB3ZSByZWFsbHkgd2FudCB0aGUgYXdhaXQgaW4gdGhlIGxvb3AuIFdlJ3JlIGRlbGV0aW5nIGEgY2h1bmsgYXQgYVxuICAgIC8vICAgdGltZSBzbyB3ZSBkb24ndCB1c2UgdG9vIG11Y2ggbWVtb3J5LlxuICAgIG1lc3NhZ2VzID0gYXdhaXQgZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgICBsaW1pdDogY2h1bmtTaXplLFxuICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICB9KTtcblxuICAgIGlmICghbWVzc2FnZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaWRzID0gbWVzc2FnZXMubWFwKG1lc3NhZ2UgPT4gbWVzc2FnZS5pZCk7XG5cbiAgICBsb2cuaW5mbyhgcmVtb3ZlQWxsTWVzc2FnZXNJbkNvbnZlcnNhdGlvbi8ke2xvZ0lkfTogQ2xlYW51cC4uLmApO1xuICAgIC8vIE5vdGU6IEl0J3MgdmVyeSBpbXBvcnRhbnQgdGhhdCB0aGVzZSBtb2RlbHMgYXJlIGZ1bGx5IGh5ZHJhdGVkIGJlY2F1c2VcbiAgICAvLyAgIHdlIG5lZWQgdG8gZGVsZXRlIGFsbCBhc3NvY2lhdGVkIG9uLWRpc2sgZmlsZXMgYWxvbmcgd2l0aCB0aGUgZGF0YWJhc2UgZGVsZXRlLlxuICAgIGNvbnN0IHF1ZXVlID0gbmV3IHdpbmRvdy5QUXVldWUoeyBjb25jdXJyZW5jeTogMywgdGltZW91dDogMTAwMCAqIDYwICogMiB9KTtcbiAgICBxdWV1ZS5hZGRBbGwoXG4gICAgICBtZXNzYWdlcy5tYXAoXG4gICAgICAgIChtZXNzYWdlOiBNZXNzYWdlVHlwZSkgPT4gYXN5bmMgKCkgPT4gY2xlYW51cE1lc3NhZ2UobWVzc2FnZSlcbiAgICAgIClcbiAgICApO1xuICAgIGF3YWl0IHF1ZXVlLm9uSWRsZSgpO1xuXG4gICAgbG9nLmluZm8oYHJlbW92ZUFsbE1lc3NhZ2VzSW5Db252ZXJzYXRpb24vJHtsb2dJZH06IERlbGV0aW5nLi4uYCk7XG4gICAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlTWVzc2FnZXMoaWRzKTtcbiAgfSB3aGlsZSAobWVzc2FnZXMubGVuZ3RoID4gMCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VzQnlTZW50QXQoc2VudEF0OiBudW1iZXIpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldE1lc3NhZ2VzQnlTZW50QXQoc2VudEF0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0RXhwaXJlZE1lc3NhZ2VzKCkge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0RXhwaXJlZE1lc3NhZ2VzKCk7XG59XG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2VzVW5leHBlY3RlZGx5TWlzc2luZ0V4cGlyYXRpb25TdGFydFRpbWVzdGFtcCgpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldE1lc3NhZ2VzVW5leHBlY3RlZGx5TWlzc2luZ0V4cGlyYXRpb25TdGFydFRpbWVzdGFtcCgpO1xufVxuXG5mdW5jdGlvbiBnZXRTb29uZXN0TWVzc2FnZUV4cGlyeSgpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFNvb25lc3RNZXNzYWdlRXhwaXJ5KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE5leHRUYXBUb1ZpZXdNZXNzYWdlVGltZXN0YW1wVG9BZ2VPdXQoKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXROZXh0VGFwVG9WaWV3TWVzc2FnZVRpbWVzdGFtcFRvQWdlT3V0KCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRUYXBUb1ZpZXdNZXNzYWdlc05lZWRpbmdFcmFzZSgpIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldFRhcFRvVmlld01lc3NhZ2VzTmVlZGluZ0VyYXNlKCk7XG59XG5cbi8vIFVucHJvY2Vzc2VkXG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVucHJvY2Vzc2VkQ291bnQoKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRVbnByb2Nlc3NlZENvdW50KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFVucHJvY2Vzc2VkQW5kSW5jcmVtZW50QXR0ZW1wdHMoKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVucHJvY2Vzc2VkQnlJZChpZDogc3RyaW5nKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRVbnByb2Nlc3NlZEJ5SWQoaWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhKFxuICBpZDogc3RyaW5nLFxuICBkYXRhOiBVbnByb2Nlc3NlZFVwZGF0ZVR5cGVcbikge1xuICBhd2FpdCBjaGFubmVscy51cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhKGlkLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVVucHJvY2Vzc2Vkc1dpdGhEYXRhKFxuICBhcnJheTogQXJyYXk8eyBpZDogc3RyaW5nOyBkYXRhOiBVbnByb2Nlc3NlZFVwZGF0ZVR5cGUgfT5cbikge1xuICBhd2FpdCBjaGFubmVscy51cGRhdGVVbnByb2Nlc3NlZHNXaXRoRGF0YShhcnJheSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVVucHJvY2Vzc2VkKGlkOiBzdHJpbmcgfCBBcnJheTxzdHJpbmc+KSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZVVucHJvY2Vzc2VkKGlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsVW5wcm9jZXNzZWQoKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnJlbW92ZUFsbFVucHJvY2Vzc2VkKCk7XG59XG5cbi8vIEF0dGFjaG1lbnQgZG93bmxvYWRzXG5cbmFzeW5jIGZ1bmN0aW9uIGdldEF0dGFjaG1lbnREb3dubG9hZEpvYkJ5SWQoaWQ6IHN0cmluZykge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0QXR0YWNobWVudERvd25sb2FkSm9iQnlJZChpZCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXROZXh0QXR0YWNobWVudERvd25sb2FkSm9icyhcbiAgbGltaXQ/OiBudW1iZXIsXG4gIG9wdGlvbnM/OiB7IHRpbWVzdGFtcD86IG51bWJlciB9XG4pIHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldE5leHRBdHRhY2htZW50RG93bmxvYWRKb2JzKGxpbWl0LCBvcHRpb25zKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNhdmVBdHRhY2htZW50RG93bmxvYWRKb2Ioam9iOiBBdHRhY2htZW50RG93bmxvYWRKb2JUeXBlKSB7XG4gIGF3YWl0IGNoYW5uZWxzLnNhdmVBdHRhY2htZW50RG93bmxvYWRKb2IoX2NsZWFuRGF0YShqb2IpKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldEF0dGFjaG1lbnREb3dubG9hZEpvYlBlbmRpbmcoaWQ6IHN0cmluZywgcGVuZGluZzogYm9vbGVhbikge1xuICBhd2FpdCBjaGFubmVscy5zZXRBdHRhY2htZW50RG93bmxvYWRKb2JQZW5kaW5nKGlkLCBwZW5kaW5nKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlc2V0QXR0YWNobWVudERvd25sb2FkUGVuZGluZygpIHtcbiAgYXdhaXQgY2hhbm5lbHMucmVzZXRBdHRhY2htZW50RG93bmxvYWRQZW5kaW5nKCk7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVBdHRhY2htZW50RG93bmxvYWRKb2IoaWQ6IHN0cmluZykge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVBdHRhY2htZW50RG93bmxvYWRKb2IoaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsQXR0YWNobWVudERvd25sb2FkSm9icygpIHtcbiAgYXdhaXQgY2hhbm5lbHMucmVtb3ZlQWxsQXR0YWNobWVudERvd25sb2FkSm9icygpO1xufVxuXG4vLyBTdGlja2Vyc1xuXG5hc3luYyBmdW5jdGlvbiBnZXRTdGlja2VyQ291bnQoKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRTdGlja2VyQ291bnQoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVTdGlja2VyUGFjayhwYWNrOiBTdGlja2VyUGFja1R5cGUpIHtcbiAgYXdhaXQgY2hhbm5lbHMuY3JlYXRlT3JVcGRhdGVTdGlja2VyUGFjayhwYWNrKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN0aWNrZXJQYWNrU3RhdHVzKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgc3RhdHVzOiBTdGlja2VyUGFja1N0YXR1c1R5cGUsXG4gIG9wdGlvbnM/OiB7IHRpbWVzdGFtcDogbnVtYmVyIH1cbikge1xuICBhd2FpdCBjaGFubmVscy51cGRhdGVTdGlja2VyUGFja1N0YXR1cyhwYWNrSWQsIHN0YXR1cywgb3B0aW9ucyk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVN0aWNrZXIoc3RpY2tlcjogU3RpY2tlclR5cGUpIHtcbiAgYXdhaXQgY2hhbm5lbHMuY3JlYXRlT3JVcGRhdGVTdGlja2VyKHN0aWNrZXIpO1xufVxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU3RpY2tlckxhc3RVc2VkKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgc3RpY2tlcklkOiBudW1iZXIsXG4gIHRpbWVzdGFtcDogbnVtYmVyXG4pIHtcbiAgYXdhaXQgY2hhbm5lbHMudXBkYXRlU3RpY2tlckxhc3RVc2VkKHBhY2tJZCwgc3RpY2tlcklkLCB0aW1lc3RhbXApO1xufVxuYXN5bmMgZnVuY3Rpb24gYWRkU3RpY2tlclBhY2tSZWZlcmVuY2UobWVzc2FnZUlkOiBzdHJpbmcsIHBhY2tJZDogc3RyaW5nKSB7XG4gIGF3YWl0IGNoYW5uZWxzLmFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlKG1lc3NhZ2VJZCwgcGFja0lkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVN0aWNrZXJQYWNrUmVmZXJlbmNlKG1lc3NhZ2VJZDogc3RyaW5nLCBwYWNrSWQ6IHN0cmluZykge1xuICByZXR1cm4gY2hhbm5lbHMuZGVsZXRlU3RpY2tlclBhY2tSZWZlcmVuY2UobWVzc2FnZUlkLCBwYWNrSWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU3RpY2tlclBhY2socGFja0lkOiBzdHJpbmcpIHtcbiAgY29uc3QgcGF0aHMgPSBhd2FpdCBjaGFubmVscy5kZWxldGVTdGlja2VyUGFjayhwYWNrSWQpO1xuXG4gIHJldHVybiBwYXRocztcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFN0aWNrZXJQYWNrcygpIHtcbiAgY29uc3QgcGFja3MgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxTdGlja2VyUGFja3MoKTtcblxuICByZXR1cm4gcGFja3M7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRBbGxTdGlja2VycygpIHtcbiAgY29uc3Qgc3RpY2tlcnMgPSBhd2FpdCBjaGFubmVscy5nZXRBbGxTdGlja2VycygpO1xuXG4gIHJldHVybiBzdGlja2Vycztcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFJlY2VudFN0aWNrZXJzKCkge1xuICBjb25zdCByZWNlbnRTdGlja2VycyA9IGF3YWl0IGNoYW5uZWxzLmdldFJlY2VudFN0aWNrZXJzKCk7XG5cbiAgcmV0dXJuIHJlY2VudFN0aWNrZXJzO1xufVxuYXN5bmMgZnVuY3Rpb24gY2xlYXJBbGxFcnJvclN0aWNrZXJQYWNrQXR0ZW1wdHMoKSB7XG4gIGF3YWl0IGNoYW5uZWxzLmNsZWFyQWxsRXJyb3JTdGlja2VyUGFja0F0dGVtcHRzKCk7XG59XG5cbi8vIEVtb2ppc1xuYXN5bmMgZnVuY3Rpb24gdXBkYXRlRW1vamlVc2FnZShzaG9ydE5hbWU6IHN0cmluZykge1xuICBhd2FpdCBjaGFubmVscy51cGRhdGVFbW9qaVVzYWdlKHNob3J0TmFtZSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRFbW9qaXMobGltaXQgPSAzMikge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0UmVjZW50RW1vamlzKGxpbWl0KTtcbn1cblxuLy8gQmFkZ2VzXG5cbmZ1bmN0aW9uIGdldEFsbEJhZGdlcygpOiBQcm9taXNlPEFycmF5PEJhZGdlVHlwZT4+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldEFsbEJhZGdlcygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVPckNyZWF0ZUJhZGdlcyhcbiAgYmFkZ2VzOiBSZWFkb25seUFycmF5PEJhZGdlVHlwZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoYmFkZ2VzLmxlbmd0aCkge1xuICAgIGF3YWl0IGNoYW5uZWxzLnVwZGF0ZU9yQ3JlYXRlQmFkZ2VzKGJhZGdlcyk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkKFxuICB1cmw6IHN0cmluZyxcbiAgbG9jYWxQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gY2hhbm5lbHMuYmFkZ2VJbWFnZUZpbGVEb3dubG9hZGVkKHVybCwgbG9jYWxQYXRoKTtcbn1cblxuLy8gU3RvcnkgRGlzdHJpYnV0aW9uc1xuXG5hc3luYyBmdW5jdGlvbiBfZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zKCk6IFByb21pc2U8XG4gIEFycmF5PFN0b3J5RGlzdHJpYnV0aW9uVHlwZT5cbj4ge1xuICByZXR1cm4gY2hhbm5lbHMuX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9ucygpO1xufVxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVycygpOiBQcm9taXNlPFxuICBBcnJheTxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlclR5cGU+XG4+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLl9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIF9kZWxldGVBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNoYW5uZWxzLl9kZWxldGVBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU5ld1N0b3J5RGlzdHJpYnV0aW9uKFxuICBkaXN0cmlidXRpb246IFN0b3J5RGlzdHJpYnV0aW9uV2l0aE1lbWJlcnNUeXBlXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hhbm5lbHMuY3JlYXRlTmV3U3RvcnlEaXN0cmlidXRpb24oZGlzdHJpYnV0aW9uKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzKCk6IFByb21pc2U8XG4gIEFycmF5PFN0b3J5RGlzdHJpYnV0aW9uV2l0aE1lbWJlcnNUeXBlPlxuPiB7XG4gIHJldHVybiBjaGFubmVscy5nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnNXaXRoTWVtYmVycygpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVycyhcbiAgaWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzVHlwZSB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0U3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVycyhpZCk7XG59XG5hc3luYyBmdW5jdGlvbiBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbihcbiAgZGlzdHJpYnV0aW9uOiBTdG9yeURpc3RyaWJ1dGlvblR5cGVcbik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaGFubmVscy5tb2RpZnlTdG9yeURpc3RyaWJ1dGlvbihkaXN0cmlidXRpb24pO1xufVxuYXN5bmMgZnVuY3Rpb24gbW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzKFxuICBpZDogc3RyaW5nLFxuICBvcHRpb25zOiB7XG4gICAgdG9BZGQ6IEFycmF5PFVVSURTdHJpbmdUeXBlPjtcbiAgICB0b1JlbW92ZTogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICB9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hhbm5lbHMubW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzKGlkLCBvcHRpb25zKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVN0b3J5RGlzdHJpYnV0aW9uKGlkOiBVVUlEU3RyaW5nVHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBjaGFubmVscy5kZWxldGVTdG9yeURpc3RyaWJ1dGlvbihpZCk7XG59XG5cbi8vIFN0b3J5IFJlYWRzXG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRBbGxTdG9yeVJlYWRzKCk6IFByb21pc2U8QXJyYXk8U3RvcnlSZWFkVHlwZT4+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLl9nZXRBbGxTdG9yeVJlYWRzKCk7XG59XG5hc3luYyBmdW5jdGlvbiBfZGVsZXRlQWxsU3RvcnlSZWFkcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgYXdhaXQgY2hhbm5lbHMuX2RlbGV0ZUFsbFN0b3J5UmVhZHMoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGFkZE5ld1N0b3J5UmVhZChyZWFkOiBTdG9yeVJlYWRUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBjaGFubmVscy5hZGROZXdTdG9yeVJlYWQocmVhZCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRMYXN0U3RvcnlSZWFkc0ZvckF1dGhvcihvcHRpb25zOiB7XG4gIGF1dGhvcklkOiBVVUlEU3RyaW5nVHlwZTtcbiAgY29udmVyc2F0aW9uSWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgbGltaXQ/OiBudW1iZXI7XG59KTogUHJvbWlzZTxBcnJheTxTdG9yeVJlYWRUeXBlPj4ge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0TGFzdFN0b3J5UmVhZHNGb3JBdXRob3Iob3B0aW9ucyk7XG59XG5hc3luYyBmdW5jdGlvbiBjb3VudFN0b3J5UmVhZHNCeUNvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLmNvdW50U3RvcnlSZWFkc0J5Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkKTtcbn1cblxuLy8gT3RoZXJcblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsKCkge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVBbGwoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsQ29uZmlndXJhdGlvbih0eXBlPzogUmVtb3ZlQWxsQ29uZmlndXJhdGlvbikge1xuICBhd2FpdCBjaGFubmVscy5yZW1vdmVBbGxDb25maWd1cmF0aW9uKHR5cGUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbnVwT3JwaGFuZWRBdHRhY2htZW50cygpIHtcbiAgYXdhaXQgY2FsbENoYW5uZWwoQ0xFQU5VUF9PUlBIQU5FRF9BVFRBQ0hNRU5UU19LRVkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbnN1cmVGaWxlUGVybWlzc2lvbnMoKSB7XG4gIGF3YWl0IGNhbGxDaGFubmVsKEVOU1VSRV9GSUxFX1BFUk1JU1NJT05TKTtcbn1cblxuLy8gTm90ZTogd2lsbCBuZWVkIHRvIHJlc3RhcnQgdGhlIGFwcCBhZnRlciBjYWxsaW5nIHRoaXMsIHRvIHNldCB1cCBhZnJlc2hcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZU90aGVyRGF0YSgpIHtcbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIGNhbGxDaGFubmVsKEVSQVNFX1NRTF9LRVkpLFxuICAgIGNhbGxDaGFubmVsKEVSQVNFX0FUVEFDSE1FTlRTX0tFWSksXG4gICAgY2FsbENoYW5uZWwoRVJBU0VfU1RJQ0tFUlNfS0VZKSxcbiAgICBjYWxsQ2hhbm5lbChFUkFTRV9URU1QX0tFWSksXG4gICAgY2FsbENoYW5uZWwoRVJBU0VfRFJBRlRTX0tFWSksXG4gIF0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjYWxsQ2hhbm5lbChuYW1lOiBzdHJpbmcpIHtcbiAgcmV0dXJuIGNyZWF0ZVRhc2tXaXRoVGltZW91dChcbiAgICAoKSA9PlxuICAgICAgbmV3IFByb21pc2U8dm9pZD4oKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgICBpcGMuc2VuZChuYW1lKTtcbiAgICAgICAgaXBjLm9uY2UoYCR7bmFtZX0tZG9uZWAsIChfLCBlcnJvcikgPT4ge1xuICAgICAgICAgIGlmIChlcnJvcikge1xuICAgICAgICAgICAgcmVqZWN0KGVycm9yKTtcblxuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJlc29sdmUoKTtcbiAgICAgICAgfSk7XG4gICAgICB9KSxcbiAgICBgY2FsbENoYW5uZWwgY2FsbCB0byAke25hbWV9YFxuICApKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VzTmVlZGluZ1VwZ3JhZGUoXG4gIGxpbWl0OiBudW1iZXIsXG4gIHsgbWF4VmVyc2lvbiA9IENVUlJFTlRfU0NIRU1BX1ZFUlNJT04gfTogeyBtYXhWZXJzaW9uOiBudW1iZXIgfVxuKSB7XG4gIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgY2hhbm5lbHMuZ2V0TWVzc2FnZXNOZWVkaW5nVXBncmFkZShsaW1pdCwge1xuICAgIG1heFZlcnNpb24sXG4gIH0pO1xuXG4gIHJldHVybiBtZXNzYWdlcztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgeyBsaW1pdCB9OiB7IGxpbWl0OiBudW1iZXIgfVxuKSB7XG4gIHJldHVybiBjaGFubmVscy5nZXRNZXNzYWdlc1dpdGhWaXN1YWxNZWRpYUF0dGFjaG1lbnRzKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgbGltaXQsXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlc1dpdGhGaWxlQXR0YWNobWVudHMoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHsgbGltaXQgfTogeyBsaW1pdDogbnVtYmVyIH1cbikge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0TWVzc2FnZXNXaXRoRmlsZUF0dGFjaG1lbnRzKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgbGltaXQsXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLmdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0oY29udmVyc2F0aW9uSWQpO1xufVxuXG5mdW5jdGlvbiBnZXRKb2JzSW5RdWV1ZShxdWV1ZVR5cGU6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8U3RvcmVkSm9iPj4ge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0Sm9ic0luUXVldWUocXVldWVUeXBlKTtcbn1cblxuZnVuY3Rpb24gaW5zZXJ0Sm9iKGpvYjogUmVhZG9ubHk8U3RvcmVkSm9iPik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gY2hhbm5lbHMuaW5zZXJ0Sm9iKGpvYik7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZUpvYihpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBjaGFubmVscy5kZWxldGVKb2IoaWQpO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3QoXG4gIHJpbmdJZDogYmlnaW50XG4pOiBQcm9taXNlPFByb2Nlc3NHcm91cENhbGxSaW5nUmVxdWVzdFJlc3VsdD4ge1xuICByZXR1cm4gY2hhbm5lbHMucHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0KHJpbmdJZCk7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NHcm91cENhbGxSaW5nQ2FuY2VsYXRpb24ocmluZ0lkOiBiaWdpbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGNoYW5uZWxzLnByb2Nlc3NHcm91cENhbGxSaW5nQ2FuY2VsYXRpb24ocmluZ0lkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY2xlYW5FeHBpcmVkR3JvdXBDYWxsUmluZ3MoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGNoYW5uZWxzLmNsZWFuRXhwaXJlZEdyb3VwQ2FsbFJpbmdzKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUFsbENvbnZlcnNhdGlvbkNvbG9ycyhcbiAgY29udmVyc2F0aW9uQ29sb3I/OiBDb252ZXJzYXRpb25Db2xvclR5cGUsXG4gIGN1c3RvbUNvbG9yRGF0YT86IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHZhbHVlOiBDdXN0b21Db2xvclR5cGU7XG4gIH1cbik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gY2hhbm5lbHMudXBkYXRlQWxsQ29udmVyc2F0aW9uQ29sb3JzKFxuICAgIGNvbnZlcnNhdGlvbkNvbG9yLFxuICAgIGN1c3RvbUNvbG9yRGF0YVxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRNYXhNZXNzYWdlQ291bnRlcigpOiBQcm9taXNlPG51bWJlciB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gY2hhbm5lbHMuZ2V0TWF4TWVzc2FnZUNvdW50ZXIoKTtcbn1cblxuZnVuY3Rpb24gZ2V0U3RhdGlzdGljc0ZvckxvZ2dpbmcoKTogUHJvbWlzZTxSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+PiB7XG4gIHJldHVybiBjaGFubmVscy5nZXRTdGF0aXN0aWNzRm9yTG9nZ2luZygpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLHNCQUFtQztBQUNuQyxzQkFBZTtBQUNmLGtCQUFpQjtBQUVqQixvQkFhTztBQUVQLDBCQUFvQztBQUNwQyxzQ0FBZ0Q7QUFDaEQsOENBQWlEO0FBQ2pELFlBQXVCO0FBQ3ZCLHNCQUF1QztBQUN2QyxxQkFBOEI7QUFDOUIsb0JBQXFDO0FBQ3JDLDZCQUFnQztBQU9oQyw2QkFBa0M7QUFDbEMsVUFBcUI7QUFHckIsZ0NBQW1DO0FBQ25DLHFCQUErQjtBQTBDL0Isb0JBQW1CO0FBQ25CLG9CQUFrQztBQUlsQyxJQUFJLCtCQUFPLDRCQUFJLGlCQUFpQjtBQUM5Qiw4QkFBSSxnQkFBZ0IsQ0FBQztBQUN2QixPQUFPO0FBQ0wsTUFBSSxLQUFLLG1DQUFtQztBQUM5QztBQUVBLE1BQU0sY0FBYyx5QkFBSyx3QkFBRyxRQUFRO0FBRXBDLE1BQU0scUJBQXFCO0FBRTNCLE1BQU0sa0JBQWtCO0FBQ3hCLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0scUJBQXFCO0FBQzNCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sbUNBQW1DO0FBQ3pDLE1BQU0sMEJBQTBCO0FBUWhDLElBQUssZ0JBQUwsa0JBQUssbUJBQUw7QUFDRSw2QkFBUztBQUNULDhCQUFVO0FBQ1YsaUNBQWE7QUFDYiw4QkFBVTtBQUpQO0FBQUE7QUFPTCxNQUFNLFFBQXlDLHVCQUFPLE9BQU8sSUFBSTtBQUNqRSxNQUFNLFNBQVM7QUFDZixJQUFJLGNBQWM7QUFDbEIsSUFBSSxnQkFBZ0I7QUFDcEIsSUFBSSxvQkFBcUM7QUFDekMsSUFBSSxtQkFBd0M7QUFDNUMsSUFBSSxRQUFRO0FBQ1osTUFBTSxpQkFBaUIsb0JBQUksSUFBb0I7QUFNL0MsTUFBTSxnQkFBaUM7QUFBQSxFQUNyQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFFQTtBQUFBLEVBSUE7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFJQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0Y7QUFFQSxJQUFPLGlCQUFRO0FBRWYsc0NBQXNDLFlBQVksT0FBc0I7QUFDdEUsa0NBQ0UsVUFBVSx1QkFDVixvQ0FBb0MsZUFBZSx1QkFDckQ7QUFFQSxNQUFJLEtBQUssNERBQTREO0FBQ3JFLFVBQVE7QUFFUixNQUFJLENBQUMsV0FBVztBQUNk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
