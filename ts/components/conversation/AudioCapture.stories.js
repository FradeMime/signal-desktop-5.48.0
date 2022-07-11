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
var AudioCapture_stories_exports = {};
__export(AudioCapture_stories_exports, {
  Default: () => Default,
  SwitchedApps: () => SwitchedApps,
  VoiceLimit: () => VoiceLimit,
  _Initializing: () => _Initializing,
  _Recording: () => _Recording,
  default: () => AudioCapture_stories_default
});
module.exports = __toCommonJS(AudioCapture_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_audioRecorder = require("../../state/ducks/audioRecorder");
var import_AudioCapture = require("./AudioCapture");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var AudioCapture_stories_default = {
  title: "Components/Conversation/AudioCapture"
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  cancelRecording: (0, import_addon_actions.action)("cancelRecording"),
  completeRecording: (0, import_addon_actions.action)("completeRecording"),
  conversationId: "123",
  draftAttachments: [],
  errorDialogAudioRecorderType: overrideProps.errorDialogAudioRecorderType,
  errorRecording: (0, import_addon_actions.action)("errorRecording"),
  i18n,
  recordingState: (0, import_addon_knobs.select)("recordingState", import_audioRecorder.RecordingState, overrideProps.recordingState || import_audioRecorder.RecordingState.Idle),
  onSendAudioRecording: (0, import_addon_actions.action)("onSendAudioRecording"),
  startRecording: (0, import_addon_actions.action)("startRecording")
}), "createProps");
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_AudioCapture.AudioCapture, {
    ...createProps()
  });
}, "Default");
const _Initializing = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_AudioCapture.AudioCapture, {
    ...createProps({
      recordingState: import_audioRecorder.RecordingState.Initializing
    })
  });
}, "_Initializing");
const _Recording = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_AudioCapture.AudioCapture, {
    ...createProps({
      recordingState: import_audioRecorder.RecordingState.Recording
    })
  });
}, "_Recording");
const VoiceLimit = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_AudioCapture.AudioCapture, {
    ...createProps({
      errorDialogAudioRecorderType: import_audioRecorder.ErrorDialogAudioRecorderType.Timeout,
      recordingState: import_audioRecorder.RecordingState.Recording
    })
  });
}, "VoiceLimit");
const SwitchedApps = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_AudioCapture.AudioCapture, {
    ...createProps({
      errorDialogAudioRecorderType: import_audioRecorder.ErrorDialogAudioRecorderType.Blur,
      recordingState: import_audioRecorder.RecordingState.Recording
    })
  });
}, "SwitchedApps");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  SwitchedApps,
  VoiceLimit,
  _Initializing,
  _Recording
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXVkaW9DYXB0dXJlLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQge1xuICBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLFxuICBSZWNvcmRpbmdTdGF0ZSxcbn0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvYXVkaW9SZWNvcmRlcic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQXVkaW9DYXB0dXJlJztcbmltcG9ydCB7IEF1ZGlvQ2FwdHVyZSB9IGZyb20gJy4vQXVkaW9DYXB0dXJlJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb24vQXVkaW9DYXB0dXJlJyxcbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+ICh7XG4gIGNhbmNlbFJlY29yZGluZzogYWN0aW9uKCdjYW5jZWxSZWNvcmRpbmcnKSxcbiAgY29tcGxldGVSZWNvcmRpbmc6IGFjdGlvbignY29tcGxldGVSZWNvcmRpbmcnKSxcbiAgY29udmVyc2F0aW9uSWQ6ICcxMjMnLFxuICBkcmFmdEF0dGFjaG1lbnRzOiBbXSxcbiAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTogb3ZlcnJpZGVQcm9wcy5lcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlLFxuICBlcnJvclJlY29yZGluZzogYWN0aW9uKCdlcnJvclJlY29yZGluZycpLFxuICBpMThuLFxuICByZWNvcmRpbmdTdGF0ZTogc2VsZWN0KFxuICAgICdyZWNvcmRpbmdTdGF0ZScsXG4gICAgUmVjb3JkaW5nU3RhdGUsXG4gICAgb3ZlcnJpZGVQcm9wcy5yZWNvcmRpbmdTdGF0ZSB8fCBSZWNvcmRpbmdTdGF0ZS5JZGxlXG4gICksXG4gIG9uU2VuZEF1ZGlvUmVjb3JkaW5nOiBhY3Rpb24oJ29uU2VuZEF1ZGlvUmVjb3JkaW5nJyksXG4gIHN0YXJ0UmVjb3JkaW5nOiBhY3Rpb24oJ3N0YXJ0UmVjb3JkaW5nJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IERlZmF1bHQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gPEF1ZGlvQ2FwdHVyZSB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuXG5leHBvcnQgY29uc3QgX0luaXRpYWxpemluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEF1ZGlvQ2FwdHVyZVxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgcmVjb3JkaW5nU3RhdGU6IFJlY29yZGluZ1N0YXRlLkluaXRpYWxpemluZyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgX1JlY29yZGluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEF1ZGlvQ2FwdHVyZVxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgcmVjb3JkaW5nU3RhdGU6IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5leHBvcnQgY29uc3QgVm9pY2VMaW1pdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPEF1ZGlvQ2FwdHVyZVxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZTogRXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZS5UaW1lb3V0LFxuICAgICAgICByZWNvcmRpbmdTdGF0ZTogUmVjb3JkaW5nU3RhdGUuUmVjb3JkaW5nLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBTd2l0Y2hlZEFwcHMgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxBdWRpb0NhcHR1cmVcbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGU6IEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUuQmx1cixcbiAgICAgICAgcmVjb3JkaW5nU3RhdGU6IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZyxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUV2QiwyQkFBdUI7QUFDdkIseUJBQXVCO0FBRXZCLDJCQUdPO0FBRVAsMEJBQTZCO0FBQzdCLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFFdkIsTUFBTSxPQUFPLGdDQUFVLE1BQU0sdUJBQVU7QUFFdkMsSUFBTywrQkFBUTtBQUFBLEVBQ2IsT0FBTztBQUNUO0FBRUEsTUFBTSxjQUFjLHdCQUFDLGdCQUFvQyxDQUFDLE1BQWtCO0FBQUEsRUFDMUUsaUJBQWlCLGlDQUFPLGlCQUFpQjtBQUFBLEVBQ3pDLG1CQUFtQixpQ0FBTyxtQkFBbUI7QUFBQSxFQUM3QyxnQkFBZ0I7QUFBQSxFQUNoQixrQkFBa0IsQ0FBQztBQUFBLEVBQ25CLDhCQUE4QixjQUFjO0FBQUEsRUFDNUMsZ0JBQWdCLGlDQUFPLGdCQUFnQjtBQUFBLEVBQ3ZDO0FBQUEsRUFDQSxnQkFBZ0IsK0JBQ2Qsa0JBQ0EscUNBQ0EsY0FBYyxrQkFBa0Isb0NBQWUsSUFDakQ7QUFBQSxFQUNBLHNCQUFzQixpQ0FBTyxzQkFBc0I7QUFBQSxFQUNuRCxnQkFBZ0IsaUNBQU8sZ0JBQWdCO0FBQ3pDLElBZm9CO0FBaUJiLE1BQU0sVUFBVSw2QkFBbUI7QUFDeEMsU0FBTyxvQ0FBQztBQUFBLE9BQWlCLFlBQVk7QUFBQSxHQUFHO0FBQzFDLEdBRnVCO0FBSWhCLE1BQU0sZ0JBQWdCLDZCQUFtQjtBQUM5QyxTQUNFLG9DQUFDO0FBQUEsT0FDSyxZQUFZO0FBQUEsTUFDZCxnQkFBZ0Isb0NBQWU7QUFBQSxJQUNqQyxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBUjZCO0FBVXRCLE1BQU0sYUFBYSw2QkFBbUI7QUFDM0MsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2QsZ0JBQWdCLG9DQUFlO0FBQUEsSUFDakMsQ0FBQztBQUFBLEdBQ0g7QUFFSixHQVIwQjtBQVVuQixNQUFNLGFBQWEsNkJBQW1CO0FBQzNDLFNBQ0Usb0NBQUM7QUFBQSxPQUNLLFlBQVk7QUFBQSxNQUNkLDhCQUE4QixrREFBNkI7QUFBQSxNQUMzRCxnQkFBZ0Isb0NBQWU7QUFBQSxJQUNqQyxDQUFDO0FBQUEsR0FDSDtBQUVKLEdBVDBCO0FBV25CLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssWUFBWTtBQUFBLE1BQ2QsOEJBQThCLGtEQUE2QjtBQUFBLE1BQzNELGdCQUFnQixvQ0FBZTtBQUFBLElBQ2pDLENBQUM7QUFBQSxHQUNIO0FBRUosR0FUNEI7IiwKICAibmFtZXMiOiBbXQp9Cg==
