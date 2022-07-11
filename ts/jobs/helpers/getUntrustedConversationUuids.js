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
var getUntrustedConversationUuids_exports = {};
__export(getUntrustedConversationUuids_exports, {
  getUntrustedConversationUuids: () => getUntrustedConversationUuids
});
module.exports = __toCommonJS(getUntrustedConversationUuids_exports);
var import_isNotNil = require("../../util/isNotNil");
var log = __toESM(require("../../logging/log"));
function getUntrustedConversationUuids(recipients) {
  return recipients.map((recipient) => {
    const recipientConversation = window.ConversationController.getOrCreate(recipient, "private");
    if (!recipientConversation.isUntrusted()) {
      return null;
    }
    const uuid = recipientConversation.get("uuid");
    if (!uuid) {
      log.warn(`getUntrustedConversationUuids: Conversation ${recipientConversation.idForLogging()} had no UUID`);
      return null;
    }
    return uuid;
  }).filter(import_isNotNil.isNotNil);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUntrustedConversationUuids
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VW50cnVzdGVkQ29udmVyc2F0aW9uVXVpZHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi8uLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRVbnRydXN0ZWRDb252ZXJzYXRpb25VdWlkcyhcbiAgcmVjaXBpZW50czogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4pOiBBcnJheTxzdHJpbmc+IHtcbiAgcmV0dXJuIHJlY2lwaWVudHNcbiAgICAubWFwKHJlY2lwaWVudCA9PiB7XG4gICAgICBjb25zdCByZWNpcGllbnRDb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZShcbiAgICAgICAgcmVjaXBpZW50LFxuICAgICAgICAncHJpdmF0ZSdcbiAgICAgICk7XG5cbiAgICAgIGlmICghcmVjaXBpZW50Q29udmVyc2F0aW9uLmlzVW50cnVzdGVkKCkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHV1aWQgPSByZWNpcGllbnRDb252ZXJzYXRpb24uZ2V0KCd1dWlkJyk7XG4gICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGdldFVudHJ1c3RlZENvbnZlcnNhdGlvblV1aWRzOiBDb252ZXJzYXRpb24gJHtyZWNpcGllbnRDb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGhhZCBubyBVVUlEYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHV1aWQ7XG4gICAgfSlcbiAgICAuZmlsdGVyKGlzTm90TmlsKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBeUI7QUFDekIsVUFBcUI7QUFFZCx1Q0FDTCxZQUNlO0FBQ2YsU0FBTyxXQUNKLElBQUksZUFBYTtBQUNoQixVQUFNLHdCQUF3QixPQUFPLHVCQUF1QixZQUMxRCxXQUNBLFNBQ0Y7QUFFQSxRQUFJLENBQUMsc0JBQXNCLFlBQVksR0FBRztBQUN4QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sT0FBTyxzQkFBc0IsSUFBSSxNQUFNO0FBQzdDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsVUFBSSxLQUNGLCtDQUErQyxzQkFBc0IsYUFBYSxlQUNwRjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLEVBQ1QsQ0FBQyxFQUNBLE9BQU8sd0JBQVE7QUFDcEI7QUF6QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
