var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var isPathInside_exports = {};
__export(isPathInside_exports, {
  isPathInside: () => isPathInside
});
module.exports = __toCommonJS(isPathInside_exports);
var path = __toESM(require("path"));
function isPathInside(childPath, parentPath) {
  const childPathResolved = path.resolve(childPath);
  let parentPathResolved = path.resolve(parentPath);
  if (!parentPathResolved.endsWith(path.sep)) {
    parentPathResolved += path.sep;
  }
  return childPathResolved !== parentPathResolved && childPathResolved.startsWith(parentPathResolved);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isPathInside
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNQYXRoSW5zaWRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8vIFRoaXMgaXMgaW5zcGlyZWQgYnkgdGhlIGBpcy1wYXRoLWluc2lkZWAgbW9kdWxlIG9uIG5wbS5cbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc1BhdGhJbnNpZGUoY2hpbGRQYXRoOiBzdHJpbmcsIHBhcmVudFBhdGg6IHN0cmluZyk6IGJvb2xlYW4ge1xuICBjb25zdCBjaGlsZFBhdGhSZXNvbHZlZCA9IHBhdGgucmVzb2x2ZShjaGlsZFBhdGgpO1xuXG4gIGxldCBwYXJlbnRQYXRoUmVzb2x2ZWQgPSBwYXRoLnJlc29sdmUocGFyZW50UGF0aCk7XG4gIGlmICghcGFyZW50UGF0aFJlc29sdmVkLmVuZHNXaXRoKHBhdGguc2VwKSkge1xuICAgIHBhcmVudFBhdGhSZXNvbHZlZCArPSBwYXRoLnNlcDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgY2hpbGRQYXRoUmVzb2x2ZWQgIT09IHBhcmVudFBhdGhSZXNvbHZlZCAmJlxuICAgIGNoaWxkUGF0aFJlc29sdmVkLnN0YXJ0c1dpdGgocGFyZW50UGF0aFJlc29sdmVkKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLFdBQXNCO0FBRWYsc0JBQXNCLFdBQW1CLFlBQTZCO0FBQzNFLFFBQU0sb0JBQW9CLEtBQUssUUFBUSxTQUFTO0FBRWhELE1BQUkscUJBQXFCLEtBQUssUUFBUSxVQUFVO0FBQ2hELE1BQUksQ0FBQyxtQkFBbUIsU0FBUyxLQUFLLEdBQUcsR0FBRztBQUMxQywwQkFBc0IsS0FBSztBQUFBLEVBQzdCO0FBRUEsU0FDRSxzQkFBc0Isc0JBQ3RCLGtCQUFrQixXQUFXLGtCQUFrQjtBQUVuRDtBQVpnQiIsCiAgIm5hbWVzIjogW10KfQo=
