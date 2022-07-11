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
var Image_stories_exports = {};
__export(Image_stories_exports, {
  Blurhash: () => Blurhash,
  BottomOverlay: () => BottomOverlay,
  Caption: () => Caption,
  CloseButton: () => CloseButton,
  CurvedCorners: () => CurvedCorners,
  FullOverlayWithText: () => FullOverlayWithText,
  MissingImage: () => MissingImage,
  NoBorderOrBackground: () => NoBorderOrBackground,
  Pending: () => Pending,
  PendingWBlurhash: () => PendingWBlurhash,
  PlayIcon: () => PlayIcon,
  SmallCurveTopLeft: () => SmallCurveTopLeft,
  SoftCorners: () => SoftCorners,
  UndefinedBlurHash: () => UndefinedBlurHash,
  UrlWithHeightWidth: () => UrlWithHeightWidth,
  default: () => Image_stories_default
});
module.exports = __toCommonJS(Image_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Fixtures = require("../../storybook/Fixtures");
var import_Image = require("./Image");
var import_MIME = require("../../types/MIME");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../../.storybook/StorybookThemeContext");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Image_stories_default = {
  title: "Components/Conversation/Image"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  alt: (0, import_addon_knobs.text)("alt", overrideProps.alt || ""),
  attachment: overrideProps.attachment || (0, import_fakeAttachment.fakeAttachment)({
    contentType: import_MIME.IMAGE_PNG,
    fileName: "sax.png",
    url: import_Fixtures.pngUrl
  }),
  blurHash: (0, import_addon_knobs.text)("blurHash", overrideProps.blurHash || ""),
  bottomOverlay: (0, import_addon_knobs.boolean)("bottomOverlay", overrideProps.bottomOverlay || false),
  closeButton: (0, import_addon_knobs.boolean)("closeButton", overrideProps.closeButton || false),
  curveBottomLeft: (0, import_addon_knobs.number)("curveBottomLeft", overrideProps.curveBottomLeft || import_Image.CurveType.None),
  curveBottomRight: (0, import_addon_knobs.number)("curveBottomRight", overrideProps.curveBottomRight || import_Image.CurveType.None),
  curveTopLeft: (0, import_addon_knobs.number)("curveTopLeft", overrideProps.curveTopLeft || import_Image.CurveType.None),
  curveTopRight: (0, import_addon_knobs.number)("curveTopRight", overrideProps.curveTopRight || import_Image.CurveType.None),
  darkOverlay: (0, import_addon_knobs.boolean)("darkOverlay", overrideProps.darkOverlay || false),
  height: (0, import_addon_knobs.number)("height", overrideProps.height || 100),
  i18n,
  noBackground: (0, import_addon_knobs.boolean)("noBackground", overrideProps.noBackground || false),
  noBorder: (0, import_addon_knobs.boolean)("noBorder", overrideProps.noBorder || false),
  onClick: (0, import_addon_actions.action)("onClick"),
  onClickClose: (0, import_addon_actions.action)("onClickClose"),
  onError: (0, import_addon_actions.action)("onError"),
  overlayText: (0, import_addon_knobs.text)("overlayText", overrideProps.overlayText || ""),
  playIconOverlay: (0, import_addon_knobs.boolean)("playIconOverlay", overrideProps.playIconOverlay || false),
  tabIndex: (0, import_addon_knobs.number)("tabIndex", overrideProps.tabIndex || 0),
  theme: (0, import_addon_knobs.text)("theme", overrideProps.theme || "light"),
  url: (0, import_addon_knobs.text)("url", "url" in overrideProps ? overrideProps.url || "" : import_Fixtures.pngUrl),
  width: (0, import_addon_knobs.number)("width", overrideProps.width || 100)
}), "createProps");
const UrlWithHeightWidth = /* @__PURE__ */ __name(() => {
  const props = createProps();
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "UrlWithHeightWidth");
UrlWithHeightWidth.story = {
  name: "URL with Height/Width"
};
const Caption = /* @__PURE__ */ __name(() => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    attachment: {
      ...defaultProps.attachment,
      caption: "<Saxophone Pun>"
    }
  };
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "Caption");
const PlayIcon = /* @__PURE__ */ __name(() => {
  const props = createProps({
    playIconOverlay: true
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "PlayIcon");
const CloseButton = /* @__PURE__ */ __name(() => {
  const props = createProps({
    closeButton: true
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "CloseButton");
const NoBorderOrBackground = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      url: import_Fixtures.pngUrl
    }),
    noBackground: true,
    noBorder: true,
    url: import_Fixtures.pngUrl
  });
  return /* @__PURE__ */ React.createElement("div", {
    style: { backgroundColor: "#999" }
  }, /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  }));
}, "NoBorderOrBackground");
NoBorderOrBackground.story = {
  name: "No Border or Background"
};
const Pending = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      url: import_Fixtures.pngUrl,
      pending: true
    })
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "Pending");
const PendingWBlurhash = /* @__PURE__ */ __name(() => {
  const props = createProps({
    attachment: (0, import_fakeAttachment.fakeAttachment)({
      contentType: import_MIME.IMAGE_PNG,
      fileName: "sax.png",
      url: import_Fixtures.pngUrl,
      pending: true
    })
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props,
    blurHash: "LDA,FDBnm+I=p{tkIUI;~UkpELV]",
    width: 300,
    height: 400
  });
}, "PendingWBlurhash");
PendingWBlurhash.story = {
  name: "Pending w/blurhash"
};
const CurvedCorners = /* @__PURE__ */ __name(() => {
  const props = createProps({
    curveBottomLeft: import_Image.CurveType.Normal,
    curveBottomRight: import_Image.CurveType.Normal,
    curveTopLeft: import_Image.CurveType.Normal,
    curveTopRight: import_Image.CurveType.Normal
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "CurvedCorners");
const SmallCurveTopLeft = /* @__PURE__ */ __name(() => {
  const props = createProps({
    curveTopLeft: import_Image.CurveType.Small
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "SmallCurveTopLeft");
const SoftCorners = /* @__PURE__ */ __name(() => {
  const props = createProps({
    curveBottomLeft: import_Image.CurveType.Tiny,
    curveBottomRight: import_Image.CurveType.Tiny,
    curveTopLeft: import_Image.CurveType.Tiny,
    curveTopRight: import_Image.CurveType.Tiny
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "SoftCorners");
const BottomOverlay = /* @__PURE__ */ __name(() => {
  const props = createProps({
    bottomOverlay: true
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "BottomOverlay");
const FullOverlayWithText = /* @__PURE__ */ __name(() => {
  const props = createProps({
    darkOverlay: true,
    overlayText: "Honk!"
  });
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "FullOverlayWithText");
FullOverlayWithText.story = {
  name: "Full Overlay with Text"
};
const Blurhash = /* @__PURE__ */ __name(() => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    blurHash: "thisisafakeblurhashthatwasmadeup"
  };
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "Blurhash");
const UndefinedBlurHash = /* @__PURE__ */ __name(() => {
  const Wrapper = /* @__PURE__ */ __name(() => {
    const theme = React.useContext(import_StorybookThemeContext.StorybookThemeContext);
    const props = createProps({
      blurHash: void 0,
      theme,
      url: void 0
    });
    return /* @__PURE__ */ React.createElement(import_Image.Image, {
      ...props
    });
  }, "Wrapper");
  return /* @__PURE__ */ React.createElement(Wrapper, null);
}, "UndefinedBlurHash");
UndefinedBlurHash.story = {
  name: "undefined blurHash"
};
const MissingImage = /* @__PURE__ */ __name(() => {
  const defaultProps = createProps();
  const props = {
    ...defaultProps,
    attachment: void 0
  };
  return /* @__PURE__ */ React.createElement(import_Image.Image, {
    ...props
  });
}, "MissingImage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Blurhash,
  BottomOverlay,
  Caption,
  CloseButton,
  CurvedCorners,
  FullOverlayWithText,
  MissingImage,
  NoBorderOrBackground,
  Pending,
  PendingWBlurhash,
  PlayIcon,
  SmallCurveTopLeft,
  SoftCorners,
  UndefinedBlurHash,
  UrlWithHeightWidth
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW1hZ2Uuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBib29sZWFuLCBudW1iZXIsIHRleHQgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHsgcG5nVXJsIH0gZnJvbSAnLi4vLi4vc3Rvcnlib29rL0ZpeHR1cmVzJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL0ltYWdlJztcbmltcG9ydCB7IEN1cnZlVHlwZSwgSW1hZ2UgfSBmcm9tICcuL0ltYWdlJztcbmltcG9ydCB7IElNQUdFX1BORyB9IGZyb20gJy4uLy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgU3Rvcnlib29rVGhlbWVDb250ZXh0IH0gZnJvbSAnLi4vLi4vLi4vLnN0b3J5Ym9vay9TdG9yeWJvb2tUaGVtZUNvbnRleHQnO1xuXG5pbXBvcnQgeyBmYWtlQXR0YWNobWVudCB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL0ltYWdlJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHM+ID0ge30pOiBQcm9wcyA9PiAoe1xuICBhbHQ6IHRleHQoJ2FsdCcsIG92ZXJyaWRlUHJvcHMuYWx0IHx8ICcnKSxcbiAgYXR0YWNobWVudDpcbiAgICBvdmVycmlkZVByb3BzLmF0dGFjaG1lbnQgfHxcbiAgICBmYWtlQXR0YWNobWVudCh7XG4gICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgZmlsZU5hbWU6ICdzYXgucG5nJyxcbiAgICAgIHVybDogcG5nVXJsLFxuICAgIH0pLFxuICBibHVySGFzaDogdGV4dCgnYmx1ckhhc2gnLCBvdmVycmlkZVByb3BzLmJsdXJIYXNoIHx8ICcnKSxcbiAgYm90dG9tT3ZlcmxheTogYm9vbGVhbignYm90dG9tT3ZlcmxheScsIG92ZXJyaWRlUHJvcHMuYm90dG9tT3ZlcmxheSB8fCBmYWxzZSksXG4gIGNsb3NlQnV0dG9uOiBib29sZWFuKCdjbG9zZUJ1dHRvbicsIG92ZXJyaWRlUHJvcHMuY2xvc2VCdXR0b24gfHwgZmFsc2UpLFxuICBjdXJ2ZUJvdHRvbUxlZnQ6IG51bWJlcihcbiAgICAnY3VydmVCb3R0b21MZWZ0JyxcbiAgICBvdmVycmlkZVByb3BzLmN1cnZlQm90dG9tTGVmdCB8fCBDdXJ2ZVR5cGUuTm9uZVxuICApLFxuICBjdXJ2ZUJvdHRvbVJpZ2h0OiBudW1iZXIoXG4gICAgJ2N1cnZlQm90dG9tUmlnaHQnLFxuICAgIG92ZXJyaWRlUHJvcHMuY3VydmVCb3R0b21SaWdodCB8fCBDdXJ2ZVR5cGUuTm9uZVxuICApLFxuICBjdXJ2ZVRvcExlZnQ6IG51bWJlcihcbiAgICAnY3VydmVUb3BMZWZ0JyxcbiAgICBvdmVycmlkZVByb3BzLmN1cnZlVG9wTGVmdCB8fCBDdXJ2ZVR5cGUuTm9uZVxuICApLFxuICBjdXJ2ZVRvcFJpZ2h0OiBudW1iZXIoXG4gICAgJ2N1cnZlVG9wUmlnaHQnLFxuICAgIG92ZXJyaWRlUHJvcHMuY3VydmVUb3BSaWdodCB8fCBDdXJ2ZVR5cGUuTm9uZVxuICApLFxuICBkYXJrT3ZlcmxheTogYm9vbGVhbignZGFya092ZXJsYXknLCBvdmVycmlkZVByb3BzLmRhcmtPdmVybGF5IHx8IGZhbHNlKSxcbiAgaGVpZ2h0OiBudW1iZXIoJ2hlaWdodCcsIG92ZXJyaWRlUHJvcHMuaGVpZ2h0IHx8IDEwMCksXG4gIGkxOG4sXG4gIG5vQmFja2dyb3VuZDogYm9vbGVhbignbm9CYWNrZ3JvdW5kJywgb3ZlcnJpZGVQcm9wcy5ub0JhY2tncm91bmQgfHwgZmFsc2UpLFxuICBub0JvcmRlcjogYm9vbGVhbignbm9Cb3JkZXInLCBvdmVycmlkZVByb3BzLm5vQm9yZGVyIHx8IGZhbHNlKSxcbiAgb25DbGljazogYWN0aW9uKCdvbkNsaWNrJyksXG4gIG9uQ2xpY2tDbG9zZTogYWN0aW9uKCdvbkNsaWNrQ2xvc2UnKSxcbiAgb25FcnJvcjogYWN0aW9uKCdvbkVycm9yJyksXG4gIG92ZXJsYXlUZXh0OiB0ZXh0KCdvdmVybGF5VGV4dCcsIG92ZXJyaWRlUHJvcHMub3ZlcmxheVRleHQgfHwgJycpLFxuICBwbGF5SWNvbk92ZXJsYXk6IGJvb2xlYW4oXG4gICAgJ3BsYXlJY29uT3ZlcmxheScsXG4gICAgb3ZlcnJpZGVQcm9wcy5wbGF5SWNvbk92ZXJsYXkgfHwgZmFsc2VcbiAgKSxcbiAgdGFiSW5kZXg6IG51bWJlcigndGFiSW5kZXgnLCBvdmVycmlkZVByb3BzLnRhYkluZGV4IHx8IDApLFxuICB0aGVtZTogdGV4dCgndGhlbWUnLCBvdmVycmlkZVByb3BzLnRoZW1lIHx8ICdsaWdodCcpIGFzIFRoZW1lVHlwZSxcbiAgdXJsOiB0ZXh0KCd1cmwnLCAndXJsJyBpbiBvdmVycmlkZVByb3BzID8gb3ZlcnJpZGVQcm9wcy51cmwgfHwgJycgOiBwbmdVcmwpLFxuICB3aWR0aDogbnVtYmVyKCd3aWR0aCcsIG92ZXJyaWRlUHJvcHMud2lkdGggfHwgMTAwKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgVXJsV2l0aEhlaWdodFdpZHRoID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcygpO1xuXG4gIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cblVybFdpdGhIZWlnaHRXaWR0aC5zdG9yeSA9IHtcbiAgbmFtZTogJ1VSTCB3aXRoIEhlaWdodC9XaWR0aCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ2FwdGlvbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGRlZmF1bHRQcm9wcyA9IGNyZWF0ZVByb3BzKCk7XG4gIGNvbnN0IHByb3BzID0ge1xuICAgIC4uLmRlZmF1bHRQcm9wcyxcbiAgICBhdHRhY2htZW50OiB7XG4gICAgICAuLi5kZWZhdWx0UHJvcHMuYXR0YWNobWVudCxcbiAgICAgIGNhcHRpb246ICc8U2F4b3Bob25lIFB1bj4nLFxuICAgIH0sXG4gIH07XG5cbiAgcmV0dXJuIDxJbWFnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFBsYXlJY29uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgcGxheUljb25PdmVybGF5OiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPEltYWdlIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQ2xvc2VCdXR0b24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjbG9zZUJ1dHRvbjogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE5vQm9yZGVyT3JCYWNrZ3JvdW5kID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICB1cmw6IHBuZ1VybCxcbiAgICB9KSxcbiAgICBub0JhY2tncm91bmQ6IHRydWUsXG4gICAgbm9Cb3JkZXI6IHRydWUsXG4gICAgdXJsOiBwbmdVcmwsXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdiBzdHlsZT17eyBiYWNrZ3JvdW5kQ29sb3I6ICcjOTk5JyB9fT5cbiAgICAgIDxJbWFnZSB7Li4ucHJvcHN9IC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5Ob0JvcmRlck9yQmFja2dyb3VuZC5zdG9yeSA9IHtcbiAgbmFtZTogJ05vIEJvcmRlciBvciBCYWNrZ3JvdW5kJyxcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICB1cmw6IHBuZ1VybCxcbiAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgfSksXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBQZW5kaW5nV0JsdXJoYXNoID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYXR0YWNobWVudDogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgIGZpbGVOYW1lOiAnc2F4LnBuZycsXG4gICAgICB1cmw6IHBuZ1VybCxcbiAgICAgIHBlbmRpbmc6IHRydWUsXG4gICAgfSksXG4gIH0pO1xuXG4gIHJldHVybiAoXG4gICAgPEltYWdlXG4gICAgICB7Li4ucHJvcHN9XG4gICAgICBibHVySGFzaD1cIkxEQSxGREJubStJPXB7dGtJVUk7flVrcEVMVl1cIlxuICAgICAgd2lkdGg9ezMwMH1cbiAgICAgIGhlaWdodD17NDAwfVxuICAgIC8+XG4gICk7XG59O1xuXG5QZW5kaW5nV0JsdXJoYXNoLnN0b3J5ID0ge1xuICBuYW1lOiAnUGVuZGluZyB3L2JsdXJoYXNoJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDdXJ2ZWRDb3JuZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgY3VydmVCb3R0b21MZWZ0OiBDdXJ2ZVR5cGUuTm9ybWFsLFxuICAgIGN1cnZlQm90dG9tUmlnaHQ6IEN1cnZlVHlwZS5Ob3JtYWwsXG4gICAgY3VydmVUb3BMZWZ0OiBDdXJ2ZVR5cGUuTm9ybWFsLFxuICAgIGN1cnZlVG9wUmlnaHQ6IEN1cnZlVHlwZS5Ob3JtYWwsXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTbWFsbEN1cnZlVG9wTGVmdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGN1cnZlVG9wTGVmdDogQ3VydmVUeXBlLlNtYWxsLFxuICB9KTtcblxuICByZXR1cm4gPEltYWdlIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgU29mdENvcm5lcnMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBjdXJ2ZUJvdHRvbUxlZnQ6IEN1cnZlVHlwZS5UaW55LFxuICAgIGN1cnZlQm90dG9tUmlnaHQ6IEN1cnZlVHlwZS5UaW55LFxuICAgIGN1cnZlVG9wTGVmdDogQ3VydmVUeXBlLlRpbnksXG4gICAgY3VydmVUb3BSaWdodDogQ3VydmVUeXBlLlRpbnksXG4gIH0pO1xuXG4gIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBCb3R0b21PdmVybGF5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgYm90dG9tT3ZlcmxheTogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEZ1bGxPdmVybGF5V2l0aFRleHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBkYXJrT3ZlcmxheTogdHJ1ZSxcbiAgICBvdmVybGF5VGV4dDogJ0hvbmshJyxcbiAgfSk7XG5cbiAgcmV0dXJuIDxJbWFnZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuRnVsbE92ZXJsYXlXaXRoVGV4dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0Z1bGwgT3ZlcmxheSB3aXRoIFRleHQnLFxufTtcblxuZXhwb3J0IGNvbnN0IEJsdXJoYXNoID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZGVmYXVsdFByb3BzID0gY3JlYXRlUHJvcHMoKTtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4uZGVmYXVsdFByb3BzLFxuICAgIGJsdXJIYXNoOiAndGhpc2lzYWZha2VibHVyaGFzaHRoYXR3YXNtYWRldXAnLFxuICB9O1xuXG4gIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBVbmRlZmluZWRCbHVySGFzaCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFdyYXBwZXIgPSAoKSA9PiB7XG4gICAgY29uc3QgdGhlbWUgPSBSZWFjdC51c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCk7XG4gICAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgICBibHVySGFzaDogdW5kZWZpbmVkLFxuICAgICAgdGhlbWUsXG4gICAgICB1cmw6IHVuZGVmaW5lZCxcbiAgICB9KTtcblxuICAgIHJldHVybiA8SW1hZ2Ugey4uLnByb3BzfSAvPjtcbiAgfTtcblxuICByZXR1cm4gPFdyYXBwZXIgLz47XG59O1xuXG5VbmRlZmluZWRCbHVySGFzaC5zdG9yeSA9IHtcbiAgbmFtZTogJ3VuZGVmaW5lZCBibHVySGFzaCcsXG59O1xuXG5leHBvcnQgY29uc3QgTWlzc2luZ0ltYWdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZGVmYXVsdFByb3BzID0gY3JlYXRlUHJvcHMoKTtcbiAgY29uc3QgcHJvcHMgPSB7XG4gICAgLi4uZGVmYXVsdFByb3BzLFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgYXR0YWNobWVudDogdW5kZWZpbmVkIGFzIGFueSxcbiAgfTtcblxuICByZXR1cm4gPEltYWdlIHsuLi5wcm9wc30gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBc0M7QUFFdEMsc0JBQXVCO0FBRXZCLG1CQUFpQztBQUNqQyxrQkFBMEI7QUFFMUIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUN2QixtQ0FBc0M7QUFFdEMsNEJBQStCO0FBRS9CLE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sd0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sY0FBYyx3QkFBQyxnQkFBZ0MsQ0FBQyxNQUFjO0FBQUEsRUFDbEUsS0FBSyw2QkFBSyxPQUFPLGNBQWMsT0FBTyxFQUFFO0FBQUEsRUFDeEMsWUFDRSxjQUFjLGNBQ2QsMENBQWU7QUFBQSxJQUNiLGFBQWE7QUFBQSxJQUNiLFVBQVU7QUFBQSxJQUNWLEtBQUs7QUFBQSxFQUNQ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
