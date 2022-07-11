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
var conversation_view_exports = {};
__export(conversation_view_exports, {
  ConversationView: () => ConversationView
});
module.exports = __toCommonJS(conversation_view_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_mustache = require("mustache");
var import_Attachment = require("../types/Attachment");
var Attachment = __toESM(require("../types/Attachment"));
var Stickers = __toESM(require("../types/Stickers"));
var import_getMessageById = require("../messages/getMessageById");
var import_helpers = require("../messages/helpers");
var import_assert = require("../util/assert");
var import_enqueueReactionForSend = require("../reactions/enqueueReactionForSend");
var import_addReportSpamJob = require("../jobs/helpers/addReportSpamJob");
var import_reportSpamJobQueue = require("../jobs/reportSpamJobQueue");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_findAndFormatContact = require("../util/findAndFormatContact");
var import_badges = require("../state/selectors/badges");
var import_message = require("../state/selectors/message");
var import_conversations = require("../state/selectors/conversations");
var import_calling = require("../state/selectors/calling");
var import_user = require("../state/selectors/user");
var import_ReactWrapperView = require("./ReactWrapperView");
var import_ConversationDetailsMembershipList = require("../components/conversation/conversation-details/ConversationDetailsMembershipList");
var import_showSafetyNumberChangeDialog = require("../shims/showSafetyNumberChangeDialog");
var log = __toESM(require("../logging/log"));
var import_createConversationView = require("../state/roots/createConversationView");
var import_AttachmentToastType = require("../types/AttachmentToastType");
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_protobuf = require("../protobuf");
var import_ToastBlocked = require("../components/ToastBlocked");
var import_ToastBlockedGroup = require("../components/ToastBlockedGroup");
var import_ToastCannotMixImageAndNonImageAttachments = require("../components/ToastCannotMixImageAndNonImageAttachments");
var import_ToastCannotStartGroupCall = require("../components/ToastCannotStartGroupCall");
var import_ToastConversationArchived = require("../components/ToastConversationArchived");
var import_ToastConversationMarkedUnread = require("../components/ToastConversationMarkedUnread");
var import_ToastConversationUnarchived = require("../components/ToastConversationUnarchived");
var import_ToastDangerousFileType = require("../components/ToastDangerousFileType");
var import_ToastDeleteForEveryoneFailed = require("../components/ToastDeleteForEveryoneFailed");
var import_ToastExpired = require("../components/ToastExpired");
var import_ToastFileSaved = require("../components/ToastFileSaved");
var import_ToastFileSize = require("../components/ToastFileSize");
var import_ToastInvalidConversation = require("../components/ToastInvalidConversation");
var import_ToastLeftGroup = require("../components/ToastLeftGroup");
var import_ToastMaxAttachments = require("../components/ToastMaxAttachments");
var import_ToastMessageBodyTooLong = require("../components/ToastMessageBodyTooLong");
var import_ToastOneNonImageAtATime = require("../components/ToastOneNonImageAtATime");
var import_ToastOriginalMessageNotFound = require("../components/ToastOriginalMessageNotFound");
var import_ToastPinnedConversationsFull = require("../components/ToastPinnedConversationsFull");
var import_ToastReactionFailed = require("../components/ToastReactionFailed");
var import_ToastReportedSpamAndBlocked = require("../components/ToastReportedSpamAndBlocked");
var import_ToastTapToViewExpiredIncoming = require("../components/ToastTapToViewExpiredIncoming");
var import_ToastTapToViewExpiredOutgoing = require("../components/ToastTapToViewExpiredOutgoing");
var import_ToastUnableToLoadAttachment = require("../components/ToastUnableToLoadAttachment");
var import_ToastCannotOpenGiftBadge = require("../components/ToastCannotOpenGiftBadge");
var import_deleteDraftAttachment = require("../util/deleteDraftAttachment");
var import_markAllAsApproved = require("../util/markAllAsApproved");
var import_markAllAsVerifiedDefault = require("../util/markAllAsVerifiedDefault");
var import_retryMessageSend = require("../util/retryMessageSend");
var import_isNotNil = require("../util/isNotNil");
var import_MessageUpdater = require("../services/MessageUpdater");
var import_openLinkInWebBrowser = require("../util/openLinkInWebBrowser");
var import_resolveAttachmentDraftData = require("../util/resolveAttachmentDraftData");
var import_showToast = require("../util/showToast");
var import_viewSyncJobQueue = require("../jobs/viewSyncJobQueue");
var import_viewedReceiptsJobQueue = require("../jobs/viewedReceiptsJobQueue");
var import_audioRecorder = require("../state/ducks/audioRecorder");
var import_UUID = require("../types/UUID");
var import_retryDeleteForEveryone = require("../util/retryDeleteForEveryone");
var import_ContactDetail = require("../components/conversation/ContactDetail");
var import_MediaGallery = require("../components/conversation/media-gallery/MediaGallery");
var import_LinkPreview = require("../services/LinkPreview");
var import_LinkPreview2 = require("../types/LinkPreview");
var import_showLightbox = require("../util/showLightbox");
const FIVE_MINUTES = 1e3 * 60 * 5;
const { Message } = window.Signal.Types;
const {
  copyIntoTempDirectory,
  deleteTempFile,
  getAbsoluteAttachmentPath,
  getAbsoluteTempPath,
  loadAttachmentData,
  loadContactData,
  loadPreviewData,
  loadStickerData,
  openFileInFolder,
  readAttachmentData,
  saveAttachmentToDisk,
  upgradeMessageSchema
} = window.Signal.Migrations;
const { getMessagesBySentAt } = window.Signal.Data;
const MAX_MESSAGE_BODY_LENGTH = 64 * 1024;
class ConversationView extends window.Backbone.View {
  constructor(...args) {
    super(...args);
    this.compositionApi = { current: void 0 };
    this.panels = [];
    this.lazyUpdateVerified = (0, import_lodash.debounce)(this.model.updateVerified.bind(this.model), 1e3);
    this.model.throttledGetProfiles = this.model.throttledGetProfiles || (0, import_lodash.throttle)(this.model.getProfiles.bind(this.model), FIVE_MINUTES);
    this.debouncedSaveDraft = (0, import_lodash.debounce)(this.saveDraft.bind(this), 200);
    this.listenTo(this.model, "destroy", this.stopListening);
    this.listenTo(this.model, "newmessage", this.lazyUpdateVerified);
    this.listenTo(this.model, "opened", this.onOpened);
    this.listenTo(this.model, "scroll-to-message", this.scrollToMessage);
    this.listenTo(this.model, "unload", (reason) => this.unload(`model trigger - ${reason}`));
    this.listenTo(this.model, "focus-composer", this.focusMessageField);
    this.listenTo(this.model, "open-all-media", this.showAllMedia);
    this.listenTo(this.model, "escape-pressed", this.resetPanel);
    this.listenTo(this.model, "show-message-details", this.showMessageDetail);
    this.listenTo(this.model, "show-contact-modal", this.showContactModal);
    this.listenTo(this.model, "toggle-reply", (messageId) => {
      const target = this.quote || !messageId ? null : messageId;
      this.setQuoteMessage(target);
    });
    this.listenTo(this.model, "save-attachment", this.downloadAttachmentWrapper);
    this.listenTo(this.model, "delete-message", this.deleteMessage);
    this.listenTo(this.model, "remove-link-review", import_LinkPreview.removeLinkPreview);
    this.listenTo(this.model, "remove-all-draft-attachments", this.clearAttachments);
    this.render();
    this.setupConversationView();
    this.updateAttachmentsView();
  }
  events() {
    return {
      drop: "onDrop",
      paste: "onPaste"
    };
  }
  className() {
    return "conversation";
  }
  id() {
    return `conversation-${this.model.cid}`;
  }
  render() {
    const template = $("#conversation").html();
    this.$el.html((0, import_mustache.render)(template, {}));
    return this;
  }
  setMuteExpiration(ms = 0) {
    this.model.setMuteExpiration(ms >= Number.MAX_SAFE_INTEGER ? ms : Date.now() + ms);
  }
  setPin(value) {
    if (value) {
      const pinnedConversationIds = window.storage.get("pinnedConversationIds", new Array());
      if (pinnedConversationIds.length >= 4) {
        (0, import_showToast.showToast)(import_ToastPinnedConversationsFull.ToastPinnedConversationsFull);
        return;
      }
      this.model.pin();
    } else {
      this.model.unpin();
    }
  }
  setupConversationView() {
    const conversationHeaderProps = {
      id: this.model.id,
      onSetDisappearingMessages: (seconds) => this.setDisappearingMessages(seconds),
      onDeleteMessages: () => this.destroyMessages(),
      onSearchInConversation: () => {
        const { searchInConversation } = window.reduxActions.search;
        searchInConversation(this.model.id);
      },
      onSetMuteNotifications: this.setMuteExpiration.bind(this),
      onSetPin: this.setPin.bind(this),
      onOutgoingAudioCallInConversation: this.onOutgoingAudioCallInConversation.bind(this),
      onOutgoingVideoCallInConversation: this.onOutgoingVideoCallInConversation.bind(this),
      onShowConversationDetails: () => {
        this.showConversationDetails();
      },
      onShowAllMedia: () => {
        this.showAllMedia();
      },
      onShowGroupMembers: () => {
        this.showGV1Members();
      },
      onGoBack: () => {
        this.resetPanel();
      },
      onArchive: () => {
        this.model.setArchived(true);
        this.model.trigger("unload", "archive");
        (0, import_showToast.showToast)(import_ToastConversationArchived.ToastConversationArchived, {
          undo: () => {
            this.model.setArchived(false);
            this.openConversation(this.model.get("id"));
          }
        });
      },
      onMarkUnread: () => {
        this.model.setMarkedUnread(true);
        (0, import_showToast.showToast)(import_ToastConversationMarkedUnread.ToastConversationMarkedUnread);
      },
      onMoveToInbox: () => {
        this.model.setArchived(false);
        (0, import_showToast.showToast)(import_ToastConversationUnarchived.ToastConversationUnarchived);
      }
    };
    window.reduxActions.conversations.setSelectedConversationHeaderTitle();
    const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
    const contactSupport = /* @__PURE__ */ __name(() => {
      const baseUrl = "https://support.signal.org/hc/LOCALE/requests/new?desktop&chat_refreshed";
      const locale = window.getLocale();
      const supportLocale = window.Signal.Util.mapToSupportLocale(locale);
      const url = baseUrl.replace("LOCALE", supportLocale);
      (0, import_openLinkInWebBrowser.openLinkInWebBrowser)(url);
    }, "contactSupport");
    const learnMoreAboutDeliveryIssue = /* @__PURE__ */ __name(() => {
      (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://support.signal.org/hc/articles/4404859745690");
    }, "learnMoreAboutDeliveryIssue");
    const scrollToQuotedMessage = /* @__PURE__ */ __name(async (options) => {
      const { authorId, sentAt } = options;
      const conversationId = this.model.id;
      const messages = await getMessagesBySentAt(sentAt);
      const message = messages.find((item) => Boolean(item.conversationId === conversationId && authorId && (0, import_helpers.getContactId)(item) === authorId));
      if (!message) {
        (0, import_showToast.showToast)(import_ToastOriginalMessageNotFound.ToastOriginalMessageNotFound);
        return;
      }
      this.scrollToMessage(message.id);
    }, "scrollToQuotedMessage");
    const markMessageRead = /* @__PURE__ */ __name(async (messageId) => {
      if (!window.isActive()) {
        return;
      }
      const activeCall = (0, import_calling.getActiveCallState)(window.reduxStore.getState());
      if (activeCall && !activeCall.pip) {
        return;
      }
      const message = await (0, import_getMessageById.getMessageById)(messageId);
      if (!message) {
        throw new Error(`markMessageRead: failed to load message ${messageId}`);
      }
      await this.model.markRead(message.get("received_at"), {
        newestSentAt: message.get("sent_at"),
        sendReadReceipts: true
      });
    }, "markMessageRead");
    const createMessageRequestResponseHandler = /* @__PURE__ */ __name((name, enumValue) => (conversationId) => {
      const conversation = window.ConversationController.get(conversationId);
      if (!conversation) {
        log.error(`createMessageRequestResponseHandler: Expected a conversation to be found in ${name}. Doing nothing`);
        return;
      }
      this.syncMessageRequestResponse(name, conversation, enumValue);
    }, "createMessageRequestResponseHandler");
    const timelineProps = {
      id: this.model.id,
      ...this.getMessageActions(),
      acknowledgeGroupMemberNameCollisions: (groupNameCollisions) => {
        this.model.acknowledgeGroupMemberNameCollisions(groupNameCollisions);
      },
      blockGroupLinkRequests: (uuid) => {
        this.model.blockGroupLinkRequests(uuid);
      },
      contactSupport,
      learnMoreAboutDeliveryIssue,
      loadNewerMessages: this.model.loadNewerMessages.bind(this.model),
      loadNewestMessages: this.model.loadNewestMessages.bind(this.model),
      loadOlderMessages: this.model.loadOlderMessages.bind(this.model),
      markMessageRead,
      onBlock: createMessageRequestResponseHandler("onBlock", messageRequestEnum.BLOCK),
      onBlockAndReportSpam: (conversationId) => {
        const conversation = window.ConversationController.get(conversationId);
        if (!conversation) {
          log.error(`onBlockAndReportSpam: Expected a conversation to be found for ${conversationId}. Doing nothing.`);
          return;
        }
        this.blockAndReportSpam(conversation);
      },
      onDelete: createMessageRequestResponseHandler("onDelete", messageRequestEnum.DELETE),
      onUnblock: createMessageRequestResponseHandler("onUnblock", messageRequestEnum.ACCEPT),
      removeMember: (conversationId) => {
        this.longRunningTaskWrapper({
          name: "removeMember",
          task: () => this.model.removeFromGroupV2(conversationId)
        });
      },
      scrollToQuotedMessage,
      unblurAvatar: () => {
        this.model.unblurAvatar();
      },
      updateSharedGroups: () => this.model.throttledUpdateSharedGroups?.()
    };
    window.reduxActions.composer.resetComposer();
    const compositionAreaProps = {
      id: this.model.id,
      compositionApi: this.compositionApi,
      onClickAddPack: () => this.showStickerManager(),
      onPickSticker: (packId, stickerId) => this.sendStickerMessage({ packId, stickerId }),
      onEditorStateChange: (msg, bodyRanges, caretLocation) => this.onEditorStateChange(msg, bodyRanges, caretLocation),
      onTextTooLong: () => (0, import_showToast.showToast)(import_ToastMessageBodyTooLong.ToastMessageBodyTooLong),
      getQuotedMessage: () => this.model.get("quotedMessageId"),
      clearQuotedMessage: () => this.setQuoteMessage(null),
      onAccept: () => {
        this.syncMessageRequestResponse("onAccept", this.model, messageRequestEnum.ACCEPT);
      },
      onBlock: () => {
        this.syncMessageRequestResponse("onBlock", this.model, messageRequestEnum.BLOCK);
      },
      onUnblock: () => {
        this.syncMessageRequestResponse("onUnblock", this.model, messageRequestEnum.ACCEPT);
      },
      onDelete: () => {
        this.syncMessageRequestResponse("onDelete", this.model, messageRequestEnum.DELETE);
      },
      onBlockAndReportSpam: () => {
        this.blockAndReportSpam(this.model);
      },
      onStartGroupMigration: () => this.startMigrationToGV2(),
      onCancelJoinRequest: async () => {
        await window.showConfirmationDialog({
          message: window.i18n("GroupV2--join--cancel-request-to-join--confirmation"),
          okText: window.i18n("GroupV2--join--cancel-request-to-join--yes"),
          cancelText: window.i18n("GroupV2--join--cancel-request-to-join--no"),
          resolve: () => {
            this.longRunningTaskWrapper({
              name: "onCancelJoinRequest",
              task: async () => this.model.cancelJoinRequest()
            });
          }
        });
      },
      onClearAttachments: this.clearAttachments.bind(this),
      onSelectMediaQuality: (isHQ) => {
        window.reduxActions.composer.setMediaQualitySetting(isHQ);
      },
      handleClickQuotedMessage: (id) => this.scrollToMessage(id),
      onCloseLinkPreview: () => {
        (0, import_LinkPreview.suspendLinkPreviews)();
        (0, import_LinkPreview.removeLinkPreview)();
      },
      openConversation: this.openConversation.bind(this),
      onSendMessage: ({
        draftAttachments,
        mentions = [],
        message = "",
        timestamp,
        voiceNoteAttachment
      }) => {
        this.sendMessage(message, mentions, {
          draftAttachments,
          timestamp,
          voiceNoteAttachment
        });
      }
    };
    const JSX = (0, import_createConversationView.createConversationView)(window.reduxStore, {
      compositionAreaProps,
      conversationHeaderProps,
      timelineProps
    });
    this.conversationView = new import_ReactWrapperView.ReactWrapperView({ JSX });
    this.$(".ConversationView__template").append(this.conversationView.el);
  }
  async onOutgoingVideoCallInConversation() {
    log.info("onOutgoingVideoCallInConversation: about to start a video call");
    if (this.model.get("announcementsOnly") && !this.model.areWeAdmin()) {
      (0, import_showToast.showToast)(import_ToastCannotStartGroupCall.ToastCannotStartGroupCall);
      return;
    }
    if (await this.isCallSafe()) {
      log.info('onOutgoingVideoCallInConversation: call is deemed "safe". Making call');
      window.reduxActions.calling.startCallingLobby({
        conversationId: this.model.id,
        isVideoCall: true
      });
      log.info("onOutgoingVideoCallInConversation: started the call");
    } else {
      log.info('onOutgoingVideoCallInConversation: call is deemed "unsafe". Stopping');
    }
  }
  async onOutgoingAudioCallInConversation() {
    log.info("onOutgoingAudioCallInConversation: about to start an audio call");
    if (await this.isCallSafe()) {
      log.info('onOutgoingAudioCallInConversation: call is deemed "safe". Making call');
      window.reduxActions.calling.startCallingLobby({
        conversationId: this.model.id,
        isVideoCall: false
      });
      log.info("onOutgoingAudioCallInConversation: started the call");
    } else {
      log.info('onOutgoingAudioCallInConversation: call is deemed "unsafe". Stopping');
    }
  }
  async longRunningTaskWrapper({
    name,
    task
  }) {
    const idForLogging = this.model.idForLogging();
    return window.Signal.Util.longRunningTaskWrapper({
      name,
      idForLogging,
      task
    });
  }
  getMessageActions() {
    const reactToMessage = /* @__PURE__ */ __name(async (messageId, reaction) => {
      const { emoji, remove } = reaction;
      try {
        await (0, import_enqueueReactionForSend.enqueueReactionForSend)({
          messageId,
          emoji,
          remove
        });
      } catch (error) {
        log.error("Error sending reaction", error, messageId, reaction);
        (0, import_showToast.showToast)(import_ToastReactionFailed.ToastReactionFailed);
      }
    }, "reactToMessage");
    const replyToMessage = /* @__PURE__ */ __name((messageId) => {
      this.setQuoteMessage(messageId);
    }, "replyToMessage");
    const retrySend = import_retryMessageSend.retryMessageSend;
    const deleteMessage = /* @__PURE__ */ __name((messageId) => {
      this.deleteMessage(messageId);
    }, "deleteMessage");
    const deleteMessageForEveryone = /* @__PURE__ */ __name((messageId) => {
      this.deleteMessageForEveryone(messageId);
    }, "deleteMessageForEveryone");
    const showMessageDetail = /* @__PURE__ */ __name((messageId) => {
      this.showMessageDetail(messageId);
    }, "showMessageDetail");
    const showContactModal = /* @__PURE__ */ __name((contactId) => {
      this.showContactModal(contactId);
    }, "showContactModal");
    const openConversation = /* @__PURE__ */ __name((conversationId, messageId) => {
      this.openConversation(conversationId, messageId);
    }, "openConversation");
    const showContactDetail = /* @__PURE__ */ __name((options) => {
      this.showContactDetail(options);
    }, "showContactDetail");
    const kickOffAttachmentDownload = /* @__PURE__ */ __name(async (options) => {
      const message = window.MessageController.getById(options.messageId);
      if (!message) {
        throw new Error(`kickOffAttachmentDownload: Message ${options.messageId} missing!`);
      }
      await message.queueAttachmentDownloads();
    }, "kickOffAttachmentDownload");
    const markAttachmentAsCorrupted = /* @__PURE__ */ __name((options) => {
      const message = window.MessageController.getById(options.messageId);
      if (!message) {
        throw new Error(`markAttachmentAsCorrupted: Message ${options.messageId} missing!`);
      }
      message.markAttachmentAsCorrupted(options.attachment);
    }, "markAttachmentAsCorrupted");
    const onMarkViewed = /* @__PURE__ */ __name((messageId) => {
      const message = window.MessageController.getById(messageId);
      if (!message) {
        throw new Error(`onMarkViewed: Message ${messageId} missing!`);
      }
      if (message.get("readStatus") === import_MessageReadStatus.ReadStatus.Viewed) {
        return;
      }
      const senderE164 = message.get("source");
      const senderUuid = message.get("sourceUuid");
      const timestamp = message.get("sent_at");
      message.set((0, import_MessageUpdater.markViewed)(message.attributes, Date.now()));
      if ((0, import_message.isIncoming)(message.attributes)) {
        import_viewedReceiptsJobQueue.viewedReceiptsJobQueue.add({
          viewedReceipt: {
            messageId,
            senderE164,
            senderUuid,
            timestamp
          }
        });
      }
      import_viewSyncJobQueue.viewSyncJobQueue.add({
        viewSyncs: [
          {
            messageId,
            senderE164,
            senderUuid,
            timestamp
          }
        ]
      });
    }, "onMarkViewed");
    const showVisualAttachment = /* @__PURE__ */ __name((options) => {
      this.showLightbox(options);
    }, "showVisualAttachment");
    const downloadAttachment = /* @__PURE__ */ __name((options) => {
      this.downloadAttachment(options);
    }, "downloadAttachment");
    const displayTapToViewMessage = /* @__PURE__ */ __name((messageId) => this.displayTapToViewMessage(messageId), "displayTapToViewMessage");
    const showIdentity = /* @__PURE__ */ __name((conversationId) => {
      this.showSafetyNumber(conversationId);
    }, "showIdentity");
    const openGiftBadge = /* @__PURE__ */ __name((messageId) => {
      const message = window.MessageController.getById(messageId);
      if (!message) {
        throw new Error(`openGiftBadge: Message ${messageId} missing!`);
      }
      (0, import_showToast.showToast)(import_ToastCannotOpenGiftBadge.ToastCannotOpenGiftBadge, {
        isIncoming: (0, import_message.isIncoming)(message.attributes)
      });
    }, "openGiftBadge");
    const openLink = import_openLinkInWebBrowser.openLinkInWebBrowser;
    const downloadNewVersion = /* @__PURE__ */ __name(() => {
      (0, import_openLinkInWebBrowser.openLinkInWebBrowser)("https://signal.org/download");
    }, "downloadNewVersion");
    const showSafetyNumber = /* @__PURE__ */ __name((contactId) => {
      this.showSafetyNumber(contactId);
    }, "showSafetyNumber");
    const showExpiredIncomingTapToViewToast = /* @__PURE__ */ __name(() => {
      log.info("Showing expired tap-to-view toast for an incoming message");
      (0, import_showToast.showToast)(import_ToastTapToViewExpiredIncoming.ToastTapToViewExpiredIncoming);
    }, "showExpiredIncomingTapToViewToast");
    const showExpiredOutgoingTapToViewToast = /* @__PURE__ */ __name(() => {
      log.info("Showing expired tap-to-view toast for an outgoing message");
      (0, import_showToast.showToast)(import_ToastTapToViewExpiredOutgoing.ToastTapToViewExpiredOutgoing);
    }, "showExpiredOutgoingTapToViewToast");
    const showForwardMessageModal = this.showForwardMessageModal.bind(this);
    const startConversation = this.startConversation.bind(this);
    return {
      deleteMessage,
      deleteMessageForEveryone,
      displayTapToViewMessage,
      downloadAttachment,
      downloadNewVersion,
      kickOffAttachmentDownload,
      markAttachmentAsCorrupted,
      markViewed: onMarkViewed,
      openConversation,
      openGiftBadge,
      openLink,
      reactToMessage,
      replyToMessage,
      retrySend,
      retryDeleteForEveryone: import_retryDeleteForEveryone.retryDeleteForEveryone,
      showContactDetail,
      showContactModal,
      showSafetyNumber,
      showExpiredIncomingTapToViewToast,
      showExpiredOutgoingTapToViewToast,
      showForwardMessageModal,
      showIdentity,
      showMessageDetail,
      showVisualAttachment,
      startConversation
    };
  }
  async scrollToMessage(messageId) {
    const message = await (0, import_getMessageById.getMessageById)(messageId);
    if (!message) {
      throw new Error(`scrollToMessage: failed to load message ${messageId}`);
    }
    const state = window.reduxStore.getState();
    let isInMemory = true;
    if (!window.MessageController.getById(messageId)) {
      isInMemory = false;
    }
    const messagesByConversation = (0, import_conversations.getMessagesByConversation)(state)[this.model.id];
    if (!messagesByConversation?.messageIds.includes(messageId)) {
      isInMemory = false;
    }
    if (isInMemory) {
      const { scrollToMessage } = window.reduxActions.conversations;
      scrollToMessage(this.model.id, messageId);
      return;
    }
    this.model.loadAndScroll(messageId);
  }
  async startMigrationToGV2() {
    const logId = this.model.idForLogging();
    if (!(0, import_whatTypeOfConversation.isGroupV1)(this.model.attributes)) {
      throw new Error(`startMigrationToGV2/${logId}: Cannot start, not a GroupV1 group`);
    }
    const onClose = /* @__PURE__ */ __name(() => {
      if (this.migrationDialog) {
        this.migrationDialog.remove();
        this.migrationDialog = void 0;
      }
    }, "onClose");
    onClose();
    const migrate = /* @__PURE__ */ __name(() => {
      onClose();
      this.longRunningTaskWrapper({
        name: "initiateMigrationToGroupV2",
        task: () => window.Signal.Groups.initiateMigrationToGroupV2(this.model)
      });
    }, "migrate");
    const { droppedGV2MemberIds, pendingMembersV2 } = await this.longRunningTaskWrapper({
      name: "getGroupMigrationMembers",
      task: () => window.Signal.Groups.getGroupMigrationMembers(this.model)
    });
    const invitedMemberIds = pendingMembersV2.map((item) => item.uuid);
    this.migrationDialog = new import_ReactWrapperView.ReactWrapperView({
      className: "group-v1-migration-wrapper",
      JSX: window.Signal.State.Roots.createGroupV1MigrationModal(window.reduxStore, {
        areWeInvited: false,
        droppedMemberIds: droppedGV2MemberIds,
        hasMigrated: false,
        invitedMemberIds,
        migrate,
        onClose
      })
    });
  }
  async processAttachments(files) {
    const state = window.reduxStore.getState();
    const isRecording = state.audioRecorder.recordingState === import_audioRecorder.RecordingState.Recording;
    if ((0, import_LinkPreview.hasLinkPreviewLoaded)() || isRecording) {
      return;
    }
    const {
      addAttachment,
      addPendingAttachment,
      processAttachments,
      removeAttachment
    } = window.reduxActions.composer;
    await processAttachments({
      addAttachment,
      addPendingAttachment,
      conversationId: this.model.id,
      draftAttachments: this.model.get("draftAttachments") || [],
      files,
      onShowToast: (toastType) => {
        if (toastType === import_AttachmentToastType.AttachmentToastType.ToastFileSize) {
          (0, import_showToast.showToast)(import_ToastFileSize.ToastFileSize, {
            limit: 100,
            units: "MB"
          });
        } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastDangerousFileType) {
          (0, import_showToast.showToast)(import_ToastDangerousFileType.ToastDangerousFileType);
        } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastMaxAttachments) {
          (0, import_showToast.showToast)(import_ToastMaxAttachments.ToastMaxAttachments);
        } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastOneNonImageAtATime) {
          (0, import_showToast.showToast)(import_ToastOneNonImageAtATime.ToastOneNonImageAtATime);
        } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastCannotMixImageAndNonImageAttachments) {
          (0, import_showToast.showToast)(import_ToastCannotMixImageAndNonImageAttachments.ToastCannotMixImageAndNonImageAttachments);
        } else if (toastType === import_AttachmentToastType.AttachmentToastType.ToastUnableToLoadAttachment) {
          (0, import_showToast.showToast)(import_ToastUnableToLoadAttachment.ToastUnableToLoadAttachment);
        }
      },
      removeAttachment
    });
  }
  unload(reason) {
    log.info("unloading conversation", this.model.idForLogging(), "due to:", reason);
    const { conversationUnloaded } = window.reduxActions.conversations;
    if (conversationUnloaded) {
      conversationUnloaded(this.model.id);
    }
    if (this.model.get("draftChanged")) {
      if (this.model.hasDraft()) {
        const now = Date.now();
        const active_at = this.model.get("active_at") || now;
        this.model.set({
          active_at,
          draftChanged: false,
          draftTimestamp: now,
          timestamp: now
        });
      } else {
        this.model.set({
          draftChanged: false,
          draftTimestamp: null
        });
      }
      this.saveModel();
      this.model.updateLastMessage();
    }
    this.conversationView?.remove();
    if (this.contactModalView) {
      this.contactModalView.remove();
    }
    if (this.stickerPreviewModalView) {
      this.stickerPreviewModalView.remove();
    }
    if (this.lightboxView) {
      this.lightboxView.remove();
    }
    if (this.panels && this.panels.length) {
      for (let i = 0, max = this.panels.length; i < max; i += 1) {
        const panel = this.panels[i];
        panel.view.remove();
      }
      window.reduxActions.conversations.setSelectedConversationPanelDepth(0);
    }
    (0, import_LinkPreview.removeLinkPreview)();
    (0, import_LinkPreview.suspendLinkPreviews)();
    this.remove();
  }
  async onDrop(e) {
    if (!e.originalEvent) {
      return;
    }
    const event = e.originalEvent;
    if (!event.dataTransfer) {
      return;
    }
    if (event.dataTransfer.types[0] !== "Files") {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const { files } = event.dataTransfer;
    this.processAttachments(Array.from(files));
  }
  onPaste(e) {
    if (!e.originalEvent) {
      return;
    }
    const event = e.originalEvent;
    if (!event.clipboardData) {
      return;
    }
    const { items } = event.clipboardData;
    const anyImages = [...items].some((item) => item.type.split("/")[0] === "image");
    if (!anyImages) {
      return;
    }
    e.stopPropagation();
    e.preventDefault();
    const files = [];
    for (let i = 0; i < items.length; i += 1) {
      if (items[i].type.split("/")[0] === "image") {
        const file = items[i].getAsFile();
        if (file) {
          files.push(file);
        }
      }
    }
    this.processAttachments(files);
  }
  syncMessageRequestResponse(name, model, messageRequestType) {
    return this.longRunningTaskWrapper({
      name,
      task: model.syncMessageRequestResponse.bind(model, messageRequestType)
    });
  }
  blockAndReportSpam(model) {
    const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
    return this.longRunningTaskWrapper({
      name: "blockAndReportSpam",
      task: async () => {
        await Promise.all([
          model.syncMessageRequestResponse(messageRequestEnum.BLOCK),
          (0, import_addReportSpamJob.addReportSpamJob)({
            conversation: model.format(),
            getMessageServerGuidsForSpam: window.Signal.Data.getMessageServerGuidsForSpam,
            jobQueue: import_reportSpamJobQueue.reportSpamJobQueue
          })
        ]);
        (0, import_showToast.showToast)(import_ToastReportedSpamAndBlocked.ToastReportedSpamAndBlocked);
      }
    });
  }
  async saveModel() {
    window.Signal.Data.updateConversation(this.model.attributes);
  }
  async clearAttachments() {
    const draftAttachments = this.model.get("draftAttachments") || [];
    this.model.set({
      draftAttachments: [],
      draftChanged: true
    });
    this.updateAttachmentsView();
    await Promise.all([
      this.saveModel(),
      Promise.all(draftAttachments.map((attachment) => (0, import_deleteDraftAttachment.deleteDraftAttachment)(attachment)))
    ]);
  }
  hasFiles(options) {
    const draftAttachments = this.model.get("draftAttachments") || [];
    if (options.includePending) {
      return draftAttachments.length > 0;
    }
    return draftAttachments.some((item) => !item.pending);
  }
  updateAttachmentsView() {
    const draftAttachments = this.model.get("draftAttachments") || [];
    window.reduxActions.composer.replaceAttachments(this.model.get("id"), draftAttachments);
    if (this.hasFiles({ includePending: true })) {
      (0, import_LinkPreview.removeLinkPreview)();
    }
  }
  async onOpened(messageId) {
    this.model.onOpenStart();
    if (messageId) {
      const message = await (0, import_getMessageById.getMessageById)(messageId);
      if (message) {
        this.model.loadAndScroll(messageId);
        return;
      }
      log.warn(`onOpened: Did not find message ${messageId}`);
    }
    const { retryPlaceholders } = window.Signal.Services;
    if (retryPlaceholders) {
      await retryPlaceholders.findByConversationAndMarkOpened(this.model.id);
    }
    const loadAndUpdate = /* @__PURE__ */ __name(async () => {
      Promise.all([
        this.model.loadNewestMessages(void 0, void 0),
        this.model.updateLastMessage(),
        this.model.updateUnread()
      ]);
    }, "loadAndUpdate");
    loadAndUpdate();
    this.focusMessageField();
    const quotedMessageId = this.model.get("quotedMessageId");
    if (quotedMessageId) {
      this.setQuoteMessage(quotedMessageId);
    }
    this.model.fetchLatestGroupV2Data();
    (0, import_assert.strictAssert)(this.model.throttledMaybeMigrateV1Group !== void 0, "Conversation model should be initialized");
    this.model.throttledMaybeMigrateV1Group();
    (0, import_assert.strictAssert)(this.model.throttledFetchSMSOnlyUUID !== void 0, "Conversation model should be initialized");
    this.model.throttledFetchSMSOnlyUUID();
    const ourUuid = window.textsecure.storage.user.getUuid(import_UUID.UUIDKind.ACI);
    if (!(0, import_whatTypeOfConversation.isGroup)(this.model.attributes) || ourUuid && this.model.hasMember(ourUuid.toString())) {
      (0, import_assert.strictAssert)(this.model.throttledGetProfiles !== void 0, "Conversation model should be initialized");
      await this.model.throttledGetProfiles();
    }
    this.model.updateVerified();
  }
  async showForwardMessageModal(messageId) {
    const message = await (0, import_getMessageById.getMessageById)(messageId);
    if (!message) {
      throw new Error(`showForwardMessageModal: Message ${messageId} missing!`);
    }
    const attachments = (0, import_message.getAttachmentsForMessage)(message.attributes);
    const doForwardMessage = /* @__PURE__ */ __name(async (conversationIds, messageBody, includedAttachments, linkPreview) => {
      try {
        const didForwardSuccessfully = await this.maybeForwardMessage(message, conversationIds, messageBody, includedAttachments, linkPreview);
        if (didForwardSuccessfully && this.forwardMessageModal) {
          this.forwardMessageModal.remove();
          this.forwardMessageModal = void 0;
        }
      } catch (err) {
        log.warn("doForwardMessage", err && err.stack ? err.stack : err);
      }
    }, "doForwardMessage");
    this.forwardMessageModal = new import_ReactWrapperView.ReactWrapperView({
      JSX: window.Signal.State.Roots.createForwardMessageModal(window.reduxStore, {
        attachments,
        doForwardMessage,
        hasContact: Boolean(message.get("contact")?.length),
        isSticker: Boolean(message.get("sticker")),
        messageBody: message.getRawText(),
        onClose: () => {
          if (this.forwardMessageModal) {
            this.forwardMessageModal.remove();
            this.forwardMessageModal = void 0;
          }
          (0, import_LinkPreview.resetLinkPreview)();
        },
        onEditorStateChange: (messageText, _, caretLocation) => {
          if (!attachments.length) {
            (0, import_LinkPreview.maybeGrabLinkPreview)(messageText, import_LinkPreview2.LinkPreviewSourceType.ForwardMessageModal, caretLocation);
          }
        },
        onTextTooLong: () => (0, import_showToast.showToast)(import_ToastMessageBodyTooLong.ToastMessageBodyTooLong)
      })
    });
    this.forwardMessageModal.render();
  }
  async maybeForwardMessage(message, conversationIds, messageBody, attachments, linkPreview) {
    log.info(`maybeForwardMessage/${message.idForLogging()}: Starting...`);
    const attachmentLookup = /* @__PURE__ */ new Set();
    if (attachments) {
      attachments.forEach((attachment) => {
        attachmentLookup.add(`${attachment.fileName}/${attachment.contentType}`);
      });
    }
    const conversations = conversationIds.map((id) => window.ConversationController.get(id));
    const cannotSend = conversations.some((conversation) => conversation?.get("announcementsOnly") && !conversation.areWeAdmin());
    if (cannotSend) {
      throw new Error("Cannot send to group");
    }
    const unverifiedContacts = [];
    const untrustedContacts = [];
    await Promise.all(conversations.map(async (conversation) => {
      if (conversation) {
        await conversation.updateVerified();
        const unverifieds = conversation.getUnverified();
        if (unverifieds.length) {
          unverifieds.forEach((unverifiedConversation) => unverifiedContacts.push(unverifiedConversation));
        }
        const untrusted = conversation.getUntrusted();
        if (untrusted.length) {
          untrusted.forEach((untrustedConversation) => untrustedContacts.push(untrustedConversation));
        }
      }
    }));
    const iffyConversations = [...unverifiedContacts, ...untrustedContacts];
    if (iffyConversations.length) {
      const forwardMessageModal = document.querySelector(".module-ForwardMessageModal");
      if (forwardMessageModal) {
        forwardMessageModal.style.display = "none";
      }
      const sendAnyway = await this.showSendAnywayDialog(iffyConversations);
      if (!sendAnyway) {
        if (forwardMessageModal) {
          forwardMessageModal.style.display = "block";
        }
        return false;
      }
      let verifyPromise;
      let approvePromise;
      if (unverifiedContacts.length) {
        verifyPromise = (0, import_markAllAsVerifiedDefault.markAllAsVerifiedDefault)(unverifiedContacts);
      }
      if (untrustedContacts.length) {
        approvePromise = (0, import_markAllAsApproved.markAllAsApproved)(untrustedContacts);
      }
      await Promise.all([verifyPromise, approvePromise]);
    }
    const sendMessageOptions = { dontClearDraft: true };
    const baseTimestamp = Date.now();
    await Promise.all(conversations.map(async (conversation, offset) => {
      const timestamp = baseTimestamp + offset;
      if (conversation) {
        const sticker = message.get("sticker");
        const contact = message.get("contact");
        if (sticker) {
          const stickerWithData = await loadStickerData(sticker);
          const stickerNoPath = stickerWithData ? {
            ...stickerWithData,
            data: {
              ...stickerWithData.data,
              path: void 0
            }
          } : void 0;
          conversation.enqueueMessageForSend({
            body: void 0,
            attachments: [],
            sticker: stickerNoPath
          }, { ...sendMessageOptions, timestamp });
        } else if (contact?.length) {
          const contactWithHydratedAvatar = await loadContactData(contact);
          conversation.enqueueMessageForSend({
            body: void 0,
            attachments: [],
            contact: contactWithHydratedAvatar
          }, { ...sendMessageOptions, timestamp });
        } else {
          const preview = linkPreview ? await loadPreviewData([linkPreview]) : [];
          const attachmentsWithData = await Promise.all((attachments || []).map(async (item) => ({
            ...await loadAttachmentData(item),
            path: void 0
          })));
          const attachmentsToSend = attachmentsWithData.filter((attachment) => attachmentLookup.has(`${attachment.fileName}/${attachment.contentType}`));
          conversation.enqueueMessageForSend({
            body: messageBody || void 0,
            attachments: attachmentsToSend,
            preview
          }, { ...sendMessageOptions, timestamp });
        }
      }
    }));
    (0, import_LinkPreview.resetLinkPreview)();
    return true;
  }
  showAllMedia() {
    if (document.querySelectorAll(".module-media-gallery").length) {
      return;
    }
    const DEFAULT_MEDIA_FETCH_COUNT = 50;
    const DEFAULT_DOCUMENTS_FETCH_COUNT = 150;
    const conversationId = this.model.get("id");
    const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
    const getProps = /* @__PURE__ */ __name(async () => {
      const rawMedia = await window.Signal.Data.getMessagesWithVisualMediaAttachments(conversationId, {
        limit: DEFAULT_MEDIA_FETCH_COUNT
      });
      const rawDocuments = await window.Signal.Data.getMessagesWithFileAttachments(conversationId, {
        limit: DEFAULT_DOCUMENTS_FETCH_COUNT
      });
      for (let max = rawMedia.length, i = 0; i < max; i += 1) {
        const message = rawMedia[i];
        const { schemaVersion } = message;
        if (schemaVersion && schemaVersion < Message.VERSION_NEEDED_FOR_DISPLAY) {
          rawMedia[i] = await upgradeMessageSchema(message);
          await window.Signal.Data.saveMessage(rawMedia[i], { ourUuid });
        }
      }
      const media = (0, import_lodash.flatten)(rawMedia.map((message) => {
        return (message.attachments || []).map((attachment, index) => {
          if (!attachment.path || !attachment.thumbnail || attachment.pending || attachment.error) {
            return;
          }
          const { thumbnail } = attachment;
          return {
            path: attachment.path,
            objectURL: getAbsoluteAttachmentPath(attachment.path),
            thumbnailObjectUrl: thumbnail?.path ? getAbsoluteAttachmentPath(thumbnail.path) : void 0,
            contentType: attachment.contentType,
            index,
            attachment,
            message: {
              attachments: message.attachments || [],
              conversationId: window.ConversationController.get(window.ConversationController.ensureContactIds({
                uuid: message.sourceUuid,
                e164: message.source
              }))?.id || message.conversationId,
              id: message.id,
              received_at: message.received_at,
              received_at_ms: Number(message.received_at_ms),
              sent_at: message.sent_at
            }
          };
        });
      })).filter(import_isNotNil.isNotNil);
      const documents = [];
      rawDocuments.forEach((message) => {
        const attachments = message.attachments || [];
        const attachment = attachments[0];
        if (!attachment) {
          return;
        }
        documents.push({
          contentType: attachment.contentType,
          index: 0,
          attachment,
          message
        });
      });
      const saveAttachment = /* @__PURE__ */ __name(async ({
        attachment,
        message
      }) => {
        const timestamp = message.sent_at;
        const fullPath = await Attachment.save({
          attachment,
          readAttachmentData,
          saveAttachmentToDisk,
          timestamp
        });
        if (fullPath) {
          (0, import_showToast.showToast)(import_ToastFileSaved.ToastFileSaved, {
            onOpenFile: () => {
              openFileInFolder(fullPath);
            }
          });
        }
      }, "saveAttachment");
      const onItemClick = /* @__PURE__ */ __name(async ({
        message,
        attachment,
        type
      }) => {
        switch (type) {
          case "documents": {
            saveAttachment({ message, attachment });
            break;
          }
          case "media": {
            const selectedMedia = media.find((item) => attachment.path === item.path) || media[0];
            this.showLightboxForMedia(selectedMedia, media);
            break;
          }
          default:
            throw new TypeError(`Unknown attachment type: '${type}'`);
        }
      }, "onItemClick");
      return {
        documents,
        media,
        onItemClick
      };
    }, "getProps");
    function getMessageIds() {
      const state = window.reduxStore.getState();
      const byConversation = state?.conversations?.messagesByConversation;
      const messages = byConversation && byConversation[conversationId];
      if (!messages || !messages.messageIds) {
        return void 0;
      }
      return messages.messageIds;
    }
    let previousMessageList;
    previousMessageList = getMessageIds();
    const unsubscribe = window.reduxStore.subscribe(() => {
      const currentMessageList = getMessageIds();
      if (currentMessageList !== previousMessageList) {
        update();
        previousMessageList = currentMessageList;
      }
    });
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: /* @__PURE__ */ React.createElement(React.Fragment, null),
      onClose: () => {
        unsubscribe();
      }
    });
    const headerTitle = window.i18n("allMedia");
    const update = /* @__PURE__ */ __name(async () => {
      const props = await getProps();
      view.update(/* @__PURE__ */ React.createElement(import_MediaGallery.MediaGallery, {
        i18n: window.i18n,
        ...props
      }));
    }, "update");
    this.addPanel({ view, headerTitle });
    update();
  }
  focusMessageField() {
    if (this.panels && this.panels.length) {
      return;
    }
    this.compositionApi.current?.focusInput();
  }
  disableMessageField() {
    this.compositionApi.current?.setDisabled(true);
  }
  enableMessageField() {
    this.compositionApi.current?.setDisabled(false);
  }
  resetEmojiResults() {
    this.compositionApi.current?.resetEmojiResults();
  }
  showGV1Members() {
    const { contactCollection, id } = this.model;
    const memberships = contactCollection?.map((conversation) => {
      return {
        isAdmin: false,
        member: conversation.format()
      };
    }) || [];
    const reduxState = window.reduxStore.getState();
    const getPreferredBadge = (0, import_badges.getPreferredBadgeSelector)(reduxState);
    const theme = (0, import_user.getTheme)(reduxState);
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "group-member-list panel",
      JSX: /* @__PURE__ */ React.createElement(import_ConversationDetailsMembershipList.ConversationDetailsMembershipList, {
        canAddNewMembers: false,
        conversationId: id,
        i18n: window.i18n,
        getPreferredBadge,
        maxShownMemberCount: 32,
        memberships,
        showContactModal: (contactId) => {
          this.showContactModal(contactId);
        },
        theme
      })
    });
    this.addPanel({ view });
    view.render();
  }
  showSafetyNumber(id) {
    let conversation;
    if (!id && (0, import_whatTypeOfConversation.isDirectConversation)(this.model.attributes)) {
      conversation = this.model;
    } else {
      conversation = window.ConversationController.get(id);
    }
    if (conversation) {
      window.reduxActions.globalModals.toggleSafetyNumberModal(conversation.get("id"));
    }
  }
  downloadAttachmentWrapper(messageId, providedAttachment) {
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`downloadAttachmentWrapper: Message ${messageId} missing!`);
    }
    const { attachments, sent_at: timestamp } = message.attributes;
    if (!attachments || attachments.length < 1) {
      return;
    }
    const attachment = providedAttachment && attachments.includes(providedAttachment) ? providedAttachment : attachments[0];
    const { fileName } = attachment;
    const isDangerous = window.Signal.Util.isFileDangerous(fileName || "");
    this.downloadAttachment({ attachment, timestamp, isDangerous });
  }
  async downloadAttachment({
    attachment,
    timestamp,
    isDangerous
  }) {
    if (isDangerous) {
      (0, import_showToast.showToast)(import_ToastDangerousFileType.ToastDangerousFileType);
      return;
    }
    const fullPath = await Attachment.save({
      attachment,
      readAttachmentData,
      saveAttachmentToDisk,
      timestamp
    });
    if (fullPath) {
      (0, import_showToast.showToast)(import_ToastFileSaved.ToastFileSaved, {
        onOpenFile: () => {
          openFileInFolder(fullPath);
        }
      });
    }
  }
  async displayTapToViewMessage(messageId) {
    log.info("displayTapToViewMessage: attempting to display message");
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`displayTapToViewMessage: Message ${messageId} missing!`);
    }
    if (!(0, import_message.isTapToView)(message.attributes)) {
      throw new Error(`displayTapToViewMessage: Message ${message.idForLogging()} is not a tap to view message`);
    }
    if (message.isErased()) {
      throw new Error(`displayTapToViewMessage: Message ${message.idForLogging()} is already erased`);
    }
    const firstAttachment = (message.get("attachments") || [])[0];
    if (!firstAttachment || !firstAttachment.path) {
      throw new Error(`displayTapToViewMessage: Message ${message.idForLogging()} had no first attachment with path`);
    }
    const absolutePath = getAbsoluteAttachmentPath(firstAttachment.path);
    const { path: tempPath } = await copyIntoTempDirectory(absolutePath);
    const tempAttachment = {
      ...firstAttachment,
      path: tempPath
    };
    await message.markViewOnceMessageViewed();
    const close = /* @__PURE__ */ __name(() => {
      try {
        this.stopListening(message);
        (0, import_showLightbox.closeLightbox)();
      } finally {
        deleteTempFile(tempPath);
      }
    }, "close");
    this.listenTo(message, "expired", close);
    this.listenTo(message, "change", () => {
      (0, import_showLightbox.showLightbox)(getProps());
    });
    const getProps = /* @__PURE__ */ __name(() => {
      const { path, contentType } = tempAttachment;
      return {
        close,
        i18n: window.i18n,
        media: [
          {
            attachment: tempAttachment,
            objectURL: getAbsoluteTempPath(path),
            contentType,
            index: 0,
            message: {
              attachments: message.get("attachments") || [],
              id: message.get("id"),
              conversationId: message.get("conversationId"),
              received_at: message.get("received_at"),
              received_at_ms: Number(message.get("received_at_ms")),
              sent_at: message.get("sent_at")
            }
          }
        ],
        isViewOnce: true
      };
    }, "getProps");
    (0, import_showLightbox.showLightbox)(getProps());
    log.info("displayTapToViewMessage: showed lightbox");
  }
  deleteMessage(messageId) {
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`deleteMessage: Message ${messageId} missing!`);
    }
    window.showConfirmationDialog({
      confirmStyle: "negative",
      message: window.i18n("deleteWarning"),
      okText: window.i18n("delete"),
      resolve: () => {
        window.Signal.Data.removeMessage(message.id);
        if ((0, import_message.isOutgoing)(message.attributes)) {
          this.model.decrementSentMessageCount();
        } else {
          this.model.decrementMessageCount();
        }
        this.resetPanel();
      }
    });
  }
  deleteMessageForEveryone(messageId) {
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`deleteMessageForEveryone: Message ${messageId} missing!`);
    }
    window.showConfirmationDialog({
      confirmStyle: "negative",
      message: window.i18n("deleteForEveryoneWarning"),
      okText: window.i18n("delete"),
      resolve: async () => {
        try {
          await this.model.sendDeleteForEveryoneMessage({
            id: message.id,
            timestamp: message.get("sent_at")
          });
        } catch (error) {
          log.error("Error sending delete-for-everyone", error && error.stack, messageId);
          (0, import_showToast.showToast)(import_ToastDeleteForEveryoneFailed.ToastDeleteForEveryoneFailed);
        }
        this.resetPanel();
      }
    });
  }
  showStickerPackPreview(packId, packKey) {
    Stickers.downloadEphemeralPack(packId, packKey);
    const props = {
      packId,
      onClose: async () => {
        if (this.stickerPreviewModalView) {
          this.stickerPreviewModalView.remove();
          this.stickerPreviewModalView = void 0;
        }
        await Stickers.removeEphemeralPack(packId);
      }
    };
    this.stickerPreviewModalView = new import_ReactWrapperView.ReactWrapperView({
      className: "sticker-preview-modal-wrapper",
      JSX: window.Signal.State.Roots.createStickerPreviewModal(window.reduxStore, props)
    });
  }
  showLightboxForMedia(selectedMediaItem, media = []) {
    const onSave = /* @__PURE__ */ __name(async ({
      attachment,
      message,
      index
    }) => {
      const fullPath = await Attachment.save({
        attachment,
        index: index + 1,
        readAttachmentData,
        saveAttachmentToDisk,
        timestamp: message.sent_at
      });
      if (fullPath) {
        (0, import_showToast.showToast)(import_ToastFileSaved.ToastFileSaved, {
          onOpenFile: () => {
            openFileInFolder(fullPath);
          }
        });
      }
    }, "onSave");
    const selectedIndex = media.findIndex((mediaItem) => mediaItem.attachment.path === selectedMediaItem.attachment.path);
    (0, import_showLightbox.showLightbox)({
      close: import_showLightbox.closeLightbox,
      i18n: window.i18n,
      getConversation: (0, import_conversations.getConversationSelector)(window.reduxStore.getState()),
      media,
      onForward: (messageId) => {
        this.showForwardMessageModal(messageId);
      },
      onSave,
      selectedIndex: selectedIndex >= 0 ? selectedIndex : 0
    });
  }
  showLightbox({
    attachment,
    messageId
  }) {
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`showLightbox: Message ${messageId} missing!`);
    }
    const sticker = message.get("sticker");
    if (sticker) {
      const { packId, packKey } = sticker;
      this.showStickerPackPreview(packId, packKey);
      return;
    }
    const { contentType } = attachment;
    if (!window.Signal.Util.GoogleChrome.isImageTypeSupported(contentType) && !window.Signal.Util.GoogleChrome.isVideoTypeSupported(contentType)) {
      this.downloadAttachmentWrapper(messageId, attachment);
      return;
    }
    const attachments = message.get("attachments") || [];
    const loop = (0, import_Attachment.isGIF)(attachments);
    const media = attachments.filter((item) => item.thumbnail && !item.pending && !item.error).map((item, index) => ({
      objectURL: getAbsoluteAttachmentPath(item.path ?? ""),
      path: item.path,
      contentType: item.contentType,
      loop,
      index,
      message: {
        attachments: message.get("attachments") || [],
        id: message.get("id"),
        conversationId: window.ConversationController.get(window.ConversationController.ensureContactIds({
          uuid: message.get("sourceUuid"),
          e164: message.get("source")
        }))?.id || message.get("conversationId"),
        received_at: message.get("received_at"),
        received_at_ms: Number(message.get("received_at_ms")),
        sent_at: message.get("sent_at")
      },
      attachment: item,
      thumbnailObjectUrl: item.thumbnail?.objectUrl || getAbsoluteAttachmentPath(item.thumbnail?.path ?? "")
    }));
    if (!media.length) {
      log.error("showLightbox: unable to load attachment", attachments.map((x) => ({
        contentType: x.contentType,
        error: x.error,
        flags: x.flags,
        path: x.path,
        size: x.size
      })));
      (0, import_showToast.showToast)(import_ToastUnableToLoadAttachment.ToastUnableToLoadAttachment);
      return;
    }
    const selectedMedia = media.find((item) => attachment.path === item.path) || media[0];
    this.showLightboxForMedia(selectedMedia, media);
  }
  showContactModal(contactId) {
    window.reduxActions.globalModals.showContactModal(contactId, this.model.id);
  }
  showGroupLinkManagement() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: window.Signal.State.Roots.createGroupLinkManagement(window.reduxStore, {
        conversationId: this.model.id
      })
    });
    const headerTitle = window.i18n("ConversationDetails--group-link");
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showGroupV2Permissions() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: window.Signal.State.Roots.createGroupV2Permissions(window.reduxStore, {
        conversationId: this.model.id,
        setAccessControlAttributesSetting: this.setAccessControlAttributesSetting.bind(this),
        setAccessControlMembersSetting: this.setAccessControlMembersSetting.bind(this),
        setAnnouncementsOnly: this.setAnnouncementsOnly.bind(this)
      })
    });
    const headerTitle = window.i18n("permissions");
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showPendingInvites() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: window.Signal.State.Roots.createPendingInvites(window.reduxStore, {
        conversationId: this.model.id,
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString(),
        approvePendingMembership: (conversationId) => {
          this.model.approvePendingMembershipFromGroupV2(conversationId);
        },
        revokePendingMemberships: (conversationIds) => {
          this.model.revokePendingMembershipsFromGroupV2(conversationIds);
        }
      })
    });
    const headerTitle = window.i18n("ConversationDetails--requests-and-invites");
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showConversationNotificationsSettings() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: window.Signal.State.Roots.createConversationNotificationsSettings(window.reduxStore, {
        conversationId: this.model.id,
        setDontNotifyForMentionsIfMuted: this.model.setDontNotifyForMentionsIfMuted.bind(this.model),
        setMuteExpiration: this.setMuteExpiration.bind(this)
      })
    });
    const headerTitle = window.i18n("ConversationDetails--notifications");
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showChatColorEditor() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel",
      JSX: window.Signal.State.Roots.createChatColorPicker(window.reduxStore, {
        conversationId: this.model.get("id")
      })
    });
    const headerTitle = window.i18n("ChatColorPicker__menu-title");
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showConversationDetails() {
    if (this.model.throttledGetProfiles) {
      this.model.throttledGetProfiles();
    }
    const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
    const onLeave = /* @__PURE__ */ __name(() => {
      this.longRunningTaskWrapper({
        name: "onLeave",
        task: () => this.model.leaveGroupV2()
      });
    }, "onLeave");
    const onBlock = /* @__PURE__ */ __name(() => {
      this.syncMessageRequestResponse("onBlock", this.model, messageRequestEnum.BLOCK);
    }, "onBlock");
    const props = {
      addMembers: this.model.addMembersV2.bind(this.model),
      conversationId: this.model.get("id"),
      loadRecentMediaItems: this.loadRecentMediaItems.bind(this),
      setDisappearingMessages: this.setDisappearingMessages.bind(this),
      showAllMedia: this.showAllMedia.bind(this),
      showContactModal: this.showContactModal.bind(this),
      showChatColorEditor: this.showChatColorEditor.bind(this),
      showGroupLinkManagement: this.showGroupLinkManagement.bind(this),
      showGroupV2Permissions: this.showGroupV2Permissions.bind(this),
      showConversationNotificationsSettings: this.showConversationNotificationsSettings.bind(this),
      showPendingInvites: this.showPendingInvites.bind(this),
      showLightboxForMedia: this.showLightboxForMedia.bind(this),
      updateGroupAttributes: this.model.updateGroupAttributesV2.bind(this.model),
      onLeave,
      onBlock,
      onUnblock: () => {
        this.syncMessageRequestResponse("onUnblock", this.model, messageRequestEnum.ACCEPT);
      },
      setMuteExpiration: this.setMuteExpiration.bind(this),
      onOutgoingAudioCallInConversation: this.onOutgoingAudioCallInConversation.bind(this),
      onOutgoingVideoCallInConversation: this.onOutgoingVideoCallInConversation.bind(this)
    };
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "conversation-details-pane panel",
      JSX: window.Signal.State.Roots.createConversationDetails(window.reduxStore, props)
    });
    const headerTitle = "";
    this.addPanel({ view, headerTitle });
    view.render();
  }
  showMessageDetail(messageId) {
    const message = window.MessageController.getById(messageId);
    if (!message) {
      throw new Error(`showMessageDetail: Message ${messageId} missing!`);
    }
    if (!message.isNormalBubble()) {
      return;
    }
    const getProps = /* @__PURE__ */ __name(() => ({
      ...message.getPropsForMessageDetail(window.ConversationController.getOurConversationIdOrThrow()),
      ...this.getMessageActions()
    }), "getProps");
    const onClose = /* @__PURE__ */ __name(() => {
      this.stopListening(message, "change", update);
      this.resetPanel();
    }, "onClose");
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "panel message-detail-wrapper",
      JSX: window.Signal.State.Roots.createMessageDetail(window.reduxStore, getProps()),
      onClose
    });
    const update = /* @__PURE__ */ __name(() => view.update(window.Signal.State.Roots.createMessageDetail(window.reduxStore, getProps())), "update");
    this.listenTo(message, "change", update);
    this.listenTo(message, "expired", onClose);
    this.addPanel({ view });
    view.render();
  }
  showStickerManager() {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: ["sticker-manager-wrapper", "panel"].join(" "),
      JSX: window.Signal.State.Roots.createStickerManager(window.reduxStore),
      onClose: () => {
        this.resetPanel();
      }
    });
    this.addPanel({ view });
    view.render();
  }
  showContactDetail({
    contact,
    signalAccount
  }) {
    const view = new import_ReactWrapperView.ReactWrapperView({
      className: "contact-detail-pane panel",
      JSX: /* @__PURE__ */ React.createElement(import_ContactDetail.ContactDetail, {
        i18n: window.i18n,
        contact,
        hasSignalAccount: Boolean(signalAccount),
        onSendMessage: () => {
          if (signalAccount) {
            this.startConversation(signalAccount.phoneNumber, signalAccount.uuid);
          }
        }
      }),
      onClose: () => {
        this.resetPanel();
      }
    });
    this.addPanel({ view });
  }
  startConversation(e164, uuid) {
    const conversationId = window.ConversationController.ensureContactIds({
      e164,
      uuid
    });
    (0, import_assert.strictAssert)(conversationId, `startConversation failed given ${e164}/${uuid} combination`);
    this.openConversation(conversationId);
  }
  async openConversation(conversationId, messageId) {
    window.Whisper.events.trigger("showConversation", conversationId, messageId);
  }
  addPanel(panel) {
    this.panels = this.panels || [];
    if (this.panels.length === 0) {
      this.previousFocus = document.activeElement;
    }
    this.panels.unshift(panel);
    panel.view.$el.insertAfter(this.$(".panel").last());
    panel.view.$el.one("animationend", () => {
      panel.view.$el.addClass("panel--static");
    });
    window.reduxActions.conversations.setSelectedConversationPanelDepth(this.panels.length);
    window.reduxActions.conversations.setSelectedConversationHeaderTitle(panel.headerTitle);
  }
  resetPanel() {
    if (!this.panels || !this.panels.length) {
      return;
    }
    const panel = this.panels.shift();
    if (this.panels.length === 0 && this.previousFocus && this.previousFocus.focus) {
      this.previousFocus.focus();
      this.previousFocus = void 0;
    }
    if (this.panels.length > 0) {
      this.panels[0].view.$el.fadeIn(250);
    }
    if (panel) {
      panel.view.$el.addClass("panel--remove").one("transitionend", () => {
        panel.view.remove();
        if (this.panels.length === 0) {
          window.dispatchEvent(new Event("resize"));
        }
      });
    }
    window.reduxActions.conversations.setSelectedConversationPanelDepth(this.panels.length);
    window.reduxActions.conversations.setSelectedConversationHeaderTitle(this.panels[0]?.headerTitle);
  }
  async loadRecentMediaItems(limit) {
    const { model } = this;
    const messages = await window.Signal.Data.getMessagesWithVisualMediaAttachments(model.id, {
      limit
    });
    const loadedRecentMediaItems = messages.filter((message) => message.attachments !== void 0).reduce((acc, message) => [
      ...acc,
      ...(message.attachments || []).map((attachment, index) => {
        const { thumbnail } = attachment;
        return {
          objectURL: getAbsoluteAttachmentPath(attachment.path || ""),
          thumbnailObjectUrl: thumbnail?.path ? getAbsoluteAttachmentPath(thumbnail.path) : "",
          contentType: attachment.contentType,
          index,
          attachment,
          message: {
            attachments: message.attachments || [],
            conversationId: window.ConversationController.get(message.sourceUuid)?.id || message.conversationId,
            id: message.id,
            received_at: message.received_at,
            received_at_ms: Number(message.received_at_ms),
            sent_at: message.sent_at
          }
        };
      })
    ], []);
    window.reduxActions.conversations.setRecentMediaItems(model.id, loadedRecentMediaItems);
  }
  async setDisappearingMessages(seconds) {
    const { model } = this;
    const valueToSet = seconds > 0 ? seconds : void 0;
    await this.longRunningTaskWrapper({
      name: "updateExpirationTimer",
      task: async () => model.updateExpirationTimer(valueToSet, {
        reason: "setDisappearingMessages"
      })
    });
  }
  async setAccessControlAttributesSetting(value) {
    const { model } = this;
    await this.longRunningTaskWrapper({
      name: "updateAccessControlAttributes",
      task: async () => model.updateAccessControlAttributes(value)
    });
  }
  async setAccessControlMembersSetting(value) {
    const { model } = this;
    await this.longRunningTaskWrapper({
      name: "updateAccessControlMembers",
      task: async () => model.updateAccessControlMembers(value)
    });
  }
  async setAnnouncementsOnly(value) {
    const { model } = this;
    await this.longRunningTaskWrapper({
      name: "updateAnnouncementsOnly",
      task: async () => model.updateAnnouncementsOnly(value)
    });
  }
  async destroyMessages() {
    const { model } = this;
    window.showConfirmationDialog({
      confirmStyle: "negative",
      message: window.i18n("deleteConversationConfirmation"),
      okText: window.i18n("delete"),
      resolve: () => {
        this.longRunningTaskWrapper({
          name: "destroymessages",
          task: async () => {
            model.trigger("unload", "delete messages");
            await model.destroyMessages();
            model.updateLastMessage();
          }
        });
      },
      reject: () => {
        log.info("destroyMessages: User canceled delete");
      }
    });
  }
  async isCallSafe() {
    const contacts = await this.getUntrustedContacts();
    if (contacts && contacts.length) {
      const callAnyway = await this.showSendAnywayDialog(contacts.models, window.i18n("callAnyway"));
      if (!callAnyway) {
        log.info("Safety number change dialog not accepted, new call not allowed.");
        return false;
      }
    }
    return true;
  }
  showSendAnywayDialog(contacts, confirmText) {
    return new Promise((resolve) => {
      (0, import_showSafetyNumberChangeDialog.showSafetyNumberChangeDialog)({
        confirmText,
        contacts,
        reject: () => {
          resolve(false);
        },
        resolve: () => {
          resolve(true);
        }
      });
    });
  }
  async sendStickerMessage(options) {
    const { model } = this;
    try {
      const contacts = await this.getUntrustedContacts(options);
      if (contacts && contacts.length) {
        const sendAnyway = await this.showSendAnywayDialog(contacts.models);
        if (sendAnyway) {
          this.sendStickerMessage({ ...options, force: true });
        }
        return;
      }
      if (this.showInvalidMessageToast()) {
        return;
      }
      const { packId, stickerId } = options;
      model.sendStickerMessage(packId, stickerId);
    } catch (error) {
      log.error("clickSend error:", error && error.stack ? error.stack : error);
    }
  }
  async getUntrustedContacts(options = {}) {
    const { model } = this;
    await model.updateVerified();
    const unverifiedContacts = model.getUnverified();
    if (options.force) {
      if (unverifiedContacts.length) {
        await (0, import_markAllAsVerifiedDefault.markAllAsVerifiedDefault)(unverifiedContacts.models);
        options.force = false;
      }
    } else if (unverifiedContacts.length) {
      return unverifiedContacts;
    }
    const untrustedContacts = model.getUntrusted();
    if (options.force) {
      if (untrustedContacts.length) {
        await (0, import_markAllAsApproved.markAllAsApproved)(untrustedContacts.models);
      }
    } else if (untrustedContacts.length) {
      return untrustedContacts;
    }
    return null;
  }
  async setQuoteMessage(messageId) {
    const { model } = this;
    const message = messageId ? await (0, import_getMessageById.getMessageById)(messageId) : void 0;
    if (message && !(0, import_message.canReply)(message.attributes, window.ConversationController.getOurConversationIdOrThrow(), import_findAndFormatContact.findAndFormatContact)) {
      return;
    }
    if (message && !message.isNormalBubble()) {
      return;
    }
    this.quote = void 0;
    this.quotedMessage = void 0;
    const existing = model.get("quotedMessageId");
    if (existing !== messageId) {
      const now = Date.now();
      let active_at = this.model.get("active_at");
      let timestamp = this.model.get("timestamp");
      if (!active_at && messageId) {
        active_at = now;
        timestamp = now;
      }
      this.model.set({
        active_at,
        draftChanged: true,
        quotedMessageId: messageId,
        timestamp
      });
      await this.saveModel();
    }
    if (message) {
      this.quotedMessage = message;
      this.quote = await model.makeQuote(this.quotedMessage);
      this.enableMessageField();
      this.focusMessageField();
    }
    this.renderQuotedMessage();
  }
  renderQuotedMessage() {
    const { model } = this;
    if (!this.quotedMessage) {
      window.reduxActions.composer.setQuotedMessage(void 0);
      return;
    }
    window.reduxActions.composer.setQuotedMessage({
      conversationId: model.id,
      quote: this.quote
    });
  }
  showInvalidMessageToast(messageText) {
    const { model } = this;
    let toastView;
    if (window.reduxStore.getState().expiration.hasExpired) {
      toastView = import_ToastExpired.ToastExpired;
    }
    if (!model.isValid()) {
      toastView = import_ToastInvalidConversation.ToastInvalidConversation;
    }
    const e164 = this.model.get("e164");
    const uuid = this.model.get("uuid");
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.model.attributes) && (e164 && window.storage.blocked.isBlocked(e164) || uuid && window.storage.blocked.isUuidBlocked(uuid))) {
      toastView = import_ToastBlocked.ToastBlocked;
    }
    const groupId = this.model.get("groupId");
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.model.attributes) && groupId && window.storage.blocked.isGroupBlocked(groupId)) {
      toastView = import_ToastBlockedGroup.ToastBlockedGroup;
    }
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(model.attributes) && model.get("left")) {
      toastView = import_ToastLeftGroup.ToastLeftGroup;
    }
    if (messageText && messageText.length > MAX_MESSAGE_BODY_LENGTH) {
      toastView = import_ToastMessageBodyTooLong.ToastMessageBodyTooLong;
    }
    if (toastView) {
      (0, import_showToast.showToast)(toastView);
      return true;
    }
    return false;
  }
  async sendMessage(message = "", mentions = [], options = {}) {
    const { model } = this;
    const timestamp = options.timestamp || Date.now();
    this.sendStart = Date.now();
    try {
      this.disableMessageField();
      const contacts = await this.getUntrustedContacts(options);
      if (contacts && contacts.length) {
        const sendAnyway = await this.showSendAnywayDialog(contacts.models);
        if (sendAnyway) {
          this.sendMessage(message, mentions, { force: true, timestamp });
          return;
        }
        this.enableMessageField();
        return;
      }
    } catch (error) {
      this.enableMessageField();
      log.error("sendMessage error:", error && error.stack ? error.stack : error);
      return;
    }
    model.clearTypingTimers();
    if (this.showInvalidMessageToast(message)) {
      this.enableMessageField();
      return;
    }
    try {
      if (!message.length && !this.hasFiles({ includePending: false }) && !options.voiceNoteAttachment) {
        return;
      }
      let attachments = [];
      if (options.voiceNoteAttachment) {
        attachments = [options.voiceNoteAttachment];
      } else if (options.draftAttachments) {
        attachments = (await Promise.all(options.draftAttachments.map(import_resolveAttachmentDraftData.resolveAttachmentDraftData))).filter(import_isNotNil.isNotNil);
      }
      const sendHQImages = window.reduxStore && window.reduxStore.getState().composer.shouldSendHighQualityAttachments;
      const sendDelta = Date.now() - this.sendStart;
      log.info("Send pre-checks took", sendDelta, "milliseconds");
      model.enqueueMessageForSend({
        body: message,
        attachments,
        quote: this.quote,
        preview: (0, import_LinkPreview.getLinkPreviewForSend)(message),
        mentions
      }, {
        sendHQImages,
        timestamp,
        extraReduxActions: () => {
          this.compositionApi.current?.reset();
          model.setMarkedUnread(false);
          this.setQuoteMessage(null);
          (0, import_LinkPreview.resetLinkPreview)();
          this.clearAttachments();
          window.reduxActions.composer.resetComposer();
        }
      });
    } catch (error) {
      log.error("Error pulling attached files before send", error && error.stack ? error.stack : error);
    } finally {
      this.enableMessageField();
    }
  }
  onEditorStateChange(messageText, bodyRanges, caretLocation) {
    this.maybeBumpTyping(messageText);
    this.debouncedSaveDraft(messageText, bodyRanges);
    if (!this.hasFiles({ includePending: true })) {
      (0, import_LinkPreview.maybeGrabLinkPreview)(messageText, import_LinkPreview2.LinkPreviewSourceType.Composer, caretLocation);
    }
  }
  async saveDraft(messageText, bodyRanges) {
    const { model } = this;
    const trimmed = messageText && messageText.length > 0 ? messageText.trim() : "";
    if (model.get("draft") && (!messageText || trimmed.length === 0)) {
      this.model.set({
        draft: null,
        draftChanged: true,
        draftBodyRanges: []
      });
      await this.saveModel();
      return;
    }
    if (messageText !== model.get("draft")) {
      const now = Date.now();
      let active_at = this.model.get("active_at");
      let timestamp = this.model.get("timestamp");
      if (!active_at) {
        active_at = now;
        timestamp = now;
      }
      this.model.set({
        active_at,
        draft: messageText,
        draftBodyRanges: bodyRanges,
        draftChanged: true,
        timestamp
      });
      await this.saveModel();
    }
  }
  maybeBumpTyping(messageText) {
    if (messageText.length && this.model.throttledBumpTyping) {
      this.model.throttledBumpTyping();
    }
  }
}
window.Whisper.ConversationView = ConversationView;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uX3ZpZXcudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgY2FtZWxjYXNlICovXG5cbmltcG9ydCB0eXBlICogYXMgQmFja2JvbmUgZnJvbSAnYmFja2JvbmUnO1xuaW1wb3J0IHR5cGUgeyBDb21wb25lbnRQcm9wcyB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGRlYm91bmNlLCBmbGF0dGVuLCB0aHJvdHRsZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyByZW5kZXIgfSBmcm9tICdtdXN0YWNoZSc7XG5cbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGlzR0lGIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBBdHRhY2htZW50IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0ICogYXMgU3RpY2tlcnMgZnJvbSAnLi4vdHlwZXMvU3RpY2tlcnMnO1xuaW1wb3J0IHR5cGUgeyBCb2R5UmFuZ2VUeXBlLCBCb2R5UmFuZ2VzVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBNSU1FVHlwZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgR3JvdXBWMlBlbmRpbmdNZW1iZXJUeXBlLFxuICBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gIENvbnZlcnNhdGlvbk1vZGVsQ29sbGVjdGlvblR5cGUsXG4gIFF1b3RlZE1lc3NhZ2VUeXBlLFxufSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHR5cGUgeyBNZWRpYUl0ZW1UeXBlLCBNZWRpYUl0ZW1NZXNzYWdlVHlwZSB9IGZyb20gJy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlQnlJZCB9IGZyb20gJy4uL21lc3NhZ2VzL2dldE1lc3NhZ2VCeUlkJztcbmltcG9ydCB7IGdldENvbnRhY3RJZCB9IGZyb20gJy4uL21lc3NhZ2VzL2hlbHBlcnMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZCB9IGZyb20gJy4uL3JlYWN0aW9ucy9lbnF1ZXVlUmVhY3Rpb25Gb3JTZW5kJztcbmltcG9ydCB7IGFkZFJlcG9ydFNwYW1Kb2IgfSBmcm9tICcuLi9qb2JzL2hlbHBlcnMvYWRkUmVwb3J0U3BhbUpvYic7XG5pbXBvcnQgeyByZXBvcnRTcGFtSm9iUXVldWUgfSBmcm9tICcuLi9qb2JzL3JlcG9ydFNwYW1Kb2JRdWV1ZSc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoSWRzQnlUaXRsZSB9IGZyb20gJy4uL3V0aWwvZ3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICBpc0RpcmVjdENvbnZlcnNhdGlvbixcbiAgaXNHcm91cCxcbiAgaXNHcm91cFYxLFxufSBmcm9tICcuLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZmluZEFuZEZvcm1hdENvbnRhY3QgfSBmcm9tICcuLi91dGlsL2ZpbmRBbmRGb3JtYXRDb250YWN0JztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7XG4gIGNhblJlcGx5LFxuICBnZXRBdHRhY2htZW50c0Zvck1lc3NhZ2UsXG4gIGlzSW5jb21pbmcsXG4gIGlzT3V0Z29pbmcsXG4gIGlzVGFwVG9WaWV3LFxufSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQge1xuICBnZXRDb252ZXJzYXRpb25TZWxlY3RvcixcbiAgZ2V0TWVzc2FnZXNCeUNvbnZlcnNhdGlvbixcbn0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0QWN0aXZlQ2FsbFN0YXRlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2NhbGxpbmcnO1xuaW1wb3J0IHsgZ2V0VGhlbWUgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBSZWFjdFdyYXBwZXJWaWV3IH0gZnJvbSAnLi9SZWFjdFdyYXBwZXJWaWV3JztcbmltcG9ydCB0eXBlIHsgTGlnaHRib3ggfSBmcm9tICcuLi9jb21wb25lbnRzL0xpZ2h0Ym94JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL2NvbnZlcnNhdGlvbi1kZXRhaWxzL0NvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdCc7XG5pbXBvcnQgeyBzaG93U2FmZXR5TnVtYmVyQ2hhbmdlRGlhbG9nIH0gZnJvbSAnLi4vc2hpbXMvc2hvd1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBFbWJlZGRlZENvbnRhY3RUeXBlIH0gZnJvbSAnLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB7IGNyZWF0ZUNvbnZlcnNhdGlvblZpZXcgfSBmcm9tICcuLi9zdGF0ZS9yb290cy9jcmVhdGVDb252ZXJzYXRpb25WaWV3JztcbmltcG9ydCB7IEF0dGFjaG1lbnRUb2FzdFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50VG9hc3RUeXBlJztcbmltcG9ydCB0eXBlIHsgQ29tcG9zaXRpb25BUElUeXBlIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Db21wb3NpdGlvbkFyZWEnO1xuaW1wb3J0IHsgUmVhZFN0YXR1cyB9IGZyb20gJy4uL21lc3NhZ2VzL01lc3NhZ2VSZWFkU3RhdHVzJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgeyBUb2FzdEJsb2NrZWQgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0QmxvY2tlZCc7XG5pbXBvcnQgeyBUb2FzdEJsb2NrZWRHcm91cCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RCbG9ja2VkR3JvdXAnO1xuaW1wb3J0IHsgVG9hc3RDYW5ub3RNaXhJbWFnZUFuZE5vbkltYWdlQXR0YWNobWVudHMgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0Q2Fubm90TWl4SW1hZ2VBbmROb25JbWFnZUF0dGFjaG1lbnRzJztcbmltcG9ydCB7IFRvYXN0Q2Fubm90U3RhcnRHcm91cENhbGwgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0Q2Fubm90U3RhcnRHcm91cENhbGwnO1xuaW1wb3J0IHsgVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RDb252ZXJzYXRpb25BcmNoaXZlZCc7XG5pbXBvcnQgeyBUb2FzdENvbnZlcnNhdGlvbk1hcmtlZFVucmVhZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RDb252ZXJzYXRpb25NYXJrZWRVbnJlYWQnO1xuaW1wb3J0IHsgVG9hc3RDb252ZXJzYXRpb25VbmFyY2hpdmVkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdENvbnZlcnNhdGlvblVuYXJjaGl2ZWQnO1xuaW1wb3J0IHsgVG9hc3REYW5nZXJvdXNGaWxlVHlwZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3REYW5nZXJvdXNGaWxlVHlwZSc7XG5pbXBvcnQgeyBUb2FzdERlbGV0ZUZvckV2ZXJ5b25lRmFpbGVkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdERlbGV0ZUZvckV2ZXJ5b25lRmFpbGVkJztcbmltcG9ydCB7IFRvYXN0RXhwaXJlZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RFeHBpcmVkJztcbmltcG9ydCB7IFRvYXN0RmlsZVNhdmVkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdEZpbGVTYXZlZCc7XG5pbXBvcnQgeyBUb2FzdEZpbGVTaXplIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdEZpbGVTaXplJztcbmltcG9ydCB7IFRvYXN0SW52YWxpZENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RJbnZhbGlkQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IFRvYXN0TGVmdEdyb3VwIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdExlZnRHcm91cCc7XG5pbXBvcnQgeyBUb2FzdE1heEF0dGFjaG1lbnRzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdE1heEF0dGFjaG1lbnRzJztcbmltcG9ydCB7IFRvYXN0TWVzc2FnZUJvZHlUb29Mb25nIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdE1lc3NhZ2VCb2R5VG9vTG9uZyc7XG5pbXBvcnQgeyBUb2FzdE9uZU5vbkltYWdlQXRBVGltZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RPbmVOb25JbWFnZUF0QVRpbWUnO1xuaW1wb3J0IHsgVG9hc3RPcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZCB9IGZyb20gJy4uL2NvbXBvbmVudHMvVG9hc3RPcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZCc7XG5pbXBvcnQgeyBUb2FzdFBpbm5lZENvbnZlcnNhdGlvbnNGdWxsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdFBpbm5lZENvbnZlcnNhdGlvbnNGdWxsJztcbmltcG9ydCB7IFRvYXN0UmVhY3Rpb25GYWlsZWQgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0UmVhY3Rpb25GYWlsZWQnO1xuaW1wb3J0IHsgVG9hc3RSZXBvcnRlZFNwYW1BbmRCbG9ja2VkIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdFJlcG9ydGVkU3BhbUFuZEJsb2NrZWQnO1xuaW1wb3J0IHsgVG9hc3RUYXBUb1ZpZXdFeHBpcmVkSW5jb21pbmcgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0VGFwVG9WaWV3RXhwaXJlZEluY29taW5nJztcbmltcG9ydCB7IFRvYXN0VGFwVG9WaWV3RXhwaXJlZE91dGdvaW5nIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdFRhcFRvVmlld0V4cGlyZWRPdXRnb2luZyc7XG5pbXBvcnQgeyBUb2FzdFVuYWJsZVRvTG9hZEF0dGFjaG1lbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0VW5hYmxlVG9Mb2FkQXR0YWNobWVudCc7XG5pbXBvcnQgeyBUb2FzdENhbm5vdE9wZW5HaWZ0QmFkZ2UgfSBmcm9tICcuLi9jb21wb25lbnRzL1RvYXN0Q2Fubm90T3BlbkdpZnRCYWRnZSc7XG5pbXBvcnQgeyBkZWxldGVEcmFmdEF0dGFjaG1lbnQgfSBmcm9tICcuLi91dGlsL2RlbGV0ZURyYWZ0QXR0YWNobWVudCc7XG5pbXBvcnQgeyBtYXJrQWxsQXNBcHByb3ZlZCB9IGZyb20gJy4uL3V0aWwvbWFya0FsbEFzQXBwcm92ZWQnO1xuaW1wb3J0IHsgbWFya0FsbEFzVmVyaWZpZWREZWZhdWx0IH0gZnJvbSAnLi4vdXRpbC9tYXJrQWxsQXNWZXJpZmllZERlZmF1bHQnO1xuaW1wb3J0IHsgcmV0cnlNZXNzYWdlU2VuZCB9IGZyb20gJy4uL3V0aWwvcmV0cnlNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL3V0aWwvaXNOb3ROaWwnO1xuaW1wb3J0IHsgbWFya1ZpZXdlZCB9IGZyb20gJy4uL3NlcnZpY2VzL01lc3NhZ2VVcGRhdGVyJztcbmltcG9ydCB7IG9wZW5MaW5rSW5XZWJCcm93c2VyIH0gZnJvbSAnLi4vdXRpbC9vcGVuTGlua0luV2ViQnJvd3Nlcic7XG5pbXBvcnQgeyByZXNvbHZlQXR0YWNobWVudERyYWZ0RGF0YSB9IGZyb20gJy4uL3V0aWwvcmVzb2x2ZUF0dGFjaG1lbnREcmFmdERhdGEnO1xuaW1wb3J0IHsgc2hvd1RvYXN0IH0gZnJvbSAnLi4vdXRpbC9zaG93VG9hc3QnO1xuaW1wb3J0IHsgdmlld1N5bmNKb2JRdWV1ZSB9IGZyb20gJy4uL2pvYnMvdmlld1N5bmNKb2JRdWV1ZSc7XG5pbXBvcnQgeyB2aWV3ZWRSZWNlaXB0c0pvYlF1ZXVlIH0gZnJvbSAnLi4vam9icy92aWV3ZWRSZWNlaXB0c0pvYlF1ZXVlJztcbmltcG9ydCB7IFJlY29yZGluZ1N0YXRlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvYXVkaW9SZWNvcmRlcic7XG5pbXBvcnQgeyBVVUlES2luZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgcmV0cnlEZWxldGVGb3JFdmVyeW9uZSB9IGZyb20gJy4uL3V0aWwvcmV0cnlEZWxldGVGb3JFdmVyeW9uZSc7XG5pbXBvcnQgeyBDb250YWN0RGV0YWlsIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vQ29udGFjdERldGFpbCc7XG5pbXBvcnQgeyBNZWRpYUdhbGxlcnkgfSBmcm9tICcuLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9tZWRpYS1nYWxsZXJ5L01lZGlhR2FsbGVyeSc7XG5pbXBvcnQgdHlwZSB7IEl0ZW1DbGlja0V2ZW50IH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vbWVkaWEtZ2FsbGVyeS90eXBlcy9JdGVtQ2xpY2tFdmVudCc7XG5pbXBvcnQge1xuICBnZXRMaW5rUHJldmlld0ZvclNlbmQsXG4gIGhhc0xpbmtQcmV2aWV3TG9hZGVkLFxuICBtYXliZUdyYWJMaW5rUHJldmlldyxcbiAgcmVtb3ZlTGlua1ByZXZpZXcsXG4gIHJlc2V0TGlua1ByZXZpZXcsXG4gIHN1c3BlbmRMaW5rUHJldmlld3MsXG59IGZyb20gJy4uL3NlcnZpY2VzL0xpbmtQcmV2aWV3JztcbmltcG9ydCB7IExpbmtQcmV2aWV3U291cmNlVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xpbmtQcmV2aWV3JztcbmltcG9ydCB7IGNsb3NlTGlnaHRib3gsIHNob3dMaWdodGJveCB9IGZyb20gJy4uL3V0aWwvc2hvd0xpZ2h0Ym94JztcblxudHlwZSBBdHRhY2htZW50T3B0aW9ucyA9IHtcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xufTtcblxudHlwZSBQYW5lbFR5cGUgPSB7IHZpZXc6IEJhY2tib25lLlZpZXc7IGhlYWRlclRpdGxlPzogc3RyaW5nIH07XG5cbmNvbnN0IEZJVkVfTUlOVVRFUyA9IDEwMDAgKiA2MCAqIDU7XG5cbmNvbnN0IHsgTWVzc2FnZSB9ID0gd2luZG93LlNpZ25hbC5UeXBlcztcblxuY29uc3Qge1xuICBjb3B5SW50b1RlbXBEaXJlY3RvcnksXG4gIGRlbGV0ZVRlbXBGaWxlLFxuICBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoLFxuICBnZXRBYnNvbHV0ZVRlbXBQYXRoLFxuICBsb2FkQXR0YWNobWVudERhdGEsXG4gIGxvYWRDb250YWN0RGF0YSxcbiAgbG9hZFByZXZpZXdEYXRhLFxuICBsb2FkU3RpY2tlckRhdGEsXG4gIG9wZW5GaWxlSW5Gb2xkZXIsXG4gIHJlYWRBdHRhY2htZW50RGF0YSxcbiAgc2F2ZUF0dGFjaG1lbnRUb0Rpc2ssXG4gIHVwZ3JhZGVNZXNzYWdlU2NoZW1hLFxufSA9IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucztcblxuY29uc3QgeyBnZXRNZXNzYWdlc0J5U2VudEF0IH0gPSB3aW5kb3cuU2lnbmFsLkRhdGE7XG5cbnR5cGUgTWVzc2FnZUFjdGlvbnNUeXBlID0ge1xuICBkZWxldGVNZXNzYWdlOiAobWVzc2FnZUlkOiBzdHJpbmcpID0+IHVua25vd247XG4gIGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZTogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZTogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBkb3dubG9hZEF0dGFjaG1lbnQ6IChvcHRpb25zOiB7XG4gICAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgaXNEYW5nZXJvdXM6IGJvb2xlYW47XG4gIH0pID0+IHVua25vd247XG4gIGRvd25sb2FkTmV3VmVyc2lvbjogKCkgPT4gdW5rbm93bjtcbiAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZDogKFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PHsgbWVzc2FnZUlkOiBzdHJpbmcgfT5cbiAgKSA9PiB1bmtub3duO1xuICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkOiAob3B0aW9uczogQXR0YWNobWVudE9wdGlvbnMpID0+IHVua25vd247XG4gIG1hcmtWaWV3ZWQ6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb3BlbkNvbnZlcnNhdGlvbjogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb3BlbkdpZnRCYWRnZTogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBvcGVuTGluazogKHVybDogc3RyaW5nKSA9PiB1bmtub3duO1xuICByZWFjdFRvTWVzc2FnZTogKFxuICAgIG1lc3NhZ2VJZDogc3RyaW5nLFxuICAgIHJlYWN0aW9uOiB7IGVtb2ppOiBzdHJpbmc7IHJlbW92ZTogYm9vbGVhbiB9XG4gICkgPT4gdW5rbm93bjtcbiAgcmVwbHlUb01lc3NhZ2U6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmV0cnlTZW5kOiAobWVzc2FnZUlkOiBzdHJpbmcpID0+IHVua25vd247XG4gIHJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd0NvbnRhY3REZXRhaWw6IChvcHRpb25zOiB7XG4gICAgY29udGFjdDogRW1iZWRkZWRDb250YWN0VHlwZTtcbiAgICBzaWduYWxBY2NvdW50Pzoge1xuICAgICAgcGhvbmVOdW1iZXI6IHN0cmluZztcbiAgICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICAgIH07XG4gIH0pID0+IHVua25vd247XG4gIHNob3dDb250YWN0TW9kYWw6IChjb250YWN0SWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd1NhZmV0eU51bWJlcjogKGNvbnRhY3RJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3Q6ICgpID0+IHVua25vd247XG4gIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdDogKCkgPT4gdW5rbm93bjtcbiAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWw6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd0lkZW50aXR5OiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQ6IChvcHRpb25zOiB7XG4gICAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gICAgc2hvd1NpbmdsZT86IGJvb2xlYW47XG4gIH0pID0+IHVua25vd247XG4gIHN0YXJ0Q29udmVyc2F0aW9uOiAoZTE2NDogc3RyaW5nLCB1dWlkOiBVVUlEU3RyaW5nVHlwZSkgPT4gdW5rbm93bjtcbn07XG5cbnR5cGUgTWVkaWFUeXBlID0ge1xuICBwYXRoOiBzdHJpbmc7XG4gIG9iamVjdFVSTDogc3RyaW5nO1xuICB0aHVtYm5haWxPYmplY3RVcmw/OiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlOiBNSU1FVHlwZTtcbiAgaW5kZXg6IG51bWJlcjtcbiAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gIG1lc3NhZ2U6IHtcbiAgICBhdHRhY2htZW50czogQXJyYXk8QXR0YWNobWVudFR5cGU+O1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgaWQ6IHN0cmluZztcbiAgICByZWNlaXZlZF9hdDogbnVtYmVyO1xuICAgIHJlY2VpdmVkX2F0X21zOiBudW1iZXI7XG4gICAgc2VudF9hdDogbnVtYmVyO1xuICB9O1xufTtcblxuY29uc3QgTUFYX01FU1NBR0VfQk9EWV9MRU5HVEggPSA2NCAqIDEwMjQ7XG5cbmV4cG9ydCBjbGFzcyBDb252ZXJzYXRpb25WaWV3IGV4dGVuZHMgd2luZG93LkJhY2tib25lLlZpZXc8Q29udmVyc2F0aW9uTW9kZWw+IHtcbiAgcHJpdmF0ZSBkZWJvdW5jZWRTYXZlRHJhZnQ6IChcbiAgICBtZXNzYWdlVGV4dDogc3RyaW5nLFxuICAgIGJvZHlSYW5nZXM6IEFycmF5PEJvZHlSYW5nZVR5cGU+XG4gICkgPT4gUHJvbWlzZTx2b2lkPjtcbiAgcHJpdmF0ZSBsYXp5VXBkYXRlVmVyaWZpZWQ6ICgpID0+IHZvaWQ7XG5cbiAgLy8gQ29tcG9zaW5nIG1lc3NhZ2VzXG4gIHByaXZhdGUgY29tcG9zaXRpb25BcGk6IHtcbiAgICBjdXJyZW50OiBDb21wb3NpdGlvbkFQSVR5cGU7XG4gIH0gPSB7IGN1cnJlbnQ6IHVuZGVmaW5lZCB9O1xuICBwcml2YXRlIHNlbmRTdGFydD86IG51bWJlcjtcblxuICAvLyBRdW90ZXNcbiAgcHJpdmF0ZSBxdW90ZT86IFF1b3RlZE1lc3NhZ2VUeXBlO1xuICBwcml2YXRlIHF1b3RlZE1lc3NhZ2U/OiBNZXNzYWdlTW9kZWw7XG5cbiAgLy8gU3ViLXZpZXdzXG4gIHByaXZhdGUgY29udGFjdE1vZGFsVmlldz86IEJhY2tib25lLlZpZXc7XG4gIHByaXZhdGUgY29udmVyc2F0aW9uVmlldz86IEJhY2tib25lLlZpZXc7XG4gIHByaXZhdGUgZm9yd2FyZE1lc3NhZ2VNb2RhbD86IEJhY2tib25lLlZpZXc7XG4gIHByaXZhdGUgbGlnaHRib3hWaWV3PzogUmVhY3RXcmFwcGVyVmlldztcbiAgcHJpdmF0ZSBtaWdyYXRpb25EaWFsb2c/OiBCYWNrYm9uZS5WaWV3O1xuICBwcml2YXRlIHN0aWNrZXJQcmV2aWV3TW9kYWxWaWV3PzogQmFja2JvbmUuVmlldztcblxuICAvLyBQYW5lbCBzdXBwb3J0XG4gIHByaXZhdGUgcGFuZWxzOiBBcnJheTxQYW5lbFR5cGU+ID0gW107XG4gIHByaXZhdGUgcHJldmlvdXNGb2N1cz86IEhUTUxFbGVtZW50O1xuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0cnVjdG9yKC4uLmFyZ3M6IEFycmF5PGFueT4pIHtcbiAgICBzdXBlciguLi5hcmdzKTtcblxuICAgIHRoaXMubGF6eVVwZGF0ZVZlcmlmaWVkID0gZGVib3VuY2UoXG4gICAgICB0aGlzLm1vZGVsLnVwZGF0ZVZlcmlmaWVkLmJpbmQodGhpcy5tb2RlbCksXG4gICAgICAxMDAwIC8vIG9uZSBzZWNvbmRcbiAgICApO1xuICAgIHRoaXMubW9kZWwudGhyb3R0bGVkR2V0UHJvZmlsZXMgPVxuICAgICAgdGhpcy5tb2RlbC50aHJvdHRsZWRHZXRQcm9maWxlcyB8fFxuICAgICAgdGhyb3R0bGUodGhpcy5tb2RlbC5nZXRQcm9maWxlcy5iaW5kKHRoaXMubW9kZWwpLCBGSVZFX01JTlVURVMpO1xuXG4gICAgdGhpcy5kZWJvdW5jZWRTYXZlRHJhZnQgPSBkZWJvdW5jZSh0aGlzLnNhdmVEcmFmdC5iaW5kKHRoaXMpLCAyMDApO1xuXG4gICAgLy8gRXZlbnRzIG9uIENvbnZlcnNhdGlvbiBtb2RlbFxuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ2Rlc3Ryb3knLCB0aGlzLnN0b3BMaXN0ZW5pbmcpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ25ld21lc3NhZ2UnLCB0aGlzLmxhenlVcGRhdGVWZXJpZmllZCk7XG5cbiAgICAvLyBUaGVzZSBhcmUgdHJpZ2dlcmVkIGJ5IEluYm94Vmlld1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ29wZW5lZCcsIHRoaXMub25PcGVuZWQpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ3Njcm9sbC10by1tZXNzYWdlJywgdGhpcy5zY3JvbGxUb01lc3NhZ2UpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ3VubG9hZCcsIChyZWFzb246IHN0cmluZykgPT5cbiAgICAgIHRoaXMudW5sb2FkKGBtb2RlbCB0cmlnZ2VyIC0gJHtyZWFzb259YClcbiAgICApO1xuXG4gICAgLy8gVGhlc2UgYXJlIHRyaWdnZXJlZCBieSBiYWNrZ3JvdW5kLnRzIGZvciBrZXlib2FyZCBoYW5kbGluZ1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ2ZvY3VzLWNvbXBvc2VyJywgdGhpcy5mb2N1c01lc3NhZ2VGaWVsZCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnb3Blbi1hbGwtbWVkaWEnLCB0aGlzLnNob3dBbGxNZWRpYSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnZXNjYXBlLXByZXNzZWQnLCB0aGlzLnJlc2V0UGFuZWwpO1xuICAgIHRoaXMubGlzdGVuVG8odGhpcy5tb2RlbCwgJ3Nob3ctbWVzc2FnZS1kZXRhaWxzJywgdGhpcy5zaG93TWVzc2FnZURldGFpbCk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAnc2hvdy1jb250YWN0LW1vZGFsJywgdGhpcy5zaG93Q29udGFjdE1vZGFsKTtcbiAgICB0aGlzLmxpc3RlblRvKFxuICAgICAgdGhpcy5tb2RlbCxcbiAgICAgICd0b2dnbGUtcmVwbHknLFxuICAgICAgKG1lc3NhZ2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGNvbnN0IHRhcmdldCA9IHRoaXMucXVvdGUgfHwgIW1lc3NhZ2VJZCA/IG51bGwgOiBtZXNzYWdlSWQ7XG4gICAgICAgIHRoaXMuc2V0UXVvdGVNZXNzYWdlKHRhcmdldCk7XG4gICAgICB9XG4gICAgKTtcbiAgICB0aGlzLmxpc3RlblRvKFxuICAgICAgdGhpcy5tb2RlbCxcbiAgICAgICdzYXZlLWF0dGFjaG1lbnQnLFxuICAgICAgdGhpcy5kb3dubG9hZEF0dGFjaG1lbnRXcmFwcGVyXG4gICAgKTtcbiAgICB0aGlzLmxpc3RlblRvKHRoaXMubW9kZWwsICdkZWxldGUtbWVzc2FnZScsIHRoaXMuZGVsZXRlTWVzc2FnZSk7XG4gICAgdGhpcy5saXN0ZW5Ubyh0aGlzLm1vZGVsLCAncmVtb3ZlLWxpbmstcmV2aWV3JywgcmVtb3ZlTGlua1ByZXZpZXcpO1xuICAgIHRoaXMubGlzdGVuVG8oXG4gICAgICB0aGlzLm1vZGVsLFxuICAgICAgJ3JlbW92ZS1hbGwtZHJhZnQtYXR0YWNobWVudHMnLFxuICAgICAgdGhpcy5jbGVhckF0dGFjaG1lbnRzXG4gICAgKTtcblxuICAgIHRoaXMucmVuZGVyKCk7XG5cbiAgICB0aGlzLnNldHVwQ29udmVyc2F0aW9uVmlldygpO1xuICAgIHRoaXMudXBkYXRlQXR0YWNobWVudHNWaWV3KCk7XG4gIH1cblxuICBvdmVycmlkZSBldmVudHMoKTogUmVjb3JkPHN0cmluZywgc3RyaW5nPiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGRyb3A6ICdvbkRyb3AnLFxuICAgICAgcGFzdGU6ICdvblBhc3RlJyxcbiAgICB9O1xuICB9XG5cbiAgLy8gV2UgbmVlZCB0aGlzIGlnbm9yZSBiZWNhdXNlIHRoZSBiYWNrYm9uZSB0eXBlcyByZWFsbHkgd2FudCB0aGlzIHRvIGJlIGEgc3RyaW5nXG4gIC8vICAgcHJvcGVydHksIGJ1dCB0aGUgcHJvcGVydHkgaXNuJ3Qgc2V0IHVudGlsIGFmdGVyIHN1cGVyKCkgaXMgcnVuLCBtZWFuaW5nIHRoYXQgdGhpc1xuICAvLyAgIGNsYXNzbmFtZSB3b3VsZG4ndCBiZSBhcHBsaWVkIHdoZW4gQmFja2JvbmUgY3JlYXRlcyBvdXIgZWwuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgLy8gQHRzLWlnbm9yZVxuICBjbGFzc05hbWUoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gJ2NvbnZlcnNhdGlvbic7XG4gIH1cblxuICAvLyBTYW1lIHNpdHVhdGlvbiBhcyBjbGFzc05hbWUoKS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9iYW4tdHMtY29tbWVudFxuICAvLyBAdHMtaWdub3JlXG4gIGlkKCk6IHN0cmluZyB7XG4gICAgcmV0dXJuIGBjb252ZXJzYXRpb24tJHt0aGlzLm1vZGVsLmNpZH1gO1xuICB9XG5cbiAgLy8gQmFja2JvbmUuVmlldzxDb252ZXJzYXRpb25Nb2RlbD4gaXMgZGVtYW5kZWQgYXMgdGhlIHJldHVybiB0eXBlIGhlcmUsIGFuZCB3ZSBjYW4ndFxuICAvLyAgIHNhdGlzZnkgaXQgYmVjYXVzZSBvZiB0aGUgYWJvdmUgZGlmZmVyZW5jZSBpbiBzaWduYXR1cmU6IGNsYXNzTmFtZSBpcyBhIGZ1bmN0aW9uXG4gIC8vICAgd2hlbiBpdCBzaG91bGQgYmUgYSBwbGFpbiBzdHJpbmcgcHJvcGVydHkuXG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvYmFuLXRzLWNvbW1lbnRcbiAgLy8gQHRzLWlnbm9yZVxuICByZW5kZXIoKTogQ29udmVyc2F0aW9uVmlldyB7XG4gICAgY29uc3QgdGVtcGxhdGUgPSAkKCcjY29udmVyc2F0aW9uJykuaHRtbCgpO1xuICAgIHRoaXMuJGVsLmh0bWwocmVuZGVyKHRlbXBsYXRlLCB7fSkpO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG5cbiAgc2V0TXV0ZUV4cGlyYXRpb24obXMgPSAwKTogdm9pZCB7XG4gICAgdGhpcy5tb2RlbC5zZXRNdXRlRXhwaXJhdGlvbihcbiAgICAgIG1zID49IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSID8gbXMgOiBEYXRlLm5vdygpICsgbXNcbiAgICApO1xuICB9XG5cbiAgc2V0UGluKHZhbHVlOiBib29sZWFuKTogdm9pZCB7XG4gICAgaWYgKHZhbHVlKSB7XG4gICAgICBjb25zdCBwaW5uZWRDb252ZXJzYXRpb25JZHMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoXG4gICAgICAgICdwaW5uZWRDb252ZXJzYXRpb25JZHMnLFxuICAgICAgICBuZXcgQXJyYXk8c3RyaW5nPigpXG4gICAgICApO1xuXG4gICAgICBpZiAocGlubmVkQ29udmVyc2F0aW9uSWRzLmxlbmd0aCA+PSA0KSB7XG4gICAgICAgIHNob3dUb2FzdChUb2FzdFBpbm5lZENvbnZlcnNhdGlvbnNGdWxsKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdGhpcy5tb2RlbC5waW4oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tb2RlbC51bnBpbigpO1xuICAgIH1cbiAgfVxuXG4gIHNldHVwQ29udmVyc2F0aW9uVmlldygpOiB2b2lkIHtcbiAgICAvLyBzZXR1cEhlYWRlclxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbkhlYWRlclByb3BzID0ge1xuICAgICAgaWQ6IHRoaXMubW9kZWwuaWQsXG5cbiAgICAgIG9uU2V0RGlzYXBwZWFyaW5nTWVzc2FnZXM6IChzZWNvbmRzOiBudW1iZXIpID0+XG4gICAgICAgIHRoaXMuc2V0RGlzYXBwZWFyaW5nTWVzc2FnZXMoc2Vjb25kcyksXG4gICAgICBvbkRlbGV0ZU1lc3NhZ2VzOiAoKSA9PiB0aGlzLmRlc3Ryb3lNZXNzYWdlcygpLFxuICAgICAgb25TZWFyY2hJbkNvbnZlcnNhdGlvbjogKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHNlYXJjaEluQ29udmVyc2F0aW9uIH0gPSB3aW5kb3cucmVkdXhBY3Rpb25zLnNlYXJjaDtcbiAgICAgICAgc2VhcmNoSW5Db252ZXJzYXRpb24odGhpcy5tb2RlbC5pZCk7XG4gICAgICB9LFxuICAgICAgb25TZXRNdXRlTm90aWZpY2F0aW9uczogdGhpcy5zZXRNdXRlRXhwaXJhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgb25TZXRQaW46IHRoaXMuc2V0UGluLmJpbmQodGhpcyksXG4gICAgICAvLyBUaGVzZSBhcmUgdmlldyBvbmx5IGFuZCBkb24ndCB1cGRhdGUgdGhlIENvbnZlcnNhdGlvbiBtb2RlbCwgc28gdGhleVxuICAgICAgLy8gICBuZWVkIGEgbWFudWFsIHVwZGF0ZSBjYWxsLlxuICAgICAgb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uOlxuICAgICAgICB0aGlzLm9uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbi5iaW5kKHRoaXMpLFxuICAgICAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOlxuICAgICAgICB0aGlzLm9uT3V0Z29pbmdWaWRlb0NhbGxJbkNvbnZlcnNhdGlvbi5iaW5kKHRoaXMpLFxuXG4gICAgICBvblNob3dDb252ZXJzYXRpb25EZXRhaWxzOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0NvbnZlcnNhdGlvbkRldGFpbHMoKTtcbiAgICAgIH0sXG4gICAgICBvblNob3dBbGxNZWRpYTogKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dBbGxNZWRpYSgpO1xuICAgICAgfSxcbiAgICAgIG9uU2hvd0dyb3VwTWVtYmVyczogKCkgPT4ge1xuICAgICAgICB0aGlzLnNob3dHVjFNZW1iZXJzKCk7XG4gICAgICB9LFxuICAgICAgb25Hb0JhY2s6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFBhbmVsKCk7XG4gICAgICB9LFxuXG4gICAgICBvbkFyY2hpdmU6ICgpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRBcmNoaXZlZCh0cnVlKTtcbiAgICAgICAgdGhpcy5tb2RlbC50cmlnZ2VyKCd1bmxvYWQnLCAnYXJjaGl2ZScpO1xuXG4gICAgICAgIHNob3dUb2FzdChUb2FzdENvbnZlcnNhdGlvbkFyY2hpdmVkLCB7XG4gICAgICAgICAgdW5kbzogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5tb2RlbC5zZXRBcmNoaXZlZChmYWxzZSk7XG4gICAgICAgICAgICB0aGlzLm9wZW5Db252ZXJzYXRpb24odGhpcy5tb2RlbC5nZXQoJ2lkJykpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIG9uTWFya1VucmVhZDogKCkgPT4ge1xuICAgICAgICB0aGlzLm1vZGVsLnNldE1hcmtlZFVucmVhZCh0cnVlKTtcblxuICAgICAgICBzaG93VG9hc3QoVG9hc3RDb252ZXJzYXRpb25NYXJrZWRVbnJlYWQpO1xuICAgICAgfSxcbiAgICAgIG9uTW92ZVRvSW5ib3g6ICgpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbC5zZXRBcmNoaXZlZChmYWxzZSk7XG5cbiAgICAgICAgc2hvd1RvYXN0KFRvYXN0Q29udmVyc2F0aW9uVW5hcmNoaXZlZCk7XG4gICAgICB9LFxuICAgIH07XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFNlbGVjdGVkQ29udmVyc2F0aW9uSGVhZGVyVGl0bGUoKTtcblxuICAgIC8vIHNldHVwVGltZWxpbmVcbiAgICBjb25zdCBtZXNzYWdlUmVxdWVzdEVudW0gPSBQcm90by5TeW5jTWVzc2FnZS5NZXNzYWdlUmVxdWVzdFJlc3BvbnNlLlR5cGU7XG5cbiAgICBjb25zdCBjb250YWN0U3VwcG9ydCA9ICgpID0+IHtcbiAgICAgIGNvbnN0IGJhc2VVcmwgPVxuICAgICAgICAnaHR0cHM6Ly9zdXBwb3J0LnNpZ25hbC5vcmcvaGMvTE9DQUxFL3JlcXVlc3RzL25ldz9kZXNrdG9wJmNoYXRfcmVmcmVzaGVkJztcbiAgICAgIGNvbnN0IGxvY2FsZSA9IHdpbmRvdy5nZXRMb2NhbGUoKTtcbiAgICAgIGNvbnN0IHN1cHBvcnRMb2NhbGUgPSB3aW5kb3cuU2lnbmFsLlV0aWwubWFwVG9TdXBwb3J0TG9jYWxlKGxvY2FsZSk7XG4gICAgICBjb25zdCB1cmwgPSBiYXNlVXJsLnJlcGxhY2UoJ0xPQ0FMRScsIHN1cHBvcnRMb2NhbGUpO1xuXG4gICAgICBvcGVuTGlua0luV2ViQnJvd3Nlcih1cmwpO1xuICAgIH07XG5cbiAgICBjb25zdCBsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUgPSAoKSA9PiB7XG4gICAgICBvcGVuTGlua0luV2ViQnJvd3NlcihcbiAgICAgICAgJ2h0dHBzOi8vc3VwcG9ydC5zaWduYWwub3JnL2hjL2FydGljbGVzLzQ0MDQ4NTk3NDU2OTAnXG4gICAgICApO1xuICAgIH07XG5cbiAgICBjb25zdCBzY3JvbGxUb1F1b3RlZE1lc3NhZ2UgPSBhc3luYyAoXG4gICAgICBvcHRpb25zOiBSZWFkb25seTx7XG4gICAgICAgIGF1dGhvcklkOiBzdHJpbmc7XG4gICAgICAgIHNlbnRBdDogbnVtYmVyO1xuICAgICAgfT5cbiAgICApID0+IHtcbiAgICAgIGNvbnN0IHsgYXV0aG9ySWQsIHNlbnRBdCB9ID0gb3B0aW9ucztcblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLm1vZGVsLmlkO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRNZXNzYWdlc0J5U2VudEF0KHNlbnRBdCk7XG4gICAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZXMuZmluZChpdGVtID0+XG4gICAgICAgIEJvb2xlYW4oXG4gICAgICAgICAgaXRlbS5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uSWQgJiZcbiAgICAgICAgICAgIGF1dGhvcklkICYmXG4gICAgICAgICAgICBnZXRDb250YWN0SWQoaXRlbSkgPT09IGF1dGhvcklkXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICBzaG93VG9hc3QoVG9hc3RPcmlnaW5hbE1lc3NhZ2VOb3RGb3VuZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zY3JvbGxUb01lc3NhZ2UobWVzc2FnZS5pZCk7XG4gICAgfTtcblxuICAgIGNvbnN0IG1hcmtNZXNzYWdlUmVhZCA9IGFzeW5jIChtZXNzYWdlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgaWYgKCF3aW5kb3cuaXNBY3RpdmUoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBnZXRBY3RpdmVDYWxsU3RhdGUod2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKSk7XG4gICAgICBpZiAoYWN0aXZlQ2FsbCAmJiAhYWN0aXZlQ2FsbC5waXApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgZ2V0TWVzc2FnZUJ5SWQobWVzc2FnZUlkKTtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYG1hcmtNZXNzYWdlUmVhZDogZmFpbGVkIHRvIGxvYWQgbWVzc2FnZSAke21lc3NhZ2VJZH1gKTtcbiAgICAgIH1cblxuICAgICAgYXdhaXQgdGhpcy5tb2RlbC5tYXJrUmVhZChtZXNzYWdlLmdldCgncmVjZWl2ZWRfYXQnKSwge1xuICAgICAgICBuZXdlc3RTZW50QXQ6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgIHNlbmRSZWFkUmVjZWlwdHM6IHRydWUsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3QgY3JlYXRlTWVzc2FnZVJlcXVlc3RSZXNwb25zZUhhbmRsZXIgPVxuICAgICAgKG5hbWU6IHN0cmluZywgZW51bVZhbHVlOiBudW1iZXIpOiAoKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHZvaWQpID0+XG4gICAgICBjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgYGNyZWF0ZU1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VIYW5kbGVyOiBFeHBlY3RlZCBhIGNvbnZlcnNhdGlvbiB0byBiZSBmb3VuZCBpbiAke25hbWV9LiBEb2luZyBub3RoaW5nYFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHRoaXMuc3luY01lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UobmFtZSwgY29udmVyc2F0aW9uLCBlbnVtVmFsdWUpO1xuICAgICAgfTtcblxuICAgIGNvbnN0IHRpbWVsaW5lUHJvcHMgPSB7XG4gICAgICBpZDogdGhpcy5tb2RlbC5pZCxcblxuICAgICAgLi4udGhpcy5nZXRNZXNzYWdlQWN0aW9ucygpLFxuXG4gICAgICBhY2tub3dsZWRnZUdyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbnM6IChcbiAgICAgICAgZ3JvdXBOYW1lQ29sbGlzaW9uczogUmVhZG9ubHk8R3JvdXBOYW1lQ29sbGlzaW9uc1dpdGhJZHNCeVRpdGxlPlxuICAgICAgKTogdm9pZCA9PiB7XG4gICAgICAgIHRoaXMubW9kZWwuYWNrbm93bGVkZ2VHcm91cE1lbWJlck5hbWVDb2xsaXNpb25zKGdyb3VwTmFtZUNvbGxpc2lvbnMpO1xuICAgICAgfSxcbiAgICAgIGJsb2NrR3JvdXBMaW5rUmVxdWVzdHM6ICh1dWlkOiBVVUlEU3RyaW5nVHlwZSkgPT4ge1xuICAgICAgICB0aGlzLm1vZGVsLmJsb2NrR3JvdXBMaW5rUmVxdWVzdHModXVpZCk7XG4gICAgICB9LFxuICAgICAgY29udGFjdFN1cHBvcnQsXG4gICAgICBsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUsXG4gICAgICBsb2FkTmV3ZXJNZXNzYWdlczogdGhpcy5tb2RlbC5sb2FkTmV3ZXJNZXNzYWdlcy5iaW5kKHRoaXMubW9kZWwpLFxuICAgICAgbG9hZE5ld2VzdE1lc3NhZ2VzOiB0aGlzLm1vZGVsLmxvYWROZXdlc3RNZXNzYWdlcy5iaW5kKHRoaXMubW9kZWwpLFxuICAgICAgbG9hZE9sZGVyTWVzc2FnZXM6IHRoaXMubW9kZWwubG9hZE9sZGVyTWVzc2FnZXMuYmluZCh0aGlzLm1vZGVsKSxcbiAgICAgIG1hcmtNZXNzYWdlUmVhZCxcbiAgICAgIG9uQmxvY2s6IGNyZWF0ZU1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VIYW5kbGVyKFxuICAgICAgICAnb25CbG9jaycsXG4gICAgICAgIG1lc3NhZ2VSZXF1ZXN0RW51bS5CTE9DS1xuICAgICAgKSxcbiAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgIGBvbkJsb2NrQW5kUmVwb3J0U3BhbTogRXhwZWN0ZWQgYSBjb252ZXJzYXRpb24gdG8gYmUgZm91bmQgZm9yICR7Y29udmVyc2F0aW9uSWR9LiBEb2luZyBub3RoaW5nLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmJsb2NrQW5kUmVwb3J0U3BhbShjb252ZXJzYXRpb24pO1xuICAgICAgfSxcbiAgICAgIG9uRGVsZXRlOiBjcmVhdGVNZXNzYWdlUmVxdWVzdFJlc3BvbnNlSGFuZGxlcihcbiAgICAgICAgJ29uRGVsZXRlJyxcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RFbnVtLkRFTEVURVxuICAgICAgKSxcbiAgICAgIG9uVW5ibG9jazogY3JlYXRlTWVzc2FnZVJlcXVlc3RSZXNwb25zZUhhbmRsZXIoXG4gICAgICAgICdvblVuYmxvY2snLFxuICAgICAgICBtZXNzYWdlUmVxdWVzdEVudW0uQUNDRVBUXG4gICAgICApLFxuICAgICAgcmVtb3ZlTWVtYmVyOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICB0aGlzLmxvbmdSdW5uaW5nVGFza1dyYXBwZXIoe1xuICAgICAgICAgIG5hbWU6ICdyZW1vdmVNZW1iZXInLFxuICAgICAgICAgIHRhc2s6ICgpID0+IHRoaXMubW9kZWwucmVtb3ZlRnJvbUdyb3VwVjIoY29udmVyc2F0aW9uSWQpLFxuICAgICAgICB9KTtcbiAgICAgIH0sXG4gICAgICBzY3JvbGxUb1F1b3RlZE1lc3NhZ2UsXG4gICAgICB1bmJsdXJBdmF0YXI6ICgpID0+IHtcbiAgICAgICAgdGhpcy5tb2RlbC51bmJsdXJBdmF0YXIoKTtcbiAgICAgIH0sXG4gICAgICB1cGRhdGVTaGFyZWRHcm91cHM6ICgpID0+IHRoaXMubW9kZWwudGhyb3R0bGVkVXBkYXRlU2hhcmVkR3JvdXBzPy4oKSxcbiAgICB9O1xuXG4gICAgLy8gc2V0dXBDb21wb3NpdGlvbkFyZWFcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbXBvc2VyLnJlc2V0Q29tcG9zZXIoKTtcblxuICAgIGNvbnN0IGNvbXBvc2l0aW9uQXJlYVByb3BzID0ge1xuICAgICAgaWQ6IHRoaXMubW9kZWwuaWQsXG4gICAgICBjb21wb3NpdGlvbkFwaTogdGhpcy5jb21wb3NpdGlvbkFwaSxcbiAgICAgIG9uQ2xpY2tBZGRQYWNrOiAoKSA9PiB0aGlzLnNob3dTdGlja2VyTWFuYWdlcigpLFxuICAgICAgb25QaWNrU3RpY2tlcjogKHBhY2tJZDogc3RyaW5nLCBzdGlja2VySWQ6IG51bWJlcikgPT5cbiAgICAgICAgdGhpcy5zZW5kU3RpY2tlck1lc3NhZ2UoeyBwYWNrSWQsIHN0aWNrZXJJZCB9KSxcbiAgICAgIG9uRWRpdG9yU3RhdGVDaGFuZ2U6IChcbiAgICAgICAgbXNnOiBzdHJpbmcsXG4gICAgICAgIGJvZHlSYW5nZXM6IEFycmF5PEJvZHlSYW5nZVR5cGU+LFxuICAgICAgICBjYXJldExvY2F0aW9uPzogbnVtYmVyXG4gICAgICApID0+IHRoaXMub25FZGl0b3JTdGF0ZUNoYW5nZShtc2csIGJvZHlSYW5nZXMsIGNhcmV0TG9jYXRpb24pLFxuICAgICAgb25UZXh0VG9vTG9uZzogKCkgPT4gc2hvd1RvYXN0KFRvYXN0TWVzc2FnZUJvZHlUb29Mb25nKSxcbiAgICAgIGdldFF1b3RlZE1lc3NhZ2U6ICgpID0+IHRoaXMubW9kZWwuZ2V0KCdxdW90ZWRNZXNzYWdlSWQnKSxcbiAgICAgIGNsZWFyUXVvdGVkTWVzc2FnZTogKCkgPT4gdGhpcy5zZXRRdW90ZU1lc3NhZ2UobnVsbCksXG4gICAgICBvbkFjY2VwdDogKCkgPT4ge1xuICAgICAgICB0aGlzLnN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgICAgICAgICdvbkFjY2VwdCcsXG4gICAgICAgICAgdGhpcy5tb2RlbCxcbiAgICAgICAgICBtZXNzYWdlUmVxdWVzdEVudW0uQUNDRVBUXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgb25CbG9jazogKCkgPT4ge1xuICAgICAgICB0aGlzLnN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgICAgICAgICdvbkJsb2NrJyxcbiAgICAgICAgICB0aGlzLm1vZGVsLFxuICAgICAgICAgIG1lc3NhZ2VSZXF1ZXN0RW51bS5CTE9DS1xuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG9uVW5ibG9jazogKCkgPT4ge1xuICAgICAgICB0aGlzLnN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgICAgICAgICdvblVuYmxvY2snLFxuICAgICAgICAgIHRoaXMubW9kZWwsXG4gICAgICAgICAgbWVzc2FnZVJlcXVlc3RFbnVtLkFDQ0VQVFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIG9uRGVsZXRlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMuc3luY01lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UoXG4gICAgICAgICAgJ29uRGVsZXRlJyxcbiAgICAgICAgICB0aGlzLm1vZGVsLFxuICAgICAgICAgIG1lc3NhZ2VSZXF1ZXN0RW51bS5ERUxFVEVcbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICBvbkJsb2NrQW5kUmVwb3J0U3BhbTogKCkgPT4ge1xuICAgICAgICB0aGlzLmJsb2NrQW5kUmVwb3J0U3BhbSh0aGlzLm1vZGVsKTtcbiAgICAgIH0sXG4gICAgICBvblN0YXJ0R3JvdXBNaWdyYXRpb246ICgpID0+IHRoaXMuc3RhcnRNaWdyYXRpb25Ub0dWMigpLFxuICAgICAgb25DYW5jZWxKb2luUmVxdWVzdDogYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCB3aW5kb3cuc2hvd0NvbmZpcm1hdGlvbkRpYWxvZyh7XG4gICAgICAgICAgbWVzc2FnZTogd2luZG93LmkxOG4oXG4gICAgICAgICAgICAnR3JvdXBWMi0tam9pbi0tY2FuY2VsLXJlcXVlc3QtdG8tam9pbi0tY29uZmlybWF0aW9uJ1xuICAgICAgICAgICksXG4gICAgICAgICAgb2tUZXh0OiB3aW5kb3cuaTE4bignR3JvdXBWMi0tam9pbi0tY2FuY2VsLXJlcXVlc3QtdG8tam9pbi0teWVzJyksXG4gICAgICAgICAgY2FuY2VsVGV4dDogd2luZG93LmkxOG4oJ0dyb3VwVjItLWpvaW4tLWNhbmNlbC1yZXF1ZXN0LXRvLWpvaW4tLW5vJyksXG4gICAgICAgICAgcmVzb2x2ZTogKCkgPT4ge1xuICAgICAgICAgICAgdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgICAgICAgICAgbmFtZTogJ29uQ2FuY2VsSm9pblJlcXVlc3QnLFxuICAgICAgICAgICAgICB0YXNrOiBhc3luYyAoKSA9PiB0aGlzLm1vZGVsLmNhbmNlbEpvaW5SZXF1ZXN0KCksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0sXG5cbiAgICAgIG9uQ2xlYXJBdHRhY2htZW50czogdGhpcy5jbGVhckF0dGFjaG1lbnRzLmJpbmQodGhpcyksXG4gICAgICBvblNlbGVjdE1lZGlhUXVhbGl0eTogKGlzSFE6IGJvb2xlYW4pID0+IHtcbiAgICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb21wb3Nlci5zZXRNZWRpYVF1YWxpdHlTZXR0aW5nKGlzSFEpO1xuICAgICAgfSxcblxuICAgICAgaGFuZGxlQ2xpY2tRdW90ZWRNZXNzYWdlOiAoaWQ6IHN0cmluZykgPT4gdGhpcy5zY3JvbGxUb01lc3NhZ2UoaWQpLFxuXG4gICAgICBvbkNsb3NlTGlua1ByZXZpZXc6ICgpID0+IHtcbiAgICAgICAgc3VzcGVuZExpbmtQcmV2aWV3cygpO1xuICAgICAgICByZW1vdmVMaW5rUHJldmlldygpO1xuICAgICAgfSxcblxuICAgICAgb3BlbkNvbnZlcnNhdGlvbjogdGhpcy5vcGVuQ29udmVyc2F0aW9uLmJpbmQodGhpcyksXG5cbiAgICAgIG9uU2VuZE1lc3NhZ2U6ICh7XG4gICAgICAgIGRyYWZ0QXR0YWNobWVudHMsXG4gICAgICAgIG1lbnRpb25zID0gW10sXG4gICAgICAgIG1lc3NhZ2UgPSAnJyxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB2b2ljZU5vdGVBdHRhY2htZW50LFxuICAgICAgfToge1xuICAgICAgICBkcmFmdEF0dGFjaG1lbnRzPzogUmVhZG9ubHlBcnJheTxBdHRhY2htZW50VHlwZT47XG4gICAgICAgIG1lbnRpb25zPzogQm9keVJhbmdlc1R5cGU7XG4gICAgICAgIG1lc3NhZ2U/OiBzdHJpbmc7XG4gICAgICAgIHRpbWVzdGFtcD86IG51bWJlcjtcbiAgICAgICAgdm9pY2VOb3RlQXR0YWNobWVudD86IEF0dGFjaG1lbnRUeXBlO1xuICAgICAgfSk6IHZvaWQgPT4ge1xuICAgICAgICB0aGlzLnNlbmRNZXNzYWdlKG1lc3NhZ2UsIG1lbnRpb25zLCB7XG4gICAgICAgICAgZHJhZnRBdHRhY2htZW50cyxcbiAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgdm9pY2VOb3RlQXR0YWNobWVudCxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgIH07XG5cbiAgICAvLyBjcmVhdGVDb252ZXJzYXRpb25WaWV3IHJvb3RcblxuICAgIGNvbnN0IEpTWCA9IGNyZWF0ZUNvbnZlcnNhdGlvblZpZXcod2luZG93LnJlZHV4U3RvcmUsIHtcbiAgICAgIGNvbXBvc2l0aW9uQXJlYVByb3BzLFxuICAgICAgY29udmVyc2F0aW9uSGVhZGVyUHJvcHMsXG4gICAgICB0aW1lbGluZVByb3BzLFxuICAgIH0pO1xuXG4gICAgdGhpcy5jb252ZXJzYXRpb25WaWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoeyBKU1ggfSk7XG4gICAgdGhpcy4kKCcuQ29udmVyc2F0aW9uVmlld19fdGVtcGxhdGUnKS5hcHBlbmQodGhpcy5jb252ZXJzYXRpb25WaWV3LmVsKTtcbiAgfVxuXG4gIGFzeW5jIG9uT3V0Z29pbmdWaWRlb0NhbGxJbkNvbnZlcnNhdGlvbigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiBhYm91dCB0byBzdGFydCBhIHZpZGVvIGNhbGwnKTtcblxuICAgIGlmICh0aGlzLm1vZGVsLmdldCgnYW5ub3VuY2VtZW50c09ubHknKSAmJiAhdGhpcy5tb2RlbC5hcmVXZUFkbWluKCkpIHtcbiAgICAgIHNob3dUb2FzdChUb2FzdENhbm5vdFN0YXJ0R3JvdXBDYWxsKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoYXdhaXQgdGhpcy5pc0NhbGxTYWZlKCkpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiBjYWxsIGlzIGRlZW1lZCBcInNhZmVcIi4gTWFraW5nIGNhbGwnXG4gICAgICApO1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jYWxsaW5nLnN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMubW9kZWwuaWQsXG4gICAgICAgIGlzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgfSk7XG4gICAgICBsb2cuaW5mbygnb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiBzdGFydGVkIHRoZSBjYWxsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiBjYWxsIGlzIGRlZW1lZCBcInVuc2FmZVwiLiBTdG9wcGluZydcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb246IGFib3V0IHRvIHN0YXJ0IGFuIGF1ZGlvIGNhbGwnKTtcblxuICAgIGlmIChhd2FpdCB0aGlzLmlzQ2FsbFNhZmUoKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb246IGNhbGwgaXMgZGVlbWVkIFwic2FmZVwiLiBNYWtpbmcgY2FsbCdcbiAgICAgICk7XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNhbGxpbmcuc3RhcnRDYWxsaW5nTG9iYnkoe1xuICAgICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5tb2RlbC5pZCxcbiAgICAgICAgaXNWaWRlb0NhbGw6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgICBsb2cuaW5mbygnb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uOiBzdGFydGVkIHRoZSBjYWxsJyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnb25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uOiBjYWxsIGlzIGRlZW1lZCBcInVuc2FmZVwiLiBTdG9wcGluZydcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcjxUPih7XG4gICAgbmFtZSxcbiAgICB0YXNrLFxuICB9OiB7XG4gICAgbmFtZTogc3RyaW5nO1xuICAgIHRhc2s6ICgpID0+IFByb21pc2U8VD47XG4gIH0pOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCBpZEZvckxvZ2dpbmcgPSB0aGlzLm1vZGVsLmlkRm9yTG9nZ2luZygpO1xuICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLlV0aWwubG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICBuYW1lLFxuICAgICAgaWRGb3JMb2dnaW5nLFxuICAgICAgdGFzayxcbiAgICB9KTtcbiAgfVxuXG4gIGdldE1lc3NhZ2VBY3Rpb25zKCk6IE1lc3NhZ2VBY3Rpb25zVHlwZSB7XG4gICAgY29uc3QgcmVhY3RUb01lc3NhZ2UgPSBhc3luYyAoXG4gICAgICBtZXNzYWdlSWQ6IHN0cmluZyxcbiAgICAgIHJlYWN0aW9uOiB7IGVtb2ppOiBzdHJpbmc7IHJlbW92ZTogYm9vbGVhbiB9XG4gICAgKSA9PiB7XG4gICAgICBjb25zdCB7IGVtb2ppLCByZW1vdmUgfSA9IHJlYWN0aW9uO1xuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZCh7XG4gICAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICAgIGVtb2ppLFxuICAgICAgICAgIHJlbW92ZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoJ0Vycm9yIHNlbmRpbmcgcmVhY3Rpb24nLCBlcnJvciwgbWVzc2FnZUlkLCByZWFjdGlvbik7XG4gICAgICAgIHNob3dUb2FzdChUb2FzdFJlYWN0aW9uRmFpbGVkKTtcbiAgICAgIH1cbiAgICB9O1xuICAgIGNvbnN0IHJlcGx5VG9NZXNzYWdlID0gKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNldFF1b3RlTWVzc2FnZShtZXNzYWdlSWQpO1xuICAgIH07XG4gICAgY29uc3QgcmV0cnlTZW5kID0gcmV0cnlNZXNzYWdlU2VuZDtcbiAgICBjb25zdCBkZWxldGVNZXNzYWdlID0gKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLmRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkKTtcbiAgICB9O1xuICAgIGNvbnN0IGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZSA9IChtZXNzYWdlSWQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5kZWxldGVNZXNzYWdlRm9yRXZlcnlvbmUobWVzc2FnZUlkKTtcbiAgICB9O1xuICAgIGNvbnN0IHNob3dNZXNzYWdlRGV0YWlsID0gKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNob3dNZXNzYWdlRGV0YWlsKG1lc3NhZ2VJZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93Q29udGFjdE1vZGFsID0gKGNvbnRhY3RJZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNob3dDb250YWN0TW9kYWwoY29udGFjdElkKTtcbiAgICB9O1xuICAgIGNvbnN0IG9wZW5Db252ZXJzYXRpb24gPSAoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgbWVzc2FnZUlkPzogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLm9wZW5Db252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIG1lc3NhZ2VJZCk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93Q29udGFjdERldGFpbCA9IChvcHRpb25zOiB7XG4gICAgICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlO1xuICAgICAgc2lnbmFsQWNjb3VudD86IHtcbiAgICAgICAgcGhvbmVOdW1iZXI6IHN0cmluZztcbiAgICAgICAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gICAgICB9O1xuICAgIH0pID0+IHtcbiAgICAgIHRoaXMuc2hvd0NvbnRhY3REZXRhaWwob3B0aW9ucyk7XG4gICAgfTtcbiAgICBjb25zdCBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkID0gYXN5bmMgKFxuICAgICAgb3B0aW9uczogUmVhZG9ubHk8eyBtZXNzYWdlSWQ6IHN0cmluZyB9PlxuICAgICkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG9wdGlvbnMubWVzc2FnZUlkKTtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQ6IE1lc3NhZ2UgJHtvcHRpb25zLm1lc3NhZ2VJZH0gbWlzc2luZyFgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBhd2FpdCBtZXNzYWdlLnF1ZXVlQXR0YWNobWVudERvd25sb2FkcygpO1xuICAgIH07XG4gICAgY29uc3QgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZCA9IChvcHRpb25zOiBBdHRhY2htZW50T3B0aW9ucykgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG9wdGlvbnMubWVzc2FnZUlkKTtcbiAgICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYG1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQ6IE1lc3NhZ2UgJHtvcHRpb25zLm1lc3NhZ2VJZH0gbWlzc2luZyFgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBtZXNzYWdlLm1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQob3B0aW9ucy5hdHRhY2htZW50KTtcbiAgICB9O1xuICAgIGNvbnN0IG9uTWFya1ZpZXdlZCA9IChtZXNzYWdlSWQ6IHN0cmluZyk6IHZvaWQgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG1lc3NhZ2VJZCk7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKGBvbk1hcmtWaWV3ZWQ6IE1lc3NhZ2UgJHttZXNzYWdlSWR9IG1pc3NpbmchYCk7XG4gICAgICB9XG5cbiAgICAgIGlmIChtZXNzYWdlLmdldCgncmVhZFN0YXR1cycpID09PSBSZWFkU3RhdHVzLlZpZXdlZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNlbmRlckUxNjQgPSBtZXNzYWdlLmdldCgnc291cmNlJyk7XG4gICAgICBjb25zdCBzZW5kZXJVdWlkID0gbWVzc2FnZS5nZXQoJ3NvdXJjZVV1aWQnKTtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG1lc3NhZ2UuZ2V0KCdzZW50X2F0Jyk7XG5cbiAgICAgIG1lc3NhZ2Uuc2V0KG1hcmtWaWV3ZWQobWVzc2FnZS5hdHRyaWJ1dGVzLCBEYXRlLm5vdygpKSk7XG5cbiAgICAgIGlmIChpc0luY29taW5nKG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgICAgdmlld2VkUmVjZWlwdHNKb2JRdWV1ZS5hZGQoe1xuICAgICAgICAgIHZpZXdlZFJlY2VpcHQ6IHtcbiAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgIHNlbmRlckUxNjQsXG4gICAgICAgICAgICBzZW5kZXJVdWlkLFxuICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICB2aWV3U3luY0pvYlF1ZXVlLmFkZCh7XG4gICAgICAgIHZpZXdTeW5jczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgIHNlbmRlckUxNjQsXG4gICAgICAgICAgICBzZW5kZXJVdWlkLFxuICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICB9O1xuICAgIGNvbnN0IHNob3dWaXN1YWxBdHRhY2htZW50ID0gKG9wdGlvbnM6IHtcbiAgICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICAgICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gICAgICBzaG93U2luZ2xlPzogYm9vbGVhbjtcbiAgICB9KSA9PiB7XG4gICAgICB0aGlzLnNob3dMaWdodGJveChvcHRpb25zKTtcbiAgICB9O1xuICAgIGNvbnN0IGRvd25sb2FkQXR0YWNobWVudCA9IChvcHRpb25zOiB7XG4gICAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgICAgaXNEYW5nZXJvdXM6IGJvb2xlYW47XG4gICAgfSkgPT4ge1xuICAgICAgdGhpcy5kb3dubG9hZEF0dGFjaG1lbnQob3B0aW9ucyk7XG4gICAgfTtcbiAgICBjb25zdCBkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZSA9IChtZXNzYWdlSWQ6IHN0cmluZykgPT5cbiAgICAgIHRoaXMuZGlzcGxheVRhcFRvVmlld01lc3NhZ2UobWVzc2FnZUlkKTtcbiAgICBjb25zdCBzaG93SWRlbnRpdHkgPSAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgdGhpcy5zaG93U2FmZXR5TnVtYmVyKGNvbnZlcnNhdGlvbklkKTtcbiAgICB9O1xuICAgIGNvbnN0IG9wZW5HaWZ0QmFkZ2UgPSAobWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIuZ2V0QnlJZChtZXNzYWdlSWQpO1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihgb3BlbkdpZnRCYWRnZTogTWVzc2FnZSAke21lc3NhZ2VJZH0gbWlzc2luZyFgKTtcbiAgICAgIH1cblxuICAgICAgc2hvd1RvYXN0KFRvYXN0Q2Fubm90T3BlbkdpZnRCYWRnZSwge1xuICAgICAgICBpc0luY29taW5nOiBpc0luY29taW5nKG1lc3NhZ2UuYXR0cmlidXRlcyksXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgb3BlbkxpbmsgPSBvcGVuTGlua0luV2ViQnJvd3NlcjtcbiAgICBjb25zdCBkb3dubG9hZE5ld1ZlcnNpb24gPSAoKSA9PiB7XG4gICAgICBvcGVuTGlua0luV2ViQnJvd3NlcignaHR0cHM6Ly9zaWduYWwub3JnL2Rvd25sb2FkJyk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93U2FmZXR5TnVtYmVyID0gKGNvbnRhY3RJZDogc3RyaW5nKSA9PiB7XG4gICAgICB0aGlzLnNob3dTYWZldHlOdW1iZXIoY29udGFjdElkKTtcbiAgICB9O1xuICAgIGNvbnN0IHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCA9ICgpID0+IHtcbiAgICAgIGxvZy5pbmZvKCdTaG93aW5nIGV4cGlyZWQgdGFwLXRvLXZpZXcgdG9hc3QgZm9yIGFuIGluY29taW5nIG1lc3NhZ2UnKTtcbiAgICAgIHNob3dUb2FzdChUb2FzdFRhcFRvVmlld0V4cGlyZWRJbmNvbWluZyk7XG4gICAgfTtcbiAgICBjb25zdCBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QgPSAoKSA9PiB7XG4gICAgICBsb2cuaW5mbygnU2hvd2luZyBleHBpcmVkIHRhcC10by12aWV3IHRvYXN0IGZvciBhbiBvdXRnb2luZyBtZXNzYWdlJyk7XG4gICAgICBzaG93VG9hc3QoVG9hc3RUYXBUb1ZpZXdFeHBpcmVkT3V0Z29pbmcpO1xuICAgIH07XG5cbiAgICBjb25zdCBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCA9IHRoaXMuc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwuYmluZCh0aGlzKTtcbiAgICBjb25zdCBzdGFydENvbnZlcnNhdGlvbiA9IHRoaXMuc3RhcnRDb252ZXJzYXRpb24uYmluZCh0aGlzKTtcblxuICAgIHJldHVybiB7XG4gICAgICBkZWxldGVNZXNzYWdlLFxuICAgICAgZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lLFxuICAgICAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2UsXG4gICAgICBkb3dubG9hZEF0dGFjaG1lbnQsXG4gICAgICBkb3dubG9hZE5ld1ZlcnNpb24sXG4gICAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkLFxuICAgICAgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZCxcbiAgICAgIG1hcmtWaWV3ZWQ6IG9uTWFya1ZpZXdlZCxcbiAgICAgIG9wZW5Db252ZXJzYXRpb24sXG4gICAgICBvcGVuR2lmdEJhZGdlLFxuICAgICAgb3BlbkxpbmssXG4gICAgICByZWFjdFRvTWVzc2FnZSxcbiAgICAgIHJlcGx5VG9NZXNzYWdlLFxuICAgICAgcmV0cnlTZW5kLFxuICAgICAgcmV0cnlEZWxldGVGb3JFdmVyeW9uZSxcbiAgICAgIHNob3dDb250YWN0RGV0YWlsLFxuICAgICAgc2hvd0NvbnRhY3RNb2RhbCxcbiAgICAgIHNob3dTYWZldHlOdW1iZXIsXG4gICAgICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgICBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgICBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCxcbiAgICAgIHNob3dJZGVudGl0eSxcbiAgICAgIHNob3dNZXNzYWdlRGV0YWlsLFxuICAgICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQsXG4gICAgICBzdGFydENvbnZlcnNhdGlvbixcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgc2Nyb2xsVG9NZXNzYWdlKG1lc3NhZ2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYHNjcm9sbFRvTWVzc2FnZTogZmFpbGVkIHRvIGxvYWQgbWVzc2FnZSAke21lc3NhZ2VJZH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBzdGF0ZSA9IHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICBsZXQgaXNJbk1lbW9yeSA9IHRydWU7XG5cbiAgICBpZiAoIXdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG1lc3NhZ2VJZCkpIHtcbiAgICAgIGlzSW5NZW1vcnkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICAvLyBNZXNzYWdlIG1pZ2h0IGJlIGluIG1lbW9yeSwgYnV0IG5vdCBpbiB0aGUgcmVkdXggYW55bW9yZSBiZWNhdXNlXG4gICAgLy8gd2UgY2FsbCBgbWVzc2FnZVJlc2V0KClgIGluIGBsb2FkQW5kU2Nyb2xsKClgLlxuICAgIGNvbnN0IG1lc3NhZ2VzQnlDb252ZXJzYXRpb24gPVxuICAgICAgZ2V0TWVzc2FnZXNCeUNvbnZlcnNhdGlvbihzdGF0ZSlbdGhpcy5tb2RlbC5pZF07XG4gICAgaWYgKCFtZXNzYWdlc0J5Q29udmVyc2F0aW9uPy5tZXNzYWdlSWRzLmluY2x1ZGVzKG1lc3NhZ2VJZCkpIHtcbiAgICAgIGlzSW5NZW1vcnkgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoaXNJbk1lbW9yeSkge1xuICAgICAgY29uc3QgeyBzY3JvbGxUb01lc3NhZ2UgfSA9IHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucztcbiAgICAgIHNjcm9sbFRvTWVzc2FnZSh0aGlzLm1vZGVsLmlkLCBtZXNzYWdlSWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWwubG9hZEFuZFNjcm9sbChtZXNzYWdlSWQpO1xuICB9XG5cbiAgYXN5bmMgc3RhcnRNaWdyYXRpb25Ub0dWMigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBsb2dJZCA9IHRoaXMubW9kZWwuaWRGb3JMb2dnaW5nKCk7XG5cbiAgICBpZiAoIWlzR3JvdXBWMSh0aGlzLm1vZGVsLmF0dHJpYnV0ZXMpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBzdGFydE1pZ3JhdGlvblRvR1YyLyR7bG9nSWR9OiBDYW5ub3Qgc3RhcnQsIG5vdCBhIEdyb3VwVjEgZ3JvdXBgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgICBpZiAodGhpcy5taWdyYXRpb25EaWFsb2cpIHtcbiAgICAgICAgdGhpcy5taWdyYXRpb25EaWFsb2cucmVtb3ZlKCk7XG4gICAgICAgIHRoaXMubWlncmF0aW9uRGlhbG9nID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH07XG4gICAgb25DbG9zZSgpO1xuXG4gICAgY29uc3QgbWlncmF0ZSA9ICgpID0+IHtcbiAgICAgIG9uQ2xvc2UoKTtcblxuICAgICAgdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgICAgbmFtZTogJ2luaXRpYXRlTWlncmF0aW9uVG9Hcm91cFYyJyxcbiAgICAgICAgdGFzazogKCkgPT4gd2luZG93LlNpZ25hbC5Hcm91cHMuaW5pdGlhdGVNaWdyYXRpb25Ub0dyb3VwVjIodGhpcy5tb2RlbCksXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gTm90ZTogdGhpcyBjYWxsIHdpbGwgdGhyb3cgaWYsIGFmdGVyIGdlbmVyYXRpbmcgbWVtYmVyIGxpc3RzLCB3ZSBhcmUgbm8gbG9uZ2VyIGFcbiAgICAvLyAgIG1lbWJlciBvciBhcmUgaW4gdGhlIHBlbmRpbmcgbWVtYmVyIGxpc3QuXG4gICAgY29uc3QgeyBkcm9wcGVkR1YyTWVtYmVySWRzLCBwZW5kaW5nTWVtYmVyc1YyIH0gPVxuICAgICAgYXdhaXQgdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgICAgbmFtZTogJ2dldEdyb3VwTWlncmF0aW9uTWVtYmVycycsXG4gICAgICAgIHRhc2s6ICgpID0+IHdpbmRvdy5TaWduYWwuR3JvdXBzLmdldEdyb3VwTWlncmF0aW9uTWVtYmVycyh0aGlzLm1vZGVsKSxcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgaW52aXRlZE1lbWJlcklkcyA9IHBlbmRpbmdNZW1iZXJzVjIubWFwKFxuICAgICAgKGl0ZW06IEdyb3VwVjJQZW5kaW5nTWVtYmVyVHlwZSkgPT4gaXRlbS51dWlkXG4gICAgKTtcblxuICAgIHRoaXMubWlncmF0aW9uRGlhbG9nID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgY2xhc3NOYW1lOiAnZ3JvdXAtdjEtbWlncmF0aW9uLXdyYXBwZXInLFxuICAgICAgSlNYOiB3aW5kb3cuU2lnbmFsLlN0YXRlLlJvb3RzLmNyZWF0ZUdyb3VwVjFNaWdyYXRpb25Nb2RhbChcbiAgICAgICAgd2luZG93LnJlZHV4U3RvcmUsXG4gICAgICAgIHtcbiAgICAgICAgICBhcmVXZUludml0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGRyb3BwZWRNZW1iZXJJZHM6IGRyb3BwZWRHVjJNZW1iZXJJZHMsXG4gICAgICAgICAgaGFzTWlncmF0ZWQ6IGZhbHNlLFxuICAgICAgICAgIGludml0ZWRNZW1iZXJJZHMsXG4gICAgICAgICAgbWlncmF0ZSxcbiAgICAgICAgICBvbkNsb3NlLFxuICAgICAgICB9XG4gICAgICApLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gVE9ETyBERVNLVE9QLTI0MjZcbiAgYXN5bmMgcHJvY2Vzc0F0dGFjaG1lbnRzKGZpbGVzOiBBcnJheTxGaWxlPik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcblxuICAgIGNvbnN0IGlzUmVjb3JkaW5nID1cbiAgICAgIHN0YXRlLmF1ZGlvUmVjb3JkZXIucmVjb3JkaW5nU3RhdGUgPT09IFJlY29yZGluZ1N0YXRlLlJlY29yZGluZztcblxuICAgIGlmIChoYXNMaW5rUHJldmlld0xvYWRlZCgpIHx8IGlzUmVjb3JkaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgYWRkQXR0YWNobWVudCxcbiAgICAgIGFkZFBlbmRpbmdBdHRhY2htZW50LFxuICAgICAgcHJvY2Vzc0F0dGFjaG1lbnRzLFxuICAgICAgcmVtb3ZlQXR0YWNobWVudCxcbiAgICB9ID0gd2luZG93LnJlZHV4QWN0aW9ucy5jb21wb3NlcjtcblxuICAgIGF3YWl0IHByb2Nlc3NBdHRhY2htZW50cyh7XG4gICAgICBhZGRBdHRhY2htZW50LFxuICAgICAgYWRkUGVuZGluZ0F0dGFjaG1lbnQsXG4gICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5tb2RlbC5pZCxcbiAgICAgIGRyYWZ0QXR0YWNobWVudHM6IHRoaXMubW9kZWwuZ2V0KCdkcmFmdEF0dGFjaG1lbnRzJykgfHwgW10sXG4gICAgICBmaWxlcyxcbiAgICAgIG9uU2hvd1RvYXN0OiAodG9hc3RUeXBlOiBBdHRhY2htZW50VG9hc3RUeXBlKSA9PiB7XG4gICAgICAgIGlmICh0b2FzdFR5cGUgPT09IEF0dGFjaG1lbnRUb2FzdFR5cGUuVG9hc3RGaWxlU2l6ZSkge1xuICAgICAgICAgIHNob3dUb2FzdChUb2FzdEZpbGVTaXplLCB7XG4gICAgICAgICAgICBsaW1pdDogMTAwLFxuICAgICAgICAgICAgdW5pdHM6ICdNQicsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUpIHtcbiAgICAgICAgICBzaG93VG9hc3QoVG9hc3REYW5nZXJvdXNGaWxlVHlwZSk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0TWF4QXR0YWNobWVudHMpIHtcbiAgICAgICAgICBzaG93VG9hc3QoVG9hc3RNYXhBdHRhY2htZW50cyk7XG4gICAgICAgIH0gZWxzZSBpZiAodG9hc3RUeXBlID09PSBBdHRhY2htZW50VG9hc3RUeXBlLlRvYXN0T25lTm9uSW1hZ2VBdEFUaW1lKSB7XG4gICAgICAgICAgc2hvd1RvYXN0KFRvYXN0T25lTm9uSW1hZ2VBdEFUaW1lKTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICB0b2FzdFR5cGUgPT09XG4gICAgICAgICAgQXR0YWNobWVudFRvYXN0VHlwZS5Ub2FzdENhbm5vdE1peEltYWdlQW5kTm9uSW1hZ2VBdHRhY2htZW50c1xuICAgICAgICApIHtcbiAgICAgICAgICBzaG93VG9hc3QoVG9hc3RDYW5ub3RNaXhJbWFnZUFuZE5vbkltYWdlQXR0YWNobWVudHMpO1xuICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgIHRvYXN0VHlwZSA9PT0gQXR0YWNobWVudFRvYXN0VHlwZS5Ub2FzdFVuYWJsZVRvTG9hZEF0dGFjaG1lbnRcbiAgICAgICAgKSB7XG4gICAgICAgICAgc2hvd1RvYXN0KFRvYXN0VW5hYmxlVG9Mb2FkQXR0YWNobWVudCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICByZW1vdmVBdHRhY2htZW50LFxuICAgIH0pO1xuICB9XG5cbiAgdW5sb2FkKHJlYXNvbjogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9nLmluZm8oXG4gICAgICAndW5sb2FkaW5nIGNvbnZlcnNhdGlvbicsXG4gICAgICB0aGlzLm1vZGVsLmlkRm9yTG9nZ2luZygpLFxuICAgICAgJ2R1ZSB0bzonLFxuICAgICAgcmVhc29uXG4gICAgKTtcblxuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uVW5sb2FkZWQgfSA9IHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucztcbiAgICBpZiAoY29udmVyc2F0aW9uVW5sb2FkZWQpIHtcbiAgICAgIGNvbnZlcnNhdGlvblVubG9hZGVkKHRoaXMubW9kZWwuaWQpO1xuICAgIH1cblxuICAgIGlmICh0aGlzLm1vZGVsLmdldCgnZHJhZnRDaGFuZ2VkJykpIHtcbiAgICAgIGlmICh0aGlzLm1vZGVsLmhhc0RyYWZ0KCkpIHtcbiAgICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgICAgY29uc3QgYWN0aXZlX2F0ID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZV9hdCcpIHx8IG5vdztcblxuICAgICAgICB0aGlzLm1vZGVsLnNldCh7XG4gICAgICAgICAgYWN0aXZlX2F0LFxuICAgICAgICAgIGRyYWZ0Q2hhbmdlZDogZmFsc2UsXG4gICAgICAgICAgZHJhZnRUaW1lc3RhbXA6IG5vdyxcbiAgICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLm1vZGVsLnNldCh7XG4gICAgICAgICAgZHJhZnRDaGFuZ2VkOiBmYWxzZSxcbiAgICAgICAgICBkcmFmdFRpbWVzdGFtcDogbnVsbCxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIC8vIFdlIGRvbid0IHdhaXQgaGVyZTsgd2UgbmVlZCB0byB0YWtlIGRvd24gdGhlIHZpZXdcbiAgICAgIHRoaXMuc2F2ZU1vZGVsKCk7XG5cbiAgICAgIHRoaXMubW9kZWwudXBkYXRlTGFzdE1lc3NhZ2UoKTtcbiAgICB9XG5cbiAgICB0aGlzLmNvbnZlcnNhdGlvblZpZXc/LnJlbW92ZSgpO1xuXG4gICAgaWYgKHRoaXMuY29udGFjdE1vZGFsVmlldykge1xuICAgICAgdGhpcy5jb250YWN0TW9kYWxWaWV3LnJlbW92ZSgpO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGlja2VyUHJldmlld01vZGFsVmlldykge1xuICAgICAgdGhpcy5zdGlja2VyUHJldmlld01vZGFsVmlldy5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMubGlnaHRib3hWaWV3KSB7XG4gICAgICB0aGlzLmxpZ2h0Ym94Vmlldy5yZW1vdmUoKTtcbiAgICB9XG4gICAgaWYgKHRoaXMucGFuZWxzICYmIHRoaXMucGFuZWxzLmxlbmd0aCkge1xuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IHRoaXMucGFuZWxzLmxlbmd0aDsgaSA8IG1heDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHBhbmVsID0gdGhpcy5wYW5lbHNbaV07XG4gICAgICAgIHBhbmVsLnZpZXcucmVtb3ZlKCk7XG4gICAgICB9XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMuc2V0U2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoKDApO1xuICAgIH1cblxuICAgIHJlbW92ZUxpbmtQcmV2aWV3KCk7XG4gICAgc3VzcGVuZExpbmtQcmV2aWV3cygpO1xuXG4gICAgdGhpcy5yZW1vdmUoKTtcbiAgfVxuXG4gIGFzeW5jIG9uRHJvcChlOiBKUXVlcnkuVHJpZ2dlcmVkRXZlbnQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWUub3JpZ2luYWxFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBldmVudCA9IGUub3JpZ2luYWxFdmVudCBhcyBEcmFnRXZlbnQ7XG4gICAgaWYgKCFldmVudC5kYXRhVHJhbnNmZXIpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoZXZlbnQuZGF0YVRyYW5zZmVyLnR5cGVzWzBdICE9PSAnRmlsZXMnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCB7IGZpbGVzIH0gPSBldmVudC5kYXRhVHJhbnNmZXI7XG4gICAgdGhpcy5wcm9jZXNzQXR0YWNobWVudHMoQXJyYXkuZnJvbShmaWxlcykpO1xuICB9XG5cbiAgb25QYXN0ZShlOiBKUXVlcnkuVHJpZ2dlcmVkRXZlbnQpOiB2b2lkIHtcbiAgICBpZiAoIWUub3JpZ2luYWxFdmVudCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBldmVudCA9IGUub3JpZ2luYWxFdmVudCBhcyBDbGlwYm9hcmRFdmVudDtcbiAgICBpZiAoIWV2ZW50LmNsaXBib2FyZERhdGEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgeyBpdGVtcyB9ID0gZXZlbnQuY2xpcGJvYXJkRGF0YTtcblxuICAgIGNvbnN0IGFueUltYWdlcyA9IFsuLi5pdGVtc10uc29tZShcbiAgICAgIGl0ZW0gPT4gaXRlbS50eXBlLnNwbGl0KCcvJylbMF0gPT09ICdpbWFnZSdcbiAgICApO1xuICAgIGlmICghYW55SW1hZ2VzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICBjb25zdCBmaWxlczogQXJyYXk8RmlsZT4gPSBbXTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGl0ZW1zLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICBpZiAoaXRlbXNbaV0udHlwZS5zcGxpdCgnLycpWzBdID09PSAnaW1hZ2UnKSB7XG4gICAgICAgIGNvbnN0IGZpbGUgPSBpdGVtc1tpXS5nZXRBc0ZpbGUoKTtcbiAgICAgICAgaWYgKGZpbGUpIHtcbiAgICAgICAgICBmaWxlcy5wdXNoKGZpbGUpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhpcy5wcm9jZXNzQXR0YWNobWVudHMoZmlsZXMpO1xuICB9XG5cbiAgc3luY01lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UoXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIG1vZGVsOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAgICBtZXNzYWdlUmVxdWVzdFR5cGU6IG51bWJlclxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgIG5hbWUsXG4gICAgICB0YXNrOiBtb2RlbC5zeW5jTWVzc2FnZVJlcXVlc3RSZXNwb25zZS5iaW5kKG1vZGVsLCBtZXNzYWdlUmVxdWVzdFR5cGUpLFxuICAgIH0pO1xuICB9XG5cbiAgYmxvY2tBbmRSZXBvcnRTcGFtKG1vZGVsOiBDb252ZXJzYXRpb25Nb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1lc3NhZ2VSZXF1ZXN0RW51bSA9IFByb3RvLlN5bmNNZXNzYWdlLk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UuVHlwZTtcblxuICAgIHJldHVybiB0aGlzLmxvbmdSdW5uaW5nVGFza1dyYXBwZXIoe1xuICAgICAgbmFtZTogJ2Jsb2NrQW5kUmVwb3J0U3BhbScsXG4gICAgICB0YXNrOiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAgICAgICBtb2RlbC5zeW5jTWVzc2FnZVJlcXVlc3RSZXNwb25zZShtZXNzYWdlUmVxdWVzdEVudW0uQkxPQ0spLFxuICAgICAgICAgIGFkZFJlcG9ydFNwYW1Kb2Ioe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uOiBtb2RlbC5mb3JtYXQoKSxcbiAgICAgICAgICAgIGdldE1lc3NhZ2VTZXJ2ZXJHdWlkc0ZvclNwYW06XG4gICAgICAgICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5nZXRNZXNzYWdlU2VydmVyR3VpZHNGb3JTcGFtLFxuICAgICAgICAgICAgam9iUXVldWU6IHJlcG9ydFNwYW1Kb2JRdWV1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSk7XG4gICAgICAgIHNob3dUb2FzdChUb2FzdFJlcG9ydGVkU3BhbUFuZEJsb2NrZWQpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVNb2RlbCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMubW9kZWwuYXR0cmlidXRlcyk7XG4gIH1cblxuICBhc3luYyBjbGVhckF0dGFjaG1lbnRzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGRyYWZ0QXR0YWNobWVudHMgPSB0aGlzLm1vZGVsLmdldCgnZHJhZnRBdHRhY2htZW50cycpIHx8IFtdO1xuICAgIHRoaXMubW9kZWwuc2V0KHtcbiAgICAgIGRyYWZ0QXR0YWNobWVudHM6IFtdLFxuICAgICAgZHJhZnRDaGFuZ2VkOiB0cnVlLFxuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGVBdHRhY2htZW50c1ZpZXcoKTtcblxuICAgIC8vIFdlJ3JlIGZpbmUgZG9pbmcgdGhpcyBhbGwgYXQgb25jZTsgYXQgbW9zdCBpdCBzaG91bGQgYmUgMzIgYXR0YWNobWVudHNcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnNhdmVNb2RlbCgpLFxuICAgICAgUHJvbWlzZS5hbGwoXG4gICAgICAgIGRyYWZ0QXR0YWNobWVudHMubWFwKGF0dGFjaG1lbnQgPT4gZGVsZXRlRHJhZnRBdHRhY2htZW50KGF0dGFjaG1lbnQpKVxuICAgICAgKSxcbiAgICBdKTtcbiAgfVxuXG4gIGhhc0ZpbGVzKG9wdGlvbnM6IHsgaW5jbHVkZVBlbmRpbmc6IGJvb2xlYW4gfSk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGRyYWZ0QXR0YWNobWVudHMgPSB0aGlzLm1vZGVsLmdldCgnZHJhZnRBdHRhY2htZW50cycpIHx8IFtdO1xuICAgIGlmIChvcHRpb25zLmluY2x1ZGVQZW5kaW5nKSB7XG4gICAgICByZXR1cm4gZHJhZnRBdHRhY2htZW50cy5sZW5ndGggPiAwO1xuICAgIH1cblxuICAgIHJldHVybiBkcmFmdEF0dGFjaG1lbnRzLnNvbWUoaXRlbSA9PiAhaXRlbS5wZW5kaW5nKTtcbiAgfVxuXG4gIHVwZGF0ZUF0dGFjaG1lbnRzVmlldygpOiB2b2lkIHtcbiAgICBjb25zdCBkcmFmdEF0dGFjaG1lbnRzID0gdGhpcy5tb2RlbC5nZXQoJ2RyYWZ0QXR0YWNobWVudHMnKSB8fCBbXTtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbXBvc2VyLnJlcGxhY2VBdHRhY2htZW50cyhcbiAgICAgIHRoaXMubW9kZWwuZ2V0KCdpZCcpLFxuICAgICAgZHJhZnRBdHRhY2htZW50c1xuICAgICk7XG4gICAgaWYgKHRoaXMuaGFzRmlsZXMoeyBpbmNsdWRlUGVuZGluZzogdHJ1ZSB9KSkge1xuICAgICAgcmVtb3ZlTGlua1ByZXZpZXcoKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBvbk9wZW5lZChtZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRoaXMubW9kZWwub25PcGVuU3RhcnQoKTtcblxuICAgIGlmIChtZXNzYWdlSWQpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuXG4gICAgICBpZiAobWVzc2FnZSkge1xuICAgICAgICB0aGlzLm1vZGVsLmxvYWRBbmRTY3JvbGwobWVzc2FnZUlkKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2cud2Fybihgb25PcGVuZWQ6IERpZCBub3QgZmluZCBtZXNzYWdlICR7bWVzc2FnZUlkfWApO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcmV0cnlQbGFjZWhvbGRlcnMgfSA9IHdpbmRvdy5TaWduYWwuU2VydmljZXM7XG4gICAgaWYgKHJldHJ5UGxhY2Vob2xkZXJzKSB7XG4gICAgICBhd2FpdCByZXRyeVBsYWNlaG9sZGVycy5maW5kQnlDb252ZXJzYXRpb25BbmRNYXJrT3BlbmVkKHRoaXMubW9kZWwuaWQpO1xuICAgIH1cblxuICAgIGNvbnN0IGxvYWRBbmRVcGRhdGUgPSBhc3luYyAoKSA9PiB7XG4gICAgICBQcm9taXNlLmFsbChbXG4gICAgICAgIHRoaXMubW9kZWwubG9hZE5ld2VzdE1lc3NhZ2VzKHVuZGVmaW5lZCwgdW5kZWZpbmVkKSxcbiAgICAgICAgdGhpcy5tb2RlbC51cGRhdGVMYXN0TWVzc2FnZSgpLFxuICAgICAgICB0aGlzLm1vZGVsLnVwZGF0ZVVucmVhZCgpLFxuICAgICAgXSk7XG4gICAgfTtcblxuICAgIGxvYWRBbmRVcGRhdGUoKTtcblxuICAgIHRoaXMuZm9jdXNNZXNzYWdlRmllbGQoKTtcblxuICAgIGNvbnN0IHF1b3RlZE1lc3NhZ2VJZCA9IHRoaXMubW9kZWwuZ2V0KCdxdW90ZWRNZXNzYWdlSWQnKTtcbiAgICBpZiAocXVvdGVkTWVzc2FnZUlkKSB7XG4gICAgICB0aGlzLnNldFF1b3RlTWVzc2FnZShxdW90ZWRNZXNzYWdlSWQpO1xuICAgIH1cblxuICAgIHRoaXMubW9kZWwuZmV0Y2hMYXRlc3RHcm91cFYyRGF0YSgpO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIHRoaXMubW9kZWwudGhyb3R0bGVkTWF5YmVNaWdyYXRlVjFHcm91cCAhPT0gdW5kZWZpbmVkLFxuICAgICAgJ0NvbnZlcnNhdGlvbiBtb2RlbCBzaG91bGQgYmUgaW5pdGlhbGl6ZWQnXG4gICAgKTtcbiAgICB0aGlzLm1vZGVsLnRocm90dGxlZE1heWJlTWlncmF0ZVYxR3JvdXAoKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICB0aGlzLm1vZGVsLnRocm90dGxlZEZldGNoU01TT25seVVVSUQgIT09IHVuZGVmaW5lZCxcbiAgICAgICdDb252ZXJzYXRpb24gbW9kZWwgc2hvdWxkIGJlIGluaXRpYWxpemVkJ1xuICAgICk7XG4gICAgdGhpcy5tb2RlbC50aHJvdHRsZWRGZXRjaFNNU09ubHlVVUlEKCk7XG5cbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoVVVJREtpbmQuQUNJKTtcbiAgICBpZiAoXG4gICAgICAhaXNHcm91cCh0aGlzLm1vZGVsLmF0dHJpYnV0ZXMpIHx8XG4gICAgICAob3VyVXVpZCAmJiB0aGlzLm1vZGVsLmhhc01lbWJlcihvdXJVdWlkLnRvU3RyaW5nKCkpKVxuICAgICkge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICB0aGlzLm1vZGVsLnRocm90dGxlZEdldFByb2ZpbGVzICE9PSB1bmRlZmluZWQsXG4gICAgICAgICdDb252ZXJzYXRpb24gbW9kZWwgc2hvdWxkIGJlIGluaXRpYWxpemVkJ1xuICAgICAgKTtcbiAgICAgIGF3YWl0IHRoaXMubW9kZWwudGhyb3R0bGVkR2V0UHJvZmlsZXMoKTtcbiAgICB9XG5cbiAgICB0aGlzLm1vZGVsLnVwZGF0ZVZlcmlmaWVkKCk7XG4gIH1cblxuICBhc3luYyBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbChtZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbDogTWVzc2FnZSAke21lc3NhZ2VJZH0gbWlzc2luZyFgKTtcbiAgICB9XG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBnZXRBdHRhY2htZW50c0Zvck1lc3NhZ2UobWVzc2FnZS5hdHRyaWJ1dGVzKTtcblxuICAgIGNvbnN0IGRvRm9yd2FyZE1lc3NhZ2UgPSBhc3luYyAoXG4gICAgICBjb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz4sXG4gICAgICBtZXNzYWdlQm9keT86IHN0cmluZyxcbiAgICAgIGluY2x1ZGVkQXR0YWNobWVudHM/OiBBcnJheTxBdHRhY2htZW50VHlwZT4sXG4gICAgICBsaW5rUHJldmlldz86IExpbmtQcmV2aWV3VHlwZVxuICAgICkgPT4ge1xuICAgICAgdHJ5IHtcbiAgICAgICAgY29uc3QgZGlkRm9yd2FyZFN1Y2Nlc3NmdWxseSA9IGF3YWl0IHRoaXMubWF5YmVGb3J3YXJkTWVzc2FnZShcbiAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkcyxcbiAgICAgICAgICBtZXNzYWdlQm9keSxcbiAgICAgICAgICBpbmNsdWRlZEF0dGFjaG1lbnRzLFxuICAgICAgICAgIGxpbmtQcmV2aWV3XG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKGRpZEZvcndhcmRTdWNjZXNzZnVsbHkgJiYgdGhpcy5mb3J3YXJkTWVzc2FnZU1vZGFsKSB7XG4gICAgICAgICAgdGhpcy5mb3J3YXJkTWVzc2FnZU1vZGFsLnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuZm9yd2FyZE1lc3NhZ2VNb2RhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICAgIGxvZy53YXJuKCdkb0ZvcndhcmRNZXNzYWdlJywgZXJyICYmIGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycik7XG4gICAgICB9XG4gICAgfTtcblxuICAgIHRoaXMuZm9yd2FyZE1lc3NhZ2VNb2RhbCA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVGb3J3YXJkTWVzc2FnZU1vZGFsKFxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAge1xuICAgICAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgICAgIGRvRm9yd2FyZE1lc3NhZ2UsXG4gICAgICAgICAgaGFzQ29udGFjdDogQm9vbGVhbihtZXNzYWdlLmdldCgnY29udGFjdCcpPy5sZW5ndGgpLFxuICAgICAgICAgIGlzU3RpY2tlcjogQm9vbGVhbihtZXNzYWdlLmdldCgnc3RpY2tlcicpKSxcbiAgICAgICAgICBtZXNzYWdlQm9keTogbWVzc2FnZS5nZXRSYXdUZXh0KCksXG4gICAgICAgICAgb25DbG9zZTogKCkgPT4ge1xuICAgICAgICAgICAgaWYgKHRoaXMuZm9yd2FyZE1lc3NhZ2VNb2RhbCkge1xuICAgICAgICAgICAgICB0aGlzLmZvcndhcmRNZXNzYWdlTW9kYWwucmVtb3ZlKCk7XG4gICAgICAgICAgICAgIHRoaXMuZm9yd2FyZE1lc3NhZ2VNb2RhbCA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJlc2V0TGlua1ByZXZpZXcoKTtcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uRWRpdG9yU3RhdGVDaGFuZ2U6IChcbiAgICAgICAgICAgIG1lc3NhZ2VUZXh0OiBzdHJpbmcsXG4gICAgICAgICAgICBfOiBBcnJheTxCb2R5UmFuZ2VUeXBlPixcbiAgICAgICAgICAgIGNhcmV0TG9jYXRpb24/OiBudW1iZXJcbiAgICAgICAgICApID0+IHtcbiAgICAgICAgICAgIGlmICghYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICAgICAgICAgIG1heWJlR3JhYkxpbmtQcmV2aWV3KFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUZXh0LFxuICAgICAgICAgICAgICAgIExpbmtQcmV2aWV3U291cmNlVHlwZS5Gb3J3YXJkTWVzc2FnZU1vZGFsLFxuICAgICAgICAgICAgICAgIGNhcmV0TG9jYXRpb25cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9LFxuICAgICAgICAgIG9uVGV4dFRvb0xvbmc6ICgpID0+IHNob3dUb2FzdChUb2FzdE1lc3NhZ2VCb2R5VG9vTG9uZyksXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgfSk7XG4gICAgdGhpcy5mb3J3YXJkTWVzc2FnZU1vZGFsLnJlbmRlcigpO1xuICB9XG5cbiAgYXN5bmMgbWF5YmVGb3J3YXJkTWVzc2FnZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlTW9kZWwsXG4gICAgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+LFxuICAgIG1lc3NhZ2VCb2R5Pzogc3RyaW5nLFxuICAgIGF0dGFjaG1lbnRzPzogQXJyYXk8QXR0YWNobWVudFR5cGU+LFxuICAgIGxpbmtQcmV2aWV3PzogTGlua1ByZXZpZXdUeXBlXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGxvZy5pbmZvKGBtYXliZUZvcndhcmRNZXNzYWdlLyR7bWVzc2FnZS5pZEZvckxvZ2dpbmcoKX06IFN0YXJ0aW5nLi4uYCk7XG4gICAgY29uc3QgYXR0YWNobWVudExvb2t1cCA9IG5ldyBTZXQoKTtcbiAgICBpZiAoYXR0YWNobWVudHMpIHtcbiAgICAgIGF0dGFjaG1lbnRzLmZvckVhY2goYXR0YWNobWVudCA9PiB7XG4gICAgICAgIGF0dGFjaG1lbnRMb29rdXAuYWRkKFxuICAgICAgICAgIGAke2F0dGFjaG1lbnQuZmlsZU5hbWV9LyR7YXR0YWNobWVudC5jb250ZW50VHlwZX1gXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25zID0gY29udmVyc2F0aW9uSWRzLm1hcChpZCA9PlxuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkKVxuICAgICk7XG5cbiAgICBjb25zdCBjYW5ub3RTZW5kID0gY29udmVyc2F0aW9ucy5zb21lKFxuICAgICAgY29udmVyc2F0aW9uID0+XG4gICAgICAgIGNvbnZlcnNhdGlvbj8uZ2V0KCdhbm5vdW5jZW1lbnRzT25seScpICYmICFjb252ZXJzYXRpb24uYXJlV2VBZG1pbigpXG4gICAgKTtcbiAgICBpZiAoY2Fubm90U2VuZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdDYW5ub3Qgc2VuZCB0byBncm91cCcpO1xuICAgIH1cblxuICAgIC8vIFZlcmlmeSB0aGF0IGFsbCBjb250YWN0cyB0aGF0IHdlJ3JlIGZvcndhcmRpbmdcbiAgICAvLyB0byBhcmUgdmVyaWZpZWQgYW5kIHRydXN0ZWRcbiAgICBjb25zdCB1bnZlcmlmaWVkQ29udGFjdHM6IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPiA9IFtdO1xuICAgIGNvbnN0IHVudHJ1c3RlZENvbnRhY3RzOiBBcnJheTxDb252ZXJzYXRpb25Nb2RlbD4gPSBbXTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGNvbnZlcnNhdGlvbnMubWFwKGFzeW5jIGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICAgIGlmIChjb252ZXJzYXRpb24pIHtcbiAgICAgICAgICBhd2FpdCBjb252ZXJzYXRpb24udXBkYXRlVmVyaWZpZWQoKTtcbiAgICAgICAgICBjb25zdCB1bnZlcmlmaWVkcyA9IGNvbnZlcnNhdGlvbi5nZXRVbnZlcmlmaWVkKCk7XG4gICAgICAgICAgaWYgKHVudmVyaWZpZWRzLmxlbmd0aCkge1xuICAgICAgICAgICAgdW52ZXJpZmllZHMuZm9yRWFjaCh1bnZlcmlmaWVkQ29udmVyc2F0aW9uID0+XG4gICAgICAgICAgICAgIHVudmVyaWZpZWRDb250YWN0cy5wdXNoKHVudmVyaWZpZWRDb252ZXJzYXRpb24pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGNvbnN0IHVudHJ1c3RlZCA9IGNvbnZlcnNhdGlvbi5nZXRVbnRydXN0ZWQoKTtcbiAgICAgICAgICBpZiAodW50cnVzdGVkLmxlbmd0aCkge1xuICAgICAgICAgICAgdW50cnVzdGVkLmZvckVhY2godW50cnVzdGVkQ29udmVyc2F0aW9uID0+XG4gICAgICAgICAgICAgIHVudHJ1c3RlZENvbnRhY3RzLnB1c2godW50cnVzdGVkQ29udmVyc2F0aW9uKVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBhbnkgdW52ZXJpZmllZCBvciB1bnRydXN0ZWQgY29udGFjdHMsIHNob3cgdGhlXG4gICAgLy8gU2VuZEFueXdheURpYWxvZyBhbmQgaWYgd2UncmUgZmluZSB3aXRoIHNlbmRpbmcgdGhlbiBtYXJrIGFsbCBhc1xuICAgIC8vIHZlcmlmaWVkIGFuZCB0cnVzdGVkIGFuZCBjb250aW51ZSB0aGUgc2VuZC5cbiAgICBjb25zdCBpZmZ5Q29udmVyc2F0aW9ucyA9IFsuLi51bnZlcmlmaWVkQ29udGFjdHMsIC4uLnVudHJ1c3RlZENvbnRhY3RzXTtcbiAgICBpZiAoaWZmeUNvbnZlcnNhdGlvbnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBmb3J3YXJkTWVzc2FnZU1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcjxIVE1MRWxlbWVudD4oXG4gICAgICAgICcubW9kdWxlLUZvcndhcmRNZXNzYWdlTW9kYWwnXG4gICAgICApO1xuICAgICAgaWYgKGZvcndhcmRNZXNzYWdlTW9kYWwpIHtcbiAgICAgICAgZm9yd2FyZE1lc3NhZ2VNb2RhbC5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgICAgfVxuICAgICAgY29uc3Qgc2VuZEFueXdheSA9IGF3YWl0IHRoaXMuc2hvd1NlbmRBbnl3YXlEaWFsb2coaWZmeUNvbnZlcnNhdGlvbnMpO1xuXG4gICAgICBpZiAoIXNlbmRBbnl3YXkpIHtcbiAgICAgICAgaWYgKGZvcndhcmRNZXNzYWdlTW9kYWwpIHtcbiAgICAgICAgICBmb3J3YXJkTWVzc2FnZU1vZGFsLnN0eWxlLmRpc3BsYXkgPSAnYmxvY2snO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cblxuICAgICAgbGV0IHZlcmlmeVByb21pc2U6IFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQ7XG4gICAgICBsZXQgYXBwcm92ZVByb21pc2U6IFByb21pc2U8dm9pZD4gfCB1bmRlZmluZWQ7XG4gICAgICBpZiAodW52ZXJpZmllZENvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgICB2ZXJpZnlQcm9taXNlID0gbWFya0FsbEFzVmVyaWZpZWREZWZhdWx0KHVudmVyaWZpZWRDb250YWN0cyk7XG4gICAgICB9XG4gICAgICBpZiAodW50cnVzdGVkQ29udGFjdHMubGVuZ3RoKSB7XG4gICAgICAgIGFwcHJvdmVQcm9taXNlID0gbWFya0FsbEFzQXBwcm92ZWQodW50cnVzdGVkQ29udGFjdHMpO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoW3ZlcmlmeVByb21pc2UsIGFwcHJvdmVQcm9taXNlXSk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VuZE1lc3NhZ2VPcHRpb25zID0geyBkb250Q2xlYXJEcmFmdDogdHJ1ZSB9O1xuICAgIGNvbnN0IGJhc2VUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgLy8gQWN0dWFsbHkgc2VuZCB0aGUgbWVzc2FnZVxuICAgIC8vIGxvYWQgYW55IHN0aWNrZXIgZGF0YSwgYXR0YWNobWVudHMsIG9yIGxpbmsgcHJldmlld3MgdGhhdCB3ZSBuZWVkIHRvXG4gICAgLy8gc2VuZCBhbG9uZyB3aXRoIHRoZSBtZXNzYWdlIGFuZCBkbyB0aGUgc2VuZCB0byBlYWNoIGNvbnZlcnNhdGlvbi5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGNvbnZlcnNhdGlvbnMubWFwKGFzeW5jIChjb252ZXJzYXRpb24sIG9mZnNldCkgPT4ge1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBiYXNlVGltZXN0YW1wICsgb2Zmc2V0O1xuICAgICAgICBpZiAoY29udmVyc2F0aW9uKSB7XG4gICAgICAgICAgY29uc3Qgc3RpY2tlciA9IG1lc3NhZ2UuZ2V0KCdzdGlja2VyJyk7XG4gICAgICAgICAgY29uc3QgY29udGFjdCA9IG1lc3NhZ2UuZ2V0KCdjb250YWN0Jyk7XG5cbiAgICAgICAgICBpZiAoc3RpY2tlcikge1xuICAgICAgICAgICAgY29uc3Qgc3RpY2tlcldpdGhEYXRhID0gYXdhaXQgbG9hZFN0aWNrZXJEYXRhKHN0aWNrZXIpO1xuICAgICAgICAgICAgY29uc3Qgc3RpY2tlck5vUGF0aCA9IHN0aWNrZXJXaXRoRGF0YVxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIC4uLnN0aWNrZXJXaXRoRGF0YSxcbiAgICAgICAgICAgICAgICAgIGRhdGE6IHtcbiAgICAgICAgICAgICAgICAgICAgLi4uc3RpY2tlcldpdGhEYXRhLmRhdGEsXG4gICAgICAgICAgICAgICAgICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgICAgY29udmVyc2F0aW9uLmVucXVldWVNZXNzYWdlRm9yU2VuZChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgICAgICAgc3RpY2tlcjogc3RpY2tlck5vUGF0aCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyAuLi5zZW5kTWVzc2FnZU9wdGlvbnMsIHRpbWVzdGFtcCB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSBpZiAoY29udGFjdD8ubGVuZ3RoKSB7XG4gICAgICAgICAgICBjb25zdCBjb250YWN0V2l0aEh5ZHJhdGVkQXZhdGFyID0gYXdhaXQgbG9hZENvbnRhY3REYXRhKGNvbnRhY3QpO1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLmVucXVldWVNZXNzYWdlRm9yU2VuZChcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgICAgICAgY29udGFjdDogY29udGFjdFdpdGhIeWRyYXRlZEF2YXRhcixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgeyAuLi5zZW5kTWVzc2FnZU9wdGlvbnMsIHRpbWVzdGFtcCB9XG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zdCBwcmV2aWV3ID0gbGlua1ByZXZpZXdcbiAgICAgICAgICAgICAgPyBhd2FpdCBsb2FkUHJldmlld0RhdGEoW2xpbmtQcmV2aWV3XSlcbiAgICAgICAgICAgICAgOiBbXTtcbiAgICAgICAgICAgIGNvbnN0IGF0dGFjaG1lbnRzV2l0aERhdGEgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgKGF0dGFjaG1lbnRzIHx8IFtdKS5tYXAoYXN5bmMgaXRlbSA9PiAoe1xuICAgICAgICAgICAgICAgIC4uLihhd2FpdCBsb2FkQXR0YWNobWVudERhdGEoaXRlbSkpLFxuICAgICAgICAgICAgICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgfSkpXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3QgYXR0YWNobWVudHNUb1NlbmQgPSBhdHRhY2htZW50c1dpdGhEYXRhLmZpbHRlcihcbiAgICAgICAgICAgICAgKGF0dGFjaG1lbnQ6IFBhcnRpYWw8QXR0YWNobWVudFR5cGU+KSA9PlxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRMb29rdXAuaGFzKFxuICAgICAgICAgICAgICAgICAgYCR7YXR0YWNobWVudC5maWxlTmFtZX0vJHthdHRhY2htZW50LmNvbnRlbnRUeXBlfWBcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb252ZXJzYXRpb24uZW5xdWV1ZU1lc3NhZ2VGb3JTZW5kKFxuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgYm9keTogbWVzc2FnZUJvZHkgfHwgdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIGF0dGFjaG1lbnRzOiBhdHRhY2htZW50c1RvU2VuZCxcbiAgICAgICAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB7IC4uLnNlbmRNZXNzYWdlT3B0aW9ucywgdGltZXN0YW1wIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICAvLyBDYW5jZWwgYW55IGxpbmsgc3RpbGwgcGVuZGluZywgZXZlbiBpZiBpdCBkaWRuJ3QgbWFrZSBpdCBpbnRvIHRoZSBtZXNzYWdlXG4gICAgcmVzZXRMaW5rUHJldmlldygpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzaG93QWxsTWVkaWEoKTogdm9pZCB7XG4gICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5tb2R1bGUtbWVkaWEtZ2FsbGVyeScpLmxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdlIGZldGNoIG1vcmUgZG9jdW1lbnRzIHRoYW4gbWVkaWEgYXMgdGhleSBkb25cdTIwMTl0IHJlcXVpcmUgdG8gYmUgbG9hZGVkXG4gICAgLy8gaW50byBtZW1vcnkgcmlnaHQgYXdheS4gUmV2aXNpdCB0aGlzIG9uY2Ugd2UgaGF2ZSBpbmZpbml0ZSBzY3JvbGxpbmc6XG4gICAgY29uc3QgREVGQVVMVF9NRURJQV9GRVRDSF9DT1VOVCA9IDUwO1xuICAgIGNvbnN0IERFRkFVTFRfRE9DVU1FTlRTX0ZFVENIX0NPVU5UID0gMTUwO1xuXG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLm1vZGVsLmdldCgnaWQnKTtcbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKTtcblxuICAgIGNvbnN0IGdldFByb3BzID0gYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgcmF3TWVkaWEgPVxuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cyhcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBsaW1pdDogREVGQVVMVF9NRURJQV9GRVRDSF9DT1VOVCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICBjb25zdCByYXdEb2N1bWVudHMgPVxuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNXaXRoRmlsZUF0dGFjaG1lbnRzKFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGxpbWl0OiBERUZBVUxUX0RPQ1VNRU5UU19GRVRDSF9DT1VOVCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG5cbiAgICAgIC8vIEZpcnN0IHdlIHVwZ3JhZGUgdGhlc2UgbWVzc2FnZXMgdG8gZW5zdXJlIHRoYXQgdGhleSBoYXZlIHRodW1ibmFpbHNcbiAgICAgIGZvciAobGV0IG1heCA9IHJhd01lZGlhLmxlbmd0aCwgaSA9IDA7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gcmF3TWVkaWFbaV07XG4gICAgICAgIGNvbnN0IHsgc2NoZW1hVmVyc2lvbiB9ID0gbWVzc2FnZTtcblxuICAgICAgICBpZiAoXG4gICAgICAgICAgc2NoZW1hVmVyc2lvbiAmJlxuICAgICAgICAgIHNjaGVtYVZlcnNpb24gPCBNZXNzYWdlLlZFUlNJT05fTkVFREVEX0ZPUl9ESVNQTEFZXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFllcCwgd2UgcmVhbGx5IGRvIHdhbnQgdG8gd2FpdCBmb3IgZWFjaCBvZiB0aGVzZVxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgcmF3TWVkaWFbaV0gPSBhd2FpdCB1cGdyYWRlTWVzc2FnZVNjaGVtYShtZXNzYWdlKTtcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZShyYXdNZWRpYVtpXSwgeyBvdXJVdWlkIH0pO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lZGlhOiBBcnJheTxNZWRpYVR5cGU+ID0gZmxhdHRlbihcbiAgICAgICAgcmF3TWVkaWEubWFwKG1lc3NhZ2UgPT4ge1xuICAgICAgICAgIHJldHVybiAobWVzc2FnZS5hdHRhY2htZW50cyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgKFxuICAgICAgICAgICAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSxcbiAgICAgICAgICAgICAgaW5kZXg6IG51bWJlclxuICAgICAgICAgICAgKTogTWVkaWFUeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICFhdHRhY2htZW50LnBhdGggfHxcbiAgICAgICAgICAgICAgICAhYXR0YWNobWVudC50aHVtYm5haWwgfHxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LnBlbmRpbmcgfHxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LmVycm9yXG4gICAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IHsgdGh1bWJuYWlsIH0gPSBhdHRhY2htZW50O1xuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHBhdGg6IGF0dGFjaG1lbnQucGF0aCxcbiAgICAgICAgICAgICAgICBvYmplY3RVUkw6IGdldEFic29sdXRlQXR0YWNobWVudFBhdGgoYXR0YWNobWVudC5wYXRoKSxcbiAgICAgICAgICAgICAgICB0aHVtYm5haWxPYmplY3RVcmw6IHRodW1ibmFpbD8ucGF0aFxuICAgICAgICAgICAgICAgICAgPyBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKHRodW1ibmFpbC5wYXRoKVxuICAgICAgICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGF0dGFjaG1lbnQuY29udGVudFR5cGUsXG4gICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICBhdHRhY2htZW50czogbWVzc2FnZS5hdHRhY2htZW50cyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoXG4gICAgICAgICAgICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgICAgICAgICAgICAgICAgICB1dWlkOiBtZXNzYWdlLnNvdXJjZVV1aWQsXG4gICAgICAgICAgICAgICAgICAgICAgICBlMTY0OiBtZXNzYWdlLnNvdXJjZSxcbiAgICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgICApPy5pZCB8fCBtZXNzYWdlLmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgICAgICAgICAgICByZWNlaXZlZF9hdDogbWVzc2FnZS5yZWNlaXZlZF9hdCxcbiAgICAgICAgICAgICAgICAgIHJlY2VpdmVkX2F0X21zOiBOdW1iZXIobWVzc2FnZS5yZWNlaXZlZF9hdF9tcyksXG4gICAgICAgICAgICAgICAgICBzZW50X2F0OiBtZXNzYWdlLnNlbnRfYXQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKS5maWx0ZXIoaXNOb3ROaWwpO1xuXG4gICAgICAvLyBVbmxpa2UgdmlzdWFsIG1lZGlhLCBvbmx5IG9uZSBub24taW1hZ2UgYXR0YWNobWVudCBpcyBzdXBwb3J0ZWRcbiAgICAgIGNvbnN0IGRvY3VtZW50czogQXJyYXk8TWVkaWFJdGVtVHlwZT4gPSBbXTtcbiAgICAgIHJhd0RvY3VtZW50cy5mb3JFYWNoKG1lc3NhZ2UgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2htZW50cyA9IG1lc3NhZ2UuYXR0YWNobWVudHMgfHwgW107XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBhdHRhY2htZW50c1swXTtcbiAgICAgICAgaWYgKCFhdHRhY2htZW50KSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgZG9jdW1lbnRzLnB1c2goe1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiBhdHRhY2htZW50LmNvbnRlbnRUeXBlLFxuICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgICAgLy8gV2UgZG8gdGhpcyBjYXN0IGJlY2F1c2Ugd2Uga25vdyB0aGVyZSBhdHRhY2htZW50cyAoc2VlIHRoZSBjaGVja3MgYWJvdmUpLlxuICAgICAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UgYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlICYge1xuICAgICAgICAgICAgYXR0YWNobWVudHM6IEFycmF5PEF0dGFjaG1lbnRUeXBlPjtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzYXZlQXR0YWNobWVudCA9IGFzeW5jICh7XG4gICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICB9OiB7XG4gICAgICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICAgICAgICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSwgJ3NlbnRfYXQnPjtcbiAgICAgIH0pID0+IHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbWVzc2FnZS5zZW50X2F0O1xuICAgICAgICBjb25zdCBmdWxsUGF0aCA9IGF3YWl0IEF0dGFjaG1lbnQuc2F2ZSh7XG4gICAgICAgICAgYXR0YWNobWVudCxcbiAgICAgICAgICByZWFkQXR0YWNobWVudERhdGEsXG4gICAgICAgICAgc2F2ZUF0dGFjaG1lbnRUb0Rpc2ssXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB9KTtcblxuICAgICAgICBpZiAoZnVsbFBhdGgpIHtcbiAgICAgICAgICBzaG93VG9hc3QoVG9hc3RGaWxlU2F2ZWQsIHtcbiAgICAgICAgICAgIG9uT3BlbkZpbGU6ICgpID0+IHtcbiAgICAgICAgICAgICAgb3BlbkZpbGVJbkZvbGRlcihmdWxsUGF0aCk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICBjb25zdCBvbkl0ZW1DbGljayA9IGFzeW5jICh7XG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgIHR5cGUsXG4gICAgICB9OiBJdGVtQ2xpY2tFdmVudCkgPT4ge1xuICAgICAgICBzd2l0Y2ggKHR5cGUpIHtcbiAgICAgICAgICBjYXNlICdkb2N1bWVudHMnOiB7XG4gICAgICAgICAgICBzYXZlQXR0YWNobWVudCh7IG1lc3NhZ2UsIGF0dGFjaG1lbnQgfSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjYXNlICdtZWRpYSc6IHtcbiAgICAgICAgICAgIGNvbnN0IHNlbGVjdGVkTWVkaWEgPVxuICAgICAgICAgICAgICBtZWRpYS5maW5kKGl0ZW0gPT4gYXR0YWNobWVudC5wYXRoID09PSBpdGVtLnBhdGgpIHx8IG1lZGlhWzBdO1xuICAgICAgICAgICAgdGhpcy5zaG93TGlnaHRib3hGb3JNZWRpYShzZWxlY3RlZE1lZGlhLCBtZWRpYSk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihgVW5rbm93biBhdHRhY2htZW50IHR5cGU6ICcke3R5cGV9J2ApO1xuICAgICAgICB9XG4gICAgICB9O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBkb2N1bWVudHMsXG4gICAgICAgIG1lZGlhLFxuICAgICAgICBvbkl0ZW1DbGljayxcbiAgICAgIH07XG4gICAgfTtcblxuICAgIGZ1bmN0aW9uIGdldE1lc3NhZ2VJZHMoKTogQXJyYXk8c3RyaW5nIHwgdW5kZWZpbmVkPiB8IHVuZGVmaW5lZCB7XG4gICAgICBjb25zdCBzdGF0ZSA9IHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCk7XG4gICAgICBjb25zdCBieUNvbnZlcnNhdGlvbiA9IHN0YXRlPy5jb252ZXJzYXRpb25zPy5tZXNzYWdlc0J5Q29udmVyc2F0aW9uO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBieUNvbnZlcnNhdGlvbiAmJiBieUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF07XG4gICAgICBpZiAoIW1lc3NhZ2VzIHx8ICFtZXNzYWdlcy5tZXNzYWdlSWRzKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXNzYWdlcy5tZXNzYWdlSWRzO1xuICAgIH1cblxuICAgIC8vIERldGVjdCBtZXNzYWdlIGNoYW5nZXMgaW4gdGhlIGN1cnJlbnQgY29udmVyc2F0aW9uXG4gICAgbGV0IHByZXZpb3VzTWVzc2FnZUxpc3Q6IEFycmF5PHN0cmluZyB8IHVuZGVmaW5lZD4gfCB1bmRlZmluZWQ7XG4gICAgcHJldmlvdXNNZXNzYWdlTGlzdCA9IGdldE1lc3NhZ2VJZHMoKTtcblxuICAgIGNvbnN0IHVuc3Vic2NyaWJlID0gd2luZG93LnJlZHV4U3RvcmUuc3Vic2NyaWJlKCgpID0+IHtcbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlTGlzdCA9IGdldE1lc3NhZ2VJZHMoKTtcbiAgICAgIGlmIChjdXJyZW50TWVzc2FnZUxpc3QgIT09IHByZXZpb3VzTWVzc2FnZUxpc3QpIHtcbiAgICAgICAgdXBkYXRlKCk7XG4gICAgICAgIHByZXZpb3VzTWVzc2FnZUxpc3QgPSBjdXJyZW50TWVzc2FnZUxpc3Q7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBjb25zdCB2aWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgY2xhc3NOYW1lOiAncGFuZWwnLFxuICAgICAgLy8gV2UgcHJlc2VudCBhbiBlbXB0eSBwYW5lbCBicmllZmx5LCB3aGlsZSB3ZSB3YWl0IGZvciBwcm9wcyB0byBsb2FkLlxuICAgICAgSlNYOiA8PjwvPixcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgdW5zdWJzY3JpYmUoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSB3aW5kb3cuaTE4bignYWxsTWVkaWEnKTtcblxuICAgIGNvbnN0IHVwZGF0ZSA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHByb3BzID0gYXdhaXQgZ2V0UHJvcHMoKTtcbiAgICAgIHZpZXcudXBkYXRlKDxNZWRpYUdhbGxlcnkgaTE4bj17d2luZG93LmkxOG59IHsuLi5wcm9wc30gLz4pO1xuICAgIH07XG5cbiAgICB0aGlzLmFkZFBhbmVsKHsgdmlldywgaGVhZGVyVGl0bGUgfSk7XG5cbiAgICB1cGRhdGUoKTtcbiAgfVxuXG4gIGZvY3VzTWVzc2FnZUZpZWxkKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLnBhbmVscyAmJiB0aGlzLnBhbmVscy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmNvbXBvc2l0aW9uQXBpLmN1cnJlbnQ/LmZvY3VzSW5wdXQoKTtcbiAgfVxuXG4gIGRpc2FibGVNZXNzYWdlRmllbGQoKTogdm9pZCB7XG4gICAgdGhpcy5jb21wb3NpdGlvbkFwaS5jdXJyZW50Py5zZXREaXNhYmxlZCh0cnVlKTtcbiAgfVxuXG4gIGVuYWJsZU1lc3NhZ2VGaWVsZCgpOiB2b2lkIHtcbiAgICB0aGlzLmNvbXBvc2l0aW9uQXBpLmN1cnJlbnQ/LnNldERpc2FibGVkKGZhbHNlKTtcbiAgfVxuXG4gIHJlc2V0RW1vamlSZXN1bHRzKCk6IHZvaWQge1xuICAgIHRoaXMuY29tcG9zaXRpb25BcGkuY3VycmVudD8ucmVzZXRFbW9qaVJlc3VsdHMoKTtcbiAgfVxuXG4gIHNob3dHVjFNZW1iZXJzKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udGFjdENvbGxlY3Rpb24sIGlkIH0gPSB0aGlzLm1vZGVsO1xuXG4gICAgY29uc3QgbWVtYmVyc2hpcHMgPVxuICAgICAgY29udGFjdENvbGxlY3Rpb24/Lm1hcCgoY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCkgPT4ge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGlzQWRtaW46IGZhbHNlLFxuICAgICAgICAgIG1lbWJlcjogY29udmVyc2F0aW9uLmZvcm1hdCgpLFxuICAgICAgICB9O1xuICAgICAgfSkgfHwgW107XG5cbiAgICBjb25zdCByZWR1eFN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBnZXRQcmVmZXJyZWRCYWRnZSA9IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IocmVkdXhTdGF0ZSk7XG4gICAgY29uc3QgdGhlbWUgPSBnZXRUaGVtZShyZWR1eFN0YXRlKTtcblxuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdncm91cC1tZW1iZXItbGlzdCBwYW5lbCcsXG4gICAgICBKU1g6IChcbiAgICAgICAgPENvbnZlcnNhdGlvbkRldGFpbHNNZW1iZXJzaGlwTGlzdFxuICAgICAgICAgIGNhbkFkZE5ld01lbWJlcnM9e2ZhbHNlfVxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkPXtpZH1cbiAgICAgICAgICBpMThuPXt3aW5kb3cuaTE4bn1cbiAgICAgICAgICBnZXRQcmVmZXJyZWRCYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2V9XG4gICAgICAgICAgbWF4U2hvd25NZW1iZXJDb3VudD17MzJ9XG4gICAgICAgICAgbWVtYmVyc2hpcHM9e21lbWJlcnNoaXBzfVxuICAgICAgICAgIHNob3dDb250YWN0TW9kYWw9e2NvbnRhY3RJZCA9PiB7XG4gICAgICAgICAgICB0aGlzLnNob3dDb250YWN0TW9kYWwoY29udGFjdElkKTtcbiAgICAgICAgICB9fVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgLz5cbiAgICAgICksXG4gICAgfSk7XG5cbiAgICB0aGlzLmFkZFBhbmVsKHsgdmlldyB9KTtcbiAgICB2aWV3LnJlbmRlcigpO1xuICB9XG5cbiAgc2hvd1NhZmV0eU51bWJlcihpZD86IHN0cmluZyk6IHZvaWQge1xuICAgIGxldCBjb252ZXJzYXRpb246IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvbk1vZGVsO1xuXG4gICAgaWYgKCFpZCAmJiBpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLm1vZGVsLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB0aGlzLm1vZGVsO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWQpO1xuICAgIH1cbiAgICBpZiAoY29udmVyc2F0aW9uKSB7XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmdsb2JhbE1vZGFscy50b2dnbGVTYWZldHlOdW1iZXJNb2RhbChcbiAgICAgICAgY29udmVyc2F0aW9uLmdldCgnaWQnKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBkb3dubG9hZEF0dGFjaG1lbnRXcmFwcGVyKFxuICAgIG1lc3NhZ2VJZDogc3RyaW5nLFxuICAgIHByb3ZpZGVkQXR0YWNobWVudD86IEF0dGFjaG1lbnRUeXBlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIuZ2V0QnlJZChtZXNzYWdlSWQpO1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZG93bmxvYWRBdHRhY2htZW50V3JhcHBlcjogTWVzc2FnZSAke21lc3NhZ2VJZH0gbWlzc2luZyFgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHsgYXR0YWNobWVudHMsIHNlbnRfYXQ6IHRpbWVzdGFtcCB9ID0gbWVzc2FnZS5hdHRyaWJ1dGVzO1xuICAgIGlmICghYXR0YWNobWVudHMgfHwgYXR0YWNobWVudHMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnQgPVxuICAgICAgcHJvdmlkZWRBdHRhY2htZW50ICYmIGF0dGFjaG1lbnRzLmluY2x1ZGVzKHByb3ZpZGVkQXR0YWNobWVudClcbiAgICAgICAgPyBwcm92aWRlZEF0dGFjaG1lbnRcbiAgICAgICAgOiBhdHRhY2htZW50c1swXTtcbiAgICBjb25zdCB7IGZpbGVOYW1lIH0gPSBhdHRhY2htZW50O1xuXG4gICAgY29uc3QgaXNEYW5nZXJvdXMgPSB3aW5kb3cuU2lnbmFsLlV0aWwuaXNGaWxlRGFuZ2Vyb3VzKGZpbGVOYW1lIHx8ICcnKTtcblxuICAgIHRoaXMuZG93bmxvYWRBdHRhY2htZW50KHsgYXR0YWNobWVudCwgdGltZXN0YW1wLCBpc0Rhbmdlcm91cyB9KTtcbiAgfVxuXG4gIGFzeW5jIGRvd25sb2FkQXR0YWNobWVudCh7XG4gICAgYXR0YWNobWVudCxcbiAgICB0aW1lc3RhbXAsXG4gICAgaXNEYW5nZXJvdXMsXG4gIH06IHtcbiAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBpc0Rhbmdlcm91czogYm9vbGVhbjtcbiAgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc0Rhbmdlcm91cykge1xuICAgICAgc2hvd1RvYXN0KFRvYXN0RGFuZ2Vyb3VzRmlsZVR5cGUpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGZ1bGxQYXRoID0gYXdhaXQgQXR0YWNobWVudC5zYXZlKHtcbiAgICAgIGF0dGFjaG1lbnQsXG4gICAgICByZWFkQXR0YWNobWVudERhdGEsXG4gICAgICBzYXZlQXR0YWNobWVudFRvRGlzayxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9KTtcblxuICAgIGlmIChmdWxsUGF0aCkge1xuICAgICAgc2hvd1RvYXN0KFRvYXN0RmlsZVNhdmVkLCB7XG4gICAgICAgIG9uT3BlbkZpbGU6ICgpID0+IHtcbiAgICAgICAgICBvcGVuRmlsZUluRm9sZGVyKGZ1bGxQYXRoKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlKG1lc3NhZ2VJZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ2Rpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlOiBhdHRlbXB0aW5nIHRvIGRpc3BsYXkgbWVzc2FnZScpO1xuXG4gICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKG1lc3NhZ2VJZCk7XG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlOiBNZXNzYWdlICR7bWVzc2FnZUlkfSBtaXNzaW5nIWApO1xuICAgIH1cblxuICAgIGlmICghaXNUYXBUb1ZpZXcobWVzc2FnZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IE1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfSBpcyBub3QgYSB0YXAgdG8gdmlldyBtZXNzYWdlYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZS5pc0VyYXNlZCgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZTogTWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9IGlzIGFscmVhZHkgZXJhc2VkYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdEF0dGFjaG1lbnQgPSAobWVzc2FnZS5nZXQoJ2F0dGFjaG1lbnRzJykgfHwgW10pWzBdO1xuICAgIGlmICghZmlyc3RBdHRhY2htZW50IHx8ICFmaXJzdEF0dGFjaG1lbnQucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IE1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfSBoYWQgbm8gZmlyc3QgYXR0YWNobWVudCB3aXRoIHBhdGhgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IGdldEFic29sdXRlQXR0YWNobWVudFBhdGgoZmlyc3RBdHRhY2htZW50LnBhdGgpO1xuICAgIGNvbnN0IHsgcGF0aDogdGVtcFBhdGggfSA9IGF3YWl0IGNvcHlJbnRvVGVtcERpcmVjdG9yeShhYnNvbHV0ZVBhdGgpO1xuICAgIGNvbnN0IHRlbXBBdHRhY2htZW50ID0ge1xuICAgICAgLi4uZmlyc3RBdHRhY2htZW50LFxuICAgICAgcGF0aDogdGVtcFBhdGgsXG4gICAgfTtcblxuICAgIGF3YWl0IG1lc3NhZ2UubWFya1ZpZXdPbmNlTWVzc2FnZVZpZXdlZCgpO1xuXG4gICAgY29uc3QgY2xvc2UgPSAoKTogdm9pZCA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICB0aGlzLnN0b3BMaXN0ZW5pbmcobWVzc2FnZSk7XG4gICAgICAgIGNsb3NlTGlnaHRib3goKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGRlbGV0ZVRlbXBGaWxlKHRlbXBQYXRoKTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgdGhpcy5saXN0ZW5UbyhtZXNzYWdlLCAnZXhwaXJlZCcsIGNsb3NlKTtcbiAgICB0aGlzLmxpc3RlblRvKG1lc3NhZ2UsICdjaGFuZ2UnLCAoKSA9PiB7XG4gICAgICBzaG93TGlnaHRib3goZ2V0UHJvcHMoKSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCBnZXRQcm9wcyA9ICgpOiBDb21wb25lbnRQcm9wczx0eXBlb2YgTGlnaHRib3g+ID0+IHtcbiAgICAgIGNvbnN0IHsgcGF0aCwgY29udGVudFR5cGUgfSA9IHRlbXBBdHRhY2htZW50O1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICBjbG9zZSxcbiAgICAgICAgaTE4bjogd2luZG93LmkxOG4sXG4gICAgICAgIG1lZGlhOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgYXR0YWNobWVudDogdGVtcEF0dGFjaG1lbnQsXG4gICAgICAgICAgICBvYmplY3RVUkw6IGdldEFic29sdXRlVGVtcFBhdGgocGF0aCksXG4gICAgICAgICAgICBjb250ZW50VHlwZSxcbiAgICAgICAgICAgIGluZGV4OiAwLFxuICAgICAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgICAgICBhdHRhY2htZW50czogbWVzc2FnZS5nZXQoJ2F0dGFjaG1lbnRzJykgfHwgW10sXG4gICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmdldCgnaWQnKSxcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6IG1lc3NhZ2UuZ2V0KCdjb252ZXJzYXRpb25JZCcpLFxuICAgICAgICAgICAgICByZWNlaXZlZF9hdDogbWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0JyksXG4gICAgICAgICAgICAgIHJlY2VpdmVkX2F0X21zOiBOdW1iZXIobWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0X21zJykpLFxuICAgICAgICAgICAgICBzZW50X2F0OiBtZXNzYWdlLmdldCgnc2VudF9hdCcpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc1ZpZXdPbmNlOiB0cnVlLFxuICAgICAgfTtcbiAgICB9O1xuXG4gICAgc2hvd0xpZ2h0Ym94KGdldFByb3BzKCkpO1xuXG4gICAgbG9nLmluZm8oJ2Rpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlOiBzaG93ZWQgbGlnaHRib3gnKTtcbiAgfVxuXG4gIGRlbGV0ZU1lc3NhZ2UobWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobWVzc2FnZUlkKTtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgZGVsZXRlTWVzc2FnZTogTWVzc2FnZSAke21lc3NhZ2VJZH0gbWlzc2luZyFgKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuc2hvd0NvbmZpcm1hdGlvbkRpYWxvZyh7XG4gICAgICBjb25maXJtU3R5bGU6ICduZWdhdGl2ZScsXG4gICAgICBtZXNzYWdlOiB3aW5kb3cuaTE4bignZGVsZXRlV2FybmluZycpLFxuICAgICAgb2tUZXh0OiB3aW5kb3cuaTE4bignZGVsZXRlJyksXG4gICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS5yZW1vdmVNZXNzYWdlKG1lc3NhZ2UuaWQpO1xuICAgICAgICBpZiAoaXNPdXRnb2luZyhtZXNzYWdlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5kZWNyZW1lbnRTZW50TWVzc2FnZUNvdW50KCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5kZWNyZW1lbnRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgfVxuICAgICAgICB0aGlzLnJlc2V0UGFuZWwoKTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBkZWxldGVNZXNzYWdlRm9yRXZlcnlvbmUobWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobWVzc2FnZUlkKTtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZTogTWVzc2FnZSAke21lc3NhZ2VJZH0gbWlzc2luZyFgXG4gICAgICApO1xuICAgIH1cblxuICAgIHdpbmRvdy5zaG93Q29uZmlybWF0aW9uRGlhbG9nKHtcbiAgICAgIGNvbmZpcm1TdHlsZTogJ25lZ2F0aXZlJyxcbiAgICAgIG1lc3NhZ2U6IHdpbmRvdy5pMThuKCdkZWxldGVGb3JFdmVyeW9uZVdhcm5pbmcnKSxcbiAgICAgIG9rVGV4dDogd2luZG93LmkxOG4oJ2RlbGV0ZScpLFxuICAgICAgcmVzb2x2ZTogYXN5bmMgKCkgPT4ge1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHRoaXMubW9kZWwuc2VuZERlbGV0ZUZvckV2ZXJ5b25lTWVzc2FnZSh7XG4gICAgICAgICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICAnRXJyb3Igc2VuZGluZyBkZWxldGUtZm9yLWV2ZXJ5b25lJyxcbiAgICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrLFxuICAgICAgICAgICAgbWVzc2FnZUlkXG4gICAgICAgICAgKTtcbiAgICAgICAgICBzaG93VG9hc3QoVG9hc3REZWxldGVGb3JFdmVyeW9uZUZhaWxlZCk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5yZXNldFBhbmVsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd1N0aWNrZXJQYWNrUHJldmlldyhwYWNrSWQ6IHN0cmluZywgcGFja0tleTogc3RyaW5nKTogdm9pZCB7XG4gICAgU3RpY2tlcnMuZG93bmxvYWRFcGhlbWVyYWxQYWNrKHBhY2tJZCwgcGFja0tleSk7XG5cbiAgICBjb25zdCBwcm9wcyA9IHtcbiAgICAgIHBhY2tJZCxcbiAgICAgIG9uQ2xvc2U6IGFzeW5jICgpID0+IHtcbiAgICAgICAgaWYgKHRoaXMuc3RpY2tlclByZXZpZXdNb2RhbFZpZXcpIHtcbiAgICAgICAgICB0aGlzLnN0aWNrZXJQcmV2aWV3TW9kYWxWaWV3LnJlbW92ZSgpO1xuICAgICAgICAgIHRoaXMuc3RpY2tlclByZXZpZXdNb2RhbFZpZXcgPSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgYXdhaXQgU3RpY2tlcnMucmVtb3ZlRXBoZW1lcmFsUGFjayhwYWNrSWQpO1xuICAgICAgfSxcbiAgICB9O1xuXG4gICAgdGhpcy5zdGlja2VyUHJldmlld01vZGFsVmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgIGNsYXNzTmFtZTogJ3N0aWNrZXItcHJldmlldy1tb2RhbC13cmFwcGVyJyxcbiAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVTdGlja2VyUHJldmlld01vZGFsKFxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAgcHJvcHNcbiAgICAgICksXG4gICAgfSk7XG4gIH1cblxuICBzaG93TGlnaHRib3hGb3JNZWRpYShcbiAgICBzZWxlY3RlZE1lZGlhSXRlbTogTWVkaWFJdGVtVHlwZSxcbiAgICBtZWRpYTogQXJyYXk8TWVkaWFJdGVtVHlwZT4gPSBbXVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBvblNhdmUgPSBhc3luYyAoe1xuICAgICAgYXR0YWNobWVudCxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICBpbmRleCxcbiAgICB9OiB7XG4gICAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgICAgIG1lc3NhZ2U6IE1lZGlhSXRlbU1lc3NhZ2VUeXBlO1xuICAgICAgaW5kZXg6IG51bWJlcjtcbiAgICB9KSA9PiB7XG4gICAgICBjb25zdCBmdWxsUGF0aCA9IGF3YWl0IEF0dGFjaG1lbnQuc2F2ZSh7XG4gICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgIGluZGV4OiBpbmRleCArIDEsXG4gICAgICAgIHJlYWRBdHRhY2htZW50RGF0YSxcbiAgICAgICAgc2F2ZUF0dGFjaG1lbnRUb0Rpc2ssXG4gICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZS5zZW50X2F0LFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChmdWxsUGF0aCkge1xuICAgICAgICBzaG93VG9hc3QoVG9hc3RGaWxlU2F2ZWQsIHtcbiAgICAgICAgICBvbk9wZW5GaWxlOiAoKSA9PiB7XG4gICAgICAgICAgICBvcGVuRmlsZUluRm9sZGVyKGZ1bGxQYXRoKTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRJbmRleCA9IG1lZGlhLmZpbmRJbmRleChcbiAgICAgIG1lZGlhSXRlbSA9PlxuICAgICAgICBtZWRpYUl0ZW0uYXR0YWNobWVudC5wYXRoID09PSBzZWxlY3RlZE1lZGlhSXRlbS5hdHRhY2htZW50LnBhdGhcbiAgICApO1xuXG4gICAgc2hvd0xpZ2h0Ym94KHtcbiAgICAgIGNsb3NlOiBjbG9zZUxpZ2h0Ym94LFxuICAgICAgaTE4bjogd2luZG93LmkxOG4sXG4gICAgICBnZXRDb252ZXJzYXRpb246IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCkpLFxuICAgICAgbWVkaWEsXG4gICAgICBvbkZvcndhcmQ6IG1lc3NhZ2VJZCA9PiB7XG4gICAgICAgIHRoaXMuc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwobWVzc2FnZUlkKTtcbiAgICAgIH0sXG4gICAgICBvblNhdmUsXG4gICAgICBzZWxlY3RlZEluZGV4OiBzZWxlY3RlZEluZGV4ID49IDAgPyBzZWxlY3RlZEluZGV4IDogMCxcbiAgICB9KTtcbiAgfVxuXG4gIHNob3dMaWdodGJveCh7XG4gICAgYXR0YWNobWVudCxcbiAgICBtZXNzYWdlSWQsXG4gIH06IHtcbiAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICBzaG93U2luZ2xlPzogYm9vbGVhbjtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIuZ2V0QnlJZChtZXNzYWdlSWQpO1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKGBzaG93TGlnaHRib3g6IE1lc3NhZ2UgJHttZXNzYWdlSWR9IG1pc3NpbmchYCk7XG4gICAgfVxuICAgIGNvbnN0IHN0aWNrZXIgPSBtZXNzYWdlLmdldCgnc3RpY2tlcicpO1xuICAgIGlmIChzdGlja2VyKSB7XG4gICAgICBjb25zdCB7IHBhY2tJZCwgcGFja0tleSB9ID0gc3RpY2tlcjtcbiAgICAgIHRoaXMuc2hvd1N0aWNrZXJQYWNrUHJldmlldyhwYWNrSWQsIHBhY2tLZXkpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICBpZiAoXG4gICAgICAhd2luZG93LlNpZ25hbC5VdGlsLkdvb2dsZUNocm9tZS5pc0ltYWdlVHlwZVN1cHBvcnRlZChjb250ZW50VHlwZSkgJiZcbiAgICAgICF3aW5kb3cuU2lnbmFsLlV0aWwuR29vZ2xlQ2hyb21lLmlzVmlkZW9UeXBlU3VwcG9ydGVkKGNvbnRlbnRUeXBlKVxuICAgICkge1xuICAgICAgdGhpcy5kb3dubG9hZEF0dGFjaG1lbnRXcmFwcGVyKG1lc3NhZ2VJZCwgYXR0YWNobWVudCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHM6IEFycmF5PEF0dGFjaG1lbnRUeXBlPiA9IG1lc3NhZ2UuZ2V0KCdhdHRhY2htZW50cycpIHx8IFtdO1xuXG4gICAgY29uc3QgbG9vcCA9IGlzR0lGKGF0dGFjaG1lbnRzKTtcblxuICAgIGNvbnN0IG1lZGlhID0gYXR0YWNobWVudHNcbiAgICAgIC5maWx0ZXIoaXRlbSA9PiBpdGVtLnRodW1ibmFpbCAmJiAhaXRlbS5wZW5kaW5nICYmICFpdGVtLmVycm9yKVxuICAgICAgLm1hcCgoaXRlbSwgaW5kZXgpID0+ICh7XG4gICAgICAgIG9iamVjdFVSTDogZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChpdGVtLnBhdGggPz8gJycpLFxuICAgICAgICBwYXRoOiBpdGVtLnBhdGgsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBpdGVtLmNvbnRlbnRUeXBlLFxuICAgICAgICBsb29wLFxuICAgICAgICBpbmRleCxcbiAgICAgICAgbWVzc2FnZToge1xuICAgICAgICAgIGF0dGFjaG1lbnRzOiBtZXNzYWdlLmdldCgnYXR0YWNobWVudHMnKSB8fCBbXSxcbiAgICAgICAgICBpZDogbWVzc2FnZS5nZXQoJ2lkJyksXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6XG4gICAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoXG4gICAgICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgICAgICAgICAgIHV1aWQ6IG1lc3NhZ2UuZ2V0KCdzb3VyY2VVdWlkJyksXG4gICAgICAgICAgICAgICAgZTE2NDogbWVzc2FnZS5nZXQoJ3NvdXJjZScpLFxuICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgKT8uaWQgfHwgbWVzc2FnZS5nZXQoJ2NvbnZlcnNhdGlvbklkJyksXG4gICAgICAgICAgcmVjZWl2ZWRfYXQ6IG1lc3NhZ2UuZ2V0KCdyZWNlaXZlZF9hdCcpLFxuICAgICAgICAgIHJlY2VpdmVkX2F0X21zOiBOdW1iZXIobWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0X21zJykpLFxuICAgICAgICAgIHNlbnRfYXQ6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgIH0sXG4gICAgICAgIGF0dGFjaG1lbnQ6IGl0ZW0sXG4gICAgICAgIHRodW1ibmFpbE9iamVjdFVybDpcbiAgICAgICAgICBpdGVtLnRodW1ibmFpbD8ub2JqZWN0VXJsIHx8XG4gICAgICAgICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChpdGVtLnRodW1ibmFpbD8ucGF0aCA/PyAnJyksXG4gICAgICB9KSk7XG5cbiAgICBpZiAoIW1lZGlhLmxlbmd0aCkge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnc2hvd0xpZ2h0Ym94OiB1bmFibGUgdG8gbG9hZCBhdHRhY2htZW50JyxcbiAgICAgICAgYXR0YWNobWVudHMubWFwKHggPT4gKHtcbiAgICAgICAgICBjb250ZW50VHlwZTogeC5jb250ZW50VHlwZSxcbiAgICAgICAgICBlcnJvcjogeC5lcnJvcixcbiAgICAgICAgICBmbGFnczogeC5mbGFncyxcbiAgICAgICAgICBwYXRoOiB4LnBhdGgsXG4gICAgICAgICAgc2l6ZTogeC5zaXplLFxuICAgICAgICB9KSlcbiAgICAgICk7XG4gICAgICBzaG93VG9hc3QoVG9hc3RVbmFibGVUb0xvYWRBdHRhY2htZW50KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZWxlY3RlZE1lZGlhID1cbiAgICAgIG1lZGlhLmZpbmQoaXRlbSA9PiBhdHRhY2htZW50LnBhdGggPT09IGl0ZW0ucGF0aCkgfHwgbWVkaWFbMF07XG5cbiAgICB0aGlzLnNob3dMaWdodGJveEZvck1lZGlhKHNlbGVjdGVkTWVkaWEsIG1lZGlhKTtcbiAgfVxuXG4gIHNob3dDb250YWN0TW9kYWwoY29udGFjdElkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmdsb2JhbE1vZGFscy5zaG93Q29udGFjdE1vZGFsKGNvbnRhY3RJZCwgdGhpcy5tb2RlbC5pZCk7XG4gIH1cblxuICBzaG93R3JvdXBMaW5rTWFuYWdlbWVudCgpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgY2xhc3NOYW1lOiAncGFuZWwnLFxuICAgICAgSlNYOiB3aW5kb3cuU2lnbmFsLlN0YXRlLlJvb3RzLmNyZWF0ZUdyb3VwTGlua01hbmFnZW1lbnQoXG4gICAgICAgIHdpbmRvdy5yZWR1eFN0b3JlLFxuICAgICAgICB7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMubW9kZWwuaWQsXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSB3aW5kb3cuaTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tZ3JvdXAtbGluaycpO1xuXG4gICAgdGhpcy5hZGRQYW5lbCh7IHZpZXcsIGhlYWRlclRpdGxlIH0pO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBzaG93R3JvdXBWMlBlcm1pc3Npb25zKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdwYW5lbCcsXG4gICAgICBKU1g6IHdpbmRvdy5TaWduYWwuU3RhdGUuUm9vdHMuY3JlYXRlR3JvdXBWMlBlcm1pc3Npb25zKFxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLm1vZGVsLmlkLFxuICAgICAgICAgIHNldEFjY2Vzc0NvbnRyb2xBdHRyaWJ1dGVzU2V0dGluZzpcbiAgICAgICAgICAgIHRoaXMuc2V0QWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNTZXR0aW5nLmJpbmQodGhpcyksXG4gICAgICAgICAgc2V0QWNjZXNzQ29udHJvbE1lbWJlcnNTZXR0aW5nOlxuICAgICAgICAgICAgdGhpcy5zZXRBY2Nlc3NDb250cm9sTWVtYmVyc1NldHRpbmcuYmluZCh0aGlzKSxcbiAgICAgICAgICBzZXRBbm5vdW5jZW1lbnRzT25seTogdGhpcy5zZXRBbm5vdW5jZW1lbnRzT25seS5iaW5kKHRoaXMpLFxuICAgICAgICB9XG4gICAgICApLFxuICAgIH0pO1xuICAgIGNvbnN0IGhlYWRlclRpdGxlID0gd2luZG93LmkxOG4oJ3Blcm1pc3Npb25zJyk7XG5cbiAgICB0aGlzLmFkZFBhbmVsKHsgdmlldywgaGVhZGVyVGl0bGUgfSk7XG4gICAgdmlldy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNob3dQZW5kaW5nSW52aXRlcygpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgY2xhc3NOYW1lOiAncGFuZWwnLFxuICAgICAgSlNYOiB3aW5kb3cuU2lnbmFsLlN0YXRlLlJvb3RzLmNyZWF0ZVBlbmRpbmdJbnZpdGVzKHdpbmRvdy5yZWR1eFN0b3JlLCB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLm1vZGVsLmlkLFxuICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXA6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB7XG4gICAgICAgICAgdGhpcy5tb2RlbC5hcHByb3ZlUGVuZGluZ01lbWJlcnNoaXBGcm9tR3JvdXBWMihjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIH0sXG4gICAgICAgIHJldm9rZVBlbmRpbmdNZW1iZXJzaGlwczogY29udmVyc2F0aW9uSWRzID0+IHtcbiAgICAgICAgICB0aGlzLm1vZGVsLnJldm9rZVBlbmRpbmdNZW1iZXJzaGlwc0Zyb21Hcm91cFYyKGNvbnZlcnNhdGlvbklkcyk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICB9KTtcbiAgICBjb25zdCBoZWFkZXJUaXRsZSA9IHdpbmRvdy5pMThuKFxuICAgICAgJ0NvbnZlcnNhdGlvbkRldGFpbHMtLXJlcXVlc3RzLWFuZC1pbnZpdGVzJ1xuICAgICk7XG5cbiAgICB0aGlzLmFkZFBhbmVsKHsgdmlldywgaGVhZGVyVGl0bGUgfSk7XG4gICAgdmlldy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNob3dDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3MoKTogdm9pZCB7XG4gICAgY29uc3QgdmlldyA9IG5ldyBSZWFjdFdyYXBwZXJWaWV3KHtcbiAgICAgIGNsYXNzTmFtZTogJ3BhbmVsJyxcbiAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVDb252ZXJzYXRpb25Ob3RpZmljYXRpb25zU2V0dGluZ3MoXG4gICAgICAgIHdpbmRvdy5yZWR1eFN0b3JlLFxuICAgICAgICB7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMubW9kZWwuaWQsXG4gICAgICAgICAgc2V0RG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZDpcbiAgICAgICAgICAgIHRoaXMubW9kZWwuc2V0RG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZC5iaW5kKHRoaXMubW9kZWwpLFxuICAgICAgICAgIHNldE11dGVFeHBpcmF0aW9uOiB0aGlzLnNldE11dGVFeHBpcmF0aW9uLmJpbmQodGhpcyksXG4gICAgICAgIH1cbiAgICAgICksXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSB3aW5kb3cuaTE4bignQ29udmVyc2F0aW9uRGV0YWlscy0tbm90aWZpY2F0aW9ucycpO1xuXG4gICAgdGhpcy5hZGRQYW5lbCh7IHZpZXcsIGhlYWRlclRpdGxlIH0pO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBzaG93Q2hhdENvbG9yRWRpdG9yKCk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdwYW5lbCcsXG4gICAgICBKU1g6IHdpbmRvdy5TaWduYWwuU3RhdGUuUm9vdHMuY3JlYXRlQ2hhdENvbG9yUGlja2VyKHdpbmRvdy5yZWR1eFN0b3JlLCB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLm1vZGVsLmdldCgnaWQnKSxcbiAgICAgIH0pLFxuICAgIH0pO1xuICAgIGNvbnN0IGhlYWRlclRpdGxlID0gd2luZG93LmkxOG4oJ0NoYXRDb2xvclBpY2tlcl9fbWVudS10aXRsZScpO1xuXG4gICAgdGhpcy5hZGRQYW5lbCh7IHZpZXcsIGhlYWRlclRpdGxlIH0pO1xuICAgIHZpZXcucmVuZGVyKCk7XG4gIH1cblxuICBzaG93Q29udmVyc2F0aW9uRGV0YWlscygpOiB2b2lkIHtcbiAgICAvLyBSdW4gYSBnZXRQcm9maWxlcyBpbiBjYXNlIG1lbWJlcidzIGNhcGFiaWxpdGllcyBoYXZlIGNoYW5nZWRcbiAgICAvLyBSZWR1eCBzaG91bGQgY292ZXIgdXMgb24gdGhlIHJldHVybiBoZXJlIHNvIG5vIG5lZWQgdG8gYXdhaXQgdGhpcy5cbiAgICBpZiAodGhpcy5tb2RlbC50aHJvdHRsZWRHZXRQcm9maWxlcykge1xuICAgICAgdGhpcy5tb2RlbC50aHJvdHRsZWRHZXRQcm9maWxlcygpO1xuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VSZXF1ZXN0RW51bSA9IFByb3RvLlN5bmNNZXNzYWdlLk1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UuVHlwZTtcblxuICAgIC8vIHRoZXNlIG1ldGhvZHMgYXJlIHVzZWQgaW4gbW9yZSB0aGFuIG9uZSBwbGFjZSBhbmQgc2hvdWxkIHByb2JhYmx5IGJlXG4gICAgLy8gZHJpZWQgdXAgYW5kIGhvaXN0ZWQgdG8gbWV0aG9kcyBvbiBDb252ZXJzYXRpb25WaWV3XG5cbiAgICBjb25zdCBvbkxlYXZlID0gKCkgPT4ge1xuICAgICAgdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgICAgbmFtZTogJ29uTGVhdmUnLFxuICAgICAgICB0YXNrOiAoKSA9PiB0aGlzLm1vZGVsLmxlYXZlR3JvdXBWMigpLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGNvbnN0IG9uQmxvY2sgPSAoKSA9PiB7XG4gICAgICB0aGlzLnN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgICAgICAnb25CbG9jaycsXG4gICAgICAgIHRoaXMubW9kZWwsXG4gICAgICAgIG1lc3NhZ2VSZXF1ZXN0RW51bS5CTE9DS1xuICAgICAgKTtcbiAgICB9O1xuXG4gICAgY29uc3QgcHJvcHMgPSB7XG4gICAgICBhZGRNZW1iZXJzOiB0aGlzLm1vZGVsLmFkZE1lbWJlcnNWMi5iaW5kKHRoaXMubW9kZWwpLFxuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMubW9kZWwuZ2V0KCdpZCcpLFxuICAgICAgbG9hZFJlY2VudE1lZGlhSXRlbXM6IHRoaXMubG9hZFJlY2VudE1lZGlhSXRlbXMuYmluZCh0aGlzKSxcbiAgICAgIHNldERpc2FwcGVhcmluZ01lc3NhZ2VzOiB0aGlzLnNldERpc2FwcGVhcmluZ01lc3NhZ2VzLmJpbmQodGhpcyksXG4gICAgICBzaG93QWxsTWVkaWE6IHRoaXMuc2hvd0FsbE1lZGlhLmJpbmQodGhpcyksXG4gICAgICBzaG93Q29udGFjdE1vZGFsOiB0aGlzLnNob3dDb250YWN0TW9kYWwuYmluZCh0aGlzKSxcbiAgICAgIHNob3dDaGF0Q29sb3JFZGl0b3I6IHRoaXMuc2hvd0NoYXRDb2xvckVkaXRvci5iaW5kKHRoaXMpLFxuICAgICAgc2hvd0dyb3VwTGlua01hbmFnZW1lbnQ6IHRoaXMuc2hvd0dyb3VwTGlua01hbmFnZW1lbnQuYmluZCh0aGlzKSxcbiAgICAgIHNob3dHcm91cFYyUGVybWlzc2lvbnM6IHRoaXMuc2hvd0dyb3VwVjJQZXJtaXNzaW9ucy5iaW5kKHRoaXMpLFxuICAgICAgc2hvd0NvbnZlcnNhdGlvbk5vdGlmaWNhdGlvbnNTZXR0aW5nczpcbiAgICAgICAgdGhpcy5zaG93Q29udmVyc2F0aW9uTm90aWZpY2F0aW9uc1NldHRpbmdzLmJpbmQodGhpcyksXG4gICAgICBzaG93UGVuZGluZ0ludml0ZXM6IHRoaXMuc2hvd1BlbmRpbmdJbnZpdGVzLmJpbmQodGhpcyksXG4gICAgICBzaG93TGlnaHRib3hGb3JNZWRpYTogdGhpcy5zaG93TGlnaHRib3hGb3JNZWRpYS5iaW5kKHRoaXMpLFxuICAgICAgdXBkYXRlR3JvdXBBdHRyaWJ1dGVzOiB0aGlzLm1vZGVsLnVwZGF0ZUdyb3VwQXR0cmlidXRlc1YyLmJpbmQoXG4gICAgICAgIHRoaXMubW9kZWxcbiAgICAgICksXG4gICAgICBvbkxlYXZlLFxuICAgICAgb25CbG9jayxcbiAgICAgIG9uVW5ibG9jazogKCkgPT4ge1xuICAgICAgICB0aGlzLnN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKFxuICAgICAgICAgICdvblVuYmxvY2snLFxuICAgICAgICAgIHRoaXMubW9kZWwsXG4gICAgICAgICAgbWVzc2FnZVJlcXVlc3RFbnVtLkFDQ0VQVFxuICAgICAgICApO1xuICAgICAgfSxcbiAgICAgIHNldE11dGVFeHBpcmF0aW9uOiB0aGlzLnNldE11dGVFeHBpcmF0aW9uLmJpbmQodGhpcyksXG4gICAgICBvbk91dGdvaW5nQXVkaW9DYWxsSW5Db252ZXJzYXRpb246XG4gICAgICAgIHRoaXMub25PdXRnb2luZ0F1ZGlvQ2FsbEluQ29udmVyc2F0aW9uLmJpbmQodGhpcyksXG4gICAgICBvbk91dGdvaW5nVmlkZW9DYWxsSW5Db252ZXJzYXRpb246XG4gICAgICAgIHRoaXMub25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uLmJpbmQodGhpcyksXG4gICAgfTtcblxuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdjb252ZXJzYXRpb24tZGV0YWlscy1wYW5lIHBhbmVsJyxcbiAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVDb252ZXJzYXRpb25EZXRhaWxzKFxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAgcHJvcHNcbiAgICAgICksXG4gICAgfSk7XG4gICAgY29uc3QgaGVhZGVyVGl0bGUgPSAnJztcblxuICAgIHRoaXMuYWRkUGFuZWwoeyB2aWV3LCBoZWFkZXJUaXRsZSB9KTtcbiAgICB2aWV3LnJlbmRlcigpO1xuICB9XG5cbiAgc2hvd01lc3NhZ2VEZXRhaWwobWVzc2FnZUlkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobWVzc2FnZUlkKTtcbiAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgc2hvd01lc3NhZ2VEZXRhaWw6IE1lc3NhZ2UgJHttZXNzYWdlSWR9IG1pc3NpbmchYCk7XG4gICAgfVxuXG4gICAgaWYgKCFtZXNzYWdlLmlzTm9ybWFsQnViYmxlKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBnZXRQcm9wcyA9ICgpID0+ICh7XG4gICAgICAuLi5tZXNzYWdlLmdldFByb3BzRm9yTWVzc2FnZURldGFpbChcbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWRPclRocm93KClcbiAgICAgICksXG4gICAgICAuLi50aGlzLmdldE1lc3NhZ2VBY3Rpb25zKCksXG4gICAgfSk7XG5cbiAgICBjb25zdCBvbkNsb3NlID0gKCkgPT4ge1xuICAgICAgdGhpcy5zdG9wTGlzdGVuaW5nKG1lc3NhZ2UsICdjaGFuZ2UnLCB1cGRhdGUpO1xuICAgICAgdGhpcy5yZXNldFBhbmVsKCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdwYW5lbCBtZXNzYWdlLWRldGFpbC13cmFwcGVyJyxcbiAgICAgIEpTWDogd2luZG93LlNpZ25hbC5TdGF0ZS5Sb290cy5jcmVhdGVNZXNzYWdlRGV0YWlsKFxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAgZ2V0UHJvcHMoKVxuICAgICAgKSxcbiAgICAgIG9uQ2xvc2UsXG4gICAgfSk7XG5cbiAgICBjb25zdCB1cGRhdGUgPSAoKSA9PlxuICAgICAgdmlldy51cGRhdGUoXG4gICAgICAgIHdpbmRvdy5TaWduYWwuU3RhdGUuUm9vdHMuY3JlYXRlTWVzc2FnZURldGFpbChcbiAgICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSxcbiAgICAgICAgICBnZXRQcm9wcygpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgdGhpcy5saXN0ZW5UbyhtZXNzYWdlLCAnY2hhbmdlJywgdXBkYXRlKTtcbiAgICB0aGlzLmxpc3RlblRvKG1lc3NhZ2UsICdleHBpcmVkJywgb25DbG9zZSk7XG4gICAgLy8gV2UgY291bGQgbGlzdGVuIHRvIGFsbCBpbnZvbHZlZCBjb250YWN0cywgYnV0IHdlJ2xsIGNhbGwgdGhhdCBvdmVya2lsbFxuXG4gICAgdGhpcy5hZGRQYW5lbCh7IHZpZXcgfSk7XG4gICAgdmlldy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNob3dTdGlja2VyTWFuYWdlcigpOiB2b2lkIHtcbiAgICBjb25zdCB2aWV3ID0gbmV3IFJlYWN0V3JhcHBlclZpZXcoe1xuICAgICAgY2xhc3NOYW1lOiBbJ3N0aWNrZXItbWFuYWdlci13cmFwcGVyJywgJ3BhbmVsJ10uam9pbignICcpLFxuICAgICAgSlNYOiB3aW5kb3cuU2lnbmFsLlN0YXRlLlJvb3RzLmNyZWF0ZVN0aWNrZXJNYW5hZ2VyKHdpbmRvdy5yZWR1eFN0b3JlKSxcbiAgICAgIG9uQ2xvc2U6ICgpID0+IHtcbiAgICAgICAgdGhpcy5yZXNldFBhbmVsKCk7XG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgdGhpcy5hZGRQYW5lbCh7IHZpZXcgfSk7XG4gICAgdmlldy5yZW5kZXIoKTtcbiAgfVxuXG4gIHNob3dDb250YWN0RGV0YWlsKHtcbiAgICBjb250YWN0LFxuICAgIHNpZ25hbEFjY291bnQsXG4gIH06IHtcbiAgICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlO1xuICAgIHNpZ25hbEFjY291bnQ/OiB7XG4gICAgICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICAgICAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gICAgfTtcbiAgfSk6IHZvaWQge1xuICAgIGNvbnN0IHZpZXcgPSBuZXcgUmVhY3RXcmFwcGVyVmlldyh7XG4gICAgICBjbGFzc05hbWU6ICdjb250YWN0LWRldGFpbC1wYW5lIHBhbmVsJyxcbiAgICAgIEpTWDogKFxuICAgICAgICA8Q29udGFjdERldGFpbFxuICAgICAgICAgIGkxOG49e3dpbmRvdy5pMThufVxuICAgICAgICAgIGNvbnRhY3Q9e2NvbnRhY3R9XG4gICAgICAgICAgaGFzU2lnbmFsQWNjb3VudD17Qm9vbGVhbihzaWduYWxBY2NvdW50KX1cbiAgICAgICAgICBvblNlbmRNZXNzYWdlPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAoc2lnbmFsQWNjb3VudCkge1xuICAgICAgICAgICAgICB0aGlzLnN0YXJ0Q29udmVyc2F0aW9uKFxuICAgICAgICAgICAgICAgIHNpZ25hbEFjY291bnQucGhvbmVOdW1iZXIsXG4gICAgICAgICAgICAgICAgc2lnbmFsQWNjb3VudC51dWlkXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgICksXG4gICAgICBvbkNsb3NlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMucmVzZXRQYW5lbCgpO1xuICAgICAgfSxcbiAgICB9KTtcblxuICAgIHRoaXMuYWRkUGFuZWwoeyB2aWV3IH0pO1xuICB9XG5cbiAgc3RhcnRDb252ZXJzYXRpb24oZTE2NDogc3RyaW5nLCB1dWlkOiBVVUlEU3RyaW5nVHlwZSk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICBlMTY0LFxuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGBzdGFydENvbnZlcnNhdGlvbiBmYWlsZWQgZ2l2ZW4gJHtlMTY0fS8ke3V1aWR9IGNvbWJpbmF0aW9uYFxuICAgICk7XG5cbiAgICB0aGlzLm9wZW5Db252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQpO1xuICB9XG5cbiAgYXN5bmMgb3BlbkNvbnZlcnNhdGlvbihcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIG1lc3NhZ2VJZD86IHN0cmluZ1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcihcbiAgICAgICdzaG93Q29udmVyc2F0aW9uJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbWVzc2FnZUlkXG4gICAgKTtcbiAgfVxuXG4gIGFkZFBhbmVsKHBhbmVsOiBQYW5lbFR5cGUpOiB2b2lkIHtcbiAgICB0aGlzLnBhbmVscyA9IHRoaXMucGFuZWxzIHx8IFtdO1xuXG4gICAgaWYgKHRoaXMucGFuZWxzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgdGhpcy5wcmV2aW91c0ZvY3VzID0gZG9jdW1lbnQuYWN0aXZlRWxlbWVudCBhcyBIVE1MRWxlbWVudDtcbiAgICB9XG5cbiAgICB0aGlzLnBhbmVscy51bnNoaWZ0KHBhbmVsKTtcbiAgICBwYW5lbC52aWV3LiRlbC5pbnNlcnRBZnRlcih0aGlzLiQoJy5wYW5lbCcpLmxhc3QoKSk7XG4gICAgcGFuZWwudmlldy4kZWwub25lKCdhbmltYXRpb25lbmQnLCAoKSA9PiB7XG4gICAgICBwYW5lbC52aWV3LiRlbC5hZGRDbGFzcygncGFuZWwtLXN0YXRpYycpO1xuICAgIH0pO1xuXG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFNlbGVjdGVkQ29udmVyc2F0aW9uUGFuZWxEZXB0aChcbiAgICAgIHRoaXMucGFuZWxzLmxlbmd0aFxuICAgICk7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFNlbGVjdGVkQ29udmVyc2F0aW9uSGVhZGVyVGl0bGUoXG4gICAgICBwYW5lbC5oZWFkZXJUaXRsZVxuICAgICk7XG4gIH1cbiAgcmVzZXRQYW5lbCgpOiB2b2lkIHtcbiAgICBpZiAoIXRoaXMucGFuZWxzIHx8ICF0aGlzLnBhbmVscy5sZW5ndGgpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwYW5lbCA9IHRoaXMucGFuZWxzLnNoaWZ0KCk7XG5cbiAgICBpZiAoXG4gICAgICB0aGlzLnBhbmVscy5sZW5ndGggPT09IDAgJiZcbiAgICAgIHRoaXMucHJldmlvdXNGb2N1cyAmJlxuICAgICAgdGhpcy5wcmV2aW91c0ZvY3VzLmZvY3VzXG4gICAgKSB7XG4gICAgICB0aGlzLnByZXZpb3VzRm9jdXMuZm9jdXMoKTtcbiAgICAgIHRoaXMucHJldmlvdXNGb2N1cyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5wYW5lbHMubGVuZ3RoID4gMCkge1xuICAgICAgdGhpcy5wYW5lbHNbMF0udmlldy4kZWwuZmFkZUluKDI1MCk7XG4gICAgfVxuXG4gICAgaWYgKHBhbmVsKSB7XG4gICAgICBwYW5lbC52aWV3LiRlbC5hZGRDbGFzcygncGFuZWwtLXJlbW92ZScpLm9uZSgndHJhbnNpdGlvbmVuZCcsICgpID0+IHtcbiAgICAgICAgcGFuZWwudmlldy5yZW1vdmUoKTtcblxuICAgICAgICBpZiAodGhpcy5wYW5lbHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgLy8gTWFrZSBzdXJlIHBvcHBlcnMgYXJlIHBvc2l0aW9uZWQgcHJvcGVybHlcbiAgICAgICAgICB3aW5kb3cuZGlzcGF0Y2hFdmVudChuZXcgRXZlbnQoJ3Jlc2l6ZScpKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFNlbGVjdGVkQ29udmVyc2F0aW9uUGFuZWxEZXB0aChcbiAgICAgIHRoaXMucGFuZWxzLmxlbmd0aFxuICAgICk7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLnNldFNlbGVjdGVkQ29udmVyc2F0aW9uSGVhZGVyVGl0bGUoXG4gICAgICB0aGlzLnBhbmVsc1swXT8uaGVhZGVyVGl0bGVcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgbG9hZFJlY2VudE1lZGlhSXRlbXMobGltaXQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbW9kZWwgfTogeyBtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwgfSA9IHRoaXM7XG5cbiAgICBjb25zdCBtZXNzYWdlczogQXJyYXk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cyhtb2RlbC5pZCwge1xuICAgICAgICBsaW1pdCxcbiAgICAgIH0pO1xuXG4gICAgY29uc3QgbG9hZGVkUmVjZW50TWVkaWFJdGVtcyA9IG1lc3NhZ2VzXG4gICAgICAuZmlsdGVyKG1lc3NhZ2UgPT4gbWVzc2FnZS5hdHRhY2htZW50cyAhPT0gdW5kZWZpbmVkKVxuICAgICAgLnJlZHVjZShcbiAgICAgICAgKGFjYywgbWVzc2FnZSkgPT4gW1xuICAgICAgICAgIC4uLmFjYyxcbiAgICAgICAgICAuLi4obWVzc2FnZS5hdHRhY2htZW50cyB8fCBbXSkubWFwKFxuICAgICAgICAgICAgKGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlLCBpbmRleDogbnVtYmVyKTogTWVkaWFJdGVtVHlwZSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHsgdGh1bWJuYWlsIH0gPSBhdHRhY2htZW50O1xuXG4gICAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgICAgb2JqZWN0VVJMOiBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKGF0dGFjaG1lbnQucGF0aCB8fCAnJyksXG4gICAgICAgICAgICAgICAgdGh1bWJuYWlsT2JqZWN0VXJsOiB0aHVtYm5haWw/LnBhdGhcbiAgICAgICAgICAgICAgICAgID8gZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCh0aHVtYm5haWwucGF0aClcbiAgICAgICAgICAgICAgICAgIDogJycsXG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6IGF0dGFjaG1lbnQuY29udGVudFR5cGUsXG4gICAgICAgICAgICAgICAgaW5kZXgsXG4gICAgICAgICAgICAgICAgYXR0YWNobWVudCxcbiAgICAgICAgICAgICAgICBtZXNzYWdlOiB7XG4gICAgICAgICAgICAgICAgICBhdHRhY2htZW50czogbWVzc2FnZS5hdHRhY2htZW50cyB8fCBbXSxcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOlxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQobWVzc2FnZS5zb3VyY2VVdWlkKT8uaWQgfHxcbiAgICAgICAgICAgICAgICAgICAgbWVzc2FnZS5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlLmlkLFxuICAgICAgICAgICAgICAgICAgcmVjZWl2ZWRfYXQ6IG1lc3NhZ2UucmVjZWl2ZWRfYXQsXG4gICAgICAgICAgICAgICAgICByZWNlaXZlZF9hdF9tczogTnVtYmVyKG1lc3NhZ2UucmVjZWl2ZWRfYXRfbXMpLFxuICAgICAgICAgICAgICAgICAgc2VudF9hdDogbWVzc2FnZS5zZW50X2F0LFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH07XG4gICAgICAgICAgICB9XG4gICAgICAgICAgKSxcbiAgICAgICAgXSxcbiAgICAgICAgW10gYXMgQXJyYXk8TWVkaWFJdGVtVHlwZT5cbiAgICAgICk7XG5cbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMuc2V0UmVjZW50TWVkaWFJdGVtcyhcbiAgICAgIG1vZGVsLmlkLFxuICAgICAgbG9hZGVkUmVjZW50TWVkaWFJdGVtc1xuICAgICk7XG4gIH1cblxuICBhc3luYyBzZXREaXNhcHBlYXJpbmdNZXNzYWdlcyhzZWNvbmRzOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1vZGVsIH06IHsgbW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgdmFsdWVUb1NldCA9IHNlY29uZHMgPiAwID8gc2Vjb25kcyA6IHVuZGVmaW5lZDtcblxuICAgIGF3YWl0IHRoaXMubG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICBuYW1lOiAndXBkYXRlRXhwaXJhdGlvblRpbWVyJyxcbiAgICAgIHRhc2s6IGFzeW5jICgpID0+XG4gICAgICAgIG1vZGVsLnVwZGF0ZUV4cGlyYXRpb25UaW1lcih2YWx1ZVRvU2V0LCB7XG4gICAgICAgICAgcmVhc29uOiAnc2V0RGlzYXBwZWFyaW5nTWVzc2FnZXMnLFxuICAgICAgICB9KSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNldEFjY2Vzc0NvbnRyb2xBdHRyaWJ1dGVzU2V0dGluZyh2YWx1ZTogbnVtYmVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBtb2RlbCB9OiB7IG1vZGVsOiBDb252ZXJzYXRpb25Nb2RlbCB9ID0gdGhpcztcblxuICAgIGF3YWl0IHRoaXMubG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICBuYW1lOiAndXBkYXRlQWNjZXNzQ29udHJvbEF0dHJpYnV0ZXMnLFxuICAgICAgdGFzazogYXN5bmMgKCkgPT4gbW9kZWwudXBkYXRlQWNjZXNzQ29udHJvbEF0dHJpYnV0ZXModmFsdWUpLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgc2V0QWNjZXNzQ29udHJvbE1lbWJlcnNTZXR0aW5nKHZhbHVlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1vZGVsIH06IHsgbW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsIH0gPSB0aGlzO1xuXG4gICAgYXdhaXQgdGhpcy5sb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgIG5hbWU6ICd1cGRhdGVBY2Nlc3NDb250cm9sTWVtYmVycycsXG4gICAgICB0YXNrOiBhc3luYyAoKSA9PiBtb2RlbC51cGRhdGVBY2Nlc3NDb250cm9sTWVtYmVycyh2YWx1ZSksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzZXRBbm5vdW5jZW1lbnRzT25seSh2YWx1ZTogYm9vbGVhbik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbW9kZWwgfTogeyBtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwgfSA9IHRoaXM7XG5cbiAgICBhd2FpdCB0aGlzLmxvbmdSdW5uaW5nVGFza1dyYXBwZXIoe1xuICAgICAgbmFtZTogJ3VwZGF0ZUFubm91bmNlbWVudHNPbmx5JyxcbiAgICAgIHRhc2s6IGFzeW5jICgpID0+IG1vZGVsLnVwZGF0ZUFubm91bmNlbWVudHNPbmx5KHZhbHVlKSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGRlc3Ryb3lNZXNzYWdlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1vZGVsIH06IHsgbW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsIH0gPSB0aGlzO1xuXG4gICAgd2luZG93LnNob3dDb25maXJtYXRpb25EaWFsb2coe1xuICAgICAgY29uZmlybVN0eWxlOiAnbmVnYXRpdmUnLFxuICAgICAgbWVzc2FnZTogd2luZG93LmkxOG4oJ2RlbGV0ZUNvbnZlcnNhdGlvbkNvbmZpcm1hdGlvbicpLFxuICAgICAgb2tUZXh0OiB3aW5kb3cuaTE4bignZGVsZXRlJyksXG4gICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgIHRoaXMubG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICAgICAgbmFtZTogJ2Rlc3Ryb3ltZXNzYWdlcycsXG4gICAgICAgICAgdGFzazogYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgbW9kZWwudHJpZ2dlcigndW5sb2FkJywgJ2RlbGV0ZSBtZXNzYWdlcycpO1xuICAgICAgICAgICAgYXdhaXQgbW9kZWwuZGVzdHJveU1lc3NhZ2VzKCk7XG4gICAgICAgICAgICBtb2RlbC51cGRhdGVMYXN0TWVzc2FnZSgpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSxcbiAgICAgIHJlamVjdDogKCkgPT4ge1xuICAgICAgICBsb2cuaW5mbygnZGVzdHJveU1lc3NhZ2VzOiBVc2VyIGNhbmNlbGVkIGRlbGV0ZScpO1xuICAgICAgfSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGlzQ2FsbFNhZmUoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgY29udGFjdHMgPSBhd2FpdCB0aGlzLmdldFVudHJ1c3RlZENvbnRhY3RzKCk7XG4gICAgaWYgKGNvbnRhY3RzICYmIGNvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgY29uc3QgY2FsbEFueXdheSA9IGF3YWl0IHRoaXMuc2hvd1NlbmRBbnl3YXlEaWFsb2coXG4gICAgICAgIGNvbnRhY3RzLm1vZGVscyxcbiAgICAgICAgd2luZG93LmkxOG4oJ2NhbGxBbnl3YXknKVxuICAgICAgKTtcbiAgICAgIGlmICghY2FsbEFueXdheSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnU2FmZXR5IG51bWJlciBjaGFuZ2UgZGlhbG9nIG5vdCBhY2NlcHRlZCwgbmV3IGNhbGwgbm90IGFsbG93ZWQuJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBzaG93U2VuZEFueXdheURpYWxvZyhcbiAgICBjb250YWN0czogQXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+LFxuICAgIGNvbmZpcm1UZXh0Pzogc3RyaW5nXG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHNob3dTYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2coe1xuICAgICAgICBjb25maXJtVGV4dCxcbiAgICAgICAgY29udGFjdHMsXG4gICAgICAgIHJlamVjdDogKCkgPT4ge1xuICAgICAgICAgIHJlc29sdmUoZmFsc2UpO1xuICAgICAgICB9LFxuICAgICAgICByZXNvbHZlOiAoKSA9PiB7XG4gICAgICAgICAgcmVzb2x2ZSh0cnVlKTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgc2VuZFN0aWNrZXJNZXNzYWdlKG9wdGlvbnM6IHtcbiAgICBwYWNrSWQ6IHN0cmluZztcbiAgICBzdGlja2VySWQ6IG51bWJlcjtcbiAgICBmb3JjZT86IGJvb2xlYW47XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1vZGVsIH06IHsgbW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsIH0gPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IGNvbnRhY3RzID0gYXdhaXQgdGhpcy5nZXRVbnRydXN0ZWRDb250YWN0cyhvcHRpb25zKTtcblxuICAgICAgaWYgKGNvbnRhY3RzICYmIGNvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzZW5kQW55d2F5ID0gYXdhaXQgdGhpcy5zaG93U2VuZEFueXdheURpYWxvZyhjb250YWN0cy5tb2RlbHMpO1xuICAgICAgICBpZiAoc2VuZEFueXdheSkge1xuICAgICAgICAgIHRoaXMuc2VuZFN0aWNrZXJNZXNzYWdlKHsgLi4ub3B0aW9ucywgZm9yY2U6IHRydWUgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmICh0aGlzLnNob3dJbnZhbGlkTWVzc2FnZVRvYXN0KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB7IHBhY2tJZCwgc3RpY2tlcklkIH0gPSBvcHRpb25zO1xuICAgICAgbW9kZWwuc2VuZFN0aWNrZXJNZXNzYWdlKHBhY2tJZCwgc3RpY2tlcklkKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKCdjbGlja1NlbmQgZXJyb3I6JywgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBnZXRVbnRydXN0ZWRDb250YWN0cyhcbiAgICBvcHRpb25zOiB7IGZvcmNlPzogYm9vbGVhbiB9ID0ge31cbiAgKTogUHJvbWlzZTxudWxsIHwgQ29udmVyc2F0aW9uTW9kZWxDb2xsZWN0aW9uVHlwZT4ge1xuICAgIGNvbnN0IHsgbW9kZWwgfTogeyBtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwgfSA9IHRoaXM7XG5cbiAgICAvLyBUaGlzIHdpbGwgZ28gdG8gdGhlIHRydXN0IHN0b3JlIGZvciB0aGUgbGF0ZXN0IGlkZW50aXR5IGtleSBpbmZvcm1hdGlvbixcbiAgICAvLyAgIGFuZCBtYXkgcmVzdWx0IGluIHRoZSBkaXNwbGF5IG9mIGEgbmV3IGJhbm5lciBmb3IgdGhpcyBjb252ZXJzYXRpb24uXG4gICAgYXdhaXQgbW9kZWwudXBkYXRlVmVyaWZpZWQoKTtcbiAgICBjb25zdCB1bnZlcmlmaWVkQ29udGFjdHMgPSBtb2RlbC5nZXRVbnZlcmlmaWVkKCk7XG5cbiAgICBpZiAob3B0aW9ucy5mb3JjZSkge1xuICAgICAgaWYgKHVudmVyaWZpZWRDb250YWN0cy5sZW5ndGgpIHtcbiAgICAgICAgYXdhaXQgbWFya0FsbEFzVmVyaWZpZWREZWZhdWx0KHVudmVyaWZpZWRDb250YWN0cy5tb2RlbHMpO1xuICAgICAgICAvLyBXZSBvbmx5IHdhbnQgZm9yY2UgdG8gYnJlYWsgdXMgdGhyb3VnaCBvbmUgbGF5ZXIgb2YgY2hlY2tzXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBvcHRpb25zLmZvcmNlID0gZmFsc2U7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmICh1bnZlcmlmaWVkQ29udGFjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW52ZXJpZmllZENvbnRhY3RzO1xuICAgIH1cblxuICAgIGNvbnN0IHVudHJ1c3RlZENvbnRhY3RzID0gbW9kZWwuZ2V0VW50cnVzdGVkKCk7XG5cbiAgICBpZiAob3B0aW9ucy5mb3JjZSkge1xuICAgICAgaWYgKHVudHJ1c3RlZENvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgICBhd2FpdCBtYXJrQWxsQXNBcHByb3ZlZCh1bnRydXN0ZWRDb250YWN0cy5tb2RlbHMpO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAodW50cnVzdGVkQ29udGFjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW50cnVzdGVkQ29udGFjdHM7XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH1cblxuICBhc3luYyBzZXRRdW90ZU1lc3NhZ2UobWVzc2FnZUlkOiBudWxsIHwgc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBtb2RlbCB9ID0gdGhpcztcbiAgICBjb25zdCBtZXNzYWdlID0gbWVzc2FnZUlkID8gYXdhaXQgZ2V0TWVzc2FnZUJ5SWQobWVzc2FnZUlkKSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChcbiAgICAgIG1lc3NhZ2UgJiZcbiAgICAgICFjYW5SZXBseShcbiAgICAgICAgbWVzc2FnZS5hdHRyaWJ1dGVzLFxuICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3coKSxcbiAgICAgICAgZmluZEFuZEZvcm1hdENvbnRhY3RcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZSAmJiAhbWVzc2FnZS5pc05vcm1hbEJ1YmJsZSgpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5xdW90ZSA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLnF1b3RlZE1lc3NhZ2UgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBleGlzdGluZyA9IG1vZGVsLmdldCgncXVvdGVkTWVzc2FnZUlkJyk7XG4gICAgaWYgKGV4aXN0aW5nICE9PSBtZXNzYWdlSWQpIHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBsZXQgYWN0aXZlX2F0ID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZV9hdCcpO1xuICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubW9kZWwuZ2V0KCd0aW1lc3RhbXAnKTtcblxuICAgICAgaWYgKCFhY3RpdmVfYXQgJiYgbWVzc2FnZUlkKSB7XG4gICAgICAgIGFjdGl2ZV9hdCA9IG5vdztcbiAgICAgICAgdGltZXN0YW1wID0gbm93O1xuICAgICAgfVxuXG4gICAgICB0aGlzLm1vZGVsLnNldCh7XG4gICAgICAgIGFjdGl2ZV9hdCxcbiAgICAgICAgZHJhZnRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBxdW90ZWRNZXNzYWdlSWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHRoaXMuc2F2ZU1vZGVsKCk7XG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2UpIHtcbiAgICAgIHRoaXMucXVvdGVkTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICB0aGlzLnF1b3RlID0gYXdhaXQgbW9kZWwubWFrZVF1b3RlKHRoaXMucXVvdGVkTWVzc2FnZSk7XG5cbiAgICAgIHRoaXMuZW5hYmxlTWVzc2FnZUZpZWxkKCk7XG4gICAgICB0aGlzLmZvY3VzTWVzc2FnZUZpZWxkKCk7XG4gICAgfVxuXG4gICAgdGhpcy5yZW5kZXJRdW90ZWRNZXNzYWdlKCk7XG4gIH1cblxuICByZW5kZXJRdW90ZWRNZXNzYWdlKCk6IHZvaWQge1xuICAgIGNvbnN0IHsgbW9kZWwgfTogeyBtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwgfSA9IHRoaXM7XG5cbiAgICBpZiAoIXRoaXMucXVvdGVkTWVzc2FnZSkge1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb21wb3Nlci5zZXRRdW90ZWRNZXNzYWdlKHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb21wb3Nlci5zZXRRdW90ZWRNZXNzYWdlKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBtb2RlbC5pZCxcbiAgICAgIHF1b3RlOiB0aGlzLnF1b3RlLFxuICAgIH0pO1xuICB9XG5cbiAgc2hvd0ludmFsaWRNZXNzYWdlVG9hc3QobWVzc2FnZVRleHQ/OiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IG1vZGVsIH06IHsgbW9kZWw6IENvbnZlcnNhdGlvbk1vZGVsIH0gPSB0aGlzO1xuXG4gICAgbGV0IHRvYXN0VmlldzpcbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgICB8IHR5cGVvZiBUb2FzdEJsb2NrZWRcbiAgICAgIHwgdHlwZW9mIFRvYXN0QmxvY2tlZEdyb3VwXG4gICAgICB8IHR5cGVvZiBUb2FzdEV4cGlyZWRcbiAgICAgIHwgdHlwZW9mIFRvYXN0SW52YWxpZENvbnZlcnNhdGlvblxuICAgICAgfCB0eXBlb2YgVG9hc3RMZWZ0R3JvdXBcbiAgICAgIHwgdHlwZW9mIFRvYXN0TWVzc2FnZUJvZHlUb29Mb25nO1xuXG4gICAgaWYgKHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCkuZXhwaXJhdGlvbi5oYXNFeHBpcmVkKSB7XG4gICAgICB0b2FzdFZpZXcgPSBUb2FzdEV4cGlyZWQ7XG4gICAgfVxuICAgIGlmICghbW9kZWwuaXNWYWxpZCgpKSB7XG4gICAgICB0b2FzdFZpZXcgPSBUb2FzdEludmFsaWRDb252ZXJzYXRpb247XG4gICAgfVxuXG4gICAgY29uc3QgZTE2NCA9IHRoaXMubW9kZWwuZ2V0KCdlMTY0Jyk7XG4gICAgY29uc3QgdXVpZCA9IHRoaXMubW9kZWwuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKFxuICAgICAgaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5tb2RlbC5hdHRyaWJ1dGVzKSAmJlxuICAgICAgKChlMTY0ICYmIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuaXNCbG9ja2VkKGUxNjQpKSB8fFxuICAgICAgICAodXVpZCAmJiB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmlzVXVpZEJsb2NrZWQodXVpZCkpKVxuICAgICkge1xuICAgICAgdG9hc3RWaWV3ID0gVG9hc3RCbG9ja2VkO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLm1vZGVsLmdldCgnZ3JvdXBJZCcpO1xuICAgIGlmIChcbiAgICAgICFpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLm1vZGVsLmF0dHJpYnV0ZXMpICYmXG4gICAgICBncm91cElkICYmXG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmlzR3JvdXBCbG9ja2VkKGdyb3VwSWQpXG4gICAgKSB7XG4gICAgICB0b2FzdFZpZXcgPSBUb2FzdEJsb2NrZWRHcm91cDtcbiAgICB9XG5cbiAgICBpZiAoIWlzRGlyZWN0Q29udmVyc2F0aW9uKG1vZGVsLmF0dHJpYnV0ZXMpICYmIG1vZGVsLmdldCgnbGVmdCcpKSB7XG4gICAgICB0b2FzdFZpZXcgPSBUb2FzdExlZnRHcm91cDtcbiAgICB9XG4gICAgaWYgKG1lc3NhZ2VUZXh0ICYmIG1lc3NhZ2VUZXh0Lmxlbmd0aCA+IE1BWF9NRVNTQUdFX0JPRFlfTEVOR1RIKSB7XG4gICAgICB0b2FzdFZpZXcgPSBUb2FzdE1lc3NhZ2VCb2R5VG9vTG9uZztcbiAgICB9XG5cbiAgICBpZiAodG9hc3RWaWV3KSB7XG4gICAgICBzaG93VG9hc3QodG9hc3RWaWV3KTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRNZXNzYWdlKFxuICAgIG1lc3NhZ2UgPSAnJyxcbiAgICBtZW50aW9uczogQm9keVJhbmdlc1R5cGUgPSBbXSxcbiAgICBvcHRpb25zOiB7XG4gICAgICBkcmFmdEF0dGFjaG1lbnRzPzogUmVhZG9ubHlBcnJheTxBdHRhY2htZW50VHlwZT47XG4gICAgICBmb3JjZT86IGJvb2xlYW47XG4gICAgICB0aW1lc3RhbXA/OiBudW1iZXI7XG4gICAgICB2b2ljZU5vdGVBdHRhY2htZW50PzogQXR0YWNobWVudFR5cGU7XG4gICAgfSA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbW9kZWwgfTogeyBtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwgfSA9IHRoaXM7XG4gICAgY29uc3QgdGltZXN0YW1wID0gb3B0aW9ucy50aW1lc3RhbXAgfHwgRGF0ZS5ub3coKTtcblxuICAgIHRoaXMuc2VuZFN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIHRyeSB7XG4gICAgICB0aGlzLmRpc2FibGVNZXNzYWdlRmllbGQoKTtcbiAgICAgIGNvbnN0IGNvbnRhY3RzID0gYXdhaXQgdGhpcy5nZXRVbnRydXN0ZWRDb250YWN0cyhvcHRpb25zKTtcblxuICAgICAgaWYgKGNvbnRhY3RzICYmIGNvbnRhY3RzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBzZW5kQW55d2F5ID0gYXdhaXQgdGhpcy5zaG93U2VuZEFueXdheURpYWxvZyhjb250YWN0cy5tb2RlbHMpO1xuICAgICAgICBpZiAoc2VuZEFueXdheSkge1xuICAgICAgICAgIHRoaXMuc2VuZE1lc3NhZ2UobWVzc2FnZSwgbWVudGlvbnMsIHsgZm9yY2U6IHRydWUsIHRpbWVzdGFtcCB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLmVuYWJsZU1lc3NhZ2VGaWVsZCgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHRoaXMuZW5hYmxlTWVzc2FnZUZpZWxkKCk7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdzZW5kTWVzc2FnZSBlcnJvcjonLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbW9kZWwuY2xlYXJUeXBpbmdUaW1lcnMoKTtcblxuICAgIGlmICh0aGlzLnNob3dJbnZhbGlkTWVzc2FnZVRvYXN0KG1lc3NhZ2UpKSB7XG4gICAgICB0aGlzLmVuYWJsZU1lc3NhZ2VGaWVsZCgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAoXG4gICAgICAgICFtZXNzYWdlLmxlbmd0aCAmJlxuICAgICAgICAhdGhpcy5oYXNGaWxlcyh7IGluY2x1ZGVQZW5kaW5nOiBmYWxzZSB9KSAmJlxuICAgICAgICAhb3B0aW9ucy52b2ljZU5vdGVBdHRhY2htZW50XG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgYXR0YWNobWVudHM6IEFycmF5PEF0dGFjaG1lbnRUeXBlPiA9IFtdO1xuICAgICAgaWYgKG9wdGlvbnMudm9pY2VOb3RlQXR0YWNobWVudCkge1xuICAgICAgICBhdHRhY2htZW50cyA9IFtvcHRpb25zLnZvaWNlTm90ZUF0dGFjaG1lbnRdO1xuICAgICAgfSBlbHNlIGlmIChvcHRpb25zLmRyYWZ0QXR0YWNobWVudHMpIHtcbiAgICAgICAgYXR0YWNobWVudHMgPSAoXG4gICAgICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgICAgICBvcHRpb25zLmRyYWZ0QXR0YWNobWVudHMubWFwKHJlc29sdmVBdHRhY2htZW50RHJhZnREYXRhKVxuICAgICAgICAgIClcbiAgICAgICAgKS5maWx0ZXIoaXNOb3ROaWwpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZW5kSFFJbWFnZXMgPVxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZSAmJlxuICAgICAgICB3aW5kb3cucmVkdXhTdG9yZS5nZXRTdGF0ZSgpLmNvbXBvc2VyLnNob3VsZFNlbmRIaWdoUXVhbGl0eUF0dGFjaG1lbnRzO1xuICAgICAgY29uc3Qgc2VuZERlbHRhID0gRGF0ZS5ub3coKSAtIHRoaXMuc2VuZFN0YXJ0O1xuXG4gICAgICBsb2cuaW5mbygnU2VuZCBwcmUtY2hlY2tzIHRvb2snLCBzZW5kRGVsdGEsICdtaWxsaXNlY29uZHMnKTtcblxuICAgICAgbW9kZWwuZW5xdWV1ZU1lc3NhZ2VGb3JTZW5kKFxuICAgICAgICB7XG4gICAgICAgICAgYm9keTogbWVzc2FnZSxcbiAgICAgICAgICBhdHRhY2htZW50cyxcbiAgICAgICAgICBxdW90ZTogdGhpcy5xdW90ZSxcbiAgICAgICAgICBwcmV2aWV3OiBnZXRMaW5rUHJldmlld0ZvclNlbmQobWVzc2FnZSksXG4gICAgICAgICAgbWVudGlvbnMsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBzZW5kSFFJbWFnZXMsXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgIGV4dHJhUmVkdXhBY3Rpb25zOiAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLmNvbXBvc2l0aW9uQXBpLmN1cnJlbnQ/LnJlc2V0KCk7XG4gICAgICAgICAgICBtb2RlbC5zZXRNYXJrZWRVbnJlYWQoZmFsc2UpO1xuICAgICAgICAgICAgdGhpcy5zZXRRdW90ZU1lc3NhZ2UobnVsbCk7XG4gICAgICAgICAgICByZXNldExpbmtQcmV2aWV3KCk7XG4gICAgICAgICAgICB0aGlzLmNsZWFyQXR0YWNobWVudHMoKTtcbiAgICAgICAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29tcG9zZXIucmVzZXRDb21wb3NlcigpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ0Vycm9yIHB1bGxpbmcgYXR0YWNoZWQgZmlsZXMgYmVmb3JlIHNlbmQnLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIHRoaXMuZW5hYmxlTWVzc2FnZUZpZWxkKCk7XG4gICAgfVxuICB9XG5cbiAgb25FZGl0b3JTdGF0ZUNoYW5nZShcbiAgICBtZXNzYWdlVGV4dDogc3RyaW5nLFxuICAgIGJvZHlSYW5nZXM6IEFycmF5PEJvZHlSYW5nZVR5cGU+LFxuICAgIGNhcmV0TG9jYXRpb24/OiBudW1iZXJcbiAgKTogdm9pZCB7XG4gICAgdGhpcy5tYXliZUJ1bXBUeXBpbmcobWVzc2FnZVRleHQpO1xuICAgIHRoaXMuZGVib3VuY2VkU2F2ZURyYWZ0KG1lc3NhZ2VUZXh0LCBib2R5UmFuZ2VzKTtcblxuICAgIC8vIElmIHdlIGhhdmUgYXR0YWNobWVudHMsIGRvbid0IGFkZCBsaW5rIHByZXZpZXdcbiAgICBpZiAoIXRoaXMuaGFzRmlsZXMoeyBpbmNsdWRlUGVuZGluZzogdHJ1ZSB9KSkge1xuICAgICAgbWF5YmVHcmFiTGlua1ByZXZpZXcoXG4gICAgICAgIG1lc3NhZ2VUZXh0LFxuICAgICAgICBMaW5rUHJldmlld1NvdXJjZVR5cGUuQ29tcG9zZXIsXG4gICAgICAgIGNhcmV0TG9jYXRpb25cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2F2ZURyYWZ0KFxuICAgIG1lc3NhZ2VUZXh0OiBzdHJpbmcsXG4gICAgYm9keVJhbmdlczogQXJyYXk8Qm9keVJhbmdlVHlwZT5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBtb2RlbCB9OiB7IG1vZGVsOiBDb252ZXJzYXRpb25Nb2RlbCB9ID0gdGhpcztcblxuICAgIGNvbnN0IHRyaW1tZWQgPVxuICAgICAgbWVzc2FnZVRleHQgJiYgbWVzc2FnZVRleHQubGVuZ3RoID4gMCA/IG1lc3NhZ2VUZXh0LnRyaW0oKSA6ICcnO1xuXG4gICAgaWYgKG1vZGVsLmdldCgnZHJhZnQnKSAmJiAoIW1lc3NhZ2VUZXh0IHx8IHRyaW1tZWQubGVuZ3RoID09PSAwKSkge1xuICAgICAgdGhpcy5tb2RlbC5zZXQoe1xuICAgICAgICBkcmFmdDogbnVsbCxcbiAgICAgICAgZHJhZnRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICBkcmFmdEJvZHlSYW5nZXM6IFtdLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCB0aGlzLnNhdmVNb2RlbCgpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKG1lc3NhZ2VUZXh0ICE9PSBtb2RlbC5nZXQoJ2RyYWZ0JykpIHtcbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBsZXQgYWN0aXZlX2F0ID0gdGhpcy5tb2RlbC5nZXQoJ2FjdGl2ZV9hdCcpO1xuICAgICAgbGV0IHRpbWVzdGFtcCA9IHRoaXMubW9kZWwuZ2V0KCd0aW1lc3RhbXAnKTtcblxuICAgICAgaWYgKCFhY3RpdmVfYXQpIHtcbiAgICAgICAgYWN0aXZlX2F0ID0gbm93O1xuICAgICAgICB0aW1lc3RhbXAgPSBub3c7XG4gICAgICB9XG5cbiAgICAgIHRoaXMubW9kZWwuc2V0KHtcbiAgICAgICAgYWN0aXZlX2F0LFxuICAgICAgICBkcmFmdDogbWVzc2FnZVRleHQsXG4gICAgICAgIGRyYWZ0Qm9keVJhbmdlczogYm9keVJhbmdlcyxcbiAgICAgICAgZHJhZnRDaGFuZ2VkOiB0cnVlLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IHRoaXMuc2F2ZU1vZGVsKCk7XG4gICAgfVxuICB9XG5cbiAgLy8gQ2FsbGVkIHdoZW5ldmVyIHRoZSB1c2VyIGNoYW5nZXMgdGhlIG1lc3NhZ2UgY29tcG9zaXRpb24gZmllbGQuIEJ1dCBvbmx5XG4gIC8vICAgZmlyZXMgaWYgdGhlcmUncyBjb250ZW50IGluIHRoZSBtZXNzYWdlIGZpZWxkIGFmdGVyIHRoZSBjaGFuZ2UuXG4gIG1heWJlQnVtcFR5cGluZyhtZXNzYWdlVGV4dDogc3RyaW5nKTogdm9pZCB7XG4gICAgaWYgKG1lc3NhZ2VUZXh0Lmxlbmd0aCAmJiB0aGlzLm1vZGVsLnRocm90dGxlZEJ1bXBUeXBpbmcpIHtcbiAgICAgIHRoaXMubW9kZWwudGhyb3R0bGVkQnVtcFR5cGluZygpO1xuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb25WaWV3ID0gQ29udmVyc2F0aW9uVmlldztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxZQUF1QjtBQUN2QixvQkFBNEM7QUFDNUMsc0JBQXVCO0FBR3ZCLHdCQUFzQjtBQUN0QixpQkFBNEI7QUFDNUIsZUFBMEI7QUFhMUIsNEJBQStCO0FBQy9CLHFCQUE2QjtBQUM3QixvQkFBNkI7QUFDN0Isb0NBQXVDO0FBQ3ZDLDhCQUFpQztBQUNqQyxnQ0FBbUM7QUFFbkMsb0NBSU87QUFDUCxrQ0FBcUM7QUFDckMsb0JBQTBDO0FBQzFDLHFCQU1PO0FBQ1AsMkJBR087QUFDUCxxQkFBbUM7QUFDbkMsa0JBQXlCO0FBQ3pCLDhCQUFpQztBQUVqQywrQ0FBa0Q7QUFDbEQsMENBQTZDO0FBQzdDLFVBQXFCO0FBRXJCLG9DQUF1QztBQUN2QyxpQ0FBb0M7QUFFcEMsK0JBQTJCO0FBQzNCLHNCQUF1QztBQUN2QywwQkFBNkI7QUFDN0IsK0JBQWtDO0FBQ2xDLHVEQUEwRDtBQUMxRCx1Q0FBMEM7QUFDMUMsdUNBQTBDO0FBQzFDLDJDQUE4QztBQUM5Qyx5Q0FBNEM7QUFDNUMsb0NBQXVDO0FBQ3ZDLDBDQUE2QztBQUM3QywwQkFBNkI7QUFDN0IsNEJBQStCO0FBQy9CLDJCQUE4QjtBQUM5QixzQ0FBeUM7QUFDekMsNEJBQStCO0FBQy9CLGlDQUFvQztBQUNwQyxxQ0FBd0M7QUFDeEMscUNBQXdDO0FBQ3hDLDBDQUE2QztBQUM3QywwQ0FBNkM7QUFDN0MsaUNBQW9DO0FBQ3BDLHlDQUE0QztBQUM1QywyQ0FBOEM7QUFDOUMsMkNBQThDO0FBQzlDLHlDQUE0QztBQUM1QyxzQ0FBeUM7QUFDekMsbUNBQXNDO0FBQ3RDLCtCQUFrQztBQUNsQyxzQ0FBeUM7QUFDekMsOEJBQWlDO0FBQ2pDLHNCQUF5QjtBQUN6Qiw0QkFBMkI7QUFDM0Isa0NBQXFDO0FBQ3JDLHdDQUEyQztBQUMzQyx1QkFBMEI7QUFDMUIsOEJBQWlDO0FBQ2pDLG9DQUF1QztBQUN2QywyQkFBK0I7QUFDL0Isa0JBQXlCO0FBRXpCLG9DQUF1QztBQUN2QywyQkFBOEI7QUFDOUIsMEJBQTZCO0FBRTdCLHlCQU9PO0FBQ1AsMEJBQXNDO0FBQ3RDLDBCQUE0QztBQVM1QyxNQUFNLGVBQWUsTUFBTyxLQUFLO0FBRWpDLE1BQU0sRUFBRSxZQUFZLE9BQU8sT0FBTztBQUVsQyxNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLE9BQU87QUFFbEIsTUFBTSxFQUFFLHdCQUF3QixPQUFPLE9BQU87QUFrRTlDLE1BQU0sMEJBQTBCLEtBQUs7QUFFOUIsTUFBTSx5QkFBeUIsT0FBTyxTQUFTLEtBQXdCO0FBQUEsRUE4QjVFLGVBQWUsTUFBa0I7QUFDL0IsVUFBTSxHQUFHLElBQUk7QUF2QlAsMEJBRUosRUFBRSxTQUFTLE9BQVU7QUFnQmpCLGtCQUEyQixDQUFDO0FBT2xDLFNBQUsscUJBQXFCLDRCQUN4QixLQUFLLE1BQU0sZUFBZSxLQUFLLEtBQUssS0FBSyxHQUN6QyxHQUNGO0FBQ0EsU0FBSyxNQUFNLHVCQUNULEtBQUssTUFBTSx3QkFDWCw0QkFBUyxLQUFLLE1BQU0sWUFBWSxLQUFLLEtBQUssS0FBSyxHQUFHLFlBQVk7QUFFaEUsU0FBSyxxQkFBcUIsNEJBQVMsS0FBSyxVQUFVLEtBQUssSUFBSSxHQUFHLEdBQUc7QUFHakUsU0FBSyxTQUFTLEtBQUssT0FBTyxXQUFXLEtBQUssYUFBYTtBQUN2RCxTQUFLLFNBQVMsS0FBSyxPQUFPLGNBQWMsS0FBSyxrQkFBa0I7QUFHL0QsU0FBSyxTQUFTLEtBQUssT0FBTyxVQUFVLEtBQUssUUFBUTtBQUNqRCxTQUFLLFNBQVMsS0FBSyxPQUFPLHFCQUFxQixLQUFLLGVBQWU7QUFDbkUsU0FBSyxTQUFTLEtBQUssT0FBTyxVQUFVLENBQUMsV0FDbkMsS0FBSyxPQUFPLG1CQUFtQixRQUFRLENBQ3pDO0FBR0EsU0FBSyxTQUFTLEtBQUssT0FBTyxrQkFBa0IsS0FBSyxpQkFBaUI7QUFDbEUsU0FBSyxTQUFTLEtBQUssT0FBTyxrQkFBa0IsS0FBSyxZQUFZO0FBQzdELFNBQUssU0FBUyxLQUFLLE9BQU8sa0JBQWtCLEtBQUssVUFBVTtBQUMzRCxTQUFLLFNBQVMsS0FBSyxPQUFPLHdCQUF3QixLQUFLLGlCQUFpQjtBQUN4RSxTQUFLLFNBQVMsS0FBSyxPQUFPLHNCQUFzQixLQUFLLGdCQUFnQjtBQUNyRSxTQUFLLFNBQ0gsS0FBSyxPQUNMLGdCQUNBLENBQUMsY0FBa0M7QUFDakMsWUFBTSxTQUFTLEtBQUssU0FBUyxDQUFDLFlBQVksT0FBTztBQUNqRCxXQUFLLGdCQUFnQixNQUFNO0FBQUEsSUFDN0IsQ0FDRjtBQUNBLFNBQUssU0FDSCxLQUFLLE9BQ0wsbUJBQ0EsS0FBSyx5QkFDUDtBQUNBLFNBQUssU0FBUyxLQUFLLE9BQU8sa0JBQWtCLEtBQUssYUFBYTtBQUM5RCxTQUFLLFNBQVMsS0FBSyxPQUFPLHNCQUFzQixvQ0FBaUI7QUFDakUsU0FBSyxTQUNILEtBQUssT0FDTCxnQ0FDQSxLQUFLLGdCQUNQO0FBRUEsU0FBSyxPQUFPO0FBRVosU0FBSyxzQkFBc0I7QUFDM0IsU0FBSyxzQkFBc0I7QUFBQSxFQUM3QjtBQUFBLEVBRVMsU0FBaUM7QUFDeEMsV0FBTztBQUFBLE1BQ0wsTUFBTTtBQUFBLE1BQ04sT0FBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsRUFPQSxZQUFvQjtBQUNsQixXQUFPO0FBQUEsRUFDVDtBQUFBLEVBS0EsS0FBYTtBQUNYLFdBQU8sZ0JBQWdCLEtBQUssTUFBTTtBQUFBLEVBQ3BDO0FBQUEsRUFPQSxTQUEyQjtBQUN6QixVQUFNLFdBQVcsRUFBRSxlQUFlLEVBQUUsS0FBSztBQUN6QyxTQUFLLElBQUksS0FBSyw0QkFBTyxVQUFVLENBQUMsQ0FBQyxDQUFDO0FBQ2xDLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxrQkFBa0IsS0FBSyxHQUFTO0FBQzlCLFNBQUssTUFBTSxrQkFDVCxNQUFNLE9BQU8sbUJBQW1CLEtBQUssS0FBSyxJQUFJLElBQUksRUFDcEQ7QUFBQSxFQUNGO0FBQUEsRUFFQSxPQUFPLE9BQXNCO0FBQzNCLFFBQUksT0FBTztBQUNULFlBQU0sd0JBQXdCLE9BQU8sUUFBUSxJQUMzQyx5QkFDQSxJQUFJLE1BQWMsQ0FDcEI7QUFFQSxVQUFJLHNCQUFzQixVQUFVLEdBQUc7QUFDckMsd0NBQVUsZ0VBQTRCO0FBQ3RDO0FBQUEsTUFDRjtBQUNBLFdBQUssTUFBTSxJQUFJO0FBQUEsSUFDakIsT0FBTztBQUNMLFdBQUssTUFBTSxNQUFNO0FBQUEsSUFDbkI7QUFBQSxFQUNGO0FBQUEsRUFFQSx3QkFBOEI7QUFFNUIsVUFBTSwwQkFBMEI7QUFBQSxNQUM5QixJQUFJLEtBQUssTUFBTTtBQUFBLE1BRWYsMkJBQTJCLENBQUMsWUFDMUIsS0FBSyx3QkFBd0IsT0FBTztBQUFBLE1BQ3RDLGtCQUFrQixNQUFNLEtBQUssZ0JBQWdCO0FBQUEsTUFDN0Msd0JBQXdCLE1BQU07QUFDNUIsY0FBTSxFQUFFLHlCQUF5QixPQUFPLGFBQWE7QUFDckQsNkJBQXFCLEtBQUssTUFBTSxFQUFFO0FBQUEsTUFDcEM7QUFBQSxNQUNBLHdCQUF3QixLQUFLLGtCQUFrQixLQUFLLElBQUk7QUFBQSxNQUN4RCxVQUFVLEtBQUssT0FBTyxLQUFLLElBQUk7QUFBQSxNQUcvQixtQ0FDRSxLQUFLLGtDQUFrQyxLQUFLLElBQUk7QUFBQSxNQUNsRCxtQ0FDRSxLQUFLLGtDQUFrQyxLQUFLLElBQUk7QUFBQSxNQUVsRCwyQkFBMkIsTUFBTTtBQUMvQixhQUFLLHdCQUF3QjtBQUFBLE1BQy9CO0FBQUEsTUFDQSxnQkFBZ0IsTUFBTTtBQUNwQixhQUFLLGFBQWE7QUFBQSxNQUNwQjtBQUFBLE1BQ0Esb0JBQW9CLE1BQU07QUFDeEIsYUFBSyxlQUFlO0FBQUEsTUFDdEI7QUFBQSxNQUNBLFVBQVUsTUFBTTtBQUNkLGFBQUssV0FBVztBQUFBLE1BQ2xCO0FBQUEsTUFFQSxXQUFXLE1BQU07QUFDZixhQUFLLE1BQU0sWUFBWSxJQUFJO0FBQzNCLGFBQUssTUFBTSxRQUFRLFVBQVUsU0FBUztBQUV0Qyx3Q0FBVSw0REFBMkI7QUFBQSxVQUNuQyxNQUFNLE1BQU07QUFDVixpQkFBSyxNQUFNLFlBQVksS0FBSztBQUM1QixpQkFBSyxpQkFBaUIsS0FBSyxNQUFNLElBQUksSUFBSSxDQUFDO0FBQUEsVUFDNUM7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQSxjQUFjLE1BQU07QUFDbEIsYUFBSyxNQUFNLGdCQUFnQixJQUFJO0FBRS9CLHdDQUFVLGtFQUE2QjtBQUFBLE1BQ3pDO0FBQUEsTUFDQSxlQUFlLE1BQU07QUFDbkIsYUFBSyxNQUFNLFlBQVksS0FBSztBQUU1Qix3Q0FBVSw4REFBMkI7QUFBQSxNQUN2QztBQUFBLElBQ0Y7QUFDQSxXQUFPLGFBQWEsY0FBYyxtQ0FBbUM7QUFHckUsVUFBTSxxQkFBcUIsOEJBQU0sWUFBWSx1QkFBdUI7QUFFcEUsVUFBTSxpQkFBaUIsNkJBQU07QUFDM0IsWUFBTSxVQUNKO0FBQ0YsWUFBTSxTQUFTLE9BQU8sVUFBVTtBQUNoQyxZQUFNLGdCQUFnQixPQUFPLE9BQU8sS0FBSyxtQkFBbUIsTUFBTTtBQUNsRSxZQUFNLE1BQU0sUUFBUSxRQUFRLFVBQVUsYUFBYTtBQUVuRCw0REFBcUIsR0FBRztBQUFBLElBQzFCLEdBUnVCO0FBVXZCLFVBQU0sOEJBQThCLDZCQUFNO0FBQ3hDLDREQUNFLHNEQUNGO0FBQUEsSUFDRixHQUpvQztBQU1wQyxVQUFNLHdCQUF3Qiw4QkFDNUIsWUFJRztBQUNILFlBQU0sRUFBRSxVQUFVLFdBQVc7QUFFN0IsWUFBTSxpQkFBaUIsS0FBSyxNQUFNO0FBQ2xDLFlBQU0sV0FBVyxNQUFNLG9CQUFvQixNQUFNO0FBQ2pELFlBQU0sVUFBVSxTQUFTLEtBQUssVUFDNUIsUUFDRSxLQUFLLG1CQUFtQixrQkFDdEIsWUFDQSxpQ0FBYSxJQUFJLE1BQU0sUUFDM0IsQ0FDRjtBQUVBLFVBQUksQ0FBQyxTQUFTO0FBQ1osd0NBQVUsZ0VBQTRCO0FBQ3RDO0FBQUEsTUFDRjtBQUVBLFdBQUssZ0JBQWdCLFFBQVEsRUFBRTtBQUFBLElBQ2pDLEdBeEI4QjtBQTBCOUIsVUFBTSxrQkFBa0IsOEJBQU8sY0FBc0I7QUFDbkQsVUFBSSxDQUFDLE9BQU8sU0FBUyxHQUFHO0FBQ3RCO0FBQUEsTUFDRjtBQUVBLFlBQU0sYUFBYSx1Q0FBbUIsT0FBTyxXQUFXLFNBQVMsQ0FBQztBQUNsRSxVQUFJLGNBQWMsQ0FBQyxXQUFXLEtBQUs7QUFDakM7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLE1BQU0sMENBQWUsU0FBUztBQUM5QyxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUFNLDJDQUEyQyxXQUFXO0FBQUEsTUFDeEU7QUFFQSxZQUFNLEtBQUssTUFBTSxTQUFTLFFBQVEsSUFBSSxhQUFhLEdBQUc7QUFBQSxRQUNwRCxjQUFjLFFBQVEsSUFBSSxTQUFTO0FBQUEsUUFDbkMsa0JBQWtCO0FBQUEsTUFDcEIsQ0FBQztBQUFBLElBQ0gsR0FuQndCO0FBcUJ4QixVQUFNLHNDQUNKLHdCQUFDLE1BQWMsY0FDZixvQkFBa0I7QUFDaEIsWUFBTSxlQUFlLE9BQU8sdUJBQXVCLElBQUksY0FBYztBQUNyRSxVQUFJLENBQUMsY0FBYztBQUNqQixZQUFJLE1BQ0YsK0VBQStFLHFCQUNqRjtBQUNBO0FBQUEsTUFDRjtBQUNBLFdBQUssMkJBQTJCLE1BQU0sY0FBYyxTQUFTO0FBQUEsSUFDL0QsR0FWQTtBQVlGLFVBQU0sZ0JBQWdCO0FBQUEsTUFDcEIsSUFBSSxLQUFLLE1BQU07QUFBQSxTQUVaLEtBQUssa0JBQWtCO0FBQUEsTUFFMUIsc0NBQXNDLENBQ3BDLHdCQUNTO0FBQ1QsYUFBSyxNQUFNLHFDQUFxQyxtQkFBbUI7QUFBQSxNQUNyRTtBQUFBLE1BQ0Esd0JBQXdCLENBQUMsU0FBeUI7QUFDaEQsYUFBSyxNQUFNLHVCQUF1QixJQUFJO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsbUJBQW1CLEtBQUssTUFBTSxrQkFBa0IsS0FBSyxLQUFLLEtBQUs7QUFBQSxNQUMvRCxvQkFBb0IsS0FBSyxNQUFNLG1CQUFtQixLQUFLLEtBQUssS0FBSztBQUFBLE1BQ2pFLG1CQUFtQixLQUFLLE1BQU0sa0JBQWtCLEtBQUssS0FBSyxLQUFLO0FBQUEsTUFDL0Q7QUFBQSxNQUNBLFNBQVMsb0NBQ1AsV0FDQSxtQkFBbUIsS0FDckI7QUFBQSxNQUNBLHNCQUFzQixDQUFDLG1CQUEyQjtBQUNoRCxjQUFNLGVBQWUsT0FBTyx1QkFBdUIsSUFBSSxjQUFjO0FBQ3JFLFlBQUksQ0FBQyxjQUFjO0FBQ2pCLGNBQUksTUFDRixpRUFBaUUsZ0NBQ25FO0FBQ0E7QUFBQSxRQUNGO0FBQ0EsYUFBSyxtQkFBbUIsWUFBWTtBQUFBLE1BQ3RDO0FBQUEsTUFDQSxVQUFVLG9DQUNSLFlBQ0EsbUJBQW1CLE1BQ3JCO0FBQUEsTUFDQSxXQUFXLG9DQUNULGFBQ0EsbUJBQW1CLE1BQ3JCO0FBQUEsTUFDQSxjQUFjLENBQUMsbUJBQTJCO0FBQ3hDLGFBQUssdUJBQXVCO0FBQUEsVUFDMUIsTUFBTTtBQUFBLFVBQ04sTUFBTSxNQUFNLEtBQUssTUFBTSxrQkFBa0IsY0FBYztBQUFBLFFBQ3pELENBQUM7QUFBQSxNQUNIO0FBQUEsTUFDQTtBQUFBLE1BQ0EsY0FBYyxNQUFNO0FBQ2xCLGFBQUssTUFBTSxhQUFhO0FBQUEsTUFDMUI7QUFBQSxNQUNBLG9CQUFvQixNQUFNLEtBQUssTUFBTSw4QkFBOEI7QUFBQSxJQUNyRTtBQUdBLFdBQU8sYUFBYSxTQUFTLGNBQWM7QUFFM0MsVUFBTSx1QkFBdUI7QUFBQSxNQUMzQixJQUFJLEtBQUssTUFBTTtBQUFBLE1BQ2YsZ0JBQWdCLEtBQUs7QUFBQSxNQUNyQixnQkFBZ0IsTUFBTSxLQUFLLG1CQUFtQjtBQUFBLE1BQzlDLGVBQWUsQ0FBQyxRQUFnQixjQUM5QixLQUFLLG1CQUFtQixFQUFFLFFBQVEsVUFBVSxDQUFDO0FBQUEsTUFDL0MscUJBQXFCLENBQ25CLEtBQ0EsWUFDQSxrQkFDRyxLQUFLLG9CQUFvQixLQUFLLFlBQVksYUFBYTtBQUFBLE1BQzVELGVBQWUsTUFBTSxnQ0FBVSxzREFBdUI7QUFBQSxNQUN0RCxrQkFBa0IsTUFBTSxLQUFLLE1BQU0sSUFBSSxpQkFBaUI7QUFBQSxNQUN4RCxvQkFBb0IsTUFBTSxLQUFLLGdCQUFnQixJQUFJO0FBQUEsTUFDbkQsVUFBVSxNQUFNO0FBQ2QsYUFBSywyQkFDSCxZQUNBLEtBQUssT0FDTCxtQkFBbUIsTUFDckI7QUFBQSxNQUNGO0FBQUEsTUFDQSxTQUFTLE1BQU07QUFDYixhQUFLLDJCQUNILFdBQ0EsS0FBSyxPQUNMLG1CQUFtQixLQUNyQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLFdBQVcsTUFBTTtBQUNmLGFBQUssMkJBQ0gsYUFDQSxLQUFLLE9BQ0wsbUJBQW1CLE1BQ3JCO0FBQUEsTUFDRjtBQUFBLE1BQ0EsVUFBVSxNQUFNO0FBQ2QsYUFBSywyQkFDSCxZQUNBLEtBQUssT0FDTCxtQkFBbUIsTUFDckI7QUFBQSxNQUNGO0FBQUEsTUFDQSxzQkFBc0IsTUFBTTtBQUMxQixhQUFLLG1CQUFtQixLQUFLLEtBQUs7QUFBQSxNQUNwQztBQUFBLE1BQ0EsdUJBQXVCLE1BQU0sS0FBSyxvQkFBb0I7QUFBQSxNQUN0RCxxQkFBcUIsWUFBWTtBQUMvQixjQUFNLE9BQU8sdUJBQXVCO0FBQUEsVUFDbEMsU0FBUyxPQUFPLEtBQ2QscURBQ0Y7QUFBQSxVQUNBLFFBQVEsT0FBTyxLQUFLLDRDQUE0QztBQUFBLFVBQ2hFLFlBQVksT0FBTyxLQUFLLDJDQUEyQztBQUFBLFVBQ25FLFNBQVMsTUFBTTtBQUNiLGlCQUFLLHVCQUF1QjtBQUFBLGNBQzFCLE1BQU07QUFBQSxjQUNOLE1BQU0sWUFBWSxLQUFLLE1BQU0sa0JBQWtCO0FBQUEsWUFDakQsQ0FBQztBQUFBLFVBQ0g7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsTUFFQSxvQkFBb0IsS0FBSyxpQkFBaUIsS0FBSyxJQUFJO0FBQUEsTUFDbkQsc0JBQXNCLENBQUMsU0FBa0I7QUFDdkMsZUFBTyxhQUFhLFNBQVMsdUJBQXVCLElBQUk7QUFBQSxNQUMxRDtBQUFBLE1BRUEsMEJBQTBCLENBQUMsT0FBZSxLQUFLLGdCQUFnQixFQUFFO0FBQUEsTUFFakUsb0JBQW9CLE1BQU07QUFDeEIsb0RBQW9CO0FBQ3BCLGtEQUFrQjtBQUFBLE1BQ3BCO0FBQUEsTUFFQSxrQkFBa0IsS0FBSyxpQkFBaUIsS0FBSyxJQUFJO0FBQUEsTUFFakQsZUFBZSxDQUFDO0FBQUEsUUFDZDtBQUFBLFFBQ0EsV0FBVyxDQUFDO0FBQUEsUUFDWixVQUFVO0FBQUEsUUFDVjtBQUFBLFFBQ0E7QUFBQSxZQU9VO0FBQ1YsYUFBSyxZQUFZLFNBQVMsVUFBVTtBQUFBLFVBQ2xDO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUlBLFVBQU0sTUFBTSwwREFBdUIsT0FBTyxZQUFZO0FBQUEsTUFDcEQ7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVELFNBQUssbUJBQW1CLElBQUkseUNBQWlCLEVBQUUsSUFBSSxDQUFDO0FBQ3BELFNBQUssRUFBRSw2QkFBNkIsRUFBRSxPQUFPLEtBQUssaUJBQWlCLEVBQUU7QUFBQSxFQUN2RTtBQUFBLFFBRU0sb0NBQW1EO0FBQ3ZELFFBQUksS0FBSyxnRUFBZ0U7QUFFekUsUUFBSSxLQUFLLE1BQU0sSUFBSSxtQkFBbUIsS0FBSyxDQUFDLEtBQUssTUFBTSxXQUFXLEdBQUc7QUFDbkUsc0NBQVUsMERBQXlCO0FBQ25DO0FBQUEsSUFDRjtBQUVBLFFBQUksTUFBTSxLQUFLLFdBQVcsR0FBRztBQUMzQixVQUFJLEtBQ0YsdUVBQ0Y7QUFDQSxhQUFPLGFBQWEsUUFBUSxrQkFBa0I7QUFBQSxRQUM1QyxnQkFBZ0IsS0FBSyxNQUFNO0FBQUEsUUFDM0IsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUNELFVBQUksS0FBSyxxREFBcUQ7QUFBQSxJQUNoRSxPQUFPO0FBQ0wsVUFBSSxLQUNGLHNFQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLG9DQUFtRDtBQUN2RCxRQUFJLEtBQUssaUVBQWlFO0FBRTFFLFFBQUksTUFBTSxLQUFLLFdBQVcsR0FBRztBQUMzQixVQUFJLEtBQ0YsdUVBQ0Y7QUFDQSxhQUFPLGFBQWEsUUFBUSxrQkFBa0I7QUFBQSxRQUM1QyxnQkFBZ0IsS0FBSyxNQUFNO0FBQUEsUUFDM0IsYUFBYTtBQUFBLE1BQ2YsQ0FBQztBQUNELFVBQUksS0FBSyxxREFBcUQ7QUFBQSxJQUNoRSxPQUFPO0FBQ0wsVUFBSSxLQUNGLHNFQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLHVCQUEwQjtBQUFBLElBQzlCO0FBQUEsSUFDQTtBQUFBLEtBSWE7QUFDYixVQUFNLGVBQWUsS0FBSyxNQUFNLGFBQWE7QUFDN0MsV0FBTyxPQUFPLE9BQU8sS0FBSyx1QkFBdUI7QUFBQSxNQUMvQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsb0JBQXdDO0FBQ3RDLFVBQU0saUJBQWlCLDhCQUNyQixXQUNBLGFBQ0c7QUFDSCxZQUFNLEVBQUUsT0FBTyxXQUFXO0FBQzFCLFVBQUk7QUFDRixjQUFNLDBEQUF1QjtBQUFBLFVBQzNCO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNILFNBQVMsT0FBUDtBQUNBLFlBQUksTUFBTSwwQkFBMEIsT0FBTyxXQUFXLFFBQVE7QUFDOUQsd0NBQVUsOENBQW1CO0FBQUEsTUFDL0I7QUFBQSxJQUNGLEdBZnVCO0FBZ0J2QixVQUFNLGlCQUFpQix3QkFBQyxjQUFzQjtBQUM1QyxXQUFLLGdCQUFnQixTQUFTO0FBQUEsSUFDaEMsR0FGdUI7QUFHdkIsVUFBTSxZQUFZO0FBQ2xCLFVBQU0sZ0JBQWdCLHdCQUFDLGNBQXNCO0FBQzNDLFdBQUssY0FBYyxTQUFTO0FBQUEsSUFDOUIsR0FGc0I7QUFHdEIsVUFBTSwyQkFBMkIsd0JBQUMsY0FBc0I7QUFDdEQsV0FBSyx5QkFBeUIsU0FBUztBQUFBLElBQ3pDLEdBRmlDO0FBR2pDLFVBQU0sb0JBQW9CLHdCQUFDLGNBQXNCO0FBQy9DLFdBQUssa0JBQWtCLFNBQVM7QUFBQSxJQUNsQyxHQUYwQjtBQUcxQixVQUFNLG1CQUFtQix3QkFBQyxjQUFzQjtBQUM5QyxXQUFLLGlCQUFpQixTQUFTO0FBQUEsSUFDakMsR0FGeUI7QUFHekIsVUFBTSxtQkFBbUIsd0JBQUMsZ0JBQXdCLGNBQXVCO0FBQ3ZFLFdBQUssaUJBQWlCLGdCQUFnQixTQUFTO0FBQUEsSUFDakQsR0FGeUI7QUFHekIsVUFBTSxvQkFBb0Isd0JBQUMsWUFNckI7QUFDSixXQUFLLGtCQUFrQixPQUFPO0FBQUEsSUFDaEMsR0FSMEI7QUFTMUIsVUFBTSw0QkFBNEIsOEJBQ2hDLFlBQ0c7QUFDSCxZQUFNLFVBQVUsT0FBTyxrQkFBa0IsUUFBUSxRQUFRLFNBQVM7QUFDbEUsVUFBSSxDQUFDLFNBQVM7QUFDWixjQUFNLElBQUksTUFDUixzQ0FBc0MsUUFBUSxvQkFDaEQ7QUFBQSxNQUNGO0FBQ0EsWUFBTSxRQUFRLHlCQUF5QjtBQUFBLElBQ3pDLEdBVmtDO0FBV2xDLFVBQU0sNEJBQTRCLHdCQUFDLFlBQStCO0FBQ2hFLFlBQU0sVUFBVSxPQUFPLGtCQUFrQixRQUFRLFFBQVEsU0FBUztBQUNsRSxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUNSLHNDQUFzQyxRQUFRLG9CQUNoRDtBQUFBLE1BQ0Y7QUFDQSxjQUFRLDBCQUEwQixRQUFRLFVBQVU7QUFBQSxJQUN0RCxHQVJrQztBQVNsQyxVQUFNLGVBQWUsd0JBQUMsY0FBNEI7QUFDaEQsWUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUMxRCxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUFNLHlCQUF5QixvQkFBb0I7QUFBQSxNQUMvRDtBQUVBLFVBQUksUUFBUSxJQUFJLFlBQVksTUFBTSxvQ0FBVyxRQUFRO0FBQ25EO0FBQUEsTUFDRjtBQUVBLFlBQU0sYUFBYSxRQUFRLElBQUksUUFBUTtBQUN2QyxZQUFNLGFBQWEsUUFBUSxJQUFJLFlBQVk7QUFDM0MsWUFBTSxZQUFZLFFBQVEsSUFBSSxTQUFTO0FBRXZDLGNBQVEsSUFBSSxzQ0FBVyxRQUFRLFlBQVksS0FBSyxJQUFJLENBQUMsQ0FBQztBQUV0RCxVQUFJLCtCQUFXLFFBQVEsVUFBVSxHQUFHO0FBQ2xDLDZEQUF1QixJQUFJO0FBQUEsVUFDekIsZUFBZTtBQUFBLFlBQ2I7QUFBQSxZQUNBO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUVBLCtDQUFpQixJQUFJO0FBQUEsUUFDbkIsV0FBVztBQUFBLFVBQ1Q7QUFBQSxZQUNFO0FBQUEsWUFDQTtBQUFBLFlBQ0E7QUFBQSxZQUNBO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILEdBckNxQjtBQXNDckIsVUFBTSx1QkFBdUIsd0JBQUMsWUFJeEI7QUFDSixXQUFLLGFBQWEsT0FBTztBQUFBLElBQzNCLEdBTjZCO0FBTzdCLFVBQU0scUJBQXFCLHdCQUFDLFlBSXRCO0FBQ0osV0FBSyxtQkFBbUIsT0FBTztBQUFBLElBQ2pDLEdBTjJCO0FBTzNCLFVBQU0sMEJBQTBCLHdCQUFDLGNBQy9CLEtBQUssd0JBQXdCLFNBQVMsR0FEUjtBQUVoQyxVQUFNLGVBQWUsd0JBQUMsbUJBQTJCO0FBQy9DLFdBQUssaUJBQWlCLGNBQWM7QUFBQSxJQUN0QyxHQUZxQjtBQUdyQixVQUFNLGdCQUFnQix3QkFBQyxjQUE0QjtBQUNqRCxZQUFNLFVBQVUsT0FBTyxrQkFBa0IsUUFBUSxTQUFTO0FBQzFELFVBQUksQ0FBQyxTQUFTO0FBQ1osY0FBTSxJQUFJLE1BQU0sMEJBQTBCLG9CQUFvQjtBQUFBLE1BQ2hFO0FBRUEsc0NBQVUsMERBQTBCO0FBQUEsUUFDbEMsWUFBWSwrQkFBVyxRQUFRLFVBQVU7QUFBQSxNQUMzQyxDQUFDO0FBQUEsSUFDSCxHQVRzQjtBQVd0QixVQUFNLFdBQVc7QUFDakIsVUFBTSxxQkFBcUIsNkJBQU07QUFDL0IsNERBQXFCLDZCQUE2QjtBQUFBLElBQ3BELEdBRjJCO0FBRzNCLFVBQU0sbUJBQW1CLHdCQUFDLGNBQXNCO0FBQzlDLFdBQUssaUJBQWlCLFNBQVM7QUFBQSxJQUNqQyxHQUZ5QjtBQUd6QixVQUFNLG9DQUFvQyw2QkFBTTtBQUM5QyxVQUFJLEtBQUssMkRBQTJEO0FBQ3BFLHNDQUFVLGtFQUE2QjtBQUFBLElBQ3pDLEdBSDBDO0FBSTFDLFVBQU0sb0NBQW9DLDZCQUFNO0FBQzlDLFVBQUksS0FBSywyREFBMkQ7QUFDcEUsc0NBQVUsa0VBQTZCO0FBQUEsSUFDekMsR0FIMEM7QUFLMUMsVUFBTSwwQkFBMEIsS0FBSyx3QkFBd0IsS0FBSyxJQUFJO0FBQ3RFLFVBQU0sb0JBQW9CLEtBQUssa0JBQWtCLEtBQUssSUFBSTtBQUUxRCxXQUFPO0FBQUEsTUFDTDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsWUFBWTtBQUFBLE1BQ1o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLGdCQUFnQixXQUFrQztBQUN0RCxVQUFNLFVBQVUsTUFBTSwwQ0FBZSxTQUFTO0FBQzlDLFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxJQUFJLE1BQU0sMkNBQTJDLFdBQVc7QUFBQSxJQUN4RTtBQUVBLFVBQU0sUUFBUSxPQUFPLFdBQVcsU0FBUztBQUV6QyxRQUFJLGFBQWE7QUFFakIsUUFBSSxDQUFDLE9BQU8sa0JBQWtCLFFBQVEsU0FBUyxHQUFHO0FBQ2hELG1CQUFhO0FBQUEsSUFDZjtBQUlBLFVBQU0seUJBQ0osb0RBQTBCLEtBQUssRUFBRSxLQUFLLE1BQU07QUFDOUMsUUFBSSxDQUFDLHdCQUF3QixXQUFXLFNBQVMsU0FBUyxHQUFHO0FBQzNELG1CQUFhO0FBQUEsSUFDZjtBQUVBLFFBQUksWUFBWTtBQUNkLFlBQU0sRUFBRSxvQkFBb0IsT0FBTyxhQUFhO0FBQ2hELHNCQUFnQixLQUFLLE1BQU0sSUFBSSxTQUFTO0FBQ3hDO0FBQUEsSUFDRjtBQUVBLFNBQUssTUFBTSxjQUFjLFNBQVM7QUFBQSxFQUNwQztBQUFBLFFBRU0sc0JBQXFDO0FBQ3pDLFVBQU0sUUFBUSxLQUFLLE1BQU0sYUFBYTtBQUV0QyxRQUFJLENBQUMsNkNBQVUsS0FBSyxNQUFNLFVBQVUsR0FBRztBQUNyQyxZQUFNLElBQUksTUFDUix1QkFBdUIsMENBQ3pCO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBVSw2QkFBTTtBQUNwQixVQUFJLEtBQUssaUJBQWlCO0FBQ3hCLGFBQUssZ0JBQWdCLE9BQU87QUFDNUIsYUFBSyxrQkFBa0I7QUFBQSxNQUN6QjtBQUFBLElBQ0YsR0FMZ0I7QUFNaEIsWUFBUTtBQUVSLFVBQU0sVUFBVSw2QkFBTTtBQUNwQixjQUFRO0FBRVIsV0FBSyx1QkFBdUI7QUFBQSxRQUMxQixNQUFNO0FBQUEsUUFDTixNQUFNLE1BQU0sT0FBTyxPQUFPLE9BQU8sMkJBQTJCLEtBQUssS0FBSztBQUFBLE1BQ3hFLENBQUM7QUFBQSxJQUNILEdBUGdCO0FBV2hCLFVBQU0sRUFBRSxxQkFBcUIscUJBQzNCLE1BQU0sS0FBSyx1QkFBdUI7QUFBQSxNQUNoQyxNQUFNO0FBQUEsTUFDTixNQUFNLE1BQU0sT0FBTyxPQUFPLE9BQU8seUJBQXlCLEtBQUssS0FBSztBQUFBLElBQ3RFLENBQUM7QUFFSCxVQUFNLG1CQUFtQixpQkFBaUIsSUFDeEMsQ0FBQyxTQUFtQyxLQUFLLElBQzNDO0FBRUEsU0FBSyxrQkFBa0IsSUFBSSx5Q0FBaUI7QUFBQSxNQUMxQyxXQUFXO0FBQUEsTUFDWCxLQUFLLE9BQU8sT0FBTyxNQUFNLE1BQU0sNEJBQzdCLE9BQU8sWUFDUDtBQUFBLFFBQ0UsY0FBYztBQUFBLFFBQ2Qsa0JBQWtCO0FBQUEsUUFDbEIsYUFBYTtBQUFBLFFBQ2I7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUdNLG1CQUFtQixPQUFtQztBQUMxRCxVQUFNLFFBQVEsT0FBTyxXQUFXLFNBQVM7QUFFekMsVUFBTSxjQUNKLE1BQU0sY0FBYyxtQkFBbUIsb0NBQWU7QUFFeEQsUUFBSSw2Q0FBcUIsS0FBSyxhQUFhO0FBQ3pDO0FBQUEsSUFDRjtBQUVBLFVBQU07QUFBQSxNQUNKO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsUUFDRSxPQUFPLGFBQWE7QUFFeEIsVUFBTSxtQkFBbUI7QUFBQSxNQUN2QjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGdCQUFnQixLQUFLLE1BQU07QUFBQSxNQUMzQixrQkFBa0IsS0FBSyxNQUFNLElBQUksa0JBQWtCLEtBQUssQ0FBQztBQUFBLE1BQ3pEO0FBQUEsTUFDQSxhQUFhLENBQUMsY0FBbUM7QUFDL0MsWUFBSSxjQUFjLCtDQUFvQixlQUFlO0FBQ25ELDBDQUFVLG9DQUFlO0FBQUEsWUFDdkIsT0FBTztBQUFBLFlBQ1AsT0FBTztBQUFBLFVBQ1QsQ0FBQztBQUFBLFFBQ0gsV0FBVyxjQUFjLCtDQUFvQix3QkFBd0I7QUFDbkUsMENBQVUsb0RBQXNCO0FBQUEsUUFDbEMsV0FBVyxjQUFjLCtDQUFvQixxQkFBcUI7QUFDaEUsMENBQVUsOENBQW1CO0FBQUEsUUFDL0IsV0FBVyxjQUFjLCtDQUFvQix5QkFBeUI7QUFDcEUsMENBQVUsc0RBQXVCO0FBQUEsUUFDbkMsV0FDRSxjQUNBLCtDQUFvQiwyQ0FDcEI7QUFDQSwwQ0FBVSwwRkFBeUM7QUFBQSxRQUNyRCxXQUNFLGNBQWMsK0NBQW9CLDZCQUNsQztBQUNBLDBDQUFVLDhEQUEyQjtBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxPQUFPLFFBQXNCO0FBQzNCLFFBQUksS0FDRiwwQkFDQSxLQUFLLE1BQU0sYUFBYSxHQUN4QixXQUNBLE1BQ0Y7QUFFQSxVQUFNLEVBQUUseUJBQXlCLE9BQU8sYUFBYTtBQUNyRCxRQUFJLHNCQUFzQjtBQUN4QiwyQkFBcUIsS0FBSyxNQUFNLEVBQUU7QUFBQSxJQUNwQztBQUVBLFFBQUksS0FBSyxNQUFNLElBQUksY0FBYyxHQUFHO0FBQ2xDLFVBQUksS0FBSyxNQUFNLFNBQVMsR0FBRztBQUN6QixjQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLGNBQU0sWUFBWSxLQUFLLE1BQU0sSUFBSSxXQUFXLEtBQUs7QUFFakQsYUFBSyxNQUFNLElBQUk7QUFBQSxVQUNiO0FBQUEsVUFDQSxjQUFjO0FBQUEsVUFDZCxnQkFBZ0I7QUFBQSxVQUNoQixXQUFXO0FBQUEsUUFDYixDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsYUFBSyxNQUFNLElBQUk7QUFBQSxVQUNiLGNBQWM7QUFBQSxVQUNkLGdCQUFnQjtBQUFBLFFBQ2xCLENBQUM7QUFBQSxNQUNIO0FBR0EsV0FBSyxVQUFVO0FBRWYsV0FBSyxNQUFNLGtCQUFrQjtBQUFBLElBQy9CO0FBRUEsU0FBSyxrQkFBa0IsT0FBTztBQUU5QixRQUFJLEtBQUssa0JBQWtCO0FBQ3pCLFdBQUssaUJBQWlCLE9BQU87QUFBQSxJQUMvQjtBQUNBLFFBQUksS0FBSyx5QkFBeUI7QUFDaEMsV0FBSyx3QkFBd0IsT0FBTztBQUFBLElBQ3RDO0FBQ0EsUUFBSSxLQUFLLGNBQWM7QUFDckIsV0FBSyxhQUFhLE9BQU87QUFBQSxJQUMzQjtBQUNBLFFBQUksS0FBSyxVQUFVLEtBQUssT0FBTyxRQUFRO0FBQ3JDLGVBQVMsSUFBSSxHQUFHLE1BQU0sS0FBSyxPQUFPLFFBQVEsSUFBSSxLQUFLLEtBQUssR0FBRztBQUN6RCxjQUFNLFFBQVEsS0FBSyxPQUFPO0FBQzFCLGNBQU0sS0FBSyxPQUFPO0FBQUEsTUFDcEI7QUFDQSxhQUFPLGFBQWEsY0FBYyxrQ0FBa0MsQ0FBQztBQUFBLElBQ3ZFO0FBRUEsOENBQWtCO0FBQ2xCLGdEQUFvQjtBQUVwQixTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsUUFFTSxPQUFPLEdBQXlDO0FBQ3BELFFBQUksQ0FBQyxFQUFFLGVBQWU7QUFDcEI7QUFBQSxJQUNGO0FBQ0EsVUFBTSxRQUFRLEVBQUU7QUFDaEIsUUFBSSxDQUFDLE1BQU0sY0FBYztBQUN2QjtBQUFBLElBQ0Y7QUFFQSxRQUFJLE1BQU0sYUFBYSxNQUFNLE9BQU8sU0FBUztBQUMzQztBQUFBLElBQ0Y7QUFFQSxNQUFFLGdCQUFnQjtBQUNsQixNQUFFLGVBQWU7QUFFakIsVUFBTSxFQUFFLFVBQVUsTUFBTTtBQUN4QixTQUFLLG1CQUFtQixNQUFNLEtBQUssS0FBSyxDQUFDO0FBQUEsRUFDM0M7QUFBQSxFQUVBLFFBQVEsR0FBZ0M7QUFDdEMsUUFBSSxDQUFDLEVBQUUsZUFBZTtBQUNwQjtBQUFBLElBQ0Y7QUFDQSxVQUFNLFFBQVEsRUFBRTtBQUNoQixRQUFJLENBQUMsTUFBTSxlQUFlO0FBQ3hCO0FBQUEsSUFDRjtBQUNBLFVBQU0sRUFBRSxVQUFVLE1BQU07QUFFeEIsVUFBTSxZQUFZLENBQUMsR0FBRyxLQUFLLEVBQUUsS0FDM0IsVUFBUSxLQUFLLEtBQUssTUFBTSxHQUFHLEVBQUUsT0FBTyxPQUN0QztBQUNBLFFBQUksQ0FBQyxXQUFXO0FBQ2Q7QUFBQSxJQUNGO0FBRUEsTUFBRSxnQkFBZ0I7QUFDbEIsTUFBRSxlQUFlO0FBRWpCLFVBQU0sUUFBcUIsQ0FBQztBQUM1QixhQUFTLElBQUksR0FBRyxJQUFJLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDeEMsVUFBSSxNQUFNLEdBQUcsS0FBSyxNQUFNLEdBQUcsRUFBRSxPQUFPLFNBQVM7QUFDM0MsY0FBTSxPQUFPLE1BQU0sR0FBRyxVQUFVO0FBQ2hDLFlBQUksTUFBTTtBQUNSLGdCQUFNLEtBQUssSUFBSTtBQUFBLFFBQ2pCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxTQUFLLG1CQUFtQixLQUFLO0FBQUEsRUFDL0I7QUFBQSxFQUVBLDJCQUNFLE1BQ0EsT0FDQSxvQkFDZTtBQUNmLFdBQU8sS0FBSyx1QkFBdUI7QUFBQSxNQUNqQztBQUFBLE1BQ0EsTUFBTSxNQUFNLDJCQUEyQixLQUFLLE9BQU8sa0JBQWtCO0FBQUEsSUFDdkUsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLG1CQUFtQixPQUF5QztBQUMxRCxVQUFNLHFCQUFxQiw4QkFBTSxZQUFZLHVCQUF1QjtBQUVwRSxXQUFPLEtBQUssdUJBQXVCO0FBQUEsTUFDakMsTUFBTTtBQUFBLE1BQ04sTUFBTSxZQUFZO0FBQ2hCLGNBQU0sUUFBUSxJQUFJO0FBQUEsVUFDaEIsTUFBTSwyQkFBMkIsbUJBQW1CLEtBQUs7QUFBQSxVQUN6RCw4Q0FBaUI7QUFBQSxZQUNmLGNBQWMsTUFBTSxPQUFPO0FBQUEsWUFDM0IsOEJBQ0UsT0FBTyxPQUFPLEtBQUs7QUFBQSxZQUNyQixVQUFVO0FBQUEsVUFDWixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBQ0Qsd0NBQVUsOERBQTJCO0FBQUEsTUFDdkM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxZQUEyQjtBQUMvQixXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxNQUFNLFVBQVU7QUFBQSxFQUM3RDtBQUFBLFFBRU0sbUJBQWtDO0FBQ3RDLFVBQU0sbUJBQW1CLEtBQUssTUFBTSxJQUFJLGtCQUFrQixLQUFLLENBQUM7QUFDaEUsU0FBSyxNQUFNLElBQUk7QUFBQSxNQUNiLGtCQUFrQixDQUFDO0FBQUEsTUFDbkIsY0FBYztBQUFBLElBQ2hCLENBQUM7QUFFRCxTQUFLLHNCQUFzQjtBQUczQixVQUFNLFFBQVEsSUFBSTtBQUFBLE1BQ2hCLEtBQUssVUFBVTtBQUFBLE1BQ2YsUUFBUSxJQUNOLGlCQUFpQixJQUFJLGdCQUFjLHdEQUFzQixVQUFVLENBQUMsQ0FDdEU7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxTQUFTLFNBQStDO0FBQ3RELFVBQU0sbUJBQW1CLEtBQUssTUFBTSxJQUFJLGtCQUFrQixLQUFLLENBQUM7QUFDaEUsUUFBSSxRQUFRLGdCQUFnQjtBQUMxQixhQUFPLGlCQUFpQixTQUFTO0FBQUEsSUFDbkM7QUFFQSxXQUFPLGlCQUFpQixLQUFLLFVBQVEsQ0FBQyxLQUFLLE9BQU87QUFBQSxFQUNwRDtBQUFBLEVBRUEsd0JBQThCO0FBQzVCLFVBQU0sbUJBQW1CLEtBQUssTUFBTSxJQUFJLGtCQUFrQixLQUFLLENBQUM7QUFDaEUsV0FBTyxhQUFhLFNBQVMsbUJBQzNCLEtBQUssTUFBTSxJQUFJLElBQUksR0FDbkIsZ0JBQ0Y7QUFDQSxRQUFJLEtBQUssU0FBUyxFQUFFLGdCQUFnQixLQUFLLENBQUMsR0FBRztBQUMzQyxnREFBa0I7QUFBQSxJQUNwQjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLFNBQVMsV0FBa0M7QUFDL0MsU0FBSyxNQUFNLFlBQVk7QUFFdkIsUUFBSSxXQUFXO0FBQ2IsWUFBTSxVQUFVLE1BQU0sMENBQWUsU0FBUztBQUU5QyxVQUFJLFNBQVM7QUFDWCxhQUFLLE1BQU0sY0FBYyxTQUFTO0FBQ2xDO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxrQ0FBa0MsV0FBVztBQUFBLElBQ3hEO0FBRUEsVUFBTSxFQUFFLHNCQUFzQixPQUFPLE9BQU87QUFDNUMsUUFBSSxtQkFBbUI7QUFDckIsWUFBTSxrQkFBa0IsZ0NBQWdDLEtBQUssTUFBTSxFQUFFO0FBQUEsSUFDdkU7QUFFQSxVQUFNLGdCQUFnQixtQ0FBWTtBQUNoQyxjQUFRLElBQUk7QUFBQSxRQUNWLEtBQUssTUFBTSxtQkFBbUIsUUFBVyxNQUFTO0FBQUEsUUFDbEQsS0FBSyxNQUFNLGtCQUFrQjtBQUFBLFFBQzdCLEtBQUssTUFBTSxhQUFhO0FBQUEsTUFDMUIsQ0FBQztBQUFBLElBQ0gsR0FOc0I7QUFRdEIsa0JBQWM7QUFFZCxTQUFLLGtCQUFrQjtBQUV2QixVQUFNLGtCQUFrQixLQUFLLE1BQU0sSUFBSSxpQkFBaUI7QUFDeEQsUUFBSSxpQkFBaUI7QUFDbkIsV0FBSyxnQkFBZ0IsZUFBZTtBQUFBLElBQ3RDO0FBRUEsU0FBSyxNQUFNLHVCQUF1QjtBQUNsQyxvQ0FDRSxLQUFLLE1BQU0saUNBQWlDLFFBQzVDLDBDQUNGO0FBQ0EsU0FBSyxNQUFNLDZCQUE2QjtBQUN4QyxvQ0FDRSxLQUFLLE1BQU0sOEJBQThCLFFBQ3pDLDBDQUNGO0FBQ0EsU0FBSyxNQUFNLDBCQUEwQjtBQUVyQyxVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxRQUFRLHFCQUFTLEdBQUc7QUFDbkUsUUFDRSxDQUFDLDJDQUFRLEtBQUssTUFBTSxVQUFVLEtBQzdCLFdBQVcsS0FBSyxNQUFNLFVBQVUsUUFBUSxTQUFTLENBQUMsR0FDbkQ7QUFDQSxzQ0FDRSxLQUFLLE1BQU0seUJBQXlCLFFBQ3BDLDBDQUNGO0FBQ0EsWUFBTSxLQUFLLE1BQU0scUJBQXFCO0FBQUEsSUFDeEM7QUFFQSxTQUFLLE1BQU0sZUFBZTtBQUFBLEVBQzVCO0FBQUEsUUFFTSx3QkFBd0IsV0FBa0M7QUFDOUQsVUFBTSxVQUFVLE1BQU0sMENBQWUsU0FBUztBQUM5QyxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sSUFBSSxNQUFNLG9DQUFvQyxvQkFBb0I7QUFBQSxJQUMxRTtBQUNBLFVBQU0sY0FBYyw2Q0FBeUIsUUFBUSxVQUFVO0FBRS9ELFVBQU0sbUJBQW1CLDhCQUN2QixpQkFDQSxhQUNBLHFCQUNBLGdCQUNHO0FBQ0gsVUFBSTtBQUNGLGNBQU0seUJBQXlCLE1BQU0sS0FBSyxvQkFDeEMsU0FDQSxpQkFDQSxhQUNBLHFCQUNBLFdBQ0Y7QUFFQSxZQUFJLDBCQUEwQixLQUFLLHFCQUFxQjtBQUN0RCxlQUFLLG9CQUFvQixPQUFPO0FBQ2hDLGVBQUssc0JBQXNCO0FBQUEsUUFDN0I7QUFBQSxNQUNGLFNBQVMsS0FBUDtBQUNBLFlBQUksS0FBSyxvQkFBb0IsT0FBTyxJQUFJLFFBQVEsSUFBSSxRQUFRLEdBQUc7QUFBQSxNQUNqRTtBQUFBLElBQ0YsR0F0QnlCO0FBd0J6QixTQUFLLHNCQUFzQixJQUFJLHlDQUFpQjtBQUFBLE1BQzlDLEtBQUssT0FBTyxPQUFPLE1BQU0sTUFBTSwwQkFDN0IsT0FBTyxZQUNQO0FBQUEsUUFDRTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFlBQVksUUFBUSxRQUFRLElBQUksU0FBUyxHQUFHLE1BQU07QUFBQSxRQUNsRCxXQUFXLFFBQVEsUUFBUSxJQUFJLFNBQVMsQ0FBQztBQUFBLFFBQ3pDLGFBQWEsUUFBUSxXQUFXO0FBQUEsUUFDaEMsU0FBUyxNQUFNO0FBQ2IsY0FBSSxLQUFLLHFCQUFxQjtBQUM1QixpQkFBSyxvQkFBb0IsT0FBTztBQUNoQyxpQkFBSyxzQkFBc0I7QUFBQSxVQUM3QjtBQUNBLG1EQUFpQjtBQUFBLFFBQ25CO0FBQUEsUUFDQSxxQkFBcUIsQ0FDbkIsYUFDQSxHQUNBLGtCQUNHO0FBQ0gsY0FBSSxDQUFDLFlBQVksUUFBUTtBQUN2Qix5REFDRSxhQUNBLDBDQUFzQixxQkFDdEIsYUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsUUFDQSxlQUFlLE1BQU0sZ0NBQVUsc0RBQXVCO0FBQUEsTUFDeEQsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUNELFNBQUssb0JBQW9CLE9BQU87QUFBQSxFQUNsQztBQUFBLFFBRU0sb0JBQ0osU0FDQSxpQkFDQSxhQUNBLGFBQ0EsYUFDa0I7QUFDbEIsUUFBSSxLQUFLLHVCQUF1QixRQUFRLGFBQWEsZ0JBQWdCO0FBQ3JFLFVBQU0sbUJBQW1CLG9CQUFJLElBQUk7QUFDakMsUUFBSSxhQUFhO0FBQ2Ysa0JBQVksUUFBUSxnQkFBYztBQUNoQyx5QkFBaUIsSUFDZixHQUFHLFdBQVcsWUFBWSxXQUFXLGFBQ3ZDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUVBLFVBQU0sZ0JBQWdCLGdCQUFnQixJQUFJLFFBQ3hDLE9BQU8sdUJBQXVCLElBQUksRUFBRSxDQUN0QztBQUVBLFVBQU0sYUFBYSxjQUFjLEtBQy9CLGtCQUNFLGNBQWMsSUFBSSxtQkFBbUIsS0FBSyxDQUFDLGFBQWEsV0FBVyxDQUN2RTtBQUNBLFFBQUksWUFBWTtBQUNkLFlBQU0sSUFBSSxNQUFNLHNCQUFzQjtBQUFBLElBQ3hDO0FBSUEsVUFBTSxxQkFBK0MsQ0FBQztBQUN0RCxVQUFNLG9CQUE4QyxDQUFDO0FBQ3JELFVBQU0sUUFBUSxJQUNaLGNBQWMsSUFBSSxPQUFNLGlCQUFnQjtBQUN0QyxVQUFJLGNBQWM7QUFDaEIsY0FBTSxhQUFhLGVBQWU7QUFDbEMsY0FBTSxjQUFjLGFBQWEsY0FBYztBQUMvQyxZQUFJLFlBQVksUUFBUTtBQUN0QixzQkFBWSxRQUFRLDRCQUNsQixtQkFBbUIsS0FBSyxzQkFBc0IsQ0FDaEQ7QUFBQSxRQUNGO0FBRUEsY0FBTSxZQUFZLGFBQWEsYUFBYTtBQUM1QyxZQUFJLFVBQVUsUUFBUTtBQUNwQixvQkFBVSxRQUFRLDJCQUNoQixrQkFBa0IsS0FBSyxxQkFBcUIsQ0FDOUM7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBS0EsVUFBTSxvQkFBb0IsQ0FBQyxHQUFHLG9CQUFvQixHQUFHLGlCQUFpQjtBQUN0RSxRQUFJLGtCQUFrQixRQUFRO0FBQzVCLFlBQU0sc0JBQXNCLFNBQVMsY0FDbkMsNkJBQ0Y7QUFDQSxVQUFJLHFCQUFxQjtBQUN2Qiw0QkFBb0IsTUFBTSxVQUFVO0FBQUEsTUFDdEM7QUFDQSxZQUFNLGFBQWEsTUFBTSxLQUFLLHFCQUFxQixpQkFBaUI7QUFFcEUsVUFBSSxDQUFDLFlBQVk7QUFDZixZQUFJLHFCQUFxQjtBQUN2Qiw4QkFBb0IsTUFBTSxVQUFVO0FBQUEsUUFDdEM7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUVBLFVBQUk7QUFDSixVQUFJO0FBQ0osVUFBSSxtQkFBbUIsUUFBUTtBQUM3Qix3QkFBZ0IsOERBQXlCLGtCQUFrQjtBQUFBLE1BQzdEO0FBQ0EsVUFBSSxrQkFBa0IsUUFBUTtBQUM1Qix5QkFBaUIsZ0RBQWtCLGlCQUFpQjtBQUFBLE1BQ3REO0FBQ0EsWUFBTSxRQUFRLElBQUksQ0FBQyxlQUFlLGNBQWMsQ0FBQztBQUFBLElBQ25EO0FBRUEsVUFBTSxxQkFBcUIsRUFBRSxnQkFBZ0IsS0FBSztBQUNsRCxVQUFNLGdCQUFnQixLQUFLLElBQUk7QUFLL0IsVUFBTSxRQUFRLElBQ1osY0FBYyxJQUFJLE9BQU8sY0FBYyxXQUFXO0FBQ2hELFlBQU0sWUFBWSxnQkFBZ0I7QUFDbEMsVUFBSSxjQUFjO0FBQ2hCLGNBQU0sVUFBVSxRQUFRLElBQUksU0FBUztBQUNyQyxjQUFNLFVBQVUsUUFBUSxJQUFJLFNBQVM7QUFFckMsWUFBSSxTQUFTO0FBQ1gsZ0JBQU0sa0JBQWtCLE1BQU0sZ0JBQWdCLE9BQU87QUFDckQsZ0JBQU0sZ0JBQWdCLGtCQUNsQjtBQUFBLGVBQ0s7QUFBQSxZQUNILE1BQU07QUFBQSxpQkFDRCxnQkFBZ0I7QUFBQSxjQUNuQixNQUFNO0FBQUEsWUFDUjtBQUFBLFVBQ0YsSUFDQTtBQUVKLHVCQUFhLHNCQUNYO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixhQUFhLENBQUM7QUFBQSxZQUNkLFNBQVM7QUFBQSxVQUNYLEdBQ0EsS0FBSyxvQkFBb0IsVUFBVSxDQUNyQztBQUFBLFFBQ0YsV0FBVyxTQUFTLFFBQVE7QUFDMUIsZ0JBQU0sNEJBQTRCLE1BQU0sZ0JBQWdCLE9BQU87QUFDL0QsdUJBQWEsc0JBQ1g7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLGFBQWEsQ0FBQztBQUFBLFlBQ2QsU0FBUztBQUFBLFVBQ1gsR0FDQSxLQUFLLG9CQUFvQixVQUFVLENBQ3JDO0FBQUEsUUFDRixPQUFPO0FBQ0wsZ0JBQU0sVUFBVSxjQUNaLE1BQU0sZ0JBQWdCLENBQUMsV0FBVyxDQUFDLElBQ25DLENBQUM7QUFDTCxnQkFBTSxzQkFBc0IsTUFBTSxRQUFRLElBQ3ZDLGdCQUFlLENBQUMsR0FBRyxJQUFJLE9BQU0sU0FBUztBQUFBLGVBQ2pDLE1BQU0sbUJBQW1CLElBQUk7QUFBQSxZQUNqQyxNQUFNO0FBQUEsVUFDUixFQUFFLENBQ0o7QUFDQSxnQkFBTSxvQkFBb0Isb0JBQW9CLE9BQzVDLENBQUMsZUFDQyxpQkFBaUIsSUFDZixHQUFHLFdBQVcsWUFBWSxXQUFXLGFBQ3ZDLENBQ0o7QUFFQSx1QkFBYSxzQkFDWDtBQUFBLFlBQ0UsTUFBTSxlQUFlO0FBQUEsWUFDckIsYUFBYTtBQUFBLFlBQ2I7QUFBQSxVQUNGLEdBQ0EsS0FBSyxvQkFBb0IsVUFBVSxDQUNyQztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFHQSw2Q0FBaUI7QUFFakIsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLGVBQXFCO0FBQ25CLFFBQUksU0FBUyxpQkFBaUIsdUJBQXVCLEVBQUUsUUFBUTtBQUM3RDtBQUFBLElBQ0Y7QUFJQSxVQUFNLDRCQUE0QjtBQUNsQyxVQUFNLGdDQUFnQztBQUV0QyxVQUFNLGlCQUFpQixLQUFLLE1BQU0sSUFBSSxJQUFJO0FBQzFDLFVBQU0sVUFBVSxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWUsRUFBRSxTQUFTO0FBRXpFLFVBQU0sV0FBVyxtQ0FBWTtBQUMzQixZQUFNLFdBQ0osTUFBTSxPQUFPLE9BQU8sS0FBSyxzQ0FDdkIsZ0JBQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxNQUNULENBQ0Y7QUFDRixZQUFNLGVBQ0osTUFBTSxPQUFPLE9BQU8sS0FBSywrQkFDdkIsZ0JBQ0E7QUFBQSxRQUNFLE9BQU87QUFBQSxNQUNULENBQ0Y7QUFHRixlQUFTLE1BQU0sU0FBUyxRQUFRLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQ3RELGNBQU0sVUFBVSxTQUFTO0FBQ3pCLGNBQU0sRUFBRSxrQkFBa0I7QUFFMUIsWUFDRSxpQkFDQSxnQkFBZ0IsUUFBUSw0QkFDeEI7QUFHQSxtQkFBUyxLQUFLLE1BQU0scUJBQXFCLE9BQU87QUFFaEQsZ0JBQU0sT0FBTyxPQUFPLEtBQUssWUFBWSxTQUFTLElBQUksRUFBRSxRQUFRLENBQUM7QUFBQSxRQUMvRDtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFFBQTBCLDJCQUM5QixTQUFTLElBQUksYUFBVztBQUN0QixlQUFRLFNBQVEsZUFBZSxDQUFDLEdBQUcsSUFDakMsQ0FDRSxZQUNBLFVBQzBCO0FBQzFCLGNBQ0UsQ0FBQyxXQUFXLFFBQ1osQ0FBQyxXQUFXLGFBQ1osV0FBVyxXQUNYLFdBQVcsT0FDWDtBQUNBO0FBQUEsVUFDRjtBQUVBLGdCQUFNLEVBQUUsY0FBYztBQUN0QixpQkFBTztBQUFBLFlBQ0wsTUFBTSxXQUFXO0FBQUEsWUFDakIsV0FBVywwQkFBMEIsV0FBVyxJQUFJO0FBQUEsWUFDcEQsb0JBQW9CLFdBQVcsT0FDM0IsMEJBQTBCLFVBQVUsSUFBSSxJQUN4QztBQUFBLFlBQ0osYUFBYSxXQUFXO0FBQUEsWUFDeEI7QUFBQSxZQUNBO0FBQUEsWUFDQSxTQUFTO0FBQUEsY0FDUCxhQUFhLFFBQVEsZUFBZSxDQUFDO0FBQUEsY0FDckMsZ0JBQ0UsT0FBTyx1QkFBdUIsSUFDNUIsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsZ0JBQzdDLE1BQU0sUUFBUTtBQUFBLGdCQUNkLE1BQU0sUUFBUTtBQUFBLGNBQ2hCLENBQUMsQ0FDSCxHQUFHLE1BQU0sUUFBUTtBQUFBLGNBQ25CLElBQUksUUFBUTtBQUFBLGNBQ1osYUFBYSxRQUFRO0FBQUEsY0FDckIsZ0JBQWdCLE9BQU8sUUFBUSxjQUFjO0FBQUEsY0FDN0MsU0FBUyxRQUFRO0FBQUEsWUFDbkI7QUFBQSxVQUNGO0FBQUEsUUFDRixDQUNGO0FBQUEsTUFDRixDQUFDLENBQ0gsRUFBRSxPQUFPLHdCQUFRO0FBR2pCLFlBQU0sWUFBa0MsQ0FBQztBQUN6QyxtQkFBYSxRQUFRLGFBQVc7QUFDOUIsY0FBTSxjQUFjLFFBQVEsZUFBZSxDQUFDO0FBQzVDLGNBQU0sYUFBYSxZQUFZO0FBQy9CLFlBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxRQUNGO0FBRUEsa0JBQVUsS0FBSztBQUFBLFVBQ2IsYUFBYSxXQUFXO0FBQUEsVUFDeEIsT0FBTztBQUFBLFVBQ1A7QUFBQSxVQUVBO0FBQUEsUUFHRixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsWUFBTSxpQkFBaUIsOEJBQU87QUFBQSxRQUM1QjtBQUFBLFFBQ0E7QUFBQSxZQUlJO0FBQ0osY0FBTSxZQUFZLFFBQVE7QUFDMUIsY0FBTSxXQUFXLE1BQU0sV0FBVyxLQUFLO0FBQUEsVUFDckM7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFVBQ0E7QUFBQSxRQUNGLENBQUM7QUFFRCxZQUFJLFVBQVU7QUFDWiwwQ0FBVSxzQ0FBZ0I7QUFBQSxZQUN4QixZQUFZLE1BQU07QUFDaEIsK0JBQWlCLFFBQVE7QUFBQSxZQUMzQjtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGLEdBdEJ1QjtBQXdCdkIsWUFBTSxjQUFjLDhCQUFPO0FBQUEsUUFDekI7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFlBQ29CO0FBQ3BCLGdCQUFRO0FBQUEsZUFDRCxhQUFhO0FBQ2hCLDJCQUFlLEVBQUUsU0FBUyxXQUFXLENBQUM7QUFDdEM7QUFBQSxVQUNGO0FBQUEsZUFFSyxTQUFTO0FBQ1osa0JBQU0sZ0JBQ0osTUFBTSxLQUFLLFVBQVEsV0FBVyxTQUFTLEtBQUssSUFBSSxLQUFLLE1BQU07QUFDN0QsaUJBQUsscUJBQXFCLGVBQWUsS0FBSztBQUM5QztBQUFBLFVBQ0Y7QUFBQTtBQUdFLGtCQUFNLElBQUksVUFBVSw2QkFBNkIsT0FBTztBQUFBO0FBQUEsTUFFOUQsR0FyQm9CO0FBdUJwQixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLElBQ0YsR0F2SmlCO0FBeUpqQiw2QkFBZ0U7QUFDOUQsWUFBTSxRQUFRLE9BQU8sV0FBVyxTQUFTO0FBQ3pDLFlBQU0saUJBQWlCLE9BQU8sZUFBZTtBQUM3QyxZQUFNLFdBQVcsa0JBQWtCLGVBQWU7QUFDbEQsVUFBSSxDQUFDLFlBQVksQ0FBQyxTQUFTLFlBQVk7QUFDckMsZUFBTztBQUFBLE1BQ1Q7QUFFQSxhQUFPLFNBQVM7QUFBQSxJQUNsQjtBQVRTLEFBWVQsUUFBSTtBQUNKLDBCQUFzQixjQUFjO0FBRXBDLFVBQU0sY0FBYyxPQUFPLFdBQVcsVUFBVSxNQUFNO0FBQ3BELFlBQU0scUJBQXFCLGNBQWM7QUFDekMsVUFBSSx1QkFBdUIscUJBQXFCO0FBQzlDLGVBQU87QUFDUCw4QkFBc0I7QUFBQSxNQUN4QjtBQUFBLElBQ0YsQ0FBQztBQUVELFVBQU0sT0FBTyxJQUFJLHlDQUFpQjtBQUFBLE1BQ2hDLFdBQVc7QUFBQSxNQUVYLEtBQUssd0RBQUU7QUFBQSxNQUNQLFNBQVMsTUFBTTtBQUNiLG9CQUFZO0FBQUEsTUFDZDtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0sY0FBYyxPQUFPLEtBQUssVUFBVTtBQUUxQyxVQUFNLFNBQVMsbUNBQVk7QUFDekIsWUFBTSxRQUFRLE1BQU0sU0FBUztBQUM3QixXQUFLLE9BQU8sb0NBQUM7QUFBQSxRQUFhLE1BQU0sT0FBTztBQUFBLFdBQVU7QUFBQSxPQUFPLENBQUU7QUFBQSxJQUM1RCxHQUhlO0FBS2YsU0FBSyxTQUFTLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFFbkMsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVBLG9CQUEwQjtBQUN4QixRQUFJLEtBQUssVUFBVSxLQUFLLE9BQU8sUUFBUTtBQUNyQztBQUFBLElBQ0Y7QUFFQSxTQUFLLGVBQWUsU0FBUyxXQUFXO0FBQUEsRUFDMUM7QUFBQSxFQUVBLHNCQUE0QjtBQUMxQixTQUFLLGVBQWUsU0FBUyxZQUFZLElBQUk7QUFBQSxFQUMvQztBQUFBLEVBRUEscUJBQTJCO0FBQ3pCLFNBQUssZUFBZSxTQUFTLFlBQVksS0FBSztBQUFBLEVBQ2hEO0FBQUEsRUFFQSxvQkFBMEI7QUFDeEIsU0FBSyxlQUFlLFNBQVMsa0JBQWtCO0FBQUEsRUFDakQ7QUFBQSxFQUVBLGlCQUF1QjtBQUNyQixVQUFNLEVBQUUsbUJBQW1CLE9BQU8sS0FBSztBQUV2QyxVQUFNLGNBQ0osbUJBQW1CLElBQUksQ0FBQyxpQkFBb0M7QUFDMUQsYUFBTztBQUFBLFFBQ0wsU0FBUztBQUFBLFFBQ1QsUUFBUSxhQUFhLE9BQU87QUFBQSxNQUM5QjtBQUFBLElBQ0YsQ0FBQyxLQUFLLENBQUM7QUFFVCxVQUFNLGFBQWEsT0FBTyxXQUFXLFNBQVM7QUFDOUMsVUFBTSxvQkFBb0IsNkNBQTBCLFVBQVU7QUFDOUQsVUFBTSxRQUFRLDBCQUFTLFVBQVU7QUFFakMsVUFBTSxPQUFPLElBQUkseUNBQWlCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsS0FDRSxvQ0FBQztBQUFBLFFBQ0Msa0JBQWtCO0FBQUEsUUFDbEIsZ0JBQWdCO0FBQUEsUUFDaEIsTUFBTSxPQUFPO0FBQUEsUUFDYjtBQUFBLFFBQ0EscUJBQXFCO0FBQUEsUUFDckI7QUFBQSxRQUNBLGtCQUFrQixlQUFhO0FBQzdCLGVBQUssaUJBQWlCLFNBQVM7QUFBQSxRQUNqQztBQUFBLFFBQ0E7QUFBQSxPQUNGO0FBQUEsSUFFSixDQUFDO0FBRUQsU0FBSyxTQUFTLEVBQUUsS0FBSyxDQUFDO0FBQ3RCLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLGlCQUFpQixJQUFtQjtBQUNsQyxRQUFJO0FBRUosUUFBSSxDQUFDLE1BQU0sd0RBQXFCLEtBQUssTUFBTSxVQUFVLEdBQUc7QUFDdEQscUJBQWUsS0FBSztBQUFBLElBQ3RCLE9BQU87QUFDTCxxQkFBZSxPQUFPLHVCQUF1QixJQUFJLEVBQUU7QUFBQSxJQUNyRDtBQUNBLFFBQUksY0FBYztBQUNoQixhQUFPLGFBQWEsYUFBYSx3QkFDL0IsYUFBYSxJQUFJLElBQUksQ0FDdkI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsMEJBQ0UsV0FDQSxvQkFDTTtBQUNOLFVBQU0sVUFBVSxPQUFPLGtCQUFrQixRQUFRLFNBQVM7QUFDMUQsUUFBSSxDQUFDLFNBQVM7QUFDWixZQUFNLElBQUksTUFDUixzQ0FBc0Msb0JBQ3hDO0FBQUEsSUFDRjtBQUVBLFVBQU0sRUFBRSxhQUFhLFNBQVMsY0FBYyxRQUFRO0FBQ3BELFFBQUksQ0FBQyxlQUFlLFlBQVksU0FBUyxHQUFHO0FBQzFDO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFDSixzQkFBc0IsWUFBWSxTQUFTLGtCQUFrQixJQUN6RCxxQkFDQSxZQUFZO0FBQ2xCLFVBQU0sRUFBRSxhQUFhO0FBRXJCLFVBQU0sY0FBYyxPQUFPLE9BQU8sS0FBSyxnQkFBZ0IsWUFBWSxFQUFFO0FBRXJFLFNBQUssbUJBQW1CLEVBQUUsWUFBWSxXQUFXLFlBQVksQ0FBQztBQUFBLEVBQ2hFO0FBQUEsUUFFTSxtQkFBbUI7QUFBQSxJQUN2QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsS0FLZ0I7QUFDaEIsUUFBSSxhQUFhO0FBQ2Ysc0NBQVUsb0RBQXNCO0FBQ2hDO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FBVyxNQUFNLFdBQVcsS0FBSztBQUFBLE1BQ3JDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsUUFBSSxVQUFVO0FBQ1osc0NBQVUsc0NBQWdCO0FBQUEsUUFDeEIsWUFBWSxNQUFNO0FBQ2hCLDJCQUFpQixRQUFRO0FBQUEsUUFDM0I7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLFFBRU0sd0JBQXdCLFdBQWtDO0FBQzlELFFBQUksS0FBSyx3REFBd0Q7QUFFakUsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUMxRCxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sSUFBSSxNQUFNLG9DQUFvQyxvQkFBb0I7QUFBQSxJQUMxRTtBQUVBLFFBQUksQ0FBQyxnQ0FBWSxRQUFRLFVBQVUsR0FBRztBQUNwQyxZQUFNLElBQUksTUFDUixvQ0FBb0MsUUFBUSxhQUFhLGdDQUMzRDtBQUFBLElBQ0Y7QUFFQSxRQUFJLFFBQVEsU0FBUyxHQUFHO0FBQ3RCLFlBQU0sSUFBSSxNQUNSLG9DQUFvQyxRQUFRLGFBQWEscUJBQzNEO0FBQUEsSUFDRjtBQUVBLFVBQU0sa0JBQW1CLFNBQVEsSUFBSSxhQUFhLEtBQUssQ0FBQyxHQUFHO0FBQzNELFFBQUksQ0FBQyxtQkFBbUIsQ0FBQyxnQkFBZ0IsTUFBTTtBQUM3QyxZQUFNLElBQUksTUFDUixvQ0FBb0MsUUFBUSxhQUFhLHFDQUMzRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQWUsMEJBQTBCLGdCQUFnQixJQUFJO0FBQ25FLFVBQU0sRUFBRSxNQUFNLGFBQWEsTUFBTSxzQkFBc0IsWUFBWTtBQUNuRSxVQUFNLGlCQUFpQjtBQUFBLFNBQ2xCO0FBQUEsTUFDSCxNQUFNO0FBQUEsSUFDUjtBQUVBLFVBQU0sUUFBUSwwQkFBMEI7QUFFeEMsVUFBTSxRQUFRLDZCQUFZO0FBQ3hCLFVBQUk7QUFDRixhQUFLLGNBQWMsT0FBTztBQUMxQiwrQ0FBYztBQUFBLE1BQ2hCLFVBQUU7QUFDQSx1QkFBZSxRQUFRO0FBQUEsTUFDekI7QUFBQSxJQUNGLEdBUGM7QUFTZCxTQUFLLFNBQVMsU0FBUyxXQUFXLEtBQUs7QUFDdkMsU0FBSyxTQUFTLFNBQVMsVUFBVSxNQUFNO0FBQ3JDLDRDQUFhLFNBQVMsQ0FBQztBQUFBLElBQ3pCLENBQUM7QUFFRCxVQUFNLFdBQVcsNkJBQXVDO0FBQ3RELFlBQU0sRUFBRSxNQUFNLGdCQUFnQjtBQUU5QixhQUFPO0FBQUEsUUFDTDtBQUFBLFFBQ0EsTUFBTSxPQUFPO0FBQUEsUUFDYixPQUFPO0FBQUEsVUFDTDtBQUFBLFlBQ0UsWUFBWTtBQUFBLFlBQ1osV0FBVyxvQkFBb0IsSUFBSTtBQUFBLFlBQ25DO0FBQUEsWUFDQSxPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsY0FDUCxhQUFhLFFBQVEsSUFBSSxhQUFhLEtBQUssQ0FBQztBQUFBLGNBQzVDLElBQUksUUFBUSxJQUFJLElBQUk7QUFBQSxjQUNwQixnQkFBZ0IsUUFBUSxJQUFJLGdCQUFnQjtBQUFBLGNBQzVDLGFBQWEsUUFBUSxJQUFJLGFBQWE7QUFBQSxjQUN0QyxnQkFBZ0IsT0FBTyxRQUFRLElBQUksZ0JBQWdCLENBQUM7QUFBQSxjQUNwRCxTQUFTLFFBQVEsSUFBSSxTQUFTO0FBQUEsWUFDaEM7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLFFBQ0EsWUFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGLEdBeEJpQjtBQTBCakIsMENBQWEsU0FBUyxDQUFDO0FBRXZCLFFBQUksS0FBSywwQ0FBMEM7QUFBQSxFQUNyRDtBQUFBLEVBRUEsY0FBYyxXQUF5QjtBQUNyQyxVQUFNLFVBQVUsT0FBTyxrQkFBa0IsUUFBUSxTQUFTO0FBQzFELFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxJQUFJLE1BQU0sMEJBQTBCLG9CQUFvQjtBQUFBLElBQ2hFO0FBRUEsV0FBTyx1QkFBdUI7QUFBQSxNQUM1QixjQUFjO0FBQUEsTUFDZCxTQUFTLE9BQU8sS0FBSyxlQUFlO0FBQUEsTUFDcEMsUUFBUSxPQUFPLEtBQUssUUFBUTtBQUFBLE1BQzVCLFNBQVMsTUFBTTtBQUNiLGVBQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxFQUFFO0FBQzNDLFlBQUksK0JBQVcsUUFBUSxVQUFVLEdBQUc7QUFDbEMsZUFBSyxNQUFNLDBCQUEwQjtBQUFBLFFBQ3ZDLE9BQU87QUFDTCxlQUFLLE1BQU0sc0JBQXNCO0FBQUEsUUFDbkM7QUFDQSxhQUFLLFdBQVc7QUFBQSxNQUNsQjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLHlCQUF5QixXQUF5QjtBQUNoRCxVQUFNLFVBQVUsT0FBTyxrQkFBa0IsUUFBUSxTQUFTO0FBQzFELFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxJQUFJLE1BQ1IscUNBQXFDLG9CQUN2QztBQUFBLElBQ0Y7QUFFQSxXQUFPLHVCQUF1QjtBQUFBLE1BQzVCLGNBQWM7QUFBQSxNQUNkLFNBQVMsT0FBTyxLQUFLLDBCQUEwQjtBQUFBLE1BQy9DLFFBQVEsT0FBTyxLQUFLLFFBQVE7QUFBQSxNQUM1QixTQUFTLFlBQVk7QUFDbkIsWUFBSTtBQUNGLGdCQUFNLEtBQUssTUFBTSw2QkFBNkI7QUFBQSxZQUM1QyxJQUFJLFFBQVE7QUFBQSxZQUNaLFdBQVcsUUFBUSxJQUFJLFNBQVM7QUFBQSxVQUNsQyxDQUFDO0FBQUEsUUFDSCxTQUFTLE9BQVA7QUFDQSxjQUFJLE1BQ0YscUNBQ0EsU0FBUyxNQUFNLE9BQ2YsU0FDRjtBQUNBLDBDQUFVLGdFQUE0QjtBQUFBLFFBQ3hDO0FBQ0EsYUFBSyxXQUFXO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSx1QkFBdUIsUUFBZ0IsU0FBdUI7QUFDNUQsYUFBUyxzQkFBc0IsUUFBUSxPQUFPO0FBRTlDLFVBQU0sUUFBUTtBQUFBLE1BQ1o7QUFBQSxNQUNBLFNBQVMsWUFBWTtBQUNuQixZQUFJLEtBQUsseUJBQXlCO0FBQ2hDLGVBQUssd0JBQXdCLE9BQU87QUFDcEMsZUFBSywwQkFBMEI7QUFBQSxRQUNqQztBQUNBLGNBQU0sU0FBUyxvQkFBb0IsTUFBTTtBQUFBLE1BQzNDO0FBQUEsSUFDRjtBQUVBLFNBQUssMEJBQTBCLElBQUkseUNBQWlCO0FBQUEsTUFDbEQsV0FBVztBQUFBLE1BQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLDBCQUM3QixPQUFPLFlBQ1AsS0FDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLHFCQUNFLG1CQUNBLFFBQThCLENBQUMsR0FDekI7QUFDTixVQUFNLFNBQVMsOEJBQU87QUFBQSxNQUNwQjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsVUFLSTtBQUNKLFlBQU0sV0FBVyxNQUFNLFdBQVcsS0FBSztBQUFBLFFBQ3JDO0FBQUEsUUFDQSxPQUFPLFFBQVE7QUFBQSxRQUNmO0FBQUEsUUFDQTtBQUFBLFFBQ0EsV0FBVyxRQUFRO0FBQUEsTUFDckIsQ0FBQztBQUVELFVBQUksVUFBVTtBQUNaLHdDQUFVLHNDQUFnQjtBQUFBLFVBQ3hCLFlBQVksTUFBTTtBQUNoQiw2QkFBaUIsUUFBUTtBQUFBLFVBQzNCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0YsR0F4QmU7QUEwQmYsVUFBTSxnQkFBZ0IsTUFBTSxVQUMxQixlQUNFLFVBQVUsV0FBVyxTQUFTLGtCQUFrQixXQUFXLElBQy9EO0FBRUEsMENBQWE7QUFBQSxNQUNYLE9BQU87QUFBQSxNQUNQLE1BQU0sT0FBTztBQUFBLE1BQ2IsaUJBQWlCLGtEQUF3QixPQUFPLFdBQVcsU0FBUyxDQUFDO0FBQUEsTUFDckU7QUFBQSxNQUNBLFdBQVcsZUFBYTtBQUN0QixhQUFLLHdCQUF3QixTQUFTO0FBQUEsTUFDeEM7QUFBQSxNQUNBO0FBQUEsTUFDQSxlQUFlLGlCQUFpQixJQUFJLGdCQUFnQjtBQUFBLElBQ3RELENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxhQUFhO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxLQUtPO0FBQ1AsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsU0FBUztBQUMxRCxRQUFJLENBQUMsU0FBUztBQUNaLFlBQU0sSUFBSSxNQUFNLHlCQUF5QixvQkFBb0I7QUFBQSxJQUMvRDtBQUNBLFVBQU0sVUFBVSxRQUFRLElBQUksU0FBUztBQUNyQyxRQUFJLFNBQVM7QUFDWCxZQUFNLEVBQUUsUUFBUSxZQUFZO0FBQzVCLFdBQUssdUJBQXVCLFFBQVEsT0FBTztBQUMzQztBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsZ0JBQWdCO0FBRXhCLFFBQ0UsQ0FBQyxPQUFPLE9BQU8sS0FBSyxhQUFhLHFCQUFxQixXQUFXLEtBQ2pFLENBQUMsT0FBTyxPQUFPLEtBQUssYUFBYSxxQkFBcUIsV0FBVyxHQUNqRTtBQUNBLFdBQUssMEJBQTBCLFdBQVcsVUFBVTtBQUNwRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGNBQXFDLFFBQVEsSUFBSSxhQUFhLEtBQUssQ0FBQztBQUUxRSxVQUFNLE9BQU8sNkJBQU0sV0FBVztBQUU5QixVQUFNLFFBQVEsWUFDWCxPQUFPLFVBQVEsS0FBSyxhQUFhLENBQUMsS0FBSyxXQUFXLENBQUMsS0FBSyxLQUFLLEVBQzdELElBQUksQ0FBQyxNQUFNLFVBQVc7QUFBQSxNQUNyQixXQUFXLDBCQUEwQixLQUFLLFFBQVEsRUFBRTtBQUFBLE1BQ3BELE1BQU0sS0FBSztBQUFBLE1BQ1gsYUFBYSxLQUFLO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTO0FBQUEsUUFDUCxhQUFhLFFBQVEsSUFBSSxhQUFhLEtBQUssQ0FBQztBQUFBLFFBQzVDLElBQUksUUFBUSxJQUFJLElBQUk7QUFBQSxRQUNwQixnQkFDRSxPQUFPLHVCQUF1QixJQUM1QixPQUFPLHVCQUF1QixpQkFBaUI7QUFBQSxVQUM3QyxNQUFNLFFBQVEsSUFBSSxZQUFZO0FBQUEsVUFDOUIsTUFBTSxRQUFRLElBQUksUUFBUTtBQUFBLFFBQzVCLENBQUMsQ0FDSCxHQUFHLE1BQU0sUUFBUSxJQUFJLGdCQUFnQjtBQUFBLFFBQ3ZDLGFBQWEsUUFBUSxJQUFJLGFBQWE7QUFBQSxRQUN0QyxnQkFBZ0IsT0FBTyxRQUFRLElBQUksZ0JBQWdCLENBQUM7QUFBQSxRQUNwRCxTQUFTLFFBQVEsSUFBSSxTQUFTO0FBQUEsTUFDaEM7QUFBQSxNQUNBLFlBQVk7QUFBQSxNQUNaLG9CQUNFLEtBQUssV0FBVyxhQUNoQiwwQkFBMEIsS0FBSyxXQUFXLFFBQVEsRUFBRTtBQUFBLElBQ3hELEVBQUU7QUFFSixRQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCLFVBQUksTUFDRiwyQ0FDQSxZQUFZLElBQUksT0FBTTtBQUFBLFFBQ3BCLGFBQWEsRUFBRTtBQUFBLFFBQ2YsT0FBTyxFQUFFO0FBQUEsUUFDVCxPQUFPLEVBQUU7QUFBQSxRQUNULE1BQU0sRUFBRTtBQUFBLFFBQ1IsTUFBTSxFQUFFO0FBQUEsTUFDVixFQUFFLENBQ0o7QUFDQSxzQ0FBVSw4REFBMkI7QUFDckM7QUFBQSxJQUNGO0FBRUEsVUFBTSxnQkFDSixNQUFNLEtBQUssVUFBUSxXQUFXLFNBQVMsS0FBSyxJQUFJLEtBQUssTUFBTTtBQUU3RCxTQUFLLHFCQUFxQixlQUFlLEtBQUs7QUFBQSxFQUNoRDtBQUFBLEVBRUEsaUJBQWlCLFdBQXlCO0FBQ3hDLFdBQU8sYUFBYSxhQUFhLGlCQUFpQixXQUFXLEtBQUssTUFBTSxFQUFFO0FBQUEsRUFDNUU7QUFBQSxFQUVBLDBCQUFnQztBQUM5QixVQUFNLE9BQU8sSUFBSSx5Q0FBaUI7QUFBQSxNQUNoQyxXQUFXO0FBQUEsTUFDWCxLQUFLLE9BQU8sT0FBTyxNQUFNLE1BQU0sMEJBQzdCLE9BQU8sWUFDUDtBQUFBLFFBQ0UsZ0JBQWdCLEtBQUssTUFBTTtBQUFBLE1BQzdCLENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLGNBQWMsT0FBTyxLQUFLLGlDQUFpQztBQUVqRSxTQUFLLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSx5QkFBK0I7QUFDN0IsVUFBTSxPQUFPLElBQUkseUNBQWlCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLHlCQUM3QixPQUFPLFlBQ1A7QUFBQSxRQUNFLGdCQUFnQixLQUFLLE1BQU07QUFBQSxRQUMzQixtQ0FDRSxLQUFLLGtDQUFrQyxLQUFLLElBQUk7QUFBQSxRQUNsRCxnQ0FDRSxLQUFLLCtCQUErQixLQUFLLElBQUk7QUFBQSxRQUMvQyxzQkFBc0IsS0FBSyxxQkFBcUIsS0FBSyxJQUFJO0FBQUEsTUFDM0QsQ0FDRjtBQUFBLElBQ0YsQ0FBQztBQUNELFVBQU0sY0FBYyxPQUFPLEtBQUssYUFBYTtBQUU3QyxTQUFLLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSxxQkFBMkI7QUFDekIsVUFBTSxPQUFPLElBQUkseUNBQWlCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLHFCQUFxQixPQUFPLFlBQVk7QUFBQSxRQUNyRSxnQkFBZ0IsS0FBSyxNQUFNO0FBQUEsUUFDM0IsU0FBUyxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWUsRUFBRSxTQUFTO0FBQUEsUUFDbEUsMEJBQTBCLENBQUMsbUJBQTJCO0FBQ3BELGVBQUssTUFBTSxvQ0FBb0MsY0FBYztBQUFBLFFBQy9EO0FBQUEsUUFDQSwwQkFBMEIscUJBQW1CO0FBQzNDLGVBQUssTUFBTSxvQ0FBb0MsZUFBZTtBQUFBLFFBQ2hFO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQ0QsVUFBTSxjQUFjLE9BQU8sS0FDekIsMkNBQ0Y7QUFFQSxTQUFLLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSx3Q0FBOEM7QUFDNUMsVUFBTSxPQUFPLElBQUkseUNBQWlCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLHdDQUM3QixPQUFPLFlBQ1A7QUFBQSxRQUNFLGdCQUFnQixLQUFLLE1BQU07QUFBQSxRQUMzQixpQ0FDRSxLQUFLLE1BQU0sZ0NBQWdDLEtBQUssS0FBSyxLQUFLO0FBQUEsUUFDNUQsbUJBQW1CLEtBQUssa0JBQWtCLEtBQUssSUFBSTtBQUFBLE1BQ3JELENBQ0Y7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLGNBQWMsT0FBTyxLQUFLLG9DQUFvQztBQUVwRSxTQUFLLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSxzQkFBNEI7QUFDMUIsVUFBTSxPQUFPLElBQUkseUNBQWlCO0FBQUEsTUFDaEMsV0FBVztBQUFBLE1BQ1gsS0FBSyxPQUFPLE9BQU8sTUFBTSxNQUFNLHNCQUFzQixPQUFPLFlBQVk7QUFBQSxRQUN0RSxnQkFBZ0IsS0FBSyxNQUFNLElBQUksSUFBSTtBQUFBLE1BQ3JDLENBQUM7QUFBQSxJQUNILENBQUM7QUFDRCxVQUFNLGNBQWMsT0FBTyxLQUFLLDZCQUE2QjtBQUU3RCxTQUFLLFNBQVMsRUFBRSxNQUFNLFlBQVksQ0FBQztBQUNuQyxTQUFLLE9BQU87QUFBQSxFQUNkO0FBQUEsRUFFQSwwQkFBZ0M7QUFHOUIsUUFBSSxLQUFLLE1BQU0sc0JBQXNCO0FBQ25DLFdBQUssTUFBTSxxQkFBcUI7QUFBQSxJQUNsQztBQUVBLFVBQU0scUJBQXFCLDhCQUFNLFlBQVksdUJBQXVCO0FBS3BFLFVBQU0sVUFBVSw2QkFBTTtBQUNwQixXQUFLLHVCQUF1QjtBQUFBLFFBQzFCLE1BQU07QUFBQSxRQUNOLE1BQU0sTUFBTSxLQUFLLE1BQU0sYUFBYTtBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNILEdBTGdCO0FBT2hCLFVBQU0sVUFBVSw2QkFBTTtBQUNwQixXQUFLLDJCQUNILFdBQ0EsS0FBSyxPQUNMLG1CQUFtQixLQUNyQjtBQUFBLElBQ0YsR0FOZ0I7QUFRaEIsVUFBTSxRQUFRO0FBQUEsTUFDWixZQUFZLEtBQUssTUFBTSxhQUFhLEtBQUssS0FBSyxLQUFLO0FBQUEsTUFDbkQsZ0JBQWdCLEtBQUssTUFBTSxJQUFJLElBQUk7QUFBQSxNQUNuQyxzQkFBc0IsS0FBSyxxQkFBcUIsS0FBSyxJQUFJO0FBQUEsTUFDekQseUJBQXlCLEtBQUssd0JBQXdCLEtBQUssSUFBSTtBQUFBLE1BQy9ELGNBQWMsS0FBSyxhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3pDLGtCQUFrQixLQUFLLGlCQUFpQixLQUFLLElBQUk7QUFBQSxNQUNqRCxxQkFBcUIsS0FBSyxvQkFBb0IsS0FBSyxJQUFJO0FBQUEsTUFDdkQseUJBQXlCLEtBQUssd0JBQXdCLEtBQUssSUFBSTtBQUFBLE1BQy9ELHdCQUF3QixLQUFLLHVCQUF1QixLQUFLLElBQUk7QUFBQSxNQUM3RCx1Q0FDRSxLQUFLLHNDQUFzQyxLQUFLLElBQUk7QUFBQSxNQUN0RCxvQkFBb0IsS0FBSyxtQkFBbUIsS0FBSyxJQUFJO0FBQUEsTUFDckQsc0JBQXNCLEtBQUsscUJBQXFCLEtBQUssSUFBSTtBQUFBLE1BQ3pELHVCQUF1QixLQUFLLE1BQU0sd0JBQXdCLEtBQ3hELEtBQUssS0FDUDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxXQUFXLE1BQU07QUFDZixhQUFLLDJCQUNILGFBQ0EsS0FBSyxPQUNMLG1CQUFtQixNQUNyQjtBQUFBLE1BQ0Y7QUFBQSxNQUNBLG1CQUFtQixLQUFLLGtCQUFrQixLQUFLLElBQUk7QUFBQSxNQUNuRCxtQ0FDRSxLQUFLLGtDQUFrQyxLQUFLLElBQUk7QUFBQSxNQUNsRCxtQ0FDRSxLQUFLLGtDQUFrQyxLQUFLLElBQUk7QUFBQSxJQUNwRDtBQUVBLFVBQU0sT0FBTyxJQUFJLHlDQUFpQjtBQUFBLE1BQ2hDLFdBQVc7QUFBQSxNQUNYLEtBQUssT0FBTyxPQUFPLE1BQU0sTUFBTSwwQkFDN0IsT0FBTyxZQUNQLEtBQ0Y7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLGNBQWM7QUFFcEIsU0FBSyxTQUFTLEVBQUUsTUFBTSxZQUFZLENBQUM7QUFDbkMsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUFBLEVBRUEsa0JBQWtCLFdBQXlCO0FBQ3pDLFVBQU0sVUFBVSxPQUFPLGtCQUFrQixRQUFRLFNBQVM7QUFDMUQsUUFBSSxDQUFDLFNBQVM7QUFDWixZQUFNLElBQUksTUFBTSw4QkFBOEIsb0JBQW9CO0FBQUEsSUFDcEU7QUFFQSxRQUFJLENBQUMsUUFBUSxlQUFlLEdBQUc7QUFDN0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxXQUFXLDZCQUFPO0FBQUEsU0FDbkIsUUFBUSx5QkFDVCxPQUFPLHVCQUF1Qiw0QkFBNEIsQ0FDNUQ7QUFBQSxTQUNHLEtBQUssa0JBQWtCO0FBQUEsSUFDNUIsSUFMaUI7QUFPakIsVUFBTSxVQUFVLDZCQUFNO0FBQ3BCLFdBQUssY0FBYyxTQUFTLFVBQVUsTUFBTTtBQUM1QyxXQUFLLFdBQVc7QUFBQSxJQUNsQixHQUhnQjtBQUtoQixVQUFNLE9BQU8sSUFBSSx5Q0FBaUI7QUFBQSxNQUNoQyxXQUFXO0FBQUEsTUFDWCxLQUFLLE9BQU8sT0FBTyxNQUFNLE1BQU0sb0JBQzdCLE9BQU8sWUFDUCxTQUFTLENBQ1g7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxTQUFTLDZCQUNiLEtBQUssT0FDSCxPQUFPLE9BQU8sTUFBTSxNQUFNLG9CQUN4QixPQUFPLFlBQ1AsU0FBUyxDQUNYLENBQ0YsR0FOYTtBQU9mLFNBQUssU0FBUyxTQUFTLFVBQVUsTUFBTTtBQUN2QyxTQUFLLFNBQVMsU0FBUyxXQUFXLE9BQU87QUFHekMsU0FBSyxTQUFTLEVBQUUsS0FBSyxDQUFDO0FBQ3RCLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLHFCQUEyQjtBQUN6QixVQUFNLE9BQU8sSUFBSSx5Q0FBaUI7QUFBQSxNQUNoQyxXQUFXLENBQUMsMkJBQTJCLE9BQU8sRUFBRSxLQUFLLEdBQUc7QUFBQSxNQUN4RCxLQUFLLE9BQU8sT0FBTyxNQUFNLE1BQU0scUJBQXFCLE9BQU8sVUFBVTtBQUFBLE1BQ3JFLFNBQVMsTUFBTTtBQUNiLGFBQUssV0FBVztBQUFBLE1BQ2xCO0FBQUEsSUFDRixDQUFDO0FBRUQsU0FBSyxTQUFTLEVBQUUsS0FBSyxDQUFDO0FBQ3RCLFNBQUssT0FBTztBQUFBLEVBQ2Q7QUFBQSxFQUVBLGtCQUFrQjtBQUFBLElBQ2hCO0FBQUEsSUFDQTtBQUFBLEtBT087QUFDUCxVQUFNLE9BQU8sSUFBSSx5Q0FBaUI7QUFBQSxNQUNoQyxXQUFXO0FBQUEsTUFDWCxLQUNFLG9DQUFDO0FBQUEsUUFDQyxNQUFNLE9BQU87QUFBQSxRQUNiO0FBQUEsUUFDQSxrQkFBa0IsUUFBUSxhQUFhO0FBQUEsUUFDdkMsZUFBZSxNQUFNO0FBQ25CLGNBQUksZUFBZTtBQUNqQixpQkFBSyxrQkFDSCxjQUFjLGFBQ2QsY0FBYyxJQUNoQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsT0FDRjtBQUFBLE1BRUYsU0FBUyxNQUFNO0FBQ2IsYUFBSyxXQUFXO0FBQUEsTUFDbEI7QUFBQSxJQUNGLENBQUM7QUFFRCxTQUFLLFNBQVMsRUFBRSxLQUFLLENBQUM7QUFBQSxFQUN4QjtBQUFBLEVBRUEsa0JBQWtCLE1BQWMsTUFBNEI7QUFDMUQsVUFBTSxpQkFBaUIsT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsTUFDcEU7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQ0Qsb0NBQ0UsZ0JBQ0Esa0NBQWtDLFFBQVEsa0JBQzVDO0FBRUEsU0FBSyxpQkFBaUIsY0FBYztBQUFBLEVBQ3RDO0FBQUEsUUFFTSxpQkFDSixnQkFDQSxXQUNlO0FBQ2YsV0FBTyxRQUFRLE9BQU8sUUFDcEIsb0JBQ0EsZ0JBQ0EsU0FDRjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFNBQVMsT0FBd0I7QUFDL0IsU0FBSyxTQUFTLEtBQUssVUFBVSxDQUFDO0FBRTlCLFFBQUksS0FBSyxPQUFPLFdBQVcsR0FBRztBQUM1QixXQUFLLGdCQUFnQixTQUFTO0FBQUEsSUFDaEM7QUFFQSxTQUFLLE9BQU8sUUFBUSxLQUFLO0FBQ3pCLFVBQU0sS0FBSyxJQUFJLFlBQVksS0FBSyxFQUFFLFFBQVEsRUFBRSxLQUFLLENBQUM7QUFDbEQsVUFBTSxLQUFLLElBQUksSUFBSSxnQkFBZ0IsTUFBTTtBQUN2QyxZQUFNLEtBQUssSUFBSSxTQUFTLGVBQWU7QUFBQSxJQUN6QyxDQUFDO0FBRUQsV0FBTyxhQUFhLGNBQWMsa0NBQ2hDLEtBQUssT0FBTyxNQUNkO0FBQ0EsV0FBTyxhQUFhLGNBQWMsbUNBQ2hDLE1BQU0sV0FDUjtBQUFBLEVBQ0Y7QUFBQSxFQUNBLGFBQW1CO0FBQ2pCLFFBQUksQ0FBQyxLQUFLLFVBQVUsQ0FBQyxLQUFLLE9BQU8sUUFBUTtBQUN2QztBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsS0FBSyxPQUFPLE1BQU07QUFFaEMsUUFDRSxLQUFLLE9BQU8sV0FBVyxLQUN2QixLQUFLLGlCQUNMLEtBQUssY0FBYyxPQUNuQjtBQUNBLFdBQUssY0FBYyxNQUFNO0FBQ3pCLFdBQUssZ0JBQWdCO0FBQUEsSUFDdkI7QUFFQSxRQUFJLEtBQUssT0FBTyxTQUFTLEdBQUc7QUFDMUIsV0FBSyxPQUFPLEdBQUcsS0FBSyxJQUFJLE9BQU8sR0FBRztBQUFBLElBQ3BDO0FBRUEsUUFBSSxPQUFPO0FBQ1QsWUFBTSxLQUFLLElBQUksU0FBUyxlQUFlLEVBQUUsSUFBSSxpQkFBaUIsTUFBTTtBQUNsRSxjQUFNLEtBQUssT0FBTztBQUVsQixZQUFJLEtBQUssT0FBTyxXQUFXLEdBQUc7QUFFNUIsaUJBQU8sY0FBYyxJQUFJLE1BQU0sUUFBUSxDQUFDO0FBQUEsUUFDMUM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBRUEsV0FBTyxhQUFhLGNBQWMsa0NBQ2hDLEtBQUssT0FBTyxNQUNkO0FBQ0EsV0FBTyxhQUFhLGNBQWMsbUNBQ2hDLEtBQUssT0FBTyxJQUFJLFdBQ2xCO0FBQUEsRUFDRjtBQUFBLFFBRU0scUJBQXFCLE9BQThCO0FBQ3ZELFVBQU0sRUFBRSxVQUF3QztBQUVoRCxVQUFNLFdBQ0osTUFBTSxPQUFPLE9BQU8sS0FBSyxzQ0FBc0MsTUFBTSxJQUFJO0FBQUEsTUFDdkU7QUFBQSxJQUNGLENBQUM7QUFFSCxVQUFNLHlCQUF5QixTQUM1QixPQUFPLGFBQVcsUUFBUSxnQkFBZ0IsTUFBUyxFQUNuRCxPQUNDLENBQUMsS0FBSyxZQUFZO0FBQUEsTUFDaEIsR0FBRztBQUFBLE1BQ0gsR0FBSSxTQUFRLGVBQWUsQ0FBQyxHQUFHLElBQzdCLENBQUMsWUFBNEIsVUFBaUM7QUFDNUQsY0FBTSxFQUFFLGNBQWM7QUFFdEIsZUFBTztBQUFBLFVBQ0wsV0FBVywwQkFBMEIsV0FBVyxRQUFRLEVBQUU7QUFBQSxVQUMxRCxvQkFBb0IsV0FBVyxPQUMzQiwwQkFBMEIsVUFBVSxJQUFJLElBQ3hDO0FBQUEsVUFDSixhQUFhLFdBQVc7QUFBQSxVQUN4QjtBQUFBLFVBQ0E7QUFBQSxVQUNBLFNBQVM7QUFBQSxZQUNQLGFBQWEsUUFBUSxlQUFlLENBQUM7QUFBQSxZQUNyQyxnQkFDRSxPQUFPLHVCQUF1QixJQUFJLFFBQVEsVUFBVSxHQUFHLE1BQ3ZELFFBQVE7QUFBQSxZQUNWLElBQUksUUFBUTtBQUFBLFlBQ1osYUFBYSxRQUFRO0FBQUEsWUFDckIsZ0JBQWdCLE9BQU8sUUFBUSxjQUFjO0FBQUEsWUFDN0MsU0FBUyxRQUFRO0FBQUEsVUFDbkI7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUNGO0FBQUEsSUFDRixHQUNBLENBQUMsQ0FDSDtBQUVGLFdBQU8sYUFBYSxjQUFjLG9CQUNoQyxNQUFNLElBQ04sc0JBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSx3QkFBd0IsU0FBZ0M7QUFDNUQsVUFBTSxFQUFFLFVBQXdDO0FBRWhELFVBQU0sYUFBYSxVQUFVLElBQUksVUFBVTtBQUUzQyxVQUFNLEtBQUssdUJBQXVCO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sTUFBTSxZQUNKLE1BQU0sc0JBQXNCLFlBQVk7QUFBQSxRQUN0QyxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsSUFDTCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sa0NBQWtDLE9BQThCO0FBQ3BFLFVBQU0sRUFBRSxVQUF3QztBQUVoRCxVQUFNLEtBQUssdUJBQXVCO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sTUFBTSxZQUFZLE1BQU0sOEJBQThCLEtBQUs7QUFBQSxJQUM3RCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sK0JBQStCLE9BQThCO0FBQ2pFLFVBQU0sRUFBRSxVQUF3QztBQUVoRCxVQUFNLEtBQUssdUJBQXVCO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sTUFBTSxZQUFZLE1BQU0sMkJBQTJCLEtBQUs7QUFBQSxJQUMxRCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0scUJBQXFCLE9BQStCO0FBQ3hELFVBQU0sRUFBRSxVQUF3QztBQUVoRCxVQUFNLEtBQUssdUJBQXVCO0FBQUEsTUFDaEMsTUFBTTtBQUFBLE1BQ04sTUFBTSxZQUFZLE1BQU0sd0JBQXdCLEtBQUs7QUFBQSxJQUN2RCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sa0JBQWlDO0FBQ3JDLFVBQU0sRUFBRSxVQUF3QztBQUVoRCxXQUFPLHVCQUF1QjtBQUFBLE1BQzVCLGNBQWM7QUFBQSxNQUNkLFNBQVMsT0FBTyxLQUFLLGdDQUFnQztBQUFBLE1BQ3JELFFBQVEsT0FBTyxLQUFLLFFBQVE7QUFBQSxNQUM1QixTQUFTLE1BQU07QUFDYixhQUFLLHVCQUF1QjtBQUFBLFVBQzFCLE1BQU07QUFBQSxVQUNOLE1BQU0sWUFBWTtBQUNoQixrQkFBTSxRQUFRLFVBQVUsaUJBQWlCO0FBQ3pDLGtCQUFNLE1BQU0sZ0JBQWdCO0FBQzVCLGtCQUFNLGtCQUFrQjtBQUFBLFVBQzFCO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0EsUUFBUSxNQUFNO0FBQ1osWUFBSSxLQUFLLHVDQUF1QztBQUFBLE1BQ2xEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sYUFBK0I7QUFDbkMsVUFBTSxXQUFXLE1BQU0sS0FBSyxxQkFBcUI7QUFDakQsUUFBSSxZQUFZLFNBQVMsUUFBUTtBQUMvQixZQUFNLGFBQWEsTUFBTSxLQUFLLHFCQUM1QixTQUFTLFFBQ1QsT0FBTyxLQUFLLFlBQVksQ0FDMUI7QUFDQSxVQUFJLENBQUMsWUFBWTtBQUNmLFlBQUksS0FDRixpRUFDRjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxxQkFDRSxVQUNBLGFBQ2tCO0FBQ2xCLFdBQU8sSUFBSSxRQUFRLGFBQVc7QUFDNUIsNEVBQTZCO0FBQUEsUUFDM0I7QUFBQSxRQUNBO0FBQUEsUUFDQSxRQUFRLE1BQU07QUFDWixrQkFBUSxLQUFLO0FBQUEsUUFDZjtBQUFBLFFBQ0EsU0FBUyxNQUFNO0FBQ2Isa0JBQVEsSUFBSTtBQUFBLFFBQ2Q7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxtQkFBbUIsU0FJUDtBQUNoQixVQUFNLEVBQUUsVUFBd0M7QUFFaEQsUUFBSTtBQUNGLFlBQU0sV0FBVyxNQUFNLEtBQUsscUJBQXFCLE9BQU87QUFFeEQsVUFBSSxZQUFZLFNBQVMsUUFBUTtBQUMvQixjQUFNLGFBQWEsTUFBTSxLQUFLLHFCQUFxQixTQUFTLE1BQU07QUFDbEUsWUFBSSxZQUFZO0FBQ2QsZUFBSyxtQkFBbUIsS0FBSyxTQUFTLE9BQU8sS0FBSyxDQUFDO0FBQUEsUUFDckQ7QUFFQTtBQUFBLE1BQ0Y7QUFFQSxVQUFJLEtBQUssd0JBQXdCLEdBQUc7QUFDbEM7QUFBQSxNQUNGO0FBRUEsWUFBTSxFQUFFLFFBQVEsY0FBYztBQUM5QixZQUFNLG1CQUFtQixRQUFRLFNBQVM7QUFBQSxJQUM1QyxTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQU0sb0JBQW9CLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUFLO0FBQUEsSUFDMUU7QUFBQSxFQUNGO0FBQUEsUUFFTSxxQkFDSixVQUErQixDQUFDLEdBQ2lCO0FBQ2pELFVBQU0sRUFBRSxVQUF3QztBQUloRCxVQUFNLE1BQU0sZUFBZTtBQUMzQixVQUFNLHFCQUFxQixNQUFNLGNBQWM7QUFFL0MsUUFBSSxRQUFRLE9BQU87QUFDakIsVUFBSSxtQkFBbUIsUUFBUTtBQUM3QixjQUFNLDhEQUF5QixtQkFBbUIsTUFBTTtBQUd4RCxnQkFBUSxRQUFRO0FBQUEsTUFDbEI7QUFBQSxJQUNGLFdBQVcsbUJBQW1CLFFBQVE7QUFDcEMsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLG9CQUFvQixNQUFNLGFBQWE7QUFFN0MsUUFBSSxRQUFRLE9BQU87QUFDakIsVUFBSSxrQkFBa0IsUUFBUTtBQUM1QixjQUFNLGdEQUFrQixrQkFBa0IsTUFBTTtBQUFBLE1BQ2xEO0FBQUEsSUFDRixXQUFXLGtCQUFrQixRQUFRO0FBQ25DLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLGdCQUFnQixXQUF5QztBQUM3RCxVQUFNLEVBQUUsVUFBVTtBQUNsQixVQUFNLFVBQVUsWUFBWSxNQUFNLDBDQUFlLFNBQVMsSUFBSTtBQUU5RCxRQUNFLFdBQ0EsQ0FBQyw2QkFDQyxRQUFRLFlBQ1IsT0FBTyx1QkFBdUIsNEJBQTRCLEdBQzFELGdEQUNGLEdBQ0E7QUFDQTtBQUFBLElBQ0Y7QUFFQSxRQUFJLFdBQVcsQ0FBQyxRQUFRLGVBQWUsR0FBRztBQUN4QztBQUFBLElBQ0Y7QUFFQSxTQUFLLFFBQVE7QUFDYixTQUFLLGdCQUFnQjtBQUVyQixVQUFNLFdBQVcsTUFBTSxJQUFJLGlCQUFpQjtBQUM1QyxRQUFJLGFBQWEsV0FBVztBQUMxQixZQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFVBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxXQUFXO0FBQzFDLFVBQUksWUFBWSxLQUFLLE1BQU0sSUFBSSxXQUFXO0FBRTFDLFVBQUksQ0FBQyxhQUFhLFdBQVc7QUFDM0Isb0JBQVk7QUFDWixvQkFBWTtBQUFBLE1BQ2Q7QUFFQSxXQUFLLE1BQU0sSUFBSTtBQUFBLFFBQ2I7QUFBQSxRQUNBLGNBQWM7QUFBQSxRQUNkLGlCQUFpQjtBQUFBLFFBQ2pCO0FBQUEsTUFDRixDQUFDO0FBRUQsWUFBTSxLQUFLLFVBQVU7QUFBQSxJQUN2QjtBQUVBLFFBQUksU0FBUztBQUNYLFdBQUssZ0JBQWdCO0FBQ3JCLFdBQUssUUFBUSxNQUFNLE1BQU0sVUFBVSxLQUFLLGFBQWE7QUFFckQsV0FBSyxtQkFBbUI7QUFDeEIsV0FBSyxrQkFBa0I7QUFBQSxJQUN6QjtBQUVBLFNBQUssb0JBQW9CO0FBQUEsRUFDM0I7QUFBQSxFQUVBLHNCQUE0QjtBQUMxQixVQUFNLEVBQUUsVUFBd0M7QUFFaEQsUUFBSSxDQUFDLEtBQUssZUFBZTtBQUN2QixhQUFPLGFBQWEsU0FBUyxpQkFBaUIsTUFBUztBQUN2RDtBQUFBLElBQ0Y7QUFFQSxXQUFPLGFBQWEsU0FBUyxpQkFBaUI7QUFBQSxNQUM1QyxnQkFBZ0IsTUFBTTtBQUFBLE1BQ3RCLE9BQU8sS0FBSztBQUFBLElBQ2QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLHdCQUF3QixhQUErQjtBQUNyRCxVQUFNLEVBQUUsVUFBd0M7QUFFaEQsUUFBSTtBQVNKLFFBQUksT0FBTyxXQUFXLFNBQVMsRUFBRSxXQUFXLFlBQVk7QUFDdEQsa0JBQVk7QUFBQSxJQUNkO0FBQ0EsUUFBSSxDQUFDLE1BQU0sUUFBUSxHQUFHO0FBQ3BCLGtCQUFZO0FBQUEsSUFDZDtBQUVBLFVBQU0sT0FBTyxLQUFLLE1BQU0sSUFBSSxNQUFNO0FBQ2xDLFVBQU0sT0FBTyxLQUFLLE1BQU0sSUFBSSxNQUFNO0FBQ2xDLFFBQ0Usd0RBQXFCLEtBQUssTUFBTSxVQUFVLEtBQ3hDLFNBQVEsT0FBTyxRQUFRLFFBQVEsVUFBVSxJQUFJLEtBQzVDLFFBQVEsT0FBTyxRQUFRLFFBQVEsY0FBYyxJQUFJLElBQ3BEO0FBQ0Esa0JBQVk7QUFBQSxJQUNkO0FBRUEsVUFBTSxVQUFVLEtBQUssTUFBTSxJQUFJLFNBQVM7QUFDeEMsUUFDRSxDQUFDLHdEQUFxQixLQUFLLE1BQU0sVUFBVSxLQUMzQyxXQUNBLE9BQU8sUUFBUSxRQUFRLGVBQWUsT0FBTyxHQUM3QztBQUNBLGtCQUFZO0FBQUEsSUFDZDtBQUVBLFFBQUksQ0FBQyx3REFBcUIsTUFBTSxVQUFVLEtBQUssTUFBTSxJQUFJLE1BQU0sR0FBRztBQUNoRSxrQkFBWTtBQUFBLElBQ2Q7QUFDQSxRQUFJLGVBQWUsWUFBWSxTQUFTLHlCQUF5QjtBQUMvRCxrQkFBWTtBQUFBLElBQ2Q7QUFFQSxRQUFJLFdBQVc7QUFDYixzQ0FBVSxTQUFTO0FBQ25CLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLFlBQ0osVUFBVSxJQUNWLFdBQTJCLENBQUMsR0FDNUIsVUFLSSxDQUFDLEdBQ1U7QUFDZixVQUFNLEVBQUUsVUFBd0M7QUFDaEQsVUFBTSxZQUFZLFFBQVEsYUFBYSxLQUFLLElBQUk7QUFFaEQsU0FBSyxZQUFZLEtBQUssSUFBSTtBQUUxQixRQUFJO0FBQ0YsV0FBSyxvQkFBb0I7QUFDekIsWUFBTSxXQUFXLE1BQU0sS0FBSyxxQkFBcUIsT0FBTztBQUV4RCxVQUFJLFlBQVksU0FBUyxRQUFRO0FBQy9CLGNBQU0sYUFBYSxNQUFNLEtBQUsscUJBQXFCLFNBQVMsTUFBTTtBQUNsRSxZQUFJLFlBQVk7QUFDZCxlQUFLLFlBQVksU0FBUyxVQUFVLEVBQUUsT0FBTyxNQUFNLFVBQVUsQ0FBQztBQUM5RDtBQUFBLFFBQ0Y7QUFFQSxhQUFLLG1CQUFtQjtBQUN4QjtBQUFBLE1BQ0Y7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNBLFdBQUssbUJBQW1CO0FBQ3hCLFVBQUksTUFDRixzQkFDQSxTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVEsS0FDdkM7QUFDQTtBQUFBLElBQ0Y7QUFFQSxVQUFNLGtCQUFrQjtBQUV4QixRQUFJLEtBQUssd0JBQXdCLE9BQU8sR0FBRztBQUN6QyxXQUFLLG1CQUFtQjtBQUN4QjtBQUFBLElBQ0Y7QUFFQSxRQUFJO0FBQ0YsVUFDRSxDQUFDLFFBQVEsVUFDVCxDQUFDLEtBQUssU0FBUyxFQUFFLGdCQUFnQixNQUFNLENBQUMsS0FDeEMsQ0FBQyxRQUFRLHFCQUNUO0FBQ0E7QUFBQSxNQUNGO0FBRUEsVUFBSSxjQUFxQyxDQUFDO0FBQzFDLFVBQUksUUFBUSxxQkFBcUI7QUFDL0Isc0JBQWMsQ0FBQyxRQUFRLG1CQUFtQjtBQUFBLE1BQzVDLFdBQVcsUUFBUSxrQkFBa0I7QUFDbkMsc0JBQ0UsT0FBTSxRQUFRLElBQ1osUUFBUSxpQkFBaUIsSUFBSSw0REFBMEIsQ0FDekQsR0FDQSxPQUFPLHdCQUFRO0FBQUEsTUFDbkI7QUFFQSxZQUFNLGVBQ0osT0FBTyxjQUNQLE9BQU8sV0FBVyxTQUFTLEVBQUUsU0FBUztBQUN4QyxZQUFNLFlBQVksS0FBSyxJQUFJLElBQUksS0FBSztBQUVwQyxVQUFJLEtBQUssd0JBQXdCLFdBQVcsY0FBYztBQUUxRCxZQUFNLHNCQUNKO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTjtBQUFBLFFBQ0EsT0FBTyxLQUFLO0FBQUEsUUFDWixTQUFTLDhDQUFzQixPQUFPO0FBQUEsUUFDdEM7QUFBQSxNQUNGLEdBQ0E7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0EsbUJBQW1CLE1BQU07QUFDdkIsZUFBSyxlQUFlLFNBQVMsTUFBTTtBQUNuQyxnQkFBTSxnQkFBZ0IsS0FBSztBQUMzQixlQUFLLGdCQUFnQixJQUFJO0FBQ3pCLG1EQUFpQjtBQUNqQixlQUFLLGlCQUFpQjtBQUN0QixpQkFBTyxhQUFhLFNBQVMsY0FBYztBQUFBLFFBQzdDO0FBQUEsTUFDRixDQUNGO0FBQUEsSUFDRixTQUFTLE9BQVA7QUFDQSxVQUFJLE1BQ0YsNENBQ0EsU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQ3ZDO0FBQUEsSUFDRixVQUFFO0FBQ0EsV0FBSyxtQkFBbUI7QUFBQSxJQUMxQjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLG9CQUNFLGFBQ0EsWUFDQSxlQUNNO0FBQ04sU0FBSyxnQkFBZ0IsV0FBVztBQUNoQyxTQUFLLG1CQUFtQixhQUFhLFVBQVU7QUFHL0MsUUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFLGdCQUFnQixLQUFLLENBQUMsR0FBRztBQUM1QyxtREFDRSxhQUNBLDBDQUFzQixVQUN0QixhQUNGO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLFVBQ0osYUFDQSxZQUNlO0FBQ2YsVUFBTSxFQUFFLFVBQXdDO0FBRWhELFVBQU0sVUFDSixlQUFlLFlBQVksU0FBUyxJQUFJLFlBQVksS0FBSyxJQUFJO0FBRS9ELFFBQUksTUFBTSxJQUFJLE9BQU8sS0FBTSxFQUFDLGVBQWUsUUFBUSxXQUFXLElBQUk7QUFDaEUsV0FBSyxNQUFNLElBQUk7QUFBQSxRQUNiLE9BQU87QUFBQSxRQUNQLGNBQWM7QUFBQSxRQUNkLGlCQUFpQixDQUFDO0FBQUEsTUFDcEIsQ0FBQztBQUNELFlBQU0sS0FBSyxVQUFVO0FBRXJCO0FBQUEsSUFDRjtBQUVBLFFBQUksZ0JBQWdCLE1BQU0sSUFBSSxPQUFPLEdBQUc7QUFDdEMsWUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFJLFlBQVksS0FBSyxNQUFNLElBQUksV0FBVztBQUMxQyxVQUFJLFlBQVksS0FBSyxNQUFNLElBQUksV0FBVztBQUUxQyxVQUFJLENBQUMsV0FBVztBQUNkLG9CQUFZO0FBQ1osb0JBQVk7QUFBQSxNQUNkO0FBRUEsV0FBSyxNQUFNLElBQUk7QUFBQSxRQUNiO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxpQkFBaUI7QUFBQSxRQUNqQixjQUFjO0FBQUEsUUFDZDtBQUFBLE1BQ0YsQ0FBQztBQUNELFlBQU0sS0FBSyxVQUFVO0FBQUEsSUFDdkI7QUFBQSxFQUNGO0FBQUEsRUFJQSxnQkFBZ0IsYUFBMkI7QUFDekMsUUFBSSxZQUFZLFVBQVUsS0FBSyxNQUFNLHFCQUFxQjtBQUN4RCxXQUFLLE1BQU0sb0JBQW9CO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0Y7QUF4dEZPLEFBMHRGUCxPQUFPLFFBQVEsbUJBQW1COyIsCiAgIm5hbWVzIjogW10KfQo=
