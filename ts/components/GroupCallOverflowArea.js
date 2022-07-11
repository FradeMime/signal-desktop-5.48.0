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
var GroupCallOverflowArea_exports = {};
__export(GroupCallOverflowArea_exports, {
  GroupCallOverflowArea: () => GroupCallOverflowArea,
  OVERFLOW_PARTICIPANT_WIDTH: () => OVERFLOW_PARTICIPANT_WIDTH
});
module.exports = __toCommonJS(GroupCallOverflowArea_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_GroupCallRemoteParticipant = require("./GroupCallRemoteParticipant");
const OVERFLOW_SCROLLED_TO_EDGE_THRESHOLD = 20;
const OVERFLOW_SCROLL_BUTTON_RATIO = 0.75;
const OVERFLOW_PARTICIPANT_WIDTH = 140;
const GroupCallOverflowArea = /* @__PURE__ */ __name(({
  getFrameBuffer,
  getGroupCallVideoFrameSource,
  i18n,
  onParticipantVisibilityChanged,
  overflowedParticipants,
  remoteAudioLevels
}) => {
  const overflowRef = (0, import_react.useRef)(null);
  const [overflowScrollTop, setOverflowScrollTop] = (0, import_react.useState)(0);
  let visibleHeight;
  let scrollMax;
  if (overflowRef.current) {
    visibleHeight = overflowRef.current.clientHeight;
    scrollMax = overflowRef.current.scrollHeight - visibleHeight;
  } else {
    visibleHeight = 0;
    scrollMax = 0;
  }
  const hasOverflowedParticipants = Boolean(overflowedParticipants.length);
  (0, import_react.useEffect)(() => {
    if (!hasOverflowedParticipants) {
      setOverflowScrollTop(0);
    }
  }, [hasOverflowedParticipants]);
  if (!hasOverflowedParticipants) {
    return null;
  }
  const isScrolledToTop = overflowScrollTop < OVERFLOW_SCROLLED_TO_EDGE_THRESHOLD;
  const isScrolledToBottom = overflowScrollTop > scrollMax - OVERFLOW_SCROLLED_TO_EDGE_THRESHOLD;
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__participants__overflow",
    style: {
      width: OVERFLOW_PARTICIPANT_WIDTH
    }
  }, /* @__PURE__ */ import_react.default.createElement(OverflowAreaScrollMarker, {
    i18n,
    isHidden: isScrolledToTop,
    onClick: () => {
      const el = overflowRef.current;
      if (!el) {
        return;
      }
      el.scrollTo({
        top: Math.max(el.scrollTop - visibleHeight * OVERFLOW_SCROLL_BUTTON_RATIO, 0),
        left: 0,
        behavior: "smooth"
      });
    },
    placement: "top"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__participants__overflow__inner",
    ref: overflowRef,
    onScroll: () => {
      const el = overflowRef.current;
      if (!el) {
        return;
      }
      setOverflowScrollTop(el.scrollTop);
    }
  }, overflowedParticipants.map((remoteParticipant) => /* @__PURE__ */ import_react.default.createElement(import_GroupCallRemoteParticipant.GroupCallRemoteParticipant, {
    key: remoteParticipant.demuxId,
    getFrameBuffer,
    getGroupCallVideoFrameSource,
    i18n,
    audioLevel: remoteAudioLevels.get(remoteParticipant.demuxId) ?? 0,
    onVisibilityChanged: onParticipantVisibilityChanged,
    width: OVERFLOW_PARTICIPANT_WIDTH,
    height: Math.floor(OVERFLOW_PARTICIPANT_WIDTH / remoteParticipant.videoAspectRatio),
    remoteParticipant
  }))), /* @__PURE__ */ import_react.default.createElement(OverflowAreaScrollMarker, {
    i18n,
    isHidden: isScrolledToBottom,
    onClick: () => {
      const el = overflowRef.current;
      if (!el) {
        return;
      }
      el.scrollTo({
        top: Math.min(el.scrollTop + visibleHeight * OVERFLOW_SCROLL_BUTTON_RATIO, scrollMax),
        left: 0,
        behavior: "smooth"
      });
    },
    placement: "bottom"
  }));
}, "GroupCallOverflowArea");
function OverflowAreaScrollMarker({
  i18n,
  isHidden,
  onClick,
  placement
}) {
  const baseClassName = "module-ongoing-call__participants__overflow__scroll-marker";
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)(baseClassName, `${baseClassName}--${placement}`, {
      [`${baseClassName}--hidden`]: isHidden
    })
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: `${baseClassName}__button`,
    onClick,
    "aria-label": i18n(`calling__overflow__scroll-${placement === "top" ? "up" : "down"}`)
  }));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  GroupCallOverflowArea,
  OVERFLOW_PARTICIPANT_WIDTH
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR3JvdXBDYWxsT3ZlcmZsb3dBcmVhLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRkMsIFJlYWN0RWxlbWVudCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VSZWYsIHVzZVN0YXRlLCB1c2VFZmZlY3QgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgVmlkZW9GcmFtZVNvdXJjZSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnQgfSBmcm9tICcuL0dyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50JztcblxuY29uc3QgT1ZFUkZMT1dfU0NST0xMRURfVE9fRURHRV9USFJFU0hPTEQgPSAyMDtcbmNvbnN0IE9WRVJGTE9XX1NDUk9MTF9CVVRUT05fUkFUSU8gPSAwLjc1O1xuXG4vLyBUaGlzIHNob3VsZCBiZSBhbiBpbnRlZ2VyLCBhcyBzdWItcGl4ZWwgd2lkdGhzIGNhbiBjYXVzZSBwZXJmb3JtYW5jZSBpc3N1ZXMuXG5leHBvcnQgY29uc3QgT1ZFUkZMT1dfUEFSVElDSVBBTlRfV0lEVEggPSAxNDA7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBnZXRGcmFtZUJ1ZmZlcjogKCkgPT4gQnVmZmVyO1xuICBnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlOiAoZGVtdXhJZDogbnVtYmVyKSA9PiBWaWRlb0ZyYW1lU291cmNlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBvblBhcnRpY2lwYW50VmlzaWJpbGl0eUNoYW5nZWQ6IChcbiAgICBkZW11eElkOiBudW1iZXIsXG4gICAgaXNWaXNpYmxlOiBib29sZWFuXG4gICkgPT4gdW5rbm93bjtcbiAgb3ZlcmZsb3dlZFBhcnRpY2lwYW50czogUmVhZG9ubHlBcnJheTxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGU+O1xuICByZW1vdGVBdWRpb0xldmVsczogTWFwPG51bWJlciwgbnVtYmVyPjtcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxPdmVyZmxvd0FyZWE6IEZDPFByb3BzVHlwZT4gPSAoe1xuICBnZXRGcmFtZUJ1ZmZlcixcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSxcbiAgaTE4bixcbiAgb25QYXJ0aWNpcGFudFZpc2liaWxpdHlDaGFuZ2VkLFxuICBvdmVyZmxvd2VkUGFydGljaXBhbnRzLFxuICByZW1vdGVBdWRpb0xldmVscyxcbn0pID0+IHtcbiAgY29uc3Qgb3ZlcmZsb3dSZWYgPSB1c2VSZWY8SFRNTERpdkVsZW1lbnQgfCBudWxsPihudWxsKTtcbiAgY29uc3QgW292ZXJmbG93U2Nyb2xsVG9wLCBzZXRPdmVyZmxvd1Njcm9sbFRvcF0gPSB1c2VTdGF0ZSgwKTtcblxuICAvLyBUaGlzIGFzc3VtZXMgdGhhdCB0aGVzZSB2YWx1ZXMgd2lsbCBjaGFuZ2UgYWxvbmcgd2l0aCByZS1yZW5kZXJzLiBJZiB0aGF0J3Mgbm90IHRydWUsXG4gIC8vICAgd2Ugc2hvdWxkIGFkZCB0aGVzZSB2YWx1ZXMgdG8gdGhlIGNvbXBvbmVudCdzIHN0YXRlLlxuICBsZXQgdmlzaWJsZUhlaWdodDogbnVtYmVyO1xuICBsZXQgc2Nyb2xsTWF4OiBudW1iZXI7XG4gIGlmIChvdmVyZmxvd1JlZi5jdXJyZW50KSB7XG4gICAgdmlzaWJsZUhlaWdodCA9IG92ZXJmbG93UmVmLmN1cnJlbnQuY2xpZW50SGVpZ2h0O1xuICAgIHNjcm9sbE1heCA9IG92ZXJmbG93UmVmLmN1cnJlbnQuc2Nyb2xsSGVpZ2h0IC0gdmlzaWJsZUhlaWdodDtcbiAgfSBlbHNlIHtcbiAgICB2aXNpYmxlSGVpZ2h0ID0gMDtcbiAgICBzY3JvbGxNYXggPSAwO1xuICB9XG5cbiAgY29uc3QgaGFzT3ZlcmZsb3dlZFBhcnRpY2lwYW50cyA9IEJvb2xlYW4ob3ZlcmZsb3dlZFBhcnRpY2lwYW50cy5sZW5ndGgpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgLy8gSWYgdGhlcmUgYXJlbid0IGFueSBvdmVyZmxvd2VkIHBhcnRpY2lwYW50cywgd2Ugd2FudCB0byBjbGVhciB0aGUgc2Nyb2xsIHBvc2l0aW9uXG4gICAgLy8gICBzbyB3ZSBkb24ndCBob2xkIG9udG8gc3RhbGUgdmFsdWVzLlxuICAgIGlmICghaGFzT3ZlcmZsb3dlZFBhcnRpY2lwYW50cykge1xuICAgICAgc2V0T3ZlcmZsb3dTY3JvbGxUb3AoMCk7XG4gICAgfVxuICB9LCBbaGFzT3ZlcmZsb3dlZFBhcnRpY2lwYW50c10pO1xuXG4gIGlmICghaGFzT3ZlcmZsb3dlZFBhcnRpY2lwYW50cykge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgY29uc3QgaXNTY3JvbGxlZFRvVG9wID1cbiAgICBvdmVyZmxvd1Njcm9sbFRvcCA8IE9WRVJGTE9XX1NDUk9MTEVEX1RPX0VER0VfVEhSRVNIT0xEO1xuICBjb25zdCBpc1Njcm9sbGVkVG9Cb3R0b20gPVxuICAgIG92ZXJmbG93U2Nyb2xsVG9wID4gc2Nyb2xsTWF4IC0gT1ZFUkZMT1dfU0NST0xMRURfVE9fRURHRV9USFJFU0hPTEQ7XG5cbiAgcmV0dXJuIChcbiAgICA8ZGl2XG4gICAgICBjbGFzc05hbWU9XCJtb2R1bGUtb25nb2luZy1jYWxsX19wYXJ0aWNpcGFudHNfX292ZXJmbG93XCJcbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIC8vIFRoaXMgd2lkdGggY291bGQgbGl2ZSBpbiBDU1MgYnV0IHdlIHB1dCBpdCBoZXJlIHRvIGF2b2lkIGhhdmluZyB0byBrZWVwIHR3b1xuICAgICAgICAvLyAgIHZhbHVlcyBpbiBzeW5jLlxuICAgICAgICB3aWR0aDogT1ZFUkZMT1dfUEFSVElDSVBBTlRfV0lEVEgsXG4gICAgICB9fVxuICAgID5cbiAgICAgIDxPdmVyZmxvd0FyZWFTY3JvbGxNYXJrZXJcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNIaWRkZW49e2lzU2Nyb2xsZWRUb1RvcH1cbiAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGVsID0gb3ZlcmZsb3dSZWYuY3VycmVudDtcbiAgICAgICAgICBpZiAoIWVsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGVsLnNjcm9sbFRvKHtcbiAgICAgICAgICAgIHRvcDogTWF0aC5tYXgoXG4gICAgICAgICAgICAgIGVsLnNjcm9sbFRvcCAtIHZpc2libGVIZWlnaHQgKiBPVkVSRkxPV19TQ1JPTExfQlVUVE9OX1JBVElPLFxuICAgICAgICAgICAgICAwXG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgcGxhY2VtZW50PVwidG9wXCJcbiAgICAgIC8+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1vbmdvaW5nLWNhbGxfX3BhcnRpY2lwYW50c19fb3ZlcmZsb3dfX2lubmVyXCJcbiAgICAgICAgcmVmPXtvdmVyZmxvd1JlZn1cbiAgICAgICAgb25TY3JvbGw9eygpID0+IHtcbiAgICAgICAgICAvLyBJZGVhbGx5IHRoaXMgd291bGQgdXNlIGBldmVudC50YXJnZXQuc2Nyb2xsVG9wYCwgYnV0IHRoYXQgZG9lcyBub3Qgc2VlbSB0byBiZVxuICAgICAgICAgIC8vICAgYXZhaWxhYmxlLCBzbyB3ZSB1c2UgdGhlIHJlZi5cbiAgICAgICAgICBjb25zdCBlbCA9IG92ZXJmbG93UmVmLmN1cnJlbnQ7XG4gICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzZXRPdmVyZmxvd1Njcm9sbFRvcChlbC5zY3JvbGxUb3ApO1xuICAgICAgICB9fVxuICAgICAgPlxuICAgICAgICB7b3ZlcmZsb3dlZFBhcnRpY2lwYW50cy5tYXAocmVtb3RlUGFydGljaXBhbnQgPT4gKFxuICAgICAgICAgIDxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFxuICAgICAgICAgICAga2V5PXtyZW1vdGVQYXJ0aWNpcGFudC5kZW11eElkfVxuICAgICAgICAgICAgZ2V0RnJhbWVCdWZmZXI9e2dldEZyYW1lQnVmZmVyfVxuICAgICAgICAgICAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZT17Z2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBhdWRpb0xldmVsPXtyZW1vdGVBdWRpb0xldmVscy5nZXQocmVtb3RlUGFydGljaXBhbnQuZGVtdXhJZCkgPz8gMH1cbiAgICAgICAgICAgIG9uVmlzaWJpbGl0eUNoYW5nZWQ9e29uUGFydGljaXBhbnRWaXNpYmlsaXR5Q2hhbmdlZH1cbiAgICAgICAgICAgIHdpZHRoPXtPVkVSRkxPV19QQVJUSUNJUEFOVF9XSURUSH1cbiAgICAgICAgICAgIGhlaWdodD17TWF0aC5mbG9vcihcbiAgICAgICAgICAgICAgT1ZFUkZMT1dfUEFSVElDSVBBTlRfV0lEVEggLyByZW1vdGVQYXJ0aWNpcGFudC52aWRlb0FzcGVjdFJhdGlvXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnQ9e3JlbW90ZVBhcnRpY2lwYW50fVxuICAgICAgICAgIC8+XG4gICAgICAgICkpfVxuICAgICAgPC9kaXY+XG4gICAgICA8T3ZlcmZsb3dBcmVhU2Nyb2xsTWFya2VyXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzSGlkZGVuPXtpc1Njcm9sbGVkVG9Cb3R0b219XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBjb25zdCBlbCA9IG92ZXJmbG93UmVmLmN1cnJlbnQ7XG4gICAgICAgICAgaWYgKCFlbCkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlbC5zY3JvbGxUbyh7XG4gICAgICAgICAgICB0b3A6IE1hdGgubWluKFxuICAgICAgICAgICAgICBlbC5zY3JvbGxUb3AgKyB2aXNpYmxlSGVpZ2h0ICogT1ZFUkZMT1dfU0NST0xMX0JVVFRPTl9SQVRJTyxcbiAgICAgICAgICAgICAgc2Nyb2xsTWF4XG4gICAgICAgICAgICApLFxuICAgICAgICAgICAgbGVmdDogMCxcbiAgICAgICAgICAgIGJlaGF2aW9yOiAnc21vb3RoJyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgcGxhY2VtZW50PVwiYm90dG9tXCJcbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBPdmVyZmxvd0FyZWFTY3JvbGxNYXJrZXIoe1xuICBpMThuLFxuICBpc0hpZGRlbixcbiAgb25DbGljayxcbiAgcGxhY2VtZW50LFxufToge1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpc0hpZGRlbjogYm9vbGVhbjtcbiAgb25DbGljazogKCkgPT4gdm9pZDtcbiAgcGxhY2VtZW50OiAndG9wJyB8ICdib3R0b20nO1xufSk6IFJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IGJhc2VDbGFzc05hbWUgPVxuICAgICdtb2R1bGUtb25nb2luZy1jYWxsX19wYXJ0aWNpcGFudHNfX292ZXJmbG93X19zY3JvbGwtbWFya2VyJztcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhiYXNlQ2xhc3NOYW1lLCBgJHtiYXNlQ2xhc3NOYW1lfS0tJHtwbGFjZW1lbnR9YCwge1xuICAgICAgICBbYCR7YmFzZUNsYXNzTmFtZX0tLWhpZGRlbmBdOiBpc0hpZGRlbixcbiAgICAgIH0pfVxuICAgID5cbiAgICAgIDxidXR0b25cbiAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgIGNsYXNzTmFtZT17YCR7YmFzZUNsYXNzTmFtZX1fX2J1dHRvbmB9XG4gICAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9XG4gICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oXG4gICAgICAgICAgYGNhbGxpbmdfX292ZXJmbG93X19zY3JvbGwtJHtwbGFjZW1lbnQgPT09ICd0b3AnID8gJ3VwJyA6ICdkb3duJ31gXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgIDwvZGl2PlxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQW1EO0FBQ25ELHdCQUF1QjtBQUl2Qix3Q0FBMkM7QUFFM0MsTUFBTSxzQ0FBc0M7QUFDNUMsTUFBTSwrQkFBK0I7QUFHOUIsTUFBTSw2QkFBNkI7QUFjbkMsTUFBTSx3QkFBdUMsd0JBQUM7QUFBQSxFQUNuRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFFBQU0sY0FBYyx5QkFBOEIsSUFBSTtBQUN0RCxRQUFNLENBQUMsbUJBQW1CLHdCQUF3QiwyQkFBUyxDQUFDO0FBSTVELE1BQUk7QUFDSixNQUFJO0FBQ0osTUFBSSxZQUFZLFNBQVM7QUFDdkIsb0JBQWdCLFlBQVksUUFBUTtBQUNwQyxnQkFBWSxZQUFZLFFBQVEsZUFBZTtBQUFBLEVBQ2pELE9BQU87QUFDTCxvQkFBZ0I7QUFDaEIsZ0JBQVk7QUFBQSxFQUNkO0FBRUEsUUFBTSw0QkFBNEIsUUFBUSx1QkFBdUIsTUFBTTtBQUV2RSw4QkFBVSxNQUFNO0FBR2QsUUFBSSxDQUFDLDJCQUEyQjtBQUM5QiwyQkFBcUIsQ0FBQztBQUFBLElBQ3hCO0FBQUEsRUFDRixHQUFHLENBQUMseUJBQXlCLENBQUM7QUFFOUIsTUFBSSxDQUFDLDJCQUEyQjtBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sa0JBQ0osb0JBQW9CO0FBQ3RCLFFBQU0scUJBQ0osb0JBQW9CLFlBQVk7QUFFbEMsU0FDRSxtREFBQztBQUFBLElBQ0MsV0FBVTtBQUFBLElBQ1YsT0FBTztBQUFBLE1BR0wsT0FBTztBQUFBLElBQ1Q7QUFBQSxLQUVBLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsVUFBVTtBQUFBLElBQ1YsU0FBUyxNQUFNO0FBQ2IsWUFBTSxLQUFLLFlBQVk7QUFDdkIsVUFBSSxDQUFDLElBQUk7QUFDUDtBQUFBLE1BQ0Y7QUFDQSxTQUFHLFNBQVM7QUFBQSxRQUNWLEtBQUssS0FBSyxJQUNSLEdBQUcsWUFBWSxnQkFBZ0IsOEJBQy9CLENBQ0Y7QUFBQSxRQUNBLE1BQU07QUFBQSxRQUNOLFVBQVU7QUFBQSxNQUNaLENBQUM7QUFBQSxJQUNIO0FBQUEsSUFDQSxXQUFVO0FBQUEsR0FDWixHQUNBLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVixLQUFLO0FBQUEsSUFDTCxVQUFVLE1BQU07QUFHZCxZQUFNLEtBQUssWUFBWTtBQUN2QixVQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsTUFDRjtBQUNBLDJCQUFxQixHQUFHLFNBQVM7QUFBQSxJQUNuQztBQUFBLEtBRUMsdUJBQXVCLElBQUksdUJBQzFCLG1EQUFDO0FBQUEsSUFDQyxLQUFLLGtCQUFrQjtBQUFBLElBQ3ZCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFlBQVksa0JBQWtCLElBQUksa0JBQWtCLE9BQU8sS0FBSztBQUFBLElBQ2hFLHFCQUFxQjtBQUFBLElBQ3JCLE9BQU87QUFBQSxJQUNQLFFBQVEsS0FBSyxNQUNYLDZCQUE2QixrQkFBa0IsZ0JBQ2pEO0FBQUEsSUFDQTtBQUFBLEdBQ0YsQ0FDRCxDQUNILEdBQ0EsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxVQUFVO0FBQUEsSUFDVixTQUFTLE1BQU07QUFDYixZQUFNLEtBQUssWUFBWTtBQUN2QixVQUFJLENBQUMsSUFBSTtBQUNQO0FBQUEsTUFDRjtBQUNBLFNBQUcsU0FBUztBQUFBLFFBQ1YsS0FBSyxLQUFLLElBQ1IsR0FBRyxZQUFZLGdCQUFnQiw4QkFDL0IsU0FDRjtBQUFBLFFBQ0EsTUFBTTtBQUFBLFFBQ04sVUFBVTtBQUFBLE1BQ1osQ0FBQztBQUFBLElBQ0g7QUFBQSxJQUNBLFdBQVU7QUFBQSxHQUNaLENBQ0Y7QUFFSixHQXhIb0Q7QUEwSHBELGtDQUFrQztBQUFBLEVBQ2hDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsR0FNZTtBQUNmLFFBQU0sZ0JBQ0o7QUFFRixTQUNFLG1EQUFDO0FBQUEsSUFDQyxXQUFXLCtCQUFXLGVBQWUsR0FBRyxrQkFBa0IsYUFBYTtBQUFBLE9BQ3BFLEdBQUcsMEJBQTBCO0FBQUEsSUFDaEMsQ0FBQztBQUFBLEtBRUQsbURBQUM7QUFBQSxJQUNDLE1BQUs7QUFBQSxJQUNMLFdBQVcsR0FBRztBQUFBLElBQ2Q7QUFBQSxJQUNBLGNBQVksS0FDViw2QkFBNkIsY0FBYyxRQUFRLE9BQU8sUUFDNUQ7QUFBQSxHQUNGLENBQ0Y7QUFFSjtBQTlCUyIsCiAgIm5hbWVzIjogW10KfQo=
