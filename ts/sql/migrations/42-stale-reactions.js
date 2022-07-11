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
var stale_reactions_exports = {};
__export(stale_reactions_exports, {
  default: () => updateToSchemaVersion42
});
module.exports = __toCommonJS(stale_reactions_exports);
var import_util = require("../util");
function updateToSchemaVersion42(currentVersion, db, logger) {
  if (currentVersion >= 42) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      DROP TRIGGER messages_on_delete;

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
      END;
    `);
    const messageIdList = db.prepare("SELECT id FROM messages ORDER BY id ASC;").pluck().all();
    const allReactions = db.prepare("SELECT rowid, messageId FROM reactions;").all();
    const messageIds = new Set(messageIdList);
    const reactionsToDelete = [];
    allReactions.forEach((reaction) => {
      if (!messageIds.has(reaction.messageId)) {
        reactionsToDelete.push(reaction.rowid);
      }
    });
    function deleteReactions(rowids) {
      db.prepare(`
        DELETE FROM reactions
        WHERE rowid IN ( ${rowids.map(() => "?").join(", ")} );
        `).run(rowids);
    }
    if (reactionsToDelete.length > 0) {
      logger.info(`Deleting ${reactionsToDelete.length} orphaned reactions`);
      (0, import_util.batchMultiVarQuery)(db, reactionsToDelete, deleteReactions);
    }
    db.pragma("user_version = 42");
  })();
  logger.info("updateToSchemaVersion42: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDItc3RhbGUtcmVhY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5cbmltcG9ydCB7IGJhdGNoTXVsdGlWYXJRdWVyeSB9IGZyb20gJy4uL3V0aWwnO1xuaW1wb3J0IHR5cGUgeyBBcnJheVF1ZXJ5IH0gZnJvbSAnLi4vdXRpbCc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNDIoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDQyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIC8vIEZpcnN0LCByZWNyZWF0ZSBtZXNzYWdlcyB0YWJsZSBkZWxldGUgdHJpZ2dlciB3aXRoIHJlYWN0aW9uIHN1cHBvcnRcblxuICAgIGRiLmV4ZWMoYFxuICAgICAgRFJPUCBUUklHR0VSIG1lc3NhZ2VzX29uX2RlbGV0ZTtcblxuICAgICAgQ1JFQVRFIFRSSUdHRVIgbWVzc2FnZXNfb25fZGVsZXRlIEFGVEVSIERFTEVURSBPTiBtZXNzYWdlcyBCRUdJTlxuICAgICAgICBERUxFVEUgRlJPTSBtZXNzYWdlc19mdHMgV0hFUkUgcm93aWQgPSBvbGQucm93aWQ7XG4gICAgICAgIERFTEVURSBGUk9NIHNlbmRMb2dQYXlsb2FkcyBXSEVSRSBpZCBJTiAoXG4gICAgICAgICAgU0VMRUNUIHBheWxvYWRJZCBGUk9NIHNlbmRMb2dNZXNzYWdlSWRzXG4gICAgICAgICAgV0hFUkUgbWVzc2FnZUlkID0gb2xkLmlkXG4gICAgICAgICk7XG4gICAgICAgIERFTEVURSBGUk9NIHJlYWN0aW9ucyBXSEVSRSByb3dpZCBJTiAoXG4gICAgICAgICAgU0VMRUNUIHJvd2lkIEZST00gcmVhY3Rpb25zXG4gICAgICAgICAgV0hFUkUgbWVzc2FnZUlkID0gb2xkLmlkXG4gICAgICAgICk7XG4gICAgICBFTkQ7XG4gICAgYCk7XG5cbiAgICAvLyBUaGVuLCBkZWxldGUgcHJldmlvdXNseS1vcnBoYW5lZCByZWFjdGlvbnNcblxuICAgIC8vIE5vdGU6IHdlIHVzZSBgcGx1Y2tgIGhlcmUgdG8gZmV0Y2ggb25seSB0aGUgZmlyc3QgY29sdW1uIG9mXG4gICAgLy8gICByZXR1cm5lZCByb3cuXG4gICAgY29uc3QgbWVzc2FnZUlkTGlzdDogQXJyYXk8c3RyaW5nPiA9IGRiXG4gICAgICAucHJlcGFyZSgnU0VMRUNUIGlkIEZST00gbWVzc2FnZXMgT1JERVIgQlkgaWQgQVNDOycpXG4gICAgICAucGx1Y2soKVxuICAgICAgLmFsbCgpO1xuICAgIGNvbnN0IGFsbFJlYWN0aW9uczogQXJyYXk8e1xuICAgICAgcm93aWQ6IG51bWJlcjtcbiAgICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIH0+ID0gZGIucHJlcGFyZSgnU0VMRUNUIHJvd2lkLCBtZXNzYWdlSWQgRlJPTSByZWFjdGlvbnM7JykuYWxsKCk7XG5cbiAgICBjb25zdCBtZXNzYWdlSWRzID0gbmV3IFNldChtZXNzYWdlSWRMaXN0KTtcbiAgICBjb25zdCByZWFjdGlvbnNUb0RlbGV0ZTogQXJyYXk8bnVtYmVyPiA9IFtdO1xuXG4gICAgYWxsUmVhY3Rpb25zLmZvckVhY2gocmVhY3Rpb24gPT4ge1xuICAgICAgaWYgKCFtZXNzYWdlSWRzLmhhcyhyZWFjdGlvbi5tZXNzYWdlSWQpKSB7XG4gICAgICAgIHJlYWN0aW9uc1RvRGVsZXRlLnB1c2gocmVhY3Rpb24ucm93aWQpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgZnVuY3Rpb24gZGVsZXRlUmVhY3Rpb25zKHJvd2lkczogQXJyYXk8bnVtYmVyPikge1xuICAgICAgZGIucHJlcGFyZTxBcnJheVF1ZXJ5PihcbiAgICAgICAgYFxuICAgICAgICBERUxFVEUgRlJPTSByZWFjdGlvbnNcbiAgICAgICAgV0hFUkUgcm93aWQgSU4gKCAke3Jvd2lkcy5tYXAoKCkgPT4gJz8nKS5qb2luKCcsICcpfSApO1xuICAgICAgICBgXG4gICAgICApLnJ1bihyb3dpZHMpO1xuICAgIH1cblxuICAgIGlmIChyZWFjdGlvbnNUb0RlbGV0ZS5sZW5ndGggPiAwKSB7XG4gICAgICBsb2dnZXIuaW5mbyhgRGVsZXRpbmcgJHtyZWFjdGlvbnNUb0RlbGV0ZS5sZW5ndGh9IG9ycGhhbmVkIHJlYWN0aW9uc2ApO1xuICAgICAgYmF0Y2hNdWx0aVZhclF1ZXJ5KGRiLCByZWFjdGlvbnNUb0RlbGV0ZSwgZGVsZXRlUmVhY3Rpb25zKTtcbiAgICB9XG5cbiAgICBkYi5wcmFnbWEoJ3VzZXJfdmVyc2lvbiA9IDQyJyk7XG4gIH0pKCk7XG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb240Mjogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxrQkFBbUM7QUFJcEIsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUduQixPQUFHLEtBQUs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLEtBY1A7QUFNRCxVQUFNLGdCQUErQixHQUNsQyxRQUFRLDBDQUEwQyxFQUNsRCxNQUFNLEVBQ04sSUFBSTtBQUNQLFVBQU0sZUFHRCxHQUFHLFFBQVEseUNBQXlDLEVBQUUsSUFBSTtBQUUvRCxVQUFNLGFBQWEsSUFBSSxJQUFJLGFBQWE7QUFDeEMsVUFBTSxvQkFBbUMsQ0FBQztBQUUxQyxpQkFBYSxRQUFRLGNBQVk7QUFDL0IsVUFBSSxDQUFDLFdBQVcsSUFBSSxTQUFTLFNBQVMsR0FBRztBQUN2QywwQkFBa0IsS0FBSyxTQUFTLEtBQUs7QUFBQSxNQUN2QztBQUFBLElBQ0YsQ0FBQztBQUVELDZCQUF5QixRQUF1QjtBQUM5QyxTQUFHLFFBQ0Q7QUFBQTtBQUFBLDJCQUVtQixPQUFPLElBQUksTUFBTSxHQUFHLEVBQUUsS0FBSyxJQUFJO0FBQUEsU0FFcEQsRUFBRSxJQUFJLE1BQU07QUFBQSxJQUNkO0FBUFMsQUFTVCxRQUFJLGtCQUFrQixTQUFTLEdBQUc7QUFDaEMsYUFBTyxLQUFLLFlBQVksa0JBQWtCLDJCQUEyQjtBQUNyRSwwQ0FBbUIsSUFBSSxtQkFBbUIsZUFBZTtBQUFBLElBQzNEO0FBRUEsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUNILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUFuRXdCIiwKICAibmFtZXMiOiBbXQp9Cg==
