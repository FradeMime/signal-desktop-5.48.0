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
var CompositionArea_exports = {};
__export(CompositionArea_exports, {
  CompositionArea: () => CompositionArea
});
module.exports = __toCommonJS(CompositionArea_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_audioRecorder = require("../state/ducks/audioRecorder");
var import_Spinner = require("./Spinner");
var import_EmojiButton = require("./emoji/EmojiButton");
var import_StickerButton = require("./stickers/StickerButton");
var import_CompositionInput = require("./CompositionInput");
var import_MessageRequestActions = require("./conversation/MessageRequestActions");
var import_GroupV1DisabledActions = require("./conversation/GroupV1DisabledActions");
var import_GroupV2PendingApprovalActions = require("./conversation/GroupV2PendingApprovalActions");
var import_AnnouncementsOnlyGroupBanner = require("./AnnouncementsOnlyGroupBanner");
var import_AttachmentList = require("./conversation/AttachmentList");
var import_Attachment = require("../types/Attachment");
var import_AudioCapture = require("./conversation/AudioCapture");
var import_CompositionUpload = require("./CompositionUpload");
var import_MandatoryProfileSharingActions = require("./conversation/MandatoryProfileSharingActions");
var import_MediaQualitySelector = require("./MediaQualitySelector");
var import_Quote = require("./conversation/Quote");
var import_StagedLinkPreview = require("./conversation/StagedLinkPreview");
var import_lib = require("./stickers/lib");
var import_useKeyboardShortcuts = require("../hooks/useKeyboardShortcuts");
var import_MediaEditor = require("./MediaEditor");
var import_MIME = require("../types/MIME");
var import_GoogleChrome = require("../util/GoogleChrome");
var KeyboardLayout = __toESM(require("../services/keyboardLayout"));
const CompositionArea = /* @__PURE__ */ __name(({
  addAttachment,
  addPendingAttachment,
  conversationId,
  i18n,
  onSendMessage,
  processAttachments,
  removeAttachment,
  theme,
  draftAttachments,
  onClearAttachments,
  cancelRecording,
  completeRecording,
  errorDialogAudioRecorderType,
  errorRecording,
  recordingState,
  startRecording,
  linkPreviewLoading,
  linkPreviewResult,
  onCloseLinkPreview,
  quotedMessageProps,
  onClickQuotedMessage,
  setQuotedMessage,
  onSelectMediaQuality,
  shouldSendHighQualityAttachments,
  compositionApi,
  onEditorStateChange,
  onTextTooLong,
  draftText,
  draftBodyRanges,
  clearQuotedMessage,
  getPreferredBadge,
  getQuotedMessage,
  sortedGroupMembers,
  onPickEmoji,
  onSetSkinTone,
  recentEmojis,
  skinTone,
  knownPacks,
  receivedPacks,
  installedPack,
  installedPacks,
  blessedPacks,
  recentStickers,
  clearInstalledStickerPack,
  onClickAddPack,
  onPickSticker,
  clearShowIntroduction,
  showPickerHint,
  clearShowPickerHint,
  acceptedMessageRequest,
  areWePending,
  areWePendingApproval,
  conversationType,
  groupVersion,
  isBlocked,
  isMissingMandatoryProfileSharing,
  left,
  messageRequestsEnabled,
  onAccept,
  onBlock,
  onBlockAndReportSpam,
  onDelete,
  onUnblock,
  title,
  isGroupV1AndDisabled,
  onStartGroupMigration,
  announcementsOnly,
  areWeAdmin,
  groupAdmins,
  onCancelJoinRequest,
  openConversation,
  isSMSOnly,
  isFetchingUUID
}) => {
  const [disabled, setDisabled] = (0, import_react.useState)(false);
  const [dirty, setDirty] = (0, import_react.useState)(false);
  const [large, setLarge] = (0, import_react.useState)(false);
  const [attachmentToEdit, setAttachmentToEdit] = (0, import_react.useState)();
  const inputApiRef = (0, import_react.useRef)();
  const fileInputRef = (0, import_react.useRef)(null);
  const handleForceSend = (0, import_react.useCallback)(() => {
    setLarge(false);
    if (inputApiRef.current) {
      inputApiRef.current.submit();
    }
  }, [inputApiRef, setLarge]);
  const handleSubmit = (0, import_react.useCallback)((message, mentions, timestamp) => {
    onSendMessage({
      draftAttachments,
      mentions,
      message,
      timestamp
    });
    setLarge(false);
  }, [draftAttachments, onSendMessage, setLarge]);
  const launchAttachmentPicker = (0, import_react.useCallback)(() => {
    const fileInput = fileInputRef.current;
    if (fileInput) {
      fileInput.value = "";
      fileInput.click();
    }
  }, []);
  function maybeEditAttachment(attachment) {
    if (!(0, import_GoogleChrome.isImageTypeSupported)(attachment.contentType)) {
      return;
    }
    setAttachmentToEdit(attachment);
  }
  const attachFileShortcut = (0, import_useKeyboardShortcuts.useAttachFileShortcut)(launchAttachmentPicker);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)(attachFileShortcut);
  const focusInput = (0, import_react.useCallback)(() => {
    if (inputApiRef.current) {
      inputApiRef.current.focus();
    }
  }, [inputApiRef]);
  const withStickers = (0, import_lib.countStickers)({
    knownPacks,
    blessedPacks,
    installedPacks,
    receivedPacks
  }) > 0;
  if (compositionApi) {
    compositionApi.current = {
      isDirty: () => dirty,
      focusInput,
      setDisabled,
      reset: () => {
        if (inputApiRef.current) {
          inputApiRef.current.reset();
        }
      },
      resetEmojiResults: () => {
        if (inputApiRef.current) {
          inputApiRef.current.resetEmojiResults();
        }
      }
    };
  }
  const insertEmoji = (0, import_react.useCallback)((e) => {
    if (inputApiRef.current) {
      inputApiRef.current.insertEmoji(e);
      onPickEmoji(e);
    }
  }, [inputApiRef, onPickEmoji]);
  const handleToggleLarge = (0, import_react.useCallback)(() => {
    setLarge((l) => !l);
  }, [setLarge]);
  const shouldShowMicrophone = !large && !draftAttachments.length && !draftText;
  const showMediaQualitySelector = draftAttachments.some(import_Attachment.isImageAttachment);
  const leftHandSideButtonsFragment = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement(import_EmojiButton.EmojiButton, {
    i18n,
    doSend: handleForceSend,
    onPickEmoji: insertEmoji,
    onClose: focusInput,
    recentEmojis,
    skinTone,
    onSetSkinTone
  })), showMediaQualitySelector ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement(import_MediaQualitySelector.MediaQualitySelector, {
    i18n,
    isHighQuality: shouldSendHighQualityAttachments,
    onSelectQuality: onSelectMediaQuality
  })) : null);
  const micButtonFragment = shouldShowMicrophone ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement(import_AudioCapture.AudioCapture, {
    cancelRecording,
    completeRecording,
    conversationId,
    draftAttachments,
    errorDialogAudioRecorderType,
    errorRecording,
    i18n,
    recordingState,
    onSendAudioRecording: (voiceNoteAttachment) => {
      onSendMessage({ voiceNoteAttachment });
    },
    startRecording
  })) : null;
  const isRecording = recordingState === import_audioRecorder.RecordingState.Recording;
  const attButton = linkPreviewResult || isRecording ? void 0 : /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "CompositionArea__attach-file",
    onClick: launchAttachmentPicker,
    "aria-label": i18n("CompositionArea--attach-file")
  }));
  const sendButtonFragment = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__placeholder"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: "CompositionArea__send-button",
    onClick: handleForceSend,
    "aria-label": i18n("sendMessageToContact")
  })));
  const stickerButtonPlacement = large ? "top-start" : "top-end";
  const stickerButtonFragment = withStickers ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__button-cell"
  }, /* @__PURE__ */ import_react.default.createElement(import_StickerButton.StickerButton, {
    i18n,
    knownPacks,
    receivedPacks,
    installedPack,
    installedPacks,
    blessedPacks,
    recentStickers,
    clearInstalledStickerPack,
    onClickAddPack,
    onPickSticker,
    clearShowIntroduction,
    showPickerHint,
    clearShowPickerHint,
    position: stickerButtonPlacement
  })) : null;
  (0, import_react.useEffect)(() => {
    const handler = /* @__PURE__ */ __name((e) => {
      const { shiftKey, ctrlKey, metaKey } = e;
      const key = KeyboardLayout.lookup(e);
      const xKey = key === "x" || key === "X";
      const commandKey = (0, import_lodash.get)(window, "platform") === "darwin" && metaKey;
      const controlKey = (0, import_lodash.get)(window, "platform") !== "darwin" && ctrlKey;
      const commandOrCtrl = commandKey || controlKey;
      if (xKey && shiftKey && commandOrCtrl) {
        e.preventDefault();
        setLarge((x) => !x);
      }
    }, "handler");
    document.addEventListener("keydown", handler);
    return () => {
      document.removeEventListener("keydown", handler);
    };
  }, [setLarge]);
  if (isBlocked || areWePending || messageRequestsEnabled && !acceptedMessageRequest) {
    return /* @__PURE__ */ import_react.default.createElement(import_MessageRequestActions.MessageRequestActions, {
      i18n,
      conversationType,
      isBlocked,
      onBlock,
      onBlockAndReportSpam,
      onUnblock,
      onDelete,
      onAccept,
      title
    });
  }
  if (conversationType === "direct" && isSMSOnly) {
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)([
        "CompositionArea",
        "CompositionArea--sms-only",
        isFetchingUUID ? "CompositionArea--pending" : null
      ])
    }, isFetchingUUID ? /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      ariaLabel: i18n("CompositionArea--sms-only__spinner-label"),
      role: "presentation",
      moduleClassName: "module-image-spinner",
      svgSize: "small"
    }) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("h2", {
      className: "CompositionArea--sms-only__title"
    }, i18n("CompositionArea--sms-only__title")), /* @__PURE__ */ import_react.default.createElement("p", {
      className: "CompositionArea--sms-only__body"
    }, i18n("CompositionArea--sms-only__body"))));
  }
  if (!left && (conversationType === "direct" || conversationType === "group" && groupVersion === 1) && isMissingMandatoryProfileSharing) {
    return /* @__PURE__ */ import_react.default.createElement(import_MandatoryProfileSharingActions.MandatoryProfileSharingActions, {
      i18n,
      conversationType,
      onBlock,
      onBlockAndReportSpam,
      onDelete,
      onAccept,
      title
    });
  }
  if (!left && isGroupV1AndDisabled) {
    return /* @__PURE__ */ import_react.default.createElement(import_GroupV1DisabledActions.GroupV1DisabledActions, {
      i18n,
      onStartGroupMigration
    });
  }
  if (areWePendingApproval) {
    return /* @__PURE__ */ import_react.default.createElement(import_GroupV2PendingApprovalActions.GroupV2PendingApprovalActions, {
      i18n,
      onCancelJoinRequest
    });
  }
  if (announcementsOnly && !areWeAdmin) {
    return /* @__PURE__ */ import_react.default.createElement(import_AnnouncementsOnlyGroupBanner.AnnouncementsOnlyGroupBanner, {
      groupAdmins,
      i18n,
      openConversation,
      theme
    });
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea"
  }, attachmentToEdit && "url" in attachmentToEdit && attachmentToEdit.url && /* @__PURE__ */ import_react.default.createElement(import_MediaEditor.MediaEditor, {
    i18n,
    imageSrc: attachmentToEdit.url,
    onClose: () => setAttachmentToEdit(void 0),
    onDone: (data) => {
      const newAttachment = {
        ...attachmentToEdit,
        contentType: import_MIME.IMAGE_PNG,
        data,
        size: data.byteLength
      };
      addAttachment(conversationId, newAttachment);
      setAttachmentToEdit(void 0);
    },
    installedPacks,
    recentStickers
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__toggle-large"
  }, /* @__PURE__ */ import_react.default.createElement("button", {
    type: "button",
    className: (0, import_classnames.default)("CompositionArea__toggle-large__button", large ? "CompositionArea__toggle-large__button--large-active" : null),
    tabIndex: -1,
    onClick: handleToggleLarge,
    "aria-label": i18n("CompositionArea--expand")
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("CompositionArea__row", "CompositionArea__row--column")
  }, quotedMessageProps && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "quote-wrapper"
  }, /* @__PURE__ */ import_react.default.createElement(import_Quote.Quote, {
    isCompose: true,
    ...quotedMessageProps,
    i18n,
    onClick: onClickQuotedMessage,
    onClose: () => {
      setQuotedMessage(void 0);
      clearQuotedMessage?.();
    }
  })), linkPreviewLoading && linkPreviewResult && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "preview-wrapper"
  }, /* @__PURE__ */ import_react.default.createElement(import_StagedLinkPreview.StagedLinkPreview, {
    ...linkPreviewResult,
    i18n,
    onClose: onCloseLinkPreview
  })), draftAttachments.length ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: "CompositionArea__attachment-list"
  }, /* @__PURE__ */ import_react.default.createElement(import_AttachmentList.AttachmentList, {
    attachments: draftAttachments,
    canEditImages: true,
    i18n,
    onAddAttachment: launchAttachmentPicker,
    onClickAttachment: maybeEditAttachment,
    onClose: onClearAttachments,
    onCloseAttachment: (attachment) => {
      if (attachment.path) {
        removeAttachment(conversationId, attachment.path);
      }
    }
  })) : null), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("CompositionArea__row", large ? "CompositionArea__row--padded" : null)
  }, !large ? leftHandSideButtonsFragment : null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("CompositionArea__input", large ? "CompositionArea__input--padded" : null)
  }, /* @__PURE__ */ import_react.default.createElement(import_CompositionInput.CompositionInput, {
    clearQuotedMessage,
    disabled,
    draftBodyRanges,
    draftText,
    getPreferredBadge,
    getQuotedMessage,
    i18n,
    inputApi: inputApiRef,
    large,
    onDirtyChange: setDirty,
    onEditorStateChange,
    onPickEmoji,
    onSubmit: handleSubmit,
    onTextTooLong,
    skinTone,
    sortedGroupMembers,
    theme
  })), !large ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, stickerButtonFragment, !dirty ? micButtonFragment : null, attButton) : null), large ? /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("CompositionArea__row", "CompositionArea__row--control-row")
  }, leftHandSideButtonsFragment, stickerButtonFragment, attButton, !dirty ? micButtonFragment : null, dirty || !shouldShowMicrophone ? sendButtonFragment : null) : null, /* @__PURE__ */ import_react.default.createElement(import_CompositionUpload.CompositionUpload, {
    addAttachment,
    addPendingAttachment,
    conversationId,
    draftAttachments,
    i18n,
    processAttachments,
    removeAttachment,
    ref: fileInputRef
  }));
}, "CompositionArea");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CompositionArea
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29tcG9zaXRpb25BcmVhLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTXV0YWJsZVJlZk9iamVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VDYWxsYmFjaywgdXNlRWZmZWN0LCB1c2VSZWYsIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgZ2V0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHR5cGUge1xuICBCb2R5UmFuZ2VUeXBlLFxuICBCb2R5UmFuZ2VzVHlwZSxcbiAgTG9jYWxpemVyVHlwZSxcbiAgVGhlbWVUeXBlLFxufSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB0eXBlIHsgRXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2F1ZGlvUmVjb3JkZXInO1xuaW1wb3J0IHsgUmVjb3JkaW5nU3RhdGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9hdWRpb1JlY29yZGVyJztcbmltcG9ydCB0eXBlIHsgSGFuZGxlQXR0YWNobWVudHNQcm9jZXNzaW5nQXJnc1R5cGUgfSBmcm9tICcuLi91dGlsL2hhbmRsZUF0dGFjaG1lbnRzUHJvY2Vzc2luZyc7XG5pbXBvcnQgeyBTcGlubmVyIH0gZnJvbSAnLi9TcGlubmVyJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgRW1vamlCdXR0b25Qcm9wcyB9IGZyb20gJy4vZW1vamkvRW1vamlCdXR0b24nO1xuaW1wb3J0IHsgRW1vamlCdXR0b24gfSBmcm9tICcuL2Vtb2ppL0Vtb2ppQnV0dG9uJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgYXMgU3RpY2tlckJ1dHRvblByb3BzIH0gZnJvbSAnLi9zdGlja2Vycy9TdGlja2VyQnV0dG9uJztcbmltcG9ydCB7IFN0aWNrZXJCdXR0b24gfSBmcm9tICcuL3N0aWNrZXJzL1N0aWNrZXJCdXR0b24nO1xuaW1wb3J0IHR5cGUge1xuICBJbnB1dEFwaSxcbiAgUHJvcHMgYXMgQ29tcG9zaXRpb25JbnB1dFByb3BzLFxufSBmcm9tICcuL0NvbXBvc2l0aW9uSW5wdXQnO1xuaW1wb3J0IHsgQ29tcG9zaXRpb25JbnB1dCB9IGZyb20gJy4vQ29tcG9zaXRpb25JbnB1dCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzIGFzIE1lc3NhZ2VSZXF1ZXN0QWN0aW9uc1Byb3BzIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vTWVzc2FnZVJlcXVlc3RBY3Rpb25zJztcbmltcG9ydCB7IE1lc3NhZ2VSZXF1ZXN0QWN0aW9ucyB9IGZyb20gJy4vY29udmVyc2F0aW9uL01lc3NhZ2VSZXF1ZXN0QWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBHcm91cFYxRGlzYWJsZWRBY3Rpb25zUHJvcHNUeXBlIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vR3JvdXBWMURpc2FibGVkQWN0aW9ucyc7XG5pbXBvcnQgeyBHcm91cFYxRGlzYWJsZWRBY3Rpb25zIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vR3JvdXBWMURpc2FibGVkQWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBHcm91cFYyUGVuZGluZ0FwcHJvdmFsQWN0aW9uc1Byb3BzVHlwZSB9IGZyb20gJy4vY29udmVyc2F0aW9uL0dyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zJztcbmltcG9ydCB7IEdyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vR3JvdXBWMlBlbmRpbmdBcHByb3ZhbEFjdGlvbnMnO1xuaW1wb3J0IHsgQW5ub3VuY2VtZW50c09ubHlHcm91cEJhbm5lciB9IGZyb20gJy4vQW5ub3VuY2VtZW50c09ubHlHcm91cEJhbm5lcic7XG5pbXBvcnQgeyBBdHRhY2htZW50TGlzdCB9IGZyb20gJy4vY29udmVyc2F0aW9uL0F0dGFjaG1lbnRMaXN0JztcbmltcG9ydCB0eXBlIHtcbiAgQXR0YWNobWVudERyYWZ0VHlwZSxcbiAgSW5NZW1vcnlBdHRhY2htZW50RHJhZnRUeXBlLFxufSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGlzSW1hZ2VBdHRhY2htZW50IH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBBdWRpb0NhcHR1cmUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9BdWRpb0NhcHR1cmUnO1xuaW1wb3J0IHsgQ29tcG9zaXRpb25VcGxvYWQgfSBmcm9tICcuL0NvbXBvc2l0aW9uVXBsb2FkJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBFbW9qaVBpY2tEYXRhVHlwZSB9IGZyb20gJy4vZW1vamkvRW1vamlQaWNrZXInO1xuaW1wb3J0IHR5cGUgeyBMaW5rUHJldmlld1R5cGUgfSBmcm9tICcuLi90eXBlcy9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5cbmltcG9ydCB7IE1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucyB9IGZyb20gJy4vY29udmVyc2F0aW9uL01hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9ucyc7XG5pbXBvcnQgeyBNZWRpYVF1YWxpdHlTZWxlY3RvciB9IGZyb20gJy4vTWVkaWFRdWFsaXR5U2VsZWN0b3InO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBRdW90ZVByb3BzIH0gZnJvbSAnLi9jb252ZXJzYXRpb24vUXVvdGUnO1xuaW1wb3J0IHsgUXVvdGUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbi9RdW90ZSc7XG5pbXBvcnQgeyBTdGFnZWRMaW5rUHJldmlldyB9IGZyb20gJy4vY29udmVyc2F0aW9uL1N0YWdlZExpbmtQcmV2aWV3JztcbmltcG9ydCB7IGNvdW50U3RpY2tlcnMgfSBmcm9tICcuL3N0aWNrZXJzL2xpYic7XG5pbXBvcnQge1xuICB1c2VBdHRhY2hGaWxlU2hvcnRjdXQsXG4gIHVzZUtleWJvYXJkU2hvcnRjdXRzLFxufSBmcm9tICcuLi9ob29rcy91c2VLZXlib2FyZFNob3J0Y3V0cyc7XG5pbXBvcnQgeyBNZWRpYUVkaXRvciB9IGZyb20gJy4vTWVkaWFFZGl0b3InO1xuaW1wb3J0IHsgSU1BR0VfUE5HIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBpc0ltYWdlVHlwZVN1cHBvcnRlZCB9IGZyb20gJy4uL3V0aWwvR29vZ2xlQ2hyb21lJztcbmltcG9ydCAqIGFzIEtleWJvYXJkTGF5b3V0IGZyb20gJy4uL3NlcnZpY2VzL2tleWJvYXJkTGF5b3V0JztcblxuZXhwb3J0IHR5cGUgQ29tcG9zaXRpb25BUElUeXBlID1cbiAgfCB7XG4gICAgICBmb2N1c0lucHV0OiAoKSA9PiB2b2lkO1xuICAgICAgaXNEaXJ0eTogKCkgPT4gYm9vbGVhbjtcbiAgICAgIHNldERpc2FibGVkOiAoZGlzYWJsZWQ6IGJvb2xlYW4pID0+IHZvaWQ7XG4gICAgICByZXNldDogSW5wdXRBcGlbJ3Jlc2V0J107XG4gICAgICByZXNldEVtb2ppUmVzdWx0czogSW5wdXRBcGlbJ3Jlc2V0RW1vamlSZXN1bHRzJ107XG4gICAgfVxuICB8IHVuZGVmaW5lZDtcblxuZXhwb3J0IHR5cGUgT3duUHJvcHMgPSBSZWFkb25seTx7XG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q/OiBib29sZWFuO1xuICBhZGRBdHRhY2htZW50OiAoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICBhdHRhY2htZW50OiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGVcbiAgKSA9PiB1bmtub3duO1xuICBhZGRQZW5kaW5nQXR0YWNobWVudDogKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgcGVuZGluZ0F0dGFjaG1lbnQ6IEF0dGFjaG1lbnREcmFmdFR5cGVcbiAgKSA9PiB1bmtub3duO1xuICBhbm5vdW5jZW1lbnRzT25seT86IGJvb2xlYW47XG4gIGFyZVdlQWRtaW4/OiBib29sZWFuO1xuICBhcmVXZVBlbmRpbmc/OiBib29sZWFuO1xuICBhcmVXZVBlbmRpbmdBcHByb3ZhbD86IGJvb2xlYW47XG4gIGNhbmNlbFJlY29yZGluZzogKCkgPT4gdW5rbm93bjtcbiAgY29tcGxldGVSZWNvcmRpbmc6IChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIG9uU2VuZEF1ZGlvUmVjb3JkaW5nPzogKHJlYzogSW5NZW1vcnlBdHRhY2htZW50RHJhZnRUeXBlKSA9PiB1bmtub3duXG4gICkgPT4gdW5rbm93bjtcbiAgY29tcG9zaXRpb25BcGk/OiBNdXRhYmxlUmVmT2JqZWN0PENvbXBvc2l0aW9uQVBJVHlwZT47XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGRyYWZ0QXR0YWNobWVudHM6IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudERyYWZ0VHlwZT47XG4gIGVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGU/OiBFcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlO1xuICBlcnJvclJlY29yZGluZzogKGU6IEVycm9yRGlhbG9nQXVkaW9SZWNvcmRlclR5cGUpID0+IHVua25vd247XG4gIGdyb3VwQWRtaW5zOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcbiAgZ3JvdXBWZXJzaW9uPzogMSB8IDI7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGlzRmV0Y2hpbmdVVUlEPzogYm9vbGVhbjtcbiAgaXNHcm91cFYxQW5kRGlzYWJsZWQ/OiBib29sZWFuO1xuICBpc01pc3NpbmdNYW5kYXRvcnlQcm9maWxlU2hhcmluZz86IGJvb2xlYW47XG4gIHJlY29yZGluZ1N0YXRlOiBSZWNvcmRpbmdTdGF0ZTtcbiAgaXNTTVNPbmx5PzogYm9vbGVhbjtcbiAgbGVmdD86IGJvb2xlYW47XG4gIGxpbmtQcmV2aWV3TG9hZGluZzogYm9vbGVhbjtcbiAgbGlua1ByZXZpZXdSZXN1bHQ/OiBMaW5rUHJldmlld1R5cGU7XG4gIG1lc3NhZ2VSZXF1ZXN0c0VuYWJsZWQ/OiBib29sZWFuO1xuICBvbkNsZWFyQXR0YWNobWVudHMoKTogdW5rbm93bjtcbiAgb25DbGlja1F1b3RlZE1lc3NhZ2UoKTogdW5rbm93bjtcbiAgb25DbG9zZUxpbmtQcmV2aWV3KCk6IHVua25vd247XG4gIHByb2Nlc3NBdHRhY2htZW50czogKG9wdGlvbnM6IEhhbmRsZUF0dGFjaG1lbnRzUHJvY2Vzc2luZ0FyZ3NUeXBlKSA9PiB1bmtub3duO1xuICBvblNlbGVjdE1lZGlhUXVhbGl0eShpc0hROiBib29sZWFuKTogdW5rbm93bjtcbiAgb25TZW5kTWVzc2FnZShvcHRpb25zOiB7XG4gICAgZHJhZnRBdHRhY2htZW50cz86IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudERyYWZ0VHlwZT47XG4gICAgbWVudGlvbnM/OiBCb2R5UmFuZ2VzVHlwZTtcbiAgICBtZXNzYWdlPzogc3RyaW5nO1xuICAgIHRpbWVzdGFtcD86IG51bWJlcjtcbiAgICB2b2ljZU5vdGVBdHRhY2htZW50PzogSW5NZW1vcnlBdHRhY2htZW50RHJhZnRUeXBlO1xuICB9KTogdW5rbm93bjtcbiAgb3BlbkNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdW5rbm93bjtcbiAgcXVvdGVkTWVzc2FnZVByb3BzPzogT21pdDxcbiAgICBRdW90ZVByb3BzLFxuICAgICdpMThuJyB8ICdvbkNsaWNrJyB8ICdvbkNsb3NlJyB8ICd3aXRoQ29udGVudEFib3ZlJ1xuICA+O1xuICByZW1vdmVBdHRhY2htZW50OiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgZmlsZVBhdGg6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2V0UXVvdGVkTWVzc2FnZShtZXNzYWdlOiB1bmRlZmluZWQpOiB1bmtub3duO1xuICBzaG91bGRTZW5kSGlnaFF1YWxpdHlBdHRhY2htZW50czogYm9vbGVhbjtcbiAgc3RhcnRSZWNvcmRpbmc6ICgpID0+IHVua25vd247XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59PjtcblxuZXhwb3J0IHR5cGUgUHJvcHMgPSBQaWNrPFxuICBDb21wb3NpdGlvbklucHV0UHJvcHMsXG4gIHwgJ3NvcnRlZEdyb3VwTWVtYmVycydcbiAgfCAnb25FZGl0b3JTdGF0ZUNoYW5nZSdcbiAgfCAnb25UZXh0VG9vTG9uZydcbiAgfCAnZHJhZnRUZXh0J1xuICB8ICdkcmFmdEJvZHlSYW5nZXMnXG4gIHwgJ2NsZWFyUXVvdGVkTWVzc2FnZSdcbiAgfCAnZ2V0UHJlZmVycmVkQmFkZ2UnXG4gIHwgJ2dldFF1b3RlZE1lc3NhZ2UnXG4+ICZcbiAgUGljazxcbiAgICBFbW9qaUJ1dHRvblByb3BzLFxuICAgICdvblBpY2tFbW9qaScgfCAnb25TZXRTa2luVG9uZScgfCAncmVjZW50RW1vamlzJyB8ICdza2luVG9uZSdcbiAgPiAmXG4gIFBpY2s8XG4gICAgU3RpY2tlckJ1dHRvblByb3BzLFxuICAgIHwgJ2tub3duUGFja3MnXG4gICAgfCAncmVjZWl2ZWRQYWNrcydcbiAgICB8ICdpbnN0YWxsZWRQYWNrJ1xuICAgIHwgJ2luc3RhbGxlZFBhY2tzJ1xuICAgIHwgJ2JsZXNzZWRQYWNrcydcbiAgICB8ICdyZWNlbnRTdGlja2VycydcbiAgICB8ICdjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrJ1xuICAgIHwgJ29uQ2xpY2tBZGRQYWNrJ1xuICAgIHwgJ29uUGlja1N0aWNrZXInXG4gICAgfCAnY2xlYXJTaG93SW50cm9kdWN0aW9uJ1xuICAgIHwgJ3Nob3dQaWNrZXJIaW50J1xuICAgIHwgJ2NsZWFyU2hvd1BpY2tlckhpbnQnXG4gID4gJlxuICBNZXNzYWdlUmVxdWVzdEFjdGlvbnNQcm9wcyAmXG4gIFBpY2s8R3JvdXBWMURpc2FibGVkQWN0aW9uc1Byb3BzVHlwZSwgJ29uU3RhcnRHcm91cE1pZ3JhdGlvbic+ICZcbiAgUGljazxHcm91cFYyUGVuZGluZ0FwcHJvdmFsQWN0aW9uc1Byb3BzVHlwZSwgJ29uQ2FuY2VsSm9pblJlcXVlc3QnPiAmXG4gIE93blByb3BzO1xuXG5leHBvcnQgY29uc3QgQ29tcG9zaXRpb25BcmVhID0gKHtcbiAgLy8gQmFzZSBwcm9wc1xuICBhZGRBdHRhY2htZW50LFxuICBhZGRQZW5kaW5nQXR0YWNobWVudCxcbiAgY29udmVyc2F0aW9uSWQsXG4gIGkxOG4sXG4gIG9uU2VuZE1lc3NhZ2UsXG4gIHByb2Nlc3NBdHRhY2htZW50cyxcbiAgcmVtb3ZlQXR0YWNobWVudCxcbiAgdGhlbWUsXG5cbiAgLy8gQXR0YWNobWVudExpc3RcbiAgZHJhZnRBdHRhY2htZW50cyxcbiAgb25DbGVhckF0dGFjaG1lbnRzLFxuICAvLyBBdWRpb0NhcHR1cmVcbiAgY2FuY2VsUmVjb3JkaW5nLFxuICBjb21wbGV0ZVJlY29yZGluZyxcbiAgZXJyb3JEaWFsb2dBdWRpb1JlY29yZGVyVHlwZSxcbiAgZXJyb3JSZWNvcmRpbmcsXG4gIHJlY29yZGluZ1N0YXRlLFxuICBzdGFydFJlY29yZGluZyxcbiAgLy8gU3RhZ2VkTGlua1ByZXZpZXdcbiAgbGlua1ByZXZpZXdMb2FkaW5nLFxuICBsaW5rUHJldmlld1Jlc3VsdCxcbiAgb25DbG9zZUxpbmtQcmV2aWV3LFxuICAvLyBRdW90ZVxuICBxdW90ZWRNZXNzYWdlUHJvcHMsXG4gIG9uQ2xpY2tRdW90ZWRNZXNzYWdlLFxuICBzZXRRdW90ZWRNZXNzYWdlLFxuICAvLyBNZWRpYVF1YWxpdHlTZWxlY3RvclxuICBvblNlbGVjdE1lZGlhUXVhbGl0eSxcbiAgc2hvdWxkU2VuZEhpZ2hRdWFsaXR5QXR0YWNobWVudHMsXG4gIC8vIENvbXBvc2l0aW9uSW5wdXRcbiAgY29tcG9zaXRpb25BcGksXG4gIG9uRWRpdG9yU3RhdGVDaGFuZ2UsXG4gIG9uVGV4dFRvb0xvbmcsXG4gIGRyYWZ0VGV4dCxcbiAgZHJhZnRCb2R5UmFuZ2VzLFxuICBjbGVhclF1b3RlZE1lc3NhZ2UsXG4gIGdldFByZWZlcnJlZEJhZGdlLFxuICBnZXRRdW90ZWRNZXNzYWdlLFxuICBzb3J0ZWRHcm91cE1lbWJlcnMsXG4gIC8vIEVtb2ppQnV0dG9uXG4gIG9uUGlja0Vtb2ppLFxuICBvblNldFNraW5Ub25lLFxuICByZWNlbnRFbW9qaXMsXG4gIHNraW5Ub25lLFxuICAvLyBTdGlja2VyQnV0dG9uXG4gIGtub3duUGFja3MsXG4gIHJlY2VpdmVkUGFja3MsXG4gIGluc3RhbGxlZFBhY2ssXG4gIGluc3RhbGxlZFBhY2tzLFxuICBibGVzc2VkUGFja3MsXG4gIHJlY2VudFN0aWNrZXJzLFxuICBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrLFxuICBvbkNsaWNrQWRkUGFjayxcbiAgb25QaWNrU3RpY2tlcixcbiAgY2xlYXJTaG93SW50cm9kdWN0aW9uLFxuICBzaG93UGlja2VySGludCxcbiAgY2xlYXJTaG93UGlja2VySGludCxcbiAgLy8gTWVzc2FnZSBSZXF1ZXN0c1xuICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICBhcmVXZVBlbmRpbmcsXG4gIGFyZVdlUGVuZGluZ0FwcHJvdmFsLFxuICBjb252ZXJzYXRpb25UeXBlLFxuICBncm91cFZlcnNpb24sXG4gIGlzQmxvY2tlZCxcbiAgaXNNaXNzaW5nTWFuZGF0b3J5UHJvZmlsZVNoYXJpbmcsXG4gIGxlZnQsXG4gIG1lc3NhZ2VSZXF1ZXN0c0VuYWJsZWQsXG4gIG9uQWNjZXB0LFxuICBvbkJsb2NrLFxuICBvbkJsb2NrQW5kUmVwb3J0U3BhbSxcbiAgb25EZWxldGUsXG4gIG9uVW5ibG9jayxcbiAgdGl0bGUsXG4gIC8vIEdyb3VwVjEgRGlzYWJsZWQgQWN0aW9uc1xuICBpc0dyb3VwVjFBbmREaXNhYmxlZCxcbiAgb25TdGFydEdyb3VwTWlncmF0aW9uLFxuICAvLyBHcm91cFYyXG4gIGFubm91bmNlbWVudHNPbmx5LFxuICBhcmVXZUFkbWluLFxuICBncm91cEFkbWlucyxcbiAgb25DYW5jZWxKb2luUmVxdWVzdCxcbiAgb3BlbkNvbnZlcnNhdGlvbixcbiAgLy8gU01TLW9ubHkgY29udGFjdHNcbiAgaXNTTVNPbmx5LFxuICBpc0ZldGNoaW5nVVVJRCxcbn06IFByb3BzKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBbZGlzYWJsZWQsIHNldERpc2FibGVkXSA9IHVzZVN0YXRlKGZhbHNlKTtcbiAgY29uc3QgW2RpcnR5LCBzZXREaXJ0eV0gPSB1c2VTdGF0ZShmYWxzZSk7XG4gIGNvbnN0IFtsYXJnZSwgc2V0TGFyZ2VdID0gdXNlU3RhdGUoZmFsc2UpO1xuICBjb25zdCBbYXR0YWNobWVudFRvRWRpdCwgc2V0QXR0YWNobWVudFRvRWRpdF0gPSB1c2VTdGF0ZTxcbiAgICBBdHRhY2htZW50RHJhZnRUeXBlIHwgdW5kZWZpbmVkXG4gID4oKTtcbiAgY29uc3QgaW5wdXRBcGlSZWYgPSB1c2VSZWY8SW5wdXRBcGkgfCB1bmRlZmluZWQ+KCk7XG4gIGNvbnN0IGZpbGVJbnB1dFJlZiA9IHVzZVJlZjxudWxsIHwgSFRNTElucHV0RWxlbWVudD4obnVsbCk7XG5cbiAgY29uc3QgaGFuZGxlRm9yY2VTZW5kID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldExhcmdlKGZhbHNlKTtcbiAgICBpZiAoaW5wdXRBcGlSZWYuY3VycmVudCkge1xuICAgICAgaW5wdXRBcGlSZWYuY3VycmVudC5zdWJtaXQoKTtcbiAgICB9XG4gIH0sIFtpbnB1dEFwaVJlZiwgc2V0TGFyZ2VdKTtcblxuICBjb25zdCBoYW5kbGVTdWJtaXQgPSB1c2VDYWxsYmFjayhcbiAgICAobWVzc2FnZTogc3RyaW5nLCBtZW50aW9uczogQXJyYXk8Qm9keVJhbmdlVHlwZT4sIHRpbWVzdGFtcDogbnVtYmVyKSA9PiB7XG4gICAgICBvblNlbmRNZXNzYWdlKHtcbiAgICAgICAgZHJhZnRBdHRhY2htZW50cyxcbiAgICAgICAgbWVudGlvbnMsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH0pO1xuICAgICAgc2V0TGFyZ2UoZmFsc2UpO1xuICAgIH0sXG4gICAgW2RyYWZ0QXR0YWNobWVudHMsIG9uU2VuZE1lc3NhZ2UsIHNldExhcmdlXVxuICApO1xuXG4gIGNvbnN0IGxhdW5jaEF0dGFjaG1lbnRQaWNrZXIgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgY29uc3QgZmlsZUlucHV0ID0gZmlsZUlucHV0UmVmLmN1cnJlbnQ7XG4gICAgaWYgKGZpbGVJbnB1dCkge1xuICAgICAgLy8gU2V0dGluZyB0aGUgdmFsdWUgdG8gZW1wdHkgc28gdGhhdCBvbkNoYW5nZSBhbHdheXMgZmlyZXMgaW4gY2FzZVxuICAgICAgLy8geW91IGFkZCBtdWx0aXBsZSBwaG90b3MuXG4gICAgICBmaWxlSW5wdXQudmFsdWUgPSAnJztcbiAgICAgIGZpbGVJbnB1dC5jbGljaygpO1xuICAgIH1cbiAgfSwgW10pO1xuXG4gIGZ1bmN0aW9uIG1heWJlRWRpdEF0dGFjaG1lbnQoYXR0YWNobWVudDogQXR0YWNobWVudERyYWZ0VHlwZSkge1xuICAgIGlmICghaXNJbWFnZVR5cGVTdXBwb3J0ZWQoYXR0YWNobWVudC5jb250ZW50VHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzZXRBdHRhY2htZW50VG9FZGl0KGF0dGFjaG1lbnQpO1xuICB9XG5cbiAgY29uc3QgYXR0YWNoRmlsZVNob3J0Y3V0ID0gdXNlQXR0YWNoRmlsZVNob3J0Y3V0KGxhdW5jaEF0dGFjaG1lbnRQaWNrZXIpO1xuICB1c2VLZXlib2FyZFNob3J0Y3V0cyhhdHRhY2hGaWxlU2hvcnRjdXQpO1xuXG4gIGNvbnN0IGZvY3VzSW5wdXQgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKGlucHV0QXBpUmVmLmN1cnJlbnQpIHtcbiAgICAgIGlucHV0QXBpUmVmLmN1cnJlbnQuZm9jdXMoKTtcbiAgICB9XG4gIH0sIFtpbnB1dEFwaVJlZl0pO1xuXG4gIGNvbnN0IHdpdGhTdGlja2VycyA9XG4gICAgY291bnRTdGlja2Vycyh7XG4gICAgICBrbm93blBhY2tzLFxuICAgICAgYmxlc3NlZFBhY2tzLFxuICAgICAgaW5zdGFsbGVkUGFja3MsXG4gICAgICByZWNlaXZlZFBhY2tzLFxuICAgIH0pID4gMDtcblxuICBpZiAoY29tcG9zaXRpb25BcGkpIHtcbiAgICAvLyBVc2luZyBhIFJlYWN0Lk11dGFibGVSZWZPYmplY3QsIHNvIHdlIG5lZWQgdG8gcmVhc3NpZ24gdGhpcyBwcm9wLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGNvbXBvc2l0aW9uQXBpLmN1cnJlbnQgPSB7XG4gICAgICBpc0RpcnR5OiAoKSA9PiBkaXJ0eSxcbiAgICAgIGZvY3VzSW5wdXQsXG4gICAgICBzZXREaXNhYmxlZCxcbiAgICAgIHJlc2V0OiAoKSA9PiB7XG4gICAgICAgIGlmIChpbnB1dEFwaVJlZi5jdXJyZW50KSB7XG4gICAgICAgICAgaW5wdXRBcGlSZWYuY3VycmVudC5yZXNldCgpO1xuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcmVzZXRFbW9qaVJlc3VsdHM6ICgpID0+IHtcbiAgICAgICAgaWYgKGlucHV0QXBpUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgICBpbnB1dEFwaVJlZi5jdXJyZW50LnJlc2V0RW1vamlSZXN1bHRzKCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IGluc2VydEVtb2ppID0gdXNlQ2FsbGJhY2soXG4gICAgKGU6IEVtb2ppUGlja0RhdGFUeXBlKSA9PiB7XG4gICAgICBpZiAoaW5wdXRBcGlSZWYuY3VycmVudCkge1xuICAgICAgICBpbnB1dEFwaVJlZi5jdXJyZW50Lmluc2VydEVtb2ppKGUpO1xuICAgICAgICBvblBpY2tFbW9qaShlKTtcbiAgICAgIH1cbiAgICB9LFxuICAgIFtpbnB1dEFwaVJlZiwgb25QaWNrRW1vamldXG4gICk7XG5cbiAgY29uc3QgaGFuZGxlVG9nZ2xlTGFyZ2UgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0TGFyZ2UobCA9PiAhbCk7XG4gIH0sIFtzZXRMYXJnZV0pO1xuXG4gIGNvbnN0IHNob3VsZFNob3dNaWNyb3Bob25lID0gIWxhcmdlICYmICFkcmFmdEF0dGFjaG1lbnRzLmxlbmd0aCAmJiAhZHJhZnRUZXh0O1xuXG4gIGNvbnN0IHNob3dNZWRpYVF1YWxpdHlTZWxlY3RvciA9IGRyYWZ0QXR0YWNobWVudHMuc29tZShpc0ltYWdlQXR0YWNobWVudCk7XG5cbiAgY29uc3QgbGVmdEhhbmRTaWRlQnV0dG9uc0ZyYWdtZW50ID0gKFxuICAgIDw+XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbXBvc2l0aW9uQXJlYV9fYnV0dG9uLWNlbGxcIj5cbiAgICAgICAgPEVtb2ppQnV0dG9uXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBkb1NlbmQ9e2hhbmRsZUZvcmNlU2VuZH1cbiAgICAgICAgICBvblBpY2tFbW9qaT17aW5zZXJ0RW1vaml9XG4gICAgICAgICAgb25DbG9zZT17Zm9jdXNJbnB1dH1cbiAgICAgICAgICByZWNlbnRFbW9qaXM9e3JlY2VudEVtb2ppc31cbiAgICAgICAgICBza2luVG9uZT17c2tpblRvbmV9XG4gICAgICAgICAgb25TZXRTa2luVG9uZT17b25TZXRTa2luVG9uZX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAge3Nob3dNZWRpYVF1YWxpdHlTZWxlY3RvciA/IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb21wb3NpdGlvbkFyZWFfX2J1dHRvbi1jZWxsXCI+XG4gICAgICAgICAgPE1lZGlhUXVhbGl0eVNlbGVjdG9yXG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgaXNIaWdoUXVhbGl0eT17c2hvdWxkU2VuZEhpZ2hRdWFsaXR5QXR0YWNobWVudHN9XG4gICAgICAgICAgICBvblNlbGVjdFF1YWxpdHk9e29uU2VsZWN0TWVkaWFRdWFsaXR5fVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKSA6IG51bGx9XG4gICAgPC8+XG4gICk7XG5cbiAgY29uc3QgbWljQnV0dG9uRnJhZ21lbnQgPSBzaG91bGRTaG93TWljcm9waG9uZSA/IChcbiAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbXBvc2l0aW9uQXJlYV9fYnV0dG9uLWNlbGxcIj5cbiAgICAgIDxBdWRpb0NhcHR1cmVcbiAgICAgICAgY2FuY2VsUmVjb3JkaW5nPXtjYW5jZWxSZWNvcmRpbmd9XG4gICAgICAgIGNvbXBsZXRlUmVjb3JkaW5nPXtjb21wbGV0ZVJlY29yZGluZ31cbiAgICAgICAgY29udmVyc2F0aW9uSWQ9e2NvbnZlcnNhdGlvbklkfVxuICAgICAgICBkcmFmdEF0dGFjaG1lbnRzPXtkcmFmdEF0dGFjaG1lbnRzfVxuICAgICAgICBlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlPXtlcnJvckRpYWxvZ0F1ZGlvUmVjb3JkZXJUeXBlfVxuICAgICAgICBlcnJvclJlY29yZGluZz17ZXJyb3JSZWNvcmRpbmd9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIHJlY29yZGluZ1N0YXRlPXtyZWNvcmRpbmdTdGF0ZX1cbiAgICAgICAgb25TZW5kQXVkaW9SZWNvcmRpbmc9eyhcbiAgICAgICAgICB2b2ljZU5vdGVBdHRhY2htZW50OiBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGVcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgb25TZW5kTWVzc2FnZSh7IHZvaWNlTm90ZUF0dGFjaG1lbnQgfSk7XG4gICAgICAgIH19XG4gICAgICAgIHN0YXJ0UmVjb3JkaW5nPXtzdGFydFJlY29yZGluZ31cbiAgICAgIC8+XG4gICAgPC9kaXY+XG4gICkgOiBudWxsO1xuXG4gIGNvbnN0IGlzUmVjb3JkaW5nID0gcmVjb3JkaW5nU3RhdGUgPT09IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZztcbiAgY29uc3QgYXR0QnV0dG9uID1cbiAgICBsaW5rUHJldmlld1Jlc3VsdCB8fCBpc1JlY29yZGluZyA/IHVuZGVmaW5lZCA6IChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhX19idXR0b24tY2VsbFwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhX19hdHRhY2gtZmlsZVwiXG4gICAgICAgICAgb25DbGljaz17bGF1bmNoQXR0YWNobWVudFBpY2tlcn1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdDb21wb3NpdGlvbkFyZWEtLWF0dGFjaC1maWxlJyl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuXG4gIGNvbnN0IHNlbmRCdXR0b25GcmFnbWVudCA9IChcbiAgICA8PlxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb21wb3NpdGlvbkFyZWFfX3BsYWNlaG9sZGVyXCIgLz5cbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhX19idXR0b24tY2VsbFwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhX19zZW5kLWJ1dHRvblwiXG4gICAgICAgICAgb25DbGljaz17aGFuZGxlRm9yY2VTZW5kfVxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3NlbmRNZXNzYWdlVG9Db250YWN0Jyl9XG4gICAgICAgIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8Lz5cbiAgKTtcblxuICBjb25zdCBzdGlja2VyQnV0dG9uUGxhY2VtZW50ID0gbGFyZ2UgPyAndG9wLXN0YXJ0JyA6ICd0b3AtZW5kJztcbiAgY29uc3Qgc3RpY2tlckJ1dHRvbkZyYWdtZW50ID0gd2l0aFN0aWNrZXJzID8gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhX19idXR0b24tY2VsbFwiPlxuICAgICAgPFN0aWNrZXJCdXR0b25cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAga25vd25QYWNrcz17a25vd25QYWNrc31cbiAgICAgICAgcmVjZWl2ZWRQYWNrcz17cmVjZWl2ZWRQYWNrc31cbiAgICAgICAgaW5zdGFsbGVkUGFjaz17aW5zdGFsbGVkUGFja31cbiAgICAgICAgaW5zdGFsbGVkUGFja3M9e2luc3RhbGxlZFBhY2tzfVxuICAgICAgICBibGVzc2VkUGFja3M9e2JsZXNzZWRQYWNrc31cbiAgICAgICAgcmVjZW50U3RpY2tlcnM9e3JlY2VudFN0aWNrZXJzfVxuICAgICAgICBjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrPXtjbGVhckluc3RhbGxlZFN0aWNrZXJQYWNrfVxuICAgICAgICBvbkNsaWNrQWRkUGFjaz17b25DbGlja0FkZFBhY2t9XG4gICAgICAgIG9uUGlja1N0aWNrZXI9e29uUGlja1N0aWNrZXJ9XG4gICAgICAgIGNsZWFyU2hvd0ludHJvZHVjdGlvbj17Y2xlYXJTaG93SW50cm9kdWN0aW9ufVxuICAgICAgICBzaG93UGlja2VySGludD17c2hvd1BpY2tlckhpbnR9XG4gICAgICAgIGNsZWFyU2hvd1BpY2tlckhpbnQ9e2NsZWFyU2hvd1BpY2tlckhpbnR9XG4gICAgICAgIHBvc2l0aW9uPXtzdGlja2VyQnV0dG9uUGxhY2VtZW50fVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKSA6IG51bGw7XG5cbiAgLy8gTGlzdGVuIGZvciBjbWQvY3RybC1zaGlmdC14IHRvIHRvZ2dsZSBsYXJnZSBjb21wb3NpdGlvbiBtb2RlXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgaGFuZGxlciA9IChlOiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IHNoaWZ0S2V5LCBjdHJsS2V5LCBtZXRhS2V5IH0gPSBlO1xuICAgICAgY29uc3Qga2V5ID0gS2V5Ym9hcmRMYXlvdXQubG9va3VwKGUpO1xuICAgICAgLy8gV2hlbiB1c2luZyB0aGUgY3RybCBrZXksIGBrZXlgIGlzIGAnWCdgLiBXaGVuIHVzaW5nIHRoZSBjbWQga2V5LCBga2V5YCBpcyBgJ3gnYFxuICAgICAgY29uc3QgeEtleSA9IGtleSA9PT0gJ3gnIHx8IGtleSA9PT0gJ1gnO1xuICAgICAgY29uc3QgY29tbWFuZEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpID09PSAnZGFyd2luJyAmJiBtZXRhS2V5O1xuICAgICAgY29uc3QgY29udHJvbEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpICE9PSAnZGFyd2luJyAmJiBjdHJsS2V5O1xuICAgICAgY29uc3QgY29tbWFuZE9yQ3RybCA9IGNvbW1hbmRLZXkgfHwgY29udHJvbEtleTtcblxuICAgICAgLy8gY21kL2N0cmwtc2hpZnQteFxuICAgICAgaWYgKHhLZXkgJiYgc2hpZnRLZXkgJiYgY29tbWFuZE9yQ3RybCkge1xuICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgIHNldExhcmdlKHggPT4gIXgpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlcik7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGhhbmRsZXIpO1xuICAgIH07XG4gIH0sIFtzZXRMYXJnZV0pO1xuXG4gIGlmIChcbiAgICBpc0Jsb2NrZWQgfHxcbiAgICBhcmVXZVBlbmRpbmcgfHxcbiAgICAobWVzc2FnZVJlcXVlc3RzRW5hYmxlZCAmJiAhYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdClcbiAgKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxNZXNzYWdlUmVxdWVzdEFjdGlvbnNcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT17Y29udmVyc2F0aW9uVHlwZX1cbiAgICAgICAgaXNCbG9ja2VkPXtpc0Jsb2NrZWR9XG4gICAgICAgIG9uQmxvY2s9e29uQmxvY2t9XG4gICAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtPXtvbkJsb2NrQW5kUmVwb3J0U3BhbX1cbiAgICAgICAgb25VbmJsb2NrPXtvblVuYmxvY2t9XG4gICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZX1cbiAgICAgICAgb25BY2NlcHQ9e29uQWNjZXB0fVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoY29udmVyc2F0aW9uVHlwZSA9PT0gJ2RpcmVjdCcgJiYgaXNTTVNPbmx5KSB7XG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFtcbiAgICAgICAgICAnQ29tcG9zaXRpb25BcmVhJyxcbiAgICAgICAgICAnQ29tcG9zaXRpb25BcmVhLS1zbXMtb25seScsXG4gICAgICAgICAgaXNGZXRjaGluZ1VVSUQgPyAnQ29tcG9zaXRpb25BcmVhLS1wZW5kaW5nJyA6IG51bGwsXG4gICAgICAgIF0pfVxuICAgICAgPlxuICAgICAgICB7aXNGZXRjaGluZ1VVSUQgPyAoXG4gICAgICAgICAgPFNwaW5uZXJcbiAgICAgICAgICAgIGFyaWFMYWJlbD17aTE4bignQ29tcG9zaXRpb25BcmVhLS1zbXMtb25seV9fc3Bpbm5lci1sYWJlbCcpfVxuICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICBtb2R1bGVDbGFzc05hbWU9XCJtb2R1bGUtaW1hZ2Utc3Bpbm5lclwiXG4gICAgICAgICAgICBzdmdTaXplPVwic21hbGxcIlxuICAgICAgICAgIC8+XG4gICAgICAgICkgOiAoXG4gICAgICAgICAgPD5cbiAgICAgICAgICAgIDxoMiBjbGFzc05hbWU9XCJDb21wb3NpdGlvbkFyZWEtLXNtcy1vbmx5X190aXRsZVwiPlxuICAgICAgICAgICAgICB7aTE4bignQ29tcG9zaXRpb25BcmVhLS1zbXMtb25seV9fdGl0bGUnKX1cbiAgICAgICAgICAgIDwvaDI+XG4gICAgICAgICAgICA8cCBjbGFzc05hbWU9XCJDb21wb3NpdGlvbkFyZWEtLXNtcy1vbmx5X19ib2R5XCI+XG4gICAgICAgICAgICAgIHtpMThuKCdDb21wb3NpdGlvbkFyZWEtLXNtcy1vbmx5X19ib2R5Jyl9XG4gICAgICAgICAgICA8L3A+XG4gICAgICAgICAgPC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgLy8gSWYgbm8gbWVzc2FnZSByZXF1ZXN0LCBidXQgd2UgaGF2ZW4ndCBzaGFyZWQgcHJvZmlsZSB5ZXQsIHdlIHNob3cgcHJvZmlsZS1zaGFyaW5nIFVJXG4gIGlmIChcbiAgICAhbGVmdCAmJlxuICAgIChjb252ZXJzYXRpb25UeXBlID09PSAnZGlyZWN0JyB8fFxuICAgICAgKGNvbnZlcnNhdGlvblR5cGUgPT09ICdncm91cCcgJiYgZ3JvdXBWZXJzaW9uID09PSAxKSkgJiZcbiAgICBpc01pc3NpbmdNYW5kYXRvcnlQcm9maWxlU2hhcmluZ1xuICApIHtcbiAgICByZXR1cm4gKFxuICAgICAgPE1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nQWN0aW9uc1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPXtjb252ZXJzYXRpb25UeXBlfVxuICAgICAgICBvbkJsb2NrPXtvbkJsb2NrfVxuICAgICAgICBvbkJsb2NrQW5kUmVwb3J0U3BhbT17b25CbG9ja0FuZFJlcG9ydFNwYW19XG4gICAgICAgIG9uRGVsZXRlPXtvbkRlbGV0ZX1cbiAgICAgICAgb25BY2NlcHQ9e29uQWNjZXB0fVxuICAgICAgICB0aXRsZT17dGl0bGV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICAvLyBJZiB0aGlzIGlzIGEgVjEgZ3JvdXAsIG5vdyBkaXNhYmxlZCBlbnRpcmVseSwgd2Ugc2hvdyBVSSB0byBoZWxwIHRoZW0gdXBncmFkZVxuICBpZiAoIWxlZnQgJiYgaXNHcm91cFYxQW5kRGlzYWJsZWQpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEdyb3VwVjFEaXNhYmxlZEFjdGlvbnNcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgb25TdGFydEdyb3VwTWlncmF0aW9uPXtvblN0YXJ0R3JvdXBNaWdyYXRpb259XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoYXJlV2VQZW5kaW5nQXBwcm92YWwpIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEdyb3VwVjJQZW5kaW5nQXBwcm92YWxBY3Rpb25zXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIG9uQ2FuY2VsSm9pblJlcXVlc3Q9e29uQ2FuY2VsSm9pblJlcXVlc3R9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBpZiAoYW5ub3VuY2VtZW50c09ubHkgJiYgIWFyZVdlQWRtaW4pIHtcbiAgICByZXR1cm4gKFxuICAgICAgPEFubm91bmNlbWVudHNPbmx5R3JvdXBCYW5uZXJcbiAgICAgICAgZ3JvdXBBZG1pbnM9e2dyb3VwQWRtaW5zfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvcGVuQ29udmVyc2F0aW9uPXtvcGVuQ29udmVyc2F0aW9ufVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPVwiQ29tcG9zaXRpb25BcmVhXCI+XG4gICAgICB7YXR0YWNobWVudFRvRWRpdCAmJiAndXJsJyBpbiBhdHRhY2htZW50VG9FZGl0ICYmIGF0dGFjaG1lbnRUb0VkaXQudXJsICYmIChcbiAgICAgICAgPE1lZGlhRWRpdG9yXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpbWFnZVNyYz17YXR0YWNobWVudFRvRWRpdC51cmx9XG4gICAgICAgICAgb25DbG9zZT17KCkgPT4gc2V0QXR0YWNobWVudFRvRWRpdCh1bmRlZmluZWQpfVxuICAgICAgICAgIG9uRG9uZT17ZGF0YSA9PiB7XG4gICAgICAgICAgICBjb25zdCBuZXdBdHRhY2htZW50ID0ge1xuICAgICAgICAgICAgICAuLi5hdHRhY2htZW50VG9FZGl0LFxuICAgICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICAgICAgICBkYXRhLFxuICAgICAgICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBhZGRBdHRhY2htZW50KGNvbnZlcnNhdGlvbklkLCBuZXdBdHRhY2htZW50KTtcbiAgICAgICAgICAgIHNldEF0dGFjaG1lbnRUb0VkaXQodW5kZWZpbmVkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIGluc3RhbGxlZFBhY2tzPXtpbnN0YWxsZWRQYWNrc31cbiAgICAgICAgICByZWNlbnRTdGlja2Vycz17cmVjZW50U3RpY2tlcnN9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJDb21wb3NpdGlvbkFyZWFfX3RvZ2dsZS1sYXJnZVwiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ0NvbXBvc2l0aW9uQXJlYV9fdG9nZ2xlLWxhcmdlX19idXR0b24nLFxuICAgICAgICAgICAgbGFyZ2UgPyAnQ29tcG9zaXRpb25BcmVhX190b2dnbGUtbGFyZ2VfX2J1dHRvbi0tbGFyZ2UtYWN0aXZlJyA6IG51bGxcbiAgICAgICAgICApfVxuICAgICAgICAgIC8vIFRoaXMgcHJldmVudHMgdGhlIHVzZXIgZnJvbSB0YWJiaW5nIGhlcmVcbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgb25DbGljaz17aGFuZGxlVG9nZ2xlTGFyZ2V9XG4gICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignQ29tcG9zaXRpb25BcmVhLS1leHBhbmQnKX1cbiAgICAgICAgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ0NvbXBvc2l0aW9uQXJlYV9fcm93JyxcbiAgICAgICAgICAnQ29tcG9zaXRpb25BcmVhX19yb3ctLWNvbHVtbidcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAge3F1b3RlZE1lc3NhZ2VQcm9wcyAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJxdW90ZS13cmFwcGVyXCI+XG4gICAgICAgICAgICA8UXVvdGVcbiAgICAgICAgICAgICAgaXNDb21wb3NlXG4gICAgICAgICAgICAgIHsuLi5xdW90ZWRNZXNzYWdlUHJvcHN9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e29uQ2xpY2tRdW90ZWRNZXNzYWdlfVxuICAgICAgICAgICAgICBvbkNsb3NlPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgLy8gVGhpcyBvbmUgaXMgZm9yIHJlZHV4Li4uXG4gICAgICAgICAgICAgICAgc2V0UXVvdGVkTWVzc2FnZSh1bmRlZmluZWQpO1xuICAgICAgICAgICAgICAgIC8vIGFuZCB0aGlzIGlzIGZvciBjb252ZXJzYXRpb25fdmlldy5cbiAgICAgICAgICAgICAgICBjbGVhclF1b3RlZE1lc3NhZ2U/LigpO1xuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgICAge2xpbmtQcmV2aWV3TG9hZGluZyAmJiBsaW5rUHJldmlld1Jlc3VsdCAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJwcmV2aWV3LXdyYXBwZXJcIj5cbiAgICAgICAgICAgIDxTdGFnZWRMaW5rUHJldmlld1xuICAgICAgICAgICAgICB7Li4ubGlua1ByZXZpZXdSZXN1bHR9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIG9uQ2xvc2U9e29uQ2xvc2VMaW5rUHJldmlld31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIHtkcmFmdEF0dGFjaG1lbnRzLmxlbmd0aCA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIkNvbXBvc2l0aW9uQXJlYV9fYXR0YWNobWVudC1saXN0XCI+XG4gICAgICAgICAgICA8QXR0YWNobWVudExpc3RcbiAgICAgICAgICAgICAgYXR0YWNobWVudHM9e2RyYWZ0QXR0YWNobWVudHN9XG4gICAgICAgICAgICAgIGNhbkVkaXRJbWFnZXNcbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgb25BZGRBdHRhY2htZW50PXtsYXVuY2hBdHRhY2htZW50UGlja2VyfVxuICAgICAgICAgICAgICBvbkNsaWNrQXR0YWNobWVudD17bWF5YmVFZGl0QXR0YWNobWVudH1cbiAgICAgICAgICAgICAgb25DbG9zZT17b25DbGVhckF0dGFjaG1lbnRzfVxuICAgICAgICAgICAgICBvbkNsb3NlQXR0YWNobWVudD17YXR0YWNobWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKGF0dGFjaG1lbnQucGF0aCkge1xuICAgICAgICAgICAgICAgICAgcmVtb3ZlQXR0YWNobWVudChjb252ZXJzYXRpb25JZCwgYXR0YWNobWVudC5wYXRoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogbnVsbH1cbiAgICAgIDwvZGl2PlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ0NvbXBvc2l0aW9uQXJlYV9fcm93JyxcbiAgICAgICAgICBsYXJnZSA/ICdDb21wb3NpdGlvbkFyZWFfX3Jvdy0tcGFkZGVkJyA6IG51bGxcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAgeyFsYXJnZSA/IGxlZnRIYW5kU2lkZUJ1dHRvbnNGcmFnbWVudCA6IG51bGx9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnQ29tcG9zaXRpb25BcmVhX19pbnB1dCcsXG4gICAgICAgICAgICBsYXJnZSA/ICdDb21wb3NpdGlvbkFyZWFfX2lucHV0LS1wYWRkZWQnIDogbnVsbFxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q29tcG9zaXRpb25JbnB1dFxuICAgICAgICAgICAgY2xlYXJRdW90ZWRNZXNzYWdlPXtjbGVhclF1b3RlZE1lc3NhZ2V9XG4gICAgICAgICAgICBkaXNhYmxlZD17ZGlzYWJsZWR9XG4gICAgICAgICAgICBkcmFmdEJvZHlSYW5nZXM9e2RyYWZ0Qm9keVJhbmdlc31cbiAgICAgICAgICAgIGRyYWZ0VGV4dD17ZHJhZnRUZXh0fVxuICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgICAgZ2V0UXVvdGVkTWVzc2FnZT17Z2V0UXVvdGVkTWVzc2FnZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBpbnB1dEFwaT17aW5wdXRBcGlSZWZ9XG4gICAgICAgICAgICBsYXJnZT17bGFyZ2V9XG4gICAgICAgICAgICBvbkRpcnR5Q2hhbmdlPXtzZXREaXJ0eX1cbiAgICAgICAgICAgIG9uRWRpdG9yU3RhdGVDaGFuZ2U9e29uRWRpdG9yU3RhdGVDaGFuZ2V9XG4gICAgICAgICAgICBvblBpY2tFbW9qaT17b25QaWNrRW1vaml9XG4gICAgICAgICAgICBvblN1Ym1pdD17aGFuZGxlU3VibWl0fVxuICAgICAgICAgICAgb25UZXh0VG9vTG9uZz17b25UZXh0VG9vTG9uZ31cbiAgICAgICAgICAgIHNraW5Ub25lPXtza2luVG9uZX1cbiAgICAgICAgICAgIHNvcnRlZEdyb3VwTWVtYmVycz17c29ydGVkR3JvdXBNZW1iZXJzfVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7IWxhcmdlID8gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7c3RpY2tlckJ1dHRvbkZyYWdtZW50fVxuICAgICAgICAgICAgeyFkaXJ0eSA/IG1pY0J1dHRvbkZyYWdtZW50IDogbnVsbH1cbiAgICAgICAgICAgIHthdHRCdXR0b259XG4gICAgICAgICAgPC8+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9kaXY+XG4gICAgICB7bGFyZ2UgPyAoXG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnQ29tcG9zaXRpb25BcmVhX19yb3cnLFxuICAgICAgICAgICAgJ0NvbXBvc2l0aW9uQXJlYV9fcm93LS1jb250cm9sLXJvdydcbiAgICAgICAgICApfVxuICAgICAgICA+XG4gICAgICAgICAge2xlZnRIYW5kU2lkZUJ1dHRvbnNGcmFnbWVudH1cbiAgICAgICAgICB7c3RpY2tlckJ1dHRvbkZyYWdtZW50fVxuICAgICAgICAgIHthdHRCdXR0b259XG4gICAgICAgICAgeyFkaXJ0eSA/IG1pY0J1dHRvbkZyYWdtZW50IDogbnVsbH1cbiAgICAgICAgICB7ZGlydHkgfHwgIXNob3VsZFNob3dNaWNyb3Bob25lID8gc2VuZEJ1dHRvbkZyYWdtZW50IDogbnVsbH1cbiAgICAgICAgPC9kaXY+XG4gICAgICApIDogbnVsbH1cbiAgICAgIDxDb21wb3NpdGlvblVwbG9hZFxuICAgICAgICBhZGRBdHRhY2htZW50PXthZGRBdHRhY2htZW50fVxuICAgICAgICBhZGRQZW5kaW5nQXR0YWNobWVudD17YWRkUGVuZGluZ0F0dGFjaG1lbnR9XG4gICAgICAgIGNvbnZlcnNhdGlvbklkPXtjb252ZXJzYXRpb25JZH1cbiAgICAgICAgZHJhZnRBdHRhY2htZW50cz17ZHJhZnRBdHRhY2htZW50c31cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgcHJvY2Vzc0F0dGFjaG1lbnRzPXtwcm9jZXNzQXR0YWNobWVudHN9XG4gICAgICAgIHJlbW92ZUF0dGFjaG1lbnQ9e3JlbW92ZUF0dGFjaG1lbnR9XG4gICAgICAgIHJlZj17ZmlsZUlucHV0UmVmfVxuICAgICAgLz5cbiAgICA8L2Rpdj5cbiAgKTtcbn07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
