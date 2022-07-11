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
var About_exports = {};
__export(About_exports, {
  About: () => About
});
module.exports = __toCommonJS(About_exports);
var import_react = __toESM(require("react"));
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
var import_useTheme = require("../hooks/useTheme");
var import_TitleBarContainer = require("./TitleBarContainer");
const About = /* @__PURE__ */ __name(({
  closeAbout,
  i18n,
  environment,
  version,
  platform,
  isWindows11,
  executeMenuRole
}) => {
  (0, import_useEscapeHandling.useEscapeHandling)(closeAbout);
  const theme = (0, import_useTheme.useTheme)();
  return /* @__PURE__ */ import_react.default.createElement(import_TitleBarContainer.TitleBarContainer, {
    platform,
    isWindows11,
    theme,
    executeMenuRole
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "About"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-splash-screen"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-splash-screen__logo module-img--150"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "version"
  }, version), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "environment"
  }, environment), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("a", {
    href: "https://signal.org"
  }, "signal.org")), /* @__PURE__ */ import_react.default.createElement("br", null), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("a", {
    className: "acknowledgments",
    href: "https://github.com/signalapp/Signal-Desktop/blob/main/ACKNOWLEDGMENTS.md"
  }, i18n("softwareAcknowledgments"))), /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("a", {
    className: "privacy",
    href: "https://signal.org/legal"
  }, i18n("privacyPolicy"))))));
}, "About");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  About
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQWJvdXQudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyB1c2VFc2NhcGVIYW5kbGluZyB9IGZyb20gJy4uL2hvb2tzL3VzZUVzY2FwZUhhbmRsaW5nJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vaG9va3MvdXNlVGhlbWUnO1xuaW1wb3J0IHsgVGl0bGVCYXJDb250YWluZXIgfSBmcm9tICcuL1RpdGxlQmFyQ29udGFpbmVyJztcbmltcG9ydCB0eXBlIHsgRXhlY3V0ZU1lbnVSb2xlVHlwZSB9IGZyb20gJy4vVGl0bGVCYXJDb250YWluZXInO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNsb3NlQWJvdXQ6ICgpID0+IHVua25vd247XG4gIGVudmlyb25tZW50OiBzdHJpbmc7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHZlcnNpb246IHN0cmluZztcbiAgcGxhdGZvcm06IHN0cmluZztcbiAgaXNXaW5kb3dzMTE6IGJvb2xlYW47XG4gIGV4ZWN1dGVNZW51Um9sZTogRXhlY3V0ZU1lbnVSb2xlVHlwZTtcbn07XG5cbmV4cG9ydCBjb25zdCBBYm91dCA9ICh7XG4gIGNsb3NlQWJvdXQsXG4gIGkxOG4sXG4gIGVudmlyb25tZW50LFxuICB2ZXJzaW9uLFxuICBwbGF0Zm9ybSxcbiAgaXNXaW5kb3dzMTEsXG4gIGV4ZWN1dGVNZW51Um9sZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgdXNlRXNjYXBlSGFuZGxpbmcoY2xvc2VBYm91dCk7XG5cbiAgY29uc3QgdGhlbWUgPSB1c2VUaGVtZSgpO1xuXG4gIHJldHVybiAoXG4gICAgPFRpdGxlQmFyQ29udGFpbmVyXG4gICAgICBwbGF0Zm9ybT17cGxhdGZvcm19XG4gICAgICBpc1dpbmRvd3MxMT17aXNXaW5kb3dzMTF9XG4gICAgICB0aGVtZT17dGhlbWV9XG4gICAgICBleGVjdXRlTWVudVJvbGU9e2V4ZWN1dGVNZW51Um9sZX1cbiAgICA+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkFib3V0XCI+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLXNwbGFzaC1zY3JlZW5cIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1zcGxhc2gtc2NyZWVuX19sb2dvIG1vZHVsZS1pbWctLTE1MFwiIC8+XG5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInZlcnNpb25cIj57dmVyc2lvbn08L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cImVudmlyb25tZW50XCI+e2Vudmlyb25tZW50fTwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YSBocmVmPVwiaHR0cHM6Ly9zaWduYWwub3JnXCI+c2lnbmFsLm9yZzwvYT5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8YnIgLz5cbiAgICAgICAgICA8ZGl2PlxuICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgY2xhc3NOYW1lPVwiYWNrbm93bGVkZ21lbnRzXCJcbiAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3AvYmxvYi9tYWluL0FDS05PV0xFREdNRU5UUy5tZFwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpMThuKCdzb2Z0d2FyZUFja25vd2xlZGdtZW50cycpfVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8YSBjbGFzc05hbWU9XCJwcml2YWN5XCIgaHJlZj1cImh0dHBzOi8vc2lnbmFsLm9yZy9sZWdhbFwiPlxuICAgICAgICAgICAgICB7aTE4bigncHJpdmFjeVBvbGljeScpfVxuICAgICAgICAgICAgPC9hPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICA8L2Rpdj5cbiAgICAgIDwvZGl2PlxuICAgIDwvVGl0bGVCYXJDb250YWluZXI+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUdsQiwrQkFBa0M7QUFDbEMsc0JBQXlCO0FBQ3pCLCtCQUFrQztBQWEzQixNQUFNLFFBQVEsd0JBQUM7QUFBQSxFQUNwQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLGtEQUFrQixVQUFVO0FBRTVCLFFBQU0sUUFBUSw4QkFBUztBQUV2QixTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FDYixtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEdBQTZDLEdBRTVELG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FBVyxPQUFRLEdBQ2xDLG1EQUFDO0FBQUEsSUFBSSxXQUFVO0FBQUEsS0FBZSxXQUFZLEdBQzFDLG1EQUFDLGFBQ0MsbURBQUM7QUFBQSxJQUFFLE1BQUs7QUFBQSxLQUFxQixZQUFVLENBQ3pDLEdBQ0EsbURBQUMsVUFBRyxHQUNKLG1EQUFDLGFBQ0MsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLE1BQUs7QUFBQSxLQUVKLEtBQUsseUJBQXlCLENBQ2pDLENBQ0YsR0FDQSxtREFBQyxhQUNDLG1EQUFDO0FBQUEsSUFBRSxXQUFVO0FBQUEsSUFBVSxNQUFLO0FBQUEsS0FDekIsS0FBSyxlQUFlLENBQ3ZCLENBQ0YsQ0FDRixDQUNGLENBQ0Y7QUFFSixHQS9DcUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
