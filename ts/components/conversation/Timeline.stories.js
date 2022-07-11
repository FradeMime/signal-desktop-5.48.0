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
var Timeline_stories_exports = {};
__export(Timeline_stories_exports, {
  EmptyJustHero: () => EmptyJustHero,
  LastSeen: () => LastSeen,
  OldestAndNewest: () => OldestAndNewest,
  TargetIndexToTop: () => TargetIndexToTop,
  TypingIndicator: () => TypingIndicator,
  WithActiveMessageRequest: () => WithActiveMessageRequest,
  WithInvitedContactsForANewlyCreatedGroup: () => WithInvitedContactsForANewlyCreatedGroup,
  WithSameNameInDirectConversationWarning: () => WithSameNameInDirectConversationWarning,
  WithSameNameInGroupConversationWarning: () => WithSameNameInGroupConversationWarning,
  WithoutNewestMessage: () => WithoutNewestMessage,
  WithoutNewestMessageActiveMessageRequest: () => WithoutNewestMessageActiveMessageRequest,
  WithoutOldestMessage: () => WithoutOldestMessage,
  default: () => Timeline_stories_default
});
module.exports = __toCommonJS(Timeline_stories_exports);
var React = __toESM(require("react"));
var moment = __toESM(require("moment"));
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_Timeline = require("./Timeline");
var import_TimelineItem = require("./TimelineItem");
var import_ContactSpoofingReviewDialog = require("./ContactSpoofingReviewDialog");
var import_StorybookThemeContext = require("../../../.storybook/StorybookThemeContext");
var import_ConversationHero = require("./ConversationHero");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_getRandomColor = require("../../test-both/helpers/getRandomColor");
var import_TypingBubble = require("./TypingBubble");
var import_contactSpoofing = require("../../util/contactSpoofing");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_Util = require("../../types/Util");
var import_Message = require("./Message");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var Timeline_stories_default = {
  title: "Components/Conversation/Timeline"
};
const noop = /* @__PURE__ */ __name(() => {
}, "noop");
Object.assign(window, {
  registerForActive: noop,
  unregisterForActive: noop
});
const items = {
  "id-1": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({
        phoneNumber: "(202) 555-2001"
      }),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "forest",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "incoming",
      id: "id-1",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      text: "\u{1F525}",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-2": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "forest",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "incoming",
      id: "id-2",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      text: "Hello there from the new world! http://somewhere.com",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-2.5": {
    type: "unsupportedMessage",
    data: {
      canProcessNow: false,
      contact: {
        id: "061d3783-5736-4145-b1a2-6b6cf1156393",
        isMe: false,
        phoneNumber: "(202) 555-1000",
        profileName: "Mr. Pig",
        title: "Mr. Pig"
      }
    },
    timestamp: Date.now()
  },
  "id-3": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "crimson",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "incoming",
      id: "id-3",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      text: "Hello there from the new world!",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-4": {
    type: "timerNotification",
    data: {
      disabled: false,
      expireTimer: moment.duration(2, "hours").asSeconds(),
      title: "It's Me",
      type: "fromMe"
    },
    timestamp: Date.now()
  },
  "id-5": {
    type: "timerNotification",
    data: {
      disabled: false,
      expireTimer: moment.duration(2, "hours").asSeconds(),
      title: "(202) 555-0000",
      type: "fromOther"
    },
    timestamp: Date.now()
  },
  "id-6": {
    type: "safetyNumberNotification",
    data: {
      contact: {
        id: "+1202555000",
        title: "Mr. Fire"
      },
      isGroup: true
    },
    timestamp: Date.now()
  },
  "id-7": {
    type: "verificationNotification",
    data: {
      contact: { title: "Mrs. Ice" },
      isLocal: true,
      type: "markVerified"
    },
    timestamp: Date.now()
  },
  "id-8": {
    type: "groupNotification",
    data: {
      changes: [
        {
          type: "name",
          newName: "Squirrels and their uses"
        },
        {
          type: "add",
          contacts: [
            (0, import_getDefaultConversation.getDefaultConversation)({
              phoneNumber: "(202) 555-0002",
              title: "Mr. Fire"
            }),
            (0, import_getDefaultConversation.getDefaultConversation)({
              phoneNumber: "(202) 555-0003",
              title: "Ms. Water"
            })
          ]
        }
      ],
      from: (0, import_getDefaultConversation.getDefaultConversation)({
        phoneNumber: "(202) 555-0001",
        title: "Mrs. Ice",
        isMe: false
      })
    },
    timestamp: Date.now()
  },
  "id-9": {
    type: "resetSessionNotification",
    data: null,
    timestamp: Date.now()
  },
  "id-10": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "plum",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "outgoing",
      id: "id-6",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      status: "sent",
      text: "\u{1F525}",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-11": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "crimson",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "outgoing",
      id: "id-7",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      status: "read",
      text: "Hello there from the new world! http://somewhere.com",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-12": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "crimson",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "outgoing",
      id: "id-8",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      status: "sent",
      text: "Hello there from the new world! \u{1F525}",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-13": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "crimson",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "outgoing",
      id: "id-9",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      status: "sent",
      text: "Hello there from the new world! And this is multiple lines of text. Lines and lines and lines.",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  },
  "id-14": {
    type: "message",
    data: {
      author: (0, import_getDefaultConversation.getDefaultConversation)({}),
      canDeleteForEveryone: false,
      canDownload: true,
      canReact: true,
      canReply: true,
      canRetry: true,
      canRetryDeleteForEveryone: true,
      conversationColor: "crimson",
      conversationId: "conversation-id",
      conversationTitle: "Conversation Title",
      conversationType: "group",
      direction: "outgoing",
      id: "id-10",
      isBlocked: false,
      isMessageRequestAccepted: true,
      previews: [],
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      status: "read",
      text: "Hello there from the new world! And this is multiple lines of text. Lines and lines and lines.",
      textDirection: import_Message.TextDirection.Default,
      timestamp: Date.now()
    },
    timestamp: Date.now()
  }
};
const actions = /* @__PURE__ */ __name(() => ({
  acknowledgeGroupMemberNameCollisions: (0, import_addon_actions.action)("acknowledgeGroupMemberNameCollisions"),
  blockGroupLinkRequests: (0, import_addon_actions.action)("blockGroupLinkRequests"),
  checkForAccount: (0, import_addon_actions.action)("checkForAccount"),
  clearInvitedUuidsForNewlyCreatedGroup: (0, import_addon_actions.action)("clearInvitedUuidsForNewlyCreatedGroup"),
  setIsNearBottom: (0, import_addon_actions.action)("setIsNearBottom"),
  learnMoreAboutDeliveryIssue: (0, import_addon_actions.action)("learnMoreAboutDeliveryIssue"),
  loadOlderMessages: (0, import_addon_actions.action)("loadOlderMessages"),
  loadNewerMessages: (0, import_addon_actions.action)("loadNewerMessages"),
  loadNewestMessages: (0, import_addon_actions.action)("loadNewestMessages"),
  markMessageRead: (0, import_addon_actions.action)("markMessageRead"),
  selectMessage: (0, import_addon_actions.action)("selectMessage"),
  clearSelectedMessage: (0, import_addon_actions.action)("clearSelectedMessage"),
  updateSharedGroups: (0, import_addon_actions.action)("updateSharedGroups"),
  reactToMessage: (0, import_addon_actions.action)("reactToMessage"),
  replyToMessage: (0, import_addon_actions.action)("replyToMessage"),
  retryDeleteForEveryone: (0, import_addon_actions.action)("retryDeleteForEveryone"),
  retrySend: (0, import_addon_actions.action)("retrySend"),
  deleteMessage: (0, import_addon_actions.action)("deleteMessage"),
  deleteMessageForEveryone: (0, import_addon_actions.action)("deleteMessageForEveryone"),
  showMessageDetail: (0, import_addon_actions.action)("showMessageDetail"),
  openConversation: (0, import_addon_actions.action)("openConversation"),
  showContactDetail: (0, import_addon_actions.action)("showContactDetail"),
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  kickOffAttachmentDownload: (0, import_addon_actions.action)("kickOffAttachmentDownload"),
  markAttachmentAsCorrupted: (0, import_addon_actions.action)("markAttachmentAsCorrupted"),
  markViewed: (0, import_addon_actions.action)("markViewed"),
  messageExpanded: (0, import_addon_actions.action)("messageExpanded"),
  showVisualAttachment: (0, import_addon_actions.action)("showVisualAttachment"),
  downloadAttachment: (0, import_addon_actions.action)("downloadAttachment"),
  displayTapToViewMessage: (0, import_addon_actions.action)("displayTapToViewMessage"),
  doubleCheckMissingQuoteReference: (0, import_addon_actions.action)("doubleCheckMissingQuoteReference"),
  openLink: (0, import_addon_actions.action)("openLink"),
  openGiftBadge: (0, import_addon_actions.action)("openGiftBadge"),
  scrollToQuotedMessage: (0, import_addon_actions.action)("scrollToQuotedMessage"),
  showExpiredIncomingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  showExpiredOutgoingTapToViewToast: (0, import_addon_actions.action)("showExpiredOutgoingTapToViewToast"),
  showForwardMessageModal: (0, import_addon_actions.action)("showForwardMessageModal"),
  showIdentity: (0, import_addon_actions.action)("showIdentity"),
  downloadNewVersion: (0, import_addon_actions.action)("downloadNewVersion"),
  startCallingLobby: (0, import_addon_actions.action)("startCallingLobby"),
  startConversation: (0, import_addon_actions.action)("startConversation"),
  returnToActiveCall: (0, import_addon_actions.action)("returnToActiveCall"),
  contactSupport: (0, import_addon_actions.action)("contactSupport"),
  closeContactSpoofingReview: (0, import_addon_actions.action)("closeContactSpoofingReview"),
  reviewGroupMemberNameCollision: (0, import_addon_actions.action)("reviewGroupMemberNameCollision"),
  reviewMessageRequestNameCollision: (0, import_addon_actions.action)("reviewMessageRequestNameCollision"),
  onBlock: (0, import_addon_actions.action)("onBlock"),
  onBlockAndReportSpam: (0, import_addon_actions.action)("onBlockAndReportSpam"),
  onDelete: (0, import_addon_actions.action)("onDelete"),
  onUnblock: (0, import_addon_actions.action)("onUnblock"),
  removeMember: (0, import_addon_actions.action)("removeMember"),
  unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
  peekGroupCallForTheFirstTime: (0, import_addon_actions.action)("peekGroupCallForTheFirstTime"),
  peekGroupCallIfItHasMembers: (0, import_addon_actions.action)("peekGroupCallIfItHasMembers")
}), "actions");
const renderItem = /* @__PURE__ */ __name(({
  messageId,
  containerElementRef,
  containerWidthBreakpoint
}) => /* @__PURE__ */ React.createElement(import_TimelineItem.TimelineItem, {
  getPreferredBadge: () => void 0,
  id: "",
  isSelected: false,
  renderEmojiPicker: () => /* @__PURE__ */ React.createElement("div", null),
  renderReactionPicker: () => /* @__PURE__ */ React.createElement("div", null),
  item: items[messageId],
  i18n,
  interactionMode: "keyboard",
  isNextItemCallingNotification: false,
  theme: import_Util.ThemeType.light,
  containerElementRef,
  containerWidthBreakpoint,
  conversationId: "",
  renderContact: () => "*ContactName*",
  renderUniversalTimerNotification: () => /* @__PURE__ */ React.createElement("div", null, "*UniversalTimerNotification*"),
  renderAudioAttachment: () => /* @__PURE__ */ React.createElement("div", null, "*AudioAttachment*"),
  shouldCollapseAbove: false,
  shouldCollapseBelow: false,
  shouldHideMetadata: false,
  shouldRenderDateHeader: false,
  ...actions()
}), "renderItem");
const renderContactSpoofingReviewDialog = /* @__PURE__ */ __name((props) => {
  if (props.type === import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle) {
    return /* @__PURE__ */ React.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
      ...props,
      group: {
        ...(0, import_getDefaultConversation.getDefaultConversation)(),
        areWeAdmin: true
      }
    });
  }
  return /* @__PURE__ */ React.createElement(import_ContactSpoofingReviewDialog.ContactSpoofingReviewDialog, {
    ...props
  });
}, "renderContactSpoofingReviewDialog");
const getAbout = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("about", "\u{1F44D} Free to chat"), "getAbout");
const getTitle = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("name", "Cayce Bollard"), "getTitle");
const getName = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("name", "Cayce Bollard"), "getName");
const getProfileName = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("profileName", "Cayce Bollard (profile)"), "getProfileName");
const getAvatarPath = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("avatarPath", "/fixtures/kitten-4-112-112.jpg"), "getAvatarPath");
const getPhoneNumber = /* @__PURE__ */ __name(() => (0, import_addon_knobs.text)("phoneNumber", "+1 (808) 555-1234"), "getPhoneNumber");
const renderHeroRow = /* @__PURE__ */ __name(() => {
  const Wrapper = /* @__PURE__ */ __name(() => {
    const theme = React.useContext(import_StorybookThemeContext.StorybookThemeContext);
    return /* @__PURE__ */ React.createElement(import_ConversationHero.ConversationHero, {
      about: getAbout(),
      acceptedMessageRequest: true,
      badge: void 0,
      i18n,
      isMe: false,
      title: getTitle(),
      avatarPath: getAvatarPath(),
      name: getName(),
      profileName: getProfileName(),
      phoneNumber: getPhoneNumber(),
      conversationType: "direct",
      sharedGroupNames: ["NYC Rock Climbers", "Dinner Party"],
      theme,
      unblurAvatar: (0, import_addon_actions.action)("unblurAvatar"),
      updateSharedGroups: noop
    });
  }, "Wrapper");
  return /* @__PURE__ */ React.createElement(Wrapper, null);
}, "renderHeroRow");
const renderTypingBubble = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_TypingBubble.TypingBubble, {
  acceptedMessageRequest: true,
  badge: void 0,
  color: (0, import_getRandomColor.getRandomColor)(),
  conversationType: "direct",
  phoneNumber: "+18005552222",
  i18n,
  isMe: false,
  title: "title",
  theme: import_Util.ThemeType.light,
  sharedGroupNames: []
}), "renderTypingBubble");
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  discardMessages: (0, import_addon_actions.action)("discardMessages"),
  getPreferredBadge: () => void 0,
  i18n,
  theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
  getTimestampForMessage: Date.now,
  haveNewest: (0, import_addon_knobs.boolean)("haveNewest", overrideProps.haveNewest !== false),
  haveOldest: (0, import_addon_knobs.boolean)("haveOldest", overrideProps.haveOldest !== false),
  isConversationSelected: true,
  isIncomingMessageRequest: (0, import_addon_knobs.boolean)("isIncomingMessageRequest", overrideProps.isIncomingMessageRequest === true),
  items: overrideProps.items || Object.keys(items),
  messageChangeCounter: 0,
  scrollToIndex: overrideProps.scrollToIndex,
  scrollToIndexCounter: 0,
  totalUnseen: (0, import_addon_knobs.number)("totalUnseen", overrideProps.totalUnseen || 0),
  oldestUnseenIndex: (0, import_addon_knobs.number)("oldestUnseenIndex", overrideProps.oldestUnseenIndex || 0) || void 0,
  invitedContactsForNewlyCreatedGroup: overrideProps.invitedContactsForNewlyCreatedGroup || [],
  warning: overrideProps.warning,
  id: (0, import_uuid.v4)(),
  renderItem,
  renderHeroRow,
  renderTypingBubble,
  renderContactSpoofingReviewDialog,
  isSomeoneTyping: overrideProps.isSomeoneTyping || false,
  ...actions()
}), "useProps");
const OldestAndNewest = /* @__PURE__ */ __name(() => {
  const props = useProps();
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "OldestAndNewest");
OldestAndNewest.story = {
  name: "Oldest and Newest"
};
const WithActiveMessageRequest = /* @__PURE__ */ __name(() => {
  const props = useProps({
    isIncomingMessageRequest: true
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithActiveMessageRequest");
WithActiveMessageRequest.story = {
  name: "With active message request"
};
const WithoutNewestMessage = /* @__PURE__ */ __name(() => {
  const props = useProps({
    haveNewest: false
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithoutNewestMessage");
const WithoutNewestMessageActiveMessageRequest = /* @__PURE__ */ __name(() => {
  const props = useProps({
    haveOldest: false,
    isIncomingMessageRequest: true
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithoutNewestMessageActiveMessageRequest");
WithoutNewestMessageActiveMessageRequest.story = {
  name: "Without newest message, active message request"
};
const WithoutOldestMessage = /* @__PURE__ */ __name(() => {
  const props = useProps({
    haveOldest: false,
    scrollToIndex: -1
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithoutOldestMessage");
const EmptyJustHero = /* @__PURE__ */ __name(() => {
  const props = useProps({
    items: []
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "EmptyJustHero");
EmptyJustHero.story = {
  name: "Empty (just hero)"
};
const LastSeen = /* @__PURE__ */ __name(() => {
  const props = useProps({
    oldestUnseenIndex: 13,
    totalUnseen: 2
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "LastSeen");
const TargetIndexToTop = /* @__PURE__ */ __name(() => {
  const props = useProps({
    scrollToIndex: 0
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "TargetIndexToTop");
TargetIndexToTop.story = {
  name: "Target Index to Top"
};
const TypingIndicator = /* @__PURE__ */ __name(() => {
  const props = useProps({ isSomeoneTyping: true });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "TypingIndicator");
const WithInvitedContactsForANewlyCreatedGroup = /* @__PURE__ */ __name(() => {
  const props = useProps({
    invitedContactsForNewlyCreatedGroup: [
      (0, import_getDefaultConversation.getDefaultConversation)({
        id: "abc123",
        title: "John Bon Bon Jovi"
      }),
      (0, import_getDefaultConversation.getDefaultConversation)({
        id: "def456",
        title: "Bon John Bon Jovi"
      })
    ]
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithInvitedContactsForANewlyCreatedGroup");
WithInvitedContactsForANewlyCreatedGroup.story = {
  name: "With invited contacts for a newly-created group"
};
const WithSameNameInDirectConversationWarning = /* @__PURE__ */ __name(() => {
  const props = useProps({
    warning: {
      type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
      safeConversation: (0, import_getDefaultConversation.getDefaultConversation)()
    },
    items: []
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithSameNameInDirectConversationWarning");
WithSameNameInDirectConversationWarning.story = {
  name: 'With "same name in direct conversation" warning'
};
const WithSameNameInGroupConversationWarning = /* @__PURE__ */ __name(() => {
  const props = useProps({
    warning: {
      type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
      acknowledgedGroupNameCollisions: {},
      groupNameCollisions: {
        Alice: (0, import_lodash.times)(2, () => (0, import_uuid.v4)()),
        Bob: (0, import_lodash.times)(3, () => (0, import_uuid.v4)())
      }
    },
    items: []
  });
  return /* @__PURE__ */ React.createElement(import_Timeline.Timeline, {
    ...props
  });
}, "WithSameNameInGroupConversationWarning");
WithSameNameInGroupConversationWarning.story = {
  name: 'With "same name in group conversation" warning'
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  EmptyJustHero,
  LastSeen,
  OldestAndNewest,
  TargetIndexToTop,
  TypingIndicator,
  WithActiveMessageRequest,
  WithInvitedContactsForANewlyCreatedGroup,
  WithSameNameInDirectConversationWarning,
  WithSameNameInGroupConversationWarning,
  WithoutNewestMessage,
  WithoutNewestMessageActiveMessageRequest,
  WithoutOldestMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgKiBhcyBtb21lbnQgZnJvbSAnbW9tZW50JztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHY0IGFzIHV1aWQgfSBmcm9tICd1dWlkJztcbmltcG9ydCB7IHRleHQsIGJvb2xlYW4sIG51bWJlciB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcblxuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vVGltZWxpbmUnO1xuaW1wb3J0IHsgVGltZWxpbmUgfSBmcm9tICcuL1RpbWVsaW5lJztcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtVHlwZSB9IGZyb20gJy4vVGltZWxpbmVJdGVtJztcbmltcG9ydCB7IFRpbWVsaW5lSXRlbSB9IGZyb20gJy4vVGltZWxpbmVJdGVtJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZyB9IGZyb20gJy4vQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nJztcbmltcG9ydCB7IFN0b3J5Ym9va1RoZW1lQ29udGV4dCB9IGZyb20gJy4uLy4uLy4uLy5zdG9yeWJvb2svU3Rvcnlib29rVGhlbWVDb250ZXh0JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkhlcm8gfSBmcm9tICcuL0NvbnZlcnNhdGlvbkhlcm8nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgYXMgU21hcnRDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2dQcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9zbWFydC9Db250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2cnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQ29sb3IgfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXRSYW5kb21Db2xvcic7XG5pbXBvcnQgeyBUeXBpbmdCdWJibGUgfSBmcm9tICcuL1R5cGluZ0J1YmJsZSc7XG5pbXBvcnQgeyBDb250YWN0U3Bvb2ZpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9jb250YWN0U3Bvb2ZpbmcnO1xuaW1wb3J0IHsgUmVhZFN0YXR1cyB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VSZWFkU3RhdHVzJztcbmltcG9ydCB0eXBlIHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vX3V0aWwnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBUZXh0RGlyZWN0aW9uIH0gZnJvbSAnLi9NZXNzYWdlJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ29udmVyc2F0aW9uL1RpbWVsaW5lJyxcbn07XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZVxuY29uc3Qgbm9vcCA9ICgpID0+IHt9O1xuXG5PYmplY3QuYXNzaWduKHdpbmRvdywge1xuICByZWdpc3RlckZvckFjdGl2ZTogbm9vcCxcbiAgdW5yZWdpc3RlckZvckFjdGl2ZTogbm9vcCxcbn0pO1xuXG5jb25zdCBpdGVtczogUmVjb3JkPHN0cmluZywgVGltZWxpbmVJdGVtVHlwZT4gPSB7XG4gICdpZC0xJzoge1xuICAgIHR5cGU6ICdtZXNzYWdlJyxcbiAgICBkYXRhOiB7XG4gICAgICBhdXRob3I6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0yMDAxJyxcbiAgICAgIH0pLFxuICAgICAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgY2FuRG93bmxvYWQ6IHRydWUsXG4gICAgICBjYW5SZWFjdDogdHJ1ZSxcbiAgICAgIGNhblJlcGx5OiB0cnVlLFxuICAgICAgY2FuUmV0cnk6IHRydWUsXG4gICAgICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6ICdmb3Jlc3QnLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQnLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6ICdDb252ZXJzYXRpb24gVGl0bGUnLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgICAgIGlkOiAnaWQtMScsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgdGV4dDogJ1x1RDgzRFx1REQyNScsXG4gICAgICB0ZXh0RGlyZWN0aW9uOiBUZXh0RGlyZWN0aW9uLkRlZmF1bHQsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC0yJzoge1xuICAgIHR5cGU6ICdtZXNzYWdlJyxcbiAgICBkYXRhOiB7XG4gICAgICBhdXRob3I6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe30pLFxuICAgICAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgY2FuRG93bmxvYWQ6IHRydWUsXG4gICAgICBjYW5SZWFjdDogdHJ1ZSxcbiAgICAgIGNhblJlcGx5OiB0cnVlLFxuICAgICAgY2FuUmV0cnk6IHRydWUsXG4gICAgICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6ICdmb3Jlc3QnLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQnLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6ICdDb252ZXJzYXRpb24gVGl0bGUnLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgICAgIGlkOiAnaWQtMicsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gdGhlIG5ldyB3b3JsZCEgaHR0cDovL3NvbWV3aGVyZS5jb20nLFxuICAgICAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbi5EZWZhdWx0LFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH0sXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICB9LFxuICAnaWQtMi41Jzoge1xuICAgIHR5cGU6ICd1bnN1cHBvcnRlZE1lc3NhZ2UnLFxuICAgIGRhdGE6IHtcbiAgICAgIGNhblByb2Nlc3NOb3c6IGZhbHNlLFxuICAgICAgY29udGFjdDoge1xuICAgICAgICBpZDogJzA2MWQzNzgzLTU3MzYtNDE0NS1iMWEyLTZiNmNmMTE1NjM5MycsXG4gICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0xMDAwJyxcbiAgICAgICAgcHJvZmlsZU5hbWU6ICdNci4gUGlnJyxcbiAgICAgICAgdGl0bGU6ICdNci4gUGlnJyxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC0zJzoge1xuICAgIHR5cGU6ICdtZXNzYWdlJyxcbiAgICBkYXRhOiB7XG4gICAgICBhdXRob3I6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe30pLFxuICAgICAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgY2FuRG93bmxvYWQ6IHRydWUsXG4gICAgICBjYW5SZWFjdDogdHJ1ZSxcbiAgICAgIGNhblJlcGx5OiB0cnVlLFxuICAgICAgY2FuUmV0cnk6IHRydWUsXG4gICAgICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6ICdjcmltc29uJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkJyxcbiAgICAgIGNvbnZlcnNhdGlvblRpdGxlOiAnQ29udmVyc2F0aW9uIFRpdGxlJyxcbiAgICAgIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG4gICAgICBkaXJlY3Rpb246ICdpbmNvbWluZycsXG4gICAgICBpZDogJ2lkLTMnLFxuICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogdHJ1ZSxcbiAgICAgIHByZXZpZXdzOiBbXSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHRleHQ6ICdIZWxsbyB0aGVyZSBmcm9tIHRoZSBuZXcgd29ybGQhJyxcbiAgICAgIHRleHREaXJlY3Rpb246IFRleHREaXJlY3Rpb24uRGVmYXVsdCxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgfSxcbiAgJ2lkLTQnOiB7XG4gICAgdHlwZTogJ3RpbWVyTm90aWZpY2F0aW9uJyxcbiAgICBkYXRhOiB7XG4gICAgICBkaXNhYmxlZDogZmFsc2UsXG4gICAgICBleHBpcmVUaW1lcjogbW9tZW50LmR1cmF0aW9uKDIsICdob3VycycpLmFzU2Vjb25kcygpLFxuICAgICAgdGl0bGU6IFwiSXQncyBNZVwiLFxuICAgICAgdHlwZTogJ2Zyb21NZScsXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC01Jzoge1xuICAgIHR5cGU6ICd0aW1lck5vdGlmaWNhdGlvbicsXG4gICAgZGF0YToge1xuICAgICAgZGlzYWJsZWQ6IGZhbHNlLFxuICAgICAgZXhwaXJlVGltZXI6IG1vbWVudC5kdXJhdGlvbigyLCAnaG91cnMnKS5hc1NlY29uZHMoKSxcbiAgICAgIHRpdGxlOiAnKDIwMikgNTU1LTAwMDAnLFxuICAgICAgdHlwZTogJ2Zyb21PdGhlcicsXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC02Jzoge1xuICAgIHR5cGU6ICdzYWZldHlOdW1iZXJOb3RpZmljYXRpb24nLFxuICAgIGRhdGE6IHtcbiAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgaWQ6ICcrMTIwMjU1NTAwMCcsXG4gICAgICAgIHRpdGxlOiAnTXIuIEZpcmUnLFxuICAgICAgfSxcbiAgICAgIGlzR3JvdXA6IHRydWUsXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC03Jzoge1xuICAgIHR5cGU6ICd2ZXJpZmljYXRpb25Ob3RpZmljYXRpb24nLFxuICAgIGRhdGE6IHtcbiAgICAgIGNvbnRhY3Q6IHsgdGl0bGU6ICdNcnMuIEljZScgfSxcbiAgICAgIGlzTG9jYWw6IHRydWUsXG4gICAgICB0eXBlOiAnbWFya1ZlcmlmaWVkJyxcbiAgICB9LFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgfSxcbiAgJ2lkLTgnOiB7XG4gICAgdHlwZTogJ2dyb3VwTm90aWZpY2F0aW9uJyxcbiAgICBkYXRhOiB7XG4gICAgICBjaGFuZ2VzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnbmFtZScsXG4gICAgICAgICAgbmV3TmFtZTogJ1NxdWlycmVscyBhbmQgdGhlaXIgdXNlcycsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiAnYWRkJyxcbiAgICAgICAgICBjb250YWN0czogW1xuICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTAwMDInLFxuICAgICAgICAgICAgICB0aXRsZTogJ01yLiBGaXJlJyxcbiAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyOiAnKDIwMikgNTU1LTAwMDMnLFxuICAgICAgICAgICAgICB0aXRsZTogJ01zLiBXYXRlcicsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICAgIGZyb206IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICBwaG9uZU51bWJlcjogJygyMDIpIDU1NS0wMDAxJyxcbiAgICAgICAgdGl0bGU6ICdNcnMuIEljZScsXG4gICAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgfSksXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC05Jzoge1xuICAgIHR5cGU6ICdyZXNldFNlc3Npb25Ob3RpZmljYXRpb24nLFxuICAgIGRhdGE6IG51bGwsXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICB9LFxuICAnaWQtMTAnOiB7XG4gICAgdHlwZTogJ21lc3NhZ2UnLFxuICAgIGRhdGE6IHtcbiAgICAgIGF1dGhvcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7fSksXG4gICAgICBjYW5EZWxldGVGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgICAgIGNhblJlYWN0OiB0cnVlLFxuICAgICAgY2FuUmVwbHk6IHRydWUsXG4gICAgICBjYW5SZXRyeTogdHJ1ZSxcbiAgICAgIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogJ3BsdW0nLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQnLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6ICdDb252ZXJzYXRpb24gVGl0bGUnLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIGlkOiAnaWQtNicsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc3RhdHVzOiAnc2VudCcsXG4gICAgICB0ZXh0OiAnXHVEODNEXHVERDI1JyxcbiAgICAgIHRleHREaXJlY3Rpb246IFRleHREaXJlY3Rpb24uRGVmYXVsdCxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICB9LFxuICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgfSxcbiAgJ2lkLTExJzoge1xuICAgIHR5cGU6ICdtZXNzYWdlJyxcbiAgICBkYXRhOiB7XG4gICAgICBhdXRob3I6IGdldERlZmF1bHRDb252ZXJzYXRpb24oe30pLFxuICAgICAgY2FuRGVsZXRlRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgICAgY2FuRG93bmxvYWQ6IHRydWUsXG4gICAgICBjYW5SZWFjdDogdHJ1ZSxcbiAgICAgIGNhblJlcGx5OiB0cnVlLFxuICAgICAgY2FuUmV0cnk6IHRydWUsXG4gICAgICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6ICdjcmltc29uJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkJyxcbiAgICAgIGNvbnZlcnNhdGlvblRpdGxlOiAnQ29udmVyc2F0aW9uIFRpdGxlJyxcbiAgICAgIGNvbnZlcnNhdGlvblR5cGU6ICdncm91cCcsXG4gICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgICBpZDogJ2lkLTcnLFxuICAgICAgaXNCbG9ja2VkOiBmYWxzZSxcbiAgICAgIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogdHJ1ZSxcbiAgICAgIHByZXZpZXdzOiBbXSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgdGV4dDogJ0hlbGxvIHRoZXJlIGZyb20gdGhlIG5ldyB3b3JsZCEgaHR0cDovL3NvbWV3aGVyZS5jb20nLFxuICAgICAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbi5EZWZhdWx0LFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH0sXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICB9LFxuICAnaWQtMTInOiB7XG4gICAgdHlwZTogJ21lc3NhZ2UnLFxuICAgIGRhdGE6IHtcbiAgICAgIGF1dGhvcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7fSksXG4gICAgICBjYW5EZWxldGVGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgICAgIGNhblJlYWN0OiB0cnVlLFxuICAgICAgY2FuUmVwbHk6IHRydWUsXG4gICAgICBjYW5SZXRyeTogdHJ1ZSxcbiAgICAgIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogJ2NyaW1zb24nLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQnLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6ICdDb252ZXJzYXRpb24gVGl0bGUnLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIGlkOiAnaWQtOCcsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc3RhdHVzOiAnc2VudCcsXG4gICAgICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSB0aGUgbmV3IHdvcmxkISBcdUQ4M0RcdUREMjUnLFxuICAgICAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbi5EZWZhdWx0LFxuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgIH0sXG4gICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICB9LFxuICAnaWQtMTMnOiB7XG4gICAgdHlwZTogJ21lc3NhZ2UnLFxuICAgIGRhdGE6IHtcbiAgICAgIGF1dGhvcjogZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7fSksXG4gICAgICBjYW5EZWxldGVGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgICAgIGNhblJlYWN0OiB0cnVlLFxuICAgICAgY2FuUmVwbHk6IHRydWUsXG4gICAgICBjYW5SZXRyeTogdHJ1ZSxcbiAgICAgIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogJ2NyaW1zb24nLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQnLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6ICdDb252ZXJzYXRpb24gVGl0bGUnLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIGlkOiAnaWQtOScsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc3RhdHVzOiAnc2VudCcsXG4gICAgICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSB0aGUgbmV3IHdvcmxkISBBbmQgdGhpcyBpcyBtdWx0aXBsZSBsaW5lcyBvZiB0ZXh0LiBMaW5lcyBhbmQgbGluZXMgYW5kIGxpbmVzLicsXG4gICAgICB0ZXh0RGlyZWN0aW9uOiBUZXh0RGlyZWN0aW9uLkRlZmF1bHQsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG4gICdpZC0xNCc6IHtcbiAgICB0eXBlOiAnbWVzc2FnZScsXG4gICAgZGF0YToge1xuICAgICAgYXV0aG9yOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHt9KSxcbiAgICAgIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICAgIGNhbkRvd25sb2FkOiB0cnVlLFxuICAgICAgY2FuUmVhY3Q6IHRydWUsXG4gICAgICBjYW5SZXBseTogdHJ1ZSxcbiAgICAgIGNhblJldHJ5OiB0cnVlLFxuICAgICAgY2FuUmV0cnlEZWxldGVGb3JFdmVyeW9uZTogdHJ1ZSxcbiAgICAgIGNvbnZlcnNhdGlvbkNvbG9yOiAnY3JpbXNvbicsXG4gICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZCcsXG4gICAgICBjb252ZXJzYXRpb25UaXRsZTogJ0NvbnZlcnNhdGlvbiBUaXRsZScsXG4gICAgICBjb252ZXJzYXRpb25UeXBlOiAnZ3JvdXAnLFxuICAgICAgZGlyZWN0aW9uOiAnb3V0Z29pbmcnLFxuICAgICAgaWQ6ICdpZC0xMCcsXG4gICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgaXNNZXNzYWdlUmVxdWVzdEFjY2VwdGVkOiB0cnVlLFxuICAgICAgcHJldmlld3M6IFtdLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc3RhdHVzOiAncmVhZCcsXG4gICAgICB0ZXh0OiAnSGVsbG8gdGhlcmUgZnJvbSB0aGUgbmV3IHdvcmxkISBBbmQgdGhpcyBpcyBtdWx0aXBsZSBsaW5lcyBvZiB0ZXh0LiBMaW5lcyBhbmQgbGluZXMgYW5kIGxpbmVzLicsXG4gICAgICB0ZXh0RGlyZWN0aW9uOiBUZXh0RGlyZWN0aW9uLkRlZmF1bHQsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgfSxcbiAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gIH0sXG59O1xuXG5jb25zdCBhY3Rpb25zID0gKCkgPT4gKHtcbiAgYWNrbm93bGVkZ2VHcm91cE1lbWJlck5hbWVDb2xsaXNpb25zOiBhY3Rpb24oXG4gICAgJ2Fja25vd2xlZGdlR3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucydcbiAgKSxcbiAgYmxvY2tHcm91cExpbmtSZXF1ZXN0czogYWN0aW9uKCdibG9ja0dyb3VwTGlua1JlcXVlc3RzJyksXG4gIGNoZWNrRm9yQWNjb3VudDogYWN0aW9uKCdjaGVja0ZvckFjY291bnQnKSxcbiAgY2xlYXJJbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cDogYWN0aW9uKFxuICAgICdjbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwJ1xuICApLFxuICBzZXRJc05lYXJCb3R0b206IGFjdGlvbignc2V0SXNOZWFyQm90dG9tJyksXG4gIGxlYXJuTW9yZUFib3V0RGVsaXZlcnlJc3N1ZTogYWN0aW9uKCdsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUnKSxcbiAgbG9hZE9sZGVyTWVzc2FnZXM6IGFjdGlvbignbG9hZE9sZGVyTWVzc2FnZXMnKSxcbiAgbG9hZE5ld2VyTWVzc2FnZXM6IGFjdGlvbignbG9hZE5ld2VyTWVzc2FnZXMnKSxcbiAgbG9hZE5ld2VzdE1lc3NhZ2VzOiBhY3Rpb24oJ2xvYWROZXdlc3RNZXNzYWdlcycpLFxuICBtYXJrTWVzc2FnZVJlYWQ6IGFjdGlvbignbWFya01lc3NhZ2VSZWFkJyksXG4gIHNlbGVjdE1lc3NhZ2U6IGFjdGlvbignc2VsZWN0TWVzc2FnZScpLFxuICBjbGVhclNlbGVjdGVkTWVzc2FnZTogYWN0aW9uKCdjbGVhclNlbGVjdGVkTWVzc2FnZScpLFxuICB1cGRhdGVTaGFyZWRHcm91cHM6IGFjdGlvbigndXBkYXRlU2hhcmVkR3JvdXBzJyksXG5cbiAgcmVhY3RUb01lc3NhZ2U6IGFjdGlvbigncmVhY3RUb01lc3NhZ2UnKSxcbiAgcmVwbHlUb01lc3NhZ2U6IGFjdGlvbigncmVwbHlUb01lc3NhZ2UnKSxcbiAgcmV0cnlEZWxldGVGb3JFdmVyeW9uZTogYWN0aW9uKCdyZXRyeURlbGV0ZUZvckV2ZXJ5b25lJyksXG4gIHJldHJ5U2VuZDogYWN0aW9uKCdyZXRyeVNlbmQnKSxcbiAgZGVsZXRlTWVzc2FnZTogYWN0aW9uKCdkZWxldGVNZXNzYWdlJyksXG4gIGRlbGV0ZU1lc3NhZ2VGb3JFdmVyeW9uZTogYWN0aW9uKCdkZWxldGVNZXNzYWdlRm9yRXZlcnlvbmUnKSxcbiAgc2hvd01lc3NhZ2VEZXRhaWw6IGFjdGlvbignc2hvd01lc3NhZ2VEZXRhaWwnKSxcbiAgb3BlbkNvbnZlcnNhdGlvbjogYWN0aW9uKCdvcGVuQ29udmVyc2F0aW9uJyksXG4gIHNob3dDb250YWN0RGV0YWlsOiBhY3Rpb24oJ3Nob3dDb250YWN0RGV0YWlsJyksXG4gIHNob3dDb250YWN0TW9kYWw6IGFjdGlvbignc2hvd0NvbnRhY3RNb2RhbCcpLFxuICBraWNrT2ZmQXR0YWNobWVudERvd25sb2FkOiBhY3Rpb24oJ2tpY2tPZmZBdHRhY2htZW50RG93bmxvYWQnKSxcbiAgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZDogYWN0aW9uKCdtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkJyksXG4gIG1hcmtWaWV3ZWQ6IGFjdGlvbignbWFya1ZpZXdlZCcpLFxuICBtZXNzYWdlRXhwYW5kZWQ6IGFjdGlvbignbWVzc2FnZUV4cGFuZGVkJyksXG4gIHNob3dWaXN1YWxBdHRhY2htZW50OiBhY3Rpb24oJ3Nob3dWaXN1YWxBdHRhY2htZW50JyksXG4gIGRvd25sb2FkQXR0YWNobWVudDogYWN0aW9uKCdkb3dubG9hZEF0dGFjaG1lbnQnKSxcbiAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IGFjdGlvbignZGlzcGxheVRhcFRvVmlld01lc3NhZ2UnKSxcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IGFjdGlvbignZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnKSxcblxuICBvcGVuTGluazogYWN0aW9uKCdvcGVuTGluaycpLFxuICBvcGVuR2lmdEJhZGdlOiBhY3Rpb24oJ29wZW5HaWZ0QmFkZ2UnKSxcbiAgc2Nyb2xsVG9RdW90ZWRNZXNzYWdlOiBhY3Rpb24oJ3Njcm9sbFRvUXVvdGVkTWVzc2FnZScpLFxuICBzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3Q6IGFjdGlvbihcbiAgICAnc2hvd0V4cGlyZWRJbmNvbWluZ1RhcFRvVmlld1RvYXN0J1xuICApLFxuICBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3Q6IGFjdGlvbihcbiAgICAnc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0J1xuICApLFxuICBzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbDogYWN0aW9uKCdzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCcpLFxuXG4gIHNob3dJZGVudGl0eTogYWN0aW9uKCdzaG93SWRlbnRpdHknKSxcblxuICBkb3dubG9hZE5ld1ZlcnNpb246IGFjdGlvbignZG93bmxvYWROZXdWZXJzaW9uJyksXG5cbiAgc3RhcnRDYWxsaW5nTG9iYnk6IGFjdGlvbignc3RhcnRDYWxsaW5nTG9iYnknKSxcbiAgc3RhcnRDb252ZXJzYXRpb246IGFjdGlvbignc3RhcnRDb252ZXJzYXRpb24nKSxcbiAgcmV0dXJuVG9BY3RpdmVDYWxsOiBhY3Rpb24oJ3JldHVyblRvQWN0aXZlQ2FsbCcpLFxuXG4gIGNvbnRhY3RTdXBwb3J0OiBhY3Rpb24oJ2NvbnRhY3RTdXBwb3J0JyksXG5cbiAgY2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXc6IGFjdGlvbignY2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXcnKSxcbiAgcmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uOiBhY3Rpb24oJ3Jldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbicpLFxuICByZXZpZXdNZXNzYWdlUmVxdWVzdE5hbWVDb2xsaXNpb246IGFjdGlvbihcbiAgICAncmV2aWV3TWVzc2FnZVJlcXVlc3ROYW1lQ29sbGlzaW9uJ1xuICApLFxuXG4gIG9uQmxvY2s6IGFjdGlvbignb25CbG9jaycpLFxuICBvbkJsb2NrQW5kUmVwb3J0U3BhbTogYWN0aW9uKCdvbkJsb2NrQW5kUmVwb3J0U3BhbScpLFxuICBvbkRlbGV0ZTogYWN0aW9uKCdvbkRlbGV0ZScpLFxuICBvblVuYmxvY2s6IGFjdGlvbignb25VbmJsb2NrJyksXG4gIHJlbW92ZU1lbWJlcjogYWN0aW9uKCdyZW1vdmVNZW1iZXInKSxcblxuICB1bmJsdXJBdmF0YXI6IGFjdGlvbigndW5ibHVyQXZhdGFyJyksXG5cbiAgcGVla0dyb3VwQ2FsbEZvclRoZUZpcnN0VGltZTogYWN0aW9uKCdwZWVrR3JvdXBDYWxsRm9yVGhlRmlyc3RUaW1lJyksXG4gIHBlZWtHcm91cENhbGxJZkl0SGFzTWVtYmVyczogYWN0aW9uKCdwZWVrR3JvdXBDYWxsSWZJdEhhc01lbWJlcnMnKSxcbn0pO1xuXG5jb25zdCByZW5kZXJJdGVtID0gKHtcbiAgbWVzc2FnZUlkLFxuICBjb250YWluZXJFbGVtZW50UmVmLFxuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQsXG59OiB7XG4gIG1lc3NhZ2VJZDogc3RyaW5nO1xuICBjb250YWluZXJFbGVtZW50UmVmOiBSZWFjdC5SZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbn0pID0+IChcbiAgPFRpbWVsaW5lSXRlbVxuICAgIGdldFByZWZlcnJlZEJhZGdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgaWQ9XCJcIlxuICAgIGlzU2VsZWN0ZWQ9e2ZhbHNlfVxuICAgIHJlbmRlckVtb2ppUGlja2VyPXsoKSA9PiA8ZGl2IC8+fVxuICAgIHJlbmRlclJlYWN0aW9uUGlja2VyPXsoKSA9PiA8ZGl2IC8+fVxuICAgIGl0ZW09e2l0ZW1zW21lc3NhZ2VJZF19XG4gICAgaTE4bj17aTE4bn1cbiAgICBpbnRlcmFjdGlvbk1vZGU9XCJrZXlib2FyZFwiXG4gICAgaXNOZXh0SXRlbUNhbGxpbmdOb3RpZmljYXRpb249e2ZhbHNlfVxuICAgIHRoZW1lPXtUaGVtZVR5cGUubGlnaHR9XG4gICAgY29udGFpbmVyRWxlbWVudFJlZj17Y29udGFpbmVyRWxlbWVudFJlZn1cbiAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ9e2NvbnRhaW5lcldpZHRoQnJlYWtwb2ludH1cbiAgICBjb252ZXJzYXRpb25JZD1cIlwiXG4gICAgcmVuZGVyQ29udGFjdD17KCkgPT4gJypDb250YWN0TmFtZSonfVxuICAgIHJlbmRlclVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uPXsoKSA9PiAoXG4gICAgICA8ZGl2PipVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbio8L2Rpdj5cbiAgICApfVxuICAgIHJlbmRlckF1ZGlvQXR0YWNobWVudD17KCkgPT4gPGRpdj4qQXVkaW9BdHRhY2htZW50KjwvZGl2Pn1cbiAgICBzaG91bGRDb2xsYXBzZUFib3ZlPXtmYWxzZX1cbiAgICBzaG91bGRDb2xsYXBzZUJlbG93PXtmYWxzZX1cbiAgICBzaG91bGRIaWRlTWV0YWRhdGE9e2ZhbHNlfVxuICAgIHNob3VsZFJlbmRlckRhdGVIZWFkZXI9e2ZhbHNlfVxuICAgIHsuLi5hY3Rpb25zKCl9XG4gIC8+XG4pO1xuXG5jb25zdCByZW5kZXJDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2cgPSAoXG4gIHByb3BzOiBTbWFydENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1Byb3BzVHlwZVxuKSA9PiB7XG4gIGlmIChwcm9wcy50eXBlID09PSBDb250YWN0U3Bvb2ZpbmdUeXBlLk11bHRpcGxlR3JvdXBNZW1iZXJzV2l0aFNhbWVUaXRsZSkge1xuICAgIHJldHVybiAoXG4gICAgICA8Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nXG4gICAgICAgIHsuLi5wcm9wc31cbiAgICAgICAgZ3JvdXA9e3tcbiAgICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgICAgYXJlV2VBZG1pbjogdHJ1ZSxcbiAgICAgICAgfX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiA8Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nIHsuLi5wcm9wc30gLz47XG59O1xuXG5jb25zdCBnZXRBYm91dCA9ICgpID0+IHRleHQoJ2Fib3V0JywgJ1x1RDgzRFx1REM0RCBGcmVlIHRvIGNoYXQnKTtcbmNvbnN0IGdldFRpdGxlID0gKCkgPT4gdGV4dCgnbmFtZScsICdDYXljZSBCb2xsYXJkJyk7XG5jb25zdCBnZXROYW1lID0gKCkgPT4gdGV4dCgnbmFtZScsICdDYXljZSBCb2xsYXJkJyk7XG5jb25zdCBnZXRQcm9maWxlTmFtZSA9ICgpID0+IHRleHQoJ3Byb2ZpbGVOYW1lJywgJ0NheWNlIEJvbGxhcmQgKHByb2ZpbGUpJyk7XG5jb25zdCBnZXRBdmF0YXJQYXRoID0gKCkgPT5cbiAgdGV4dCgnYXZhdGFyUGF0aCcsICcvZml4dHVyZXMva2l0dGVuLTQtMTEyLTExMi5qcGcnKTtcbmNvbnN0IGdldFBob25lTnVtYmVyID0gKCkgPT4gdGV4dCgncGhvbmVOdW1iZXInLCAnKzEgKDgwOCkgNTU1LTEyMzQnKTtcblxuY29uc3QgcmVuZGVySGVyb1JvdyA9ICgpID0+IHtcbiAgY29uc3QgV3JhcHBlciA9ICgpID0+IHtcbiAgICBjb25zdCB0aGVtZSA9IFJlYWN0LnVzZUNvbnRleHQoU3Rvcnlib29rVGhlbWVDb250ZXh0KTtcbiAgICByZXR1cm4gKFxuICAgICAgPENvbnZlcnNhdGlvbkhlcm9cbiAgICAgICAgYWJvdXQ9e2dldEFib3V0KCl9XG4gICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgaXNNZT17ZmFsc2V9XG4gICAgICAgIHRpdGxlPXtnZXRUaXRsZSgpfVxuICAgICAgICBhdmF0YXJQYXRoPXtnZXRBdmF0YXJQYXRoKCl9XG4gICAgICAgIG5hbWU9e2dldE5hbWUoKX1cbiAgICAgICAgcHJvZmlsZU5hbWU9e2dldFByb2ZpbGVOYW1lKCl9XG4gICAgICAgIHBob25lTnVtYmVyPXtnZXRQaG9uZU51bWJlcigpfVxuICAgICAgICBjb252ZXJzYXRpb25UeXBlPVwiZGlyZWN0XCJcbiAgICAgICAgc2hhcmVkR3JvdXBOYW1lcz17WydOWUMgUm9jayBDbGltYmVycycsICdEaW5uZXIgUGFydHknXX1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICB1bmJsdXJBdmF0YXI9e2FjdGlvbigndW5ibHVyQXZhdGFyJyl9XG4gICAgICAgIHVwZGF0ZVNoYXJlZEdyb3Vwcz17bm9vcH1cbiAgICAgIC8+XG4gICAgKTtcbiAgfTtcbiAgcmV0dXJuIDxXcmFwcGVyIC8+O1xufTtcbmNvbnN0IHJlbmRlclR5cGluZ0J1YmJsZSA9ICgpID0+IChcbiAgPFR5cGluZ0J1YmJsZVxuICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICBiYWRnZT17dW5kZWZpbmVkfVxuICAgIGNvbG9yPXtnZXRSYW5kb21Db2xvcigpfVxuICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgIHBob25lTnVtYmVyPVwiKzE4MDA1NTUyMjIyXCJcbiAgICBpMThuPXtpMThufVxuICAgIGlzTWU9e2ZhbHNlfVxuICAgIHRpdGxlPVwidGl0bGVcIlxuICAgIHRoZW1lPXtUaGVtZVR5cGUubGlnaHR9XG4gICAgc2hhcmVkR3JvdXBOYW1lcz17W119XG4gIC8+XG4pO1xuXG5jb25zdCB1c2VQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzVHlwZT4gPSB7fSk6IFByb3BzVHlwZSA9PiAoe1xuICBkaXNjYXJkTWVzc2FnZXM6IGFjdGlvbignZGlzY2FyZE1lc3NhZ2VzJyksXG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiB1bmRlZmluZWQsXG4gIGkxOG4sXG4gIHRoZW1lOiBSZWFjdC51c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCksXG5cbiAgZ2V0VGltZXN0YW1wRm9yTWVzc2FnZTogRGF0ZS5ub3csXG4gIGhhdmVOZXdlc3Q6IGJvb2xlYW4oJ2hhdmVOZXdlc3QnLCBvdmVycmlkZVByb3BzLmhhdmVOZXdlc3QgIT09IGZhbHNlKSxcbiAgaGF2ZU9sZGVzdDogYm9vbGVhbignaGF2ZU9sZGVzdCcsIG92ZXJyaWRlUHJvcHMuaGF2ZU9sZGVzdCAhPT0gZmFsc2UpLFxuICBpc0NvbnZlcnNhdGlvblNlbGVjdGVkOiB0cnVlLFxuICBpc0luY29taW5nTWVzc2FnZVJlcXVlc3Q6IGJvb2xlYW4oXG4gICAgJ2lzSW5jb21pbmdNZXNzYWdlUmVxdWVzdCcsXG4gICAgb3ZlcnJpZGVQcm9wcy5pc0luY29taW5nTWVzc2FnZVJlcXVlc3QgPT09IHRydWVcbiAgKSxcbiAgaXRlbXM6IG92ZXJyaWRlUHJvcHMuaXRlbXMgfHwgT2JqZWN0LmtleXMoaXRlbXMpLFxuICBtZXNzYWdlQ2hhbmdlQ291bnRlcjogMCxcbiAgc2Nyb2xsVG9JbmRleDogb3ZlcnJpZGVQcm9wcy5zY3JvbGxUb0luZGV4LFxuICBzY3JvbGxUb0luZGV4Q291bnRlcjogMCxcbiAgdG90YWxVbnNlZW46IG51bWJlcigndG90YWxVbnNlZW4nLCBvdmVycmlkZVByb3BzLnRvdGFsVW5zZWVuIHx8IDApLFxuICBvbGRlc3RVbnNlZW5JbmRleDpcbiAgICBudW1iZXIoJ29sZGVzdFVuc2VlbkluZGV4Jywgb3ZlcnJpZGVQcm9wcy5vbGRlc3RVbnNlZW5JbmRleCB8fCAwKSB8fFxuICAgIHVuZGVmaW5lZCxcbiAgaW52aXRlZENvbnRhY3RzRm9yTmV3bHlDcmVhdGVkR3JvdXA6XG4gICAgb3ZlcnJpZGVQcm9wcy5pbnZpdGVkQ29udGFjdHNGb3JOZXdseUNyZWF0ZWRHcm91cCB8fCBbXSxcbiAgd2FybmluZzogb3ZlcnJpZGVQcm9wcy53YXJuaW5nLFxuXG4gIGlkOiB1dWlkKCksXG4gIHJlbmRlckl0ZW0sXG4gIHJlbmRlckhlcm9Sb3csXG4gIHJlbmRlclR5cGluZ0J1YmJsZSxcbiAgcmVuZGVyQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nLFxuICBpc1NvbWVvbmVUeXBpbmc6IG92ZXJyaWRlUHJvcHMuaXNTb21lb25lVHlwaW5nIHx8IGZhbHNlLFxuXG4gIC4uLmFjdGlvbnMoKSxcbn0pO1xuXG5leHBvcnQgY29uc3QgT2xkZXN0QW5kTmV3ZXN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcygpO1xuXG4gIHJldHVybiA8VGltZWxpbmUgey4uLnByb3BzfSAvPjtcbn07XG5cbk9sZGVzdEFuZE5ld2VzdC5zdG9yeSA9IHtcbiAgbmFtZTogJ09sZGVzdCBhbmQgTmV3ZXN0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRoQWN0aXZlTWVzc2FnZVJlcXVlc3QgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBpc0luY29taW5nTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8VGltZWxpbmUgey4uLnByb3BzfSAvPjtcbn07XG5cbldpdGhBY3RpdmVNZXNzYWdlUmVxdWVzdC5zdG9yeSA9IHtcbiAgbmFtZTogJ1dpdGggYWN0aXZlIG1lc3NhZ2UgcmVxdWVzdCcsXG59O1xuXG5leHBvcnQgY29uc3QgV2l0aG91dE5ld2VzdE1lc3NhZ2UgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBoYXZlTmV3ZXN0OiBmYWxzZSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxUaW1lbGluZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhvdXROZXdlc3RNZXNzYWdlQWN0aXZlTWVzc2FnZVJlcXVlc3QgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBoYXZlT2xkZXN0OiBmYWxzZSxcbiAgICBpc0luY29taW5nTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gIH0pO1xuXG4gIHJldHVybiA8VGltZWxpbmUgey4uLnByb3BzfSAvPjtcbn07XG5cbldpdGhvdXROZXdlc3RNZXNzYWdlQWN0aXZlTWVzc2FnZVJlcXVlc3Quc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRob3V0IG5ld2VzdCBtZXNzYWdlLCBhY3RpdmUgbWVzc2FnZSByZXF1ZXN0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBXaXRob3V0T2xkZXN0TWVzc2FnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGhhdmVPbGRlc3Q6IGZhbHNlLFxuICAgIHNjcm9sbFRvSW5kZXg6IC0xLFxuICB9KTtcblxuICByZXR1cm4gPFRpbWVsaW5lIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgRW1wdHlKdXN0SGVybyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGl0ZW1zOiBbXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxUaW1lbGluZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuRW1wdHlKdXN0SGVyby5zdG9yeSA9IHtcbiAgbmFtZTogJ0VtcHR5IChqdXN0IGhlcm8pJyxcbn07XG5cbmV4cG9ydCBjb25zdCBMYXN0U2VlbiA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIG9sZGVzdFVuc2VlbkluZGV4OiAxMyxcbiAgICB0b3RhbFVuc2VlbjogMixcbiAgfSk7XG5cbiAgcmV0dXJuIDxUaW1lbGluZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IFRhcmdldEluZGV4VG9Ub3AgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICBzY3JvbGxUb0luZGV4OiAwLFxuICB9KTtcblxuICByZXR1cm4gPFRpbWVsaW5lIHsuLi5wcm9wc30gLz47XG59O1xuXG5UYXJnZXRJbmRleFRvVG9wLnN0b3J5ID0ge1xuICBuYW1lOiAnVGFyZ2V0IEluZGV4IHRvIFRvcCcsXG59O1xuXG5leHBvcnQgY29uc3QgVHlwaW5nSW5kaWNhdG9yID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSB1c2VQcm9wcyh7IGlzU29tZW9uZVR5cGluZzogdHJ1ZSB9KTtcblxuICByZXR1cm4gPFRpbWVsaW5lIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgV2l0aEludml0ZWRDb250YWN0c0ZvckFOZXdseUNyZWF0ZWRHcm91cCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIGludml0ZWRDb250YWN0c0Zvck5ld2x5Q3JlYXRlZEdyb3VwOiBbXG4gICAgICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgaWQ6ICdhYmMxMjMnLFxuICAgICAgICB0aXRsZTogJ0pvaG4gQm9uIEJvbiBKb3ZpJyxcbiAgICAgIH0pLFxuICAgICAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgIGlkOiAnZGVmNDU2JyxcbiAgICAgICAgdGl0bGU6ICdCb24gSm9obiBCb24gSm92aScsXG4gICAgICB9KSxcbiAgICBdLFxuICB9KTtcblxuICByZXR1cm4gPFRpbWVsaW5lIHsuLi5wcm9wc30gLz47XG59O1xuXG5XaXRoSW52aXRlZENvbnRhY3RzRm9yQU5ld2x5Q3JlYXRlZEdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBpbnZpdGVkIGNvbnRhY3RzIGZvciBhIG5ld2x5LWNyZWF0ZWQgZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IFdpdGhTYW1lTmFtZUluRGlyZWN0Q29udmVyc2F0aW9uV2FybmluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gdXNlUHJvcHMoe1xuICAgIHdhcm5pbmc6IHtcbiAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZSxcbiAgICAgIHNhZmVDb252ZXJzYXRpb246IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICB9LFxuICAgIGl0ZW1zOiBbXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxUaW1lbGluZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuV2l0aFNhbWVOYW1lSW5EaXJlY3RDb252ZXJzYXRpb25XYXJuaW5nLnN0b3J5ID0ge1xuICBuYW1lOiAnV2l0aCBcInNhbWUgbmFtZSBpbiBkaXJlY3QgY29udmVyc2F0aW9uXCIgd2FybmluZycsXG59O1xuXG5leHBvcnQgY29uc3QgV2l0aFNhbWVOYW1lSW5Hcm91cENvbnZlcnNhdGlvbldhcm5pbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IHVzZVByb3BzKHtcbiAgICB3YXJuaW5nOiB7XG4gICAgICB0eXBlOiBDb250YWN0U3Bvb2ZpbmdUeXBlLk11bHRpcGxlR3JvdXBNZW1iZXJzV2l0aFNhbWVUaXRsZSxcbiAgICAgIGFja25vd2xlZGdlZEdyb3VwTmFtZUNvbGxpc2lvbnM6IHt9LFxuICAgICAgZ3JvdXBOYW1lQ29sbGlzaW9uczoge1xuICAgICAgICBBbGljZTogdGltZXMoMiwgKCkgPT4gdXVpZCgpKSxcbiAgICAgICAgQm9iOiB0aW1lcygzLCAoKSA9PiB1dWlkKCkpLFxuICAgICAgfSxcbiAgICB9LFxuICAgIGl0ZW1zOiBbXSxcbiAgfSk7XG5cbiAgcmV0dXJuIDxUaW1lbGluZSB7Li4ucHJvcHN9IC8+O1xufTtcblxuV2l0aFNhbWVOYW1lSW5Hcm91cENvbnZlcnNhdGlvbldhcm5pbmcuc3RvcnkgPSB7XG4gIG5hbWU6ICdXaXRoIFwic2FtZSBuYW1lIGluIGdyb3VwIGNvbnZlcnNhdGlvblwiIHdhcm5pbmcnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtBQUN2QixhQUF3QjtBQUN4QixvQkFBc0I7QUFDdEIsa0JBQTJCO0FBQzNCLHlCQUFzQztBQUN0QywyQkFBdUI7QUFFdkIsdUJBQTBCO0FBQzFCLHNCQUF1QjtBQUV2QixzQkFBeUI7QUFFekIsMEJBQTZCO0FBQzdCLHlDQUE0QztBQUM1QyxtQ0FBc0M7QUFDdEMsOEJBQWlDO0FBRWpDLG9DQUF1QztBQUN2Qyw0QkFBK0I7QUFDL0IsMEJBQTZCO0FBQzdCLDZCQUFvQztBQUNwQywrQkFBMkI7QUFFM0Isa0JBQTBCO0FBQzFCLHFCQUE4QjtBQUU5QixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDJCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFHQSxNQUFNLE9BQU8sNkJBQU07QUFBQyxHQUFQO0FBRWIsT0FBTyxPQUFPLFFBQVE7QUFBQSxFQUNwQixtQkFBbUI7QUFBQSxFQUNuQixxQkFBcUI7QUFDdkIsQ0FBQztBQUVELE1BQU0sUUFBMEM7QUFBQSxFQUM5QyxRQUFRO0FBQUEsSUFDTixNQUFNO0FBQUEsSUFDTixNQUFNO0FBQUEsTUFDSixRQUFRLDBEQUF1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
