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
var StickerPackPreview_exports = {};
__export(StickerPackPreview_exports, {
  StickerPackPreview: () => StickerPackPreview
});
module.exports = __toCommonJS(StickerPackPreview_exports);
var React = __toESM(require("react"));
var styles = __toESM(require("./StickerPackPreview.scss"));
var import_i18n = require("../util/i18n");
const StickerPackPreview = React.memo(({ images, title, author }) => {
  const i18n = (0, import_i18n.useI18n)();
  return /* @__PURE__ */ React.createElement("div", {
    className: styles.container
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.titleBar
  }, i18n("StickerCreator--Preview--title")), /* @__PURE__ */ React.createElement("div", {
    className: styles.scroller
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.grid
  }, images.map((src) => /* @__PURE__ */ React.createElement("img", {
    key: src,
    className: styles.sticker,
    src,
    alt: src
  })))), /* @__PURE__ */ React.createElement("div", {
    className: styles.meta
  }, /* @__PURE__ */ React.createElement("div", {
    className: styles.metaTitle
  }, title), /* @__PURE__ */ React.createElement("div", {
    className: styles.metaAuthor
  }, author)));
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StickerPackPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclBhY2tQcmV2aWV3LnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIHN0eWxlcyBmcm9tICcuL1N0aWNrZXJQYWNrUHJldmlldy5zY3NzJztcbmltcG9ydCB7IHVzZUkxOG4gfSBmcm9tICcuLi91dGlsL2kxOG4nO1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IHtcbiAgaW1hZ2VzOiBBcnJheTxzdHJpbmc+O1xuICB0aXRsZTogc3RyaW5nO1xuICBhdXRob3I6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyUGFja1ByZXZpZXcgPSBSZWFjdC5tZW1vKFxuICAoeyBpbWFnZXMsIHRpdGxlLCBhdXRob3IgfTogUHJvcHMpID0+IHtcbiAgICBjb25zdCBpMThuID0gdXNlSTE4bigpO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50aXRsZUJhcn0+XG4gICAgICAgICAge2kxOG4oJ1N0aWNrZXJDcmVhdG9yLS1QcmV2aWV3LS10aXRsZScpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5zY3JvbGxlcn0+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5ncmlkfT5cbiAgICAgICAgICAgIHtpbWFnZXMubWFwKHNyYyA9PiAoXG4gICAgICAgICAgICAgIDxpbWcga2V5PXtzcmN9IGNsYXNzTmFtZT17c3R5bGVzLnN0aWNrZXJ9IHNyYz17c3JjfSBhbHQ9e3NyY30gLz5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy5tZXRhfT5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17c3R5bGVzLm1ldGFUaXRsZX0+e3RpdGxlfTwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMubWV0YUF1dGhvcn0+e2F1dGhvcn08L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG4pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsYUFBd0I7QUFDeEIsa0JBQXdCO0FBUWpCLE1BQU0scUJBQXFCLE1BQU0sS0FDdEMsQ0FBQyxFQUFFLFFBQVEsT0FBTyxhQUFvQjtBQUNwQyxRQUFNLE9BQU8seUJBQVE7QUFFckIsU0FDRSxvQ0FBQztBQUFBLElBQUksV0FBVyxPQUFPO0FBQUEsS0FDckIsb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3BCLEtBQUssZ0NBQWdDLENBQ3hDLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUNwQixPQUFPLElBQUksU0FDVixvQ0FBQztBQUFBLElBQUksS0FBSztBQUFBLElBQUssV0FBVyxPQUFPO0FBQUEsSUFBUztBQUFBLElBQVUsS0FBSztBQUFBLEdBQUssQ0FDL0QsQ0FDSCxDQUNGLEdBQ0Esb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQ3JCLG9DQUFDO0FBQUEsSUFBSSxXQUFXLE9BQU87QUFBQSxLQUFZLEtBQU0sR0FDekMsb0NBQUM7QUFBQSxJQUFJLFdBQVcsT0FBTztBQUFBLEtBQWEsTUFBTyxDQUM3QyxDQUNGO0FBRUosQ0FDRjsiLAogICJuYW1lcyI6IFtdCn0K
