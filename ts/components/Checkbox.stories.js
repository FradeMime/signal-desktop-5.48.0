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
var Checkbox_stories_exports = {};
__export(Checkbox_stories_exports, {
  Checked: () => Checked,
  Description: () => Description,
  Disabled: () => Disabled,
  Normal: () => Normal,
  default: () => Checkbox_stories_default
});
module.exports = __toCommonJS(Checkbox_stories_exports);
var import_react = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_Checkbox = require("./Checkbox");
const createProps = /* @__PURE__ */ __name(() => ({
  checked: false,
  label: "Check Me!",
  name: "check-me",
  onChange: (0, import_addon_actions.action)("onChange")
}), "createProps");
var Checkbox_stories_default = {
  title: "Components/Checkbox"
};
const Normal = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
  ...createProps()
}), "Normal");
const Checked = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
  ...createProps(),
  checked: true
}), "Checked");
const Description = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
  ...createProps(),
  description: "This is a checkbox"
}), "Description");
const Disabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(import_Checkbox.Checkbox, {
  ...createProps(),
  disabled: true
}), "Disabled");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checked,
  Description,
  Disabled,
  Normal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hlY2tib3guc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9DaGVja2JveCc7XG5pbXBvcnQgeyBDaGVja2JveCB9IGZyb20gJy4vQ2hlY2tib3gnO1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9ICgpOiBQcm9wc1R5cGUgPT4gKHtcbiAgY2hlY2tlZDogZmFsc2UsXG4gIGxhYmVsOiAnQ2hlY2sgTWUhJyxcbiAgbmFtZTogJ2NoZWNrLW1lJyxcbiAgb25DaGFuZ2U6IGFjdGlvbignb25DaGFuZ2UnKSxcbn0pO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9DaGVja2JveCcsXG59O1xuXG5leHBvcnQgY29uc3QgTm9ybWFsID0gKCk6IEpTWC5FbGVtZW50ID0+IDxDaGVja2JveCB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG5leHBvcnQgY29uc3QgQ2hlY2tlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDaGVja2JveCB7Li4uY3JlYXRlUHJvcHMoKX0gY2hlY2tlZCAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IERlc2NyaXB0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENoZWNrYm94IHsuLi5jcmVhdGVQcm9wcygpfSBkZXNjcmlwdGlvbj1cIlRoaXMgaXMgYSBjaGVja2JveFwiIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRGlzYWJsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2hlY2tib3ggey4uLmNyZWF0ZVByb3BzKCl9IGRpc2FibGVkIC8+XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLDJCQUF1QjtBQUd2QixzQkFBeUI7QUFFekIsTUFBTSxjQUFjLDZCQUFrQjtBQUFBLEVBQ3BDLFNBQVM7QUFBQSxFQUNULE9BQU87QUFBQSxFQUNQLE1BQU07QUFBQSxFQUNOLFVBQVUsaUNBQU8sVUFBVTtBQUM3QixJQUxvQjtBQU9wQixJQUFPLDJCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLFNBQVMsNkJBQW1CLG1EQUFDO0FBQUEsS0FBYSxZQUFZO0FBQUEsQ0FBRyxHQUFoRDtBQUNmLE1BQU0sVUFBVSw2QkFDckIsbURBQUM7QUFBQSxLQUFhLFlBQVk7QUFBQSxFQUFHLFNBQU87QUFBQSxDQUFDLEdBRGhCO0FBSWhCLE1BQU0sY0FBYyw2QkFDekIsbURBQUM7QUFBQSxLQUFhLFlBQVk7QUFBQSxFQUFHLGFBQVk7QUFBQSxDQUFxQixHQURyQztBQUlwQixNQUFNLFdBQVcsNkJBQ3RCLG1EQUFDO0FBQUEsS0FBYSxZQUFZO0FBQUEsRUFBRyxVQUFRO0FBQUEsQ0FBQyxHQURoQjsiLAogICJuYW1lcyI6IFtdCn0K
