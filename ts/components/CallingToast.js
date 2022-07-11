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
var CallingToast_exports = {};
__export(CallingToast_exports, {
  CallingToast: () => CallingToast,
  DEFAULT_LIFETIME: () => DEFAULT_LIFETIME
});
module.exports = __toCommonJS(CallingToast_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
const DEFAULT_LIFETIME = 5e3;
const CallingToast = /* @__PURE__ */ __name(({
  isVisible,
  onClick,
  children
}) => /* @__PURE__ */ import_react.default.createElement("button", {
  className: (0, import_classnames.default)("CallingToast", !isVisible && "CallingToast--hidden"),
  type: "button",
  onClick
}, children), "CallingToast");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingToast,
  DEFAULT_LIFETIME
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1RvYXN0LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgaXNWaXNpYmxlOiBib29sZWFuO1xuICBvbkNsaWNrOiAoKSA9PiB1bmtub3duO1xufTtcblxuZXhwb3J0IGNvbnN0IERFRkFVTFRfTElGRVRJTUUgPSA1MDAwO1xuXG5leHBvcnQgY29uc3QgQ2FsbGluZ1RvYXN0OiBGdW5jdGlvbkNvbXBvbmVudDxQcm9wc1R5cGU+ID0gKHtcbiAgaXNWaXNpYmxlLFxuICBvbkNsaWNrLFxuICBjaGlsZHJlbixcbn0pID0+IChcbiAgPGJ1dHRvblxuICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnQ2FsbGluZ1RvYXN0JywgIWlzVmlzaWJsZSAmJiAnQ2FsbGluZ1RvYXN0LS1oaWRkZW4nKX1cbiAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICA+XG4gICAge2NoaWxkcmVufVxuICA8L2J1dHRvbj5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBT2hCLE1BQU0sbUJBQW1CO0FBRXpCLE1BQU0sZUFBNkMsd0JBQUM7QUFBQSxFQUN6RDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFFQSxtREFBQztBQUFBLEVBQ0MsV0FBVywrQkFBVyxnQkFBZ0IsQ0FBQyxhQUFhLHNCQUFzQjtBQUFBLEVBQzFFLE1BQUs7QUFBQSxFQUNMO0FBQUEsR0FFQyxRQUNILEdBWHdEOyIsCiAgIm5hbWVzIjogW10KfQo=
