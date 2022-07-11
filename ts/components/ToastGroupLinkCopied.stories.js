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
var ToastGroupLinkCopied_stories_exports = {};
__export(ToastGroupLinkCopied_stories_exports, {
  _ToastGroupLinkCopied: () => _ToastGroupLinkCopied,
  default: () => ToastGroupLinkCopied_stories_default
});
module.exports = __toCommonJS(ToastGroupLinkCopied_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastGroupLinkCopied = require("./ToastGroupLinkCopied");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
};
var ToastGroupLinkCopied_stories_default = {
  title: "Components/ToastGroupLinkCopied"
};
const _ToastGroupLinkCopied = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastGroupLinkCopied.ToastGroupLinkCopied, {
  ...defaultProps
}), "_ToastGroupLinkCopied");
_ToastGroupLinkCopied.story = {
  name: "ToastGroupLinkCopied"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastGroupLinkCopied
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RHcm91cExpbmtDb3BpZWQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBUb2FzdEdyb3VwTGlua0NvcGllZCB9IGZyb20gJy4vVG9hc3RHcm91cExpbmtDb3BpZWQnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1RvYXN0R3JvdXBMaW5rQ29waWVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfVG9hc3RHcm91cExpbmtDb3BpZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8VG9hc3RHcm91cExpbmtDb3BpZWQgey4uLmRlZmF1bHRQcm9wc30gLz5cbik7XG5cbl9Ub2FzdEdyb3VwTGlua0NvcGllZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1RvYXN0R3JvdXBMaW5rQ29waWVkJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsMkJBQXVCO0FBQ3ZCLGtDQUFxQztBQUVyQyx1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLE1BQU0sZUFBZTtBQUFBLEVBQ25CO0FBQUEsRUFDQSxTQUFTLGlDQUFPLFNBQVM7QUFDM0I7QUFFQSxJQUFPLHVDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLHdCQUF3Qiw2QkFDbkMsbURBQUM7QUFBQSxLQUF5QjtBQUFBLENBQWMsR0FETDtBQUlyQyxzQkFBc0IsUUFBUTtBQUFBLEVBQzVCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
