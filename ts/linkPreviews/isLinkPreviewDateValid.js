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
var isLinkPreviewDateValid_exports = {};
__export(isLinkPreviewDateValid_exports, {
  isLinkPreviewDateValid: () => isLinkPreviewDateValid
});
module.exports = __toCommonJS(isLinkPreviewDateValid_exports);
const ONE_DAY = 24 * 60 * 60 * 1e3;
function isLinkPreviewDateValid(value) {
  const maximumLinkPreviewDate = Date.now() + ONE_DAY;
  return typeof value === "number" && value !== 0 && Number.isFinite(value) && value < maximumLinkPreviewDate;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isLinkPreviewDateValid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNMaW5rUHJldmlld0RhdGVWYWxpZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5jb25zdCBPTkVfREFZID0gMjQgKiA2MCAqIDYwICogMTAwMDtcblxuZXhwb3J0IGZ1bmN0aW9uIGlzTGlua1ByZXZpZXdEYXRlVmFsaWQodmFsdWU6IHVua25vd24pOiB2YWx1ZSBpcyBudW1iZXIge1xuICBjb25zdCBtYXhpbXVtTGlua1ByZXZpZXdEYXRlID0gRGF0ZS5ub3coKSArIE9ORV9EQVk7XG4gIHJldHVybiAoXG4gICAgdHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyAmJlxuICAgIHZhbHVlICE9PSAwICYmXG4gICAgTnVtYmVyLmlzRmluaXRlKHZhbHVlKSAmJlxuICAgIHZhbHVlIDwgbWF4aW11bUxpbmtQcmV2aWV3RGF0ZVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLE1BQU0sVUFBVSxLQUFLLEtBQUssS0FBSztBQUV4QixnQ0FBZ0MsT0FBaUM7QUFDdEUsUUFBTSx5QkFBeUIsS0FBSyxJQUFJLElBQUk7QUFDNUMsU0FDRSxPQUFPLFVBQVUsWUFDakIsVUFBVSxLQUNWLE9BQU8sU0FBUyxLQUFLLEtBQ3JCLFFBQVE7QUFFWjtBQVJnQiIsCiAgIm5hbWVzIjogW10KfQo=
