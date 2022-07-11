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
var getTextStyleAttributes_exports = {};
__export(getTextStyleAttributes_exports, {
  TextStyle: () => TextStyle,
  getTextStyleAttributes: () => getTextStyleAttributes
});
module.exports = __toCommonJS(getTextStyleAttributes_exports);
var log = __toESM(require("../../logging/log"));
var import_color = require("./color");
var import_missingCaseError = require("../../util/missingCaseError");
var TextStyle = /* @__PURE__ */ ((TextStyle2) => {
  TextStyle2["Regular"] = "Regular";
  TextStyle2["Highlight"] = "Highlight";
  TextStyle2["Outline"] = "Outline";
  return TextStyle2;
})(TextStyle || {});
function getTextStyleAttributes(textStyle, hueSliderValue) {
  const color = (0, import_color.getHSL)(hueSliderValue);
  switch (textStyle) {
    case "Regular" /* Regular */:
      return { fill: color, strokeWidth: 0, textBackgroundColor: "" };
    case "Highlight" /* Highlight */:
      return {
        fill: hueSliderValue >= 95 ? "#000" : "#fff",
        strokeWidth: 0,
        textBackgroundColor: color
      };
    case "Outline" /* Outline */:
      return {
        fill: hueSliderValue >= 95 ? "#000" : "#fff",
        stroke: color,
        strokeWidth: 2,
        textBackgroundColor: ""
      };
    default:
      log.error((0, import_missingCaseError.missingCaseError)(textStyle));
      return getTextStyleAttributes("Regular" /* Regular */, hueSliderValue);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextStyle,
  getTextStyleAttributes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VGV4dFN0eWxlQXR0cmlidXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgZ2V0SFNMIH0gZnJvbSAnLi9jb2xvcic7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcblxuZXhwb3J0IGVudW0gVGV4dFN0eWxlIHtcbiAgUmVndWxhciA9ICdSZWd1bGFyJyxcbiAgSGlnaGxpZ2h0ID0gJ0hpZ2hsaWdodCcsXG4gIE91dGxpbmUgPSAnT3V0bGluZScsXG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRUZXh0U3R5bGVBdHRyaWJ1dGVzKFxuICB0ZXh0U3R5bGU6IFRleHRTdHlsZSxcbiAgaHVlU2xpZGVyVmFsdWU6IG51bWJlclxuKToge1xuICBmaWxsOiBzdHJpbmc7XG4gIHN0cm9rZT86IHN0cmluZztcbiAgc3Ryb2tlV2lkdGg6IG51bWJlcjtcbiAgdGV4dEJhY2tncm91bmRDb2xvcjogc3RyaW5nO1xufSB7XG4gIGNvbnN0IGNvbG9yID0gZ2V0SFNMKGh1ZVNsaWRlclZhbHVlKTtcbiAgc3dpdGNoICh0ZXh0U3R5bGUpIHtcbiAgICBjYXNlIFRleHRTdHlsZS5SZWd1bGFyOlxuICAgICAgcmV0dXJuIHsgZmlsbDogY29sb3IsIHN0cm9rZVdpZHRoOiAwLCB0ZXh0QmFja2dyb3VuZENvbG9yOiAnJyB9O1xuICAgIGNhc2UgVGV4dFN0eWxlLkhpZ2hsaWdodDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGZpbGw6IGh1ZVNsaWRlclZhbHVlID49IDk1ID8gJyMwMDAnIDogJyNmZmYnLFxuICAgICAgICBzdHJva2VXaWR0aDogMCxcbiAgICAgICAgdGV4dEJhY2tncm91bmRDb2xvcjogY29sb3IsXG4gICAgICB9O1xuICAgIGNhc2UgVGV4dFN0eWxlLk91dGxpbmU6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBmaWxsOiBodWVTbGlkZXJWYWx1ZSA+PSA5NSA/ICcjMDAwJyA6ICcjZmZmJyxcbiAgICAgICAgc3Ryb2tlOiBjb2xvcixcbiAgICAgICAgc3Ryb2tlV2lkdGg6IDIsXG4gICAgICAgIHRleHRCYWNrZ3JvdW5kQ29sb3I6ICcnLFxuICAgICAgfTtcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nLmVycm9yKG1pc3NpbmdDYXNlRXJyb3IodGV4dFN0eWxlKSk7XG4gICAgICByZXR1cm4gZ2V0VGV4dFN0eWxlQXR0cmlidXRlcyhUZXh0U3R5bGUuUmVndWxhciwgaHVlU2xpZGVyVmFsdWUpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxVQUFxQjtBQUNyQixtQkFBdUI7QUFDdkIsOEJBQWlDO0FBRTFCLElBQUssWUFBTCxrQkFBSyxlQUFMO0FBQ0wsMEJBQVU7QUFDViw0QkFBWTtBQUNaLDBCQUFVO0FBSEE7QUFBQTtBQU1MLGdDQUNMLFdBQ0EsZ0JBTUE7QUFDQSxRQUFNLFFBQVEseUJBQU8sY0FBYztBQUNuQyxVQUFRO0FBQUEsU0FDRDtBQUNILGFBQU8sRUFBRSxNQUFNLE9BQU8sYUFBYSxHQUFHLHFCQUFxQixHQUFHO0FBQUEsU0FDM0Q7QUFDSCxhQUFPO0FBQUEsUUFDTCxNQUFNLGtCQUFrQixLQUFLLFNBQVM7QUFBQSxRQUN0QyxhQUFhO0FBQUEsUUFDYixxQkFBcUI7QUFBQSxNQUN2QjtBQUFBLFNBQ0c7QUFDSCxhQUFPO0FBQUEsUUFDTCxNQUFNLGtCQUFrQixLQUFLLFNBQVM7QUFBQSxRQUN0QyxRQUFRO0FBQUEsUUFDUixhQUFhO0FBQUEsUUFDYixxQkFBcUI7QUFBQSxNQUN2QjtBQUFBO0FBRUEsVUFBSSxNQUFNLDhDQUFpQixTQUFTLENBQUM7QUFDckMsYUFBTyx1QkFBdUIseUJBQW1CLGNBQWM7QUFBQTtBQUVyRTtBQTlCZ0IiLAogICJuYW1lcyI6IFtdCn0K
