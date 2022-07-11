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
var usePrevious_exports = {};
__export(usePrevious_exports, {
  usePrevious: () => usePrevious
});
module.exports = __toCommonJS(usePrevious_exports);
var import_react = require("react");
function usePrevious(initialValue, currentValue) {
  const previousValueRef = (0, import_react.useRef)(initialValue);
  const result = previousValueRef.current;
  previousValueRef.current = currentValue;
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  usePrevious
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlUHJldmlvdXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5cbmV4cG9ydCBmdW5jdGlvbiB1c2VQcmV2aW91czxUPihpbml0aWFsVmFsdWU6IFQsIGN1cnJlbnRWYWx1ZTogVCk6IFQge1xuICBjb25zdCBwcmV2aW91c1ZhbHVlUmVmID0gdXNlUmVmPFQ+KGluaXRpYWxWYWx1ZSk7XG4gIGNvbnN0IHJlc3VsdCA9IHByZXZpb3VzVmFsdWVSZWYuY3VycmVudDtcbiAgcHJldmlvdXNWYWx1ZVJlZi5jdXJyZW50ID0gY3VycmVudFZhbHVlO1xuICByZXR1cm4gcmVzdWx0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUF1QjtBQUVoQixxQkFBd0IsY0FBaUIsY0FBb0I7QUFDbEUsUUFBTSxtQkFBbUIseUJBQVUsWUFBWTtBQUMvQyxRQUFNLFNBQVMsaUJBQWlCO0FBQ2hDLG1CQUFpQixVQUFVO0FBQzNCLFNBQU87QUFDVDtBQUxnQiIsCiAgIm5hbWVzIjogW10KfQo=
