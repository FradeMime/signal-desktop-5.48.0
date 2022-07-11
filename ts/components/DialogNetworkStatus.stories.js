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
var DialogNetworkStatus_stories_exports = {};
__export(DialogNetworkStatus_stories_exports, {
  ClosedNarrow: () => ClosedNarrow,
  ClosedWide: () => ClosedWide,
  ClosingNarrow: () => ClosingNarrow,
  ClosingWide: () => ClosingWide,
  ConnectingNarrow: () => ConnectingNarrow,
  ConnectingWide: () => ConnectingWide,
  KnobsPlayground: () => KnobsPlayground,
  OfflineNarrow: () => OfflineNarrow,
  OfflineWide: () => OfflineWide,
  default: () => DialogNetworkStatus_stories_default
});
module.exports = __toCommonJS(DialogNetworkStatus_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_DialogNetworkStatus = require("./DialogNetworkStatus");
var import_SocketStatus = require("../types/SocketStatus");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_util = require("./_util");
var import_FakeLeftPaneContainer = require("../test-both/helpers/FakeLeftPaneContainer");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  hasNetworkDialog: true,
  i18n,
  isOnline: true,
  socketStatus: import_SocketStatus.SocketStatus.CONNECTING,
  manualReconnect: (0, import_addon_actions.action)("manual-reconnect"),
  withinConnectingGracePeriod: false,
  challengeStatus: "idle"
};
var DialogNetworkStatus_stories_default = {
  title: "Components/DialogNetworkStatus"
};
const KnobsPlayground = /* @__PURE__ */ __name((args) => {
  return /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
    ...args
  }, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
    ...defaultProps,
    ...args
  }));
}, "KnobsPlayground");
KnobsPlayground.args = {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  hasNetworkDialog: true,
  isOnline: true,
  socketStatus: import_SocketStatus.SocketStatus.CONNECTING
};
const ConnectingWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  socketStatus: import_SocketStatus.SocketStatus.CONNECTING
})), "ConnectingWide");
ConnectingWide.story = {
  name: "Connecting Wide"
};
const ClosingWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  socketStatus: import_SocketStatus.SocketStatus.CLOSING
})), "ClosingWide");
ClosingWide.story = {
  name: "Closing Wide"
};
const ClosedWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  socketStatus: import_SocketStatus.SocketStatus.CLOSED
})), "ClosedWide");
ClosedWide.story = {
  name: "Closed Wide"
};
const OfflineWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  isOnline: false
})), "OfflineWide");
OfflineWide.story = {
  name: "Offline Wide"
};
const ConnectingNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  socketStatus: import_SocketStatus.SocketStatus.CONNECTING
})), "ConnectingNarrow");
ConnectingNarrow.story = {
  name: "Connecting Narrow"
};
const ClosingNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  socketStatus: import_SocketStatus.SocketStatus.CLOSING
})), "ClosingNarrow");
ClosingNarrow.story = {
  name: "Closing Narrow"
};
const ClosedNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  socketStatus: import_SocketStatus.SocketStatus.CLOSED
})), "ClosedNarrow");
ClosedNarrow.story = {
  name: "Closed Narrow"
};
const OfflineNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogNetworkStatus.DialogNetworkStatus, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  isOnline: false
})), "OfflineNarrow");
OfflineNarrow.story = {
  name: "Offline Narrow"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ClosedNarrow,
  ClosedWide,
  ClosingNarrow,
  ClosingWide,
  ConnectingNarrow,
  ConnectingWide,
  KnobsPlayground,
  OfflineNarrow,
  OfflineWide
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nTmV0d29ya1N0YXR1cy5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9EaWFsb2dOZXR3b3JrU3RhdHVzJztcbmltcG9ydCB7IERpYWxvZ05ldHdvcmtTdGF0dXMgfSBmcm9tICcuL0RpYWxvZ05ldHdvcmtTdGF0dXMnO1xuaW1wb3J0IHsgU29ja2V0U3RhdHVzIH0gZnJvbSAnLi4vdHlwZXMvU29ja2V0U3RhdHVzJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgeyBGYWtlTGVmdFBhbmVDb250YWluZXIgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9GYWtlTGVmdFBhbmVDb250YWluZXInO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBkZWZhdWx0UHJvcHMgPSB7XG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50LldpZGUsXG4gIGhhc05ldHdvcmtEaWFsb2c6IHRydWUsXG4gIGkxOG4sXG4gIGlzT25saW5lOiB0cnVlLFxuICBzb2NrZXRTdGF0dXM6IFNvY2tldFN0YXR1cy5DT05ORUNUSU5HLFxuICBtYW51YWxSZWNvbm5lY3Q6IGFjdGlvbignbWFudWFsLXJlY29ubmVjdCcpLFxuICB3aXRoaW5Db25uZWN0aW5nR3JhY2VQZXJpb2Q6IGZhbHNlLFxuICBjaGFsbGVuZ2VTdGF0dXM6ICdpZGxlJyBhcyBjb25zdCxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0RpYWxvZ05ldHdvcmtTdGF0dXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEtub2JzUGxheWdyb3VuZCA9IChhcmdzOiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIC8qXG4gIGNvbnN0IHNvY2tldFN0YXR1cyA9IHNlbGVjdChcbiAgICAnc29ja2V0U3RhdHVzJyxcbiAgICB7XG4gICAgICBDT05ORUNUSU5HOiBTb2NrZXRTdGF0dXMuQ09OTkVDVElORyxcbiAgICAgIE9QRU46IFNvY2tldFN0YXR1cy5PUEVOLFxuICAgICAgQ0xPU0lORzogU29ja2V0U3RhdHVzLkNMT1NJTkcsXG4gICAgICBDTE9TRUQ6IFNvY2tldFN0YXR1cy5DTE9TRUQsXG4gICAgfSxcbiAgICBTb2NrZXRTdGF0dXMuQ09OTkVDVElOR1xuICApO1xuICAgKi9cblxuICByZXR1cm4gKFxuICAgIDxGYWtlTGVmdFBhbmVDb250YWluZXIgey4uLmFyZ3N9PlxuICAgICAgPERpYWxvZ05ldHdvcmtTdGF0dXMgey4uLmRlZmF1bHRQcm9wc30gey4uLmFyZ3N9IC8+XG4gICAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4gICk7XG59O1xuS25vYnNQbGF5Z3JvdW5kLmFyZ3MgPSB7XG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50LldpZGUsXG4gIGhhc05ldHdvcmtEaWFsb2c6IHRydWUsXG4gIGlzT25saW5lOiB0cnVlLFxuICBzb2NrZXRTdGF0dXM6IFNvY2tldFN0YXR1cy5DT05ORUNUSU5HLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbm5lY3RpbmdXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nTmV0d29ya1N0YXR1c1xuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9XG4gICAgICBzb2NrZXRTdGF0dXM9e1NvY2tldFN0YXR1cy5DT05ORUNUSU5HfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ29ubmVjdGluZ1dpZGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb25uZWN0aW5nIFdpZGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IENsb3NpbmdXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nTmV0d29ya1N0YXR1c1xuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9XG4gICAgICBzb2NrZXRTdGF0dXM9e1NvY2tldFN0YXR1cy5DTE9TSU5HfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ2xvc2luZ1dpZGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdDbG9zaW5nIFdpZGUnLFxufTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZFdpZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9PlxuICAgIDxEaWFsb2dOZXR3b3JrU3RhdHVzXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIHNvY2tldFN0YXR1cz17U29ja2V0U3RhdHVzLkNMT1NFRH1cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkNsb3NlZFdpZGUuc3RvcnkgPSB7XG4gIG5hbWU6ICdDbG9zZWQgV2lkZScsXG59O1xuXG5leHBvcnQgY29uc3QgT2ZmbGluZVdpZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9PlxuICAgIDxEaWFsb2dOZXR3b3JrU3RhdHVzXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIGlzT25saW5lPXtmYWxzZX1cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbk9mZmxpbmVXaWRlLnN0b3J5ID0ge1xuICBuYW1lOiAnT2ZmbGluZSBXaWRlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb25uZWN0aW5nTmFycm93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9PlxuICAgIDxEaWFsb2dOZXR3b3JrU3RhdHVzXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fVxuICAgICAgc29ja2V0U3RhdHVzPXtTb2NrZXRTdGF0dXMuQ09OTkVDVElOR31cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkNvbm5lY3RpbmdOYXJyb3cuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb25uZWN0aW5nIE5hcnJvdycsXG59O1xuXG5leHBvcnQgY29uc3QgQ2xvc2luZ05hcnJvdyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fT5cbiAgICA8RGlhbG9nTmV0d29ya1N0YXR1c1xuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd31cbiAgICAgIHNvY2tldFN0YXR1cz17U29ja2V0U3RhdHVzLkNMT1NJTkd9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5DbG9zaW5nTmFycm93LnN0b3J5ID0ge1xuICBuYW1lOiAnQ2xvc2luZyBOYXJyb3cnLFxufTtcblxuZXhwb3J0IGNvbnN0IENsb3NlZE5hcnJvdyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fT5cbiAgICA8RGlhbG9nTmV0d29ya1N0YXR1c1xuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd31cbiAgICAgIHNvY2tldFN0YXR1cz17U29ja2V0U3RhdHVzLkNMT1NFRH1cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkNsb3NlZE5hcnJvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ0Nsb3NlZCBOYXJyb3cnLFxufTtcblxuZXhwb3J0IGNvbnN0IE9mZmxpbmVOYXJyb3cgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd30+XG4gICAgPERpYWxvZ05ldHdvcmtTdGF0dXNcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9XG4gICAgICBpc09ubGluZT17ZmFsc2V9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5PZmZsaW5lTmFycm93LnN0b3J5ID0ge1xuICBuYW1lOiAnT2ZmbGluZSBOYXJyb3cnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QiwyQkFBdUI7QUFHdkIsaUNBQW9DO0FBQ3BDLDBCQUE2QjtBQUM3Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBQ3ZCLGtCQUFnQztBQUNoQyxtQ0FBc0M7QUFFdEMsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsTUFBTSxlQUFlO0FBQUEsRUFDbkIsMEJBQTBCLDRCQUFnQjtBQUFBLEVBQzFDLGtCQUFrQjtBQUFBLEVBQ2xCO0FBQUEsRUFDQSxVQUFVO0FBQUEsRUFDVixjQUFjLGlDQUFhO0FBQUEsRUFDM0IsaUJBQWlCLGlDQUFPLGtCQUFrQjtBQUFBLEVBQzFDLDZCQUE2QjtBQUFBLEVBQzdCLGlCQUFpQjtBQUNuQjtBQUVBLElBQU8sc0NBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sa0JBQWtCLHdCQUFDLFNBQWlDO0FBYy9ELFNBQ0Usb0NBQUM7QUFBQSxPQUEwQjtBQUFBLEtBQ3pCLG9DQUFDO0FBQUEsT0FBd0I7QUFBQSxPQUFrQjtBQUFBLEdBQU0sQ0FDbkQ7QUFFSixHQW5CK0I7QUFvQi9CLGdCQUFnQixPQUFPO0FBQUEsRUFDckIsMEJBQTBCLDRCQUFnQjtBQUFBLEVBQzFDLGtCQUFrQjtBQUFBLEVBQ2xCLFVBQVU7QUFBQSxFQUNWLGNBQWMsaUNB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
