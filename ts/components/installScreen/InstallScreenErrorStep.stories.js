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
var InstallScreenErrorStep_stories_exports = {};
__export(InstallScreenErrorStep_stories_exports, {
  _ConnectionFailed: () => _ConnectionFailed,
  _TooManyDevices: () => _TooManyDevices,
  _TooOld: () => _TooOld,
  _UnknownError: () => _UnknownError,
  __TooOld: () => __TooOld,
  default: () => InstallScreenErrorStep_stories_default
});
module.exports = __toCommonJS(InstallScreenErrorStep_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_InstallScreenErrorStep = require("./InstallScreenErrorStep");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var InstallScreenErrorStep_stories_default = {
  title: "Components/InstallScreen/InstallScreenErrorStep"
};
const defaultProps = {
  i18n,
  quit: (0, import_addon_actions.action)("quit"),
  tryAgain: (0, import_addon_actions.action)("tryAgain")
};
const _TooManyDevices = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
  ...defaultProps,
  error: import_InstallScreenErrorStep.InstallError.TooManyDevices
}), "_TooManyDevices");
_TooManyDevices.story = {
  name: "Too many devices"
};
const _TooOld = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
  ...defaultProps,
  error: import_InstallScreenErrorStep.InstallError.TooOld
}), "_TooOld");
_TooOld.story = {
  name: "Too old"
};
const __TooOld = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
  ...defaultProps,
  error: import_InstallScreenErrorStep.InstallError.TooOld
}), "__TooOld");
__TooOld.story = {
  name: "Too old"
};
const _ConnectionFailed = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
  ...defaultProps,
  error: import_InstallScreenErrorStep.InstallError.ConnectionFailed
}), "_ConnectionFailed");
_ConnectionFailed.story = {
  name: "Connection failed"
};
const _UnknownError = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_InstallScreenErrorStep.InstallScreenErrorStep, {
  ...defaultProps,
  error: import_InstallScreenErrorStep.InstallError.UnknownError
}), "_UnknownError");
_UnknownError.story = {
  name: "Unknown error"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ConnectionFailed,
  _TooManyDevices,
  _TooOld,
  _UnknownError,
  __TooOld
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5zdGFsbFNjcmVlbkVycm9yU3RlcC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi8uLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuaW1wb3J0IHsgSW5zdGFsbFNjcmVlbkVycm9yU3RlcCwgSW5zdGFsbEVycm9yIH0gZnJvbSAnLi9JbnN0YWxsU2NyZWVuRXJyb3JTdGVwJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvSW5zdGFsbFNjcmVlbi9JbnN0YWxsU2NyZWVuRXJyb3JTdGVwJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRQcm9wcyA9IHtcbiAgaTE4bixcbiAgcXVpdDogYWN0aW9uKCdxdWl0JyksXG4gIHRyeUFnYWluOiBhY3Rpb24oJ3RyeUFnYWluJyksXG59O1xuXG5leHBvcnQgY29uc3QgX1Rvb01hbnlEZXZpY2VzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluc3RhbGxTY3JlZW5FcnJvclN0ZXBcbiAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgIGVycm9yPXtJbnN0YWxsRXJyb3IuVG9vTWFueURldmljZXN9XG4gIC8+XG4pO1xuXG5fVG9vTWFueURldmljZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdUb28gbWFueSBkZXZpY2VzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfVG9vT2xkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEluc3RhbGxTY3JlZW5FcnJvclN0ZXAgey4uLmRlZmF1bHRQcm9wc30gZXJyb3I9e0luc3RhbGxFcnJvci5Ub29PbGR9IC8+XG4pO1xuXG5fVG9vT2xkLnN0b3J5ID0ge1xuICBuYW1lOiAnVG9vIG9sZCcsXG59O1xuXG5leHBvcnQgY29uc3QgX19Ub29PbGQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8SW5zdGFsbFNjcmVlbkVycm9yU3RlcCB7Li4uZGVmYXVsdFByb3BzfSBlcnJvcj17SW5zdGFsbEVycm9yLlRvb09sZH0gLz5cbik7XG5cbl9fVG9vT2xkLnN0b3J5ID0ge1xuICBuYW1lOiAnVG9vIG9sZCcsXG59O1xuXG5leHBvcnQgY29uc3QgX0Nvbm5lY3Rpb25GYWlsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8SW5zdGFsbFNjcmVlbkVycm9yU3RlcFxuICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgZXJyb3I9e0luc3RhbGxFcnJvci5Db25uZWN0aW9uRmFpbGVkfVxuICAvPlxuKTtcblxuX0Nvbm5lY3Rpb25GYWlsZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb25uZWN0aW9uIGZhaWxlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgX1Vua25vd25FcnJvciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxJbnN0YWxsU2NyZWVuRXJyb3JTdGVwIHsuLi5kZWZhdWx0UHJvcHN9IGVycm9yPXtJbnN0YWxsRXJyb3IuVW5rbm93bkVycm9yfSAvPlxuKTtcblxuX1Vua25vd25FcnJvci5zdG9yeSA9IHtcbiAgbmFtZTogJ1Vua25vd24gZXJyb3InLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBRWxCLDJCQUF1QjtBQUV2Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLG9DQUFxRDtBQUVyRCxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLHlDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsTUFBTSxpQ0FBTyxNQUFNO0FBQUEsRUFDbkIsVUFBVSxpQ0FBTyxVQUFVO0FBQzdCO0FBRU8sTUFBTSxrQkFBa0IsNkJBQzdCLG1EQUFDO0FBQUEsS0FDSztBQUFBLEVBQ0osT0FBTywyQ0FBYTtBQUFBLENBQ3RCLEdBSjZCO0FBTy9CLGdCQUFnQixRQUFRO0FBQUEsRUFDdEIsTUFBTTtBQUNSO0FBRU8sTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEtBQTJCO0FBQUEsRUFBYyxPQUFPLDJDQUFhO0FBQUEsQ0FBUSxHQURqRDtBQUl2QixRQUFRLFFBQVE7QUFBQSxFQUNkLE1BQU07QUFDUjtBQUVPLE1BQU0sV0FBVyw2QkFDdEIsbURBQUM7QUFBQSxLQUEyQjtBQUFBLEVBQWMsT0FBTywyQ0FBYTtBQUFBLENBQVEsR0FEaEQ7QUFJeEIsU0FBUyxRQUFRO0FBQUEsRUFDZixNQUFNO0FBQ1I7QUFFTyxNQUFNLG9CQUFvQiw2QkFDL0IsbURBQUM7QUFBQSxLQUNLO0FBQUEsRUFDSixPQUFPLDJDQUFhO0FBQUEsQ0FDdEIsR0FKK0I7QUFPakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFDM0IsbURBQUM7QUFBQSxLQUEyQjtBQUFBLEVBQWMsT0FBTywyQ0FBYTtBQUFBLENBQWMsR0FEakQ7QUFJN0IsY0FBYyxRQUFRO0FBQUEsRUFDcEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
