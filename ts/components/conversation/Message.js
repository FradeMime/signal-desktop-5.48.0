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
var Message_exports = {};
__export(Message_exports, {
  Directions: () => Directions,
  GiftBadgeStates: () => GiftBadgeStates,
  Message: () => Message,
  MessageStatuses: () => MessageStatuses,
  TextDirection: () => TextDirection
});
module.exports = __toCommonJS(Message_exports);
var import_react = __toESM(require("react"));
var import_react_dom = __toESM(require("react-dom"));
var import_classnames = __toESM(require("classnames"));
var import_direction = __toESM(require("direction"));
var import_lodash = require("lodash");
var import_react_contextmenu = require("react-contextmenu");
var import_react_popper = require("react-popper");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_Avatar = require("../Avatar");
var import_AvatarSpacer = require("../AvatarSpacer");
var import_Spinner = require("../Spinner");
var import_MessageBodyReadMore = require("./MessageBodyReadMore");
var import_MessageMetadata = require("./MessageMetadata");
var import_MessageTextMetadataSpacer = require("./MessageTextMetadataSpacer");
var import_ImageGrid = require("./ImageGrid");
var import_GIF = require("./GIF");
var import_Image = require("./Image");
var import_ContactName = require("./ContactName");
var import_Quote = require("./Quote");
var import_EmbeddedContact = require("./EmbeddedContact");
var import_ReactionViewer = require("./ReactionViewer");
var import_Emoji = require("../emoji/Emoji");
var import_LinkPreviewDate = require("./LinkPreviewDate");
var import_shouldUseFullSizeLinkPreviewImage = require("../../linkPreviews/shouldUseFullSizeLinkPreviewImage");
var import_util = require("../_util");
var import_OutgoingGiftBadgeModal = require("../OutgoingGiftBadgeModal");
var log = __toESM(require("../../logging/log"));
var import_Attachment = require("../../types/Attachment");
var import_timer = require("../../util/timer");
var import_clearTimeoutIfNecessary = require("../../util/clearTimeoutIfNecessary");
var import_isFileDangerous = require("../../util/isFileDangerous");
var import_missingCaseError = require("../../util/missingCaseError");
var import_refMerger = require("../../util/refMerger");
var import_lib = require("../emoji/lib");
var import_isEmojiOnlyText = require("../../util/isEmojiOnlyText");
var import_getCustomColorStyle = require("../../util/getCustomColorStyle");
var import_popperUtil = require("../../util/popperUtil");
var KeyboardLayout = __toESM(require("../../services/keyboardLayout"));
var import_StopPropagation = require("../StopPropagation");
var import_durations = require("../../util/durations");
var import_BadgeImageTheme = require("../../badges/BadgeImageTheme");
var import_getBadgeImageFileLocalPath = require("../../badges/getBadgeImageFileLocalPath");
const GUESS_METADATA_WIDTH_TIMESTAMP_SIZE = 10;
const GUESS_METADATA_WIDTH_EXPIRE_TIMER_SIZE = 18;
const GUESS_METADATA_WIDTH_OUTGOING_SIZE = {
  delivered: 24,
  error: 24,
  paused: 18,
  "partial-sent": 24,
  read: 24,
  sending: 18,
  sent: 24,
  viewed: 24
};
const EXPIRATION_CHECK_MINIMUM = 2e3;
const EXPIRED_DELAY = 600;
const GROUP_AVATAR_SIZE = import_Avatar.AvatarSize.TWENTY_EIGHT;
const STICKER_SIZE = 200;
const GIF_SIZE = 300;
const SELECTED_TIMEOUT = 1200;
const THREE_HOURS = 3 * 60 * 60 * 1e3;
const SENT_STATUSES = /* @__PURE__ */ new Set([
  "delivered",
  "read",
  "sent",
  "viewed"
]);
const GIFT_BADGE_UPDATE_INTERVAL = 30 * import_durations.SECOND;
var MetadataPlacement = /* @__PURE__ */ ((MetadataPlacement2) => {
  MetadataPlacement2[MetadataPlacement2["NotRendered"] = 0] = "NotRendered";
  MetadataPlacement2[MetadataPlacement2["RenderedByMessageAudioComponent"] = 1] = "RenderedByMessageAudioComponent";
  MetadataPlacement2[MetadataPlacement2["InlineWithText"] = 2] = "InlineWithText";
  MetadataPlacement2[MetadataPlacement2["Bottom"] = 3] = "Bottom";
  return MetadataPlacement2;
})(MetadataPlacement || {});
var TextDirection = /* @__PURE__ */ ((TextDirection2) => {
  TextDirection2["LeftToRight"] = "LeftToRight";
  TextDirection2["RightToLeft"] = "RightToLeft";
  TextDirection2["Default"] = "Default";
  TextDirection2["None"] = "None";
  return TextDirection2;
})(TextDirection || {});
const MessageStatuses = [
  "delivered",
  "error",
  "paused",
  "partial-sent",
  "read",
  "sending",
  "sent",
  "viewed"
];
const Directions = ["incoming", "outgoing"];
var GiftBadgeStates = /* @__PURE__ */ ((GiftBadgeStates2) => {
  GiftBadgeStates2["Unopened"] = "Unopened";
  GiftBadgeStates2["Opened"] = "Opened";
  GiftBadgeStates2["Redeemed"] = "Redeemed";
  return GiftBadgeStates2;
})(GiftBadgeStates || {});
class Message extends import_react.default.PureComponent {
  constructor(props) {
    super(props);
    this.focusRef = import_react.default.createRef();
    this.audioButtonRef = import_react.default.createRef();
    this.reactionsContainerRef = import_react.default.createRef();
    this.reactionsContainerRefMerger = (0, import_refMerger.createRefMerger)();
    this.captureMenuTrigger = /* @__PURE__ */ __name((triggerRef) => {
      this.menuTriggerRef = triggerRef;
    }, "captureMenuTrigger");
    this.showMenu = /* @__PURE__ */ __name((event) => {
      if (this.menuTriggerRef) {
        this.menuTriggerRef.handleContextClick(event);
      }
    }, "showMenu");
    this.showContextMenu = /* @__PURE__ */ __name((event) => {
      const selection = window.getSelection();
      if (selection && !selection.isCollapsed) {
        return;
      }
      if (event.target instanceof HTMLAnchorElement) {
        return;
      }
      this.showMenu(event);
    }, "showContextMenu");
    this.handleImageError = /* @__PURE__ */ __name(() => {
      const { id } = this.props;
      log.info(`Message ${id}: Image failed to load; failing over to placeholder`);
      this.setState({
        imageBroken: true
      });
    }, "handleImageError");
    this.handleFocus = /* @__PURE__ */ __name(() => {
      const { interactionMode } = this.props;
      if (interactionMode === "keyboard") {
        this.setSelected();
      }
    }, "handleFocus");
    this.setSelected = /* @__PURE__ */ __name(() => {
      const { id, conversationId, selectMessage } = this.props;
      if (selectMessage) {
        selectMessage(id, conversationId);
      }
    }, "setSelected");
    this.setFocus = /* @__PURE__ */ __name(() => {
      const container = this.focusRef.current;
      if (container && !container.contains(document.activeElement)) {
        container.focus();
      }
    }, "setFocus");
    this.updateMetadataWidth = /* @__PURE__ */ __name((newMetadataWidth) => {
      this.setState(({ metadataWidth }) => ({
        metadataWidth: Math.max(metadataWidth, newMetadataWidth)
      }));
    }, "updateMetadataWidth");
    this.toggleReactionViewer = /* @__PURE__ */ __name((onlyRemove = false) => {
      this.setState(({ reactionViewerRoot }) => {
        if (reactionViewerRoot) {
          document.body.removeChild(reactionViewerRoot);
          document.body.removeEventListener("click", this.handleClickOutsideReactionViewer, true);
          return { reactionViewerRoot: null };
        }
        if (!onlyRemove) {
          const root = document.createElement("div");
          document.body.appendChild(root);
          document.body.addEventListener("click", this.handleClickOutsideReactionViewer, true);
          return {
            reactionViewerRoot: root
          };
        }
        return null;
      });
    }, "toggleReactionViewer");
    this.toggleReactionPicker = /* @__PURE__ */ __name((onlyRemove = false) => {
      this.setState(({ reactionPickerRoot }) => {
        if (reactionPickerRoot) {
          document.body.removeChild(reactionPickerRoot);
          document.body.removeEventListener("click", this.handleClickOutsideReactionPicker, true);
          return { reactionPickerRoot: null };
        }
        if (!onlyRemove) {
          const root = document.createElement("div");
          document.body.appendChild(root);
          document.body.addEventListener("click", this.handleClickOutsideReactionPicker, true);
          return {
            reactionPickerRoot: root
          };
        }
        return null;
      });
    }, "toggleReactionPicker");
    this.handleClickOutsideReactionViewer = /* @__PURE__ */ __name((e) => {
      const { reactionViewerRoot } = this.state;
      const { current: reactionsContainer } = this.reactionsContainerRef;
      if (reactionViewerRoot && reactionsContainer) {
        if (!reactionViewerRoot.contains(e.target) && !reactionsContainer.contains(e.target)) {
          this.toggleReactionViewer(true);
        }
      }
    }, "handleClickOutsideReactionViewer");
    this.handleClickOutsideReactionPicker = /* @__PURE__ */ __name((e) => {
      const { reactionPickerRoot } = this.state;
      if (reactionPickerRoot) {
        if (!reactionPickerRoot.contains(e.target)) {
          this.toggleReactionPicker(true);
        }
      }
    }, "handleClickOutsideReactionPicker");
    this.handleOpen = /* @__PURE__ */ __name((event) => {
      const {
        attachments,
        contact,
        displayTapToViewMessage,
        direction,
        giftBadge,
        id,
        isTapToView,
        isTapToViewExpired,
        kickOffAttachmentDownload,
        openConversation,
        openGiftBadge,
        showContactDetail,
        showVisualAttachment,
        showExpiredIncomingTapToViewToast,
        showExpiredOutgoingTapToViewToast
      } = this.props;
      const { imageBroken } = this.state;
      const isAttachmentPending = this.isAttachmentPending();
      if (giftBadge && giftBadge.state === "Unopened" /* Unopened */) {
        openGiftBadge(id);
        return;
      }
      if (isTapToView) {
        if (isAttachmentPending) {
          log.info("<Message> handleOpen: tap-to-view attachment is pending; not showing the lightbox");
          return;
        }
        if (attachments && !(0, import_Attachment.isDownloaded)(attachments[0])) {
          event.preventDefault();
          event.stopPropagation();
          kickOffAttachmentDownload({
            attachment: attachments[0],
            messageId: id
          });
          return;
        }
        if (isTapToViewExpired) {
          const action = direction === "outgoing" ? showExpiredOutgoingTapToViewToast : showExpiredIncomingTapToViewToast;
          action();
        } else {
          event.preventDefault();
          event.stopPropagation();
          displayTapToViewMessage(id);
        }
        return;
      }
      if (!imageBroken && attachments && attachments.length > 0 && !isAttachmentPending && ((0, import_Attachment.isImage)(attachments) || (0, import_Attachment.isVideo)(attachments)) && !(0, import_Attachment.isDownloaded)(attachments[0])) {
        event.preventDefault();
        event.stopPropagation();
        const attachment = attachments[0];
        kickOffAttachmentDownload({ attachment, messageId: id });
        return;
      }
      if (!imageBroken && attachments && attachments.length > 0 && !isAttachmentPending && (0, import_Attachment.canDisplayImage)(attachments) && ((0, import_Attachment.isImage)(attachments) && (0, import_Attachment.hasImage)(attachments) || (0, import_Attachment.isVideo)(attachments) && (0, import_Attachment.hasVideoScreenshot)(attachments))) {
        event.preventDefault();
        event.stopPropagation();
        const attachment = attachments[0];
        showVisualAttachment({ attachment, messageId: id });
        return;
      }
      if (attachments && attachments.length === 1 && !isAttachmentPending && !(0, import_Attachment.isAudio)(attachments)) {
        event.preventDefault();
        event.stopPropagation();
        this.openGenericAttachment();
        return;
      }
      if (!isAttachmentPending && (0, import_Attachment.isAudio)(attachments) && this.audioButtonRef && this.audioButtonRef.current) {
        event.preventDefault();
        event.stopPropagation();
        this.audioButtonRef.current.click();
      }
      if (contact && contact.firstNumber && contact.uuid) {
        openConversation(contact.firstNumber);
        event.preventDefault();
        event.stopPropagation();
      }
      if (contact) {
        const signalAccount = contact.firstNumber && contact.uuid ? {
          phoneNumber: contact.firstNumber,
          uuid: contact.uuid
        } : void 0;
        showContactDetail({ contact, signalAccount });
        event.preventDefault();
        event.stopPropagation();
      }
    }, "handleOpen");
    this.openGenericAttachment = /* @__PURE__ */ __name((event) => {
      const {
        id,
        attachments,
        downloadAttachment,
        timestamp,
        kickOffAttachmentDownload
      } = this.props;
      if (event) {
        event.preventDefault();
        event.stopPropagation();
      }
      if (!attachments || attachments.length !== 1) {
        return;
      }
      const attachment = attachments[0];
      if (!(0, import_Attachment.isDownloaded)(attachment)) {
        kickOffAttachmentDownload({
          attachment,
          messageId: id
        });
        return;
      }
      const { fileName } = attachment;
      const isDangerous = (0, import_isFileDangerous.isFileDangerous)(fileName || "");
      downloadAttachment({
        isDangerous,
        attachment,
        timestamp
      });
    }, "openGenericAttachment");
    this.handleKeyDown = /* @__PURE__ */ __name((event) => {
      const { canReact } = this.props;
      const key = KeyboardLayout.lookup(event.nativeEvent);
      if ((key === "E" || key === "e") && (event.metaKey || event.ctrlKey) && event.shiftKey && canReact) {
        this.toggleReactionPicker();
      }
      if (event.key !== "Enter" && event.key !== "Space") {
        return;
      }
      this.handleOpen(event);
    }, "handleKeyDown");
    this.handleClick = /* @__PURE__ */ __name((event) => {
      const { text } = this.props;
      if (text && text.length > 0) {
        return;
      }
      this.handleOpen(event);
    }, "handleClick");
    this.state = {
      metadataWidth: this.guessMetadataWidth(),
      expiring: false,
      expired: false,
      imageBroken: false,
      isSelected: props.isSelected,
      prevSelectedCounter: props.isSelectedCounter,
      reactionViewerRoot: null,
      reactionPickerRoot: null,
      giftBadgeCounter: null,
      showOutgoingGiftBadgeModal: false,
      hasDeleteForEveryoneTimerExpired: this.getTimeRemainingForDeleteForEveryone() <= 0
    };
  }
  static getDerivedStateFromProps(props, state) {
    if (!props.isSelected) {
      return {
        ...state,
        isSelected: false,
        prevSelectedCounter: 0
      };
    }
    if (props.isSelected && props.isSelectedCounter !== state.prevSelectedCounter) {
      return {
        ...state,
        isSelected: props.isSelected,
        prevSelectedCounter: props.isSelectedCounter
      };
    }
    return state;
  }
  hasReactions() {
    const { reactions } = this.props;
    return Boolean(reactions && reactions.length);
  }
  componentDidMount() {
    const { conversationId } = this.props;
    window.ConversationController?.onConvoMessageMount(conversationId);
    this.startSelectedTimer();
    this.startDeleteForEveryoneTimerIfApplicable();
    this.startGiftBadgeInterval();
    const { isSelected } = this.props;
    if (isSelected) {
      this.setFocus();
    }
    const { expirationLength } = this.props;
    if (expirationLength) {
      const increment = (0, import_timer.getIncrement)(expirationLength);
      const checkFrequency = Math.max(EXPIRATION_CHECK_MINIMUM, increment);
      this.checkExpired();
      this.expirationCheckInterval = setInterval(() => {
        this.checkExpired();
      }, checkFrequency);
    }
    const { contact, checkForAccount } = this.props;
    if (contact && contact.firstNumber && !contact.uuid) {
      checkForAccount(contact.firstNumber);
    }
  }
  componentWillUnmount() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.selectedTimeout);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.expirationCheckInterval);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.expiredTimeout);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.deleteForEveryoneTimeout);
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.giftBadgeInterval);
    this.toggleReactionViewer(true);
    this.toggleReactionPicker(true);
  }
  componentDidUpdate(prevProps) {
    const { isSelected, status, timestamp } = this.props;
    this.startSelectedTimer();
    this.startDeleteForEveryoneTimerIfApplicable();
    if (!prevProps.isSelected && isSelected) {
      this.setFocus();
    }
    this.checkExpired();
    if (prevProps.status === "sending" && (status === "sent" || status === "delivered" || status === "read" || status === "viewed")) {
      const delta = Date.now() - timestamp;
      window.CI?.handleEvent("message:send-complete", {
        timestamp,
        delta
      });
      log.info(`Message.tsx: Rendered 'send complete' for message ${timestamp}; took ${delta}ms`);
    }
  }
  getMetadataPlacement({
    attachments,
    deletedForEveryone,
    expirationLength,
    expirationTimestamp,
    giftBadge,
    i18n,
    shouldHideMetadata,
    status,
    text,
    textDirection
  } = this.props) {
    const isRTL = textDirection === "RightToLeft" /* RightToLeft */;
    if (!expirationLength && !expirationTimestamp && (!status || SENT_STATUSES.has(status)) && shouldHideMetadata) {
      return 0 /* NotRendered */;
    }
    if (giftBadge) {
      const description = i18n("message--giftBadge--unopened");
      const isDescriptionRTL = (0, import_direction.default)(description) === "rtl";
      if (giftBadge.state === "Unopened" /* Unopened */ && !isDescriptionRTL) {
        return 2 /* InlineWithText */;
      }
      return 3 /* Bottom */;
    }
    if (!text && !deletedForEveryone) {
      return (0, import_Attachment.isAudio)(attachments) ? 1 /* RenderedByMessageAudioComponent */ : 3 /* Bottom */;
    }
    if (this.canRenderStickerLikeEmoji()) {
      return 3 /* Bottom */;
    }
    if (isRTL) {
      return 3 /* Bottom */;
    }
    return 2 /* InlineWithText */;
  }
  guessMetadataWidth() {
    const { direction, expirationLength, status } = this.props;
    let result = GUESS_METADATA_WIDTH_TIMESTAMP_SIZE;
    const hasExpireTimer = Boolean(expirationLength);
    if (hasExpireTimer) {
      result += GUESS_METADATA_WIDTH_EXPIRE_TIMER_SIZE;
    }
    if (direction === "outgoing" && status) {
      result += GUESS_METADATA_WIDTH_OUTGOING_SIZE[status];
    }
    return result;
  }
  startSelectedTimer() {
    const { clearSelectedMessage, interactionMode } = this.props;
    const { isSelected } = this.state;
    if (interactionMode === "keyboard" || !isSelected) {
      return;
    }
    if (!this.selectedTimeout) {
      this.selectedTimeout = setTimeout(() => {
        this.selectedTimeout = void 0;
        this.setState({ isSelected: false });
        clearSelectedMessage();
      }, SELECTED_TIMEOUT);
    }
  }
  startGiftBadgeInterval() {
    const { giftBadge } = this.props;
    if (!giftBadge) {
      return;
    }
    this.giftBadgeInterval = setInterval(() => {
      this.updateGiftBadgeCounter();
    }, GIFT_BADGE_UPDATE_INTERVAL);
  }
  updateGiftBadgeCounter() {
    this.setState((state) => ({
      giftBadgeCounter: (state.giftBadgeCounter || 0) + 1
    }));
  }
  getTimeRemainingForDeleteForEveryone() {
    const { timestamp } = this.props;
    return Math.max(timestamp - Date.now() + THREE_HOURS, 0);
  }
  canDeleteForEveryone() {
    const { canDeleteForEveryone } = this.props;
    const { hasDeleteForEveryoneTimerExpired } = this.state;
    return canDeleteForEveryone && !hasDeleteForEveryoneTimerExpired;
  }
  startDeleteForEveryoneTimerIfApplicable() {
    const { canDeleteForEveryone } = this.props;
    const { hasDeleteForEveryoneTimerExpired } = this.state;
    if (!canDeleteForEveryone || hasDeleteForEveryoneTimerExpired || this.deleteForEveryoneTimeout) {
      return;
    }
    this.deleteForEveryoneTimeout = setTimeout(() => {
      this.setState({ hasDeleteForEveryoneTimerExpired: true });
      delete this.deleteForEveryoneTimeout;
    }, this.getTimeRemainingForDeleteForEveryone());
  }
  checkExpired() {
    const now = Date.now();
    const { expirationTimestamp, expirationLength } = this.props;
    if (!expirationTimestamp || !expirationLength) {
      return;
    }
    if (this.expiredTimeout) {
      return;
    }
    if (now >= expirationTimestamp) {
      this.setState({
        expiring: true
      });
      const setExpired = /* @__PURE__ */ __name(() => {
        this.setState({
          expired: true
        });
      }, "setExpired");
      this.expiredTimeout = setTimeout(setExpired, EXPIRED_DELAY);
    }
  }
  areLinksEnabled() {
    const { isMessageRequestAccepted, isBlocked } = this.props;
    return isMessageRequestAccepted && !isBlocked;
  }
  shouldRenderAuthor() {
    const { author, conversationType, direction, shouldCollapseAbove } = this.props;
    return Boolean(direction === "incoming" && conversationType === "group" && author.title && !shouldCollapseAbove);
  }
  canRenderStickerLikeEmoji() {
    const { text, quote, attachments, previews } = this.props;
    return Boolean(text && (0, import_isEmojiOnlyText.isEmojiOnlyText)(text) && (0, import_lib.getEmojiCount)(text) < 6 && !quote && (!attachments || !attachments.length) && (!previews || !previews.length));
  }
  renderMetadata() {
    let isInline;
    const metadataPlacement = this.getMetadataPlacement();
    switch (metadataPlacement) {
      case 0 /* NotRendered */:
      case 1 /* RenderedByMessageAudioComponent */:
        return null;
      case 2 /* InlineWithText */:
        isInline = true;
        break;
      case 3 /* Bottom */:
        isInline = false;
        break;
      default:
        log.error((0, import_missingCaseError.missingCaseError)(metadataPlacement));
        isInline = false;
        break;
    }
    const {
      deletedForEveryone,
      direction,
      expirationLength,
      expirationTimestamp,
      isSticker,
      isTapToViewExpired,
      status,
      i18n,
      text,
      textAttachment,
      timestamp,
      id,
      showMessageDetail
    } = this.props;
    const isStickerLike = isSticker || this.canRenderStickerLikeEmoji();
    return /* @__PURE__ */ import_react.default.createElement(import_MessageMetadata.MessageMetadata, {
      deletedForEveryone,
      direction,
      expirationLength,
      expirationTimestamp,
      hasText: Boolean(text),
      i18n,
      id,
      isInline,
      isShowingImage: this.isShowingImage(),
      isSticker: isStickerLike,
      isTapToViewExpired,
      onWidthMeasured: isInline ? this.updateMetadataWidth : void 0,
      showMessageDetail,
      status,
      textPending: textAttachment?.pending,
      timestamp
    });
  }
  renderAuthor() {
    const {
      author,
      contactNameColor,
      isSticker,
      isTapToView,
      isTapToViewExpired
    } = this.props;
    if (!this.shouldRenderAuthor()) {
      return null;
    }
    const withTapToViewExpired = isTapToView && isTapToViewExpired;
    const stickerSuffix = isSticker ? "_with_sticker" : "";
    const tapToViewSuffix = withTapToViewExpired ? "--with-tap-to-view-expired" : "";
    const moduleName = `module-message__author${stickerSuffix}${tapToViewSuffix}`;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: moduleName
    }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      contactNameColor,
      title: author.title,
      module: moduleName
    }));
  }
  renderAttachment() {
    const {
      attachments,
      direction,
      expirationLength,
      expirationTimestamp,
      i18n,
      id,
      isSticker,
      kickOffAttachmentDownload,
      markAttachmentAsCorrupted,
      markViewed,
      quote,
      readStatus,
      reducedMotion,
      renderAudioAttachment,
      renderingContext,
      showMessageDetail,
      showVisualAttachment,
      shouldCollapseAbove,
      shouldCollapseBelow,
      status,
      text,
      textAttachment,
      theme,
      timestamp
    } = this.props;
    const { imageBroken } = this.state;
    const collapseMetadata = this.getMetadataPlacement() === 0 /* NotRendered */;
    if (!attachments || !attachments[0]) {
      return null;
    }
    const firstAttachment = attachments[0];
    const withContentBelow = Boolean(text);
    const withContentAbove = Boolean(quote) || this.shouldRenderAuthor();
    const displayImage = (0, import_Attachment.canDisplayImage)(attachments);
    if (displayImage && !imageBroken) {
      const prefix = isSticker ? "sticker" : "attachment";
      const containerClassName = (0, import_classnames.default)(`module-message__${prefix}-container`, withContentAbove ? `module-message__${prefix}-container--with-content-above` : null, withContentBelow ? "module-message__attachment-container--with-content-below" : null, isSticker && !collapseMetadata ? "module-message__sticker-container--with-content-below" : null);
      if ((0, import_Attachment.isGIF)(attachments)) {
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: containerClassName
        }, /* @__PURE__ */ import_react.default.createElement(import_GIF.GIF, {
          attachment: firstAttachment,
          size: GIF_SIZE,
          theme,
          i18n,
          tabIndex: 0,
          reducedMotion,
          onError: this.handleImageError,
          showVisualAttachment: () => {
            showVisualAttachment({
              attachment: firstAttachment,
              messageId: id
            });
          },
          kickOffAttachmentDownload: () => {
            kickOffAttachmentDownload({
              attachment: firstAttachment,
              messageId: id
            });
          }
        }));
      }
      if ((0, import_Attachment.isImage)(attachments) || (0, import_Attachment.isVideo)(attachments)) {
        const bottomOverlay = !isSticker && !collapseMetadata;
        const tabIndex = attachments.length > 1 ? 0 : -1;
        return /* @__PURE__ */ import_react.default.createElement("div", {
          className: containerClassName
        }, /* @__PURE__ */ import_react.default.createElement(import_ImageGrid.ImageGrid, {
          attachments,
          direction,
          withContentAbove: isSticker || withContentAbove,
          withContentBelow: isSticker || withContentBelow,
          isSticker,
          stickerSize: STICKER_SIZE,
          bottomOverlay,
          i18n,
          onError: this.handleImageError,
          theme,
          shouldCollapseAbove,
          shouldCollapseBelow,
          tabIndex,
          onClick: (attachment) => {
            if (!(0, import_Attachment.isDownloaded)(attachment)) {
              kickOffAttachmentDownload({ attachment, messageId: id });
            } else {
              showVisualAttachment({ attachment, messageId: id });
            }
          }
        }));
      }
    }
    if ((0, import_Attachment.isAudio)(attachments)) {
      let played;
      switch (direction) {
        case "outgoing":
          played = status === "viewed";
          break;
        case "incoming":
          played = readStatus === import_MessageReadStatus.ReadStatus.Viewed;
          break;
        default:
          log.error((0, import_missingCaseError.missingCaseError)(direction));
          played = false;
          break;
      }
      return renderAudioAttachment({
        i18n,
        buttonRef: this.audioButtonRef,
        renderingContext,
        theme,
        attachment: firstAttachment,
        collapseMetadata,
        withContentAbove,
        withContentBelow,
        direction,
        expirationLength,
        expirationTimestamp,
        id,
        played,
        showMessageDetail,
        status,
        textPending: textAttachment?.pending,
        timestamp,
        kickOffAttachmentDownload() {
          kickOffAttachmentDownload({
            attachment: firstAttachment,
            messageId: id
          });
        },
        onCorrupted() {
          markAttachmentAsCorrupted({
            attachment: firstAttachment,
            messageId: id
          });
        },
        onFirstPlayed() {
          markViewed(id);
        }
      });
    }
    const { pending, fileName, fileSize, contentType } = firstAttachment;
    const extension = (0, import_Attachment.getExtensionForDisplay)({ contentType, fileName });
    const isDangerous = (0, import_isFileDangerous.isFileDangerous)(fileName || "");
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: (0, import_classnames.default)("module-message__generic-attachment", withContentBelow ? "module-message__generic-attachment--with-content-below" : null, withContentAbove ? "module-message__generic-attachment--with-content-above" : null, !firstAttachment.url ? "module-message__generic-attachment--not-active" : null),
      tabIndex: -1,
      onClick: this.openGenericAttachment
    }, pending ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      svgSize: "small",
      size: "24px",
      direction
    })) : /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__icon-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__icon"
    }, extension ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__icon__extension"
    }, extension) : null), isDangerous ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__icon-dangerous-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__icon-dangerous"
    })) : null), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__generic-attachment__text"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__generic-attachment__file-name", `module-message__generic-attachment__file-name--${direction}`)
    }, fileName), /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__generic-attachment__file-size", `module-message__generic-attachment__file-size--${direction}`)
    }, fileSize)));
  }
  renderPreview() {
    const {
      attachments,
      conversationType,
      direction,
      i18n,
      id,
      kickOffAttachmentDownload,
      openLink,
      previews,
      quote,
      shouldCollapseAbove,
      theme
    } = this.props;
    if (attachments && attachments.length) {
      return null;
    }
    if (!previews || previews.length < 1) {
      return null;
    }
    const first = previews[0];
    if (!first) {
      return null;
    }
    const withContentAbove = Boolean(quote) || !shouldCollapseAbove && conversationType === "group" && direction === "incoming";
    const previewHasImage = (0, import_Attachment.isImageAttachment)(first.image);
    const isFullSizeImage = (0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)(first);
    const linkPreviewDate = first.date || null;
    const isClickable = this.areLinksEnabled();
    const className = (0, import_classnames.default)("module-message__link-preview", `module-message__link-preview--${direction}`, {
      "module-message__link-preview--with-content-above": withContentAbove,
      "module-message__link-preview--nonclickable": !isClickable
    });
    const onPreviewImageClick = /* @__PURE__ */ __name(() => {
      if (first.image && !(0, import_Attachment.isDownloaded)(first.image)) {
        kickOffAttachmentDownload({
          attachment: first.image,
          messageId: id
        });
        return;
      }
      openLink(first.url);
    }, "onPreviewImageClick");
    const contents = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, first.image && previewHasImage && isFullSizeImage ? /* @__PURE__ */ import_react.default.createElement(import_ImageGrid.ImageGrid, {
      attachments: [first.image],
      withContentAbove,
      direction,
      shouldCollapseAbove,
      withContentBelow: true,
      onError: this.handleImageError,
      i18n,
      theme,
      onClick: onPreviewImageClick
    }) : null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__content"
    }, first.image && first.domain && previewHasImage && !isFullSizeImage ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__icon_container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Image.Image, {
      noBorder: true,
      noBackground: true,
      curveBottomLeft: withContentAbove ? import_Image.CurveType.Tiny : import_Image.CurveType.Small,
      curveBottomRight: import_Image.CurveType.Tiny,
      curveTopRight: import_Image.CurveType.Tiny,
      curveTopLeft: import_Image.CurveType.Tiny,
      alt: i18n("previewThumbnail", [first.domain]),
      height: 72,
      width: 72,
      url: first.image.url,
      attachment: first.image,
      blurHash: first.image.blurHash,
      onError: this.handleImageError,
      i18n,
      onClick: onPreviewImageClick
    })) : null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__link-preview__text", previewHasImage && !isFullSizeImage ? "module-message__link-preview__text--with-icon" : null)
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__title"
    }, first.title), first.description && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__description"
    }, (0, import_lodash.unescape)(first.description)), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__footer"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__link-preview__location"
    }, first.domain), /* @__PURE__ */ import_react.default.createElement(import_LinkPreviewDate.LinkPreviewDate, {
      date: linkPreviewDate,
      className: "module-message__link-preview__date"
    })))));
    return isClickable ? /* @__PURE__ */ import_react.default.createElement("div", {
      role: "link",
      tabIndex: 0,
      className,
      onKeyDown: (event) => {
        if (event.key === "Enter" || event.key === "Space") {
          event.stopPropagation();
          event.preventDefault();
          openLink(first.url);
        }
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        openLink(first.url);
      }
    }, contents) : /* @__PURE__ */ import_react.default.createElement("div", {
      className
    }, contents);
  }
  renderGiftBadge() {
    const { conversationTitle, direction, getPreferredBadge, giftBadge, i18n } = this.props;
    const { showOutgoingGiftBadgeModal } = this.state;
    if (!giftBadge) {
      return null;
    }
    if (giftBadge.state === "Unopened" /* Unopened */) {
      const description = i18n(`message--giftBadge--unopened--${direction}`);
      const isRTL = (0, import_direction.default)(description) === "rtl";
      const { metadataWidth } = this.state;
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__unopened-gift-badge__container"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("module-message__unopened-gift-badge", `module-message__unopened-gift-badge--${direction}`),
        "aria-label": i18n("message--giftBadge--unopened--label")
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__unopened-gift-badge__ribbon-horizontal",
        "aria-hidden": true
      }), /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__unopened-gift-badge__ribbon-vertical",
        "aria-hidden": true
      }), /* @__PURE__ */ import_react.default.createElement("img", {
        className: "module-message__unopened-gift-badge__bow",
        src: "images/gift-bow.svg",
        alt: "",
        "aria-hidden": true
      })), /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("module-message__unopened-gift-badge__text", `module-message__unopened-gift-badge__text--${direction}`)
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("module-message__text", `module-message__text--${direction}`),
        dir: isRTL ? "rtl" : void 0
      }, description, this.getMetadataPlacement() === 2 /* InlineWithText */ && /* @__PURE__ */ import_react.default.createElement(import_MessageTextMetadataSpacer.MessageTextMetadataSpacer, {
        metadataWidth
      })), this.renderMetadata()));
    }
    if (giftBadge.state === "Redeemed" /* Redeemed */ || giftBadge.state === "Opened" /* Opened */) {
      const badgeId = giftBadge.id || `BOOST-${giftBadge.level}`;
      const badgeSize = 64;
      const badge = getPreferredBadge([{ id: badgeId }]);
      const badgeImagePath = (0, import_getBadgeImageFileLocalPath.getBadgeImageFileLocalPath)(badge, badgeSize, import_BadgeImageTheme.BadgeImageTheme.Transparent);
      let remaining;
      const duration = giftBadge.expiration - Date.now();
      const remainingDays = Math.floor(duration / import_durations.DAY);
      const remainingHours = Math.floor(duration / import_durations.HOUR);
      const remainingMinutes = Math.floor(duration / import_durations.MINUTE);
      if (remainingDays > 1) {
        remaining = i18n("message--giftBadge--remaining--days", {
          days: remainingDays
        });
      } else if (remainingHours > 1) {
        remaining = i18n("message--giftBadge--remaining--hours", {
          hours: remainingHours
        });
      } else if (remainingMinutes > 1) {
        remaining = i18n("message--giftBadge--remaining--minutes", {
          minutes: remainingMinutes
        });
      } else if (remainingMinutes === 1) {
        remaining = i18n("message--giftBadge--remaining--one-minute");
      } else {
        remaining = i18n("message--giftBadge--expired");
      }
      const wasSent = direction === "outgoing";
      const buttonContents = wasSent ? i18n("message--giftBadge--view") : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", {
        className: (0, import_classnames.default)("module-message__redeemed-gift-badge__icon-check", `module-message__redeemed-gift-badge__icon-check--${direction}`)
      }), " ", i18n("message--giftBadge--redeemed"));
      const badgeElement = badge ? /* @__PURE__ */ import_react.default.createElement("img", {
        className: "module-message__redeemed-gift-badge__badge",
        src: badgeImagePath,
        alt: badge.name
      }) : /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("module-message__redeemed-gift-badge__badge", `module-message__redeemed-gift-badge__badge--missing-${direction}`),
        "aria-label": i18n("giftBadge--missing")
      });
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__redeemed-gift-badge__container"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__redeemed-gift-badge"
      }, badgeElement, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__redeemed-gift-badge__text"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__redeemed-gift-badge__title"
      }, i18n("message--giftBadge")), /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)("module-message__redeemed-gift-badge__remaining", `module-message__redeemed-gift-badge__remaining--${direction}`)
      }, remaining))), /* @__PURE__ */ import_react.default.createElement("button", {
        className: (0, import_classnames.default)("module-message__redeemed-gift-badge__button", `module-message__redeemed-gift-badge__button--${direction}`),
        disabled: !wasSent,
        onClick: wasSent ? () => this.setState({ showOutgoingGiftBadgeModal: true }) : void 0,
        type: "button"
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-message__redeemed-gift-badge__button__text"
      }, buttonContents)), this.renderMetadata(), showOutgoingGiftBadgeModal ? /* @__PURE__ */ import_react.default.createElement(import_OutgoingGiftBadgeModal.OutgoingGiftBadgeModal, {
        i18n,
        recipientTitle: conversationTitle,
        badgeId,
        getPreferredBadge,
        hideOutgoingGiftBadgeModal: () => this.setState({ showOutgoingGiftBadgeModal: false })
      }) : null);
    }
    throw (0, import_missingCaseError.missingCaseError)(giftBadge.state);
  }
  renderQuote() {
    const {
      conversationColor,
      customColor,
      direction,
      disableScroll,
      doubleCheckMissingQuoteReference,
      i18n,
      id,
      quote,
      scrollToQuotedMessage
    } = this.props;
    if (!quote) {
      return null;
    }
    const { isGiftBadge, isViewOnce, referencedMessageNotFound } = quote;
    const clickHandler = disableScroll ? void 0 : () => {
      scrollToQuotedMessage({
        authorId: quote.authorId,
        sentAt: quote.sentAt
      });
    };
    const isIncoming = direction === "incoming";
    return /* @__PURE__ */ import_react.default.createElement(import_Quote.Quote, {
      i18n,
      onClick: clickHandler,
      text: quote.text,
      rawAttachment: quote.rawAttachment,
      isIncoming,
      authorTitle: quote.authorTitle,
      bodyRanges: quote.bodyRanges,
      conversationColor,
      customColor,
      isViewOnce,
      isGiftBadge,
      referencedMessageNotFound,
      isFromMe: quote.isFromMe,
      doubleCheckMissingQuoteReference: () => doubleCheckMissingQuoteReference(id)
    });
  }
  renderStoryReplyContext() {
    const {
      conversationColor,
      customColor,
      direction,
      i18n,
      storyReplyContext
    } = this.props;
    if (!storyReplyContext) {
      return null;
    }
    const isIncoming = direction === "incoming";
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, storyReplyContext.emoji && /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__quote-story-reaction-header"
    }, i18n("Quote__story-reaction", [storyReplyContext.authorTitle])), /* @__PURE__ */ import_react.default.createElement(import_Quote.Quote, {
      authorTitle: storyReplyContext.authorTitle,
      conversationColor,
      customColor,
      i18n,
      isFromMe: storyReplyContext.isFromMe,
      isGiftBadge: false,
      isIncoming,
      isStoryReply: true,
      isViewOnce: false,
      moduleClassName: "StoryReplyQuote",
      onClick: () => {
      },
      rawAttachment: storyReplyContext.rawAttachment,
      reactionEmoji: storyReplyContext.emoji,
      referencedMessageNotFound: Boolean(storyReplyContext.referencedMessageNotFound),
      text: storyReplyContext.text
    }));
  }
  renderEmbeddedContact() {
    const {
      contact,
      conversationType,
      direction,
      i18n,
      showContactDetail,
      text
    } = this.props;
    if (!contact) {
      return null;
    }
    const withCaption = Boolean(text);
    const withContentAbove = conversationType === "group" && direction === "incoming";
    const withContentBelow = withCaption || this.getMetadataPlacement() !== 0 /* NotRendered */;
    const otherContent = contact && contact.firstNumber && contact.uuid || withCaption;
    const tabIndex = otherContent ? 0 : -1;
    return /* @__PURE__ */ import_react.default.createElement(import_EmbeddedContact.EmbeddedContact, {
      contact,
      isIncoming: direction === "incoming",
      i18n,
      onClick: () => {
        const signalAccount = contact.firstNumber && contact.uuid ? {
          phoneNumber: contact.firstNumber,
          uuid: contact.uuid
        } : void 0;
        showContactDetail({
          contact,
          signalAccount
        });
      },
      withContentAbove,
      withContentBelow,
      tabIndex
    });
  }
  renderSendMessageButton() {
    const { contact, direction, shouldCollapseBelow, startConversation, i18n } = this.props;
    const noBottomLeftCurve = direction === "incoming" && shouldCollapseBelow;
    const noBottomRightCurve = direction === "outgoing" && shouldCollapseBelow;
    if (!contact) {
      return null;
    }
    const { firstNumber, uuid } = contact;
    if (!firstNumber || !uuid) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      onClick: () => startConversation(firstNumber, uuid),
      className: (0, import_classnames.default)("module-message__send-message-button", noBottomLeftCurve && "module-message__send-message-button--no-bottom-left-curve", noBottomRightCurve && "module-message__send-message-button--no-bottom-right-curve")
    }, i18n("sendMessageToContact"));
  }
  renderAvatar() {
    const {
      author,
      conversationId,
      conversationType,
      direction,
      getPreferredBadge,
      i18n,
      shouldCollapseBelow,
      showContactModal,
      theme
    } = this.props;
    if (conversationType !== "group" || direction !== "incoming") {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__author-avatar-container", {
        "module-message__author-avatar-container--with-reactions": this.hasReactions()
      })
    }, shouldCollapseBelow ? /* @__PURE__ */ import_react.default.createElement(import_AvatarSpacer.AvatarSpacer, {
      size: GROUP_AVATAR_SIZE
    }) : /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: author.acceptedMessageRequest,
      avatarPath: author.avatarPath,
      badge: getPreferredBadge(author.badges),
      color: author.color,
      conversationType: "direct",
      i18n,
      isMe: author.isMe,
      name: author.name,
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        showContactModal(author.id, conversationId);
      },
      phoneNumber: author.phoneNumber,
      profileName: author.profileName,
      sharedGroupNames: author.sharedGroupNames,
      size: GROUP_AVATAR_SIZE,
      theme,
      title: author.title,
      unblurredAvatarPath: author.unblurredAvatarPath
    }));
  }
  renderText() {
    const {
      bodyRanges,
      deletedForEveryone,
      direction,
      displayLimit,
      i18n,
      id,
      messageExpanded,
      openConversation,
      kickOffAttachmentDownload,
      status,
      text,
      textDirection,
      textAttachment
    } = this.props;
    const { metadataWidth } = this.state;
    const isRTL = textDirection === "RightToLeft" /* RightToLeft */;
    const contents = deletedForEveryone ? i18n("message--deletedForEveryone") : direction === "incoming" && status === "error" ? i18n("incomingError") : text;
    if (!contents) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__text", `module-message__text--${direction}`, status === "error" && direction === "incoming" ? "module-message__text--error" : null, deletedForEveryone ? "module-message__text--delete-for-everyone" : null),
      dir: isRTL ? "rtl" : void 0
    }, /* @__PURE__ */ import_react.default.createElement(import_MessageBodyReadMore.MessageBodyReadMore, {
      bodyRanges,
      disableLinks: !this.areLinksEnabled(),
      direction,
      displayLimit,
      i18n,
      id,
      messageExpanded,
      openConversation,
      kickOffBodyDownload: () => {
        if (!textAttachment) {
          return;
        }
        kickOffAttachmentDownload({
          attachment: textAttachment,
          messageId: id
        });
      },
      text: contents || "",
      textAttachment
    }), !isRTL && this.getMetadataPlacement() === 2 /* InlineWithText */ && /* @__PURE__ */ import_react.default.createElement(import_MessageTextMetadataSpacer.MessageTextMetadataSpacer, {
      metadataWidth
    }));
  }
  renderError() {
    const { status, direction } = this.props;
    if (status !== "paused" && status !== "error" && status !== "partial-sent") {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__error-container"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__error", `module-message__error--${direction}`, `module-message__error--${status}`)
    }));
  }
  renderMenu(triggerId) {
    const {
      attachments,
      canDownload,
      canReact,
      canReply,
      direction,
      disableMenu,
      i18n,
      id,
      isSticker,
      isTapToView,
      reactToMessage,
      renderEmojiPicker,
      renderReactionPicker,
      replyToMessage,
      selectedReaction
    } = this.props;
    if (disableMenu) {
      return null;
    }
    const { reactionPickerRoot } = this.state;
    const multipleAttachments = attachments && attachments.length > 1;
    const firstAttachment = attachments && attachments[0];
    const downloadButton = !isSticker && !multipleAttachments && !isTapToView && firstAttachment && !firstAttachment.pending ? /* @__PURE__ */ import_react.default.createElement("div", {
      onClick: this.openGenericAttachment,
      role: "button",
      "aria-label": i18n("downloadAttachment"),
      className: (0, import_classnames.default)("module-message__buttons__download", `module-message__buttons__download--${direction}`)
    }) : null;
    const reactButton = /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref: popperRef }) => {
      const maybePopperRef = this.isWindowWidthNotNarrow() ? popperRef : void 0;
      return /* @__PURE__ */ import_react.default.createElement("div", {
        ref: maybePopperRef,
        onClick: (event) => {
          event.stopPropagation();
          event.preventDefault();
          this.toggleReactionPicker();
        },
        role: "button",
        className: "module-message__buttons__react",
        "aria-label": i18n("reactToMessage")
      });
    });
    const replyButton = /* @__PURE__ */ import_react.default.createElement("div", {
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        replyToMessage(id);
      },
      role: "button",
      "aria-label": i18n("replyToMessage"),
      className: (0, import_classnames.default)("module-message__buttons__reply", `module-message__buttons__download--${direction}`)
    });
    const menuButton = /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref: popperRef }) => {
      const maybePopperRef = !this.isWindowWidthNotNarrow() ? popperRef : void 0;
      return /* @__PURE__ */ import_react.default.createElement(import_StopPropagation.StopPropagation, {
        className: "module-message__buttons__menu--container"
      }, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenuTrigger, {
        id: triggerId,
        ref: this.captureMenuTrigger
      }, /* @__PURE__ */ import_react.default.createElement("div", {
        ref: maybePopperRef,
        role: "button",
        onClick: this.showMenu,
        "aria-label": i18n("messageContextMenuButton"),
        className: (0, import_classnames.default)("module-message__buttons__menu", `module-message__buttons__download--${direction}`)
      })));
    });
    return /* @__PURE__ */ import_react.default.createElement(import_react_popper.Manager, null, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__buttons", `module-message__buttons--${direction}`)
    }, this.isWindowWidthNotNarrow() && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, canReact ? reactButton : null, canDownload ? downloadButton : null, canReply ? replyButton : null), menuButton), reactionPickerRoot && (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_StopPropagation.StopPropagation, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
      placement: "top",
      modifiers: [
        (0, import_popperUtil.offsetDistanceModifier)(4),
        this.popperPreventOverflowModifier()
      ]
    }, ({ ref, style }) => renderReactionPicker({
      ref,
      style,
      selected: selectedReaction,
      onClose: this.toggleReactionPicker,
      onPick: (emoji) => {
        this.toggleReactionPicker(true);
        reactToMessage(id, {
          emoji,
          remove: emoji === selectedReaction
        });
      },
      renderEmojiPicker
    }))), reactionPickerRoot));
  }
  renderContextMenu(triggerId) {
    const {
      attachments,
      canDownload,
      contact,
      canReact,
      canReply,
      canRetry,
      canRetryDeleteForEveryone,
      deleteMessage,
      deleteMessageForEveryone,
      deletedForEveryone,
      giftBadge,
      i18n,
      id,
      isSticker,
      isTapToView,
      replyToMessage,
      retrySend,
      retryDeleteForEveryone,
      showForwardMessageModal,
      showMessageDetail,
      text
    } = this.props;
    const canForward = !isTapToView && !deletedForEveryone && !giftBadge && !contact;
    const multipleAttachments = attachments && attachments.length > 1;
    const shouldShowAdditional = (0, import_MessageBodyReadMore.doesMessageBodyOverflow)(text || "") || !this.isWindowWidthNotNarrow();
    const menu = /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.ContextMenu, {
      id: triggerId
    }, canDownload && shouldShowAdditional && !isSticker && !multipleAttachments && !isTapToView && attachments && attachments[0] ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__download"
      },
      onClick: this.openGenericAttachment
    }, i18n("downloadAttachment")) : null, shouldShowAdditional ? /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, canReply && /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__reply"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        replyToMessage(id);
      }
    }, i18n("replyToMessage")), canReact && /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__react"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        this.toggleReactionPicker();
      }
    }, i18n("reactToMessage"))) : null, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__more-info"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        showMessageDetail(id);
      }
    }, i18n("moreInfo")), canRetry ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__retry-send"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        retrySend(id);
      }
    }, i18n("retrySend")) : null, canRetryDeleteForEveryone ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__delete-message-for-everyone"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        retryDeleteForEveryone(id);
      }
    }, i18n("retryDeleteForEveryone")) : null, canForward ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__forward-message"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        showForwardMessageModal(id);
      }
    }, i18n("forwardMessage")) : null, /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__delete-message"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        deleteMessage(id);
      }
    }, i18n("deleteMessage")), this.canDeleteForEveryone() ? /* @__PURE__ */ import_react.default.createElement(import_react_contextmenu.MenuItem, {
      attributes: {
        className: "module-message__context--icon module-message__context__delete-message-for-everyone"
      },
      onClick: (event) => {
        event.stopPropagation();
        event.preventDefault();
        deleteMessageForEveryone(id);
      }
    }, i18n("deleteMessageForEveryone")) : null);
    return import_react_dom.default.createPortal(menu, document.body);
  }
  isWindowWidthNotNarrow() {
    const { containerWidthBreakpoint } = this.props;
    return containerWidthBreakpoint !== import_util.WidthBreakpoint.Narrow;
  }
  getWidth() {
    const { attachments, giftBadge, isSticker, previews } = this.props;
    if (giftBadge) {
      return 240;
    }
    if (attachments && attachments.length) {
      if ((0, import_Attachment.isGIF)(attachments)) {
        return GIF_SIZE + 2;
      }
      if (isSticker) {
        return STICKER_SIZE + 8 * 2;
      }
      const dimensions = (0, import_Attachment.getGridDimensions)(attachments);
      if (dimensions) {
        return dimensions.width;
      }
    }
    const firstLinkPreview = (previews || [])[0];
    if (firstLinkPreview && firstLinkPreview.image && (0, import_shouldUseFullSizeLinkPreviewImage.shouldUseFullSizeLinkPreviewImage)(firstLinkPreview)) {
      const dimensions = (0, import_Attachment.getImageDimensions)(firstLinkPreview.image);
      if (dimensions) {
        return dimensions.width;
      }
    }
    return void 0;
  }
  isShowingImage() {
    const { isTapToView, attachments, previews } = this.props;
    const { imageBroken } = this.state;
    if (imageBroken || isTapToView) {
      return false;
    }
    if (attachments && attachments.length) {
      const displayImage = (0, import_Attachment.canDisplayImage)(attachments);
      return displayImage && ((0, import_Attachment.isImage)(attachments) || (0, import_Attachment.isVideo)(attachments));
    }
    if (previews && previews.length) {
      const first = previews[0];
      const { image } = first;
      return (0, import_Attachment.isImageAttachment)(image);
    }
    return false;
  }
  isAttachmentPending() {
    const { attachments } = this.props;
    if (!attachments || attachments.length < 1) {
      return false;
    }
    const first = attachments[0];
    return Boolean(first.pending);
  }
  renderTapToViewIcon() {
    const { direction, isTapToViewExpired } = this.props;
    const isDownloadPending = this.isAttachmentPending();
    return !isTapToViewExpired && isDownloadPending ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__tap-to-view__spinner-container"
    }, /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      svgSize: "small",
      size: "20px",
      direction
    })) : /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__tap-to-view__icon", `module-message__tap-to-view__icon--${direction}`, isTapToViewExpired ? "module-message__tap-to-view__icon--expired" : null)
    });
  }
  renderTapToViewText() {
    const {
      attachments,
      direction,
      i18n,
      isTapToViewExpired,
      isTapToViewError
    } = this.props;
    const incomingString = isTapToViewExpired ? i18n("Message--tap-to-view-expired") : i18n(`Message--tap-to-view--incoming${(0, import_Attachment.isVideo)(attachments) ? "-video" : ""}`);
    const outgoingString = i18n("Message--tap-to-view--outgoing");
    const isDownloadPending = this.isAttachmentPending();
    if (isDownloadPending) {
      return;
    }
    return isTapToViewError ? i18n("incomingError") : direction === "outgoing" ? outgoingString : incomingString;
  }
  renderTapToView() {
    const {
      conversationType,
      direction,
      isTapToViewExpired,
      isTapToViewError
    } = this.props;
    const collapseMetadata = this.getMetadataPlacement() === 0 /* NotRendered */;
    const withContentBelow = !collapseMetadata;
    const withContentAbove = !collapseMetadata && conversationType === "group" && direction === "incoming";
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__tap-to-view", withContentBelow ? "module-message__tap-to-view--with-content-below" : null, withContentAbove ? "module-message__tap-to-view--with-content-above" : null)
    }, isTapToViewError ? null : this.renderTapToViewIcon(), /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message__tap-to-view__text", `module-message__tap-to-view__text--${direction}`, isTapToViewExpired ? `module-message__tap-to-view__text--${direction}-expired` : null, isTapToViewError ? `module-message__tap-to-view__text--${direction}-error` : null)
    }, this.renderTapToViewText()));
  }
  popperPreventOverflowModifier() {
    const { containerElementRef } = this.props;
    return {
      name: "preventOverflow",
      options: {
        altAxis: true,
        boundary: containerElementRef.current || void 0,
        padding: {
          bottom: 16,
          left: 8,
          right: 8,
          top: 16
        }
      }
    };
  }
  renderReactions(outgoing) {
    const { getPreferredBadge, reactions = [], i18n, theme } = this.props;
    if (!this.hasReactions()) {
      return null;
    }
    const reactionsWithEmojiData = reactions.map((reaction) => ({
      ...reaction,
      ...(0, import_lib.emojiToData)(reaction.emoji)
    }));
    const groupedAndSortedReactions = Object.values((0, import_lodash.groupBy)(reactionsWithEmojiData, "short_name")).map((groupedReactions) => (0, import_lodash.orderBy)(groupedReactions, [(reaction) => reaction.from.isMe, "timestamp"], ["desc", "desc"]));
    const ordered = (0, import_lodash.orderBy)(groupedAndSortedReactions, ["length", ([{ timestamp }]) => timestamp], ["desc", "desc"]);
    const toRender = (0, import_lodash.take)(ordered, 3).map((res) => ({
      emoji: res[0].emoji,
      count: res.length,
      isMe: res.some((re) => Boolean(re.from.isMe))
    }));
    const someNotRendered = ordered.length > 3;
    const maybeNotRendered = (0, import_lodash.drop)(ordered, 2);
    const maybeNotRenderedTotal = maybeNotRendered.reduce((sum, res) => sum + res.length, 0);
    const notRenderedIsMe = someNotRendered && maybeNotRendered.some((res) => res.some((re) => Boolean(re.from.isMe)));
    const { reactionViewerRoot } = this.state;
    const popperPlacement = outgoing ? "bottom-end" : "bottom-start";
    return /* @__PURE__ */ import_react.default.createElement(import_react_popper.Manager, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Reference, null, ({ ref: popperRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
      ref: this.reactionsContainerRefMerger(this.reactionsContainerRef, popperRef),
      className: (0, import_classnames.default)("module-message__reactions", outgoing ? "module-message__reactions--outgoing" : "module-message__reactions--incoming")
    }, toRender.map((re, i) => {
      const isLast = i === toRender.length - 1;
      const isMore = isLast && someNotRendered;
      const isMoreWithMe = isMore && notRenderedIsMe;
      return /* @__PURE__ */ import_react.default.createElement("button", {
        type: "button",
        key: `${re.emoji}-${i}`,
        className: (0, import_classnames.default)("module-message__reactions__reaction", re.count > 1 ? "module-message__reactions__reaction--with-count" : null, outgoing ? "module-message__reactions__reaction--outgoing" : "module-message__reactions__reaction--incoming", isMoreWithMe || re.isMe && !isMoreWithMe ? "module-message__reactions__reaction--is-me" : null),
        onClick: (e) => {
          e.stopPropagation();
          e.preventDefault();
          this.toggleReactionViewer(false);
        },
        onKeyDown: (e) => {
          if (e.key === "Enter") {
            e.stopPropagation();
          }
        }
      }, isMore ? /* @__PURE__ */ import_react.default.createElement("span", {
        className: (0, import_classnames.default)("module-message__reactions__reaction__count", "module-message__reactions__reaction__count--no-emoji", isMoreWithMe ? "module-message__reactions__reaction__count--is-me" : null)
      }, "+", maybeNotRenderedTotal) : /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_Emoji.Emoji, {
        size: 16,
        emoji: re.emoji
      }), re.count > 1 ? /* @__PURE__ */ import_react.default.createElement("span", {
        className: (0, import_classnames.default)("module-message__reactions__reaction__count", re.isMe ? "module-message__reactions__reaction__count--is-me" : null)
      }, re.count) : null));
    }))), reactionViewerRoot && (0, import_react_dom.createPortal)(/* @__PURE__ */ import_react.default.createElement(import_StopPropagation.StopPropagation, null, /* @__PURE__ */ import_react.default.createElement(import_react_popper.Popper, {
      placement: popperPlacement,
      strategy: "fixed",
      modifiers: [this.popperPreventOverflowModifier()]
    }, ({ ref, style }) => /* @__PURE__ */ import_react.default.createElement(import_ReactionViewer.ReactionViewer, {
      ref,
      style: {
        ...style,
        zIndex: 2
      },
      getPreferredBadge,
      reactions,
      i18n,
      onClose: this.toggleReactionViewer,
      theme
    }))), reactionViewerRoot));
  }
  renderContents() {
    const { giftBadge, isTapToView, deletedForEveryone } = this.props;
    if (deletedForEveryone) {
      return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, this.renderText(), this.renderMetadata());
    }
    if (giftBadge) {
      return this.renderGiftBadge();
    }
    if (isTapToView) {
      return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, this.renderTapToView(), this.renderMetadata());
    }
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, this.renderQuote(), this.renderStoryReplyContext(), this.renderAttachment(), this.renderPreview(), this.renderEmbeddedContact(), this.renderText(), this.renderMetadata(), this.renderSendMessageButton());
  }
  renderContainer() {
    const {
      attachments,
      conversationColor,
      customColor,
      deletedForEveryone,
      direction,
      giftBadge,
      isSticker,
      isTapToView,
      isTapToViewExpired,
      isTapToViewError,
      text
    } = this.props;
    const { isSelected } = this.state;
    const isAttachmentPending = this.isAttachmentPending();
    const width = this.getWidth();
    const shouldUseWidth = Boolean(giftBadge || this.isShowingImage());
    const isEmojiOnly = this.canRenderStickerLikeEmoji();
    const isStickerLike = isSticker || isEmojiOnly;
    const lighterSelect = isSelected && direction === "incoming" && !isStickerLike && (text || !(0, import_Attachment.isVideo)(attachments) && !(0, import_Attachment.isImage)(attachments));
    const containerClassnames = (0, import_classnames.default)("module-message__container", (0, import_Attachment.isGIF)(attachments) ? "module-message__container--gif" : null, isSelected ? "module-message__container--selected" : null, lighterSelect ? "module-message__container--selected-lighter" : null, !isStickerLike ? `module-message__container--${direction}` : null, isEmojiOnly ? "module-message__container--emoji" : null, isTapToView ? "module-message__container--with-tap-to-view" : null, isTapToView && isTapToViewExpired ? "module-message__container--with-tap-to-view-expired" : null, !isStickerLike && direction === "outgoing" ? `module-message__container--outgoing-${conversationColor}` : null, isTapToView && isAttachmentPending && !isTapToViewExpired ? "module-message__container--with-tap-to-view-pending" : null, isTapToView && isAttachmentPending && !isTapToViewExpired ? `module-message__container--${direction}-${conversationColor}-tap-to-view-pending` : null, isTapToViewError ? "module-message__container--with-tap-to-view-error" : null, this.hasReactions() ? "module-message__container--with-reactions" : null, deletedForEveryone ? "module-message__container--deleted-for-everyone" : null);
    const containerStyles = {
      width: shouldUseWidth ? width : void 0
    };
    if (!isStickerLike && !deletedForEveryone && direction === "outgoing") {
      Object.assign(containerStyles, (0, import_getCustomColorStyle.getCustomColorStyle)(customColor));
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message__container-outer"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: containerClassnames,
      style: containerStyles,
      onContextMenu: this.showContextMenu,
      role: "row",
      onKeyDown: this.handleKeyDown,
      onClick: this.handleClick,
      tabIndex: -1
    }, this.renderAuthor(), this.renderContents()), this.renderReactions(direction === "outgoing"));
  }
  render() {
    const {
      author,
      attachments,
      direction,
      id,
      isSticker,
      shouldCollapseAbove,
      shouldCollapseBelow,
      timestamp
    } = this.props;
    const { expired, expiring, imageBroken, isSelected } = this.state;
    const triggerId = String(id || `${author.id}-${timestamp}`);
    if (expired) {
      return null;
    }
    if (isSticker && (imageBroken || !attachments || !attachments.length)) {
      return null;
    }
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message", `module-message--${direction}`, shouldCollapseAbove && "module-message--collapsed-above", shouldCollapseBelow && "module-message--collapsed-below", isSelected ? "module-message--selected" : null, expiring ? "module-message--expired" : null),
      tabIndex: 0,
      role: "button",
      onKeyDown: this.handleKeyDown,
      onFocus: this.handleFocus,
      ref: this.focusRef
    }, this.renderError(), this.renderAvatar(), this.renderContainer(), this.renderMenu(triggerId), this.renderContextMenu(triggerId));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Directions,
  GiftBadgeStates,
  Message,
  MessageStatuses,
  TextDirection
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSwgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdERPTSwgeyBjcmVhdGVQb3J0YWwgfSBmcm9tICdyZWFjdC1kb20nO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgZ2V0RGlyZWN0aW9uIGZyb20gJ2RpcmVjdGlvbic7XG5pbXBvcnQgeyBkcm9wLCBncm91cEJ5LCBvcmRlckJ5LCB0YWtlLCB1bmVzY2FwZSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBDb250ZXh0TWVudSwgQ29udGV4dE1lbnVUcmlnZ2VyLCBNZW51SXRlbSB9IGZyb20gJ3JlYWN0LWNvbnRleHRtZW51JztcbmltcG9ydCB7IE1hbmFnZXIsIFBvcHBlciwgUmVmZXJlbmNlIH0gZnJvbSAncmVhY3QtcG9wcGVyJztcbmltcG9ydCB0eXBlIHsgUHJldmVudE92ZXJmbG93TW9kaWZpZXIgfSBmcm9tICdAcG9wcGVyanMvY29yZS9saWIvbW9kaWZpZXJzL3ByZXZlbnRPdmVyZmxvdyc7XG5cbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgQ29udmVyc2F0aW9uVHlwZVR5cGUsXG4gIEludGVyYWN0aW9uTW9kZVR5cGUsXG59IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBUaW1lbGluZUl0ZW1UeXBlIH0gZnJvbSAnLi9UaW1lbGluZUl0ZW0nO1xuaW1wb3J0IHsgUmVhZFN0YXR1cyB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VSZWFkU3RhdHVzJztcbmltcG9ydCB7IEF2YXRhciwgQXZhdGFyU2l6ZSB9IGZyb20gJy4uL0F2YXRhcic7XG5pbXBvcnQgeyBBdmF0YXJTcGFjZXIgfSBmcm9tICcuLi9BdmF0YXJTcGFjZXInO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4uL1NwaW5uZXInO1xuaW1wb3J0IHtcbiAgZG9lc01lc3NhZ2VCb2R5T3ZlcmZsb3csXG4gIE1lc3NhZ2VCb2R5UmVhZE1vcmUsXG59IGZyb20gJy4vTWVzc2FnZUJvZHlSZWFkTW9yZSc7XG5pbXBvcnQgeyBNZXNzYWdlTWV0YWRhdGEgfSBmcm9tICcuL01lc3NhZ2VNZXRhZGF0YSc7XG5pbXBvcnQgeyBNZXNzYWdlVGV4dE1ldGFkYXRhU3BhY2VyIH0gZnJvbSAnLi9NZXNzYWdlVGV4dE1ldGFkYXRhU3BhY2VyJztcbmltcG9ydCB7IEltYWdlR3JpZCB9IGZyb20gJy4vSW1hZ2VHcmlkJztcbmltcG9ydCB7IEdJRiB9IGZyb20gJy4vR0lGJztcbmltcG9ydCB7IEN1cnZlVHlwZSwgSW1hZ2UgfSBmcm9tICcuL0ltYWdlJztcbmltcG9ydCB7IENvbnRhY3ROYW1lIH0gZnJvbSAnLi9Db250YWN0TmFtZSc7XG5pbXBvcnQgdHlwZSB7IFF1b3RlZEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi9RdW90ZSc7XG5pbXBvcnQgeyBRdW90ZSB9IGZyb20gJy4vUXVvdGUnO1xuaW1wb3J0IHsgRW1iZWRkZWRDb250YWN0IH0gZnJvbSAnLi9FbWJlZGRlZENvbnRhY3QnO1xuaW1wb3J0IHR5cGUgeyBPd25Qcm9wcyBhcyBSZWFjdGlvblZpZXdlclByb3BzIH0gZnJvbSAnLi9SZWFjdGlvblZpZXdlcic7XG5pbXBvcnQgeyBSZWFjdGlvblZpZXdlciB9IGZyb20gJy4vUmVhY3Rpb25WaWV3ZXInO1xuaW1wb3J0IHR5cGUgeyBQcm9wcyBhcyBSZWFjdGlvblBpY2tlclByb3BzIH0gZnJvbSAnLi9SZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgeyBFbW9qaSB9IGZyb20gJy4uL2Vtb2ppL0Vtb2ppJztcbmltcG9ydCB7IExpbmtQcmV2aWV3RGF0ZSB9IGZyb20gJy4vTGlua1ByZXZpZXdEYXRlJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHsgc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlIH0gZnJvbSAnLi4vLi4vbGlua1ByZXZpZXdzL3Nob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZSc7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi9fdXRpbCc7XG5pbXBvcnQgeyBPdXRnb2luZ0dpZnRCYWRnZU1vZGFsIH0gZnJvbSAnLi4vT3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vLi4vbG9nZ2luZy9sb2cnO1xuXG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQge1xuICBjYW5EaXNwbGF5SW1hZ2UsXG4gIGdldEV4dGVuc2lvbkZvckRpc3BsYXksXG4gIGdldEdyaWREaW1lbnNpb25zLFxuICBnZXRJbWFnZURpbWVuc2lvbnMsXG4gIGhhc0ltYWdlLFxuICBpc0Rvd25sb2FkZWQsXG4gIGhhc1ZpZGVvU2NyZWVuc2hvdCxcbiAgaXNBdWRpbyxcbiAgaXNJbWFnZSxcbiAgaXNJbWFnZUF0dGFjaG1lbnQsXG4gIGlzVmlkZW8sXG4gIGlzR0lGLFxufSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgRW1iZWRkZWRDb250YWN0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5cbmltcG9ydCB7IGdldEluY3JlbWVudCB9IGZyb20gJy4uLy4uL3V0aWwvdGltZXInO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuLi8uLi91dGlsL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcbmltcG9ydCB7IGlzRmlsZURhbmdlcm91cyB9IGZyb20gJy4uLy4uL3V0aWwvaXNGaWxlRGFuZ2Vyb3VzJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHR5cGUge1xuICBCb2R5UmFuZ2VzVHlwZSxcbiAgTG9jYWxpemVyVHlwZSxcbiAgVGhlbWVUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHR5cGUge1xuICBDb250YWN0TmFtZUNvbG9yVHlwZSxcbiAgQ29udmVyc2F0aW9uQ29sb3JUeXBlLFxuICBDdXN0b21Db2xvclR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBjcmVhdGVSZWZNZXJnZXIgfSBmcm9tICcuLi8uLi91dGlsL3JlZk1lcmdlcic7XG5pbXBvcnQgeyBlbW9qaVRvRGF0YSwgZ2V0RW1vamlDb3VudCB9IGZyb20gJy4uL2Vtb2ppL2xpYic7XG5pbXBvcnQgeyBpc0Vtb2ppT25seVRleHQgfSBmcm9tICcuLi8uLi91dGlsL2lzRW1vamlPbmx5VGV4dCc7XG5pbXBvcnQgdHlwZSB7IFNtYXJ0UmVhY3Rpb25QaWNrZXIgfSBmcm9tICcuLi8uLi9zdGF0ZS9zbWFydC9SZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgeyBnZXRDdXN0b21Db2xvclN0eWxlIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRDdXN0b21Db2xvclN0eWxlJztcbmltcG9ydCB7IG9mZnNldERpc3RhbmNlTW9kaWZpZXIgfSBmcm9tICcuLi8uLi91dGlsL3BvcHBlclV0aWwnO1xuaW1wb3J0ICogYXMgS2V5Ym9hcmRMYXlvdXQgZnJvbSAnLi4vLi4vc2VydmljZXMva2V5Ym9hcmRMYXlvdXQnO1xuaW1wb3J0IHsgU3RvcFByb3BhZ2F0aW9uIH0gZnJvbSAnLi4vU3RvcFByb3BhZ2F0aW9uJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IERBWSwgSE9VUiwgTUlOVVRFLCBTRUNPTkQgfSBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi8uLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcbmltcG9ydCB7IGdldEJhZGdlSW1hZ2VGaWxlTG9jYWxQYXRoIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL2dldEJhZGdlSW1hZ2VGaWxlTG9jYWxQYXRoJztcblxudHlwZSBUcmlnZ2VyID0ge1xuICBoYW5kbGVDb250ZXh0Q2xpY2s6IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pID0+IHZvaWQ7XG59O1xuXG5jb25zdCBHVUVTU19NRVRBREFUQV9XSURUSF9USU1FU1RBTVBfU0laRSA9IDEwO1xuY29uc3QgR1VFU1NfTUVUQURBVEFfV0lEVEhfRVhQSVJFX1RJTUVSX1NJWkUgPSAxODtcbmNvbnN0IEdVRVNTX01FVEFEQVRBX1dJRFRIX09VVEdPSU5HX1NJWkU6IFJlY29yZDxNZXNzYWdlU3RhdHVzVHlwZSwgbnVtYmVyPiA9IHtcbiAgZGVsaXZlcmVkOiAyNCxcbiAgZXJyb3I6IDI0LFxuICBwYXVzZWQ6IDE4LFxuICAncGFydGlhbC1zZW50JzogMjQsXG4gIHJlYWQ6IDI0LFxuICBzZW5kaW5nOiAxOCxcbiAgc2VudDogMjQsXG4gIHZpZXdlZDogMjQsXG59O1xuXG5jb25zdCBFWFBJUkFUSU9OX0NIRUNLX01JTklNVU0gPSAyMDAwO1xuY29uc3QgRVhQSVJFRF9ERUxBWSA9IDYwMDtcbmNvbnN0IEdST1VQX0FWQVRBUl9TSVpFID0gQXZhdGFyU2l6ZS5UV0VOVFlfRUlHSFQ7XG5jb25zdCBTVElDS0VSX1NJWkUgPSAyMDA7XG5jb25zdCBHSUZfU0laRSA9IDMwMDtcbi8vIE5vdGU6IHRoaXMgbmVlZHMgdG8gbWF0Y2ggdGhlIGFuaW1hdGlvbiB0aW1lXG5jb25zdCBTRUxFQ1RFRF9USU1FT1VUID0gMTIwMDtcbmNvbnN0IFRIUkVFX0hPVVJTID0gMyAqIDYwICogNjAgKiAxMDAwO1xuY29uc3QgU0VOVF9TVEFUVVNFUyA9IG5ldyBTZXQ8TWVzc2FnZVN0YXR1c1R5cGU+KFtcbiAgJ2RlbGl2ZXJlZCcsXG4gICdyZWFkJyxcbiAgJ3NlbnQnLFxuICAndmlld2VkJyxcbl0pO1xuY29uc3QgR0lGVF9CQURHRV9VUERBVEVfSU5URVJWQUwgPSAzMCAqIFNFQ09ORDtcblxuZW51bSBNZXRhZGF0YVBsYWNlbWVudCB7XG4gIE5vdFJlbmRlcmVkLFxuICBSZW5kZXJlZEJ5TWVzc2FnZUF1ZGlvQ29tcG9uZW50LFxuICBJbmxpbmVXaXRoVGV4dCxcbiAgQm90dG9tLFxufVxuXG5leHBvcnQgZW51bSBUZXh0RGlyZWN0aW9uIHtcbiAgTGVmdFRvUmlnaHQgPSAnTGVmdFRvUmlnaHQnLFxuICBSaWdodFRvTGVmdCA9ICdSaWdodFRvTGVmdCcsXG4gIERlZmF1bHQgPSAnRGVmYXVsdCcsXG4gIE5vbmUgPSAnTm9uZScsXG59XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlU3RhdHVzZXMgPSBbXG4gICdkZWxpdmVyZWQnLFxuICAnZXJyb3InLFxuICAncGF1c2VkJyxcbiAgJ3BhcnRpYWwtc2VudCcsXG4gICdyZWFkJyxcbiAgJ3NlbmRpbmcnLFxuICAnc2VudCcsXG4gICd2aWV3ZWQnLFxuXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIE1lc3NhZ2VTdGF0dXNUeXBlID0gdHlwZW9mIE1lc3NhZ2VTdGF0dXNlc1tudW1iZXJdO1xuXG5leHBvcnQgY29uc3QgRGlyZWN0aW9ucyA9IFsnaW5jb21pbmcnLCAnb3V0Z29pbmcnXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIERpcmVjdGlvblR5cGUgPSB0eXBlb2YgRGlyZWN0aW9uc1tudW1iZXJdO1xuXG5leHBvcnQgdHlwZSBBdWRpb0F0dGFjaG1lbnRQcm9wcyA9IHtcbiAgcmVuZGVyaW5nQ29udGV4dDogc3RyaW5nO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBidXR0b25SZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MQnV0dG9uRWxlbWVudD47XG4gIHRoZW1lOiBUaGVtZVR5cGUgfCB1bmRlZmluZWQ7XG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICBjb2xsYXBzZU1ldGFkYXRhOiBib29sZWFuO1xuICB3aXRoQ29udGVudEFib3ZlOiBib29sZWFuO1xuICB3aXRoQ29udGVudEJlbG93OiBib29sZWFuO1xuXG4gIGRpcmVjdGlvbjogRGlyZWN0aW9uVHlwZTtcbiAgZXhwaXJhdGlvbkxlbmd0aD86IG51bWJlcjtcbiAgZXhwaXJhdGlvblRpbWVzdGFtcD86IG51bWJlcjtcbiAgaWQ6IHN0cmluZztcbiAgcGxheWVkOiBib29sZWFuO1xuICBzaG93TWVzc2FnZURldGFpbDogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHN0YXR1cz86IE1lc3NhZ2VTdGF0dXNUeXBlO1xuICB0ZXh0UGVuZGluZz86IGJvb2xlYW47XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuXG4gIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoKTogdm9pZDtcbiAgb25Db3JydXB0ZWQoKTogdm9pZDtcbiAgb25GaXJzdFBsYXllZCgpOiB2b2lkO1xufTtcblxuZXhwb3J0IGVudW0gR2lmdEJhZGdlU3RhdGVzIHtcbiAgVW5vcGVuZWQgPSAnVW5vcGVuZWQnLFxuICBPcGVuZWQgPSAnT3BlbmVkJyxcbiAgUmVkZWVtZWQgPSAnUmVkZWVtZWQnLFxufVxuZXhwb3J0IHR5cGUgR2lmdEJhZGdlVHlwZSA9IHtcbiAgZXhwaXJhdGlvbjogbnVtYmVyO1xuICBpZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBsZXZlbDogbnVtYmVyO1xuICBzdGF0ZTogR2lmdEJhZGdlU3RhdGVzO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNEYXRhID0ge1xuICBpZDogc3RyaW5nO1xuICByZW5kZXJpbmdDb250ZXh0OiBzdHJpbmc7XG4gIGNvbnRhY3ROYW1lQ29sb3I/OiBDb250YWN0TmFtZUNvbG9yVHlwZTtcbiAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgY29udmVyc2F0aW9uVGl0bGU6IHN0cmluZztcbiAgY3VzdG9tQ29sb3I/OiBDdXN0b21Db2xvclR5cGU7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGRpc3BsYXlMaW1pdD86IG51bWJlcjtcbiAgdGV4dD86IHN0cmluZztcbiAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbjtcbiAgdGV4dEF0dGFjaG1lbnQ/OiBBdHRhY2htZW50VHlwZTtcbiAgaXNTdGlja2VyPzogYm9vbGVhbjtcbiAgaXNTZWxlY3RlZD86IGJvb2xlYW47XG4gIGlzU2VsZWN0ZWRDb3VudGVyPzogbnVtYmVyO1xuICBkaXJlY3Rpb246IERpcmVjdGlvblR5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xuICBzdGF0dXM/OiBNZXNzYWdlU3RhdHVzVHlwZTtcbiAgY29udGFjdD86IEVtYmVkZGVkQ29udGFjdFR5cGU7XG4gIGF1dGhvcjogUGljazxcbiAgICBDb252ZXJzYXRpb25UeXBlLFxuICAgIHwgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnXG4gICAgfCAnYXZhdGFyUGF0aCdcbiAgICB8ICdiYWRnZXMnXG4gICAgfCAnY29sb3InXG4gICAgfCAnaWQnXG4gICAgfCAnaXNNZSdcbiAgICB8ICduYW1lJ1xuICAgIHwgJ3Bob25lTnVtYmVyJ1xuICAgIHwgJ3Byb2ZpbGVOYW1lJ1xuICAgIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gICAgfCAndGl0bGUnXG4gICAgfCAndW5ibHVycmVkQXZhdGFyUGF0aCdcbiAgPjtcbiAgcmVkdWNlZE1vdGlvbj86IGJvb2xlYW47XG4gIGNvbnZlcnNhdGlvblR5cGU6IENvbnZlcnNhdGlvblR5cGVUeXBlO1xuICBhdHRhY2htZW50cz86IEFycmF5PEF0dGFjaG1lbnRUeXBlPjtcbiAgZ2lmdEJhZGdlPzogR2lmdEJhZGdlVHlwZTtcbiAgcXVvdGU/OiB7XG4gICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgICBjdXN0b21Db2xvcj86IEN1c3RvbUNvbG9yVHlwZTtcbiAgICB0ZXh0OiBzdHJpbmc7XG4gICAgcmF3QXR0YWNobWVudD86IFF1b3RlZEF0dGFjaG1lbnRUeXBlO1xuICAgIGlzRnJvbU1lOiBib29sZWFuO1xuICAgIHNlbnRBdDogbnVtYmVyO1xuICAgIGF1dGhvcklkOiBzdHJpbmc7XG4gICAgYXV0aG9yUGhvbmVOdW1iZXI/OiBzdHJpbmc7XG4gICAgYXV0aG9yUHJvZmlsZU5hbWU/OiBzdHJpbmc7XG4gICAgYXV0aG9yVGl0bGU6IHN0cmluZztcbiAgICBhdXRob3JOYW1lPzogc3RyaW5nO1xuICAgIGJvZHlSYW5nZXM/OiBCb2R5UmFuZ2VzVHlwZTtcbiAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBib29sZWFuO1xuICAgIGlzVmlld09uY2U6IGJvb2xlYW47XG4gICAgaXNHaWZ0QmFkZ2U6IGJvb2xlYW47XG4gIH07XG4gIHN0b3J5UmVwbHlDb250ZXh0Pzoge1xuICAgIGF1dGhvclRpdGxlOiBzdHJpbmc7XG4gICAgY29udmVyc2F0aW9uQ29sb3I6IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgICBjdXN0b21Db2xvcj86IEN1c3RvbUNvbG9yVHlwZTtcbiAgICBlbW9qaT86IHN0cmluZztcbiAgICBpc0Zyb21NZTogYm9vbGVhbjtcbiAgICByYXdBdHRhY2htZW50PzogUXVvdGVkQXR0YWNobWVudFR5cGU7XG4gICAgcmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZD86IGJvb2xlYW47XG4gICAgdGV4dDogc3RyaW5nO1xuICB9O1xuICBwcmV2aWV3czogQXJyYXk8TGlua1ByZXZpZXdUeXBlPjtcblxuICBpc1RhcFRvVmlldz86IGJvb2xlYW47XG4gIGlzVGFwVG9WaWV3RXhwaXJlZD86IGJvb2xlYW47XG4gIGlzVGFwVG9WaWV3RXJyb3I/OiBib29sZWFuO1xuXG4gIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXM7XG5cbiAgZXhwaXJhdGlvbkxlbmd0aD86IG51bWJlcjtcbiAgZXhwaXJhdGlvblRpbWVzdGFtcD86IG51bWJlcjtcblxuICByZWFjdGlvbnM/OiBSZWFjdGlvblZpZXdlclByb3BzWydyZWFjdGlvbnMnXTtcbiAgc2VsZWN0ZWRSZWFjdGlvbj86IHN0cmluZztcblxuICBkZWxldGVkRm9yRXZlcnlvbmU/OiBib29sZWFuO1xuXG4gIGNhblJldHJ5OiBib29sZWFuO1xuICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBib29sZWFuO1xuICBjYW5SZWFjdDogYm9vbGVhbjtcbiAgY2FuUmVwbHk6IGJvb2xlYW47XG4gIGNhbkRvd25sb2FkOiBib29sZWFuO1xuICBjYW5EZWxldGVGb3JFdmVyeW9uZTogYm9vbGVhbjtcbiAgaXNCbG9ja2VkOiBib29sZWFuO1xuICBpc01lc3NhZ2VSZXF1ZXN0QWNjZXB0ZWQ6IGJvb2xlYW47XG4gIGJvZHlSYW5nZXM/OiBCb2R5UmFuZ2VzVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzSG91c2VrZWVwaW5nID0ge1xuICBjb250YWluZXJFbGVtZW50UmVmOiBSZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbiAgZGlzYWJsZU1lbnU/OiBib29sZWFuO1xuICBkaXNhYmxlU2Nyb2xsPzogYm9vbGVhbjtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpbnRlcmFjdGlvbk1vZGU6IEludGVyYWN0aW9uTW9kZVR5cGU7XG4gIGl0ZW0/OiBUaW1lbGluZUl0ZW1UeXBlO1xuICByZW5kZXJBdWRpb0F0dGFjaG1lbnQ6IChwcm9wczogQXVkaW9BdHRhY2htZW50UHJvcHMpID0+IEpTWC5FbGVtZW50O1xuICByZW5kZXJSZWFjdGlvblBpY2tlcjogKFxuICAgIHByb3BzOiBSZWFjdC5Db21wb25lbnRQcm9wczx0eXBlb2YgU21hcnRSZWFjdGlvblBpY2tlcj5cbiAgKSA9PiBKU1guRWxlbWVudDtcbiAgc2hvdWxkQ29sbGFwc2VBYm92ZTogYm9vbGVhbjtcbiAgc2hvdWxkQ29sbGFwc2VCZWxvdzogYm9vbGVhbjtcbiAgc2hvdWxkSGlkZU1ldGFkYXRhOiBib29sZWFuO1xuICB0aGVtZTogVGhlbWVUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgUHJvcHNBY3Rpb25zID0ge1xuICBjbGVhclNlbGVjdGVkTWVzc2FnZTogKCkgPT4gdW5rbm93bjtcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgbWVzc2FnZUV4cGFuZGVkOiAoaWQ6IHN0cmluZywgZGlzcGxheUxpbWl0OiBudW1iZXIpID0+IHVua25vd247XG4gIGNoZWNrRm9yQWNjb3VudDogKHBob25lTnVtYmVyOiBzdHJpbmcpID0+IHVua25vd247XG5cbiAgcmVhY3RUb01lc3NhZ2U6IChcbiAgICBpZDogc3RyaW5nLFxuICAgIHsgZW1vamksIHJlbW92ZSB9OiB7IGVtb2ppOiBzdHJpbmc7IHJlbW92ZTogYm9vbGVhbiB9XG4gICkgPT4gdm9pZDtcbiAgcmVwbHlUb01lc3NhZ2U6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgcmV0cnlTZW5kOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWw6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuICBkZWxldGVNZXNzYWdlOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lOiAoaWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IChpZDogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIHN0YXJ0Q29udmVyc2F0aW9uOiAoZTE2NDogc3RyaW5nLCB1dWlkOiBVVUlEU3RyaW5nVHlwZSkgPT4gdm9pZDtcbiAgb3BlbkNvbnZlcnNhdGlvbjogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIG1lc3NhZ2VJZD86IHN0cmluZykgPT4gdm9pZDtcbiAgb3BlbkdpZnRCYWRnZTogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB2b2lkO1xuICBzaG93Q29udGFjdERldGFpbDogKG9wdGlvbnM6IHtcbiAgICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlO1xuICAgIHNpZ25hbEFjY291bnQ/OiB7XG4gICAgICBwaG9uZU51bWJlcjogc3RyaW5nO1xuICAgICAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gICAgfTtcbiAgfSkgPT4gdm9pZDtcbiAgc2hvd0NvbnRhY3RNb2RhbDogKGNvbnRhY3RJZDogc3RyaW5nLCBjb252ZXJzYXRpb25JZD86IHN0cmluZykgPT4gdm9pZDtcblxuICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkOiAob3B0aW9uczoge1xuICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICB9KSA9PiB2b2lkO1xuICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkOiAob3B0aW9uczoge1xuICAgIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnRUeXBlO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICB9KSA9PiB2b2lkO1xuICBtYXJrVmlld2VkKG1lc3NhZ2VJZDogc3RyaW5nKTogdm9pZDtcbiAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQ6IChvcHRpb25zOiB7XG4gICAgYXR0YWNobWVudDogQXR0YWNobWVudFR5cGU7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIH0pID0+IHZvaWQ7XG4gIGRvd25sb2FkQXR0YWNobWVudDogKG9wdGlvbnM6IHtcbiAgICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZTtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBpc0Rhbmdlcm91czogYm9vbGVhbjtcbiAgfSkgPT4gdm9pZDtcbiAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcblxuICBvcGVuTGluazogKHVybDogc3RyaW5nKSA9PiB2b2lkO1xuICBzY3JvbGxUb1F1b3RlZE1lc3NhZ2U6IChvcHRpb25zOiB7XG4gICAgYXV0aG9ySWQ6IHN0cmluZztcbiAgICBzZW50QXQ6IG51bWJlcjtcbiAgfSkgPT4gdm9pZDtcbiAgc2VsZWN0TWVzc2FnZT86IChtZXNzYWdlSWQ6IHN0cmluZywgY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcblxuICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3Q6ICgpID0+IHVua25vd247XG4gIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdDogKCkgPT4gdW5rbm93bjtcbn07XG5cbmV4cG9ydCB0eXBlIFByb3BzID0gUHJvcHNEYXRhICZcbiAgUHJvcHNIb3VzZWtlZXBpbmcgJlxuICBQcm9wc0FjdGlvbnMgJlxuICBQaWNrPFJlYWN0aW9uUGlja2VyUHJvcHMsICdyZW5kZXJFbW9qaVBpY2tlcic+O1xuXG50eXBlIFN0YXRlID0ge1xuICBtZXRhZGF0YVdpZHRoOiBudW1iZXI7XG5cbiAgZXhwaXJpbmc6IGJvb2xlYW47XG4gIGV4cGlyZWQ6IGJvb2xlYW47XG4gIGltYWdlQnJva2VuOiBib29sZWFuO1xuXG4gIGlzU2VsZWN0ZWQ/OiBib29sZWFuO1xuICBwcmV2U2VsZWN0ZWRDb3VudGVyPzogbnVtYmVyO1xuXG4gIHJlYWN0aW9uVmlld2VyUm9vdDogSFRNTERpdkVsZW1lbnQgfCBudWxsO1xuICByZWFjdGlvblBpY2tlclJvb3Q6IEhUTUxEaXZFbGVtZW50IHwgbnVsbDtcblxuICBnaWZ0QmFkZ2VDb3VudGVyOiBudW1iZXIgfCBudWxsO1xuICBzaG93T3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbDogYm9vbGVhbjtcblxuICBoYXNEZWxldGVGb3JFdmVyeW9uZVRpbWVyRXhwaXJlZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCBjbGFzcyBNZXNzYWdlIGV4dGVuZHMgUmVhY3QuUHVyZUNvbXBvbmVudDxQcm9wcywgU3RhdGU+IHtcbiAgcHVibGljIG1lbnVUcmlnZ2VyUmVmOiBUcmlnZ2VyIHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBmb2N1c1JlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxEaXZFbGVtZW50PiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIHB1YmxpYyBhdWRpb0J1dHRvblJlZjogUmVhY3QuUmVmT2JqZWN0PEhUTUxCdXR0b25FbGVtZW50PiA9IFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIHB1YmxpYyByZWFjdGlvbnNDb250YWluZXJSZWY6IFJlYWN0LlJlZk9iamVjdDxIVE1MRGl2RWxlbWVudD4gPVxuICAgIFJlYWN0LmNyZWF0ZVJlZigpO1xuXG4gIHB1YmxpYyByZWFjdGlvbnNDb250YWluZXJSZWZNZXJnZXIgPSBjcmVhdGVSZWZNZXJnZXIoKTtcblxuICBwdWJsaWMgZXhwaXJhdGlvbkNoZWNrSW50ZXJ2YWw6IE5vZGVKUy5UaW1lb3V0IHwgdW5kZWZpbmVkO1xuXG4gIHB1YmxpYyBnaWZ0QmFkZ2VJbnRlcnZhbDogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG5cbiAgcHVibGljIGV4cGlyZWRUaW1lb3V0OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgc2VsZWN0ZWRUaW1lb3V0OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgZGVsZXRlRm9yRXZlcnlvbmVUaW1lb3V0OiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcblxuICBwdWJsaWMgY29uc3RydWN0b3IocHJvcHM6IFByb3BzKSB7XG4gICAgc3VwZXIocHJvcHMpO1xuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIG1ldGFkYXRhV2lkdGg6IHRoaXMuZ3Vlc3NNZXRhZGF0YVdpZHRoKCksXG5cbiAgICAgIGV4cGlyaW5nOiBmYWxzZSxcbiAgICAgIGV4cGlyZWQ6IGZhbHNlLFxuICAgICAgaW1hZ2VCcm9rZW46IGZhbHNlLFxuXG4gICAgICBpc1NlbGVjdGVkOiBwcm9wcy5pc1NlbGVjdGVkLFxuICAgICAgcHJldlNlbGVjdGVkQ291bnRlcjogcHJvcHMuaXNTZWxlY3RlZENvdW50ZXIsXG5cbiAgICAgIHJlYWN0aW9uVmlld2VyUm9vdDogbnVsbCxcbiAgICAgIHJlYWN0aW9uUGlja2VyUm9vdDogbnVsbCxcblxuICAgICAgZ2lmdEJhZGdlQ291bnRlcjogbnVsbCxcbiAgICAgIHNob3dPdXRnb2luZ0dpZnRCYWRnZU1vZGFsOiBmYWxzZSxcblxuICAgICAgaGFzRGVsZXRlRm9yRXZlcnlvbmVUaW1lckV4cGlyZWQ6XG4gICAgICAgIHRoaXMuZ2V0VGltZVJlbWFpbmluZ0ZvckRlbGV0ZUZvckV2ZXJ5b25lKCkgPD0gMCxcbiAgICB9O1xuICB9XG5cbiAgcHVibGljIHN0YXRpYyBnZXREZXJpdmVkU3RhdGVGcm9tUHJvcHMocHJvcHM6IFByb3BzLCBzdGF0ZTogU3RhdGUpOiBTdGF0ZSB7XG4gICAgaWYgKCFwcm9wcy5pc1NlbGVjdGVkKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNTZWxlY3RlZDogZmFsc2UsXG4gICAgICAgIHByZXZTZWxlY3RlZENvdW50ZXI6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHByb3BzLmlzU2VsZWN0ZWQgJiZcbiAgICAgIHByb3BzLmlzU2VsZWN0ZWRDb3VudGVyICE9PSBzdGF0ZS5wcmV2U2VsZWN0ZWRDb3VudGVyXG4gICAgKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgaXNTZWxlY3RlZDogcHJvcHMuaXNTZWxlY3RlZCxcbiAgICAgICAgcHJldlNlbGVjdGVkQ291bnRlcjogcHJvcHMuaXNTZWxlY3RlZENvdW50ZXIsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiBzdGF0ZTtcbiAgfVxuXG4gIHByaXZhdGUgaGFzUmVhY3Rpb25zKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgcmVhY3Rpb25zIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiBCb29sZWFuKHJlYWN0aW9ucyAmJiByZWFjdGlvbnMubGVuZ3RoKTtcbiAgfVxuXG4gIHB1YmxpYyBjYXB0dXJlTWVudVRyaWdnZXIgPSAodHJpZ2dlclJlZjogVHJpZ2dlcik6IHZvaWQgPT4ge1xuICAgIHRoaXMubWVudVRyaWdnZXJSZWYgPSB0cmlnZ2VyUmVmO1xuICB9O1xuXG4gIHB1YmxpYyBzaG93TWVudSA9IChldmVudDogUmVhY3QuTW91c2VFdmVudDxIVE1MRGl2RWxlbWVudD4pOiB2b2lkID0+IHtcbiAgICBpZiAodGhpcy5tZW51VHJpZ2dlclJlZikge1xuICAgICAgdGhpcy5tZW51VHJpZ2dlclJlZi5oYW5kbGVDb250ZXh0Q2xpY2soZXZlbnQpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc2hvd0NvbnRleHRNZW51ID0gKGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50PEhUTUxEaXZFbGVtZW50Pik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHNlbGVjdGlvbiA9IHdpbmRvdy5nZXRTZWxlY3Rpb24oKTtcbiAgICBpZiAoc2VsZWN0aW9uICYmICFzZWxlY3Rpb24uaXNDb2xsYXBzZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGV2ZW50LnRhcmdldCBpbnN0YW5jZW9mIEhUTUxBbmNob3JFbGVtZW50KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHRoaXMuc2hvd01lbnUoZXZlbnQpO1xuICB9O1xuXG4gIHB1YmxpYyBoYW5kbGVJbWFnZUVycm9yID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgbG9nLmluZm8oXG4gICAgICBgTWVzc2FnZSAke2lkfTogSW1hZ2UgZmFpbGVkIHRvIGxvYWQ7IGZhaWxpbmcgb3ZlciB0byBwbGFjZWhvbGRlcmBcbiAgICApO1xuICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgaW1hZ2VCcm9rZW46IHRydWUsXG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIGhhbmRsZUZvY3VzID0gKCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgaW50ZXJhY3Rpb25Nb2RlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGludGVyYWN0aW9uTW9kZSA9PT0gJ2tleWJvYXJkJykge1xuICAgICAgdGhpcy5zZXRTZWxlY3RlZCgpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc2V0U2VsZWN0ZWQgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgeyBpZCwgY29udmVyc2F0aW9uSWQsIHNlbGVjdE1lc3NhZ2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoc2VsZWN0TWVzc2FnZSkge1xuICAgICAgc2VsZWN0TWVzc2FnZShpZCwgY29udmVyc2F0aW9uSWQpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgc2V0Rm9jdXMgPSAoKTogdm9pZCA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gdGhpcy5mb2N1c1JlZi5jdXJyZW50O1xuXG4gICAgaWYgKGNvbnRhaW5lciAmJiAhY29udGFpbmVyLmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICBjb250YWluZXIuZm9jdXMoKTtcbiAgICB9XG4gIH07XG5cbiAgcHVibGljIG92ZXJyaWRlIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IHRoaXMucHJvcHM7XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXI/Lm9uQ29udm9NZXNzYWdlTW91bnQoY29udmVyc2F0aW9uSWQpO1xuXG4gICAgdGhpcy5zdGFydFNlbGVjdGVkVGltZXIoKTtcbiAgICB0aGlzLnN0YXJ0RGVsZXRlRm9yRXZlcnlvbmVUaW1lcklmQXBwbGljYWJsZSgpO1xuICAgIHRoaXMuc3RhcnRHaWZ0QmFkZ2VJbnRlcnZhbCgpO1xuXG4gICAgY29uc3QgeyBpc1NlbGVjdGVkIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChpc1NlbGVjdGVkKSB7XG4gICAgICB0aGlzLnNldEZvY3VzKCk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBleHBpcmF0aW9uTGVuZ3RoIH0gPSB0aGlzLnByb3BzO1xuICAgIGlmIChleHBpcmF0aW9uTGVuZ3RoKSB7XG4gICAgICBjb25zdCBpbmNyZW1lbnQgPSBnZXRJbmNyZW1lbnQoZXhwaXJhdGlvbkxlbmd0aCk7XG4gICAgICBjb25zdCBjaGVja0ZyZXF1ZW5jeSA9IE1hdGgubWF4KEVYUElSQVRJT05fQ0hFQ0tfTUlOSU1VTSwgaW5jcmVtZW50KTtcblxuICAgICAgdGhpcy5jaGVja0V4cGlyZWQoKTtcblxuICAgICAgdGhpcy5leHBpcmF0aW9uQ2hlY2tJbnRlcnZhbCA9IHNldEludGVydmFsKCgpID0+IHtcbiAgICAgICAgdGhpcy5jaGVja0V4cGlyZWQoKTtcbiAgICAgIH0sIGNoZWNrRnJlcXVlbmN5KTtcbiAgICB9XG5cbiAgICBjb25zdCB7IGNvbnRhY3QsIGNoZWNrRm9yQWNjb3VudCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoY29udGFjdCAmJiBjb250YWN0LmZpcnN0TnVtYmVyICYmICFjb250YWN0LnV1aWQpIHtcbiAgICAgIGNoZWNrRm9yQWNjb3VudChjb250YWN0LmZpcnN0TnVtYmVyKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50V2lsbFVubW91bnQoKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGhpcy5zZWxlY3RlZFRpbWVvdXQpO1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMuZXhwaXJhdGlvbkNoZWNrSW50ZXJ2YWwpO1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMuZXhwaXJlZFRpbWVvdXQpO1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMuZGVsZXRlRm9yRXZlcnlvbmVUaW1lb3V0KTtcbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLmdpZnRCYWRnZUludGVydmFsKTtcbiAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uVmlld2VyKHRydWUpO1xuICAgIHRoaXMudG9nZ2xlUmVhY3Rpb25QaWNrZXIodHJ1ZSk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50RGlkVXBkYXRlKHByZXZQcm9wczogUmVhZG9ubHk8UHJvcHM+KTogdm9pZCB7XG4gICAgY29uc3QgeyBpc1NlbGVjdGVkLCBzdGF0dXMsIHRpbWVzdGFtcCB9ID0gdGhpcy5wcm9wcztcblxuICAgIHRoaXMuc3RhcnRTZWxlY3RlZFRpbWVyKCk7XG4gICAgdGhpcy5zdGFydERlbGV0ZUZvckV2ZXJ5b25lVGltZXJJZkFwcGxpY2FibGUoKTtcblxuICAgIGlmICghcHJldlByb3BzLmlzU2VsZWN0ZWQgJiYgaXNTZWxlY3RlZCkge1xuICAgICAgdGhpcy5zZXRGb2N1cygpO1xuICAgIH1cblxuICAgIHRoaXMuY2hlY2tFeHBpcmVkKCk7XG5cbiAgICBpZiAoXG4gICAgICBwcmV2UHJvcHMuc3RhdHVzID09PSAnc2VuZGluZycgJiZcbiAgICAgIChzdGF0dXMgPT09ICdzZW50JyB8fFxuICAgICAgICBzdGF0dXMgPT09ICdkZWxpdmVyZWQnIHx8XG4gICAgICAgIHN0YXR1cyA9PT0gJ3JlYWQnIHx8XG4gICAgICAgIHN0YXR1cyA9PT0gJ3ZpZXdlZCcpXG4gICAgKSB7XG4gICAgICBjb25zdCBkZWx0YSA9IERhdGUubm93KCkgLSB0aW1lc3RhbXA7XG4gICAgICB3aW5kb3cuQ0k/LmhhbmRsZUV2ZW50KCdtZXNzYWdlOnNlbmQtY29tcGxldGUnLCB7XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgZGVsdGEsXG4gICAgICB9KTtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgTWVzc2FnZS50c3g6IFJlbmRlcmVkICdzZW5kIGNvbXBsZXRlJyBmb3IgbWVzc2FnZSAke3RpbWVzdGFtcH07IHRvb2sgJHtkZWx0YX1tc2BcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBnZXRNZXRhZGF0YVBsYWNlbWVudChcbiAgICB7XG4gICAgICBhdHRhY2htZW50cyxcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZSxcbiAgICAgIGV4cGlyYXRpb25MZW5ndGgsXG4gICAgICBleHBpcmF0aW9uVGltZXN0YW1wLFxuICAgICAgZ2lmdEJhZGdlLFxuICAgICAgaTE4bixcbiAgICAgIHNob3VsZEhpZGVNZXRhZGF0YSxcbiAgICAgIHN0YXR1cyxcbiAgICAgIHRleHQsXG4gICAgICB0ZXh0RGlyZWN0aW9uLFxuICAgIH06IFJlYWRvbmx5PFByb3BzPiA9IHRoaXMucHJvcHNcbiAgKTogTWV0YWRhdGFQbGFjZW1lbnQge1xuICAgIGNvbnN0IGlzUlRMID0gdGV4dERpcmVjdGlvbiA9PT0gVGV4dERpcmVjdGlvbi5SaWdodFRvTGVmdDtcblxuICAgIGlmIChcbiAgICAgICFleHBpcmF0aW9uTGVuZ3RoICYmXG4gICAgICAhZXhwaXJhdGlvblRpbWVzdGFtcCAmJlxuICAgICAgKCFzdGF0dXMgfHwgU0VOVF9TVEFUVVNFUy5oYXMoc3RhdHVzKSkgJiZcbiAgICAgIHNob3VsZEhpZGVNZXRhZGF0YVxuICAgICkge1xuICAgICAgcmV0dXJuIE1ldGFkYXRhUGxhY2VtZW50Lk5vdFJlbmRlcmVkO1xuICAgIH1cblxuICAgIGlmIChnaWZ0QmFkZ2UpIHtcbiAgICAgIGNvbnN0IGRlc2NyaXB0aW9uID0gaTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS11bm9wZW5lZCcpO1xuICAgICAgY29uc3QgaXNEZXNjcmlwdGlvblJUTCA9IGdldERpcmVjdGlvbihkZXNjcmlwdGlvbikgPT09ICdydGwnO1xuXG4gICAgICBpZiAoZ2lmdEJhZGdlLnN0YXRlID09PSBHaWZ0QmFkZ2VTdGF0ZXMuVW5vcGVuZWQgJiYgIWlzRGVzY3JpcHRpb25SVEwpIHtcbiAgICAgICAgcmV0dXJuIE1ldGFkYXRhUGxhY2VtZW50LklubGluZVdpdGhUZXh0O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gTWV0YWRhdGFQbGFjZW1lbnQuQm90dG9tO1xuICAgIH1cblxuICAgIGlmICghdGV4dCAmJiAhZGVsZXRlZEZvckV2ZXJ5b25lKSB7XG4gICAgICByZXR1cm4gaXNBdWRpbyhhdHRhY2htZW50cylcbiAgICAgICAgPyBNZXRhZGF0YVBsYWNlbWVudC5SZW5kZXJlZEJ5TWVzc2FnZUF1ZGlvQ29tcG9uZW50XG4gICAgICAgIDogTWV0YWRhdGFQbGFjZW1lbnQuQm90dG9tO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmNhblJlbmRlclN0aWNrZXJMaWtlRW1vamkoKSkge1xuICAgICAgcmV0dXJuIE1ldGFkYXRhUGxhY2VtZW50LkJvdHRvbTtcbiAgICB9XG5cbiAgICBpZiAoaXNSVEwpIHtcbiAgICAgIHJldHVybiBNZXRhZGF0YVBsYWNlbWVudC5Cb3R0b207XG4gICAgfVxuXG4gICAgcmV0dXJuIE1ldGFkYXRhUGxhY2VtZW50LklubGluZVdpdGhUZXh0O1xuICB9XG5cbiAgLyoqXG4gICAqIEEgbG90IG9mIHRoZSB0aW1lLCB3ZSBhZGQgYW4gaW52aXNpYmxlIGlubGluZSBzcGFjZXIgZm9yIG1lc3NhZ2VzLiBUaGlzIHNwYWNlciBpcyB0aGVcbiAgICogc2FtZSBzaXplIGFzIHRoZSBtZXNzYWdlIG1ldGFkYXRhLiBVbmZvcnR1bmF0ZWx5LCB3ZSBkb24ndCBrbm93IGhvdyB3aWRlIGl0IGlzIHVudGlsXG4gICAqIHdlIHJlbmRlciBpdC5cbiAgICpcbiAgICogVGhpcyB3aWxsIHByb2JhYmx5IGd1ZXNzIHdyb25nLCBidXQgaXQncyB2YWx1YWJsZSB0byBnZXQgY2xvc2UgdG8gdGhlIHJlYWwgdmFsdWVcbiAgICogYmVjYXVzZSBpdCBjYW4gcmVkdWNlIGxheW91dCBqdW1waW5lc3MuXG4gICAqL1xuICBwcml2YXRlIGd1ZXNzTWV0YWRhdGFXaWR0aCgpOiBudW1iZXIge1xuICAgIGNvbnN0IHsgZGlyZWN0aW9uLCBleHBpcmF0aW9uTGVuZ3RoLCBzdGF0dXMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBsZXQgcmVzdWx0ID0gR1VFU1NfTUVUQURBVEFfV0lEVEhfVElNRVNUQU1QX1NJWkU7XG5cbiAgICBjb25zdCBoYXNFeHBpcmVUaW1lciA9IEJvb2xlYW4oZXhwaXJhdGlvbkxlbmd0aCk7XG4gICAgaWYgKGhhc0V4cGlyZVRpbWVyKSB7XG4gICAgICByZXN1bHQgKz0gR1VFU1NfTUVUQURBVEFfV0lEVEhfRVhQSVJFX1RJTUVSX1NJWkU7XG4gICAgfVxuXG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ291dGdvaW5nJyAmJiBzdGF0dXMpIHtcbiAgICAgIHJlc3VsdCArPSBHVUVTU19NRVRBREFUQV9XSURUSF9PVVRHT0lOR19TSVpFW3N0YXR1c107XG4gICAgfVxuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHB1YmxpYyBzdGFydFNlbGVjdGVkVGltZXIoKTogdm9pZCB7XG4gICAgY29uc3QgeyBjbGVhclNlbGVjdGVkTWVzc2FnZSwgaW50ZXJhY3Rpb25Nb2RlIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaXNTZWxlY3RlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGlmIChpbnRlcmFjdGlvbk1vZGUgPT09ICdrZXlib2FyZCcgfHwgIWlzU2VsZWN0ZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2VsZWN0ZWRUaW1lb3V0KSB7XG4gICAgICB0aGlzLnNlbGVjdGVkVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICB0aGlzLnNlbGVjdGVkVGltZW91dCA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IGlzU2VsZWN0ZWQ6IGZhbHNlIH0pO1xuICAgICAgICBjbGVhclNlbGVjdGVkTWVzc2FnZSgpO1xuICAgICAgfSwgU0VMRUNURURfVElNRU9VVCk7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIHN0YXJ0R2lmdEJhZGdlSW50ZXJ2YWwoKTogdm9pZCB7XG4gICAgY29uc3QgeyBnaWZ0QmFkZ2UgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWdpZnRCYWRnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZ2lmdEJhZGdlSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICB0aGlzLnVwZGF0ZUdpZnRCYWRnZUNvdW50ZXIoKTtcbiAgICB9LCBHSUZUX0JBREdFX1VQREFURV9JTlRFUlZBTCk7XG4gIH1cblxuICBwdWJsaWMgdXBkYXRlR2lmdEJhZGdlQ291bnRlcigpOiB2b2lkIHtcbiAgICB0aGlzLnNldFN0YXRlKChzdGF0ZTogU3RhdGUpID0+ICh7XG4gICAgICBnaWZ0QmFkZ2VDb3VudGVyOiAoc3RhdGUuZ2lmdEJhZGdlQ291bnRlciB8fCAwKSArIDEsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRUaW1lUmVtYWluaW5nRm9yRGVsZXRlRm9yRXZlcnlvbmUoKTogbnVtYmVyIHtcbiAgICBjb25zdCB7IHRpbWVzdGFtcCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gTWF0aC5tYXgodGltZXN0YW1wIC0gRGF0ZS5ub3coKSArIFRIUkVFX0hPVVJTLCAwKTtcbiAgfVxuXG4gIHByaXZhdGUgY2FuRGVsZXRlRm9yRXZlcnlvbmUoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBjYW5EZWxldGVGb3JFdmVyeW9uZSB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGhhc0RlbGV0ZUZvckV2ZXJ5b25lVGltZXJFeHBpcmVkIH0gPSB0aGlzLnN0YXRlO1xuICAgIHJldHVybiBjYW5EZWxldGVGb3JFdmVyeW9uZSAmJiAhaGFzRGVsZXRlRm9yRXZlcnlvbmVUaW1lckV4cGlyZWQ7XG4gIH1cblxuICBwcml2YXRlIHN0YXJ0RGVsZXRlRm9yRXZlcnlvbmVUaW1lcklmQXBwbGljYWJsZSgpOiB2b2lkIHtcbiAgICBjb25zdCB7IGNhbkRlbGV0ZUZvckV2ZXJ5b25lIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaGFzRGVsZXRlRm9yRXZlcnlvbmVUaW1lckV4cGlyZWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKFxuICAgICAgIWNhbkRlbGV0ZUZvckV2ZXJ5b25lIHx8XG4gICAgICBoYXNEZWxldGVGb3JFdmVyeW9uZVRpbWVyRXhwaXJlZCB8fFxuICAgICAgdGhpcy5kZWxldGVGb3JFdmVyeW9uZVRpbWVvdXRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmRlbGV0ZUZvckV2ZXJ5b25lVGltZW91dCA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7IGhhc0RlbGV0ZUZvckV2ZXJ5b25lVGltZXJFeHBpcmVkOiB0cnVlIH0pO1xuICAgICAgZGVsZXRlIHRoaXMuZGVsZXRlRm9yRXZlcnlvbmVUaW1lb3V0O1xuICAgIH0sIHRoaXMuZ2V0VGltZVJlbWFpbmluZ0ZvckRlbGV0ZUZvckV2ZXJ5b25lKCkpO1xuICB9XG5cbiAgcHVibGljIGNoZWNrRXhwaXJlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHsgZXhwaXJhdGlvblRpbWVzdGFtcCwgZXhwaXJhdGlvbkxlbmd0aCB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghZXhwaXJhdGlvblRpbWVzdGFtcCB8fCAhZXhwaXJhdGlvbkxlbmd0aCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5leHBpcmVkVGltZW91dCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChub3cgPj0gZXhwaXJhdGlvblRpbWVzdGFtcCkge1xuICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgIGV4cGlyaW5nOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IHNldEV4cGlyZWQgPSAoKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgIGV4cGlyZWQ6IHRydWUsXG4gICAgICAgIH0pO1xuICAgICAgfTtcbiAgICAgIHRoaXMuZXhwaXJlZFRpbWVvdXQgPSBzZXRUaW1lb3V0KHNldEV4cGlyZWQsIEVYUElSRURfREVMQVkpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXJlTGlua3NFbmFibGVkKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkLCBpc0Jsb2NrZWQgfSA9IHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZCAmJiAhaXNCbG9ja2VkO1xuICB9XG5cbiAgcHJpdmF0ZSBzaG91bGRSZW5kZXJBdXRob3IoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBhdXRob3IsIGNvbnZlcnNhdGlvblR5cGUsIGRpcmVjdGlvbiwgc2hvdWxkQ29sbGFwc2VBYm92ZSB9ID1cbiAgICAgIHRoaXMucHJvcHM7XG4gICAgcmV0dXJuIEJvb2xlYW4oXG4gICAgICBkaXJlY3Rpb24gPT09ICdpbmNvbWluZycgJiZcbiAgICAgICAgY29udmVyc2F0aW9uVHlwZSA9PT0gJ2dyb3VwJyAmJlxuICAgICAgICBhdXRob3IudGl0bGUgJiZcbiAgICAgICAgIXNob3VsZENvbGxhcHNlQWJvdmVcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBjYW5SZW5kZXJTdGlja2VyTGlrZUVtb2ppKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgdGV4dCwgcXVvdGUsIGF0dGFjaG1lbnRzLCBwcmV2aWV3cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIHJldHVybiBCb29sZWFuKFxuICAgICAgdGV4dCAmJlxuICAgICAgICBpc0Vtb2ppT25seVRleHQodGV4dCkgJiZcbiAgICAgICAgZ2V0RW1vamlDb3VudCh0ZXh0KSA8IDYgJiZcbiAgICAgICAgIXF1b3RlICYmXG4gICAgICAgICghYXR0YWNobWVudHMgfHwgIWF0dGFjaG1lbnRzLmxlbmd0aCkgJiZcbiAgICAgICAgKCFwcmV2aWV3cyB8fCAhcHJldmlld3MubGVuZ3RoKVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHVwZGF0ZU1ldGFkYXRhV2lkdGggPSAobmV3TWV0YWRhdGFXaWR0aDogbnVtYmVyKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSgoeyBtZXRhZGF0YVdpZHRoIH0pID0+ICh7XG4gICAgICAvLyBXZSBkb24ndCB3YW50IHRleHQgdG8ganVtcCBhcm91bmQgaWYgdGhlIG1ldGFkYXRhIHNocmlua3MsIGJ1dCB3ZSB3YW50IHRvIG1ha2VcbiAgICAgIC8vICAgc3VyZSB3ZSBoYXZlIGVub3VnaCByb29tLlxuICAgICAgbWV0YWRhdGFXaWR0aDogTWF0aC5tYXgobWV0YWRhdGFXaWR0aCwgbmV3TWV0YWRhdGFXaWR0aCksXG4gICAgfSkpO1xuICB9O1xuXG4gIHByaXZhdGUgcmVuZGVyTWV0YWRhdGEoKTogUmVhY3ROb2RlIHtcbiAgICBsZXQgaXNJbmxpbmU6IGJvb2xlYW47XG4gICAgY29uc3QgbWV0YWRhdGFQbGFjZW1lbnQgPSB0aGlzLmdldE1ldGFkYXRhUGxhY2VtZW50KCk7XG4gICAgc3dpdGNoIChtZXRhZGF0YVBsYWNlbWVudCkge1xuICAgICAgY2FzZSBNZXRhZGF0YVBsYWNlbWVudC5Ob3RSZW5kZXJlZDpcbiAgICAgIGNhc2UgTWV0YWRhdGFQbGFjZW1lbnQuUmVuZGVyZWRCeU1lc3NhZ2VBdWRpb0NvbXBvbmVudDpcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICBjYXNlIE1ldGFkYXRhUGxhY2VtZW50LklubGluZVdpdGhUZXh0OlxuICAgICAgICBpc0lubGluZSA9IHRydWU7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBNZXRhZGF0YVBsYWNlbWVudC5Cb3R0b206XG4gICAgICAgIGlzSW5saW5lID0gZmFsc2U7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgbG9nLmVycm9yKG1pc3NpbmdDYXNlRXJyb3IobWV0YWRhdGFQbGFjZW1lbnQpKTtcbiAgICAgICAgaXNJbmxpbmUgPSBmYWxzZTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgZXhwaXJhdGlvbkxlbmd0aCxcbiAgICAgIGV4cGlyYXRpb25UaW1lc3RhbXAsXG4gICAgICBpc1N0aWNrZXIsXG4gICAgICBpc1RhcFRvVmlld0V4cGlyZWQsXG4gICAgICBzdGF0dXMsXG4gICAgICBpMThuLFxuICAgICAgdGV4dCxcbiAgICAgIHRleHRBdHRhY2htZW50LFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgaWQsXG4gICAgICBzaG93TWVzc2FnZURldGFpbCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGlzU3RpY2tlckxpa2UgPSBpc1N0aWNrZXIgfHwgdGhpcy5jYW5SZW5kZXJTdGlja2VyTGlrZUVtb2ppKCk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPE1lc3NhZ2VNZXRhZGF0YVxuICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmU9e2RlbGV0ZWRGb3JFdmVyeW9uZX1cbiAgICAgICAgZGlyZWN0aW9uPXtkaXJlY3Rpb259XG4gICAgICAgIGV4cGlyYXRpb25MZW5ndGg9e2V4cGlyYXRpb25MZW5ndGh9XG4gICAgICAgIGV4cGlyYXRpb25UaW1lc3RhbXA9e2V4cGlyYXRpb25UaW1lc3RhbXB9XG4gICAgICAgIGhhc1RleHQ9e0Jvb2xlYW4odGV4dCl9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgaXNJbmxpbmU9e2lzSW5saW5lfVxuICAgICAgICBpc1Nob3dpbmdJbWFnZT17dGhpcy5pc1Nob3dpbmdJbWFnZSgpfVxuICAgICAgICBpc1N0aWNrZXI9e2lzU3RpY2tlckxpa2V9XG4gICAgICAgIGlzVGFwVG9WaWV3RXhwaXJlZD17aXNUYXBUb1ZpZXdFeHBpcmVkfVxuICAgICAgICBvbldpZHRoTWVhc3VyZWQ9e2lzSW5saW5lID8gdGhpcy51cGRhdGVNZXRhZGF0YVdpZHRoIDogdW5kZWZpbmVkfVxuICAgICAgICBzaG93TWVzc2FnZURldGFpbD17c2hvd01lc3NhZ2VEZXRhaWx9XG4gICAgICAgIHN0YXR1cz17c3RhdHVzfVxuICAgICAgICB0ZXh0UGVuZGluZz17dGV4dEF0dGFjaG1lbnQ/LnBlbmRpbmd9XG4gICAgICAgIHRpbWVzdGFtcD17dGltZXN0YW1wfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJBdXRob3IoKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7XG4gICAgICBhdXRob3IsXG4gICAgICBjb250YWN0TmFtZUNvbG9yLFxuICAgICAgaXNTdGlja2VyLFxuICAgICAgaXNUYXBUb1ZpZXcsXG4gICAgICBpc1RhcFRvVmlld0V4cGlyZWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMuc2hvdWxkUmVuZGVyQXV0aG9yKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHdpdGhUYXBUb1ZpZXdFeHBpcmVkID0gaXNUYXBUb1ZpZXcgJiYgaXNUYXBUb1ZpZXdFeHBpcmVkO1xuXG4gICAgY29uc3Qgc3RpY2tlclN1ZmZpeCA9IGlzU3RpY2tlciA/ICdfd2l0aF9zdGlja2VyJyA6ICcnO1xuICAgIGNvbnN0IHRhcFRvVmlld1N1ZmZpeCA9IHdpdGhUYXBUb1ZpZXdFeHBpcmVkXG4gICAgICA/ICctLXdpdGgtdGFwLXRvLXZpZXctZXhwaXJlZCdcbiAgICAgIDogJyc7XG4gICAgY29uc3QgbW9kdWxlTmFtZSA9IGBtb2R1bGUtbWVzc2FnZV9fYXV0aG9yJHtzdGlja2VyU3VmZml4fSR7dGFwVG9WaWV3U3VmZml4fWA7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9e21vZHVsZU5hbWV9PlxuICAgICAgICA8Q29udGFjdE5hbWVcbiAgICAgICAgICBjb250YWN0TmFtZUNvbG9yPXtjb250YWN0TmFtZUNvbG9yfVxuICAgICAgICAgIHRpdGxlPXthdXRob3IudGl0bGV9XG4gICAgICAgICAgbW9kdWxlPXttb2R1bGVOYW1lfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJBdHRhY2htZW50KCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qge1xuICAgICAgYXR0YWNobWVudHMsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBleHBpcmF0aW9uTGVuZ3RoLFxuICAgICAgZXhwaXJhdGlvblRpbWVzdGFtcCxcbiAgICAgIGkxOG4sXG4gICAgICBpZCxcbiAgICAgIGlzU3RpY2tlcixcbiAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkLFxuICAgICAgbWFya1ZpZXdlZCxcbiAgICAgIHF1b3RlLFxuICAgICAgcmVhZFN0YXR1cyxcbiAgICAgIHJlZHVjZWRNb3Rpb24sXG4gICAgICByZW5kZXJBdWRpb0F0dGFjaG1lbnQsXG4gICAgICByZW5kZXJpbmdDb250ZXh0LFxuICAgICAgc2hvd01lc3NhZ2VEZXRhaWwsXG4gICAgICBzaG93VmlzdWFsQXR0YWNobWVudCxcbiAgICAgIHNob3VsZENvbGxhcHNlQWJvdmUsXG4gICAgICBzaG91bGRDb2xsYXBzZUJlbG93LFxuICAgICAgc3RhdHVzLFxuICAgICAgdGV4dCxcbiAgICAgIHRleHRBdHRhY2htZW50LFxuICAgICAgdGhlbWUsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCB7IGltYWdlQnJva2VuIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgY29sbGFwc2VNZXRhZGF0YSA9XG4gICAgICB0aGlzLmdldE1ldGFkYXRhUGxhY2VtZW50KCkgPT09IE1ldGFkYXRhUGxhY2VtZW50Lk5vdFJlbmRlcmVkO1xuXG4gICAgaWYgKCFhdHRhY2htZW50cyB8fCAhYXR0YWNobWVudHNbMF0pIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICBjb25zdCBmaXJzdEF0dGFjaG1lbnQgPSBhdHRhY2htZW50c1swXTtcblxuICAgIC8vIEZvciBhdHRhY2htZW50cyB3aGljaCBhcmVuJ3QgZnVsbC1mcmFtZVxuICAgIGNvbnN0IHdpdGhDb250ZW50QmVsb3cgPSBCb29sZWFuKHRleHQpO1xuICAgIGNvbnN0IHdpdGhDb250ZW50QWJvdmUgPSBCb29sZWFuKHF1b3RlKSB8fCB0aGlzLnNob3VsZFJlbmRlckF1dGhvcigpO1xuICAgIGNvbnN0IGRpc3BsYXlJbWFnZSA9IGNhbkRpc3BsYXlJbWFnZShhdHRhY2htZW50cyk7XG5cbiAgICBpZiAoZGlzcGxheUltYWdlICYmICFpbWFnZUJyb2tlbikge1xuICAgICAgY29uc3QgcHJlZml4ID0gaXNTdGlja2VyID8gJ3N0aWNrZXInIDogJ2F0dGFjaG1lbnQnO1xuICAgICAgY29uc3QgY29udGFpbmVyQ2xhc3NOYW1lID0gY2xhc3NOYW1lcyhcbiAgICAgICAgYG1vZHVsZS1tZXNzYWdlX18ke3ByZWZpeH0tY29udGFpbmVyYCxcbiAgICAgICAgd2l0aENvbnRlbnRBYm92ZVxuICAgICAgICAgID8gYG1vZHVsZS1tZXNzYWdlX18ke3ByZWZpeH0tY29udGFpbmVyLS13aXRoLWNvbnRlbnQtYWJvdmVgXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICB3aXRoQ29udGVudEJlbG93XG4gICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX2F0dGFjaG1lbnQtY29udGFpbmVyLS13aXRoLWNvbnRlbnQtYmVsb3cnXG4gICAgICAgICAgOiBudWxsLFxuICAgICAgICBpc1N0aWNrZXIgJiYgIWNvbGxhcHNlTWV0YWRhdGFcbiAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fc3RpY2tlci1jb250YWluZXItLXdpdGgtY29udGVudC1iZWxvdydcbiAgICAgICAgICA6IG51bGxcbiAgICAgICk7XG5cbiAgICAgIGlmIChpc0dJRihhdHRhY2htZW50cykpIHtcbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxHSUZcbiAgICAgICAgICAgICAgYXR0YWNobWVudD17Zmlyc3RBdHRhY2htZW50fVxuICAgICAgICAgICAgICBzaXplPXtHSUZfU0laRX1cbiAgICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgICAgICAgcmVkdWNlZE1vdGlvbj17cmVkdWNlZE1vdGlvbn1cbiAgICAgICAgICAgICAgb25FcnJvcj17dGhpcy5oYW5kbGVJbWFnZUVycm9yfVxuICAgICAgICAgICAgICBzaG93VmlzdWFsQXR0YWNobWVudD17KCkgPT4ge1xuICAgICAgICAgICAgICAgIHNob3dWaXN1YWxBdHRhY2htZW50KHtcbiAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6IGZpcnN0QXR0YWNobWVudCxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VJZDogaWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQ9eygpID0+IHtcbiAgICAgICAgICAgICAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkKHtcbiAgICAgICAgICAgICAgICAgIGF0dGFjaG1lbnQ6IGZpcnN0QXR0YWNobWVudCxcbiAgICAgICAgICAgICAgICAgIG1lc3NhZ2VJZDogaWQsXG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNJbWFnZShhdHRhY2htZW50cykgfHwgaXNWaWRlbyhhdHRhY2htZW50cykpIHtcbiAgICAgICAgY29uc3QgYm90dG9tT3ZlcmxheSA9ICFpc1N0aWNrZXIgJiYgIWNvbGxhcHNlTWV0YWRhdGE7XG4gICAgICAgIC8vIFdlIG9ubHkgd2FudCB1c2VycyB0byB0YWIgaW50byB0aGlzIGlmIHRoZXJlJ3MgbW9yZSB0aGFuIG9uZVxuICAgICAgICBjb25zdCB0YWJJbmRleCA9IGF0dGFjaG1lbnRzLmxlbmd0aCA+IDEgPyAwIDogLTE7XG5cbiAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT17Y29udGFpbmVyQ2xhc3NOYW1lfT5cbiAgICAgICAgICAgIDxJbWFnZUdyaWRcbiAgICAgICAgICAgICAgYXR0YWNobWVudHM9e2F0dGFjaG1lbnRzfVxuICAgICAgICAgICAgICBkaXJlY3Rpb249e2RpcmVjdGlvbn1cbiAgICAgICAgICAgICAgd2l0aENvbnRlbnRBYm92ZT17aXNTdGlja2VyIHx8IHdpdGhDb250ZW50QWJvdmV9XG4gICAgICAgICAgICAgIHdpdGhDb250ZW50QmVsb3c9e2lzU3RpY2tlciB8fCB3aXRoQ29udGVudEJlbG93fVxuICAgICAgICAgICAgICBpc1N0aWNrZXI9e2lzU3RpY2tlcn1cbiAgICAgICAgICAgICAgc3RpY2tlclNpemU9e1NUSUNLRVJfU0laRX1cbiAgICAgICAgICAgICAgYm90dG9tT3ZlcmxheT17Ym90dG9tT3ZlcmxheX1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgb25FcnJvcj17dGhpcy5oYW5kbGVJbWFnZUVycm9yfVxuICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgIHNob3VsZENvbGxhcHNlQWJvdmU9e3Nob3VsZENvbGxhcHNlQWJvdmV9XG4gICAgICAgICAgICAgIHNob3VsZENvbGxhcHNlQmVsb3c9e3Nob3VsZENvbGxhcHNlQmVsb3d9XG4gICAgICAgICAgICAgIHRhYkluZGV4PXt0YWJJbmRleH1cbiAgICAgICAgICAgICAgb25DbGljaz17YXR0YWNobWVudCA9PiB7XG4gICAgICAgICAgICAgICAgaWYgKCFpc0Rvd25sb2FkZWQoYXR0YWNobWVudCkpIHtcbiAgICAgICAgICAgICAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoeyBhdHRhY2htZW50LCBtZXNzYWdlSWQ6IGlkIH0pO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICBzaG93VmlzdWFsQXR0YWNobWVudCh7IGF0dGFjaG1lbnQsIG1lc3NhZ2VJZDogaWQgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKGlzQXVkaW8oYXR0YWNobWVudHMpKSB7XG4gICAgICBsZXQgcGxheWVkOiBib29sZWFuO1xuICAgICAgc3dpdGNoIChkaXJlY3Rpb24pIHtcbiAgICAgICAgY2FzZSAnb3V0Z29pbmcnOlxuICAgICAgICAgIHBsYXllZCA9IHN0YXR1cyA9PT0gJ3ZpZXdlZCc7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgJ2luY29taW5nJzpcbiAgICAgICAgICBwbGF5ZWQgPSByZWFkU3RhdHVzID09PSBSZWFkU3RhdHVzLlZpZXdlZDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBsb2cuZXJyb3IobWlzc2luZ0Nhc2VFcnJvcihkaXJlY3Rpb24pKTtcbiAgICAgICAgICBwbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlbmRlckF1ZGlvQXR0YWNobWVudCh7XG4gICAgICAgIGkxOG4sXG4gICAgICAgIGJ1dHRvblJlZjogdGhpcy5hdWRpb0J1dHRvblJlZixcbiAgICAgICAgcmVuZGVyaW5nQ29udGV4dCxcbiAgICAgICAgdGhlbWUsXG4gICAgICAgIGF0dGFjaG1lbnQ6IGZpcnN0QXR0YWNobWVudCxcbiAgICAgICAgY29sbGFwc2VNZXRhZGF0YSxcbiAgICAgICAgd2l0aENvbnRlbnRBYm92ZSxcbiAgICAgICAgd2l0aENvbnRlbnRCZWxvdyxcblxuICAgICAgICBkaXJlY3Rpb24sXG4gICAgICAgIGV4cGlyYXRpb25MZW5ndGgsXG4gICAgICAgIGV4cGlyYXRpb25UaW1lc3RhbXAsXG4gICAgICAgIGlkLFxuICAgICAgICBwbGF5ZWQsXG4gICAgICAgIHNob3dNZXNzYWdlRGV0YWlsLFxuICAgICAgICBzdGF0dXMsXG4gICAgICAgIHRleHRQZW5kaW5nOiB0ZXh0QXR0YWNobWVudD8ucGVuZGluZyxcbiAgICAgICAgdGltZXN0YW1wLFxuXG4gICAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoKSB7XG4gICAgICAgICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCh7XG4gICAgICAgICAgICBhdHRhY2htZW50OiBmaXJzdEF0dGFjaG1lbnQsXG4gICAgICAgICAgICBtZXNzYWdlSWQ6IGlkLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9LFxuICAgICAgICBvbkNvcnJ1cHRlZCgpIHtcbiAgICAgICAgICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkKHtcbiAgICAgICAgICAgIGF0dGFjaG1lbnQ6IGZpcnN0QXR0YWNobWVudCxcbiAgICAgICAgICAgIG1lc3NhZ2VJZDogaWQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uRmlyc3RQbGF5ZWQoKSB7XG4gICAgICAgICAgbWFya1ZpZXdlZChpZCk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICB9XG4gICAgY29uc3QgeyBwZW5kaW5nLCBmaWxlTmFtZSwgZmlsZVNpemUsIGNvbnRlbnRUeXBlIH0gPSBmaXJzdEF0dGFjaG1lbnQ7XG4gICAgY29uc3QgZXh0ZW5zaW9uID0gZ2V0RXh0ZW5zaW9uRm9yRGlzcGxheSh7IGNvbnRlbnRUeXBlLCBmaWxlTmFtZSB9KTtcbiAgICBjb25zdCBpc0Rhbmdlcm91cyA9IGlzRmlsZURhbmdlcm91cyhmaWxlTmFtZSB8fCAnJyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fZ2VuZXJpYy1hdHRhY2htZW50JyxcbiAgICAgICAgICB3aXRoQ29udGVudEJlbG93XG4gICAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fZ2VuZXJpYy1hdHRhY2htZW50LS13aXRoLWNvbnRlbnQtYmVsb3cnXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgd2l0aENvbnRlbnRBYm92ZVxuICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudC0td2l0aC1jb250ZW50LWFib3ZlJ1xuICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICFmaXJzdEF0dGFjaG1lbnQudXJsXG4gICAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fZ2VuZXJpYy1hdHRhY2htZW50LS1ub3QtYWN0aXZlJ1xuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICl9XG4gICAgICAgIC8vIFRoZXJlJ3Mgb25seSBldmVyIG9uZSBvZiB0aGVzZSwgc28gd2UgZG9uJ3Qgd2FudCB1c2VycyB0byB0YWIgaW50byBpdFxuICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgIG9uQ2xpY2s9e3RoaXMub3BlbkdlbmVyaWNBdHRhY2htZW50fVxuICAgICAgPlxuICAgICAgICB7cGVuZGluZyA/IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19nZW5lcmljLWF0dGFjaG1lbnRfX3NwaW5uZXItY29udGFpbmVyXCI+XG4gICAgICAgICAgICA8U3Bpbm5lciBzdmdTaXplPVwic21hbGxcIiBzaXplPVwiMjRweFwiIGRpcmVjdGlvbj17ZGlyZWN0aW9ufSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9faWNvbi1jb250YWluZXJcIj5cbiAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9faWNvblwiPlxuICAgICAgICAgICAgICB7ZXh0ZW5zaW9uID8gKFxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9faWNvbl9fZXh0ZW5zaW9uXCI+XG4gICAgICAgICAgICAgICAgICB7ZXh0ZW5zaW9ufVxuICAgICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAge2lzRGFuZ2Vyb3VzID8gKFxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19nZW5lcmljLWF0dGFjaG1lbnRfX2ljb24tZGFuZ2Vyb3VzLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9faWNvbi1kYW5nZXJvdXNcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICApfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19nZW5lcmljLWF0dGFjaG1lbnRfX3RleHRcIj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fZ2VuZXJpYy1hdHRhY2htZW50X19maWxlLW5hbWUnLFxuICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9fZmlsZS1uYW1lLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICApfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtmaWxlTmFtZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fZ2VuZXJpYy1hdHRhY2htZW50X19maWxlLXNpemUnLFxuICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX2dlbmVyaWMtYXR0YWNobWVudF9fZmlsZS1zaXplLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICApfVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtmaWxlU2l6ZX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclByZXZpZXcoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7XG4gICAgICBhdHRhY2htZW50cyxcbiAgICAgIGNvbnZlcnNhdGlvblR5cGUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBpMThuLFxuICAgICAgaWQsXG4gICAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkLFxuICAgICAgb3BlbkxpbmssXG4gICAgICBwcmV2aWV3cyxcbiAgICAgIHF1b3RlLFxuICAgICAgc2hvdWxkQ29sbGFwc2VBYm92ZSxcbiAgICAgIHRoZW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgLy8gQXR0YWNobWVudHMgdGFrZSBwcmVjZWRlbmNlIG92ZXIgTGluayBQcmV2aWV3c1xuICAgIGlmIChhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmICghcHJldmlld3MgfHwgcHJldmlld3MubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgZmlyc3QgPSBwcmV2aWV3c1swXTtcbiAgICBpZiAoIWZpcnN0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB3aXRoQ29udGVudEFib3ZlID1cbiAgICAgIEJvb2xlYW4ocXVvdGUpIHx8XG4gICAgICAoIXNob3VsZENvbGxhcHNlQWJvdmUgJiZcbiAgICAgICAgY29udmVyc2F0aW9uVHlwZSA9PT0gJ2dyb3VwJyAmJlxuICAgICAgICBkaXJlY3Rpb24gPT09ICdpbmNvbWluZycpO1xuXG4gICAgY29uc3QgcHJldmlld0hhc0ltYWdlID0gaXNJbWFnZUF0dGFjaG1lbnQoZmlyc3QuaW1hZ2UpO1xuICAgIGNvbnN0IGlzRnVsbFNpemVJbWFnZSA9IHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZShmaXJzdCk7XG5cbiAgICBjb25zdCBsaW5rUHJldmlld0RhdGUgPSBmaXJzdC5kYXRlIHx8IG51bGw7XG5cbiAgICBjb25zdCBpc0NsaWNrYWJsZSA9IHRoaXMuYXJlTGlua3NFbmFibGVkKCk7XG5cbiAgICBjb25zdCBjbGFzc05hbWUgPSBjbGFzc05hbWVzKFxuICAgICAgJ21vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXcnLFxuICAgICAgYG1vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXctLSR7ZGlyZWN0aW9ufWAsXG4gICAgICB7XG4gICAgICAgICdtb2R1bGUtbWVzc2FnZV9fbGluay1wcmV2aWV3LS13aXRoLWNvbnRlbnQtYWJvdmUnOiB3aXRoQ29udGVudEFib3ZlLFxuICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2xpbmstcHJldmlldy0tbm9uY2xpY2thYmxlJzogIWlzQ2xpY2thYmxlLFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3Qgb25QcmV2aWV3SW1hZ2VDbGljayA9ICgpID0+IHtcbiAgICAgIGlmIChmaXJzdC5pbWFnZSAmJiAhaXNEb3dubG9hZGVkKGZpcnN0LmltYWdlKSkge1xuICAgICAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkKHtcbiAgICAgICAgICBhdHRhY2htZW50OiBmaXJzdC5pbWFnZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6IGlkLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb3BlbkxpbmsoZmlyc3QudXJsKTtcbiAgICB9O1xuICAgIGNvbnN0IGNvbnRlbnRzID0gKFxuICAgICAgPD5cbiAgICAgICAge2ZpcnN0LmltYWdlICYmIHByZXZpZXdIYXNJbWFnZSAmJiBpc0Z1bGxTaXplSW1hZ2UgPyAoXG4gICAgICAgICAgPEltYWdlR3JpZFxuICAgICAgICAgICAgYXR0YWNobWVudHM9e1tmaXJzdC5pbWFnZV19XG4gICAgICAgICAgICB3aXRoQ29udGVudEFib3ZlPXt3aXRoQ29udGVudEFib3ZlfVxuICAgICAgICAgICAgZGlyZWN0aW9uPXtkaXJlY3Rpb259XG4gICAgICAgICAgICBzaG91bGRDb2xsYXBzZUFib3ZlPXtzaG91bGRDb2xsYXBzZUFib3ZlfVxuICAgICAgICAgICAgd2l0aENvbnRlbnRCZWxvd1xuICAgICAgICAgICAgb25FcnJvcj17dGhpcy5oYW5kbGVJbWFnZUVycm9yfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e29uUHJldmlld0ltYWdlQ2xpY2t9XG4gICAgICAgICAgLz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2xpbmstcHJldmlld19fY29udGVudFwiPlxuICAgICAgICAgIHtmaXJzdC5pbWFnZSAmJlxuICAgICAgICAgIGZpcnN0LmRvbWFpbiAmJlxuICAgICAgICAgIHByZXZpZXdIYXNJbWFnZSAmJlxuICAgICAgICAgICFpc0Z1bGxTaXplSW1hZ2UgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXdfX2ljb25fY29udGFpbmVyXCI+XG4gICAgICAgICAgICAgIDxJbWFnZVxuICAgICAgICAgICAgICAgIG5vQm9yZGVyXG4gICAgICAgICAgICAgICAgbm9CYWNrZ3JvdW5kXG4gICAgICAgICAgICAgICAgY3VydmVCb3R0b21MZWZ0PXtcbiAgICAgICAgICAgICAgICAgIHdpdGhDb250ZW50QWJvdmUgPyBDdXJ2ZVR5cGUuVGlueSA6IEN1cnZlVHlwZS5TbWFsbFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICBjdXJ2ZUJvdHRvbVJpZ2h0PXtDdXJ2ZVR5cGUuVGlueX1cbiAgICAgICAgICAgICAgICBjdXJ2ZVRvcFJpZ2h0PXtDdXJ2ZVR5cGUuVGlueX1cbiAgICAgICAgICAgICAgICBjdXJ2ZVRvcExlZnQ9e0N1cnZlVHlwZS5UaW55fVxuICAgICAgICAgICAgICAgIGFsdD17aTE4bigncHJldmlld1RodW1ibmFpbCcsIFtmaXJzdC5kb21haW5dKX1cbiAgICAgICAgICAgICAgICBoZWlnaHQ9ezcyfVxuICAgICAgICAgICAgICAgIHdpZHRoPXs3Mn1cbiAgICAgICAgICAgICAgICB1cmw9e2ZpcnN0LmltYWdlLnVybH1cbiAgICAgICAgICAgICAgICBhdHRhY2htZW50PXtmaXJzdC5pbWFnZX1cbiAgICAgICAgICAgICAgICBibHVySGFzaD17Zmlyc3QuaW1hZ2UuYmx1ckhhc2h9XG4gICAgICAgICAgICAgICAgb25FcnJvcj17dGhpcy5oYW5kbGVJbWFnZUVycm9yfVxuICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgb25DbGljaz17b25QcmV2aWV3SW1hZ2VDbGlja31cbiAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXdfX3RleHQnLFxuICAgICAgICAgICAgICBwcmV2aWV3SGFzSW1hZ2UgJiYgIWlzRnVsbFNpemVJbWFnZVxuICAgICAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXdfX3RleHQtLXdpdGgtaWNvbidcbiAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZV9fbGluay1wcmV2aWV3X190aXRsZVwiPlxuICAgICAgICAgICAgICB7Zmlyc3QudGl0bGV9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHtmaXJzdC5kZXNjcmlwdGlvbiAmJiAoXG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2xpbmstcHJldmlld19fZGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgICAgICB7dW5lc2NhcGUoZmlyc3QuZGVzY3JpcHRpb24pfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXdfX2Zvb3RlclwiPlxuICAgICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19saW5rLXByZXZpZXdfX2xvY2F0aW9uXCI+XG4gICAgICAgICAgICAgICAge2ZpcnN0LmRvbWFpbn1cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICAgIDxMaW5rUHJldmlld0RhdGVcbiAgICAgICAgICAgICAgICBkYXRlPXtsaW5rUHJldmlld0RhdGV9XG4gICAgICAgICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2xpbmstcHJldmlld19fZGF0ZVwiXG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8Lz5cbiAgICApO1xuXG4gICAgcmV0dXJuIGlzQ2xpY2thYmxlID8gKFxuICAgICAgPGRpdlxuICAgICAgICByb2xlPVwibGlua1wiXG4gICAgICAgIHRhYkluZGV4PXswfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZX1cbiAgICAgICAgb25LZXlEb3duPXsoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQpID0+IHtcbiAgICAgICAgICBpZiAoZXZlbnQua2V5ID09PSAnRW50ZXInIHx8IGV2ZW50LmtleSA9PT0gJ1NwYWNlJykge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBvcGVuTGluayhmaXJzdC51cmwpO1xuICAgICAgICAgIH1cbiAgICAgICAgfX1cbiAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIG9wZW5MaW5rKGZpcnN0LnVybCk7XG4gICAgICAgIH19XG4gICAgICA+XG4gICAgICAgIHtjb250ZW50c31cbiAgICAgIDwvZGl2PlxuICAgICkgOiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT17Y2xhc3NOYW1lfT57Y29udGVudHN9PC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJHaWZ0QmFkZ2UoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvblRpdGxlLCBkaXJlY3Rpb24sIGdldFByZWZlcnJlZEJhZGdlLCBnaWZ0QmFkZ2UsIGkxOG4gfSA9XG4gICAgICB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgc2hvd091dGdvaW5nR2lmdEJhZGdlTW9kYWwgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKCFnaWZ0QmFkZ2UpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChnaWZ0QmFkZ2Uuc3RhdGUgPT09IEdpZnRCYWRnZVN0YXRlcy5Vbm9wZW5lZCkge1xuICAgICAgY29uc3QgZGVzY3JpcHRpb24gPSBpMThuKGBtZXNzYWdlLS1naWZ0QmFkZ2UtLXVub3BlbmVkLS0ke2RpcmVjdGlvbn1gKTtcbiAgICAgIGNvbnN0IGlzUlRMID0gZ2V0RGlyZWN0aW9uKGRlc2NyaXB0aW9uKSA9PT0gJ3J0bCc7XG4gICAgICBjb25zdCB7IG1ldGFkYXRhV2lkdGggfSA9IHRoaXMuc3RhdGU7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX3Vub3BlbmVkLWdpZnQtYmFkZ2VfX2NvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX191bm9wZW5lZC1naWZ0LWJhZGdlJyxcbiAgICAgICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX191bm9wZW5lZC1naWZ0LWJhZGdlLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS11bm9wZW5lZC0tbGFiZWwnKX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX191bm9wZW5lZC1naWZ0LWJhZGdlX19yaWJib24taG9yaXpvbnRhbFwiXG4gICAgICAgICAgICAgIGFyaWEtaGlkZGVuXG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZV9fdW5vcGVuZWQtZ2lmdC1iYWRnZV9fcmliYm9uLXZlcnRpY2FsXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW5cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8aW1nXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX191bm9wZW5lZC1naWZ0LWJhZGdlX19ib3dcIlxuICAgICAgICAgICAgICBzcmM9XCJpbWFnZXMvZ2lmdC1ib3cuc3ZnXCJcbiAgICAgICAgICAgICAgYWx0PVwiXCJcbiAgICAgICAgICAgICAgYXJpYS1oaWRkZW5cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3Vub3BlbmVkLWdpZnQtYmFkZ2VfX3RleHQnLFxuICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX3Vub3BlbmVkLWdpZnQtYmFkZ2VfX3RleHQtLSR7ZGlyZWN0aW9ufWBcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgPlxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX190ZXh0JyxcbiAgICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX3RleHQtLSR7ZGlyZWN0aW9ufWBcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgZGlyPXtpc1JUTCA/ICdydGwnIDogdW5kZWZpbmVkfVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7ZGVzY3JpcHRpb259XG4gICAgICAgICAgICAgIHt0aGlzLmdldE1ldGFkYXRhUGxhY2VtZW50KCkgPT09XG4gICAgICAgICAgICAgICAgTWV0YWRhdGFQbGFjZW1lbnQuSW5saW5lV2l0aFRleHQgJiYgKFxuICAgICAgICAgICAgICAgIDxNZXNzYWdlVGV4dE1ldGFkYXRhU3BhY2VyIG1ldGFkYXRhV2lkdGg9e21ldGFkYXRhV2lkdGh9IC8+XG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIHt0aGlzLnJlbmRlck1ldGFkYXRhKCl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBnaWZ0QmFkZ2Uuc3RhdGUgPT09IEdpZnRCYWRnZVN0YXRlcy5SZWRlZW1lZCB8fFxuICAgICAgZ2lmdEJhZGdlLnN0YXRlID09PSBHaWZ0QmFkZ2VTdGF0ZXMuT3BlbmVkXG4gICAgKSB7XG4gICAgICBjb25zdCBiYWRnZUlkID0gZ2lmdEJhZGdlLmlkIHx8IGBCT09TVC0ke2dpZnRCYWRnZS5sZXZlbH1gO1xuICAgICAgY29uc3QgYmFkZ2VTaXplID0gNjQ7XG4gICAgICBjb25zdCBiYWRnZSA9IGdldFByZWZlcnJlZEJhZGdlKFt7IGlkOiBiYWRnZUlkIH1dKTtcbiAgICAgIGNvbnN0IGJhZGdlSW1hZ2VQYXRoID0gZ2V0QmFkZ2VJbWFnZUZpbGVMb2NhbFBhdGgoXG4gICAgICAgIGJhZGdlLFxuICAgICAgICBiYWRnZVNpemUsXG4gICAgICAgIEJhZGdlSW1hZ2VUaGVtZS5UcmFuc3BhcmVudFxuICAgICAgKTtcblxuICAgICAgbGV0IHJlbWFpbmluZzogc3RyaW5nO1xuICAgICAgY29uc3QgZHVyYXRpb24gPSBnaWZ0QmFkZ2UuZXhwaXJhdGlvbiAtIERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHJlbWFpbmluZ0RheXMgPSBNYXRoLmZsb29yKGR1cmF0aW9uIC8gREFZKTtcbiAgICAgIGNvbnN0IHJlbWFpbmluZ0hvdXJzID0gTWF0aC5mbG9vcihkdXJhdGlvbiAvIEhPVVIpO1xuICAgICAgY29uc3QgcmVtYWluaW5nTWludXRlcyA9IE1hdGguZmxvb3IoZHVyYXRpb24gLyBNSU5VVEUpO1xuXG4gICAgICBpZiAocmVtYWluaW5nRGF5cyA+IDEpIHtcbiAgICAgICAgcmVtYWluaW5nID0gaTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS1yZW1haW5pbmctLWRheXMnLCB7XG4gICAgICAgICAgZGF5czogcmVtYWluaW5nRGF5cyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJlbWFpbmluZ0hvdXJzID4gMSkge1xuICAgICAgICByZW1haW5pbmcgPSBpMThuKCdtZXNzYWdlLS1naWZ0QmFkZ2UtLXJlbWFpbmluZy0taG91cnMnLCB7XG4gICAgICAgICAgaG91cnM6IHJlbWFpbmluZ0hvdXJzLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAocmVtYWluaW5nTWludXRlcyA+IDEpIHtcbiAgICAgICAgcmVtYWluaW5nID0gaTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS1yZW1haW5pbmctLW1pbnV0ZXMnLCB7XG4gICAgICAgICAgbWludXRlczogcmVtYWluaW5nTWludXRlcyxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2UgaWYgKHJlbWFpbmluZ01pbnV0ZXMgPT09IDEpIHtcbiAgICAgICAgcmVtYWluaW5nID0gaTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS1yZW1haW5pbmctLW9uZS1taW51dGUnKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHJlbWFpbmluZyA9IGkxOG4oJ21lc3NhZ2UtLWdpZnRCYWRnZS0tZXhwaXJlZCcpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB3YXNTZW50ID0gZGlyZWN0aW9uID09PSAnb3V0Z29pbmcnO1xuICAgICAgY29uc3QgYnV0dG9uQ29udGVudHMgPSB3YXNTZW50ID8gKFxuICAgICAgICBpMThuKCdtZXNzYWdlLS1naWZ0QmFkZ2UtLXZpZXcnKVxuICAgICAgKSA6IChcbiAgICAgICAgPD5cbiAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VfX2ljb24tY2hlY2snLFxuICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VfX2ljb24tY2hlY2stLSR7ZGlyZWN0aW9ufWBcbiAgICAgICAgICAgICl9XG4gICAgICAgICAgLz57JyAnfVxuICAgICAgICAgIHtpMThuKCdtZXNzYWdlLS1naWZ0QmFkZ2UtLXJlZGVlbWVkJyl9XG4gICAgICAgIDwvPlxuICAgICAgKTtcblxuICAgICAgY29uc3QgYmFkZ2VFbGVtZW50ID0gYmFkZ2UgPyAoXG4gICAgICAgIDxpbWdcbiAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZV9fcmVkZWVtZWQtZ2lmdC1iYWRnZV9fYmFkZ2VcIlxuICAgICAgICAgIHNyYz17YmFkZ2VJbWFnZVBhdGh9XG4gICAgICAgICAgYWx0PXtiYWRnZS5uYW1lfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fcmVkZWVtZWQtZ2lmdC1iYWRnZV9fYmFkZ2UnLFxuICAgICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX19yZWRlZW1lZC1naWZ0LWJhZGdlX19iYWRnZS0tbWlzc2luZy0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgKX1cbiAgICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdnaWZ0QmFkZ2UtLW1pc3NpbmcnKX1cbiAgICAgICAgLz5cbiAgICAgICk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VfX2NvbnRhaW5lclwiPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VcIj5cbiAgICAgICAgICAgIHtiYWRnZUVsZW1lbnR9XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19yZWRlZW1lZC1naWZ0LWJhZGdlX190ZXh0XCI+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VfX3RpdGxlXCI+XG4gICAgICAgICAgICAgICAge2kxOG4oJ21lc3NhZ2UtLWdpZnRCYWRnZScpfVxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fcmVkZWVtZWQtZ2lmdC1iYWRnZV9fcmVtYWluaW5nJyxcbiAgICAgICAgICAgICAgICAgIGBtb2R1bGUtbWVzc2FnZV9fcmVkZWVtZWQtZ2lmdC1iYWRnZV9fcmVtYWluaW5nLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtyZW1haW5pbmd9XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3JlZGVlbWVkLWdpZnQtYmFkZ2VfX2J1dHRvbicsXG4gICAgICAgICAgICAgIGBtb2R1bGUtbWVzc2FnZV9fcmVkZWVtZWQtZ2lmdC1iYWRnZV9fYnV0dG9uLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICApfVxuICAgICAgICAgICAgZGlzYWJsZWQ9eyF3YXNTZW50fVxuICAgICAgICAgICAgb25DbGljaz17XG4gICAgICAgICAgICAgIHdhc1NlbnRcbiAgICAgICAgICAgICAgICA/ICgpID0+IHRoaXMuc2V0U3RhdGUoeyBzaG93T3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbDogdHJ1ZSB9KVxuICAgICAgICAgICAgICAgIDogdW5kZWZpbmVkXG4gICAgICAgICAgICB9XG4gICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICA+XG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19yZWRlZW1lZC1naWZ0LWJhZGdlX19idXR0b25fX3RleHRcIj5cbiAgICAgICAgICAgICAge2J1dHRvbkNvbnRlbnRzfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9idXR0b24+XG4gICAgICAgICAge3RoaXMucmVuZGVyTWV0YWRhdGEoKX1cbiAgICAgICAgICB7c2hvd091dGdvaW5nR2lmdEJhZGdlTW9kYWwgPyAoXG4gICAgICAgICAgICA8T3V0Z29pbmdHaWZ0QmFkZ2VNb2RhbFxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICByZWNpcGllbnRUaXRsZT17Y29udmVyc2F0aW9uVGl0bGV9XG4gICAgICAgICAgICAgIGJhZGdlSWQ9e2JhZGdlSWR9XG4gICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgaGlkZU91dGdvaW5nR2lmdEJhZGdlTW9kYWw9eygpID0+XG4gICAgICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7IHNob3dPdXRnb2luZ0dpZnRCYWRnZU1vZGFsOiBmYWxzZSB9KVxuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihnaWZ0QmFkZ2Uuc3RhdGUpO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclF1b3RlKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qge1xuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIGRpc2FibGVTY3JvbGwsXG4gICAgICBkb3VibGVDaGVja01pc3NpbmdRdW90ZVJlZmVyZW5jZSxcbiAgICAgIGkxOG4sXG4gICAgICBpZCxcbiAgICAgIHF1b3RlLFxuICAgICAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKCFxdW90ZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgeyBpc0dpZnRCYWRnZSwgaXNWaWV3T25jZSwgcmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZCB9ID0gcXVvdGU7XG5cbiAgICBjb25zdCBjbGlja0hhbmRsZXIgPSBkaXNhYmxlU2Nyb2xsXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiAoKSA9PiB7XG4gICAgICAgICAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlKHtcbiAgICAgICAgICAgIGF1dGhvcklkOiBxdW90ZS5hdXRob3JJZCxcbiAgICAgICAgICAgIHNlbnRBdDogcXVvdGUuc2VudEF0LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9O1xuXG4gICAgY29uc3QgaXNJbmNvbWluZyA9IGRpcmVjdGlvbiA9PT0gJ2luY29taW5nJztcblxuICAgIHJldHVybiAoXG4gICAgICA8UXVvdGVcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgb25DbGljaz17Y2xpY2tIYW5kbGVyfVxuICAgICAgICB0ZXh0PXtxdW90ZS50ZXh0fVxuICAgICAgICByYXdBdHRhY2htZW50PXtxdW90ZS5yYXdBdHRhY2htZW50fVxuICAgICAgICBpc0luY29taW5nPXtpc0luY29taW5nfVxuICAgICAgICBhdXRob3JUaXRsZT17cXVvdGUuYXV0aG9yVGl0bGV9XG4gICAgICAgIGJvZHlSYW5nZXM9e3F1b3RlLmJvZHlSYW5nZXN9XG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbG9yPXtjb252ZXJzYXRpb25Db2xvcn1cbiAgICAgICAgY3VzdG9tQ29sb3I9e2N1c3RvbUNvbG9yfVxuICAgICAgICBpc1ZpZXdPbmNlPXtpc1ZpZXdPbmNlfVxuICAgICAgICBpc0dpZnRCYWRnZT17aXNHaWZ0QmFkZ2V9XG4gICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ9e3JlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmR9XG4gICAgICAgIGlzRnJvbU1lPXtxdW90ZS5pc0Zyb21NZX1cbiAgICAgICAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U9eygpID0+XG4gICAgICAgICAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UoaWQpXG4gICAgICAgIH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJTdG9yeVJlcGx5Q29udGV4dCgpOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnZlcnNhdGlvbkNvbG9yLFxuICAgICAgY3VzdG9tQ29sb3IsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBpMThuLFxuICAgICAgc3RvcnlSZXBseUNvbnRleHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXN0b3J5UmVwbHlDb250ZXh0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0luY29taW5nID0gZGlyZWN0aW9uID09PSAnaW5jb21pbmcnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDw+XG4gICAgICAgIHtzdG9yeVJlcGx5Q29udGV4dC5lbW9qaSAmJiAoXG4gICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZV9fcXVvdGUtc3RvcnktcmVhY3Rpb24taGVhZGVyXCI+XG4gICAgICAgICAgICB7aTE4bignUXVvdGVfX3N0b3J5LXJlYWN0aW9uJywgW3N0b3J5UmVwbHlDb250ZXh0LmF1dGhvclRpdGxlXSl9XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICl9XG4gICAgICAgIDxRdW90ZVxuICAgICAgICAgIGF1dGhvclRpdGxlPXtzdG9yeVJlcGx5Q29udGV4dC5hdXRob3JUaXRsZX1cbiAgICAgICAgICBjb252ZXJzYXRpb25Db2xvcj17Y29udmVyc2F0aW9uQ29sb3J9XG4gICAgICAgICAgY3VzdG9tQ29sb3I9e2N1c3RvbUNvbG9yfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNGcm9tTWU9e3N0b3J5UmVwbHlDb250ZXh0LmlzRnJvbU1lfVxuICAgICAgICAgIGlzR2lmdEJhZGdlPXtmYWxzZX1cbiAgICAgICAgICBpc0luY29taW5nPXtpc0luY29taW5nfVxuICAgICAgICAgIGlzU3RvcnlSZXBseVxuICAgICAgICAgIGlzVmlld09uY2U9e2ZhbHNlfVxuICAgICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIlN0b3J5UmVwbHlRdW90ZVwiXG4gICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgLy8gVE9ETyBERVNLVE9QLTMyNTVcbiAgICAgICAgICB9fVxuICAgICAgICAgIHJhd0F0dGFjaG1lbnQ9e3N0b3J5UmVwbHlDb250ZXh0LnJhd0F0dGFjaG1lbnR9XG4gICAgICAgICAgcmVhY3Rpb25FbW9qaT17c3RvcnlSZXBseUNvbnRleHQuZW1vaml9XG4gICAgICAgICAgcmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZD17Qm9vbGVhbihcbiAgICAgICAgICAgIHN0b3J5UmVwbHlDb250ZXh0LnJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmRcbiAgICAgICAgICApfVxuICAgICAgICAgIHRleHQ9e3N0b3J5UmVwbHlDb250ZXh0LnRleHR9XG4gICAgICAgIC8+XG4gICAgICA8Lz5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlckVtYmVkZGVkQ29udGFjdCgpOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnRhY3QsXG4gICAgICBjb252ZXJzYXRpb25UeXBlLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgaTE4bixcbiAgICAgIHNob3dDb250YWN0RGV0YWlsLFxuICAgICAgdGV4dCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHdpdGhDYXB0aW9uID0gQm9vbGVhbih0ZXh0KTtcbiAgICBjb25zdCB3aXRoQ29udGVudEFib3ZlID1cbiAgICAgIGNvbnZlcnNhdGlvblR5cGUgPT09ICdncm91cCcgJiYgZGlyZWN0aW9uID09PSAnaW5jb21pbmcnO1xuICAgIGNvbnN0IHdpdGhDb250ZW50QmVsb3cgPVxuICAgICAgd2l0aENhcHRpb24gfHxcbiAgICAgIHRoaXMuZ2V0TWV0YWRhdGFQbGFjZW1lbnQoKSAhPT0gTWV0YWRhdGFQbGFjZW1lbnQuTm90UmVuZGVyZWQ7XG5cbiAgICBjb25zdCBvdGhlckNvbnRlbnQgPVxuICAgICAgKGNvbnRhY3QgJiYgY29udGFjdC5maXJzdE51bWJlciAmJiBjb250YWN0LnV1aWQpIHx8IHdpdGhDYXB0aW9uO1xuICAgIGNvbnN0IHRhYkluZGV4ID0gb3RoZXJDb250ZW50ID8gMCA6IC0xO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxFbWJlZGRlZENvbnRhY3RcbiAgICAgICAgY29udGFjdD17Y29udGFjdH1cbiAgICAgICAgaXNJbmNvbWluZz17ZGlyZWN0aW9uID09PSAnaW5jb21pbmcnfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgY29uc3Qgc2lnbmFsQWNjb3VudCA9XG4gICAgICAgICAgICBjb250YWN0LmZpcnN0TnVtYmVyICYmIGNvbnRhY3QudXVpZFxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIHBob25lTnVtYmVyOiBjb250YWN0LmZpcnN0TnVtYmVyLFxuICAgICAgICAgICAgICAgICAgdXVpZDogY29udGFjdC51dWlkLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICAgICAgICBzaG93Q29udGFjdERldGFpbCh7XG4gICAgICAgICAgICBjb250YWN0LFxuICAgICAgICAgICAgc2lnbmFsQWNjb3VudCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfX1cbiAgICAgICAgd2l0aENvbnRlbnRBYm92ZT17d2l0aENvbnRlbnRBYm92ZX1cbiAgICAgICAgd2l0aENvbnRlbnRCZWxvdz17d2l0aENvbnRlbnRCZWxvd31cbiAgICAgICAgdGFiSW5kZXg9e3RhYkluZGV4fVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclNlbmRNZXNzYWdlQnV0dG9uKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3QgeyBjb250YWN0LCBkaXJlY3Rpb24sIHNob3VsZENvbGxhcHNlQmVsb3csIHN0YXJ0Q29udmVyc2F0aW9uLCBpMThuIH0gPVxuICAgICAgdGhpcy5wcm9wcztcbiAgICBjb25zdCBub0JvdHRvbUxlZnRDdXJ2ZSA9IGRpcmVjdGlvbiA9PT0gJ2luY29taW5nJyAmJiBzaG91bGRDb2xsYXBzZUJlbG93O1xuICAgIGNvbnN0IG5vQm90dG9tUmlnaHRDdXJ2ZSA9IGRpcmVjdGlvbiA9PT0gJ291dGdvaW5nJyAmJiBzaG91bGRDb2xsYXBzZUJlbG93O1xuXG4gICAgaWYgKCFjb250YWN0KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gICAgY29uc3QgeyBmaXJzdE51bWJlciwgdXVpZCB9ID0gY29udGFjdDtcbiAgICBpZiAoIWZpcnN0TnVtYmVyIHx8ICF1dWlkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGJ1dHRvblxuICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgb25DbGljaz17KCkgPT4gc3RhcnRDb252ZXJzYXRpb24oZmlyc3ROdW1iZXIsIHV1aWQpfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19zZW5kLW1lc3NhZ2UtYnV0dG9uJyxcbiAgICAgICAgICBub0JvdHRvbUxlZnRDdXJ2ZSAmJlxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19zZW5kLW1lc3NhZ2UtYnV0dG9uLS1uby1ib3R0b20tbGVmdC1jdXJ2ZScsXG4gICAgICAgICAgbm9Cb3R0b21SaWdodEN1cnZlICYmXG4gICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3NlbmQtbWVzc2FnZS1idXR0b24tLW5vLWJvdHRvbS1yaWdodC1jdXJ2ZSdcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAge2kxOG4oJ3NlbmRNZXNzYWdlVG9Db250YWN0Jyl9XG4gICAgICA8L2J1dHRvbj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJBdmF0YXIoKTogUmVhY3ROb2RlIHtcbiAgICBjb25zdCB7XG4gICAgICBhdXRob3IsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGNvbnZlcnNhdGlvblR5cGUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgICAgIGkxOG4sXG4gICAgICBzaG91bGRDb2xsYXBzZUJlbG93LFxuICAgICAgc2hvd0NvbnRhY3RNb2RhbCxcbiAgICAgIHRoZW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGNvbnZlcnNhdGlvblR5cGUgIT09ICdncm91cCcgfHwgZGlyZWN0aW9uICE9PSAnaW5jb21pbmcnKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ21vZHVsZS1tZXNzYWdlX19hdXRob3ItYXZhdGFyLWNvbnRhaW5lcicsIHtcbiAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2F1dGhvci1hdmF0YXItY29udGFpbmVyLS13aXRoLXJlYWN0aW9ucyc6XG4gICAgICAgICAgICB0aGlzLmhhc1JlYWN0aW9ucygpLFxuICAgICAgICB9KX1cbiAgICAgID5cbiAgICAgICAge3Nob3VsZENvbGxhcHNlQmVsb3cgPyAoXG4gICAgICAgICAgPEF2YXRhclNwYWNlciBzaXplPXtHUk9VUF9BVkFUQVJfU0laRX0gLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthdXRob3IuYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdH1cbiAgICAgICAgICAgIGF2YXRhclBhdGg9e2F1dGhvci5hdmF0YXJQYXRofVxuICAgICAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKGF1dGhvci5iYWRnZXMpfVxuICAgICAgICAgICAgY29sb3I9e2F1dGhvci5jb2xvcn1cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzTWU9e2F1dGhvci5pc01lfVxuICAgICAgICAgICAgbmFtZT17YXV0aG9yLm5hbWV9XG4gICAgICAgICAgICBvbkNsaWNrPXtldmVudCA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgIHNob3dDb250YWN0TW9kYWwoYXV0aG9yLmlkLCBjb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgcGhvbmVOdW1iZXI9e2F1dGhvci5waG9uZU51bWJlcn1cbiAgICAgICAgICAgIHByb2ZpbGVOYW1lPXthdXRob3IucHJvZmlsZU5hbWV9XG4gICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXthdXRob3Iuc2hhcmVkR3JvdXBOYW1lc31cbiAgICAgICAgICAgIHNpemU9e0dST1VQX0FWQVRBUl9TSVpFfVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgICAgdGl0bGU9e2F1dGhvci50aXRsZX1cbiAgICAgICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg9e2F1dGhvci51bmJsdXJyZWRBdmF0YXJQYXRofVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIHJlbmRlclRleHQoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7XG4gICAgICBib2R5UmFuZ2VzLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgZGlzcGxheUxpbWl0LFxuICAgICAgaTE4bixcbiAgICAgIGlkLFxuICAgICAgbWVzc2FnZUV4cGFuZGVkLFxuICAgICAgb3BlbkNvbnZlcnNhdGlvbixcbiAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgICBzdGF0dXMsXG4gICAgICB0ZXh0LFxuICAgICAgdGV4dERpcmVjdGlvbixcbiAgICAgIHRleHRBdHRhY2htZW50LFxuICAgIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgbWV0YWRhdGFXaWR0aCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCBpc1JUTCA9IHRleHREaXJlY3Rpb24gPT09IFRleHREaXJlY3Rpb24uUmlnaHRUb0xlZnQ7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tbmVzdGVkLXRlcm5hcnlcbiAgICBjb25zdCBjb250ZW50cyA9IGRlbGV0ZWRGb3JFdmVyeW9uZVxuICAgICAgPyBpMThuKCdtZXNzYWdlLS1kZWxldGVkRm9yRXZlcnlvbmUnKVxuICAgICAgOiBkaXJlY3Rpb24gPT09ICdpbmNvbWluZycgJiYgc3RhdHVzID09PSAnZXJyb3InXG4gICAgICA/IGkxOG4oJ2luY29taW5nRXJyb3InKVxuICAgICAgOiB0ZXh0O1xuXG4gICAgaWYgKCFjb250ZW50cykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fdGV4dCcsXG4gICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX190ZXh0LS0ke2RpcmVjdGlvbn1gLFxuICAgICAgICAgIHN0YXR1cyA9PT0gJ2Vycm9yJyAmJiBkaXJlY3Rpb24gPT09ICdpbmNvbWluZydcbiAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX190ZXh0LS1lcnJvcidcbiAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmVcbiAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX190ZXh0LS1kZWxldGUtZm9yLWV2ZXJ5b25lJ1xuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICl9XG4gICAgICAgIGRpcj17aXNSVEwgPyAncnRsJyA6IHVuZGVmaW5lZH1cbiAgICAgID5cbiAgICAgICAgPE1lc3NhZ2VCb2R5UmVhZE1vcmVcbiAgICAgICAgICBib2R5UmFuZ2VzPXtib2R5UmFuZ2VzfVxuICAgICAgICAgIGRpc2FibGVMaW5rcz17IXRoaXMuYXJlTGlua3NFbmFibGVkKCl9XG4gICAgICAgICAgZGlyZWN0aW9uPXtkaXJlY3Rpb259XG4gICAgICAgICAgZGlzcGxheUxpbWl0PXtkaXNwbGF5TGltaXR9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgbWVzc2FnZUV4cGFuZGVkPXttZXNzYWdlRXhwYW5kZWR9XG4gICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbj17b3BlbkNvbnZlcnNhdGlvbn1cbiAgICAgICAgICBraWNrT2ZmQm9keURvd25sb2FkPXsoKSA9PiB7XG4gICAgICAgICAgICBpZiAoIXRleHRBdHRhY2htZW50KSB7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoe1xuICAgICAgICAgICAgICBhdHRhY2htZW50OiB0ZXh0QXR0YWNobWVudCxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkOiBpZCxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgIH19XG4gICAgICAgICAgdGV4dD17Y29udGVudHMgfHwgJyd9XG4gICAgICAgICAgdGV4dEF0dGFjaG1lbnQ9e3RleHRBdHRhY2htZW50fVxuICAgICAgICAvPlxuICAgICAgICB7IWlzUlRMICYmXG4gICAgICAgICAgdGhpcy5nZXRNZXRhZGF0YVBsYWNlbWVudCgpID09PSBNZXRhZGF0YVBsYWNlbWVudC5JbmxpbmVXaXRoVGV4dCAmJiAoXG4gICAgICAgICAgICA8TWVzc2FnZVRleHRNZXRhZGF0YVNwYWNlciBtZXRhZGF0YVdpZHRoPXttZXRhZGF0YVdpZHRofSAvPlxuICAgICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJFcnJvcigpOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IHsgc3RhdHVzLCBkaXJlY3Rpb24gfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoXG4gICAgICBzdGF0dXMgIT09ICdwYXVzZWQnICYmXG4gICAgICBzdGF0dXMgIT09ICdlcnJvcicgJiZcbiAgICAgIHN0YXR1cyAhPT0gJ3BhcnRpYWwtc2VudCdcbiAgICApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19lcnJvci1jb250YWluZXJcIj5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fZXJyb3InLFxuICAgICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX19lcnJvci0tJHtkaXJlY3Rpb259YCxcbiAgICAgICAgICAgIGBtb2R1bGUtbWVzc2FnZV9fZXJyb3ItLSR7c3RhdHVzfWBcbiAgICAgICAgICApfVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgcmVuZGVyTWVudSh0cmlnZ2VySWQ6IHN0cmluZyk6IFJlYWN0Tm9kZSB7XG4gICAgY29uc3Qge1xuICAgICAgYXR0YWNobWVudHMsXG4gICAgICBjYW5Eb3dubG9hZCxcbiAgICAgIGNhblJlYWN0LFxuICAgICAgY2FuUmVwbHksXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBkaXNhYmxlTWVudSxcbiAgICAgIGkxOG4sXG4gICAgICBpZCxcbiAgICAgIGlzU3RpY2tlcixcbiAgICAgIGlzVGFwVG9WaWV3LFxuICAgICAgcmVhY3RUb01lc3NhZ2UsXG4gICAgICByZW5kZXJFbW9qaVBpY2tlcixcbiAgICAgIHJlbmRlclJlYWN0aW9uUGlja2VyLFxuICAgICAgcmVwbHlUb01lc3NhZ2UsXG4gICAgICBzZWxlY3RlZFJlYWN0aW9uLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGRpc2FibGVNZW51KSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB7IHJlYWN0aW9uUGlja2VyUm9vdCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IG11bHRpcGxlQXR0YWNobWVudHMgPSBhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGggPiAxO1xuICAgIGNvbnN0IGZpcnN0QXR0YWNobWVudCA9IGF0dGFjaG1lbnRzICYmIGF0dGFjaG1lbnRzWzBdO1xuXG4gICAgY29uc3QgZG93bmxvYWRCdXR0b24gPVxuICAgICAgIWlzU3RpY2tlciAmJlxuICAgICAgIW11bHRpcGxlQXR0YWNobWVudHMgJiZcbiAgICAgICFpc1RhcFRvVmlldyAmJlxuICAgICAgZmlyc3RBdHRhY2htZW50ICYmXG4gICAgICAhZmlyc3RBdHRhY2htZW50LnBlbmRpbmcgPyAoXG4gICAgICAgIC8vIFRoaXMgYSBtZW51IG1lYW50IGZvciBtb3VzZSB1c2Ugb25seVxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMsIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcbiAgICAgICAgPGRpdlxuICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub3BlbkdlbmVyaWNBdHRhY2htZW50fVxuICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ2Rvd25sb2FkQXR0YWNobWVudCcpfVxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fYnV0dG9uc19fZG93bmxvYWQnLFxuICAgICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX19idXR0b25zX19kb3dubG9hZC0tJHtkaXJlY3Rpb259YFxuICAgICAgICAgICl9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbDtcblxuICAgIGNvbnN0IHJlYWN0QnV0dG9uID0gKFxuICAgICAgPFJlZmVyZW5jZT5cbiAgICAgICAgeyh7IHJlZjogcG9wcGVyUmVmIH0pID0+IHtcbiAgICAgICAgICAvLyBPbmx5IGF0dGFjaCB0aGUgcG9wcGVyIHJlZmVyZW5jZSB0byB0aGUgcmVhY3Rpb24gYnV0dG9uIGlmIGl0IGlzXG4gICAgICAgICAgLy8gICB2aXNpYmxlIChpdCBpcyBoaWRkZW4gd2hlbiB0aGUgdGltZWxpbmUgaXMgbmFycm93KVxuICAgICAgICAgIGNvbnN0IG1heWJlUG9wcGVyUmVmID0gdGhpcy5pc1dpbmRvd1dpZHRoTm90TmFycm93KClcbiAgICAgICAgICAgID8gcG9wcGVyUmVmXG4gICAgICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAvLyBUaGlzIGEgbWVudSBtZWFudCBmb3IgbW91c2UgdXNlIG9ubHlcbiAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMsIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgcmVmPXttYXliZVBvcHBlclJlZn1cbiAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgICAgICAgIHRoaXMudG9nZ2xlUmVhY3Rpb25QaWNrZXIoKTtcbiAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgcm9sZT1cImJ1dHRvblwiXG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX19idXR0b25zX19yZWFjdFwiXG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ3JlYWN0VG9NZXNzYWdlJyl9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgIH19XG4gICAgICA8L1JlZmVyZW5jZT5cbiAgICApO1xuXG4gICAgY29uc3QgcmVwbHlCdXR0b24gPSAoXG4gICAgICAvLyBUaGlzIGEgbWVudSBtZWFudCBmb3IgbW91c2UgdXNlIG9ubHlcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMsIGpzeC1hMTF5L2NsaWNrLWV2ZW50cy1oYXZlLWtleS1ldmVudHNcbiAgICAgIDxkaXZcbiAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcblxuICAgICAgICAgIHJlcGx5VG9NZXNzYWdlKGlkKTtcbiAgICAgICAgfX1cbiAgICAgICAgLy8gVGhpcyBhIG1lbnUgbWVhbnQgZm9yIG1vdXNlIHVzZSBvbmx5XG4gICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICBhcmlhLWxhYmVsPXtpMThuKCdyZXBseVRvTWVzc2FnZScpfVxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19idXR0b25zX19yZXBseScsXG4gICAgICAgICAgYG1vZHVsZS1tZXNzYWdlX19idXR0b25zX19kb3dubG9hZC0tJHtkaXJlY3Rpb259YFxuICAgICAgICApfVxuICAgICAgLz5cbiAgICApO1xuXG4gICAgLy8gVGhpcyBhIG1lbnUgbWVhbnQgZm9yIG1vdXNlIHVzZSBvbmx5XG4gICAgLyogZXNsaW50LWRpc2FibGUganN4LWExMXkvaW50ZXJhY3RpdmUtc3VwcG9ydHMtZm9jdXMgKi9cbiAgICAvKiBlc2xpbnQtZGlzYWJsZSBqc3gtYTExeS9jbGljay1ldmVudHMtaGF2ZS1rZXktZXZlbnRzICovXG4gICAgY29uc3QgbWVudUJ1dHRvbiA9IChcbiAgICAgIDxSZWZlcmVuY2U+XG4gICAgICAgIHsoeyByZWY6IHBvcHBlclJlZiB9KSA9PiB7XG4gICAgICAgICAgLy8gT25seSBhdHRhY2ggdGhlIHBvcHBlciByZWZlcmVuY2UgdG8gdGhlIGNvbGxhcHNlZCBtZW51IGJ1dHRvbiBpZiB0aGUgcmVhY3Rpb25cbiAgICAgICAgICAvLyAgIGJ1dHRvbiBpcyBub3QgdmlzaWJsZSAoaXQgaXMgaGlkZGVuIHdoZW4gdGhlIHRpbWVsaW5lIGlzIG5hcnJvdylcbiAgICAgICAgICBjb25zdCBtYXliZVBvcHBlclJlZiA9ICF0aGlzLmlzV2luZG93V2lkdGhOb3ROYXJyb3coKVxuICAgICAgICAgICAgPyBwb3BwZXJSZWZcbiAgICAgICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICAgICAgcmV0dXJuIChcbiAgICAgICAgICAgIDxTdG9wUHJvcGFnYXRpb24gY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2J1dHRvbnNfX21lbnUtLWNvbnRhaW5lclwiPlxuICAgICAgICAgICAgICA8Q29udGV4dE1lbnVUcmlnZ2VyXG4gICAgICAgICAgICAgICAgaWQ9e3RyaWdnZXJJZH1cbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5jYXB0dXJlTWVudVRyaWdnZXIgYXMgYW55fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICAgICAgcmVmPXttYXliZVBvcHBlclJlZn1cbiAgICAgICAgICAgICAgICAgIHJvbGU9XCJidXR0b25cIlxuICAgICAgICAgICAgICAgICAgb25DbGljaz17dGhpcy5zaG93TWVudX1cbiAgICAgICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ21lc3NhZ2VDb250ZXh0TWVudUJ1dHRvbicpfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2J1dHRvbnNfX21lbnUnLFxuICAgICAgICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX2J1dHRvbnNfX2Rvd25sb2FkLS0ke2RpcmVjdGlvbn1gXG4gICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgIDwvQ29udGV4dE1lbnVUcmlnZ2VyPlxuICAgICAgICAgICAgPC9TdG9wUHJvcGFnYXRpb24+XG4gICAgICAgICAgKTtcbiAgICAgICAgfX1cbiAgICAgIDwvUmVmZXJlbmNlPlxuICAgICk7XG4gICAgLyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9pbnRlcmFjdGl2ZS1zdXBwb3J0cy1mb2N1cyAqL1xuICAgIC8qIGVzbGludC1lbmFibGUganN4LWExMXkvY2xpY2stZXZlbnRzLWhhdmUta2V5LWV2ZW50cyAqL1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNYW5hZ2VyPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19idXR0b25zJyxcbiAgICAgICAgICAgIGBtb2R1bGUtbWVzc2FnZV9fYnV0dG9ucy0tJHtkaXJlY3Rpb259YFxuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5pc1dpbmRvd1dpZHRoTm90TmFycm93KCkgJiYgKFxuICAgICAgICAgICAgPD5cbiAgICAgICAgICAgICAge2NhblJlYWN0ID8gcmVhY3RCdXR0b24gOiBudWxsfVxuICAgICAgICAgICAgICB7Y2FuRG93bmxvYWQgPyBkb3dubG9hZEJ1dHRvbiA6IG51bGx9XG4gICAgICAgICAgICAgIHtjYW5SZXBseSA/IHJlcGx5QnV0dG9uIDogbnVsbH1cbiAgICAgICAgICAgIDwvPlxuICAgICAgICAgICl9XG4gICAgICAgICAge21lbnVCdXR0b259XG4gICAgICAgIDwvZGl2PlxuICAgICAgICB7cmVhY3Rpb25QaWNrZXJSb290ICYmXG4gICAgICAgICAgY3JlYXRlUG9ydGFsKFxuICAgICAgICAgICAgPFN0b3BQcm9wYWdhdGlvbj5cbiAgICAgICAgICAgICAgPFBvcHBlclxuICAgICAgICAgICAgICAgIHBsYWNlbWVudD1cInRvcFwiXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzPXtbXG4gICAgICAgICAgICAgICAgICBvZmZzZXREaXN0YW5jZU1vZGlmaWVyKDQpLFxuICAgICAgICAgICAgICAgICAgdGhpcy5wb3BwZXJQcmV2ZW50T3ZlcmZsb3dNb2RpZmllcigpLFxuICAgICAgICAgICAgICAgIF19XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICB7KHsgcmVmLCBzdHlsZSB9KSA9PlxuICAgICAgICAgICAgICAgICAgcmVuZGVyUmVhY3Rpb25QaWNrZXIoe1xuICAgICAgICAgICAgICAgICAgICByZWYsXG4gICAgICAgICAgICAgICAgICAgIHN0eWxlLFxuICAgICAgICAgICAgICAgICAgICBzZWxlY3RlZDogc2VsZWN0ZWRSZWFjdGlvbixcbiAgICAgICAgICAgICAgICAgICAgb25DbG9zZTogdGhpcy50b2dnbGVSZWFjdGlvblBpY2tlcixcbiAgICAgICAgICAgICAgICAgICAgb25QaWNrOiBlbW9qaSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgdGhpcy50b2dnbGVSZWFjdGlvblBpY2tlcih0cnVlKTtcbiAgICAgICAgICAgICAgICAgICAgICByZWFjdFRvTWVzc2FnZShpZCwge1xuICAgICAgICAgICAgICAgICAgICAgICAgZW1vamksXG4gICAgICAgICAgICAgICAgICAgICAgICByZW1vdmU6IGVtb2ppID09PSBzZWxlY3RlZFJlYWN0aW9uLFxuICAgICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByZW5kZXJFbW9qaVBpY2tlcixcbiAgICAgICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICA8L1BvcHBlcj5cbiAgICAgICAgICAgIDwvU3RvcFByb3BhZ2F0aW9uPixcbiAgICAgICAgICAgIHJlYWN0aW9uUGlja2VyUm9vdFxuICAgICAgICAgICl9XG4gICAgICA8L01hbmFnZXI+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJDb250ZXh0TWVudSh0cmlnZ2VySWQ6IHN0cmluZyk6IEpTWC5FbGVtZW50IHtcbiAgICBjb25zdCB7XG4gICAgICBhdHRhY2htZW50cyxcbiAgICAgIGNhbkRvd25sb2FkLFxuICAgICAgY29udGFjdCxcbiAgICAgIGNhblJlYWN0LFxuICAgICAgY2FuUmVwbHksXG4gICAgICBjYW5SZXRyeSxcbiAgICAgIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmUsXG4gICAgICBkZWxldGVNZXNzYWdlLFxuICAgICAgZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICAgICAgZ2lmdEJhZGdlLFxuICAgICAgaTE4bixcbiAgICAgIGlkLFxuICAgICAgaXNTdGlja2VyLFxuICAgICAgaXNUYXBUb1ZpZXcsXG4gICAgICByZXBseVRvTWVzc2FnZSxcbiAgICAgIHJldHJ5U2VuZCxcbiAgICAgIHJldHJ5RGVsZXRlRm9yRXZlcnlvbmUsXG4gICAgICBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCxcbiAgICAgIHNob3dNZXNzYWdlRGV0YWlsLFxuICAgICAgdGV4dCxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNhbkZvcndhcmQgPVxuICAgICAgIWlzVGFwVG9WaWV3ICYmICFkZWxldGVkRm9yRXZlcnlvbmUgJiYgIWdpZnRCYWRnZSAmJiAhY29udGFjdDtcbiAgICBjb25zdCBtdWx0aXBsZUF0dGFjaG1lbnRzID0gYXR0YWNobWVudHMgJiYgYXR0YWNobWVudHMubGVuZ3RoID4gMTtcblxuICAgIGNvbnN0IHNob3VsZFNob3dBZGRpdGlvbmFsID1cbiAgICAgIGRvZXNNZXNzYWdlQm9keU92ZXJmbG93KHRleHQgfHwgJycpIHx8ICF0aGlzLmlzV2luZG93V2lkdGhOb3ROYXJyb3coKTtcblxuICAgIGNvbnN0IG1lbnUgPSAoXG4gICAgICA8Q29udGV4dE1lbnUgaWQ9e3RyaWdnZXJJZH0+XG4gICAgICAgIHtjYW5Eb3dubG9hZCAmJlxuICAgICAgICBzaG91bGRTaG93QWRkaXRpb25hbCAmJlxuICAgICAgICAhaXNTdGlja2VyICYmXG4gICAgICAgICFtdWx0aXBsZUF0dGFjaG1lbnRzICYmXG4gICAgICAgICFpc1RhcFRvVmlldyAmJlxuICAgICAgICBhdHRhY2htZW50cyAmJlxuICAgICAgICBhdHRhY2htZW50c1swXSA/IChcbiAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fY29udGV4dC0taWNvbiBtb2R1bGUtbWVzc2FnZV9fY29udGV4dF9fZG93bmxvYWQnLFxuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RoaXMub3BlbkdlbmVyaWNBdHRhY2htZW50fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdkb3dubG9hZEF0dGFjaG1lbnQnKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge3Nob3VsZFNob3dBZGRpdGlvbmFsID8gKFxuICAgICAgICAgIDw+XG4gICAgICAgICAgICB7Y2FuUmVwbHkgJiYgKFxuICAgICAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzPXt7XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU6XG4gICAgICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fY29udGV4dC0taWNvbiBtb2R1bGUtbWVzc2FnZV9fY29udGV4dF9fcmVwbHknLFxuICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgICAgIHJlcGx5VG9NZXNzYWdlKGlkKTtcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAge2kxOG4oJ3JlcGx5VG9NZXNzYWdlJyl9XG4gICAgICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICAgICApfVxuICAgICAgICAgICAge2NhblJlYWN0ICYmIChcbiAgICAgICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcz17e1xuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHQtLWljb24gbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHRfX3JlYWN0JyxcbiAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uUGlja2VyKCk7XG4gICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHtpMThuKCdyZWFjdFRvTWVzc2FnZScpfVxuICAgICAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICAgICAgKX1cbiAgICAgICAgICA8Lz5cbiAgICAgICAgKSA6IG51bGx9XG4gICAgICAgIDxNZW51SXRlbVxuICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgIGNsYXNzTmFtZTpcbiAgICAgICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX19jb250ZXh0LS1pY29uIG1vZHVsZS1tZXNzYWdlX19jb250ZXh0X19tb3JlLWluZm8nLFxuICAgICAgICAgIH19XG4gICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgIHNob3dNZXNzYWdlRGV0YWlsKGlkKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ21vcmVJbmZvJyl9XG4gICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgIHtjYW5SZXRyeSA/IChcbiAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fY29udGV4dC0taWNvbiBtb2R1bGUtbWVzc2FnZV9fY29udGV4dF9fcmV0cnktc2VuZCcsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgIHJldHJ5U2VuZChpZCk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtpMThuKCdyZXRyeVNlbmQnKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAge2NhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmUgPyAoXG4gICAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgICBhdHRyaWJ1dGVzPXt7XG4gICAgICAgICAgICAgIGNsYXNzTmFtZTpcbiAgICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHQtLWljb24gbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHRfX2RlbGV0ZS1tZXNzYWdlLWZvci1ldmVyeW9uZScsXG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgb25DbGljaz17KGV2ZW50OiBSZWFjdC5Nb3VzZUV2ZW50KSA9PiB7XG4gICAgICAgICAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICAgIHJldHJ5RGVsZXRlRm9yRXZlcnlvbmUoaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bigncmV0cnlEZWxldGVGb3JFdmVyeW9uZScpfVxuICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgICB7Y2FuRm9yd2FyZCA/IChcbiAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fY29udGV4dC0taWNvbiBtb2R1bGUtbWVzc2FnZV9fY29udGV4dF9fZm9yd2FyZC1tZXNzYWdlJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwoaWQpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7aTE4bignZm9yd2FyZE1lc3NhZ2UnKX1cbiAgICAgICAgICA8L01lbnVJdGVtPlxuICAgICAgICApIDogbnVsbH1cbiAgICAgICAgPE1lbnVJdGVtXG4gICAgICAgICAgYXR0cmlidXRlcz17e1xuICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHQtLWljb24gbW9kdWxlLW1lc3NhZ2VfX2NvbnRleHRfX2RlbGV0ZS1tZXNzYWdlJyxcbiAgICAgICAgICB9fVxuICAgICAgICAgIG9uQ2xpY2s9eyhldmVudDogUmVhY3QuTW91c2VFdmVudCkgPT4ge1xuICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuXG4gICAgICAgICAgICBkZWxldGVNZXNzYWdlKGlkKTtcbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAge2kxOG4oJ2RlbGV0ZU1lc3NhZ2UnKX1cbiAgICAgICAgPC9NZW51SXRlbT5cbiAgICAgICAge3RoaXMuY2FuRGVsZXRlRm9yRXZlcnlvbmUoKSA/IChcbiAgICAgICAgICA8TWVudUl0ZW1cbiAgICAgICAgICAgIGF0dHJpYnV0ZXM9e3tcbiAgICAgICAgICAgICAgY2xhc3NOYW1lOlxuICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fY29udGV4dC0taWNvbiBtb2R1bGUtbWVzc2FnZV9fY29udGV4dF9fZGVsZXRlLW1lc3NhZ2UtZm9yLWV2ZXJ5b25lJyxcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgICBvbkNsaWNrPXsoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpID0+IHtcbiAgICAgICAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG5cbiAgICAgICAgICAgICAgZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lKGlkKTtcbiAgICAgICAgICAgIH19XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2kxOG4oJ2RlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZScpfVxuICAgICAgICAgIDwvTWVudUl0ZW0+XG4gICAgICAgICkgOiBudWxsfVxuICAgICAgPC9Db250ZXh0TWVudT5cbiAgICApO1xuXG4gICAgcmV0dXJuIFJlYWN0RE9NLmNyZWF0ZVBvcnRhbChtZW51LCBkb2N1bWVudC5ib2R5KTtcbiAgfVxuXG4gIHByaXZhdGUgaXNXaW5kb3dXaWR0aE5vdE5hcnJvdygpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludCB9ID0gdGhpcy5wcm9wcztcbiAgICByZXR1cm4gY29udGFpbmVyV2lkdGhCcmVha3BvaW50ICE9PSBXaWR0aEJyZWFrcG9pbnQuTmFycm93O1xuICB9XG5cbiAgcHVibGljIGdldFdpZHRoKCk6IG51bWJlciB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgeyBhdHRhY2htZW50cywgZ2lmdEJhZGdlLCBpc1N0aWNrZXIsIHByZXZpZXdzIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKGdpZnRCYWRnZSkge1xuICAgICAgcmV0dXJuIDI0MDtcbiAgICB9XG5cbiAgICBpZiAoYXR0YWNobWVudHMgJiYgYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICBpZiAoaXNHSUYoYXR0YWNobWVudHMpKSB7XG4gICAgICAgIC8vIE1lc3NhZ2UgY29udGFpbmVyIGJvcmRlclxuICAgICAgICByZXR1cm4gR0lGX1NJWkUgKyAyO1xuICAgICAgfVxuXG4gICAgICBpZiAoaXNTdGlja2VyKSB7XG4gICAgICAgIC8vIFBhZGRpbmcgaXMgOHB4LCBvbiBib3RoIHNpZGVzXG4gICAgICAgIHJldHVybiBTVElDS0VSX1NJWkUgKyA4ICogMjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGdldEdyaWREaW1lbnNpb25zKGF0dGFjaG1lbnRzKTtcbiAgICAgIGlmIChkaW1lbnNpb25zKSB7XG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0TGlua1ByZXZpZXcgPSAocHJldmlld3MgfHwgW10pWzBdO1xuICAgIGlmIChcbiAgICAgIGZpcnN0TGlua1ByZXZpZXcgJiZcbiAgICAgIGZpcnN0TGlua1ByZXZpZXcuaW1hZ2UgJiZcbiAgICAgIHNob3VsZFVzZUZ1bGxTaXplTGlua1ByZXZpZXdJbWFnZShmaXJzdExpbmtQcmV2aWV3KVxuICAgICkge1xuICAgICAgY29uc3QgZGltZW5zaW9ucyA9IGdldEltYWdlRGltZW5zaW9ucyhmaXJzdExpbmtQcmV2aWV3LmltYWdlKTtcbiAgICAgIGlmIChkaW1lbnNpb25zKSB7XG4gICAgICAgIHJldHVybiBkaW1lbnNpb25zLndpZHRoO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBwdWJsaWMgaXNTaG93aW5nSW1hZ2UoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgeyBpc1RhcFRvVmlldywgYXR0YWNobWVudHMsIHByZXZpZXdzIH0gPSB0aGlzLnByb3BzO1xuICAgIGNvbnN0IHsgaW1hZ2VCcm9rZW4gfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoaW1hZ2VCcm9rZW4gfHwgaXNUYXBUb1ZpZXcpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoYXR0YWNobWVudHMgJiYgYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBkaXNwbGF5SW1hZ2UgPSBjYW5EaXNwbGF5SW1hZ2UoYXR0YWNobWVudHMpO1xuXG4gICAgICByZXR1cm4gZGlzcGxheUltYWdlICYmIChpc0ltYWdlKGF0dGFjaG1lbnRzKSB8fCBpc1ZpZGVvKGF0dGFjaG1lbnRzKSk7XG4gICAgfVxuXG4gICAgaWYgKHByZXZpZXdzICYmIHByZXZpZXdzLmxlbmd0aCkge1xuICAgICAgY29uc3QgZmlyc3QgPSBwcmV2aWV3c1swXTtcbiAgICAgIGNvbnN0IHsgaW1hZ2UgfSA9IGZpcnN0O1xuXG4gICAgICByZXR1cm4gaXNJbWFnZUF0dGFjaG1lbnQoaW1hZ2UpO1xuICAgIH1cblxuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHB1YmxpYyBpc0F0dGFjaG1lbnRQZW5kaW5nKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IHsgYXR0YWNobWVudHMgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIWF0dGFjaG1lbnRzIHx8IGF0dGFjaG1lbnRzLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBmaXJzdCA9IGF0dGFjaG1lbnRzWzBdO1xuXG4gICAgcmV0dXJuIEJvb2xlYW4oZmlyc3QucGVuZGluZyk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyVGFwVG9WaWV3SWNvbigpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBkaXJlY3Rpb24sIGlzVGFwVG9WaWV3RXhwaXJlZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBpc0Rvd25sb2FkUGVuZGluZyA9IHRoaXMuaXNBdHRhY2htZW50UGVuZGluZygpO1xuXG4gICAgcmV0dXJuICFpc1RhcFRvVmlld0V4cGlyZWQgJiYgaXNEb3dubG9hZFBlbmRpbmcgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlX190YXAtdG8tdmlld19fc3Bpbm5lci1jb250YWluZXJcIj5cbiAgICAgICAgPFNwaW5uZXIgc3ZnU2l6ZT1cInNtYWxsXCIgc2l6ZT1cIjIwcHhcIiBkaXJlY3Rpb249e2RpcmVjdGlvbn0gLz5cbiAgICAgIDwvZGl2PlxuICAgICkgOiAoXG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3X19pY29uJyxcbiAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3X19pY29uLS0ke2RpcmVjdGlvbn1gLFxuICAgICAgICAgIGlzVGFwVG9WaWV3RXhwaXJlZFxuICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3X19pY29uLS1leHBpcmVkJ1xuICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICl9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyVGFwVG9WaWV3VGV4dCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHtcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgaTE4bixcbiAgICAgIGlzVGFwVG9WaWV3RXhwaXJlZCxcbiAgICAgIGlzVGFwVG9WaWV3RXJyb3IsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBpbmNvbWluZ1N0cmluZyA9IGlzVGFwVG9WaWV3RXhwaXJlZFxuICAgICAgPyBpMThuKCdNZXNzYWdlLS10YXAtdG8tdmlldy1leHBpcmVkJylcbiAgICAgIDogaTE4bihcbiAgICAgICAgICBgTWVzc2FnZS0tdGFwLXRvLXZpZXctLWluY29taW5nJHtcbiAgICAgICAgICAgIGlzVmlkZW8oYXR0YWNobWVudHMpID8gJy12aWRlbycgOiAnJ1xuICAgICAgICAgIH1gXG4gICAgICAgICk7XG4gICAgY29uc3Qgb3V0Z29pbmdTdHJpbmcgPSBpMThuKCdNZXNzYWdlLS10YXAtdG8tdmlldy0tb3V0Z29pbmcnKTtcbiAgICBjb25zdCBpc0Rvd25sb2FkUGVuZGluZyA9IHRoaXMuaXNBdHRhY2htZW50UGVuZGluZygpO1xuXG4gICAgaWYgKGlzRG93bmxvYWRQZW5kaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLW5lc3RlZC10ZXJuYXJ5XG4gICAgcmV0dXJuIGlzVGFwVG9WaWV3RXJyb3JcbiAgICAgID8gaTE4bignaW5jb21pbmdFcnJvcicpXG4gICAgICA6IGRpcmVjdGlvbiA9PT0gJ291dGdvaW5nJ1xuICAgICAgPyBvdXRnb2luZ1N0cmluZ1xuICAgICAgOiBpbmNvbWluZ1N0cmluZztcbiAgfVxuXG4gIHB1YmxpYyByZW5kZXJUYXBUb1ZpZXcoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHtcbiAgICAgIGNvbnZlcnNhdGlvblR5cGUsXG4gICAgICBkaXJlY3Rpb24sXG4gICAgICBpc1RhcFRvVmlld0V4cGlyZWQsXG4gICAgICBpc1RhcFRvVmlld0Vycm9yLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29sbGFwc2VNZXRhZGF0YSA9XG4gICAgICB0aGlzLmdldE1ldGFkYXRhUGxhY2VtZW50KCkgPT09IE1ldGFkYXRhUGxhY2VtZW50Lk5vdFJlbmRlcmVkO1xuICAgIGNvbnN0IHdpdGhDb250ZW50QmVsb3cgPSAhY29sbGFwc2VNZXRhZGF0YTtcbiAgICBjb25zdCB3aXRoQ29udGVudEFib3ZlID1cbiAgICAgICFjb2xsYXBzZU1ldGFkYXRhICYmXG4gICAgICBjb252ZXJzYXRpb25UeXBlID09PSAnZ3JvdXAnICYmXG4gICAgICBkaXJlY3Rpb24gPT09ICdpbmNvbWluZyc7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1tZXNzYWdlX190YXAtdG8tdmlldycsXG4gICAgICAgICAgd2l0aENvbnRlbnRCZWxvd1xuICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3LS13aXRoLWNvbnRlbnQtYmVsb3cnXG4gICAgICAgICAgICA6IG51bGwsXG4gICAgICAgICAgd2l0aENvbnRlbnRBYm92ZVxuICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3LS13aXRoLWNvbnRlbnQtYWJvdmUnXG4gICAgICAgICAgICA6IG51bGxcbiAgICAgICAgKX1cbiAgICAgID5cbiAgICAgICAge2lzVGFwVG9WaWV3RXJyb3IgPyBudWxsIDogdGhpcy5yZW5kZXJUYXBUb1ZpZXdJY29uKCl9XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3X190ZXh0JyxcbiAgICAgICAgICAgIGBtb2R1bGUtbWVzc2FnZV9fdGFwLXRvLXZpZXdfX3RleHQtLSR7ZGlyZWN0aW9ufWAsXG4gICAgICAgICAgICBpc1RhcFRvVmlld0V4cGlyZWRcbiAgICAgICAgICAgICAgPyBgbW9kdWxlLW1lc3NhZ2VfX3RhcC10by12aWV3X190ZXh0LS0ke2RpcmVjdGlvbn0tZXhwaXJlZGBcbiAgICAgICAgICAgICAgOiBudWxsLFxuICAgICAgICAgICAgaXNUYXBUb1ZpZXdFcnJvclxuICAgICAgICAgICAgICA/IGBtb2R1bGUtbWVzc2FnZV9fdGFwLXRvLXZpZXdfX3RleHQtLSR7ZGlyZWN0aW9ufS1lcnJvcmBcbiAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIHt0aGlzLnJlbmRlclRhcFRvVmlld1RleHQoKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBwb3BwZXJQcmV2ZW50T3ZlcmZsb3dNb2RpZmllcigpOiBQYXJ0aWFsPFByZXZlbnRPdmVyZmxvd01vZGlmaWVyPiB7XG4gICAgY29uc3QgeyBjb250YWluZXJFbGVtZW50UmVmIH0gPSB0aGlzLnByb3BzO1xuICAgIHJldHVybiB7XG4gICAgICBuYW1lOiAncHJldmVudE92ZXJmbG93JyxcbiAgICAgIG9wdGlvbnM6IHtcbiAgICAgICAgYWx0QXhpczogdHJ1ZSxcbiAgICAgICAgYm91bmRhcnk6IGNvbnRhaW5lckVsZW1lbnRSZWYuY3VycmVudCB8fCB1bmRlZmluZWQsXG4gICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICBib3R0b206IDE2LFxuICAgICAgICAgIGxlZnQ6IDgsXG4gICAgICAgICAgcmlnaHQ6IDgsXG4gICAgICAgICAgdG9wOiAxNixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIHB1YmxpYyB0b2dnbGVSZWFjdGlvblZpZXdlciA9IChvbmx5UmVtb3ZlID0gZmFsc2UpOiB2b2lkID0+IHtcbiAgICB0aGlzLnNldFN0YXRlKCh7IHJlYWN0aW9uVmlld2VyUm9vdCB9KSA9PiB7XG4gICAgICBpZiAocmVhY3Rpb25WaWV3ZXJSb290KSB7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQocmVhY3Rpb25WaWV3ZXJSb290KTtcbiAgICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKFxuICAgICAgICAgICdjbGljaycsXG4gICAgICAgICAgdGhpcy5oYW5kbGVDbGlja091dHNpZGVSZWFjdGlvblZpZXdlcixcbiAgICAgICAgICB0cnVlXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHsgcmVhY3Rpb25WaWV3ZXJSb290OiBudWxsIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghb25seVJlbW92ZSkge1xuICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQocm9vdCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlUmVhY3Rpb25WaWV3ZXIsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgcmVhY3Rpb25WaWV3ZXJSb290OiByb290LFxuICAgICAgICB9O1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9KTtcbiAgfTtcblxuICBwdWJsaWMgdG9nZ2xlUmVhY3Rpb25QaWNrZXIgPSAob25seVJlbW92ZSA9IGZhbHNlKTogdm9pZCA9PiB7XG4gICAgdGhpcy5zZXRTdGF0ZSgoeyByZWFjdGlvblBpY2tlclJvb3QgfSkgPT4ge1xuICAgICAgaWYgKHJlYWN0aW9uUGlja2VyUm9vdCkge1xuICAgICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKHJlYWN0aW9uUGlja2VyUm9vdCk7XG4gICAgICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgIHRoaXMuaGFuZGxlQ2xpY2tPdXRzaWRlUmVhY3Rpb25QaWNrZXIsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7IHJlYWN0aW9uUGlja2VyUm9vdDogbnVsbCB9O1xuICAgICAgfVxuXG4gICAgICBpZiAoIW9ubHlSZW1vdmUpIHtcbiAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFwcGVuZENoaWxkKHJvb3QpO1xuICAgICAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoXG4gICAgICAgICAgJ2NsaWNrJyxcbiAgICAgICAgICB0aGlzLmhhbmRsZUNsaWNrT3V0c2lkZVJlYWN0aW9uUGlja2VyLFxuICAgICAgICAgIHRydWVcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHJlYWN0aW9uUGlja2VyUm9vdDogcm9vdCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIGhhbmRsZUNsaWNrT3V0c2lkZVJlYWN0aW9uVmlld2VyID0gKGU6IE1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHJlYWN0aW9uVmlld2VyUm9vdCB9ID0gdGhpcy5zdGF0ZTtcbiAgICBjb25zdCB7IGN1cnJlbnQ6IHJlYWN0aW9uc0NvbnRhaW5lciB9ID0gdGhpcy5yZWFjdGlvbnNDb250YWluZXJSZWY7XG4gICAgaWYgKHJlYWN0aW9uVmlld2VyUm9vdCAmJiByZWFjdGlvbnNDb250YWluZXIpIHtcbiAgICAgIGlmIChcbiAgICAgICAgIXJlYWN0aW9uVmlld2VyUm9vdC5jb250YWlucyhlLnRhcmdldCBhcyBIVE1MRWxlbWVudCkgJiZcbiAgICAgICAgIXJlYWN0aW9uc0NvbnRhaW5lci5jb250YWlucyhlLnRhcmdldCBhcyBIVE1MRWxlbWVudClcbiAgICAgICkge1xuICAgICAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uVmlld2VyKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlQ2xpY2tPdXRzaWRlUmVhY3Rpb25QaWNrZXIgPSAoZTogTW91c2VFdmVudCk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgcmVhY3Rpb25QaWNrZXJSb290IH0gPSB0aGlzLnN0YXRlO1xuICAgIGlmIChyZWFjdGlvblBpY2tlclJvb3QpIHtcbiAgICAgIGlmICghcmVhY3Rpb25QaWNrZXJSb290LmNvbnRhaW5zKGUudGFyZ2V0IGFzIEhUTUxFbGVtZW50KSkge1xuICAgICAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uUGlja2VyKHRydWUpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgcmVuZGVyUmVhY3Rpb25zKG91dGdvaW5nOiBib29sZWFuKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7IGdldFByZWZlcnJlZEJhZGdlLCByZWFjdGlvbnMgPSBbXSwgaTE4biwgdGhlbWUgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoIXRoaXMuaGFzUmVhY3Rpb25zKCkpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHJlYWN0aW9uc1dpdGhFbW9qaURhdGEgPSByZWFjdGlvbnMubWFwKHJlYWN0aW9uID0+ICh7XG4gICAgICAuLi5yZWFjdGlvbixcbiAgICAgIC4uLmVtb2ppVG9EYXRhKHJlYWN0aW9uLmVtb2ppKSxcbiAgICB9KSk7XG5cbiAgICAvLyBHcm91cCBieSBlbW9qaSBhbmQgb3JkZXIgZWFjaCBncm91cCBieSB0aW1lc3RhbXAgZGVzY2VuZGluZ1xuICAgIGNvbnN0IGdyb3VwZWRBbmRTb3J0ZWRSZWFjdGlvbnMgPSBPYmplY3QudmFsdWVzKFxuICAgICAgZ3JvdXBCeShyZWFjdGlvbnNXaXRoRW1vamlEYXRhLCAnc2hvcnRfbmFtZScpXG4gICAgKS5tYXAoZ3JvdXBlZFJlYWN0aW9ucyA9PlxuICAgICAgb3JkZXJCeShcbiAgICAgICAgZ3JvdXBlZFJlYWN0aW9ucyxcbiAgICAgICAgW3JlYWN0aW9uID0+IHJlYWN0aW9uLmZyb20uaXNNZSwgJ3RpbWVzdGFtcCddLFxuICAgICAgICBbJ2Rlc2MnLCAnZGVzYyddXG4gICAgICApXG4gICAgKTtcbiAgICAvLyBPcmRlciBncm91cHMgYnkgbGVuZ3RoIGFuZCBzdWJzZXF1ZW50bHkgYnkgbW9zdCByZWNlbnQgcmVhY3Rpb25cbiAgICBjb25zdCBvcmRlcmVkID0gb3JkZXJCeShcbiAgICAgIGdyb3VwZWRBbmRTb3J0ZWRSZWFjdGlvbnMsXG4gICAgICBbJ2xlbmd0aCcsIChbeyB0aW1lc3RhbXAgfV0pID0+IHRpbWVzdGFtcF0sXG4gICAgICBbJ2Rlc2MnLCAnZGVzYyddXG4gICAgKTtcbiAgICAvLyBUYWtlIHRoZSBmaXJzdCB0aHJlZSBncm91cHMgZm9yIHJlbmRlcmluZ1xuICAgIGNvbnN0IHRvUmVuZGVyID0gdGFrZShvcmRlcmVkLCAzKS5tYXAocmVzID0+ICh7XG4gICAgICBlbW9qaTogcmVzWzBdLmVtb2ppLFxuICAgICAgY291bnQ6IHJlcy5sZW5ndGgsXG4gICAgICBpc01lOiByZXMuc29tZShyZSA9PiBCb29sZWFuKHJlLmZyb20uaXNNZSkpLFxuICAgIH0pKTtcbiAgICBjb25zdCBzb21lTm90UmVuZGVyZWQgPSBvcmRlcmVkLmxlbmd0aCA+IDM7XG4gICAgLy8gV2Ugb25seSBkcm9wIHR3byBoZXJlIGJlY2F1c2UgdGhlIHRoaXJkIGVtb2ppIHdvdWxkIGJlIHJlcGxhY2VkIGJ5IHRoZVxuICAgIC8vIG1vcmUgYnV0dG9uXG4gICAgY29uc3QgbWF5YmVOb3RSZW5kZXJlZCA9IGRyb3Aob3JkZXJlZCwgMik7XG4gICAgY29uc3QgbWF5YmVOb3RSZW5kZXJlZFRvdGFsID0gbWF5YmVOb3RSZW5kZXJlZC5yZWR1Y2UoXG4gICAgICAoc3VtLCByZXMpID0+IHN1bSArIHJlcy5sZW5ndGgsXG4gICAgICAwXG4gICAgKTtcbiAgICBjb25zdCBub3RSZW5kZXJlZElzTWUgPVxuICAgICAgc29tZU5vdFJlbmRlcmVkICYmXG4gICAgICBtYXliZU5vdFJlbmRlcmVkLnNvbWUocmVzID0+IHJlcy5zb21lKHJlID0+IEJvb2xlYW4ocmUuZnJvbS5pc01lKSkpO1xuXG4gICAgY29uc3QgeyByZWFjdGlvblZpZXdlclJvb3QgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBjb25zdCBwb3BwZXJQbGFjZW1lbnQgPSBvdXRnb2luZyA/ICdib3R0b20tZW5kJyA6ICdib3R0b20tc3RhcnQnO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIDxNYW5hZ2VyPlxuICAgICAgICA8UmVmZXJlbmNlPlxuICAgICAgICAgIHsoeyByZWY6IHBvcHBlclJlZiB9KSA9PiAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIHJlZj17dGhpcy5yZWFjdGlvbnNDb250YWluZXJSZWZNZXJnZXIoXG4gICAgICAgICAgICAgICAgdGhpcy5yZWFjdGlvbnNDb250YWluZXJSZWYsXG4gICAgICAgICAgICAgICAgcG9wcGVyUmVmXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3JlYWN0aW9ucycsXG4gICAgICAgICAgICAgICAgb3V0Z29pbmdcbiAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX19yZWFjdGlvbnMtLW91dGdvaW5nJ1xuICAgICAgICAgICAgICAgICAgOiAnbW9kdWxlLW1lc3NhZ2VfX3JlYWN0aW9ucy0taW5jb21pbmcnXG4gICAgICAgICAgICAgICl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0b1JlbmRlci5tYXAoKHJlLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgaXNMYXN0ID0gaSA9PT0gdG9SZW5kZXIubGVuZ3RoIC0gMTtcbiAgICAgICAgICAgICAgICBjb25zdCBpc01vcmUgPSBpc0xhc3QgJiYgc29tZU5vdFJlbmRlcmVkO1xuICAgICAgICAgICAgICAgIGNvbnN0IGlzTW9yZVdpdGhNZSA9IGlzTW9yZSAmJiBub3RSZW5kZXJlZElzTWU7XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gKFxuICAgICAgICAgICAgICAgICAgPGJ1dHRvblxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiYnV0dG9uXCJcbiAgICAgICAgICAgICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIHJlYWN0L25vLWFycmF5LWluZGV4LWtleVxuICAgICAgICAgICAgICAgICAgICBrZXk9e2Ake3JlLmVtb2ppfS0ke2l9YH1cbiAgICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fcmVhY3Rpb25zX19yZWFjdGlvbicsXG4gICAgICAgICAgICAgICAgICAgICAgcmUuY291bnQgPiAxXG4gICAgICAgICAgICAgICAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fcmVhY3Rpb25zX19yZWFjdGlvbi0td2l0aC1jb3VudCdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICAgICAgICAgICAgICBvdXRnb2luZ1xuICAgICAgICAgICAgICAgICAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX3JlYWN0aW9uc19fcmVhY3Rpb24tLW91dGdvaW5nJ1xuICAgICAgICAgICAgICAgICAgICAgICAgOiAnbW9kdWxlLW1lc3NhZ2VfX3JlYWN0aW9uc19fcmVhY3Rpb24tLWluY29taW5nJyxcbiAgICAgICAgICAgICAgICAgICAgICBpc01vcmVXaXRoTWUgfHwgKHJlLmlzTWUgJiYgIWlzTW9yZVdpdGhNZSlcbiAgICAgICAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX19yZWFjdGlvbnNfX3JlYWN0aW9uLS1pcy1tZSdcbiAgICAgICAgICAgICAgICAgICAgICAgIDogbnVsbFxuICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICBlLnN0b3BQcm9wYWdhdGlvbigpO1xuICAgICAgICAgICAgICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICAgICAgICAgICAgICB0aGlzLnRvZ2dsZVJlYWN0aW9uVmlld2VyKGZhbHNlKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgICAgb25LZXlEb3duPXtlID0+IHtcbiAgICAgICAgICAgICAgICAgICAgICAvLyBQcmV2ZW50IGVudGVyIGtleSBmcm9tIG9wZW5pbmcgc3RpY2tlcnMvYXR0YWNobWVudHNcbiAgICAgICAgICAgICAgICAgICAgICBpZiAoZS5rZXkgPT09ICdFbnRlcicpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGUuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAgICB7aXNNb3JlID8gKFxuICAgICAgICAgICAgICAgICAgICAgIDxzcGFuXG4gICAgICAgICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fcmVhY3Rpb25zX19yZWFjdGlvbl9fY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2VfX3JlYWN0aW9uc19fcmVhY3Rpb25fX2NvdW50LS1uby1lbW9qaScsXG4gICAgICAgICAgICAgICAgICAgICAgICAgIGlzTW9yZVdpdGhNZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgID8gJ21vZHVsZS1tZXNzYWdlX19yZWFjdGlvbnNfX3JlYWN0aW9uX19jb3VudC0taXMtbWUnXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgOiBudWxsXG4gICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAgICAgICt7bWF5YmVOb3RSZW5kZXJlZFRvdGFsfVxuICAgICAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICAgICAgKSA6IChcbiAgICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgICAgPEVtb2ppIHNpemU9ezE2fSBlbW9qaT17cmUuZW1vaml9IC8+XG4gICAgICAgICAgICAgICAgICAgICAgICB7cmUuY291bnQgPiAxID8gKFxuICAgICAgICAgICAgICAgICAgICAgICAgICA8c3BhblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICdtb2R1bGUtbWVzc2FnZV9fcmVhY3Rpb25zX19yZWFjdGlvbl9fY291bnQnLFxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmUuaXNNZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fcmVhY3Rpb25zX19yZWFjdGlvbl9fY291bnQtLWlzLW1lJ1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA6IG51bGxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICApfVxuICAgICAgICAgICAgICAgICAgICAgICAgICA+XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAge3JlLmNvdW50fVxuICAgICAgICAgICAgICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgIDwvYnV0dG9uPlxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pfVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgKX1cbiAgICAgICAgPC9SZWZlcmVuY2U+XG4gICAgICAgIHtyZWFjdGlvblZpZXdlclJvb3QgJiZcbiAgICAgICAgICBjcmVhdGVQb3J0YWwoXG4gICAgICAgICAgICA8U3RvcFByb3BhZ2F0aW9uPlxuICAgICAgICAgICAgICA8UG9wcGVyXG4gICAgICAgICAgICAgICAgcGxhY2VtZW50PXtwb3BwZXJQbGFjZW1lbnR9XG4gICAgICAgICAgICAgICAgc3RyYXRlZ3k9XCJmaXhlZFwiXG4gICAgICAgICAgICAgICAgbW9kaWZpZXJzPXtbdGhpcy5wb3BwZXJQcmV2ZW50T3ZlcmZsb3dNb2RpZmllcigpXX1cbiAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgIHsoeyByZWYsIHN0eWxlIH0pID0+IChcbiAgICAgICAgICAgICAgICAgIDxSZWFjdGlvblZpZXdlclxuICAgICAgICAgICAgICAgICAgICByZWY9e3JlZn1cbiAgICAgICAgICAgICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZSxcbiAgICAgICAgICAgICAgICAgICAgICB6SW5kZXg6IDIsXG4gICAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgICAgICAgcmVhY3Rpb25zPXtyZWFjdGlvbnN9XG4gICAgICAgICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgICAgICAgIG9uQ2xvc2U9e3RoaXMudG9nZ2xlUmVhY3Rpb25WaWV3ZXJ9XG4gICAgICAgICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgPC9Qb3BwZXI+XG4gICAgICAgICAgICA8L1N0b3BQcm9wYWdhdGlvbj4sXG4gICAgICAgICAgICByZWFjdGlvblZpZXdlclJvb3RcbiAgICAgICAgICApfVxuICAgICAgPC9NYW5hZ2VyPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyQ29udGVudHMoKTogSlNYLkVsZW1lbnQgfCBudWxsIHtcbiAgICBjb25zdCB7IGdpZnRCYWRnZSwgaXNUYXBUb1ZpZXcsIGRlbGV0ZWRGb3JFdmVyeW9uZSB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmIChkZWxldGVkRm9yRXZlcnlvbmUpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge3RoaXMucmVuZGVyVGV4dCgpfVxuICAgICAgICAgIHt0aGlzLnJlbmRlck1ldGFkYXRhKCl9XG4gICAgICAgIDwvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZ2lmdEJhZGdlKSB7XG4gICAgICByZXR1cm4gdGhpcy5yZW5kZXJHaWZ0QmFkZ2UoKTtcbiAgICB9XG5cbiAgICBpZiAoaXNUYXBUb1ZpZXcpIHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDw+XG4gICAgICAgICAge3RoaXMucmVuZGVyVGFwVG9WaWV3KCl9XG4gICAgICAgICAge3RoaXMucmVuZGVyTWV0YWRhdGEoKX1cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICB7dGhpcy5yZW5kZXJRdW90ZSgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJTdG9yeVJlcGx5Q29udGV4dCgpfVxuICAgICAgICB7dGhpcy5yZW5kZXJBdHRhY2htZW50KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclByZXZpZXcoKX1cbiAgICAgICAge3RoaXMucmVuZGVyRW1iZWRkZWRDb250YWN0KCl9XG4gICAgICAgIHt0aGlzLnJlbmRlclRleHQoKX1cbiAgICAgICAge3RoaXMucmVuZGVyTWV0YWRhdGEoKX1cbiAgICAgICAge3RoaXMucmVuZGVyU2VuZE1lc3NhZ2VCdXR0b24oKX1cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgaGFuZGxlT3BlbiA9IChcbiAgICBldmVudDogUmVhY3QuS2V5Ym9hcmRFdmVudDxIVE1MRGl2RWxlbWVudD4gfCBSZWFjdC5Nb3VzZUV2ZW50XG4gICk6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgY29udGFjdCxcbiAgICAgIGRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgZ2lmdEJhZGdlLFxuICAgICAgaWQsXG4gICAgICBpc1RhcFRvVmlldyxcbiAgICAgIGlzVGFwVG9WaWV3RXhwaXJlZCxcbiAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgICBvcGVuQ29udmVyc2F0aW9uLFxuICAgICAgb3BlbkdpZnRCYWRnZSxcbiAgICAgIHNob3dDb250YWN0RGV0YWlsLFxuICAgICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQsXG4gICAgICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgICBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpbWFnZUJyb2tlbiB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIGNvbnN0IGlzQXR0YWNobWVudFBlbmRpbmcgPSB0aGlzLmlzQXR0YWNobWVudFBlbmRpbmcoKTtcblxuICAgIGlmIChnaWZ0QmFkZ2UgJiYgZ2lmdEJhZGdlLnN0YXRlID09PSBHaWZ0QmFkZ2VTdGF0ZXMuVW5vcGVuZWQpIHtcbiAgICAgIG9wZW5HaWZ0QmFkZ2UoaWQpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChpc1RhcFRvVmlldykge1xuICAgICAgaWYgKGlzQXR0YWNobWVudFBlbmRpbmcpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgJzxNZXNzYWdlPiBoYW5kbGVPcGVuOiB0YXAtdG8tdmlldyBhdHRhY2htZW50IGlzIHBlbmRpbmc7IG5vdCBzaG93aW5nIHRoZSBsaWdodGJveCdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoYXR0YWNobWVudHMgJiYgIWlzRG93bmxvYWRlZChhdHRhY2htZW50c1swXSkpIHtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQoe1xuICAgICAgICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnRzWzBdLFxuICAgICAgICAgIG1lc3NhZ2VJZDogaWQsXG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGlmIChpc1RhcFRvVmlld0V4cGlyZWQpIHtcbiAgICAgICAgY29uc3QgYWN0aW9uID1cbiAgICAgICAgICBkaXJlY3Rpb24gPT09ICdvdXRnb2luZydcbiAgICAgICAgICAgID8gc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0XG4gICAgICAgICAgICA6IHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdDtcbiAgICAgICAgYWN0aW9uKCk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgICBkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZShpZCk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhaW1hZ2VCcm9rZW4gJiZcbiAgICAgIGF0dGFjaG1lbnRzICYmXG4gICAgICBhdHRhY2htZW50cy5sZW5ndGggPiAwICYmXG4gICAgICAhaXNBdHRhY2htZW50UGVuZGluZyAmJlxuICAgICAgKGlzSW1hZ2UoYXR0YWNobWVudHMpIHx8IGlzVmlkZW8oYXR0YWNobWVudHMpKSAmJlxuICAgICAgIWlzRG93bmxvYWRlZChhdHRhY2htZW50c1swXSlcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgY29uc3QgYXR0YWNobWVudCA9IGF0dGFjaG1lbnRzWzBdO1xuXG4gICAgICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkKHsgYXR0YWNobWVudCwgbWVzc2FnZUlkOiBpZCB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFpbWFnZUJyb2tlbiAmJlxuICAgICAgYXR0YWNobWVudHMgJiZcbiAgICAgIGF0dGFjaG1lbnRzLmxlbmd0aCA+IDAgJiZcbiAgICAgICFpc0F0dGFjaG1lbnRQZW5kaW5nICYmXG4gICAgICBjYW5EaXNwbGF5SW1hZ2UoYXR0YWNobWVudHMpICYmXG4gICAgICAoKGlzSW1hZ2UoYXR0YWNobWVudHMpICYmIGhhc0ltYWdlKGF0dGFjaG1lbnRzKSkgfHxcbiAgICAgICAgKGlzVmlkZW8oYXR0YWNobWVudHMpICYmIGhhc1ZpZGVvU2NyZWVuc2hvdChhdHRhY2htZW50cykpKVxuICAgICkge1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICBjb25zdCBhdHRhY2htZW50ID0gYXR0YWNobWVudHNbMF07XG5cbiAgICAgIHNob3dWaXN1YWxBdHRhY2htZW50KHsgYXR0YWNobWVudCwgbWVzc2FnZUlkOiBpZCB9KTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGF0dGFjaG1lbnRzICYmXG4gICAgICBhdHRhY2htZW50cy5sZW5ndGggPT09IDEgJiZcbiAgICAgICFpc0F0dGFjaG1lbnRQZW5kaW5nICYmXG4gICAgICAhaXNBdWRpbyhhdHRhY2htZW50cylcbiAgICApIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcblxuICAgICAgdGhpcy5vcGVuR2VuZXJpY0F0dGFjaG1lbnQoKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFpc0F0dGFjaG1lbnRQZW5kaW5nICYmXG4gICAgICBpc0F1ZGlvKGF0dGFjaG1lbnRzKSAmJlxuICAgICAgdGhpcy5hdWRpb0J1dHRvblJlZiAmJlxuICAgICAgdGhpcy5hdWRpb0J1dHRvblJlZi5jdXJyZW50XG4gICAgKSB7XG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHRoaXMuYXVkaW9CdXR0b25SZWYuY3VycmVudC5jbGljaygpO1xuICAgIH1cblxuICAgIGlmIChjb250YWN0ICYmIGNvbnRhY3QuZmlyc3ROdW1iZXIgJiYgY29udGFjdC51dWlkKSB7XG4gICAgICBvcGVuQ29udmVyc2F0aW9uKGNvbnRhY3QuZmlyc3ROdW1iZXIpO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuXG4gICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgIGNvbnN0IHNpZ25hbEFjY291bnQgPVxuICAgICAgICBjb250YWN0LmZpcnN0TnVtYmVyICYmIGNvbnRhY3QudXVpZFxuICAgICAgICAgID8ge1xuICAgICAgICAgICAgICBwaG9uZU51bWJlcjogY29udGFjdC5maXJzdE51bWJlcixcbiAgICAgICAgICAgICAgdXVpZDogY29udGFjdC51dWlkLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgc2hvd0NvbnRhY3REZXRhaWwoeyBjb250YWN0LCBzaWduYWxBY2NvdW50IH0pO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgfVxuICB9O1xuXG4gIHB1YmxpYyBvcGVuR2VuZXJpY0F0dGFjaG1lbnQgPSAoZXZlbnQ/OiBSZWFjdC5Nb3VzZUV2ZW50KTogdm9pZCA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgaWQsXG4gICAgICBhdHRhY2htZW50cyxcbiAgICAgIGRvd25sb2FkQXR0YWNobWVudCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBpZiAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9XG5cbiAgICBpZiAoIWF0dGFjaG1lbnRzIHx8IGF0dGFjaG1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBhdHRhY2htZW50c1swXTtcbiAgICBpZiAoIWlzRG93bmxvYWRlZChhdHRhY2htZW50KSkge1xuICAgICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCh7XG4gICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgIG1lc3NhZ2VJZDogaWQsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGZpbGVOYW1lIH0gPSBhdHRhY2htZW50O1xuICAgIGNvbnN0IGlzRGFuZ2Vyb3VzID0gaXNGaWxlRGFuZ2Vyb3VzKGZpbGVOYW1lIHx8ICcnKTtcblxuICAgIGRvd25sb2FkQXR0YWNobWVudCh7XG4gICAgICBpc0Rhbmdlcm91cyxcbiAgICAgIGF0dGFjaG1lbnQsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSk7XG4gIH07XG5cbiAgcHVibGljIGhhbmRsZUtleURvd24gPSAoZXZlbnQ6IFJlYWN0LktleWJvYXJkRXZlbnQ8SFRNTERpdkVsZW1lbnQ+KTogdm9pZCA9PiB7XG4gICAgLy8gRG8gbm90IGFsbG93IHJlYWN0aW9ucyB0byBlcnJvciBtZXNzYWdlc1xuICAgIGNvbnN0IHsgY2FuUmVhY3QgfSA9IHRoaXMucHJvcHM7XG5cbiAgICBjb25zdCBrZXkgPSBLZXlib2FyZExheW91dC5sb29rdXAoZXZlbnQubmF0aXZlRXZlbnQpO1xuXG4gICAgaWYgKFxuICAgICAgKGtleSA9PT0gJ0UnIHx8IGtleSA9PT0gJ2UnKSAmJlxuICAgICAgKGV2ZW50Lm1ldGFLZXkgfHwgZXZlbnQuY3RybEtleSkgJiZcbiAgICAgIGV2ZW50LnNoaWZ0S2V5ICYmXG4gICAgICBjYW5SZWFjdFxuICAgICkge1xuICAgICAgdGhpcy50b2dnbGVSZWFjdGlvblBpY2tlcigpO1xuICAgIH1cblxuICAgIGlmIChldmVudC5rZXkgIT09ICdFbnRlcicgJiYgZXZlbnQua2V5ICE9PSAnU3BhY2UnKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5oYW5kbGVPcGVuKGV2ZW50KTtcbiAgfTtcblxuICBwdWJsaWMgaGFuZGxlQ2xpY2sgPSAoZXZlbnQ6IFJlYWN0Lk1vdXNlRXZlbnQpOiB2b2lkID0+IHtcbiAgICAvLyBXZSBkb24ndCB3YW50IGNsaWNrcyBvbiBib2R5IHRleHQgdG8gcmVzdWx0IGluIHRoZSAnZGVmYXVsdCBhY3Rpb24nIGZvciB0aGUgbWVzc2FnZVxuICAgIGNvbnN0IHsgdGV4dCB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAodGV4dCAmJiB0ZXh0Lmxlbmd0aCA+IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLmhhbmRsZU9wZW4oZXZlbnQpO1xuICB9O1xuXG4gIHB1YmxpYyByZW5kZXJDb250YWluZXIoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHtcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZSxcbiAgICAgIGRpcmVjdGlvbixcbiAgICAgIGdpZnRCYWRnZSxcbiAgICAgIGlzU3RpY2tlcixcbiAgICAgIGlzVGFwVG9WaWV3LFxuICAgICAgaXNUYXBUb1ZpZXdFeHBpcmVkLFxuICAgICAgaXNUYXBUb1ZpZXdFcnJvcixcbiAgICAgIHRleHQsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgeyBpc1NlbGVjdGVkIH0gPSB0aGlzLnN0YXRlO1xuXG4gICAgY29uc3QgaXNBdHRhY2htZW50UGVuZGluZyA9IHRoaXMuaXNBdHRhY2htZW50UGVuZGluZygpO1xuXG4gICAgY29uc3Qgd2lkdGggPSB0aGlzLmdldFdpZHRoKCk7XG4gICAgY29uc3Qgc2hvdWxkVXNlV2lkdGggPSBCb29sZWFuKGdpZnRCYWRnZSB8fCB0aGlzLmlzU2hvd2luZ0ltYWdlKCkpO1xuXG4gICAgY29uc3QgaXNFbW9qaU9ubHkgPSB0aGlzLmNhblJlbmRlclN0aWNrZXJMaWtlRW1vamkoKTtcbiAgICBjb25zdCBpc1N0aWNrZXJMaWtlID0gaXNTdGlja2VyIHx8IGlzRW1vamlPbmx5O1xuXG4gICAgLy8gSWYgaXQncyBhIG1vc3RseS1ub3JtYWwgZ3JheSBpbmNvbWluZyB0ZXh0IGJveCwgd2UgZG9uJ3Qgd2FudCB0byBkYXJrZW4gaXQgYXMgbXVjaFxuICAgIGNvbnN0IGxpZ2h0ZXJTZWxlY3QgPVxuICAgICAgaXNTZWxlY3RlZCAmJlxuICAgICAgZGlyZWN0aW9uID09PSAnaW5jb21pbmcnICYmXG4gICAgICAhaXNTdGlja2VyTGlrZSAmJlxuICAgICAgKHRleHQgfHwgKCFpc1ZpZGVvKGF0dGFjaG1lbnRzKSAmJiAhaXNJbWFnZShhdHRhY2htZW50cykpKTtcblxuICAgIGNvbnN0IGNvbnRhaW5lckNsYXNzbmFtZXMgPSBjbGFzc05hbWVzKFxuICAgICAgJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXInLFxuICAgICAgaXNHSUYoYXR0YWNobWVudHMpID8gJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXItLWdpZicgOiBudWxsLFxuICAgICAgaXNTZWxlY3RlZCA/ICdtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS1zZWxlY3RlZCcgOiBudWxsLFxuICAgICAgbGlnaHRlclNlbGVjdCA/ICdtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS1zZWxlY3RlZC1saWdodGVyJyA6IG51bGwsXG4gICAgICAhaXNTdGlja2VyTGlrZSA/IGBtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS0ke2RpcmVjdGlvbn1gIDogbnVsbCxcbiAgICAgIGlzRW1vamlPbmx5ID8gJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXItLWVtb2ppJyA6IG51bGwsXG4gICAgICBpc1RhcFRvVmlldyA/ICdtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS13aXRoLXRhcC10by12aWV3JyA6IG51bGwsXG4gICAgICBpc1RhcFRvVmlldyAmJiBpc1RhcFRvVmlld0V4cGlyZWRcbiAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci0td2l0aC10YXAtdG8tdmlldy1leHBpcmVkJ1xuICAgICAgICA6IG51bGwsXG4gICAgICAhaXNTdGlja2VyTGlrZSAmJiBkaXJlY3Rpb24gPT09ICdvdXRnb2luZydcbiAgICAgICAgPyBgbW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci0tb3V0Z29pbmctJHtjb252ZXJzYXRpb25Db2xvcn1gXG4gICAgICAgIDogbnVsbCxcbiAgICAgIGlzVGFwVG9WaWV3ICYmIGlzQXR0YWNobWVudFBlbmRpbmcgJiYgIWlzVGFwVG9WaWV3RXhwaXJlZFxuICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS13aXRoLXRhcC10by12aWV3LXBlbmRpbmcnXG4gICAgICAgIDogbnVsbCxcbiAgICAgIGlzVGFwVG9WaWV3ICYmIGlzQXR0YWNobWVudFBlbmRpbmcgJiYgIWlzVGFwVG9WaWV3RXhwaXJlZFxuICAgICAgICA/IGBtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS0ke2RpcmVjdGlvbn0tJHtjb252ZXJzYXRpb25Db2xvcn0tdGFwLXRvLXZpZXctcGVuZGluZ2BcbiAgICAgICAgOiBudWxsLFxuICAgICAgaXNUYXBUb1ZpZXdFcnJvclxuICAgICAgICA/ICdtb2R1bGUtbWVzc2FnZV9fY29udGFpbmVyLS13aXRoLXRhcC10by12aWV3LWVycm9yJ1xuICAgICAgICA6IG51bGwsXG4gICAgICB0aGlzLmhhc1JlYWN0aW9ucygpID8gJ21vZHVsZS1tZXNzYWdlX19jb250YWluZXItLXdpdGgtcmVhY3Rpb25zJyA6IG51bGwsXG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmVcbiAgICAgICAgPyAnbW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci0tZGVsZXRlZC1mb3ItZXZlcnlvbmUnXG4gICAgICAgIDogbnVsbFxuICAgICk7XG4gICAgY29uc3QgY29udGFpbmVyU3R5bGVzID0ge1xuICAgICAgd2lkdGg6IHNob3VsZFVzZVdpZHRoID8gd2lkdGggOiB1bmRlZmluZWQsXG4gICAgfTtcbiAgICBpZiAoIWlzU3RpY2tlckxpa2UgJiYgIWRlbGV0ZWRGb3JFdmVyeW9uZSAmJiBkaXJlY3Rpb24gPT09ICdvdXRnb2luZycpIHtcbiAgICAgIE9iamVjdC5hc3NpZ24oY29udGFpbmVyU3R5bGVzLCBnZXRDdXN0b21Db2xvclN0eWxlKGN1c3RvbUNvbG9yKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2VfX2NvbnRhaW5lci1vdXRlclwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjb250YWluZXJDbGFzc25hbWVzfVxuICAgICAgICAgIHN0eWxlPXtjb250YWluZXJTdHlsZXN9XG4gICAgICAgICAgb25Db250ZXh0TWVudT17dGhpcy5zaG93Q29udGV4dE1lbnV9XG4gICAgICAgICAgcm9sZT1cInJvd1wiXG4gICAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgICAgb25DbGljaz17dGhpcy5oYW5kbGVDbGlja31cbiAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgID5cbiAgICAgICAgICB7dGhpcy5yZW5kZXJBdXRob3IoKX1cbiAgICAgICAgICB7dGhpcy5yZW5kZXJDb250ZW50cygpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3RoaXMucmVuZGVyUmVhY3Rpb25zKGRpcmVjdGlvbiA9PT0gJ291dGdvaW5nJyl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIHJlbmRlcigpOiBKU1guRWxlbWVudCB8IG51bGwge1xuICAgIGNvbnN0IHtcbiAgICAgIGF1dGhvcixcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgZGlyZWN0aW9uLFxuICAgICAgaWQsXG4gICAgICBpc1N0aWNrZXIsXG4gICAgICBzaG91bGRDb2xsYXBzZUFib3ZlLFxuICAgICAgc2hvdWxkQ29sbGFwc2VCZWxvdyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IGV4cGlyZWQsIGV4cGlyaW5nLCBpbWFnZUJyb2tlbiwgaXNTZWxlY3RlZCB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIFRoaXMgaWQgaXMgd2hhdCBjb25uZWN0cyBvdXIgdHJpcGxlLWRvdCBjbGljayB3aXRoIG91ciBhc3NvY2lhdGVkIHBvcC11cCBtZW51LlxuICAgIC8vICAgSXQgbmVlZHMgdG8gYmUgdW5pcXVlLlxuICAgIGNvbnN0IHRyaWdnZXJJZCA9IFN0cmluZyhpZCB8fCBgJHthdXRob3IuaWR9LSR7dGltZXN0YW1wfWApO1xuXG4gICAgaWYgKGV4cGlyZWQpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGlmIChpc1N0aWNrZXIgJiYgKGltYWdlQnJva2VuIHx8ICFhdHRhY2htZW50cyB8fCAhYXR0YWNobWVudHMubGVuZ3RoKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIDxkaXZcbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtbWVzc2FnZScsXG4gICAgICAgICAgYG1vZHVsZS1tZXNzYWdlLS0ke2RpcmVjdGlvbn1gLFxuICAgICAgICAgIHNob3VsZENvbGxhcHNlQWJvdmUgJiYgJ21vZHVsZS1tZXNzYWdlLS1jb2xsYXBzZWQtYWJvdmUnLFxuICAgICAgICAgIHNob3VsZENvbGxhcHNlQmVsb3cgJiYgJ21vZHVsZS1tZXNzYWdlLS1jb2xsYXBzZWQtYmVsb3cnLFxuICAgICAgICAgIGlzU2VsZWN0ZWQgPyAnbW9kdWxlLW1lc3NhZ2UtLXNlbGVjdGVkJyA6IG51bGwsXG4gICAgICAgICAgZXhwaXJpbmcgPyAnbW9kdWxlLW1lc3NhZ2UtLWV4cGlyZWQnIDogbnVsbFxuICAgICAgICApfVxuICAgICAgICB0YWJJbmRleD17MH1cbiAgICAgICAgLy8gV2UgcHJldGVuZCB0byBiZSBhIGJ1dHRvbiBiZWNhdXNlIHdlIHNvbWV0aW1lcyBjb250YWluIGJ1dHRvbnMgYW5kIGEgYnV0dG9uXG4gICAgICAgIC8vICAgY2Fubm90IGJlIHdpdGhpbiBhbm90aGVyIGJ1dHRvblxuICAgICAgICByb2xlPVwiYnV0dG9uXCJcbiAgICAgICAgb25LZXlEb3duPXt0aGlzLmhhbmRsZUtleURvd259XG4gICAgICAgIG9uRm9jdXM9e3RoaXMuaGFuZGxlRm9jdXN9XG4gICAgICAgIHJlZj17dGhpcy5mb2N1c1JlZn1cbiAgICAgID5cbiAgICAgICAge3RoaXMucmVuZGVyRXJyb3IoKX1cbiAgICAgICAge3RoaXMucmVuZGVyQXZhdGFyKCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRhaW5lcigpfVxuICAgICAgICB7dGhpcy5yZW5kZXJNZW51KHRyaWdnZXJJZCl9XG4gICAgICAgIHt0aGlzLnJlbmRlckNvbnRleHRNZW51KHRyaWdnZXJJZCl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7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
