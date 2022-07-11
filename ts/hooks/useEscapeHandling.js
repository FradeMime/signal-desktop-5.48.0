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
var useEscapeHandling_exports = {};
__export(useEscapeHandling_exports, {
  useEscapeHandling: () => useEscapeHandling
});
module.exports = __toCommonJS(useEscapeHandling_exports);
var import_react = require("react");
function useEscapeHandling(handleEscape) {
  (0, import_react.useEffect)(() => {
    if (!handleEscape) {
      return;
    }
    const handler = /* @__PURE__ */ __name((event) => {
      if (event.key === "Escape") {
        handleEscape();
        event.preventDefault();
        event.stopPropagation();
      }
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [handleEscape]);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useEscapeHandling
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlRXNjYXBlSGFuZGxpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlRXNjYXBlSGFuZGxpbmcoaGFuZGxlRXNjYXBlPzogKCkgPT4gdW5rbm93bik6IHZvaWQge1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFuZGxlRXNjYXBlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGFuZGxlciA9IChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgaWYgKGV2ZW50LmtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgaGFuZGxlRXNjYXBlKCk7XG5cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgfTtcbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtoYW5kbGVFc2NhcGVdKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBMEI7QUFFbkIsMkJBQTJCLGNBQW9DO0FBQ3BFLDhCQUFVLE1BQU07QUFDZCxRQUFJLENBQUMsY0FBYztBQUNqQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFVBQVUsd0JBQUMsVUFBeUI7QUFDeEMsVUFBSSxNQUFNLFFBQVEsVUFBVTtBQUMxQixxQkFBYTtBQUViLGNBQU0sZUFBZTtBQUNyQixjQUFNLGdCQUFnQjtBQUFBLE1BQ3hCO0FBQUEsSUFDRixHQVBnQjtBQVFoQixhQUFTLGlCQUFpQixXQUFXLE9BQU87QUFFNUMsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFBb0IsV0FBVyxPQUFPO0FBQUEsSUFDakQ7QUFBQSxFQUNGLEdBQUcsQ0FBQyxZQUFZLENBQUM7QUFDbkI7QUFwQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
