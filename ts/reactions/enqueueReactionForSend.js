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
var enqueueReactionForSend_exports = {};
__export(enqueueReactionForSend_exports, {
  enqueueReactionForSend: () => enqueueReactionForSend
});
module.exports = __toCommonJS(enqueueReactionForSend_exports);
var import_Reactions = require("../messageModifiers/Reactions");
var import_ReactionSource = require("./ReactionSource");
var import_getMessageById = require("../messages/getMessageById");
var import_helpers = require("../messages/helpers");
var import_assert = require("../util/assert");
async function enqueueReactionForSend({
  emoji,
  messageId,
  remove
}) {
  const message = await (0, import_getMessageById.getMessageById)(messageId);
  (0, import_assert.strictAssert)(message, "enqueueReactionForSend: no message found");
  const targetAuthorUuid = (0, import_helpers.getSourceUuid)(message.attributes);
  (0, import_assert.strictAssert)(targetAuthorUuid, `enqueueReactionForSend: message ${message.idForLogging()} had no source UUID`);
  const targetTimestamp = message.get("sent_at") || message.get("timestamp");
  (0, import_assert.strictAssert)(targetTimestamp, `enqueueReactionForSend: message ${message.idForLogging()} had no timestamp`);
  const reaction = new import_Reactions.ReactionModel({
    emoji,
    remove,
    targetAuthorUuid,
    targetTimestamp,
    fromId: window.ConversationController.getOurConversationIdOrThrow(),
    timestamp: Date.now(),
    source: import_ReactionSource.ReactionSource.FromThisDevice
  });
  await message.handleReaction(reaction);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  enqueueReactionForSend
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBSZWFjdGlvbk1vZGVsIH0gZnJvbSAnLi4vbWVzc2FnZU1vZGlmaWVycy9SZWFjdGlvbnMnO1xuaW1wb3J0IHsgUmVhY3Rpb25Tb3VyY2UgfSBmcm9tICcuL1JlYWN0aW9uU291cmNlJztcbmltcG9ydCB7IGdldE1lc3NhZ2VCeUlkIH0gZnJvbSAnLi4vbWVzc2FnZXMvZ2V0TWVzc2FnZUJ5SWQnO1xuaW1wb3J0IHsgZ2V0U291cmNlVXVpZCB9IGZyb20gJy4uL21lc3NhZ2VzL2hlbHBlcnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZCh7XG4gIGVtb2ppLFxuICBtZXNzYWdlSWQsXG4gIHJlbW92ZSxcbn06IFJlYWRvbmx5PHtcbiAgZW1vamk6IHN0cmluZztcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIHJlbW92ZTogYm9vbGVhbjtcbn0+KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuICBzdHJpY3RBc3NlcnQobWVzc2FnZSwgJ2VucXVldWVSZWFjdGlvbkZvclNlbmQ6IG5vIG1lc3NhZ2UgZm91bmQnKTtcblxuICBjb25zdCB0YXJnZXRBdXRob3JVdWlkID0gZ2V0U291cmNlVXVpZChtZXNzYWdlLmF0dHJpYnV0ZXMpO1xuICBzdHJpY3RBc3NlcnQoXG4gICAgdGFyZ2V0QXV0aG9yVXVpZCxcbiAgICBgZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZDogbWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9IGhhZCBubyBzb3VyY2UgVVVJRGBcbiAgKTtcblxuICBjb25zdCB0YXJnZXRUaW1lc3RhbXAgPSBtZXNzYWdlLmdldCgnc2VudF9hdCcpIHx8IG1lc3NhZ2UuZ2V0KCd0aW1lc3RhbXAnKTtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHRhcmdldFRpbWVzdGFtcCxcbiAgICBgZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZDogbWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9IGhhZCBubyB0aW1lc3RhbXBgXG4gICk7XG5cbiAgY29uc3QgcmVhY3Rpb24gPSBuZXcgUmVhY3Rpb25Nb2RlbCh7XG4gICAgZW1vamksXG4gICAgcmVtb3ZlLFxuICAgIHRhcmdldEF1dGhvclV1aWQsXG4gICAgdGFyZ2V0VGltZXN0YW1wLFxuICAgIGZyb21JZDogd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWRPclRocm93KCksXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIHNvdXJjZTogUmVhY3Rpb25Tb3VyY2UuRnJvbVRoaXNEZXZpY2UsXG4gIH0pO1xuXG4gIGF3YWl0IG1lc3NhZ2UuaGFuZGxlUmVhY3Rpb24ocmVhY3Rpb24pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHVCQUE4QjtBQUM5Qiw0QkFBK0I7QUFDL0IsNEJBQStCO0FBQy9CLHFCQUE4QjtBQUM5QixvQkFBNkI7QUFFN0Isc0NBQTZDO0FBQUEsRUFDM0M7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBS2lCO0FBQ2pCLFFBQU0sVUFBVSxNQUFNLDBDQUFlLFNBQVM7QUFDOUMsa0NBQWEsU0FBUywwQ0FBMEM7QUFFaEUsUUFBTSxtQkFBbUIsa0NBQWMsUUFBUSxVQUFVO0FBQ3pELGtDQUNFLGtCQUNBLG1DQUFtQyxRQUFRLGFBQWEsc0JBQzFEO0FBRUEsUUFBTSxrQkFBa0IsUUFBUSxJQUFJLFNBQVMsS0FBSyxRQUFRLElBQUksV0FBVztBQUN6RSxrQ0FDRSxpQkFDQSxtQ0FBbUMsUUFBUSxhQUFhLG9CQUMxRDtBQUVBLFFBQU0sV0FBVyxJQUFJLCtCQUFjO0FBQUEsSUFDakM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFFBQVEsT0FBTyx1QkFBdUIsNEJBQTRCO0FBQUEsSUFDbEUsV0FBVyxLQUFLLElBQUk7QUFBQSxJQUNwQixRQUFRLHFDQUFlO0FBQUEsRUFDekIsQ0FBQztBQUVELFFBQU0sUUFBUSxlQUFlLFFBQVE7QUFDdkM7QUFuQ3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
