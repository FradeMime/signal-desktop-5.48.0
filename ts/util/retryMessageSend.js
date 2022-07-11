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
var retryMessageSend_exports = {};
__export(retryMessageSend_exports, {
  retryMessageSend: () => retryMessageSend
});
module.exports = __toCommonJS(retryMessageSend_exports);
async function retryMessageSend(messageId) {
  const message = window.MessageController.getById(messageId);
  if (!message) {
    throw new Error(`retryMessageSend: Message ${messageId} missing!`);
  }
  await message.retrySend();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  retryMessageSend
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmV0cnlNZXNzYWdlU2VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gcmV0cnlNZXNzYWdlU2VuZChtZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobWVzc2FnZUlkKTtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGByZXRyeU1lc3NhZ2VTZW5kOiBNZXNzYWdlICR7bWVzc2FnZUlkfSBtaXNzaW5nIWApO1xuICB9XG4gIGF3YWl0IG1lc3NhZ2UucmV0cnlTZW5kKCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0NBQXVDLFdBQWtDO0FBQ3ZFLFFBQU0sVUFBVSxPQUFPLGtCQUFrQixRQUFRLFNBQVM7QUFDMUQsTUFBSSxDQUFDLFNBQVM7QUFDWixVQUFNLElBQUksTUFBTSw2QkFBNkIsb0JBQW9CO0FBQUEsRUFDbkU7QUFDQSxRQUFNLFFBQVEsVUFBVTtBQUMxQjtBQU5zQiIsCiAgIm5hbWVzIjogW10KfQo=
