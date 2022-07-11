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
var avatarTextSizeCalculator_exports = {};
__export(avatarTextSizeCalculator_exports, {
  getFittedFontSize: () => getFittedFontSize,
  getFontSizes: () => getFontSizes
});
module.exports = __toCommonJS(avatarTextSizeCalculator_exports);
var import_lib = require("../components/emoji/lib");
var import_isEmojiOnlyText = require("./isEmojiOnlyText");
function getFontSizes(bubbleSize) {
  return {
    diameter: Math.ceil(bubbleSize * 0.75),
    singleEmoji: Math.ceil(bubbleSize * 0.6),
    smol: Math.ceil(bubbleSize * 0.05),
    text: Math.ceil(bubbleSize * 0.45)
  };
}
function getFittedFontSize(bubbleSize, text, measure) {
  const sizes = getFontSizes(bubbleSize);
  let candidateFontSize = sizes.text;
  if ((0, import_isEmojiOnlyText.isEmojiOnlyText)(text) && (0, import_lib.getEmojiCount)(text) === 1) {
    candidateFontSize = sizes.singleEmoji;
  }
  for (candidateFontSize; candidateFontSize >= sizes.smol; candidateFontSize -= 1) {
    const { height, width } = measure(candidateFontSize);
    if (width < sizes.diameter && height < sizes.diameter) {
      return candidateFontSize;
    }
  }
  return candidateFontSize;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getFittedFontSize,
  getFontSizes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXZhdGFyVGV4dFNpemVDYWxjdWxhdG9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGdldEVtb2ppQ291bnQgfSBmcm9tICcuLi9jb21wb25lbnRzL2Vtb2ppL2xpYic7XG5pbXBvcnQgeyBpc0Vtb2ppT25seVRleHQgfSBmcm9tICcuL2lzRW1vamlPbmx5VGV4dCc7XG5cbnR5cGUgRm9udFNpemVzID0ge1xuICBkaWFtZXRlcjogbnVtYmVyO1xuICBzaW5nbGVFbW9qaTogbnVtYmVyO1xuICBzbW9sOiBudW1iZXI7XG4gIHRleHQ6IG51bWJlcjtcbn07XG5cbnR5cGUgUmVjdFNpemUgPSB7XG4gIGhlaWdodDogbnVtYmVyO1xuICB3aWR0aDogbnVtYmVyO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEZvbnRTaXplcyhidWJibGVTaXplOiBudW1iZXIpOiBGb250U2l6ZXMge1xuICByZXR1cm4ge1xuICAgIGRpYW1ldGVyOiBNYXRoLmNlaWwoYnViYmxlU2l6ZSAqIDAuNzUpLFxuICAgIHNpbmdsZUVtb2ppOiBNYXRoLmNlaWwoYnViYmxlU2l6ZSAqIDAuNiksXG4gICAgc21vbDogTWF0aC5jZWlsKGJ1YmJsZVNpemUgKiAwLjA1KSxcbiAgICB0ZXh0OiBNYXRoLmNlaWwoYnViYmxlU2l6ZSAqIDAuNDUpLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Rml0dGVkRm9udFNpemUoXG4gIGJ1YmJsZVNpemU6IG51bWJlcixcbiAgdGV4dDogc3RyaW5nLFxuICBtZWFzdXJlOiAoY2FuZGlkYXRlRm9udFNpemU6IG51bWJlcikgPT4gUmVjdFNpemVcbik6IG51bWJlciB7XG4gIGNvbnN0IHNpemVzID0gZ2V0Rm9udFNpemVzKGJ1YmJsZVNpemUpO1xuXG4gIGxldCBjYW5kaWRhdGVGb250U2l6ZSA9IHNpemVzLnRleHQ7XG4gIGlmIChpc0Vtb2ppT25seVRleHQodGV4dCkgJiYgZ2V0RW1vamlDb3VudCh0ZXh0KSA9PT0gMSkge1xuICAgIGNhbmRpZGF0ZUZvbnRTaXplID0gc2l6ZXMuc2luZ2xlRW1vamk7XG4gIH1cblxuICBmb3IgKFxuICAgIGNhbmRpZGF0ZUZvbnRTaXplO1xuICAgIGNhbmRpZGF0ZUZvbnRTaXplID49IHNpemVzLnNtb2w7XG4gICAgY2FuZGlkYXRlRm9udFNpemUgLT0gMVxuICApIHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IG1lYXN1cmUoY2FuZGlkYXRlRm9udFNpemUpO1xuICAgIGlmICh3aWR0aCA8IHNpemVzLmRpYW1ldGVyICYmIGhlaWdodCA8IHNpemVzLmRpYW1ldGVyKSB7XG4gICAgICByZXR1cm4gY2FuZGlkYXRlRm9udFNpemU7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIGNhbmRpZGF0ZUZvbnRTaXplO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQThCO0FBQzlCLDZCQUFnQztBQWN6QixzQkFBc0IsWUFBK0I7QUFDMUQsU0FBTztBQUFBLElBQ0wsVUFBVSxLQUFLLEtBQUssYUFBYSxJQUFJO0FBQUEsSUFDckMsYUFBYSxLQUFLLEtBQUssYUFBYSxHQUFHO0FBQUEsSUFDdkMsTUFBTSxLQUFLLEtBQUssYUFBYSxJQUFJO0FBQUEsSUFDakMsTUFBTSxLQUFLLEtBQUssYUFBYSxJQUFJO0FBQUEsRUFDbkM7QUFDRjtBQVBnQixBQVNULDJCQUNMLFlBQ0EsTUFDQSxTQUNRO0FBQ1IsUUFBTSxRQUFRLGFBQWEsVUFBVTtBQUVyQyxNQUFJLG9CQUFvQixNQUFNO0FBQzlCLE1BQUksNENBQWdCLElBQUksS0FBSyw4QkFBYyxJQUFJLE1BQU0sR0FBRztBQUN0RCx3QkFBb0IsTUFBTTtBQUFBLEVBQzVCO0FBRUEsT0FDRSxtQkFDQSxxQkFBcUIsTUFBTSxNQUMzQixxQkFBcUIsR0FDckI7QUFDQSxVQUFNLEVBQUUsUUFBUSxVQUFVLFFBQVEsaUJBQWlCO0FBQ25ELFFBQUksUUFBUSxNQUFNLFlBQVksU0FBUyxNQUFNLFVBQVU7QUFDckQsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUO0FBeEJnQiIsCiAgIm5hbWVzIjogW10KfQo=
