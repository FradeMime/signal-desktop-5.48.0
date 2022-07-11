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
var getStoryBackground_exports = {};
__export(getStoryBackground_exports, {
  COLOR_BLACK_INT: () => COLOR_BLACK_INT,
  COLOR_WHITE_INT: () => COLOR_WHITE_INT,
  getBackgroundColor: () => getBackgroundColor,
  getHexFromNumber: () => getHexFromNumber,
  getStoryBackground: () => getStoryBackground
});
module.exports = __toCommonJS(getStoryBackground_exports);
const COLOR_BLACK_ALPHA_90 = "rgba(0, 0, 0, 0.9)";
const COLOR_BLACK_INT = 4278190080;
const COLOR_WHITE_INT = 4294704123;
function getHexFromNumber(color) {
  return `#${color.toString(16).slice(2)}`;
}
function getBackgroundColor({
  color,
  gradient
}) {
  if (gradient) {
    return `linear-gradient(${gradient.angle}deg, ${getHexFromNumber(gradient.startColor || COLOR_WHITE_INT)}, ${getHexFromNumber(gradient.endColor || COLOR_WHITE_INT)}) border-box`;
  }
  return getHexFromNumber(color || COLOR_WHITE_INT);
}
function getStoryBackground(attachment) {
  if (!attachment) {
    return COLOR_BLACK_ALPHA_90;
  }
  if (attachment.textAttachment) {
    return getBackgroundColor(attachment.textAttachment);
  }
  if (attachment.url) {
    return `url("${attachment.url}")`;
  }
  return COLOR_BLACK_ALPHA_90;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COLOR_BLACK_INT,
  COLOR_WHITE_INT,
  getBackgroundColor,
  getHexFromNumber,
  getStoryBackground
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RvcnlCYWNrZ3JvdW5kLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUsIFRleHRBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuXG5jb25zdCBDT0xPUl9CTEFDS19BTFBIQV85MCA9ICdyZ2JhKDAsIDAsIDAsIDAuOSknO1xuZXhwb3J0IGNvbnN0IENPTE9SX0JMQUNLX0lOVCA9IDQyNzgxOTAwODA7XG5leHBvcnQgY29uc3QgQ09MT1JfV0hJVEVfSU5UID0gNDI5NDcwNDEyMztcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhleEZyb21OdW1iZXIoY29sb3I6IG51bWJlcik6IHN0cmluZyB7XG4gIHJldHVybiBgIyR7Y29sb3IudG9TdHJpbmcoMTYpLnNsaWNlKDIpfWA7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYWNrZ3JvdW5kQ29sb3Ioe1xuICBjb2xvcixcbiAgZ3JhZGllbnQsXG59OiBQaWNrPFRleHRBdHRhY2htZW50VHlwZSwgJ2NvbG9yJyB8ICdncmFkaWVudCc+KTogc3RyaW5nIHtcbiAgaWYgKGdyYWRpZW50KSB7XG4gICAgcmV0dXJuIGBsaW5lYXItZ3JhZGllbnQoJHtncmFkaWVudC5hbmdsZX1kZWcsICR7Z2V0SGV4RnJvbU51bWJlcihcbiAgICAgIGdyYWRpZW50LnN0YXJ0Q29sb3IgfHwgQ09MT1JfV0hJVEVfSU5UXG4gICAgKX0sICR7Z2V0SGV4RnJvbU51bWJlcihncmFkaWVudC5lbmRDb2xvciB8fCBDT0xPUl9XSElURV9JTlQpfSkgYm9yZGVyLWJveGA7XG4gIH1cblxuICByZXR1cm4gZ2V0SGV4RnJvbU51bWJlcihjb2xvciB8fCBDT0xPUl9XSElURV9JTlQpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U3RvcnlCYWNrZ3JvdW5kKGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZSk6IHN0cmluZyB7XG4gIGlmICghYXR0YWNobWVudCkge1xuICAgIHJldHVybiBDT0xPUl9CTEFDS19BTFBIQV85MDtcbiAgfVxuXG4gIGlmIChhdHRhY2htZW50LnRleHRBdHRhY2htZW50KSB7XG4gICAgcmV0dXJuIGdldEJhY2tncm91bmRDb2xvcihhdHRhY2htZW50LnRleHRBdHRhY2htZW50KTtcbiAgfVxuXG4gIGlmIChhdHRhY2htZW50LnVybCkge1xuICAgIHJldHVybiBgdXJsKFwiJHthdHRhY2htZW50LnVybH1cIilgO1xuICB9XG5cbiAgcmV0dXJuIENPTE9SX0JMQUNLX0FMUEhBXzkwO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsTUFBTSx1QkFBdUI7QUFDdEIsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxrQkFBa0I7QUFFeEIsMEJBQTBCLE9BQXVCO0FBQ3RELFNBQU8sSUFBSSxNQUFNLFNBQVMsRUFBRSxFQUFFLE1BQU0sQ0FBQztBQUN2QztBQUZnQixBQUlULDRCQUE0QjtBQUFBLEVBQ2pDO0FBQUEsRUFDQTtBQUFBLEdBQ3lEO0FBQ3pELE1BQUksVUFBVTtBQUNaLFdBQU8sbUJBQW1CLFNBQVMsYUFBYSxpQkFDOUMsU0FBUyxjQUFjLGVBQ3pCLE1BQU0saUJBQWlCLFNBQVMsWUFBWSxlQUFlO0FBQUEsRUFDN0Q7QUFFQSxTQUFPLGlCQUFpQixTQUFTLGVBQWU7QUFDbEQ7QUFYZ0IsQUFhVCw0QkFBNEIsWUFBcUM7QUFDdEUsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksV0FBVyxnQkFBZ0I7QUFDN0IsV0FBTyxtQkFBbUIsV0FBVyxjQUFjO0FBQUEsRUFDckQ7QUFFQSxNQUFJLFdBQVcsS0FBSztBQUNsQixXQUFPLFFBQVEsV0FBVztBQUFBLEVBQzVCO0FBRUEsU0FBTztBQUNUO0FBZGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
