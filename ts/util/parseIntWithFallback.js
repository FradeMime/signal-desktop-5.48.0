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
var parseIntWithFallback_exports = {};
__export(parseIntWithFallback_exports, {
  parseIntWithFallback: () => parseIntWithFallback
});
module.exports = __toCommonJS(parseIntWithFallback_exports);
var import_parseIntOrThrow = require("./parseIntOrThrow");
function parseIntWithFallback(value, fallback) {
  try {
    return (0, import_parseIntOrThrow.parseIntOrThrow)(value, "Failed to parse");
  } catch (err) {
    return fallback;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseIntWithFallback
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VJbnRXaXRoRmFsbGJhY2sudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi9wYXJzZUludE9yVGhyb3cnO1xuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VJbnRXaXRoRmFsbGJhY2sodmFsdWU6IHVua25vd24sIGZhbGxiYWNrOiBudW1iZXIpOiBudW1iZXIge1xuICB0cnkge1xuICAgIHJldHVybiBwYXJzZUludE9yVGhyb3codmFsdWUsICdGYWlsZWQgdG8gcGFyc2UnKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcmV0dXJuIGZhbGxiYWNrO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsNkJBQWdDO0FBRXpCLDhCQUE4QixPQUFnQixVQUEwQjtBQUM3RSxNQUFJO0FBQ0YsV0FBTyw0Q0FBZ0IsT0FBTyxpQkFBaUI7QUFBQSxFQUNqRCxTQUFTLEtBQVA7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBTmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
