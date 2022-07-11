var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var stories_exports = {};
__export(stories_exports, {
  default: () => updateToSchemaVersion45
});
module.exports = __toCommonJS(stories_exports);
function updateToSchemaVersion45(currentVersion, db, logger) {
  if (currentVersion >= 45) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      --- Add column to messages table

      ALTER TABLE messages ADD COLUMN storyId STRING;

      --- Update important message indices

      DROP INDEX   messages_conversation;
      CREATE INDEX messages_conversation ON messages
        (conversationId, type, storyId, received_at);

      DROP INDEX   messages_unread;
      CREATE INDEX messages_unread ON messages
        (conversationId, readStatus, type, storyId) WHERE readStatus IS NOT NULL;

      --- Update attachment indices for All Media views

      DROP INDEX   messages_hasAttachments;
      CREATE INDEX messages_hasAttachments
        ON messages (conversationId, hasAttachments, received_at)
        WHERE type IS NOT 'story' AND storyId IS NULL;

      DROP INDEX   messages_hasFileAttachments;
      CREATE INDEX messages_hasFileAttachments
        ON messages (conversationId, hasFileAttachments, received_at)
        WHERE type IS NOT 'story' AND storyId IS NULL;

      DROP INDEX   messages_hasVisualMediaAttachments;
      CREATE INDEX messages_hasVisualMediaAttachments
        ON messages (conversationId, hasVisualMediaAttachments, received_at)
        WHERE type IS NOT 'story' AND storyId IS NULL;

      --- Message insert/update triggers to exclude stories and story replies

      DROP   TRIGGER messages_on_insert;
      CREATE TRIGGER messages_on_insert AFTER INSERT ON messages
      WHEN new.isViewOnce IS NOT 1 AND new.storyId IS NULL
      BEGIN
        INSERT INTO messages_fts
          (rowid, body)
        VALUES
          (new.rowid, new.body);
      END;

      DROP   TRIGGER messages_on_update;
      CREATE TRIGGER messages_on_update AFTER UPDATE ON messages
      WHEN
        (new.body IS NULL OR old.body IS NOT new.body) AND
         new.isViewOnce IS NOT 1 AND new.storyId IS NULL
      BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        INSERT INTO messages_fts
          (rowid, body)
        VALUES
          (new.rowid, new.body);
      END;

      --- Update delete trigger to remove storyReads

      DROP   TRIGGER messages_on_delete;
      CREATE TRIGGER messages_on_delete AFTER DELETE ON messages BEGIN
        DELETE FROM messages_fts WHERE rowid = old.rowid;
        DELETE FROM sendLogPayloads WHERE id IN (
          SELECT payloadId FROM sendLogMessageIds
          WHERE messageId = old.id
        );
        DELETE FROM reactions WHERE rowid IN (
          SELECT rowid FROM reactions
          WHERE messageId = old.id
        );
        DELETE FROM storyReads WHERE storyId = old.storyId;
      END;

      --- Story Read History

      CREATE TABLE storyReads (
        authorId STRING NOT NULL,
        conversationId STRING NOT NULL,
        storyId STRING NOT NULL,
        storyReadDate NUMBER NOT NULL,

        PRIMARY KEY (authorId, storyId)
      );

      CREATE INDEX storyReads_data ON storyReads (
        storyReadDate, authorId, conversationId
      );

      --- Story Distribution Lists

      CREATE TABLE storyDistributions(
        id STRING PRIMARY KEY NOT NULL,
        name TEXT,

        avatarUrlPath TEXT,
        avatarKey BLOB,
        senderKeyInfoJson STRING
      );

      CREATE TABLE storyDistributionMembers(
        listId STRING NOT NULL REFERENCES storyDistributions(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        uuid STRING NOT NULL,

        PRIMARY KEY (listId, uuid)
      )
      `);
    db.pragma("user_version = 45");
  })();
  logger.info("updateToSchemaVersion45: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDUtc3Rvcmllcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IERhdGFiYXNlIH0gZnJvbSAnYmV0dGVyLXNxbGl0ZTMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDUoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDQ1KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAtLS0gQWRkIGNvbHVtbiB0byBtZXNzYWdlcyB0YWJsZVxuXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlcyBBREQgQ09MVU1OIHN0b3J5SWQgU1RSSU5HO1xuXG4gICAgICAtLS0gVXBkYXRlIGltcG9ydGFudCBtZXNzYWdlIGluZGljZXNcblxuICAgICAgRFJPUCBJTkRFWCAgIG1lc3NhZ2VzX2NvbnZlcnNhdGlvbjtcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19jb252ZXJzYXRpb24gT04gbWVzc2FnZXNcbiAgICAgICAgKGNvbnZlcnNhdGlvbklkLCB0eXBlLCBzdG9yeUlkLCByZWNlaXZlZF9hdCk7XG5cbiAgICAgIERST1AgSU5ERVggICBtZXNzYWdlc191bnJlYWQ7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfdW5yZWFkIE9OIG1lc3NhZ2VzXG4gICAgICAgIChjb252ZXJzYXRpb25JZCwgcmVhZFN0YXR1cywgdHlwZSwgc3RvcnlJZCkgV0hFUkUgcmVhZFN0YXR1cyBJUyBOT1QgTlVMTDtcblxuICAgICAgLS0tIFVwZGF0ZSBhdHRhY2htZW50IGluZGljZXMgZm9yIEFsbCBNZWRpYSB2aWV3c1xuXG4gICAgICBEUk9QIElOREVYICAgbWVzc2FnZXNfaGFzQXR0YWNobWVudHM7XG4gICAgICBDUkVBVEUgSU5ERVggbWVzc2FnZXNfaGFzQXR0YWNobWVudHNcbiAgICAgICAgT04gbWVzc2FnZXMgKGNvbnZlcnNhdGlvbklkLCBoYXNBdHRhY2htZW50cywgcmVjZWl2ZWRfYXQpXG4gICAgICAgIFdIRVJFIHR5cGUgSVMgTk9UICdzdG9yeScgQU5EIHN0b3J5SWQgSVMgTlVMTDtcblxuICAgICAgRFJPUCBJTkRFWCAgIG1lc3NhZ2VzX2hhc0ZpbGVBdHRhY2htZW50cztcbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc19oYXNGaWxlQXR0YWNobWVudHNcbiAgICAgICAgT04gbWVzc2FnZXMgKGNvbnZlcnNhdGlvbklkLCBoYXNGaWxlQXR0YWNobWVudHMsIHJlY2VpdmVkX2F0KVxuICAgICAgICBXSEVSRSB0eXBlIElTIE5PVCAnc3RvcnknIEFORCBzdG9yeUlkIElTIE5VTEw7XG5cbiAgICAgIERST1AgSU5ERVggICBtZXNzYWdlc19oYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzO1xuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX2hhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHNcbiAgICAgICAgT04gbWVzc2FnZXMgKGNvbnZlcnNhdGlvbklkLCBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzLCByZWNlaXZlZF9hdClcbiAgICAgICAgV0hFUkUgdHlwZSBJUyBOT1QgJ3N0b3J5JyBBTkQgc3RvcnlJZCBJUyBOVUxMO1xuXG4gICAgICAtLS0gTWVzc2FnZSBpbnNlcnQvdXBkYXRlIHRyaWdnZXJzIHRvIGV4Y2x1ZGUgc3RvcmllcyBhbmQgc3RvcnkgcmVwbGllc1xuXG4gICAgICBEUk9QICAgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQ7XG4gICAgICBDUkVBVEUgVFJJR0dFUiBtZXNzYWdlc19vbl9pbnNlcnQgQUZURVIgSU5TRVJUIE9OIG1lc3NhZ2VzXG4gICAgICBXSEVOIG5ldy5pc1ZpZXdPbmNlIElTIE5PVCAxIEFORCBuZXcuc3RvcnlJZCBJUyBOVUxMXG4gICAgICBCRUdJTlxuICAgICAgICBJTlNFUlQgSU5UTyBtZXNzYWdlc19mdHNcbiAgICAgICAgICAocm93aWQsIGJvZHkpXG4gICAgICAgIFZBTFVFU1xuICAgICAgICAgIChuZXcucm93aWQsIG5ldy5ib2R5KTtcbiAgICAgIEVORDtcblxuICAgICAgRFJPUCAgIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlO1xuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fdXBkYXRlIEFGVEVSIFVQREFURSBPTiBtZXNzYWdlc1xuICAgICAgV0hFTlxuICAgICAgICAobmV3LmJvZHkgSVMgTlVMTCBPUiBvbGQuYm9keSBJUyBOT1QgbmV3LmJvZHkpIEFORFxuICAgICAgICAgbmV3LmlzVmlld09uY2UgSVMgTk9UIDEgQU5EIG5ldy5zdG9yeUlkIElTIE5VTExcbiAgICAgIEJFR0lOXG4gICAgICAgIERFTEVURSBGUk9NIG1lc3NhZ2VzX2Z0cyBXSEVSRSByb3dpZCA9IG9sZC5yb3dpZDtcbiAgICAgICAgSU5TRVJUIElOVE8gbWVzc2FnZXNfZnRzXG4gICAgICAgICAgKHJvd2lkLCBib2R5KVxuICAgICAgICBWQUxVRVNcbiAgICAgICAgICAobmV3LnJvd2lkLCBuZXcuYm9keSk7XG4gICAgICBFTkQ7XG5cbiAgICAgIC0tLSBVcGRhdGUgZGVsZXRlIHRyaWdnZXIgdG8gcmVtb3ZlIHN0b3J5UmVhZHNcblxuICAgICAgRFJPUCAgIFRSSUdHRVIgbWVzc2FnZXNfb25fZGVsZXRlO1xuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fZGVsZXRlIEFGVEVSIERFTEVURSBPTiBtZXNzYWdlcyBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgcm93aWQgPSBvbGQucm93aWQ7XG4gICAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dQYXlsb2FkcyBXSEVSRSBpZCBJTiAoXG4gICAgICAgICAgU0VMRUNUIHBheWxvYWRJZCBGUk9NIHNlbmRMb2dNZXNzYWdlSWRzXG4gICAgICAgICAgV0hFUkUgbWVzc2FnZUlkID0gb2xkLmlkXG4gICAgICAgICk7XG4gICAgICAgIERFTEVURSBGUk9NIHJlYWN0aW9ucyBXSEVSRSByb3dpZCBJTiAoXG4gICAgICAgICAgU0VMRUNUIHJvd2lkIEZST00gcmVhY3Rpb25zXG4gICAgICAgICAgV0hFUkUgbWVzc2FnZUlkID0gb2xkLmlkXG4gICAgICAgICk7XG4gICAgICAgIERFTEVURSBGUk9NIHN0b3J5UmVhZHMgV0hFUkUgc3RvcnlJZCA9IG9sZC5zdG9yeUlkO1xuICAgICAgRU5EO1xuXG4gICAgICAtLS0gU3RvcnkgUmVhZCBIaXN0b3J5XG5cbiAgICAgIENSRUFURSBUQUJMRSBzdG9yeVJlYWRzIChcbiAgICAgICAgYXV0aG9ySWQgU1RSSU5HIE5PVCBOVUxMLFxuICAgICAgICBjb252ZXJzYXRpb25JZCBTVFJJTkcgTk9UIE5VTEwsXG4gICAgICAgIHN0b3J5SWQgU1RSSU5HIE5PVCBOVUxMLFxuICAgICAgICBzdG9yeVJlYWREYXRlIE5VTUJFUiBOT1QgTlVMTCxcblxuICAgICAgICBQUklNQVJZIEtFWSAoYXV0aG9ySWQsIHN0b3J5SWQpXG4gICAgICApO1xuXG4gICAgICBDUkVBVEUgSU5ERVggc3RvcnlSZWFkc19kYXRhIE9OIHN0b3J5UmVhZHMgKFxuICAgICAgICBzdG9yeVJlYWREYXRlLCBhdXRob3JJZCwgY29udmVyc2F0aW9uSWRcbiAgICAgICk7XG5cbiAgICAgIC0tLSBTdG9yeSBEaXN0cmlidXRpb24gTGlzdHNcblxuICAgICAgQ1JFQVRFIFRBQkxFIHN0b3J5RGlzdHJpYnV0aW9ucyhcbiAgICAgICAgaWQgU1RSSU5HIFBSSU1BUlkgS0VZIE5PVCBOVUxMLFxuICAgICAgICBuYW1lIFRFWFQsXG5cbiAgICAgICAgYXZhdGFyVXJsUGF0aCBURVhULFxuICAgICAgICBhdmF0YXJLZXkgQkxPQixcbiAgICAgICAgc2VuZGVyS2V5SW5mb0pzb24gU1RSSU5HXG4gICAgICApO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgc3RvcnlEaXN0cmlidXRpb25NZW1iZXJzKFxuICAgICAgICBsaXN0SWQgU1RSSU5HIE5PVCBOVUxMIFJFRkVSRU5DRVMgc3RvcnlEaXN0cmlidXRpb25zKGlkKVxuICAgICAgICAgIE9OIERFTEVURSBDQVNDQURFXG4gICAgICAgICAgT04gVVBEQVRFIENBU0NBREUsXG4gICAgICAgIHV1aWQgU1RSSU5HIE5PVCBOVUxMLFxuXG4gICAgICAgIFBSSU1BUlkgS0VZIChsaXN0SWQsIHV1aWQpXG4gICAgICApXG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNDUnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDU6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT2UsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9BNEdGO0FBRUEsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUVILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUE3SHdCIiwKICAibmFtZXMiOiBbXQp9Cg==
