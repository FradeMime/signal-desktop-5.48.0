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
var getConversationUnreadCountForAppBadge_exports = {};
__export(getConversationUnreadCountForAppBadge_exports, {
  getConversationUnreadCountForAppBadge: () => getConversationUnreadCountForAppBadge
});
module.exports = __toCommonJS(getConversationUnreadCountForAppBadge_exports);
var import_isConversationMuted = require("./isConversationMuted");
function getConversationUnreadCountForAppBadge(conversation, canCountMutedConversations) {
  const { isArchived, markedUnread, unreadCount } = conversation;
  if (!conversation.active_at) {
    return 0;
  }
  if (isArchived) {
    return 0;
  }
  if (!canCountMutedConversations && (0, import_isConversationMuted.isConversationMuted)(conversation)) {
    return 0;
  }
  if (unreadCount) {
    return unreadCount;
  }
  if (markedUnread) {
    return 1;
  }
  return 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getConversationUnreadCountForAppBadge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0Q29udmVyc2F0aW9uVW5yZWFkQ291bnRGb3JBcHBCYWRnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbk11dGVkIH0gZnJvbSAnLi9pc0NvbnZlcnNhdGlvbk11dGVkJztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnZlcnNhdGlvblVucmVhZENvdW50Rm9yQXBwQmFkZ2UoXG4gIGNvbnZlcnNhdGlvbjogUmVhZG9ubHk8XG4gICAgUGljazxcbiAgICAgIENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICAgICAgfCAnYWN0aXZlX2F0J1xuICAgICAgfCAnaXNBcmNoaXZlZCdcbiAgICAgIHwgJ21hcmtlZFVucmVhZCdcbiAgICAgIHwgJ211dGVFeHBpcmVzQXQnXG4gICAgICB8ICd1bnJlYWRDb3VudCdcbiAgICA+XG4gID4sXG4gIGNhbkNvdW50TXV0ZWRDb252ZXJzYXRpb25zOiBib29sZWFuXG4pOiBudW1iZXIge1xuICBjb25zdCB7IGlzQXJjaGl2ZWQsIG1hcmtlZFVucmVhZCwgdW5yZWFkQ291bnQgfSA9IGNvbnZlcnNhdGlvbjtcblxuICBpZiAoIWNvbnZlcnNhdGlvbi5hY3RpdmVfYXQpIHtcbiAgICByZXR1cm4gMDtcbiAgfVxuXG4gIGlmIChpc0FyY2hpdmVkKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBpZiAoIWNhbkNvdW50TXV0ZWRDb252ZXJzYXRpb25zICYmIGlzQ29udmVyc2F0aW9uTXV0ZWQoY29udmVyc2F0aW9uKSkge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKHVucmVhZENvdW50KSB7XG4gICAgcmV0dXJuIHVucmVhZENvdW50O1xuICB9XG5cbiAgaWYgKG1hcmtlZFVucmVhZCkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgcmV0dXJuIDA7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsaUNBQW9DO0FBRTdCLCtDQUNMLGNBVUEsNEJBQ1E7QUFDUixRQUFNLEVBQUUsWUFBWSxjQUFjLGdCQUFnQjtBQUVsRCxNQUFJLENBQUMsYUFBYSxXQUFXO0FBQzNCLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxZQUFZO0FBQ2QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLENBQUMsOEJBQThCLG9EQUFvQixZQUFZLEdBQUc7QUFDcEUsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLGFBQWE7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksY0FBYztBQUNoQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQXBDZ0IiLAogICJuYW1lcyI6IFtdCn0K
