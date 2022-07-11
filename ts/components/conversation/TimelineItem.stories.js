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
var TimelineItem_stories_exports = {};
__export(TimelineItem_stories_exports, {
  MissingItem: () => MissingItem,
  Notification: () => Notification,
  PlainMessage: () => PlainMessage,
  UnknownType: () => UnknownType,
  default: () => TimelineItem_stories_default
});
module.exports = __toCommonJS(TimelineItem_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_EmojiPicker = require("../emoji/EmojiPicker");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_TimelineItem = require("./TimelineItem");
var import_UniversalTimerNotification = require("./UniversalTimerNotification");
var import_Calling = require("../../types/Calling");
var import_Colors = require("../../types/Colors");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_util = require("../_util");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const renderEmojiPicker = /* @__PURE__ */ __name(({
  onClose,
  onPickEmoji,
  ref
}) => /* @__PURE__ */ React.createElement(import_EmojiPicker.EmojiPicker, {
  i18n: (0, import_setupI18n.setupI18n)("en", import_messages.default),
  skinTone: 0,
  onSetSkinTone: (0, import_addon_actions.action)("EmojiPicker::onSetSkinTone"),
  ref,
  onClose,
  onPickEmoji
}), "renderEmojiPicker");
const renderReactionPicker = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement("div", null), "renderReactionPicker");
const renderContact = /* @__PURE__ */ __name((conversationId) => /* @__PURE__ */ React.createElement(React.Fragment, {
  key: conversationId
}, conversationId), "renderContact");
const renderUniversalTimerNotification = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_UniversalTimerNotification.UniversalTimerNotification, {
  i18n,
  expireTimer: 3600
}), "renderUniversalTimerNotification");
const getDefaultProps = /* @__PURE__ */ __name(() => ({
  containerElementRef: React.createRef(),
  containerWidthBreakpoint: import_util.WidthBreakpoint.Wide,
  conversationId: "conversation-id",
  getPreferredBadge: () => void 0,
  id: "asdf",
  isNextItemCallingNotification: false,
  isSelected: false,
  interactionMode: "keyboard",
  theme: import_Util.ThemeType.light,
  selectMessage: (0, import_addon_actions.action)("selectMessage"),
  reactToMessage: (0, import_addon_actions.action)("reactToMessage"),
  checkForAccount: (0, import_addon_actions.action)("checkForAccount"),
  clearSelectedMessage: (0, import_addon_actions.action)("clearSelectedMessage"),
  contactSupport: (0, import_addon_actions.action)("contactSupport"),
  replyToMessage: (0, import_addon_actions.action)("replyToMessage"),
  retryDeleteForEveryone: (0, import_addon_actions.action)("retryDeleteForEveryone"),
  retrySend: (0, import_addon_actions.action)("retrySend"),
  blockGroupLinkRequests: (0, import_addon_actions.action)("blockGroupLinkRequests"),
  deleteMessage: (0, import_addon_actions.action)("deleteMessage"),
  deleteMessageForEveryone: (0, import_addon_actions.action)("deleteMessageForEveryone"),
  kickOffAttachmentDownload: (0, import_addon_actions.action)("kickOffAttachmentDownload"),
  learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
  markAttachmentAsCorrupted: (0, import_addon_actions.action)("markAttachmentAsCorrupted"),
  markViewed: (0, import_addon_actions.action)("markViewed"),
  messageExpanded: (0, import_addon_actions.action)("messageExpanded"),
  showMessageDetail: (0, import_addon_actions.action)("showMessageDetail"),
  openConversation: (0, import_addon_actions.action)("openConversation"),
  openGiftBadge: (0, import_addon_actions.action)("openGiftBadge"),
  showContactDetail: (0, import_addon_actions.action)("showContactDetail"),
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  showForwardMessageModal: (0, import_addon_actions.action)("showForwardMessageModal"),
  showVisualAttachment: (0, import_addon_actions.action)("showVisualAttachment"),
  downloadAttachment: (0, import_addon_actions.action)("downloadAttachment"),
  displayTapToViewMessage: (0, import_addon_actions.action)("displayTapToViewMessage"),
  doubleCheckMissingQuoteReference: (0, import_addon_actions.action)("doubleCheckMissingQuoteReference"),
  showExpiredIncomingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  showExpiredOutgoingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  openLink: (0, import_addon_actions.action)("openLink"),
  scrollToQuotedMessage: (0, import_addon_actions.action)("scrollToQuotedMessage"),
  downloadNewVersion: (0, import_addon_actions.action)("downloadNewVersion"),
  showIdentity: (0, import_addon_actions.action)("showIdentity"),
  startCallingLobby: (0, import_addon_actions.action)("startCallingLobby"),
  startConversation: (0, import_addon_actions.action)("startConversation"),
  returnToActiveCall: (0, import_addon_actions.action)("returnToActiveCall"),
  shouldCollapseAbove: false,
  shouldCollapseBelow: false,
  shouldHideMetadata: false,
  shouldRenderDateHeader: false,
  now: Date.now(),
  renderContact,
  renderUniversalTimerNotification,
  renderEmojiPicker,
  renderReactionPicker,
  renderAudioAttachment: () => /* @__PURE__ */ React.createElement("div", null, "*AudioAttachment*")
}), "getDefaultProps");
var TimelineItem_stories_default = {
  title: "Components/Conversation/TimelineItem"
};
const PlainMessage = /* @__PURE__ */ __name(() => {
  const item = {
    type: "message",
    data: {
      id: "id-1",
      direction: "incoming",
      timestamp: Date.now(),
      author: {
        phoneNumber: "(202) 555-2001",
        color: import_Colors.AvatarColors[0]
      },
      text: "\u{1F525}"
    }
  };
  return /* @__PURE__ */ React.createElement(import_TimelineItem.TimelineItem, {
    ...getDefaultProps(),
    item,
    i18n
  });
}, "PlainMessage");
const Notification = /* @__PURE__ */ __name(() => {
  const items = [
    {
      type: "timerNotification",
      data: {
        phoneNumber: "(202) 555-0000",
        expireTimer: 60,
        ...(0, import_getDefaultConversation.getDefaultConversation)(),
        type: "fromOther"
      }
    },
    {
      type: "universalTimerNotification",
      data: null
    },
    {
      type: "chatSessionRefreshed"
    },
    {
      type: "safetyNumberNotification",
      data: {
        isGroup: false,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "deliveryIssue",
      data: {
        sender: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "changeNumberNotification",
      data: {
        sender: (0, import_getDefaultConversation.getDefaultConversation)(),
        timestamp: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: true,
        wasIncoming: true,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: true,
        wasIncoming: true,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        acceptedTime: Date.now() - 300,
        wasDeclined: false,
        wasIncoming: true,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        acceptedTime: Date.now() - 400,
        wasDeclined: false,
        wasIncoming: true,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: false,
        wasIncoming: true,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: false,
        wasIncoming: true,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        acceptedTime: Date.now() - 200,
        wasDeclined: false,
        wasIncoming: false,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        acceptedTime: Date.now() - 200,
        wasDeclined: false,
        wasIncoming: false,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: true,
        wasIncoming: false,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: true,
        wasIncoming: false,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: false,
        wasIncoming: false,
        wasVideoCall: false,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Direct,
        wasDeclined: false,
        wasIncoming: false,
        wasVideoCall: true,
        endedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "Peach",
          isMe: true,
          title: "Princess Peach"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        ended: false,
        deviceCount: 1,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        activeCallConversationId: "abc123",
        conversationId: "abc123",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        activeCallConversationId: "abc123",
        conversationId: "xyz987",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 1,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: false,
        deviceCount: 16,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "callHistory",
      data: {
        callMode: import_Calling.CallMode.Group,
        conversationId: "abc123",
        creator: {
          firstName: "Luigi",
          isMe: false,
          title: "Luigi Mario"
        },
        ended: true,
        deviceCount: 0,
        maxDevices: 16,
        startedTime: Date.now()
      }
    },
    {
      type: "profileChange",
      data: {
        change: {
          type: "name",
          oldName: "Fred",
          newName: "John"
        },
        changedContact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "resetSessionNotification",
      data: null
    },
    {
      type: "unsupportedMessage",
      data: {
        canProcessNow: true,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "unsupportedMessage",
      data: {
        canProcessNow: false,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "verificationNotification",
      data: {
        type: "markVerified",
        isLocal: false,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "verificationNotification",
      data: {
        type: "markVerified",
        isLocal: true,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "verificationNotification",
      data: {
        type: "markNotVerified",
        isLocal: false,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    },
    {
      type: "verificationNotification",
      data: {
        type: "markNotVerified",
        isLocal: true,
        contact: (0, import_getDefaultConversation.getDefaultConversation)()
      }
    }
  ];
  return /* @__PURE__ */ React.createElement(React.Fragment, null, items.map((item, index) => /* @__PURE__ */ React.createElement(React.Fragment, {
    key: index
  }, /* @__PURE__ */ React.createElement(import_TimelineItem.TimelineItem, {
    ...getDefaultProps(),
    item,
    i18n
  }))));
}, "Notification");
const UnknownType = /* @__PURE__ */ __name(() => {
  const item = {
    type: "random",
    data: {
      somethin: "somethin"
    }
  };
  return /* @__PURE__ */ React.createElement(import_TimelineItem.TimelineItem, {
    ...getDefaultProps(),
    item,
    i18n
  });
}, "UnknownType");
const MissingItem = /* @__PURE__ */ __name(() => {
  const item = null;
  return /* @__PURE__ */ React.createElement(import_TimelineItem.TimelineItem, {
    ...getDefaultProps(),
    item,
    i18n
  });
}, "MissingItem");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MissingItem,
  Notification,
  PlainMessage,
  UnknownType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVJdGVtLnN0b3JpZXMudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgUmVhY3QgZnJvbSAncmVhY3QnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgeyBFbW9qaVBpY2tlciB9IGZyb20gJy4uL2Vtb2ppL0Vtb2ppUGlja2VyJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgVGltZWxpbmVJdGVtUHJvcHMgfSBmcm9tICcuL1RpbWVsaW5lSXRlbSc7XG5pbXBvcnQgeyBUaW1lbGluZUl0ZW0gfSBmcm9tICcuL1RpbWVsaW5lSXRlbSc7XG5pbXBvcnQgeyBVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbiB9IGZyb20gJy4vVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi8uLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi9fdXRpbCc7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgcmVuZGVyRW1vamlQaWNrZXI6IFRpbWVsaW5lSXRlbVByb3BzWydyZW5kZXJFbW9qaVBpY2tlciddID0gKHtcbiAgb25DbG9zZSxcbiAgb25QaWNrRW1vamksXG4gIHJlZixcbn0pID0+IChcbiAgPEVtb2ppUGlja2VyXG4gICAgaTE4bj17c2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpfVxuICAgIHNraW5Ub25lPXswfVxuICAgIG9uU2V0U2tpblRvbmU9e2FjdGlvbignRW1vamlQaWNrZXI6Om9uU2V0U2tpblRvbmUnKX1cbiAgICByZWY9e3JlZn1cbiAgICBvbkNsb3NlPXtvbkNsb3NlfVxuICAgIG9uUGlja0Vtb2ppPXtvblBpY2tFbW9qaX1cbiAgLz5cbik7XG5cbmNvbnN0IHJlbmRlclJlYWN0aW9uUGlja2VyOiBUaW1lbGluZUl0ZW1Qcm9wc1sncmVuZGVyUmVhY3Rpb25QaWNrZXInXSA9ICgpID0+IChcbiAgPGRpdiAvPlxuKTtcblxuY29uc3QgcmVuZGVyQ29udGFjdCA9IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiAoXG4gIDxSZWFjdC5GcmFnbWVudCBrZXk9e2NvbnZlcnNhdGlvbklkfT57Y29udmVyc2F0aW9uSWR9PC9SZWFjdC5GcmFnbWVudD5cbik7XG5cbmNvbnN0IHJlbmRlclVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uID0gKCkgPT4gKFxuICA8VW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24gaTE4bj17aTE4bn0gZXhwaXJlVGltZXI9ezM2MDB9IC8+XG4pO1xuXG5jb25zdCBnZXREZWZhdWx0UHJvcHMgPSAoKSA9PiAoe1xuICBjb250YWluZXJFbGVtZW50UmVmOiBSZWFjdC5jcmVhdGVSZWY8SFRNTEVsZW1lbnQ+KCksXG4gIGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50LldpZGUsXG4gIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkJyxcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgaWQ6ICdhc2RmJyxcbiAgaXNOZXh0SXRlbUNhbGxpbmdOb3RpZmljYXRpb246IGZhbHNlLFxuICBpc1NlbGVjdGVkOiBmYWxzZSxcbiAgaW50ZXJhY3Rpb25Nb2RlOiAna2V5Ym9hcmQnIGFzIGNvbnN0LFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxuICBzZWxlY3RNZXNzYWdlOiBhY3Rpb24oJ3NlbGVjdE1lc3NhZ2UnKSxcbiAgcmVhY3RUb01lc3NhZ2U6IGFjdGlvbigncmVhY3RUb01lc3NhZ2UnKSxcbiAgY2hlY2tGb3JBY2NvdW50OiBhY3Rpb24oJ2NoZWNrRm9yQWNjb3VudCcpLFxuICBjbGVhclNlbGVjdGVkTWVzc2FnZTogYWN0aW9uKCdjbGVhclNlbGVjdGVkTWVzc2FnZScpLFxuICBjb250YWN0U3VwcG9ydDogYWN0aW9uKCdjb250YWN0U3VwcG9ydCcpLFxuICByZXBseVRvTWVzc2FnZTogYWN0aW9uKCdyZXBseVRvTWVzc2FnZScpLFxuICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBhY3Rpb24oJ3JldHJ5RGVsZXRlRm9yRXZlcnlvbmUnKSxcbiAgcmV0cnlTZW5kOiBhY3Rpb24oJ3JldHJ5U2VuZCcpLFxuICBibG9ja0dyb3VwTGlua1JlcXVlc3RzOiBhY3Rpb24oJ2Jsb2NrR3JvdXBMaW5rUmVxdWVzdHMnKSxcbiAgZGVsZXRlTWVzc2FnZTogYWN0aW9uKCdkZWxldGVNZXNzYWdlJyksXG4gIGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZTogYWN0aW9uKCdkZWxldGVNZXNzYWdlRm9yRXZlcnlvbmUnKSxcbiAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZDogYWN0aW9uKCdraWNrT2ZmQXR0YWNobWVudERvd25sb2FkJyksXG4gIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZTogYWN0aW9uKCdsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUnKSxcbiAgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZDogYWN0aW9uKCdtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkJyksXG4gIG1hcmtWaWV3ZWQ6IGFjdGlvbignbWFya1ZpZXdlZCcpLFxuICBtZXNzYWdlRXhwYW5kZWQ6IGFjdGlvbignbWVzc2FnZUV4cGFuZGVkJyksXG4gIHNob3dNZXNzYWdlRGV0YWlsOiBhY3Rpb24oJ3Nob3dNZXNzYWdlRGV0YWlsJyksXG4gIG9wZW5Db252ZXJzYXRpb246IGFjdGlvbignb3BlbkNvbnZlcnNhdGlvbicpLFxuICBvcGVuR2lmdEJhZGdlOiBhY3Rpb24oJ29wZW5HaWZ0QmFkZ2UnKSxcbiAgc2hvd0NvbnRhY3REZXRhaWw6IGFjdGlvbignc2hvd0NvbnRhY3REZXRhaWwnKSxcbiAgc2hvd0NvbnRhY3RNb2RhbDogYWN0aW9uKCdzaG93Q29udGFjdE1vZGFsJyksXG4gIHNob3dGb3J3YXJkTWVzc2FnZU1vZGFsOiBhY3Rpb24oJ3Nob3dGb3J3YXJkTWVzc2FnZU1vZGFsJyksXG4gIHNob3dWaXN1YWxBdHRhY2htZW50OiBhY3Rpb24oJ3Nob3dWaXN1YWxBdHRhY2htZW50JyksXG4gIGRvd25sb2FkQXR0YWNobWVudDogYWN0aW9uKCdkb3dubG9hZEF0dGFjaG1lbnQnKSxcbiAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IGFjdGlvbignZGlzcGxheVRhcFRvVmlld01lc3NhZ2UnKSxcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IGFjdGlvbignZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnKSxcbiAgc2hvd0V4cGlyZWRJbmNvbWluZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0OiBhY3Rpb24oXG4gICAgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCdcbiAgKSxcbiAgb3Blbkxpbms6IGFjdGlvbignb3BlbkxpbmsnKSxcbiAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlOiBhY3Rpb24oJ3Njcm9sbFRvUXVvdGVkTWVzc2FnZScpLFxuICBkb3dubG9hZE5ld1ZlcnNpb246IGFjdGlvbignZG93bmxvYWROZXdWZXJzaW9uJyksXG4gIHNob3dJZGVudGl0eTogYWN0aW9uKCdzaG93SWRlbnRpdHknKSxcbiAgc3RhcnRDYWxsaW5nTG9iYnk6IGFjdGlvbignc3RhcnRDYWxsaW5nTG9iYnknKSxcbiAgc3RhcnRDb252ZXJzYXRpb246IGFjdGlvbignc3RhcnRDb252ZXJzYXRpb24nKSxcbiAgcmV0dXJuVG9BY3RpdmVDYWxsOiBhY3Rpb24oJ3JldHVyblRvQWN0aXZlQ2FsbCcpLFxuICBzaG91bGRDb2xsYXBzZUFib3ZlOiBmYWxzZSxcbiAgc2hvdWxkQ29sbGFwc2VCZWxvdzogZmFsc2UsXG4gIHNob3VsZEhpZGVNZXRhZGF0YTogZmFsc2UsXG4gIHNob3VsZFJlbmRlckRhdGVIZWFkZXI6IGZhbHNlLFxuXG4gIG5vdzogRGF0ZS5ub3coKSxcblxuICByZW5kZXJDb250YWN0LFxuICByZW5kZXJVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbixcbiAgcmVuZGVyRW1vamlQaWNrZXIsXG4gIHJlbmRlclJlYWN0aW9uUGlja2VyLFxuICByZW5kZXJBdWRpb0F0dGFjaG1lbnQ6ICgpID0+IDxkaXY+KkF1ZGlvQXR0YWNobWVudCo8L2Rpdj4sXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1RpbWVsaW5lSXRlbScsXG59O1xuXG5leHBvcnQgY29uc3QgUGxhaW5NZXNzYWdlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaXRlbSA9IHtcbiAgICB0eXBlOiAnbWVzc2FnZScsXG4gICAgZGF0YToge1xuICAgICAgaWQ6ICdpZC0xJyxcbiAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIGF1dGhvcjoge1xuICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0yMDAxJyxcbiAgICAgICAgY29sb3I6IEF2YXRhckNvbG9yc1swXSxcbiAgICAgIH0sXG4gICAgICB0ZXh0OiAnXHVEODNEXHVERDI1JyxcbiAgICB9LFxuICB9IGFzIFRpbWVsaW5lSXRlbVByb3BzWydpdGVtJ107XG5cbiAgcmV0dXJuIDxUaW1lbGluZUl0ZW0gey4uLmdldERlZmF1bHRQcm9wcygpfSBpdGVtPXtpdGVtfSBpMThuPXtpMThufSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb3RpZmljYXRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBpdGVtcyA9IFtcbiAgICB7XG4gICAgICB0eXBlOiAndGltZXJOb3RpZmljYXRpb24nLFxuICAgICAgZGF0YToge1xuICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0wMDAwJyxcbiAgICAgICAgZXhwaXJlVGltZXI6IDYwLFxuICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIHR5cGU6ICdmcm9tT3RoZXInLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICd1bml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiBudWxsLFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NoYXRTZXNzaW9uUmVmcmVzaGVkJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdzYWZldHlOdW1iZXJOb3RpZmljYXRpb24nLFxuICAgICAgZGF0YToge1xuICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgY29udGFjdDogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdkZWxpdmVyeUlzc3VlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgc2VuZGVyOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NoYW5nZU51bWJlck5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHNlbmRlcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gZGVjbGluZWQgaW5jb21pbmcgYXVkaW9cbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgd2FzRGVjbGluZWQ6IHRydWUsXG4gICAgICAgIHdhc0luY29taW5nOiB0cnVlLFxuICAgICAgICB3YXNWaWRlb0NhbGw6IGZhbHNlLFxuICAgICAgICBlbmRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gZGVjbGluZWQgaW5jb21pbmcgdmlkZW9cbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgd2FzRGVjbGluZWQ6IHRydWUsXG4gICAgICAgIHdhc0luY29taW5nOiB0cnVlLFxuICAgICAgICB3YXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgIGVuZGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FsbEhpc3RvcnknLFxuICAgICAgZGF0YToge1xuICAgICAgICAvLyBhY2NlcHRlZCBpbmNvbWluZyBhdWRpb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBhY2NlcHRlZFRpbWU6IERhdGUubm93KCkgLSAzMDAsXG4gICAgICAgIHdhc0RlY2xpbmVkOiBmYWxzZSxcbiAgICAgICAgd2FzSW5jb21pbmc6IHRydWUsXG4gICAgICAgIHdhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgIGVuZGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FsbEhpc3RvcnknLFxuICAgICAgZGF0YToge1xuICAgICAgICAvLyBhY2NlcHRlZCBpbmNvbWluZyB2aWRlb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBhY2NlcHRlZFRpbWU6IERhdGUubm93KCkgLSA0MDAsXG4gICAgICAgIHdhc0RlY2xpbmVkOiBmYWxzZSxcbiAgICAgICAgd2FzSW5jb21pbmc6IHRydWUsXG4gICAgICAgIHdhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgZW5kZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYWxsSGlzdG9yeScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC8vIG1pc3NlZCAobmVpdGhlciBhY2NlcHRlZCBub3IgZGVjbGluZWQpIGluY29taW5nIGF1ZGlvXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIHdhc0RlY2xpbmVkOiBmYWxzZSxcbiAgICAgICAgd2FzSW5jb21pbmc6IHRydWUsXG4gICAgICAgIHdhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgIGVuZGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FsbEhpc3RvcnknLFxuICAgICAgZGF0YToge1xuICAgICAgICAvLyBtaXNzZWQgKG5laXRoZXIgYWNjZXB0ZWQgbm9yIGRlY2xpbmVkKSBpbmNvbWluZyB2aWRlb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgICAgIHdhc0luY29taW5nOiB0cnVlLFxuICAgICAgICB3YXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgIGVuZGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FsbEhpc3RvcnknLFxuICAgICAgZGF0YToge1xuICAgICAgICAvLyBhY2NlcHRlZCBvdXRnb2luZyBhdWRpb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBhY2NlcHRlZFRpbWU6IERhdGUubm93KCkgLSAyMDAsXG4gICAgICAgIHdhc0RlY2xpbmVkOiBmYWxzZSxcbiAgICAgICAgd2FzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICB3YXNWaWRlb0NhbGw6IGZhbHNlLFxuICAgICAgICBlbmRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gYWNjZXB0ZWQgb3V0Z29pbmcgdmlkZW9cbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgYWNjZXB0ZWRUaW1lOiBEYXRlLm5vdygpIC0gMjAwLFxuICAgICAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgICAgIHdhc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgd2FzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICBlbmRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gZGVjbGluZWQgb3V0Z29pbmcgYXVkaW9cbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgd2FzRGVjbGluZWQ6IHRydWUsXG4gICAgICAgIHdhc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgd2FzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgZW5kZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYWxsSGlzdG9yeScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC8vIGRlY2xpbmVkIG91dGdvaW5nIHZpZGVvXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIHdhc0RlY2xpbmVkOiB0cnVlLFxuICAgICAgICB3YXNJbmNvbWluZzogZmFsc2UsXG4gICAgICAgIHdhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgZW5kZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYWxsSGlzdG9yeScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC8vIHVuYW5zd2VyZWQgKG5laXRoZXIgYWNjZXB0ZWQgbm9yIGRlY2xpbmVkKSBvdXRnb2luZyBhdWRpb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgICAgIHdhc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgd2FzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgZW5kZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYWxsSGlzdG9yeScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC8vIHVuYW5zd2VyZWQgKG5laXRoZXIgYWNjZXB0ZWQgbm9yIGRlY2xpbmVkKSBvdXRnb2luZyB2aWRlb1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgICAgIHdhc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgd2FzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICBlbmRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gb25nb2luZyBncm91cCBjYWxsXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICBjcmVhdG9yOiB7XG4gICAgICAgICAgZmlyc3ROYW1lOiAnTHVpZ2knLFxuICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiAnTHVpZ2kgTWFyaW8nLFxuICAgICAgICB9LFxuICAgICAgICBlbmRlZDogZmFsc2UsXG4gICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgc3RhcnRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gb25nb2luZyBncm91cCBjYWxsIHN0YXJ0ZWQgYnkgeW91XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICBjcmVhdG9yOiB7XG4gICAgICAgICAgZmlyc3ROYW1lOiAnUGVhY2gnLFxuICAgICAgICAgIGlzTWU6IHRydWUsXG4gICAgICAgICAgdGl0bGU6ICdQcmluY2VzcyBQZWFjaCcsXG4gICAgICAgIH0sXG4gICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgIG1heERldmljZXM6IDE2LFxuICAgICAgICBzdGFydGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAnY2FsbEhpc3RvcnknLFxuICAgICAgZGF0YToge1xuICAgICAgICAvLyBvbmdvaW5nIGdyb3VwIGNhbGwsIGNyZWF0b3IgdW5rbm93blxuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgZW5kZWQ6IGZhbHNlLFxuICAgICAgICBkZXZpY2VDb3VudDogMSxcbiAgICAgICAgbWF4RGV2aWNlczogMTYsXG4gICAgICAgIHN0YXJ0ZWRUaW1lOiBEYXRlLm5vdygpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICdjYWxsSGlzdG9yeScsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIC8vIG9uZ29pbmcgYW5kIGFjdGl2ZSBncm91cCBjYWxsXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICBjcmVhdG9yOiB7XG4gICAgICAgICAgZmlyc3ROYW1lOiAnTHVpZ2knLFxuICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiAnTHVpZ2kgTWFyaW8nLFxuICAgICAgICB9LFxuICAgICAgICBlbmRlZDogZmFsc2UsXG4gICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgc3RhcnRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gb25nb2luZyBncm91cCBjYWxsLCBidXQgeW91J3JlIGluIGFub3RoZXIgb25lXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICd4eXo5ODcnLFxuICAgICAgICBjcmVhdG9yOiB7XG4gICAgICAgICAgZmlyc3ROYW1lOiAnTHVpZ2knLFxuICAgICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICAgIHRpdGxlOiAnTHVpZ2kgTWFyaW8nLFxuICAgICAgICB9LFxuICAgICAgICBlbmRlZDogZmFsc2UsXG4gICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgc3RhcnRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gb25nb2luZyBmdWxsIGdyb3VwIGNhbGxcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2FiYzEyMycsXG4gICAgICAgIGNyZWF0b3I6IHtcbiAgICAgICAgICBmaXJzdE5hbWU6ICdMdWlnaScsXG4gICAgICAgICAgaXNNZTogZmFsc2UsXG4gICAgICAgICAgdGl0bGU6ICdMdWlnaSBNYXJpbycsXG4gICAgICAgIH0sXG4gICAgICAgIGVuZGVkOiBmYWxzZSxcbiAgICAgICAgZGV2aWNlQ291bnQ6IDE2LFxuICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgc3RhcnRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgLy8gZmluaXNoZWQgY2FsbFxuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyxcbiAgICAgICAgY3JlYXRvcjoge1xuICAgICAgICAgIGZpcnN0TmFtZTogJ0x1aWdpJyxcbiAgICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgICB0aXRsZTogJ0x1aWdpIE1hcmlvJyxcbiAgICAgICAgfSxcbiAgICAgICAgZW5kZWQ6IHRydWUsXG4gICAgICAgIGRldmljZUNvdW50OiAwLFxuICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgc3RhcnRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3Byb2ZpbGVDaGFuZ2UnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjaGFuZ2U6IHtcbiAgICAgICAgICB0eXBlOiAnbmFtZScsXG4gICAgICAgICAgb2xkTmFtZTogJ0ZyZWQnLFxuICAgICAgICAgIG5ld05hbWU6ICdKb2huJyxcbiAgICAgICAgfSxcbiAgICAgICAgY2hhbmdlZENvbnRhY3Q6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAncmVzZXRTZXNzaW9uTm90aWZpY2F0aW9uJyxcbiAgICAgIGRhdGE6IG51bGwsXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAndW5zdXBwb3J0ZWRNZXNzYWdlJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgY2FuUHJvY2Vzc05vdzogdHJ1ZSxcbiAgICAgICAgY29udGFjdDogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICd1bnN1cHBvcnRlZE1lc3NhZ2UnLFxuICAgICAgZGF0YToge1xuICAgICAgICBjYW5Qcm9jZXNzTm93OiBmYWxzZSxcbiAgICAgICAgY29udGFjdDogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIHtcbiAgICAgIHR5cGU6ICd2ZXJpZmljYXRpb25Ob3RpZmljYXRpb24nLFxuICAgICAgZGF0YToge1xuICAgICAgICB0eXBlOiAnbWFya1ZlcmlmaWVkJyxcbiAgICAgICAgaXNMb2NhbDogZmFsc2UsXG4gICAgICAgIGNvbnRhY3Q6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAndmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdHlwZTogJ21hcmtWZXJpZmllZCcsXG4gICAgICAgIGlzTG9jYWw6IHRydWUsXG4gICAgICAgIGNvbnRhY3Q6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB7XG4gICAgICB0eXBlOiAndmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uJyxcbiAgICAgIGRhdGE6IHtcbiAgICAgICAgdHlwZTogJ21hcmtOb3RWZXJpZmllZCcsXG4gICAgICAgIGlzTG9jYWw6IGZhbHNlLFxuICAgICAgICBjb250YWN0OiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICB9LFxuICAgIH0sXG4gICAge1xuICAgICAgdHlwZTogJ3ZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiB7XG4gICAgICAgIHR5cGU6ICdtYXJrTm90VmVyaWZpZWQnLFxuICAgICAgICBpc0xvY2FsOiB0cnVlLFxuICAgICAgICBjb250YWN0OiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICB9LFxuICAgIH0sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8PlxuICAgICAge2l0ZW1zLm1hcCgoaXRlbSwgaW5kZXgpID0+IChcbiAgICAgICAgPFJlYWN0LkZyYWdtZW50IGtleT17aW5kZXh9PlxuICAgICAgICAgIDxUaW1lbGluZUl0ZW1cbiAgICAgICAgICAgIHsuLi5nZXREZWZhdWx0UHJvcHMoKX1cbiAgICAgICAgICAgIGl0ZW09e2l0ZW0gYXMgVGltZWxpbmVJdGVtUHJvcHNbJ2l0ZW0nXX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgPC9SZWFjdC5GcmFnbWVudD5cbiAgICAgICkpfVxuICAgIDwvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IFVua25vd25UeXBlID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgaXRlbSA9IHtcbiAgICB0eXBlOiAncmFuZG9tJyxcbiAgICBkYXRhOiB7XG4gICAgICBzb21ldGhpbjogJ3NvbWV0aGluJyxcbiAgICB9LFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIH0gYXMgYW55IGFzIFRpbWVsaW5lSXRlbVByb3BzWydpdGVtJ107XG5cbiAgcmV0dXJuIDxUaW1lbGluZUl0ZW0gey4uLmdldERlZmF1bHRQcm9wcygpfSBpdGVtPXtpdGVtfSBpMThuPXtpMThufSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBNaXNzaW5nSXRlbSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gIGNvbnN0IGl0ZW0gPSBudWxsIGFzIGFueSBhcyBUaW1lbGluZUl0ZW1Qcm9wc1snaXRlbSddO1xuXG4gIHJldHVybiA8VGltZWxpbmVJdGVtIHsuLi5nZXREZWZhdWx0UHJvcHMoKX0gaXRlbT17aXRlbX0gaTE4bj17aTE4bn0gLz47XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBRXZCLHlCQUE0QjtBQUM1Qix1QkFBMEI7QUFDMUIsc0JBQXVCO0FBRXZCLDBCQUE2QjtBQUM3Qix3Q0FBMkM7QUFDM0MscUJBQXlCO0FBQ3pCLG9CQUE2QjtBQUM3QixvQ0FBdUM7QUFDdkMsa0JBQWdDO0FBQ2hDLGtCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxNQUFNLG9CQUE0RCx3QkFBQztBQUFBLEVBQ2pFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxNQUVBLG9DQUFDO0FBQUEsRUFDQyxNQUFNLGdDQUFVLE1BQU0sdUJBQVU7QUFBQSxFQUNoQyxVQUFVO0FBQUEsRUFDVixlQUFlLGlDQUFPLDRCQUE0QjtBQUFBLEVBQ2xEO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxDQUNGLEdBWmdFO0FBZWxFLE1BQU0sdUJBQWtFLDZCQUN0RSxvQ0FBQyxXQUFJLEdBRGlFO0FBSXhFLE1BQU0sZ0JBQWdCLHdCQUFDLG1CQUNyQixvQ0FBQyxNQUFNLFVBQU47QUFBQSxFQUFlLEtBQUs7QUFBQSxHQUFpQixjQUFlLEdBRGpDO0FBSXRCLE1BQU0sbUNBQW1DLDZCQUN2QyxvQ0FBQztBQUFBLEVBQTJCO0FBQUEsRUFBWSxhQUFhO0FBQUEsQ0FBTSxHQURwQjtBQUl6QyxNQUFNLGtCQUFrQiw2QkFBTztBQUFBLEVBQzdCLHFCQUFxQixNQUFNLFVBQXVCO0FBQUEsRUFDbEQsMEJBQTBCLDRCQUFnQjtBQUFBLEVBQzFDLGdCQUFnQjtBQUFBLEVBQ2hCLG1CQUFtQixNQUFNO0FBQUEsRUFDekIsSUFBSTtBQUFBLEVBQ0osK0JBQStCO0FBQUEsRUFDL0IsWUFBWTtBQUFBLEVBQ1osaUJBQWlCO0FBQUEsRUFDakIsT0FBTyxzQkFBVTtBQUFBLEVBQ2pCLGVBQWUsaUNBQU8sZUFBZTtBQUFBLEVBQ3JDLGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxFQUN2QyxpQkFBaUIsaUNBQU8saUJBQWlCO0FBQUEsRUFDekMsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUFBLEVBQ25ELGdCQUFnQixpQ0FBTyxnQkFBZ0I7QUFBQSxFQUN2QyxnQkFBZ0IsaUNBQU8sZ0JBQWdCO0FBQUEsRUFDdkMsd0JBQXdCLGlDQUFPLHdCQUF3QjtBQUFBLEVBQ3ZELFdBQVcsaUNBQU8sV0FBVztBQUFBLEVBQzdCLHdCQUF3QixpQ0FBTyx3QkFBd0I7QUFBQSxFQUN2RCxlQUFlLGlDQUFPLGVBQWU7QUFBQSxFQUNyQywwQkFBMEIsaUNBQU8sMEJBQTBCO0FBQUEsRUFDM0QsMkJBQTJCLGlDQUFPLDJCQUEyQjtBQUFBLEVBQzdELDZCQUE2QixpQ0FBTyw2QkFBNkI7QUFBQSxFQUNqRSwyQkFBMkIsaUNBQU8sMkJBQTJCO0FBQUEsRUFDN0QsWUFBWSxpQ0FBTyxZQUFZO0FBQUEsRUFDL0IsaUJBQWlCLGlDQUFPLGlCQUFpQjtBQUFBLEVBQ3pDLG1CQUFtQixpQ0FBTyxtQkFBbUI7QUFBQSxFQUM3QyxrQkFBa0IsaUNBQU8sa0JBQWtCO0FBQUEsRUFDM0MsZUFBZSxpQ0FBTyxlQUFlO0FBQUEsRUFDckMsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLEVBQzdDLGtCQUFrQixpQ0FBTyxrQkFBa0I7QUFBQSxFQUMzQyx5QkFBeUIsaUNBQU8seUJBQXlCO0FBQUEsRUFDekQsc0JBQXNCLGlDQUFPLHNCQUFzQjtBQUFBLEVBQ25ELG9CQUFvQixpQ0FBTyxvQkFBb0I7QUFBQSxFQUMvQyx5QkFBeUIsaUNBQU8seUJBQXlCO0FBQUEsRUFDekQsa0NBQWtDLGlDQUFPLGtDQUFrQztBQUFBLEVBQzNFLG1DQUFtQyxpQ0FDakMsbUNBQ0Y7QUFBQSxFQUNBLG1DQUFtQyxpQ0FDakMsbUNBQ0Y7QUFBQSxFQUNBLFVBQVUsaUNBQU8sVUFBVTtBQUFBLEVBQzNCLHVCQUF1QixpQ0FBTyx1QkFBdUI7QUFBQSxFQUNyRCxvQkFBb0IsaUNBQU8sb0JBQW9CO0FBQUEsRUFDL0MsY0FBYyxpQ0FBTyxjQUFjO0FBQUEsRUFDbkMsbUJBQW1CLGlDQUFPLG1CQUFtQjtBQUFBLEVBQzdDLG1CQUFtQixpQ0FBTyxtQkFBbUI7QUFBQSxFQUM3QyxvQkFBb0IsaUNBQU8sb0JBQW9CO0FBQUEsRUFDL0MscUJBQXFCO0FBQUEsRUFDckIscUJBQXFCO0FBQUEsRUFDckIsb0JBQW9CO0FBQUEsRUFDcEIsd0JBQXdCO0FBQUEsRUFFeEIsS0FBSyxLQUFLLElBQUk7QUFBQSxFQUVkO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQSx1QkFBdUIsTUFBTSxvQ0FBQyxhQUFJLG1CQUFpQjtBQUNyRCxJQTdEd0I7QUErRHhCLElBQU8sK0JBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVPLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxPQUFPO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsTUFDSixJQUFJO0FBQUEsTUFDSixXQUFXO0FBQUEsTUFDWCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3BCLFFBQVE7QUFBQSxRQUNOLGFBQWE7QUFBQSxRQUNiLE9BQU8sMkJBQWE7QUFBQSxNQUN0QjtBQUFBLE1BQ0EsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGO0FBRUEsU0FBTyxvQ0FBQztBQUFBLE9BQWlCLGdCQUFnQjtBQUFBLElBQUc7QUFBQSxJQUFZO0FBQUEsR0FBWTtBQUN0RSxHQWhCNEI7QUFrQnJCLE1BQU0sZUFBZSw2QkFBbUI7QUFDN0MsUUFBTSxRQUFRO0FBQUEsSUFDWjtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFdBQ1YsMERBQXVCO0FBQUEsUUFDMUIsTUFBTTtBQUFBLE1BQ1I7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsSUFDUjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLFNBQVM7QUFBQSxRQUNULFNBQVMsMERBQXVCO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osUUFBUSwwREFBdUI7QUFBQSxNQUNqQztBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixRQUFRLDBEQUF1QjtBQUFBLFFBQy9CLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGNBQWMsS0FBSyxJQUFJLElBQUk7QUFBQSxRQUMzQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixjQUFjLEtBQUssSUFBSSxJQUFJO0FBQUEsUUFDM0IsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsV0FBVyxLQUFLLElBQUk7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFFSixVQUFVLHdCQUFTO0FBQUEsUUFDbkIsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsV0FBVyxLQUFLLElBQUk7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFFSixVQUFVLHdCQUFTO0FBQUEsUUFDbkIsYUFBYTtBQUFBLFFBQ2IsYUFBYTtBQUFBLFFBQ2IsY0FBYztBQUFBLFFBQ2QsV0FBVyxLQUFLLElBQUk7QUFBQSxNQUN0QjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFFSixVQUFVLHdCQUFTO0FBQUEsUUFDbkIsY0FBYyxLQUFLLElBQUksSUFBSTtBQUFBLFFBQzNCLGFBQWE7QUFBQSxRQUNiLGFBQWE7QUFBQSxRQUNiLGNBQWM7QUFBQSxRQUNkLFdBQVcsS0FBSyxJQUFJO0FBQUEsTUFDdEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGNBQWMsS0FBSyxJQUFJLElBQUk7QUFBQSxRQUMzQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixhQUFhO0FBQUEsUUFDYixhQUFhO0FBQUEsUUFDYixjQUFjO0FBQUEsUUFDZCxXQUFXLEtBQUssSUFBSTtBQUFBLE1BQ3RCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQixnQkFBZ0I7QUFBQSxRQUNoQixTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYSxLQUFLLElBQUk7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFFSixVQUFVLHdCQUFTO0FBQUEsUUFDbkIsZ0JBQWdCO0FBQUEsUUFDaEIsU0FBUztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWEsS0FBSyxJQUFJO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLFFBQ2hCLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWEsS0FBSyxJQUFJO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLDBCQUEwQjtBQUFBLFFBQzFCLGdCQUFnQjtBQUFBLFFBQ2hCLFNBQVM7QUFBQSxVQUNQLFdBQVc7QUFBQSxVQUNYLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUVKLFVBQVUsd0JBQVM7QUFBQSxRQUNuQiwwQkFBMEI7QUFBQSxRQUMxQixnQkFBZ0I7QUFBQSxRQUNoQixTQUFTO0FBQUEsVUFDUCxXQUFXO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixPQUFPO0FBQUEsUUFDVDtBQUFBLFFBQ0EsT0FBTztBQUFBLFFBQ1AsYUFBYTtBQUFBLFFBQ2IsWUFBWTtBQUFBLFFBQ1osYUFBYSxLQUFLLElBQUk7QUFBQSxNQUN4QjtBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFFSixVQUFVLHdCQUFTO0FBQUEsUUFDbkIsZ0JBQWdCO0FBQUEsUUFDaEIsU0FBUztBQUFBLFVBQ1AsV0FBVztBQUFBLFVBQ1gsTUFBTTtBQUFBLFVBQ04sT0FBTztBQUFBLFFBQ1Q7QUFBQSxRQUNBLE9BQU87QUFBQSxRQUNQLGFBQWE7QUFBQSxRQUNiLFlBQVk7QUFBQSxRQUNaLGFBQWEsS0FBSyxJQUFJO0FBQUEsTUFDeEI7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBRUosVUFBVSx3QkFBUztBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLFFBQ2hCLFNBQVM7QUFBQSxVQUNQLFdBQVc7QUFBQSxVQUNYLE1BQU07QUFBQSxVQUNOLE9BQU87QUFBQSxRQUNUO0FBQUEsUUFDQSxPQUFPO0FBQUEsUUFDUCxhQUFhO0FBQUEsUUFDYixZQUFZO0FBQUEsUUFDWixhQUFhLEtBQUssSUFBSTtBQUFBLE1BQ3hCO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLFFBQVE7QUFBQSxVQUNOLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNYO0FBQUEsUUFDQSxnQkFBZ0IsMERBQXVCO0FBQUEsTUFDekM7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLElBQ1I7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixlQUFlO0FBQUEsUUFDZixTQUFTLDBEQUF1QjtBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLGVBQWU7QUFBQSxRQUNmLFNBQVMsMERBQXVCO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUywwREFBdUI7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsUUFDSixNQUFNO0FBQUEsUUFDTixTQUFTO0FBQUEsUUFDVCxTQUFTLDBEQUF1QjtBQUFBLE1BQ2xDO0FBQUEsSUFDRjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxRQUNKLE1BQU07QUFBQSxRQUNOLFNBQVM7QUFBQSxRQUNULFNBQVMsMERBQXVCO0FBQUEsTUFDbEM7QUFBQSxJQUNGO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLFFBQ0osTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsU0FBUywwREFBdUI7QUFBQSxNQUNsQztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FDRSwwREFDRyxNQUFNLElBQUksQ0FBQyxNQUFNLFVBQ2hCLG9DQUFDLE1BQU0sVUFBTjtBQUFBLElBQWUsS0FBSztBQUFBLEtBQ25CLG9DQUFDO0FBQUEsT0FDSyxnQkFBZ0I7QUFBQSxJQUNwQjtBQUFBLElBQ0E7QUFBQSxHQUNGLENBQ0YsQ0FDRCxDQUNIO0FBRUosR0E5VzRCO0FBZ1hyQixNQUFNLGNBQWMsNkJBQW1CO0FBQzVDLFFBQU0sT0FBTztBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLE1BQ0osVUFBVTtBQUFBLElBQ1o7QUFBQSxFQUVGO0FBRUEsU0FBTyxvQ0FBQztBQUFBLE9BQWlCLGdCQUFnQjtBQUFBLElBQUc7QUFBQSxJQUFZO0FBQUEsR0FBWTtBQUN0RSxHQVYyQjtBQVlwQixNQUFNLGNBQWMsNkJBQW1CO0FBRTVDLFFBQU0sT0FBTztBQUViLFNBQU8sb0NBQUM7QUFBQSxPQUFpQixnQkFBZ0I7QUFBQSxJQUFHO0FBQUEsSUFBWTtBQUFBLEdBQVk7QUFDdEUsR0FMMkI7IiwKICAibmFtZXMiOiBbXQp9Cg==
