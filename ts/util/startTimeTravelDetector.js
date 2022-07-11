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
var startTimeTravelDetector_exports = {};
__export(startTimeTravelDetector_exports, {
  startTimeTravelDetector: () => startTimeTravelDetector
});
module.exports = __toCommonJS(startTimeTravelDetector_exports);
const INTERVAL = 1e3;
function startTimeTravelDetector(callback) {
  let lastTime = Date.now();
  setInterval(() => {
    const currentTime = Date.now();
    const sinceLastTime = currentTime - lastTime;
    if (sinceLastTime > INTERVAL * 2) {
      callback();
    }
    lastTime = currentTime;
  }, INTERVAL);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startTimeTravelDetector
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnRUaW1lVHJhdmVsRGV0ZWN0b3IudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5jb25zdCBJTlRFUlZBTCA9IDEwMDA7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdGFydFRpbWVUcmF2ZWxEZXRlY3RvcihjYWxsYmFjazogKCkgPT4gdW5rbm93bik6IHZvaWQge1xuICBsZXQgbGFzdFRpbWUgPSBEYXRlLm5vdygpO1xuICBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgY29uc3QgY3VycmVudFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3Qgc2luY2VMYXN0VGltZSA9IGN1cnJlbnRUaW1lIC0gbGFzdFRpbWU7XG4gICAgaWYgKHNpbmNlTGFzdFRpbWUgPiBJTlRFUlZBTCAqIDIpIHtcbiAgICAgIGNhbGxiYWNrKCk7XG4gICAgfVxuXG4gICAgbGFzdFRpbWUgPSBjdXJyZW50VGltZTtcbiAgfSwgSU5URVJWQUwpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLE1BQU0sV0FBVztBQUVWLGlDQUFpQyxVQUErQjtBQUNyRSxNQUFJLFdBQVcsS0FBSyxJQUFJO0FBQ3hCLGNBQVksTUFBTTtBQUNoQixVQUFNLGNBQWMsS0FBSyxJQUFJO0FBRTdCLFVBQU0sZ0JBQWdCLGNBQWM7QUFDcEMsUUFBSSxnQkFBZ0IsV0FBVyxHQUFHO0FBQ2hDLGVBQVM7QUFBQSxJQUNYO0FBRUEsZUFBVztBQUFBLEVBQ2IsR0FBRyxRQUFRO0FBQ2I7QUFaZ0IiLAogICJuYW1lcyI6IFtdCn0K
