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
var ChangeNumberNotification_stories_exports = {};
__export(ChangeNumberNotification_stories_exports, {
  Default: () => Default,
  LongName: () => LongName,
  default: () => ChangeNumberNotification_stories_default
});
module.exports = __toCommonJS(ChangeNumberNotification_stories_exports);
var React = __toESM(require("react"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_ChangeNumberNotification = require("./ChangeNumberNotification");
var ChangeNumberNotification_stories_default = {
  title: "Components/Conversation/ChangeNumberNotification"
};
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ChangeNumberNotification.ChangeNumberNotification, {
  sender: (0, import_getDefaultConversation.getDefaultConversation)(),
  timestamp: 16188948e5,
  i18n
}), "Default");
const LongName = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_ChangeNumberNotification.ChangeNumberNotification, {
  sender: (0, import_getDefaultConversation.getDefaultConversation)({
    firstName: "\u{1F485}\u{1F607}\u{1F58B}".repeat(50)
  }),
  timestamp: 16188948e5,
  i18n
}), "LongName");
LongName.story = {
  name: "Long name"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  LongName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IGdldERlZmF1bHRDb252ZXJzYXRpb24gfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcblxuaW1wb3J0IHsgQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9DaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24nO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uJyxcbn07XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENoYW5nZU51bWJlck5vdGlmaWNhdGlvblxuICAgIHNlbmRlcj17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbigpfVxuICAgIHRpbWVzdGFtcD17MTYxODg5NDgwMDAwMH1cbiAgICBpMThuPXtpMThufVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IExvbmdOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENoYW5nZU51bWJlck5vdGlmaWNhdGlvblxuICAgIHNlbmRlcj17Z2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICBmaXJzdE5hbWU6ICdcdUQ4M0RcdURDODVcdUQ4M0RcdURFMDdcdUQ4M0RcdUREOEInLnJlcGVhdCg1MCksXG4gICAgfSl9XG4gICAgdGltZXN0YW1wPXsxNjE4ODk0ODAwMDAwfVxuICAgIGkxOG49e2kxOG59XG4gIC8+XG4pO1xuXG5Mb25nTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0xvbmcgbmFtZScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLG9DQUF1QztBQUV2QyxzQ0FBeUM7QUFFekMsSUFBTywyQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFaEMsTUFBTSxVQUFVLDZCQUNyQixvQ0FBQztBQUFBLEVBQ0MsUUFBUSwwREFBdUI7QUFBQSxFQUMvQixXQUFXO0FBQUEsRUFDWDtBQUFBLENBQ0YsR0FMcUI7QUFRaEIsTUFBTSxXQUFXLDZCQUN0QixvQ0FBQztBQUFBLEVBQ0MsUUFBUSwwREFBdUI7QUFBQSxJQUM3QixXQUFXLDhCQUFTLE9BQU8sRUFBRTtBQUFBLEVBQy9CLENBQUM7QUFBQSxFQUNELFdBQVc7QUFBQSxFQUNYO0FBQUEsQ0FDRixHQVBzQjtBQVV4QixTQUFTLFFBQVE7QUFBQSxFQUNmLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
