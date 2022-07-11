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
var findRetryAfterTimeFromError_exports = {};
__export(findRetryAfterTimeFromError_exports, {
  findRetryAfterTimeFromError: () => findRetryAfterTimeFromError
});
module.exports = __toCommonJS(findRetryAfterTimeFromError_exports);
var import_isRecord = require("../../util/isRecord");
var import_Errors = require("../../textsecure/Errors");
var import_parseRetryAfter = require("../../util/parseRetryAfter");
function findRetryAfterTimeFromError(err) {
  let rawValue;
  if ((0, import_isRecord.isRecord)(err)) {
    if ((0, import_isRecord.isRecord)(err.responseHeaders)) {
      rawValue = err.responseHeaders["retry-after"];
    } else if (err.httpError instanceof import_Errors.HTTPError) {
      rawValue = err.httpError.responseHeaders?.["retry-after"];
    }
  }
  return (0, import_parseRetryAfter.parseRetryAfterWithDefault)(rawValue);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  findRetryAfterTimeFromError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi8uLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCB7IEhUVFBFcnJvciB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvRXJyb3JzJztcbmltcG9ydCB7IHBhcnNlUmV0cnlBZnRlcldpdGhEZWZhdWx0IH0gZnJvbSAnLi4vLi4vdXRpbC9wYXJzZVJldHJ5QWZ0ZXInO1xuXG5leHBvcnQgZnVuY3Rpb24gZmluZFJldHJ5QWZ0ZXJUaW1lRnJvbUVycm9yKGVycjogdW5rbm93bik6IG51bWJlciB7XG4gIGxldCByYXdWYWx1ZTogdW5rbm93bjtcblxuICBpZiAoaXNSZWNvcmQoZXJyKSkge1xuICAgIGlmIChpc1JlY29yZChlcnIucmVzcG9uc2VIZWFkZXJzKSkge1xuICAgICAgcmF3VmFsdWUgPSBlcnIucmVzcG9uc2VIZWFkZXJzWydyZXRyeS1hZnRlciddO1xuICAgIH0gZWxzZSBpZiAoZXJyLmh0dHBFcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgcmF3VmFsdWUgPSBlcnIuaHR0cEVycm9yLnJlc3BvbnNlSGVhZGVycz8uWydyZXRyeS1hZnRlciddO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBwYXJzZVJldHJ5QWZ0ZXJXaXRoRGVmYXVsdChyYXdWYWx1ZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQXlCO0FBQ3pCLG9CQUEwQjtBQUMxQiw2QkFBMkM7QUFFcEMscUNBQXFDLEtBQXNCO0FBQ2hFLE1BQUk7QUFFSixNQUFJLDhCQUFTLEdBQUcsR0FBRztBQUNqQixRQUFJLDhCQUFTLElBQUksZUFBZSxHQUFHO0FBQ2pDLGlCQUFXLElBQUksZ0JBQWdCO0FBQUEsSUFDakMsV0FBVyxJQUFJLHFCQUFxQix5QkFBVztBQUM3QyxpQkFBVyxJQUFJLFVBQVUsa0JBQWtCO0FBQUEsSUFDN0M7QUFBQSxFQUNGO0FBRUEsU0FBTyx1REFBMkIsUUFBUTtBQUM1QztBQVpnQiIsCiAgIm5hbWVzIjogW10KfQo=
