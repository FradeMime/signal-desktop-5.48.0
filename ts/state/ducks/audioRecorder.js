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
var audioRecorder_exports = {};
__export(audioRecorder_exports, {
  ErrorDialogAudioRecorderType: () => ErrorDialogAudioRecorderType,
  RecordingState: () => RecordingState,
  actions: () => actions,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  useActions: () => useActions
});
module.exports = __toCommonJS(audioRecorder_exports);
var log = __toESM(require("../../logging/log"));
var import_protobuf = require("../../protobuf");
var import_fileToBytes = require("../../util/fileToBytes");
var import_audioRecorder = require("../../services/audioRecorder");
var import_MIME = require("../../types/MIME");
var import_useBoundActions = require("../../hooks/useBoundActions");
var ErrorDialogAudioRecorderType = /* @__PURE__ */ ((ErrorDialogAudioRecorderType2) => {
  ErrorDialogAudioRecorderType2[ErrorDialogAudioRecorderType2["Blur"] = 0] = "Blur";
  ErrorDialogAudioRecorderType2[ErrorDialogAudioRecorderType2["ErrorRecording"] = 1] = "ErrorRecording";
  ErrorDialogAudioRecorderType2[ErrorDialogAudioRecorderType2["Timeout"] = 2] = "Timeout";
  return ErrorDialogAudioRecorderType2;
})(ErrorDialogAudioRecorderType || {});
var RecordingState = /* @__PURE__ */ ((RecordingState2) => {
  RecordingState2["Recording"] = "recording";
  RecordingState2["Initializing"] = "initializing";
  RecordingState2["Idle"] = "idle";
  return RecordingState2;
})(RecordingState || {});
const CANCEL_RECORDING = "audioRecorder/CANCEL_RECORDING";
const COMPLETE_RECORDING = "audioRecorder/COMPLETE_RECORDING";
const ERROR_RECORDING = "audioRecorder/ERROR_RECORDING";
const NOW_RECORDING = "audioRecorder/NOW_RECORDING";
const START_RECORDING = "audioRecorder/START_RECORDING";
const actions = {
  cancelRecording,
  completeRecording,
  errorRecording,
  startRecording
};
const useActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useActions");
function startRecording() {
  return async (dispatch, getState) => {
    if (getState().composer.attachments.length) {
      return;
    }
    if (getState().audioRecorder.recordingState !== "idle" /* Idle */) {
      return;
    }
    dispatch({
      type: START_RECORDING,
      payload: void 0
    });
    try {
      const started = await import_audioRecorder.recorder.start();
      if (started) {
        dispatch({
          type: NOW_RECORDING,
          payload: void 0
        });
      } else {
        dispatch({
          type: ERROR_RECORDING,
          payload: 1 /* ErrorRecording */
        });
      }
    } catch (err) {
      dispatch({
        type: ERROR_RECORDING,
        payload: 1 /* ErrorRecording */
      });
    }
  };
}
function completeRecordingAction() {
  return {
    type: COMPLETE_RECORDING,
    payload: void 0
  };
}
function completeRecording(conversationId, onSendAudioRecording) {
  return async (dispatch, getState) => {
    const state = getState();
    const isSelectedConversation = state.conversations.selectedConversationId === conversationId;
    if (!isSelectedConversation) {
      log.warn("completeRecording: Recording started in one conversation and completed in another");
      dispatch(cancelRecording());
      return;
    }
    const blob = await import_audioRecorder.recorder.stop();
    try {
      if (!blob) {
        throw new Error("completeRecording: no blob returned");
      }
      const data = await (0, import_fileToBytes.fileToBytes)(blob);
      const voiceNoteAttachment = {
        pending: false,
        contentType: (0, import_MIME.stringToMIMEType)(blob.type),
        data,
        size: data.byteLength,
        flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE
      };
      if (onSendAudioRecording) {
        onSendAudioRecording(voiceNoteAttachment);
      }
    } finally {
      dispatch(completeRecordingAction());
    }
  };
}
function cancelRecording() {
  return async (dispatch) => {
    await import_audioRecorder.recorder.stop();
    import_audioRecorder.recorder.clear();
    dispatch({
      type: CANCEL_RECORDING,
      payload: void 0
    });
  };
}
function errorRecording(errorDialogAudioRecorderType) {
  import_audioRecorder.recorder.stop();
  return {
    type: ERROR_RECORDING,
    payload: errorDialogAudioRecorderType
  };
}
function getEmptyState() {
  return {
    recordingState: "idle" /* Idle */
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === START_RECORDING) {
    return {
      ...state,
      errorDialogAudioRecorderType: void 0,
      recordingState: "initializing" /* Initializing */
    };
  }
  if (action.type === NOW_RECORDING) {
    return {
      ...state,
      errorDialogAudioRecorderType: void 0,
      recordingState: "recording" /* Recording */
    };
  }
  if (action.type === CANCEL_RECORDING || action.type === COMPLETE_RECORDING) {
    return {
      ...state,
      errorDialogAudioRecorderType: void 0,
      recordingState: "idle" /* Idle */
    };
  }
  if (action.type === ERROR_RECORDING) {
    return {
      ...state,
      errorDialogAudioRecorderType: action.payload
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ErrorDialogAudioRecorderType,
  RecordingState,
  actions,
  getEmptyState,
  reducer,
  useActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9SZWNvcmRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFRodW5rQWN0aW9uIH0gZnJvbSAncmVkdXgtdGh1bmsnO1xuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi8uLi9wcm90b2J1Zic7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBmaWxlVG9CeXRlcyB9IGZyb20gJy4uLy4uL3V0aWwvZmlsZVRvQnl0ZXMnO1xuaW1wb3J0IHsgcmVjb3JkZXIgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9hdWRpb1JlY29yZGVyJztcbmltcG9ydCB7IHN0cmluZ1RvTUlNRVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IHVzZUJvdW5kQWN0aW9ucyB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZUJvdW5kQWN0aW9ucyc7XG5cbmV4cG9ydCBlbnVtIEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUge1xuICBCbHVyLFxuICBFcnJvclJlY29yZGluZyxcbiAgVGltZW91dCxcbn1cblxuLy8gU3RhdGVcblxuZXhwb3J0IGVudW0gUmVjb3JkaW5nU3RhdGUge1xuICBSZWNvcmRpbmcgPSAncmVjb3JkaW5nJyxcbiAgSW5pdGlhbGl6aW5nID0gJ2luaXRpYWxpemluZycsXG4gIElkbGUgPSAnaWRsZScsXG59XG5cbmV4cG9ydCB0eXBlIEF1ZGlvUGxheWVyU3RhdGVUeXBlID0ge1xuICByZWFkb25seSByZWNvcmRpbmdTdGF0ZTogUmVjb3JkaW5nU3RhdGU7XG4gIHJlYWRvbmx5IGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGU/OiBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlO1xufTtcblxuLy8gQWN0aW9uc1xuXG5jb25zdCBDQU5DRUxfUkVDT1JESU5HID0gJ2F1ZGlvUmVjb3JkZXIvQ0FOQ0VMX1JFQ09SRElORyc7XG5jb25zdCBDT01QTEVURV9SRUNPUkRJTkcgPSAnYXVkaW9SZWNvcmRlci9DT01QTEVURV9SRUNPUkRJTkcnO1xuY29uc3QgRVJST1JfUkVDT1JESU5HID0gJ2F1ZGlvUmVjb3JkZXIvRVJST1JfUkVDT1JESU5HJztcbmNvbnN0IE5PV19SRUNPUkRJTkcgPSAnYXVkaW9SZWNvcmRlci9OT1dfUkVDT1JESU5HJztcbmNvbnN0IFNUQVJUX1JFQ09SRElORyA9ICdhdWRpb1JlY29yZGVyL1NUQVJUX1JFQ09SRElORyc7XG5cbnR5cGUgQ2FuY2VsUmVjb3JkaW5nQWN0aW9uID0ge1xuICB0eXBlOiB0eXBlb2YgQ0FOQ0VMX1JFQ09SRElORztcbiAgcGF5bG9hZDogdW5kZWZpbmVkO1xufTtcbnR5cGUgQ29tcGxldGVSZWNvcmRpbmdBY3Rpb24gPSB7XG4gIHR5cGU6IHR5cGVvZiBDT01QTEVURV9SRUNPUkRJTkc7XG4gIHBheWxvYWQ6IHVuZGVmaW5lZDtcbn07XG50eXBlIEVycm9yUmVjb3JkaW5nQWN0aW9uID0ge1xuICB0eXBlOiB0eXBlb2YgRVJST1JfUkVDT1JESU5HO1xuICBwYXlsb2FkOiBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlO1xufTtcbnR5cGUgU3RhcnRSZWNvcmRpbmdBY3Rpb24gPSB7XG4gIHR5cGU6IHR5cGVvZiBTVEFSVF9SRUNPUkRJTkc7XG4gIHBheWxvYWQ6IHVuZGVmaW5lZDtcbn07XG50eXBlIE5vd1JlY29yZGluZ0FjdGlvbiA9IHtcbiAgdHlwZTogdHlwZW9mIE5PV19SRUNPUkRJTkc7XG4gIHBheWxvYWQ6IHVuZGVmaW5lZDtcbn07XG5cbnR5cGUgQXVkaW9QbGF5ZXJBY3Rpb25UeXBlID1cbiAgfCBDYW5jZWxSZWNvcmRpbmdBY3Rpb25cbiAgfCBDb21wbGV0ZVJlY29yZGluZ0FjdGlvblxuICB8IEVycm9yUmVjb3JkaW5nQWN0aW9uXG4gIHwgTm93UmVjb3JkaW5nQWN0aW9uXG4gIHwgU3RhcnRSZWNvcmRpbmdBY3Rpb247XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5leHBvcnQgY29uc3QgYWN0aW9ucyA9IHtcbiAgY2FuY2VsUmVjb3JkaW5nLFxuICBjb21wbGV0ZVJlY29yZGluZyxcbiAgZXJyb3JSZWNvcmRpbmcsXG4gIHN0YXJ0UmVjb3JkaW5nLFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZUFjdGlvbnMgPSAoKTogdHlwZW9mIGFjdGlvbnMgPT4gdXNlQm91bmRBY3Rpb25zKGFjdGlvbnMpO1xuXG5mdW5jdGlvbiBzdGFydFJlY29yZGluZygpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgU3RhcnRSZWNvcmRpbmdBY3Rpb24gfCBOb3dSZWNvcmRpbmdBY3Rpb24gfCBFcnJvclJlY29yZGluZ0FjdGlvblxuPiB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgaWYgKGdldFN0YXRlKCkuY29tcG9zZXIuYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChnZXRTdGF0ZSgpLmF1ZGlvUmVjb3JkZXIucmVjb3JkaW5nU3RhdGUgIT09IFJlY29yZGluZ1N0YXRlLklkbGUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBTVEFSVF9SRUNPUkRJTkcsXG4gICAgICBwYXlsb2FkOiB1bmRlZmluZWQsXG4gICAgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc3RhcnRlZCA9IGF3YWl0IHJlY29yZGVyLnN0YXJ0KCk7XG5cbiAgICAgIGlmIChzdGFydGVkKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBOT1dfUkVDT1JESU5HLFxuICAgICAgICAgIHBheWxvYWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBkaXNwYXRjaCh7XG4gICAgICAgICAgdHlwZTogRVJST1JfUkVDT1JESU5HLFxuICAgICAgICAgIHBheWxvYWQ6IEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUuRXJyb3JSZWNvcmRpbmcsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiBFUlJPUl9SRUNPUkRJTkcsXG4gICAgICAgIHBheWxvYWQ6IEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUuRXJyb3JSZWNvcmRpbmcsXG4gICAgICB9KTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbXBsZXRlUmVjb3JkaW5nQWN0aW9uKCk6IENvbXBsZXRlUmVjb3JkaW5nQWN0aW9uIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBDT01QTEVURV9SRUNPUkRJTkcsXG4gICAgcGF5bG9hZDogdW5kZWZpbmVkLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjb21wbGV0ZVJlY29yZGluZyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgb25TZW5kQXVkaW9SZWNvcmRpbmc/OiAocmVjOiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUpID0+IHVua25vd25cbik6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBDYW5jZWxSZWNvcmRpbmdBY3Rpb24gfCBDb21wbGV0ZVJlY29yZGluZ0FjdGlvblxuPiB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuXG4gICAgY29uc3QgaXNTZWxlY3RlZENvbnZlcnNhdGlvbiA9XG4gICAgICBzdGF0ZS5jb252ZXJzYXRpb25zLnNlbGVjdGVkQ29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbklkO1xuXG4gICAgaWYgKCFpc1NlbGVjdGVkQ29udmVyc2F0aW9uKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ2NvbXBsZXRlUmVjb3JkaW5nOiBSZWNvcmRpbmcgc3RhcnRlZCBpbiBvbmUgY29udmVyc2F0aW9uIGFuZCBjb21wbGV0ZWQgaW4gYW5vdGhlcidcbiAgICAgICk7XG4gICAgICBkaXNwYXRjaChjYW5jZWxSZWNvcmRpbmcoKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IHJlY29yZGVyLnN0b3AoKTtcblxuICAgIHRyeSB7XG4gICAgICBpZiAoIWJsb2IpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdjb21wbGV0ZVJlY29yZGluZzogbm8gYmxvYiByZXR1cm5lZCcpO1xuICAgICAgfVxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGZpbGVUb0J5dGVzKGJsb2IpO1xuXG4gICAgICBjb25zdCB2b2ljZU5vdGVBdHRhY2htZW50OiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgPSB7XG4gICAgICAgIHBlbmRpbmc6IGZhbHNlLFxuICAgICAgICBjb250ZW50VHlwZTogc3RyaW5nVG9NSU1FVHlwZShibG9iLnR5cGUpLFxuICAgICAgICBkYXRhLFxuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGZsYWdzOiBQcm90by5BdHRhY2htZW50UG9pbnRlci5GbGFncy5WT0lDRV9NRVNTQUdFLFxuICAgICAgfTtcblxuICAgICAgaWYgKG9uU2VuZEF1ZGlvUmVjb3JkaW5nKSB7XG4gICAgICAgIG9uU2VuZEF1ZGlvUmVjb3JkaW5nKHZvaWNlTm90ZUF0dGFjaG1lbnQpO1xuICAgICAgfVxuICAgIH0gZmluYWxseSB7XG4gICAgICBkaXNwYXRjaChjb21wbGV0ZVJlY29yZGluZ0FjdGlvbigpKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbmNlbFJlY29yZGluZygpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgQ2FuY2VsUmVjb3JkaW5nQWN0aW9uXG4+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICBhd2FpdCByZWNvcmRlci5zdG9wKCk7XG4gICAgcmVjb3JkZXIuY2xlYXIoKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IENBTkNFTF9SRUNPUkRJTkcsXG4gICAgICBwYXlsb2FkOiB1bmRlZmluZWQsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGVycm9yUmVjb3JkaW5nKFxuICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlOiBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlXG4pOiBFcnJvclJlY29yZGluZ0FjdGlvbiB7XG4gIHJlY29yZGVyLnN0b3AoKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IEVSUk9SX1JFQ09SRElORyxcbiAgICBwYXlsb2FkOiBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLFxuICB9O1xufVxuXG4vLyBSZWR1Y2VyXG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRFbXB0eVN0YXRlKCk6IEF1ZGlvUGxheWVyU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICByZWNvcmRpbmdTdGF0ZTogUmVjb3JkaW5nU3RhdGUuSWRsZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlOiBSZWFkb25seTxBdWRpb1BsYXllclN0YXRlVHlwZT4gPSBnZXRFbXB0eVN0YXRlKCksXG4gIGFjdGlvbjogUmVhZG9ubHk8QXVkaW9QbGF5ZXJBY3Rpb25UeXBlPlxuKTogQXVkaW9QbGF5ZXJTdGF0ZVR5cGUge1xuICBpZiAoYWN0aW9uLnR5cGUgPT09IFNUQVJUX1JFQ09SRElORykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIHJlY29yZGluZ1N0YXRlOiBSZWNvcmRpbmdTdGF0ZS5Jbml0aWFsaXppbmcsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gTk9XX1JFQ09SRElORykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGU6IHVuZGVmaW5lZCxcbiAgICAgIHJlY29yZGluZ1N0YXRlOiBSZWNvcmRpbmdTdGF0ZS5SZWNvcmRpbmcsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0FOQ0VMX1JFQ09SRElORyB8fCBhY3Rpb24udHlwZSA9PT0gQ09NUExFVEVfUkVDT1JESU5HKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTogdW5kZWZpbmVkLFxuICAgICAgcmVjb3JkaW5nU3RhdGU6IFJlY29yZGluZ1N0YXRlLklkbGUsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gRVJST1JfUkVDT1JESU5HKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTogYWN0aW9uLnBheWxvYWQsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiBzdGF0ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsVUFBcUI7QUFFckIsc0JBQXVDO0FBRXZDLHlCQUE0QjtBQUM1QiwyQkFBeUI7QUFDekIs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
