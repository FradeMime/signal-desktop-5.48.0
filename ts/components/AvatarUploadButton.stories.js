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
var AvatarUploadButton_stories_exports = {};
__export(AvatarUploadButton_stories_exports, {
  Default: () => Default,
  default: () => AvatarUploadButton_stories_default
});
module.exports = __toCommonJS(AvatarUploadButton_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_AvatarUploadButton = require("./AvatarUploadButton");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  className: overrideProps.className || "",
  i18n,
  onChange: (0, import_addon_actions.action)("onChange")
}), "createProps");
var AvatarUploadButton_stories_default = {
  title: "Components/AvatarUploadButton"
};
const Default = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_AvatarUploadButton.AvatarUploadButton, {
  ...createProps()
}), "Default");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyVXBsb2FkQnV0dG9uLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0F2YXRhclVwbG9hZEJ1dHRvbic7XG5pbXBvcnQgeyBBdmF0YXJVcGxvYWRCdXR0b24gfSBmcm9tICcuL0F2YXRhclVwbG9hZEJ1dHRvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGNsYXNzTmFtZTogb3ZlcnJpZGVQcm9wcy5jbGFzc05hbWUgfHwgJycsXG4gIGkxOG4sXG4gIG9uQ2hhbmdlOiBhY3Rpb24oJ29uQ2hhbmdlJyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQXZhdGFyVXBsb2FkQnV0dG9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEF2YXRhclVwbG9hZEJ1dHRvbiB7Li4uY3JlYXRlUHJvcHMoKX0gLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsMkJBQXVCO0FBQ3ZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFHdkIsZ0NBQW1DO0FBRW5DLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sY0FBYyx3QkFBQyxnQkFBb0MsQ0FBQyxNQUFrQjtBQUFBLEVBQzFFLFdBQVcsY0FBYyxhQUFhO0FBQUEsRUFDdEM7QUFBQSxFQUNBLFVBQVUsaUNBQU8sVUFBVTtBQUM3QixJQUpvQjtBQU1wQixJQUFPLHFDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFVBQVUsNkJBQ3JCLG1EQUFDO0FBQUEsS0FBdUIsWUFBWTtBQUFBLENBQUcsR0FEbEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
