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
var GIF_exports = {};
__export(GIF_exports, {
  GIF: () => GIF
});
module.exports = __toCommonJS(GIF_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_react_blurhash = require("react-blurhash");
var import_Spinner = require("../Spinner");
var import_Attachment = require("../../types/Attachment");
var log = __toESM(require("../../logging/log"));
const MAX_GIF_REPEAT = 4;
const MAX_GIF_TIME = 8;
const GIF = /* @__PURE__ */ __name((props) => {
  const {
    attachment,
    size,
    tabIndex,
    i18n,
    theme,
    reducedMotion = Boolean(window.Accessibility && window.Accessibility.reducedMotionSetting),
    onError,
    showVisualAttachment,
    kickOffAttachmentDownload
  } = props;
  const tapToPlay = reducedMotion;
  const videoRef = (0, import_react.useRef)(null);
  const { height, width } = (0, import_Attachment.getImageDimensions)(attachment, size);
  const [repeatCount, setRepeatCount] = (0, import_react.useState)(0);
  const [playTime, setPlayTime] = (0, import_react.useState)(MAX_GIF_TIME);
  const [currentTime, setCurrentTime] = (0, import_react.useState)(0);
  const [isFocused, setIsFocused] = (0, import_react.useState)(true);
  const [isPlaying, setIsPlaying] = (0, import_react.useState)(!tapToPlay);
  (0, import_react.useEffect)(() => {
    const onFocus = /* @__PURE__ */ __name(() => setIsFocused(true), "onFocus");
    const onBlur = /* @__PURE__ */ __name(() => setIsFocused(false), "onBlur");
    window.addEventListener("focus", onFocus);
    window.addEventListener("blur", onBlur);
    return () => {
      window.removeEventListener("focus", onFocus);
      window.removeEventListener("blur", onBlur);
    };
  });
  (0, import_react.useEffect)(() => {
    const { current: video } = videoRef;
    if (!video) {
      return;
    }
    if (isPlaying) {
      video.play().catch((error) => {
        log.info("Failed to match GIF playback to window's state", error && error.stack || error);
      });
    } else {
      video.pause();
    }
  }, [isPlaying, repeatCount]);
  (0, import_react.useEffect)(() => {
    const { current: video } = videoRef;
    if (!video) {
      return;
    }
    let isTapToPlayPaused = false;
    if (tapToPlay) {
      if (playTime + currentTime >= MAX_GIF_TIME || repeatCount >= MAX_GIF_REPEAT) {
        isTapToPlayPaused = true;
      }
    }
    setIsPlaying(isFocused && !isTapToPlayPaused);
  }, [isFocused, playTime, currentTime, repeatCount, tapToPlay]);
  const onTimeUpdate = /* @__PURE__ */ __name(async (event) => {
    const { currentTime: reportedTime } = event.currentTarget;
    if (!Number.isNaN(reportedTime)) {
      setCurrentTime(reportedTime);
    }
  }, "onTimeUpdate");
  const onEnded = /* @__PURE__ */ __name(async (event) => {
    const { currentTarget: video } = event;
    const { duration } = video;
    setRepeatCount(repeatCount + 1);
    if (!Number.isNaN(duration)) {
      video.currentTime = 0;
      setCurrentTime(0);
      setPlayTime(playTime + duration);
    }
  }, "onEnded");
  const onOverlayClick = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (!attachment.url) {
      kickOffAttachmentDownload();
    } else if (tapToPlay) {
      setPlayTime(0);
      setCurrentTime(0);
      setRepeatCount(0);
    }
  }, "onOverlayClick");
  const onOverlayKeyDown = /* @__PURE__ */ __name((event) => {
    if (event.key !== "Enter" && event.key !== "Space") {
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    kickOffAttachmentDownload();
  }, "onOverlayKeyDown");
  const isPending = Boolean(attachment.pending);
  const isNotResolved = (0, import_Attachment.hasNotResolved)(attachment) && !isPending;
  let fileSize;
  if (isNotResolved && attachment.fileSize) {
    fileSize = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image--gif__filesize"
    }, attachment.fileSize, " \xB7 GIF");
  }
  let gif;
  if (isNotResolved || isPending) {
    gif = /* @__PURE__ */ import_react.default.createElement(import_react_blurhash.Blurhash, {
      hash: attachment.blurHash || (0, import_Attachment.defaultBlurHash)(theme),
      width,
      height,
      style: { display: "block" }
    });
  } else {
    gif = /* @__PURE__ */ import_react.default.createElement("video", {
      ref: videoRef,
      onTimeUpdate,
      onEnded,
      onError,
      onClick: (event) => {
        event.preventDefault();
        event.stopPropagation();
        showVisualAttachment();
      },
      className: "module-image--gif__video",
      autoPlay: true,
      playsInline: true,
      muted: true,
      poster: attachment.screenshot && attachment.screenshot.url,
      height,
      width,
      src: attachment.url
    });
  }
  let overlay;
  if (tapToPlay && !isPlaying || isNotResolved) {
    const className = (0, import_classnames.default)([
      "module-image__border-overlay",
      "module-image__border-overlay--with-click-handler",
      "module-image--soft-corners",
      isNotResolved ? "module-image--not-downloaded" : "module-image--tap-to-play"
    ]);
    overlay = /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className,
      onClick: onOverlayClick,
      onKeyDown: onOverlayKeyDown,
      tabIndex
    }, /* @__PURE__ */ import_react.default.createElement("span", null));
  }
  let spinner;
  if (isPending) {
    spinner = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__download-pending--spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-image__download-pending--spinner",
      title: i18n("loading")
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      moduleClassName: "module-image-spinner",
      svgSize: "small"
    })));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-image module-image--gif"
  }, gif, overlay, spinner, fileSize);
}, "GIF");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GIF
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR0lGLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VTdGF0ZSwgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBCbHVyaGFzaCB9IGZyb20gJ3JlYWN0LWJsdXJoYXNoJztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNwaW5uZXIgfSBmcm9tICcuLi9TcGlubmVyJztcblxuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHtcbiAgaGFzTm90UmVzb2x2ZWQsXG4gIGdldEltYWdlRGltZW5zaW9ucyxcbiAgZGVmYXVsdEJsdXJIYXNoLFxufSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5cbmNvbnN0IE1BWF9HSUZfUkVQRUFUID0gNDtcbmNvbnN0IE1BWF9HSUZfVElNRSA9IDg7XG5cbmV4cG9ydCB0eXBlIFByb3BzID0ge1xuICByZWFkb25seSBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgcmVhZG9ubHkgc2l6ZT86IG51bWJlcjtcbiAgcmVhZG9ubHkgdGFiSW5kZXg6IG51bWJlcjtcblxuICByZWFkb25seSBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWFkb25seSB0aGVtZT86IFRoZW1lVHlwZTtcblxuICByZWFkb25seSByZWR1Y2VkTW90aW9uPzogYm9vbGVhbjtcblxuICBvbkVycm9yKCk6IHZvaWQ7XG4gIHNob3dWaXN1YWxBdHRhY2htZW50KCk6IHZvaWQ7XG4gIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoKTogdm9pZDtcbn07XG5cbnR5cGUgTWVkaWFFdmVudCA9IFJlYWN0LlN5bnRoZXRpY0V2ZW50PEhUTUxWaWRlb0VsZW1lbnQsIEV2ZW50PjtcblxuZXhwb3J0IGNvbnN0IEdJRjogUmVhY3QuRkM8UHJvcHM+ID0gcHJvcHMgPT4ge1xuICBjb25zdCB7XG4gICAgYXR0YWNobWVudCxcbiAgICBzaXplLFxuICAgIHRhYkluZGV4LFxuXG4gICAgaTE4bixcbiAgICB0aGVtZSxcblxuICAgIHJlZHVjZWRNb3Rpb24gPSBCb29sZWFuKFxuICAgICAgd2luZG93LkFjY2Vzc2liaWxpdHkgJiYgd2luZG93LkFjY2Vzc2liaWxpdHkucmVkdWNlZE1vdGlvblNldHRpbmdcbiAgICApLFxuXG4gICAgb25FcnJvcixcbiAgICBzaG93VmlzdWFsQXR0YWNobWVudCxcbiAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkLFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgdGFwVG9QbGF5ID0gcmVkdWNlZE1vdGlvbjtcblxuICBjb25zdCB2aWRlb1JlZiA9IHVzZVJlZjxIVE1MVmlkZW9FbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IHsgaGVpZ2h0LCB3aWR0aCB9ID0gZ2V0SW1hZ2VEaW1lbnNpb25zKGF0dGFjaG1lbnQsIHNpemUpO1xuXG4gIGNvbnN0IFtyZXBlYXRDb3VudCwgc2V0UmVwZWF0Q291bnRdID0gdXNlU3RhdGUoMCk7XG4gIGNvbnN0IFtwbGF5VGltZSwgc2V0UGxheVRpbWVdID0gdXNlU3RhdGUoTUFYX0dJRl9USU1FKTtcbiAgY29uc3QgW2N1cnJlbnRUaW1lLCBzZXRDdXJyZW50VGltZV0gPSB1c2VTdGF0ZSgwKTtcbiAgY29uc3QgW2lzRm9jdXNlZCwgc2V0SXNGb2N1c2VkXSA9IHVzZVN0YXRlKHRydWUpO1xuICBjb25zdCBbaXNQbGF5aW5nLCBzZXRJc1BsYXlpbmddID0gdXNlU3RhdGUoIXRhcFRvUGxheSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBvbkZvY3VzID0gKCkgPT4gc2V0SXNGb2N1c2VkKHRydWUpO1xuICAgIGNvbnN0IG9uQmx1ciA9ICgpID0+IHNldElzRm9jdXNlZChmYWxzZSk7XG5cbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignZm9jdXMnLCBvbkZvY3VzKTtcbiAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcignYmx1cicsIG9uQmx1cik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHdpbmRvdy5yZW1vdmVFdmVudExpc3RlbmVyKCdmb2N1cycsIG9uRm9jdXMpO1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBvbkJsdXIpO1xuICAgIH07XG4gIH0pO1xuXG4gIC8vXG4gIC8vIFBsYXkgJiBQYXVzZSB2aWRlbyBpbiByZXNwb25zZSB0byBjaGFuZ2Ugb2YgYGlzUGxheWluZ2AgYW5kIGByZXBlYXRDb3VudGAuXG4gIC8vXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50OiB2aWRlbyB9ID0gdmlkZW9SZWY7XG4gICAgaWYgKCF2aWRlbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1BsYXlpbmcpIHtcbiAgICAgIHZpZGVvLnBsYXkoKS5jYXRjaChlcnJvciA9PiB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIFwiRmFpbGVkIHRvIG1hdGNoIEdJRiBwbGF5YmFjayB0byB3aW5kb3cncyBzdGF0ZVwiLFxuICAgICAgICAgIChlcnJvciAmJiBlcnJvci5zdGFjaykgfHwgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICB2aWRlby5wYXVzZSgpO1xuICAgIH1cbiAgfSwgW2lzUGxheWluZywgcmVwZWF0Q291bnRdKTtcblxuICAvL1xuICAvLyBDaGFuZ2UgYGlzUGxheWluZ2AgaW4gcmVzcG9uc2UgdG8gZm9jdXMsIHBsYXkgdGltZSwgYW5kIHJlcGVhdCBjb3VudFxuICAvLyBjaGFuZ2VzLlxuICAvL1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IHsgY3VycmVudDogdmlkZW8gfSA9IHZpZGVvUmVmO1xuICAgIGlmICghdmlkZW8pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgaXNUYXBUb1BsYXlQYXVzZWQgPSBmYWxzZTtcbiAgICBpZiAodGFwVG9QbGF5KSB7XG4gICAgICBpZiAoXG4gICAgICAgIHBsYXlUaW1lICsgY3VycmVudFRpbWUgPj0gTUFYX0dJRl9USU1FIHx8XG4gICAgICAgIHJlcGVhdENvdW50ID49IE1BWF9HSUZfUkVQRUFUXG4gICAgICApIHtcbiAgICAgICAgaXNUYXBUb1BsYXlQYXVzZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIHNldElzUGxheWluZyhpc0ZvY3VzZWQgJiYgIWlzVGFwVG9QbGF5UGF1c2VkKTtcbiAgfSwgW2lzRm9jdXNlZCwgcGxheVRpbWUsIGN1cnJlbnRUaW1lLCByZXBlYXRDb3VudCwgdGFwVG9QbGF5XSk7XG5cbiAgY29uc3Qgb25UaW1lVXBkYXRlID0gYXN5bmMgKGV2ZW50OiBNZWRpYUV2ZW50KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgY29uc3QgeyBjdXJyZW50VGltZTogcmVwb3J0ZWRUaW1lIH0gPSBldmVudC5jdXJyZW50VGFyZ2V0O1xuICAgIGlmICghTnVtYmVyLmlzTmFOKHJlcG9ydGVkVGltZSkpIHtcbiAgICAgIHNldEN1cnJlbnRUaW1lKHJlcG9ydGVkVGltZSk7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG9uRW5kZWQgPSBhc3luYyAoZXZlbnQ6IE1lZGlhRXZlbnQpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICBjb25zdCB7IGN1cnJlbnRUYXJnZXQ6IHZpZGVvIH0gPSBldmVudDtcbiAgICBjb25zdCB7IGR1cmF0aW9uIH0gPSB2aWRlbztcblxuICAgIHNldFJlcGVhdENvdW50KHJlcGVhdENvdW50ICsgMSk7XG4gICAgaWYgKCFOdW1iZXIuaXNOYU4oZHVyYXRpb24pKSB7XG4gICAgICB2aWRlby5jdXJyZW50VGltZSA9IDA7XG5cbiAgICAgIHNldEN1cnJlbnRUaW1lKDApO1xuICAgICAgc2V0UGxheVRpbWUocGxheVRpbWUgKyBkdXJhdGlvbik7XG4gICAgfVxuICB9O1xuXG4gIGNvbnN0IG9uT3ZlcmxheUNsaWNrID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGlmICghYXR0YWNobWVudC51cmwpIHtcbiAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoKTtcbiAgICB9IGVsc2UgaWYgKHRhcFRvUGxheSkge1xuICAgICAgc2V0UGxheVRpbWUoMCk7XG4gICAgICBzZXRDdXJyZW50VGltZSgwKTtcbiAgICAgIHNldFJlcGVhdENvdW50KDApO1xuICAgIH1cbiAgfTtcblxuICBjb25zdCBvbk92ZXJsYXlLZXlEb3duID0gKGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgaWYgKGV2ZW50LmtleSAhPT0gJ0VudGVyJyAmJiBldmVudC5rZXkgIT09ICdTcGFjZScpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCgpO1xuICB9O1xuXG4gIGNvbnN0IGlzUGVuZGluZyA9IEJvb2xlYW4oYXR0YWNobWVudC5wZW5kaW5nKTtcbiAgY29uc3QgaXNOb3RSZXNvbHZlZCA9IGhhc05vdFJlc29sdmVkKGF0dGFjaG1lbnQpICYmICFpc1BlbmRpbmc7XG5cbiAgbGV0IGZpbGVTaXplOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgaWYgKGlzTm90UmVzb2x2ZWQgJiYgYXR0YWNobWVudC5maWxlU2l6ZSkge1xuICAgIGZpbGVTaXplID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2UtLWdpZl9fZmlsZXNpemVcIj5cbiAgICAgICAge2F0dGFjaG1lbnQuZmlsZVNpemV9IFx1MDBCNyBHSUZcbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBsZXQgZ2lmOiBKU1guRWxlbWVudCB8IHVuZGVmaW5lZDtcbiAgaWYgKGlzTm90UmVzb2x2ZWQgfHwgaXNQZW5kaW5nKSB7XG4gICAgZ2lmID0gKFxuICAgICAgPEJsdXJoYXNoXG4gICAgICAgIGhhc2g9e2F0dGFjaG1lbnQuYmx1ckhhc2ggfHwgZGVmYXVsdEJsdXJIYXNoKHRoZW1lKX1cbiAgICAgICAgd2lkdGg9e3dpZHRofVxuICAgICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgICAgc3R5bGU9e3sgZGlzcGxheTogJ2Jsb2NrJyB9fVxuICAgICAgLz5cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIGdpZiA9IChcbiAgICAgIDx2aWRlb1xuICAgICAgICByZWY9e3ZpZGVvUmVmfVxuICAgICAgICBvblRpbWVVcGRhdGU9e29uVGltZVVwZGF0ZX1cbiAgICAgICAgb25FbmRlZD17b25FbmRlZH1cbiAgICAgICAgb25FcnJvcj17b25FcnJvcn1cbiAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICAgIHNob3dWaXN1YWxBdHRhY2htZW50KCk7XG4gICAgICAgIH19XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1pbWFnZS0tZ2lmX192aWRlb1wiXG4gICAgICAgIGF1dG9QbGF5XG4gICAgICAgIHBsYXlzSW5saW5lXG4gICAgICAgIG11dGVkXG4gICAgICAgIHBvc3Rlcj17YXR0YWNobWVudC5zY3JlZW5zaG90ICYmIGF0dGFjaG1lbnQuc2NyZWVuc2hvdC51cmx9XG4gICAgICAgIGhlaWdodD17aGVpZ2h0fVxuICAgICAgICB3aWR0aD17d2lkdGh9XG4gICAgICAgIHNyYz17YXR0YWNobWVudC51cmx9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBsZXQgb3ZlcmxheTogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIGlmICgodGFwVG9QbGF5ICYmICFpc1BsYXlpbmcpIHx8IGlzTm90UmVzb2x2ZWQpIHtcbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFtcbiAgICAgICdtb2R1bGUtaW1hZ2VfX2JvcmRlci1vdmVybGF5JyxcbiAgICAgICdtb2R1bGUtaW1hZ2VfX2JvcmRlci1vdmVybGF5LS13aXRoLWNsaWNrLWhhbmRsZXInLFxuICAgICAgJ21vZHVsZS1pbWFnZS0tc29mdC1jb3JuZXJzJyxcbiAgICAgIGlzTm90UmVzb2x2ZWRcbiAgICAgICAgPyAnbW9kdWxlLWltYWdlLS1ub3QtZG93bmxvYWRlZCdcbiAgICAgICAgOiAnbW9kdWxlLWltYWdlLS10YXAtdG8tcGxheScsXG4gICAgXSk7XG5cbiAgICBvdmVybGF5ID0gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWV9XG4gICAgICAgIG9uQ2xpY2s9e29uT3ZlcmxheUNsaWNrfVxuICAgICAgICBvbktleURvd249e29uT3ZlcmxheUtleURvd259XG4gICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgID5cbiAgICAgICAgPHNwYW4gLz5cbiAgICAgIDwvYnV0dG9uPlxuICAgICk7XG4gIH1cblxuICBsZXQgc3Bpbm5lcjogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIGlmIChpc1BlbmRpbmcpIHtcbiAgICBzcGlubmVyID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2Rvd25sb2FkLXBlbmRpbmctLXNwaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2VfX2Rvd25sb2FkLXBlbmRpbmctLXNwaW5uZXJcIlxuICAgICAgICAgIHRpdGxlPXtpMThuKCdsb2FkaW5nJyl9XG4gICAgICAgID5cbiAgICAgICAgICA8U3Bpbm5lciBtb2R1bGVDbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2Utc3Bpbm5lclwiIHN2Z1NpemU9XCJzbWFsbFwiIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2UgbW9kdWxlLWltYWdlLS1naWZcIj5cbiAgICAgIHtnaWZ9XG4gICAgICB7b3ZlcmxheX1cbiAgICAgIHtzcGlubmVyfVxuICAgICAge2ZpbGVTaXplfVxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBbUQ7QUFDbkQsd0JBQXVCO0FBQ3ZCLDRCQUF5QjtBQUd6QixxQkFBd0I7QUFHeEIsd0JBSU87QUFDUCxVQUFxQjtBQUVyQixNQUFNLGlCQUFpQjtBQUN2QixNQUFNLGVBQWU7QUFtQmQsTUFBTSxNQUF1QixrQ0FBUztBQUMzQyxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFFQTtBQUFBLElBQ0E7QUFBQSxJQUVBLGdCQUFnQixRQUNkLE9BQU8saUJBQWlCLE9BQU8sY0FBYyxvQkFDL0M7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosUUFBTSxZQUFZO0FBRWxCLFFBQU0sV0FBVyx5QkFBZ0MsSUFBSTtBQUNyRCxRQUFNLEVBQUUsUUFBUSxVQUFVLDBDQUFtQixZQUFZLElBQUk7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
