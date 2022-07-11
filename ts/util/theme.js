var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var theme_exports = {};
__export(theme_exports, {
  Theme: () => Theme,
  themeClassName: () => themeClassName
});
module.exports = __toCommonJS(theme_exports);
var import_missingCaseError = require("./missingCaseError");
var Theme = /* @__PURE__ */ ((Theme2) => {
  Theme2[Theme2["Light"] = 0] = "Light";
  Theme2[Theme2["Dark"] = 1] = "Dark";
  return Theme2;
})(Theme || {});
function themeClassName(theme) {
  switch (theme) {
    case 0 /* Light */:
      return "light-theme";
    case 1 /* Dark */:
      return "dark-theme";
    default:
      throw (0, import_missingCaseError.missingCaseError)(theme);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Theme,
  themeClassName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4vbWlzc2luZ0Nhc2VFcnJvcic7XG5cbmV4cG9ydCBlbnVtIFRoZW1lIHtcbiAgTGlnaHQsXG4gIERhcmssXG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0aGVtZUNsYXNzTmFtZSh0aGVtZTogVGhlbWUpOiBzdHJpbmcge1xuICBzd2l0Y2ggKHRoZW1lKSB7XG4gICAgY2FzZSBUaGVtZS5MaWdodDpcbiAgICAgIHJldHVybiAnbGlnaHQtdGhlbWUnO1xuICAgIGNhc2UgVGhlbWUuRGFyazpcbiAgICAgIHJldHVybiAnZGFyay10aGVtZSc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IodGhlbWUpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFBaUM7QUFFMUIsSUFBSyxRQUFMLGtCQUFLLFdBQUw7QUFDTDtBQUNBO0FBRlU7QUFBQTtBQUtMLHdCQUF3QixPQUFzQjtBQUNuRCxVQUFRO0FBQUEsU0FDRDtBQUNILGFBQU87QUFBQSxTQUNKO0FBQ0gsYUFBTztBQUFBO0FBRVAsWUFBTSw4Q0FBaUIsS0FBSztBQUFBO0FBRWxDO0FBVGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
