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
var WhatsNewModal_stories_exports = {};
__export(WhatsNewModal_stories_exports, {
  Modal: () => Modal,
  default: () => WhatsNewModal_stories_default
});
module.exports = __toCommonJS(WhatsNewModal_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_WhatsNewModal = require("./WhatsNewModal");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_setupI18n = require("../util/setupI18n");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var WhatsNewModal_stories_default = {
  title: "Components/WhatsNewModal"
};
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  hideWhatsNewModal: (0, import_addon_actions.action)("hideWhatsNewModal"),
  i18n
}), "getDefaultProps");
const Modal = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_WhatsNewModal.WhatsNewModal, {
  ...getDefaultProps()
}), "Modal");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Modal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2hhdHNOZXdNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL1doYXRzTmV3TW9kYWwnO1xuaW1wb3J0IHsgV2hhdHNOZXdNb2RhbCB9IGZyb20gJy4vV2hhdHNOZXdNb2RhbCc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvV2hhdHNOZXdNb2RhbCcsXG59O1xuXG5jb25zdCBnZXREZWZhdWx0UHJvcHMgPSAoKTogUHJvcHNUeXBlID0+ICh7XG4gIGhpZGVXaGF0c05ld01vZGFsOiBhY3Rpb24oJ2hpZGVXaGF0c05ld01vZGFsJyksXG4gIGkxOG4sXG59KTtcblxuZXhwb3J0IGNvbnN0IE1vZGFsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdoYXRzTmV3TW9kYWwgey4uLmdldERlZmF1bHRQcm9wcygpfSAvPlxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQiwyQkFBdUI7QUFHdkIsMkJBQThCO0FBQzlCLHNCQUF1QjtBQUN2Qix1QkFBMEI7QUFFMUIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTyxnQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxrQkFBa0IsNkJBQWtCO0FBQUEsRUFDeEMsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLEVBQzdDO0FBQ0YsSUFId0I7QUFLakIsTUFBTSxRQUFRLDZCQUNuQixtREFBQztBQUFBLEtBQWtCLGdCQUFnQjtBQUFBLENBQUcsR0FEbkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
