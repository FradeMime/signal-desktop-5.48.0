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
var ConfirmationDialog_stories_exports = {};
__export(ConfirmationDialog_stories_exports, {
  CustomCancelText: () => CustomCancelText,
  _ConfirmationDialog: () => _ConfirmationDialog,
  default: () => ConfirmationDialog_stories_default
});
module.exports = __toCommonJS(ConfirmationDialog_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ConfirmationDialog = require("./ConfirmationDialog");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConfirmationDialog_stories_default = {
  title: "Components/ConfirmationDialog"
};
const _ConfirmationDialog = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    i18n,
    onClose: (0, import_addon_actions.action)("onClose"),
    title: (0, import_addon_knobs.text)("Title", "Foo bar banana baz?"),
    actions: [
      {
        text: "Negate",
        style: "negative",
        action: (0, import_addon_actions.action)("negative")
      },
      {
        text: "Affirm",
        style: "affirmative",
        action: (0, import_addon_actions.action)("affirmative")
      }
    ]
  }, (0, import_addon_knobs.text)("Child text", "asdf blip"));
}, "_ConfirmationDialog");
_ConfirmationDialog.story = {
  name: "ConfirmationDialog"
};
const CustomCancelText = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ConfirmationDialog.ConfirmationDialog, {
    cancelText: "Nah",
    i18n,
    onClose: (0, import_addon_actions.action)("onClose"),
    title: (0, import_addon_knobs.text)("Title", "Foo bar banana baz?"),
    actions: [
      {
        text: "Maybe",
        style: "affirmative",
        action: (0, import_addon_actions.action)("affirmative")
      }
    ]
  }, (0, import_addon_knobs.text)("Child text", "asdf blip"));
}, "CustomCancelText");
CustomCancelText.story = {
  name: "Custom cancel text"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CustomCancelText,
  _ConfirmationDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29uZmlybWF0aW9uRGlhbG9nLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4vQ29uZmlybWF0aW9uRGlhbG9nJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db25maXJtYXRpb25EaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9Db25maXJtYXRpb25EaWFsb2cgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgICAgIHRpdGxlPXt0ZXh0KCdUaXRsZScsICdGb28gYmFyIGJhbmFuYSBiYXo/Jyl9XG4gICAgICBhY3Rpb25zPXtbXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnTmVnYXRlJyxcbiAgICAgICAgICBzdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgICAgICBhY3Rpb246IGFjdGlvbignbmVnYXRpdmUnKSxcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdBZmZpcm0nLFxuICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgIGFjdGlvbjogYWN0aW9uKCdhZmZpcm1hdGl2ZScpLFxuICAgICAgICB9LFxuICAgICAgXX1cbiAgICA+XG4gICAgICB7dGV4dCgnQ2hpbGQgdGV4dCcsICdhc2RmIGJsaXAnKX1cbiAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgKTtcbn07XG5cbl9Db25maXJtYXRpb25EaWFsb2cuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb25maXJtYXRpb25EaWFsb2cnLFxufTtcblxuZXhwb3J0IGNvbnN0IEN1c3RvbUNhbmNlbFRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDb25maXJtYXRpb25EaWFsb2dcbiAgICAgIGNhbmNlbFRleHQ9XCJOYWhcIlxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgICAgdGl0bGU9e3RleHQoJ1RpdGxlJywgJ0ZvbyBiYXIgYmFuYW5hIGJhej8nKX1cbiAgICAgIGFjdGlvbnM9e1tcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICdNYXliZScsXG4gICAgICAgICAgc3R5bGU6ICdhZmZpcm1hdGl2ZScsXG4gICAgICAgICAgYWN0aW9uOiBhY3Rpb24oJ2FmZmlybWF0aXZlJyksXG4gICAgICAgIH0sXG4gICAgICBdfVxuICAgID5cbiAgICAgIHt0ZXh0KCdDaGlsZCB0ZXh0JywgJ2FzZGYgYmxpcCcpfVxuICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICApO1xufTtcblxuQ3VzdG9tQ2FuY2VsVGV4dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0N1c3RvbSBjYW5jZWwgdGV4dCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFDdkIseUJBQXFCO0FBRXJCLGdDQUFtQztBQUNuQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8scUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sc0JBQXNCLDZCQUFtQjtBQUNwRCxTQUNFLG9DQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsT0FBTyw2QkFBSyxTQUFTLHFCQUFxQjtBQUFBLElBQzFDLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRLGlDQUFPLFVBQVU7QUFBQSxNQUMzQjtBQUFBLE1BQ0E7QUFBQSxRQUNFLE1BQU07QUFBQSxRQUNOLE9BQU87QUFBQSxRQUNQLFFBQVEsaUNBQU8sYUFBYTtBQUFBLE1BQzlCO0FBQUEsSUFDRjtBQUFBLEtBRUMsNkJBQUssY0FBYyxXQUFXLENBQ2pDO0FBRUosR0F0Qm1DO0FBd0JuQyxvQkFBb0IsUUFBUTtBQUFBLEVBQzFCLE1BQU07QUFDUjtBQUVPLE1BQU0sbUJBQW1CLDZCQUFtQjtBQUNqRCxTQUNFLG9DQUFDO0FBQUEsSUFDQyxZQUFXO0FBQUEsSUFDWDtBQUFBLElBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsSUFDekIsT0FBTyw2QkFBSyxTQUFTLHFCQUFxQjtBQUFBLElBQzFDLFNBQVM7QUFBQSxNQUNQO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixPQUFPO0FBQUEsUUFDUCxRQUFRLGlDQUFPLGFBQWE7QUFBQSxNQUM5QjtBQUFBLElBQ0Y7QUFBQSxLQUVDLDZCQUFLLGNBQWMsV0FBVyxDQUNqQztBQUVKLEdBbEJnQztBQW9CaEMsaUJBQWlCLFFBQVE7QUFBQSxFQUN2QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
