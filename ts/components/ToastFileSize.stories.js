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
var ToastFileSize_stories_exports = {};
__export(ToastFileSize_stories_exports, {
  _ToastFileSize: () => _ToastFileSize,
  default: () => ToastFileSize_stories_default
});
module.exports = __toCommonJS(ToastFileSize_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastFileSize = require("./ToastFileSize");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose")
};
var ToastFileSize_stories_default = {
  title: "Components/ToastFileSize"
};
const _ToastFileSize = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastFileSize.ToastFileSize, {
  ...defaultProps,
  limit: 100,
  units: "MB"
}), "_ToastFileSize");
_ToastFileSize.story = {
  name: "ToastFileSize"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastFileSize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RGaWxlU2l6ZS5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IFRvYXN0RmlsZVNpemUgfSBmcm9tICcuL1RvYXN0RmlsZVNpemUnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL1RvYXN0RmlsZVNpemUnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9Ub2FzdEZpbGVTaXplID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFRvYXN0RmlsZVNpemUgey4uLmRlZmF1bHRQcm9wc30gbGltaXQ9ezEwMH0gdW5pdHM9XCJNQlwiIC8+XG4pO1xuXG5fVG9hc3RGaWxlU2l6ZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1RvYXN0RmlsZVNpemUnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQiwyQkFBdUI7QUFDdkIsMkJBQThCO0FBRTlCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxlQUFlO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUMzQjtBQUVBLElBQU8sZ0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0saUJBQWlCLDZCQUM1QixtREFBQztBQUFBLEtBQWtCO0FBQUEsRUFBYyxPQUFPO0FBQUEsRUFBSyxPQUFNO0FBQUEsQ0FBSyxHQUQ1QjtBQUk5QixlQUFlLFFBQVE7QUFBQSxFQUNyQixNQUFNO0FBQ1I7IiwKICAibmFtZXMiOiBbXQp9Cg==
