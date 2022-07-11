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
var CallBackgroundBlur_exports = {};
__export(CallBackgroundBlur_exports, {
  CallBackgroundBlur: () => CallBackgroundBlur
});
module.exports = __toCommonJS(CallBackgroundBlur_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const CallBackgroundBlur = /* @__PURE__ */ __name(({
  avatarPath,
  children,
  className,
  color
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-calling__background", {
      [`module-background-color__${color || "default"}`]: !avatarPath
    }, className)
  }, avatarPath && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling__background--blur",
    style: {
      backgroundImage: `url('${encodeURI(avatarPath)}')`
    }
  }), children);
}, "CallBackgroundBlur");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallBackgroundBlur
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbEJhY2tncm91bmRCbHVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhdmF0YXJQYXRoPzogc3RyaW5nO1xuICBjaGlsZHJlbj86IFJlYWN0LlJlYWN0Tm9kZTtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICBjb2xvcj86IEF2YXRhckNvbG9yVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBDYWxsQmFja2dyb3VuZEJsdXIgPSAoe1xuICBhdmF0YXJQYXRoLFxuICBjaGlsZHJlbixcbiAgY2xhc3NOYW1lLFxuICBjb2xvcixcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICdtb2R1bGUtY2FsbGluZ19fYmFja2dyb3VuZCcsXG4gICAgICAgIHtcbiAgICAgICAgICBbYG1vZHVsZS1iYWNrZ3JvdW5kLWNvbG9yX18ke2NvbG9yIHx8ICdkZWZhdWx0J31gXTogIWF2YXRhclBhdGgsXG4gICAgICAgIH0sXG4gICAgICAgIGNsYXNzTmFtZVxuICAgICAgKX1cbiAgICA+XG4gICAgICB7YXZhdGFyUGF0aCAmJiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZ19fYmFja2dyb3VuZC0tYmx1clwiXG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIGJhY2tncm91bmRJbWFnZTogYHVybCgnJHtlbmNvZGVVUkkoYXZhdGFyUGF0aCl9JylgLFxuICAgICAgICAgIH19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge2NoaWxkcmVufVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBVWhCLE1BQU0scUJBQXFCLHdCQUFDO0FBQUEsRUFDakM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUM0QjtBQUM1QixTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUNULDhCQUNBO0FBQUEsT0FDRyw0QkFBNEIsU0FBUyxjQUFjLENBQUM7QUFBQSxJQUN2RCxHQUNBLFNBQ0Y7QUFBQSxLQUVDLGNBQ0MsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLE9BQU87QUFBQSxNQUNMLGlCQUFpQixRQUFRLFVBQVUsVUFBVTtBQUFBLElBQy9DO0FBQUEsR0FDRixHQUVELFFBQ0g7QUFFSixHQTNCa0M7IiwKICAibmFtZXMiOiBbXQp9Cg==
