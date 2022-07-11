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
var FakeLeftPaneContainer_exports = {};
__export(FakeLeftPaneContainer_exports, {
  FakeLeftPaneContainer: () => FakeLeftPaneContainer
});
module.exports = __toCommonJS(FakeLeftPaneContainer_exports);
var import_react = __toESM(require("react"));
var import_util = require("../../components/_util");
const WIDTHS = {
  [import_util.WidthBreakpoint.Wide]: 350,
  [import_util.WidthBreakpoint.Medium]: 280,
  [import_util.WidthBreakpoint.Narrow]: 130
};
const FakeLeftPaneContainer = /* @__PURE__ */ __name(({
  children,
  containerWidthBreakpoint
}) => {
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: `module-left-pane--width-${containerWidthBreakpoint}`,
    style: { width: WIDTHS[containerWidthBreakpoint] }
  }, children);
}, "FakeLeftPaneContainer");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  FakeLeftPaneContainer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRmFrZUxlZnRQYW5lQ29udGFpbmVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEZ1bmN0aW9uQ29tcG9uZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IFdpZHRoQnJlYWtwb2ludCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvX3V0aWwnO1xuXG50eXBlIFByb3BzVHlwZSA9IHtcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQ7XG59O1xuXG5jb25zdCBXSURUSFMgPSB7XG4gIFtXaWR0aEJyZWFrcG9pbnQuV2lkZV06IDM1MCxcbiAgW1dpZHRoQnJlYWtwb2ludC5NZWRpdW1dOiAyODAsXG4gIFtXaWR0aEJyZWFrcG9pbnQuTmFycm93XTogMTMwLFxufTtcblxuZXhwb3J0IGNvbnN0IEZha2VMZWZ0UGFuZUNvbnRhaW5lcjogRnVuY3Rpb25Db21wb25lbnQ8UHJvcHNUeXBlPiA9ICh7XG4gIGNoaWxkcmVuLFxuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQsXG59KSA9PiB7XG4gIHJldHVybiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3NOYW1lPXtgbW9kdWxlLWxlZnQtcGFuZS0td2lkdGgtJHtjb250YWluZXJXaWR0aEJyZWFrcG9pbnR9YH1cbiAgICAgIHN0eWxlPXt7IHdpZHRoOiBXSURUSFNbY29udGFpbmVyV2lkdGhCcmVha3BvaW50XSB9fVxuICAgID5cbiAgICAgIHtjaGlsZHJlbn1cbiAgICA8L2Rpdj5cbiAgKTtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsbUJBQWtCO0FBQ2xCLGtCQUFnQztBQU1oQyxNQUFNLFNBQVM7QUFBQSxHQUNaLDRCQUFnQixPQUFPO0FBQUEsR0FDdkIsNEJBQWdCLFNBQVM7QUFBQSxHQUN6Qiw0QkFBZ0IsU0FBUztBQUM1QjtBQUVPLE1BQU0sd0JBQXNELHdCQUFDO0FBQUEsRUFDbEU7QUFBQSxFQUNBO0FBQUEsTUFDSTtBQUNKLFNBQ0UsbURBQUM7QUFBQSxJQUNDLFdBQVcsMkJBQTJCO0FBQUEsSUFDdEMsT0FBTyxFQUFFLE9BQU8sT0FBTywwQkFBMEI7QUFBQSxLQUVoRCxRQUNIO0FBRUosR0FabUU7IiwKICAibmFtZXMiOiBbXQp9Cg==
