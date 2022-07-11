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
var StickerPreviewModal_stories_exports = {};
__export(StickerPreviewModal_stories_exports, {
  Full: () => Full,
  InitialDownload: () => InitialDownload,
  JustFourStickers: () => JustFourStickers,
  PackDeleted: () => PackDeleted,
  default: () => StickerPreviewModal_stories_default
});
module.exports = __toCommonJS(StickerPreviewModal_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_StickerPreviewModal = require("./StickerPreviewModal");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_Fixtures = require("../../storybook/Fixtures");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var StickerPreviewModal_stories_default = {
  title: "Components/Stickers/StickerPreviewModal"
};
const abeSticker = {
  id: -1,
  emoji: "\u{1F3A9}",
  url: import_Fixtures.squareStickerUrl,
  packId: "abe"
};
const wideSticker = {
  id: -2,
  emoji: "\u{1F92F}",
  url: import_Fixtures.landscapeGreenUrl,
  packId: "wide"
};
const tallSticker = {
  id: -3,
  emoji: "\u{1F525}",
  url: import_Fixtures.portraitTealUrl,
  packId: "tall"
};
const Full = /* @__PURE__ */ __name(() => {
  const title = (0, import_addon_knobs.text)("title", "Foo");
  const author = (0, import_addon_knobs.text)("author", "Foo McBarrington");
  const pack = {
    id: "foo",
    key: "foo",
    lastUsed: Date.now(),
    cover: abeSticker,
    title,
    isBlessed: true,
    author,
    status: "downloaded",
    stickerCount: 101,
    stickers: [
      wideSticker,
      tallSticker,
      ...Array(101).fill(0).map((_n, id) => ({ ...abeSticker, id }))
    ]
  };
  return /* @__PURE__ */ React.createElement(import_StickerPreviewModal.StickerPreviewModal, {
    onClose: (0, import_addon_actions.action)("onClose"),
    installStickerPack: (0, import_addon_actions.action)("installStickerPack"),
    uninstallStickerPack: (0, import_addon_actions.action)("uninstallStickerPack"),
    downloadStickerPack: (0, import_addon_actions.action)("downloadStickerPack"),
    i18n,
    pack
  });
}, "Full");
const JustFourStickers = /* @__PURE__ */ __name(() => {
  const title = (0, import_addon_knobs.text)("title", "Foo");
  const author = (0, import_addon_knobs.text)("author", "Foo McBarrington");
  const pack = {
    id: "foo",
    key: "foo",
    lastUsed: Date.now(),
    cover: abeSticker,
    title,
    isBlessed: true,
    author,
    status: "downloaded",
    stickerCount: 101,
    stickers: [abeSticker, abeSticker, abeSticker, abeSticker]
  };
  return /* @__PURE__ */ React.createElement(import_StickerPreviewModal.StickerPreviewModal, {
    onClose: (0, import_addon_actions.action)("onClose"),
    installStickerPack: (0, import_addon_actions.action)("installStickerPack"),
    uninstallStickerPack: (0, import_addon_actions.action)("uninstallStickerPack"),
    downloadStickerPack: (0, import_addon_actions.action)("downloadStickerPack"),
    i18n,
    pack
  });
}, "JustFourStickers");
JustFourStickers.story = {
  name: "Just four stickers"
};
const InitialDownload = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_StickerPreviewModal.StickerPreviewModal, {
    onClose: (0, import_addon_actions.action)("onClose"),
    installStickerPack: (0, import_addon_actions.action)("installStickerPack"),
    uninstallStickerPack: (0, import_addon_actions.action)("uninstallStickerPack"),
    downloadStickerPack: (0, import_addon_actions.action)("downloadStickerPack"),
    i18n,
    pack: {}
  });
}, "InitialDownload");
InitialDownload.story = {
  name: "Initial download"
};
const PackDeleted = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_StickerPreviewModal.StickerPreviewModal, {
    onClose: (0, import_addon_actions.action)("onClose"),
    installStickerPack: (0, import_addon_actions.action)("installStickerPack"),
    uninstallStickerPack: (0, import_addon_actions.action)("uninstallStickerPack"),
    downloadStickerPack: (0, import_addon_actions.action)("downloadStickerPack"),
    i18n,
    pack: void 0
  });
}, "PackDeleted");
PackDeleted.story = {
  name: "Pack deleted"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Full,
  InitialDownload,
  JustFourStickers,
  PackDeleted
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclByZXZpZXdNb2RhbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBTdGlja2VyUHJldmlld01vZGFsIH0gZnJvbSAnLi9TdGlja2VyUHJldmlld01vZGFsJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHtcbiAgbGFuZHNjYXBlR3JlZW5VcmwsXG4gIHBvcnRyYWl0VGVhbFVybCxcbiAgc3F1YXJlU3RpY2tlclVybCxcbn0gZnJvbSAnLi4vLi4vc3Rvcnlib29rL0ZpeHR1cmVzJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvU3RpY2tlcnMvU3RpY2tlclByZXZpZXdNb2RhbCcsXG59O1xuXG5jb25zdCBhYmVTdGlja2VyID0ge1xuICBpZDogLTEsXG4gIGVtb2ppOiAnXHVEODNDXHVERkE5JyxcbiAgdXJsOiBzcXVhcmVTdGlja2VyVXJsLFxuICBwYWNrSWQ6ICdhYmUnLFxufTtcbmNvbnN0IHdpZGVTdGlja2VyID0ge1xuICBpZDogLTIsXG4gIGVtb2ppOiAnXHVEODNFXHVERDJGJyxcbiAgdXJsOiBsYW5kc2NhcGVHcmVlblVybCxcbiAgcGFja0lkOiAnd2lkZScsXG59O1xuY29uc3QgdGFsbFN0aWNrZXIgPSB7XG4gIGlkOiAtMyxcbiAgZW1vamk6ICdcdUQ4M0RcdUREMjUnLFxuICB1cmw6IHBvcnRyYWl0VGVhbFVybCxcbiAgcGFja0lkOiAndGFsbCcsXG59O1xuXG5leHBvcnQgY29uc3QgRnVsbCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHRpdGxlID0gdGV4dCgndGl0bGUnLCAnRm9vJyk7XG4gIGNvbnN0IGF1dGhvciA9IHRleHQoJ2F1dGhvcicsICdGb28gTWNCYXJyaW5ndG9uJyk7XG5cbiAgY29uc3QgcGFjayA9IHtcbiAgICBpZDogJ2ZvbycsXG4gICAga2V5OiAnZm9vJyxcbiAgICBsYXN0VXNlZDogRGF0ZS5ub3coKSxcbiAgICBjb3ZlcjogYWJlU3RpY2tlcixcbiAgICB0aXRsZSxcbiAgICBpc0JsZXNzZWQ6IHRydWUsXG4gICAgYXV0aG9yLFxuICAgIHN0YXR1czogJ2Rvd25sb2FkZWQnIGFzIGNvbnN0LFxuICAgIHN0aWNrZXJDb3VudDogMTAxLFxuICAgIHN0aWNrZXJzOiBbXG4gICAgICB3aWRlU3RpY2tlcixcbiAgICAgIHRhbGxTdGlja2VyLFxuICAgICAgLi4uQXJyYXkoMTAxKVxuICAgICAgICAuZmlsbCgwKVxuICAgICAgICAubWFwKChfbiwgaWQpID0+ICh7IC4uLmFiZVN0aWNrZXIsIGlkIH0pKSxcbiAgICBdLFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPFN0aWNrZXJQcmV2aWV3TW9kYWxcbiAgICAgIG9uQ2xvc2U9e2FjdGlvbignb25DbG9zZScpfVxuICAgICAgaW5zdGFsbFN0aWNrZXJQYWNrPXthY3Rpb24oJ2luc3RhbGxTdGlja2VyUGFjaycpfVxuICAgICAgdW5pbnN0YWxsU3RpY2tlclBhY2s9e2FjdGlvbigndW5pbnN0YWxsU3RpY2tlclBhY2snKX1cbiAgICAgIGRvd25sb2FkU3RpY2tlclBhY2s9e2FjdGlvbignZG93bmxvYWRTdGlja2VyUGFjaycpfVxuICAgICAgaTE4bj17aTE4bn1cbiAgICAgIHBhY2s9e3BhY2t9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBKdXN0Rm91clN0aWNrZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgdGl0bGUgPSB0ZXh0KCd0aXRsZScsICdGb28nKTtcbiAgY29uc3QgYXV0aG9yID0gdGV4dCgnYXV0aG9yJywgJ0ZvbyBNY0JhcnJpbmd0b24nKTtcblxuICBjb25zdCBwYWNrID0ge1xuICAgIGlkOiAnZm9vJyxcbiAgICBrZXk6ICdmb28nLFxuICAgIGxhc3RVc2VkOiBEYXRlLm5vdygpLFxuICAgIGNvdmVyOiBhYmVTdGlja2VyLFxuICAgIHRpdGxlLFxuICAgIGlzQmxlc3NlZDogdHJ1ZSxcbiAgICBhdXRob3IsXG4gICAgc3RhdHVzOiAnZG93bmxvYWRlZCcgYXMgY29uc3QsXG4gICAgc3RpY2tlckNvdW50OiAxMDEsXG4gICAgc3RpY2tlcnM6IFthYmVTdGlja2VyLCBhYmVTdGlja2VyLCBhYmVTdGlja2VyLCBhYmVTdGlja2VyXSxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxTdGlja2VyUHJldmlld01vZGFsXG4gICAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgICAgIGluc3RhbGxTdGlja2VyUGFjaz17YWN0aW9uKCdpbnN0YWxsU3RpY2tlclBhY2snKX1cbiAgICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrPXthY3Rpb24oJ3VuaW5zdGFsbFN0aWNrZXJQYWNrJyl9XG4gICAgICBkb3dubG9hZFN0aWNrZXJQYWNrPXthY3Rpb24oJ2Rvd25sb2FkU3RpY2tlclBhY2snKX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBwYWNrPXtwYWNrfVxuICAgIC8+XG4gICk7XG59O1xuXG5KdXN0Rm91clN0aWNrZXJzLnN0b3J5ID0ge1xuICBuYW1lOiAnSnVzdCBmb3VyIHN0aWNrZXJzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbml0aWFsRG93bmxvYWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdGlja2VyUHJldmlld01vZGFsXG4gICAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgICAgIGluc3RhbGxTdGlja2VyUGFjaz17YWN0aW9uKCdpbnN0YWxsU3RpY2tlclBhY2snKX1cbiAgICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrPXthY3Rpb24oJ3VuaW5zdGFsbFN0aWNrZXJQYWNrJyl9XG4gICAgICBkb3dubG9hZFN0aWNrZXJQYWNrPXthY3Rpb24oJ2Rvd25sb2FkU3RpY2tlclBhY2snKX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICAvLyAgZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIHBhY2s9e3t9IGFzIGFueX1cbiAgICAvPlxuICApO1xufTtcblxuSW5pdGlhbERvd25sb2FkLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5pdGlhbCBkb3dubG9hZCcsXG59O1xuXG5leHBvcnQgY29uc3QgUGFja0RlbGV0ZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxTdGlja2VyUHJldmlld01vZGFsXG4gICAgICBvbkNsb3NlPXthY3Rpb24oJ29uQ2xvc2UnKX1cbiAgICAgIGluc3RhbGxTdGlja2VyUGFjaz17YWN0aW9uKCdpbnN0YWxsU3RpY2tlclBhY2snKX1cbiAgICAgIHVuaW5zdGFsbFN0aWNrZXJQYWNrPXthY3Rpb24oJ3VuaW5zdGFsbFN0aWNrZXJQYWNrJyl9XG4gICAgICBkb3dubG9hZFN0aWNrZXJQYWNrPXthY3Rpb24oJ2Rvd25sb2FkU3RpY2tlclBhY2snKX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBwYWNrPXt1bmRlZmluZWR9XG4gICAgLz5cbiAgKTtcbn07XG5cblBhY2tEZWxldGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnUGFjayBkZWxldGVkJyxcbn07XG4iXSwKICAibWFwcGluZ3MiOiAi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
