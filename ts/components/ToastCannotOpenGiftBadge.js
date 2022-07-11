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
var ToastCannotOpenGiftBadge_exports = {};
__export(ToastCannotOpenGiftBadge_exports, {
  ToastCannotOpenGiftBadge: () => ToastCannotOpenGiftBadge
});
module.exports = __toCommonJS(ToastCannotOpenGiftBadge_exports);
var import_react = __toESM(require("react"));
var import_Toast = require("./Toast");
const ToastCannotOpenGiftBadge = /* @__PURE__ */ __name(({
  i18n,
  isIncoming,
  onClose
}) => {
  const key = `message--giftBadge--unopened--toast--${isIncoming ? "incoming" : "outgoing"}`;
  return /* @__PURE__ */ import_react.default.createElement(import_Toast.Toast, {
    onClose
  }, i18n(key));
}, "ToastCannotOpenGiftBadge");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ToastCannotOpenGiftBadge
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVG9hc3RDYW5ub3RPcGVuR2lmdEJhZGdlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUb2FzdCB9IGZyb20gJy4vVG9hc3QnO1xuXG5leHBvcnQgdHlwZSBUb2FzdFByb3BzVHlwZSA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNJbmNvbWluZzogYm9vbGVhbjtcbiAgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCBjb25zdCBUb2FzdENhbm5vdE9wZW5HaWZ0QmFkZ2UgPSAoe1xuICBpMThuLFxuICBpc0luY29taW5nLFxuICBvbkNsb3NlLFxufTogVG9hc3RQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGtleSA9IGBtZXNzYWdlLS1naWZ0QmFkZ2UtLXVub3BlbmVkLS10b2FzdC0tJHtcbiAgICBpc0luY29taW5nID8gJ2luY29taW5nJyA6ICdvdXRnb2luZydcbiAgfWA7XG5cbiAgcmV0dXJuIDxUb2FzdCBvbkNsb3NlPXtvbkNsb3NlfT57aTE4bihrZXkpfTwvVG9hc3Q+O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFFbEIsbUJBQXNCO0FBUWYsTUFBTSwyQkFBMkIsd0JBQUM7QUFBQSxFQUN2QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDaUM7QUFDakMsUUFBTSxNQUFNLHdDQUNWLGFBQWEsYUFBYTtBQUc1QixTQUFPLG1EQUFDO0FBQUEsSUFBTTtBQUFBLEtBQW1CLEtBQUssR0FBRyxDQUFFO0FBQzdDLEdBVndDOyIsCiAgIm5hbWVzIjogW10KfQo=
