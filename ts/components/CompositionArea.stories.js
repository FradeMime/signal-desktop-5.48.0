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
var CompositionArea_stories_exports = {};
__export(CompositionArea_stories_exports, {
  AnnouncementsOnlyGroup: () => AnnouncementsOnlyGroup,
  Attachments: () => Attachments,
  Default: () => Default,
  MessageRequest: () => MessageRequest,
  Quote: () => Quote,
  SmsOnly: () => SmsOnly,
  SmsOnlyFetchingUuid: () => SmsOnlyFetchingUuid,
  StartingText: () => StartingText,
  StickerButton: () => StickerButton,
  default: () => CompositionArea_stories_default
});
module.exports = __toCommonJS(CompositionArea_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_MIME = require("../types/MIME");
var import_CompositionArea = require("./CompositionArea");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
var import_fakeAttachment = require("../test-both/helpers/fakeAttachment");
var import_Fixtures = require("../storybook/Fixtures");
var import_audioRecorder = require("../state/ducks/audioRecorder");
var import_Colors = require("../types/Colors");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var CompositionArea_stories_default = {
  title: "Components/CompositionArea",
  decorators: [
    (storyFn) => /* @__PURE__ */ React.createElement("div", {
      className: "file-input"
    }, storyFn())
  ]
};
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  addAttachment: (0, import_addon_actions.action)("addAttachment"),
  addPendingAttachment: (0, import_addon_actions.action)("addPendingAttachment"),
  conversationId: "123",
  i18n,
  onSendMessage: (0, import_addon_actions.action)("onSendMessage"),
  processAttachments: (0, import_addon_actions.action)("processAttachments"),
  removeAttachment: (0, import_addon_actions.action)("removeAttachment"),
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
  draftAttachments: overrideProps.draftAttachments || [],
  onClearAttachments: (0, import_addon_actions.action)("onClearAttachments"),
  cancelRecording: (0, import_addon_actions.action)("cancelRecording"),
  completeRecording: (0, import_addon_actions.action)("completeRecording"),
  errorRecording: (0, import_addon_actions.action)("errorRecording"),
  recordingState: (0, import_addon_knobs.select)("recordingState", import_audioRecorder.RecordingState, overrideProps.recordingState || import_audioRecorder.RecordingState.Idle),
  startRecording: (0, import_addon_actions.action)("startRecording"),
  linkPreviewLoading: Boolean(overrideProps.linkPreviewLoading),
  linkPreviewResult: overrideProps.linkPreviewResult,
  onCloseLinkPreview: (0, import_addon_actions.action)("onCloseLinkPreview"),
  quotedMessageProps: overrideProps.quotedMessageProps,
  onClickQuotedMessage: (0, import_addon_actions.action)("onClickQuotedMessage"),
  setQuotedMessage: (0, import_addon_actions.action)("setQuotedMessage"),
  onSelectMediaQuality: (0, import_addon_actions.action)("onSelectMediaQuality"),
  shouldSendHighQualityAttachments: Boolean(overrideProps.shouldSendHighQualityAttachments),
  onEditorStateChange: (0, import_addon_actions.action)("onEditorStateChange"),
  onTextTooLong: (0, import_addon_actions.action)("onTextTooLong"),
  draftText: overrideProps.draftText || void 0,
  clearQuotedMessage: (0, import_addon_actions.action)("clearQuotedMessage"),
  getPreferredBadge: () => void 0,
  getQuotedMessage: (0, import_addon_actions.action)("getQuotedMessage"),
  sortedGroupMembers: [],
  onPickEmoji: (0, import_addon_actions.action)("onPickEmoji"),
  onSetSkinTone: (0, import_addon_actions.action)("onSetSkinTone"),
  recentEmojis: [],
  skinTone: 1,
  knownPacks: overrideProps.knownPacks || [],
  receivedPacks: [],
  installedPacks: [],
  blessedPacks: [],
  recentStickers: [],
  clearInstalledStickerPack: (0, import_addon_actions.action)("clearInstalledStickerPack"),
  onClickAddPack: (0, import_addon_actions.action)("onClickAddPack"),
  onPickSticker: (0, import_addon_actions.action)("onPickSticker"),
  clearShowIntroduction: (0, import_addon_actions.action)("clearShowIntroduction"),
  showPickerHint: false,
  clearShowPickerHint: (0, import_addon_actions.action)("clearShowPickerHint"),
  conversationType: "direct",
  onAccept: (0, import_addon_actions.action)("onAccept"),
  onBlock: (0, import_addon_actions.action)("onBlock"),
  onBlockAndReportSpam: (0, import_addon_actions.action)("onBlockAndReportSpam"),
  onDelete: (0, import_addon_actions.action)("onDelete"),
  onUnblock: (0, import_addon_actions.action)("onUnblock"),
  messageRequestsEnabled: (0, import_addon_knobs.boolean)("messageRequestsEnabled", overrideProps.messageRequestsEnabled || false),
  title: "",
  onStartGroupMigration: (0, import_addon_actions.action)("onStartGroupMigration"),
  announcementsOnly: (0, import_addon_knobs.boolean)("announcementsOnly", Boolean(overrideProps.announcementsOnly)),
  areWeAdmin: (0, import_addon_knobs.boolean)("areWeAdmin", Boolean(overrideProps.areWeAdmin)),
  groupAdmins: [],
  openConversation: (0, import_addon_actions.action)("openConversation"),
  onCancelJoinRequest: (0, import_addon_actions.action)("onCancelJoinRequest"),
  isSMSOnly: overrideProps.isSMSOnly || false,
  isFetchingUUID: overrideProps.isFetchingUUID || false
}), "useProps");
const Default = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "Default");
const StartingText = /* @__PURE__ */ __name(() => {
  const props = useProps({
    draftText: "here's some starting text"
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "StartingText");
const StickerButton = /* @__PURE__ */ __name(() => {
  const props = useProps({
    knownPacks: [{}]
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "StickerButton");
const MessageRequest = /* @__PURE__ */ __name(() => {
  const props = useProps({
    messageRequestsEnabled: true
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "MessageRequest");
const SmsOnlyFetchingUuid = /* @__PURE__ */ __name(() => {
  const props = useProps({
    isSMSOnly: true,
    isFetchingUUID: true
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "SmsOnlyFetchingUuid");
SmsOnlyFetchingUuid.story = {
  name: "SMS-only fetching UUID"
};
const SmsOnly = /* @__PURE__ */ __name(() => {
  const props = useProps({
    isSMSOnly: true
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "SmsOnly");
SmsOnly.story = {
  name: "SMS-only"
};
const Attachments = /* @__PURE__ */ __name(() => {
  const props = useProps({
    draftAttachments: [
      (0, import_fakeAttachment.fakeDraftAttachment)({
        contentType: import_MIME.IMAGE_JPEG,
        url: import_Fixtures.landscapeGreenUrl
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
    ...props
  });
}, "Attachments");
const AnnouncementsOnlyGroup = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
  ...useProps({
    announcementsOnly: true,
    areWeAdmin: false
  })
}), "AnnouncementsOnlyGroup");
AnnouncementsOnlyGroup.story = {
  name: "Announcements Only group"
};
const Quote = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CompositionArea.CompositionArea, {
  ...useProps({
    quotedMessageProps: {
      text: "something",
      conversationColor: import_Colors.ConversationColors[10],
      isGiftBadge: false,
      isViewOnce: false,
      referencedMessageNotFound: false,
      authorTitle: "Someone",
      isFromMe: false
    }
  })
}), "Quote");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AnnouncementsOnlyGroup,
  Attachments,
  Default,
  MessageRequest,
  Quote,
  SmsOnly,
  SmsOnlyFetchingUuid,
  StartingText,
  StickerButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25BcmVhLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBEZWNvcmF0b3JGdW5jdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb25zJztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IGJvb2xlYW4sIHNlbGVjdCB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgeyBJTUFHRV9KUEVHIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIH0gZnJvbSAnLi9Db21wb3NpdGlvbkFyZWEnO1xuaW1wb3J0IHsgQ29tcG9zaXRpb25BcmVhIH0gZnJvbSAnLi9Db21wb3NpdGlvbkFyZWEnO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBTdG9yeWJvb2tUaGVtZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uc3Rvcnlib29rL1N0b3J5Ym9va1RoZW1lQ29udGV4dCc7XG5cbmltcG9ydCB7IGZha2VEcmFmdEF0dGFjaG1lbnQgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlQXR0YWNobWVudCc7XG5pbXBvcnQgeyBsYW5kc2NhcGVHcmVlblVybCB9IGZyb20gJy4uL3N0b3J5Ym9vay9GaXh0dXJlcyc7XG5pbXBvcnQgeyBSZWNvcmRpbmdTdGF0ZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2F1ZGlvUmVjb3JkZXInO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uQ29sb3JzIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29tcG9zaXRpb25BcmVhJyxcbiAgZGVjb3JhdG9yczogW1xuICAgIC8vIG5lY2Vzc2FyeSBmb3IgdGhlIGFkZCBhdHRhY2htZW50IGJ1dHRvbiB0byByZW5kZXIgcHJvcGVybHlcbiAgICBzdG9yeUZuID0+IDxkaXYgY2xhc3NOYW1lPVwiZmlsZS1pbnB1dFwiPntzdG9yeUZuKCl9PC9kaXY+LFxuICBdIGFzIEFycmF5PERlY29yYXRvckZ1bmN0aW9uPEpTWC5FbGVtZW50Pj4sXG59O1xuXG5jb25zdCB1c2VQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgYWRkQXR0YWNobWVudDogYWN0aW9uKCdhZGRBdHRhY2htZW50JyksXG4gIGFkZFBlbmRpbmdBdHRhY2htZW50OiBhY3Rpb24oJ2FkZFBlbmRpbmdBdHRhY2htZW50JyksXG4gIGNvbnZlcnNhdGlvbklkOiAnMTIzJyxcbiAgaTE4bixcbiAgb25TZW5kTWVzc2FnZTogYWN0aW9uKCdvblNlbmRNZXNzYWdlJyksXG4gIHByb2Nlc3NBdHRhY2htZW50czogYWN0aW9uKCdwcm9jZXNzQXR0YWNobWVudHMnKSxcbiAgcmVtb3ZlQXR0YWNobWVudDogYWN0aW9uKCdyZW1vdmVBdHRhY2htZW50JyksXG4gIHRoZW1lOiBSZWFjdC51c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCksXG5cbiAgLy8gQXR0YWNobWVudExpc3RcbiAgZHJhZnRBdHRhY2htZW50czogb3ZlcnJpZGVQcm9wcy5kcmFmdEF0dGFjaG1lbnRzIHx8IFtdLFxuICBvbkNsZWFyQXR0YWNobWVudHM6IGFjdGlvbignb25DbGVhckF0dGFjaG1lbnRzJyksXG4gIC8vIEF1ZGlvQ2FwdHVyZVxuICBjYW5jZWxSZWNvcmRpbmc6IGFjdGlvbignY2FuY2VsUmVjb3JkaW5nJyksXG4gIGNvbXBsZXRlUmVjb3JkaW5nOiBhY3Rpb24oJ2NvbXBsZXRlUmVjb3JkaW5nJyksXG4gIGVycm9yUmVjb3JkaW5nOiBhY3Rpb24oJ2Vycm9yUmVjb3JkaW5nJyksXG4gIHJlY29yZGluZ1N0YXRlOiBzZWxlY3QoXG4gICAgJ3JlY29yZGluZ1N0YXRlJyxcbiAgICBSZWNvcmRpbmdTdGF0ZSxcbiAgICBvdmVycmlkZVByb3BzLnJlY29yZGluZ1N0YXRlIHx8IFJlY29yZGluZ1N0YXRlLklkbGVcbiAgKSxcbiAgc3RhcnRSZWNvcmRpbmc6IGFjdGlvbignc3RhcnRSZWNvcmRpbmcnKSxcbiAgLy8gU3RhZ2VkTGlua1ByZXZpZXdcbiAgbGlua1ByZXZpZXdMb2FkaW5nOiBCb29sZWFuKG92ZXJyaWRlUHJvcHMubGlua1ByZXZpZXdMb2FkaW5nKSxcbiAgbGlua1ByZXZpZXdSZXN1bHQ6IG92ZXJyaWRlUHJvcHMubGlua1ByZXZpZXdSZXN1bHQsXG4gIG9uQ2xvc2VMaW5rUHJldmlldzogYWN0aW9uKCdvbkNsb3NlTGlua1ByZXZpZXcnKSxcbiAgLy8gUXVvdGVcbiAgcXVvdGVkTWVzc2FnZVByb3BzOiBvdmVycmlkZVByb3BzLnF1b3RlZE1lc3NhZ2VQcm9wcyxcbiAgb25DbGlja1F1b3RlZE1lc3NhZ2U6IGFjdGlvbignb25DbGlja1F1b3RlZE1lc3NhZ2UnKSxcbiAgc2V0UXVvdGVkTWVzc2FnZTogYWN0aW9uKCdzZXRRdW90ZWRNZXNzYWdlJyksXG4gIC8vIE1lZGlhUXVhbGl0eVNlbGVjdG9yXG4gIG9uU2VsZWN0TWVkaWFRdWFsaXR5OiBhY3Rpb24oJ29uU2VsZWN0TWVkaWFRdWFsaXR5JyksXG4gIHNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzOiBCb29sZWFuKFxuICAgIG92ZXJyaWRlUHJvcHMuc2hvdWxkU2VuZEhpZ2hRdWFsaXR5QXR0YWNobWVudHNcbiAgKSxcbiAgLy8gQ29tcG9zaXRpb25JbnB1dFxuICBvbkVkaXRvclN0YXRlQ2hhbmdlOiBhY3Rpb24oJ29uRWRpdG9yU3RhdGVDaGFuZ2UnKSxcbiAgb25UZXh0VG9vTG9uZzogYWN0aW9uKCdvblRleHRUb29Mb25nJyksXG4gIGRyYWZ0VGV4dDogb3ZlcnJpZGVQcm9wcy5kcmFmdFRleHQgfHwgdW5kZWZpbmVkLFxuICBjbGVhclF1b3RlZE1lc3NhZ2U6IGFjdGlvbignY2xlYXJRdW90ZWRNZXNzYWdlJyksXG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGdldFF1b3RlZE1lc3NhZ2U6IGFjdGlvbignZ2V0UXVvdGVkTWVzc2FnZScpLFxuICBzb3J0ZWRHcm91cE1lbWJlcnM6IFtdLFxuICAvLyBFbW9qaUJ1dHRvblxuICBvblBpY2tFbW9qaTogYWN0aW9uKCdvblBpY2tFbW9qaScpLFxuICBvblNldFNraW5Ub25lOiBhY3Rpb24oJ29uU2V0U2tpblRvbmUnKSxcbiAgcmVjZW50RW1vamlzOiBbXSxcbiAgc2tpblRvbmU6IDEsXG4gIC8vIFN0aWNrZXJCdXR0b25cbiAga25vd25QYWNrczogb3ZlcnJpZGVQcm9wcy5rbm93blBhY2tzIHx8IFtdLFxuICByZWNlaXZlZFBhY2tzOiBbXSxcbiAgaW5zdGFsbGVkUGFja3M6IFtdLFxuICBibGVzc2VkUGFja3M6IFtdLFxuICByZWNlbnRTdGlja2VyczogW10sXG4gIGNsZWFySW5zdGFsbGVkU3RpY2tlclBhY2s6IGFjdGlvbignY2xlYXJJbnN0YWxsZWRTdGlja2VyUGFjaycpLFxuICBvbkNsaWNrQWRkUGFjazogYWN0aW9uKCdvbkNsaWNrQWRkUGFjaycpLFxuICBvblBpY2tTdGlja2VyOiBhY3Rpb24oJ29uUGlja1N0aWNrZXInKSxcbiAgY2xlYXJTaG93SW50cm9kdWN0aW9uOiBhY3Rpb24oJ2NsZWFyU2hvd0ludHJvZHVjdGlvbicpLFxuICBzaG93UGlja2VySGludDogZmFsc2UsXG4gIGNsZWFyU2hvd1BpY2tlckhpbnQ6IGFjdGlvbignY2xlYXJTaG93UGlja2VySGludCcpLFxuICAvLyBNZXNzYWdlIFJlcXVlc3RzXG4gIGNvbnZlcnNhdGlvblR5cGU6ICdkaXJlY3QnLFxuICBvbkFjY2VwdDogYWN0aW9uKCdvbkFjY2VwdCcpLFxuICBvbkJsb2NrOiBhY3Rpb24oJ29uQmxvY2snKSxcbiAgb25CbG9ja0FuZFJlcG9ydFNwYW06IGFjdGlvbignb25CbG9ja0FuZFJlcG9ydFNwYW0nKSxcbiAgb25EZWxldGU6IGFjdGlvbignb25EZWxldGUnKSxcbiAgb25VbmJsb2NrOiBhY3Rpb24oJ29uVW5ibG9jaycpLFxuICBtZXNzYWdlUmVxdWVzdHNFbmFibGVkOiBib29sZWFuKFxuICAgICdtZXNzYWdlUmVxdWVzdHNFbmFibGVkJyxcbiAgICBvdmVycmlkZVByb3BzLm1lc3NhZ2VSZXF1ZXN0c0VuYWJsZWQgfHwgZmFsc2VcbiAgKSxcbiAgdGl0bGU6ICcnLFxuICAvLyBHcm91cFYxIERpc2FibGVkIEFjdGlvbnNcbiAgb25TdGFydEdyb3VwTWlncmF0aW9uOiBhY3Rpb24oJ29uU3RhcnRHcm91cE1pZ3JhdGlvbicpLFxuICAvLyBHcm91cFYyXG4gIGFubm91bmNlbWVudHNPbmx5OiBib29sZWFuKFxuICAgICdhbm5vdW5jZW1lbnRzT25seScsXG4gICAgQm9vbGVhbihvdmVycmlkZVByb3BzLmFubm91bmNlbWVudHNPbmx5KVxuICApLFxuICBhcmVXZUFkbWluOiBib29sZWFuKCdhcmVXZUFkbWluJywgQm9vbGVhbihvdmVycmlkZVByb3BzLmFyZVdlQWRtaW4pKSxcbiAgZ3JvdXBBZG1pbnM6IFtdLFxuICBvcGVuQ29udmVyc2F0aW9uOiBhY3Rpb24oJ29wZW5Db252ZXJzYXRpb24nKSxcbiAgb25DYW5jZWxKb2luUmVxdWVzdDogYWN0aW9uKCdvbkNhbmNlbEpvaW5SZXF1ZXN0JyksXG4gIC8vIFNNUy1vbmx5XG4gIGlzU01TT25seTogb3ZlcnJpZGVQcm9wcy5pc1NNU09ubHkgfHwgZmFsc2UsXG4gIGlzRmV0Y2hpbmdVVUlEOiBvdmVycmlkZVByb3BzLmlzRmV0Y2hpbmdVVUlEIHx8IGZhbHNlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBEZWZhdWx0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcygpO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25BcmVhIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgU3RhcnRpbmdUZXh0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgZHJhZnRUZXh0OiBcImhlcmUncyBzb21lIHN0YXJ0aW5nIHRleHRcIixcbiAgfSk7XG5cbiAgcmV0dXJuIDxDb21wb3NpdGlvbkFyZWEgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBTdGlja2VyQnV0dG9uID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICBrbm93blBhY2tzOiBbe30gYXMgYW55XSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxDb21wb3NpdGlvbkFyZWEgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlUmVxdWVzdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIG1lc3NhZ2VSZXF1ZXN0c0VuYWJsZWQ6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25BcmVhIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgU21zT25seUZldGNoaW5nVXVpZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGlzU01TT25seTogdHJ1ZSxcbiAgICBpc0ZldGNoaW5nVVVJRDogdHJ1ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxDb21wb3NpdGlvbkFyZWEgey4uLnByb3BzfSAvPjtcbn07XG5cblNtc09ubHlGZXRjaGluZ1V1aWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdTTVMtb25seSBmZXRjaGluZyBVVUlEJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTbXNPbmx5ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7XG4gICAgaXNTTVNPbmx5OiB0cnVlLFxuICB9KTtcblxuICByZXR1cm4gPENvbXBvc2l0aW9uQXJlYSB7Li4ucHJvcHN9IC8+O1xufTtcblxuU21zT25seS5zdG9yeSA9IHtcbiAgbmFtZTogJ1NNUy1vbmx5Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBBdHRhY2htZW50cyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGRyYWZ0QXR0YWNobWVudHM6IFtcbiAgICAgIGZha2VEcmFmdEF0dGFjaG1lbnQoe1xuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgdXJsOiBsYW5kc2NhcGVHcmVlblVybCxcbiAgICAgIH0pLFxuICAgIF0sXG4gIH0pO1xuXG4gIHJldHVybiA8Q29tcG9zaXRpb25BcmVhIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgQW5ub3VuY2VtZW50c09ubHlHcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDb21wb3NpdGlvbkFyZWFcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgYW5ub3VuY2VtZW50c09ubHk6IHRydWUsXG4gICAgICBhcmVXZUFkbWluOiBmYWxzZSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkFubm91bmNlbWVudHNPbmx5R3JvdXAuc3RvcnkgPSB7XG4gIG5hbWU6ICdBbm5vdW5jZW1lbnRzIE9ubHkgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IFF1b3RlID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENvbXBvc2l0aW9uQXJlYVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBxdW90ZWRNZXNzYWdlUHJvcHM6IHtcbiAgICAgICAgdGV4dDogJ3NvbWV0aGluZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbG9yOiBDb252ZXJzYXRpb25Db2xvcnNbMTBdLFxuICAgICAgICBpc0dpZnRCYWRnZTogZmFsc2UsXG4gICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgYXV0aG9yVGl0bGU6ICdTb21lb25lJyxcbiAgICAgICAgaXNGcm9tTWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsWUFBdUI7QUFFdkIsMkJBQXVCO0FBQ3ZCLHlCQUFnQztBQUVoQyxrQkFBMkI7QUFFM0IsNkJBQWdDO0FBQ2hDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsbUNBQXNDO0FBRXRDLDRCQUFvQztBQUNwQyxzQkFBa0M7QUFDbEMsMkJBQStCO0FBQy9CLG9CQUFtQztBQUVuQyxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLGtDQUFRO0FBQUEsRUFDYixPQUFPO0FBQUEsRUFDUCxZQUFZO0FBQUEsSUFFVixhQUFXLG9DQUFDO0FBQUEsTUFBSSxXQUFVO0FBQUEsT0FBYyxRQUFRLENBQUU7QUFBQSxFQUNwRDtBQUNGO0FBRUEsTUFBTSxXQUFXLHdCQUFDLGdCQUFnQyxDQUFDLE1BQWM7QUFBQSxFQUMvRCxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQyxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsRUFDbkQsZ0JBQWdCO0FBQUEsRUFDaEI7QUFBQSxF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
