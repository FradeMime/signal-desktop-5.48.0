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
var ConversationListItem_exports = {};
__export(ConversationListItem_exports, {
  ConversationListItem: () => ConversationListItem,
  MessageStatuses: () => MessageStatuses
});
module.exports = __toCommonJS(ConversationListItem_exports);
var import_react = __toESM(require("react"));
var import_classnames = __toESM(require("classnames"));
var import_BaseConversationListItem = require("./BaseConversationListItem");
var import_MessageBody = require("../conversation/MessageBody");
var import_ContactName = require("../conversation/ContactName");
var import_TypingAnimation = require("../conversation/TypingAnimation");
const MESSAGE_STATUS_ICON_CLASS_NAME = `${import_BaseConversationListItem.MESSAGE_TEXT_CLASS_NAME}__status-icon`;
const MessageStatuses = [
  "sending",
  "sent",
  "delivered",
  "read",
  "paused",
  "error",
  "partial-sent"
];
const ConversationListItem = import_react.default.memo(/* @__PURE__ */ __name(function ConversationListItem2({
  acceptedMessageRequest,
  avatarPath,
  badge,
  color,
  draftPreview,
  i18n,
  id,
  isMe,
  isSelected,
  lastMessage,
  lastUpdated,
  markedUnread,
  muteExpiresAt,
  name,
  onClick,
  phoneNumber,
  profileName,
  sharedGroupNames,
  shouldShowDraft,
  theme,
  title,
  type,
  typingContactId,
  unblurredAvatarPath,
  unreadCount
}) {
  const isMuted = Boolean(muteExpiresAt && Date.now() < muteExpiresAt);
  const headerName = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, isMe ? /* @__PURE__ */ import_react.default.createElement("span", {
    className: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME
  }, i18n("noteToSelf")) : /* @__PURE__ */ import_react.default.createElement(import_ContactName.ContactName, {
    module: import_BaseConversationListItem.HEADER_CONTACT_NAME_CLASS_NAME,
    title
  }), isMuted && /* @__PURE__ */ import_react.default.createElement("div", {
    className: `${import_BaseConversationListItem.HEADER_NAME_CLASS_NAME}__mute-icon`
  }));
  let messageText = null;
  let messageStatusIcon = null;
  if (!acceptedMessageRequest) {
    messageText = /* @__PURE__ */ import_react.default.createElement("span", {
      className: `${import_BaseConversationListItem.MESSAGE_TEXT_CLASS_NAME}__message-request`
    }, i18n("ConversationListItem--message-request"));
  } else if (typingContactId) {
    messageText = /* @__PURE__ */ import_react.default.createElement(import_TypingAnimation.TypingAnimation, {
      i18n
    });
  } else if (shouldShowDraft && draftPreview) {
    messageText = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("span", {
      className: `${import_BaseConversationListItem.MESSAGE_TEXT_CLASS_NAME}__draft-prefix`
    }, i18n("ConversationListItem--draft-prefix")), /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
      text: truncateMessageText(draftPreview),
      disableJumbomoji: true,
      disableLinks: true,
      i18n
    }));
  } else if (lastMessage?.deletedForEveryone) {
    messageText = /* @__PURE__ */ import_react.default.createElement("span", {
      className: `${import_BaseConversationListItem.MESSAGE_TEXT_CLASS_NAME}__deleted-for-everyone`
    }, i18n("message--deletedForEveryone"));
  } else if (lastMessage) {
    messageText = /* @__PURE__ */ import_react.default.createElement(import_MessageBody.MessageBody, {
      text: truncateMessageText(lastMessage.text),
      disableJumbomoji: true,
      disableLinks: true,
      i18n
    });
    if (lastMessage.status) {
      messageStatusIcon = /* @__PURE__ */ import_react.default.createElement("div", {
        className: (0, import_classnames.default)(MESSAGE_STATUS_ICON_CLASS_NAME, `${MESSAGE_STATUS_ICON_CLASS_NAME}--${lastMessage.status}`)
      });
    }
  }
  const onClickItem = (0, import_react.useCallback)(() => onClick(id), [onClick, id]);
  return /* @__PURE__ */ import_react.default.createElement(import_BaseConversationListItem.BaseConversationListItem, {
    acceptedMessageRequest,
    avatarPath,
    badge,
    color,
    conversationType: type,
    headerDate: lastUpdated,
    headerName,
    i18n,
    id,
    isMe,
    isSelected: Boolean(isSelected),
    markedUnread,
    messageStatusIcon,
    messageText,
    messageTextIsAlwaysFullSize: true,
    name,
    onClick: onClickItem,
    phoneNumber,
    profileName,
    sharedGroupNames,
    theme,
    title,
    unreadCount,
    unblurredAvatarPath
  });
}, "ConversationListItem"));
function truncateMessageText(text) {
  if (typeof text !== "string") {
    return "";
  }
  return text.replace(/(?:\r?\n)+/g, " ");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationListItem,
  MessageStatuses
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTGlzdEl0ZW0udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBGdW5jdGlvbkNvbXBvbmVudCwgUmVhY3ROb2RlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0LCB7IHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5cbmltcG9ydCB7XG4gIEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbSxcbiAgSEVBREVSX05BTUVfQ0xBU1NfTkFNRSxcbiAgSEVBREVSX0NPTlRBQ1RfTkFNRV9DTEFTU19OQU1FLFxuICBNRVNTQUdFX1RFWFRfQ0xBU1NfTkFNRSxcbn0gZnJvbSAnLi9CYXNlQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0IHsgTWVzc2FnZUJvZHkgfSBmcm9tICcuLi9jb252ZXJzYXRpb24vTWVzc2FnZUJvZHknO1xuaW1wb3J0IHsgQ29udGFjdE5hbWUgfSBmcm9tICcuLi9jb252ZXJzYXRpb24vQ29udGFjdE5hbWUnO1xuaW1wb3J0IHsgVHlwaW5nQW5pbWF0aW9uIH0gZnJvbSAnLi4vY29udmVyc2F0aW9uL1R5cGluZ0FuaW1hdGlvbic7XG5cbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi4vLi4vYmFkZ2VzL3R5cGVzJztcblxuY29uc3QgTUVTU0FHRV9TVEFUVVNfSUNPTl9DTEFTU19OQU1FID0gYCR7TUVTU0FHRV9URVhUX0NMQVNTX05BTUV9X19zdGF0dXMtaWNvbmA7XG5cbmV4cG9ydCBjb25zdCBNZXNzYWdlU3RhdHVzZXMgPSBbXG4gICdzZW5kaW5nJyxcbiAgJ3NlbnQnLFxuICAnZGVsaXZlcmVkJyxcbiAgJ3JlYWQnLFxuICAncGF1c2VkJyxcbiAgJ2Vycm9yJyxcbiAgJ3BhcnRpYWwtc2VudCcsXG5dIGFzIGNvbnN0O1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlU3RhdHVzVHlwZSA9IHR5cGVvZiBNZXNzYWdlU3RhdHVzZXNbbnVtYmVyXTtcblxuZXhwb3J0IHR5cGUgUHJvcHNEYXRhID0gUGljazxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgfCAnYXZhdGFyUGF0aCdcbiAgfCAnYmFkZ2VzJ1xuICB8ICdjb2xvcidcbiAgfCAnZHJhZnRQcmV2aWV3J1xuICB8ICdpZCdcbiAgfCAnaXNNZSdcbiAgLy8gTk9URTogUGFzc2VkIGZvciBDSSwgbm90IHVzZWQgZm9yIHJlbmRlcmluZ1xuICB8ICdpc1Bpbm5lZCdcbiAgfCAnaXNTZWxlY3RlZCdcbiAgfCAnbGFzdE1lc3NhZ2UnXG4gIHwgJ2xhc3RVcGRhdGVkJ1xuICB8ICdtYXJrZWRVbnJlYWQnXG4gIHwgJ211dGVFeHBpcmVzQXQnXG4gIHwgJ25hbWUnXG4gIHwgJ3Bob25lTnVtYmVyJ1xuICB8ICdwcm9maWxlTmFtZSdcbiAgfCAnc2hhcmVkR3JvdXBOYW1lcydcbiAgfCAnc2hvdWxkU2hvd0RyYWZ0J1xuICB8ICd0aXRsZSdcbiAgfCAndHlwZSdcbiAgfCAndHlwaW5nQ29udGFjdElkJ1xuICB8ICd1bmJsdXJyZWRBdmF0YXJQYXRoJ1xuICB8ICd1bnJlYWRDb3VudCdcbj4gJiB7XG4gIGJhZGdlPzogQmFkZ2VUeXBlO1xufTtcblxudHlwZSBQcm9wc0hvdXNla2VlcGluZyA9IHtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgb25DbGljazogKGlkOiBzdHJpbmcpID0+IHZvaWQ7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wcyA9IFByb3BzRGF0YSAmIFByb3BzSG91c2VrZWVwaW5nO1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uTGlzdEl0ZW06IEZ1bmN0aW9uQ29tcG9uZW50PFByb3BzPiA9IFJlYWN0Lm1lbW8oXG4gIGZ1bmN0aW9uIENvbnZlcnNhdGlvbkxpc3RJdGVtKHtcbiAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgIGF2YXRhclBhdGgsXG4gICAgYmFkZ2UsXG4gICAgY29sb3IsXG4gICAgZHJhZnRQcmV2aWV3LFxuICAgIGkxOG4sXG4gICAgaWQsXG4gICAgaXNNZSxcbiAgICBpc1NlbGVjdGVkLFxuICAgIGxhc3RNZXNzYWdlLFxuICAgIGxhc3RVcGRhdGVkLFxuICAgIG1hcmtlZFVucmVhZCxcbiAgICBtdXRlRXhwaXJlc0F0LFxuICAgIG5hbWUsXG4gICAgb25DbGljayxcbiAgICBwaG9uZU51bWJlcixcbiAgICBwcm9maWxlTmFtZSxcbiAgICBzaGFyZWRHcm91cE5hbWVzLFxuICAgIHNob3VsZFNob3dEcmFmdCxcbiAgICB0aGVtZSxcbiAgICB0aXRsZSxcbiAgICB0eXBlLFxuICAgIHR5cGluZ0NvbnRhY3RJZCxcbiAgICB1bmJsdXJyZWRBdmF0YXJQYXRoLFxuICAgIHVucmVhZENvdW50LFxuICB9KSB7XG4gICAgY29uc3QgaXNNdXRlZCA9IEJvb2xlYW4obXV0ZUV4cGlyZXNBdCAmJiBEYXRlLm5vdygpIDwgbXV0ZUV4cGlyZXNBdCk7XG4gICAgY29uc3QgaGVhZGVyTmFtZSA9IChcbiAgICAgIDw+XG4gICAgICAgIHtpc01lID8gKFxuICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT17SEVBREVSX0NPTlRBQ1RfTkFNRV9DTEFTU19OQU1FfT5cbiAgICAgICAgICAgIHtpMThuKCdub3RlVG9TZWxmJyl9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICApIDogKFxuICAgICAgICAgIDxDb250YWN0TmFtZSBtb2R1bGU9e0hFQURFUl9DT05UQUNUX05BTUVfQ0xBU1NfTkFNRX0gdGl0bGU9e3RpdGxlfSAvPlxuICAgICAgICApfVxuICAgICAgICB7aXNNdXRlZCAmJiA8ZGl2IGNsYXNzTmFtZT17YCR7SEVBREVSX05BTUVfQ0xBU1NfTkFNRX1fX211dGUtaWNvbmB9IC8+fVxuICAgICAgPC8+XG4gICAgKTtcblxuICAgIGxldCBtZXNzYWdlVGV4dDogUmVhY3ROb2RlID0gbnVsbDtcbiAgICBsZXQgbWVzc2FnZVN0YXR1c0ljb246IFJlYWN0Tm9kZSA9IG51bGw7XG5cbiAgICBpZiAoIWFjY2VwdGVkTWVzc2FnZVJlcXVlc3QpIHtcbiAgICAgIG1lc3NhZ2VUZXh0ID0gKFxuICAgICAgICA8c3BhbiBjbGFzc05hbWU9e2Ake01FU1NBR0VfVEVYVF9DTEFTU19OQU1FfV9fbWVzc2FnZS1yZXF1ZXN0YH0+XG4gICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkxpc3RJdGVtLS1tZXNzYWdlLXJlcXVlc3QnKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKHR5cGluZ0NvbnRhY3RJZCkge1xuICAgICAgbWVzc2FnZVRleHQgPSA8VHlwaW5nQW5pbWF0aW9uIGkxOG49e2kxOG59IC8+O1xuICAgIH0gZWxzZSBpZiAoc2hvdWxkU2hvd0RyYWZ0ICYmIGRyYWZ0UHJldmlldykge1xuICAgICAgbWVzc2FnZVRleHQgPSAoXG4gICAgICAgIDw+XG4gICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPXtgJHtNRVNTQUdFX1RFWFRfQ0xBU1NfTkFNRX1fX2RyYWZ0LXByZWZpeGB9PlxuICAgICAgICAgICAge2kxOG4oJ0NvbnZlcnNhdGlvbkxpc3RJdGVtLS1kcmFmdC1wcmVmaXgnKX1cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgPE1lc3NhZ2VCb2R5XG4gICAgICAgICAgICB0ZXh0PXt0cnVuY2F0ZU1lc3NhZ2VUZXh0KGRyYWZ0UHJldmlldyl9XG4gICAgICAgICAgICBkaXNhYmxlSnVtYm9tb2ppXG4gICAgICAgICAgICBkaXNhYmxlTGlua3NcbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC8+XG4gICAgICApO1xuICAgIH0gZWxzZSBpZiAobGFzdE1lc3NhZ2U/LmRlbGV0ZWRGb3JFdmVyeW9uZSkge1xuICAgICAgbWVzc2FnZVRleHQgPSAoXG4gICAgICAgIDxzcGFuIGNsYXNzTmFtZT17YCR7TUVTU0FHRV9URVhUX0NMQVNTX05BTUV9X19kZWxldGVkLWZvci1ldmVyeW9uZWB9PlxuICAgICAgICAgIHtpMThuKCdtZXNzYWdlLS1kZWxldGVkRm9yRXZlcnlvbmUnKX1cbiAgICAgICAgPC9zcGFuPlxuICAgICAgKTtcbiAgICB9IGVsc2UgaWYgKGxhc3RNZXNzYWdlKSB7XG4gICAgICBtZXNzYWdlVGV4dCA9IChcbiAgICAgICAgPE1lc3NhZ2VCb2R5XG4gICAgICAgICAgdGV4dD17dHJ1bmNhdGVNZXNzYWdlVGV4dChsYXN0TWVzc2FnZS50ZXh0KX1cbiAgICAgICAgICBkaXNhYmxlSnVtYm9tb2ppXG4gICAgICAgICAgZGlzYWJsZUxpbmtzXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBpZiAobGFzdE1lc3NhZ2Uuc3RhdHVzKSB7XG4gICAgICAgIG1lc3NhZ2VTdGF0dXNJY29uID0gKFxuICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgICAgICAgTUVTU0FHRV9TVEFUVVNfSUNPTl9DTEFTU19OQU1FLFxuICAgICAgICAgICAgICBgJHtNRVNTQUdFX1NUQVRVU19JQ09OX0NMQVNTX05BTUV9LS0ke2xhc3RNZXNzYWdlLnN0YXR1c31gXG4gICAgICAgICAgICApfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3Qgb25DbGlja0l0ZW0gPSB1c2VDYWxsYmFjaygoKSA9PiBvbkNsaWNrKGlkKSwgW29uQ2xpY2ssIGlkXSk7XG5cbiAgICByZXR1cm4gKFxuICAgICAgPEJhc2VDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0PXthY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0fVxuICAgICAgICBhdmF0YXJQYXRoPXthdmF0YXJQYXRofVxuICAgICAgICBiYWRnZT17YmFkZ2V9XG4gICAgICAgIGNvbG9yPXtjb2xvcn1cbiAgICAgICAgY29udmVyc2F0aW9uVHlwZT17dHlwZX1cbiAgICAgICAgaGVhZGVyRGF0ZT17bGFzdFVwZGF0ZWR9XG4gICAgICAgIGhlYWRlck5hbWU9e2hlYWRlck5hbWV9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgaXNNZT17aXNNZX1cbiAgICAgICAgaXNTZWxlY3RlZD17Qm9vbGVhbihpc1NlbGVjdGVkKX1cbiAgICAgICAgbWFya2VkVW5yZWFkPXttYXJrZWRVbnJlYWR9XG4gICAgICAgIG1lc3NhZ2VTdGF0dXNJY29uPXttZXNzYWdlU3RhdHVzSWNvbn1cbiAgICAgICAgbWVzc2FnZVRleHQ9e21lc3NhZ2VUZXh0fVxuICAgICAgICBtZXNzYWdlVGV4dElzQWx3YXlzRnVsbFNpemVcbiAgICAgICAgbmFtZT17bmFtZX1cbiAgICAgICAgb25DbGljaz17b25DbGlja0l0ZW19XG4gICAgICAgIHBob25lTnVtYmVyPXtwaG9uZU51bWJlcn1cbiAgICAgICAgcHJvZmlsZU5hbWU9e3Byb2ZpbGVOYW1lfVxuICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtzaGFyZWRHcm91cE5hbWVzfVxuICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgIHRpdGxlPXt0aXRsZX1cbiAgICAgICAgdW5yZWFkQ291bnQ9e3VucmVhZENvdW50fVxuICAgICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoPXt1bmJsdXJyZWRBdmF0YXJQYXRofVxuICAgICAgLz5cbiAgICApO1xuICB9XG4pO1xuXG4vLyBUaGlzIHRha2VzIGB1bmtub3duYCBiZWNhdXNlLCBzb21ldGltZXMsIHZhbHVlcyBmcm9tIHRoZSBkYXRhYmFzZSBkb24ndCBtYXRjaCBvdXJcbi8vICAgdHlwZXMuIEluIHRoZSBsb25nIHRlcm0sIHdlIHNob3VsZCBmaXggdGhhdC4gSW4gdGhlIHNob3J0IHRlcm0sIHRoaXMgc21vb3RocyBvdmVyIHRoZVxuLy8gICBwcm9ibGVtLlxuZnVuY3Rpb24gdHJ1bmNhdGVNZXNzYWdlVGV4dCh0ZXh0OiB1bmtub3duKTogc3RyaW5nIHtcbiAgaWYgKHR5cGVvZiB0ZXh0ICE9PSAnc3RyaW5nJykge1xuICAgIHJldHVybiAnJztcbiAgfVxuICByZXR1cm4gdGV4dC5yZXBsYWNlKC8oPzpcXHI/XFxuKSsvZywgJyAnKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFtQztBQUNuQyx3QkFBdUI7QUFFdkIsc0NBS087QUFDUCx5QkFBNEI7QUFDNUIseUJBQTRCO0FBQzVCLDZCQUFnQztBQU1oQyxNQUFNLGlDQUFpQyxHQUFHO0FBRW5DLE1BQU0sa0JBQWtCO0FBQUEsRUFDN0I7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFDRjtBQTBDTyxNQUFNLHVCQUFpRCxxQkFBTSxLQUNsRSxzREFBOEI7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ0M7QUFDRCxRQUFNLFVBQVUsUUFBUSxpQkFBaUIsS0FBSyxJQUFJLElBQUksYUFBYTtBQUNuRSxRQUFNLGFBQ0osd0ZBQ0csT0FDQyxtREFBQztBQUFBLElBQUssV0FBVztBQUFBLEtBQ2QsS0FBSyxZQUFZLENBQ3BCLElBRUEsbURBQUM7QUFBQSxJQUFZLFFBQVE7QUFBQSxJQUFnQztBQUFBLEdBQWMsR0FFcEUsV0FBVyxtREFBQztBQUFBLElBQUksV0FBVyxHQUFHO0FBQUEsR0FBcUMsQ0FDdEU7QUFHRixNQUFJLGNBQXlCO0FBQzdCLE1BQUksb0JBQStCO0FBRW5DLE1BQUksQ0FBQyx3QkFBd0I7QUFDM0Isa0JBQ0UsbURBQUM7QUFBQSxNQUFLLFdBQVcsR0FBRztBQUFBLE9BQ2pCLEtBQUssdUNBQXVDLENBQy9DO0FBQUEsRUFFSixXQUFXLGlCQUFpQjtBQUMxQixrQkFBYyxtREFBQztBQUFBLE1BQWdCO0FBQUEsS0FBWTtBQUFBLEVBQzdDLFdBQVcsbUJBQW1CLGNBQWM7QUFDMUMsa0JBQ0Usd0ZBQ0UsbURBQUM7QUFBQSxNQUFLLFdBQVcsR0FBRztBQUFBLE9BQ2pCLEtBQUssb0NBQW9DLENBQzVDLEdBQ0EsbURBQUM7QUFBQSxNQUNDLE1BQU0sb0JBQW9CLFlBQVk7QUFBQSxNQUN0QyxrQkFBZ0I7QUFBQSxNQUNoQixjQUFZO0FBQUEsTUFDWjtBQUFBLEtBQ0YsQ0FDRjtBQUFBLEVBRUosV0FBVyxhQUFhLG9CQUFvQjtBQUMxQyxrQkFDRSxtREFBQztBQUFBLE1BQUssV0FBVyxHQUFHO0FBQUEsT0FDakIsS0FBSyw2QkFBNkIsQ0FDckM7QUFBQSxFQUVKLFdBQVcsYUFBYTtBQUN0QixrQkFDRSxtREFBQztBQUFBLE1BQ0MsTUFBTSxvQkFBb0IsWUFBWSxJQUFJO0FBQUEsTUFDMUMsa0JBQWdCO0FBQUEsTUFDaEIsY0FBWTtBQUFBLE1BQ1o7QUFBQSxLQUNGO0FBRUYsUUFBSSxZQUFZLFFBQVE7QUFDdEIsMEJBQ0UsbURBQUM7QUFBQSxRQUNDLFdBQVcsK0JBQ1QsZ0NBQ0EsR0FBRyxtQ0FBbUMsWUFBWSxRQUNwRDtBQUFBLE9BQ0Y7QUFBQSxJQUVKO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FBYyw4QkFBWSxNQUFNLFFBQVEsRUFBRSxHQUFHLENBQUMsU0FBUyxFQUFFLENBQUM7QUFFaEUsU0FDRSxtREFBQztBQUFBLElBQ0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBQ2xCLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxZQUFZLFFBQVEsVUFBVTtBQUFBLElBQzlCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLDZCQUEyQjtBQUFBLElBQzNCO0FBQUEsSUFDQSxTQUFTO0FBQUEsSUFDVDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEdBQ0Y7QUFFSixHQTNIQSx1QkE0SEY7QUFLQSw2QkFBNkIsTUFBdUI7QUFDbEQsTUFBSSxPQUFPLFNBQVMsVUFBVTtBQUM1QixXQUFPO0FBQUEsRUFDVDtBQUNBLFNBQU8sS0FBSyxRQUFRLGVBQWUsR0FBRztBQUN4QztBQUxTIiwKICAibmFtZXMiOiBbXQp9Cg==
