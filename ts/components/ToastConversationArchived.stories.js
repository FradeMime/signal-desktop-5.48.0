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
var ToastConversationArchived_stories_exports = {};
__export(ToastConversationArchived_stories_exports, {
  _ToastConversationArchived: () => _ToastConversationArchived,
  default: () => ToastConversationArchived_stories_default
});
module.exports = __toCommonJS(ToastConversationArchived_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_ToastConversationArchived = require("./ToastConversationArchived");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  i18n,
  onClose: (0, import_addon_actions.action)("onClose"),
  undo: (0, import_addon_actions.action)("undo")
};
var ToastConversationArchived_stories_default = {
  title: "Components/ToastConversationArchived"
};
const _ToastConversationArchived = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_ToastConversationArchived.ToastConversationArchived, {
  ...defaultProps
}), "_ToastConversationArchived");
_ToastConversationArchived.story = {
  name: "ToastConversationArchived"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _ToastConversationArchived
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IFRvYXN0Q29udmVyc2F0aW9uQXJjaGl2ZWQgfSBmcm9tICcuL1RvYXN0Q29udmVyc2F0aW9uQXJjaGl2ZWQnO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBpMThuLFxuICBvbkNsb3NlOiBhY3Rpb24oJ29uQ2xvc2UnKSxcbiAgdW5kbzogYWN0aW9uKCd1bmRvJyksXG59O1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Ub2FzdENvbnZlcnNhdGlvbkFyY2hpdmVkJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxUb2FzdENvbnZlcnNhdGlvbkFyY2hpdmVkIHsuLi5kZWZhdWx0UHJvcHN9IC8+XG4pO1xuXG5fVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ1RvYXN0Q29udmVyc2F0aW9uQXJjaGl2ZWQnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQiwyQkFBdUI7QUFDdkIsdUNBQTBDO0FBRTFDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxlQUFlO0FBQUEsRUFDbkI7QUFBQSxFQUNBLFNBQVMsaUNBQU8sU0FBUztBQUFBLEVBQ3pCLE1BQU0saUNBQU8sTUFBTTtBQUNyQjtBQUVBLElBQU8sNENBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sNkJBQTZCLDZCQUN4QyxtREFBQztBQUFBLEtBQThCO0FBQUEsQ0FBYyxHQURMO0FBSTFDLDJCQUEyQixRQUFRO0FBQUEsRUFDakMsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
