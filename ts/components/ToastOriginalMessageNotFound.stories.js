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
var ToastOriginalMessageNotFound_stories_exports = {};
__export(ToastOriginalMessageNotFound_stories_exports, {
  _ToastOriginalMessageNotFound: () => _ToastOriginalMessageNotFound,
  default: () => ToastOriginalMessageNotFound_stories_default
});
module.exports = __toCommonJS(ToastOriginalMessageNotFound_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastOriginalMessageNotFound = require("./ToastOriginalMessageNotFound");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
};
var ToastOriginalMessageNotFound_stories_default = {
  title: "Components/ToastOriginalMessageNotFound"
};
const _ToastOriginalMessageNotFound = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastOriginalMessageNotFound.ToastOriginalMessageNotFound, {
  ...defaultProps
}), "_ToastOriginalMessageNotFound");
_ToastOriginalMessageNotFound.story = {
  name: "ToastOriginalMessageNotFound"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastOriginalMessageNotFound
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RPcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IFRvYXN0T3JpZ2luYWxNZXNzYWdlTm90Rm91bmQgfSBmcm9tICcuL1RvYXN0T3JpZ2luYWxNZXNzYWdlTm90Rm91bmQnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1RvYXN0T3JpZ2luYWxNZXNzYWdlTm90Rm91bmQnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9Ub2FzdE9yaWdpbmFsTWVzc2FnZU5vdEZvdW5kID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvYXN0T3JpZ2luYWxNZXNzYWdlTm90Rm91bmQgey4uLmRlZmF1bHRQcm9wc30gLz5cbik7XG5cbl9Ub2FzdE9yaWdpbmFsTWVzc2FnZU5vdEZvdW5kLnN0b3J5ID0ge1xuICBuYW1lOiAnVG9hc3RPcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUN2QiwwQ0FBNkM7QUFFN0MsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLGVBQWU7QUFBQSxFQUNuQjtBQUFBLEVBQ0EsU0FBUyxpQ0FBTyxTQUFTO0FBQzNCO0FBRUEsSUFBTywrQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxnQ0FBZ0MsNkJBQzNDLG1EQUFDO0FBQUEsS0FBaUM7QUFBQSxDQUFjLEdBREw7QUFJN0MsOEJBQThCLFFBQVE7QUFBQSxFQUNwQyxNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
