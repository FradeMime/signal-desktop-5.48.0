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
var webSafeBase64_exports = {};
__export(webSafeBase64_exports, {
  fromWebSafeBase64: () => fromWebSafeBase64,
  toWebSafeBase64: () => toWebSafeBase64
});
module.exports = __toCommonJS(webSafeBase64_exports);
function toWebSafeBase64(base64) {
  return base64.replace(/\//g, "_").replace(/\+/g, "-").replace(/=/g, "");
}
function fromWebSafeBase64(webSafeBase64) {
  const base64 = webSafeBase64.replace(/_/g, "/").replace(/-/g, "+");
  const remainder = base64.length % 4;
  if (remainder === 3) {
    return `${base64}=`;
  }
  if (remainder === 2) {
    return `${base64}==`;
  }
  if (remainder === 1) {
    return `${base64}===`;
  }
  return base64;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fromWebSafeBase64,
  toWebSafeBase64
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2ViU2FmZUJhc2U2NC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgZnVuY3Rpb24gdG9XZWJTYWZlQmFzZTY0KGJhc2U2NDogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGJhc2U2NC5yZXBsYWNlKC9cXC8vZywgJ18nKS5yZXBsYWNlKC9cXCsvZywgJy0nKS5yZXBsYWNlKC89L2csICcnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGZyb21XZWJTYWZlQmFzZTY0KHdlYlNhZmVCYXNlNjQ6IHN0cmluZyk6IHN0cmluZyB7XG4gIGNvbnN0IGJhc2U2NCA9IHdlYlNhZmVCYXNlNjQucmVwbGFjZSgvXy9nLCAnLycpLnJlcGxhY2UoLy0vZywgJysnKTtcblxuICAvLyBFbnN1cmUgdGhhdCB0aGUgY2hhcmFjdGVyIGNvdW50IGlzIGEgbXVsdGlwbGUgb2YgZm91ciwgZmlsbGluZyBpbiB0aGUgZXh0cmFcbiAgLy8gICBzcGFjZSBuZWVkZWQgd2l0aCAnPSdcbiAgY29uc3QgcmVtYWluZGVyID0gYmFzZTY0Lmxlbmd0aCAlIDQ7XG4gIGlmIChyZW1haW5kZXIgPT09IDMpIHtcbiAgICByZXR1cm4gYCR7YmFzZTY0fT1gO1xuICB9XG4gIGlmIChyZW1haW5kZXIgPT09IDIpIHtcbiAgICByZXR1cm4gYCR7YmFzZTY0fT09YDtcbiAgfVxuICBpZiAocmVtYWluZGVyID09PSAxKSB7XG4gICAgcmV0dXJuIGAke2Jhc2U2NH09PT1gO1xuICB9XG5cbiAgcmV0dXJuIGJhc2U2NDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLHlCQUF5QixRQUF3QjtBQUN0RCxTQUFPLE9BQU8sUUFBUSxPQUFPLEdBQUcsRUFBRSxRQUFRLE9BQU8sR0FBRyxFQUFFLFFBQVEsTUFBTSxFQUFFO0FBQ3hFO0FBRmdCLEFBSVQsMkJBQTJCLGVBQStCO0FBQy9ELFFBQU0sU0FBUyxjQUFjLFFBQVEsTUFBTSxHQUFHLEVBQUUsUUFBUSxNQUFNLEdBQUc7QUFJakUsUUFBTSxZQUFZLE9BQU8sU0FBUztBQUNsQyxNQUFJLGNBQWMsR0FBRztBQUNuQixXQUFPLEdBQUc7QUFBQSxFQUNaO0FBQ0EsTUFBSSxjQUFjLEdBQUc7QUFDbkIsV0FBTyxHQUFHO0FBQUEsRUFDWjtBQUNBLE1BQUksY0FBYyxHQUFHO0FBQ25CLFdBQU8sR0FBRztBQUFBLEVBQ1o7QUFFQSxTQUFPO0FBQ1Q7QUFqQmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
