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
var InContactsIcon_exports = {};
__export(InContactsIcon_exports, {
  InContactsIcon: () => InContactsIcon
});
module.exports = __toCommonJS(InContactsIcon_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Tooltip = require("./Tooltip");
const InContactsIcon = /* @__PURE__ */ __name((props) => {
  const { className, i18n, tooltipContainerRef } = props;
  return /* @__PURE__ */ import_react.default.createElement(import_Tooltip.Tooltip, {
    content: i18n("contactInAddressBook"),
    popperModifiers: [
      {
        name: "preventOverflow",
        options: {
          boundary: tooltipContainerRef?.current || void 0
        }
      }
    ]
  }, /* @__PURE__ */ import_react.default.createElement("span", {
    "aria-label": i18n("contactInAddressBook"),
    className: (0, import_classnames.default)("module-in-contacts-icon__icon", className),
    role: "img",
    tabIndex: 0
  }));
}, "InContactsIcon");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  InContactsIcon
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW5Db250YWN0c0ljb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBUb29sdGlwIH0gZnJvbSAnLi9Ub29sdGlwJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY2xhc3NOYW1lPzogc3RyaW5nO1xuICB0b29sdGlwQ29udGFpbmVyUmVmPzogUmVhY3QuUmVmT2JqZWN0PEhUTUxFbGVtZW50PjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbkNvbnRhY3RzSWNvbiA9IChwcm9wczogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCB7IGNsYXNzTmFtZSwgaTE4biwgdG9vbHRpcENvbnRhaW5lclJlZiB9ID0gcHJvcHM7XG5cbiAgLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvbm8tbm9uaW50ZXJhY3RpdmUtdGFiaW5kZXggKi9cbiAgcmV0dXJuIChcbiAgICA8VG9vbHRpcFxuICAgICAgY29udGVudD17aTE4bignY29udGFjdEluQWRkcmVzc0Jvb2snKX1cbiAgICAgIHBvcHBlck1vZGlmaWVycz17W1xuICAgICAgICB7XG4gICAgICAgICAgbmFtZTogJ3ByZXZlbnRPdmVyZmxvdycsXG4gICAgICAgICAgb3B0aW9uczoge1xuICAgICAgICAgICAgYm91bmRhcnk6IHRvb2x0aXBDb250YWluZXJSZWY/LmN1cnJlbnQgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdfVxuICAgID5cbiAgICAgIDxzcGFuXG4gICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2NvbnRhY3RJbkFkZHJlc3NCb29rJyl9XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnbW9kdWxlLWluLWNvbnRhY3RzLWljb25fX2ljb24nLCBjbGFzc05hbWUpfVxuICAgICAgICByb2xlPVwiaW1nXCJcbiAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAvPlxuICAgIDwvVG9vbHRpcD5cbiAgKTtcbiAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleCAqL1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBRXZCLHFCQUF3QjtBQVNqQixNQUFNLGlCQUFpQix3QkFBQyxVQUFrQztBQUMvRCxRQUFNLEVBQUUsV0FBVyxNQUFNLHdCQUF3QjtBQUdqRCxTQUNFLG1EQUFDO0FBQUEsSUFDQyxTQUFTLEtBQUssc0JBQXNCO0FBQUEsSUFDcEMsaUJBQWlCO0FBQUEsTUFDZjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1AsVUFBVSxxQkFBcUIsV0FBVztBQUFBLFFBQzVDO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxLQUVBLG1EQUFDO0FBQUEsSUFDQyxjQUFZLEtBQUssc0JBQXNCO0FBQUEsSUFDdkMsV0FBVywrQkFBVyxpQ0FBaUMsU0FBUztBQUFBLElBQ2hFLE1BQUs7QUFBQSxJQUNMLFVBQVU7QUFBQSxHQUNaLENBQ0Y7QUFHSixHQXpCOEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
