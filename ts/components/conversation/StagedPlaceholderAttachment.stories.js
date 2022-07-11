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
var StagedPlaceholderAttachment_stories_exports = {};
__export(StagedPlaceholderAttachment_stories_exports, {
  Default: () => Default,
  default: () => StagedPlaceholderAttachment_stories_default
});
module.exports = __toCommonJS(StagedPlaceholderAttachment_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StagedPlaceholderAttachment = require("./StagedPlaceholderAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StagedPlaceholderAttachment_stories_default = {
  title: "Components/Conversation/StagedPlaceholderAttachment"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_StagedPlaceholderAttachment.StagedPlaceholderAttachment, {
    i18n,
    onClick: (0, import_addon_actions.action)("onClick")
  });
}, "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhZ2VkUGxhY2Vob2xkZXJBdHRhY2htZW50LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3RhZ2VkUGxhY2Vob2xkZXJBdHRhY2htZW50IH0gZnJvbSAnLi9TdGFnZWRQbGFjZWhvbGRlckF0dGFjaG1lbnQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vU3RhZ2VkUGxhY2Vob2xkZXJBdHRhY2htZW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8U3RhZ2VkUGxhY2Vob2xkZXJBdHRhY2htZW50IGkxOG49e2kxOG59IG9uQ2xpY2s9e2FjdGlvbignb25DbGljaycpfSAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBQ3ZCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLHlDQUE0QztBQUU1QyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDhDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQW1CO0FBQ3hDLFNBQ0Usb0NBQUM7QUFBQSxJQUE0QjtBQUFBLElBQVksU0FBUyxpQ0FBTyxTQUFTO0FBQUEsR0FBRztBQUV6RSxHQUp1QjsiLAogICJuYW1lcyI6IFtdCn0K
