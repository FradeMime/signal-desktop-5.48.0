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
var DialogUpdate_exports = {};
__export(DialogUpdate_exports, {
  DialogUpdate: () => DialogUpdate
});
module.exports = __toCommonJS(DialogUpdate_exports);
var import_react = __toESM(require("react"));
var import_filesize = __toESM(require("filesize"));
var import_version = require("../util/version");
var import_Dialogs = require("../types/Dialogs");
var import_Intl = require("./Intl");
var import_LeftPaneDialog = require("./LeftPaneDialog");
const PRODUCTION_DOWNLOAD_URL = "https://signal.org/download/";
const BETA_DOWNLOAD_URL = "https://support.signal.org/beta";
const DialogUpdate = /* @__PURE__ */ __name(({
  containerWidthBreakpoint,
  dialogType,
  didSnooze,
  dismissDialog,
  downloadSize,
  downloadedSize,
  hasNetworkDialog,
  i18n,
  snoozeUpdate,
  startUpdate,
  version,
  currentVersion
}) => {
  if (hasNetworkDialog) {
    return null;
  }
  if (dialogType === import_Dialogs.DialogType.None) {
    return null;
  }
  if (didSnooze) {
    return null;
  }
  if (dialogType === import_Dialogs.DialogType.Cannot_Update) {
    const url = (0, import_version.isBeta)(currentVersion) ? BETA_DOWNLOAD_URL : PRODUCTION_DOWNLOAD_URL;
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
      containerWidthBreakpoint,
      type: "warning",
      title: i18n("cannotUpdate")
    }, /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      components: {
        retry: /* @__PURE__ */ import_react.default.createElement("button", {
          className: "LeftPaneDialog__retry",
          key: "signal-retry",
          onClick: startUpdate,
          type: "button"
        }, i18n("autoUpdateRetry")),
        url: /* @__PURE__ */ import_react.default.createElement("a", {
          key: "signal-download",
          href: url,
          rel: "noreferrer",
          target: "_blank"
        }, url),
        support: /* @__PURE__ */ import_react.default.createElement("a", {
          key: "signal-support",
          href: "https://support.signal.org/hc/en-us/requests/new?desktop",
          rel: "noreferrer",
          target: "_blank"
        }, i18n("autoUpdateContactSupport"))
      },
      i18n,
      id: "cannotUpdateDetail"
    })));
  }
  if (dialogType === import_Dialogs.DialogType.Cannot_Update_Require_Manual) {
    const url = (0, import_version.isBeta)(currentVersion) ? BETA_DOWNLOAD_URL : PRODUCTION_DOWNLOAD_URL;
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
      containerWidthBreakpoint,
      type: "warning",
      title: i18n("cannotUpdate")
    }, /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      components: {
        url: /* @__PURE__ */ import_react.default.createElement("a", {
          key: "signal-download",
          href: url,
          rel: "noreferrer",
          target: "_blank"
        }, url),
        support: /* @__PURE__ */ import_react.default.createElement("a", {
          key: "signal-support",
          href: "https://support.signal.org/hc/en-us/requests/new?desktop",
          rel: "noreferrer",
          target: "_blank"
        }, i18n("autoUpdateContactSupport"))
      },
      i18n,
      id: "cannotUpdateRequireManualDetail"
    })));
  }
  if (dialogType === import_Dialogs.DialogType.MacOS_Read_Only) {
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
      closeLabel: i18n("close"),
      containerWidthBreakpoint,
      hasXButton: true,
      onClose: dismissDialog,
      title: i18n("cannotUpdate"),
      type: "warning"
    }, /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
      components: {
        app: /* @__PURE__ */ import_react.default.createElement("strong", {
          key: "app"
        }, "Signal.app"),
        folder: /* @__PURE__ */ import_react.default.createElement("strong", {
          key: "folder"
        }, "/Applications")
      },
      i18n,
      id: "readOnlyVolume"
    })));
  }
  let title = i18n("autoUpdateNewVersionTitle");
  if (downloadSize && (dialogType === import_Dialogs.DialogType.DownloadReady || dialogType === import_Dialogs.DialogType.FullDownloadReady || dialogType === import_Dialogs.DialogType.Downloading)) {
    title += ` (${(0, import_filesize.default)(downloadSize, { round: 0 })})`;
  }
  const versionTitle = version ? i18n("DialogUpdate--version-available", [version]) : void 0;
  if (dialogType === import_Dialogs.DialogType.Downloading) {
    const width = Math.ceil((downloadedSize || 1) / (downloadSize || 1) * 100);
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
      containerWidthBreakpoint,
      icon: "update",
      title,
      hoverText: versionTitle
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "LeftPaneDialog__progress--container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "LeftPaneDialog__progress--bar",
      style: { width: `${width}%` }
    })));
  }
  let clickLabel;
  let type;
  if (dialogType === import_Dialogs.DialogType.DownloadReady) {
    clickLabel = i18n("downloadNewVersionMessage");
  } else if (dialogType === import_Dialogs.DialogType.FullDownloadReady) {
    clickLabel = i18n("downloadFullNewVersionMessage");
    type = "warning";
  } else {
    clickLabel = i18n("autoUpdateNewVersionMessage");
  }
  return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneDialog.LeftPaneDialog, {
    containerWidthBreakpoint,
    icon: "update",
    type,
    title,
    hoverText: versionTitle,
    hasAction: true,
    onClick: startUpdate,
    clickLabel,
    hasXButton: true,
    onClose: snoozeUpdate,
    closeLabel: i18n("autoUpdateIgnoreButtonLabel")
  });
}, "DialogUpdate");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DialogUpdate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGlhbG9nVXBkYXRlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgZm9ybWF0RmlsZVNpemUgZnJvbSAnZmlsZXNpemUnO1xuXG5pbXBvcnQgeyBpc0JldGEgfSBmcm9tICcuLi91dGlsL3ZlcnNpb24nO1xuaW1wb3J0IHsgRGlhbG9nVHlwZSB9IGZyb20gJy4uL3R5cGVzL0RpYWxvZ3MnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBJbnRsIH0gZnJvbSAnLi9JbnRsJztcbmltcG9ydCB7IExlZnRQYW5lRGlhbG9nIH0gZnJvbSAnLi9MZWZ0UGFuZURpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IFdpZHRoQnJlYWtwb2ludCB9IGZyb20gJy4vX3V0aWwnO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50O1xuICBkaWFsb2dUeXBlOiBEaWFsb2dUeXBlO1xuICBkaWRTbm9vemU6IGJvb2xlYW47XG4gIGRpc21pc3NEaWFsb2c6ICgpID0+IHZvaWQ7XG4gIGRvd25sb2FkU2l6ZT86IG51bWJlcjtcbiAgZG93bmxvYWRlZFNpemU/OiBudW1iZXI7XG4gIGhhc05ldHdvcmtEaWFsb2c6IGJvb2xlYW47XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHNob3dFdmVudHNDb3VudDogbnVtYmVyO1xuICBzbm9vemVVcGRhdGU6ICgpID0+IHZvaWQ7XG4gIHN0YXJ0VXBkYXRlOiAoKSA9PiB2b2lkO1xuICB2ZXJzaW9uPzogc3RyaW5nO1xuICBjdXJyZW50VmVyc2lvbjogc3RyaW5nO1xufTtcblxuY29uc3QgUFJPRFVDVElPTl9ET1dOTE9BRF9VUkwgPSAnaHR0cHM6Ly9zaWduYWwub3JnL2Rvd25sb2FkLyc7XG5jb25zdCBCRVRBX0RPV05MT0FEX1VSTCA9ICdodHRwczovL3N1cHBvcnQuc2lnbmFsLm9yZy9iZXRhJztcblxuZXhwb3J0IGNvbnN0IERpYWxvZ1VwZGF0ZSA9ICh7XG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludCxcbiAgZGlhbG9nVHlwZSxcbiAgZGlkU25vb3plLFxuICBkaXNtaXNzRGlhbG9nLFxuICBkb3dubG9hZFNpemUsXG4gIGRvd25sb2FkZWRTaXplLFxuICBoYXNOZXR3b3JrRGlhbG9nLFxuICBpMThuLFxuICBzbm9vemVVcGRhdGUsXG4gIHN0YXJ0VXBkYXRlLFxuICB2ZXJzaW9uLFxuICBjdXJyZW50VmVyc2lvbixcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCA9PiB7XG4gIGlmIChoYXNOZXR3b3JrRGlhbG9nKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5Ob25lKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoZGlkU25vb3plKSB7XG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBpZiAoZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlKSB7XG4gICAgY29uc3QgdXJsID0gaXNCZXRhKGN1cnJlbnRWZXJzaW9uKVxuICAgICAgPyBCRVRBX0RPV05MT0FEX1VSTFxuICAgICAgOiBQUk9EVUNUSU9OX0RPV05MT0FEX1VSTDtcbiAgICByZXR1cm4gKFxuICAgICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgICB0eXBlPVwid2FybmluZ1wiXG4gICAgICAgIHRpdGxlPXtpMThuKCdjYW5ub3RVcGRhdGUnKX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPEludGxcbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgcmV0cnk6IChcbiAgICAgICAgICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJMZWZ0UGFuZURpYWxvZ19fcmV0cnlcIlxuICAgICAgICAgICAgICAgICAga2V5PVwic2lnbmFsLXJldHJ5XCJcbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2s9e3N0YXJ0VXBkYXRlfVxuICAgICAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2kxOG4oJ2F1dG9VcGRhdGVSZXRyeScpfVxuICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICB1cmw6IChcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAga2V5PVwic2lnbmFsLWRvd25sb2FkXCJcbiAgICAgICAgICAgICAgICAgIGhyZWY9e3VybH1cbiAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7dXJsfVxuICAgICAgICAgICAgICAgIDwvYT5cbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgc3VwcG9ydDogKFxuICAgICAgICAgICAgICAgIDxhXG4gICAgICAgICAgICAgICAgICBrZXk9XCJzaWduYWwtc3VwcG9ydFwiXG4gICAgICAgICAgICAgICAgICBocmVmPVwiaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvZW4tdXMvcmVxdWVzdHMvbmV3P2Rlc2t0b3BcIlxuICAgICAgICAgICAgICAgICAgcmVsPVwibm9yZWZlcnJlclwiXG4gICAgICAgICAgICAgICAgICB0YXJnZXQ9XCJfYmxhbmtcIlxuICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdhdXRvVXBkYXRlQ29udGFjdFN1cHBvcnQnKX1cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlkPVwiY2Fubm90VXBkYXRlRGV0YWlsXCJcbiAgICAgICAgICAvPlxuICAgICAgICA8L3NwYW4+XG4gICAgICA8L0xlZnRQYW5lRGlhbG9nPlxuICAgICk7XG4gIH1cblxuICBpZiAoZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlX1JlcXVpcmVfTWFudWFsKSB7XG4gICAgY29uc3QgdXJsID0gaXNCZXRhKGN1cnJlbnRWZXJzaW9uKVxuICAgICAgPyBCRVRBX0RPV05MT0FEX1VSTFxuICAgICAgOiBQUk9EVUNUSU9OX0RPV05MT0FEX1VSTDtcbiAgICByZXR1cm4gKFxuICAgICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgICB0eXBlPVwid2FybmluZ1wiXG4gICAgICAgIHRpdGxlPXtpMThuKCdjYW5ub3RVcGRhdGUnKX1cbiAgICAgID5cbiAgICAgICAgPHNwYW4+XG4gICAgICAgICAgPEludGxcbiAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgdXJsOiAoXG4gICAgICAgICAgICAgICAgPGFcbiAgICAgICAgICAgICAgICAgIGtleT1cInNpZ25hbC1kb3dubG9hZFwiXG4gICAgICAgICAgICAgICAgICBocmVmPXt1cmx9XG4gICAgICAgICAgICAgICAgICByZWw9XCJub3JlZmVycmVyXCJcbiAgICAgICAgICAgICAgICAgIHRhcmdldD1cIl9ibGFua1wiXG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3VybH1cbiAgICAgICAgICAgICAgICA8L2E+XG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIHN1cHBvcnQ6IChcbiAgICAgICAgICAgICAgICA8YVxuICAgICAgICAgICAgICAgICAga2V5PVwic2lnbmFsLXN1cHBvcnRcIlxuICAgICAgICAgICAgICAgICAgaHJlZj1cImh0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2VuLXVzL3JlcXVlc3RzL25ldz9kZXNrdG9wXCJcbiAgICAgICAgICAgICAgICAgIHJlbD1cIm5vcmVmZXJyZXJcIlxuICAgICAgICAgICAgICAgICAgdGFyZ2V0PVwiX2JsYW5rXCJcbiAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICB7aTE4bignYXV0b1VwZGF0ZUNvbnRhY3RTdXBwb3J0Jyl9XG4gICAgICAgICAgICAgICAgPC9hPlxuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpZD1cImNhbm5vdFVwZGF0ZVJlcXVpcmVNYW51YWxEZXRhaWxcIlxuICAgICAgICAgIC8+XG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvTGVmdFBhbmVEaWFsb2c+XG4gICAgKTtcbiAgfVxuXG4gIGlmIChkaWFsb2dUeXBlID09PSBEaWFsb2dUeXBlLk1hY09TX1JlYWRfT25seSkge1xuICAgIHJldHVybiAoXG4gICAgICA8TGVmdFBhbmVEaWFsb2dcbiAgICAgICAgY2xvc2VMYWJlbD17aTE4bignY2xvc2UnKX1cbiAgICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50PXtjb250YWluZXJXaWR0aEJyZWFrcG9pbnR9XG4gICAgICAgIGhhc1hCdXR0b25cbiAgICAgICAgb25DbG9zZT17ZGlzbWlzc0RpYWxvZ31cbiAgICAgICAgdGl0bGU9e2kxOG4oJ2Nhbm5vdFVwZGF0ZScpfVxuICAgICAgICB0eXBlPVwid2FybmluZ1wiXG4gICAgICA+XG4gICAgICAgIDxzcGFuPlxuICAgICAgICAgIDxJbnRsXG4gICAgICAgICAgICBjb21wb25lbnRzPXt7XG4gICAgICAgICAgICAgIGFwcDogPHN0cm9uZyBrZXk9XCJhcHBcIj5TaWduYWwuYXBwPC9zdHJvbmc+LFxuICAgICAgICAgICAgICBmb2xkZXI6IDxzdHJvbmcga2V5PVwiZm9sZGVyXCI+L0FwcGxpY2F0aW9uczwvc3Ryb25nPixcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaWQ9XCJyZWFkT25seVZvbHVtZVwiXG4gICAgICAgICAgLz5cbiAgICAgICAgPC9zcGFuPlxuICAgICAgPC9MZWZ0UGFuZURpYWxvZz5cbiAgICApO1xuICB9XG5cbiAgbGV0IHRpdGxlID0gaTE4bignYXV0b1VwZGF0ZU5ld1ZlcnNpb25UaXRsZScpO1xuXG4gIGlmIChcbiAgICBkb3dubG9hZFNpemUgJiZcbiAgICAoZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5Eb3dubG9hZFJlYWR5IHx8XG4gICAgICBkaWFsb2dUeXBlID09PSBEaWFsb2dUeXBlLkZ1bGxEb3dubG9hZFJlYWR5IHx8XG4gICAgICBkaWFsb2dUeXBlID09PSBEaWFsb2dUeXBlLkRvd25sb2FkaW5nKVxuICApIHtcbiAgICB0aXRsZSArPSBgICgke2Zvcm1hdEZpbGVTaXplKGRvd25sb2FkU2l6ZSwgeyByb3VuZDogMCB9KX0pYDtcbiAgfVxuXG4gIGNvbnN0IHZlcnNpb25UaXRsZSA9IHZlcnNpb25cbiAgICA/IGkxOG4oJ0RpYWxvZ1VwZGF0ZS0tdmVyc2lvbi1hdmFpbGFibGUnLCBbdmVyc2lvbl0pXG4gICAgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKGRpYWxvZ1R5cGUgPT09IERpYWxvZ1R5cGUuRG93bmxvYWRpbmcpIHtcbiAgICBjb25zdCB3aWR0aCA9IE1hdGguY2VpbChcbiAgICAgICgoZG93bmxvYWRlZFNpemUgfHwgMSkgLyAoZG93bmxvYWRTaXplIHx8IDEpKSAqIDEwMFxuICAgICk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPExlZnRQYW5lRGlhbG9nXG4gICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgICBpY29uPVwidXBkYXRlXCJcbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBob3ZlclRleHQ9e3ZlcnNpb25UaXRsZX1cbiAgICAgID5cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJMZWZ0UGFuZURpYWxvZ19fcHJvZ3Jlc3MtLWNvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT1cIkxlZnRQYW5lRGlhbG9nX19wcm9ncmVzcy0tYmFyXCJcbiAgICAgICAgICAgIHN0eWxlPXt7IHdpZHRoOiBgJHt3aWR0aH0lYCB9fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9MZWZ0UGFuZURpYWxvZz5cbiAgICApO1xuICB9XG5cbiAgbGV0IGNsaWNrTGFiZWw6IHN0cmluZztcbiAgbGV0IHR5cGU6ICd3YXJuaW5nJyB8IHVuZGVmaW5lZDtcbiAgaWYgKGRpYWxvZ1R5cGUgPT09IERpYWxvZ1R5cGUuRG93bmxvYWRSZWFkeSkge1xuICAgIGNsaWNrTGFiZWwgPSBpMThuKCdkb3dubG9hZE5ld1ZlcnNpb25NZXNzYWdlJyk7XG4gIH0gZWxzZSBpZiAoZGlhbG9nVHlwZSA9PT0gRGlhbG9nVHlwZS5GdWxsRG93bmxvYWRSZWFkeSkge1xuICAgIGNsaWNrTGFiZWwgPSBpMThuKCdkb3dubG9hZEZ1bGxOZXdWZXJzaW9uTWVzc2FnZScpO1xuICAgIHR5cGUgPSAnd2FybmluZyc7XG4gIH0gZWxzZSB7XG4gICAgY2xpY2tMYWJlbCA9IGkxOG4oJ2F1dG9VcGRhdGVOZXdWZXJzaW9uTWVzc2FnZScpO1xuICB9XG5cbiAgcmV0dXJuIChcbiAgICA8TGVmdFBhbmVEaWFsb2dcbiAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17Y29udGFpbmVyV2lkdGhCcmVha3BvaW50fVxuICAgICAgaWNvbj1cInVwZGF0ZVwiXG4gICAgICB0eXBlPXt0eXBlfVxuICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgaG92ZXJUZXh0PXt2ZXJzaW9uVGl0bGV9XG4gICAgICBoYXNBY3Rpb25cbiAgICAgIG9uQ2xpY2s9e3N0YXJ0VXBkYXRlfVxuICAgICAgY2xpY2tMYWJlbD17Y2xpY2tMYWJlbH1cbiAgICAgIGhhc1hCdXR0b25cbiAgICAgIG9uQ2xvc2U9e3Nub296ZVVwZGF0ZX1cbiAgICAgIGNsb3NlTGFiZWw9e2kxOG4oJ2F1dG9VcGRhdGVJZ25vcmVCdXR0b25MYWJlbCcpfVxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQjtBQUNsQixzQkFBMkI7QUFFM0IscUJBQXVCO0FBQ3ZCLHFCQUEyQjtBQUUzQixrQkFBcUI7QUFDckIsNEJBQStCO0FBbUIvQixNQUFNLDBCQUEwQjtBQUNoQyxNQUFNLG9CQUFvQjtBQUVuQixNQUFNLGVBQWUsd0JBQUM7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDbUM7QUFDbkMsTUFBSSxrQkFBa0I7QUFDcEIsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLGVBQWUsMEJBQVcsTUFBTTtBQUNsQyxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksV0FBVztBQUNiLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxlQUFlLDBCQUFXLGVBQWU7QUFDM0MsVUFBTSxNQUFNLDJCQUFPLGNBQWMsSUFDN0Isb0JBQ0E7QUFDSixXQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0EsTUFBSztBQUFBLE1BQ0wsT0FBTyxLQUFLLGNBQWM7QUFBQSxPQUUxQixt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
