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
var StickerPackPreview_stories_exports = {};
__export(StickerPackPreview_stories_exports, {
  _StickerPackPreview: () => _StickerPackPreview,
  default: () => StickerPackPreview_stories_default
});
module.exports = __toCommonJS(StickerPackPreview_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("../elements/StoryRow");
var import_StickerPackPreview = require("./StickerPackPreview");
var StickerPackPreview_stories_default = {
  title: "Sticker Creator/components"
};
const _StickerPackPreview = /* @__PURE__ */ __name(() => {
  const image = (0, import_addon_knobs.text)("image url", "/fixtures/512x515-thumbs-up-lincoln.webp");
  const title = (0, import_addon_knobs.text)("title", "Sticker pack title");
  const author = (0, import_addon_knobs.text)("author", "Sticker pack author");
  const images = React.useMemo(() => Array(39).fill(image), [image]);
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, {
    top: true
  }, /* @__PURE__ */ React.createElement(import_StickerPackPreview.StickerPackPreview, {
    images,
    title,
    author
  }));
}, "_StickerPackPreview");
_StickerPackPreview.story = {
  name: "StickerPackPreview"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _StickerPackPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclBhY2tQcmV2aWV3LnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGV4dCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBTdG9yeVJvdyB9IGZyb20gJy4uL2VsZW1lbnRzL1N0b3J5Um93JztcbmltcG9ydCB7IFN0aWNrZXJQYWNrUHJldmlldyB9IGZyb20gJy4vU3RpY2tlclBhY2tQcmV2aWV3JztcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ1N0aWNrZXIgQ3JlYXRvci9jb21wb25lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfU3RpY2tlclBhY2tQcmV2aWV3ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaW1hZ2UgPSB0ZXh0KCdpbWFnZSB1cmwnLCAnL2ZpeHR1cmVzLzUxMng1MTUtdGh1bWJzLXVwLWxpbmNvbG4ud2VicCcpO1xuICBjb25zdCB0aXRsZSA9IHRleHQoJ3RpdGxlJywgJ1N0aWNrZXIgcGFjayB0aXRsZScpO1xuICBjb25zdCBhdXRob3IgPSB0ZXh0KCdhdXRob3InLCAnU3RpY2tlciBwYWNrIGF1dGhvcicpO1xuICBjb25zdCBpbWFnZXMgPSBSZWFjdC51c2VNZW1vKCgpID0+IEFycmF5KDM5KS5maWxsKGltYWdlKSwgW2ltYWdlXSk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3cgdG9wPlxuICAgICAgPFN0aWNrZXJQYWNrUHJldmlldyBpbWFnZXM9e2ltYWdlc30gdGl0bGU9e3RpdGxlfSBhdXRob3I9e2F1dGhvcn0gLz5cbiAgICA8L1N0b3J5Um93PlxuICApO1xufTtcblxuX1N0aWNrZXJQYWNrUHJldmlldy5zdG9yeSA9IHtcbiAgbmFtZTogJ1N0aWNrZXJQYWNrUHJldmlldycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBRXJCLHNCQUF5QjtBQUN6QixnQ0FBbUM7QUFFbkMsSUFBTyxxQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxzQkFBc0IsNkJBQW1CO0FBQ3BELFFBQU0sUUFBUSw2QkFBSyxhQUFhLDBDQUEwQztBQUMxRSxRQUFNLFFBQVEsNkJBQUssU0FBUyxvQkFBb0I7QUFDaEQsUUFBTSxTQUFTLDZCQUFLLFVBQVUscUJBQXFCO0FBQ25ELFFBQU0sU0FBUyxNQUFNLFFBQVEsTUFBTSxNQUFNLEVBQUUsRUFBRSxLQUFLLEtBQUssR0FBRyxDQUFDLEtBQUssQ0FBQztBQUVqRSxTQUNFLG9DQUFDO0FBQUEsSUFBUyxLQUFHO0FBQUEsS0FDWCxvQ0FBQztBQUFBLElBQW1CO0FBQUEsSUFBZ0I7QUFBQSxJQUFjO0FBQUEsR0FBZ0IsQ0FDcEU7QUFFSixHQVhtQztBQWFuQyxvQkFBb0IsUUFBUTtBQUFBLEVBQzFCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
