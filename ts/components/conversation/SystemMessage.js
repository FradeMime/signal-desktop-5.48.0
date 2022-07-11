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
var SystemMessage_exports = {};
__export(SystemMessage_exports, {
  SystemMessage: () => SystemMessage
});
module.exports = __toCommonJS(SystemMessage_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const SystemMessage = (0, import_react.forwardRef)(({ icon, contents, button, isError }, ref) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("SystemMessage", isError && "SystemMessage--error"),
    ref
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("SystemMessage__contents", `SystemMessage__contents--icon-${icon}`)
  }, contents), button && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "SystemMessage__button-container"
  }, button));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SystemMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3lzdGVtTWVzc2FnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgZm9yd2FyZFJlZiB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaWNvbjogc3RyaW5nO1xuICBjb250ZW50czogUmVhY3ROb2RlO1xuICBidXR0b24/OiBSZWFjdE5vZGU7XG4gIGlzRXJyb3I/OiBib29sZWFuO1xufTtcblxuZXhwb3J0IGNvbnN0IFN5c3RlbU1lc3NhZ2UgPSBmb3J3YXJkUmVmPEhUTUxEaXZFbGVtZW50LCBQcm9wc1R5cGU+KFxuICAoeyBpY29uLCBjb250ZW50cywgYnV0dG9uLCBpc0Vycm9yIH0sIHJlZikgPT4ge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnU3lzdGVtTWVzc2FnZScsXG4gICAgICAgICAgaXNFcnJvciAmJiAnU3lzdGVtTWVzc2FnZS0tZXJyb3InXG4gICAgICAgICl9XG4gICAgICAgIHJlZj17cmVmfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ1N5c3RlbU1lc3NhZ2VfX2NvbnRlbnRzJyxcbiAgICAgICAgICAgIGBTeXN0ZW1NZXNzYWdlX19jb250ZW50cy0taWNvbi0ke2ljb259YFxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICB7Y29udGVudHN9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7YnV0dG9uICYmIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN5c3RlbU1lc3NhZ2VfX2J1dHRvbi1jb250YWluZXJcIj57YnV0dG9ufTwvZGl2PlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQztBQUNsQyx3QkFBdUI7QUFTaEIsTUFBTSxnQkFBZ0IsNkJBQzNCLENBQUMsRUFBRSxNQUFNLFVBQVUsUUFBUSxXQUFXLFFBQVE7QUFDNUMsU0FDRSxtREFBQztBQUFBLElBQ0MsV0FBVywrQkFDVCxpQkFDQSxXQUFXLHNCQUNiO0FBQUEsSUFDQTtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsMkJBQ0EsaUNBQWlDLE1BQ25DO0FBQUEsS0FFQyxRQUNILEdBQ0MsVUFDQyxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQW1DLE1BQU8sQ0FFN0Q7QUFFSixDQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
