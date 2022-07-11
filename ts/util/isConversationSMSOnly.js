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
var isConversationSMSOnly_exports = {};
__export(isConversationSMSOnly_exports, {
  isConversationSMSOnly: () => isConversationSMSOnly
});
module.exports = __toCommonJS(isConversationSMSOnly_exports);
function isConversationSMSOnly(conversation) {
  const { e164, uuid, type } = conversation;
  if (type !== "direct" && type !== "private") {
    return false;
  }
  if (e164 && !uuid) {
    return true;
  }
  return conversation.discoveredUnregisteredAt !== void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationSMSOnly
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25TTVNPbmx5LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCB0eXBlIE1pbmltYWxDb252ZXJzYXRpb25UeXBlID0gUmVhZG9ubHk8e1xuICB0eXBlPzogc3RyaW5nO1xuICBlMTY0Pzogc3RyaW5nO1xuICB1dWlkPzogc3RyaW5nO1xuICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ/OiBudW1iZXI7XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ29udmVyc2F0aW9uU01TT25seShcbiAgY29udmVyc2F0aW9uOiBNaW5pbWFsQ29udmVyc2F0aW9uVHlwZVxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgZTE2NCwgdXVpZCwgdHlwZSB9ID0gY29udmVyc2F0aW9uO1xuICAvLyBgZGlyZWN0YCBmb3IgcmVkdXgsIGBwcml2YXRlYCBmb3IgbW9kZWxzIGFuZCB0aGUgZGF0YWJhc2VcbiAgaWYgKHR5cGUgIT09ICdkaXJlY3QnICYmIHR5cGUgIT09ICdwcml2YXRlJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChlMTY0ICYmICF1dWlkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gY29udmVyc2F0aW9uLmRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdCAhPT0gdW5kZWZpbmVkO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVVPLCtCQUNMLGNBQ1M7QUFDVCxRQUFNLEVBQUUsTUFBTSxNQUFNLFNBQVM7QUFFN0IsTUFBSSxTQUFTLFlBQVksU0FBUyxXQUFXO0FBQzNDLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxRQUFRLENBQUMsTUFBTTtBQUNqQixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU8sYUFBYSw2QkFBNkI7QUFDbkQ7QUFkZ0IiLAogICJuYW1lcyI6IFtdCn0K
