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
var add_unseen_to_message_exports = {};
__export(add_unseen_to_message_exports, {
  default: () => updateToSchemaVersion56
});
module.exports = __toCommonJS(add_unseen_to_message_exports);
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_MessageSeenStatus = require("../../MessageSeenStatus");
function updateToSchemaVersion56(currentVersion, db, logger) {
  if (currentVersion >= 56) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      --- Add column to messages table

      ALTER TABLE messages ADD COLUMN seenStatus NUMBER default 0;

      --- Add index to make searching on this field easy

      CREATE INDEX messages_unseen_no_story ON messages
        (conversationId, seenStatus, isStory, received_at, sent_at)
        WHERE
          seenStatus IS NOT NULL;

      CREATE INDEX messages_unseen_with_story ON messages
        (conversationId, seenStatus, isStory, storyId, received_at, sent_at)
        WHERE
          seenStatus IS NOT NULL;

      --- Update seenStatus to UnseenStatus.Unseen for certain messages
      --- (NULL included because 'timer-notification' in 1:1 convos had type = NULL)

      UPDATE messages
        SET
          seenStatus = ${import_MessageSeenStatus.SeenStatus.Unseen}
        WHERE
          readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
          (
            type IS NULL
            OR
            type IN (
              'call-history',
              'change-number-notification',
              'chat-session-refreshed',
              'delivery-issue',
              'group',
              'incoming',
              'keychange',
              'timer-notification',
              'verified-change'
            )
          );

      --- Set readStatus to ReadStatus.Read for all other message types

      UPDATE messages
        SET
          readStatus = ${import_MessageReadStatus.ReadStatus.Read}
        WHERE
          readStatus = ${import_MessageReadStatus.ReadStatus.Unread} AND
          type IS NOT NULL AND
          type NOT IN (
            'call-history',
            'change-number-notification',
            'chat-session-refreshed',
            'delivery-issue',
            'group',
            'incoming',
            'keychange',
            'timer-notification',
            'verified-change'
          );
      `);
    db.pragma("user_version = 56");
  })();
  logger.info("updateToSchemaVersion56: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNTYtYWRkLXVuc2Vlbi10by1tZXNzYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEYXRhYmFzZSB9IGZyb20gJ2JldHRlci1zcWxpdGUzJztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgeyBTZWVuU3RhdHVzIH0gZnJvbSAnLi4vLi4vTWVzc2FnZVNlZW5TdGF0dXMnO1xuXG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gdXBkYXRlVG9TY2hlbWFWZXJzaW9uNTYoXG4gIGN1cnJlbnRWZXJzaW9uOiBudW1iZXIsXG4gIGRiOiBEYXRhYmFzZSxcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlXG4pOiB2b2lkIHtcbiAgaWYgKGN1cnJlbnRWZXJzaW9uID49IDU2KSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgZGIudHJhbnNhY3Rpb24oKCkgPT4ge1xuICAgIGRiLmV4ZWMoXG4gICAgICBgXG4gICAgICAtLS0gQWRkIGNvbHVtbiB0byBtZXNzYWdlcyB0YWJsZVxuXG4gICAgICBBTFRFUiBUQUJMRSBtZXNzYWdlcyBBREQgQ09MVU1OIHNlZW5TdGF0dXMgTlVNQkVSIGRlZmF1bHQgMDtcblxuICAgICAgLS0tIEFkZCBpbmRleCB0byBtYWtlIHNlYXJjaGluZyBvbiB0aGlzIGZpZWxkIGVhc3lcblxuICAgICAgQ1JFQVRFIElOREVYIG1lc3NhZ2VzX3Vuc2Vlbl9ub19zdG9yeSBPTiBtZXNzYWdlc1xuICAgICAgICAoY29udmVyc2F0aW9uSWQsIHNlZW5TdGF0dXMsIGlzU3RvcnksIHJlY2VpdmVkX2F0LCBzZW50X2F0KVxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHNlZW5TdGF0dXMgSVMgTk9UIE5VTEw7XG5cbiAgICAgIENSRUFURSBJTkRFWCBtZXNzYWdlc191bnNlZW5fd2l0aF9zdG9yeSBPTiBtZXNzYWdlc1xuICAgICAgICAoY29udmVyc2F0aW9uSWQsIHNlZW5TdGF0dXMsIGlzU3RvcnksIHN0b3J5SWQsIHJlY2VpdmVkX2F0LCBzZW50X2F0KVxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHNlZW5TdGF0dXMgSVMgTk9UIE5VTEw7XG5cbiAgICAgIC0tLSBVcGRhdGUgc2VlblN0YXR1cyB0byBVbnNlZW5TdGF0dXMuVW5zZWVuIGZvciBjZXJ0YWluIG1lc3NhZ2VzXG4gICAgICAtLS0gKE5VTEwgaW5jbHVkZWQgYmVjYXVzZSAndGltZXItbm90aWZpY2F0aW9uJyBpbiAxOjEgY29udm9zIGhhZCB0eXBlID0gTlVMTClcblxuICAgICAgVVBEQVRFIG1lc3NhZ2VzXG4gICAgICAgIFNFVFxuICAgICAgICAgIHNlZW5TdGF0dXMgPSAke1NlZW5TdGF0dXMuVW5zZWVufVxuICAgICAgICBXSEVSRVxuICAgICAgICAgIHJlYWRTdGF0dXMgPSAke1JlYWRTdGF0dXMuVW5yZWFkfSBBTkRcbiAgICAgICAgICAoXG4gICAgICAgICAgICB0eXBlIElTIE5VTExcbiAgICAgICAgICAgIE9SXG4gICAgICAgICAgICB0eXBlIElOIChcbiAgICAgICAgICAgICAgJ2NhbGwtaGlzdG9yeScsXG4gICAgICAgICAgICAgICdjaGFuZ2UtbnVtYmVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgICAgICAgICdjaGF0LXNlc3Npb24tcmVmcmVzaGVkJyxcbiAgICAgICAgICAgICAgJ2RlbGl2ZXJ5LWlzc3VlJyxcbiAgICAgICAgICAgICAgJ2dyb3VwJyxcbiAgICAgICAgICAgICAgJ2luY29taW5nJyxcbiAgICAgICAgICAgICAgJ2tleWNoYW5nZScsXG4gICAgICAgICAgICAgICd0aW1lci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgICAndmVyaWZpZWQtY2hhbmdlJ1xuICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG5cbiAgICAgIC0tLSBTZXQgcmVhZFN0YXR1cyB0byBSZWFkU3RhdHVzLlJlYWQgZm9yIGFsbCBvdGhlciBtZXNzYWdlIHR5cGVzXG5cbiAgICAgIFVQREFURSBtZXNzYWdlc1xuICAgICAgICBTRVRcbiAgICAgICAgICByZWFkU3RhdHVzID0gJHtSZWFkU3RhdHVzLlJlYWR9XG4gICAgICAgIFdIRVJFXG4gICAgICAgICAgcmVhZFN0YXR1cyA9ICR7UmVhZFN0YXR1cy5VbnJlYWR9IEFORFxuICAgICAgICAgIHR5cGUgSVMgTk9UIE5VTEwgQU5EXG4gICAgICAgICAgdHlwZSBOT1QgSU4gKFxuICAgICAgICAgICAgJ2NhbGwtaGlzdG9yeScsXG4gICAgICAgICAgICAnY2hhbmdlLW51bWJlci1ub3RpZmljYXRpb24nLFxuICAgICAgICAgICAgJ2NoYXQtc2Vzc2lvbi1yZWZyZXNoZWQnLFxuICAgICAgICAgICAgJ2RlbGl2ZXJ5LWlzc3VlJyxcbiAgICAgICAgICAgICdncm91cCcsXG4gICAgICAgICAgICAnaW5jb21pbmcnLFxuICAgICAgICAgICAgJ2tleWNoYW5nZScsXG4gICAgICAgICAgICAndGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgICAgICd2ZXJpZmllZC1jaGFuZ2UnXG4gICAgICAgICAgKTtcbiAgICAgIGBcbiAgICApO1xuXG4gICAgZGIucHJhZ21hKCd1c2VyX3ZlcnNpb24gPSA1NicpO1xuICB9KSgpO1xuXG4gIGxvZ2dlci5pbmZvKCd1cGRhdGVUb1NjaGVtYVZlcnNpb241Njogc3VjY2VzcyEnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSwrQkFBMkI7QUFDM0IsK0JBQTJCO0FBSVosaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFzQm1CLG9DQUFXO0FBQUE7QUFBQSx5QkFFWCxvQ0FBVztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQSx5QkFxQlgsb0NBQVc7QUFBQTtBQUFBLHlCQUVYLG9DQUFXO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsT0FjaEM7QUFFQSxPQUFHLE9BQU8sbUJBQW1CO0FBQUEsRUFDL0IsQ0FBQyxFQUFFO0FBRUgsU0FBTyxLQUFLLG1DQUFtQztBQUNqRDtBQTlFd0IiLAogICJuYW1lcyI6IFtdCn0K
