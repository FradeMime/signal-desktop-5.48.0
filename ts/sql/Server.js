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
var Server_exports = {};
__export(Server_exports, {
  _storyIdPredicate: () => _storyIdPredicate,
  default: () => Server_default,
  getJobsInQueueSync: () => getJobsInQueueSync,
  getMessageByIdSync: () => getMessageByIdSync,
  insertJobSync: () => insertJobSync
});
module.exports = __toCommonJS(Server_exports);
var import_path = require("path");
var import_mkdirp = __toESM(require("mkdirp"));
var import_rimraf = __toESM(require("rimraf"));
var import_better_sqlite3 = __toESM(require("better-sqlite3"));
var import_p_props = __toESM(require("p-props"));
var import_lodash = require("lodash");
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_StorageUIKeys = require("../types/StorageUIKeys");
var import_UUID = require("../types/UUID");
var import_assert = require("../util/assert");
var import_combineNames = require("../util/combineNames");
var import_consoleLogger = require("../util/consoleLogger");
var import_dropNull = require("../util/dropNull");
var import_isNormalNumber = require("../util/isNormalNumber");
var import_isNotNil = require("../util/isNotNil");
var import_missingCaseError = require("../util/missingCaseError");
var import_parseIntOrThrow = require("../util/parseIntOrThrow");
var durations = __toESM(require("../util/durations"));
var import_formatCountForLogging = require("../logging/formatCountForLogging");
var import_Calling = require("../types/Calling");
var import_RemoveAllConfiguration = require("../types/RemoveAllConfiguration");
var import_BadgeCategory = require("../badges/BadgeCategory");
var import_BadgeImageTheme = require("../badges/BadgeImageTheme");
var log = __toESM(require("../logging/log"));
var import_util = require("./util");
var import_migrations = require("./migrations");
var import_MessageSeenStatus = require("../MessageSeenStatus");
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
  getUnreadByConversationAndMarkRead,
  getUnreadReactionsAndMarkRead,
  markReactionAsRead,
  addReaction,
  removeReactionFromConversation,
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
  getTotalUnreadForConversation,
  getMessageMetricsForConversation,
  getConversationRangeCenteredOnMessage,
  getConversationMessageStats,
  getLastConversationMessage,
  hasGroupCallHistoryMessage,
  migrateConversationMessages,
  getUnprocessedCount,
  getAllUnprocessedAndIncrementAttempts,
  updateUnprocessedWithData,
  updateUnprocessedsWithData,
  getUnprocessedById,
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
  initialize,
  initializeRenderer,
  removeKnownAttachments,
  removeKnownStickers,
  removeKnownDraftAttachments,
  getAllBadgeImageFileLocalPaths
};
var Server_default = dataInterface;
const statementCache = /* @__PURE__ */ new WeakMap();
function prepare(db, query) {
  let dbCache = statementCache.get(db);
  if (!dbCache) {
    dbCache = /* @__PURE__ */ new Map();
    statementCache.set(db, dbCache);
  }
  let result = dbCache.get(query);
  if (!result) {
    result = db.prepare(query);
    dbCache.set(query, result);
  }
  return result;
}
function rowToConversation(row) {
  const parsedJson = JSON.parse(row.json);
  let profileLastFetchedAt;
  if ((0, import_isNormalNumber.isNormalNumber)(row.profileLastFetchedAt)) {
    profileLastFetchedAt = row.profileLastFetchedAt;
  } else {
    (0, import_assert.assert)((0, import_lodash.isNil)(row.profileLastFetchedAt), "profileLastFetchedAt contained invalid data; defaulting to undefined");
    profileLastFetchedAt = void 0;
  }
  return {
    ...parsedJson,
    profileLastFetchedAt
  };
}
function rowToSticker(row) {
  return {
    ...row,
    isCoverOnly: Boolean(row.isCoverOnly),
    emoji: (0, import_dropNull.dropNull)(row.emoji)
  };
}
function isRenderer() {
  if (typeof process === "undefined" || !process) {
    return true;
  }
  return process.type === "renderer";
}
function keyDatabase(db, key) {
  db.pragma(`key = "x'${key}'"`);
}
function switchToWAL(db) {
  db.pragma("journal_mode = WAL");
  db.pragma("synchronous = FULL");
}
function migrateSchemaVersion(db) {
  const userVersion = (0, import_util.getUserVersion)(db);
  if (userVersion > 0) {
    return;
  }
  const schemaVersion = (0, import_util.getSchemaVersion)(db);
  const newUserVersion = schemaVersion > 18 ? 16 : schemaVersion;
  logger.info(`migrateSchemaVersion: Migrating from schema_version ${schemaVersion} to user_version ${newUserVersion}`);
  (0, import_util.setUserVersion)(db, newUserVersion);
}
function openAndMigrateDatabase(filePath, key) {
  let db;
  try {
    db = new import_better_sqlite3.default(filePath);
    keyDatabase(db, key);
    switchToWAL(db);
    migrateSchemaVersion(db);
    return db;
  } catch (error) {
    if (db) {
      db.close();
    }
    logger.info("migrateDatabase: Migration without cipher change failed");
  }
  db = new import_better_sqlite3.default(filePath);
  keyDatabase(db, key);
  db.pragma("cipher_compatibility = 3");
  migrateSchemaVersion(db);
  db.close();
  db = new import_better_sqlite3.default(filePath);
  keyDatabase(db, key);
  db.pragma("cipher_migrate");
  switchToWAL(db);
  return db;
}
const INVALID_KEY = /[^0-9A-Fa-f]/;
function openAndSetUpSQLCipher(filePath, { key }) {
  const match = INVALID_KEY.exec(key);
  if (match) {
    throw new Error(`setupSQLCipher: key '${key}' is not valid`);
  }
  const db = openAndMigrateDatabase(filePath, key);
  db.pragma("foreign_keys = ON");
  return db;
}
let globalInstance;
let logger = import_consoleLogger.consoleLogger;
let globalInstanceRenderer;
let databaseFilePath;
let indexedDBPath;
async function initialize({
  configDir,
  key,
  logger: suppliedLogger
}) {
  if (globalInstance) {
    throw new Error("Cannot initialize more than once!");
  }
  if (!(0, import_lodash.isString)(configDir)) {
    throw new Error("initialize: configDir is required!");
  }
  if (!(0, import_lodash.isString)(key)) {
    throw new Error("initialize: key is required!");
  }
  logger = suppliedLogger;
  indexedDBPath = (0, import_path.join)(configDir, "IndexedDB");
  const dbDir = (0, import_path.join)(configDir, "sql");
  import_mkdirp.default.sync(dbDir);
  databaseFilePath = (0, import_path.join)(dbDir, "db.sqlite");
  let db;
  try {
    db = openAndSetUpSQLCipher(databaseFilePath, { key });
    (0, import_migrations.updateSchema)(db, logger);
    globalInstance = db;
    getMessageCountSync();
  } catch (error) {
    logger.error("Database startup error:", error.stack);
    if (db) {
      db.close();
    }
    throw error;
  }
}
async function initializeRenderer({
  configDir,
  key
}) {
  if (!isRenderer()) {
    throw new Error("Cannot call from main process.");
  }
  if (globalInstanceRenderer) {
    throw new Error("Cannot initialize more than once!");
  }
  if (!(0, import_lodash.isString)(configDir)) {
    throw new Error("initialize: configDir is required!");
  }
  if (!(0, import_lodash.isString)(key)) {
    throw new Error("initialize: key is required!");
  }
  if (!indexedDBPath) {
    indexedDBPath = (0, import_path.join)(configDir, "IndexedDB");
  }
  const dbDir = (0, import_path.join)(configDir, "sql");
  if (!databaseFilePath) {
    databaseFilePath = (0, import_path.join)(dbDir, "db.sqlite");
  }
  let promisified;
  try {
    promisified = openAndSetUpSQLCipher(databaseFilePath, { key });
    globalInstanceRenderer = promisified;
    getMessageCountSync();
  } catch (error) {
    log.error("Database startup error:", error.stack);
    throw error;
  }
}
async function close() {
  for (const dbRef of [globalInstanceRenderer, globalInstance]) {
    dbRef?.pragma("optimize");
    dbRef?.close();
  }
  globalInstance = void 0;
  globalInstanceRenderer = void 0;
}
async function removeDB() {
  if (globalInstance) {
    try {
      globalInstance.close();
    } catch (error) {
      logger.error("removeDB: Failed to close database:", error.stack);
    }
    globalInstance = void 0;
  }
  if (!databaseFilePath) {
    throw new Error("removeDB: Cannot erase database without a databaseFilePath!");
  }
  logger.warn("removeDB: Removing all database files");
  import_rimraf.default.sync(databaseFilePath);
  import_rimraf.default.sync(`${databaseFilePath}-shm`);
  import_rimraf.default.sync(`${databaseFilePath}-wal`);
}
async function removeIndexedDBFiles() {
  if (!indexedDBPath) {
    throw new Error("removeIndexedDBFiles: Need to initialize and set indexedDBPath first!");
  }
  const pattern = (0, import_path.join)(indexedDBPath, "*.leveldb");
  import_rimraf.default.sync(pattern);
  indexedDBPath = void 0;
}
function getInstance() {
  if (isRenderer()) {
    if (!globalInstanceRenderer) {
      throw new Error("getInstance: globalInstanceRenderer not set!");
    }
    return globalInstanceRenderer;
  }
  if (!globalInstance) {
    throw new Error("getInstance: globalInstance not set!");
  }
  return globalInstance;
}
const IDENTITY_KEYS_TABLE = "identityKeys";
async function createOrUpdateIdentityKey(data) {
  return (0, import_util.createOrUpdate)(getInstance(), IDENTITY_KEYS_TABLE, data);
}
async function getIdentityKeyById(id) {
  return (0, import_util.getById)(getInstance(), IDENTITY_KEYS_TABLE, id);
}
async function bulkAddIdentityKeys(array) {
  return (0, import_util.bulkAdd)(getInstance(), IDENTITY_KEYS_TABLE, array);
}
async function removeIdentityKeyById(id) {
  return (0, import_util.removeById)(getInstance(), IDENTITY_KEYS_TABLE, id);
}
async function removeAllIdentityKeys() {
  return (0, import_util.removeAllFromTable)(getInstance(), IDENTITY_KEYS_TABLE);
}
async function getAllIdentityKeys() {
  return (0, import_util.getAllFromTable)(getInstance(), IDENTITY_KEYS_TABLE);
}
const PRE_KEYS_TABLE = "preKeys";
async function createOrUpdatePreKey(data) {
  return (0, import_util.createOrUpdate)(getInstance(), PRE_KEYS_TABLE, data);
}
async function getPreKeyById(id) {
  return (0, import_util.getById)(getInstance(), PRE_KEYS_TABLE, id);
}
async function bulkAddPreKeys(array) {
  return (0, import_util.bulkAdd)(getInstance(), PRE_KEYS_TABLE, array);
}
async function removePreKeyById(id) {
  return (0, import_util.removeById)(getInstance(), PRE_KEYS_TABLE, id);
}
async function removeAllPreKeys() {
  return (0, import_util.removeAllFromTable)(getInstance(), PRE_KEYS_TABLE);
}
async function getAllPreKeys() {
  return (0, import_util.getAllFromTable)(getInstance(), PRE_KEYS_TABLE);
}
const SIGNED_PRE_KEYS_TABLE = "signedPreKeys";
async function createOrUpdateSignedPreKey(data) {
  return (0, import_util.createOrUpdate)(getInstance(), SIGNED_PRE_KEYS_TABLE, data);
}
async function getSignedPreKeyById(id) {
  return (0, import_util.getById)(getInstance(), SIGNED_PRE_KEYS_TABLE, id);
}
async function bulkAddSignedPreKeys(array) {
  return (0, import_util.bulkAdd)(getInstance(), SIGNED_PRE_KEYS_TABLE, array);
}
async function removeSignedPreKeyById(id) {
  return (0, import_util.removeById)(getInstance(), SIGNED_PRE_KEYS_TABLE, id);
}
async function removeAllSignedPreKeys() {
  return (0, import_util.removeAllFromTable)(getInstance(), SIGNED_PRE_KEYS_TABLE);
}
async function getAllSignedPreKeys() {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json
      FROM signedPreKeys
      ORDER BY id ASC;
      `).all();
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
const ITEMS_TABLE = "items";
async function createOrUpdateItem(data) {
  return (0, import_util.createOrUpdate)(getInstance(), ITEMS_TABLE, data);
}
async function getItemById(id) {
  return (0, import_util.getById)(getInstance(), ITEMS_TABLE, id);
}
async function getAllItems() {
  const db = getInstance();
  const rows = db.prepare("SELECT json FROM items ORDER BY id ASC;").all();
  const items = rows.map((row) => (0, import_util.jsonToObject)(row.json));
  const result = /* @__PURE__ */ Object.create(null);
  for (const { id, value } of items) {
    result[id] = value;
  }
  return result;
}
async function removeItemById(id) {
  return (0, import_util.removeById)(getInstance(), ITEMS_TABLE, id);
}
async function removeAllItems() {
  return (0, import_util.removeAllFromTable)(getInstance(), ITEMS_TABLE);
}
async function createOrUpdateSenderKey(key) {
  createOrUpdateSenderKeySync(key);
}
function createOrUpdateSenderKeySync(key) {
  const db = getInstance();
  prepare(db, `
    INSERT OR REPLACE INTO senderKeys (
      id,
      senderId,
      distributionId,
      data,
      lastUpdatedDate
    ) values (
      $id,
      $senderId,
      $distributionId,
      $data,
      $lastUpdatedDate
    )
    `).run(key);
}
async function getSenderKeyById(id) {
  const db = getInstance();
  const row = prepare(db, "SELECT * FROM senderKeys WHERE id = $id").get({
    id
  });
  return row;
}
async function removeAllSenderKeys() {
  const db = getInstance();
  prepare(db, "DELETE FROM senderKeys").run();
}
async function getAllSenderKeys() {
  const db = getInstance();
  const rows = prepare(db, "SELECT * FROM senderKeys").all();
  return rows;
}
async function removeSenderKeyById(id) {
  const db = getInstance();
  prepare(db, "DELETE FROM senderKeys WHERE id = $id").run({ id });
}
async function insertSentProto(proto, options) {
  const db = getInstance();
  const { recipients, messageIds } = options;
  return db.transaction(() => {
    const info = prepare(db, `
      INSERT INTO sendLogPayloads (
        contentHint,
        proto,
        timestamp
      ) VALUES (
        $contentHint,
        $proto,
        $timestamp
      );
      `).run(proto);
    const id = (0, import_parseIntOrThrow.parseIntOrThrow)(info.lastInsertRowid, "insertSentProto/lastInsertRowid");
    const recipientStatement = prepare(db, `
      INSERT INTO sendLogRecipients (
        payloadId,
        recipientUuid,
        deviceId
      ) VALUES (
        $id,
        $recipientUuid,
        $deviceId
      );
      `);
    const recipientUuids = Object.keys(recipients);
    for (const recipientUuid of recipientUuids) {
      const deviceIds = recipients[recipientUuid];
      for (const deviceId of deviceIds) {
        recipientStatement.run({
          id,
          recipientUuid,
          deviceId
        });
      }
    }
    const messageStatement = prepare(db, `
      INSERT INTO sendLogMessageIds (
        payloadId,
        messageId
      ) VALUES (
        $id,
        $messageId
      );
      `);
    for (const messageId of messageIds) {
      messageStatement.run({
        id,
        messageId
      });
    }
    return id;
  })();
}
async function deleteSentProtosOlderThan(timestamp) {
  const db = getInstance();
  prepare(db, `
    DELETE FROM sendLogPayloads
    WHERE
      timestamp IS NULL OR
      timestamp < $timestamp;
    `).run({
    timestamp
  });
}
async function deleteSentProtoByMessageId(messageId) {
  const db = getInstance();
  prepare(db, `
    DELETE FROM sendLogPayloads WHERE id IN (
      SELECT payloadId FROM sendLogMessageIds
      WHERE messageId = $messageId
    );
    `).run({
    messageId
  });
}
async function insertProtoRecipients({
  id,
  recipientUuid,
  deviceIds
}) {
  const db = getInstance();
  db.transaction(() => {
    const statement = prepare(db, `
      INSERT INTO sendLogRecipients (
        payloadId,
        recipientUuid,
        deviceId
      ) VALUES (
        $id,
        $recipientUuid,
        $deviceId
      );
      `);
    for (const deviceId of deviceIds) {
      statement.run({
        id,
        recipientUuid,
        deviceId
      });
    }
  })();
}
async function deleteSentProtoRecipient(options) {
  const db = getInstance();
  const items = Array.isArray(options) ? options : [options];
  db.transaction(() => {
    for (const item of items) {
      const { timestamp, recipientUuid, deviceId } = item;
      const rows = prepare(db, `
        SELECT sendLogPayloads.id FROM sendLogPayloads
        INNER JOIN sendLogRecipients
          ON sendLogRecipients.payloadId = sendLogPayloads.id
        WHERE
          sendLogPayloads.timestamp = $timestamp AND
          sendLogRecipients.recipientUuid = $recipientUuid AND
          sendLogRecipients.deviceId = $deviceId;
       `).all({ timestamp, recipientUuid, deviceId });
      if (!rows.length) {
        continue;
      }
      if (rows.length > 1) {
        logger.warn(`deleteSentProtoRecipient: More than one payload matches recipient and timestamp ${timestamp}. Using the first.`);
        continue;
      }
      const { id } = rows[0];
      prepare(db, `
        DELETE FROM sendLogRecipients
        WHERE
          payloadId = $id AND
          recipientUuid = $recipientUuid AND
          deviceId = $deviceId;
        `).run({ id, recipientUuid, deviceId });
      const remaining = prepare(db, "SELECT count(*) FROM sendLogRecipients WHERE payloadId = $id;").pluck(true).get({ id });
      if (!(0, import_lodash.isNumber)(remaining)) {
        throw new Error("deleteSentProtoRecipient: select count() returned non-number!");
      }
      if (remaining > 0) {
        continue;
      }
      logger.info(`deleteSentProtoRecipient: Deleting proto payload for timestamp ${timestamp}`);
      prepare(db, "DELETE FROM sendLogPayloads WHERE id = $id;").run({
        id
      });
    }
  })();
}
async function getSentProtoByRecipient({
  now,
  recipientUuid,
  timestamp
}) {
  const db = getInstance();
  const HOUR = 1e3 * 60 * 60;
  const oneDayAgo = now - HOUR * 24;
  await deleteSentProtosOlderThan(oneDayAgo);
  const row = prepare(db, `
    SELECT
      sendLogPayloads.*,
      GROUP_CONCAT(DISTINCT sendLogMessageIds.messageId) AS messageIds
    FROM sendLogPayloads
    INNER JOIN sendLogRecipients ON sendLogRecipients.payloadId = sendLogPayloads.id
    LEFT JOIN sendLogMessageIds ON sendLogMessageIds.payloadId = sendLogPayloads.id
    WHERE
      sendLogPayloads.timestamp = $timestamp AND
      sendLogRecipients.recipientUuid = $recipientUuid
    GROUP BY sendLogPayloads.id;
    `).get({
    timestamp,
    recipientUuid
  });
  if (!row) {
    return void 0;
  }
  const { messageIds } = row;
  return {
    ...row,
    messageIds: messageIds ? messageIds.split(",") : []
  };
}
async function removeAllSentProtos() {
  const db = getInstance();
  prepare(db, "DELETE FROM sendLogPayloads;").run();
}
async function getAllSentProtos() {
  const db = getInstance();
  const rows = prepare(db, "SELECT * FROM sendLogPayloads;").all();
  return rows;
}
async function _getAllSentProtoRecipients() {
  const db = getInstance();
  const rows = prepare(db, "SELECT * FROM sendLogRecipients;").all();
  return rows;
}
async function _getAllSentProtoMessageIds() {
  const db = getInstance();
  const rows = prepare(db, "SELECT * FROM sendLogMessageIds;").all();
  return rows;
}
const SESSIONS_TABLE = "sessions";
function createOrUpdateSessionSync(data) {
  const db = getInstance();
  const { id, conversationId, ourUuid, uuid } = data;
  if (!id) {
    throw new Error("createOrUpdateSession: Provided data did not have a truthy id");
  }
  if (!conversationId) {
    throw new Error("createOrUpdateSession: Provided data did not have a truthy conversationId");
  }
  prepare(db, `
    INSERT OR REPLACE INTO sessions (
      id,
      conversationId,
      ourUuid,
      uuid,
      json
    ) values (
      $id,
      $conversationId,
      $ourUuid,
      $uuid,
      $json
    )
    `).run({
    id,
    conversationId,
    ourUuid,
    uuid,
    json: (0, import_util.objectToJSON)(data)
  });
}
async function createOrUpdateSession(data) {
  return createOrUpdateSessionSync(data);
}
async function createOrUpdateSessions(array) {
  const db = getInstance();
  db.transaction(() => {
    for (const item of array) {
      (0, import_assert.assertSync)(createOrUpdateSessionSync(item));
    }
  })();
}
async function commitDecryptResult({
  senderKeys,
  sessions,
  unprocessed
}) {
  const db = getInstance();
  db.transaction(() => {
    for (const item of senderKeys) {
      (0, import_assert.assertSync)(createOrUpdateSenderKeySync(item));
    }
    for (const item of sessions) {
      (0, import_assert.assertSync)(createOrUpdateSessionSync(item));
    }
    for (const item of unprocessed) {
      (0, import_assert.assertSync)(saveUnprocessedSync(item));
    }
  })();
}
async function bulkAddSessions(array) {
  return (0, import_util.bulkAdd)(getInstance(), SESSIONS_TABLE, array);
}
async function removeSessionById(id) {
  return (0, import_util.removeById)(getInstance(), SESSIONS_TABLE, id);
}
async function removeSessionsByConversation(conversationId) {
  const db = getInstance();
  db.prepare(`
    DELETE FROM sessions
    WHERE conversationId = $conversationId;
    `).run({
    conversationId
  });
}
async function removeAllSessions() {
  return (0, import_util.removeAllFromTable)(getInstance(), SESSIONS_TABLE);
}
async function getAllSessions() {
  return (0, import_util.getAllFromTable)(getInstance(), SESSIONS_TABLE);
}
async function getConversationCount() {
  return (0, import_util.getCountFromTable)(getInstance(), "conversations");
}
function getConversationMembersList({ members, membersV2 }) {
  if (membersV2) {
    return membersV2.map((item) => item.uuid).join(" ");
  }
  if (members) {
    return members.join(" ");
  }
  return null;
}
function saveConversationSync(data, db = getInstance()) {
  const {
    active_at,
    e164,
    groupId,
    id,
    name,
    profileFamilyName,
    profileName,
    profileLastFetchedAt,
    type,
    uuid
  } = data;
  const membersList = getConversationMembersList(data);
  db.prepare(`
    INSERT INTO conversations (
      id,
      json,

      e164,
      uuid,
      groupId,

      active_at,
      type,
      members,
      name,
      profileName,
      profileFamilyName,
      profileFullName,
      profileLastFetchedAt
    ) values (
      $id,
      $json,

      $e164,
      $uuid,
      $groupId,

      $active_at,
      $type,
      $members,
      $name,
      $profileName,
      $profileFamilyName,
      $profileFullName,
      $profileLastFetchedAt
    );
    `).run({
    id,
    json: (0, import_util.objectToJSON)((0, import_lodash.omit)(data, ["profileLastFetchedAt", "unblurredAvatarPath"])),
    e164: e164 || null,
    uuid: uuid || null,
    groupId: groupId || null,
    active_at: active_at || null,
    type,
    members: membersList,
    name: name || null,
    profileName: profileName || null,
    profileFamilyName: profileFamilyName || null,
    profileFullName: (0, import_combineNames.combineNames)(profileName, profileFamilyName) || null,
    profileLastFetchedAt: profileLastFetchedAt || null
  });
}
async function saveConversation(data, db = getInstance()) {
  return saveConversationSync(data, db);
}
async function saveConversations(arrayOfConversations) {
  const db = getInstance();
  db.transaction(() => {
    for (const conversation of arrayOfConversations) {
      (0, import_assert.assertSync)(saveConversationSync(conversation));
    }
  })();
}
function updateConversationSync(data, db = getInstance()) {
  const {
    id,
    active_at,
    type,
    name,
    profileName,
    profileFamilyName,
    profileLastFetchedAt,
    e164,
    uuid
  } = data;
  const membersList = getConversationMembersList(data);
  db.prepare(`
    UPDATE conversations SET
      json = $json,

      e164 = $e164,
      uuid = $uuid,

      active_at = $active_at,
      type = $type,
      members = $members,
      name = $name,
      profileName = $profileName,
      profileFamilyName = $profileFamilyName,
      profileFullName = $profileFullName,
      profileLastFetchedAt = $profileLastFetchedAt
    WHERE id = $id;
    `).run({
    id,
    json: (0, import_util.objectToJSON)((0, import_lodash.omit)(data, ["profileLastFetchedAt", "unblurredAvatarPath"])),
    e164: e164 || null,
    uuid: uuid || null,
    active_at: active_at || null,
    type,
    members: membersList,
    name: name || null,
    profileName: profileName || null,
    profileFamilyName: profileFamilyName || null,
    profileFullName: (0, import_combineNames.combineNames)(profileName, profileFamilyName) || null,
    profileLastFetchedAt: profileLastFetchedAt || null
  });
}
async function updateConversation(data) {
  return updateConversationSync(data);
}
async function updateConversations(array) {
  const db = getInstance();
  db.transaction(() => {
    for (const item of array) {
      (0, import_assert.assertSync)(updateConversationSync(item));
    }
  })();
}
function removeConversationsSync(ids) {
  const db = getInstance();
  db.prepare(`
    DELETE FROM conversations
    WHERE id IN ( ${ids.map(() => "?").join(", ")} );
    `).run(ids);
}
async function removeConversation(id) {
  const db = getInstance();
  if (!Array.isArray(id)) {
    db.prepare("DELETE FROM conversations WHERE id = $id;").run({
      id
    });
    return;
  }
  if (!id.length) {
    throw new Error("removeConversation: No ids to delete!");
  }
  (0, import_util.batchMultiVarQuery)(db, id, removeConversationsSync);
}
async function getConversationById(id) {
  const db = getInstance();
  const row = db.prepare("SELECT json FROM conversations WHERE id = $id;").get({ id });
  if (!row) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(row.json);
}
async function eraseStorageServiceStateFromConversations() {
  const db = getInstance();
  db.prepare(`
    UPDATE conversations
    SET
      json = json_remove(json, '$.storageID', '$.needsStorageServiceSync', '$.unknownFields', '$.storageProfileKey');
    `).run();
}
function getAllConversationsSync(db = getInstance()) {
  const rows = db.prepare(`
      SELECT json, profileLastFetchedAt
      FROM conversations
      ORDER BY id ASC;
      `).all();
  return rows.map((row) => rowToConversation(row));
}
async function getAllConversations() {
  return getAllConversationsSync();
}
async function getAllConversationIds() {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT id FROM conversations ORDER BY id ASC;
      `).all();
  return rows.map((row) => row.id);
}
async function getAllGroupsInvolvingUuid(uuid) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json, profileLastFetchedAt
      FROM conversations WHERE
        type = 'group' AND
        members LIKE $uuid
      ORDER BY id ASC;
      `).all({
    uuid: `%${uuid}%`
  });
  return rows.map((row) => rowToConversation(row));
}
async function searchMessages(query, params = {}) {
  const { limit = 500, conversationId } = params;
  const db = getInstance();
  return db.transaction(() => {
    db.exec(`
      CREATE TEMP TABLE tmp_results(rowid INTEGER PRIMARY KEY ASC);
      CREATE TEMP TABLE tmp_filtered_results(rowid INTEGER PRIMARY KEY ASC);
      `);
    db.prepare(`
        INSERT INTO tmp_results (rowid)
        SELECT
          rowid
        FROM
          messages_fts
        WHERE
          messages_fts.body MATCH $query;
      `).run({ query });
    if (conversationId === void 0) {
      db.prepare(`
          INSERT INTO tmp_filtered_results (rowid)
          SELECT
            tmp_results.rowid
          FROM
            tmp_results
          INNER JOIN
            messages ON messages.rowid = tmp_results.rowid
          ORDER BY messages.received_at DESC, messages.sent_at DESC
          LIMIT $limit;
        `).run({ limit });
    } else {
      db.prepare(`
          INSERT INTO tmp_filtered_results (rowid)
          SELECT
            tmp_results.rowid
          FROM
            tmp_results
          INNER JOIN
            messages ON messages.rowid = tmp_results.rowid
          WHERE
            messages.conversationId = $conversationId
          ORDER BY messages.received_at DESC, messages.sent_at DESC
          LIMIT $limit;
        `).run({ conversationId, limit });
    }
    const result = db.prepare(`
        SELECT
          messages.json,
          snippet(messages_fts, -1, '<<left>>', '<<right>>', '...', 10)
            AS snippet
        FROM tmp_filtered_results
        INNER JOIN messages_fts
          ON messages_fts.rowid = tmp_filtered_results.rowid
        INNER JOIN messages
          ON messages.rowid = tmp_filtered_results.rowid
        WHERE
          messages_fts.body MATCH $query
        ORDER BY messages.received_at DESC, messages.sent_at DESC;
        `).all({ query });
    db.exec(`
      DROP TABLE tmp_results;
      DROP TABLE tmp_filtered_results;
      `);
    return result;
  })();
}
async function searchMessagesInConversation(query, conversationId, { limit = 100 } = {}) {
  return searchMessages(query, { conversationId, limit });
}
function getMessageCountSync(conversationId, db = getInstance()) {
  if (conversationId === void 0) {
    return (0, import_util.getCountFromTable)(db, "messages");
  }
  const count = db.prepare(`
        SELECT count(*)
        FROM messages
        WHERE conversationId = $conversationId;
        `).pluck().get({ conversationId });
  return count;
}
async function getStoryCount(conversationId) {
  const db = getInstance();
  return db.prepare(`
        SELECT count(*)
        FROM messages
        WHERE conversationId = $conversationId AND isStory = 1;
        `).pluck().get({ conversationId });
}
async function getMessageCount(conversationId) {
  return getMessageCountSync(conversationId);
}
function hasUserInitiatedMessages(conversationId) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT COUNT(*) as count FROM
        (
          SELECT 1 FROM messages
          WHERE
            conversationId = $conversationId AND
            isUserInitiatedMessage = 1
          LIMIT 1
        );
      `).get({ conversationId });
  return row.count !== 0;
}
function saveMessageSync(data, options) {
  const {
    alreadyInTransaction,
    db = getInstance(),
    forceSave,
    jobToInsert,
    ourUuid
  } = options;
  if (!alreadyInTransaction) {
    return db.transaction(() => {
      return (0, import_assert.assertSync)(saveMessageSync(data, {
        ...options,
        alreadyInTransaction: true
      }));
    })();
  }
  const {
    body,
    conversationId,
    groupV2Change,
    hasAttachments,
    hasFileAttachments,
    hasVisualMediaAttachments,
    id,
    isErased,
    isViewOnce,
    received_at,
    schemaVersion,
    sent_at,
    serverGuid,
    source,
    sourceUuid,
    sourceDevice,
    storyId,
    type,
    readStatus,
    expireTimer,
    expirationStartTimestamp
  } = data;
  let { seenStatus } = data;
  if (readStatus === import_MessageReadStatus.ReadStatus.Unread && seenStatus !== import_MessageSeenStatus.SeenStatus.Unseen) {
    log.warn(`saveMessage: Message ${id}/${type} is unread but had seenStatus=${seenStatus}. Forcing to UnseenStatus.Unseen.`);
    data = {
      ...data,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen
    };
    seenStatus = import_MessageSeenStatus.SeenStatus.Unseen;
  }
  const payload = {
    id,
    json: (0, import_util.objectToJSON)(data),
    body: body || null,
    conversationId,
    expirationStartTimestamp: expirationStartTimestamp || null,
    expireTimer: expireTimer || null,
    hasAttachments: hasAttachments ? 1 : 0,
    hasFileAttachments: hasFileAttachments ? 1 : 0,
    hasVisualMediaAttachments: hasVisualMediaAttachments ? 1 : 0,
    isChangeCreatedByUs: groupV2Change?.from === ourUuid ? 1 : 0,
    isErased: isErased ? 1 : 0,
    isViewOnce: isViewOnce ? 1 : 0,
    received_at: received_at || null,
    schemaVersion: schemaVersion || 0,
    serverGuid: serverGuid || null,
    sent_at: sent_at || null,
    source: source || null,
    sourceUuid: sourceUuid || null,
    sourceDevice: sourceDevice || null,
    storyId: storyId || null,
    type: type || null,
    readStatus: readStatus ?? null,
    seenStatus: seenStatus ?? import_MessageSeenStatus.SeenStatus.NotApplicable
  };
  if (id && !forceSave) {
    prepare(db, `
      UPDATE messages SET
        id = $id,
        json = $json,

        body = $body,
        conversationId = $conversationId,
        expirationStartTimestamp = $expirationStartTimestamp,
        expireTimer = $expireTimer,
        hasAttachments = $hasAttachments,
        hasFileAttachments = $hasFileAttachments,
        hasVisualMediaAttachments = $hasVisualMediaAttachments,
        isChangeCreatedByUs = $isChangeCreatedByUs,
        isErased = $isErased,
        isViewOnce = $isViewOnce,
        received_at = $received_at,
        schemaVersion = $schemaVersion,
        serverGuid = $serverGuid,
        sent_at = $sent_at,
        source = $source,
        sourceUuid = $sourceUuid,
        sourceDevice = $sourceDevice,
        storyId = $storyId,
        type = $type,
        readStatus = $readStatus,
        seenStatus = $seenStatus
      WHERE id = $id;
      `).run(payload);
    if (jobToInsert) {
      insertJobSync(db, jobToInsert);
    }
    return id;
  }
  const toCreate = {
    ...data,
    id: id || import_UUID.UUID.generate().toString()
  };
  prepare(db, `
    INSERT INTO messages (
      id,
      json,

      body,
      conversationId,
      expirationStartTimestamp,
      expireTimer,
      hasAttachments,
      hasFileAttachments,
      hasVisualMediaAttachments,
      isChangeCreatedByUs,
      isErased,
      isViewOnce,
      received_at,
      schemaVersion,
      serverGuid,
      sent_at,
      source,
      sourceUuid,
      sourceDevice,
      storyId,
      type,
      readStatus,
      seenStatus
    ) values (
      $id,
      $json,

      $body,
      $conversationId,
      $expirationStartTimestamp,
      $expireTimer,
      $hasAttachments,
      $hasFileAttachments,
      $hasVisualMediaAttachments,
      $isChangeCreatedByUs,
      $isErased,
      $isViewOnce,
      $received_at,
      $schemaVersion,
      $serverGuid,
      $sent_at,
      $source,
      $sourceUuid,
      $sourceDevice,
      $storyId,
      $type,
      $readStatus,
      $seenStatus
    );
    `).run({
    ...payload,
    id: toCreate.id,
    json: (0, import_util.objectToJSON)(toCreate)
  });
  if (jobToInsert) {
    insertJobSync(db, jobToInsert);
  }
  return toCreate.id;
}
async function saveMessage(data, options) {
  return saveMessageSync(data, options);
}
async function saveMessages(arrayOfMessages, options) {
  const db = getInstance();
  db.transaction(() => {
    for (const message of arrayOfMessages) {
      (0, import_assert.assertSync)(saveMessageSync(message, { ...options, alreadyInTransaction: true }));
    }
  })();
}
async function removeMessage(id) {
  const db = getInstance();
  db.prepare("DELETE FROM messages WHERE id = $id;").run({ id });
}
function removeMessagesSync(ids) {
  const db = getInstance();
  db.prepare(`
    DELETE FROM messages
    WHERE id IN ( ${ids.map(() => "?").join(", ")} );
    `).run(ids);
}
async function removeMessages(ids) {
  (0, import_util.batchMultiVarQuery)(getInstance(), ids, removeMessagesSync);
}
async function getMessageById(id) {
  const db = getInstance();
  return getMessageByIdSync(db, id);
}
function getMessageByIdSync(db, id) {
  const row = db.prepare("SELECT json FROM messages WHERE id = $id;").get({
    id
  });
  if (!row) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(row.json);
}
async function getMessagesById(messageIds) {
  const db = getInstance();
  return (0, import_util.batchMultiVarQuery)(db, messageIds, (batch) => {
    const query = db.prepare(`SELECT json FROM messages WHERE id IN (${Array(batch.length).fill("?").join(",")});`);
    const rows = query.all(batch);
    return rows.map((row) => (0, import_util.jsonToObject)(row.json));
  });
}
async function _getAllMessages() {
  const db = getInstance();
  const rows = db.prepare("SELECT json FROM messages ORDER BY id ASC;").all();
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function _removeAllMessages() {
  const db = getInstance();
  db.prepare("DELETE from messages;").run();
}
async function getAllMessageIds() {
  const db = getInstance();
  const rows = db.prepare("SELECT id FROM messages ORDER BY id ASC;").all();
  return rows.map((row) => row.id);
}
async function getMessageBySender({
  source,
  sourceUuid,
  sourceDevice,
  sent_at
}) {
  const db = getInstance();
  const rows = prepare(db, `
    SELECT json FROM messages WHERE
      (source = $source OR sourceUuid = $sourceUuid) AND
      sourceDevice = $sourceDevice AND
      sent_at = $sent_at
    LIMIT 2;
    `).all({
    source,
    sourceUuid,
    sourceDevice,
    sent_at
  });
  if (rows.length > 1) {
    log.warn("getMessageBySender: More than one message found for", {
      sent_at,
      source,
      sourceUuid,
      sourceDevice
    });
  }
  if (rows.length < 1) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(rows[0].json);
}
function _storyIdPredicate(storyId, isGroup) {
  if (!isGroup && storyId === void 0) {
    return "$storyId IS NULL";
  }
  return "storyId IS $storyId";
}
async function getUnreadByConversationAndMarkRead({
  conversationId,
  isGroup,
  newestUnreadAt,
  storyId,
  readAt
}) {
  const db = getInstance();
  return db.transaction(() => {
    const expirationStartTimestamp = Math.min(Date.now(), readAt ?? Infinity);
    db.prepare(`
      UPDATE messages
      INDEXED BY expiring_message_by_conversation_and_received_at
      SET
        expirationStartTimestamp = $expirationStartTimestamp,
        json = json_patch(json, $jsonPatch)
      WHERE
        conversationId = $conversationId AND
        (${_storyIdPredicate(storyId, isGroup)}) AND
        isStory IS 0 AND
        type IS 'incoming' AND
        (
          expirationStartTimestamp IS NULL OR
          expirationStartTimestamp > $expirationStartTimestamp
        ) AND
        expireTimer > 0 AND
        received_at <= $newestUnreadAt;
      `).run({
      conversationId,
      expirationStartTimestamp,
      jsonPatch: JSON.stringify({ expirationStartTimestamp }),
      newestUnreadAt,
      storyId: storyId || null
    });
    const rows = db.prepare(`
        SELECT id, json FROM messages
        WHERE
          conversationId = $conversationId AND
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen} AND
          isStory = 0 AND
          (${_storyIdPredicate(storyId, isGroup)}) AND
          received_at <= $newestUnreadAt
        ORDER BY received_at DESC, sent_at DESC;
        `).all({
      conversationId,
      newestUnreadAt,
      storyId: storyId || null
    });
    db.prepare(`
        UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read},
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Seen},
          json = json_patch(json, $jsonPatch)
        WHERE
          conversationId = $conversationId AND
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen} AND
          isStory = 0 AND
          (${_storyIdPredicate(storyId, isGroup)}) AND
          received_at <= $newestUnreadAt;
        `).run({
      conversationId,
      jsonPatch: JSON.stringify({
        readStatus: import_MessageReadStatus.ReadStatus.Read,
        seenStatus: import_MessageSeenStatus.SeenStatus.Seen
      }),
      newestUnreadAt,
      storyId: storyId || null
    });
    return rows.map((row) => {
      const json = (0, import_util.jsonToObject)(row.json);
      return {
        originalReadStatus: json.readStatus,
        readStatus: import_MessageReadStatus.ReadStatus.Read,
        seenStatus: import_MessageSeenStatus.SeenStatus.Seen,
        ...(0, import_lodash.pick)(json, [
          "expirationStartTimestamp",
          "id",
          "sent_at",
          "source",
          "sourceUuid",
          "type"
        ])
      };
    });
  })();
}
async function getUnreadReactionsAndMarkRead({
  conversationId,
  newestUnreadAt,
  storyId
}) {
  const db = getInstance();
  return db.transaction(() => {
    const unreadMessages = db.prepare(`
        SELECT reactions.rowid, targetAuthorUuid, targetTimestamp, messageId
        FROM reactions
        JOIN messages on messages.id IS reactions.messageId
        WHERE
          unread > 0 AND
          messages.conversationId IS $conversationId AND
          messages.received_at <= $newestUnreadAt AND
          messages.storyId IS $storyId
        ORDER BY messageReceivedAt DESC;
      `).all({
      conversationId,
      newestUnreadAt,
      storyId: storyId || null
    });
    const idsToUpdate = unreadMessages.map((item) => item.rowid);
    (0, import_util.batchMultiVarQuery)(db, idsToUpdate, (ids) => {
      db.prepare(`
        UPDATE reactions SET
        unread = 0 WHERE rowid IN ( ${ids.map(() => "?").join(", ")} );
        `).run(ids);
    });
    return unreadMessages;
  })();
}
async function markReactionAsRead(targetAuthorUuid, targetTimestamp) {
  const db = getInstance();
  return db.transaction(() => {
    const readReaction = db.prepare(`
          SELECT *
          FROM reactions
          WHERE
            targetAuthorUuid = $targetAuthorUuid AND
            targetTimestamp = $targetTimestamp AND
            unread = 1
          ORDER BY rowId DESC
          LIMIT 1;
        `).get({
      targetAuthorUuid,
      targetTimestamp
    });
    db.prepare(`
        UPDATE reactions SET
        unread = 0 WHERE
        targetAuthorUuid = $targetAuthorUuid AND
        targetTimestamp = $targetTimestamp;
      `).run({
      targetAuthorUuid,
      targetTimestamp
    });
    return readReaction;
  })();
}
async function addReaction({
  conversationId,
  emoji,
  fromId,
  messageId,
  messageReceivedAt,
  targetAuthorUuid,
  targetTimestamp
}) {
  const db = getInstance();
  await db.prepare(`INSERT INTO reactions (
      conversationId,
      emoji,
      fromId,
      messageId,
      messageReceivedAt,
      targetAuthorUuid,
      targetTimestamp,
      unread
    ) VALUES (
      $conversationId,
      $emoji,
      $fromId,
      $messageId,
      $messageReceivedAt,
      $targetAuthorUuid,
      $targetTimestamp,
      $unread
    );`).run({
    conversationId,
    emoji,
    fromId,
    messageId,
    messageReceivedAt,
    targetAuthorUuid,
    targetTimestamp,
    unread: 1
  });
}
async function removeReactionFromConversation({
  emoji,
  fromId,
  targetAuthorUuid,
  targetTimestamp
}) {
  const db = getInstance();
  await db.prepare(`DELETE FROM reactions WHERE
      emoji = $emoji AND
      fromId = $fromId AND
      targetAuthorUuid = $targetAuthorUuid AND
      targetTimestamp = $targetTimestamp;`).run({
    emoji,
    fromId,
    targetAuthorUuid,
    targetTimestamp
  });
}
async function _getAllReactions() {
  const db = getInstance();
  return db.prepare("SELECT * from reactions;").all();
}
async function _removeAllReactions() {
  const db = getInstance();
  db.prepare("DELETE from reactions;").run();
}
async function getOlderMessagesByConversation(conversationId, options) {
  return getOlderMessagesByConversationSync(conversationId, options);
}
function getOlderMessagesByConversationSync(conversationId, {
  isGroup,
  limit = 100,
  messageId,
  receivedAt = Number.MAX_VALUE,
  sentAt = Number.MAX_VALUE,
  storyId
}) {
  const db = getInstance();
  return db.prepare(`
      SELECT json FROM messages WHERE
        conversationId = $conversationId AND
        ($messageId IS NULL OR id IS NOT $messageId) AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)}) AND
        (
          (received_at = $received_at AND sent_at < $sent_at) OR
          received_at < $received_at
        )
      ORDER BY received_at DESC, sent_at DESC
      LIMIT $limit;
      `).all({
    conversationId,
    limit,
    messageId: messageId || null,
    received_at: receivedAt,
    sent_at: sentAt,
    storyId: storyId || null
  }).reverse();
}
async function getOlderStories({
  conversationId,
  limit = 9999,
  receivedAt = Number.MAX_VALUE,
  sentAt,
  sourceUuid
}) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json
      FROM messages
      WHERE
        type IS 'story' AND
        ($conversationId IS NULL OR conversationId IS $conversationId) AND
        ($sourceUuid IS NULL OR sourceUuid IS $sourceUuid) AND
        (received_at < $receivedAt
          OR (received_at IS $receivedAt AND sent_at < $sentAt)
        )
      ORDER BY received_at ASC, sent_at ASC
      LIMIT $limit;
      `).all({
    conversationId: conversationId || null,
    receivedAt,
    sentAt: sentAt || null,
    sourceUuid: sourceUuid || null,
    limit
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getNewerMessagesByConversation(conversationId, options) {
  return getNewerMessagesByConversationSync(conversationId, options);
}
function getNewerMessagesByConversationSync(conversationId, {
  isGroup,
  limit = 100,
  receivedAt = 0,
  sentAt = 0,
  storyId
}) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json FROM messages WHERE
        conversationId = $conversationId AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)}) AND
        (
          (received_at = $received_at AND sent_at > $sent_at) OR
          received_at > $received_at
        )
      ORDER BY received_at ASC, sent_at ASC
      LIMIT $limit;
      `).all({
    conversationId,
    limit,
    received_at: receivedAt,
    sent_at: sentAt,
    storyId: storyId || null
  });
  return rows;
}
function getOldestMessageForConversation(conversationId, storyId, isGroup) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT * FROM messages WHERE
        conversationId = $conversationId AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)})
      ORDER BY received_at ASC, sent_at ASC
      LIMIT 1;
      `).get({
    conversationId,
    storyId: storyId || null
  });
  if (!row) {
    return void 0;
  }
  return row;
}
function getNewestMessageForConversation(conversationId, storyId, isGroup) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT * FROM messages WHERE
        conversationId = $conversationId AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)})
      ORDER BY received_at DESC, sent_at DESC
      LIMIT 1;
      `).get({
    conversationId,
    storyId: storyId || null
  });
  if (!row) {
    return void 0;
  }
  return row;
}
function getLastConversationActivity({
  conversationId,
  isGroup,
  ourUuid
}) {
  const db = getInstance();
  const row = prepare(db, `
      SELECT json FROM messages
      WHERE
        conversationId = $conversationId AND
        shouldAffectActivity IS 1 AND
        isTimerChangeFromSync IS 0 AND
        ${isGroup ? "storyId IS NULL AND" : ""}
        isGroupLeaveEventFromOther IS 0
      ORDER BY received_at DESC, sent_at DESC
      LIMIT 1;
      `).get({
    conversationId,
    ourUuid
  });
  if (!row) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(row.json);
}
function getLastConversationPreview({
  conversationId,
  isGroup
}) {
  const db = getInstance();
  const row = prepare(db, `
      SELECT json FROM messages
      WHERE
        conversationId = $conversationId AND
        shouldAffectPreview IS 1 AND
        isGroupLeaveEventFromOther IS 0 AND
        ${isGroup ? "storyId IS NULL AND" : ""}
        (
          expiresAt IS NULL
          OR
          expiresAt > $now
        )
      ORDER BY received_at DESC, sent_at DESC
      LIMIT 1;
      `).get({
    conversationId,
    now: Date.now()
  });
  if (!row) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(row.json);
}
async function getConversationMessageStats({
  conversationId,
  isGroup,
  ourUuid
}) {
  const db = getInstance();
  return db.transaction(() => {
    return {
      activity: getLastConversationActivity({
        conversationId,
        isGroup,
        ourUuid
      }),
      preview: getLastConversationPreview({ conversationId, isGroup }),
      hasUserInitiatedMessages: hasUserInitiatedMessages(conversationId)
    };
  })();
}
async function getLastConversationMessage({
  conversationId
}) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT * FROM messages WHERE
        conversationId = $conversationId
      ORDER BY received_at DESC, sent_at DESC
      LIMIT 1;
      `).get({
    conversationId
  });
  if (!row) {
    return void 0;
  }
  return (0, import_util.jsonToObject)(row.json);
}
function getOldestUnseenMessageForConversation(conversationId, storyId, isGroup) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT * FROM messages WHERE
        conversationId = $conversationId AND
        seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen} AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)})
      ORDER BY received_at ASC, sent_at ASC
      LIMIT 1;
      `).get({
    conversationId,
    storyId: storyId || null
  });
  if (!row) {
    return void 0;
  }
  return row;
}
async function getTotalUnreadForConversation(conversationId, options) {
  return getTotalUnreadForConversationSync(conversationId, options);
}
function getTotalUnreadForConversationSync(conversationId, {
  storyId,
  isGroup
}) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT count(id)
      FROM messages
      WHERE
        conversationId = $conversationId AND
        readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)})
      `).get({
    conversationId,
    storyId: storyId || null
  });
  if (!row) {
    throw new Error("getTotalUnreadForConversation: Unable to get count");
  }
  return row["count(id)"];
}
function getTotalUnseenForConversationSync(conversationId, storyId, isGroup) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT count(id)
      FROM messages
      WHERE
        conversationId = $conversationId AND
        seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen} AND
        isStory IS 0 AND
        (${_storyIdPredicate(storyId, isGroup)})
      `).get({
    conversationId,
    storyId: storyId || null
  });
  if (!row) {
    throw new Error("getTotalUnseenForConversationSync: Unable to get count");
  }
  return row["count(id)"];
}
async function getMessageMetricsForConversation(conversationId, storyId, isGroup) {
  return getMessageMetricsForConversationSync(conversationId, storyId, isGroup);
}
function getMessageMetricsForConversationSync(conversationId, storyId, isGroup) {
  const oldest = getOldestMessageForConversation(conversationId, storyId, isGroup);
  const newest = getNewestMessageForConversation(conversationId, storyId, isGroup);
  const oldestUnseen = getOldestUnseenMessageForConversation(conversationId, storyId, isGroup);
  const totalUnseen = getTotalUnseenForConversationSync(conversationId, storyId, isGroup);
  return {
    oldest: oldest ? (0, import_lodash.pick)(oldest, ["received_at", "sent_at", "id"]) : void 0,
    newest: newest ? (0, import_lodash.pick)(newest, ["received_at", "sent_at", "id"]) : void 0,
    oldestUnseen: oldestUnseen ? (0, import_lodash.pick)(oldestUnseen, ["received_at", "sent_at", "id"]) : void 0,
    totalUnseen
  };
}
async function getConversationRangeCenteredOnMessage({
  conversationId,
  isGroup,
  limit,
  messageId,
  receivedAt,
  sentAt,
  storyId
}) {
  const db = getInstance();
  return db.transaction(() => {
    return {
      older: getOlderMessagesByConversationSync(conversationId, {
        isGroup,
        limit,
        messageId,
        receivedAt,
        sentAt,
        storyId
      }),
      newer: getNewerMessagesByConversationSync(conversationId, {
        isGroup,
        limit,
        receivedAt,
        sentAt,
        storyId
      }),
      metrics: getMessageMetricsForConversationSync(conversationId, storyId, isGroup)
    };
  })();
}
async function hasGroupCallHistoryMessage(conversationId, eraId) {
  const db = getInstance();
  const row = db.prepare(`
      SELECT count(*) FROM messages
      WHERE conversationId = $conversationId
      AND type = 'call-history'
      AND json_extract(json, '$.callHistoryDetails.callMode') = 'Group'
      AND json_extract(json, '$.callHistoryDetails.eraId') = $eraId
      LIMIT 1;
      `).get({
    conversationId,
    eraId
  });
  if (row) {
    return Boolean(row["count(*)"]);
  }
  return false;
}
async function migrateConversationMessages(obsoleteId, currentId) {
  const db = getInstance();
  db.prepare(`
    UPDATE messages SET
      conversationId = $currentId,
      json = json_set(json, '$.conversationId', $currentId)
    WHERE conversationId = $obsoleteId;
    `).run({
    obsoleteId,
    currentId
  });
}
async function getMessagesBySentAt(sentAt) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json FROM messages
      WHERE sent_at = $sent_at
      ORDER BY received_at DESC, sent_at DESC;
      `).all({
    sent_at: sentAt
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getExpiredMessages() {
  const db = getInstance();
  const now = Date.now();
  const rows = db.prepare(`
      SELECT json FROM messages WHERE
        expiresAt IS NOT NULL AND
        expiresAt <= $now
      ORDER BY expiresAt ASC;
      `).all({ now });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getMessagesUnexpectedlyMissingExpirationStartTimestamp() {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json FROM messages
      INDEXED BY messages_unexpectedly_missing_expiration_start_timestamp
      WHERE
        expireTimer > 0 AND
        expirationStartTimestamp IS NULL AND
        (
          type IS 'outgoing' OR
          (type IS 'incoming' AND (
            readStatus = ${import_MessageReadStatus.ReadStatus.Read} OR
            readStatus = ${import_MessageReadStatus.ReadStatus.Viewed} OR
            readStatus IS NULL
          ))
        );
      `).all();
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getSoonestMessageExpiry() {
  const db = getInstance();
  const result = db.prepare(`
      SELECT MIN(expiresAt)
      FROM messages;
      `).pluck(true).get();
  return result || void 0;
}
async function getNextTapToViewMessageTimestampToAgeOut() {
  const db = getInstance();
  const row = db.prepare(`
      SELECT json FROM messages
      WHERE
        isViewOnce = 1
        AND (isErased IS NULL OR isErased != 1)
      ORDER BY received_at ASC, sent_at ASC
      LIMIT 1;
      `).get();
  if (!row) {
    return void 0;
  }
  const data = (0, import_util.jsonToObject)(row.json);
  const result = data.received_at_ms || data.received_at;
  return (0, import_isNormalNumber.isNormalNumber)(result) ? result : void 0;
}
async function getTapToViewMessagesNeedingErase() {
  const db = getInstance();
  const THIRTY_DAYS_AGO = Date.now() - 30 * 24 * 60 * 60 * 1e3;
  const rows = db.prepare(`
      SELECT json
      FROM messages
      WHERE
        isViewOnce = 1
        AND (isErased IS NULL OR isErased != 1)
        AND received_at <= $THIRTY_DAYS_AGO
      ORDER BY received_at ASC, sent_at ASC;
      `).all({
    THIRTY_DAYS_AGO
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
const MAX_UNPROCESSED_ATTEMPTS = 3;
function saveUnprocessedSync(data) {
  const db = getInstance();
  const {
    id,
    timestamp,
    receivedAtCounter,
    version,
    attempts,
    envelope,
    source,
    sourceUuid,
    sourceDevice,
    serverGuid,
    serverTimestamp,
    decrypted
  } = data;
  if (!id) {
    throw new Error("saveUnprocessedSync: id was falsey");
  }
  if (attempts >= MAX_UNPROCESSED_ATTEMPTS) {
    removeUnprocessedSync(id);
    return id;
  }
  prepare(db, `
    INSERT OR REPLACE INTO unprocessed (
      id,
      timestamp,
      receivedAtCounter,
      version,
      attempts,
      envelope,
      source,
      sourceUuid,
      sourceDevice,
      serverGuid,
      serverTimestamp,
      decrypted
    ) values (
      $id,
      $timestamp,
      $receivedAtCounter,
      $version,
      $attempts,
      $envelope,
      $source,
      $sourceUuid,
      $sourceDevice,
      $serverGuid,
      $serverTimestamp,
      $decrypted
    );
    `).run({
    id,
    timestamp,
    receivedAtCounter: receivedAtCounter ?? null,
    version,
    attempts,
    envelope: envelope || null,
    source: source || null,
    sourceUuid: sourceUuid || null,
    sourceDevice: sourceDevice || null,
    serverGuid: serverGuid || null,
    serverTimestamp: serverTimestamp || null,
    decrypted: decrypted || null
  });
  return id;
}
function updateUnprocessedWithDataSync(id, data) {
  const db = getInstance();
  const {
    source,
    sourceUuid,
    sourceDevice,
    serverGuid,
    serverTimestamp,
    decrypted
  } = data;
  prepare(db, `
    UPDATE unprocessed SET
      source = $source,
      sourceUuid = $sourceUuid,
      sourceDevice = $sourceDevice,
      serverGuid = $serverGuid,
      serverTimestamp = $serverTimestamp,
      decrypted = $decrypted
    WHERE id = $id;
    `).run({
    id,
    source: source || null,
    sourceUuid: sourceUuid || null,
    sourceDevice: sourceDevice || null,
    serverGuid: serverGuid || null,
    serverTimestamp: serverTimestamp || null,
    decrypted: decrypted || null
  });
}
async function updateUnprocessedWithData(id, data) {
  return updateUnprocessedWithDataSync(id, data);
}
async function updateUnprocessedsWithData(arrayOfUnprocessed) {
  const db = getInstance();
  db.transaction(() => {
    for (const { id, data } of arrayOfUnprocessed) {
      (0, import_assert.assertSync)(updateUnprocessedWithDataSync(id, data));
    }
  })();
}
async function getUnprocessedById(id) {
  const db = getInstance();
  const row = db.prepare("SELECT * FROM unprocessed WHERE id = $id;").get({
    id
  });
  return row;
}
async function getUnprocessedCount() {
  return (0, import_util.getCountFromTable)(getInstance(), "unprocessed");
}
async function getAllUnprocessedAndIncrementAttempts() {
  const db = getInstance();
  return db.transaction(() => {
    const { changes: deletedStaleCount } = db.prepare("DELETE FROM unprocessed WHERE timestamp < $monthAgo").run({
      monthAgo: Date.now() - durations.MONTH
    });
    if (deletedStaleCount !== 0) {
      logger.warn(`getAllUnprocessedAndIncrementAttempts: deleting ${deletedStaleCount} old unprocessed envelopes`);
    }
    db.prepare(`
        UPDATE unprocessed
        SET attempts = attempts + 1
      `).run();
    const { changes: deletedInvalidCount } = db.prepare(`
          DELETE FROM unprocessed
          WHERE attempts >= $MAX_UNPROCESSED_ATTEMPTS
        `).run({ MAX_UNPROCESSED_ATTEMPTS });
    if (deletedInvalidCount !== 0) {
      logger.warn(`getAllUnprocessedAndIncrementAttempts: deleting ${deletedInvalidCount} invalid unprocessed envelopes`);
    }
    return db.prepare(`
          SELECT *
          FROM unprocessed
          ORDER BY receivedAtCounter ASC;
        `).all();
  })();
}
function removeUnprocessedsSync(ids) {
  const db = getInstance();
  db.prepare(`
    DELETE FROM unprocessed
    WHERE id IN ( ${ids.map(() => "?").join(", ")} );
    `).run(ids);
}
function removeUnprocessedSync(id) {
  const db = getInstance();
  if (!Array.isArray(id)) {
    prepare(db, "DELETE FROM unprocessed WHERE id = $id;").run({ id });
    return;
  }
  if (!id.length) {
    return;
  }
  (0, import_assert.assertSync)((0, import_util.batchMultiVarQuery)(db, id, removeUnprocessedsSync));
}
async function removeUnprocessed(id) {
  removeUnprocessedSync(id);
}
async function removeAllUnprocessed() {
  const db = getInstance();
  db.prepare("DELETE FROM unprocessed;").run();
}
const ATTACHMENT_DOWNLOADS_TABLE = "attachment_downloads";
async function getAttachmentDownloadJobById(id) {
  return (0, import_util.getById)(getInstance(), ATTACHMENT_DOWNLOADS_TABLE, id);
}
async function getNextAttachmentDownloadJobs(limit, options = {}) {
  const db = getInstance();
  const timestamp = options && options.timestamp ? options.timestamp : Date.now();
  const rows = db.prepare(`
      SELECT json
      FROM attachment_downloads
      WHERE pending = 0 AND timestamp <= $timestamp
      ORDER BY timestamp DESC
      LIMIT $limit;
      `).all({
    limit: limit || 3,
    timestamp
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function saveAttachmentDownloadJob(job) {
  const db = getInstance();
  const { id, pending, timestamp } = job;
  if (!id) {
    throw new Error("saveAttachmentDownloadJob: Provided job did not have a truthy id");
  }
  db.prepare(`
    INSERT OR REPLACE INTO attachment_downloads (
      id,
      pending,
      timestamp,
      json
    ) values (
      $id,
      $pending,
      $timestamp,
      $json
    )
    `).run({
    id,
    pending,
    timestamp,
    json: (0, import_util.objectToJSON)(job)
  });
}
async function setAttachmentDownloadJobPending(id, pending) {
  const db = getInstance();
  db.prepare(`
    UPDATE attachment_downloads
    SET pending = $pending
    WHERE id = $id;
    `).run({
    id,
    pending: pending ? 1 : 0
  });
}
async function resetAttachmentDownloadPending() {
  const db = getInstance();
  db.prepare(`
    UPDATE attachment_downloads
    SET pending = 0
    WHERE pending != 0;
    `).run();
}
async function removeAttachmentDownloadJob(id) {
  return (0, import_util.removeById)(getInstance(), ATTACHMENT_DOWNLOADS_TABLE, id);
}
async function removeAllAttachmentDownloadJobs() {
  return (0, import_util.removeAllFromTable)(getInstance(), ATTACHMENT_DOWNLOADS_TABLE);
}
async function createOrUpdateStickerPack(pack) {
  const db = getInstance();
  const {
    attemptedStatus,
    author,
    coverStickerId,
    createdAt,
    downloadAttempts,
    id,
    installedAt,
    key,
    lastUsed,
    status,
    stickerCount,
    title
  } = pack;
  if (!id) {
    throw new Error("createOrUpdateStickerPack: Provided data did not have a truthy id");
  }
  const rows = db.prepare(`
      SELECT id
      FROM sticker_packs
      WHERE id = $id;
      `).all({ id });
  const payload = {
    attemptedStatus: attemptedStatus ?? null,
    author,
    coverStickerId,
    createdAt: createdAt || Date.now(),
    downloadAttempts: downloadAttempts || 1,
    id,
    installedAt: installedAt ?? null,
    key,
    lastUsed: lastUsed || null,
    status,
    stickerCount,
    title
  };
  if (rows && rows.length) {
    db.prepare(`
      UPDATE sticker_packs SET
        attemptedStatus = $attemptedStatus,
        author = $author,
        coverStickerId = $coverStickerId,
        createdAt = $createdAt,
        downloadAttempts = $downloadAttempts,
        installedAt = $installedAt,
        key = $key,
        lastUsed = $lastUsed,
        status = $status,
        stickerCount = $stickerCount,
        title = $title
      WHERE id = $id;
      `).run(payload);
    return;
  }
  db.prepare(`
    INSERT INTO sticker_packs (
      attemptedStatus,
      author,
      coverStickerId,
      createdAt,
      downloadAttempts,
      id,
      installedAt,
      key,
      lastUsed,
      status,
      stickerCount,
      title
    ) values (
      $attemptedStatus,
      $author,
      $coverStickerId,
      $createdAt,
      $downloadAttempts,
      $id,
      $installedAt,
      $key,
      $lastUsed,
      $status,
      $stickerCount,
      $title
    )
    `).run(payload);
}
async function updateStickerPackStatus(id, status, options) {
  const db = getInstance();
  const timestamp = options ? options.timestamp || Date.now() : Date.now();
  const installedAt = status === "installed" ? timestamp : null;
  db.prepare(`
    UPDATE sticker_packs
    SET status = $status, installedAt = $installedAt
    WHERE id = $id;
    `).run({
    id,
    status,
    installedAt
  });
}
async function clearAllErrorStickerPackAttempts() {
  const db = getInstance();
  db.prepare(`
    UPDATE sticker_packs
    SET downloadAttempts = 0
    WHERE status = 'error';
    `).run();
}
async function createOrUpdateSticker(sticker) {
  const db = getInstance();
  const { emoji, height, id, isCoverOnly, lastUsed, packId, path, width } = sticker;
  if (!(0, import_lodash.isNumber)(id)) {
    throw new Error("createOrUpdateSticker: Provided data did not have a numeric id");
  }
  if (!packId) {
    throw new Error("createOrUpdateSticker: Provided data did not have a truthy id");
  }
  db.prepare(`
    INSERT OR REPLACE INTO stickers (
      emoji,
      height,
      id,
      isCoverOnly,
      lastUsed,
      packId,
      path,
      width
    ) values (
      $emoji,
      $height,
      $id,
      $isCoverOnly,
      $lastUsed,
      $packId,
      $path,
      $width
    )
    `).run({
    emoji: emoji ?? null,
    height,
    id,
    isCoverOnly: isCoverOnly ? 1 : 0,
    lastUsed: lastUsed || null,
    packId,
    path,
    width
  });
}
async function updateStickerLastUsed(packId, stickerId, lastUsed) {
  const db = getInstance();
  db.prepare(`
    UPDATE stickers
    SET lastUsed = $lastUsed
    WHERE id = $id AND packId = $packId;
    `).run({
    id: stickerId,
    packId,
    lastUsed
  });
  db.prepare(`
    UPDATE sticker_packs
    SET lastUsed = $lastUsed
    WHERE id = $id;
    `).run({
    id: packId,
    lastUsed
  });
}
async function addStickerPackReference(messageId, packId) {
  const db = getInstance();
  if (!messageId) {
    throw new Error("addStickerPackReference: Provided data did not have a truthy messageId");
  }
  if (!packId) {
    throw new Error("addStickerPackReference: Provided data did not have a truthy packId");
  }
  db.prepare(`
    INSERT OR REPLACE INTO sticker_references (
      messageId,
      packId
    ) values (
      $messageId,
      $packId
    )
    `).run({
    messageId,
    packId
  });
}
async function deleteStickerPackReference(messageId, packId) {
  const db = getInstance();
  if (!messageId) {
    throw new Error("addStickerPackReference: Provided data did not have a truthy messageId");
  }
  if (!packId) {
    throw new Error("addStickerPackReference: Provided data did not have a truthy packId");
  }
  return db.transaction(() => {
    db.prepare(`
        DELETE FROM sticker_references
        WHERE messageId = $messageId AND packId = $packId;
        `).run({
      messageId,
      packId
    });
    const countRow = db.prepare(`
          SELECT count(*) FROM sticker_references
          WHERE packId = $packId;
          `).get({ packId });
    if (!countRow) {
      throw new Error("deleteStickerPackReference: Unable to get count of references");
    }
    const count = countRow["count(*)"];
    if (count > 0) {
      return void 0;
    }
    const packRow = db.prepare(`
          SELECT status FROM sticker_packs
          WHERE id = $packId;
          `).get({ packId });
    if (!packRow) {
      logger.warn("deleteStickerPackReference: did not find referenced pack");
      return void 0;
    }
    const { status } = packRow;
    if (status === "installed") {
      return void 0;
    }
    const stickerPathRows = db.prepare(`
          SELECT path FROM stickers
          WHERE packId = $packId;
          `).all({
      packId
    });
    db.prepare(`
        DELETE FROM sticker_packs
        WHERE id = $packId;
        `).run({
      packId
    });
    return (stickerPathRows || []).map((row) => row.path);
  }).immediate();
}
async function deleteStickerPack(packId) {
  const db = getInstance();
  if (!packId) {
    throw new Error("deleteStickerPack: Provided data did not have a truthy packId");
  }
  return db.transaction(() => {
    const stickerPathRows = db.prepare(`
          SELECT path FROM stickers
          WHERE packId = $packId;
          `).all({
      packId
    });
    db.prepare(`
        DELETE FROM sticker_packs
        WHERE id = $packId;
        `).run({ packId });
    return (stickerPathRows || []).map((row) => row.path);
  }).immediate();
}
async function getStickerCount() {
  return (0, import_util.getCountFromTable)(getInstance(), "stickers");
}
async function getAllStickerPacks() {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT * FROM sticker_packs
      ORDER BY installedAt DESC, createdAt DESC
      `).all();
  return rows || [];
}
async function getAllStickers() {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT * FROM stickers
      ORDER BY packId ASC, id ASC
      `).all();
  return (rows || []).map((row) => rowToSticker(row));
}
async function getRecentStickers({ limit } = {}) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT stickers.* FROM stickers
      JOIN sticker_packs on stickers.packId = sticker_packs.id
      WHERE stickers.lastUsed > 0 AND sticker_packs.status = 'installed'
      ORDER BY stickers.lastUsed DESC
      LIMIT $limit
      `).all({
    limit: limit || 24
  });
  return (rows || []).map((row) => rowToSticker(row));
}
async function updateEmojiUsage(shortName, timeUsed = Date.now()) {
  const db = getInstance();
  db.transaction(() => {
    const rows = db.prepare(`
        SELECT * FROM emojis
        WHERE shortName = $shortName;
        `).get({
      shortName
    });
    if (rows) {
      db.prepare(`
        UPDATE emojis
        SET lastUsage = $timeUsed
        WHERE shortName = $shortName;
        `).run({ shortName, timeUsed });
    } else {
      db.prepare(`
        INSERT INTO emojis(shortName, lastUsage)
        VALUES ($shortName, $timeUsed);
        `).run({ shortName, timeUsed });
    }
  })();
}
async function getRecentEmojis(limit = 32) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT *
      FROM emojis
      ORDER BY lastUsage DESC
      LIMIT $limit;
      `).all({ limit });
  return rows || [];
}
async function getAllBadges() {
  const db = getInstance();
  const [badgeRows, badgeImageFileRows] = db.transaction(() => [
    db.prepare("SELECT * FROM badges").all(),
    db.prepare("SELECT * FROM badgeImageFiles").all()
  ])();
  const badgeImagesByBadge = /* @__PURE__ */ new Map();
  for (const badgeImageFileRow of badgeImageFileRows) {
    const { badgeId, order, localPath, url, theme } = badgeImageFileRow;
    const badgeImages = badgeImagesByBadge.get(badgeId) || [];
    badgeImages[order] = {
      ...badgeImages[order] || {},
      [(0, import_BadgeImageTheme.parseBadgeImageTheme)(theme)]: {
        localPath: (0, import_dropNull.dropNull)(localPath),
        url
      }
    };
    badgeImagesByBadge.set(badgeId, badgeImages);
  }
  return badgeRows.map((badgeRow) => ({
    id: badgeRow.id,
    category: (0, import_BadgeCategory.parseBadgeCategory)(badgeRow.category),
    name: badgeRow.name,
    descriptionTemplate: badgeRow.descriptionTemplate,
    images: (badgeImagesByBadge.get(badgeRow.id) || []).filter(import_isNotNil.isNotNil)
  }));
}
async function updateOrCreateBadges(badges) {
  const db = getInstance();
  const insertBadge = prepare(db, `
    INSERT OR REPLACE INTO badges (
      id,
      category,
      name,
      descriptionTemplate
    ) VALUES (
      $id,
      $category,
      $name,
      $descriptionTemplate
    );
    `);
  const getImageFilesForBadge = prepare(db, "SELECT url, localPath FROM badgeImageFiles WHERE badgeId = $badgeId");
  const insertBadgeImageFile = prepare(db, `
    INSERT INTO badgeImageFiles (
      badgeId,
      'order',
      url,
      localPath,
      theme
    ) VALUES (
      $badgeId,
      $order,
      $url,
      $localPath,
      $theme
    );
    `);
  db.transaction(() => {
    badges.forEach((badge) => {
      const { id: badgeId } = badge;
      const oldLocalPaths = /* @__PURE__ */ new Map();
      for (const { url, localPath } of getImageFilesForBadge.all({ badgeId })) {
        if (localPath) {
          oldLocalPaths.set(url, localPath);
        }
      }
      insertBadge.run({
        id: badgeId,
        category: badge.category,
        name: badge.name,
        descriptionTemplate: badge.descriptionTemplate
      });
      for (const [order, image] of badge.images.entries()) {
        for (const [theme, imageFile] of Object.entries(image)) {
          insertBadgeImageFile.run({
            badgeId,
            localPath: imageFile.localPath || oldLocalPaths.get(imageFile.url) || null,
            order,
            theme,
            url: imageFile.url
          });
        }
      }
    });
  })();
}
async function badgeImageFileDownloaded(url, localPath) {
  const db = getInstance();
  prepare(db, "UPDATE badgeImageFiles SET localPath = $localPath WHERE url = $url").run({ url, localPath });
}
async function getAllBadgeImageFileLocalPaths() {
  const db = getInstance();
  const localPaths = db.prepare("SELECT localPath FROM badgeImageFiles WHERE localPath IS NOT NULL").pluck().all();
  return new Set(localPaths);
}
function hydrateStoryDistribution(fromDatabase) {
  return {
    ...(0, import_lodash.omit)(fromDatabase, "senderKeyInfoJson"),
    senderKeyInfo: fromDatabase.senderKeyInfoJson ? JSON.parse(fromDatabase.senderKeyInfoJson) : void 0
  };
}
function freezeStoryDistribution(story) {
  return {
    ...(0, import_lodash.omit)(story, "senderKeyInfo"),
    senderKeyInfoJson: story.senderKeyInfo ? JSON.stringify(story.senderKeyInfo) : null
  };
}
async function _getAllStoryDistributions() {
  const db = getInstance();
  const storyDistributions = db.prepare("SELECT * FROM storyDistributions;").all();
  return storyDistributions.map(hydrateStoryDistribution);
}
async function _getAllStoryDistributionMembers() {
  const db = getInstance();
  return db.prepare("SELECT * FROM storyDistributionMembers;").all();
}
async function _deleteAllStoryDistributions() {
  const db = getInstance();
  db.prepare("DELETE FROM storyDistributions;").run();
}
async function createNewStoryDistribution(distribution) {
  const db = getInstance();
  db.transaction(() => {
    const payload = freezeStoryDistribution(distribution);
    prepare(db, `
      INSERT INTO storyDistributions(
        id,
        name,
        avatarUrlPath,
        avatarKey,
        senderKeyInfoJson
      ) VALUES (
        $id,
        $name,
        $avatarUrlPath,
        $avatarKey,
        $senderKeyInfoJson
      );
      `).run(payload);
    const { id: listId, members } = distribution;
    const memberInsertStatement = prepare(db, `
      INSERT OR REPLACE INTO storyDistributionMembers (
        listId,
        uuid
      ) VALUES (
        $listId,
        $uuid
      );
      `);
    for (const uuid of members) {
      memberInsertStatement.run({
        listId,
        uuid
      });
    }
  })();
}
async function getAllStoryDistributionsWithMembers() {
  const allDistributions = await _getAllStoryDistributions();
  const allMembers = await _getAllStoryDistributionMembers();
  const byListId = (0, import_lodash.groupBy)(allMembers, (member) => member.listId);
  return allDistributions.map((list) => ({
    ...list,
    members: (byListId[list.id] || []).map((member) => member.uuid)
  }));
}
async function getStoryDistributionWithMembers(id) {
  const db = getInstance();
  const storyDistribution = prepare(db, "SELECT * FROM storyDistributions WHERE id = $id;").get({
    id
  });
  if (!storyDistribution) {
    return void 0;
  }
  const members = prepare(db, "SELECT * FROM storyDistributionMembers WHERE listId = $id;").all({
    id
  });
  return {
    ...storyDistribution,
    members: members.map(({ uuid }) => uuid)
  };
}
async function modifyStoryDistribution(distribution) {
  const payload = freezeStoryDistribution(distribution);
  const db = getInstance();
  prepare(db, `
    UPDATE storyDistributions
    SET
      name = $name,
      avatarUrlPath = $avatarUrlPath,
      avatarKey = $avatarKey,
      senderKeyInfoJson = $senderKeyInfoJson
    WHERE id = $id
    `).run(payload);
}
async function modifyStoryDistributionMembers(listId, {
  toAdd,
  toRemove
}) {
  const db = getInstance();
  db.transaction(() => {
    const memberInsertStatement = prepare(db, `
      INSERT OR REPLACE INTO storyDistributionMembers (
        listId,
        uuid
      ) VALUES (
        $listId,
        $uuid
      );
      `);
    for (const uuid of toAdd) {
      memberInsertStatement.run({
        listId,
        uuid
      });
    }
    (0, import_util.batchMultiVarQuery)(db, toRemove, (uuids) => {
      db.prepare(`
        DELETE FROM storyDistributionMembers
        WHERE listId = ? AND uuid IN ( ${uuids.map(() => "?").join(", ")} );
        `).run([listId, ...uuids]);
    });
  })();
}
async function deleteStoryDistribution(id) {
  const db = getInstance();
  db.prepare("DELETE FROM storyDistributions WHERE id = $id;").run({
    id
  });
}
async function _getAllStoryReads() {
  const db = getInstance();
  return db.prepare("SELECT * FROM storyReads;").all();
}
async function _deleteAllStoryReads() {
  const db = getInstance();
  db.prepare("DELETE FROM storyReads;").run();
}
async function addNewStoryRead(read) {
  const db = getInstance();
  prepare(db, `
    INSERT OR REPLACE INTO storyReads(
      authorId,
      conversationId,
      storyId,
      storyReadDate
    ) VALUES (
      $authorId,
      $conversationId,
      $storyId,
      $storyReadDate
    );
    `).run(read);
}
async function getLastStoryReadsForAuthor({
  authorId,
  conversationId,
  limit: initialLimit
}) {
  const limit = initialLimit || 5;
  const db = getInstance();
  return db.prepare(`
      SELECT * FROM storyReads
      WHERE
        authorId = $authorId AND
        ($conversationId IS NULL OR conversationId = $conversationId)
      ORDER BY storyReadDate DESC
      LIMIT $limit;
      `).all({
    authorId,
    conversationId: conversationId || null,
    limit
  });
}
async function countStoryReadsByConversation(conversationId) {
  const db = getInstance();
  return db.prepare(`
      SELECT COUNT(storyId) FROM storyReads
      WHERE conversationId = $conversationId;
      `).pluck().get({ conversationId });
}
async function removeAll() {
  const db = getInstance();
  db.transaction(() => {
    db.exec(`
      DELETE FROM attachment_downloads;
      DELETE FROM badgeImageFiles;
      DELETE FROM badges;
      DELETE FROM conversations;
      DELETE FROM emojis;
      DELETE FROM groupCallRings;
      DELETE FROM identityKeys;
      DELETE FROM items;
      DELETE FROM jobs;
      DELETE FROM messages_fts;
      DELETE FROM messages;
      DELETE FROM preKeys;
      DELETE FROM reactions;
      DELETE FROM senderKeys;
      DELETE FROM sendLogMessageIds;
      DELETE FROM sendLogPayloads;
      DELETE FROM sendLogRecipients;
      DELETE FROM sessions;
      DELETE FROM signedPreKeys;
      DELETE FROM sticker_packs;
      DELETE FROM sticker_references;
      DELETE FROM stickers;
      DELETE FROM storyDistributionMembers;
      DELETE FROM storyDistributions;
      DELETE FROM storyReads;
      DELETE FROM unprocessed;
    `);
  })();
}
async function removeAllConfiguration(mode = import_RemoveAllConfiguration.RemoveAllConfiguration.Full) {
  const db = getInstance();
  db.transaction(() => {
    db.exec(`
      DELETE FROM identityKeys;
      DELETE FROM jobs;
      DELETE FROM preKeys;
      DELETE FROM senderKeys;
      DELETE FROM sendLogMessageIds;
      DELETE FROM sendLogPayloads;
      DELETE FROM sendLogRecipients;
      DELETE FROM sessions;
      DELETE FROM signedPreKeys;
      DELETE FROM unprocessed;
      `);
    if (mode === import_RemoveAllConfiguration.RemoveAllConfiguration.Full) {
      db.exec(`
        DELETE FROM items;
        `);
    } else if (mode === import_RemoveAllConfiguration.RemoveAllConfiguration.Soft) {
      const itemIds = db.prepare("SELECT id FROM items").pluck(true).all();
      const allowedSet = new Set(import_StorageUIKeys.STORAGE_UI_KEYS);
      for (const id of itemIds) {
        if (!allowedSet.has(id)) {
          (0, import_util.removeById)(db, "items", id);
        }
      }
    } else {
      throw (0, import_missingCaseError.missingCaseError)(mode);
    }
    db.exec("UPDATE conversations SET json = json_remove(json, '$.senderKeyInfo');");
  })();
}
const MAX_MESSAGE_MIGRATION_ATTEMPTS = 5;
async function getMessagesNeedingUpgrade(limit, { maxVersion }) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json
      FROM messages
      WHERE
        (schemaVersion IS NULL OR schemaVersion < $maxVersion) AND
        IFNULL(
          json_extract(json, '$.schemaMigrationAttempts'),
          0
        ) < $maxAttempts
      LIMIT $limit;
      `).all({
    maxVersion,
    maxAttempts: MAX_MESSAGE_MIGRATION_ATTEMPTS,
    limit
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getMessagesWithVisualMediaAttachments(conversationId, { limit }) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json FROM messages WHERE
        isStory IS 0 AND
        storyId IS NULL AND
        conversationId = $conversationId AND
        hasVisualMediaAttachments = 1
      ORDER BY received_at DESC, sent_at DESC
      LIMIT $limit;
      `).all({
    conversationId,
    limit
  });
  return rows.map((row) => (0, import_util.jsonToObject)(row.json));
}
async function getMessagesWithFileAttachments(conversationId, { limit }) {
  const db = getInstance();
  const rows = db.prepare(`
      SELECT json FROM messages WHERE
        isStory IS 0 AND
        storyId IS NULL AND
        conversationId = $conversationId AND
        hasFileAttachments = 1
      ORDER BY received_at DESC, sent_at DESC
      LIMIT $limit;
      `).all({
    conversationId,
    limit
  });
  return (0, import_lodash.map)(rows, (row) => (0, import_util.jsonToObject)(row.json));
}
async function getMessageServerGuidsForSpam(conversationId) {
  const db = getInstance();
  return db.prepare(`
      SELECT serverGuid
      FROM messages
      WHERE conversationId = $conversationId
      AND type = 'incoming'
      AND serverGuid IS NOT NULL
      ORDER BY received_at DESC, sent_at DESC
      LIMIT 3;
      `).pluck(true).all({ conversationId });
}
function getExternalFilesForMessage(message) {
  const { attachments, contact, quote, preview, sticker } = message;
  const files = [];
  (0, import_lodash.forEach)(attachments, (attachment) => {
    const { path: file, thumbnail, screenshot } = attachment;
    if (file) {
      files.push(file);
    }
    if (thumbnail && thumbnail.path) {
      files.push(thumbnail.path);
    }
    if (screenshot && screenshot.path) {
      files.push(screenshot.path);
    }
  });
  if (quote && quote.attachments && quote.attachments.length) {
    (0, import_lodash.forEach)(quote.attachments, (attachment) => {
      const { thumbnail } = attachment;
      if (thumbnail && thumbnail.path) {
        files.push(thumbnail.path);
      }
    });
  }
  if (contact && contact.length) {
    (0, import_lodash.forEach)(contact, (item) => {
      const { avatar } = item;
      if (avatar && avatar.avatar && avatar.avatar.path) {
        files.push(avatar.avatar.path);
      }
    });
  }
  if (preview && preview.length) {
    (0, import_lodash.forEach)(preview, (item) => {
      const { image } = item;
      if (image && image.path) {
        files.push(image.path);
      }
    });
  }
  if (sticker && sticker.data && sticker.data.path) {
    files.push(sticker.data.path);
    if (sticker.data.thumbnail && sticker.data.thumbnail.path) {
      files.push(sticker.data.thumbnail.path);
    }
  }
  return files;
}
function getExternalFilesForConversation(conversation) {
  const { avatar, profileAvatar } = conversation;
  const files = [];
  if (avatar && avatar.path) {
    files.push(avatar.path);
  }
  if (profileAvatar && profileAvatar.path) {
    files.push(profileAvatar.path);
  }
  return files;
}
function getExternalDraftFilesForConversation(conversation) {
  const draftAttachments = conversation.draftAttachments || [];
  const files = [];
  (0, import_lodash.forEach)(draftAttachments, (attachment) => {
    if (attachment.pending) {
      return;
    }
    const { path: file, screenshotPath } = attachment;
    if (file) {
      files.push(file);
    }
    if (screenshotPath) {
      files.push(screenshotPath);
    }
  });
  return files;
}
async function removeKnownAttachments(allAttachments) {
  const db = getInstance();
  const lookup = (0, import_lodash.fromPairs)((0, import_lodash.map)(allAttachments, (file) => [file, true]));
  const chunkSize = 500;
  const total = getMessageCountSync();
  logger.info(`removeKnownAttachments: About to iterate through ${total} messages`);
  let count = 0;
  for (const message of new import_util.TableIterator(db, "messages")) {
    const externalFiles = getExternalFilesForMessage(message);
    (0, import_lodash.forEach)(externalFiles, (file) => {
      delete lookup[file];
    });
    count += 1;
  }
  logger.info(`removeKnownAttachments: Done processing ${count} messages`);
  let complete = false;
  count = 0;
  let id = "";
  const conversationTotal = await getConversationCount();
  logger.info(`removeKnownAttachments: About to iterate through ${conversationTotal} conversations`);
  const fetchConversations = db.prepare(`
      SELECT json FROM conversations
      WHERE id > $id
      ORDER BY id ASC
      LIMIT $chunkSize;
    `);
  while (!complete) {
    const rows = fetchConversations.all({
      id,
      chunkSize
    });
    const conversations = (0, import_lodash.map)(rows, (row) => (0, import_util.jsonToObject)(row.json));
    conversations.forEach((conversation) => {
      const externalFiles = getExternalFilesForConversation(conversation);
      externalFiles.forEach((file) => {
        delete lookup[file];
      });
    });
    const lastMessage = (0, import_lodash.last)(conversations);
    if (lastMessage) {
      ({ id } = lastMessage);
    }
    complete = conversations.length < chunkSize;
    count += conversations.length;
  }
  logger.info(`removeKnownAttachments: Done processing ${count} conversations`);
  return Object.keys(lookup);
}
async function removeKnownStickers(allStickers) {
  const db = getInstance();
  const lookup = (0, import_lodash.fromPairs)((0, import_lodash.map)(allStickers, (file) => [file, true]));
  const chunkSize = 50;
  const total = await getStickerCount();
  logger.info(`removeKnownStickers: About to iterate through ${total} stickers`);
  let count = 0;
  let complete = false;
  let rowid = 0;
  while (!complete) {
    const rows = db.prepare(`
        SELECT rowid, path FROM stickers
        WHERE rowid > $rowid
        ORDER BY rowid ASC
        LIMIT $chunkSize;
        `).all({
      rowid,
      chunkSize
    });
    const files = rows.map((row) => row.path);
    files.forEach((file) => {
      delete lookup[file];
    });
    const lastSticker = (0, import_lodash.last)(rows);
    if (lastSticker) {
      ({ rowid } = lastSticker);
    }
    complete = rows.length < chunkSize;
    count += rows.length;
  }
  logger.info(`removeKnownStickers: Done processing ${count} stickers`);
  return Object.keys(lookup);
}
async function removeKnownDraftAttachments(allStickers) {
  const db = getInstance();
  const lookup = (0, import_lodash.fromPairs)((0, import_lodash.map)(allStickers, (file) => [file, true]));
  const chunkSize = 50;
  const total = await getConversationCount();
  logger.info(`removeKnownDraftAttachments: About to iterate through ${total} conversations`);
  let complete = false;
  let count = 0;
  let id = 0;
  while (!complete) {
    const rows = db.prepare(`
        SELECT json FROM conversations
        WHERE id > $id
        ORDER BY id ASC
        LIMIT $chunkSize;
        `).all({
      id,
      chunkSize
    });
    const conversations = rows.map((row) => (0, import_util.jsonToObject)(row.json));
    conversations.forEach((conversation) => {
      const externalFiles = getExternalDraftFilesForConversation(conversation);
      externalFiles.forEach((file) => {
        delete lookup[file];
      });
    });
    const lastMessage = (0, import_lodash.last)(conversations);
    if (lastMessage) {
      ({ id } = lastMessage);
    }
    complete = conversations.length < chunkSize;
    count += conversations.length;
  }
  logger.info(`removeKnownDraftAttachments: Done processing ${count} conversations`);
  return Object.keys(lookup);
}
async function getJobsInQueue(queueType) {
  const db = getInstance();
  return getJobsInQueueSync(db, queueType);
}
function getJobsInQueueSync(db, queueType) {
  return db.prepare(`
      SELECT id, timestamp, data
      FROM jobs
      WHERE queueType = $queueType
      ORDER BY timestamp;
      `).all({ queueType }).map((row) => ({
    id: row.id,
    queueType,
    timestamp: row.timestamp,
    data: (0, import_isNotNil.isNotNil)(row.data) ? JSON.parse(row.data) : void 0
  }));
}
function insertJobSync(db, job) {
  db.prepare(`
      INSERT INTO jobs
      (id, queueType, timestamp, data)
      VALUES
      ($id, $queueType, $timestamp, $data);
    `).run({
    id: job.id,
    queueType: job.queueType,
    timestamp: job.timestamp,
    data: (0, import_isNotNil.isNotNil)(job.data) ? JSON.stringify(job.data) : null
  });
}
async function insertJob(job) {
  const db = getInstance();
  return insertJobSync(db, job);
}
async function deleteJob(id) {
  const db = getInstance();
  db.prepare("DELETE FROM jobs WHERE id = $id").run({ id });
}
async function processGroupCallRingRequest(ringId) {
  const db = getInstance();
  return db.transaction(() => {
    let result;
    const wasRingPreviouslyCanceled = Boolean(db.prepare(`
          SELECT 1 FROM groupCallRings
          WHERE ringId = $ringId AND isActive = 0
          LIMIT 1;
          `).pluck(true).get({ ringId }));
    if (wasRingPreviouslyCanceled) {
      result = import_Calling.ProcessGroupCallRingRequestResult.RingWasPreviouslyCanceled;
    } else {
      const isThereAnotherActiveRing = Boolean(db.prepare(`
            SELECT 1 FROM groupCallRings
            WHERE isActive = 1
            LIMIT 1;
            `).pluck(true).get());
      if (isThereAnotherActiveRing) {
        result = import_Calling.ProcessGroupCallRingRequestResult.ThereIsAnotherActiveRing;
      } else {
        result = import_Calling.ProcessGroupCallRingRequestResult.ShouldRing;
      }
      db.prepare(`
        INSERT OR IGNORE INTO groupCallRings (ringId, isActive, createdAt)
        VALUES ($ringId, 1, $createdAt);
        `);
    }
    return result;
  })();
}
async function processGroupCallRingCancelation(ringId) {
  const db = getInstance();
  db.prepare(`
    INSERT INTO groupCallRings (ringId, isActive, createdAt)
    VALUES ($ringId, 0, $createdAt)
    ON CONFLICT (ringId) DO
    UPDATE SET isActive = 0;
    `).run({ ringId, createdAt: Date.now() });
}
const MAX_GROUP_CALL_RING_AGE = 30 * durations.MINUTE;
async function cleanExpiredGroupCallRings() {
  const db = getInstance();
  db.prepare(`
    DELETE FROM groupCallRings
    WHERE createdAt < $expiredRingTime;
    `).run({
    expiredRingTime: Date.now() - MAX_GROUP_CALL_RING_AGE
  });
}
async function getMaxMessageCounter() {
  const db = getInstance();
  return db.prepare(`
    SELECT MAX(counter)
    FROM
      (
        SELECT MAX(received_at) AS counter FROM messages
        UNION
        SELECT MAX(timestamp) AS counter FROM unprocessed
      )
    `).pluck().get();
}
async function getStatisticsForLogging() {
  const db = getInstance();
  const counts = await (0, import_p_props.default)({
    messageCount: getMessageCount(),
    conversationCount: getConversationCount(),
    sessionCount: (0, import_util.getCountFromTable)(db, "sessions"),
    senderKeyCount: (0, import_util.getCountFromTable)(db, "senderKeys")
  });
  return (0, import_lodash.mapValues)(counts, import_formatCountForLogging.formatCountForLogging);
}
async function updateAllConversationColors(conversationColor, customColorData) {
  const db = getInstance();
  db.prepare(`
    UPDATE conversations
    SET json = JSON_PATCH(json, $patch);
    `).run({
    patch: JSON.stringify({
      conversationColor: conversationColor || null,
      customColor: customColorData?.value || null,
      customColorId: customColorData?.id || null
    })
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _storyIdPredicate,
  getJobsInQueueSync,
  getMessageByIdSync,
  insertJobSync
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2VydmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCBta2RpcnAgZnJvbSAnbWtkaXJwJztcbmltcG9ydCByaW1yYWYgZnJvbSAncmltcmFmJztcbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UsIFN0YXRlbWVudCB9IGZyb20gJ2JldHRlci1zcWxpdGUzJztcbmltcG9ydCBTUUwgZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuaW1wb3J0IHBQcm9wcyBmcm9tICdwLXByb3BzJztcblxuaW1wb3J0IHR5cGUgeyBEaWN0aW9uYXJ5IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIGZvckVhY2gsXG4gIGZyb21QYWlycyxcbiAgZ3JvdXBCeSxcbiAgaXNOaWwsXG4gIGlzTnVtYmVyLFxuICBpc1N0cmluZyxcbiAgbGFzdCxcbiAgbWFwLFxuICBtYXBWYWx1ZXMsXG4gIG9taXQsXG4gIHBpY2ssXG59IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwVjJNZW1iZXJUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IFJlYWN0aW9uVHlwZSB9IGZyb20gJy4uL3R5cGVzL1JlYWN0aW9ucyc7XG5pbXBvcnQgeyBTVE9SQUdFX1VJX0tFWVMgfSBmcm9tICcuLi90eXBlcy9TdG9yYWdlVUlLZXlzJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgU3RvcmVkSm9iIH0gZnJvbSAnLi4vam9icy90eXBlcyc7XG5pbXBvcnQgeyBhc3NlcnQsIGFzc2VydFN5bmMgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBjb21iaW5lTmFtZXMgfSBmcm9tICcuLi91dGlsL2NvbWJpbmVOYW1lcyc7XG5pbXBvcnQgeyBjb25zb2xlTG9nZ2VyIH0gZnJvbSAnLi4vdXRpbC9jb25zb2xlTG9nZ2VyJztcbmltcG9ydCB7IGRyb3BOdWxsIH0gZnJvbSAnLi4vdXRpbC9kcm9wTnVsbCc7XG5pbXBvcnQgeyBpc05vcm1hbE51bWJlciB9IGZyb20gJy4uL3V0aWwvaXNOb3JtYWxOdW1iZXInO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi4vdXRpbC9wYXJzZUludE9yVGhyb3cnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGZvcm1hdENvdW50Rm9yTG9nZ2luZyB9IGZyb20gJy4uL2xvZ2dpbmcvZm9ybWF0Q291bnRGb3JMb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQ29sb3JUeXBlLCBDdXN0b21Db2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0IH0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgeyBSZW1vdmVBbGxDb25maWd1cmF0aW9uIH0gZnJvbSAnLi4vdHlwZXMvUmVtb3ZlQWxsQ29uZmlndXJhdGlvbic7XG5pbXBvcnQgdHlwZSB7IEJhZGdlVHlwZSwgQmFkZ2VJbWFnZVR5cGUgfSBmcm9tICcuLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgcGFyc2VCYWRnZUNhdGVnb3J5IH0gZnJvbSAnLi4vYmFkZ2VzL0JhZGdlQ2F0ZWdvcnknO1xuaW1wb3J0IHsgcGFyc2VCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgRW1wdHlRdWVyeSwgQXJyYXlRdWVyeSwgUXVlcnksIEpTT05Sb3dzIH0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7XG4gIGpzb25Ub09iamVjdCxcbiAgb2JqZWN0VG9KU09OLFxuICBiYXRjaE11bHRpVmFyUXVlcnksXG4gIGdldENvdW50RnJvbVRhYmxlLFxuICByZW1vdmVCeUlkLFxuICByZW1vdmVBbGxGcm9tVGFibGUsXG4gIGdldEFsbEZyb21UYWJsZSxcbiAgZ2V0QnlJZCxcbiAgYnVsa0FkZCxcbiAgY3JlYXRlT3JVcGRhdGUsXG4gIFRhYmxlSXRlcmF0b3IsXG4gIHNldFVzZXJWZXJzaW9uLFxuICBnZXRVc2VyVmVyc2lvbixcbiAgZ2V0U2NoZW1hVmVyc2lvbixcbn0gZnJvbSAnLi91dGlsJztcbmltcG9ydCB7IHVwZGF0ZVNjaGVtYSB9IGZyb20gJy4vbWlncmF0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQWxsSXRlbXNUeXBlLFxuICBBdHRhY2htZW50RG93bmxvYWRKb2JUeXBlLFxuICBDb252ZXJzYXRpb25NZXRyaWNzVHlwZSxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgRGVsZXRlU2VudFByb3RvUmVjaXBpZW50T3B0aW9uc1R5cGUsXG4gIEVtb2ppVHlwZSxcbiAgSWRlbnRpdHlLZXlJZFR5cGUsXG4gIElkZW50aXR5S2V5VHlwZSxcbiAgSXRlbUtleVR5cGUsXG4gIEl0ZW1UeXBlLFxuICBDb252ZXJzYXRpb25NZXNzYWdlU3RhdHNUeXBlLFxuICBNZXNzYWdlTWV0cmljc1R5cGUsXG4gIE1lc3NhZ2VUeXBlLFxuICBNZXNzYWdlVHlwZVVuaHlkcmF0ZWQsXG4gIFByZUtleUlkVHlwZSxcbiAgUHJlS2V5VHlwZSxcbiAgU2VydmVyU2VhcmNoUmVzdWx0TWVzc2FnZVR5cGUsXG4gIFNlbmRlcktleUlkVHlwZSxcbiAgU2VuZGVyS2V5VHlwZSxcbiAgU2VudE1lc3NhZ2VEQlR5cGUsXG4gIFNlbnRNZXNzYWdlc1R5cGUsXG4gIFNlbnRQcm90b1R5cGUsXG4gIFNlbnRQcm90b1dpdGhNZXNzYWdlSWRzVHlwZSxcbiAgU2VudFJlY2lwaWVudHNEQlR5cGUsXG4gIFNlbnRSZWNpcGllbnRzVHlwZSxcbiAgU2VydmVySW50ZXJmYWNlLFxuICBTZXNzaW9uSWRUeXBlLFxuICBTZXNzaW9uVHlwZSxcbiAgU2lnbmVkUHJlS2V5SWRUeXBlLFxuICBTaWduZWRQcmVLZXlUeXBlLFxuICBTdGlja2VyUGFja1N0YXR1c1R5cGUsXG4gIFN0aWNrZXJQYWNrVHlwZSxcbiAgU3RpY2tlclR5cGUsXG4gIFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVyVHlwZSxcbiAgU3RvcnlEaXN0cmlidXRpb25UeXBlLFxuICBTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzVHlwZSxcbiAgU3RvcnlSZWFkVHlwZSxcbiAgVW5wcm9jZXNzZWRUeXBlLFxuICBVbnByb2Nlc3NlZFVwZGF0ZVR5cGUsXG59IGZyb20gJy4vSW50ZXJmYWNlJztcbmltcG9ydCB7IFNlZW5TdGF0dXMgfSBmcm9tICcuLi9NZXNzYWdlU2VlblN0YXR1cyc7XG5cbnR5cGUgQ29udmVyc2F0aW9uUm93ID0gUmVhZG9ubHk8e1xuICBqc29uOiBzdHJpbmc7XG4gIHByb2ZpbGVMYXN0RmV0Y2hlZEF0OiBudWxsIHwgbnVtYmVyO1xufT47XG50eXBlIENvbnZlcnNhdGlvblJvd3MgPSBBcnJheTxDb252ZXJzYXRpb25Sb3c+O1xudHlwZSBTdGlja2VyUm93ID0gUmVhZG9ubHk8e1xuICBpZDogbnVtYmVyO1xuICBwYWNrSWQ6IHN0cmluZztcbiAgZW1vamk6IHN0cmluZyB8IG51bGw7XG4gIGhlaWdodDogbnVtYmVyO1xuICBpc0NvdmVyT25seTogbnVtYmVyO1xuICBsYXN0VXNlZDogbnVtYmVyO1xuICBwYXRoOiBzdHJpbmc7XG4gIHdpZHRoOiBudW1iZXI7XG59PjtcblxuLy8gQmVjYXVzZSB3ZSBjYW4ndCBmb3JjZSB0aGlzIG1vZHVsZSB0byBjb25mb3JtIHRvIGFuIGludGVyZmFjZSwgd2UgbmFycm93IG91ciBleHBvcnRzXG4vLyAgIHRvIHRoaXMgb25lIGRlZmF1bHQgZXhwb3J0LCB3aGljaCBkb2VzIGNvbmZvcm0gdG8gdGhlIGludGVyZmFjZS5cbi8vIE5vdGU6IEluIEphdmFzY3JpcHQsIHlvdSBuZWVkIHRvIGFjY2VzcyB0aGUgLmRlZmF1bHQgcHJvcGVydHkgd2hlbiByZXF1aXJpbmcgaXRcbi8vIGh0dHBzOi8vZ2l0aHViLmNvbS9taWNyb3NvZnQvVHlwZVNjcmlwdC9pc3N1ZXMvNDIwXG5jb25zdCBkYXRhSW50ZXJmYWNlOiBTZXJ2ZXJJbnRlcmZhY2UgPSB7XG4gIGNsb3NlLFxuICByZW1vdmVEQixcbiAgcmVtb3ZlSW5kZXhlZERCRmlsZXMsXG5cbiAgY3JlYXRlT3JVcGRhdGVJZGVudGl0eUtleSxcbiAgZ2V0SWRlbnRpdHlLZXlCeUlkLFxuICBidWxrQWRkSWRlbnRpdHlLZXlzLFxuICByZW1vdmVJZGVudGl0eUtleUJ5SWQsXG4gIHJlbW92ZUFsbElkZW50aXR5S2V5cyxcbiAgZ2V0QWxsSWRlbnRpdHlLZXlzLFxuXG4gIGNyZWF0ZU9yVXBkYXRlUHJlS2V5LFxuICBnZXRQcmVLZXlCeUlkLFxuICBidWxrQWRkUHJlS2V5cyxcbiAgcmVtb3ZlUHJlS2V5QnlJZCxcbiAgcmVtb3ZlQWxsUHJlS2V5cyxcbiAgZ2V0QWxsUHJlS2V5cyxcblxuICBjcmVhdGVPclVwZGF0ZVNpZ25lZFByZUtleSxcbiAgZ2V0U2lnbmVkUHJlS2V5QnlJZCxcbiAgYnVsa0FkZFNpZ25lZFByZUtleXMsXG4gIHJlbW92ZVNpZ25lZFByZUtleUJ5SWQsXG4gIHJlbW92ZUFsbFNpZ25lZFByZUtleXMsXG4gIGdldEFsbFNpZ25lZFByZUtleXMsXG5cbiAgY3JlYXRlT3JVcGRhdGVJdGVtLFxuICBnZXRJdGVtQnlJZCxcbiAgcmVtb3ZlSXRlbUJ5SWQsXG4gIHJlbW92ZUFsbEl0ZW1zLFxuICBnZXRBbGxJdGVtcyxcblxuICBjcmVhdGVPclVwZGF0ZVNlbmRlcktleSxcbiAgZ2V0U2VuZGVyS2V5QnlJZCxcbiAgcmVtb3ZlQWxsU2VuZGVyS2V5cyxcbiAgZ2V0QWxsU2VuZGVyS2V5cyxcbiAgcmVtb3ZlU2VuZGVyS2V5QnlJZCxcblxuICBpbnNlcnRTZW50UHJvdG8sXG4gIGRlbGV0ZVNlbnRQcm90b3NPbGRlclRoYW4sXG4gIGRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkLFxuICBpbnNlcnRQcm90b1JlY2lwaWVudHMsXG4gIGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCxcbiAgZ2V0U2VudFByb3RvQnlSZWNpcGllbnQsXG4gIHJlbW92ZUFsbFNlbnRQcm90b3MsXG4gIGdldEFsbFNlbnRQcm90b3MsXG4gIF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzLFxuICBfZ2V0QWxsU2VudFByb3RvTWVzc2FnZUlkcyxcblxuICBjcmVhdGVPclVwZGF0ZVNlc3Npb24sXG4gIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvbnMsXG4gIGNvbW1pdERlY3J5cHRSZXN1bHQsXG4gIGJ1bGtBZGRTZXNzaW9ucyxcbiAgcmVtb3ZlU2Vzc2lvbkJ5SWQsXG4gIHJlbW92ZVNlc3Npb25zQnlDb252ZXJzYXRpb24sXG4gIHJlbW92ZUFsbFNlc3Npb25zLFxuICBnZXRBbGxTZXNzaW9ucyxcblxuICBlcmFzZVN0b3JhZ2VTZXJ2aWNlU3RhdGVGcm9tQ29udmVyc2F0aW9ucyxcbiAgZ2V0Q29udmVyc2F0aW9uQ291bnQsXG4gIHNhdmVDb252ZXJzYXRpb24sXG4gIHNhdmVDb252ZXJzYXRpb25zLFxuICBnZXRDb252ZXJzYXRpb25CeUlkLFxuICB1cGRhdGVDb252ZXJzYXRpb24sXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbnMsXG4gIHJlbW92ZUNvbnZlcnNhdGlvbixcbiAgdXBkYXRlQWxsQ29udmVyc2F0aW9uQ29sb3JzLFxuXG4gIGdldEFsbENvbnZlcnNhdGlvbnMsXG4gIGdldEFsbENvbnZlcnNhdGlvbklkcyxcbiAgZ2V0QWxsR3JvdXBzSW52b2x2aW5nVXVpZCxcblxuICBzZWFyY2hNZXNzYWdlcyxcbiAgc2VhcmNoTWVzc2FnZXNJbkNvbnZlcnNhdGlvbixcblxuICBnZXRNZXNzYWdlQ291bnQsXG4gIGdldFN0b3J5Q291bnQsXG4gIHNhdmVNZXNzYWdlLFxuICBzYXZlTWVzc2FnZXMsXG4gIHJlbW92ZU1lc3NhZ2UsXG4gIHJlbW92ZU1lc3NhZ2VzLFxuICBnZXRVbnJlYWRCeUNvbnZlcnNhdGlvbkFuZE1hcmtSZWFkLFxuICBnZXRVbnJlYWRSZWFjdGlvbnNBbmRNYXJrUmVhZCxcbiAgbWFya1JlYWN0aW9uQXNSZWFkLFxuICBhZGRSZWFjdGlvbixcbiAgcmVtb3ZlUmVhY3Rpb25Gcm9tQ29udmVyc2F0aW9uLFxuICBfZ2V0QWxsUmVhY3Rpb25zLFxuICBfcmVtb3ZlQWxsUmVhY3Rpb25zLFxuICBnZXRNZXNzYWdlQnlTZW5kZXIsXG4gIGdldE1lc3NhZ2VCeUlkLFxuICBnZXRNZXNzYWdlc0J5SWQsXG4gIF9nZXRBbGxNZXNzYWdlcyxcbiAgX3JlbW92ZUFsbE1lc3NhZ2VzLFxuICBnZXRBbGxNZXNzYWdlSWRzLFxuICBnZXRNZXNzYWdlc0J5U2VudEF0LFxuICBnZXRFeHBpcmVkTWVzc2FnZXMsXG4gIGdldE1lc3NhZ2VzVW5leHBlY3RlZGx5TWlzc2luZ0V4cGlyYXRpb25TdGFydFRpbWVzdGFtcCxcbiAgZ2V0U29vbmVzdE1lc3NhZ2VFeHBpcnksXG4gIGdldE5leHRUYXBUb1ZpZXdNZXNzYWdlVGltZXN0YW1wVG9BZ2VPdXQsXG4gIGdldFRhcFRvVmlld01lc3NhZ2VzTmVlZGluZ0VyYXNlLFxuICBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG4gIGdldE9sZGVyU3RvcmllcyxcbiAgZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICBnZXRUb3RhbFVucmVhZEZvckNvbnZlcnNhdGlvbixcbiAgZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb24sXG4gIGdldENvbnZlcnNhdGlvblJhbmdlQ2VudGVyZWRPbk1lc3NhZ2UsXG4gIGdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyxcbiAgZ2V0TGFzdENvbnZlcnNhdGlvbk1lc3NhZ2UsXG4gIGhhc0dyb3VwQ2FsbEhpc3RvcnlNZXNzYWdlLFxuICBtaWdyYXRlQ29udmVyc2F0aW9uTWVzc2FnZXMsXG5cbiAgZ2V0VW5wcm9jZXNzZWRDb3VudCxcbiAgZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0cyxcbiAgdXBkYXRlVW5wcm9jZXNzZWRXaXRoRGF0YSxcbiAgdXBkYXRlVW5wcm9jZXNzZWRzV2l0aERhdGEsXG4gIGdldFVucHJvY2Vzc2VkQnlJZCxcbiAgcmVtb3ZlVW5wcm9jZXNzZWQsXG4gIHJlbW92ZUFsbFVucHJvY2Vzc2VkLFxuXG4gIGdldEF0dGFjaG1lbnREb3dubG9hZEpvYkJ5SWQsXG4gIGdldE5leHRBdHRhY2htZW50RG93bmxvYWRKb2JzLFxuICBzYXZlQXR0YWNobWVudERvd25sb2FkSm9iLFxuICByZXNldEF0dGFjaG1lbnREb3dubG9hZFBlbmRpbmcsXG4gIHNldEF0dGFjaG1lbnREb3dubG9hZEpvYlBlbmRpbmcsXG4gIHJlbW92ZUF0dGFjaG1lbnREb3dubG9hZEpvYixcbiAgcmVtb3ZlQWxsQXR0YWNobWVudERvd25sb2FkSm9icyxcblxuICBjcmVhdGVPclVwZGF0ZVN0aWNrZXJQYWNrLFxuICB1cGRhdGVTdGlja2VyUGFja1N0YXR1cyxcbiAgY3JlYXRlT3JVcGRhdGVTdGlja2VyLFxuICB1cGRhdGVTdGlja2VyTGFzdFVzZWQsXG4gIGFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlLFxuICBkZWxldGVTdGlja2VyUGFja1JlZmVyZW5jZSxcbiAgZ2V0U3RpY2tlckNvdW50LFxuICBkZWxldGVTdGlja2VyUGFjayxcbiAgZ2V0QWxsU3RpY2tlclBhY2tzLFxuICBnZXRBbGxTdGlja2VycyxcbiAgZ2V0UmVjZW50U3RpY2tlcnMsXG4gIGNsZWFyQWxsRXJyb3JTdGlja2VyUGFja0F0dGVtcHRzLFxuXG4gIHVwZGF0ZUVtb2ppVXNhZ2UsXG4gIGdldFJlY2VudEVtb2ppcyxcblxuICBnZXRBbGxCYWRnZXMsXG4gIHVwZGF0ZU9yQ3JlYXRlQmFkZ2VzLFxuICBiYWRnZUltYWdlRmlsZURvd25sb2FkZWQsXG5cbiAgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9ucyxcbiAgX2dldEFsbFN0b3J5RGlzdHJpYnV0aW9uTWVtYmVycyxcbiAgX2RlbGV0ZUFsbFN0b3J5RGlzdHJpYnV0aW9ucyxcbiAgY3JlYXRlTmV3U3RvcnlEaXN0cmlidXRpb24sXG4gIGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzLFxuICBnZXRTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzLFxuICBtb2RpZnlTdG9yeURpc3RyaWJ1dGlvbixcbiAgbW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzLFxuICBkZWxldGVTdG9yeURpc3RyaWJ1dGlvbixcblxuICBfZ2V0QWxsU3RvcnlSZWFkcyxcbiAgX2RlbGV0ZUFsbFN0b3J5UmVhZHMsXG4gIGFkZE5ld1N0b3J5UmVhZCxcbiAgZ2V0TGFzdFN0b3J5UmVhZHNGb3JBdXRob3IsXG4gIGNvdW50U3RvcnlSZWFkc0J5Q29udmVyc2F0aW9uLFxuXG4gIHJlbW92ZUFsbCxcbiAgcmVtb3ZlQWxsQ29uZmlndXJhdGlvbixcblxuICBnZXRNZXNzYWdlc05lZWRpbmdVcGdyYWRlLFxuICBnZXRNZXNzYWdlc1dpdGhWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLFxuICBnZXRNZXNzYWdlc1dpdGhGaWxlQXR0YWNobWVudHMsXG4gIGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW0sXG5cbiAgZ2V0Sm9ic0luUXVldWUsXG4gIGluc2VydEpvYixcbiAgZGVsZXRlSm9iLFxuXG4gIHByb2Nlc3NHcm91cENhbGxSaW5nUmVxdWVzdCxcbiAgcHJvY2Vzc0dyb3VwQ2FsbFJpbmdDYW5jZWxhdGlvbixcbiAgY2xlYW5FeHBpcmVkR3JvdXBDYWxsUmluZ3MsXG5cbiAgZ2V0TWF4TWVzc2FnZUNvdW50ZXIsXG5cbiAgZ2V0U3RhdGlzdGljc0ZvckxvZ2dpbmcsXG5cbiAgLy8gU2VydmVyLW9ubHlcblxuICBpbml0aWFsaXplLFxuICBpbml0aWFsaXplUmVuZGVyZXIsXG5cbiAgcmVtb3ZlS25vd25BdHRhY2htZW50cyxcbiAgcmVtb3ZlS25vd25TdGlja2VycyxcbiAgcmVtb3ZlS25vd25EcmFmdEF0dGFjaG1lbnRzLFxuICBnZXRBbGxCYWRnZUltYWdlRmlsZUxvY2FsUGF0aHMsXG59O1xuZXhwb3J0IGRlZmF1bHQgZGF0YUludGVyZmFjZTtcblxudHlwZSBEYXRhYmFzZVF1ZXJ5Q2FjaGUgPSBNYXA8c3RyaW5nLCBTdGF0ZW1lbnQ8QXJyYXk8dW5rbm93bj4+PjtcblxuY29uc3Qgc3RhdGVtZW50Q2FjaGUgPSBuZXcgV2Vha01hcDxEYXRhYmFzZSwgRGF0YWJhc2VRdWVyeUNhY2hlPigpO1xuXG5mdW5jdGlvbiBwcmVwYXJlPFQ+KGRiOiBEYXRhYmFzZSwgcXVlcnk6IHN0cmluZyk6IFN0YXRlbWVudDxUPiB7XG4gIGxldCBkYkNhY2hlID0gc3RhdGVtZW50Q2FjaGUuZ2V0KGRiKTtcbiAgaWYgKCFkYkNhY2hlKSB7XG4gICAgZGJDYWNoZSA9IG5ldyBNYXAoKTtcbiAgICBzdGF0ZW1lbnRDYWNoZS5zZXQoZGIsIGRiQ2FjaGUpO1xuICB9XG5cbiAgbGV0IHJlc3VsdCA9IGRiQ2FjaGUuZ2V0KHF1ZXJ5KSBhcyBTdGF0ZW1lbnQ8VD47XG4gIGlmICghcmVzdWx0KSB7XG4gICAgcmVzdWx0ID0gZGIucHJlcGFyZTxUPihxdWVyeSk7XG4gICAgZGJDYWNoZS5zZXQocXVlcnksIHJlc3VsdCk7XG4gIH1cblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiByb3dUb0NvbnZlcnNhdGlvbihyb3c6IENvbnZlcnNhdGlvblJvdyk6IENvbnZlcnNhdGlvblR5cGUge1xuICBjb25zdCBwYXJzZWRKc29uID0gSlNPTi5wYXJzZShyb3cuanNvbik7XG5cbiAgbGV0IHByb2ZpbGVMYXN0RmV0Y2hlZEF0OiB1bmRlZmluZWQgfCBudW1iZXI7XG4gIGlmIChpc05vcm1hbE51bWJlcihyb3cucHJvZmlsZUxhc3RGZXRjaGVkQXQpKSB7XG4gICAgcHJvZmlsZUxhc3RGZXRjaGVkQXQgPSByb3cucHJvZmlsZUxhc3RGZXRjaGVkQXQ7XG4gIH0gZWxzZSB7XG4gICAgYXNzZXJ0KFxuICAgICAgaXNOaWwocm93LnByb2ZpbGVMYXN0RmV0Y2hlZEF0KSxcbiAgICAgICdwcm9maWxlTGFzdEZldGNoZWRBdCBjb250YWluZWQgaW52YWxpZCBkYXRhOyBkZWZhdWx0aW5nIHRvIHVuZGVmaW5lZCdcbiAgICApO1xuICAgIHByb2ZpbGVMYXN0RmV0Y2hlZEF0ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5wYXJzZWRKc29uLFxuICAgIHByb2ZpbGVMYXN0RmV0Y2hlZEF0LFxuICB9O1xufVxuZnVuY3Rpb24gcm93VG9TdGlja2VyKHJvdzogU3RpY2tlclJvdyk6IFN0aWNrZXJUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5yb3csXG4gICAgaXNDb3Zlck9ubHk6IEJvb2xlYW4ocm93LmlzQ292ZXJPbmx5KSxcbiAgICBlbW9qaTogZHJvcE51bGwocm93LmVtb2ppKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gaXNSZW5kZXJlcigpIHtcbiAgaWYgKHR5cGVvZiBwcm9jZXNzID09PSAndW5kZWZpbmVkJyB8fCAhcHJvY2Vzcykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIHByb2Nlc3MudHlwZSA9PT0gJ3JlbmRlcmVyJztcbn1cblxuZnVuY3Rpb24ga2V5RGF0YWJhc2UoZGI6IERhdGFiYXNlLCBrZXk6IHN0cmluZyk6IHZvaWQge1xuICAvLyBodHRwczovL3d3dy56ZXRldGljLm5ldC9zcWxjaXBoZXIvc3FsY2lwaGVyLWFwaS8ja2V5XG4gIGRiLnByYWdtYShga2V5ID0gXCJ4JyR7a2V5fSdcImApO1xufVxuXG5mdW5jdGlvbiBzd2l0Y2hUb1dBTChkYjogRGF0YWJhc2UpOiB2b2lkIHtcbiAgLy8gaHR0cHM6Ly9zcWxpdGUub3JnL3dhbC5odG1sXG4gIGRiLnByYWdtYSgnam91cm5hbF9tb2RlID0gV0FMJyk7XG4gIGRiLnByYWdtYSgnc3luY2hyb25vdXMgPSBGVUxMJyk7XG59XG5cbmZ1bmN0aW9uIG1pZ3JhdGVTY2hlbWFWZXJzaW9uKGRiOiBEYXRhYmFzZSk6IHZvaWQge1xuICBjb25zdCB1c2VyVmVyc2lvbiA9IGdldFVzZXJWZXJzaW9uKGRiKTtcbiAgaWYgKHVzZXJWZXJzaW9uID4gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNjaGVtYVZlcnNpb24gPSBnZXRTY2hlbWFWZXJzaW9uKGRiKTtcbiAgY29uc3QgbmV3VXNlclZlcnNpb24gPSBzY2hlbWFWZXJzaW9uID4gMTggPyAxNiA6IHNjaGVtYVZlcnNpb247XG4gIGxvZ2dlci5pbmZvKFxuICAgICdtaWdyYXRlU2NoZW1hVmVyc2lvbjogTWlncmF0aW5nIGZyb20gc2NoZW1hX3ZlcnNpb24gJyArXG4gICAgICBgJHtzY2hlbWFWZXJzaW9ufSB0byB1c2VyX3ZlcnNpb24gJHtuZXdVc2VyVmVyc2lvbn1gXG4gICk7XG5cbiAgc2V0VXNlclZlcnNpb24oZGIsIG5ld1VzZXJWZXJzaW9uKTtcbn1cblxuZnVuY3Rpb24gb3BlbkFuZE1pZ3JhdGVEYXRhYmFzZShmaWxlUGF0aDogc3RyaW5nLCBrZXk6IHN0cmluZykge1xuICBsZXQgZGI6IERhdGFiYXNlIHwgdW5kZWZpbmVkO1xuXG4gIC8vIEZpcnN0LCB3ZSB0cnkgdG8gb3BlbiB0aGUgZGF0YWJhc2Ugd2l0aG91dCBhbnkgY2lwaGVyIGNoYW5nZXNcbiAgdHJ5IHtcbiAgICBkYiA9IG5ldyBTUUwoZmlsZVBhdGgpO1xuICAgIGtleURhdGFiYXNlKGRiLCBrZXkpO1xuICAgIHN3aXRjaFRvV0FMKGRiKTtcbiAgICBtaWdyYXRlU2NoZW1hVmVyc2lvbihkYik7XG5cbiAgICByZXR1cm4gZGI7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGRiKSB7XG4gICAgICBkYi5jbG9zZSgpO1xuICAgIH1cbiAgICBsb2dnZXIuaW5mbygnbWlncmF0ZURhdGFiYXNlOiBNaWdyYXRpb24gd2l0aG91dCBjaXBoZXIgY2hhbmdlIGZhaWxlZCcpO1xuICB9XG5cbiAgLy8gSWYgdGhhdCBmYWlscywgd2UgdHJ5IHRvIG9wZW4gdGhlIGRhdGFiYXNlIHdpdGggMy54IGNvbXBhdGliaWxpdHkgdG8gZXh0cmFjdCB0aGVcbiAgLy8gICB1c2VyX3ZlcnNpb24gKHByZXZpb3VzbHkgc3RvcmVkIGluIHNjaGVtYV92ZXJzaW9uLCBibG93biBhd2F5IGJ5IGNpcGhlcl9taWdyYXRlKS5cbiAgZGIgPSBuZXcgU1FMKGZpbGVQYXRoKTtcbiAga2V5RGF0YWJhc2UoZGIsIGtleSk7XG5cbiAgLy8gaHR0cHM6Ly93d3cuemV0ZXRpYy5uZXQvYmxvZy8yMDE4LzExLzMwL3NxbGNpcGhlci00MDAtcmVsZWFzZS8jY29tcGF0YWJpbGl0eS1zcWxjaXBoZXItNC0wLTBcbiAgZGIucHJhZ21hKCdjaXBoZXJfY29tcGF0aWJpbGl0eSA9IDMnKTtcbiAgbWlncmF0ZVNjaGVtYVZlcnNpb24oZGIpO1xuICBkYi5jbG9zZSgpO1xuXG4gIC8vIEFmdGVyIG1pZ3JhdGluZyB1c2VyX3ZlcnNpb24gLT4gc2NoZW1hX3ZlcnNpb24sIHdlIHJlb3BlbiBkYXRhYmFzZSwgYmVjYXVzZSB3ZSBjYW4ndFxuICAvLyAgIG1pZ3JhdGUgdG8gdGhlIGxhdGVzdCBjaXBoZXJzIGFmdGVyIHdlJ3ZlIG1vZGlmaWVkIHRoZSBkZWZhdWx0cy5cbiAgZGIgPSBuZXcgU1FMKGZpbGVQYXRoKTtcbiAga2V5RGF0YWJhc2UoZGIsIGtleSk7XG5cbiAgZGIucHJhZ21hKCdjaXBoZXJfbWlncmF0ZScpO1xuICBzd2l0Y2hUb1dBTChkYik7XG5cbiAgcmV0dXJuIGRiO1xufVxuXG5jb25zdCBJTlZBTElEX0tFWSA9IC9bXjAtOUEtRmEtZl0vO1xuZnVuY3Rpb24gb3BlbkFuZFNldFVwU1FMQ2lwaGVyKGZpbGVQYXRoOiBzdHJpbmcsIHsga2V5IH06IHsga2V5OiBzdHJpbmcgfSkge1xuICBjb25zdCBtYXRjaCA9IElOVkFMSURfS0VZLmV4ZWMoa2V5KTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBzZXR1cFNRTENpcGhlcjoga2V5ICcke2tleX0nIGlzIG5vdCB2YWxpZGApO1xuICB9XG5cbiAgY29uc3QgZGIgPSBvcGVuQW5kTWlncmF0ZURhdGFiYXNlKGZpbGVQYXRoLCBrZXkpO1xuXG4gIC8vIEJlY2F1c2UgZm9yZWlnbiBrZXkgc3VwcG9ydCBpcyBub3QgZW5hYmxlZCBieSBkZWZhdWx0IVxuICBkYi5wcmFnbWEoJ2ZvcmVpZ25fa2V5cyA9IE9OJyk7XG5cbiAgcmV0dXJuIGRiO1xufVxuXG5sZXQgZ2xvYmFsSW5zdGFuY2U6IERhdGFiYXNlIHwgdW5kZWZpbmVkO1xubGV0IGxvZ2dlciA9IGNvbnNvbGVMb2dnZXI7XG5sZXQgZ2xvYmFsSW5zdGFuY2VSZW5kZXJlcjogRGF0YWJhc2UgfCB1bmRlZmluZWQ7XG5sZXQgZGF0YWJhc2VGaWxlUGF0aDogc3RyaW5nIHwgdW5kZWZpbmVkO1xubGV0IGluZGV4ZWREQlBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZDtcblxuYXN5bmMgZnVuY3Rpb24gaW5pdGlhbGl6ZSh7XG4gIGNvbmZpZ0RpcixcbiAga2V5LFxuICBsb2dnZXI6IHN1cHBsaWVkTG9nZ2VyLFxufToge1xuICBjb25maWdEaXI6IHN0cmluZztcbiAga2V5OiBzdHJpbmc7XG4gIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKGdsb2JhbEluc3RhbmNlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3QgaW5pdGlhbGl6ZSBtb3JlIHRoYW4gb25jZSEnKTtcbiAgfVxuXG4gIGlmICghaXNTdHJpbmcoY29uZmlnRGlyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbGl6ZTogY29uZmlnRGlyIGlzIHJlcXVpcmVkIScpO1xuICB9XG4gIGlmICghaXNTdHJpbmcoa2V5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbGl6ZToga2V5IGlzIHJlcXVpcmVkIScpO1xuICB9XG5cbiAgbG9nZ2VyID0gc3VwcGxpZWRMb2dnZXI7XG5cbiAgaW5kZXhlZERCUGF0aCA9IGpvaW4oY29uZmlnRGlyLCAnSW5kZXhlZERCJyk7XG5cbiAgY29uc3QgZGJEaXIgPSBqb2luKGNvbmZpZ0RpciwgJ3NxbCcpO1xuICBta2RpcnAuc3luYyhkYkRpcik7XG5cbiAgZGF0YWJhc2VGaWxlUGF0aCA9IGpvaW4oZGJEaXIsICdkYi5zcWxpdGUnKTtcblxuICBsZXQgZGI6IERhdGFiYXNlIHwgdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgZGIgPSBvcGVuQW5kU2V0VXBTUUxDaXBoZXIoZGF0YWJhc2VGaWxlUGF0aCwgeyBrZXkgfSk7XG5cbiAgICAvLyBGb3IgcHJvZmlsaW5nIHVzZTpcbiAgICAvLyBkYi5wcmFnbWEoJ2NpcGhlcl9wcm9maWxlPVxcJ3NxbGNpcGhlci5sb2dcXCcnKTtcblxuICAgIHVwZGF0ZVNjaGVtYShkYiwgbG9nZ2VyKTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFsbG93IGdlbmVyYWwgYWNjZXNzIHRvIHRoZSBkYXRhYmFzZVxuICAgIGdsb2JhbEluc3RhbmNlID0gZGI7XG5cbiAgICAvLyB0ZXN0IGRhdGFiYXNlXG4gICAgZ2V0TWVzc2FnZUNvdW50U3luYygpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZ2dlci5lcnJvcignRGF0YWJhc2Ugc3RhcnR1cCBlcnJvcjonLCBlcnJvci5zdGFjayk7XG4gICAgaWYgKGRiKSB7XG4gICAgICBkYi5jbG9zZSgpO1xuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBpbml0aWFsaXplUmVuZGVyZXIoe1xuICBjb25maWdEaXIsXG4gIGtleSxcbn06IHtcbiAgY29uZmlnRGlyOiBzdHJpbmc7XG4gIGtleTogc3RyaW5nO1xufSk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIWlzUmVuZGVyZXIoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGNhbGwgZnJvbSBtYWluIHByb2Nlc3MuJyk7XG4gIH1cbiAgaWYgKGdsb2JhbEluc3RhbmNlUmVuZGVyZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpbml0aWFsaXplIG1vcmUgdGhhbiBvbmNlIScpO1xuICB9XG4gIGlmICghaXNTdHJpbmcoY29uZmlnRGlyKSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbGl6ZTogY29uZmlnRGlyIGlzIHJlcXVpcmVkIScpO1xuICB9XG4gIGlmICghaXNTdHJpbmcoa2V5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignaW5pdGlhbGl6ZToga2V5IGlzIHJlcXVpcmVkIScpO1xuICB9XG5cbiAgaWYgKCFpbmRleGVkREJQYXRoKSB7XG4gICAgaW5kZXhlZERCUGF0aCA9IGpvaW4oY29uZmlnRGlyLCAnSW5kZXhlZERCJyk7XG4gIH1cblxuICBjb25zdCBkYkRpciA9IGpvaW4oY29uZmlnRGlyLCAnc3FsJyk7XG5cbiAgaWYgKCFkYXRhYmFzZUZpbGVQYXRoKSB7XG4gICAgZGF0YWJhc2VGaWxlUGF0aCA9IGpvaW4oZGJEaXIsICdkYi5zcWxpdGUnKTtcbiAgfVxuXG4gIGxldCBwcm9taXNpZmllZDogRGF0YWJhc2UgfCB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBwcm9taXNpZmllZCA9IG9wZW5BbmRTZXRVcFNRTENpcGhlcihkYXRhYmFzZUZpbGVQYXRoLCB7IGtleSB9KTtcblxuICAgIC8vIEF0IHRoaXMgcG9pbnQgd2UgY2FuIGFsbG93IGdlbmVyYWwgYWNjZXNzIHRvIHRoZSBkYXRhYmFzZVxuICAgIGdsb2JhbEluc3RhbmNlUmVuZGVyZXIgPSBwcm9taXNpZmllZDtcblxuICAgIC8vIHRlc3QgZGF0YWJhc2VcbiAgICBnZXRNZXNzYWdlQ291bnRTeW5jKCk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKCdEYXRhYmFzZSBzdGFydHVwIGVycm9yOicsIGVycm9yLnN0YWNrKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBjbG9zZSgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgZm9yIChjb25zdCBkYlJlZiBvZiBbZ2xvYmFsSW5zdGFuY2VSZW5kZXJlciwgZ2xvYmFsSW5zdGFuY2VdKSB7XG4gICAgLy8gU1FMTGl0ZSBkb2N1bWVudGF0aW9uIHN1Z2dlc3RzIHRoYXQgd2UgcnVuIGBQUkFHTUEgb3B0aW1pemVgIHJpZ2h0XG4gICAgLy8gYmVmb3JlIGNsb3NpbmcgdGhlIGRhdGFiYXNlIGNvbm5lY3Rpb24uXG4gICAgZGJSZWY/LnByYWdtYSgnb3B0aW1pemUnKTtcblxuICAgIGRiUmVmPy5jbG9zZSgpO1xuICB9XG5cbiAgZ2xvYmFsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIGdsb2JhbEluc3RhbmNlUmVuZGVyZXIgPSB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZURCKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoZ2xvYmFsSW5zdGFuY2UpIHtcbiAgICB0cnkge1xuICAgICAgZ2xvYmFsSW5zdGFuY2UuY2xvc2UoKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKCdyZW1vdmVEQjogRmFpbGVkIHRvIGNsb3NlIGRhdGFiYXNlOicsIGVycm9yLnN0YWNrKTtcbiAgICB9XG4gICAgZ2xvYmFsSW5zdGFuY2UgPSB1bmRlZmluZWQ7XG4gIH1cbiAgaWYgKCFkYXRhYmFzZUZpbGVQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ3JlbW92ZURCOiBDYW5ub3QgZXJhc2UgZGF0YWJhc2Ugd2l0aG91dCBhIGRhdGFiYXNlRmlsZVBhdGghJ1xuICAgICk7XG4gIH1cblxuICBsb2dnZXIud2FybigncmVtb3ZlREI6IFJlbW92aW5nIGFsbCBkYXRhYmFzZSBmaWxlcycpO1xuICByaW1yYWYuc3luYyhkYXRhYmFzZUZpbGVQYXRoKTtcbiAgcmltcmFmLnN5bmMoYCR7ZGF0YWJhc2VGaWxlUGF0aH0tc2htYCk7XG4gIHJpbXJhZi5zeW5jKGAke2RhdGFiYXNlRmlsZVBhdGh9LXdhbGApO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVJbmRleGVkREJGaWxlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFpbmRleGVkREJQYXRoKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ3JlbW92ZUluZGV4ZWREQkZpbGVzOiBOZWVkIHRvIGluaXRpYWxpemUgYW5kIHNldCBpbmRleGVkREJQYXRoIGZpcnN0ISdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgcGF0dGVybiA9IGpvaW4oaW5kZXhlZERCUGF0aCwgJyoubGV2ZWxkYicpO1xuICByaW1yYWYuc3luYyhwYXR0ZXJuKTtcbiAgaW5kZXhlZERCUGF0aCA9IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0SW5zdGFuY2UoKTogRGF0YWJhc2Uge1xuICBpZiAoaXNSZW5kZXJlcigpKSB7XG4gICAgaWYgKCFnbG9iYWxJbnN0YW5jZVJlbmRlcmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldEluc3RhbmNlOiBnbG9iYWxJbnN0YW5jZVJlbmRlcmVyIG5vdCBzZXQhJyk7XG4gICAgfVxuICAgIHJldHVybiBnbG9iYWxJbnN0YW5jZVJlbmRlcmVyO1xuICB9XG5cbiAgaWYgKCFnbG9iYWxJbnN0YW5jZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0SW5zdGFuY2U6IGdsb2JhbEluc3RhbmNlIG5vdCBzZXQhJyk7XG4gIH1cblxuICByZXR1cm4gZ2xvYmFsSW5zdGFuY2U7XG59XG5cbmNvbnN0IElERU5USVRZX0tFWVNfVEFCTEUgPSAnaWRlbnRpdHlLZXlzJztcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlSWRlbnRpdHlLZXkoZGF0YTogSWRlbnRpdHlLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBjcmVhdGVPclVwZGF0ZShnZXRJbnN0YW5jZSgpLCBJREVOVElUWV9LRVlTX1RBQkxFLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldElkZW50aXR5S2V5QnlJZChcbiAgaWQ6IElkZW50aXR5S2V5SWRUeXBlXG4pOiBQcm9taXNlPElkZW50aXR5S2V5VHlwZSB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gZ2V0QnlJZChnZXRJbnN0YW5jZSgpLCBJREVOVElUWV9LRVlTX1RBQkxFLCBpZCk7XG59XG5hc3luYyBmdW5jdGlvbiBidWxrQWRkSWRlbnRpdHlLZXlzKFxuICBhcnJheTogQXJyYXk8SWRlbnRpdHlLZXlUeXBlPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBidWxrQWRkKGdldEluc3RhbmNlKCksIElERU5USVRZX0tFWVNfVEFCTEUsIGFycmF5KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUlkZW50aXR5S2V5QnlJZChpZDogSWRlbnRpdHlLZXlJZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUJ5SWQoZ2V0SW5zdGFuY2UoKSwgSURFTlRJVFlfS0VZU19UQUJMRSwgaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsSWRlbnRpdHlLZXlzKCk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gcmVtb3ZlQWxsRnJvbVRhYmxlKGdldEluc3RhbmNlKCksIElERU5USVRZX0tFWVNfVEFCTEUpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsSWRlbnRpdHlLZXlzKCk6IFByb21pc2U8QXJyYXk8SWRlbnRpdHlLZXlUeXBlPj4ge1xuICByZXR1cm4gZ2V0QWxsRnJvbVRhYmxlKGdldEluc3RhbmNlKCksIElERU5USVRZX0tFWVNfVEFCTEUpO1xufVxuXG5jb25zdCBQUkVfS0VZU19UQUJMRSA9ICdwcmVLZXlzJztcbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlUHJlS2V5KGRhdGE6IFByZUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGNyZWF0ZU9yVXBkYXRlKGdldEluc3RhbmNlKCksIFBSRV9LRVlTX1RBQkxFLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldFByZUtleUJ5SWQoXG4gIGlkOiBQcmVLZXlJZFR5cGVcbik6IFByb21pc2U8UHJlS2V5VHlwZSB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gZ2V0QnlJZChnZXRJbnN0YW5jZSgpLCBQUkVfS0VZU19UQUJMRSwgaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gYnVsa0FkZFByZUtleXMoYXJyYXk6IEFycmF5PFByZUtleVR5cGU+KTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBidWxrQWRkKGdldEluc3RhbmNlKCksIFBSRV9LRVlTX1RBQkxFLCBhcnJheSk7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVQcmVLZXlCeUlkKGlkOiBQcmVLZXlJZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUJ5SWQoZ2V0SW5zdGFuY2UoKSwgUFJFX0tFWVNfVEFCTEUsIGlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbFByZUtleXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiByZW1vdmVBbGxGcm9tVGFibGUoZ2V0SW5zdGFuY2UoKSwgUFJFX0tFWVNfVEFCTEUpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsUHJlS2V5cygpOiBQcm9taXNlPEFycmF5PFByZUtleVR5cGU+PiB7XG4gIHJldHVybiBnZXRBbGxGcm9tVGFibGUoZ2V0SW5zdGFuY2UoKSwgUFJFX0tFWVNfVEFCTEUpO1xufVxuXG5jb25zdCBTSUdORURfUFJFX0tFWVNfVEFCTEUgPSAnc2lnbmVkUHJlS2V5cyc7XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNpZ25lZFByZUtleShcbiAgZGF0YTogU2lnbmVkUHJlS2V5VHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBjcmVhdGVPclVwZGF0ZShnZXRJbnN0YW5jZSgpLCBTSUdORURfUFJFX0tFWVNfVEFCTEUsIGRhdGEpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0U2lnbmVkUHJlS2V5QnlJZChcbiAgaWQ6IFNpZ25lZFByZUtleUlkVHlwZVxuKTogUHJvbWlzZTxTaWduZWRQcmVLZXlUeXBlIHwgdW5kZWZpbmVkPiB7XG4gIHJldHVybiBnZXRCeUlkKGdldEluc3RhbmNlKCksIFNJR05FRF9QUkVfS0VZU19UQUJMRSwgaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gYnVsa0FkZFNpZ25lZFByZUtleXMoXG4gIGFycmF5OiBBcnJheTxTaWduZWRQcmVLZXlUeXBlPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBidWxrQWRkKGdldEluc3RhbmNlKCksIFNJR05FRF9QUkVfS0VZU19UQUJMRSwgYXJyYXkpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlU2lnbmVkUHJlS2V5QnlJZChpZDogU2lnbmVkUHJlS2V5SWRUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiByZW1vdmVCeUlkKGdldEluc3RhbmNlKCksIFNJR05FRF9QUkVfS0VZU19UQUJMRSwgaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsU2lnbmVkUHJlS2V5cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUFsbEZyb21UYWJsZShnZXRJbnN0YW5jZSgpLCBTSUdORURfUFJFX0tFWVNfVEFCTEUpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsU2lnbmVkUHJlS2V5cygpOiBQcm9taXNlPEFycmF5PFNpZ25lZFByZUtleVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb25cbiAgICAgIEZST00gc2lnbmVkUHJlS2V5c1xuICAgICAgT1JERVIgQlkgaWQgQVNDO1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cblxuY29uc3QgSVRFTVNfVEFCTEUgPSAnaXRlbXMnO1xuYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVJdGVtPEsgZXh0ZW5kcyBJdGVtS2V5VHlwZT4oXG4gIGRhdGE6IEl0ZW1UeXBlPEs+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGNyZWF0ZU9yVXBkYXRlKGdldEluc3RhbmNlKCksIElURU1TX1RBQkxFLCBkYXRhKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEl0ZW1CeUlkPEsgZXh0ZW5kcyBJdGVtS2V5VHlwZT4oXG4gIGlkOiBLXG4pOiBQcm9taXNlPEl0ZW1UeXBlPEs+IHwgdW5kZWZpbmVkPiB7XG4gIHJldHVybiBnZXRCeUlkKGdldEluc3RhbmNlKCksIElURU1TX1RBQkxFLCBpZCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRBbGxJdGVtcygpOiBQcm9taXNlPEFsbEl0ZW1zVHlwZT4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvd3M6IEpTT05Sb3dzID0gZGJcbiAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUIGpzb24gRlJPTSBpdGVtcyBPUkRFUiBCWSBpZCBBU0M7JylcbiAgICAuYWxsKCk7XG5cbiAgdHlwZSBSYXdJdGVtVHlwZSA9IHsgaWQ6IEl0ZW1LZXlUeXBlOyB2YWx1ZTogdW5rbm93biB9O1xuXG4gIGNvbnN0IGl0ZW1zID0gcm93cy5tYXAocm93ID0+IGpzb25Ub09iamVjdDxSYXdJdGVtVHlwZT4ocm93Lmpzb24pKTtcblxuICBjb25zdCByZXN1bHQ6IFJlY29yZDxJdGVtS2V5VHlwZSwgdW5rbm93bj4gPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gIGZvciAoY29uc3QgeyBpZCwgdmFsdWUgfSBvZiBpdGVtcykge1xuICAgIHJlc3VsdFtpZF0gPSB2YWx1ZTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQgYXMgdW5rbm93biBhcyBBbGxJdGVtc1R5cGU7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVJdGVtQnlJZChpZDogSXRlbUtleVR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUJ5SWQoZ2V0SW5zdGFuY2UoKSwgSVRFTVNfVEFCTEUsIGlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbEl0ZW1zKCk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gcmVtb3ZlQWxsRnJvbVRhYmxlKGdldEluc3RhbmNlKCksIElURU1TX1RBQkxFKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gY3JlYXRlT3JVcGRhdGVTZW5kZXJLZXkoa2V5OiBTZW5kZXJLZXlUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNyZWF0ZU9yVXBkYXRlU2VuZGVyS2V5U3luYyhrZXkpO1xufVxuXG5mdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNlbmRlcktleVN5bmMoa2V5OiBTZW5kZXJLZXlUeXBlKTogdm9pZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBwcmVwYXJlKFxuICAgIGRiLFxuICAgIGBcbiAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIHNlbmRlcktleXMgKFxuICAgICAgaWQsXG4gICAgICBzZW5kZXJJZCxcbiAgICAgIGRpc3RyaWJ1dGlvbklkLFxuICAgICAgZGF0YSxcbiAgICAgIGxhc3RVcGRhdGVkRGF0ZVxuICAgICkgdmFsdWVzIChcbiAgICAgICRpZCxcbiAgICAgICRzZW5kZXJJZCxcbiAgICAgICRkaXN0cmlidXRpb25JZCxcbiAgICAgICRkYXRhLFxuICAgICAgJGxhc3RVcGRhdGVkRGF0ZVxuICAgIClcbiAgICBgXG4gICkucnVuKGtleSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRTZW5kZXJLZXlCeUlkKFxuICBpZDogU2VuZGVyS2V5SWRUeXBlXG4pOiBQcm9taXNlPFNlbmRlcktleVR5cGUgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3cgPSBwcmVwYXJlKGRiLCAnU0VMRUNUICogRlJPTSBzZW5kZXJLZXlzIFdIRVJFIGlkID0gJGlkJykuZ2V0KHtcbiAgICBpZCxcbiAgfSk7XG5cbiAgcmV0dXJuIHJvdztcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbFNlbmRlcktleXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgcHJlcGFyZTxFbXB0eVF1ZXJ5PihkYiwgJ0RFTEVURSBGUk9NIHNlbmRlcktleXMnKS5ydW4oKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFNlbmRlcktleXMoKTogUHJvbWlzZTxBcnJheTxTZW5kZXJLZXlUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvd3MgPSBwcmVwYXJlPEVtcHR5UXVlcnk+KGRiLCAnU0VMRUNUICogRlJPTSBzZW5kZXJLZXlzJykuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3M7XG59XG5hc3luYyBmdW5jdGlvbiByZW1vdmVTZW5kZXJLZXlCeUlkKGlkOiBTZW5kZXJLZXlJZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBwcmVwYXJlKGRiLCAnREVMRVRFIEZST00gc2VuZGVyS2V5cyBXSEVSRSBpZCA9ICRpZCcpLnJ1bih7IGlkIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnNlcnRTZW50UHJvdG8oXG4gIHByb3RvOiBTZW50UHJvdG9UeXBlLFxuICBvcHRpb25zOiB7XG4gICAgcmVjaXBpZW50czogU2VudFJlY2lwaWVudHNUeXBlO1xuICAgIG1lc3NhZ2VJZHM6IFNlbnRNZXNzYWdlc1R5cGU7XG4gIH1cbik6IFByb21pc2U8bnVtYmVyPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgeyByZWNpcGllbnRzLCBtZXNzYWdlSWRzIH0gPSBvcHRpb25zO1xuXG4gIC8vIE5vdGU6IHdlIHVzZSBgcGx1Y2tgIGluIHRoaXMgZnVuY3Rpb24gdG8gZmV0Y2ggb25seSB0aGUgZmlyc3QgY29sdW1uIG9mIHJldHVybmVkIHJvdy5cblxuICByZXR1cm4gZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIC8vIDEuIEluc2VydCB0aGUgcGF5bG9hZCwgZmV0Y2hpbmcgaXRzIHByaW1hcnkga2V5IGlkXG4gICAgY29uc3QgaW5mbyA9IHByZXBhcmUoXG4gICAgICBkYixcbiAgICAgIGBcbiAgICAgIElOU0VSVCBJTlRPIHNlbmRMb2dQYXlsb2FkcyAoXG4gICAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgICBwcm90byxcbiAgICAgICAgdGltZXN0YW1wXG4gICAgICApIFZBTFVFUyAoXG4gICAgICAgICRjb250ZW50SGludCxcbiAgICAgICAgJHByb3RvLFxuICAgICAgICAkdGltZXN0YW1wXG4gICAgICApO1xuICAgICAgYFxuICAgICkucnVuKHByb3RvKTtcbiAgICBjb25zdCBpZCA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgIGluZm8ubGFzdEluc2VydFJvd2lkLFxuICAgICAgJ2luc2VydFNlbnRQcm90by9sYXN0SW5zZXJ0Um93aWQnXG4gICAgKTtcblxuICAgIC8vIDIuIEluc2VydCBhIHJlY29yZCBmb3IgZWFjaCByZWNpcGllbnQgZGV2aWNlLlxuICAgIGNvbnN0IHJlY2lwaWVudFN0YXRlbWVudCA9IHByZXBhcmUoXG4gICAgICBkYixcbiAgICAgIGBcbiAgICAgIElOU0VSVCBJTlRPIHNlbmRMb2dSZWNpcGllbnRzIChcbiAgICAgICAgcGF5bG9hZElkLFxuICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgICBkZXZpY2VJZFxuICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAkaWQsXG4gICAgICAgICRyZWNpcGllbnRVdWlkLFxuICAgICAgICAkZGV2aWNlSWRcbiAgICAgICk7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGNvbnN0IHJlY2lwaWVudFV1aWRzID0gT2JqZWN0LmtleXMocmVjaXBpZW50cyk7XG4gICAgZm9yIChjb25zdCByZWNpcGllbnRVdWlkIG9mIHJlY2lwaWVudFV1aWRzKSB7XG4gICAgICBjb25zdCBkZXZpY2VJZHMgPSByZWNpcGllbnRzW3JlY2lwaWVudFV1aWRdO1xuXG4gICAgICBmb3IgKGNvbnN0IGRldmljZUlkIG9mIGRldmljZUlkcykge1xuICAgICAgICByZWNpcGllbnRTdGF0ZW1lbnQucnVuKHtcbiAgICAgICAgICBpZCxcbiAgICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgICAgIGRldmljZUlkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyAyLiBJbnNlcnQgYSByZWNvcmQgZm9yIGVhY2ggbWVzc2FnZSByZWZlcmVuY2VkIGJ5IHRoaXMgcGF5bG9hZC5cbiAgICBjb25zdCBtZXNzYWdlU3RhdGVtZW50ID0gcHJlcGFyZShcbiAgICAgIGRiLFxuICAgICAgYFxuICAgICAgSU5TRVJUIElOVE8gc2VuZExvZ01lc3NhZ2VJZHMgKFxuICAgICAgICBwYXlsb2FkSWQsXG4gICAgICAgIG1lc3NhZ2VJZFxuICAgICAgKSBWQUxVRVMgKFxuICAgICAgICAkaWQsXG4gICAgICAgICRtZXNzYWdlSWRcbiAgICAgICk7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGZvciAoY29uc3QgbWVzc2FnZUlkIG9mIG1lc3NhZ2VJZHMpIHtcbiAgICAgIG1lc3NhZ2VTdGF0ZW1lbnQucnVuKHtcbiAgICAgICAgaWQsXG4gICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBpZDtcbiAgfSkoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU2VudFByb3Rvc09sZGVyVGhhbih0aW1lc3RhbXA6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgcHJlcGFyZShcbiAgICBkYixcbiAgICBgXG4gICAgREVMRVRFIEZST00gc2VuZExvZ1BheWxvYWRzXG4gICAgV0hFUkVcbiAgICAgIHRpbWVzdGFtcCBJUyBOVUxMIE9SXG4gICAgICB0aW1lc3RhbXAgPCAkdGltZXN0YW1wO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIHRpbWVzdGFtcCxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkKG1lc3NhZ2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBwcmVwYXJlKFxuICAgIGRiLFxuICAgIGBcbiAgICBERUxFVEUgRlJPTSBzZW5kTG9nUGF5bG9hZHMgV0hFUkUgaWQgSU4gKFxuICAgICAgU0VMRUNUIHBheWxvYWRJZCBGUk9NIHNlbmRMb2dNZXNzYWdlSWRzXG4gICAgICBXSEVSRSBtZXNzYWdlSWQgPSAkbWVzc2FnZUlkXG4gICAgKTtcbiAgICBgXG4gICkucnVuKHtcbiAgICBtZXNzYWdlSWQsXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnNlcnRQcm90b1JlY2lwaWVudHMoe1xuICBpZCxcbiAgcmVjaXBpZW50VXVpZCxcbiAgZGV2aWNlSWRzLFxufToge1xuICBpZDogbnVtYmVyO1xuICByZWNpcGllbnRVdWlkOiBzdHJpbmc7XG4gIGRldmljZUlkczogQXJyYXk8bnVtYmVyPjtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBjb25zdCBzdGF0ZW1lbnQgPSBwcmVwYXJlKFxuICAgICAgZGIsXG4gICAgICBgXG4gICAgICBJTlNFUlQgSU5UTyBzZW5kTG9nUmVjaXBpZW50cyAoXG4gICAgICAgIHBheWxvYWRJZCxcbiAgICAgICAgcmVjaXBpZW50VXVpZCxcbiAgICAgICAgZGV2aWNlSWRcbiAgICAgICkgVkFMVUVTIChcbiAgICAgICAgJGlkLFxuICAgICAgICAkcmVjaXBpZW50VXVpZCxcbiAgICAgICAgJGRldmljZUlkXG4gICAgICApO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IGRldmljZUlkIG9mIGRldmljZUlkcykge1xuICAgICAgc3RhdGVtZW50LnJ1bih7XG4gICAgICAgIGlkLFxuICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgICBkZXZpY2VJZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU2VudFByb3RvUmVjaXBpZW50KFxuICBvcHRpb25zOlxuICAgIHwgRGVsZXRlU2VudFByb3RvUmVjaXBpZW50T3B0aW9uc1R5cGVcbiAgICB8IFJlYWRvbmx5QXJyYXk8RGVsZXRlU2VudFByb3RvUmVjaXBpZW50T3B0aW9uc1R5cGU+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IGl0ZW1zID0gQXJyYXkuaXNBcnJheShvcHRpb25zKSA/IG9wdGlvbnMgOiBbb3B0aW9uc107XG5cbiAgLy8gTm90ZTogd2UgdXNlIGBwbHVja2AgaW4gdGhpcyBmdW5jdGlvbiB0byBmZXRjaCBvbmx5IHRoZSBmaXJzdCBjb2x1bW4gb2ZcbiAgLy8gcmV0dXJuZWQgcm93LlxuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgaXRlbXMpIHtcbiAgICAgIGNvbnN0IHsgdGltZXN0YW1wLCByZWNpcGllbnRVdWlkLCBkZXZpY2VJZCB9ID0gaXRlbTtcblxuICAgICAgLy8gMS4gRmlndXJlIG91dCB3aGF0IHBheWxvYWQgd2UncmUgdGFsa2luZyBhYm91dC5cbiAgICAgIGNvbnN0IHJvd3MgPSBwcmVwYXJlKFxuICAgICAgICBkYixcbiAgICAgICAgYFxuICAgICAgICBTRUxFQ1Qgc2VuZExvZ1BheWxvYWRzLmlkIEZST00gc2VuZExvZ1BheWxvYWRzXG4gICAgICAgIElOTkVSIEpPSU4gc2VuZExvZ1JlY2lwaWVudHNcbiAgICAgICAgICBPTiBzZW5kTG9nUmVjaXBpZW50cy5wYXlsb2FkSWQgPSBzZW5kTG9nUGF5bG9hZHMuaWRcbiAgICAgICAgV0hFUkVcbiAgICAgICAgICBzZW5kTG9nUGF5bG9hZHMudGltZXN0YW1wID0gJHRpbWVzdGFtcCBBTkRcbiAgICAgICAgICBzZW5kTG9nUmVjaXBpZW50cy5yZWNpcGllbnRVdWlkID0gJHJlY2lwaWVudFV1aWQgQU5EXG4gICAgICAgICAgc2VuZExvZ1JlY2lwaWVudHMuZGV2aWNlSWQgPSAkZGV2aWNlSWQ7XG4gICAgICAgYFxuICAgICAgKS5hbGwoeyB0aW1lc3RhbXAsIHJlY2lwaWVudFV1aWQsIGRldmljZUlkIH0pO1xuICAgICAgaWYgKCFyb3dzLmxlbmd0aCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmIChyb3dzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICAgJ2RlbGV0ZVNlbnRQcm90b1JlY2lwaWVudDogTW9yZSB0aGFuIG9uZSBwYXlsb2FkIG1hdGNoZXMgJyArXG4gICAgICAgICAgICBgcmVjaXBpZW50IGFuZCB0aW1lc3RhbXAgJHt0aW1lc3RhbXB9LiBVc2luZyB0aGUgZmlyc3QuYFxuICAgICAgICApO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBpZCB9ID0gcm93c1swXTtcblxuICAgICAgLy8gMi4gRGVsZXRlIHRoZSByZWNpcGllbnQvZGV2aWNlIGNvbWJpbmF0aW9uIGluIHF1ZXN0aW9uLlxuICAgICAgcHJlcGFyZShcbiAgICAgICAgZGIsXG4gICAgICAgIGBcbiAgICAgICAgREVMRVRFIEZST00gc2VuZExvZ1JlY2lwaWVudHNcbiAgICAgICAgV0hFUkVcbiAgICAgICAgICBwYXlsb2FkSWQgPSAkaWQgQU5EXG4gICAgICAgICAgcmVjaXBpZW50VXVpZCA9ICRyZWNpcGllbnRVdWlkIEFORFxuICAgICAgICAgIGRldmljZUlkID0gJGRldmljZUlkO1xuICAgICAgICBgXG4gICAgICApLnJ1bih7IGlkLCByZWNpcGllbnRVdWlkLCBkZXZpY2VJZCB9KTtcblxuICAgICAgLy8gMy4gU2VlIGhvdyBtYW55IG1vcmUgcmVjaXBpZW50IGRldmljZXMgdGhlcmUgd2VyZSBmb3IgdGhpcyBwYXlsb2FkLlxuICAgICAgY29uc3QgcmVtYWluaW5nID0gcHJlcGFyZShcbiAgICAgICAgZGIsXG4gICAgICAgICdTRUxFQ1QgY291bnQoKikgRlJPTSBzZW5kTG9nUmVjaXBpZW50cyBXSEVSRSBwYXlsb2FkSWQgPSAkaWQ7J1xuICAgICAgKVxuICAgICAgICAucGx1Y2sodHJ1ZSlcbiAgICAgICAgLmdldCh7IGlkIH0pO1xuXG4gICAgICBpZiAoIWlzTnVtYmVyKHJlbWFpbmluZykpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdkZWxldGVTZW50UHJvdG9SZWNpcGllbnQ6IHNlbGVjdCBjb3VudCgpIHJldHVybmVkIG5vbi1udW1iZXIhJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVtYWluaW5nID4gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgLy8gNC4gRGVsZXRlIHRoZSBlbnRpcmUgcGF5bG9hZCBpZiB0aGVyZSBhcmUgbm8gbW9yZSByZWNpcGllbnRzIGxlZnQuXG4gICAgICBsb2dnZXIuaW5mbyhcbiAgICAgICAgJ2RlbGV0ZVNlbnRQcm90b1JlY2lwaWVudDogJyArXG4gICAgICAgICAgYERlbGV0aW5nIHByb3RvIHBheWxvYWQgZm9yIHRpbWVzdGFtcCAke3RpbWVzdGFtcH1gXG4gICAgICApO1xuICAgICAgcHJlcGFyZShkYiwgJ0RFTEVURSBGUk9NIHNlbmRMb2dQYXlsb2FkcyBXSEVSRSBpZCA9ICRpZDsnKS5ydW4oe1xuICAgICAgICBpZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U2VudFByb3RvQnlSZWNpcGllbnQoe1xuICBub3csXG4gIHJlY2lwaWVudFV1aWQsXG4gIHRpbWVzdGFtcCxcbn06IHtcbiAgbm93OiBudW1iZXI7XG4gIHJlY2lwaWVudFV1aWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG59KTogUHJvbWlzZTxTZW50UHJvdG9XaXRoTWVzc2FnZUlkc1R5cGUgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IEhPVVIgPSAxMDAwICogNjAgKiA2MDtcbiAgY29uc3Qgb25lRGF5QWdvID0gbm93IC0gSE9VUiAqIDI0O1xuXG4gIGF3YWl0IGRlbGV0ZVNlbnRQcm90b3NPbGRlclRoYW4ob25lRGF5QWdvKTtcblxuICBjb25zdCByb3cgPSBwcmVwYXJlKFxuICAgIGRiLFxuICAgIGBcbiAgICBTRUxFQ1RcbiAgICAgIHNlbmRMb2dQYXlsb2Fkcy4qLFxuICAgICAgR1JPVVBfQ09OQ0FUKERJU1RJTkNUIHNlbmRMb2dNZXNzYWdlSWRzLm1lc3NhZ2VJZCkgQVMgbWVzc2FnZUlkc1xuICAgIEZST00gc2VuZExvZ1BheWxvYWRzXG4gICAgSU5ORVIgSk9JTiBzZW5kTG9nUmVjaXBpZW50cyBPTiBzZW5kTG9nUmVjaXBpZW50cy5wYXlsb2FkSWQgPSBzZW5kTG9nUGF5bG9hZHMuaWRcbiAgICBMRUZUIEpPSU4gc2VuZExvZ01lc3NhZ2VJZHMgT04gc2VuZExvZ01lc3NhZ2VJZHMucGF5bG9hZElkID0gc2VuZExvZ1BheWxvYWRzLmlkXG4gICAgV0hFUkVcbiAgICAgIHNlbmRMb2dQYXlsb2Fkcy50aW1lc3RhbXAgPSAkdGltZXN0YW1wIEFORFxuICAgICAgc2VuZExvZ1JlY2lwaWVudHMucmVjaXBpZW50VXVpZCA9ICRyZWNpcGllbnRVdWlkXG4gICAgR1JPVVAgQlkgc2VuZExvZ1BheWxvYWRzLmlkO1xuICAgIGBcbiAgKS5nZXQoe1xuICAgIHRpbWVzdGFtcCxcbiAgICByZWNpcGllbnRVdWlkLFxuICB9KTtcblxuICBpZiAoIXJvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IG1lc3NhZ2VJZHMgfSA9IHJvdztcbiAgcmV0dXJuIHtcbiAgICAuLi5yb3csXG4gICAgbWVzc2FnZUlkczogbWVzc2FnZUlkcyA/IG1lc3NhZ2VJZHMuc3BsaXQoJywnKSA6IFtdLFxuICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsU2VudFByb3RvcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBwcmVwYXJlPEVtcHR5UXVlcnk+KGRiLCAnREVMRVRFIEZST00gc2VuZExvZ1BheWxvYWRzOycpLnJ1bigpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsU2VudFByb3RvcygpOiBQcm9taXNlPEFycmF5PFNlbnRQcm90b1R5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93cyA9IHByZXBhcmU8RW1wdHlRdWVyeT4oZGIsICdTRUxFQ1QgKiBGUk9NIHNlbmRMb2dQYXlsb2FkczsnKS5hbGwoKTtcblxuICByZXR1cm4gcm93cztcbn1cbmFzeW5jIGZ1bmN0aW9uIF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCk6IFByb21pc2U8XG4gIEFycmF5PFNlbnRSZWNpcGllbnRzREJUeXBlPlxuPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93cyA9IHByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgZGIsXG4gICAgJ1NFTEVDVCAqIEZST00gc2VuZExvZ1JlY2lwaWVudHM7J1xuICApLmFsbCgpO1xuXG4gIHJldHVybiByb3dzO1xufVxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKTogUHJvbWlzZTxBcnJheTxTZW50TWVzc2FnZURCVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzID0gcHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICBkYixcbiAgICAnU0VMRUNUICogRlJPTSBzZW5kTG9nTWVzc2FnZUlkczsnXG4gICkuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3M7XG59XG5cbmNvbnN0IFNFU1NJT05TX1RBQkxFID0gJ3Nlc3Npb25zJztcbmZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvblN5bmMoZGF0YTogU2Vzc2lvblR5cGUpOiB2b2lkIHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCwgb3VyVXVpZCwgdXVpZCB9ID0gZGF0YTtcbiAgaWYgKCFpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdjcmVhdGVPclVwZGF0ZVNlc3Npb246IFByb3ZpZGVkIGRhdGEgZGlkIG5vdCBoYXZlIGEgdHJ1dGh5IGlkJ1xuICAgICk7XG4gIH1cbiAgaWYgKCFjb252ZXJzYXRpb25JZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdjcmVhdGVPclVwZGF0ZVNlc3Npb246IFByb3ZpZGVkIGRhdGEgZGlkIG5vdCBoYXZlIGEgdHJ1dGh5IGNvbnZlcnNhdGlvbklkJ1xuICAgICk7XG4gIH1cblxuICBwcmVwYXJlKFxuICAgIGRiLFxuICAgIGBcbiAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIHNlc3Npb25zIChcbiAgICAgIGlkLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBvdXJVdWlkLFxuICAgICAgdXVpZCxcbiAgICAgIGpzb25cbiAgICApIHZhbHVlcyAoXG4gICAgICAkaWQsXG4gICAgICAkY29udmVyc2F0aW9uSWQsXG4gICAgICAkb3VyVXVpZCxcbiAgICAgICR1dWlkLFxuICAgICAgJGpzb25cbiAgICApXG4gICAgYFxuICApLnJ1bih7XG4gICAgaWQsXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgb3VyVXVpZCxcbiAgICB1dWlkLFxuICAgIGpzb246IG9iamVjdFRvSlNPTihkYXRhKSxcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVNlc3Npb24oZGF0YTogU2Vzc2lvblR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvblN5bmMoZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNyZWF0ZU9yVXBkYXRlU2Vzc2lvbnMoXG4gIGFycmF5OiBBcnJheTxTZXNzaW9uVHlwZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhcnJheSkge1xuICAgICAgYXNzZXJ0U3luYyhjcmVhdGVPclVwZGF0ZVNlc3Npb25TeW5jKGl0ZW0pKTtcbiAgICB9XG4gIH0pKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvbW1pdERlY3J5cHRSZXN1bHQoe1xuICBzZW5kZXJLZXlzLFxuICBzZXNzaW9ucyxcbiAgdW5wcm9jZXNzZWQsXG59OiB7XG4gIHNlbmRlcktleXM6IEFycmF5PFNlbmRlcktleVR5cGU+O1xuICBzZXNzaW9uczogQXJyYXk8U2Vzc2lvblR5cGU+O1xuICB1bnByb2Nlc3NlZDogQXJyYXk8VW5wcm9jZXNzZWRUeXBlPjtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2Ygc2VuZGVyS2V5cykge1xuICAgICAgYXNzZXJ0U3luYyhjcmVhdGVPclVwZGF0ZVNlbmRlcktleVN5bmMoaXRlbSkpO1xuICAgIH1cblxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBzZXNzaW9ucykge1xuICAgICAgYXNzZXJ0U3luYyhjcmVhdGVPclVwZGF0ZVNlc3Npb25TeW5jKGl0ZW0pKTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgdW5wcm9jZXNzZWQpIHtcbiAgICAgIGFzc2VydFN5bmMoc2F2ZVVucHJvY2Vzc2VkU3luYyhpdGVtKSk7XG4gICAgfVxuICB9KSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBidWxrQWRkU2Vzc2lvbnMoYXJyYXk6IEFycmF5PFNlc3Npb25UeXBlPik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gYnVsa0FkZChnZXRJbnN0YW5jZSgpLCBTRVNTSU9OU19UQUJMRSwgYXJyYXkpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlU2Vzc2lvbkJ5SWQoaWQ6IFNlc3Npb25JZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUJ5SWQoZ2V0SW5zdGFuY2UoKSwgU0VTU0lPTlNfVEFCTEUsIGlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVNlc3Npb25zQnlDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBERUxFVEUgRlJPTSBzZXNzaW9uc1xuICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIGNvbnZlcnNhdGlvbklkLFxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbFNlc3Npb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gcmVtb3ZlQWxsRnJvbVRhYmxlKGdldEluc3RhbmNlKCksIFNFU1NJT05TX1RBQkxFKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFNlc3Npb25zKCk6IFByb21pc2U8QXJyYXk8U2Vzc2lvblR5cGU+PiB7XG4gIHJldHVybiBnZXRBbGxGcm9tVGFibGUoZ2V0SW5zdGFuY2UoKSwgU0VTU0lPTlNfVEFCTEUpO1xufVxuLy8gQ29udmVyc2F0aW9uc1xuXG5hc3luYyBmdW5jdGlvbiBnZXRDb252ZXJzYXRpb25Db3VudCgpOiBQcm9taXNlPG51bWJlcj4ge1xuICByZXR1cm4gZ2V0Q291bnRGcm9tVGFibGUoZ2V0SW5zdGFuY2UoKSwgJ2NvbnZlcnNhdGlvbnMnKTtcbn1cblxuZnVuY3Rpb24gZ2V0Q29udmVyc2F0aW9uTWVtYmVyc0xpc3QoeyBtZW1iZXJzLCBtZW1iZXJzVjIgfTogQ29udmVyc2F0aW9uVHlwZSkge1xuICBpZiAobWVtYmVyc1YyKSB7XG4gICAgcmV0dXJuIG1lbWJlcnNWMi5tYXAoKGl0ZW06IEdyb3VwVjJNZW1iZXJUeXBlKSA9PiBpdGVtLnV1aWQpLmpvaW4oJyAnKTtcbiAgfVxuICBpZiAobWVtYmVycykge1xuICAgIHJldHVybiBtZW1iZXJzLmpvaW4oJyAnKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cblxuZnVuY3Rpb24gc2F2ZUNvbnZlcnNhdGlvblN5bmMoXG4gIGRhdGE6IENvbnZlcnNhdGlvblR5cGUsXG4gIGRiID0gZ2V0SW5zdGFuY2UoKVxuKTogdm9pZCB7XG4gIGNvbnN0IHtcbiAgICBhY3RpdmVfYXQsXG4gICAgZTE2NCxcbiAgICBncm91cElkLFxuICAgIGlkLFxuICAgIG5hbWUsXG4gICAgcHJvZmlsZUZhbWlseU5hbWUsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgcHJvZmlsZUxhc3RGZXRjaGVkQXQsXG4gICAgdHlwZSxcbiAgICB1dWlkLFxuICB9ID0gZGF0YTtcblxuICBjb25zdCBtZW1iZXJzTGlzdCA9IGdldENvbnZlcnNhdGlvbk1lbWJlcnNMaXN0KGRhdGEpO1xuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBJTlNFUlQgSU5UTyBjb252ZXJzYXRpb25zIChcbiAgICAgIGlkLFxuICAgICAganNvbixcblxuICAgICAgZTE2NCxcbiAgICAgIHV1aWQsXG4gICAgICBncm91cElkLFxuXG4gICAgICBhY3RpdmVfYXQsXG4gICAgICB0eXBlLFxuICAgICAgbWVtYmVycyxcbiAgICAgIG5hbWUsXG4gICAgICBwcm9maWxlTmFtZSxcbiAgICAgIHByb2ZpbGVGYW1pbHlOYW1lLFxuICAgICAgcHJvZmlsZUZ1bGxOYW1lLFxuICAgICAgcHJvZmlsZUxhc3RGZXRjaGVkQXRcbiAgICApIHZhbHVlcyAoXG4gICAgICAkaWQsXG4gICAgICAkanNvbixcblxuICAgICAgJGUxNjQsXG4gICAgICAkdXVpZCxcbiAgICAgICRncm91cElkLFxuXG4gICAgICAkYWN0aXZlX2F0LFxuICAgICAgJHR5cGUsXG4gICAgICAkbWVtYmVycyxcbiAgICAgICRuYW1lLFxuICAgICAgJHByb2ZpbGVOYW1lLFxuICAgICAgJHByb2ZpbGVGYW1pbHlOYW1lLFxuICAgICAgJHByb2ZpbGVGdWxsTmFtZSxcbiAgICAgICRwcm9maWxlTGFzdEZldGNoZWRBdFxuICAgICk7XG4gICAgYFxuICApLnJ1bih7XG4gICAgaWQsXG4gICAganNvbjogb2JqZWN0VG9KU09OKFxuICAgICAgb21pdChkYXRhLCBbJ3Byb2ZpbGVMYXN0RmV0Y2hlZEF0JywgJ3VuYmx1cnJlZEF2YXRhclBhdGgnXSlcbiAgICApLFxuXG4gICAgZTE2NDogZTE2NCB8fCBudWxsLFxuICAgIHV1aWQ6IHV1aWQgfHwgbnVsbCxcbiAgICBncm91cElkOiBncm91cElkIHx8IG51bGwsXG5cbiAgICBhY3RpdmVfYXQ6IGFjdGl2ZV9hdCB8fCBudWxsLFxuICAgIHR5cGUsXG4gICAgbWVtYmVyczogbWVtYmVyc0xpc3QsXG4gICAgbmFtZTogbmFtZSB8fCBudWxsLFxuICAgIHByb2ZpbGVOYW1lOiBwcm9maWxlTmFtZSB8fCBudWxsLFxuICAgIHByb2ZpbGVGYW1pbHlOYW1lOiBwcm9maWxlRmFtaWx5TmFtZSB8fCBudWxsLFxuICAgIHByb2ZpbGVGdWxsTmFtZTogY29tYmluZU5hbWVzKHByb2ZpbGVOYW1lLCBwcm9maWxlRmFtaWx5TmFtZSkgfHwgbnVsbCxcbiAgICBwcm9maWxlTGFzdEZldGNoZWRBdDogcHJvZmlsZUxhc3RGZXRjaGVkQXQgfHwgbnVsbCxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVDb252ZXJzYXRpb24oXG4gIGRhdGE6IENvbnZlcnNhdGlvblR5cGUsXG4gIGRiID0gZ2V0SW5zdGFuY2UoKVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBzYXZlQ29udmVyc2F0aW9uU3luYyhkYXRhLCBkYik7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVDb252ZXJzYXRpb25zKFxuICBhcnJheU9mQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGZvciAoY29uc3QgY29udmVyc2F0aW9uIG9mIGFycmF5T2ZDb252ZXJzYXRpb25zKSB7XG4gICAgICBhc3NlcnRTeW5jKHNhdmVDb252ZXJzYXRpb25TeW5jKGNvbnZlcnNhdGlvbikpO1xuICAgIH1cbiAgfSkoKTtcbn1cblxuZnVuY3Rpb24gdXBkYXRlQ29udmVyc2F0aW9uU3luYyhcbiAgZGF0YTogQ29udmVyc2F0aW9uVHlwZSxcbiAgZGIgPSBnZXRJbnN0YW5jZSgpXG4pOiB2b2lkIHtcbiAgY29uc3Qge1xuICAgIGlkLFxuICAgIGFjdGl2ZV9hdCxcbiAgICB0eXBlLFxuICAgIG5hbWUsXG4gICAgcHJvZmlsZU5hbWUsXG4gICAgcHJvZmlsZUZhbWlseU5hbWUsXG4gICAgcHJvZmlsZUxhc3RGZXRjaGVkQXQsXG4gICAgZTE2NCxcbiAgICB1dWlkLFxuICB9ID0gZGF0YTtcblxuICBjb25zdCBtZW1iZXJzTGlzdCA9IGdldENvbnZlcnNhdGlvbk1lbWJlcnNMaXN0KGRhdGEpO1xuXG4gIGRiLnByZXBhcmUoXG4gICAgYFxuICAgIFVQREFURSBjb252ZXJzYXRpb25zIFNFVFxuICAgICAganNvbiA9ICRqc29uLFxuXG4gICAgICBlMTY0ID0gJGUxNjQsXG4gICAgICB1dWlkID0gJHV1aWQsXG5cbiAgICAgIGFjdGl2ZV9hdCA9ICRhY3RpdmVfYXQsXG4gICAgICB0eXBlID0gJHR5cGUsXG4gICAgICBtZW1iZXJzID0gJG1lbWJlcnMsXG4gICAgICBuYW1lID0gJG5hbWUsXG4gICAgICBwcm9maWxlTmFtZSA9ICRwcm9maWxlTmFtZSxcbiAgICAgIHByb2ZpbGVGYW1pbHlOYW1lID0gJHByb2ZpbGVGYW1pbHlOYW1lLFxuICAgICAgcHJvZmlsZUZ1bGxOYW1lID0gJHByb2ZpbGVGdWxsTmFtZSxcbiAgICAgIHByb2ZpbGVMYXN0RmV0Y2hlZEF0ID0gJHByb2ZpbGVMYXN0RmV0Y2hlZEF0XG4gICAgV0hFUkUgaWQgPSAkaWQ7XG4gICAgYFxuICApLnJ1bih7XG4gICAgaWQsXG4gICAganNvbjogb2JqZWN0VG9KU09OKFxuICAgICAgb21pdChkYXRhLCBbJ3Byb2ZpbGVMYXN0RmV0Y2hlZEF0JywgJ3VuYmx1cnJlZEF2YXRhclBhdGgnXSlcbiAgICApLFxuXG4gICAgZTE2NDogZTE2NCB8fCBudWxsLFxuICAgIHV1aWQ6IHV1aWQgfHwgbnVsbCxcblxuICAgIGFjdGl2ZV9hdDogYWN0aXZlX2F0IHx8IG51bGwsXG4gICAgdHlwZSxcbiAgICBtZW1iZXJzOiBtZW1iZXJzTGlzdCxcbiAgICBuYW1lOiBuYW1lIHx8IG51bGwsXG4gICAgcHJvZmlsZU5hbWU6IHByb2ZpbGVOYW1lIHx8IG51bGwsXG4gICAgcHJvZmlsZUZhbWlseU5hbWU6IHByb2ZpbGVGYW1pbHlOYW1lIHx8IG51bGwsXG4gICAgcHJvZmlsZUZ1bGxOYW1lOiBjb21iaW5lTmFtZXMocHJvZmlsZU5hbWUsIHByb2ZpbGVGYW1pbHlOYW1lKSB8fCBudWxsLFxuICAgIHByb2ZpbGVMYXN0RmV0Y2hlZEF0OiBwcm9maWxlTGFzdEZldGNoZWRBdCB8fCBudWxsLFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQ29udmVyc2F0aW9uKGRhdGE6IENvbnZlcnNhdGlvblR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHVwZGF0ZUNvbnZlcnNhdGlvblN5bmMoZGF0YSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUNvbnZlcnNhdGlvbnMoXG4gIGFycmF5OiBBcnJheTxDb252ZXJzYXRpb25UeXBlPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZm9yIChjb25zdCBpdGVtIG9mIGFycmF5KSB7XG4gICAgICBhc3NlcnRTeW5jKHVwZGF0ZUNvbnZlcnNhdGlvblN5bmMoaXRlbSkpO1xuICAgIH1cbiAgfSkoKTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ29udmVyc2F0aW9uc1N5bmMoaWRzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICAvLyBPdXIgbm9kZSBpbnRlcmZhY2UgZG9lc24ndCBzZWVtIHRvIGFsbG93IHlvdSB0byByZXBsYWNlIG9uZSBzaW5nbGUgPyB3aXRoIGFuIGFycmF5XG4gIGRiLnByZXBhcmU8QXJyYXlRdWVyeT4oXG4gICAgYFxuICAgIERFTEVURSBGUk9NIGNvbnZlcnNhdGlvbnNcbiAgICBXSEVSRSBpZCBJTiAoICR7aWRzLm1hcCgoKSA9PiAnPycpLmpvaW4oJywgJyl9ICk7XG4gICAgYFxuICApLnJ1bihpZHMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVDb252ZXJzYXRpb24oaWQ6IEFycmF5PHN0cmluZz4gfCBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShpZCkpIHtcbiAgICBkYi5wcmVwYXJlPFF1ZXJ5PignREVMRVRFIEZST00gY29udmVyc2F0aW9ucyBXSEVSRSBpZCA9ICRpZDsnKS5ydW4oe1xuICAgICAgaWQsXG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWlkLmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigncmVtb3ZlQ29udmVyc2F0aW9uOiBObyBpZHMgdG8gZGVsZXRlIScpO1xuICB9XG5cbiAgYmF0Y2hNdWx0aVZhclF1ZXJ5KGRiLCBpZCwgcmVtb3ZlQ29udmVyc2F0aW9uc1N5bmMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb252ZXJzYXRpb25CeUlkKFxuICBpZDogc3RyaW5nXG4pOiBQcm9taXNlPENvbnZlcnNhdGlvblR5cGUgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3c6IHsganNvbjogc3RyaW5nIH0gPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PignU0VMRUNUIGpzb24gRlJPTSBjb252ZXJzYXRpb25zIFdIRVJFIGlkID0gJGlkOycpXG4gICAgLmdldCh7IGlkIH0pO1xuXG4gIGlmICghcm93KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBqc29uVG9PYmplY3Qocm93Lmpzb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBlcmFzZVN0b3JhZ2VTZXJ2aWNlU3RhdGVGcm9tQ29udmVyc2F0aW9ucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgYFxuICAgIFVQREFURSBjb252ZXJzYXRpb25zXG4gICAgU0VUXG4gICAgICBqc29uID0ganNvbl9yZW1vdmUoanNvbiwgJyQuc3RvcmFnZUlEJywgJyQubmVlZHNTdG9yYWdlU2VydmljZVN5bmMnLCAnJC51bmtub3duRmllbGRzJywgJyQuc3RvcmFnZVByb2ZpbGVLZXknKTtcbiAgICBgXG4gICkucnVuKCk7XG59XG5cbmZ1bmN0aW9uIGdldEFsbENvbnZlcnNhdGlvbnNTeW5jKGRiID0gZ2V0SW5zdGFuY2UoKSk6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+IHtcbiAgY29uc3Qgcm93czogQ29udmVyc2F0aW9uUm93cyA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QganNvbiwgcHJvZmlsZUxhc3RGZXRjaGVkQXRcbiAgICAgIEZST00gY29udmVyc2F0aW9uc1xuICAgICAgT1JERVIgQlkgaWQgQVNDO1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiByb3dUb0NvbnZlcnNhdGlvbihyb3cpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQ29udmVyc2F0aW9ucygpOiBQcm9taXNlPEFycmF5PENvbnZlcnNhdGlvblR5cGU+PiB7XG4gIHJldHVybiBnZXRBbGxDb252ZXJzYXRpb25zU3luYygpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxDb252ZXJzYXRpb25JZHMoKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93czogQXJyYXk8eyBpZDogc3RyaW5nIH0+ID0gZGJcbiAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBpZCBGUk9NIGNvbnZlcnNhdGlvbnMgT1JERVIgQlkgaWQgQVNDO1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiByb3cuaWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxHcm91cHNJbnZvbHZpbmdVdWlkKFxuICB1dWlkOiBVVUlEU3RyaW5nVHlwZVxuKTogUHJvbWlzZTxBcnJheTxDb252ZXJzYXRpb25UeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvd3M6IENvbnZlcnNhdGlvblJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBqc29uLCBwcm9maWxlTGFzdEZldGNoZWRBdFxuICAgICAgRlJPTSBjb252ZXJzYXRpb25zIFdIRVJFXG4gICAgICAgIHR5cGUgPSAnZ3JvdXAnIEFORFxuICAgICAgICBtZW1iZXJzIExJS0UgJHV1aWRcbiAgICAgIE9SREVSIEJZIGlkIEFTQztcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7XG4gICAgICB1dWlkOiBgJSR7dXVpZH0lYCxcbiAgICB9KTtcblxuICByZXR1cm4gcm93cy5tYXAocm93ID0+IHJvd1RvQ29udmVyc2F0aW9uKHJvdykpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzZWFyY2hNZXNzYWdlcyhcbiAgcXVlcnk6IHN0cmluZyxcbiAgcGFyYW1zOiB7IGxpbWl0PzogbnVtYmVyOyBjb252ZXJzYXRpb25JZD86IHN0cmluZyB9ID0ge31cbik6IFByb21pc2U8QXJyYXk8U2VydmVyU2VhcmNoUmVzdWx0TWVzc2FnZVR5cGU+PiB7XG4gIGNvbnN0IHsgbGltaXQgPSA1MDAsIGNvbnZlcnNhdGlvbklkIH0gPSBwYXJhbXM7XG5cbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIC8vIHNxbGl0ZSBxdWVyaWVzIHdpdGggYSBqb2luIG9uIGEgdmlydHVhbCB0YWJsZSAobGlrZSBGVFM1KSBhcmUgZGUtb3B0aW1pemVkXG4gIC8vIGFuZCBjYW4ndCB1c2UgaW5kaWNlcyBmb3Igb3JkZXJpbmcgcmVzdWx0cy4gSW5zdGVhZCBhbiBpbi1tZW1vcnkgaW5kZXggb2ZcbiAgLy8gdGhlIGpvaW4gcm93cyBpcyBzb3J0ZWQgb24gdGhlIGZseSwgYW5kIHRoaXMgYmVjb21lcyBzdWJzdGFudGlhbGx5XG4gIC8vIHNsb3dlciB3aGVuIHRoZXJlIGFyZSBsYXJnZSBjb2x1bW5zIGluIGl0IChsaWtlIGBtZXNzYWdlcy5qc29uYCkuXG4gIC8vXG4gIC8vIFRodXMgaGVyZSB3ZSB0YWtlIGFuIGluZGlyZWN0IGFwcHJvYWNoIGFuZCBzdG9yZSBgcm93aWRgcyBpbiBhIHRlbXBvcmFyeVxuICAvLyB0YWJsZSBmb3IgYWxsIG1lc3NhZ2VzIHRoYXQgbWF0Y2ggdGhlIEZUUyBxdWVyeS4gVGhlbiB3ZSBjcmVhdGUgYW5vdGhlclxuICAvLyB0YWJsZSB0byBzb3J0IGFuZCBsaW1pdCB0aGUgcmVzdWx0cywgYW5kIGZpbmFsbHkgam9pbiBvbiBpdCB3aGVuIGZldGNoXG4gIC8vIHRoZSBzbmlwcGV0cyBhbmQganNvbi4gVGhlIGJlbmVmaXQgb2YgdGhpcyBpcyB0aGF0IHRoZSBgT1JERVIgQllgIGFuZFxuICAvLyBgTElNSVRgIGhhcHBlbiB3aXRob3V0IHZpcnR1YWwgdGFibGUgYW5kIGFyZSB0aHVzIGNvdmVyZWQgYnlcbiAgLy8gYG1lc3NhZ2VzX3NlYXJjaE9yZGVyYCBpbmRleC5cbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgQ1JFQVRFIFRFTVAgVEFCTEUgdG1wX3Jlc3VsdHMocm93aWQgSU5URUdFUiBQUklNQVJZIEtFWSBBU0MpO1xuICAgICAgQ1JFQVRFIFRFTVAgVEFCTEUgdG1wX2ZpbHRlcmVkX3Jlc3VsdHMocm93aWQgSU5URUdFUiBQUklNQVJZIEtFWSBBU0MpO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgICAgSU5TRVJUIElOVE8gdG1wX3Jlc3VsdHMgKHJvd2lkKVxuICAgICAgICBTRUxFQ1RcbiAgICAgICAgICByb3dpZFxuICAgICAgICBGUk9NXG4gICAgICAgICAgbWVzc2FnZXNfZnRzXG4gICAgICAgIFdIRVJFXG4gICAgICAgICAgbWVzc2FnZXNfZnRzLmJvZHkgTUFUQ0ggJHF1ZXJ5O1xuICAgICAgYFxuICAgICkucnVuKHsgcXVlcnkgfSk7XG5cbiAgICBpZiAoY29udmVyc2F0aW9uSWQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgIGBcbiAgICAgICAgICBJTlNFUlQgSU5UTyB0bXBfZmlsdGVyZWRfcmVzdWx0cyAocm93aWQpXG4gICAgICAgICAgU0VMRUNUXG4gICAgICAgICAgICB0bXBfcmVzdWx0cy5yb3dpZFxuICAgICAgICAgIEZST01cbiAgICAgICAgICAgIHRtcF9yZXN1bHRzXG4gICAgICAgICAgSU5ORVIgSk9JTlxuICAgICAgICAgICAgbWVzc2FnZXMgT04gbWVzc2FnZXMucm93aWQgPSB0bXBfcmVzdWx0cy5yb3dpZFxuICAgICAgICAgIE9SREVSIEJZIG1lc3NhZ2VzLnJlY2VpdmVkX2F0IERFU0MsIG1lc3NhZ2VzLnNlbnRfYXQgREVTQ1xuICAgICAgICAgIExJTUlUICRsaW1pdDtcbiAgICAgICAgYFxuICAgICAgKS5ydW4oeyBsaW1pdCB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgIGBcbiAgICAgICAgICBJTlNFUlQgSU5UTyB0bXBfZmlsdGVyZWRfcmVzdWx0cyAocm93aWQpXG4gICAgICAgICAgU0VMRUNUXG4gICAgICAgICAgICB0bXBfcmVzdWx0cy5yb3dpZFxuICAgICAgICAgIEZST01cbiAgICAgICAgICAgIHRtcF9yZXN1bHRzXG4gICAgICAgICAgSU5ORVIgSk9JTlxuICAgICAgICAgICAgbWVzc2FnZXMgT04gbWVzc2FnZXMucm93aWQgPSB0bXBfcmVzdWx0cy5yb3dpZFxuICAgICAgICAgIFdIRVJFXG4gICAgICAgICAgICBtZXNzYWdlcy5jb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZFxuICAgICAgICAgIE9SREVSIEJZIG1lc3NhZ2VzLnJlY2VpdmVkX2F0IERFU0MsIG1lc3NhZ2VzLnNlbnRfYXQgREVTQ1xuICAgICAgICAgIExJTUlUICRsaW1pdDtcbiAgICAgICAgYFxuICAgICAgKS5ydW4oeyBjb252ZXJzYXRpb25JZCwgbGltaXQgfSk7XG4gICAgfVxuXG4gICAgLy8gVGhlIGBNQVRDSGAgaXMgbmVjZXNzYXJ5IGluIG9yZGVyIHRvIGZvciBgc25pcHBldCgpYCBoZWxwZXIgZnVuY3Rpb24gdG9cbiAgICAvLyBnaXZlIHVzIHRoZSByaWdodCByZXN1bHRzLiBXZSBjYW4ndCBjYWxsIGBzbmlwcGV0KClgIGluIHRoZSBxdWVyeSBhYm92ZVxuICAgIC8vIGJlY2F1c2UgaXQgd291bGQgYmxvYXQgdGhlIHRlbXBvcmFyeSB0YWJsZSB3aXRoIHRleHQgZGF0YSBhbmQgd2Ugd2FudFxuICAgIC8vIHRvIGtlZXAgaXRzIHNpemUgbWluaW1hbCBmb3IgYE9SREVSIEJZYCArIGBMSU1JVGAgdG8gYmUgZmFzdC5cbiAgICBjb25zdCByZXN1bHQgPSBkYlxuICAgICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFNFTEVDVFxuICAgICAgICAgIG1lc3NhZ2VzLmpzb24sXG4gICAgICAgICAgc25pcHBldChtZXNzYWdlc19mdHMsIC0xLCAnPDxsZWZ0Pj4nLCAnPDxyaWdodD4+JywgJy4uLicsIDEwKVxuICAgICAgICAgICAgQVMgc25pcHBldFxuICAgICAgICBGUk9NIHRtcF9maWx0ZXJlZF9yZXN1bHRzXG4gICAgICAgIElOTkVSIEpPSU4gbWVzc2FnZXNfZnRzXG4gICAgICAgICAgT04gbWVzc2FnZXNfZnRzLnJvd2lkID0gdG1wX2ZpbHRlcmVkX3Jlc3VsdHMucm93aWRcbiAgICAgICAgSU5ORVIgSk9JTiBtZXNzYWdlc1xuICAgICAgICAgIE9OIG1lc3NhZ2VzLnJvd2lkID0gdG1wX2ZpbHRlcmVkX3Jlc3VsdHMucm93aWRcbiAgICAgICAgV0hFUkVcbiAgICAgICAgICBtZXNzYWdlc19mdHMuYm9keSBNQVRDSCAkcXVlcnlcbiAgICAgICAgT1JERVIgQlkgbWVzc2FnZXMucmVjZWl2ZWRfYXQgREVTQywgbWVzc2FnZXMuc2VudF9hdCBERVNDO1xuICAgICAgICBgXG4gICAgICApXG4gICAgICAuYWxsKHsgcXVlcnkgfSk7XG5cbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgRFJPUCBUQUJMRSB0bXBfcmVzdWx0cztcbiAgICAgIERST1AgVEFCTEUgdG1wX2ZpbHRlcmVkX3Jlc3VsdHM7XG4gICAgICBgXG4gICAgKTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH0pKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNlYXJjaE1lc3NhZ2VzSW5Db252ZXJzYXRpb24oXG4gIHF1ZXJ5OiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHsgbGltaXQgPSAxMDAgfTogeyBsaW1pdD86IG51bWJlciB9ID0ge31cbik6IFByb21pc2U8QXJyYXk8U2VydmVyU2VhcmNoUmVzdWx0TWVzc2FnZVR5cGU+PiB7XG4gIHJldHVybiBzZWFyY2hNZXNzYWdlcyhxdWVyeSwgeyBjb252ZXJzYXRpb25JZCwgbGltaXQgfSk7XG59XG5cbmZ1bmN0aW9uIGdldE1lc3NhZ2VDb3VudFN5bmMoXG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nLFxuICBkYiA9IGdldEluc3RhbmNlKClcbik6IG51bWJlciB7XG4gIGlmIChjb252ZXJzYXRpb25JZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGdldENvdW50RnJvbVRhYmxlKGRiLCAnbWVzc2FnZXMnKTtcbiAgfVxuXG4gIGNvbnN0IGNvdW50ID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICAgIFNFTEVDVCBjb3VudCgqKVxuICAgICAgICBGUk9NIG1lc3NhZ2VzXG4gICAgICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkO1xuICAgICAgICBgXG4gICAgKVxuICAgIC5wbHVjaygpXG4gICAgLmdldCh7IGNvbnZlcnNhdGlvbklkIH0pO1xuXG4gIHJldHVybiBjb3VudDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcnlDb3VudChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICAgIFNFTEVDVCBjb3VudCgqKVxuICAgICAgICBGUk9NIG1lc3NhZ2VzXG4gICAgICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORCBpc1N0b3J5ID0gMTtcbiAgICAgICAgYFxuICAgIClcbiAgICAucGx1Y2soKVxuICAgIC5nZXQoeyBjb252ZXJzYXRpb25JZCB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZUNvdW50KGNvbnZlcnNhdGlvbklkPzogc3RyaW5nKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgcmV0dXJuIGdldE1lc3NhZ2VDb3VudFN5bmMoY29udmVyc2F0aW9uSWQpO1xufVxuXG5mdW5jdGlvbiBoYXNVc2VySW5pdGlhdGVkTWVzc2FnZXMoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgcm93OiB7IGNvdW50OiBudW1iZXIgfSA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIENPVU5UKCopIGFzIGNvdW50IEZST01cbiAgICAgICAgKFxuICAgICAgICAgIFNFTEVDVCAxIEZST00gbWVzc2FnZXNcbiAgICAgICAgICBXSEVSRVxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWQgQU5EXG4gICAgICAgICAgICBpc1VzZXJJbml0aWF0ZWRNZXNzYWdlID0gMVxuICAgICAgICAgIExJTUlUIDFcbiAgICAgICAgKTtcbiAgICAgIGBcbiAgICApXG4gICAgLmdldCh7IGNvbnZlcnNhdGlvbklkIH0pO1xuXG4gIHJldHVybiByb3cuY291bnQgIT09IDA7XG59XG5cbmZ1bmN0aW9uIHNhdmVNZXNzYWdlU3luYyhcbiAgZGF0YTogTWVzc2FnZVR5cGUsXG4gIG9wdGlvbnM6IHtcbiAgICBhbHJlYWR5SW5UcmFuc2FjdGlvbj86IGJvb2xlYW47XG4gICAgZGI/OiBEYXRhYmFzZTtcbiAgICBmb3JjZVNhdmU/OiBib29sZWFuO1xuICAgIGpvYlRvSW5zZXJ0PzogU3RvcmVkSm9iO1xuICAgIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB9XG4pOiBzdHJpbmcge1xuICBjb25zdCB7XG4gICAgYWxyZWFkeUluVHJhbnNhY3Rpb24sXG4gICAgZGIgPSBnZXRJbnN0YW5jZSgpLFxuICAgIGZvcmNlU2F2ZSxcbiAgICBqb2JUb0luc2VydCxcbiAgICBvdXJVdWlkLFxuICB9ID0gb3B0aW9ucztcblxuICBpZiAoIWFscmVhZHlJblRyYW5zYWN0aW9uKSB7XG4gICAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICAgIHJldHVybiBhc3NlcnRTeW5jKFxuICAgICAgICBzYXZlTWVzc2FnZVN5bmMoZGF0YSwge1xuICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgYWxyZWFkeUluVHJhbnNhY3Rpb246IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0pKCk7XG4gIH1cblxuICBjb25zdCB7XG4gICAgYm9keSxcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBncm91cFYyQ2hhbmdlLFxuICAgIGhhc0F0dGFjaG1lbnRzLFxuICAgIGhhc0ZpbGVBdHRhY2htZW50cyxcbiAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLFxuICAgIGlkLFxuICAgIGlzRXJhc2VkLFxuICAgIGlzVmlld09uY2UsXG4gICAgcmVjZWl2ZWRfYXQsXG4gICAgc2NoZW1hVmVyc2lvbixcbiAgICBzZW50X2F0LFxuICAgIHNlcnZlckd1aWQsXG4gICAgc291cmNlLFxuICAgIHNvdXJjZVV1aWQsXG4gICAgc291cmNlRGV2aWNlLFxuICAgIHN0b3J5SWQsXG4gICAgdHlwZSxcbiAgICByZWFkU3RhdHVzLFxuICAgIGV4cGlyZVRpbWVyLFxuICAgIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCxcbiAgfSA9IGRhdGE7XG4gIGxldCB7IHNlZW5TdGF0dXMgfSA9IGRhdGE7XG5cbiAgaWYgKHJlYWRTdGF0dXMgPT09IFJlYWRTdGF0dXMuVW5yZWFkICYmIHNlZW5TdGF0dXMgIT09IFNlZW5TdGF0dXMuVW5zZWVuKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgc2F2ZU1lc3NhZ2U6IE1lc3NhZ2UgJHtpZH0vJHt0eXBlfSBpcyB1bnJlYWQgYnV0IGhhZCBzZWVuU3RhdHVzPSR7c2VlblN0YXR1c30uIEZvcmNpbmcgdG8gVW5zZWVuU3RhdHVzLlVuc2Vlbi5gXG4gICAgKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGRhdGEgPSB7XG4gICAgICAuLi5kYXRhLFxuICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgfTtcbiAgICBzZWVuU3RhdHVzID0gU2VlblN0YXR1cy5VbnNlZW47XG4gIH1cblxuICBjb25zdCBwYXlsb2FkID0ge1xuICAgIGlkLFxuICAgIGpzb246IG9iamVjdFRvSlNPTihkYXRhKSxcblxuICAgIGJvZHk6IGJvZHkgfHwgbnVsbCxcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCB8fCBudWxsLFxuICAgIGV4cGlyZVRpbWVyOiBleHBpcmVUaW1lciB8fCBudWxsLFxuICAgIGhhc0F0dGFjaG1lbnRzOiBoYXNBdHRhY2htZW50cyA/IDEgOiAwLFxuICAgIGhhc0ZpbGVBdHRhY2htZW50czogaGFzRmlsZUF0dGFjaG1lbnRzID8gMSA6IDAsXG4gICAgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50czogaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyA/IDEgOiAwLFxuICAgIGlzQ2hhbmdlQ3JlYXRlZEJ5VXM6IGdyb3VwVjJDaGFuZ2U/LmZyb20gPT09IG91clV1aWQgPyAxIDogMCxcbiAgICBpc0VyYXNlZDogaXNFcmFzZWQgPyAxIDogMCxcbiAgICBpc1ZpZXdPbmNlOiBpc1ZpZXdPbmNlID8gMSA6IDAsXG4gICAgcmVjZWl2ZWRfYXQ6IHJlY2VpdmVkX2F0IHx8IG51bGwsXG4gICAgc2NoZW1hVmVyc2lvbjogc2NoZW1hVmVyc2lvbiB8fCAwLFxuICAgIHNlcnZlckd1aWQ6IHNlcnZlckd1aWQgfHwgbnVsbCxcbiAgICBzZW50X2F0OiBzZW50X2F0IHx8IG51bGwsXG4gICAgc291cmNlOiBzb3VyY2UgfHwgbnVsbCxcbiAgICBzb3VyY2VVdWlkOiBzb3VyY2VVdWlkIHx8IG51bGwsXG4gICAgc291cmNlRGV2aWNlOiBzb3VyY2VEZXZpY2UgfHwgbnVsbCxcbiAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgdHlwZTogdHlwZSB8fCBudWxsLFxuICAgIHJlYWRTdGF0dXM6IHJlYWRTdGF0dXMgPz8gbnVsbCxcbiAgICBzZWVuU3RhdHVzOiBzZWVuU3RhdHVzID8/IFNlZW5TdGF0dXMuTm90QXBwbGljYWJsZSxcbiAgfTtcblxuICBpZiAoaWQgJiYgIWZvcmNlU2F2ZSkge1xuICAgIHByZXBhcmUoXG4gICAgICBkYixcbiAgICAgIGBcbiAgICAgIFVQREFURSBtZXNzYWdlcyBTRVRcbiAgICAgICAgaWQgPSAkaWQsXG4gICAgICAgIGpzb24gPSAkanNvbixcblxuICAgICAgICBib2R5ID0gJGJvZHksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgPSAkZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wLFxuICAgICAgICBleHBpcmVUaW1lciA9ICRleHBpcmVUaW1lcixcbiAgICAgICAgaGFzQXR0YWNobWVudHMgPSAkaGFzQXR0YWNobWVudHMsXG4gICAgICAgIGhhc0ZpbGVBdHRhY2htZW50cyA9ICRoYXNGaWxlQXR0YWNobWVudHMsXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMgPSAkaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgICAgICAgaXNDaGFuZ2VDcmVhdGVkQnlVcyA9ICRpc0NoYW5nZUNyZWF0ZWRCeVVzLFxuICAgICAgICBpc0VyYXNlZCA9ICRpc0VyYXNlZCxcbiAgICAgICAgaXNWaWV3T25jZSA9ICRpc1ZpZXdPbmNlLFxuICAgICAgICByZWNlaXZlZF9hdCA9ICRyZWNlaXZlZF9hdCxcbiAgICAgICAgc2NoZW1hVmVyc2lvbiA9ICRzY2hlbWFWZXJzaW9uLFxuICAgICAgICBzZXJ2ZXJHdWlkID0gJHNlcnZlckd1aWQsXG4gICAgICAgIHNlbnRfYXQgPSAkc2VudF9hdCxcbiAgICAgICAgc291cmNlID0gJHNvdXJjZSxcbiAgICAgICAgc291cmNlVXVpZCA9ICRzb3VyY2VVdWlkLFxuICAgICAgICBzb3VyY2VEZXZpY2UgPSAkc291cmNlRGV2aWNlLFxuICAgICAgICBzdG9yeUlkID0gJHN0b3J5SWQsXG4gICAgICAgIHR5cGUgPSAkdHlwZSxcbiAgICAgICAgcmVhZFN0YXR1cyA9ICRyZWFkU3RhdHVzLFxuICAgICAgICBzZWVuU3RhdHVzID0gJHNlZW5TdGF0dXNcbiAgICAgIFdIRVJFIGlkID0gJGlkO1xuICAgICAgYFxuICAgICkucnVuKHBheWxvYWQpO1xuXG4gICAgaWYgKGpvYlRvSW5zZXJ0KSB7XG4gICAgICBpbnNlcnRKb2JTeW5jKGRiLCBqb2JUb0luc2VydCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgY29uc3QgdG9DcmVhdGUgPSB7XG4gICAgLi4uZGF0YSxcbiAgICBpZDogaWQgfHwgVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gIH07XG5cbiAgcHJlcGFyZShcbiAgICBkYixcbiAgICBgXG4gICAgSU5TRVJUIElOVE8gbWVzc2FnZXMgKFxuICAgICAgaWQsXG4gICAgICBqc29uLFxuXG4gICAgICBib2R5LFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICBleHBpcmVUaW1lcixcbiAgICAgIGhhc0F0dGFjaG1lbnRzLFxuICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzLFxuICAgICAgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgICAgIGlzQ2hhbmdlQ3JlYXRlZEJ5VXMsXG4gICAgICBpc0VyYXNlZCxcbiAgICAgIGlzVmlld09uY2UsXG4gICAgICByZWNlaXZlZF9hdCxcbiAgICAgIHNjaGVtYVZlcnNpb24sXG4gICAgICBzZXJ2ZXJHdWlkLFxuICAgICAgc2VudF9hdCxcbiAgICAgIHNvdXJjZSxcbiAgICAgIHNvdXJjZVV1aWQsXG4gICAgICBzb3VyY2VEZXZpY2UsXG4gICAgICBzdG9yeUlkLFxuICAgICAgdHlwZSxcbiAgICAgIHJlYWRTdGF0dXMsXG4gICAgICBzZWVuU3RhdHVzXG4gICAgKSB2YWx1ZXMgKFxuICAgICAgJGlkLFxuICAgICAgJGpzb24sXG5cbiAgICAgICRib2R5LFxuICAgICAgJGNvbnZlcnNhdGlvbklkLFxuICAgICAgJGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCxcbiAgICAgICRleHBpcmVUaW1lcixcbiAgICAgICRoYXNBdHRhY2htZW50cyxcbiAgICAgICRoYXNGaWxlQXR0YWNobWVudHMsXG4gICAgICAkaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgICAgICRpc0NoYW5nZUNyZWF0ZWRCeVVzLFxuICAgICAgJGlzRXJhc2VkLFxuICAgICAgJGlzVmlld09uY2UsXG4gICAgICAkcmVjZWl2ZWRfYXQsXG4gICAgICAkc2NoZW1hVmVyc2lvbixcbiAgICAgICRzZXJ2ZXJHdWlkLFxuICAgICAgJHNlbnRfYXQsXG4gICAgICAkc291cmNlLFxuICAgICAgJHNvdXJjZVV1aWQsXG4gICAgICAkc291cmNlRGV2aWNlLFxuICAgICAgJHN0b3J5SWQsXG4gICAgICAkdHlwZSxcbiAgICAgICRyZWFkU3RhdHVzLFxuICAgICAgJHNlZW5TdGF0dXNcbiAgICApO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIC4uLnBheWxvYWQsXG4gICAgaWQ6IHRvQ3JlYXRlLmlkLFxuICAgIGpzb246IG9iamVjdFRvSlNPTih0b0NyZWF0ZSksXG4gIH0pO1xuXG4gIGlmIChqb2JUb0luc2VydCkge1xuICAgIGluc2VydEpvYlN5bmMoZGIsIGpvYlRvSW5zZXJ0KTtcbiAgfVxuXG4gIHJldHVybiB0b0NyZWF0ZS5pZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2F2ZU1lc3NhZ2UoXG4gIGRhdGE6IE1lc3NhZ2VUeXBlLFxuICBvcHRpb25zOiB7XG4gICAgam9iVG9JbnNlcnQ/OiBTdG9yZWRKb2I7XG4gICAgZm9yY2VTYXZlPzogYm9vbGVhbjtcbiAgICBhbHJlYWR5SW5UcmFuc2FjdGlvbj86IGJvb2xlYW47XG4gICAgb3VyVXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIH1cbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIHJldHVybiBzYXZlTWVzc2FnZVN5bmMoZGF0YSwgb3B0aW9ucyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHNhdmVNZXNzYWdlcyhcbiAgYXJyYXlPZk1lc3NhZ2VzOiBSZWFkb25seUFycmF5PE1lc3NhZ2VUeXBlPixcbiAgb3B0aW9uczogeyBmb3JjZVNhdmU/OiBib29sZWFuOyBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZSB9XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBmb3IgKGNvbnN0IG1lc3NhZ2Ugb2YgYXJyYXlPZk1lc3NhZ2VzKSB7XG4gICAgICBhc3NlcnRTeW5jKFxuICAgICAgICBzYXZlTWVzc2FnZVN5bmMobWVzc2FnZSwgeyAuLi5vcHRpb25zLCBhbHJlYWR5SW5UcmFuc2FjdGlvbjogdHJ1ZSB9KVxuICAgICAgKTtcbiAgICB9XG4gIH0pKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZU1lc3NhZ2UoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIucHJlcGFyZTxRdWVyeT4oJ0RFTEVURSBGUk9NIG1lc3NhZ2VzIFdIRVJFIGlkID0gJGlkOycpLnJ1bih7IGlkIH0pO1xufVxuXG5mdW5jdGlvbiByZW1vdmVNZXNzYWdlc1N5bmMoaWRzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi5wcmVwYXJlPEFycmF5UXVlcnk+KFxuICAgIGBcbiAgICBERUxFVEUgRlJPTSBtZXNzYWdlc1xuICAgIFdIRVJFIGlkIElOICggJHtpZHMubWFwKCgpID0+ICc/Jykuam9pbignLCAnKX0gKTtcbiAgICBgXG4gICkucnVuKGlkcyk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZU1lc3NhZ2VzKGlkczogQXJyYXk8c3RyaW5nPik6IFByb21pc2U8dm9pZD4ge1xuICBiYXRjaE11bHRpVmFyUXVlcnkoZ2V0SW5zdGFuY2UoKSwgaWRzLCByZW1vdmVNZXNzYWdlc1N5bmMpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlQnlJZChpZDogc3RyaW5nKTogUHJvbWlzZTxNZXNzYWdlVHlwZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBnZXRNZXNzYWdlQnlJZFN5bmMoZGIsIGlkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldE1lc3NhZ2VCeUlkU3luYyhcbiAgZGI6IERhdGFiYXNlLFxuICBpZDogc3RyaW5nXG4pOiBNZXNzYWdlVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KCdTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzIFdIRVJFIGlkID0gJGlkOycpXG4gICAgLmdldCh7XG4gICAgICBpZCxcbiAgICB9KTtcblxuICBpZiAoIXJvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4ganNvblRvT2JqZWN0KHJvdy5qc29uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZXNCeUlkKFxuICBtZXNzYWdlSWRzOiBBcnJheTxzdHJpbmc+XG4pOiBQcm9taXNlPEFycmF5PE1lc3NhZ2VUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgcmV0dXJuIGJhdGNoTXVsdGlWYXJRdWVyeShcbiAgICBkYixcbiAgICBtZXNzYWdlSWRzLFxuICAgIChiYXRjaDogQXJyYXk8c3RyaW5nPik6IEFycmF5PE1lc3NhZ2VUeXBlPiA9PiB7XG4gICAgICBjb25zdCBxdWVyeSA9IGRiLnByZXBhcmU8QXJyYXlRdWVyeT4oXG4gICAgICAgIGBTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzIFdIRVJFIGlkIElOICgke0FycmF5KGJhdGNoLmxlbmd0aClcbiAgICAgICAgICAuZmlsbCgnPycpXG4gICAgICAgICAgLmpvaW4oJywnKX0pO2BcbiAgICAgICk7XG4gICAgICBjb25zdCByb3dzOiBKU09OUm93cyA9IHF1ZXJ5LmFsbChiYXRjaCk7XG4gICAgICByZXR1cm4gcm93cy5tYXAocm93ID0+IGpzb25Ub09iamVjdChyb3cuanNvbikpO1xuICAgIH1cbiAgKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbE1lc3NhZ2VzKCk6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KCdTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzIE9SREVSIEJZIGlkIEFTQzsnKVxuICAgIC5hbGwoKTtcblxuICByZXR1cm4gcm93cy5tYXAocm93ID0+IGpzb25Ub09iamVjdChyb3cuanNvbikpO1xufVxuYXN5bmMgZnVuY3Rpb24gX3JlbW92ZUFsbE1lc3NhZ2VzKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oJ0RFTEVURSBmcm9tIG1lc3NhZ2VzOycpLnJ1bigpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxNZXNzYWdlSWRzKCk6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvd3M6IEFycmF5PHsgaWQ6IHN0cmluZyB9PiA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oJ1NFTEVDVCBpZCBGUk9NIG1lc3NhZ2VzIE9SREVSIEJZIGlkIEFTQzsnKVxuICAgIC5hbGwoKTtcblxuICByZXR1cm4gcm93cy5tYXAocm93ID0+IHJvdy5pZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VCeVNlbmRlcih7XG4gIHNvdXJjZSxcbiAgc291cmNlVXVpZCxcbiAgc291cmNlRGV2aWNlLFxuICBzZW50X2F0LFxufToge1xuICBzb3VyY2U6IHN0cmluZztcbiAgc291cmNlVXVpZDogc3RyaW5nO1xuICBzb3VyY2VEZXZpY2U6IG51bWJlcjtcbiAgc2VudF9hdDogbnVtYmVyO1xufSk6IFByb21pc2U8TWVzc2FnZVR5cGUgfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzOiBKU09OUm93cyA9IHByZXBhcmUoXG4gICAgZGIsXG4gICAgYFxuICAgIFNFTEVDVCBqc29uIEZST00gbWVzc2FnZXMgV0hFUkVcbiAgICAgIChzb3VyY2UgPSAkc291cmNlIE9SIHNvdXJjZVV1aWQgPSAkc291cmNlVXVpZCkgQU5EXG4gICAgICBzb3VyY2VEZXZpY2UgPSAkc291cmNlRGV2aWNlIEFORFxuICAgICAgc2VudF9hdCA9ICRzZW50X2F0XG4gICAgTElNSVQgMjtcbiAgICBgXG4gICkuYWxsKHtcbiAgICBzb3VyY2UsXG4gICAgc291cmNlVXVpZCxcbiAgICBzb3VyY2VEZXZpY2UsXG4gICAgc2VudF9hdCxcbiAgfSk7XG5cbiAgaWYgKHJvd3MubGVuZ3RoID4gMSkge1xuICAgIGxvZy53YXJuKCdnZXRNZXNzYWdlQnlTZW5kZXI6IE1vcmUgdGhhbiBvbmUgbWVzc2FnZSBmb3VuZCBmb3InLCB7XG4gICAgICBzZW50X2F0LFxuICAgICAgc291cmNlLFxuICAgICAgc291cmNlVXVpZCxcbiAgICAgIHNvdXJjZURldmljZSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChyb3dzLmxlbmd0aCA8IDEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIGpzb25Ub09iamVjdChyb3dzWzBdLmpzb24pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gX3N0b3J5SWRQcmVkaWNhdGUoXG4gIHN0b3J5SWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgaXNHcm91cD86IGJvb2xlYW5cbik6IHN0cmluZyB7XG4gIGlmICghaXNHcm91cCAmJiBzdG9yeUlkID09PSB1bmRlZmluZWQpIHtcbiAgICAvLyBXZSBjb3VsZCB1c2UgJ1RSVUUnIGhlcmUsIGJ1dCBpdCBpcyBiZXR0ZXIgdG8gcmVxdWlyZSBgJHN0b3J5SWRgXG4gICAgLy8gcGFyYW1ldGVyXG4gICAgcmV0dXJuICckc3RvcnlJZCBJUyBOVUxMJztcbiAgfVxuXG4gIHJldHVybiAnc3RvcnlJZCBJUyAkc3RvcnlJZCc7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVucmVhZEJ5Q29udmVyc2F0aW9uQW5kTWFya1JlYWQoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgaXNHcm91cCxcbiAgbmV3ZXN0VW5yZWFkQXQsXG4gIHN0b3J5SWQsXG4gIHJlYWRBdCxcbn06IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG5ld2VzdFVucmVhZEF0OiBudW1iZXI7XG4gIHN0b3J5SWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgcmVhZEF0PzogbnVtYmVyO1xufSk6IFByb21pc2U8XG4gIEFycmF5PFxuICAgIHsgb3JpZ2luYWxSZWFkU3RhdHVzOiBSZWFkU3RhdHVzIHwgdW5kZWZpbmVkIH0gJiBQaWNrPFxuICAgICAgTWVzc2FnZVR5cGUsXG4gICAgICB8ICdpZCdcbiAgICAgIHwgJ3NvdXJjZSdcbiAgICAgIHwgJ3NvdXJjZVV1aWQnXG4gICAgICB8ICdzZW50X2F0J1xuICAgICAgfCAndHlwZSdcbiAgICAgIHwgJ3JlYWRTdGF0dXMnXG4gICAgICB8ICdzZWVuU3RhdHVzJ1xuICAgID5cbiAgPlxuPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBjb25zdCBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgPSBNYXRoLm1pbihEYXRlLm5vdygpLCByZWFkQXQgPz8gSW5maW5pdHkpO1xuICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgVVBEQVRFIG1lc3NhZ2VzXG4gICAgICBJTkRFWEVEIEJZIGV4cGlyaW5nX21lc3NhZ2VfYnlfY29udmVyc2F0aW9uX2FuZF9yZWNlaXZlZF9hdFxuICAgICAgU0VUXG4gICAgICAgIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA9ICRleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICAgIGpzb24gPSBqc29uX3BhdGNoKGpzb24sICRqc29uUGF0Y2gpXG4gICAgICBXSEVSRVxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgKCR7X3N0b3J5SWRQcmVkaWNhdGUoc3RvcnlJZCwgaXNHcm91cCl9KSBBTkRcbiAgICAgICAgaXNTdG9yeSBJUyAwIEFORFxuICAgICAgICB0eXBlIElTICdpbmNvbWluZycgQU5EXG4gICAgICAgIChcbiAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgSVMgTlVMTCBPUlxuICAgICAgICAgIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA+ICRleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXBcbiAgICAgICAgKSBBTkRcbiAgICAgICAgZXhwaXJlVGltZXIgPiAwIEFORFxuICAgICAgICByZWNlaXZlZF9hdCA8PSAkbmV3ZXN0VW5yZWFkQXQ7XG4gICAgICBgXG4gICAgKS5ydW4oe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsXG4gICAgICBqc29uUGF0Y2g6IEpTT04uc3RyaW5naWZ5KHsgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wIH0pLFxuICAgICAgbmV3ZXN0VW5yZWFkQXQsXG4gICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgfSk7XG5cbiAgICBjb25zdCByb3dzID0gZGJcbiAgICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBTRUxFQ1QgaWQsIGpzb24gRlJPTSBtZXNzYWdlc1xuICAgICAgICBXSEVSRVxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICAgIHNlZW5TdGF0dXMgPSAke1NlZW5TdGF0dXMuVW5zZWVufSBBTkRcbiAgICAgICAgICBpc1N0b3J5ID0gMCBBTkRcbiAgICAgICAgICAoJHtfc3RvcnlJZFByZWRpY2F0ZShzdG9yeUlkLCBpc0dyb3VwKX0pIEFORFxuICAgICAgICAgIHJlY2VpdmVkX2F0IDw9ICRuZXdlc3RVbnJlYWRBdFxuICAgICAgICBPUkRFUiBCWSByZWNlaXZlZF9hdCBERVNDLCBzZW50X2F0IERFU0M7XG4gICAgICAgIGBcbiAgICAgIClcbiAgICAgIC5hbGwoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgbmV3ZXN0VW5yZWFkQXQsXG4gICAgICAgIHN0b3J5SWQ6IHN0b3J5SWQgfHwgbnVsbCxcbiAgICAgIH0pO1xuXG4gICAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICAgIFVQREFURSBtZXNzYWdlc1xuICAgICAgICBTRVRcbiAgICAgICAgICByZWFkU3RhdHVzID0gJHtSZWFkU3RhdHVzLlJlYWR9LFxuICAgICAgICAgIHNlZW5TdGF0dXMgPSAke1NlZW5TdGF0dXMuU2Vlbn0sXG4gICAgICAgICAganNvbiA9IGpzb25fcGF0Y2goanNvbiwgJGpzb25QYXRjaClcbiAgICAgICAgV0hFUkVcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgICBzZWVuU3RhdHVzID0gJHtTZWVuU3RhdHVzLlVuc2Vlbn0gQU5EXG4gICAgICAgICAgaXNTdG9yeSA9IDAgQU5EXG4gICAgICAgICAgKCR7X3N0b3J5SWRQcmVkaWNhdGUoc3RvcnlJZCwgaXNHcm91cCl9KSBBTkRcbiAgICAgICAgICByZWNlaXZlZF9hdCA8PSAkbmV3ZXN0VW5yZWFkQXQ7XG4gICAgICAgIGBcbiAgICApLnJ1bih7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGpzb25QYXRjaDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICAgIHNlZW5TdGF0dXM6IFNlZW5TdGF0dXMuU2VlbixcbiAgICAgIH0pLFxuICAgICAgbmV3ZXN0VW5yZWFkQXQsXG4gICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gcm93cy5tYXAocm93ID0+IHtcbiAgICAgIGNvbnN0IGpzb24gPSBqc29uVG9PYmplY3Q8TWVzc2FnZVR5cGU+KHJvdy5qc29uKTtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG9yaWdpbmFsUmVhZFN0YXR1czoganNvbi5yZWFkU3RhdHVzLFxuICAgICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICAgIHNlZW5TdGF0dXM6IFNlZW5TdGF0dXMuU2VlbixcbiAgICAgICAgLi4ucGljayhqc29uLCBbXG4gICAgICAgICAgJ2V4cGlyYXRpb25TdGFydFRpbWVzdGFtcCcsXG4gICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAnc2VudF9hdCcsXG4gICAgICAgICAgJ3NvdXJjZScsXG4gICAgICAgICAgJ3NvdXJjZVV1aWQnLFxuICAgICAgICAgICd0eXBlJyxcbiAgICAgICAgXSksXG4gICAgICB9O1xuICAgIH0pO1xuICB9KSgpO1xufVxuXG50eXBlIFJlYWN0aW9uUmVzdWx0VHlwZSA9IFBpY2s8XG4gIFJlYWN0aW9uVHlwZSxcbiAgJ3RhcmdldEF1dGhvclV1aWQnIHwgJ3RhcmdldFRpbWVzdGFtcCcgfCAnbWVzc2FnZUlkJ1xuPiAmIHsgcm93aWQ6IG51bWJlciB9O1xuYXN5bmMgZnVuY3Rpb24gZ2V0VW5yZWFkUmVhY3Rpb25zQW5kTWFya1JlYWQoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgbmV3ZXN0VW5yZWFkQXQsXG4gIHN0b3J5SWQsXG59OiB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIG5ld2VzdFVucmVhZEF0OiBudW1iZXI7XG4gIHN0b3J5SWQ/OiBVVUlEU3RyaW5nVHlwZTtcbn0pOiBQcm9taXNlPEFycmF5PFJlYWN0aW9uUmVzdWx0VHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIHJldHVybiBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgdW5yZWFkTWVzc2FnZXM6IEFycmF5PFJlYWN0aW9uUmVzdWx0VHlwZT4gPSBkYlxuICAgICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFNFTEVDVCByZWFjdGlvbnMucm93aWQsIHRhcmdldEF1dGhvclV1aWQsIHRhcmdldFRpbWVzdGFtcCwgbWVzc2FnZUlkXG4gICAgICAgIEZST00gcmVhY3Rpb25zXG4gICAgICAgIEpPSU4gbWVzc2FnZXMgb24gbWVzc2FnZXMuaWQgSVMgcmVhY3Rpb25zLm1lc3NhZ2VJZFxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHVucmVhZCA+IDAgQU5EXG4gICAgICAgICAgbWVzc2FnZXMuY29udmVyc2F0aW9uSWQgSVMgJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICAgIG1lc3NhZ2VzLnJlY2VpdmVkX2F0IDw9ICRuZXdlc3RVbnJlYWRBdCBBTkRcbiAgICAgICAgICBtZXNzYWdlcy5zdG9yeUlkIElTICRzdG9yeUlkXG4gICAgICAgIE9SREVSIEJZIG1lc3NhZ2VSZWNlaXZlZEF0IERFU0M7XG4gICAgICBgXG4gICAgICApXG4gICAgICAuYWxsKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG5ld2VzdFVucmVhZEF0LFxuICAgICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgICB9KTtcblxuICAgIGNvbnN0IGlkc1RvVXBkYXRlID0gdW5yZWFkTWVzc2FnZXMubWFwKGl0ZW0gPT4gaXRlbS5yb3dpZCk7XG4gICAgYmF0Y2hNdWx0aVZhclF1ZXJ5KGRiLCBpZHNUb1VwZGF0ZSwgKGlkczogQXJyYXk8bnVtYmVyPik6IHZvaWQgPT4ge1xuICAgICAgZGIucHJlcGFyZTxBcnJheVF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBVUERBVEUgcmVhY3Rpb25zIFNFVFxuICAgICAgICB1bnJlYWQgPSAwIFdIRVJFIHJvd2lkIElOICggJHtpZHMubWFwKCgpID0+ICc/Jykuam9pbignLCAnKX0gKTtcbiAgICAgICAgYFxuICAgICAgKS5ydW4oaWRzKTtcbiAgICB9KTtcblxuICAgIHJldHVybiB1bnJlYWRNZXNzYWdlcztcbiAgfSkoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFya1JlYWN0aW9uQXNSZWFkKFxuICB0YXJnZXRBdXRob3JVdWlkOiBzdHJpbmcsXG4gIHRhcmdldFRpbWVzdGFtcDogbnVtYmVyXG4pOiBQcm9taXNlPFJlYWN0aW9uVHlwZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgcmVhZFJlYWN0aW9uID0gZGJcbiAgICAgIC5wcmVwYXJlKFxuICAgICAgICBgXG4gICAgICAgICAgU0VMRUNUICpcbiAgICAgICAgICBGUk9NIHJlYWN0aW9uc1xuICAgICAgICAgIFdIRVJFXG4gICAgICAgICAgICB0YXJnZXRBdXRob3JVdWlkID0gJHRhcmdldEF1dGhvclV1aWQgQU5EXG4gICAgICAgICAgICB0YXJnZXRUaW1lc3RhbXAgPSAkdGFyZ2V0VGltZXN0YW1wIEFORFxuICAgICAgICAgICAgdW5yZWFkID0gMVxuICAgICAgICAgIE9SREVSIEJZIHJvd0lkIERFU0NcbiAgICAgICAgICBMSU1JVCAxO1xuICAgICAgICBgXG4gICAgICApXG4gICAgICAuZ2V0KHtcbiAgICAgICAgdGFyZ2V0QXV0aG9yVXVpZCxcbiAgICAgICAgdGFyZ2V0VGltZXN0YW1wLFxuICAgICAgfSk7XG5cbiAgICBkYi5wcmVwYXJlKFxuICAgICAgYFxuICAgICAgICBVUERBVEUgcmVhY3Rpb25zIFNFVFxuICAgICAgICB1bnJlYWQgPSAwIFdIRVJFXG4gICAgICAgIHRhcmdldEF1dGhvclV1aWQgPSAkdGFyZ2V0QXV0aG9yVXVpZCBBTkRcbiAgICAgICAgdGFyZ2V0VGltZXN0YW1wID0gJHRhcmdldFRpbWVzdGFtcDtcbiAgICAgIGBcbiAgICApLnJ1bih7XG4gICAgICB0YXJnZXRBdXRob3JVdWlkLFxuICAgICAgdGFyZ2V0VGltZXN0YW1wLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlYWRSZWFjdGlvbjtcbiAgfSkoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYWRkUmVhY3Rpb24oe1xuICBjb252ZXJzYXRpb25JZCxcbiAgZW1vamksXG4gIGZyb21JZCxcbiAgbWVzc2FnZUlkLFxuICBtZXNzYWdlUmVjZWl2ZWRBdCxcbiAgdGFyZ2V0QXV0aG9yVXVpZCxcbiAgdGFyZ2V0VGltZXN0YW1wLFxufTogUmVhY3Rpb25UeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgYXdhaXQgZGJcbiAgICAucHJlcGFyZShcbiAgICAgIGBJTlNFUlQgSU5UTyByZWFjdGlvbnMgKFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBlbW9qaSxcbiAgICAgIGZyb21JZCxcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIG1lc3NhZ2VSZWNlaXZlZEF0LFxuICAgICAgdGFyZ2V0QXV0aG9yVXVpZCxcbiAgICAgIHRhcmdldFRpbWVzdGFtcCxcbiAgICAgIHVucmVhZFxuICAgICkgVkFMVUVTIChcbiAgICAgICRjb252ZXJzYXRpb25JZCxcbiAgICAgICRlbW9qaSxcbiAgICAgICRmcm9tSWQsXG4gICAgICAkbWVzc2FnZUlkLFxuICAgICAgJG1lc3NhZ2VSZWNlaXZlZEF0LFxuICAgICAgJHRhcmdldEF1dGhvclV1aWQsXG4gICAgICAkdGFyZ2V0VGltZXN0YW1wLFxuICAgICAgJHVucmVhZFxuICAgICk7YFxuICAgIClcbiAgICAucnVuKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZW1vamksXG4gICAgICBmcm9tSWQsXG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBtZXNzYWdlUmVjZWl2ZWRBdCxcbiAgICAgIHRhcmdldEF1dGhvclV1aWQsXG4gICAgICB0YXJnZXRUaW1lc3RhbXAsXG4gICAgICB1bnJlYWQ6IDEsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZVJlYWN0aW9uRnJvbUNvbnZlcnNhdGlvbih7XG4gIGVtb2ppLFxuICBmcm9tSWQsXG4gIHRhcmdldEF1dGhvclV1aWQsXG4gIHRhcmdldFRpbWVzdGFtcCxcbn06IHtcbiAgZW1vamk6IHN0cmluZztcbiAgZnJvbUlkOiBzdHJpbmc7XG4gIHRhcmdldEF1dGhvclV1aWQ6IHN0cmluZztcbiAgdGFyZ2V0VGltZXN0YW1wOiBudW1iZXI7XG59KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgYXdhaXQgZGJcbiAgICAucHJlcGFyZShcbiAgICAgIGBERUxFVEUgRlJPTSByZWFjdGlvbnMgV0hFUkVcbiAgICAgIGVtb2ppID0gJGVtb2ppIEFORFxuICAgICAgZnJvbUlkID0gJGZyb21JZCBBTkRcbiAgICAgIHRhcmdldEF1dGhvclV1aWQgPSAkdGFyZ2V0QXV0aG9yVXVpZCBBTkRcbiAgICAgIHRhcmdldFRpbWVzdGFtcCA9ICR0YXJnZXRUaW1lc3RhbXA7YFxuICAgIClcbiAgICAucnVuKHtcbiAgICAgIGVtb2ppLFxuICAgICAgZnJvbUlkLFxuICAgICAgdGFyZ2V0QXV0aG9yVXVpZCxcbiAgICAgIHRhcmdldFRpbWVzdGFtcCxcbiAgICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbFJlYWN0aW9ucygpOiBQcm9taXNlPEFycmF5PFJlYWN0aW9uVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gZGIucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUICogZnJvbSByZWFjdGlvbnM7JykuYWxsKCk7XG59XG5hc3luYyBmdW5jdGlvbiBfcmVtb3ZlQWxsUmVhY3Rpb25zKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oJ0RFTEVURSBmcm9tIHJlYWN0aW9uczsnKS5ydW4oKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBvcHRpb25zOiB7XG4gICAgaXNHcm91cDogYm9vbGVhbjtcbiAgICBsaW1pdD86IG51bWJlcjtcbiAgICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gICAgcmVjZWl2ZWRBdD86IG51bWJlcjtcbiAgICBzZW50QXQ/OiBudW1iZXI7XG4gICAgc3RvcnlJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICB9XG4pOiBQcm9taXNlPEFycmF5PE1lc3NhZ2VUeXBlVW5oeWRyYXRlZD4+IHtcbiAgcmV0dXJuIGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvblN5bmMoY29udmVyc2F0aW9uSWQsIG9wdGlvbnMpO1xufVxuZnVuY3Rpb24gZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uU3luYyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAge1xuICAgIGlzR3JvdXAsXG4gICAgbGltaXQgPSAxMDAsXG4gICAgbWVzc2FnZUlkLFxuICAgIHJlY2VpdmVkQXQgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICAgIHNlbnRBdCA9IE51bWJlci5NQVhfVkFMVUUsXG4gICAgc3RvcnlJZCxcbiAgfToge1xuICAgIGlzR3JvdXA6IGJvb2xlYW47XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgbWVzc2FnZUlkPzogc3RyaW5nO1xuICAgIHJlY2VpdmVkQXQ/OiBudW1iZXI7XG4gICAgc2VudEF0PzogbnVtYmVyO1xuICAgIHN0b3J5SWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgfVxuKTogQXJyYXk8TWVzc2FnZVR5cGVVbmh5ZHJhdGVkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzIFdIRVJFXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICAoJG1lc3NhZ2VJZCBJUyBOVUxMIE9SIGlkIElTIE5PVCAkbWVzc2FnZUlkKSBBTkRcbiAgICAgICAgaXNTdG9yeSBJUyAwIEFORFxuICAgICAgICAoJHtfc3RvcnlJZFByZWRpY2F0ZShzdG9yeUlkLCBpc0dyb3VwKX0pIEFORFxuICAgICAgICAoXG4gICAgICAgICAgKHJlY2VpdmVkX2F0ID0gJHJlY2VpdmVkX2F0IEFORCBzZW50X2F0IDwgJHNlbnRfYXQpIE9SXG4gICAgICAgICAgcmVjZWl2ZWRfYXQgPCAkcmVjZWl2ZWRfYXRcbiAgICAgICAgKVxuICAgICAgT1JERVIgQlkgcmVjZWl2ZWRfYXQgREVTQywgc2VudF9hdCBERVNDXG4gICAgICBMSU1JVCAkbGltaXQ7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBsaW1pdCxcbiAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZUlkIHx8IG51bGwsXG4gICAgICByZWNlaXZlZF9hdDogcmVjZWl2ZWRBdCxcbiAgICAgIHNlbnRfYXQ6IHNlbnRBdCxcbiAgICAgIHN0b3J5SWQ6IHN0b3J5SWQgfHwgbnVsbCxcbiAgICB9KVxuICAgIC5yZXZlcnNlKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE9sZGVyU3Rvcmllcyh7XG4gIGNvbnZlcnNhdGlvbklkLFxuICBsaW1pdCA9IDk5OTksXG4gIHJlY2VpdmVkQXQgPSBOdW1iZXIuTUFYX1ZBTFVFLFxuICBzZW50QXQsXG4gIHNvdXJjZVV1aWQsXG59OiB7XG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBsaW1pdD86IG51bWJlcjtcbiAgcmVjZWl2ZWRBdD86IG51bWJlcjtcbiAgc2VudEF0PzogbnVtYmVyO1xuICBzb3VyY2VVdWlkPzogc3RyaW5nO1xufSk6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBqc29uXG4gICAgICBGUk9NIG1lc3NhZ2VzXG4gICAgICBXSEVSRVxuICAgICAgICB0eXBlIElTICdzdG9yeScgQU5EXG4gICAgICAgICgkY29udmVyc2F0aW9uSWQgSVMgTlVMTCBPUiBjb252ZXJzYXRpb25JZCBJUyAkY29udmVyc2F0aW9uSWQpIEFORFxuICAgICAgICAoJHNvdXJjZVV1aWQgSVMgTlVMTCBPUiBzb3VyY2VVdWlkIElTICRzb3VyY2VVdWlkKSBBTkRcbiAgICAgICAgKHJlY2VpdmVkX2F0IDwgJHJlY2VpdmVkQXRcbiAgICAgICAgICBPUiAocmVjZWl2ZWRfYXQgSVMgJHJlY2VpdmVkQXQgQU5EIHNlbnRfYXQgPCAkc2VudEF0KVxuICAgICAgICApXG4gICAgICBPUkRFUiBCWSByZWNlaXZlZF9hdCBBU0MsIHNlbnRfYXQgQVNDXG4gICAgICBMSU1JVCAkbGltaXQ7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbklkIHx8IG51bGwsXG4gICAgICByZWNlaXZlZEF0LFxuICAgICAgc2VudEF0OiBzZW50QXQgfHwgbnVsbCxcbiAgICAgIHNvdXJjZVV1aWQ6IHNvdXJjZVV1aWQgfHwgbnVsbCxcbiAgICAgIGxpbWl0LFxuICAgIH0pO1xuXG4gIHJldHVybiByb3dzLm1hcChyb3cgPT4ganNvblRvT2JqZWN0KHJvdy5qc29uKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgb3B0aW9uczoge1xuICAgIGlzR3JvdXA6IGJvb2xlYW47XG4gICAgbGltaXQ/OiBudW1iZXI7XG4gICAgcmVjZWl2ZWRBdD86IG51bWJlcjtcbiAgICBzZW50QXQ/OiBudW1iZXI7XG4gICAgc3RvcnlJZDogVVVJRFN0cmluZ1R5cGUgfCB1bmRlZmluZWQ7XG4gIH1cbik6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGVVbmh5ZHJhdGVkPj4ge1xuICByZXR1cm4gZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uU3luYyhjb252ZXJzYXRpb25JZCwgb3B0aW9ucyk7XG59XG5mdW5jdGlvbiBnZXROZXdlck1lc3NhZ2VzQnlDb252ZXJzYXRpb25TeW5jKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICB7XG4gICAgaXNHcm91cCxcbiAgICBsaW1pdCA9IDEwMCxcbiAgICByZWNlaXZlZEF0ID0gMCxcbiAgICBzZW50QXQgPSAwLFxuICAgIHN0b3J5SWQsXG4gIH06IHtcbiAgICBpc0dyb3VwOiBib29sZWFuO1xuICAgIGxpbWl0PzogbnVtYmVyO1xuICAgIHJlY2VpdmVkQXQ/OiBudW1iZXI7XG4gICAgc2VudEF0PzogbnVtYmVyO1xuICAgIHN0b3J5SWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkO1xuICB9XG4pOiBBcnJheTxNZXNzYWdlVHlwZVVuaHlkcmF0ZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb24gRlJPTSBtZXNzYWdlcyBXSEVSRVxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgaXNTdG9yeSBJUyAwIEFORFxuICAgICAgICAoJHtfc3RvcnlJZFByZWRpY2F0ZShzdG9yeUlkLCBpc0dyb3VwKX0pIEFORFxuICAgICAgICAoXG4gICAgICAgICAgKHJlY2VpdmVkX2F0ID0gJHJlY2VpdmVkX2F0IEFORCBzZW50X2F0ID4gJHNlbnRfYXQpIE9SXG4gICAgICAgICAgcmVjZWl2ZWRfYXQgPiAkcmVjZWl2ZWRfYXRcbiAgICAgICAgKVxuICAgICAgT1JERVIgQlkgcmVjZWl2ZWRfYXQgQVNDLCBzZW50X2F0IEFTQ1xuICAgICAgTElNSVQgJGxpbWl0O1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbGltaXQsXG4gICAgICByZWNlaXZlZF9hdDogcmVjZWl2ZWRBdCxcbiAgICAgIHNlbnRfYXQ6IHNlbnRBdCxcbiAgICAgIHN0b3J5SWQ6IHN0b3J5SWQgfHwgbnVsbCxcbiAgICB9KTtcblxuICByZXR1cm4gcm93cztcbn1cbmZ1bmN0aW9uIGdldE9sZGVzdE1lc3NhZ2VGb3JDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHN0b3J5SWQ/OiBVVUlEU3RyaW5nVHlwZSxcbiAgaXNHcm91cD86IGJvb2xlYW5cbik6IE1lc3NhZ2VNZXRyaWNzVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93ID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICBpc1N0b3J5IElTIDAgQU5EXG4gICAgICAgICgke19zdG9yeUlkUHJlZGljYXRlKHN0b3J5SWQsIGlzR3JvdXApfSlcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IEFTQywgc2VudF9hdCBBU0NcbiAgICAgIExJTUlUIDE7XG4gICAgICBgXG4gICAgKVxuICAgIC5nZXQoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgfSk7XG5cbiAgaWYgKCFyb3cpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHJvdztcbn1cbmZ1bmN0aW9uIGdldE5ld2VzdE1lc3NhZ2VGb3JDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHN0b3J5SWQ/OiBVVUlEU3RyaW5nVHlwZSxcbiAgaXNHcm91cD86IGJvb2xlYW5cbik6IE1lc3NhZ2VNZXRyaWNzVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93ID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgKiBGUk9NIG1lc3NhZ2VzIFdIRVJFXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICBpc1N0b3J5IElTIDAgQU5EXG4gICAgICAgICgke19zdG9yeUlkUHJlZGljYXRlKHN0b3J5SWQsIGlzR3JvdXApfSlcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IERFU0MsIHNlbnRfYXQgREVTQ1xuICAgICAgTElNSVQgMTtcbiAgICAgIGBcbiAgICApXG4gICAgLmdldCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHN0b3J5SWQ6IHN0b3J5SWQgfHwgbnVsbCxcbiAgICB9KTtcblxuICBpZiAoIXJvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gcm93O1xufVxuXG5mdW5jdGlvbiBnZXRMYXN0Q29udmVyc2F0aW9uQWN0aXZpdHkoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgaXNHcm91cCxcbiAgb3VyVXVpZCxcbn06IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xufSk6IE1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3cgPSBwcmVwYXJlKFxuICAgIGRiLFxuICAgIGBcbiAgICAgIFNFTEVDVCBqc29uIEZST00gbWVzc2FnZXNcbiAgICAgIFdIRVJFXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkIEFORFxuICAgICAgICBzaG91bGRBZmZlY3RBY3Rpdml0eSBJUyAxIEFORFxuICAgICAgICBpc1RpbWVyQ2hhbmdlRnJvbVN5bmMgSVMgMCBBTkRcbiAgICAgICAgJHtpc0dyb3VwID8gJ3N0b3J5SWQgSVMgTlVMTCBBTkQnIDogJyd9XG4gICAgICAgIGlzR3JvdXBMZWF2ZUV2ZW50RnJvbU90aGVyIElTIDBcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IERFU0MsIHNlbnRfYXQgREVTQ1xuICAgICAgTElNSVQgMTtcbiAgICAgIGBcbiAgKS5nZXQoe1xuICAgIGNvbnZlcnNhdGlvbklkLFxuICAgIG91clV1aWQsXG4gIH0pO1xuXG4gIGlmICghcm93KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBqc29uVG9PYmplY3Qocm93Lmpzb24pO1xufVxuZnVuY3Rpb24gZ2V0TGFzdENvbnZlcnNhdGlvblByZXZpZXcoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgaXNHcm91cCxcbn06IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNHcm91cD86IGJvb2xlYW47XG59KTogTWVzc2FnZVR5cGUgfCB1bmRlZmluZWQge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvdyA9IHByZXBhcmUoXG4gICAgZGIsXG4gICAgYFxuICAgICAgU0VMRUNUIGpzb24gRlJPTSBtZXNzYWdlc1xuICAgICAgV0hFUkVcbiAgICAgICAgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWQgQU5EXG4gICAgICAgIHNob3VsZEFmZmVjdFByZXZpZXcgSVMgMSBBTkRcbiAgICAgICAgaXNHcm91cExlYXZlRXZlbnRGcm9tT3RoZXIgSVMgMCBBTkRcbiAgICAgICAgJHtpc0dyb3VwID8gJ3N0b3J5SWQgSVMgTlVMTCBBTkQnIDogJyd9XG4gICAgICAgIChcbiAgICAgICAgICBleHBpcmVzQXQgSVMgTlVMTFxuICAgICAgICAgIE9SXG4gICAgICAgICAgZXhwaXJlc0F0ID4gJG5vd1xuICAgICAgICApXG4gICAgICBPUkRFUiBCWSByZWNlaXZlZF9hdCBERVNDLCBzZW50X2F0IERFU0NcbiAgICAgIExJTUlUIDE7XG4gICAgICBgXG4gICkuZ2V0KHtcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBub3c6IERhdGUubm93KCksXG4gIH0pO1xuXG4gIGlmICghcm93KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBqc29uVG9PYmplY3Qocm93Lmpzb24pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRDb252ZXJzYXRpb25NZXNzYWdlU3RhdHMoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgaXNHcm91cCxcbiAgb3VyVXVpZCxcbn06IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNHcm91cD86IGJvb2xlYW47XG4gIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xufSk6IFByb21pc2U8Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzVHlwZT4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgYWN0aXZpdHk6IGdldExhc3RDb252ZXJzYXRpb25BY3Rpdml0eSh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBpc0dyb3VwLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSksXG4gICAgICBwcmV2aWV3OiBnZXRMYXN0Q29udmVyc2F0aW9uUHJldmlldyh7IGNvbnZlcnNhdGlvbklkLCBpc0dyb3VwIH0pLFxuICAgICAgaGFzVXNlckluaXRpYXRlZE1lc3NhZ2VzOiBoYXNVc2VySW5pdGlhdGVkTWVzc2FnZXMoY29udmVyc2F0aW9uSWQpLFxuICAgIH07XG4gIH0pKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldExhc3RDb252ZXJzYXRpb25NZXNzYWdlKHtcbiAgY29udmVyc2F0aW9uSWQsXG59OiB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG59KTogUHJvbWlzZTxNZXNzYWdlVHlwZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUICogRlJPTSBtZXNzYWdlcyBXSEVSRVxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZFxuICAgICAgT1JERVIgQlkgcmVjZWl2ZWRfYXQgREVTQywgc2VudF9hdCBERVNDXG4gICAgICBMSU1JVCAxO1xuICAgICAgYFxuICAgIClcbiAgICAuZ2V0KHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgIH0pO1xuXG4gIGlmICghcm93KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiBqc29uVG9PYmplY3Qocm93Lmpzb24pO1xufVxuXG5mdW5jdGlvbiBnZXRPbGRlc3RVbnNlZW5NZXNzYWdlRm9yQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBzdG9yeUlkPzogVVVJRFN0cmluZ1R5cGUsXG4gIGlzR3JvdXA/OiBib29sZWFuXG4pOiBNZXNzYWdlTWV0cmljc1R5cGUgfCB1bmRlZmluZWQge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUICogRlJPTSBtZXNzYWdlcyBXSEVSRVxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgc2VlblN0YXR1cyA9ICR7U2VlblN0YXR1cy5VbnNlZW59IEFORFxuICAgICAgICBpc1N0b3J5IElTIDAgQU5EXG4gICAgICAgICgke19zdG9yeUlkUHJlZGljYXRlKHN0b3J5SWQsIGlzR3JvdXApfSlcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IEFTQywgc2VudF9hdCBBU0NcbiAgICAgIExJTUlUIDE7XG4gICAgICBgXG4gICAgKVxuICAgIC5nZXQoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgfSk7XG5cbiAgaWYgKCFyb3cpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHJvdztcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHtcbiAgICBzdG9yeUlkOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZDtcbiAgICBpc0dyb3VwOiBib29sZWFuO1xuICB9XG4pOiBQcm9taXNlPG51bWJlcj4ge1xuICByZXR1cm4gZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb25TeW5jKGNvbnZlcnNhdGlvbklkLCBvcHRpb25zKTtcbn1cbmZ1bmN0aW9uIGdldFRvdGFsVW5yZWFkRm9yQ29udmVyc2F0aW9uU3luYyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAge1xuICAgIHN0b3J5SWQsXG4gICAgaXNHcm91cCxcbiAgfToge1xuICAgIHN0b3J5SWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkO1xuICAgIGlzR3JvdXA6IGJvb2xlYW47XG4gIH1cbik6IG51bWJlciB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93ID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgY291bnQoaWQpXG4gICAgICBGUk9NIG1lc3NhZ2VzXG4gICAgICBXSEVSRVxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5VbnJlYWR9IEFORFxuICAgICAgICBpc1N0b3J5IElTIDAgQU5EXG4gICAgICAgICgke19zdG9yeUlkUHJlZGljYXRlKHN0b3J5SWQsIGlzR3JvdXApfSlcbiAgICAgIGBcbiAgICApXG4gICAgLmdldCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHN0b3J5SWQ6IHN0b3J5SWQgfHwgbnVsbCxcbiAgICB9KTtcblxuICBpZiAoIXJvdykge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb246IFVuYWJsZSB0byBnZXQgY291bnQnKTtcbiAgfVxuXG4gIHJldHVybiByb3dbJ2NvdW50KGlkKSddO1xufVxuZnVuY3Rpb24gZ2V0VG90YWxVbnNlZW5Gb3JDb252ZXJzYXRpb25TeW5jKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBzdG9yeUlkPzogVVVJRFN0cmluZ1R5cGUsXG4gIGlzR3JvdXA/OiBib29sZWFuXG4pOiBudW1iZXIge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGNvdW50KGlkKVxuICAgICAgRlJPTSBtZXNzYWdlc1xuICAgICAgV0hFUkVcbiAgICAgICAgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWQgQU5EXG4gICAgICAgIHNlZW5TdGF0dXMgPSAke1NlZW5TdGF0dXMuVW5zZWVufSBBTkRcbiAgICAgICAgaXNTdG9yeSBJUyAwIEFORFxuICAgICAgICAoJHtfc3RvcnlJZFByZWRpY2F0ZShzdG9yeUlkLCBpc0dyb3VwKX0pXG4gICAgICBgXG4gICAgKVxuICAgIC5nZXQoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzdG9yeUlkOiBzdG9yeUlkIHx8IG51bGwsXG4gICAgfSk7XG5cbiAgaWYgKCFyb3cpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFRvdGFsVW5zZWVuRm9yQ29udmVyc2F0aW9uU3luYzogVW5hYmxlIHRvIGdldCBjb3VudCcpO1xuICB9XG5cbiAgcmV0dXJuIHJvd1snY291bnQoaWQpJ107XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VNZXRyaWNzRm9yQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBzdG9yeUlkPzogVVVJRFN0cmluZ1R5cGUsXG4gIGlzR3JvdXA/OiBib29sZWFuXG4pOiBQcm9taXNlPENvbnZlcnNhdGlvbk1ldHJpY3NUeXBlPiB7XG4gIHJldHVybiBnZXRNZXNzYWdlTWV0cmljc0ZvckNvbnZlcnNhdGlvblN5bmMoY29udmVyc2F0aW9uSWQsIHN0b3J5SWQsIGlzR3JvdXApO1xufVxuZnVuY3Rpb24gZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb25TeW5jKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBzdG9yeUlkPzogVVVJRFN0cmluZ1R5cGUsXG4gIGlzR3JvdXA/OiBib29sZWFuXG4pOiBDb252ZXJzYXRpb25NZXRyaWNzVHlwZSB7XG4gIGNvbnN0IG9sZGVzdCA9IGdldE9sZGVzdE1lc3NhZ2VGb3JDb252ZXJzYXRpb24oXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgc3RvcnlJZCxcbiAgICBpc0dyb3VwXG4gICk7XG4gIGNvbnN0IG5ld2VzdCA9IGdldE5ld2VzdE1lc3NhZ2VGb3JDb252ZXJzYXRpb24oXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgc3RvcnlJZCxcbiAgICBpc0dyb3VwXG4gICk7XG4gIGNvbnN0IG9sZGVzdFVuc2VlbiA9IGdldE9sZGVzdFVuc2Vlbk1lc3NhZ2VGb3JDb252ZXJzYXRpb24oXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgc3RvcnlJZCxcbiAgICBpc0dyb3VwXG4gICk7XG4gIGNvbnN0IHRvdGFsVW5zZWVuID0gZ2V0VG90YWxVbnNlZW5Gb3JDb252ZXJzYXRpb25TeW5jKFxuICAgIGNvbnZlcnNhdGlvbklkLFxuICAgIHN0b3J5SWQsXG4gICAgaXNHcm91cFxuICApO1xuXG4gIHJldHVybiB7XG4gICAgb2xkZXN0OiBvbGRlc3QgPyBwaWNrKG9sZGVzdCwgWydyZWNlaXZlZF9hdCcsICdzZW50X2F0JywgJ2lkJ10pIDogdW5kZWZpbmVkLFxuICAgIG5ld2VzdDogbmV3ZXN0ID8gcGljayhuZXdlc3QsIFsncmVjZWl2ZWRfYXQnLCAnc2VudF9hdCcsICdpZCddKSA6IHVuZGVmaW5lZCxcbiAgICBvbGRlc3RVbnNlZW46IG9sZGVzdFVuc2VlblxuICAgICAgPyBwaWNrKG9sZGVzdFVuc2VlbiwgWydyZWNlaXZlZF9hdCcsICdzZW50X2F0JywgJ2lkJ10pXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICB0b3RhbFVuc2VlbixcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0Q29udmVyc2F0aW9uUmFuZ2VDZW50ZXJlZE9uTWVzc2FnZSh7XG4gIGNvbnZlcnNhdGlvbklkLFxuICBpc0dyb3VwLFxuICBsaW1pdCxcbiAgbWVzc2FnZUlkLFxuICByZWNlaXZlZEF0LFxuICBzZW50QXQsXG4gIHN0b3J5SWQsXG59OiB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGlzR3JvdXA6IGJvb2xlYW47XG4gIGxpbWl0PzogbnVtYmVyO1xuICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgcmVjZWl2ZWRBdDogbnVtYmVyO1xuICBzZW50QXQ/OiBudW1iZXI7XG4gIHN0b3J5SWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkO1xufSk6IFByb21pc2U8e1xuICBvbGRlcjogQXJyYXk8TWVzc2FnZVR5cGVVbmh5ZHJhdGVkPjtcbiAgbmV3ZXI6IEFycmF5PE1lc3NhZ2VUeXBlVW5oeWRyYXRlZD47XG4gIG1ldHJpY3M6IENvbnZlcnNhdGlvbk1ldHJpY3NUeXBlO1xufT4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgb2xkZXI6IGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvblN5bmMoY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cCxcbiAgICAgICAgbGltaXQsXG4gICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgICAgc2VudEF0LFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfSksXG4gICAgICBuZXdlcjogZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uU3luYyhjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwLFxuICAgICAgICBsaW1pdCxcbiAgICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgICAgc2VudEF0LFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfSksXG4gICAgICBtZXRyaWNzOiBnZXRNZXNzYWdlTWV0cmljc0ZvckNvbnZlcnNhdGlvblN5bmMoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgICBpc0dyb3VwXG4gICAgICApLFxuICAgIH07XG4gIH0pKCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhc0dyb3VwQ2FsbEhpc3RvcnlNZXNzYWdlKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBlcmFJZDogc3RyaW5nXG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHJvdzogeyAnY291bnQoKiknOiBudW1iZXIgfSB8IHVuZGVmaW5lZCA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGNvdW50KCopIEZST00gbWVzc2FnZXNcbiAgICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkXG4gICAgICBBTkQgdHlwZSA9ICdjYWxsLWhpc3RvcnknXG4gICAgICBBTkQganNvbl9leHRyYWN0KGpzb24sICckLmNhbGxIaXN0b3J5RGV0YWlscy5jYWxsTW9kZScpID0gJ0dyb3VwJ1xuICAgICAgQU5EIGpzb25fZXh0cmFjdChqc29uLCAnJC5jYWxsSGlzdG9yeURldGFpbHMuZXJhSWQnKSA9ICRlcmFJZFxuICAgICAgTElNSVQgMTtcbiAgICAgIGBcbiAgICApXG4gICAgLmdldCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGVyYUlkLFxuICAgIH0pO1xuXG4gIGlmIChyb3cpIHtcbiAgICByZXR1cm4gQm9vbGVhbihyb3dbJ2NvdW50KCopJ10pO1xuICB9XG4gIHJldHVybiBmYWxzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWlncmF0ZUNvbnZlcnNhdGlvbk1lc3NhZ2VzKFxuICBvYnNvbGV0ZUlkOiBzdHJpbmcsXG4gIGN1cnJlbnRJZDogc3RyaW5nXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgbWVzc2FnZXMgU0VUXG4gICAgICBjb252ZXJzYXRpb25JZCA9ICRjdXJyZW50SWQsXG4gICAgICBqc29uID0ganNvbl9zZXQoanNvbiwgJyQuY29udmVyc2F0aW9uSWQnLCAkY3VycmVudElkKVxuICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJG9ic29sZXRlSWQ7XG4gICAgYFxuICApLnJ1bih7XG4gICAgb2Jzb2xldGVJZCxcbiAgICBjdXJyZW50SWQsXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlc0J5U2VudEF0KFxuICBzZW50QXQ6IG51bWJlclxuKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb24gRlJPTSBtZXNzYWdlc1xuICAgICAgV0hFUkUgc2VudF9hdCA9ICRzZW50X2F0XG4gICAgICBPUkRFUiBCWSByZWNlaXZlZF9hdCBERVNDLCBzZW50X2F0IERFU0M7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoe1xuICAgICAgc2VudF9hdDogc2VudEF0LFxuICAgIH0pO1xuXG4gIHJldHVybiByb3dzLm1hcChyb3cgPT4ganNvblRvT2JqZWN0KHJvdy5qc29uKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEV4cGlyZWRNZXNzYWdlcygpOiBQcm9taXNlPEFycmF5PE1lc3NhZ2VUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG5cbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBqc29uIEZST00gbWVzc2FnZXMgV0hFUkVcbiAgICAgICAgZXhwaXJlc0F0IElTIE5PVCBOVUxMIEFORFxuICAgICAgICBleHBpcmVzQXQgPD0gJG5vd1xuICAgICAgT1JERVIgQlkgZXhwaXJlc0F0IEFTQztcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7IG5vdyB9KTtcblxuICByZXR1cm4gcm93cy5tYXAocm93ID0+IGpzb25Ub09iamVjdChyb3cuanNvbikpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlc1VuZXhwZWN0ZWRseU1pc3NpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAoKTogUHJvbWlzZTxcbiAgQXJyYXk8TWVzc2FnZVR5cGU+XG4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzXG4gICAgICBJTkRFWEVEIEJZIG1lc3NhZ2VzX3VuZXhwZWN0ZWRseV9taXNzaW5nX2V4cGlyYXRpb25fc3RhcnRfdGltZXN0YW1wXG4gICAgICBXSEVSRVxuICAgICAgICBleHBpcmVUaW1lciA+IDAgQU5EXG4gICAgICAgIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCBJUyBOVUxMIEFORFxuICAgICAgICAoXG4gICAgICAgICAgdHlwZSBJUyAnb3V0Z29pbmcnIE9SXG4gICAgICAgICAgKHR5cGUgSVMgJ2luY29taW5nJyBBTkQgKFxuICAgICAgICAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5SZWFkfSBPUlxuICAgICAgICAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5WaWV3ZWR9IE9SXG4gICAgICAgICAgICByZWFkU3RhdHVzIElTIE5VTExcbiAgICAgICAgICApKVxuICAgICAgICApO1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U29vbmVzdE1lc3NhZ2VFeHBpcnkoKTogUHJvbWlzZTx1bmRlZmluZWQgfCBudW1iZXI+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIC8vIE5vdGU6IHdlIHVzZSBgcGx1Y2tgIHRvIG9ubHkgZ2V0IHRoZSBmaXJzdCBjb2x1bW4uXG4gIGNvbnN0IHJlc3VsdDogbnVsbCB8IG51bWJlciA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgTUlOKGV4cGlyZXNBdClcbiAgICAgIEZST00gbWVzc2FnZXM7XG4gICAgICBgXG4gICAgKVxuICAgIC5wbHVjayh0cnVlKVxuICAgIC5nZXQoKTtcblxuICByZXR1cm4gcmVzdWx0IHx8IHVuZGVmaW5lZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dFRhcFRvVmlld01lc3NhZ2VUaW1lc3RhbXBUb0FnZU91dCgpOiBQcm9taXNlPFxuICB1bmRlZmluZWQgfCBudW1iZXJcbj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvdyA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzXG4gICAgICBXSEVSRVxuICAgICAgICBpc1ZpZXdPbmNlID0gMVxuICAgICAgICBBTkQgKGlzRXJhc2VkIElTIE5VTEwgT1IgaXNFcmFzZWQgIT0gMSlcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IEFTQywgc2VudF9hdCBBU0NcbiAgICAgIExJTUlUIDE7XG4gICAgICBgXG4gICAgKVxuICAgIC5nZXQoKTtcblxuICBpZiAoIXJvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBkYXRhID0ganNvblRvT2JqZWN0PE1lc3NhZ2VUeXBlPihyb3cuanNvbik7XG4gIGNvbnN0IHJlc3VsdCA9IGRhdGEucmVjZWl2ZWRfYXRfbXMgfHwgZGF0YS5yZWNlaXZlZF9hdDtcbiAgcmV0dXJuIGlzTm9ybWFsTnVtYmVyKHJlc3VsdCkgPyByZXN1bHQgOiB1bmRlZmluZWQ7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFRhcFRvVmlld01lc3NhZ2VzTmVlZGluZ0VyYXNlKCk6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgVEhJUlRZX0RBWVNfQUdPID0gRGF0ZS5ub3coKSAtIDMwICogMjQgKiA2MCAqIDYwICogMTAwMDtcblxuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb25cbiAgICAgIEZST00gbWVzc2FnZXNcbiAgICAgIFdIRVJFXG4gICAgICAgIGlzVmlld09uY2UgPSAxXG4gICAgICAgIEFORCAoaXNFcmFzZWQgSVMgTlVMTCBPUiBpc0VyYXNlZCAhPSAxKVxuICAgICAgICBBTkQgcmVjZWl2ZWRfYXQgPD0gJFRISVJUWV9EQVlTX0FHT1xuICAgICAgT1JERVIgQlkgcmVjZWl2ZWRfYXQgQVNDLCBzZW50X2F0IEFTQztcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7XG4gICAgICBUSElSVFlfREFZU19BR08sXG4gICAgfSk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cblxuY29uc3QgTUFYX1VOUFJPQ0VTU0VEX0FUVEVNUFRTID0gMztcblxuZnVuY3Rpb24gc2F2ZVVucHJvY2Vzc2VkU3luYyhkYXRhOiBVbnByb2Nlc3NlZFR5cGUpOiBzdHJpbmcge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHtcbiAgICBpZCxcbiAgICB0aW1lc3RhbXAsXG4gICAgcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgdmVyc2lvbixcbiAgICBhdHRlbXB0cyxcbiAgICBlbnZlbG9wZSxcbiAgICBzb3VyY2UsXG4gICAgc291cmNlVXVpZCxcbiAgICBzb3VyY2VEZXZpY2UsXG4gICAgc2VydmVyR3VpZCxcbiAgICBzZXJ2ZXJUaW1lc3RhbXAsXG4gICAgZGVjcnlwdGVkLFxuICB9ID0gZGF0YTtcbiAgaWYgKCFpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcignc2F2ZVVucHJvY2Vzc2VkU3luYzogaWQgd2FzIGZhbHNleScpO1xuICB9XG5cbiAgaWYgKGF0dGVtcHRzID49IE1BWF9VTlBST0NFU1NFRF9BVFRFTVBUUykge1xuICAgIHJlbW92ZVVucHJvY2Vzc2VkU3luYyhpZCk7XG4gICAgcmV0dXJuIGlkO1xuICB9XG5cbiAgcHJlcGFyZShcbiAgICBkYixcbiAgICBgXG4gICAgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyB1bnByb2Nlc3NlZCAoXG4gICAgICBpZCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIHJlY2VpdmVkQXRDb3VudGVyLFxuICAgICAgdmVyc2lvbixcbiAgICAgIGF0dGVtcHRzLFxuICAgICAgZW52ZWxvcGUsXG4gICAgICBzb3VyY2UsXG4gICAgICBzb3VyY2VVdWlkLFxuICAgICAgc291cmNlRGV2aWNlLFxuICAgICAgc2VydmVyR3VpZCxcbiAgICAgIHNlcnZlclRpbWVzdGFtcCxcbiAgICAgIGRlY3J5cHRlZFxuICAgICkgdmFsdWVzIChcbiAgICAgICRpZCxcbiAgICAgICR0aW1lc3RhbXAsXG4gICAgICAkcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICAkdmVyc2lvbixcbiAgICAgICRhdHRlbXB0cyxcbiAgICAgICRlbnZlbG9wZSxcbiAgICAgICRzb3VyY2UsXG4gICAgICAkc291cmNlVXVpZCxcbiAgICAgICRzb3VyY2VEZXZpY2UsXG4gICAgICAkc2VydmVyR3VpZCxcbiAgICAgICRzZXJ2ZXJUaW1lc3RhbXAsXG4gICAgICAkZGVjcnlwdGVkXG4gICAgKTtcbiAgICBgXG4gICkucnVuKHtcbiAgICBpZCxcbiAgICB0aW1lc3RhbXAsXG4gICAgcmVjZWl2ZWRBdENvdW50ZXI6IHJlY2VpdmVkQXRDb3VudGVyID8/IG51bGwsXG4gICAgdmVyc2lvbixcbiAgICBhdHRlbXB0cyxcbiAgICBlbnZlbG9wZTogZW52ZWxvcGUgfHwgbnVsbCxcbiAgICBzb3VyY2U6IHNvdXJjZSB8fCBudWxsLFxuICAgIHNvdXJjZVV1aWQ6IHNvdXJjZVV1aWQgfHwgbnVsbCxcbiAgICBzb3VyY2VEZXZpY2U6IHNvdXJjZURldmljZSB8fCBudWxsLFxuICAgIHNlcnZlckd1aWQ6IHNlcnZlckd1aWQgfHwgbnVsbCxcbiAgICBzZXJ2ZXJUaW1lc3RhbXA6IHNlcnZlclRpbWVzdGFtcCB8fCBudWxsLFxuICAgIGRlY3J5cHRlZDogZGVjcnlwdGVkIHx8IG51bGwsXG4gIH0pO1xuXG4gIHJldHVybiBpZDtcbn1cblxuZnVuY3Rpb24gdXBkYXRlVW5wcm9jZXNzZWRXaXRoRGF0YVN5bmMoXG4gIGlkOiBzdHJpbmcsXG4gIGRhdGE6IFVucHJvY2Vzc2VkVXBkYXRlVHlwZVxuKTogdm9pZCB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qge1xuICAgIHNvdXJjZSxcbiAgICBzb3VyY2VVdWlkLFxuICAgIHNvdXJjZURldmljZSxcbiAgICBzZXJ2ZXJHdWlkLFxuICAgIHNlcnZlclRpbWVzdGFtcCxcbiAgICBkZWNyeXB0ZWQsXG4gIH0gPSBkYXRhO1xuXG4gIHByZXBhcmUoXG4gICAgZGIsXG4gICAgYFxuICAgIFVQREFURSB1bnByb2Nlc3NlZCBTRVRcbiAgICAgIHNvdXJjZSA9ICRzb3VyY2UsXG4gICAgICBzb3VyY2VVdWlkID0gJHNvdXJjZVV1aWQsXG4gICAgICBzb3VyY2VEZXZpY2UgPSAkc291cmNlRGV2aWNlLFxuICAgICAgc2VydmVyR3VpZCA9ICRzZXJ2ZXJHdWlkLFxuICAgICAgc2VydmVyVGltZXN0YW1wID0gJHNlcnZlclRpbWVzdGFtcCxcbiAgICAgIGRlY3J5cHRlZCA9ICRkZWNyeXB0ZWRcbiAgICBXSEVSRSBpZCA9ICRpZDtcbiAgICBgXG4gICkucnVuKHtcbiAgICBpZCxcbiAgICBzb3VyY2U6IHNvdXJjZSB8fCBudWxsLFxuICAgIHNvdXJjZVV1aWQ6IHNvdXJjZVV1aWQgfHwgbnVsbCxcbiAgICBzb3VyY2VEZXZpY2U6IHNvdXJjZURldmljZSB8fCBudWxsLFxuICAgIHNlcnZlckd1aWQ6IHNlcnZlckd1aWQgfHwgbnVsbCxcbiAgICBzZXJ2ZXJUaW1lc3RhbXA6IHNlcnZlclRpbWVzdGFtcCB8fCBudWxsLFxuICAgIGRlY3J5cHRlZDogZGVjcnlwdGVkIHx8IG51bGwsXG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVVbnByb2Nlc3NlZFdpdGhEYXRhKFxuICBpZDogc3RyaW5nLFxuICBkYXRhOiBVbnByb2Nlc3NlZFVwZGF0ZVR5cGVcbik6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gdXBkYXRlVW5wcm9jZXNzZWRXaXRoRGF0YVN5bmMoaWQsIGRhdGEpO1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVVbnByb2Nlc3NlZHNXaXRoRGF0YShcbiAgYXJyYXlPZlVucHJvY2Vzc2VkOiBBcnJheTx7IGlkOiBzdHJpbmc7IGRhdGE6IFVucHJvY2Vzc2VkVXBkYXRlVHlwZSB9PlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZm9yIChjb25zdCB7IGlkLCBkYXRhIH0gb2YgYXJyYXlPZlVucHJvY2Vzc2VkKSB7XG4gICAgICBhc3NlcnRTeW5jKHVwZGF0ZVVucHJvY2Vzc2VkV2l0aERhdGFTeW5jKGlkLCBkYXRhKSk7XG4gICAgfVxuICB9KSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRVbnByb2Nlc3NlZEJ5SWQoXG4gIGlkOiBzdHJpbmdcbik6IFByb21pc2U8VW5wcm9jZXNzZWRUeXBlIHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgcm93ID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oJ1NFTEVDVCAqIEZST00gdW5wcm9jZXNzZWQgV0hFUkUgaWQgPSAkaWQ7JylcbiAgICAuZ2V0KHtcbiAgICAgIGlkLFxuICAgIH0pO1xuXG4gIHJldHVybiByb3c7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFVucHJvY2Vzc2VkQ291bnQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgcmV0dXJuIGdldENvdW50RnJvbVRhYmxlKGdldEluc3RhbmNlKCksICd1bnByb2Nlc3NlZCcpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzKCk6IFByb21pc2U8XG4gIEFycmF5PFVucHJvY2Vzc2VkVHlwZT5cbj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgcmV0dXJuIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBjb25zdCB7IGNoYW5nZXM6IGRlbGV0ZWRTdGFsZUNvdW50IH0gPSBkYlxuICAgICAgLnByZXBhcmU8UXVlcnk+KCdERUxFVEUgRlJPTSB1bnByb2Nlc3NlZCBXSEVSRSB0aW1lc3RhbXAgPCAkbW9udGhBZ28nKVxuICAgICAgLnJ1bih7XG4gICAgICAgIG1vbnRoQWdvOiBEYXRlLm5vdygpIC0gZHVyYXRpb25zLk1PTlRILFxuICAgICAgfSk7XG5cbiAgICBpZiAoZGVsZXRlZFN0YWxlQ291bnQgIT09IDApIHtcbiAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAnZ2V0QWxsVW5wcm9jZXNzZWRBbmRJbmNyZW1lbnRBdHRlbXB0czogJyArXG4gICAgICAgICAgYGRlbGV0aW5nICR7ZGVsZXRlZFN0YWxlQ291bnR9IG9sZCB1bnByb2Nlc3NlZCBlbnZlbG9wZXNgXG4gICAgICApO1xuICAgIH1cblxuICAgIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICAgIFVQREFURSB1bnByb2Nlc3NlZFxuICAgICAgICBTRVQgYXR0ZW1wdHMgPSBhdHRlbXB0cyArIDFcbiAgICAgIGBcbiAgICApLnJ1bigpO1xuXG4gICAgY29uc3QgeyBjaGFuZ2VzOiBkZWxldGVkSW52YWxpZENvdW50IH0gPSBkYlxuICAgICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgICAgREVMRVRFIEZST00gdW5wcm9jZXNzZWRcbiAgICAgICAgICBXSEVSRSBhdHRlbXB0cyA+PSAkTUFYX1VOUFJPQ0VTU0VEX0FUVEVNUFRTXG4gICAgICAgIGBcbiAgICAgIClcbiAgICAgIC5ydW4oeyBNQVhfVU5QUk9DRVNTRURfQVRURU1QVFMgfSk7XG5cbiAgICBpZiAoZGVsZXRlZEludmFsaWRDb3VudCAhPT0gMCkge1xuICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICdnZXRBbGxVbnByb2Nlc3NlZEFuZEluY3JlbWVudEF0dGVtcHRzOiAnICtcbiAgICAgICAgICBgZGVsZXRpbmcgJHtkZWxldGVkSW52YWxpZENvdW50fSBpbnZhbGlkIHVucHJvY2Vzc2VkIGVudmVsb3Blc2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGRiXG4gICAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICAgIFNFTEVDVCAqXG4gICAgICAgICAgRlJPTSB1bnByb2Nlc3NlZFxuICAgICAgICAgIE9SREVSIEJZIHJlY2VpdmVkQXRDb3VudGVyIEFTQztcbiAgICAgICAgYFxuICAgICAgKVxuICAgICAgLmFsbCgpO1xuICB9KSgpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVVbnByb2Nlc3NlZHNTeW5jKGlkczogQXJyYXk8c3RyaW5nPik6IHZvaWQge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIucHJlcGFyZTxBcnJheVF1ZXJ5PihcbiAgICBgXG4gICAgREVMRVRFIEZST00gdW5wcm9jZXNzZWRcbiAgICBXSEVSRSBpZCBJTiAoICR7aWRzLm1hcCgoKSA9PiAnPycpLmpvaW4oJywgJyl9ICk7XG4gICAgYFxuICApLnJ1bihpZHMpO1xufVxuXG5mdW5jdGlvbiByZW1vdmVVbnByb2Nlc3NlZFN5bmMoaWQ6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiB2b2lkIHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGlmICghQXJyYXkuaXNBcnJheShpZCkpIHtcbiAgICBwcmVwYXJlKGRiLCAnREVMRVRFIEZST00gdW5wcm9jZXNzZWQgV0hFUkUgaWQgPSAkaWQ7JykucnVuKHsgaWQgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGlzIGNhbiBoYXBwZW4gbm9ybWFsbHkgZHVlIHRvIGZsdXNoaW5nIG9mIGBjYWNoZVJlbW92ZUJhdGNoZXJgIGluXG4gIC8vIE1lc3NhZ2VSZWNlaXZlci5cbiAgaWYgKCFpZC5sZW5ndGgpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBhc3NlcnRTeW5jKGJhdGNoTXVsdGlWYXJRdWVyeShkYiwgaWQsIHJlbW92ZVVucHJvY2Vzc2Vkc1N5bmMpKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlVW5wcm9jZXNzZWQoaWQ6IHN0cmluZyB8IEFycmF5PHN0cmluZz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmVtb3ZlVW5wcm9jZXNzZWRTeW5jKGlkKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQWxsVW5wcm9jZXNzZWQoKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgZGIucHJlcGFyZTxFbXB0eVF1ZXJ5PignREVMRVRFIEZST00gdW5wcm9jZXNzZWQ7JykucnVuKCk7XG59XG5cbi8vIEF0dGFjaG1lbnQgRG93bmxvYWRzXG5cbmNvbnN0IEFUVEFDSE1FTlRfRE9XTkxPQURTX1RBQkxFID0gJ2F0dGFjaG1lbnRfZG93bmxvYWRzJztcbmFzeW5jIGZ1bmN0aW9uIGdldEF0dGFjaG1lbnREb3dubG9hZEpvYkJ5SWQoXG4gIGlkOiBzdHJpbmdcbik6IFByb21pc2U8QXR0YWNobWVudERvd25sb2FkSm9iVHlwZSB8IHVuZGVmaW5lZD4ge1xuICByZXR1cm4gZ2V0QnlJZChnZXRJbnN0YW5jZSgpLCBBVFRBQ0hNRU5UX0RPV05MT0FEU19UQUJMRSwgaWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0TmV4dEF0dGFjaG1lbnREb3dubG9hZEpvYnMoXG4gIGxpbWl0PzogbnVtYmVyLFxuICBvcHRpb25zOiB7IHRpbWVzdGFtcD86IG51bWJlciB9ID0ge31cbik6IFByb21pc2U8QXJyYXk8QXR0YWNobWVudERvd25sb2FkSm9iVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCB0aW1lc3RhbXAgPVxuICAgIG9wdGlvbnMgJiYgb3B0aW9ucy50aW1lc3RhbXAgPyBvcHRpb25zLnRpbWVzdGFtcCA6IERhdGUubm93KCk7XG5cbiAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBqc29uXG4gICAgICBGUk9NIGF0dGFjaG1lbnRfZG93bmxvYWRzXG4gICAgICBXSEVSRSBwZW5kaW5nID0gMCBBTkQgdGltZXN0YW1wIDw9ICR0aW1lc3RhbXBcbiAgICAgIE9SREVSIEJZIHRpbWVzdGFtcCBERVNDXG4gICAgICBMSU1JVCAkbGltaXQ7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoe1xuICAgICAgbGltaXQ6IGxpbWl0IHx8IDMsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNhdmVBdHRhY2htZW50RG93bmxvYWRKb2IoXG4gIGpvYjogQXR0YWNobWVudERvd25sb2FkSm9iVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgeyBpZCwgcGVuZGluZywgdGltZXN0YW1wIH0gPSBqb2I7XG4gIGlmICghaWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnc2F2ZUF0dGFjaG1lbnREb3dubG9hZEpvYjogUHJvdmlkZWQgam9iIGRpZCBub3QgaGF2ZSBhIHRydXRoeSBpZCdcbiAgICApO1xuICB9XG5cbiAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgYFxuICAgIElOU0VSVCBPUiBSRVBMQUNFIElOVE8gYXR0YWNobWVudF9kb3dubG9hZHMgKFxuICAgICAgaWQsXG4gICAgICBwZW5kaW5nLFxuICAgICAgdGltZXN0YW1wLFxuICAgICAganNvblxuICAgICkgdmFsdWVzIChcbiAgICAgICRpZCxcbiAgICAgICRwZW5kaW5nLFxuICAgICAgJHRpbWVzdGFtcCxcbiAgICAgICRqc29uXG4gICAgKVxuICAgIGBcbiAgKS5ydW4oe1xuICAgIGlkLFxuICAgIHBlbmRpbmcsXG4gICAgdGltZXN0YW1wLFxuICAgIGpzb246IG9iamVjdFRvSlNPTihqb2IpLFxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHNldEF0dGFjaG1lbnREb3dubG9hZEpvYlBlbmRpbmcoXG4gIGlkOiBzdHJpbmcsXG4gIHBlbmRpbmc6IGJvb2xlYW5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgYXR0YWNobWVudF9kb3dubG9hZHNcbiAgICBTRVQgcGVuZGluZyA9ICRwZW5kaW5nXG4gICAgV0hFUkUgaWQgPSAkaWQ7XG4gICAgYFxuICApLnJ1bih7XG4gICAgaWQsXG4gICAgcGVuZGluZzogcGVuZGluZyA/IDEgOiAwLFxuICB9KTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlc2V0QXR0YWNobWVudERvd25sb2FkUGVuZGluZygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBkYi5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgYXR0YWNobWVudF9kb3dubG9hZHNcbiAgICBTRVQgcGVuZGluZyA9IDBcbiAgICBXSEVSRSBwZW5kaW5nICE9IDA7XG4gICAgYFxuICApLnJ1bigpO1xufVxuYXN5bmMgZnVuY3Rpb24gcmVtb3ZlQXR0YWNobWVudERvd25sb2FkSm9iKGlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgcmV0dXJuIHJlbW92ZUJ5SWQoZ2V0SW5zdGFuY2UoKSwgQVRUQUNITUVOVF9ET1dOTE9BRFNfVEFCTEUsIGlkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbEF0dGFjaG1lbnREb3dubG9hZEpvYnMoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiByZW1vdmVBbGxGcm9tVGFibGUoZ2V0SW5zdGFuY2UoKSwgQVRUQUNITUVOVF9ET1dOTE9BRFNfVEFCTEUpO1xufVxuXG4vLyBTdGlja2Vyc1xuXG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVN0aWNrZXJQYWNrKHBhY2s6IFN0aWNrZXJQYWNrVHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHtcbiAgICBhdHRlbXB0ZWRTdGF0dXMsXG4gICAgYXV0aG9yLFxuICAgIGNvdmVyU3RpY2tlcklkLFxuICAgIGNyZWF0ZWRBdCxcbiAgICBkb3dubG9hZEF0dGVtcHRzLFxuICAgIGlkLFxuICAgIGluc3RhbGxlZEF0LFxuICAgIGtleSxcbiAgICBsYXN0VXNlZCxcbiAgICBzdGF0dXMsXG4gICAgc3RpY2tlckNvdW50LFxuICAgIHRpdGxlLFxuICB9ID0gcGFjaztcbiAgaWYgKCFpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdjcmVhdGVPclVwZGF0ZVN0aWNrZXJQYWNrOiBQcm92aWRlZCBkYXRhIGRpZCBub3QgaGF2ZSBhIHRydXRoeSBpZCdcbiAgICApO1xuICB9XG5cbiAgY29uc3Qgcm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGlkXG4gICAgICBGUk9NIHN0aWNrZXJfcGFja3NcbiAgICAgIFdIRVJFIGlkID0gJGlkO1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKHsgaWQgfSk7XG4gIGNvbnN0IHBheWxvYWQgPSB7XG4gICAgYXR0ZW1wdGVkU3RhdHVzOiBhdHRlbXB0ZWRTdGF0dXMgPz8gbnVsbCxcbiAgICBhdXRob3IsXG4gICAgY292ZXJTdGlja2VySWQsXG4gICAgY3JlYXRlZEF0OiBjcmVhdGVkQXQgfHwgRGF0ZS5ub3coKSxcbiAgICBkb3dubG9hZEF0dGVtcHRzOiBkb3dubG9hZEF0dGVtcHRzIHx8IDEsXG4gICAgaWQsXG4gICAgaW5zdGFsbGVkQXQ6IGluc3RhbGxlZEF0ID8/IG51bGwsXG4gICAga2V5LFxuICAgIGxhc3RVc2VkOiBsYXN0VXNlZCB8fCBudWxsLFxuICAgIHN0YXR1cyxcbiAgICBzdGlja2VyQ291bnQsXG4gICAgdGl0bGUsXG4gIH07XG5cbiAgaWYgKHJvd3MgJiYgcm93cy5sZW5ndGgpIHtcbiAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFVQREFURSBzdGlja2VyX3BhY2tzIFNFVFxuICAgICAgICBhdHRlbXB0ZWRTdGF0dXMgPSAkYXR0ZW1wdGVkU3RhdHVzLFxuICAgICAgICBhdXRob3IgPSAkYXV0aG9yLFxuICAgICAgICBjb3ZlclN0aWNrZXJJZCA9ICRjb3ZlclN0aWNrZXJJZCxcbiAgICAgICAgY3JlYXRlZEF0ID0gJGNyZWF0ZWRBdCxcbiAgICAgICAgZG93bmxvYWRBdHRlbXB0cyA9ICRkb3dubG9hZEF0dGVtcHRzLFxuICAgICAgICBpbnN0YWxsZWRBdCA9ICRpbnN0YWxsZWRBdCxcbiAgICAgICAga2V5ID0gJGtleSxcbiAgICAgICAgbGFzdFVzZWQgPSAkbGFzdFVzZWQsXG4gICAgICAgIHN0YXR1cyA9ICRzdGF0dXMsXG4gICAgICAgIHN0aWNrZXJDb3VudCA9ICRzdGlja2VyQ291bnQsXG4gICAgICAgIHRpdGxlID0gJHRpdGxlXG4gICAgICBXSEVSRSBpZCA9ICRpZDtcbiAgICAgIGBcbiAgICApLnJ1bihwYXlsb2FkKTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBJTlNFUlQgSU5UTyBzdGlja2VyX3BhY2tzIChcbiAgICAgIGF0dGVtcHRlZFN0YXR1cyxcbiAgICAgIGF1dGhvcixcbiAgICAgIGNvdmVyU3RpY2tlcklkLFxuICAgICAgY3JlYXRlZEF0LFxuICAgICAgZG93bmxvYWRBdHRlbXB0cyxcbiAgICAgIGlkLFxuICAgICAgaW5zdGFsbGVkQXQsXG4gICAgICBrZXksXG4gICAgICBsYXN0VXNlZCxcbiAgICAgIHN0YXR1cyxcbiAgICAgIHN0aWNrZXJDb3VudCxcbiAgICAgIHRpdGxlXG4gICAgKSB2YWx1ZXMgKFxuICAgICAgJGF0dGVtcHRlZFN0YXR1cyxcbiAgICAgICRhdXRob3IsXG4gICAgICAkY292ZXJTdGlja2VySWQsXG4gICAgICAkY3JlYXRlZEF0LFxuICAgICAgJGRvd25sb2FkQXR0ZW1wdHMsXG4gICAgICAkaWQsXG4gICAgICAkaW5zdGFsbGVkQXQsXG4gICAgICAka2V5LFxuICAgICAgJGxhc3RVc2VkLFxuICAgICAgJHN0YXR1cyxcbiAgICAgICRzdGlja2VyQ291bnQsXG4gICAgICAkdGl0bGVcbiAgICApXG4gICAgYFxuICApLnJ1bihwYXlsb2FkKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZVN0aWNrZXJQYWNrU3RhdHVzKFxuICBpZDogc3RyaW5nLFxuICBzdGF0dXM6IFN0aWNrZXJQYWNrU3RhdHVzVHlwZSxcbiAgb3B0aW9ucz86IHsgdGltZXN0YW1wOiBudW1iZXIgfVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgdGltZXN0YW1wID0gb3B0aW9ucyA/IG9wdGlvbnMudGltZXN0YW1wIHx8IERhdGUubm93KCkgOiBEYXRlLm5vdygpO1xuICBjb25zdCBpbnN0YWxsZWRBdCA9IHN0YXR1cyA9PT0gJ2luc3RhbGxlZCcgPyB0aW1lc3RhbXAgOiBudWxsO1xuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgc3RpY2tlcl9wYWNrc1xuICAgIFNFVCBzdGF0dXMgPSAkc3RhdHVzLCBpbnN0YWxsZWRBdCA9ICRpbnN0YWxsZWRBdFxuICAgIFdIRVJFIGlkID0gJGlkO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIGlkLFxuICAgIHN0YXR1cyxcbiAgICBpbnN0YWxsZWRBdCxcbiAgfSk7XG59XG5hc3luYyBmdW5jdGlvbiBjbGVhckFsbEVycm9yU3RpY2tlclBhY2tBdHRlbXB0cygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgYFxuICAgIFVQREFURSBzdGlja2VyX3BhY2tzXG4gICAgU0VUIGRvd25sb2FkQXR0ZW1wdHMgPSAwXG4gICAgV0hFUkUgc3RhdHVzID0gJ2Vycm9yJztcbiAgICBgXG4gICkucnVuKCk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVPclVwZGF0ZVN0aWNrZXIoc3RpY2tlcjogU3RpY2tlclR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCB7IGVtb2ppLCBoZWlnaHQsIGlkLCBpc0NvdmVyT25seSwgbGFzdFVzZWQsIHBhY2tJZCwgcGF0aCwgd2lkdGggfSA9XG4gICAgc3RpY2tlcjtcblxuICBpZiAoIWlzTnVtYmVyKGlkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdjcmVhdGVPclVwZGF0ZVN0aWNrZXI6IFByb3ZpZGVkIGRhdGEgZGlkIG5vdCBoYXZlIGEgbnVtZXJpYyBpZCdcbiAgICApO1xuICB9XG4gIGlmICghcGFja0lkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2NyZWF0ZU9yVXBkYXRlU3RpY2tlcjogUHJvdmlkZWQgZGF0YSBkaWQgbm90IGhhdmUgYSB0cnV0aHkgaWQnXG4gICAgKTtcbiAgfVxuXG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIHN0aWNrZXJzIChcbiAgICAgIGVtb2ppLFxuICAgICAgaGVpZ2h0LFxuICAgICAgaWQsXG4gICAgICBpc0NvdmVyT25seSxcbiAgICAgIGxhc3RVc2VkLFxuICAgICAgcGFja0lkLFxuICAgICAgcGF0aCxcbiAgICAgIHdpZHRoXG4gICAgKSB2YWx1ZXMgKFxuICAgICAgJGVtb2ppLFxuICAgICAgJGhlaWdodCxcbiAgICAgICRpZCxcbiAgICAgICRpc0NvdmVyT25seSxcbiAgICAgICRsYXN0VXNlZCxcbiAgICAgICRwYWNrSWQsXG4gICAgICAkcGF0aCxcbiAgICAgICR3aWR0aFxuICAgIClcbiAgICBgXG4gICkucnVuKHtcbiAgICBlbW9qaTogZW1vamkgPz8gbnVsbCxcbiAgICBoZWlnaHQsXG4gICAgaWQsXG4gICAgaXNDb3Zlck9ubHk6IGlzQ292ZXJPbmx5ID8gMSA6IDAsXG4gICAgbGFzdFVzZWQ6IGxhc3RVc2VkIHx8IG51bGwsXG4gICAgcGFja0lkLFxuICAgIHBhdGgsXG4gICAgd2lkdGgsXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlU3RpY2tlckxhc3RVc2VkKFxuICBwYWNrSWQ6IHN0cmluZyxcbiAgc3RpY2tlcklkOiBudW1iZXIsXG4gIGxhc3RVc2VkOiBudW1iZXJcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgc3RpY2tlcnNcbiAgICBTRVQgbGFzdFVzZWQgPSAkbGFzdFVzZWRcbiAgICBXSEVSRSBpZCA9ICRpZCBBTkQgcGFja0lkID0gJHBhY2tJZDtcbiAgICBgXG4gICkucnVuKHtcbiAgICBpZDogc3RpY2tlcklkLFxuICAgIHBhY2tJZCxcbiAgICBsYXN0VXNlZCxcbiAgfSk7XG4gIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICBVUERBVEUgc3RpY2tlcl9wYWNrc1xuICAgIFNFVCBsYXN0VXNlZCA9ICRsYXN0VXNlZFxuICAgIFdIRVJFIGlkID0gJGlkO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIGlkOiBwYWNrSWQsXG4gICAgbGFzdFVzZWQsXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gYWRkU3RpY2tlclBhY2tSZWZlcmVuY2UoXG4gIG1lc3NhZ2VJZDogc3RyaW5nLFxuICBwYWNrSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBpZiAoIW1lc3NhZ2VJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdhZGRTdGlja2VyUGFja1JlZmVyZW5jZTogUHJvdmlkZWQgZGF0YSBkaWQgbm90IGhhdmUgYSB0cnV0aHkgbWVzc2FnZUlkJ1xuICAgICk7XG4gIH1cbiAgaWYgKCFwYWNrSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYWRkU3RpY2tlclBhY2tSZWZlcmVuY2U6IFByb3ZpZGVkIGRhdGEgZGlkIG5vdCBoYXZlIGEgdHJ1dGh5IHBhY2tJZCdcbiAgICApO1xuICB9XG5cbiAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgYFxuICAgIElOU0VSVCBPUiBSRVBMQUNFIElOVE8gc3RpY2tlcl9yZWZlcmVuY2VzIChcbiAgICAgIG1lc3NhZ2VJZCxcbiAgICAgIHBhY2tJZFxuICAgICkgdmFsdWVzIChcbiAgICAgICRtZXNzYWdlSWQsXG4gICAgICAkcGFja0lkXG4gICAgKVxuICAgIGBcbiAgKS5ydW4oe1xuICAgIG1lc3NhZ2VJZCxcbiAgICBwYWNrSWQsXG4gIH0pO1xufVxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU3RpY2tlclBhY2tSZWZlcmVuY2UoXG4gIG1lc3NhZ2VJZDogc3RyaW5nLFxuICBwYWNrSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxSZWFkb25seUFycmF5PHN0cmluZz4gfCB1bmRlZmluZWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGlmICghbWVzc2FnZUlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2FkZFN0aWNrZXJQYWNrUmVmZXJlbmNlOiBQcm92aWRlZCBkYXRhIGRpZCBub3QgaGF2ZSBhIHRydXRoeSBtZXNzYWdlSWQnXG4gICAgKTtcbiAgfVxuICBpZiAoIXBhY2tJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdhZGRTdGlja2VyUGFja1JlZmVyZW5jZTogUHJvdmlkZWQgZGF0YSBkaWQgbm90IGhhdmUgYSB0cnV0aHkgcGFja0lkJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gZGJcbiAgICAudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgICAgLy8gV2UgdXNlIGFuIGltbWVkaWF0ZSB0cmFuc2FjdGlvbiBoZXJlIHRvIGltbWVkaWF0ZWx5IGFjcXVpcmUgYW4gZXhjbHVzaXZlIGxvY2ssXG4gICAgICAvLyAgIHdoaWNoIHdvdWxkIG5vcm1hbGx5IG9ubHkgaGFwcGVuIHdoZW4gd2UgZGlkIG91ciBmaXJzdCB3cml0ZS5cblxuICAgICAgLy8gV2UgbmVlZCB0aGlzIHRvIGVuc3VyZSB0aGF0IG91ciBmaXZlIHF1ZXJpZXMgYXJlIGFsbCBhdG9taWMsIHdpdGggbm9cbiAgICAgIC8vIG90aGVyIGNoYW5nZXMgaGFwcGVuaW5nIHdoaWxlIHdlIGRvIGl0OlxuICAgICAgLy8gMS4gRGVsZXRlIG91ciB0YXJnZXQgbWVzc2FnZUlkL3BhY2tJZCByZWZlcmVuY2VzXG4gICAgICAvLyAyLiBDaGVjayB0aGUgbnVtYmVyIG9mIHJlZmVyZW5jZXMgc3RpbGwgcG9pbnRpbmcgYXQgcGFja0lkXG4gICAgICAvLyAzLiBJZiB0aGF0IG51bWJlciBpcyB6ZXJvLCBnZXQgcGFjayBmcm9tIHN0aWNrZXJfcGFja3MgZGF0YWJhc2VcbiAgICAgIC8vIDQuIElmIGl0J3Mgbm90IGluc3RhbGxlZCwgdGhlbiBncmFiIGFsbCBvZiBpdHMgc3RpY2tlciBwYXRoc1xuICAgICAgLy8gNS4gSWYgaXQncyBub3QgaW5zdGFsbGVkLCB0aGVuIHN0aWNrZXIgcGFjayAod2hpY2ggY2FzY2FkZXMgdG8gYWxsXG4gICAgICAvLyAgICBzdGlja2VycyBhbmQgcmVmZXJlbmNlcylcbiAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIERFTEVURSBGUk9NIHN0aWNrZXJfcmVmZXJlbmNlc1xuICAgICAgICBXSEVSRSBtZXNzYWdlSWQgPSAkbWVzc2FnZUlkIEFORCBwYWNrSWQgPSAkcGFja0lkO1xuICAgICAgICBgXG4gICAgICApLnJ1bih7XG4gICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgcGFja0lkLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGNvdW50Um93ID0gZGJcbiAgICAgICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICAgIGBcbiAgICAgICAgICBTRUxFQ1QgY291bnQoKikgRlJPTSBzdGlja2VyX3JlZmVyZW5jZXNcbiAgICAgICAgICBXSEVSRSBwYWNrSWQgPSAkcGFja0lkO1xuICAgICAgICAgIGBcbiAgICAgICAgKVxuICAgICAgICAuZ2V0KHsgcGFja0lkIH0pO1xuICAgICAgaWYgKCFjb3VudFJvdykge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2RlbGV0ZVN0aWNrZXJQYWNrUmVmZXJlbmNlOiBVbmFibGUgdG8gZ2V0IGNvdW50IG9mIHJlZmVyZW5jZXMnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBjb3VudCA9IGNvdW50Um93Wydjb3VudCgqKSddO1xuICAgICAgaWYgKGNvdW50ID4gMCkge1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwYWNrUm93OiB7IHN0YXR1czogU3RpY2tlclBhY2tTdGF0dXNUeXBlIH0gPSBkYlxuICAgICAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgICAgYFxuICAgICAgICAgIFNFTEVDVCBzdGF0dXMgRlJPTSBzdGlja2VyX3BhY2tzXG4gICAgICAgICAgV0hFUkUgaWQgPSAkcGFja0lkO1xuICAgICAgICAgIGBcbiAgICAgICAgKVxuICAgICAgICAuZ2V0KHsgcGFja0lkIH0pO1xuICAgICAgaWYgKCFwYWNrUm93KSB7XG4gICAgICAgIGxvZ2dlci53YXJuKCdkZWxldGVTdGlja2VyUGFja1JlZmVyZW5jZTogZGlkIG5vdCBmaW5kIHJlZmVyZW5jZWQgcGFjaycpO1xuICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgY29uc3QgeyBzdGF0dXMgfSA9IHBhY2tSb3c7XG5cbiAgICAgIGlmIChzdGF0dXMgPT09ICdpbnN0YWxsZWQnKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0aWNrZXJQYXRoUm93czogQXJyYXk8eyBwYXRoOiBzdHJpbmcgfT4gPSBkYlxuICAgICAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgICAgYFxuICAgICAgICAgIFNFTEVDVCBwYXRoIEZST00gc3RpY2tlcnNcbiAgICAgICAgICBXSEVSRSBwYWNrSWQgPSAkcGFja0lkO1xuICAgICAgICAgIGBcbiAgICAgICAgKVxuICAgICAgICAuYWxsKHtcbiAgICAgICAgICBwYWNrSWQsXG4gICAgICAgIH0pO1xuICAgICAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgIGBcbiAgICAgICAgREVMRVRFIEZST00gc3RpY2tlcl9wYWNrc1xuICAgICAgICBXSEVSRSBpZCA9ICRwYWNrSWQ7XG4gICAgICAgIGBcbiAgICAgICkucnVuKHtcbiAgICAgICAgcGFja0lkLFxuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAoc3RpY2tlclBhdGhSb3dzIHx8IFtdKS5tYXAocm93ID0+IHJvdy5wYXRoKTtcbiAgICB9KVxuICAgIC5pbW1lZGlhdGUoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU3RpY2tlclBhY2socGFja0lkOiBzdHJpbmcpOiBQcm9taXNlPEFycmF5PHN0cmluZz4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGlmICghcGFja0lkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2RlbGV0ZVN0aWNrZXJQYWNrOiBQcm92aWRlZCBkYXRhIGRpZCBub3QgaGF2ZSBhIHRydXRoeSBwYWNrSWQnXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiBkYlxuICAgIC50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgICAvLyBXZSB1c2UgYW4gaW1tZWRpYXRlIHRyYW5zYWN0aW9uIGhlcmUgdG8gaW1tZWRpYXRlbHkgYWNxdWlyZSBhbiBleGNsdXNpdmUgbG9jayxcbiAgICAgIC8vICAgd2hpY2ggd291bGQgbm9ybWFsbHkgb25seSBoYXBwZW4gd2hlbiB3ZSBkaWQgb3VyIGZpcnN0IHdyaXRlLlxuXG4gICAgICAvLyBXZSBuZWVkIHRoaXMgdG8gZW5zdXJlIHRoYXQgb3VyIHR3byBxdWVyaWVzIGFyZSBhdG9taWMsIHdpdGggbm8gb3RoZXIgY2hhbmdlc1xuICAgICAgLy8gICBoYXBwZW5pbmcgd2hpbGUgd2UgZG8gaXQ6XG4gICAgICAvLyAxLiBHcmFiIGFsbCBvZiB0YXJnZXQgcGFjaydzIHN0aWNrZXIgcGF0aHNcbiAgICAgIC8vIDIuIERlbGV0ZSBzdGlja2VyIHBhY2sgKHdoaWNoIGNhc2NhZGVzIHRvIGFsbCBzdGlja2VycyBhbmQgcmVmZXJlbmNlcylcblxuICAgICAgY29uc3Qgc3RpY2tlclBhdGhSb3dzOiBBcnJheTx7IHBhdGg6IHN0cmluZyB9PiA9IGRiXG4gICAgICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgICBgXG4gICAgICAgICAgU0VMRUNUIHBhdGggRlJPTSBzdGlja2Vyc1xuICAgICAgICAgIFdIRVJFIHBhY2tJZCA9ICRwYWNrSWQ7XG4gICAgICAgICAgYFxuICAgICAgICApXG4gICAgICAgIC5hbGwoe1xuICAgICAgICAgIHBhY2tJZCxcbiAgICAgICAgfSk7XG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBERUxFVEUgRlJPTSBzdGlja2VyX3BhY2tzXG4gICAgICAgIFdIRVJFIGlkID0gJHBhY2tJZDtcbiAgICAgICAgYFxuICAgICAgKS5ydW4oeyBwYWNrSWQgfSk7XG5cbiAgICAgIHJldHVybiAoc3RpY2tlclBhdGhSb3dzIHx8IFtdKS5tYXAocm93ID0+IHJvdy5wYXRoKTtcbiAgICB9KVxuICAgIC5pbW1lZGlhdGUoKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RpY2tlckNvdW50KCk6IFByb21pc2U8bnVtYmVyPiB7XG4gIHJldHVybiBnZXRDb3VudEZyb21UYWJsZShnZXRJbnN0YW5jZSgpLCAnc3RpY2tlcnMnKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFN0aWNrZXJQYWNrcygpOiBQcm9taXNlPEFycmF5PFN0aWNrZXJQYWNrVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGNvbnN0IHJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUICogRlJPTSBzdGlja2VyX3BhY2tzXG4gICAgICBPUkRFUiBCWSBpbnN0YWxsZWRBdCBERVNDLCBjcmVhdGVkQXQgREVTQ1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHJvd3MgfHwgW107XG59XG5hc3luYyBmdW5jdGlvbiBnZXRBbGxTdGlja2VycygpOiBQcm9taXNlPEFycmF5PFN0aWNrZXJUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgY29uc3Qgcm93cyA9IGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgKiBGUk9NIHN0aWNrZXJzXG4gICAgICBPUkRFUiBCWSBwYWNrSWQgQVNDLCBpZCBBU0NcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCgpO1xuXG4gIHJldHVybiAocm93cyB8fCBbXSkubWFwKHJvdyA9PiByb3dUb1N0aWNrZXIocm93KSk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRTdGlja2Vycyh7IGxpbWl0IH06IHsgbGltaXQ/OiBudW1iZXIgfSA9IHt9KTogUHJvbWlzZTxcbiAgQXJyYXk8U3RpY2tlclR5cGU+XG4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIC8vIE5vdGU6IHdlIGF2b2lkICdJUyBOT1QgTlVMTCcgaGVyZSBiZWNhdXNlIGl0IGRvZXMgc2VlbSB0byBieXBhc3Mgb3VyIGluZGV4XG4gIGNvbnN0IHJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBzdGlja2Vycy4qIEZST00gc3RpY2tlcnNcbiAgICAgIEpPSU4gc3RpY2tlcl9wYWNrcyBvbiBzdGlja2Vycy5wYWNrSWQgPSBzdGlja2VyX3BhY2tzLmlkXG4gICAgICBXSEVSRSBzdGlja2Vycy5sYXN0VXNlZCA+IDAgQU5EIHN0aWNrZXJfcGFja3Muc3RhdHVzID0gJ2luc3RhbGxlZCdcbiAgICAgIE9SREVSIEJZIHN0aWNrZXJzLmxhc3RVc2VkIERFU0NcbiAgICAgIExJTUlUICRsaW1pdFxuICAgICAgYFxuICAgIClcbiAgICAuYWxsKHtcbiAgICAgIGxpbWl0OiBsaW1pdCB8fCAyNCxcbiAgICB9KTtcblxuICByZXR1cm4gKHJvd3MgfHwgW10pLm1hcChyb3cgPT4gcm93VG9TdGlja2VyKHJvdykpO1xufVxuXG4vLyBFbW9qaXNcbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUVtb2ppVXNhZ2UoXG4gIHNob3J0TmFtZTogc3RyaW5nLFxuICB0aW1lVXNlZDogbnVtYmVyID0gRGF0ZS5ub3coKVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3Qgcm93cyA9IGRiXG4gICAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgIGBcbiAgICAgICAgU0VMRUNUICogRlJPTSBlbW9qaXNcbiAgICAgICAgV0hFUkUgc2hvcnROYW1lID0gJHNob3J0TmFtZTtcbiAgICAgICAgYFxuICAgICAgKVxuICAgICAgLmdldCh7XG4gICAgICAgIHNob3J0TmFtZSxcbiAgICAgIH0pO1xuXG4gICAgaWYgKHJvd3MpIHtcbiAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFVQREFURSBlbW9qaXNcbiAgICAgICAgU0VUIGxhc3RVc2FnZSA9ICR0aW1lVXNlZFxuICAgICAgICBXSEVSRSBzaG9ydE5hbWUgPSAkc2hvcnROYW1lO1xuICAgICAgICBgXG4gICAgICApLnJ1bih7IHNob3J0TmFtZSwgdGltZVVzZWQgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIElOU0VSVCBJTlRPIGVtb2ppcyhzaG9ydE5hbWUsIGxhc3RVc2FnZSlcbiAgICAgICAgVkFMVUVTICgkc2hvcnROYW1lLCAkdGltZVVzZWQpO1xuICAgICAgICBgXG4gICAgICApLnJ1bih7IHNob3J0TmFtZSwgdGltZVVzZWQgfSk7XG4gICAgfVxuICB9KSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRSZWNlbnRFbW9qaXMobGltaXQgPSAzMik6IFByb21pc2U8QXJyYXk8RW1vamlUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHJvd3MgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCAqXG4gICAgICBGUk9NIGVtb2ppc1xuICAgICAgT1JERVIgQlkgbGFzdFVzYWdlIERFU0NcbiAgICAgIExJTUlUICRsaW1pdDtcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7IGxpbWl0IH0pO1xuXG4gIHJldHVybiByb3dzIHx8IFtdO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRBbGxCYWRnZXMoKTogUHJvbWlzZTxBcnJheTxCYWRnZVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBbYmFkZ2VSb3dzLCBiYWRnZUltYWdlRmlsZVJvd3NdID0gZGIudHJhbnNhY3Rpb24oKCkgPT4gW1xuICAgIGRiLnByZXBhcmU8RW1wdHlRdWVyeT4oJ1NFTEVDVCAqIEZST00gYmFkZ2VzJykuYWxsKCksXG4gICAgZGIucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUICogRlJPTSBiYWRnZUltYWdlRmlsZXMnKS5hbGwoKSxcbiAgXSkoKTtcblxuICBjb25zdCBiYWRnZUltYWdlc0J5QmFkZ2UgPSBuZXcgTWFwPFxuICAgIHN0cmluZyxcbiAgICBBcnJheTx1bmRlZmluZWQgfCBCYWRnZUltYWdlVHlwZT5cbiAgPigpO1xuICBmb3IgKGNvbnN0IGJhZGdlSW1hZ2VGaWxlUm93IG9mIGJhZGdlSW1hZ2VGaWxlUm93cykge1xuICAgIGNvbnN0IHsgYmFkZ2VJZCwgb3JkZXIsIGxvY2FsUGF0aCwgdXJsLCB0aGVtZSB9ID0gYmFkZ2VJbWFnZUZpbGVSb3c7XG4gICAgY29uc3QgYmFkZ2VJbWFnZXMgPSBiYWRnZUltYWdlc0J5QmFkZ2UuZ2V0KGJhZGdlSWQpIHx8IFtdO1xuICAgIGJhZGdlSW1hZ2VzW29yZGVyXSA9IHtcbiAgICAgIC4uLihiYWRnZUltYWdlc1tvcmRlcl0gfHwge30pLFxuICAgICAgW3BhcnNlQmFkZ2VJbWFnZVRoZW1lKHRoZW1lKV06IHtcbiAgICAgICAgbG9jYWxQYXRoOiBkcm9wTnVsbChsb2NhbFBhdGgpLFxuICAgICAgICB1cmwsXG4gICAgICB9LFxuICAgIH07XG4gICAgYmFkZ2VJbWFnZXNCeUJhZGdlLnNldChiYWRnZUlkLCBiYWRnZUltYWdlcyk7XG4gIH1cblxuICByZXR1cm4gYmFkZ2VSb3dzLm1hcChiYWRnZVJvdyA9PiAoe1xuICAgIGlkOiBiYWRnZVJvdy5pZCxcbiAgICBjYXRlZ29yeTogcGFyc2VCYWRnZUNhdGVnb3J5KGJhZGdlUm93LmNhdGVnb3J5KSxcbiAgICBuYW1lOiBiYWRnZVJvdy5uYW1lLFxuICAgIGRlc2NyaXB0aW9uVGVtcGxhdGU6IGJhZGdlUm93LmRlc2NyaXB0aW9uVGVtcGxhdGUsXG4gICAgaW1hZ2VzOiAoYmFkZ2VJbWFnZXNCeUJhZGdlLmdldChiYWRnZVJvdy5pZCkgfHwgW10pLmZpbHRlcihpc05vdE5pbCksXG4gIH0pKTtcbn1cblxuLy8gVGhpcyBzaG91bGQgbWF0Y2ggdGhlIGxvZ2ljIGluIHRoZSBiYWRnZXMgUmVkdXggcmVkdWNlci5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU9yQ3JlYXRlQmFkZ2VzKFxuICBiYWRnZXM6IFJlYWRvbmx5QXJyYXk8QmFkZ2VUeXBlPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCBpbnNlcnRCYWRnZSA9IHByZXBhcmU8UXVlcnk+KFxuICAgIGRiLFxuICAgIGBcbiAgICBJTlNFUlQgT1IgUkVQTEFDRSBJTlRPIGJhZGdlcyAoXG4gICAgICBpZCxcbiAgICAgIGNhdGVnb3J5LFxuICAgICAgbmFtZSxcbiAgICAgIGRlc2NyaXB0aW9uVGVtcGxhdGVcbiAgICApIFZBTFVFUyAoXG4gICAgICAkaWQsXG4gICAgICAkY2F0ZWdvcnksXG4gICAgICAkbmFtZSxcbiAgICAgICRkZXNjcmlwdGlvblRlbXBsYXRlXG4gICAgKTtcbiAgICBgXG4gICk7XG4gIGNvbnN0IGdldEltYWdlRmlsZXNGb3JCYWRnZSA9IHByZXBhcmU8UXVlcnk+KFxuICAgIGRiLFxuICAgICdTRUxFQ1QgdXJsLCBsb2NhbFBhdGggRlJPTSBiYWRnZUltYWdlRmlsZXMgV0hFUkUgYmFkZ2VJZCA9ICRiYWRnZUlkJ1xuICApO1xuICBjb25zdCBpbnNlcnRCYWRnZUltYWdlRmlsZSA9IHByZXBhcmU8UXVlcnk+KFxuICAgIGRiLFxuICAgIGBcbiAgICBJTlNFUlQgSU5UTyBiYWRnZUltYWdlRmlsZXMgKFxuICAgICAgYmFkZ2VJZCxcbiAgICAgICdvcmRlcicsXG4gICAgICB1cmwsXG4gICAgICBsb2NhbFBhdGgsXG4gICAgICB0aGVtZVxuICAgICkgVkFMVUVTIChcbiAgICAgICRiYWRnZUlkLFxuICAgICAgJG9yZGVyLFxuICAgICAgJHVybCxcbiAgICAgICRsb2NhbFBhdGgsXG4gICAgICAkdGhlbWVcbiAgICApO1xuICAgIGBcbiAgKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgYmFkZ2VzLmZvckVhY2goYmFkZ2UgPT4ge1xuICAgICAgY29uc3QgeyBpZDogYmFkZ2VJZCB9ID0gYmFkZ2U7XG5cbiAgICAgIGNvbnN0IG9sZExvY2FsUGF0aHMgPSBuZXcgTWFwPHN0cmluZywgc3RyaW5nPigpO1xuICAgICAgZm9yIChjb25zdCB7IHVybCwgbG9jYWxQYXRoIH0gb2YgZ2V0SW1hZ2VGaWxlc0ZvckJhZGdlLmFsbCh7IGJhZGdlSWQgfSkpIHtcbiAgICAgICAgaWYgKGxvY2FsUGF0aCkge1xuICAgICAgICAgIG9sZExvY2FsUGF0aHMuc2V0KHVybCwgbG9jYWxQYXRoKTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpbnNlcnRCYWRnZS5ydW4oe1xuICAgICAgICBpZDogYmFkZ2VJZCxcbiAgICAgICAgY2F0ZWdvcnk6IGJhZGdlLmNhdGVnb3J5LFxuICAgICAgICBuYW1lOiBiYWRnZS5uYW1lLFxuICAgICAgICBkZXNjcmlwdGlvblRlbXBsYXRlOiBiYWRnZS5kZXNjcmlwdGlvblRlbXBsYXRlLFxuICAgICAgfSk7XG5cbiAgICAgIGZvciAoY29uc3QgW29yZGVyLCBpbWFnZV0gb2YgYmFkZ2UuaW1hZ2VzLmVudHJpZXMoKSkge1xuICAgICAgICBmb3IgKGNvbnN0IFt0aGVtZSwgaW1hZ2VGaWxlXSBvZiBPYmplY3QuZW50cmllcyhpbWFnZSkpIHtcbiAgICAgICAgICBpbnNlcnRCYWRnZUltYWdlRmlsZS5ydW4oe1xuICAgICAgICAgICAgYmFkZ2VJZCxcbiAgICAgICAgICAgIGxvY2FsUGF0aDpcbiAgICAgICAgICAgICAgaW1hZ2VGaWxlLmxvY2FsUGF0aCB8fCBvbGRMb2NhbFBhdGhzLmdldChpbWFnZUZpbGUudXJsKSB8fCBudWxsLFxuICAgICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgICB0aGVtZSxcbiAgICAgICAgICAgIHVybDogaW1hZ2VGaWxlLnVybCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBiYWRnZUltYWdlRmlsZURvd25sb2FkZWQoXG4gIHVybDogc3RyaW5nLFxuICBsb2NhbFBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgcHJlcGFyZTxRdWVyeT4oXG4gICAgZGIsXG4gICAgJ1VQREFURSBiYWRnZUltYWdlRmlsZXMgU0VUIGxvY2FsUGF0aCA9ICRsb2NhbFBhdGggV0hFUkUgdXJsID0gJHVybCdcbiAgKS5ydW4oeyB1cmwsIGxvY2FsUGF0aCB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0QWxsQmFkZ2VJbWFnZUZpbGVMb2NhbFBhdGhzKCk6IFByb21pc2U8U2V0PHN0cmluZz4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCBsb2NhbFBhdGhzID0gZGJcbiAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgICdTRUxFQ1QgbG9jYWxQYXRoIEZST00gYmFkZ2VJbWFnZUZpbGVzIFdIRVJFIGxvY2FsUGF0aCBJUyBOT1QgTlVMTCdcbiAgICApXG4gICAgLnBsdWNrKClcbiAgICAuYWxsKCk7XG4gIHJldHVybiBuZXcgU2V0KGxvY2FsUGF0aHMpO1xufVxuXG50eXBlIFN0b3J5RGlzdHJpYnV0aW9uRm9yRGF0YWJhc2UgPSBSZWFkb25seTxcbiAge1xuICAgIHNlbmRlcktleUluZm9Kc29uOiBzdHJpbmcgfCBudWxsO1xuICB9ICYgT21pdDxTdG9yeURpc3RyaWJ1dGlvblR5cGUsICdzZW5kZXJLZXlJbmZvJz5cbj47XG5cbmZ1bmN0aW9uIGh5ZHJhdGVTdG9yeURpc3RyaWJ1dGlvbihcbiAgZnJvbURhdGFiYXNlOiBTdG9yeURpc3RyaWJ1dGlvbkZvckRhdGFiYXNlXG4pOiBTdG9yeURpc3RyaWJ1dGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIC4uLm9taXQoZnJvbURhdGFiYXNlLCAnc2VuZGVyS2V5SW5mb0pzb24nKSxcbiAgICBzZW5kZXJLZXlJbmZvOiBmcm9tRGF0YWJhc2Uuc2VuZGVyS2V5SW5mb0pzb25cbiAgICAgID8gSlNPTi5wYXJzZShmcm9tRGF0YWJhc2Uuc2VuZGVyS2V5SW5mb0pzb24pXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfTtcbn1cbmZ1bmN0aW9uIGZyZWV6ZVN0b3J5RGlzdHJpYnV0aW9uKFxuICBzdG9yeTogU3RvcnlEaXN0cmlidXRpb25UeXBlXG4pOiBTdG9yeURpc3RyaWJ1dGlvbkZvckRhdGFiYXNlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi5vbWl0KHN0b3J5LCAnc2VuZGVyS2V5SW5mbycpLFxuICAgIHNlbmRlcktleUluZm9Kc29uOiBzdG9yeS5zZW5kZXJLZXlJbmZvXG4gICAgICA/IEpTT04uc3RyaW5naWZ5KHN0b3J5LnNlbmRlcktleUluZm8pXG4gICAgICA6IG51bGwsXG4gIH07XG59XG5cbmFzeW5jIGZ1bmN0aW9uIF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbnMoKTogUHJvbWlzZTxcbiAgQXJyYXk8U3RvcnlEaXN0cmlidXRpb25UeXBlPlxuPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3Qgc3RvcnlEaXN0cmlidXRpb25zID0gZGJcbiAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUICogRlJPTSBzdG9yeURpc3RyaWJ1dGlvbnM7JylcbiAgICAuYWxsKCk7XG5cbiAgcmV0dXJuIHN0b3J5RGlzdHJpYnV0aW9ucy5tYXAoaHlkcmF0ZVN0b3J5RGlzdHJpYnV0aW9uKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIF9nZXRBbGxTdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMoKTogUHJvbWlzZTxcbiAgQXJyYXk8U3RvcnlEaXN0cmlidXRpb25NZW1iZXJUeXBlPlxuPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgcmV0dXJuIGRiXG4gICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oJ1NFTEVDVCAqIEZST00gc3RvcnlEaXN0cmlidXRpb25NZW1iZXJzOycpXG4gICAgLmFsbCgpO1xufVxuYXN5bmMgZnVuY3Rpb24gX2RlbGV0ZUFsbFN0b3J5RGlzdHJpYnV0aW9ucygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBkYi5wcmVwYXJlPEVtcHR5UXVlcnk+KCdERUxFVEUgRlJPTSBzdG9yeURpc3RyaWJ1dGlvbnM7JykucnVuKCk7XG59XG5hc3luYyBmdW5jdGlvbiBjcmVhdGVOZXdTdG9yeURpc3RyaWJ1dGlvbihcbiAgZGlzdHJpYnV0aW9uOiBTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgcGF5bG9hZCA9IGZyZWV6ZVN0b3J5RGlzdHJpYnV0aW9uKGRpc3RyaWJ1dGlvbik7XG5cbiAgICBwcmVwYXJlKFxuICAgICAgZGIsXG4gICAgICBgXG4gICAgICBJTlNFUlQgSU5UTyBzdG9yeURpc3RyaWJ1dGlvbnMoXG4gICAgICAgIGlkLFxuICAgICAgICBuYW1lLFxuICAgICAgICBhdmF0YXJVcmxQYXRoLFxuICAgICAgICBhdmF0YXJLZXksXG4gICAgICAgIHNlbmRlcktleUluZm9Kc29uXG4gICAgICApIFZBTFVFUyAoXG4gICAgICAgICRpZCxcbiAgICAgICAgJG5hbWUsXG4gICAgICAgICRhdmF0YXJVcmxQYXRoLFxuICAgICAgICAkYXZhdGFyS2V5LFxuICAgICAgICAkc2VuZGVyS2V5SW5mb0pzb25cbiAgICAgICk7XG4gICAgICBgXG4gICAgKS5ydW4ocGF5bG9hZCk7XG5cbiAgICBjb25zdCB7IGlkOiBsaXN0SWQsIG1lbWJlcnMgfSA9IGRpc3RyaWJ1dGlvbjtcblxuICAgIGNvbnN0IG1lbWJlckluc2VydFN0YXRlbWVudCA9IHByZXBhcmUoXG4gICAgICBkYixcbiAgICAgIGBcbiAgICAgIElOU0VSVCBPUiBSRVBMQUNFIElOVE8gc3RvcnlEaXN0cmlidXRpb25NZW1iZXJzIChcbiAgICAgICAgbGlzdElkLFxuICAgICAgICB1dWlkXG4gICAgICApIFZBTFVFUyAoXG4gICAgICAgICRsaXN0SWQsXG4gICAgICAgICR1dWlkXG4gICAgICApO1xuICAgICAgYFxuICAgICk7XG5cbiAgICBmb3IgKGNvbnN0IHV1aWQgb2YgbWVtYmVycykge1xuICAgICAgbWVtYmVySW5zZXJ0U3RhdGVtZW50LnJ1bih7XG4gICAgICAgIGxpc3RJZCxcbiAgICAgICAgdXVpZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfSkoKTtcbn1cbmFzeW5jIGZ1bmN0aW9uIGdldEFsbFN0b3J5RGlzdHJpYnV0aW9uc1dpdGhNZW1iZXJzKCk6IFByb21pc2U8XG4gIEFycmF5PFN0b3J5RGlzdHJpYnV0aW9uV2l0aE1lbWJlcnNUeXBlPlxuPiB7XG4gIGNvbnN0IGFsbERpc3RyaWJ1dGlvbnMgPSBhd2FpdCBfZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25zKCk7XG4gIGNvbnN0IGFsbE1lbWJlcnMgPSBhd2FpdCBfZ2V0QWxsU3RvcnlEaXN0cmlidXRpb25NZW1iZXJzKCk7XG5cbiAgY29uc3QgYnlMaXN0SWQgPSBncm91cEJ5KGFsbE1lbWJlcnMsIG1lbWJlciA9PiBtZW1iZXIubGlzdElkKTtcblxuICByZXR1cm4gYWxsRGlzdHJpYnV0aW9ucy5tYXAobGlzdCA9PiAoe1xuICAgIC4uLmxpc3QsXG4gICAgbWVtYmVyczogKGJ5TGlzdElkW2xpc3QuaWRdIHx8IFtdKS5tYXAobWVtYmVyID0+IG1lbWJlci51dWlkKSxcbiAgfSkpO1xufVxuYXN5bmMgZnVuY3Rpb24gZ2V0U3RvcnlEaXN0cmlidXRpb25XaXRoTWVtYmVycyhcbiAgaWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxTdG9yeURpc3RyaWJ1dGlvbldpdGhNZW1iZXJzVHlwZSB8IHVuZGVmaW5lZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IHN0b3J5RGlzdHJpYnV0aW9uID0gcHJlcGFyZShcbiAgICBkYixcbiAgICAnU0VMRUNUICogRlJPTSBzdG9yeURpc3RyaWJ1dGlvbnMgV0hFUkUgaWQgPSAkaWQ7J1xuICApLmdldCh7XG4gICAgaWQsXG4gIH0pO1xuXG4gIGlmICghc3RvcnlEaXN0cmlidXRpb24pIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgbWVtYmVycyA9IHByZXBhcmUoXG4gICAgZGIsXG4gICAgJ1NFTEVDVCAqIEZST00gc3RvcnlEaXN0cmlidXRpb25NZW1iZXJzIFdIRVJFIGxpc3RJZCA9ICRpZDsnXG4gICkuYWxsKHtcbiAgICBpZCxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5zdG9yeURpc3RyaWJ1dGlvbixcbiAgICBtZW1iZXJzOiBtZW1iZXJzLm1hcCgoeyB1dWlkIH0pID0+IHV1aWQpLFxuICB9O1xufVxuYXN5bmMgZnVuY3Rpb24gbW9kaWZ5U3RvcnlEaXN0cmlidXRpb24oXG4gIGRpc3RyaWJ1dGlvbjogU3RvcnlEaXN0cmlidXRpb25UeXBlXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgcGF5bG9hZCA9IGZyZWV6ZVN0b3J5RGlzdHJpYnV0aW9uKGRpc3RyaWJ1dGlvbik7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgcHJlcGFyZShcbiAgICBkYixcbiAgICBgXG4gICAgVVBEQVRFIHN0b3J5RGlzdHJpYnV0aW9uc1xuICAgIFNFVFxuICAgICAgbmFtZSA9ICRuYW1lLFxuICAgICAgYXZhdGFyVXJsUGF0aCA9ICRhdmF0YXJVcmxQYXRoLFxuICAgICAgYXZhdGFyS2V5ID0gJGF2YXRhcktleSxcbiAgICAgIHNlbmRlcktleUluZm9Kc29uID0gJHNlbmRlcktleUluZm9Kc29uXG4gICAgV0hFUkUgaWQgPSAkaWRcbiAgICBgXG4gICkucnVuKHBheWxvYWQpO1xufVxuYXN5bmMgZnVuY3Rpb24gbW9kaWZ5U3RvcnlEaXN0cmlidXRpb25NZW1iZXJzKFxuICBsaXN0SWQ6IHN0cmluZyxcbiAge1xuICAgIHRvQWRkLFxuICAgIHRvUmVtb3ZlLFxuICB9OiB7IHRvQWRkOiBBcnJheTxVVUlEU3RyaW5nVHlwZT47IHRvUmVtb3ZlOiBBcnJheTxVVUlEU3RyaW5nVHlwZT4gfVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgY29uc3QgbWVtYmVySW5zZXJ0U3RhdGVtZW50ID0gcHJlcGFyZShcbiAgICAgIGRiLFxuICAgICAgYFxuICAgICAgSU5TRVJUIE9SIFJFUExBQ0UgSU5UTyBzdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnMgKFxuICAgICAgICBsaXN0SWQsXG4gICAgICAgIHV1aWRcbiAgICAgICkgVkFMVUVTIChcbiAgICAgICAgJGxpc3RJZCxcbiAgICAgICAgJHV1aWRcbiAgICAgICk7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGZvciAoY29uc3QgdXVpZCBvZiB0b0FkZCkge1xuICAgICAgbWVtYmVySW5zZXJ0U3RhdGVtZW50LnJ1bih7XG4gICAgICAgIGxpc3RJZCxcbiAgICAgICAgdXVpZCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGJhdGNoTXVsdGlWYXJRdWVyeShkYiwgdG9SZW1vdmUsICh1dWlkczogQXJyYXk8VVVJRFN0cmluZ1R5cGU+KSA9PiB7XG4gICAgICBkYi5wcmVwYXJlPEFycmF5UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIERFTEVURSBGUk9NIHN0b3J5RGlzdHJpYnV0aW9uTWVtYmVyc1xuICAgICAgICBXSEVSRSBsaXN0SWQgPSA/IEFORCB1dWlkIElOICggJHt1dWlkcy5tYXAoKCkgPT4gJz8nKS5qb2luKCcsICcpfSApO1xuICAgICAgICBgXG4gICAgICApLnJ1bihbbGlzdElkLCAuLi51dWlkc10pO1xuICAgIH0pO1xuICB9KSgpO1xufVxuYXN5bmMgZnVuY3Rpb24gZGVsZXRlU3RvcnlEaXN0cmlidXRpb24oaWQ6IFVVSURTdHJpbmdUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgZGIucHJlcGFyZTxRdWVyeT4oJ0RFTEVURSBGUk9NIHN0b3J5RGlzdHJpYnV0aW9ucyBXSEVSRSBpZCA9ICRpZDsnKS5ydW4oe1xuICAgIGlkLFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gX2dldEFsbFN0b3J5UmVhZHMoKTogUHJvbWlzZTxBcnJheTxTdG9yeVJlYWRUeXBlPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBkYi5wcmVwYXJlPEVtcHR5UXVlcnk+KCdTRUxFQ1QgKiBGUk9NIHN0b3J5UmVhZHM7JykuYWxsKCk7XG59XG5hc3luYyBmdW5jdGlvbiBfZGVsZXRlQWxsU3RvcnlSZWFkcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBkYi5wcmVwYXJlPEVtcHR5UXVlcnk+KCdERUxFVEUgRlJPTSBzdG9yeVJlYWRzOycpLnJ1bigpO1xufVxuYXN5bmMgZnVuY3Rpb24gYWRkTmV3U3RvcnlSZWFkKHJlYWQ6IFN0b3J5UmVhZFR5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIHByZXBhcmUoXG4gICAgZGIsXG4gICAgYFxuICAgIElOU0VSVCBPUiBSRVBMQUNFIElOVE8gc3RvcnlSZWFkcyhcbiAgICAgIGF1dGhvcklkLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzdG9yeUlkLFxuICAgICAgc3RvcnlSZWFkRGF0ZVxuICAgICkgVkFMVUVTIChcbiAgICAgICRhdXRob3JJZCxcbiAgICAgICRjb252ZXJzYXRpb25JZCxcbiAgICAgICRzdG9yeUlkLFxuICAgICAgJHN0b3J5UmVhZERhdGVcbiAgICApO1xuICAgIGBcbiAgKS5ydW4ocmVhZCk7XG59XG5hc3luYyBmdW5jdGlvbiBnZXRMYXN0U3RvcnlSZWFkc0ZvckF1dGhvcih7XG4gIGF1dGhvcklkLFxuICBjb252ZXJzYXRpb25JZCxcbiAgbGltaXQ6IGluaXRpYWxMaW1pdCxcbn06IHtcbiAgYXV0aG9ySWQ6IFVVSURTdHJpbmdUeXBlO1xuICBjb252ZXJzYXRpb25JZD86IFVVSURTdHJpbmdUeXBlO1xuICBsaW1pdD86IG51bWJlcjtcbn0pOiBQcm9taXNlPEFycmF5PFN0b3J5UmVhZFR5cGU+PiB7XG4gIGNvbnN0IGxpbWl0ID0gaW5pdGlhbExpbWl0IHx8IDU7XG5cbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgKiBGUk9NIHN0b3J5UmVhZHNcbiAgICAgIFdIRVJFXG4gICAgICAgIGF1dGhvcklkID0gJGF1dGhvcklkIEFORFxuICAgICAgICAoJGNvbnZlcnNhdGlvbklkIElTIE5VTEwgT1IgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWQpXG4gICAgICBPUkRFUiBCWSBzdG9yeVJlYWREYXRlIERFU0NcbiAgICAgIExJTUlUICRsaW1pdDtcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7XG4gICAgICBhdXRob3JJZCxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb25JZCB8fCBudWxsLFxuICAgICAgbGltaXQsXG4gICAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGNvdW50U3RvcnlSZWFkc0J5Q29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBQcm9taXNlPG51bWJlcj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFNFTEVDVCBDT1VOVChzdG9yeUlkKSBGUk9NIHN0b3J5UmVhZHNcbiAgICAgIFdIRVJFIGNvbnZlcnNhdGlvbklkID0gJGNvbnZlcnNhdGlvbklkO1xuICAgICAgYFxuICAgIClcbiAgICAucGx1Y2soKVxuICAgIC5nZXQoeyBjb252ZXJzYXRpb25JZCB9KTtcbn1cblxuLy8gQWxsIGRhdGEgaW4gZGF0YWJhc2VcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIGRiLnRyYW5zYWN0aW9uKCgpID0+IHtcbiAgICBkYi5leGVjKGBcbiAgICAgIERFTEVURSBGUk9NIGF0dGFjaG1lbnRfZG93bmxvYWRzO1xuICAgICAgREVMRVRFIEZST00gYmFkZ2VJbWFnZUZpbGVzO1xuICAgICAgREVMRVRFIEZST00gYmFkZ2VzO1xuICAgICAgREVMRVRFIEZST00gY29udmVyc2F0aW9ucztcbiAgICAgIERFTEVURSBGUk9NIGVtb2ppcztcbiAgICAgIERFTEVURSBGUk9NIGdyb3VwQ2FsbFJpbmdzO1xuICAgICAgREVMRVRFIEZST00gaWRlbnRpdHlLZXlzO1xuICAgICAgREVMRVRFIEZST00gaXRlbXM7XG4gICAgICBERUxFVEUgRlJPTSBqb2JzO1xuICAgICAgREVMRVRFIEZST00gbWVzc2FnZXNfZnRzO1xuICAgICAgREVMRVRFIEZST00gbWVzc2FnZXM7XG4gICAgICBERUxFVEUgRlJPTSBwcmVLZXlzO1xuICAgICAgREVMRVRFIEZST00gcmVhY3Rpb25zO1xuICAgICAgREVMRVRFIEZST00gc2VuZGVyS2V5cztcbiAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dNZXNzYWdlSWRzO1xuICAgICAgREVMRVRFIEZST00gc2VuZExvZ1BheWxvYWRzO1xuICAgICAgREVMRVRFIEZST00gc2VuZExvZ1JlY2lwaWVudHM7XG4gICAgICBERUxFVEUgRlJPTSBzZXNzaW9ucztcbiAgICAgIERFTEVURSBGUk9NIHNpZ25lZFByZUtleXM7XG4gICAgICBERUxFVEUgRlJPTSBzdGlja2VyX3BhY2tzO1xuICAgICAgREVMRVRFIEZST00gc3RpY2tlcl9yZWZlcmVuY2VzO1xuICAgICAgREVMRVRFIEZST00gc3RpY2tlcnM7XG4gICAgICBERUxFVEUgRlJPTSBzdG9yeURpc3RyaWJ1dGlvbk1lbWJlcnM7XG4gICAgICBERUxFVEUgRlJPTSBzdG9yeURpc3RyaWJ1dGlvbnM7XG4gICAgICBERUxFVEUgRlJPTSBzdG9yeVJlYWRzO1xuICAgICAgREVMRVRFIEZST00gdW5wcm9jZXNzZWQ7XG4gICAgYCk7XG4gIH0pKCk7XG59XG5cbi8vIEFueXRoaW5nIHRoYXQgaXNuJ3QgdXNlci12aXNpYmxlIGRhdGFcbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUFsbENvbmZpZ3VyYXRpb24oXG4gIG1vZGUgPSBSZW1vdmVBbGxDb25maWd1cmF0aW9uLkZ1bGxcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICBERUxFVEUgRlJPTSBpZGVudGl0eUtleXM7XG4gICAgICBERUxFVEUgRlJPTSBqb2JzO1xuICAgICAgREVMRVRFIEZST00gcHJlS2V5cztcbiAgICAgIERFTEVURSBGUk9NIHNlbmRlcktleXM7XG4gICAgICBERUxFVEUgRlJPTSBzZW5kTG9nTWVzc2FnZUlkcztcbiAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dQYXlsb2FkcztcbiAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dSZWNpcGllbnRzO1xuICAgICAgREVMRVRFIEZST00gc2Vzc2lvbnM7XG4gICAgICBERUxFVEUgRlJPTSBzaWduZWRQcmVLZXlzO1xuICAgICAgREVMRVRFIEZST00gdW5wcm9jZXNzZWQ7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGlmIChtb2RlID09PSBSZW1vdmVBbGxDb25maWd1cmF0aW9uLkZ1bGwpIHtcbiAgICAgIGRiLmV4ZWMoXG4gICAgICAgIGBcbiAgICAgICAgREVMRVRFIEZST00gaXRlbXM7XG4gICAgICAgIGBcbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSBSZW1vdmVBbGxDb25maWd1cmF0aW9uLlNvZnQpIHtcbiAgICAgIGNvbnN0IGl0ZW1JZHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPiA9IGRiXG4gICAgICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KCdTRUxFQ1QgaWQgRlJPTSBpdGVtcycpXG4gICAgICAgIC5wbHVjayh0cnVlKVxuICAgICAgICAuYWxsKCk7XG5cbiAgICAgIGNvbnN0IGFsbG93ZWRTZXQgPSBuZXcgU2V0PHN0cmluZz4oU1RPUkFHRV9VSV9LRVlTKTtcbiAgICAgIGZvciAoY29uc3QgaWQgb2YgaXRlbUlkcykge1xuICAgICAgICBpZiAoIWFsbG93ZWRTZXQuaGFzKGlkKSkge1xuICAgICAgICAgIHJlbW92ZUJ5SWQoZGIsICdpdGVtcycsIGlkKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKG1vZGUpO1xuICAgIH1cblxuICAgIGRiLmV4ZWMoXG4gICAgICBcIlVQREFURSBjb252ZXJzYXRpb25zIFNFVCBqc29uID0ganNvbl9yZW1vdmUoanNvbiwgJyQuc2VuZGVyS2V5SW5mbycpO1wiXG4gICAgKTtcbiAgfSkoKTtcbn1cblxuY29uc3QgTUFYX01FU1NBR0VfTUlHUkFUSU9OX0FUVEVNUFRTID0gNTtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZXNOZWVkaW5nVXBncmFkZShcbiAgbGltaXQ6IG51bWJlcixcbiAgeyBtYXhWZXJzaW9uIH06IHsgbWF4VmVyc2lvbjogbnVtYmVyIH1cbik6IFByb21pc2U8QXJyYXk8TWVzc2FnZVR5cGU+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb25cbiAgICAgIEZST00gbWVzc2FnZXNcbiAgICAgIFdIRVJFXG4gICAgICAgIChzY2hlbWFWZXJzaW9uIElTIE5VTEwgT1Igc2NoZW1hVmVyc2lvbiA8ICRtYXhWZXJzaW9uKSBBTkRcbiAgICAgICAgSUZOVUxMKFxuICAgICAgICAgIGpzb25fZXh0cmFjdChqc29uLCAnJC5zY2hlbWFNaWdyYXRpb25BdHRlbXB0cycpLFxuICAgICAgICAgIDBcbiAgICAgICAgKSA8ICRtYXhBdHRlbXB0c1xuICAgICAgTElNSVQgJGxpbWl0O1xuICAgICAgYFxuICAgIClcbiAgICAuYWxsKHtcbiAgICAgIG1heFZlcnNpb24sXG4gICAgICBtYXhBdHRlbXB0czogTUFYX01FU1NBR0VfTUlHUkFUSU9OX0FUVEVNUFRTLFxuICAgICAgbGltaXQsXG4gICAgfSk7XG5cbiAgcmV0dXJuIHJvd3MubWFwKHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgeyBsaW1pdCB9OiB7IGxpbWl0OiBudW1iZXIgfVxuKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzOiBKU09OUm93cyA9IGRiXG4gICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgYFxuICAgICAgU0VMRUNUIGpzb24gRlJPTSBtZXNzYWdlcyBXSEVSRVxuICAgICAgICBpc1N0b3J5IElTIDAgQU5EXG4gICAgICAgIHN0b3J5SWQgSVMgTlVMTCBBTkRcbiAgICAgICAgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWQgQU5EXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHMgPSAxXG4gICAgICBPUkRFUiBCWSByZWNlaXZlZF9hdCBERVNDLCBzZW50X2F0IERFU0NcbiAgICAgIExJTUlUICRsaW1pdDtcbiAgICAgIGBcbiAgICApXG4gICAgLmFsbCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGxpbWl0LFxuICAgIH0pO1xuXG4gIHJldHVybiByb3dzLm1hcChyb3cgPT4ganNvblRvT2JqZWN0KHJvdy5qc29uKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VzV2l0aEZpbGVBdHRhY2htZW50cyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgeyBsaW1pdCB9OiB7IGxpbWl0OiBudW1iZXIgfVxuKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlVHlwZT4+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuICBjb25zdCByb3dzID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QganNvbiBGUk9NIG1lc3NhZ2VzIFdIRVJFXG4gICAgICAgIGlzU3RvcnkgSVMgMCBBTkRcbiAgICAgICAgc3RvcnlJZCBJUyBOVUxMIEFORFxuICAgICAgICBjb252ZXJzYXRpb25JZCA9ICRjb252ZXJzYXRpb25JZCBBTkRcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzID0gMVxuICAgICAgT1JERVIgQlkgcmVjZWl2ZWRfYXQgREVTQywgc2VudF9hdCBERVNDXG4gICAgICBMSU1JVCAkbGltaXQ7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBsaW1pdCxcbiAgICB9KTtcblxuICByZXR1cm4gbWFwKHJvd3MsIHJvdyA9PiBqc29uVG9PYmplY3Qocm93Lmpzb24pKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZ2V0TWVzc2FnZVNlcnZlckd1aWRzRm9yU3BhbShcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICAvLyBUaGUgc2VydmVyJ3MgbWF4aW11bSBpcyAzLCB3aGljaCBpcyB3aHkgeW91IHNlZSBgTElNSVQgM2AgaW4gdGhpcyBxdWVyeS4gTm90ZSB0aGF0IHdlXG4gIC8vICAgdXNlIGBwbHVja2AgaGVyZSB0byBvbmx5IGdldCB0aGUgZmlyc3QgY29sdW1uIVxuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1Qgc2VydmVyR3VpZFxuICAgICAgRlJPTSBtZXNzYWdlc1xuICAgICAgV0hFUkUgY29udmVyc2F0aW9uSWQgPSAkY29udmVyc2F0aW9uSWRcbiAgICAgIEFORCB0eXBlID0gJ2luY29taW5nJ1xuICAgICAgQU5EIHNlcnZlckd1aWQgSVMgTk9UIE5VTExcbiAgICAgIE9SREVSIEJZIHJlY2VpdmVkX2F0IERFU0MsIHNlbnRfYXQgREVTQ1xuICAgICAgTElNSVQgMztcbiAgICAgIGBcbiAgICApXG4gICAgLnBsdWNrKHRydWUpXG4gICAgLmFsbCh7IGNvbnZlcnNhdGlvbklkIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRlcm5hbEZpbGVzRm9yTWVzc2FnZShtZXNzYWdlOiBNZXNzYWdlVHlwZSk6IEFycmF5PHN0cmluZz4ge1xuICBjb25zdCB7IGF0dGFjaG1lbnRzLCBjb250YWN0LCBxdW90ZSwgcHJldmlldywgc3RpY2tlciB9ID0gbWVzc2FnZTtcbiAgY29uc3QgZmlsZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBmb3JFYWNoKGF0dGFjaG1lbnRzLCBhdHRhY2htZW50ID0+IHtcbiAgICBjb25zdCB7IHBhdGg6IGZpbGUsIHRodW1ibmFpbCwgc2NyZWVuc2hvdCB9ID0gYXR0YWNobWVudDtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgZmlsZXMucHVzaChmaWxlKTtcbiAgICB9XG5cbiAgICBpZiAodGh1bWJuYWlsICYmIHRodW1ibmFpbC5wYXRoKSB7XG4gICAgICBmaWxlcy5wdXNoKHRodW1ibmFpbC5wYXRoKTtcbiAgICB9XG5cbiAgICBpZiAoc2NyZWVuc2hvdCAmJiBzY3JlZW5zaG90LnBhdGgpIHtcbiAgICAgIGZpbGVzLnB1c2goc2NyZWVuc2hvdC5wYXRoKTtcbiAgICB9XG4gIH0pO1xuXG4gIGlmIChxdW90ZSAmJiBxdW90ZS5hdHRhY2htZW50cyAmJiBxdW90ZS5hdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICBmb3JFYWNoKHF1b3RlLmF0dGFjaG1lbnRzLCBhdHRhY2htZW50ID0+IHtcbiAgICAgIGNvbnN0IHsgdGh1bWJuYWlsIH0gPSBhdHRhY2htZW50O1xuXG4gICAgICBpZiAodGh1bWJuYWlsICYmIHRodW1ibmFpbC5wYXRoKSB7XG4gICAgICAgIGZpbGVzLnB1c2godGh1bWJuYWlsLnBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGNvbnRhY3QgJiYgY29udGFjdC5sZW5ndGgpIHtcbiAgICBmb3JFYWNoKGNvbnRhY3QsIGl0ZW0gPT4ge1xuICAgICAgY29uc3QgeyBhdmF0YXIgfSA9IGl0ZW07XG5cbiAgICAgIGlmIChhdmF0YXIgJiYgYXZhdGFyLmF2YXRhciAmJiBhdmF0YXIuYXZhdGFyLnBhdGgpIHtcbiAgICAgICAgZmlsZXMucHVzaChhdmF0YXIuYXZhdGFyLnBhdGgpO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgaWYgKHByZXZpZXcgJiYgcHJldmlldy5sZW5ndGgpIHtcbiAgICBmb3JFYWNoKHByZXZpZXcsIGl0ZW0gPT4ge1xuICAgICAgY29uc3QgeyBpbWFnZSB9ID0gaXRlbTtcblxuICAgICAgaWYgKGltYWdlICYmIGltYWdlLnBhdGgpIHtcbiAgICAgICAgZmlsZXMucHVzaChpbWFnZS5wYXRoKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlmIChzdGlja2VyICYmIHN0aWNrZXIuZGF0YSAmJiBzdGlja2VyLmRhdGEucGF0aCkge1xuICAgIGZpbGVzLnB1c2goc3RpY2tlci5kYXRhLnBhdGgpO1xuXG4gICAgaWYgKHN0aWNrZXIuZGF0YS50aHVtYm5haWwgJiYgc3RpY2tlci5kYXRhLnRodW1ibmFpbC5wYXRoKSB7XG4gICAgICBmaWxlcy5wdXNoKHN0aWNrZXIuZGF0YS50aHVtYm5haWwucGF0aCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGZpbGVzO1xufVxuXG5mdW5jdGlvbiBnZXRFeHRlcm5hbEZpbGVzRm9yQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb246IFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ2F2YXRhcicgfCAncHJvZmlsZUF2YXRhcic+XG4pOiBBcnJheTxzdHJpbmc+IHtcbiAgY29uc3QgeyBhdmF0YXIsIHByb2ZpbGVBdmF0YXIgfSA9IGNvbnZlcnNhdGlvbjtcbiAgY29uc3QgZmlsZXM6IEFycmF5PHN0cmluZz4gPSBbXTtcblxuICBpZiAoYXZhdGFyICYmIGF2YXRhci5wYXRoKSB7XG4gICAgZmlsZXMucHVzaChhdmF0YXIucGF0aCk7XG4gIH1cblxuICBpZiAocHJvZmlsZUF2YXRhciAmJiBwcm9maWxlQXZhdGFyLnBhdGgpIHtcbiAgICBmaWxlcy5wdXNoKHByb2ZpbGVBdmF0YXIucGF0aCk7XG4gIH1cblxuICByZXR1cm4gZmlsZXM7XG59XG5cbmZ1bmN0aW9uIGdldEV4dGVybmFsRHJhZnRGaWxlc0ZvckNvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uOiBQaWNrPENvbnZlcnNhdGlvblR5cGUsICdkcmFmdEF0dGFjaG1lbnRzJz5cbik6IEFycmF5PHN0cmluZz4ge1xuICBjb25zdCBkcmFmdEF0dGFjaG1lbnRzID0gY29udmVyc2F0aW9uLmRyYWZ0QXR0YWNobWVudHMgfHwgW107XG4gIGNvbnN0IGZpbGVzOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgZm9yRWFjaChkcmFmdEF0dGFjaG1lbnRzLCBhdHRhY2htZW50ID0+IHtcbiAgICBpZiAoYXR0YWNobWVudC5wZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBwYXRoOiBmaWxlLCBzY3JlZW5zaG90UGF0aCB9ID0gYXR0YWNobWVudDtcbiAgICBpZiAoZmlsZSkge1xuICAgICAgZmlsZXMucHVzaChmaWxlKTtcbiAgICB9XG5cbiAgICBpZiAoc2NyZWVuc2hvdFBhdGgpIHtcbiAgICAgIGZpbGVzLnB1c2goc2NyZWVuc2hvdFBhdGgpO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIGZpbGVzO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVLbm93bkF0dGFjaG1lbnRzKFxuICBhbGxBdHRhY2htZW50czogQXJyYXk8c3RyaW5nPlxuKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbG9va3VwOiBEaWN0aW9uYXJ5PGJvb2xlYW4+ID0gZnJvbVBhaXJzKFxuICAgIG1hcChhbGxBdHRhY2htZW50cywgZmlsZSA9PiBbZmlsZSwgdHJ1ZV0pXG4gICk7XG4gIGNvbnN0IGNodW5rU2l6ZSA9IDUwMDtcblxuICBjb25zdCB0b3RhbCA9IGdldE1lc3NhZ2VDb3VudFN5bmMoKTtcbiAgbG9nZ2VyLmluZm8oXG4gICAgYHJlbW92ZUtub3duQXR0YWNobWVudHM6IEFib3V0IHRvIGl0ZXJhdGUgdGhyb3VnaCAke3RvdGFsfSBtZXNzYWdlc2BcbiAgKTtcblxuICBsZXQgY291bnQgPSAwO1xuXG4gIGZvciAoY29uc3QgbWVzc2FnZSBvZiBuZXcgVGFibGVJdGVyYXRvcjxNZXNzYWdlVHlwZT4oZGIsICdtZXNzYWdlcycpKSB7XG4gICAgY29uc3QgZXh0ZXJuYWxGaWxlcyA9IGdldEV4dGVybmFsRmlsZXNGb3JNZXNzYWdlKG1lc3NhZ2UpO1xuICAgIGZvckVhY2goZXh0ZXJuYWxGaWxlcywgZmlsZSA9PiB7XG4gICAgICBkZWxldGUgbG9va3VwW2ZpbGVdO1xuICAgIH0pO1xuICAgIGNvdW50ICs9IDE7XG4gIH1cblxuICBsb2dnZXIuaW5mbyhgcmVtb3ZlS25vd25BdHRhY2htZW50czogRG9uZSBwcm9jZXNzaW5nICR7Y291bnR9IG1lc3NhZ2VzYCk7XG5cbiAgbGV0IGNvbXBsZXRlID0gZmFsc2U7XG4gIGNvdW50ID0gMDtcbiAgbGV0IGlkID0gJyc7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uVG90YWwgPSBhd2FpdCBnZXRDb252ZXJzYXRpb25Db3VudCgpO1xuICBsb2dnZXIuaW5mbyhcbiAgICBgcmVtb3ZlS25vd25BdHRhY2htZW50czogQWJvdXQgdG8gaXRlcmF0ZSB0aHJvdWdoICR7Y29udmVyc2F0aW9uVG90YWx9IGNvbnZlcnNhdGlvbnNgXG4gICk7XG5cbiAgY29uc3QgZmV0Y2hDb252ZXJzYXRpb25zID0gZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgYFxuICAgICAgU0VMRUNUIGpzb24gRlJPTSBjb252ZXJzYXRpb25zXG4gICAgICBXSEVSRSBpZCA+ICRpZFxuICAgICAgT1JERVIgQlkgaWQgQVNDXG4gICAgICBMSU1JVCAkY2h1bmtTaXplO1xuICAgIGBcbiAgKTtcblxuICB3aGlsZSAoIWNvbXBsZXRlKSB7XG4gICAgY29uc3Qgcm93cyA9IGZldGNoQ29udmVyc2F0aW9ucy5hbGwoe1xuICAgICAgaWQsXG4gICAgICBjaHVua1NpemUsXG4gICAgfSk7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25zOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IG1hcChyb3dzLCByb3cgPT5cbiAgICAgIGpzb25Ub09iamVjdChyb3cuanNvbilcbiAgICApO1xuICAgIGNvbnZlcnNhdGlvbnMuZm9yRWFjaChjb252ZXJzYXRpb24gPT4ge1xuICAgICAgY29uc3QgZXh0ZXJuYWxGaWxlcyA9IGdldEV4dGVybmFsRmlsZXNGb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uKTtcbiAgICAgIGV4dGVybmFsRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgZGVsZXRlIGxvb2t1cFtmaWxlXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGFzdE1lc3NhZ2U6IENvbnZlcnNhdGlvblR5cGUgfCB1bmRlZmluZWQgPSBsYXN0KGNvbnZlcnNhdGlvbnMpO1xuICAgIGlmIChsYXN0TWVzc2FnZSkge1xuICAgICAgKHsgaWQgfSA9IGxhc3RNZXNzYWdlKTtcbiAgICB9XG4gICAgY29tcGxldGUgPSBjb252ZXJzYXRpb25zLmxlbmd0aCA8IGNodW5rU2l6ZTtcbiAgICBjb3VudCArPSBjb252ZXJzYXRpb25zLmxlbmd0aDtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKGByZW1vdmVLbm93bkF0dGFjaG1lbnRzOiBEb25lIHByb2Nlc3NpbmcgJHtjb3VudH0gY29udmVyc2F0aW9uc2ApO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhsb29rdXApO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZW1vdmVLbm93blN0aWNrZXJzKFxuICBhbGxTdGlja2VyczogQXJyYXk8c3RyaW5nPlxuKTogUHJvbWlzZTxBcnJheTxzdHJpbmc+PiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcbiAgY29uc3QgbG9va3VwOiBEaWN0aW9uYXJ5PGJvb2xlYW4+ID0gZnJvbVBhaXJzKFxuICAgIG1hcChhbGxTdGlja2VycywgZmlsZSA9PiBbZmlsZSwgdHJ1ZV0pXG4gICk7XG4gIGNvbnN0IGNodW5rU2l6ZSA9IDUwO1xuXG4gIGNvbnN0IHRvdGFsID0gYXdhaXQgZ2V0U3RpY2tlckNvdW50KCk7XG4gIGxvZ2dlci5pbmZvKFxuICAgIGByZW1vdmVLbm93blN0aWNrZXJzOiBBYm91dCB0byBpdGVyYXRlIHRocm91Z2ggJHt0b3RhbH0gc3RpY2tlcnNgXG4gICk7XG5cbiAgbGV0IGNvdW50ID0gMDtcbiAgbGV0IGNvbXBsZXRlID0gZmFsc2U7XG4gIGxldCByb3dpZCA9IDA7XG5cbiAgd2hpbGUgKCFjb21wbGV0ZSkge1xuICAgIGNvbnN0IHJvd3M6IEFycmF5PHsgcm93aWQ6IG51bWJlcjsgcGF0aDogc3RyaW5nIH0+ID0gZGJcbiAgICAgIC5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBTRUxFQ1Qgcm93aWQsIHBhdGggRlJPTSBzdGlja2Vyc1xuICAgICAgICBXSEVSRSByb3dpZCA+ICRyb3dpZFxuICAgICAgICBPUkRFUiBCWSByb3dpZCBBU0NcbiAgICAgICAgTElNSVQgJGNodW5rU2l6ZTtcbiAgICAgICAgYFxuICAgICAgKVxuICAgICAgLmFsbCh7XG4gICAgICAgIHJvd2lkLFxuICAgICAgICBjaHVua1NpemUsXG4gICAgICB9KTtcblxuICAgIGNvbnN0IGZpbGVzOiBBcnJheTxzdHJpbmc+ID0gcm93cy5tYXAocm93ID0+IHJvdy5wYXRoKTtcbiAgICBmaWxlcy5mb3JFYWNoKGZpbGUgPT4ge1xuICAgICAgZGVsZXRlIGxvb2t1cFtmaWxlXTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGxhc3RTdGlja2VyID0gbGFzdChyb3dzKTtcbiAgICBpZiAobGFzdFN0aWNrZXIpIHtcbiAgICAgICh7IHJvd2lkIH0gPSBsYXN0U3RpY2tlcik7XG4gICAgfVxuICAgIGNvbXBsZXRlID0gcm93cy5sZW5ndGggPCBjaHVua1NpemU7XG4gICAgY291bnQgKz0gcm93cy5sZW5ndGg7XG4gIH1cblxuICBsb2dnZXIuaW5mbyhgcmVtb3ZlS25vd25TdGlja2VyczogRG9uZSBwcm9jZXNzaW5nICR7Y291bnR9IHN0aWNrZXJzYCk7XG5cbiAgcmV0dXJuIE9iamVjdC5rZXlzKGxvb2t1cCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlbW92ZUtub3duRHJhZnRBdHRhY2htZW50cyhcbiAgYWxsU3RpY2tlcnM6IEFycmF5PHN0cmluZz5cbik6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IGxvb2t1cDogRGljdGlvbmFyeTxib29sZWFuPiA9IGZyb21QYWlycyhcbiAgICBtYXAoYWxsU3RpY2tlcnMsIGZpbGUgPT4gW2ZpbGUsIHRydWVdKVxuICApO1xuICBjb25zdCBjaHVua1NpemUgPSA1MDtcblxuICBjb25zdCB0b3RhbCA9IGF3YWl0IGdldENvbnZlcnNhdGlvbkNvdW50KCk7XG4gIGxvZ2dlci5pbmZvKFxuICAgIGByZW1vdmVLbm93bkRyYWZ0QXR0YWNobWVudHM6IEFib3V0IHRvIGl0ZXJhdGUgdGhyb3VnaCAke3RvdGFsfSBjb252ZXJzYXRpb25zYFxuICApO1xuXG4gIGxldCBjb21wbGV0ZSA9IGZhbHNlO1xuICBsZXQgY291bnQgPSAwO1xuICAvLyBUaG91Z2ggY29udmVyc2F0aW9ucy5pZCBpcyBhIHN0cmluZywgdGhpcyBlbnN1cmVzIHRoYXQsIHdoZW4gY29lcmNlZCwgdGhpc1xuICAvLyAgIHZhbHVlIGlzIHN0aWxsIGEgc3RyaW5nIGJ1dCBpdCdzIHNtYWxsZXIgdGhhbiBldmVyeSBvdGhlciBzdHJpbmcuXG4gIGxldCBpZDogbnVtYmVyIHwgc3RyaW5nID0gMDtcblxuICB3aGlsZSAoIWNvbXBsZXRlKSB7XG4gICAgY29uc3Qgcm93czogSlNPTlJvd3MgPSBkYlxuICAgICAgLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFNFTEVDVCBqc29uIEZST00gY29udmVyc2F0aW9uc1xuICAgICAgICBXSEVSRSBpZCA+ICRpZFxuICAgICAgICBPUkRFUiBCWSBpZCBBU0NcbiAgICAgICAgTElNSVQgJGNodW5rU2l6ZTtcbiAgICAgICAgYFxuICAgICAgKVxuICAgICAgLmFsbCh7XG4gICAgICAgIGlkLFxuICAgICAgICBjaHVua1NpemUsXG4gICAgICB9KTtcblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0gcm93cy5tYXAocm93ID0+XG4gICAgICBqc29uVG9PYmplY3Qocm93Lmpzb24pXG4gICAgKTtcbiAgICBjb252ZXJzYXRpb25zLmZvckVhY2goY29udmVyc2F0aW9uID0+IHtcbiAgICAgIGNvbnN0IGV4dGVybmFsRmlsZXMgPSBnZXRFeHRlcm5hbERyYWZ0RmlsZXNGb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uKTtcbiAgICAgIGV4dGVybmFsRmlsZXMuZm9yRWFjaChmaWxlID0+IHtcbiAgICAgICAgZGVsZXRlIGxvb2t1cFtmaWxlXTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29uc3QgbGFzdE1lc3NhZ2U6IENvbnZlcnNhdGlvblR5cGUgfCB1bmRlZmluZWQgPSBsYXN0KGNvbnZlcnNhdGlvbnMpO1xuICAgIGlmIChsYXN0TWVzc2FnZSkge1xuICAgICAgKHsgaWQgfSA9IGxhc3RNZXNzYWdlKTtcbiAgICB9XG4gICAgY29tcGxldGUgPSBjb252ZXJzYXRpb25zLmxlbmd0aCA8IGNodW5rU2l6ZTtcbiAgICBjb3VudCArPSBjb252ZXJzYXRpb25zLmxlbmd0aDtcbiAgfVxuXG4gIGxvZ2dlci5pbmZvKFxuICAgIGByZW1vdmVLbm93bkRyYWZ0QXR0YWNobWVudHM6IERvbmUgcHJvY2Vzc2luZyAke2NvdW50fSBjb252ZXJzYXRpb25zYFxuICApO1xuXG4gIHJldHVybiBPYmplY3Qua2V5cyhsb29rdXApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRKb2JzSW5RdWV1ZShxdWV1ZVR5cGU6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8U3RvcmVkSm9iPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBnZXRKb2JzSW5RdWV1ZVN5bmMoZGIsIHF1ZXVlVHlwZSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRKb2JzSW5RdWV1ZVN5bmMoXG4gIGRiOiBEYXRhYmFzZSxcbiAgcXVldWVUeXBlOiBzdHJpbmdcbik6IEFycmF5PFN0b3JlZEpvYj4ge1xuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgaWQsIHRpbWVzdGFtcCwgZGF0YVxuICAgICAgRlJPTSBqb2JzXG4gICAgICBXSEVSRSBxdWV1ZVR5cGUgPSAkcXVldWVUeXBlXG4gICAgICBPUkRFUiBCWSB0aW1lc3RhbXA7XG4gICAgICBgXG4gICAgKVxuICAgIC5hbGwoeyBxdWV1ZVR5cGUgfSlcbiAgICAubWFwKHJvdyA9PiAoe1xuICAgICAgaWQ6IHJvdy5pZCxcbiAgICAgIHF1ZXVlVHlwZSxcbiAgICAgIHRpbWVzdGFtcDogcm93LnRpbWVzdGFtcCxcbiAgICAgIGRhdGE6IGlzTm90TmlsKHJvdy5kYXRhKSA/IEpTT04ucGFyc2Uocm93LmRhdGEpIDogdW5kZWZpbmVkLFxuICAgIH0pKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluc2VydEpvYlN5bmMoZGI6IERhdGFiYXNlLCBqb2I6IFJlYWRvbmx5PFN0b3JlZEpvYj4pOiB2b2lkIHtcbiAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgYFxuICAgICAgSU5TRVJUIElOVE8gam9ic1xuICAgICAgKGlkLCBxdWV1ZVR5cGUsIHRpbWVzdGFtcCwgZGF0YSlcbiAgICAgIFZBTFVFU1xuICAgICAgKCRpZCwgJHF1ZXVlVHlwZSwgJHRpbWVzdGFtcCwgJGRhdGEpO1xuICAgIGBcbiAgKS5ydW4oe1xuICAgIGlkOiBqb2IuaWQsXG4gICAgcXVldWVUeXBlOiBqb2IucXVldWVUeXBlLFxuICAgIHRpbWVzdGFtcDogam9iLnRpbWVzdGFtcCxcbiAgICBkYXRhOiBpc05vdE5pbChqb2IuZGF0YSkgPyBKU09OLnN0cmluZ2lmeShqb2IuZGF0YSkgOiBudWxsLFxuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW5zZXJ0Sm9iKGpvYjogUmVhZG9ubHk8U3RvcmVkSm9iPik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIHJldHVybiBpbnNlcnRKb2JTeW5jKGRiLCBqb2IpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVKb2IoaWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIucHJlcGFyZTxRdWVyeT4oJ0RFTEVURSBGUk9NIGpvYnMgV0hFUkUgaWQgPSAkaWQnKS5ydW4oeyBpZCB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0KFxuICByaW5nSWQ6IGJpZ2ludFxuKTogUHJvbWlzZTxQcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3RSZXN1bHQ+IHtcbiAgY29uc3QgZGIgPSBnZXRJbnN0YW5jZSgpO1xuXG4gIHJldHVybiBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgbGV0IHJlc3VsdDogUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0O1xuXG4gICAgY29uc3Qgd2FzUmluZ1ByZXZpb3VzbHlDYW5jZWxlZCA9IEJvb2xlYW4oXG4gICAgICBkYlxuICAgICAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICAgICAgYFxuICAgICAgICAgIFNFTEVDVCAxIEZST00gZ3JvdXBDYWxsUmluZ3NcbiAgICAgICAgICBXSEVSRSByaW5nSWQgPSAkcmluZ0lkIEFORCBpc0FjdGl2ZSA9IDBcbiAgICAgICAgICBMSU1JVCAxO1xuICAgICAgICAgIGBcbiAgICAgICAgKVxuICAgICAgICAucGx1Y2sodHJ1ZSlcbiAgICAgICAgLmdldCh7IHJpbmdJZCB9KVxuICAgICk7XG5cbiAgICBpZiAod2FzUmluZ1ByZXZpb3VzbHlDYW5jZWxlZCkge1xuICAgICAgcmVzdWx0ID0gUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0LlJpbmdXYXNQcmV2aW91c2x5Q2FuY2VsZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGlzVGhlcmVBbm90aGVyQWN0aXZlUmluZyA9IEJvb2xlYW4oXG4gICAgICAgIGRiXG4gICAgICAgICAgLnByZXBhcmU8RW1wdHlRdWVyeT4oXG4gICAgICAgICAgICBgXG4gICAgICAgICAgICBTRUxFQ1QgMSBGUk9NIGdyb3VwQ2FsbFJpbmdzXG4gICAgICAgICAgICBXSEVSRSBpc0FjdGl2ZSA9IDFcbiAgICAgICAgICAgIExJTUlUIDE7XG4gICAgICAgICAgICBgXG4gICAgICAgICAgKVxuICAgICAgICAgIC5wbHVjayh0cnVlKVxuICAgICAgICAgIC5nZXQoKVxuICAgICAgKTtcbiAgICAgIGlmIChpc1RoZXJlQW5vdGhlckFjdGl2ZVJpbmcpIHtcbiAgICAgICAgcmVzdWx0ID0gUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0LlRoZXJlSXNBbm90aGVyQWN0aXZlUmluZztcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlc3VsdCA9IFByb2Nlc3NHcm91cENhbGxSaW5nUmVxdWVzdFJlc3VsdC5TaG91bGRSaW5nO1xuICAgICAgfVxuXG4gICAgICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBJTlNFUlQgT1IgSUdOT1JFIElOVE8gZ3JvdXBDYWxsUmluZ3MgKHJpbmdJZCwgaXNBY3RpdmUsIGNyZWF0ZWRBdClcbiAgICAgICAgVkFMVUVTICgkcmluZ0lkLCAxLCAkY3JlYXRlZEF0KTtcbiAgICAgICAgYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9KSgpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBwcm9jZXNzR3JvdXBDYWxsUmluZ0NhbmNlbGF0aW9uKHJpbmdJZDogYmlnaW50KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICBgXG4gICAgSU5TRVJUIElOVE8gZ3JvdXBDYWxsUmluZ3MgKHJpbmdJZCwgaXNBY3RpdmUsIGNyZWF0ZWRBdClcbiAgICBWQUxVRVMgKCRyaW5nSWQsIDAsICRjcmVhdGVkQXQpXG4gICAgT04gQ09ORkxJQ1QgKHJpbmdJZCkgRE9cbiAgICBVUERBVEUgU0VUIGlzQWN0aXZlID0gMDtcbiAgICBgXG4gICkucnVuKHsgcmluZ0lkLCBjcmVhdGVkQXQ6IERhdGUubm93KCkgfSk7XG59XG5cbi8vIFRoaXMgYWdlLCBpbiBtaWxsaXNlY29uZHMsIHNob3VsZCBiZSBsb25nZXIgdGhhbiBhbnkgZ3JvdXAgY2FsbCByaW5nIGR1cmF0aW9uLiBCZXlvbmRcbi8vICAgdGhhdCwgaXQgZG9lc24ndCByZWFsbHkgbWF0dGVyIHdoYXQgdGhlIHZhbHVlIGlzLlxuY29uc3QgTUFYX0dST1VQX0NBTExfUklOR19BR0UgPSAzMCAqIGR1cmF0aW9ucy5NSU5VVEU7XG5cbmFzeW5jIGZ1bmN0aW9uIGNsZWFuRXhwaXJlZEdyb3VwQ2FsbFJpbmdzKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG5cbiAgZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgYFxuICAgIERFTEVURSBGUk9NIGdyb3VwQ2FsbFJpbmdzXG4gICAgV0hFUkUgY3JlYXRlZEF0IDwgJGV4cGlyZWRSaW5nVGltZTtcbiAgICBgXG4gICkucnVuKHtcbiAgICBleHBpcmVkUmluZ1RpbWU6IERhdGUubm93KCkgLSBNQVhfR1JPVVBfQ0FMTF9SSU5HX0FHRSxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldE1heE1lc3NhZ2VDb3VudGVyKCk6IFByb21pc2U8bnVtYmVyIHwgdW5kZWZpbmVkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICByZXR1cm4gZGJcbiAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PihcbiAgICAgIGBcbiAgICBTRUxFQ1QgTUFYKGNvdW50ZXIpXG4gICAgRlJPTVxuICAgICAgKFxuICAgICAgICBTRUxFQ1QgTUFYKHJlY2VpdmVkX2F0KSBBUyBjb3VudGVyIEZST00gbWVzc2FnZXNcbiAgICAgICAgVU5JT05cbiAgICAgICAgU0VMRUNUIE1BWCh0aW1lc3RhbXApIEFTIGNvdW50ZXIgRlJPTSB1bnByb2Nlc3NlZFxuICAgICAgKVxuICAgIGBcbiAgICApXG4gICAgLnBsdWNrKClcbiAgICAuZ2V0KCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFN0YXRpc3RpY3NGb3JMb2dnaW5nKCk6IFByb21pc2U8UmVjb3JkPHN0cmluZywgc3RyaW5nPj4ge1xuICBjb25zdCBkYiA9IGdldEluc3RhbmNlKCk7XG4gIGNvbnN0IGNvdW50cyA9IGF3YWl0IHBQcm9wcyh7XG4gICAgbWVzc2FnZUNvdW50OiBnZXRNZXNzYWdlQ291bnQoKSxcbiAgICBjb252ZXJzYXRpb25Db3VudDogZ2V0Q29udmVyc2F0aW9uQ291bnQoKSxcbiAgICBzZXNzaW9uQ291bnQ6IGdldENvdW50RnJvbVRhYmxlKGRiLCAnc2Vzc2lvbnMnKSxcbiAgICBzZW5kZXJLZXlDb3VudDogZ2V0Q291bnRGcm9tVGFibGUoZGIsICdzZW5kZXJLZXlzJyksXG4gIH0pO1xuICByZXR1cm4gbWFwVmFsdWVzKGNvdW50cywgZm9ybWF0Q291bnRGb3JMb2dnaW5nKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlQWxsQ29udmVyc2F0aW9uQ29sb3JzKFxuICBjb252ZXJzYXRpb25Db2xvcj86IENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgY3VzdG9tQ29sb3JEYXRhPzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IEN1c3RvbUNvbG9yVHlwZTtcbiAgfVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGRiID0gZ2V0SW5zdGFuY2UoKTtcblxuICBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICBgXG4gICAgVVBEQVRFIGNvbnZlcnNhdGlvbnNcbiAgICBTRVQganNvbiA9IEpTT05fUEFUQ0goanNvbiwgJHBhdGNoKTtcbiAgICBgXG4gICkucnVuKHtcbiAgICBwYXRjaDogSlNPTi5zdHJpbmdpZnkoe1xuICAgICAgY29udmVyc2F0aW9uQ29sb3I6IGNvbnZlcnNhdGlvbkNvbG9yIHx8IG51bGwsXG4gICAgICBjdXN0b21Db2xvcjogY3VzdG9tQ29sb3JEYXRhPy52YWx1ZSB8fCBudWxsLFxuICAgICAgY3VzdG9tQ29sb3JJZDogY3VzdG9tQ29sb3JEYXRhPy5pZCB8fCBudWxsLFxuICAgIH0pLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUtBLGtCQUFxQjtBQUNyQixvQkFBbUI7QUFDbkIsb0JBQW1CO0FBRW5CLDRCQUFnQjtBQUNoQixxQkFBbUI7QUFHbkIsb0JBWU87QUFFUCwrQkFBMkI7QUFHM0IsMkJBQWdDO0FBQ2hDLGtCQUFxQjtBQUdyQixvQkFBbUM7QUFDbkMsMEJBQTZCO0FBQzdCLDJCQUE4QjtBQUM5QixzQkFBeUI7QUFDekIsNEJBQStCO0FBQy9CLHNCQUF5QjtBQUN6Qiw4QkFBaUM7QUFDakMsNkJBQWdDO0FBQ2hDLGdCQUEyQjtBQUMzQixtQ0FBc0M7QUFFdEMscUJBQWtEO0FBQ2xELG9DQUF1QztBQUV2QywyQkFBbUM7QUFDbkMsNkJBQXFDO0FBRXJDLFVBQXFCO0FBRXJCLGtCQWVPO0FBQ1Asd0JBQTZCO0FBMkM3QiwrQkFBMkI7QUFzQjNCLE1BQU0sZ0JBQWlDO0FBQUEsRUFDckM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUVBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFFQTtBQUFBLEVBRUE7QUFBQSxFQUlBO0FBQUEsRUFDQTtBQUFBLEVBRUE7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQUNBLElBQU8saUJBQVE7QUFJZixNQUFNLGlCQUFpQixvQkFBSSxRQUFzQztBQUVqRSxpQkFBb0IsSUFBYyxPQUE2QjtBQUM3RCxNQUFJLFVBQVUsZUFBZSxJQUFJLEVBQUU7QUFDbkMsTUFBSSxDQUFDLFNBQVM7QUFDWixjQUFVLG9CQUFJLElBQUk7QUFDbEIsbUJBQWUsSUFBSSxJQUFJLE9BQU87QUFBQSxFQUNoQztBQUVBLE1BQUksU0FBUyxRQUFRLElBQUksS0FBSztBQUM5QixNQUFJLENBQUMsUUFBUTtBQUNYLGFBQVMsR0FBRyxRQUFXLEtBQUs7QUFDNUIsWUFBUSxJQUFJLE9BQU8sTUFBTTtBQUFBLEVBQzNCO0FBRUEsU0FBTztBQUNUO0FBZFMsQUFnQlQsMkJBQTJCLEtBQXdDO0FBQ2pFLFFBQU0sYUFBYSxLQUFLLE1BQU0sSUFBSSxJQUFJO0FBRXRDLE1BQUk7QUFDSixNQUFJLDBDQUFlLElBQUksb0JBQW9CLEdBQUc7QUFDNUMsMkJBQXVCLElBQUk7QUFBQSxFQUM3QixPQUFPO0FBQ0wsOEJBQ0UseUJBQU0sSUFBSSxvQkFBb0IsR0FDOUIsc0VBQ0Y7QUFDQSwyQkFBdUI7QUFBQSxFQUN6QjtBQUVBLFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQWxCUyxBQW1CVCxzQkFBc0IsS0FBOEI7QUFDbEQsU0FBTztBQUFBLE9BQ0Y7QUFBQSxJQUNILGFBQWEsUUFBUSxJQUFJLFdBQVc7QUFBQSxJQUNwQyxPQUFPLDhCQUFTLElBQUksS0FBSztBQUFBLEVBQzNCO0FBQ0Y7QUFOUyxBQVFULHNCQUFzQjtBQUNwQixNQUFJLE9BQU8sWUFBWSxlQUFlLENBQUMsU0FBUztBQUM5QyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sUUFBUSxTQUFTO0FBQzFCO0FBTlMsQUFRVCxxQkFBcUIsSUFBYyxLQUFtQjtBQUVwRCxLQUFHLE9BQU8sWUFBWSxPQUFPO0FBQy9CO0FBSFMsQUFLVCxxQkFBcUIsSUFBb0I7QUFFdkMsS0FBRyxPQUFPLG9CQUFvQjtBQUM5QixLQUFHLE9BQU8sb0JBQW9CO0FBQ2hDO0FBSlMsQUFNVCw4QkFBOEIsSUFBb0I7QUFDaEQsUUFBTSxjQUFjLGdDQUFlLEVBQUU7QUFDckMsTUFBSSxjQUFjLEdBQUc7QUFDbkI7QUFBQSxFQUNGO0FBRUEsUUFBTSxnQkFBZ0Isa0NBQWlCLEVBQUU7QUFDekMsUUFBTSxpQkFBaUIsZ0JBQWdCLEtBQUssS0FBSztBQUNqRCxTQUFPLEtBQ0wsdURBQ0ssaUNBQWlDLGdCQUN4QztBQUVBLGtDQUFlLElBQUksY0FBYztBQUNuQztBQWRTLEFBZ0JULGdDQUFnQyxVQUFrQixLQUFhO0FBQzdELE1BQUk7QUFHSixNQUFJO0FBQ0YsU0FBSyxJQUFJLDhCQUFJLFFBQVE7QUFDckIsZ0JBQVksSUFBSSxHQUFHO0FBQ25CLGdCQUFZLEVBQUU7QUFDZCx5QkFBcUIsRUFBRTtBQUV2QixXQUFPO0FBQUEsRUFDVCxTQUFTLE9BQVA7QUFDQSxRQUFJLElBQUk7QUFDTixTQUFHLE1BQU07QUFBQSxJQUNYO0FBQ0EsV0FBTyxLQUFLLHlEQUF5RDtBQUFBLEVBQ3ZFO0FBSUEsT0FBSyxJQUFJLDhCQUFJLFFBQVE7QUFDckIsY0FBWSxJQUFJLEdBQUc7QUFHbkIsS0FBRyxPQUFPLDBCQUEwQjtBQUNwQyx1QkFBcUIsRUFBRTtBQUN2QixLQUFHLE1BQU07QUFJVCxPQUFLLElBQUksOEJBQUksUUFBUTtBQUNyQixjQUFZLElBQUksR0FBRztBQUVuQixLQUFHLE9BQU8sZ0JBQWdCO0FBQzFCLGNBQVksRUFBRTtBQUVkLFNBQU87QUFDVDtBQXJDUyxBQXVDVCxNQUFNLGNBQWM7QUFDcEIsK0JBQStCLFVBQWtCLEVBQUUsT0FBd0I7QUFDekUsUUFBTSxRQUFRLFlBQVksS0FBSyxHQUFHO0FBQ2xDLE1BQUksT0FBTztBQUNULFVBQU0sSUFBSSxNQUFNLHdCQUF3QixtQkFBbUI7QUFBQSxFQUM3RDtBQUVBLFFBQU0sS0FBSyx1QkFBdUIsVUFBVSxHQUFHO0FBRy9DLEtBQUcsT0FBTyxtQkFBbUI7QUFFN0IsU0FBTztBQUNUO0FBWlMsQUFjVCxJQUFJO0FBQ0osSUFBSSxTQUFTO0FBQ2IsSUFBSTtBQUNKLElBQUk7QUFDSixJQUFJO0FBRUosMEJBQTBCO0FBQUEsRUFDeEI7QUFBQSxFQUNBO0FBQUEsRUFDQSxRQUFRO0FBQUEsR0FLUTtBQUNoQixNQUFJLGdCQUFnQjtBQUNsQixVQUFNLElBQUksTUFBTSxtQ0FBbUM7QUFBQSxFQUNyRDtBQUVBLE1BQUksQ0FBQyw0QkFBUyxTQUFTLEdBQUc7QUFDeEIsVUFBTSxJQUFJLE1BQU0sb0NBQW9DO0FBQUEsRUFDdEQ7QUFDQSxNQUFJLENBQUMsNEJBQVMsR0FBRyxHQUFHO0FBQ2xCLFVBQU0sSUFBSSxNQUFNLDhCQUE4QjtBQUFBLEVBQ2hEO0FBRUEsV0FBUztBQUVULGtCQUFnQixzQkFBSyxXQUFXLFdBQVc7QUFFM0MsUUFBTSxRQUFRLHNCQUFLLFdBQVcsS0FBSztBQUNuQyx3QkFBTyxLQUFLLEtBQUs7QUFFakIscUJBQW1CLHNCQUFLLE9BQU8sV0FBVztBQUUxQyxNQUFJO0FBRUosTUFBSTtBQUNGLFNBQUssc0JBQXNCLGtCQUFrQixFQUFFLElBQUksQ0FBQztBQUtwRCx3Q0FBYSxJQUFJLE1BQU07QUFHdkIscUJBQWlCO0FBR2pCLHdCQUFvQjtBQUFBLEVBQ3RCLFNBQVMsT0FBUDtBQUNBLFdBQU8sTUFBTSwyQkFBMkIsTUFBTSxLQUFLO0FBQ25ELFFBQUksSUFBSTtBQUNOLFNBQUcsTUFBTTtBQUFBLElBQ1g7QUFDQSxVQUFNO0FBQUEsRUFDUjtBQUNGO0FBbkRlLEFBcURmLGtDQUFrQztBQUFBLEVBQ2hDO0FBQUEsRUFDQTtBQUFBLEdBSWdCO0FBQ2hCLE1BQUksQ0FBQyxXQUFXLEdBQUc7QUFDakIsVUFBTSxJQUFJLE1BQU0sZ0NBQWdDO0FBQUEsRUFDbEQ7QUFDQSxNQUFJLHdCQUF3QjtBQUMxQixVQUFNLElBQUksTUFBTSxtQ0FBbUM7QUFBQSxFQUNyRDtBQUNBLE1BQUksQ0FBQyw0QkFBUyxTQUFTLEdBQUc7QUFDeEIsVUFBTSxJQUFJLE1BQU0sb0NBQW9DO0FBQUEsRUFDdEQ7QUFDQSxNQUFJLENBQUMsNEJBQVMsR0FBRyxHQUFHO0FBQ2xCLFVBQU0sSUFBSSxNQUFNLDhCQUE4QjtBQUFBLEVBQ2hEO0FBRUEsTUFBSSxDQUFDLGVBQWU7QUFDbEIsb0JBQWdCLHNCQUFLLFdBQVcsV0FBVztBQUFBLEVBQzdDO0FBRUEsUUFBTSxRQUFRLHNCQUFLLFdBQVcsS0FBSztBQUVuQyxNQUFJLENBQUMsa0JBQWtCO0FBQ3JCLHVCQUFtQixzQkFBSyxPQUFPLFdBQVc7QUFBQSxFQUM1QztBQUVBLE1BQUk7QUFFSixNQUFJO0FBQ0Ysa0JBQWMsc0JBQXNCLGtCQUFrQixFQUFFLElBQUksQ0FBQztBQUc3RCw2QkFBeUI7QUFHekIsd0JBQW9CO0FBQUEsRUFDdEIsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUFNLDJCQUEyQixNQUFNLEtBQUs7QUFDaEQsVUFBTTtBQUFBLEVBQ1I7QUFDRjtBQTVDZSxBQThDZix1QkFBc0M7QUFDcEMsYUFBVyxTQUFTLENBQUMsd0JBQXdCLGNBQWMsR0FBRztBQUc1RCxXQUFPLE9BQU8sVUFBVTtBQUV4QixXQUFPLE1BQU07QUFBQSxFQUNmO0FBRUEsbUJBQWlCO0FBQ2pCLDJCQUF5QjtBQUMzQjtBQVhlLEFBYWYsMEJBQXlDO0FBQ3ZDLE1BQUksZ0JBQWdCO0FBQ2xCLFFBQUk7QUFDRixxQkFBZSxNQUFNO0FBQUEsSUFDdkIsU0FBUyxPQUFQO0FBQ0EsYUFBTyxNQUFNLHVDQUF1QyxNQUFNLEtBQUs7QUFBQSxJQUNqRTtBQUNBLHFCQUFpQjtBQUFBLEVBQ25CO0FBQ0EsTUFBSSxDQUFDLGtCQUFrQjtBQUNyQixVQUFNLElBQUksTUFDUiw2REFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLEtBQUssdUNBQXVDO0FBQ25ELHdCQUFPLEtBQUssZ0JBQWdCO0FBQzVCLHdCQUFPLEtBQUssR0FBRyxzQkFBc0I7QUFDckMsd0JBQU8sS0FBSyxHQUFHLHNCQUFzQjtBQUN2QztBQW5CZSxBQXFCZixzQ0FBcUQ7QUFDbkQsTUFBSSxDQUFDLGVBQWU7QUFDbEIsVUFBTSxJQUFJLE1BQ1IsdUVBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxVQUFVLHNCQUFLLGVBQWUsV0FBVztBQUMvQyx3QkFBTyxLQUFLLE9BQU87QUFDbkIsa0JBQWdCO0FBQ2xCO0FBVmUsQUFZZix1QkFBaUM7QUFDL0IsTUFBSSxXQUFXLEdBQUc7QUFDaEIsUUFBSSxDQUFDLHdCQUF3QjtBQUMzQixZQUFNLElBQUksTUFBTSw4Q0FBOEM7QUFBQSxJQUNoRTtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxDQUFDLGdCQUFnQjtBQUNuQixVQUFNLElBQUksTUFBTSxzQ0FBc0M7QUFBQSxFQUN4RDtBQUVBLFNBQU87QUFDVDtBQWJTLEFBZVQsTUFBTSxzQkFBc0I7QUFDNUIseUNBQXlDLE1BQXNDO0FBQzdFLFNBQU8sZ0NBQWUsWUFBWSxHQUFHLHFCQUFxQixJQUFJO0FBQ2hFO0FBRmUsQUFHZixrQ0FDRSxJQUNzQztBQUN0QyxTQUFPLHlCQUFRLFlBQVksR0FBRyxxQkFBcUIsRUFBRTtBQUN2RDtBQUplLEFBS2YsbUNBQ0UsT0FDZTtBQUNmLFNBQU8seUJBQVEsWUFBWSxHQUFHLHFCQUFxQixLQUFLO0FBQzFEO0FBSmUsQUFLZixxQ0FBcUMsSUFBc0M7QUFDekUsU0FBTyw0QkFBVyxZQUFZLEdBQUcscUJBQXFCLEVBQUU7QUFDMUQ7QUFGZSxBQUdmLHVDQUFzRDtBQUNwRCxTQUFPLG9DQUFtQixZQUFZLEdBQUcsbUJBQW1CO0FBQzlEO0FBRmUsQUFHZixvQ0FBcUU7QUFDbkUsU0FBTyxpQ0FBZ0IsWUFBWSxHQUFHLG1CQUFtQjtBQUMzRDtBQUZlLEFBSWYsTUFBTSxpQkFBaUI7QUFDdkIsb0NBQW9DLE1BQWlDO0FBQ25FLFNBQU8sZ0NBQWUsWUFBWSxHQUFHLGdCQUFnQixJQUFJO0FBQzNEO0FBRmUsQUFHZiw2QkFDRSxJQUNpQztBQUNqQyxTQUFPLHlCQUFRLFlBQVksR0FBRyxnQkFBZ0IsRUFBRTtBQUNsRDtBQUplLEFBS2YsOEJBQThCLE9BQXlDO0FBQ3JFLFNBQU8seUJBQVEsWUFBWSxHQUFHLGdCQUFnQixLQUFLO0FBQ3JEO0FBRmUsQUFHZixnQ0FBZ0MsSUFBaUM7QUFDL0QsU0FBTyw0QkFBVyxZQUFZLEdBQUcsZ0JBQWdCLEVBQUU7QUFDckQ7QUFGZSxBQUdmLGtDQUFpRDtBQUMvQyxTQUFPLG9DQUFtQixZQUFZLEdBQUcsY0FBYztBQUN6RDtBQUZlLEFBR2YsK0JBQTJEO0FBQ3pELFNBQU8saUNBQWdCLFlBQVksR0FBRyxjQUFjO0FBQ3REO0FBRmUsQUFJZixNQUFNLHdCQUF3QjtBQUM5QiwwQ0FDRSxNQUNlO0FBQ2YsU0FBTyxnQ0FBZSxZQUFZLEdBQUcsdUJBQXVCLElBQUk7QUFDbEU7QUFKZSxBQUtmLG1DQUNFLElBQ3VDO0FBQ3ZDLFNBQU8seUJBQVEsWUFBWSxHQUFHLHVCQUF1QixFQUFFO0FBQ3pEO0FBSmUsQUFLZixvQ0FDRSxPQUNlO0FBQ2YsU0FBTyx5QkFBUSxZQUFZLEdBQUcsdUJBQXVCLEtBQUs7QUFDNUQ7QUFKZSxBQUtmLHNDQUFzQyxJQUF1QztBQUMzRSxTQUFPLDRCQUFXLFlBQVksR0FBRyx1QkFBdUIsRUFBRTtBQUM1RDtBQUZlLEFBR2Ysd0NBQXVEO0FBQ3JELFNBQU8sb0NBQW1CLFlBQVksR0FBRyxxQkFBcUI7QUFDaEU7QUFGZSxBQUdmLHFDQUF1RTtBQUNyRSxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQWlCLEdBQ3BCLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQUtGLEVBQ0MsSUFBSTtBQUVQLFNBQU8sS0FBSyxJQUFJLFNBQU8sOEJBQWEsSUFBSSxJQUFJLENBQUM7QUFDL0M7QUFiZSxBQWVmLE1BQU0sY0FBYztBQUNwQixrQ0FDRSxNQUNlO0FBQ2YsU0FBTyxnQ0FBZSxZQUFZLEdBQUcsYUFBYSxJQUFJO0FBQ3hEO0FBSmUsQUFLZiwyQkFDRSxJQUNrQztBQUNsQyxTQUFPLHlCQUFRLFlBQVksR0FBRyxhQUFhLEVBQUU7QUFDL0M7QUFKZSxBQUtmLDZCQUFvRDtBQUNsRCxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQWlCLEdBQ3BCLFFBQW9CLHlDQUF5QyxFQUM3RCxJQUFJO0FBSVAsUUFBTSxRQUFRLEtBQUssSUFBSSxTQUFPLDhCQUEwQixJQUFJLElBQUksQ0FBQztBQUVqRSxRQUFNLFNBQXVDLHVCQUFPLE9BQU8sSUFBSTtBQUUvRCxhQUFXLEVBQUUsSUFBSSxXQUFXLE9BQU87QUFDakMsV0FBTyxNQUFNO0FBQUEsRUFDZjtBQUVBLFNBQU87QUFDVDtBQWpCZSxBQWtCZiw4QkFBOEIsSUFBZ0M7QUFDNUQsU0FBTyw0QkFBVyxZQUFZLEdBQUcsYUFBYSxFQUFFO0FBQ2xEO0FBRmUsQUFHZixnQ0FBK0M7QUFDN0MsU0FBTyxvQ0FBbUIsWUFBWSxHQUFHLFdBQVc7QUFDdEQ7QUFGZSxBQUlmLHVDQUF1QyxLQUFtQztBQUN4RSw4QkFBNEIsR0FBRztBQUNqQztBQUZlLEFBSWYscUNBQXFDLEtBQTBCO0FBQzdELFFBQU0sS0FBSyxZQUFZO0FBRXZCLFVBQ0UsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FlRixFQUFFLElBQUksR0FBRztBQUNYO0FBckJTLEFBc0JULGdDQUNFLElBQ29DO0FBQ3BDLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sTUFBTSxRQUFRLElBQUkseUNBQXlDLEVBQUUsSUFBSTtBQUFBLElBQ3JFO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBVGUsQUFVZixxQ0FBb0Q7QUFDbEQsUUFBTSxLQUFLLFlBQVk7QUFDdkIsVUFBb0IsSUFBSSx3QkFBd0IsRUFBRSxJQUFJO0FBQ3hEO0FBSGUsQUFJZixrQ0FBaUU7QUFDL0QsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFPLFFBQW9CLElBQUksMEJBQTBCLEVBQUUsSUFBSTtBQUVyRSxTQUFPO0FBQ1Q7QUFMZSxBQU1mLG1DQUFtQyxJQUFvQztBQUNyRSxRQUFNLEtBQUssWUFBWTtBQUN2QixVQUFRLElBQUksdUNBQXVDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUNqRTtBQUhlLEFBS2YsK0JBQ0UsT0FDQSxTQUlpQjtBQUNqQixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLEVBQUUsWUFBWSxlQUFlO0FBSW5DLFNBQU8sR0FBRyxZQUFZLE1BQU07QUFFMUIsVUFBTSxPQUFPLFFBQ1gsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BV0YsRUFBRSxJQUFJLEtBQUs7QUFDWCxVQUFNLEtBQUssNENBQ1QsS0FBSyxpQkFDTCxpQ0FDRjtBQUdBLFVBQU0scUJBQXFCLFFBQ3pCLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVdGO0FBRUEsVUFBTSxpQkFBaUIsT0FBTyxLQUFLLFVBQVU7QUFDN0MsZUFBVyxpQkFBaUIsZ0JBQWdCO0FBQzFDLFlBQU0sWUFBWSxXQUFXO0FBRTdCLGlCQUFXLFlBQVksV0FBVztBQUNoQywyQkFBbUIsSUFBSTtBQUFBLFVBQ3JCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUdBLFVBQU0sbUJBQW1CLFFBQ3ZCLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BU0Y7QUFFQSxlQUFXLGFBQWEsWUFBWTtBQUNsQyx1QkFBaUIsSUFBSTtBQUFBLFFBQ25CO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFFQSxXQUFPO0FBQUEsRUFDVCxDQUFDLEVBQUU7QUFDTDtBQXJGZSxBQXVGZix5Q0FBeUMsV0FBa0M7QUFDekUsUUFBTSxLQUFLLFlBQVk7QUFFdkIsVUFDRSxJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1GLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxFQUNGLENBQUM7QUFDSDtBQWRlLEFBZ0JmLDBDQUEwQyxXQUFrQztBQUMxRSxRQUFNLEtBQUssWUFBWTtBQUV2QixVQUNFLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTUYsRUFBRSxJQUFJO0FBQUEsSUFDSjtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBZGUsQUFnQmYscUNBQXFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBS2dCO0FBQ2hCLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsWUFBWSxNQUFNO0FBQ25CLFVBQU0sWUFBWSxRQUNoQixJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FXRjtBQUVBLGVBQVcsWUFBWSxXQUFXO0FBQ2hDLGdCQUFVLElBQUk7QUFBQSxRQUNaO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQW5DZSxBQXFDZix3Q0FDRSxTQUdlO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsUUFBTSxRQUFRLE1BQU0sUUFBUSxPQUFPLElBQUksVUFBVSxDQUFDLE9BQU87QUFLekQsS0FBRyxZQUFZLE1BQU07QUFDbkIsZUFBVyxRQUFRLE9BQU87QUFDeEIsWUFBTSxFQUFFLFdBQVcsZUFBZSxhQUFhO0FBRy9DLFlBQU0sT0FBTyxRQUNYLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFFBU0YsRUFBRSxJQUFJLEVBQUUsV0FBVyxlQUFlLFNBQVMsQ0FBQztBQUM1QyxVQUFJLENBQUMsS0FBSyxRQUFRO0FBQ2hCO0FBQUEsTUFDRjtBQUNBLFVBQUksS0FBSyxTQUFTLEdBQUc7QUFDbkIsZUFBTyxLQUNMLG1GQUM2Qiw2QkFDL0I7QUFDQTtBQUFBLE1BQ0Y7QUFFQSxZQUFNLEVBQUUsT0FBTyxLQUFLO0FBR3BCLGNBQ0UsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQU9GLEVBQUUsSUFBSSxFQUFFLElBQUksZUFBZSxTQUFTLENBQUM7QUFHckMsWUFBTSxZQUFZLFFBQ2hCLElBQ0EsK0RBQ0YsRUFDRyxNQUFNLElBQUksRUFDVixJQUFJLEVBQUUsR0FBRyxDQUFDO0FBRWIsVUFBSSxDQUFDLDRCQUFTLFNBQVMsR0FBRztBQUN4QixjQUFNLElBQUksTUFDUiwrREFDRjtBQUFBLE1BQ0Y7QUFFQSxVQUFJLFlBQVksR0FBRztBQUNqQjtBQUFBLE1BQ0Y7QUFHQSxhQUFPLEtBQ0wsa0VBQzBDLFdBQzVDO0FBQ0EsY0FBUSxJQUFJLDZDQUE2QyxFQUFFLElBQUk7QUFBQSxRQUM3RDtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUMsRUFBRTtBQUNMO0FBbEZlLEFBb0ZmLHVDQUF1QztBQUFBLEVBQ3JDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUttRDtBQUNuRCxRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLE9BQU8sTUFBTyxLQUFLO0FBQ3pCLFFBQU0sWUFBWSxNQUFNLE9BQU87QUFFL0IsUUFBTSwwQkFBMEIsU0FBUztBQUV6QyxRQUFNLE1BQU0sUUFDVixJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQVlGLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxlQUFlO0FBQ3ZCLFNBQU87QUFBQSxPQUNGO0FBQUEsSUFDSCxZQUFZLGFBQWEsV0FBVyxNQUFNLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDcEQ7QUFDRjtBQTVDZSxBQTZDZixxQ0FBb0Q7QUFDbEQsUUFBTSxLQUFLLFlBQVk7QUFDdkIsVUFBb0IsSUFBSSw4QkFBOEIsRUFBRSxJQUFJO0FBQzlEO0FBSGUsQUFJZixrQ0FBaUU7QUFDL0QsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFPLFFBQW9CLElBQUksZ0NBQWdDLEVBQUUsSUFBSTtBQUUzRSxTQUFPO0FBQ1Q7QUFMZSxBQU1mLDRDQUVFO0FBQ0EsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFPLFFBQ1gsSUFDQSxrQ0FDRixFQUFFLElBQUk7QUFFTixTQUFPO0FBQ1Q7QUFWZSxBQVdmLDRDQUErRTtBQUM3RSxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQU8sUUFDWCxJQUNBLGtDQUNGLEVBQUUsSUFBSTtBQUVOLFNBQU87QUFDVDtBQVJlLEFBVWYsTUFBTSxpQkFBaUI7QUFDdkIsbUNBQW1DLE1BQXlCO0FBQzFELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sRUFBRSxJQUFJLGdCQUFnQixTQUFTLFNBQVM7QUFDOUMsTUFBSSxDQUFDLElBQUk7QUFDUCxVQUFNLElBQUksTUFDUiwrREFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsZ0JBQWdCO0FBQ25CLFVBQU0sSUFBSSxNQUNSLDJFQUNGO0FBQUEsRUFDRjtBQUVBLFVBQ0UsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FlRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNLDhCQUFhLElBQUk7QUFBQSxFQUN6QixDQUFDO0FBQ0g7QUF0Q1MsQUF1Q1QscUNBQXFDLE1BQWtDO0FBQ3JFLFNBQU8sMEJBQTBCLElBQUk7QUFDdkM7QUFGZSxBQUlmLHNDQUNFLE9BQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFlBQVksTUFBTTtBQUNuQixlQUFXLFFBQVEsT0FBTztBQUN4QixvQ0FBVywwQkFBMEIsSUFBSSxDQUFDO0FBQUEsSUFDNUM7QUFBQSxFQUNGLENBQUMsRUFBRTtBQUNMO0FBVmUsQUFZZixtQ0FBbUM7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FLZ0I7QUFDaEIsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxZQUFZLE1BQU07QUFDbkIsZUFBVyxRQUFRLFlBQVk7QUFDN0Isb0NBQVcsNEJBQTRCLElBQUksQ0FBQztBQUFBLElBQzlDO0FBRUEsZUFBVyxRQUFRLFVBQVU7QUFDM0Isb0NBQVcsMEJBQTBCLElBQUksQ0FBQztBQUFBLElBQzVDO0FBRUEsZUFBVyxRQUFRLGFBQWE7QUFDOUIsb0NBQVcsb0JBQW9CLElBQUksQ0FBQztBQUFBLElBQ3RDO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQXhCZSxBQTBCZiwrQkFBK0IsT0FBMEM7QUFDdkUsU0FBTyx5QkFBUSxZQUFZLEdBQUcsZ0JBQWdCLEtBQUs7QUFDckQ7QUFGZSxBQUdmLGlDQUFpQyxJQUFrQztBQUNqRSxTQUFPLDRCQUFXLFlBQVksR0FBRyxnQkFBZ0IsRUFBRTtBQUNyRDtBQUZlLEFBR2YsNENBQ0UsZ0JBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUEsS0FJRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFaZSxBQWFmLG1DQUFrRDtBQUNoRCxTQUFPLG9DQUFtQixZQUFZLEdBQUcsY0FBYztBQUN6RDtBQUZlLEFBR2YsZ0NBQTZEO0FBQzNELFNBQU8saUNBQWdCLFlBQVksR0FBRyxjQUFjO0FBQ3REO0FBRmUsQUFLZixzQ0FBdUQ7QUFDckQsU0FBTyxtQ0FBa0IsWUFBWSxHQUFHLGVBQWU7QUFDekQ7QUFGZSxBQUlmLG9DQUFvQyxFQUFFLFNBQVMsYUFBK0I7QUFDNUUsTUFBSSxXQUFXO0FBQ2IsV0FBTyxVQUFVLElBQUksQ0FBQyxTQUE0QixLQUFLLElBQUksRUFBRSxLQUFLLEdBQUc7QUFBQSxFQUN2RTtBQUNBLE1BQUksU0FBUztBQUNYLFdBQU8sUUFBUSxLQUFLLEdBQUc7QUFBQSxFQUN6QjtBQUNBLFNBQU87QUFDVDtBQVJTLEFBVVQsOEJBQ0UsTUFDQSxLQUFLLFlBQVksR0FDWDtBQUNOLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sY0FBYywyQkFBMkIsSUFBSTtBQUVuRCxLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQW1DRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNLDhCQUNKLHdCQUFLLE1BQU0sQ0FBQyx3QkFBd0IscUJBQXFCLENBQUMsQ0FDNUQ7QUFBQSxJQUVBLE1BQU0sUUFBUTtBQUFBLElBQ2QsTUFBTSxRQUFRO0FBQUEsSUFDZCxTQUFTLFdBQVc7QUFBQSxJQUVwQixXQUFXLGFBQWE7QUFBQSxJQUN4QjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsTUFBTSxRQUFRO0FBQUEsSUFDZCxhQUFhLGVBQWU7QUFBQSxJQUM1QixtQkFBbUIscUJBQXFCO0FBQUEsSUFDeEMsaUJBQWlCLHNDQUFhLGFBQWEsaUJBQWlCLEtBQUs7QUFBQSxJQUNqRSxzQkFBc0Isd0JBQXdCO0FBQUEsRUFDaEQsQ0FBQztBQUNIO0FBMUVTLEFBNEVULGdDQUNFLE1BQ0EsS0FBSyxZQUFZLEdBQ0Y7QUFDZixTQUFPLHFCQUFxQixNQUFNLEVBQUU7QUFDdEM7QUFMZSxBQU9mLGlDQUNFLHNCQUNlO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxZQUFZLE1BQU07QUFDbkIsZUFBVyxnQkFBZ0Isc0JBQXNCO0FBQy9DLG9DQUFXLHFCQUFxQixZQUFZLENBQUM7QUFBQSxJQUMvQztBQUFBLEVBQ0YsQ0FBQyxFQUFFO0FBQ0w7QUFWZSxBQVlmLGdDQUNFLE1BQ0EsS0FBSyxZQUFZLEdBQ1g7QUFDTixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sY0FBYywyQkFBMkIsSUFBSTtBQUVuRCxLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQWlCRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQSxNQUFNLDhCQUNKLHdCQUFLLE1BQU0sQ0FBQyx3QkFBd0IscUJBQXFCLENBQUMsQ0FDNUQ7QUFBQSxJQUVBLE1BQU0sUUFBUTtBQUFBLElBQ2QsTUFBTSxRQUFRO0FBQUEsSUFFZCxXQUFXLGFBQWE7QUFBQSxJQUN4QjtBQUFBLElBQ0EsU0FBUztBQUFBLElBQ1QsTUFBTSxRQUFRO0FBQUEsSUFDZCxhQUFhLGVBQWU7QUFBQSxJQUM1QixtQkFBbUIscUJBQXFCO0FBQUEsSUFDeEMsaUJBQWlCLHNDQUFhLGFBQWEsaUJBQWlCLEtBQUs7QUFBQSxJQUNqRSxzQkFBc0Isd0JBQXdCO0FBQUEsRUFDaEQsQ0FBQztBQUNIO0FBdERTLEFBd0RULGtDQUFrQyxNQUF1QztBQUN2RSxTQUFPLHVCQUF1QixJQUFJO0FBQ3BDO0FBRmUsQUFJZixtQ0FDRSxPQUNlO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxZQUFZLE1BQU07QUFDbkIsZUFBVyxRQUFRLE9BQU87QUFDeEIsb0NBQVcsdUJBQXVCLElBQUksQ0FBQztBQUFBLElBQ3pDO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQVZlLEFBWWYsaUNBQWlDLEtBQTBCO0FBQ3pELFFBQU0sS0FBSyxZQUFZO0FBR3ZCLEtBQUcsUUFDRDtBQUFBO0FBQUEsb0JBRWdCLElBQUksSUFBSSxNQUFNLEdBQUcsRUFBRSxLQUFLLElBQUk7QUFBQSxLQUU5QyxFQUFFLElBQUksR0FBRztBQUNYO0FBVlMsQUFZVCxrQ0FBa0MsSUFBMkM7QUFDM0UsUUFBTSxLQUFLLFlBQVk7QUFFdkIsTUFBSSxDQUFDLE1BQU0sUUFBUSxFQUFFLEdBQUc7QUFDdEIsT0FBRyxRQUFlLDJDQUEyQyxFQUFFLElBQUk7QUFBQSxNQUNqRTtBQUFBLElBQ0YsQ0FBQztBQUVEO0FBQUEsRUFDRjtBQUVBLE1BQUksQ0FBQyxHQUFHLFFBQVE7QUFDZCxVQUFNLElBQUksTUFBTSx1Q0FBdUM7QUFBQSxFQUN6RDtBQUVBLHNDQUFtQixJQUFJLElBQUksdUJBQXVCO0FBQ3BEO0FBaEJlLEFBa0JmLG1DQUNFLElBQ3VDO0FBQ3ZDLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sTUFBd0IsR0FDM0IsUUFBZSxnREFBZ0QsRUFDL0QsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUViLE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLDhCQUFhLElBQUksSUFBSTtBQUM5QjtBQWJlLEFBZWYsMkRBQTBFO0FBQ3hFLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0YsRUFBRSxJQUFJO0FBQ1I7QUFWZSxBQVlmLGlDQUFpQyxLQUFLLFlBQVksR0FBNEI7QUFDNUUsUUFBTSxPQUF5QixHQUM1QixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FLRixFQUNDLElBQUk7QUFFUCxTQUFPLEtBQUssSUFBSSxTQUFPLGtCQUFrQixHQUFHLENBQUM7QUFDL0M7QUFaUyxBQWNULHFDQUF1RTtBQUNyRSxTQUFPLHdCQUF3QjtBQUNqQztBQUZlLEFBSWYsdUNBQStEO0FBQzdELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sT0FBOEIsR0FDakMsUUFDQztBQUFBO0FBQUEsT0FHRixFQUNDLElBQUk7QUFFUCxTQUFPLEtBQUssSUFBSSxTQUFPLElBQUksRUFBRTtBQUMvQjtBQVhlLEFBYWYseUNBQ0UsTUFDa0M7QUFDbEMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUF5QixHQUM1QixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BT0YsRUFDQyxJQUFJO0FBQUEsSUFDSCxNQUFNLElBQUk7QUFBQSxFQUNaLENBQUM7QUFFSCxTQUFPLEtBQUssSUFBSSxTQUFPLGtCQUFrQixHQUFHLENBQUM7QUFDL0M7QUFuQmUsQUFxQmYsOEJBQ0UsT0FDQSxTQUFzRCxDQUFDLEdBQ1I7QUFDL0MsUUFBTSxFQUFFLFFBQVEsS0FBSyxtQkFBbUI7QUFFeEMsUUFBTSxLQUFLLFlBQVk7QUFhdkIsU0FBTyxHQUFHLFlBQVksTUFBTTtBQUMxQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUEsT0FJRjtBQUVBLE9BQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTRixFQUFFLElBQUksRUFBRSxNQUFNLENBQUM7QUFFZixRQUFJLG1CQUFtQixRQUFXO0FBQ2hDLFNBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFNBV0YsRUFBRSxJQUFJLEVBQUUsTUFBTSxDQUFDO0FBQUEsSUFDakIsT0FBTztBQUNMLFNBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWFGLEVBQUUsSUFBSSxFQUFFLGdCQUFnQixNQUFNLENBQUM7QUFBQSxJQUNqQztBQU1BLFVBQU0sU0FBUyxHQUNaLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQWNGLEVBQ0MsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUVoQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUEsT0FJRjtBQUVBLFdBQU87QUFBQSxFQUNULENBQUMsRUFBRTtBQUNMO0FBdkdlLEFBeUdmLDRDQUNFLE9BQ0EsZ0JBQ0EsRUFBRSxRQUFRLFFBQTRCLENBQUMsR0FDUTtBQUMvQyxTQUFPLGVBQWUsT0FBTyxFQUFFLGdCQUFnQixNQUFNLENBQUM7QUFDeEQ7QUFOZSxBQVFmLDZCQUNFLGdCQUNBLEtBQUssWUFBWSxHQUNUO0FBQ1IsTUFBSSxtQkFBbUIsUUFBVztBQUNoQyxXQUFPLG1DQUFrQixJQUFJLFVBQVU7QUFBQSxFQUN6QztBQUVBLFFBQU0sUUFBUSxHQUNYLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtGLEVBQ0MsTUFBTSxFQUNOLElBQUksRUFBRSxlQUFlLENBQUM7QUFFekIsU0FBTztBQUNUO0FBcEJTLEFBc0JULDZCQUE2QixnQkFBeUM7QUFDcEUsUUFBTSxLQUFLLFlBQVk7QUFDdkIsU0FBTyxHQUNKLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQUtGLEVBQ0MsTUFBTSxFQUNOLElBQUksRUFBRSxlQUFlLENBQUM7QUFDM0I7QUFaZSxBQWNmLCtCQUErQixnQkFBMEM7QUFDdkUsU0FBTyxvQkFBb0IsY0FBYztBQUMzQztBQUZlLEFBSWYsa0NBQWtDLGdCQUFpQztBQUNqRSxRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLE1BQXlCLEdBQzVCLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FVRixFQUNDLElBQUksRUFBRSxlQUFlLENBQUM7QUFFekIsU0FBTyxJQUFJLFVBQVU7QUFDdkI7QUFuQlMsQUFxQlQseUJBQ0UsTUFDQSxTQU9RO0FBQ1IsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBLEtBQUssWUFBWTtBQUFBLElBQ2pCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosTUFBSSxDQUFDLHNCQUFzQjtBQUN6QixXQUFPLEdBQUcsWUFBWSxNQUFNO0FBQzFCLGFBQU8sOEJBQ0wsZ0JBQWdCLE1BQU07QUFBQSxXQUNqQjtBQUFBLFFBQ0gsc0JBQXNCO0FBQUEsTUFDeEIsQ0FBQyxDQUNIO0FBQUEsSUFDRixDQUFDLEVBQUU7QUFBQSxFQUNMO0FBRUEsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFDSixNQUFJLEVBQUUsZUFBZTtBQUVyQixNQUFJLGVBQWUsb0NBQVcsVUFBVSxlQUFlLG9DQUFXLFFBQVE7QUFDeEUsUUFBSSxLQUNGLHdCQUF3QixNQUFNLHFDQUFxQyw2Q0FDckU7QUFHQSxXQUFPO0FBQUEsU0FDRjtBQUFBLE1BQ0gsWUFBWSxvQ0FBVztBQUFBLElBQ3pCO0FBQ0EsaUJBQWEsb0NBQVc7QUFBQSxFQUMxQjtBQUVBLFFBQU0sVUFBVTtBQUFBLElBQ2Q7QUFBQSxJQUNBLE1BQU0sOEJBQWEsSUFBSTtBQUFBLElBRXZCLE1BQU0sUUFBUTtBQUFBLElBQ2Q7QUFBQSxJQUNBLDBCQUEwQiw0QkFBNEI7QUFBQSxJQUN0RCxhQUFhLGVBQWU7QUFBQSxJQUM1QixnQkFBZ0IsaUJBQWlCLElBQUk7QUFBQSxJQUNyQyxvQkFBb0IscUJBQXFCLElBQUk7QUFBQSxJQUM3QywyQkFBMkIsNEJBQTRCLElBQUk7QUFBQSxJQUMzRCxxQkFBcUIsZUFBZSxTQUFTLFVBQVUsSUFBSTtBQUFBLElBQzNELFVBQVUsV0FBVyxJQUFJO0FBQUEsSUFDekIsWUFBWSxhQUFhLElBQUk7QUFBQSxJQUM3QixhQUFhLGVBQWU7QUFBQSxJQUM1QixlQUFlLGlCQUFpQjtBQUFBLElBQ2hDLFlBQVksY0FBYztBQUFBLElBQzFCLFNBQVMsV0FBVztBQUFBLElBQ3BCLFFBQVEsVUFBVTtBQUFBLElBQ2xCLFlBQVksY0FBYztBQUFBLElBQzFCLGNBQWMsZ0JBQWdCO0FBQUEsSUFDOUIsU0FBUyxXQUFXO0FBQUEsSUFDcEIsTUFBTSxRQUFRO0FBQUEsSUFDZCxZQUFZLGNBQWM7QUFBQSxJQUMxQixZQUFZLGNBQWMsb0NBQVc7QUFBQSxFQUN2QztBQUVBLE1BQUksTUFBTSxDQUFDLFdBQVc7QUFDcEIsWUFDRSxJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BNEJGLEVBQUUsSUFBSSxPQUFPO0FBRWIsUUFBSSxhQUFhO0FBQ2Ysb0JBQWMsSUFBSSxXQUFXO0FBQUEsSUFDL0I7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sV0FBVztBQUFBLE9BQ1o7QUFBQSxJQUNILElBQUksTUFBTSxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUFBLEVBQ3JDO0FBRUEsVUFDRSxJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FxREYsRUFBRSxJQUFJO0FBQUEsT0FDRDtBQUFBLElBQ0gsSUFBSSxTQUFTO0FBQUEsSUFDYixNQUFNLDhCQUFhLFFBQVE7QUFBQSxFQUM3QixDQUFDO0FBRUQsTUFBSSxhQUFhO0FBQ2Ysa0JBQWMsSUFBSSxXQUFXO0FBQUEsRUFDL0I7QUFFQSxTQUFPLFNBQVM7QUFDbEI7QUE3TVMsQUErTVQsMkJBQ0UsTUFDQSxTQU1pQjtBQUNqQixTQUFPLGdCQUFnQixNQUFNLE9BQU87QUFDdEM7QUFWZSxBQVlmLDRCQUNFLGlCQUNBLFNBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFlBQVksTUFBTTtBQUNuQixlQUFXLFdBQVcsaUJBQWlCO0FBQ3JDLG9DQUNFLGdCQUFnQixTQUFTLEtBQUssU0FBUyxzQkFBc0IsS0FBSyxDQUFDLENBQ3JFO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQyxFQUFFO0FBQ0w7QUFiZSxBQWVmLDZCQUE2QixJQUEyQjtBQUN0RCxRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFFBQWUsc0NBQXNDLEVBQUUsSUFBSSxFQUFFLEdBQUcsQ0FBQztBQUN0RTtBQUplLEFBTWYsNEJBQTRCLEtBQTBCO0FBQ3BELFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsUUFDRDtBQUFBO0FBQUEsb0JBRWdCLElBQUksSUFBSSxNQUFNLEdBQUcsRUFBRSxLQUFLLElBQUk7QUFBQSxLQUU5QyxFQUFFLElBQUksR0FBRztBQUNYO0FBVFMsQUFXVCw4QkFBOEIsS0FBbUM7QUFDL0Qsc0NBQW1CLFlBQVksR0FBRyxLQUFLLGtCQUFrQjtBQUMzRDtBQUZlLEFBSWYsOEJBQThCLElBQThDO0FBQzFFLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFNBQU8sbUJBQW1CLElBQUksRUFBRTtBQUNsQztBQUhlLEFBS1IsNEJBQ0wsSUFDQSxJQUN5QjtBQUN6QixRQUFNLE1BQU0sR0FDVCxRQUFlLDJDQUEyQyxFQUMxRCxJQUFJO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQztBQUVILE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLDhCQUFhLElBQUksSUFBSTtBQUM5QjtBQWZnQixBQWlCaEIsK0JBQ0UsWUFDNkI7QUFDN0IsUUFBTSxLQUFLLFlBQVk7QUFFdkIsU0FBTyxvQ0FDTCxJQUNBLFlBQ0EsQ0FBQyxVQUE2QztBQUM1QyxVQUFNLFFBQVEsR0FBRyxRQUNmLDBDQUEwQyxNQUFNLE1BQU0sTUFBTSxFQUN6RCxLQUFLLEdBQUcsRUFDUixLQUFLLEdBQUcsS0FDYjtBQUNBLFVBQU0sT0FBaUIsTUFBTSxJQUFJLEtBQUs7QUFDdEMsV0FBTyxLQUFLLElBQUksU0FBTyw4QkFBYSxJQUFJLElBQUksQ0FBQztBQUFBLEVBQy9DLENBQ0Y7QUFDRjtBQWxCZSxBQW9CZixpQ0FBOEQ7QUFDNUQsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFpQixHQUNwQixRQUFvQiw0Q0FBNEMsRUFDaEUsSUFBSTtBQUVQLFNBQU8sS0FBSyxJQUFJLFNBQU8sOEJBQWEsSUFBSSxJQUFJLENBQUM7QUFDL0M7QUFQZSxBQVFmLG9DQUFtRDtBQUNqRCxRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQW9CLHVCQUF1QixFQUFFLElBQUk7QUFDdEQ7QUFIZSxBQUtmLGtDQUEwRDtBQUN4RCxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQThCLEdBQ2pDLFFBQW9CLDBDQUEwQyxFQUM5RCxJQUFJO0FBRVAsU0FBTyxLQUFLLElBQUksU0FBTyxJQUFJLEVBQUU7QUFDL0I7QUFQZSxBQVNmLGtDQUFrQztBQUFBLEVBQ2hDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FNbUM7QUFDbkMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFpQixRQUNyQixJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBT0YsRUFBRSxJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksS0FBSyxTQUFTLEdBQUc7QUFDbkIsUUFBSSxLQUFLLHVEQUF1RDtBQUFBLE1BQzlEO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQUksS0FBSyxTQUFTLEdBQUc7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPLDhCQUFhLEtBQUssR0FBRyxJQUFJO0FBQ2xDO0FBMUNlLEFBNENSLDJCQUNMLFNBQ0EsU0FDUTtBQUNSLE1BQUksQ0FBQyxXQUFXLFlBQVksUUFBVztBQUdyQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQVhnQixBQWFoQixrREFBa0Q7QUFBQSxFQUNoRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQW9CQTtBQUNBLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFNBQU8sR0FBRyxZQUFZLE1BQU07QUFDMUIsVUFBTSwyQkFBMkIsS0FBSyxJQUFJLEtBQUssSUFBSSxHQUFHLFVBQVUsUUFBUTtBQUN4RSxPQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLFdBUUssa0JBQWtCLFNBQVMsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVV6QyxFQUFFLElBQUk7QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0EsV0FBVyxLQUFLLFVBQVUsRUFBRSx5QkFBeUIsQ0FBQztBQUFBLE1BQ3REO0FBQUEsTUFDQSxTQUFTLFdBQVc7QUFBQSxJQUN0QixDQUFDO0FBRUQsVUFBTSxPQUFPLEdBQ1YsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUlpQixvQ0FBVztBQUFBO0FBQUEsYUFFdkIsa0JBQWtCLFNBQVMsT0FBTztBQUFBO0FBQUE7QUFBQSxTQUl6QyxFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUyxXQUFXO0FBQUEsSUFDdEIsQ0FBQztBQUVILE9BQUcsUUFDRDtBQUFBO0FBQUE7QUFBQSx5QkFHbUIsb0NBQVc7QUFBQSx5QkFDWCxvQ0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBLHlCQUlYLG9DQUFXO0FBQUE7QUFBQSxhQUV2QixrQkFBa0IsU0FBUyxPQUFPO0FBQUE7QUFBQSxTQUczQyxFQUFFLElBQUk7QUFBQSxNQUNKO0FBQUEsTUFDQSxXQUFXLEtBQUssVUFBVTtBQUFBLFFBQ3hCLFlBQVksb0NBQVc7QUFBQSxRQUN2QixZQUFZLG9DQUFXO0FBQUEsTUFDekIsQ0FBQztBQUFBLE1BQ0Q7QUFBQSxNQUNBLFNBQVMsV0FBVztBQUFBLElBQ3RCLENBQUM7QUFFRCxXQUFPLEtBQUssSUFBSSxTQUFPO0FBQ3JCLFlBQU0sT0FBTyw4QkFBMEIsSUFBSSxJQUFJO0FBQy9DLGFBQU87QUFBQSxRQUNMLG9CQUFvQixLQUFLO0FBQUEsUUFDekIsWUFBWSxvQ0FBVztBQUFBLFFBQ3ZCLFlBQVksb0NBQVc7QUFBQSxXQUNwQix3QkFBSyxNQUFNO0FBQUEsVUFDWjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsQ0FBQyxFQUFFO0FBQ0w7QUFwSGUsQUEwSGYsNkNBQTZDO0FBQUEsRUFDM0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBS3FDO0FBQ3JDLFFBQU0sS0FBSyxZQUFZO0FBRXZCLFNBQU8sR0FBRyxZQUFZLE1BQU07QUFDMUIsVUFBTSxpQkFBNEMsR0FDL0MsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BV0YsRUFDQyxJQUFJO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxNQUNBLFNBQVMsV0FBVztBQUFBLElBQ3RCLENBQUM7QUFFSCxVQUFNLGNBQWMsZUFBZSxJQUFJLFVBQVEsS0FBSyxLQUFLO0FBQ3pELHdDQUFtQixJQUFJLGFBQWEsQ0FBQyxRQUE2QjtBQUNoRSxTQUFHLFFBQ0Q7QUFBQTtBQUFBLHNDQUU4QixJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsS0FBSyxJQUFJO0FBQUEsU0FFNUQsRUFBRSxJQUFJLEdBQUc7QUFBQSxJQUNYLENBQUM7QUFFRCxXQUFPO0FBQUEsRUFDVCxDQUFDLEVBQUU7QUFDTDtBQTVDZSxBQThDZixrQ0FDRSxrQkFDQSxpQkFDbUM7QUFDbkMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsU0FBTyxHQUFHLFlBQVksTUFBTTtBQUMxQixVQUFNLGVBQWUsR0FDbEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxTQVVGLEVBQ0MsSUFBSTtBQUFBLE1BQ0g7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUgsT0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQU1GLEVBQUUsSUFBSTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsV0FBTztBQUFBLEVBQ1QsQ0FBQyxFQUFFO0FBQ0w7QUF0Q2UsQUF3Q2YsMkJBQTJCO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUM4QjtBQUM5QixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLEdBQ0gsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQW1CRixFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxRQUFRO0FBQUEsRUFDVixDQUFDO0FBQ0w7QUExQ2UsQUE0Q2YsOENBQThDO0FBQUEsRUFDNUM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQU1nQjtBQUNoQixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLEdBQ0gsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLDBDQUtGLEVBQ0MsSUFBSTtBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDTDtBQTFCZSxBQTRCZixrQ0FBZ0U7QUFDOUQsUUFBTSxLQUFLLFlBQVk7QUFDdkIsU0FBTyxHQUFHLFFBQW9CLDBCQUEwQixFQUFFLElBQUk7QUFDaEU7QUFIZSxBQUlmLHFDQUFvRDtBQUNsRCxRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQW9CLHdCQUF3QixFQUFFLElBQUk7QUFDdkQ7QUFIZSxBQUtmLDhDQUNFLGdCQUNBLFNBUXVDO0FBQ3ZDLFNBQU8sbUNBQW1DLGdCQUFnQixPQUFPO0FBQ25FO0FBWmUsQUFhZiw0Q0FDRSxnQkFDQTtBQUFBLEVBQ0U7QUFBQSxFQUNBLFFBQVE7QUFBQSxFQUNSO0FBQUEsRUFDQSxhQUFhLE9BQU87QUFBQSxFQUNwQixTQUFTLE9BQU87QUFBQSxFQUNoQjtBQUFBLEdBUzRCO0FBQzlCLFFBQU0sS0FBSyxZQUFZO0FBRXZCLFNBQU8sR0FDSixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUtLLGtCQUFrQixTQUFTLE9BQU87QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVF6QyxFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLElBQ0EsV0FBVyxhQUFhO0FBQUEsSUFDeEIsYUFBYTtBQUFBLElBQ2IsU0FBUztBQUFBLElBQ1QsU0FBUyxXQUFXO0FBQUEsRUFDdEIsQ0FBQyxFQUNBLFFBQVE7QUFDYjtBQTdDUyxBQStDVCwrQkFBK0I7QUFBQSxFQUM3QjtBQUFBLEVBQ0EsUUFBUTtBQUFBLEVBQ1IsYUFBYSxPQUFPO0FBQUEsRUFDcEI7QUFBQSxFQUNBO0FBQUEsR0FPOEI7QUFDOUIsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFpQixHQUNwQixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BYUYsRUFDQyxJQUFJO0FBQUEsSUFDSCxnQkFBZ0Isa0JBQWtCO0FBQUEsSUFDbEM7QUFBQSxJQUNBLFFBQVEsVUFBVTtBQUFBLElBQ2xCLFlBQVksY0FBYztBQUFBLElBQzFCO0FBQUEsRUFDRixDQUFDO0FBRUgsU0FBTyxLQUFLLElBQUksU0FBTyw4QkFBYSxJQUFJLElBQUksQ0FBQztBQUMvQztBQXZDZSxBQXlDZiw4Q0FDRSxnQkFDQSxTQU91QztBQUN2QyxTQUFPLG1DQUFtQyxnQkFBZ0IsT0FBTztBQUNuRTtBQVhlLEFBWWYsNENBQ0UsZ0JBQ0E7QUFBQSxFQUNFO0FBQUEsRUFDQSxRQUFRO0FBQUEsRUFDUixhQUFhO0FBQUEsRUFDYixTQUFTO0FBQUEsRUFDVDtBQUFBLEdBUTRCO0FBQzlCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sT0FBaUIsR0FDcEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSUssa0JBQWtCLFNBQVMsT0FBTztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BUXpDLEVBQ0MsSUFBSTtBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYixTQUFTO0FBQUEsSUFDVCxTQUFTLFdBQVc7QUFBQSxFQUN0QixDQUFDO0FBRUgsU0FBTztBQUNUO0FBekNTLEFBMENULHlDQUNFLGdCQUNBLFNBQ0EsU0FDZ0M7QUFDaEMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBSUssa0JBQWtCLFNBQVMsT0FBTztBQUFBO0FBQUE7QUFBQSxPQUl6QyxFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTLFdBQVc7QUFBQSxFQUN0QixDQUFDO0FBRUgsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQTNCUyxBQTRCVCx5Q0FDRSxnQkFDQSxTQUNBLFNBQ2dDO0FBQ2hDLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sTUFBTSxHQUNULFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQSxXQUlLLGtCQUFrQixTQUFTLE9BQU87QUFBQTtBQUFBO0FBQUEsT0FJekMsRUFDQyxJQUFJO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxXQUFXO0FBQUEsRUFDdEIsQ0FBQztBQUVILE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7QUEzQlMsQUE2QlQscUNBQXFDO0FBQUEsRUFDbkM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBSzBCO0FBQzFCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sTUFBTSxRQUNWLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNTSxVQUFVLHdCQUF3QjtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BSzFDLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sOEJBQWEsSUFBSSxJQUFJO0FBQzlCO0FBakNTLEFBa0NULG9DQUFvQztBQUFBLEVBQ2xDO0FBQUEsRUFDQTtBQUFBLEdBSTBCO0FBQzFCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sTUFBTSxRQUNWLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsVUFNTSxVQUFVLHdCQUF3QjtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTMUMsRUFBRSxJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0EsS0FBSyxLQUFLLElBQUk7QUFBQSxFQUNoQixDQUFDO0FBRUQsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sOEJBQWEsSUFBSSxJQUFJO0FBQzlCO0FBbkNTLEFBcUNULDJDQUEyQztBQUFBLEVBQ3pDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUt3QztBQUN4QyxRQUFNLEtBQUssWUFBWTtBQUV2QixTQUFPLEdBQUcsWUFBWSxNQUFNO0FBQzFCLFdBQU87QUFBQSxNQUNMLFVBQVUsNEJBQTRCO0FBQUEsUUFDcEM7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsU0FBUywyQkFBMkIsRUFBRSxnQkFBZ0IsUUFBUSxDQUFDO0FBQUEsTUFDL0QsMEJBQTBCLHlCQUF5QixjQUFjO0FBQUEsSUFDbkU7QUFBQSxFQUNGLENBQUMsRUFBRTtBQUNMO0FBdEJlLEFBd0JmLDBDQUEwQztBQUFBLEVBQ3hDO0FBQUEsR0FHbUM7QUFDbkMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FNRixFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsRUFDRixDQUFDO0FBRUgsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sOEJBQWEsSUFBSSxJQUFJO0FBQzlCO0FBeEJlLEFBMEJmLCtDQUNFLGdCQUNBLFNBQ0EsU0FDZ0M7QUFDaEMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFDQztBQUFBO0FBQUE7QUFBQSx1QkFHaUIsb0NBQVc7QUFBQTtBQUFBLFdBRXZCLGtCQUFrQixTQUFTLE9BQU87QUFBQTtBQUFBO0FBQUEsT0FJekMsRUFDQyxJQUFJO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxXQUFXO0FBQUEsRUFDdEIsQ0FBQztBQUVILE1BQUksQ0FBQyxLQUFLO0FBQ1IsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7QUE1QlMsQUE4QlQsNkNBQ0UsZ0JBQ0EsU0FJaUI7QUFDakIsU0FBTyxrQ0FBa0MsZ0JBQWdCLE9BQU87QUFDbEU7QUFSZSxBQVNmLDJDQUNFLGdCQUNBO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxHQUtNO0FBQ1IsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsdUJBS2lCLG9DQUFXO0FBQUE7QUFBQSxXQUV2QixrQkFBa0IsU0FBUyxPQUFPO0FBQUEsT0FFekMsRUFDQyxJQUFJO0FBQUEsSUFDSDtBQUFBLElBQ0EsU0FBUyxXQUFXO0FBQUEsRUFDdEIsQ0FBQztBQUVILE1BQUksQ0FBQyxLQUFLO0FBQ1IsVUFBTSxJQUFJLE1BQU0sb0RBQW9EO0FBQUEsRUFDdEU7QUFFQSxTQUFPLElBQUk7QUFDYjtBQWpDUyxBQWtDVCwyQ0FDRSxnQkFDQSxTQUNBLFNBQ1E7QUFDUixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE1BQU0sR0FDVCxRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx1QkFLaUIsb0NBQVc7QUFBQTtBQUFBLFdBRXZCLGtCQUFrQixTQUFTLE9BQU87QUFBQSxPQUV6QyxFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQSxTQUFTLFdBQVc7QUFBQSxFQUN0QixDQUFDO0FBRUgsTUFBSSxDQUFDLEtBQUs7QUFDUixVQUFNLElBQUksTUFBTSx3REFBd0Q7QUFBQSxFQUMxRTtBQUVBLFNBQU8sSUFBSTtBQUNiO0FBNUJTLEFBOEJULGdEQUNFLGdCQUNBLFNBQ0EsU0FDa0M7QUFDbEMsU0FBTyxxQ0FBcUMsZ0JBQWdCLFNBQVMsT0FBTztBQUM5RTtBQU5lLEFBT2YsOENBQ0UsZ0JBQ0EsU0FDQSxTQUN5QjtBQUN6QixRQUFNLFNBQVMsZ0NBQ2IsZ0JBQ0EsU0FDQSxPQUNGO0FBQ0EsUUFBTSxTQUFTLGdDQUNiLGdCQUNBLFNBQ0EsT0FDRjtBQUNBLFFBQU0sZUFBZSxzQ0FDbkIsZ0JBQ0EsU0FDQSxPQUNGO0FBQ0EsUUFBTSxjQUFjLGtDQUNsQixnQkFDQSxTQUNBLE9BQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTCxRQUFRLFNBQVMsd0JBQUssUUFBUSxDQUFDLGVBQWUsV0FBVyxJQUFJLENBQUMsSUFBSTtBQUFBLElBQ2xFLFFBQVEsU0FBUyx3QkFBSyxRQUFRLENBQUMsZUFBZSxXQUFXLElBQUksQ0FBQyxJQUFJO0FBQUEsSUFDbEUsY0FBYyxlQUNWLHdCQUFLLGNBQWMsQ0FBQyxlQUFlLFdBQVcsSUFBSSxDQUFDLElBQ25EO0FBQUEsSUFDSjtBQUFBLEVBQ0Y7QUFDRjtBQWxDUyxBQW9DVCxxREFBcUQ7QUFBQSxFQUNuRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBYUM7QUFDRCxRQUFNLEtBQUssWUFBWTtBQUV2QixTQUFPLEdBQUcsWUFBWSxNQUFNO0FBQzFCLFdBQU87QUFBQSxNQUNMLE9BQU8sbUNBQW1DLGdCQUFnQjtBQUFBLFFBQ3hEO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFBQSxNQUNELE9BQU8sbUNBQW1DLGdCQUFnQjtBQUFBLFFBQ3hEO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQztBQUFBLE1BQ0QsU0FBUyxxQ0FDUCxnQkFDQSxTQUNBLE9BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQS9DZSxBQWlEZiwwQ0FDRSxnQkFDQSxPQUNrQjtBQUNsQixRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLE1BQTBDLEdBQzdDLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVFGLEVBQ0MsSUFBSTtBQUFBLElBQ0g7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUgsTUFBSSxLQUFLO0FBQ1AsV0FBTyxRQUFRLElBQUksV0FBVztBQUFBLEVBQ2hDO0FBQ0EsU0FBTztBQUNUO0FBMUJlLEFBNEJmLDJDQUNFLFlBQ0EsV0FDZTtBQUNmLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FNRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBakJlLEFBbUJmLG1DQUNFLFFBQzZCO0FBQzdCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sT0FBaUIsR0FDcEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS0YsRUFDQyxJQUFJO0FBQUEsSUFDSCxTQUFTO0FBQUEsRUFDWCxDQUFDO0FBRUgsU0FBTyxLQUFLLElBQUksU0FBTyw4QkFBYSxJQUFJLElBQUksQ0FBQztBQUMvQztBQWpCZSxBQW1CZixvQ0FBaUU7QUFDL0QsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEtBQUssSUFBSTtBQUVyQixRQUFNLE9BQWlCLEdBQ3BCLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BTUYsRUFDQyxJQUFJLEVBQUUsSUFBSSxDQUFDO0FBRWQsU0FBTyxLQUFLLElBQUksU0FBTyw4QkFBYSxJQUFJLElBQUksQ0FBQztBQUMvQztBQWhCZSxBQWtCZix3RUFFRTtBQUNBLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sT0FBaUIsR0FDcEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSwyQkFTcUIsb0NBQVc7QUFBQSwyQkFDWCxvQ0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS2xDLEVBQ0MsSUFBSTtBQUVQLFNBQU8sS0FBSyxJQUFJLFNBQU8sOEJBQWEsSUFBSSxJQUFJLENBQUM7QUFDL0M7QUF6QmUsQUEyQmYseUNBQXNFO0FBQ3BFLFFBQU0sS0FBSyxZQUFZO0FBR3ZCLFFBQU0sU0FBd0IsR0FDM0IsUUFDQztBQUFBO0FBQUE7QUFBQSxPQUlGLEVBQ0MsTUFBTSxJQUFJLEVBQ1YsSUFBSTtBQUVQLFNBQU8sVUFBVTtBQUNuQjtBQWZlLEFBaUJmLDBEQUVFO0FBQ0EsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BUUYsRUFDQyxJQUFJO0FBRVAsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sT0FBTyw4QkFBMEIsSUFBSSxJQUFJO0FBQy9DLFFBQU0sU0FBUyxLQUFLLGtCQUFrQixLQUFLO0FBQzNDLFNBQU8sMENBQWUsTUFBTSxJQUFJLFNBQVM7QUFDM0M7QUF4QmUsQUEwQmYsa0RBQStFO0FBQzdFLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sa0JBQWtCLEtBQUssSUFBSSxJQUFJLEtBQUssS0FBSyxLQUFLLEtBQUs7QUFFekQsUUFBTSxPQUFpQixHQUNwQixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQVNGLEVBQ0MsSUFBSTtBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUM7QUFFSCxTQUFPLEtBQUssSUFBSSxTQUFPLDhCQUFhLElBQUksSUFBSSxDQUFDO0FBQy9DO0FBckJlLEFBdUJmLE1BQU0sMkJBQTJCO0FBRWpDLDZCQUE2QixNQUErQjtBQUMxRCxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUNKLE1BQUksQ0FBQyxJQUFJO0FBQ1AsVUFBTSxJQUFJLE1BQU0sb0NBQW9DO0FBQUEsRUFDdEQ7QUFFQSxNQUFJLFlBQVksMEJBQTBCO0FBQ3hDLDBCQUFzQixFQUFFO0FBQ3hCLFdBQU87QUFBQSxFQUNUO0FBRUEsVUFDRSxJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0E2QkYsRUFBRSxJQUFJO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBLG1CQUFtQixxQkFBcUI7QUFBQSxJQUN4QztBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVUsWUFBWTtBQUFBLElBQ3RCLFFBQVEsVUFBVTtBQUFBLElBQ2xCLFlBQVksY0FBYztBQUFBLElBQzFCLGNBQWMsZ0JBQWdCO0FBQUEsSUFDOUIsWUFBWSxjQUFjO0FBQUEsSUFDMUIsaUJBQWlCLG1CQUFtQjtBQUFBLElBQ3BDLFdBQVcsYUFBYTtBQUFBLEVBQzFCLENBQUM7QUFFRCxTQUFPO0FBQ1Q7QUF4RVMsQUEwRVQsdUNBQ0UsSUFDQSxNQUNNO0FBQ04sUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFFSixVQUNFLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FVRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQSxRQUFRLFVBQVU7QUFBQSxJQUNsQixZQUFZLGNBQWM7QUFBQSxJQUMxQixjQUFjLGdCQUFnQjtBQUFBLElBQzlCLFlBQVksY0FBYztBQUFBLElBQzFCLGlCQUFpQixtQkFBbUI7QUFBQSxJQUNwQyxXQUFXLGFBQWE7QUFBQSxFQUMxQixDQUFDO0FBQ0g7QUFuQ1MsQUFxQ1QseUNBQ0UsSUFDQSxNQUNlO0FBQ2YsU0FBTyw4QkFBOEIsSUFBSSxJQUFJO0FBQy9DO0FBTGUsQUFPZiwwQ0FDRSxvQkFDZTtBQUNmLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsWUFBWSxNQUFNO0FBQ25CLGVBQVcsRUFBRSxJQUFJLFVBQVUsb0JBQW9CO0FBQzdDLG9DQUFXLDhCQUE4QixJQUFJLElBQUksQ0FBQztBQUFBLElBQ3BEO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQVZlLEFBWWYsa0NBQ0UsSUFDc0M7QUFDdEMsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxNQUFNLEdBQ1QsUUFBZSwyQ0FBMkMsRUFDMUQsSUFBSTtBQUFBLElBQ0g7QUFBQSxFQUNGLENBQUM7QUFFSCxTQUFPO0FBQ1Q7QUFYZSxBQWFmLHFDQUFzRDtBQUNwRCxTQUFPLG1DQUFrQixZQUFZLEdBQUcsYUFBYTtBQUN2RDtBQUZlLEFBSWYsdURBRUU7QUFDQSxRQUFNLEtBQUssWUFBWTtBQUV2QixTQUFPLEdBQUcsWUFBWSxNQUFNO0FBQzFCLFVBQU0sRUFBRSxTQUFTLHNCQUFzQixHQUNwQyxRQUFlLHFEQUFxRCxFQUNwRSxJQUFJO0FBQUEsTUFDSCxVQUFVLEtBQUssSUFBSSxJQUFJLFVBQVU7QUFBQSxJQUNuQyxDQUFDO0FBRUgsUUFBSSxzQkFBc0IsR0FBRztBQUMzQixhQUFPLEtBQ0wsbURBQ2MsNkNBQ2hCO0FBQUEsSUFDRjtBQUVBLE9BQUcsUUFDRDtBQUFBO0FBQUE7QUFBQSxPQUlGLEVBQUUsSUFBSTtBQUVOLFVBQU0sRUFBRSxTQUFTLHdCQUF3QixHQUN0QyxRQUNDO0FBQUE7QUFBQTtBQUFBLFNBSUYsRUFDQyxJQUFJLEVBQUUseUJBQXlCLENBQUM7QUFFbkMsUUFBSSx3QkFBd0IsR0FBRztBQUM3QixhQUFPLEtBQ0wsbURBQ2MsbURBQ2hCO0FBQUEsSUFDRjtBQUVBLFdBQU8sR0FDSixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FLRixFQUNDLElBQUk7QUFBQSxFQUNULENBQUMsRUFBRTtBQUNMO0FBcERlLEFBc0RmLGdDQUFnQyxLQUEwQjtBQUN4RCxRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBLG9CQUVnQixJQUFJLElBQUksTUFBTSxHQUFHLEVBQUUsS0FBSyxJQUFJO0FBQUEsS0FFOUMsRUFBRSxJQUFJLEdBQUc7QUFDWDtBQVRTLEFBV1QsK0JBQStCLElBQWtDO0FBQy9ELFFBQU0sS0FBSyxZQUFZO0FBRXZCLE1BQUksQ0FBQyxNQUFNLFFBQVEsRUFBRSxHQUFHO0FBQ3RCLFlBQVEsSUFBSSx5Q0FBeUMsRUFBRSxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBRWpFO0FBQUEsRUFDRjtBQUlBLE1BQUksQ0FBQyxHQUFHLFFBQVE7QUFDZDtBQUFBLEVBQ0Y7QUFFQSxnQ0FBVyxvQ0FBbUIsSUFBSSxJQUFJLHNCQUFzQixDQUFDO0FBQy9EO0FBaEJTLEFBa0JULGlDQUFpQyxJQUEyQztBQUMxRSx3QkFBc0IsRUFBRTtBQUMxQjtBQUZlLEFBSWYsc0NBQXFEO0FBQ25ELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLEtBQUcsUUFBb0IsMEJBQTBCLEVBQUUsSUFBSTtBQUN6RDtBQUhlLEFBT2YsTUFBTSw2QkFBNkI7QUFDbkMsNENBQ0UsSUFDZ0Q7QUFDaEQsU0FBTyx5QkFBUSxZQUFZLEdBQUcsNEJBQTRCLEVBQUU7QUFDOUQ7QUFKZSxBQUtmLDZDQUNFLE9BQ0EsVUFBa0MsQ0FBQyxHQUNRO0FBQzNDLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sWUFDSixXQUFXLFFBQVEsWUFBWSxRQUFRLFlBQVksS0FBSyxJQUFJO0FBRTlELFFBQU0sT0FBaUIsR0FDcEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQU9GLEVBQ0MsSUFBSTtBQUFBLElBQ0gsT0FBTyxTQUFTO0FBQUEsSUFDaEI7QUFBQSxFQUNGLENBQUM7QUFFSCxTQUFPLEtBQUssSUFBSSxTQUFPLDhCQUFhLElBQUksSUFBSSxDQUFDO0FBQy9DO0FBeEJlLEFBeUJmLHlDQUNFLEtBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLEVBQUUsSUFBSSxTQUFTLGNBQWM7QUFDbkMsTUFBSSxDQUFDLElBQUk7QUFDUCxVQUFNLElBQUksTUFDUixrRUFDRjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FhRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLE1BQU0sOEJBQWEsR0FBRztBQUFBLEVBQ3hCLENBQUM7QUFDSDtBQS9CZSxBQWdDZiwrQ0FDRSxJQUNBLFNBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtGLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBLFNBQVMsVUFBVSxJQUFJO0FBQUEsRUFDekIsQ0FBQztBQUNIO0FBZmUsQUFnQmYsZ0RBQStEO0FBQzdELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLEtBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBS0YsRUFBRSxJQUFJO0FBQ1I7QUFUZSxBQVVmLDJDQUEyQyxJQUEyQjtBQUNwRSxTQUFPLDRCQUFXLFlBQVksR0FBRyw0QkFBNEIsRUFBRTtBQUNqRTtBQUZlLEFBR2YsaURBQWdFO0FBQzlELFNBQU8sb0NBQW1CLFlBQVksR0FBRywwQkFBMEI7QUFDckU7QUFGZSxBQU1mLHlDQUF5QyxNQUFzQztBQUM3RSxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUNKLE1BQUksQ0FBQyxJQUFJO0FBQ1AsVUFBTSxJQUFJLE1BQ1IsbUVBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPLEdBQ1YsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLE9BS0YsRUFDQyxJQUFJLEVBQUUsR0FBRyxDQUFDO0FBQ2IsUUFBTSxVQUFVO0FBQUEsSUFDZCxpQkFBaUIsbUJBQW1CO0FBQUEsSUFDcEM7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXLGFBQWEsS0FBSyxJQUFJO0FBQUEsSUFDakMsa0JBQWtCLG9CQUFvQjtBQUFBLElBQ3RDO0FBQUEsSUFDQSxhQUFhLGVBQWU7QUFBQSxJQUM1QjtBQUFBLElBQ0EsVUFBVSxZQUFZO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFFBQVEsS0FBSyxRQUFRO0FBQ3ZCLE9BQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FlRixFQUFFLElBQUksT0FBTztBQUViO0FBQUEsRUFDRjtBQUVBLEtBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBNkJGLEVBQUUsSUFBSSxPQUFPO0FBQ2Y7QUFuR2UsQUFvR2YsdUNBQ0UsSUFDQSxRQUNBLFNBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLFlBQVksVUFBVSxRQUFRLGFBQWEsS0FBSyxJQUFJLElBQUksS0FBSyxJQUFJO0FBQ3ZFLFFBQU0sY0FBYyxXQUFXLGNBQWMsWUFBWTtBQUV6RCxLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtGLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBcEJlLEFBcUJmLGtEQUFpRTtBQUMvRCxRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtGLEVBQUUsSUFBSTtBQUNSO0FBVmUsQUFXZixxQ0FBcUMsU0FBcUM7QUFDeEUsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxFQUFFLE9BQU8sUUFBUSxJQUFJLGFBQWEsVUFBVSxRQUFRLE1BQU0sVUFDOUQ7QUFFRixNQUFJLENBQUMsNEJBQVMsRUFBRSxHQUFHO0FBQ2pCLFVBQU0sSUFBSSxNQUNSLGdFQUNGO0FBQUEsRUFDRjtBQUNBLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQ1IsK0RBQ0Y7QUFBQSxFQUNGO0FBRUEsS0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQXFCRixFQUFFLElBQUk7QUFBQSxJQUNKLE9BQU8sU0FBUztBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLElBQ0EsYUFBYSxjQUFjLElBQUk7QUFBQSxJQUMvQixVQUFVLFlBQVk7QUFBQSxJQUN0QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFoRGUsQUFpRGYscUNBQ0UsUUFDQSxXQUNBLFVBQ2U7QUFDZixRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQUtGLEVBQUUsSUFBSTtBQUFBLElBQ0osSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBQ0QsS0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FLRixFQUFFLElBQUk7QUFBQSxJQUNKLElBQUk7QUFBQSxJQUNKO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUEzQmUsQUE0QmYsdUNBQ0UsV0FDQSxRQUNlO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksTUFDUix3RUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsUUFBUTtBQUNYLFVBQU0sSUFBSSxNQUNSLHFFQUNGO0FBQUEsRUFDRjtBQUVBLEtBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FTRixFQUFFLElBQUk7QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBL0JlLEFBZ0NmLDBDQUNFLFdBQ0EsUUFDNEM7QUFDNUMsUUFBTSxLQUFLLFlBQVk7QUFFdkIsTUFBSSxDQUFDLFdBQVc7QUFDZCxVQUFNLElBQUksTUFDUix3RUFDRjtBQUFBLEVBQ0Y7QUFDQSxNQUFJLENBQUMsUUFBUTtBQUNYLFVBQU0sSUFBSSxNQUNSLHFFQUNGO0FBQUEsRUFDRjtBQUVBLFNBQU8sR0FDSixZQUFZLE1BQU07QUFZakIsT0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBLFNBSUYsRUFBRSxJQUFJO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLFdBQVcsR0FDZCxRQUNDO0FBQUE7QUFBQTtBQUFBLFdBSUYsRUFDQyxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBQ2pCLFFBQUksQ0FBQyxVQUFVO0FBQ2IsWUFBTSxJQUFJLE1BQ1IsK0RBQ0Y7QUFBQSxJQUNGO0FBQ0EsVUFBTSxRQUFRLFNBQVM7QUFDdkIsUUFBSSxRQUFRLEdBQUc7QUFDYixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sVUFBNkMsR0FDaEQsUUFDQztBQUFBO0FBQUE7QUFBQSxXQUlGLEVBQ0MsSUFBSSxFQUFFLE9BQU8sQ0FBQztBQUNqQixRQUFJLENBQUMsU0FBUztBQUNaLGFBQU8sS0FBSywwREFBMEQ7QUFDdEUsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLEVBQUUsV0FBVztBQUVuQixRQUFJLFdBQVcsYUFBYTtBQUMxQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sa0JBQTJDLEdBQzlDLFFBQ0M7QUFBQTtBQUFBO0FBQUEsV0FJRixFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQ0gsT0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBLFNBSUYsRUFBRSxJQUFJO0FBQUEsTUFDSjtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQVEsb0JBQW1CLENBQUMsR0FBRyxJQUFJLFNBQU8sSUFBSSxJQUFJO0FBQUEsRUFDcEQsQ0FBQyxFQUNBLFVBQVU7QUFDZjtBQWxHZSxBQW9HZixpQ0FBaUMsUUFBd0M7QUFDdkUsUUFBTSxLQUFLLFlBQVk7QUFFdkIsTUFBSSxDQUFDLFFBQVE7QUFDWCxVQUFNLElBQUksTUFDUiwrREFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLEdBQ0osWUFBWSxNQUFNO0FBU2pCLFVBQU0sa0JBQTJDLEdBQzlDLFFBQ0M7QUFBQTtBQUFBO0FBQUEsV0FJRixFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBQ0gsT0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBLFNBSUYsRUFBRSxJQUFJLEVBQUUsT0FBTyxDQUFDO0FBRWhCLFdBQVEsb0JBQW1CLENBQUMsR0FBRyxJQUFJLFNBQU8sSUFBSSxJQUFJO0FBQUEsRUFDcEQsQ0FBQyxFQUNBLFVBQVU7QUFDZjtBQXZDZSxBQXlDZixpQ0FBa0Q7QUFDaEQsU0FBTyxtQ0FBa0IsWUFBWSxHQUFHLFVBQVU7QUFDcEQ7QUFGZSxBQUdmLG9DQUFxRTtBQUNuRSxRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLE9BQU8sR0FDVixRQUNDO0FBQUE7QUFBQTtBQUFBLE9BSUYsRUFDQyxJQUFJO0FBRVAsU0FBTyxRQUFRLENBQUM7QUFDbEI7QUFiZSxBQWNmLGdDQUE2RDtBQUMzRCxRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLE9BQU8sR0FDVixRQUNDO0FBQUE7QUFBQTtBQUFBLE9BSUYsRUFDQyxJQUFJO0FBRVAsU0FBUSxTQUFRLENBQUMsR0FBRyxJQUFJLFNBQU8sYUFBYSxHQUFHLENBQUM7QUFDbEQ7QUFiZSxBQWNmLGlDQUFpQyxFQUFFLFVBQThCLENBQUMsR0FFaEU7QUFDQSxRQUFNLEtBQUssWUFBWTtBQUd2QixRQUFNLE9BQU8sR0FDVixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BT0YsRUFDQyxJQUFJO0FBQUEsSUFDSCxPQUFPLFNBQVM7QUFBQSxFQUNsQixDQUFDO0FBRUgsU0FBUSxTQUFRLENBQUMsR0FBRyxJQUFJLFNBQU8sYUFBYSxHQUFHLENBQUM7QUFDbEQ7QUFyQmUsQUF3QmYsZ0NBQ0UsV0FDQSxXQUFtQixLQUFLLElBQUksR0FDYjtBQUNmLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsWUFBWSxNQUFNO0FBQ25CLFVBQU0sT0FBTyxHQUNWLFFBQ0M7QUFBQTtBQUFBO0FBQUEsU0FJRixFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDO0FBRUgsUUFBSSxNQUFNO0FBQ1IsU0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FLRixFQUFFLElBQUksRUFBRSxXQUFXLFNBQVMsQ0FBQztBQUFBLElBQy9CLE9BQU87QUFDTCxTQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUEsU0FJRixFQUFFLElBQUksRUFBRSxXQUFXLFNBQVMsQ0FBQztBQUFBLElBQy9CO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQW5DZSxBQXFDZiwrQkFBK0IsUUFBUSxJQUErQjtBQUNwRSxRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQU8sR0FDVixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxPQU1GLEVBQ0MsSUFBSSxFQUFFLE1BQU0sQ0FBQztBQUVoQixTQUFPLFFBQVEsQ0FBQztBQUNsQjtBQWRlLEFBZ0JmLDhCQUF5RDtBQUN2RCxRQUFNLEtBQUssWUFBWTtBQUV2QixRQUFNLENBQUMsV0FBVyxzQkFBc0IsR0FBRyxZQUFZLE1BQU07QUFBQSxJQUMzRCxHQUFHLFFBQW9CLHNCQUFzQixFQUFFLElBQUk7QUFBQSxJQUNuRCxHQUFHLFFBQW9CLCtCQUErQixFQUFFLElBQUk7QUFBQSxFQUM5RCxDQUFDLEVBQUU7QUFFSCxRQUFNLHFCQUFxQixvQkFBSSxJQUc3QjtBQUNGLGFBQVcscUJBQXFCLG9CQUFvQjtBQUNsRCxVQUFNLEVBQUUsU0FBUyxPQUFPLFdBQVcsS0FBSyxVQUFVO0FBQ2xELFVBQU0sY0FBYyxtQkFBbUIsSUFBSSxPQUFPLEtBQUssQ0FBQztBQUN4RCxnQkFBWSxTQUFTO0FBQUEsU0FDZixZQUFZLFVBQVUsQ0FBQztBQUFBLE9BQzFCLGlEQUFxQixLQUFLLElBQUk7QUFBQSxRQUM3QixXQUFXLDhCQUFTLFNBQVM7QUFBQSxRQUM3QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQ0EsdUJBQW1CLElBQUksU0FBUyxXQUFXO0FBQUEsRUFDN0M7QUFFQSxTQUFPLFVBQVUsSUFBSSxjQUFhO0FBQUEsSUFDaEMsSUFBSSxTQUFTO0FBQUEsSUFDYixVQUFVLDZDQUFtQixTQUFTLFFBQVE7QUFBQSxJQUM5QyxNQUFNLFNBQVM7QUFBQSxJQUNmLHFCQUFxQixTQUFTO0FBQUEsSUFDOUIsUUFBUyxvQkFBbUIsSUFBSSxTQUFTLEVBQUUsS0FBSyxDQUFDLEdBQUcsT0FBTyx3QkFBUTtBQUFBLEVBQ3JFLEVBQUU7QUFDSjtBQWhDZSxBQW1DZixvQ0FDRSxRQUNlO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsUUFBTSxjQUFjLFFBQ2xCLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FhRjtBQUNBLFFBQU0sd0JBQXdCLFFBQzVCLElBQ0EscUVBQ0Y7QUFDQSxRQUFNLHVCQUF1QixRQUMzQixJQUNBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQWVGO0FBRUEsS0FBRyxZQUFZLE1BQU07QUFDbkIsV0FBTyxRQUFRLFdBQVM7QUFDdEIsWUFBTSxFQUFFLElBQUksWUFBWTtBQUV4QixZQUFNLGdCQUFnQixvQkFBSSxJQUFvQjtBQUM5QyxpQkFBVyxFQUFFLEtBQUssZUFBZSxzQkFBc0IsSUFBSSxFQUFFLFFBQVEsQ0FBQyxHQUFHO0FBQ3ZFLFlBQUksV0FBVztBQUNiLHdCQUFjLElBQUksS0FBSyxTQUFTO0FBQUEsUUFDbEM7QUFBQSxNQUNGO0FBRUEsa0JBQVksSUFBSTtBQUFBLFFBQ2QsSUFBSTtBQUFBLFFBQ0osVUFBVSxNQUFNO0FBQUEsUUFDaEIsTUFBTSxNQUFNO0FBQUEsUUFDWixxQkFBcUIsTUFBTTtBQUFBLE1BQzdCLENBQUM7QUFFRCxpQkFBVyxDQUFDLE9BQU8sVUFBVSxNQUFNLE9BQU8sUUFBUSxHQUFHO0FBQ25ELG1CQUFXLENBQUMsT0FBTyxjQUFjLE9BQU8sUUFBUSxLQUFLLEdBQUc7QUFDdEQsK0JBQXFCLElBQUk7QUFBQSxZQUN2QjtBQUFBLFlBQ0EsV0FDRSxVQUFVLGFBQWEsY0FBYyxJQUFJLFVBQVUsR0FBRyxLQUFLO0FBQUEsWUFDN0Q7QUFBQSxZQUNBO0FBQUEsWUFDQSxLQUFLLFVBQVU7QUFBQSxVQUNqQixDQUFDO0FBQUEsUUFDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNILENBQUMsRUFBRTtBQUNMO0FBNUVlLEFBOEVmLHdDQUNFLEtBQ0EsV0FDZTtBQUNmLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFVBQ0UsSUFDQSxvRUFDRixFQUFFLElBQUksRUFBRSxLQUFLLFVBQVUsQ0FBQztBQUMxQjtBQVRlLEFBV2YsZ0RBQXNFO0FBQ3BFLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sYUFBYSxHQUNoQixRQUNDLG1FQUNGLEVBQ0MsTUFBTSxFQUNOLElBQUk7QUFDUCxTQUFPLElBQUksSUFBSSxVQUFVO0FBQzNCO0FBVGUsQUFpQmYsa0NBQ0UsY0FDdUI7QUFDdkIsU0FBTztBQUFBLE9BQ0Ysd0JBQUssY0FBYyxtQkFBbUI7QUFBQSxJQUN6QyxlQUFlLGFBQWEsb0JBQ3hCLEtBQUssTUFBTSxhQUFhLGlCQUFpQixJQUN6QztBQUFBLEVBQ047QUFDRjtBQVRTLEFBVVQsaUNBQ0UsT0FDOEI7QUFDOUIsU0FBTztBQUFBLE9BQ0Ysd0JBQUssT0FBTyxlQUFlO0FBQUEsSUFDOUIsbUJBQW1CLE1BQU0sZ0JBQ3JCLEtBQUssVUFBVSxNQUFNLGFBQWEsSUFDbEM7QUFBQSxFQUNOO0FBQ0Y7QUFUUyxBQVdULDJDQUVFO0FBQ0EsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxxQkFBcUIsR0FDeEIsUUFBb0IsbUNBQW1DLEVBQ3ZELElBQUk7QUFFUCxTQUFPLG1CQUFtQixJQUFJLHdCQUF3QjtBQUN4RDtBQVRlLEFBVWYsaURBRUU7QUFDQSxRQUFNLEtBQUssWUFBWTtBQUN2QixTQUFPLEdBQ0osUUFBb0IseUNBQXlDLEVBQzdELElBQUk7QUFDVDtBQVBlLEFBUWYsOENBQTZEO0FBQzNELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLEtBQUcsUUFBb0IsaUNBQWlDLEVBQUUsSUFBSTtBQUNoRTtBQUhlLEFBSWYsMENBQ0UsY0FDZTtBQUNmLFFBQU0sS0FBSyxZQUFZO0FBRXZCLEtBQUcsWUFBWSxNQUFNO0FBQ25CLFVBQU0sVUFBVSx3QkFBd0IsWUFBWTtBQUVwRCxZQUNFLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BZUYsRUFBRSxJQUFJLE9BQU87QUFFYixVQUFNLEVBQUUsSUFBSSxRQUFRLFlBQVk7QUFFaEMsVUFBTSx3QkFBd0IsUUFDNUIsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTRjtBQUVBLGVBQVcsUUFBUSxTQUFTO0FBQzFCLDRCQUFzQixJQUFJO0FBQUEsUUFDeEI7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0YsQ0FBQyxFQUFFO0FBQ0w7QUFqRGUsQUFrRGYscURBRUU7QUFDQSxRQUFNLG1CQUFtQixNQUFNLDBCQUEwQjtBQUN6RCxRQUFNLGFBQWEsTUFBTSxnQ0FBZ0M7QUFFekQsUUFBTSxXQUFXLDJCQUFRLFlBQVksWUFBVSxPQUFPLE1BQU07QUFFNUQsU0FBTyxpQkFBaUIsSUFBSSxVQUFTO0FBQUEsT0FDaEM7QUFBQSxJQUNILFNBQVUsVUFBUyxLQUFLLE9BQU8sQ0FBQyxHQUFHLElBQUksWUFBVSxPQUFPLElBQUk7QUFBQSxFQUM5RCxFQUFFO0FBQ0o7QUFaZSxBQWFmLCtDQUNFLElBQ3VEO0FBQ3ZELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sb0JBQW9CLFFBQ3hCLElBQ0Esa0RBQ0YsRUFBRSxJQUFJO0FBQUEsSUFDSjtBQUFBLEVBQ0YsQ0FBQztBQUVELE1BQUksQ0FBQyxtQkFBbUI7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFVBQVUsUUFDZCxJQUNBLDREQUNGLEVBQUUsSUFBSTtBQUFBLElBQ0o7QUFBQSxFQUNGLENBQUM7QUFFRCxTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0gsU0FBUyxRQUFRLElBQUksQ0FBQyxFQUFFLFdBQVcsSUFBSTtBQUFBLEVBQ3pDO0FBQ0Y7QUExQmUsQUEyQmYsdUNBQ0UsY0FDZTtBQUNmLFFBQU0sVUFBVSx3QkFBd0IsWUFBWTtBQUNwRCxRQUFNLEtBQUssWUFBWTtBQUN2QixVQUNFLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBU0YsRUFBRSxJQUFJLE9BQU87QUFDZjtBQWpCZSxBQWtCZiw4Q0FDRSxRQUNBO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxHQUVhO0FBQ2YsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxZQUFZLE1BQU07QUFDbkIsVUFBTSx3QkFBd0IsUUFDNUIsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTRjtBQUVBLGVBQVcsUUFBUSxPQUFPO0FBQ3hCLDRCQUFzQixJQUFJO0FBQUEsUUFDeEI7QUFBQSxRQUNBO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLHdDQUFtQixJQUFJLFVBQVUsQ0FBQyxVQUFpQztBQUNqRSxTQUFHLFFBQ0Q7QUFBQTtBQUFBLHlDQUVpQyxNQUFNLElBQUksTUFBTSxHQUFHLEVBQUUsS0FBSyxJQUFJO0FBQUEsU0FFakUsRUFBRSxJQUFJLENBQUMsUUFBUSxHQUFHLEtBQUssQ0FBQztBQUFBLElBQzFCLENBQUM7QUFBQSxFQUNILENBQUMsRUFBRTtBQUNMO0FBdkNlLEFBd0NmLHVDQUF1QyxJQUFtQztBQUN4RSxRQUFNLEtBQUssWUFBWTtBQUN2QixLQUFHLFFBQWUsZ0RBQWdELEVBQUUsSUFBSTtBQUFBLElBQ3RFO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFMZSxBQU9mLG1DQUFrRTtBQUNoRSxRQUFNLEtBQUssWUFBWTtBQUN2QixTQUFPLEdBQUcsUUFBb0IsMkJBQTJCLEVBQUUsSUFBSTtBQUNqRTtBQUhlLEFBSWYsc0NBQXFEO0FBQ25ELFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLEtBQUcsUUFBb0IseUJBQXlCLEVBQUUsSUFBSTtBQUN4RDtBQUhlLEFBSWYsK0JBQStCLE1BQW9DO0FBQ2pFLFFBQU0sS0FBSyxZQUFZO0FBRXZCLFVBQ0UsSUFDQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQWFGLEVBQUUsSUFBSSxJQUFJO0FBQ1o7QUFuQmUsQUFvQmYsMENBQTBDO0FBQUEsRUFDeEM7QUFBQSxFQUNBO0FBQUEsRUFDQSxPQUFPO0FBQUEsR0FLeUI7QUFDaEMsUUFBTSxRQUFRLGdCQUFnQjtBQUU5QixRQUFNLEtBQUssWUFBWTtBQUN2QixTQUFPLEdBQ0osUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BUUYsRUFDQyxJQUFJO0FBQUEsSUFDSDtBQUFBLElBQ0EsZ0JBQWdCLGtCQUFrQjtBQUFBLElBQ2xDO0FBQUEsRUFDRixDQUFDO0FBQ0w7QUE1QmUsQUE4QmYsNkNBQ0UsZ0JBQ2lCO0FBQ2pCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFNBQU8sR0FDSixRQUNDO0FBQUE7QUFBQTtBQUFBLE9BSUYsRUFDQyxNQUFNLEVBQ04sSUFBSSxFQUFFLGVBQWUsQ0FBQztBQUMzQjtBQWJlLEFBZ0JmLDJCQUEwQztBQUN4QyxRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0EyQlA7QUFBQSxFQUNILENBQUMsRUFBRTtBQUNMO0FBakNlLEFBb0NmLHNDQUNFLE9BQU8scURBQXVCLE1BQ2Y7QUFDZixRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BWUY7QUFFQSxRQUFJLFNBQVMscURBQXVCLE1BQU07QUFDeEMsU0FBRyxLQUNEO0FBQUE7QUFBQSxTQUdGO0FBQUEsSUFDRixXQUFXLFNBQVMscURBQXVCLE1BQU07QUFDL0MsWUFBTSxVQUFpQyxHQUNwQyxRQUFvQixzQkFBc0IsRUFDMUMsTUFBTSxJQUFJLEVBQ1YsSUFBSTtBQUVQLFlBQU0sYUFBYSxJQUFJLElBQVksb0NBQWU7QUFDbEQsaUJBQVcsTUFBTSxTQUFTO0FBQ3hCLFlBQUksQ0FBQyxXQUFXLElBQUksRUFBRSxHQUFHO0FBQ3ZCLHNDQUFXLElBQUksU0FBUyxFQUFFO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQUEsSUFDRixPQUFPO0FBQ0wsWUFBTSw4Q0FBaUIsSUFBSTtBQUFBLElBQzdCO0FBRUEsT0FBRyxLQUNELHVFQUNGO0FBQUEsRUFDRixDQUFDLEVBQUU7QUFDTDtBQS9DZSxBQWlEZixNQUFNLGlDQUFpQztBQUV2Qyx5Q0FDRSxPQUNBLEVBQUUsY0FDMkI7QUFDN0IsUUFBTSxLQUFLLFlBQVk7QUFFdkIsUUFBTSxPQUFpQixHQUNwQixRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FXRixFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQSxhQUFhO0FBQUEsSUFDYjtBQUFBLEVBQ0YsQ0FBQztBQUVILFNBQU8sS0FBSyxJQUFJLFNBQU8sOEJBQWEsSUFBSSxJQUFJLENBQUM7QUFDL0M7QUEzQmUsQUE2QmYscURBQ0UsZ0JBQ0EsRUFBRSxTQUMyQjtBQUM3QixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLE9BQWlCLEdBQ3BCLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BU0YsRUFDQyxJQUFJO0FBQUEsSUFDSDtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFSCxTQUFPLEtBQUssSUFBSSxTQUFPLDhCQUFhLElBQUksSUFBSSxDQUFDO0FBQy9DO0FBdkJlLEFBeUJmLDhDQUNFLGdCQUNBLEVBQUUsU0FDMkI7QUFDN0IsUUFBTSxLQUFLLFlBQVk7QUFDdkIsUUFBTSxPQUFPLEdBQ1YsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTRixFQUNDLElBQUk7QUFBQSxJQUNIO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVILFNBQU8sdUJBQUksTUFBTSxTQUFPLDhCQUFhLElBQUksSUFBSSxDQUFDO0FBQ2hEO0FBdkJlLEFBeUJmLDRDQUNFLGdCQUN3QjtBQUN4QixRQUFNLEtBQUssWUFBWTtBQUl2QixTQUFPLEdBQ0osUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FTRixFQUNDLE1BQU0sSUFBSSxFQUNWLElBQUksRUFBRSxlQUFlLENBQUM7QUFDM0I7QUFyQmUsQUF1QmYsb0NBQW9DLFNBQXFDO0FBQ3ZFLFFBQU0sRUFBRSxhQUFhLFNBQVMsT0FBTyxTQUFTLFlBQVk7QUFDMUQsUUFBTSxRQUF1QixDQUFDO0FBRTlCLDZCQUFRLGFBQWEsZ0JBQWM7QUFDakMsVUFBTSxFQUFFLE1BQU0sTUFBTSxXQUFXLGVBQWU7QUFDOUMsUUFBSSxNQUFNO0FBQ1IsWUFBTSxLQUFLLElBQUk7QUFBQSxJQUNqQjtBQUVBLFFBQUksYUFBYSxVQUFVLE1BQU07QUFDL0IsWUFBTSxLQUFLLFVBQVUsSUFBSTtBQUFBLElBQzNCO0FBRUEsUUFBSSxjQUFjLFdBQVcsTUFBTTtBQUNqQyxZQUFNLEtBQUssV0FBVyxJQUFJO0FBQUEsSUFDNUI7QUFBQSxFQUNGLENBQUM7QUFFRCxNQUFJLFNBQVMsTUFBTSxlQUFlLE1BQU0sWUFBWSxRQUFRO0FBQzFELCtCQUFRLE1BQU0sYUFBYSxnQkFBYztBQUN2QyxZQUFNLEVBQUUsY0FBYztBQUV0QixVQUFJLGFBQWEsVUFBVSxNQUFNO0FBQy9CLGNBQU0sS0FBSyxVQUFVLElBQUk7QUFBQSxNQUMzQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFFQSxNQUFJLFdBQVcsUUFBUSxRQUFRO0FBQzdCLCtCQUFRLFNBQVMsVUFBUTtBQUN2QixZQUFNLEVBQUUsV0FBVztBQUVuQixVQUFJLFVBQVUsT0FBTyxVQUFVLE9BQU8sT0FBTyxNQUFNO0FBQ2pELGNBQU0sS0FBSyxPQUFPLE9BQU8sSUFBSTtBQUFBLE1BQy9CO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQUksV0FBVyxRQUFRLFFBQVE7QUFDN0IsK0JBQVEsU0FBUyxVQUFRO0FBQ3ZCLFlBQU0sRUFBRSxVQUFVO0FBRWxCLFVBQUksU0FBUyxNQUFNLE1BQU07QUFDdkIsY0FBTSxLQUFLLE1BQU0sSUFBSTtBQUFBLE1BQ3ZCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUVBLE1BQUksV0FBVyxRQUFRLFFBQVEsUUFBUSxLQUFLLE1BQU07QUFDaEQsVUFBTSxLQUFLLFFBQVEsS0FBSyxJQUFJO0FBRTVCLFFBQUksUUFBUSxLQUFLLGFBQWEsUUFBUSxLQUFLLFVBQVUsTUFBTTtBQUN6RCxZQUFNLEtBQUssUUFBUSxLQUFLLFVBQVUsSUFBSTtBQUFBLElBQ3hDO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQTFEUyxBQTREVCx5Q0FDRSxjQUNlO0FBQ2YsUUFBTSxFQUFFLFFBQVEsa0JBQWtCO0FBQ2xDLFFBQU0sUUFBdUIsQ0FBQztBQUU5QixNQUFJLFVBQVUsT0FBTyxNQUFNO0FBQ3pCLFVBQU0sS0FBSyxPQUFPLElBQUk7QUFBQSxFQUN4QjtBQUVBLE1BQUksaUJBQWlCLGNBQWMsTUFBTTtBQUN2QyxVQUFNLEtBQUssY0FBYyxJQUFJO0FBQUEsRUFDL0I7QUFFQSxTQUFPO0FBQ1Q7QUFmUyxBQWlCVCw4Q0FDRSxjQUNlO0FBQ2YsUUFBTSxtQkFBbUIsYUFBYSxvQkFBb0IsQ0FBQztBQUMzRCxRQUFNLFFBQXVCLENBQUM7QUFFOUIsNkJBQVEsa0JBQWtCLGdCQUFjO0FBQ3RDLFFBQUksV0FBVyxTQUFTO0FBQ3RCO0FBQUEsSUFDRjtBQUVBLFVBQU0sRUFBRSxNQUFNLE1BQU0sbUJBQW1CO0FBQ3ZDLFFBQUksTUFBTTtBQUNSLFlBQU0sS0FBSyxJQUFJO0FBQUEsSUFDakI7QUFFQSxRQUFJLGdCQUFnQjtBQUNsQixZQUFNLEtBQUssY0FBYztBQUFBLElBQzNCO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBdEJTLEFBd0JULHNDQUNFLGdCQUN3QjtBQUN4QixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLFNBQThCLDZCQUNsQyx1QkFBSSxnQkFBZ0IsVUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQzFDO0FBQ0EsUUFBTSxZQUFZO0FBRWxCLFFBQU0sUUFBUSxvQkFBb0I7QUFDbEMsU0FBTyxLQUNMLG9EQUFvRCxnQkFDdEQ7QUFFQSxNQUFJLFFBQVE7QUFFWixhQUFXLFdBQVcsSUFBSSwwQkFBMkIsSUFBSSxVQUFVLEdBQUc7QUFDcEUsVUFBTSxnQkFBZ0IsMkJBQTJCLE9BQU87QUFDeEQsK0JBQVEsZUFBZSxVQUFRO0FBQzdCLGFBQU8sT0FBTztBQUFBLElBQ2hCLENBQUM7QUFDRCxhQUFTO0FBQUEsRUFDWDtBQUVBLFNBQU8sS0FBSywyQ0FBMkMsZ0JBQWdCO0FBRXZFLE1BQUksV0FBVztBQUNmLFVBQVE7QUFDUixNQUFJLEtBQUs7QUFFVCxRQUFNLG9CQUFvQixNQUFNLHFCQUFxQjtBQUNyRCxTQUFPLEtBQ0wsb0RBQW9ELGlDQUN0RDtBQUVBLFFBQU0scUJBQXFCLEdBQUcsUUFDNUI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTUY7QUFFQSxTQUFPLENBQUMsVUFBVTtBQUNoQixVQUFNLE9BQU8sbUJBQW1CLElBQUk7QUFBQSxNQUNsQztBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLGdCQUF5Qyx1QkFBSSxNQUFNLFNBQ3ZELDhCQUFhLElBQUksSUFBSSxDQUN2QjtBQUNBLGtCQUFjLFFBQVEsa0JBQWdCO0FBQ3BDLFlBQU0sZ0JBQWdCLGdDQUFnQyxZQUFZO0FBQ2xFLG9CQUFjLFFBQVEsVUFBUTtBQUM1QixlQUFPLE9BQU87QUFBQSxNQUNoQixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsVUFBTSxjQUE0Qyx3QkFBSyxhQUFhO0FBQ3BFLFFBQUksYUFBYTtBQUNmLE1BQUMsR0FBRSxHQUFHLElBQUk7QUFBQSxJQUNaO0FBQ0EsZUFBVyxjQUFjLFNBQVM7QUFDbEMsYUFBUyxjQUFjO0FBQUEsRUFDekI7QUFFQSxTQUFPLEtBQUssMkNBQTJDLHFCQUFxQjtBQUU1RSxTQUFPLE9BQU8sS0FBSyxNQUFNO0FBQzNCO0FBdkVlLEFBeUVmLG1DQUNFLGFBQ3dCO0FBQ3hCLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sU0FBOEIsNkJBQ2xDLHVCQUFJLGFBQWEsVUFBUSxDQUFDLE1BQU0sSUFBSSxDQUFDLENBQ3ZDO0FBQ0EsUUFBTSxZQUFZO0FBRWxCLFFBQU0sUUFBUSxNQUFNLGdCQUFnQjtBQUNwQyxTQUFPLEtBQ0wsaURBQWlELGdCQUNuRDtBQUVBLE1BQUksUUFBUTtBQUNaLE1BQUksV0FBVztBQUNmLE1BQUksUUFBUTtBQUVaLFNBQU8sQ0FBQyxVQUFVO0FBQ2hCLFVBQU0sT0FBK0MsR0FDbEQsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FNRixFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVILFVBQU0sUUFBdUIsS0FBSyxJQUFJLFNBQU8sSUFBSSxJQUFJO0FBQ3JELFVBQU0sUUFBUSxVQUFRO0FBQ3BCLGFBQU8sT0FBTztBQUFBLElBQ2hCLENBQUM7QUFFRCxVQUFNLGNBQWMsd0JBQUssSUFBSTtBQUM3QixRQUFJLGFBQWE7QUFDZixNQUFDLEdBQUUsTUFBTSxJQUFJO0FBQUEsSUFDZjtBQUNBLGVBQVcsS0FBSyxTQUFTO0FBQ3pCLGFBQVMsS0FBSztBQUFBLEVBQ2hCO0FBRUEsU0FBTyxLQUFLLHdDQUF3QyxnQkFBZ0I7QUFFcEUsU0FBTyxPQUFPLEtBQUssTUFBTTtBQUMzQjtBQWpEZSxBQW1EZiwyQ0FDRSxhQUN3QjtBQUN4QixRQUFNLEtBQUssWUFBWTtBQUN2QixRQUFNLFNBQThCLDZCQUNsQyx1QkFBSSxhQUFhLFVBQVEsQ0FBQyxNQUFNLElBQUksQ0FBQyxDQUN2QztBQUNBLFFBQU0sWUFBWTtBQUVsQixRQUFNLFFBQVEsTUFBTSxxQkFBcUI7QUFDekMsU0FBTyxLQUNMLHlEQUF5RCxxQkFDM0Q7QUFFQSxNQUFJLFdBQVc7QUFDZixNQUFJLFFBQVE7QUFHWixNQUFJLEtBQXNCO0FBRTFCLFNBQU8sQ0FBQyxVQUFVO0FBQ2hCLFVBQU0sT0FBaUIsR0FDcEIsUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsU0FNRixFQUNDLElBQUk7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVILFVBQU0sZ0JBQXlDLEtBQUssSUFBSSxTQUN0RCw4QkFBYSxJQUFJLElBQUksQ0FDdkI7QUFDQSxrQkFBYyxRQUFRLGtCQUFnQjtBQUNwQyxZQUFNLGdCQUFnQixxQ0FBcUMsWUFBWTtBQUN2RSxvQkFBYyxRQUFRLFVBQVE7QUFDNUIsZUFBTyxPQUFPO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELFVBQU0sY0FBNEMsd0JBQUssYUFBYTtBQUNwRSxRQUFJLGFBQWE7QUFDZixNQUFDLEdBQUUsR0FBRyxJQUFJO0FBQUEsSUFDWjtBQUNBLGVBQVcsY0FBYyxTQUFTO0FBQ2xDLGFBQVMsY0FBYztBQUFBLEVBQ3pCO0FBRUEsU0FBTyxLQUNMLGdEQUFnRCxxQkFDbEQ7QUFFQSxTQUFPLE9BQU8sS0FBSyxNQUFNO0FBQzNCO0FBMURlLEFBNERmLDhCQUE4QixXQUE4QztBQUMxRSxRQUFNLEtBQUssWUFBWTtBQUN2QixTQUFPLG1CQUFtQixJQUFJLFNBQVM7QUFDekM7QUFIZSxBQUtSLDRCQUNMLElBQ0EsV0FDa0I7QUFDbEIsU0FBTyxHQUNKLFFBQ0M7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BTUYsRUFDQyxJQUFJLEVBQUUsVUFBVSxDQUFDLEVBQ2pCLElBQUksU0FBUTtBQUFBLElBQ1gsSUFBSSxJQUFJO0FBQUEsSUFDUjtBQUFBLElBQ0EsV0FBVyxJQUFJO0FBQUEsSUFDZixNQUFNLDhCQUFTLElBQUksSUFBSSxJQUFJLEtBQUssTUFBTSxJQUFJLElBQUksSUFBSTtBQUFBLEVBQ3BELEVBQUU7QUFDTjtBQXBCZ0IsQUFzQlQsdUJBQXVCLElBQWMsS0FBZ0M7QUFDMUUsS0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSxLQU1GLEVBQUUsSUFBSTtBQUFBLElBQ0osSUFBSSxJQUFJO0FBQUEsSUFDUixXQUFXLElBQUk7QUFBQSxJQUNmLFdBQVcsSUFBSTtBQUFBLElBQ2YsTUFBTSw4QkFBUyxJQUFJLElBQUksSUFBSSxLQUFLLFVBQVUsSUFBSSxJQUFJLElBQUk7QUFBQSxFQUN4RCxDQUFDO0FBQ0g7QUFkZ0IsQUFnQmhCLHlCQUF5QixLQUF5QztBQUNoRSxRQUFNLEtBQUssWUFBWTtBQUN2QixTQUFPLGNBQWMsSUFBSSxHQUFHO0FBQzlCO0FBSGUsQUFLZix5QkFBeUIsSUFBMkI7QUFDbEQsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxRQUFlLGlDQUFpQyxFQUFFLElBQUksRUFBRSxHQUFHLENBQUM7QUFDakU7QUFKZSxBQU1mLDJDQUNFLFFBQzRDO0FBQzVDLFFBQU0sS0FBSyxZQUFZO0FBRXZCLFNBQU8sR0FBRyxZQUFZLE1BQU07QUFDMUIsUUFBSTtBQUVKLFVBQU0sNEJBQTRCLFFBQ2hDLEdBQ0csUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBLFdBS0YsRUFDQyxNQUFNLElBQUksRUFDVixJQUFJLEVBQUUsT0FBTyxDQUFDLENBQ25CO0FBRUEsUUFBSSwyQkFBMkI7QUFDN0IsZUFBUyxpREFBa0M7QUFBQSxJQUM3QyxPQUFPO0FBQ0wsWUFBTSwyQkFBMkIsUUFDL0IsR0FDRyxRQUNDO0FBQUE7QUFBQTtBQUFBO0FBQUEsYUFLRixFQUNDLE1BQU0sSUFBSSxFQUNWLElBQUksQ0FDVDtBQUNBLFVBQUksMEJBQTBCO0FBQzVCLGlCQUFTLGlEQUFrQztBQUFBLE1BQzdDLE9BQU87QUFDTCxpQkFBUyxpREFBa0M7QUFBQSxNQUM3QztBQUVBLFNBQUcsUUFDRDtBQUFBO0FBQUE7QUFBQSxTQUlGO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxFQUNULENBQUMsRUFBRTtBQUNMO0FBcERlLEFBc0RmLCtDQUErQyxRQUErQjtBQUM1RSxRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBTUYsRUFBRSxJQUFJLEVBQUUsUUFBUSxXQUFXLEtBQUssSUFBSSxFQUFFLENBQUM7QUFDekM7QUFYZSxBQWVmLE1BQU0sMEJBQTBCLEtBQUssVUFBVTtBQUUvQyw0Q0FBMkQ7QUFDekQsUUFBTSxLQUFLLFlBQVk7QUFFdkIsS0FBRyxRQUNEO0FBQUE7QUFBQTtBQUFBLEtBSUYsRUFBRSxJQUFJO0FBQUEsSUFDSixpQkFBaUIsS0FBSyxJQUFJLElBQUk7QUFBQSxFQUNoQyxDQUFDO0FBQ0g7QUFYZSxBQWFmLHNDQUFtRTtBQUNqRSxRQUFNLEtBQUssWUFBWTtBQUV2QixTQUFPLEdBQ0osUUFDQztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsS0FTRixFQUNDLE1BQU0sRUFDTixJQUFJO0FBQ1Q7QUFqQmUsQUFtQmYseUNBQTBFO0FBQ3hFLFFBQU0sS0FBSyxZQUFZO0FBQ3ZCLFFBQU0sU0FBUyxNQUFNLDRCQUFPO0FBQUEsSUFDMUIsY0FBYyxnQkFBZ0I7QUFBQSxJQUM5QixtQkFBbUIscUJBQXFCO0FBQUEsSUFDeEMsY0FBYyxtQ0FBa0IsSUFBSSxVQUFVO0FBQUEsSUFDOUMsZ0JBQWdCLG1DQUFrQixJQUFJLFlBQVk7QUFBQSxFQUNwRCxDQUFDO0FBQ0QsU0FBTyw2QkFBVSxRQUFRLGtEQUFxQjtBQUNoRDtBQVRlLEFBV2YsMkNBQ0UsbUJBQ0EsaUJBSWU7QUFDZixRQUFNLEtBQUssWUFBWTtBQUV2QixLQUFHLFFBQ0Q7QUFBQTtBQUFBO0FBQUEsS0FJRixFQUFFLElBQUk7QUFBQSxJQUNKLE9BQU8sS0FBSyxVQUFVO0FBQUEsTUFDcEIsbUJBQW1CLHFCQUFxQjtBQUFBLE1BQ3hDLGFBQWEsaUJBQWlCLFNBQVM7QUFBQSxNQUN2QyxlQUFlLGlCQUFpQixNQUFNO0FBQUEsSUFDeEMsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUNIO0FBckJlIiwKICAibmFtZXMiOiBbXQp9Cg==
