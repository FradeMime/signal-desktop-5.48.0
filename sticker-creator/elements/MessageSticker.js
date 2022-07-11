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
var MessageSticker_exports = {};
__export(MessageSticker_exports, {
  MessageSticker: () => MessageSticker
});
module.exports = __toCommonJS(MessageSticker_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./MessageSticker.scss"));
var import_MessageMeta = require("./MessageMeta");
const MessageSticker = /* @__PURE__ */ __name(({
  image,
  kind,
  minutesAgo
}) => {
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.base
  }, /* @__PURE__ */ React.createElement("img", {
    src: image,
    alt: "Sticker",
    className: styles.image
  }), /* @__PURE__ */ React.createElement(import_MessageMeta.MessageMeta, {
    kind,
    minutesAgo
  }));
}, "MessageSticker");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageSticker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVN0aWNrZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0ICogYXMgc3R5bGVzIGZyb20gJy4vTWVzc2FnZVN0aWNrZXIuc2Nzcyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIE1lc3NhZ2VNZXRhUHJvcHMgfSBmcm9tICcuL01lc3NhZ2VNZXRhJztcbmltcG9ydCB7IE1lc3NhZ2VNZXRhIH0gZnJvbSAnLi9NZXNzYWdlTWV0YSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gTWVzc2FnZU1ldGFQcm9wcyAmIHtcbiAgaW1hZ2U6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlU3RpY2tlcjogUmVhY3QuQ29tcG9uZW50VHlwZTxQcm9wcz4gPSAoe1xuICBpbWFnZSxcbiAga2luZCxcbiAgbWludXRlc0Fnbyxcbn0pID0+IHtcbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLmJhc2V9PlxuICAgICAgPGltZyBzcmM9e2ltYWdlfSBhbHQ9XCJTdGlja2VyXCIgY2xhc3NOYW1lPXtzdHlsZXMuaW1hZ2V9IC8+XG4gICAgICA8TWVzc2FnZU1ldGEga2luZD17a2luZH0gbWludXRlc0Fnbz17bWludXRlc0Fnb30gLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsYUFBd0I7QUFFeEIseUJBQTRCO0FBTXJCLE1BQU0saUJBQTZDLHdCQUFDO0FBQUEsRUFDekQ7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ0k7QUFDSixTQUNFLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNyQixvQ0FBQztBQUFBLElBQUksS0FBSztBQUFBLElBQU8sS0FBSTtBQUFBLElBQVUsV0FBVyxPQUFPO0FBQUEsR0FBTyxHQUN4RCxvQ0FBQztBQUFBLElBQVk7QUFBQSxJQUFZO0FBQUEsR0FBd0IsQ0FDbkQ7QUFFSixHQVgwRDsiLAogICJuYW1lcyI6IFtdCn0K
