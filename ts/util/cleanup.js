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
var cleanup_exports = {};
__export(cleanup_exports, {
  cleanupMessage: () => cleanupMessage,
  deleteMessageData: () => deleteMessageData
});
module.exports = __toCommonJS(cleanup_exports);
var import_Stickers = require("../types/Stickers");
async function cleanupMessage(message) {
  const { id, conversationId } = message;
  window.reduxActions?.conversations.messageDeleted(id, conversationId);
  const parentConversation = window.ConversationController.get(conversationId);
  parentConversation?.debouncedUpdateLastMessage?.();
  window.MessageController.unregister(id);
  await deleteMessageData(message);
}
async function deleteMessageData(message) {
  await window.Signal.Migrations.deleteExternalMessageFiles(message);
  const { sticker } = message;
  if (!sticker) {
    return;
  }
  const { packId } = sticker;
  if (packId) {
    await (0, import_Stickers.deletePackReference)(message.id, packId);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  cleanupMessage,
  deleteMessageData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2xlYW51cC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHsgZGVsZXRlUGFja1JlZmVyZW5jZSB9IGZyb20gJy4uL3R5cGVzL1N0aWNrZXJzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNsZWFudXBNZXNzYWdlKFxuICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGVcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCB9ID0gbWVzc2FnZTtcblxuICB3aW5kb3cucmVkdXhBY3Rpb25zPy5jb252ZXJzYXRpb25zLm1lc3NhZ2VEZWxldGVkKGlkLCBjb252ZXJzYXRpb25JZCk7XG5cbiAgY29uc3QgcGFyZW50Q29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgcGFyZW50Q29udmVyc2F0aW9uPy5kZWJvdW5jZWRVcGRhdGVMYXN0TWVzc2FnZT8uKCk7XG5cbiAgd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnVucmVnaXN0ZXIoaWQpO1xuXG4gIGF3YWl0IGRlbGV0ZU1lc3NhZ2VEYXRhKG1lc3NhZ2UpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZGVsZXRlTWVzc2FnZURhdGEoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVFeHRlcm5hbE1lc3NhZ2VGaWxlcyhtZXNzYWdlKTtcblxuICBjb25zdCB7IHN0aWNrZXIgfSA9IG1lc3NhZ2U7XG4gIGlmICghc3RpY2tlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgcGFja0lkIH0gPSBzdGlja2VyO1xuICBpZiAocGFja0lkKSB7XG4gICAgYXdhaXQgZGVsZXRlUGFja1JlZmVyZW5jZShtZXNzYWdlLmlkLCBwYWNrSWQpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxzQkFBb0M7QUFFcEMsOEJBQ0UsU0FDZTtBQUNmLFFBQU0sRUFBRSxJQUFJLG1CQUFtQjtBQUUvQixTQUFPLGNBQWMsY0FBYyxlQUFlLElBQUksY0FBYztBQUVwRSxRQUFNLHFCQUFxQixPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDM0Usc0JBQW9CLDZCQUE2QjtBQUVqRCxTQUFPLGtCQUFrQixXQUFXLEVBQUU7QUFFdEMsUUFBTSxrQkFBa0IsT0FBTztBQUNqQztBQWJzQixBQWV0QixpQ0FDRSxTQUNlO0FBQ2YsUUFBTSxPQUFPLE9BQU8sV0FBVywyQkFBMkIsT0FBTztBQUVqRSxRQUFNLEVBQUUsWUFBWTtBQUNwQixNQUFJLENBQUMsU0FBUztBQUNaO0FBQUEsRUFDRjtBQUVBLFFBQU0sRUFBRSxXQUFXO0FBQ25CLE1BQUksUUFBUTtBQUNWLFVBQU0seUNBQW9CLFFBQVEsSUFBSSxNQUFNO0FBQUEsRUFDOUM7QUFDRjtBQWRzQiIsCiAgIm5hbWVzIjogW10KfQo=
