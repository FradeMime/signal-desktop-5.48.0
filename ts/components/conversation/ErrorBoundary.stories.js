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
var ErrorBoundary_stories_exports = {};
__export(ErrorBoundary_stories_exports, {
  ErrorState: () => ErrorState,
  default: () => ErrorBoundary_stories_default
});
module.exports = __toCommonJS(ErrorBoundary_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_ErrorBoundary = require("./ErrorBoundary");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ErrorBoundary_stories_default = {
  title: "Components/Conversation/ErrorBoundary"
};
const Fail = /* @__PURE__ */ __name(() => {
  throw new Error("Failed");
}, "Fail");
const ErrorState = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_ErrorBoundary.ErrorBoundary, {
    i18n,
    showDebugLog: (0, import_addon_actions.action)("showDebugLog")
  }, /* @__PURE__ */ React.createElement(Fail, null));
}, "ErrorState");
ErrorState.story = {
  name: "Error state"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorState
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXJyb3JCb3VuZGFyeS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IEVycm9yQm91bmRhcnkgfSBmcm9tICcuL0Vycm9yQm91bmRhcnknO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vRXJyb3JCb3VuZGFyeScsXG59O1xuXG5jb25zdCBGYWlsOiBSZWFjdC5GQzxSZWNvcmQ8c3RyaW5nLCBuZXZlcj4+ID0gKCkgPT4ge1xuICB0aHJvdyBuZXcgRXJyb3IoJ0ZhaWxlZCcpO1xufTtcblxuZXhwb3J0IGNvbnN0IEVycm9yU3RhdGUgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxFcnJvckJvdW5kYXJ5IGkxOG49e2kxOG59IHNob3dEZWJ1Z0xvZz17YWN0aW9uKCdzaG93RGVidWdMb2cnKX0+XG4gICAgICA8RmFpbCAvPlxuICAgIDwvRXJyb3JCb3VuZGFyeT5cbiAgKTtcbn07XG5cbkVycm9yU3RhdGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdFcnJvciBzdGF0ZScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsMkJBQXVCO0FBRXZCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsMkJBQThCO0FBRTlCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sZ0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sT0FBd0MsNkJBQU07QUFDbEQsUUFBTSxJQUFJLE1BQU0sUUFBUTtBQUMxQixHQUY4QztBQUl2QyxNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFNBQ0Usb0NBQUM7QUFBQSxJQUFjO0FBQUEsSUFBWSxjQUFjLGlDQUFPLGNBQWM7QUFBQSxLQUM1RCxvQ0FBQyxVQUFLLENBQ1I7QUFFSixHQU4wQjtBQVExQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
