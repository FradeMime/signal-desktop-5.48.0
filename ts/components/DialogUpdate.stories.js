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
var DialogUpdate_stories_exports = {};
__export(DialogUpdate_stories_exports, {
  CannotUpdateBetaNarrow: () => CannotUpdateBetaNarrow,
  CannotUpdateBetaWide: () => CannotUpdateBetaWide,
  CannotUpdateNarrow: () => CannotUpdateNarrow,
  CannotUpdateRequireManualBetaNarrow: () => CannotUpdateRequireManualBetaNarrow,
  CannotUpdateRequireManualBetaWide: () => CannotUpdateRequireManualBetaWide,
  CannotUpdateRequireManualNarrow: () => CannotUpdateRequireManualNarrow,
  CannotUpdateRequireManualWide: () => CannotUpdateRequireManualWide,
  CannotUpdateWide: () => CannotUpdateWide,
  DownloadReadyNarrow: () => DownloadReadyNarrow,
  DownloadReadyWide: () => DownloadReadyWide,
  DownloadingNarrow: () => DownloadingNarrow,
  DownloadingWide: () => DownloadingWide,
  FullDownloadReadyNarrow: () => FullDownloadReadyNarrow,
  FullDownloadReadyWide: () => FullDownloadReadyWide,
  KnobsPlayground: () => KnobsPlayground,
  MacOSReadOnlyNarrow: () => MacOSReadOnlyNarrow,
  MacOSReadOnlyWide: () => MacOSReadOnlyWide,
  UpdateNarrow: () => UpdateNarrow,
  UpdateWide: () => UpdateWide,
  default: () => DialogUpdate_stories_default
});
module.exports = __toCommonJS(DialogUpdate_stories_exports);
var React = __toESM(require("react"));
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_DialogUpdate = require("./DialogUpdate");
var import_Dialogs = require("../types/Dialogs");
var import_util = require("./_util");
var import_FakeLeftPaneContainer = require("../test-both/helpers/FakeLeftPaneContainer");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const defaultProps = {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  dismissDialog: (0, import_addon_actions.action)("dismiss-dialog"),
  downloadSize: 116504357,
  downloadedSize: 61003110,
  hasNetworkDialog: false,
  i18n,
  didSnooze: false,
  showEventsCount: 0,
  snoozeUpdate: (0, import_addon_actions.action)("snooze-update"),
  startUpdate: (0, import_addon_actions.action)("start-update"),
  version: "v7.7.7"
};
var DialogUpdate_stories_default = {
  title: "Components/DialogUpdate"
};
const KnobsPlayground = /* @__PURE__ */ __name(() => {
  const containerWidthBreakpoint = (0, import_addon_knobs.select)("containerWidthBreakpoint", import_util.WidthBreakpoint, import_util.WidthBreakpoint.Wide);
  const dialogType = (0, import_addon_knobs.select)("dialogType", import_Dialogs.DialogType, import_Dialogs.DialogType.Update);
  const hasNetworkDialog = (0, import_addon_knobs.boolean)("hasNetworkDialog", false);
  const didSnooze = (0, import_addon_knobs.boolean)("didSnooze", false);
  return /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
    containerWidthBreakpoint
  }, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
    ...defaultProps,
    containerWidthBreakpoint,
    dialogType,
    didSnooze,
    hasNetworkDialog,
    currentVersion: "5.24.0"
  }));
}, "KnobsPlayground");
const UpdateWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  dialogType: import_Dialogs.DialogType.Update,
  currentVersion: "5.24.0"
})), "UpdateWide");
UpdateWide.story = {
  name: "Update (Wide)"
};
const DownloadReadyWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.DownloadReady,
  downloadSize: 30123456
})), "DownloadReadyWide");
DownloadReadyWide.story = {
  name: "DownloadReady (Wide)"
};
const FullDownloadReadyWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.FullDownloadReady,
  downloadSize: 300123456
})), "FullDownloadReadyWide");
FullDownloadReadyWide.story = {
  name: "FullDownloadReady (Wide)"
};
const DownloadingWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Downloading
})), "DownloadingWide");
DownloadingWide.story = {
  name: "Downloading (Wide)"
};
const CannotUpdateWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Cannot_Update
})), "CannotUpdateWide");
CannotUpdateWide.story = {
  name: "Cannot_Update (Wide)"
};
const CannotUpdateBetaWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0-beta.1",
  dialogType: import_Dialogs.DialogType.Cannot_Update
})), "CannotUpdateBetaWide");
CannotUpdateBetaWide.story = {
  name: "Cannot_Update_Beta (Wide)"
};
const CannotUpdateRequireManualWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Cannot_Update_Require_Manual
})), "CannotUpdateRequireManualWide");
CannotUpdateRequireManualWide.story = {
  name: "Cannot_Update_Require_Manual (Wide)"
};
const CannotUpdateRequireManualBetaWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0-beta.1",
  dialogType: import_Dialogs.DialogType.Cannot_Update_Require_Manual
})), "CannotUpdateRequireManualBetaWide");
CannotUpdateRequireManualBetaWide.story = {
  name: "Cannot_Update_Require_Manual_Beta (Wide)"
};
const MacOSReadOnlyWide = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.MacOS_Read_Only
})), "MacOSReadOnlyWide");
MacOSReadOnlyWide.story = {
  name: "MacOS_Read_Only (Wide)"
};
const UpdateNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  dialogType: import_Dialogs.DialogType.Update,
  currentVersion: "5.24.0"
})), "UpdateNarrow");
UpdateNarrow.story = {
  name: "Update (Narrow)"
};
const DownloadReadyNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.DownloadReady,
  downloadSize: 30123456
})), "DownloadReadyNarrow");
DownloadReadyNarrow.story = {
  name: "DownloadReady (Narrow)"
};
const FullDownloadReadyNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.FullDownloadReady,
  downloadSize: 300123456
})), "FullDownloadReadyNarrow");
FullDownloadReadyNarrow.story = {
  name: "FullDownloadReady (Narrow)"
};
const DownloadingNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Downloading
})), "DownloadingNarrow");
DownloadingNarrow.story = {
  name: "Downloading (Narrow)"
};
const CannotUpdateNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Cannot_Update
})), "CannotUpdateNarrow");
CannotUpdateNarrow.story = {
  name: "Cannot Update (Narrow)"
};
const CannotUpdateBetaNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0-beta.1",
  dialogType: import_Dialogs.DialogType.Cannot_Update
})), "CannotUpdateBetaNarrow");
CannotUpdateBetaNarrow.story = {
  name: "Cannot Update Beta (Narrow)"
};
const CannotUpdateRequireManualNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.Cannot_Update_Require_Manual
})), "CannotUpdateRequireManualNarrow");
CannotUpdateRequireManualNarrow.story = {
  name: "Cannot_Update_Require_Manual (Narrow)"
};
const CannotUpdateRequireManualBetaNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0-beta.1",
  dialogType: import_Dialogs.DialogType.Cannot_Update_Require_Manual
})), "CannotUpdateRequireManualBetaNarrow");
CannotUpdateRequireManualBetaNarrow.story = {
  name: "Cannot_Update_Require_Manual_Beta (Narrow)"
};
const MacOSReadOnlyNarrow = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_FakeLeftPaneContainer.FakeLeftPaneContainer, {
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow
}, /* @__PURE__ */ React.createElement(import_DialogUpdate.DialogUpdate, {
  ...defaultProps,
  containerWidthBreakpoint: import_util.WidthBreakpoint.Narrow,
  currentVersion: "5.24.0",
  dialogType: import_Dialogs.DialogType.MacOS_Read_Only
})), "MacOSReadOnlyNarrow");
MacOSReadOnlyNarrow.story = {
  name: "MacOS_Read_Only (Narrow)"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CannotUpdateBetaNarrow,
  CannotUpdateBetaWide,
  CannotUpdateNarrow,
  CannotUpdateRequireManualBetaNarrow,
  CannotUpdateRequireManualBetaWide,
  CannotUpdateRequireManualNarrow,
  CannotUpdateRequireManualWide,
  CannotUpdateWide,
  DownloadReadyNarrow,
  DownloadReadyWide,
  DownloadingNarrow,
  DownloadingWide,
  FullDownloadReadyNarrow,
  FullDownloadReadyWide,
  KnobsPlayground,
  MacOSReadOnlyNarrow,
  MacOSReadOnlyWide,
  UpdateNarrow,
  UpdateWide
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nVXBkYXRlLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgYm9vbGVhbiwgc2VsZWN0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgRGlhbG9nVXBkYXRlIH0gZnJvbSAnLi9EaWFsb2dVcGRhdGUnO1xuaW1wb3J0IHsgRGlhbG9nVHlwZSB9IGZyb20gJy4uL3R5cGVzL0RpYWxvZ3MnO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgeyBGYWtlTGVmdFBhbmVDb250YWluZXIgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9GYWtlTGVmdFBhbmVDb250YWluZXInO1xuXG5pbXBvcnQgeyBzZXR1cEkxOG4gfSBmcm9tICcuLi91dGlsL3NldHVwSTE4bic7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgZGVmYXVsdFByb3BzID0ge1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludC5XaWRlLFxuICBkaXNtaXNzRGlhbG9nOiBhY3Rpb24oJ2Rpc21pc3MtZGlhbG9nJyksXG4gIGRvd25sb2FkU2l6ZTogMTE2NTA0MzU3LFxuICBkb3dubG9hZGVkU2l6ZTogNjEwMDMxMTAsXG4gIGhhc05ldHdvcmtEaWFsb2c6IGZhbHNlLFxuICBpMThuLFxuICBkaWRTbm9vemU6IGZhbHNlLFxuICBzaG93RXZlbnRzQ291bnQ6IDAsXG4gIHNub296ZVVwZGF0ZTogYWN0aW9uKCdzbm9vemUtdXBkYXRlJyksXG4gIHN0YXJ0VXBkYXRlOiBhY3Rpb24oJ3N0YXJ0LXVwZGF0ZScpLFxuICB2ZXJzaW9uOiAndjcuNy43Jyxcbn07XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0RpYWxvZ1VwZGF0ZScsXG59O1xuXG5leHBvcnQgY29uc3QgS25vYnNQbGF5Z3JvdW5kID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY29udGFpbmVyV2lkdGhCcmVha3BvaW50ID0gc2VsZWN0KFxuICAgICdjb250YWluZXJXaWR0aEJyZWFrcG9pbnQnLFxuICAgIFdpZHRoQnJlYWtwb2ludCxcbiAgICBXaWR0aEJyZWFrcG9pbnQuV2lkZVxuICApO1xuICBjb25zdCBkaWFsb2dUeXBlID0gc2VsZWN0KCdkaWFsb2dUeXBlJywgRGlhbG9nVHlwZSwgRGlhbG9nVHlwZS5VcGRhdGUpO1xuICBjb25zdCBoYXNOZXR3b3JrRGlhbG9nID0gYm9vbGVhbignaGFzTmV0d29ya0RpYWxvZycsIGZhbHNlKTtcbiAgY29uc3QgZGlkU25vb3plID0gYm9vbGVhbignZGlkU25vb3plJywgZmFsc2UpO1xuXG4gIHJldHVybiAoXG4gICAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e2NvbnRhaW5lcldpZHRoQnJlYWtwb2ludH0+XG4gICAgICA8RGlhbG9nVXBkYXRlXG4gICAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgICBkaWFsb2dUeXBlPXtkaWFsb2dUeXBlfVxuICAgICAgICBkaWRTbm9vemU9e2RpZFNub296ZX1cbiAgICAgICAgaGFzTmV0d29ya0RpYWxvZz17aGFzTmV0d29ya0RpYWxvZ31cbiAgICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgICAgLz5cbiAgICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBVcGRhdGVXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuVXBkYXRlfVxuICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuVXBkYXRlV2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ1VwZGF0ZSAoV2lkZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IERvd25sb2FkUmVhZHlXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wXCJcbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuRG93bmxvYWRSZWFkeX1cbiAgICAgIGRvd25sb2FkU2l6ZT17MzAxMjM0NTZ9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5Eb3dubG9hZFJlYWR5V2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0Rvd25sb2FkUmVhZHkgKFdpZGUpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBGdWxsRG93bmxvYWRSZWFkeVdpZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfVxuICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5GdWxsRG93bmxvYWRSZWFkeX1cbiAgICAgIGRvd25sb2FkU2l6ZT17MzAwMTIzNDU2fVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuRnVsbERvd25sb2FkUmVhZHlXaWRlLnN0b3J5ID0ge1xuICBuYW1lOiAnRnVsbERvd25sb2FkUmVhZHkgKFdpZGUpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBEb3dubG9hZGluZ1dpZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfVxuICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5Eb3dubG9hZGluZ31cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkRvd25sb2FkaW5nV2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0Rvd25sb2FkaW5nIChXaWRlKScsXG59O1xuXG5leHBvcnQgY29uc3QgQ2Fubm90VXBkYXRlV2lkZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX0+XG4gICAgPERpYWxvZ1VwZGF0ZVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMFwiXG4gICAgICBkaWFsb2dUeXBlPXtEaWFsb2dUeXBlLkNhbm5vdF9VcGRhdGV9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5DYW5ub3RVcGRhdGVXaWRlLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2Fubm90X1VwZGF0ZSAoV2lkZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IENhbm5vdFVwZGF0ZUJldGFXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wLWJldGEuMVwiXG4gICAgICBkaWFsb2dUeXBlPXtEaWFsb2dUeXBlLkNhbm5vdF9VcGRhdGV9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5DYW5ub3RVcGRhdGVCZXRhV2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0Nhbm5vdF9VcGRhdGVfQmV0YSAoV2lkZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IENhbm5vdFVwZGF0ZVJlcXVpcmVNYW51YWxXaWRlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX1cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wXCJcbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuQ2Fubm90X1VwZGF0ZV9SZXF1aXJlX01hbnVhbH1cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkNhbm5vdFVwZGF0ZVJlcXVpcmVNYW51YWxXaWRlLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2Fubm90X1VwZGF0ZV9SZXF1aXJlX01hbnVhbCAoV2lkZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IENhbm5vdFVwZGF0ZVJlcXVpcmVNYW51YWxCZXRhV2lkZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuV2lkZX0+XG4gICAgPERpYWxvZ1VwZGF0ZVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMC1iZXRhLjFcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlX1JlcXVpcmVfTWFudWFsfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ2Fubm90VXBkYXRlUmVxdWlyZU1hbnVhbEJldGFXaWRlLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2Fubm90X1VwZGF0ZV9SZXF1aXJlX01hbnVhbF9CZXRhIChXaWRlKScsXG59O1xuXG5leHBvcnQgY29uc3QgTWFjT1NSZWFkT25seVdpZGUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5XaWRlfVxuICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5NYWNPU19SZWFkX09ubHl9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5NYWNPU1JlYWRPbmx5V2lkZS5zdG9yeSA9IHtcbiAgbmFtZTogJ01hY09TX1JlYWRfT25seSAoV2lkZSknLFxufTtcblxuZXhwb3J0IGNvbnN0IFVwZGF0ZU5hcnJvdyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fVxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5VcGRhdGV9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMFwiXG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5VcGRhdGVOYXJyb3cuc3RvcnkgPSB7XG4gIG5hbWU6ICdVcGRhdGUgKE5hcnJvdyknLFxufTtcblxuZXhwb3J0IGNvbnN0IERvd25sb2FkUmVhZHlOYXJyb3cgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd30+XG4gICAgPERpYWxvZ1VwZGF0ZVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd31cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wXCJcbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuRG93bmxvYWRSZWFkeX1cbiAgICAgIGRvd25sb2FkU2l6ZT17MzAxMjM0NTZ9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5Eb3dubG9hZFJlYWR5TmFycm93LnN0b3J5ID0ge1xuICBuYW1lOiAnRG93bmxvYWRSZWFkeSAoTmFycm93KScsXG59O1xuXG5leHBvcnQgY29uc3QgRnVsbERvd25sb2FkUmVhZHlOYXJyb3cgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd30+XG4gICAgPERpYWxvZ1VwZGF0ZVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd31cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wXCJcbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuRnVsbERvd25sb2FkUmVhZHl9XG4gICAgICBkb3dubG9hZFNpemU9ezMwMDEyMzQ1Nn1cbiAgICAvPlxuICA8L0Zha2VMZWZ0UGFuZUNvbnRhaW5lcj5cbik7XG5cbkZ1bGxEb3dubG9hZFJlYWR5TmFycm93LnN0b3J5ID0ge1xuICBuYW1lOiAnRnVsbERvd25sb2FkUmVhZHkgKE5hcnJvdyknLFxufTtcblxuZXhwb3J0IGNvbnN0IERvd25sb2FkaW5nTmFycm93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMFwiXG4gICAgICBkaWFsb2dUeXBlPXtEaWFsb2dUeXBlLkRvd25sb2FkaW5nfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuRG93bmxvYWRpbmdOYXJyb3cuc3RvcnkgPSB7XG4gIG5hbWU6ICdEb3dubG9hZGluZyAoTmFycm93KScsXG59O1xuXG5leHBvcnQgY29uc3QgQ2Fubm90VXBkYXRlTmFycm93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMFwiXG4gICAgICBkaWFsb2dUeXBlPXtEaWFsb2dUeXBlLkNhbm5vdF9VcGRhdGV9XG4gICAgLz5cbiAgPC9GYWtlTGVmdFBhbmVDb250YWluZXI+XG4pO1xuXG5DYW5ub3RVcGRhdGVOYXJyb3cuc3RvcnkgPSB7XG4gIG5hbWU6ICdDYW5ub3QgVXBkYXRlIChOYXJyb3cpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDYW5ub3RVcGRhdGVCZXRhTmFycm93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMC1iZXRhLjFcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ2Fubm90VXBkYXRlQmV0YU5hcnJvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ0Nhbm5vdCBVcGRhdGUgQmV0YSAoTmFycm93KScsXG59O1xuXG5leHBvcnQgY29uc3QgQ2Fubm90VXBkYXRlUmVxdWlyZU1hbnVhbE5hcnJvdyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxGYWtlTGVmdFBhbmVDb250YWluZXIgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fT5cbiAgICA8RGlhbG9nVXBkYXRlXG4gICAgICB7Li4uZGVmYXVsdFByb3BzfVxuICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtXaWR0aEJyZWFrcG9pbnQuTmFycm93fVxuICAgICAgY3VycmVudFZlcnNpb249XCI1LjI0LjBcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlX1JlcXVpcmVfTWFudWFsfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ2Fubm90VXBkYXRlUmVxdWlyZU1hbnVhbE5hcnJvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ0Nhbm5vdF9VcGRhdGVfUmVxdWlyZV9NYW51YWwgKE5hcnJvdyknLFxufTtcblxuZXhwb3J0IGNvbnN0IENhbm5vdFVwZGF0ZVJlcXVpcmVNYW51YWxCZXRhTmFycm93ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPEZha2VMZWZ0UGFuZUNvbnRhaW5lciBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9PlxuICAgIDxEaWFsb2dVcGRhdGVcbiAgICAgIHsuLi5kZWZhdWx0UHJvcHN9XG4gICAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e1dpZHRoQnJlYWtwb2ludC5OYXJyb3d9XG4gICAgICBjdXJyZW50VmVyc2lvbj1cIjUuMjQuMC1iZXRhLjFcIlxuICAgICAgZGlhbG9nVHlwZT17RGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlX1JlcXVpcmVfTWFudWFsfVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuQ2Fubm90VXBkYXRlUmVxdWlyZU1hbnVhbEJldGFOYXJyb3cuc3RvcnkgPSB7XG4gIG5hbWU6ICdDYW5ub3RfVXBkYXRlX1JlcXVpcmVfTWFudWFsX0JldGEgKE5hcnJvdyknLFxufTtcblxuZXhwb3J0IGNvbnN0IE1hY09TUmVhZE9ubHlOYXJyb3cgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8RmFrZUxlZnRQYW5lQ29udGFpbmVyIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd30+XG4gICAgPERpYWxvZ1VwZGF0ZVxuICAgICAgey4uLmRlZmF1bHRQcm9wc31cbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50Lk5hcnJvd31cbiAgICAgIGN1cnJlbnRWZXJzaW9uPVwiNS4yNC4wXCJcbiAgICAgIGRpYWxvZ1R5cGU9e0RpYWxvZ1R5cGUuTWFjT1NfUmVhZF9Pbmx5fVxuICAgIC8+XG4gIDwvRmFrZUxlZnRQYW5lQ29udGFpbmVyPlxuKTtcblxuTWFjT1NSZWFkT25seU5hcnJvdy5zdG9yeSA9IHtcbiAgbmFtZTogJ01hY09TX1JlYWRfT25seSAoTmFycm93KScsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7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
