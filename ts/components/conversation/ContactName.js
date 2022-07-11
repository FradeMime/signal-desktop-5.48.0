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
var ContactName_exports = {};
__export(ContactName_exports, {
  ContactName: () => ContactName
});
module.exports = __toCommonJS(ContactName_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Emojify = require("./Emojify");
var import_getClassNamesFor = require("../../util/getClassNamesFor");
const ContactName = /* @__PURE__ */ __name(({
  contactNameColor,
  firstName,
  module: module2,
  preferFirstName,
  title
}) => {
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-contact-name", module2);
  let text;
  if (preferFirstName) {
    text = firstName || title || "";
  } else {
    text = title || "";
  }
  return /* @__PURE__ */ import_react.default.createElement("span", {
    className: (0, import_classnames.default)(getClassName(""), contactNameColor ? getClassName(`--${contactNameColor}`) : null),
    dir: "auto"
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text
  }));
}, "ContactName");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udGFjdE5hbWUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBFbW9qaWZ5IH0gZnJvbSAnLi9FbW9qaWZ5JztcbmltcG9ydCB0eXBlIHsgQ29udGFjdE5hbWVDb2xvclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgZ2V0Q2xhc3NOYW1lc0ZvciB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0Q2xhc3NOYW1lc0Zvcic7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgY29udGFjdE5hbWVDb2xvcj86IENvbnRhY3ROYW1lQ29sb3JUeXBlO1xuICBmaXJzdE5hbWU/OiBzdHJpbmc7XG4gIG1vZHVsZT86IHN0cmluZztcbiAgcHJlZmVyRmlyc3ROYW1lPzogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWN0TmFtZSA9ICh7XG4gIGNvbnRhY3ROYW1lQ29sb3IsXG4gIGZpcnN0TmFtZSxcbiAgbW9kdWxlLFxuICBwcmVmZXJGaXJzdE5hbWUsXG4gIHRpdGxlLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBnZXRDbGFzc05hbWUgPSBnZXRDbGFzc05hbWVzRm9yKCdtb2R1bGUtY29udGFjdC1uYW1lJywgbW9kdWxlKTtcblxuICBsZXQgdGV4dDogc3RyaW5nO1xuICBpZiAocHJlZmVyRmlyc3ROYW1lKSB7XG4gICAgdGV4dCA9IGZpcnN0TmFtZSB8fCB0aXRsZSB8fCAnJztcbiAgfSBlbHNlIHtcbiAgICB0ZXh0ID0gdGl0bGUgfHwgJyc7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxzcGFuXG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgIGdldENsYXNzTmFtZSgnJyksXG4gICAgICAgIGNvbnRhY3ROYW1lQ29sb3IgPyBnZXRDbGFzc05hbWUoYC0tJHtjb250YWN0TmFtZUNvbG9yfWApIDogbnVsbFxuICAgICAgKX1cbiAgICAgIGRpcj1cImF1dG9cIlxuICAgID5cbiAgICAgIDxFbW9qaWZ5IHRleHQ9e3RleHR9IC8+XG4gICAgPC9zcGFuPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLHFCQUF3QjtBQUV4Qiw4QkFBaUM7QUFVMUIsTUFBTSxjQUFjLHdCQUFDO0FBQUEsRUFDMUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsUUFBTSxlQUFlLDhDQUFpQix1QkFBdUIsT0FBTTtBQUVuRSxNQUFJO0FBQ0osTUFBSSxpQkFBaUI7QUFDbkIsV0FBTyxhQUFhLFNBQVM7QUFBQSxFQUMvQixPQUFPO0FBQ0wsV0FBTyxTQUFTO0FBQUEsRUFDbEI7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULGFBQWEsRUFBRSxHQUNmLG1CQUFtQixhQUFhLEtBQUssa0JBQWtCLElBQUksSUFDN0Q7QUFBQSxJQUNBLEtBQUk7QUFBQSxLQUVKLG1EQUFDO0FBQUEsSUFBUTtBQUFBLEdBQVksQ0FDdkI7QUFFSixHQTNCMkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
