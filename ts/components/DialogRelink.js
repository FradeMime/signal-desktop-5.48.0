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
var DialogRelink_exports = {};
__export(DialogRelink_exports, {
  DialogRelink: () => DialogRelink
});
module.exports = __toCommonJS(DialogRelink_exports);
var import_react = __toESM(require("react"));
var import_LeftPaneDialog = require("./LeftPaneDialog");
const DialogRelink = /* @__PURE__ */ __name(({
  containerWidthBreakpoint,
  i18n,
  isRegistrationDone,
  relinkDevice
}) => {
  if (isRegistrationDone) {
    return null;
  }
  return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
    containerWidthBreakpoint,
    type: "warning",
    icon: "relink",
    clickLabel: i18n("unlinkedWarning"),
    onClick: relinkDevice,
    title: i18n("unlinked"),
    hasAction: true
  });
}, "DialogRelink");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogRelink
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nUmVsaW5rLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuL191dGlsJztcblxuaW1wb3J0IHsgTGVmdFBhbmVEaWFsb2cgfSBmcm9tICcuL0xlZnRQYW5lRGlhbG9nJztcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgaXNSZWdpc3RyYXRpb25Eb25lOiBib29sZWFuO1xuICByZWxpbmtEZXZpY2U6ICgpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY29uc3QgRGlhbG9nUmVsaW5rID0gKHtcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50LFxuICBpMThuLFxuICBpc1JlZ2lzdHJhdGlvbkRvbmUsXG4gIHJlbGlua0RldmljZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGlmIChpc1JlZ2lzdHJhdGlvbkRvbmUpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e2NvbnRhaW5lcldpZHRoQnJlYWtwb2ludH1cbiAgICAgIHR5cGU9XCJ3YXJuaW5nXCJcbiAgICAgIGljb249XCJyZWxpbmtcIlxuICAgICAgY2xpY2tMYWJlbD17aTE4bigndW5saW5rZWRXYXJuaW5nJyl9XG4gICAgICBvbkNsaWNrPXtyZWxpbmtEZXZpY2V9XG4gICAgICB0aXRsZT17aTE4bigndW5saW5rZWQnKX1cbiAgICAgIGhhc0FjdGlvblxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUtsQiw0QkFBK0I7QUFTeEIsTUFBTSxlQUFlLHdCQUFDO0FBQUEsRUFDM0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUNtQztBQUNuQyxNQUFJLG9CQUFvQjtBQUN0QixXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQSxNQUFLO0FBQUEsSUFDTCxNQUFLO0FBQUEsSUFDTCxZQUFZLEtBQUssaUJBQWlCO0FBQUEsSUFDbEMsU0FBUztBQUFBLElBQ1QsT0FBTyxLQUFLLFVBQVU7QUFBQSxJQUN0QixXQUFTO0FBQUEsR0FDWDtBQUVKLEdBckI0QjsiLAogICJuYW1lcyI6IFtdCn0K
