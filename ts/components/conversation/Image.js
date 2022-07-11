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
var Image_exports = {};
__export(Image_exports, {
  CurveType: () => CurveType,
  Image: () => Image
});
module.exports = __toCommonJS(Image_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_blurhash = require("react-blurhash");
var import_Spinner = require("../Spinner");
var import_Attachment = require("../../types/Attachment");
var CurveType = /* @__PURE__ */ ((CurveType2) => {
  CurveType2[CurveType2["None"] = 0] = "None";
  CurveType2[CurveType2["Tiny"] = 4] = "Tiny";
  CurveType2[CurveType2["Small"] = 10] = "Small";
  CurveType2[CurveType2["Normal"] = 18] = "Normal";
  return CurveType2;
})(CurveType || {});
class Image extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.handleClick = /* @__PURE__ */ __name((event) => {
      if (!this.canClick()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const { onClick, attachment } = this.props;
      if (onClick) {
        event.preventDefault();
        event.stopPropagation();
        onClick(attachment);
      }
    }, "handleClick");
    this.handleKeyDown = /* @__PURE__ */ __name((event) => {
      if (!this.canClick()) {
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      const { onClick, attachment } = this.props;
      if (onClick && (event.key === "Enter" || event.key === "Space")) {
        event.preventDefault();
        event.stopPropagation();
        onClick(attachment);
      }
    }, "handleKeyDown");
    this.renderPending = /* @__PURE__ */ __name(() => {
      const { blurHash, height, i18n, width } = this.props;
      if (blurHash) {
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-image__download-pending"
        }, /* @__PURE__ */ import_react.default.createElement(import_react_blurhash.Blurhash, {
          hash: blurHash,
          width,
          height,
          style: { display: "block" }
        }), /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-image__download-pending--spinner-container"
        }, /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-image__download-pending--spinner",
          title: i18n("loading")
        }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
          moduleClassName: "module-image-spinner",
          svgSize: "small"
        }))));
      }
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-image__loading-placeholder",
        style: {
          height: `${height}px`,
          width: `${width}px`,
          lineHeight: `${height}px`,
          textAlign: "center"
        },
        title: i18n("loading")
      }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
        svgSize: "normal"
      }));
    }, "renderPending");
  }
  canClick() {
    const { onClick, attachment } = this.props;
    const { pending } = attachment || { pending: true };
    return Boolean(onClick && !pending);
  }
  render() {
    const {
      alt,
      attachment,
      blurHash,
      bottomOverlay,
      className,
      closeButton,
      curveBottomLeft,
      curveBottomRight,
      curveTopLeft,
      curveTopRight,
      darkOverlay,
      isDownloaded,
      height = 0,
      i18n,
      noBackground,
      noBorder,
      onClickClose,
      onError,
      overlayText,
      playIconOverlay,
      tabIndex,
      theme,
      url,
      width = 0,
      cropWidth = 0,
      cropHeight = 0
    } = this.props;
    const { caption, pending } = attachment || { caption: null, pending: true };
    const canClick = this.canClick();
    const imgNotDownloaded = isDownloaded ? false : !(0, import_Attachment.isDownloaded)(attachment);
    const resolvedBlurHash = blurHash || (0, import_Attachment.defaultBlurHash)(theme);
    const curveStyles = {
      borderTopLeftRadius: curveTopLeft || 0 /* None */,
      borderTopRightRadius: curveTopRight || 0 /* None */,
      borderBottomLeftRadius: curveBottomLeft || 0 /* None */,
      borderBottomRightRadius: curveBottomRight || 0 /* None */
    };
    const overlay = canClick ? /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: (0, import_classnames.default)("module-image__border-overlay", {
        "module-image__border-overlay--with-border": !noBorder,
        "module-image__border-overlay--with-click-handler": canClick,
        "module-image__border-overlay--dark": darkOverlay,
        "module-image--not-downloaded": imgNotDownloaded
      }),
      style: curveStyles,
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      tabIndex
    }, imgNotDownloaded ? /* @__PURE__ */ import_react.default.createElement("span", null) : null) : null;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-image", className, !noBackground ? "module-image--with-background" : null, cropWidth || cropHeight ? "module-image--cropped" : null),
      style: {
        width: width - cropWidth,
        height: height - cropHeight,
        ...curveStyles
      }
    }, pending ? this.renderPending() : url ? /* @__PURE__ */ import_react.default.createElement("img", {
      onError,
      className: "module-image__image",
      alt,
      height,
      width,
      src: url
    }) : resolvedBlurHash ? /* @__PURE__ */ import_react.default.createElement(import_react_blurhash.Blurhash, {
      hash: resolvedBlurHash,
      width,
      height,
      style: { display: "block" }
    }) : null, caption ? /* @__PURE__ */ import_react.default.createElement("img", {
      className: "module-image__caption-icon",
      src: "images/caption-shadow.svg",
      alt: i18n("imageCaptionIconAlt")
    }) : null, bottomOverlay ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__bottom-overlay",
      style: {
        borderBottomLeftRadius: curveBottomLeft || 0 /* None */,
        borderBottomRightRadius: curveBottomRight || 0 /* None */
      }
    }) : null, !pending && !imgNotDownloaded && playIconOverlay ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__play-overlay__circle"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__play-overlay__icon"
    })) : null, overlayText ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__text-container",
      style: { lineHeight: `${height}px` }
    }, overlayText) : null, overlay, closeButton ? /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (onClickClose) {
          onClickClose(attachment);
        }
      },
      className: "module-image__close-button",
      title: i18n("remove-attachment"),
      "aria-label": i18n("remove-attachment")
    }) : null);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CurveType,
  Image
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSW1hZ2UudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgQmx1cmhhc2ggfSBmcm9tICdyZWFjdC1ibHVyaGFzaCc7XG5cbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuLi9TcGlubmVyJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQge1xuICBpc0Rvd25sb2FkZWQgYXMgaXNEb3dubG9hZGVkRnVuY3Rpb24sXG4gIGRlZmF1bHRCbHVySGFzaCxcbn0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5cbmV4cG9ydCBlbnVtIEN1cnZlVHlwZSB7XG4gIE5vbmUgPSAwLFxuICBUaW55ID0gNCxcbiAgU21hbGwgPSAxMCxcbiAgTm9ybWFsID0gMTgsXG59XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhbHQ6IHN0cmluZztcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gIHVybD86IHN0cmluZztcblxuICBpc0Rvd25sb2FkZWQ/OiBib29sZWFuO1xuICBjbGFzc05hbWU/OiBzdHJpbmc7XG4gIGhlaWdodD86IG51bWJlcjtcbiAgd2lkdGg/OiBudW1iZXI7XG4gIGNyb3BXaWR0aD86IG51bWJlcjtcbiAgY3JvcEhlaWdodD86IG51bWJlcjtcbiAgdGFiSW5kZXg/OiBudW1iZXI7XG5cbiAgb3ZlcmxheVRleHQ/OiBzdHJpbmc7XG5cbiAgbm9Cb3JkZXI/OiBib29sZWFuO1xuICBub0JhY2tncm91bmQ/OiBib29sZWFuO1xuICBib3R0b21PdmVybGF5PzogYm9vbGVhbjtcbiAgY2xvc2VCdXR0b24/OiBib29sZWFuO1xuICBjdXJ2ZUJvdHRvbUxlZnQ/OiBDdXJ2ZVR5cGU7XG4gIGN1cnZlQm90dG9tUmlnaHQ/OiBDdXJ2ZVR5cGU7XG4gIGN1cnZlVG9wTGVmdD86IEN1cnZlVHlwZTtcbiAgY3VydmVUb3BSaWdodD86IEN1cnZlVHlwZTtcblxuICBkYXJrT3ZlcmxheT86IGJvb2xlYW47XG4gIHBsYXlJY29uT3ZlcmxheT86IGJvb2xlYW47XG4gIGJsdXJIYXNoPzogc3RyaW5nO1xuXG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRoZW1lPzogVGhlbWVUeXBlO1xuICBvbkNsaWNrPzogKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlKSA9PiB2b2lkO1xuICBvbkNsaWNrQ2xvc2U/OiAoYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUpID0+IHZvaWQ7XG4gIG9uRXJyb3I/OiAoKSA9PiB2b2lkO1xufTtcblxuZXhwb3J0IGNsYXNzIEltYWdlIGV4dGVuZHMgUmVhY3QuQ29tcG9uZW50PFByb3BzPiB7XG4gIHByaXZhdGUgY2FuQ2xpY2soKSB7XG4gICAgY29uc3QgeyBvbkNsaWNrLCBhdHRhY2htZW50IH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgcGVuZGluZyB9ID0gYXR0YWNobWVudCB8fCB7IHBlbmRpbmc6IHRydWUgfTtcblxuICAgIHJldHVybiBCb29sZWFuKG9uQ2xpY2sgJiYgIXBlbmRpbmcpO1xuICB9XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKCF0aGlzLmNhbkNsaWNrKCkpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgb25DbGljaywgYXR0YWNobWVudCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChvbkNsaWNrKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIG9uQ2xpY2soYXR0YWNobWVudCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVLZXlEb3duID0gKFxuICAgIGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxCdXR0b25FbGVtZW50PlxuICApOiB2b2lkID0+IHtcbiAgICBpZiAoIXRoaXMuY2FuQ2xpY2soKSkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBvbkNsaWNrLCBhdHRhY2htZW50IH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKG9uQ2xpY2sgJiYgKGV2ZW50LmtleSA9PT0gJ0VudGVyJyB8fCBldmVudC5rZXkgPT09ICdTcGFjZScpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBvbkNsaWNrKGF0dGFjaG1lbnQpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgcmVuZGVyUGVuZGluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gICAgY29uc3QgeyBibHVySGFzaCwgaGVpZ2h0LCBpMThuLCB3aWR0aCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChibHVySGFzaCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2Rvd25sb2FkLXBlbmRpbmdcIj5cbiAgICAgICAgICA8Qmx1cmhhc2hcbiAgICAgICAgICAgIGhhc2g9e2JsdXJIYXNofVxuICAgICAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICBzdHlsZT17eyBkaXNwbGF5OiAnYmxvY2snIH19XG4gICAgICAgICAgLz5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZV9fZG93bmxvYWQtcGVuZGluZy0tc3Bpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlX19kb3dubG9hZC1wZW5kaW5nLS1zcGlubmVyXCJcbiAgICAgICAgICAgICAgdGl0bGU9e2kxOG4oJ2xvYWRpbmcnKX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPFNwaW5uZXIgbW9kdWxlQ2xhc3NOYW1lPVwibW9kdWxlLWltYWdlLXNwaW5uZXJcIiBzdmdTaXplPVwic21hbGxcIiAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2xvYWRpbmctcGxhY2Vob2xkZXJcIlxuICAgICAgICBzdHlsZT17e1xuICAgICAgICAgIGhlaWdodDogYCR7aGVpZ2h0fXB4YCxcbiAgICAgICAgICB3aWR0aDogYCR7d2lkdGh9cHhgLFxuICAgICAgICAgIGxpbmVIZWlnaHQ6IGAke2hlaWdodH1weGAsXG4gICAgICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgICAgfX1cbiAgICAgICAgdGl0bGU9e2kxOG4oJ2xvYWRpbmcnKX1cbiAgICAgID5cbiAgICAgICAgPFNwaW5uZXIgc3ZnU2l6ZT1cIm5vcm1hbFwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9O1xuXG4gIHB1YmxpYyBvdmVycmlkZSByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHtcbiAgICAgIGFsdCxcbiAgICAgIGF0dGFjaG1lbnQsXG4gICAgICBibHVySGFzaCxcbiAgICAgIGJvdHRvbU92ZXJsYXksXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBjbG9zZUJ1dHRvbixcbiAgICAgIGN1cnZlQm90dG9tTGVmdCxcbiAgICAgIGN1cnZlQm90dG9tUmlnaHQsXG4gICAgICBjdXJ2ZVRvcExlZnQsXG4gICAgICBjdXJ2ZVRvcFJpZ2h0LFxuICAgICAgZGFya092ZXJsYXksXG4gICAgICBpc0Rvd25sb2FkZWQsXG4gICAgICBoZWlnaHQgPSAwLFxuICAgICAgaTE4bixcbiAgICAgIG5vQmFja2dyb3VuZCxcbiAgICAgIG5vQm9yZGVyLFxuICAgICAgb25DbGlja0Nsb3NlLFxuICAgICAgb25FcnJvcixcbiAgICAgIG92ZXJsYXlUZXh0LFxuICAgICAgcGxheUljb25PdmVybGF5LFxuICAgICAgdGFiSW5kZXgsXG4gICAgICB0aGVtZSxcbiAgICAgIHVybCxcbiAgICAgIHdpZHRoID0gMCxcbiAgICAgIGNyb3BXaWR0aCA9IDAsXG4gICAgICBjcm9wSGVpZ2h0ID0gMCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IHsgY2FwdGlvbiwgcGVuZGluZyB9ID0gYXR0YWNobWVudCB8fCB7IGNhcHRpb246IG51bGwsIHBlbmRpbmc6IHRydWUgfTtcbiAgICBjb25zdCBjYW5DbGljayA9IHRoaXMuY2FuQ2xpY2soKTtcbiAgICBjb25zdCBpbWdOb3REb3dubG9hZGVkID0gaXNEb3dubG9hZGVkXG4gICAgICA/IGZhbHNlXG4gICAgICA6ICFpc0Rvd25sb2FkZWRGdW5jdGlvbihhdHRhY2htZW50KTtcblxuICAgIGNvbnN0IHJlc29sdmVkQmx1ckhhc2ggPSBibHVySGFzaCB8fCBkZWZhdWx0Qmx1ckhhc2godGhlbWUpO1xuXG4gICAgY29uc3QgY3VydmVTdHlsZXMgPSB7XG4gICAgICBib3JkZXJUb3BMZWZ0UmFkaXVzOiBjdXJ2ZVRvcExlZnQgfHwgQ3VydmVUeXBlLk5vbmUsXG4gICAgICBib3JkZXJUb3BSaWdodFJhZGl1czogY3VydmVUb3BSaWdodCB8fCBDdXJ2ZVR5cGUuTm9uZSxcbiAgICAgIGJvcmRlckJvdHRvbUxlZnRSYWRpdXM6IGN1cnZlQm90dG9tTGVmdCB8fCBDdXJ2ZVR5cGUuTm9uZSxcbiAgICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiBjdXJ2ZUJvdHRvbVJpZ2h0IHx8IEN1cnZlVHlwZS5Ob25lLFxuICAgIH07XG5cbiAgICBjb25zdCBvdmVybGF5ID0gY2FuQ2xpY2sgPyAoXG4gICAgICAvLyBOb3Qgc3VyZSB3aGF0IHRoaXMgYnV0dG9uIGRvZXMuXG4gICAgICA8YnV0dG9uXG4gICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ21vZHVsZS1pbWFnZV9fYm9yZGVyLW92ZXJsYXknLCB7XG4gICAgICAgICAgJ21vZHVsZS1pbWFnZV9fYm9yZGVyLW92ZXJsYXktLXdpdGgtYm9yZGVyJzogIW5vQm9yZGVyLFxuICAgICAgICAgICdtb2R1bGUtaW1hZ2VfX2JvcmRlci1vdmVybGF5LS13aXRoLWNsaWNrLWhhbmRsZXInOiBjYW5DbGljayxcbiAgICAgICAgICAnbW9kdWxlLWltYWdlX19ib3JkZXItb3ZlcmxheS0tZGFyayc6IGRhcmtPdmVybGF5LFxuICAgICAgICAgICdtb2R1bGUtaW1hZ2UtLW5vdC1kb3dubG9hZGVkJzogaW1nTm90RG93bmxvYWRlZCxcbiAgICAgICAgfSl9XG4gICAgICAgIHN0eWxlPXtjdXJ2ZVN0eWxlc31cbiAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgID5cbiAgICAgICAge2ltZ05vdERvd25sb2FkZWQgPyA8c3BhbiAvPiA6IG51bGx9XG4gICAgICA8L2J1dHRvbj5cbiAgICApIDogbnVsbDtcblxuICAgIC8qIGVzbGludC1kaXNhYmxlIG5vLW5lc3RlZC10ZXJuYXJ5ICovXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtaW1hZ2UnLFxuICAgICAgICAgIGNsYXNzTmFtZSxcbiAgICAgICAgICAhbm9CYWNrZ3JvdW5kID8gJ21vZHVsZS1pbWFnZS0td2l0aC1iYWNrZ3JvdW5kJyA6IG51bGwsXG4gICAgICAgICAgY3JvcFdpZHRoIHx8IGNyb3BIZWlnaHQgPyAnbW9kdWxlLWltYWdlLS1jcm9wcGVkJyA6IG51bGxcbiAgICAgICAgKX1cbiAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICB3aWR0aDogd2lkdGggLSBjcm9wV2lkdGgsXG4gICAgICAgICAgaGVpZ2h0OiBoZWlnaHQgLSBjcm9wSGVpZ2h0LFxuICAgICAgICAgIC4uLmN1cnZlU3R5bGVzLFxuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7cGVuZGluZyA/IChcbiAgICAgICAgICB0aGlzLnJlbmRlclBlbmRpbmcoKVxuICAgICAgICApIDogdXJsID8gKFxuICAgICAgICAgIDxpbWdcbiAgICAgICAgICAgIG9uRXJyb3I9e29uRXJyb3J9XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2ltYWdlXCJcbiAgICAgICAgICAgIGFsdD17YWx0fVxuICAgICAgICAgICAgaGVpZ2h0PXtoZWlnaHR9XG4gICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICBzcmM9e3VybH1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogcmVzb2x2ZWRCbHVySGFzaCA/IChcbiAgICAgICAgICA8Qmx1cmhhc2hcbiAgICAgICAgICAgIGhhc2g9e3Jlc29sdmVkQmx1ckhhc2h9XG4gICAgICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgICAgIHN0eWxlPXt7IGRpc3BsYXk6ICdibG9jaycgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2NhcHRpb24gPyAoXG4gICAgICAgICAgPGltZ1xuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlX19jYXB0aW9uLWljb25cIlxuICAgICAgICAgICAgc3JjPVwiaW1hZ2VzL2NhcHRpb24tc2hhZG93LnN2Z1wiXG4gICAgICAgICAgICBhbHQ9e2kxOG4oJ2ltYWdlQ2FwdGlvbkljb25BbHQnKX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2JvdHRvbU92ZXJsYXkgPyAoXG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlX19ib3R0b20tb3ZlcmxheVwiXG4gICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICBib3JkZXJCb3R0b21MZWZ0UmFkaXVzOiBjdXJ2ZUJvdHRvbUxlZnQgfHwgQ3VydmVUeXBlLk5vbmUsXG4gICAgICAgICAgICAgIGJvcmRlckJvdHRvbVJpZ2h0UmFkaXVzOiBjdXJ2ZUJvdHRvbVJpZ2h0IHx8IEN1cnZlVHlwZS5Ob25lLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAvPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgeyFwZW5kaW5nICYmICFpbWdOb3REb3dubG9hZGVkICYmIHBsYXlJY29uT3ZlcmxheSA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZV9fcGxheS1vdmVybGF5X19jaXJjbGVcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWltYWdlX19wbGF5LW92ZXJsYXlfX2ljb25cIiAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge292ZXJsYXlUZXh0ID8gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZV9fdGV4dC1jb250YWluZXJcIlxuICAgICAgICAgICAgc3R5bGU9e3sgbGluZUhlaWdodDogYCR7aGVpZ2h0fXB4YCB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtvdmVybGF5VGV4dH1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIHtvdmVybGF5fVxuICAgICAgICB7Y2xvc2VCdXR0b24gPyAoXG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICBvbkNsaWNrPXsoZTogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pID0+IHtcbiAgICAgICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgICAgIGlmIChvbkNsaWNrQ2xvc2UpIHtcbiAgICAgICAgICAgICAgICBvbkNsaWNrQ2xvc2UoYXR0YWNobWVudCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2Nsb3NlLWJ1dHRvblwiXG4gICAgICAgICAgICB0aXRsZT17aTE4bigncmVtb3ZlLWF0dGFjaG1lbnQnKX1cbiAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3JlbW92ZS1hdHRhY2htZW50Jyl9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICAgIC8qIGVzbGludC1lbmFibGUgbm8tbmVzdGVkLXRlcm5hcnkgKi9cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHdCQUF1QjtBQUN2Qiw0QkFBeUI7QUFFekIscUJBQXdCO0FBR3hCLHdCQUdPO0FBRUEsSUFBSyxZQUFMLGtCQUFLLGVB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
