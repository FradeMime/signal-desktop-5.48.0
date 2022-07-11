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
var AudioCapture_exports = {};
__export(AudioCapture_exports, {
  AudioCapture: () => AudioCapture
});
module.exports = __toCommonJS(AudioCapture_exports);
var import_react = __toESM(require("react"));
var moment = __toESM(require("moment"));
var import_lodash = require("lodash");
var import_ConfirmationDialog = require("../ConfirmationDialog");
var import_audioRecorder = require("../../state/ducks/audioRecorder");
var import_ToastVoiceNoteLimit = require("../ToastVoiceNoteLimit");
var import_ToastVoiceNoteMustBeOnlyAttachment = require("../ToastVoiceNoteMustBeOnlyAttachment");
var import_useEscapeHandling = require("../../hooks/useEscapeHandling");
var import_useKeyboardShortcuts = require("../../hooks/useKeyboardShortcuts");
var ToastType = /* @__PURE__ */ ((ToastType2) => {
  ToastType2[ToastType2["VoiceNoteLimit"] = 0] = "VoiceNoteLimit";
  ToastType2[ToastType2["VoiceNoteMustBeOnlyAttachment"] = 1] = "VoiceNoteMustBeOnlyAttachment";
  return ToastType2;
})(ToastType || {});
const START_DURATION_TEXT = "0:00";
const AudioCapture = /* @__PURE__ */ __name(({
  cancelRecording,
  completeRecording,
  conversationId,
  draftAttachments,
  errorDialogAudioRecorderType,
  errorRecording,
  i18n,
  recordingState,
  onSendAudioRecording,
  startRecording
}) => {
  const [durationText, setDurationText] = (0, import_react.useState)(START_DURATION_TEXT);
  const [toastType, setToastType] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    return () => {
      cancelRecording();
    };
  }, [cancelRecording]);
  (0, import_react.useEffect)(() => {
    if (recordingState !== import_audioRecorder.RecordingState.Recording) {
      return;
    }
    const handler = /* @__PURE__ */ __name(() => {
      errorRecording(import_audioRecorder.ErrorDialogAudioRecorderType.Blur);
    }, "handler");
    window.addEventListener("blur", handler);
    return () => {
      window.removeEventListener("blur", handler);
    };
  }, [recordingState, completeRecording, errorRecording]);
  const escapeRecording = (0, import_react.useCallback)(() => {
    if (recordingState !== import_audioRecorder.RecordingState.Recording) {
      return;
    }
    cancelRecording();
  }, [cancelRecording, recordingState]);
  (0, import_useEscapeHandling.useEscapeHandling)(escapeRecording);
  const startRecordingShortcut = (0, import_useKeyboardShortcuts.useStartRecordingShortcut)(startRecording);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)(startRecordingShortcut);
  const closeToast = (0, import_react.useCallback)(() => {
    setToastType(void 0);
  }, []);
  (0, import_react.useEffect)(() => {
    if (recordingState !== import_audioRecorder.RecordingState.Recording) {
      return;
    }
    setDurationText(START_DURATION_TEXT);
    setToastType(0 /* VoiceNoteLimit */);
    const startTime = Date.now();
    const interval = setInterval(() => {
      const duration = moment.duration(Date.now() - startTime, "ms");
      const minutes = `${Math.trunc(duration.asMinutes())}`;
      let seconds = `${duration.seconds()}`;
      if (seconds.length < 2) {
        seconds = `0${seconds}`;
      }
      setDurationText(`${minutes}:${seconds}`);
      if (duration >= moment.duration(1, "hours")) {
        errorRecording(import_audioRecorder.ErrorDialogAudioRecorderType.Timeout);
      }
    }, 1e3);
    return () => {
      clearInterval(interval);
      closeToast();
    };
  }, [
    closeToast,
    completeRecording,
    errorRecording,
    recordingState,
    setDurationText
  ]);
  const clickCancel = (0, import_react.useCallback)(() => {
    cancelRecording();
  }, [cancelRecording]);
  const clickSend = (0, import_react.useCallback)(() => {
    completeRecording(conversationId, onSendAudioRecording);
  }, [conversationId, completeRecording, onSendAudioRecording]);
  let toastElement;
  if (toastType === 0 /* VoiceNoteLimit */) {
    toastElement = /* @__PURE__ */ import_react.default.createElement(import_ToastVoiceNoteLimit.ToastVoiceNoteLimit, {
      i18n,
      onClose: closeToast
    });
  } else if (toastType === 1 /* VoiceNoteMustBeOnlyAttachment */) {
    toastElement = /* @__PURE__ */ import_react.default.createElement(import_ToastVoiceNoteMustBeOnlyAttachment.ToastVoiceNoteMustBeOnlyAttachment, {
      i18n,
      onClose: closeToast
    });
  }
  let confirmationDialog;
  if (errorDialogAudioRecorderType === import_audioRecorder.ErrorDialogAudioRecorderType.Blur || errorDialogAudioRecorderType === import_audioRecorder.ErrorDialogAudioRecorderType.Timeout) {
    const confirmationDialogText = errorDialogAudioRecorderType === import_audioRecorder.ErrorDialogAudioRecorderType.Blur ? i18n("voiceRecordingInterruptedBlur") : i18n("voiceRecordingInterruptedMax");
    confirmationDialog = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      i18n,
      onCancel: clickCancel,
      onClose: import_lodash.noop,
      cancelText: i18n("discard"),
      actions: [
        {
          text: i18n("sendAnyway"),
          style: "affirmative",
          action: clickSend
        }
      ]
    }, confirmationDialogText);
  } else if (errorDialogAudioRecorderType === import_audioRecorder.ErrorDialogAudioRecorderType.ErrorRecording) {
    confirmationDialog = /* @__PURE__ */ import_react.default.createElement(import_ConfirmationDialog.ConfirmationDialog, {
      i18n,
      onCancel: clickCancel,
      onClose: import_lodash.noop,
      cancelText: i18n("ok"),
      actions: []
    }, i18n("voiceNoteError"));
  }
  if (recordingState === import_audioRecorder.RecordingState.Recording && !confirmationDialog) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "AudioCapture"
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      className: "AudioCapture__recorder-button AudioCapture__recorder-button--complete",
      onClick: clickSend,
      tabIndex: 0,
      title: i18n("voiceRecording--complete"),
      type: "button"
    }, /* @__PURE__ */ import_react.default.createElement("span", {
      className: "icon"
    })), /* @__PURE__ */ import_react.default.createElement("span", {
      className: "AudioCapture__time"
    }, durationText), /* @__PURE__ */ import_react.default.createElement("button", {
      className: "AudioCapture__recorder-button AudioCapture__recorder-button--cancel",
      onClick: clickCancel,
      tabIndex: 0,
      title: i18n("voiceRecording--cancel"),
      type: "button"
    }, /* @__PURE__ */ import_react.default.createElement("span", {
      className: "icon"
    }))), toastElement);
  }
  return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "AudioCapture"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    "aria-label": i18n("voiceRecording--start"),
    className: "AudioCapture__microphone",
    onClick: () => {
      if (draftAttachments.length) {
        setToastType(1 /* VoiceNoteMustBeOnlyAttachment */);
      } else {
        startRecording();
      }
    },
    title: i18n("voiceRecording--start"),
    type: "button"
  }), confirmationDialog), toastElement);
}, "AudioCapture");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioCapture
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXVkaW9DYXB0dXJlLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTYtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VTdGF0ZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQXR0YWNobWVudERyYWZ0VHlwZSxcbiAgSW5NZW1vcnlBdHRhY2htZW50RHJhZnRUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IENvbmZpcm1hdGlvbkRpYWxvZyB9IGZyb20gJy4uL0NvbmZpcm1hdGlvbkRpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcbmltcG9ydCB7XG4gIEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUsXG4gIFJlY29yZGluZ1N0YXRlLFxufSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9hdWRpb1JlY29yZGVyJztcbmltcG9ydCB7IFRvYXN0Vm9pY2VOb3RlTGltaXQgfSBmcm9tICcuLi9Ub2FzdFZvaWNlTm90ZUxpbWl0JztcbmltcG9ydCB7IFRvYXN0Vm9pY2VOb3RlTXVzdEJlT25seUF0dGFjaG1lbnQgfSBmcm9tICcuLi9Ub2FzdFZvaWNlTm90ZU11c3RCZU9ubHlBdHRhY2htZW50JztcbmltcG9ydCB7IHVzZUVzY2FwZUhhbmRsaW5nIH0gZnJvbSAnLi4vLi4vaG9va3MvdXNlRXNjYXBlSGFuZGxpbmcnO1xuaW1wb3J0IHtcbiAgdXNlU3RhcnRSZWNvcmRpbmdTaG9ydGN1dCxcbiAgdXNlS2V5Ym9hcmRTaG9ydGN1dHMsXG59IGZyb20gJy4uLy4uL2hvb2tzL3VzZUtleWJvYXJkU2hvcnRjdXRzJztcblxudHlwZSBPblNlbmRBdWRpb1JlY29yZGluZ1R5cGUgPSAocmVjOiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUpID0+IHVua25vd247XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgY2FuY2VsUmVjb3JkaW5nOiAoKSA9PiB1bmtub3duO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBjb21wbGV0ZVJlY29yZGluZzogKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgb25TZW5kQXVkaW9SZWNvcmRpbmc/OiBPblNlbmRBdWRpb1JlY29yZGluZ1R5cGVcbiAgKSA9PiB1bmtub3duO1xuICBkcmFmdEF0dGFjaG1lbnRzOiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnREcmFmdFR5cGU+O1xuICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlPzogRXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTtcbiAgZXJyb3JSZWNvcmRpbmc6IChlOiBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlKSA9PiB1bmtub3duO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICByZWNvcmRpbmdTdGF0ZTogUmVjb3JkaW5nU3RhdGU7XG4gIG9uU2VuZEF1ZGlvUmVjb3JkaW5nOiBPblNlbmRBdWRpb1JlY29yZGluZ1R5cGU7XG4gIHN0YXJ0UmVjb3JkaW5nOiAoKSA9PiB1bmtub3duO1xufTtcblxuZW51bSBUb2FzdFR5cGUge1xuICBWb2ljZU5vdGVMaW1pdCxcbiAgVm9pY2VOb3RlTXVzdEJlT25seUF0dGFjaG1lbnQsXG59XG5cbmNvbnN0IFNUQVJUX0RVUkFUSU9OX1RFWFQgPSAnMDowMCc7XG5cbmV4cG9ydCBjb25zdCBBdWRpb0NhcHR1cmUgPSAoe1xuICBjYW5jZWxSZWNvcmRpbmcsXG4gIGNvbXBsZXRlUmVjb3JkaW5nLFxuICBjb252ZXJzYXRpb25JZCxcbiAgZHJhZnRBdHRhY2htZW50cyxcbiAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZSxcbiAgZXJyb3JSZWNvcmRpbmcsXG4gIGkxOG4sXG4gIHJlY29yZGluZ1N0YXRlLFxuICBvblNlbmRBdWRpb1JlY29yZGluZyxcbiAgc3RhcnRSZWNvcmRpbmcsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IFtkdXJhdGlvblRleHQsIHNldER1cmF0aW9uVGV4dF0gPSB1c2VTdGF0ZTxzdHJpbmc+KFNUQVJUX0RVUkFUSU9OX1RFWFQpO1xuICBjb25zdCBbdG9hc3RUeXBlLCBzZXRUb2FzdFR5cGVdID0gdXNlU3RhdGU8VG9hc3RUeXBlIHwgdW5kZWZpbmVkPigpO1xuXG4gIC8vIENhbmNlbCByZWNvcmRpbmcgaWYgd2Ugc3dpdGNoIGF3YXkgZnJvbSB0aGlzIGNvbnZlcnNhdGlvbiwgdW5tb3VudGluZ1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjYW5jZWxSZWNvcmRpbmcoKTtcbiAgICB9O1xuICB9LCBbY2FuY2VsUmVjb3JkaW5nXSk7XG5cbiAgLy8gU3RvcCByZWNvcmRpbmcgYW5kIHNob3cgY29uZmlybWF0aW9uIGlmIHVzZXIgc3dpdGNoZXMgYXdheSBmcm9tIHRoaXMgYXBwXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKHJlY29yZGluZ1N0YXRlICE9PSBSZWNvcmRpbmdTdGF0ZS5SZWNvcmRpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBoYW5kbGVyID0gKCkgPT4ge1xuICAgICAgZXJyb3JSZWNvcmRpbmcoRXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZS5CbHVyKTtcbiAgICB9O1xuICAgIHdpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdibHVyJywgaGFuZGxlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2JsdXInLCBoYW5kbGVyKTtcbiAgICB9O1xuICB9LCBbcmVjb3JkaW5nU3RhdGUsIGNvbXBsZXRlUmVjb3JkaW5nLCBlcnJvclJlY29yZGluZ10pO1xuXG4gIGNvbnN0IGVzY2FwZVJlY29yZGluZyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAocmVjb3JkaW5nU3RhdGUgIT09IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhbmNlbFJlY29yZGluZygpO1xuICB9LCBbY2FuY2VsUmVjb3JkaW5nLCByZWNvcmRpbmdTdGF0ZV0pO1xuXG4gIHVzZUVzY2FwZUhhbmRsaW5nKGVzY2FwZVJlY29yZGluZyk7XG5cbiAgY29uc3Qgc3RhcnRSZWNvcmRpbmdTaG9ydGN1dCA9IHVzZVN0YXJ0UmVjb3JkaW5nU2hvcnRjdXQoc3RhcnRSZWNvcmRpbmcpO1xuICB1c2VLZXlib2FyZFNob3J0Y3V0cyhzdGFydFJlY29yZGluZ1Nob3J0Y3V0KTtcblxuICBjb25zdCBjbG9zZVRvYXN0ID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldFRvYXN0VHlwZSh1bmRlZmluZWQpO1xuICB9LCBbXSk7XG5cbiAgLy8gVXBkYXRlIHRpbWVzdGFtcCByZWd1bGFybHksIHRoZW4gdGltZW91dCBpZiByZWNvcmRpbmcgZ29lcyBvdmVyIGZpdmUgbWludXRlc1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmIChyZWNvcmRpbmdTdGF0ZSAhPT0gUmVjb3JkaW5nU3RhdGUuUmVjb3JkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0RHVyYXRpb25UZXh0KFNUQVJUX0RVUkFUSU9OX1RFWFQpO1xuICAgIHNldFRvYXN0VHlwZShUb2FzdFR5cGUuVm9pY2VOb3RlTGltaXQpO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBpbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgIGNvbnN0IGR1cmF0aW9uID0gbW9tZW50LmR1cmF0aW9uKERhdGUubm93KCkgLSBzdGFydFRpbWUsICdtcycpO1xuICAgICAgY29uc3QgbWludXRlcyA9IGAke01hdGgudHJ1bmMoZHVyYXRpb24uYXNNaW51dGVzKCkpfWA7XG4gICAgICBsZXQgc2Vjb25kcyA9IGAke2R1cmF0aW9uLnNlY29uZHMoKX1gO1xuICAgICAgaWYgKHNlY29uZHMubGVuZ3RoIDwgMikge1xuICAgICAgICBzZWNvbmRzID0gYDAke3NlY29uZHN9YDtcbiAgICAgIH1cbiAgICAgIHNldER1cmF0aW9uVGV4dChgJHttaW51dGVzfToke3NlY29uZHN9YCk7XG5cbiAgICAgIGlmIChkdXJhdGlvbiA+PSBtb21lbnQuZHVyYXRpb24oMSwgJ2hvdXJzJykpIHtcbiAgICAgICAgZXJyb3JSZWNvcmRpbmcoRXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZS5UaW1lb3V0KTtcbiAgICAgIH1cbiAgICB9LCAxMDAwKTtcblxuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBjbGVhckludGVydmFsKGludGVydmFsKTtcbiAgICAgIGNsb3NlVG9hc3QoKTtcbiAgICB9O1xuICB9LCBbXG4gICAgY2xvc2VUb2FzdCxcbiAgICBjb21wbGV0ZVJlY29yZGluZyxcbiAgICBlcnJvclJlY29yZGluZyxcbiAgICByZWNvcmRpbmdTdGF0ZSxcbiAgICBzZXREdXJhdGlvblRleHQsXG4gIF0pO1xuXG4gIGNvbnN0IGNsaWNrQ2FuY2VsID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNhbmNlbFJlY29yZGluZygpO1xuICB9LCBbY2FuY2VsUmVjb3JkaW5nXSk7XG5cbiAgY29uc3QgY2xpY2tTZW5kID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIGNvbXBsZXRlUmVjb3JkaW5nKGNvbnZlcnNhdGlvbklkLCBvblNlbmRBdWRpb1JlY29yZGluZyk7XG4gIH0sIFtjb252ZXJzYXRpb25JZCwgY29tcGxldGVSZWNvcmRpbmcsIG9uU2VuZEF1ZGlvUmVjb3JkaW5nXSk7XG5cbiAgbGV0IHRvYXN0RWxlbWVudDogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIGlmICh0b2FzdFR5cGUgPT09IFRvYXN0VHlwZS5Wb2ljZU5vdGVMaW1pdCkge1xuICAgIHRvYXN0RWxlbWVudCA9IDxUb2FzdFZvaWNlTm90ZUxpbWl0IGkxOG49e2kxOG59IG9uQ2xvc2U9e2Nsb3NlVG9hc3R9IC8+O1xuICB9IGVsc2UgaWYgKHRvYXN0VHlwZSA9PT0gVG9hc3RUeXBlLlZvaWNlTm90ZU11c3RCZU9ubHlBdHRhY2htZW50KSB7XG4gICAgdG9hc3RFbGVtZW50ID0gKFxuICAgICAgPFRvYXN0Vm9pY2VOb3RlTXVzdEJlT25seUF0dGFjaG1lbnQgaTE4bj17aTE4bn0gb25DbG9zZT17Y2xvc2VUb2FzdH0gLz5cbiAgICApO1xuICB9XG5cbiAgbGV0IGNvbmZpcm1hdGlvbkRpYWxvZzogSlNYLkVsZW1lbnQgfCB1bmRlZmluZWQ7XG4gIGlmIChcbiAgICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlID09PSBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLkJsdXIgfHxcbiAgICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlID09PSBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLlRpbWVvdXRcbiAgKSB7XG4gICAgY29uc3QgY29uZmlybWF0aW9uRGlhbG9nVGV4dCA9XG4gICAgICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlID09PSBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLkJsdXJcbiAgICAgICAgPyBpMThuKCd2b2ljZVJlY29yZGluZ0ludGVycnVwdGVkQmx1cicpXG4gICAgICAgIDogaTE4bigndm9pY2VSZWNvcmRpbmdJbnRlcnJ1cHRlZE1heCcpO1xuXG4gICAgY29uZmlybWF0aW9uRGlhbG9nID0gKFxuICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNhbmNlbD17Y2xpY2tDYW5jZWx9XG4gICAgICAgIG9uQ2xvc2U9e25vb3B9XG4gICAgICAgIGNhbmNlbFRleHQ9e2kxOG4oJ2Rpc2NhcmQnKX1cbiAgICAgICAgYWN0aW9ucz17W1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRleHQ6IGkxOG4oJ3NlbmRBbnl3YXknKSxcbiAgICAgICAgICAgIHN0eWxlOiAnYWZmaXJtYXRpdmUnLFxuICAgICAgICAgICAgYWN0aW9uOiBjbGlja1NlbmQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXX1cbiAgICAgID5cbiAgICAgICAge2NvbmZpcm1hdGlvbkRpYWxvZ1RleHR9XG4gICAgICA8L0NvbmZpcm1hdGlvbkRpYWxvZz5cbiAgICApO1xuICB9IGVsc2UgaWYgKFxuICAgIGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUgPT09IEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUuRXJyb3JSZWNvcmRpbmdcbiAgKSB7XG4gICAgY29uZmlybWF0aW9uRGlhbG9nID0gKFxuICAgICAgPENvbmZpcm1hdGlvbkRpYWxvZ1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNhbmNlbD17Y2xpY2tDYW5jZWx9XG4gICAgICAgIG9uQ2xvc2U9e25vb3B9XG4gICAgICAgIGNhbmNlbFRleHQ9e2kxOG4oJ29rJyl9XG4gICAgICAgIGFjdGlvbnM9e1tdfVxuICAgICAgPlxuICAgICAgICB7aTE4bigndm9pY2VOb3RlRXJyb3InKX1cbiAgICAgIDwvQ29uZmlybWF0aW9uRGlhbG9nPlxuICAgICk7XG4gIH1cblxuICBpZiAocmVjb3JkaW5nU3RhdGUgPT09IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZyAmJiAhY29uZmlybWF0aW9uRGlhbG9nKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQXVkaW9DYXB0dXJlXCI+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiQXVkaW9DYXB0dXJlX19yZWNvcmRlci1idXR0b24gQXVkaW9DYXB0dXJlX19yZWNvcmRlci1idXR0b24tLWNvbXBsZXRlXCJcbiAgICAgICAgICAgIG9uQ2xpY2s9e2NsaWNrU2VuZH1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgdGl0bGU9e2kxOG4oJ3ZvaWNlUmVjb3JkaW5nLS1jb21wbGV0ZScpfVxuICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgPlxuICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiaWNvblwiIC8+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwiQXVkaW9DYXB0dXJlX190aW1lXCI+e2R1cmF0aW9uVGV4dH08L3NwYW4+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPVwiQXVkaW9DYXB0dXJlX19yZWNvcmRlci1idXR0b24gQXVkaW9DYXB0dXJlX19yZWNvcmRlci1idXR0b24tLWNhbmNlbFwiXG4gICAgICAgICAgICBvbkNsaWNrPXtjbGlja0NhbmNlbH1cbiAgICAgICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICAgICAgdGl0bGU9e2kxOG4oJ3ZvaWNlUmVjb3JkaW5nLS1jYW5jZWwnKX1cbiAgICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAgID5cbiAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cImljb25cIiAvPlxuICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RvYXN0RWxlbWVudH1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkF1ZGlvQ2FwdHVyZVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bigndm9pY2VSZWNvcmRpbmctLXN0YXJ0Jyl9XG4gICAgICAgICAgY2xhc3NOYW1lPVwiQXVkaW9DYXB0dXJlX19taWNyb3Bob25lXCJcbiAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAoZHJhZnRBdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICAgICAgICAgICAgc2V0VG9hc3RUeXBlKFRvYXN0VHlwZS5Wb2ljZU5vdGVNdXN0QmVPbmx5QXR0YWNobWVudCk7XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBzdGFydFJlY29yZGluZygpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH19XG4gICAgICAgICAgdGl0bGU9e2kxOG4oJ3ZvaWNlUmVjb3JkaW5nLS1zdGFydCcpfVxuICAgICAgICAgIHR5cGU9XCJidXR0b25cIlxuICAgICAgICAvPlxuICAgICAgICB7Y29uZmlybWF0aW9uRGlhbG9nfVxuICAgICAgPC9kaXY+XG4gICAgICB7dG9hc3RFbGVtZW50fVxuICAgIDwvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBd0Q7QUFDeEQsYUFBd0I7QUFDeEIsb0JBQXFCO0FBTXJCLGdDQUFtQztBQUVuQywyQkFHTztBQUNQLGlDQUFvQztBQUNwQyxnREFBbUQ7QUFDbkQsK0JBQWtDO0FBQ2xDLGtDQUdPO0FBb0JQLElBQUssWUFBTCxrQkFBSyxlQUFMO0FBQ0U7QUFDQTtBQUZHO0FBQUE7QUFLTCxNQUFNLHNCQUFzQjtBQUVyQixNQUFNLGVBQWUsd0JBQUM7QUFBQSxFQUMzQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLE1BQzRCO0FBQzVCLFFBQU0sQ0FBQyxjQUFjLG1CQUFtQiwyQkFBaUIsbUJBQW1CO0FBQzVFLFFBQU0sQ0FBQyxXQUFXLGdCQUFnQiwyQkFBZ0M7QUFHbEUsOEJBQVUsTUFBTTtBQUNkLFdBQU8sTUFBTTtBQUNYLHNCQUFnQjtB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
