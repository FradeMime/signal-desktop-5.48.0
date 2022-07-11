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
var LabeledInput_stories_exports = {};
__export(LabeledInput_stories_exports, {
  _LabeledInput: () => _LabeledInput,
  default: () => LabeledInput_stories_default
});
module.exports = __toCommonJS(LabeledInput_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_LabeledInput = require("./LabeledInput");
var LabeledInput_stories_default = {
  title: "Sticker Creator/elements"
};
const _LabeledInput = /* @__PURE__ */ __name(() => {
  const child = (0, import_addon_knobs.text)("label", "foo bar");
  const placeholder = (0, import_addon_knobs.text)("placeholder", "foo bar");
  const [value, setValue] = React.useState("");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_LabeledInput.LabeledInput, {
    value,
    onChange: setValue,
    placeholder
  }, child));
}, "_LabeledInput");
_LabeledInput.story = {
  name: "LabeledInput"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _LabeledInput
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGFiZWxlZElucHV0LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4vU3RvcnlSb3cnO1xuaW1wb3J0IHsgTGFiZWxlZElucHV0IH0gZnJvbSAnLi9MYWJlbGVkSW5wdXQnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfTGFiZWxlZElucHV0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2hpbGQgPSB0ZXh0KCdsYWJlbCcsICdmb28gYmFyJyk7XG4gIGNvbnN0IHBsYWNlaG9sZGVyID0gdGV4dCgncGxhY2Vob2xkZXInLCAnZm9vIGJhcicpO1xuICBjb25zdCBbdmFsdWUsIHNldFZhbHVlXSA9IFJlYWN0LnVzZVN0YXRlKCcnKTtcblxuICByZXR1cm4gKFxuICAgIDxTdG9yeVJvdz5cbiAgICAgIDxMYWJlbGVkSW5wdXQgdmFsdWU9e3ZhbHVlfSBvbkNoYW5nZT17c2V0VmFsdWV9IHBsYWNlaG9sZGVyPXtwbGFjZWhvbGRlcn0+XG4gICAgICAgIHtjaGlsZH1cbiAgICAgIDwvTGFiZWxlZElucHV0PlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fTGFiZWxlZElucHV0LnN0b3J5ID0ge1xuICBuYW1lOiAnTGFiZWxlZElucHV0Jyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix5QkFBcUI7QUFFckIsc0JBQXlCO0FBQ3pCLDBCQUE2QjtBQUU3QixJQUFPLCtCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFTyxNQUFNLGdCQUFnQiw2QkFBbUI7QUFDOUMsUUFBTSxRQUFRLDZCQUFLLFNBQVMsU0FBUztBQUNyQyxRQUFNLGNBQWMsNkJBQUssZUFBZSxTQUFTO0FBQ2pELFFBQU0sQ0FBQyxPQUFPLFlBQVksTUFBTSxTQUFTLEVBQUU7QUFFM0MsU0FDRSxvQ0FBQyxnQ0FDQyxvQ0FBQztBQUFBLElBQWE7QUFBQSxJQUFjLFVBQVU7QUFBQSxJQUFVO0FBQUEsS0FDN0MsS0FDSCxDQUNGO0FBRUosR0FaNkI7QUFjN0IsY0FBYyxRQUFRO0FBQUEsRUFDcEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
