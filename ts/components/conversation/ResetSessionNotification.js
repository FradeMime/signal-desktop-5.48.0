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
var ResetSessionNotification_exports = {};
__export(ResetSessionNotification_exports, {
  ResetSessionNotification: () => ResetSessionNotification
});
module.exports = __toCommonJS(ResetSessionNotification_exports);
var import_react = __toESM(require("react"));
var import_SystemMessage = require("./SystemMessage");
const ResetSessionNotification = /* @__PURE__ */ __name(({ i18n }) => /* @__PURE__ */ import_react.default.createElement(import_SystemMessage.SystemMessage, {
  contents: i18n("sessionEnded"),
  icon: "session-refresh"
}), "ResetSessionNotification");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ResetSessionNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVzZXRTZXNzaW9uTm90aWZpY2F0aW9uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgU3lzdGVtTWVzc2FnZSB9IGZyb20gJy4vU3lzdGVtTWVzc2FnZSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IGNvbnN0IFJlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvbiA9ICh7IGkxOG4gfTogUHJvcHMpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxTeXN0ZW1NZXNzYWdlIGNvbnRlbnRzPXtpMThuKCdzZXNzaW9uRW5kZWQnKX0gaWNvbj1cInNlc3Npb24tcmVmcmVzaFwiIC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUdsQiwyQkFBOEI7QUFNdkIsTUFBTSwyQkFBMkIsd0JBQUMsRUFBRSxXQUN6QyxtREFBQztBQUFBLEVBQWMsVUFBVSxLQUFLLGNBQWM7QUFBQSxFQUFHLE1BQUs7QUFBQSxDQUFrQixHQURoQzsiLAogICJuYW1lcyI6IFtdCn0K
