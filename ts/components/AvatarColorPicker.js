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
var AvatarColorPicker_exports = {};
__export(AvatarColorPicker_exports, {
  AvatarColorPicker: () => AvatarColorPicker
});
module.exports = __toCommonJS(AvatarColorPicker_exports);
var import_react = __toESM(require("react"));
var import_Colors = require("../types/Colors");
var import_BetterAvatarBubble = require("./BetterAvatarBubble");
const AvatarColorPicker = /* @__PURE__ */ __name(({
  i18n,
  onColorSelected,
  selectedColor
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarEditor__avatar-selector-title"
  }, i18n("AvatarColorPicker--choose")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AvatarEditor__avatars"
  }, import_Colors.AvatarColors.map((color) => /* @__PURE__ */ import_react.default.createElement(import_BetterAvatarBubble.BetterAvatarBubble, {
    color,
    i18n,
    isSelected: selectedColor === color,
    key: color,
    onSelect: () => {
      onColorSelected(color);
    }
  }))));
}, "AvatarColorPicker");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AvatarColorPicker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXZhdGFyQ29sb3JQaWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgdHlwZSB7IEF2YXRhckNvbG9yVHlwZSB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBBdmF0YXJDb2xvcnMgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBCZXR0ZXJBdmF0YXJCdWJibGUgfSBmcm9tICcuL0JldHRlckF2YXRhckJ1YmJsZSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25Db2xvclNlbGVjdGVkOiAoY29sb3I6IEF2YXRhckNvbG9yVHlwZSkgPT4gdW5rbm93bjtcbiAgc2VsZWN0ZWRDb2xvcj86IEF2YXRhckNvbG9yVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBBdmF0YXJDb2xvclBpY2tlciA9ICh7XG4gIGkxOG4sXG4gIG9uQ29sb3JTZWxlY3RlZCxcbiAgc2VsZWN0ZWRDb2xvcixcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJBdmF0YXJFZGl0b3JfX2F2YXRhci1zZWxlY3Rvci10aXRsZVwiPlxuICAgICAgICB7aTE4bignQXZhdGFyQ29sb3JQaWNrZXItLWNob29zZScpfVxuICAgICAgPC9kaXY+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkF2YXRhckVkaXRvcl9fYXZhdGFyc1wiPlxuICAgICAgICB7QXZhdGFyQ29sb3JzLm1hcChjb2xvciA9PiAoXG4gICAgICAgICAgPEJldHRlckF2YXRhckJ1YmJsZVxuICAgICAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzU2VsZWN0ZWQ9e3NlbGVjdGVkQ29sb3IgPT09IGNvbG9yfVxuICAgICAgICAgICAga2V5PXtjb2xvcn1cbiAgICAgICAgICAgIG9uU2VsZWN0PXsoKSA9PiB7XG4gICAgICAgICAgICAgIG9uQ29sb3JTZWxlY3RlZChjb2xvcik7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgPC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUVsQixvQkFBNkI7QUFFN0IsZ0NBQW1DO0FBUTVCLE1BQU0sb0JBQW9CLHdCQUFDO0FBQUEsRUFDaEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLEtBQUssMkJBQTJCLENBQ25DLEdBQ0EsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNaLDJCQUFhLElBQUksV0FDaEIsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0EsWUFBWSxrQkFBa0I7QUFBQSxJQUM5QixLQUFLO0FBQUEsSUFDTCxVQUFVLE1BQU07QUFDZCxzQkFBZ0IsS0FBSztBQUFBLElBQ3ZCO0FBQUEsR0FDRixDQUNELENBQ0gsQ0FDRjtBQUVKLEdBekJpQzsiLAogICJuYW1lcyI6IFtdCn0K
