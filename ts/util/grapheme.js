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
var grapheme_exports = {};
__export(grapheme_exports, {
  count: () => count,
  getGraphemes: () => getGraphemes
});
module.exports = __toCommonJS(grapheme_exports);
var import_iterables = require("./iterables");
function getGraphemes(str) {
  const segments = new Intl.Segmenter().segment(str);
  return (0, import_iterables.map)(segments, (s) => s.segment);
}
function count(str) {
  const segments = new Intl.Segmenter().segment(str);
  return (0, import_iterables.size)(segments);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  count,
  getGraphemes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JhcGhlbWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWFwLCBzaXplIH0gZnJvbSAnLi9pdGVyYWJsZXMnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0R3JhcGhlbWVzKHN0cjogc3RyaW5nKTogSXRlcmFibGU8c3RyaW5nPiB7XG4gIGNvbnN0IHNlZ21lbnRzID0gbmV3IEludGwuU2VnbWVudGVyKCkuc2VnbWVudChzdHIpO1xuICByZXR1cm4gbWFwKHNlZ21lbnRzLCBzID0+IHMuc2VnbWVudCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjb3VudChzdHI6IHN0cmluZyk6IG51bWJlciB7XG4gIGNvbnN0IHNlZ21lbnRzID0gbmV3IEludGwuU2VnbWVudGVyKCkuc2VnbWVudChzdHIpO1xuICByZXR1cm4gc2l6ZShzZWdtZW50cyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx1QkFBMEI7QUFFbkIsc0JBQXNCLEtBQStCO0FBQzFELFFBQU0sV0FBVyxJQUFJLEtBQUssVUFBVSxFQUFFLFFBQVEsR0FBRztBQUNqRCxTQUFPLDBCQUFJLFVBQVUsT0FBSyxFQUFFLE9BQU87QUFDckM7QUFIZ0IsQUFLVCxlQUFlLEtBQXFCO0FBQ3pDLFFBQU0sV0FBVyxJQUFJLEtBQUssVUFBVSxFQUFFLFFBQVEsR0FBRztBQUNqRCxTQUFPLDJCQUFLLFFBQVE7QUFDdEI7QUFIZ0IiLAogICJuYW1lcyI6IFtdCn0K
