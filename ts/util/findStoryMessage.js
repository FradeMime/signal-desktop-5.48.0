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
var findStoryMessage_exports = {};
__export(findStoryMessage_exports, {
  findStoryMessage: () => findStoryMessage,
  isStoryAMatch: () => isStoryAMatch
});
module.exports = __toCommonJS(findStoryMessage_exports);
var log = __toESM(require("../logging/log"));
var import_iterables = require("./iterables");
var import_helpers = require("../messages/helpers");
var import_timestampLongUtils = require("./timestampLongUtils");
async function findStoryMessage(conversationId, storyContext) {
  if (!storyContext) {
    return;
  }
  const { authorUuid, sentTimestamp } = storyContext;
  if (!authorUuid || !sentTimestamp) {
    return;
  }
  const sentAt = (0, import_timestampLongUtils.getTimestampFromLong)(sentTimestamp);
  const inMemoryMessages = window.MessageController.filterBySentAt(sentAt);
  const matchingMessage = (0, import_iterables.find)(inMemoryMessages, (item) => isStoryAMatch(item.attributes, conversationId, authorUuid, sentAt));
  if (matchingMessage) {
    return matchingMessage;
  }
  log.info("findStoryMessage: db lookup needed", sentAt);
  const messages = await window.Signal.Data.getMessagesBySentAt(sentAt);
  const found = messages.find((item) => isStoryAMatch(item, conversationId, authorUuid, sentAt));
  if (!found) {
    log.info("findStoryMessage: message not found", sentAt);
    return;
  }
  const message = window.MessageController.register(found.id, found);
  return message;
}
function isStoryAMatch(message, conversationId, authorUuid, sentTimestamp) {
  if (!message) {
    return false;
  }
  const authorConversationId = window.ConversationController.ensureContactIds({
    e164: void 0,
    uuid: authorUuid
  });
  return message.sent_at === sentTimestamp && message.conversationId === conversationId && (0, import_helpers.getContactId)(message) === authorConversationId;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findStoryMessage,
  isStoryAMatch
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZFN0b3J5TWVzc2FnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHR5cGUgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGZpbmQgfSBmcm9tICcuL2l0ZXJhYmxlcyc7XG5pbXBvcnQgeyBnZXRDb250YWN0SWQgfSBmcm9tICcuLi9tZXNzYWdlcy9oZWxwZXJzJztcbmltcG9ydCB7IGdldFRpbWVzdGFtcEZyb21Mb25nIH0gZnJvbSAnLi90aW1lc3RhbXBMb25nVXRpbHMnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmluZFN0b3J5TWVzc2FnZShcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgc3RvcnlDb250ZXh0PzogUHJvdG8uRGF0YU1lc3NhZ2UuSVN0b3J5Q29udGV4dFxuKTogUHJvbWlzZTxNZXNzYWdlTW9kZWwgfCB1bmRlZmluZWQ+IHtcbiAgaWYgKCFzdG9yeUNvbnRleHQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IGF1dGhvclV1aWQsIHNlbnRUaW1lc3RhbXAgfSA9IHN0b3J5Q29udGV4dDtcblxuICBpZiAoIWF1dGhvclV1aWQgfHwgIXNlbnRUaW1lc3RhbXApIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzZW50QXQgPSBnZXRUaW1lc3RhbXBGcm9tTG9uZyhzZW50VGltZXN0YW1wKTtcblxuICBjb25zdCBpbk1lbW9yeU1lc3NhZ2VzID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmZpbHRlckJ5U2VudEF0KHNlbnRBdCk7XG4gIGNvbnN0IG1hdGNoaW5nTWVzc2FnZSA9IGZpbmQoaW5NZW1vcnlNZXNzYWdlcywgaXRlbSA9PlxuICAgIGlzU3RvcnlBTWF0Y2goaXRlbS5hdHRyaWJ1dGVzLCBjb252ZXJzYXRpb25JZCwgYXV0aG9yVXVpZCwgc2VudEF0KVxuICApO1xuXG4gIGlmIChtYXRjaGluZ01lc3NhZ2UpIHtcbiAgICByZXR1cm4gbWF0Y2hpbmdNZXNzYWdlO1xuICB9XG5cbiAgbG9nLmluZm8oJ2ZpbmRTdG9yeU1lc3NhZ2U6IGRiIGxvb2t1cCBuZWVkZWQnLCBzZW50QXQpO1xuICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlc0J5U2VudEF0KHNlbnRBdCk7XG4gIGNvbnN0IGZvdW5kID0gbWVzc2FnZXMuZmluZChpdGVtID0+XG4gICAgaXNTdG9yeUFNYXRjaChpdGVtLCBjb252ZXJzYXRpb25JZCwgYXV0aG9yVXVpZCwgc2VudEF0KVxuICApO1xuXG4gIGlmICghZm91bmQpIHtcbiAgICBsb2cuaW5mbygnZmluZFN0b3J5TWVzc2FnZTogbWVzc2FnZSBub3QgZm91bmQnLCBzZW50QXQpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoZm91bmQuaWQsIGZvdW5kKTtcbiAgcmV0dXJuIG1lc3NhZ2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1N0b3J5QU1hdGNoKFxuICBtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfCBudWxsIHwgdW5kZWZpbmVkLFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBhdXRob3JVdWlkOiBzdHJpbmcsXG4gIHNlbnRUaW1lc3RhbXA6IG51bWJlclxuKTogbWVzc2FnZSBpcyBNZXNzYWdlQXR0cmlidXRlc1R5cGUge1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBhdXRob3JDb252ZXJzYXRpb25JZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgIGUxNjQ6IHVuZGVmaW5lZCxcbiAgICB1dWlkOiBhdXRob3JVdWlkLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIG1lc3NhZ2Uuc2VudF9hdCA9PT0gc2VudFRpbWVzdGFtcCAmJlxuICAgIG1lc3NhZ2UuY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbklkICYmXG4gICAgZ2V0Q29udGFjdElkKG1lc3NhZ2UpID09PSBhdXRob3JDb252ZXJzYXRpb25JZFxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsVUFBcUI7QUFDckIsdUJBQXFCO0FBQ3JCLHFCQUE2QjtBQUM3QixnQ0FBcUM7QUFFckMsZ0NBQ0UsZ0JBQ0EsY0FDbUM7QUFDbkMsTUFBSSxDQUFDLGNBQWM7QUFDakI7QUFBQSxFQUNGO0FBRUEsUUFBTSxFQUFFLFlBQVksa0JBQWtCO0FBRXRDLE1BQUksQ0FBQyxjQUFjLENBQUMsZUFBZTtBQUNqQztBQUFBLEVBQ0Y7QUFFQSxRQUFNLFNBQVMsb0RBQXFCLGFBQWE7QUFFakQsUUFBTSxtQkFBbUIsT0FBTyxrQkFBa0IsZUFBZSxNQUFNO0FBQ3ZFLFFBQU0sa0JBQWtCLDJCQUFLLGtCQUFrQixVQUM3QyxjQUFjLEtBQUssWUFBWSxnQkFBZ0IsWUFBWSxNQUFNLENBQ25FO0FBRUEsTUFBSSxpQkFBaUI7QUFDbkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLEtBQUssc0NBQXNDLE1BQU07QUFDckQsUUFBTSxXQUFXLE1BQU0sT0FBTyxPQUFPLEtBQUssb0JBQW9CLE1BQU07QUFDcEUsUUFBTSxRQUFRLFNBQVMsS0FBSyxVQUMxQixjQUFjLE1BQU0sZ0JBQWdCLFlBQVksTUFBTSxDQUN4RDtBQUVBLE1BQUksQ0FBQyxPQUFPO0FBQ1YsUUFBSSxLQUFLLHVDQUF1QyxNQUFNO0FBQ3REO0FBQUEsRUFDRjtBQUVBLFFBQU0sVUFBVSxPQUFPLGtCQUFrQixTQUFTLE1BQU0sSUFBSSxLQUFLO0FBQ2pFLFNBQU87QUFDVDtBQXRDc0IsQUF3Q2YsdUJBQ0wsU0FDQSxnQkFDQSxZQUNBLGVBQ2tDO0FBQ2xDLE1BQUksQ0FBQyxTQUFTO0FBQ1osV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLHVCQUF1QixPQUFPLHVCQUF1QixpQkFBaUI7QUFBQSxJQUMxRSxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsU0FDRSxRQUFRLFlBQVksaUJBQ3BCLFFBQVEsbUJBQW1CLGtCQUMzQixpQ0FBYSxPQUFPLE1BQU07QUFFOUI7QUFwQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
