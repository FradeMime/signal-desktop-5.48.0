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
var StagedGenericAttachment_exports = {};
__export(StagedGenericAttachment_exports, {
  StagedGenericAttachment: () => StagedGenericAttachment
});
module.exports = __toCommonJS(StagedGenericAttachment_exports);
var import_react = __toESM(require("react"));
var import_Attachment = require("../../types/Attachment");
const StagedGenericAttachment = /* @__PURE__ */ __name(({
  attachment,
  i18n,
  onClose
}) => {
  const { fileName, contentType } = attachment;
  const extension = (0, import_Attachment.getExtensionForDisplay)({ contentType, fileName });
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-staged-attachment module-staged-generic-attachment"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "module-staged-generic-attachment__close-button",
    "aria-label": i18n("close"),
    onClick: () => {
      if (onClose) {
        onClose(attachment);
      }
    }
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-staged-generic-attachment__icon"
  }, extension ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-staged-generic-attachment__icon__extension"
  }, extension) : null), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-staged-generic-attachment__filename"
  }, fileName));
}, "StagedGenericAttachment");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StagedGenericAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RhZ2VkR2VuZXJpY0F0dGFjaG1lbnQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgZ2V0RXh0ZW5zaW9uRm9yRGlzcGxheSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgb25DbG9zZTogKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PiB2b2lkO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IGNvbnN0IFN0YWdlZEdlbmVyaWNBdHRhY2htZW50ID0gKHtcbiAgYXR0YWNobWVudCxcbiAgaTE4bixcbiAgb25DbG9zZSxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB7IGZpbGVOYW1lLCBjb250ZW50VHlwZSB9ID0gYXR0YWNobWVudDtcbiAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RXh0ZW5zaW9uRm9yRGlzcGxheSh7IGNvbnRlbnRUeXBlLCBmaWxlTmFtZSB9KTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXN0YWdlZC1hdHRhY2htZW50IG1vZHVsZS1zdGFnZWQtZ2VuZXJpYy1hdHRhY2htZW50XCI+XG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtc3RhZ2VkLWdlbmVyaWMtYXR0YWNobWVudF9fY2xvc2UtYnV0dG9uXCJcbiAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGlmIChvbkNsb3NlKSB7XG4gICAgICAgICAgICBvbkNsb3NlKGF0dGFjaG1lbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zdGFnZWQtZ2VuZXJpYy1hdHRhY2htZW50X19pY29uXCI+XG4gICAgICAgIHtleHRlbnNpb24gPyAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RhZ2VkLWdlbmVyaWMtYXR0YWNobWVudF9faWNvbl9fZXh0ZW5zaW9uXCI+XG4gICAgICAgICAgICB7ZXh0ZW5zaW9ufVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtc3RhZ2VkLWdlbmVyaWMtYXR0YWNobWVudF9fZmlsZW5hbWVcIj5cbiAgICAgICAge2ZpbGVOYW1lfVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUdsQix3QkFBdUM7QUFTaEMsTUFBTSwwQkFBMEIsd0JBQUM7QUFBQSxFQUN0QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDd0I7QUFDeEIsUUFBTSxFQUFFLFVBQVUsZ0JBQWdCO0FBQ2xDLFFBQU0sWUFBWSw4Q0FBdUIsRUFBRSxhQUFhLFNBQVMsQ0FBQztBQUVsRSxTQUNFLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQ0MsTUFBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsY0FBWSxLQUFLLE9BQU87QUFBQSxJQUN4QixTQUFTLE1BQU07QUFDYixVQUFJLFNBQVM7QUFDWCxnQkFBUSxVQUFVO0FBQUEsTUFDcEI7QUFBQSxJQUNGO0FBQUEsR0FDRixHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixZQUNDLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixTQUNILElBQ0UsSUFDTixHQUNBLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDWixRQUNILENBQ0Y7QUFFSixHQWhDdUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
