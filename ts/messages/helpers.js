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
var helpers_exports = {};
__export(helpers_exports, {
  getContact: () => getContact,
  getContactId: () => getContactId,
  getSource: () => getSource,
  getSourceDevice: () => getSourceDevice,
  getSourceUuid: () => getSourceUuid,
  isCustomError: () => isCustomError,
  isQuoteAMatch: () => isQuoteAMatch
});
module.exports = __toCommonJS(helpers_exports);
var log = __toESM(require("../logging/log"));
var import_message = require("../state/selectors/message");
function isQuoteAMatch(message, conversationId, quote) {
  if (!message) {
    return false;
  }
  const { authorUuid, id } = quote;
  const authorConversationId = window.ConversationController.ensureContactIds({
    e164: "author" in quote ? quote.author : void 0,
    uuid: authorUuid
  });
  return message.sent_at === id && message.conversationId === conversationId && getContactId(message) === authorConversationId;
}
function getContactId(message) {
  const source = getSource(message);
  const sourceUuid = getSourceUuid(message);
  if (!source && !sourceUuid) {
    return window.ConversationController.getOurConversationId();
  }
  return window.ConversationController.ensureContactIds({
    e164: source,
    uuid: sourceUuid
  });
}
function getContact(message) {
  const id = getContactId(message);
  return window.ConversationController.get(id);
}
function getSource(message) {
  if ((0, import_message.isIncoming)(message) || (0, import_message.isStory)(message)) {
    return message.source;
  }
  if (!(0, import_message.isOutgoing)(message)) {
    log.warn("Message.getSource: Called for non-incoming/non-outgoing message");
  }
  return window.textsecure.storage.user.getNumber();
}
function getSourceDevice(message) {
  const { sourceDevice } = message;
  if ((0, import_message.isIncoming)(message) || (0, import_message.isStory)(message)) {
    return sourceDevice;
  }
  if (!(0, import_message.isOutgoing)(message)) {
    log.warn("Message.getSourceDevice: Called for non-incoming/non-outgoing message");
  }
  return sourceDevice || window.textsecure.storage.user.getDeviceId();
}
function getSourceUuid(message) {
  if ((0, import_message.isIncoming)(message) || (0, import_message.isStory)(message)) {
    return message.sourceUuid;
  }
  if (!(0, import_message.isOutgoing)(message)) {
    log.warn("Message.getSourceUuid: Called for non-incoming/non-outgoing message");
  }
  return window.textsecure.storage.user.getUuid()?.toString();
}
const isCustomError = /* @__PURE__ */ __name((e) => e instanceof Error, "isCustomError");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getContact,
  getContactId,
  getSource,
  getSourceDevice,
  getSourceUuid,
  isCustomError,
  isQuoteAMatch
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGVscGVycy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgQ3VzdG9tRXJyb3IsXG4gIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgUXVvdGVkTWVzc2FnZVR5cGUsXG59IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgaXNJbmNvbWluZywgaXNPdXRnb2luZywgaXNTdG9yeSB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy9tZXNzYWdlJztcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUXVvdGVBTWF0Y2goXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB8IG51bGwgfCB1bmRlZmluZWQsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHF1b3RlOiBRdW90ZWRNZXNzYWdlVHlwZVxuKTogbWVzc2FnZSBpcyBNZXNzYWdlQXR0cmlidXRlc1R5cGUge1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCB7IGF1dGhvclV1aWQsIGlkIH0gPSBxdW90ZTtcbiAgY29uc3QgYXV0aG9yQ29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICBlMTY0OiAnYXV0aG9yJyBpbiBxdW90ZSA/IHF1b3RlLmF1dGhvciA6IHVuZGVmaW5lZCxcbiAgICB1dWlkOiBhdXRob3JVdWlkLFxuICB9KTtcblxuICByZXR1cm4gKFxuICAgIG1lc3NhZ2Uuc2VudF9hdCA9PT0gaWQgJiZcbiAgICBtZXNzYWdlLmNvbnZlcnNhdGlvbklkID09PSBjb252ZXJzYXRpb25JZCAmJlxuICAgIGdldENvbnRhY3RJZChtZXNzYWdlKSA9PT0gYXV0aG9yQ29udmVyc2F0aW9uSWRcbiAgKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldENvbnRhY3RJZChcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCBzb3VyY2UgPSBnZXRTb3VyY2UobWVzc2FnZSk7XG4gIGNvbnN0IHNvdXJjZVV1aWQgPSBnZXRTb3VyY2VVdWlkKG1lc3NhZ2UpO1xuXG4gIGlmICghc291cmNlICYmICFzb3VyY2VVdWlkKSB7XG4gICAgcmV0dXJuIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkKCk7XG4gIH1cblxuICByZXR1cm4gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgZTE2NDogc291cmNlLFxuICAgIHV1aWQ6IHNvdXJjZVV1aWQsXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGFjdChcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBDb252ZXJzYXRpb25Nb2RlbCB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGlkID0gZ2V0Q29udGFjdElkKG1lc3NhZ2UpO1xuICByZXR1cm4gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNvdXJjZShtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoaXNJbmNvbWluZyhtZXNzYWdlKSB8fCBpc1N0b3J5KG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIG1lc3NhZ2Uuc291cmNlO1xuICB9XG4gIGlmICghaXNPdXRnb2luZyhtZXNzYWdlKSkge1xuICAgIGxvZy53YXJuKCdNZXNzYWdlLmdldFNvdXJjZTogQ2FsbGVkIGZvciBub24taW5jb21pbmcvbm9uLW91dGdvaW5nIG1lc3NhZ2UnKTtcbiAgfVxuXG4gIHJldHVybiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2VEZXZpY2UoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuKTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBzb3VyY2VEZXZpY2UgfSA9IG1lc3NhZ2U7XG5cbiAgaWYgKGlzSW5jb21pbmcobWVzc2FnZSkgfHwgaXNTdG9yeShtZXNzYWdlKSkge1xuICAgIHJldHVybiBzb3VyY2VEZXZpY2U7XG4gIH1cbiAgaWYgKCFpc091dGdvaW5nKG1lc3NhZ2UpKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICAnTWVzc2FnZS5nZXRTb3VyY2VEZXZpY2U6IENhbGxlZCBmb3Igbm9uLWluY29taW5nL25vbi1vdXRnb2luZyBtZXNzYWdlJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gc291cmNlRGV2aWNlIHx8IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlVXVpZChcbiAgbWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBVVUlEU3RyaW5nVHlwZSB8IHVuZGVmaW5lZCB7XG4gIGlmIChpc0luY29taW5nKG1lc3NhZ2UpIHx8IGlzU3RvcnkobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5zb3VyY2VVdWlkO1xuICB9XG4gIGlmICghaXNPdXRnb2luZyhtZXNzYWdlKSkge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ01lc3NhZ2UuZ2V0U291cmNlVXVpZDogQ2FsbGVkIGZvciBub24taW5jb21pbmcvbm9uLW91dGdvaW5nIG1lc3NhZ2UnXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xufVxuXG5leHBvcnQgY29uc3QgaXNDdXN0b21FcnJvciA9IChlOiB1bmtub3duKTogZSBpcyBDdXN0b21FcnJvciA9PlxuICBlIGluc3RhbmNlb2YgRXJyb3I7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsVUFBcUI7QUFRckIscUJBQWdEO0FBRXpDLHVCQUNMLFNBQ0EsZ0JBQ0EsT0FDa0M7QUFDbEMsTUFBSSxDQUFDLFNBQVM7QUFDWixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxZQUFZLE9BQU87QUFDM0IsUUFBTSx1QkFBdUIsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsSUFDMUUsTUFBTSxZQUFZLFFBQVEsTUFBTSxTQUFTO0FBQUEsSUFDekMsTUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELFNBQ0UsUUFBUSxZQUFZLE1BQ3BCLFFBQVEsbUJBQW1CLGtCQUMzQixhQUFhLE9BQU8sTUFBTTtBQUU5QjtBQXBCZ0IsQUFzQlQsc0JBQ0wsU0FDb0I7QUFDcEIsUUFBTSxTQUFTLFVBQVUsT0FBTztBQUNoQyxRQUFNLGFBQWEsY0FBYyxPQUFPO0FBRXhDLE1BQUksQ0FBQyxVQUFVLENBQUMsWUFBWTtBQUMxQixXQUFPLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUFBLEVBQzVEO0FBRUEsU0FBTyxPQUFPLHVCQUF1QixpQkFBaUI7QUFBQSxJQUNwRCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsRUFDUixDQUFDO0FBQ0g7QUFkZ0IsQUFnQlQsb0JBQ0wsU0FDK0I7QUFDL0IsUUFBTSxLQUFLLGFBQWEsT0FBTztBQUMvQixTQUFPLE9BQU8sdUJBQXVCLElBQUksRUFBRTtBQUM3QztBQUxnQixBQU9ULG1CQUFtQixTQUFvRDtBQUM1RSxNQUFJLCtCQUFXLE9BQU8sS0FBSyw0QkFBUSxPQUFPLEdBQUc7QUFDM0MsV0FBTyxRQUFRO0FBQUEsRUFDakI7QUFDQSxNQUFJLENBQUMsK0JBQVcsT0FBTyxHQUFHO0FBQ3hCLFFBQUksS0FBSyxpRUFBaUU7QUFBQSxFQUM1RTtBQUVBLFNBQU8sT0FBTyxXQUFXLFFBQVEsS0FBSyxVQUFVO0FBQ2xEO0FBVGdCLEFBV1QseUJBQ0wsU0FDNkI7QUFDN0IsUUFBTSxFQUFFLGlCQUFpQjtBQUV6QixNQUFJLCtCQUFXLE9BQU8sS0FBSyw0QkFBUSxPQUFPLEdBQUc7QUFDM0MsV0FBTztBQUFBLEVBQ1Q7QUFDQSxNQUFJLENBQUMsK0JBQVcsT0FBTyxHQUFHO0FBQ3hCLFFBQUksS0FDRix1RUFDRjtBQUFBLEVBQ0Y7QUFFQSxTQUFPLGdCQUFnQixPQUFPLFdBQVcsUUFBUSxLQUFLLFlBQVk7QUFDcEU7QUFmZ0IsQUFpQlQsdUJBQ0wsU0FDNEI7QUFDNUIsTUFBSSwrQkFBVyxPQUFPLEtBQUssNEJBQVEsT0FBTyxHQUFHO0FBQzNDLFdBQU8sUUFBUTtBQUFBLEVBQ2pCO0FBQ0EsTUFBSSxDQUFDLCtCQUFXLE9BQU8sR0FBRztBQUN4QixRQUFJLEtBQ0YscUVBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTyxPQUFPLFdBQVcsUUFBUSxLQUFLLFFBQVEsR0FBRyxTQUFTO0FBQzVEO0FBYmdCLEFBZVQsTUFBTSxnQkFBZ0Isd0JBQUMsTUFDNUIsYUFBYSxPQURjOyIsCiAgIm5hbWVzIjogW10KfQo=
