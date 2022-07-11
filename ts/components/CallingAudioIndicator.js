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
var CallingAudioIndicator_exports = {};
__export(CallingAudioIndicator_exports, {
  CallingAudioIndicator: () => CallingAudioIndicator
});
module.exports = __toCommonJS(CallingAudioIndicator_exports);
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_react = __toESM(require("react"));
var import_web = require("@react-spring/web");
var import_constants = require("../calling/constants");
var import_missingCaseError = require("../util/missingCaseError");
const SPEAKING_LINGER_MS = 500;
const BASE_CLASS_NAME = "CallingAudioIndicator";
const CONTENT_CLASS_NAME = `${BASE_CLASS_NAME}__content`;
const MIN_BAR_HEIGHT = 2;
const SIDE_SCALE_FACTOR = 0.75;
const MAX_CENTRAL_BAR_DELTA = 9;
const CONTENT_WIDTH = 14;
const CONTENT_HEIGHT = 14;
const BAR_WIDTH = 2;
const CONTENT_PADDING = 1;
var BarPosition = /* @__PURE__ */ ((BarPosition2) => {
  BarPosition2[BarPosition2["Left"] = 0] = "Left";
  BarPosition2[BarPosition2["Center"] = 1] = "Center";
  BarPosition2[BarPosition2["Right"] = 2] = "Right";
  return BarPosition2;
})(BarPosition || {});
function generateBarPath(position, audioLevel) {
  let x;
  if (position === 0 /* Left */) {
    x = CONTENT_PADDING;
  } else if (position === 1 /* Center */) {
    x = CONTENT_WIDTH / 2 - BAR_WIDTH / 2;
  } else if (position === 2 /* Right */) {
    x = CONTENT_WIDTH - CONTENT_PADDING - BAR_WIDTH;
  } else {
    throw (0, import_missingCaseError.missingCaseError)(position);
  }
  x = Math.round(x);
  let height;
  if (position === 0 /* Left */ || position === 2 /* Right */) {
    height = MIN_BAR_HEIGHT + audioLevel * MAX_CENTRAL_BAR_DELTA * SIDE_SCALE_FACTOR;
  } else if (position === 1 /* Center */) {
    height = MIN_BAR_HEIGHT + audioLevel * MAX_CENTRAL_BAR_DELTA;
  } else {
    throw (0, import_missingCaseError.missingCaseError)(position);
  }
  height -= 2;
  const y = (CONTENT_HEIGHT - height) / 2;
  const left = x;
  const right = x + BAR_WIDTH;
  const top = y.toFixed(2);
  const bottom = (y + height).toFixed(2);
  return `M ${left} ${top} L ${left} ${bottom} A 0.5 0.5 0 0 0 ${right} ${bottom} L ${right} ${top} A 0.5 0.5 0 0 0 ${left} ${top}`;
}
function generateCombinedPath(audioLevel) {
  return `${generateBarPath(0 /* Left */, audioLevel)} ${generateBarPath(1 /* Center */, audioLevel)} ${generateBarPath(2 /* Right */, audioLevel)} `;
}
function Bars({ audioLevel }) {
  const animatedProps = (0, import_web.useSpring)({
    from: { audioLevel: 0 },
    config: { duration: import_constants.AUDIO_LEVEL_INTERVAL_MS }
  });
  (0, import_react.useEffect)(() => {
    animatedProps.audioLevel.stop();
    animatedProps.audioLevel.start(audioLevel);
  }, [audioLevel, animatedProps]);
  return /* @__PURE__ */ import_react.default.createElement(import_web.animated.path, {
    d: animatedProps.audioLevel.to(generateCombinedPath),
    fill: "#ffffff"
  });
}
function CallingAudioIndicator({
  hasAudio,
  audioLevel
}) {
  const [shouldShowSpeaking, setShouldShowSpeaking] = (0, import_react.useState)(audioLevel > 0);
  (0, import_react.useEffect)(() => {
    if (audioLevel > 0) {
      setShouldShowSpeaking(true);
    } else if (shouldShowSpeaking) {
      const timeout = setTimeout(() => {
        setShouldShowSpeaking(false);
      }, SPEAKING_LINGER_MS);
      return () => {
        clearTimeout(timeout);
      };
    }
    return import_lodash.noop;
  }, [audioLevel, shouldShowSpeaking]);
  if (!hasAudio) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(BASE_CLASS_NAME, `${BASE_CLASS_NAME}--with-content`)
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(CONTENT_CLASS_NAME, `${CONTENT_CLASS_NAME}--muted`)
    }));
  }
  if (shouldShowSpeaking) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)(BASE_CLASS_NAME, `${BASE_CLASS_NAME}--with-content`)
    }, /* @__PURE__ */ import_react.default.createElement("svg", {
      xmlns: "http://www.w3.org/2000/svg",
      className: CONTENT_CLASS_NAME,
      viewBox: `0 0 ${CONTENT_WIDTH} ${CONTENT_HEIGHT}`,
      width: CONTENT_WIDTH,
      height: CONTENT_HEIGHT,
      style: { transform: "translate3d(0px, 0px, 0px)" }
    }, /* @__PURE__ */ import_react.default.createElement(Bars, {
      audioLevel
    })));
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: BASE_CLASS_NAME
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingAudioIndicator
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ0F1ZGlvSW5kaWNhdG9yLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdEVsZW1lbnQgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNwcmluZywgYW5pbWF0ZWQgfSBmcm9tICdAcmVhY3Qtc3ByaW5nL3dlYic7XG5cbmltcG9ydCB7IEFVRElPX0xFVkVMX0lOVEVSVkFMX01TIH0gZnJvbSAnLi4vY2FsbGluZy9jb25zdGFudHMnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5cbmNvbnN0IFNQRUFLSU5HX0xJTkdFUl9NUyA9IDUwMDtcblxuY29uc3QgQkFTRV9DTEFTU19OQU1FID0gJ0NhbGxpbmdBdWRpb0luZGljYXRvcic7XG5jb25zdCBDT05URU5UX0NMQVNTX05BTUUgPSBgJHtCQVNFX0NMQVNTX05BTUV9X19jb250ZW50YDtcblxuY29uc3QgTUlOX0JBUl9IRUlHSFQgPSAyO1xuY29uc3QgU0lERV9TQ0FMRV9GQUNUT1IgPSAwLjc1O1xuY29uc3QgTUFYX0NFTlRSQUxfQkFSX0RFTFRBID0gOTtcblxuLyogU2hvdWxkIG1hdGNoIGNzcyAqL1xuY29uc3QgQ09OVEVOVF9XSURUSCA9IDE0O1xuY29uc3QgQ09OVEVOVF9IRUlHSFQgPSAxNDtcbmNvbnN0IEJBUl9XSURUSCA9IDI7XG5cbmNvbnN0IENPTlRFTlRfUEFERElORyA9IDE7XG5cbmVudW0gQmFyUG9zaXRpb24ge1xuICBMZWZ0LFxuICBDZW50ZXIsXG4gIFJpZ2h0LFxufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUJhclBhdGgocG9zaXRpb246IEJhclBvc2l0aW9uLCBhdWRpb0xldmVsOiBudW1iZXIpOiBzdHJpbmcge1xuICBsZXQgeDogbnVtYmVyO1xuICBpZiAocG9zaXRpb24gPT09IEJhclBvc2l0aW9uLkxlZnQpIHtcbiAgICB4ID0gQ09OVEVOVF9QQURESU5HO1xuICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSBCYXJQb3NpdGlvbi5DZW50ZXIpIHtcbiAgICB4ID0gQ09OVEVOVF9XSURUSCAvIDIgLSBCQVJfV0lEVEggLyAyO1xuICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSBCYXJQb3NpdGlvbi5SaWdodCkge1xuICAgIHggPSBDT05URU5UX1dJRFRIIC0gQ09OVEVOVF9QQURESU5HIC0gQkFSX1dJRFRIO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IocG9zaXRpb24pO1xuICB9XG5cbiAgeCA9IE1hdGgucm91bmQoeCk7XG5cbiAgbGV0IGhlaWdodDogbnVtYmVyO1xuICBpZiAocG9zaXRpb24gPT09IEJhclBvc2l0aW9uLkxlZnQgfHwgcG9zaXRpb24gPT09IEJhclBvc2l0aW9uLlJpZ2h0KSB7XG4gICAgaGVpZ2h0ID1cbiAgICAgIE1JTl9CQVJfSEVJR0hUICsgYXVkaW9MZXZlbCAqIE1BWF9DRU5UUkFMX0JBUl9ERUxUQSAqIFNJREVfU0NBTEVfRkFDVE9SO1xuICB9IGVsc2UgaWYgKHBvc2l0aW9uID09PSBCYXJQb3NpdGlvbi5DZW50ZXIpIHtcbiAgICBoZWlnaHQgPSBNSU5fQkFSX0hFSUdIVCArIGF1ZGlvTGV2ZWwgKiBNQVhfQ0VOVFJBTF9CQVJfREVMVEE7XG4gIH0gZWxzZSB7XG4gICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihwb3NpdGlvbik7XG4gIH1cblxuICAvLyBUYWtlIHRoZSByb3VuZCBjb3JuZXJzIG9mZiB0aGUgaGVpZ2h0XG4gIGhlaWdodCAtPSAyO1xuXG4gIGNvbnN0IHkgPSAoQ09OVEVOVF9IRUlHSFQgLSBoZWlnaHQpIC8gMjtcbiAgY29uc3QgbGVmdCA9IHg7XG4gIGNvbnN0IHJpZ2h0ID0geCArIEJBUl9XSURUSDtcbiAgY29uc3QgdG9wID0geS50b0ZpeGVkKDIpO1xuICBjb25zdCBib3R0b20gPSAoeSArIGhlaWdodCkudG9GaXhlZCgyKTtcblxuICByZXR1cm4gKFxuICAgIGBNICR7bGVmdH0gJHt0b3B9IGAgK1xuICAgIGBMICR7bGVmdH0gJHtib3R0b219IGAgK1xuICAgIGBBIDAuNSAwLjUgMCAwIDAgJHtyaWdodH0gJHtib3R0b219IGAgK1xuICAgIGBMICR7cmlnaHR9ICR7dG9wfSBgICtcbiAgICBgQSAwLjUgMC41IDAgMCAwICR7bGVmdH0gJHt0b3B9YFxuICApO1xufVxuXG5mdW5jdGlvbiBnZW5lcmF0ZUNvbWJpbmVkUGF0aChhdWRpb0xldmVsOiBudW1iZXIpOiBzdHJpbmcge1xuICByZXR1cm4gKFxuICAgIGAke2dlbmVyYXRlQmFyUGF0aChCYXJQb3NpdGlvbi5MZWZ0LCBhdWRpb0xldmVsKX0gYCArXG4gICAgYCR7Z2VuZXJhdGVCYXJQYXRoKEJhclBvc2l0aW9uLkNlbnRlciwgYXVkaW9MZXZlbCl9IGAgK1xuICAgIGAke2dlbmVyYXRlQmFyUGF0aChCYXJQb3NpdGlvbi5SaWdodCwgYXVkaW9MZXZlbCl9IGBcbiAgKTtcbn1cblxuZnVuY3Rpb24gQmFycyh7IGF1ZGlvTGV2ZWwgfTogeyBhdWRpb0xldmVsOiBudW1iZXIgfSk6IFJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IGFuaW1hdGVkUHJvcHMgPSB1c2VTcHJpbmcoe1xuICAgIGZyb206IHsgYXVkaW9MZXZlbDogMCB9LFxuICAgIGNvbmZpZzogeyBkdXJhdGlvbjogQVVESU9fTEVWRUxfSU5URVJWQUxfTVMgfSxcbiAgfSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBhbmltYXRlZFByb3BzLmF1ZGlvTGV2ZWwuc3RvcCgpO1xuICAgIGFuaW1hdGVkUHJvcHMuYXVkaW9MZXZlbC5zdGFydChhdWRpb0xldmVsKTtcbiAgfSwgW2F1ZGlvTGV2ZWwsIGFuaW1hdGVkUHJvcHNdKTtcblxuICByZXR1cm4gKFxuICAgIDxhbmltYXRlZC5wYXRoXG4gICAgICBkPXthbmltYXRlZFByb3BzLmF1ZGlvTGV2ZWwudG8oZ2VuZXJhdGVDb21iaW5lZFBhdGgpfVxuICAgICAgZmlsbD1cIiNmZmZmZmZcIlxuICAgIC8+XG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBDYWxsaW5nQXVkaW9JbmRpY2F0b3Ioe1xuICBoYXNBdWRpbyxcbiAgYXVkaW9MZXZlbCxcbn06IFJlYWRvbmx5PHsgaGFzQXVkaW86IGJvb2xlYW47IGF1ZGlvTGV2ZWw6IG51bWJlciB9Pik6IFJlYWN0RWxlbWVudCB7XG4gIGNvbnN0IFtzaG91bGRTaG93U3BlYWtpbmcsIHNldFNob3VsZFNob3dTcGVha2luZ10gPSB1c2VTdGF0ZShhdWRpb0xldmVsID4gMCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoYXVkaW9MZXZlbCA+IDApIHtcbiAgICAgIHNldFNob3VsZFNob3dTcGVha2luZyh0cnVlKTtcbiAgICB9IGVsc2UgaWYgKHNob3VsZFNob3dTcGVha2luZykge1xuICAgICAgY29uc3QgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRTaG91bGRTaG93U3BlYWtpbmcoZmFsc2UpO1xuICAgICAgfSwgU1BFQUtJTkdfTElOR0VSX01TKTtcbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiBub29wO1xuICB9LCBbYXVkaW9MZXZlbCwgc2hvdWxkU2hvd1NwZWFraW5nXSk7XG5cbiAgaWYgKCFoYXNBdWRpbykge1xuICAgIHJldHVybiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICBCQVNFX0NMQVNTX05BTUUsXG4gICAgICAgICAgYCR7QkFTRV9DTEFTU19OQU1FfS0td2l0aC1jb250ZW50YFxuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgQ09OVEVOVF9DTEFTU19OQU1FLFxuICAgICAgICAgICAgYCR7Q09OVEVOVF9DTEFTU19OQU1FfS0tbXV0ZWRgXG4gICAgICAgICAgKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICBpZiAoc2hvdWxkU2hvd1NwZWFraW5nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgIEJBU0VfQ0xBU1NfTkFNRSxcbiAgICAgICAgICBgJHtCQVNFX0NMQVNTX05BTUV9LS13aXRoLWNvbnRlbnRgXG4gICAgICAgICl9XG4gICAgICA+XG4gICAgICAgIDxzdmdcbiAgICAgICAgICB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCJcbiAgICAgICAgICBjbGFzc05hbWU9e0NPTlRFTlRfQ0xBU1NfTkFNRX1cbiAgICAgICAgICB2aWV3Qm94PXtgMCAwICR7Q09OVEVOVF9XSURUSH0gJHtDT05URU5UX0hFSUdIVH1gfVxuICAgICAgICAgIHdpZHRoPXtDT05URU5UX1dJRFRIfVxuICAgICAgICAgIGhlaWdodD17Q09OVEVOVF9IRUlHSFR9XG4gICAgICAgICAgc3R5bGU9e3sgdHJhbnNmb3JtOiAndHJhbnNsYXRlM2QoMHB4LCAwcHgsIDBweCknIH19XG4gICAgICAgID5cbiAgICAgICAgICA8QmFycyBhdWRpb0xldmVsPXthdWRpb0xldmVsfSAvPlxuICAgICAgICA8L3N2Zz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG4gIH1cblxuICAvLyBSZW5kZXIgYW4gZW1wdHkgc3BhY2VyIHNvIHRoYXQgbmFtZXMgZG9uJ3QgbW92ZSBhcm91bmQuXG4gIHJldHVybiA8ZGl2IGNsYXNzTmFtZT17QkFTRV9DTEFTU19OQU1FfSAvPjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx3QkFBdUI7QUFDdkIsb0JBQXFCO0FBRXJCLG1CQUEyQztBQUMzQyxpQkFBb0M7QUFFcEMsdUJBQXdDO0FBQ3hDLDhCQUFpQztBQUVqQyxNQUFNLHFCQUFxQjtBQUUzQixNQUFNLGtCQUFrQjtBQUN4QixNQUFNLHFCQUFxQixHQUFHO0FBRTlCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sb0JBQW9CO0FBQzFCLE1BQU0sd0JBQXdCO0FBRzlCLE1BQU0sZ0JBQWdCO0FBQ3RCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sWUFBWTtBQUVsQixNQUFNLGtCQUFrQjtBQUV4QixJQUFLLGNBQUwsa0JBQUssaUJBQUw7QUFDRTtBQUNBO0FBQ0E7QUFIRztBQUFBO0FBTUwseUJBQXlCLFVBQXVCLFlBQTRCO0FBQzFFLE1BQUk7QUFDSixNQUFJLGFBQWEsY0FBa0I7QUFDakMsUUFBSTtBQUFBLEVBQ04sV0FBVyxhQUFhLGdCQUFvQjtBQUMxQyxRQUFJLGdCQUFnQixJQUFJLFlBQVk7QUFBQSxFQUN0QyxXQUFXLGFBQWEsZUFBbUI7QUFDekMsUUFBSSxnQkFBZ0Isa0JBQWtCO0FBQUEsRUFDeEMsT0FBTztBQUNMLFVBQU0sOENBQWlCLFFBQVE7QUFBQSxFQUNqQztBQUVBLE1BQUksS0FBSyxNQUFNLENBQUM7QUFFaEIsTUFBSTtBQUNKLE1BQUksYUFBYSxnQkFBb0IsYUFBYSxlQUFtQjtBQUNuRSxhQUNFLGlCQUFpQixhQUFhLHdCQUF3QjtBQUFBLEVBQzFELFdBQVcsYUFBYSxnQkFBb0I7QUFDMUMsYUFBUyxpQkFBaUIsYUFBYTtBQUFBLEVBQ3pDLE9BQU87QUFDTCxVQUFNLDhDQUFpQixRQUFRO0FBQUEsRUFDakM7QUFHQSxZQUFVO0FBRVYsUUFBTSxJQUFLLGtCQUFpQixVQUFVO0FBQ3RDLFFBQU0sT0FBTztBQUNiLFFBQU0sUUFBUSxJQUFJO0FBQ2xCLFFBQU0sTUFBTSxFQUFFLFFBQVEsQ0FBQztBQUN2QixRQUFNLFNBQVUsS0FBSSxRQUFRLFFBQVEsQ0FBQztBQUVyQyxTQUNFLEtBQUssUUFBUSxTQUNSLFFBQVEsMEJBQ00sU0FBUyxZQUN2QixTQUFTLHVCQUNLLFFBQVE7QUFFL0I7QUF4Q1MsQUEwQ1QsOEJBQThCLFlBQTRCO0FBQ3hELFNBQ0UsR0FBRyxnQkFBZ0IsY0FBa0IsVUFBVSxLQUM1QyxnQkFBZ0IsZ0JBQW9CLFVBQVUsS0FDOUMsZ0JBQWdCLGVBQW1CLFVBQVU7QUFFcEQ7QUFOUyxBQVFULGNBQWMsRUFBRSxjQUFvRDtBQUNsRSxRQUFNLGdCQUFnQiwwQkFBVTtBQUFBLElBQzlCLE1BQU0sRUFBRSxZQUFZLEVBQUU7QUFBQSxJQUN0QixRQUFRLEVBQUUsVUFBVSx5Q0FBd0I7QUFBQSxFQUM5QyxDQUFDO0FBRUQsOEJBQVUsTUFBTTtBQUNkLGtCQUFjLFdBQVcsS0FBSztBQUM5QixrQkFBYyxXQUFXLE1BQU0sVUFBVTtBQUFBLEVBQzNDLEdBQUcsQ0FBQyxZQUFZLGFBQWEsQ0FBQztBQUU5QixTQUNFLG1EQUFDLG9CQUFTLE1BQVQ7QUFBQSxJQUNDLEdBQUcsY0FBYyxXQUFXLEdBQUcsb0JBQW9CO0FBQUEsSUFDbkQsTUFBSztBQUFBLEdBQ1A7QUFFSjtBQWpCUyxBQW1CRiwrQkFBK0I7QUFBQSxFQUNwQztBQUFBLEVBQ0E7QUFBQSxHQUNvRTtBQUNwRSxRQUFNLENBQUMsb0JBQW9CLHlCQUF5QiwyQkFBUyxhQUFhLENBQUM7QUFFM0UsOEJBQVUsTUFBTTtBQUNkLFFBQUksYUFBYSxHQUFHO0FBQ2xCLDRCQUFzQixJQUFJO0FBQUEsSUFDNUIsV0FBVyxvQkFBb0I7QUFDN0IsWUFBTSxVQUFVLFdBQVcsTUFBTTtBQUMvQiw4QkFBc0IsS0FBSztBQUFBLE1BQzdCLEdBQUcsa0JBQWtCO0FBQ3JCLGFBQU8sTUFBTTtBQUNYLHFCQUFhLE9BQU87QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFDQSxXQUFPO0FBQUEsRUFDVCxHQUFHLENBQUMsWUFBWSxrQkFBa0IsQ0FBQztBQUVuQyxNQUFJLENBQUMsVUFBVTtBQUNiLFdBQ0UsbURBQUM7QUFBQSxNQUNDLFdBQVcsK0JBQ1QsaUJBQ0EsR0FBRywrQkFDTDtBQUFBLE9BRUEsbURBQUM7QUFBQSxNQUNDLFdBQVcsK0JBQ1Qsb0JBQ0EsR0FBRywyQkFDTDtBQUFBLEtBQ0YsQ0FDRjtBQUFBLEVBRUo7QUFFQSxNQUFJLG9CQUFvQjtBQUN0QixXQUNFLG1EQUFDO0FBQUEsTUFDQyxXQUFXLCtCQUNULGlCQUNBLEdBQUcsK0JBQ0w7QUFBQSxPQUVBLG1EQUFDO0FBQUEsTUFDQyxPQUFNO0FBQUEsTUFDTixXQUFXO0FBQUEsTUFDWCxTQUFTLE9BQU8saUJBQWlCO0FBQUEsTUFDakMsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLE1BQ1IsT0FBTyxFQUFFLFdBQVcsNkJBQTZCO0FBQUEsT0FFakQsbURBQUM7QUFBQSxNQUFLO0FBQUEsS0FBd0IsQ0FDaEMsQ0FDRjtBQUFBLEVBRUo7QUFHQSxTQUFPLG1EQUFDO0FBQUEsSUFBSSxXQUFXO0FBQUEsR0FBaUI7QUFDMUM7QUE5RGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
