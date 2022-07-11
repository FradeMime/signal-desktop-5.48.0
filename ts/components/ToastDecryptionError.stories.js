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
var ToastDecryptionError_stories_exports = {};
__export(ToastDecryptionError_stories_exports, {
  _ToastDecryptionError: () => _ToastDecryptionError,
  default: () => ToastDecryptionError_stories_default
});
module.exports = __toCommonJS(ToastDecryptionError_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastDecryptionError = require("./ToastDecryptionError");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  deviceId: 3,
  i18n,
  name: "Someone Somewhere",
  onClose: (0, import_addon_actions.action)("onClose"),
  onShowDebugLog: (0, import_addon_actions.action)("onShowDebugLog")
};
var ToastDecryptionError_stories_default = {
  title: "Components/ToastDecryptionError"
};
const _ToastDecryptionError = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastDecryptionError.ToastDecryptionError, {
  ...defaultProps
}), "_ToastDecryptionError");
_ToastDecryptionError.story = {
  name: "ToastDecryptionError"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastDecryptionError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3REZWNyeXB0aW9uRXJyb3Iuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBUb2FzdERlY3J5cHRpb25FcnJvciB9IGZyb20gJy4vVG9hc3REZWNyeXB0aW9uRXJyb3InO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBkZXZpY2VJZDogMyxcbiAgaTE4bixcbiAgbmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgb25DbG9zZTogYWN0aW9uKCdvbkNsb3NlJyksXG4gIG9uU2hvd0RlYnVnTG9nOiBhY3Rpb24oJ29uU2hvd0RlYnVnTG9nJyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Ub2FzdERlY3J5cHRpb25FcnJvcicsXG59O1xuXG5leHBvcnQgY29uc3QgX1RvYXN0RGVjcnlwdGlvbkVycm9yID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvYXN0RGVjcnlwdGlvbkVycm9yIHsuLi5kZWZhdWx0UHJvcHN9IC8+XG4pO1xuXG5fVG9hc3REZWNyeXB0aW9uRXJyb3Iuc3RvcnkgPSB7XG4gIG5hbWU6ICdUb2FzdERlY3J5cHRpb25FcnJvcicsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUN2QixrQ0FBcUM7QUFFckMsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGVBQWU7QUFBQSxFQUNuQixVQUFVO0FBQUEsRUFDVjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sU0FBUyxpQ0FBTyxTQUFTO0FBQUEsRUFDekIsZ0JBQWdCLGlDQUFPLGdCQUFnQjtBQUN6QztBQUVBLElBQU8sdUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sd0JBQXdCLDZCQUNuQyxtREFBQztBQUFBLEtBQXlCO0FBQUEsQ0FBYyxHQURMO0FBSXJDLHNCQUFzQixRQUFRO0FBQUEsRUFDNUIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
