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
var MessageDetail_exports = {};
__export(MessageDetail_exports, {
  MessageDetail: () => MessageDetail
});
module.exports = __toCommonJS(MessageDetail_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_Avatar = require("../Avatar");
var import_ContactName = require("./ContactName");
var import_Time = require("../Time");
var import_Message = require("./Message");
var import_mapUtil = require("../../util/mapUtil");
var import_MessageSendState = require("../../messages/MessageSendState");
var import_util = require("../_util");
var log = __toESM(require("../../logging/log"));
var import_timestamp = require("../../util/timestamp");
const contactSortCollator = new Intl.Collator();
const _keyForError = /* @__PURE__ */ __name((error) => {
  return `${error.name}-${error.message}`;
}, "_keyForError");
class MessageDetail extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.focusRef = import_react.default.createRef();
    this.messageContainerRef = import_react.default.createRef();
  }
  componentDidMount() {
    setTimeout(() => {
      if (this.focusRef.current) {
        this.focusRef.current.focus();
      }
    });
  }
  renderAvatar(contact) {
    const { getPreferredBadge, i18n, theme } = this.props;
    const {
      acceptedMessageRequest,
      avatarPath,
      badges,
      color,
      isMe,
      name,
      phoneNumber,
      profileName,
      sharedGroupNames,
      title,
      unblurredAvatarPath
    } = contact;
    return /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest,
      avatarPath,
      badge: getPreferredBadge(badges),
      color,
      conversationType: "direct",
      i18n,
      isMe,
      name,
      phoneNumber,
      profileName,
      theme,
      title,
      sharedGroupNames,
      size: import_Avatar.AvatarSize.THIRTY_SIX,
      unblurredAvatarPath
    });
  }
  renderContact(contact) {
    const { i18n, showSafetyNumber } = this.props;
    const errors = contact.errors || [];
    const errorComponent = contact.isOutgoingKeyError ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__contact__error-buttons"
    }, /* @__PURE__ */ import_react.default.createElement("button", {
      type: "button",
      className: "module-message-detail__contact__show-safety-number",
      onClick: () => showSafetyNumber(contact.id)
    }, i18n("showSafetyNumber"))) : null;
    const unidentifiedDeliveryComponent = contact.isUnidentifiedDelivery ? /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__contact__unidentified-delivery-icon"
    }) : null;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      key: contact.id,
      className: "module-message-detail__contact"
    }, this.renderAvatar(contact), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__contact__text"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__contact__name"
    }, /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
      title: contact.title
    })), errors.map((error) => /* @__PURE__ */ import_react.default.createElement("div", {
      key: _keyForError(error),
      className: "module-message-detail__contact__error"
    }, error.message))), errorComponent, unidentifiedDeliveryComponent, contact.statusTimestamp && /* @__PURE__ */ import_react.default.createElement(import_Time.Time, {
      className: "module-message-detail__status-timestamp",
      timestamp: contact.statusTimestamp
    }, (0, import_timestamp.formatDateTimeLong)(i18n, contact.statusTimestamp)));
  }
  renderContactGroup(sendStatus, contacts) {
    const { i18n } = this.props;
    if (!contacts || !contacts.length) {
      return null;
    }
    const i18nKey = sendStatus === void 0 ? "from" : `MessageDetailsHeader--${sendStatus}`;
    const sortedContacts = [...contacts].sort((a, b) => contactSortCollator.compare(a.title, b.title));
    return /* @__PURE__ */ import_react.default.createElement("div", {
      key: i18nKey,
      className: "module-message-detail__contact-group"
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-message-detail__contact-group__header", sendStatus && `module-message-detail__contact-group__header--${sendStatus}`)
    }, i18n(i18nKey)), sortedContacts.map((contact) => this.renderContact(contact)));
  }
  renderContacts() {
    const { contacts } = this.props;
    const contactsBySendStatus = (0, import_mapUtil.groupBy)(contacts, (contact) => contact.status);
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__contact-container"
    }, [
      void 0,
      import_MessageSendState.SendStatus.Failed,
      import_MessageSendState.SendStatus.Viewed,
      import_MessageSendState.SendStatus.Read,
      import_MessageSendState.SendStatus.Delivered,
      import_MessageSendState.SendStatus.Sent,
      import_MessageSendState.SendStatus.Pending
    ].map((sendStatus) => this.renderContactGroup(sendStatus, contactsBySendStatus.get(sendStatus))));
  }
  render() {
    const {
      errors,
      message,
      receivedAt,
      sentAt,
      checkForAccount,
      clearSelectedMessage,
      contactNameColor,
      displayTapToViewMessage,
      doubleCheckMissingQuoteReference,
      getPreferredBadge,
      i18n,
      interactionMode,
      kickOffAttachmentDownload,
      markAttachmentAsCorrupted,
      markViewed,
      openConversation,
      openGiftBadge,
      openLink,
      reactToMessage,
      renderAudioAttachment,
      renderEmojiPicker,
      renderReactionPicker,
      replyToMessage,
      retryDeleteForEveryone,
      retrySend,
      showContactDetail,
      showContactModal,
      showExpiredIncomingTapToViewToast,
      showExpiredOutgoingTapToViewToast,
      showForwardMessageModal,
      showVisualAttachment,
      startConversation,
      theme
    } = this.props;
    return /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail",
      tabIndex: 0,
      ref: this.focusRef
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-message-detail__message-container",
      ref: this.messageContainerRef
    }, /* @__PURE__ */ import_react.default.createElement(import_Message.Message, {
      ...message,
      renderingContext: "conversation/MessageDetail",
      checkForAccount,
      clearSelectedMessage,
      contactNameColor,
      containerElementRef: this.messageContainerRef,
      containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
      deleteMessage: () => log.warn("MessageDetail: deleteMessage called!"),
      deleteMessageForEveryone: () => log.warn("MessageDetail: deleteMessageForEveryone called!"),
      disableMenu: true,
      disableScroll: true,
      displayLimit: Number.MAX_SAFE_INTEGER,
      displayTapToViewMessage,
      downloadAttachment: () => log.warn("MessageDetail: deleteMessageForEveryone called!"),
      doubleCheckMissingQuoteReference,
      getPreferredBadge,
      i18n,
      interactionMode,
      kickOffAttachmentDownload,
      markAttachmentAsCorrupted,
      markViewed,
      messageExpanded: import_lodash.noop,
      openConversation,
      openGiftBadge,
      openLink,
      reactToMessage,
      renderAudioAttachment,
      renderEmojiPicker,
      renderReactionPicker,
      replyToMessage,
      retryDeleteForEveryone,
      retrySend,
      shouldCollapseAbove: false,
      shouldCollapseBelow: false,
      shouldHideMetadata: false,
      showForwardMessageModal,
      scrollToQuotedMessage: () => {
        log.warn("MessageDetail: scrollToQuotedMessage called!");
      },
      showContactDetail,
      showContactModal,
      showExpiredIncomingTapToViewToast,
      showExpiredOutgoingTapToViewToast,
      showMessageDetail: () => {
        log.warn("MessageDetail: deleteMessageForEveryone called!");
      },
      showVisualAttachment,
      startConversation,
      theme
    })), /* @__PURE__ */ import_react.default.createElement("table", {
      className: "module-message-detail__info"
    }, /* @__PURE__ */ import_react.default.createElement("tbody", null, (errors || []).map((error) => /* @__PURE__ */ import_react.default.createElement("tr", {
      key: _keyForError(error)
    }, /* @__PURE__ */ import_react.default.createElement("td", {
      className: "module-message-detail__label"
    }, i18n("error")), /* @__PURE__ */ import_react.default.createElement("td", null, " ", /* @__PURE__ */ import_react.default.createElement("span", {
      className: "error-message"
    }, error.message), " "))), /* @__PURE__ */ import_react.default.createElement("tr", null, /* @__PURE__ */ import_react.default.createElement("td", {
      className: "module-message-detail__label"
    }, i18n("sent")), /* @__PURE__ */ import_react.default.createElement("td", null, /* @__PURE__ */ import_react.default.createElement(import_Time.Time, {
      timestamp: sentAt
    }, (0, import_timestamp.formatDateTimeLong)(i18n, sentAt)), " ", /* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-message-detail__unix-timestamp"
    }, "(", sentAt, ")"))), receivedAt && message.direction === "incoming" ? /* @__PURE__ */ import_react.default.createElement("tr", null, /* @__PURE__ */ import_react.default.createElement("td", {
      className: "module-message-detail__label"
    }, i18n("received")), /* @__PURE__ */ import_react.default.createElement("td", null, /* @__PURE__ */ import_react.default.createElement(import_Time.Time, {
      timestamp: receivedAt
    }, (0, import_timestamp.formatDateTimeLong)(i18n, receivedAt)), " ", /* @__PURE__ */ import_react.default.createElement("span", {
      className: "module-message-detail__unix-timestamp"
    }, "(", receivedAt, ")"))) : null)), this.renderContacts());
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageDetail
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZURldGFpbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Q2hpbGQsIFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBBdmF0YXIsIEF2YXRhclNpemUgfSBmcm9tICcuLi9BdmF0YXInO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuL0NvbnRhY3ROYW1lJztcbmltcG9ydCB7IFRpbWUgfSBmcm9tICcuLi9UaW1lJztcbmltcG9ydCB0eXBlIHtcbiAgUHJvcHMgYXMgTWVzc2FnZVByb3BzVHlwZSxcbiAgUHJvcHNEYXRhIGFzIE1lc3NhZ2VQcm9wc0RhdGFUeXBlLFxufSBmcm9tICcuL01lc3NhZ2UnO1xuaW1wb3J0IHsgTWVzc2FnZSB9IGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUsIFRoZW1lVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBncm91cEJ5IH0gZnJvbSAnLi4vLi4vdXRpbC9tYXBVdGlsJztcbmltcG9ydCB0eXBlIHsgQ29udGFjdE5hbWVDb2xvclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgU2VuZFN0YXR1cyB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vX3V0aWwnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGZvcm1hdERhdGVUaW1lTG9uZyB9IGZyb20gJy4uLy4uL3V0aWwvdGltZXN0YW1wJztcblxuZXhwb3J0IHR5cGUgQ29udGFjdCA9IFBpY2s8XG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIHwgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnXG4gIHwgJ2F2YXRhclBhdGgnXG4gIHwgJ2JhZGdlcydcbiAgfCAnY29sb3InXG4gIHwgJ2lkJ1xuICB8ICdpc01lJ1xuICB8ICduYW1lJ1xuICB8ICdwaG9uZU51bWJlcidcbiAgfCAncHJvZmlsZU5hbWUnXG4gIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gIHwgJ3RpdGxlJ1xuICB8ICd1bmJsdXJyZWRBdmF0YXJQYXRoJ1xuPiAmIHtcbiAgc3RhdHVzPzogU2VuZFN0YXR1cztcbiAgc3RhdHVzVGltZXN0YW1wPzogbnVtYmVyO1xuXG4gIGlzT3V0Z29pbmdLZXlFcnJvcjogYm9vbGVhbjtcbiAgaXNVbmlkZW50aWZpZWREZWxpdmVyeTogYm9vbGVhbjtcblxuICBlcnJvcnM/OiBBcnJheTxFcnJvcj47XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc0RhdGEgPSB7XG4gIC8vIEFuIHVuZGVmaW5lZCBzdGF0dXMgbWVhbnMgdGhleSB3ZXJlIHRoZSBzZW5kZXIgYW5kIGl0J3MgYW4gaW5jb21pbmcgbWVzc2FnZS4gSWZcbiAgLy8gICBgdW5kZWZpbmVkYCBpcyBhIHN0YXR1cywgdGhlcmUgc2hvdWxkIGJlIG5vIG90aGVyIGl0ZW1zIGluIHRoZSBhcnJheTsgaWYgdGhlcmUgYXJlXG4gIC8vICAgYW55IGRlZmluZWQgc3RhdHVzZXMsIGB1bmRlZmluZWRgIHNob3VsZG4ndCBiZSBwcmVzZW50LlxuICBjb250YWN0czogUmVhZG9ubHlBcnJheTxDb250YWN0PjtcblxuICBjb250YWN0TmFtZUNvbG9yPzogQ29udGFjdE5hbWVDb2xvclR5cGU7XG4gIGVycm9yczogQXJyYXk8RXJyb3I+O1xuICBtZXNzYWdlOiBPbWl0PE1lc3NhZ2VQcm9wc0RhdGFUeXBlLCAncmVuZGVyaW5nQ29udGV4dCc+O1xuICByZWNlaXZlZEF0OiBudW1iZXI7XG4gIHNlbnRBdDogbnVtYmVyO1xuXG4gIHNob3dTYWZldHlOdW1iZXI6IChjb250YWN0SWQ6IHN0cmluZykgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlO1xufSAmIFBpY2s8TWVzc2FnZVByb3BzVHlwZSwgJ2dldFByZWZlcnJlZEJhZGdlJyB8ICdpbnRlcmFjdGlvbk1vZGUnPjtcblxuZXhwb3J0IHR5cGUgUHJvcHNCYWNrYm9uZUFjdGlvbnMgPSBQaWNrPFxuICBNZXNzYWdlUHJvcHNUeXBlLFxuICB8ICdkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZSdcbiAgfCAna2lja09mZkF0dGFjaG1lbnREb3dubG9hZCdcbiAgfCAnbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZCdcbiAgfCAnbWFya1ZpZXdlZCdcbiAgfCAnb3BlbkNvbnZlcnNhdGlvbidcbiAgfCAnb3BlbkdpZnRCYWRnZSdcbiAgfCAnb3BlbkxpbmsnXG4gIHwgJ3JlYWN0VG9NZXNzYWdlJ1xuICB8ICdyZW5kZXJBdWRpb0F0dGFjaG1lbnQnXG4gIHwgJ3JlbmRlckVtb2ppUGlja2VyJ1xuICB8ICdyZW5kZXJSZWFjdGlvblBpY2tlcidcbiAgfCAncmVwbHlUb01lc3NhZ2UnXG4gIHwgJ3JldHJ5RGVsZXRlRm9yRXZlcnlvbmUnXG4gIHwgJ3JldHJ5U2VuZCdcbiAgfCAnc2hvd0NvbnRhY3REZXRhaWwnXG4gIHwgJ3Nob3dDb250YWN0TW9kYWwnXG4gIHwgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgfCAnc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0J1xuICB8ICdzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCdcbiAgfCAnc2hvd1Zpc3VhbEF0dGFjaG1lbnQnXG4gIHwgJ3N0YXJ0Q29udmVyc2F0aW9uJ1xuPjtcblxuZXhwb3J0IHR5cGUgUHJvcHNSZWR1eEFjdGlvbnMgPSBQaWNrPFxuICBNZXNzYWdlUHJvcHNUeXBlLFxuICB8ICdjbGVhclNlbGVjdGVkTWVzc2FnZSdcbiAgfCAnZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnXG4gIHwgJ2NoZWNrRm9yQWNjb3VudCdcbj47XG5cbmV4cG9ydCB0eXBlIEV4dGVybmFsUHJvcHMgPSBQcm9wc0RhdGEgJiBQcm9wc0JhY2tib25lQWN0aW9ucztcbmV4cG9ydCB0eXBlIFByb3BzID0gUHJvcHNEYXRhICYgUHJvcHNCYWNrYm9uZUFjdGlvbnMgJiBQcm9wc1JlZHV4QWN0aW9ucztcblxuY29uc3QgY29udGFjdFNvcnRDb2xsYXRvciA9IG5ldyBJbnRsLkNvbGxhdG9yKCk7XG5cbmNvbnN0IF9rZXlGb3JFcnJvciA9IChlcnJvcjogRXJyb3IpOiBzdHJpbmcgPT4ge1xuICByZXR1cm4gYCR7ZXJyb3IubmFtZX0tJHtlcnJvci5tZXNzYWdlfWA7XG59O1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZURldGFpbCBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxQcm9wcz4ge1xuICBwcml2YXRlIHJlYWRvbmx5IGZvY3VzUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VDb250YWluZXJSZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG5cbiAgcHVibGljIG92ZXJyaWRlIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgIC8vIFdoZW4gdGhpcyBjb21wb25lbnQgaXMgY3JlYXRlZCwgaXQncyBpbml0aWFsbHkgbm90IHBhcnQgb2YgdGhlIERPTSwgYW5kIHRoZW4gaXQnc1xuICAgIC8vICAgYWRkZWQgb2ZmLXNjcmVlbiBhbmQgYW5pbWF0ZWQgaW4uIFRoaXMgZW5zdXJlcyB0aGF0IHRoZSBmb2N1cyB0YWtlcy5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGlmICh0aGlzLmZvY3VzUmVmLmN1cnJlbnQpIHtcbiAgICAgICAgdGhpcy5mb2N1c1JlZi5jdXJyZW50LmZvY3VzKCk7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyQXZhdGFyKGNvbnRhY3Q6IENvbnRhY3QpOiBKU1guRWxlbWVudCB7XG4gICAgY29uc3QgeyBnZXRQcmVmZXJyZWRCYWRnZSwgaTE4biwgdGhlbWUgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICAgIGF2YXRhclBhdGgsXG4gICAgICBiYWRnZXMsXG4gICAgICBjb2xvcixcbiAgICAgIGlzTWUsXG4gICAgICBuYW1lLFxuICAgICAgcGhvbmVOdW1iZXIsXG4gICAgICBwcm9maWxlTmFtZSxcbiAgICAgIHNoYXJlZEdyb3VwTmFtZXMsXG4gICAgICB0aXRsZSxcbiAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGgsXG4gICAgfSA9IGNvbnRhY3Q7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEF2YXRhclxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2UoYmFkZ2VzKX1cbiAgICAgICAgY29sb3I9e2NvbG9yfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17aXNNZX1cbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgcGhvbmVOdW1iZXI9e3Bob25lTnVtYmVyfVxuICAgICAgICBwcm9maWxlTmFtZT17cHJvZmlsZU5hbWV9XG4gICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgdGl0bGU9e3RpdGxlfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICBzaXplPXtBdmF0YXJTaXplLlRISVJUWV9TSVh9XG4gICAgICAgIHVuYmx1cnJlZEF2YXRhclBhdGg9e3VuYmx1cnJlZEF2YXRhclBhdGh9XG4gICAgICAvPlxuICAgICk7XG4gIH1cblxuICBwdWJsaWMgcmVuZGVyQ29udGFjdChjb250YWN0OiBDb250YWN0KTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHsgaTE4biwgc2hvd1NhZmV0eU51bWJlciB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCBlcnJvcnMgPSBjb250YWN0LmVycm9ycyB8fCBbXTtcblxuICAgIGNvbnN0IGVycm9yQ29tcG9uZW50ID0gY29udGFjdC5pc091dGdvaW5nS2V5RXJyb3IgPyAoXG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLWRldGFpbF9fY29udGFjdF9fZXJyb3ItYnV0dG9uc1wiPlxuICAgICAgICA8YnV0dG9uXG4gICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19jb250YWN0X19zaG93LXNhZmV0eS1udW1iZXJcIlxuICAgICAgICAgIG9uQ2xpY2s9eygpID0+IHNob3dTYWZldHlOdW1iZXIoY29udGFjdC5pZCl9XG4gICAgICAgID5cbiAgICAgICAgICB7aTE4bignc2hvd1NhZmV0eU51bWJlcicpfVxuICAgICAgICA8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgICkgOiBudWxsO1xuICAgIGNvbnN0IHVuaWRlbnRpZmllZERlbGl2ZXJ5Q29tcG9uZW50ID0gY29udGFjdC5pc1VuaWRlbnRpZmllZERlbGl2ZXJ5ID8gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX2NvbnRhY3RfX3VuaWRlbnRpZmllZC1kZWxpdmVyeS1pY29uXCIgLz5cbiAgICApIDogbnVsbDtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGtleT17Y29udGFjdC5pZH0gY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19jb250YWN0XCI+XG4gICAgICAgIHt0aGlzLnJlbmRlckF2YXRhcihjb250YWN0KX1cbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX2NvbnRhY3RfX3RleHRcIj5cbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLWRldGFpbF9fY29udGFjdF9fbmFtZVwiPlxuICAgICAgICAgICAgPENvbnRhY3ROYW1lIHRpdGxlPXtjb250YWN0LnRpdGxlfSAvPlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIHtlcnJvcnMubWFwKGVycm9yID0+IChcbiAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAga2V5PXtfa2V5Rm9yRXJyb3IoZXJyb3IpfVxuICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX2NvbnRhY3RfX2Vycm9yXCJcbiAgICAgICAgICAgID5cbiAgICAgICAgICAgICAge2Vycm9yLm1lc3NhZ2V9XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApKX1cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIHtlcnJvckNvbXBvbmVudH1cbiAgICAgICAge3VuaWRlbnRpZmllZERlbGl2ZXJ5Q29tcG9uZW50fVxuICAgICAgICB7Y29udGFjdC5zdGF0dXNUaW1lc3RhbXAgJiYgKFxuICAgICAgICAgIDxUaW1lXG4gICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX3N0YXR1cy10aW1lc3RhbXBcIlxuICAgICAgICAgICAgdGltZXN0YW1wPXtjb250YWN0LnN0YXR1c1RpbWVzdGFtcH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7Zm9ybWF0RGF0ZVRpbWVMb25nKGkxOG4sIGNvbnRhY3Quc3RhdHVzVGltZXN0YW1wKX1cbiAgICAgICAgICA8L1RpbWU+XG4gICAgICAgICl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJDb250YWN0R3JvdXAoXG4gICAgc2VuZFN0YXR1czogdW5kZWZpbmVkIHwgU2VuZFN0YXR1cyxcbiAgICBjb250YWN0czogdW5kZWZpbmVkIHwgUmVhZG9ubHlBcnJheTxDb250YWN0PlxuICApOiBSZWFjdE5vZGUge1xuICAgIGNvbnN0IHsgaTE4biB9ID0gdGhpcy5wcm9wcztcbiAgICBpZiAoIWNvbnRhY3RzIHx8ICFjb250YWN0cy5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGkxOG5LZXkgPVxuICAgICAgc2VuZFN0YXR1cyA9PT0gdW5kZWZpbmVkID8gJ2Zyb20nIDogYE1lc3NhZ2VEZXRhaWxzSGVhZGVyLS0ke3NlbmRTdGF0dXN9YDtcblxuICAgIGNvbnN0IHNvcnRlZENvbnRhY3RzID0gWy4uLmNvbnRhY3RzXS5zb3J0KChhLCBiKSA9PlxuICAgICAgY29udGFjdFNvcnRDb2xsYXRvci5jb21wYXJlKGEudGl0bGUsIGIudGl0bGUpXG4gICAgKTtcblxuICAgIHJldHVybiAoXG4gICAgICA8ZGl2IGtleT17aTE4bktleX0gY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19jb250YWN0LWdyb3VwXCI+XG4gICAgICAgIDxkaXZcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAnbW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19jb250YWN0LWdyb3VwX19oZWFkZXInLFxuICAgICAgICAgICAgc2VuZFN0YXR1cyAmJlxuICAgICAgICAgICAgICBgbW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19jb250YWN0LWdyb3VwX19oZWFkZXItLSR7c2VuZFN0YXR1c31gXG4gICAgICAgICAgKX1cbiAgICAgICAgPlxuICAgICAgICAgIHtpMThuKGkxOG5LZXkpfVxuICAgICAgICA8L2Rpdj5cbiAgICAgICAge3NvcnRlZENvbnRhY3RzLm1hcChjb250YWN0ID0+IHRoaXMucmVuZGVyQ29udGFjdChjb250YWN0KSl9XG4gICAgICA8L2Rpdj5cbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSByZW5kZXJDb250YWN0cygpOiBSZWFjdENoaWxkIHtcbiAgICAvLyBUaGlzIGFzc3VtZXMgdGhhdCB0aGUgbGlzdCBlaXRoZXIgY29udGFpbnMgb25lIHNlbmRlciAoYSBzdGF0dXMgb2YgYHVuZGVmaW5lZGApIG9yXG4gICAgLy8gICAxKyBjb250YWN0cyB3aXRoIGBTZW5kU3RhdHVzYGVzLCBidXQgaXQgZG9lc24ndCBjaGVjayB0aGF0IGFzc3VtcHRpb24uXG4gICAgY29uc3QgeyBjb250YWN0cyB9ID0gdGhpcy5wcm9wcztcblxuICAgIGNvbnN0IGNvbnRhY3RzQnlTZW5kU3RhdHVzID0gZ3JvdXBCeShjb250YWN0cywgY29udGFjdCA9PiBjb250YWN0LnN0YXR1cyk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX2NvbnRhY3QtY29udGFpbmVyXCI+XG4gICAgICAgIHtbXG4gICAgICAgICAgdW5kZWZpbmVkLFxuICAgICAgICAgIFNlbmRTdGF0dXMuRmFpbGVkLFxuICAgICAgICAgIFNlbmRTdGF0dXMuVmlld2VkLFxuICAgICAgICAgIFNlbmRTdGF0dXMuUmVhZCxcbiAgICAgICAgICBTZW5kU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICBdLm1hcChzZW5kU3RhdHVzID0+XG4gICAgICAgICAgdGhpcy5yZW5kZXJDb250YWN0R3JvdXAoXG4gICAgICAgICAgICBzZW5kU3RhdHVzLFxuICAgICAgICAgICAgY29udGFjdHNCeVNlbmRTdGF0dXMuZ2V0KHNlbmRTdGF0dXMpXG4gICAgICAgICAgKVxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBvdmVycmlkZSByZW5kZXIoKTogSlNYLkVsZW1lbnQge1xuICAgIGNvbnN0IHtcbiAgICAgIGVycm9ycyxcbiAgICAgIG1lc3NhZ2UsXG4gICAgICByZWNlaXZlZEF0LFxuICAgICAgc2VudEF0LFxuXG4gICAgICBjaGVja0ZvckFjY291bnQsXG4gICAgICBjbGVhclNlbGVjdGVkTWVzc2FnZSxcbiAgICAgIGNvbnRhY3ROYW1lQ29sb3IsXG4gICAgICBkaXNwbGF5VGFwVG9WaWV3TWVzc2FnZSxcbiAgICAgIGRvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlLFxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICBpMThuLFxuICAgICAgaW50ZXJhY3Rpb25Nb2RlLFxuICAgICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCxcbiAgICAgIG1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQsXG4gICAgICBtYXJrVmlld2VkLFxuICAgICAgb3BlbkNvbnZlcnNhdGlvbixcbiAgICAgIG9wZW5HaWZ0QmFkZ2UsXG4gICAgICBvcGVuTGluayxcbiAgICAgIHJlYWN0VG9NZXNzYWdlLFxuICAgICAgcmVuZGVyQXVkaW9BdHRhY2htZW50LFxuICAgICAgcmVuZGVyRW1vamlQaWNrZXIsXG4gICAgICByZW5kZXJSZWFjdGlvblBpY2tlcixcbiAgICAgIHJlcGx5VG9NZXNzYWdlLFxuICAgICAgcmV0cnlEZWxldGVGb3JFdmVyeW9uZSxcbiAgICAgIHJldHJ5U2VuZCxcbiAgICAgIHNob3dDb250YWN0RGV0YWlsLFxuICAgICAgc2hvd0NvbnRhY3RNb2RhbCxcbiAgICAgIHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCxcbiAgICAgIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdCxcbiAgICAgIHNob3dGb3J3YXJkTWVzc2FnZU1vZGFsLFxuICAgICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQsXG4gICAgICBzdGFydENvbnZlcnNhdGlvbixcbiAgICAgIHRoZW1lLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgcmV0dXJuIChcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS10YWJpbmRleFxuICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxcIiB0YWJJbmRleD17MH0gcmVmPXt0aGlzLmZvY3VzUmVmfT5cbiAgICAgICAgPGRpdlxuICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLWRldGFpbF9fbWVzc2FnZS1jb250YWluZXJcIlxuICAgICAgICAgIHJlZj17dGhpcy5tZXNzYWdlQ29udGFpbmVyUmVmfVxuICAgICAgICA+XG4gICAgICAgICAgPE1lc3NhZ2VcbiAgICAgICAgICAgIHsuLi5tZXNzYWdlfVxuICAgICAgICAgICAgcmVuZGVyaW5nQ29udGV4dD1cImNvbnZlcnNhdGlvbi9NZXNzYWdlRGV0YWlsXCJcbiAgICAgICAgICAgIGNoZWNrRm9yQWNjb3VudD17Y2hlY2tGb3JBY2NvdW50fVxuICAgICAgICAgICAgY2xlYXJTZWxlY3RlZE1lc3NhZ2U9e2NsZWFyU2VsZWN0ZWRNZXNzYWdlfVxuICAgICAgICAgICAgY29udGFjdE5hbWVDb2xvcj17Y29udGFjdE5hbWVDb2xvcn1cbiAgICAgICAgICAgIGNvbnRhaW5lckVsZW1lbnRSZWY9e3RoaXMubWVzc2FnZUNvbnRhaW5lclJlZn1cbiAgICAgICAgICAgIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludD17V2lkdGhCcmVha3BvaW50LldpZGV9XG4gICAgICAgICAgICBkZWxldGVNZXNzYWdlPXsoKSA9PlxuICAgICAgICAgICAgICBsb2cud2FybignTWVzc2FnZURldGFpbDogZGVsZXRlTWVzc2FnZSBjYWxsZWQhJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZT17KCkgPT5cbiAgICAgICAgICAgICAgbG9nLndhcm4oJ01lc3NhZ2VEZXRhaWw6IGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZSBjYWxsZWQhJylcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRpc2FibGVNZW51XG4gICAgICAgICAgICBkaXNhYmxlU2Nyb2xsXG4gICAgICAgICAgICBkaXNwbGF5TGltaXQ9e051bWJlci5NQVhfU0FGRV9JTlRFR0VSfVxuICAgICAgICAgICAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U9e2Rpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlfVxuICAgICAgICAgICAgZG93bmxvYWRBdHRhY2htZW50PXsoKSA9PlxuICAgICAgICAgICAgICBsb2cud2FybignTWVzc2FnZURldGFpbDogZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lIGNhbGxlZCEnKVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U9e2RvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlfVxuICAgICAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGludGVyYWN0aW9uTW9kZT17aW50ZXJhY3Rpb25Nb2RlfVxuICAgICAgICAgICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZD17a2lja09mZkF0dGFjaG1lbnREb3dubG9hZH1cbiAgICAgICAgICAgIG1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQ9e21hcmtBdHRhY2htZW50QXNDb3JydXB0ZWR9XG4gICAgICAgICAgICBtYXJrVmlld2VkPXttYXJrVmlld2VkfVxuICAgICAgICAgICAgbWVzc2FnZUV4cGFuZGVkPXtub29wfVxuICAgICAgICAgICAgb3BlbkNvbnZlcnNhdGlvbj17b3BlbkNvbnZlcnNhdGlvbn1cbiAgICAgICAgICAgIG9wZW5HaWZ0QmFkZ2U9e29wZW5HaWZ0QmFkZ2V9XG4gICAgICAgICAgICBvcGVuTGluaz17b3Blbkxpbmt9XG4gICAgICAgICAgICByZWFjdFRvTWVzc2FnZT17cmVhY3RUb01lc3NhZ2V9XG4gICAgICAgICAgICByZW5kZXJBdWRpb0F0dGFjaG1lbnQ9e3JlbmRlckF1ZGlvQXR0YWNobWVudH1cbiAgICAgICAgICAgIHJlbmRlckVtb2ppUGlja2VyPXtyZW5kZXJFbW9qaVBpY2tlcn1cbiAgICAgICAgICAgIHJlbmRlclJlYWN0aW9uUGlja2VyPXtyZW5kZXJSZWFjdGlvblBpY2tlcn1cbiAgICAgICAgICAgIHJlcGx5VG9NZXNzYWdlPXtyZXBseVRvTWVzc2FnZX1cbiAgICAgICAgICAgIHJldHJ5RGVsZXRlRm9yRXZlcnlvbmU9e3JldHJ5RGVsZXRlRm9yRXZlcnlvbmV9XG4gICAgICAgICAgICByZXRyeVNlbmQ9e3JldHJ5U2VuZH1cbiAgICAgICAgICAgIHNob3VsZENvbGxhcHNlQWJvdmU9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvdWxkQ29sbGFwc2VCZWxvdz17ZmFsc2V9XG4gICAgICAgICAgICBzaG91bGRIaWRlTWV0YWRhdGE9e2ZhbHNlfVxuICAgICAgICAgICAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWw9e3Nob3dGb3J3YXJkTWVzc2FnZU1vZGFsfVxuICAgICAgICAgICAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlPXsoKSA9PiB7XG4gICAgICAgICAgICAgIGxvZy53YXJuKCdNZXNzYWdlRGV0YWlsOiBzY3JvbGxUb1F1b3RlZE1lc3NhZ2UgY2FsbGVkIScpO1xuICAgICAgICAgICAgfX1cbiAgICAgICAgICAgIHNob3dDb250YWN0RGV0YWlsPXtzaG93Q29udGFjdERldGFpbH1cbiAgICAgICAgICAgIHNob3dDb250YWN0TW9kYWw9e3Nob3dDb250YWN0TW9kYWx9XG4gICAgICAgICAgICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3Q9e1xuICAgICAgICAgICAgICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3RcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdD17XG4gICAgICAgICAgICAgIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdFxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc2hvd01lc3NhZ2VEZXRhaWw9eygpID0+IHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oJ01lc3NhZ2VEZXRhaWw6IGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZSBjYWxsZWQhJyk7XG4gICAgICAgICAgICB9fVxuICAgICAgICAgICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQ9e3Nob3dWaXN1YWxBdHRhY2htZW50fVxuICAgICAgICAgICAgc3RhcnRDb252ZXJzYXRpb249e3N0YXJ0Q29udmVyc2F0aW9ufVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8dGFibGUgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19pbmZvXCI+XG4gICAgICAgICAgPHRib2R5PlxuICAgICAgICAgICAgeyhlcnJvcnMgfHwgW10pLm1hcChlcnJvciA9PiAoXG4gICAgICAgICAgICAgIDx0ciBrZXk9e19rZXlGb3JFcnJvcihlcnJvcil9PlxuICAgICAgICAgICAgICAgIDx0ZCBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX2xhYmVsXCI+XG4gICAgICAgICAgICAgICAgICB7aTE4bignZXJyb3InKX1cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIHsnICd9XG4gICAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJlcnJvci1tZXNzYWdlXCI+e2Vycm9yLm1lc3NhZ2V9PC9zcGFuPnsnICd9XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgICkpfVxuICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICA8dGQgY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX19sYWJlbFwiPntpMThuKCdzZW50Jyl9PC90ZD5cbiAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgIDxUaW1lIHRpbWVzdGFtcD17c2VudEF0fT5cbiAgICAgICAgICAgICAgICAgIHtmb3JtYXREYXRlVGltZUxvbmcoaTE4biwgc2VudEF0KX1cbiAgICAgICAgICAgICAgICA8L1RpbWU+eycgJ31cbiAgICAgICAgICAgICAgICA8c3BhbiBjbGFzc05hbWU9XCJtb2R1bGUtbWVzc2FnZS1kZXRhaWxfX3VuaXgtdGltZXN0YW1wXCI+XG4gICAgICAgICAgICAgICAgICAoe3NlbnRBdH0pXG4gICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIHtyZWNlaXZlZEF0ICYmIG1lc3NhZ2UuZGlyZWN0aW9uID09PSAnaW5jb21pbmcnID8gKFxuICAgICAgICAgICAgICA8dHI+XG4gICAgICAgICAgICAgICAgPHRkIGNsYXNzTmFtZT1cIm1vZHVsZS1tZXNzYWdlLWRldGFpbF9fbGFiZWxcIj5cbiAgICAgICAgICAgICAgICAgIHtpMThuKCdyZWNlaXZlZCcpfVxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPFRpbWUgdGltZXN0YW1wPXtyZWNlaXZlZEF0fT5cbiAgICAgICAgICAgICAgICAgICAge2Zvcm1hdERhdGVUaW1lTG9uZyhpMThuLCByZWNlaXZlZEF0KX1cbiAgICAgICAgICAgICAgICAgIDwvVGltZT57JyAnfVxuICAgICAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLW1lc3NhZ2UtZGV0YWlsX191bml4LXRpbWVzdGFtcFwiPlxuICAgICAgICAgICAgICAgICAgICAoe3JlY2VpdmVkQXR9KVxuICAgICAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICAgIDwvdHI+XG4gICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICA8L3Rib2R5PlxuICAgICAgICA8L3RhYmxlPlxuICAgICAgICB7dGhpcy5yZW5kZXJDb250YWN0cygpfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix3QkFBdUI7QUFDdkIsb0JBQXFCO0FBRXJCLG9CQUFtQztBQUNuQyx5QkFBNEI7QUFDNUIsa0JBQXFCO0FBS3JCLHFCQUF3QjtBQUl4QixxQkFBd0I7QUFFeEIsOEJBQTJCO0FBQzNCLGtCQUFnQztBQUNoQyxVQUFxQjtBQUNyQix1QkFBbUM7QUErRW5DLE1BQU0sc0JBQXNCLElBQUksS0FBSyxTQUFTO0FBRTlDLE1BQU0sZUFBZSx3QkFBQyxVQUF5QjtBQUM3QyxTQUFPLEdBQUcsTUFBTSxRQUFRLE1BQU07QUFDaEMsR0FGcUI7QUFJZCxNQUFNLHNCQUFzQixxQkFBTSxVQUFpQjtBQUFBLEVBQW5EO0FBQUE7QUFDWSxvQkFBVyxxQkFBTSxVQUEwQjtBQUMzQywrQkFBc0IscUJBQU0sVUFBMEI7QUFBQTtBQUFBLEVBRXZELG9CQUEwQjtBQUd4QyxlQUFXLE1BQU07QUFDZixVQUFJLEtBQUssU0FBUyxTQUFTO0FBQ3pCLGFBQUssU0FBUyxRQUFRLE1BQU07QUFBQSxNQUM5QjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVPLGFB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QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsaUJBQWlCO0FBQUEsTUFDakI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLHFCQUFxQjtBQUFBLE1BQ3JCLHFCQUFxQjtBQUFBLE1BQ3JCLG9CQUFvQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQSx1QkFBdUIsTUFBTTtBQUMzQixZQUFJLEtBQUssOENBQThDO0FBQUEsTUFDekQ7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUdBO0FBQUEsTUFHQSxtQkFBbUIsTUFBTTtBQUN2QixZQUFJLEtBQUssaURBQWlEO0FBQUEsTUFDNUQ7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxLQUNGLENBQ0YsR0FDQSxtREFBQztBQUFBLE1BQU0sV0FBVTtBQUFBLE9BQ2YsbURBQUMsZUFDRyxXQUFVLENBQUMsR0FBRyxJQUFJLFdBQ2xCLG1EQUFDO0FBQUEsTUFBRyxLQUFLLGFBQWEsS0FBSztBQUFBLE9BQ3pCLG1EQUFDO0FBQUEsTUFBRyxXQUFVO0FBQUEsT0FDWCxLQUFLLE9BQU8sQ0FDZixHQUNBLG1EQUFDLFlBQ0UsS0FDRCxtREFBQztBQUFBLE1BQUssV0FBVTtBQUFBLE9BQWlCLE1BQU0sT0FBUSxHQUFRLEdBQ3pELENBQ0YsQ0FDRCxHQUNELG1EQUFDLFlBQ0MsbURBQUM7QUFBQSxNQUFHLFdBQVU7QUFBQSxPQUFnQyxLQUFLLE1BQU0sQ0FBRSxHQUMzRCxtREFBQyxZQUNDLG1EQUFDO0FBQUEsTUFBSyxXQUFXO0FBQUEsT0FDZCx5Q0FBbUIsTUFBTSxNQUFNLENBQ2xDLEdBQVEsS0FDUixtREFBQztBQUFBLE1BQUssV0FBVTtBQUFBLE9BQXdDLEtBQ3BELFFBQU8sR0FDWCxDQUNGLENBQ0YsR0FDQyxjQUFjLFFBQVEsY0FBYyxhQUNuQyxtREFBQyxZQUNDLG1EQUFDO0FBQUEsTUFBRyxXQUFVO0FBQUEsT0FDWCxLQUFLLFVBQVUsQ0FDbEIsR0FDQSxtREFBQyxZQUNDLG1EQUFDO0FBQUEsTUFBSyxXQUFXO0FBQUEsT0FDZCx5Q0FBbUIsTUFBTSxVQUFVLENBQ3RDLEdBQVEsS0FDUixtREFBQztBQUFBLE1BQUssV0FBVTtBQUFBLE9BQXdDLEtBQ3BELFlBQVcsR0FDZixDQUNGLENBQ0YsSUFDRSxJQUNOLENBQ0YsR0FDQyxLQUFLLGVBQWUsQ0FDdkI7QUFBQSxFQUVKO0FBQ0Y7QUF2VE8iLAogICJuYW1lcyI6IFtdCn0K
