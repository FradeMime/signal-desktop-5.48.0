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
var __copyProps = (to2, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to2, key) && key !== except)
        __defProp(to2, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to2;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var Lightbox_exports = {};
__export(Lightbox_exports, {
  Lightbox: () => Lightbox
});
module.exports = __toCommonJS(Lightbox_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_moment = __toESM(require("moment"));
var import_react_dom = require("react-dom");
var import_lodash = require("lodash");
var import_web = require("@react-spring/web");
var GoogleChrome = __toESM(require("../util/GoogleChrome"));
var import_Attachment = require("../types/Attachment");
var import_Avatar = require("./Avatar");
var import_MIME = require("../types/MIME");
var import_formatDuration = require("../util/formatDuration");
var import_useRestoreFocus = require("../hooks/useRestoreFocus");
var log = __toESM(require("../logging/log"));
const ZOOM_SCALE = 3;
const INITIAL_IMAGE_TRANSFORM = {
  scale: 1,
  translateX: 0,
  translateY: 0,
  config: {
    clamp: true,
    friction: 20,
    mass: 0.5,
    tension: 350
  }
};
function Lightbox({
  children,
  close,
  getConversation,
  media,
  i18n,
  isViewOnce = false,
  onForward,
  onSave,
  selectedIndex: initialSelectedIndex = 0
}) {
  const [root, setRoot] = import_react.default.useState();
  const [selectedIndex, setSelectedIndex] = (0, import_react.useState)(initialSelectedIndex);
  const [videoElement, setVideoElement] = (0, import_react.useState)(null);
  const [videoTime, setVideoTime] = (0, import_react.useState)();
  const [isZoomed, setIsZoomed] = (0, import_react.useState)(false);
  const containerRef = (0, import_react.useRef)(null);
  const [focusRef] = (0, import_useRestoreFocus.useRestoreFocus)();
  const animateRef = (0, import_react.useRef)(null);
  const dragCacheRef = (0, import_react.useRef)();
  const imageRef = (0, import_react.useRef)(null);
  const zoomCacheRef = (0, import_react.useRef)();
  const onPrevious = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isZoomed) {
      return;
    }
    setSelectedIndex((prevSelectedIndex) => Math.max(prevSelectedIndex - 1, 0));
  }, [isZoomed]);
  const onNext = (0, import_react.useCallback)((event) => {
    event.preventDefault();
    event.stopPropagation();
    if (isZoomed) {
      return;
    }
    setSelectedIndex((prevSelectedIndex) => Math.min(prevSelectedIndex + 1, media.length - 1));
  }, [isZoomed, media]);
  const onTimeUpdate = (0, import_react.useCallback)(() => {
    if (!videoElement) {
      return;
    }
    setVideoTime(videoElement.currentTime);
  }, [setVideoTime, videoElement]);
  const handleSave = /* @__PURE__ */ __name((event) => {
    event.stopPropagation();
    event.preventDefault();
    const mediaItem = media[selectedIndex];
    const { attachment: attachment2, message: message2, index } = mediaItem;
    onSave?.({ attachment: attachment2, message: message2, index });
  }, "handleSave");
  const handleForward = /* @__PURE__ */ __name((event) => {
    event.preventDefault();
    event.stopPropagation();
    close();
    const mediaItem = media[selectedIndex];
    onForward?.(mediaItem.message.id);
  }, "handleForward");
  const onKeyDown = (0, import_react.useCallback)((event) => {
    switch (event.key) {
      case "Escape": {
        close();
        event.preventDefault();
        event.stopPropagation();
        break;
      }
      case "ArrowLeft":
        onPrevious(event);
        break;
      case "ArrowRight":
        onNext(event);
        break;
      default:
    }
  }, [close, onNext, onPrevious]);
  const onClose = /* @__PURE__ */ __name((event) => {
    event.stopPropagation();
    event.preventDefault();
    close();
  }, "onClose");
  const playVideo = (0, import_react.useCallback)(() => {
    if (!videoElement) {
      return;
    }
    if (videoElement.paused) {
      videoElement.play();
    } else {
      videoElement.pause();
    }
  }, [videoElement]);
  (0, import_react.useEffect)(() => {
    const div = document.createElement("div");
    document.body.appendChild(div);
    setRoot(div);
    return () => {
      document.body.removeChild(div);
      setRoot(void 0);
    };
  }, []);
  (0, import_react.useEffect)(() => {
    const useCapture = true;
    document.addEventListener("keydown", onKeyDown, useCapture);
    return () => {
      document.removeEventListener("keydown", onKeyDown, useCapture);
    };
  }, [onKeyDown]);
  const {
    attachment,
    contentType,
    loop = false,
    objectURL,
    message
  } = media[selectedIndex] || {};
  const isAttachmentGIF = (0, import_Attachment.isGIF)(attachment ? [attachment] : void 0);
  (0, import_react.useEffect)(() => {
    playVideo();
    if (!videoElement || !isViewOnce) {
      return import_lodash.noop;
    }
    if (isAttachmentGIF) {
      return import_lodash.noop;
    }
    videoElement.addEventListener("timeupdate", onTimeUpdate);
    return () => {
      videoElement.removeEventListener("timeupdate", onTimeUpdate);
    };
  }, [isViewOnce, isAttachmentGIF, onTimeUpdate, playVideo, videoElement]);
  const [{ scale, translateX, translateY }, springApi] = (0, import_web.useSpring)(() => INITIAL_IMAGE_TRANSFORM);
  const maxBoundsLimiter = (0, import_react.useCallback)((x, y) => {
    const zoomCache = zoomCacheRef.current;
    if (!zoomCache) {
      return [0, 0];
    }
    const { maxX, maxY } = zoomCache;
    const posX = Math.min(maxX, Math.max(-maxX, x));
    const posY = Math.min(maxY, Math.max(-maxY, y));
    return [posX, posY];
  }, []);
  const positionImage = (0, import_react.useCallback)((ev) => {
    const zoomCache = zoomCacheRef.current;
    if (!zoomCache) {
      return;
    }
    const { maxX, maxY, screenWidth, screenHeight } = zoomCache;
    const shouldTranslateX = maxX * ZOOM_SCALE > screenWidth;
    const shouldTranslateY = maxY * ZOOM_SCALE > screenHeight;
    const offsetX = screenWidth / 2 - ev.clientX;
    const offsetY = screenHeight / 2 - ev.clientY;
    const posX = offsetX * ZOOM_SCALE;
    const posY = offsetY * ZOOM_SCALE;
    const [x, y] = maxBoundsLimiter(posX, posY);
    springApi.start({
      scale: ZOOM_SCALE,
      translateX: shouldTranslateX ? x : void 0,
      translateY: shouldTranslateY ? y : void 0
    });
  }, [maxBoundsLimiter, springApi]);
  const handleTouchStart = (0, import_react.useCallback)((ev) => {
    const [touch] = ev.touches;
    dragCacheRef.current = {
      startX: touch.clientX,
      startY: touch.clientY,
      translateX: translateX.get(),
      translateY: translateY.get()
    };
  }, [translateY, translateX]);
  const handleTouchMove = (0, import_react.useCallback)((ev) => {
    const dragCache = dragCacheRef.current;
    if (!dragCache) {
      return;
    }
    const [touch] = ev.touches;
    const deltaX = touch.clientX - dragCache.startX;
    const deltaY = touch.clientY - dragCache.startY;
    const x = dragCache.translateX + deltaX;
    const y = dragCache.translateY + deltaY;
    springApi.start({
      scale: ZOOM_SCALE,
      translateX: x,
      translateY: y
    });
  }, [springApi]);
  const zoomButtonHandler = (0, import_react.useCallback)((ev) => {
    ev.preventDefault();
    ev.stopPropagation();
    const imageNode = imageRef.current;
    const animateNode = animateRef.current;
    if (!imageNode || !animateNode) {
      return;
    }
    if (!isZoomed) {
      const maxX = imageNode.offsetWidth;
      const maxY = imageNode.offsetHeight;
      const screenHeight = window.innerHeight;
      const screenWidth = window.innerWidth;
      zoomCacheRef.current = {
        maxX,
        maxY,
        screenHeight,
        screenWidth
      };
      const shouldTranslateX = maxX * ZOOM_SCALE > screenWidth;
      const shouldTranslateY = maxY * ZOOM_SCALE > screenHeight;
      const { height, left, top, width } = animateNode.getBoundingClientRect();
      const offsetX = ev.clientX - left - width / 2;
      const offsetY = ev.clientY - top - height / 2;
      const posX = -offsetX * ZOOM_SCALE + translateX.get();
      const posY = -offsetY * ZOOM_SCALE + translateY.get();
      const [x, y] = maxBoundsLimiter(posX, posY);
      springApi.start({
        scale: ZOOM_SCALE,
        translateX: shouldTranslateX ? x : void 0,
        translateY: shouldTranslateY ? y : void 0
      });
      setIsZoomed(true);
    } else {
      springApi.start(INITIAL_IMAGE_TRANSFORM);
      setIsZoomed(false);
    }
  }, [isZoomed, maxBoundsLimiter, translateX, translateY, springApi]);
  (0, import_react.useEffect)(() => {
    const animateNode = animateRef.current;
    let hasListener = false;
    if (animateNode && isZoomed) {
      hasListener = true;
      document.addEventListener("mousemove", positionImage);
      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchstart", handleTouchStart);
    }
    return () => {
      if (hasListener) {
        document.removeEventListener("mousemove", positionImage);
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchstart", handleTouchStart);
      }
    };
  }, [handleTouchMove, handleTouchStart, isZoomed, positionImage]);
  const caption = attachment?.caption;
  let content;
  if (!contentType) {
    content = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, children);
  } else {
    const isImageTypeSupported = GoogleChrome.isImageTypeSupported(contentType);
    const isVideoTypeSupported = GoogleChrome.isVideoTypeSupported(contentType);
    const isUnsupportedImageType = !isImageTypeSupported && (0, import_MIME.isImage)(contentType);
    const isUnsupportedVideoType = !isVideoTypeSupported && (0, import_MIME.isVideo)(contentType);
    if (isImageTypeSupported) {
      if (objectURL) {
        content = /* @__PURE__ */ import_react.default.createElement("div", {
          className: "Lightbox__zoomable-container"
        }, /* @__PURE__ */ import_react.default.createElement("button", {
          className: "Lightbox__zoom-button",
          onClick: zoomButtonHandler,
          type: "button"
        }, /* @__PURE__ */ import_react.default.createElement("img", {
          alt: i18n("lightboxImageAlt"),
          className: "Lightbox__object",
          onContextMenu: (ev) => {
            if (ev && contentType !== import_MIME.IMAGE_PNG && !/image\/jpe?g/g.test(contentType)) {
              ev.preventDefault();
            }
          },
          src: objectURL,
          ref: imageRef
        })));
      } else {
        content = /* @__PURE__ */ import_react.default.createElement("button", {
          "aria-label": i18n("lightboxImageAlt"),
          className: (0, import_classnames.default)({
            Lightbox__object: true,
            Lightbox__unsupported: true,
            "Lightbox__unsupported--missing": true
          }),
          onClick: onClose,
          type: "button"
        });
      }
    } else if (isVideoTypeSupported) {
      const shouldLoop = loop || isAttachmentGIF || isViewOnce;
      content = /* @__PURE__ */ import_react.default.createElement("video", {
        className: "Lightbox__object",
        controls: !shouldLoop,
        key: objectURL,
        loop: shouldLoop,
        ref: setVideoElement
      }, /* @__PURE__ */ import_react.default.createElement("source", {
        src: objectURL
      }));
    } else if (isUnsupportedImageType || isUnsupportedVideoType) {
      content = /* @__PURE__ */ import_react.default.createElement("button", {
        "aria-label": i18n("unsupportedAttachment"),
        className: (0, import_classnames.default)({
          Lightbox__object: true,
          Lightbox__unsupported: true,
          "Lightbox__unsupported--image": isUnsupportedImageType,
          "Lightbox__unsupported--video": isUnsupportedVideoType
        }),
        onClick: onClose,
        type: "button"
      });
    } else {
      log.info("Lightbox: Unexpected content type", { contentType });
      content = /* @__PURE__ */ import_react.default.createElement("button", {
        "aria-label": i18n("unsupportedAttachment"),
        className: "Lightbox__object Lightbox__unsupported Lightbox__unsupported--file",
        onClick: onClose,
        type: "button"
      });
    }
  }
  const hasNext = !isZoomed && selectedIndex < media.length - 1;
  const hasPrevious = !isZoomed && selectedIndex > 0;
  return root ? (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("Lightbox Lightbox__container", {
      "Lightbox__container--zoom": isZoomed
    }),
    onClick: (event) => {
      event.stopPropagation();
      event.preventDefault();
      close();
    },
    onKeyUp: (event) => {
      if (containerRef && event.target !== containerRef.current || event.keyCode !== 27) {
        return;
      }
      close();
    },
    ref: containerRef,
    role: "presentation"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__animated"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__main-container",
    tabIndex: -1,
    ref: focusRef
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header"
  }, getConversation ? /* @__PURE__ */ import_react.default.createElement(LightboxHeader, {
    getConversation,
    i18n,
    message
  }) : /* @__PURE__ */ import_react.default.createElement("div", null), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__controls"
  }, onForward ? /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("forwardMessage"),
    className: "Lightbox__button Lightbox__button--forward",
    onClick: handleForward,
    type: "button"
  }) : null, onSave ? /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("save"),
    className: "Lightbox__button Lightbox__button--save",
    onClick: handleSave,
    type: "button"
  }) : null, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("close"),
    className: "Lightbox__button Lightbox__button--close",
    onClick: close,
    type: "button"
  }))), /* @__PURE__ */ import_react.default.createElement(import_web.animated.div, {
    className: (0, import_classnames.default)("Lightbox__object--container", {
      "Lightbox__object--container--zoom": isZoomed
    }),
    ref: animateRef,
    style: {
      transform: (0, import_web.to)([scale, translateX, translateY], (s, x, y) => `translate(${x}px, ${y}px) scale(${s})`)
    }
  }, content), hasPrevious && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__nav-prev"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("previous"),
    className: "Lightbox__button Lightbox__button--previous",
    onClick: onPrevious,
    type: "button"
  })), hasNext && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__nav-next"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("next"),
    className: "Lightbox__button Lightbox__button--next",
    onClick: onNext,
    type: "button"
  }))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__footer"
  }, isViewOnce && videoTime ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__timestamp"
  }, (0, import_formatDuration.formatDuration)(videoTime)) : null, caption ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__caption"
  }, caption) : null, media.length > 1 && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__thumbnails--container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__thumbnails",
    style: {
      marginLeft: 0 - (selectedIndex * 64 + selectedIndex * 8 + 32)
    }
  }, media.map((item, index) => /* @__PURE__ */ import_react.default.createElement("button", {
    className: (0, import_classnames.default)({
      Lightbox__thumbnail: true,
      "Lightbox__thumbnail--selected": index === selectedIndex
    }),
    key: item.thumbnailObjectUrl,
    type: "button",
    onClick: (event) => {
      event.stopPropagation();
      event.preventDefault();
      setSelectedIndex(index);
    }
  }, item.thumbnailObjectUrl ? /* @__PURE__ */ import_react.default.createElement("img", {
    alt: i18n("lightboxImageAlt"),
    src: item.thumbnailObjectUrl
  }) : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__thumbnail--unavailable"
  })))))))), root) : null;
}
function LightboxHeader({
  getConversation,
  i18n,
  message
}) {
  const conversation = getConversation(message.conversationId);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header--container"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header--avatar"
  }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
    acceptedMessageRequest: conversation.acceptedMessageRequest,
    avatarPath: conversation.avatarPath,
    badge: void 0,
    color: conversation.color,
    conversationType: conversation.type,
    i18n,
    isMe: conversation.isMe,
    name: conversation.name,
    phoneNumber: conversation.e164,
    profileName: conversation.profileName,
    sharedGroupNames: conversation.sharedGroupNames,
    size: import_Avatar.AvatarSize.THIRTY_TWO,
    title: conversation.title,
    unblurredAvatarPath: conversation.unblurredAvatarPath
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header--content"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header--name"
  }, conversation.title), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "Lightbox__header--timestamp"
  }, (0, import_moment.default)(message.received_at_ms).format("L LT"))));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Lightbox
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGlnaHRib3gudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlQ2FsbGJhY2ssIHVzZUVmZmVjdCwgdXNlUmVmLCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgY3JlYXRlUG9ydGFsIH0gZnJvbSAncmVhY3QtZG9tJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdXNlU3ByaW5nLCBhbmltYXRlZCwgdG8gfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5cbmltcG9ydCAqIGFzIEdvb2dsZUNocm9tZSBmcm9tICcuLi91dGlsL0dvb2dsZUNocm9tZSc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBpc0dJRiB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgQXZhdGFyLCBBdmF0YXJTaXplIH0gZnJvbSAnLi9BdmF0YXInO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBJTUFHRV9QTkcsIGlzSW1hZ2UsIGlzVmlkZW8gfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBNZWRpYUl0ZW1UeXBlLCBNZWRpYUl0ZW1NZXNzYWdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgeyBmb3JtYXREdXJhdGlvbiB9IGZyb20gJy4uL3V0aWwvZm9ybWF0RHVyYXRpb24nO1xuaW1wb3J0IHsgdXNlUmVzdG9yZUZvY3VzIH0gZnJvbSAnLi4vaG9va3MvdXNlUmVzdG9yZUZvY3VzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgY2hpbGRyZW4/OiBSZWFjdE5vZGU7XG4gIGNsb3NlOiAoKSA9PiB2b2lkO1xuICBnZXRDb252ZXJzYXRpb24/OiAoaWQ6IHN0cmluZykgPT4gQ29udmVyc2F0aW9uVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNWaWV3T25jZT86IGJvb2xlYW47XG4gIG1lZGlhOiBBcnJheTxNZWRpYUl0ZW1UeXBlPjtcbiAgb25Gb3J3YXJkPzogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBvblNhdmU/OiAob3B0aW9uczoge1xuICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICAgIG1lc3NhZ2U6IE1lZGlhSXRlbU1lc3NhZ2VUeXBlO1xuICAgIGluZGV4OiBudW1iZXI7XG4gIH0pID0+IHZvaWQ7XG4gIHNlbGVjdGVkSW5kZXg/OiBudW1iZXI7XG59O1xuXG5jb25zdCBaT09NX1NDQUxFID0gMztcblxuY29uc3QgSU5JVElBTF9JTUFHRV9UUkFOU0ZPUk0gPSB7XG4gIHNjYWxlOiAxLFxuICB0cmFuc2xhdGVYOiAwLFxuICB0cmFuc2xhdGVZOiAwLFxuICBjb25maWc6IHtcbiAgICBjbGFtcDogdHJ1ZSxcbiAgICBmcmljdGlvbjogMjAsXG4gICAgbWFzczogMC41LFxuICAgIHRlbnNpb246IDM1MCxcbiAgfSxcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBMaWdodGJveCh7XG4gIGNoaWxkcmVuLFxuICBjbG9zZSxcbiAgZ2V0Q29udmVyc2F0aW9uLFxuICBtZWRpYSxcbiAgaTE4bixcbiAgaXNWaWV3T25jZSA9IGZhbHNlLFxuICBvbkZvcndhcmQsXG4gIG9uU2F2ZSxcbiAgc2VsZWN0ZWRJbmRleDogaW5pdGlhbFNlbGVjdGVkSW5kZXggPSAwLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgY29uc3QgW3Jvb3QsIHNldFJvb3RdID0gUmVhY3QudXNlU3RhdGU8SFRNTEVsZW1lbnQgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtzZWxlY3RlZEluZGV4LCBzZXRTZWxlY3RlZEluZGV4XSA9XG4gICAgdXNlU3RhdGU8bnVtYmVyPihpbml0aWFsU2VsZWN0ZWRJbmRleCk7XG5cbiAgY29uc3QgW3ZpZGVvRWxlbWVudCwgc2V0VmlkZW9FbGVtZW50XSA9IHVzZVN0YXRlPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihcbiAgICBudWxsXG4gICk7XG4gIGNvbnN0IFt2aWRlb1RpbWUsIHNldFZpZGVvVGltZV0gPSB1c2VTdGF0ZTxudW1iZXIgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtpc1pvb21lZCwgc2V0SXNab29tZWRdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBjb250YWluZXJSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW2ZvY3VzUmVmXSA9IHVzZVJlc3RvcmVGb2N1cygpO1xuICBjb25zdCBhbmltYXRlUmVmID0gdXNlUmVmPEhUTUxEaXZFbGVtZW50IHwgbnVsbD4obnVsbCk7XG4gIGNvbnN0IGRyYWdDYWNoZVJlZiA9IHVzZVJlZjxcbiAgICB8IHtcbiAgICAgICAgc3RhcnRYOiBudW1iZXI7XG4gICAgICAgIHN0YXJ0WTogbnVtYmVyO1xuICAgICAgICB0cmFuc2xhdGVYOiBudW1iZXI7XG4gICAgICAgIHRyYW5zbGF0ZVk6IG51bWJlcjtcbiAgICAgIH1cbiAgICB8IHVuZGVmaW5lZFxuICA+KCk7XG4gIGNvbnN0IGltYWdlUmVmID0gdXNlUmVmPEhUTUxJbWFnZUVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3Qgem9vbUNhY2hlUmVmID0gdXNlUmVmPFxuICAgIHwge1xuICAgICAgICBtYXhYOiBudW1iZXI7XG4gICAgICAgIG1heFk6IG51bWJlcjtcbiAgICAgICAgc2NyZWVuV2lkdGg6IG51bWJlcjtcbiAgICAgICAgc2NyZWVuSGVpZ2h0OiBudW1iZXI7XG4gICAgICB9XG4gICAgfCB1bmRlZmluZWRcbiAgPigpO1xuXG4gIGNvbnN0IG9uUHJldmlvdXMgPSB1c2VDYWxsYmFjayhcbiAgICAoXG4gICAgICBldmVudDogS2V5Ym9hcmRFdmVudCB8IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEJ1dHRvbkVsZW1lbnQsIE1vdXNlRXZlbnQ+XG4gICAgKSA9PiB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIGlmIChpc1pvb21lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFNlbGVjdGVkSW5kZXgocHJldlNlbGVjdGVkSW5kZXggPT4gTWF0aC5tYXgocHJldlNlbGVjdGVkSW5kZXggLSAxLCAwKSk7XG4gICAgfSxcbiAgICBbaXNab29tZWRdXG4gICk7XG5cbiAgY29uc3Qgb25OZXh0ID0gdXNlQ2FsbGJhY2soXG4gICAgKFxuICAgICAgZXZlbnQ6IEtleWJvYXJkRXZlbnQgfCBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PlxuICAgICkgPT4ge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBpZiAoaXNab29tZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBzZXRTZWxlY3RlZEluZGV4KHByZXZTZWxlY3RlZEluZGV4ID0+XG4gICAgICAgIE1hdGgubWluKHByZXZTZWxlY3RlZEluZGV4ICsgMSwgbWVkaWEubGVuZ3RoIC0gMSlcbiAgICAgICk7XG4gICAgfSxcbiAgICBbaXNab29tZWQsIG1lZGlhXVxuICApO1xuXG4gIGNvbnN0IG9uVGltZVVwZGF0ZSA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXZpZGVvRWxlbWVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBzZXRWaWRlb1RpbWUodmlkZW9FbGVtZW50LmN1cnJlbnRUaW1lKTtcbiAgfSwgW3NldFZpZGVvVGltZSwgdmlkZW9FbGVtZW50XSk7XG5cbiAgY29uc3QgaGFuZGxlU2F2ZSA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD5cbiAgKSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNvbnN0IG1lZGlhSXRlbSA9IG1lZGlhW3NlbGVjdGVkSW5kZXhdO1xuICAgIGNvbnN0IHsgYXR0YWNobWVudCwgbWVzc2FnZSwgaW5kZXggfSA9IG1lZGlhSXRlbTtcblxuICAgIG9uU2F2ZT8uKHsgYXR0YWNobWVudCwgbWVzc2FnZSwgaW5kZXggfSk7XG4gIH07XG5cbiAgY29uc3QgaGFuZGxlRm9yd2FyZCA9IChcbiAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD5cbiAgKSA9PiB7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgIGNsb3NlKCk7XG4gICAgY29uc3QgbWVkaWFJdGVtID0gbWVkaWFbc2VsZWN0ZWRJbmRleF07XG4gICAgb25Gb3J3YXJkPy4obWVkaWFJdGVtLm1lc3NhZ2UuaWQpO1xuICB9O1xuXG4gIGNvbnN0IG9uS2V5RG93biA9IHVzZUNhbGxiYWNrKFxuICAgIChldmVudDogS2V5Ym9hcmRFdmVudCkgPT4ge1xuICAgICAgc3dpdGNoIChldmVudC5rZXkpIHtcbiAgICAgICAgY2FzZSAnRXNjYXBlJzoge1xuICAgICAgICAgIGNsb3NlKCk7XG5cbiAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cblxuICAgICAgICBjYXNlICdBcnJvd0xlZnQnOlxuICAgICAgICAgIG9uUHJldmlvdXMoZXZlbnQpO1xuICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgIGNhc2UgJ0Fycm93UmlnaHQnOlxuICAgICAgICAgIG9uTmV4dChldmVudCk7XG4gICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgZGVmYXVsdDpcbiAgICAgIH1cbiAgICB9LFxuICAgIFtjbG9zZSwgb25OZXh0LCBvblByZXZpb3VzXVxuICApO1xuXG4gIGNvbnN0IG9uQ2xvc2UgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQ8SFRNTEVsZW1lbnQ+KSA9PiB7XG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgIGNsb3NlKCk7XG4gIH07XG5cbiAgY29uc3QgcGxheVZpZGVvID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGlmICghdmlkZW9FbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHZpZGVvRWxlbWVudC5wYXVzZWQpIHtcbiAgICAgIHZpZGVvRWxlbWVudC5wbGF5KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHZpZGVvRWxlbWVudC5wYXVzZSgpO1xuICAgIH1cbiAgfSwgW3ZpZGVvRWxlbWVudF0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgZGl2ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChkaXYpO1xuICAgIHNldFJvb3QoZGl2KTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGRpdik7XG4gICAgICBzZXRSb290KHVuZGVmaW5lZCk7XG4gICAgfTtcbiAgfSwgW10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgdXNlQ2FwdHVyZSA9IHRydWU7XG4gICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgdXNlQ2FwdHVyZSk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIG9uS2V5RG93biwgdXNlQ2FwdHVyZSk7XG4gICAgfTtcbiAgfSwgW29uS2V5RG93bl0pO1xuXG4gIGNvbnN0IHtcbiAgICBhdHRhY2htZW50LFxuICAgIGNvbnRlbnRUeXBlLFxuICAgIGxvb3AgPSBmYWxzZSxcbiAgICBvYmplY3RVUkwsXG4gICAgbWVzc2FnZSxcbiAgfSA9IG1lZGlhW3NlbGVjdGVkSW5kZXhdIHx8IHt9O1xuXG4gIGNvbnN0IGlzQXR0YWNobWVudEdJRiA9IGlzR0lGKGF0dGFjaG1lbnQgPyBbYXR0YWNobWVudF0gOiB1bmRlZmluZWQpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgcGxheVZpZGVvKCk7XG5cbiAgICBpZiAoIXZpZGVvRWxlbWVudCB8fCAhaXNWaWV3T25jZSkge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgaWYgKGlzQXR0YWNobWVudEdJRikge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgdmlkZW9FbGVtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RpbWV1cGRhdGUnLCBvblRpbWVVcGRhdGUpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHZpZGVvRWxlbWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0aW1ldXBkYXRlJywgb25UaW1lVXBkYXRlKTtcbiAgICB9O1xuICB9LCBbaXNWaWV3T25jZSwgaXNBdHRhY2htZW50R0lGLCBvblRpbWVVcGRhdGUsIHBsYXlWaWRlbywgdmlkZW9FbGVtZW50XSk7XG5cbiAgY29uc3QgW3sgc2NhbGUsIHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVkgfSwgc3ByaW5nQXBpXSA9IHVzZVNwcmluZyhcbiAgICAoKSA9PiBJTklUSUFMX0lNQUdFX1RSQU5TRk9STVxuICApO1xuXG4gIGNvbnN0IG1heEJvdW5kc0xpbWl0ZXIgPSB1c2VDYWxsYmFjayhcbiAgICAoeDogbnVtYmVyLCB5OiBudW1iZXIpOiBbbnVtYmVyLCBudW1iZXJdID0+IHtcbiAgICAgIGNvbnN0IHpvb21DYWNoZSA9IHpvb21DYWNoZVJlZi5jdXJyZW50O1xuXG4gICAgICBpZiAoIXpvb21DYWNoZSkge1xuICAgICAgICByZXR1cm4gWzAsIDBdO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IG1heFgsIG1heFkgfSA9IHpvb21DYWNoZTtcblxuICAgICAgY29uc3QgcG9zWCA9IE1hdGgubWluKG1heFgsIE1hdGgubWF4KC1tYXhYLCB4KSk7XG4gICAgICBjb25zdCBwb3NZID0gTWF0aC5taW4obWF4WSwgTWF0aC5tYXgoLW1heFksIHkpKTtcblxuICAgICAgcmV0dXJuIFtwb3NYLCBwb3NZXTtcbiAgICB9LFxuICAgIFtdXG4gICk7XG5cbiAgY29uc3QgcG9zaXRpb25JbWFnZSA9IHVzZUNhbGxiYWNrKFxuICAgIChldjogTW91c2VFdmVudCkgPT4ge1xuICAgICAgY29uc3Qgem9vbUNhY2hlID0gem9vbUNhY2hlUmVmLmN1cnJlbnQ7XG5cbiAgICAgIGlmICghem9vbUNhY2hlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBtYXhYLCBtYXhZLCBzY3JlZW5XaWR0aCwgc2NyZWVuSGVpZ2h0IH0gPSB6b29tQ2FjaGU7XG5cbiAgICAgIGNvbnN0IHNob3VsZFRyYW5zbGF0ZVggPSBtYXhYICogWk9PTV9TQ0FMRSA+IHNjcmVlbldpZHRoO1xuICAgICAgY29uc3Qgc2hvdWxkVHJhbnNsYXRlWSA9IG1heFkgKiBaT09NX1NDQUxFID4gc2NyZWVuSGVpZ2h0O1xuXG4gICAgICBjb25zdCBvZmZzZXRYID0gc2NyZWVuV2lkdGggLyAyIC0gZXYuY2xpZW50WDtcbiAgICAgIGNvbnN0IG9mZnNldFkgPSBzY3JlZW5IZWlnaHQgLyAyIC0gZXYuY2xpZW50WTtcbiAgICAgIGNvbnN0IHBvc1ggPSBvZmZzZXRYICogWk9PTV9TQ0FMRTtcbiAgICAgIGNvbnN0IHBvc1kgPSBvZmZzZXRZICogWk9PTV9TQ0FMRTtcbiAgICAgIGNvbnN0IFt4LCB5XSA9IG1heEJvdW5kc0xpbWl0ZXIocG9zWCwgcG9zWSk7XG5cbiAgICAgIHNwcmluZ0FwaS5zdGFydCh7XG4gICAgICAgIHNjYWxlOiBaT09NX1NDQUxFLFxuICAgICAgICB0cmFuc2xhdGVYOiBzaG91bGRUcmFuc2xhdGVYID8geCA6IHVuZGVmaW5lZCxcbiAgICAgICAgdHJhbnNsYXRlWTogc2hvdWxkVHJhbnNsYXRlWSA/IHkgOiB1bmRlZmluZWQsXG4gICAgICB9KTtcbiAgICB9LFxuICAgIFttYXhCb3VuZHNMaW1pdGVyLCBzcHJpbmdBcGldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlVG91Y2hTdGFydCA9IHVzZUNhbGxiYWNrKFxuICAgIChldjogVG91Y2hFdmVudCkgPT4ge1xuICAgICAgY29uc3QgW3RvdWNoXSA9IGV2LnRvdWNoZXM7XG5cbiAgICAgIGRyYWdDYWNoZVJlZi5jdXJyZW50ID0ge1xuICAgICAgICBzdGFydFg6IHRvdWNoLmNsaWVudFgsXG4gICAgICAgIHN0YXJ0WTogdG91Y2guY2xpZW50WSxcbiAgICAgICAgdHJhbnNsYXRlWDogdHJhbnNsYXRlWC5nZXQoKSxcbiAgICAgICAgdHJhbnNsYXRlWTogdHJhbnNsYXRlWS5nZXQoKSxcbiAgICAgIH07XG4gICAgfSxcbiAgICBbdHJhbnNsYXRlWSwgdHJhbnNsYXRlWF1cbiAgKTtcblxuICBjb25zdCBoYW5kbGVUb3VjaE1vdmUgPSB1c2VDYWxsYmFjayhcbiAgICAoZXY6IFRvdWNoRXZlbnQpID0+IHtcbiAgICAgIGNvbnN0IGRyYWdDYWNoZSA9IGRyYWdDYWNoZVJlZi5jdXJyZW50O1xuXG4gICAgICBpZiAoIWRyYWdDYWNoZSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IFt0b3VjaF0gPSBldi50b3VjaGVzO1xuXG4gICAgICBjb25zdCBkZWx0YVggPSB0b3VjaC5jbGllbnRYIC0gZHJhZ0NhY2hlLnN0YXJ0WDtcbiAgICAgIGNvbnN0IGRlbHRhWSA9IHRvdWNoLmNsaWVudFkgLSBkcmFnQ2FjaGUuc3RhcnRZO1xuXG4gICAgICBjb25zdCB4ID0gZHJhZ0NhY2hlLnRyYW5zbGF0ZVggKyBkZWx0YVg7XG4gICAgICBjb25zdCB5ID0gZHJhZ0NhY2hlLnRyYW5zbGF0ZVkgKyBkZWx0YVk7XG5cbiAgICAgIHNwcmluZ0FwaS5zdGFydCh7XG4gICAgICAgIHNjYWxlOiBaT09NX1NDQUxFLFxuICAgICAgICB0cmFuc2xhdGVYOiB4LFxuICAgICAgICB0cmFuc2xhdGVZOiB5LFxuICAgICAgfSk7XG4gICAgfSxcbiAgICBbc3ByaW5nQXBpXVxuICApO1xuXG4gIGNvbnN0IHpvb21CdXR0b25IYW5kbGVyID0gdXNlQ2FsbGJhY2soXG4gICAgKGV2OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxCdXR0b25FbGVtZW50LCBNb3VzZUV2ZW50PikgPT4ge1xuICAgICAgZXYucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBpbWFnZU5vZGUgPSBpbWFnZVJlZi5jdXJyZW50O1xuICAgICAgY29uc3QgYW5pbWF0ZU5vZGUgPSBhbmltYXRlUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoIWltYWdlTm9kZSB8fCAhYW5pbWF0ZU5vZGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzWm9vbWVkKSB7XG4gICAgICAgIGNvbnN0IG1heFggPSBpbWFnZU5vZGUub2Zmc2V0V2lkdGg7XG4gICAgICAgIGNvbnN0IG1heFkgPSBpbWFnZU5vZGUub2Zmc2V0SGVpZ2h0O1xuICAgICAgICBjb25zdCBzY3JlZW5IZWlnaHQgPSB3aW5kb3cuaW5uZXJIZWlnaHQ7XG4gICAgICAgIGNvbnN0IHNjcmVlbldpZHRoID0gd2luZG93LmlubmVyV2lkdGg7XG5cbiAgICAgICAgem9vbUNhY2hlUmVmLmN1cnJlbnQgPSB7XG4gICAgICAgICAgbWF4WCxcbiAgICAgICAgICBtYXhZLFxuICAgICAgICAgIHNjcmVlbkhlaWdodCxcbiAgICAgICAgICBzY3JlZW5XaWR0aCxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBzaG91bGRUcmFuc2xhdGVYID0gbWF4WCAqIFpPT01fU0NBTEUgPiBzY3JlZW5XaWR0aDtcbiAgICAgICAgY29uc3Qgc2hvdWxkVHJhbnNsYXRlWSA9IG1heFkgKiBaT09NX1NDQUxFID4gc2NyZWVuSGVpZ2h0O1xuXG4gICAgICAgIGNvbnN0IHsgaGVpZ2h0LCBsZWZ0LCB0b3AsIHdpZHRoIH0gPVxuICAgICAgICAgIGFuaW1hdGVOb2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuXG4gICAgICAgIGNvbnN0IG9mZnNldFggPSBldi5jbGllbnRYIC0gbGVmdCAtIHdpZHRoIC8gMjtcbiAgICAgICAgY29uc3Qgb2Zmc2V0WSA9IGV2LmNsaWVudFkgLSB0b3AgLSBoZWlnaHQgLyAyO1xuICAgICAgICBjb25zdCBwb3NYID0gLW9mZnNldFggKiBaT09NX1NDQUxFICsgdHJhbnNsYXRlWC5nZXQoKTtcbiAgICAgICAgY29uc3QgcG9zWSA9IC1vZmZzZXRZICogWk9PTV9TQ0FMRSArIHRyYW5zbGF0ZVkuZ2V0KCk7XG4gICAgICAgIGNvbnN0IFt4LCB5XSA9IG1heEJvdW5kc0xpbWl0ZXIocG9zWCwgcG9zWSk7XG5cbiAgICAgICAgc3ByaW5nQXBpLnN0YXJ0KHtcbiAgICAgICAgICBzY2FsZTogWk9PTV9TQ0FMRSxcbiAgICAgICAgICB0cmFuc2xhdGVYOiBzaG91bGRUcmFuc2xhdGVYID8geCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB0cmFuc2xhdGVZOiBzaG91bGRUcmFuc2xhdGVZID8geSA6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgc2V0SXNab29tZWQodHJ1ZSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBzcHJpbmdBcGkuc3RhcnQoSU5JVElBTF9JTUFHRV9UUkFOU0ZPUk0pO1xuICAgICAgICBzZXRJc1pvb21lZChmYWxzZSk7XG4gICAgICB9XG4gICAgfSxcbiAgICBbaXNab29tZWQsIG1heEJvdW5kc0xpbWl0ZXIsIHRyYW5zbGF0ZVgsIHRyYW5zbGF0ZVksIHNwcmluZ0FwaV1cbiAgKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGFuaW1hdGVOb2RlID0gYW5pbWF0ZVJlZi5jdXJyZW50O1xuICAgIGxldCBoYXNMaXN0ZW5lciA9IGZhbHNlO1xuXG4gICAgaWYgKGFuaW1hdGVOb2RlICYmIGlzWm9vbWVkKSB7XG4gICAgICBoYXNMaXN0ZW5lciA9IHRydWU7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBwb3NpdGlvbkltYWdlKTtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIGhhbmRsZVRvdWNoTW92ZSk7XG4gICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaHN0YXJ0JywgaGFuZGxlVG91Y2hTdGFydCk7XG4gICAgfVxuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGlmIChoYXNMaXN0ZW5lcikge1xuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBwb3NpdGlvbkltYWdlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgaGFuZGxlVG91Y2hNb3ZlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2hzdGFydCcsIGhhbmRsZVRvdWNoU3RhcnQpO1xuICAgICAgfVxuICAgIH07XG4gIH0sIFtoYW5kbGVUb3VjaE1vdmUsIGhhbmRsZVRvdWNoU3RhcnQsIGlzWm9vbWVkLCBwb3NpdGlvbkltYWdlXSk7XG5cbiAgY29uc3QgY2FwdGlvbiA9IGF0dGFjaG1lbnQ/LmNhcHRpb247XG5cbiAgbGV0IGNvbnRlbnQ6IEpTWC5FbGVtZW50O1xuICBpZiAoIWNvbnRlbnRUeXBlKSB7XG4gICAgY29udGVudCA9IDw+e2NoaWxkcmVufTwvPjtcbiAgfSBlbHNlIHtcbiAgICBjb25zdCBpc0ltYWdlVHlwZVN1cHBvcnRlZCA9IEdvb2dsZUNocm9tZS5pc0ltYWdlVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSk7XG4gICAgY29uc3QgaXNWaWRlb1R5cGVTdXBwb3J0ZWQgPSBHb29nbGVDaHJvbWUuaXNWaWRlb1R5cGVTdXBwb3J0ZWQoY29udGVudFR5cGUpO1xuICAgIGNvbnN0IGlzVW5zdXBwb3J0ZWRJbWFnZVR5cGUgPVxuICAgICAgIWlzSW1hZ2VUeXBlU3VwcG9ydGVkICYmIGlzSW1hZ2UoY29udGVudFR5cGUpO1xuICAgIGNvbnN0IGlzVW5zdXBwb3J0ZWRWaWRlb1R5cGUgPVxuICAgICAgIWlzVmlkZW9UeXBlU3VwcG9ydGVkICYmIGlzVmlkZW8oY29udGVudFR5cGUpO1xuXG4gICAgaWYgKGlzSW1hZ2VUeXBlU3VwcG9ydGVkKSB7XG4gICAgICBpZiAob2JqZWN0VVJMKSB7XG4gICAgICAgIGNvbnRlbnQgPSAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJMaWdodGJveF9fem9vbWFibGUtY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkxpZ2h0Ym94X196b29tLWJ1dHRvblwiXG4gICAgICAgICAgICAgIG9uQ2xpY2s9e3pvb21CdXR0b25IYW5kbGVyfVxuICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgPGltZ1xuICAgICAgICAgICAgICAgIGFsdD17aTE4bignbGlnaHRib3hJbWFnZUFsdCcpfVxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19vYmplY3RcIlxuICAgICAgICAgICAgICAgIG9uQ29udGV4dE1lbnU9eyhldjogUmVhY3QuTW91c2VFdmVudDxIVE1MSW1hZ2VFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgICAgICAgLy8gVGhlc2UgYXJlIHRoZSBvbmx5IGltYWdlIHR5cGVzIHN1cHBvcnRlZCBieSBFbGVjdHJvbidzIE5hdGl2ZUltYWdlXG4gICAgICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgICAgIGV2ICYmXG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlICE9PSBJTUFHRV9QTkcgJiZcbiAgICAgICAgICAgICAgICAgICAgIS9pbWFnZVxcL2pwZT9nL2cudGVzdChjb250ZW50VHlwZSlcbiAgICAgICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgc3JjPXtvYmplY3RVUkx9XG4gICAgICAgICAgICAgICAgcmVmPXtpbWFnZVJlZn1cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udGVudCA9IChcbiAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdsaWdodGJveEltYWdlQWx0Jyl9XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgICAgICBMaWdodGJveF9fb2JqZWN0OiB0cnVlLFxuICAgICAgICAgICAgICBMaWdodGJveF9fdW5zdXBwb3J0ZWQ6IHRydWUsXG4gICAgICAgICAgICAgICdMaWdodGJveF9fdW5zdXBwb3J0ZWQtLW1pc3NpbmcnOiB0cnVlLFxuICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICBvbkNsaWNrPXtvbkNsb3NlfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzVmlkZW9UeXBlU3VwcG9ydGVkKSB7XG4gICAgICBjb25zdCBzaG91bGRMb29wID0gbG9vcCB8fCBpc0F0dGFjaG1lbnRHSUYgfHwgaXNWaWV3T25jZTtcblxuICAgICAgY29udGVudCA9IChcbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgY2xhc3NOYW1lPVwiTGlnaHRib3hfX29iamVjdFwiXG4gICAgICAgICAgY29udHJvbHM9eyFzaG91bGRMb29wfVxuICAgICAgICAgIGtleT17b2JqZWN0VVJMfVxuICAgICAgICAgIGxvb3A9e3Nob3VsZExvb3B9XG4gICAgICAgICAgcmVmPXtzZXRWaWRlb0VsZW1lbnR9XG4gICAgICAgID5cbiAgICAgICAgICA8c291cmNlIHNyYz17b2JqZWN0VVJMfSAvPlxuICAgICAgICA8L3ZpZGVvPlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGlzVW5zdXBwb3J0ZWRJbWFnZVR5cGUgfHwgaXNVbnN1cHBvcnRlZFZpZGVvVHlwZSkge1xuICAgICAgY29udGVudCA9IChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3Vuc3VwcG9ydGVkQXR0YWNobWVudCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyh7XG4gICAgICAgICAgICBMaWdodGJveF9fb2JqZWN0OiB0cnVlLFxuICAgICAgICAgICAgTGlnaHRib3hfX3Vuc3VwcG9ydGVkOiB0cnVlLFxuICAgICAgICAgICAgJ0xpZ2h0Ym94X191bnN1cHBvcnRlZC0taW1hZ2UnOiBpc1Vuc3VwcG9ydGVkSW1hZ2VUeXBlLFxuICAgICAgICAgICAgJ0xpZ2h0Ym94X191bnN1cHBvcnRlZC0tdmlkZW8nOiBpc1Vuc3VwcG9ydGVkVmlkZW9UeXBlLFxuICAgICAgICAgIH0pfVxuICAgICAgICAgIG9uQ2xpY2s9e29uQ2xvc2V9XG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbygnTGlnaHRib3g6IFVuZXhwZWN0ZWQgY29udGVudCB0eXBlJywgeyBjb250ZW50VHlwZSB9KTtcblxuICAgICAgY29udGVudCA9IChcbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3Vuc3VwcG9ydGVkQXR0YWNobWVudCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19vYmplY3QgTGlnaHRib3hfX3Vuc3VwcG9ydGVkIExpZ2h0Ym94X191bnN1cHBvcnRlZC0tZmlsZVwiXG4gICAgICAgICAgb25DbGljaz17b25DbG9zZX1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3QgaGFzTmV4dCA9ICFpc1pvb21lZCAmJiBzZWxlY3RlZEluZGV4IDwgbWVkaWEubGVuZ3RoIC0gMTtcbiAgY29uc3QgaGFzUHJldmlvdXMgPSAhaXNab29tZWQgJiYgc2VsZWN0ZWRJbmRleCA+IDA7XG5cbiAgcmV0dXJuIHJvb3RcbiAgICA/IGNyZWF0ZVBvcnRhbChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcygnTGlnaHRib3ggTGlnaHRib3hfX2NvbnRhaW5lcicsIHtcbiAgICAgICAgICAgICdMaWdodGJveF9fY29udGFpbmVyLS16b29tJzogaXNab29tZWQsXG4gICAgICAgICAgfSl9XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgb25LZXlVcD17KGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PikgPT4ge1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAoY29udGFpbmVyUmVmICYmIGV2ZW50LnRhcmdldCAhPT0gY29udGFpbmVyUmVmLmN1cnJlbnQpIHx8XG4gICAgICAgICAgICAgIGV2ZW50LmtleUNvZGUgIT09IDI3XG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBjbG9zZSgpO1xuICAgICAgICAgIH19XG4gICAgICAgICAgcmVmPXtjb250YWluZXJSZWZ9XG4gICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgID5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19hbmltYXRlZFwiPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMaWdodGJveF9fbWFpbi1jb250YWluZXJcIlxuICAgICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICAgIHJlZj17Zm9jdXNSZWZ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTGlnaHRib3hfX2hlYWRlclwiPlxuICAgICAgICAgICAgICAgIHtnZXRDb252ZXJzYXRpb24gPyAoXG4gICAgICAgICAgICAgICAgICA8TGlnaHRib3hIZWFkZXJcbiAgICAgICAgICAgICAgICAgICAgZ2V0Q29udmVyc2F0aW9uPXtnZXRDb252ZXJzYXRpb259XG4gICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgIG1lc3NhZ2U9e21lc3NhZ2V9XG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICA8ZGl2IC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19jb250cm9sc1wiPlxuICAgICAgICAgICAgICAgICAge29uRm9yd2FyZCA/IChcbiAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2ZvcndhcmRNZXNzYWdlJyl9XG4gICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiTGlnaHRib3hfX2J1dHRvbiBMaWdodGJveF9fYnV0dG9uLS1mb3J3YXJkXCJcbiAgICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtoYW5kbGVGb3J3YXJkfVxuICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgICAgKSA6IG51bGx9XG4gICAgICAgICAgICAgICAgICB7b25TYXZlID8gKFxuICAgICAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignc2F2ZScpfVxuICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19idXR0b24gTGlnaHRib3hfX2J1dHRvbi0tc2F2ZVwiXG4gICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17aGFuZGxlU2F2ZX1cbiAgICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdjbG9zZScpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMaWdodGJveF9fYnV0dG9uIExpZ2h0Ym94X19idXR0b24tLWNsb3NlXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17Y2xvc2V9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxhbmltYXRlZC5kaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ0xpZ2h0Ym94X19vYmplY3QtLWNvbnRhaW5lcicsIHtcbiAgICAgICAgICAgICAgICAgICdMaWdodGJveF9fb2JqZWN0LS1jb250YWluZXItLXpvb20nOiBpc1pvb21lZCxcbiAgICAgICAgICAgICAgICB9KX1cbiAgICAgICAgICAgICAgICByZWY9e2FuaW1hdGVSZWZ9XG4gICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgIHRyYW5zZm9ybTogdG8oXG4gICAgICAgICAgICAgICAgICAgIFtzY2FsZSwgdHJhbnNsYXRlWCwgdHJhbnNsYXRlWV0sXG4gICAgICAgICAgICAgICAgICAgIChzLCB4LCB5KSA9PiBgdHJhbnNsYXRlKCR7eH1weCwgJHt5fXB4KSBzY2FsZSgke3N9KWBcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtjb250ZW50fVxuICAgICAgICAgICAgICA8L2FuaW1hdGVkLmRpdj5cbiAgICAgICAgICAgICAge2hhc1ByZXZpb3VzICYmIChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19uYXYtcHJldlwiPlxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdwcmV2aW91cycpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMaWdodGJveF9fYnV0dG9uIExpZ2h0Ym94X19idXR0b24tLXByZXZpb3VzXCJcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17b25QcmV2aW91c31cbiAgICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICB7aGFzTmV4dCAmJiAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJMaWdodGJveF9fbmF2LW5leHRcIj5cbiAgICAgICAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignbmV4dCcpfVxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMaWdodGJveF9fYnV0dG9uIExpZ2h0Ym94X19idXR0b24tLW5leHRcIlxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtvbk5leHR9XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJMaWdodGJveF9fZm9vdGVyXCI+XG4gICAgICAgICAgICAgIHtpc1ZpZXdPbmNlICYmIHZpZGVvVGltZSA/IChcbiAgICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X190aW1lc3RhbXBcIj5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXREdXJhdGlvbih2aWRlb1RpbWUpfVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAge2NhcHRpb24gPyAoXG4gICAgICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJMaWdodGJveF9fY2FwdGlvblwiPntjYXB0aW9ufTwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAge21lZGlhLmxlbmd0aCA+IDEgJiYgKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTGlnaHRib3hfX3RodW1ibmFpbHMtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMaWdodGJveF9fdGh1bWJuYWlsc1wiXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgICAgICAgbWFyZ2luTGVmdDpcbiAgICAgICAgICAgICAgICAgICAgICAgIDAgLSAoc2VsZWN0ZWRJbmRleCAqIDY0ICsgc2VsZWN0ZWRJbmRleCAqIDggKyAzMiksXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgIHttZWRpYS5tYXAoKGl0ZW0sIGluZGV4KSA9PiAoXG4gICAgICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgTGlnaHRib3hfX3RodW1ibmFpbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgJ0xpZ2h0Ym94X190aHVtYm5haWwtLXNlbGVjdGVkJzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBpbmRleCA9PT0gc2VsZWN0ZWRJbmRleCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgICAgICAgICAgICAga2V5PXtpdGVtLnRodW1ibmFpbE9iamVjdFVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KFxuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MQnV0dG9uRWxlbWVudCwgTW91c2VFdmVudD5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICBzZXRTZWxlY3RlZEluZGV4KGluZGV4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICAgICAge2l0ZW0udGh1bWJuYWlsT2JqZWN0VXJsID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgYWx0PXtpMThuKCdsaWdodGJveEltYWdlQWx0Jyl9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgc3JjPXtpdGVtLnRodW1ibmFpbE9iamVjdFVybH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICAgICAgICAgICkgOiAoXG4gICAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTGlnaHRib3hfX3RodW1ibmFpbC0tdW5hdmFpbGFibGVcIiAvPlxuICAgICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICAgICAgICAgICAgKSl9XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj4sXG4gICAgICAgIHJvb3RcbiAgICAgIClcbiAgICA6IG51bGw7XG59XG5cbmZ1bmN0aW9uIExpZ2h0Ym94SGVhZGVyKHtcbiAgZ2V0Q29udmVyc2F0aW9uLFxuICBpMThuLFxuICBtZXNzYWdlLFxufToge1xuICBnZXRDb252ZXJzYXRpb246IChpZDogc3RyaW5nKSA9PiBDb252ZXJzYXRpb25UeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBtZXNzYWdlOiBNZWRpYUl0ZW1NZXNzYWdlVHlwZTtcbn0pOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLmNvbnZlcnNhdGlvbklkKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiTGlnaHRib3hfX2hlYWRlci0tY29udGFpbmVyXCI+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19oZWFkZXItLWF2YXRhclwiPlxuICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdD17Y29udmVyc2F0aW9uLmFjY2VwdGVkTWVzc2FnZVJlcXVlc3R9XG4gICAgICAgICAgYXZhdGFyUGF0aD17Y29udmVyc2F0aW9uLmF2YXRhclBhdGh9XG4gICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICBjb2xvcj17Y29udmVyc2F0aW9uLmNvbG9yfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9e2NvbnZlcnNhdGlvbi50eXBlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNNZT17Y29udmVyc2F0aW9uLmlzTWV9XG4gICAgICAgICAgbmFtZT17Y29udmVyc2F0aW9uLm5hbWV9XG4gICAgICAgICAgcGhvbmVOdW1iZXI9e2NvbnZlcnNhdGlvbi5lMTY0fVxuICAgICAgICAgIHByb2ZpbGVOYW1lPXtjb252ZXJzYXRpb24ucHJvZmlsZU5hbWV9XG4gICAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17Y29udmVyc2F0aW9uLnNoYXJlZEdyb3VwTmFtZXN9XG4gICAgICAgICAgc2l6ZT17QXZhdGFyU2l6ZS5USElSVFlfVFdPfVxuICAgICAgICAgIHRpdGxlPXtjb252ZXJzYXRpb24udGl0bGV9XG4gICAgICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aD17Y29udmVyc2F0aW9uLnVuYmx1cnJlZEF2YXRhclBhdGh9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiTGlnaHRib3hfX2hlYWRlci0tY29udGVudFwiPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19oZWFkZXItLW5hbWVcIj57Y29udmVyc2F0aW9uLnRpdGxlfTwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkxpZ2h0Ym94X19oZWFkZXItLXRpbWVzdGFtcFwiPlxuICAgICAgICAgIHttb21lbnQobWVzc2FnZS5yZWNlaXZlZF9hdF9tcykuZm9ybWF0KCdMIExUJyl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWdFO0FBQ2hFLHdCQUF1QjtBQUN2QixvQkFBbUI7QUFDbkIsdUJBQTZCO0FBQzdCLG9CQUFxQjtBQUNyQixpQkFBd0M7QUFFeEMsbUJBQThCO0FBRTlCLHdCQUFzQjtBQUN0QixvQkFBbUM7QUFFbkMsa0JBQTRDO0FBRzVDLDRCQUErQjtBQUMvQiw2QkFBZ0M7QUFDaEMsVUFBcUI7QUFrQnJCLE1BQU0sYUFBYTtBQUVuQixNQUFNLDBCQUEwQjtBQUFBLEVBQzlCLE9BQU87QUFBQSxFQUNQLFlBQVk7QUFBQSxFQUNaLFlBQVk7QUFBQSxFQUNaLFFBQVE7QUFBQSxJQUNOLE9BQU87QUFBQSxJQUNQLFVBQVU7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
