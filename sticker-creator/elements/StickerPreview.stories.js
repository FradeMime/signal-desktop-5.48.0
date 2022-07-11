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
var StickerPreview_stories_exports = {};
__export(StickerPreview_stories_exports, {
  _StickerPreview: () => _StickerPreview,
  default: () => StickerPreview_stories_default
});
module.exports = __toCommonJS(StickerPreview_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_StoryRow = require("./StoryRow");
var import_StickerPreview = require("./StickerPreview");
var StickerPreview_stories_default = {
  title: "Sticker Creator/elements"
};
const _StickerPreview = /* @__PURE__ */ __name(() => {
  const image = (0, import_addon_knobs.text)("image url", "/fixtures/512x515-thumbs-up-lincoln.webp");
  return /* @__PURE__ */ React.createElement(import_StoryRow.StoryRow, null, /* @__PURE__ */ React.createElement(import_StickerPreview.StickerPreview, {
    image
  }));
}, "_StickerPreview");
_StickerPreview.story = {
  name: "StickerPreview"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _StickerPreview
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclByZXZpZXcuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB7IFN0b3J5Um93IH0gZnJvbSAnLi9TdG9yeVJvdyc7XG5pbXBvcnQgeyBTdGlja2VyUHJldmlldyB9IGZyb20gJy4vU3RpY2tlclByZXZpZXcnO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnU3RpY2tlciBDcmVhdG9yL2VsZW1lbnRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfU3RpY2tlclByZXZpZXcgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpbWFnZSA9IHRleHQoJ2ltYWdlIHVybCcsICcvZml4dHVyZXMvNTEyeDUxNS10aHVtYnMtdXAtbGluY29sbi53ZWJwJyk7XG5cbiAgcmV0dXJuIChcbiAgICA8U3RvcnlSb3c+XG4gICAgICA8U3RpY2tlclByZXZpZXcgaW1hZ2U9e2ltYWdlfSAvPlxuICAgIDwvU3RvcnlSb3c+XG4gICk7XG59O1xuXG5fU3RpY2tlclByZXZpZXcuc3RvcnkgPSB7XG4gIG5hbWU6ICdTdGlja2VyUHJldmlldycsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIseUJBQXFCO0FBRXJCLHNCQUF5QjtBQUN6Qiw0QkFBK0I7QUFFL0IsSUFBTyxpQ0FBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRU8sTUFBTSxrQkFBa0IsNkJBQW1CO0FBQ2hELFFBQU0sUUFBUSw2QkFBSyxhQUFhLDBDQUEwQztBQUUxRSxTQUNFLG9DQUFDLGdDQUNDLG9DQUFDO0FBQUEsSUFBZTtBQUFBLEdBQWMsQ0FDaEM7QUFFSixHQVIrQjtBQVUvQixnQkFBZ0IsUUFBUTtBQUFBLEVBQ3RCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
