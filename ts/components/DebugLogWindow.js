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
var DebugLogWindow_exports = {};
__export(DebugLogWindow_exports, {
  DebugLogWindow: () => DebugLogWindow
});
module.exports = __toCommonJS(DebugLogWindow_exports);
var import_react = __toESM(require("react"));
var import_copy_text_to_clipboard = __toESM(require("copy-text-to-clipboard"));
var log = __toESM(require("../logging/log"));
var import_Button = require("./Button");
var import_Spinner = require("./Spinner");
var import_ToastDebugLogError = require("./ToastDebugLogError");
var import_ToastLinkCopied = require("./ToastLinkCopied");
var import_TitleBarContainer = require("./TitleBarContainer");
var import_ToastLoadingFullLogs = require("./ToastLoadingFullLogs");
var import_openLinkInWebBrowser = require("../util/openLinkInWebBrowser");
var import_createSupportUrl = require("../util/createSupportUrl");
var import_useEscapeHandling = require("../hooks/useEscapeHandling");
var import_useTheme = require("../hooks/useTheme");
var LoadState = /* @__PURE__ */ ((LoadState2) => {
  LoadState2[LoadState2["NotStarted"] = 0] = "NotStarted";
  LoadState2[LoadState2["Started"] = 1] = "Started";
  LoadState2[LoadState2["Loaded"] = 2] = "Loaded";
  LoadState2[LoadState2["Submitting"] = 3] = "Submitting";
  return LoadState2;
})(LoadState || {});
var ToastType = /* @__PURE__ */ ((ToastType2) => {
  ToastType2[ToastType2["Copied"] = 0] = "Copied";
  ToastType2[ToastType2["Error"] = 1] = "Error";
  ToastType2[ToastType2["Loading"] = 2] = "Loading";
  return ToastType2;
})(ToastType || {});
const DebugLogWindow = /* @__PURE__ */ __name(({
  closeWindow,
  downloadLog,
  i18n,
  fetchLogs,
  uploadLogs,
  platform,
  isWindows11,
  executeMenuRole
}) => {
  const [loadState, setLoadState] = (0, import_react.useState)(0 /* NotStarted */);
  const [logText, setLogText] = (0, import_react.useState)();
  const [publicLogURL, setPublicLogURL] = (0, import_react.useState)();
  const [textAreaValue, setTextAreaValue] = (0, import_react.useState)(i18n("loading"));
  const [toastType, setToastType] = (0, import_react.useState)();
  const theme = (0, import_useTheme.useTheme)();
  (0, import_useEscapeHandling.useEscapeHandling)(closeWindow);
  (0, import_react.useEffect)(() => {
    setLoadState(1 /* Started */);
    let shouldCancel = false;
    async function doFetchLogs() {
      const fetchedLogText = await fetchLogs();
      if (shouldCancel) {
        return;
      }
      setToastType(2 /* Loading */);
      setLogText(fetchedLogText);
      setLoadState(2 /* Loaded */);
      const linesToShow = Math.ceil(Math.min(window.innerHeight, 2e3) / 5);
      const value = fetchedLogText.split(/\n/g, linesToShow).join("\n");
      setTextAreaValue(`${value}


${i18n("debugLogLogIsIncomplete")}`);
      setToastType(void 0);
    }
    doFetchLogs();
    return () => {
      shouldCancel = true;
    };
  }, [fetchLogs, i18n]);
  const handleSubmit = /* @__PURE__ */ __name(async (ev) => {
    ev.preventDefault();
    const text = logText;
    if (!text || text.length === 0) {
      return;
    }
    setLoadState(3 /* Submitting */);
    try {
      const publishedLogURL = await uploadLogs(text);
      setPublicLogURL(publishedLogURL);
    } catch (error) {
      log.error("DebugLogWindow error:", error && error.stack ? error.stack : error);
      setLoadState(2 /* Loaded */);
      setToastType(1 /* Error */);
    }
  }, "handleSubmit");
  function closeToast() {
    setToastType(void 0);
  }
  let toastElement;
  if (toastType === 2 /* Loading */) {
    toastElement = /* @__PURE__ */ import_react.default.createElement(import_ToastLoadingFullLogs.ToastLoadingFullLogs, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === 0 /* Copied */) {
    toastElement = /* @__PURE__ */ import_react.default.createElement(import_ToastLinkCopied.ToastLinkCopied, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === 1 /* Error */) {
    toastElement = /* @__PURE__ */ import_react.default.createElement(import_ToastDebugLogError.ToastDebugLogError, {
      i18n,
      onClose: closeToast
    });
  }
  if (publicLogURL) {
    const copyLog = /* @__PURE__ */ __name((ev) => {
      ev.preventDefault();
      (0, import_copy_text_to_clipboard.default)(publicLogURL);
      setToastType(0 /* Copied */);
    }, "copyLog");
    const supportURL = (0, import_createSupportUrl.createSupportUrl)({
      locale: i18n.getLocale(),
      query: {
        debugLog: publicLogURL
      }
    });
    return /* @__PURE__ */ import_react.default.createElement(import_TitleBarContainer.TitleBarContainer, {
      platform,
      isWindows11,
      theme,
      executeMenuRole
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "DebugLogWindow"
    }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "DebugLogWindow__title"
    }, i18n("debugLogSuccess")), /* @__PURE__ */ import_react.default.createElement("p", {
      className: "DebugLogWindow__subtitle"
    }, i18n("debugLogSuccessNextSteps"))), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "DebugLogWindow__container"
    }, /* @__PURE__ */ import_react.default.createElement("input", {
      className: "DebugLogWindow__link",
      readOnly: true,
      type: "text",
      value: publicLogURL
    })), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "DebugLogWindow__footer"
    }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: () => (0, import_openLinkInWebBrowser.openLinkInWebBrowser)(supportURL),
      variant: import_Button.ButtonVariant.Secondary
    }, i18n("reportIssue")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
      onClick: copyLog
    }, i18n("debugLogCopy"))), toastElement));
  }
  const canSubmit = Boolean(logText) && loadState !== 3 /* Submitting */;
  const canSave = Boolean(logText);
  const isLoading = loadState === 1 /* Started */ || loadState === 3 /* Submitting */;
  return /* @__PURE__ */ import_react.default.createElement(import_TitleBarContainer.TitleBarContainer, {
    platform,
    isWindows11,
    theme,
    executeMenuRole
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "DebugLogWindow"
  }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "DebugLogWindow__title"
  }, i18n("submitDebugLog")), /* @__PURE__ */ import_react.default.createElement("p", {
    className: "DebugLogWindow__subtitle"
  }, i18n("debugLogExplanation"))), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "DebugLogWindow__container"
  }, isLoading ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
    svgSize: "normal"
  }) : /* @__PURE__ */ import_react.default.createElement("textarea", {
    className: "DebugLogWindow__textarea",
    readOnly: true,
    rows: 5,
    spellCheck: false,
    value: textAreaValue
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "DebugLogWindow__footer"
  }, /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canSave,
    onClick: () => {
      if (logText) {
        downloadLog(logText);
      }
    },
    variant: import_Button.ButtonVariant.Secondary
  }, i18n("debugLogSave")), /* @__PURE__ */ import_react.default.createElement(import_Button.Button, {
    disabled: !canSubmit,
    onClick: handleSubmit
  }, i18n("submit"))), toastElement));
}, "DebugLogWindow");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  DebugLogWindow
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRGVidWdMb2dXaW5kb3cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxNS0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBNb3VzZUV2ZW50IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlU3RhdGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY29weVRleHQgZnJvbSAnY29weS10ZXh0LXRvLWNsaXBib2FyZCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgQnV0dG9uLCBCdXR0b25WYXJpYW50IH0gZnJvbSAnLi9CdXR0b24nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcbmltcG9ydCB7IFRvYXN0RGVidWdMb2dFcnJvciB9IGZyb20gJy4vVG9hc3REZWJ1Z0xvZ0Vycm9yJztcbmltcG9ydCB7IFRvYXN0TGlua0NvcGllZCB9IGZyb20gJy4vVG9hc3RMaW5rQ29waWVkJztcbmltcG9ydCB7IFRpdGxlQmFyQ29udGFpbmVyIH0gZnJvbSAnLi9UaXRsZUJhckNvbnRhaW5lcic7XG5pbXBvcnQgdHlwZSB7IEV4ZWN1dGVNZW51Um9sZVR5cGUgfSBmcm9tICcuL1RpdGxlQmFyQ29udGFpbmVyJztcbmltcG9ydCB7IFRvYXN0TG9hZGluZ0Z1bGxMb2dzIH0gZnJvbSAnLi9Ub2FzdExvYWRpbmdGdWxsTG9ncyc7XG5pbXBvcnQgeyBvcGVuTGlua0luV2ViQnJvd3NlciB9IGZyb20gJy4uL3V0aWwvb3BlbkxpbmtJbldlYkJyb3dzZXInO1xuaW1wb3J0IHsgY3JlYXRlU3VwcG9ydFVybCB9IGZyb20gJy4uL3V0aWwvY3JlYXRlU3VwcG9ydFVybCc7XG5pbXBvcnQgeyB1c2VFc2NhcGVIYW5kbGluZyB9IGZyb20gJy4uL2hvb2tzL3VzZUVzY2FwZUhhbmRsaW5nJztcbmltcG9ydCB7IHVzZVRoZW1lIH0gZnJvbSAnLi4vaG9va3MvdXNlVGhlbWUnO1xuXG5lbnVtIExvYWRTdGF0ZSB7XG4gIE5vdFN0YXJ0ZWQsXG4gIFN0YXJ0ZWQsXG4gIExvYWRlZCxcbiAgU3VibWl0dGluZyxcbn1cblxuZXhwb3J0IHR5cGUgUHJvcHNUeXBlID0ge1xuICBjbG9zZVdpbmRvdzogKCkgPT4gdW5rbm93bjtcbiAgZG93bmxvYWRMb2c6ICh0ZXh0OiBzdHJpbmcpID0+IHVua25vd247XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGZldGNoTG9nczogKCkgPT4gUHJvbWlzZTxzdHJpbmc+O1xuICB1cGxvYWRMb2dzOiAobG9nczogc3RyaW5nKSA9PiBQcm9taXNlPHN0cmluZz47XG4gIHBsYXRmb3JtOiBzdHJpbmc7XG4gIGlzV2luZG93czExOiBib29sZWFuO1xuICBleGVjdXRlTWVudVJvbGU6IEV4ZWN1dGVNZW51Um9sZVR5cGU7XG59O1xuXG5lbnVtIFRvYXN0VHlwZSB7XG4gIENvcGllZCxcbiAgRXJyb3IsXG4gIExvYWRpbmcsXG59XG5cbmV4cG9ydCBjb25zdCBEZWJ1Z0xvZ1dpbmRvdyA9ICh7XG4gIGNsb3NlV2luZG93LFxuICBkb3dubG9hZExvZyxcbiAgaTE4bixcbiAgZmV0Y2hMb2dzLFxuICB1cGxvYWRMb2dzLFxuICBwbGF0Zm9ybSxcbiAgaXNXaW5kb3dzMTEsXG4gIGV4ZWN1dGVNZW51Um9sZSxcbn06IFByb3BzVHlwZSk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgW2xvYWRTdGF0ZSwgc2V0TG9hZFN0YXRlXSA9IHVzZVN0YXRlPExvYWRTdGF0ZT4oTG9hZFN0YXRlLk5vdFN0YXJ0ZWQpO1xuICBjb25zdCBbbG9nVGV4dCwgc2V0TG9nVGV4dF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFtwdWJsaWNMb2dVUkwsIHNldFB1YmxpY0xvZ1VSTF0gPSB1c2VTdGF0ZTxzdHJpbmcgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IFt0ZXh0QXJlYVZhbHVlLCBzZXRUZXh0QXJlYVZhbHVlXSA9IHVzZVN0YXRlPHN0cmluZz4oaTE4bignbG9hZGluZycpKTtcbiAgY29uc3QgW3RvYXN0VHlwZSwgc2V0VG9hc3RUeXBlXSA9IHVzZVN0YXRlPFRvYXN0VHlwZSB8IHVuZGVmaW5lZD4oKTtcblxuICBjb25zdCB0aGVtZSA9IHVzZVRoZW1lKCk7XG5cbiAgdXNlRXNjYXBlSGFuZGxpbmcoY2xvc2VXaW5kb3cpO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgc2V0TG9hZFN0YXRlKExvYWRTdGF0ZS5TdGFydGVkKTtcblxuICAgIGxldCBzaG91bGRDYW5jZWwgPSBmYWxzZTtcblxuICAgIGFzeW5jIGZ1bmN0aW9uIGRvRmV0Y2hMb2dzKCkge1xuICAgICAgY29uc3QgZmV0Y2hlZExvZ1RleHQgPSBhd2FpdCBmZXRjaExvZ3MoKTtcblxuICAgICAgaWYgKHNob3VsZENhbmNlbCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHNldFRvYXN0VHlwZShUb2FzdFR5cGUuTG9hZGluZyk7XG4gICAgICBzZXRMb2dUZXh0KGZldGNoZWRMb2dUZXh0KTtcbiAgICAgIHNldExvYWRTdGF0ZShMb2FkU3RhdGUuTG9hZGVkKTtcblxuICAgICAgLy8gVGhpcyBudW1iZXIgaXMgc29tZXdoYXQgYXJiaXRyYXJ5OyB3ZSB3YW50IHRvIHNob3cgZW5vdWdoIHRoYXQgaXQnc1xuICAgICAgLy8gY2xlYXIgdGhhdCB3ZSBuZWVkIHRvIHNjcm9sbCwgYnV0IG5vdCBzbyBtYW55IHRoYXQgdGhpbmdzIGdldCBzbG93LlxuICAgICAgY29uc3QgbGluZXNUb1Nob3cgPSBNYXRoLmNlaWwoTWF0aC5taW4od2luZG93LmlubmVySGVpZ2h0LCAyMDAwKSAvIDUpO1xuICAgICAgY29uc3QgdmFsdWUgPSBmZXRjaGVkTG9nVGV4dC5zcGxpdCgvXFxuL2csIGxpbmVzVG9TaG93KS5qb2luKCdcXG4nKTtcblxuICAgICAgc2V0VGV4dEFyZWFWYWx1ZShgJHt2YWx1ZX1cXG5cXG5cXG4ke2kxOG4oJ2RlYnVnTG9nTG9nSXNJbmNvbXBsZXRlJyl9YCk7XG4gICAgICBzZXRUb2FzdFR5cGUodW5kZWZpbmVkKTtcbiAgICB9XG5cbiAgICBkb0ZldGNoTG9ncygpO1xuXG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNob3VsZENhbmNlbCA9IHRydWU7XG4gICAgfTtcbiAgfSwgW2ZldGNoTG9ncywgaTE4bl0pO1xuXG4gIGNvbnN0IGhhbmRsZVN1Ym1pdCA9IGFzeW5jIChldjogTW91c2VFdmVudCkgPT4ge1xuICAgIGV2LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB0ZXh0ID0gbG9nVGV4dDtcblxuICAgIGlmICghdGV4dCB8fCB0ZXh0Lmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHNldExvYWRTdGF0ZShMb2FkU3RhdGUuU3VibWl0dGluZyk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgcHVibGlzaGVkTG9nVVJMID0gYXdhaXQgdXBsb2FkTG9ncyh0ZXh0KTtcbiAgICAgIHNldFB1YmxpY0xvZ1VSTChwdWJsaXNoZWRMb2dVUkwpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdEZWJ1Z0xvZ1dpbmRvdyBlcnJvcjonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgICBzZXRMb2FkU3RhdGUoTG9hZFN0YXRlLkxvYWRlZCk7XG4gICAgICBzZXRUb2FzdFR5cGUoVG9hc3RUeXBlLkVycm9yKTtcbiAgICB9XG4gIH07XG5cbiAgZnVuY3Rpb24gY2xvc2VUb2FzdCgpIHtcbiAgICBzZXRUb2FzdFR5cGUodW5kZWZpbmVkKTtcbiAgfVxuXG4gIGxldCB0b2FzdEVsZW1lbnQ6IEpTWC5FbGVtZW50IHwgdW5kZWZpbmVkO1xuICBpZiAodG9hc3RUeXBlID09PSBUb2FzdFR5cGUuTG9hZGluZykge1xuICAgIHRvYXN0RWxlbWVudCA9IDxUb2FzdExvYWRpbmdGdWxsTG9ncyBpMThuPXtpMThufSBvbkNsb3NlPXtjbG9zZVRvYXN0fSAvPjtcbiAgfSBlbHNlIGlmICh0b2FzdFR5cGUgPT09IFRvYXN0VHlwZS5Db3BpZWQpIHtcbiAgICB0b2FzdEVsZW1lbnQgPSA8VG9hc3RMaW5rQ29waWVkIGkxOG49e2kxOG59IG9uQ2xvc2U9e2Nsb3NlVG9hc3R9IC8+O1xuICB9IGVsc2UgaWYgKHRvYXN0VHlwZSA9PT0gVG9hc3RUeXBlLkVycm9yKSB7XG4gICAgdG9hc3RFbGVtZW50ID0gPFRvYXN0RGVidWdMb2dFcnJvciBpMThuPXtpMThufSBvbkNsb3NlPXtjbG9zZVRvYXN0fSAvPjtcbiAgfVxuXG4gIGlmIChwdWJsaWNMb2dVUkwpIHtcbiAgICBjb25zdCBjb3B5TG9nID0gKGV2OiBNb3VzZUV2ZW50KSA9PiB7XG4gICAgICBldi5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgY29weVRleHQocHVibGljTG9nVVJMKTtcbiAgICAgIHNldFRvYXN0VHlwZShUb2FzdFR5cGUuQ29waWVkKTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3VwcG9ydFVSTCA9IGNyZWF0ZVN1cHBvcnRVcmwoe1xuICAgICAgbG9jYWxlOiBpMThuLmdldExvY2FsZSgpLFxuICAgICAgcXVlcnk6IHtcbiAgICAgICAgZGVidWdMb2c6IHB1YmxpY0xvZ1VSTCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPFRpdGxlQmFyQ29udGFpbmVyXG4gICAgICAgIHBsYXRmb3JtPXtwbGF0Zm9ybX1cbiAgICAgICAgaXNXaW5kb3dzMTE9e2lzV2luZG93czExfVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIGV4ZWN1dGVNZW51Um9sZT17ZXhlY3V0ZU1lbnVSb2xlfVxuICAgICAgPlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93XCI+XG4gICAgICAgICAgPGRpdj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRGVidWdMb2dXaW5kb3dfX3RpdGxlXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdkZWJ1Z0xvZ1N1Y2Nlc3MnKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPHAgY2xhc3NOYW1lPVwiRGVidWdMb2dXaW5kb3dfX3N1YnRpdGxlXCI+XG4gICAgICAgICAgICAgIHtpMThuKCdkZWJ1Z0xvZ1N1Y2Nlc3NOZXh0U3RlcHMnKX1cbiAgICAgICAgICAgIDwvcD5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93X19jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJEZWJ1Z0xvZ1dpbmRvd19fbGlua1wiXG4gICAgICAgICAgICAgIHJlYWRPbmx5XG4gICAgICAgICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgICAgICAgdmFsdWU9e3B1YmxpY0xvZ1VSTH1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJEZWJ1Z0xvZ1dpbmRvd19fZm9vdGVyXCI+XG4gICAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICAgIG9uQ2xpY2s9eygpID0+IG9wZW5MaW5rSW5XZWJCcm93c2VyKHN1cHBvcnRVUkwpfVxuICAgICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2kxOG4oJ3JlcG9ydElzc3VlJyl9XG4gICAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgICAgIDxCdXR0b24gb25DbGljaz17Y29weUxvZ30+e2kxOG4oJ2RlYnVnTG9nQ29weScpfTwvQnV0dG9uPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHt0b2FzdEVsZW1lbnR9XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9UaXRsZUJhckNvbnRhaW5lcj5cbiAgICApO1xuICB9XG5cbiAgY29uc3QgY2FuU3VibWl0ID0gQm9vbGVhbihsb2dUZXh0KSAmJiBsb2FkU3RhdGUgIT09IExvYWRTdGF0ZS5TdWJtaXR0aW5nO1xuICBjb25zdCBjYW5TYXZlID0gQm9vbGVhbihsb2dUZXh0KTtcbiAgY29uc3QgaXNMb2FkaW5nID1cbiAgICBsb2FkU3RhdGUgPT09IExvYWRTdGF0ZS5TdGFydGVkIHx8IGxvYWRTdGF0ZSA9PT0gTG9hZFN0YXRlLlN1Ym1pdHRpbmc7XG5cbiAgcmV0dXJuIChcbiAgICA8VGl0bGVCYXJDb250YWluZXJcbiAgICAgIHBsYXRmb3JtPXtwbGF0Zm9ybX1cbiAgICAgIGlzV2luZG93czExPXtpc1dpbmRvd3MxMX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgIGV4ZWN1dGVNZW51Um9sZT17ZXhlY3V0ZU1lbnVSb2xlfVxuICAgID5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiRGVidWdMb2dXaW5kb3dcIj5cbiAgICAgICAgPGRpdj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93X190aXRsZVwiPntpMThuKCdzdWJtaXREZWJ1Z0xvZycpfTwvZGl2PlxuICAgICAgICAgIDxwIGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93X19zdWJ0aXRsZVwiPlxuICAgICAgICAgICAge2kxOG4oJ2RlYnVnTG9nRXhwbGFuYXRpb24nKX1cbiAgICAgICAgICA8L3A+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93X19jb250YWluZXJcIj5cbiAgICAgICAgICB7aXNMb2FkaW5nID8gKFxuICAgICAgICAgICAgPFNwaW5uZXIgc3ZnU2l6ZT1cIm5vcm1hbFwiIC8+XG4gICAgICAgICAgKSA6IChcbiAgICAgICAgICAgIDx0ZXh0YXJlYVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJEZWJ1Z0xvZ1dpbmRvd19fdGV4dGFyZWFcIlxuICAgICAgICAgICAgICByZWFkT25seVxuICAgICAgICAgICAgICByb3dzPXs1fVxuICAgICAgICAgICAgICBzcGVsbENoZWNrPXtmYWxzZX1cbiAgICAgICAgICAgICAgdmFsdWU9e3RleHRBcmVhVmFsdWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICl9XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkRlYnVnTG9nV2luZG93X19mb290ZXJcIj5cbiAgICAgICAgICA8QnV0dG9uXG4gICAgICAgICAgICBkaXNhYmxlZD17IWNhblNhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGlmIChsb2dUZXh0KSB7XG4gICAgICAgICAgICAgICAgZG93bmxvYWRMb2cobG9nVGV4dCk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICB2YXJpYW50PXtCdXR0b25WYXJpYW50LlNlY29uZGFyeX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignZGVidWdMb2dTYXZlJyl9XG4gICAgICAgICAgPC9CdXR0b24+XG4gICAgICAgICAgPEJ1dHRvbiBkaXNhYmxlZD17IWNhblN1Ym1pdH0gb25DbGljaz17aGFuZGxlU3VibWl0fT5cbiAgICAgICAgICAgIHtpMThuKCdzdWJtaXQnKX1cbiAgICAgICAgICA8L0J1dHRvbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHt0b2FzdEVsZW1lbnR9XG4gICAgICA8L2Rpdj5cbiAgICA8L1RpdGxlQmFyQ29udGFpbmVyPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFB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
