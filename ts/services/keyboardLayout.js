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
var keyboardLayout_exports = {};
__export(keyboardLayout_exports, {
  initialize: () => initialize,
  lookup: () => lookup
});
module.exports = __toCommonJS(keyboardLayout_exports);
var import_assert = require("../util/assert");
let layoutMap;
async function initialize() {
  (0, import_assert.strictAssert)(layoutMap === void 0, "keyboardLayout already initialized");
  const experimentalNavigator = window.navigator;
  (0, import_assert.strictAssert)(typeof experimentalNavigator.keyboard?.getLayoutMap === "function", "No support for getLayoutMap");
  layoutMap = await experimentalNavigator.keyboard.getLayoutMap();
}
function lookup({
  code,
  key
}) {
  (0, import_assert.strictAssert)(layoutMap !== void 0, "keyboardLayout not initialized");
  return layoutMap.get(code) ?? key;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initialize,
  lookup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsia2V5Ym9hcmRMYXlvdXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuXG50eXBlIExheW91dE1hcFR5cGUgPSB7IGdldChjb2RlOiBzdHJpbmcpOiBzdHJpbmcgfCB1bmRlZmluZWQgfTtcblxubGV0IGxheW91dE1hcDogTGF5b3V0TWFwVHlwZSB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemUoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHN0cmljdEFzc2VydChsYXlvdXRNYXAgPT09IHVuZGVmaW5lZCwgJ2tleWJvYXJkTGF5b3V0IGFscmVhZHkgaW5pdGlhbGl6ZWQnKTtcblxuICBjb25zdCBleHBlcmltZW50YWxOYXZpZ2F0b3IgPSB3aW5kb3cubmF2aWdhdG9yIGFzIHVua25vd24gYXMge1xuICAgIGtleWJvYXJkOiB7IGdldExheW91dE1hcCgpOiBQcm9taXNlPExheW91dE1hcFR5cGU+IH07XG4gIH07XG5cbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHR5cGVvZiBleHBlcmltZW50YWxOYXZpZ2F0b3Iua2V5Ym9hcmQ/LmdldExheW91dE1hcCA9PT0gJ2Z1bmN0aW9uJyxcbiAgICAnTm8gc3VwcG9ydCBmb3IgZ2V0TGF5b3V0TWFwJ1xuICApO1xuXG4gIGxheW91dE1hcCA9IGF3YWl0IGV4cGVyaW1lbnRhbE5hdmlnYXRvci5rZXlib2FyZC5nZXRMYXlvdXRNYXAoKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGxvb2t1cCh7XG4gIGNvZGUsXG4gIGtleSxcbn06IFBpY2s8S2V5Ym9hcmRFdmVudCwgJ2NvZGUnIHwgJ2tleSc+KTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgc3RyaWN0QXNzZXJ0KGxheW91dE1hcCAhPT0gdW5kZWZpbmVkLCAna2V5Ym9hcmRMYXlvdXQgbm90IGluaXRpYWxpemVkJyk7XG4gIHJldHVybiBsYXlvdXRNYXAuZ2V0KGNvZGUpID8/IGtleTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUE2QjtBQUk3QixJQUFJO0FBRUosNEJBQWtEO0FBQ2hELGtDQUFhLGNBQWMsUUFBVyxvQ0FBb0M7QUFFMUUsUUFBTSx3QkFBd0IsT0FBTztBQUlyQyxrQ0FDRSxPQUFPLHNCQUFzQixVQUFVLGlCQUFpQixZQUN4RCw2QkFDRjtBQUVBLGNBQVksTUFBTSxzQkFBc0IsU0FBUyxhQUFhO0FBQ2hFO0FBYnNCLEFBZWYsZ0JBQWdCO0FBQUEsRUFDckI7QUFBQSxFQUNBO0FBQUEsR0FDMEQ7QUFDMUQsa0NBQWEsY0FBYyxRQUFXLGdDQUFnQztBQUN0RSxTQUFPLFVBQVUsSUFBSSxJQUFJLEtBQUs7QUFDaEM7QUFOZ0IiLAogICJuYW1lcyI6IFtdCn0K
