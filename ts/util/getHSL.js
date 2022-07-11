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
var getHSL_exports = {};
__export(getHSL_exports, {
  getHSL: () => getHSL
});
module.exports = __toCommonJS(getHSL_exports);
const LIGHTNESS_TABLE = {
  0: 45,
  60: 30,
  180: 30,
  240: 50,
  300: 40,
  360: 45
};
function getLightnessFromHue(hue, min, max) {
  const percentage = (hue - min) * 100 / (max - min);
  const minValue = LIGHTNESS_TABLE[min];
  const maxValue = LIGHTNESS_TABLE[max];
  return percentage * (maxValue - minValue) / 100 + minValue;
}
function calculateLightness(hue) {
  let lightness = 45;
  if (hue < 60) {
    lightness = getLightnessFromHue(hue, 0, 60);
  } else if (hue < 180) {
    lightness = 30;
  } else if (hue < 240) {
    lightness = getLightnessFromHue(hue, 180, 240);
  } else if (hue < 300) {
    lightness = getLightnessFromHue(hue, 240, 300);
  } else {
    lightness = getLightnessFromHue(hue, 300, 360);
  }
  return lightness;
}
function adjustLightnessValue(lightness, percentIncrease) {
  return lightness + lightness * percentIncrease;
}
function getHSL({
  hue,
  saturation
}, adjustedLightness = 0) {
  return `hsl(${hue}, ${saturation}%, ${adjustLightnessValue(calculateLightness(hue), adjustedLightness)}%)`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHSL
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SFNMLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmNvbnN0IExJR0hUTkVTU19UQUJMRTogUmVjb3JkPG51bWJlciwgbnVtYmVyPiA9IHtcbiAgMDogNDUsXG4gIDYwOiAzMCxcbiAgMTgwOiAzMCxcbiAgMjQwOiA1MCxcbiAgMzAwOiA0MCxcbiAgMzYwOiA0NSxcbn07XG5cbmZ1bmN0aW9uIGdldExpZ2h0bmVzc0Zyb21IdWUoaHVlOiBudW1iZXIsIG1pbjogbnVtYmVyLCBtYXg6IG51bWJlcikge1xuICBjb25zdCBwZXJjZW50YWdlID0gKChodWUgLSBtaW4pICogMTAwKSAvIChtYXggLSBtaW4pO1xuICBjb25zdCBtaW5WYWx1ZSA9IExJR0hUTkVTU19UQUJMRVttaW5dO1xuICBjb25zdCBtYXhWYWx1ZSA9IExJR0hUTkVTU19UQUJMRVttYXhdO1xuXG4gIHJldHVybiAocGVyY2VudGFnZSAqIChtYXhWYWx1ZSAtIG1pblZhbHVlKSkgLyAxMDAgKyBtaW5WYWx1ZTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlTGlnaHRuZXNzKGh1ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgbGV0IGxpZ2h0bmVzcyA9IDQ1O1xuICBpZiAoaHVlIDwgNjApIHtcbiAgICBsaWdodG5lc3MgPSBnZXRMaWdodG5lc3NGcm9tSHVlKGh1ZSwgMCwgNjApO1xuICB9IGVsc2UgaWYgKGh1ZSA8IDE4MCkge1xuICAgIGxpZ2h0bmVzcyA9IDMwO1xuICB9IGVsc2UgaWYgKGh1ZSA8IDI0MCkge1xuICAgIGxpZ2h0bmVzcyA9IGdldExpZ2h0bmVzc0Zyb21IdWUoaHVlLCAxODAsIDI0MCk7XG4gIH0gZWxzZSBpZiAoaHVlIDwgMzAwKSB7XG4gICAgbGlnaHRuZXNzID0gZ2V0TGlnaHRuZXNzRnJvbUh1ZShodWUsIDI0MCwgMzAwKTtcbiAgfSBlbHNlIHtcbiAgICBsaWdodG5lc3MgPSBnZXRMaWdodG5lc3NGcm9tSHVlKGh1ZSwgMzAwLCAzNjApO1xuICB9XG5cbiAgcmV0dXJuIGxpZ2h0bmVzcztcbn1cblxuZnVuY3Rpb24gYWRqdXN0TGlnaHRuZXNzVmFsdWUoXG4gIGxpZ2h0bmVzczogbnVtYmVyLFxuICBwZXJjZW50SW5jcmVhc2U6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgcmV0dXJuIGxpZ2h0bmVzcyArIGxpZ2h0bmVzcyAqIHBlcmNlbnRJbmNyZWFzZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhTTChcbiAge1xuICAgIGh1ZSxcbiAgICBzYXR1cmF0aW9uLFxuICB9OiB7XG4gICAgaHVlOiBudW1iZXI7XG4gICAgc2F0dXJhdGlvbjogbnVtYmVyO1xuICB9LFxuICBhZGp1c3RlZExpZ2h0bmVzcyA9IDBcbik6IHN0cmluZyB7XG4gIHJldHVybiBgaHNsKCR7aHVlfSwgJHtzYXR1cmF0aW9ufSUsICR7YWRqdXN0TGlnaHRuZXNzVmFsdWUoXG4gICAgY2FsY3VsYXRlTGlnaHRuZXNzKGh1ZSksXG4gICAgYWRqdXN0ZWRMaWdodG5lc3NcbiAgKX0lKWA7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsTUFBTSxrQkFBMEM7QUFBQSxFQUM5QyxHQUFHO0FBQUEsRUFDSCxJQUFJO0FBQUEsRUFDSixLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQUEsRUFDTCxLQUFLO0FBQ1A7QUFFQSw2QkFBNkIsS0FBYSxLQUFhLEtBQWE7QUFDbEUsUUFBTSxhQUFlLE9BQU0sT0FBTyxNQUFRLE9BQU07QUFDaEQsUUFBTSxXQUFXLGdCQUFnQjtBQUNqQyxRQUFNLFdBQVcsZ0JBQWdCO0FBRWpDLFNBQVEsYUFBYyxZQUFXLFlBQWEsTUFBTTtBQUN0RDtBQU5TLEFBUVQsNEJBQTRCLEtBQXFCO0FBQy9DLE1BQUksWUFBWTtBQUNoQixNQUFJLE1BQU0sSUFBSTtBQUNaLGdCQUFZLG9CQUFvQixLQUFLLEdBQUcsRUFBRTtBQUFBLEVBQzVDLFdBQVcsTUFBTSxLQUFLO0FBQ3BCLGdCQUFZO0FBQUEsRUFDZCxXQUFXLE1BQU0sS0FBSztBQUNwQixnQkFBWSxvQkFBb0IsS0FBSyxLQUFLLEdBQUc7QUFBQSxFQUMvQyxXQUFXLE1BQU0sS0FBSztBQUNwQixnQkFBWSxvQkFBb0IsS0FBSyxLQUFLLEdBQUc7QUFBQSxFQUMvQyxPQUFPO0FBQ0wsZ0JBQVksb0JBQW9CLEtBQUssS0FBSyxHQUFHO0FBQUEsRUFDL0M7QUFFQSxTQUFPO0FBQ1Q7QUFmUyxBQWlCVCw4QkFDRSxXQUNBLGlCQUNRO0FBQ1IsU0FBTyxZQUFZLFlBQVk7QUFDakM7QUFMUyxBQU9GLGdCQUNMO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxHQUtGLG9CQUFvQixHQUNaO0FBQ1IsU0FBTyxPQUFPLFFBQVEsZ0JBQWdCLHFCQUNwQyxtQkFBbUIsR0FBRyxHQUN0QixpQkFDRjtBQUNGO0FBZGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
