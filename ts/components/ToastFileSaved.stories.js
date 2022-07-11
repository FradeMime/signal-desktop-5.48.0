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
var ToastFileSaved_stories_exports = {};
__export(ToastFileSaved_stories_exports, {
  _ToastFileSaved: () => _ToastFileSaved,
  default: () => ToastFileSaved_stories_default
});
module.exports = __toCommonJS(ToastFileSaved_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastFileSaved = require("./ToastFileSaved");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  onOpenFile: (0, import_addon_actions.action)("onOpenFile")
};
var ToastFileSaved_stories_default = {
  title: "Components/ToastFileSaved"
};
const _ToastFileSaved = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastFileSaved.ToastFileSaved, {
  ...defaultProps
}), "_ToastFileSaved");
_ToastFileSaved.story = {
  name: "ToastFileSaved"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastFileSaved
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RGaWxlU2F2ZWQuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBUb2FzdEZpbGVTYXZlZCB9IGZyb20gJy4vVG9hc3RGaWxlU2F2ZWQnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgb25PcGVuRmlsZTogYWN0aW9uKCdvbk9wZW5GaWxlJyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Ub2FzdEZpbGVTYXZlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgX1RvYXN0RmlsZVNhdmVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvYXN0RmlsZVNhdmVkIHsuLi5kZWZhdWx0UHJvcHN9IC8+XG4pO1xuXG5fVG9hc3RGaWxlU2F2ZWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdUb2FzdEZpbGVTYXZlZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUN2Qiw0QkFBK0I7QUFFL0IsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQUEsRUFDekIsWUFBWSxpQ0FBTyxZQUFZO0FBQ2pDO0FBRUEsSUFBTyxpQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxrQkFBa0IsNkJBQzdCLG1EQUFDO0FBQUEsS0FBbUI7QUFBQSxDQUFjLEdBREw7QUFJL0IsZ0JBQWdCLFFBQVE7QUFBQSxFQUN0QixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
