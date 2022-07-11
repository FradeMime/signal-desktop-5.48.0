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
var root_exports = {};
__export(root_exports, {
  Root: () => Root
});
module.exports = __toCommonJS(root_exports);
var import_root = require("react-hot-loader/root");
var React = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_react_router_dom = require("react-router-dom");
var import_app = require("./app");
var import_history = require("./util/history");
var import_store = require("./store");
var import_i18n = require("./util/i18n");
const { localeMessages, SignalContext } = window;
const ColdRoot = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_react_redux.Provider, {
  store: import_store.store
}, /* @__PURE__ */ React.createElement(import_react_router_dom.Router, {
  history: import_history.history
}, /* @__PURE__ */ React.createElement(import_i18n.I18n, {
  messages: localeMessages,
  locale: SignalContext.config.locale
}, /* @__PURE__ */ React.createElement(import_app.App, {
  executeMenuRole: SignalContext.executeMenuRole,
  platform: SignalContext.OS.platform,
  isWindows11: SignalContext.OS.isWindows11()
})))), "ColdRoot");
const Root = (0, import_root.hot)(ColdRoot);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Root
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicm9vdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBob3QgfSBmcm9tICdyZWFjdC1ob3QtbG9hZGVyL3Jvb3QnO1xuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgUHJvdmlkZXIgYXMgUmVkdXhQcm92aWRlciB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IFJvdXRlciB9IGZyb20gJ3JlYWN0LXJvdXRlci1kb20nO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi9hcHAnO1xuaW1wb3J0IHsgaGlzdG9yeSB9IGZyb20gJy4vdXRpbC9oaXN0b3J5JztcbmltcG9ydCB7IHN0b3JlIH0gZnJvbSAnLi9zdG9yZSc7XG5pbXBvcnQgeyBJMThuIH0gZnJvbSAnLi91dGlsL2kxOG4nO1xuXG5jb25zdCB7IGxvY2FsZU1lc3NhZ2VzLCBTaWduYWxDb250ZXh0IH0gPSB3aW5kb3c7XG5cbmNvbnN0IENvbGRSb290ID0gKCkgPT4gKFxuICA8UmVkdXhQcm92aWRlciBzdG9yZT17c3RvcmV9PlxuICAgIDxSb3V0ZXIgaGlzdG9yeT17aGlzdG9yeX0+XG4gICAgICA8STE4biBtZXNzYWdlcz17bG9jYWxlTWVzc2FnZXN9IGxvY2FsZT17U2lnbmFsQ29udGV4dC5jb25maWcubG9jYWxlfT5cbiAgICAgICAgPEFwcFxuICAgICAgICAgIGV4ZWN1dGVNZW51Um9sZT17U2lnbmFsQ29udGV4dC5leGVjdXRlTWVudVJvbGV9XG4gICAgICAgICAgcGxhdGZvcm09e1NpZ25hbENvbnRleHQuT1MucGxhdGZvcm19XG4gICAgICAgICAgaXNXaW5kb3dzMTE9e1NpZ25hbENvbnRleHQuT1MuaXNXaW5kb3dzMTEoKX1cbiAgICAgICAgLz5cbiAgICAgIDwvSTE4bj5cbiAgICA8L1JvdXRlcj5cbiAgPC9SZWR1eFByb3ZpZGVyPlxuKTtcblxuZXhwb3J0IGNvbnN0IFJvb3QgPSBob3QoQ29sZFJvb3QpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFvQjtBQUNwQixZQUF1QjtBQUN2Qix5QkFBMEM7QUFDMUMsOEJBQXVCO0FBQ3ZCLGlCQUFvQjtBQUNwQixxQkFBd0I7QUFDeEIsbUJBQXNCO0FBQ3RCLGtCQUFxQjtBQUVyQixNQUFNLEVBQUUsZ0JBQWdCLGtCQUFrQjtBQUUxQyxNQUFNLFdBQVcsNkJBQ2Ysb0NBQUM7QUFBQSxFQUFjLE9BQU87QUFBQSxHQUNwQixvQ0FBQztBQUFBLEVBQU8sU0FBUztBQUFBLEdBQ2Ysb0NBQUM7QUFBQSxFQUFLLFVBQVU7QUFBQSxFQUFnQixRQUFRLGNBQWMsT0FBTztBQUFBLEdBQzNELG9DQUFDO0FBQUEsRUFDQyxpQkFBaUIsY0FBYztBQUFBLEVBQy9CLFVBQVUsY0FBYyxHQUFHO0FBQUEsRUFDM0IsYUFBYSxjQUFjLEdBQUcsWUFBWTtBQUFBLENBQzVDLENBQ0YsQ0FDRixDQUNGLEdBWGU7QUFjVixNQUFNLE9BQU8scUJBQUksUUFBUTsiLAogICJuYW1lcyI6IFtdCn0K
