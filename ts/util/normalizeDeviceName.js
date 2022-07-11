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
var normalizeDeviceName_exports = {};
__export(normalizeDeviceName_exports, {
  normalizeDeviceName: () => normalizeDeviceName
});
module.exports = __toCommonJS(normalizeDeviceName_exports);
function normalizeDeviceName(rawDeviceName) {
  return rawDeviceName.trim().replace(/\0/g, "");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  normalizeDeviceName
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm9ybWFsaXplRGV2aWNlTmFtZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5leHBvcnQgZnVuY3Rpb24gbm9ybWFsaXplRGV2aWNlTmFtZShyYXdEZXZpY2VOYW1lOiBzdHJpbmcpOiBzdHJpbmcge1xuICAvLyBXZSB3YW50IHRvIGRvIGFkZGl0aW9uYWwgbm9ybWFsaXphdGlvbiBoZXJlLiBTZWUgREVTS1RPUC0yODQ1LlxuICByZXR1cm4gcmF3RGV2aWNlTmFtZS50cmltKCkucmVwbGFjZSgvXFwwL2csICcnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHTyw2QkFBNkIsZUFBK0I7QUFFakUsU0FBTyxjQUFjLEtBQUssRUFBRSxRQUFRLE9BQU8sRUFBRTtBQUMvQztBQUhnQiIsCiAgIm5hbWVzIjogW10KfQo=
