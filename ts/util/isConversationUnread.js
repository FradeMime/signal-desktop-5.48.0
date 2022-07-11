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
var isConversationUnread_exports = {};
__export(isConversationUnread_exports, {
  isConversationUnread: () => isConversationUnread
});
module.exports = __toCommonJS(isConversationUnread_exports);
var import_lodash = require("lodash");
const isConversationUnread = /* @__PURE__ */ __name(({
  markedUnread,
  unreadCount
}) => Boolean(markedUnread || (0, import_lodash.isNumber)(unreadCount) && unreadCount > 0), "isConversationUnread");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isConversationUnread
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNDb252ZXJzYXRpb25VbnJlYWQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY29uc3QgaXNDb252ZXJzYXRpb25VbnJlYWQgPSAoe1xuICBtYXJrZWRVbnJlYWQsXG4gIHVucmVhZENvdW50LFxufTogUmVhZG9ubHk8e1xuICB1bnJlYWRDb3VudD86IG51bWJlcjtcbiAgbWFya2VkVW5yZWFkPzogYm9vbGVhbjtcbn0+KTogYm9vbGVhbiA9PlxuICBCb29sZWFuKG1hcmtlZFVucmVhZCB8fCAoaXNOdW1iZXIodW5yZWFkQ291bnQpICYmIHVucmVhZENvdW50ID4gMCkpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUVsQixNQUFNLHVCQUF1Qix3QkFBQztBQUFBLEVBQ25DO0FBQUEsRUFDQTtBQUFBLE1BS0EsUUFBUSxnQkFBaUIsNEJBQVMsV0FBVyxLQUFLLGNBQWMsQ0FBRSxHQVBoQzsiLAogICJuYW1lcyI6IFtdCn0K
