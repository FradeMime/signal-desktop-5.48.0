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
var ImageGrid_exports = {};
__export(ImageGrid_exports, {
  ImageGrid: () => ImageGrid
});
module.exports = __toCommonJS(ImageGrid_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_Attachment = require("../../types/Attachment");
var import_Image = require("./Image");
const GAP = 1;
function getCurves({
  direction,
  shouldCollapseAbove,
  shouldCollapseBelow,
  withContentAbove,
  withContentBelow
}) {
  let curveTopLeft = import_Image.CurveType.None;
  let curveTopRight = import_Image.CurveType.None;
  let curveBottomLeft = import_Image.CurveType.None;
  let curveBottomRight = import_Image.CurveType.None;
  if (shouldCollapseAbove && direction === "incoming") {
    curveTopLeft = import_Image.CurveType.Tiny;
    curveTopRight = import_Image.CurveType.Normal;
  } else if (shouldCollapseAbove && direction === "outgoing") {
    curveTopLeft = import_Image.CurveType.Normal;
    curveTopRight = import_Image.CurveType.Tiny;
  } else if (!withContentAbove) {
    curveTopLeft = import_Image.CurveType.Normal;
    curveTopRight = import_Image.CurveType.Normal;
  }
  if (shouldCollapseBelow && direction === "incoming") {
    curveBottomLeft = import_Image.CurveType.Tiny;
    curveBottomRight = import_Image.CurveType.None;
  } else if (shouldCollapseBelow && direction === "outgoing") {
    curveBottomLeft = import_Image.CurveType.None;
    curveBottomRight = import_Image.CurveType.Tiny;
  } else if (!withContentBelow) {
    curveBottomLeft = import_Image.CurveType.Normal;
    curveBottomRight = import_Image.CurveType.Normal;
  }
  return {
    curveTopLeft,
    curveTopRight,
    curveBottomLeft,
    curveBottomRight
  };
}
const ImageGrid = /* @__PURE__ */ __name(({
  attachments,
  bottomOverlay,
  direction,
  i18n,
  isSticker,
  stickerSize,
  onError,
  onClick,
  shouldCollapseAbove,
  shouldCollapseBelow,
  tabIndex,
  theme,
  withContentAbove,
  withContentBelow
}) => {
  const { curveTopLeft, curveTopRight, curveBottomLeft, curveBottomRight } = getCurves({
    direction,
    shouldCollapseAbove,
    shouldCollapseBelow,
    withContentAbove,
    withContentBelow
  });
  const withBottomOverlay = Boolean(bottomOverlay && !withContentBelow);
  if (!attachments || !attachments.length) {
    return null;
  }
  if (attachments.length === 1 || !(0, import_Attachment.areAllAttachmentsVisual)(attachments)) {
    const { height, width } = (0, import_Attachment.getImageDimensions)(attachments[0], isSticker ? stickerSize : void 0);
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-image-grid", "module-image-grid--one-image", isSticker ? "module-image-grid--with-sticker" : null)
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[0], i18n),
      i18n,
      theme,
      blurHash: attachments[0].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: isSticker,
      noBackground: isSticker,
      curveTopLeft,
      curveTopRight,
      curveBottomLeft,
      curveBottomRight,
      attachment: attachments[0],
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[0]),
      height,
      width,
      url: (0, import_Attachment.getUrl)(attachments[0]),
      tabIndex,
      onClick,
      onError
    }));
  }
  if (attachments.length === 2) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[0], i18n),
      i18n,
      theme,
      attachment: attachments[0],
      blurHash: attachments[0].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveTopLeft,
      curveBottomLeft,
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[0]),
      height: 150,
      width: 150,
      cropWidth: GAP,
      url: (0, import_Attachment.getThumbnailUrl)(attachments[0]),
      onClick,
      onError
    }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[1], i18n),
      i18n,
      theme,
      blurHash: attachments[1].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveTopRight,
      curveBottomRight,
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[1]),
      height: 150,
      width: 150,
      attachment: attachments[1],
      url: (0, import_Attachment.getThumbnailUrl)(attachments[1]),
      onClick,
      onError
    }));
  }
  if (attachments.length === 3) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[0], i18n),
      i18n,
      theme,
      blurHash: attachments[0].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveTopLeft,
      curveBottomLeft,
      attachment: attachments[0],
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[0]),
      height: 200,
      width: 200,
      cropWidth: GAP,
      url: (0, import_Attachment.getUrl)(attachments[0]),
      onClick,
      onError
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid__column"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[1], i18n),
      i18n,
      theme,
      blurHash: attachments[1].blurHash,
      curveTopRight,
      height: 100,
      width: 100,
      cropHeight: GAP,
      attachment: attachments[1],
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[1]),
      url: (0, import_Attachment.getThumbnailUrl)(attachments[1]),
      onClick,
      onError
    }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[2], i18n),
      i18n,
      theme,
      blurHash: attachments[2].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveBottomRight,
      height: 100,
      width: 100,
      attachment: attachments[2],
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[2]),
      url: (0, import_Attachment.getThumbnailUrl)(attachments[2]),
      onClick,
      onError
    })));
  }
  if (attachments.length === 4) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid__column"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid__row"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[0], i18n),
      i18n,
      theme,
      blurHash: attachments[0].blurHash,
      curveTopLeft,
      noBorder: false,
      attachment: attachments[0],
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[0]),
      height: 150,
      width: 150,
      cropHeight: GAP,
      cropWidth: GAP,
      url: (0, import_Attachment.getThumbnailUrl)(attachments[0]),
      onClick,
      onError
    }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[1], i18n),
      i18n,
      theme,
      blurHash: attachments[1].blurHash,
      curveTopRight,
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[1]),
      noBorder: false,
      height: 150,
      width: 150,
      cropHeight: GAP,
      attachment: attachments[1],
      url: (0, import_Attachment.getThumbnailUrl)(attachments[1]),
      onClick,
      onError
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image-grid__row"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[2], i18n),
      i18n,
      theme,
      blurHash: attachments[2].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveBottomLeft,
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[2]),
      height: 150,
      width: 150,
      cropWidth: GAP,
      attachment: attachments[2],
      url: (0, import_Attachment.getThumbnailUrl)(attachments[2]),
      onClick,
      onError
    }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      alt: (0, import_Attachment.getAlt)(attachments[3], i18n),
      i18n,
      theme,
      blurHash: attachments[3].blurHash,
      bottomOverlay: withBottomOverlay,
      noBorder: false,
      curveBottomRight,
      playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[3]),
      height: 150,
      width: 150,
      attachment: attachments[3],
      url: (0, import_Attachment.getThumbnailUrl)(attachments[3]),
      onClick,
      onError
    }))));
  }
  const moreMessagesOverlay = attachments.length > 5;
  const moreMessagesOverlayText = moreMessagesOverlay ? `+${attachments.length - 5}` : void 0;
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-image-grid"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-image-grid__column"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-image-grid__row"
  }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: (0, import_Attachment.getAlt)(attachments[0], i18n),
    i18n,
    theme,
    blurHash: attachments[0].blurHash,
    curveTopLeft,
    attachment: attachments[0],
    playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[0]),
    height: 150,
    width: 150,
    cropWidth: GAP,
    url: (0, import_Attachment.getThumbnailUrl)(attachments[0]),
    onClick,
    onError
  }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: (0, import_Attachment.getAlt)(attachments[1], i18n),
    i18n,
    theme,
    blurHash: attachments[1].blurHash,
    curveTopRight,
    playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[1]),
    height: 150,
    width: 150,
    attachment: attachments[1],
    url: (0, import_Attachment.getThumbnailUrl)(attachments[1]),
    onClick,
    onError
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-image-grid__row"
  }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: (0, import_Attachment.getAlt)(attachments[2], i18n),
    i18n,
    theme,
    blurHash: attachments[2].blurHash,
    bottomOverlay: withBottomOverlay,
    noBorder: isSticker,
    curveBottomLeft,
    playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[2]),
    height: 100,
    width: 100,
    cropWidth: GAP,
    attachment: attachments[2],
    url: (0, import_Attachment.getThumbnailUrl)(attachments[2]),
    onClick,
    onError
  }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: (0, import_Attachment.getAlt)(attachments[3], i18n),
    i18n,
    theme,
    blurHash: attachments[3].blurHash,
    bottomOverlay: withBottomOverlay,
    noBorder: isSticker,
    playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[3]),
    height: 100,
    width: 100,
    cropWidth: GAP,
    attachment: attachments[3],
    url: (0, import_Attachment.getThumbnailUrl)(attachments[3]),
    onClick,
    onError
  }), /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
    alt: (0, import_Attachment.getAlt)(attachments[4], i18n),
    i18n,
    theme,
    blurHash: attachments[4].blurHash,
    bottomOverlay: withBottomOverlay,
    noBorder: isSticker,
    curveBottomRight,
    playIconOverlay: (0, import_Attachment.isVideoAttachment)(attachments[4]),
    height: 100,
    width: 100,
    darkOverlay: moreMessagesOverlay,
    overlayText: moreMessagesOverlayText,
    attachment: attachments[4],
    url: (0, import_Attachment.getThumbnailUrl)(attachments[4]),
    onClick,
    onError
  }))));
}, "ImageGrid");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ImageGrid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW1hZ2VHcmlkLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHtcbiAgYXJlQWxsQXR0YWNobWVudHNWaXN1YWwsXG4gIGdldEFsdCxcbiAgZ2V0SW1hZ2VEaW1lbnNpb25zLFxuICBnZXRUaHVtYm5haWxVcmwsXG4gIGdldFVybCxcbiAgaXNWaWRlb0F0dGFjaG1lbnQsXG59IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuXG5pbXBvcnQgeyBJbWFnZSwgQ3VydmVUeXBlIH0gZnJvbSAnLi9JbWFnZSc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmV4cG9ydCB0eXBlIERpcmVjdGlvblR5cGUgPSAnaW5jb21pbmcnIHwgJ291dGdvaW5nJztcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSB7XG4gIGF0dGFjaG1lbnRzOiBBcnJheTxBdHRhY2htZW50VHlwZT47XG4gIGJvdHRvbU92ZXJsYXk/OiBib29sZWFuO1xuICBkaXJlY3Rpb246IERpcmVjdGlvblR5cGU7XG4gIGlzU3RpY2tlcj86IGJvb2xlYW47XG4gIHNob3VsZENvbGxhcHNlQWJvdmU/OiBib29sZWFuO1xuICBzaG91bGRDb2xsYXBzZUJlbG93PzogYm9vbGVhbjtcbiAgc3RpY2tlclNpemU/OiBudW1iZXI7XG4gIHRhYkluZGV4PzogbnVtYmVyO1xuICB3aXRoQ29udGVudEFib3ZlPzogYm9vbGVhbjtcbiAgd2l0aENvbnRlbnRCZWxvdz86IGJvb2xlYW47XG5cbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGhlbWU/OiBUaGVtZVR5cGU7XG5cbiAgb25FcnJvcjogKCkgPT4gdm9pZDtcbiAgb25DbGljaz86IChhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IEdBUCA9IDE7XG5cbmZ1bmN0aW9uIGdldEN1cnZlcyh7XG4gIGRpcmVjdGlvbixcbiAgc2hvdWxkQ29sbGFwc2VBYm92ZSxcbiAgc2hvdWxkQ29sbGFwc2VCZWxvdyxcbiAgd2l0aENvbnRlbnRBYm92ZSxcbiAgd2l0aENvbnRlbnRCZWxvdyxcbn06IHtcbiAgZGlyZWN0aW9uOiBEaXJlY3Rpb25UeXBlO1xuICBzaG91bGRDb2xsYXBzZUFib3ZlPzogYm9vbGVhbjtcbiAgc2hvdWxkQ29sbGFwc2VCZWxvdz86IGJvb2xlYW47XG4gIHdpdGhDb250ZW50QWJvdmU/OiBib29sZWFuO1xuICB3aXRoQ29udGVudEJlbG93PzogYm9vbGVhbjtcbn0pOiB7XG4gIGN1cnZlVG9wTGVmdDogQ3VydmVUeXBlO1xuICBjdXJ2ZVRvcFJpZ2h0OiBDdXJ2ZVR5cGU7XG4gIGN1cnZlQm90dG9tTGVmdDogQ3VydmVUeXBlO1xuICBjdXJ2ZUJvdHRvbVJpZ2h0OiBDdXJ2ZVR5cGU7XG59IHtcbiAgbGV0IGN1cnZlVG9wTGVmdCA9IEN1cnZlVHlwZS5Ob25lO1xuICBsZXQgY3VydmVUb3BSaWdodCA9IEN1cnZlVHlwZS5Ob25lO1xuICBsZXQgY3VydmVCb3R0b21MZWZ0ID0gQ3VydmVUeXBlLk5vbmU7XG4gIGxldCBjdXJ2ZUJvdHRvbVJpZ2h0ID0gQ3VydmVUeXBlLk5vbmU7XG5cbiAgaWYgKHNob3VsZENvbGxhcHNlQWJvdmUgJiYgZGlyZWN0aW9uID09PSAnaW5jb21pbmcnKSB7XG4gICAgY3VydmVUb3BMZWZ0ID0gQ3VydmVUeXBlLlRpbnk7XG4gICAgY3VydmVUb3BSaWdodCA9IEN1cnZlVHlwZS5Ob3JtYWw7XG4gIH0gZWxzZSBpZiAoc2hvdWxkQ29sbGFwc2VBYm92ZSAmJiBkaXJlY3Rpb24gPT09ICdvdXRnb2luZycpIHtcbiAgICBjdXJ2ZVRvcExlZnQgPSBDdXJ2ZVR5cGUuTm9ybWFsO1xuICAgIGN1cnZlVG9wUmlnaHQgPSBDdXJ2ZVR5cGUuVGlueTtcbiAgfSBlbHNlIGlmICghd2l0aENvbnRlbnRBYm92ZSkge1xuICAgIGN1cnZlVG9wTGVmdCA9IEN1cnZlVHlwZS5Ob3JtYWw7XG4gICAgY3VydmVUb3BSaWdodCA9IEN1cnZlVHlwZS5Ob3JtYWw7XG4gIH1cblxuICBpZiAoc2hvdWxkQ29sbGFwc2VCZWxvdyAmJiBkaXJlY3Rpb24gPT09ICdpbmNvbWluZycpIHtcbiAgICBjdXJ2ZUJvdHRvbUxlZnQgPSBDdXJ2ZVR5cGUuVGlueTtcbiAgICBjdXJ2ZUJvdHRvbVJpZ2h0ID0gQ3VydmVUeXBlLk5vbmU7XG4gIH0gZWxzZSBpZiAoc2hvdWxkQ29sbGFwc2VCZWxvdyAmJiBkaXJlY3Rpb24gPT09ICdvdXRnb2luZycpIHtcbiAgICBjdXJ2ZUJvdHRvbUxlZnQgPSBDdXJ2ZVR5cGUuTm9uZTtcbiAgICBjdXJ2ZUJvdHRvbVJpZ2h0ID0gQ3VydmVUeXBlLlRpbnk7XG4gIH0gZWxzZSBpZiAoIXdpdGhDb250ZW50QmVsb3cpIHtcbiAgICBjdXJ2ZUJvdHRvbUxlZnQgPSBDdXJ2ZVR5cGUuTm9ybWFsO1xuICAgIGN1cnZlQm90dG9tUmlnaHQgPSBDdXJ2ZVR5cGUuTm9ybWFsO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjdXJ2ZVRvcExlZnQsXG4gICAgY3VydmVUb3BSaWdodCxcbiAgICBjdXJ2ZUJvdHRvbUxlZnQsXG4gICAgY3VydmVCb3R0b21SaWdodCxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IEltYWdlR3JpZCA9ICh7XG4gIGF0dGFjaG1lbnRzLFxuICBib3R0b21PdmVybGF5LFxuICBkaXJlY3Rpb24sXG4gIGkxOG4sXG4gIGlzU3RpY2tlcixcbiAgc3RpY2tlclNpemUsXG4gIG9uRXJyb3IsXG4gIG9uQ2xpY2ssXG4gIHNob3VsZENvbGxhcHNlQWJvdmUsXG4gIHNob3VsZENvbGxhcHNlQmVsb3csXG4gIHRhYkluZGV4LFxuICB0aGVtZSxcbiAgd2l0aENvbnRlbnRBYm92ZSxcbiAgd2l0aENvbnRlbnRCZWxvdyxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgY29uc3QgeyBjdXJ2ZVRvcExlZnQsIGN1cnZlVG9wUmlnaHQsIGN1cnZlQm90dG9tTGVmdCwgY3VydmVCb3R0b21SaWdodCB9ID1cbiAgICBnZXRDdXJ2ZXMoe1xuICAgICAgZGlyZWN0aW9uLFxuICAgICAgc2hvdWxkQ29sbGFwc2VBYm92ZSxcbiAgICAgIHNob3VsZENvbGxhcHNlQmVsb3csXG4gICAgICB3aXRoQ29udGVudEFib3ZlLFxuICAgICAgd2l0aENvbnRlbnRCZWxvdyxcbiAgICB9KTtcblxuICBjb25zdCB3aXRoQm90dG9tT3ZlcmxheSA9IEJvb2xlYW4oYm90dG9tT3ZlcmxheSAmJiAhd2l0aENvbnRlbnRCZWxvdyk7XG5cbiAgaWYgKCFhdHRhY2htZW50cyB8fCAhYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoYXR0YWNobWVudHMubGVuZ3RoID09PSAxIHx8ICFhcmVBbGxBdHRhY2htZW50c1Zpc3VhbChhdHRhY2htZW50cykpIHtcbiAgICBjb25zdCB7IGhlaWdodCwgd2lkdGggfSA9IGdldEltYWdlRGltZW5zaW9ucyhcbiAgICAgIGF0dGFjaG1lbnRzWzBdLFxuICAgICAgaXNTdGlja2VyID8gc3RpY2tlclNpemUgOiB1bmRlZmluZWRcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtaW1hZ2UtZ3JpZCcsXG4gICAgICAgICAgJ21vZHVsZS1pbWFnZS1ncmlkLS1vbmUtaW1hZ2UnLFxuICAgICAgICAgIGlzU3RpY2tlciA/ICdtb2R1bGUtaW1hZ2UtZ3JpZC0td2l0aC1zdGlja2VyJyA6IG51bGxcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAgPEltYWdlXG4gICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbMF0sIGkxOG4pfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1swXS5ibHVySGFzaH1cbiAgICAgICAgICBib3R0b21PdmVybGF5PXt3aXRoQm90dG9tT3ZlcmxheX1cbiAgICAgICAgICBub0JvcmRlcj17aXNTdGlja2VyfVxuICAgICAgICAgIG5vQmFja2dyb3VuZD17aXNTdGlja2VyfVxuICAgICAgICAgIGN1cnZlVG9wTGVmdD17Y3VydmVUb3BMZWZ0fVxuICAgICAgICAgIGN1cnZlVG9wUmlnaHQ9e2N1cnZlVG9wUmlnaHR9XG4gICAgICAgICAgY3VydmVCb3R0b21MZWZ0PXtjdXJ2ZUJvdHRvbUxlZnR9XG4gICAgICAgICAgY3VydmVCb3R0b21SaWdodD17Y3VydmVCb3R0b21SaWdodH1cbiAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50c1swXX1cbiAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzBdKX1cbiAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgdXJsPXtnZXRVcmwoYXR0YWNobWVudHNbMF0pfVxuICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgaWYgKGF0dGFjaG1lbnRzLmxlbmd0aCA9PT0gMikge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkXCI+XG4gICAgICAgIDxJbWFnZVxuICAgICAgICAgIGFsdD17Z2V0QWx0KGF0dGFjaG1lbnRzWzBdLCBpMThuKX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50c1swXX1cbiAgICAgICAgICBibHVySGFzaD17YXR0YWNobWVudHNbMF0uYmx1ckhhc2h9XG4gICAgICAgICAgYm90dG9tT3ZlcmxheT17d2l0aEJvdHRvbU92ZXJsYXl9XG4gICAgICAgICAgbm9Cb3JkZXI9e2ZhbHNlfVxuICAgICAgICAgIGN1cnZlVG9wTGVmdD17Y3VydmVUb3BMZWZ0fVxuICAgICAgICAgIGN1cnZlQm90dG9tTGVmdD17Y3VydmVCb3R0b21MZWZ0fVxuICAgICAgICAgIHBsYXlJY29uT3ZlcmxheT17aXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudHNbMF0pfVxuICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgY3JvcFdpZHRoPXtHQVB9XG4gICAgICAgICAgdXJsPXtnZXRUaHVtYm5haWxVcmwoYXR0YWNobWVudHNbMF0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgLz5cbiAgICAgICAgPEltYWdlXG4gICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbMV0sIGkxOG4pfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1sxXS5ibHVySGFzaH1cbiAgICAgICAgICBib3R0b21PdmVybGF5PXt3aXRoQm90dG9tT3ZlcmxheX1cbiAgICAgICAgICBub0JvcmRlcj17ZmFsc2V9XG4gICAgICAgICAgY3VydmVUb3BSaWdodD17Y3VydmVUb3BSaWdodH1cbiAgICAgICAgICBjdXJ2ZUJvdHRvbVJpZ2h0PXtjdXJ2ZUJvdHRvbVJpZ2h0fVxuICAgICAgICAgIHBsYXlJY29uT3ZlcmxheT17aXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudHNbMV0pfVxuICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbMV19XG4gICAgICAgICAgdXJsPXtnZXRUaHVtYm5haWxVcmwoYXR0YWNobWVudHNbMV0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoYXR0YWNobWVudHMubGVuZ3RoID09PSAzKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlLWdyaWRcIj5cbiAgICAgICAgPEltYWdlXG4gICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbMF0sIGkxOG4pfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1swXS5ibHVySGFzaH1cbiAgICAgICAgICBib3R0b21PdmVybGF5PXt3aXRoQm90dG9tT3ZlcmxheX1cbiAgICAgICAgICBub0JvcmRlcj17ZmFsc2V9XG4gICAgICAgICAgY3VydmVUb3BMZWZ0PXtjdXJ2ZVRvcExlZnR9XG4gICAgICAgICAgY3VydmVCb3R0b21MZWZ0PXtjdXJ2ZUJvdHRvbUxlZnR9XG4gICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbMF19XG4gICAgICAgICAgcGxheUljb25PdmVybGF5PXtpc1ZpZGVvQXR0YWNobWVudChhdHRhY2htZW50c1swXSl9XG4gICAgICAgICAgaGVpZ2h0PXsyMDB9XG4gICAgICAgICAgd2lkdGg9ezIwMH1cbiAgICAgICAgICBjcm9wV2lkdGg9e0dBUH1cbiAgICAgICAgICB1cmw9e2dldFVybChhdHRhY2htZW50c1swXSl9XG4gICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICBvbkVycm9yPXtvbkVycm9yfVxuICAgICAgICAvPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkX19jb2x1bW5cIj5cbiAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgIGFsdD17Z2V0QWx0KGF0dGFjaG1lbnRzWzFdLCBpMThuKX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICBibHVySGFzaD17YXR0YWNobWVudHNbMV0uYmx1ckhhc2h9XG4gICAgICAgICAgICBjdXJ2ZVRvcFJpZ2h0PXtjdXJ2ZVRvcFJpZ2h0fVxuICAgICAgICAgICAgaGVpZ2h0PXsxMDB9XG4gICAgICAgICAgICB3aWR0aD17MTAwfVxuICAgICAgICAgICAgY3JvcEhlaWdodD17R0FQfVxuICAgICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbMV19XG4gICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzFdKX1cbiAgICAgICAgICAgIHVybD17Z2V0VGh1bWJuYWlsVXJsKGF0dGFjaG1lbnRzWzFdKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICBvbkVycm9yPXtvbkVycm9yfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICBhbHQ9e2dldEFsdChhdHRhY2htZW50c1syXSwgaTE4bil9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgYmx1ckhhc2g9e2F0dGFjaG1lbnRzWzJdLmJsdXJIYXNofVxuICAgICAgICAgICAgYm90dG9tT3ZlcmxheT17d2l0aEJvdHRvbU92ZXJsYXl9XG4gICAgICAgICAgICBub0JvcmRlcj17ZmFsc2V9XG4gICAgICAgICAgICBjdXJ2ZUJvdHRvbVJpZ2h0PXtjdXJ2ZUJvdHRvbVJpZ2h0fVxuICAgICAgICAgICAgaGVpZ2h0PXsxMDB9XG4gICAgICAgICAgICB3aWR0aD17MTAwfVxuICAgICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbMl19XG4gICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzJdKX1cbiAgICAgICAgICAgIHVybD17Z2V0VGh1bWJuYWlsVXJsKGF0dGFjaG1lbnRzWzJdKX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICBvbkVycm9yPXtvbkVycm9yfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChhdHRhY2htZW50cy5sZW5ndGggPT09IDQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2UtZ3JpZFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkX19jb2x1bW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkX19yb3dcIj5cbiAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICBhbHQ9e2dldEFsdChhdHRhY2htZW50c1swXSwgaTE4bil9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgYmx1ckhhc2g9e2F0dGFjaG1lbnRzWzBdLmJsdXJIYXNofVxuICAgICAgICAgICAgICBjdXJ2ZVRvcExlZnQ9e2N1cnZlVG9wTGVmdH1cbiAgICAgICAgICAgICAgbm9Cb3JkZXI9e2ZhbHNlfVxuICAgICAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50c1swXX1cbiAgICAgICAgICAgICAgcGxheUljb25PdmVybGF5PXtpc1ZpZGVvQXR0YWNobWVudChhdHRhY2htZW50c1swXSl9XG4gICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICBjcm9wSGVpZ2h0PXtHQVB9XG4gICAgICAgICAgICAgIGNyb3BXaWR0aD17R0FQfVxuICAgICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1swXSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgIGFsdD17Z2V0QWx0KGF0dGFjaG1lbnRzWzFdLCBpMThuKX1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICBibHVySGFzaD17YXR0YWNobWVudHNbMV0uYmx1ckhhc2h9XG4gICAgICAgICAgICAgIGN1cnZlVG9wUmlnaHQ9e2N1cnZlVG9wUmlnaHR9XG4gICAgICAgICAgICAgIHBsYXlJY29uT3ZlcmxheT17aXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudHNbMV0pfVxuICAgICAgICAgICAgICBub0JvcmRlcj17ZmFsc2V9XG4gICAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgICBjcm9wSGVpZ2h0PXtHQVB9XG4gICAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnRzWzFdfVxuICAgICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1sxXSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlLWdyaWRfX3Jvd1wiPlxuICAgICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICAgIGFsdD17Z2V0QWx0KGF0dGFjaG1lbnRzWzJdLCBpMThuKX1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICBibHVySGFzaD17YXR0YWNobWVudHNbMl0uYmx1ckhhc2h9XG4gICAgICAgICAgICAgIGJvdHRvbU92ZXJsYXk9e3dpdGhCb3R0b21PdmVybGF5fVxuICAgICAgICAgICAgICBub0JvcmRlcj17ZmFsc2V9XG4gICAgICAgICAgICAgIGN1cnZlQm90dG9tTGVmdD17Y3VydmVCb3R0b21MZWZ0fVxuICAgICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzJdKX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXsxNTB9XG4gICAgICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgICAgIGNyb3BXaWR0aD17R0FQfVxuICAgICAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50c1syXX1cbiAgICAgICAgICAgICAgdXJsPXtnZXRUaHVtYm5haWxVcmwoYXR0YWNobWVudHNbMl0pfVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgICBvbkVycm9yPXtvbkVycm9yfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICBhbHQ9e2dldEFsdChhdHRhY2htZW50c1szXSwgaTE4bil9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgYmx1ckhhc2g9e2F0dGFjaG1lbnRzWzNdLmJsdXJIYXNofVxuICAgICAgICAgICAgICBib3R0b21PdmVybGF5PXt3aXRoQm90dG9tT3ZlcmxheX1cbiAgICAgICAgICAgICAgbm9Cb3JkZXI9e2ZhbHNlfVxuICAgICAgICAgICAgICBjdXJ2ZUJvdHRvbVJpZ2h0PXtjdXJ2ZUJvdHRvbVJpZ2h0fVxuICAgICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzNdKX1cbiAgICAgICAgICAgICAgaGVpZ2h0PXsxNTB9XG4gICAgICAgICAgICAgIHdpZHRoPXsxNTB9XG4gICAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnRzWzNdfVxuICAgICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1szXSl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBjb25zdCBtb3JlTWVzc2FnZXNPdmVybGF5ID0gYXR0YWNobWVudHMubGVuZ3RoID4gNTtcbiAgY29uc3QgbW9yZU1lc3NhZ2VzT3ZlcmxheVRleHQgPSBtb3JlTWVzc2FnZXNPdmVybGF5XG4gICAgPyBgKyR7YXR0YWNobWVudHMubGVuZ3RoIC0gNX1gXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS1ncmlkX19jb2x1bW5cIj5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2UtZ3JpZF9fcm93XCI+XG4gICAgICAgICAgPEltYWdlXG4gICAgICAgICAgICBhbHQ9e2dldEFsdChhdHRhY2htZW50c1swXSwgaTE4bil9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgYmx1ckhhc2g9e2F0dGFjaG1lbnRzWzBdLmJsdXJIYXNofVxuICAgICAgICAgICAgY3VydmVUb3BMZWZ0PXtjdXJ2ZVRvcExlZnR9XG4gICAgICAgICAgICBhdHRhY2htZW50PXthdHRhY2htZW50c1swXX1cbiAgICAgICAgICAgIHBsYXlJY29uT3ZlcmxheT17aXNWaWRlb0F0dGFjaG1lbnQoYXR0YWNobWVudHNbMF0pfVxuICAgICAgICAgICAgaGVpZ2h0PXsxNTB9XG4gICAgICAgICAgICB3aWR0aD17MTUwfVxuICAgICAgICAgICAgY3JvcFdpZHRoPXtHQVB9XG4gICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1swXSl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbMV0sIGkxOG4pfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1sxXS5ibHVySGFzaH1cbiAgICAgICAgICAgIGN1cnZlVG9wUmlnaHQ9e2N1cnZlVG9wUmlnaHR9XG4gICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzFdKX1cbiAgICAgICAgICAgIGhlaWdodD17MTUwfVxuICAgICAgICAgICAgd2lkdGg9ezE1MH1cbiAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnRzWzFdfVxuICAgICAgICAgICAgdXJsPXtnZXRUaHVtYm5haWxVcmwoYXR0YWNobWVudHNbMV0pfVxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlLWdyaWRfX3Jvd1wiPlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbMl0sIGkxOG4pfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1syXS5ibHVySGFzaH1cbiAgICAgICAgICAgIGJvdHRvbU92ZXJsYXk9e3dpdGhCb3R0b21PdmVybGF5fVxuICAgICAgICAgICAgbm9Cb3JkZXI9e2lzU3RpY2tlcn1cbiAgICAgICAgICAgIGN1cnZlQm90dG9tTGVmdD17Y3VydmVCb3R0b21MZWZ0fVxuICAgICAgICAgICAgcGxheUljb25PdmVybGF5PXtpc1ZpZGVvQXR0YWNobWVudChhdHRhY2htZW50c1syXSl9XG4gICAgICAgICAgICBoZWlnaHQ9ezEwMH1cbiAgICAgICAgICAgIHdpZHRoPXsxMDB9XG4gICAgICAgICAgICBjcm9wV2lkdGg9e0dBUH1cbiAgICAgICAgICAgIGF0dGFjaG1lbnQ9e2F0dGFjaG1lbnRzWzJdfVxuICAgICAgICAgICAgdXJsPXtnZXRUaHVtYm5haWxVcmwoYXR0YWNobWVudHNbMl0pfVxuICAgICAgICAgICAgb25DbGljaz17b25DbGlja31cbiAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8SW1hZ2VcbiAgICAgICAgICAgIGFsdD17Z2V0QWx0KGF0dGFjaG1lbnRzWzNdLCBpMThuKX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICBibHVySGFzaD17YXR0YWNobWVudHNbM10uYmx1ckhhc2h9XG4gICAgICAgICAgICBib3R0b21PdmVybGF5PXt3aXRoQm90dG9tT3ZlcmxheX1cbiAgICAgICAgICAgIG5vQm9yZGVyPXtpc1N0aWNrZXJ9XG4gICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzNdKX1cbiAgICAgICAgICAgIGhlaWdodD17MTAwfVxuICAgICAgICAgICAgd2lkdGg9ezEwMH1cbiAgICAgICAgICAgIGNyb3BXaWR0aD17R0FQfVxuICAgICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbM119XG4gICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1szXSl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgYWx0PXtnZXRBbHQoYXR0YWNobWVudHNbNF0sIGkxOG4pfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgIGJsdXJIYXNoPXthdHRhY2htZW50c1s0XS5ibHVySGFzaH1cbiAgICAgICAgICAgIGJvdHRvbU92ZXJsYXk9e3dpdGhCb3R0b21PdmVybGF5fVxuICAgICAgICAgICAgbm9Cb3JkZXI9e2lzU3RpY2tlcn1cbiAgICAgICAgICAgIGN1cnZlQm90dG9tUmlnaHQ9e2N1cnZlQm90dG9tUmlnaHR9XG4gICAgICAgICAgICBwbGF5SWNvbk92ZXJsYXk9e2lzVmlkZW9BdHRhY2htZW50KGF0dGFjaG1lbnRzWzRdKX1cbiAgICAgICAgICAgIGhlaWdodD17MTAwfVxuICAgICAgICAgICAgd2lkdGg9ezEwMH1cbiAgICAgICAgICAgIGRhcmtPdmVybGF5PXttb3JlTWVzc2FnZXNPdmVybGF5fVxuICAgICAgICAgICAgb3ZlcmxheVRleHQ9e21vcmVNZXNzYWdlc092ZXJsYXlUZXh0fVxuICAgICAgICAgICAgYXR0YWNobWVudD17YXR0YWNobWVudHNbNF19XG4gICAgICAgICAgICB1cmw9e2dldFRodW1ibmFpbFVybChhdHRhY2htZW50c1s0XSl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrfVxuICAgICAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgICAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsd0JBQXVCO0FBR3ZCLHdCQU9PO0FBRVAsbUJBQWlDO0FBeUJqQyxNQUFNLE1BQU07QUFFWixtQkFBbUI7QUFBQSxFQUNqQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQVlBO0FBQ0EsTUFBSSxlQUFlLHVCQUFVO0FBQzdCLE1BQUksZ0JBQWdCLHVCQUFVO0FBQzlCLE1BQUksa0JBQWtCLHVCQUFVO0FBQ2hDLE1BQUksbUJBQW1CLHVCQUFVO0FBRWpDLE1BQUksdUJBQXVCLGNBQWMsWUFBWTtBQUNuRCxtQkFBZSx1QkFBVTtBQUN6QixvQkFBZ0IsdUJBQVU7QUFBQSxFQUM1QixXQUFXLHVCQUF1QixjQUFjLFlBQVk7QUFDMUQsbUJBQWUsdUJBQVU7QUFDekIsb0JBQWdCLHVCQUFVO0FBQUEsRUFDNUIsV0FBVyxDQUFDLGtCQUFrQjtBQUM1QixtQkFBZSx1QkFBVTtBQUN6QixvQkFBZ0IsdUJBQVU7QUFBQSxFQUM1QjtBQUVBLE1BQUksdUJBQXVCLGNBQWMsWUFBWTtBQUNuRCxzQkFBa0IsdUJBQVU7QUFDNUIsdUJBQW1CLHVCQUFVO0FBQUEsRUFDL0IsV0FBVyx1QkFBdUIsY0FBYyxZQUFZO0FBQzFELHNCQUFrQix1QkFBVTtBQUM1Qix1QkFBbUIsdUJBQVU7QUFBQSxFQUMvQixXQUFXLENBQUMsa0JB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
