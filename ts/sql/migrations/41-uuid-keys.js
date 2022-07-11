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
var uuid_keys_exports = {};
__export(uuid_keys_exports, {
  default: () => updateToSchemaVersion41,
  getOurUuid: () => getOurUuid
});
module.exports = __toCommonJS(uuid_keys_exports);
var import_UUID = require("../../types/UUID");
var import_assert = require("../../util/assert");
var import_Helpers = __toESM(require("../../textsecure/Helpers"));
var import_util = require("../util");
function getOurUuid(db) {
  const UUID_ID = "uuid_id";
  const row = db.prepare("SELECT json FROM items WHERE id = $id;").get({ id: UUID_ID });
  if (!row) {
    return void 0;
  }
  const { value } = JSON.parse(row.json);
  const [ourUuid] = import_Helpers.default.unencodeNumber(String(value).toLowerCase());
  return ourUuid;
}
function updateToSchemaVersion41(currentVersion, db, logger) {
  if (currentVersion >= 41) {
    return;
  }
  const getConversationUuid = db.prepare(`
      SELECT uuid
      FROM
        conversations
      WHERE
        id = $conversationId
      `).pluck();
  const getConversationStats = db.prepare(`
      SELECT uuid, e164, active_at
      FROM
        conversations
      WHERE
        id = $conversationId
    `);
  const compareConvoRecency = /* @__PURE__ */ __name((a, b) => {
    const aStats = getConversationStats.get({ conversationId: a });
    const bStats = getConversationStats.get({ conversationId: b });
    const isAComplete = Boolean(aStats?.uuid && aStats?.e164);
    const isBComplete = Boolean(bStats?.uuid && bStats?.e164);
    if (!isAComplete && !isBComplete) {
      return 0;
    }
    if (!isAComplete) {
      return -1;
    }
    if (!isBComplete) {
      return 1;
    }
    return aStats.active_at - bStats.active_at;
  }, "compareConvoRecency");
  const clearSessionsAndKeys = /* @__PURE__ */ __name(() => {
    const keyCount = [
      db.prepare("DELETE FROM senderKeys").run().changes,
      db.prepare("DELETE FROM sessions").run().changes,
      db.prepare("DELETE FROM signedPreKeys").run().changes,
      db.prepare("DELETE FROM preKeys").run().changes
    ].reduce((a, b) => a + b);
    (0, import_assert.assertSync)((0, import_util.removeById)(db, "items", "identityKey"));
    (0, import_assert.assertSync)((0, import_util.removeById)(db, "items", "registrationId"));
    return keyCount;
  }, "clearSessionsAndKeys");
  const moveIdentityKeyToMap = /* @__PURE__ */ __name((ourUuid) => {
    const identityKey = (0, import_assert.assertSync)((0, import_util.getById)(db, "items", "identityKey"));
    const registrationId = (0, import_assert.assertSync)((0, import_util.getById)(db, "items", "registrationId"));
    if (identityKey) {
      (0, import_assert.assertSync)((0, import_util.createOrUpdate)(db, "items", {
        id: "identityKeyMap",
        value: {
          [ourUuid]: identityKey.value
        }
      }));
    }
    if (registrationId) {
      (0, import_assert.assertSync)((0, import_util.createOrUpdate)(db, "items", {
        id: "registrationIdMap",
        value: {
          [ourUuid]: registrationId.value
        }
      }));
    }
    db.exec(`
      DELETE FROM items WHERE id = "identityKey" OR id = "registrationId";
      `);
  }, "moveIdentityKeyToMap");
  const prefixKeys = /* @__PURE__ */ __name((ourUuid) => {
    for (const table of ["signedPreKeys", "preKeys"]) {
      db.prepare(`
        UPDATE ${table}
        SET
          id = $ourUuid || ':' || id,
          json = json_set(
            json,
            '$.id',
            $ourUuid || ':' || json_extract(json, '$.id'),
            '$.keyId',
            json_extract(json, '$.id'),
            '$.ourUuid',
            $ourUuid
          )
        `).run({ ourUuid });
    }
  }, "prefixKeys");
  const updateSenderKeys = /* @__PURE__ */ __name((ourUuid) => {
    const senderKeys = db.prepare("SELECT id, senderId, lastUpdatedDate FROM senderKeys").all();
    logger.info(`Updating ${senderKeys.length} sender keys`);
    const updateSenderKey = db.prepare(`
      UPDATE senderKeys
      SET
        id = $newId,
        senderId = $newSenderId
      WHERE
        id = $id
      `);
    const deleteSenderKey = db.prepare("DELETE FROM senderKeys WHERE id = $id");
    const pastKeys = /* @__PURE__ */ new Map();
    let updated = 0;
    let deleted = 0;
    let skipped = 0;
    for (const { id, senderId, lastUpdatedDate } of senderKeys) {
      const [conversationId] = import_Helpers.default.unencodeNumber(senderId);
      const uuid = getConversationUuid.get({ conversationId });
      if (!uuid) {
        deleted += 1;
        deleteSenderKey.run({ id });
        continue;
      }
      const newId = `${ourUuid}:${id.replace(conversationId, uuid)}`;
      const existing = pastKeys.get(newId);
      if (existing) {
        skipped += 1;
      } else {
        updated += 1;
      }
      const isOlder = existing && (lastUpdatedDate < existing.lastUpdatedDate || compareConvoRecency(conversationId, existing.conversationId) < 0);
      if (isOlder) {
        deleteSenderKey.run({ id });
        continue;
      } else if (existing) {
        deleteSenderKey.run({ id: newId });
      }
      pastKeys.set(newId, { conversationId, lastUpdatedDate });
      updateSenderKey.run({
        id,
        newId,
        newSenderId: `${senderId.replace(conversationId, uuid)}`
      });
    }
    logger.info(`Updated ${senderKeys.length} sender keys: updated: ${updated}, deleted: ${deleted}, skipped: ${skipped}`);
  }, "updateSenderKeys");
  const updateSessions = /* @__PURE__ */ __name((ourUuid) => {
    const allSessions = db.prepare("SELECT id, conversationId FROM SESSIONS").all();
    logger.info(`Updating ${allSessions.length} sessions`);
    const updateSession = db.prepare(`
      UPDATE sessions
      SET
        id = $newId,
        ourUuid = $ourUuid,
        uuid = $uuid,
        json = json_set(
          sessions.json,
          '$.id',
          $newId,
          '$.uuid',
          $uuid,
          '$.ourUuid',
          $ourUuid
        )
      WHERE
        id = $id
      `);
    const deleteSession = db.prepare("DELETE FROM sessions WHERE id = $id");
    const pastSessions = /* @__PURE__ */ new Map();
    let updated = 0;
    let deleted = 0;
    let skipped = 0;
    for (const { id, conversationId } of allSessions) {
      const uuid = getConversationUuid.get({ conversationId });
      if (!uuid) {
        deleted += 1;
        deleteSession.run({ id });
        continue;
      }
      const newId = `${ourUuid}:${id.replace(conversationId, uuid)}`;
      const existing = pastSessions.get(newId);
      if (existing) {
        skipped += 1;
      } else {
        updated += 1;
      }
      const isOlder = existing && compareConvoRecency(conversationId, existing.conversationId) < 0;
      if (isOlder) {
        deleteSession.run({ id });
        continue;
      } else if (existing) {
        deleteSession.run({ id: newId });
      }
      pastSessions.set(newId, { conversationId });
      updateSession.run({
        id,
        newId,
        uuid,
        ourUuid
      });
    }
    logger.info(`Updated ${allSessions.length} sessions: updated: ${updated}, deleted: ${deleted}, skipped: ${skipped}`);
  }, "updateSessions");
  const updateIdentityKeys = /* @__PURE__ */ __name(() => {
    const identityKeys = db.prepare("SELECT id FROM identityKeys").all();
    logger.info(`Updating ${identityKeys.length} identity keys`);
    const updateIdentityKey = db.prepare(`
      UPDATE identityKeys
      SET
        id = $newId,
        json = json_set(
          identityKeys.json,
          '$.id',
          $newId
        )
      WHERE
        id = $id
      `);
    let migrated = 0;
    for (const { id } of identityKeys) {
      const uuid = getConversationUuid.get({ conversationId: id });
      let newId;
      if (uuid) {
        migrated += 1;
        newId = uuid;
      } else {
        newId = `conversation:${id}`;
      }
      updateIdentityKey.run({ id, newId });
    }
    logger.info(`Migrated ${migrated} identity keys`);
  }, "updateIdentityKeys");
  db.transaction(() => {
    db.exec(`
      -- Change type of 'id' column from INTEGER to STRING

      ALTER TABLE preKeys
      RENAME TO old_preKeys;

      ALTER TABLE signedPreKeys
      RENAME TO old_signedPreKeys;

      CREATE TABLE preKeys(
        id STRING PRIMARY KEY ASC,
        json TEXT
      );
      CREATE TABLE signedPreKeys(
        id STRING PRIMARY KEY ASC,
        json TEXT
      );

      -- sqlite handles the type conversion
      INSERT INTO preKeys SELECT * FROM old_preKeys;
      INSERT INTO signedPreKeys SELECT * FROM old_signedPreKeys;

      DROP TABLE old_preKeys;
      DROP TABLE old_signedPreKeys;

      -- Alter sessions

      ALTER TABLE sessions
        ADD COLUMN ourUuid STRING;

      ALTER TABLE sessions
        ADD COLUMN uuid STRING;
      `);
    const ourUuid = getOurUuid(db);
    if (!(0, import_UUID.isValidUuid)(ourUuid)) {
      const deleteCount = clearSessionsAndKeys();
      if (deleteCount > 0) {
        logger.error(`updateToSchemaVersion41: no uuid is available, erased ${deleteCount} sessions/keys`);
      }
      db.pragma("user_version = 41");
      return;
    }
    prefixKeys(ourUuid);
    updateSenderKeys(ourUuid);
    updateSessions(ourUuid);
    moveIdentityKeyToMap(ourUuid);
    updateIdentityKeys();
    db.pragma("user_version = 41");
  })();
  logger.info("updateToSchemaVersion41: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getOurUuid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDEtdXVpZC1rZXlzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgaXNWYWxpZFV1aWQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IGFzc2VydFN5bmMgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgSGVscGVycyBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL0hlbHBlcnMnO1xuaW1wb3J0IHsgY3JlYXRlT3JVcGRhdGUsIGdldEJ5SWQsIHJlbW92ZUJ5SWQgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB0eXBlIHsgRW1wdHlRdWVyeSwgUXVlcnkgfSBmcm9tICcuLi91dGlsJztcbmltcG9ydCB0eXBlIHsgSXRlbUtleVR5cGUgfSBmcm9tICcuLi9JbnRlcmZhY2UnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0T3VyVXVpZChkYjogRGF0YWJhc2UpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBVVUlEX0lEOiBJdGVtS2V5VHlwZSA9ICd1dWlkX2lkJztcblxuICBjb25zdCByb3c6IHsganNvbjogc3RyaW5nIH0gfCB1bmRlZmluZWQgPSBkYlxuICAgIC5wcmVwYXJlPFF1ZXJ5PignU0VMRUNUIGpzb24gRlJPTSBpdGVtcyBXSEVSRSBpZCA9ICRpZDsnKVxuICAgIC5nZXQoeyBpZDogVVVJRF9JRCB9KTtcblxuICBpZiAoIXJvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IHZhbHVlIH0gPSBKU09OLnBhcnNlKHJvdy5qc29uKTtcblxuICBjb25zdCBbb3VyVXVpZF0gPSBIZWxwZXJzLnVuZW5jb2RlTnVtYmVyKFN0cmluZyh2YWx1ZSkudG9Mb3dlckNhc2UoKSk7XG4gIHJldHVybiBvdXJVdWlkO1xufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb240MShcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gNDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBnZXRDb252ZXJzYXRpb25VdWlkID0gZGJcbiAgICAucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBTRUxFQ1QgdXVpZFxuICAgICAgRlJPTVxuICAgICAgICBjb252ZXJzYXRpb25zXG4gICAgICBXSEVSRVxuICAgICAgICBpZCA9ICRjb252ZXJzYXRpb25JZFxuICAgICAgYFxuICAgIClcbiAgICAucGx1Y2soKTtcblxuICBjb25zdCBnZXRDb252ZXJzYXRpb25TdGF0cyA9IGRiLnByZXBhcmU8UXVlcnk+KFxuICAgIGBcbiAgICAgIFNFTEVDVCB1dWlkLCBlMTY0LCBhY3RpdmVfYXRcbiAgICAgIEZST01cbiAgICAgICAgY29udmVyc2F0aW9uc1xuICAgICAgV0hFUkVcbiAgICAgICAgaWQgPSAkY29udmVyc2F0aW9uSWRcbiAgICBgXG4gICk7XG5cbiAgY29uc3QgY29tcGFyZUNvbnZvUmVjZW5jeSA9IChhOiBzdHJpbmcsIGI6IHN0cmluZyk6IG51bWJlciA9PiB7XG4gICAgY29uc3QgYVN0YXRzID0gZ2V0Q29udmVyc2F0aW9uU3RhdHMuZ2V0KHsgY29udmVyc2F0aW9uSWQ6IGEgfSk7XG4gICAgY29uc3QgYlN0YXRzID0gZ2V0Q29udmVyc2F0aW9uU3RhdHMuZ2V0KHsgY29udmVyc2F0aW9uSWQ6IGIgfSk7XG5cbiAgICBjb25zdCBpc0FDb21wbGV0ZSA9IEJvb2xlYW4oYVN0YXRzPy51dWlkICYmIGFTdGF0cz8uZTE2NCk7XG4gICAgY29uc3QgaXNCQ29tcGxldGUgPSBCb29sZWFuKGJTdGF0cz8udXVpZCAmJiBiU3RhdHM/LmUxNjQpO1xuXG4gICAgaWYgKCFpc0FDb21wbGV0ZSAmJiAhaXNCQ29tcGxldGUpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cbiAgICBpZiAoIWlzQUNvbXBsZXRlKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmICghaXNCQ29tcGxldGUpIHtcbiAgICAgIHJldHVybiAxO1xuICAgIH1cblxuICAgIHJldHVybiBhU3RhdHMuYWN0aXZlX2F0IC0gYlN0YXRzLmFjdGl2ZV9hdDtcbiAgfTtcblxuICBjb25zdCBjbGVhclNlc3Npb25zQW5kS2V5cyA9ICgpOiBudW1iZXIgPT4ge1xuICAgIC8vIHRzL2JhY2tncm91bmQudHMgd2lsbCBhc2sgdXNlciB0byByZWxpbmsgc28gYWxsIHRoYXQgbWF0dGVycyBoZXJlIGlzXG4gICAgLy8gdG8gbWFpbnRhaW4gYW4gaW52YXJpYW50OlxuICAgIC8vXG4gICAgLy8gQWZ0ZXIgdGhpcyBtaWdyYXRpb24gYWxsIHNlc3Npb25zIGFuZCBrZXlzIGFyZSBwcmVmaXhlZCBieVxuICAgIC8vIFwidXVpZDpcIi5cbiAgICBjb25zdCBrZXlDb3VudCA9IFtcbiAgICAgIGRiLnByZXBhcmUoJ0RFTEVURSBGUk9NIHNlbmRlcktleXMnKS5ydW4oKS5jaGFuZ2VzLFxuICAgICAgZGIucHJlcGFyZSgnREVMRVRFIEZST00gc2Vzc2lvbnMnKS5ydW4oKS5jaGFuZ2VzLFxuICAgICAgZGIucHJlcGFyZSgnREVMRVRFIEZST00gc2lnbmVkUHJlS2V5cycpLnJ1bigpLmNoYW5nZXMsXG4gICAgICBkYi5wcmVwYXJlKCdERUxFVEUgRlJPTSBwcmVLZXlzJykucnVuKCkuY2hhbmdlcyxcbiAgICBdLnJlZHVjZSgoYTogbnVtYmVyLCBiOiBudW1iZXIpOiBudW1iZXIgPT4gYSArIGIpO1xuXG4gICAgYXNzZXJ0U3luYyhyZW1vdmVCeUlkPHN0cmluZz4oZGIsICdpdGVtcycsICdpZGVudGl0eUtleScpKTtcbiAgICBhc3NlcnRTeW5jKHJlbW92ZUJ5SWQ8c3RyaW5nPihkYiwgJ2l0ZW1zJywgJ3JlZ2lzdHJhdGlvbklkJykpO1xuXG4gICAgcmV0dXJuIGtleUNvdW50O1xuICB9O1xuXG4gIGNvbnN0IG1vdmVJZGVudGl0eUtleVRvTWFwID0gKG91clV1aWQ6IHN0cmluZykgPT4ge1xuICAgIHR5cGUgSWRlbnRpdHlLZXlUeXBlID0ge1xuICAgICAgcHJpdktleTogc3RyaW5nO1xuICAgICAgcHVibGljS2V5OiBzdHJpbmc7XG4gICAgfTtcblxuICAgIGNvbnN0IGlkZW50aXR5S2V5ID0gYXNzZXJ0U3luYyhcbiAgICAgIGdldEJ5SWQ8c3RyaW5nLCB7IHZhbHVlOiBJZGVudGl0eUtleVR5cGUgfT4oZGIsICdpdGVtcycsICdpZGVudGl0eUtleScpXG4gICAgKTtcblxuICAgIHR5cGUgUmVnaXN0cmF0aW9uSWQgPSBudW1iZXI7XG5cbiAgICBjb25zdCByZWdpc3RyYXRpb25JZCA9IGFzc2VydFN5bmMoXG4gICAgICBnZXRCeUlkPHN0cmluZywgeyB2YWx1ZTogUmVnaXN0cmF0aW9uSWQgfT4oZGIsICdpdGVtcycsICdyZWdpc3RyYXRpb25JZCcpXG4gICAgKTtcblxuICAgIGlmIChpZGVudGl0eUtleSkge1xuICAgICAgYXNzZXJ0U3luYyhcbiAgICAgICAgY3JlYXRlT3JVcGRhdGU8SXRlbUtleVR5cGU+KGRiLCAnaXRlbXMnLCB7XG4gICAgICAgICAgaWQ6ICdpZGVudGl0eUtleU1hcCcsXG4gICAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIFtvdXJVdWlkXTogaWRlbnRpdHlLZXkudmFsdWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHJlZ2lzdHJhdGlvbklkKSB7XG4gICAgICBhc3NlcnRTeW5jKFxuICAgICAgICBjcmVhdGVPclVwZGF0ZTxJdGVtS2V5VHlwZT4oZGIsICdpdGVtcycsIHtcbiAgICAgICAgICBpZDogJ3JlZ2lzdHJhdGlvbklkTWFwJyxcbiAgICAgICAgICB2YWx1ZToge1xuICAgICAgICAgICAgW291clV1aWRdOiByZWdpc3RyYXRpb25JZC52YWx1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBkYi5leGVjKFxuICAgICAgYFxuICAgICAgREVMRVRFIEZST00gaXRlbXMgV0hFUkUgaWQgPSBcImlkZW50aXR5S2V5XCIgT1IgaWQgPSBcInJlZ2lzdHJhdGlvbklkXCI7XG4gICAgICBgXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCBwcmVmaXhLZXlzID0gKG91clV1aWQ6IHN0cmluZykgPT4ge1xuICAgIGZvciAoY29uc3QgdGFibGUgb2YgWydzaWduZWRQcmVLZXlzJywgJ3ByZUtleXMnXSkge1xuICAgICAgLy8gVXBkYXRlIGlkIHRvIGluY2x1ZGUgc3VmZml4LCBhZGQgYG91clV1aWRgIGFuZCBga2V5SWRgIGZpZWxkcy5cbiAgICAgIGRiLnByZXBhcmU8UXVlcnk+KFxuICAgICAgICBgXG4gICAgICAgIFVQREFURSAke3RhYmxlfVxuICAgICAgICBTRVRcbiAgICAgICAgICBpZCA9ICRvdXJVdWlkIHx8ICc6JyB8fCBpZCxcbiAgICAgICAgICBqc29uID0ganNvbl9zZXQoXG4gICAgICAgICAgICBqc29uLFxuICAgICAgICAgICAgJyQuaWQnLFxuICAgICAgICAgICAgJG91clV1aWQgfHwgJzonIHx8IGpzb25fZXh0cmFjdChqc29uLCAnJC5pZCcpLFxuICAgICAgICAgICAgJyQua2V5SWQnLFxuICAgICAgICAgICAganNvbl9leHRyYWN0KGpzb24sICckLmlkJyksXG4gICAgICAgICAgICAnJC5vdXJVdWlkJyxcbiAgICAgICAgICAgICRvdXJVdWlkXG4gICAgICAgICAgKVxuICAgICAgICBgXG4gICAgICApLnJ1bih7IG91clV1aWQgfSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IHVwZGF0ZVNlbmRlcktleXMgPSAob3VyVXVpZDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3Qgc2VuZGVyS2V5czogUmVhZG9ubHlBcnJheTx7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgc2VuZGVySWQ6IHN0cmluZztcbiAgICAgIGxhc3RVcGRhdGVkRGF0ZTogbnVtYmVyO1xuICAgIH0+ID0gZGJcbiAgICAgIC5wcmVwYXJlPEVtcHR5UXVlcnk+KFxuICAgICAgICAnU0VMRUNUIGlkLCBzZW5kZXJJZCwgbGFzdFVwZGF0ZWREYXRlIEZST00gc2VuZGVyS2V5cydcbiAgICAgIClcbiAgICAgIC5hbGwoKTtcblxuICAgIGxvZ2dlci5pbmZvKGBVcGRhdGluZyAke3NlbmRlcktleXMubGVuZ3RofSBzZW5kZXIga2V5c2ApO1xuXG4gICAgY29uc3QgdXBkYXRlU2VuZGVyS2V5ID0gZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBVUERBVEUgc2VuZGVyS2V5c1xuICAgICAgU0VUXG4gICAgICAgIGlkID0gJG5ld0lkLFxuICAgICAgICBzZW5kZXJJZCA9ICRuZXdTZW5kZXJJZFxuICAgICAgV0hFUkVcbiAgICAgICAgaWQgPSAkaWRcbiAgICAgIGBcbiAgICApO1xuXG4gICAgY29uc3QgZGVsZXRlU2VuZGVyS2V5ID0gZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAnREVMRVRFIEZST00gc2VuZGVyS2V5cyBXSEVSRSBpZCA9ICRpZCdcbiAgICApO1xuXG4gICAgY29uc3QgcGFzdEtleXMgPSBuZXcgTWFwPFxuICAgICAgc3RyaW5nLFxuICAgICAge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgICAgICBsYXN0VXBkYXRlZERhdGU6IG51bWJlcjtcbiAgICAgIH1cbiAgICA+KCk7XG5cbiAgICBsZXQgdXBkYXRlZCA9IDA7XG4gICAgbGV0IGRlbGV0ZWQgPSAwO1xuICAgIGxldCBza2lwcGVkID0gMDtcbiAgICBmb3IgKGNvbnN0IHsgaWQsIHNlbmRlcklkLCBsYXN0VXBkYXRlZERhdGUgfSBvZiBzZW5kZXJLZXlzKSB7XG4gICAgICBjb25zdCBbY29udmVyc2F0aW9uSWRdID0gSGVscGVycy51bmVuY29kZU51bWJlcihzZW5kZXJJZCk7XG4gICAgICBjb25zdCB1dWlkID0gZ2V0Q29udmVyc2F0aW9uVXVpZC5nZXQoeyBjb252ZXJzYXRpb25JZCB9KTtcblxuICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgIGRlbGV0ZWQgKz0gMTtcbiAgICAgICAgZGVsZXRlU2VuZGVyS2V5LnJ1bih7IGlkIH0pO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3SWQgPSBgJHtvdXJVdWlkfToke2lkLnJlcGxhY2UoY29udmVyc2F0aW9uSWQsIHV1aWQpfWA7XG5cbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gcGFzdEtleXMuZ2V0KG5ld0lkKTtcblxuICAgICAgLy8gV2UgYXJlIGdvaW5nIHRvIGRlbGV0ZSBvbiBvZiB0aGUga2V5cyBhbnl3YXlcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICBza2lwcGVkICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVkICs9IDE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzT2xkZXIgPVxuICAgICAgICBleGlzdGluZyAmJlxuICAgICAgICAobGFzdFVwZGF0ZWREYXRlIDwgZXhpc3RpbmcubGFzdFVwZGF0ZWREYXRlIHx8XG4gICAgICAgICAgY29tcGFyZUNvbnZvUmVjZW5jeShjb252ZXJzYXRpb25JZCwgZXhpc3RpbmcuY29udmVyc2F0aW9uSWQpIDwgMCk7XG4gICAgICBpZiAoaXNPbGRlcikge1xuICAgICAgICBkZWxldGVTZW5kZXJLZXkucnVuKHsgaWQgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfSBlbHNlIGlmIChleGlzdGluZykge1xuICAgICAgICBkZWxldGVTZW5kZXJLZXkucnVuKHsgaWQ6IG5ld0lkIH0pO1xuICAgICAgfVxuXG4gICAgICBwYXN0S2V5cy5zZXQobmV3SWQsIHsgY29udmVyc2F0aW9uSWQsIGxhc3RVcGRhdGVkRGF0ZSB9KTtcblxuICAgICAgdXBkYXRlU2VuZGVyS2V5LnJ1bih7XG4gICAgICAgIGlkLFxuICAgICAgICBuZXdJZCxcbiAgICAgICAgbmV3U2VuZGVySWQ6IGAke3NlbmRlcklkLnJlcGxhY2UoY29udmVyc2F0aW9uSWQsIHV1aWQpfWAsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgIGBVcGRhdGVkICR7c2VuZGVyS2V5cy5sZW5ndGh9IHNlbmRlciBrZXlzOiBgICtcbiAgICAgICAgYHVwZGF0ZWQ6ICR7dXBkYXRlZH0sIGRlbGV0ZWQ6ICR7ZGVsZXRlZH0sIHNraXBwZWQ6ICR7c2tpcHBlZH1gXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVTZXNzaW9ucyA9IChvdXJVdWlkOiBzdHJpbmcpID0+IHtcbiAgICAvLyBVc2UgdXVpZCBpbnN0ZWFkIG9mIGNvbnZlcnNhdGlvbiBpZCBpbiBleGlzdGluZyBzZXNpb25zIGFuZCBwcmVmaXggaWRcbiAgICAvLyB3aXRoIG91clV1aWQuXG4gICAgLy9cbiAgICAvLyBTZXQgb3VyVXVpZCBjb2x1bW4gYW5kIGZpZWxkIGluIGpzb25cbiAgICBjb25zdCBhbGxTZXNzaW9ucyA9IGRiXG4gICAgICAucHJlcGFyZTxFbXB0eVF1ZXJ5PignU0VMRUNUIGlkLCBjb252ZXJzYXRpb25JZCBGUk9NIFNFU1NJT05TJylcbiAgICAgIC5hbGwoKTtcblxuICAgIGxvZ2dlci5pbmZvKGBVcGRhdGluZyAke2FsbFNlc3Npb25zLmxlbmd0aH0gc2Vzc2lvbnNgKTtcblxuICAgIGNvbnN0IHVwZGF0ZVNlc3Npb24gPSBkYi5wcmVwYXJlPFF1ZXJ5PihcbiAgICAgIGBcbiAgICAgIFVQREFURSBzZXNzaW9uc1xuICAgICAgU0VUXG4gICAgICAgIGlkID0gJG5ld0lkLFxuICAgICAgICBvdXJVdWlkID0gJG91clV1aWQsXG4gICAgICAgIHV1aWQgPSAkdXVpZCxcbiAgICAgICAganNvbiA9IGpzb25fc2V0KFxuICAgICAgICAgIHNlc3Npb25zLmpzb24sXG4gICAgICAgICAgJyQuaWQnLFxuICAgICAgICAgICRuZXdJZCxcbiAgICAgICAgICAnJC51dWlkJyxcbiAgICAgICAgICAkdXVpZCxcbiAgICAgICAgICAnJC5vdXJVdWlkJyxcbiAgICAgICAgICAkb3VyVXVpZFxuICAgICAgICApXG4gICAgICBXSEVSRVxuICAgICAgICBpZCA9ICRpZFxuICAgICAgYFxuICAgICk7XG5cbiAgICBjb25zdCBkZWxldGVTZXNzaW9uID0gZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICAnREVMRVRFIEZST00gc2Vzc2lvbnMgV0hFUkUgaWQgPSAkaWQnXG4gICAgKTtcblxuICAgIGNvbnN0IHBhc3RTZXNzaW9ucyA9IG5ldyBNYXA8XG4gICAgICBzdHJpbmcsXG4gICAgICB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgICB9XG4gICAgPigpO1xuXG4gICAgbGV0IHVwZGF0ZWQgPSAwO1xuICAgIGxldCBkZWxldGVkID0gMDtcbiAgICBsZXQgc2tpcHBlZCA9IDA7XG4gICAgZm9yIChjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCB9IG9mIGFsbFNlc3Npb25zKSB7XG4gICAgICBjb25zdCB1dWlkID0gZ2V0Q29udmVyc2F0aW9uVXVpZC5nZXQoeyBjb252ZXJzYXRpb25JZCB9KTtcbiAgICAgIGlmICghdXVpZCkge1xuICAgICAgICBkZWxldGVkICs9IDE7XG4gICAgICAgIGRlbGV0ZVNlc3Npb24ucnVuKHsgaWQgfSk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdJZCA9IGAke291clV1aWR9OiR7aWQucmVwbGFjZShjb252ZXJzYXRpb25JZCwgdXVpZCl9YDtcblxuICAgICAgY29uc3QgZXhpc3RpbmcgPSBwYXN0U2Vzc2lvbnMuZ2V0KG5ld0lkKTtcblxuICAgICAgLy8gV2UgYXJlIGdvaW5nIHRvIGRlbGV0ZSBvbiBvZiB0aGUga2V5cyBhbnl3YXlcbiAgICAgIGlmIChleGlzdGluZykge1xuICAgICAgICBza2lwcGVkICs9IDE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB1cGRhdGVkICs9IDE7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGlzT2xkZXIgPVxuICAgICAgICBleGlzdGluZyAmJlxuICAgICAgICBjb21wYXJlQ29udm9SZWNlbmN5KGNvbnZlcnNhdGlvbklkLCBleGlzdGluZy5jb252ZXJzYXRpb25JZCkgPCAwO1xuICAgICAgaWYgKGlzT2xkZXIpIHtcbiAgICAgICAgZGVsZXRlU2Vzc2lvbi5ydW4oeyBpZCB9KTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9IGVsc2UgaWYgKGV4aXN0aW5nKSB7XG4gICAgICAgIGRlbGV0ZVNlc3Npb24ucnVuKHsgaWQ6IG5ld0lkIH0pO1xuICAgICAgfVxuXG4gICAgICBwYXN0U2Vzc2lvbnMuc2V0KG5ld0lkLCB7IGNvbnZlcnNhdGlvbklkIH0pO1xuXG4gICAgICB1cGRhdGVTZXNzaW9uLnJ1bih7XG4gICAgICAgIGlkLFxuICAgICAgICBuZXdJZCxcbiAgICAgICAgdXVpZCxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKFxuICAgICAgYFVwZGF0ZWQgJHthbGxTZXNzaW9ucy5sZW5ndGh9IHNlc3Npb25zOiBgICtcbiAgICAgICAgYHVwZGF0ZWQ6ICR7dXBkYXRlZH0sIGRlbGV0ZWQ6ICR7ZGVsZXRlZH0sIHNraXBwZWQ6ICR7c2tpcHBlZH1gXG4gICAgKTtcbiAgfTtcblxuICBjb25zdCB1cGRhdGVJZGVudGl0eUtleXMgPSAoKSA9PiB7XG4gICAgY29uc3QgaWRlbnRpdHlLZXlzOiBSZWFkb25seUFycmF5PHtcbiAgICAgIGlkOiBzdHJpbmc7XG4gICAgfT4gPSBkYi5wcmVwYXJlPEVtcHR5UXVlcnk+KCdTRUxFQ1QgaWQgRlJPTSBpZGVudGl0eUtleXMnKS5hbGwoKTtcblxuICAgIGxvZ2dlci5pbmZvKGBVcGRhdGluZyAke2lkZW50aXR5S2V5cy5sZW5ndGh9IGlkZW50aXR5IGtleXNgKTtcblxuICAgIGNvbnN0IHVwZGF0ZUlkZW50aXR5S2V5ID0gZGIucHJlcGFyZTxRdWVyeT4oXG4gICAgICBgXG4gICAgICBVUERBVEUgaWRlbnRpdHlLZXlzXG4gICAgICBTRVRcbiAgICAgICAgaWQgPSAkbmV3SWQsXG4gICAgICAgIGpzb24gPSBqc29uX3NldChcbiAgICAgICAgICBpZGVudGl0eUtleXMuanNvbixcbiAgICAgICAgICAnJC5pZCcsXG4gICAgICAgICAgJG5ld0lkXG4gICAgICAgIClcbiAgICAgIFdIRVJFXG4gICAgICAgIGlkID0gJGlkXG4gICAgICBgXG4gICAgKTtcblxuICAgIGxldCBtaWdyYXRlZCA9IDA7XG4gICAgZm9yIChjb25zdCB7IGlkIH0gb2YgaWRlbnRpdHlLZXlzKSB7XG4gICAgICBjb25zdCB1dWlkID0gZ2V0Q29udmVyc2F0aW9uVXVpZC5nZXQoeyBjb252ZXJzYXRpb25JZDogaWQgfSk7XG5cbiAgICAgIGxldCBuZXdJZDogc3RyaW5nO1xuICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgbWlncmF0ZWQgKz0gMTtcbiAgICAgICAgbmV3SWQgPSB1dWlkO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbmV3SWQgPSBgY29udmVyc2F0aW9uOiR7aWR9YDtcbiAgICAgIH1cblxuICAgICAgdXBkYXRlSWRlbnRpdHlLZXkucnVuKHsgaWQsIG5ld0lkIH0pO1xuICAgIH1cblxuICAgIGxvZ2dlci5pbmZvKGBNaWdyYXRlZCAke21pZ3JhdGVkfSBpZGVudGl0eSBrZXlzYCk7XG4gIH07XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAtLSBDaGFuZ2UgdHlwZSBvZiAnaWQnIGNvbHVtbiBmcm9tIElOVEVHRVIgdG8gU1RSSU5HXG5cbiAgICAgIEFMVEVSIFRBQkxFIHByZUtleXNcbiAgICAgIFJFTkFNRSBUTyBvbGRfcHJlS2V5cztcblxuICAgICAgQUxURVIgVEFCTEUgc2lnbmVkUHJlS2V5c1xuICAgICAgUkVOQU1FIFRPIG9sZF9zaWduZWRQcmVLZXlzO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgcHJlS2V5cyhcbiAgICAgICAgaWQgU1RSSU5HIFBSSU1BUlkgS0VZIEFTQyxcbiAgICAgICAganNvbiBURVhUXG4gICAgICApO1xuICAgICAgQ1JFQVRFIFRBQkxFIHNpZ25lZFByZUtleXMoXG4gICAgICAgIGlkIFNUUklORyBQUklNQVJZIEtFWSBBU0MsXG4gICAgICAgIGpzb24gVEVYVFxuICAgICAgKTtcblxuICAgICAgLS0gc3FsaXRlIGhhbmRsZXMgdGhlIHR5cGUgY29udmVyc2lvblxuICAgICAgSU5TRVJUIElOVE8gcHJlS2V5cyBTRUxFQ1QgKiBGUk9NIG9sZF9wcmVLZXlzO1xuICAgICAgSU5TRVJUIElOVE8gc2lnbmVkUHJlS2V5cyBTRUxFQ1QgKiBGUk9NIG9sZF9zaWduZWRQcmVLZXlzO1xuXG4gICAgICBEUk9QIFRBQkxFIG9sZF9wcmVLZXlzO1xuICAgICAgRFJPUCBUQUJMRSBvbGRfc2lnbmVkUHJlS2V5cztcblxuICAgICAgLS0gQWx0ZXIgc2Vzc2lvbnNcblxuICAgICAgQUxURVIgVEFCTEUgc2Vzc2lvbnNcbiAgICAgICAgQUREIENPTFVNTiBvdXJVdWlkIFNUUklORztcblxuICAgICAgQUxURVIgVEFCTEUgc2Vzc2lvbnNcbiAgICAgICAgQUREIENPTFVNTiB1dWlkIFNUUklORztcbiAgICAgIGBcbiAgICApO1xuXG4gICAgY29uc3Qgb3VyVXVpZCA9IGdldE91clV1aWQoZGIpO1xuXG4gICAgaWYgKCFpc1ZhbGlkVXVpZChvdXJVdWlkKSkge1xuICAgICAgY29uc3QgZGVsZXRlQ291bnQgPSBjbGVhclNlc3Npb25zQW5kS2V5cygpO1xuXG4gICAgICBpZiAoZGVsZXRlQ291bnQgPiAwKSB7XG4gICAgICAgIGxvZ2dlci5lcnJvcihcbiAgICAgICAgICAndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDE6IG5vIHV1aWQgaXMgYXZhaWxhYmxlLCAnICtcbiAgICAgICAgICAgIGBlcmFzZWQgJHtkZWxldGVDb3VudH0gc2Vzc2lvbnMva2V5c2BcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA0MScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHByZWZpeEtleXMob3VyVXVpZCk7XG5cbiAgICB1cGRhdGVTZW5kZXJLZXlzKG91clV1aWQpO1xuXG4gICAgdXBkYXRlU2Vzc2lvbnMob3VyVXVpZCk7XG5cbiAgICBtb3ZlSWRlbnRpdHlLZXlUb01hcChvdXJVdWlkKTtcblxuICAgIHVwZGF0ZUlkZW50aXR5S2V5cygpO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA0MScpO1xuICB9KSgpO1xuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDE6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQSxrQkFBNEI7QUFDNUIsb0JBQTJCO0FBQzNCLHFCQUFvQjtBQUNwQixrQkFBb0Q7QUFJN0Msb0JBQW9CLElBQWtDO0FBQzNELFFBQU0sVUFBdUI7QUFFN0IsUUFBTSxNQUFvQyxHQUN2QyxRQUFlLHdDQUF3QyxFQUN2RCxJQUFJLEVBQUUsSUFBSSxRQUFRLENBQUM7QUFFdEIsTUFBSSxDQUFDLEtBQUs7QUFDUixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxVQUFVLEtBQUssTUFBTSxJQUFJLElBQUk7QUFFckMsUUFBTSxDQUFDLFdBQVcsdUJBQVEsZUFBZSxPQUFPLEtBQUssRUFBRSxZQUFZLENBQUM7QUFDcEUsU0FBTztBQUNUO0FBZmdCLEFBaUJELGlDQUNiLGdCQUNBLElBQ0EsUUFDTTtBQUNOLE1BQUksa0JBQWtCLElB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
