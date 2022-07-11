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
var usePageVisibility_exports = {};
__export(usePageVisibility_exports, {
  usePageVisibility: () => usePageVisibility
});
module.exports = __toCommonJS(usePageVisibility_exports);
var import_react = require("react");
function usePageVisibility() {
  const [result, setResult] = (0, import_react.useState)(!document.hidden);
  (0, import_react.useEffect)(() => {
    const updatePageVisibility = /* @__PURE__ */ __name(() => {
      setResult(!document.hidden);
    }, "updatePageVisibility");
    updatePageVisibility();
    document.addEventListener("visibilitychange", updatePageVisibility, false);
    return () => {
      document.removeEventListener("visibilitychange", updatePageVisibility, false);
    };
  }, []);
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePageVisibility
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlUGFnZVZpc2liaWxpdHkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VFZmZlY3QsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuXG5leHBvcnQgZnVuY3Rpb24gdXNlUGFnZVZpc2liaWxpdHkoKTogYm9vbGVhbiB7XG4gIGNvbnN0IFtyZXN1bHQsIHNldFJlc3VsdF0gPSB1c2VTdGF0ZSghZG9jdW1lbnQuaGlkZGVuKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHVwZGF0ZVBhZ2VWaXNpYmlsaXR5ID0gKCkgPT4ge1xuICAgICAgc2V0UmVzdWx0KCFkb2N1bWVudC5oaWRkZW4pO1xuICAgIH07XG5cbiAgICB1cGRhdGVQYWdlVmlzaWJpbGl0eSgpO1xuXG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndmlzaWJpbGl0eWNoYW5nZScsIHVwZGF0ZVBhZ2VWaXNpYmlsaXR5LCBmYWxzZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgJ3Zpc2liaWxpdHljaGFuZ2UnLFxuICAgICAgICB1cGRhdGVQYWdlVmlzaWJpbGl0eSxcbiAgICAgICAgZmFsc2VcbiAgICAgICk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQW9DO0FBRTdCLDZCQUFzQztBQUMzQyxRQUFNLENBQUMsUUFBUSxhQUFhLDJCQUFTLENBQUMsU0FBUyxNQUFNO0FBRXJELDhCQUFVLE1BQU07QUFDZCxVQUFNLHVCQUF1Qiw2QkFBTTtBQUNqQyxnQkFBVSxDQUFDLFNBQVMsTUFBTTtBQUFBLElBQzVCLEdBRjZCO0FBSTdCLHlCQUFxQjtBQUVyQixhQUFTLGlCQUFpQixvQkFBb0Isc0JBQXNCLEtBQUs7QUFFekUsV0FBTyxNQUFNO0FBQ1gsZUFBUyxvQkFDUCxvQkFDQSxzQkFDQSxLQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0YsR0FBRyxDQUFDLENBQUM7QUFFTCxTQUFPO0FBQ1Q7QUF0QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
