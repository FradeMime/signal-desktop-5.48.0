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
var Quote_exports = {};
__export(Quote_exports, {
  Quote: () => Quote
});
module.exports = __toCommonJS(Quote_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var MIME = __toESM(require("../../types/MIME"));
var GoogleChrome = __toESM(require("../../util/GoogleChrome"));
var import_MessageBody = require("./MessageBody");
var import_ContactName = require("./ContactName");
var import_Emojify = require("./Emojify");
var import_TextAttachment = require("../TextAttachment");
var import_getTextWithMentions = require("../../util/getTextWithMentions");
var import_getClassNamesFor = require("../../util/getClassNamesFor");
var import_getCustomColorStyle = require("../../util/getCustomColorStyle");
function validateQuote(quote) {
  if (quote.isStoryReply && (quote.referencedMessageNotFound || quote.reactionEmoji)) {
    return true;
  }
  if (quote.isGiftBadge) {
    return true;
  }
  if (quote.text) {
    return true;
  }
  if (quote.rawAttachment) {
    return true;
  }
  return false;
}
function getAttachment(rawAttachment) {
  return rawAttachment && !MIME.isLongMessage(rawAttachment.contentType) ? rawAttachment : void 0;
}
function getUrl(thumbnail) {
  if (!thumbnail) {
    return;
  }
  return thumbnail.objectUrl || thumbnail.url;
}
function getTypeLabel({
  i18n,
  isViewOnce = false,
  contentType,
  isVoiceMessage
}) {
  if (GoogleChrome.isVideoTypeSupported(contentType)) {
    if (isViewOnce) {
      return i18n("message--getDescription--disappearing-video");
    }
    return i18n("video");
  }
  if (GoogleChrome.isImageTypeSupported(contentType)) {
    if (isViewOnce) {
      return i18n("message--getDescription--disappearing-photo");
    }
    return i18n("photo");
  }
  if (isViewOnce) {
    return i18n("message--getDescription--disappearing-media");
  }
  if (MIME.isAudio(contentType) && isVoiceMessage) {
    return i18n("voiceMessage");
  }
  return MIME.isAudio(contentType) ? i18n("audio") : void 0;
}
class Quote extends import_react.default.Component {
  constructor(props) {
    super(props);
    this.handleKeyDown = /* @__PURE__ */ __name((event) => {
      const { onClick } = this.props;
      if (onClick && (event.key === "Enter" || event.key === " ")) {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }
    }, "handleKeyDown");
    this.handleClick = /* @__PURE__ */ __name((event) => {
      const { onClick } = this.props;
      if (onClick) {
        event.preventDefault();
        event.stopPropagation();
        onClick();
      }
    }, "handleClick");
    this.handleImageError = /* @__PURE__ */ __name(() => {
      window.console.info("Message: Image failed to load; failing over to placeholder");
      this.setState({
        imageBroken: true
      });
    }, "handleImageError");
    this.state = {
      imageBroken: false
    };
    this.getClassName = (0, import_getClassNamesFor.getClassNamesFor)("module-quote", props.moduleClassName);
  }
  componentDidMount() {
    const { doubleCheckMissingQuoteReference, referencedMessageNotFound } = this.props;
    if (referencedMessageNotFound) {
      doubleCheckMissingQuoteReference?.();
    }
  }
  renderImage(url, icon, isGiftBadge) {
    const { isIncoming } = this.props;
    const iconElement = icon ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__icon-container__inner")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__icon-container__circle-background")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__icon-container__icon"), this.getClassName(`__icon-container__icon--${icon}`))
    }))) : null;
    return /* @__PURE__ */ import_react.default.createElement(ThumbnailImage, {
      className: (0, import_classnames.default)(this.getClassName("__icon-container"), isIncoming === false && isGiftBadge && this.getClassName("__icon-container__outgoing-gift-badge")),
      src: url,
      onError: this.handleImageError
    }, iconElement);
  }
  renderIcon(icon) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__icon-container")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__icon-container__inner")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__icon-container__circle-background")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__icon-container__icon"), this.getClassName(`__icon-container__icon--${icon}`))
    }))));
  }
  renderGenericFile() {
    const { rawAttachment, isIncoming } = this.props;
    const attachment = getAttachment(rawAttachment);
    if (!attachment) {
      return null;
    }
    const { fileName, contentType, textAttachment } = attachment;
    const isGenericFile = !GoogleChrome.isVideoTypeSupported(contentType) && !GoogleChrome.isImageTypeSupported(contentType) && !textAttachment && !MIME.isAudio(contentType);
    if (!isGenericFile) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__generic-file")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__generic-file__icon")
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__generic-file__text"), isIncoming ? this.getClassName("__generic-file__text--incoming") : null)
    }, fileName));
  }
  renderIconContainer() {
    const { isGiftBadge, isViewOnce, i18n, rawAttachment } = this.props;
    const { imageBroken } = this.state;
    const attachment = getAttachment(rawAttachment);
    if (isGiftBadge) {
      return this.renderImage("images/gift-thumbnail.svg", void 0, true);
    }
    if (!attachment) {
      return null;
    }
    const { contentType, textAttachment, thumbnail } = attachment;
    const url = getUrl(thumbnail);
    if (isViewOnce) {
      return this.renderIcon("view-once");
    }
    if (textAttachment) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: this.getClassName("__icon-container")
      }, /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
        i18n,
        isThumbnail: true,
        textAttachment
      }));
    }
    if (GoogleChrome.isVideoTypeSupported(contentType)) {
      return url && !imageBroken ? this.renderImage(url, "play") : this.renderIcon("movie");
    }
    if (GoogleChrome.isImageTypeSupported(contentType)) {
      return url && !imageBroken ? this.renderImage(url, void 0) : this.renderIcon("image");
    }
    if (MIME.isAudio(contentType)) {
      return this.renderIcon("microphone");
    }
    return null;
  }
  renderText() {
    const {
      bodyRanges,
      isGiftBadge,
      i18n,
      text,
      rawAttachment,
      isIncoming,
      isViewOnce
    } = this.props;
    if (text && !isGiftBadge) {
      const quoteText = bodyRanges ? (0, import_getTextWithMentions.getTextWithMentions)(bodyRanges, text) : text;
      return /* @__PURE__ */ import_react.default.createElement("div", {
        dir: "auto",
        className: (0, import_classnames.default)(this.getClassName("__primary__text"), isIncoming ? this.getClassName("__primary__text--incoming") : null)
      }, /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
        disableLinks: true,
        disableJumbomoji: true,
        text: quoteText,
        i18n
      }));
    }
    const attachment = getAttachment(rawAttachment);
    let typeLabel;
    if (isGiftBadge) {
      typeLabel = i18n("quote--giftBadge");
    } else if (attachment) {
      const { contentType, isVoiceMessage } = attachment;
      typeLabel = getTypeLabel({
        i18n,
        isViewOnce,
        contentType,
        isVoiceMessage
      });
    } else {
      return null;
    }
    if (typeLabel) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)(this.getClassName("__primary__type-label"), isIncoming ? this.getClassName("__primary__type-label--incoming") : null)
      }, typeLabel);
    }
    return null;
  }
  renderClose() {
    const { i18n, onClose } = this.props;
    if (!onClose) {
      return null;
    }
    const clickHandler = /* @__PURE__ */ __name((e) => {
      e.stopPropagation();
      e.preventDefault();
      onClose();
    }, "clickHandler");
    const keyDownHandler = /* @__PURE__ */ __name((e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.stopPropagation();
        e.preventDefault();
        onClose();
      }
    }, "keyDownHandler");
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__close-container")
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      tabIndex: 0,
      role: "button",
      className: this.getClassName("__close-button"),
      "aria-label": i18n("close"),
      onKeyDown: keyDownHandler,
      onClick: clickHandler
    }));
  }
  renderAuthor() {
    const { authorTitle, i18n, isFromMe, isIncoming, isStoryReply } = this.props;
    const title = isFromMe ? i18n("you") : /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      title: authorTitle
    });
    const author = isStoryReply ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, title, " \xB7 ", i18n("Quote__story")) : title;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__primary__author"), isIncoming ? this.getClassName("__primary__author--incoming") : null)
    }, author);
  }
  renderReferenceWarning() {
    const {
      conversationColor,
      customColor,
      i18n,
      isIncoming,
      isStoryReply,
      referencedMessageNotFound
    } = this.props;
    if (!referencedMessageNotFound || isStoryReply) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__reference-warning"), isIncoming ? this.getClassName(`--incoming-${conversationColor}`) : this.getClassName(`--outgoing-${conversationColor}`)),
      style: { ...(0, import_getCustomColorStyle.getCustomColorStyle)(customColor, true) }
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__reference-warning__icon"), isIncoming ? this.getClassName("__reference-warning__icon--incoming") : null)
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(this.getClassName("__reference-warning__text"), isIncoming ? this.getClassName("__reference-warning__text--incoming") : null)
    }, i18n("originalMessageNotFound")));
  }
  render() {
    const {
      conversationColor,
      customColor,
      isCompose,
      isIncoming,
      onClick,
      rawAttachment,
      reactionEmoji,
      referencedMessageNotFound
    } = this.props;
    if (!validateQuote(this.props)) {
      return null;
    }
    let directionClassName;
    if (isCompose) {
      directionClassName = this.getClassName("--compose");
    } else if (isIncoming) {
      directionClassName = this.getClassName("--incoming");
    } else {
      directionClassName = this.getClassName("--outgoing");
    }
    const colorClassName = `${directionClassName}-${conversationColor}`;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__container")
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: this.handleClick,
      onKeyDown: this.handleKeyDown,
      className: (0, import_classnames.default)(this.getClassName(""), directionClassName, colorClassName, !onClick && this.getClassName("--no-click"), referencedMessageNotFound && this.getClassName("--with-reference-warning")),
      style: { ...(0, import_getCustomColorStyle.getCustomColorStyle)(customColor, true) }
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: this.getClassName("__primary")
    }, this.renderAuthor(), this.renderGenericFile(), this.renderText()), reactionEmoji && /* @__PURE__ */ import_react.default.createElement("div", {
      className: rawAttachment ? this.getClassName("__reaction-emoji") : this.getClassName("__reaction-emoji--story-unavailable")
    }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
      text: reactionEmoji
    })), this.renderIconContainer(), this.renderClose()), this.renderReferenceWarning());
  }
}
function ThumbnailImage({
  className,
  src,
  onError,
  children
}) {
  const imageRef = (0, import_react.useRef)(new Image());
  const [loadedSrc, setLoadedSrc] = (0, import_react.useState)(null);
  (0, import_react.useEffect)(() => {
    const image = new Image();
    image.onload = () => {
      setLoadedSrc(src);
    };
    image.src = src;
    imageRef.current = image;
    return () => {
      image.onload = import_lodash.noop;
    };
  }, [src]);
  (0, import_react.useEffect)(() => {
    setLoadedSrc(null);
  }, [src]);
  (0, import_react.useEffect)(() => {
    const image = imageRef.current;
    image.onerror = onError;
    return () => {
      image.onerror = import_lodash.noop;
    };
  }, [onError]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className,
    style: loadedSrc ? { backgroundImage: `url('${encodeURI(loadedSrc)}')` } : {}
  }, children);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Quote
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUXVvdGUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcblxuaW1wb3J0ICogYXMgTUlNRSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCAqIGFzIEdvb2dsZUNocm9tZSBmcm9tICcuLi8uLi91dGlsL0dvb2dsZUNocm9tZSc7XG5cbmltcG9ydCB7IE1lc3NhZ2VCb2R5IH0gZnJvbSAnLi9NZXNzYWdlQm9keSc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlLCBUaHVtYm5haWxUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IEJvZHlSYW5nZXNUeXBlLCBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvbkNvbG9yVHlwZSxcbiAgQ3VzdG9tQ29sb3JUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL0Vtb2ppZnknO1xuaW1wb3J0IHsgVGV4dEF0dGFjaG1lbnQgfSBmcm9tICcuLi9UZXh0QXR0YWNobWVudCc7XG5pbXBvcnQgeyBnZXRUZXh0V2l0aE1lbnRpb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRUZXh0V2l0aE1lbnRpb25zJztcbmltcG9ydCB7IGdldENsYXNzTmFtZXNGb3IgfSBmcm9tICcuLi8uLi91dGlsL2dldENsYXNzTmFtZXNGb3InO1xuaW1wb3J0IHsgZ2V0Q3VzdG9tQ29sb3JTdHlsZSB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0Q3VzdG9tQ29sb3JTdHlsZSc7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICBhdXRob3JUaXRsZTogc3RyaW5nO1xuICBjb252ZXJzYXRpb25Db2xvcjogQ29udmVyc2F0aW9uQ29sb3JUeXBlO1xuICBjdXN0b21Db2xvcj86IEN1c3RvbUNvbG9yVHlwZTtcbiAgYm9keVJhbmdlcz86IEJvZHlSYW5nZXNUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc0Zyb21NZTogYm9vbGVhbjtcbiAgaXNJbmNvbWluZz86IGJvb2xlYW47XG4gIGlzQ29tcG9zZT86IGJvb2xlYW47XG4gIGlzU3RvcnlSZXBseT86IGJvb2xlYW47XG4gIG1vZHVsZUNsYXNzTmFtZT86IHN0cmluZztcbiAgb25DbGljaz86ICgpID0+IHZvaWQ7XG4gIG9uQ2xvc2U/OiAoKSA9PiB2b2lkO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHJhd0F0dGFjaG1lbnQ/OiBRdW90ZWRBdHRhY2htZW50VHlwZTtcbiAgaXNHaWZ0QmFkZ2U6IGJvb2xlYW47XG4gIGlzVmlld09uY2U6IGJvb2xlYW47XG4gIHJlYWN0aW9uRW1vamk/OiBzdHJpbmc7XG4gIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGJvb2xlYW47XG4gIGRvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlPzogKCkgPT4gdW5rbm93bjtcbn07XG5cbnR5cGUgU3RhdGUgPSB7XG4gIGltYWdlQnJva2VuOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgUXVvdGVkQXR0YWNobWVudFR5cGUgPSBQaWNrPFxuICBBdHRhY2htZW50VHlwZSxcbiAgJ2NvbnRlbnRUeXBlJyB8ICdmaWxlTmFtZScgfCAnaXNWb2ljZU1lc3NhZ2UnIHwgJ3RodW1ibmFpbCcgfCAndGV4dEF0dGFjaG1lbnQnXG4+O1xuXG5mdW5jdGlvbiB2YWxpZGF0ZVF1b3RlKHF1b3RlOiBQcm9wcyk6IGJvb2xlYW4ge1xuICBpZiAoXG4gICAgcXVvdGUuaXNTdG9yeVJlcGx5ICYmXG4gICAgKHF1b3RlLnJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQgfHwgcXVvdGUucmVhY3Rpb25FbW9qaSlcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAocXVvdGUuaXNHaWZ0QmFkZ2UpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChxdW90ZS50ZXh0KSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAocXVvdGUucmF3QXR0YWNobWVudCkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG4vLyBMb25nIG1lc3NhZ2UgYXR0YWNobWVudHMgc2hvdWxkIG5vdCBiZSBzaG93bi5cbmZ1bmN0aW9uIGdldEF0dGFjaG1lbnQoXG4gIHJhd0F0dGFjaG1lbnQ6IHVuZGVmaW5lZCB8IFF1b3RlZEF0dGFjaG1lbnRUeXBlXG4pOiB1bmRlZmluZWQgfCBRdW90ZWRBdHRhY2htZW50VHlwZSB7XG4gIHJldHVybiByYXdBdHRhY2htZW50ICYmICFNSU1FLmlzTG9uZ01lc3NhZ2UocmF3QXR0YWNobWVudC5jb250ZW50VHlwZSlcbiAgICA/IHJhd0F0dGFjaG1lbnRcbiAgICA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gZ2V0VXJsKHRodW1ibmFpbD86IFRodW1ibmFpbFR5cGUpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoIXRodW1ibmFpbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHJldHVybiB0aHVtYm5haWwub2JqZWN0VXJsIHx8IHRodW1ibmFpbC51cmw7XG59XG5cbmZ1bmN0aW9uIGdldFR5cGVMYWJlbCh7XG4gIGkxOG4sXG4gIGlzVmlld09uY2UgPSBmYWxzZSxcbiAgY29udGVudFR5cGUsXG4gIGlzVm9pY2VNZXNzYWdlLFxufToge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc1ZpZXdPbmNlPzogYm9vbGVhbjtcbiAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gIGlzVm9pY2VNZXNzYWdlPzogYm9vbGVhbjtcbn0pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBpZiAoR29vZ2xlQ2hyb21lLmlzVmlkZW9UeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKSkge1xuICAgIGlmIChpc1ZpZXdPbmNlKSB7XG4gICAgICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0RGVzY3JpcHRpb24tLWRpc2FwcGVhcmluZy12aWRlbycpO1xuICAgIH1cbiAgICByZXR1cm4gaTE4bigndmlkZW8nKTtcbiAgfVxuICBpZiAoR29vZ2xlQ2hyb21lLmlzSW1hZ2VUeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKSkge1xuICAgIGlmIChpc1ZpZXdPbmNlKSB7XG4gICAgICByZXR1cm4gaTE4bignbWVzc2FnZS0tZ2V0RGVzY3JpcHRpb24tLWRpc2FwcGVhcmluZy1waG90bycpO1xuICAgIH1cbiAgICByZXR1cm4gaTE4bigncGhvdG8nKTtcbiAgfVxuXG4gIGlmIChpc1ZpZXdPbmNlKSB7XG4gICAgcmV0dXJuIGkxOG4oJ21lc3NhZ2UtLWdldERlc2NyaXB0aW9uLS1kaXNhcHBlYXJpbmctbWVkaWEnKTtcbiAgfVxuXG4gIGlmIChNSU1FLmlzQXVkaW8oY29udGVudFR5cGUpICYmIGlzVm9pY2VNZXNzYWdlKSB7XG4gICAgcmV0dXJuIGkxOG4oJ3ZvaWNlTWVzc2FnZScpO1xuICB9XG5cbiAgcmV0dXJuIE1JTUUuaXNBdWRpbyhjb250ZW50VHlwZSkgPyBpMThuKCdhdWRpbycpIDogdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgY2xhc3MgUXVvdGUgZXh0ZW5kcyBSZWFjdC5Db21wb25lbnQ8UHJvcHMsIFN0YXRlPiB7XG4gIHByaXZhdGUgZ2V0Q2xhc3NOYW1lOiAobW9kaWZpZXI/OiBzdHJpbmcpID0+IHN0cmluZztcblxuICBjb25zdHJ1Y3Rvcihwcm9wczogUHJvcHMpIHtcbiAgICBzdXBlcihwcm9wcyk7XG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIGltYWdlQnJva2VuOiBmYWxzZSxcbiAgICB9O1xuICAgIHRoaXMuZ2V0Q2xhc3NOYW1lID0gZ2V0Q2xhc3NOYW1lc0ZvcignbW9kdWxlLXF1b3RlJywgcHJvcHMubW9kdWxlQ2xhc3NOYW1lKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UsIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQpIHtcbiAgICAgIGRvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlPy4oKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlS2V5RG93biA9IChcbiAgICBldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MQnV0dG9uRWxlbWVudD5cbiAgKTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBvbkNsaWNrIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gVGhpcyBpcyBpbXBvcnRhbnQgdG8gZW5zdXJlIHRoYXQgdXNpbmcgdGhpcyBxdW90ZSB0byBuYXZpZ2F0ZSB0byB0aGUgcmVmZXJlbmNlZFxuICAgIC8vICAgbWVzc2FnZSBkb2Vzbid0IGFsc28gdHJpZ2dlciBpdHMgcGFyZW50IG1lc3NhZ2UncyBrZXlkb3duLlxuICAgIGlmIChvbkNsaWNrICYmIChldmVudC5rZXkgPT09ICdFbnRlcicgfHwgZXZlbnQua2V5ID09PSAnICcpKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICBvbkNsaWNrKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVDbGljayA9IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IG9uQ2xpY2sgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAob25DbGljaykge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgb25DbGljaygpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlSW1hZ2VFcnJvciA9ICgpOiB2b2lkID0+IHtcbiAgICB3aW5kb3cuY29uc29sZS5pbmZvKFxuICAgICAgJ01lc3NhZ2U6IEltYWdlIGZhaWxlZCB0byBsb2FkOyBmYWlsaW5nIG92ZXIgdG8gcGxhY2Vob2xkZXInXG4gICAgKTtcbiAgICB0aGlzLnNldFN0YXRlKHtcbiAgICAgIGltYWdlQnJva2VuOiB0cnVlLFxuICAgIH0pO1xuICB9O1xuXG4gIHB1YmxpYyByZW5kZXJJbWFnZShcbiAgICB1cmw6IHN0cmluZyxcbiAgICBpY29uOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgaXNHaWZ0QmFkZ2U/OiBib29sZWFuXG4gICk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7IGlzSW5jb21pbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgaWNvbkVsZW1lbnQgPSBpY29uID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lKCdfX2ljb24tY29udGFpbmVyX19pbm5lcicpfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoJ19faWNvbi1jb250YWluZXJfX2NpcmNsZS1iYWNrZ3JvdW5kJyl9XG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX2ljb24tY29udGFpbmVyX19pY29uJyksXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKGBfX2ljb24tY29udGFpbmVyX19pY29uLS0ke2ljb259YClcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8VGh1bWJuYWlsSW1hZ2VcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX2ljb24tY29udGFpbmVyJyksXG4gICAgICAgICAgaXNJbmNvbWluZyA9PT0gZmFsc2UgJiZcbiAgICAgICAgICAgIGlzR2lmdEJhZGdlICYmXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTmFtZSgnX19pY29uLWNvbnRhaW5lcl9fb3V0Z29pbmctZ2lmdC1iYWRnZScpXG4gICAgICAgICl9XG4gICAgICAgIHNyYz17dXJsfVxuICAgICAgICBvbkVycm9yPXt0aGlzLmhhbmRsZUltYWdlRXJyb3J9XG4gICAgICA+XG4gICAgICAgIHtpY29uRWxlbWVudH1cbiAgICAgIDwvVGh1bWJuYWlsSW1hZ2U+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJJY29uKGljb246IHN0cmluZyk6IEpTWC5FbGVtZW50IHtcbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e3RoaXMuZ2V0Q2xhc3NOYW1lKCdfX2ljb24tY29udGFpbmVyJyl9PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoJ19faWNvbi1jb250YWluZXJfX2lubmVyJyl9PlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoJ19faWNvbi1jb250YWluZXJfX2NpcmNsZS1iYWNrZ3JvdW5kJyl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgdGhpcy5nZXRDbGFzc05hbWUoJ19faWNvbi1jb250YWluZXJfX2ljb24nKSxcbiAgICAgICAgICAgICAgICB0aGlzLmdldENsYXNzTmFtZShgX19pY29uLWNvbnRhaW5lcl9faWNvbi0tJHtpY29ufWApXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyR2VuZXJpY0ZpbGUoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7IHJhd0F0dGFjaG1lbnQsIGlzSW5jb21pbmcgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgYXR0YWNobWVudCA9IGdldEF0dGFjaG1lbnQocmF3QXR0YWNobWVudCk7XG5cbiAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgZmlsZU5hbWUsIGNvbnRlbnRUeXBlLCB0ZXh0QXR0YWNobWVudCB9ID0gYXR0YWNobWVudDtcbiAgICBjb25zdCBpc0dlbmVyaWNGaWxlID1cbiAgICAgICFHb29nbGVDaHJvbWUuaXNWaWRlb1R5cGVTdXBwb3J0ZWQoY29udGVudFR5cGUpICYmXG4gICAgICAhR29vZ2xlQ2hyb21lLmlzSW1hZ2VUeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKSAmJlxuICAgICAgIXRleHRBdHRhY2htZW50ICYmXG4gICAgICAhTUlNRS5pc0F1ZGlvKGNvbnRlbnRUeXBlKTtcblxuICAgIGlmICghaXNHZW5lcmljRmlsZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgnX19nZW5lcmljLWZpbGUnKX0+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgnX19nZW5lcmljLWZpbGVfX2ljb24nKX0gLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX2dlbmVyaWMtZmlsZV9fdGV4dCcpLFxuICAgICAgICAgICAgaXNJbmNvbWluZ1xuICAgICAgICAgICAgICA/IHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX2dlbmVyaWMtZmlsZV9fdGV4dC0taW5jb21pbmcnKVxuICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICApfVxuICAgICAgICA+XG4gICAgICAgICAge2ZpbGVOYW1lfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVySWNvbkNvbnRhaW5lcigpOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHsgaXNHaWZ0QmFkZ2UsIGlzVmlld09uY2UsIGkxOG4sIHJhd0F0dGFjaG1lbnQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpbWFnZUJyb2tlbiB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBhdHRhY2htZW50ID0gZ2V0QXR0YWNobWVudChyYXdBdHRhY2htZW50KTtcblxuICAgIGlmIChpc0dpZnRCYWRnZSkge1xuICAgICAgcmV0dXJuIHRoaXMucmVuZGVySW1hZ2UoJ2ltYWdlcy9naWZ0LXRodW1ibmFpbC5zdmcnLCB1bmRlZmluZWQsIHRydWUpO1xuICAgIH1cblxuICAgIGlmICghYXR0YWNobWVudCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBjb250ZW50VHlwZSwgdGV4dEF0dGFjaG1lbnQsIHRodW1ibmFpbCB9ID0gYXR0YWNobWVudDtcbiAgICBjb25zdCB1cmwgPSBnZXRVcmwodGh1bWJuYWlsKTtcblxuICAgIGlmIChpc1ZpZXdPbmNlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJJY29uKCd2aWV3LW9uY2UnKTtcbiAgICB9XG5cbiAgICBpZiAodGV4dEF0dGFjaG1lbnQpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgnX19pY29uLWNvbnRhaW5lcicpfT5cbiAgICAgICAgICA8VGV4dEF0dGFjaG1lbnRcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpc1RodW1ibmFpbFxuICAgICAgICAgICAgdGV4dEF0dGFjaG1lbnQ9e3RleHRBdHRhY2htZW50fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoR29vZ2xlQ2hyb21lLmlzVmlkZW9UeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKSkge1xuICAgICAgcmV0dXJuIHVybCAmJiAhaW1hZ2VCcm9rZW5cbiAgICAgICAgPyB0aGlzLnJlbmRlckltYWdlKHVybCwgJ3BsYXknKVxuICAgICAgICA6IHRoaXMucmVuZGVySWNvbignbW92aWUnKTtcbiAgICB9XG4gICAgaWYgKEdvb2dsZUNocm9tZS5pc0ltYWdlVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybiB1cmwgJiYgIWltYWdlQnJva2VuXG4gICAgICAgID8gdGhpcy5yZW5kZXJJbWFnZSh1cmwsIHVuZGVmaW5lZClcbiAgICAgICAgOiB0aGlzLnJlbmRlckljb24oJ2ltYWdlJyk7XG4gICAgfVxuICAgIGlmIChNSU1FLmlzQXVkaW8oY29udGVudFR5cGUpKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJJY29uKCdtaWNyb3Bob25lJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyVGV4dCgpOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHtcbiAgICAgIGJvZHlSYW5nZXMsXG4gICAgICBpc0dpZnRCYWRnZSxcbiAgICAgIGkxOG4sXG4gICAgICB0ZXh0LFxuICAgICAgcmF3QXR0YWNobWVudCxcbiAgICAgIGlzSW5jb21pbmcsXG4gICAgICBpc1ZpZXdPbmNlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHRleHQgJiYgIWlzR2lmdEJhZGdlKSB7XG4gICAgICBjb25zdCBxdW90ZVRleHQgPSBib2R5UmFuZ2VzXG4gICAgICAgID8gZ2V0VGV4dFdpdGhNZW50aW9ucyhib2R5UmFuZ2VzLCB0ZXh0KVxuICAgICAgICA6IHRleHQ7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBkaXI9XCJhdXRvXCJcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTmFtZSgnX19wcmltYXJ5X190ZXh0JyksXG4gICAgICAgICAgICBpc0luY29taW5nID8gdGhpcy5nZXRDbGFzc05hbWUoJ19fcHJpbWFyeV9fdGV4dC0taW5jb21pbmcnKSA6IG51bGxcbiAgICAgICAgICApfVxuICAgICAgICA+XG4gICAgICAgICAgPE1lc3NhZ2VCb2R5XG4gICAgICAgICAgICBkaXNhYmxlTGlua3NcbiAgICAgICAgICAgIGRpc2FibGVKdW1ib21vamlcbiAgICAgICAgICAgIHRleHQ9e3F1b3RlVGV4dH1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBnZXRBdHRhY2htZW50KHJhd0F0dGFjaG1lbnQpO1xuXG4gICAgbGV0IHR5cGVMYWJlbDtcblxuICAgIGlmIChpc0dpZnRCYWRnZSkge1xuICAgICAgdHlwZUxhYmVsID0gaTE4bigncXVvdGUtLWdpZnRCYWRnZScpO1xuICAgIH0gZWxzZSBpZiAoYXR0YWNobWVudCkge1xuICAgICAgY29uc3QgeyBjb250ZW50VHlwZSwgaXNWb2ljZU1lc3NhZ2UgfSA9IGF0dGFjaG1lbnQ7XG4gICAgICB0eXBlTGFiZWwgPSBnZXRUeXBlTGFiZWwoe1xuICAgICAgICBpMThuLFxuICAgICAgICBpc1ZpZXdPbmNlLFxuICAgICAgICBjb250ZW50VHlwZSxcbiAgICAgICAgaXNWb2ljZU1lc3NhZ2UsXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgaWYgKHR5cGVMYWJlbCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3ByaW1hcnlfX3R5cGUtbGFiZWwnKSxcbiAgICAgICAgICAgIGlzSW5jb21pbmdcbiAgICAgICAgICAgICAgPyB0aGlzLmdldENsYXNzTmFtZSgnX19wcmltYXJ5X190eXBlLWxhYmVsLS1pbmNvbWluZycpXG4gICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICB7dHlwZUxhYmVsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyQ2xvc2UoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7IGkxOG4sIG9uQ2xvc2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIW9uQ2xvc2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNsaWNrSGFuZGxlciA9IChlOiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICBvbkNsb3NlKCk7XG4gICAgfTtcbiAgICBjb25zdCBrZXlEb3duSGFuZGxlciA9IChlOiBSZWFjdC5LZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicgfHwgZS5rZXkgPT09ICcgJykge1xuICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgb25DbG9zZSgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICAvLyBXZSBuZWVkIHRoZSBjb250YWluZXIgdG8gZ2l2ZSB1cyB0aGUgZmxleGliaWxpdHkgdG8gaW1wbGVtZW50IHRoZSBpT1MgZGVzaWduLlxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoJ19fY2xvc2UtY29udGFpbmVyJyl9PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgdGFiSW5kZXg9ezB9XG4gICAgICAgICAgLy8gV2UgY2FuJ3QgYmUgYSBidXR0b24gYmVjYXVzZSB0aGUgb3ZlcmFsbCBxdW90ZSBpcyBhIGJ1dHRvbjsgY2FuJ3QgbmVzdCB0aGVtXG4gICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgnX19jbG9zZS1idXR0b24nKX1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgIG9uS2V5RG93bj17a2V5RG93bkhhbmRsZXJ9XG4gICAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJBdXRob3IoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHsgYXV0aG9yVGl0bGUsIGkxOG4sIGlzRnJvbU1lLCBpc0luY29taW5nLCBpc1N0b3J5UmVwbHkgfSA9XG4gICAgICB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgdGl0bGUgPSBpc0Zyb21NZSA/IGkxOG4oJ3lvdScpIDogPENvbnRhY3ROYW1lIHRpdGxlPXthdXRob3JUaXRsZX0gLz47XG4gICAgY29uc3QgYXV0aG9yID0gaXNTdG9yeVJlcGx5ID8gKFxuICAgICAgPD5cbiAgICAgICAge3RpdGxlfSAmbWlkZG90OyB7aTE4bignUXVvdGVfX3N0b3J5Jyl9XG4gICAgICA8Lz5cbiAgICApIDogKFxuICAgICAgdGl0bGVcbiAgICApO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3ByaW1hcnlfX2F1dGhvcicpLFxuICAgICAgICAgIGlzSW5jb21pbmcgPyB0aGlzLmdldENsYXNzTmFtZSgnX19wcmltYXJ5X19hdXRob3ItLWluY29taW5nJykgOiBudWxsXG4gICAgICAgICl9XG4gICAgICA+XG4gICAgICAgIHthdXRob3J9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclJlZmVyZW5jZVdhcm5pbmcoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7XG4gICAgICBjb252ZXJzYXRpb25Db2xvcixcbiAgICAgIGN1c3RvbUNvbG9yLFxuICAgICAgaTE4bixcbiAgICAgIGlzSW5jb21pbmcsXG4gICAgICBpc1N0b3J5UmVwbHksXG4gICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFyZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kIHx8IGlzU3RvcnlSZXBseSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3JlZmVyZW5jZS13YXJuaW5nJyksXG4gICAgICAgICAgaXNJbmNvbWluZ1xuICAgICAgICAgICAgPyB0aGlzLmdldENsYXNzTmFtZShgLS1pbmNvbWluZy0ke2NvbnZlcnNhdGlvbkNvbG9yfWApXG4gICAgICAgICAgICA6IHRoaXMuZ2V0Q2xhc3NOYW1lKGAtLW91dGdvaW5nLSR7Y29udmVyc2F0aW9uQ29sb3J9YClcbiAgICAgICAgKX1cbiAgICAgICAgc3R5bGU9e3sgLi4uZ2V0Q3VzdG9tQ29sb3JTdHlsZShjdXN0b21Db2xvciwgdHJ1ZSkgfX1cbiAgICAgID5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3JlZmVyZW5jZS13YXJuaW5nX19pY29uJyksXG4gICAgICAgICAgICBpc0luY29taW5nXG4gICAgICAgICAgICAgID8gdGhpcy5nZXRDbGFzc05hbWUoJ19fcmVmZXJlbmNlLXdhcm5pbmdfX2ljb24tLWluY29taW5nJylcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3JlZmVyZW5jZS13YXJuaW5nX190ZXh0JyksXG4gICAgICAgICAgICBpc0luY29taW5nXG4gICAgICAgICAgICAgID8gdGhpcy5nZXRDbGFzc05hbWUoJ19fcmVmZXJlbmNlLXdhcm5pbmdfX3RleHQtLWluY29taW5nJylcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKCdvcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZCcpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qge1xuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGlzQ29tcG9zZSxcbiAgICAgIGlzSW5jb21pbmcsXG4gICAgICBvbkNsaWNrLFxuICAgICAgcmF3QXR0YWNobWVudCxcbiAgICAgIHJlYWN0aW9uRW1vamksXG4gICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCF2YWxpZGF0ZVF1b3RlKHRoaXMucHJvcHMpKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBsZXQgZGlyZWN0aW9uQ2xhc3NOYW1lOiBzdHJpbmc7XG4gICAgaWYgKGlzQ29tcG9zZSkge1xuICAgICAgZGlyZWN0aW9uQ2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoJy0tY29tcG9zZScpO1xuICAgIH0gZWxzZSBpZiAoaXNJbmNvbWluZykge1xuICAgICAgZGlyZWN0aW9uQ2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoJy0taW5jb21pbmcnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGlyZWN0aW9uQ2xhc3NOYW1lID0gdGhpcy5nZXRDbGFzc05hbWUoJy0tb3V0Z29pbmcnKTtcbiAgICB9XG4gICAgY29uc3QgY29sb3JDbGFzc05hbWUgPSBgJHtkaXJlY3Rpb25DbGFzc05hbWV9LSR7Y29udmVyc2F0aW9uQ29sb3J9YDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17dGhpcy5nZXRDbGFzc05hbWUoJ19fY29udGFpbmVyJyl9PlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICBvbktleURvd249e3RoaXMuaGFuZGxlS2V5RG93bn1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICB0aGlzLmdldENsYXNzTmFtZSgnJyksXG4gICAgICAgICAgICBkaXJlY3Rpb25DbGFzc05hbWUsXG4gICAgICAgICAgICBjb2xvckNsYXNzTmFtZSxcbiAgICAgICAgICAgICFvbkNsaWNrICYmIHRoaXMuZ2V0Q2xhc3NOYW1lKCctLW5vLWNsaWNrJyksXG4gICAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kICYmXG4gICAgICAgICAgICAgIHRoaXMuZ2V0Q2xhc3NOYW1lKCctLXdpdGgtcmVmZXJlbmNlLXdhcm5pbmcnKVxuICAgICAgICAgICl9XG4gICAgICAgICAgc3R5bGU9e3sgLi4uZ2V0Q3VzdG9tQ29sb3JTdHlsZShjdXN0b21Db2xvciwgdHJ1ZSkgfX1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXt0aGlzLmdldENsYXNzTmFtZSgnX19wcmltYXJ5Jyl9PlxuICAgICAgICAgICAge3RoaXMucmVuZGVyQXV0aG9yKCl9XG4gICAgICAgICAgICB7dGhpcy5yZW5kZXJHZW5lcmljRmlsZSgpfVxuICAgICAgICAgICAge3RoaXMucmVuZGVyVGV4dCgpfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtyZWFjdGlvbkVtb2ppICYmIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtcbiAgICAgICAgICAgICAgICByYXdBdHRhY2htZW50XG4gICAgICAgICAgICAgICAgICA/IHRoaXMuZ2V0Q2xhc3NOYW1lKCdfX3JlYWN0aW9uLWVtb2ppJylcbiAgICAgICAgICAgICAgICAgIDogdGhpcy5nZXRDbGFzc05hbWUoJ19fcmVhY3Rpb24tZW1vamktLXN0b3J5LXVuYXZhaWxhYmxlJylcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICA8RW1vamlmeSB0ZXh0PXtyZWFjdGlvbkVtb2ppfSAvPlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJJY29uQ29udGFpbmVyKCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyQ2xvc2UoKX1cbiAgICAgICAgPC9idXR0b24+XG4gICAgICAgIHt0aGlzLnJlbmRlclJlZmVyZW5jZVdhcm5pbmcoKX1cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cbn1cblxuZnVuY3Rpb24gVGh1bWJuYWlsSW1hZ2Uoe1xuICBjbGFzc05hbWUsXG4gIHNyYyxcbiAgb25FcnJvcixcbiAgY2hpbGRyZW4sXG59OiBSZWFkb25seTx7XG4gIGNsYXNzTmFtZTogc3RyaW5nO1xuICBzcmM6IHN0cmluZztcbiAgb25FcnJvcjogKCkgPT4gdm9pZDtcbiAgY2hpbGRyZW46IFJlYWN0Tm9kZTtcbn0+KTogSlNYLkVsZW1lbnQge1xuICBjb25zdCBpbWFnZVJlZiA9IHVzZVJlZihuZXcgSW1hZ2UoKSk7XG4gIGNvbnN0IFtsb2FkZWRTcmMsIHNldExvYWRlZFNyY10gPSB1c2VTdGF0ZTxudWxsIHwgc3RyaW5nPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGltYWdlID0gbmV3IEltYWdlKCk7XG4gICAgaW1hZ2Uub25sb2FkID0gKCkgPT4ge1xuICAgICAgc2V0TG9hZGVkU3JjKHNyYyk7XG4gICAgfTtcbiAgICBpbWFnZS5zcmMgPSBzcmM7XG4gICAgaW1hZ2VSZWYuY3VycmVudCA9IGltYWdlO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbWFnZS5vbmxvYWQgPSBub29wO1xuICAgIH07XG4gIH0sIFtzcmNdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldExvYWRlZFNyYyhudWxsKTtcbiAgfSwgW3NyY10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBpbWFnZVJlZi5jdXJyZW50O1xuICAgIGltYWdlLm9uZXJyb3IgPSBvbkVycm9yO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBpbWFnZS5vbmVycm9yID0gbm9vcDtcbiAgICB9O1xuICB9LCBbb25FcnJvcl0pO1xuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICBzdHlsZT17XG4gICAgICAgIGxvYWRlZFNyYyA/IHsgYmFja2dyb3VuZEltYWdlOiBgdXJsKCcke2VuY29kZVVSSShsb2FkZWRTcmMpfScpYCB9IDoge31cbiAgICAgIH1cbiAgICA+XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQW1EO0FBQ25ELG9CQUFxQjtBQUNyQix3QkFBdUI7QUFFdkIsV0FBc0I7QUFDdEIsbUJBQThCO0FBRTlCLHlCQUE0QjtBQU81Qix5QkFBNEI7QUFDNUIscUJBQXdCO0FBQ3hCLDRCQUErQjtBQUMvQixpQ0FBb0M7QUFDcEMsOEJBQWlDO0FBQ2pDLGlDQUFvQztBQWlDcEMsdUJBQXVCLE9BQXVCO0FBQzVDLE1BQ0UsTUFBTSxnQkFDTCxPQUFNLDZCQUE2QixNQUFNLGdCQUMxQztBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNLGFBQWE7QUFDckIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLE1BQU0sTUFBTTtBQUNkLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNLGVBQWU7QUFDdkIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxTQUFPO0FBQ1Q7QUFyQlMsQUF3QlQsdUJBQ0UsZUFDa0M7QUFDbEMsU0FBTyxpQkFBaUIsQ0FBQyxLQUFLLGNBQWMsY0FBYyxXQUFXLElBQ2pFLGdCQUNBO0FBQ047QUFOUyxBQVFULGdCQUFnQixXQUErQztBQUM3RCxNQUFJLENBQUMsV0FBVztBQUNkO0FBQUEsRUFDRjtBQUVBLFNBQU8sVUFBVSxhQUFhLFVBQVU7QUFDMUM7QUFOUyxBQVFULHNCQUFzQjtBQUFBLEVBQ3BCO0FBQUEsRUFDQSxhQUFhO0FBQUEsRUFDYjtBQUFBLEVBQ0E7QUFBQSxHQU1xQjtBQUNyQixNQUFJLGFBQWEscUJBQXFCLFdBQVcsR0FBRztBQUNsRCxRQUFJLFlBQVk7QUFDZCxhQUFPLEtBQUssNkNBQTZDO0FBQUEsSUFDM0Q7QUFDQSxXQUFPLEtBQUss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
