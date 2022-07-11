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
var sortByTitle_exports = {};
__export(sortByTitle_exports, {
  sortByTitle: () => sortByTitle
});
module.exports = __toCommonJS(sortByTitle_exports);
function sortByTitle(arr) {
  return [...arr].sort((a, b) => a.title.localeCompare(b.title));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sortByTitle
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic29ydEJ5VGl0bGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG50eXBlIEhhc1RpdGxlID0ge1xuICB0aXRsZTogc3RyaW5nO1xufTtcblxuZXhwb3J0IGZ1bmN0aW9uIHNvcnRCeVRpdGxlPFQgZXh0ZW5kcyBIYXNUaXRsZT4oXG4gIGFycjogUmVhZG9ubHlBcnJheTxUPlxuKTogQXJyYXk8VD4ge1xuICByZXR1cm4gWy4uLmFycl0uc29ydCgoYSwgYikgPT4gYS50aXRsZS5sb2NhbGVDb21wYXJlKGIudGl0bGUpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPTyxxQkFDTCxLQUNVO0FBQ1YsU0FBTyxDQUFDLEdBQUcsR0FBRyxFQUFFLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLGNBQWMsRUFBRSxLQUFLLENBQUM7QUFDL0Q7QUFKZ0IiLAogICJuYW1lcyI6IFtdCn0K
