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
var getInitials_exports = {};
__export(getInitials_exports, {
  getInitials: () => getInitials
});
module.exports = __toCommonJS(getInitials_exports);
function getInitials(name) {
  if (!name) {
    return void 0;
  }
  const parsedName = name.replace(/[^\p{L}\p{Z}]+/gu, "").replace(/\p{Z}+/gu, " ").trim();
  if (!parsedName) {
    return void 0;
  }
  if (parsedName.length === 2 && parsedName === parsedName.toUpperCase()) {
    return parsedName;
  }
  const parts = parsedName.toUpperCase().split(" ");
  const partsLen = parts.length;
  return partsLen === 1 ? parts[0].charAt(0) : parts[0].charAt(0) + parts[partsLen - 1].charAt(0);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getInitials
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0SW5pdGlhbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW5pdGlhbHMobmFtZT86IHN0cmluZyk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGlmICghbmFtZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBwYXJzZWROYW1lID0gbmFtZVxuICAgIC8vIHJlbW92ZSBhbGwgY2hhcnMgdGhhdCBhcmUgbm90IGxldHRlcnMgb3Igc2VwYXJhdG9yc1xuICAgIC5yZXBsYWNlKC9bXlxccHtMfVxccHtafV0rL2d1LCAnJylcbiAgICAvLyByZXBsYWNlIGFsbCBjaGFycyB0aGF0IGFyZSBzZXBhcmF0b3JzIHdpdGggYSBzaW5nbGUgQVNDSUkgc3BhY2VcbiAgICAucmVwbGFjZSgvXFxwe1p9Ky9ndSwgJyAnKVxuICAgIC50cmltKCk7XG5cbiAgaWYgKCFwYXJzZWROYW1lKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGNoZWNrIGlmIGNoYXJzIGluIHRoZSBwYXJzZWQgc3RyaW5nIGFyZSBpbml0aWFsc1xuICBpZiAocGFyc2VkTmFtZS5sZW5ndGggPT09IDIgJiYgcGFyc2VkTmFtZSA9PT0gcGFyc2VkTmFtZS50b1VwcGVyQ2FzZSgpKSB7XG4gICAgcmV0dXJuIHBhcnNlZE5hbWU7XG4gIH1cblxuICBjb25zdCBwYXJ0cyA9IHBhcnNlZE5hbWUudG9VcHBlckNhc2UoKS5zcGxpdCgnICcpO1xuICBjb25zdCBwYXJ0c0xlbiA9IHBhcnRzLmxlbmd0aDtcblxuICByZXR1cm4gcGFydHNMZW4gPT09IDFcbiAgICA/IHBhcnRzWzBdLmNoYXJBdCgwKVxuICAgIDogcGFydHNbMF0uY2hhckF0KDApICsgcGFydHNbcGFydHNMZW4gLSAxXS5jaGFyQXQoMCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08scUJBQXFCLE1BQW1DO0FBQzdELE1BQUksQ0FBQyxNQUFNO0FBQ1QsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLGFBQWEsS0FFaEIsUUFBUSxvQkFBb0IsRUFBRSxFQUU5QixRQUFRLFlBQVksR0FBRyxFQUN2QixLQUFLO0FBRVIsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPO0FBQUEsRUFDVDtBQUdBLE1BQUksV0FBVyxXQUFXLEtBQUssZUFBZSxXQUFXLFlBQVksR0FBRztBQUN0RSxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sUUFBUSxXQUFXLFlBQVksRUFBRSxNQUFNLEdBQUc7QUFDaEQsUUFBTSxXQUFXLE1BQU07QUFFdkIsU0FBTyxhQUFhLElBQ2hCLE1BQU0sR0FBRyxPQUFPLENBQUMsSUFDakIsTUFBTSxHQUFHLE9BQU8sQ0FBQyxJQUFJLE1BQU0sV0FBVyxHQUFHLE9BQU8sQ0FBQztBQUN2RDtBQTNCZ0IiLAogICJuYW1lcyI6IFtdCn0K
