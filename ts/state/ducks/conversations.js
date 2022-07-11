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
  COLORS_CHANGED: () => COLORS_CHANGED,
  COLOR_SELECTED: () => COLOR_SELECTED,
  ConversationTypes: () => ConversationTypes,
  InteractionModes: () => InteractionModes,
  SELECTED_CONVERSATION_CHANGED: () => SELECTED_CONVERSATION_CHANGED,
  actions: () => actions,
  cancelConversationVerification: () => cancelConversationVerification,
  clearCancelledConversationVerification: () => clearCancelledConversationVerification,
  getConversationCallMode: () => getConversationCallMode,
  getEmptyState: () => getEmptyState,
  reducer: () => reducer,
  updateConversationLookups: () => updateConversationLookups,
  useConversationsActions: () => useConversationsActions
});
module.exports = __toCommonJS(conversations_exports);
var import_p_queue = __toESM(require("p-queue"));
var import_lodash = require("lodash");
var groups = __toESM(require("../../groups"));
var log = __toESM(require("../../logging/log"));
var import_calling = require("../../services/calling");
var import_getOwn = require("../../util/getOwn");
var import_assert = require("../../util/assert");
var universalExpireTimer = __toESM(require("../../util/universalExpireTimer"));
var import_globalModals = require("./globalModals");
var import_isRecord = require("../../util/isRecord");
var import_Calling = require("../../types/Calling");
var import_limits = require("../../groups/limits");
var import_isMessageUnread = require("../../util/isMessageUnread");
var import_toggleSelectedContactForGroupAddition = require("../../groups/toggleSelectedContactForGroupAddition");
var import_contactSpoofing = require("../../util/contactSpoofing");
var import_writeProfile = require("../../services/writeProfile");
var import_writeUsername = require("../../services/writeUsername");
var import_conversations = require("../selectors/conversations");
var import_Avatar = require("../../types/Avatar");
var import_getAvatarData = require("../../util/getAvatarData");
var import_isSameAvatarData = require("../../util/isSameAvatarData");
var import_longRunningTaskWrapper = require("../../util/longRunningTaskWrapper");
var import_conversationsEnums = require("./conversationsEnums");
var import_showToast = require("../../util/showToast");
var import_ToastFailedToDeleteUsername = require("../../components/ToastFailedToDeleteUsername");
var import_useBoundActions = require("../../hooks/useBoundActions");
var import_conversationJobQueue = require("../../jobs/conversationJobQueue");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_missingCaseError = require("../../util/missingCaseError");
const InteractionModes = ["mouse", "keyboard"];
const ConversationTypes = ["direct", "group"];
const getConversationCallMode = /* @__PURE__ */ __name((conversation) => {
  if (conversation.left || conversation.isBlocked || conversation.isMe || !conversation.acceptedMessageRequest) {
    return import_Calling.CallMode.None;
  }
  if (conversation.type === "direct") {
    return import_Calling.CallMode.Direct;
  }
  if (conversation.type === "group" && conversation.groupVersion === 2) {
    return import_Calling.CallMode.Group;
  }
  return import_Calling.CallMode.None;
}, "getConversationCallMode");
const CANCEL_CONVERSATION_PENDING_VERIFICATION = "conversations/CANCEL_CONVERSATION_PENDING_VERIFICATION";
const CLEAR_CANCELLED_VERIFICATION = "conversations/CLEAR_CANCELLED_VERIFICATION";
const CLEAR_CONVERSATIONS_PENDING_VERIFICATION = "conversations/CLEAR_CONVERSATIONS_PENDING_VERIFICATION";
const COLORS_CHANGED = "conversations/COLORS_CHANGED";
const COLOR_SELECTED = "conversations/COLOR_SELECTED";
const COMPOSE_TOGGLE_EDITING_AVATAR = "conversations/compose/COMPOSE_TOGGLE_EDITING_AVATAR";
const COMPOSE_ADD_AVATAR = "conversations/compose/ADD_AVATAR";
const COMPOSE_REMOVE_AVATAR = "conversations/compose/REMOVE_AVATAR";
const COMPOSE_REPLACE_AVATAR = "conversations/compose/REPLACE_AVATAR";
const CUSTOM_COLOR_REMOVED = "conversations/CUSTOM_COLOR_REMOVED";
const CONVERSATION_STOPPED_BY_MISSING_VERIFICATION = "conversations/CONVERSATION_STOPPED_BY_MISSING_VERIFICATION";
const DISCARD_MESSAGES = "conversations/DISCARD_MESSAGES";
const REPLACE_AVATARS = "conversations/REPLACE_AVATARS";
const UPDATE_USERNAME_SAVE_STATE = "conversations/UPDATE_USERNAME_SAVE_STATE";
const SELECTED_CONVERSATION_CHANGED = "conversations/SELECTED_CONVERSATION_CHANGED";
const actions = {
  cancelConversationVerification,
  changeHasGroupLink,
  clearCancelledConversationVerification,
  clearGroupCreationError,
  clearInvitedUuidsForNewlyCreatedGroup,
  clearSelectedMessage,
  clearUnreadMetrics,
  clearUsernameSave,
  closeContactSpoofingReview,
  closeMaximumGroupSizeModal,
  closeRecommendedGroupSizeModal,
  colorSelected,
  composeDeleteAvatarFromDisk,
  composeReplaceAvatar,
  composeSaveAvatarToDisk,
  conversationAdded,
  conversationChanged,
  conversationRemoved,
  conversationStoppedByMissingVerification,
  conversationUnloaded,
  createGroup,
  deleteAvatarFromDisk,
  discardMessages,
  doubleCheckMissingQuoteReference,
  generateNewGroupLink,
  messageChanged,
  messageDeleted,
  messageExpanded,
  messagesAdded,
  messagesReset,
  myProfileChanged,
  removeAllConversations,
  removeCustomColorOnConversations,
  removeMemberFromGroup,
  repairNewestMessage,
  repairOldestMessage,
  replaceAvatar,
  resetAllChatColors,
  reviewGroupMemberNameCollision,
  reviewMessageRequestNameCollision,
  saveAvatarToDisk,
  saveUsername,
  scrollToMessage,
  selectMessage,
  setAccessControlAddFromInviteLinkSetting,
  setComposeGroupAvatar,
  setComposeGroupExpireTimer,
  setComposeGroupName,
  setComposeSearchTerm,
  setIsFetchingUUID,
  setIsNearBottom,
  setMessageLoadingState,
  setPreJoinConversation,
  setRecentMediaItems,
  setSelectedConversationHeaderTitle,
  setSelectedConversationPanelDepth,
  showArchivedConversations,
  showChooseGroupMembers,
  showInbox,
  showConversation,
  startComposing,
  startSettingGroupMetadata,
  toggleAdmin,
  toggleConversationInChooseMembers,
  toggleComposeEditingAvatar,
  toggleHideStories,
  updateConversationModelSharedGroups,
  verifyConversationsStoppingSend
};
const useConversationsActions = /* @__PURE__ */ __name(() => (0, import_useBoundActions.useBoundActions)(actions), "useConversationsActions");
function filterAvatarData(avatars, data) {
  return avatars.filter((avatarData) => !(0, import_isSameAvatarData.isSameAvatarData)(data, avatarData));
}
function getNextAvatarId(avatars) {
  return Math.max(...avatars.map((x) => Number(x.id))) + 1;
}
async function getAvatarsAndUpdateConversation(conversations, conversationId, getNextAvatarsData) {
  const conversation = window.ConversationController.get(conversationId);
  if (!conversation) {
    throw new Error("No conversation found");
  }
  const { conversationLookup } = conversations;
  const conversationAttrs = conversationLookup[conversationId];
  const avatars = conversationAttrs.avatars || (0, import_getAvatarData.getAvatarData)(conversation.attributes);
  const nextAvatarId = getNextAvatarId(avatars);
  const nextAvatars = getNextAvatarsData(avatars, nextAvatarId);
  conversation.attributes.avatars = nextAvatars.map((avatarData) => (0, import_lodash.omit)(avatarData, ["buffer"]));
  await window.Signal.Data.updateConversation(conversation.attributes);
  return nextAvatars;
}
function deleteAvatarFromDisk(avatarData, conversationId) {
  return async (dispatch, getState) => {
    if (avatarData.imagePath) {
      await window.Signal.Migrations.deleteAvatar(avatarData.imagePath);
    } else {
      log.info("No imagePath for avatarData. Removing from userAvatarData, but not disk");
    }
    (0, import_assert.strictAssert)(conversationId, "conversationId not provided");
    const avatars = await getAvatarsAndUpdateConversation(getState().conversations, conversationId, (prevAvatarsData) => filterAvatarData(prevAvatarsData, avatarData));
    dispatch({
      type: REPLACE_AVATARS,
      payload: {
        conversationId,
        avatars
      }
    });
  };
}
function changeHasGroupLink(conversationId, value) {
  return async (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      throw new Error("No conversation found");
    }
    await (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
      name: "toggleGroupLink",
      idForLogging: conversation.idForLogging(),
      task: async () => conversation.toggleGroupLink(value)
    });
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function generateNewGroupLink(conversationId) {
  return async (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      throw new Error("No conversation found");
    }
    await (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
      name: "refreshGroupLink",
      idForLogging: conversation.idForLogging(),
      task: async () => conversation.refreshGroupLink()
    });
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function setAccessControlAddFromInviteLinkSetting(conversationId, value) {
  return async (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      throw new Error("No conversation found");
    }
    await (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
      idForLogging: conversation.idForLogging(),
      name: "updateAccessControlAddFromInviteLink",
      task: async () => conversation.updateAccessControlAddFromInviteLink(value)
    });
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function discardMessages(payload) {
  return { type: DISCARD_MESSAGES, payload };
}
function replaceAvatar(curr, prev, conversationId) {
  return async (dispatch, getState) => {
    (0, import_assert.strictAssert)(conversationId, "conversationId not provided");
    const avatars = await getAvatarsAndUpdateConversation(getState().conversations, conversationId, (prevAvatarsData, nextId) => {
      const newAvatarData = {
        ...curr,
        id: prev?.id ?? nextId
      };
      const existingAvatarsData = prev ? filterAvatarData(prevAvatarsData, prev) : prevAvatarsData;
      return [newAvatarData, ...existingAvatarsData];
    });
    dispatch({
      type: REPLACE_AVATARS,
      payload: {
        conversationId,
        avatars
      }
    });
  };
}
function saveAvatarToDisk(avatarData, conversationId) {
  return async (dispatch, getState) => {
    if (!avatarData.buffer) {
      throw new Error("No avatar Uint8Array provided");
    }
    (0, import_assert.strictAssert)(conversationId, "conversationId not provided");
    const imagePath = await window.Signal.Migrations.writeNewAvatarData(avatarData.buffer);
    const avatars = await getAvatarsAndUpdateConversation(getState().conversations, conversationId, (prevAvatarsData, id) => {
      const newAvatarData = {
        ...avatarData,
        imagePath,
        id
      };
      return [newAvatarData, ...prevAvatarsData];
    });
    dispatch({
      type: REPLACE_AVATARS,
      payload: {
        conversationId,
        avatars
      }
    });
  };
}
function makeUsernameSaveType(newSaveState) {
  return {
    type: UPDATE_USERNAME_SAVE_STATE,
    payload: {
      newSaveState
    }
  };
}
function clearUsernameSave() {
  return makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.None);
}
function saveUsername({
  username,
  previousUsername
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const previousState = (0, import_conversations.getUsernameSaveState)(state);
    if (previousState !== import_conversationsEnums.UsernameSaveState.None) {
      log.error(`saveUsername: Save requested, but previous state was ${previousState}`);
      dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.GeneralError));
      return;
    }
    try {
      dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.Saving));
      await (0, import_writeUsername.writeUsername)({ username, previousUsername });
      dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.Success));
    } catch (error) {
      if (!username) {
        dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.DeleteFailed));
        (0, import_showToast.showToast)(import_ToastFailedToDeleteUsername.ToastFailedToDeleteUsername);
        return;
      }
      if (!(0, import_isRecord.isRecord)(error)) {
        dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.GeneralError));
        return;
      }
      if (error.code === 409) {
        dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.UsernameTakenError));
        return;
      }
      if (error.code === 400) {
        dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.UsernameMalformedError));
        return;
      }
      dispatch(makeUsernameSaveType(import_conversationsEnums.UsernameSaveState.GeneralError));
    }
  };
}
function myProfileChanged(profileData, avatar) {
  return async (dispatch, getState) => {
    const conversation = (0, import_conversations.getMe)(getState());
    try {
      await (0, import_writeProfile.writeProfile)({
        ...conversation,
        ...profileData
      }, avatar);
      dispatch({
        type: "NOOP",
        payload: null
      });
    } catch (err) {
      log.error("myProfileChanged", err && err.stack ? err.stack : err);
      dispatch({ type: import_globalModals.TOGGLE_PROFILE_EDITOR_ERROR });
    }
  };
}
function removeCustomColorOnConversations(colorId) {
  return async (dispatch) => {
    const conversationsToUpdate = [];
    window.getConversations().forEach((conversation) => {
      if (conversation.get("customColorId") === colorId) {
        delete conversation.attributes.conversationColor;
        delete conversation.attributes.customColor;
        delete conversation.attributes.customColorId;
        conversationsToUpdate.push(conversation.attributes);
      }
    });
    if (conversationsToUpdate.length) {
      await window.Signal.Data.updateConversations(conversationsToUpdate);
    }
    dispatch({
      type: CUSTOM_COLOR_REMOVED,
      payload: {
        colorId
      }
    });
  };
}
function resetAllChatColors() {
  return async (dispatch) => {
    await window.Signal.Data.updateAllConversationColors();
    window.getConversations().forEach((conversation) => {
      delete conversation.attributes.conversationColor;
      delete conversation.attributes.customColor;
      delete conversation.attributes.customColorId;
    });
    dispatch({
      type: COLORS_CHANGED,
      payload: {
        conversationColor: void 0,
        customColorData: void 0
      }
    });
  };
}
function colorSelected({
  conversationId,
  conversationColor,
  customColorData
}) {
  return async (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (conversation) {
      if (conversationColor) {
        conversation.attributes.conversationColor = conversationColor;
        if (customColorData) {
          conversation.attributes.customColor = customColorData.value;
          conversation.attributes.customColorId = customColorData.id;
        } else {
          delete conversation.attributes.customColor;
          delete conversation.attributes.customColorId;
        }
      } else {
        delete conversation.attributes.conversationColor;
        delete conversation.attributes.customColor;
        delete conversation.attributes.customColorId;
      }
      await window.Signal.Data.updateConversation(conversation.attributes);
    }
    dispatch({
      type: COLOR_SELECTED,
      payload: {
        conversationId,
        conversationColor,
        customColorData
      }
    });
  };
}
function toggleComposeEditingAvatar() {
  return {
    type: COMPOSE_TOGGLE_EDITING_AVATAR
  };
}
function cancelConversationVerification(canceledAt) {
  return (dispatch, getState) => {
    const state = getState();
    const conversationIdsBlocked = (0, import_conversations.getConversationIdsStoppedForVerification)(state);
    dispatch({
      type: CANCEL_CONVERSATION_PENDING_VERIFICATION,
      payload: {
        canceledAt: canceledAt ?? Date.now()
      }
    });
    conversationIdsBlocked.forEach((conversationId) => {
      import_conversationJobQueue.conversationJobQueue.resolveVerificationWaiter(conversationId);
    });
  };
}
function verifyConversationsStoppingSend() {
  return async (dispatch, getState) => {
    const state = getState();
    const uuidsStoppingSend = (0, import_conversations.getConversationUuidsStoppingSend)(state);
    const conversationIdsBlocked = (0, import_conversations.getConversationIdsStoppedForVerification)(state);
    log.info(`verifyConversationsStoppingSend: Starting with ${conversationIdsBlocked.length} blocked conversations and ${uuidsStoppingSend.length} conversations to verify.`);
    const promises = [];
    uuidsStoppingSend.forEach(async (uuid) => {
      const conversation = window.ConversationController.get(uuid);
      if (!conversation) {
        log.warn(`verifyConversationsStoppingSend: Cannot verify missing converastion for uuid ${uuid}`);
        return;
      }
      log.info(`verifyConversationsStoppingSend: Verifying conversation ${conversation.idForLogging()}`);
      if (conversation.isUnverified()) {
        promises.push(conversation.setVerifiedDefault());
      }
      promises.push(conversation.setApproved());
    });
    dispatch({
      type: CLEAR_CONVERSATIONS_PENDING_VERIFICATION
    });
    await Promise.all(promises);
    conversationIdsBlocked.forEach((conversationId) => {
      import_conversationJobQueue.conversationJobQueue.resolveVerificationWaiter(conversationId);
    });
  };
}
function clearCancelledConversationVerification(conversationId) {
  return {
    type: CLEAR_CANCELLED_VERIFICATION,
    payload: {
      conversationId
    }
  };
}
function composeSaveAvatarToDisk(avatarData) {
  return async (dispatch) => {
    if (!avatarData.buffer) {
      throw new Error("No avatar Uint8Array provided");
    }
    const imagePath = await window.Signal.Migrations.writeNewAvatarData(avatarData.buffer);
    dispatch({
      type: COMPOSE_ADD_AVATAR,
      payload: {
        ...avatarData,
        imagePath
      }
    });
  };
}
function composeDeleteAvatarFromDisk(avatarData) {
  return async (dispatch) => {
    if (avatarData.imagePath) {
      await window.Signal.Migrations.deleteAvatar(avatarData.imagePath);
    } else {
      log.info("No imagePath for avatarData. Removing from userAvatarData, but not disk");
    }
    dispatch({
      type: COMPOSE_REMOVE_AVATAR,
      payload: avatarData
    });
  };
}
function composeReplaceAvatar(curr, prev) {
  return {
    type: COMPOSE_REPLACE_AVATAR,
    payload: {
      curr,
      prev
    }
  };
}
function setPreJoinConversation(data) {
  return {
    type: "SET_PRE_JOIN_CONVERSATION",
    payload: {
      data
    }
  };
}
function conversationAdded(id, data) {
  return {
    type: "CONVERSATION_ADDED",
    payload: {
      id,
      data
    }
  };
}
function conversationChanged(id, data) {
  return (dispatch) => {
    import_calling.calling.groupMembersChanged(id);
    dispatch({
      type: "CONVERSATION_CHANGED",
      payload: {
        id,
        data
      }
    });
  };
}
function conversationRemoved(id) {
  return {
    type: "CONVERSATION_REMOVED",
    payload: {
      id
    }
  };
}
function conversationUnloaded(id) {
  return {
    type: "CONVERSATION_UNLOADED",
    payload: {
      id
    }
  };
}
function createGroup(createGroupV2 = groups.createGroupV2) {
  return async (dispatch, getState) => {
    const { composer } = getState().conversations;
    if (composer?.step !== import_conversationsEnums.ComposerStep.SetGroupMetadata || composer.isCreating) {
      (0, import_assert.assert)(false, "Cannot create group in this stage; doing nothing");
      return;
    }
    dispatch({ type: "CREATE_GROUP_PENDING" });
    try {
      const conversation = await createGroupV2({
        name: composer.groupName.trim(),
        avatar: composer.groupAvatar,
        avatars: composer.userAvatarData.map((avatarData) => (0, import_lodash.omit)(avatarData, ["buffer"])),
        expireTimer: composer.groupExpireTimer,
        conversationIds: composer.selectedConversationIds
      });
      dispatch({
        type: "CREATE_GROUP_FULFILLED",
        payload: {
          invitedUuids: (conversation.get("pendingMembersV2") || []).map((member) => member.uuid)
        }
      });
      dispatch(showConversation({
        conversationId: conversation.id,
        switchToAssociatedView: true
      }));
    } catch (err) {
      log.error("Failed to create group", err && err.stack ? err.stack : err);
      dispatch({ type: "CREATE_GROUP_REJECTED" });
    }
  };
}
function removeAllConversations() {
  return {
    type: "CONVERSATIONS_REMOVE_ALL",
    payload: null
  };
}
function selectMessage(messageId, conversationId) {
  return {
    type: "MESSAGE_SELECTED",
    payload: {
      messageId,
      conversationId
    }
  };
}
function conversationStoppedByMissingVerification(payload) {
  const profileFetchQueue = new import_p_queue.default({
    concurrency: 3
  });
  payload.untrustedUuids.forEach((uuid) => {
    const conversation = window.ConversationController.get(uuid);
    if (!conversation) {
      log.error(`conversationStoppedByMissingVerification: uuid ${uuid} not found!`);
      return;
    }
    profileFetchQueue.add(() => {
      const active = conversation.getActiveProfileFetch();
      return active || conversation.getProfiles();
    });
  });
  return {
    type: CONVERSATION_STOPPED_BY_MISSING_VERIFICATION,
    payload
  };
}
function messageChanged(id, conversationId, data) {
  return {
    type: "MESSAGE_CHANGED",
    payload: {
      id,
      conversationId,
      data
    }
  };
}
function messageDeleted(id, conversationId) {
  return {
    type: "MESSAGE_DELETED",
    payload: {
      id,
      conversationId
    }
  };
}
function messageExpanded(id, displayLimit) {
  return {
    type: "MESSAGE_EXPANDED",
    payload: {
      id,
      displayLimit
    }
  };
}
function messagesAdded({
  conversationId,
  isActive,
  isJustSent,
  isNewMessage,
  messages
}) {
  return {
    type: "MESSAGES_ADDED",
    payload: {
      conversationId,
      isActive,
      isJustSent,
      isNewMessage,
      messages
    }
  };
}
function repairNewestMessage(conversationId) {
  return {
    type: "REPAIR_NEWEST_MESSAGE",
    payload: {
      conversationId
    }
  };
}
function repairOldestMessage(conversationId) {
  return {
    type: "REPAIR_OLDEST_MESSAGE",
    payload: {
      conversationId
    }
  };
}
function reviewGroupMemberNameCollision(groupConversationId) {
  return {
    type: "REVIEW_GROUP_MEMBER_NAME_COLLISION",
    payload: { groupConversationId }
  };
}
function reviewMessageRequestNameCollision(payload) {
  return { type: "REVIEW_MESSAGE_REQUEST_NAME_COLLISION", payload };
}
function messagesReset({
  conversationId,
  messages,
  metrics,
  scrollToMessageId,
  unboundedFetch
}) {
  for (const message of messages) {
    (0, import_assert.strictAssert)(message.conversationId === conversationId, `messagesReset(${conversationId}): invalid message conversationId ${message.conversationId}`);
  }
  return {
    type: "MESSAGES_RESET",
    payload: {
      unboundedFetch: Boolean(unboundedFetch),
      conversationId,
      messages,
      metrics,
      scrollToMessageId
    }
  };
}
function setMessageLoadingState(conversationId, messageLoadingState) {
  return {
    type: "SET_MESSAGE_LOADING_STATE",
    payload: {
      conversationId,
      messageLoadingState
    }
  };
}
function setIsNearBottom(conversationId, isNearBottom) {
  return {
    type: "SET_NEAR_BOTTOM",
    payload: {
      conversationId,
      isNearBottom
    }
  };
}
function setIsFetchingUUID(identifier, isFetching) {
  return {
    type: "SET_IS_FETCHING_UUID",
    payload: {
      identifier,
      isFetching
    }
  };
}
function setSelectedConversationHeaderTitle(title) {
  return {
    type: "SET_CONVERSATION_HEADER_TITLE",
    payload: { title }
  };
}
function setSelectedConversationPanelDepth(panelDepth) {
  return {
    type: "SET_SELECTED_CONVERSATION_PANEL_DEPTH",
    payload: { panelDepth }
  };
}
function setRecentMediaItems(id, recentMediaItems) {
  return {
    type: "SET_RECENT_MEDIA_ITEMS",
    payload: { id, recentMediaItems }
  };
}
function clearInvitedUuidsForNewlyCreatedGroup() {
  return { type: "CLEAR_INVITED_UUIDS_FOR_NEWLY_CREATED_GROUP" };
}
function clearGroupCreationError() {
  return { type: "CLEAR_GROUP_CREATION_ERROR" };
}
function clearSelectedMessage() {
  return {
    type: "CLEAR_SELECTED_MESSAGE",
    payload: null
  };
}
function clearUnreadMetrics(conversationId) {
  return {
    type: "CLEAR_UNREAD_METRICS",
    payload: {
      conversationId
    }
  };
}
function closeContactSpoofingReview() {
  return { type: "CLOSE_CONTACT_SPOOFING_REVIEW" };
}
function closeMaximumGroupSizeModal() {
  return { type: "CLOSE_MAXIMUM_GROUP_SIZE_MODAL" };
}
function closeRecommendedGroupSizeModal() {
  return { type: "CLOSE_RECOMMENDED_GROUP_SIZE_MODAL" };
}
function scrollToMessage(conversationId, messageId) {
  return {
    type: "SCROLL_TO_MESSAGE",
    payload: {
      conversationId,
      messageId
    }
  };
}
function setComposeGroupAvatar(groupAvatar) {
  return {
    type: "SET_COMPOSE_GROUP_AVATAR",
    payload: { groupAvatar }
  };
}
function setComposeGroupName(groupName) {
  return {
    type: "SET_COMPOSE_GROUP_NAME",
    payload: { groupName }
  };
}
function setComposeGroupExpireTimer(groupExpireTimer) {
  return {
    type: "SET_COMPOSE_GROUP_EXPIRE_TIMER",
    payload: { groupExpireTimer }
  };
}
function setComposeSearchTerm(searchTerm) {
  return {
    type: "SET_COMPOSE_SEARCH_TERM",
    payload: { searchTerm }
  };
}
function startComposing() {
  return { type: "START_COMPOSING" };
}
function showChooseGroupMembers() {
  return { type: "SHOW_CHOOSE_GROUP_MEMBERS" };
}
function startSettingGroupMetadata() {
  return { type: "START_SETTING_GROUP_METADATA" };
}
function toggleConversationInChooseMembers(conversationId) {
  return (dispatch) => {
    const maxRecommendedGroupSize = (0, import_limits.getGroupSizeRecommendedLimit)(151);
    const maxGroupSize = Math.max((0, import_limits.getGroupSizeHardLimit)(1001), maxRecommendedGroupSize + 1);
    (0, import_assert.assert)(maxGroupSize > maxRecommendedGroupSize, "Expected the hard max group size to be larger than the recommended maximum");
    dispatch({
      type: "TOGGLE_CONVERSATION_IN_CHOOSE_MEMBERS",
      payload: { conversationId, maxGroupSize, maxRecommendedGroupSize }
    });
  };
}
function toggleHideStories(conversationId) {
  return (dispatch) => {
    const conversationModel = window.ConversationController.get(conversationId);
    if (conversationModel) {
      conversationModel.toggleHideStories();
    }
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function removeMemberFromGroup(conversationId, contactId) {
  return (dispatch) => {
    const conversationModel = window.ConversationController.get(conversationId);
    if (conversationModel) {
      const idForLogging = conversationModel.idForLogging();
      (0, import_longRunningTaskWrapper.longRunningTaskWrapper)({
        name: "removeMemberFromGroup",
        idForLogging,
        task: () => conversationModel.removeFromGroupV2(contactId)
      });
    }
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function toggleAdmin(conversationId, contactId) {
  return (dispatch) => {
    const conversationModel = window.ConversationController.get(conversationId);
    if (conversationModel) {
      conversationModel.toggleAdmin(contactId);
    }
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function updateConversationModelSharedGroups(conversationId) {
  return (dispatch) => {
    const conversation = window.ConversationController.get(conversationId);
    if (conversation && conversation.throttledUpdateSharedGroups) {
      conversation.throttledUpdateSharedGroups();
    }
    dispatch({
      type: "NOOP",
      payload: null
    });
  };
}
function showInbox() {
  return {
    type: "SHOW_INBOX",
    payload: null
  };
}
function showConversation({
  conversationId,
  messageId,
  switchToAssociatedView
}) {
  return {
    type: SELECTED_CONVERSATION_CHANGED,
    payload: {
      id: conversationId,
      messageId,
      switchToAssociatedView
    }
  };
}
function showArchivedConversations() {
  return {
    type: "SHOW_ARCHIVED_CONVERSATIONS",
    payload: null
  };
}
function doubleCheckMissingQuoteReference(messageId) {
  const message = window.MessageController.getById(messageId);
  if (message) {
    message.doubleCheckMissingQuoteReference();
  }
  return {
    type: "NOOP",
    payload: null
  };
}
function getEmptyState() {
  return {
    conversationLookup: {},
    conversationsByE164: {},
    conversationsByUuid: {},
    conversationsByGroupId: {},
    conversationsByUsername: {},
    verificationDataByConversation: {},
    messagesByConversation: {},
    messagesLookup: {},
    selectedMessageCounter: 0,
    showArchived: false,
    selectedConversationTitle: "",
    selectedConversationPanelDepth: 0,
    usernameSaveState: import_conversationsEnums.UsernameSaveState.None
  };
}
function updateConversationLookups(added, removed, state) {
  const result = {
    conversationsByE164: state.conversationsByE164,
    conversationsByUuid: state.conversationsByUuid,
    conversationsByGroupId: state.conversationsByGroupId,
    conversationsByUsername: state.conversationsByUsername
  };
  if (removed && removed.e164) {
    result.conversationsByE164 = (0, import_lodash.omit)(result.conversationsByE164, removed.e164);
  }
  if (removed && removed.uuid) {
    result.conversationsByUuid = (0, import_lodash.omit)(result.conversationsByUuid, removed.uuid);
  }
  if (removed && removed.groupId) {
    result.conversationsByGroupId = (0, import_lodash.omit)(result.conversationsByGroupId, removed.groupId);
  }
  if (removed && removed.username) {
    result.conversationsByUsername = (0, import_lodash.omit)(result.conversationsByUsername, removed.username);
  }
  if (added && added.e164) {
    result.conversationsByE164 = {
      ...result.conversationsByE164,
      [added.e164]: added
    };
  }
  if (added && added.uuid) {
    result.conversationsByUuid = {
      ...result.conversationsByUuid,
      [added.uuid]: added
    };
  }
  if (added && added.groupId) {
    result.conversationsByGroupId = {
      ...result.conversationsByGroupId,
      [added.groupId]: added
    };
  }
  if (added && added.username) {
    result.conversationsByUsername = {
      ...result.conversationsByUsername,
      [added.username]: added
    };
  }
  return result;
}
function closeComposerModal(state, modalToClose) {
  const { composer } = state;
  if (composer?.step !== import_conversationsEnums.ComposerStep.ChooseGroupMembers) {
    (0, import_assert.assert)(false, "Can't close the modal in this composer step. Doing nothing");
    return state;
  }
  if (composer[modalToClose] !== import_conversationsEnums.OneTimeModalState.Showing) {
    return state;
  }
  return {
    ...state,
    composer: {
      ...composer,
      [modalToClose]: import_conversationsEnums.OneTimeModalState.Shown
    }
  };
}
function reducer(state = getEmptyState(), action) {
  if (action.type === CLEAR_CONVERSATIONS_PENDING_VERIFICATION) {
    return {
      ...state,
      verificationDataByConversation: {}
    };
  }
  if (action.type === CLEAR_CANCELLED_VERIFICATION) {
    const { conversationId } = action.payload;
    const { verificationDataByConversation } = state;
    const existingPendingState = (0, import_getOwn.getOwn)(verificationDataByConversation, conversationId);
    if (existingPendingState && existingPendingState.type === import_conversationsEnums.ConversationVerificationState.PendingVerification) {
      return state;
    }
    return {
      ...state,
      verificationDataByConversation: (0, import_lodash.omit)(verificationDataByConversation, conversationId)
    };
  }
  if (action.type === CANCEL_CONVERSATION_PENDING_VERIFICATION) {
    const { canceledAt } = action.payload;
    const { verificationDataByConversation } = state;
    const newverificationDataByConversation = {};
    const entries = Object.entries(verificationDataByConversation);
    if (!entries.length) {
      log.warn("CANCEL_CONVERSATION_PENDING_VERIFICATION: No conversations pending verification");
      return state;
    }
    for (const [conversationId, data] of entries) {
      if (data.type === import_conversationsEnums.ConversationVerificationState.VerificationCancelled && data.canceledAt > canceledAt) {
        newverificationDataByConversation[conversationId] = data;
      } else {
        newverificationDataByConversation[conversationId] = {
          type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
          canceledAt
        };
      }
    }
    return {
      ...state,
      verificationDataByConversation: newverificationDataByConversation
    };
  }
  if (action.type === "CLEAR_INVITED_UUIDS_FOR_NEWLY_CREATED_GROUP") {
    return (0, import_lodash.omit)(state, "invitedUuidsForNewlyCreatedGroup");
  }
  if (action.type === "CLEAR_GROUP_CREATION_ERROR") {
    const { composer } = state;
    if (composer?.step !== import_conversationsEnums.ComposerStep.SetGroupMetadata) {
      (0, import_assert.assert)(false, "Can't clear group creation error in this composer state. Doing nothing");
      return state;
    }
    return {
      ...state,
      composer: {
        ...composer,
        hasError: false
      }
    };
  }
  if (action.type === "CLOSE_CONTACT_SPOOFING_REVIEW") {
    return (0, import_lodash.omit)(state, "contactSpoofingReview");
  }
  if (action.type === "CLOSE_MAXIMUM_GROUP_SIZE_MODAL") {
    return closeComposerModal(state, "maximumGroupSizeModalState");
  }
  if (action.type === "CLOSE_RECOMMENDED_GROUP_SIZE_MODAL") {
    return closeComposerModal(state, "recommendedGroupSizeModalState");
  }
  if (action.type === DISCARD_MESSAGES) {
    const { conversationId } = action.payload;
    if ("numberToKeepAtBottom" in action.payload) {
      const { numberToKeepAtBottom } = action.payload;
      const conversationMessages = (0, import_getOwn.getOwn)(state.messagesByConversation, conversationId);
      if (!conversationMessages) {
        return state;
      }
      const { messageIds: oldMessageIds } = conversationMessages;
      if (oldMessageIds.length <= numberToKeepAtBottom) {
        return state;
      }
      const messageIdsToRemove = oldMessageIds.slice(0, -numberToKeepAtBottom);
      const messageIdsToKeep = oldMessageIds.slice(-numberToKeepAtBottom);
      return {
        ...state,
        messagesLookup: (0, import_lodash.omit)(state.messagesLookup, messageIdsToRemove),
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: {
            ...conversationMessages,
            messageIds: messageIdsToKeep
          }
        }
      };
    }
    if ("numberToKeepAtTop" in action.payload) {
      const { numberToKeepAtTop } = action.payload;
      const conversationMessages = (0, import_getOwn.getOwn)(state.messagesByConversation, conversationId);
      if (!conversationMessages) {
        return state;
      }
      const { messageIds: oldMessageIds } = conversationMessages;
      if (oldMessageIds.length <= numberToKeepAtTop) {
        return state;
      }
      const messageIdsToRemove = oldMessageIds.slice(numberToKeepAtTop);
      const messageIdsToKeep = oldMessageIds.slice(0, numberToKeepAtTop);
      return {
        ...state,
        messagesLookup: (0, import_lodash.omit)(state.messagesLookup, messageIdsToRemove),
        messagesByConversation: {
          ...state.messagesByConversation,
          [conversationId]: {
            ...conversationMessages,
            messageIds: messageIdsToKeep
          }
        }
      };
    }
    throw (0, import_missingCaseError.missingCaseError)(action.payload);
  }
  if (action.type === "SET_PRE_JOIN_CONVERSATION") {
    const { payload } = action;
    const { data } = payload;
    return {
      ...state,
      preJoinConversation: data
    };
  }
  if (action.type === "CONVERSATION_ADDED") {
    const { payload } = action;
    const { id, data } = payload;
    const { conversationLookup } = state;
    return {
      ...state,
      conversationLookup: {
        ...conversationLookup,
        [id]: data
      },
      ...updateConversationLookups(data, void 0, state)
    };
  }
  if (action.type === "CONVERSATION_CHANGED") {
    const { payload } = action;
    const { id, data } = payload;
    const { conversationLookup } = state;
    const { selectedConversationId } = state;
    let { showArchived } = state;
    const existing = conversationLookup[id];
    if (!existing || data === existing) {
      return state;
    }
    const keysToOmit = [];
    if (selectedConversationId === id) {
      if (existing.isArchived && !data.isArchived) {
        showArchived = false;
      }
      if (!existing.isArchived && data.isArchived) {
        keysToOmit.push("selectedConversationId");
      }
      if (!existing.isBlocked && data.isBlocked) {
        keysToOmit.push("contactSpoofingReview");
      }
    }
    return {
      ...(0, import_lodash.omit)(state, keysToOmit),
      selectedConversationId,
      showArchived,
      conversationLookup: {
        ...conversationLookup,
        [id]: data
      },
      ...updateConversationLookups(data, existing, state)
    };
  }
  if (action.type === "CONVERSATION_REMOVED") {
    const { payload } = action;
    const { id } = payload;
    const { conversationLookup } = state;
    const existing = (0, import_getOwn.getOwn)(conversationLookup, id);
    if (!existing) {
      return state;
    }
    return {
      ...state,
      conversationLookup: (0, import_lodash.omit)(conversationLookup, [id]),
      ...updateConversationLookups(void 0, existing, state)
    };
  }
  if (action.type === "CONVERSATION_UNLOADED") {
    const { payload } = action;
    const { id } = payload;
    const existingConversation = state.messagesByConversation[id];
    if (!existingConversation) {
      return state;
    }
    const { messageIds } = existingConversation;
    const selectedConversationId = state.selectedConversationId !== id ? state.selectedConversationId : void 0;
    return {
      ...(0, import_lodash.omit)(state, "contactSpoofingReview"),
      selectedConversationId,
      selectedConversationPanelDepth: 0,
      messagesLookup: (0, import_lodash.omit)(state.messagesLookup, messageIds),
      messagesByConversation: (0, import_lodash.omit)(state.messagesByConversation, [id])
    };
  }
  if (action.type === "CONVERSATIONS_REMOVE_ALL") {
    return getEmptyState();
  }
  if (action.type === "CREATE_GROUP_PENDING") {
    const { composer } = state;
    if (composer?.step !== import_conversationsEnums.ComposerStep.SetGroupMetadata) {
      return state;
    }
    return {
      ...state,
      composer: {
        ...composer,
        hasError: false,
        isCreating: true
      }
    };
  }
  if (action.type === "CREATE_GROUP_FULFILLED") {
    return {
      ...state,
      invitedUuidsForNewlyCreatedGroup: action.payload.invitedUuids
    };
  }
  if (action.type === "CREATE_GROUP_REJECTED") {
    const { composer } = state;
    if (composer?.step !== import_conversationsEnums.ComposerStep.SetGroupMetadata) {
      return state;
    }
    return {
      ...state,
      composer: {
        ...composer,
        hasError: true,
        isCreating: false
      }
    };
  }
  if (action.type === "SET_SELECTED_CONVERSATION_PANEL_DEPTH") {
    return {
      ...state,
      selectedConversationPanelDepth: action.payload.panelDepth
    };
  }
  if (action.type === "MESSAGE_SELECTED") {
    const { messageId, conversationId } = action.payload;
    if (state.selectedConversationId !== conversationId) {
      return state;
    }
    return {
      ...state,
      selectedMessage: messageId,
      selectedMessageCounter: state.selectedMessageCounter + 1
    };
  }
  if (action.type === CONVERSATION_STOPPED_BY_MISSING_VERIFICATION) {
    const { conversationId, untrustedUuids } = action.payload;
    const { verificationDataByConversation } = state;
    const existingPendingState = (0, import_getOwn.getOwn)(verificationDataByConversation, conversationId);
    if (!existingPendingState || existingPendingState.type === import_conversationsEnums.ConversationVerificationState.VerificationCancelled) {
      return {
        ...state,
        verificationDataByConversation: {
          ...verificationDataByConversation,
          [conversationId]: {
            type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
            uuidsNeedingVerification: untrustedUuids
          }
        }
      };
    }
    const uuidsNeedingVerification = Array.from(/* @__PURE__ */ new Set([
      ...existingPendingState.uuidsNeedingVerification,
      ...untrustedUuids
    ]));
    return {
      ...state,
      verificationDataByConversation: {
        ...verificationDataByConversation,
        [conversationId]: {
          type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
          uuidsNeedingVerification
        }
      }
    };
  }
  if (action.type === "MESSAGE_CHANGED") {
    const { id, conversationId, data } = action.payload;
    const existingConversation = state.messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    const existingMessage = (0, import_getOwn.getOwn)(state.messagesLookup, id);
    if (!existingMessage) {
      return state;
    }
    const conversationAttrs = state.conversationLookup[conversationId];
    const isGroupStoryReply = (0, import_whatTypeOfConversation.isGroup)(conversationAttrs) && data.storyId;
    if (isGroupStoryReply) {
      return state;
    }
    const toIncrement = data.reactions?.length ? 1 : 0;
    return {
      ...state,
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          messageChangeCounter: (existingConversation.messageChangeCounter || 0) + toIncrement
        }
      },
      messagesLookup: {
        ...state.messagesLookup,
        [id]: {
          ...data,
          displayLimit: existingMessage.displayLimit
        }
      }
    };
  }
  if (action.type === "MESSAGE_EXPANDED") {
    const { id, displayLimit } = action.payload;
    const existingMessage = state.messagesLookup[id];
    if (!existingMessage) {
      return state;
    }
    return {
      ...state,
      messagesLookup: {
        ...state.messagesLookup,
        [id]: {
          ...existingMessage,
          displayLimit
        }
      }
    };
  }
  if (action.type === "MESSAGES_RESET") {
    const {
      conversationId,
      messages,
      metrics,
      scrollToMessageId,
      unboundedFetch
    } = action.payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = messagesByConversation[conversationId];
    const lookup = (0, import_lodash.fromPairs)(messages.map((message) => [message.id, message]));
    const sorted = (0, import_lodash.orderBy)((0, import_lodash.values)(lookup), ["received_at", "sent_at"], ["ASC", "ASC"]);
    let { newest, oldest } = metrics;
    if (sorted.length > 0) {
      const first = sorted[0];
      if (first && (!oldest || first.received_at <= oldest.received_at)) {
        oldest = (0, import_lodash.pick)(first, ["id", "received_at", "sent_at"]);
      }
      const last = sorted[sorted.length - 1];
      if (last && (!newest || unboundedFetch || last.received_at >= newest.received_at)) {
        newest = (0, import_lodash.pick)(last, ["id", "received_at", "sent_at"]);
      }
    }
    const messageIds = sorted.map((message) => message.id);
    return {
      ...state,
      ...state.selectedConversationId === conversationId ? {
        selectedMessage: scrollToMessageId,
        selectedMessageCounter: state.selectedMessageCounter + 1
      } : {},
      messagesLookup: {
        ...messagesLookup,
        ...lookup
      },
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          messageChangeCounter: 0,
          scrollToMessageId,
          scrollToMessageCounter: existingConversation ? existingConversation.scrollToMessageCounter + 1 : 0,
          messageIds,
          metrics: {
            ...metrics,
            newest,
            oldest
          }
        }
      }
    };
  }
  if (action.type === "SET_MESSAGE_LOADING_STATE") {
    const { payload } = action;
    const { conversationId, messageLoadingState } = payload;
    const { messagesByConversation } = state;
    const existingConversation = messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    return {
      ...state,
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          messageLoadingState
        }
      }
    };
  }
  if (action.type === "SET_NEAR_BOTTOM") {
    const { payload } = action;
    const { conversationId, isNearBottom } = payload;
    const { messagesByConversation } = state;
    const existingConversation = messagesByConversation[conversationId];
    if (!existingConversation || existingConversation.isNearBottom === isNearBottom) {
      return state;
    }
    return {
      ...state,
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          isNearBottom
        }
      }
    };
  }
  if (action.type === "SCROLL_TO_MESSAGE") {
    const { payload } = action;
    const { conversationId, messageId } = payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    if (!messagesLookup[messageId]) {
      return state;
    }
    if (!existingConversation.messageIds.includes(messageId)) {
      return state;
    }
    return {
      ...state,
      selectedMessage: messageId,
      selectedMessageCounter: state.selectedMessageCounter + 1,
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          messageLoadingState: void 0,
          scrollToMessageId: messageId,
          scrollToMessageCounter: existingConversation.scrollToMessageCounter + 1
        }
      }
    };
  }
  if (action.type === "MESSAGE_DELETED") {
    const { id, conversationId } = action.payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    const oldIds = existingConversation.messageIds;
    let { newest, oldest } = existingConversation.metrics;
    if (oldIds.length > 1) {
      const firstId = oldIds[0];
      const lastId = oldIds[oldIds.length - 1];
      if (oldest && oldest.id === firstId && firstId === id) {
        const second = messagesLookup[oldIds[1]];
        oldest = second ? (0, import_lodash.pick)(second, ["id", "received_at", "sent_at"]) : void 0;
      }
      if (newest && newest.id === lastId && lastId === id) {
        const penultimate = messagesLookup[oldIds[oldIds.length - 2]];
        newest = penultimate ? (0, import_lodash.pick)(penultimate, ["id", "received_at", "sent_at"]) : void 0;
      }
    }
    const messageIds = (0, import_lodash.without)(existingConversation.messageIds, id);
    let metrics;
    if (messageIds.length === 0) {
      metrics = {
        totalUnseen: 0
      };
    } else {
      metrics = {
        ...existingConversation.metrics,
        oldest,
        newest
      };
    }
    return {
      ...state,
      messagesLookup: (0, import_lodash.omit)(messagesLookup, id),
      messagesByConversation: {
        [conversationId]: {
          ...existingConversation,
          messageIds,
          metrics
        }
      }
    };
  }
  if (action.type === "REPAIR_NEWEST_MESSAGE") {
    const { conversationId } = action.payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = (0, import_getOwn.getOwn)(messagesByConversation, conversationId);
    if (!existingConversation) {
      return state;
    }
    const { messageIds } = existingConversation;
    const lastId = messageIds && messageIds.length ? messageIds[messageIds.length - 1] : void 0;
    const last = lastId ? (0, import_getOwn.getOwn)(messagesLookup, lastId) : void 0;
    const newest = last ? (0, import_lodash.pick)(last, ["id", "received_at", "sent_at"]) : void 0;
    return {
      ...state,
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          metrics: {
            ...existingConversation.metrics,
            newest
          }
        }
      }
    };
  }
  if (action.type === "REPAIR_OLDEST_MESSAGE") {
    const { conversationId } = action.payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = (0, import_getOwn.getOwn)(messagesByConversation, conversationId);
    if (!existingConversation) {
      return state;
    }
    const { messageIds } = existingConversation;
    const firstId = messageIds && messageIds.length ? messageIds[0] : void 0;
    const first = firstId ? (0, import_getOwn.getOwn)(messagesLookup, firstId) : void 0;
    const oldest = first ? (0, import_lodash.pick)(first, ["id", "received_at", "sent_at"]) : void 0;
    return {
      ...state,
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          metrics: {
            ...existingConversation.metrics,
            oldest
          }
        }
      }
    };
  }
  if (action.type === "REVIEW_GROUP_MEMBER_NAME_COLLISION") {
    return {
      ...state,
      contactSpoofingReview: {
        type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
        ...action.payload
      }
    };
  }
  if (action.type === "REVIEW_MESSAGE_REQUEST_NAME_COLLISION") {
    return {
      ...state,
      contactSpoofingReview: {
        type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
        ...action.payload
      }
    };
  }
  if (action.type === "MESSAGES_ADDED") {
    const { conversationId, isActive, isJustSent, isNewMessage, messages } = action.payload;
    const { messagesByConversation, messagesLookup } = state;
    const existingConversation = messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    let { newest, oldest, oldestUnseen, totalUnseen } = existingConversation.metrics;
    if (messages.length < 1) {
      return state;
    }
    const lookup = (0, import_lodash.fromPairs)(existingConversation.messageIds.map((id) => [id, messagesLookup[id]]));
    messages.forEach((message) => {
      lookup[message.id] = message;
    });
    const sorted = (0, import_lodash.orderBy)((0, import_lodash.values)(lookup), ["received_at", "sent_at"], ["ASC", "ASC"]);
    const messageIds = sorted.map((message) => message.id);
    const first = sorted[0];
    const last = sorted[sorted.length - 1];
    if (!newest) {
      newest = (0, import_lodash.pick)(first, ["id", "received_at", "sent_at"]);
    }
    if (!oldest) {
      oldest = (0, import_lodash.pick)(last, ["id", "received_at", "sent_at"]);
    }
    const existingTotal = existingConversation.messageIds.length;
    if (isNewMessage && existingTotal > 0) {
      const lastMessageId = existingConversation.messageIds[existingTotal - 1];
      const haveLatest = newest && newest.id === lastMessageId;
      if (!haveLatest) {
        if (isJustSent) {
          log.warn("reducer/MESSAGES_ADDED: isJustSent is true, but haveLatest is false");
        }
        return state;
      }
    }
    if (first && oldest && first.received_at <= oldest.received_at) {
      oldest = (0, import_lodash.pick)(first, ["id", "received_at", "sent_at"]);
    }
    if (last && newest && last.received_at >= newest.received_at) {
      newest = (0, import_lodash.pick)(last, ["id", "received_at", "sent_at"]);
    }
    const newIds = messages.map((message) => message.id);
    const newMessageIds = (0, import_lodash.difference)(newIds, existingConversation.messageIds);
    const { isNearBottom } = existingConversation;
    if ((!isNearBottom || !isActive) && !oldestUnseen) {
      const oldestId = newMessageIds.find((messageId) => {
        const message = lookup[messageId];
        return message && (0, import_isMessageUnread.isMessageUnread)(message);
      });
      if (oldestId) {
        oldestUnseen = (0, import_lodash.pick)(lookup[oldestId], [
          "id",
          "received_at",
          "sent_at"
        ]);
      }
    }
    if (isNewMessage && !isJustSent && oldestUnseen) {
      const newUnread = newMessageIds.reduce((sum, messageId) => {
        const message = lookup[messageId];
        return sum + (message && (0, import_isMessageUnread.isMessageUnread)(message) ? 1 : 0);
      }, 0);
      totalUnseen = (totalUnseen || 0) + newUnread;
    }
    return {
      ...state,
      messagesLookup: {
        ...messagesLookup,
        ...lookup
      },
      messagesByConversation: {
        ...messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          messageIds,
          messageLoadingState: void 0,
          scrollToMessageId: isJustSent ? last.id : void 0,
          metrics: {
            ...existingConversation.metrics,
            newest,
            oldest,
            totalUnseen,
            oldestUnseen
          }
        }
      }
    };
  }
  if (action.type === "CLEAR_SELECTED_MESSAGE") {
    return {
      ...state,
      selectedMessage: void 0
    };
  }
  if (action.type === "CLEAR_UNREAD_METRICS") {
    const { payload } = action;
    const { conversationId } = payload;
    const existingConversation = state.messagesByConversation[conversationId];
    if (!existingConversation) {
      return state;
    }
    return {
      ...state,
      messagesByConversation: {
        ...state.messagesByConversation,
        [conversationId]: {
          ...existingConversation,
          metrics: {
            ...existingConversation.metrics,
            oldestUnseen: void 0,
            totalUnseen: 0
          }
        }
      }
    };
  }
  if (action.type === SELECTED_CONVERSATION_CHANGED) {
    const { payload } = action;
    const { id, messageId, switchToAssociatedView } = payload;
    const nextState = {
      ...(0, import_lodash.omit)(state, "contactSpoofingReview"),
      selectedConversationId: id,
      selectedMessage: messageId
    };
    if (switchToAssociatedView && id) {
      const conversation = (0, import_getOwn.getOwn)(state.conversationLookup, id);
      if (!conversation) {
        return nextState;
      }
      return {
        ...(0, import_lodash.omit)(nextState, "composer"),
        showArchived: Boolean(conversation.isArchived)
      };
    }
    return nextState;
  }
  if (action.type === "SHOW_INBOX") {
    return {
      ...(0, import_lodash.omit)(state, "composer"),
      showArchived: false
    };
  }
  if (action.type === "SHOW_ARCHIVED_CONVERSATIONS") {
    return {
      ...(0, import_lodash.omit)(state, "composer"),
      showArchived: true
    };
  }
  if (action.type === "SET_CONVERSATION_HEADER_TITLE") {
    return {
      ...state,
      selectedConversationTitle: action.payload.title
    };
  }
  if (action.type === "SET_RECENT_MEDIA_ITEMS") {
    const { id, recentMediaItems } = action.payload;
    const { conversationLookup } = state;
    const conversationData = conversationLookup[id];
    if (!conversationData) {
      return state;
    }
    const data = {
      ...conversationData,
      recentMediaItems
    };
    return {
      ...state,
      conversationLookup: {
        ...conversationLookup,
        [id]: data
      },
      ...updateConversationLookups(data, void 0, state)
    };
  }
  if (action.type === "START_COMPOSING") {
    if (state.composer?.step === import_conversationsEnums.ComposerStep.StartDirectConversation) {
      return state;
    }
    return {
      ...state,
      showArchived: false,
      composer: {
        step: import_conversationsEnums.ComposerStep.StartDirectConversation,
        searchTerm: "",
        uuidFetchState: {}
      }
    };
  }
  if (action.type === "SHOW_CHOOSE_GROUP_MEMBERS") {
    let selectedConversationIds;
    let recommendedGroupSizeModalState;
    let maximumGroupSizeModalState;
    let groupName;
    let groupAvatar;
    let groupExpireTimer;
    let userAvatarData = (0, import_Avatar.getDefaultAvatars)(true);
    switch (state.composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
        return state;
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        ({
          selectedConversationIds,
          recommendedGroupSizeModalState,
          maximumGroupSizeModalState,
          groupName,
          groupAvatar,
          groupExpireTimer,
          userAvatarData
        } = state.composer);
        break;
      default:
        selectedConversationIds = [];
        recommendedGroupSizeModalState = import_conversationsEnums.OneTimeModalState.NeverShown;
        maximumGroupSizeModalState = import_conversationsEnums.OneTimeModalState.NeverShown;
        groupName = "";
        groupExpireTimer = universalExpireTimer.get();
        break;
    }
    return {
      ...state,
      showArchived: false,
      composer: {
        step: import_conversationsEnums.ComposerStep.ChooseGroupMembers,
        searchTerm: "",
        uuidFetchState: {},
        selectedConversationIds,
        recommendedGroupSizeModalState,
        maximumGroupSizeModalState,
        groupName,
        groupAvatar,
        groupExpireTimer,
        userAvatarData
      }
    };
  }
  if (action.type === "START_SETTING_GROUP_METADATA") {
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
        return {
          ...state,
          showArchived: false,
          composer: {
            step: import_conversationsEnums.ComposerStep.SetGroupMetadata,
            isEditingAvatar: false,
            isCreating: false,
            hasError: false,
            ...(0, import_lodash.pick)(composer, [
              "groupAvatar",
              "groupName",
              "groupExpireTimer",
              "maximumGroupSizeModalState",
              "recommendedGroupSizeModalState",
              "selectedConversationIds",
              "userAvatarData"
            ])
          }
        };
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return state;
      default:
        (0, import_assert.assert)(false, "Cannot transition to setting group metadata from this state");
        return state;
    }
  }
  if (action.type === "SET_COMPOSE_GROUP_AVATAR") {
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            groupAvatar: action.payload.groupAvatar
          }
        };
      default:
        (0, import_assert.assert)(false, "Setting compose group avatar at this step is a no-op");
        return state;
    }
  }
  if (action.type === "SET_COMPOSE_GROUP_NAME") {
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            groupName: action.payload.groupName
          }
        };
      default:
        (0, import_assert.assert)(false, "Setting compose group name at this step is a no-op");
        return state;
    }
  }
  if (action.type === "SET_COMPOSE_GROUP_EXPIRE_TIMER") {
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            groupExpireTimer: action.payload.groupExpireTimer
          }
        };
      default:
        (0, import_assert.assert)(false, "Setting compose group name at this step is a no-op");
        return state;
    }
  }
  if (action.type === "SET_COMPOSE_SEARCH_TERM") {
    const { composer } = state;
    if (!composer) {
      (0, import_assert.assert)(false, "Setting compose search term with the composer closed is a no-op");
      return state;
    }
    if (composer.step !== import_conversationsEnums.ComposerStep.StartDirectConversation && composer.step !== import_conversationsEnums.ComposerStep.ChooseGroupMembers) {
      (0, import_assert.assert)(false, `Setting compose search term at step ${composer.step} is a no-op`);
      return state;
    }
    return {
      ...state,
      composer: {
        ...composer,
        searchTerm: action.payload.searchTerm
      }
    };
  }
  if (action.type === "SET_IS_FETCHING_UUID") {
    const { composer } = state;
    if (!composer) {
      (0, import_assert.assert)(false, "Setting compose uuid fetch state with the composer closed is a no-op");
      return state;
    }
    if (composer.step !== import_conversationsEnums.ComposerStep.StartDirectConversation && composer.step !== import_conversationsEnums.ComposerStep.ChooseGroupMembers) {
      (0, import_assert.assert)(false, "Setting compose uuid fetch state at this step is a no-op");
      return state;
    }
    const { identifier, isFetching } = action.payload;
    const { uuidFetchState } = composer;
    return {
      ...state,
      composer: {
        ...composer,
        uuidFetchState: isFetching ? {
          ...composer.uuidFetchState,
          [identifier]: isFetching
        } : (0, import_lodash.omit)(uuidFetchState, identifier)
      }
    };
  }
  if (action.type === COMPOSE_TOGGLE_EDITING_AVATAR) {
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            isEditingAvatar: !composer.isEditingAvatar
          }
        };
      default:
        (0, import_assert.assert)(false, "Setting editing avatar at this step is a no-op");
        return state;
    }
  }
  if (action.type === COMPOSE_ADD_AVATAR) {
    const { payload } = action;
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            userAvatarData: [
              {
                ...payload,
                id: getNextAvatarId(composer.userAvatarData)
              },
              ...composer.userAvatarData
            ]
          }
        };
      default:
        (0, import_assert.assert)(false, "Adding an avatar at this step is a no-op");
        return state;
    }
  }
  if (action.type === COMPOSE_REMOVE_AVATAR) {
    const { payload } = action;
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            userAvatarData: filterAvatarData(composer.userAvatarData, payload)
          }
        };
      default:
        (0, import_assert.assert)(false, "Removing an avatar at this step is a no-op");
        return state;
    }
  }
  if (action.type === COMPOSE_REPLACE_AVATAR) {
    const { curr, prev } = action.payload;
    const { composer } = state;
    switch (composer?.step) {
      case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      case import_conversationsEnums.ComposerStep.SetGroupMetadata:
        return {
          ...state,
          composer: {
            ...composer,
            userAvatarData: [
              {
                ...curr,
                id: prev?.id ?? getNextAvatarId(composer.userAvatarData)
              },
              ...prev ? filterAvatarData(composer.userAvatarData, prev) : composer.userAvatarData
            ]
          }
        };
      default:
        (0, import_assert.assert)(false, "Replacing an avatar at this step is a no-op");
        return state;
    }
  }
  if (action.type === "TOGGLE_CONVERSATION_IN_CHOOSE_MEMBERS") {
    const { composer } = state;
    if (composer?.step !== import_conversationsEnums.ComposerStep.ChooseGroupMembers) {
      (0, import_assert.assert)(false, "Toggling conversation members is a no-op in this composer step");
      return state;
    }
    return {
      ...state,
      composer: {
        ...composer,
        ...(0, import_toggleSelectedContactForGroupAddition.toggleSelectedContactForGroupAddition)(action.payload.conversationId, {
          maxGroupSize: action.payload.maxGroupSize,
          maxRecommendedGroupSize: action.payload.maxRecommendedGroupSize,
          maximumGroupSizeModalState: composer.maximumGroupSizeModalState,
          numberOfContactsAlreadyInGroup: 1,
          recommendedGroupSizeModalState: composer.recommendedGroupSizeModalState,
          selectedConversationIds: composer.selectedConversationIds
        })
      }
    };
  }
  if (action.type === COLORS_CHANGED) {
    const { conversationLookup } = state;
    const { conversationColor, customColorData } = action.payload;
    const nextState = {
      ...state
    };
    Object.keys(conversationLookup).forEach((id) => {
      const existing = conversationLookup[id];
      const added = {
        ...existing,
        conversationColor,
        customColor: customColorData?.value,
        customColorId: customColorData?.id
      };
      Object.assign(nextState, updateConversationLookups(added, existing, nextState), {
        conversationLookup: {
          ...nextState.conversationLookup,
          [id]: added
        }
      });
    });
    return nextState;
  }
  if (action.type === COLOR_SELECTED) {
    const { conversationLookup } = state;
    const { conversationId, conversationColor, customColorData } = action.payload;
    const existing = conversationLookup[conversationId];
    if (!existing) {
      return state;
    }
    const changed = {
      ...existing,
      conversationColor,
      customColor: customColorData?.value,
      customColorId: customColorData?.id
    };
    return {
      ...state,
      conversationLookup: {
        ...conversationLookup,
        [conversationId]: changed
      },
      ...updateConversationLookups(changed, existing, state)
    };
  }
  if (action.type === CUSTOM_COLOR_REMOVED) {
    const { conversationLookup } = state;
    const { colorId } = action.payload;
    const nextState = {
      ...state
    };
    Object.keys(conversationLookup).forEach((id) => {
      const existing = conversationLookup[id];
      if (existing.customColorId !== colorId) {
        return;
      }
      const changed = {
        ...existing,
        conversationColor: void 0,
        customColor: void 0,
        customColorId: void 0
      };
      Object.assign(nextState, updateConversationLookups(changed, existing, nextState), {
        conversationLookup: {
          ...nextState.conversationLookup,
          [id]: changed
        }
      });
    });
    return nextState;
  }
  if (action.type === REPLACE_AVATARS) {
    const { conversationLookup } = state;
    const { conversationId, avatars } = action.payload;
    const conversation = conversationLookup[conversationId];
    if (!conversation) {
      return state;
    }
    const changed = {
      ...conversation,
      avatars
    };
    return {
      ...state,
      conversationLookup: {
        ...conversationLookup,
        [conversationId]: changed
      },
      ...updateConversationLookups(changed, conversation, state)
    };
  }
  if (action.type === UPDATE_USERNAME_SAVE_STATE) {
    const { newSaveState } = action.payload;
    return {
      ...state,
      usernameSaveState: newSaveState
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  COLORS_CHANGED,
  COLOR_SELECTED,
  ConversationTypes,
  InteractionModes,
  SELECTED_CONVERSATION_CHANGED,
  actions,
  cancelConversationVerification,
  clearCancelledConversationVerification,
  getConversationCallMode,
  getEmptyState,
  reducer,
  updateConversationLookups,
  useConversationsActions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbi8qIGVzbGludC1kaXNhYmxlIGNhbWVsY2FzZSAqL1xuXG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0IHR5cGUgeyBUaHVua0FjdGlvbiB9IGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7XG4gIGRpZmZlcmVuY2UsXG4gIGZyb21QYWlycyxcbiAgb21pdCxcbiAgb3JkZXJCeSxcbiAgcGljayxcbiAgdmFsdWVzLFxuICB3aXRob3V0LFxufSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSBhcyBSb290U3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgKiBhcyBncm91cHMgZnJvbSAnLi4vLi4vZ3JvdXBzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBjYWxsaW5nIH0gZnJvbSAnLi4vLi4vc2VydmljZXMvY2FsbGluZyc7XG5pbXBvcnQgeyBnZXRPd24gfSBmcm9tICcuLi8uLi91dGlsL2dldE93bic7XG5pbXBvcnQgeyBhc3NlcnQsIHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCAqIGFzIHVuaXZlcnNhbEV4cGlyZVRpbWVyIGZyb20gJy4uLy4uL3V0aWwvdW5pdmVyc2FsRXhwaXJlVGltZXInO1xuaW1wb3J0IHR5cGUgeyBUb2dnbGVQcm9maWxlRWRpdG9yRXJyb3JBY3Rpb25UeXBlIH0gZnJvbSAnLi9nbG9iYWxNb2RhbHMnO1xuaW1wb3J0IHsgVE9HR0xFX1BST0ZJTEVfRURJVE9SX0VSUk9SIH0gZnJvbSAnLi9nbG9iYWxNb2RhbHMnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi8uLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCB0eXBlIHtcbiAgVVVJREZldGNoU3RhdGVLZXlUeXBlLFxuICBVVUlERmV0Y2hTdGF0ZVR5cGUsXG59IGZyb20gJy4uLy4uL3V0aWwvdXVpZEZldGNoU3RhdGUnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIEF2YXRhckNvbG9yVHlwZSxcbiAgQ29udmVyc2F0aW9uQ29sb3JUeXBlLFxuICBDdXN0b21Db2xvclR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7XG4gIExhc3RNZXNzYWdlU3RhdHVzLFxuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxufSBmcm9tICcuLi8uLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgQm9keVJhbmdlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi8uLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB0eXBlIHsgTWVkaWFJdGVtVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL01lZGlhSXRlbSc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQge1xuICBnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0LFxuICBnZXRHcm91cFNpemVIYXJkTGltaXQsXG59IGZyb20gJy4uLy4uL2dyb3Vwcy9saW1pdHMnO1xuaW1wb3J0IHsgaXNNZXNzYWdlVW5yZWFkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc01lc3NhZ2VVbnJlYWQnO1xuaW1wb3J0IHsgdG9nZ2xlU2VsZWN0ZWRDb250YWN0Rm9yR3JvdXBBZGRpdGlvbiB9IGZyb20gJy4uLy4uL2dyb3Vwcy90b2dnbGVTZWxlY3RlZENvbnRhY3RGb3JHcm91cEFkZGl0aW9uJztcbmltcG9ydCB0eXBlIHsgR3JvdXBOYW1lQ29sbGlzaW9uc1dpdGhJZHNCeVRpdGxlIH0gZnJvbSAnLi4vLi4vdXRpbC9ncm91cE1lbWJlck5hbWVDb2xsaXNpb25zJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnRhY3RTcG9vZmluZyc7XG5pbXBvcnQgeyB3cml0ZVByb2ZpbGUgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy93cml0ZVByb2ZpbGUnO1xuaW1wb3J0IHsgd3JpdGVVc2VybmFtZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL3dyaXRlVXNlcm5hbWUnO1xuaW1wb3J0IHtcbiAgZ2V0Q29udmVyc2F0aW9uVXVpZHNTdG9wcGluZ1NlbmQsXG4gIGdldENvbnZlcnNhdGlvbklkc1N0b3BwZWRGb3JWZXJpZmljYXRpb24sXG4gIGdldE1lLFxuICBnZXRVc2VybmFtZVNhdmVTdGF0ZSxcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJEYXRhVHlwZSwgQXZhdGFyVXBkYXRlVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBnZXREZWZhdWx0QXZhdGFycyB9IGZyb20gJy4uLy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBnZXRBdmF0YXJEYXRhIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRBdmF0YXJEYXRhJztcbmltcG9ydCB7IGlzU2FtZUF2YXRhckRhdGEgfSBmcm9tICcuLi8uLi91dGlsL2lzU2FtZUF2YXRhckRhdGEnO1xuaW1wb3J0IHsgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlciB9IGZyb20gJy4uLy4uL3V0aWwvbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcic7XG5pbXBvcnQge1xuICBDb21wb3NlclN0ZXAsXG4gIENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLFxuICBPbmVUaW1lTW9kYWxTdGF0ZSxcbiAgVXNlcm5hbWVTYXZlU3RhdGUsXG59IGZyb20gJy4vY29udmVyc2F0aW9uc0VudW1zJztcbmltcG9ydCB7IHNob3dUb2FzdCB9IGZyb20gJy4uLy4uL3V0aWwvc2hvd1RvYXN0JztcbmltcG9ydCB7IFRvYXN0RmFpbGVkVG9EZWxldGVVc2VybmFtZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvVG9hc3RGYWlsZWRUb0RlbGV0ZVVzZXJuYW1lJztcbmltcG9ydCB7IHVzZUJvdW5kQWN0aW9ucyB9IGZyb20gJy4uLy4uL2hvb2tzL3VzZUJvdW5kQWN0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgTm9vcEFjdGlvblR5cGUgfSBmcm9tICcuL25vb3AnO1xuaW1wb3J0IHsgY29udmVyc2F0aW9uSm9iUXVldWUgfSBmcm9tICcuLi8uLi9qb2JzL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lbGluZVV0aWwnO1xuaW1wb3J0IHsgaXNHcm91cCB9IGZyb20gJy4uLy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgREJDb252ZXJzYXRpb25UeXBlID0ge1xuICBpZDogc3RyaW5nO1xuICBhY3RpdmVBdD86IG51bWJlcjtcbiAgbGFzdE1lc3NhZ2U/OiBzdHJpbmcgfCBudWxsO1xuICB0eXBlOiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3QgSW50ZXJhY3Rpb25Nb2RlcyA9IFsnbW91c2UnLCAna2V5Ym9hcmQnXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIEludGVyYWN0aW9uTW9kZVR5cGUgPSB0eXBlb2YgSW50ZXJhY3Rpb25Nb2Rlc1tudW1iZXJdO1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlVHlwZSA9IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSAmIHtcbiAgaW50ZXJhY3Rpb25UeXBlPzogSW50ZXJhY3Rpb25Nb2RlVHlwZTtcbn07XG5leHBvcnQgdHlwZSBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSA9IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSAmIHtcbiAgZGlzcGxheUxpbWl0PzogbnVtYmVyO1xufTtcblxuZXhwb3J0IGNvbnN0IENvbnZlcnNhdGlvblR5cGVzID0gWydkaXJlY3QnLCAnZ3JvdXAnXSBhcyBjb25zdDtcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblR5cGVUeXBlID0gdHlwZW9mIENvbnZlcnNhdGlvblR5cGVzW251bWJlcl07XG5cbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblR5cGUgPSB7XG4gIGlkOiBzdHJpbmc7XG4gIHV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgZTE2ND86IHN0cmluZztcbiAgbmFtZT86IHN0cmluZztcbiAgZmFtaWx5TmFtZT86IHN0cmluZztcbiAgZmlyc3ROYW1lPzogc3RyaW5nO1xuICBwcm9maWxlTmFtZT86IHN0cmluZztcbiAgdXNlcm5hbWU/OiBzdHJpbmc7XG4gIGFib3V0Pzogc3RyaW5nO1xuICBhYm91dFRleHQ/OiBzdHJpbmc7XG4gIGFib3V0RW1vamk/OiBzdHJpbmc7XG4gIGF2YXRhcnM/OiBBcnJheTxBdmF0YXJEYXRhVHlwZT47XG4gIGF2YXRhclBhdGg/OiBzdHJpbmc7XG4gIGF2YXRhckhhc2g/OiBzdHJpbmc7XG4gIHByb2ZpbGVBdmF0YXJQYXRoPzogc3RyaW5nO1xuICB1bmJsdXJyZWRBdmF0YXJQYXRoPzogc3RyaW5nO1xuICBhcmVXZUFkbWluPzogYm9vbGVhbjtcbiAgYXJlV2VQZW5kaW5nPzogYm9vbGVhbjtcbiAgYXJlV2VQZW5kaW5nQXBwcm92YWw/OiBib29sZWFuO1xuICBjYW5DaGFuZ2VUaW1lcj86IGJvb2xlYW47XG4gIGNhbkVkaXRHcm91cEluZm8/OiBib29sZWFuO1xuICBjb2xvcj86IEF2YXRhckNvbG9yVHlwZTtcbiAgY29udmVyc2F0aW9uQ29sb3I/OiBDb252ZXJzYXRpb25Db2xvclR5cGU7XG4gIGN1c3RvbUNvbG9yPzogQ3VzdG9tQ29sb3JUeXBlO1xuICBjdXN0b21Db2xvcklkPzogc3RyaW5nO1xuICBkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQ/OiBudW1iZXI7XG4gIGhpZGVTdG9yeT86IGJvb2xlYW47XG4gIGlzQXJjaGl2ZWQ/OiBib29sZWFuO1xuICBpc0Jsb2NrZWQ/OiBib29sZWFuO1xuICBpc0dyb3VwVjFBbmREaXNhYmxlZD86IGJvb2xlYW47XG4gIGlzUGlubmVkPzogYm9vbGVhbjtcbiAgaXNVbnRydXN0ZWQ/OiBib29sZWFuO1xuICBpc1ZlcmlmaWVkPzogYm9vbGVhbjtcbiAgYWN0aXZlQXQ/OiBudW1iZXI7XG4gIHRpbWVzdGFtcD86IG51bWJlcjtcbiAgaW5ib3hQb3NpdGlvbj86IG51bWJlcjtcbiAgbGVmdD86IGJvb2xlYW47XG4gIGxhc3RNZXNzYWdlPzpcbiAgICB8IHtcbiAgICAgICAgc3RhdHVzPzogTGFzdE1lc3NhZ2VTdGF0dXM7XG4gICAgICAgIHRleHQ6IHN0cmluZztcbiAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZTtcbiAgICAgIH1cbiAgICB8IHsgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlIH07XG4gIG1hcmtlZFVucmVhZD86IGJvb2xlYW47XG4gIHBob25lTnVtYmVyPzogc3RyaW5nO1xuICBtZW1iZXJzQ291bnQ/OiBudW1iZXI7XG4gIG1lc3NhZ2VDb3VudD86IG51bWJlcjtcbiAgYWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rPzogbnVtYmVyO1xuICBhY2Nlc3NDb250cm9sQXR0cmlidXRlcz86IG51bWJlcjtcbiAgYWNjZXNzQ29udHJvbE1lbWJlcnM/OiBudW1iZXI7XG4gIGFubm91bmNlbWVudHNPbmx5PzogYm9vbGVhbjtcbiAgYW5ub3VuY2VtZW50c09ubHlSZWFkeT86IGJvb2xlYW47XG4gIGV4cGlyZVRpbWVyPzogbnVtYmVyO1xuICBtZW1iZXJzaGlwcz86IEFycmF5PHtcbiAgICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgICBpc0FkbWluOiBib29sZWFuO1xuICB9PjtcbiAgcGVuZGluZ01lbWJlcnNoaXBzPzogQXJyYXk8e1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICAgIGFkZGVkQnlVc2VySWQ/OiBVVUlEU3RyaW5nVHlwZTtcbiAgfT47XG4gIHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzPzogQXJyYXk8e1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB9PjtcbiAgYmFubmVkTWVtYmVyc2hpcHM/OiBBcnJheTxVVUlEU3RyaW5nVHlwZT47XG4gIG11dGVFeHBpcmVzQXQ/OiBudW1iZXI7XG4gIGRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQ/OiBib29sZWFuO1xuICB0eXBlOiBDb252ZXJzYXRpb25UeXBlVHlwZTtcbiAgaXNNZTogYm9vbGVhbjtcbiAgbGFzdFVwZGF0ZWQ/OiBudW1iZXI7XG4gIC8vIFRoaXMgaXMgdXNlZCBieSB0aGUgQ29tcG9zaXRpb25JbnB1dCBmb3IgQG1lbnRpb25zXG4gIHNvcnRlZEdyb3VwTWVtYmVycz86IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICB0aXRsZTogc3RyaW5nO1xuICBzZWFyY2hhYmxlVGl0bGU/OiBzdHJpbmc7XG4gIHVucmVhZENvdW50PzogbnVtYmVyO1xuICBpc1NlbGVjdGVkPzogYm9vbGVhbjtcbiAgaXNGZXRjaGluZ1VVSUQ/OiBib29sZWFuO1xuICB0eXBpbmdDb250YWN0SWQ/OiBzdHJpbmc7XG4gIHJlY2VudE1lZGlhSXRlbXM/OiBBcnJheTxNZWRpYUl0ZW1UeXBlPjtcbiAgcHJvZmlsZVNoYXJpbmc/OiBib29sZWFuO1xuXG4gIHNob3VsZFNob3dEcmFmdD86IGJvb2xlYW47XG4gIGRyYWZ0VGV4dD86IHN0cmluZyB8IG51bGw7XG4gIGRyYWZ0Qm9keVJhbmdlcz86IEFycmF5PEJvZHlSYW5nZVR5cGU+O1xuICBkcmFmdFByZXZpZXc/OiBzdHJpbmc7XG5cbiAgc2hhcmVkR3JvdXBOYW1lczogQXJyYXk8c3RyaW5nPjtcbiAgZ3JvdXBEZXNjcmlwdGlvbj86IHN0cmluZztcbiAgZ3JvdXBWZXJzaW9uPzogMSB8IDI7XG4gIGdyb3VwSWQ/OiBzdHJpbmc7XG4gIGdyb3VwTGluaz86IHN0cmluZztcbiAgbWVzc2FnZVJlcXVlc3RzRW5hYmxlZD86IGJvb2xlYW47XG4gIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IGJvb2xlYW47XG4gIHNlY3JldFBhcmFtcz86IHN0cmluZztcbiAgcHVibGljUGFyYW1zPzogc3RyaW5nO1xuICBhY2tub3dsZWRnZWRHcm91cE5hbWVDb2xsaXNpb25zPzogR3JvdXBOYW1lQ29sbGlzaW9uc1dpdGhJZHNCeVRpdGxlO1xuICBwcm9maWxlS2V5Pzogc3RyaW5nO1xuXG4gIGJhZGdlczogQXJyYXk8XG4gICAgfCB7XG4gICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICB9XG4gICAgfCB7XG4gICAgICAgIGlkOiBzdHJpbmc7XG4gICAgICAgIGV4cGlyZXNBdDogbnVtYmVyO1xuICAgICAgICBpc1Zpc2libGU6IGJvb2xlYW47XG4gICAgICB9XG4gID47XG59O1xuZXhwb3J0IHR5cGUgUHJvZmlsZURhdGFUeXBlID0ge1xuICBmaXJzdE5hbWU6IHN0cmluZztcbn0gJiBQaWNrPENvbnZlcnNhdGlvblR5cGUsICdhYm91dEVtb2ppJyB8ICdhYm91dFRleHQnIHwgJ2ZhbWlseU5hbWUnPjtcblxuZXhwb3J0IHR5cGUgQ29udmVyc2F0aW9uTG9va3VwVHlwZSA9IHtcbiAgW2tleTogc3RyaW5nXTogQ29udmVyc2F0aW9uVHlwZTtcbn07XG5leHBvcnQgdHlwZSBDdXN0b21FcnJvciA9IEVycm9yICYge1xuICBpZGVudGlmaWVyPzogc3RyaW5nO1xuICBudW1iZXI/OiBzdHJpbmc7XG59O1xuXG50eXBlIE1lc3NhZ2VQb2ludGVyVHlwZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgcmVjZWl2ZWRfYXQ6IG51bWJlcjtcbiAgc2VudF9hdD86IG51bWJlcjtcbn07XG50eXBlIE1lc3NhZ2VNZXRyaWNzVHlwZSA9IHtcbiAgbmV3ZXN0PzogTWVzc2FnZVBvaW50ZXJUeXBlO1xuICBvbGRlc3Q/OiBNZXNzYWdlUG9pbnRlclR5cGU7XG4gIG9sZGVzdFVuc2Vlbj86IE1lc3NhZ2VQb2ludGVyVHlwZTtcbiAgdG90YWxVbnNlZW46IG51bWJlcjtcbn07XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VMb29rdXBUeXBlID0ge1xuICBba2V5OiBzdHJpbmddOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZTtcbn07XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25NZXNzYWdlVHlwZSA9IHtcbiAgaXNOZWFyQm90dG9tPzogYm9vbGVhbjtcbiAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6IG51bWJlcjtcbiAgbWVzc2FnZUlkczogQXJyYXk8c3RyaW5nPjtcbiAgbWVzc2FnZUxvYWRpbmdTdGF0ZT86IHVuZGVmaW5lZCB8IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZTtcbiAgbWV0cmljczogTWVzc2FnZU1ldHJpY3NUeXBlO1xuICBzY3JvbGxUb01lc3NhZ2VJZD86IHN0cmluZztcbiAgc2Nyb2xsVG9NZXNzYWdlQ291bnRlcjogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgTWVzc2FnZXNCeUNvbnZlcnNhdGlvblR5cGUgPSB7XG4gIFtrZXk6IHN0cmluZ106IENvbnZlcnNhdGlvbk1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkO1xufTtcblxuZXhwb3J0IHR5cGUgUHJlSm9pbkNvbnZlcnNhdGlvblR5cGUgPSB7XG4gIGF2YXRhcj86IHtcbiAgICBsb2FkaW5nPzogYm9vbGVhbjtcbiAgICB1cmw/OiBzdHJpbmc7XG4gIH07XG4gIGdyb3VwRGVzY3JpcHRpb24/OiBzdHJpbmc7XG4gIG1lbWJlckNvdW50OiBudW1iZXI7XG4gIHRpdGxlOiBzdHJpbmc7XG4gIGFwcHJvdmFsUmVxdWlyZWQ6IGJvb2xlYW47XG59O1xuXG50eXBlIENvbXBvc2VyR3JvdXBDcmVhdGlvblN0YXRlID0ge1xuICBncm91cEF2YXRhcjogdW5kZWZpbmVkIHwgVWludDhBcnJheTtcbiAgZ3JvdXBOYW1lOiBzdHJpbmc7XG4gIGdyb3VwRXhwaXJlVGltZXI6IG51bWJlcjtcbiAgbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlO1xuICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogQXJyYXk8c3RyaW5nPjtcbiAgdXNlckF2YXRhckRhdGE6IEFycmF5PEF2YXRhckRhdGFUeXBlPjtcbn07XG5cbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbkRhdGEgPVxuICB8IHtcbiAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb247XG4gICAgICB1dWlkc05lZWRpbmdWZXJpZmljYXRpb246IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuVmVyaWZpY2F0aW9uQ2FuY2VsbGVkO1xuICAgICAgY2FuY2VsZWRBdDogbnVtYmVyO1xuICAgIH07XG5cbnR5cGUgQ29tcG9zZXJTdGF0ZVR5cGUgPVxuICB8IHtcbiAgICAgIHN0ZXA6IENvbXBvc2VyU3RlcC5TdGFydERpcmVjdENvbnZlcnNhdGlvbjtcbiAgICAgIHNlYXJjaFRlcm06IHN0cmluZztcbiAgICAgIHV1aWRGZXRjaFN0YXRlOiBVVUlERmV0Y2hTdGF0ZVR5cGU7XG4gICAgfVxuICB8ICh7XG4gICAgICBzdGVwOiBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzO1xuICAgICAgc2VhcmNoVGVybTogc3RyaW5nO1xuICAgICAgdXVpZEZldGNoU3RhdGU6IFVVSURGZXRjaFN0YXRlVHlwZTtcbiAgICB9ICYgQ29tcG9zZXJHcm91cENyZWF0aW9uU3RhdGUpXG4gIHwgKHtcbiAgICAgIHN0ZXA6IENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhO1xuICAgICAgaXNFZGl0aW5nQXZhdGFyOiBib29sZWFuO1xuICAgIH0gJiBDb21wb3Nlckdyb3VwQ3JlYXRpb25TdGF0ZSAmXG4gICAgICAoXG4gICAgICAgIHwgeyBpc0NyZWF0aW5nOiBmYWxzZTsgaGFzRXJyb3I6IGJvb2xlYW4gfVxuICAgICAgICB8IHsgaXNDcmVhdGluZzogdHJ1ZTsgaGFzRXJyb3I6IGZhbHNlIH1cbiAgICAgICkpO1xuXG50eXBlIENvbnRhY3RTcG9vZmluZ1Jldmlld1N0YXRlVHlwZSA9XG4gIHwge1xuICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5EaXJlY3RDb252ZXJzYXRpb25XaXRoU2FtZVRpdGxlO1xuICAgICAgc2FmZUNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgfVxuICB8IHtcbiAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuTXVsdGlwbGVHcm91cE1lbWJlcnNXaXRoU2FtZVRpdGxlO1xuICAgICAgZ3JvdXBDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIH07XG5cbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gIHByZUpvaW5Db252ZXJzYXRpb24/OiBQcmVKb2luQ29udmVyc2F0aW9uVHlwZTtcbiAgaW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXA/OiBBcnJheTxzdHJpbmc+O1xuICBjb252ZXJzYXRpb25Mb29rdXA6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGU7XG4gIGNvbnZlcnNhdGlvbnNCeUUxNjQ6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGU7XG4gIGNvbnZlcnNhdGlvbnNCeVV1aWQ6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGU7XG4gIGNvbnZlcnNhdGlvbnNCeUdyb3VwSWQ6IENvbnZlcnNhdGlvbkxvb2t1cFR5cGU7XG4gIGNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lOiBDb252ZXJzYXRpb25Mb29rdXBUeXBlO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICBzZWxlY3RlZE1lc3NhZ2U/OiBzdHJpbmc7XG4gIHNlbGVjdGVkTWVzc2FnZUNvdW50ZXI6IG51bWJlcjtcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb25UaXRsZT86IHN0cmluZztcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoOiBudW1iZXI7XG4gIHNob3dBcmNoaXZlZDogYm9vbGVhbjtcbiAgY29tcG9zZXI/OiBDb21wb3NlclN0YXRlVHlwZTtcbiAgY29udGFjdFNwb29maW5nUmV2aWV3PzogQ29udGFjdFNwb29maW5nUmV2aWV3U3RhdGVUeXBlO1xuICB1c2VybmFtZVNhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGU7XG5cbiAgLyoqXG4gICAqIEVhY2gga2V5IGlzIGEgY29udmVyc2F0aW9uIElELiBFYWNoIHZhbHVlIGlzIGEgdmFsdWUgcmVwcmVzZW50aW5nIHRoZSBzdGF0ZSBvZlxuICAgKiB2ZXJpZmljYXRpb246IGVpdGhlciBhIHNldCBvZiBwZW5kaW5nIGNvbnZlcnNhdGlvbklkcyB0byBiZSBhcHByb3ZlZCwgb3IgYSB0b21ic3RvbmVcbiAgICogdGVsbGluZyBqb2JzIHRvIGNhbmNlbCB0aGVtc2VsdmVzIHVwIHRvIHRoYXQgdGltZXN0YW1wLlxuICAgKi9cbiAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiBSZWNvcmQ8c3RyaW5nLCBDb252ZXJzYXRpb25WZXJpZmljYXRpb25EYXRhPjtcblxuICAvLyBOb3RlOiBpdCdzIHZlcnkgaW1wb3J0YW50IHRoYXQgYm90aCBvZiB0aGVzZSBsb2NhdGlvbnMgYXJlIGFsd2F5cyBrZXB0IHVwIHRvIGRhdGVcbiAgbWVzc2FnZXNMb29rdXA6IE1lc3NhZ2VMb29rdXBUeXBlO1xuICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiBNZXNzYWdlc0J5Q29udmVyc2F0aW9uVHlwZTtcbn07XG5cbi8vIEhlbHBlcnNcblxuZXhwb3J0IGNvbnN0IGdldENvbnZlcnNhdGlvbkNhbGxNb2RlID0gKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGVcbik6IENhbGxNb2RlID0+IHtcbiAgaWYgKFxuICAgIGNvbnZlcnNhdGlvbi5sZWZ0IHx8XG4gICAgY29udmVyc2F0aW9uLmlzQmxvY2tlZCB8fFxuICAgIGNvbnZlcnNhdGlvbi5pc01lIHx8XG4gICAgIWNvbnZlcnNhdGlvbi5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICkge1xuICAgIHJldHVybiBDYWxsTW9kZS5Ob25lO1xuICB9XG5cbiAgaWYgKGNvbnZlcnNhdGlvbi50eXBlID09PSAnZGlyZWN0Jykge1xuICAgIHJldHVybiBDYWxsTW9kZS5EaXJlY3Q7XG4gIH1cblxuICBpZiAoY29udmVyc2F0aW9uLnR5cGUgPT09ICdncm91cCcgJiYgY29udmVyc2F0aW9uLmdyb3VwVmVyc2lvbiA9PT0gMikge1xuICAgIHJldHVybiBDYWxsTW9kZS5Hcm91cDtcbiAgfVxuXG4gIHJldHVybiBDYWxsTW9kZS5Ob25lO1xufTtcblxuLy8gQWN0aW9uc1xuXG5jb25zdCBDQU5DRUxfQ09OVkVSU0FUSU9OX1BFTkRJTkdfVkVSSUZJQ0FUSU9OID1cbiAgJ2NvbnZlcnNhdGlvbnMvQ0FOQ0VMX0NPTlZFUlNBVElPTl9QRU5ESU5HX1ZFUklGSUNBVElPTic7XG5jb25zdCBDTEVBUl9DQU5DRUxMRURfVkVSSUZJQ0FUSU9OID1cbiAgJ2NvbnZlcnNhdGlvbnMvQ0xFQVJfQ0FOQ0VMTEVEX1ZFUklGSUNBVElPTic7XG5jb25zdCBDTEVBUl9DT05WRVJTQVRJT05TX1BFTkRJTkdfVkVSSUZJQ0FUSU9OID1cbiAgJ2NvbnZlcnNhdGlvbnMvQ0xFQVJfQ09OVkVSU0FUSU9OU19QRU5ESU5HX1ZFUklGSUNBVElPTic7XG5leHBvcnQgY29uc3QgQ09MT1JTX0NIQU5HRUQgPSAnY29udmVyc2F0aW9ucy9DT0xPUlNfQ0hBTkdFRCc7XG5leHBvcnQgY29uc3QgQ09MT1JfU0VMRUNURUQgPSAnY29udmVyc2F0aW9ucy9DT0xPUl9TRUxFQ1RFRCc7XG5jb25zdCBDT01QT1NFX1RPR0dMRV9FRElUSU5HX0FWQVRBUiA9XG4gICdjb252ZXJzYXRpb25zL2NvbXBvc2UvQ09NUE9TRV9UT0dHTEVfRURJVElOR19BVkFUQVInO1xuY29uc3QgQ09NUE9TRV9BRERfQVZBVEFSID0gJ2NvbnZlcnNhdGlvbnMvY29tcG9zZS9BRERfQVZBVEFSJztcbmNvbnN0IENPTVBPU0VfUkVNT1ZFX0FWQVRBUiA9ICdjb252ZXJzYXRpb25zL2NvbXBvc2UvUkVNT1ZFX0FWQVRBUic7XG5jb25zdCBDT01QT1NFX1JFUExBQ0VfQVZBVEFSID0gJ2NvbnZlcnNhdGlvbnMvY29tcG9zZS9SRVBMQUNFX0FWQVRBUic7XG5jb25zdCBDVVNUT01fQ09MT1JfUkVNT1ZFRCA9ICdjb252ZXJzYXRpb25zL0NVU1RPTV9DT0xPUl9SRU1PVkVEJztcbmNvbnN0IENPTlZFUlNBVElPTl9TVE9QUEVEX0JZX01JU1NJTkdfVkVSSUZJQ0FUSU9OID1cbiAgJ2NvbnZlcnNhdGlvbnMvQ09OVkVSU0FUSU9OX1NUT1BQRURfQllfTUlTU0lOR19WRVJJRklDQVRJT04nO1xuY29uc3QgRElTQ0FSRF9NRVNTQUdFUyA9ICdjb252ZXJzYXRpb25zL0RJU0NBUkRfTUVTU0FHRVMnO1xuY29uc3QgUkVQTEFDRV9BVkFUQVJTID0gJ2NvbnZlcnNhdGlvbnMvUkVQTEFDRV9BVkFUQVJTJztcbmNvbnN0IFVQREFURV9VU0VSTkFNRV9TQVZFX1NUQVRFID0gJ2NvbnZlcnNhdGlvbnMvVVBEQVRFX1VTRVJOQU1FX1NBVkVfU1RBVEUnO1xuZXhwb3J0IGNvbnN0IFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VEID1cbiAgJ2NvbnZlcnNhdGlvbnMvU0VMRUNURURfQ09OVkVSU0FUSU9OX0NIQU5HRUQnO1xuXG5leHBvcnQgdHlwZSBDYW5jZWxWZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25BY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ0FOQ0VMX0NPTlZFUlNBVElPTl9QRU5ESU5HX1ZFUklGSUNBVElPTjtcbiAgcGF5bG9hZDoge1xuICAgIGNhbmNlbGVkQXQ6IG51bWJlcjtcbiAgfTtcbn07XG50eXBlIENsZWFyR3JvdXBDcmVhdGlvbkVycm9yQWN0aW9uVHlwZSA9IHsgdHlwZTogJ0NMRUFSX0dST1VQX0NSRUFUSU9OX0VSUk9SJyB9O1xudHlwZSBDbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ0NMRUFSX0lOVklURURfVVVJRFNfRk9SX05FV0xZX0NSRUFURURfR1JPVVAnO1xufTtcbnR5cGUgQ2xlYXJWZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25BY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ0xFQVJfQ09OVkVSU0FUSU9OU19QRU5ESU5HX1ZFUklGSUNBVElPTjtcbn07XG50eXBlIENsZWFyQ2FuY2VsbGVkVmVyaWZpY2F0aW9uQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIENMRUFSX0NBTkNFTExFRF9WRVJJRklDQVRJT047XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xufTtcbnR5cGUgQ2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXdBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ0xPU0VfQ09OVEFDVF9TUE9PRklOR19SRVZJRVcnO1xufTtcbnR5cGUgQ2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWxBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ0xPU0VfTUFYSU1VTV9HUk9VUF9TSVpFX01PREFMJztcbn07XG50eXBlIENsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDTE9TRV9SRUNPTU1FTkRFRF9HUk9VUF9TSVpFX01PREFMJztcbn07XG50eXBlIENvbG9yc0NoYW5nZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ09MT1JTX0NIQU5HRUQ7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25Db2xvcj86IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgICBjdXN0b21Db2xvckRhdGE/OiB7XG4gICAgICBpZDogc3RyaW5nO1xuICAgICAgdmFsdWU6IEN1c3RvbUNvbG9yVHlwZTtcbiAgICB9O1xuICB9O1xufTtcbnR5cGUgQ29sb3JTZWxlY3RlZFBheWxvYWRUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBjb252ZXJzYXRpb25Db2xvcj86IENvbnZlcnNhdGlvbkNvbG9yVHlwZTtcbiAgY3VzdG9tQ29sb3JEYXRhPzoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdmFsdWU6IEN1c3RvbUNvbG9yVHlwZTtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBDb2xvclNlbGVjdGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIENPTE9SX1NFTEVDVEVEO1xuICBwYXlsb2FkOiBDb2xvclNlbGVjdGVkUGF5bG9hZFR5cGU7XG59O1xudHlwZSBDb21wb3NlRGVsZXRlQXZhdGFyQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIENPTVBPU0VfUkVNT1ZFX0FWQVRBUjtcbiAgcGF5bG9hZDogQXZhdGFyRGF0YVR5cGU7XG59O1xudHlwZSBDb21wb3NlUmVwbGFjZUF2YXRhcnNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ09NUE9TRV9SRVBMQUNFX0FWQVRBUjtcbiAgcGF5bG9hZDoge1xuICAgIGN1cnI6IEF2YXRhckRhdGFUeXBlO1xuICAgIHByZXY/OiBBdmF0YXJEYXRhVHlwZTtcbiAgfTtcbn07XG50eXBlIENvbXBvc2VTYXZlQXZhdGFyQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIENPTVBPU0VfQUREX0FWQVRBUjtcbiAgcGF5bG9hZDogQXZhdGFyRGF0YVR5cGU7XG59O1xudHlwZSBDdXN0b21Db2xvclJlbW92ZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ1VTVE9NX0NPTE9SX1JFTU9WRUQ7XG4gIHBheWxvYWQ6IHtcbiAgICBjb2xvcklkOiBzdHJpbmc7XG4gIH07XG59O1xudHlwZSBEaXNjYXJkTWVzc2FnZXNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgRElTQ0FSRF9NRVNTQUdFUztcbiAgcGF5bG9hZDogUmVhZG9ubHk8XG4gICAgfCB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgICAgIG51bWJlclRvS2VlcEF0Qm90dG9tOiBudW1iZXI7XG4gICAgICB9XG4gICAgfCB7IGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7IG51bWJlclRvS2VlcEF0VG9wOiBudW1iZXIgfVxuICA+O1xufTtcbnR5cGUgU2V0UHJlSm9pbkNvbnZlcnNhdGlvbkFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRVRfUFJFX0pPSU5fQ09OVkVSU0FUSU9OJztcbiAgcGF5bG9hZDoge1xuICAgIGRhdGE6IFByZUpvaW5Db252ZXJzYXRpb25UeXBlIHwgdW5kZWZpbmVkO1xuICB9O1xufTtcblxudHlwZSBDb252ZXJzYXRpb25BZGRlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDT05WRVJTQVRJT05fQURERUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBkYXRhOiBDb252ZXJzYXRpb25UeXBlO1xuICB9O1xufTtcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ09OVkVSU0FUSU9OX0NIQU5HRUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBkYXRhOiBDb252ZXJzYXRpb25UeXBlO1xuICB9O1xufTtcbmV4cG9ydCB0eXBlIENvbnZlcnNhdGlvblJlbW92ZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ09OVkVSU0FUSU9OX1JFTU9WRUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25VbmxvYWRlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDT05WRVJTQVRJT05fVU5MT0FERUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgfTtcbn07XG50eXBlIENyZWF0ZUdyb3VwUGVuZGluZ0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDUkVBVEVfR1JPVVBfUEVORElORyc7XG59O1xudHlwZSBDcmVhdGVHcm91cEZ1bGZpbGxlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDUkVBVEVfR1JPVVBfRlVMRklMTEVEJztcbiAgcGF5bG9hZDoge1xuICAgIGludml0ZWRVdWlkczogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICB9O1xufTtcbnR5cGUgQ3JlYXRlR3JvdXBSZWplY3RlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdDUkVBVEVfR1JPVVBfUkVKRUNURUQnO1xufTtcbmV4cG9ydCB0eXBlIFJlbW92ZUFsbENvbnZlcnNhdGlvbnNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ09OVkVSU0FUSU9OU19SRU1PVkVfQUxMJztcbiAgcGF5bG9hZDogbnVsbDtcbn07XG5leHBvcnQgdHlwZSBNZXNzYWdlU2VsZWN0ZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnTUVTU0FHRV9TRUxFQ1RFRCc7XG4gIHBheWxvYWQ6IHtcbiAgICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xufTtcbnR5cGUgQ29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbkFjdGlvblR5cGUgPSB7XG4gIHR5cGU6IHR5cGVvZiBDT05WRVJTQVRJT05fU1RPUFBFRF9CWV9NSVNTSU5HX1ZFUklGSUNBVElPTjtcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgdW50cnVzdGVkVXVpZHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBNZXNzYWdlQ2hhbmdlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdNRVNTQUdFX0NIQU5HRUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIGRhdGE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBNZXNzYWdlRGVsZXRlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdNRVNTQUdFX0RFTEVURUQnO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xufTtcbmV4cG9ydCB0eXBlIE1lc3NhZ2VFeHBhbmRlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdNRVNTQUdFX0VYUEFOREVEJztcbiAgcGF5bG9hZDoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgZGlzcGxheUxpbWl0OiBudW1iZXI7XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBNZXNzYWdlc0FkZGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ01FU1NBR0VTX0FEREVEJztcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgaXNBY3RpdmU6IGJvb2xlYW47XG4gICAgaXNKdXN0U2VudDogYm9vbGVhbjtcbiAgICBpc05ld01lc3NhZ2U6IGJvb2xlYW47XG4gICAgbWVzc2FnZXM6IEFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT47XG4gIH07XG59O1xuXG5leHBvcnQgdHlwZSBSZXBhaXJOZXdlc3RNZXNzYWdlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1JFUEFJUl9ORVdFU1RfTUVTU0FHRSc7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xufTtcbmV4cG9ydCB0eXBlIFJlcGFpck9sZGVzdE1lc3NhZ2VBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnUkVQQUlSX09MREVTVF9NRVNTQUdFJztcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIH07XG59O1xuZXhwb3J0IHR5cGUgTWVzc2FnZXNSZXNldEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdNRVNTQUdFU19SRVNFVCc7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIG1lc3NhZ2VzOiBBcnJheTxNZXNzYWdlQXR0cmlidXRlc1R5cGU+O1xuICAgIG1ldHJpY3M6IE1lc3NhZ2VNZXRyaWNzVHlwZTtcbiAgICBzY3JvbGxUb01lc3NhZ2VJZD86IHN0cmluZztcbiAgICAvLyBUaGUgc2V0IG9mIHByb3ZpZGVkIG1lc3NhZ2VzIHNob3VsZCBiZSB0cnVzdGVkLCBldmVuIGlmIGl0IGNvbmZsaWN0cyB3aXRoIG1ldHJpY3MsXG4gICAgLy8gICBiZWNhdXNlIHdlIHdlcmVuJ3QgbG9va2luZyBmb3IgYSBzcGVjaWZpYyB0aW1lIHdpbmRvdyBvZiBtZXNzYWdlcyB3aXRoIG91ciBxdWVyeS5cbiAgICB1bmJvdW5kZWRGZXRjaDogYm9vbGVhbjtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBTZXRNZXNzYWdlTG9hZGluZ1N0YXRlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFVF9NRVNTQUdFX0xPQURJTkdfU1RBVEUnO1xuICBwYXlsb2FkOiB7XG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICBtZXNzYWdlTG9hZGluZ1N0YXRlOiB1bmRlZmluZWQgfCBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGU7XG4gIH07XG59O1xuZXhwb3J0IHR5cGUgU2V0SXNOZWFyQm90dG9tQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFVF9ORUFSX0JPVFRPTSc7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIGlzTmVhckJvdHRvbTogYm9vbGVhbjtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBTZXRDb252ZXJzYXRpb25IZWFkZXJUaXRsZUFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRVRfQ09OVkVSU0FUSU9OX0hFQURFUl9USVRMRSc7XG4gIHBheWxvYWQ6IHsgdGl0bGU/OiBzdHJpbmcgfTtcbn07XG5leHBvcnQgdHlwZSBTZXRTZWxlY3RlZENvbnZlcnNhdGlvblBhbmVsRGVwdGhBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU0VUX1NFTEVDVEVEX0NPTlZFUlNBVElPTl9QQU5FTF9ERVBUSCc7XG4gIHBheWxvYWQ6IHsgcGFuZWxEZXB0aDogbnVtYmVyIH07XG59O1xuZXhwb3J0IHR5cGUgU2Nyb2xsVG9NZXNzYWdlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NDUk9MTF9UT19NRVNTQUdFJztcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgbWVzc2FnZUlkOiBzdHJpbmc7XG4gIH07XG59O1xuZXhwb3J0IHR5cGUgQ2xlYXJTZWxlY3RlZE1lc3NhZ2VBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnQ0xFQVJfU0VMRUNURURfTUVTU0FHRSc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xuZXhwb3J0IHR5cGUgQ2xlYXJVbnJlYWRNZXRyaWNzQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ0NMRUFSX1VOUkVBRF9NRVRSSUNTJztcbiAgcGF5bG9hZDoge1xuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIH07XG59O1xuZXhwb3J0IHR5cGUgU2VsZWN0ZWRDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogdHlwZW9mIFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VEO1xuICBwYXlsb2FkOiB7XG4gICAgaWQ/OiBzdHJpbmc7XG4gICAgbWVzc2FnZUlkPzogc3RyaW5nO1xuICAgIHN3aXRjaFRvQXNzb2NpYXRlZFZpZXc/OiBib29sZWFuO1xuICB9O1xufTtcbnR5cGUgUmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1JFVklFV19HUk9VUF9NRU1CRVJfTkFNRV9DT0xMSVNJT04nO1xuICBwYXlsb2FkOiB7XG4gICAgZ3JvdXBDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9O1xufTtcbnR5cGUgUmV2aWV3TWVzc2FnZVJlcXVlc3ROYW1lQ29sbGlzaW9uQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1JFVklFV19NRVNTQUdFX1JFUVVFU1RfTkFNRV9DT0xMSVNJT04nO1xuICBwYXlsb2FkOiB7XG4gICAgc2FmZUNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIH07XG59O1xudHlwZSBTaG93SW5ib3hBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU0hPV19JTkJPWCc7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xuZXhwb3J0IHR5cGUgU2hvd0FyY2hpdmVkQ29udmVyc2F0aW9uc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTSE9XX0FSQ0hJVkVEX0NPTlZFUlNBVElPTlMnO1xuICBwYXlsb2FkOiBudWxsO1xufTtcbnR5cGUgU2V0Q29tcG9zZUdyb3VwQXZhdGFyQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFVF9DT01QT1NFX0dST1VQX0FWQVRBUic7XG4gIHBheWxvYWQ6IHsgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXkgfTtcbn07XG50eXBlIFNldENvbXBvc2VHcm91cE5hbWVBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU0VUX0NPTVBPU0VfR1JPVVBfTkFNRSc7XG4gIHBheWxvYWQ6IHsgZ3JvdXBOYW1lOiBzdHJpbmcgfTtcbn07XG50eXBlIFNldENvbXBvc2VHcm91cEV4cGlyZVRpbWVyQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1NFVF9DT01QT1NFX0dST1VQX0VYUElSRV9USU1FUic7XG4gIHBheWxvYWQ6IHsgZ3JvdXBFeHBpcmVUaW1lcjogbnVtYmVyIH07XG59O1xudHlwZSBTZXRDb21wb3NlU2VhcmNoVGVybUFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRVRfQ09NUE9TRV9TRUFSQ0hfVEVSTSc7XG4gIHBheWxvYWQ6IHsgc2VhcmNoVGVybTogc3RyaW5nIH07XG59O1xudHlwZSBTZXRJc0ZldGNoaW5nVVVJREFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTRVRfSVNfRkVUQ0hJTkdfVVVJRCc7XG4gIHBheWxvYWQ6IHtcbiAgICBpZGVudGlmaWVyOiBVVUlERmV0Y2hTdGF0ZUtleVR5cGU7XG4gICAgaXNGZXRjaGluZzogYm9vbGVhbjtcbiAgfTtcbn07XG50eXBlIFNldFJlY2VudE1lZGlhSXRlbXNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU0VUX1JFQ0VOVF9NRURJQV9JVEVNUyc7XG4gIHBheWxvYWQ6IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHJlY2VudE1lZGlhSXRlbXM6IEFycmF5PE1lZGlhSXRlbVR5cGU+O1xuICB9O1xufTtcbnR5cGUgVG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXJBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgQ09NUE9TRV9UT0dHTEVfRURJVElOR19BVkFUQVI7XG59O1xudHlwZSBTdGFydENvbXBvc2luZ0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTVEFSVF9DT01QT1NJTkcnO1xufTtcbnR5cGUgU2hvd0Nob29zZUdyb3VwTWVtYmVyc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdTSE9XX0NIT09TRV9HUk9VUF9NRU1CRVJTJztcbn07XG50eXBlIFN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGFBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnU1RBUlRfU0VUVElOR19HUk9VUF9NRVRBREFUQSc7XG59O1xuZXhwb3J0IHR5cGUgVG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ1RPR0dMRV9DT05WRVJTQVRJT05fSU5fQ0hPT1NFX01FTUJFUlMnO1xuICBwYXlsb2FkOiB7XG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICBtYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZTogbnVtYmVyO1xuICAgIG1heEdyb3VwU2l6ZTogbnVtYmVyO1xuICB9O1xufTtcbnR5cGUgVXBkYXRlVXNlcm5hbWVTYXZlU3RhdGVBY3Rpb25UeXBlID0ge1xuICB0eXBlOiB0eXBlb2YgVVBEQVRFX1VTRVJOQU1FX1NBVkVfU1RBVEU7XG4gIHBheWxvYWQ6IHtcbiAgICBuZXdTYXZlU3RhdGU6IFVzZXJuYW1lU2F2ZVN0YXRlO1xuICB9O1xufTtcblxudHlwZSBSZXBsYWNlQXZhdGFyc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6IHR5cGVvZiBSRVBMQUNFX0FWQVRBUlM7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIGF2YXRhcnM6IEFycmF5PEF2YXRhckRhdGFUeXBlPjtcbiAgfTtcbn07XG5leHBvcnQgdHlwZSBDb252ZXJzYXRpb25BY3Rpb25UeXBlID1cbiAgfCBDYW5jZWxWZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25BY3Rpb25UeXBlXG4gIHwgQ2xlYXJDYW5jZWxsZWRWZXJpZmljYXRpb25BY3Rpb25UeXBlXG4gIHwgQ2xlYXJWZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25BY3Rpb25UeXBlXG4gIHwgQ2xlYXJHcm91cENyZWF0aW9uRXJyb3JBY3Rpb25UeXBlXG4gIHwgQ2xlYXJJbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cEFjdGlvblR5cGVcbiAgfCBDbGVhclNlbGVjdGVkTWVzc2FnZUFjdGlvblR5cGVcbiAgfCBDbGVhclVucmVhZE1ldHJpY3NBY3Rpb25UeXBlXG4gIHwgQ2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXdBY3Rpb25UeXBlXG4gIHwgQ2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWxBY3Rpb25UeXBlXG4gIHwgQ2xvc2VSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsQWN0aW9uVHlwZVxuICB8IENvbG9yU2VsZWN0ZWRBY3Rpb25UeXBlXG4gIHwgQ29sb3JzQ2hhbmdlZEFjdGlvblR5cGVcbiAgfCBDb21wb3NlRGVsZXRlQXZhdGFyQWN0aW9uVHlwZVxuICB8IENvbXBvc2VSZXBsYWNlQXZhdGFyc0FjdGlvblR5cGVcbiAgfCBDb21wb3NlU2F2ZUF2YXRhckFjdGlvblR5cGVcbiAgfCBDb252ZXJzYXRpb25BZGRlZEFjdGlvblR5cGVcbiAgfCBDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZVxuICB8IENvbnZlcnNhdGlvblJlbW92ZWRBY3Rpb25UeXBlXG4gIHwgQ29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbkFjdGlvblR5cGVcbiAgfCBDb252ZXJzYXRpb25VbmxvYWRlZEFjdGlvblR5cGVcbiAgfCBDcmVhdGVHcm91cEZ1bGZpbGxlZEFjdGlvblR5cGVcbiAgfCBDcmVhdGVHcm91cFBlbmRpbmdBY3Rpb25UeXBlXG4gIHwgQ3JlYXRlR3JvdXBSZWplY3RlZEFjdGlvblR5cGVcbiAgfCBDdXN0b21Db2xvclJlbW92ZWRBY3Rpb25UeXBlXG4gIHwgRGlzY2FyZE1lc3NhZ2VzQWN0aW9uVHlwZVxuICB8IE1lc3NhZ2VDaGFuZ2VkQWN0aW9uVHlwZVxuICB8IE1lc3NhZ2VEZWxldGVkQWN0aW9uVHlwZVxuICB8IE1lc3NhZ2VFeHBhbmRlZEFjdGlvblR5cGVcbiAgfCBNZXNzYWdlU2VsZWN0ZWRBY3Rpb25UeXBlXG4gIHwgTWVzc2FnZXNBZGRlZEFjdGlvblR5cGVcbiAgfCBNZXNzYWdlc1Jlc2V0QWN0aW9uVHlwZVxuICB8IFJlbW92ZUFsbENvbnZlcnNhdGlvbnNBY3Rpb25UeXBlXG4gIHwgUmVwYWlyTmV3ZXN0TWVzc2FnZUFjdGlvblR5cGVcbiAgfCBSZXBhaXJPbGRlc3RNZXNzYWdlQWN0aW9uVHlwZVxuICB8IFJlcGxhY2VBdmF0YXJzQWN0aW9uVHlwZVxuICB8IFJldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbkFjdGlvblR5cGVcbiAgfCBSZXZpZXdNZXNzYWdlUmVxdWVzdE5hbWVDb2xsaXNpb25BY3Rpb25UeXBlXG4gIHwgU2Nyb2xsVG9NZXNzYWdlQWN0aW9uVHlwZVxuICB8IFNlbGVjdGVkQ29udmVyc2F0aW9uQ2hhbmdlZEFjdGlvblR5cGVcbiAgfCBTZXRDb21wb3NlR3JvdXBBdmF0YXJBY3Rpb25UeXBlXG4gIHwgU2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXJBY3Rpb25UeXBlXG4gIHwgU2V0Q29tcG9zZUdyb3VwTmFtZUFjdGlvblR5cGVcbiAgfCBTZXRDb21wb3NlU2VhcmNoVGVybUFjdGlvblR5cGVcbiAgfCBTZXRDb252ZXJzYXRpb25IZWFkZXJUaXRsZUFjdGlvblR5cGVcbiAgfCBTZXRJc0ZldGNoaW5nVVVJREFjdGlvblR5cGVcbiAgfCBTZXRJc05lYXJCb3R0b21BY3Rpb25UeXBlXG4gIHwgU2V0TWVzc2FnZUxvYWRpbmdTdGF0ZUFjdGlvblR5cGVcbiAgfCBTZXRQcmVKb2luQ29udmVyc2F0aW9uQWN0aW9uVHlwZVxuICB8IFNldFJlY2VudE1lZGlhSXRlbXNBY3Rpb25UeXBlXG4gIHwgU2V0U2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoQWN0aW9uVHlwZVxuICB8IFNob3dBcmNoaXZlZENvbnZlcnNhdGlvbnNBY3Rpb25UeXBlXG4gIHwgU2hvd0Nob29zZUdyb3VwTWVtYmVyc0FjdGlvblR5cGVcbiAgfCBTaG93SW5ib3hBY3Rpb25UeXBlXG4gIHwgU3RhcnRDb21wb3NpbmdBY3Rpb25UeXBlXG4gIHwgU3RhcnRTZXR0aW5nR3JvdXBNZXRhZGF0YUFjdGlvblR5cGVcbiAgfCBUb2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnNBY3Rpb25UeXBlXG4gIHwgVG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXJBY3Rpb25UeXBlXG4gIHwgVXBkYXRlVXNlcm5hbWVTYXZlU3RhdGVBY3Rpb25UeXBlO1xuXG4vLyBBY3Rpb24gQ3JlYXRvcnNcblxuZXhwb3J0IGNvbnN0IGFjdGlvbnMgPSB7XG4gIGNhbmNlbENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbixcbiAgY2hhbmdlSGFzR3JvdXBMaW5rLFxuICBjbGVhckNhbmNlbGxlZENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbixcbiAgY2xlYXJHcm91cENyZWF0aW9uRXJyb3IsXG4gIGNsZWFySW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXAsXG4gIGNsZWFyU2VsZWN0ZWRNZXNzYWdlLFxuICBjbGVhclVucmVhZE1ldHJpY3MsXG4gIGNsZWFyVXNlcm5hbWVTYXZlLFxuICBjbG9zZUNvbnRhY3RTcG9vZmluZ1JldmlldyxcbiAgY2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWwsXG4gIGNsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbCxcbiAgY29sb3JTZWxlY3RlZCxcbiAgY29tcG9zZURlbGV0ZUF2YXRhckZyb21EaXNrLFxuICBjb21wb3NlUmVwbGFjZUF2YXRhcixcbiAgY29tcG9zZVNhdmVBdmF0YXJUb0Rpc2ssXG4gIGNvbnZlcnNhdGlvbkFkZGVkLFxuICBjb252ZXJzYXRpb25DaGFuZ2VkLFxuICBjb252ZXJzYXRpb25SZW1vdmVkLFxuICBjb252ZXJzYXRpb25TdG9wcGVkQnlNaXNzaW5nVmVyaWZpY2F0aW9uLFxuICBjb252ZXJzYXRpb25VbmxvYWRlZCxcbiAgY3JlYXRlR3JvdXAsXG4gIGRlbGV0ZUF2YXRhckZyb21EaXNrLFxuICBkaXNjYXJkTWVzc2FnZXMsXG4gIGRvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlLFxuICBnZW5lcmF0ZU5ld0dyb3VwTGluayxcbiAgbWVzc2FnZUNoYW5nZWQsXG4gIG1lc3NhZ2VEZWxldGVkLFxuICBtZXNzYWdlRXhwYW5kZWQsXG4gIG1lc3NhZ2VzQWRkZWQsXG4gIG1lc3NhZ2VzUmVzZXQsXG4gIG15UHJvZmlsZUNoYW5nZWQsXG4gIHJlbW92ZUFsbENvbnZlcnNhdGlvbnMsXG4gIHJlbW92ZUN1c3RvbUNvbG9yT25Db252ZXJzYXRpb25zLFxuICByZW1vdmVNZW1iZXJGcm9tR3JvdXAsXG4gIHJlcGFpck5ld2VzdE1lc3NhZ2UsXG4gIHJlcGFpck9sZGVzdE1lc3NhZ2UsXG4gIHJlcGxhY2VBdmF0YXIsXG4gIHJlc2V0QWxsQ2hhdENvbG9ycyxcbiAgcmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uLFxuICByZXZpZXdNZXNzYWdlUmVxdWVzdE5hbWVDb2xsaXNpb24sXG4gIHNhdmVBdmF0YXJUb0Rpc2ssXG4gIHNhdmVVc2VybmFtZSxcbiAgc2Nyb2xsVG9NZXNzYWdlLFxuICBzZWxlY3RNZXNzYWdlLFxuICBzZXRBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmtTZXR0aW5nLFxuICBzZXRDb21wb3NlR3JvdXBBdmF0YXIsXG4gIHNldENvbXBvc2VHcm91cEV4cGlyZVRpbWVyLFxuICBzZXRDb21wb3NlR3JvdXBOYW1lLFxuICBzZXRDb21wb3NlU2VhcmNoVGVybSxcbiAgc2V0SXNGZXRjaGluZ1VVSUQsXG4gIHNldElzTmVhckJvdHRvbSxcbiAgc2V0TWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgc2V0UHJlSm9pbkNvbnZlcnNhdGlvbixcbiAgc2V0UmVjZW50TWVkaWFJdGVtcyxcbiAgc2V0U2VsZWN0ZWRDb252ZXJzYXRpb25IZWFkZXJUaXRsZSxcbiAgc2V0U2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoLFxuICBzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzLFxuICBzaG93SW5ib3gsXG4gIHNob3dDb252ZXJzYXRpb24sXG4gIHN0YXJ0Q29tcG9zaW5nLFxuICBzdGFydFNldHRpbmdHcm91cE1ldGFkYXRhLFxuICB0b2dnbGVBZG1pbixcbiAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzLFxuICB0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcixcbiAgdG9nZ2xlSGlkZVN0b3JpZXMsXG4gIHVwZGF0ZUNvbnZlcnNhdGlvbk1vZGVsU2hhcmVkR3JvdXBzLFxuICB2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kLFxufTtcblxuZXhwb3J0IGNvbnN0IHVzZUNvbnZlcnNhdGlvbnNBY3Rpb25zID0gKCk6IHR5cGVvZiBhY3Rpb25zID0+XG4gIHVzZUJvdW5kQWN0aW9ucyhhY3Rpb25zKTtcblxuZnVuY3Rpb24gZmlsdGVyQXZhdGFyRGF0YShcbiAgYXZhdGFyczogUmVhZG9ubHlBcnJheTxBdmF0YXJEYXRhVHlwZT4sXG4gIGRhdGE6IEF2YXRhckRhdGFUeXBlXG4pOiBBcnJheTxBdmF0YXJEYXRhVHlwZT4ge1xuICByZXR1cm4gYXZhdGFycy5maWx0ZXIoYXZhdGFyRGF0YSA9PiAhaXNTYW1lQXZhdGFyRGF0YShkYXRhLCBhdmF0YXJEYXRhKSk7XG59XG5cbmZ1bmN0aW9uIGdldE5leHRBdmF0YXJJZChhdmF0YXJzOiBBcnJheTxBdmF0YXJEYXRhVHlwZT4pOiBudW1iZXIge1xuICByZXR1cm4gTWF0aC5tYXgoLi4uYXZhdGFycy5tYXAoeCA9PiBOdW1iZXIoeC5pZCkpKSArIDE7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldEF2YXRhcnNBbmRVcGRhdGVDb252ZXJzYXRpb24oXG4gIGNvbnZlcnNhdGlvbnM6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGdldE5leHRBdmF0YXJzRGF0YTogKFxuICAgIGF2YXRhcnM6IEFycmF5PEF2YXRhckRhdGFUeXBlPixcbiAgICBuZXh0SWQ6IG51bWJlclxuICApID0+IEFycmF5PEF2YXRhckRhdGFUeXBlPlxuKTogUHJvbWlzZTxBcnJheTxBdmF0YXJEYXRhVHlwZT4+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGNvbnZlcnNhdGlvbiBmb3VuZCcpO1xuICB9XG5cbiAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IGNvbnZlcnNhdGlvbnM7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbkF0dHJzID0gY29udmVyc2F0aW9uTG9va3VwW2NvbnZlcnNhdGlvbklkXTtcbiAgY29uc3QgYXZhdGFycyA9XG4gICAgY29udmVyc2F0aW9uQXR0cnMuYXZhdGFycyB8fCBnZXRBdmF0YXJEYXRhKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICBjb25zdCBuZXh0QXZhdGFySWQgPSBnZXROZXh0QXZhdGFySWQoYXZhdGFycyk7XG4gIGNvbnN0IG5leHRBdmF0YXJzID0gZ2V0TmV4dEF2YXRhcnNEYXRhKGF2YXRhcnMsIG5leHRBdmF0YXJJZCk7XG4gIC8vIFdlIGRvbid0IHNhdmUgYnVmZmVycyB0byB0aGUgZGIsIGJ1dCB3ZSBkZWZpbml0ZWx5IHdhbnQgaXQgaW4tbWVtb3J5IHNvXG4gIC8vIHdlIGRvbid0IGhhdmUgdG8gcmUtZ2VuZXJhdGUgdGhlbS5cbiAgLy9cbiAgLy8gTXV0YXRpbmcgaGVyZSBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdG8gdHJpZ2dlciBhIG1vZGVsIGNoYW5nZVxuICAvLyBiZWNhdXNlIHdlJ3JlIHVwZGF0aW5nIHJlZHV4IGhlcmUgbWFudWFsbHkgb3Vyc2VsdmVzLiBBdSByZXZvaXIgQmFja2JvbmUhXG4gIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmF2YXRhcnMgPSBuZXh0QXZhdGFycy5tYXAoYXZhdGFyRGF0YSA9PlxuICAgIG9taXQoYXZhdGFyRGF0YSwgWydidWZmZXInXSlcbiAgKTtcbiAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG5cbiAgcmV0dXJuIG5leHRBdmF0YXJzO1xufVxuXG5mdW5jdGlvbiBkZWxldGVBdmF0YXJGcm9tRGlzayhcbiAgYXZhdGFyRGF0YTogQXZhdGFyRGF0YVR5cGUsXG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBSZXBsYWNlQXZhdGFyc0FjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBpZiAoYXZhdGFyRGF0YS5pbWFnZVBhdGgpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdmF0YXIoYXZhdGFyRGF0YS5pbWFnZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ05vIGltYWdlUGF0aCBmb3IgYXZhdGFyRGF0YS4gUmVtb3ZpbmcgZnJvbSB1c2VyQXZhdGFyRGF0YSwgYnV0IG5vdCBkaXNrJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBzdHJpY3RBc3NlcnQoY29udmVyc2F0aW9uSWQsICdjb252ZXJzYXRpb25JZCBub3QgcHJvdmlkZWQnKTtcblxuICAgIGNvbnN0IGF2YXRhcnMgPSBhd2FpdCBnZXRBdmF0YXJzQW5kVXBkYXRlQ29udmVyc2F0aW9uKFxuICAgICAgZ2V0U3RhdGUoKS5jb252ZXJzYXRpb25zLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBwcmV2QXZhdGFyc0RhdGEgPT4gZmlsdGVyQXZhdGFyRGF0YShwcmV2QXZhdGFyc0RhdGEsIGF2YXRhckRhdGEpXG4gICAgKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFJFUExBQ0VfQVZBVEFSUyxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGF2YXRhcnMsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VIYXNHcm91cExpbmsoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHZhbHVlOiBib29sZWFuXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBOb29wQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29udmVyc2F0aW9uIGZvdW5kJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICBuYW1lOiAndG9nZ2xlR3JvdXBMaW5rJyxcbiAgICAgIGlkRm9yTG9nZ2luZzogY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpLFxuICAgICAgdGFzazogYXN5bmMgKCkgPT4gY29udmVyc2F0aW9uLnRvZ2dsZUdyb3VwTGluayh2YWx1ZSksXG4gICAgfSk7XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ05PT1AnLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ2VuZXJhdGVOZXdHcm91cExpbmsoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIE5vb3BBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdObyBjb252ZXJzYXRpb24gZm91bmQnKTtcbiAgICB9XG5cbiAgICBhd2FpdCBsb25nUnVubmluZ1Rhc2tXcmFwcGVyKHtcbiAgICAgIG5hbWU6ICdyZWZyZXNoR3JvdXBMaW5rJyxcbiAgICAgIGlkRm9yTG9nZ2luZzogY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpLFxuICAgICAgdGFzazogYXN5bmMgKCkgPT4gY29udmVyc2F0aW9uLnJlZnJlc2hHcm91cExpbmsoKSxcbiAgICB9KTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdOT09QJyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldEFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGlua1NldHRpbmcoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIHZhbHVlOiBib29sZWFuXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBOb29wQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gY29udmVyc2F0aW9uIGZvdW5kJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgbG9uZ1J1bm5pbmdUYXNrV3JhcHBlcih7XG4gICAgICBpZEZvckxvZ2dpbmc6IGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKSxcbiAgICAgIG5hbWU6ICd1cGRhdGVBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmsnLFxuICAgICAgdGFzazogYXN5bmMgKCkgPT5cbiAgICAgICAgY29udmVyc2F0aW9uLnVwZGF0ZUFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGluayh2YWx1ZSksXG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnTk9PUCcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBkaXNjYXJkTWVzc2FnZXMoXG4gIHBheWxvYWQ6IFJlYWRvbmx5PERpc2NhcmRNZXNzYWdlc0FjdGlvblR5cGVbJ3BheWxvYWQnXT5cbik6IERpc2NhcmRNZXNzYWdlc0FjdGlvblR5cGUge1xuICByZXR1cm4geyB0eXBlOiBESVNDQVJEX01FU1NBR0VTLCBwYXlsb2FkIH07XG59XG5cbmZ1bmN0aW9uIHJlcGxhY2VBdmF0YXIoXG4gIGN1cnI6IEF2YXRhckRhdGFUeXBlLFxuICBwcmV2PzogQXZhdGFyRGF0YVR5cGUsXG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBSZXBsYWNlQXZhdGFyc0FjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBzdHJpY3RBc3NlcnQoY29udmVyc2F0aW9uSWQsICdjb252ZXJzYXRpb25JZCBub3QgcHJvdmlkZWQnKTtcblxuICAgIGNvbnN0IGF2YXRhcnMgPSBhd2FpdCBnZXRBdmF0YXJzQW5kVXBkYXRlQ29udmVyc2F0aW9uKFxuICAgICAgZ2V0U3RhdGUoKS5jb252ZXJzYXRpb25zLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAocHJldkF2YXRhcnNEYXRhLCBuZXh0SWQpID0+IHtcbiAgICAgICAgY29uc3QgbmV3QXZhdGFyRGF0YSA9IHtcbiAgICAgICAgICAuLi5jdXJyLFxuICAgICAgICAgIGlkOiBwcmV2Py5pZCA/PyBuZXh0SWQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nQXZhdGFyc0RhdGEgPSBwcmV2XG4gICAgICAgICAgPyBmaWx0ZXJBdmF0YXJEYXRhKHByZXZBdmF0YXJzRGF0YSwgcHJldilcbiAgICAgICAgICA6IHByZXZBdmF0YXJzRGF0YTtcblxuICAgICAgICByZXR1cm4gW25ld0F2YXRhckRhdGEsIC4uLmV4aXN0aW5nQXZhdGFyc0RhdGFdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRVBMQUNFX0FWQVRBUlMsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBhdmF0YXJzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2F2ZUF2YXRhclRvRGlzayhcbiAgYXZhdGFyRGF0YTogQXZhdGFyRGF0YVR5cGUsXG4gIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBSZXBsYWNlQXZhdGFyc0FjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBpZiAoIWF2YXRhckRhdGEuYnVmZmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGF2YXRhciBVaW50OEFycmF5IHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgc3RyaWN0QXNzZXJ0KGNvbnZlcnNhdGlvbklkLCAnY29udmVyc2F0aW9uSWQgbm90IHByb3ZpZGVkJyk7XG5cbiAgICBjb25zdCBpbWFnZVBhdGggPSBhd2FpdCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdBdmF0YXJEYXRhKFxuICAgICAgYXZhdGFyRGF0YS5idWZmZXJcbiAgICApO1xuXG4gICAgY29uc3QgYXZhdGFycyA9IGF3YWl0IGdldEF2YXRhcnNBbmRVcGRhdGVDb252ZXJzYXRpb24oXG4gICAgICBnZXRTdGF0ZSgpLmNvbnZlcnNhdGlvbnMsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIChwcmV2QXZhdGFyc0RhdGEsIGlkKSA9PiB7XG4gICAgICAgIGNvbnN0IG5ld0F2YXRhckRhdGEgPSB7XG4gICAgICAgICAgLi4uYXZhdGFyRGF0YSxcbiAgICAgICAgICBpbWFnZVBhdGgsXG4gICAgICAgICAgaWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgcmV0dXJuIFtuZXdBdmF0YXJEYXRhLCAuLi5wcmV2QXZhdGFyc0RhdGFdO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBSRVBMQUNFX0FWQVRBUlMsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBhdmF0YXJzLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWFrZVVzZXJuYW1lU2F2ZVR5cGUoXG4gIG5ld1NhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGVcbik6IFVwZGF0ZVVzZXJuYW1lU2F2ZVN0YXRlQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVVBEQVRFX1VTRVJOQU1FX1NBVkVfU1RBVEUsXG4gICAgcGF5bG9hZDoge1xuICAgICAgbmV3U2F2ZVN0YXRlLFxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNsZWFyVXNlcm5hbWVTYXZlKCk6IFVwZGF0ZVVzZXJuYW1lU2F2ZVN0YXRlQWN0aW9uVHlwZSB7XG4gIHJldHVybiBtYWtlVXNlcm5hbWVTYXZlVHlwZShVc2VybmFtZVNhdmVTdGF0ZS5Ob25lKTtcbn1cblxuZnVuY3Rpb24gc2F2ZVVzZXJuYW1lKHtcbiAgdXNlcm5hbWUsXG4gIHByZXZpb3VzVXNlcm5hbWUsXG59OiB7XG4gIHVzZXJuYW1lOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHByZXZpb3VzVXNlcm5hbWU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbn0pOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgVXBkYXRlVXNlcm5hbWVTYXZlU3RhdGVBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG5cbiAgICBjb25zdCBwcmV2aW91c1N0YXRlID0gZ2V0VXNlcm5hbWVTYXZlU3RhdGUoc3RhdGUpO1xuICAgIGlmIChwcmV2aW91c1N0YXRlICE9PSBVc2VybmFtZVNhdmVTdGF0ZS5Ob25lKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBzYXZlVXNlcm5hbWU6IFNhdmUgcmVxdWVzdGVkLCBidXQgcHJldmlvdXMgc3RhdGUgd2FzICR7cHJldmlvdXNTdGF0ZX1gXG4gICAgICApO1xuICAgICAgZGlzcGF0Y2gobWFrZVVzZXJuYW1lU2F2ZVR5cGUoVXNlcm5hbWVTYXZlU3RhdGUuR2VuZXJhbEVycm9yKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGRpc3BhdGNoKG1ha2VVc2VybmFtZVNhdmVUeXBlKFVzZXJuYW1lU2F2ZVN0YXRlLlNhdmluZykpO1xuICAgICAgYXdhaXQgd3JpdGVVc2VybmFtZSh7IHVzZXJuYW1lLCBwcmV2aW91c1VzZXJuYW1lIH0pO1xuXG4gICAgICAvLyB3cml0ZVVzZXJuYW1lIGFib3ZlIHVwZGF0ZXMgdGhlIGJhY2tib25lIG1vZGVsIHdoaWNoIGluIHR1cm4gdXBkYXRlc1xuICAgICAgLy8gcmVkdXggdGhyb3VnaCBpdCdzIG9uOmNoYW5nZSBldmVudCBsaXN0ZW5lci4gT25jZSB3ZSBsb3NlIEJhY2tib25lXG4gICAgICAvLyB3ZSdsbCBuZWVkIHRvIG1hbnVhbGx5IHN5bmMgdGhlc2UgbmV3IGNoYW5nZXMuXG4gICAgICBkaXNwYXRjaChtYWtlVXNlcm5hbWVTYXZlVHlwZShVc2VybmFtZVNhdmVTdGF0ZS5TdWNjZXNzKSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIC8vIENoZWNrIHRvIHNlZSBpZiB3ZSB3ZXJlIGRlbGV0aW5nXG4gICAgICBpZiAoIXVzZXJuYW1lKSB7XG4gICAgICAgIGRpc3BhdGNoKG1ha2VVc2VybmFtZVNhdmVUeXBlKFVzZXJuYW1lU2F2ZVN0YXRlLkRlbGV0ZUZhaWxlZCkpO1xuICAgICAgICBzaG93VG9hc3QoVG9hc3RGYWlsZWRUb0RlbGV0ZVVzZXJuYW1lKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzUmVjb3JkKGVycm9yKSkge1xuICAgICAgICBkaXNwYXRjaChtYWtlVXNlcm5hbWVTYXZlVHlwZShVc2VybmFtZVNhdmVTdGF0ZS5HZW5lcmFsRXJyb3IpKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDA5KSB7XG4gICAgICAgIGRpc3BhdGNoKG1ha2VVc2VybmFtZVNhdmVUeXBlKFVzZXJuYW1lU2F2ZVN0YXRlLlVzZXJuYW1lVGFrZW5FcnJvcikpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDAwKSB7XG4gICAgICAgIGRpc3BhdGNoKFxuICAgICAgICAgIG1ha2VVc2VybmFtZVNhdmVUeXBlKFVzZXJuYW1lU2F2ZVN0YXRlLlVzZXJuYW1lTWFsZm9ybWVkRXJyb3IpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgZGlzcGF0Y2gobWFrZVVzZXJuYW1lU2F2ZVR5cGUoVXNlcm5hbWVTYXZlU3RhdGUuR2VuZXJhbEVycm9yKSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBteVByb2ZpbGVDaGFuZ2VkKFxuICBwcm9maWxlRGF0YTogUHJvZmlsZURhdGFUeXBlLFxuICBhdmF0YXI6IEF2YXRhclVwZGF0ZVR5cGVcbik6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBOb29wQWN0aW9uVHlwZSB8IFRvZ2dsZVByb2ZpbGVFZGl0b3JFcnJvckFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldE1lKGdldFN0YXRlKCkpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHdyaXRlUHJvZmlsZShcbiAgICAgICAge1xuICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbixcbiAgICAgICAgICAuLi5wcm9maWxlRGF0YSxcbiAgICAgICAgfSxcbiAgICAgICAgYXZhdGFyXG4gICAgICApO1xuXG4gICAgICAvLyB3cml0ZVByb2ZpbGUgYWJvdmUgdXBkYXRlcyB0aGUgYmFja2JvbmUgbW9kZWwgd2hpY2ggaW4gdHVybiB1cGRhdGVzXG4gICAgICAvLyByZWR1eCB0aHJvdWdoIGl0J3Mgb246Y2hhbmdlIGV2ZW50IGxpc3RlbmVyLiBPbmNlIHdlIGxvc2UgQmFja2JvbmVcbiAgICAgIC8vIHdlJ2xsIG5lZWQgdG8gbWFudWFsbHkgc3luYyB0aGVzZSBuZXcgY2hhbmdlcy5cbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogJ05PT1AnLFxuICAgICAgICBwYXlsb2FkOiBudWxsLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoJ215UHJvZmlsZUNoYW5nZWQnLCBlcnIgJiYgZXJyLnN0YWNrID8gZXJyLnN0YWNrIDogZXJyKTtcbiAgICAgIGRpc3BhdGNoKHsgdHlwZTogVE9HR0xFX1BST0ZJTEVfRURJVE9SX0VSUk9SIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQ3VzdG9tQ29sb3JPbkNvbnZlcnNhdGlvbnMoXG4gIGNvbG9ySWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgQ3VzdG9tQ29sb3JSZW1vdmVkQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgZGlzcGF0Y2ggPT4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbnNUb1VwZGF0ZTogQXJyYXk8Q29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU+ID0gW107XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGEgbW9kZWwgY2hhbmdlIGJlY2F1c2Ugd2UncmUgdXBkYXRpbmcgcmVkdXhcbiAgICAvLyBoZXJlIG1hbnVhbGx5IG91cnNlbHZlcy4gQXUgcmV2b2lyIEJhY2tib25lIVxuICAgIHdpbmRvdy5nZXRDb252ZXJzYXRpb25zKCkuZm9yRWFjaChjb252ZXJzYXRpb24gPT4ge1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ2N1c3RvbUNvbG9ySWQnKSA9PT0gY29sb3JJZCkge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZGVsZXRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmNvbnZlcnNhdGlvbkNvbG9yO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZGVsZXRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmN1c3RvbUNvbG9yO1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgICAgZGVsZXRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmN1c3RvbUNvbG9ySWQ7XG5cbiAgICAgICAgY29udmVyc2F0aW9uc1RvVXBkYXRlLnB1c2goY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaWYgKGNvbnZlcnNhdGlvbnNUb1VwZGF0ZS5sZW5ndGgpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb25zKGNvbnZlcnNhdGlvbnNUb1VwZGF0ZSk7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQ1VTVE9NX0NPTE9SX1JFTU9WRUQsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGNvbG9ySWQsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZXNldEFsbENoYXRDb2xvcnMoKTogVGh1bmtBY3Rpb248XG4gIHZvaWQsXG4gIFJvb3RTdGF0ZVR5cGUsXG4gIHVua25vd24sXG4gIENvbG9yc0NoYW5nZWRBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICAvLyBDYWxsaW5nIHRoaXMgd2l0aCBubyBhcmdzIHVuc2V0cyBhbGwgdGhlIGNvbG9ycyBpbiB0aGUgZGJcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQWxsQ29udmVyc2F0aW9uQ29sb3JzKCk7XG5cbiAgICAvLyBXZSBkb24ndCB3YW50IHRvIHRyaWdnZXIgYSBtb2RlbCBjaGFuZ2UgYmVjYXVzZSB3ZSdyZSB1cGRhdGluZyByZWR1eFxuICAgIC8vIGhlcmUgbWFudWFsbHkgb3Vyc2VsdmVzLiBBdSByZXZvaXIgQmFja2JvbmUhXG4gICAgd2luZG93LmdldENvbnZlcnNhdGlvbnMoKS5mb3JFYWNoKGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIGRlbGV0ZSBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5jb252ZXJzYXRpb25Db2xvcjtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgZGVsZXRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmN1c3RvbUNvbG9yO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBkZWxldGUgY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMuY3VzdG9tQ29sb3JJZDtcbiAgICB9KTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IENPTE9SU19DSEFOR0VELFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjb252ZXJzYXRpb25Db2xvcjogdW5kZWZpbmVkLFxuICAgICAgICBjdXN0b21Db2xvckRhdGE6IHVuZGVmaW5lZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIGNvbG9yU2VsZWN0ZWQoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgY29udmVyc2F0aW9uQ29sb3IsXG4gIGN1c3RvbUNvbG9yRGF0YSxcbn06IENvbG9yU2VsZWN0ZWRQYXlsb2FkVHlwZSk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBDb2xvclNlbGVjdGVkQWN0aW9uVHlwZVxuPiB7XG4gIHJldHVybiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byB0cmlnZ2VyIGEgbW9kZWwgY2hhbmdlIGJlY2F1c2Ugd2UncmUgdXBkYXRpbmcgcmVkdXhcbiAgICAvLyBoZXJlIG1hbnVhbGx5IG91cnNlbHZlcy4gQXUgcmV2b2lyIEJhY2tib25lIVxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKGNvbnZlcnNhdGlvbikge1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbkNvbG9yKSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmNvbnZlcnNhdGlvbkNvbG9yID0gY29udmVyc2F0aW9uQ29sb3I7XG4gICAgICAgIGlmIChjdXN0b21Db2xvckRhdGEpIHtcbiAgICAgICAgICBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5jdXN0b21Db2xvciA9IGN1c3RvbUNvbG9yRGF0YS52YWx1ZTtcbiAgICAgICAgICBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5jdXN0b21Db2xvcklkID0gY3VzdG9tQ29sb3JEYXRhLmlkO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRlbGV0ZSBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5jdXN0b21Db2xvcjtcbiAgICAgICAgICBkZWxldGUgY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMuY3VzdG9tQ29sb3JJZDtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgZGVsZXRlIGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLmNvbnZlcnNhdGlvbkNvbG9yO1xuICAgICAgICBkZWxldGUgY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMuY3VzdG9tQ29sb3I7XG4gICAgICAgIGRlbGV0ZSBjb252ZXJzYXRpb24uYXR0cmlidXRlcy5jdXN0b21Db2xvcklkO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDT0xPUl9TRUxFQ1RFRCxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbG9yLFxuICAgICAgICBjdXN0b21Db2xvckRhdGEsXG4gICAgICB9LFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcigpOiBUb2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhckFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IENPTVBPU0VfVE9HR0xFX0VESVRJTkdfQVZBVEFSLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuY2VsQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uKFxuICBjYW5jZWxlZEF0PzogbnVtYmVyXG4pOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgQ2FuY2VsVmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uQWN0aW9uVHlwZVxuPiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkc0Jsb2NrZWQgPVxuICAgICAgZ2V0Q29udmVyc2F0aW9uSWRzU3RvcHBlZEZvclZlcmlmaWNhdGlvbihzdGF0ZSk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDQU5DRUxfQ09OVkVSU0FUSU9OX1BFTkRJTkdfVkVSSUZJQ0FUSU9OLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjYW5jZWxlZEF0OiBjYW5jZWxlZEF0ID8/IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgLy8gU3RhcnQgdGhlIGJsb2NrZWQgY29udmVyc2F0aW9uIHF1ZXVlcyB1cCBhZ2FpblxuICAgIGNvbnZlcnNhdGlvbklkc0Jsb2NrZWQuZm9yRWFjaChjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICBjb252ZXJzYXRpb25Kb2JRdWV1ZS5yZXNvbHZlVmVyaWZpY2F0aW9uV2FpdGVyKGNvbnZlcnNhdGlvbklkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdmVyaWZ5Q29udmVyc2F0aW9uc1N0b3BwaW5nU2VuZCgpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgQ2xlYXJWZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25BY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgdXVpZHNTdG9wcGluZ1NlbmQgPSBnZXRDb252ZXJzYXRpb25VdWlkc1N0b3BwaW5nU2VuZChzdGF0ZSk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWRzQmxvY2tlZCA9XG4gICAgICBnZXRDb252ZXJzYXRpb25JZHNTdG9wcGVkRm9yVmVyaWZpY2F0aW9uKHN0YXRlKTtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGB2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kOiBTdGFydGluZyB3aXRoICR7Y29udmVyc2F0aW9uSWRzQmxvY2tlZC5sZW5ndGh9IGJsb2NrZWQgYCArXG4gICAgICAgIGBjb252ZXJzYXRpb25zIGFuZCAke3V1aWRzU3RvcHBpbmdTZW5kLmxlbmd0aH0gY29udmVyc2F0aW9ucyB0byB2ZXJpZnkuYFxuICAgICk7XG5cbiAgICAvLyBNYXJrIGNvbnZlcnNhdGlvbnMgYXMgYXBwcm92ZWQvdmVyaWZpZWQgYXMgYXBwcm9wcmlhdGVcbiAgICBjb25zdCBwcm9taXNlczogQXJyYXk8UHJvbWlzZTx1bmtub3duPj4gPSBbXTtcbiAgICB1dWlkc1N0b3BwaW5nU2VuZC5mb3JFYWNoKGFzeW5jIHV1aWQgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KHV1aWQpO1xuICAgICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYHZlcmlmeUNvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQ6IENhbm5vdCB2ZXJpZnkgbWlzc2luZyBjb252ZXJhc3Rpb24gZm9yIHV1aWQgJHt1dWlkfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYHZlcmlmeUNvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQ6IFZlcmlmeWluZyBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgKTtcbiAgICAgIGlmIChjb252ZXJzYXRpb24uaXNVbnZlcmlmaWVkKCkpIHtcbiAgICAgICAgcHJvbWlzZXMucHVzaChjb252ZXJzYXRpb24uc2V0VmVyaWZpZWREZWZhdWx0KCkpO1xuICAgICAgfVxuICAgICAgcHJvbWlzZXMucHVzaChjb252ZXJzYXRpb24uc2V0QXBwcm92ZWQoKSk7XG4gICAgfSk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDTEVBUl9DT05WRVJTQVRJT05TX1BFTkRJTkdfVkVSSUZJQ0FUSU9OLFxuICAgIH0pO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgLy8gU3RhcnQgdGhlIGJsb2NrZWQgY29udmVyc2F0aW9uIHF1ZXVlcyB1cCBhZ2FpblxuICAgIGNvbnZlcnNhdGlvbklkc0Jsb2NrZWQuZm9yRWFjaChjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICBjb252ZXJzYXRpb25Kb2JRdWV1ZS5yZXNvbHZlVmVyaWZpY2F0aW9uV2FpdGVyKGNvbnZlcnNhdGlvbklkKTtcbiAgICB9KTtcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNsZWFyQ2FuY2VsbGVkQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBDbGVhckNhbmNlbGxlZFZlcmlmaWNhdGlvbkFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IENMRUFSX0NBTkNFTExFRF9WRVJJRklDQVRJT04sXG4gICAgcGF5bG9hZDoge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZVNhdmVBdmF0YXJUb0Rpc2soXG4gIGF2YXRhckRhdGE6IEF2YXRhckRhdGFUeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBDb21wb3NlU2F2ZUF2YXRhckFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICBpZiAoIWF2YXRhckRhdGEuYnVmZmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIGF2YXRhciBVaW50OEFycmF5IHByb3ZpZGVkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaW1hZ2VQYXRoID0gYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLndyaXRlTmV3QXZhdGFyRGF0YShcbiAgICAgIGF2YXRhckRhdGEuYnVmZmVyXG4gICAgKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IENPTVBPU0VfQUREX0FWQVRBUixcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgLi4uYXZhdGFyRGF0YSxcbiAgICAgICAgaW1hZ2VQYXRoLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcG9zZURlbGV0ZUF2YXRhckZyb21EaXNrKFxuICBhdmF0YXJEYXRhOiBBdmF0YXJEYXRhVHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgQ29tcG9zZURlbGV0ZUF2YXRhckFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICBpZiAoYXZhdGFyRGF0YS5pbWFnZVBhdGgpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdmF0YXIoYXZhdGFyRGF0YS5pbWFnZVBhdGgpO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ05vIGltYWdlUGF0aCBmb3IgYXZhdGFyRGF0YS4gUmVtb3ZpbmcgZnJvbSB1c2VyQXZhdGFyRGF0YSwgYnV0IG5vdCBkaXNrJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDT01QT1NFX1JFTU9WRV9BVkFUQVIsXG4gICAgICBwYXlsb2FkOiBhdmF0YXJEYXRhLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjb21wb3NlUmVwbGFjZUF2YXRhcihcbiAgY3VycjogQXZhdGFyRGF0YVR5cGUsXG4gIHByZXY/OiBBdmF0YXJEYXRhVHlwZVxuKTogQ29tcG9zZVJlcGxhY2VBdmF0YXJzQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogQ09NUE9TRV9SRVBMQUNFX0FWQVRBUixcbiAgICBwYXlsb2FkOiB7XG4gICAgICBjdXJyLFxuICAgICAgcHJldixcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXRQcmVKb2luQ29udmVyc2F0aW9uKFxuICBkYXRhOiBQcmVKb2luQ29udmVyc2F0aW9uVHlwZSB8IHVuZGVmaW5lZFxuKTogU2V0UHJlSm9pbkNvbnZlcnNhdGlvbkFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdTRVRfUFJFX0pPSU5fQ09OVkVSU0FUSU9OJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBkYXRhLFxuICAgIH0sXG4gIH07XG59XG5mdW5jdGlvbiBjb252ZXJzYXRpb25BZGRlZChcbiAgaWQ6IHN0cmluZyxcbiAgZGF0YTogQ29udmVyc2F0aW9uVHlwZVxuKTogQ29udmVyc2F0aW9uQWRkZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQ09OVkVSU0FUSU9OX0FEREVEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZCxcbiAgICAgIGRhdGEsXG4gICAgfSxcbiAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnNhdGlvbkNoYW5nZWQoXG4gIGlkOiBzdHJpbmcsXG4gIGRhdGE6IENvbnZlcnNhdGlvblR5cGVcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY2FsbGluZy5ncm91cE1lbWJlcnNDaGFuZ2VkKGlkKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdDT05WRVJTQVRJT05fQ0hBTkdFRCcsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIGlkLFxuICAgICAgICBkYXRhLFxuICAgICAgfSxcbiAgICB9KTtcbiAgfTtcbn1cbmZ1bmN0aW9uIGNvbnZlcnNhdGlvblJlbW92ZWQoaWQ6IHN0cmluZyk6IENvbnZlcnNhdGlvblJlbW92ZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQ09OVkVSU0FUSU9OX1JFTU9WRUQnLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGlkLFxuICAgIH0sXG4gIH07XG59XG5mdW5jdGlvbiBjb252ZXJzYXRpb25VbmxvYWRlZChpZDogc3RyaW5nKTogQ29udmVyc2F0aW9uVW5sb2FkZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQ09OVkVSU0FUSU9OX1VOTE9BREVEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZCxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjcmVhdGVHcm91cChcbiAgY3JlYXRlR3JvdXBWMiA9IGdyb3Vwcy5jcmVhdGVHcm91cFYyXG4pOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgfCBDcmVhdGVHcm91cFBlbmRpbmdBY3Rpb25UeXBlXG4gIHwgQ3JlYXRlR3JvdXBGdWxmaWxsZWRBY3Rpb25UeXBlXG4gIHwgQ3JlYXRlR3JvdXBSZWplY3RlZEFjdGlvblR5cGVcbiAgfCBTZWxlY3RlZENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBnZXRTdGF0ZSgpLmNvbnZlcnNhdGlvbnM7XG4gICAgaWYgKFxuICAgICAgY29tcG9zZXI/LnN0ZXAgIT09IENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhIHx8XG4gICAgICBjb21wb3Nlci5pc0NyZWF0aW5nXG4gICAgKSB7XG4gICAgICBhc3NlcnQoZmFsc2UsICdDYW5ub3QgY3JlYXRlIGdyb3VwIGluIHRoaXMgc3RhZ2U7IGRvaW5nIG5vdGhpbmcnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7IHR5cGU6ICdDUkVBVEVfR1JPVVBfUEVORElORycgfSk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgY3JlYXRlR3JvdXBWMih7XG4gICAgICAgIG5hbWU6IGNvbXBvc2VyLmdyb3VwTmFtZS50cmltKCksXG4gICAgICAgIGF2YXRhcjogY29tcG9zZXIuZ3JvdXBBdmF0YXIsXG4gICAgICAgIGF2YXRhcnM6IGNvbXBvc2VyLnVzZXJBdmF0YXJEYXRhLm1hcChhdmF0YXJEYXRhID0+XG4gICAgICAgICAgb21pdChhdmF0YXJEYXRhLCBbJ2J1ZmZlciddKVxuICAgICAgICApLFxuICAgICAgICBleHBpcmVUaW1lcjogY29tcG9zZXIuZ3JvdXBFeHBpcmVUaW1lcixcbiAgICAgICAgY29udmVyc2F0aW9uSWRzOiBjb21wb3Nlci5zZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICAgIH0pO1xuICAgICAgZGlzcGF0Y2goe1xuICAgICAgICB0eXBlOiAnQ1JFQVRFX0dST1VQX0ZVTEZJTExFRCcsXG4gICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICBpbnZpdGVkVXVpZHM6IChjb252ZXJzYXRpb24uZ2V0KCdwZW5kaW5nTWVtYmVyc1YyJykgfHwgW10pLm1hcChcbiAgICAgICAgICAgIG1lbWJlciA9PiBtZW1iZXIudXVpZFxuICAgICAgICAgICksXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGRpc3BhdGNoKFxuICAgICAgICBzaG93Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICAgIHN3aXRjaFRvQXNzb2NpYXRlZFZpZXc6IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLmVycm9yKCdGYWlsZWQgdG8gY3JlYXRlIGdyb3VwJywgZXJyICYmIGVyci5zdGFjayA/IGVyci5zdGFjayA6IGVycik7XG4gICAgICBkaXNwYXRjaCh7IHR5cGU6ICdDUkVBVEVfR1JPVVBfUkVKRUNURUQnIH0pO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlQWxsQ29udmVyc2F0aW9ucygpOiBSZW1vdmVBbGxDb252ZXJzYXRpb25zQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0NPTlZFUlNBVElPTlNfUkVNT1ZFX0FMTCcsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2VsZWN0TWVzc2FnZShcbiAgbWVzc2FnZUlkOiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IE1lc3NhZ2VTZWxlY3RlZEFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdNRVNTQUdFX1NFTEVDVEVEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBtZXNzYWdlSWQsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBjb252ZXJzYXRpb25TdG9wcGVkQnlNaXNzaW5nVmVyaWZpY2F0aW9uKHBheWxvYWQ6IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgdW50cnVzdGVkVXVpZHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbn0pOiBDb252ZXJzYXRpb25TdG9wcGVkQnlNaXNzaW5nVmVyaWZpY2F0aW9uQWN0aW9uVHlwZSB7XG4gIC8vIEZldGNoaW5nIHByb2ZpbGVzIHRvIGVuc3VyZSB0aGF0IHdlIGhhdmUgdGhlaXIgbGF0ZXN0IGlkZW50aXR5IGtleSBpbiBzdG9yYWdlXG4gIGNvbnN0IHByb2ZpbGVGZXRjaFF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gICAgY29uY3VycmVuY3k6IDMsXG4gIH0pO1xuICBwYXlsb2FkLnVudHJ1c3RlZFV1aWRzLmZvckVhY2godXVpZCA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KHV1aWQpO1xuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBjb252ZXJzYXRpb25TdG9wcGVkQnlNaXNzaW5nVmVyaWZpY2F0aW9uOiB1dWlkICR7dXVpZH0gbm90IGZvdW5kIWBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcHJvZmlsZUZldGNoUXVldWUuYWRkKCgpID0+IHtcbiAgICAgIGNvbnN0IGFjdGl2ZSA9IGNvbnZlcnNhdGlvbi5nZXRBY3RpdmVQcm9maWxlRmV0Y2goKTtcbiAgICAgIHJldHVybiBhY3RpdmUgfHwgY29udmVyc2F0aW9uLmdldFByb2ZpbGVzKCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIHJldHVybiB7XG4gICAgdHlwZTogQ09OVkVSU0FUSU9OX1NUT1BQRURfQllfTUlTU0lOR19WRVJJRklDQVRJT04sXG4gICAgcGF5bG9hZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gbWVzc2FnZUNoYW5nZWQoXG4gIGlkOiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGRhdGE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuKTogTWVzc2FnZUNoYW5nZWRBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnTUVTU0FHRV9DSEFOR0VEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZCxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZGF0YSxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gbWVzc2FnZURlbGV0ZWQoXG4gIGlkOiBzdHJpbmcsXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IE1lc3NhZ2VEZWxldGVkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ01FU1NBR0VfREVMRVRFRCcsXG4gICAgcGF5bG9hZDoge1xuICAgICAgaWQsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gbWVzc2FnZUV4cGFuZGVkKFxuICBpZDogc3RyaW5nLFxuICBkaXNwbGF5TGltaXQ6IG51bWJlclxuKTogTWVzc2FnZUV4cGFuZGVkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ01FU1NBR0VfRVhQQU5ERUQnLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGlkLFxuICAgICAgZGlzcGxheUxpbWl0LFxuICAgIH0sXG4gIH07XG59XG5mdW5jdGlvbiBtZXNzYWdlc0FkZGVkKHtcbiAgY29udmVyc2F0aW9uSWQsXG4gIGlzQWN0aXZlLFxuICBpc0p1c3RTZW50LFxuICBpc05ld01lc3NhZ2UsXG4gIG1lc3NhZ2VzLFxufToge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBpc0FjdGl2ZTogYm9vbGVhbjtcbiAgaXNKdXN0U2VudDogYm9vbGVhbjtcbiAgaXNOZXdNZXNzYWdlOiBib29sZWFuO1xuICBtZXNzYWdlczogQXJyYXk8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPjtcbn0pOiBNZXNzYWdlc0FkZGVkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ01FU1NBR0VTX0FEREVEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGlzQWN0aXZlLFxuICAgICAgaXNKdXN0U2VudCxcbiAgICAgIGlzTmV3TWVzc2FnZSxcbiAgICAgIG1lc3NhZ2VzLFxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlcGFpck5ld2VzdE1lc3NhZ2UoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFJlcGFpck5ld2VzdE1lc3NhZ2VBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUkVQQUlSX05FV0VTVF9NRVNTQUdFJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gcmVwYWlyT2xkZXN0TWVzc2FnZShcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogUmVwYWlyT2xkZXN0TWVzc2FnZUFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdSRVBBSVJfT0xERVNUX01FU1NBR0UnLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbihcbiAgZ3JvdXBDb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBSZXZpZXdHcm91cE1lbWJlck5hbWVDb2xsaXNpb25BY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnUkVWSUVXX0dST1VQX01FTUJFUl9OQU1FX0NPTExJU0lPTicsXG4gICAgcGF5bG9hZDogeyBncm91cENvbnZlcnNhdGlvbklkIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJldmlld01lc3NhZ2VSZXF1ZXN0TmFtZUNvbGxpc2lvbihcbiAgcGF5bG9hZDogUmVhZG9ubHk8e1xuICAgIHNhZmVDb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICB9PlxuKTogUmV2aWV3TWVzc2FnZVJlcXVlc3ROYW1lQ29sbGlzaW9uQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7IHR5cGU6ICdSRVZJRVdfTUVTU0FHRV9SRVFVRVNUX05BTUVfQ09MTElTSU9OJywgcGF5bG9hZCB9O1xufVxuXG5leHBvcnQgdHlwZSBNZXNzYWdlUmVzZXRPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgbWVzc2FnZXM6IEFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT47XG4gIG1ldHJpY3M6IE1lc3NhZ2VNZXRyaWNzVHlwZTtcbiAgc2Nyb2xsVG9NZXNzYWdlSWQ/OiBzdHJpbmc7XG4gIHVuYm91bmRlZEZldGNoPzogYm9vbGVhbjtcbn0+O1xuXG5mdW5jdGlvbiBtZXNzYWdlc1Jlc2V0KHtcbiAgY29udmVyc2F0aW9uSWQsXG4gIG1lc3NhZ2VzLFxuICBtZXRyaWNzLFxuICBzY3JvbGxUb01lc3NhZ2VJZCxcbiAgdW5ib3VuZGVkRmV0Y2gsXG59OiBNZXNzYWdlUmVzZXRPcHRpb25zVHlwZSk6IE1lc3NhZ2VzUmVzZXRBY3Rpb25UeXBlIHtcbiAgZm9yIChjb25zdCBtZXNzYWdlIG9mIG1lc3NhZ2VzKSB7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgbWVzc2FnZS5jb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uSWQsXG4gICAgICBgbWVzc2FnZXNSZXNldCgke2NvbnZlcnNhdGlvbklkfSk6IGludmFsaWQgbWVzc2FnZSBjb252ZXJzYXRpb25JZCBgICtcbiAgICAgICAgYCR7bWVzc2FnZS5jb252ZXJzYXRpb25JZH1gXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ01FU1NBR0VTX1JFU0VUJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICB1bmJvdW5kZWRGZXRjaDogQm9vbGVhbih1bmJvdW5kZWRGZXRjaCksXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgICAgbWV0cmljcyxcbiAgICAgIHNjcm9sbFRvTWVzc2FnZUlkLFxuICAgIH0sXG4gIH07XG59XG5mdW5jdGlvbiBzZXRNZXNzYWdlTG9hZGluZ1N0YXRlKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBtZXNzYWdlTG9hZGluZ1N0YXRlOiB1bmRlZmluZWQgfCBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGVcbik6IFNldE1lc3NhZ2VMb2FkaW5nU3RhdGVBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX01FU1NBR0VfTE9BRElOR19TVEFURScsXG4gICAgcGF5bG9hZDoge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBtZXNzYWdlTG9hZGluZ1N0YXRlLFxuICAgIH0sXG4gIH07XG59XG5mdW5jdGlvbiBzZXRJc05lYXJCb3R0b20oXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGlzTmVhckJvdHRvbTogYm9vbGVhblxuKTogU2V0SXNOZWFyQm90dG9tQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFVF9ORUFSX0JPVFRPTScsXG4gICAgcGF5bG9hZDoge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBpc05lYXJCb3R0b20sXG4gICAgfSxcbiAgfTtcbn1cbmZ1bmN0aW9uIHNldElzRmV0Y2hpbmdVVUlEKFxuICBpZGVudGlmaWVyOiBVVUlERmV0Y2hTdGF0ZUtleVR5cGUsXG4gIGlzRmV0Y2hpbmc6IGJvb2xlYW5cbik6IFNldElzRmV0Y2hpbmdVVUlEQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFVF9JU19GRVRDSElOR19VVUlEJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNGZXRjaGluZyxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gc2V0U2VsZWN0ZWRDb252ZXJzYXRpb25IZWFkZXJUaXRsZShcbiAgdGl0bGU/OiBzdHJpbmdcbik6IFNldENvbnZlcnNhdGlvbkhlYWRlclRpdGxlQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFVF9DT05WRVJTQVRJT05fSEVBREVSX1RJVExFJyxcbiAgICBwYXlsb2FkOiB7IHRpdGxlIH0sXG4gIH07XG59XG5mdW5jdGlvbiBzZXRTZWxlY3RlZENvbnZlcnNhdGlvblBhbmVsRGVwdGgoXG4gIHBhbmVsRGVwdGg6IG51bWJlclxuKTogU2V0U2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NFVF9TRUxFQ1RFRF9DT05WRVJTQVRJT05fUEFORUxfREVQVEgnLFxuICAgIHBheWxvYWQ6IHsgcGFuZWxEZXB0aCB9LFxuICB9O1xufVxuZnVuY3Rpb24gc2V0UmVjZW50TWVkaWFJdGVtcyhcbiAgaWQ6IHN0cmluZyxcbiAgcmVjZW50TWVkaWFJdGVtczogQXJyYXk8TWVkaWFJdGVtVHlwZT5cbik6IFNldFJlY2VudE1lZGlhSXRlbXNBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX1JFQ0VOVF9NRURJQV9JVEVNUycsXG4gICAgcGF5bG9hZDogeyBpZCwgcmVjZW50TWVkaWFJdGVtcyB9LFxuICB9O1xufVxuZnVuY3Rpb24gY2xlYXJJbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cCgpOiBDbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7IHR5cGU6ICdDTEVBUl9JTlZJVEVEX1VVSURTX0ZPUl9ORVdMWV9DUkVBVEVEX0dST1VQJyB9O1xufVxuZnVuY3Rpb24gY2xlYXJHcm91cENyZWF0aW9uRXJyb3IoKTogQ2xlYXJHcm91cENyZWF0aW9uRXJyb3JBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogJ0NMRUFSX0dST1VQX0NSRUFUSU9OX0VSUk9SJyB9O1xufVxuZnVuY3Rpb24gY2xlYXJTZWxlY3RlZE1lc3NhZ2UoKTogQ2xlYXJTZWxlY3RlZE1lc3NhZ2VBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnQ0xFQVJfU0VMRUNURURfTUVTU0FHRScsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfTtcbn1cbmZ1bmN0aW9uIGNsZWFyVW5yZWFkTWV0cmljcyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogQ2xlYXJVbnJlYWRNZXRyaWNzQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ0NMRUFSX1VOUkVBRF9NRVRSSUNTJyxcbiAgICBwYXlsb2FkOiB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gY2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXcoKTogQ2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXdBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogJ0NMT1NFX0NPTlRBQ1RfU1BPT0ZJTkdfUkVWSUVXJyB9O1xufVxuZnVuY3Rpb24gY2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWwoKTogQ2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWxBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogJ0NMT1NFX01BWElNVU1fR1JPVVBfU0laRV9NT0RBTCcgfTtcbn1cbmZ1bmN0aW9uIGNsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbCgpOiBDbG9zZVJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogJ0NMT1NFX1JFQ09NTUVOREVEX0dST1VQX1NJWkVfTU9EQUwnIH07XG59XG5mdW5jdGlvbiBzY3JvbGxUb01lc3NhZ2UoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIG1lc3NhZ2VJZDogc3RyaW5nXG4pOiBTY3JvbGxUb01lc3NhZ2VBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0NST0xMX1RPX01FU1NBR0UnLFxuICAgIHBheWxvYWQ6IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbWVzc2FnZUlkLFxuICAgIH0sXG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldENvbXBvc2VHcm91cEF2YXRhcihcbiAgZ3JvdXBBdmF0YXI6IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXlcbik6IFNldENvbXBvc2VHcm91cEF2YXRhckFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6ICdTRVRfQ09NUE9TRV9HUk9VUF9BVkFUQVInLFxuICAgIHBheWxvYWQ6IHsgZ3JvdXBBdmF0YXIgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Q29tcG9zZUdyb3VwTmFtZShncm91cE5hbWU6IHN0cmluZyk6IFNldENvbXBvc2VHcm91cE5hbWVBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX0NPTVBPU0VfR1JPVVBfTkFNRScsXG4gICAgcGF5bG9hZDogeyBncm91cE5hbWUgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXIoXG4gIGdyb3VwRXhwaXJlVGltZXI6IG51bWJlclxuKTogU2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXJBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX0NPTVBPU0VfR1JPVVBfRVhQSVJFX1RJTUVSJyxcbiAgICBwYXlsb2FkOiB7IGdyb3VwRXhwaXJlVGltZXIgfSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0Q29tcG9zZVNlYXJjaFRlcm0oXG4gIHNlYXJjaFRlcm06IHN0cmluZ1xuKTogU2V0Q29tcG9zZVNlYXJjaFRlcm1BY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiAnU0VUX0NPTVBPU0VfU0VBUkNIX1RFUk0nLFxuICAgIHBheWxvYWQ6IHsgc2VhcmNoVGVybSB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBzdGFydENvbXBvc2luZygpOiBTdGFydENvbXBvc2luZ0FjdGlvblR5cGUge1xuICByZXR1cm4geyB0eXBlOiAnU1RBUlRfQ09NUE9TSU5HJyB9O1xufVxuXG5mdW5jdGlvbiBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzKCk6IFNob3dDaG9vc2VHcm91cE1lbWJlcnNBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHsgdHlwZTogJ1NIT1dfQ0hPT1NFX0dST1VQX01FTUJFUlMnIH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGEoKTogU3RhcnRTZXR0aW5nR3JvdXBNZXRhZGF0YUFjdGlvblR5cGUge1xuICByZXR1cm4geyB0eXBlOiAnU1RBUlRfU0VUVElOR19HUk9VUF9NRVRBREFUQScgfTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgVG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzQWN0aW9uVHlwZVxuPiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgbWF4UmVjb21tZW5kZWRHcm91cFNpemUgPSBnZXRHcm91cFNpemVSZWNvbW1lbmRlZExpbWl0KDE1MSk7XG4gICAgY29uc3QgbWF4R3JvdXBTaXplID0gTWF0aC5tYXgoXG4gICAgICBnZXRHcm91cFNpemVIYXJkTGltaXQoMTAwMSksXG4gICAgICBtYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZSArIDFcbiAgICApO1xuXG4gICAgYXNzZXJ0KFxuICAgICAgbWF4R3JvdXBTaXplID4gbWF4UmVjb21tZW5kZWRHcm91cFNpemUsXG4gICAgICAnRXhwZWN0ZWQgdGhlIGhhcmQgbWF4IGdyb3VwIHNpemUgdG8gYmUgbGFyZ2VyIHRoYW4gdGhlIHJlY29tbWVuZGVkIG1heGltdW0nXG4gICAgKTtcblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdUT0dHTEVfQ09OVkVSU0FUSU9OX0lOX0NIT09TRV9NRU1CRVJTJyxcbiAgICAgIHBheWxvYWQ6IHsgY29udmVyc2F0aW9uSWQsIG1heEdyb3VwU2l6ZSwgbWF4UmVjb21tZW5kZWRHcm91cFNpemUgfSxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlSGlkZVN0b3JpZXMoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIE5vb3BBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBkaXNwYXRjaCA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uTW9kZWwgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgIGlmIChjb252ZXJzYXRpb25Nb2RlbCkge1xuICAgICAgY29udmVyc2F0aW9uTW9kZWwudG9nZ2xlSGlkZVN0b3JpZXMoKTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogJ05PT1AnLFxuICAgICAgcGF5bG9hZDogbnVsbCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3ZlTWVtYmVyRnJvbUdyb3VwKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBjb250YWN0SWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgTm9vcEFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25Nb2RlbCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKGNvbnZlcnNhdGlvbk1vZGVsKSB7XG4gICAgICBjb25zdCBpZEZvckxvZ2dpbmcgPSBjb252ZXJzYXRpb25Nb2RlbC5pZEZvckxvZ2dpbmcoKTtcbiAgICAgIGxvbmdSdW5uaW5nVGFza1dyYXBwZXIoe1xuICAgICAgICBuYW1lOiAncmVtb3ZlTWVtYmVyRnJvbUdyb3VwJyxcbiAgICAgICAgaWRGb3JMb2dnaW5nLFxuICAgICAgICB0YXNrOiAoKSA9PiBjb252ZXJzYXRpb25Nb2RlbC5yZW1vdmVGcm9tR3JvdXBWMihjb250YWN0SWQpLFxuICAgICAgfSk7XG4gICAgfVxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6ICdOT09QJyxcbiAgICAgIHBheWxvYWQ6IG51bGwsXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZUFkbWluKFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICBjb250YWN0SWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgTm9vcEFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25Nb2RlbCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKGNvbnZlcnNhdGlvbk1vZGVsKSB7XG4gICAgICBjb252ZXJzYXRpb25Nb2RlbC50b2dnbGVBZG1pbihjb250YWN0SWQpO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnTk9PUCcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiB1cGRhdGVDb252ZXJzYXRpb25Nb2RlbFNoYXJlZEdyb3VwcyhcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgTm9vcEFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIGRpc3BhdGNoID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgIGlmIChjb252ZXJzYXRpb24gJiYgY29udmVyc2F0aW9uLnRocm90dGxlZFVwZGF0ZVNoYXJlZEdyb3Vwcykge1xuICAgICAgY29udmVyc2F0aW9uLnRocm90dGxlZFVwZGF0ZVNoYXJlZEdyb3VwcygpO1xuICAgIH1cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiAnTk9PUCcsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzaG93SW5ib3goKTogU2hvd0luYm94QWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NIT1dfSU5CT1gnLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH07XG59XG5cbnR5cGUgU2hvd0NvbnZlcnNhdGlvbkFyZ3NUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZD86IHN0cmluZztcbiAgbWVzc2FnZUlkPzogc3RyaW5nO1xuICBzd2l0Y2hUb0Fzc29jaWF0ZWRWaWV3PzogYm9vbGVhbjtcbn07XG5leHBvcnQgdHlwZSBTaG93Q29udmVyc2F0aW9uVHlwZSA9IChfOiBTaG93Q29udmVyc2F0aW9uQXJnc1R5cGUpID0+IHVua25vd247XG5cbmZ1bmN0aW9uIHNob3dDb252ZXJzYXRpb24oe1xuICBjb252ZXJzYXRpb25JZCxcbiAgbWVzc2FnZUlkLFxuICBzd2l0Y2hUb0Fzc29jaWF0ZWRWaWV3LFxufTogU2hvd0NvbnZlcnNhdGlvbkFyZ3NUeXBlKTogU2VsZWN0ZWRDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogU0VMRUNURURfQ09OVkVSU0FUSU9OX0NIQU5HRUQsXG4gICAgcGF5bG9hZDoge1xuICAgICAgaWQ6IGNvbnZlcnNhdGlvbklkLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgc3dpdGNoVG9Bc3NvY2lhdGVkVmlldyxcbiAgICB9LFxuICB9O1xufVxuZnVuY3Rpb24gc2hvd0FyY2hpdmVkQ29udmVyc2F0aW9ucygpOiBTaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogJ1NIT1dfQVJDSElWRURfQ09OVkVSU0FUSU9OUycsXG4gICAgcGF5bG9hZDogbnVsbCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UobWVzc2FnZUlkOiBzdHJpbmcpOiBOb29wQWN0aW9uVHlwZSB7XG4gIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIuZ2V0QnlJZChtZXNzYWdlSWQpO1xuICBpZiAobWVzc2FnZSkge1xuICAgIG1lc3NhZ2UuZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UoKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdHlwZTogJ05PT1AnLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH07XG59XG5cbi8vIFJlZHVjZXJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdGUoKTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgY29udmVyc2F0aW9uTG9va3VwOiB7fSxcbiAgICBjb252ZXJzYXRpb25zQnlFMTY0OiB7fSxcbiAgICBjb252ZXJzYXRpb25zQnlVdWlkOiB7fSxcbiAgICBjb252ZXJzYXRpb25zQnlHcm91cElkOiB7fSxcbiAgICBjb252ZXJzYXRpb25zQnlVc2VybmFtZToge30sXG4gICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7fSxcbiAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7fSxcbiAgICBtZXNzYWdlc0xvb2t1cDoge30sXG4gICAgc2VsZWN0ZWRNZXNzYWdlQ291bnRlcjogMCxcbiAgICBzaG93QXJjaGl2ZWQ6IGZhbHNlLFxuICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uVGl0bGU6ICcnLFxuICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uUGFuZWxEZXB0aDogMCxcbiAgICB1c2VybmFtZVNhdmVTdGF0ZTogVXNlcm5hbWVTYXZlU3RhdGUuTm9uZSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoXG4gIGFkZGVkOiBDb252ZXJzYXRpb25UeXBlIHwgdW5kZWZpbmVkLFxuICByZW1vdmVkOiBDb252ZXJzYXRpb25UeXBlIHwgdW5kZWZpbmVkLFxuICBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZVxuKTogUGljazxcbiAgQ29udmVyc2F0aW9uc1N0YXRlVHlwZSxcbiAgfCAnY29udmVyc2F0aW9uc0J5RTE2NCdcbiAgfCAnY29udmVyc2F0aW9uc0J5VXVpZCdcbiAgfCAnY29udmVyc2F0aW9uc0J5R3JvdXBJZCdcbiAgfCAnY29udmVyc2F0aW9uc0J5VXNlcm5hbWUnXG4+IHtcbiAgY29uc3QgcmVzdWx0ID0ge1xuICAgIGNvbnZlcnNhdGlvbnNCeUUxNjQ6IHN0YXRlLmNvbnZlcnNhdGlvbnNCeUUxNjQsXG4gICAgY29udmVyc2F0aW9uc0J5VXVpZDogc3RhdGUuY29udmVyc2F0aW9uc0J5VXVpZCxcbiAgICBjb252ZXJzYXRpb25zQnlHcm91cElkOiBzdGF0ZS5jb252ZXJzYXRpb25zQnlHcm91cElkLFxuICAgIGNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lOiBzdGF0ZS5jb252ZXJzYXRpb25zQnlVc2VybmFtZSxcbiAgfTtcblxuICBpZiAocmVtb3ZlZCAmJiByZW1vdmVkLmUxNjQpIHtcbiAgICByZXN1bHQuY29udmVyc2F0aW9uc0J5RTE2NCA9IG9taXQocmVzdWx0LmNvbnZlcnNhdGlvbnNCeUUxNjQsIHJlbW92ZWQuZTE2NCk7XG4gIH1cbiAgaWYgKHJlbW92ZWQgJiYgcmVtb3ZlZC51dWlkKSB7XG4gICAgcmVzdWx0LmNvbnZlcnNhdGlvbnNCeVV1aWQgPSBvbWl0KHJlc3VsdC5jb252ZXJzYXRpb25zQnlVdWlkLCByZW1vdmVkLnV1aWQpO1xuICB9XG4gIGlmIChyZW1vdmVkICYmIHJlbW92ZWQuZ3JvdXBJZCkge1xuICAgIHJlc3VsdC5jb252ZXJzYXRpb25zQnlHcm91cElkID0gb21pdChcbiAgICAgIHJlc3VsdC5jb252ZXJzYXRpb25zQnlHcm91cElkLFxuICAgICAgcmVtb3ZlZC5ncm91cElkXG4gICAgKTtcbiAgfVxuICBpZiAocmVtb3ZlZCAmJiByZW1vdmVkLnVzZXJuYW1lKSB7XG4gICAgcmVzdWx0LmNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lID0gb21pdChcbiAgICAgIHJlc3VsdC5jb252ZXJzYXRpb25zQnlVc2VybmFtZSxcbiAgICAgIHJlbW92ZWQudXNlcm5hbWVcbiAgICApO1xuICB9XG5cbiAgaWYgKGFkZGVkICYmIGFkZGVkLmUxNjQpIHtcbiAgICByZXN1bHQuY29udmVyc2F0aW9uc0J5RTE2NCA9IHtcbiAgICAgIC4uLnJlc3VsdC5jb252ZXJzYXRpb25zQnlFMTY0LFxuICAgICAgW2FkZGVkLmUxNjRdOiBhZGRlZCxcbiAgICB9O1xuICB9XG4gIGlmIChhZGRlZCAmJiBhZGRlZC51dWlkKSB7XG4gICAgcmVzdWx0LmNvbnZlcnNhdGlvbnNCeVV1aWQgPSB7XG4gICAgICAuLi5yZXN1bHQuY29udmVyc2F0aW9uc0J5VXVpZCxcbiAgICAgIFthZGRlZC51dWlkXTogYWRkZWQsXG4gICAgfTtcbiAgfVxuICBpZiAoYWRkZWQgJiYgYWRkZWQuZ3JvdXBJZCkge1xuICAgIHJlc3VsdC5jb252ZXJzYXRpb25zQnlHcm91cElkID0ge1xuICAgICAgLi4ucmVzdWx0LmNvbnZlcnNhdGlvbnNCeUdyb3VwSWQsXG4gICAgICBbYWRkZWQuZ3JvdXBJZF06IGFkZGVkLFxuICAgIH07XG4gIH1cbiAgaWYgKGFkZGVkICYmIGFkZGVkLnVzZXJuYW1lKSB7XG4gICAgcmVzdWx0LmNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lID0ge1xuICAgICAgLi4ucmVzdWx0LmNvbnZlcnNhdGlvbnNCeVVzZXJuYW1lLFxuICAgICAgW2FkZGVkLnVzZXJuYW1lXTogYWRkZWQsXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGNsb3NlQ29tcG9zZXJNb2RhbChcbiAgc3RhdGU6IFJlYWRvbmx5PENvbnZlcnNhdGlvbnNTdGF0ZVR5cGU+LFxuICBtb2RhbFRvQ2xvc2U6ICdtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZScgfCAncmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlJ1xuKTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSB7XG4gIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuICBpZiAoY29tcG9zZXI/LnN0ZXAgIT09IENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnMpIHtcbiAgICBhc3NlcnQoZmFsc2UsIFwiQ2FuJ3QgY2xvc2UgdGhlIG1vZGFsIGluIHRoaXMgY29tcG9zZXIgc3RlcC4gRG9pbmcgbm90aGluZ1wiKTtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgaWYgKGNvbXBvc2VyW21vZGFsVG9DbG9zZV0gIT09IE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcpIHtcbiAgICByZXR1cm4gc3RhdGU7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZSxcbiAgICBjb21wb3Nlcjoge1xuICAgICAgLi4uY29tcG9zZXIsXG4gICAgICBbbW9kYWxUb0Nsb3NlXTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlOiBSZWFkb25seTxDb252ZXJzYXRpb25zU3RhdGVUeXBlPiA9IGdldEVtcHR5U3RhdGUoKSxcbiAgYWN0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25BY3Rpb25UeXBlPlxuKTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSB7XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0xFQVJfQ09OVkVSU0FUSU9OU19QRU5ESU5HX1ZFUklGSUNBVElPTikge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbjoge30sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0xFQVJfQ0FOQ0VMTEVEX1ZFUklGSUNBVElPTikge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGNvbnN0IHsgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uIH0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGV4aXN0aW5nUGVuZGluZ1N0YXRlID0gZ2V0T3duKFxuICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLFxuICAgICAgY29udmVyc2F0aW9uSWRcbiAgICApO1xuXG4gICAgLy8gSWYgdGhlcmUgYXJlIGFjdGl2ZSB2ZXJpZmljYXRpb25zIHJlcXVpcmVkLCB0aGlzIHdpbGwgZG8gbm90aGluZy5cbiAgICBpZiAoXG4gICAgICBleGlzdGluZ1BlbmRpbmdTdGF0ZSAmJlxuICAgICAgZXhpc3RpbmdQZW5kaW5nU3RhdGUudHlwZSA9PT1cbiAgICAgICAgQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuUGVuZGluZ1ZlcmlmaWNhdGlvblxuICAgICkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbjogb21pdChcbiAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb25JZFxuICAgICAgKSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBDQU5DRUxfQ09OVkVSU0FUSU9OX1BFTkRJTkdfVkVSSUZJQ0FUSU9OKSB7XG4gICAgY29uc3QgeyBjYW5jZWxlZEF0IH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCB7IHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbiB9ID0gc3RhdGU7XG4gICAgY29uc3QgbmV3dmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiBSZWNvcmQ8XG4gICAgICBzdHJpbmcsXG4gICAgICBDb252ZXJzYXRpb25WZXJpZmljYXRpb25EYXRhXG4gICAgPiA9IHt9O1xuXG4gICAgY29uc3QgZW50cmllcyA9IE9iamVjdC5lbnRyaWVzKHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbik7XG4gICAgaWYgKCFlbnRyaWVzLmxlbmd0aCkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdDQU5DRUxfQ09OVkVSU0FUSU9OX1BFTkRJTkdfVkVSSUZJQ0FUSU9OOiBObyBjb252ZXJzYXRpb25zIHBlbmRpbmcgdmVyaWZpY2F0aW9uJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IFtjb252ZXJzYXRpb25JZCwgZGF0YV0gb2YgZW50cmllcykge1xuICAgICAgaWYgKFxuICAgICAgICBkYXRhLnR5cGUgPT09IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlZlcmlmaWNhdGlvbkNhbmNlbGxlZCAmJlxuICAgICAgICBkYXRhLmNhbmNlbGVkQXQgPiBjYW5jZWxlZEF0XG4gICAgICApIHtcbiAgICAgICAgbmV3dmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXSA9IGRhdGE7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBuZXd2ZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdID0ge1xuICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlZlcmlmaWNhdGlvbkNhbmNlbGxlZCxcbiAgICAgICAgICBjYW5jZWxlZEF0LFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbjogbmV3dmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdDTEVBUl9JTlZJVEVEX1VVSURTX0ZPUl9ORVdMWV9DUkVBVEVEX0dST1VQJykge1xuICAgIHJldHVybiBvbWl0KHN0YXRlLCAnaW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXAnKTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NMRUFSX0dST1VQX0NSRUFUSU9OX0VSUk9SJykge1xuICAgIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuICAgIGlmIChjb21wb3Nlcj8uc3RlcCAhPT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEpIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgIFwiQ2FuJ3QgY2xlYXIgZ3JvdXAgY3JlYXRpb24gZXJyb3IgaW4gdGhpcyBjb21wb3NlciBzdGF0ZS4gRG9pbmcgbm90aGluZ1wiXG4gICAgICApO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb21wb3Nlcjoge1xuICAgICAgICAuLi5jb21wb3NlcixcbiAgICAgICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ0xPU0VfQ09OVEFDVF9TUE9PRklOR19SRVZJRVcnKSB7XG4gICAgcmV0dXJuIG9taXQoc3RhdGUsICdjb250YWN0U3Bvb2ZpbmdSZXZpZXcnKTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NMT1NFX01BWElNVU1fR1JPVVBfU0laRV9NT0RBTCcpIHtcbiAgICByZXR1cm4gY2xvc2VDb21wb3Nlck1vZGFsKHN0YXRlLCAnbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUnIGFzIGNvbnN0KTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NMT1NFX1JFQ09NTUVOREVEX0dST1VQX1NJWkVfTU9EQUwnKSB7XG4gICAgcmV0dXJuIGNsb3NlQ29tcG9zZXJNb2RhbChzdGF0ZSwgJ3JlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZScgYXMgY29uc3QpO1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBESVNDQVJEX01FU1NBR0VTKSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgaWYgKCdudW1iZXJUb0tlZXBBdEJvdHRvbScgaW4gYWN0aW9uLnBheWxvYWQpIHtcbiAgICAgIGNvbnN0IHsgbnVtYmVyVG9LZWVwQXRCb3R0b20gfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uTWVzc2FnZXMgPSBnZXRPd24oXG4gICAgICAgIHN0YXRlLm1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIGNvbnZlcnNhdGlvbklkXG4gICAgICApO1xuICAgICAgaWYgKCFjb252ZXJzYXRpb25NZXNzYWdlcykge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgbWVzc2FnZUlkczogb2xkTWVzc2FnZUlkcyB9ID0gY29udmVyc2F0aW9uTWVzc2FnZXM7XG4gICAgICBpZiAob2xkTWVzc2FnZUlkcy5sZW5ndGggPD0gbnVtYmVyVG9LZWVwQXRCb3R0b20pIHtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXNzYWdlSWRzVG9SZW1vdmUgPSBvbGRNZXNzYWdlSWRzLnNsaWNlKDAsIC1udW1iZXJUb0tlZXBBdEJvdHRvbSk7XG4gICAgICBjb25zdCBtZXNzYWdlSWRzVG9LZWVwID0gb2xkTWVzc2FnZUlkcy5zbGljZSgtbnVtYmVyVG9LZWVwQXRCb3R0b20pO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZXNMb29rdXA6IG9taXQoc3RhdGUubWVzc2FnZXNMb29rdXAsIG1lc3NhZ2VJZHNUb1JlbW92ZSksXG4gICAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAuLi5zdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk1lc3NhZ2VzLFxuICAgICAgICAgICAgbWVzc2FnZUlkczogbWVzc2FnZUlkc1RvS2VlcCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoJ251bWJlclRvS2VlcEF0VG9wJyBpbiBhY3Rpb24ucGF5bG9hZCkge1xuICAgICAgY29uc3QgeyBudW1iZXJUb0tlZXBBdFRvcCB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25NZXNzYWdlcyA9IGdldE93bihcbiAgICAgICAgc3RhdGUubWVzc2FnZXNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgY29udmVyc2F0aW9uSWRcbiAgICAgICk7XG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbk1lc3NhZ2VzKSB7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBtZXNzYWdlSWRzOiBvbGRNZXNzYWdlSWRzIH0gPSBjb252ZXJzYXRpb25NZXNzYWdlcztcbiAgICAgIGlmIChvbGRNZXNzYWdlSWRzLmxlbmd0aCA8PSBudW1iZXJUb0tlZXBBdFRvcCkge1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VJZHNUb1JlbW92ZSA9IG9sZE1lc3NhZ2VJZHMuc2xpY2UobnVtYmVyVG9LZWVwQXRUb3ApO1xuICAgICAgY29uc3QgbWVzc2FnZUlkc1RvS2VlcCA9IG9sZE1lc3NhZ2VJZHMuc2xpY2UoMCwgbnVtYmVyVG9LZWVwQXRUb3ApO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgbWVzc2FnZXNMb29rdXA6IG9taXQoc3RhdGUubWVzc2FnZXNMb29rdXAsIG1lc3NhZ2VJZHNUb1JlbW92ZSksXG4gICAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAuLi5zdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbk1lc3NhZ2VzLFxuICAgICAgICAgICAgbWVzc2FnZUlkczogbWVzc2FnZUlkc1RvS2VlcCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGFjdGlvbi5wYXlsb2FkKTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ1NFVF9QUkVfSk9JTl9DT05WRVJTQVRJT04nKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gICAgY29uc3QgeyBkYXRhIH0gPSBwYXlsb2FkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgcHJlSm9pbkNvbnZlcnNhdGlvbjogZGF0YSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NPTlZFUlNBVElPTl9BRERFRCcpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGlkLCBkYXRhIH0gPSBwYXlsb2FkO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uTG9va3VwIH0gPSBzdGF0ZTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAuLi5jb252ZXJzYXRpb25Mb29rdXAsXG4gICAgICAgIFtpZF06IGRhdGEsXG4gICAgICB9LFxuICAgICAgLi4udXBkYXRlQ29udmVyc2F0aW9uTG9va3VwcyhkYXRhLCB1bmRlZmluZWQsIHN0YXRlKSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NPTlZFUlNBVElPTl9DSEFOR0VEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgaWQsIGRhdGEgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgeyBzZWxlY3RlZENvbnZlcnNhdGlvbklkIH0gPSBzdGF0ZTtcbiAgICBsZXQgeyBzaG93QXJjaGl2ZWQgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZXhpc3RpbmcgPSBjb252ZXJzYXRpb25Mb29rdXBbaWRdO1xuICAgIC8vIFdlIG9ubHkgbW9kaWZ5IHRoZSBsb29rdXAgaWYgd2UgYWxyZWFkeSBoYWQgdGhhdCBjb252ZXJzYXRpb24gYW5kIHRoZSBjb252ZXJzYXRpb25cbiAgICAvLyAgIGNoYW5nZWQuXG4gICAgaWYgKCFleGlzdGluZyB8fCBkYXRhID09PSBleGlzdGluZykge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGtleXNUb09taXQ6IEFycmF5PGtleW9mIENvbnZlcnNhdGlvbnNTdGF0ZVR5cGU+ID0gW107XG5cbiAgICBpZiAoc2VsZWN0ZWRDb252ZXJzYXRpb25JZCA9PT0gaWQpIHtcbiAgICAgIC8vIEFyY2hpdmVkIC0+IEluYm94OiB3ZSBnbyBiYWNrIHRvIHRoZSBub3JtYWwgaW5ib3ggdmlld1xuICAgICAgaWYgKGV4aXN0aW5nLmlzQXJjaGl2ZWQgJiYgIWRhdGEuaXNBcmNoaXZlZCkge1xuICAgICAgICBzaG93QXJjaGl2ZWQgPSBmYWxzZTtcbiAgICAgIH1cbiAgICAgIC8vIEluYm94IC0+IEFyY2hpdmVkOiBubyBjb252ZXJzYXRpb24gaXMgc2VsZWN0ZWRcbiAgICAgIC8vIE5vdGU6IFdpdGggdG9kYXkncyBzdGFja2VkIGNvbnZlcnNhdGlvbnMgYXJjaGl0ZWN0dXJlLCB0aGlzIGNhbiByZXN1bHQgaW4gd2VpcmRcbiAgICAgIC8vICAgYmVoYXZpb3IgLSBubyBzZWxlY3RlZCBjb252ZXJzYXRpb24gaW4gdGhlIGxlZnQgcGFuZSwgYnV0IGEgY29udmVyc2F0aW9uIHNob3dcbiAgICAgIC8vICAgaW4gdGhlIHJpZ2h0IHBhbmUuXG4gICAgICBpZiAoIWV4aXN0aW5nLmlzQXJjaGl2ZWQgJiYgZGF0YS5pc0FyY2hpdmVkKSB7XG4gICAgICAgIGtleXNUb09taXQucHVzaCgnc2VsZWN0ZWRDb252ZXJzYXRpb25JZCcpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWV4aXN0aW5nLmlzQmxvY2tlZCAmJiBkYXRhLmlzQmxvY2tlZCkge1xuICAgICAgICBrZXlzVG9PbWl0LnB1c2goJ2NvbnRhY3RTcG9vZmluZ1JldmlldycpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5vbWl0KHN0YXRlLCBrZXlzVG9PbWl0KSxcbiAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gICAgICBzaG93QXJjaGl2ZWQsXG4gICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uTG9va3VwLFxuICAgICAgICBbaWRdOiBkYXRhLFxuICAgICAgfSxcbiAgICAgIC4uLnVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoZGF0YSwgZXhpc3RpbmcsIHN0YXRlKSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NPTlZFUlNBVElPTl9SRU1PVkVEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgaWQgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IHN0YXRlO1xuICAgIGNvbnN0IGV4aXN0aW5nID0gZ2V0T3duKGNvbnZlcnNhdGlvbkxvb2t1cCwgaWQpO1xuXG4gICAgLy8gTm8gbmVlZCB0byBtYWtlIGEgY2hhbmdlIGlmIHdlIGRpZG4ndCBoYXZlIGEgcmVjb3JkIG9mIHRoaXMgY29udmVyc2F0aW9uIVxuICAgIGlmICghZXhpc3RpbmcpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb252ZXJzYXRpb25Mb29rdXA6IG9taXQoY29udmVyc2F0aW9uTG9va3VwLCBbaWRdKSxcbiAgICAgIC4uLnVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHModW5kZWZpbmVkLCBleGlzdGluZywgc3RhdGUpLFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ09OVkVSU0FUSU9OX1VOTE9BREVEJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgaWQgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uW2lkXTtcbiAgICBpZiAoIWV4aXN0aW5nQ29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyBtZXNzYWdlSWRzIH0gPSBleGlzdGluZ0NvbnZlcnNhdGlvbjtcbiAgICBjb25zdCBzZWxlY3RlZENvbnZlcnNhdGlvbklkID1cbiAgICAgIHN0YXRlLnNlbGVjdGVkQ29udmVyc2F0aW9uSWQgIT09IGlkXG4gICAgICAgID8gc3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZFxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5vbWl0KHN0YXRlLCAnY29udGFjdFNwb29maW5nUmV2aWV3JyksXG4gICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkLFxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25QYW5lbERlcHRoOiAwLFxuICAgICAgbWVzc2FnZXNMb29rdXA6IG9taXQoc3RhdGUubWVzc2FnZXNMb29rdXAsIG1lc3NhZ2VJZHMpLFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjogb21pdChzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLCBbaWRdKSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NPTlZFUlNBVElPTlNfUkVNT1ZFX0FMTCcpIHtcbiAgICByZXR1cm4gZ2V0RW1wdHlTdGF0ZSgpO1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NSRUFURV9HUk9VUF9QRU5ESU5HJykge1xuICAgIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuICAgIGlmIChjb21wb3Nlcj8uc3RlcCAhPT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEpIHtcbiAgICAgIC8vIFRoaXMgc2hvdWxkIGJlIHVubGlrZWx5LCBidXQgaXQgY2FuIGhhcHBlbiBpZiBzb21lb25lIGNsb3NlcyB0aGUgY29tcG9zZXIgd2hpbGVcbiAgICAgIC8vICAgYSBncm91cCBpcyBiZWluZyBjcmVhdGVkLlxuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb21wb3Nlcjoge1xuICAgICAgICAuLi5jb21wb3NlcixcbiAgICAgICAgaGFzRXJyb3I6IGZhbHNlLFxuICAgICAgICBpc0NyZWF0aW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NSRUFURV9HUk9VUF9GVUxGSUxMRUQnKSB7XG4gICAgLy8gV2UgZG9uJ3QgZG8gbXVjaCBoZXJlIGFuZCBpbnN0ZWFkIHJlbHkgb24gYHNob3dDb252ZXJzYXRpb25gIHRvIGRvIG1vc3Qgb2ZcbiAgICAvLyAgIHRoZSB3b3JrLlxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwOiBhY3Rpb24ucGF5bG9hZC5pbnZpdGVkVXVpZHMsXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdDUkVBVEVfR1JPVVBfUkVKRUNURUQnKSB7XG4gICAgY29uc3QgeyBjb21wb3NlciB9ID0gc3RhdGU7XG4gICAgaWYgKGNvbXBvc2VyPy5zdGVwICE9PSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YSkge1xuICAgICAgLy8gVGhpcyBzaG91bGQgYmUgdW5saWtlbHksIGJ1dCBpdCBjYW4gaGFwcGVuIGlmIHNvbWVvbmUgY2xvc2VzIHRoZSBjb21wb3NlciB3aGlsZVxuICAgICAgLy8gICBhIGdyb3VwIGlzIGJlaW5nIGNyZWF0ZWQuXG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgIC4uLmNvbXBvc2VyLFxuICAgICAgICBoYXNFcnJvcjogdHJ1ZSxcbiAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VUX1NFTEVDVEVEX0NPTlZFUlNBVElPTl9QQU5FTF9ERVBUSCcpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzZWxlY3RlZENvbnZlcnNhdGlvblBhbmVsRGVwdGg6IGFjdGlvbi5wYXlsb2FkLnBhbmVsRGVwdGgsXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdNRVNTQUdFX1NFTEVDVEVEJykge1xuICAgIGNvbnN0IHsgbWVzc2FnZUlkLCBjb252ZXJzYXRpb25JZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICBpZiAoc3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZCAhPT0gY29udmVyc2F0aW9uSWQpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzZWxlY3RlZE1lc3NhZ2U6IG1lc3NhZ2VJZCxcbiAgICAgIHNlbGVjdGVkTWVzc2FnZUNvdW50ZXI6IHN0YXRlLnNlbGVjdGVkTWVzc2FnZUNvdW50ZXIgKyAxLFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSBDT05WRVJTQVRJT05fU1RPUFBFRF9CWV9NSVNTSU5HX1ZFUklGSUNBVElPTikge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIHVudHJ1c3RlZFV1aWRzIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IHsgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uIH0gPSBzdGF0ZTtcbiAgICBjb25zdCBleGlzdGluZ1BlbmRpbmdTdGF0ZSA9IGdldE93bihcbiAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbixcbiAgICAgIGNvbnZlcnNhdGlvbklkXG4gICAgKTtcblxuICAgIGlmIChcbiAgICAgICFleGlzdGluZ1BlbmRpbmdTdGF0ZSB8fFxuICAgICAgZXhpc3RpbmdQZW5kaW5nU3RhdGUudHlwZSA9PT1cbiAgICAgICAgQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuVmVyaWZpY2F0aW9uQ2FuY2VsbGVkXG4gICAgKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgLi4udmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLFxuICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24gYXMgY29uc3QsXG4gICAgICAgICAgICB1dWlkc05lZWRpbmdWZXJpZmljYXRpb246IHVudHJ1c3RlZFV1aWRzLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWRzTmVlZGluZ1ZlcmlmaWNhdGlvbjogUmVhZG9ubHlBcnJheTxzdHJpbmc+ID0gQXJyYXkuZnJvbShcbiAgICAgIG5ldyBTZXQoW1xuICAgICAgICAuLi5leGlzdGluZ1BlbmRpbmdTdGF0ZS51dWlkc05lZWRpbmdWZXJpZmljYXRpb24sXG4gICAgICAgIC4uLnVudHJ1c3RlZFV1aWRzLFxuICAgICAgXSlcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLnZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24gYXMgY29uc3QsXG4gICAgICAgICAgdXVpZHNOZWVkaW5nVmVyaWZpY2F0aW9uLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ01FU1NBR0VfQ0hBTkdFRCcpIHtcbiAgICBjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCwgZGF0YSB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXTtcblxuICAgIC8vIFdlIGRvbid0IGtlZXAgdHJhY2sgb2YgbWVzc2FnZXMgdW5sZXNzIHRoZWlyIGNvbnZlcnNhdGlvbiBpcyBsb2FkZWQuLi5cbiAgICBpZiAoIWV4aXN0aW5nQ29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIC8vIC4uLmFuZCB3ZSd2ZSBhbHJlYWR5IGxvYWRlZCB0aGF0IG1lc3NhZ2Ugb25jZVxuICAgIGNvbnN0IGV4aXN0aW5nTWVzc2FnZSA9IGdldE93bihzdGF0ZS5tZXNzYWdlc0xvb2t1cCwgaWQpO1xuICAgIGlmICghZXhpc3RpbmdNZXNzYWdlKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgY29udmVyc2F0aW9uQXR0cnMgPSBzdGF0ZS5jb252ZXJzYXRpb25Mb29rdXBbY29udmVyc2F0aW9uSWRdO1xuICAgIGNvbnN0IGlzR3JvdXBTdG9yeVJlcGx5ID0gaXNHcm91cChjb252ZXJzYXRpb25BdHRycykgJiYgZGF0YS5zdG9yeUlkO1xuICAgIGlmIChpc0dyb3VwU3RvcnlSZXBseSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IHRvSW5jcmVtZW50ID0gZGF0YS5yZWFjdGlvbnM/Lmxlbmd0aCA/IDEgOiAwO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5zdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6XG4gICAgICAgICAgICAoZXhpc3RpbmdDb252ZXJzYXRpb24ubWVzc2FnZUNoYW5nZUNvdW50ZXIgfHwgMCkgKyB0b0luY3JlbWVudCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlc0xvb2t1cDoge1xuICAgICAgICAuLi5zdGF0ZS5tZXNzYWdlc0xvb2t1cCxcbiAgICAgICAgW2lkXToge1xuICAgICAgICAgIC4uLmRhdGEsXG4gICAgICAgICAgZGlzcGxheUxpbWl0OiBleGlzdGluZ01lc3NhZ2UuZGlzcGxheUxpbWl0LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ01FU1NBR0VfRVhQQU5ERUQnKSB7XG4gICAgY29uc3QgeyBpZCwgZGlzcGxheUxpbWl0IH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IGV4aXN0aW5nTWVzc2FnZSA9IHN0YXRlLm1lc3NhZ2VzTG9va3VwW2lkXTtcbiAgICBpZiAoIWV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgIC4uLnN0YXRlLm1lc3NhZ2VzTG9va3VwLFxuICAgICAgICBbaWRdOiB7XG4gICAgICAgICAgLi4uZXhpc3RpbmdNZXNzYWdlLFxuICAgICAgICAgIGRpc3BsYXlMaW1pdCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdNRVNTQUdFU19SRVNFVCcpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG1lc3NhZ2VzLFxuICAgICAgbWV0cmljcyxcbiAgICAgIHNjcm9sbFRvTWVzc2FnZUlkLFxuICAgICAgdW5ib3VuZGVkRmV0Y2gsXG4gICAgfSA9IGFjdGlvbi5wYXlsb2FkO1xuICAgIGNvbnN0IHsgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbiwgbWVzc2FnZXNMb29rdXAgfSA9IHN0YXRlO1xuXG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBtZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXTtcblxuICAgIGNvbnN0IGxvb2t1cCA9IGZyb21QYWlycyhtZXNzYWdlcy5tYXAobWVzc2FnZSA9PiBbbWVzc2FnZS5pZCwgbWVzc2FnZV0pKTtcbiAgICBjb25zdCBzb3J0ZWQgPSBvcmRlckJ5KFxuICAgICAgdmFsdWVzKGxvb2t1cCksXG4gICAgICBbJ3JlY2VpdmVkX2F0JywgJ3NlbnRfYXQnXSxcbiAgICAgIFsnQVNDJywgJ0FTQyddXG4gICAgKTtcblxuICAgIGxldCB7IG5ld2VzdCwgb2xkZXN0IH0gPSBtZXRyaWNzO1xuXG4gICAgLy8gSWYgb3VyIG1ldHJpY3MgYXJlIGEgbGl0dGxlIG91dCBvZiBkYXRlLCB3ZSdsbCBmaXggdGhlbSB1cFxuICAgIGlmIChzb3J0ZWQubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgZmlyc3QgPSBzb3J0ZWRbMF07XG4gICAgICBpZiAoZmlyc3QgJiYgKCFvbGRlc3QgfHwgZmlyc3QucmVjZWl2ZWRfYXQgPD0gb2xkZXN0LnJlY2VpdmVkX2F0KSkge1xuICAgICAgICBvbGRlc3QgPSBwaWNrKGZpcnN0LCBbJ2lkJywgJ3JlY2VpdmVkX2F0JywgJ3NlbnRfYXQnXSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxhc3QgPSBzb3J0ZWRbc29ydGVkLmxlbmd0aCAtIDFdO1xuICAgICAgaWYgKFxuICAgICAgICBsYXN0ICYmXG4gICAgICAgICghbmV3ZXN0IHx8IHVuYm91bmRlZEZldGNoIHx8IGxhc3QucmVjZWl2ZWRfYXQgPj0gbmV3ZXN0LnJlY2VpdmVkX2F0KVxuICAgICAgKSB7XG4gICAgICAgIG5ld2VzdCA9IHBpY2sobGFzdCwgWydpZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J10pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IG1lc3NhZ2VJZHMgPSBzb3J0ZWQubWFwKG1lc3NhZ2UgPT4gbWVzc2FnZS5pZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICAuLi4oc3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZCA9PT0gY29udmVyc2F0aW9uSWRcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBzZWxlY3RlZE1lc3NhZ2U6IHNjcm9sbFRvTWVzc2FnZUlkLFxuICAgICAgICAgICAgc2VsZWN0ZWRNZXNzYWdlQ291bnRlcjogc3RhdGUuc2VsZWN0ZWRNZXNzYWdlQ291bnRlciArIDEsXG4gICAgICAgICAgfVxuICAgICAgICA6IHt9KSxcbiAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgIC4uLm1lc3NhZ2VzTG9va3VwLFxuICAgICAgICAuLi5sb29rdXAsXG4gICAgICB9LFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6IDAsXG4gICAgICAgICAgc2Nyb2xsVG9NZXNzYWdlSWQsXG4gICAgICAgICAgc2Nyb2xsVG9NZXNzYWdlQ291bnRlcjogZXhpc3RpbmdDb252ZXJzYXRpb25cbiAgICAgICAgICAgID8gZXhpc3RpbmdDb252ZXJzYXRpb24uc2Nyb2xsVG9NZXNzYWdlQ291bnRlciArIDFcbiAgICAgICAgICAgIDogMCxcbiAgICAgICAgICBtZXNzYWdlSWRzLFxuICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgIC4uLm1ldHJpY3MsXG4gICAgICAgICAgICBuZXdlc3QsXG4gICAgICAgICAgICBvbGRlc3QsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfTUVTU0FHRV9MT0FESU5HX1NUQVRFJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIG1lc3NhZ2VMb2FkaW5nU3RhdGUgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCB7IG1lc3NhZ2VzQnlDb252ZXJzYXRpb24gfSA9IHN0YXRlO1xuICAgIGNvbnN0IGV4aXN0aW5nQ29udmVyc2F0aW9uID0gbWVzc2FnZXNCeUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF07XG5cbiAgICBpZiAoIWV4aXN0aW5nQ29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfTkVBUl9CT1RUT00nKSB7XG4gICAgY29uc3QgeyBwYXlsb2FkIH0gPSBhY3Rpb247XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCwgaXNOZWFyQm90dG9tIH0gPSBwYXlsb2FkO1xuXG4gICAgY29uc3QgeyBtZXNzYWdlc0J5Q29udmVyc2F0aW9uIH0gPSBzdGF0ZTtcbiAgICBjb25zdCBleGlzdGluZ0NvbnZlcnNhdGlvbiA9IG1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdO1xuXG4gICAgaWYgKFxuICAgICAgIWV4aXN0aW5nQ29udmVyc2F0aW9uIHx8XG4gICAgICBleGlzdGluZ0NvbnZlcnNhdGlvbi5pc05lYXJCb3R0b20gPT09IGlzTmVhckJvdHRvbVxuICAgICkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4ubWVzc2FnZXNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIC4uLmV4aXN0aW5nQ29udmVyc2F0aW9uLFxuICAgICAgICAgIGlzTmVhckJvdHRvbSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTQ1JPTExfVE9fTUVTU0FHRScpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkLCBtZXNzYWdlSWQgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCB7IG1lc3NhZ2VzQnlDb252ZXJzYXRpb24sIG1lc3NhZ2VzTG9va3VwIH0gPSBzdGF0ZTtcbiAgICBjb25zdCBleGlzdGluZ0NvbnZlcnNhdGlvbiA9IG1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdO1xuXG4gICAgaWYgKCFleGlzdGluZ0NvbnZlcnNhdGlvbikge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBpZiAoIW1lc3NhZ2VzTG9va3VwW21lc3NhZ2VJZF0pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgaWYgKCFleGlzdGluZ0NvbnZlcnNhdGlvbi5tZXNzYWdlSWRzLmluY2x1ZGVzKG1lc3NhZ2VJZCkpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzZWxlY3RlZE1lc3NhZ2U6IG1lc3NhZ2VJZCxcbiAgICAgIHNlbGVjdGVkTWVzc2FnZUNvdW50ZXI6IHN0YXRlLnNlbGVjdGVkTWVzc2FnZUNvdW50ZXIgKyAxLFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZTogdW5kZWZpbmVkLFxuICAgICAgICAgIHNjcm9sbFRvTWVzc2FnZUlkOiBtZXNzYWdlSWQsXG4gICAgICAgICAgc2Nyb2xsVG9NZXNzYWdlQ291bnRlcjpcbiAgICAgICAgICAgIGV4aXN0aW5nQ29udmVyc2F0aW9uLnNjcm9sbFRvTWVzc2FnZUNvdW50ZXIgKyAxLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ01FU1NBR0VfREVMRVRFRCcpIHtcbiAgICBjb25zdCB7IGlkLCBjb252ZXJzYXRpb25JZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgY29uc3QgeyBtZXNzYWdlc0J5Q29udmVyc2F0aW9uLCBtZXNzYWdlc0xvb2t1cCB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBleGlzdGluZ0NvbnZlcnNhdGlvbiA9IG1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdO1xuICAgIGlmICghZXhpc3RpbmdDb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICAvLyBBc3N1bWluZyB0aGF0IHdlIGFsd2F5cyBoYXZlIGNvbnRpZ3VvdXMgZ3JvdXBzIG9mIG1lc3NhZ2VzIGluIG1lbW9yeSwgdGhlIHJlbW92YWxcbiAgICAvLyAgIG9mIG9uZSBtZXNzYWdlIGF0IG9uZSBlbmQgb2Ygb3VyIG1lc3NhZ2Ugc2V0IGJlIHJlcGxhY2VkIHdpdGggdGhlIG1lc3NhZ2UgcmlnaHRcbiAgICAvLyAgIG5leHQgdG8gaXQuXG4gICAgY29uc3Qgb2xkSWRzID0gZXhpc3RpbmdDb252ZXJzYXRpb24ubWVzc2FnZUlkcztcbiAgICBsZXQgeyBuZXdlc3QsIG9sZGVzdCB9ID0gZXhpc3RpbmdDb252ZXJzYXRpb24ubWV0cmljcztcblxuICAgIGlmIChvbGRJZHMubGVuZ3RoID4gMSkge1xuICAgICAgY29uc3QgZmlyc3RJZCA9IG9sZElkc1swXTtcbiAgICAgIGNvbnN0IGxhc3RJZCA9IG9sZElkc1tvbGRJZHMubGVuZ3RoIC0gMV07XG5cbiAgICAgIGlmIChvbGRlc3QgJiYgb2xkZXN0LmlkID09PSBmaXJzdElkICYmIGZpcnN0SWQgPT09IGlkKSB7XG4gICAgICAgIGNvbnN0IHNlY29uZCA9IG1lc3NhZ2VzTG9va3VwW29sZElkc1sxXV07XG4gICAgICAgIG9sZGVzdCA9IHNlY29uZFxuICAgICAgICAgID8gcGljayhzZWNvbmQsIFsnaWQnLCAncmVjZWl2ZWRfYXQnLCAnc2VudF9hdCddKVxuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgfVxuICAgICAgaWYgKG5ld2VzdCAmJiBuZXdlc3QuaWQgPT09IGxhc3RJZCAmJiBsYXN0SWQgPT09IGlkKSB7XG4gICAgICAgIGNvbnN0IHBlbnVsdGltYXRlID0gbWVzc2FnZXNMb29rdXBbb2xkSWRzW29sZElkcy5sZW5ndGggLSAyXV07XG4gICAgICAgIG5ld2VzdCA9IHBlbnVsdGltYXRlXG4gICAgICAgICAgPyBwaWNrKHBlbnVsdGltYXRlLCBbJ2lkJywgJ3JlY2VpdmVkX2F0JywgJ3NlbnRfYXQnXSlcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAvLyBSZW1vdmluZyBpdCBmcm9tIG91ciBjYWNoZXNcbiAgICBjb25zdCBtZXNzYWdlSWRzID0gd2l0aG91dChleGlzdGluZ0NvbnZlcnNhdGlvbi5tZXNzYWdlSWRzLCBpZCk7XG5cbiAgICBsZXQgbWV0cmljcztcbiAgICBpZiAobWVzc2FnZUlkcy5sZW5ndGggPT09IDApIHtcbiAgICAgIG1ldHJpY3MgPSB7XG4gICAgICAgIHRvdGFsVW5zZWVuOiAwLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWV0cmljcyA9IHtcbiAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24ubWV0cmljcyxcbiAgICAgICAgb2xkZXN0LFxuICAgICAgICBuZXdlc3QsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1lc3NhZ2VzTG9va3VwOiBvbWl0KG1lc3NhZ2VzTG9va3VwLCBpZCksXG4gICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAuLi5leGlzdGluZ0NvbnZlcnNhdGlvbixcbiAgICAgICAgICBtZXNzYWdlSWRzLFxuICAgICAgICAgIG1ldHJpY3MsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdSRVBBSVJfTkVXRVNUX01FU1NBR0UnKSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgY29uc3QgeyBtZXNzYWdlc0J5Q29udmVyc2F0aW9uLCBtZXNzYWdlc0xvb2t1cCB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBleGlzdGluZ0NvbnZlcnNhdGlvbiA9IGdldE93bihtZXNzYWdlc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFleGlzdGluZ0NvbnZlcnNhdGlvbikge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbWVzc2FnZUlkcyB9ID0gZXhpc3RpbmdDb252ZXJzYXRpb247XG4gICAgY29uc3QgbGFzdElkID1cbiAgICAgIG1lc3NhZ2VJZHMgJiYgbWVzc2FnZUlkcy5sZW5ndGhcbiAgICAgICAgPyBtZXNzYWdlSWRzW21lc3NhZ2VJZHMubGVuZ3RoIC0gMV1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgbGFzdCA9IGxhc3RJZCA/IGdldE93bihtZXNzYWdlc0xvb2t1cCwgbGFzdElkKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBuZXdlc3QgPSBsYXN0XG4gICAgICA/IHBpY2sobGFzdCwgWydpZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J10pXG4gICAgICA6IHVuZGVmaW5lZDtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4ubWVzc2FnZXNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIC4uLmV4aXN0aW5nQ29udmVyc2F0aW9uLFxuICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgIC4uLmV4aXN0aW5nQ29udmVyc2F0aW9uLm1ldHJpY3MsXG4gICAgICAgICAgICBuZXdlc3QsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ1JFUEFJUl9PTERFU1RfTUVTU0FHRScpIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCB7IG1lc3NhZ2VzQnlDb252ZXJzYXRpb24sIG1lc3NhZ2VzTG9va3VwIH0gPSBzdGF0ZTtcblxuICAgIGNvbnN0IGV4aXN0aW5nQ29udmVyc2F0aW9uID0gZ2V0T3duKG1lc3NhZ2VzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIWV4aXN0aW5nQ29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyBtZXNzYWdlSWRzIH0gPSBleGlzdGluZ0NvbnZlcnNhdGlvbjtcbiAgICBjb25zdCBmaXJzdElkID0gbWVzc2FnZUlkcyAmJiBtZXNzYWdlSWRzLmxlbmd0aCA/IG1lc3NhZ2VJZHNbMF0gOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgZmlyc3QgPSBmaXJzdElkID8gZ2V0T3duKG1lc3NhZ2VzTG9va3VwLCBmaXJzdElkKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBvbGRlc3QgPSBmaXJzdFxuICAgICAgPyBwaWNrKGZpcnN0LCBbJ2lkJywgJ3JlY2VpdmVkX2F0JywgJ3NlbnRfYXQnXSlcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5tZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24sXG4gICAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24ubWV0cmljcyxcbiAgICAgICAgICAgIG9sZGVzdCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnUkVWSUVXX0dST1VQX01FTUJFUl9OQU1FX0NPTExJU0lPTicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb250YWN0U3Bvb2ZpbmdSZXZpZXc6IHtcbiAgICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGUsXG4gICAgICAgIC4uLmFjdGlvbi5wYXlsb2FkLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnUkVWSUVXX01FU1NBR0VfUkVRVUVTVF9OQU1FX0NPTExJU0lPTicpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb250YWN0U3Bvb2ZpbmdSZXZpZXc6IHtcbiAgICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5EaXJlY3RDb252ZXJzYXRpb25XaXRoU2FtZVRpdGxlLFxuICAgICAgICAuLi5hY3Rpb24ucGF5bG9hZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ01FU1NBR0VTX0FEREVEJykge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIGlzQWN0aXZlLCBpc0p1c3RTZW50LCBpc05ld01lc3NhZ2UsIG1lc3NhZ2VzIH0gPVxuICAgICAgYWN0aW9uLnBheWxvYWQ7XG4gICAgY29uc3QgeyBtZXNzYWdlc0J5Q29udmVyc2F0aW9uLCBtZXNzYWdlc0xvb2t1cCB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBleGlzdGluZ0NvbnZlcnNhdGlvbiA9IG1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdO1xuICAgIGlmICghZXhpc3RpbmdDb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBsZXQgeyBuZXdlc3QsIG9sZGVzdCwgb2xkZXN0VW5zZWVuLCB0b3RhbFVuc2VlbiB9ID1cbiAgICAgIGV4aXN0aW5nQ29udmVyc2F0aW9uLm1ldHJpY3M7XG5cbiAgICBpZiAobWVzc2FnZXMubGVuZ3RoIDwgMSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGxvb2t1cCA9IGZyb21QYWlycyhcbiAgICAgIGV4aXN0aW5nQ29udmVyc2F0aW9uLm1lc3NhZ2VJZHMubWFwKGlkID0+IFtpZCwgbWVzc2FnZXNMb29rdXBbaWRdXSlcbiAgICApO1xuICAgIG1lc3NhZ2VzLmZvckVhY2gobWVzc2FnZSA9PiB7XG4gICAgICBsb29rdXBbbWVzc2FnZS5pZF0gPSBtZXNzYWdlO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc29ydGVkID0gb3JkZXJCeShcbiAgICAgIHZhbHVlcyhsb29rdXApLFxuICAgICAgWydyZWNlaXZlZF9hdCcsICdzZW50X2F0J10sXG4gICAgICBbJ0FTQycsICdBU0MnXVxuICAgICk7XG4gICAgY29uc3QgbWVzc2FnZUlkcyA9IHNvcnRlZC5tYXAobWVzc2FnZSA9PiBtZXNzYWdlLmlkKTtcblxuICAgIGNvbnN0IGZpcnN0ID0gc29ydGVkWzBdO1xuICAgIGNvbnN0IGxhc3QgPSBzb3J0ZWRbc29ydGVkLmxlbmd0aCAtIDFdO1xuXG4gICAgaWYgKCFuZXdlc3QpIHtcbiAgICAgIG5ld2VzdCA9IHBpY2soZmlyc3QsIFsnaWQnLCAncmVjZWl2ZWRfYXQnLCAnc2VudF9hdCddKTtcbiAgICB9XG4gICAgaWYgKCFvbGRlc3QpIHtcbiAgICAgIG9sZGVzdCA9IHBpY2sobGFzdCwgWydpZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J10pO1xuICAgIH1cblxuICAgIGNvbnN0IGV4aXN0aW5nVG90YWwgPSBleGlzdGluZ0NvbnZlcnNhdGlvbi5tZXNzYWdlSWRzLmxlbmd0aDtcbiAgICBpZiAoaXNOZXdNZXNzYWdlICYmIGV4aXN0aW5nVG90YWwgPiAwKSB7XG4gICAgICBjb25zdCBsYXN0TWVzc2FnZUlkID0gZXhpc3RpbmdDb252ZXJzYXRpb24ubWVzc2FnZUlkc1tleGlzdGluZ1RvdGFsIC0gMV07XG5cbiAgICAgIC8vIElmIG91ciBtZXNzYWdlcyBpbiBtZW1vcnkgZG9uJ3QgaW5jbHVkZSB0aGUgbW9zdCByZWNlbnQgbWVzc2FnZXMsIHRoZW4gd2VcbiAgICAgIC8vICAgd29uJ3QgYWRkIG5ldyBtZXNzYWdlcyB0byBvdXIgbWVzc2FnZSBsaXN0LlxuICAgICAgY29uc3QgaGF2ZUxhdGVzdCA9IG5ld2VzdCAmJiBuZXdlc3QuaWQgPT09IGxhc3RNZXNzYWdlSWQ7XG4gICAgICBpZiAoIWhhdmVMYXRlc3QpIHtcbiAgICAgICAgaWYgKGlzSnVzdFNlbnQpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgICdyZWR1Y2VyL01FU1NBR0VTX0FEREVEOiBpc0p1c3RTZW50IGlzIHRydWUsIGJ1dCBoYXZlTGF0ZXN0IGlzIGZhbHNlJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIG9sZGVzdCBhbmQgbmV3ZXN0IGlmIHdlIHJlY2VpdmUgb2xkZXIvbmV3ZXJcbiAgICAvLyBtZXNzYWdlcyAob3IgZHVwbGljYXRlZCB0aW1lc3RhbXBzISlcbiAgICBpZiAoZmlyc3QgJiYgb2xkZXN0ICYmIGZpcnN0LnJlY2VpdmVkX2F0IDw9IG9sZGVzdC5yZWNlaXZlZF9hdCkge1xuICAgICAgb2xkZXN0ID0gcGljayhmaXJzdCwgWydpZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J10pO1xuICAgIH1cbiAgICBpZiAobGFzdCAmJiBuZXdlc3QgJiYgbGFzdC5yZWNlaXZlZF9hdCA+PSBuZXdlc3QucmVjZWl2ZWRfYXQpIHtcbiAgICAgIG5ld2VzdCA9IHBpY2sobGFzdCwgWydpZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J10pO1xuICAgIH1cblxuICAgIGNvbnN0IG5ld0lkcyA9IG1lc3NhZ2VzLm1hcChtZXNzYWdlID0+IG1lc3NhZ2UuaWQpO1xuICAgIGNvbnN0IG5ld01lc3NhZ2VJZHMgPSBkaWZmZXJlbmNlKG5ld0lkcywgZXhpc3RpbmdDb252ZXJzYXRpb24ubWVzc2FnZUlkcyk7XG4gICAgY29uc3QgeyBpc05lYXJCb3R0b20gfSA9IGV4aXN0aW5nQ29udmVyc2F0aW9uO1xuXG4gICAgaWYgKCghaXNOZWFyQm90dG9tIHx8ICFpc0FjdGl2ZSkgJiYgIW9sZGVzdFVuc2Vlbikge1xuICAgICAgY29uc3Qgb2xkZXN0SWQgPSBuZXdNZXNzYWdlSWRzLmZpbmQobWVzc2FnZUlkID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IGxvb2t1cFttZXNzYWdlSWRdO1xuXG4gICAgICAgIHJldHVybiBtZXNzYWdlICYmIGlzTWVzc2FnZVVucmVhZChtZXNzYWdlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpZiAob2xkZXN0SWQpIHtcbiAgICAgICAgb2xkZXN0VW5zZWVuID0gcGljayhsb29rdXBbb2xkZXN0SWRdLCBbXG4gICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAncmVjZWl2ZWRfYXQnLFxuICAgICAgICAgICdzZW50X2F0JyxcbiAgICAgICAgXSkgYXMgTWVzc2FnZVBvaW50ZXJUeXBlO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIElmIHRoaXMgaXMgYSBuZXcgaW5jb21pbmcgbWVzc2FnZSwgd2UnbGwgaW5jcmVtZW50IG91ciB0b3RhbFVuc2VlbiBjb3VudFxuICAgIGlmIChpc05ld01lc3NhZ2UgJiYgIWlzSnVzdFNlbnQgJiYgb2xkZXN0VW5zZWVuKSB7XG4gICAgICBjb25zdCBuZXdVbnJlYWQ6IG51bWJlciA9IG5ld01lc3NhZ2VJZHMucmVkdWNlKChzdW0sIG1lc3NhZ2VJZCkgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gbG9va3VwW21lc3NhZ2VJZF07XG5cbiAgICAgICAgcmV0dXJuIHN1bSArIChtZXNzYWdlICYmIGlzTWVzc2FnZVVucmVhZChtZXNzYWdlKSA/IDEgOiAwKTtcbiAgICAgIH0sIDApO1xuICAgICAgdG90YWxVbnNlZW4gPSAodG90YWxVbnNlZW4gfHwgMCkgKyBuZXdVbnJlYWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgbWVzc2FnZXNMb29rdXA6IHtcbiAgICAgICAgLi4ubWVzc2FnZXNMb29rdXAsXG4gICAgICAgIC4uLmxvb2t1cCxcbiAgICAgIH0sXG4gICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLm1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAuLi5leGlzdGluZ0NvbnZlcnNhdGlvbixcbiAgICAgICAgICBtZXNzYWdlSWRzLFxuICAgICAgICAgIG1lc3NhZ2VMb2FkaW5nU3RhdGU6IHVuZGVmaW5lZCxcbiAgICAgICAgICBzY3JvbGxUb01lc3NhZ2VJZDogaXNKdXN0U2VudCA/IGxhc3QuaWQgOiB1bmRlZmluZWQsXG4gICAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgICAgLi4uZXhpc3RpbmdDb252ZXJzYXRpb24ubWV0cmljcyxcbiAgICAgICAgICAgIG5ld2VzdCxcbiAgICAgICAgICAgIG9sZGVzdCxcbiAgICAgICAgICAgIHRvdGFsVW5zZWVuLFxuICAgICAgICAgICAgb2xkZXN0VW5zZWVuLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ0xFQVJfU0VMRUNURURfTUVTU0FHRScpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzZWxlY3RlZE1lc3NhZ2U6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ0NMRUFSX1VOUkVBRF9NRVRSSUNTJykge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IHBheWxvYWQ7XG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXTtcblxuICAgIGlmICghZXhpc3RpbmdDb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLnN0YXRlLm1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAuLi5leGlzdGluZ0NvbnZlcnNhdGlvbixcbiAgICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgICAuLi5leGlzdGluZ0NvbnZlcnNhdGlvbi5tZXRyaWNzLFxuICAgICAgICAgICAgb2xkZXN0VW5zZWVuOiB1bmRlZmluZWQsXG4gICAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VMRUNURURfQ09OVkVSU0FUSU9OX0NIQU5HRUQpIHtcbiAgICBjb25zdCB7IHBheWxvYWQgfSA9IGFjdGlvbjtcbiAgICBjb25zdCB7IGlkLCBtZXNzYWdlSWQsIHN3aXRjaFRvQXNzb2NpYXRlZFZpZXcgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICAuLi5vbWl0KHN0YXRlLCAnY29udGFjdFNwb29maW5nUmV2aWV3JyksXG4gICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkOiBpZCxcbiAgICAgIHNlbGVjdGVkTWVzc2FnZTogbWVzc2FnZUlkLFxuICAgIH07XG5cbiAgICBpZiAoc3dpdGNoVG9Bc3NvY2lhdGVkVmlldyAmJiBpZCkge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0T3duKHN0YXRlLmNvbnZlcnNhdGlvbkxvb2t1cCwgaWQpO1xuICAgICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLm9taXQobmV4dFN0YXRlLCAnY29tcG9zZXInKSxcbiAgICAgICAgc2hvd0FyY2hpdmVkOiBCb29sZWFuKGNvbnZlcnNhdGlvbi5pc0FyY2hpdmVkKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTSE9XX0lOQk9YJykge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5vbWl0KHN0YXRlLCAnY29tcG9zZXInKSxcbiAgICAgIHNob3dBcmNoaXZlZDogZmFsc2UsXG4gICAgfTtcbiAgfVxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTSE9XX0FSQ0hJVkVEX0NPTlZFUlNBVElPTlMnKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLm9taXQoc3RhdGUsICdjb21wb3NlcicpLFxuICAgICAgc2hvd0FyY2hpdmVkOiB0cnVlLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfQ09OVkVSU0FUSU9OX0hFQURFUl9USVRMRScpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzZWxlY3RlZENvbnZlcnNhdGlvblRpdGxlOiBhY3Rpb24ucGF5bG9hZC50aXRsZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VUX1JFQ0VOVF9NRURJQV9JVEVNUycpIHtcbiAgICBjb25zdCB7IGlkLCByZWNlbnRNZWRpYUl0ZW1zIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbkxvb2t1cCB9ID0gc3RhdGU7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25EYXRhID0gY29udmVyc2F0aW9uTG9va3VwW2lkXTtcblxuICAgIGlmICghY29udmVyc2F0aW9uRGF0YSkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGRhdGEgPSB7XG4gICAgICAuLi5jb252ZXJzYXRpb25EYXRhLFxuICAgICAgcmVjZW50TWVkaWFJdGVtcyxcbiAgICB9O1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgIC4uLmNvbnZlcnNhdGlvbkxvb2t1cCxcbiAgICAgICAgW2lkXTogZGF0YSxcbiAgICAgIH0sXG4gICAgICAuLi51cGRhdGVDb252ZXJzYXRpb25Mb29rdXBzKGRhdGEsIHVuZGVmaW5lZCwgc3RhdGUpLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTVEFSVF9DT01QT1NJTkcnKSB7XG4gICAgaWYgKHN0YXRlLmNvbXBvc2VyPy5zdGVwID09PSBDb21wb3NlclN0ZXAuU3RhcnREaXJlY3RDb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBzaG93QXJjaGl2ZWQ6IGZhbHNlLFxuICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgc3RlcDogQ29tcG9zZXJTdGVwLlN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uLFxuICAgICAgICBzZWFyY2hUZXJtOiAnJyxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IHt9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0hPV19DSE9PU0VfR1JPVVBfTUVNQkVSUycpIHtcbiAgICBsZXQgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IEFycmF5PHN0cmluZz47XG4gICAgbGV0IHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGU7XG4gICAgbGV0IG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZTtcbiAgICBsZXQgZ3JvdXBOYW1lOiBzdHJpbmc7XG4gICAgbGV0IGdyb3VwQXZhdGFyOiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICAgIGxldCBncm91cEV4cGlyZVRpbWVyOiBudW1iZXI7XG4gICAgbGV0IHVzZXJBdmF0YXJEYXRhID0gZ2V0RGVmYXVsdEF2YXRhcnModHJ1ZSk7XG5cbiAgICBzd2l0Y2ggKHN0YXRlLmNvbXBvc2VyPy5zdGVwKSB7XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGE6XG4gICAgICAgICh7XG4gICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgICAgICAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgICAgIGdyb3VwTmFtZSxcbiAgICAgICAgICBncm91cEF2YXRhcixcbiAgICAgICAgICBncm91cEV4cGlyZVRpbWVyLFxuICAgICAgICAgIHVzZXJBdmF0YXJEYXRhLFxuICAgICAgICB9ID0gc3RhdGUuY29tcG9zZXIpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzID0gW107XG4gICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZSA9IE9uZVRpbWVNb2RhbFN0YXRlLk5ldmVyU2hvd247XG4gICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlID0gT25lVGltZU1vZGFsU3RhdGUuTmV2ZXJTaG93bjtcbiAgICAgICAgZ3JvdXBOYW1lID0gJyc7XG4gICAgICAgIGdyb3VwRXhwaXJlVGltZXIgPSB1bml2ZXJzYWxFeHBpcmVUaW1lci5nZXQoKTtcbiAgICAgICAgYnJlYWs7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgc2hvd0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgIHN0ZXA6IENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnMsXG4gICAgICAgIHNlYXJjaFRlcm06ICcnLFxuICAgICAgICB1dWlkRmV0Y2hTdGF0ZToge30sXG4gICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLFxuICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgICBncm91cE5hbWUsXG4gICAgICAgIGdyb3VwQXZhdGFyLFxuICAgICAgICBncm91cEV4cGlyZVRpbWVyLFxuICAgICAgICB1c2VyQXZhdGFyRGF0YSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ1NUQVJUX1NFVFRJTkdfR1JPVVBfTUVUQURBVEEnKSB7XG4gICAgY29uc3QgeyBjb21wb3NlciB9ID0gc3RhdGU7XG5cbiAgICBzd2l0Y2ggKGNvbXBvc2VyPy5zdGVwKSB7XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgc2hvd0FyY2hpdmVkOiBmYWxzZSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgc3RlcDogQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEsXG4gICAgICAgICAgICBpc0VkaXRpbmdBdmF0YXI6IGZhbHNlLFxuICAgICAgICAgICAgaXNDcmVhdGluZzogZmFsc2UsXG4gICAgICAgICAgICBoYXNFcnJvcjogZmFsc2UsXG4gICAgICAgICAgICAuLi5waWNrKGNvbXBvc2VyLCBbXG4gICAgICAgICAgICAgICdncm91cEF2YXRhcicsXG4gICAgICAgICAgICAgICdncm91cE5hbWUnLFxuICAgICAgICAgICAgICAnZ3JvdXBFeHBpcmVUaW1lcicsXG4gICAgICAgICAgICAgICdtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZScsXG4gICAgICAgICAgICAgICdyZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUnLFxuICAgICAgICAgICAgICAnc2VsZWN0ZWRDb252ZXJzYXRpb25JZHMnLFxuICAgICAgICAgICAgICAndXNlckF2YXRhckRhdGEnLFxuICAgICAgICAgICAgXSksXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGE6XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnQ2Fubm90IHRyYW5zaXRpb24gdG8gc2V0dGluZyBncm91cCBtZXRhZGF0YSBmcm9tIHRoaXMgc3RhdGUnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfQ09NUE9TRV9HUk9VUF9BVkFUQVInKSB7XG4gICAgY29uc3QgeyBjb21wb3NlciB9ID0gc3RhdGU7XG5cbiAgICBzd2l0Y2ggKGNvbXBvc2VyPy5zdGVwKSB7XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5jb21wb3NlcixcbiAgICAgICAgICAgIGdyb3VwQXZhdGFyOiBhY3Rpb24ucGF5bG9hZC5ncm91cEF2YXRhcixcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXNzZXJ0KGZhbHNlLCAnU2V0dGluZyBjb21wb3NlIGdyb3VwIGF2YXRhciBhdCB0aGlzIHN0ZXAgaXMgYSBuby1vcCcpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnU0VUX0NPTVBPU0VfR1JPVVBfTkFNRScpIHtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBzdGF0ZTtcblxuICAgIHN3aXRjaCAoY29tcG9zZXI/LnN0ZXApIHtcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLkNob29zZUdyb3VwTWVtYmVyczpcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGE6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmNvbXBvc2VyLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiBhY3Rpb24ucGF5bG9hZC5ncm91cE5hbWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChmYWxzZSwgJ1NldHRpbmcgY29tcG9zZSBncm91cCBuYW1lIGF0IHRoaXMgc3RlcCBpcyBhIG5vLW9wJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfQ09NUE9TRV9HUk9VUF9FWFBJUkVfVElNRVInKSB7XG4gICAgY29uc3QgeyBjb21wb3NlciB9ID0gc3RhdGU7XG5cbiAgICBzd2l0Y2ggKGNvbXBvc2VyPy5zdGVwKSB7XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICBjYXNlIENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhOlxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnN0YXRlLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5jb21wb3NlcixcbiAgICAgICAgICAgIGdyb3VwRXhwaXJlVGltZXI6IGFjdGlvbi5wYXlsb2FkLmdyb3VwRXhwaXJlVGltZXIsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChmYWxzZSwgJ1NldHRpbmcgY29tcG9zZSBncm91cCBuYW1lIGF0IHRoaXMgc3RlcCBpcyBhIG5vLW9wJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09ICdTRVRfQ09NUE9TRV9TRUFSQ0hfVEVSTScpIHtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBzdGF0ZTtcbiAgICBpZiAoIWNvbXBvc2VyKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGZhbHNlLFxuICAgICAgICAnU2V0dGluZyBjb21wb3NlIHNlYXJjaCB0ZXJtIHdpdGggdGhlIGNvbXBvc2VyIGNsb3NlZCBpcyBhIG5vLW9wJ1xuICAgICAgKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgY29tcG9zZXIuc3RlcCAhPT0gQ29tcG9zZXJTdGVwLlN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uICYmXG4gICAgICBjb21wb3Nlci5zdGVwICE9PSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzXG4gICAgKSB7XG4gICAgICBhc3NlcnQoXG4gICAgICAgIGZhbHNlLFxuICAgICAgICBgU2V0dGluZyBjb21wb3NlIHNlYXJjaCB0ZXJtIGF0IHN0ZXAgJHtjb21wb3Nlci5zdGVwfSBpcyBhIG5vLW9wYFxuICAgICAgKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb21wb3Nlcjoge1xuICAgICAgICAuLi5jb21wb3NlcixcbiAgICAgICAgc2VhcmNoVGVybTogYWN0aW9uLnBheWxvYWQuc2VhcmNoVGVybSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gJ1NFVF9JU19GRVRDSElOR19VVUlEJykge1xuICAgIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuICAgIGlmICghY29tcG9zZXIpIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgICdTZXR0aW5nIGNvbXBvc2UgdXVpZCBmZXRjaCBzdGF0ZSB3aXRoIHRoZSBjb21wb3NlciBjbG9zZWQgaXMgYSBuby1vcCdcbiAgICAgICk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICAgIGlmIChcbiAgICAgIGNvbXBvc2VyLnN0ZXAgIT09IENvbXBvc2VyU3RlcC5TdGFydERpcmVjdENvbnZlcnNhdGlvbiAmJlxuICAgICAgY29tcG9zZXIuc3RlcCAhPT0gQ29tcG9zZXJTdGVwLkNob29zZUdyb3VwTWVtYmVyc1xuICAgICkge1xuICAgICAgYXNzZXJ0KGZhbHNlLCAnU2V0dGluZyBjb21wb3NlIHV1aWQgZmV0Y2ggc3RhdGUgYXQgdGhpcyBzdGVwIGlzIGEgbm8tb3AnKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gICAgY29uc3QgeyBpZGVudGlmaWVyLCBpc0ZldGNoaW5nIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IHsgdXVpZEZldGNoU3RhdGUgfSA9IGNvbXBvc2VyO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgLi4uY29tcG9zZXIsXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiBpc0ZldGNoaW5nXG4gICAgICAgICAgPyB7XG4gICAgICAgICAgICAgIC4uLmNvbXBvc2VyLnV1aWRGZXRjaFN0YXRlLFxuICAgICAgICAgICAgICBbaWRlbnRpZmllcl06IGlzRmV0Y2hpbmcsXG4gICAgICAgICAgICB9XG4gICAgICAgICAgOiBvbWl0KHV1aWRGZXRjaFN0YXRlLCBpZGVudGlmaWVyKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ09NUE9TRV9UT0dHTEVfRURJVElOR19BVkFUQVIpIHtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBzdGF0ZTtcblxuICAgIHN3aXRjaCAoY29tcG9zZXI/LnN0ZXApIHtcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGE6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmNvbXBvc2VyLFxuICAgICAgICAgICAgaXNFZGl0aW5nQXZhdGFyOiAhY29tcG9zZXIuaXNFZGl0aW5nQXZhdGFyLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhc3NlcnQoZmFsc2UsICdTZXR0aW5nIGVkaXRpbmcgYXZhdGFyIGF0IHRoaXMgc3RlcCBpcyBhIG5vLW9wJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IENPTVBPU0VfQUREX0FWQVRBUikge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuXG4gICAgc3dpdGNoIChjb21wb3Nlcj8uc3RlcCkge1xuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzOlxuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YTpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uY29tcG9zZXIsXG4gICAgICAgICAgICB1c2VyQXZhdGFyRGF0YTogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgICAgICAgICBpZDogZ2V0TmV4dEF2YXRhcklkKGNvbXBvc2VyLnVzZXJBdmF0YXJEYXRhKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgLi4uY29tcG9zZXIudXNlckF2YXRhckRhdGEsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBhc3NlcnQoZmFsc2UsICdBZGRpbmcgYW4gYXZhdGFyIGF0IHRoaXMgc3RlcCBpcyBhIG5vLW9wJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IENPTVBPU0VfUkVNT1ZFX0FWQVRBUikge1xuICAgIGNvbnN0IHsgcGF5bG9hZCB9ID0gYWN0aW9uO1xuICAgIGNvbnN0IHsgY29tcG9zZXIgfSA9IHN0YXRlO1xuXG4gICAgc3dpdGNoIChjb21wb3Nlcj8uc3RlcCkge1xuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzOlxuICAgICAgY2FzZSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YTpcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAuLi5zdGF0ZSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uY29tcG9zZXIsXG4gICAgICAgICAgICB1c2VyQXZhdGFyRGF0YTogZmlsdGVyQXZhdGFyRGF0YShjb21wb3Nlci51c2VyQXZhdGFyRGF0YSwgcGF5bG9hZCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIGFzc2VydChmYWxzZSwgJ1JlbW92aW5nIGFuIGF2YXRhciBhdCB0aGlzIHN0ZXAgaXMgYSBuby1vcCcpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBDT01QT1NFX1JFUExBQ0VfQVZBVEFSKSB7XG4gICAgY29uc3QgeyBjdXJyLCBwcmV2IH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBzdGF0ZTtcblxuICAgIHN3aXRjaCAoY29tcG9zZXI/LnN0ZXApIHtcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLkNob29zZUdyb3VwTWVtYmVyczpcbiAgICAgIGNhc2UgQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGE6XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgLi4uc3RhdGUsXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmNvbXBvc2VyLFxuICAgICAgICAgICAgdXNlckF2YXRhckRhdGE6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIC4uLmN1cnIsXG4gICAgICAgICAgICAgICAgaWQ6IHByZXY/LmlkID8/IGdldE5leHRBdmF0YXJJZChjb21wb3Nlci51c2VyQXZhdGFyRGF0YSksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIC4uLihwcmV2XG4gICAgICAgICAgICAgICAgPyBmaWx0ZXJBdmF0YXJEYXRhKGNvbXBvc2VyLnVzZXJBdmF0YXJEYXRhLCBwcmV2KVxuICAgICAgICAgICAgICAgIDogY29tcG9zZXIudXNlckF2YXRhckRhdGEpLFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgYXNzZXJ0KGZhbHNlLCAnUmVwbGFjaW5nIGFuIGF2YXRhciBhdCB0aGlzIHN0ZXAgaXMgYSBuby1vcCcpO1xuICAgICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnVE9HR0xFX0NPTlZFUlNBVElPTl9JTl9DSE9PU0VfTUVNQkVSUycpIHtcbiAgICBjb25zdCB7IGNvbXBvc2VyIH0gPSBzdGF0ZTtcbiAgICBpZiAoY29tcG9zZXI/LnN0ZXAgIT09IENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnMpIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZmFsc2UsXG4gICAgICAgICdUb2dnbGluZyBjb252ZXJzYXRpb24gbWVtYmVycyBpcyBhIG5vLW9wIGluIHRoaXMgY29tcG9zZXIgc3RlcCdcbiAgICAgICk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgLi4uY29tcG9zZXIsXG4gICAgICAgIC4uLnRvZ2dsZVNlbGVjdGVkQ29udGFjdEZvckdyb3VwQWRkaXRpb24oXG4gICAgICAgICAgYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICAgICAge1xuICAgICAgICAgICAgbWF4R3JvdXBTaXplOiBhY3Rpb24ucGF5bG9hZC5tYXhHcm91cFNpemUsXG4gICAgICAgICAgICBtYXhSZWNvbW1lbmRlZEdyb3VwU2l6ZTogYWN0aW9uLnBheWxvYWQubWF4UmVjb21tZW5kZWRHcm91cFNpemUsXG4gICAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogY29tcG9zZXIubWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gICAgICAgICAgICAvLyBXZSBzYXkgeW91J3JlIGFscmVhZHkgaW4gdGhlIGdyb3VwLCBldmVuIHRob3VnaCBpdCBoYXNuJ3QgYmVlbiBjcmVhdGVkIHlldC5cbiAgICAgICAgICAgIG51bWJlck9mQ29udGFjdHNBbHJlYWR5SW5Hcm91cDogMSxcbiAgICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTpcbiAgICAgICAgICAgICAgY29tcG9zZXIucmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlLFxuICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IGNvbXBvc2VyLnNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLFxuICAgICAgICAgIH1cbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ09MT1JTX0NIQU5HRUQpIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbkxvb2t1cCB9ID0gc3RhdGU7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Db2xvciwgY3VzdG9tQ29sb3JEYXRhIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IG5leHRTdGF0ZSA9IHtcbiAgICAgIC4uLnN0YXRlLFxuICAgIH07XG5cbiAgICBPYmplY3Qua2V5cyhjb252ZXJzYXRpb25Mb29rdXApLmZvckVhY2goaWQgPT4ge1xuICAgICAgY29uc3QgZXhpc3RpbmcgPSBjb252ZXJzYXRpb25Mb29rdXBbaWRdO1xuICAgICAgY29uc3QgYWRkZWQgPSB7XG4gICAgICAgIC4uLmV4aXN0aW5nLFxuICAgICAgICBjb252ZXJzYXRpb25Db2xvcixcbiAgICAgICAgY3VzdG9tQ29sb3I6IGN1c3RvbUNvbG9yRGF0YT8udmFsdWUsXG4gICAgICAgIGN1c3RvbUNvbG9ySWQ6IGN1c3RvbUNvbG9yRGF0YT8uaWQsXG4gICAgICB9O1xuXG4gICAgICBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXh0U3RhdGUsXG4gICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoYWRkZWQsIGV4aXN0aW5nLCBuZXh0U3RhdGUpLFxuICAgICAgICB7XG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAuLi5uZXh0U3RhdGUuY29udmVyc2F0aW9uTG9va3VwLFxuICAgICAgICAgICAgW2lkXTogYWRkZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIHJldHVybiBuZXh0U3RhdGU7XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IENPTE9SX1NFTEVDVEVEKSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIGNvbnZlcnNhdGlvbkNvbG9yLCBjdXN0b21Db2xvckRhdGEgfSA9XG4gICAgICBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IGV4aXN0aW5nID0gY29udmVyc2F0aW9uTG9va3VwW2NvbnZlcnNhdGlvbklkXTtcbiAgICBpZiAoIWV4aXN0aW5nKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgY2hhbmdlZCA9IHtcbiAgICAgIC4uLmV4aXN0aW5nLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcjogY3VzdG9tQ29sb3JEYXRhPy52YWx1ZSxcbiAgICAgIGN1c3RvbUNvbG9ySWQ6IGN1c3RvbUNvbG9yRGF0YT8uaWQsXG4gICAgfTtcblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAuLi5jb252ZXJzYXRpb25Mb29rdXAsXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IGNoYW5nZWQsXG4gICAgICB9LFxuICAgICAgLi4udXBkYXRlQ29udmVyc2F0aW9uTG9va3VwcyhjaGFuZ2VkLCBleGlzdGluZywgc3RhdGUpLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IENVU1RPTV9DT0xPUl9SRU1PVkVEKSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgY29sb3JJZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICBjb25zdCBuZXh0U3RhdGUgPSB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICB9O1xuXG4gICAgT2JqZWN0LmtleXMoY29udmVyc2F0aW9uTG9va3VwKS5mb3JFYWNoKGlkID0+IHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nID0gY29udmVyc2F0aW9uTG9va3VwW2lkXTtcblxuICAgICAgaWYgKGV4aXN0aW5nLmN1c3RvbUNvbG9ySWQgIT09IGNvbG9ySWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjaGFuZ2VkID0ge1xuICAgICAgICAuLi5leGlzdGluZyxcbiAgICAgICAgY29udmVyc2F0aW9uQ29sb3I6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VzdG9tQ29sb3I6IHVuZGVmaW5lZCxcbiAgICAgICAgY3VzdG9tQ29sb3JJZDogdW5kZWZpbmVkLFxuICAgICAgfTtcblxuICAgICAgT2JqZWN0LmFzc2lnbihcbiAgICAgICAgbmV4dFN0YXRlLFxuICAgICAgICB1cGRhdGVDb252ZXJzYXRpb25Mb29rdXBzKGNoYW5nZWQsIGV4aXN0aW5nLCBuZXh0U3RhdGUpLFxuICAgICAgICB7XG4gICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAuLi5uZXh0U3RhdGUuY29udmVyc2F0aW9uTG9va3VwLFxuICAgICAgICAgICAgW2lkXTogY2hhbmdlZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5leHRTdGF0ZTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUkVQTEFDRV9BVkFUQVJTKSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Mb29rdXAgfSA9IHN0YXRlO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIGF2YXRhcnMgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uTG9va3VwW2NvbnZlcnNhdGlvbklkXTtcbiAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGNoYW5nZWQgPSB7XG4gICAgICAuLi5jb252ZXJzYXRpb24sXG4gICAgICBhdmF0YXJzLFxuICAgIH07XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjb252ZXJzYXRpb25Mb29rdXA6IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uTG9va3VwLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiBjaGFuZ2VkLFxuICAgICAgfSxcbiAgICAgIC4uLnVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoY2hhbmdlZCwgY29udmVyc2F0aW9uLCBzdGF0ZSksXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVVBEQVRFX1VTRVJOQU1FX1NBVkVfU1RBVEUpIHtcbiAgICBjb25zdCB7IG5ld1NhdmVTdGF0ZSB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICB1c2VybmFtZVNhdmVTdGF0ZTogbmV3U2F2ZVN0YXRlLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gc3RhdGU7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EscUJBQW1CO0FBRW5CLG9CQVFPO0FBR1AsYUFBd0I7QUFDeEIsVUFBcUI7QUFDckIscUJBQXdCO0FBQ3hCLG9CQUF1QjtBQUN2QixvQkFBcUM7QUFDckMsMkJBQXNDO0FBRXRDLDBCQUE0QztBQUM1QyxzQkFBeUI7QUFpQnpCLHFCQUF5QjtBQUd6QixvQkFHTztBQUNQLDZCQUFnQztBQUNoQyxtREFBc0Q7QUFFdEQsNkJBQW9DO0FBQ3BDLDBCQUE2QjtBQUM3QiwyQkFBOEI7QUFDOUIsMkJBS087QUFFUCxvQkFBa0M7QUFDbEMsMkJBQThCO0FBQzlCLDhCQUFpQztBQUNqQyxvQ0FBdUM7QUFDdkMsZ0NBS087QUFDUCx1QkFBMEI7QUFDMUIseUNBQTRDO0FBQzVDLDZCQUFnQztBQUdoQyxrQ0FBcUM7QUFFckMsb0NBQXdCO0FBQ3hCLDhCQUFpQztBQVcxQixNQUFNLG1CQUFtQixDQUFDLFNBQVMsVUFBVTtBQVU3QyxNQUFNLG9CQUFvQixDQUFDLFVBQVUsT0FBTztBQXdQNUMsTUFBTSwwQkFBMEIsd0JBQ3JDLGlCQUNhO0FBQ2IsTUFDRSxhQUFhLFFBQ2IsYUFBYSxhQUNiLGFBQWEsUUFDYixDQUFDLGFBQWEsd0JBQ2Q7QUFDQSxXQUFPLHdCQUFTO0FBQUEsRUFDbEI7QUFFQSxNQUFJLGFBQWEsU0FBUyxVQUFVO0FBQ2xDLFdBQU8sd0JBQVM7QUFB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
