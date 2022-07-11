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
var reloadSelectedConversation_exports = {};
__export(reloadSelectedConversation_exports, {
  reloadSelectedConversation: () => reloadSelectedConversation
});
module.exports = __toCommonJS(reloadSelectedConversation_exports);
function reloadSelectedConversation() {
  const { conversations } = window.reduxStore.getState();
  const { selectedConversationId } = conversations;
  if (!selectedConversationId) {
    return;
  }
  const conversation = window.ConversationController.get(selectedConversationId);
  if (!conversation) {
    return;
  }
  conversation.cachedProps = void 0;
  window.reduxActions.conversations.conversationChanged(conversation.id, conversation.format());
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  reloadSelectedConversation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmVsb2FkU2VsZWN0ZWRDb252ZXJzYXRpb24udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZXhwb3J0IGZ1bmN0aW9uIHJlbG9hZFNlbGVjdGVkQ29udmVyc2F0aW9uKCk6IHZvaWQge1xuICBjb25zdCB7IGNvbnZlcnNhdGlvbnMgfSA9IHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCk7XG4gIGNvbnN0IHsgc2VsZWN0ZWRDb252ZXJzYXRpb25JZCB9ID0gY29udmVyc2F0aW9ucztcbiAgaWYgKCFzZWxlY3RlZENvbnZlcnNhdGlvbklkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkXG4gICk7XG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnZlcnNhdGlvbi5jYWNoZWRQcm9wcyA9IHVuZGVmaW5lZDtcbiAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLmNvbnZlcnNhdGlvbkNoYW5nZWQoXG4gICAgY29udmVyc2F0aW9uLmlkLFxuICAgIGNvbnZlcnNhdGlvbi5mb3JtYXQoKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLHNDQUE0QztBQUNqRCxRQUFNLEVBQUUsa0JBQWtCLE9BQU8sV0FBVyxTQUFTO0FBQ3JELFFBQU0sRUFBRSwyQkFBMkI7QUFDbkMsTUFBSSxDQUFDLHdCQUF3QjtBQUMzQjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLGVBQWUsT0FBTyx1QkFBdUIsSUFDakQsc0JBQ0Y7QUFDQSxNQUFJLENBQUMsY0FBYztBQUNqQjtBQUFBLEVBQ0Y7QUFDQSxlQUFhLGNBQWM7QUFDM0IsU0FBTyxhQUFhLGNBQWMsb0JBQ2hDLGFBQWEsSUFDYixhQUFhLE9BQU8sQ0FDdEI7QUFDRjtBQWpCZ0IiLAogICJuYW1lcyI6IFtdCn0K
