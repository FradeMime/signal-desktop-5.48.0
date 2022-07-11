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
var QrCode_exports = {};
__export(QrCode_exports, {
  QrCode: () => QrCode
});
module.exports = __toCommonJS(QrCode_exports);
var import_react = __toESM(require("react"));
var import_qrcode_generator = __toESM(require("qrcode-generator"));
var import_environment = require("../environment");
const AUTODETECT_TYPE_NUMBER = 0;
const ERROR_CORRECTION_LEVEL = "L";
function QrCode(props) {
  const { alt, className, data } = props;
  const elRef = (0, import_react.useRef)(null);
  const src = (0, import_react.useMemo)(() => {
    const qrCode = (0, import_qrcode_generator.default)(AUTODETECT_TYPE_NUMBER, ERROR_CORRECTION_LEVEL);
    qrCode.addData(data);
    qrCode.make();
    const svgData = qrCode.createSvgTag({ cellSize: 1, margin: 0 });
    return `data:image/svg+xml;utf8,${svgData}`;
  }, [data]);
  const onDoubleClick = /* @__PURE__ */ __name(() => {
    if ((0, import_environment.getEnvironment)() === import_environment.Environment.Production) {
      return;
    }
    navigator.clipboard.writeText(data);
    const el = elRef.current;
    if (!el) {
      return;
    }
    el.style.filter = "brightness(50%)";
    window.setTimeout(() => {
      el.style.filter = "";
    }, 150);
  }, "onDoubleClick");
  return /* @__PURE__ */ import_react.default.createElement("img", {
    alt,
    className,
    onDoubleClick,
    ref: elRef,
    src
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  QrCode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUXJDb2RlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VNZW1vLCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgcXJjb2RlIGZyb20gJ3FyY29kZS1nZW5lcmF0b3InO1xuaW1wb3J0IHsgZ2V0RW52aXJvbm1lbnQsIEVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xuXG5jb25zdCBBVVRPREVURUNUX1RZUEVfTlVNQkVSID0gMDtcbmNvbnN0IEVSUk9SX0NPUlJFQ1RJT05fTEVWRUwgPSAnTCc7XG5cbnR5cGUgUHJvcHNUeXBlID0gUmVhZG9ubHk8e1xuICBhbHQ6IHN0cmluZztcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBkYXRhOiBzdHJpbmc7XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIFFyQ29kZShwcm9wczogUHJvcHNUeXBlKTogUmVhY3RFbGVtZW50IHtcbiAgY29uc3QgeyBhbHQsIGNsYXNzTmFtZSwgZGF0YSB9ID0gcHJvcHM7XG5cbiAgY29uc3QgZWxSZWYgPSB1c2VSZWY8bnVsbCB8IEhUTUxJbWFnZUVsZW1lbnQ+KG51bGwpO1xuXG4gIGNvbnN0IHNyYyA9IHVzZU1lbW8oKCkgPT4ge1xuICAgIGNvbnN0IHFyQ29kZSA9IHFyY29kZShBVVRPREVURUNUX1RZUEVfTlVNQkVSLCBFUlJPUl9DT1JSRUNUSU9OX0xFVkVMKTtcbiAgICBxckNvZGUuYWRkRGF0YShkYXRhKTtcbiAgICBxckNvZGUubWFrZSgpO1xuXG4gICAgY29uc3Qgc3ZnRGF0YSA9IHFyQ29kZS5jcmVhdGVTdmdUYWcoeyBjZWxsU2l6ZTogMSwgbWFyZ2luOiAwIH0pO1xuICAgIHJldHVybiBgZGF0YTppbWFnZS9zdmcreG1sO3V0ZjgsJHtzdmdEYXRhfWA7XG4gIH0sIFtkYXRhXSk7XG5cbiAgLy8gQWRkIGEgZGV2ZWxvcG1lbnQtb25seSBmZWF0dXJlIHRvIGNvcHkgYSBRUiBjb2RlIHRvIHRoZSBjbGlwYm9hcmQgYnkgZG91YmxlLWNsaWNraW5nLlxuICAvLyBUaGlzIGNhbiBiZSB1c2VkIHRvIHF1aWNrbHkgaW5zcGVjdCB0aGUgY29kZSwgb3IgdG8gbGluayB0aGlzIERlc2t0b3Agd2l0aCBhbiBpT1NcbiAgLy8gc2ltdWxhdG9yIHByaW1hcnksIHdoaWNoIGhhcyBhIGRlYnVnLW9ubHkgb3B0aW9uIHRvIHBhc3RlIHRoZSBsaW5raW5nIFVSTCBpbnN0ZWFkIG9mXG4gIC8vIHNjYW5uaW5nIGl0LiAoQnkgdGhlIHRpbWUgeW91IHJlYWQgdGhpcyBjb21tZW50IEFuZHJvaWQgbWF5IGhhdmUgYSBzaW1pbGFyIGZlYXR1cmUuKVxuICBjb25zdCBvbkRvdWJsZUNsaWNrID0gKCkgPT4ge1xuICAgIGlmIChnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5Qcm9kdWN0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbmF2aWdhdG9yLmNsaXBib2FyZC53cml0ZVRleHQoZGF0YSk7XG5cbiAgICBjb25zdCBlbCA9IGVsUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFlbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBlbC5zdHlsZS5maWx0ZXIgPSAnYnJpZ2h0bmVzcyg1MCUpJztcbiAgICB3aW5kb3cuc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBlbC5zdHlsZS5maWx0ZXIgPSAnJztcbiAgICB9LCAxNTApO1xuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPGltZ1xuICAgICAgYWx0PXthbHR9XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgIG9uRG91YmxlQ2xpY2s9e29uRG91YmxlQ2xpY2t9XG4gICAgICByZWY9e2VsUmVmfVxuICAgICAgc3JjPXtzcmN9XG4gICAgLz5cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBdUM7QUFDdkMsOEJBQW1CO0FBQ25CLHlCQUE0QztBQUU1QyxNQUFNLHlCQUF5QjtBQUMvQixNQUFNLHlCQUF5QjtBQVF4QixnQkFBZ0IsT0FBZ0M7QUFDckQsUUFBTSxFQUFFLEtBQUssV0FBVyxTQUFTO0FBRWpDLFFBQU0sUUFBUSx5QkFBZ0MsSUFBSTtBQUVsRCxRQUFNLE1BQU0sMEJBQVEsTUFBTTtBQUN4QixVQUFNLFNBQVMscUNBQU8sd0JBQXdCLHNCQUFzQjtBQUNwRSxXQUFPLFFBQVEsSUFBSTtBQUNuQixXQUFPLEtBQUs7QUFFWixVQUFNLFVBQVUsT0FBTyxhQUFhLEVBQUUsVUFBVSxHQUFHLFFBQVEsRUFBRSxDQUFDO0FBQzlELFdBQU8sMkJBQTJCO0FBQUEsRUFDcEMsR0FBRyxDQUFDLElBQUksQ0FBQztBQU1ULFFBQU0sZ0JBQWdCLDZCQUFNO0FBQzFCLFFBQUksdUNBQWUsTUFBTSwrQkFBWSxZQUFZO0FBQy9DO0FBQUEsSUFDRjtBQUVBLGNBQVUsVUFBVSxVQUFVLElBQUk7QUFFbEMsVUFBTSxLQUFLLE1BQU07QUFDakIsUUFBSSxDQUFDLElBQUk7QUFDUDtBQUFBLElBQ0Y7QUFDQSxPQUFHLE1BQU0sU0FBUztBQUNsQixXQUFPLFdBQVcsTUFBTTtBQUN0QixTQUFHLE1BQU0sU0FBUztBQUFBLElBQ3BCLEdBQUcsR0FBRztBQUFBLEVBQ1IsR0Fmc0I7QUFpQnRCLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLEtBQUs7QUFBQSxJQUNMO0FBQUEsR0FDRjtBQUVKO0FBNUNnQiIsCiAgIm5hbWVzIjogW10KfQo=
