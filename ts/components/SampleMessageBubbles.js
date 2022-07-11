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
var SampleMessageBubbles_exports = {};
__export(SampleMessageBubbles_exports, {
  SampleMessageBubbles: () => SampleMessageBubbles
});
module.exports = __toCommonJS(SampleMessageBubbles_exports);
var import_react = __toESM(require("react"));
var import_timestamp = require("../util/timestamp");
const A_FEW_DAYS_AGO = 60 * 60 * 24 * 5 * 1e3;
const SampleMessage = /* @__PURE__ */ __name(({
  color = "ultramarine",
  direction,
  i18n,
  text,
  timestampDeltaFromNow,
  status,
  style
}) => /* @__PURE__ */ import_react.default.createElement("div", {
  className: `module-message module-message--${direction}`
}, /* @__PURE__ */ import_react.default.createElement("div", {
  className: "module-message__container-outer"
}, /* @__PURE__ */ import_react.default.createElement("div", {
  className: `module-message__container module-message__container--${direction} module-message__container--${direction}-${color}`,
  style
}, /* @__PURE__ */ import_react.default.createElement("div", {
  dir: "auto",
  className: `module-message__text module-message__text--${direction}`
}, /* @__PURE__ */ import_react.default.createElement("span", null, text)), /* @__PURE__ */ import_react.default.createElement("div", {
  className: `module-message__metadata module-message__metadata--${direction}`
}, /* @__PURE__ */ import_react.default.createElement("span", {
  className: `module-message__metadata__date module-message__metadata__date--${direction}`
}, (0, import_timestamp.formatTime)(i18n, Date.now() - timestampDeltaFromNow, Date.now())), direction === "outgoing" && /* @__PURE__ */ import_react.default.createElement("div", {
  className: `module-message__metadata__status-icon module-message__metadata__status-icon--${status}`
}))))), "SampleMessage");
const SampleMessageBubbles = /* @__PURE__ */ __name(({
  backgroundStyle = {},
  color,
  i18n,
  includeAnotherBubble = false
}) => {
  const firstBubbleStyle = includeAnotherBubble ? backgroundStyle : void 0;
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(SampleMessage, {
    color,
    direction: includeAnotherBubble ? "outgoing" : "incoming",
    i18n,
    text: i18n("ChatColorPicker__sampleBubble1"),
    timestampDeltaFromNow: A_FEW_DAYS_AGO,
    status: "read",
    style: firstBubbleStyle
  }), /* @__PURE__ */ import_react.default.createElement("br", null), includeAnotherBubble ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("br", {
    style: { clear: "both" }
  }), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement(SampleMessage, {
    direction: "incoming",
    i18n,
    text: i18n("ChatColorPicker__sampleBubble2"),
    timestampDeltaFromNow: A_FEW_DAYS_AGO / 2,
    status: "read"
  }), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("br", null)) : null, /* @__PURE__ */ import_react.default.createElement(SampleMessage, {
    color,
    direction: "outgoing",
    i18n,
    text: i18n("ChatColorPicker__sampleBubble3"),
    timestampDeltaFromNow: 0,
    status: "delivered",
    style: backgroundStyle
  }), /* @__PURE__ */ import_react.default.createElement("br", {
    style: { clear: "both" }
  }));
}, "SampleMessageBubbles");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SampleMessageBubbles
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2FtcGxlTWVzc2FnZUJ1YmJsZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBDU1NQcm9wZXJ0aWVzIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgZm9ybWF0VGltZSB9IGZyb20gJy4uL3V0aWwvdGltZXN0YW1wJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBiYWNrZ3JvdW5kU3R5bGU/OiBDU1NQcm9wZXJ0aWVzO1xuICBjb2xvcj86IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaW5jbHVkZUFub3RoZXJCdWJibGU/OiBib29sZWFuO1xufTtcblxuY29uc3QgQV9GRVdfREFZU19BR08gPSA2MCAqIDYwICogMjQgKiA1ICogMTAwMDtcblxuY29uc3QgU2FtcGxlTWVzc2FnZSA9ICh7XG4gIGNvbG9yID0gJ3VsdHJhbWFyaW5lJyxcbiAgZGlyZWN0aW9uLFxuICBpMThuLFxuICB0ZXh0LFxuICB0aW1lc3RhbXBEZWx0YUZyb21Ob3csXG4gIHN0YXR1cyxcbiAgc3R5bGUsXG59OiB7XG4gIGNvbG9yPzogQ29udmVyc2F0aW9uQ29sb3JUeXBlO1xuICBkaXJlY3Rpb246ICdpbmNvbWluZycgfCAnb3V0Z29pbmcnO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICB0ZXh0OiBzdHJpbmc7XG4gIHRpbWVzdGFtcERlbHRhRnJvbU5vdzogbnVtYmVyO1xuICBzdGF0dXM6ICdkZWxpdmVyZWQnIHwgJ3JlYWQnIHwgJ3NlbnQnO1xuICBzdHlsZT86IENTU1Byb3BlcnRpZXM7XG59KTogSlNYLkVsZW1lbnQgPT4gKFxuICA8ZGl2IGNsYXNzTmFtZT17YG1vZHVsZS1tZXNzYWdlIG1vZHVsZS1tZXNzYWdlLS0ke2RpcmVjdGlvbn1gfT5cbiAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19jb250YWluZXItb3V0ZXJcIj5cbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtgbW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lciBtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS0ke2RpcmVjdGlvbn0gbW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci0tJHtkaXJlY3Rpb259LSR7Y29sb3J9YH1cbiAgICAgICAgc3R5bGU9e3N0eWxlfVxuICAgICAgPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgZGlyPVwiYXV0b1wiXG4gICAgICAgICAgY2xhc3NOYW1lPXtgbW9kdWxlLW1lc3NhZ2VfX3RleHQgbW9kdWxlLW1lc3NhZ2VfX3RleHQtLSR7ZGlyZWN0aW9ufWB9XG4gICAgICAgID5cbiAgICAgICAgICA8c3Bhbj57dGV4dH08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtgbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhIG1vZHVsZS1tZXNzYWdlX19tZXRhZGF0YS0tJHtkaXJlY3Rpb259YH1cbiAgICAgICAgPlxuICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICBjbGFzc05hbWU9e2Btb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX2RhdGUgbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19kYXRlLS0ke2RpcmVjdGlvbn1gfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtmb3JtYXRUaW1lKGkxOG4sIERhdGUubm93KCkgLSB0aW1lc3RhbXBEZWx0YUZyb21Ob3csIERhdGUubm93KCkpfVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICB7ZGlyZWN0aW9uID09PSAnb3V0Z29pbmcnICYmIChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPXtgbW9kdWxlLW1lc3NhZ2VfX21ldGFkYXRhX19zdGF0dXMtaWNvbiBtb2R1bGUtbWVzc2FnZV9fbWV0YWRhdGFfX3N0YXR1cy1pY29uLS0ke3N0YXR1c31gfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApfVxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICA8L2Rpdj5cbik7XG5cbmV4cG9ydCBjb25zdCBTYW1wbGVNZXNzYWdlQnViYmxlcyA9ICh7XG4gIGJhY2tncm91bmRTdHlsZSA9IHt9LFxuICBjb2xvcixcbiAgaTE4bixcbiAgaW5jbHVkZUFub3RoZXJCdWJibGUgPSBmYWxzZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgZmlyc3RCdWJibGVTdHlsZSA9IGluY2x1ZGVBbm90aGVyQnViYmxlID8gYmFja2dyb3VuZFN0eWxlIDogdW5kZWZpbmVkO1xuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8U2FtcGxlTWVzc2FnZVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIGRpcmVjdGlvbj17aW5jbHVkZUFub3RoZXJCdWJibGUgPyAnb3V0Z29pbmcnIDogJ2luY29taW5nJ31cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgdGV4dD17aTE4bignQ2hhdENvbG9yUGlja2VyX19zYW1wbGVCdWJibGUxJyl9XG4gICAgICAgIHRpbWVzdGFtcERlbHRhRnJvbU5vdz17QV9GRVdfREFZU19BR099XG4gICAgICAgIHN0YXR1cz1cInJlYWRcIlxuICAgICAgICBzdHlsZT17Zmlyc3RCdWJibGVTdHlsZX1cbiAgICAgIC8+XG4gICAgICA8YnIgLz5cbiAgICAgIHtpbmNsdWRlQW5vdGhlckJ1YmJsZSA/IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8YnIgc3R5bGU9e3sgY2xlYXI6ICdib3RoJyB9fSAvPlxuICAgICAgICAgIDxiciAvPlxuICAgICAgICAgIDxTYW1wbGVNZXNzYWdlXG4gICAgICAgICAgICBkaXJlY3Rpb249XCJpbmNvbWluZ1wiXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgdGV4dD17aTE4bignQ2hhdENvbG9yUGlja2VyX19zYW1wbGVCdWJibGUyJyl9XG4gICAgICAgICAgICB0aW1lc3RhbXBEZWx0YUZyb21Ob3c9e0FfRkVXX0RBWVNfQUdPIC8gMn1cbiAgICAgICAgICAgIHN0YXR1cz1cInJlYWRcIlxuICAgICAgICAgIC8+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgICAgPGJyIC8+XG4gICAgICAgIDwvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8U2FtcGxlTWVzc2FnZVxuICAgICAgICBjb2xvcj17Y29sb3J9XG4gICAgICAgIGRpcmVjdGlvbj1cIm91dGdvaW5nXCJcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgdGV4dD17aTE4bignQ2hhdENvbG9yUGlja2VyX19zYW1wbGVCdWJibGUzJyl9XG4gICAgICAgIHRpbWVzdGFtcERlbHRhRnJvbU5vdz17MH1cbiAgICAgICAgc3RhdHVzPVwiZGVsaXZlcmVkXCJcbiAgICAgICAgc3R5bGU9e2JhY2tncm91bmRTdHlsZX1cbiAgICAgIC8+XG4gICAgICA8YnIgc3R5bGU9e3sgY2xlYXI6ICdib3RoJyB9fSAvPlxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBa0I7QUFHbEIsdUJBQTJCO0FBUzNCLE1BQU0saUJBQWlCLEtBQUssS0FBSyxLQUFLLElBQUk7QUFFMUMsTUFBTSxnQkFBZ0Isd0JBQUM7QUFBQSxFQUNyQixRQUFRO0FBQUEsRUFDUjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFVQSxtREFBQztBQUFBLEVBQUksV0FBVyxrQ0FBa0M7QUFBQSxHQUNoRCxtREFBQztBQUFBLEVBQUksV0FBVTtBQUFBLEdBQ2IsbURBQUM7QUFBQSxFQUNDLFdBQVcsd0RBQXdELHdDQUF3QyxhQUFhO0FBQUEsRUFDeEg7QUFBQSxHQUVBLG1EQUFDO0FBQUEsRUFDQyxLQUFJO0FBQUEsRUFDSixXQUFXLDhDQUE4QztBQUFBLEdBRXpELG1EQUFDLGNBQU0sSUFBSyxDQUNkLEdBQ0EsbURBQUM7QUFBQSxFQUNDLFdBQVcsc0RBQXNEO0FBQUEsR0FFakUsbURBQUM7QUFBQSxFQUNDLFdBQVcsa0VBQWtFO0FBQUEsR0FFNUUsaUNBQVcsTUFBTSxLQUFLLElBQUksSUFBSSx1QkFBdUIsS0FBSyxJQUFJLENBQUMsQ0FDbEUsR0FDQyxjQUFjLGNBQ2IsbURBQUM7QUFBQSxFQUNDLFdBQVcsZ0ZBQWdGO0FBQUEsQ0FDN0YsQ0FFSixDQUNGLENBQ0YsQ0FDRixHQTdDb0I7QUFnRGYsTUFBTSx1QkFBdUIsd0JBQUM7QUFBQSxFQUNuQyxrQkFBa0IsQ0FBQztBQUFBLEVBQ25CO0FBQUEsRUFDQTtBQUFBLEVBQ0EsdUJBQXVCO0FBQUEsTUFDSztBQUM1QixRQUFNLG1CQUFtQix1QkFBdUIsa0JBQWtCO0FBQ2xFLFNBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxXQUFXLHVCQUF1QixhQUFhO0FBQUEsSUFDL0M7QUFBQSxJQUNBLE1BQU0sS0FBSyxnQ0FBZ0M7QUFBQSxJQUMzQyx1QkFBdUI7QUFBQSxJQUN2QixRQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsR0FDVCxHQUNBLG1EQUFDLFVBQUcsR0FDSCx1QkFDQyx3RkFDRSxtREFBQztBQUFBLElBQUcsT0FBTyxFQUFFLE9BQU8sT0FBTztBQUFBLEdBQUcsR0FDOUIsbURBQUMsVUFBRyxHQUNKLG1EQUFDO0FBQUEsSUFDQyxXQUFVO0FBQUEsSUFDVjtBQUFBLElBQ0EsTUFBTSxLQUFLLGdDQUFnQztBQUFBLElBQzNDLHVCQUF1QixpQkFBaUI7QUFBQSxJQUN4QyxRQUFPO0FBQUEsR0FDVCxHQUNBLG1EQUFDLFVBQUcsR0FDSixtREFBQyxVQUFHLENBQ04sSUFDRSxNQUNKLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsV0FBVTtBQUFBLElBQ1Y7QUFBQSxJQUNBLE1BQU0sS0FBSyxnQ0FBZ0M7QUFBQSxJQUMzQyx1QkFBdUI7QUFBQSxJQUN2QixRQUFPO0FBQUEsSUFDUCxPQUFPO0FBQUEsR0FDVCxHQUNBLG1EQUFDO0FBQUEsSUFBRyxPQUFPLEVBQUUsT0FBTyxPQUFPO0FBQUEsR0FBRyxDQUNoQztBQUVKLEdBOUNvQzsiLAogICJuYW1lcyI6IFtdCn0K
