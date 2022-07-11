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
var SystemTraySetting_exports = {};
__export(SystemTraySetting_exports, {
  SystemTraySetting: () => SystemTraySetting,
  parseSystemTraySetting: () => parseSystemTraySetting,
  shouldMinimizeToSystemTray: () => shouldMinimizeToSystemTray
});
module.exports = __toCommonJS(SystemTraySetting_exports);
var import_enum = require("../util/enum");
var SystemTraySetting = /* @__PURE__ */ ((SystemTraySetting2) => {
  SystemTraySetting2["DoNotUseSystemTray"] = "DoNotUseSystemTray";
  SystemTraySetting2["MinimizeToSystemTray"] = "MinimizeToSystemTray";
  SystemTraySetting2["MinimizeToAndStartInSystemTray"] = "MinimizeToAndStartInSystemTray";
  return SystemTraySetting2;
})(SystemTraySetting || {});
const shouldMinimizeToSystemTray = /* @__PURE__ */ __name((setting) => setting === "MinimizeToSystemTray" /* MinimizeToSystemTray */ || setting === "MinimizeToAndStartInSystemTray" /* MinimizeToAndStartInSystemTray */, "shouldMinimizeToSystemTray");
const parseSystemTraySetting = (0, import_enum.makeEnumParser)(SystemTraySetting, "DoNotUseSystemTray" /* DoNotUseSystemTray */);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemTraySetting,
  parseSystemTraySetting,
  shouldMinimizeToSystemTray
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3lzdGVtVHJheVNldHRpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWFrZUVudW1QYXJzZXIgfSBmcm9tICcuLi91dGlsL2VudW0nO1xuXG4vLyBCZSBjYXJlZnVsIHdoZW4gY2hhbmdpbmcgdGhlc2UgdmFsdWVzLCBhcyB0aGV5IGFyZSBwZXJzaXN0ZWQuXG5leHBvcnQgZW51bSBTeXN0ZW1UcmF5U2V0dGluZyB7XG4gIERvTm90VXNlU3lzdGVtVHJheSA9ICdEb05vdFVzZVN5c3RlbVRyYXknLFxuICBNaW5pbWl6ZVRvU3lzdGVtVHJheSA9ICdNaW5pbWl6ZVRvU3lzdGVtVHJheScsXG4gIE1pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheSA9ICdNaW5pbWl6ZVRvQW5kU3RhcnRJblN5c3RlbVRyYXknLFxufVxuXG5leHBvcnQgY29uc3Qgc2hvdWxkTWluaW1pemVUb1N5c3RlbVRyYXkgPSAoXG4gIHNldHRpbmc6IFN5c3RlbVRyYXlTZXR0aW5nXG4pOiBib29sZWFuID0+XG4gIHNldHRpbmcgPT09IFN5c3RlbVRyYXlTZXR0aW5nLk1pbmltaXplVG9TeXN0ZW1UcmF5IHx8XG4gIHNldHRpbmcgPT09IFN5c3RlbVRyYXlTZXR0aW5nLk1pbmltaXplVG9BbmRTdGFydEluU3lzdGVtVHJheTtcblxuZXhwb3J0IGNvbnN0IHBhcnNlU3lzdGVtVHJheVNldHRpbmcgPSBtYWtlRW51bVBhcnNlcihcbiAgU3lzdGVtVHJheVNldHRpbmcsXG4gIFN5c3RlbVRyYXlTZXR0aW5nLkRvTm90VXNlU3lzdGVtVHJheVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQStCO0FBR3hCLElBQUssb0JBQUwsa0JBQUssdUJBQUw7QUFDTCw2Q0FBcUI7QUFDckIsK0NBQXVCO0FBQ3ZCLHlEQUFpQztBQUh2QjtBQUFBO0FBTUwsTUFBTSw2QkFBNkIsd0JBQ3hDLFlBRUEsWUFBWSxxREFDWixZQUFZLHVFQUo0QjtBQU1uQyxNQUFNLHlCQUF5QixnQ0FDcEMsbUJBQ0EsNkNBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
