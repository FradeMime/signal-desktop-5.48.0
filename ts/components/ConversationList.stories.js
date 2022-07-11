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
var ConversationList_stories_exports = {};
__export(ConversationList_stories_exports, {
  ContactCheckboxes: () => ContactCheckboxes,
  ContactCheckboxesDisabled: () => ContactCheckboxesDisabled,
  ContactDirect: () => ContactDirect,
  ContactDirectWithLongAbout: () => ContactDirectWithLongAbout,
  ContactDirectWithShortAbout: () => ContactDirectWithShortAbout,
  ContactGroup: () => ContactGroup,
  ContactNoteToSelf: () => ContactNoteToSelf,
  ConversationAtMention: () => ConversationAtMention,
  ConversationDeletedForEveryone: () => ConversationDeletedForEveryone,
  ConversationEmojiInMessage: () => ConversationEmojiInMessage,
  ConversationLinkInMessage: () => ConversationLinkInMessage,
  ConversationLongMessage: () => ConversationLongMessage,
  ConversationLongName: () => ConversationLongName,
  ConversationMarkedUnread: () => ConversationMarkedUnread,
  ConversationMessageRequest: () => ConversationMessageRequest,
  ConversationMissingDate: () => ConversationMissingDate,
  ConversationMissingMessage: () => ConversationMissingMessage,
  ConversationMissingText: () => ConversationMissingText,
  ConversationMutedConversation: () => ConversationMutedConversation,
  ConversationName: () => ConversationName,
  ConversationNameAndAvatar: () => ConversationNameAndAvatar,
  ConversationSelected: () => ConversationSelected,
  ConversationTypingStatus: () => ConversationTypingStatus,
  ConversationWithDraft: () => ConversationWithDraft,
  ConversationWithYourself: () => ConversationWithYourself,
  ConversationsMessageStatuses: () => ConversationsMessageStatuses,
  ConversationsUnreadCount: () => ConversationsUnreadCount,
  ConversationsVariousTimes: () => ConversationsVariousTimes,
  FindByPhoneNumber: () => FindByPhoneNumber,
  FindByUsername: () => FindByUsername,
  Headers: () => Headers,
  KitchenSink: () => KitchenSink,
  SearchResultsLoadingSkeleton: () => SearchResultsLoadingSkeleton,
  _ArchiveButton: () => _ArchiveButton,
  default: () => ConversationList_stories_default
});
module.exports = __toCommonJS(ConversationList_stories_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_ConversationList = require("./ConversationList");
var import_MessageSearchResult = require("./conversationList/MessageSearchResult");
var import_ConversationListItem = require("./conversationList/ConversationListItem");
var import_ContactCheckbox = require("./conversationList/ContactCheckbox");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Util = require("../types/Util");
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
var import_UUID = require("../types/UUID");
var import_fakeLookupConversationWithoutUuid = require("../test-both/helpers/fakeLookupConversationWithoutUuid");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var ConversationList_stories_default = {
  title: "Components/ConversationList"
};
const defaultConversations = [
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "fred-convo",
    title: "Fred Willard"
  }),
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "marc-convo",
    isSelected: true,
    unreadCount: 12,
    title: "Marc Barraca",
    lastMessage: {
      deletedForEveryone: false,
      text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue. Nam tincidunt congue enim, ut porta lorem lacinia consectetur. Donec ut libero sed arcu vehicula ultricies a non tortor. Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean ut gravida lorem. Ut turpis felis, pulvinar a semper sed, adipiscing id dolor. Pellentesque auctor nisi id magna consequat sagittis. Curabitur dapibus enim sit amet elit pharetra tincidunt feugiat nisl imperdiet. Ut convallis libero in urna ultrices accumsan. Donec sed odio eros. Donec viverra mi quis quam pulvinar at malesuada arcu rhoncus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. In rutrum accumsan ultricies. Mauris vitae nisi at sem facilisis semper ac in est."
    }
  }),
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "long-name-convo",
    title: "Pablo Diego Jos\xE9 Francisco de Paula Juan Nepomuceno Mar\xEDa de los Remedios Cipriano de la Sant\xEDsima Trinidad Ruiz y Picasso"
  }),
  (0, import_getDefaultConversation.getDefaultConversation)()
];
const Wrapper = /* @__PURE__ */ __name(({
  rows,
  scrollable
}) => {
  const theme = (0, import_react.useContext)(import_StorybookThemeContext.StorybookThemeContext);
  return /* @__PURE__ */ import_react.default.createElement(import_ConversationList.ConversationList, {
    dimensions: {
      width: 300,
      height: 350
    },
    rowCount: rows.length,
    getPreferredBadge: () => void 0,
    getRow: (index) => rows[index],
    shouldRecomputeRowHeights: false,
    i18n,
    onSelectConversation: (0, import_addon_actions.action)("onSelectConversation"),
    onClickArchiveButton: (0, import_addon_actions.action)("onClickArchiveButton"),
    onClickContactCheckbox: (0, import_addon_actions.action)("onClickContactCheckbox"),
    renderMessageSearchResult: (id) => /* @__PURE__ */ import_react.default.createElement(import_MessageSearchResult.MessageSearchResult, {
      body: "Lorem ipsum wow",
      bodyRanges: [],
      conversationId: "marc-convo",
      from: defaultConversations[0],
      getPreferredBadge: () => void 0,
      i18n,
      id,
      sentAt: 15873588e5,
      showConversation: (0, import_addon_actions.action)("showConversation"),
      snippet: "Lorem <<left>>ipsum<<right>> wow",
      theme: import_Util.ThemeType.light,
      to: defaultConversations[1]
    }),
    scrollable,
    lookupConversationWithoutUuid: (0, import_fakeLookupConversationWithoutUuid.makeFakeLookupConversationWithoutUuid)(),
    showChooseGroupMembers: (0, import_addon_actions.action)("showChooseGroupMembers"),
    showUserNotFoundModal: (0, import_addon_actions.action)("showUserNotFoundModal"),
    setIsFetchingUUID: (0, import_addon_actions.action)("setIsFetchingUUID"),
    showConversation: (0, import_addon_actions.action)("showConversation"),
    theme
  });
}, "Wrapper");
const _ArchiveButton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [{ type: import_ConversationList.RowType.ArchiveButton, archivedConversationsCount: 123 }]
}), "_ArchiveButton");
_ArchiveButton.story = {
  name: "Archive button"
};
const ContactNoteToSelf = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Contact,
      contact: {
        ...defaultConversations[0],
        isMe: true,
        about: "\u{1F920} should be ignored"
      }
    }
  ]
}), "ContactNoteToSelf");
ContactNoteToSelf.story = {
  name: "Contact: note to self"
};
const ContactDirect = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [{ type: import_ConversationList.RowType.Contact, contact: defaultConversations[0] }]
}), "ContactDirect");
ContactDirect.story = {
  name: "Contact: direct"
};
const ContactDirectWithShortAbout = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Contact,
      contact: { ...defaultConversations[0], about: "\u{1F920} yee haw" }
    }
  ]
}), "ContactDirectWithShortAbout");
ContactDirectWithShortAbout.story = {
  name: "Contact: direct with short about"
};
const ContactDirectWithLongAbout = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Contact,
      contact: {
        ...defaultConversations[0],
        about: "\u{1F920} Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec a diam lectus. Sed sit amet ipsum mauris. Maecenas congue ligula ac quam viverra nec consectetur ante hendrerit. Donec et mollis dolor. Praesent et diam eget libero egestas mattis sit amet vitae augue."
      }
    }
  ]
}), "ContactDirectWithLongAbout");
ContactDirectWithLongAbout.story = {
  name: "Contact: direct with long about"
};
const ContactGroup = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Contact,
      contact: { ...defaultConversations[0], type: "group" }
    }
  ]
}), "ContactGroup");
ContactGroup.story = {
  name: "Contact: group"
};
const ContactCheckboxes = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: defaultConversations[0],
      isChecked: true
    },
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: defaultConversations[1],
      isChecked: false
    },
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: {
        ...defaultConversations[2],
        about: "\u{1F603} Hola"
      },
      isChecked: true
    }
  ]
}), "ContactCheckboxes");
ContactCheckboxes.story = {
  name: "Contact checkboxes"
};
const ContactCheckboxesDisabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: defaultConversations[0],
      isChecked: false,
      disabledReason: import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected
    },
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: defaultConversations[2],
      isChecked: true,
      disabledReason: import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected
    },
    {
      type: import_ConversationList.RowType.ContactCheckbox,
      contact: defaultConversations[3],
      isChecked: true,
      disabledReason: import_ContactCheckbox.ContactCheckboxDisabledReason.AlreadyAdded
    }
  ]
}), "ContactCheckboxesDisabled");
ContactCheckboxesDisabled.story = {
  name: "Contact checkboxes: disabled"
};
const createConversation = /* @__PURE__ */ __name((overrideProps = {}) => ({
  ...overrideProps,
  acceptedMessageRequest: (0, import_addon_knobs.boolean)("acceptedMessageRequest", overrideProps.acceptedMessageRequest !== void 0 ? overrideProps.acceptedMessageRequest : true),
  badges: [],
  isMe: (0, import_addon_knobs.boolean)("isMe", overrideProps.isMe || false),
  avatarPath: (0, import_addon_knobs.text)("avatarPath", overrideProps.avatarPath || ""),
  id: overrideProps.id || "",
  isSelected: (0, import_addon_knobs.boolean)("isSelected", overrideProps.isSelected || false),
  title: (0, import_addon_knobs.text)("title", overrideProps.title || "Some Person"),
  name: overrideProps.name || "Some Person",
  type: overrideProps.type || "direct",
  markedUnread: (0, import_addon_knobs.boolean)("markedUnread", overrideProps.markedUnread || false),
  lastMessage: overrideProps.lastMessage || {
    text: (0, import_addon_knobs.text)("lastMessage.text", "Hi there!"),
    status: (0, import_addon_knobs.select)("status", import_ConversationListItem.MessageStatuses.reduce((m, s) => ({ ...m, [s]: s }), {}), "read"),
    deletedForEveryone: false
  },
  lastUpdated: (0, import_addon_knobs.date)("lastUpdated", new Date(overrideProps.lastUpdated || Date.now() - 5 * 60 * 1e3)),
  sharedGroupNames: []
}), "createConversation");
const renderConversation = /* @__PURE__ */ __name((overrideProps = {}) => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Conversation,
      conversation: createConversation(overrideProps)
    }
  ]
}), "renderConversation");
const ConversationName = /* @__PURE__ */ __name(() => renderConversation(), "ConversationName");
ConversationName.story = {
  name: "Conversation: name"
};
const ConversationNameAndAvatar = /* @__PURE__ */ __name(() => renderConversation({
  avatarPath: "/fixtures/kitten-1-64-64.jpg"
}), "ConversationNameAndAvatar");
ConversationNameAndAvatar.story = {
  name: "Conversation: name and avatar"
};
const ConversationWithYourself = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: {
    text: "Just a second",
    status: "read",
    deletedForEveryone: false
  },
  name: "Myself",
  title: "Myself",
  isMe: true
}), "ConversationWithYourself");
ConversationWithYourself.story = {
  name: "Conversation: with yourself"
};
const ConversationsMessageStatuses = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: import_ConversationListItem.MessageStatuses.map((status) => ({
    type: import_ConversationList.RowType.Conversation,
    conversation: createConversation({
      lastMessage: { text: status, status, deletedForEveryone: false }
    })
  }))
}), "ConversationsMessageStatuses");
ConversationsMessageStatuses.story = {
  name: "Conversations: Message Statuses"
};
const ConversationTypingStatus = /* @__PURE__ */ __name(() => renderConversation({
  typingContactId: import_UUID.UUID.generate().toString()
}), "ConversationTypingStatus");
ConversationTypingStatus.story = {
  name: "Conversation: Typing Status"
};
const ConversationWithDraft = /* @__PURE__ */ __name(() => renderConversation({
  shouldShowDraft: true,
  draftPreview: "I'm in the middle of typing this..."
}), "ConversationWithDraft");
ConversationWithDraft.story = {
  name: "Conversation: With draft"
};
const ConversationDeletedForEveryone = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: { deletedForEveryone: true }
}), "ConversationDeletedForEveryone");
ConversationDeletedForEveryone.story = {
  name: "Conversation: Deleted for everyone"
};
const ConversationMessageRequest = /* @__PURE__ */ __name(() => renderConversation({
  acceptedMessageRequest: false,
  lastMessage: {
    text: "A Message",
    status: "delivered",
    deletedForEveryone: false
  }
}), "ConversationMessageRequest");
ConversationMessageRequest.story = {
  name: "Conversation: Message Request"
};
const ConversationsUnreadCount = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [4, 10, 34, 250].map((unreadCount) => ({
    type: import_ConversationList.RowType.Conversation,
    conversation: createConversation({
      lastMessage: {
        text: "Hey there!",
        status: "delivered",
        deletedForEveryone: false
      },
      unreadCount
    })
  }))
}), "ConversationsUnreadCount");
ConversationsUnreadCount.story = {
  name: "Conversations: unread count"
};
const ConversationMarkedUnread = /* @__PURE__ */ __name(() => renderConversation({ markedUnread: true }), "ConversationMarkedUnread");
ConversationMarkedUnread.story = {
  name: "Conversation: marked unread"
};
const ConversationSelected = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: {
    text: "Hey there!",
    status: "read",
    deletedForEveryone: false
  },
  isSelected: true
}), "ConversationSelected");
ConversationSelected.story = {
  name: "Conversation: Selected"
};
const ConversationEmojiInMessage = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: {
    text: "\u{1F525}",
    status: "read",
    deletedForEveryone: false
  }
}), "ConversationEmojiInMessage");
ConversationEmojiInMessage.story = {
  name: "Conversation: Emoji in Message"
};
const ConversationLinkInMessage = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: {
    text: "Download at http://signal.org",
    status: "read",
    deletedForEveryone: false
  }
}), "ConversationLinkInMessage");
ConversationLinkInMessage.story = {
  name: "Conversation: Link in Message"
};
const ConversationLongName = /* @__PURE__ */ __name(() => {
  const name = "Long contact name. Esquire. The third. And stuff. And more! And more!";
  return renderConversation({
    name,
    title: name
  });
}, "ConversationLongName");
ConversationLongName.story = {
  name: "Conversation: long name"
};
const ConversationLongMessage = /* @__PURE__ */ __name(() => {
  const messages = [
    "Long line. This is a really really really long line. Really really long. Because that's just how it is",
    `Many lines. This is a many-line message.
Line 2 is really exciting but it shouldn't be seen.
Line three is even better.
Line 4, well.`
  ];
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, {
    rows: messages.map((messageText) => ({
      type: import_ConversationList.RowType.Conversation,
      conversation: createConversation({
        lastMessage: {
          text: messageText,
          status: "read",
          deletedForEveryone: false
        }
      })
    }))
  });
}, "ConversationLongMessage");
ConversationLongMessage.story = {
  name: "Conversation: Long Message"
};
const ConversationsVariousTimes = /* @__PURE__ */ __name(() => {
  const pairs = [
    [Date.now() - 5 * 60 * 60 * 1e3, "Five hours ago"],
    [Date.now() - 24 * 60 * 60 * 1e3, "One day ago"],
    [Date.now() - 7 * 24 * 60 * 60 * 1e3, "One week ago"],
    [Date.now() - 365 * 24 * 60 * 60 * 1e3, "One year ago"]
  ];
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, {
    rows: pairs.map(([lastUpdated, messageText]) => ({
      type: import_ConversationList.RowType.Conversation,
      conversation: createConversation({
        lastUpdated,
        lastMessage: {
          text: messageText,
          status: "read",
          deletedForEveryone: false
        }
      })
    }))
  });
}, "ConversationsVariousTimes");
ConversationsVariousTimes.story = {
  name: "Conversations: Various Times"
};
const ConversationMissingDate = /* @__PURE__ */ __name(() => {
  const row = {
    type: import_ConversationList.RowType.Conversation,
    conversation: (0, import_lodash.omit)(createConversation(), "lastUpdated")
  };
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, {
    rows: [row]
  });
}, "ConversationMissingDate");
ConversationMissingDate.story = {
  name: "Conversation: Missing Date"
};
const ConversationMissingMessage = /* @__PURE__ */ __name(() => {
  const row = {
    type: import_ConversationList.RowType.Conversation,
    conversation: (0, import_lodash.omit)(createConversation(), "lastMessage")
  };
  return /* @__PURE__ */ import_react.default.createElement(Wrapper, {
    rows: [row]
  });
}, "ConversationMissingMessage");
ConversationMissingMessage.story = {
  name: "Conversation: Missing Message"
};
const ConversationMissingText = /* @__PURE__ */ __name(() => renderConversation({
  lastMessage: {
    text: "",
    status: "sent",
    deletedForEveryone: false
  }
}), "ConversationMissingText");
ConversationMissingText.story = {
  name: "Conversation: Missing Text"
};
const ConversationMutedConversation = /* @__PURE__ */ __name(() => renderConversation({
  muteExpiresAt: Date.now() + 1e3 * 60 * 60
}), "ConversationMutedConversation");
ConversationMutedConversation.story = {
  name: "Conversation: Muted Conversation"
};
const ConversationAtMention = /* @__PURE__ */ __name(() => renderConversation({
  title: "The Rebellion",
  type: "group",
  lastMessage: {
    text: "@Leia Organa I know",
    status: "read",
    deletedForEveryone: false
  }
}), "ConversationAtMention");
ConversationAtMention.story = {
  name: "Conversation: At Mention"
};
const Headers = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "conversationsHeader"
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "messagesHeader"
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "findByUsernameHeader"
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "findByPhoneNumberHeader"
    }
  ]
}), "Headers");
const FindByPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "findByPhoneNumberHeader"
    },
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: true,
        userInput: "+1(234)555 98 76",
        e164: "+12345559876"
      },
      isFetching: false
    },
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: true,
        userInput: "+1(234)555 98 76",
        e164: "+12345559876"
      },
      isFetching: true
    },
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: true,
        userInput: "+1(234)555",
        e164: "+1234555"
      },
      isFetching: false
    }
  ]
}), "FindByPhoneNumber");
FindByPhoneNumber.story = {
  name: "Find by phone number"
};
const FindByUsername = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "findByUsernameHeader"
    },
    {
      type: import_ConversationList.RowType.UsernameSearchResult,
      username: "jowerty",
      isFetchingUsername: false
    },
    {
      type: import_ConversationList.RowType.UsernameSearchResult,
      username: "jowerty",
      isFetchingUsername: true
    }
  ]
}), "FindByUsername");
FindByUsername.story = {
  name: "Find by username"
};
const SearchResultsLoadingSkeleton = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  scrollable: false,
  rows: [
    { type: import_ConversationList.RowType.SearchResultsLoadingFakeHeader },
    ...(0, import_lodash.times)(99, () => ({
      type: import_ConversationList.RowType.SearchResultsLoadingFakeRow
    }))
  ]
}), "SearchResultsLoadingSkeleton");
SearchResultsLoadingSkeleton.story = {
  name: "Search results loading skeleton"
};
const KitchenSink = /* @__PURE__ */ __name(() => /* @__PURE__ */ import_react.default.createElement(Wrapper, {
  rows: [
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: true,
        userInput: "+1(234)555 98 76",
        e164: "+12345559876"
      },
      isFetching: false
    },
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: true,
        userInput: "+1(234)555 98 76",
        e164: "+12345559876"
      },
      isFetching: true
    },
    {
      type: import_ConversationList.RowType.StartNewConversation,
      phoneNumber: {
        isValid: false,
        userInput: "+1(234)555 98",
        e164: "+123455598"
      },
      isFetching: true
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "contactsHeader"
    },
    {
      type: import_ConversationList.RowType.Contact,
      contact: defaultConversations[0]
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "messagesHeader"
    },
    {
      type: import_ConversationList.RowType.Conversation,
      conversation: defaultConversations[1]
    },
    {
      type: import_ConversationList.RowType.MessageSearchResult,
      messageId: "123"
    },
    {
      type: import_ConversationList.RowType.Header,
      i18nKey: "findByUsernameHeader"
    },
    {
      type: import_ConversationList.RowType.UsernameSearchResult,
      username: "jowerty",
      isFetchingUsername: false
    },
    {
      type: import_ConversationList.RowType.ArchiveButton,
      archivedConversationsCount: 123
    }
  ]
}), "KitchenSink");
KitchenSink.story = {
  name: "Kitchen sink"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ContactCheckboxes,
  ContactCheckboxesDisabled,
  ContactDirect,
  ContactDirectWithLongAbout,
  ContactDirectWithShortAbout,
  ContactGroup,
  ContactNoteToSelf,
  ConversationAtMention,
  ConversationDeletedForEveryone,
  ConversationEmojiInMessage,
  ConversationLinkInMessage,
  ConversationLongMessage,
  ConversationLongName,
  ConversationMarkedUnread,
  ConversationMessageRequest,
  ConversationMissingDate,
  ConversationMissingMessage,
  ConversationMissingText,
  ConversationMutedConversation,
  ConversationName,
  ConversationNameAndAvatar,
  ConversationSelected,
  ConversationTypingStatus,
  ConversationWithDraft,
  ConversationWithYourself,
  ConversationsMessageStatuses,
  ConversationsUnreadCount,
  ConversationsVariousTimes,
  FindByPhoneNumber,
  FindByUsername,
  Headers,
  KitchenSink,
  SearchResultsLoadingSkeleton,
  _ArchiveButton
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTGlzdC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCwgeyB1c2VDb250ZXh0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgdGltZXMsIG9taXQgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiwgZGF0ZSwgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUm93IH0gZnJvbSAnLi9Db252ZXJzYXRpb25MaXN0JztcbmltcG9ydCB7IENvbnZlcnNhdGlvbkxpc3QsIFJvd1R5cGUgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkxpc3QnO1xuaW1wb3J0IHsgTWVzc2FnZVNlYXJjaFJlc3VsdCB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9NZXNzYWdlU2VhcmNoUmVzdWx0JztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhIGFzIENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlIH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L0NvbnZlcnNhdGlvbkxpc3RJdGVtJztcbmltcG9ydCB7IE1lc3NhZ2VTdGF0dXNlcyB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9Db252ZXJzYXRpb25MaXN0SXRlbSc7XG5pbXBvcnQgeyBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbiB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9Db250YWN0Q2hlY2tib3gnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFN0b3J5Ym9va1RoZW1lQ29udGV4dCB9IGZyb20gJy4uLy4uLy5zdG9yeWJvb2svU3Rvcnlib29rVGhlbWVDb250ZXh0JztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IG1ha2VGYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQgfSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9mYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5leHBvcnQgZGVmYXVsdCB7XG4gIHRpdGxlOiAnQ29tcG9uZW50cy9Db252ZXJzYXRpb25MaXN0Jyxcbn07XG5cbmNvbnN0IGRlZmF1bHRDb252ZXJzYXRpb25zOiBBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT4gPSBbXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiAnZnJlZC1jb252bycsXG4gICAgdGl0bGU6ICdGcmVkIFdpbGxhcmQnLFxuICB9KSxcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgaWQ6ICdtYXJjLWNvbnZvJyxcbiAgICBpc1NlbGVjdGVkOiB0cnVlLFxuICAgIHVucmVhZENvdW50OiAxMixcbiAgICB0aXRsZTogJ01hcmMgQmFycmFjYScsXG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICB0ZXh0OiAnTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRG9uZWMgYSBkaWFtIGxlY3R1cy4gU2VkIHNpdCBhbWV0IGlwc3VtIG1hdXJpcy4gTWFlY2VuYXMgY29uZ3VlIGxpZ3VsYSBhYyBxdWFtIHZpdmVycmEgbmVjIGNvbnNlY3RldHVyIGFudGUgaGVuZHJlcml0LiBEb25lYyBldCBtb2xsaXMgZG9sb3IuIFByYWVzZW50IGV0IGRpYW0gZWdldCBsaWJlcm8gZWdlc3RhcyBtYXR0aXMgc2l0IGFtZXQgdml0YWUgYXVndWUuIE5hbSB0aW5jaWR1bnQgY29uZ3VlIGVuaW0sIHV0IHBvcnRhIGxvcmVtIGxhY2luaWEgY29uc2VjdGV0dXIuIERvbmVjIHV0IGxpYmVybyBzZWQgYXJjdSB2ZWhpY3VsYSB1bHRyaWNpZXMgYSBub24gdG9ydG9yLiBMb3JlbSBpcHN1bSBkb2xvciBzaXQgYW1ldCwgY29uc2VjdGV0dXIgYWRpcGlzY2luZyBlbGl0LiBBZW5lYW4gdXQgZ3JhdmlkYSBsb3JlbS4gVXQgdHVycGlzIGZlbGlzLCBwdWx2aW5hciBhIHNlbXBlciBzZWQsIGFkaXBpc2NpbmcgaWQgZG9sb3IuIFBlbGxlbnRlc3F1ZSBhdWN0b3IgbmlzaSBpZCBtYWduYSBjb25zZXF1YXQgc2FnaXR0aXMuIEN1cmFiaXR1ciBkYXBpYnVzIGVuaW0gc2l0IGFtZXQgZWxpdCBwaGFyZXRyYSB0aW5jaWR1bnQgZmV1Z2lhdCBuaXNsIGltcGVyZGlldC4gVXQgY29udmFsbGlzIGxpYmVybyBpbiB1cm5hIHVsdHJpY2VzIGFjY3Vtc2FuLiBEb25lYyBzZWQgb2RpbyBlcm9zLiBEb25lYyB2aXZlcnJhIG1pIHF1aXMgcXVhbSBwdWx2aW5hciBhdCBtYWxlc3VhZGEgYXJjdSByaG9uY3VzLiBDdW0gc29jaWlzIG5hdG9xdWUgcGVuYXRpYnVzIGV0IG1hZ25pcyBkaXMgcGFydHVyaWVudCBtb250ZXMsIG5hc2NldHVyIHJpZGljdWx1cyBtdXMuIEluIHJ1dHJ1bSBhY2N1bXNhbiB1bHRyaWNpZXMuIE1hdXJpcyB2aXRhZSBuaXNpIGF0IHNlbSBmYWNpbGlzaXMgc2VtcGVyIGFjIGluIGVzdC4nLFxuICAgIH0sXG4gIH0pLFxuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJ2xvbmctbmFtZS1jb252bycsXG4gICAgdGl0bGU6XG4gICAgICAnUGFibG8gRGllZ28gSm9zXHUwMEU5IEZyYW5jaXNjbyBkZSBQYXVsYSBKdWFuIE5lcG9tdWNlbm8gTWFyXHUwMEVEYSBkZSBsb3MgUmVtZWRpb3MgQ2lwcmlhbm8gZGUgbGEgU2FudFx1MDBFRHNpbWEgVHJpbmlkYWQgUnVpeiB5IFBpY2Fzc28nLFxuICB9KSxcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuXTtcblxuY29uc3QgV3JhcHBlciA9ICh7XG4gIHJvd3MsXG4gIHNjcm9sbGFibGUsXG59OiBSZWFkb25seTx7IHJvd3M6IFJlYWRvbmx5QXJyYXk8Um93Pjsgc2Nyb2xsYWJsZT86IGJvb2xlYW4gfT4pID0+IHtcbiAgY29uc3QgdGhlbWUgPSB1c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCk7XG5cbiAgcmV0dXJuIChcbiAgICA8Q29udmVyc2F0aW9uTGlzdFxuICAgICAgZGltZW5zaW9ucz17e1xuICAgICAgICB3aWR0aDogMzAwLFxuICAgICAgICBoZWlnaHQ6IDM1MCxcbiAgICAgIH19XG4gICAgICByb3dDb3VudD17cm93cy5sZW5ndGh9XG4gICAgICBnZXRQcmVmZXJyZWRCYWRnZT17KCkgPT4gdW5kZWZpbmVkfVxuICAgICAgZ2V0Um93PXsoaW5kZXg6IG51bWJlcikgPT4gcm93c1tpbmRleF19XG4gICAgICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzPXtmYWxzZX1cbiAgICAgIGkxOG49e2kxOG59XG4gICAgICBvblNlbGVjdENvbnZlcnNhdGlvbj17YWN0aW9uKCdvblNlbGVjdENvbnZlcnNhdGlvbicpfVxuICAgICAgb25DbGlja0FyY2hpdmVCdXR0b249e2FjdGlvbignb25DbGlja0FyY2hpdmVCdXR0b24nKX1cbiAgICAgIG9uQ2xpY2tDb250YWN0Q2hlY2tib3g9e2FjdGlvbignb25DbGlja0NvbnRhY3RDaGVja2JveCcpfVxuICAgICAgcmVuZGVyTWVzc2FnZVNlYXJjaFJlc3VsdD17KGlkOiBzdHJpbmcpID0+IChcbiAgICAgICAgPE1lc3NhZ2VTZWFyY2hSZXN1bHRcbiAgICAgICAgICBib2R5PVwiTG9yZW0gaXBzdW0gd293XCJcbiAgICAgICAgICBib2R5UmFuZ2VzPXtbXX1cbiAgICAgICAgICBjb252ZXJzYXRpb25JZD1cIm1hcmMtY29udm9cIlxuICAgICAgICAgIGZyb209e2RlZmF1bHRDb252ZXJzYXRpb25zWzBdfVxuICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBpZD17aWR9XG4gICAgICAgICAgc2VudEF0PXsxNTg3MzU4ODAwMDAwfVxuICAgICAgICAgIHNob3dDb252ZXJzYXRpb249e2FjdGlvbignc2hvd0NvbnZlcnNhdGlvbicpfVxuICAgICAgICAgIHNuaXBwZXQ9XCJMb3JlbSA8PGxlZnQ+Pmlwc3VtPDxyaWdodD4+IHdvd1wiXG4gICAgICAgICAgdGhlbWU9e1RoZW1lVHlwZS5saWdodH1cbiAgICAgICAgICB0bz17ZGVmYXVsdENvbnZlcnNhdGlvbnNbMV19XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAgc2Nyb2xsYWJsZT17c2Nyb2xsYWJsZX1cbiAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkPXttYWtlRmFrZUxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkKCl9XG4gICAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzPXthY3Rpb24oJ3Nob3dDaG9vc2VHcm91cE1lbWJlcnMnKX1cbiAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbD17YWN0aW9uKCdzaG93VXNlck5vdEZvdW5kTW9kYWwnKX1cbiAgICAgIHNldElzRmV0Y2hpbmdVVUlEPXthY3Rpb24oJ3NldElzRmV0Y2hpbmdVVUlEJyl9XG4gICAgICBzaG93Q29udmVyc2F0aW9uPXthY3Rpb24oJ3Nob3dDb252ZXJzYXRpb24nKX1cbiAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IF9BcmNoaXZlQnV0dG9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbeyB0eXBlOiBSb3dUeXBlLkFyY2hpdmVCdXR0b24sIGFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50OiAxMjMgfV19XG4gIC8+XG4pO1xuXG5fQXJjaGl2ZUJ1dHRvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0FyY2hpdmUgYnV0dG9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWN0Tm90ZVRvU2VsZiA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxXcmFwcGVyXG4gICAgcm93cz17W1xuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3QsXG4gICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q29udmVyc2F0aW9uc1swXSxcbiAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgIGFib3V0OiAnXHVEODNFXHVERDIwIHNob3VsZCBiZSBpZ25vcmVkJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXX1cbiAgLz5cbik7XG5cbkNvbnRhY3ROb3RlVG9TZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdDogbm90ZSB0byBzZWxmJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWN0RGlyZWN0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbeyB0eXBlOiBSb3dUeXBlLkNvbnRhY3QsIGNvbnRhY3Q6IGRlZmF1bHRDb252ZXJzYXRpb25zWzBdIH1dfVxuICAvPlxuKTtcblxuQ29udGFjdERpcmVjdC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnRhY3Q6IGRpcmVjdCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFjdERpcmVjdFdpdGhTaG9ydEFib3V0ID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogeyAuLi5kZWZhdWx0Q29udmVyc2F0aW9uc1swXSwgYWJvdXQ6ICdcdUQ4M0VcdUREMjAgeWVlIGhhdycgfSxcbiAgICAgIH0sXG4gICAgXX1cbiAgLz5cbik7XG5cbkNvbnRhY3REaXJlY3RXaXRoU2hvcnRBYm91dC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnRhY3Q6IGRpcmVjdCB3aXRoIHNob3J0IGFib3V0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb250YWN0RGlyZWN0V2l0aExvbmdBYm91dCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxXcmFwcGVyXG4gICAgcm93cz17W1xuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3QsXG4gICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q29udmVyc2F0aW9uc1swXSxcbiAgICAgICAgICBhYm91dDpcbiAgICAgICAgICAgICdcdUQ4M0VcdUREMjAgTG9yZW0gaXBzdW0gZG9sb3Igc2l0IGFtZXQsIGNvbnNlY3RldHVyIGFkaXBpc2NpbmcgZWxpdC4gRG9uZWMgYSBkaWFtIGxlY3R1cy4gU2VkIHNpdCBhbWV0IGlwc3VtIG1hdXJpcy4gTWFlY2VuYXMgY29uZ3VlIGxpZ3VsYSBhYyBxdWFtIHZpdmVycmEgbmVjIGNvbnNlY3RldHVyIGFudGUgaGVuZHJlcml0LiBEb25lYyBldCBtb2xsaXMgZG9sb3IuIFByYWVzZW50IGV0IGRpYW0gZWdldCBsaWJlcm8gZWdlc3RhcyBtYXR0aXMgc2l0IGFtZXQgdml0YWUgYXVndWUuJyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgXX1cbiAgLz5cbik7XG5cbkNvbnRhY3REaXJlY3RXaXRoTG9uZ0Fib3V0LnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdDogZGlyZWN0IHdpdGggbG9uZyBhYm91dCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udGFjdEdyb3VwID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogeyAuLi5kZWZhdWx0Q29udmVyc2F0aW9uc1swXSwgdHlwZTogJ2dyb3VwJyB9LFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuQ29udGFjdEdyb3VwLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdDogZ3JvdXAnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RDaGVja2JveGVzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdENoZWNrYm94LFxuICAgICAgICBjb250YWN0OiBkZWZhdWx0Q29udmVyc2F0aW9uc1swXSxcbiAgICAgICAgaXNDaGVja2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0Q2hlY2tib3gsXG4gICAgICAgIGNvbnRhY3Q6IGRlZmF1bHRDb252ZXJzYXRpb25zWzFdLFxuICAgICAgICBpc0NoZWNrZWQ6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0Q2hlY2tib3gsXG4gICAgICAgIGNvbnRhY3Q6IHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q29udmVyc2F0aW9uc1syXSxcbiAgICAgICAgICBhYm91dDogJ1x1RDgzRFx1REUwMyBIb2xhJyxcbiAgICAgICAgfSxcbiAgICAgICAgaXNDaGVja2VkOiB0cnVlLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuQ29udGFjdENoZWNrYm94ZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb250YWN0IGNoZWNrYm94ZXMnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnRhY3RDaGVja2JveGVzRGlzYWJsZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8V3JhcHBlclxuICAgIHJvd3M9e1tcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0Q2hlY2tib3gsXG4gICAgICAgIGNvbnRhY3Q6IGRlZmF1bHRDb252ZXJzYXRpb25zWzBdLFxuICAgICAgICBpc0NoZWNrZWQ6IGZhbHNlLFxuICAgICAgICBkaXNhYmxlZFJlYXNvbjogQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb24uTWF4aW11bUNvbnRhY3RzU2VsZWN0ZWQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnRhY3RDaGVja2JveCxcbiAgICAgICAgY29udGFjdDogZGVmYXVsdENvbnZlcnNhdGlvbnNbMl0sXG4gICAgICAgIGlzQ2hlY2tlZDogdHJ1ZSxcbiAgICAgICAgZGlzYWJsZWRSZWFzb246IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uLk1heGltdW1Db250YWN0c1NlbGVjdGVkLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db250YWN0Q2hlY2tib3gsXG4gICAgICAgIGNvbnRhY3Q6IGRlZmF1bHRDb252ZXJzYXRpb25zWzNdLFxuICAgICAgICBpc0NoZWNrZWQ6IHRydWUsXG4gICAgICAgIGRpc2FibGVkUmVhc29uOiBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbi5BbHJlYWR5QWRkZWQsXG4gICAgICB9LFxuICAgIF19XG4gIC8+XG4pO1xuXG5Db250YWN0Q2hlY2tib3hlc0Rpc2FibGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udGFjdCBjaGVja2JveGVzOiBkaXNhYmxlZCcsXG59O1xuXG5jb25zdCBjcmVhdGVDb252ZXJzYXRpb24gPSAoXG4gIG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8Q29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGU+ID0ge31cbik6IENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlID0+ICh7XG4gIC4uLm92ZXJyaWRlUHJvcHMsXG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGJvb2xlYW4oXG4gICAgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnLFxuICAgIG92ZXJyaWRlUHJvcHMuYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCAhPT0gdW5kZWZpbmVkXG4gICAgICA/IG92ZXJyaWRlUHJvcHMuYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgOiB0cnVlXG4gICksXG4gIGJhZGdlczogW10sXG4gIGlzTWU6IGJvb2xlYW4oJ2lzTWUnLCBvdmVycmlkZVByb3BzLmlzTWUgfHwgZmFsc2UpLFxuICBhdmF0YXJQYXRoOiB0ZXh0KCdhdmF0YXJQYXRoJywgb3ZlcnJpZGVQcm9wcy5hdmF0YXJQYXRoIHx8ICcnKSxcbiAgaWQ6IG92ZXJyaWRlUHJvcHMuaWQgfHwgJycsXG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW4oJ2lzU2VsZWN0ZWQnLCBvdmVycmlkZVByb3BzLmlzU2VsZWN0ZWQgfHwgZmFsc2UpLFxuICB0aXRsZTogdGV4dCgndGl0bGUnLCBvdmVycmlkZVByb3BzLnRpdGxlIHx8ICdTb21lIFBlcnNvbicpLFxuICBuYW1lOiBvdmVycmlkZVByb3BzLm5hbWUgfHwgJ1NvbWUgUGVyc29uJyxcbiAgdHlwZTogb3ZlcnJpZGVQcm9wcy50eXBlIHx8ICdkaXJlY3QnLFxuICBtYXJrZWRVbnJlYWQ6IGJvb2xlYW4oJ21hcmtlZFVucmVhZCcsIG92ZXJyaWRlUHJvcHMubWFya2VkVW5yZWFkIHx8IGZhbHNlKSxcbiAgbGFzdE1lc3NhZ2U6IG92ZXJyaWRlUHJvcHMubGFzdE1lc3NhZ2UgfHwge1xuICAgIHRleHQ6IHRleHQoJ2xhc3RNZXNzYWdlLnRleHQnLCAnSGkgdGhlcmUhJyksXG4gICAgc3RhdHVzOiBzZWxlY3QoXG4gICAgICAnc3RhdHVzJyxcbiAgICAgIE1lc3NhZ2VTdGF0dXNlcy5yZWR1Y2UoKG0sIHMpID0+ICh7IC4uLm0sIFtzXTogcyB9KSwge30pLFxuICAgICAgJ3JlYWQnXG4gICAgKSxcbiAgICBkZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlLFxuICB9LFxuICBsYXN0VXBkYXRlZDogZGF0ZShcbiAgICAnbGFzdFVwZGF0ZWQnLFxuICAgIG5ldyBEYXRlKG92ZXJyaWRlUHJvcHMubGFzdFVwZGF0ZWQgfHwgRGF0ZS5ub3coKSAtIDUgKiA2MCAqIDEwMDApXG4gICksXG4gIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxufSk7XG5cbmNvbnN0IHJlbmRlckNvbnZlcnNhdGlvbiA9IChcbiAgb3ZlcnJpZGVQcm9wczogUGFydGlhbDxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT4gPSB7fVxuKSA9PiAoXG4gIDxXcmFwcGVyXG4gICAgcm93cz17W1xuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjcmVhdGVDb252ZXJzYXRpb24ob3ZlcnJpZGVQcm9wcyksXG4gICAgICB9LFxuICAgIF19XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uTmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiByZW5kZXJDb252ZXJzYXRpb24oKTtcblxuQ29udmVyc2F0aW9uTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogbmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uTmFtZUFuZEF2YXRhciA9ICgpOiBKU1guRWxlbWVudCA9PlxuICByZW5kZXJDb252ZXJzYXRpb24oe1xuICAgIGF2YXRhclBhdGg6ICcvZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgfSk7XG5cbkNvbnZlcnNhdGlvbk5hbWVBbmRBdmF0YXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb252ZXJzYXRpb246IG5hbWUgYW5kIGF2YXRhcicsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uV2l0aFlvdXJzZWxmID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIHRleHQ6ICdKdXN0IGEgc2Vjb25kJyxcbiAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICB9LFxuICAgIG5hbWU6ICdNeXNlbGYnLFxuICAgIHRpdGxlOiAnTXlzZWxmJyxcbiAgICBpc01lOiB0cnVlLFxuICB9KTtcblxuQ29udmVyc2F0aW9uV2l0aFlvdXJzZWxmLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uOiB3aXRoIHlvdXJzZWxmJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25zTWVzc2FnZVN0YXR1c2VzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtNZXNzYWdlU3RhdHVzZXMubWFwKHN0YXR1cyA9PiAoe1xuICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICBjb252ZXJzYXRpb246IGNyZWF0ZUNvbnZlcnNhdGlvbih7XG4gICAgICAgIGxhc3RNZXNzYWdlOiB7IHRleHQ6IHN0YXR1cywgc3RhdHVzLCBkZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlIH0sXG4gICAgICB9KSxcbiAgICB9KSl9XG4gIC8+XG4pO1xuXG5Db252ZXJzYXRpb25zTWVzc2FnZVN0YXR1c2VzLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uczogTWVzc2FnZSBTdGF0dXNlcycsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uVHlwaW5nU3RhdHVzID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgdHlwaW5nQ29udGFjdElkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgfSk7XG5cbkNvbnZlcnNhdGlvblR5cGluZ1N0YXR1cy5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogVHlwaW5nIFN0YXR1cycsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uV2l0aERyYWZ0ID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgc2hvdWxkU2hvd0RyYWZ0OiB0cnVlLFxuICAgIGRyYWZ0UHJldmlldzogXCJJJ20gaW4gdGhlIG1pZGRsZSBvZiB0eXBpbmcgdGhpcy4uLlwiLFxuICB9KTtcblxuQ29udmVyc2F0aW9uV2l0aERyYWZ0LnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uOiBXaXRoIGRyYWZ0Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25EZWxldGVkRm9yRXZlcnlvbmUgPSAoKTogSlNYLkVsZW1lbnQgPT5cbiAgcmVuZGVyQ29udmVyc2F0aW9uKHtcbiAgICBsYXN0TWVzc2FnZTogeyBkZWxldGVkRm9yRXZlcnlvbmU6IHRydWUgfSxcbiAgfSk7XG5cbkNvbnZlcnNhdGlvbkRlbGV0ZWRGb3JFdmVyeW9uZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogRGVsZXRlZCBmb3IgZXZlcnlvbmUnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbk1lc3NhZ2VSZXF1ZXN0ID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogZmFsc2UsXG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIHRleHQ6ICdBIE1lc3NhZ2UnLFxuICAgICAgc3RhdHVzOiAnZGVsaXZlcmVkJyxcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgfSxcbiAgfSk7XG5cbkNvbnZlcnNhdGlvbk1lc3NhZ2VSZXF1ZXN0LnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uOiBNZXNzYWdlIFJlcXVlc3QnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbnNVbnJlYWRDb3VudCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxXcmFwcGVyXG4gICAgcm93cz17WzQsIDEwLCAzNCwgMjUwXS5tYXAodW5yZWFkQ291bnQgPT4gKHtcbiAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgY29udmVyc2F0aW9uOiBjcmVhdGVDb252ZXJzYXRpb24oe1xuICAgICAgICBsYXN0TWVzc2FnZToge1xuICAgICAgICAgIHRleHQ6ICdIZXkgdGhlcmUhJyxcbiAgICAgICAgICBzdGF0dXM6ICdkZWxpdmVyZWQnLFxuICAgICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICAgIH0sXG4gICAgICAgIHVucmVhZENvdW50LFxuICAgICAgfSksXG4gICAgfSkpfVxuICAvPlxuKTtcblxuQ29udmVyc2F0aW9uc1VucmVhZENvdW50LnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uczogdW5yZWFkIGNvdW50Jyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25NYXJrZWRVbnJlYWQgPSAoKTogSlNYLkVsZW1lbnQgPT5cbiAgcmVuZGVyQ29udmVyc2F0aW9uKHsgbWFya2VkVW5yZWFkOiB0cnVlIH0pO1xuXG5Db252ZXJzYXRpb25NYXJrZWRVbnJlYWQuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb252ZXJzYXRpb246IG1hcmtlZCB1bnJlYWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvblNlbGVjdGVkID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIHRleHQ6ICdIZXkgdGhlcmUhJyxcbiAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICB9LFxuICAgIGlzU2VsZWN0ZWQ6IHRydWUsXG4gIH0pO1xuXG5Db252ZXJzYXRpb25TZWxlY3RlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogU2VsZWN0ZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbkVtb2ppSW5NZXNzYWdlID0gKCk6IEpTWC5FbGVtZW50ID0+XG4gIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIHRleHQ6ICdcdUQ4M0RcdUREMjUnLFxuICAgICAgc3RhdHVzOiAncmVhZCcsXG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG5Db252ZXJzYXRpb25FbW9qaUluTWVzc2FnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogRW1vamkgaW4gTWVzc2FnZScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uTGlua0luTWVzc2FnZSA9ICgpOiBKU1guRWxlbWVudCA9PlxuICByZW5kZXJDb252ZXJzYXRpb24oe1xuICAgIGxhc3RNZXNzYWdlOiB7XG4gICAgICB0ZXh0OiAnRG93bmxvYWQgYXQgaHR0cDovL3NpZ25hbC5vcmcnLFxuICAgICAgc3RhdHVzOiAncmVhZCcsXG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmU6IGZhbHNlLFxuICAgIH0sXG4gIH0pO1xuXG5Db252ZXJzYXRpb25MaW5rSW5NZXNzYWdlLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uOiBMaW5rIGluIE1lc3NhZ2UnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvbkxvbmdOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgbmFtZSA9XG4gICAgJ0xvbmcgY29udGFjdCBuYW1lLiBFc3F1aXJlLiBUaGUgdGhpcmQuIEFuZCBzdHVmZi4gQW5kIG1vcmUhIEFuZCBtb3JlISc7XG5cbiAgcmV0dXJuIHJlbmRlckNvbnZlcnNhdGlvbih7XG4gICAgbmFtZSxcbiAgICB0aXRsZTogbmFtZSxcbiAgfSk7XG59O1xuXG5Db252ZXJzYXRpb25Mb25nTmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogbG9uZyBuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25Mb25nTWVzc2FnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IG1lc3NhZ2VzID0gW1xuICAgIFwiTG9uZyBsaW5lLiBUaGlzIGlzIGEgcmVhbGx5IHJlYWxseSByZWFsbHkgbG9uZyBsaW5lLiBSZWFsbHkgcmVhbGx5IGxvbmcuIEJlY2F1c2UgdGhhdCdzIGp1c3QgaG93IGl0IGlzXCIsXG4gICAgYE1hbnkgbGluZXMuIFRoaXMgaXMgYSBtYW55LWxpbmUgbWVzc2FnZS5cbkxpbmUgMiBpcyByZWFsbHkgZXhjaXRpbmcgYnV0IGl0IHNob3VsZG4ndCBiZSBzZWVuLlxuTGluZSB0aHJlZSBpcyBldmVuIGJldHRlci5cbkxpbmUgNCwgd2VsbC5gLFxuICBdO1xuXG4gIHJldHVybiAoXG4gICAgPFdyYXBwZXJcbiAgICAgIHJvd3M9e21lc3NhZ2VzLm1hcChtZXNzYWdlVGV4dCA9PiAoe1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uOiBjcmVhdGVDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGxhc3RNZXNzYWdlOiB7XG4gICAgICAgICAgICB0ZXh0OiBtZXNzYWdlVGV4dCxcbiAgICAgICAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KSxcbiAgICAgIH0pKX1cbiAgICAvPlxuICApO1xufTtcblxuQ29udmVyc2F0aW9uTG9uZ01lc3NhZ2Uuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb252ZXJzYXRpb246IExvbmcgTWVzc2FnZScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uc1ZhcmlvdXNUaW1lcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHBhaXJzOiBBcnJheTxbbnVtYmVyLCBzdHJpbmddPiA9IFtcbiAgICBbRGF0ZS5ub3coKSAtIDUgKiA2MCAqIDYwICogMTAwMCwgJ0ZpdmUgaG91cnMgYWdvJ10sXG4gICAgW0RhdGUubm93KCkgLSAyNCAqIDYwICogNjAgKiAxMDAwLCAnT25lIGRheSBhZ28nXSxcbiAgICBbRGF0ZS5ub3coKSAtIDcgKiAyNCAqIDYwICogNjAgKiAxMDAwLCAnT25lIHdlZWsgYWdvJ10sXG4gICAgW0RhdGUubm93KCkgLSAzNjUgKiAyNCAqIDYwICogNjAgKiAxMDAwLCAnT25lIHllYXIgYWdvJ10sXG4gIF07XG5cbiAgcmV0dXJuIChcbiAgICA8V3JhcHBlclxuICAgICAgcm93cz17cGFpcnMubWFwKChbbGFzdFVwZGF0ZWQsIG1lc3NhZ2VUZXh0XSkgPT4gKHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbjogY3JlYXRlQ29udmVyc2F0aW9uKHtcbiAgICAgICAgICBsYXN0VXBkYXRlZCxcbiAgICAgICAgICBsYXN0TWVzc2FnZToge1xuICAgICAgICAgICAgdGV4dDogbWVzc2FnZVRleHQsXG4gICAgICAgICAgICBzdGF0dXM6ICdyZWFkJyxcbiAgICAgICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogZmFsc2UsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSksXG4gICAgICB9KSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbkNvbnZlcnNhdGlvbnNWYXJpb3VzVGltZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb252ZXJzYXRpb25zOiBWYXJpb3VzIFRpbWVzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25NaXNzaW5nRGF0ZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHJvdyA9IHtcbiAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbiBhcyBjb25zdCxcbiAgICBjb252ZXJzYXRpb246IG9taXQoY3JlYXRlQ29udmVyc2F0aW9uKCksICdsYXN0VXBkYXRlZCcpLFxuICB9O1xuXG4gIHJldHVybiA8V3JhcHBlciByb3dzPXtbcm93XX0gLz47XG59O1xuXG5Db252ZXJzYXRpb25NaXNzaW5nRGF0ZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogTWlzc2luZyBEYXRlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25NaXNzaW5nTWVzc2FnZSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHJvdyA9IHtcbiAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbiBhcyBjb25zdCxcbiAgICBjb252ZXJzYXRpb246IG9taXQoY3JlYXRlQ29udmVyc2F0aW9uKCksICdsYXN0TWVzc2FnZScpLFxuICB9O1xuXG4gIHJldHVybiA8V3JhcHBlciByb3dzPXtbcm93XX0gLz47XG59O1xuXG5Db252ZXJzYXRpb25NaXNzaW5nTWVzc2FnZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogTWlzc2luZyBNZXNzYWdlJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25NaXNzaW5nVGV4dCA9ICgpOiBKU1guRWxlbWVudCA9PlxuICByZW5kZXJDb252ZXJzYXRpb24oe1xuICAgIGxhc3RNZXNzYWdlOiB7XG4gICAgICB0ZXh0OiAnJyxcbiAgICAgIHN0YXR1czogJ3NlbnQnLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcblxuQ29udmVyc2F0aW9uTWlzc2luZ1RleHQuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb252ZXJzYXRpb246IE1pc3NpbmcgVGV4dCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ29udmVyc2F0aW9uTXV0ZWRDb252ZXJzYXRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT5cbiAgcmVuZGVyQ29udmVyc2F0aW9uKHtcbiAgICBtdXRlRXhwaXJlc0F0OiBEYXRlLm5vdygpICsgMTAwMCAqIDYwICogNjAsXG4gIH0pO1xuXG5Db252ZXJzYXRpb25NdXRlZENvbnZlcnNhdGlvbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbnZlcnNhdGlvbjogTXV0ZWQgQ29udmVyc2F0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25BdE1lbnRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT5cbiAgcmVuZGVyQ29udmVyc2F0aW9uKHtcbiAgICB0aXRsZTogJ1RoZSBSZWJlbGxpb24nLFxuICAgIHR5cGU6ICdncm91cCcsXG4gICAgbGFzdE1lc3NhZ2U6IHtcbiAgICAgIHRleHQ6ICdATGVpYSBPcmdhbmEgSSBrbm93JyxcbiAgICAgIHN0YXR1czogJ3JlYWQnLFxuICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICB9LFxuICB9KTtcblxuQ29udmVyc2F0aW9uQXRNZW50aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnQ29udmVyc2F0aW9uOiBBdCBNZW50aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBIZWFkZXJzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICByb3dzPXtbXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnY29udmVyc2F0aW9uc0hlYWRlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ21lc3NhZ2VzSGVhZGVyJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuSGVhZGVyLFxuICAgICAgICBpMThuS2V5OiAnZmluZEJ5VXNlcm5hbWVIZWFkZXInLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlQaG9uZU51bWJlckhlYWRlcicsXG4gICAgICB9LFxuICAgIF19XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRmluZEJ5UGhvbmVOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8V3JhcHBlclxuICAgIHJvd3M9e1tcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlQaG9uZU51bWJlckhlYWRlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uLFxuICAgICAgICBwaG9uZU51bWJlcjoge1xuICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgICAgdXNlcklucHV0OiAnKzEoMjM0KTU1NSA5OCA3NicsXG4gICAgICAgICAgZTE2NDogJysxMjM0NTU1OTg3NicsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5TdGFydE5ld0NvbnZlcnNhdGlvbixcbiAgICAgICAgcGhvbmVOdW1iZXI6IHtcbiAgICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICAgIHVzZXJJbnB1dDogJysxKDIzNCk1NTUgOTggNzYnLFxuICAgICAgICAgIGUxNjQ6ICcrMTIzNDU1NTk4NzYnLFxuICAgICAgICB9LFxuICAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5TdGFydE5ld0NvbnZlcnNhdGlvbixcbiAgICAgICAgcGhvbmVOdW1iZXI6IHtcbiAgICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICAgIHVzZXJJbnB1dDogJysxKDIzNCk1NTUnLFxuICAgICAgICAgIGUxNjQ6ICcrMTIzNDU1NScsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuRmluZEJ5UGhvbmVOdW1iZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdGaW5kIGJ5IHBob25lIG51bWJlcicsXG59O1xuXG5leHBvcnQgY29uc3QgRmluZEJ5VXNlcm5hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8V3JhcHBlclxuICAgIHJvd3M9e1tcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlVc2VybmFtZUhlYWRlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlVzZXJuYW1lU2VhcmNoUmVzdWx0LFxuICAgICAgICB1c2VybmFtZTogJ2pvd2VydHknLFxuICAgICAgICBpc0ZldGNoaW5nVXNlcm5hbWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5Vc2VybmFtZVNlYXJjaFJlc3VsdCxcbiAgICAgICAgdXNlcm5hbWU6ICdqb3dlcnR5JyxcbiAgICAgICAgaXNGZXRjaGluZ1VzZXJuYW1lOiB0cnVlLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuRmluZEJ5VXNlcm5hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdGaW5kIGJ5IHVzZXJuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hSZXN1bHRzTG9hZGluZ1NrZWxldG9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPFdyYXBwZXJcbiAgICBzY3JvbGxhYmxlPXtmYWxzZX1cbiAgICByb3dzPXtbXG4gICAgICB7IHR5cGU6IFJvd1R5cGUuU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyIH0sXG4gICAgICAuLi50aW1lcyg5OSwgKCkgPT4gKHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5TZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VSb3cgYXMgY29uc3QsXG4gICAgICB9KSksXG4gICAgXX1cbiAgLz5cbik7XG5cblNlYXJjaFJlc3VsdHNMb2FkaW5nU2tlbGV0b24uc3RvcnkgPSB7XG4gIG5hbWU6ICdTZWFyY2ggcmVzdWx0cyBsb2FkaW5nIHNrZWxldG9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBLaXRjaGVuU2luayA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxXcmFwcGVyXG4gICAgcm93cz17W1xuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uLFxuICAgICAgICBwaG9uZU51bWJlcjoge1xuICAgICAgICAgIGlzVmFsaWQ6IHRydWUsXG4gICAgICAgICAgdXNlcklucHV0OiAnKzEoMjM0KTU1NSA5OCA3NicsXG4gICAgICAgICAgZTE2NDogJysxMjM0NTU1OTg3NicsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRmV0Y2hpbmc6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5TdGFydE5ld0NvbnZlcnNhdGlvbixcbiAgICAgICAgcGhvbmVOdW1iZXI6IHtcbiAgICAgICAgICBpc1ZhbGlkOiB0cnVlLFxuICAgICAgICAgIHVzZXJJbnB1dDogJysxKDIzNCk1NTUgOTggNzYnLFxuICAgICAgICAgIGUxNjQ6ICcrMTIzNDU1NTk4NzYnLFxuICAgICAgICB9LFxuICAgICAgICBpc0ZldGNoaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5TdGFydE5ld0NvbnZlcnNhdGlvbixcbiAgICAgICAgcGhvbmVOdW1iZXI6IHtcbiAgICAgICAgICBpc1ZhbGlkOiBmYWxzZSxcbiAgICAgICAgICB1c2VySW5wdXQ6ICcrMSgyMzQpNTU1IDk4JyxcbiAgICAgICAgICBlMTY0OiAnKzEyMzQ1NTU5OCcsXG4gICAgICAgIH0sXG4gICAgICAgIGlzRmV0Y2hpbmc6IHRydWUsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ2NvbnRhY3RzSGVhZGVyJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udGFjdCxcbiAgICAgICAgY29udGFjdDogZGVmYXVsdENvbnZlcnNhdGlvbnNbMF0sXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgaTE4bktleTogJ21lc3NhZ2VzSGVhZGVyJyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb246IGRlZmF1bHRDb252ZXJzYXRpb25zWzFdLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5NZXNzYWdlU2VhcmNoUmVzdWx0LFxuICAgICAgICBtZXNzYWdlSWQ6ICcxMjMnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgIGkxOG5LZXk6ICdmaW5kQnlVc2VybmFtZUhlYWRlcicsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLlVzZXJuYW1lU2VhcmNoUmVzdWx0LFxuICAgICAgICB1c2VybmFtZTogJ2pvd2VydHknLFxuICAgICAgICBpc0ZldGNoaW5nVXNlcm5hbWU6IGZhbHNlLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdHlwZTogUm93VHlwZS5BcmNoaXZlQnV0dG9uLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNDb3VudDogMTIzLFxuICAgICAgfSxcbiAgICBdfVxuICAvPlxuKTtcblxuS2l0Y2hlblNpbmsuc3RvcnkgPSB7XG4gIG5hbWU6ICdLaXRjaGVuIHNpbmsnLFxufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFrQztBQUNsQyxvQkFBNEI7QUFFNUIsMkJBQXVCO0FBQ3ZCLHlCQUE0QztBQUc1Qyw4QkFBMEM7QUFDMUMsaUNBQW9DO0FBRXBDLGtDQUFnQztBQUNoQyw2QkFBOEM7QUFDOUMsb0NBQXVDO0FBQ3ZDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsa0JBQTBCO0FBQzFCLG1DQUFzQztBQUN0QyxrQkFBcUI7QUFDckIsK0NBQXNEO0FBRXRELE1BQU0sT0FBTyxnQ0FBVSxNQUFNLHVCQUFVO0FBRXZDLElBQU8sbUNBQVE7QUFBQSxFQUNiLE9BQU87QUFDVDtBQUVBLE1BQU0sdUJBQTZEO0FBQUEsRUFDakUsMERBQXVCO0FBQUEsSUFDckIsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBQ0QsMERBQXVCO0FBQUEsSUFDckIsSUFBSTtBQUFBLElBQ0osWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsYUFBYTtBQUFBLE1BQ1gsb0JBQW9CO0FBQUEsTUFDcEIsTUFBTTtBQUFBLElBQ1I7QUFBQSxFQUNGLENBQUM7QUFBQSxFQUNELDBEQUF1QjtBQUFBLElBQ3JCLElBQUk7QUFBQSxJQUNKLE9BQ0U7QUFBQSxFQUNKLENBQUM7QUFBQSxFQUNELDBEQUF1QjtBQUN6QjtBQUVBLE1BQU0sVUFBVSx3QkFBQztBQUFBLEVBQ2Y7QUFBQSxFQUNBO0FBQUEsTUFDa0U7QUFDbEUsUUFBTSxRQUFRLDZCQUFXLGtEQUFxQjtBQUU5QyxTQUNFLG1EQUFDO0FBQUEsSUFDQyxZQUFZO0FBQUEsTUFDVixPQUFPO0FBQUEsTUFDUCxRQUFRO0FBQUEsSUFDVjtBQUFBLElBQ0EsVUFBVSxLQUFLO0FBQUEsSUFDZixtQkFBbUIsTUFBTTtBQUFBLElBQ3pCLFFBQVEsQ0FBQyxVQUFrQixLQUFLO0FBQUEsSUFDaEMsMkJBQTJCO0FBQUEsSUFDM0I7QUFBQSxJQUNBLHNCQUFzQixpQ0FBTyxzQkFBc0I7QUFBQSxJQUNuRCxzQkFBc0IsaUNBQU8sc0JBQXNCO0FBQUEsSUFDbkQsd0JBQXdCLGlDQUFPLHdCQUF3QjtBQUFBLElBQ3ZELDJCQUEyQixDQUFDLE9BQzFCLG1EQUFDO0FBQUEsTUFDQyxNQUFLO0FBQUEsTUFDTCxZQUFZLENBQUM7QUFBQSxNQUNiLGdCQUFlO0FBQUEsTUFDZixNQUFNLHFCQUFxQjtBQUFBLE1BQzNCLG1CQUFtQixNQUFNO0FBQUEsTUFDekI7QUFBQSxNQUNBO0FBQUEsTUFDQSxRQUFRO0FBQUEsTUFDUixrQkFBa0IsaUNBQU8sa0JBQWtCO0FBQUEsTUFDM0MsU0FBUTtBQUFBLE1BQ1IsT0FBTyxzQkFBVTtBQUFBLE1BQ2pCLElBQUkscUJBQXFCO0FBQUEsS0FDM0I7QUFBQSxJQUVGO0FBQUEsSUFDQSwrQkFBK0Isb0ZBQXNDO0FBQUEsSUFDckUsd0JBQXdCLGlDQUFPLHdCQUF3QjtBQUFBLElBQ3ZELHVCQUF1QixpQ0FBTyx1QkFBdUI7QUFBQSxJQUNyRCxtQkFBbUIsaUNBQU8sbUJBQW1CO0FBQUEsSUFDN0Msa0JBQWtCLGlDQUFPLGtCQUFrQjtBQUFBLElBQzNDO0FBQUEsR0FDRjtBQUVKLEdBN0NnQjtBQStDVCxNQUFNLGlCQUFpQiw2QkFDNUIsbURBQUM7QUFBQSxFQUNDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sZ0NBQVEsZUFBZSw0QkFBNEIsSUFBSSxDQUFDO0FBQUEsQ0FDekUsR0FINEI7QUFNOUIsZUFBZSxRQUFRO0FBQUEsRUFDckIsTUFBTTtBQUNSO0FBRU8sTUFBTSxvQkFBb0IsNkJBQy9CLG1EQUFDO0FBQUEsRUFDQyxNQUFNO0FBQUEsSUFDSjtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsU0FBUztBQUFBLFdBQ0oscUJBQXFCO0FBQUEsUUFDeEIsTUFBTTtBQUFBLFFBQ04sT0FBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLENBQ0YsR0FaK0I7QUFlakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGdCQUFnQiw2QkFDM0IsbURBQUM7QUFBQSxFQUNDLE1BQU0sQ0FBQyxFQUFFLE1BQU0sZ0NBQVEsU0FBUyxTQUFTLHFCQUFxQixHQUFHLENBQUM7QUFBQSxDQUNwRSxHQUgyQjtBQU03QixjQUFjLFFBQVE7QUFBQSxFQUNwQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDhCQUE4Qiw2QkFDekMsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTLEtBQUsscUJBQXFCLElBQUksT0FBTyxvQkFBYTtBQUFBLElBQzdEO0FBQUEsRUFDRjtBQUFBLENBQ0YsR0FSeUM7QUFXM0MsNEJBQTRCLFFBQVE7QUFBQSxFQUNsQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLDZCQUE2Qiw2QkFDeEMsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsV0FDSixxQkFBcUI7QUFBQSxRQUN4QixPQUNFO0FBQUEsTUFDSjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsQ0FDRixHQVp3QztBQWUxQywyQkFBMkIsUUFBUTtBQUFBLEVBQ2pDLE1BQU07QUFDUjtBQUVPLE1BQU0sZUFBZSw2QkFDMUIsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTLEtBQUsscUJBQXFCLElBQUksTUFBTSxRQUFRO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBQUEsQ0FDRixHQVIwQjtBQVc1QixhQUFhLFFBQVE7QUFBQSxFQUNuQixNQUFNO0FBQ1I7QUFFTyxNQUFNLG9CQUFvQiw2QkFDL0IsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTLHFCQUFxQjtBQUFBLE1BQzlCLFdBQVc7QUFBQSxJQUNiO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsU0FBUyxxQkFBcUI7QUFBQSxNQUM5QixXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVM7QUFBQSxXQUNKLHFCQUFxQjtBQUFBLFFBQ3hCLE9BQU87QUFBQSxNQUNUO0FBQUEsTUFDQSxXQUFXO0FBQUEsSUFDYjtBQUFBLEVBQ0Y7QUFBQSxDQUNGLEdBdEIrQjtBQXlCakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7QUFFTyxNQUFNLDRCQUE0Qiw2QkFDdkMsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTLHFCQUFxQjtBQUFBLE1BQzlCLFdBQVc7QUFBQSxNQUNYLGdCQUFnQixxREFBOEI7QUFBQSxJQUNoRDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVMscUJBQXFCO0FBQUEsTUFDOUIsV0FBVztBQUFBLE1BQ1gsZ0JBQWdCLHFEQUE4QjtBQUFBLElBQ2hEO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsU0FBUyxxQkFBcUI7QUFBQSxNQUM5QixXQUFXO0FBQUEsTUFDWCxnQkFBZ0IscURBQThCO0FBQUEsSUFDaEQ7QUFBQSxFQUNGO0FBQUEsQ0FDRixHQXRCdUM7QUF5QnpDLDBCQUEwQixRQUFRO0FBQUEsRUFDaEMsTUFBTTtBQUNSO0FBRUEsTUFBTSxxQkFBcUIsd0JBQ3pCLGdCQUF3RCxDQUFDLE1BQ3RCO0FBQUEsS0FDaEM7QUFBQSxFQUNILHdCQUF3QixnQ0FDdEIsMEJBQ0EsY0FBYywyQkFBMkIsU0FDckMsY0FBYyx5QkFDZCxJQUNOO0FBQUEsRUFDQSxRQUFRLENBQUM7QUFBQSxFQUNULE1BQU0sZ0NBQVEsUUFBUSxjQUFjLFFBQVEsS0FBSztBQUFBLEVBQ2pELFlBQVksNkJBQUssY0FBYyxjQUFjLGNBQWMsRUFBRTtBQUFBLEVBQzdELElBQUksY0FBYyxNQUFNO0FBQUEsRUFDeEIsWUFBWSxnQ0FBUSxjQUFjLGNBQWMsY0FBYyxLQUFLO0FBQUEsRUFDbkUsT0FBTyw2QkFBSyxTQUFTLGNBQWMsU0FBUyxhQUFhO0FBQUEsRUFDekQsTUFBTSxjQUFjLFFBQVE7QUFBQSxFQUM1QixNQUFNLGNBQWMsUUFBUTtBQUFBLEVBQzVCLGNBQWMsZ0NBQVEsZ0JBQWdCLGNBQWMsZ0JBQWdCLEtBQUs7QUFBQSxFQUN6RSxhQUFhLGNBQWMsZUFBZTtBQUFBLElBQ3hDLE1BQU0sNkJBQUssb0JBQW9CLFdBQVc7QUFBQSxJQUMxQyxRQUFRLCtCQUNOLFVBQ0EsNENBQWdCLE9BQU8sQ0FBQyxHQUFHLE1BQU8sTUFBSyxJQUFJLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQyxHQUN2RCxNQUNGO0FBQUEsSUFDQSxvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsYUFBYSw2QkFDWCxlQUNBLElBQUksS0FBSyxjQUFjLGVBQWUsS0FBSyxJQUFJLElBQUksSUFBSSxLQUFLLEdBQUksQ0FDbEU7QUFBQSxFQUNBLGtCQUFrQixDQUFDO0FBQ3JCLElBakMyQjtBQW1DM0IsTUFBTSxxQkFBcUIsd0JBQ3pCLGdCQUF3RCxDQUFDLE1BRXpELG1EQUFDO0FBQUEsRUFDQyxNQUFNO0FBQUEsSUFDSjtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsY0FBYyxtQkFBbUIsYUFBYTtBQUFBLElBQ2hEO0FBQUEsRUFDRjtBQUFBLENBQ0YsR0FWeUI7QUFhcEIsTUFBTSxtQkFBbUIsNkJBQW1CLG1CQUFtQixHQUF0QztBQUVoQyxpQkFBaUIsUUFBUTtBQUFBLEVBQ3ZCLE1BQU07QUFDUjtBQUVPLE1BQU0sNEJBQTRCLDZCQUN2QyxtQkFBbUI7QUFBQSxFQUNqQixZQUFZO0FBQ2QsQ0FBQyxHQUhzQztBQUt6QywwQkFBMEIsUUFBUTtBQUFBLEVBQ2hDLE1BQU07QUFDUjtBQUVPLE1BQU0sMkJBQTJCLDZCQUN0QyxtQkFBbUI7QUFBQSxFQUNqQixhQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUNSLENBQUMsR0FWcUM7QUFZeEMseUJBQXlCLFFBQVE7QUFBQSxFQUMvQixNQUFNO0FBQ1I7QUFFTyxNQUFNLCtCQUErQiw2QkFDMUMsbURBQUM7QUFBQSxFQUNDLE1BQU0sNENBQWdCLElBQUksWUFBVztBQUFBLElBQ25DLE1BQU0sZ0NBQVE7QUFBQSxJQUNkLGNBQWMsbUJBQW1CO0FBQUEsTUFDL0IsYUFBYSxFQUFFLE1BQU0sUUFBUSxRQUFRLG9CQUFvQixNQUFNO0FBQUEsSUFDakUsQ0FBQztBQUFBLEVBQ0gsRUFBRTtBQUFBLENBQ0osR0FSMEM7QUFXNUMsNkJBQTZCLFFBQVE7QUFBQSxFQUNuQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLDJCQUEyQiw2QkFDdEMsbUJBQW1CO0FBQUEsRUFDakIsaUJBQWlCLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQzVDLENBQUMsR0FIcUM7QUFLeEMseUJBQXlCLFFBQVE7QUFBQSxFQUMvQixNQUFNO0FBQ1I7QUFFTyxNQUFNLHdCQUF3Qiw2QkFDbkMsbUJBQW1CO0FBQUEsRUFDakIsaUJBQWlCO0FBQUEsRUFDakIsY0FBYztBQUNoQixDQUFDLEdBSmtDO0FBTXJDLHNCQUFzQixRQUFRO0FBQUEsRUFDNUIsTUFBTTtBQUNSO0FBRU8sTUFBTSxpQ0FBaUMsNkJBQzVDLG1CQUFtQjtBQUFBLEVBQ2pCLGFBQWEsRUFBRSxvQkFBb0IsS0FBSztBQUMxQyxDQUFDLEdBSDJDO0FBSzlDLCtCQUErQixRQUFRO0FBQUEsRUFDckMsTUFBTTtBQUNSO0FBRU8sTUFBTSw2QkFBNkIsNkJBQ3hDLG1CQUFtQjtBQUFBLEVBQ2pCLHdCQUF3QjtBQUFBLEVBQ3hCLGFBQWE7QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQ0YsQ0FBQyxHQVJ1QztBQVUxQywyQkFBMkIsUUFBUTtBQUFBLEVBQ2pDLE1BQU07QUFDUjtBQUVPLE1BQU0sMkJBQTJCLDZCQUN0QyxtREFBQztBQUFBLEVBQ0MsTUFBTSxDQUFDLEdBQUcsSUFBSSxJQUFJLEdBQUcsRUFBRSxJQUFJLGlCQUFnQjtBQUFBLElBQ3pDLE1BQU0sZ0NBQVE7QUFBQSxJQUNkLGNBQWMsbUJBQW1CO0FBQUEsTUFDL0IsYUFBYTtBQUFBLFFBQ1gsTUFBTTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1Isb0JBQW9CO0FBQUEsTUFDdEI7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxFQUFFO0FBQUEsQ0FDSixHQWJzQztBQWdCeEMseUJBQXlCLFFBQVE7QUFBQSxFQUMvQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDJCQUEyQiw2QkFDdEMsbUJBQW1CLEVBQUUsY0FBYyxLQUFLLENBQUMsR0FESDtBQUd4Qyx5QkFBeUIsUUFBUTtBQUFBLEVBQy9CLE1BQU07QUFDUjtBQUVPLE1BQU0sdUJBQXVCLDZCQUNsQyxtQkFBbUI7QUFBQSxFQUNqQixhQUFhO0FBQUEsSUFDWCxNQUFNO0FBQUEsSUFDTixRQUFRO0FBQUEsSUFDUixvQkFBb0I7QUFBQSxFQUN0QjtBQUFBLEVBQ0EsWUFBWTtBQUNkLENBQUMsR0FSaUM7QUFVcEMscUJBQXFCLFFBQVE7QUFBQSxFQUMzQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDZCQUE2Qiw2QkFDeEMsbUJBQW1CO0FBQUEsRUFDakIsYUFBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1Isb0JBQW9CO0FBQUEsRUFDdEI7QUFDRixDQUFDLEdBUHVDO0FBUzFDLDJCQUEyQixRQUFRO0FBQUEsRUFDakMsTUFBTTtBQUNSO0FBRU8sTUFBTSw0QkFBNEIsNkJBQ3ZDLG1CQUFtQjtBQUFBLEVBQ2pCLGFBQWE7QUFBQSxJQUNYLE1BQU07QUFBQSxJQUNOLFFBQVE7QUFBQSxJQUNSLG9CQUFvQjtBQUFBLEVBQ3RCO0FBQ0YsQ0FBQyxHQVBzQztBQVN6QywwQkFBMEIsUUFBUTtBQUFBLEVBQ2hDLE1BQU07QUFDUjtBQUVPLE1BQU0sdUJBQXVCLDZCQUFtQjtBQUNyRCxRQUFNLE9BQ0o7QUFFRixTQUFPLG1CQUFtQjtBQUFBLElBQ3hCO0FBQUEsSUFDQSxPQUFPO0FBQUEsRUFDVCxDQUFDO0FBQ0gsR0FSb0M7QUFVcEMscUJBQXFCLFFBQVE7QUFBQSxFQUMzQixNQUFNO0FBQ1I7QUFFTyxNQUFNLDBCQUEwQiw2QkFBbUI7QUFDeEQsUUFBTSxXQUFXO0FBQUEsSUFDZjtBQUFBLElBQ0E7QUFBQTtBQUFBO0FBQUE7QUFBQSxFQUlGO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0MsTUFBTSxTQUFTLElBQUksaUJBQWdCO0FBQUEsTUFDakMsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsY0FBYyxtQkFBbUI7QUFBQSxRQUMvQixhQUFhO0FBQUEsVUFDWCxNQUFNO0FBQUEsVUFDTixRQUFRO0FBQUEsVUFDUixvQkFBb0I7QUFBQSxRQUN0QjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsRUFBRTtBQUFBLEdBQ0o7QUFFSixHQXZCdUM7QUF5QnZDLHdCQUF3QixRQUFRO0FBQUEsRUFDOUIsTUFBTTtBQUNSO0FBRU8sTUFBTSw0QkFBNEIsNkJBQW1CO0FBQzFELFFBQU0sUUFBaUM7QUFBQSxJQUNyQyxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEtBQU0sZ0JBQWdCO0FBQUEsSUFDbEQsQ0FBQyxLQUFLLElBQUksSUFBSSxLQUFLLEtBQUssS0FBSyxLQUFNLGFBQWE7QUFBQSxJQUNoRCxDQUFDLEtBQUssSUFBSSxJQUFJLElBQUksS0FBSyxLQUFLLEtBQUssS0FBTSxjQUFjO0FBQUEsSUFDckQsQ0FBQyxLQUFLLElBQUksSUFBSSxNQUFNLEtBQUssS0FBSyxLQUFLLEtBQU0sY0FBYztBQUFBLEVBQ3pEO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0MsTUFBTSxNQUFNLElBQUksQ0FBQyxDQUFDLGFBQWEsaUJBQWtCO0FBQUEsTUFDL0MsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsY0FBYyxtQkFBbUI7QUFBQSxRQUMvQjtBQUFBLFFBQ0EsYUFBYTtBQUFBLFVBQ1gsTUFBTTtBQUFBLFVBQ04sUUFBUTtBQUFBLFVBQ1Isb0JBQW9CO0FBQUEsUUFDdEI7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILEVBQUU7QUFBQSxHQUNKO0FBRUosR0F2QnlDO0FBeUJ6QywwQkFBMEIsUUFBUTtBQUFBLEVBQ2hDLE1BQU07QUFDUjtBQUVPLE1BQU0sMEJBQTBCLDZCQUFtQjtBQUN4RCxRQUFNLE1BQU07QUFBQSxJQUNWLE1BQU0sZ0NBQVE7QUFBQSxJQUNkLGNBQWMsd0JBQUssbUJBQW1CLEdBQUcsYUFBYTtBQUFBLEVBQ3hEO0FBRUEsU0FBTyxtREFBQztBQUFBLElBQVEsTUFBTSxDQUFDLEdBQUc7QUFBQSxHQUFHO0FBQy9CLEdBUHVDO0FBU3ZDLHdCQUF3QixRQUFRO0FBQUEsRUFDOUIsTUFBTTtBQUNSO0FBRU8sTUFBTSw2QkFBNkIsNkJBQW1CO0FBQzNELFFBQU0sTUFBTTtBQUFBLElBQ1YsTUFBTSxnQ0FBUTtBQUFBLElBQ2QsY0FBYyx3QkFBSyxtQkFBbUIsR0FBRyxhQUFhO0FBQUEsRUFDeEQ7QUFFQSxTQUFPLG1EQUFDO0FBQUEsSUFBUSxNQUFNLENBQUMsR0FBRztBQUFBLEdBQUc7QUFDL0IsR0FQMEM7QUFTMUMsMkJBQTJCLFFBQVE7QUFBQSxFQUNqQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLDBCQUEwQiw2QkFDckMsbUJBQW1CO0FBQUEsRUFDakIsYUFBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1Isb0JBQW9CO0FBQUEsRUFDdEI7QUFDRixDQUFDLEdBUG9DO0FBU3ZDLHdCQUF3QixRQUFRO0FBQUEsRUFDOUIsTUFBTTtBQUNSO0FBRU8sTUFBTSxnQ0FBZ0MsNkJBQzNDLG1CQUFtQjtBQUFBLEVBQ2pCLGVBQWUsS0FBSyxJQUFJLElBQUksTUFBTyxLQUFLO0FBQzFDLENBQUMsR0FIMEM7QUFLN0MsOEJBQThCLFFBQVE7QUFBQSxFQUNwQyxNQUFNO0FBQ1I7QUFFTyxNQUFNLHdCQUF3Qiw2QkFDbkMsbUJBQW1CO0FBQUEsRUFDakIsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sYUFBYTtBQUFBLElBQ1gsTUFBTTtBQUFBLElBQ04sUUFBUTtBQUFBLElBQ1Isb0JBQW9CO0FBQUEsRUFDdEI7QUFDRixDQUFDLEdBVGtDO0FBV3JDLHNCQUFzQixRQUFRO0FBQUEsRUFDNUIsTUFBTTtBQUNSO0FBRU8sTUFBTSxVQUFVLDZCQUNyQixtREFBQztBQUFBLEVBQ0MsTUFBTTtBQUFBLElBQ0o7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsU0FBUztBQUFBLElBQ1g7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVM7QUFBQSxJQUNYO0FBQUEsRUFDRjtBQUFBLENBQ0YsR0FwQnFCO0FBdUJoQixNQUFNLG9CQUFvQiw2QkFDL0IsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLGFBQWE7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLGFBQWE7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxZQUFZO0FBQUEsSUFDZDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLGFBQWE7QUFBQSxRQUNYLFNBQVM7QUFBQSxRQUNULFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxNQUNSO0FBQUEsTUFDQSxZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFBQSxDQUNGLEdBbkMrQjtBQXNDakMsa0JBQWtCLFFBQVE7QUFBQSxFQUN4QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGlCQUFpQiw2QkFDNUIsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFVBQVU7QUFBQSxNQUNWLG9CQUFvQjtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1Ysb0JBQW9CO0FBQUEsSUFDdEI7QUFBQSxFQUNGO0FBQUEsQ0FDRixHQWxCNEI7QUFxQjlCLGVBQWUsUUFBUTtBQUFBLEVBQ3JCLE1BQU07QUFDUjtBQUVPLE1BQU0sK0JBQStCLDZCQUMxQyxtREFBQztBQUFBLEVBQ0MsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLElBQ0osRUFBRSxNQUFNLGdDQUFRLCtCQUErQjtBQUFBLElBQy9DLEdBQUcseUJBQU0sSUFBSSxNQUFPO0FBQUEsTUFDbEIsTUFBTSxnQ0FBUTtBQUFBLElBQ2hCLEVBQUU7QUFBQSxFQUNKO0FBQUEsQ0FDRixHQVQwQztBQVk1Qyw2QkFBNkIsUUFBUTtBQUFBLEVBQ25DLE1BQU07QUFDUjtBQUVPLE1BQU0sY0FBYyw2QkFDekIsbURBQUM7QUFBQSxFQUNDLE1BQU07QUFBQSxJQUNKO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxhQUFhO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxhQUFhO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxhQUFhO0FBQUEsUUFDWCxTQUFTO0FBQUEsUUFDVCxXQUFXO0FBQUEsUUFDWCxNQUFNO0FBQUEsTUFDUjtBQUFBLE1BQ0EsWUFBWTtBQUFBLElBQ2Q7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVMscUJBQXFCO0FBQUEsSUFDaEM7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxTQUFTO0FBQUEsSUFDWDtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLGNBQWMscUJBQXFCO0FBQUEsSUFDckM7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCxXQUFXO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxNQUNFLE1BQU0sZ0NBQVE7QUFBQSxNQUNkLFNBQVM7QUFBQSxJQUNYO0FBQUEsSUFDQTtBQUFBLE1BQ0UsTUFBTSxnQ0FBUTtBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1Ysb0JBQW9CO0FBQUEsSUFDdEI7QUFBQSxJQUNBO0FBQUEsTUFDRSxNQUFNLGdDQUFRO0FBQUEsTUFDZCw0QkFBNEI7QUFBQSxJQUM5QjtBQUFBLEVBQ0Y7QUFBQSxDQUNGLEdBaEV5QjtBQW1FM0IsWUFBWSxRQUFRO0FBQUEsRUFDbEIsTUFBTTtBQUNSOyIsCiAgIm5hbWVzIjogW10KfQo=
