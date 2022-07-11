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
var isMessageUnread_exports = {};
__export(isMessageUnread_exports, {
  isMessageUnread: () => isMessageUnread
});
module.exports = __toCommonJS(isMessageUnread_exports);
var import_MessageReadStatus = require("../messages/MessageReadStatus");
const isMessageUnread = /* @__PURE__ */ __name((message) => message.readStatus === import_MessageReadStatus.ReadStatus.Unread, "isMessageUnread");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isMessageUnread
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNNZXNzYWdlVW5yZWFkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuXG5leHBvcnQgY29uc3QgaXNNZXNzYWdlVW5yZWFkID0gKFxuICBtZXNzYWdlOiBSZWFkb25seTxQaWNrPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSwgJ3JlYWRTdGF0dXMnPj5cbik6IGJvb2xlYW4gPT4gbWVzc2FnZS5yZWFkU3RhdHVzID09PSBSZWFkU3RhdHVzLlVucmVhZDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSwrQkFBMkI7QUFHcEIsTUFBTSxrQkFBa0Isd0JBQzdCLFlBQ1ksUUFBUSxlQUFlLG9DQUFXLFFBRmpCOyIsCiAgIm5hbWVzIjogW10KfQo=
