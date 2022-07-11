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
var TextAttachment_exports = {};
__export(TextAttachment_exports, {
  TextAttachment: () => TextAttachment
});
module.exports = __toCommonJS(TextAttachment_exports);
var import_react_measure = __toESM(require("react-measure"));
var import_react = __toESM(require("react"));
var import_react_textarea_autosize = __toESM(require("react-textarea-autosize"));
var import_classnames = __toESM(require("classnames"));
var import_AddNewLines = require("./conversation/AddNewLines");
var import_Emojify = require("./conversation/Emojify");
var import_StagedLinkPreview = require("./conversation/StagedLinkPreview");
var import_Attachment = require("../types/Attachment");
var import_grapheme = require("../util/grapheme");
var import_LinkPreview = require("../types/LinkPreview");
var import_getFontNameByTextScript = require("../util/getFontNameByTextScript");
var import_getStoryBackground = require("../util/getStoryBackground");
const renderNewLines = /* @__PURE__ */ __name(({
  text: textWithNewLines,
  key
}) => {
  return /* @__PURE__ */ import_react.default.createElement(import_AddNewLines.AddNewLines, {
    key,
    text: textWithNewLines
  });
}, "renderNewLines");
const CHAR_LIMIT_TEXT_LARGE = 50;
const CHAR_LIMIT_TEXT_MEDIUM = 200;
const FONT_SIZE_LARGE = 64;
const FONT_SIZE_MEDIUM = 42;
const FONT_SIZE_SMALL = 32;
var TextSize = /* @__PURE__ */ ((TextSize2) => {
  TextSize2[TextSize2["Small"] = 0] = "Small";
  TextSize2[TextSize2["Medium"] = 1] = "Medium";
  TextSize2[TextSize2["Large"] = 2] = "Large";
  return TextSize2;
})(TextSize || {});
function getTextSize(text) {
  const length = (0, import_grapheme.count)(text);
  if (length < CHAR_LIMIT_TEXT_LARGE) {
    return 2 /* Large */;
  }
  if (length < CHAR_LIMIT_TEXT_MEDIUM) {
    return 1 /* Medium */;
  }
  return 0 /* Small */;
}
function getFont(text, textSize, textStyle, i18n) {
  const textStyleIndex = Number(textStyle) || 0;
  const fontName = (0, import_getFontNameByTextScript.getFontNameByTextScript)(text, textStyleIndex, i18n);
  let fontSize = FONT_SIZE_SMALL;
  switch (textSize) {
    case 2 /* Large */:
      fontSize = FONT_SIZE_LARGE;
      break;
    case 1 /* Medium */:
      fontSize = FONT_SIZE_MEDIUM;
      break;
    default:
      fontSize = FONT_SIZE_SMALL;
  }
  const fontWeight = textStyle === import_Attachment.TextAttachmentStyleType.BOLD ? "bold " : "";
  return `${fontWeight}${fontSize}pt ${fontName}`;
}
function getTextStyles(textContent, textForegroundColor, textStyle, i18n) {
  return {
    color: (0, import_getStoryBackground.getHexFromNumber)(textForegroundColor || import_getStoryBackground.COLOR_WHITE_INT),
    font: getFont(textContent, getTextSize(textContent), textStyle, i18n),
    textAlign: getTextSize(textContent) === 0 /* Small */ ? "left" : "center"
  };
}
const TextAttachment = /* @__PURE__ */ __name(({
  i18n,
  isEditingText,
  isThumbnail,
  onChange,
  textAttachment
}) => {
  const linkPreview = (0, import_react.useRef)(null);
  const [linkPreviewOffsetTop, setLinkPreviewOffsetTop] = (0, import_react.useState)();
  const textContent = textAttachment.text || "";
  const textEditorRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const node = textEditorRef.current;
    if (!node) {
      return;
    }
    node.focus();
    node.setSelectionRange(node.value.length, node.value.length);
  }, [isEditingText]);
  return /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true
  }, ({ contentRect, measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment",
    onClick: () => {
      if (linkPreviewOffsetTop) {
        setLinkPreviewOffsetTop(void 0);
      }
    },
    onKeyUp: (ev) => {
      if (ev.key === "Escape" && linkPreviewOffsetTop) {
        setLinkPreviewOffsetTop(void 0);
      }
    },
    ref: measureRef
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment__story",
    style: {
      background: (0, import_getStoryBackground.getBackgroundColor)(textAttachment),
      transform: `scale(${(contentRect.bounds?.height || 1) / 1280})`
    }
  }, (textContent || onChange) && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment__text",
    style: {
      backgroundColor: textAttachment.textBackgroundColor ? (0, import_getStoryBackground.getHexFromNumber)(textAttachment.textBackgroundColor) : "transparent"
    }
  }, onChange ? /* @__PURE__ */ import_react.default.createElement(import_react_textarea_autosize.default, {
    className: "TextAttachment__text__container TextAttachment__text__textarea",
    disabled: !isEditingText,
    onChange: (ev) => onChange(ev.currentTarget.value),
    placeholder: i18n("TextAttachment__placeholder"),
    ref: textEditorRef,
    style: getTextStyles(textContent, textAttachment.textForegroundColor, textAttachment.textStyle, i18n),
    value: textContent
  }) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment__text__container",
    style: getTextStyles(textContent, textAttachment.textForegroundColor, textAttachment.textStyle, i18n)
  }, /* @__PURE__ */ import_react.default.createElement(import_Emojify.Emojify, {
    text: textContent,
    renderNonEmoji: renderNewLines
  }))), textAttachment.preview && textAttachment.preview.url && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, linkPreviewOffsetTop && !isThumbnail && /* @__PURE__ */ import_react.default.createElement("a", {
    className: "TextAttachment__preview__tooltip",
    href: textAttachment.preview.url,
    rel: "noreferrer",
    style: {
      top: linkPreviewOffsetTop - 150
    },
    target: "_blank"
  }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", null, i18n("TextAttachment__preview__link")), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment__preview__tooltip__url"
  }, textAttachment.preview.url)), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "TextAttachment__preview__tooltip__arrow"
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("TextAttachment__preview-container", {
      "TextAttachment__preview-container--large": Boolean(textAttachment.preview.title)
    }),
    ref: linkPreview,
    onFocus: () => setLinkPreviewOffsetTop(linkPreview?.current?.offsetTop),
    onMouseOver: () => setLinkPreviewOffsetTop(linkPreview?.current?.offsetTop)
  }, /* @__PURE__ */ import_react.default.createElement(import_StagedLinkPreview.StagedLinkPreview, {
    domain: (0, import_LinkPreview.getDomain)(String(textAttachment.preview.url)),
    i18n,
    image: textAttachment.preview.image,
    moduleClassName: "TextAttachment__preview",
    title: textAttachment.preview.title || void 0,
    url: textAttachment.preview.url
  }))))));
}, "TextAttachment");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TextAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGV4dEF0dGFjaG1lbnQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBNZWFzdXJlIGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBUZXh0YXJlYUF1dG9zaXplIGZyb20gJ3JlYWN0LXRleHRhcmVhLWF1dG9zaXplJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFJlbmRlclRleHRDYWxsYmFja1R5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgVGV4dEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBBZGROZXdMaW5lcyB9IGZyb20gJy4vY29udmVyc2F0aW9uL0FkZE5ld0xpbmVzJztcbmltcG9ydCB7IEVtb2ppZnkgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9FbW9qaWZ5JztcbmltcG9ydCB7IFN0YWdlZExpbmtQcmV2aWV3IH0gZnJvbSAnLi9jb252ZXJzYXRpb24vU3RhZ2VkTGlua1ByZXZpZXcnO1xuaW1wb3J0IHsgVGV4dEF0dGFjaG1lbnRTdHlsZVR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGNvdW50IH0gZnJvbSAnLi4vdXRpbC9ncmFwaGVtZSc7XG5pbXBvcnQgeyBnZXREb21haW4gfSBmcm9tICcuLi90eXBlcy9MaW5rUHJldmlldyc7XG5pbXBvcnQgeyBnZXRGb250TmFtZUJ5VGV4dFNjcmlwdCB9IGZyb20gJy4uL3V0aWwvZ2V0Rm9udE5hbWVCeVRleHRTY3JpcHQnO1xuaW1wb3J0IHtcbiAgQ09MT1JfV0hJVEVfSU5ULFxuICBnZXRIZXhGcm9tTnVtYmVyLFxuICBnZXRCYWNrZ3JvdW5kQ29sb3IsXG59IGZyb20gJy4uL3V0aWwvZ2V0U3RvcnlCYWNrZ3JvdW5kJztcblxuY29uc3QgcmVuZGVyTmV3TGluZXM6IFJlbmRlclRleHRDYWxsYmFja1R5cGUgPSAoe1xuICB0ZXh0OiB0ZXh0V2l0aE5ld0xpbmVzLFxuICBrZXksXG59KSA9PiB7XG4gIHJldHVybiA8QWRkTmV3TGluZXMga2V5PXtrZXl9IHRleHQ9e3RleHRXaXRoTmV3TGluZXN9IC8+O1xufTtcblxuY29uc3QgQ0hBUl9MSU1JVF9URVhUX0xBUkdFID0gNTA7XG5jb25zdCBDSEFSX0xJTUlUX1RFWFRfTUVESVVNID0gMjAwO1xuY29uc3QgRk9OVF9TSVpFX0xBUkdFID0gNjQ7XG5jb25zdCBGT05UX1NJWkVfTUVESVVNID0gNDI7XG5jb25zdCBGT05UX1NJWkVfU01BTEwgPSAzMjtcblxuZW51bSBUZXh0U2l6ZSB7XG4gIFNtYWxsLFxuICBNZWRpdW0sXG4gIExhcmdlLFxufVxuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzRWRpdGluZ1RleHQ/OiBib29sZWFuO1xuICBpc1RodW1ibmFpbD86IGJvb2xlYW47XG4gIG9uQ2hhbmdlPzogKHRleHQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgdGV4dEF0dGFjaG1lbnQ6IFRleHRBdHRhY2htZW50VHlwZTtcbn07XG5cbmZ1bmN0aW9uIGdldFRleHRTaXplKHRleHQ6IHN0cmluZyk6IFRleHRTaXplIHtcbiAgY29uc3QgbGVuZ3RoID0gY291bnQodGV4dCk7XG5cbiAgaWYgKGxlbmd0aCA8IENIQVJfTElNSVRfVEVYVF9MQVJHRSkge1xuICAgIHJldHVybiBUZXh0U2l6ZS5MYXJnZTtcbiAgfVxuXG4gIGlmIChsZW5ndGggPCBDSEFSX0xJTUlUX1RFWFRfTUVESVVNKSB7XG4gICAgcmV0dXJuIFRleHRTaXplLk1lZGl1bTtcbiAgfVxuXG4gIHJldHVybiBUZXh0U2l6ZS5TbWFsbDtcbn1cblxuZnVuY3Rpb24gZ2V0Rm9udChcbiAgdGV4dDogc3RyaW5nLFxuICB0ZXh0U2l6ZTogVGV4dFNpemUsXG4gIHRleHRTdHlsZT86IFRleHRBdHRhY2htZW50U3R5bGVUeXBlIHwgbnVsbCxcbiAgaTE4bj86IExvY2FsaXplclR5cGVcbik6IHN0cmluZyB7XG4gIGNvbnN0IHRleHRTdHlsZUluZGV4ID0gTnVtYmVyKHRleHRTdHlsZSkgfHwgMDtcbiAgY29uc3QgZm9udE5hbWUgPSBnZXRGb250TmFtZUJ5VGV4dFNjcmlwdCh0ZXh0LCB0ZXh0U3R5bGVJbmRleCwgaTE4bik7XG5cbiAgbGV0IGZvbnRTaXplID0gRk9OVF9TSVpFX1NNQUxMO1xuICBzd2l0Y2ggKHRleHRTaXplKSB7XG4gICAgY2FzZSBUZXh0U2l6ZS5MYXJnZTpcbiAgICAgIGZvbnRTaXplID0gRk9OVF9TSVpFX0xBUkdFO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBUZXh0U2l6ZS5NZWRpdW06XG4gICAgICBmb250U2l6ZSA9IEZPTlRfU0laRV9NRURJVU07XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgZm9udFNpemUgPSBGT05UX1NJWkVfU01BTEw7XG4gIH1cblxuICBjb25zdCBmb250V2VpZ2h0ID0gdGV4dFN0eWxlID09PSBUZXh0QXR0YWNobWVudFN0eWxlVHlwZS5CT0xEID8gJ2JvbGQgJyA6ICcnO1xuXG4gIHJldHVybiBgJHtmb250V2VpZ2h0fSR7Zm9udFNpemV9cHQgJHtmb250TmFtZX1gO1xufVxuXG5mdW5jdGlvbiBnZXRUZXh0U3R5bGVzKFxuICB0ZXh0Q29udGVudDogc3RyaW5nLFxuICB0ZXh0Rm9yZWdyb3VuZENvbG9yPzogbnVtYmVyIHwgbnVsbCxcbiAgdGV4dFN0eWxlPzogVGV4dEF0dGFjaG1lbnRTdHlsZVR5cGUgfCBudWxsLFxuICBpMThuPzogTG9jYWxpemVyVHlwZVxuKTogeyBjb2xvcjogc3RyaW5nOyBmb250OiBzdHJpbmc7IHRleHRBbGlnbjogJ2xlZnQnIHwgJ2NlbnRlcicgfSB7XG4gIHJldHVybiB7XG4gICAgY29sb3I6IGdldEhleEZyb21OdW1iZXIodGV4dEZvcmVncm91bmRDb2xvciB8fCBDT0xPUl9XSElURV9JTlQpLFxuICAgIGZvbnQ6IGdldEZvbnQodGV4dENvbnRlbnQsIGdldFRleHRTaXplKHRleHRDb250ZW50KSwgdGV4dFN0eWxlLCBpMThuKSxcbiAgICB0ZXh0QWxpZ246IGdldFRleHRTaXplKHRleHRDb250ZW50KSA9PT0gVGV4dFNpemUuU21hbGwgPyAnbGVmdCcgOiAnY2VudGVyJyxcbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IFRleHRBdHRhY2htZW50ID0gKHtcbiAgaTE4bixcbiAgaXNFZGl0aW5nVGV4dCxcbiAgaXNUaHVtYm5haWwsXG4gIG9uQ2hhbmdlLFxuICB0ZXh0QXR0YWNobWVudCxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGNvbnN0IGxpbmtQcmV2aWV3ID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IFtsaW5rUHJldmlld09mZnNldFRvcCwgc2V0TGlua1ByZXZpZXdPZmZzZXRUb3BdID0gdXNlU3RhdGU8XG4gICAgbnVtYmVyIHwgdW5kZWZpbmVkXG4gID4oKTtcblxuICBjb25zdCB0ZXh0Q29udGVudCA9IHRleHRBdHRhY2htZW50LnRleHQgfHwgJyc7XG5cbiAgY29uc3QgdGV4dEVkaXRvclJlZiA9IHVzZVJlZjxIVE1MVGV4dEFyZWFFbGVtZW50IHwgbnVsbD4obnVsbCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBub2RlID0gdGV4dEVkaXRvclJlZi5jdXJyZW50O1xuICAgIGlmICghbm9kZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG5vZGUuZm9jdXMoKTtcbiAgICBub2RlLnNldFNlbGVjdGlvblJhbmdlKG5vZGUudmFsdWUubGVuZ3RoLCBub2RlLnZhbHVlLmxlbmd0aCk7XG4gIH0sIFtpc0VkaXRpbmdUZXh0XSk7XG5cbiAgcmV0dXJuIChcbiAgICA8TWVhc3VyZSBib3VuZHM+XG4gICAgICB7KHsgY29udGVudFJlY3QsIG1lYXN1cmVSZWYgfSkgPT4gKFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJUZXh0QXR0YWNobWVudFwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgaWYgKGxpbmtQcmV2aWV3T2Zmc2V0VG9wKSB7XG4gICAgICAgICAgICAgIHNldExpbmtQcmV2aWV3T2Zmc2V0VG9wKHVuZGVmaW5lZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgICBvbktleVVwPXtldiA9PiB7XG4gICAgICAgICAgICBpZiAoZXYua2V5ID09PSAnRXNjYXBlJyAmJiBsaW5rUHJldmlld09mZnNldFRvcCkge1xuICAgICAgICAgICAgICBzZXRMaW5rUHJldmlld09mZnNldFRvcCh1bmRlZmluZWQpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgcmVmPXttZWFzdXJlUmVmfVxuICAgICAgICA+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiVGV4dEF0dGFjaG1lbnRfX3N0b3J5XCJcbiAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgIGJhY2tncm91bmQ6IGdldEJhY2tncm91bmRDb2xvcih0ZXh0QXR0YWNobWVudCksXG4gICAgICAgICAgICAgIHRyYW5zZm9ybTogYHNjYWxlKCR7KGNvbnRlbnRSZWN0LmJvdW5kcz8uaGVpZ2h0IHx8IDEpIC8gMTI4MH0pYCxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAgeyh0ZXh0Q29udGVudCB8fCBvbkNoYW5nZSkgJiYgKFxuICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiVGV4dEF0dGFjaG1lbnRfX3RleHRcIlxuICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IHRleHRBdHRhY2htZW50LnRleHRCYWNrZ3JvdW5kQ29sb3JcbiAgICAgICAgICAgICAgICAgICAgPyBnZXRIZXhGcm9tTnVtYmVyKHRleHRBdHRhY2htZW50LnRleHRCYWNrZ3JvdW5kQ29sb3IpXG4gICAgICAgICAgICAgICAgICAgIDogJ3RyYW5zcGFyZW50JyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge29uQ2hhbmdlID8gKFxuICAgICAgICAgICAgICAgICAgPFRleHRhcmVhQXV0b3NpemVcbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiVGV4dEF0dGFjaG1lbnRfX3RleHRfX2NvbnRhaW5lciBUZXh0QXR0YWNobWVudF9fdGV4dF9fdGV4dGFyZWFcIlxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZD17IWlzRWRpdGluZ1RleHR9XG4gICAgICAgICAgICAgICAgICAgIG9uQ2hhbmdlPXtldiA9PiBvbkNoYW5nZShldi5jdXJyZW50VGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICAgICAgICAgICAgcGxhY2Vob2xkZXI9e2kxOG4oJ1RleHRBdHRhY2htZW50X19wbGFjZWhvbGRlcicpfVxuICAgICAgICAgICAgICAgICAgICByZWY9e3RleHRFZGl0b3JSZWZ9XG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXtnZXRUZXh0U3R5bGVzKFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRDb250ZW50LFxuICAgICAgICAgICAgICAgICAgICAgIHRleHRBdHRhY2htZW50LnRleHRGb3JlZ3JvdW5kQ29sb3IsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEF0dGFjaG1lbnQudGV4dFN0eWxlLFxuICAgICAgICAgICAgICAgICAgICAgIGkxOG5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgdmFsdWU9e3RleHRDb250ZW50fVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICApIDogKFxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJUZXh0QXR0YWNobWVudF9fdGV4dF9fY29udGFpbmVyXCJcbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e2dldFRleHRTdHlsZXMoXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dENvbnRlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEF0dGFjaG1lbnQudGV4dEZvcmVncm91bmRDb2xvcixcbiAgICAgICAgICAgICAgICAgICAgICB0ZXh0QXR0YWNobWVudC50ZXh0U3R5bGUsXG4gICAgICAgICAgICAgICAgICAgICAgaTE4blxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICA8RW1vamlmeVxuICAgICAgICAgICAgICAgICAgICAgIHRleHQ9e3RleHRDb250ZW50fVxuICAgICAgICAgICAgICAgICAgICAgIHJlbmRlck5vbkVtb2ppPXtyZW5kZXJOZXdMaW5lc31cbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHt0ZXh0QXR0YWNobWVudC5wcmV2aWV3ICYmIHRleHRBdHRhY2htZW50LnByZXZpZXcudXJsICYmIChcbiAgICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAgICB7bGlua1ByZXZpZXdPZmZzZXRUb3AgJiYgIWlzVGh1bWJuYWlsICYmIChcbiAgICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIlRleHRBdHRhY2htZW50X19wcmV2aWV3X190b29sdGlwXCJcbiAgICAgICAgICAgICAgICAgICAgaHJlZj17dGV4dEF0dGFjaG1lbnQucHJldmlldy51cmx9XG4gICAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAgIHRvcDogbGlua1ByZXZpZXdPZmZzZXRUb3AgLSAxNTAsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgICAgPGRpdj57aTE4bignVGV4dEF0dGFjaG1lbnRfX3ByZXZpZXdfX2xpbmsnKX08L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlRleHRBdHRhY2htZW50X19wcmV2aWV3X190b29sdGlwX191cmxcIj5cbiAgICAgICAgICAgICAgICAgICAgICAgIHt0ZXh0QXR0YWNobWVudC5wcmV2aWV3LnVybH1cbiAgICAgICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiVGV4dEF0dGFjaG1lbnRfX3ByZXZpZXdfX3Rvb2x0aXBfX2Fycm93XCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnVGV4dEF0dGFjaG1lbnRfX3ByZXZpZXctY29udGFpbmVyJywge1xuICAgICAgICAgICAgICAgICAgICAnVGV4dEF0dGFjaG1lbnRfX3ByZXZpZXctY29udGFpbmVyLS1sYXJnZSc6IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgICAgICAgdGV4dEF0dGFjaG1lbnQucHJldmlldy50aXRsZVxuICAgICAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICAgICAgICByZWY9e2xpbmtQcmV2aWV3fVxuICAgICAgICAgICAgICAgICAgb25Gb2N1cz17KCkgPT5cbiAgICAgICAgICAgICAgICAgICAgc2V0TGlua1ByZXZpZXdPZmZzZXRUb3AobGlua1ByZXZpZXc/LmN1cnJlbnQ/Lm9mZnNldFRvcClcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIG9uTW91c2VPdmVyPXsoKSA9PlxuICAgICAgICAgICAgICAgICAgICBzZXRMaW5rUHJldmlld09mZnNldFRvcChsaW5rUHJldmlldz8uY3VycmVudD8ub2Zmc2V0VG9wKVxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIDxTdGFnZWRMaW5rUHJldmlld1xuICAgICAgICAgICAgICAgICAgICBkb21haW49e2dldERvbWFpbihTdHJpbmcodGV4dEF0dGFjaG1lbnQucHJldmlldy51cmwpKX1cbiAgICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgICAgaW1hZ2U9e3RleHRBdHRhY2htZW50LnByZXZpZXcuaW1hZ2V9XG4gICAgICAgICAgICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlRleHRBdHRhY2htZW50X19wcmV2aWV3XCJcbiAgICAgICAgICAgICAgICAgICAgdGl0bGU9e3RleHRBdHRhY2htZW50LnByZXZpZXcudGl0bGUgfHwgdW5kZWZpbmVkfVxuICAgICAgICAgICAgICAgICAgICB1cmw9e3RleHRBdHRhY2htZW50LnByZXZpZXcudXJsfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC8+XG4gICAgICAgICAgICApfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgICl9XG4gICAgPC9NZWFzdXJlPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSwyQkFBb0I7QUFDcEIsbUJBQW1EO0FBQ25ELHFDQUE2QjtBQUM3Qix3QkFBdUI7QUFJdkIseUJBQTRCO0FBQzVCLHFCQUF3QjtBQUN4QiwrQkFBa0M7QUFDbEMsd0JBQXdDO0FBQ3hDLHNCQUFzQjtBQUN0Qix5QkFBMEI7QUFDMUIscUNBQXdDO0FBQ3hDLGdDQUlPO0FBRVAsTUFBTSxpQkFBeUMsd0JBQUM7QUFBQSxFQUM5QyxNQUFNO0FBQUEsRUFDTjtBQUFBLE1BQ0k7QUFDSixTQUFPLG1EQUFDO0FBQUEsSUFBWTtBQUFBLElBQVUsTUFBTTtBQUFBLEdBQWtCO0FBQ3hELEdBTCtDO0FBTy9DLE1BQU0sd0JBQXdCO0FBQzlCLE1BQU0seUJBQXlCO0FBQy9CLE1BQU0sa0JBQWtCO0FBQ3hCLE1BQU0sbUJBQW1CO0FBQ3pCLE1BQU0sa0JBQWtCO0FBRXhCLElBQUssV0FBTCxrQkFBSyxjQUFMO0FBQ0U7QUFDQTtBQUNBO0FBSEc7QUFBQTtBQWNMLHFCQUFxQixNQUF3QjtBQUMzQyxRQUFNLFNBQVMsMkJBQU0sSUFBSTtBQUV6QixNQUFJLFNBQVMsdUJBQXVCO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxTQUFTLHdCQUF3QjtBQUNuQyxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQVpTLEFBY1QsaUJBQ0UsTUFDQSxVQUNBLFdBQ0EsTUFDUTtBQUNSLFFBQU0saUJBQWlCLE9BQU8sU0FBUyxLQUFLO0FBQzVDLFFBQU0sV0FBVyw0REFBd0IsTUFBTSxnQkFBZ0IsSUFBSTtBQUVuRSxNQUFJLFdBQVc7QUFDZixVQUFR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
