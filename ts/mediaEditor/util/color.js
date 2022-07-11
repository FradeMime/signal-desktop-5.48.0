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
var color_exports = {};
__export(color_exports, {
  getHSL: () => getHSL,
  getRGBA: () => getRGBA,
  getRGBANumber: () => getRGBANumber
});
module.exports = __toCommonJS(color_exports);
function getRatio(min, max, value) {
  return (value - min) / (max - min);
}
const MAX_BLACK = 7;
const MIN_WHITE = 95;
function getHSLValues(percentage) {
  if (percentage <= MAX_BLACK) {
    return [0, 0.5, 0.5 * getRatio(0, MAX_BLACK, percentage)];
  }
  if (percentage >= MIN_WHITE) {
    return [0, 0, Math.min(1, 0.5 + getRatio(MIN_WHITE, 100, percentage))];
  }
  const ratio = getRatio(MAX_BLACK, MIN_WHITE, percentage);
  return [338 * ratio, 1, 0.5];
}
function hslToRGB(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  function f(n) {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  }
  return {
    r: Math.round(255 * f(0)),
    g: Math.round(255 * f(8)),
    b: Math.round(255 * f(4))
  };
}
function getHSL(percentage) {
  const [h, s, l] = getHSLValues(percentage);
  return `hsl(${h}, ${s * 100}%, ${l * 100}%)`;
}
function getRGBANumber(percentage) {
  const [h, s, l] = getHSLValues(percentage);
  const { r, g, b } = hslToRGB(h, s, l);
  return 4294967296 + (255 << 24 | (255 & r) << 16 | (255 & g) << 8 | b);
}
function getRGBA(percentage, alpha = 1) {
  const [h, s, l] = getHSLValues(percentage);
  const { r, g, b } = hslToRGB(h, s, l);
  const rgbValue = [r, g, b].map(String).join(",");
  return `rgba(${rgbValue},${alpha})`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHSL,
  getRGBA,
  getRGBANumber
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29sb3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuZnVuY3Rpb24gZ2V0UmF0aW8obWluOiBudW1iZXIsIG1heDogbnVtYmVyLCB2YWx1ZTogbnVtYmVyKSB7XG4gIHJldHVybiAodmFsdWUgLSBtaW4pIC8gKG1heCAtIG1pbik7XG59XG5cbmNvbnN0IE1BWF9CTEFDSyA9IDc7XG5jb25zdCBNSU5fV0hJVEUgPSA5NTtcblxuZnVuY3Rpb24gZ2V0SFNMVmFsdWVzKHBlcmNlbnRhZ2U6IG51bWJlcik6IFtudW1iZXIsIG51bWJlciwgbnVtYmVyXSB7XG4gIGlmIChwZXJjZW50YWdlIDw9IE1BWF9CTEFDSykge1xuICAgIHJldHVybiBbMCwgMC41LCAwLjUgKiBnZXRSYXRpbygwLCBNQVhfQkxBQ0ssIHBlcmNlbnRhZ2UpXTtcbiAgfVxuXG4gIGlmIChwZXJjZW50YWdlID49IE1JTl9XSElURSkge1xuICAgIHJldHVybiBbMCwgMCwgTWF0aC5taW4oMSwgMC41ICsgZ2V0UmF0aW8oTUlOX1dISVRFLCAxMDAsIHBlcmNlbnRhZ2UpKV07XG4gIH1cblxuICBjb25zdCByYXRpbyA9IGdldFJhdGlvKE1BWF9CTEFDSywgTUlOX1dISVRFLCBwZXJjZW50YWdlKTtcblxuICByZXR1cm4gWzMzOCAqIHJhdGlvLCAxLCAwLjVdO1xufVxuXG4vLyBodHRwczovL2VuLndpa2lwZWRpYS5vcmcvd2lraS9IU0xfYW5kX0hTViNIU0xfdG9fUkdCX2FsdGVybmF0aXZlXG5mdW5jdGlvbiBoc2xUb1JHQihcbiAgaDogbnVtYmVyLFxuICBzOiBudW1iZXIsXG4gIGw6IG51bWJlclxuKToge1xuICByOiBudW1iZXI7XG4gIGc6IG51bWJlcjtcbiAgYjogbnVtYmVyO1xufSB7XG4gIGNvbnN0IGEgPSBzICogTWF0aC5taW4obCwgMSAtIGwpO1xuXG4gIGZ1bmN0aW9uIGYobjogbnVtYmVyKTogbnVtYmVyIHtcbiAgICBjb25zdCBrID0gKG4gKyBoIC8gMzApICUgMTI7XG4gICAgcmV0dXJuIGwgLSBhICogTWF0aC5tYXgoTWF0aC5taW4oayAtIDMsIDkgLSBrLCAxKSwgLTEpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICByOiBNYXRoLnJvdW5kKDI1NSAqIGYoMCkpLFxuICAgIGc6IE1hdGgucm91bmQoMjU1ICogZig4KSksXG4gICAgYjogTWF0aC5yb3VuZCgyNTUgKiBmKDQpKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEhTTChwZXJjZW50YWdlOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBbaCwgcywgbF0gPSBnZXRIU0xWYWx1ZXMocGVyY2VudGFnZSk7XG4gIHJldHVybiBgaHNsKCR7aH0sICR7cyAqIDEwMH0lLCAke2wgKiAxMDB9JSlgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UkdCQU51bWJlcihwZXJjZW50YWdlOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBbaCwgcywgbF0gPSBnZXRIU0xWYWx1ZXMocGVyY2VudGFnZSk7XG4gIGNvbnN0IHsgciwgZywgYiB9ID0gaHNsVG9SR0IoaCwgcywgbCk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgcmV0dXJuIDB4MTAwMDAwMDAwICsgKCgyNTUgPDwgMjQpIHwgKCgyNTUgJiByKSA8PCAxNikgfCAoKDI1NSAmIGcpIDw8IDgpIHwgYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRSR0JBKHBlcmNlbnRhZ2U6IG51bWJlciwgYWxwaGEgPSAxKTogc3RyaW5nIHtcbiAgY29uc3QgW2gsIHMsIGxdID0gZ2V0SFNMVmFsdWVzKHBlcmNlbnRhZ2UpO1xuICBjb25zdCB7IHIsIGcsIGIgfSA9IGhzbFRvUkdCKGgsIHMsIGwpO1xuXG4gIGNvbnN0IHJnYlZhbHVlID0gW3IsIGcsIGJdLm1hcChTdHJpbmcpLmpvaW4oJywnKTtcblxuICByZXR1cm4gYHJnYmEoJHtyZ2JWYWx1ZX0sJHthbHBoYX0pYDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQWtCLEtBQWEsS0FBYSxPQUFlO0FBQ3pELFNBQVEsU0FBUSxPQUFRLE9BQU07QUFDaEM7QUFGUyxBQUlULE1BQU0sWUFBWTtBQUNsQixNQUFNLFlBQVk7QUFFbEIsc0JBQXNCLFlBQThDO0FBQ2xFLE1BQUksY0FBYyxXQUFXO0FBQzNCLFdBQU8sQ0FBQyxHQUFHLEtBQUssTUFBTSxTQUFTLEdBQUcsV0FBVyxVQUFVLENBQUM7QUFBQSxFQUMxRDtBQUVBLE1BQUksY0FBYyxXQUFXO0FBQzNCLFdBQU8sQ0FBQyxHQUFHLEdBQUcsS0FBSyxJQUFJLEdBQUcsTUFBTSxTQUFTLFdBQVcsS0FBSyxVQUFVLENBQUMsQ0FBQztBQUFBLEVBQ3ZFO0FBRUEsUUFBTSxRQUFRLFNBQVMsV0FBVyxXQUFXLFVBQVU7QUFFdkQsU0FBTyxDQUFDLE1BQU0sT0FBTyxHQUFHLEdBQUc7QUFDN0I7QUFaUyxBQWVULGtCQUNFLEdBQ0EsR0FDQSxHQUtBO0FBQ0EsUUFBTSxJQUFJLElBQUksS0FBSyxJQUFJLEdBQUcsSUFBSSxDQUFDO0FBRS9CLGFBQVcsR0FBbUI7QUFDNUIsVUFBTSxJQUFLLEtBQUksSUFBSSxNQUFNO0FBQ3pCLFdBQU8sSUFBSSxJQUFJLEtBQUssSUFBSSxLQUFLLElBQUksSUFBSSxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRTtBQUFBLEVBQ3ZEO0FBSFMsQUFLVCxTQUFPO0FBQUEsSUFDTCxHQUFHLEtBQUssTUFBTSxNQUFNLEVBQUUsQ0FBQyxDQUFDO0FBQUEsSUFDeEIsR0FBRyxLQUFLLE1BQU0sTUFBTSxFQUFFLENBQUMsQ0FBQztBQUFBLElBQ3hCLEdBQUcsS0FBSyxNQUFNLE1BQU0sRUFBRSxDQUFDLENBQUM7QUFBQSxFQUMxQjtBQUNGO0FBckJTLEFBdUJGLGdCQUFnQixZQUE0QjtBQUNqRCxRQUFNLENBQUMsR0FBRyxHQUFHLEtBQUssYUFBYSxVQUFVO0FBQ3pDLFNBQU8sT0FBTyxNQUFNLElBQUksU0FBUyxJQUFJO0FBQ3ZDO0FBSGdCLEFBS1QsdUJBQXVCLFlBQTRCO0FBQ3hELFFBQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxhQUFhLFVBQVU7QUFDekMsUUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFHcEMsU0FBTyxhQUFnQixRQUFPLEtBQVEsT0FBTSxNQUFNLEtBQVEsT0FBTSxNQUFNLElBQUs7QUFDN0U7QUFOZ0IsQUFRVCxpQkFBaUIsWUFBb0IsUUFBUSxHQUFXO0FBQzdELFFBQU0sQ0FBQyxHQUFHLEdBQUcsS0FBSyxhQUFhLFVBQVU7QUFDekMsUUFBTSxFQUFFLEdBQUcsR0FBRyxNQUFNLFNBQVMsR0FBRyxHQUFHLENBQUM7QUFFcEMsUUFBTSxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsRUFBRSxJQUFJLE1BQU0sRUFBRSxLQUFLLEdBQUc7QUFFL0MsU0FBTyxRQUFRLFlBQVk7QUFDN0I7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
