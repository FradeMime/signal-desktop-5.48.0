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
var Checkbox_exports = {};
__export(Checkbox_exports, {
  Checkbox: () => Checkbox
});
module.exports = __toCommonJS(Checkbox_exports);
var import_react = __toESM(require("react"));
var import_uuid = require("uuid");
var import_getClassNamesFor = require("../util/getClassNamesFor");
const Checkbox = /* @__PURE__ */ __name(({
  checked,
  description,
  disabled,
  isRadio,
  label,
  moduleClassName,
  name,
  onChange
}) => {
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("Checkbox", moduleClassName);
  const id = (0, import_react.useMemo)(() => `${name}::${(0, import_uuid.v4)()}`, [name]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__container")
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__checkbox")
  }, /* @__PURE__ */ import_react.default.createElement("input", {
    checked: Boolean(checked),
    disabled,
    id,
    name,
    onChange: (ev) => onChange(ev.target.checked),
    type: isRadio ? "radio" : "checkbox"
  })), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("label", {
    htmlFor: id
  }, label), /* @__PURE__ */ import_react.default.createElement("div", {
    className: getClassName("__description")
  }, description))));
}, "Checkbox");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Checkbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2hlY2tib3gudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjaGVja2VkPzogYm9vbGVhbjtcbiAgZGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIGRpc2FibGVkPzogYm9vbGVhbjtcbiAgaXNSYWRpbz86IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgbmFtZTogc3RyaW5nO1xuICBvbkNoYW5nZTogKHZhbHVlOiBib29sZWFuKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IENoZWNrYm94ID0gKHtcbiAgY2hlY2tlZCxcbiAgZGVzY3JpcHRpb24sXG4gIGRpc2FibGVkLFxuICBpc1JhZGlvLFxuICBsYWJlbCxcbiAgbW9kdWxlQ2xhc3NOYW1lLFxuICBuYW1lLFxuICBvbkNoYW5nZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcignQ2hlY2tib3gnLCBtb2R1bGVDbGFzc05hbWUpO1xuICBjb25zdCBpZCA9IHVzZU1lbW8oKCkgPT4gYCR7bmFtZX06OiR7dXVpZCgpfWAsIFtuYW1lXSk7XG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnJyl9PlxuICAgICAgPGRpdiBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19jb250YWluZXInKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXtnZXRDbGFzc05hbWUoJ19fY2hlY2tib3gnKX0+XG4gICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICBjaGVja2VkPXtCb29sZWFuKGNoZWNrZWQpfVxuICAgICAgICAgICAgZGlzYWJsZWQ9e2Rpc2FibGVkfVxuICAgICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgICAgIG9uQ2hhbmdlPXtldiA9PiBvbkNoYW5nZShldi50YXJnZXQuY2hlY2tlZCl9XG4gICAgICAgICAgICB0eXBlPXtpc1JhZGlvID8gJ3JhZGlvJyA6ICdjaGVja2JveCd9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXY+XG4gICAgICAgICAgPGxhYmVsIGh0bWxGb3I9e2lkfT57bGFiZWx9PC9sYWJlbD5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Z2V0Q2xhc3NOYW1lKCdfX2Rlc2NyaXB0aW9uJyl9PntkZXNjcmlwdGlvbn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQStCO0FBQy9CLGtCQUEyQjtBQUUzQiw4QkFBaUM7QUFhMUIsTUFBTSxXQUFXLHdCQUFDO0FBQUEsRUFDdkI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxlQUFlLDhDQUFpQixZQUFZLGVBQWU7QUFDakUsUUFBTSxLQUFLLDBCQUFRLE1BQU0sR0FBRyxTQUFTLG9CQUFLLEtBQUssQ0FBQyxJQUFJLENBQUM7QUFDckQsU0FDRSxtREFBQztBQUFBLElBQUksV0FBVyxhQUFhLEVBQUU7QUFBQSxLQUM3QixtREFBQztBQUFBLElBQUksV0FBVyxhQUFhLGFBQWE7QUFBQSxLQUN4QyxtREFBQztBQUFBLElBQUksV0FBVyxhQUFhLFlBQVk7QUFBQSxLQUN2QyxtREFBQztBQUFBLElBQ0MsU0FBUyxRQUFRLE9BQU87QUFBQSxJQUN4QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxVQUFVLFFBQU0sU0FBUyxHQUFHLE9BQU8sT0FBTztBQUFBLElBQzFDLE1BQU0sVUFBVSxVQUFVO0FBQUEsR0FDNUIsQ0FDRixHQUNBLG1EQUFDLGFBQ0MsbURBQUM7QUFBQSxJQUFNLFNBQVM7QUFBQSxLQUFLLEtBQU0sR0FDM0IsbURBQUM7QUFBQSxJQUFJLFdBQVcsYUFBYSxlQUFlO0FBQUEsS0FBSSxXQUFZLENBQzlELENBQ0YsQ0FDRjtBQUVKLEdBaEN3QjsiLAogICJuYW1lcyI6IFtdCn0K
