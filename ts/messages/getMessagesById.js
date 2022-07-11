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
var getMessagesById_exports = {};
__export(getMessagesById_exports, {
  getMessagesById: () => getMessagesById
});
module.exports = __toCommonJS(getMessagesById_exports);
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
async function getMessagesById(messageIds) {
  const messagesFromMemory = [];
  const messageIdsToLookUpInDatabase = [];
  for (const messageId of messageIds) {
    const message = window.MessageController.getById(messageId);
    if (message) {
      messagesFromMemory.push(message);
    } else {
      messageIdsToLookUpInDatabase.push(messageId);
    }
  }
  let rawMessagesFromDatabase;
  try {
    rawMessagesFromDatabase = await window.Signal.Data.getMessagesById(messageIdsToLookUpInDatabase);
  } catch (err) {
    log.error(`failed to load ${messageIdsToLookUpInDatabase.length} message(s) from database. ${Errors.toLogFormat(err)}`);
    return [];
  }
  const messagesFromDatabase = rawMessagesFromDatabase.map((rawMessage) => {
    const message = new window.Whisper.Message(rawMessage);
    return window.MessageController.register(message.id, message);
  });
  return [...messagesFromMemory, ...messagesFromDatabase];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getMessagesById
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0TWVzc2FnZXNCeUlkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL21lc3NhZ2VzJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldE1lc3NhZ2VzQnlJZChcbiAgbWVzc2FnZUlkczogSXRlcmFibGU8c3RyaW5nPlxuKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlTW9kZWw+PiB7XG4gIGNvbnN0IG1lc3NhZ2VzRnJvbU1lbW9yeTogQXJyYXk8TWVzc2FnZU1vZGVsPiA9IFtdO1xuICBjb25zdCBtZXNzYWdlSWRzVG9Mb29rVXBJbkRhdGFiYXNlOiBBcnJheTxzdHJpbmc+ID0gW107XG5cbiAgZm9yIChjb25zdCBtZXNzYWdlSWQgb2YgbWVzc2FnZUlkcykge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIuZ2V0QnlJZChtZXNzYWdlSWQpO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlc0Zyb21NZW1vcnkucHVzaChtZXNzYWdlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZUlkc1RvTG9va1VwSW5EYXRhYmFzZS5wdXNoKG1lc3NhZ2VJZCk7XG4gICAgfVxuICB9XG5cbiAgbGV0IHJhd01lc3NhZ2VzRnJvbURhdGFiYXNlOiBBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+O1xuICB0cnkge1xuICAgIHJhd01lc3NhZ2VzRnJvbURhdGFiYXNlID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldE1lc3NhZ2VzQnlJZChcbiAgICAgIG1lc3NhZ2VJZHNUb0xvb2tVcEluRGF0YWJhc2VcbiAgICApO1xuICB9IGNhdGNoIChlcnI6IHVua25vd24pIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgZmFpbGVkIHRvIGxvYWQgJHtcbiAgICAgICAgbWVzc2FnZUlkc1RvTG9va1VwSW5EYXRhYmFzZS5sZW5ndGhcbiAgICAgIH0gbWVzc2FnZShzKSBmcm9tIGRhdGFiYXNlLiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnIpfWBcbiAgICApO1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2VzRnJvbURhdGFiYXNlID0gcmF3TWVzc2FnZXNGcm9tRGF0YWJhc2UubWFwKHJhd01lc3NhZ2UgPT4ge1xuICAgIC8vIFdlIHVzZSBgd2luZG93LldoaXNwZXIuTWVzc2FnZWAgaW5zdGVhZCBvZiBgTWVzc2FnZU1vZGVsYCBoZXJlIHRvIGF2b2lkIGEgY2lyY3VsYXJcbiAgICAvLyAgIGltcG9ydC5cbiAgICBjb25zdCBtZXNzYWdlID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UocmF3TWVzc2FnZSk7XG4gICAgcmV0dXJuIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihtZXNzYWdlLmlkLCBtZXNzYWdlKTtcbiAgfSk7XG5cbiAgcmV0dXJuIFsuLi5tZXNzYWdlc0Zyb21NZW1vcnksIC4uLm1lc3NhZ2VzRnJvbURhdGFiYXNlXTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxVQUFxQjtBQUdyQixhQUF3QjtBQUV4QiwrQkFDRSxZQUM4QjtBQUM5QixRQUFNLHFCQUEwQyxDQUFDO0FBQ2pELFFBQU0sK0JBQThDLENBQUM7QUFFckQsYUFBVyxhQUFhLFlBQVk7QUFDbEMsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUMxRCxRQUFJLFNBQVM7QUFDWCx5QkFBbUIsS0FBSyxPQUFPO0FBQUEsSUFDakMsT0FBTztBQUNMLG1DQUE2QixLQUFLLFNBQVM7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0osTUFBSTtBQUNGLDhCQUEwQixNQUFNLE9BQU8sT0FBTyxLQUFLLGdCQUNqRCw0QkFDRjtBQUFBLEVBQ0YsU0FBUyxLQUFQO0FBQ0EsUUFBSSxNQUNGLGtCQUNFLDZCQUE2QixvQ0FDRCxPQUFPLFlBQVksR0FBRyxHQUN0RDtBQUNBLFdBQU8sQ0FBQztBQUFBLEVBQ1Y7QUFFQSxRQUFNLHVCQUF1Qix3QkFBd0IsSUFBSSxnQkFBYztBQUdyRSxVQUFNLFVBQVUsSUFBSSxPQUFPLFFBQVEsUUFBUSxVQUFVO0FBQ3JELFdBQU8sT0FBTyxrQkFBa0IsU0FBUyxRQUFRLElBQUksT0FBTztBQUFBLEVBQzlELENBQUM7QUFFRCxTQUFPLENBQUMsR0FBRyxvQkFBb0IsR0FBRyxvQkFBb0I7QUFDeEQ7QUFyQ3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
