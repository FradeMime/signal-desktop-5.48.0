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
var conversations_exports = {};
__export(conversations_exports, {
  _conversationMessagesSelector: () => _conversationMessagesSelector,
  _conversationSelector: () => _conversationSelector,
  _getConversationComparator: () => _getConversationComparator,
  _getLeftPaneLists: () => _getLeftPaneLists,
  getAllComposableConversations: () => getAllComposableConversations,
  getAllConversations: () => getAllConversations,
  getCachedSelectorForConversation: () => getCachedSelectorForConversation,
  getCachedSelectorForConversationMessages: () => getCachedSelectorForConversationMessages,
  getCachedSelectorForMessage: () => getCachedSelectorForMessage,
  getCandidateContactsForNewGroup: () => getCandidateContactsForNewGroup,
  getComposableContacts: () => getComposableContacts,
  getComposableGroups: () => getComposableGroups,
  getComposeAvatarData: () => getComposeAvatarData,
  getComposeGroupAvatar: () => getComposeGroupAvatar,
  getComposeGroupExpireTimer: () => getComposeGroupExpireTimer,
  getComposeGroupName: () => getComposeGroupName,
  getComposeSelectedContacts: () => getComposeSelectedContacts,
  getComposerConversationSearchTerm: () => getComposerConversationSearchTerm,
  getComposerStep: () => getComposerStep,
  getComposerUUIDFetchState: () => getComposerUUIDFetchState,
  getContactNameColorSelector: () => getContactNameColorSelector,
  getConversationByIdSelector: () => getConversationByIdSelector,
  getConversationByUuidSelector: () => getConversationByUuidSelector,
  getConversationComparator: () => getConversationComparator,
  getConversationIdsStoppedForVerification: () => getConversationIdsStoppedForVerification,
  getConversationLookup: () => getConversationLookup,
  getConversationMessagesSelector: () => getConversationMessagesSelector,
  getConversationSelector: () => getConversationSelector,
  getConversationUuidsStoppingSend: () => getConversationUuidsStoppingSend,
  getConversations: () => getConversations,
  getConversationsByE164: () => getConversationsByE164,
  getConversationsByGroupId: () => getConversationsByGroupId,
  getConversationsByTitleSelector: () => getConversationsByTitleSelector,
  getConversationsByUsername: () => getConversationsByUsername,
  getConversationsByUuid: () => getConversationsByUuid,
  getConversationsStoppedForVerification: () => getConversationsStoppedForVerification,
  getConversationsStoppingSend: () => getConversationsStoppingSend,
  getConversationsWithCustomColorSelector: () => getConversationsWithCustomColorSelector,
  getFilteredCandidateContactsForNewGroup: () => getFilteredCandidateContactsForNewGroup,
  getFilteredComposeContacts: () => getFilteredComposeContacts,
  getFilteredComposeGroups: () => getFilteredComposeGroups,
  getGroupAdminsSelector: () => getGroupAdminsSelector,
  getInvitedContactsForNewlyCreatedGroup: () => getInvitedContactsForNewlyCreatedGroup,
  getLeftPaneLists: () => getLeftPaneLists,
  getMaximumGroupSizeModalState: () => getMaximumGroupSizeModalState,
  getMe: () => getMe,
  getMessageSelector: () => getMessageSelector,
  getMessages: () => getMessages,
  getMessagesByConversation: () => getMessagesByConversation,
  getPlaceholderContact: () => getPlaceholderContact,
  getPreJoinConversation: () => getPreJoinConversation,
  getRecommendedGroupSizeModalState: () => getRecommendedGroupSizeModalState,
  getSelectedConversationId: () => getSelectedConversationId,
  getSelectedMessage: () => getSelectedMessage,
  getShowArchived: () => getShowArchived,
  getUsernameSaveState: () => getUsernameSaveState,
  hasGroupCreationError: () => hasGroupCreationError,
  isCreatingGroup: () => isCreatingGroup,
  isEditingAvatar: () => isEditingAvatar,
  isMissingRequiredProfileSharing: () => isMissingRequiredProfileSharing
});
module.exports = __toCommonJS(conversations_exports);
var import_memoizee = __toESM(require("memoizee"));
var import_lodash = require("lodash");
var import_reselect = require("reselect");
var import_conversationsEnums = require("../ducks/conversationsEnums");
var import_getOwn = require("../../util/getOwn");
var import_isNotNil = require("../../util/isNotNil");
var import_deconstructLookup = require("../../util/deconstructLookup");
var import_assert = require("../../util/assert");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
var import_filterAndSortConversations = require("../../util/filterAndSortConversations");
var import_Colors = require("../../types/Colors");
var import_isInSystemContacts = require("../../util/isInSystemContacts");
var import_sortByTitle = require("../../util/sortByTitle");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_user = require("./user");
var import_items = require("./items");
var import_message = require("./message");
var import_calling = require("./calling");
var import_accounts = require("./accounts");
var log = __toESM(require("../../logging/log"));
var import_timelineUtil = require("../../util/timelineUtil");
let placeholderContact;
const getPlaceholderContact = /* @__PURE__ */ __name(() => {
  if (placeholderContact) {
    return placeholderContact;
  }
  placeholderContact = {
    acceptedMessageRequest: false,
    badges: [],
    id: "placeholder-contact",
    type: "direct",
    title: window.i18n("unknownContact"),
    isMe: false,
    sharedGroupNames: []
  };
  return placeholderContact;
}, "getPlaceholderContact");
const getConversations = /* @__PURE__ */ __name((state) => state.conversations, "getConversations");
const getPreJoinConversation = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.preJoinConversation;
});
const getConversationLookup = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.conversationLookup;
});
const getConversationsByUuid = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.conversationsByUuid;
});
const getConversationsByE164 = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.conversationsByE164;
});
const getConversationsByGroupId = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.conversationsByGroupId;
});
const getConversationsByUsername = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.conversationsByUsername;
});
const getAllConversations = (0, import_reselect.createSelector)(getConversationLookup, (lookup) => Object.values(lookup));
const getConversationsByTitleSelector = (0, import_reselect.createSelector)(getAllConversations, (conversations) => (title) => conversations.filter((conversation) => conversation.title === title));
const getSelectedConversationId = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.selectedConversationId;
});
const getSelectedMessage = (0, import_reselect.createSelector)(getConversations, (state) => {
  if (!state.selectedMessage) {
    return void 0;
  }
  return {
    id: state.selectedMessage,
    counter: state.selectedMessageCounter
  };
});
const getUsernameSaveState = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.usernameSaveState;
});
const getShowArchived = (0, import_reselect.createSelector)(getConversations, (state) => {
  return Boolean(state.showArchived);
});
const getComposerState = (0, import_reselect.createSelector)(getConversations, (state) => state.composer);
const getComposerStep = (0, import_reselect.createSelector)(getComposerState, (composerState) => composerState?.step);
const hasGroupCreationError = (0, import_reselect.createSelector)(getComposerState, (composerState) => {
  if (composerState?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata) {
    return composerState.hasError;
  }
  return false;
});
const isCreatingGroup = (0, import_reselect.createSelector)(getComposerState, (composerState) => composerState?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && composerState.isCreating);
const isEditingAvatar = (0, import_reselect.createSelector)(getComposerState, (composerState) => composerState?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && composerState.isEditingAvatar);
const getComposeAvatarData = (0, import_reselect.createSelector)(getComposerState, (composerState) => composerState?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata ? composerState.userAvatarData : []);
const getMessages = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.messagesLookup;
});
const getMessagesByConversation = (0, import_reselect.createSelector)(getConversations, (state) => {
  return state.messagesByConversation;
});
const collator = new Intl.Collator();
const _getConversationComparator = /* @__PURE__ */ __name(() => {
  return (left, right) => {
    const leftTimestamp = left.timestamp;
    const rightTimestamp = right.timestamp;
    if (leftTimestamp && !rightTimestamp) {
      return -1;
    }
    if (rightTimestamp && !leftTimestamp) {
      return 1;
    }
    if (leftTimestamp && rightTimestamp && leftTimestamp !== rightTimestamp) {
      return rightTimestamp - leftTimestamp;
    }
    if (typeof left.inboxPosition === "number" && typeof right.inboxPosition === "number") {
      return right.inboxPosition > left.inboxPosition ? -1 : 1;
    }
    if (typeof left.inboxPosition === "number" && right.inboxPosition == null) {
      return -1;
    }
    if (typeof right.inboxPosition === "number" && left.inboxPosition == null) {
      return 1;
    }
    return collator.compare(left.title, right.title);
  };
}, "_getConversationComparator");
const getConversationComparator = (0, import_reselect.createSelector)(import_user.getIntl, import_user.getRegionCode, _getConversationComparator);
const _getLeftPaneLists = /* @__PURE__ */ __name((lookup, comparator, selectedConversation, pinnedConversationIds) => {
  const conversations = [];
  const archivedConversations = [];
  const pinnedConversations = [];
  const values = Object.values(lookup);
  const max = values.length;
  for (let i = 0; i < max; i += 1) {
    let conversation = values[i];
    if (selectedConversation === conversation.id) {
      conversation = {
        ...conversation,
        isSelected: true
      };
    }
    if (conversation.isPinned) {
      pinnedConversations.push(conversation);
      continue;
    }
    if (conversation.activeAt) {
      if (conversation.isArchived) {
        archivedConversations.push(conversation);
      } else {
        conversations.push(conversation);
      }
    }
  }
  conversations.sort(comparator);
  archivedConversations.sort(comparator);
  pinnedConversations.sort((a, b) => (pinnedConversationIds || []).indexOf(a.id) - (pinnedConversationIds || []).indexOf(b.id));
  return { conversations, archivedConversations, pinnedConversations };
}, "_getLeftPaneLists");
const getLeftPaneLists = (0, import_reselect.createSelector)(getConversationLookup, getConversationComparator, getSelectedConversationId, import_items.getPinnedConversationIds, _getLeftPaneLists);
const getMaximumGroupSizeModalState = (0, import_reselect.createSelector)(getComposerState, (composerState) => {
  switch (composerState?.step) {
    case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
    case import_conversationsEnums.ComposerStep.SetGroupMetadata:
      return composerState.maximumGroupSizeModalState;
    default:
      (0, import_assert.assert)(false, `Can't get the maximum group size modal state in this composer state; returning "never shown"`);
      return import_conversationsEnums.OneTimeModalState.NeverShown;
  }
});
const getRecommendedGroupSizeModalState = (0, import_reselect.createSelector)(getComposerState, (composerState) => {
  switch (composerState?.step) {
    case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
    case import_conversationsEnums.ComposerStep.SetGroupMetadata:
      return composerState.recommendedGroupSizeModalState;
    default:
      (0, import_assert.assert)(false, `Can't get the recommended group size modal state in this composer state; returning "never shown"`);
      return import_conversationsEnums.OneTimeModalState.NeverShown;
  }
});
const getMe = (0, import_reselect.createSelector)([getConversationLookup, import_user.getUserConversationId], (lookup, ourConversationId) => {
  if (!ourConversationId) {
    return getPlaceholderContact();
  }
  return lookup[ourConversationId] || getPlaceholderContact();
});
const getComposerConversationSearchTerm = (0, import_reselect.createSelector)(getComposerState, (composer) => {
  if (!composer) {
    (0, import_assert.assert)(false, "getComposerConversationSearchTerm: composer is not open");
    return "";
  }
  if (composer.step === import_conversationsEnums.ComposerStep.SetGroupMetadata) {
    (0, import_assert.assert)(false, "getComposerConversationSearchTerm: composer does not have a search term");
    return "";
  }
  return composer.searchTerm;
});
const getComposerUUIDFetchState = (0, import_reselect.createSelector)(getComposerState, (composer) => {
  if (!composer) {
    (0, import_assert.assert)(false, "getIsFetchingUsername: composer is not open");
    return {};
  }
  if (composer.step !== import_conversationsEnums.ComposerStep.StartDirectConversation && composer.step !== import_conversationsEnums.ComposerStep.ChooseGroupMembers) {
    (0, import_assert.assert)(false, `getComposerUUIDFetchState: step ${composer.step} has no uuidFetchState key`);
    return {};
  }
  return composer.uuidFetchState;
});
function isTrusted(conversation) {
  if (conversation.type === "group") {
    return true;
  }
  return Boolean((0, import_isInSystemContacts.isInSystemContacts)(conversation) || conversation.sharedGroupNames.length > 0 || conversation.profileSharing || conversation.isMe);
}
function hasDisplayInfo(conversation) {
  if (conversation.type === "group") {
    return Boolean(conversation.name);
  }
  return Boolean(conversation.name || conversation.profileName || conversation.phoneNumber || conversation.isMe);
}
function canComposeConversation(conversation) {
  return Boolean(!conversation.isBlocked && !(0, import_isConversationUnregistered.isConversationUnregistered)(conversation) && hasDisplayInfo(conversation) && isTrusted(conversation));
}
const getAllComposableConversations = (0, import_reselect.createSelector)(getConversationLookup, (conversationLookup) => Object.values(conversationLookup).filter((conversation) => !conversation.isBlocked && !conversation.isGroupV1AndDisabled && !(0, import_isConversationUnregistered.isConversationUnregistered)(conversation) && conversation.title && hasDisplayInfo(conversation)));
const getComposableContacts = (0, import_reselect.createSelector)(getConversationLookup, (conversationLookup) => Object.values(conversationLookup).filter((conversation) => conversation.type === "direct" && canComposeConversation(conversation)));
const getCandidateContactsForNewGroup = (0, import_reselect.createSelector)(getConversationLookup, (conversationLookup) => Object.values(conversationLookup).filter((conversation) => conversation.type === "direct" && !conversation.isMe && canComposeConversation(conversation)));
const getComposableGroups = (0, import_reselect.createSelector)(getConversationLookup, (conversationLookup) => Object.values(conversationLookup).filter((conversation) => conversation.type === "group" && canComposeConversation(conversation)));
const getNormalizedComposerConversationSearchTerm = (0, import_reselect.createSelector)(getComposerConversationSearchTerm, (searchTerm) => searchTerm.trim());
const getFilteredComposeContacts = (0, import_reselect.createSelector)(getNormalizedComposerConversationSearchTerm, getComposableContacts, import_user.getRegionCode, (searchTerm, contacts, regionCode) => {
  return (0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(contacts, searchTerm, regionCode);
});
const getFilteredComposeGroups = (0, import_reselect.createSelector)(getNormalizedComposerConversationSearchTerm, getComposableGroups, import_user.getRegionCode, (searchTerm, groups, regionCode) => {
  return (0, import_filterAndSortConversations.filterAndSortConversationsByRecent)(groups, searchTerm, regionCode);
});
const getFilteredCandidateContactsForNewGroup = (0, import_reselect.createSelector)(getCandidateContactsForNewGroup, getNormalizedComposerConversationSearchTerm, import_user.getRegionCode, import_filterAndSortConversations.filterAndSortConversationsByRecent);
const getGroupCreationComposerState = (0, import_reselect.createSelector)(getComposerState, (composerState) => {
  switch (composerState?.step) {
    case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
    case import_conversationsEnums.ComposerStep.SetGroupMetadata:
      return composerState;
    default:
      (0, import_assert.assert)(false, "getSetGroupMetadataComposerState: expected step to be SetGroupMetadata");
      return {
        groupName: "",
        groupAvatar: void 0,
        groupExpireTimer: 0,
        selectedConversationIds: []
      };
  }
});
const getComposeGroupAvatar = (0, import_reselect.createSelector)(getGroupCreationComposerState, (composerState) => composerState.groupAvatar);
const getComposeGroupName = (0, import_reselect.createSelector)(getGroupCreationComposerState, (composerState) => composerState.groupName);
const getComposeGroupExpireTimer = (0, import_reselect.createSelector)(getGroupCreationComposerState, (composerState) => composerState.groupExpireTimer);
const getComposeSelectedContacts = (0, import_reselect.createSelector)(getConversationLookup, getGroupCreationComposerState, (conversationLookup, composerState) => (0, import_deconstructLookup.deconstructLookup)(conversationLookup, composerState.selectedConversationIds));
function _conversationSelector(conversation) {
  if (conversation) {
    return conversation;
  }
  return getPlaceholderContact();
}
const getCachedSelectorForConversation = (0, import_reselect.createSelector)(import_user.getRegionCode, import_user.getUserNumber, () => {
  return (0, import_memoizee.default)(_conversationSelector, { max: 2e3 });
});
const getConversationSelector = (0, import_reselect.createSelector)(getCachedSelectorForConversation, getConversationLookup, getConversationsByUuid, getConversationsByE164, getConversationsByGroupId, (selector, byId, byUuid, byE164, byGroupId) => {
  return (id) => {
    if (!id) {
      return selector(void 0);
    }
    const onUuid = (0, import_getOwn.getOwn)(byUuid, id.toLowerCase ? id.toLowerCase() : id);
    if (onUuid) {
      return selector(onUuid);
    }
    const onE164 = (0, import_getOwn.getOwn)(byE164, id);
    if (onE164) {
      return selector(onE164);
    }
    const onGroupId = (0, import_getOwn.getOwn)(byGroupId, id);
    if (onGroupId) {
      return selector(onGroupId);
    }
    const onId = (0, import_getOwn.getOwn)(byId, id);
    if (onId) {
      return selector(onId);
    }
    log.warn(`getConversationSelector: No conversation found for id ${id}`);
    return selector(void 0);
  };
});
const getConversationByIdSelector = (0, import_reselect.createSelector)(getConversationLookup, (conversationLookup) => (id) => (0, import_getOwn.getOwn)(conversationLookup, id));
const getConversationByUuidSelector = (0, import_reselect.createSelector)(getConversationsByUuid, (conversationsByUuid) => (uuid) => (0, import_getOwn.getOwn)(conversationsByUuid, uuid));
const getCachedSelectorForMessage = (0, import_reselect.createSelector)(import_user.getRegionCode, import_user.getUserNumber, () => {
  return (0, import_memoizee.default)(import_message.getPropsForBubble, { max: 2e3 });
});
const getCachedConversationMemberColorsSelector = (0, import_reselect.createSelector)(getConversationSelector, import_user.getUserConversationId, (conversationSelector, ourConversationId) => {
  return (0, import_memoizee.default)((conversationId) => {
    const contactNameColors = /* @__PURE__ */ new Map();
    const {
      sortedGroupMembers = [],
      type,
      id: theirId
    } = conversationSelector(conversationId);
    if (type === "direct") {
      if (ourConversationId) {
        contactNameColors.set(ourConversationId, import_Colors.ContactNameColors[0]);
      }
      contactNameColors.set(theirId, import_Colors.ContactNameColors[0]);
      return contactNameColors;
    }
    [...sortedGroupMembers].sort((left, right) => String(left.uuid) > String(right.uuid) ? 1 : -1).forEach((member, i) => {
      contactNameColors.set(member.id, import_Colors.ContactNameColors[i % import_Colors.ContactNameColors.length]);
    });
    return contactNameColors;
  }, { max: 100 });
});
const getContactNameColorSelector = (0, import_reselect.createSelector)(getCachedConversationMemberColorsSelector, (conversationMemberColorsSelector) => {
  return (conversationId, contactId) => {
    if (!contactId) {
      log.warn("No color generated for missing contactId");
      return import_Colors.ContactNameColors[0];
    }
    const contactNameColors = conversationMemberColorsSelector(conversationId);
    const color = contactNameColors.get(contactId);
    if (!color) {
      log.warn(`No color generated for contact ${contactId}`);
      return import_Colors.ContactNameColors[0];
    }
    return color;
  };
});
const getMessageSelector = (0, import_reselect.createSelector)(getCachedSelectorForMessage, getMessages, getSelectedMessage, getConversationSelector, import_user.getRegionCode, import_user.getUserNumber, import_user.getUserUuid, import_user.getUserConversationId, import_calling.getCallSelector, import_calling.getActiveCall, import_accounts.getAccountSelector, getContactNameColorSelector, (messageSelector, messageLookup, selectedMessage, conversationSelector, regionCode, ourNumber, ourUuid, ourConversationId, callSelector, activeCall, accountSelector, contactNameColorSelector) => {
  return (id) => {
    const message = messageLookup[id];
    if (!message) {
      return void 0;
    }
    return messageSelector(message, {
      conversationSelector,
      ourConversationId,
      ourNumber,
      ourUuid,
      regionCode,
      selectedMessageId: selectedMessage?.id,
      selectedMessageCounter: selectedMessage?.counter,
      contactNameColorSelector,
      callSelector,
      activeCall,
      accountSelector
    });
  };
});
function _conversationMessagesSelector(conversation) {
  const {
    isNearBottom,
    messageChangeCounter,
    messageIds,
    messageLoadingState,
    metrics,
    scrollToMessageCounter,
    scrollToMessageId
  } = conversation;
  const firstId = messageIds[0];
  const lastId = messageIds.length === 0 ? void 0 : messageIds[messageIds.length - 1];
  const { oldestUnseen } = metrics;
  const haveNewest = !metrics.newest || !lastId || lastId === metrics.newest.id;
  const haveOldest = !metrics.oldest || !firstId || firstId === metrics.oldest.id;
  const items = messageIds;
  const oldestUnseenIndex = oldestUnseen ? messageIds.findIndex((id) => id === oldestUnseen.id) : void 0;
  const scrollToIndex = scrollToMessageId ? messageIds.findIndex((id) => id === scrollToMessageId) : void 0;
  const { totalUnseen } = metrics;
  return {
    haveNewest,
    haveOldest,
    isNearBottom,
    items,
    messageChangeCounter,
    messageLoadingState,
    oldestUnseenIndex: (0, import_lodash.isNumber)(oldestUnseenIndex) && oldestUnseenIndex >= 0 ? oldestUnseenIndex : void 0,
    scrollToIndex: (0, import_lodash.isNumber)(scrollToIndex) && scrollToIndex >= 0 ? scrollToIndex : void 0,
    scrollToIndexCounter: scrollToMessageCounter,
    totalUnseen
  };
}
const getCachedSelectorForConversationMessages = (0, import_reselect.createSelector)(import_user.getRegionCode, import_user.getUserNumber, () => {
  return (0, import_memoizee.default)(_conversationMessagesSelector, { max: 50 });
});
const getConversationMessagesSelector = (0, import_reselect.createSelector)(getCachedSelectorForConversationMessages, getMessagesByConversation, (conversationMessagesSelector, messagesByConversation) => {
  return (id) => {
    const conversation = messagesByConversation[id];
    if (!conversation) {
      return {
        haveNewest: false,
        haveOldest: false,
        messageChangeCounter: 0,
        messageLoadingState: import_timelineUtil.TimelineMessageLoadingState.DoingInitialLoad,
        scrollToIndexCounter: 0,
        totalUnseen: 0,
        items: []
      };
    }
    return conversationMessagesSelector(conversation);
  };
});
const getInvitedContactsForNewlyCreatedGroup = (0, import_reselect.createSelector)(getConversationsByUuid, getConversations, (conversationLookup, { invitedUuidsForNewlyCreatedGroup = [] }) => (0, import_deconstructLookup.deconstructLookup)(conversationLookup, invitedUuidsForNewlyCreatedGroup));
const getConversationsWithCustomColorSelector = (0, import_reselect.createSelector)(getAllConversations, (conversations) => {
  return (colorId) => {
    return conversations.filter((conversation) => conversation.customColorId === colorId);
  };
});
function isMissingRequiredProfileSharing(conversation) {
  const doesConversationRequireIt = !conversation.isMe && !conversation.left && ((0, import_whatTypeOfConversation.isGroupV1)(conversation) || (0, import_whatTypeOfConversation.isDirectConversation)(conversation));
  return Boolean(doesConversationRequireIt && !conversation.profileSharing && window.Signal.RemoteConfig.isEnabled("desktop.mandatoryProfileSharing") && conversation.messageCount && conversation.messageCount > 0);
}
const getGroupAdminsSelector = (0, import_reselect.createSelector)(getConversationSelector, (conversationSelector) => {
  return (conversationId) => {
    const {
      groupId,
      groupVersion,
      memberships = []
    } = conversationSelector(conversationId);
    if (!(0, import_whatTypeOfConversation.isGroupV2)({
      groupId,
      groupVersion
    })) {
      return [];
    }
    const admins = [];
    memberships.forEach((membership) => {
      if (membership.isAdmin) {
        const admin = conversationSelector(membership.uuid);
        admins.push(admin);
      }
    });
    return admins;
  };
});
const getConversationVerificationData = (0, import_reselect.createSelector)(getConversations, (conversations) => conversations.verificationDataByConversation);
const getConversationIdsStoppedForVerification = (0, import_reselect.createSelector)(getConversationVerificationData, (verificationDataByConversation) => Object.keys(verificationDataByConversation));
const getConversationsStoppedForVerification = (0, import_reselect.createSelector)(getConversationByIdSelector, getConversationIdsStoppedForVerification, (conversationSelector, conversationIds) => {
  const conversations = conversationIds.map((conversationId) => conversationSelector(conversationId)).filter(import_isNotNil.isNotNil);
  return (0, import_sortByTitle.sortByTitle)(conversations);
});
const getConversationUuidsStoppingSend = (0, import_reselect.createSelector)(getConversationVerificationData, (pendingData) => {
  const result = /* @__PURE__ */ new Set();
  Object.values(pendingData).forEach((item) => {
    if (item.type === import_conversationsEnums.ConversationVerificationState.PendingVerification) {
      item.uuidsNeedingVerification.forEach((conversationId) => {
        result.add(conversationId);
      });
    }
  });
  return Array.from(result);
});
const getConversationsStoppingSend = (0, import_reselect.createSelector)(getConversationSelector, getConversationUuidsStoppingSend, (conversationSelector, uuids) => {
  const conversations = uuids.map((uuid) => conversationSelector(uuid));
  return (0, import_sortByTitle.sortByTitle)(conversations);
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _conversationMessagesSelector,
  _conversationSelector,
  _getConversationComparator,
  _getLeftPaneLists,
  getAllComposableConversations,
  getAllConversations,
  getCachedSelectorForConversation,
  getCachedSelectorForConversationMessages,
  getCachedSelectorForMessage,
  getCandidateContactsForNewGroup,
  getComposableContacts,
  getComposableGroups,
  getComposeAvatarData,
  getComposeGroupAvatar,
  getComposeGroupExpireTimer,
  getComposeGroupName,
  getComposeSelectedContacts,
  getComposerConversationSearchTerm,
  getComposerStep,
  getComposerUUIDFetchState,
  getContactNameColorSelector,
  getConversationByIdSelector,
  getConversationByUuidSelector,
  getConversationComparator,
  getConversationIdsStoppedForVerification,
  getConversationLookup,
  getConversationMessagesSelector,
  getConversationSelector,
  getConversationUuidsStoppingSend,
  getConversations,
  getConversationsByE164,
  getConversationsByGroupId,
  getConversationsByTitleSelector,
  getConversationsByUsername,
  getConversationsByUuid,
  getConversationsStoppedForVerification,
  getConversationsStoppingSend,
  getConversationsWithCustomColorSelector,
  getFilteredCandidateContactsForNewGroup,
  getFilteredComposeContacts,
  getFilteredComposeGroups,
  getGroupAdminsSelector,
  getInvitedContactsForNewlyCreatedGroup,
  getLeftPaneLists,
  getMaximumGroupSizeModalState,
  getMe,
  getMessageSelector,
  getMessages,
  getMessagesByConversation,
  getPlaceholderContact,
  getPreJoinConversation,
  getRecommendedGroupSizeModalState,
  getSelectedConversationId,
  getSelectedMessage,
  getShowArchived,
  getUsernameSaveState,
  hasGroupCreationError,
  isCreatingGroup,
  isEditingAvatar,
  isMissingRequiredProfileSharing
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBtZW1vaXplZSBmcm9tICdtZW1vaXplZSc7XG5pbXBvcnQgeyBpc051bWJlciB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcblxuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25Mb29rdXBUeXBlLFxuICBDb252ZXJzYXRpb25NZXNzYWdlVHlwZSxcbiAgQ29udmVyc2F0aW9uc1N0YXRlVHlwZSxcbiAgQ29udmVyc2F0aW9uVHlwZSxcbiAgQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uRGF0YSxcbiAgTWVzc2FnZUxvb2t1cFR5cGUsXG4gIE1lc3NhZ2VzQnlDb252ZXJzYXRpb25UeXBlLFxuICBQcmVKb2luQ29udmVyc2F0aW9uVHlwZSxcbn0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFVzZXJuYW1lU2F2ZVN0YXRlIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9uc0VudW1zJztcbmltcG9ydCB7XG4gIENvbXBvc2VyU3RlcCxcbiAgT25lVGltZU1vZGFsU3RhdGUsXG4gIENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLFxufSBmcm9tICcuLi9kdWNrcy9jb252ZXJzYXRpb25zRW51bXMnO1xuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRPd24nO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi8uLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCB0eXBlIHsgVVVJREZldGNoU3RhdGVUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC91dWlkRmV0Y2hTdGF0ZSc7XG5pbXBvcnQgeyBkZWNvbnN0cnVjdExvb2t1cCB9IGZyb20gJy4uLy4uL3V0aWwvZGVjb25zdHJ1Y3RMb29rdXAnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGFUeXBlIGFzIFRpbWVsaW5lUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vVGltZWxpbmUnO1xuaW1wb3J0IHR5cGUgeyBUaW1lbGluZUl0ZW1UeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vVGltZWxpbmVJdGVtJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgeyBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50IH0gZnJvbSAnLi4vLi4vdXRpbC9maWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IENvbnRhY3ROYW1lQ29sb3JUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IENvbnRhY3ROYW1lQ29sb3JzIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyRGF0YVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgaXNJblN5c3RlbUNvbnRhY3RzIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0luU3lzdGVtQ29udGFjdHMnO1xuaW1wb3J0IHsgc29ydEJ5VGl0bGUgfSBmcm9tICcuLi8uLi91dGlsL3NvcnRCeVRpdGxlJztcbmltcG9ydCB7XG4gIGlzRGlyZWN0Q29udmVyc2F0aW9uLFxuICBpc0dyb3VwVjEsXG4gIGlzR3JvdXBWMixcbn0gZnJvbSAnLi4vLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcblxuaW1wb3J0IHtcbiAgZ2V0SW50bCxcbiAgZ2V0UmVnaW9uQ29kZSxcbiAgZ2V0VXNlckNvbnZlcnNhdGlvbklkLFxuICBnZXRVc2VyTnVtYmVyLFxuICBnZXRVc2VyVXVpZCxcbn0gZnJvbSAnLi91c2VyJztcbmltcG9ydCB7IGdldFBpbm5lZENvbnZlcnNhdGlvbklkcyB9IGZyb20gJy4vaXRlbXMnO1xuaW1wb3J0IHsgZ2V0UHJvcHNGb3JCdWJibGUgfSBmcm9tICcuL21lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBDYWxsU2VsZWN0b3JUeXBlLCBDYWxsU3RhdGVUeXBlIH0gZnJvbSAnLi9jYWxsaW5nJztcbmltcG9ydCB7IGdldEFjdGl2ZUNhbGwsIGdldENhbGxTZWxlY3RvciB9IGZyb20gJy4vY2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IEFjY291bnRTZWxlY3RvclR5cGUgfSBmcm9tICcuL2FjY291bnRzJztcbmltcG9ydCB7IGdldEFjY291bnRTZWxlY3RvciB9IGZyb20gJy4vYWNjb3VudHMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uLy4uL3V0aWwvdGltZWxpbmVVdGlsJztcblxubGV0IHBsYWNlaG9sZGVyQ29udGFjdDogQ29udmVyc2F0aW9uVHlwZTtcbmV4cG9ydCBjb25zdCBnZXRQbGFjZWhvbGRlckNvbnRhY3QgPSAoKTogQ29udmVyc2F0aW9uVHlwZSA9PiB7XG4gIGlmIChwbGFjZWhvbGRlckNvbnRhY3QpIHtcbiAgICByZXR1cm4gcGxhY2Vob2xkZXJDb250YWN0O1xuICB9XG5cbiAgcGxhY2Vob2xkZXJDb250YWN0ID0ge1xuICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGZhbHNlLFxuICAgIGJhZGdlczogW10sXG4gICAgaWQ6ICdwbGFjZWhvbGRlci1jb250YWN0JyxcbiAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICB0aXRsZTogd2luZG93LmkxOG4oJ3Vua25vd25Db250YWN0JyksXG4gICAgaXNNZTogZmFsc2UsXG4gICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gIH07XG4gIHJldHVybiBwbGFjZWhvbGRlckNvbnRhY3Q7XG59O1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9ucyA9IChzdGF0ZTogU3RhdGVUeXBlKTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9PlxuICBzdGF0ZS5jb252ZXJzYXRpb25zO1xuXG5leHBvcnQgY29uc3QgZ2V0UHJlSm9pbkNvbnZlcnNhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25zLFxuICAoc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUpOiBQcmVKb2luQ29udmVyc2F0aW9uVHlwZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLnByZUpvaW5Db252ZXJzYXRpb247XG4gIH1cbik7XG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uTG9va3VwID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSk6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGUgPT4ge1xuICAgIHJldHVybiBzdGF0ZS5jb252ZXJzYXRpb25Mb29rdXA7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25zQnlVdWlkID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSk6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGUgPT4ge1xuICAgIHJldHVybiBzdGF0ZS5jb252ZXJzYXRpb25zQnlVdWlkO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uc0J5RTE2NCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25zLFxuICAoc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUpOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlID0+IHtcbiAgICByZXR1cm4gc3RhdGUuY29udmVyc2F0aW9uc0J5RTE2NDtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnZlcnNhdGlvbnNCeUdyb3VwSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9ucyxcbiAgKHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlKTogQ29udmVyc2F0aW9uTG9va3VwVHlwZSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmNvbnZlcnNhdGlvbnNCeUdyb3VwSWQ7XG4gIH1cbik7XG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uc0J5VXNlcm5hbWUgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9ucyxcbiAgKHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlKTogQ29udmVyc2F0aW9uTG9va3VwVHlwZSA9PiB7XG4gICAgcmV0dXJuIHN0YXRlLmNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0QWxsQ29udmVyc2F0aW9ucyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25Mb29rdXAsXG4gIChsb29rdXApOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9PiBPYmplY3QudmFsdWVzKGxvb2t1cClcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25zQnlUaXRsZVNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEFsbENvbnZlcnNhdGlvbnMsXG4gIChjb252ZXJzYXRpb25zKTogKCh0aXRsZTogc3RyaW5nKSA9PiBBcnJheTxDb252ZXJzYXRpb25UeXBlPikgPT5cbiAgICAodGl0bGU6IHN0cmluZykgPT5cbiAgICAgIGNvbnZlcnNhdGlvbnMuZmlsdGVyKGNvbnZlcnNhdGlvbiA9PiBjb252ZXJzYXRpb24udGl0bGUgPT09IHRpdGxlKVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkQ29udmVyc2F0aW9uSWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9ucyxcbiAgKHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlKTogc3RyaW5nIHwgdW5kZWZpbmVkID0+IHtcbiAgICByZXR1cm4gc3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZDtcbiAgfVxuKTtcblxudHlwZSBTZWxlY3RlZE1lc3NhZ2VUeXBlID0ge1xuICBpZDogc3RyaW5nO1xuICBjb3VudGVyOiBudW1iZXI7XG59O1xuZXhwb3J0IGNvbnN0IGdldFNlbGVjdGVkTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25zLFxuICAoc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUpOiBTZWxlY3RlZE1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkID0+IHtcbiAgICBpZiAoIXN0YXRlLnNlbGVjdGVkTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgaWQ6IHN0YXRlLnNlbGVjdGVkTWVzc2FnZSxcbiAgICAgIGNvdW50ZXI6IHN0YXRlLnNlbGVjdGVkTWVzc2FnZUNvdW50ZXIsXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFVzZXJuYW1lU2F2ZVN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSk6IFVzZXJuYW1lU2F2ZVN0YXRlID0+IHtcbiAgICByZXR1cm4gc3RhdGUudXNlcm5hbWVTYXZlU3RhdGU7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRTaG93QXJjaGl2ZWQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9ucyxcbiAgKHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlKTogYm9vbGVhbiA9PiB7XG4gICAgcmV0dXJuIEJvb2xlYW4oc3RhdGUuc2hvd0FyY2hpdmVkKTtcbiAgfVxuKTtcblxuY29uc3QgZ2V0Q29tcG9zZXJTdGF0ZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25zLFxuICAoc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUpID0+IHN0YXRlLmNvbXBvc2VyXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zZXJTdGVwID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogdW5kZWZpbmVkIHwgQ29tcG9zZXJTdGVwID0+IGNvbXBvc2VyU3RhdGU/LnN0ZXBcbik7XG5cbmV4cG9ydCBjb25zdCBoYXNHcm91cENyZWF0aW9uRXJyb3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29tcG9zZXJTdGF0ZSxcbiAgKGNvbXBvc2VyU3RhdGUpOiBib29sZWFuID0+IHtcbiAgICBpZiAoY29tcG9zZXJTdGF0ZT8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEpIHtcbiAgICAgIHJldHVybiBjb21wb3NlclN0YXRlLmhhc0Vycm9yO1xuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBpc0NyZWF0aW5nR3JvdXAgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29tcG9zZXJTdGF0ZSxcbiAgKGNvbXBvc2VyU3RhdGUpOiBib29sZWFuID0+XG4gICAgY29tcG9zZXJTdGF0ZT8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEgJiZcbiAgICBjb21wb3NlclN0YXRlLmlzQ3JlYXRpbmdcbik7XG5cbmV4cG9ydCBjb25zdCBpc0VkaXRpbmdBdmF0YXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29tcG9zZXJTdGF0ZSxcbiAgKGNvbXBvc2VyU3RhdGUpOiBib29sZWFuID0+XG4gICAgY29tcG9zZXJTdGF0ZT8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEgJiZcbiAgICBjb21wb3NlclN0YXRlLmlzRWRpdGluZ0F2YXRhclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbXBvc2VBdmF0YXJEYXRhID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogUmVhZG9ubHlBcnJheTxBdmF0YXJEYXRhVHlwZT4gPT5cbiAgICBjb21wb3NlclN0YXRlPy5zdGVwID09PSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YVxuICAgICAgPyBjb21wb3NlclN0YXRlLnVzZXJBdmF0YXJEYXRhXG4gICAgICA6IFtdXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0TWVzc2FnZXMgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9ucyxcbiAgKHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlKTogTWVzc2FnZUxvb2t1cFR5cGUgPT4ge1xuICAgIHJldHVybiBzdGF0ZS5tZXNzYWdlc0xvb2t1cDtcbiAgfVxuKTtcbmV4cG9ydCBjb25zdCBnZXRNZXNzYWdlc0J5Q29udmVyc2F0aW9uID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSk6IE1lc3NhZ2VzQnlDb252ZXJzYXRpb25UeXBlID0+IHtcbiAgICByZXR1cm4gc3RhdGUubWVzc2FnZXNCeUNvbnZlcnNhdGlvbjtcbiAgfVxuKTtcblxuY29uc3QgY29sbGF0b3IgPSBuZXcgSW50bC5Db2xsYXRvcigpO1xuXG4vLyBOb3RlOiB3ZSB3aWxsIHByb2JhYmx5IHdhbnQgdG8gcHV0IGkxOG4gYW5kIHJlZ2lvbkNvZGUgYmFjayB3aGVuIHdlIGFyZSBmb3JtYXR0aW5nXG4vLyAgIHBob25lIG51bWJlcnMgYW5kIGNvbnRhY3RzIGZyb20gc2NyYXRjaCBoZXJlIGFnYWluLlxuZXhwb3J0IGNvbnN0IF9nZXRDb252ZXJzYXRpb25Db21wYXJhdG9yID0gKCkgPT4ge1xuICByZXR1cm4gKGxlZnQ6IENvbnZlcnNhdGlvblR5cGUsIHJpZ2h0OiBDb252ZXJzYXRpb25UeXBlKTogbnVtYmVyID0+IHtcbiAgICBjb25zdCBsZWZ0VGltZXN0YW1wID0gbGVmdC50aW1lc3RhbXA7XG4gICAgY29uc3QgcmlnaHRUaW1lc3RhbXAgPSByaWdodC50aW1lc3RhbXA7XG4gICAgaWYgKGxlZnRUaW1lc3RhbXAgJiYgIXJpZ2h0VGltZXN0YW1wKSB7XG4gICAgICByZXR1cm4gLTE7XG4gICAgfVxuICAgIGlmIChyaWdodFRpbWVzdGFtcCAmJiAhbGVmdFRpbWVzdGFtcCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICAgIGlmIChsZWZ0VGltZXN0YW1wICYmIHJpZ2h0VGltZXN0YW1wICYmIGxlZnRUaW1lc3RhbXAgIT09IHJpZ2h0VGltZXN0YW1wKSB7XG4gICAgICByZXR1cm4gcmlnaHRUaW1lc3RhbXAgLSBsZWZ0VGltZXN0YW1wO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHR5cGVvZiBsZWZ0LmluYm94UG9zaXRpb24gPT09ICdudW1iZXInICYmXG4gICAgICB0eXBlb2YgcmlnaHQuaW5ib3hQb3NpdGlvbiA9PT0gJ251bWJlcidcbiAgICApIHtcbiAgICAgIHJldHVybiByaWdodC5pbmJveFBvc2l0aW9uID4gbGVmdC5pbmJveFBvc2l0aW9uID8gLTEgOiAxO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgbGVmdC5pbmJveFBvc2l0aW9uID09PSAnbnVtYmVyJyAmJiByaWdodC5pbmJveFBvc2l0aW9uID09IG51bGwpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAodHlwZW9mIHJpZ2h0LmluYm94UG9zaXRpb24gPT09ICdudW1iZXInICYmIGxlZnQuaW5ib3hQb3NpdGlvbiA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29sbGF0b3IuY29tcGFyZShsZWZ0LnRpdGxlLCByaWdodC50aXRsZSk7XG4gIH07XG59O1xuZXhwb3J0IGNvbnN0IGdldENvbnZlcnNhdGlvbkNvbXBhcmF0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0SW50bCxcbiAgZ2V0UmVnaW9uQ29kZSxcbiAgX2dldENvbnZlcnNhdGlvbkNvbXBhcmF0b3Jcbik7XG5cbmV4cG9ydCBjb25zdCBfZ2V0TGVmdFBhbmVMaXN0cyA9IChcbiAgbG9va3VwOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlLFxuICBjb21wYXJhdG9yOiAobGVmdDogQ29udmVyc2F0aW9uVHlwZSwgcmlnaHQ6IENvbnZlcnNhdGlvblR5cGUpID0+IG51bWJlcixcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb24/OiBzdHJpbmcsXG4gIHBpbm5lZENvbnZlcnNhdGlvbklkcz86IEFycmF5PHN0cmluZz5cbik6IHtcbiAgY29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIGFyY2hpdmVkQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT47XG4gIHBpbm5lZENvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xufSA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0gW107XG4gIGNvbnN0IGFyY2hpdmVkQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXTtcbiAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9uczogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPSBbXTtcblxuICBjb25zdCB2YWx1ZXMgPSBPYmplY3QudmFsdWVzKGxvb2t1cCk7XG4gIGNvbnN0IG1heCA9IHZhbHVlcy5sZW5ndGg7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICBsZXQgY29udmVyc2F0aW9uID0gdmFsdWVzW2ldO1xuICAgIGlmIChzZWxlY3RlZENvbnZlcnNhdGlvbiA9PT0gY29udmVyc2F0aW9uLmlkKSB7XG4gICAgICBjb252ZXJzYXRpb24gPSB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICAgICAgaXNTZWxlY3RlZDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgLy8gV2UgYWx3YXlzIHNob3cgcGlubmVkIGNvbnZlcnNhdGlvbnNcbiAgICBpZiAoY29udmVyc2F0aW9uLmlzUGlubmVkKSB7XG4gICAgICBwaW5uZWRDb252ZXJzYXRpb25zLnB1c2goY29udmVyc2F0aW9uKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGlmIChjb252ZXJzYXRpb24uYWN0aXZlQXQpIHtcbiAgICAgIGlmIChjb252ZXJzYXRpb24uaXNBcmNoaXZlZCkge1xuICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnMucHVzaChjb252ZXJzYXRpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udmVyc2F0aW9ucy5wdXNoKGNvbnZlcnNhdGlvbik7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29udmVyc2F0aW9ucy5zb3J0KGNvbXBhcmF0b3IpO1xuICBhcmNoaXZlZENvbnZlcnNhdGlvbnMuc29ydChjb21wYXJhdG9yKTtcblxuICBwaW5uZWRDb252ZXJzYXRpb25zLnNvcnQoXG4gICAgKGEsIGIpID0+XG4gICAgICAocGlubmVkQ29udmVyc2F0aW9uSWRzIHx8IFtdKS5pbmRleE9mKGEuaWQpIC1cbiAgICAgIChwaW5uZWRDb252ZXJzYXRpb25JZHMgfHwgW10pLmluZGV4T2YoYi5pZClcbiAgKTtcblxuICByZXR1cm4geyBjb252ZXJzYXRpb25zLCBhcmNoaXZlZENvbnZlcnNhdGlvbnMsIHBpbm5lZENvbnZlcnNhdGlvbnMgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRMZWZ0UGFuZUxpc3RzID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbkxvb2t1cCxcbiAgZ2V0Q29udmVyc2F0aW9uQ29tcGFyYXRvcixcbiAgZ2V0U2VsZWN0ZWRDb252ZXJzYXRpb25JZCxcbiAgZ2V0UGlubmVkQ29udmVyc2F0aW9uSWRzLFxuICBfZ2V0TGVmdFBhbmVMaXN0c1xuKTtcblxuZXhwb3J0IGNvbnN0IGdldE1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogT25lVGltZU1vZGFsU3RhdGUgPT4ge1xuICAgIHN3aXRjaCAoY29tcG9zZXJTdGF0ZT8uc3RlcCkge1xuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzOlxuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YTpcbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyU3RhdGUubWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGU7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgJ0NhblxcJ3QgZ2V0IHRoZSBtYXhpbXVtIGdyb3VwIHNpemUgbW9kYWwgc3RhdGUgaW4gdGhpcyBjb21wb3NlciBzdGF0ZTsgcmV0dXJuaW5nIFwibmV2ZXIgc2hvd25cIidcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIE9uZVRpbWVNb2RhbFN0YXRlLk5ldmVyU2hvd247XG4gICAgfVxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0UmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogT25lVGltZU1vZGFsU3RhdGUgPT4ge1xuICAgIHN3aXRjaCAoY29tcG9zZXJTdGF0ZT8uc3RlcCkge1xuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzOlxuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YTpcbiAgICAgICAgcmV0dXJuIGNvbXBvc2VyU3RhdGUucmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICdDYW5cXCd0IGdldCB0aGUgcmVjb21tZW5kZWQgZ3JvdXAgc2l6ZSBtb2RhbCBzdGF0ZSBpbiB0aGlzIGNvbXBvc2VyIHN0YXRlOyByZXR1cm5pbmcgXCJuZXZlciBzaG93blwiJ1xuICAgICAgICApO1xuICAgICAgICByZXR1cm4gT25lVGltZU1vZGFsU3RhdGUuTmV2ZXJTaG93bjtcbiAgICB9XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRNZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBbZ2V0Q29udmVyc2F0aW9uTG9va3VwLCBnZXRVc2VyQ29udmVyc2F0aW9uSWRdLFxuICAoXG4gICAgbG9va3VwOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlLFxuICAgIG91ckNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKTogQ29udmVyc2F0aW9uVHlwZSA9PiB7XG4gICAgaWYgKCFvdXJDb252ZXJzYXRpb25JZCkge1xuICAgICAgcmV0dXJuIGdldFBsYWNlaG9sZGVyQ29udGFjdCgpO1xuICAgIH1cblxuICAgIHJldHVybiBsb29rdXBbb3VyQ29udmVyc2F0aW9uSWRdIHx8IGdldFBsYWNlaG9sZGVyQ29udGFjdCgpO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zZXJDb252ZXJzYXRpb25TZWFyY2hUZXJtID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbXBvc2VyU3RhdGUsXG4gIChjb21wb3Nlcik6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFjb21wb3Nlcikge1xuICAgICAgYXNzZXJ0KGZhbHNlLCAnZ2V0Q29tcG9zZXJDb252ZXJzYXRpb25TZWFyY2hUZXJtOiBjb21wb3NlciBpcyBub3Qgb3BlbicpO1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICBpZiAoY29tcG9zZXIuc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEpIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgICdnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm06IGNvbXBvc2VyIGRvZXMgbm90IGhhdmUgYSBzZWFyY2ggdGVybSdcbiAgICAgICk7XG4gICAgICByZXR1cm4gJyc7XG4gICAgfVxuICAgIHJldHVybiBjb21wb3Nlci5zZWFyY2hUZXJtO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zZXJVVUlERmV0Y2hTdGF0ZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb21wb3NlclN0YXRlLFxuICAoY29tcG9zZXIpOiBVVUlERmV0Y2hTdGF0ZVR5cGUgPT4ge1xuICAgIGlmICghY29tcG9zZXIpIHtcbiAgICAgIGFzc2VydChmYWxzZSwgJ2dldElzRmV0Y2hpbmdVc2VybmFtZTogY29tcG9zZXIgaXMgbm90IG9wZW4nKTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY29tcG9zZXIuc3RlcCAhPT0gQ29tcG9zZXJTdGVwLlN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uICYmXG4gICAgICBjb21wb3Nlci5zdGVwICE9PSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzXG4gICAgKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBgZ2V0Q29tcG9zZXJVVUlERmV0Y2hTdGF0ZTogc3RlcCAke2NvbXBvc2VyLnN0ZXB9IGAgK1xuICAgICAgICAgICdoYXMgbm8gdXVpZEZldGNoU3RhdGUga2V5J1xuICAgICAgKTtcbiAgICAgIHJldHVybiB7fTtcbiAgICB9XG4gICAgcmV0dXJuIGNvbXBvc2VyLnV1aWRGZXRjaFN0YXRlO1xuICB9XG4pO1xuXG5mdW5jdGlvbiBpc1RydXN0ZWQoY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlKTogYm9vbGVhbiB7XG4gIGlmIChjb252ZXJzYXRpb24udHlwZSA9PT0gJ2dyb3VwJykge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgaXNJblN5c3RlbUNvbnRhY3RzKGNvbnZlcnNhdGlvbikgfHxcbiAgICAgIGNvbnZlcnNhdGlvbi5zaGFyZWRHcm91cE5hbWVzLmxlbmd0aCA+IDAgfHxcbiAgICAgIGNvbnZlcnNhdGlvbi5wcm9maWxlU2hhcmluZyB8fFxuICAgICAgY29udmVyc2F0aW9uLmlzTWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gaGFzRGlzcGxheUluZm8oY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlKTogYm9vbGVhbiB7XG4gIGlmIChjb252ZXJzYXRpb24udHlwZSA9PT0gJ2dyb3VwJykge1xuICAgIHJldHVybiBCb29sZWFuKGNvbnZlcnNhdGlvbi5uYW1lKTtcbiAgfVxuXG4gIHJldHVybiBCb29sZWFuKFxuICAgIGNvbnZlcnNhdGlvbi5uYW1lIHx8XG4gICAgICBjb252ZXJzYXRpb24ucHJvZmlsZU5hbWUgfHxcbiAgICAgIGNvbnZlcnNhdGlvbi5waG9uZU51bWJlciB8fFxuICAgICAgY29udmVyc2F0aW9uLmlzTWVcbiAgKTtcbn1cblxuZnVuY3Rpb24gY2FuQ29tcG9zZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgIWNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQgJiZcbiAgICAgICFpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZChjb252ZXJzYXRpb24pICYmXG4gICAgICBoYXNEaXNwbGF5SW5mbyhjb252ZXJzYXRpb24pICYmXG4gICAgICBpc1RydXN0ZWQoY29udmVyc2F0aW9uKVxuICApO1xufVxuXG5leHBvcnQgY29uc3QgZ2V0QWxsQ29tcG9zYWJsZUNvbnZlcnNhdGlvbnMgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9uTG9va3VwLFxuICAoY29udmVyc2F0aW9uTG9va3VwOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT5cbiAgICBPYmplY3QudmFsdWVzKGNvbnZlcnNhdGlvbkxvb2t1cCkuZmlsdGVyKFxuICAgICAgY29udmVyc2F0aW9uID0+XG4gICAgICAgICFjb252ZXJzYXRpb24uaXNCbG9ja2VkICYmXG4gICAgICAgICFjb252ZXJzYXRpb24uaXNHcm91cFYxQW5kRGlzYWJsZWQgJiZcbiAgICAgICAgIWlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKGNvbnZlcnNhdGlvbikgJiZcbiAgICAgICAgLy8gQWxsIGNvbnZlcnNhdGlvbiBzaG91bGQgaGF2ZSBhIHRpdGxlIGV4Y2VwdCBpbiB3ZWlyZCBjYXNlcyB3aGVyZVxuICAgICAgICAvLyB0aGV5IGRvbid0LCBpbiB0aGF0IGNhc2Ugd2UgZG9uJ3Qgd2FudCB0byBzaG93IHRoZXNlIGZvciBGb3J3YXJkaW5nLlxuICAgICAgICBjb252ZXJzYXRpb24udGl0bGUgJiZcbiAgICAgICAgaGFzRGlzcGxheUluZm8oY29udmVyc2F0aW9uKVxuICAgIClcbik7XG5cbi8qKlxuICogZ2V0Q29tcG9zYWJsZUNvbnRhY3RzL2dldENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAgYm90aCByZXR1cm4gY29udGFjdHMgZm9yIHRoZVxuICogY29tcG9zZXIgYW5kIGdyb3VwIG1lbWJlcnMsIGEgZGlmZmVyZW50IGxpc3QgZnJvbSB5b3VyIHByaW1hcnkgc3lzdGVtIGNvbnRhY3RzLlxuICogVGhpcyBsaXN0IG1heSBpbmNsdWRlIGZhbHNlIHBvc2l0aXZlcywgd2hpY2ggaXMgYmV0dGVyIHRoYW4gbWlzc2luZyBjb250YWN0cy5cbiAqXG4gKiBOb3RlOiB0aGUga2V5IGRpZmZlcmVuY2UgYmV0d2VlbiB0aGVtOlxuICogICBnZXRDb21wb3NhYmxlQ29udGFjdHMgaW5jbHVkZXMgTm90ZSB0byBTZWxmXG4gKiAgIGdldENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAgZG9lcyBub3QgaW5jbHVkZSBOb3RlIHRvIFNlbGZcbiAqXG4gKiBCZWNhdXNlIHRoZXkgZmlsdGVyIHVucmVnaXN0ZXJlZCBjb250YWN0cyBhbmQgdGhhdCdzIChwYXJ0aWFsbHkpIGRldGVybWluZWQgYnkgdGhlXG4gKiBjdXJyZW50IHRpbWUsIGl0J3MgcG9zc2libGUgZm9yIHRoZW0gdG8gcmV0dXJuIHN0YWxlIGNvbnRhY3RzIHRoYXQgaGF2ZSB1bnJlZ2lzdGVyZWRcbiAqIGlmIG5vIG90aGVyIGNvbnZlcnNhdGlvbnMgY2hhbmdlLiBUaGlzIHNob3VsZCBiZSBhIHJhcmUgZmFsc2UgcG9zaXRpdmUuXG4gKi9cbmV4cG9ydCBjb25zdCBnZXRDb21wb3NhYmxlQ29udGFjdHMgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9uTG9va3VwLFxuICAoY29udmVyc2F0aW9uTG9va3VwOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT5cbiAgICBPYmplY3QudmFsdWVzKGNvbnZlcnNhdGlvbkxvb2t1cCkuZmlsdGVyKFxuICAgICAgY29udmVyc2F0aW9uID0+XG4gICAgICAgIGNvbnZlcnNhdGlvbi50eXBlID09PSAnZGlyZWN0JyAmJiBjYW5Db21wb3NlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbilcbiAgICApXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cCA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25Mb29rdXAsXG4gIChjb252ZXJzYXRpb25Mb29rdXA6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGUpOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9PlxuICAgIE9iamVjdC52YWx1ZXMoY29udmVyc2F0aW9uTG9va3VwKS5maWx0ZXIoXG4gICAgICBjb252ZXJzYXRpb24gPT5cbiAgICAgICAgY29udmVyc2F0aW9uLnR5cGUgPT09ICdkaXJlY3QnICYmXG4gICAgICAgICFjb252ZXJzYXRpb24uaXNNZSAmJlxuICAgICAgICBjYW5Db21wb3NlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbilcbiAgICApXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zYWJsZUdyb3VwcyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25Mb29rdXAsXG4gIChjb252ZXJzYXRpb25Mb29rdXA6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGUpOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9PlxuICAgIE9iamVjdC52YWx1ZXMoY29udmVyc2F0aW9uTG9va3VwKS5maWx0ZXIoXG4gICAgICBjb252ZXJzYXRpb24gPT5cbiAgICAgICAgY29udmVyc2F0aW9uLnR5cGUgPT09ICdncm91cCcgJiYgY2FuQ29tcG9zZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24pXG4gICAgKVxuKTtcblxuY29uc3QgZ2V0Tm9ybWFsaXplZENvbXBvc2VyQ29udmVyc2F0aW9uU2VhcmNoVGVybSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0sXG4gIChzZWFyY2hUZXJtOiBzdHJpbmcpOiBzdHJpbmcgPT4gc2VhcmNoVGVybS50cmltKClcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJlZENvbXBvc2VDb250YWN0cyA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXROb3JtYWxpemVkQ29tcG9zZXJDb252ZXJzYXRpb25TZWFyY2hUZXJtLFxuICBnZXRDb21wb3NhYmxlQ29udGFjdHMsXG4gIGdldFJlZ2lvbkNvZGUsXG4gIChcbiAgICBzZWFyY2hUZXJtOiBzdHJpbmcsXG4gICAgY29udGFjdHM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+LFxuICAgIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZFxuICApOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9PiB7XG4gICAgcmV0dXJuIGZpbHRlckFuZFNvcnRDb252ZXJzYXRpb25zQnlSZWNlbnQoY29udGFjdHMsIHNlYXJjaFRlcm0sIHJlZ2lvbkNvZGUpO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0RmlsdGVyZWRDb21wb3NlR3JvdXBzID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldE5vcm1hbGl6ZWRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0sXG4gIGdldENvbXBvc2FibGVHcm91cHMsXG4gIGdldFJlZ2lvbkNvZGUsXG4gIChcbiAgICBzZWFyY2hUZXJtOiBzdHJpbmcsXG4gICAgZ3JvdXBzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPixcbiAgICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWRcbiAgKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT4ge1xuICAgIHJldHVybiBmaWx0ZXJBbmRTb3J0Q29udmVyc2F0aW9uc0J5UmVjZW50KGdyb3Vwcywgc2VhcmNoVGVybSwgcmVnaW9uQ29kZSk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRGaWx0ZXJlZENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2FuZGlkYXRlQ29udGFjdHNGb3JOZXdHcm91cCxcbiAgZ2V0Tm9ybWFsaXplZENvbXBvc2VyQ29udmVyc2F0aW9uU2VhcmNoVGVybSxcbiAgZ2V0UmVnaW9uQ29kZSxcbiAgZmlsdGVyQW5kU29ydENvbnZlcnNhdGlvbnNCeVJlY2VudFxuKTtcblxuY29uc3QgZ2V0R3JvdXBDcmVhdGlvbkNvbXBvc2VyU3RhdGUgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29tcG9zZXJTdGF0ZSxcbiAgKFxuICAgIGNvbXBvc2VyU3RhdGVcbiAgKToge1xuICAgIGdyb3VwTmFtZTogc3RyaW5nO1xuICAgIGdyb3VwQXZhdGFyOiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICAgIGdyb3VwRXhwaXJlVGltZXI6IG51bWJlcjtcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogQXJyYXk8c3RyaW5nPjtcbiAgfSA9PiB7XG4gICAgc3dpdGNoIChjb21wb3NlclN0YXRlPy5zdGVwKSB7XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhOlxuICAgICAgICByZXR1cm4gY29tcG9zZXJTdGF0ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnZ2V0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGU6IGV4cGVjdGVkIHN0ZXAgdG8gYmUgU2V0R3JvdXBNZXRhZGF0YSdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBncm91cE5hbWU6ICcnLFxuICAgICAgICAgIGdyb3VwQXZhdGFyOiB1bmRlZmluZWQsXG4gICAgICAgICAgZ3JvdXBFeHBpcmVUaW1lcjogMCxcbiAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogW10sXG4gICAgICAgIH07XG4gICAgfVxuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zZUdyb3VwQXZhdGFyID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEdyb3VwQ3JlYXRpb25Db21wb3NlclN0YXRlLFxuICAoY29tcG9zZXJTdGF0ZSk6IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXkgPT4gY29tcG9zZXJTdGF0ZS5ncm91cEF2YXRhclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbXBvc2VHcm91cE5hbWUgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0R3JvdXBDcmVhdGlvbkNvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogc3RyaW5nID0+IGNvbXBvc2VyU3RhdGUuZ3JvdXBOYW1lXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0R3JvdXBDcmVhdGlvbkNvbXBvc2VyU3RhdGUsXG4gIChjb21wb3NlclN0YXRlKTogbnVtYmVyID0+IGNvbXBvc2VyU3RhdGUuZ3JvdXBFeHBpcmVUaW1lclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbXBvc2VTZWxlY3RlZENvbnRhY3RzID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbkxvb2t1cCxcbiAgZ2V0R3JvdXBDcmVhdGlvbkNvbXBvc2VyU3RhdGUsXG4gIChjb252ZXJzYXRpb25Mb29rdXAsIGNvbXBvc2VyU3RhdGUpOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9PlxuICAgIGRlY29uc3RydWN0TG9va3VwKGNvbnZlcnNhdGlvbkxvb2t1cCwgY29tcG9zZXJTdGF0ZS5zZWxlY3RlZENvbnZlcnNhdGlvbklkcylcbik7XG5cbi8vIFRoaXMgaXMgd2hlcmUgd2Ugd2lsbCBwdXQgQ29udmVyc2F0aW9uIHNlbGVjdG9yIGxvZ2ljLCByZXBsaWNhdGluZyB3aGF0XG4vLyBpcyBjdXJyZW50bHkgaW4gbW9kZWxzL2NvbnZlcnNhdGlvbi5nZXRQcm9wcygpXG4vLyBXaGF0IG5lZWRzIHRvIGhhcHBlbiB0byBwdWxsIHRoYXQgc2VsZWN0b3IgbG9naWMgaGVyZT9cbi8vICAgMSkgY29udGFjdFR5cGluZ1RpbWVycyAtIHRoYXQgVUktb25seSBzdGF0ZSBuZWVkcyB0byBiZSBtb3ZlZCB0byByZWR1eFxuLy8gICAyKSBhbGwgb2YgdGhlIG1lc3NhZ2Ugc2VsZWN0b3JzIG5lZWQgdG8gYmUgcmVzZWxlY3QtYmFzZWQ7IHRvZGF5IHRob3NlXG4vLyAgICAgIEJhY2tib25lLWJhc2VkIHByb3AtZ2VuZXJhdGlvbiBmdW5jdGlvbnMgZXhwZWN0IHRvIGdldCBDb252ZXJzYXRpb24gaW5mb3JtYXRpb25cbi8vICAgICAgZGlyZWN0bHkgdmlhIENvbnZlcnNhdGlvbkNvbnRyb2xsZXJcbmV4cG9ydCBmdW5jdGlvbiBfY29udmVyc2F0aW9uU2VsZWN0b3IoXG4gIGNvbnZlcnNhdGlvbj86IENvbnZlcnNhdGlvblR5cGVcbiAgLy8gcmVnaW9uQ29kZTogc3RyaW5nLFxuICAvLyB1c2VyTnVtYmVyOiBzdHJpbmdcbik6IENvbnZlcnNhdGlvblR5cGUge1xuICBpZiAoY29udmVyc2F0aW9uKSB7XG4gICAgcmV0dXJuIGNvbnZlcnNhdGlvbjtcbiAgfVxuXG4gIHJldHVybiBnZXRQbGFjZWhvbGRlckNvbnRhY3QoKTtcbn1cblxuLy8gQSBsaXR0bGUgb3B0aW1pemF0aW9uIHRvIHJlc2V0IG91ciBzZWxlY3RvciBjYWNoZSB3aGVuIGhpZ2gtbGV2ZWwgYXBwbGljYXRpb24gZGF0YVxuLy8gICBjaGFuZ2VzOiByZWdpb25Db2RlIGFuZCB1c2VyTnVtYmVyLlxudHlwZSBDYWNoZWRDb252ZXJzYXRpb25TZWxlY3RvclR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbj86IENvbnZlcnNhdGlvblR5cGVcbikgPT4gQ29udmVyc2F0aW9uVHlwZTtcbmV4cG9ydCBjb25zdCBnZXRDYWNoZWRTZWxlY3RvckZvckNvbnZlcnNhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRSZWdpb25Db2RlLFxuICBnZXRVc2VyTnVtYmVyLFxuICAoKTogQ2FjaGVkQ29udmVyc2F0aW9uU2VsZWN0b3JUeXBlID0+IHtcbiAgICAvLyBOb3RlOiBtZW1vaXplZSB3aWxsIGNoZWNrIGFsbCBwYXJhbWV0ZXJzIHByb3ZpZGVkLCBhbmQgb25seSBydW4gb3VyIHNlbGVjdG9yXG4gICAgLy8gICBpZiBhbnkgb2YgdGhlbSBoYXZlIGNoYW5nZWQuXG4gICAgcmV0dXJuIG1lbW9pemVlKF9jb252ZXJzYXRpb25TZWxlY3RvciwgeyBtYXg6IDIwMDAgfSk7XG4gIH1cbik7XG5cbmV4cG9ydCB0eXBlIEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlID0gKGlkPzogc3RyaW5nKSA9PiBDb252ZXJzYXRpb25UeXBlO1xuZXhwb3J0IGNvbnN0IGdldENvbnZlcnNhdGlvblNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhY2hlZFNlbGVjdG9yRm9yQ29udmVyc2F0aW9uLFxuICBnZXRDb252ZXJzYXRpb25Mb29rdXAsXG4gIGdldENvbnZlcnNhdGlvbnNCeVV1aWQsXG4gIGdldENvbnZlcnNhdGlvbnNCeUUxNjQsXG4gIGdldENvbnZlcnNhdGlvbnNCeUdyb3VwSWQsXG4gIChcbiAgICBzZWxlY3RvcjogQ2FjaGVkQ29udmVyc2F0aW9uU2VsZWN0b3JUeXBlLFxuICAgIGJ5SWQ6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGUsXG4gICAgYnlVdWlkOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlLFxuICAgIGJ5RTE2NDogQ29udmVyc2F0aW9uTG9va3VwVHlwZSxcbiAgICBieUdyb3VwSWQ6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGVcbiAgKTogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUgPT4ge1xuICAgIHJldHVybiAoaWQ/OiBzdHJpbmcpID0+IHtcbiAgICAgIGlmICghaWQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yKHVuZGVmaW5lZCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG9uVXVpZCA9IGdldE93bihieVV1aWQsIGlkLnRvTG93ZXJDYXNlID8gaWQudG9Mb3dlckNhc2UoKSA6IGlkKTtcbiAgICAgIGlmIChvblV1aWQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yKG9uVXVpZCk7XG4gICAgICB9XG4gICAgICBjb25zdCBvbkUxNjQgPSBnZXRPd24oYnlFMTY0LCBpZCk7XG4gICAgICBpZiAob25FMTY0KSB7XG4gICAgICAgIHJldHVybiBzZWxlY3RvcihvbkUxNjQpO1xuICAgICAgfVxuICAgICAgY29uc3Qgb25Hcm91cElkID0gZ2V0T3duKGJ5R3JvdXBJZCwgaWQpO1xuICAgICAgaWYgKG9uR3JvdXBJZCkge1xuICAgICAgICByZXR1cm4gc2VsZWN0b3Iob25Hcm91cElkKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IG9uSWQgPSBnZXRPd24oYnlJZCwgaWQpO1xuICAgICAgaWYgKG9uSWQpIHtcbiAgICAgICAgcmV0dXJuIHNlbGVjdG9yKG9uSWQpO1xuICAgICAgfVxuXG4gICAgICBsb2cud2FybihgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3I6IE5vIGNvbnZlcnNhdGlvbiBmb3VuZCBmb3IgaWQgJHtpZH1gKTtcbiAgICAgIC8vIFRoaXMgd2lsbCByZXR1cm4gYSBwbGFjZWhvbGRlciBjb250YWN0XG4gICAgICByZXR1cm4gc2VsZWN0b3IodW5kZWZpbmVkKTtcbiAgICB9O1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZFNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbkxvb2t1cCxcbiAgY29udmVyc2F0aW9uTG9va3VwID0+XG4gICAgKGlkOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBDb252ZXJzYXRpb25UeXBlID0+XG4gICAgICBnZXRPd24oY29udmVyc2F0aW9uTG9va3VwLCBpZClcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25CeVV1aWRTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25zQnlVdWlkLFxuICBjb252ZXJzYXRpb25zQnlVdWlkID0+XG4gICAgKHV1aWQ6IFVVSURTdHJpbmdUeXBlKTogdW5kZWZpbmVkIHwgQ29udmVyc2F0aW9uVHlwZSA9PlxuICAgICAgZ2V0T3duKGNvbnZlcnNhdGlvbnNCeVV1aWQsIHV1aWQpXG4pO1xuXG4vLyBBIGxpdHRsZSBvcHRpbWl6YXRpb24gdG8gcmVzZXQgb3VyIHNlbGVjdG9yIGNhY2hlIHdoZW5ldmVyIGhpZ2gtbGV2ZWwgYXBwbGljYXRpb24gZGF0YVxuLy8gICBjaGFuZ2VzOiByZWdpb25Db2RlIGFuZCB1c2VyTnVtYmVyLlxuZXhwb3J0IGNvbnN0IGdldENhY2hlZFNlbGVjdG9yRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRSZWdpb25Db2RlLFxuICBnZXRVc2VyTnVtYmVyLFxuICAoKTogdHlwZW9mIGdldFByb3BzRm9yQnViYmxlID0+IHtcbiAgICAvLyBOb3RlOiBtZW1vaXplZSB3aWxsIGNoZWNrIGFsbCBwYXJhbWV0ZXJzIHByb3ZpZGVkLCBhbmQgb25seSBydW4gb3VyIHNlbGVjdG9yXG4gICAgLy8gICBpZiBhbnkgb2YgdGhlbSBoYXZlIGNoYW5nZWQuXG4gICAgcmV0dXJuIG1lbW9pemVlKGdldFByb3BzRm9yQnViYmxlLCB7IG1heDogMjAwMCB9KTtcbiAgfVxuKTtcblxuY29uc3QgZ2V0Q2FjaGVkQ29udmVyc2F0aW9uTWVtYmVyQ29sb3JzU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9uU2VsZWN0b3IsXG4gIGdldFVzZXJDb252ZXJzYXRpb25JZCxcbiAgKFxuICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yOiBHZXRDb252ZXJzYXRpb25CeUlkVHlwZSxcbiAgICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICkgPT4ge1xuICAgIHJldHVybiBtZW1vaXplZShcbiAgICAgIChjb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkKSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhY3ROYW1lQ29sb3JzOiBNYXA8c3RyaW5nLCBDb250YWN0TmFtZUNvbG9yVHlwZT4gPSBuZXcgTWFwKCk7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBzb3J0ZWRHcm91cE1lbWJlcnMgPSBbXSxcbiAgICAgICAgICB0eXBlLFxuICAgICAgICAgIGlkOiB0aGVpcklkLFxuICAgICAgICB9ID0gY29udmVyc2F0aW9uU2VsZWN0b3IoY29udmVyc2F0aW9uSWQpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAnZGlyZWN0Jykge1xuICAgICAgICAgIGlmIChvdXJDb252ZXJzYXRpb25JZCkge1xuICAgICAgICAgICAgY29udGFjdE5hbWVDb2xvcnMuc2V0KG91ckNvbnZlcnNhdGlvbklkLCBDb250YWN0TmFtZUNvbG9yc1swXSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnRhY3ROYW1lQ29sb3JzLnNldCh0aGVpcklkLCBDb250YWN0TmFtZUNvbG9yc1swXSk7XG4gICAgICAgICAgcmV0dXJuIGNvbnRhY3ROYW1lQ29sb3JzO1xuICAgICAgICB9XG5cbiAgICAgICAgWy4uLnNvcnRlZEdyb3VwTWVtYmVyc11cbiAgICAgICAgICAuc29ydCgobGVmdCwgcmlnaHQpID0+XG4gICAgICAgICAgICBTdHJpbmcobGVmdC51dWlkKSA+IFN0cmluZyhyaWdodC51dWlkKSA/IDEgOiAtMVxuICAgICAgICAgIClcbiAgICAgICAgICAuZm9yRWFjaCgobWVtYmVyLCBpKSA9PiB7XG4gICAgICAgICAgICBjb250YWN0TmFtZUNvbG9ycy5zZXQoXG4gICAgICAgICAgICAgIG1lbWJlci5pZCxcbiAgICAgICAgICAgICAgQ29udGFjdE5hbWVDb2xvcnNbaSAlIENvbnRhY3ROYW1lQ29sb3JzLmxlbmd0aF1cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhY3ROYW1lQ29sb3JzO1xuICAgICAgfSxcbiAgICAgIHsgbWF4OiAxMDAgfVxuICAgICk7XG4gIH1cbik7XG5cbmV4cG9ydCB0eXBlIENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvclR5cGUgPSAoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGNvbnRhY3RJZDogc3RyaW5nIHwgdW5kZWZpbmVkXG4pID0+IENvbnRhY3ROYW1lQ29sb3JUeXBlO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udGFjdE5hbWVDb2xvclNlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENhY2hlZENvbnZlcnNhdGlvbk1lbWJlckNvbG9yc1NlbGVjdG9yLFxuICBjb252ZXJzYXRpb25NZW1iZXJDb2xvcnNTZWxlY3RvciA9PiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgICBjb250YWN0SWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuICAgICk6IENvbnRhY3ROYW1lQ29sb3JUeXBlID0+IHtcbiAgICAgIGlmICghY29udGFjdElkKSB7XG4gICAgICAgIGxvZy53YXJuKCdObyBjb2xvciBnZW5lcmF0ZWQgZm9yIG1pc3NpbmcgY29udGFjdElkJyk7XG4gICAgICAgIHJldHVybiBDb250YWN0TmFtZUNvbG9yc1swXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGFjdE5hbWVDb2xvcnMgPVxuICAgICAgICBjb252ZXJzYXRpb25NZW1iZXJDb2xvcnNTZWxlY3Rvcihjb252ZXJzYXRpb25JZCk7XG4gICAgICBjb25zdCBjb2xvciA9IGNvbnRhY3ROYW1lQ29sb3JzLmdldChjb250YWN0SWQpO1xuICAgICAgaWYgKCFjb2xvcikge1xuICAgICAgICBsb2cud2FybihgTm8gY29sb3IgZ2VuZXJhdGVkIGZvciBjb250YWN0ICR7Y29udGFjdElkfWApO1xuICAgICAgICByZXR1cm4gQ29udGFjdE5hbWVDb2xvcnNbMF07XG4gICAgICB9XG4gICAgICByZXR1cm4gY29sb3I7XG4gICAgfTtcbiAgfVxuKTtcblxudHlwZSBHZXRNZXNzYWdlQnlJZFR5cGUgPSAoaWQ6IHN0cmluZykgPT4gVGltZWxpbmVJdGVtVHlwZSB8IHVuZGVmaW5lZDtcbmV4cG9ydCBjb25zdCBnZXRNZXNzYWdlU2VsZWN0b3IgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q2FjaGVkU2VsZWN0b3JGb3JNZXNzYWdlLFxuICBnZXRNZXNzYWdlcyxcbiAgZ2V0U2VsZWN0ZWRNZXNzYWdlLFxuICBnZXRDb252ZXJzYXRpb25TZWxlY3RvcixcbiAgZ2V0UmVnaW9uQ29kZSxcbiAgZ2V0VXNlck51bWJlcixcbiAgZ2V0VXNlclV1aWQsXG4gIGdldFVzZXJDb252ZXJzYXRpb25JZCxcbiAgZ2V0Q2FsbFNlbGVjdG9yLFxuICBnZXRBY3RpdmVDYWxsLFxuICBnZXRBY2NvdW50U2VsZWN0b3IsXG4gIGdldENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcixcbiAgKFxuICAgIG1lc3NhZ2VTZWxlY3RvcjogdHlwZW9mIGdldFByb3BzRm9yQnViYmxlLFxuICAgIG1lc3NhZ2VMb29rdXA6IE1lc3NhZ2VMb29rdXBUeXBlLFxuICAgIHNlbGVjdGVkTWVzc2FnZTogU2VsZWN0ZWRNZXNzYWdlVHlwZSB8IHVuZGVmaW5lZCxcbiAgICBjb252ZXJzYXRpb25TZWxlY3RvcjogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUsXG4gICAgcmVnaW9uQ29kZTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIG91ck51bWJlcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkLFxuICAgIG91ckNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgY2FsbFNlbGVjdG9yOiBDYWxsU2VsZWN0b3JUeXBlLFxuICAgIGFjdGl2ZUNhbGw6IHVuZGVmaW5lZCB8IENhbGxTdGF0ZVR5cGUsXG4gICAgYWNjb3VudFNlbGVjdG9yOiBBY2NvdW50U2VsZWN0b3JUeXBlLFxuICAgIGNvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcjogQ29udGFjdE5hbWVDb2xvclNlbGVjdG9yVHlwZVxuICApOiBHZXRNZXNzYWdlQnlJZFR5cGUgPT4ge1xuICAgIHJldHVybiAoaWQ6IHN0cmluZykgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IG1lc3NhZ2VMb29rdXBbaWRdO1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBtZXNzYWdlU2VsZWN0b3IobWVzc2FnZSwge1xuICAgICAgICBjb252ZXJzYXRpb25TZWxlY3RvcixcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQsXG4gICAgICAgIG91ck51bWJlcixcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgICAgcmVnaW9uQ29kZSxcbiAgICAgICAgc2VsZWN0ZWRNZXNzYWdlSWQ6IHNlbGVjdGVkTWVzc2FnZT8uaWQsXG4gICAgICAgIHNlbGVjdGVkTWVzc2FnZUNvdW50ZXI6IHNlbGVjdGVkTWVzc2FnZT8uY291bnRlcixcbiAgICAgICAgY29udGFjdE5hbWVDb2xvclNlbGVjdG9yLFxuICAgICAgICBjYWxsU2VsZWN0b3IsXG4gICAgICAgIGFjdGl2ZUNhbGwsXG4gICAgICAgIGFjY291bnRTZWxlY3RvcixcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBfY29udmVyc2F0aW9uTWVzc2FnZXNTZWxlY3RvcihcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25NZXNzYWdlVHlwZVxuKTogVGltZWxpbmVQcm9wc1R5cGUge1xuICBjb25zdCB7XG4gICAgaXNOZWFyQm90dG9tLFxuICAgIG1lc3NhZ2VDaGFuZ2VDb3VudGVyLFxuICAgIG1lc3NhZ2VJZHMsXG4gICAgbWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgICBtZXRyaWNzLFxuICAgIHNjcm9sbFRvTWVzc2FnZUNvdW50ZXIsXG4gICAgc2Nyb2xsVG9NZXNzYWdlSWQsXG4gIH0gPSBjb252ZXJzYXRpb247XG5cbiAgY29uc3QgZmlyc3RJZCA9IG1lc3NhZ2VJZHNbMF07XG4gIGNvbnN0IGxhc3RJZCA9XG4gICAgbWVzc2FnZUlkcy5sZW5ndGggPT09IDAgPyB1bmRlZmluZWQgOiBtZXNzYWdlSWRzW21lc3NhZ2VJZHMubGVuZ3RoIC0gMV07XG5cbiAgY29uc3QgeyBvbGRlc3RVbnNlZW4gfSA9IG1ldHJpY3M7XG5cbiAgY29uc3QgaGF2ZU5ld2VzdCA9ICFtZXRyaWNzLm5ld2VzdCB8fCAhbGFzdElkIHx8IGxhc3RJZCA9PT0gbWV0cmljcy5uZXdlc3QuaWQ7XG4gIGNvbnN0IGhhdmVPbGRlc3QgPVxuICAgICFtZXRyaWNzLm9sZGVzdCB8fCAhZmlyc3RJZCB8fCBmaXJzdElkID09PSBtZXRyaWNzLm9sZGVzdC5pZDtcblxuICBjb25zdCBpdGVtcyA9IG1lc3NhZ2VJZHM7XG5cbiAgY29uc3Qgb2xkZXN0VW5zZWVuSW5kZXggPSBvbGRlc3RVbnNlZW5cbiAgICA/IG1lc3NhZ2VJZHMuZmluZEluZGV4KGlkID0+IGlkID09PSBvbGRlc3RVbnNlZW4uaWQpXG4gICAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IHNjcm9sbFRvSW5kZXggPSBzY3JvbGxUb01lc3NhZ2VJZFxuICAgID8gbWVzc2FnZUlkcy5maW5kSW5kZXgoaWQgPT4gaWQgPT09IHNjcm9sbFRvTWVzc2FnZUlkKVxuICAgIDogdW5kZWZpbmVkO1xuICBjb25zdCB7IHRvdGFsVW5zZWVuIH0gPSBtZXRyaWNzO1xuXG4gIHJldHVybiB7XG4gICAgaGF2ZU5ld2VzdCxcbiAgICBoYXZlT2xkZXN0LFxuICAgIGlzTmVhckJvdHRvbSxcbiAgICBpdGVtcyxcbiAgICBtZXNzYWdlQ2hhbmdlQ291bnRlcixcbiAgICBtZXNzYWdlTG9hZGluZ1N0YXRlLFxuICAgIG9sZGVzdFVuc2VlbkluZGV4OlxuICAgICAgaXNOdW1iZXIob2xkZXN0VW5zZWVuSW5kZXgpICYmIG9sZGVzdFVuc2VlbkluZGV4ID49IDBcbiAgICAgICAgPyBvbGRlc3RVbnNlZW5JbmRleFxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICBzY3JvbGxUb0luZGV4OlxuICAgICAgaXNOdW1iZXIoc2Nyb2xsVG9JbmRleCkgJiYgc2Nyb2xsVG9JbmRleCA+PSAwID8gc2Nyb2xsVG9JbmRleCA6IHVuZGVmaW5lZCxcbiAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogc2Nyb2xsVG9NZXNzYWdlQ291bnRlcixcbiAgICB0b3RhbFVuc2VlbixcbiAgfTtcbn1cblxudHlwZSBDYWNoZWRDb252ZXJzYXRpb25NZXNzYWdlc1NlbGVjdG9yVHlwZSA9IChcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25NZXNzYWdlVHlwZVxuKSA9PiBUaW1lbGluZVByb3BzVHlwZTtcbmV4cG9ydCBjb25zdCBnZXRDYWNoZWRTZWxlY3RvckZvckNvbnZlcnNhdGlvbk1lc3NhZ2VzID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFJlZ2lvbkNvZGUsXG4gIGdldFVzZXJOdW1iZXIsXG4gICgpOiBDYWNoZWRDb252ZXJzYXRpb25NZXNzYWdlc1NlbGVjdG9yVHlwZSA9PiB7XG4gICAgLy8gTm90ZTogbWVtb2l6ZWUgd2lsbCBjaGVjayBhbGwgcGFyYW1ldGVycyBwcm92aWRlZCwgYW5kIG9ubHkgcnVuIG91ciBzZWxlY3RvclxuICAgIC8vICAgaWYgYW55IG9mIHRoZW0gaGF2ZSBjaGFuZ2VkLlxuICAgIHJldHVybiBtZW1vaXplZShfY29udmVyc2F0aW9uTWVzc2FnZXNTZWxlY3RvciwgeyBtYXg6IDUwIH0pO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uTWVzc2FnZXNTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDYWNoZWRTZWxlY3RvckZvckNvbnZlcnNhdGlvbk1lc3NhZ2VzLFxuICBnZXRNZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAoXG4gICAgY29udmVyc2F0aW9uTWVzc2FnZXNTZWxlY3RvcjogQ2FjaGVkQ29udmVyc2F0aW9uTWVzc2FnZXNTZWxlY3RvclR5cGUsXG4gICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjogTWVzc2FnZXNCeUNvbnZlcnNhdGlvblR5cGVcbiAgKSA9PiB7XG4gICAgcmV0dXJuIChpZDogc3RyaW5nKTogVGltZWxpbmVQcm9wc1R5cGUgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gbWVzc2FnZXNCeUNvbnZlcnNhdGlvbltpZF07XG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICAvLyBUT0RPOiBERVNLVE9QLTIzNDBcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBoYXZlTmV3ZXN0OiBmYWxzZSxcbiAgICAgICAgICBoYXZlT2xkZXN0OiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlQ2hhbmdlQ291bnRlcjogMCxcbiAgICAgICAgICBtZXNzYWdlTG9hZGluZ1N0YXRlOiBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUuRG9pbmdJbml0aWFsTG9hZCxcbiAgICAgICAgICBzY3JvbGxUb0luZGV4Q291bnRlcjogMCxcbiAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICBpdGVtczogW10sXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBjb252ZXJzYXRpb25NZXNzYWdlc1NlbGVjdG9yKGNvbnZlcnNhdGlvbik7XG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEludml0ZWRDb250YWN0c0Zvck5ld2x5Q3JlYXRlZEdyb3VwID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnNCeVV1aWQsXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChcbiAgICBjb252ZXJzYXRpb25Mb29rdXAsXG4gICAgeyBpbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cCA9IFtdIH1cbiAgKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT5cbiAgICBkZWNvbnN0cnVjdExvb2t1cChjb252ZXJzYXRpb25Mb29rdXAsIGludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwKVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldENvbnZlcnNhdGlvbnNXaXRoQ3VzdG9tQ29sb3JTZWxlY3RvciA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRBbGxDb252ZXJzYXRpb25zLFxuICBjb252ZXJzYXRpb25zID0+IHtcbiAgICByZXR1cm4gKGNvbG9ySWQ6IHN0cmluZyk6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0+IHtcbiAgICAgIHJldHVybiBjb252ZXJzYXRpb25zLmZpbHRlcihcbiAgICAgICAgY29udmVyc2F0aW9uID0+IGNvbnZlcnNhdGlvbi5jdXN0b21Db2xvcklkID09PSBjb2xvcklkXG4gICAgICApO1xuICAgIH07XG4gIH1cbik7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc01pc3NpbmdSZXF1aXJlZFByb2ZpbGVTaGFyaW5nKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGVcbik6IGJvb2xlYW4ge1xuICBjb25zdCBkb2VzQ29udmVyc2F0aW9uUmVxdWlyZUl0ID1cbiAgICAhY29udmVyc2F0aW9uLmlzTWUgJiZcbiAgICAhY29udmVyc2F0aW9uLmxlZnQgJiZcbiAgICAoaXNHcm91cFYxKGNvbnZlcnNhdGlvbikgfHwgaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uKSk7XG5cbiAgcmV0dXJuIEJvb2xlYW4oXG4gICAgZG9lc0NvbnZlcnNhdGlvblJlcXVpcmVJdCAmJlxuICAgICAgIWNvbnZlcnNhdGlvbi5wcm9maWxlU2hhcmluZyAmJlxuICAgICAgd2luZG93LlNpZ25hbC5SZW1vdGVDb25maWcuaXNFbmFibGVkKCdkZXNrdG9wLm1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nJykgJiZcbiAgICAgIGNvbnZlcnNhdGlvbi5tZXNzYWdlQ291bnQgJiZcbiAgICAgIGNvbnZlcnNhdGlvbi5tZXNzYWdlQ291bnQgPiAwXG4gICk7XG59XG5cbmV4cG9ydCBjb25zdCBnZXRHcm91cEFkbWluc1NlbGVjdG9yID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvblNlbGVjdG9yLFxuICAoY29udmVyc2F0aW9uU2VsZWN0b3I6IEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlKSA9PiB7XG4gICAgcmV0dXJuIChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT4ge1xuICAgICAgY29uc3Qge1xuICAgICAgICBncm91cElkLFxuICAgICAgICBncm91cFZlcnNpb24sXG4gICAgICAgIG1lbWJlcnNoaXBzID0gW10sXG4gICAgICB9ID0gY29udmVyc2F0aW9uU2VsZWN0b3IoY29udmVyc2F0aW9uSWQpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFpc0dyb3VwVjIoe1xuICAgICAgICAgIGdyb3VwSWQsXG4gICAgICAgICAgZ3JvdXBWZXJzaW9uLFxuICAgICAgICB9KVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWRtaW5zOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtdO1xuICAgICAgbWVtYmVyc2hpcHMuZm9yRWFjaChtZW1iZXJzaGlwID0+IHtcbiAgICAgICAgaWYgKG1lbWJlcnNoaXAuaXNBZG1pbikge1xuICAgICAgICAgIGNvbnN0IGFkbWluID0gY29udmVyc2F0aW9uU2VsZWN0b3IobWVtYmVyc2hpcC51dWlkKTtcbiAgICAgICAgICBhZG1pbnMucHVzaChhZG1pbik7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGFkbWlucztcbiAgICB9O1xuICB9XG4pO1xuXG5jb25zdCBnZXRDb252ZXJzYXRpb25WZXJpZmljYXRpb25EYXRhID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvbnMsXG4gIChcbiAgICBjb252ZXJzYXRpb25zOiBSZWFkb25seTxDb252ZXJzYXRpb25zU3RhdGVUeXBlPlxuICApOiBSZWNvcmQ8c3RyaW5nLCBDb252ZXJzYXRpb25WZXJpZmljYXRpb25EYXRhPiA9PlxuICAgIGNvbnZlcnNhdGlvbnMudmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uSWRzU3RvcHBlZEZvclZlcmlmaWNhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25WZXJpZmljYXRpb25EYXRhLFxuICAodmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uKTogQXJyYXk8c3RyaW5nPiA9PlxuICAgIE9iamVjdC5rZXlzKHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbilcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25zU3RvcHBlZEZvclZlcmlmaWNhdGlvbiA9IGNyZWF0ZVNlbGVjdG9yKFxuICBnZXRDb252ZXJzYXRpb25CeUlkU2VsZWN0b3IsXG4gIGdldENvbnZlcnNhdGlvbklkc1N0b3BwZWRGb3JWZXJpZmljYXRpb24sXG4gIChcbiAgICBjb252ZXJzYXRpb25TZWxlY3RvcjogKGlkOiBzdHJpbmcpID0+IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGUsXG4gICAgY29udmVyc2F0aW9uSWRzOiBSZWFkb25seUFycmF5PHN0cmluZz5cbiAgKTogQXJyYXk8Q29udmVyc2F0aW9uVHlwZT4gPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbnMgPSBjb252ZXJzYXRpb25JZHNcbiAgICAgIC5tYXAoY29udmVyc2F0aW9uSWQgPT4gY29udmVyc2F0aW9uU2VsZWN0b3IoY29udmVyc2F0aW9uSWQpKVxuICAgICAgLmZpbHRlcihpc05vdE5pbCk7XG4gICAgcmV0dXJuIHNvcnRCeVRpdGxlKGNvbnZlcnNhdGlvbnMpO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0Q29udmVyc2F0aW9uVXVpZHNTdG9wcGluZ1NlbmQgPSBjcmVhdGVTZWxlY3RvcihcbiAgZ2V0Q29udmVyc2F0aW9uVmVyaWZpY2F0aW9uRGF0YSxcbiAgKHBlbmRpbmdEYXRhKTogQXJyYXk8c3RyaW5nPiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gICAgT2JqZWN0LnZhbHVlcyhwZW5kaW5nRGF0YSkuZm9yRWFjaChpdGVtID0+IHtcbiAgICAgIGlmIChpdGVtLnR5cGUgPT09IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24pIHtcbiAgICAgICAgaXRlbS51dWlkc05lZWRpbmdWZXJpZmljYXRpb24uZm9yRWFjaChjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICAgICAgcmVzdWx0LmFkZChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiBBcnJheS5mcm9tKHJlc3VsdCk7XG4gIH1cbik7XG5cbmV4cG9ydCBjb25zdCBnZXRDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldENvbnZlcnNhdGlvblNlbGVjdG9yLFxuICBnZXRDb252ZXJzYXRpb25VdWlkc1N0b3BwaW5nU2VuZCxcbiAgKFxuICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yOiBHZXRDb252ZXJzYXRpb25CeUlkVHlwZSxcbiAgICB1dWlkczogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4gICk6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25zID0gdXVpZHMubWFwKHV1aWQgPT4gY29udmVyc2F0aW9uU2VsZWN0b3IodXVpZCkpO1xuICAgIHJldHVybiBzb3J0QnlUaXRsZShjb252ZXJzYXRpb25zKTtcbiAgfVxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQXFCO0FBQ3JCLG9CQUF5QjtBQUN6QixzQkFBK0I7QUFlL0IsZ0NBSU87QUFDUCxvQkFBdUI7QUFDdkIsc0JBQXlCO0FBRXpCLCtCQUFrQztBQUdsQyxvQkFBdUI7QUFDdkIsd0NBQTJDO0FBQzNDLHdDQUFtRDtBQUVuRCxvQkFBa0M7QUFHbEMsZ0NBQW1DO0FBQ25DLHlCQUE0QjtBQUM1QixvQ0FJTztBQUVQLGtCQU1PO0FBQ1AsbUJBQXlDO0FBQ3pDLHFCQUFrQztBQUVsQyxxQkFBK0M7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
