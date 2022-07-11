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
var CallingPip_exports = {};
__export(CallingPip_exports, {
  CallingPip: () => CallingPip
});
module.exports = __toCommonJS(CallingPip_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_CallingPipRemoteVideo = require("./CallingPipRemoteVideo");
var import_missingCaseError = require("../util/missingCaseError");
var import_useActivateSpeakerViewOnPresenting = require("../hooks/useActivateSpeakerViewOnPresenting");
var PositionMode = /* @__PURE__ */ ((PositionMode2) => {
  PositionMode2[PositionMode2["BeingDragged"] = 0] = "BeingDragged";
  PositionMode2[PositionMode2["SnapToBottom"] = 1] = "SnapToBottom";
  PositionMode2[PositionMode2["SnapToLeft"] = 2] = "SnapToLeft";
  PositionMode2[PositionMode2["SnapToRight"] = 3] = "SnapToRight";
  PositionMode2[PositionMode2["SnapToTop"] = 4] = "SnapToTop";
  return PositionMode2;
})(PositionMode || {});
const PIP_HEIGHT = 156;
const PIP_WIDTH = 120;
const PIP_TOP_MARGIN = 56;
const PIP_PADDING = 8;
const CallingPip = /* @__PURE__ */ __name(({
  activeCall,
  getGroupCallVideoFrameSource,
  hangUpActiveCall,
  hasLocalVideo,
  i18n,
  setGroupCallVideoRequest,
  setLocalPreview,
  setRendererCanvas,
  switchToPresentationView,
  switchFromPresentationView,
  togglePip
}) => {
  const videoContainerRef = import_react.default.useRef(null);
  const localVideoRef = import_react.default.useRef(null);
  const [windowWidth, setWindowWidth] = import_react.default.useState(window.innerWidth);
  const [windowHeight, setWindowHeight] = import_react.default.useState(window.innerHeight);
  const [positionState, setPositionState] = import_react.default.useState({
    mode: 3 /* SnapToRight */,
    offsetY: PIP_TOP_MARGIN
  });
  (0, import_useActivateSpeakerViewOnPresenting.useActivateSpeakerViewOnPresenting)({
    remoteParticipants: activeCall.remoteParticipants,
    switchToPresentationView,
    switchFromPresentationView
  });
  import_react.default.useEffect(() => {
    setLocalPreview({ element: localVideoRef });
  }, [setLocalPreview]);
  const handleMouseMove = import_react.default.useCallback((ev) => {
    if (positionState.mode === 0 /* BeingDragged */) {
      setPositionState((oldState) => ({
        ...oldState,
        mouseX: ev.clientX,
        mouseY: ev.clientY
      }));
    }
  }, [positionState]);
  const handleMouseUp = import_react.default.useCallback(() => {
    if (positionState.mode === 0 /* BeingDragged */) {
      const { mouseX, mouseY, dragOffsetX, dragOffsetY } = positionState;
      const { innerHeight, innerWidth } = window;
      const offsetX = mouseX - dragOffsetX;
      const offsetY = mouseY - dragOffsetY;
      const snapCandidates = [
        {
          mode: 2 /* SnapToLeft */,
          distanceToEdge: offsetX
        },
        {
          mode: 3 /* SnapToRight */,
          distanceToEdge: innerWidth - (offsetX + PIP_WIDTH)
        },
        {
          mode: 4 /* SnapToTop */,
          distanceToEdge: offsetY - PIP_TOP_MARGIN
        },
        {
          mode: 1 /* SnapToBottom */,
          distanceToEdge: innerHeight - (offsetY + PIP_HEIGHT)
        }
      ];
      const snapTo = (0, import_lodash.minBy)(snapCandidates, (candidate) => candidate.distanceToEdge) || snapCandidates[0];
      switch (snapTo.mode) {
        case 2 /* SnapToLeft */:
        case 3 /* SnapToRight */:
          setPositionState({
            mode: snapTo.mode,
            offsetY
          });
          break;
        case 4 /* SnapToTop */:
        case 1 /* SnapToBottom */:
          setPositionState({
            mode: snapTo.mode,
            offsetX
          });
          break;
        default:
          throw (0, import_missingCaseError.missingCaseError)(snapTo.mode);
      }
    }
  }, [positionState, setPositionState]);
  import_react.default.useEffect(() => {
    if (positionState.mode === 0 /* BeingDragged */) {
      document.addEventListener("mousemove", handleMouseMove, false);
      document.addEventListener("mouseup", handleMouseUp, false);
      return () => {
        document.removeEventListener("mouseup", handleMouseUp, false);
        document.removeEventListener("mousemove", handleMouseMove, false);
      };
    }
    return import_lodash.noop;
  }, [positionState.mode, handleMouseMove, handleMouseUp]);
  import_react.default.useEffect(() => {
    const handleWindowResize = (0, import_lodash.debounce)(() => {
      setWindowWidth(window.innerWidth);
      setWindowHeight(window.innerHeight);
    }, 100, {
      maxWait: 3e3
    });
    window.addEventListener("resize", handleWindowResize, false);
    return () => {
      window.removeEventListener("resize", handleWindowResize, false);
    };
  }, []);
  const [translateX, translateY] = import_react.default.useMemo(() => {
    switch (positionState.mode) {
      case 0 /* BeingDragged */:
        return [
          positionState.mouseX - positionState.dragOffsetX,
          positionState.mouseY - positionState.dragOffsetY
        ];
      case 2 /* SnapToLeft */:
        return [
          PIP_PADDING,
          Math.min(positionState.offsetY, windowHeight - PIP_PADDING - PIP_HEIGHT)
        ];
      case 3 /* SnapToRight */:
        return [
          windowWidth - PIP_PADDING - PIP_WIDTH,
          Math.min(positionState.offsetY, windowHeight - PIP_PADDING - PIP_HEIGHT)
        ];
      case 4 /* SnapToTop */:
        return [
          Math.min(positionState.offsetX, windowWidth - PIP_PADDING - PIP_WIDTH),
          PIP_TOP_MARGIN + PIP_PADDING
        ];
      case 1 /* SnapToBottom */:
        return [
          Math.min(positionState.offsetX, windowWidth - PIP_PADDING - PIP_WIDTH),
          windowHeight - PIP_PADDING - PIP_HEIGHT
        ];
      default:
        throw (0, import_missingCaseError.missingCaseError)(positionState);
    }
  }, [windowWidth, windowHeight, positionState]);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-pip",
    onMouseDown: (ev) => {
      const node = videoContainerRef.current;
      if (!node) {
        return;
      }
      const rect = node.getBoundingClientRect();
      const dragOffsetX = ev.clientX - rect.left;
      const dragOffsetY = ev.clientY - rect.top;
      setPositionState({
        mode: 0 /* BeingDragged */,
        mouseX: ev.clientX,
        mouseY: ev.clientY,
        dragOffsetX,
        dragOffsetY
      });
    },
    ref: videoContainerRef,
    style: {
      cursor: positionState.mode === 0 /* BeingDragged */ ? "-webkit-grabbing" : "-webkit-grab",
      transform: `translate3d(${translateX}px,calc(${translateY}px - var(--titlebar-height)), 0)`,
      transition: positionState.mode === 0 /* BeingDragged */ ? "none" : "transform ease-out 300ms"
    }
  }, /* @__PURE__ */ import_react.default.createElement(import_CallingPipRemoteVideo.CallingPipRemoteVideo, {
    activeCall,
    getGroupCallVideoFrameSource,
    i18n,
    setRendererCanvas,
    setGroupCallVideoRequest
  }), hasLocalVideo ? /* @__PURE__ */ import_react.default.createElement("video", {
    className: "module-calling-pip__video--local",
    ref: localVideoRef,
    autoPlay: true
  }) : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-calling-pip__actions"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("calling__hangup"),
    className: "module-calling-pip__button--hangup",
    onClick: hangUpActiveCall,
    type: "button"
  }), /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("calling__pip--off"),
    className: "module-calling-pip__button--pip",
    onClick: togglePip,
    type: "button"
  }, /* @__PURE__ */ import_react.default.createElement("div", null))));
}, "CallingPip");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingPip
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ1BpcC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbWluQnksIGRlYm91bmNlLCBub29wIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgVmlkZW9GcmFtZVNvdXJjZSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHsgQ2FsbGluZ1BpcFJlbW90ZVZpZGVvIH0gZnJvbSAnLi9DYWxsaW5nUGlwUmVtb3RlVmlkZW8nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IEFjdGl2ZUNhbGxUeXBlLCBHcm91cENhbGxWaWRlb1JlcXVlc3QgfSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB0eXBlIHtcbiAgU2V0TG9jYWxQcmV2aWV3VHlwZSxcbiAgU2V0UmVuZGVyZXJDYW52YXNUeXBlLFxufSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jYWxsaW5nJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgdXNlQWN0aXZhdGVTcGVha2VyVmlld09uUHJlc2VudGluZyB9IGZyb20gJy4uL2hvb2tzL3VzZUFjdGl2YXRlU3BlYWtlclZpZXdPblByZXNlbnRpbmcnO1xuXG5lbnVtIFBvc2l0aW9uTW9kZSB7XG4gIEJlaW5nRHJhZ2dlZCxcbiAgU25hcFRvQm90dG9tLFxuICBTbmFwVG9MZWZ0LFxuICBTbmFwVG9SaWdodCxcbiAgU25hcFRvVG9wLFxufVxuXG50eXBlIFBvc2l0aW9uU3RhdGUgPVxuICB8IHtcbiAgICAgIG1vZGU6IFBvc2l0aW9uTW9kZS5CZWluZ0RyYWdnZWQ7XG4gICAgICBtb3VzZVg6IG51bWJlcjtcbiAgICAgIG1vdXNlWTogbnVtYmVyO1xuICAgICAgZHJhZ09mZnNldFg6IG51bWJlcjtcbiAgICAgIGRyYWdPZmZzZXRZOiBudW1iZXI7XG4gICAgfVxuICB8IHtcbiAgICAgIG1vZGU6IFBvc2l0aW9uTW9kZS5TbmFwVG9MZWZ0IHwgUG9zaXRpb25Nb2RlLlNuYXBUb1JpZ2h0O1xuICAgICAgb2Zmc2V0WTogbnVtYmVyO1xuICAgIH1cbiAgfCB7XG4gICAgICBtb2RlOiBQb3NpdGlvbk1vZGUuU25hcFRvVG9wIHwgUG9zaXRpb25Nb2RlLlNuYXBUb0JvdHRvbTtcbiAgICAgIG9mZnNldFg6IG51bWJlcjtcbiAgICB9O1xuXG50eXBlIFNuYXBDYW5kaWRhdGUgPSB7XG4gIG1vZGU6XG4gICAgfCBQb3NpdGlvbk1vZGUuU25hcFRvQm90dG9tXG4gICAgfCBQb3NpdGlvbk1vZGUuU25hcFRvTGVmdFxuICAgIHwgUG9zaXRpb25Nb2RlLlNuYXBUb1JpZ2h0XG4gICAgfCBQb3NpdGlvbk1vZGUuU25hcFRvVG9wO1xuICBkaXN0YW5jZVRvRWRnZTogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBhY3RpdmVDYWxsOiBBY3RpdmVDYWxsVHlwZTtcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZTogKGRlbXV4SWQ6IG51bWJlcikgPT4gVmlkZW9GcmFtZVNvdXJjZTtcbiAgaGFuZ1VwQWN0aXZlQ2FsbDogKCkgPT4gdm9pZDtcbiAgaGFzTG9jYWxWaWRlbzogYm9vbGVhbjtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgc2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0OiAoXzogQXJyYXk8R3JvdXBDYWxsVmlkZW9SZXF1ZXN0PikgPT4gdm9pZDtcbiAgc2V0TG9jYWxQcmV2aWV3OiAoXzogU2V0TG9jYWxQcmV2aWV3VHlwZSkgPT4gdm9pZDtcbiAgc2V0UmVuZGVyZXJDYW52YXM6IChfOiBTZXRSZW5kZXJlckNhbnZhc1R5cGUpID0+IHZvaWQ7XG4gIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldzogKCkgPT4gdm9pZDtcbiAgc3dpdGNoRnJvbVByZXNlbnRhdGlvblZpZXc6ICgpID0+IHZvaWQ7XG4gIHRvZ2dsZVBpcDogKCkgPT4gdm9pZDtcbn07XG5cbmNvbnN0IFBJUF9IRUlHSFQgPSAxNTY7XG5jb25zdCBQSVBfV0lEVEggPSAxMjA7XG5jb25zdCBQSVBfVE9QX01BUkdJTiA9IDU2O1xuY29uc3QgUElQX1BBRERJTkcgPSA4O1xuXG5leHBvcnQgY29uc3QgQ2FsbGluZ1BpcCA9ICh7XG4gIGFjdGl2ZUNhbGwsXG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UsXG4gIGhhbmdVcEFjdGl2ZUNhbGwsXG4gIGhhc0xvY2FsVmlkZW8sXG4gIGkxOG4sXG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdCxcbiAgc2V0TG9jYWxQcmV2aWV3LFxuICBzZXRSZW5kZXJlckNhbnZhcyxcbiAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3LFxuICBzd2l0Y2hGcm9tUHJlc2VudGF0aW9uVmlldyxcbiAgdG9nZ2xlUGlwLFxufTogUHJvcHNUeXBlKTogSlNYLkVsZW1lbnQgfCBudWxsID0+IHtcbiAgY29uc3QgdmlkZW9Db250YWluZXJSZWYgPSBSZWFjdC51c2VSZWY8bnVsbCB8IEhUTUxEaXZFbGVtZW50PihudWxsKTtcbiAgY29uc3QgbG9jYWxWaWRlb1JlZiA9IFJlYWN0LnVzZVJlZihudWxsKTtcblxuICBjb25zdCBbd2luZG93V2lkdGgsIHNldFdpbmRvd1dpZHRoXSA9IFJlYWN0LnVzZVN0YXRlKHdpbmRvdy5pbm5lcldpZHRoKTtcbiAgY29uc3QgW3dpbmRvd0hlaWdodCwgc2V0V2luZG93SGVpZ2h0XSA9IFJlYWN0LnVzZVN0YXRlKHdpbmRvdy5pbm5lckhlaWdodCk7XG4gIGNvbnN0IFtwb3NpdGlvblN0YXRlLCBzZXRQb3NpdGlvblN0YXRlXSA9IFJlYWN0LnVzZVN0YXRlPFBvc2l0aW9uU3RhdGU+KHtcbiAgICBtb2RlOiBQb3NpdGlvbk1vZGUuU25hcFRvUmlnaHQsXG4gICAgb2Zmc2V0WTogUElQX1RPUF9NQVJHSU4sXG4gIH0pO1xuXG4gIHVzZUFjdGl2YXRlU3BlYWtlclZpZXdPblByZXNlbnRpbmcoe1xuICAgIHJlbW90ZVBhcnRpY2lwYW50czogYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHMsXG4gICAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3LFxuICAgIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3LFxuICB9KTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldExvY2FsUHJldmlldyh7IGVsZW1lbnQ6IGxvY2FsVmlkZW9SZWYgfSk7XG4gIH0sIFtzZXRMb2NhbFByZXZpZXddKTtcblxuICBjb25zdCBoYW5kbGVNb3VzZU1vdmUgPSBSZWFjdC51c2VDYWxsYmFjayhcbiAgICAoZXY6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGlmIChwb3NpdGlvblN0YXRlLm1vZGUgPT09IFBvc2l0aW9uTW9kZS5CZWluZ0RyYWdnZWQpIHtcbiAgICAgICAgc2V0UG9zaXRpb25TdGF0ZShvbGRTdGF0ZSA9PiAoe1xuICAgICAgICAgIC4uLm9sZFN0YXRlLFxuICAgICAgICAgIG1vdXNlWDogZXYuY2xpZW50WCxcbiAgICAgICAgICBtb3VzZVk6IGV2LmNsaWVudFksXG4gICAgICAgIH0pKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtwb3NpdGlvblN0YXRlXVxuICApO1xuXG4gIGNvbnN0IGhhbmRsZU1vdXNlVXAgPSBSZWFjdC51c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHBvc2l0aW9uU3RhdGUubW9kZSA9PT0gUG9zaXRpb25Nb2RlLkJlaW5nRHJhZ2dlZCkge1xuICAgICAgY29uc3QgeyBtb3VzZVgsIG1vdXNlWSwgZHJhZ09mZnNldFgsIGRyYWdPZmZzZXRZIH0gPSBwb3NpdGlvblN0YXRlO1xuICAgICAgY29uc3QgeyBpbm5lckhlaWdodCwgaW5uZXJXaWR0aCB9ID0gd2luZG93O1xuXG4gICAgICBjb25zdCBvZmZzZXRYID0gbW91c2VYIC0gZHJhZ09mZnNldFg7XG4gICAgICBjb25zdCBvZmZzZXRZID0gbW91c2VZIC0gZHJhZ09mZnNldFk7XG5cbiAgICAgIGNvbnN0IHNuYXBDYW5kaWRhdGVzOiBBcnJheTxTbmFwQ2FuZGlkYXRlPiA9IFtcbiAgICAgICAge1xuICAgICAgICAgIG1vZGU6IFBvc2l0aW9uTW9kZS5TbmFwVG9MZWZ0LFxuICAgICAgICAgIGRpc3RhbmNlVG9FZGdlOiBvZmZzZXRYLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogUG9zaXRpb25Nb2RlLlNuYXBUb1JpZ2h0LFxuICAgICAgICAgIGRpc3RhbmNlVG9FZGdlOiBpbm5lcldpZHRoIC0gKG9mZnNldFggKyBQSVBfV0lEVEgpLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogUG9zaXRpb25Nb2RlLlNuYXBUb1RvcCxcbiAgICAgICAgICBkaXN0YW5jZVRvRWRnZTogb2Zmc2V0WSAtIFBJUF9UT1BfTUFSR0lOLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgbW9kZTogUG9zaXRpb25Nb2RlLlNuYXBUb0JvdHRvbSxcbiAgICAgICAgICBkaXN0YW5jZVRvRWRnZTogaW5uZXJIZWlnaHQgLSAob2Zmc2V0WSArIFBJUF9IRUlHSFQpLFxuICAgICAgICB9LFxuICAgICAgXTtcblxuICAgICAgLy8gVGhpcyBmYWxsYmFjayBpcyBtb3N0bHkgZm9yIFR5cGVTY3JpcHQsIGJlY2F1c2UgYG1pbkJ5YCBzYXlzIGl0IGNhbiByZXR1cm5cbiAgICAgIC8vICAgYHVuZGVmaW5lZGAuXG4gICAgICBjb25zdCBzbmFwVG8gPVxuICAgICAgICBtaW5CeShzbmFwQ2FuZGlkYXRlcywgY2FuZGlkYXRlID0+IGNhbmRpZGF0ZS5kaXN0YW5jZVRvRWRnZSkgfHxcbiAgICAgICAgc25hcENhbmRpZGF0ZXNbMF07XG5cbiAgICAgIHN3aXRjaCAoc25hcFRvLm1vZGUpIHtcbiAgICAgICAgY2FzZSBQb3NpdGlvbk1vZGUuU25hcFRvTGVmdDpcbiAgICAgICAgY2FzZSBQb3NpdGlvbk1vZGUuU25hcFRvUmlnaHQ6XG4gICAgICAgICAgc2V0UG9zaXRpb25TdGF0ZSh7XG4gICAgICAgICAgICBtb2RlOiBzbmFwVG8ubW9kZSxcbiAgICAgICAgICAgIG9mZnNldFksXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUG9zaXRpb25Nb2RlLlNuYXBUb1RvcDpcbiAgICAgICAgY2FzZSBQb3NpdGlvbk1vZGUuU25hcFRvQm90dG9tOlxuICAgICAgICAgIHNldFBvc2l0aW9uU3RhdGUoe1xuICAgICAgICAgICAgbW9kZTogc25hcFRvLm1vZGUsXG4gICAgICAgICAgICBvZmZzZXRYLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3Ioc25hcFRvLm1vZGUpO1xuICAgICAgfVxuICAgIH1cbiAgfSwgW3Bvc2l0aW9uU3RhdGUsIHNldFBvc2l0aW9uU3RhdGVdKTtcblxuICBSZWFjdC51c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChwb3NpdGlvblN0YXRlLm1vZGUgPT09IFBvc2l0aW9uTW9kZS5CZWluZ0RyYWdnZWQpIHtcbiAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIGhhbmRsZU1vdXNlTW92ZSwgZmFsc2UpO1xuICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcblxuICAgICAgcmV0dXJuICgpID0+IHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIGhhbmRsZU1vdXNlVXAsIGZhbHNlKTtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgaGFuZGxlTW91c2VNb3ZlLCBmYWxzZSk7XG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gbm9vcDtcbiAgfSwgW3Bvc2l0aW9uU3RhdGUubW9kZSwgaGFuZGxlTW91c2VNb3ZlLCBoYW5kbGVNb3VzZVVwXSk7XG5cbiAgUmVhY3QudXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVXaW5kb3dSZXNpemUgPSBkZWJvdW5jZShcbiAgICAgICgpID0+IHtcbiAgICAgICAgc2V0V2luZG93V2lkdGgod2luZG93LmlubmVyV2lkdGgpO1xuICAgICAgICBzZXRXaW5kb3dIZWlnaHQod2luZG93LmlubmVySGVpZ2h0KTtcbiAgICAgIH0sXG4gICAgICAxMDAsXG4gICAgICB7XG4gICAgICAgIG1heFdhaXQ6IDMwMDAsXG4gICAgICB9XG4gICAgKTtcblxuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBoYW5kbGVXaW5kb3dSZXNpemUsIGZhbHNlKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIGhhbmRsZVdpbmRvd1Jlc2l6ZSwgZmFsc2UpO1xuICAgIH07XG4gIH0sIFtdKTtcblxuICBjb25zdCBbdHJhbnNsYXRlWCwgdHJhbnNsYXRlWV0gPSBSZWFjdC51c2VNZW1vPFtudW1iZXIsIG51bWJlcl0+KCgpID0+IHtcbiAgICBzd2l0Y2ggKHBvc2l0aW9uU3RhdGUubW9kZSkge1xuICAgICAgY2FzZSBQb3NpdGlvbk1vZGUuQmVpbmdEcmFnZ2VkOlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHBvc2l0aW9uU3RhdGUubW91c2VYIC0gcG9zaXRpb25TdGF0ZS5kcmFnT2Zmc2V0WCxcbiAgICAgICAgICBwb3NpdGlvblN0YXRlLm1vdXNlWSAtIHBvc2l0aW9uU3RhdGUuZHJhZ09mZnNldFksXG4gICAgICAgIF07XG4gICAgICBjYXNlIFBvc2l0aW9uTW9kZS5TbmFwVG9MZWZ0OlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIFBJUF9QQURESU5HLFxuICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgcG9zaXRpb25TdGF0ZS5vZmZzZXRZLFxuICAgICAgICAgICAgd2luZG93SGVpZ2h0IC0gUElQX1BBRERJTkcgLSBQSVBfSEVJR0hUXG4gICAgICAgICAgKSxcbiAgICAgICAgXTtcbiAgICAgIGNhc2UgUG9zaXRpb25Nb2RlLlNuYXBUb1JpZ2h0OlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIHdpbmRvd1dpZHRoIC0gUElQX1BBRERJTkcgLSBQSVBfV0lEVEgsXG4gICAgICAgICAgTWF0aC5taW4oXG4gICAgICAgICAgICBwb3NpdGlvblN0YXRlLm9mZnNldFksXG4gICAgICAgICAgICB3aW5kb3dIZWlnaHQgLSBQSVBfUEFERElORyAtIFBJUF9IRUlHSFRcbiAgICAgICAgICApLFxuICAgICAgICBdO1xuICAgICAgY2FzZSBQb3NpdGlvbk1vZGUuU25hcFRvVG9wOlxuICAgICAgICByZXR1cm4gW1xuICAgICAgICAgIE1hdGgubWluKFxuICAgICAgICAgICAgcG9zaXRpb25TdGF0ZS5vZmZzZXRYLFxuICAgICAgICAgICAgd2luZG93V2lkdGggLSBQSVBfUEFERElORyAtIFBJUF9XSURUSFxuICAgICAgICAgICksXG4gICAgICAgICAgUElQX1RPUF9NQVJHSU4gKyBQSVBfUEFERElORyxcbiAgICAgICAgXTtcbiAgICAgIGNhc2UgUG9zaXRpb25Nb2RlLlNuYXBUb0JvdHRvbTpcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICAgIHBvc2l0aW9uU3RhdGUub2Zmc2V0WCxcbiAgICAgICAgICAgIHdpbmRvd1dpZHRoIC0gUElQX1BBRERJTkcgLSBQSVBfV0lEVEhcbiAgICAgICAgICApLFxuICAgICAgICAgIHdpbmRvd0hlaWdodCAtIFBJUF9QQURESU5HIC0gUElQX0hFSUdIVCxcbiAgICAgICAgXTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IocG9zaXRpb25TdGF0ZSk7XG4gICAgfVxuICB9LCBbd2luZG93V2lkdGgsIHdpbmRvd0hlaWdodCwgcG9zaXRpb25TdGF0ZV0pO1xuXG4gIHJldHVybiAoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGpzeC1hMTF5L25vLXN0YXRpYy1lbGVtZW50LWludGVyYWN0aW9uc1xuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBpcFwiXG4gICAgICBvbk1vdXNlRG93bj17ZXYgPT4ge1xuICAgICAgICBjb25zdCBub2RlID0gdmlkZW9Db250YWluZXJSZWYuY3VycmVudDtcbiAgICAgICAgaWYgKCFub2RlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlY3QgPSBub2RlLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICBjb25zdCBkcmFnT2Zmc2V0WCA9IGV2LmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIGNvbnN0IGRyYWdPZmZzZXRZID0gZXYuY2xpZW50WSAtIHJlY3QudG9wO1xuXG4gICAgICAgIHNldFBvc2l0aW9uU3RhdGUoe1xuICAgICAgICAgIG1vZGU6IFBvc2l0aW9uTW9kZS5CZWluZ0RyYWdnZWQsXG4gICAgICAgICAgbW91c2VYOiBldi5jbGllbnRYLFxuICAgICAgICAgIG1vdXNlWTogZXYuY2xpZW50WSxcbiAgICAgICAgICBkcmFnT2Zmc2V0WCxcbiAgICAgICAgICBkcmFnT2Zmc2V0WSxcbiAgICAgICAgfSk7XG4gICAgICB9fVxuICAgICAgcmVmPXt2aWRlb0NvbnRhaW5lclJlZn1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIGN1cnNvcjpcbiAgICAgICAgICBwb3NpdGlvblN0YXRlLm1vZGUgPT09IFBvc2l0aW9uTW9kZS5CZWluZ0RyYWdnZWRcbiAgICAgICAgICAgID8gJy13ZWJraXQtZ3JhYmJpbmcnXG4gICAgICAgICAgICA6ICctd2Via2l0LWdyYWInLFxuICAgICAgICB0cmFuc2Zvcm06IGB0cmFuc2xhdGUzZCgke3RyYW5zbGF0ZVh9cHgsY2FsYygke3RyYW5zbGF0ZVl9cHggLSB2YXIoLS10aXRsZWJhci1oZWlnaHQpKSwgMClgLFxuICAgICAgICB0cmFuc2l0aW9uOlxuICAgICAgICAgIHBvc2l0aW9uU3RhdGUubW9kZSA9PT0gUG9zaXRpb25Nb2RlLkJlaW5nRHJhZ2dlZFxuICAgICAgICAgICAgPyAnbm9uZSdcbiAgICAgICAgICAgIDogJ3RyYW5zZm9ybSBlYXNlLW91dCAzMDBtcycsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxDYWxsaW5nUGlwUmVtb3RlVmlkZW9cbiAgICAgICAgYWN0aXZlQ2FsbD17YWN0aXZlQ2FsbH1cbiAgICAgICAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZT17Z2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZX1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgc2V0UmVuZGVyZXJDYW52YXM9e3NldFJlbmRlcmVyQ2FudmFzfVxuICAgICAgICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3Q9e3NldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdH1cbiAgICAgIC8+XG4gICAgICB7aGFzTG9jYWxWaWRlbyA/IChcbiAgICAgICAgPHZpZGVvXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX192aWRlby0tbG9jYWxcIlxuICAgICAgICAgIHJlZj17bG9jYWxWaWRlb1JlZn1cbiAgICAgICAgICBhdXRvUGxheVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1jYWxsaW5nLXBpcF9fYWN0aW9uc1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignY2FsbGluZ19faGFuZ3VwJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX19idXR0b24tLWhhbmd1cFwiXG4gICAgICAgICAgb25DbGljaz17aGFuZ1VwQWN0aXZlQ2FsbH1cbiAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgLz5cbiAgICAgICAgPGJ1dHRvblxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2NhbGxpbmdfX3BpcC0tb2ZmJyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWNhbGxpbmctcGlwX19idXR0b24tLXBpcFwiXG4gICAgICAgICAgb25DbGljaz17dG9nZ2xlUGlwfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICA+XG4gICAgICAgICAgPGRpdiAvPlxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIsb0JBQXNDO0FBRXRDLG1DQUFzQztBQU90Qyw4QkFBaUM7QUFDakMsZ0RBQW1EO0FBRW5ELElBQUssZUFBTCxrQkFBSyxrQkFBTDtBQUNFO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFMRztBQUFBO0FBZ0RMLE1BQU0sYUFBYTtBQUNuQixNQUFNLFlBQVk7QUFDbEIsTUFBTSxpQkFBaUI7QUFDdkIsTUFBTSxjQUFjO0FBRWIsTUFBTSxhQUFhLHdCQUFDO0FBQUEsRUFDekI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDbUM7QUFDbkMsUUFBTSxvQkFBb0IscUJBQU0sT0FBOEIsSUFBSTtBQUNsRSxRQUFNLGdCQUFnQixxQkFBTSxPQUFPLElBQUk7QUFFdkMsUUFBTSxDQUFDLGFBQWEsa0JBQWtCLHFCQUFNLFNBQVMsT0FBTyxV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
