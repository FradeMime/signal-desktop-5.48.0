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
var formatCountForLogging_exports = {};
__export(formatCountForLogging_exports, {
  formatCountForLogging: () => formatCountForLogging
});
module.exports = __toCommonJS(formatCountForLogging_exports);
const formatCountForLogging = /* @__PURE__ */ __name((count) => {
  if (count === 0 || Number.isNaN(count)) {
    return String(count);
  }
  return `at least ${10 ** Math.floor(Math.log10(count))}`;
}, "formatCountForLogging");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  formatCountForLogging
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZm9ybWF0Q291bnRGb3JMb2dnaW5nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBjb25zdCBmb3JtYXRDb3VudEZvckxvZ2dpbmcgPSAoY291bnQ6IG51bWJlcik6IHN0cmluZyA9PiB7XG4gIGlmIChjb3VudCA9PT0gMCB8fCBOdW1iZXIuaXNOYU4oY291bnQpKSB7XG4gICAgcmV0dXJuIFN0cmluZyhjb3VudCk7XG4gIH1cblxuICByZXR1cm4gYGF0IGxlYXN0ICR7MTAgKiogTWF0aC5mbG9vcihNYXRoLmxvZzEwKGNvdW50KSl9YDtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR08sTUFBTSx3QkFBd0Isd0JBQUMsVUFBMEI7QUFDOUQsTUFBSSxVQUFVLEtBQUssT0FBTyxNQUFNLEtBQUssR0FBRztBQUN0QyxXQUFPLE9BQU8sS0FBSztBQUFBLEVBQ3JCO0FBRUEsU0FBTyxZQUFZLE1BQU0sS0FBSyxNQUFNLEtBQUssTUFBTSxLQUFLLENBQUM7QUFDdkQsR0FOcUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
