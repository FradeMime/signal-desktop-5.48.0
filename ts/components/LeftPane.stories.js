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
var LeftPane_stories_exports = {};
__export(LeftPane_stories_exports, {
  ArchiveArchivedConversations: () => ArchiveArchivedConversations,
  ArchiveNoArchivedConversations: () => ArchiveNoArchivedConversations,
  ArchiveSearchingAConversation: () => ArchiveSearchingAConversation,
  CaptchaDialogPending: () => CaptchaDialogPending,
  CaptchaDialogRequired: () => CaptchaDialogRequired,
  ChooseGroupMembersPartialPhoneNumber: () => ChooseGroupMembersPartialPhoneNumber,
  ChooseGroupMembersUsername: () => ChooseGroupMembersUsername,
  ChooseGroupMembersValidPhoneNumber: () => ChooseGroupMembersValidPhoneNumber,
  ComposeAllKindsOfResultsNoSearchTerm: () => ComposeAllKindsOfResultsNoSearchTerm,
  ComposeAllKindsOfResultsWithASearchTerm: () => ComposeAllKindsOfResultsWithASearchTerm,
  ComposeNoResults: () => ComposeNoResults,
  ComposeSearchIsPartialPhoneNumber: () => ComposeSearchIsPartialPhoneNumber,
  ComposeSearchIsValidPhoneNumber: () => ComposeSearchIsValidPhoneNumber,
  ComposeSearchIsValidPhoneNumberFetchingPhoneNumber: () => ComposeSearchIsValidPhoneNumberFetchingPhoneNumber,
  ComposeSearchIsValidUsername: () => ComposeSearchIsValidUsername,
  ComposeSearchIsValidUsernameButFlagIsNotEnabled: () => ComposeSearchIsValidUsernameButFlagIsNotEnabled,
  ComposeSearchIsValidUsernameFetchingUsername: () => ComposeSearchIsValidUsernameFetchingUsername,
  ComposeSomeContactsNoSearchTerm: () => ComposeSomeContactsNoSearchTerm,
  ComposeSomeContactsWithASearchTerm: () => ComposeSomeContactsWithASearchTerm,
  ComposeSomeGroupsNoSearchTerm: () => ComposeSomeGroupsNoSearchTerm,
  ComposeSomeGroupsWithSearchTerm: () => ComposeSomeGroupsWithSearchTerm,
  GroupMetadataCustomTimer: () => GroupMetadataCustomTimer,
  GroupMetadataNoTimer: () => GroupMetadataNoTimer,
  GroupMetadataRegularTimer: () => GroupMetadataRegularTimer,
  InboxNoConversations: () => InboxNoConversations,
  InboxNonPinnedAndArchivedConversations: () => InboxNonPinnedAndArchivedConversations,
  InboxOnlyArchivedConversations: () => InboxOnlyArchivedConversations,
  InboxOnlyNonPinnedConversations: () => InboxOnlyNonPinnedConversations,
  InboxOnlyPinnedConversations: () => InboxOnlyPinnedConversations,
  InboxPinnedAndArchivedConversations: () => InboxPinnedAndArchivedConversations,
  InboxPinnedAndNonPinnedConversations: () => InboxPinnedAndNonPinnedConversations,
  InboxPinnedNonPinnedAndArchivedConversations: () => InboxPinnedNonPinnedAndArchivedConversations,
  SearchAllResults: () => SearchAllResults,
  SearchAllResultsLoading: () => SearchAllResultsLoading,
  SearchHasConversationsAndContactsButNotMessages: () => SearchHasConversationsAndContactsButNotMessages,
  SearchNoResultsWhenSearchingEverywhere: () => SearchNoResultsWhenSearchingEverywhere,
  SearchNoResultsWhenSearchingEverywhereSms: () => SearchNoResultsWhenSearchingEverywhereSms,
  SearchNoResultsWhenSearchingInAConversation: () => SearchNoResultsWhenSearchingInAConversation,
  SearchSomeResultsLoading: () => SearchSomeResultsLoading,
  SearchingConversation: () => SearchingConversation,
  _CrashReportDialog: () => _CrashReportDialog,
  default: () => LeftPane_stories_default
});
module.exports = __toCommonJS(LeftPane_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_LeftPane = require("./LeftPane");
var import_CaptchaDialog = require("./CaptchaDialog");
var import_CrashReportDialog = require("./CrashReportDialog");
var import_MessageSearchResult = require("./conversationList/MessageSearchResult");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Util = require("../types/Util");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_StorybookThemeContext = require("../../.storybook/StorybookThemeContext");
var import_fakeLookupConversationWithoutUuid = require("../test-both/helpers/fakeLookupConversationWithoutUuid");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var LeftPane_stories_default = {
  title: "Components/LeftPane"
};
const defaultConversations = [
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "fred-convo",
    title: "Fred Willard"
  }),
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "marc-convo",
    isSelected: true,
    title: "Marc Barraca"
  })
];
const defaultSearchProps = {
  searchConversation: void 0,
  searchDisabled: false,
  searchTerm: "hello",
  startSearchCounter: 0
};
const defaultGroups = [
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "biking-group",
    title: "Mtn Biking Arizona \u{1F6B5}\u2600\uFE0F\u26F0",
    type: "group",
    sharedGroupNames: []
  }),
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "dance-group",
    title: "Are we dancers? \u{1F483}",
    type: "group",
    sharedGroupNames: []
  })
];
const defaultArchivedConversations = [
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "michelle-archive-convo",
    title: "Michelle Mercure",
    isArchived: true
  })
];
const pinnedConversations = [
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "philly-convo",
    isPinned: true,
    title: "Philip Glass"
  }),
  (0, import_getDefaultConversation.getDefaultConversation)({
    id: "robbo-convo",
    isPinned: true,
    title: "Robert Moog"
  })
];
const defaultModeSpecificProps = {
  ...defaultSearchProps,
  mode: import_LeftPane.LeftPaneMode.Inbox,
  pinnedConversations,
  conversations: defaultConversations,
  archivedConversations: defaultArchivedConversations,
  isAboutToSearchInAConversation: false
};
const emptySearchResultsGroup = { isLoading: false, results: [] };
const useProps = /* @__PURE__ */ __name((overrideProps = {}) => {
  let modeSpecificProps = overrideProps.modeSpecificProps ?? defaultModeSpecificProps;
  const [uuidFetchState, setIsFetchingUUID] = (0, import_fakeLookupConversationWithoutUuid.useUuidFetchState)("uuidFetchState" in modeSpecificProps ? modeSpecificProps.uuidFetchState : {});
  if ("uuidFetchState" in modeSpecificProps) {
    modeSpecificProps = {
      ...modeSpecificProps,
      uuidFetchState
    };
  }
  return {
    clearConversationSearch: (0, import_addon_actions.action)("clearConversationSearch"),
    clearGroupCreationError: (0, import_addon_actions.action)("clearGroupCreationError"),
    clearSearch: (0, import_addon_actions.action)("clearSearch"),
    closeMaximumGroupSizeModal: (0, import_addon_actions.action)("closeMaximumGroupSizeModal"),
    closeRecommendedGroupSizeModal: (0, import_addon_actions.action)("closeRecommendedGroupSizeModal"),
    composeDeleteAvatarFromDisk: (0, import_addon_actions.action)("composeDeleteAvatarFromDisk"),
    composeReplaceAvatar: (0, import_addon_actions.action)("composeReplaceAvatar"),
    composeSaveAvatarToDisk: (0, import_addon_actions.action)("composeSaveAvatarToDisk"),
    createGroup: (0, import_addon_actions.action)("createGroup"),
    getPreferredBadge: () => void 0,
    i18n,
    preferredWidthFromStorage: 320,
    regionCode: "US",
    challengeStatus: (0, import_addon_knobs.select)("challengeStatus", ["idle", "required", "pending"], "idle"),
    crashReportCount: (0, import_addon_knobs.select)("challengeReportCount", [0, 1], 0),
    setChallengeStatus: (0, import_addon_actions.action)("setChallengeStatus"),
    lookupConversationWithoutUuid: (0, import_fakeLookupConversationWithoutUuid.makeFakeLookupConversationWithoutUuid)(),
    showUserNotFoundModal: (0, import_addon_actions.action)("showUserNotFoundModal"),
    setIsFetchingUUID,
    showConversation: (0, import_addon_actions.action)("showConversation"),
    renderExpiredBuildDialog: () => /* @__PURE__ */ React.createElement("div", null),
    renderMainHeader: () => /* @__PURE__ */ React.createElement("div", null),
    renderMessageSearchResult: (id) => /* @__PURE__ */ React.createElement(import_MessageSearchResult.MessageSearchResult, {
      body: "Lorem ipsum wow",
      bodyRanges: [],
      conversationId: "marc-convo",
      from: defaultConversations[0],
      getPreferredBadge: () => void 0,
      i18n,
      id,
      showConversation: (0, import_addon_actions.action)("showConversation"),
      sentAt: 15873588e5,
      snippet: "Lorem <<left>>ipsum<<right>> wow",
      theme: import_Util.ThemeType.light,
      to: defaultConversations[1]
    }),
    renderNetworkStatus: () => /* @__PURE__ */ React.createElement("div", null),
    renderRelinkDialog: () => /* @__PURE__ */ React.createElement("div", null),
    renderUpdateDialog: () => /* @__PURE__ */ React.createElement("div", null),
    renderCaptchaDialog: () => /* @__PURE__ */ React.createElement(import_CaptchaDialog.CaptchaDialog, {
      i18n,
      isPending: overrideProps.challengeStatus === "pending",
      onContinue: (0, import_addon_actions.action)("onCaptchaContinue"),
      onSkip: (0, import_addon_actions.action)("onCaptchaSkip")
    }),
    renderCrashReportDialog: () => /* @__PURE__ */ React.createElement(import_CrashReportDialog.CrashReportDialog, {
      i18n,
      isPending: false,
      uploadCrashReports: (0, import_addon_actions.action)("uploadCrashReports"),
      eraseCrashReports: (0, import_addon_actions.action)("eraseCrashReports")
    }),
    selectedConversationId: void 0,
    selectedMessageId: void 0,
    savePreferredLeftPaneWidth: (0, import_addon_actions.action)("savePreferredLeftPaneWidth"),
    searchInConversation: (0, import_addon_actions.action)("searchInConversation"),
    setComposeSearchTerm: (0, import_addon_actions.action)("setComposeSearchTerm"),
    setComposeGroupAvatar: (0, import_addon_actions.action)("setComposeGroupAvatar"),
    setComposeGroupName: (0, import_addon_actions.action)("setComposeGroupName"),
    setComposeGroupExpireTimer: (0, import_addon_actions.action)("setComposeGroupExpireTimer"),
    showArchivedConversations: (0, import_addon_actions.action)("showArchivedConversations"),
    showInbox: (0, import_addon_actions.action)("showInbox"),
    startComposing: (0, import_addon_actions.action)("startComposing"),
    showChooseGroupMembers: (0, import_addon_actions.action)("showChooseGroupMembers"),
    startSearch: (0, import_addon_actions.action)("startSearch"),
    startSettingGroupMetadata: (0, import_addon_actions.action)("startSettingGroupMetadata"),
    theme: React.useContext(import_StorybookThemeContext.StorybookThemeContext),
    toggleComposeEditingAvatar: (0, import_addon_actions.action)("toggleComposeEditingAvatar"),
    toggleConversationInChooseMembers: (0, import_addon_actions.action)("toggleConversationInChooseMembers"),
    updateSearchTerm: (0, import_addon_actions.action)("updateSearchTerm"),
    ...overrideProps,
    modeSpecificProps
  };
}, "useProps");
const InboxNoConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations: [],
      conversations: [],
      archivedConversations: [],
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxNoConversations");
InboxNoConversations.story = {
  name: "Inbox: no conversations"
};
const InboxOnlyPinnedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: [],
      archivedConversations: [],
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxOnlyPinnedConversations");
InboxOnlyPinnedConversations.story = {
  name: "Inbox: only pinned conversations"
};
const InboxOnlyNonPinnedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations: [],
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxOnlyNonPinnedConversations");
InboxOnlyNonPinnedConversations.story = {
  name: "Inbox: only non-pinned conversations"
};
const InboxOnlyArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations: [],
      conversations: [],
      archivedConversations: defaultArchivedConversations,
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxOnlyArchivedConversations");
InboxOnlyArchivedConversations.story = {
  name: "Inbox: only archived conversations"
};
const InboxPinnedAndArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: [],
      archivedConversations: defaultArchivedConversations,
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxPinnedAndArchivedConversations");
InboxPinnedAndArchivedConversations.story = {
  name: "Inbox: pinned and archived conversations"
};
const InboxNonPinnedAndArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations: [],
      conversations: defaultConversations,
      archivedConversations: defaultArchivedConversations,
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxNonPinnedAndArchivedConversations");
InboxNonPinnedAndArchivedConversations.story = {
  name: "Inbox: non-pinned and archived conversations"
};
const InboxPinnedAndNonPinnedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false
    }
  })
}), "InboxPinnedAndNonPinnedConversations");
InboxPinnedAndNonPinnedConversations.story = {
  name: "Inbox: pinned and non-pinned conversations"
};
const InboxPinnedNonPinnedAndArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps()
}), "InboxPinnedNonPinnedAndArchivedConversations");
InboxPinnedNonPinnedAndArchivedConversations.story = {
  name: "Inbox: pinned, non-pinned, and archived conversations"
};
const SearchNoResultsWhenSearchingEverywhere = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: emptySearchResultsGroup,
      contactResults: emptySearchResultsGroup,
      messageResults: emptySearchResultsGroup,
      primarySendsSms: false
    }
  })
}), "SearchNoResultsWhenSearchingEverywhere");
SearchNoResultsWhenSearchingEverywhere.story = {
  name: "Search: no results when searching everywhere"
};
const SearchNoResultsWhenSearchingEverywhereSms = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: emptySearchResultsGroup,
      contactResults: emptySearchResultsGroup,
      messageResults: emptySearchResultsGroup,
      primarySendsSms: true
    }
  })
}), "SearchNoResultsWhenSearchingEverywhereSms");
SearchNoResultsWhenSearchingEverywhereSms.story = {
  name: "Search: no results when searching everywhere (SMS)"
};
const SearchNoResultsWhenSearchingInAConversation = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: emptySearchResultsGroup,
      contactResults: emptySearchResultsGroup,
      messageResults: emptySearchResultsGroup,
      searchConversationName: "Bing Bong",
      primarySendsSms: false
    }
  })
}), "SearchNoResultsWhenSearchingInAConversation");
SearchNoResultsWhenSearchingInAConversation.story = {
  name: "Search: no results when searching in a conversation"
};
const SearchAllResultsLoading = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: { isLoading: true },
      contactResults: { isLoading: true },
      messageResults: { isLoading: true },
      primarySendsSms: false
    }
  })
}), "SearchAllResultsLoading");
SearchAllResultsLoading.story = {
  name: "Search: all results loading"
};
const SearchSomeResultsLoading = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: {
        isLoading: false,
        results: defaultConversations
      },
      contactResults: { isLoading: true },
      messageResults: { isLoading: true },
      primarySendsSms: false
    }
  })
}), "SearchSomeResultsLoading");
SearchSomeResultsLoading.story = {
  name: "Search: some results loading"
};
const SearchHasConversationsAndContactsButNotMessages = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: {
        isLoading: false,
        results: defaultConversations
      },
      contactResults: { isLoading: false, results: defaultConversations },
      messageResults: { isLoading: false, results: [] },
      primarySendsSms: false
    }
  })
}), "SearchHasConversationsAndContactsButNotMessages");
SearchHasConversationsAndContactsButNotMessages.story = {
  name: "Search: has conversations and contacts, but not messages"
};
const SearchAllResults = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Search,
      conversationResults: {
        isLoading: false,
        results: defaultConversations
      },
      contactResults: { isLoading: false, results: defaultConversations },
      messageResults: {
        isLoading: false,
        results: [
          { id: "msg1", type: "outgoing", conversationId: "foo" },
          { id: "msg2", type: "incoming", conversationId: "bar" }
        ]
      },
      primarySendsSms: false
    }
  })
}), "SearchAllResults");
SearchAllResults.story = {
  name: "Search: all results"
};
const ArchiveNoArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Archive,
      archivedConversations: [],
      searchConversation: void 0,
      searchTerm: "",
      startSearchCounter: 0
    }
  })
}), "ArchiveNoArchivedConversations");
ArchiveNoArchivedConversations.story = {
  name: "Archive: no archived conversations"
};
const ArchiveArchivedConversations = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Archive,
      archivedConversations: defaultConversations,
      searchConversation: void 0,
      searchTerm: "",
      startSearchCounter: 0
    }
  })
}), "ArchiveArchivedConversations");
ArchiveArchivedConversations.story = {
  name: "Archive: archived conversations"
};
const ArchiveSearchingAConversation = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Archive,
      archivedConversations: defaultConversations,
      searchConversation: void 0,
      searchTerm: "",
      startSearchCounter: 0
    }
  })
}), "ArchiveSearchingAConversation");
ArchiveSearchingAConversation.story = {
  name: "Archive: searching a conversation"
};
const ComposeNoResults = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: ""
    }
  })
}), "ComposeNoResults");
ComposeNoResults.story = {
  name: "Compose: no results"
};
const ComposeSomeContactsNoSearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: defaultConversations,
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: ""
    }
  })
}), "ComposeSomeContactsNoSearchTerm");
ComposeSomeContactsNoSearchTerm.story = {
  name: "Compose: some contacts, no search term"
};
const ComposeSomeContactsWithASearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: defaultConversations,
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "ar"
    }
  })
}), "ComposeSomeContactsWithASearchTerm");
ComposeSomeContactsWithASearchTerm.story = {
  name: "Compose: some contacts, with a search term"
};
const ComposeSomeGroupsNoSearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: defaultGroups,
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: ""
    }
  })
}), "ComposeSomeGroupsNoSearchTerm");
ComposeSomeGroupsNoSearchTerm.story = {
  name: "Compose: some groups, no search term"
};
const ComposeSomeGroupsWithSearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: defaultGroups,
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "ar"
    }
  })
}), "ComposeSomeGroupsWithSearchTerm");
ComposeSomeGroupsWithSearchTerm.story = {
  name: "Compose: some groups, with search term"
};
const ComposeSearchIsValidUsername = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "someone"
    }
  })
}), "ComposeSearchIsValidUsername");
ComposeSearchIsValidUsername.story = {
  name: "Compose: search is valid username"
};
const ComposeSearchIsValidUsernameFetchingUsername = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {
        "username:someone": true
      },
      regionCode: "US",
      searchTerm: "someone"
    }
  })
}), "ComposeSearchIsValidUsernameFetchingUsername");
ComposeSearchIsValidUsernameFetchingUsername.story = {
  name: "Compose: search is valid username, fetching username"
};
const ComposeSearchIsValidUsernameButFlagIsNotEnabled = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: false,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "someone"
    }
  })
}), "ComposeSearchIsValidUsernameButFlagIsNotEnabled");
ComposeSearchIsValidUsernameButFlagIsNotEnabled.story = {
  name: "Compose: search is valid username, but flag is not enabled"
};
const ComposeSearchIsPartialPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: false,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "+1(212)555"
    }
  })
}), "ComposeSearchIsPartialPhoneNumber");
ComposeSearchIsPartialPhoneNumber.story = {
  name: "Compose: search is partial phone number"
};
const ComposeSearchIsValidPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "2125555454"
    }
  })
}), "ComposeSearchIsValidPhoneNumber");
ComposeSearchIsValidPhoneNumber.story = {
  name: "Compose: search is valid phone number"
};
const ComposeSearchIsValidPhoneNumberFetchingPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: [],
      composeGroups: [],
      isUsernamesEnabled: true,
      uuidFetchState: {
        "e164:+12125555454": true
      },
      regionCode: "US",
      searchTerm: "(212)5555454"
    }
  })
}), "ComposeSearchIsValidPhoneNumberFetchingPhoneNumber");
ComposeSearchIsValidPhoneNumberFetchingPhoneNumber.story = {
  name: "Compose: search is valid phone number, fetching phone number"
};
const ComposeAllKindsOfResultsNoSearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: defaultConversations,
      composeGroups: defaultGroups,
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: ""
    }
  })
}), "ComposeAllKindsOfResultsNoSearchTerm");
ComposeAllKindsOfResultsNoSearchTerm.story = {
  name: "Compose: all kinds of results, no search term"
};
const ComposeAllKindsOfResultsWithASearchTerm = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.Compose,
      composeContacts: defaultConversations,
      composeGroups: defaultGroups,
      isUsernamesEnabled: true,
      uuidFetchState: {},
      regionCode: "US",
      searchTerm: "someone"
    }
  })
}), "ComposeAllKindsOfResultsWithASearchTerm");
ComposeAllKindsOfResultsWithASearchTerm.story = {
  name: "Compose: all kinds of results, with a search term"
};
const CaptchaDialogRequired = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false,
      searchTerm: ""
    },
    challengeStatus: "required"
  })
}), "CaptchaDialogRequired");
CaptchaDialogRequired.story = {
  name: "Captcha dialog: required"
};
const CaptchaDialogPending = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false,
      searchTerm: ""
    },
    challengeStatus: "pending"
  })
}), "CaptchaDialogPending");
CaptchaDialogPending.story = {
  name: "Captcha dialog: pending"
};
const _CrashReportDialog = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations,
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false,
      searchTerm: ""
    },
    crashReportCount: 42
  })
}), "_CrashReportDialog");
_CrashReportDialog.story = {
  name: "Crash report dialog"
};
const ChooseGroupMembersPartialPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.ChooseGroupMembers,
      uuidFetchState: {},
      candidateContacts: [],
      isShowingRecommendedGroupSizeModal: false,
      isShowingMaximumGroupSizeModal: false,
      isUsernamesEnabled: true,
      searchTerm: "+1(212) 555",
      regionCode: "US",
      selectedContacts: []
    }
  })
}), "ChooseGroupMembersPartialPhoneNumber");
ChooseGroupMembersPartialPhoneNumber.story = {
  name: "Choose Group Members: Partial phone number"
};
const ChooseGroupMembersValidPhoneNumber = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.ChooseGroupMembers,
      uuidFetchState: {},
      candidateContacts: [],
      isShowingRecommendedGroupSizeModal: false,
      isShowingMaximumGroupSizeModal: false,
      isUsernamesEnabled: true,
      searchTerm: "+1(212) 555 5454",
      regionCode: "US",
      selectedContacts: []
    }
  })
}), "ChooseGroupMembersValidPhoneNumber");
ChooseGroupMembersValidPhoneNumber.story = {
  name: "Choose Group Members: Valid phone number"
};
const ChooseGroupMembersUsername = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.ChooseGroupMembers,
      uuidFetchState: {},
      candidateContacts: [],
      isShowingRecommendedGroupSizeModal: false,
      isShowingMaximumGroupSizeModal: false,
      isUsernamesEnabled: true,
      searchTerm: "@signal",
      regionCode: "US",
      selectedContacts: []
    }
  })
}), "ChooseGroupMembersUsername");
ChooseGroupMembersUsername.story = {
  name: "Choose Group Members: username"
};
const GroupMetadataNoTimer = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.SetGroupMetadata,
      groupAvatar: void 0,
      groupName: "Group 1",
      groupExpireTimer: 0,
      hasError: false,
      isCreating: false,
      isEditingAvatar: false,
      selectedContacts: defaultConversations,
      userAvatarData: []
    }
  })
}), "GroupMetadataNoTimer");
GroupMetadataNoTimer.story = {
  name: "Group Metadata: No Timer"
};
const GroupMetadataRegularTimer = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.SetGroupMetadata,
      groupAvatar: void 0,
      groupName: "Group 1",
      groupExpireTimer: 24 * 3600,
      hasError: false,
      isCreating: false,
      isEditingAvatar: false,
      selectedContacts: defaultConversations,
      userAvatarData: []
    }
  })
}), "GroupMetadataRegularTimer");
GroupMetadataRegularTimer.story = {
  name: "Group Metadata: Regular Timer"
};
const GroupMetadataCustomTimer = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      mode: import_LeftPane.LeftPaneMode.SetGroupMetadata,
      groupAvatar: void 0,
      groupName: "Group 1",
      groupExpireTimer: 7 * 3600,
      hasError: false,
      isCreating: false,
      isEditingAvatar: false,
      selectedContacts: defaultConversations,
      userAvatarData: []
    }
  })
}), "GroupMetadataCustomTimer");
GroupMetadataCustomTimer.story = {
  name: "Group Metadata: Custom Timer"
};
const SearchingConversation = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_LeftPane.LeftPane, {
  ...useProps({
    modeSpecificProps: {
      ...defaultSearchProps,
      mode: import_LeftPane.LeftPaneMode.Inbox,
      pinnedConversations: [],
      conversations: defaultConversations,
      archivedConversations: [],
      isAboutToSearchInAConversation: false,
      searchConversation: (0, import_getDefaultConversation.getDefaultConversation)(),
      searchTerm: ""
    }
  })
}), "SearchingConversation");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ArchiveArchivedConversations,
  ArchiveNoArchivedConversations,
  ArchiveSearchingAConversation,
  CaptchaDialogPending,
  CaptchaDialogRequired,
  ChooseGroupMembersPartialPhoneNumber,
  ChooseGroupMembersUsername,
  ChooseGroupMembersValidPhoneNumber,
  ComposeAllKindsOfResultsNoSearchTerm,
  ComposeAllKindsOfResultsWithASearchTerm,
  ComposeNoResults,
  ComposeSearchIsPartialPhoneNumber,
  ComposeSearchIsValidPhoneNumber,
  ComposeSearchIsValidPhoneNumberFetchingPhoneNumber,
  ComposeSearchIsValidUsername,
  ComposeSearchIsValidUsernameButFlagIsNotEnabled,
  ComposeSearchIsValidUsernameFetchingUsername,
  ComposeSomeContactsNoSearchTerm,
  ComposeSomeContactsWithASearchTerm,
  ComposeSomeGroupsNoSearchTerm,
  ComposeSomeGroupsWithSearchTerm,
  GroupMetadataCustomTimer,
  GroupMetadataNoTimer,
  GroupMetadataRegularTimer,
  InboxNoConversations,
  InboxNonPinnedAndArchivedConversations,
  InboxOnlyArchivedConversations,
  InboxOnlyNonPinnedConversations,
  InboxOnlyPinnedConversations,
  InboxPinnedAndArchivedConversations,
  InboxPinnedAndNonPinnedConversations,
  InboxPinnedNonPinnedAndArchivedConversations,
  SearchAllResults,
  SearchAllResultsLoading,
  SearchHasConversationsAndContactsButNotMessages,
  SearchNoResultsWhenSearchingEverywhere,
  SearchNoResultsWhenSearchingEverywhereSms,
  SearchNoResultsWhenSearchingInAConversation,
  SearchSomeResultsLoading,
  SearchingConversation,
  _CrashReportDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmUuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5pbXBvcnQgeyBzZWxlY3QgfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWtub2JzJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc1R5cGUgfSBmcm9tICcuL0xlZnRQYW5lJztcbmltcG9ydCB7IExlZnRQYW5lLCBMZWZ0UGFuZU1vZGUgfSBmcm9tICcuL0xlZnRQYW5lJztcbmltcG9ydCB7IENhcHRjaGFEaWFsb2cgfSBmcm9tICcuL0NhcHRjaGFEaWFsb2cnO1xuaW1wb3J0IHsgQ3Jhc2hSZXBvcnREaWFsb2cgfSBmcm9tICcuL0NyYXNoUmVwb3J0RGlhbG9nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgTWVzc2FnZVNlYXJjaFJlc3VsdCB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9NZXNzYWdlU2VhcmNoUmVzdWx0JztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBTdG9yeWJvb2tUaGVtZUNvbnRleHQgfSBmcm9tICcuLi8uLi8uc3Rvcnlib29rL1N0b3J5Ym9va1RoZW1lQ29udGV4dCc7XG5pbXBvcnQge1xuICBtYWtlRmFrZUxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICB1c2VVdWlkRmV0Y2hTdGF0ZSxcbn0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvTGVmdFBhbmUnLFxufTtcblxuY29uc3QgZGVmYXVsdENvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0gW1xuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJ2ZyZWQtY29udm8nLFxuICAgIHRpdGxlOiAnRnJlZCBXaWxsYXJkJyxcbiAgfSksXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiAnbWFyYy1jb252bycsXG4gICAgaXNTZWxlY3RlZDogdHJ1ZSxcbiAgICB0aXRsZTogJ01hcmMgQmFycmFjYScsXG4gIH0pLFxuXTtcblxuY29uc3QgZGVmYXVsdFNlYXJjaFByb3BzID0ge1xuICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgc2VhcmNoRGlzYWJsZWQ6IGZhbHNlLFxuICBzZWFyY2hUZXJtOiAnaGVsbG8nLFxuICBzdGFydFNlYXJjaENvdW50ZXI6IDAsXG59O1xuXG5jb25zdCBkZWZhdWx0R3JvdXBzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgaWQ6ICdiaWtpbmctZ3JvdXAnLFxuICAgIHRpdGxlOiAnTXRuIEJpa2luZyBBcml6b25hIFx1RDgzRFx1REVCNVx1MjYwMFx1RkUwRlx1MjZGMCcsXG4gICAgdHlwZTogJ2dyb3VwJyxcbiAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgfSksXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiAnZGFuY2UtZ3JvdXAnLFxuICAgIHRpdGxlOiAnQXJlIHdlIGRhbmNlcnM/IFx1RDgzRFx1REM4MycsXG4gICAgdHlwZTogJ2dyb3VwJyxcbiAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgfSksXG5dO1xuXG5jb25zdCBkZWZhdWx0QXJjaGl2ZWRDb252ZXJzYXRpb25zOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgaWQ6ICdtaWNoZWxsZS1hcmNoaXZlLWNvbnZvJyxcbiAgICB0aXRsZTogJ01pY2hlbGxlIE1lcmN1cmUnLFxuICAgIGlzQXJjaGl2ZWQ6IHRydWUsXG4gIH0pLFxuXTtcblxuY29uc3QgcGlubmVkQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXG4gIGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgIGlkOiAncGhpbGx5LWNvbnZvJyxcbiAgICBpc1Bpbm5lZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1BoaWxpcCBHbGFzcycsXG4gIH0pLFxuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJ3JvYmJvLWNvbnZvJyxcbiAgICBpc1Bpbm5lZDogdHJ1ZSxcbiAgICB0aXRsZTogJ1JvYmVydCBNb29nJyxcbiAgfSksXG5dO1xuXG5jb25zdCBkZWZhdWx0TW9kZVNwZWNpZmljUHJvcHMgPSB7XG4gIC4uLmRlZmF1bHRTZWFyY2hQcm9wcyxcbiAgbW9kZTogTGVmdFBhbmVNb2RlLkluYm94IGFzIGNvbnN0LFxuICBwaW5uZWRDb252ZXJzYXRpb25zLFxuICBjb252ZXJzYXRpb25zOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBkZWZhdWx0QXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGZhbHNlLFxufTtcblxuY29uc3QgZW1wdHlTZWFyY2hSZXN1bHRzR3JvdXAgPSB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IFtdIH07XG5cbmNvbnN0IHVzZVByb3BzID0gKG92ZXJyaWRlUHJvcHM6IFBhcnRpYWw8UHJvcHNUeXBlPiA9IHt9KTogUHJvcHNUeXBlID0+IHtcbiAgbGV0IG1vZGVTcGVjaWZpY1Byb3BzID1cbiAgICBvdmVycmlkZVByb3BzLm1vZGVTcGVjaWZpY1Byb3BzID8/IGRlZmF1bHRNb2RlU3BlY2lmaWNQcm9wcztcblxuICBjb25zdCBbdXVpZEZldGNoU3RhdGUsIHNldElzRmV0Y2hpbmdVVUlEXSA9IHVzZVV1aWRGZXRjaFN0YXRlKFxuICAgICd1dWlkRmV0Y2hTdGF0ZScgaW4gbW9kZVNwZWNpZmljUHJvcHNcbiAgICAgID8gbW9kZVNwZWNpZmljUHJvcHMudXVpZEZldGNoU3RhdGVcbiAgICAgIDoge31cbiAgKTtcblxuICBpZiAoJ3V1aWRGZXRjaFN0YXRlJyBpbiBtb2RlU3BlY2lmaWNQcm9wcykge1xuICAgIG1vZGVTcGVjaWZpY1Byb3BzID0ge1xuICAgICAgLi4ubW9kZVNwZWNpZmljUHJvcHMsXG4gICAgICB1dWlkRmV0Y2hTdGF0ZSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaDogYWN0aW9uKCdjbGVhckNvbnZlcnNhdGlvblNlYXJjaCcpLFxuICAgIGNsZWFyR3JvdXBDcmVhdGlvbkVycm9yOiBhY3Rpb24oJ2NsZWFyR3JvdXBDcmVhdGlvbkVycm9yJyksXG4gICAgY2xlYXJTZWFyY2g6IGFjdGlvbignY2xlYXJTZWFyY2gnKSxcbiAgICBjbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbDogYWN0aW9uKCdjbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbCcpLFxuICAgIGNsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbDogYWN0aW9uKCdjbG9zZVJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWwnKSxcbiAgICBjb21wb3NlRGVsZXRlQXZhdGFyRnJvbURpc2s6IGFjdGlvbignY29tcG9zZURlbGV0ZUF2YXRhckZyb21EaXNrJyksXG4gICAgY29tcG9zZVJlcGxhY2VBdmF0YXI6IGFjdGlvbignY29tcG9zZVJlcGxhY2VBdmF0YXInKSxcbiAgICBjb21wb3NlU2F2ZUF2YXRhclRvRGlzazogYWN0aW9uKCdjb21wb3NlU2F2ZUF2YXRhclRvRGlzaycpLFxuICAgIGNyZWF0ZUdyb3VwOiBhY3Rpb24oJ2NyZWF0ZUdyb3VwJyksXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6ICgpID0+IHVuZGVmaW5lZCxcbiAgICBpMThuLFxuICAgIHByZWZlcnJlZFdpZHRoRnJvbVN0b3JhZ2U6IDMyMCxcbiAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgIGNoYWxsZW5nZVN0YXR1czogc2VsZWN0KFxuICAgICAgJ2NoYWxsZW5nZVN0YXR1cycsXG4gICAgICBbJ2lkbGUnLCAncmVxdWlyZWQnLCAncGVuZGluZyddLFxuICAgICAgJ2lkbGUnXG4gICAgKSxcbiAgICBjcmFzaFJlcG9ydENvdW50OiBzZWxlY3QoJ2NoYWxsZW5nZVJlcG9ydENvdW50JywgWzAsIDFdLCAwKSxcbiAgICBzZXRDaGFsbGVuZ2VTdGF0dXM6IGFjdGlvbignc2V0Q2hhbGxlbmdlU3RhdHVzJyksXG4gICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQ6IG1ha2VGYWtlTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQoKSxcbiAgICBzaG93VXNlck5vdEZvdW5kTW9kYWw6IGFjdGlvbignc2hvd1VzZXJOb3RGb3VuZE1vZGFsJyksXG4gICAgc2V0SXNGZXRjaGluZ1VVSUQsXG4gICAgc2hvd0NvbnZlcnNhdGlvbjogYWN0aW9uKCdzaG93Q29udmVyc2F0aW9uJyksXG4gICAgcmVuZGVyRXhwaXJlZEJ1aWxkRGlhbG9nOiAoKSA9PiA8ZGl2IC8+LFxuICAgIHJlbmRlck1haW5IZWFkZXI6ICgpID0+IDxkaXYgLz4sXG4gICAgcmVuZGVyTWVzc2FnZVNlYXJjaFJlc3VsdDogKGlkOiBzdHJpbmcpID0+IChcbiAgICAgIDxNZXNzYWdlU2VhcmNoUmVzdWx0XG4gICAgICAgIGJvZHk9XCJMb3JlbSBpcHN1bSB3b3dcIlxuICAgICAgICBib2R5UmFuZ2VzPXtbXX1cbiAgICAgICAgY29udmVyc2F0aW9uSWQ9XCJtYXJjLWNvbnZvXCJcbiAgICAgICAgZnJvbT17ZGVmYXVsdENvbnZlcnNhdGlvbnNbMF19XG4gICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXsoKSA9PiB1bmRlZmluZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlkPXtpZH1cbiAgICAgICAgc2hvd0NvbnZlcnNhdGlvbj17YWN0aW9uKCdzaG93Q29udmVyc2F0aW9uJyl9XG4gICAgICAgIHNlbnRBdD17MTU4NzM1ODgwMDAwMH1cbiAgICAgICAgc25pcHBldD1cIkxvcmVtIDw8bGVmdD4+aXBzdW08PHJpZ2h0Pj4gd293XCJcbiAgICAgICAgdGhlbWU9e1RoZW1lVHlwZS5saWdodH1cbiAgICAgICAgdG89e2RlZmF1bHRDb252ZXJzYXRpb25zWzFdfVxuICAgICAgLz5cbiAgICApLFxuICAgIHJlbmRlck5ldHdvcmtTdGF0dXM6ICgpID0+IDxkaXYgLz4sXG4gICAgcmVuZGVyUmVsaW5rRGlhbG9nOiAoKSA9PiA8ZGl2IC8+LFxuICAgIHJlbmRlclVwZGF0ZURpYWxvZzogKCkgPT4gPGRpdiAvPixcbiAgICByZW5kZXJDYXB0Y2hhRGlhbG9nOiAoKSA9PiAoXG4gICAgICA8Q2FwdGNoYURpYWxvZ1xuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc1BlbmRpbmc9e292ZXJyaWRlUHJvcHMuY2hhbGxlbmdlU3RhdHVzID09PSAncGVuZGluZyd9XG4gICAgICAgIG9uQ29udGludWU9e2FjdGlvbignb25DYXB0Y2hhQ29udGludWUnKX1cbiAgICAgICAgb25Ta2lwPXthY3Rpb24oJ29uQ2FwdGNoYVNraXAnKX1cbiAgICAgIC8+XG4gICAgKSxcbiAgICByZW5kZXJDcmFzaFJlcG9ydERpYWxvZzogKCkgPT4gKFxuICAgICAgPENyYXNoUmVwb3J0RGlhbG9nXG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIGlzUGVuZGluZz17ZmFsc2V9XG4gICAgICAgIHVwbG9hZENyYXNoUmVwb3J0cz17YWN0aW9uKCd1cGxvYWRDcmFzaFJlcG9ydHMnKX1cbiAgICAgICAgZXJhc2VDcmFzaFJlcG9ydHM9e2FjdGlvbignZXJhc2VDcmFzaFJlcG9ydHMnKX1cbiAgICAgIC8+XG4gICAgKSxcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkOiB1bmRlZmluZWQsXG4gICAgc2VsZWN0ZWRNZXNzYWdlSWQ6IHVuZGVmaW5lZCxcbiAgICBzYXZlUHJlZmVycmVkTGVmdFBhbmVXaWR0aDogYWN0aW9uKCdzYXZlUHJlZmVycmVkTGVmdFBhbmVXaWR0aCcpLFxuICAgIHNlYXJjaEluQ29udmVyc2F0aW9uOiBhY3Rpb24oJ3NlYXJjaEluQ29udmVyc2F0aW9uJyksXG4gICAgc2V0Q29tcG9zZVNlYXJjaFRlcm06IGFjdGlvbignc2V0Q29tcG9zZVNlYXJjaFRlcm0nKSxcbiAgICBzZXRDb21wb3NlR3JvdXBBdmF0YXI6IGFjdGlvbignc2V0Q29tcG9zZUdyb3VwQXZhdGFyJyksXG4gICAgc2V0Q29tcG9zZUdyb3VwTmFtZTogYWN0aW9uKCdzZXRDb21wb3NlR3JvdXBOYW1lJyksXG4gICAgc2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXI6IGFjdGlvbignc2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXInKSxcbiAgICBzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zOiBhY3Rpb24oJ3Nob3dBcmNoaXZlZENvbnZlcnNhdGlvbnMnKSxcbiAgICBzaG93SW5ib3g6IGFjdGlvbignc2hvd0luYm94JyksXG4gICAgc3RhcnRDb21wb3Npbmc6IGFjdGlvbignc3RhcnRDb21wb3NpbmcnKSxcbiAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzOiBhY3Rpb24oJ3Nob3dDaG9vc2VHcm91cE1lbWJlcnMnKSxcbiAgICBzdGFydFNlYXJjaDogYWN0aW9uKCdzdGFydFNlYXJjaCcpLFxuICAgIHN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGE6IGFjdGlvbignc3RhcnRTZXR0aW5nR3JvdXBNZXRhZGF0YScpLFxuICAgIHRoZW1lOiBSZWFjdC51c2VDb250ZXh0KFN0b3J5Ym9va1RoZW1lQ29udGV4dCksXG4gICAgdG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXI6IGFjdGlvbigndG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXInKSxcbiAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnM6IGFjdGlvbihcbiAgICAgICd0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMnXG4gICAgKSxcbiAgICB1cGRhdGVTZWFyY2hUZXJtOiBhY3Rpb24oJ3VwZGF0ZVNlYXJjaFRlcm0nKSxcblxuICAgIC4uLm92ZXJyaWRlUHJvcHMsXG5cbiAgICBtb2RlU3BlY2lmaWNQcm9wcyxcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveE5vQ29udmVyc2F0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkluYm94Tm9Db252ZXJzYXRpb25zLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5ib3g6IG5vIGNvbnZlcnNhdGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluYm94T25seVBpbm5lZENvbnZlcnNhdGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuSW5ib3gsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkluYm94T25seVBpbm5lZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogb25seSBwaW5uZWQgY29udmVyc2F0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hPbmx5Tm9uUGlubmVkQ29udmVyc2F0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGZhbHNlLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkluYm94T25seU5vblBpbm5lZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogb25seSBub24tcGlubmVkIGNvbnZlcnNhdGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluYm94T25seUFyY2hpdmVkQ29udmVyc2F0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IGRlZmF1bHRBcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuSW5ib3hPbmx5QXJjaGl2ZWRDb252ZXJzYXRpb25zLnN0b3J5ID0ge1xuICBuYW1lOiAnSW5ib3g6IG9ubHkgYXJjaGl2ZWQgY29udmVyc2F0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hQaW5uZWRBbmRBcmNoaXZlZENvbnZlcnNhdGlvbnMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuSW5ib3gsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IGRlZmF1bHRBcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuSW5ib3hQaW5uZWRBbmRBcmNoaXZlZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogcGlubmVkIGFuZCBhcmNoaXZlZCBjb252ZXJzYXRpb25zJyxcbn07XG5cbmV4cG9ydCBjb25zdCBJbmJveE5vblBpbm5lZEFuZEFyY2hpdmVkQ29udmVyc2F0aW9ucyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IGRlZmF1bHRBcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuSW5ib3hOb25QaW5uZWRBbmRBcmNoaXZlZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogbm9uLXBpbm5lZCBhbmQgYXJjaGl2ZWQgY29udmVyc2F0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgSW5ib3hQaW5uZWRBbmROb25QaW5uZWRDb252ZXJzYXRpb25zID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIC4uLmRlZmF1bHRTZWFyY2hQcm9wcyxcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkluYm94LFxuICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25zLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbXSxcbiAgICAgICAgaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5JbmJveFBpbm5lZEFuZE5vblBpbm5lZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogcGlubmVkIGFuZCBub24tcGlubmVkIGNvbnZlcnNhdGlvbnMnLFxufTtcblxuZXhwb3J0IGNvbnN0IEluYm94UGlubmVkTm9uUGlubmVkQW5kQXJjaGl2ZWRDb252ZXJzYXRpb25zID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lIHsuLi51c2VQcm9wcygpfSAvPlxuKTtcblxuSW5ib3hQaW5uZWROb25QaW5uZWRBbmRBcmNoaXZlZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdJbmJveDogcGlubmVkLCBub24tcGlubmVkLCBhbmQgYXJjaGl2ZWQgY29udmVyc2F0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgU2VhcmNoTm9SZXN1bHRzV2hlblNlYXJjaGluZ0V2ZXJ5d2hlcmUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuU2VhcmNoLFxuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiBlbXB0eVNlYXJjaFJlc3VsdHNHcm91cCxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IGVtcHR5U2VhcmNoUmVzdWx0c0dyb3VwLFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogZW1wdHlTZWFyY2hSZXN1bHRzR3JvdXAsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogZmFsc2UsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuU2VhcmNoTm9SZXN1bHRzV2hlblNlYXJjaGluZ0V2ZXJ5d2hlcmUuc3RvcnkgPSB7XG4gIG5hbWU6ICdTZWFyY2g6IG5vIHJlc3VsdHMgd2hlbiBzZWFyY2hpbmcgZXZlcnl3aGVyZScsXG59O1xuXG5leHBvcnQgY29uc3QgU2VhcmNoTm9SZXN1bHRzV2hlblNlYXJjaGluZ0V2ZXJ5d2hlcmVTbXMgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuU2VhcmNoLFxuICAgICAgICBjb252ZXJzYXRpb25SZXN1bHRzOiBlbXB0eVNlYXJjaFJlc3VsdHNHcm91cCxcbiAgICAgICAgY29udGFjdFJlc3VsdHM6IGVtcHR5U2VhcmNoUmVzdWx0c0dyb3VwLFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogZW1wdHlTZWFyY2hSZXN1bHRzR3JvdXAsXG4gICAgICAgIHByaW1hcnlTZW5kc1NtczogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5TZWFyY2hOb1Jlc3VsdHNXaGVuU2VhcmNoaW5nRXZlcnl3aGVyZVNtcy5zdG9yeSA9IHtcbiAgbmFtZTogJ1NlYXJjaDogbm8gcmVzdWx0cyB3aGVuIHNlYXJjaGluZyBldmVyeXdoZXJlIChTTVMpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hOb1Jlc3VsdHNXaGVuU2VhcmNoaW5nSW5BQ29udmVyc2F0aW9uID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIC4uLmRlZmF1bHRTZWFyY2hQcm9wcyxcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLlNlYXJjaCxcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czogZW1wdHlTZWFyY2hSZXN1bHRzR3JvdXAsXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiBlbXB0eVNlYXJjaFJlc3VsdHNHcm91cCxcbiAgICAgICAgbWVzc2FnZVJlc3VsdHM6IGVtcHR5U2VhcmNoUmVzdWx0c0dyb3VwLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb25OYW1lOiAnQmluZyBCb25nJyxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5TZWFyY2hOb1Jlc3VsdHNXaGVuU2VhcmNoaW5nSW5BQ29udmVyc2F0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnU2VhcmNoOiBubyByZXN1bHRzIHdoZW4gc2VhcmNoaW5nIGluIGEgY29udmVyc2F0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hBbGxSZXN1bHRzTG9hZGluZyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5TZWFyY2gsXG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHsgaXNMb2FkaW5nOiB0cnVlIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5TZWFyY2hBbGxSZXN1bHRzTG9hZGluZy5zdG9yeSA9IHtcbiAgbmFtZTogJ1NlYXJjaDogYWxsIHJlc3VsdHMgbG9hZGluZycsXG59O1xuXG5leHBvcnQgY29uc3QgU2VhcmNoU29tZVJlc3VsdHNMb2FkaW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIC4uLmRlZmF1bHRTZWFyY2hQcm9wcyxcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLlNlYXJjaCxcbiAgICAgICAgY29udmVyc2F0aW9uUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogZGVmYXVsdENvbnZlcnNhdGlvbnMsXG4gICAgICAgIH0sXG4gICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogdHJ1ZSB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czogeyBpc0xvYWRpbmc6IHRydWUgfSxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5TZWFyY2hTb21lUmVzdWx0c0xvYWRpbmcuc3RvcnkgPSB7XG4gIG5hbWU6ICdTZWFyY2g6IHNvbWUgcmVzdWx0cyBsb2FkaW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hIYXNDb252ZXJzYXRpb25zQW5kQ29udGFjdHNCdXROb3RNZXNzYWdlcyA9XG4gICgpOiBKU1guRWxlbWVudCA9PiAoXG4gICAgPExlZnRQYW5lXG4gICAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAgIC4uLmRlZmF1bHRTZWFyY2hQcm9wcyxcbiAgICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuU2VhcmNoLFxuICAgICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgICByZXN1bHRzOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgICB9LFxuICAgICAgICAgIGNvbnRhY3RSZXN1bHRzOiB7IGlzTG9hZGluZzogZmFsc2UsIHJlc3VsdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zIH0sXG4gICAgICAgICAgbWVzc2FnZVJlc3VsdHM6IHsgaXNMb2FkaW5nOiBmYWxzZSwgcmVzdWx0czogW10gfSxcbiAgICAgICAgICBwcmltYXJ5U2VuZHNTbXM6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcblxuU2VhcmNoSGFzQ29udmVyc2F0aW9uc0FuZENvbnRhY3RzQnV0Tm90TWVzc2FnZXMuc3RvcnkgPSB7XG4gIG5hbWU6ICdTZWFyY2g6IGhhcyBjb252ZXJzYXRpb25zIGFuZCBjb250YWN0cywgYnV0IG5vdCBtZXNzYWdlcycsXG59O1xuXG5leHBvcnQgY29uc3QgU2VhcmNoQWxsUmVzdWx0cyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5TZWFyY2gsXG4gICAgICAgIGNvbnZlcnNhdGlvblJlc3VsdHM6IHtcbiAgICAgICAgICBpc0xvYWRpbmc6IGZhbHNlLFxuICAgICAgICAgIHJlc3VsdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0UmVzdWx0czogeyBpc0xvYWRpbmc6IGZhbHNlLCByZXN1bHRzOiBkZWZhdWx0Q29udmVyc2F0aW9ucyB9LFxuICAgICAgICBtZXNzYWdlUmVzdWx0czoge1xuICAgICAgICAgIGlzTG9hZGluZzogZmFsc2UsXG4gICAgICAgICAgcmVzdWx0czogW1xuICAgICAgICAgICAgeyBpZDogJ21zZzEnLCB0eXBlOiAnb3V0Z29pbmcnLCBjb252ZXJzYXRpb25JZDogJ2ZvbycgfSxcbiAgICAgICAgICAgIHsgaWQ6ICdtc2cyJywgdHlwZTogJ2luY29taW5nJywgY29udmVyc2F0aW9uSWQ6ICdiYXInIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgICAgcHJpbWFyeVNlbmRzU21zOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5TZWFyY2hBbGxSZXN1bHRzLnN0b3J5ID0ge1xuICBuYW1lOiAnU2VhcmNoOiBhbGwgcmVzdWx0cycsXG59O1xuXG5leHBvcnQgY29uc3QgQXJjaGl2ZU5vQXJjaGl2ZWRDb252ZXJzYXRpb25zID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5BcmNoaXZlLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5BcmNoaXZlTm9BcmNoaXZlZENvbnZlcnNhdGlvbnMuc3RvcnkgPSB7XG4gIG5hbWU6ICdBcmNoaXZlOiBubyBhcmNoaXZlZCBjb252ZXJzYXRpb25zJyxcbn07XG5cbmV4cG9ydCBjb25zdCBBcmNoaXZlQXJjaGl2ZWRDb252ZXJzYXRpb25zID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5BcmNoaXZlLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCxcbiAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogMCxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5BcmNoaXZlQXJjaGl2ZWRDb252ZXJzYXRpb25zLnN0b3J5ID0ge1xuICBuYW1lOiAnQXJjaGl2ZTogYXJjaGl2ZWQgY29udmVyc2F0aW9ucycsXG59O1xuXG5leHBvcnQgY29uc3QgQXJjaGl2ZVNlYXJjaGluZ0FDb252ZXJzYXRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkFyY2hpdmUsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogZGVmYXVsdENvbnZlcnNhdGlvbnMsXG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogdW5kZWZpbmVkLFxuICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyOiAwLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkFyY2hpdmVTZWFyY2hpbmdBQ29udmVyc2F0aW9uLnN0b3J5ID0ge1xuICBuYW1lOiAnQXJjaGl2ZTogc2VhcmNoaW5nIGEgY29udmVyc2F0aW9uJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wb3NlTm9SZXN1bHRzID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5Db21wb3NlLFxuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VOb1Jlc3VsdHMuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBubyByZXN1bHRzJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wb3NlU29tZUNvbnRhY3RzTm9TZWFyY2hUZXJtID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5Db21wb3NlLFxuICAgICAgICBjb21wb3NlQ29udGFjdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VTb21lQ29udGFjdHNOb1NlYXJjaFRlcm0uc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzb21lIGNvbnRhY3RzLCBubyBzZWFyY2ggdGVybScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9zZVNvbWVDb250YWN0c1dpdGhBU2VhcmNoVGVybSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ29tcG9zZSxcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnYXInLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VTb21lQ29udGFjdHNXaXRoQVNlYXJjaFRlcm0uc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzb21lIGNvbnRhY3RzLCB3aXRoIGEgc2VhcmNoIHRlcm0nLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBvc2VTb21lR3JvdXBzTm9TZWFyY2hUZXJtID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5Db21wb3NlLFxuICAgICAgICBjb21wb3NlQ29udGFjdHM6IFtdLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBkZWZhdWx0R3JvdXBzLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJycsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuQ29tcG9zZVNvbWVHcm91cHNOb1NlYXJjaFRlcm0uc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzb21lIGdyb3Vwcywgbm8gc2VhcmNoIHRlcm0nLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBvc2VTb21lR3JvdXBzV2l0aFNlYXJjaFRlcm0gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNvbXBvc2UsXG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IGRlZmF1bHRHcm91cHMsXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnYXInLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VTb21lR3JvdXBzV2l0aFNlYXJjaFRlcm0uc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzb21lIGdyb3Vwcywgd2l0aCBzZWFyY2ggdGVybScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9zZVNlYXJjaElzVmFsaWRVc2VybmFtZSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ29tcG9zZSxcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnc29tZW9uZScsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuQ29tcG9zZVNlYXJjaElzVmFsaWRVc2VybmFtZS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IHNlYXJjaCBpcyB2YWxpZCB1c2VybmFtZScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9zZVNlYXJjaElzVmFsaWRVc2VybmFtZUZldGNoaW5nVXNlcm5hbWUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNvbXBvc2UsXG4gICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgIGNvbXBvc2VHcm91cHM6IFtdLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7XG4gICAgICAgICAgJ3VzZXJuYW1lOnNvbWVvbmUnOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnc29tZW9uZScsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuQ29tcG9zZVNlYXJjaElzVmFsaWRVc2VybmFtZUZldGNoaW5nVXNlcm5hbWUuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzZWFyY2ggaXMgdmFsaWQgdXNlcm5hbWUsIGZldGNoaW5nIHVzZXJuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDb21wb3NlU2VhcmNoSXNWYWxpZFVzZXJuYW1lQnV0RmxhZ0lzTm90RW5hYmxlZCA9XG4gICgpOiBKU1guRWxlbWVudCA9PiAoXG4gICAgPExlZnRQYW5lXG4gICAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5Db21wb3NlLFxuICAgICAgICAgIGNvbXBvc2VDb250YWN0czogW10sXG4gICAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiBmYWxzZSxcbiAgICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgICBzZWFyY2hUZXJtOiAnc29tZW9uZScsXG4gICAgICAgIH0sXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xuXG5Db21wb3NlU2VhcmNoSXNWYWxpZFVzZXJuYW1lQnV0RmxhZ0lzTm90RW5hYmxlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IHNlYXJjaCBpcyB2YWxpZCB1c2VybmFtZSwgYnV0IGZsYWcgaXMgbm90IGVuYWJsZWQnLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBvc2VTZWFyY2hJc1BhcnRpYWxQaG9uZU51bWJlciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ29tcG9zZSxcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogZmFsc2UsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJysxKDIxMik1NTUnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VTZWFyY2hJc1BhcnRpYWxQaG9uZU51bWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IHNlYXJjaCBpcyBwYXJ0aWFsIHBob25lIG51bWJlcicsXG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9zZVNlYXJjaElzVmFsaWRQaG9uZU51bWJlciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ29tcG9zZSxcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgY29tcG9zZUdyb3VwczogW10sXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWFyY2hUZXJtOiAnMjEyNTU1NTQ1NCcsXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuQ29tcG9zZVNlYXJjaElzVmFsaWRQaG9uZU51bWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IHNlYXJjaCBpcyB2YWxpZCBwaG9uZSBudW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBvc2VTZWFyY2hJc1ZhbGlkUGhvbmVOdW1iZXJGZXRjaGluZ1Bob25lTnVtYmVyID1cbiAgKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgICA8TGVmdFBhbmVcbiAgICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNvbXBvc2UsXG4gICAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBbXSxcbiAgICAgICAgICBjb21wb3NlR3JvdXBzOiBbXSxcbiAgICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgdXVpZEZldGNoU3RhdGU6IHtcbiAgICAgICAgICAgICdlMTY0OisxMjEyNTU1NTQ1NCc6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICcoMjEyKTU1NTU0NTQnLFxuICAgICAgICB9LFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcblxuQ29tcG9zZVNlYXJjaElzVmFsaWRQaG9uZU51bWJlckZldGNoaW5nUGhvbmVOdW1iZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdDb21wb3NlOiBzZWFyY2ggaXMgdmFsaWQgcGhvbmUgbnVtYmVyLCBmZXRjaGluZyBwaG9uZSBudW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IENvbXBvc2VBbGxLaW5kc09mUmVzdWx0c05vU2VhcmNoVGVybSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ29tcG9zZSxcbiAgICAgICAgY29tcG9zZUNvbnRhY3RzOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgY29tcG9zZUdyb3VwczogZGVmYXVsdEdyb3VwcyxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VBbGxLaW5kc09mUmVzdWx0c05vU2VhcmNoVGVybS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IGFsbCBraW5kcyBvZiByZXN1bHRzLCBubyBzZWFyY2ggdGVybScsXG59O1xuXG5leHBvcnQgY29uc3QgQ29tcG9zZUFsbEtpbmRzT2ZSZXN1bHRzV2l0aEFTZWFyY2hUZXJtID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5Db21wb3NlLFxuICAgICAgICBjb21wb3NlQ29udGFjdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBkZWZhdWx0R3JvdXBzLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VhcmNoVGVybTogJ3NvbWVvbmUnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNvbXBvc2VBbGxLaW5kc09mUmVzdWx0c1dpdGhBU2VhcmNoVGVybS5zdG9yeSA9IHtcbiAgbmFtZTogJ0NvbXBvc2U6IGFsbCBraW5kcyBvZiByZXN1bHRzLCB3aXRoIGEgc2VhcmNoIHRlcm0nLFxufTtcblxuZXhwb3J0IGNvbnN0IENhcHRjaGFEaWFsb2dSZXF1aXJlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgY29udmVyc2F0aW9uczogZGVmYXVsdENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICAgIGNoYWxsZW5nZVN0YXR1czogJ3JlcXVpcmVkJyxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNhcHRjaGFEaWFsb2dSZXF1aXJlZC5zdG9yeSA9IHtcbiAgbmFtZTogJ0NhcHRjaGEgZGlhbG9nOiByZXF1aXJlZCcsXG59O1xuXG5leHBvcnQgY29uc3QgQ2FwdGNoYURpYWxvZ1BlbmRpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuSW5ib3gsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGNvbnZlcnNhdGlvbnM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGZhbHNlLFxuICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgIH0sXG4gICAgICBjaGFsbGVuZ2VTdGF0dXM6ICdwZW5kaW5nJyxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNhcHRjaGFEaWFsb2dQZW5kaW5nLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2FwdGNoYSBkaWFsb2c6IHBlbmRpbmcnLFxufTtcblxuZXhwb3J0IGNvbnN0IF9DcmFzaFJlcG9ydERpYWxvZyA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICAuLi5kZWZhdWx0U2VhcmNoUHJvcHMsXG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5JbmJveCxcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgY29udmVyc2F0aW9uczogZGVmYXVsdENvbnZlcnNhdGlvbnMsXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uczogW10sXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZmFsc2UsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICAgIGNyYXNoUmVwb3J0Q291bnQ6IDQyLFxuICAgIH0pfVxuICAvPlxuKTtcblxuX0NyYXNoUmVwb3J0RGlhbG9nLnN0b3J5ID0ge1xuICBuYW1lOiAnQ3Jhc2ggcmVwb3J0IGRpYWxvZycsXG59O1xuXG5leHBvcnQgY29uc3QgQ2hvb3NlR3JvdXBNZW1iZXJzUGFydGlhbFBob25lTnVtYmVyID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5DaG9vc2VHcm91cE1lbWJlcnMsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtdLFxuICAgICAgICBpc1Nob3dpbmdSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsOiBmYWxzZSxcbiAgICAgICAgaXNTaG93aW5nTWF4aW11bUdyb3VwU2l6ZU1vZGFsOiBmYWxzZSxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICBzZWFyY2hUZXJtOiAnKzEoMjEyKSA1NTUnLFxuICAgICAgICByZWdpb25Db2RlOiAnVVMnLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBbXSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5DaG9vc2VHcm91cE1lbWJlcnNQYXJ0aWFsUGhvbmVOdW1iZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdDaG9vc2UgR3JvdXAgTWVtYmVyczogUGFydGlhbCBwaG9uZSBudW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IENob29zZUdyb3VwTWVtYmVyc1ZhbGlkUGhvbmVOdW1iZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNob29zZUdyb3VwTWVtYmVycyxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgICBjYW5kaWRhdGVDb250YWN0czogW10sXG4gICAgICAgIGlzU2hvd2luZ1JlY29tbWVuZGVkR3JvdXBTaXplTW9kYWw6IGZhbHNlLFxuICAgICAgICBpc1Nob3dpbmdNYXhpbXVtR3JvdXBTaXplTW9kYWw6IGZhbHNlLFxuICAgICAgICBpc1VzZXJuYW1lc0VuYWJsZWQ6IHRydWUsXG4gICAgICAgIHNlYXJjaFRlcm06ICcrMSgyMTIpIDU1NSA1NDU0JyxcbiAgICAgICAgcmVnaW9uQ29kZTogJ1VTJyxcbiAgICAgICAgc2VsZWN0ZWRDb250YWN0czogW10sXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuQ2hvb3NlR3JvdXBNZW1iZXJzVmFsaWRQaG9uZU51bWJlci5zdG9yeSA9IHtcbiAgbmFtZTogJ0Nob29zZSBHcm91cCBNZW1iZXJzOiBWYWxpZCBwaG9uZSBudW1iZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IENob29zZUdyb3VwTWVtYmVyc1VzZXJuYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPExlZnRQYW5lXG4gICAgey4uLnVzZVByb3BzKHtcbiAgICAgIG1vZGVTcGVjaWZpY1Byb3BzOiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5DaG9vc2VHcm91cE1lbWJlcnMsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiB7fSxcbiAgICAgICAgY2FuZGlkYXRlQ29udGFjdHM6IFtdLFxuICAgICAgICBpc1Nob3dpbmdSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsOiBmYWxzZSxcbiAgICAgICAgaXNTaG93aW5nTWF4aW11bUdyb3VwU2l6ZU1vZGFsOiBmYWxzZSxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiB0cnVlLFxuICAgICAgICBzZWFyY2hUZXJtOiAnQHNpZ25hbCcsXG4gICAgICAgIHJlZ2lvbkNvZGU6ICdVUycsXG4gICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IFtdLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkNob29zZUdyb3VwTWVtYmVyc1VzZXJuYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnQ2hvb3NlIEdyb3VwIE1lbWJlcnM6IHVzZXJuYW1lJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cE1ldGFkYXRhTm9UaW1lciA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxMZWZ0UGFuZVxuICAgIHsuLi51c2VQcm9wcyh7XG4gICAgICBtb2RlU3BlY2lmaWNQcm9wczoge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuU2V0R3JvdXBNZXRhZGF0YSxcbiAgICAgICAgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICAgICAgZ3JvdXBOYW1lOiAnR3JvdXAgMScsXG4gICAgICAgIGdyb3VwRXhwaXJlVGltZXI6IDAsXG4gICAgICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgIGlzRWRpdGluZ0F2YXRhcjogZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICB1c2VyQXZhdGFyRGF0YTogW10sXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuR3JvdXBNZXRhZGF0YU5vVGltZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBNZXRhZGF0YTogTm8gVGltZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwTWV0YWRhdGFSZWd1bGFyVGltZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLlNldEdyb3VwTWV0YWRhdGEsXG4gICAgICAgIGdyb3VwQXZhdGFyOiB1bmRlZmluZWQsXG4gICAgICAgIGdyb3VwTmFtZTogJ0dyb3VwIDEnLFxuICAgICAgICBncm91cEV4cGlyZVRpbWVyOiAyNCAqIDM2MDAsXG4gICAgICAgIGhhc0Vycm9yOiBmYWxzZSxcbiAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgIGlzRWRpdGluZ0F2YXRhcjogZmFsc2UsXG4gICAgICAgIHNlbGVjdGVkQ29udGFjdHM6IGRlZmF1bHRDb252ZXJzYXRpb25zLFxuICAgICAgICB1c2VyQXZhdGFyRGF0YTogW10sXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuR3JvdXBNZXRhZGF0YVJlZ3VsYXJUaW1lci5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIE1ldGFkYXRhOiBSZWd1bGFyIFRpbWVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cE1ldGFkYXRhQ3VzdG9tVGltZXIgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLlNldEdyb3VwTWV0YWRhdGEsXG4gICAgICAgIGdyb3VwQXZhdGFyOiB1bmRlZmluZWQsXG4gICAgICAgIGdyb3VwTmFtZTogJ0dyb3VwIDEnLFxuICAgICAgICBncm91cEV4cGlyZVRpbWVyOiA3ICogMzYwMCxcbiAgICAgICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0aW5nOiBmYWxzZSxcbiAgICAgICAgaXNFZGl0aW5nQXZhdGFyOiBmYWxzZSxcbiAgICAgICAgc2VsZWN0ZWRDb250YWN0czogZGVmYXVsdENvbnZlcnNhdGlvbnMsXG4gICAgICAgIHVzZXJBdmF0YXJEYXRhOiBbXSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Hcm91cE1ldGFkYXRhQ3VzdG9tVGltZXIuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBNZXRhZGF0YTogQ3VzdG9tIFRpbWVyJyxcbn07XG5cbmV4cG9ydCBjb25zdCBTZWFyY2hpbmdDb252ZXJzYXRpb24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8TGVmdFBhbmVcbiAgICB7Li4udXNlUHJvcHMoe1xuICAgICAgbW9kZVNwZWNpZmljUHJvcHM6IHtcbiAgICAgICAgLi4uZGVmYXVsdFNlYXJjaFByb3BzLFxuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuSW5ib3gsXG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbnM6IFtdLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBkZWZhdWx0Q29udmVyc2F0aW9ucyxcbiAgICAgICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zOiBbXSxcbiAgICAgICAgaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uOiBmYWxzZSxcbiAgICAgICAgc2VhcmNoQ29udmVyc2F0aW9uOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLFlBQXVCO0FBRXZCLDJCQUF1QjtBQUN2Qix5QkFBdUI7QUFHdkIsc0JBQXVDO0FBQ3ZDLDJCQUE4QjtBQUM5QiwrQkFBa0M7QUFFbEMsaUNBQW9DO0FBQ3BDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsa0JBQTBCO0FBQzFCLG9DQUF1QztBQUN2QyxtQ0FBc0M7QUFDdEMsK0NBR087QUFFUCxNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLDJCQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLHVCQUFnRDtBQUFBLEVBQ3BELDBEQUF1QjtBQUFBLElBQ3JCLElBQUk7QUFBQSxJQUNKLE9BQU87QUFBQSxFQUNULENBQUM7QUFBQSxFQUNELDBEQUF1QjtBQUFBLElBQ3JCLElBQUk7QUFBQSxJQUNKLFlBQVk7QUFBQSxJQUNaLE9BQU87QUFBQSxFQUNULENBQUM7QUFDSDtBQUVBLE1BQU0scUJBQXFCO0FBQUEsRUFDekIsb0JBQW9CO0FBQUEsRUFDcEIsZ0JBQWdCO0FBQUEsRUFDaEIsWUFBWTtBQUFBLEVBQ1osb0JBQW9CO0FBQ3RCO0FBRUEsTUFBTSxnQkFBeUM7QUFBQSxFQUM3QywwREFBdUI7QUFBQSxJQUNyQixJQUFJO0FBQUEsSUFDSixPQUFPO0FBQUEsSUFDUCxN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
