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
var DialogNetworkStatus_exports = {};
__export(DialogNetworkStatus_exports, {
  DialogNetworkStatus: () => DialogNetworkStatus
});
module.exports = __toCommonJS(DialogNetworkStatus_exports);
var import_react = __toESM(require("react"));
var import_LeftPaneDialog = require("./LeftPaneDialog");
var import_Spinner = require("./Spinner");
var import_SocketStatus = require("../types/SocketStatus");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
const FIVE_SECONDS = 5 * 1e3;
const DialogNetworkStatus = /* @__PURE__ */ __name(({
  containerWidthBreakpoint,
  hasNetworkDialog,
  i18n,
  isOnline,
  socketStatus,
  manualReconnect
}) => {
  const [isConnecting, setIsConnecting] = import_react.default.useState(socketStatus === import_SocketStatus.SocketStatus.CONNECTING);
  (0, import_react.useEffect)(() => {
    if (!hasNetworkDialog) {
      return () => null;
    }
    let timeout;
    if (isConnecting) {
      timeout = setTimeout(() => {
        setIsConnecting(false);
      }, FIVE_SECONDS);
    }
    return () => {
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timeout);
    };
  }, [hasNetworkDialog, isConnecting, setIsConnecting]);
  const reconnect = /* @__PURE__ */ __name(() => {
    setIsConnecting(true);
    manualReconnect();
  }, "reconnect");
  if (!hasNetworkDialog) {
    return null;
  }
  if (isConnecting) {
    const spinner = /* @__PURE__ */ import_react.default.createElement("div", {
      className: "LeftPaneDialog__spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      direction: "on-avatar",
      moduleClassName: "LeftPaneDialog__spinner",
      size: "22px",
      svgSize: "small"
    }));
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
      containerWidthBreakpoint,
      type: "warning",
      icon: spinner,
      title: i18n("connecting"),
      subtitle: i18n("connectingHangOn")
    });
  }
  return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
    containerWidthBreakpoint,
    type: "warning",
    icon: "network",
    title: isOnline ? i18n("disconnected") : i18n("offline"),
    subtitle: i18n("checkNetworkConnection"),
    hasAction: true,
    clickLabel: i18n("connect"),
    onClick: reconnect
  });
}, "DialogNetworkStatus");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogNetworkStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nTmV0d29ya1N0YXR1cy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBMZWZ0UGFuZURpYWxvZyB9IGZyb20gJy4vTGVmdFBhbmVEaWFsb2cnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNvY2tldFN0YXR1cyB9IGZyb20gJy4uL3R5cGVzL1NvY2tldFN0YXR1cyc7XG5pbXBvcnQgdHlwZSB7IE5ldHdvcmtTdGF0ZVR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9uZXR3b3JrJztcbmltcG9ydCB0eXBlIHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuXG5jb25zdCBGSVZFX1NFQ09ORFMgPSA1ICogMTAwMDtcblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0gTmV0d29ya1N0YXRlVHlwZSAmIHtcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQ7XG4gIGhhc05ldHdvcmtEaWFsb2c6IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIG1hbnVhbFJlY29ubmVjdDogKCkgPT4gdm9pZDtcbn07XG5cbmV4cG9ydCBjb25zdCBEaWFsb2dOZXR3b3JrU3RhdHVzID0gKHtcbiAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50LFxuICBoYXNOZXR3b3JrRGlhbG9nLFxuICBpMThuLFxuICBpc09ubGluZSxcbiAgc29ja2V0U3RhdHVzLFxuICBtYW51YWxSZWNvbm5lY3QsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCB8IG51bGwgPT4ge1xuICBjb25zdCBbaXNDb25uZWN0aW5nLCBzZXRJc0Nvbm5lY3RpbmddID0gUmVhY3QudXNlU3RhdGU8Ym9vbGVhbj4oXG4gICAgc29ja2V0U3RhdHVzID09PSBTb2NrZXRTdGF0dXMuQ09OTkVDVElOR1xuICApO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaGFzTmV0d29ya0RpYWxvZykge1xuICAgICAgcmV0dXJuICgpID0+IG51bGw7XG4gICAgfVxuXG4gICAgbGV0IHRpbWVvdXQ6IE5vZGVKUy5UaW1lb3V0O1xuXG4gICAgaWYgKGlzQ29ubmVjdGluZykge1xuICAgICAgdGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBzZXRJc0Nvbm5lY3RpbmcoZmFsc2UpO1xuICAgICAgfSwgRklWRV9TRUNPTkRTKTtcbiAgICB9XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZW91dCk7XG4gICAgfTtcbiAgfSwgW2hhc05ldHdvcmtEaWFsb2csIGlzQ29ubmVjdGluZywgc2V0SXNDb25uZWN0aW5nXSk7XG5cbiAgY29uc3QgcmVjb25uZWN0ID0gKCkgPT4ge1xuICAgIHNldElzQ29ubmVjdGluZyh0cnVlKTtcbiAgICBtYW51YWxSZWNvbm5lY3QoKTtcbiAgfTtcblxuICBpZiAoIWhhc05ldHdvcmtEaWFsb2cpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGlmIChpc0Nvbm5lY3RpbmcpIHtcbiAgICBjb25zdCBzcGlubmVyID0gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJMZWZ0UGFuZURpYWxvZ19fc3Bpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgPFNwaW5uZXJcbiAgICAgICAgICBkaXJlY3Rpb249XCJvbi1hdmF0YXJcIlxuICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIkxlZnRQYW5lRGlhbG9nX19zcGlubmVyXCJcbiAgICAgICAgICBzaXplPVwiMjJweFwiXG4gICAgICAgICAgc3ZnU2l6ZT1cInNtYWxsXCJcbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgICB0eXBlPVwid2FybmluZ1wiXG4gICAgICAgIGljb249e3NwaW5uZXJ9XG4gICAgICAgIHRpdGxlPXtpMThuKCdjb25uZWN0aW5nJyl9XG4gICAgICAgIHN1YnRpdGxlPXtpMThuKCdjb25uZWN0aW5nSGFuZ09uJyl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxMZWZ0UGFuZURpYWxvZ1xuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtjb250YWluZXJXaWR0aEJyZWFrcG9pbnR9XG4gICAgICB0eXBlPVwid2FybmluZ1wiXG4gICAgICBpY29uPVwibmV0d29ya1wiXG4gICAgICB0aXRsZT17aXNPbmxpbmUgPyBpMThuKCdkaXNjb25uZWN0ZWQnKSA6IGkxOG4oJ29mZmxpbmUnKX1cbiAgICAgIHN1YnRpdGxlPXtpMThuKCdjaGVja05ldHdvcmtDb25uZWN0aW9uJyl9XG4gICAgICBoYXNBY3Rpb25cbiAgICAgIGNsaWNrTGFiZWw9e2kxOG4oJ2Nvbm5lY3QnKX1cbiAgICAgIG9uQ2xpY2s9e3JlY29ubmVjdH1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBaUM7QUFFakMsNEJBQStCO0FBQy9CLHFCQUF3QjtBQUV4QiwwQkFBNkI7QUFHN0IscUNBQXdDO0FBRXhDLE1BQU0sZUFBZSxJQUFJO0FBU2xCLE1BQU0sc0JBQXNCLHdCQUFDO0FBQUEsRUFDbEM7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQ21DO0FBQ25DLFFBQU0sQ0FBQyxjQUFjLG1CQUFtQixxQkFBTSxTQUM1QyxpQkFBaUIsaUNBQWEsVUFDaEM7QUFDQSw4QkFBVSxNQUFNO0FBQ2QsUUFBSSxDQUFDLGtCQUFrQjtBQUNyQixhQUFPLE1BQU07QUFBQSxJQUNmO0FBRUEsUUFBSTtBQUVKLFFBQUksY0FBYztBQUNoQixnQkFBVSxXQUFXLE1BQU07QUFDekIsd0JBQWdCLEtBQUs7QUFBQSxNQUN2QixHQUFHLFlBQVk7QUFBQSxJQUNqQjtBQUVBLFdBQU8sTUFBTTtBQUNYLGtFQUF3QixPQUFPO0FBQUEsSUFDakM7QUFBQSxFQUNGLEdBQUcsQ0FBQyxrQkFBa0IsY0FBYyxlQUFlLENBQUM7QUFFcEQsUUFBTSxZQUFZLDZCQUFNO0FBQ3RCLG9CQUFnQixJQUFJO0FBQ3BCLG9CQUFnQjtBQUFBLEVBQ2xCLEdBSGtCO0FBS2xCLE1BQUksQ0FBQyxrQkFBa0I7QUFDckIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLGNBQWM7QUFDaEIsVUFBTSxVQUNKLG1EQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FDYixtREFBQztBQUFBLE1BQ0MsV0FBVTtBQUFBLE1BQ1YsaUJBQWdCO0FBQUEsTUFDaEIsTUFBSztBQUFBLE1BQ0wsU0FBUTtBQUFBLEtBQ1YsQ0FDRjtBQUdGLFdBQ0UsbURBQUM7QUFBQSxNQUNDO0FBQUEsTUFDQSxNQUFLO0FBQUEsTUFDTCxNQUFNO0FBQUEsTUFDTixPQUFPLEtBQUssWUFBWTtBQUFBLE1BQ3hCLFVBQVUsS0FBSyxrQkFBa0I7QUFBQSxLQUNuQztBQUFBLEVBRUo7QUFFQSxTQUNFLG1EQUFDO0FBQUEsSUFDQztBQUFBLElBQ0EsTUFBSztBQUFBLElBQ0wsTUFBSztBQUFBLElBQ0wsT0FBTyxXQUFXLEtBQUssY0FBYyxJQUFJLEtBQUssU0FBUztBQUFBLElBQ3ZELFVBQVUsS0FBSyx3QkFBd0I7QUFBQSxJQUN2QyxXQUFTO0FBQUEsSUFDVCxZQUFZLEtBQUssU0FBUztBQUFBLElBQzFCLFNBQVM7QUFBQSxHQUNYO0FBRUosR0F6RW1DOyIsCiAgIm5hbWVzIjogW10KfQo=
