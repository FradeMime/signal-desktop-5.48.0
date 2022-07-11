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
var LabeledCheckbox_stories_exports = {};
__export(LabeledCheckbox_stories_exports, {
  _LabeledCheckbox: () => _LabeledCheckbox,
  default: () => LabeledCheckbox_stories_default
});
module.exports = __toCommonJS(LabeledCheckbox_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_LabeledCheckbox = require("./LabeledCheckbox");
var LabeledCheckbox_stories_default = {
  title: "Sticker Creator/elements"
};
const _LabeledCheckbox = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("label", "foo bar");
  const [checked, setChecked] = React.useState(false);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_LabeledCheckbox.LabeledCheckbox, {
    value: checked,
    onChange: setChecked
  }, child));
}, "_LabeledCheckbox");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _LabeledCheckbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFiZWxlZENoZWNrYm94LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4vU3RvcnlSb3cnO1xuaW1wb3J0IHsgTGFiZWxlZENoZWNrYm94IH0gZnJvbSAnLi9MYWJlbGVkQ2hlY2tib3gnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfTGFiZWxlZENoZWNrYm94ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KCdsYWJlbCcsICdmb28gYmFyJyk7XG4gIGNvbnN0IFtjaGVja2VkLCBzZXRDaGVja2VkXSA9IFJlYWN0LnVzZVN0YXRlKGZhbHNlKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVJvdz5cbiAgICAgIDxMYWJlbGVkQ2hlY2tib3ggdmFsdWU9e2NoZWNrZWR9IG9uQ2hhbmdlPXtzZXRDaGVja2VkfT5cbiAgICAgICAge2NoaWxkfVxuICAgICAgPC9MYWJlbGVkQ2hlY2tib3g+XG4gICAgPC9TdG9yeVJvdz5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsc0JBQXlCO0FBQ3pCLDZCQUFnQztBQUVoQyxJQUFPLGtDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLG1CQUFtQiw2QkFBbUI7QUFDakQsUUFBTSxRQUFRLDZCQUFLLFNBQVMsU0FBUztBQUNyQyxRQUFNLENBQUMsU0FBUyxjQUFjLE1BQU0sU0FBUyxLQUFLO0FBRWxELFNBQ0Usb0NBQUMsZ0NBQ0Msb0NBQUM7QUFBQSxJQUFnQixPQUFPO0FBQUEsSUFBUyxVQUFVO0FBQUEsS0FDeEMsS0FDSCxDQUNGO0FBRUosR0FYZ0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
