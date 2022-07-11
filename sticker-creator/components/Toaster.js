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
var Toaster_exports = {};
__export(Toaster_exports, {
  Toaster: () => Toaster
});
module.exports = __toCommonJS(Toaster_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_Toast = require("../elements/Toast");
const DEFAULT_DISMISS = 1e4;
const Toaster = React.memo(({ loaf, onDismiss, className }) => {
  const slice = (0, import_lodash.last)(loaf);
  React.useEffect(() => {
    if (!slice) {
      return import_lodash.noop;
    }
    const timer = setTimeout(() => {
      onDismiss();
    }, DEFAULT_DISMISS);
    return () => {
      clearTimeout(timer);
    };
  }, [slice, onDismiss]);
  if (!slice) {
    return null;
  }
  return /* @__PURE__ */ React.createElement("div", {
    className
  }, /* @__PURE__ */ React.createElement(import_Toast.Toast, {
    key: slice.id,
    onClick: onDismiss,
    tabIndex: 0
  }, slice.text));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Toaster
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3Rlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbGFzdCwgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4uL2VsZW1lbnRzL1RvYXN0JztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBSZWFjdC5IVE1MQXR0cmlidXRlczxIVE1MRGl2RWxlbWVudD4gJiB7XG4gIGxvYWY6IEFycmF5PHsgaWQ6IG51bWJlcjsgdGV4dDogc3RyaW5nIH0+O1xuICBvbkRpc21pc3M6ICgpID0+IHVua25vd247XG59O1xuXG5jb25zdCBERUZBVUxUX0RJU01JU1MgPSAxZTQ7XG5cbmV4cG9ydCBjb25zdCBUb2FzdGVyID0gUmVhY3QubWVtbygoeyBsb2FmLCBvbkRpc21pc3MsIGNsYXNzTmFtZSB9OiBQcm9wcykgPT4ge1xuICBjb25zdCBzbGljZSA9IGxhc3QobG9hZik7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXNsaWNlKSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgb25EaXNtaXNzKCk7XG4gICAgfSwgREVGQVVMVF9ESVNNSVNTKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhclRpbWVvdXQodGltZXIpO1xuICAgIH07XG4gIH0sIFtzbGljZSwgb25EaXNtaXNzXSk7XG5cbiAgaWYgKCFzbGljZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT5cbiAgICAgIDxUb2FzdCBrZXk9e3NsaWNlLmlkfSBvbkNsaWNrPXtvbkRpc21pc3N9IHRhYkluZGV4PXswfT5cbiAgICAgICAge3NsaWNlLnRleHR9XG4gICAgICA8L1RvYXN0PlxuICAgIDwvZGl2PlxuICApO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixvQkFBMkI7QUFDM0IsbUJBQXNCO0FBT3RCLE1BQU0sa0JBQWtCO0FBRWpCLE1BQU0sVUFBVSxNQUFNLEtBQUssQ0FBQyxFQUFFLE1BQU0sV0FBVyxnQkFBdUI7QUFDM0UsUUFBTSxRQUFRLHdCQUFLLElBQUk7QUFFdkIsUUFBTSxVQUFVLE1BQU07QUFDcEIsUUFBSSxDQUFDLE9BQU87QUFDVixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sUUFBUSxXQUFXLE1BQU07QUFDN0IsZ0JBQVU7QUFBQSxJQUNaLEdBQUcsZUFBZTtBQUVsQixXQUFPLE1BQU07QUFDWCxtQkFBYSxLQUFLO0FBQUEsSUFDcEI7QUFBQSxFQUNGLEdBQUcsQ0FBQyxPQUFPLFNBQVMsQ0FBQztBQUVyQixNQUFJLENBQUMsT0FBTztBQUNWLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FDRSxvQ0FBQztBQUFBLElBQUk7QUFBQSxLQUNILG9DQUFDO0FBQUEsSUFBTSxLQUFLLE1BQU07QUFBQSxJQUFJLFNBQVM7QUFBQSxJQUFXLFVBQVU7QUFBQSxLQUNqRCxNQUFNLElBQ1QsQ0FDRjtBQUVKLENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
