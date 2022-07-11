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
var StoryImage_exports = {};
__export(StoryImage_exports, {
  StoryImage: () => StoryImage
});
module.exports = __toCommonJS(StoryImage_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_blurhash = require("react-blurhash");
var import_Spinner = require("./Spinner");
var import_TextAttachment = require("./TextAttachment");
var import_Util = require("../types/Util");
var import_Attachment = require("../types/Attachment");
var import_getClassNamesFor = require("../util/getClassNamesFor");
var import_GoogleChrome = require("../util/GoogleChrome");
const StoryImage = /* @__PURE__ */ __name(({
  attachment,
  children,
  i18n,
  isMuted,
  isPaused,
  isThumbnail,
  label,
  moduleClassName,
  queueStoryDownload,
  storyId
}) => {
  const shouldDownloadAttachment = !(0, import_Attachment.isDownloaded)(attachment) && !(0, import_Attachment.isDownloading)(attachment) && !(0, import_Attachment.hasNotResolved)(attachment);
  const videoRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    if (shouldDownloadAttachment) {
      queueStoryDownload(storyId);
    }
  }, [queueStoryDownload, shouldDownloadAttachment, storyId]);
  (0, import_react.useEffect)(() => {
    if (!videoRef.current) {
      return;
    }
    if (isPaused) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
  }, [isPaused]);
  if (!attachment) {
    return null;
  }
  const isPending = Boolean(attachment.pending) && !attachment.textAttachment;
  const isNotReadyToShow = (0, import_Attachment.hasNotResolved)(attachment) || isPending;
  const isSupportedVideo = (0, import_GoogleChrome.isVideoTypeSupported)(attachment.contentType);
  const getClassName = (0, import_getClassNamesFor.getClassNamesFor)("StoryImage", moduleClassName);
  let storyElement;
  if (attachment.textAttachment) {
    storyElement = /* @__PURE__ */ import_react.default.createElement(import_TextAttachment.TextAttachment, {
      i18n,
      isThumbnail,
      textAttachment: attachment.textAttachment
    });
  } else if (isNotReadyToShow) {
    storyElement = /* @__PURE__ */ import_react.default.createElement(import_react_blurhash.Blurhash, {
      hash: attachment.blurHash || (0, import_Attachment.defaultBlurHash)(import_Util.ThemeType.dark),
      height: attachment.height,
      width: attachment.width
    });
  } else if (!isThumbnail && isSupportedVideo) {
    const shouldLoop = (0, import_Attachment.isGIF)(attachment ? [attachment] : void 0);
    storyElement = /* @__PURE__ */ import_react.default.createElement("video", {
      autoPlay: true,
      className: getClassName("__image"),
      controls: false,
      key: attachment.url,
      loop: shouldLoop,
      muted: isMuted,
      ref: videoRef
    }, /* @__PURE__ */ import_react.default.createElement("source", {
      src: attachment.url
    }));
  } else {
    storyElement = /* @__PURE__ */ import_react.default.createElement("img", {
      alt: label,
      className: getClassName("__image"),
      src: isThumbnail && attachment.thumbnail ? attachment.thumbnail.url : attachment.url
    });
  }
  let overlay;
  if (isPending) {
    overlay = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryImage__overlay-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "StoryImage__spinner-bubble",
      title: i18n("loading")
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      moduleClassName: "StoryImage__spinner",
      svgSize: "small"
    })));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(getClassName(""), isThumbnail ? getClassName("--thumbnail") : void 0)
  }, storyElement, overlay, children);
}, "StoryImage");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StoryImage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RvcnlJbWFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VSZWYgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IEJsdXJoYXNoIH0gZnJvbSAncmVhY3QtYmx1cmhhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuL1NwaW5uZXInO1xuaW1wb3J0IHsgVGV4dEF0dGFjaG1lbnQgfSBmcm9tICcuL1RleHRBdHRhY2htZW50JztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHtcbiAgZGVmYXVsdEJsdXJIYXNoLFxuICBoYXNOb3RSZXNvbHZlZCxcbiAgaXNEb3dubG9hZGVkLFxuICBpc0Rvd25sb2FkaW5nLFxuICBpc0dJRixcbn0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBnZXRDbGFzc05hbWVzRm9yIH0gZnJvbSAnLi4vdXRpbC9nZXRDbGFzc05hbWVzRm9yJztcbmltcG9ydCB7IGlzVmlkZW9UeXBlU3VwcG9ydGVkIH0gZnJvbSAnLi4vdXRpbC9Hb29nbGVDaHJvbWUnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIHJlYWRvbmx5IGF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZTtcbiAgcmVhZG9ubHkgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIHJlYWRvbmx5IGkxOG46IExvY2FsaXplclR5cGU7XG4gIHJlYWRvbmx5IGlzTXV0ZWQ/OiBib29sZWFuO1xuICByZWFkb25seSBpc1BhdXNlZD86IGJvb2xlYW47XG4gIHJlYWRvbmx5IGlzVGh1bWJuYWlsPzogYm9vbGVhbjtcbiAgcmVhZG9ubHkgbGFiZWw6IHN0cmluZztcbiAgcmVhZG9ubHkgbW9kdWxlQ2xhc3NOYW1lPzogc3RyaW5nO1xuICByZWFkb25seSBxdWV1ZVN0b3J5RG93bmxvYWQ6IChzdG9yeUlkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHJlYWRvbmx5IHN0b3J5SWQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCBjb25zdCBTdG9yeUltYWdlID0gKHtcbiAgYXR0YWNobWVudCxcbiAgY2hpbGRyZW4sXG4gIGkxOG4sXG4gIGlzTXV0ZWQsXG4gIGlzUGF1c2VkLFxuICBpc1RodW1ibmFpbCxcbiAgbGFiZWwsXG4gIG1vZHVsZUNsYXNzTmFtZSxcbiAgcXVldWVTdG9yeURvd25sb2FkLFxuICBzdG9yeUlkLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgY29uc3Qgc2hvdWxkRG93bmxvYWRBdHRhY2htZW50ID1cbiAgICAhaXNEb3dubG9hZGVkKGF0dGFjaG1lbnQpICYmXG4gICAgIWlzRG93bmxvYWRpbmcoYXR0YWNobWVudCkgJiZcbiAgICAhaGFzTm90UmVzb2x2ZWQoYXR0YWNobWVudCk7XG5cbiAgY29uc3QgdmlkZW9SZWYgPSB1c2VSZWY8SFRNTFZpZGVvRWxlbWVudCB8IG51bGw+KG51bGwpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHNob3VsZERvd25sb2FkQXR0YWNobWVudCkge1xuICAgICAgcXVldWVTdG9yeURvd25sb2FkKHN0b3J5SWQpO1xuICAgIH1cbiAgfSwgW3F1ZXVlU3RvcnlEb3dubG9hZCwgc2hvdWxkRG93bmxvYWRBdHRhY2htZW50LCBzdG9yeUlkXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIXZpZGVvUmVmLmN1cnJlbnQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaXNQYXVzZWQpIHtcbiAgICAgIHZpZGVvUmVmLmN1cnJlbnQucGF1c2UoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdmlkZW9SZWYuY3VycmVudC5wbGF5KCk7XG4gICAgfVxuICB9LCBbaXNQYXVzZWRdKTtcblxuICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IGlzUGVuZGluZyA9IEJvb2xlYW4oYXR0YWNobWVudC5wZW5kaW5nKSAmJiAhYXR0YWNobWVudC50ZXh0QXR0YWNobWVudDtcbiAgY29uc3QgaXNOb3RSZWFkeVRvU2hvdyA9IGhhc05vdFJlc29sdmVkKGF0dGFjaG1lbnQpIHx8IGlzUGVuZGluZztcbiAgY29uc3QgaXNTdXBwb3J0ZWRWaWRlbyA9IGlzVmlkZW9UeXBlU3VwcG9ydGVkKGF0dGFjaG1lbnQuY29udGVudFR5cGUpO1xuXG4gIGNvbnN0IGdldENsYXNzTmFtZSA9IGdldENsYXNzTmFtZXNGb3IoJ1N0b3J5SW1hZ2UnLCBtb2R1bGVDbGFzc05hbWUpO1xuXG4gIGxldCBzdG9yeUVsZW1lbnQ6IEpTWC5FbGVtZW50O1xuICBpZiAoYXR0YWNobWVudC50ZXh0QXR0YWNobWVudCkge1xuICAgIHN0b3J5RWxlbWVudCA9IChcbiAgICAgIDxUZXh0QXR0YWNobWVudFxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc1RodW1ibmFpbD17aXNUaHVtYm5haWx9XG4gICAgICAgIHRleHRBdHRhY2htZW50PXthdHRhY2htZW50LnRleHRBdHRhY2htZW50fVxuICAgICAgLz5cbiAgICApO1xuICB9IGVsc2UgaWYgKGlzTm90UmVhZHlUb1Nob3cpIHtcbiAgICBzdG9yeUVsZW1lbnQgPSAoXG4gICAgICA8Qmx1cmhhc2hcbiAgICAgICAgaGFzaD17YXR0YWNobWVudC5ibHVySGFzaCB8fCBkZWZhdWx0Qmx1ckhhc2goVGhlbWVUeXBlLmRhcmspfVxuICAgICAgICBoZWlnaHQ9e2F0dGFjaG1lbnQuaGVpZ2h0fVxuICAgICAgICB3aWR0aD17YXR0YWNobWVudC53aWR0aH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfSBlbHNlIGlmICghaXNUaHVtYm5haWwgJiYgaXNTdXBwb3J0ZWRWaWRlbykge1xuICAgIGNvbnN0IHNob3VsZExvb3AgPSBpc0dJRihhdHRhY2htZW50ID8gW2F0dGFjaG1lbnRdIDogdW5kZWZpbmVkKTtcblxuICAgIHN0b3J5RWxlbWVudCA9IChcbiAgICAgIDx2aWRlb1xuICAgICAgICBhdXRvUGxheVxuICAgICAgICBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19pbWFnZScpfVxuICAgICAgICBjb250cm9scz17ZmFsc2V9XG4gICAgICAgIGtleT17YXR0YWNobWVudC51cmx9XG4gICAgICAgIGxvb3A9e3Nob3VsZExvb3B9XG4gICAgICAgIG11dGVkPXtpc011dGVkfVxuICAgICAgICByZWY9e3ZpZGVvUmVmfVxuICAgICAgPlxuICAgICAgICA8c291cmNlIHNyYz17YXR0YWNobWVudC51cmx9IC8+XG4gICAgICA8L3ZpZGVvPlxuICAgICk7XG4gIH0gZWxzZSB7XG4gICAgc3RvcnlFbGVtZW50ID0gKFxuICAgICAgPGltZ1xuICAgICAgICBhbHQ9e2xhYmVsfVxuICAgICAgICBjbGFzc05hbWU9e2dldENsYXNzTmFtZSgnX19pbWFnZScpfVxuICAgICAgICBzcmM9e1xuICAgICAgICAgIGlzVGh1bWJuYWlsICYmIGF0dGFjaG1lbnQudGh1bWJuYWlsXG4gICAgICAgICAgICA/IGF0dGFjaG1lbnQudGh1bWJuYWlsLnVybFxuICAgICAgICAgICAgOiBhdHRhY2htZW50LnVybFxuICAgICAgICB9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBsZXQgb3ZlcmxheTogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIGlmIChpc1BlbmRpbmcpIHtcbiAgICBvdmVybGF5ID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJTdG9yeUltYWdlX19vdmVybGF5LWNvbnRhaW5lclwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIlN0b3J5SW1hZ2VfX3NwaW5uZXItYnViYmxlXCIgdGl0bGU9e2kxOG4oJ2xvYWRpbmcnKX0+XG4gICAgICAgICAgPFNwaW5uZXIgbW9kdWxlQ2xhc3NOYW1lPVwiU3RvcnlJbWFnZV9fc3Bpbm5lclwiIHN2Z1NpemU9XCJzbWFsbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICBnZXRDbGFzc05hbWUoJycpLFxuICAgICAgICBpc1RodW1ibmFpbCA/IGdldENsYXNzTmFtZSgnLS10aHVtYm5haWwnKSA6IHVuZGVmaW5lZFxuICAgICAgKX1cbiAgICA+XG4gICAgICB7c3RvcnlFbGVtZW50fVxuICAgICAge292ZXJsYXl9XG4gICAgICB7Y2hpbGRyZW59XG4gICAgPC9kaXY+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUF5QztBQUN6Qyx3QkFBdUI7QUFDdkIsNEJBQXlCO0FBSXpCLHFCQUF3QjtBQUN4Qiw0QkFBK0I7QUFDL0Isa0JBQTBCO0FBQzFCLHdCQU1PO0FBQ1AsOEJBQWlDO0FBQ2pDLDBCQUFxQztBQWU5QixNQUFNLGFBQWEsd0JBQUM7QUFBQSxFQUN6QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ21DO0FBQ25DLFFBQU0sMkJBQ0osQ0FBQyxvQ0FBYSxVQUFVLEtBQ3hCLENBQUMscUNBQWMsVUFBVSxLQUN6QixDQUFDLHNDQUFlLFVBQVU7QUFFNUIsUUFBTSxXQUFXLHlCQUFnQyxJQUFJO0FBRXJELDhCQUFVLE1BQU07QUFDZCxRQUFJLDBCQUEwQjtBQUM1Qix5QkFBbUIsT0FBTztBQUFBLElBQzVCO0FBQUEsRUFDRixHQUFHLENBQUMsb0JBQW9CLDBCQUEwQixPQUFPLENBQUM7QUFFMUQsOEJBQVUsTUFBTTtBQUNkLFFBQUksQ0FBQyxTQUFTLFNBQVM7QUFDckI7QUFBQSxJQUNGO0FBRUEsUUFBSSxVQUFVO0FBQ1osZUFBUyxRQUFRLE1BQU07QUFBQSxJQUN6QixPQUFPO0FBQ0wsZUFBUyxRQUFRLEtBQUs7QUFBQSxJQUN4QjtBQUFBLEVBQ0YsR0FBRyxDQUFDLFFBQVEsQ0FBQztBQUViLE1BQUksQ0FBQyxZQUFZO0FBQ2YsV0FBTztBQUFBLEVBQ1Q7QUFFQSxRQUFNLFlBQVksUUFBUSxXQUFXLE9BQU8sS0FBSyxDQUFDLFdBQVc7QUFDN0QsUUFBTSxtQkFBbUIsc0NBQWUsVUFBVSxLQUFLO0FBQ3ZELFFBQU0sbUJBQW1CLDhDQUFxQixXQUFXLFdBQVc7QUFFcEUsUUFBTSxlQUFlLDhDQUFpQixjQUFjLGVBQWU7QUFFbkUsTUFBSTtBQUNKLE1BQUksV0FBVyxnQkFBZ0I7QUFDN0IsbUJBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQTtBQUFBLE1BQ0EsZ0JBQWdCLFdBQVc7QUFBQSxLQUM3QjtBQUFBLEVBRUosV0FBVyxrQkFBa0I7QUFDM0IsbUJBQ0UsbURBQUM7QUFBQSxNQUNDLE1BQU0sV0FBVyxZQUFZLHVDQUFnQixzQkFBVSxJQUFJO0FBQUEsTUFDM0QsUUFBUSxXQUFXO0FBQUEsTUFDbkIsT0FBTyxXQUFXO0FBQUEsS0FDcEI7QUFBQSxFQUVKLFdBQVcsQ0FBQyxlQUFlLGtCQUFrQjtBQUMzQyxVQUFNLGFBQWEsNkJBQU0sYUFBYSxDQUFDLFVBQVUsSUFBSSxNQUFTO0FBRTlELG1CQUNFLG1EQUFDO0FBQUEsTUFDQyxVQUFRO0FBQUEsTUFDUixXQUFXLGFBQWEsU0FBUztBQUFBLE1BQ2pDLFVBQVU7QUFBQSxNQUNWLEtBQUssV0FBVztBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLE9BQU87QUFBQSxNQUNQLEtBQUs7QUFBQSxPQUVMLG1EQUFDO0FBQUEsTUFBTyxLQUFLLFdBQVc7QUFBQSxLQUFLLENBQy9CO0FBQUEsRUFFSixPQUFPO0FBQ0wsbUJBQ0UsbURBQUM7QUFBQSxNQUNDLEtBQUs7QUFBQSxNQUNMLFdBQVcsYUFBYSxTQUFTO0FBQUEsTUFDakMsS0FDRSxlQUFlLFdBQVcsWUFDdEIsV0FBVyxVQUFVLE1BQ3JCLFdBQVc7QUFBQSxLQUVuQjtBQUFBLEVBRUo7QUFFQSxNQUFJO0FBQ0osTUFBSSxXQUFXO0FBQ2IsY0FDRSxtREFBQztBQUFBLE1BQUksV0FBVTtBQUFBLE9BQ2IsbURBQUM7QUFBQSxNQUFJLFdBQVU7QUFBQSxNQUE2QixPQUFPLEtBQUssU0FBUztBQUFBLE9BQy9ELG1EQUFDO0FBQUEsTUFBUSxpQkFBZ0I7QUFBQSxNQUFzQixTQUFRO0FBQUEsS0FBUSxDQUNqRSxDQUNGO0FBQUEsRUFFSjtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQ1QsYUFBYSxFQUFFLEdBQ2YsY0FBYyxhQUFhLGFBQWEsSUFBSSxNQUM5QztBQUFBLEtBRUMsY0FDQSxTQUNBLFFBQ0g7QUFFSixHQXJIMEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
