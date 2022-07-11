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
var useReducedMotion_exports = {};
__export(useReducedMotion_exports, {
  useReducedMotion: () => useReducedMotion
});
module.exports = __toCommonJS(useReducedMotion_exports);
var import_react = require("react");
function getReducedMotionQuery() {
  return window.matchMedia("(prefers-reduced-motion: reduce)");
}
function useReducedMotion() {
  const initialQuery = getReducedMotionQuery();
  const [prefersReducedMotion, setPrefersReducedMotion] = (0, import_react.useState)(initialQuery.matches);
  (0, import_react.useEffect)(() => {
    const query = getReducedMotionQuery();
    function changePreference() {
      setPrefersReducedMotion(query.matches);
    }
    changePreference();
    query.addEventListener("change", changePreference);
    return () => {
      query.removeEventListener("change", changePreference);
    };
  });
  return prefersReducedMotion;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useReducedMotion
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlUmVkdWNlZE1vdGlvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5mdW5jdGlvbiBnZXRSZWR1Y2VkTW90aW9uUXVlcnkoKTogTWVkaWFRdWVyeUxpc3Qge1xuICByZXR1cm4gd2luZG93Lm1hdGNoTWVkaWEoJyhwcmVmZXJzLXJlZHVjZWQtbW90aW9uOiByZWR1Y2UpJyk7XG59XG5cbi8vIEluc3BpcmVkIGJ5IDxodHRwczovL2dpdGh1Yi5jb20vaW5maW5pdGVsdWtlL3JlYWN0LXJlZHVjZS1tb3Rpb24+LlxuZXhwb3J0IGZ1bmN0aW9uIHVzZVJlZHVjZWRNb3Rpb24oKTogYm9vbGVhbiB7XG4gIGNvbnN0IGluaXRpYWxRdWVyeSA9IGdldFJlZHVjZWRNb3Rpb25RdWVyeSgpO1xuICBjb25zdCBbcHJlZmVyc1JlZHVjZWRNb3Rpb24sIHNldFByZWZlcnNSZWR1Y2VkTW90aW9uXSA9IHVzZVN0YXRlKFxuICAgIGluaXRpYWxRdWVyeS5tYXRjaGVzXG4gICk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBxdWVyeSA9IGdldFJlZHVjZWRNb3Rpb25RdWVyeSgpO1xuXG4gICAgZnVuY3Rpb24gY2hhbmdlUHJlZmVyZW5jZSgpIHtcbiAgICAgIHNldFByZWZlcnNSZWR1Y2VkTW90aW9uKHF1ZXJ5Lm1hdGNoZXMpO1xuICAgIH1cblxuICAgIGNoYW5nZVByZWZlcmVuY2UoKTtcblxuICAgIHF1ZXJ5LmFkZEV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZVByZWZlcmVuY2UpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHF1ZXJ5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NoYW5nZScsIGNoYW5nZVByZWZlcmVuY2UpO1xuICAgIH07XG4gIH0pO1xuXG4gIHJldHVybiBwcmVmZXJzUmVkdWNlZE1vdGlvbjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBb0M7QUFFcEMsaUNBQWlEO0FBQy9DLFNBQU8sT0FBTyxXQUFXLGtDQUFrQztBQUM3RDtBQUZTLEFBS0YsNEJBQXFDO0FBQzFDLFFBQU0sZUFBZSxzQkFBc0I7QUFDM0MsUUFBTSxDQUFDLHNCQUFzQiwyQkFBMkIsMkJBQ3RELGFBQWEsT0FDZjtBQUVBLDhCQUFVLE1BQU07QUFDZCxVQUFNLFFBQVEsc0JBQXNCO0FBRXBDLGdDQUE0QjtBQUMxQiw4QkFBd0IsTUFBTSxPQUFPO0FBQUEsSUFDdkM7QUFGUyxBQUlULHFCQUFpQjtBQUVqQixVQUFNLGlCQUFpQixVQUFVLGdCQUFnQjtBQUVqRCxXQUFPLE1BQU07QUFDWCxZQUFNLG9CQUFvQixVQUFVLGdCQUFnQjtBQUFBLElBQ3REO0FBQUEsRUFDRixDQUFDO0FBRUQsU0FBTztBQUNUO0FBdkJnQiIsCiAgIm5hbWVzIjogW10KfQo=
