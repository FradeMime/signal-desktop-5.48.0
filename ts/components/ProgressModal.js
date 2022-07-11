var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var ProgressModal_exports = {};
__export(ProgressModal_exports, {
  ProgressModal: () => ProgressModal
});
module.exports = __toCommonJS(ProgressModal_exports);
var React = __toESM(require("react"));
var import_react_dom = require("react-dom");
var import_ProgressDialog = require("./ProgressDialog");
const ProgressModal = React.memo(({ i18n }) => {
  const [root, setRoot] = React.useState(null);
  React.useEffect(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(null);
    };
  }, []);
  return root ? (0, import_react_dom.createPortal)(/* @__PURE__ */ React.createElement("div", {
    role: "presentation",
    className: "module-progress-dialog__overlay"
  }, /* @__PURE__ */ React.createElement(import_ProgressDialog.ProgressDialog, {
    i18n
  })), root) : null;
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ProgressModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUHJvZ3Jlc3NNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IFByb2dyZXNzRGlhbG9nIH0gZnJvbSAnLi9Qcm9ncmVzc0RpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xufTtcblxuZXhwb3J0IGNvbnN0IFByb2dyZXNzTW9kYWwgPSBSZWFjdC5tZW1vKCh7IGkxOG4gfTogUHJvcHNUeXBlKSA9PiB7XG4gIGNvbnN0IFtyb290LCBzZXRSb290XSA9IFJlYWN0LnVzZVN0YXRlPEhUTUxFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgLy8gTm90ZTogV2UgZXhwbGljaXRseSBkb24ndCByZWdpc3RlciBmb3IgdXNlciBpbnRlcmFjdGlvbiBoZXJlLCBzaW5jZSB0aGlzIGRpYWxvZ1xuICAvLyAgIGNhbm5vdCBiZSBkaXNtaXNzZWQuXG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBkaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKGRpdik7XG4gICAgc2V0Um9vdChkaXYpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZGl2KTtcbiAgICAgIHNldFJvb3QobnVsbCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHJldHVybiByb290XG4gICAgPyBjcmVhdGVQb3J0YWwoXG4gICAgICAgIDxkaXYgcm9sZT1cInByZXNlbnRhdGlvblwiIGNsYXNzTmFtZT1cIm1vZHVsZS1wcm9ncmVzcy1kaWFsb2dfX292ZXJsYXlcIj5cbiAgICAgICAgICA8UHJvZ3Jlc3NEaWFsb2cgaTE4bj17aTE4bn0gLz5cbiAgICAgICAgPC9kaXY+LFxuICAgICAgICByb290XG4gICAgICApXG4gICAgOiBudWxsO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2Qix1QkFBNkI7QUFDN0IsNEJBQStCO0FBT3hCLE1BQU0sZ0JBQWdCLE1BQU0sS0FBSyxDQUFDLEVBQUUsV0FBc0I7QUFDL0QsUUFBTSxDQUFDLE1BQU0sV0FBVyxNQUFNLFNBQTZCLElBQUk7QUFLL0QsUUFBTSxVQUFVLE1BQU07QUFDcEIsVUFBTSxNQUFNLFNBQVMsY0FBYyxLQUFLO0FBQ3hDLGFBQVMsS0FBSyxZQUFZLEdBQUc7QUFDN0IsWUFBUSxHQUFHO0FBRVgsV0FBTyxNQUFNO0FBQ1gsZUFBUyxLQUFLLFlBQVksR0FBRztBQUM3QixjQUFRLElBQUk7QUFBQSxJQUNkO0FBQUEsRUFDRixHQUFHLENBQUMsQ0FBQztBQUVMLFNBQU8sT0FDSCxtQ0FDRSxvQ0FBQztBQUFBLElBQUksTUFBSztBQUFBLElBQWUsV0FBVTtBQUFBLEtBQ2pDLG9DQUFDO0FBQUEsSUFBZTtBQUFBLEdBQVksQ0FDOUIsR0FDQSxJQUNGLElBQ0E7QUFDTixDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
