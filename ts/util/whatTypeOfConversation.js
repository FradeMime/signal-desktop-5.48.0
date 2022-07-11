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
var whatTypeOfConversation_exports = {};
__export(whatTypeOfConversation_exports, {
  ConversationTypes: () => ConversationTypes,
  isDirectConversation: () => isDirectConversation,
  isGroup: () => isGroup,
  isGroupV1: () => isGroupV1,
  isGroupV2: () => isGroupV2,
  isMe: () => isMe,
  typeofConversation: () => typeofConversation
});
module.exports = __toCommonJS(whatTypeOfConversation_exports);
var Bytes = __toESM(require("../Bytes"));
var log = __toESM(require("../logging/log"));
var ConversationTypes = /* @__PURE__ */ ((ConversationTypes2) => {
  ConversationTypes2["Me"] = "Me";
  ConversationTypes2["Direct"] = "Direct";
  ConversationTypes2["GroupV1"] = "GroupV1";
  ConversationTypes2["GroupV2"] = "GroupV2";
  return ConversationTypes2;
})(ConversationTypes || {});
function isDirectConversation(conversationAttrs) {
  return conversationAttrs.type === "private" || conversationAttrs.type === "direct";
}
function isMe(conversationAttrs) {
  const { e164, uuid } = conversationAttrs;
  const ourNumber = window.textsecure.storage.user.getNumber();
  const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
  return Boolean(e164 && e164 === ourNumber || uuid && uuid === ourUuid);
}
function isGroup(conversationAttrs) {
  return isGroupV2(conversationAttrs) || isGroupV1(conversationAttrs);
}
function isGroupV1(conversationAttrs) {
  const { groupId } = conversationAttrs;
  if (!groupId) {
    return false;
  }
  const buffer = Bytes.fromBinary(groupId);
  return buffer.byteLength === window.Signal.Groups.ID_V1_LENGTH;
}
function isGroupV2(conversationAttrs) {
  const { groupId, groupVersion = 0 } = conversationAttrs;
  if (!groupId) {
    return false;
  }
  try {
    return groupVersion === 2 && Bytes.fromBase64(groupId).byteLength === window.Signal.Groups.ID_LENGTH;
  } catch (error) {
    log.error("isGroupV2: Failed to process groupId in base64!");
    return false;
  }
}
function typeofConversation(conversationAttrs) {
  if (isMe(conversationAttrs)) {
    return "Me" /* Me */;
  }
  if (isDirectConversation(conversationAttrs)) {
    return "Direct" /* Direct */;
  }
  if (isGroupV2(conversationAttrs)) {
    return "GroupV2" /* GroupV2 */;
  }
  if (isGroupV1(conversationAttrs)) {
    return "GroupV1" /* GroupV1 */;
  }
  return void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationTypes,
  isDirectConversation,
  isGroup,
  isGroupV1,
  isGroupV2,
  isMe,
  typeofConversation
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2hhdFR5cGVPZkNvbnZlcnNhdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCBlbnVtIENvbnZlcnNhdGlvblR5cGVzIHtcbiAgTWUgPSAnTWUnLFxuICBEaXJlY3QgPSAnRGlyZWN0JyxcbiAgR3JvdXBWMSA9ICdHcm91cFYxJyxcbiAgR3JvdXBWMiA9ICdHcm91cFYyJyxcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRGlyZWN0Q29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25BdHRyczpcbiAgICB8IFBpY2s8Q29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsICd0eXBlJz5cbiAgICB8IFBpY2s8Q29udmVyc2F0aW9uVHlwZSwgJ3R5cGUnPlxuKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgY29udmVyc2F0aW9uQXR0cnMudHlwZSA9PT0gJ3ByaXZhdGUnIHx8IGNvbnZlcnNhdGlvbkF0dHJzLnR5cGUgPT09ICdkaXJlY3QnXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01lKGNvbnZlcnNhdGlvbkF0dHJzOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSk6IGJvb2xlYW4ge1xuICBjb25zdCB7IGUxNjQsIHV1aWQgfSA9IGNvbnZlcnNhdGlvbkF0dHJzO1xuICBjb25zdCBvdXJOdW1iZXIgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICByZXR1cm4gQm9vbGVhbigoZTE2NCAmJiBlMTY0ID09PSBvdXJOdW1iZXIpIHx8ICh1dWlkICYmIHV1aWQgPT09IG91clV1aWQpKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzR3JvdXAoXG4gIGNvbnZlcnNhdGlvbkF0dHJzOiBQaWNrPFxuICAgIENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICAgICdncm91cElkJyB8ICdncm91cFZlcnNpb24nXG4gID5cbik6IGJvb2xlYW4ge1xuICByZXR1cm4gaXNHcm91cFYyKGNvbnZlcnNhdGlvbkF0dHJzKSB8fCBpc0dyb3VwVjEoY29udmVyc2F0aW9uQXR0cnMpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHcm91cFYxKFxuICBjb252ZXJzYXRpb25BdHRyczogUGljazxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSwgJ2dyb3VwSWQnPlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgZ3JvdXBJZCB9ID0gY29udmVyc2F0aW9uQXR0cnM7XG4gIGlmICghZ3JvdXBJZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IGJ1ZmZlciA9IEJ5dGVzLmZyb21CaW5hcnkoZ3JvdXBJZCk7XG4gIHJldHVybiBidWZmZXIuYnl0ZUxlbmd0aCA9PT0gd2luZG93LlNpZ25hbC5Hcm91cHMuSURfVjFfTEVOR1RIO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaXNHcm91cFYyKFxuICBjb252ZXJzYXRpb25BdHRyczogUGljazxcbiAgICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgICAnZ3JvdXBJZCcgfCAnZ3JvdXBWZXJzaW9uJ1xuICA+XG4pOiBib29sZWFuIHtcbiAgY29uc3QgeyBncm91cElkLCBncm91cFZlcnNpb24gPSAwIH0gPSBjb252ZXJzYXRpb25BdHRycztcbiAgaWYgKCFncm91cElkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICByZXR1cm4gKFxuICAgICAgZ3JvdXBWZXJzaW9uID09PSAyICYmXG4gICAgICBCeXRlcy5mcm9tQmFzZTY0KGdyb3VwSWQpLmJ5dGVMZW5ndGggPT09IHdpbmRvdy5TaWduYWwuR3JvdXBzLklEX0xFTkdUSFxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKCdpc0dyb3VwVjI6IEZhaWxlZCB0byBwcm9jZXNzIGdyb3VwSWQgaW4gYmFzZTY0IScpO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gdHlwZW9mQ29udmVyc2F0aW9uKFxuICBjb252ZXJzYXRpb25BdHRyczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGVcbik6IENvbnZlcnNhdGlvblR5cGVzIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGlzTWUoY29udmVyc2F0aW9uQXR0cnMpKSB7XG4gICAgcmV0dXJuIENvbnZlcnNhdGlvblR5cGVzLk1lO1xuICB9XG5cbiAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbkF0dHJzKSkge1xuICAgIHJldHVybiBDb252ZXJzYXRpb25UeXBlcy5EaXJlY3Q7XG4gIH1cblxuICBpZiAoaXNHcm91cFYyKGNvbnZlcnNhdGlvbkF0dHJzKSkge1xuICAgIHJldHVybiBDb252ZXJzYXRpb25UeXBlcy5Hcm91cFYyO1xuICB9XG5cbiAgaWYgKGlzR3JvdXBWMShjb252ZXJzYXRpb25BdHRycykpIHtcbiAgICByZXR1cm4gQ29udmVyc2F0aW9uVHlwZXMuR3JvdXBWMTtcbiAgfVxuXG4gIHJldHVybiB1bmRlZmluZWQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsWUFBdUI7QUFDdkIsVUFBcUI7QUFFZCxJQUFLLG9CQUFMLGtCQUFLLHVCQUFMO0FBQ0wsNkJBQUs7QUFDTCxpQ0FBUztBQUNULGtDQUFVO0FBQ1Ysa0NBQVU7QUFKQTtBQUFBO0FBT0wsOEJBQ0wsbUJBR1M7QUFDVCxTQUNFLGtCQUFrQixTQUFTLGFBQWEsa0JBQWtCLFNBQVM7QUFFdkU7QUFSZ0IsQUFVVCxjQUFjLG1CQUF3RDtBQUMzRSxRQUFNLEVBQUUsTUFBTSxTQUFTO0FBQ3ZCLFFBQU0sWUFBWSxPQUFPLFdBQVcsUUFBUSxLQUFLLFVBQVU7QUFDM0QsUUFBTSxVQUFVLE9BQU8sV0FBVyxRQUFRLEtBQUssUUFBUSxHQUFHLFNBQVM7QUFDbkUsU0FBTyxRQUFTLFFBQVEsU0FBUyxhQUFlLFFBQVEsU0FBUyxPQUFRO0FBQzNFO0FBTGdCLEFBT1QsaUJBQ0wsbUJBSVM7QUFDVCxTQUFPLFVBQVUsaUJBQWlCLEtBQUssVUFBVSxpQkFBaUI7QUFDcEU7QUFQZ0IsQUFTVCxtQkFDTCxtQkFDUztBQUNULFFBQU0sRUFBRSxZQUFZO0FBQ3BCLE1BQUksQ0FBQyxTQUFTO0FBQ1osV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFNBQVMsTUFBTSxXQUFXLE9BQU87QUFDdkMsU0FBTyxPQUFPLGVBQWUsT0FBTyxPQUFPLE9BQU87QUFDcEQ7QUFWZ0IsQUFZVCxtQkFDTCxtQkFJUztBQUNULFFBQU0sRUFBRSxTQUFTLGVBQWUsTUFBTTtBQUN0QyxNQUFJLENBQUMsU0FBUztBQUNaLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSTtBQUNGLFdBQ0UsaUJBQWlCLEtBQ2pCLE1BQU0sV0FBVyxPQUFPLEVBQUUsZUFBZSxPQUFPLE9BQU8sT0FBTztBQUFBLEVBRWxFLFNBQVMsT0FBUDtBQUNBLFFBQUksTUFBTSxpREFBaUQ7QUFDM0QsV0FBTztBQUFBLEVBQ1Q7QUFDRjtBQXBCZ0IsQUFzQlQsNEJBQ0wsbUJBQytCO0FBQy9CLE1BQUksS0FBSyxpQkFBaUIsR0FBRztBQUMzQixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUkscUJBQXFCLGlCQUFpQixHQUFHO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxVQUFVLGlCQUFpQixHQUFHO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxVQUFVLGlCQUFpQixHQUFHO0FBQ2hDLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTztBQUNUO0FBcEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
