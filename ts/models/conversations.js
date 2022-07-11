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
  ConversationModel: () => ConversationModel
});
module.exports = __toCommonJS(conversations_exports);
var import_lodash = require("lodash");
var import_react_redux = require("react-redux");
var import_p_queue = __toESM(require("p-queue"));
var import_uuid = require("uuid");
var import_getInitials = require("../util/getInitials");
var import_normalizeUuid = require("../util/normalizeUuid");
var import_libphonenumberUtil = require("../util/libphonenumberUtil");
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_Attachment = require("../types/Attachment");
var import_Calling = require("../types/Calling");
var EmbeddedContact = __toESM(require("../types/EmbeddedContact"));
var Conversation = __toESM(require("../types/Conversation"));
var Stickers = __toESM(require("../types/Stickers"));
var import_TaskWithTimeout = __toESM(require("../textsecure/TaskWithTimeout"));
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
var import_helpers = require("../messages/helpers");
var import_assert = require("../util/assert");
var import_isConversationMuted = require("../util/isConversationMuted");
var import_isConversationSMSOnly = require("../util/isConversationSMSOnly");
var import_isConversationUnregistered = require("../util/isConversationUnregistered");
var import_missingCaseError = require("../util/missingCaseError");
var import_sniffImageMimeType = require("../util/sniffImageMimeType");
var import_isValidE164 = require("../util/isValidE164");
var import_MIME = require("../types/MIME");
var import_UUID = require("../types/UUID");
var import_Crypto = require("../Crypto");
var Bytes = __toESM(require("../Bytes"));
var import_getTextWithMentions = require("../util/getTextWithMentions");
var import_migrateColor = require("../util/migrateColor");
var import_isNotNil = require("../util/isNotNil");
var import_dropNull = require("../util/dropNull");
var import_notifications = require("../services/notifications");
var import_getSendOptions = require("../util/getSendOptions");
var import_isConversationAccepted = require("../util/isConversationAccepted");
var import_markConversationRead = require("../util/markConversationRead");
var import_handleMessageSend = require("../util/handleMessageSend");
var import_getConversationMembers = require("../util/getConversationMembers");
var import_updateConversationsWithUuidLookup = require("../updateConversationsWithUuidLookup");
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_MessageSendState = require("../messages/MessageSendState");
var durations = __toESM(require("../util/durations"));
var import_iterables = require("../util/iterables");
var universalExpireTimer = __toESM(require("../util/universalExpireTimer"));
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_protobuf = require("../protobuf");
var import_message = require("../state/selectors/message");
var import_conversationJobQueue = require("../jobs/conversationJobQueue");
var import_readReceiptsJobQueue = require("../jobs/readReceiptsJobQueue");
var import_Deletes = require("../messageModifiers/Deletes");
var import_isAnnouncementGroupReady = require("../util/isAnnouncementGroupReady");
var import_getProfile = require("../util/getProfile");
var import_SealedSender = require("../types/SealedSender");
var import_getAvatarData = require("../util/getAvatarData");
var import_createIdenticon = require("../util/createIdenticon");
var log = __toESM(require("../logging/log"));
var Errors = __toESM(require("../types/errors"));
var import_isMessageUnread = require("../util/isMessageUnread");
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var import_timelineUtil = require("../util/timelineUtil");
var import_MessageSeenStatus = require("../MessageSeenStatus");
var import_idForLogging = require("../util/idForLogging");
window.Whisper = window.Whisper || {};
const { Services, Util } = window.Signal;
const { Message } = window.Signal.Types;
const {
  deleteAttachmentData,
  doesAttachmentExist,
  getAbsoluteAttachmentPath,
  loadAttachmentData,
  readStickerData,
  upgradeMessageSchema,
  writeNewAttachmentData
} = window.Signal.Migrations;
const {
  addStickerPackReference,
  getConversationRangeCenteredOnMessage,
  getOlderMessagesByConversation,
  getMessageMetricsForConversation,
  getMessageById,
  getNewerMessagesByConversation
} = window.Signal.Data;
const THREE_HOURS = durations.HOUR * 3;
const FIVE_MINUTES = durations.MINUTE * 5;
const JOB_REPORTING_THRESHOLD_MS = 25;
const SEND_REPORTING_THRESHOLD_MS = 25;
const MESSAGE_LOAD_CHUNK_SIZE = 30;
const ATTRIBUTES_THAT_DONT_INVALIDATE_PROPS_CACHE = /* @__PURE__ */ new Set([
  "lastProfile",
  "profileLastFetchedAt",
  "needsStorageServiceSync",
  "storageID",
  "storageVersion",
  "storageUnknownFields"
]);
class ConversationModel extends window.Backbone.Model {
  constructor() {
    super(...arguments);
    this.intlCollator = new Intl.Collator(void 0, { sensitivity: "base" });
    this.isInReduxBatch = false;
  }
  defaults() {
    return {
      unreadCount: 0,
      verified: window.textsecure.storage.protocol.VerifiedStatus.DEFAULT,
      messageCount: 0,
      sentMessageCount: 0
    };
  }
  idForLogging() {
    return (0, import_idForLogging.getConversationIdForLogging)(this.attributes);
  }
  getSendTarget() {
    return this.get("uuid") || this.get("e164");
  }
  getContactCollection() {
    const collection = new window.Backbone.Collection();
    const collator = new Intl.Collator(void 0, { sensitivity: "base" });
    collection.comparator = (left, right) => {
      return collator.compare(left.getTitle(), right.getTitle());
    };
    return collection;
  }
  initialize(attributes = {}) {
    const uuid = this.get("uuid");
    const normalizedUuid = uuid && (0, import_normalizeUuid.normalizeUuid)(uuid, "ConversationModel.initialize");
    if (uuid && normalizedUuid !== uuid) {
      log.warn(`ConversationModel.initialize: normalizing uuid from ${uuid} to ${normalizedUuid}`);
      this.set("uuid", normalizedUuid);
    }
    if ((0, import_isValidE164.isValidE164)(attributes.id, false)) {
      this.set({ id: import_UUID.UUID.generate().toString(), e164: attributes.id });
    }
    this.storeName = "conversations";
    this.verifiedEnum = window.textsecure.storage.protocol.VerifiedStatus;
    this.initialPromise = Promise.resolve();
    this.throttledBumpTyping = (0, import_lodash.throttle)(this.bumpTyping, 300);
    this.debouncedUpdateLastMessage = (0, import_lodash.debounce)(this.updateLastMessage.bind(this), 200);
    this.throttledUpdateSharedGroups = this.throttledUpdateSharedGroups || (0, import_lodash.throttle)(this.updateSharedGroups.bind(this), FIVE_MINUTES);
    this.contactCollection = this.getContactCollection();
    this.contactCollection.on("change:name change:profileName change:profileFamilyName change:e164", this.debouncedUpdateLastMessage, this);
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      this.contactCollection.on("change:verified", this.onMemberVerifiedChange.bind(this));
    }
    this.on("newmessage", this.onNewMessage);
    this.on("change:profileKey", this.onChangeProfileKey);
    const sealedSender = this.get("sealedSender");
    if (sealedSender === void 0) {
      this.set({ sealedSender: import_SealedSender.SEALED_SENDER.UNKNOWN });
    }
    this.unset("unidentifiedDelivery");
    this.unset("unidentifiedDeliveryUnrestricted");
    this.unset("hasFetchedProfile");
    this.unset("tokens");
    this.on("change:members change:membersV2", this.fetchContacts);
    this.typingRefreshTimer = null;
    this.typingPauseTimer = null;
    this.on("change", (_model, options = {}) => {
      const changedKeys = Object.keys(this.changed || {});
      const isPropsCacheStillValid = !options.force && Boolean(changedKeys.length && changedKeys.every((key) => ATTRIBUTES_THAT_DONT_INVALIDATE_PROPS_CACHE.has(key)));
      if (isPropsCacheStillValid) {
        return;
      }
      if (this.cachedProps) {
        this.oldCachedProps = this.cachedProps;
      }
      this.cachedProps = null;
      this.trigger("props-change", this, this.isInReduxBatch);
    });
    this.isFetchingUUID = this.isSMSOnly();
    this.throttledFetchSMSOnlyUUID = (0, import_lodash.throttle)(this.fetchSMSOnlyUUID.bind(this), FIVE_MINUTES);
    this.throttledMaybeMigrateV1Group = (0, import_lodash.throttle)(this.maybeMigrateV1Group.bind(this), FIVE_MINUTES);
    const migratedColor = this.getColor();
    if (this.get("color") !== migratedColor) {
      this.set("color", migratedColor);
    }
  }
  toSenderKeyTarget() {
    return {
      getGroupId: () => this.get("groupId"),
      getMembers: () => this.getMembers(),
      hasMember: (id) => this.hasMember(id),
      idForLogging: () => this.idForLogging(),
      isGroupV2: () => (0, import_whatTypeOfConversation.isGroupV2)(this.attributes),
      isValid: () => (0, import_whatTypeOfConversation.isGroupV2)(this.attributes),
      getSenderKeyInfo: () => this.get("senderKeyInfo"),
      saveSenderKeyInfo: async (senderKeyInfo) => {
        this.set({ senderKeyInfo });
        window.Signal.Data.updateConversation(this.attributes);
      }
    };
  }
  isMemberRequestingToJoin(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const pendingAdminApprovalV2 = this.get("pendingAdminApprovalV2");
    if (!pendingAdminApprovalV2 || !pendingAdminApprovalV2.length) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    return pendingAdminApprovalV2.some((item) => item.uuid === uuid);
  }
  isMemberPending(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const pendingMembersV2 = this.get("pendingMembersV2");
    if (!pendingMembersV2 || !pendingMembersV2.length) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    return pendingMembersV2.some((item) => item.uuid === uuid);
  }
  isMemberBanned(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const bannedMembersV2 = this.get("bannedMembersV2");
    if (!bannedMembersV2 || !bannedMembersV2.length) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    return bannedMembersV2.some((member) => member.uuid === uuid);
  }
  isMemberAwaitingApproval(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const pendingAdminApprovalV2 = this.get("pendingAdminApprovalV2");
    if (!pendingAdminApprovalV2 || !pendingAdminApprovalV2.length) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    return window._.any(pendingAdminApprovalV2, (item) => item.uuid === uuid);
  }
  isMember(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      throw new Error(`isMember: Called for non-GroupV2 conversation ${this.idForLogging()}`);
    }
    const membersV2 = this.get("membersV2");
    if (!membersV2 || !membersV2.length) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    return window._.any(membersV2, (item) => item.uuid === uuid);
  }
  async updateExpirationTimerInGroupV2(seconds) {
    const idLog = this.idForLogging();
    const current = this.get("expireTimer");
    const bothFalsey = Boolean(current) === false && Boolean(seconds) === false;
    if (current === seconds || bothFalsey) {
      log.warn(`updateExpirationTimerInGroupV2/${idLog}: Requested timer ${seconds} is unchanged from existing ${current}.`);
      return void 0;
    }
    return window.Signal.Groups.buildDisappearingMessagesTimerChange({
      expireTimer: seconds || 0,
      group: this.attributes
    });
  }
  async promotePendingMember(conversationId) {
    const idLog = this.idForLogging();
    if (!this.isMemberPending(conversationId)) {
      log.warn(`promotePendingMember/${idLog}: ${conversationId} is not a pending member of group. Returning early.`);
      return void 0;
    }
    const pendingMember = window.ConversationController.get(conversationId);
    if (!pendingMember) {
      throw new Error(`promotePendingMember/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    let profileKeyCredentialBase64 = pendingMember.get("profileKeyCredential");
    if (!profileKeyCredentialBase64) {
      await pendingMember.getProfiles();
      profileKeyCredentialBase64 = pendingMember.get("profileKeyCredential");
      if (!profileKeyCredentialBase64) {
        throw new Error(`promotePendingMember/${idLog}: No profileKeyCredential for conversation ${pendingMember.idForLogging()}`);
      }
    }
    return window.Signal.Groups.buildPromoteMemberChange({
      group: this.attributes,
      profileKeyCredentialBase64,
      serverPublicParamsBase64: window.getServerPublicParams()
    });
  }
  async approvePendingApprovalRequest(conversationId) {
    const idLog = this.idForLogging();
    if (!this.isMemberRequestingToJoin(conversationId)) {
      log.warn(`approvePendingApprovalRequest/${idLog}: ${conversationId} is not requesting to join the group. Returning early.`);
      return void 0;
    }
    const pendingMember = window.ConversationController.get(conversationId);
    if (!pendingMember) {
      throw new Error(`approvePendingApprovalRequest/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    const uuid = pendingMember.get("uuid");
    if (!uuid) {
      throw new Error(`approvePendingApprovalRequest/${idLog}: Missing uuid for conversation ${conversationId}`);
    }
    return window.Signal.Groups.buildPromotePendingAdminApprovalMemberChange({
      group: this.attributes,
      uuid
    });
  }
  async denyPendingApprovalRequest(conversationId) {
    const idLog = this.idForLogging();
    if (!this.isMemberRequestingToJoin(conversationId)) {
      log.warn(`denyPendingApprovalRequest/${idLog}: ${conversationId} is not requesting to join the group. Returning early.`);
      return void 0;
    }
    const pendingMember = window.ConversationController.get(conversationId);
    if (!pendingMember) {
      throw new Error(`denyPendingApprovalRequest/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    const uuid = pendingMember.get("uuid");
    if (!uuid) {
      throw new Error(`denyPendingApprovalRequest/${idLog}: Missing uuid for conversation ${pendingMember.idForLogging()}`);
    }
    const ourUuid = window.textsecure.storage.user.getCheckedUuid(import_UUID.UUIDKind.ACI).toString();
    return window.Signal.Groups.buildDeletePendingAdminApprovalMemberChange({
      group: this.attributes,
      ourUuid,
      uuid
    });
  }
  async addPendingApprovalRequest() {
    const idLog = this.idForLogging();
    const conversationId = window.ConversationController.getOurConversationIdOrThrow();
    const toRequest = window.ConversationController.get(conversationId);
    if (!toRequest) {
      throw new Error(`addPendingApprovalRequest/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    let profileKeyCredentialBase64 = toRequest.get("profileKeyCredential");
    if (!profileKeyCredentialBase64) {
      await toRequest.getProfiles();
      profileKeyCredentialBase64 = toRequest.get("profileKeyCredential");
      if (!profileKeyCredentialBase64) {
        throw new Error(`promotePendingMember/${idLog}: No profileKeyCredential for conversation ${toRequest.idForLogging()}`);
      }
    }
    if (this.isMemberAwaitingApproval(conversationId)) {
      log.warn(`addPendingApprovalRequest/${idLog}: ${conversationId} already in pending approval.`);
      return void 0;
    }
    return window.Signal.Groups.buildAddPendingAdminApprovalMemberChange({
      group: this.attributes,
      profileKeyCredentialBase64,
      serverPublicParamsBase64: window.getServerPublicParams()
    });
  }
  async addMember(conversationId) {
    const idLog = this.idForLogging();
    const toRequest = window.ConversationController.get(conversationId);
    if (!toRequest) {
      throw new Error(`addMember/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    const uuid = toRequest.get("uuid");
    if (!uuid) {
      throw new Error(`addMember/${idLog}: ${toRequest.idForLogging()} is missing a uuid!`);
    }
    let profileKeyCredentialBase64 = toRequest.get("profileKeyCredential");
    if (!profileKeyCredentialBase64) {
      await toRequest.getProfiles();
      profileKeyCredentialBase64 = toRequest.get("profileKeyCredential");
      if (!profileKeyCredentialBase64) {
        throw new Error(`addMember/${idLog}: No profileKeyCredential for conversation ${toRequest.idForLogging()}`);
      }
    }
    if (this.isMember(conversationId)) {
      log.warn(`addMember/${idLog}: ${conversationId} already a member.`);
      return void 0;
    }
    return window.Signal.Groups.buildAddMember({
      group: this.attributes,
      profileKeyCredentialBase64,
      serverPublicParamsBase64: window.getServerPublicParams(),
      uuid
    });
  }
  async removePendingMember(conversationIds) {
    const idLog = this.idForLogging();
    const uuids = conversationIds.map((conversationId) => {
      if (!this.isMemberPending(conversationId)) {
        log.warn(`removePendingMember/${idLog}: ${conversationId} is not a pending member of group. Returning early.`);
        return void 0;
      }
      const pendingMember = window.ConversationController.get(conversationId);
      if (!pendingMember) {
        log.warn(`removePendingMember/${idLog}: No conversation found for conversation ${conversationId}`);
        return void 0;
      }
      const uuid = pendingMember.get("uuid");
      if (!uuid) {
        log.warn(`removePendingMember/${idLog}: Missing uuid for conversation ${pendingMember.idForLogging()}`);
        return void 0;
      }
      return uuid;
    }).filter(import_isNotNil.isNotNil);
    if (!uuids.length) {
      return void 0;
    }
    return window.Signal.Groups.buildDeletePendingMemberChange({
      group: this.attributes,
      uuids
    });
  }
  async removeMember(conversationId) {
    const idLog = this.idForLogging();
    if (!this.isMember(conversationId)) {
      log.warn(`removeMember/${idLog}: ${conversationId} is not a pending member of group. Returning early.`);
      return void 0;
    }
    const member = window.ConversationController.get(conversationId);
    if (!member) {
      throw new Error(`removeMember/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    const uuid = member.get("uuid");
    if (!uuid) {
      throw new Error(`removeMember/${idLog}: Missing uuid for conversation ${member.idForLogging()}`);
    }
    const ourUuid = window.textsecure.storage.user.getCheckedUuid(import_UUID.UUIDKind.ACI).toString();
    return window.Signal.Groups.buildDeleteMemberChange({
      group: this.attributes,
      ourUuid,
      uuid
    });
  }
  async toggleAdminChange(conversationId) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return void 0;
    }
    const idLog = this.idForLogging();
    if (!this.isMember(conversationId)) {
      log.warn(`toggleAdminChange/${idLog}: ${conversationId} is not a pending member of group. Returning early.`);
      return void 0;
    }
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      throw new Error(`toggleAdminChange/${idLog}: No conversation found for conversation ${conversationId}`);
    }
    const uuid = conversation.get("uuid");
    if (!uuid) {
      throw new Error(`toggleAdminChange/${idLog}: Missing uuid for conversation ${conversationId}`);
    }
    const MEMBER_ROLES = import_protobuf.SignalService.Member.Role;
    const role = this.isAdmin(conversationId) ? MEMBER_ROLES.DEFAULT : MEMBER_ROLES.ADMINISTRATOR;
    return window.Signal.Groups.buildModifyMemberRoleChange({
      group: this.attributes,
      uuid,
      role
    });
  }
  async modifyGroupV2({
    createGroupChange,
    extraConversationsForSend,
    inviteLinkPassword,
    name
  }) {
    await window.Signal.Groups.modifyGroupV2({
      conversation: this,
      createGroupChange,
      extraConversationsForSend,
      inviteLinkPassword,
      name
    });
  }
  isEverUnregistered() {
    return Boolean(this.get("discoveredUnregisteredAt"));
  }
  isUnregistered() {
    return (0, import_isConversationUnregistered.isConversationUnregistered)(this.attributes);
  }
  isSMSOnly() {
    return (0, import_isConversationSMSOnly.isConversationSMSOnly)({
      ...this.attributes,
      type: (0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) ? "direct" : "unknown"
    });
  }
  setUnregistered() {
    log.info(`Conversation ${this.idForLogging()} is now unregistered`);
    this.set({
      discoveredUnregisteredAt: Date.now()
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  setRegistered() {
    if (this.get("discoveredUnregisteredAt") === void 0) {
      return;
    }
    log.info(`Conversation ${this.idForLogging()} is registered once again`);
    this.set({
      discoveredUnregisteredAt: void 0
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  isGroupV1AndDisabled() {
    return (0, import_whatTypeOfConversation.isGroupV1)(this.attributes);
  }
  isBlocked() {
    const uuid = this.get("uuid");
    if (uuid) {
      return window.storage.blocked.isUuidBlocked(uuid);
    }
    const e164 = this.get("e164");
    if (e164) {
      return window.storage.blocked.isBlocked(e164);
    }
    const groupId = this.get("groupId");
    if (groupId) {
      return window.storage.blocked.isGroupBlocked(groupId);
    }
    return false;
  }
  block({ viaStorageServiceSync = false } = {}) {
    let blocked = false;
    const wasBlocked = this.isBlocked();
    const uuid = this.get("uuid");
    if (uuid) {
      window.storage.blocked.addBlockedUuid(uuid);
      blocked = true;
    }
    const e164 = this.get("e164");
    if (e164) {
      window.storage.blocked.addBlockedNumber(e164);
      blocked = true;
    }
    const groupId = this.get("groupId");
    if (groupId) {
      window.storage.blocked.addBlockedGroup(groupId);
      blocked = true;
    }
    if (blocked && !wasBlocked) {
      this.trigger("change", this, { force: true });
      if (!viaStorageServiceSync) {
        this.captureChange("block");
      }
    }
  }
  unblock({ viaStorageServiceSync = false } = {}) {
    let unblocked = false;
    const wasBlocked = this.isBlocked();
    const uuid = this.get("uuid");
    if (uuid) {
      window.storage.blocked.removeBlockedUuid(uuid);
      unblocked = true;
    }
    const e164 = this.get("e164");
    if (e164) {
      window.storage.blocked.removeBlockedNumber(e164);
      unblocked = true;
    }
    const groupId = this.get("groupId");
    if (groupId) {
      window.storage.blocked.removeBlockedGroup(groupId);
      unblocked = true;
    }
    if (unblocked && wasBlocked) {
      this.trigger("change", this, { force: true });
      if (!viaStorageServiceSync) {
        this.captureChange("unblock");
      }
      this.fetchLatestGroupV2Data({ force: true });
    }
    return unblocked;
  }
  enableProfileSharing({ viaStorageServiceSync = false } = {}) {
    log.info(`enableProfileSharing: ${this.idForLogging()} storage? ${viaStorageServiceSync}`);
    const before = this.get("profileSharing");
    this.set({ profileSharing: true });
    const after = this.get("profileSharing");
    if (!viaStorageServiceSync && Boolean(before) !== Boolean(after)) {
      this.captureChange("enableProfileSharing");
    }
  }
  disableProfileSharing({ viaStorageServiceSync = false } = {}) {
    log.info(`disableProfileSharing: ${this.idForLogging()} storage? ${viaStorageServiceSync}`);
    const before = this.get("profileSharing");
    this.set({ profileSharing: false });
    const after = this.get("profileSharing");
    if (!viaStorageServiceSync && Boolean(before) !== Boolean(after)) {
      this.captureChange("disableProfileSharing");
    }
  }
  hasDraft() {
    const draftAttachments = this.get("draftAttachments") || [];
    return this.get("draft") || this.get("quotedMessageId") || draftAttachments.length > 0;
  }
  getDraftPreview() {
    const draft = this.get("draft");
    if (draft) {
      const bodyRanges = this.get("draftBodyRanges") || [];
      return (0, import_getTextWithMentions.getTextWithMentions)(bodyRanges, draft);
    }
    const draftAttachments = this.get("draftAttachments") || [];
    if (draftAttachments.length > 0) {
      return window.i18n("Conversation--getDraftPreview--attachment");
    }
    const quotedMessageId = this.get("quotedMessageId");
    if (quotedMessageId) {
      return window.i18n("Conversation--getDraftPreview--quote");
    }
    return window.i18n("Conversation--getDraftPreview--draft");
  }
  bumpTyping() {
    if (!window.Events.getTypingIndicatorSetting()) {
      return;
    }
    if (!this.typingRefreshTimer) {
      const isTyping = true;
      this.setTypingRefreshTimer();
      this.sendTypingMessage(isTyping);
    }
    this.setTypingPauseTimer();
  }
  setTypingRefreshTimer() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.typingRefreshTimer);
    this.typingRefreshTimer = setTimeout(this.onTypingRefreshTimeout.bind(this), 10 * 1e3);
  }
  onTypingRefreshTimeout() {
    const isTyping = true;
    this.sendTypingMessage(isTyping);
    this.setTypingRefreshTimer();
  }
  setTypingPauseTimer() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.typingPauseTimer);
    this.typingPauseTimer = setTimeout(this.onTypingPauseTimeout.bind(this), 3 * 1e3);
  }
  onTypingPauseTimeout() {
    const isTyping = false;
    this.sendTypingMessage(isTyping);
    this.clearTypingTimers();
  }
  clearTypingTimers() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.typingPauseTimer);
    this.typingPauseTimer = null;
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.typingRefreshTimer);
    this.typingRefreshTimer = null;
  }
  async fetchLatestGroupV2Data(options = {}) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    await window.Signal.Groups.waitThenMaybeUpdateGroup({
      force: options.force,
      conversation: this
    });
  }
  async fetchSMSOnlyUUID() {
    const { messaging } = window.textsecure;
    if (!messaging) {
      return;
    }
    if (!this.isSMSOnly()) {
      return;
    }
    log.info(`Fetching uuid for a sms-only conversation ${this.idForLogging()}`);
    this.isFetchingUUID = true;
    this.trigger("change", this, { force: true });
    try {
      await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
        conversationController: window.ConversationController,
        conversations: [this],
        messaging
      });
    } finally {
      this.isFetchingUUID = false;
      this.trigger("change", this, { force: true });
      log.info(`Done fetching uuid for a sms-only conversation ${this.idForLogging()}`);
    }
    if (!this.get("uuid")) {
      return;
    }
    this.setRegistered();
  }
  isValid() {
    return (0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) || (0, import_whatTypeOfConversation.isGroupV1)(this.attributes) || (0, import_whatTypeOfConversation.isGroupV2)(this.attributes);
  }
  async maybeMigrateV1Group() {
    if (!(0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
      return;
    }
    const isMigrated = await window.Signal.Groups.hasV1GroupBeenMigrated(this);
    if (!isMigrated) {
      return;
    }
    await window.Signal.Groups.waitThenRespondToGroupV2Migration({
      conversation: this
    });
  }
  maybeRepairGroupV2(data) {
    if (this.get("groupVersion") && this.get("masterKey") && this.get("secretParams") && this.get("publicParams")) {
      return;
    }
    log.info(`Repairing GroupV2 conversation ${this.idForLogging()}`);
    const { masterKey, secretParams, publicParams } = data;
    this.set({ masterKey, secretParams, publicParams, groupVersion: 2 });
    window.Signal.Data.updateConversation(this.attributes);
  }
  getGroupV2Info(options = {}) {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) || !(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return void 0;
    }
    return {
      masterKey: Bytes.fromBase64(this.get("masterKey")),
      revision: this.get("revision"),
      members: "members" in options ? options.members : this.getRecipients(options),
      groupChange: options.groupChange
    };
  }
  getGroupV1Info(members) {
    const groupId = this.get("groupId");
    const groupVersion = this.get("groupVersion");
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) || !groupId || groupVersion && groupVersion > 0) {
      return void 0;
    }
    return {
      id: groupId,
      members: members || this.getRecipients()
    };
  }
  getGroupIdBuffer() {
    const groupIdString = this.get("groupId");
    if (!groupIdString) {
      return void 0;
    }
    if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
      return Bytes.fromBinary(groupIdString);
    }
    if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return Bytes.fromBase64(groupIdString);
    }
    return void 0;
  }
  async sendTypingMessage(isTyping) {
    const { messaging } = window.textsecure;
    if (!messaging) {
      return;
    }
    if ((0, import_whatTypeOfConversation.isMe)(this.attributes)) {
      return;
    }
    this.lastIsTyping = isTyping;
    await this.queueJob("sendTypingMessage", async () => {
      const groupMembers = this.getRecipients();
      if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) && !groupMembers.length) {
        return;
      }
      if (this.lastIsTyping === void 0) {
        log.info(`sendTypingMessage(${this.idForLogging()}): ignoring`);
        return;
      }
      const recipientId = (0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) ? this.getSendTarget() : void 0;
      const groupId = this.getGroupIdBuffer();
      const timestamp = Date.now();
      const content = {
        recipientId,
        groupId,
        groupMembers,
        isTyping: this.lastIsTyping,
        timestamp
      };
      this.lastIsTyping = void 0;
      log.info(`sendTypingMessage(${this.idForLogging()}): sending ${content.isTyping}`);
      const contentMessage = messaging.getTypingContentMessage(content);
      const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
      const sendOptions = {
        ...await (0, import_getSendOptions.getSendOptions)(this.attributes),
        online: true
      };
      if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
        await (0, import_handleMessageSend.handleMessageSend)(messaging.sendMessageProtoAndWait({
          timestamp,
          recipients: groupMembers,
          proto: contentMessage,
          contentHint: ContentHint.IMPLICIT,
          groupId: void 0,
          options: sendOptions
        }), { messageIds: [], sendType: "typing" });
      } else {
        await (0, import_handleMessageSend.handleMessageSend)(window.Signal.Util.sendContentMessageToGroup({
          contentHint: ContentHint.IMPLICIT,
          contentMessage,
          messageId: void 0,
          online: true,
          recipients: groupMembers,
          sendOptions,
          sendTarget: this.toSenderKeyTarget(),
          sendType: "typing",
          timestamp
        }), { messageIds: [], sendType: "typing" });
      }
    });
  }
  async onNewMessage(message) {
    const uuid = message.get("sourceUuid");
    const e164 = message.get("source");
    const sourceDevice = message.get("sourceDevice");
    const sourceId = window.ConversationController.ensureContactIds({
      uuid,
      e164
    });
    const typingToken = `${sourceId}.${sourceDevice}`;
    this.clearContactTypingTimer(typingToken);
    const isGroupStoryReply = (0, import_whatTypeOfConversation.isGroup)(this.attributes) && message.get("storyId");
    if (isGroupStoryReply || (0, import_message.isStory)(message.attributes)) {
      return;
    }
    this.addSingleMessage(message);
    this.debouncedUpdateLastMessage();
  }
  async addSingleMessage(message, { isJustSent } = { isJustSent: false }) {
    await this.beforeAddSingleMessage();
    this.doAddSingleMessage(message, { isJustSent });
  }
  async beforeAddSingleMessage() {
    if (!this.newMessageQueue) {
      this.newMessageQueue = new window.PQueue({
        concurrency: 1,
        timeout: 1e3 * 60 * 2
      });
    }
    await this.newMessageQueue.add(async () => {
      await this.inProgressFetch;
    });
  }
  doAddSingleMessage(message, { isJustSent }) {
    const { messagesAdded } = window.reduxActions.conversations;
    const { conversations } = window.reduxStore.getState();
    const { messagesByConversation } = conversations;
    const conversationId = this.id;
    const existingConversation = messagesByConversation[conversationId];
    const newestId = existingConversation?.metrics?.newest?.id;
    const messageIds = existingConversation?.messageIds;
    const isLatestInMemory = newestId && messageIds && messageIds[messageIds.length - 1] === newestId;
    if (isJustSent && existingConversation && !isLatestInMemory) {
      this.loadNewestMessages(void 0, void 0);
    } else {
      messagesAdded({
        conversationId,
        messages: [{ ...message.attributes }],
        isActive: window.isActive(),
        isJustSent,
        isNewMessage: true
      });
    }
  }
  setInProgressFetch() {
    let resolvePromise;
    this.inProgressFetch = new Promise((resolve) => {
      resolvePromise = resolve;
    });
    const finish = /* @__PURE__ */ __name(() => {
      resolvePromise();
      this.inProgressFetch = void 0;
    }, "finish");
    return finish;
  }
  async loadNewestMessages(newestMessageId, setFocus) {
    const { messagesReset, setMessageLoadingState } = window.reduxActions.conversations;
    const conversationId = this.id;
    setMessageLoadingState(conversationId, import_timelineUtil.TimelineMessageLoadingState.DoingInitialLoad);
    const finish = this.setInProgressFetch();
    try {
      let scrollToLatestUnread = true;
      if (newestMessageId) {
        const newestInMemoryMessage = await getMessageById(newestMessageId);
        if (newestInMemoryMessage) {
          if ((0, import_isMessageUnread.isMessageUnread)(newestInMemoryMessage)) {
            scrollToLatestUnread = false;
          }
        } else {
          log.warn(`loadNewestMessages: did not find message ${newestMessageId}`);
        }
      }
      const metrics = await getMessageMetricsForConversation(conversationId, void 0, (0, import_whatTypeOfConversation.isGroup)(this.attributes));
      if (!newestMessageId && !this.getAccepted() && metrics.oldest) {
        this.loadAndScroll(metrics.oldest.id, { disableScroll: true });
        return;
      }
      if (scrollToLatestUnread && metrics.oldestUnseen) {
        this.loadAndScroll(metrics.oldestUnseen.id, {
          disableScroll: !setFocus
        });
        return;
      }
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
        limit: MESSAGE_LOAD_CHUNK_SIZE,
        storyId: void 0
      });
      const cleaned = await this.cleanModels(messages);
      const scrollToMessageId = setFocus && metrics.newest ? metrics.newest.id : void 0;
      const unboundedFetch = true;
      messagesReset({
        conversationId,
        messages: cleaned.map((messageModel) => ({
          ...messageModel.attributes
        })),
        metrics,
        scrollToMessageId,
        unboundedFetch
      });
    } catch (error) {
      setMessageLoadingState(conversationId, void 0);
      throw error;
    } finally {
      finish();
    }
  }
  async loadOlderMessages(oldestMessageId) {
    const { messagesAdded, setMessageLoadingState, repairOldestMessage } = window.reduxActions.conversations;
    const conversationId = this.id;
    setMessageLoadingState(conversationId, import_timelineUtil.TimelineMessageLoadingState.LoadingOlderMessages);
    const finish = this.setInProgressFetch();
    try {
      const message = await getMessageById(oldestMessageId);
      if (!message) {
        throw new Error(`loadOlderMessages: failed to load message ${oldestMessageId}`);
      }
      const receivedAt = message.received_at;
      const sentAt = message.sent_at;
      const models = await getOlderMessagesByConversation(conversationId, {
        isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
        limit: MESSAGE_LOAD_CHUNK_SIZE,
        messageId: oldestMessageId,
        receivedAt,
        sentAt,
        storyId: void 0
      });
      if (models.length < 1) {
        log.warn("loadOlderMessages: requested, but loaded no messages");
        repairOldestMessage(conversationId);
        return;
      }
      const cleaned = await this.cleanModels(models);
      messagesAdded({
        conversationId,
        messages: cleaned.map((messageModel) => ({
          ...messageModel.attributes
        })),
        isActive: window.isActive(),
        isJustSent: false,
        isNewMessage: false
      });
    } catch (error) {
      setMessageLoadingState(conversationId, void 0);
      throw error;
    } finally {
      finish();
    }
  }
  async loadNewerMessages(newestMessageId) {
    const { messagesAdded, setMessageLoadingState, repairNewestMessage } = window.reduxActions.conversations;
    const conversationId = this.id;
    setMessageLoadingState(conversationId, import_timelineUtil.TimelineMessageLoadingState.LoadingNewerMessages);
    const finish = this.setInProgressFetch();
    try {
      const message = await getMessageById(newestMessageId);
      if (!message) {
        throw new Error(`loadNewerMessages: failed to load message ${newestMessageId}`);
      }
      const receivedAt = message.received_at;
      const sentAt = message.sent_at;
      const models = await getNewerMessagesByConversation(conversationId, {
        isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
        limit: MESSAGE_LOAD_CHUNK_SIZE,
        receivedAt,
        sentAt,
        storyId: void 0
      });
      if (models.length < 1) {
        log.warn("loadNewerMessages: requested, but loaded no messages");
        repairNewestMessage(conversationId);
        return;
      }
      const cleaned = await this.cleanModels(models);
      messagesAdded({
        conversationId,
        messages: cleaned.map((messageModel) => ({
          ...messageModel.attributes
        })),
        isActive: window.isActive(),
        isJustSent: false,
        isNewMessage: false
      });
    } catch (error) {
      setMessageLoadingState(conversationId, void 0);
      throw error;
    } finally {
      finish();
    }
  }
  async loadAndScroll(messageId, options) {
    const { messagesReset, setMessageLoadingState } = window.reduxActions.conversations;
    const conversationId = this.id;
    setMessageLoadingState(conversationId, import_timelineUtil.TimelineMessageLoadingState.DoingInitialLoad);
    const finish = this.setInProgressFetch();
    try {
      const message = await getMessageById(messageId);
      if (!message) {
        throw new Error(`loadMoreAndScroll: failed to load message ${messageId}`);
      }
      const receivedAt = message.received_at;
      const sentAt = message.sent_at;
      const { older, newer, metrics } = await getConversationRangeCenteredOnMessage({
        conversationId,
        isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
        limit: MESSAGE_LOAD_CHUNK_SIZE,
        messageId,
        receivedAt,
        sentAt,
        storyId: void 0
      });
      const all = [...older, message, ...newer];
      const cleaned = await this.cleanModels(all);
      const scrollToMessageId = options && options.disableScroll ? void 0 : messageId;
      messagesReset({
        conversationId,
        messages: cleaned.map((messageModel) => ({
          ...messageModel.attributes
        })),
        metrics,
        scrollToMessageId
      });
    } catch (error) {
      setMessageLoadingState(conversationId, void 0);
      throw error;
    } finally {
      finish();
    }
  }
  async cleanModels(messages) {
    const result = messages.filter((message) => Boolean(message.id)).map((message) => window.MessageController.register(message.id, message));
    const eliminated = messages.length - result.length;
    if (eliminated > 0) {
      log.warn(`cleanModels: Eliminated ${eliminated} messages without an id`);
    }
    const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
    let upgraded = 0;
    for (let max = result.length, i = 0; i < max; i += 1) {
      const message = result[i];
      const { attributes } = message;
      const { schemaVersion } = attributes;
      if (schemaVersion < Message.VERSION_NEEDED_FOR_DISPLAY) {
        const upgradedMessage = await upgradeMessageSchema(attributes);
        message.set(upgradedMessage);
        await window.Signal.Data.saveMessage(upgradedMessage, { ourUuid });
        upgraded += 1;
      }
    }
    if (upgraded > 0) {
      log.warn(`cleanModels: Upgraded schema of ${upgraded} messages`);
    }
    await Promise.all(result.map((model) => model.hydrateStoryContext()));
    return result;
  }
  format() {
    if (this.cachedProps) {
      return this.cachedProps;
    }
    const oldFormat = this.format;
    this.format = () => {
      if (!this.oldCachedProps) {
        throw new Error(`Conversation.format()/${this.idForLogging()} reentrant call, no old cached props!`);
      }
      const { stack } = new Error("for stack");
      log.warn(`Conversation.format()/${this.idForLogging()} reentrant call! ${stack}`);
      return this.oldCachedProps;
    };
    try {
      this.cachedProps = this.getProps();
      return this.cachedProps;
    } finally {
      this.format = oldFormat;
    }
  }
  getProps() {
    const color = this.getColor();
    let lastMessage;
    if (this.get("lastMessageDeletedForEveryone")) {
      lastMessage = { deletedForEveryone: true };
    } else {
      const lastMessageText = this.get("lastMessage");
      if (lastMessageText) {
        lastMessage = {
          status: (0, import_dropNull.dropNull)(this.get("lastMessageStatus")),
          text: lastMessageText,
          deletedForEveryone: false
        };
      }
    }
    const typingValues = window._.values(this.contactTypingTimers || {});
    const typingMostRecent = window._.first(window._.sortBy(typingValues, "timestamp"));
    const timestamp = this.get("timestamp");
    const draftTimestamp = this.get("draftTimestamp");
    const draftPreview = this.getDraftPreview();
    const draftText = this.get("draft");
    const draftBodyRanges = this.get("draftBodyRanges");
    const shouldShowDraft = this.hasDraft() && draftTimestamp && draftTimestamp >= timestamp;
    const inboxPosition = this.get("inbox_position");
    const messageRequestsEnabled = window.Signal.RemoteConfig.isEnabled("desktop.messageRequests");
    const ourConversationId = window.ConversationController.getOurConversationId();
    let groupVersion;
    if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
      groupVersion = 1;
    } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      groupVersion = 2;
    }
    const sortedGroupMembers = (0, import_whatTypeOfConversation.isGroupV2)(this.attributes) ? this.getMembers().sort((left, right) => sortConversationTitles(left, right, this.intlCollator)).map((member) => member.format()).filter(import_isNotNil.isNotNil) : void 0;
    const { customColor, customColorId } = this.getCustomColorData();
    return {
      id: this.id,
      uuid: this.get("uuid"),
      e164: this.get("e164"),
      username: (0, import_dropNull.dropNull)(this.get("username")),
      about: this.getAboutText(),
      aboutText: this.get("about"),
      aboutEmoji: this.get("aboutEmoji"),
      acceptedMessageRequest: this.getAccepted(),
      activeAt: this.get("active_at"),
      areWePending: Boolean(ourConversationId && this.isMemberPending(ourConversationId)),
      areWePendingApproval: Boolean(ourConversationId && this.isMemberAwaitingApproval(ourConversationId)),
      areWeAdmin: this.areWeAdmin(),
      avatars: (0, import_getAvatarData.getAvatarData)(this.attributes),
      badges: this.get("badges") || [],
      canChangeTimer: this.canChangeTimer(),
      canEditGroupInfo: this.canEditGroupInfo(),
      avatarPath: this.getAbsoluteAvatarPath(),
      avatarHash: this.getAvatarHash(),
      unblurredAvatarPath: this.getAbsoluteUnblurredAvatarPath(),
      profileAvatarPath: this.getAbsoluteProfileAvatarPath(),
      color,
      conversationColor: this.getConversationColor(),
      customColor,
      customColorId,
      discoveredUnregisteredAt: this.get("discoveredUnregisteredAt"),
      draftBodyRanges,
      draftPreview,
      draftText,
      familyName: this.get("profileFamilyName"),
      firstName: this.get("profileName"),
      groupDescription: this.get("description"),
      groupVersion,
      groupId: this.get("groupId"),
      groupLink: this.getGroupLink(),
      hideStory: Boolean(this.get("hideStory")),
      inboxPosition,
      isArchived: this.get("isArchived"),
      isBlocked: this.isBlocked(),
      isMe: (0, import_whatTypeOfConversation.isMe)(this.attributes),
      isGroupV1AndDisabled: this.isGroupV1AndDisabled(),
      isPinned: this.get("isPinned"),
      isUntrusted: this.isUntrusted(),
      isVerified: this.isVerified(),
      isFetchingUUID: this.isFetchingUUID,
      lastMessage,
      lastUpdated: this.get("timestamp"),
      left: Boolean(this.get("left")),
      markedUnread: this.get("markedUnread"),
      membersCount: this.getMembersCount(),
      memberships: this.getMemberships(),
      messageCount: this.get("messageCount") || 0,
      pendingMemberships: this.getPendingMemberships(),
      pendingApprovalMemberships: this.getPendingApprovalMemberships(),
      bannedMemberships: this.getBannedMemberships(),
      profileKey: this.get("profileKey"),
      messageRequestsEnabled,
      accessControlAddFromInviteLink: this.get("accessControl")?.addFromInviteLink,
      accessControlAttributes: this.get("accessControl")?.attributes,
      accessControlMembers: this.get("accessControl")?.members,
      announcementsOnly: Boolean(this.get("announcementsOnly")),
      announcementsOnlyReady: this.canBeAnnouncementGroup(),
      expireTimer: this.get("expireTimer"),
      muteExpiresAt: this.get("muteExpiresAt"),
      dontNotifyForMentionsIfMuted: this.get("dontNotifyForMentionsIfMuted"),
      name: this.get("name"),
      phoneNumber: this.getNumber(),
      profileName: this.getProfileName(),
      profileSharing: this.get("profileSharing"),
      publicParams: this.get("publicParams"),
      secretParams: this.get("secretParams"),
      shouldShowDraft,
      sortedGroupMembers,
      timestamp,
      title: this.getTitle(),
      typingContactId: typingMostRecent?.senderId,
      searchableTitle: (0, import_whatTypeOfConversation.isMe)(this.attributes) ? window.i18n("noteToSelf") : this.getTitle(),
      unreadCount: this.get("unreadCount") || 0,
      ...(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) ? {
        type: "direct",
        sharedGroupNames: this.get("sharedGroupNames") || []
      } : {
        type: "group",
        acknowledgedGroupNameCollisions: this.get("acknowledgedGroupNameCollisions") || {},
        sharedGroupNames: []
      }
    };
  }
  updateE164(e164) {
    const oldValue = this.get("e164");
    if (e164 && e164 !== oldValue) {
      this.set("e164", e164);
      if (oldValue) {
        this.addChangeNumberNotification(oldValue, e164);
      }
      window.Signal.Data.updateConversation(this.attributes);
      this.trigger("idUpdated", this, "e164", oldValue);
    }
  }
  updateUuid(uuid) {
    const oldValue = this.get("uuid");
    if (uuid && uuid !== oldValue) {
      this.set("uuid", import_UUID.UUID.cast(uuid.toLowerCase()));
      window.Signal.Data.updateConversation(this.attributes);
      this.trigger("idUpdated", this, "uuid", oldValue);
    }
  }
  updateGroupId(groupId) {
    const oldValue = this.get("groupId");
    if (groupId && groupId !== oldValue) {
      this.set("groupId", groupId);
      window.Signal.Data.updateConversation(this.attributes);
      this.trigger("idUpdated", this, "groupId", oldValue);
    }
  }
  incrementMessageCount() {
    this.set({
      messageCount: (this.get("messageCount") || 0) + 1
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  getMembersCount() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return void 0;
    }
    const memberList = this.get("membersV2") || this.get("members");
    if (memberList && memberList.length) {
      return memberList.length;
    }
    const temporaryMemberCount = this.get("temporaryMemberCount");
    if ((0, import_lodash.isNumber)(temporaryMemberCount)) {
      return temporaryMemberCount;
    }
    return void 0;
  }
  decrementMessageCount() {
    this.set({
      messageCount: Math.max((this.get("messageCount") || 0) - 1, 0)
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  incrementSentMessageCount({ dry = false } = {}) {
    const update = {
      messageCount: (this.get("messageCount") || 0) + 1,
      sentMessageCount: (this.get("sentMessageCount") || 0) + 1
    };
    if (dry) {
      return update;
    }
    this.set(update);
    window.Signal.Data.updateConversation(this.attributes);
    return void 0;
  }
  decrementSentMessageCount() {
    this.set({
      messageCount: Math.max((this.get("messageCount") || 0) - 1, 0),
      sentMessageCount: Math.max((this.get("sentMessageCount") || 0) - 1, 0)
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  async handleReadAndDownloadAttachments(options = {}) {
    const { isLocalAction } = options;
    const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
    let messages;
    do {
      const first = messages ? messages[0] : void 0;
      messages = await window.Signal.Data.getOlderMessagesByConversation(this.get("id"), {
        isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
        limit: 100,
        messageId: first ? first.id : void 0,
        receivedAt: first ? first.received_at : void 0,
        sentAt: first ? first.sent_at : void 0,
        storyId: void 0
      });
      if (!messages.length) {
        return;
      }
      const readMessages = messages.filter((m) => !(0, import_message.hasErrors)(m) && (0, import_message.isIncoming)(m));
      if (isLocalAction) {
        await import_readReceiptsJobQueue.readReceiptsJobQueue.addIfAllowedByUser(window.storage, readMessages.map((m) => ({
          messageId: m.id,
          senderE164: m.source,
          senderUuid: m.sourceUuid,
          timestamp: m.sent_at
        })));
      }
      await Promise.all(readMessages.map(async (m) => {
        const registered = window.MessageController.register(m.id, m);
        const shouldSave = await registered.queueAttachmentDownloads();
        if (shouldSave) {
          await window.Signal.Data.saveMessage(registered.attributes, {
            ourUuid
          });
        }
      }));
    } while (messages.length > 0);
  }
  async applyMessageRequestResponse(response, { fromSync = false, viaStorageServiceSync = false } = {}) {
    try {
      const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
      const isLocalAction = !fromSync && !viaStorageServiceSync;
      const ourConversationId = window.ConversationController.getOurConversationId();
      const currentMessageRequestState = this.get("messageRequestResponseType");
      const didResponseChange = response !== currentMessageRequestState;
      const wasPreviouslyAccepted = this.getAccepted();
      this.set({
        messageRequestResponseType: response
      });
      if (response === messageRequestEnum.ACCEPT) {
        this.unblock({ viaStorageServiceSync });
        this.enableProfileSharing({ viaStorageServiceSync });
        if (didResponseChange && !wasPreviouslyAccepted) {
          await this.handleReadAndDownloadAttachments({ isLocalAction });
        }
        if (isLocalAction) {
          if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes) || (0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
            this.sendProfileKeyUpdate();
          } else if (ourConversationId && (0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMemberPending(ourConversationId)) {
            await this.modifyGroupV2({
              name: "promotePendingMember",
              createGroupChange: () => this.promotePendingMember(ourConversationId)
            });
          } else if (ourConversationId && (0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMember(ourConversationId)) {
            log.info("applyMessageRequestResponse/accept: Already a member of v2 group");
          } else {
            log.error("applyMessageRequestResponse/accept: Neither member nor pending member of v2 group");
          }
        }
      } else if (response === messageRequestEnum.BLOCK) {
        this.block({ viaStorageServiceSync });
        this.disableProfileSharing({ viaStorageServiceSync });
        if (isLocalAction) {
          if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
            await this.leaveGroup();
          } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
            await this.leaveGroupV2();
          }
        }
      } else if (response === messageRequestEnum.DELETE) {
        this.disableProfileSharing({ viaStorageServiceSync });
        await this.destroyMessages();
        this.updateLastMessage();
        if (isLocalAction) {
          this.trigger("unload", "deleted from message request");
          if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
            await this.leaveGroup();
          } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
            await this.leaveGroupV2();
          }
        }
      } else if (response === messageRequestEnum.BLOCK_AND_DELETE) {
        this.block({ viaStorageServiceSync });
        this.disableProfileSharing({ viaStorageServiceSync });
        await this.destroyMessages();
        this.updateLastMessage();
        if (isLocalAction) {
          this.trigger("unload", "blocked and deleted from message request");
          if ((0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
            await this.leaveGroup();
          } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
            await this.leaveGroupV2();
          }
        }
      }
    } finally {
      window.Signal.Data.updateConversation(this.attributes);
    }
  }
  async joinGroupV2ViaLinkAndMigrate({
    approvalRequired,
    inviteLinkPassword,
    revision
  }) {
    await window.Signal.Groups.joinGroupV2ViaLinkAndMigrate({
      approvalRequired,
      conversation: this,
      inviteLinkPassword,
      revision
    });
  }
  async joinGroupV2ViaLink({
    inviteLinkPassword,
    approvalRequired
  }) {
    const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
    const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
    try {
      if (approvalRequired) {
        await this.modifyGroupV2({
          name: "requestToJoin",
          inviteLinkPassword,
          createGroupChange: () => this.addPendingApprovalRequest()
        });
      } else {
        await this.modifyGroupV2({
          name: "joinGroup",
          inviteLinkPassword,
          createGroupChange: () => this.addMember(ourConversationId)
        });
      }
    } catch (error) {
      const ALREADY_REQUESTED_TO_JOIN = '{"code":400,"message":"cannot ask to join via invite link if already asked to join"}';
      if (!error.response) {
        throw error;
      } else {
        const errorDetails = Bytes.toString(error.response);
        if (errorDetails !== ALREADY_REQUESTED_TO_JOIN) {
          throw error;
        } else {
          log.info("joinGroupV2ViaLink: Got 400, but server is telling us we have already requested to join. Forcing that local state");
          this.set({
            pendingAdminApprovalV2: [
              {
                uuid: ourUuid,
                timestamp: Date.now()
              }
            ]
          });
        }
      }
    }
    const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
    this.set({
      messageRequestResponseType: messageRequestEnum.ACCEPT,
      active_at: this.get("active_at") || Date.now()
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  async cancelJoinRequest() {
    const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
    const inviteLinkPassword = this.get("groupInviteLinkPassword");
    if (!inviteLinkPassword) {
      log.warn(`cancelJoinRequest/${this.idForLogging()}: We don't have an inviteLinkPassword!`);
    }
    await this.modifyGroupV2({
      name: "cancelJoinRequest",
      inviteLinkPassword,
      createGroupChange: () => this.denyPendingApprovalRequest(ourConversationId)
    });
  }
  async addMembersV2(conversationIds) {
    await this.modifyGroupV2({
      name: "addMembersV2",
      createGroupChange: () => window.Signal.Groups.buildAddMembersChange(this.attributes, conversationIds)
    });
  }
  async updateGroupAttributesV2(attributes) {
    await this.modifyGroupV2({
      name: "updateGroupAttributesV2",
      createGroupChange: () => window.Signal.Groups.buildUpdateAttributesChange({
        id: this.id,
        publicParams: this.get("publicParams"),
        revision: this.get("revision"),
        secretParams: this.get("secretParams")
      }, attributes)
    });
  }
  async leaveGroupV2() {
    const ourConversationId = window.ConversationController.getOurConversationId();
    if (ourConversationId && (0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMemberPending(ourConversationId)) {
      await this.modifyGroupV2({
        name: "delete",
        createGroupChange: () => this.removePendingMember([ourConversationId])
      });
    } else if (ourConversationId && (0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMember(ourConversationId)) {
      await this.modifyGroupV2({
        name: "delete",
        createGroupChange: () => this.removeMember(ourConversationId)
      });
    } else {
      log.error("leaveGroupV2: We were neither a member nor a pending member of the group");
    }
  }
  async addBannedMember(uuid) {
    if (this.isMember(uuid)) {
      log.warn("addBannedMember: Member is a part of the group!");
      return;
    }
    if (this.isMemberPending(uuid)) {
      log.warn("addBannedMember: Member is pending to be added to group!");
      return;
    }
    if (this.isMemberBanned(uuid)) {
      log.warn("addBannedMember: Member is already banned!");
      return;
    }
    return window.Signal.Groups.buildAddBannedMemberChange({
      group: this.attributes,
      uuid
    });
  }
  async blockGroupLinkRequests(uuid) {
    await this.modifyGroupV2({
      name: "addBannedMember",
      createGroupChange: async () => this.addBannedMember(uuid)
    });
  }
  async toggleAdmin(conversationId) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    if (!this.isMember(conversationId)) {
      log.error(`toggleAdmin: Member ${conversationId} is not a member of the group`);
      return;
    }
    await this.modifyGroupV2({
      name: "toggleAdmin",
      createGroupChange: () => this.toggleAdminChange(conversationId)
    });
  }
  async approvePendingMembershipFromGroupV2(conversationId) {
    if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMemberRequestingToJoin(conversationId)) {
      await this.modifyGroupV2({
        name: "approvePendingApprovalRequest",
        createGroupChange: () => this.approvePendingApprovalRequest(conversationId)
      });
    }
  }
  async revokePendingMembershipsFromGroupV2(conversationIds) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    const [conversationId] = conversationIds;
    if (conversationIds.length > 1) {
      await this.modifyGroupV2({
        name: "removePendingMember",
        createGroupChange: () => this.removePendingMember(conversationIds),
        extraConversationsForSend: conversationIds
      });
    } else if (this.isMemberRequestingToJoin(conversationId)) {
      await this.modifyGroupV2({
        name: "denyPendingApprovalRequest",
        createGroupChange: () => this.denyPendingApprovalRequest(conversationId),
        extraConversationsForSend: [conversationId]
      });
    } else if (this.isMemberPending(conversationId)) {
      await this.modifyGroupV2({
        name: "removePendingMember",
        createGroupChange: () => this.removePendingMember([conversationId]),
        extraConversationsForSend: [conversationId]
      });
    }
  }
  async removeFromGroupV2(conversationId) {
    if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMemberRequestingToJoin(conversationId)) {
      await this.modifyGroupV2({
        name: "denyPendingApprovalRequest",
        createGroupChange: () => this.denyPendingApprovalRequest(conversationId),
        extraConversationsForSend: [conversationId]
      });
    } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMemberPending(conversationId)) {
      await this.modifyGroupV2({
        name: "removePendingMember",
        createGroupChange: () => this.removePendingMember([conversationId]),
        extraConversationsForSend: [conversationId]
      });
    } else if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes) && this.isMember(conversationId)) {
      await this.modifyGroupV2({
        name: "removeFromGroup",
        createGroupChange: () => this.removeMember(conversationId),
        extraConversationsForSend: [conversationId]
      });
    } else {
      log.error(`removeFromGroupV2: Member ${conversationId} is neither a member nor a pending member of the group`);
    }
  }
  async syncMessageRequestResponse(response) {
    await this.applyMessageRequestResponse(response);
    const groupId = this.getGroupIdBuffer();
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("syncMessageRequestResponse: We are primary device; not sending message request sync");
      return;
    }
    try {
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getMessageRequestResponseSync({
        threadE164: this.get("e164"),
        threadUuid: this.get("uuid"),
        groupId,
        type: response
      }));
    } catch (error) {
      log.error("syncMessageRequestResponse: Failed to queue sync message", Errors.toLogFormat(error));
    }
  }
  async safeGetVerified() {
    const uuid = this.getUuid();
    if (!uuid) {
      return window.textsecure.storage.protocol.VerifiedStatus.DEFAULT;
    }
    const promise = window.textsecure.storage.protocol.getVerified(uuid);
    return promise.catch(() => window.textsecure.storage.protocol.VerifiedStatus.DEFAULT);
  }
  async updateVerified() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      await this.initialPromise;
      const verified = await this.safeGetVerified();
      if (this.get("verified") !== verified) {
        this.set({ verified });
        window.Signal.Data.updateConversation(this.attributes);
      }
      return;
    }
    this.fetchContacts();
    await Promise.all(this.contactCollection.map(async (contact) => {
      if (!(0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        await contact.updateVerified();
      }
    }));
  }
  setVerifiedDefault(options) {
    const { DEFAULT } = this.verifiedEnum;
    return this.queueJob("setVerifiedDefault", () => this._setVerified(DEFAULT, options));
  }
  setVerified(options) {
    const { VERIFIED } = this.verifiedEnum;
    return this.queueJob("setVerified", () => this._setVerified(VERIFIED, options));
  }
  setUnverified(options) {
    const { UNVERIFIED } = this.verifiedEnum;
    return this.queueJob("setUnverified", () => this._setVerified(UNVERIFIED, options));
  }
  async _setVerified(verified, providedOptions) {
    const options = providedOptions || {};
    window._.defaults(options, {
      viaStorageServiceSync: false,
      key: null
    });
    const { VERIFIED, DEFAULT } = this.verifiedEnum;
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      throw new Error("You cannot verify a group conversation. You must verify individual contacts.");
    }
    const uuid = this.getUuid();
    const beginningVerified = this.get("verified");
    let keyChange = false;
    if (options.viaStorageServiceSync) {
      (0, import_assert.strictAssert)(uuid, `Sync message didn't update uuid for conversation: ${this.id}`);
      keyChange = await window.textsecure.storage.protocol.processVerifiedMessage(uuid, verified, options.key || void 0);
    } else if (uuid) {
      await window.textsecure.storage.protocol.setVerified(uuid, verified);
    } else {
      log.warn(`_setVerified(${this.id}): no uuid to update protocol storage`);
    }
    this.set({ verified });
    if (!options.viaStorageServiceSync) {
      window.Signal.Data.updateConversation(this.attributes);
    }
    if (!options.viaStorageServiceSync) {
      if (keyChange) {
        this.captureChange("keyChange");
      }
      if (beginningVerified !== verified) {
        this.captureChange(`verified from=${beginningVerified} to=${verified}`);
      }
    }
    const didVerifiedChange = beginningVerified !== verified;
    const isExplicitUserAction = !options.viaStorageServiceSync;
    const shouldShowFromStorageSync = options.viaStorageServiceSync && verified !== DEFAULT;
    if (didVerifiedChange && isExplicitUserAction || didVerifiedChange && shouldShowFromStorageSync || keyChange && verified === VERIFIED) {
      await this.addVerifiedChange(this.id, verified === VERIFIED, {
        local: isExplicitUserAction
      });
    }
    if (isExplicitUserAction && uuid) {
      await this.sendVerifySyncMessage(this.get("e164"), uuid, verified);
    }
    return keyChange;
  }
  async sendVerifySyncMessage(e164, uuid, state) {
    const identifier = uuid ? uuid.toString() : e164;
    if (!identifier) {
      throw new Error("sendVerifySyncMessage: Neither e164 nor UUID were provided");
    }
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("sendVerifySyncMessage: We are primary device; not sending sync");
      return;
    }
    const key = await window.textsecure.storage.protocol.loadIdentityKey(import_UUID.UUID.checkedLookup(identifier));
    if (!key) {
      throw new Error(`sendVerifySyncMessage: No identity key found for identifier ${identifier}`);
    }
    try {
      await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getVerificationSync(e164, uuid.toString(), state, key));
    } catch (error) {
      log.error("sendVerifySyncMessage: Failed to queue sync message", Errors.toLogFormat(error));
    }
  }
  isVerified() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return this.get("verified") === this.verifiedEnum.VERIFIED;
    }
    if (!this.contactCollection?.length) {
      return false;
    }
    return this.contactCollection?.every((contact) => {
      if ((0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        return true;
      }
      return contact.isVerified();
    });
  }
  isUnverified() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      const verified = this.get("verified");
      return verified !== this.verifiedEnum.VERIFIED && verified !== this.verifiedEnum.DEFAULT;
    }
    if (!this.contactCollection?.length) {
      return true;
    }
    return this.contactCollection?.some((contact) => {
      if ((0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        return false;
      }
      return contact.isUnverified();
    });
  }
  getUnverified() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return this.isUnverified() ? new window.Whisper.ConversationCollection([this]) : new window.Whisper.ConversationCollection();
    }
    return new window.Whisper.ConversationCollection(this.contactCollection?.filter((contact) => {
      if ((0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        return false;
      }
      return contact.isUnverified();
    }));
  }
  async setApproved() {
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      throw new Error("You cannot set a group conversation as trusted. You must set individual contacts as trusted.");
    }
    const uuid = this.getUuid();
    if (!uuid) {
      log.warn(`setApproved(${this.id}): no uuid, ignoring`);
      return;
    }
    return window.textsecure.storage.protocol.setApproval(uuid, true);
  }
  safeIsUntrusted() {
    try {
      const uuid = this.getUuid();
      (0, import_assert.strictAssert)(uuid, `No uuid for conversation: ${this.id}`);
      return window.textsecure.storage.protocol.isUntrusted(uuid);
    } catch (err) {
      return false;
    }
  }
  isUntrusted() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return this.safeIsUntrusted();
    }
    if (!this.contactCollection.length) {
      return false;
    }
    return this.contactCollection.any((contact) => {
      if ((0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        return false;
      }
      return contact.safeIsUntrusted();
    });
  }
  getUntrusted() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      if (this.isUntrusted()) {
        return new window.Whisper.ConversationCollection([this]);
      }
      return new window.Whisper.ConversationCollection();
    }
    return new window.Whisper.ConversationCollection(this.contactCollection.filter((contact) => {
      if ((0, import_whatTypeOfConversation.isMe)(contact.attributes)) {
        return false;
      }
      return contact.isUntrusted();
    }));
  }
  getSentMessageCount() {
    return this.get("sentMessageCount") || 0;
  }
  getMessageRequestResponseType() {
    return this.get("messageRequestResponseType") || 0;
  }
  getAboutText() {
    if (!this.get("about")) {
      return void 0;
    }
    const emoji = this.get("aboutEmoji");
    const text = this.get("about");
    if (!emoji) {
      return text;
    }
    return window.i18n("message--getNotificationText--text-with-emoji", {
      text,
      emoji
    });
  }
  getAccepted() {
    return (0, import_isConversationAccepted.isConversationAccepted)(this.attributes);
  }
  onMemberVerifiedChange() {
    this.trigger("change:verified", this);
    this.trigger("change", this, { force: true });
  }
  async toggleVerified() {
    if (this.isVerified()) {
      return this.setVerifiedDefault();
    }
    return this.setVerified();
  }
  async addChatSessionRefreshed({
    receivedAt,
    receivedAtCounter
  }) {
    log.info(`addChatSessionRefreshed: adding for ${this.idForLogging()}`, {
      receivedAt
    });
    const message = {
      conversationId: this.id,
      type: "chat-session-refreshed",
      sent_at: receivedAt,
      received_at: receivedAtCounter,
      received_at_ms: receivedAt,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    this.trigger("newmessage", model);
    this.updateUnread();
  }
  async addDeliveryIssue({
    receivedAt,
    receivedAtCounter,
    senderUuid,
    sentAt
  }) {
    log.info(`addDeliveryIssue: adding for ${this.idForLogging()}`, {
      sentAt,
      senderUuid
    });
    const message = {
      conversationId: this.id,
      type: "delivery-issue",
      sourceUuid: senderUuid,
      sent_at: receivedAt,
      received_at: receivedAtCounter,
      received_at_ms: receivedAt,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    this.trigger("newmessage", model);
    await this.notify(model);
    this.updateUnread();
  }
  async addKeyChange(keyChangedId) {
    log.info("adding key change advisory for", this.idForLogging(), keyChangedId.toString(), this.get("timestamp"));
    const timestamp = Date.now();
    const message = {
      conversationId: this.id,
      type: "keychange",
      sent_at: this.get("timestamp"),
      received_at: window.Signal.Util.incrementMessageCounter(),
      received_at_ms: timestamp,
      key_changed: keyChangedId.toString(),
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen,
      schemaVersion: Message.VERSION_NEEDED_FOR_DISPLAY
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    const isUntrusted = await this.isUntrusted();
    this.trigger("newmessage", model);
    const uuid = this.get("uuid");
    if (isUntrusted && uuid) {
      window.reduxActions.calling.keyChanged({ uuid });
    }
  }
  async addVerifiedChange(verifiedChangeId, verified, options = { local: true }) {
    if ((0, import_whatTypeOfConversation.isMe)(this.attributes)) {
      log.info("refusing to add verified change advisory for our own number");
      return;
    }
    const lastMessage = this.get("timestamp") || Date.now();
    log.info("adding verified change advisory for", this.idForLogging(), verifiedChangeId, lastMessage);
    const shouldBeUnseen = !options.local && !verified;
    const timestamp = Date.now();
    const message = {
      id: (0, import_uuid.v4)(),
      conversationId: this.id,
      local: Boolean(options.local),
      readStatus: shouldBeUnseen ? import_MessageReadStatus.ReadStatus.Unread : import_MessageReadStatus.ReadStatus.Read,
      received_at_ms: timestamp,
      received_at: window.Signal.Util.incrementMessageCounter(),
      seenStatus: shouldBeUnseen ? import_MessageSeenStatus.SeenStatus.Unseen : import_MessageSeenStatus.SeenStatus.Unseen,
      sent_at: lastMessage,
      timestamp,
      type: "verified-change",
      verified,
      verifiedChanged: verifiedChangeId
    };
    await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString(),
      forceSave: true
    });
    const model = window.MessageController.register(message.id, new window.Whisper.Message(message));
    this.trigger("newmessage", model);
    this.updateUnread();
    const uuid = this.getUuid();
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) && uuid) {
      window.ConversationController.getAllGroupsInvolvingUuid(uuid).then((groups) => {
        window._.forEach(groups, (group) => {
          group.addVerifiedChange(this.id, verified, options);
        });
      });
    }
  }
  async addCallHistory(callHistoryDetails, receivedAtCounter) {
    let timestamp;
    let unread;
    let detailsToSave;
    switch (callHistoryDetails.callMode) {
      case import_Calling.CallMode.Direct:
        timestamp = callHistoryDetails.endedTime;
        unread = !callHistoryDetails.wasDeclined && !callHistoryDetails.acceptedTime;
        detailsToSave = {
          ...callHistoryDetails,
          callMode: import_Calling.CallMode.Direct
        };
        break;
      case import_Calling.CallMode.Group:
        timestamp = callHistoryDetails.startedTime;
        unread = false;
        detailsToSave = callHistoryDetails;
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(callHistoryDetails);
    }
    const message = {
      conversationId: this.id,
      type: "call-history",
      sent_at: timestamp,
      received_at: receivedAtCounter || window.Signal.Util.incrementMessageCounter(),
      received_at_ms: timestamp,
      readStatus: unread ? import_MessageReadStatus.ReadStatus.Unread : import_MessageReadStatus.ReadStatus.Read,
      seenStatus: unread ? import_MessageSeenStatus.SeenStatus.Unseen : import_MessageSeenStatus.SeenStatus.NotApplicable,
      callHistoryDetails: detailsToSave
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    this.trigger("newmessage", model);
    this.updateUnread();
  }
  async updateCallHistoryForGroupCall(eraId, creatorUuid) {
    const oldCachedEraId = this.cachedLatestGroupCallEraId;
    this.cachedLatestGroupCallEraId = eraId;
    const alreadyHasMessage = oldCachedEraId && oldCachedEraId === eraId || await window.Signal.Data.hasGroupCallHistoryMessage(this.id, eraId);
    if (alreadyHasMessage) {
      return false;
    }
    await this.addCallHistory({
      callMode: import_Calling.CallMode.Group,
      creatorUuid,
      eraId,
      startedTime: Date.now()
    }, void 0);
    return true;
  }
  async addProfileChange(profileChange, conversationId) {
    const now = Date.now();
    const message = {
      conversationId: this.id,
      type: "profile-change",
      sent_at: now,
      received_at: window.Signal.Util.incrementMessageCounter(),
      received_at_ms: now,
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: import_MessageSeenStatus.SeenStatus.NotApplicable,
      changedId: conversationId || this.id,
      profileChange
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    this.trigger("newmessage", model);
    const uuid = this.getUuid();
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) && uuid) {
      window.ConversationController.getAllGroupsInvolvingUuid(uuid).then((groups) => {
        window._.forEach(groups, (group) => {
          group.addProfileChange(profileChange, this.id);
        });
      });
    }
  }
  async addNotification(type, extra = {}) {
    const now = Date.now();
    const message = {
      conversationId: this.id,
      type,
      sent_at: now,
      received_at: window.Signal.Util.incrementMessageCounter(),
      received_at_ms: now,
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: import_MessageSeenStatus.SeenStatus.NotApplicable,
      ...extra
    };
    const id = await window.Signal.Data.saveMessage(message, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    const model = window.MessageController.register(id, new window.Whisper.Message({
      ...message,
      id
    }));
    this.trigger("newmessage", model);
    return id;
  }
  async maybeSetPendingUniversalTimer(hasUserInitiatedMessages) {
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return;
    }
    if (this.isSMSOnly()) {
      return;
    }
    if (hasUserInitiatedMessages) {
      await this.maybeRemoveUniversalTimer();
      return;
    }
    if (this.get("pendingUniversalTimer") || this.get("expireTimer")) {
      return;
    }
    const expireTimer = universalExpireTimer.get();
    if (!expireTimer) {
      return;
    }
    log.info(`maybeSetPendingUniversalTimer(${this.idForLogging()}): added notification`);
    const notificationId = await this.addNotification("universal-timer-notification");
    this.set("pendingUniversalTimer", notificationId);
  }
  async maybeApplyUniversalTimer() {
    if (!await this.maybeRemoveUniversalTimer()) {
      return;
    }
    if (this.get("expireTimer")) {
      return;
    }
    const expireTimer = universalExpireTimer.get();
    if (expireTimer) {
      log.info(`maybeApplyUniversalTimer(${this.idForLogging()}): applying timer`);
      await this.updateExpirationTimer(expireTimer, {
        reason: "maybeApplyUniversalTimer"
      });
    }
  }
  async maybeRemoveUniversalTimer() {
    const notificationId = this.get("pendingUniversalTimer");
    if (!notificationId) {
      return false;
    }
    this.set("pendingUniversalTimer", void 0);
    log.info(`maybeRemoveUniversalTimer(${this.idForLogging()}): removed notification`);
    const message = window.MessageController.getById(notificationId);
    if (message) {
      await window.Signal.Data.removeMessage(message.id);
    }
    return true;
  }
  async addChangeNumberNotification(oldValue, newValue) {
    const sourceUuid = this.getCheckedUuid("Change number notification without uuid");
    const { storage } = window.textsecure;
    if (storage.user.getOurUuidKind(sourceUuid) !== import_UUID.UUIDKind.Unknown) {
      log.info(`Conversation ${this.idForLogging()}: not adding change number notification for ourselves`);
      return;
    }
    log.info(`Conversation ${this.idForLogging()}: adding change number notification for ${sourceUuid.toString()} from ${oldValue} to ${newValue}`);
    const convos = [
      this,
      ...await window.ConversationController.getAllGroupsInvolvingUuid(sourceUuid)
    ];
    await Promise.all(convos.map((convo) => {
      return convo.addNotification("change-number-notification", {
        readStatus: import_MessageReadStatus.ReadStatus.Read,
        seenStatus: import_MessageSeenStatus.SeenStatus.Unseen,
        sourceUuid: sourceUuid.toString()
      });
    }));
  }
  async onReadMessage(message, readAt) {
    return this.queueJob("onReadMessage", () => this.markRead(message.get("received_at"), {
      newestSentAt: message.get("sent_at"),
      sendReadReceipts: false,
      readAt
    }));
  }
  validate(attributes = this.attributes) {
    const required = ["type"];
    const missing = window._.filter(required, (attr) => !attributes[attr]);
    if (missing.length) {
      return `Conversation must have ${missing}`;
    }
    if (attributes.type !== "private" && attributes.type !== "group") {
      return `Invalid conversation type: ${attributes.type}`;
    }
    const atLeastOneOf = ["e164", "uuid", "groupId"];
    const hasAtLeastOneOf = window._.filter(atLeastOneOf, (attr) => attributes[attr]).length > 0;
    if (!hasAtLeastOneOf) {
      return "Missing one of e164, uuid, or groupId";
    }
    const error = this.validateNumber() || this.validateUuid();
    if (error) {
      return error;
    }
    return null;
  }
  validateNumber() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) && this.get("e164")) {
      const regionCode = window.storage.get("regionCode");
      if (!regionCode) {
        throw new Error("No region code");
      }
      const number = (0, import_libphonenumberUtil.parseNumber)(this.get("e164"), regionCode);
      if (number.isValidNumber) {
        this.set({ e164: number.e164 });
        return null;
      }
      let errorMessage;
      if (number.error instanceof Error) {
        errorMessage = number.error.message;
      } else if (typeof number.error === "string") {
        errorMessage = number.error;
      }
      return errorMessage || "Invalid phone number";
    }
    return null;
  }
  validateUuid() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) && this.get("uuid")) {
      if ((0, import_UUID.isValidUuid)(this.get("uuid"))) {
        return null;
      }
      return "Invalid UUID";
    }
    return null;
  }
  queueJob(name, callback) {
    this.jobQueue = this.jobQueue || new window.PQueue({ concurrency: 1 });
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(callback, `conversation ${this.idForLogging()}`);
    const abortController = new AbortController();
    const { signal: abortSignal } = abortController;
    const queuedAt = Date.now();
    return this.jobQueue.add(async () => {
      const startedAt = Date.now();
      const waitTime = startedAt - queuedAt;
      if (waitTime > JOB_REPORTING_THRESHOLD_MS) {
        log.info(`Conversation job ${name} was blocked for ${waitTime}ms`);
      }
      try {
        return await taskWithTimeout(abortSignal);
      } catch (error) {
        abortController.abort();
        throw error;
      } finally {
        const duration = Date.now() - startedAt;
        if (duration > JOB_REPORTING_THRESHOLD_MS) {
          log.info(`Conversation job ${name} took ${duration}ms`);
        }
      }
    });
  }
  isAdmin(id) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const uuid = import_UUID.UUID.checkedLookup(id).toString();
    const members = this.get("membersV2") || [];
    const member = members.find((x) => x.uuid === uuid);
    if (!member) {
      return false;
    }
    const MEMBER_ROLES = import_protobuf.SignalService.Member.Role;
    return member.role === MEMBER_ROLES.ADMINISTRATOR;
  }
  getUuid() {
    try {
      const value = this.get("uuid");
      return value && new import_UUID.UUID(value);
    } catch (err) {
      log.warn(`getUuid(): failed to obtain conversation(${this.id}) uuid due to`, Errors.toLogFormat(err));
      return void 0;
    }
  }
  getCheckedUuid(reason) {
    const result = this.getUuid();
    (0, import_assert.strictAssert)(result !== void 0, reason);
    return result;
  }
  getMemberships() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return [];
    }
    const members = this.get("membersV2") || [];
    return members.map((member) => ({
      isAdmin: member.role === import_protobuf.SignalService.Member.Role.ADMINISTRATOR,
      uuid: member.uuid
    }));
  }
  getGroupLink() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return void 0;
    }
    if (!this.get("groupInviteLinkPassword")) {
      return void 0;
    }
    return window.Signal.Groups.buildGroupLink(this);
  }
  getPendingMemberships() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return [];
    }
    const members = this.get("pendingMembersV2") || [];
    return members.map((member) => ({
      addedByUserId: member.addedByUserId,
      uuid: member.uuid
    }));
  }
  getPendingApprovalMemberships() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return [];
    }
    const members = this.get("pendingAdminApprovalV2") || [];
    return members.map((member) => ({
      uuid: member.uuid
    }));
  }
  getBannedMemberships() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return [];
    }
    return (this.get("bannedMembersV2") || []).map((member) => member.uuid);
  }
  getMembers(options = {}) {
    return (0, import_lodash.compact)((0, import_getConversationMembers.getConversationMembers)(this.attributes, options).map((conversationAttrs) => window.ConversationController.get(conversationAttrs.id)));
  }
  canBeAnnouncementGroup() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    if (!(0, import_isAnnouncementGroupReady.isAnnouncementGroupReady)()) {
      return false;
    }
    return true;
  }
  getMemberIds() {
    const members = this.getMembers();
    return members.map((member) => member.id);
  }
  getMemberUuids() {
    const members = this.getMembers();
    return members.map((member) => {
      return member.getCheckedUuid("Group member without uuid");
    });
  }
  getRecipients({
    includePendingMembers,
    extraConversationsForSend
  } = {}) {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return [this.getSendTarget()];
    }
    const members = this.getMembers({ includePendingMembers });
    const extraConversations = extraConversationsForSend ? extraConversationsForSend.map((id) => window.ConversationController.get(id)).filter(import_isNotNil.isNotNil) : [];
    const unique = extraConversations.length ? window._.unique([...members, ...extraConversations]) : members;
    return window._.compact(unique.map((member) => (0, import_whatTypeOfConversation.isMe)(member.attributes) ? null : member.getSendTarget()));
  }
  getMemberConversationIds() {
    return new Set((0, import_iterables.map)(this.getMembers(), (conversation) => conversation.id));
  }
  getRecipientConversationIds() {
    const recipients = this.getRecipients();
    const conversationIds = recipients.map((identifier) => {
      const conversation = window.ConversationController.getOrCreate(identifier, "private");
      (0, import_assert.strictAssert)(conversation, "getRecipientConversationIds should have created conversation!");
      return conversation.id;
    });
    return new Set(conversationIds);
  }
  async getQuoteAttachment(attachments, preview, sticker) {
    if (attachments && attachments.length) {
      const attachmentsToUse = Array.from((0, import_iterables.take)(attachments, 1));
      const isGIFQuote = (0, import_Attachment.isGIF)(attachmentsToUse);
      return Promise.all((0, import_iterables.map)(attachmentsToUse, async (attachment) => {
        const { path, fileName, thumbnail, contentType } = attachment;
        if (!path) {
          return {
            contentType: isGIFQuote ? import_MIME.IMAGE_GIF : contentType,
            fileName: fileName || null,
            thumbnail: null
          };
        }
        return {
          contentType: isGIFQuote ? import_MIME.IMAGE_GIF : contentType,
          fileName: fileName || null,
          thumbnail: thumbnail ? {
            ...await loadAttachmentData(thumbnail),
            objectUrl: getAbsoluteAttachmentPath(thumbnail.path)
          } : null
        };
      }));
    }
    if (preview && preview.length) {
      const previewsToUse = (0, import_iterables.take)(preview, 1);
      return Promise.all((0, import_iterables.map)(previewsToUse, async (attachment) => {
        const { image } = attachment;
        if (!image) {
          return {
            contentType: import_MIME.IMAGE_JPEG,
            fileName: null,
            thumbnail: null
          };
        }
        const { contentType } = image;
        return {
          contentType,
          fileName: null,
          thumbnail: image ? {
            ...await loadAttachmentData(image),
            objectUrl: getAbsoluteAttachmentPath(image.path)
          } : null
        };
      }));
    }
    if (sticker && sticker.data && sticker.data.path) {
      const { path, contentType } = sticker.data;
      return [
        {
          contentType,
          fileName: null,
          thumbnail: {
            ...await loadAttachmentData(sticker.data),
            objectUrl: getAbsoluteAttachmentPath(path)
          }
        }
      ];
    }
    return [];
  }
  async makeQuote(quotedMessage) {
    const { getName } = EmbeddedContact;
    const contact = (0, import_helpers.getContact)(quotedMessage.attributes);
    const attachments = quotedMessage.get("attachments");
    const preview = quotedMessage.get("preview");
    const sticker = quotedMessage.get("sticker");
    const body = quotedMessage.get("body");
    const embeddedContact = quotedMessage.get("contact");
    const embeddedContactName = embeddedContact && embeddedContact.length > 0 ? getName(embeddedContact[0]) : "";
    return {
      authorUuid: contact.get("uuid"),
      attachments: (0, import_message.isTapToView)(quotedMessage.attributes) ? [{ contentType: import_MIME.IMAGE_JPEG, fileName: null }] : await this.getQuoteAttachment(attachments, preview, sticker),
      bodyRanges: quotedMessage.get("bodyRanges"),
      id: quotedMessage.get("sent_at"),
      isViewOnce: (0, import_message.isTapToView)(quotedMessage.attributes),
      isGiftBadge: (0, import_message.isGiftBadge)(quotedMessage.attributes),
      messageId: quotedMessage.get("id"),
      referencedMessageNotFound: false,
      text: body || embeddedContactName
    };
  }
  async sendStickerMessage(packId, stickerId) {
    const packData = Stickers.getStickerPack(packId);
    const stickerData = Stickers.getSticker(packId, stickerId);
    if (!stickerData || !packData) {
      log.warn(`Attempted to send nonexistent (${packId}, ${stickerId}) sticker!`);
      return;
    }
    const { key } = packData;
    const { emoji, path, width, height } = stickerData;
    const data = await readStickerData(path);
    let contentType;
    const sniffedMimeType = (0, import_sniffImageMimeType.sniffImageMimeType)(data);
    if (sniffedMimeType) {
      contentType = sniffedMimeType;
    } else {
      log.warn("sendStickerMessage: Unable to sniff sticker MIME type; falling back to WebP");
      contentType = import_MIME.IMAGE_WEBP;
    }
    const sticker = {
      packId,
      stickerId,
      packKey: key,
      emoji,
      data: {
        size: data.byteLength,
        data,
        contentType,
        width,
        height,
        blurHash: await window.imageToBlurHash(new Blob([data], {
          type: import_MIME.IMAGE_JPEG
        }))
      }
    };
    this.enqueueMessageForSend({
      body: void 0,
      attachments: [],
      sticker
    });
    window.reduxActions.stickers.useSticker(packId, stickerId);
  }
  async sendDeleteForEveryoneMessage(options) {
    const { timestamp: targetTimestamp, id: messageId } = options;
    const message = await getMessageById(messageId);
    if (!message) {
      throw new Error("sendDeleteForEveryoneMessage: Cannot find message!");
    }
    const messageModel = window.MessageController.register(messageId, message);
    const timestamp = Date.now();
    if (timestamp - targetTimestamp > THREE_HOURS) {
      throw new Error("Cannot send DOE for a message older than three hours");
    }
    messageModel.set({
      deletedForEveryoneSendStatus: (0, import_iterables.zipObject)(this.getRecipientConversationIds(), (0, import_iterables.repeat)(false))
    });
    try {
      const jobData = {
        type: import_conversationJobQueue.conversationQueueJobEnum.enum.DeleteForEveryone,
        conversationId: this.id,
        messageId,
        recipients: this.getRecipients(),
        revision: this.get("revision"),
        targetTimestamp
      };
      await import_conversationJobQueue.conversationJobQueue.add(jobData, async (jobToInsert) => {
        log.info(`sendDeleteForEveryoneMessage: saving message ${this.idForLogging()} and job ${jobToInsert.id}`);
        await window.Signal.Data.saveMessage(messageModel.attributes, {
          jobToInsert,
          ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
        });
      });
    } catch (error) {
      log.error("sendDeleteForEveryoneMessage: Failed to queue delete for everyone", Errors.toLogFormat(error));
      throw error;
    }
    const deleteModel = new import_Deletes.DeleteModel({
      targetSentTimestamp: targetTimestamp,
      serverTimestamp: Date.now(),
      fromId: window.ConversationController.getOurConversationIdOrThrow()
    });
    await window.Signal.Util.deleteForEveryone(messageModel, deleteModel);
  }
  async sendProfileKeyUpdate() {
    if ((0, import_whatTypeOfConversation.isMe)(this.attributes)) {
      return;
    }
    if (!this.get("profileSharing")) {
      log.error("sendProfileKeyUpdate: profileSharing not enabled for conversation", this.idForLogging());
      return;
    }
    try {
      await import_conversationJobQueue.conversationJobQueue.add({
        type: import_conversationJobQueue.conversationQueueJobEnum.enum.ProfileKey,
        conversationId: this.id,
        revision: this.get("revision")
      });
    } catch (error) {
      log.error("sendProfileKeyUpdate: Failed to queue profile share", Errors.toLogFormat(error));
    }
  }
  async enqueueMessageForSend({
    attachments,
    body,
    contact,
    mentions,
    preview,
    quote,
    sticker
  }, {
    dontClearDraft,
    sendHQImages,
    storyId,
    timestamp,
    extraReduxActions
  } = {}) {
    if (this.isGroupV1AndDisabled()) {
      return;
    }
    const now = timestamp || Date.now();
    log.info("Sending message to conversation", this.idForLogging(), "with timestamp", now);
    this.clearTypingTimers();
    const mandatoryProfileSharingEnabled = window.Signal.RemoteConfig.isEnabled("desktop.mandatoryProfileSharing");
    await this.maybeApplyUniversalTimer();
    const expireTimer = this.get("expireTimer");
    const recipientMaybeConversations = (0, import_iterables.map)(this.getRecipients(), (identifier) => window.ConversationController.get(identifier));
    const recipientConversations = (0, import_iterables.filter)(recipientMaybeConversations, import_isNotNil.isNotNil);
    const recipientConversationIds = (0, import_iterables.concat)((0, import_iterables.map)(recipientConversations, (c) => c.id), [window.ConversationController.getOurConversationIdOrThrow()]);
    const attachmentsToSend = preview && preview.length ? [] : attachments;
    if (preview && preview.length) {
      attachments.forEach((attachment) => {
        if (attachment.path) {
          deleteAttachmentData(attachment.path);
        }
      });
    }
    const attributes = await upgradeMessageSchema({
      id: import_UUID.UUID.generate().toString(),
      timestamp: now,
      type: "outgoing",
      body,
      conversationId: this.id,
      contact,
      quote,
      preview,
      attachments: attachmentsToSend,
      sent_at: now,
      received_at: window.Signal.Util.incrementMessageCounter(),
      received_at_ms: now,
      expireTimer,
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: import_MessageSeenStatus.SeenStatus.NotApplicable,
      sticker,
      bodyRanges: mentions,
      sendHQImages,
      sendStateByConversationId: (0, import_iterables.zipObject)(recipientConversationIds, (0, import_iterables.repeat)({
        status: import_MessageSendState.SendStatus.Pending,
        updatedAt: now
      })),
      storyId
    });
    const model = new window.Whisper.Message(attributes);
    const message = window.MessageController.register(model.id, model);
    message.cachedOutgoingContactData = contact;
    message.cachedOutgoingPreviewData = preview;
    message.cachedOutgoingQuoteData = quote;
    message.cachedOutgoingStickerData = sticker;
    const dbStart = Date.now();
    (0, import_assert.strictAssert)(typeof message.attributes.timestamp === "number", "Expected a timestamp");
    await import_conversationJobQueue.conversationJobQueue.add({
      type: import_conversationJobQueue.conversationQueueJobEnum.enum.NormalMessage,
      conversationId: this.id,
      messageId: message.id,
      revision: this.get("revision")
    }, async (jobToInsert) => {
      log.info(`enqueueMessageForSend: saving message ${message.id} and job ${jobToInsert.id}`);
      await window.Signal.Data.saveMessage(message.attributes, {
        jobToInsert,
        forceSave: true,
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    });
    const dbDuration = Date.now() - dbStart;
    if (dbDuration > SEND_REPORTING_THRESHOLD_MS) {
      log.info(`ConversationModel(${this.idForLogging()}.sendMessage(${now}): db save took ${dbDuration}ms`);
    }
    const renderStart = Date.now();
    await this.beforeAddSingleMessage();
    this.isInReduxBatch = true;
    (0, import_react_redux.batch)(() => {
      try {
        const { clearUnreadMetrics } = window.reduxActions.conversations;
        clearUnreadMetrics(this.id);
        const enableProfileSharing = Boolean(mandatoryProfileSharingEnabled && !this.get("profileSharing"));
        this.doAddSingleMessage(model, { isJustSent: true });
        const draftProperties = dontClearDraft ? {} : {
          draft: null,
          draftTimestamp: null,
          lastMessage: model.getNotificationText(),
          lastMessageStatus: "sending"
        };
        this.set({
          ...draftProperties,
          ...enableProfileSharing ? { profileSharing: true } : {},
          ...this.incrementSentMessageCount({ dry: true }),
          active_at: now,
          timestamp: now,
          isArchived: false
        });
        if (enableProfileSharing) {
          this.captureChange("mandatoryProfileSharing");
        }
        extraReduxActions?.();
      } finally {
        this.isInReduxBatch = false;
      }
    });
    if (sticker) {
      await addStickerPackReference(model.id, sticker.packId);
    }
    const renderDuration = Date.now() - renderStart;
    if (renderDuration > SEND_REPORTING_THRESHOLD_MS) {
      log.info(`ConversationModel(${this.idForLogging()}.sendMessage(${now}): render save took ${renderDuration}ms`);
    }
    window.Signal.Data.updateConversation(this.attributes);
    return attributes;
  }
  isFromOrAddedByTrustedContact() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return Boolean(this.get("name")) || this.get("profileSharing");
    }
    const addedBy = this.get("addedBy");
    if (!addedBy) {
      return false;
    }
    const conv = window.ConversationController.get(addedBy);
    if (!conv) {
      return false;
    }
    return Boolean((0, import_whatTypeOfConversation.isMe)(conv.attributes) || conv.get("name") || conv.get("profileSharing"));
  }
  async updateLastMessage() {
    if (!this.id) {
      return;
    }
    const ourConversationId = window.ConversationController.getOurConversationId();
    if (!ourConversationId) {
      throw new Error("updateLastMessage: Failed to fetch ourConversationId");
    }
    const conversationId = this.id;
    const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
    const stats = await window.Signal.Data.getConversationMessageStats({
      conversationId,
      isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes),
      ourUuid
    });
    this.queueJob("maybeSetPendingUniversalTimer", async () => this.maybeSetPendingUniversalTimer(stats.hasUserInitiatedMessages));
    const { preview, activity } = stats;
    let previewMessage;
    let activityMessage;
    if (preview) {
      previewMessage = window.MessageController.register(preview.id, preview);
    }
    if (activity) {
      activityMessage = window.MessageController.register(activity.id, activity);
    }
    if (this.hasDraft() && this.get("draftTimestamp") && (!previewMessage || previewMessage.get("sent_at") < this.get("draftTimestamp"))) {
      return;
    }
    const currentTimestamp = this.get("timestamp") || null;
    const timestamp = activityMessage ? activityMessage.get("sent_at") || activityMessage.get("received_at") || currentTimestamp : currentTimestamp;
    this.set({
      lastMessage: (previewMessage ? previewMessage.getNotificationText() : "") || "",
      lastMessageStatus: (previewMessage ? (0, import_message.getMessagePropStatus)(previewMessage.attributes, ourConversationId) : null) || null,
      timestamp,
      lastMessageDeletedForEveryone: previewMessage ? previewMessage.get("deletedForEveryone") : false
    });
    window.Signal.Data.updateConversation(this.attributes);
  }
  setArchived(isArchived) {
    const before = this.get("isArchived");
    this.set({ isArchived });
    window.Signal.Data.updateConversation(this.attributes);
    const after = this.get("isArchived");
    if (Boolean(before) !== Boolean(after)) {
      if (after) {
        this.unpin();
      }
      this.captureChange("isArchived");
    }
  }
  setMarkedUnread(markedUnread) {
    const previousMarkedUnread = this.get("markedUnread");
    this.set({ markedUnread });
    window.Signal.Data.updateConversation(this.attributes);
    if (Boolean(previousMarkedUnread) !== Boolean(markedUnread)) {
      this.captureChange("markedUnread");
    }
  }
  async refreshGroupLink() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    const groupInviteLinkPassword = Bytes.toBase64(window.Signal.Groups.generateGroupInviteLinkPassword());
    log.info("refreshGroupLink for conversation", this.idForLogging());
    await this.modifyGroupV2({
      name: "updateInviteLinkPassword",
      createGroupChange: async () => window.Signal.Groups.buildInviteLinkPasswordChange(this.attributes, groupInviteLinkPassword)
    });
    this.set({ groupInviteLinkPassword });
  }
  async toggleGroupLink(value) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    const shouldCreateNewGroupLink = value && !this.get("groupInviteLinkPassword");
    const groupInviteLinkPassword = this.get("groupInviteLinkPassword") || Bytes.toBase64(window.Signal.Groups.generateGroupInviteLinkPassword());
    log.info("toggleGroupLink for conversation", this.idForLogging(), value);
    const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
    const addFromInviteLink = value ? ACCESS_ENUM.ANY : ACCESS_ENUM.UNSATISFIABLE;
    if (shouldCreateNewGroupLink) {
      await this.modifyGroupV2({
        name: "updateNewGroupLink",
        createGroupChange: async () => window.Signal.Groups.buildNewGroupLinkChange(this.attributes, groupInviteLinkPassword, addFromInviteLink)
      });
    } else {
      await this.modifyGroupV2({
        name: "updateAccessControlAddFromInviteLink",
        createGroupChange: async () => window.Signal.Groups.buildAccessControlAddFromInviteLinkChange(this.attributes, addFromInviteLink)
      });
    }
    this.set({
      accessControl: {
        addFromInviteLink,
        attributes: this.get("accessControl")?.attributes || ACCESS_ENUM.MEMBER,
        members: this.get("accessControl")?.members || ACCESS_ENUM.MEMBER
      }
    });
    if (shouldCreateNewGroupLink) {
      this.set({ groupInviteLinkPassword });
    }
  }
  async updateAccessControlAddFromInviteLink(value) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
    const addFromInviteLink = value ? ACCESS_ENUM.ADMINISTRATOR : ACCESS_ENUM.ANY;
    await this.modifyGroupV2({
      name: "updateAccessControlAddFromInviteLink",
      createGroupChange: async () => window.Signal.Groups.buildAccessControlAddFromInviteLinkChange(this.attributes, addFromInviteLink)
    });
    this.set({
      accessControl: {
        addFromInviteLink,
        attributes: this.get("accessControl")?.attributes || ACCESS_ENUM.MEMBER,
        members: this.get("accessControl")?.members || ACCESS_ENUM.MEMBER
      }
    });
  }
  async updateAccessControlAttributes(value) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    await this.modifyGroupV2({
      name: "updateAccessControlAttributes",
      createGroupChange: async () => window.Signal.Groups.buildAccessControlAttributesChange(this.attributes, value)
    });
    const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
    this.set({
      accessControl: {
        addFromInviteLink: this.get("accessControl")?.addFromInviteLink || ACCESS_ENUM.MEMBER,
        attributes: value,
        members: this.get("accessControl")?.members || ACCESS_ENUM.MEMBER
      }
    });
  }
  async updateAccessControlMembers(value) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return;
    }
    await this.modifyGroupV2({
      name: "updateAccessControlMembers",
      createGroupChange: async () => window.Signal.Groups.buildAccessControlMembersChange(this.attributes, value)
    });
    const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
    this.set({
      accessControl: {
        addFromInviteLink: this.get("accessControl")?.addFromInviteLink || ACCESS_ENUM.MEMBER,
        attributes: this.get("accessControl")?.attributes || ACCESS_ENUM.MEMBER,
        members: value
      }
    });
  }
  async updateAnnouncementsOnly(value) {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes) || !this.canBeAnnouncementGroup()) {
      return;
    }
    await this.modifyGroupV2({
      name: "updateAnnouncementsOnly",
      createGroupChange: async () => window.Signal.Groups.buildAnnouncementsOnlyChange(this.attributes, value)
    });
    this.set({ announcementsOnly: value });
  }
  async updateExpirationTimer(providedExpireTimer, {
    reason,
    receivedAt,
    receivedAtMS = Date.now(),
    sentAt: providedSentAt,
    source: providedSource,
    fromSync = false,
    isInitialSync = false,
    fromGroupUpdate = false
  }) {
    const isSetByOther = providedSource || providedSentAt !== void 0;
    if ((0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      if (isSetByOther) {
        throw new Error("updateExpirationTimer: GroupV2 timers are not updated this way");
      }
      await this.modifyGroupV2({
        name: "updateExpirationTimer",
        createGroupChange: () => this.updateExpirationTimerInGroupV2(providedExpireTimer)
      });
      return false;
    }
    if (!isSetByOther && this.isGroupV1AndDisabled()) {
      throw new Error("updateExpirationTimer: GroupV1 is deprecated; cannot update expiration timer");
    }
    let expireTimer = providedExpireTimer;
    let source = providedSource;
    if (this.get("left")) {
      return false;
    }
    if (!expireTimer) {
      expireTimer = void 0;
    }
    if (this.get("expireTimer") === expireTimer || !expireTimer && !this.get("expireTimer")) {
      return null;
    }
    const logId = `updateExpirationTimer(${this.idForLogging()}, ${expireTimer || "disabled"}) source=${source ?? "?"} reason=${reason}`;
    log.info(`${logId}: updating`);
    if (!isSetByOther) {
      try {
        await import_conversationJobQueue.conversationJobQueue.add({
          type: import_conversationJobQueue.conversationQueueJobEnum.enum.DirectExpirationTimerUpdate,
          conversationId: this.id,
          expireTimer
        });
      } catch (error) {
        log.error(`${logId}: Failed to queue expiration timer update`, Errors.toLogFormat(error));
        throw error;
      }
    }
    source = source || window.ConversationController.getOurConversationId();
    this.set({ expireTimer });
    await this.maybeRemoveUniversalTimer();
    window.Signal.Data.updateConversation(this.attributes);
    const sentAt = (providedSentAt || receivedAtMS) - 1;
    const model = new window.Whisper.Message({
      conversationId: this.id,
      expirationTimerUpdate: {
        expireTimer,
        source,
        fromSync,
        fromGroupUpdate
      },
      flags: import_protobuf.SignalService.DataMessage.Flags.EXPIRATION_TIMER_UPDATE,
      readStatus: isInitialSync ? import_MessageReadStatus.ReadStatus.Read : import_MessageReadStatus.ReadStatus.Unread,
      received_at_ms: receivedAtMS,
      received_at: receivedAt ?? window.Signal.Util.incrementMessageCounter(),
      seenStatus: isInitialSync ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen,
      sent_at: sentAt,
      type: "timer-notification"
    });
    const id = await window.Signal.Data.saveMessage(model.attributes, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    model.set({ id });
    const message = window.MessageController.register(id, model);
    this.addSingleMessage(message);
    this.updateUnread();
    log.info(`${logId}: added a notification received_at=${model.get("received_at")}`);
    return message;
  }
  isSearchable() {
    return !this.get("left");
  }
  async leaveGroup() {
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("leaveGroup: Cannot leave v1 group when offline!");
    }
    if (!(0, import_whatTypeOfConversation.isGroupV1)(this.attributes)) {
      throw new Error(`leaveGroup: Group ${this.idForLogging()} is not GroupV1!`);
    }
    const now = Date.now();
    const groupId = this.get("groupId");
    if (!groupId) {
      throw new Error(`leaveGroup/${this.idForLogging()}: No groupId!`);
    }
    const groupIdentifiers = this.getRecipients();
    this.set({ left: true });
    window.Signal.Data.updateConversation(this.attributes);
    const model = new window.Whisper.Message({
      conversationId: this.id,
      group_update: { left: "You" },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      received_at_ms: now,
      received_at: window.Signal.Util.incrementMessageCounter(),
      seenStatus: import_MessageSeenStatus.SeenStatus.NotApplicable,
      sent_at: now,
      type: "group"
    });
    const id = await window.Signal.Data.saveMessage(model.attributes, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    model.set({ id });
    const message = window.MessageController.register(model.id, model);
    this.addSingleMessage(message);
    const options = await (0, import_getSendOptions.getSendOptions)(this.attributes);
    message.send((0, import_handleMessageSend.handleMessageSend)(messaging.leaveGroup(groupId, groupIdentifiers, options), { messageIds: [], sendType: "legacyGroupChange" }));
  }
  async markRead(newestUnreadAt, options = {
    sendReadReceipts: true
  }) {
    await (0, import_markConversationRead.markConversationRead)(this.attributes, newestUnreadAt, options);
    await this.updateUnread();
  }
  async updateUnread() {
    const unreadCount = await window.Signal.Data.getTotalUnreadForConversation(this.id, {
      storyId: void 0,
      isGroup: (0, import_whatTypeOfConversation.isGroup)(this.attributes)
    });
    const prevUnreadCount = this.get("unreadCount");
    if (prevUnreadCount !== unreadCount) {
      this.set({ unreadCount });
      window.Signal.Data.updateConversation(this.attributes);
    }
  }
  async updateSharedGroups() {
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return;
    }
    if ((0, import_whatTypeOfConversation.isMe)(this.attributes)) {
      return;
    }
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const theirUuid = this.getUuid();
    if (!theirUuid) {
      return;
    }
    const ourGroups = await window.ConversationController.getAllGroupsInvolvingUuid(ourUuid);
    const sharedGroups = ourGroups.filter((c) => c.hasMember(ourUuid.toString()) && c.hasMember(theirUuid.toString())).sort((left, right) => (right.get("timestamp") || 0) - (left.get("timestamp") || 0));
    const sharedGroupNames = sharedGroups.map((conversation) => conversation.getTitle());
    this.set({ sharedGroupNames });
  }
  onChangeProfileKey() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      this.getProfiles();
    }
  }
  async getProfiles() {
    const conversations = this.getMembers();
    const queue = new import_p_queue.default({
      concurrency: 3
    });
    const promise = (async () => {
      await queue.addAll(conversations.map((conversation) => () => (0, import_getProfile.getProfile)(conversation.get("uuid"), conversation.get("e164"))));
    })();
    this._activeProfileFetch = promise;
    try {
      await promise;
    } finally {
      if (this._activeProfileFetch === promise) {
        this._activeProfileFetch = void 0;
      }
    }
  }
  getActiveProfileFetch() {
    return this._activeProfileFetch;
  }
  async setEncryptedProfileName(encryptedName, decryptionKey) {
    if (!encryptedName) {
      return;
    }
    const { given, family } = (0, import_Crypto.decryptProfileName)(encryptedName, decryptionKey);
    const profileName = given ? Bytes.toString(given) : void 0;
    const profileFamilyName = family ? Bytes.toString(family) : void 0;
    const oldName = this.getProfileName();
    const hadPreviousName = Boolean(oldName);
    this.set({ profileName, profileFamilyName });
    const newName = this.getProfileName();
    const nameChanged = oldName !== newName;
    if (!(0, import_whatTypeOfConversation.isMe)(this.attributes) && hadPreviousName && nameChanged) {
      const change = {
        type: "name",
        oldName,
        newName
      };
      await this.addProfileChange(change);
    }
  }
  async setProfileAvatar(avatarPath, decryptionKey) {
    if ((0, import_whatTypeOfConversation.isMe)(this.attributes)) {
      if (avatarPath) {
        window.storage.put("avatarUrl", avatarPath);
      } else {
        window.storage.remove("avatarUrl");
      }
    }
    if (!avatarPath) {
      this.set({ profileAvatar: void 0 });
      return;
    }
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("setProfileAvatar: Cannot fetch avatar when offline!");
    }
    const avatar = await messaging.getAvatar(avatarPath);
    const decrypted = (0, import_Crypto.decryptProfile)(avatar, decryptionKey);
    if (decrypted) {
      const newAttributes = await Conversation.maybeUpdateProfileAvatar(this.attributes, decrypted, {
        writeNewAttachmentData,
        deleteAttachmentData,
        doesAttachmentExist
      });
      this.set(newAttributes);
    }
  }
  async setProfileKey(profileKey, { viaStorageServiceSync = false } = {}) {
    if (this.get("profileKey") !== profileKey) {
      log.info(`Setting sealedSender to UNKNOWN for conversation ${this.idForLogging()}`);
      this.set({
        profileKeyCredential: null,
        accessKey: null,
        sealedSender: import_SealedSender.SEALED_SENDER.UNKNOWN
      });
      this.set({ profileKey }, { silent: viaStorageServiceSync });
      if (!viaStorageServiceSync && profileKey) {
        this.captureChange("profileKey");
      }
      this.deriveAccessKeyIfNeeded();
      if (!viaStorageServiceSync) {
        window.Signal.Data.updateConversation(this.attributes);
      }
      return true;
    }
    return false;
  }
  deriveAccessKeyIfNeeded() {
    const profileKey = this.get("profileKey");
    if (!profileKey) {
      return;
    }
    if (this.get("accessKey")) {
      return;
    }
    const profileKeyBuffer = Bytes.fromBase64(profileKey);
    const accessKeyBuffer = (0, import_Crypto.deriveAccessKey)(profileKeyBuffer);
    const accessKey = Bytes.toBase64(accessKeyBuffer);
    this.set({ accessKey });
  }
  deriveProfileKeyVersion() {
    const profileKey = this.get("profileKey");
    if (!profileKey) {
      return;
    }
    const uuid = this.get("uuid");
    if (!uuid) {
      return;
    }
    const lastProfile = this.get("lastProfile");
    if (lastProfile?.profileKey === profileKey) {
      return lastProfile.profileKeyVersion;
    }
    const profileKeyVersion = Util.zkgroup.deriveProfileKeyVersion(profileKey, uuid);
    if (!profileKeyVersion) {
      log.warn("deriveProfileKeyVersion: Failed to derive profile key version, clearing profile key.");
      this.setProfileKey(void 0);
      return;
    }
    return profileKeyVersion;
  }
  async updateLastProfile(oldValue, { profileKey, profileKeyVersion }) {
    const lastProfile = this.get("lastProfile");
    if (lastProfile !== oldValue) {
      return;
    }
    if (lastProfile?.profileKey === profileKey && lastProfile?.profileKeyVersion === profileKeyVersion) {
      return;
    }
    log.warn("ConversationModel.updateLastProfile: updating for", this.idForLogging());
    this.set({ lastProfile: { profileKey, profileKeyVersion } });
    await window.Signal.Data.updateConversation(this.attributes);
  }
  async removeLastProfile(oldValue) {
    if (this.get("lastProfile") !== oldValue) {
      return;
    }
    log.warn("ConversationModel.removeLastProfile: called for", this.idForLogging());
    this.set({
      lastProfile: void 0,
      about: void 0,
      aboutEmoji: void 0,
      profileAvatar: void 0
    });
    await window.Signal.Data.updateConversation(this.attributes);
  }
  hasMember(identifier) {
    const id = window.ConversationController.getConversationId(identifier);
    const memberIds = this.getMemberIds();
    return window._.contains(memberIds, id);
  }
  fetchContacts() {
    const members = this.getMembers();
    this.contactCollection.reset(members);
  }
  async destroyMessages() {
    this.set({
      lastMessage: null,
      timestamp: null,
      active_at: null,
      pendingUniversalTimer: void 0
    });
    window.Signal.Data.updateConversation(this.attributes);
    await window.Signal.Data.removeAllMessagesInConversation(this.id, {
      logId: this.idForLogging()
    });
  }
  getTitle() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      const username = this.get("username");
      return this.get("name") || this.getProfileName() || this.getNumber() || username && window.i18n("at-username", { username }) || window.i18n("unknownContact");
    }
    return this.get("name") || window.i18n("unknownGroup");
  }
  getProfileName() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return Util.combineNames(this.get("profileName"), this.get("profileFamilyName"));
    }
    return void 0;
  }
  getNumber() {
    if (!(0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return "";
    }
    const number = this.get("e164");
    try {
      const parsedNumber = window.libphonenumberInstance.parse(number);
      const regionCode = (0, import_libphonenumberUtil.getRegionCodeForNumber)(number);
      if (regionCode === window.storage.get("regionCode")) {
        return window.libphonenumberInstance.format(parsedNumber, window.libphonenumberFormat.NATIONAL);
      }
      return window.libphonenumberInstance.format(parsedNumber, window.libphonenumberFormat.INTERNATIONAL);
    } catch (e) {
      return number;
    }
  }
  getColor() {
    return (0, import_migrateColor.migrateColor)(this.get("color"));
  }
  getConversationColor() {
    return this.get("conversationColor");
  }
  getCustomColorData() {
    if (this.getConversationColor() !== "custom") {
      return {
        customColor: void 0,
        customColorId: void 0
      };
    }
    return {
      customColor: this.get("customColor"),
      customColorId: this.get("customColorId")
    };
  }
  getAvatarPath() {
    const shouldShowProfileAvatar = (0, import_whatTypeOfConversation.isMe)(this.attributes) || window.storage.get("preferContactAvatars") === false;
    const avatar = shouldShowProfileAvatar ? this.get("profileAvatar") || this.get("avatar") : this.get("avatar") || this.get("profileAvatar");
    return avatar?.path || void 0;
  }
  getAvatarHash() {
    const avatar = (0, import_whatTypeOfConversation.isMe)(this.attributes) ? this.get("profileAvatar") || this.get("avatar") : this.get("avatar") || this.get("profileAvatar");
    return avatar?.hash || void 0;
  }
  getAbsoluteAvatarPath() {
    const avatarPath = this.getAvatarPath();
    return avatarPath ? getAbsoluteAttachmentPath(avatarPath) : void 0;
  }
  getAbsoluteProfileAvatarPath() {
    const avatarPath = this.get("profileAvatar")?.path;
    return avatarPath ? getAbsoluteAttachmentPath(avatarPath) : void 0;
  }
  getAbsoluteUnblurredAvatarPath() {
    const unblurredAvatarPath = this.get("unblurredAvatarPath");
    return unblurredAvatarPath ? getAbsoluteAttachmentPath(unblurredAvatarPath) : void 0;
  }
  unblurAvatar() {
    const avatarPath = this.getAvatarPath();
    if (avatarPath) {
      this.set("unblurredAvatarPath", avatarPath);
    } else {
      this.unset("unblurredAvatarPath");
    }
  }
  canChangeTimer() {
    if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      return true;
    }
    if (this.isGroupV1AndDisabled()) {
      return false;
    }
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return true;
    }
    const accessControlEnum = import_protobuf.SignalService.AccessControl.AccessRequired;
    const accessControl = this.get("accessControl");
    const canAnyoneChangeTimer = accessControl && (accessControl.attributes === accessControlEnum.ANY || accessControl.attributes === accessControlEnum.MEMBER);
    if (canAnyoneChangeTimer) {
      return true;
    }
    return this.areWeAdmin();
  }
  canEditGroupInfo() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    if (this.get("left")) {
      return false;
    }
    return this.areWeAdmin() || this.get("accessControl")?.attributes === import_protobuf.SignalService.AccessControl.AccessRequired.MEMBER;
  }
  areWeAdmin() {
    if (!(0, import_whatTypeOfConversation.isGroupV2)(this.attributes)) {
      return false;
    }
    const memberEnum = import_protobuf.SignalService.Member.Role;
    const members = this.get("membersV2") || [];
    const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
    const me = members.find((item) => item.uuid === ourUuid);
    if (!me) {
      return false;
    }
    return me.role === memberEnum.ADMINISTRATOR;
  }
  captureChange(logMessage) {
    log.info("storageService[captureChange]", logMessage, this.idForLogging());
    this.set({ needsStorageServiceSync: true });
    this.queueJob("captureChange", async () => {
      Services.storageServiceUploadJob();
    });
  }
  startMuteTimer({ viaStorageServiceSync = false } = {}) {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.muteTimer);
    this.muteTimer = void 0;
    const muteExpiresAt = this.get("muteExpiresAt");
    if ((0, import_lodash.isNumber)(muteExpiresAt) && muteExpiresAt < Number.MAX_SAFE_INTEGER) {
      const delay = muteExpiresAt - Date.now();
      if (delay <= 0) {
        this.setMuteExpiration(0, { viaStorageServiceSync });
        return;
      }
      this.muteTimer = setTimeout(() => this.setMuteExpiration(0), delay);
    }
  }
  toggleHideStories() {
    this.set({ hideStory: !this.get("hideStory") });
    this.captureChange("hideStory");
  }
  setMuteExpiration(muteExpiresAt = 0, { viaStorageServiceSync = false } = {}) {
    const prevExpiration = this.get("muteExpiresAt");
    if (prevExpiration === muteExpiresAt) {
      return;
    }
    this.set({ muteExpiresAt });
    this.startMuteTimer({ viaStorageServiceSync: true });
    if (!viaStorageServiceSync) {
      this.captureChange("mutedUntilTimestamp");
      window.Signal.Data.updateConversation(this.attributes);
    }
  }
  isMuted() {
    return (0, import_isConversationMuted.isConversationMuted)(this.attributes);
  }
  async notify(message, reaction) {
    if (!import_notifications.notificationService.isEnabled) {
      return;
    }
    if (this.isMuted()) {
      if (this.get("dontNotifyForMentionsIfMuted")) {
        return;
      }
      const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
      const mentionsMe = (message.get("bodyRanges") || []).some((range) => range.mentionUuid && range.mentionUuid === ourUuid);
      if (!mentionsMe) {
        return;
      }
    }
    if (!(0, import_message.isIncoming)(message.attributes) && !reaction) {
      return;
    }
    const conversationId = this.id;
    const sender = reaction ? window.ConversationController.get(reaction.get("fromId")) : (0, import_helpers.getContact)(message.attributes);
    const senderName = sender ? sender.getTitle() : window.i18n("unknownContact");
    const senderTitle = (0, import_whatTypeOfConversation.isDirectConversation)(this.attributes) ? senderName : window.i18n("notificationSenderInGroup", {
      sender: senderName,
      group: this.getTitle()
    });
    let notificationIconUrl;
    const avatar = this.get("avatar") || this.get("profileAvatar");
    if (avatar && avatar.path) {
      notificationIconUrl = getAbsoluteAttachmentPath(avatar.path);
    } else if ((0, import_whatTypeOfConversation.isDirectConversation)(this.attributes)) {
      notificationIconUrl = await this.getIdenticon();
    } else {
      notificationIconUrl = void 0;
    }
    const messageJSON = message.toJSON();
    const messageId = message.id;
    const isExpiringMessage = Message.hasExpiration(messageJSON);
    import_notifications.notificationService.add({
      senderTitle,
      conversationId,
      notificationIconUrl,
      isExpiringMessage,
      message: message.getNotificationText(),
      messageId,
      reaction: reaction ? reaction.toJSON() : null
    });
  }
  async getIdenticon() {
    const color = this.getColor();
    const title = this.getTitle();
    const content = title && (0, import_getInitials.getInitials)(title) || "#";
    const cached = this.cachedIdenticon;
    if (cached && cached.content === content && cached.color === color) {
      return cached.url;
    }
    const url = await (0, import_createIdenticon.createIdenticon)(color, content);
    this.cachedIdenticon = { content, color, url };
    return url;
  }
  notifyTyping(options) {
    const { isTyping, senderId, fromMe, senderDevice } = options;
    if (fromMe) {
      return;
    }
    if (this.get("announcementsOnly") && !this.isAdmin(senderId)) {
      return;
    }
    const typingToken = `${senderId}.${senderDevice}`;
    this.contactTypingTimers = this.contactTypingTimers || {};
    const record = this.contactTypingTimers[typingToken];
    if (record) {
      clearTimeout(record.timer);
    }
    if (isTyping) {
      this.contactTypingTimers[typingToken] = this.contactTypingTimers[typingToken] || {
        timestamp: Date.now(),
        senderId,
        senderDevice
      };
      this.contactTypingTimers[typingToken].timer = setTimeout(this.clearContactTypingTimer.bind(this, typingToken), 15 * 1e3);
      if (!record) {
        this.trigger("change", this, { force: true });
      }
    } else {
      delete this.contactTypingTimers[typingToken];
      if (record) {
        this.trigger("change", this, { force: true });
      }
    }
  }
  clearContactTypingTimer(typingToken) {
    this.contactTypingTimers = this.contactTypingTimers || {};
    const record = this.contactTypingTimers[typingToken];
    if (record) {
      clearTimeout(record.timer);
      delete this.contactTypingTimers[typingToken];
      this.trigger("change", this, { force: true });
    }
  }
  pin() {
    if (this.get("isPinned")) {
      return;
    }
    log.info("pinning", this.idForLogging());
    const pinnedConversationIds = new Set(window.storage.get("pinnedConversationIds", new Array()));
    pinnedConversationIds.add(this.id);
    this.writePinnedConversations([...pinnedConversationIds]);
    this.set("isPinned", true);
    if (this.get("isArchived")) {
      this.set({ isArchived: false });
    }
    window.Signal.Data.updateConversation(this.attributes);
  }
  unpin() {
    if (!this.get("isPinned")) {
      return;
    }
    log.info("un-pinning", this.idForLogging());
    const pinnedConversationIds = new Set(window.storage.get("pinnedConversationIds", new Array()));
    pinnedConversationIds.delete(this.id);
    this.writePinnedConversations([...pinnedConversationIds]);
    this.set("isPinned", false);
    window.Signal.Data.updateConversation(this.attributes);
  }
  writePinnedConversations(pinnedConversationIds) {
    window.storage.put("pinnedConversationIds", pinnedConversationIds);
    const myId = window.ConversationController.getOurConversationId();
    const me = window.ConversationController.get(myId);
    if (me) {
      me.captureChange("pin");
    }
  }
  setDontNotifyForMentionsIfMuted(newValue) {
    const previousValue = Boolean(this.get("dontNotifyForMentionsIfMuted"));
    if (previousValue === newValue) {
      return;
    }
    this.set({ dontNotifyForMentionsIfMuted: newValue });
    window.Signal.Data.updateConversation(this.attributes);
    this.captureChange("dontNotifyForMentionsIfMuted");
  }
  acknowledgeGroupMemberNameCollisions(groupNameCollisions) {
    this.set("acknowledgedGroupNameCollisions", groupNameCollisions);
    window.Signal.Data.updateConversation(this.attributes);
  }
  onOpenStart() {
    log.info(`conversation ${this.idForLogging()} open start`);
    window.ConversationController.onConvoOpenStart(this.id);
  }
  onOpenComplete(startedAt) {
    const now = Date.now();
    const delta = now - startedAt;
    log.info(`conversation ${this.idForLogging()} open took ${delta}ms`);
    window.CI?.handleEvent("conversation:open", { delta });
  }
  async flushDebouncedUpdates() {
    try {
      await this.debouncedUpdateLastMessage?.flush();
    } catch (error) {
      const logId = this.idForLogging();
      log.error(`flushDebouncedUpdates(${logId}): got error`, Errors.toLogFormat(error));
    }
  }
}
window.Whisper.Conversation = ConversationModel;
window.Whisper.ConversationCollection = window.Backbone.Collection.extend({
  model: window.Whisper.Conversation,
  initialize() {
    this.eraseLookups();
    this.on("idUpdated", (model, idProp, oldValue) => {
      if (oldValue) {
        if (idProp === "e164") {
          delete this._byE164[oldValue];
        }
        if (idProp === "uuid") {
          delete this._byUuid[oldValue];
        }
        if (idProp === "groupId") {
          delete this._byGroupId[oldValue];
        }
      }
      const e164 = model.get("e164");
      if (e164) {
        this._byE164[e164] = model;
      }
      const uuid = model.get("uuid");
      if (uuid) {
        this._byUuid[uuid] = model;
      }
      const groupId = model.get("groupId");
      if (groupId) {
        this._byGroupId[groupId] = model;
      }
    });
  },
  reset(...args) {
    window.Backbone.Collection.prototype.reset.apply(this, args);
    this.resetLookups();
  },
  resetLookups() {
    this.eraseLookups();
    this.generateLookups(this.models);
  },
  generateLookups(models) {
    models.forEach((model) => {
      const e164 = model.get("e164");
      if (e164) {
        const existing = this._byE164[e164];
        if (!existing || existing && !existing.get("uuid")) {
          this._byE164[e164] = model;
        }
      }
      const uuid = model.get("uuid");
      if (uuid) {
        const existing = this._byUuid[uuid];
        if (!existing || existing && !existing.get("e164")) {
          this._byUuid[uuid] = model;
        }
      }
      const groupId = model.get("groupId");
      if (groupId) {
        this._byGroupId[groupId] = model;
      }
    });
  },
  eraseLookups() {
    this._byE164 = /* @__PURE__ */ Object.create(null);
    this._byUuid = /* @__PURE__ */ Object.create(null);
    this._byGroupId = /* @__PURE__ */ Object.create(null);
  },
  add(data) {
    let hydratedData;
    if (Array.isArray(data)) {
      hydratedData = [];
      for (let i = 0, max = data.length; i < max; i += 1) {
        const item = data[i];
        if (!item.get) {
          hydratedData.push(new window.Whisper.Conversation(item));
        } else {
          hydratedData.push(item);
        }
      }
    } else if (!data.get) {
      hydratedData = new window.Whisper.Conversation(data);
    } else {
      hydratedData = data;
    }
    this.generateLookups(Array.isArray(hydratedData) ? hydratedData : [hydratedData]);
    window.Backbone.Collection.prototype.add.call(this, hydratedData);
    return hydratedData;
  },
  get(id) {
    return this._byE164[id] || this._byE164[`+${id}`] || this._byUuid[id] || this._byGroupId[id] || window.Backbone.Collection.prototype.get.call(this, id);
  },
  comparator(m) {
    return -(m.get("active_at") || 0);
  }
});
const sortConversationTitles = /* @__PURE__ */ __name((left, right, collator) => {
  return collator.compare(left.getTitle(), right.getTitle());
}, "sortConversationTitles");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationModel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9ucy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbXBhY3QsIGlzTnVtYmVyLCB0aHJvdHRsZSwgZGVib3VuY2UgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgYmF0Y2ggYXMgYmF0Y2hEaXNwYXRjaCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5pbXBvcnQgeyB2NCBhcyBnZW5lcmF0ZUd1aWQgfSBmcm9tICd1dWlkJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgQ29udmVyc2F0aW9uTGFzdFByb2ZpbGVUeXBlLFxuICBDb252ZXJzYXRpb25Nb2RlbENvbGxlY3Rpb25UeXBlLFxuICBMYXN0TWVzc2FnZVN0YXR1cyxcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICBRdW90ZWRNZXNzYWdlVHlwZSxcbiAgU2VuZGVyS2V5SW5mb1R5cGUsXG4gIFZlcmlmaWNhdGlvbk9wdGlvbnMsXG4gIFdoYXRJc1RoaXMsXG59IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHsgZ2V0SW5pdGlhbHMgfSBmcm9tICcuLi91dGlsL2dldEluaXRpYWxzJztcbmltcG9ydCB7IG5vcm1hbGl6ZVV1aWQgfSBmcm9tICcuLi91dGlsL25vcm1hbGl6ZVV1aWQnO1xuaW1wb3J0IHtcbiAgZ2V0UmVnaW9uQ29kZUZvck51bWJlcixcbiAgcGFyc2VOdW1iZXIsXG59IGZyb20gJy4uL3V0aWwvbGlicGhvbmVudW1iZXJVdGlsJztcbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi4vdXRpbC9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5pbXBvcnQgdHlwZSB7IEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgeyBpc0dJRiB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHR5cGUgeyBDYWxsSGlzdG9yeURldGFpbHNUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgeyBDYWxsTW9kZSB9IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0ICogYXMgRW1iZWRkZWRDb250YWN0IGZyb20gJy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5pbXBvcnQgKiBhcyBDb252ZXJzYXRpb24gZnJvbSAnLi4vdHlwZXMvQ29udmVyc2F0aW9uJztcbmltcG9ydCAqIGFzIFN0aWNrZXJzIGZyb20gJy4uL3R5cGVzL1N0aWNrZXJzJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udGFjdFdpdGhIeWRyYXRlZEF2YXRhcixcbiAgR3JvdXBWMUluZm9UeXBlLFxuICBHcm91cFYySW5mb1R5cGUsXG4gIFN0aWNrZXJUeXBlLFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcbmltcG9ydCBjcmVhdGVUYXNrV2l0aFRpbWVvdXQgZnJvbSAnLi4vdGV4dHNlY3VyZS9UYXNrV2l0aFRpbWVvdXQnO1xuaW1wb3J0IE1lc3NhZ2VTZW5kZXIgZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrUmVzdWx0VHlwZSB9IGZyb20gJy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgQXZhdGFyQ29sb3JUeXBlLFxuICBDb252ZXJzYXRpb25Db2xvclR5cGUsXG4gIEN1c3RvbUNvbG9yVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi9tZXNzYWdlcyc7XG5pbXBvcnQgeyBnZXRDb250YWN0IH0gZnJvbSAnLi4vbWVzc2FnZXMvaGVscGVycyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbk11dGVkIH0gZnJvbSAnLi4vdXRpbC9pc0NvbnZlcnNhdGlvbk11dGVkJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uU01TT25seSB9IGZyb20gJy4uL3V0aWwvaXNDb252ZXJzYXRpb25TTVNPbmx5JztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IHNuaWZmSW1hZ2VNaW1lVHlwZSB9IGZyb20gJy4uL3V0aWwvc25pZmZJbWFnZU1pbWVUeXBlJztcbmltcG9ydCB7IGlzVmFsaWRFMTY0IH0gZnJvbSAnLi4vdXRpbC9pc1ZhbGlkRTE2NCc7XG5pbXBvcnQgdHlwZSB7IE1JTUVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgeyBJTUFHRV9KUEVHLCBJTUFHRV9HSUYsIElNQUdFX1dFQlAgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IFVVSUQsIGlzVmFsaWRVdWlkLCBVVUlES2luZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgZGVyaXZlQWNjZXNzS2V5LCBkZWNyeXB0UHJvZmlsZU5hbWUsIGRlY3J5cHRQcm9maWxlIH0gZnJvbSAnLi4vQ3J5cHRvJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uL0J5dGVzJztcbmltcG9ydCB0eXBlIHsgQm9keVJhbmdlc1R5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IGdldFRleHRXaXRoTWVudGlvbnMgfSBmcm9tICcuLi91dGlsL2dldFRleHRXaXRoTWVudGlvbnMnO1xuaW1wb3J0IHsgbWlncmF0ZUNvbG9yIH0gZnJvbSAnLi4vdXRpbC9taWdyYXRlQ29sb3InO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuLi91dGlsL2lzTm90TmlsJztcbmltcG9ydCB7IGRyb3BOdWxsIH0gZnJvbSAnLi4vdXRpbC9kcm9wTnVsbCc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25BY2NlcHRlZCB9IGZyb20gJy4uL3V0aWwvaXNDb252ZXJzYXRpb25BY2NlcHRlZCc7XG5pbXBvcnQgeyBtYXJrQ29udmVyc2F0aW9uUmVhZCB9IGZyb20gJy4uL3V0aWwvbWFya0NvbnZlcnNhdGlvblJlYWQnO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvbk1lbWJlcnMgfSBmcm9tICcuLi91dGlsL2dldENvbnZlcnNhdGlvbk1lbWJlcnMnO1xuaW1wb3J0IHsgdXBkYXRlQ29udmVyc2F0aW9uc1dpdGhVdWlkTG9va3VwIH0gZnJvbSAnLi4vdXBkYXRlQ29udmVyc2F0aW9uc1dpdGhVdWlkTG9va3VwJztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgeyBTZW5kU3RhdHVzIH0gZnJvbSAnLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3VHlwZSB9IGZyb20gJy4uL3R5cGVzL21lc3NhZ2UvTGlua1ByZXZpZXdzJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQge1xuICBjb25jYXQsXG4gIGZpbHRlcixcbiAgbWFwLFxuICB0YWtlLFxuICByZXBlYXQsXG4gIHppcE9iamVjdCxcbn0gZnJvbSAnLi4vdXRpbC9pdGVyYWJsZXMnO1xuaW1wb3J0ICogYXMgdW5pdmVyc2FsRXhwaXJlVGltZXIgZnJvbSAnLi4vdXRpbC91bml2ZXJzYWxFeHBpcmVUaW1lcic7XG5pbXBvcnQgdHlwZSB7IEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoSWRzQnlUaXRsZSB9IGZyb20gJy4uL3V0aWwvZ3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucyc7XG5pbXBvcnQge1xuICBpc0RpcmVjdENvbnZlcnNhdGlvbixcbiAgaXNHcm91cCxcbiAgaXNHcm91cFYxLFxuICBpc0dyb3VwVjIsXG4gIGlzTWUsXG59IGZyb20gJy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHtcbiAgZ2V0TWVzc2FnZVByb3BTdGF0dXMsXG4gIGhhc0Vycm9ycyxcbiAgaXNHaWZ0QmFkZ2UsXG4gIGlzSW5jb21pbmcsXG4gIGlzU3RvcnksXG4gIGlzVGFwVG9WaWV3LFxufSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQge1xuICBjb252ZXJzYXRpb25Kb2JRdWV1ZSxcbiAgY29udmVyc2F0aW9uUXVldWVKb2JFbnVtLFxufSBmcm9tICcuLi9qb2JzL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uUXVldWVKb2JEYXRhIH0gZnJvbSAnLi4vam9icy9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQgeyByZWFkUmVjZWlwdHNKb2JRdWV1ZSB9IGZyb20gJy4uL2pvYnMvcmVhZFJlY2VpcHRzSm9iUXVldWUnO1xuaW1wb3J0IHsgRGVsZXRlTW9kZWwgfSBmcm9tICcuLi9tZXNzYWdlTW9kaWZpZXJzL0RlbGV0ZXMnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdGlvbk1vZGVsIH0gZnJvbSAnLi4vbWVzc2FnZU1vZGlmaWVycy9SZWFjdGlvbnMnO1xuaW1wb3J0IHsgaXNBbm5vdW5jZW1lbnRHcm91cFJlYWR5IH0gZnJvbSAnLi4vdXRpbC9pc0Fubm91bmNlbWVudEdyb3VwUmVhZHknO1xuaW1wb3J0IHsgZ2V0UHJvZmlsZSB9IGZyb20gJy4uL3V0aWwvZ2V0UHJvZmlsZSc7XG5pbXBvcnQgeyBTRUFMRURfU0VOREVSIH0gZnJvbSAnLi4vdHlwZXMvU2VhbGVkU2VuZGVyJztcbmltcG9ydCB7IGdldEF2YXRhckRhdGEgfSBmcm9tICcuLi91dGlsL2dldEF2YXRhckRhdGEnO1xuaW1wb3J0IHsgY3JlYXRlSWRlbnRpY29uIH0gZnJvbSAnLi4vdXRpbC9jcmVhdGVJZGVudGljb24nO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHsgaXNNZXNzYWdlVW5yZWFkIH0gZnJvbSAnLi4vdXRpbC9pc01lc3NhZ2VVbnJlYWQnO1xuaW1wb3J0IHR5cGUgeyBTZW5kZXJLZXlUYXJnZXRUeXBlIH0gZnJvbSAnLi4vdXRpbC9zZW5kVG9Hcm91cCc7XG5pbXBvcnQgeyBzaW5nbGVQcm90b0pvYlF1ZXVlIH0gZnJvbSAnLi4vam9icy9zaW5nbGVQcm90b0pvYlF1ZXVlJztcbmltcG9ydCB7IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZSB9IGZyb20gJy4uL3V0aWwvdGltZWxpbmVVdGlsJztcbmltcG9ydCB7IFNlZW5TdGF0dXMgfSBmcm9tICcuLi9NZXNzYWdlU2VlblN0YXR1cyc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25JZEZvckxvZ2dpbmcgfSBmcm9tICcuLi91dGlsL2lkRm9yTG9nZ2luZyc7XG5cbi8qIGVzbGludC1kaXNhYmxlIG1vcmUvbm8tdGhlbiAqL1xud2luZG93LldoaXNwZXIgPSB3aW5kb3cuV2hpc3BlciB8fCB7fTtcblxuY29uc3QgeyBTZXJ2aWNlcywgVXRpbCB9ID0gd2luZG93LlNpZ25hbDtcbmNvbnN0IHsgTWVzc2FnZSB9ID0gd2luZG93LlNpZ25hbC5UeXBlcztcbmNvbnN0IHtcbiAgZGVsZXRlQXR0YWNobWVudERhdGEsXG4gIGRvZXNBdHRhY2htZW50RXhpc3QsXG4gIGdldEFic29sdXRlQXR0YWNobWVudFBhdGgsXG4gIGxvYWRBdHRhY2htZW50RGF0YSxcbiAgcmVhZFN0aWNrZXJEYXRhLFxuICB1cGdyYWRlTWVzc2FnZVNjaGVtYSxcbiAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbn0gPSB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnM7XG5jb25zdCB7XG4gIGFkZFN0aWNrZXJQYWNrUmVmZXJlbmNlLFxuICBnZXRDb252ZXJzYXRpb25SYW5nZUNlbnRlcmVkT25NZXNzYWdlLFxuICBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG4gIGdldE1lc3NhZ2VNZXRyaWNzRm9yQ29udmVyc2F0aW9uLFxuICBnZXRNZXNzYWdlQnlJZCxcbiAgZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxufSA9IHdpbmRvdy5TaWduYWwuRGF0YTtcblxuY29uc3QgVEhSRUVfSE9VUlMgPSBkdXJhdGlvbnMuSE9VUiAqIDM7XG5jb25zdCBGSVZFX01JTlVURVMgPSBkdXJhdGlvbnMuTUlOVVRFICogNTtcblxuY29uc3QgSk9CX1JFUE9SVElOR19USFJFU0hPTERfTVMgPSAyNTtcbmNvbnN0IFNFTkRfUkVQT1JUSU5HX1RIUkVTSE9MRF9NUyA9IDI1O1xuXG5jb25zdCBNRVNTQUdFX0xPQURfQ0hVTktfU0laRSA9IDMwO1xuXG5jb25zdCBBVFRSSUJVVEVTX1RIQVRfRE9OVF9JTlZBTElEQVRFX1BST1BTX0NBQ0hFID0gbmV3IFNldChbXG4gICdsYXN0UHJvZmlsZScsXG4gICdwcm9maWxlTGFzdEZldGNoZWRBdCcsXG4gICduZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYycsXG4gICdzdG9yYWdlSUQnLFxuICAnc3RvcmFnZVZlcnNpb24nLFxuICAnc3RvcmFnZVVua25vd25GaWVsZHMnLFxuXSk7XG5cbnR5cGUgQ2FjaGVkSWRlbnRpY29uID0ge1xuICByZWFkb25seSB1cmw6IHN0cmluZztcbiAgcmVhZG9ubHkgY29udGVudDogc3RyaW5nO1xuICByZWFkb25seSBjb2xvcjogQXZhdGFyQ29sb3JUeXBlO1xufTtcblxuZXhwb3J0IGNsYXNzIENvbnZlcnNhdGlvbk1vZGVsIGV4dGVuZHMgd2luZG93LkJhY2tib25lXG4gIC5Nb2RlbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4ge1xuICBzdGF0aWMgQ09MT1JTOiBzdHJpbmc7XG5cbiAgY2FjaGVkUHJvcHM/OiBDb252ZXJzYXRpb25UeXBlIHwgbnVsbDtcblxuICBvbGRDYWNoZWRQcm9wcz86IENvbnZlcnNhdGlvblR5cGUgfCBudWxsO1xuXG4gIGNvbnRhY3RUeXBpbmdUaW1lcnM/OiBSZWNvcmQ8XG4gICAgc3RyaW5nLFxuICAgIHsgc2VuZGVySWQ6IHN0cmluZzsgdGltZXI6IE5vZGVKUy5UaW1lciB9XG4gID47XG5cbiAgY29udGFjdENvbGxlY3Rpb24/OiBCYWNrYm9uZS5Db2xsZWN0aW9uPENvbnZlcnNhdGlvbk1vZGVsPjtcblxuICBkZWJvdW5jZWRVcGRhdGVMYXN0TWVzc2FnZT86ICgoKSA9PiB2b2lkKSAmIHsgZmx1c2goKTogdm9pZCB9O1xuXG4gIGluaXRpYWxQcm9taXNlPzogUHJvbWlzZTx1bmtub3duPjtcblxuICBpblByb2dyZXNzRmV0Y2g/OiBQcm9taXNlPHVua25vd24+O1xuXG4gIG5ld01lc3NhZ2VRdWV1ZT86IHR5cGVvZiB3aW5kb3cuUFF1ZXVlVHlwZTtcblxuICBqb2JRdWV1ZT86IHR5cGVvZiB3aW5kb3cuUFF1ZXVlVHlwZTtcblxuICBzdG9yZU5hbWU/OiBzdHJpbmcgfCBudWxsO1xuXG4gIHRocm90dGxlZEJ1bXBUeXBpbmc/OiAoKSA9PiB2b2lkO1xuXG4gIHRocm90dGxlZEZldGNoU01TT25seVVVSUQ/OiAoKSA9PiBQcm9taXNlPHZvaWQ+IHwgdm9pZDtcblxuICB0aHJvdHRsZWRNYXliZU1pZ3JhdGVWMUdyb3VwPzogKCkgPT4gUHJvbWlzZTx2b2lkPiB8IHZvaWQ7XG5cbiAgdGhyb3R0bGVkR2V0UHJvZmlsZXM/OiAoKSA9PiBQcm9taXNlPHZvaWQ+O1xuXG4gIHR5cGluZ1JlZnJlc2hUaW1lcj86IE5vZGVKUy5UaW1lciB8IG51bGw7XG5cbiAgdHlwaW5nUGF1c2VUaW1lcj86IE5vZGVKUy5UaW1lciB8IG51bGw7XG5cbiAgdmVyaWZpZWRFbnVtPzogdHlwZW9mIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuVmVyaWZpZWRTdGF0dXM7XG5cbiAgaW50bENvbGxhdG9yID0gbmV3IEludGwuQ29sbGF0b3IodW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiAnYmFzZScgfSk7XG5cbiAgbGFzdFN1Y2Nlc3NmdWxHcm91cEZldGNoPzogbnVtYmVyO1xuXG4gIHRocm90dGxlZFVwZGF0ZVNoYXJlZEdyb3Vwcz86ICgpID0+IFByb21pc2U8dm9pZD47XG5cbiAgcHJpdmF0ZSBjYWNoZWRMYXRlc3RHcm91cENhbGxFcmFJZD86IHN0cmluZztcblxuICBwcml2YXRlIGNhY2hlZElkZW50aWNvbj86IENhY2hlZElkZW50aWNvbjtcblxuICBwcml2YXRlIGlzRmV0Y2hpbmdVVUlEPzogYm9vbGVhbjtcblxuICBwcml2YXRlIGxhc3RJc1R5cGluZz86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBtdXRlVGltZXI/OiBOb2RlSlMuVGltZXI7XG5cbiAgcHJpdmF0ZSBpc0luUmVkdXhCYXRjaCA9IGZhbHNlO1xuXG4gIHByaXZhdGUgX2FjdGl2ZVByb2ZpbGVGZXRjaD86IFByb21pc2U8dm9pZD47XG5cbiAgb3ZlcnJpZGUgZGVmYXVsdHMoKTogUGFydGlhbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4ge1xuICAgIHJldHVybiB7XG4gICAgICB1bnJlYWRDb3VudDogMCxcbiAgICAgIHZlcmlmaWVkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLlZlcmlmaWVkU3RhdHVzLkRFRkFVTFQsXG4gICAgICBtZXNzYWdlQ291bnQ6IDAsXG4gICAgICBzZW50TWVzc2FnZUNvdW50OiAwLFxuICAgIH07XG4gIH1cblxuICBpZEZvckxvZ2dpbmcoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gZ2V0Q29udmVyc2F0aW9uSWRGb3JMb2dnaW5nKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICAvLyBUaGlzIGlzIG9uZSBvZiB0aGUgZmV3IHRpbWVzIHRoYXQgd2Ugd2FudCB0byBjb2xsYXBzZSBvdXIgdXVpZC9lMTY0IHBhaXIgZG93biBpbnRvXG4gIC8vICAganVzdCBvbmUgYml0IG9mIGRhdGEuIElmIHdlIGhhdmUgYSBVVUlELCB3ZSdsbCBzZW5kIHVzaW5nIGl0LlxuICBnZXRTZW5kVGFyZ2V0KCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0KCd1dWlkJykgfHwgdGhpcy5nZXQoJ2UxNjQnKTtcbiAgfVxuXG4gIGdldENvbnRhY3RDb2xsZWN0aW9uKCk6IEJhY2tib25lLkNvbGxlY3Rpb248Q29udmVyc2F0aW9uTW9kZWw+IHtcbiAgICBjb25zdCBjb2xsZWN0aW9uID0gbmV3IHdpbmRvdy5CYWNrYm9uZS5Db2xsZWN0aW9uPENvbnZlcnNhdGlvbk1vZGVsPigpO1xuICAgIGNvbnN0IGNvbGxhdG9yID0gbmV3IEludGwuQ29sbGF0b3IodW5kZWZpbmVkLCB7IHNlbnNpdGl2aXR5OiAnYmFzZScgfSk7XG4gICAgY29sbGVjdGlvbi5jb21wYXJhdG9yID0gKFxuICAgICAgbGVmdDogQ29udmVyc2F0aW9uTW9kZWwsXG4gICAgICByaWdodDogQ29udmVyc2F0aW9uTW9kZWxcbiAgICApID0+IHtcbiAgICAgIHJldHVybiBjb2xsYXRvci5jb21wYXJlKGxlZnQuZ2V0VGl0bGUoKSwgcmlnaHQuZ2V0VGl0bGUoKSk7XG4gICAgfTtcbiAgICByZXR1cm4gY29sbGVjdGlvbjtcbiAgfVxuXG4gIG92ZXJyaWRlIGluaXRpYWxpemUoXG4gICAgYXR0cmlidXRlczogUGFydGlhbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT4gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5nZXQoJ3V1aWQnKTtcbiAgICBjb25zdCBub3JtYWxpemVkVXVpZCA9XG4gICAgICB1dWlkICYmIG5vcm1hbGl6ZVV1aWQodXVpZCwgJ0NvbnZlcnNhdGlvbk1vZGVsLmluaXRpYWxpemUnKTtcbiAgICBpZiAodXVpZCAmJiBub3JtYWxpemVkVXVpZCAhPT0gdXVpZCkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdDb252ZXJzYXRpb25Nb2RlbC5pbml0aWFsaXplOiBub3JtYWxpemluZyB1dWlkIGZyb20gJyArXG4gICAgICAgICAgYCR7dXVpZH0gdG8gJHtub3JtYWxpemVkVXVpZH1gXG4gICAgICApO1xuICAgICAgdGhpcy5zZXQoJ3V1aWQnLCBub3JtYWxpemVkVXVpZCk7XG4gICAgfVxuXG4gICAgaWYgKGlzVmFsaWRFMTY0KGF0dHJpYnV0ZXMuaWQsIGZhbHNlKSkge1xuICAgICAgdGhpcy5zZXQoeyBpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksIGUxNjQ6IGF0dHJpYnV0ZXMuaWQgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zdG9yZU5hbWUgPSAnY29udmVyc2F0aW9ucyc7XG5cbiAgICB0aGlzLnZlcmlmaWVkRW51bSA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuVmVyaWZpZWRTdGF0dXM7XG5cbiAgICAvLyBUaGlzIG1heSBiZSBvdmVycmlkZGVuIGJ5IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlLCBhbmQgc2lnbmlmeVxuICAgIC8vICAgb3VyIGZpcnN0IHNhdmUgdG8gdGhlIGRhdGFiYXNlLiBPciBmaXJzdCBmZXRjaCBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICB0aGlzLmluaXRpYWxQcm9taXNlID0gUHJvbWlzZS5yZXNvbHZlKCk7XG5cbiAgICB0aGlzLnRocm90dGxlZEJ1bXBUeXBpbmcgPSB0aHJvdHRsZSh0aGlzLmJ1bXBUeXBpbmcsIDMwMCk7XG4gICAgdGhpcy5kZWJvdW5jZWRVcGRhdGVMYXN0TWVzc2FnZSA9IGRlYm91bmNlKFxuICAgICAgdGhpcy51cGRhdGVMYXN0TWVzc2FnZS5iaW5kKHRoaXMpLFxuICAgICAgMjAwXG4gICAgKTtcbiAgICB0aGlzLnRocm90dGxlZFVwZGF0ZVNoYXJlZEdyb3VwcyA9XG4gICAgICB0aGlzLnRocm90dGxlZFVwZGF0ZVNoYXJlZEdyb3VwcyB8fFxuICAgICAgdGhyb3R0bGUodGhpcy51cGRhdGVTaGFyZWRHcm91cHMuYmluZCh0aGlzKSwgRklWRV9NSU5VVEVTKTtcblxuICAgIHRoaXMuY29udGFjdENvbGxlY3Rpb24gPSB0aGlzLmdldENvbnRhY3RDb2xsZWN0aW9uKCk7XG4gICAgdGhpcy5jb250YWN0Q29sbGVjdGlvbi5vbihcbiAgICAgICdjaGFuZ2U6bmFtZSBjaGFuZ2U6cHJvZmlsZU5hbWUgY2hhbmdlOnByb2ZpbGVGYW1pbHlOYW1lIGNoYW5nZTplMTY0JyxcbiAgICAgIHRoaXMuZGVib3VuY2VkVXBkYXRlTGFzdE1lc3NhZ2UsXG4gICAgICB0aGlzXG4gICAgKTtcbiAgICBpZiAoIWlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHRoaXMuY29udGFjdENvbGxlY3Rpb24ub24oXG4gICAgICAgICdjaGFuZ2U6dmVyaWZpZWQnLFxuICAgICAgICB0aGlzLm9uTWVtYmVyVmVyaWZpZWRDaGFuZ2UuYmluZCh0aGlzKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLm9uKCduZXdtZXNzYWdlJywgdGhpcy5vbk5ld01lc3NhZ2UpO1xuICAgIHRoaXMub24oJ2NoYW5nZTpwcm9maWxlS2V5JywgdGhpcy5vbkNoYW5nZVByb2ZpbGVLZXkpO1xuXG4gICAgY29uc3Qgc2VhbGVkU2VuZGVyID0gdGhpcy5nZXQoJ3NlYWxlZFNlbmRlcicpO1xuICAgIGlmIChzZWFsZWRTZW5kZXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgdGhpcy5zZXQoeyBzZWFsZWRTZW5kZXI6IFNFQUxFRF9TRU5ERVIuVU5LTk9XTiB9KTtcbiAgICB9XG4gICAgdGhpcy51bnNldCgndW5pZGVudGlmaWVkRGVsaXZlcnknKTtcbiAgICB0aGlzLnVuc2V0KCd1bmlkZW50aWZpZWREZWxpdmVyeVVucmVzdHJpY3RlZCcpO1xuICAgIHRoaXMudW5zZXQoJ2hhc0ZldGNoZWRQcm9maWxlJyk7XG4gICAgdGhpcy51bnNldCgndG9rZW5zJyk7XG5cbiAgICB0aGlzLm9uKCdjaGFuZ2U6bWVtYmVycyBjaGFuZ2U6bWVtYmVyc1YyJywgdGhpcy5mZXRjaENvbnRhY3RzKTtcblxuICAgIHRoaXMudHlwaW5nUmVmcmVzaFRpbWVyID0gbnVsbDtcbiAgICB0aGlzLnR5cGluZ1BhdXNlVGltZXIgPSBudWxsO1xuXG4gICAgLy8gV2UgY2xlYXIgb3VyIGNhY2hlZCBwcm9wcyB3aGVuZXZlciB3ZSBjaGFuZ2Ugc28gdGhhdCB0aGUgbmV4dCBjYWxsIHRvIGZvcm1hdCgpIHdpbGxcbiAgICAvLyAgIHJlc3VsdCBpbiByZWZyZXNoIHZpYSBhIGdldFByb3BzKCkgY2FsbC4gU2VlIGZvcm1hdCgpIGJlbG93LlxuICAgIHRoaXMub24oXG4gICAgICAnY2hhbmdlJyxcbiAgICAgIChfbW9kZWw6IE1lc3NhZ2VNb2RlbCwgb3B0aW9uczogeyBmb3JjZT86IGJvb2xlYW4gfSA9IHt9KSA9PiB7XG4gICAgICAgIGNvbnN0IGNoYW5nZWRLZXlzID0gT2JqZWN0LmtleXModGhpcy5jaGFuZ2VkIHx8IHt9KTtcbiAgICAgICAgY29uc3QgaXNQcm9wc0NhY2hlU3RpbGxWYWxpZCA9XG4gICAgICAgICAgIW9wdGlvbnMuZm9yY2UgJiZcbiAgICAgICAgICBCb29sZWFuKFxuICAgICAgICAgICAgY2hhbmdlZEtleXMubGVuZ3RoICYmXG4gICAgICAgICAgICAgIGNoYW5nZWRLZXlzLmV2ZXJ5KGtleSA9PlxuICAgICAgICAgICAgICAgIEFUVFJJQlVURVNfVEhBVF9ET05UX0lOVkFMSURBVEVfUFJPUFNfQ0FDSEUuaGFzKGtleSlcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIGlmIChpc1Byb3BzQ2FjaGVTdGlsbFZhbGlkKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHRoaXMuY2FjaGVkUHJvcHMpIHtcbiAgICAgICAgICB0aGlzLm9sZENhY2hlZFByb3BzID0gdGhpcy5jYWNoZWRQcm9wcztcbiAgICAgICAgfVxuICAgICAgICB0aGlzLmNhY2hlZFByb3BzID0gbnVsbDtcbiAgICAgICAgdGhpcy50cmlnZ2VyKCdwcm9wcy1jaGFuZ2UnLCB0aGlzLCB0aGlzLmlzSW5SZWR1eEJhdGNoKTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgLy8gU2V0IGBpc0ZldGNoaW5nVVVJRGAgZWFnZXJseSB0byBhdm9pZCBVSSBmbGlja2VyIHdoZW4gb3BlbmluZyB0aGVcbiAgICAvLyBjb252ZXJzYXRpb24gZm9yIHRoZSBmaXJzdCB0aW1lLlxuICAgIHRoaXMuaXNGZXRjaGluZ1VVSUQgPSB0aGlzLmlzU01TT25seSgpO1xuXG4gICAgdGhpcy50aHJvdHRsZWRGZXRjaFNNU09ubHlVVUlEID0gdGhyb3R0bGUoXG4gICAgICB0aGlzLmZldGNoU01TT25seVVVSUQuYmluZCh0aGlzKSxcbiAgICAgIEZJVkVfTUlOVVRFU1xuICAgICk7XG4gICAgdGhpcy50aHJvdHRsZWRNYXliZU1pZ3JhdGVWMUdyb3VwID0gdGhyb3R0bGUoXG4gICAgICB0aGlzLm1heWJlTWlncmF0ZVYxR3JvdXAuYmluZCh0aGlzKSxcbiAgICAgIEZJVkVfTUlOVVRFU1xuICAgICk7XG5cbiAgICBjb25zdCBtaWdyYXRlZENvbG9yID0gdGhpcy5nZXRDb2xvcigpO1xuICAgIGlmICh0aGlzLmdldCgnY29sb3InKSAhPT0gbWlncmF0ZWRDb2xvcikge1xuICAgICAgdGhpcy5zZXQoJ2NvbG9yJywgbWlncmF0ZWRDb2xvcik7XG4gICAgICAvLyBOb3Qgc2F2aW5nIHRoZSBjb252ZXJzYXRpb24gaGVyZSB3ZSdyZSBob3BpbmcgaXQnbGwgYmUgc2F2ZWQgZWxzZXdoZXJlXG4gICAgICAvLyB0aGlzIG1heSBjYXVzZSBzb21lIGNvbG9yIHRocmFzaGluZyBpZiBTaWduYWwgaXMgcmVzdGFydGVkIHdpdGhvdXRcbiAgICAgIC8vIHRoZSBjb252byBzYXZpbmcuIElmIHRoYXQgaXMgaW5kZWVkIHRoZSBjYXNlIGFuZCBpdCdzIHRvbyBkaXNydXB0aXZlXG4gICAgICAvLyB3ZSBzaG91bGQgYWRkIGJhdGNoZWQgc2F2aW5nLlxuICAgIH1cbiAgfVxuXG4gIHRvU2VuZGVyS2V5VGFyZ2V0KCk6IFNlbmRlcktleVRhcmdldFR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBnZXRHcm91cElkOiAoKSA9PiB0aGlzLmdldCgnZ3JvdXBJZCcpLFxuICAgICAgZ2V0TWVtYmVyczogKCkgPT4gdGhpcy5nZXRNZW1iZXJzKCksXG4gICAgICBoYXNNZW1iZXI6IChpZDogc3RyaW5nKSA9PiB0aGlzLmhhc01lbWJlcihpZCksXG4gICAgICBpZEZvckxvZ2dpbmc6ICgpID0+IHRoaXMuaWRGb3JMb2dnaW5nKCksXG4gICAgICBpc0dyb3VwVjI6ICgpID0+IGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgaXNWYWxpZDogKCkgPT4gaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcyksXG5cbiAgICAgIGdldFNlbmRlcktleUluZm86ICgpID0+IHRoaXMuZ2V0KCdzZW5kZXJLZXlJbmZvJyksXG4gICAgICBzYXZlU2VuZGVyS2V5SW5mbzogYXN5bmMgKHNlbmRlcktleUluZm86IFNlbmRlcktleUluZm9UeXBlKSA9PiB7XG4gICAgICAgIHRoaXMuc2V0KHsgc2VuZGVyS2V5SW5mbyB9KTtcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaXNNZW1iZXJSZXF1ZXN0aW5nVG9Kb2luKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHBlbmRpbmdBZG1pbkFwcHJvdmFsVjIgPSB0aGlzLmdldCgncGVuZGluZ0FkbWluQXBwcm92YWxWMicpO1xuXG4gICAgaWYgKCFwZW5kaW5nQWRtaW5BcHByb3ZhbFYyIHx8ICFwZW5kaW5nQWRtaW5BcHByb3ZhbFYyLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSBVVUlELmNoZWNrZWRMb29rdXAoaWQpLnRvU3RyaW5nKCk7XG4gICAgcmV0dXJuIHBlbmRpbmdBZG1pbkFwcHJvdmFsVjIuc29tZShpdGVtID0+IGl0ZW0udXVpZCA9PT0gdXVpZCk7XG4gIH1cblxuICBpc01lbWJlclBlbmRpbmcoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgcGVuZGluZ01lbWJlcnNWMiA9IHRoaXMuZ2V0KCdwZW5kaW5nTWVtYmVyc1YyJyk7XG5cbiAgICBpZiAoIXBlbmRpbmdNZW1iZXJzVjIgfHwgIXBlbmRpbmdNZW1iZXJzVjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IFVVSUQuY2hlY2tlZExvb2t1cChpZCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gcGVuZGluZ01lbWJlcnNWMi5zb21lKGl0ZW0gPT4gaXRlbS51dWlkID09PSB1dWlkKTtcbiAgfVxuXG4gIGlzTWVtYmVyQmFubmVkKGlkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGJhbm5lZE1lbWJlcnNWMiA9IHRoaXMuZ2V0KCdiYW5uZWRNZW1iZXJzVjInKTtcblxuICAgIGlmICghYmFubmVkTWVtYmVyc1YyIHx8ICFiYW5uZWRNZW1iZXJzVjIubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IFVVSUQuY2hlY2tlZExvb2t1cChpZCkudG9TdHJpbmcoKTtcbiAgICByZXR1cm4gYmFubmVkTWVtYmVyc1YyLnNvbWUobWVtYmVyID0+IG1lbWJlci51dWlkID09PSB1dWlkKTtcbiAgfVxuXG4gIGlzTWVtYmVyQXdhaXRpbmdBcHByb3ZhbChpZDogc3RyaW5nKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBwZW5kaW5nQWRtaW5BcHByb3ZhbFYyID0gdGhpcy5nZXQoJ3BlbmRpbmdBZG1pbkFwcHJvdmFsVjInKTtcblxuICAgIGlmICghcGVuZGluZ0FkbWluQXBwcm92YWxWMiB8fCAhcGVuZGluZ0FkbWluQXBwcm92YWxWMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gVVVJRC5jaGVja2VkTG9va3VwKGlkKS50b1N0cmluZygpO1xuICAgIHJldHVybiB3aW5kb3cuXy5hbnkocGVuZGluZ0FkbWluQXBwcm92YWxWMiwgaXRlbSA9PiBpdGVtLnV1aWQgPT09IHV1aWQpO1xuICB9XG5cbiAgaXNNZW1iZXIoaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGlzTWVtYmVyOiBDYWxsZWQgZm9yIG5vbi1Hcm91cFYyIGNvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgbWVtYmVyc1YyID0gdGhpcy5nZXQoJ21lbWJlcnNWMicpO1xuXG4gICAgaWYgKCFtZW1iZXJzVjIgfHwgIW1lbWJlcnNWMi5sZW5ndGgpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgdXVpZCA9IFVVSUQuY2hlY2tlZExvb2t1cChpZCkudG9TdHJpbmcoKTtcblxuICAgIHJldHVybiB3aW5kb3cuXy5hbnkobWVtYmVyc1YyLCBpdGVtID0+IGl0ZW0udXVpZCA9PT0gdXVpZCk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVFeHBpcmF0aW9uVGltZXJJbkdyb3VwVjIoXG4gICAgc2Vjb25kcz86IG51bWJlclxuICApOiBQcm9taXNlPFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBpZExvZyA9IHRoaXMuaWRGb3JMb2dnaW5nKCk7XG4gICAgY29uc3QgY3VycmVudCA9IHRoaXMuZ2V0KCdleHBpcmVUaW1lcicpO1xuICAgIGNvbnN0IGJvdGhGYWxzZXkgPSBCb29sZWFuKGN1cnJlbnQpID09PSBmYWxzZSAmJiBCb29sZWFuKHNlY29uZHMpID09PSBmYWxzZTtcblxuICAgIGlmIChjdXJyZW50ID09PSBzZWNvbmRzIHx8IGJvdGhGYWxzZXkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgdXBkYXRlRXhwaXJhdGlvblRpbWVySW5Hcm91cFYyLyR7aWRMb2d9OiBSZXF1ZXN0ZWQgdGltZXIgJHtzZWNvbmRzfSBpcyB1bmNoYW5nZWQgZnJvbSBleGlzdGluZyAke2N1cnJlbnR9LmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZERpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXJDaGFuZ2Uoe1xuICAgICAgZXhwaXJlVGltZXI6IHNlY29uZHMgfHwgMCxcbiAgICAgIGdyb3VwOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBwcm9tb3RlUGVuZGluZ01lbWJlcihcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4gICk6IFByb21pc2U8UHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGlkTG9nID0gdGhpcy5pZEZvckxvZ2dpbmcoKTtcblxuICAgIC8vIFRoaXMgdXNlcidzIHBlbmRpbmcgc3RhdGUgbWF5IGhhdmUgY2hhbmdlZCBpbiB0aGUgdGltZSBiZXR3ZWVuIHRoZSB1c2VyJ3NcbiAgICAvLyAgIGJ1dHRvbiBwcmVzcyBhbmQgd2hlbiB3ZSBnZXQgaGVyZS4gSXQncyBlc3BlY2lhbGx5IGltcG9ydGFudCB0byBjaGVjayBoZXJlXG4gICAgLy8gICBpbiBjb25mbGljdC9yZXRyeSBjYXNlcy5cbiAgICBpZiAoIXRoaXMuaXNNZW1iZXJQZW5kaW5nKGNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBwcm9tb3RlUGVuZGluZ01lbWJlci8ke2lkTG9nfTogJHtjb252ZXJzYXRpb25JZH0gaXMgbm90IGEgcGVuZGluZyBtZW1iZXIgb2YgZ3JvdXAuIFJldHVybmluZyBlYXJseS5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBwZW5kaW5nTWVtYmVyID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIXBlbmRpbmdNZW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHByb21vdGVQZW5kaW5nTWVtYmVyLyR7aWRMb2d9OiBObyBjb252ZXJzYXRpb24gZm91bmQgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0aGUgdXNlcidzIHByb2ZpbGVLZXlDcmVkZW50aWFsLCB3aGljaCByZXF1aXJlcyBhIHJvdW5kdHJpcCB3aXRoIHRoZVxuICAgIC8vICAgc2VydmVyLCBhbmQgbW9zdCBkZWZpbml0ZWx5IHRoZWlyIHByb2ZpbGVLZXkuIEEgZ2V0UHJvZmlsZXMoKSBjYWxsIHdpbGxcbiAgICAvLyAgIGVuc3VyZSB0aGF0IHdlIGhhdmUgYXMgbXVjaCBhcyB3ZSBjYW4gZ2V0IHdpdGggdGhlIGRhdGEgd2UgaGF2ZS5cbiAgICBsZXQgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQgPSBwZW5kaW5nTWVtYmVyLmdldCgncHJvZmlsZUtleUNyZWRlbnRpYWwnKTtcbiAgICBpZiAoIXByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0KSB7XG4gICAgICBhd2FpdCBwZW5kaW5nTWVtYmVyLmdldFByb2ZpbGVzKCk7XG5cbiAgICAgIHByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0ID0gcGVuZGluZ01lbWJlci5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJyk7XG4gICAgICBpZiAoIXByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgcHJvbW90ZVBlbmRpbmdNZW1iZXIvJHtpZExvZ306IE5vIHByb2ZpbGVLZXlDcmVkZW50aWFsIGZvciBjb252ZXJzYXRpb24gJHtwZW5kaW5nTWVtYmVyLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRQcm9tb3RlTWVtYmVyQ2hhbmdlKHtcbiAgICAgIGdyb3VwOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgICAgIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NDogd2luZG93LmdldFNlcnZlclB1YmxpY1BhcmFtcygpLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgYXBwcm92ZVBlbmRpbmdBcHByb3ZhbFJlcXVlc3QoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuICApOiBQcm9taXNlPFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMgfCB1bmRlZmluZWQ+IHtcbiAgICBjb25zdCBpZExvZyA9IHRoaXMuaWRGb3JMb2dnaW5nKCk7XG5cbiAgICAvLyBUaGlzIHVzZXIncyBwZW5kaW5nIHN0YXRlIG1heSBoYXZlIGNoYW5nZWQgaW4gdGhlIHRpbWUgYmV0d2VlbiB0aGUgdXNlcidzXG4gICAgLy8gICBidXR0b24gcHJlc3MgYW5kIHdoZW4gd2UgZ2V0IGhlcmUuIEl0J3MgZXNwZWNpYWxseSBpbXBvcnRhbnQgdG8gY2hlY2sgaGVyZVxuICAgIC8vICAgaW4gY29uZmxpY3QvcmV0cnkgY2FzZXMuXG4gICAgaWYgKCF0aGlzLmlzTWVtYmVyUmVxdWVzdGluZ1RvSm9pbihjb252ZXJzYXRpb25JZCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgYXBwcm92ZVBlbmRpbmdBcHByb3ZhbFJlcXVlc3QvJHtpZExvZ306ICR7Y29udmVyc2F0aW9uSWR9IGlzIG5vdCByZXF1ZXN0aW5nIHRvIGpvaW4gdGhlIGdyb3VwLiBSZXR1cm5pbmcgZWFybHkuYFxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgcGVuZGluZ01lbWJlciA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFwZW5kaW5nTWVtYmVyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBhcHByb3ZlUGVuZGluZ0FwcHJvdmFsUmVxdWVzdC8ke2lkTG9nfTogTm8gY29udmVyc2F0aW9uIGZvdW5kIGZvciBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb25JZH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSBwZW5kaW5nTWVtYmVyLmdldCgndXVpZCcpO1xuICAgIGlmICghdXVpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgYXBwcm92ZVBlbmRpbmdBcHByb3ZhbFJlcXVlc3QvJHtpZExvZ306IE1pc3NpbmcgdXVpZCBmb3IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uSWR9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRQcm9tb3RlUGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJDaGFuZ2Uoe1xuICAgICAgZ3JvdXA6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHV1aWQsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBkZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4gICk6IFByb21pc2U8UHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGlkTG9nID0gdGhpcy5pZEZvckxvZ2dpbmcoKTtcblxuICAgIC8vIFRoaXMgdXNlcidzIHBlbmRpbmcgc3RhdGUgbWF5IGhhdmUgY2hhbmdlZCBpbiB0aGUgdGltZSBiZXR3ZWVuIHRoZSB1c2VyJ3NcbiAgICAvLyAgIGJ1dHRvbiBwcmVzcyBhbmQgd2hlbiB3ZSBnZXQgaGVyZS4gSXQncyBlc3BlY2lhbGx5IGltcG9ydGFudCB0byBjaGVjayBoZXJlXG4gICAgLy8gICBpbiBjb25mbGljdC9yZXRyeSBjYXNlcy5cbiAgICBpZiAoIXRoaXMuaXNNZW1iZXJSZXF1ZXN0aW5nVG9Kb2luKGNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBkZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdC8ke2lkTG9nfTogJHtjb252ZXJzYXRpb25JZH0gaXMgbm90IHJlcXVlc3RpbmcgdG8gam9pbiB0aGUgZ3JvdXAuIFJldHVybmluZyBlYXJseS5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBwZW5kaW5nTWVtYmVyID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIXBlbmRpbmdNZW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGRlbnlQZW5kaW5nQXBwcm92YWxSZXF1ZXN0LyR7aWRMb2d9OiBObyBjb252ZXJzYXRpb24gZm91bmQgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IHBlbmRpbmdNZW1iZXIuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBkZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdC8ke2lkTG9nfTogTWlzc2luZyB1dWlkIGZvciBjb252ZXJzYXRpb24gJHtwZW5kaW5nTWVtYmVyLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlclxuICAgICAgLmdldENoZWNrZWRVdWlkKFVVSURLaW5kLkFDSSlcbiAgICAgIC50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkRGVsZXRlUGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJDaGFuZ2Uoe1xuICAgICAgZ3JvdXA6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIG91clV1aWQsXG4gICAgICB1dWlkLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgYWRkUGVuZGluZ0FwcHJvdmFsUmVxdWVzdCgpOiBQcm9taXNlPFxuICAgIFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMgfCB1bmRlZmluZWRcbiAgPiB7XG4gICAgY29uc3QgaWRMb2cgPSB0aGlzLmlkRm9yTG9nZ2luZygpO1xuXG4gICAgLy8gSGFyZC1jb2RlZCB0byBvdXIgb3duIElELCBiZWNhdXNlIHlvdSBkb24ndCBhZGQgb3RoZXIgdXNlcnMgZm9yIGFkbWluIGFwcHJvdmFsXG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPVxuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWRPclRocm93KCk7XG5cbiAgICBjb25zdCB0b1JlcXVlc3QgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghdG9SZXF1ZXN0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBhZGRQZW5kaW5nQXBwcm92YWxSZXF1ZXN0LyR7aWRMb2d9OiBObyBjb252ZXJzYXRpb24gZm91bmQgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0aGUgdXNlcidzIHByb2ZpbGVLZXlDcmVkZW50aWFsLCB3aGljaCByZXF1aXJlcyBhIHJvdW5kdHJpcCB3aXRoIHRoZVxuICAgIC8vICAgc2VydmVyLCBhbmQgbW9zdCBkZWZpbml0ZWx5IHRoZWlyIHByb2ZpbGVLZXkuIEEgZ2V0UHJvZmlsZXMoKSBjYWxsIHdpbGxcbiAgICAvLyAgIGVuc3VyZSB0aGF0IHdlIGhhdmUgYXMgbXVjaCBhcyB3ZSBjYW4gZ2V0IHdpdGggdGhlIGRhdGEgd2UgaGF2ZS5cbiAgICBsZXQgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQgPSB0b1JlcXVlc3QuZ2V0KCdwcm9maWxlS2V5Q3JlZGVudGlhbCcpO1xuICAgIGlmICghcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQpIHtcbiAgICAgIGF3YWl0IHRvUmVxdWVzdC5nZXRQcm9maWxlcygpO1xuXG4gICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCA9IHRvUmVxdWVzdC5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJyk7XG4gICAgICBpZiAoIXByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgcHJvbW90ZVBlbmRpbmdNZW1iZXIvJHtpZExvZ306IE5vIHByb2ZpbGVLZXlDcmVkZW50aWFsIGZvciBjb252ZXJzYXRpb24gJHt0b1JlcXVlc3QuaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cblxuICAgIC8vIFRoaXMgdXNlcidzIHBlbmRpbmcgc3RhdGUgbWF5IGhhdmUgY2hhbmdlZCBpbiB0aGUgdGltZSBiZXR3ZWVuIHRoZSB1c2VyJ3NcbiAgICAvLyAgIGJ1dHRvbiBwcmVzcyBhbmQgd2hlbiB3ZSBnZXQgaGVyZS4gSXQncyBlc3BlY2lhbGx5IGltcG9ydGFudCB0byBjaGVjayBoZXJlXG4gICAgLy8gICBpbiBjb25mbGljdC9yZXRyeSBjYXNlcy5cbiAgICBpZiAodGhpcy5pc01lbWJlckF3YWl0aW5nQXBwcm92YWwoY29udmVyc2F0aW9uSWQpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGFkZFBlbmRpbmdBcHByb3ZhbFJlcXVlc3QvJHtpZExvZ306ICR7Y29udmVyc2F0aW9uSWR9IGFscmVhZHkgaW4gcGVuZGluZyBhcHByb3ZhbC5gXG4gICAgICApO1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRBZGRQZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlckNoYW5nZSh7XG4gICAgICBncm91cDogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQsXG4gICAgICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQ6IHdpbmRvdy5nZXRTZXJ2ZXJQdWJsaWNQYXJhbXMoKSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGFkZE1lbWJlcihcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4gICk6IFByb21pc2U8UHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGlkTG9nID0gdGhpcy5pZEZvckxvZ2dpbmcoKTtcblxuICAgIGNvbnN0IHRvUmVxdWVzdCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCF0b1JlcXVlc3QpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGFkZE1lbWJlci8ke2lkTG9nfTogTm8gY29udmVyc2F0aW9uIGZvdW5kIGZvciBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb25JZH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSB0b1JlcXVlc3QuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBhZGRNZW1iZXIvJHtpZExvZ306ICR7dG9SZXF1ZXN0LmlkRm9yTG9nZ2luZygpfSBpcyBtaXNzaW5nIGEgdXVpZCFgXG4gICAgICApO1xuICAgIH1cblxuICAgIC8vIFdlIG5lZWQgdGhlIHVzZXIncyBwcm9maWxlS2V5Q3JlZGVudGlhbCwgd2hpY2ggcmVxdWlyZXMgYSByb3VuZHRyaXAgd2l0aCB0aGVcbiAgICAvLyAgIHNlcnZlciwgYW5kIG1vc3QgZGVmaW5pdGVseSB0aGVpciBwcm9maWxlS2V5LiBBIGdldFByb2ZpbGVzKCkgY2FsbCB3aWxsXG4gICAgLy8gICBlbnN1cmUgdGhhdCB3ZSBoYXZlIGFzIG11Y2ggYXMgd2UgY2FuIGdldCB3aXRoIHRoZSBkYXRhIHdlIGhhdmUuXG4gICAgbGV0IHByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0ID0gdG9SZXF1ZXN0LmdldCgncHJvZmlsZUtleUNyZWRlbnRpYWwnKTtcbiAgICBpZiAoIXByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0KSB7XG4gICAgICBhd2FpdCB0b1JlcXVlc3QuZ2V0UHJvZmlsZXMoKTtcblxuICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQgPSB0b1JlcXVlc3QuZ2V0KCdwcm9maWxlS2V5Q3JlZGVudGlhbCcpO1xuICAgICAgaWYgKCFwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYGFkZE1lbWJlci8ke2lkTG9nfTogTm8gcHJvZmlsZUtleUNyZWRlbnRpYWwgZm9yIGNvbnZlcnNhdGlvbiAke3RvUmVxdWVzdC5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVGhpcyB1c2VyJ3MgcGVuZGluZyBzdGF0ZSBtYXkgaGF2ZSBjaGFuZ2VkIGluIHRoZSB0aW1lIGJldHdlZW4gdGhlIHVzZXInc1xuICAgIC8vICAgYnV0dG9uIHByZXNzIGFuZCB3aGVuIHdlIGdldCBoZXJlLiBJdCdzIGVzcGVjaWFsbHkgaW1wb3J0YW50IHRvIGNoZWNrIGhlcmVcbiAgICAvLyAgIGluIGNvbmZsaWN0L3JldHJ5IGNhc2VzLlxuICAgIGlmICh0aGlzLmlzTWVtYmVyKGNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgbG9nLndhcm4oYGFkZE1lbWJlci8ke2lkTG9nfTogJHtjb252ZXJzYXRpb25JZH0gYWxyZWFkeSBhIG1lbWJlci5gKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkQWRkTWVtYmVyKHtcbiAgICAgIGdyb3VwOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgICAgIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NDogd2luZG93LmdldFNlcnZlclB1YmxpY1BhcmFtcygpLFxuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHJlbW92ZVBlbmRpbmdNZW1iZXIoXG4gICAgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+XG4gICk6IFByb21pc2U8UHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB8IHVuZGVmaW5lZD4ge1xuICAgIGNvbnN0IGlkTG9nID0gdGhpcy5pZEZvckxvZ2dpbmcoKTtcblxuICAgIGNvbnN0IHV1aWRzID0gY29udmVyc2F0aW9uSWRzXG4gICAgICAubWFwKGNvbnZlcnNhdGlvbklkID0+IHtcbiAgICAgICAgLy8gVGhpcyB1c2VyJ3MgcGVuZGluZyBzdGF0ZSBtYXkgaGF2ZSBjaGFuZ2VkIGluIHRoZSB0aW1lIGJldHdlZW4gdGhlIHVzZXInc1xuICAgICAgICAvLyAgIGJ1dHRvbiBwcmVzcyBhbmQgd2hlbiB3ZSBnZXQgaGVyZS4gSXQncyBlc3BlY2lhbGx5IGltcG9ydGFudCB0byBjaGVjayBoZXJlXG4gICAgICAgIC8vICAgaW4gY29uZmxpY3QvcmV0cnkgY2FzZXMuXG4gICAgICAgIGlmICghdGhpcy5pc01lbWJlclBlbmRpbmcoY29udmVyc2F0aW9uSWQpKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgcmVtb3ZlUGVuZGluZ01lbWJlci8ke2lkTG9nfTogJHtjb252ZXJzYXRpb25JZH0gaXMgbm90IGEgcGVuZGluZyBtZW1iZXIgb2YgZ3JvdXAuIFJldHVybmluZyBlYXJseS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgcGVuZGluZ01lbWJlciA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIGlmICghcGVuZGluZ01lbWJlcikge1xuICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgYHJlbW92ZVBlbmRpbmdNZW1iZXIvJHtpZExvZ306IE5vIGNvbnZlcnNhdGlvbiBmb3VuZCBmb3IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uSWR9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHV1aWQgPSBwZW5kaW5nTWVtYmVyLmdldCgndXVpZCcpO1xuICAgICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGByZW1vdmVQZW5kaW5nTWVtYmVyLyR7aWRMb2d9OiBNaXNzaW5nIHV1aWQgZm9yIGNvbnZlcnNhdGlvbiAke3BlbmRpbmdNZW1iZXIuaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdXVpZDtcbiAgICAgIH0pXG4gICAgICAuZmlsdGVyKGlzTm90TmlsKTtcblxuICAgIGlmICghdXVpZHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZERlbGV0ZVBlbmRpbmdNZW1iZXJDaGFuZ2Uoe1xuICAgICAgZ3JvdXA6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHV1aWRzLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlTWVtYmVyKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHwgdW5kZWZpbmVkPiB7XG4gICAgY29uc3QgaWRMb2cgPSB0aGlzLmlkRm9yTG9nZ2luZygpO1xuXG4gICAgLy8gVGhpcyB1c2VyJ3MgcGVuZGluZyBzdGF0ZSBtYXkgaGF2ZSBjaGFuZ2VkIGluIHRoZSB0aW1lIGJldHdlZW4gdGhlIHVzZXInc1xuICAgIC8vICAgYnV0dG9uIHByZXNzIGFuZCB3aGVuIHdlIGdldCBoZXJlLiBJdCdzIGVzcGVjaWFsbHkgaW1wb3J0YW50IHRvIGNoZWNrIGhlcmVcbiAgICAvLyAgIGluIGNvbmZsaWN0L3JldHJ5IGNhc2VzLlxuICAgIGlmICghdGhpcy5pc01lbWJlcihjb252ZXJzYXRpb25JZCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgcmVtb3ZlTWVtYmVyLyR7aWRMb2d9OiAke2NvbnZlcnNhdGlvbklkfSBpcyBub3QgYSBwZW5kaW5nIG1lbWJlciBvZiBncm91cC4gUmV0dXJuaW5nIGVhcmx5LmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlciA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFtZW1iZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHJlbW92ZU1lbWJlci8ke2lkTG9nfTogTm8gY29udmVyc2F0aW9uIGZvdW5kIGZvciBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb25JZH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSBtZW1iZXIuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGByZW1vdmVNZW1iZXIvJHtpZExvZ306IE1pc3NpbmcgdXVpZCBmb3IgY29udmVyc2F0aW9uICR7bWVtYmVyLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlclxuICAgICAgLmdldENoZWNrZWRVdWlkKFVVSURLaW5kLkFDSSlcbiAgICAgIC50b1N0cmluZygpO1xuXG4gICAgcmV0dXJuIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkRGVsZXRlTWVtYmVyQ2hhbmdlKHtcbiAgICAgIGdyb3VwOiB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICBvdXJVdWlkLFxuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHRvZ2dsZUFkbWluQ2hhbmdlKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBpZExvZyA9IHRoaXMuaWRGb3JMb2dnaW5nKCk7XG5cbiAgICBpZiAoIXRoaXMuaXNNZW1iZXIoY29udmVyc2F0aW9uSWQpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYHRvZ2dsZUFkbWluQ2hhbmdlLyR7aWRMb2d9OiAke2NvbnZlcnNhdGlvbklkfSBpcyBub3QgYSBwZW5kaW5nIG1lbWJlciBvZiBncm91cC4gUmV0dXJuaW5nIGVhcmx5LmBcbiAgICAgICk7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHRvZ2dsZUFkbWluQ2hhbmdlLyR7aWRMb2d9OiBObyBjb252ZXJzYXRpb24gZm91bmQgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKTtcbiAgICBpZiAoIXV1aWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHRvZ2dsZUFkbWluQ2hhbmdlLyR7aWRMb2d9OiBNaXNzaW5nIHV1aWQgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgTUVNQkVSX1JPTEVTID0gUHJvdG8uTWVtYmVyLlJvbGU7XG5cbiAgICBjb25zdCByb2xlID0gdGhpcy5pc0FkbWluKGNvbnZlcnNhdGlvbklkKVxuICAgICAgPyBNRU1CRVJfUk9MRVMuREVGQVVMVFxuICAgICAgOiBNRU1CRVJfUk9MRVMuQURNSU5JU1RSQVRPUjtcblxuICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZE1vZGlmeU1lbWJlclJvbGVDaGFuZ2Uoe1xuICAgICAgZ3JvdXA6IHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHV1aWQsXG4gICAgICByb2xlLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgbW9kaWZ5R3JvdXBWMih7XG4gICAgY3JlYXRlR3JvdXBDaGFuZ2UsXG4gICAgZXh0cmFDb252ZXJzYXRpb25zRm9yU2VuZCxcbiAgICBpbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgbmFtZSxcbiAgfToge1xuICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiAoKSA9PiBQcm9taXNlPFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMgfCB1bmRlZmluZWQ+O1xuICAgIGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmQ/OiBBcnJheTxzdHJpbmc+O1xuICAgIGludml0ZUxpbmtQYXNzd29yZD86IHN0cmluZztcbiAgICBuYW1lOiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgIGNvbnZlcnNhdGlvbjogdGhpcyxcbiAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlLFxuICAgICAgZXh0cmFDb252ZXJzYXRpb25zRm9yU2VuZCxcbiAgICAgIGludml0ZUxpbmtQYXNzd29yZCxcbiAgICAgIG5hbWUsXG4gICAgfSk7XG4gIH1cblxuICBpc0V2ZXJVbnJlZ2lzdGVyZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIEJvb2xlYW4odGhpcy5nZXQoJ2Rpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdCcpKTtcbiAgfVxuXG4gIGlzVW5yZWdpc3RlcmVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCh0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgaXNTTVNPbmx5KCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0NvbnZlcnNhdGlvblNNU09ubHkoe1xuICAgICAgLi4udGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgdHlwZTogaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSA/ICdkaXJlY3QnIDogJ3Vua25vd24nLFxuICAgIH0pO1xuICB9XG5cbiAgc2V0VW5yZWdpc3RlcmVkKCk6IHZvaWQge1xuICAgIGxvZy5pbmZvKGBDb252ZXJzYXRpb24gJHt0aGlzLmlkRm9yTG9nZ2luZygpfSBpcyBub3cgdW5yZWdpc3RlcmVkYCk7XG4gICAgdGhpcy5zZXQoe1xuICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiBEYXRlLm5vdygpLFxuICAgIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHNldFJlZ2lzdGVyZWQoKTogdm9pZCB7XG4gICAgaWYgKHRoaXMuZ2V0KCdkaXNjb3ZlcmVkVW5yZWdpc3RlcmVkQXQnKSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYENvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9IGlzIHJlZ2lzdGVyZWQgb25jZSBhZ2FpbmApO1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIGRpc2NvdmVyZWRVbnJlZ2lzdGVyZWRBdDogdW5kZWZpbmVkLFxuICAgIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIGlzR3JvdXBWMUFuZERpc2FibGVkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIGlzQmxvY2tlZCgpOiBib29sZWFuIHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5nZXQoJ3V1aWQnKTtcbiAgICBpZiAodXVpZCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuaXNVdWlkQmxvY2tlZCh1dWlkKTtcbiAgICB9XG5cbiAgICBjb25zdCBlMTY0ID0gdGhpcy5nZXQoJ2UxNjQnKTtcbiAgICBpZiAoZTE2NCkge1xuICAgICAgcmV0dXJuIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuaXNCbG9ja2VkKGUxNjQpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLmdldCgnZ3JvdXBJZCcpO1xuICAgIGlmIChncm91cElkKSB7XG4gICAgICByZXR1cm4gd2luZG93LnN0b3JhZ2UuYmxvY2tlZC5pc0dyb3VwQmxvY2tlZChncm91cElkKTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBibG9jayh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyA9IGZhbHNlIH0gPSB7fSk6IHZvaWQge1xuICAgIGxldCBibG9ja2VkID0gZmFsc2U7XG4gICAgY29uc3Qgd2FzQmxvY2tlZCA9IHRoaXMuaXNCbG9ja2VkKCk7XG5cbiAgICBjb25zdCB1dWlkID0gdGhpcy5nZXQoJ3V1aWQnKTtcbiAgICBpZiAodXVpZCkge1xuICAgICAgd2luZG93LnN0b3JhZ2UuYmxvY2tlZC5hZGRCbG9ja2VkVXVpZCh1dWlkKTtcbiAgICAgIGJsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGUxNjQgPSB0aGlzLmdldCgnZTE2NCcpO1xuICAgIGlmIChlMTY0KSB7XG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmFkZEJsb2NrZWROdW1iZXIoZTE2NCk7XG4gICAgICBibG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cElkID0gdGhpcy5nZXQoJ2dyb3VwSWQnKTtcbiAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgd2luZG93LnN0b3JhZ2UuYmxvY2tlZC5hZGRCbG9ja2VkR3JvdXAoZ3JvdXBJZCk7XG4gICAgICBibG9ja2VkID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoYmxvY2tlZCAmJiAhd2FzQmxvY2tlZCkge1xuICAgICAgLy8gV2UgbmVlZCB0byBmb3JjZSBhIHByb3BzIHJlZnJlc2ggLSBibG9ja2VkIHN0YXRlIGlzIG5vdCBpbiBiYWNrYm9uZSBhdHRyaWJ1dGVzXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXMsIHsgZm9yY2U6IHRydWUgfSk7XG5cbiAgICAgIGlmICghdmlhU3RvcmFnZVNlcnZpY2VTeW5jKSB7XG4gICAgICAgIHRoaXMuY2FwdHVyZUNoYW5nZSgnYmxvY2snKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICB1bmJsb2NrKHsgdmlhU3RvcmFnZVNlcnZpY2VTeW5jID0gZmFsc2UgfSA9IHt9KTogYm9vbGVhbiB7XG4gICAgbGV0IHVuYmxvY2tlZCA9IGZhbHNlO1xuICAgIGNvbnN0IHdhc0Jsb2NrZWQgPSB0aGlzLmlzQmxvY2tlZCgpO1xuXG4gICAgY29uc3QgdXVpZCA9IHRoaXMuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKHV1aWQpIHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQucmVtb3ZlQmxvY2tlZFV1aWQodXVpZCk7XG4gICAgICB1bmJsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGUxNjQgPSB0aGlzLmdldCgnZTE2NCcpO1xuICAgIGlmIChlMTY0KSB7XG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLnJlbW92ZUJsb2NrZWROdW1iZXIoZTE2NCk7XG4gICAgICB1bmJsb2NrZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLmdldCgnZ3JvdXBJZCcpO1xuICAgIGlmIChncm91cElkKSB7XG4gICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLnJlbW92ZUJsb2NrZWRHcm91cChncm91cElkKTtcbiAgICAgIHVuYmxvY2tlZCA9IHRydWU7XG4gICAgfVxuXG4gICAgaWYgKHVuYmxvY2tlZCAmJiB3YXNCbG9ja2VkKSB7XG4gICAgICAvLyBXZSBuZWVkIHRvIGZvcmNlIGEgcHJvcHMgcmVmcmVzaCAtIGJsb2NrZWQgc3RhdGUgaXMgbm90IGluIGJhY2tib25lIGF0dHJpYnV0ZXNcbiAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgeyBmb3JjZTogdHJ1ZSB9KTtcblxuICAgICAgaWYgKCF2aWFTdG9yYWdlU2VydmljZVN5bmMpIHtcbiAgICAgICAgdGhpcy5jYXB0dXJlQ2hhbmdlKCd1bmJsb2NrJyk7XG4gICAgICB9XG5cbiAgICAgIHRoaXMuZmV0Y2hMYXRlc3RHcm91cFYyRGF0YSh7IGZvcmNlOiB0cnVlIH0pO1xuICAgIH1cblxuICAgIHJldHVybiB1bmJsb2NrZWQ7XG4gIH1cblxuICBlbmFibGVQcm9maWxlU2hhcmluZyh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyA9IGZhbHNlIH0gPSB7fSk6IHZvaWQge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYGVuYWJsZVByb2ZpbGVTaGFyaW5nOiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9IHN0b3JhZ2U/ICR7dmlhU3RvcmFnZVNlcnZpY2VTeW5jfWBcbiAgICApO1xuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0KCdwcm9maWxlU2hhcmluZycpO1xuXG4gICAgdGhpcy5zZXQoeyBwcm9maWxlU2hhcmluZzogdHJ1ZSB9KTtcblxuICAgIGNvbnN0IGFmdGVyID0gdGhpcy5nZXQoJ3Byb2ZpbGVTaGFyaW5nJyk7XG5cbiAgICBpZiAoIXZpYVN0b3JhZ2VTZXJ2aWNlU3luYyAmJiBCb29sZWFuKGJlZm9yZSkgIT09IEJvb2xlYW4oYWZ0ZXIpKSB7XG4gICAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoJ2VuYWJsZVByb2ZpbGVTaGFyaW5nJyk7XG4gICAgfVxuICB9XG5cbiAgZGlzYWJsZVByb2ZpbGVTaGFyaW5nKHsgdmlhU3RvcmFnZVNlcnZpY2VTeW5jID0gZmFsc2UgfSA9IHt9KTogdm9pZCB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgZGlzYWJsZVByb2ZpbGVTaGFyaW5nOiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9IHN0b3JhZ2U/ICR7dmlhU3RvcmFnZVNlcnZpY2VTeW5jfWBcbiAgICApO1xuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0KCdwcm9maWxlU2hhcmluZycpO1xuXG4gICAgdGhpcy5zZXQoeyBwcm9maWxlU2hhcmluZzogZmFsc2UgfSk7XG5cbiAgICBjb25zdCBhZnRlciA9IHRoaXMuZ2V0KCdwcm9maWxlU2hhcmluZycpO1xuXG4gICAgaWYgKCF2aWFTdG9yYWdlU2VydmljZVN5bmMgJiYgQm9vbGVhbihiZWZvcmUpICE9PSBCb29sZWFuKGFmdGVyKSkge1xuICAgICAgdGhpcy5jYXB0dXJlQ2hhbmdlKCdkaXNhYmxlUHJvZmlsZVNoYXJpbmcnKTtcbiAgICB9XG4gIH1cblxuICBoYXNEcmFmdCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBkcmFmdEF0dGFjaG1lbnRzID0gdGhpcy5nZXQoJ2RyYWZ0QXR0YWNobWVudHMnKSB8fCBbXTtcbiAgICByZXR1cm4gKHRoaXMuZ2V0KCdkcmFmdCcpIHx8XG4gICAgICB0aGlzLmdldCgncXVvdGVkTWVzc2FnZUlkJykgfHxcbiAgICAgIGRyYWZ0QXR0YWNobWVudHMubGVuZ3RoID4gMCkgYXMgYm9vbGVhbjtcbiAgfVxuXG4gIGdldERyYWZ0UHJldmlldygpOiBzdHJpbmcge1xuICAgIGNvbnN0IGRyYWZ0ID0gdGhpcy5nZXQoJ2RyYWZ0Jyk7XG5cbiAgICBpZiAoZHJhZnQpIHtcbiAgICAgIGNvbnN0IGJvZHlSYW5nZXMgPSB0aGlzLmdldCgnZHJhZnRCb2R5UmFuZ2VzJykgfHwgW107XG5cbiAgICAgIHJldHVybiBnZXRUZXh0V2l0aE1lbnRpb25zKGJvZHlSYW5nZXMsIGRyYWZ0KTtcbiAgICB9XG5cbiAgICBjb25zdCBkcmFmdEF0dGFjaG1lbnRzID0gdGhpcy5nZXQoJ2RyYWZ0QXR0YWNobWVudHMnKSB8fCBbXTtcbiAgICBpZiAoZHJhZnRBdHRhY2htZW50cy5sZW5ndGggPiAwKSB7XG4gICAgICByZXR1cm4gd2luZG93LmkxOG4oJ0NvbnZlcnNhdGlvbi0tZ2V0RHJhZnRQcmV2aWV3LS1hdHRhY2htZW50Jyk7XG4gICAgfVxuXG4gICAgY29uc3QgcXVvdGVkTWVzc2FnZUlkID0gdGhpcy5nZXQoJ3F1b3RlZE1lc3NhZ2VJZCcpO1xuICAgIGlmIChxdW90ZWRNZXNzYWdlSWQpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuaTE4bignQ29udmVyc2F0aW9uLS1nZXREcmFmdFByZXZpZXctLXF1b3RlJyk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpbmRvdy5pMThuKCdDb252ZXJzYXRpb24tLWdldERyYWZ0UHJldmlldy0tZHJhZnQnKTtcbiAgfVxuXG4gIGJ1bXBUeXBpbmcoKTogdm9pZCB7XG4gICAgLy8gV2UgZG9uJ3Qgc2VuZCB0eXBpbmcgbWVzc2FnZXMgaWYgdGhlIHNldHRpbmcgaXMgZGlzYWJsZWRcbiAgICBpZiAoIXdpbmRvdy5FdmVudHMuZ2V0VHlwaW5nSW5kaWNhdG9yU2V0dGluZygpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnR5cGluZ1JlZnJlc2hUaW1lcikge1xuICAgICAgY29uc3QgaXNUeXBpbmcgPSB0cnVlO1xuICAgICAgdGhpcy5zZXRUeXBpbmdSZWZyZXNoVGltZXIoKTtcbiAgICAgIHRoaXMuc2VuZFR5cGluZ01lc3NhZ2UoaXNUeXBpbmcpO1xuICAgIH1cblxuICAgIHRoaXMuc2V0VHlwaW5nUGF1c2VUaW1lcigpO1xuICB9XG5cbiAgc2V0VHlwaW5nUmVmcmVzaFRpbWVyKCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMudHlwaW5nUmVmcmVzaFRpbWVyKTtcbiAgICB0aGlzLnR5cGluZ1JlZnJlc2hUaW1lciA9IHNldFRpbWVvdXQoXG4gICAgICB0aGlzLm9uVHlwaW5nUmVmcmVzaFRpbWVvdXQuYmluZCh0aGlzKSxcbiAgICAgIDEwICogMTAwMFxuICAgICk7XG4gIH1cblxuICBvblR5cGluZ1JlZnJlc2hUaW1lb3V0KCk6IHZvaWQge1xuICAgIGNvbnN0IGlzVHlwaW5nID0gdHJ1ZTtcbiAgICB0aGlzLnNlbmRUeXBpbmdNZXNzYWdlKGlzVHlwaW5nKTtcblxuICAgIC8vIFRoaXMgdGltZXIgd2lsbCBjb250aW51ZSB0byByZXNldCBpdHNlbGYgdW50aWwgdGhlIHBhdXNlIHRpbWVyIHN0b3BzIGl0XG4gICAgdGhpcy5zZXRUeXBpbmdSZWZyZXNoVGltZXIoKTtcbiAgfVxuXG4gIHNldFR5cGluZ1BhdXNlVGltZXIoKTogdm9pZCB7XG4gICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGhpcy50eXBpbmdQYXVzZVRpbWVyKTtcbiAgICB0aGlzLnR5cGluZ1BhdXNlVGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgdGhpcy5vblR5cGluZ1BhdXNlVGltZW91dC5iaW5kKHRoaXMpLFxuICAgICAgMyAqIDEwMDBcbiAgICApO1xuICB9XG5cbiAgb25UeXBpbmdQYXVzZVRpbWVvdXQoKTogdm9pZCB7XG4gICAgY29uc3QgaXNUeXBpbmcgPSBmYWxzZTtcbiAgICB0aGlzLnNlbmRUeXBpbmdNZXNzYWdlKGlzVHlwaW5nKTtcblxuICAgIHRoaXMuY2xlYXJUeXBpbmdUaW1lcnMoKTtcbiAgfVxuXG4gIGNsZWFyVHlwaW5nVGltZXJzKCk6IHZvaWQge1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMudHlwaW5nUGF1c2VUaW1lcik7XG4gICAgdGhpcy50eXBpbmdQYXVzZVRpbWVyID0gbnVsbDtcbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLnR5cGluZ1JlZnJlc2hUaW1lcik7XG4gICAgdGhpcy50eXBpbmdSZWZyZXNoVGltZXIgPSBudWxsO1xuICB9XG5cbiAgYXN5bmMgZmV0Y2hMYXRlc3RHcm91cFYyRGF0YShcbiAgICBvcHRpb25zOiB7IGZvcmNlPzogYm9vbGVhbiB9ID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuR3JvdXBzLndhaXRUaGVuTWF5YmVVcGRhdGVHcm91cCh7XG4gICAgICBmb3JjZTogb3B0aW9ucy5mb3JjZSxcbiAgICAgIGNvbnZlcnNhdGlvbjogdGhpcyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGZldGNoU01TT25seVVVSUQoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICAgIGlmICghbWVzc2FnaW5nKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICghdGhpcy5pc1NNU09ubHkoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgYEZldGNoaW5nIHV1aWQgZm9yIGEgc21zLW9ubHkgY29udmVyc2F0aW9uICR7dGhpcy5pZEZvckxvZ2dpbmcoKX1gXG4gICAgKTtcblxuICAgIHRoaXMuaXNGZXRjaGluZ1VVSUQgPSB0cnVlO1xuICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgeyBmb3JjZTogdHJ1ZSB9KTtcblxuICAgIHRyeSB7XG4gICAgICAvLyBBdHRlbXB0IHRvIGZldGNoIFVVSURcbiAgICAgIGF3YWl0IHVwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCh7XG4gICAgICAgIGNvbnZlcnNhdGlvbkNvbnRyb2xsZXI6IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLFxuICAgICAgICBjb252ZXJzYXRpb25zOiBbdGhpc10sXG4gICAgICAgIG1lc3NhZ2luZyxcbiAgICAgIH0pO1xuICAgIH0gZmluYWxseSB7XG4gICAgICAvLyBObyByZWR1eCB1cGRhdGUgaGVyZVxuICAgICAgdGhpcy5pc0ZldGNoaW5nVVVJRCA9IGZhbHNlO1xuICAgICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2UnLCB0aGlzLCB7IGZvcmNlOiB0cnVlIH0pO1xuXG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYERvbmUgZmV0Y2hpbmcgdXVpZCBmb3IgYSBzbXMtb25seSBjb252ZXJzYXRpb24gJHt0aGlzLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmdldCgndXVpZCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gT24gc3VjY2Vzc2Z1bCBmZXRjaCAtIG1hcmsgY29udGFjdCBhcyByZWdpc3RlcmVkLlxuICAgIHRoaXMuc2V0UmVnaXN0ZXJlZCgpO1xuICB9XG5cbiAgb3ZlcnJpZGUgaXNWYWxpZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gKFxuICAgICAgaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSB8fFxuICAgICAgaXNHcm91cFYxKHRoaXMuYXR0cmlidXRlcykgfHxcbiAgICAgIGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIG1heWJlTWlncmF0ZVYxR3JvdXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlzTWlncmF0ZWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5oYXNWMUdyb3VwQmVlbk1pZ3JhdGVkKHRoaXMpO1xuICAgIGlmICghaXNNaWdyYXRlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuR3JvdXBzLndhaXRUaGVuUmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbih7XG4gICAgICBjb252ZXJzYXRpb246IHRoaXMsXG4gICAgfSk7XG4gIH1cblxuICBtYXliZVJlcGFpckdyb3VwVjIoZGF0YToge1xuICAgIG1hc3RlcktleTogc3RyaW5nO1xuICAgIHNlY3JldFBhcmFtczogc3RyaW5nO1xuICAgIHB1YmxpY1BhcmFtczogc3RyaW5nO1xuICB9KTogdm9pZCB7XG4gICAgaWYgKFxuICAgICAgdGhpcy5nZXQoJ2dyb3VwVmVyc2lvbicpICYmXG4gICAgICB0aGlzLmdldCgnbWFzdGVyS2V5JykgJiZcbiAgICAgIHRoaXMuZ2V0KCdzZWNyZXRQYXJhbXMnKSAmJlxuICAgICAgdGhpcy5nZXQoJ3B1YmxpY1BhcmFtcycpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oYFJlcGFpcmluZyBHcm91cFYyIGNvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9YCk7XG4gICAgY29uc3QgeyBtYXN0ZXJLZXksIHNlY3JldFBhcmFtcywgcHVibGljUGFyYW1zIH0gPSBkYXRhO1xuXG4gICAgdGhpcy5zZXQoeyBtYXN0ZXJLZXksIHNlY3JldFBhcmFtcywgcHVibGljUGFyYW1zLCBncm91cFZlcnNpb246IDIgfSk7XG5cbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBnZXRHcm91cFYySW5mbyhcbiAgICBvcHRpb25zOiBSZWFkb25seTxcbiAgICAgIHsgZ3JvdXBDaGFuZ2U/OiBVaW50OEFycmF5IH0gJiAoXG4gICAgICAgIHwge1xuICAgICAgICAgICAgaW5jbHVkZVBlbmRpbmdNZW1iZXJzPzogYm9vbGVhbjtcbiAgICAgICAgICAgIGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmQ/OiBBcnJheTxzdHJpbmc+O1xuICAgICAgICAgIH1cbiAgICAgICAgfCB7IG1lbWJlcnM6IEFycmF5PHN0cmluZz4gfVxuICAgICAgKVxuICAgID4gPSB7fVxuICApOiBHcm91cFYySW5mb1R5cGUgfCB1bmRlZmluZWQge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpIHx8ICFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgIG1hc3RlcktleTogQnl0ZXMuZnJvbUJhc2U2NChcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdGhpcy5nZXQoJ21hc3RlcktleScpIVxuICAgICAgKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICByZXZpc2lvbjogdGhpcy5nZXQoJ3JldmlzaW9uJykhLFxuICAgICAgbWVtYmVyczpcbiAgICAgICAgJ21lbWJlcnMnIGluIG9wdGlvbnMgPyBvcHRpb25zLm1lbWJlcnMgOiB0aGlzLmdldFJlY2lwaWVudHMob3B0aW9ucyksXG4gICAgICBncm91cENoYW5nZTogb3B0aW9ucy5ncm91cENoYW5nZSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0R3JvdXBWMUluZm8obWVtYmVycz86IEFycmF5PHN0cmluZz4pOiBHcm91cFYxSW5mb1R5cGUgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLmdldCgnZ3JvdXBJZCcpO1xuICAgIGNvbnN0IGdyb3VwVmVyc2lvbiA9IHRoaXMuZ2V0KCdncm91cFZlcnNpb24nKTtcblxuICAgIGlmIChcbiAgICAgIGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykgfHxcbiAgICAgICFncm91cElkIHx8XG4gICAgICAoZ3JvdXBWZXJzaW9uICYmIGdyb3VwVmVyc2lvbiA+IDApXG4gICAgKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBpZDogZ3JvdXBJZCxcbiAgICAgIG1lbWJlcnM6IG1lbWJlcnMgfHwgdGhpcy5nZXRSZWNpcGllbnRzKCksXG4gICAgfTtcbiAgfVxuXG4gIGdldEdyb3VwSWRCdWZmZXIoKTogVWludDhBcnJheSB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgZ3JvdXBJZFN0cmluZyA9IHRoaXMuZ2V0KCdncm91cElkJyk7XG5cbiAgICBpZiAoIWdyb3VwSWRTdHJpbmcpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKGlzR3JvdXBWMSh0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gQnl0ZXMuZnJvbUJpbmFyeShncm91cElkU3RyaW5nKTtcbiAgICB9XG4gICAgaWYgKGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gQnl0ZXMuZnJvbUJhc2U2NChncm91cElkU3RyaW5nKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYXN5bmMgc2VuZFR5cGluZ01lc3NhZ2UoaXNUeXBpbmc6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG5cbiAgICBpZiAoIW1lc3NhZ2luZykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIFdlIGRvbid0IHNlbmQgdHlwaW5nIG1lc3NhZ2VzIHRvIG91ciBvdGhlciBkZXZpY2VzXG4gICAgaWYgKGlzTWUodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIENvYWxlc2NlIG11bHRpcGxlIHNlbmRUeXBpbmdNZXNzYWdlIGNhbGxzIGludG8gb25lLlxuICAgIC8vXG4gICAgLy8gYGxhc3RJc1R5cGluZ2AgaXMgc2V0IHRvIHRoZSBsYXN0IGBpc1R5cGluZ2AgdmFsdWUgcGFzc2VkIHRvIHRoZVxuICAgIC8vIGBzZW5kVHlwaW5nTWVzc2FnZWAuIFRoZSBmaXJzdCAnc2VuZFR5cGluZ01lc3NhZ2UnIGpvYiB0byBydW4gd2lsbFxuICAgIC8vIHBpY2sgaXQgYW5kIHJlc2V0IGl0IGJhY2sgdG8gYHVuZGVmaW5lZGAgc28gdGhhdCBsYXRlciBqb2JzIHdpbGxcbiAgICAvLyBpbiBlZmZlY3QgYmUgaWdub3JlZC5cbiAgICB0aGlzLmxhc3RJc1R5cGluZyA9IGlzVHlwaW5nO1xuXG4gICAgYXdhaXQgdGhpcy5xdWV1ZUpvYignc2VuZFR5cGluZ01lc3NhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBncm91cE1lbWJlcnMgPSB0aGlzLmdldFJlY2lwaWVudHMoKTtcblxuICAgICAgLy8gV2UgZG9uJ3Qgc2VuZCB0eXBpbmcgbWVzc2FnZXMgaWYgb3VyIHJlY2lwaWVudHMgbGlzdCBpcyBlbXB0eVxuICAgICAgaWYgKCFpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpICYmICFncm91cE1lbWJlcnMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMubGFzdElzVHlwaW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgbG9nLmluZm8oYHNlbmRUeXBpbmdNZXNzYWdlKCR7dGhpcy5pZEZvckxvZ2dpbmcoKX0pOiBpZ25vcmluZ2ApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudElkID0gaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgICA/IHRoaXMuZ2V0U2VuZFRhcmdldCgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgY29uc3QgZ3JvdXBJZCA9IHRoaXMuZ2V0R3JvdXBJZEJ1ZmZlcigpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgICAgY29uc3QgY29udGVudCA9IHtcbiAgICAgICAgcmVjaXBpZW50SWQsXG4gICAgICAgIGdyb3VwSWQsXG4gICAgICAgIGdyb3VwTWVtYmVycyxcbiAgICAgICAgaXNUeXBpbmc6IHRoaXMubGFzdElzVHlwaW5nLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgdGhpcy5sYXN0SXNUeXBpbmcgPSB1bmRlZmluZWQ7XG5cbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgc2VuZFR5cGluZ01lc3NhZ2UoJHt0aGlzLmlkRm9yTG9nZ2luZygpfSk6IHNlbmRpbmcgJHtjb250ZW50LmlzVHlwaW5nfWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNvbnRlbnRNZXNzYWdlID0gbWVzc2FnaW5nLmdldFR5cGluZ0NvbnRlbnRNZXNzYWdlKGNvbnRlbnQpO1xuXG4gICAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICAgIGNvbnN0IHNlbmRPcHRpb25zID0ge1xuICAgICAgICAuLi4oYXdhaXQgZ2V0U2VuZE9wdGlvbnModGhpcy5hdHRyaWJ1dGVzKSksXG4gICAgICAgIG9ubGluZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICBhd2FpdCBoYW5kbGVNZXNzYWdlU2VuZChcbiAgICAgICAgICBtZXNzYWdpbmcuc2VuZE1lc3NhZ2VQcm90b0FuZFdhaXQoe1xuICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgcmVjaXBpZW50czogZ3JvdXBNZW1iZXJzLFxuICAgICAgICAgICAgcHJvdG86IGNvbnRlbnRNZXNzYWdlLFxuICAgICAgICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LklNUExJQ0lULFxuICAgICAgICAgICAgZ3JvdXBJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgb3B0aW9uczogc2VuZE9wdGlvbnMsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgeyBtZXNzYWdlSWRzOiBbXSwgc2VuZFR5cGU6ICd0eXBpbmcnIH1cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKFxuICAgICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5zZW5kQ29udGVudE1lc3NhZ2VUb0dyb3VwKHtcbiAgICAgICAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5JTVBMSUNJVCxcbiAgICAgICAgICAgIGNvbnRlbnRNZXNzYWdlLFxuICAgICAgICAgICAgbWVzc2FnZUlkOiB1bmRlZmluZWQsXG4gICAgICAgICAgICBvbmxpbmU6IHRydWUsXG4gICAgICAgICAgICByZWNpcGllbnRzOiBncm91cE1lbWJlcnMsXG4gICAgICAgICAgICBzZW5kT3B0aW9ucyxcbiAgICAgICAgICAgIHNlbmRUYXJnZXQ6IHRoaXMudG9TZW5kZXJLZXlUYXJnZXQoKSxcbiAgICAgICAgICAgIHNlbmRUeXBlOiAndHlwaW5nJyxcbiAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICB7IG1lc3NhZ2VJZHM6IFtdLCBzZW5kVHlwZTogJ3R5cGluZycgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgb25OZXdNZXNzYWdlKG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHV1aWQgPSBtZXNzYWdlLmdldCgnc291cmNlVXVpZCcpO1xuICAgIGNvbnN0IGUxNjQgPSBtZXNzYWdlLmdldCgnc291cmNlJyk7XG4gICAgY29uc3Qgc291cmNlRGV2aWNlID0gbWVzc2FnZS5nZXQoJ3NvdXJjZURldmljZScpO1xuXG4gICAgY29uc3Qgc291cmNlSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIHV1aWQsXG4gICAgICBlMTY0LFxuICAgIH0pO1xuICAgIGNvbnN0IHR5cGluZ1Rva2VuID0gYCR7c291cmNlSWR9LiR7c291cmNlRGV2aWNlfWA7XG5cbiAgICAvLyBDbGVhciB0eXBpbmcgaW5kaWNhdG9yIGZvciBhIGdpdmVuIGNvbnRhY3QgaWYgd2UgcmVjZWl2ZSBhIG1lc3NhZ2UgZnJvbSB0aGVtXG4gICAgdGhpcy5jbGVhckNvbnRhY3RUeXBpbmdUaW1lcih0eXBpbmdUb2tlbik7XG5cbiAgICAvLyBJZiBpdCdzIGEgZ3JvdXAgc3RvcnkgcmVwbHkgb3IgYSBzdG9yeSBtZXNzYWdlLCB3ZSBkb24ndCB3YW50IHRvIHVwZGF0ZVxuICAgIC8vIHRoZSBsYXN0IG1lc3NhZ2Ugb3IgYWRkIG5ldyBtZXNzYWdlcyB0byByZWR1eC5cbiAgICBjb25zdCBpc0dyb3VwU3RvcnlSZXBseSA9XG4gICAgICBpc0dyb3VwKHRoaXMuYXR0cmlidXRlcykgJiYgbWVzc2FnZS5nZXQoJ3N0b3J5SWQnKTtcbiAgICBpZiAoaXNHcm91cFN0b3J5UmVwbHkgfHwgaXNTdG9yeShtZXNzYWdlLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy5hZGRTaW5nbGVNZXNzYWdlKG1lc3NhZ2UpO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICB0aGlzLmRlYm91bmNlZFVwZGF0ZUxhc3RNZXNzYWdlISgpO1xuICB9XG5cbiAgLy8gTmV3IG1lc3NhZ2VzIG1pZ2h0IGFycml2ZSB3aGlsZSB3ZSdyZSBpbiB0aGUgbWlkZGxlIG9mIGEgYnVsayBmZXRjaCBmcm9tIHRoZVxuICAvLyAgIGRhdGFiYXNlLiBXZSdsbCB3YWl0IHVudGlsIHRoYXQgaXMgZG9uZSBiZWZvcmUgbW92aW5nIGZvcndhcmQuXG4gIGFzeW5jIGFkZFNpbmdsZU1lc3NhZ2UoXG4gICAgbWVzc2FnZTogTWVzc2FnZU1vZGVsLFxuICAgIHsgaXNKdXN0U2VudCB9OiB7IGlzSnVzdFNlbnQ6IGJvb2xlYW4gfSA9IHsgaXNKdXN0U2VudDogZmFsc2UgfVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLmJlZm9yZUFkZFNpbmdsZU1lc3NhZ2UoKTtcbiAgICB0aGlzLmRvQWRkU2luZ2xlTWVzc2FnZShtZXNzYWdlLCB7IGlzSnVzdFNlbnQgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGJlZm9yZUFkZFNpbmdsZU1lc3NhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLm5ld01lc3NhZ2VRdWV1ZSkge1xuICAgICAgdGhpcy5uZXdNZXNzYWdlUXVldWUgPSBuZXcgd2luZG93LlBRdWV1ZSh7XG4gICAgICAgIGNvbmN1cnJlbmN5OiAxLFxuICAgICAgICB0aW1lb3V0OiAxMDAwICogNjAgKiAyLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgLy8gV2UgdXNlIGEgcXVldWUgaGVyZSB0byBlbnN1cmUgbWVzc2FnZXMgYXJlIGFkZGVkIHRvIHRoZSBVSSBpbiB0aGUgb3JkZXIgcmVjZWl2ZWRcbiAgICBhd2FpdCB0aGlzLm5ld01lc3NhZ2VRdWV1ZS5hZGQoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgdGhpcy5pblByb2dyZXNzRmV0Y2g7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGRvQWRkU2luZ2xlTWVzc2FnZShcbiAgICBtZXNzYWdlOiBNZXNzYWdlTW9kZWwsXG4gICAgeyBpc0p1c3RTZW50IH06IHsgaXNKdXN0U2VudDogYm9vbGVhbiB9XG4gICk6IHZvaWQge1xuICAgIGNvbnN0IHsgbWVzc2FnZXNBZGRlZCB9ID0gd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zO1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9ucyB9ID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCB7IG1lc3NhZ2VzQnlDb252ZXJzYXRpb24gfSA9IGNvbnZlcnNhdGlvbnM7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHRoaXMuaWQ7XG4gICAgY29uc3QgZXhpc3RpbmdDb252ZXJzYXRpb24gPSBtZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXTtcbiAgICBjb25zdCBuZXdlc3RJZCA9IGV4aXN0aW5nQ29udmVyc2F0aW9uPy5tZXRyaWNzPy5uZXdlc3Q/LmlkO1xuICAgIGNvbnN0IG1lc3NhZ2VJZHMgPSBleGlzdGluZ0NvbnZlcnNhdGlvbj8ubWVzc2FnZUlkcztcblxuICAgIGNvbnN0IGlzTGF0ZXN0SW5NZW1vcnkgPVxuICAgICAgbmV3ZXN0SWQgJiYgbWVzc2FnZUlkcyAmJiBtZXNzYWdlSWRzW21lc3NhZ2VJZHMubGVuZ3RoIC0gMV0gPT09IG5ld2VzdElkO1xuXG4gICAgaWYgKGlzSnVzdFNlbnQgJiYgZXhpc3RpbmdDb252ZXJzYXRpb24gJiYgIWlzTGF0ZXN0SW5NZW1vcnkpIHtcbiAgICAgIHRoaXMubG9hZE5ld2VzdE1lc3NhZ2VzKHVuZGVmaW5lZCwgdW5kZWZpbmVkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbWVzc2FnZXNBZGRlZCh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBtZXNzYWdlczogW3sgLi4ubWVzc2FnZS5hdHRyaWJ1dGVzIH1dLFxuICAgICAgICBpc0FjdGl2ZTogd2luZG93LmlzQWN0aXZlKCksXG4gICAgICAgIGlzSnVzdFNlbnQsXG4gICAgICAgIGlzTmV3TWVzc2FnZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHNldEluUHJvZ3Jlc3NGZXRjaCgpOiAoKSA9PiB1bmtub3duIHtcbiAgICBsZXQgcmVzb2x2ZVByb21pc2U6ICh2YWx1ZT86IHVua25vd24pID0+IHZvaWQ7XG4gICAgdGhpcy5pblByb2dyZXNzRmV0Y2ggPSBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICAgIHJlc29sdmVQcm9taXNlID0gcmVzb2x2ZTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGZpbmlzaCA9ICgpID0+IHtcbiAgICAgIHJlc29sdmVQcm9taXNlKCk7XG4gICAgICB0aGlzLmluUHJvZ3Jlc3NGZXRjaCA9IHVuZGVmaW5lZDtcbiAgICB9O1xuXG4gICAgcmV0dXJuIGZpbmlzaDtcbiAgfVxuXG4gIGFzeW5jIGxvYWROZXdlc3RNZXNzYWdlcyhcbiAgICBuZXdlc3RNZXNzYWdlSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICBzZXRGb2N1czogYm9vbGVhbiB8IHVuZGVmaW5lZFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2VzUmVzZXQsIHNldE1lc3NhZ2VMb2FkaW5nU3RhdGUgfSA9XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnM7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLmlkO1xuXG4gICAgc2V0TWVzc2FnZUxvYWRpbmdTdGF0ZShcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLkRvaW5nSW5pdGlhbExvYWRcbiAgICApO1xuICAgIGNvbnN0IGZpbmlzaCA9IHRoaXMuc2V0SW5Qcm9ncmVzc0ZldGNoKCk7XG5cbiAgICB0cnkge1xuICAgICAgbGV0IHNjcm9sbFRvTGF0ZXN0VW5yZWFkID0gdHJ1ZTtcblxuICAgICAgaWYgKG5ld2VzdE1lc3NhZ2VJZCkge1xuICAgICAgICBjb25zdCBuZXdlc3RJbk1lbW9yeU1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChuZXdlc3RNZXNzYWdlSWQpO1xuICAgICAgICBpZiAobmV3ZXN0SW5NZW1vcnlNZXNzYWdlKSB7XG4gICAgICAgICAgLy8gSWYgbmV3ZXN0IGluLW1lbW9yeSBtZXNzYWdlIGlzIHVucmVhZCwgc2Nyb2xsaW5nIGRvd24gd291bGQgbWVhbiBnb2luZyB0b1xuICAgICAgICAgIC8vICAgdGhlIHZlcnkgYm90dG9tLCBub3QgdGhlIG9sZGVzdCB1bnJlYWQuXG4gICAgICAgICAgaWYgKGlzTWVzc2FnZVVucmVhZChuZXdlc3RJbk1lbW9yeU1lc3NhZ2UpKSB7XG4gICAgICAgICAgICBzY3JvbGxUb0xhdGVzdFVucmVhZCA9IGZhbHNlO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBsb2FkTmV3ZXN0TWVzc2FnZXM6IGRpZCBub3QgZmluZCBtZXNzYWdlICR7bmV3ZXN0TWVzc2FnZUlkfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IG1ldHJpY3MgPSBhd2FpdCBnZXRNZXNzYWdlTWV0cmljc0ZvckNvbnZlcnNhdGlvbihcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHVuZGVmaW5lZCxcbiAgICAgICAgaXNHcm91cCh0aGlzLmF0dHJpYnV0ZXMpXG4gICAgICApO1xuXG4gICAgICAvLyBJZiB0aGlzIGlzIGEgbWVzc2FnZSByZXF1ZXN0IHRoYXQgaGFzIG5vdCB5ZXQgYmVlbiBhY2NlcHRlZCwgd2UgYWx3YXlzIHNob3cgdGhlXG4gICAgICAvLyAgIG9sZGVzdCBtZXNzYWdlcywgdG8gZW5zdXJlIHRoYXQgdGhlIENvbnZlcnNhdGlvbkhlcm8gaXMgc2hvd24uIFdlIGRvbid0IHdhbnQgdG9cbiAgICAgIC8vICAgc2Nyb2xsIGRpcmVjdGx5IHRvIHRoZSBvbGRlc3QgbWVzc2FnZSwgYmVjYXVzZSB0aGF0IGNvdWxkIHNjcm9sbCB0aGUgaGVybyBvZmZcbiAgICAgIC8vICAgdGhlIHNjcmVlbi5cbiAgICAgIGlmICghbmV3ZXN0TWVzc2FnZUlkICYmICF0aGlzLmdldEFjY2VwdGVkKCkgJiYgbWV0cmljcy5vbGRlc3QpIHtcbiAgICAgICAgdGhpcy5sb2FkQW5kU2Nyb2xsKG1ldHJpY3Mub2xkZXN0LmlkLCB7IGRpc2FibGVTY3JvbGw6IHRydWUgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHNjcm9sbFRvTGF0ZXN0VW5yZWFkICYmIG1ldHJpY3Mub2xkZXN0VW5zZWVuKSB7XG4gICAgICAgIHRoaXMubG9hZEFuZFNjcm9sbChtZXRyaWNzLm9sZGVzdFVuc2Vlbi5pZCwge1xuICAgICAgICAgIGRpc2FibGVTY3JvbGw6ICFzZXRGb2N1cyxcbiAgICAgICAgfSk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cDogaXNHcm91cCh0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgICBsaW1pdDogTUVTU0FHRV9MT0FEX0NIVU5LX1NJWkUsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBjbGVhbmVkOiBBcnJheTxNZXNzYWdlTW9kZWw+ID0gYXdhaXQgdGhpcy5jbGVhbk1vZGVscyhtZXNzYWdlcyk7XG4gICAgICBjb25zdCBzY3JvbGxUb01lc3NhZ2VJZCA9XG4gICAgICAgIHNldEZvY3VzICYmIG1ldHJpY3MubmV3ZXN0ID8gbWV0cmljcy5uZXdlc3QuaWQgOiB1bmRlZmluZWQ7XG5cbiAgICAgIC8vIEJlY2F1c2Ugb3VyIGBnZXRPbGRlck1lc3NhZ2VzYCBmZXRjaCBhYm92ZSBkaWRuJ3Qgc3BlY2lmeSBhIHJlY2VpdmVkQXQsIHdlIGdvdFxuICAgICAgLy8gICB0aGUgbW9zdCByZWNlbnQgTiBtZXNzYWdlcyBpbiB0aGUgY29udmVyc2F0aW9uLiBJZiBpdCBoYXMgYSBjb25mbGljdCB3aXRoXG4gICAgICAvLyAgIG1ldHJpY3MsIGZldGNoZWQgYSBiaXQgYmVmb3JlLCB0aGF0J3MgbGlrZWx5IGEgcmFjZSBjb25kaXRpb24uIFNvIHdlIHRlbGwgb3VyXG4gICAgICAvLyAgIHJlZHVjZXIgdG8gdHJ1c3QgdGhlIG1lc3NhZ2Ugc2V0IHdlIGp1c3QgZmV0Y2hlZCBmb3IgZGV0ZXJtaW5pbmcgaWYgd2UgaGF2ZVxuICAgICAgLy8gICB0aGUgbmV3ZXN0IG1lc3NhZ2UgbG9hZGVkLlxuICAgICAgY29uc3QgdW5ib3VuZGVkRmV0Y2ggPSB0cnVlO1xuICAgICAgbWVzc2FnZXNSZXNldCh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBtZXNzYWdlczogY2xlYW5lZC5tYXAoKG1lc3NhZ2VNb2RlbDogTWVzc2FnZU1vZGVsKSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2VNb2RlbC5hdHRyaWJ1dGVzLFxuICAgICAgICB9KSksXG4gICAgICAgIG1ldHJpY3MsXG4gICAgICAgIHNjcm9sbFRvTWVzc2FnZUlkLFxuICAgICAgICB1bmJvdW5kZWRGZXRjaCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRNZXNzYWdlTG9hZGluZ1N0YXRlKGNvbnZlcnNhdGlvbklkLCB1bmRlZmluZWQpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGZpbmlzaCgpO1xuICAgIH1cbiAgfVxuICBhc3luYyBsb2FkT2xkZXJNZXNzYWdlcyhvbGRlc3RNZXNzYWdlSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbWVzc2FnZXNBZGRlZCwgc2V0TWVzc2FnZUxvYWRpbmdTdGF0ZSwgcmVwYWlyT2xkZXN0TWVzc2FnZSB9ID1cbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucztcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHRoaXMuaWQ7XG5cbiAgICBzZXRNZXNzYWdlTG9hZGluZ1N0YXRlKFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUuTG9hZGluZ09sZGVyTWVzc2FnZXNcbiAgICApO1xuICAgIGNvbnN0IGZpbmlzaCA9IHRoaXMuc2V0SW5Qcm9ncmVzc0ZldGNoKCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG9sZGVzdE1lc3NhZ2VJZCk7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBsb2FkT2xkZXJNZXNzYWdlczogZmFpbGVkIHRvIGxvYWQgbWVzc2FnZSAke29sZGVzdE1lc3NhZ2VJZH1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY2VpdmVkQXQgPSBtZXNzYWdlLnJlY2VpdmVkX2F0O1xuICAgICAgY29uc3Qgc2VudEF0ID0gbWVzc2FnZS5zZW50X2F0O1xuICAgICAgY29uc3QgbW9kZWxzID0gYXdhaXQgZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgICAgIGlzR3JvdXA6IGlzR3JvdXAodGhpcy5hdHRyaWJ1dGVzKSxcbiAgICAgICAgbGltaXQ6IE1FU1NBR0VfTE9BRF9DSFVOS19TSVpFLFxuICAgICAgICBtZXNzYWdlSWQ6IG9sZGVzdE1lc3NhZ2VJZCxcbiAgICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgICAgc2VudEF0LFxuICAgICAgICBzdG9yeUlkOiB1bmRlZmluZWQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKG1vZGVscy5sZW5ndGggPCAxKSB7XG4gICAgICAgIGxvZy53YXJuKCdsb2FkT2xkZXJNZXNzYWdlczogcmVxdWVzdGVkLCBidXQgbG9hZGVkIG5vIG1lc3NhZ2VzJyk7XG4gICAgICAgIHJlcGFpck9sZGVzdE1lc3NhZ2UoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsZWFuZWQgPSBhd2FpdCB0aGlzLmNsZWFuTW9kZWxzKG1vZGVscyk7XG5cbiAgICAgIG1lc3NhZ2VzQWRkZWQoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgbWVzc2FnZXM6IGNsZWFuZWQubWFwKChtZXNzYWdlTW9kZWw6IE1lc3NhZ2VNb2RlbCkgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlTW9kZWwuYXR0cmlidXRlcyxcbiAgICAgICAgfSkpLFxuICAgICAgICBpc0FjdGl2ZTogd2luZG93LmlzQWN0aXZlKCksXG4gICAgICAgIGlzSnVzdFNlbnQ6IGZhbHNlLFxuICAgICAgICBpc05ld01lc3NhZ2U6IGZhbHNlLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIHNldE1lc3NhZ2VMb2FkaW5nU3RhdGUoY29udmVyc2F0aW9uSWQsIHVuZGVmaW5lZCk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9IGZpbmFsbHkge1xuICAgICAgZmluaXNoKCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgbG9hZE5ld2VyTWVzc2FnZXMobmV3ZXN0TWVzc2FnZUlkOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2VzQWRkZWQsIHNldE1lc3NhZ2VMb2FkaW5nU3RhdGUsIHJlcGFpck5ld2VzdE1lc3NhZ2UgfSA9XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnM7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLmlkO1xuXG4gICAgc2V0TWVzc2FnZUxvYWRpbmdTdGF0ZShcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLkxvYWRpbmdOZXdlck1lc3NhZ2VzXG4gICAgKTtcbiAgICBjb25zdCBmaW5pc2ggPSB0aGlzLnNldEluUHJvZ3Jlc3NGZXRjaCgpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChuZXdlc3RNZXNzYWdlSWQpO1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgbG9hZE5ld2VyTWVzc2FnZXM6IGZhaWxlZCB0byBsb2FkIG1lc3NhZ2UgJHtuZXdlc3RNZXNzYWdlSWR9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNlaXZlZEF0ID0gbWVzc2FnZS5yZWNlaXZlZF9hdDtcbiAgICAgIGNvbnN0IHNlbnRBdCA9IG1lc3NhZ2Uuc2VudF9hdDtcbiAgICAgIGNvbnN0IG1vZGVscyA9IGF3YWl0IGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiBpc0dyb3VwKHRoaXMuYXR0cmlidXRlcyksXG4gICAgICAgIGxpbWl0OiBNRVNTQUdFX0xPQURfQ0hVTktfU0laRSxcbiAgICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgICAgc2VudEF0LFxuICAgICAgICBzdG9yeUlkOiB1bmRlZmluZWQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKG1vZGVscy5sZW5ndGggPCAxKSB7XG4gICAgICAgIGxvZy53YXJuKCdsb2FkTmV3ZXJNZXNzYWdlczogcmVxdWVzdGVkLCBidXQgbG9hZGVkIG5vIG1lc3NhZ2VzJyk7XG4gICAgICAgIHJlcGFpck5ld2VzdE1lc3NhZ2UoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNsZWFuZWQgPSBhd2FpdCB0aGlzLmNsZWFuTW9kZWxzKG1vZGVscyk7XG4gICAgICBtZXNzYWdlc0FkZGVkKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG1lc3NhZ2VzOiBjbGVhbmVkLm1hcCgobWVzc2FnZU1vZGVsOiBNZXNzYWdlTW9kZWwpID0+ICh7XG4gICAgICAgICAgLi4ubWVzc2FnZU1vZGVsLmF0dHJpYnV0ZXMsXG4gICAgICAgIH0pKSxcbiAgICAgICAgaXNBY3RpdmU6IHdpbmRvdy5pc0FjdGl2ZSgpLFxuICAgICAgICBpc0p1c3RTZW50OiBmYWxzZSxcbiAgICAgICAgaXNOZXdNZXNzYWdlOiBmYWxzZSxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRNZXNzYWdlTG9hZGluZ1N0YXRlKGNvbnZlcnNhdGlvbklkLCB1bmRlZmluZWQpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGxvYWRBbmRTY3JvbGwoXG4gICAgbWVzc2FnZUlkOiBzdHJpbmcsXG4gICAgb3B0aW9ucz86IHsgZGlzYWJsZVNjcm9sbD86IGJvb2xlYW4gfVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2VzUmVzZXQsIHNldE1lc3NhZ2VMb2FkaW5nU3RhdGUgfSA9XG4gICAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnM7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLmlkO1xuXG4gICAgc2V0TWVzc2FnZUxvYWRpbmdTdGF0ZShcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLkRvaW5nSW5pdGlhbExvYWRcbiAgICApO1xuICAgIGNvbnN0IGZpbmlzaCA9IHRoaXMuc2V0SW5Qcm9ncmVzc0ZldGNoKCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gICAgICBpZiAoIW1lc3NhZ2UpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBsb2FkTW9yZUFuZFNjcm9sbDogZmFpbGVkIHRvIGxvYWQgbWVzc2FnZSAke21lc3NhZ2VJZH1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY2VpdmVkQXQgPSBtZXNzYWdlLnJlY2VpdmVkX2F0O1xuICAgICAgY29uc3Qgc2VudEF0ID0gbWVzc2FnZS5zZW50X2F0O1xuICAgICAgY29uc3QgeyBvbGRlciwgbmV3ZXIsIG1ldHJpY3MgfSA9XG4gICAgICAgIGF3YWl0IGdldENvbnZlcnNhdGlvblJhbmdlQ2VudGVyZWRPbk1lc3NhZ2Uoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIGlzR3JvdXA6IGlzR3JvdXAodGhpcy5hdHRyaWJ1dGVzKSxcbiAgICAgICAgICBsaW1pdDogTUVTU0FHRV9MT0FEX0NIVU5LX1NJWkUsXG4gICAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICAgIHJlY2VpdmVkQXQsXG4gICAgICAgICAgc2VudEF0LFxuICAgICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfSk7XG4gICAgICBjb25zdCBhbGwgPSBbLi4ub2xkZXIsIG1lc3NhZ2UsIC4uLm5ld2VyXTtcblxuICAgICAgY29uc3QgY2xlYW5lZDogQXJyYXk8TWVzc2FnZU1vZGVsPiA9IGF3YWl0IHRoaXMuY2xlYW5Nb2RlbHMoYWxsKTtcbiAgICAgIGNvbnN0IHNjcm9sbFRvTWVzc2FnZUlkID1cbiAgICAgICAgb3B0aW9ucyAmJiBvcHRpb25zLmRpc2FibGVTY3JvbGwgPyB1bmRlZmluZWQgOiBtZXNzYWdlSWQ7XG5cbiAgICAgIG1lc3NhZ2VzUmVzZXQoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgbWVzc2FnZXM6IGNsZWFuZWQubWFwKChtZXNzYWdlTW9kZWw6IE1lc3NhZ2VNb2RlbCkgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlTW9kZWwuYXR0cmlidXRlcyxcbiAgICAgICAgfSkpLFxuICAgICAgICBtZXRyaWNzLFxuICAgICAgICBzY3JvbGxUb01lc3NhZ2VJZCxcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBzZXRNZXNzYWdlTG9hZGluZ1N0YXRlKGNvbnZlcnNhdGlvbklkLCB1bmRlZmluZWQpO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGZpbmlzaCgpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGNsZWFuTW9kZWxzKFxuICAgIG1lc3NhZ2VzOiBSZWFkb25seUFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT5cbiAgKTogUHJvbWlzZTxBcnJheTxNZXNzYWdlTW9kZWw+PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gbWVzc2FnZXNcbiAgICAgIC5maWx0ZXIobWVzc2FnZSA9PiBCb29sZWFuKG1lc3NhZ2UuaWQpKVxuICAgICAgLm1hcChtZXNzYWdlID0+IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihtZXNzYWdlLmlkLCBtZXNzYWdlKSk7XG5cbiAgICBjb25zdCBlbGltaW5hdGVkID0gbWVzc2FnZXMubGVuZ3RoIC0gcmVzdWx0Lmxlbmd0aDtcbiAgICBpZiAoZWxpbWluYXRlZCA+IDApIHtcbiAgICAgIGxvZy53YXJuKGBjbGVhbk1vZGVsczogRWxpbWluYXRlZCAke2VsaW1pbmF0ZWR9IG1lc3NhZ2VzIHdpdGhvdXQgYW4gaWRgKTtcbiAgICB9XG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgICBsZXQgdXBncmFkZWQgPSAwO1xuICAgIGZvciAobGV0IG1heCA9IHJlc3VsdC5sZW5ndGgsIGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSByZXN1bHRbaV07XG4gICAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IG1lc3NhZ2U7XG4gICAgICBjb25zdCB7IHNjaGVtYVZlcnNpb24gfSA9IGF0dHJpYnV0ZXM7XG5cbiAgICAgIGlmIChzY2hlbWFWZXJzaW9uIDwgTWVzc2FnZS5WRVJTSU9OX05FRURFRF9GT1JfRElTUExBWSkge1xuICAgICAgICAvLyBZZXAsIHdlIHJlYWxseSBkbyB3YW50IHRvIHdhaXQgZm9yIGVhY2ggb2YgdGhlc2VcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgICAgY29uc3QgdXBncmFkZWRNZXNzYWdlID0gYXdhaXQgdXBncmFkZU1lc3NhZ2VTY2hlbWEoYXR0cmlidXRlcyk7XG4gICAgICAgIG1lc3NhZ2Uuc2V0KHVwZ3JhZGVkTWVzc2FnZSk7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZSh1cGdyYWRlZE1lc3NhZ2UsIHsgb3VyVXVpZCB9KTtcbiAgICAgICAgdXBncmFkZWQgKz0gMTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHVwZ3JhZGVkID4gMCkge1xuICAgICAgbG9nLndhcm4oYGNsZWFuTW9kZWxzOiBVcGdyYWRlZCBzY2hlbWEgb2YgJHt1cGdyYWRlZH0gbWVzc2FnZXNgKTtcbiAgICB9XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChyZXN1bHQubWFwKG1vZGVsID0+IG1vZGVsLmh5ZHJhdGVTdG9yeUNvbnRleHQoKSkpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIGZvcm1hdCgpOiBDb252ZXJzYXRpb25UeXBlIHtcbiAgICBpZiAodGhpcy5jYWNoZWRQcm9wcykge1xuICAgICAgcmV0dXJuIHRoaXMuY2FjaGVkUHJvcHM7XG4gICAgfVxuXG4gICAgY29uc3Qgb2xkRm9ybWF0ID0gdGhpcy5mb3JtYXQ7XG4gICAgLy8gV2UgZG9uJ3Qgd2FudCB0byBjcmFzaCBvciBoYXZlIGFuIGluZmluaXRlIGxvb3AgaWYgd2UgbG9vcCBiYWNrIGludG8gdGhpcyBmdW5jdGlvblxuICAgIC8vICAgYWdhaW4uIFdlJ2xsIGxvZyBhIHdhcm5pbmcgYW5kIHJldHVybmVkIG9sZCBjYWNoZWQgcHJvcHMgb3IgdGhyb3cgYW4gZXJyb3IuXG4gICAgdGhpcy5mb3JtYXQgPSAoKSA9PiB7XG4gICAgICBpZiAoIXRoaXMub2xkQ2FjaGVkUHJvcHMpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBDb252ZXJzYXRpb24uZm9ybWF0KCkvJHt0aGlzLmlkRm9yTG9nZ2luZygpfSByZWVudHJhbnQgY2FsbCwgbm8gb2xkIGNhY2hlZCBwcm9wcyFgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc3RhY2sgfSA9IG5ldyBFcnJvcignZm9yIHN0YWNrJyk7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYENvbnZlcnNhdGlvbi5mb3JtYXQoKS8ke3RoaXMuaWRGb3JMb2dnaW5nKCl9IHJlZW50cmFudCBjYWxsISAke3N0YWNrfWBcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB0aGlzLm9sZENhY2hlZFByb3BzO1xuICAgIH07XG5cbiAgICB0cnkge1xuICAgICAgdGhpcy5jYWNoZWRQcm9wcyA9IHRoaXMuZ2V0UHJvcHMoKTtcbiAgICAgIHJldHVybiB0aGlzLmNhY2hlZFByb3BzO1xuICAgIH0gZmluYWxseSB7XG4gICAgICB0aGlzLmZvcm1hdCA9IG9sZEZvcm1hdDtcbiAgICB9XG4gIH1cblxuICAvLyBOb3RlOiB0aGlzIHNob3VsZCBuZXZlciBiZSBjYWxsZWQgZGlyZWN0bHkuIFVzZSBjb252ZXJzYXRpb24uZm9ybWF0KCkgaW5zdGVhZCwgd2hpY2hcbiAgLy8gICBtYWludGFpbnMgYSBjYWNoZSwgYW5kIHByb3RlY3RzIGFnYWluc3QgcmVlbnRyYW50IGNhbGxzLlxuICAvLyBOb3RlOiBXaGVuIHdyaXRpbmcgY29kZSBpbnNpZGUgdGhpcyBmdW5jdGlvbiwgZG8gbm90IGNhbGwgLmZvcm1hdCgpIG9uIGEgY29udmVyc2F0aW9uXG4gIC8vICAgdW5sZXNzIHlvdSBhcmUgc3VyZSB0aGF0IGl0J3Mgbm90IHRoaXMgdmVyeSBzYW1lIGNvbnZlcnNhdGlvbi5cbiAgLy8gTm90ZTogSWYgeW91IHN0YXJ0IHJlbHlpbmcgb24gYW4gYXR0cmlidXRlIHRoYXQgaXMgaW5cbiAgLy8gICBgQVRUUklCVVRFU19USEFUX0RPTlRfSU5WQUxJREFURV9QUk9QU19DQUNIRWAsIHJlbW92ZSBpdCBmcm9tIHRoYXQgbGlzdC5cbiAgcHJpdmF0ZSBnZXRQcm9wcygpOiBDb252ZXJzYXRpb25UeXBlIHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IGNvbG9yID0gdGhpcy5nZXRDb2xvcigpITtcblxuICAgIGxldCBsYXN0TWVzc2FnZTpcbiAgICAgIHwgdW5kZWZpbmVkXG4gICAgICB8IHtcbiAgICAgICAgICBzdGF0dXM/OiBMYXN0TWVzc2FnZVN0YXR1cztcbiAgICAgICAgICB0ZXh0OiBzdHJpbmc7XG4gICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfCB7IGRlbGV0ZWRGb3JFdmVyeW9uZTogdHJ1ZSB9O1xuXG4gICAgaWYgKHRoaXMuZ2V0KCdsYXN0TWVzc2FnZURlbGV0ZWRGb3JFdmVyeW9uZScpKSB7XG4gICAgICBsYXN0TWVzc2FnZSA9IHsgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlIH07XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbnN0IGxhc3RNZXNzYWdlVGV4dCA9IHRoaXMuZ2V0KCdsYXN0TWVzc2FnZScpO1xuICAgICAgaWYgKGxhc3RNZXNzYWdlVGV4dCkge1xuICAgICAgICBsYXN0TWVzc2FnZSA9IHtcbiAgICAgICAgICBzdGF0dXM6IGRyb3BOdWxsKHRoaXMuZ2V0KCdsYXN0TWVzc2FnZVN0YXR1cycpKSxcbiAgICAgICAgICB0ZXh0OiBsYXN0TWVzc2FnZVRleHQsXG4gICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiBmYWxzZSxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCB0eXBpbmdWYWx1ZXMgPSB3aW5kb3cuXy52YWx1ZXModGhpcy5jb250YWN0VHlwaW5nVGltZXJzIHx8IHt9KTtcbiAgICBjb25zdCB0eXBpbmdNb3N0UmVjZW50ID0gd2luZG93Ll8uZmlyc3QoXG4gICAgICB3aW5kb3cuXy5zb3J0QnkodHlwaW5nVmFsdWVzLCAndGltZXN0YW1wJylcbiAgICApO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldCgndGltZXN0YW1wJykhO1xuICAgIGNvbnN0IGRyYWZ0VGltZXN0YW1wID0gdGhpcy5nZXQoJ2RyYWZ0VGltZXN0YW1wJyk7XG4gICAgY29uc3QgZHJhZnRQcmV2aWV3ID0gdGhpcy5nZXREcmFmdFByZXZpZXcoKTtcbiAgICBjb25zdCBkcmFmdFRleHQgPSB0aGlzLmdldCgnZHJhZnQnKTtcbiAgICBjb25zdCBkcmFmdEJvZHlSYW5nZXMgPSB0aGlzLmdldCgnZHJhZnRCb2R5UmFuZ2VzJyk7XG4gICAgY29uc3Qgc2hvdWxkU2hvd0RyYWZ0ID0gKHRoaXMuaGFzRHJhZnQoKSAmJlxuICAgICAgZHJhZnRUaW1lc3RhbXAgJiZcbiAgICAgIGRyYWZ0VGltZXN0YW1wID49IHRpbWVzdGFtcCkgYXMgYm9vbGVhbjtcbiAgICBjb25zdCBpbmJveFBvc2l0aW9uID0gdGhpcy5nZXQoJ2luYm94X3Bvc2l0aW9uJyk7XG4gICAgY29uc3QgbWVzc2FnZVJlcXVlc3RzRW5hYmxlZCA9IHdpbmRvdy5TaWduYWwuUmVtb3RlQ29uZmlnLmlzRW5hYmxlZChcbiAgICAgICdkZXNrdG9wLm1lc3NhZ2VSZXF1ZXN0cydcbiAgICApO1xuICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbklkID1cbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkKCk7XG5cbiAgICBsZXQgZ3JvdXBWZXJzaW9uOiB1bmRlZmluZWQgfCAxIHwgMjtcbiAgICBpZiAoaXNHcm91cFYxKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIGdyb3VwVmVyc2lvbiA9IDE7XG4gICAgfSBlbHNlIGlmIChpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgZ3JvdXBWZXJzaW9uID0gMjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3J0ZWRHcm91cE1lbWJlcnMgPSBpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgPyB0aGlzLmdldE1lbWJlcnMoKVxuICAgICAgICAgIC5zb3J0KChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAgIHNvcnRDb252ZXJzYXRpb25UaXRsZXMobGVmdCwgcmlnaHQsIHRoaXMuaW50bENvbGxhdG9yKVxuICAgICAgICAgIClcbiAgICAgICAgICAubWFwKG1lbWJlciA9PiBtZW1iZXIuZm9ybWF0KCkpXG4gICAgICAgICAgLmZpbHRlcihpc05vdE5pbClcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgY29uc3QgeyBjdXN0b21Db2xvciwgY3VzdG9tQ29sb3JJZCB9ID0gdGhpcy5nZXRDdXN0b21Db2xvckRhdGEoKTtcblxuICAgIC8vIFRPRE86IERFU0tUT1AtNzIwXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiB0aGlzLmlkLFxuICAgICAgdXVpZDogdGhpcy5nZXQoJ3V1aWQnKSxcbiAgICAgIGUxNjQ6IHRoaXMuZ2V0KCdlMTY0JyksXG5cbiAgICAgIC8vIFdlIGhhZCBwcmV2aW91c2x5IHN0b3JlZCBgbnVsbGAgaW5zdGVhZCBvZiBgdW5kZWZpbmVkYCBpbiBzb21lIGNhc2VzLiBXZSBzaG91bGRcbiAgICAgIC8vICAgYmUgYWJsZSB0byByZW1vdmUgdGhpcyBgZHJvcE51bGxgIG9uY2UgdXNlcm5hbWVzIGhhdmUgZ29uZSB0byBwcm9kdWN0aW9uLlxuICAgICAgdXNlcm5hbWU6IGRyb3BOdWxsKHRoaXMuZ2V0KCd1c2VybmFtZScpKSxcblxuICAgICAgYWJvdXQ6IHRoaXMuZ2V0QWJvdXRUZXh0KCksXG4gICAgICBhYm91dFRleHQ6IHRoaXMuZ2V0KCdhYm91dCcpLFxuICAgICAgYWJvdXRFbW9qaTogdGhpcy5nZXQoJ2Fib3V0RW1vamknKSxcbiAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRoaXMuZ2V0QWNjZXB0ZWQoKSxcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBhY3RpdmVBdDogdGhpcy5nZXQoJ2FjdGl2ZV9hdCcpISxcbiAgICAgIGFyZVdlUGVuZGluZzogQm9vbGVhbihcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQgJiYgdGhpcy5pc01lbWJlclBlbmRpbmcob3VyQ29udmVyc2F0aW9uSWQpXG4gICAgICApLFxuICAgICAgYXJlV2VQZW5kaW5nQXBwcm92YWw6IEJvb2xlYW4oXG4gICAgICAgIG91ckNvbnZlcnNhdGlvbklkICYmIHRoaXMuaXNNZW1iZXJBd2FpdGluZ0FwcHJvdmFsKG91ckNvbnZlcnNhdGlvbklkKVxuICAgICAgKSxcbiAgICAgIGFyZVdlQWRtaW46IHRoaXMuYXJlV2VBZG1pbigpLFxuICAgICAgYXZhdGFyczogZ2V0QXZhdGFyRGF0YSh0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgYmFkZ2VzOiB0aGlzLmdldCgnYmFkZ2VzJykgfHwgW10sXG4gICAgICBjYW5DaGFuZ2VUaW1lcjogdGhpcy5jYW5DaGFuZ2VUaW1lcigpLFxuICAgICAgY2FuRWRpdEdyb3VwSW5mbzogdGhpcy5jYW5FZGl0R3JvdXBJbmZvKCksXG4gICAgICBhdmF0YXJQYXRoOiB0aGlzLmdldEFic29sdXRlQXZhdGFyUGF0aCgpLFxuICAgICAgYXZhdGFySGFzaDogdGhpcy5nZXRBdmF0YXJIYXNoKCksXG4gICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoOiB0aGlzLmdldEFic29sdXRlVW5ibHVycmVkQXZhdGFyUGF0aCgpLFxuICAgICAgcHJvZmlsZUF2YXRhclBhdGg6IHRoaXMuZ2V0QWJzb2x1dGVQcm9maWxlQXZhdGFyUGF0aCgpLFxuICAgICAgY29sb3IsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogdGhpcy5nZXRDb252ZXJzYXRpb25Db2xvcigpLFxuICAgICAgY3VzdG9tQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcklkLFxuICAgICAgZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0OiB0aGlzLmdldCgnZGlzY292ZXJlZFVucmVnaXN0ZXJlZEF0JyksXG4gICAgICBkcmFmdEJvZHlSYW5nZXMsXG4gICAgICBkcmFmdFByZXZpZXcsXG4gICAgICBkcmFmdFRleHQsXG4gICAgICBmYW1pbHlOYW1lOiB0aGlzLmdldCgncHJvZmlsZUZhbWlseU5hbWUnKSxcbiAgICAgIGZpcnN0TmFtZTogdGhpcy5nZXQoJ3Byb2ZpbGVOYW1lJyksXG4gICAgICBncm91cERlc2NyaXB0aW9uOiB0aGlzLmdldCgnZGVzY3JpcHRpb24nKSxcbiAgICAgIGdyb3VwVmVyc2lvbixcbiAgICAgIGdyb3VwSWQ6IHRoaXMuZ2V0KCdncm91cElkJyksXG4gICAgICBncm91cExpbms6IHRoaXMuZ2V0R3JvdXBMaW5rKCksXG4gICAgICBoaWRlU3Rvcnk6IEJvb2xlYW4odGhpcy5nZXQoJ2hpZGVTdG9yeScpKSxcbiAgICAgIGluYm94UG9zaXRpb24sXG4gICAgICBpc0FyY2hpdmVkOiB0aGlzLmdldCgnaXNBcmNoaXZlZCcpLFxuICAgICAgaXNCbG9ja2VkOiB0aGlzLmlzQmxvY2tlZCgpLFxuICAgICAgaXNNZTogaXNNZSh0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgaXNHcm91cFYxQW5kRGlzYWJsZWQ6IHRoaXMuaXNHcm91cFYxQW5kRGlzYWJsZWQoKSxcbiAgICAgIGlzUGlubmVkOiB0aGlzLmdldCgnaXNQaW5uZWQnKSxcbiAgICAgIGlzVW50cnVzdGVkOiB0aGlzLmlzVW50cnVzdGVkKCksXG4gICAgICBpc1ZlcmlmaWVkOiB0aGlzLmlzVmVyaWZpZWQoKSxcbiAgICAgIGlzRmV0Y2hpbmdVVUlEOiB0aGlzLmlzRmV0Y2hpbmdVVUlELFxuICAgICAgbGFzdE1lc3NhZ2UsXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgbGFzdFVwZGF0ZWQ6IHRoaXMuZ2V0KCd0aW1lc3RhbXAnKSEsXG4gICAgICBsZWZ0OiBCb29sZWFuKHRoaXMuZ2V0KCdsZWZ0JykpLFxuICAgICAgbWFya2VkVW5yZWFkOiB0aGlzLmdldCgnbWFya2VkVW5yZWFkJyksXG4gICAgICBtZW1iZXJzQ291bnQ6IHRoaXMuZ2V0TWVtYmVyc0NvdW50KCksXG4gICAgICBtZW1iZXJzaGlwczogdGhpcy5nZXRNZW1iZXJzaGlwcygpLFxuICAgICAgbWVzc2FnZUNvdW50OiB0aGlzLmdldCgnbWVzc2FnZUNvdW50JykgfHwgMCxcbiAgICAgIHBlbmRpbmdNZW1iZXJzaGlwczogdGhpcy5nZXRQZW5kaW5nTWVtYmVyc2hpcHMoKSxcbiAgICAgIHBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzOiB0aGlzLmdldFBlbmRpbmdBcHByb3ZhbE1lbWJlcnNoaXBzKCksXG4gICAgICBiYW5uZWRNZW1iZXJzaGlwczogdGhpcy5nZXRCYW5uZWRNZW1iZXJzaGlwcygpLFxuICAgICAgcHJvZmlsZUtleTogdGhpcy5nZXQoJ3Byb2ZpbGVLZXknKSxcbiAgICAgIG1lc3NhZ2VSZXF1ZXN0c0VuYWJsZWQsXG4gICAgICBhY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbms6XG4gICAgICAgIHRoaXMuZ2V0KCdhY2Nlc3NDb250cm9sJyk/LmFkZEZyb21JbnZpdGVMaW5rLFxuICAgICAgYWNjZXNzQ29udHJvbEF0dHJpYnV0ZXM6IHRoaXMuZ2V0KCdhY2Nlc3NDb250cm9sJyk/LmF0dHJpYnV0ZXMsXG4gICAgICBhY2Nlc3NDb250cm9sTWVtYmVyczogdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8ubWVtYmVycyxcbiAgICAgIGFubm91bmNlbWVudHNPbmx5OiBCb29sZWFuKHRoaXMuZ2V0KCdhbm5vdW5jZW1lbnRzT25seScpKSxcbiAgICAgIGFubm91bmNlbWVudHNPbmx5UmVhZHk6IHRoaXMuY2FuQmVBbm5vdW5jZW1lbnRHcm91cCgpLFxuICAgICAgZXhwaXJlVGltZXI6IHRoaXMuZ2V0KCdleHBpcmVUaW1lcicpLFxuICAgICAgbXV0ZUV4cGlyZXNBdDogdGhpcy5nZXQoJ211dGVFeHBpcmVzQXQnKSxcbiAgICAgIGRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQ6IHRoaXMuZ2V0KCdkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkJyksXG4gICAgICBuYW1lOiB0aGlzLmdldCgnbmFtZScpLFxuICAgICAgcGhvbmVOdW1iZXI6IHRoaXMuZ2V0TnVtYmVyKCksXG4gICAgICBwcm9maWxlTmFtZTogdGhpcy5nZXRQcm9maWxlTmFtZSgpLFxuICAgICAgcHJvZmlsZVNoYXJpbmc6IHRoaXMuZ2V0KCdwcm9maWxlU2hhcmluZycpLFxuICAgICAgcHVibGljUGFyYW1zOiB0aGlzLmdldCgncHVibGljUGFyYW1zJyksXG4gICAgICBzZWNyZXRQYXJhbXM6IHRoaXMuZ2V0KCdzZWNyZXRQYXJhbXMnKSxcbiAgICAgIHNob3VsZFNob3dEcmFmdCxcbiAgICAgIHNvcnRlZEdyb3VwTWVtYmVycyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIHRpdGxlOiB0aGlzLmdldFRpdGxlKCksXG4gICAgICB0eXBpbmdDb250YWN0SWQ6IHR5cGluZ01vc3RSZWNlbnQ/LnNlbmRlcklkLFxuICAgICAgc2VhcmNoYWJsZVRpdGxlOiBpc01lKHRoaXMuYXR0cmlidXRlcylcbiAgICAgICAgPyB3aW5kb3cuaTE4bignbm90ZVRvU2VsZicpXG4gICAgICAgIDogdGhpcy5nZXRUaXRsZSgpLFxuICAgICAgdW5yZWFkQ291bnQ6IHRoaXMuZ2V0KCd1bnJlYWRDb3VudCcpIHx8IDAsXG4gICAgICAuLi4oaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgICA/IHtcbiAgICAgICAgICAgIHR5cGU6ICdkaXJlY3QnIGFzIGNvbnN0LFxuICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogdGhpcy5nZXQoJ3NoYXJlZEdyb3VwTmFtZXMnKSB8fCBbXSxcbiAgICAgICAgICB9XG4gICAgICAgIDoge1xuICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyBhcyBjb25zdCxcbiAgICAgICAgICAgIGFja25vd2xlZGdlZEdyb3VwTmFtZUNvbGxpc2lvbnM6XG4gICAgICAgICAgICAgIHRoaXMuZ2V0KCdhY2tub3dsZWRnZWRHcm91cE5hbWVDb2xsaXNpb25zJykgfHwge30sXG4gICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICB9KSxcbiAgICB9O1xuICB9XG5cbiAgdXBkYXRlRTE2NChlMTY0Pzogc3RyaW5nIHwgbnVsbCk6IHZvaWQge1xuICAgIGNvbnN0IG9sZFZhbHVlID0gdGhpcy5nZXQoJ2UxNjQnKTtcbiAgICBpZiAoZTE2NCAmJiBlMTY0ICE9PSBvbGRWYWx1ZSkge1xuICAgICAgdGhpcy5zZXQoJ2UxNjQnLCBlMTY0KTtcblxuICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgIHRoaXMuYWRkQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uKG9sZFZhbHVlLCBlMTY0KTtcbiAgICAgIH1cblxuICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgdGhpcy50cmlnZ2VyKCdpZFVwZGF0ZWQnLCB0aGlzLCAnZTE2NCcsIG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVVdWlkKHV1aWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKHV1aWQgJiYgdXVpZCAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0KCd1dWlkJywgVVVJRC5jYXN0KHV1aWQudG9Mb3dlckNhc2UoKSkpO1xuICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgdGhpcy50cmlnZ2VyKCdpZFVwZGF0ZWQnLCB0aGlzLCAndXVpZCcsIG9sZFZhbHVlKTtcbiAgICB9XG4gIH1cblxuICB1cGRhdGVHcm91cElkKGdyb3VwSWQ/OiBzdHJpbmcpOiB2b2lkIHtcbiAgICBjb25zdCBvbGRWYWx1ZSA9IHRoaXMuZ2V0KCdncm91cElkJyk7XG4gICAgaWYgKGdyb3VwSWQgJiYgZ3JvdXBJZCAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHRoaXMuc2V0KCdncm91cElkJywgZ3JvdXBJZCk7XG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICB0aGlzLnRyaWdnZXIoJ2lkVXBkYXRlZCcsIHRoaXMsICdncm91cElkJywgb2xkVmFsdWUpO1xuICAgIH1cbiAgfVxuXG4gIGluY3JlbWVudE1lc3NhZ2VDb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldCh7XG4gICAgICBtZXNzYWdlQ291bnQ6ICh0aGlzLmdldCgnbWVzc2FnZUNvdW50JykgfHwgMCkgKyAxLFxuICAgIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIGdldE1lbWJlcnNDb3VudCgpOiBudW1iZXIgfCB1bmRlZmluZWQge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlckxpc3QgPSB0aGlzLmdldCgnbWVtYmVyc1YyJykgfHwgdGhpcy5nZXQoJ21lbWJlcnMnKTtcblxuICAgIC8vIFdlJ2xsIGZhaWwgb3ZlciBpZiB0aGUgbWVtYmVyIGxpc3QgaXMgZW1wdHlcbiAgICBpZiAobWVtYmVyTGlzdCAmJiBtZW1iZXJMaXN0Lmxlbmd0aCkge1xuICAgICAgcmV0dXJuIG1lbWJlckxpc3QubGVuZ3RoO1xuICAgIH1cblxuICAgIGNvbnN0IHRlbXBvcmFyeU1lbWJlckNvdW50ID0gdGhpcy5nZXQoJ3RlbXBvcmFyeU1lbWJlckNvdW50Jyk7XG4gICAgaWYgKGlzTnVtYmVyKHRlbXBvcmFyeU1lbWJlckNvdW50KSkge1xuICAgICAgcmV0dXJuIHRlbXBvcmFyeU1lbWJlckNvdW50O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBkZWNyZW1lbnRNZXNzYWdlQ291bnQoKTogdm9pZCB7XG4gICAgdGhpcy5zZXQoe1xuICAgICAgbWVzc2FnZUNvdW50OiBNYXRoLm1heCgodGhpcy5nZXQoJ21lc3NhZ2VDb3VudCcpIHx8IDApIC0gMSwgMCksXG4gICAgfSk7XG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgaW5jcmVtZW50U2VudE1lc3NhZ2VDb3VudCh7IGRyeSA9IGZhbHNlIH06IHsgZHJ5PzogYm9vbGVhbiB9ID0ge30pOlxuICAgIHwgUGFydGlhbDxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZT5cbiAgICB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgdXBkYXRlID0ge1xuICAgICAgbWVzc2FnZUNvdW50OiAodGhpcy5nZXQoJ21lc3NhZ2VDb3VudCcpIHx8IDApICsgMSxcbiAgICAgIHNlbnRNZXNzYWdlQ291bnQ6ICh0aGlzLmdldCgnc2VudE1lc3NhZ2VDb3VudCcpIHx8IDApICsgMSxcbiAgICB9O1xuXG4gICAgaWYgKGRyeSkge1xuICAgICAgcmV0dXJuIHVwZGF0ZTtcbiAgICB9XG4gICAgdGhpcy5zZXQodXBkYXRlKTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgZGVjcmVtZW50U2VudE1lc3NhZ2VDb3VudCgpOiB2b2lkIHtcbiAgICB0aGlzLnNldCh7XG4gICAgICBtZXNzYWdlQ291bnQ6IE1hdGgubWF4KCh0aGlzLmdldCgnbWVzc2FnZUNvdW50JykgfHwgMCkgLSAxLCAwKSxcbiAgICAgIHNlbnRNZXNzYWdlQ291bnQ6IE1hdGgubWF4KCh0aGlzLmdldCgnc2VudE1lc3NhZ2VDb3VudCcpIHx8IDApIC0gMSwgMCksXG4gICAgfSk7XG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgLyoqXG4gICAqIFRoaXMgZnVuY3Rpb24gaXMgY2FsbGVkIHdoZW4gYSBtZXNzYWdlIHJlcXVlc3QgaXMgYWNjZXB0ZWQgaW4gb3JkZXIgdG9cbiAgICogaGFuZGxlIHNlbmRpbmcgcmVhZCByZWNlaXB0cyBhbmQgZG93bmxvYWQgYW55IHBlbmRpbmcgYXR0YWNobWVudHMuXG4gICAqL1xuICBhc3luYyBoYW5kbGVSZWFkQW5kRG93bmxvYWRBdHRhY2htZW50cyhcbiAgICBvcHRpb25zOiB7IGlzTG9jYWxBY3Rpb24/OiBib29sZWFuIH0gPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGlzTG9jYWxBY3Rpb24gfSA9IG9wdGlvbnM7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgICBsZXQgbWVzc2FnZXM6IEFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4gfCB1bmRlZmluZWQ7XG4gICAgZG8ge1xuICAgICAgY29uc3QgZmlyc3QgPSBtZXNzYWdlcyA/IG1lc3NhZ2VzWzBdIDogdW5kZWZpbmVkO1xuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgbWVzc2FnZXMgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKFxuICAgICAgICB0aGlzLmdldCgnaWQnKSxcbiAgICAgICAge1xuICAgICAgICAgIGlzR3JvdXA6IGlzR3JvdXAodGhpcy5hdHRyaWJ1dGVzKSxcbiAgICAgICAgICBsaW1pdDogMTAwLFxuICAgICAgICAgIG1lc3NhZ2VJZDogZmlyc3QgPyBmaXJzdC5pZCA6IHVuZGVmaW5lZCxcbiAgICAgICAgICByZWNlaXZlZEF0OiBmaXJzdCA/IGZpcnN0LnJlY2VpdmVkX2F0IDogdW5kZWZpbmVkLFxuICAgICAgICAgIHNlbnRBdDogZmlyc3QgPyBmaXJzdC5zZW50X2F0IDogdW5kZWZpbmVkLFxuICAgICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgICAgaWYgKCFtZXNzYWdlcy5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWFkTWVzc2FnZXMgPSBtZXNzYWdlcy5maWx0ZXIobSA9PiAhaGFzRXJyb3JzKG0pICYmIGlzSW5jb21pbmcobSkpO1xuXG4gICAgICBpZiAoaXNMb2NhbEFjdGlvbikge1xuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICBhd2FpdCByZWFkUmVjZWlwdHNKb2JRdWV1ZS5hZGRJZkFsbG93ZWRCeVVzZXIoXG4gICAgICAgICAgd2luZG93LnN0b3JhZ2UsXG4gICAgICAgICAgcmVhZE1lc3NhZ2VzLm1hcChtID0+ICh7XG4gICAgICAgICAgICBtZXNzYWdlSWQ6IG0uaWQsXG4gICAgICAgICAgICBzZW5kZXJFMTY0OiBtLnNvdXJjZSxcbiAgICAgICAgICAgIHNlbmRlclV1aWQ6IG0uc291cmNlVXVpZCxcbiAgICAgICAgICAgIHRpbWVzdGFtcDogbS5zZW50X2F0LFxuICAgICAgICAgIH0pKVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIHJlYWRNZXNzYWdlcy5tYXAoYXN5bmMgbSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVnaXN0ZXJlZCA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihtLmlkLCBtKTtcbiAgICAgICAgICBjb25zdCBzaG91bGRTYXZlID0gYXdhaXQgcmVnaXN0ZXJlZC5xdWV1ZUF0dGFjaG1lbnREb3dubG9hZHMoKTtcbiAgICAgICAgICBpZiAoc2hvdWxkU2F2ZSkge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKHJlZ2lzdGVyZWQuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgICBvdXJVdWlkLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IHdoaWxlIChtZXNzYWdlcy5sZW5ndGggPiAwKTtcbiAgfVxuXG4gIGFzeW5jIGFwcGx5TWVzc2FnZVJlcXVlc3RSZXNwb25zZShcbiAgICByZXNwb25zZTogbnVtYmVyLFxuICAgIHsgZnJvbVN5bmMgPSBmYWxzZSwgdmlhU3RvcmFnZVNlcnZpY2VTeW5jID0gZmFsc2UgfSA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBtZXNzYWdlUmVxdWVzdEVudW0gPSBQcm90by5TeW5jTWVzc2FnZS5NZXNzYWdlUmVxdWVzdFJlc3BvbnNlLlR5cGU7XG4gICAgICBjb25zdCBpc0xvY2FsQWN0aW9uID0gIWZyb21TeW5jICYmICF2aWFTdG9yYWdlU2VydmljZVN5bmM7XG4gICAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkKCk7XG5cbiAgICAgIGNvbnN0IGN1cnJlbnRNZXNzYWdlUmVxdWVzdFN0YXRlID0gdGhpcy5nZXQoJ21lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlJyk7XG4gICAgICBjb25zdCBkaWRSZXNwb25zZUNoYW5nZSA9IHJlc3BvbnNlICE9PSBjdXJyZW50TWVzc2FnZVJlcXVlc3RTdGF0ZTtcbiAgICAgIGNvbnN0IHdhc1ByZXZpb3VzbHlBY2NlcHRlZCA9IHRoaXMuZ2V0QWNjZXB0ZWQoKTtcblxuICAgICAgLy8gQXBwbHkgbWVzc2FnZSByZXF1ZXN0IHJlc3BvbnNlIGxvY2FsbHlcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgbWVzc2FnZVJlcXVlc3RSZXNwb25zZVR5cGU6IHJlc3BvbnNlLFxuICAgICAgfSk7XG5cbiAgICAgIGlmIChyZXNwb25zZSA9PT0gbWVzc2FnZVJlcXVlc3RFbnVtLkFDQ0VQVCkge1xuICAgICAgICB0aGlzLnVuYmxvY2soeyB2aWFTdG9yYWdlU2VydmljZVN5bmMgfSk7XG4gICAgICAgIHRoaXMuZW5hYmxlUHJvZmlsZVNoYXJpbmcoeyB2aWFTdG9yYWdlU2VydmljZVN5bmMgfSk7XG5cbiAgICAgICAgLy8gV2UgcmVhbGx5IGRvbid0IHdhbnQgdG8gY2FsbCB0aGlzIGlmIHdlIGRvbid0IGhhdmUgdG8uIEl0IGNhbiB0YWtlIGEgbG90IG9mXG4gICAgICAgIC8vICAgdGltZSB0byBnbyB0aHJvdWdoIG9sZCBtZXNzYWdlcyB0byBkb3dubG9hZCBhdHRhY2htZW50cy5cbiAgICAgICAgaWYgKGRpZFJlc3BvbnNlQ2hhbmdlICYmICF3YXNQcmV2aW91c2x5QWNjZXB0ZWQpIHtcbiAgICAgICAgICBhd2FpdCB0aGlzLmhhbmRsZVJlYWRBbmREb3dubG9hZEF0dGFjaG1lbnRzKHsgaXNMb2NhbEFjdGlvbiB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChpc0xvY2FsQWN0aW9uKSB7XG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgaXNHcm91cFYxKHRoaXMuYXR0cmlidXRlcykgfHxcbiAgICAgICAgICAgIGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcylcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIHRoaXMuc2VuZFByb2ZpbGVLZXlVcGRhdGUoKTtcbiAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQgJiZcbiAgICAgICAgICAgIGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgICAgICB0aGlzLmlzTWVtYmVyUGVuZGluZyhvdXJDb252ZXJzYXRpb25JZClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgICAgICAgIG5hbWU6ICdwcm9tb3RlUGVuZGluZ01lbWJlcicsXG4gICAgICAgICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiAoKSA9PlxuICAgICAgICAgICAgICAgIHRoaXMucHJvbW90ZVBlbmRpbmdNZW1iZXIob3VyQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAgIG91ckNvbnZlcnNhdGlvbklkICYmXG4gICAgICAgICAgICBpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSAmJlxuICAgICAgICAgICAgdGhpcy5pc01lbWJlcihvdXJDb252ZXJzYXRpb25JZClcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgICAnYXBwbHlNZXNzYWdlUmVxdWVzdFJlc3BvbnNlL2FjY2VwdDogQWxyZWFkeSBhIG1lbWJlciBvZiB2MiBncm91cCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICAgJ2FwcGx5TWVzc2FnZVJlcXVlc3RSZXNwb25zZS9hY2NlcHQ6IE5laXRoZXIgbWVtYmVyIG5vciBwZW5kaW5nIG1lbWJlciBvZiB2MiBncm91cCdcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9IGVsc2UgaWYgKHJlc3BvbnNlID09PSBtZXNzYWdlUmVxdWVzdEVudW0uQkxPQ0spIHtcbiAgICAgICAgLy8gQmxvY2sgbG9jYWxseSwgb3RoZXIgZGV2aWNlcyBzaG91bGQgYmxvY2sgdXBvbiByZWNlaXZpbmcgdGhlIHN5bmMgbWVzc2FnZVxuICAgICAgICB0aGlzLmJsb2NrKHsgdmlhU3RvcmFnZVNlcnZpY2VTeW5jIH0pO1xuICAgICAgICB0aGlzLmRpc2FibGVQcm9maWxlU2hhcmluZyh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyB9KTtcblxuICAgICAgICBpZiAoaXNMb2NhbEFjdGlvbikge1xuICAgICAgICAgIGlmIChpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwVjIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgPT09IG1lc3NhZ2VSZXF1ZXN0RW51bS5ERUxFVEUpIHtcbiAgICAgICAgdGhpcy5kaXNhYmxlUHJvZmlsZVNoYXJpbmcoeyB2aWFTdG9yYWdlU2VydmljZVN5bmMgfSk7XG5cbiAgICAgICAgLy8gRGVsZXRlIG1lc3NhZ2VzIGxvY2FsbHksIG90aGVyIGRldmljZXMgc2hvdWxkIGRlbGV0ZSB1cG9uIHJlY2VpdmluZ1xuICAgICAgICAvLyB0aGUgc3luYyBtZXNzYWdlXG4gICAgICAgIGF3YWl0IHRoaXMuZGVzdHJveU1lc3NhZ2VzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGFzdE1lc3NhZ2UoKTtcblxuICAgICAgICBpZiAoaXNMb2NhbEFjdGlvbikge1xuICAgICAgICAgIHRoaXMudHJpZ2dlcigndW5sb2FkJywgJ2RlbGV0ZWQgZnJvbSBtZXNzYWdlIHJlcXVlc3QnKTtcblxuICAgICAgICAgIGlmIChpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwVjIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAocmVzcG9uc2UgPT09IG1lc3NhZ2VSZXF1ZXN0RW51bS5CTE9DS19BTkRfREVMRVRFKSB7XG4gICAgICAgIC8vIEJsb2NrIGxvY2FsbHksIG90aGVyIGRldmljZXMgc2hvdWxkIGJsb2NrIHVwb24gcmVjZWl2aW5nIHRoZSBzeW5jIG1lc3NhZ2VcbiAgICAgICAgdGhpcy5ibG9jayh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyB9KTtcbiAgICAgICAgdGhpcy5kaXNhYmxlUHJvZmlsZVNoYXJpbmcoeyB2aWFTdG9yYWdlU2VydmljZVN5bmMgfSk7XG5cbiAgICAgICAgLy8gRGVsZXRlIG1lc3NhZ2VzIGxvY2FsbHksIG90aGVyIGRldmljZXMgc2hvdWxkIGRlbGV0ZSB1cG9uIHJlY2VpdmluZ1xuICAgICAgICAvLyB0aGUgc3luYyBtZXNzYWdlXG4gICAgICAgIGF3YWl0IHRoaXMuZGVzdHJveU1lc3NhZ2VzKCk7XG4gICAgICAgIHRoaXMudXBkYXRlTGFzdE1lc3NhZ2UoKTtcblxuICAgICAgICBpZiAoaXNMb2NhbEFjdGlvbikge1xuICAgICAgICAgIHRoaXMudHJpZ2dlcigndW5sb2FkJywgJ2Jsb2NrZWQgYW5kIGRlbGV0ZWQgZnJvbSBtZXNzYWdlIHJlcXVlc3QnKTtcblxuICAgICAgICAgIGlmIChpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwKCk7XG4gICAgICAgICAgfSBlbHNlIGlmIChpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgYXdhaXQgdGhpcy5sZWF2ZUdyb3VwVjIoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGZpbmFsbHkge1xuICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGpvaW5Hcm91cFYyVmlhTGlua0FuZE1pZ3JhdGUoe1xuICAgIGFwcHJvdmFsUmVxdWlyZWQsXG4gICAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgIHJldmlzaW9uLFxuICB9OiB7XG4gICAgYXBwcm92YWxSZXF1aXJlZDogYm9vbGVhbjtcbiAgICBpbnZpdGVMaW5rUGFzc3dvcmQ6IHN0cmluZztcbiAgICByZXZpc2lvbjogbnVtYmVyO1xuICB9KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5Hcm91cHMuam9pbkdyb3VwVjJWaWFMaW5rQW5kTWlncmF0ZSh7XG4gICAgICBhcHByb3ZhbFJlcXVpcmVkLFxuICAgICAgY29udmVyc2F0aW9uOiB0aGlzLFxuICAgICAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgICAgcmV2aXNpb24sXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBqb2luR3JvdXBWMlZpYUxpbmsoe1xuICAgIGludml0ZUxpbmtQYXNzd29yZCxcbiAgICBhcHByb3ZhbFJlcXVpcmVkLFxuICB9OiB7XG4gICAgaW52aXRlTGlua1Bhc3N3b3JkOiBzdHJpbmc7XG4gICAgYXBwcm92YWxSZXF1aXJlZDogYm9vbGVhbjtcbiAgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbklkID1cbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuICAgIHRyeSB7XG4gICAgICBpZiAoYXBwcm92YWxSZXF1aXJlZCkge1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgICAgIG5hbWU6ICdyZXF1ZXN0VG9Kb2luJyxcbiAgICAgICAgICBpbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IHRoaXMuYWRkUGVuZGluZ0FwcHJvdmFsUmVxdWVzdCgpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgICAgbmFtZTogJ2pvaW5Hcm91cCcsXG4gICAgICAgICAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiAoKSA9PiB0aGlzLmFkZE1lbWJlcihvdXJDb252ZXJzYXRpb25JZCksXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBBTFJFQURZX1JFUVVFU1RFRF9UT19KT0lOID1cbiAgICAgICAgJ3tcImNvZGVcIjo0MDAsXCJtZXNzYWdlXCI6XCJjYW5ub3QgYXNrIHRvIGpvaW4gdmlhIGludml0ZSBsaW5rIGlmIGFscmVhZHkgYXNrZWQgdG8gam9pblwifSc7XG4gICAgICBpZiAoIWVycm9yLnJlc3BvbnNlKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3JEZXRhaWxzID0gQnl0ZXMudG9TdHJpbmcoZXJyb3IucmVzcG9uc2UpO1xuICAgICAgICBpZiAoZXJyb3JEZXRhaWxzICE9PSBBTFJFQURZX1JFUVVFU1RFRF9UT19KT0lOKSB7XG4gICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAnam9pbkdyb3VwVjJWaWFMaW5rOiBHb3QgNDAwLCBidXQgc2VydmVyIGlzIHRlbGxpbmcgdXMgd2UgaGF2ZSBhbHJlYWR5IHJlcXVlc3RlZCB0byBqb2luLiBGb3JjaW5nIHRoYXQgbG9jYWwgc3RhdGUnXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgICBwZW5kaW5nQWRtaW5BcHByb3ZhbFYyOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlUmVxdWVzdEVudW0gPSBQcm90by5TeW5jTWVzc2FnZS5NZXNzYWdlUmVxdWVzdFJlc3BvbnNlLlR5cGU7XG5cbiAgICAvLyBFbnN1cmUgYWN0aXZlX2F0IGlzIHNldCwgYmVjYXVzZSB0aGlzIGlzIGFuIGV2ZW50IHRoYXQganVzdGlmaWVzIHB1dHRpbmcgdGhlIGdyb3VwXG4gICAgLy8gICBpbiB0aGUgbGVmdCBwYW5lLlxuICAgIHRoaXMuc2V0KHtcbiAgICAgIG1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlOiBtZXNzYWdlUmVxdWVzdEVudW0uQUNDRVBULFxuICAgICAgYWN0aXZlX2F0OiB0aGlzLmdldCgnYWN0aXZlX2F0JykgfHwgRGF0ZS5ub3coKSxcbiAgICB9KTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBhc3luYyBjYW5jZWxKb2luUmVxdWVzdCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3coKTtcblxuICAgIGNvbnN0IGludml0ZUxpbmtQYXNzd29yZCA9IHRoaXMuZ2V0KCdncm91cEludml0ZUxpbmtQYXNzd29yZCcpO1xuICAgIGlmICghaW52aXRlTGlua1Bhc3N3b3JkKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGNhbmNlbEpvaW5SZXF1ZXN0LyR7dGhpcy5pZEZvckxvZ2dpbmcoKX06IFdlIGRvbid0IGhhdmUgYW4gaW52aXRlTGlua1Bhc3N3b3JkIWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgIG5hbWU6ICdjYW5jZWxKb2luUmVxdWVzdCcsXG4gICAgICBpbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT5cbiAgICAgICAgdGhpcy5kZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdChvdXJDb252ZXJzYXRpb25JZCksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBhZGRNZW1iZXJzVjIoY29udmVyc2F0aW9uSWRzOiBSZWFkb25seUFycmF5PHN0cmluZz4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgbmFtZTogJ2FkZE1lbWJlcnNWMicsXG4gICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT5cbiAgICAgICAgd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRBZGRNZW1iZXJzQ2hhbmdlKFxuICAgICAgICAgIHRoaXMuYXR0cmlidXRlcyxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZHNcbiAgICAgICAgKSxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUdyb3VwQXR0cmlidXRlc1YyKFxuICAgIGF0dHJpYnV0ZXM6IFJlYWRvbmx5PHtcbiAgICAgIGF2YXRhcj86IHVuZGVmaW5lZCB8IFVpbnQ4QXJyYXk7XG4gICAgICBkZXNjcmlwdGlvbj86IHN0cmluZztcbiAgICAgIHRpdGxlPzogc3RyaW5nO1xuICAgIH0+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICBuYW1lOiAndXBkYXRlR3JvdXBBdHRyaWJ1dGVzVjInLFxuICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+XG4gICAgICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkVXBkYXRlQXR0cmlidXRlc0NoYW5nZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogdGhpcy5pZCxcbiAgICAgICAgICAgIHB1YmxpY1BhcmFtczogdGhpcy5nZXQoJ3B1YmxpY1BhcmFtcycpLFxuICAgICAgICAgICAgcmV2aXNpb246IHRoaXMuZ2V0KCdyZXZpc2lvbicpLFxuICAgICAgICAgICAgc2VjcmV0UGFyYW1zOiB0aGlzLmdldCgnc2VjcmV0UGFyYW1zJyksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBhdHRyaWJ1dGVzXG4gICAgICAgICksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBsZWF2ZUdyb3VwVjIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPVxuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcblxuICAgIGlmIChcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkICYmXG4gICAgICBpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSAmJlxuICAgICAgdGhpcy5pc01lbWJlclBlbmRpbmcob3VyQ29udmVyc2F0aW9uSWQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgICBuYW1lOiAnZGVsZXRlJyxcbiAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IHRoaXMucmVtb3ZlUGVuZGluZ01lbWJlcihbb3VyQ29udmVyc2F0aW9uSWRdKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoXG4gICAgICBvdXJDb252ZXJzYXRpb25JZCAmJlxuICAgICAgaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykgJiZcbiAgICAgIHRoaXMuaXNNZW1iZXIob3VyQ29udmVyc2F0aW9uSWQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgICBuYW1lOiAnZGVsZXRlJyxcbiAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IHRoaXMucmVtb3ZlTWVtYmVyKG91ckNvbnZlcnNhdGlvbklkKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdsZWF2ZUdyb3VwVjI6IFdlIHdlcmUgbmVpdGhlciBhIG1lbWJlciBub3IgYSBwZW5kaW5nIG1lbWJlciBvZiB0aGUgZ3JvdXAnXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGFkZEJhbm5lZE1lbWJlcihcbiAgICB1dWlkOiBVVUlEU3RyaW5nVHlwZVxuICApOiBQcm9taXNlPFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMgfCB1bmRlZmluZWQ+IHtcbiAgICBpZiAodGhpcy5pc01lbWJlcih1dWlkKSkge1xuICAgICAgbG9nLndhcm4oJ2FkZEJhbm5lZE1lbWJlcjogTWVtYmVyIGlzIGEgcGFydCBvZiB0aGUgZ3JvdXAhJyk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5pc01lbWJlclBlbmRpbmcodXVpZCkpIHtcbiAgICAgIGxvZy53YXJuKCdhZGRCYW5uZWRNZW1iZXI6IE1lbWJlciBpcyBwZW5kaW5nIHRvIGJlIGFkZGVkIHRvIGdyb3VwIScpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNNZW1iZXJCYW5uZWQodXVpZCkpIHtcbiAgICAgIGxvZy53YXJuKCdhZGRCYW5uZWRNZW1iZXI6IE1lbWJlciBpcyBhbHJlYWR5IGJhbm5lZCEnKTtcblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZEFkZEJhbm5lZE1lbWJlckNoYW5nZSh7XG4gICAgICBncm91cDogdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGJsb2NrR3JvdXBMaW5rUmVxdWVzdHModXVpZDogVVVJRFN0cmluZ1R5cGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgbmFtZTogJ2FkZEJhbm5lZE1lbWJlcicsXG4gICAgICBjcmVhdGVHcm91cENoYW5nZTogYXN5bmMgKCkgPT4gdGhpcy5hZGRCYW5uZWRNZW1iZXIodXVpZCksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVBZG1pbihjb252ZXJzYXRpb25JZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc01lbWJlcihjb252ZXJzYXRpb25JZCkpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYHRvZ2dsZUFkbWluOiBNZW1iZXIgJHtjb252ZXJzYXRpb25JZH0gaXMgbm90IGEgbWVtYmVyIG9mIHRoZSBncm91cGBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgIG5hbWU6ICd0b2dnbGVBZG1pbicsXG4gICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT4gdGhpcy50b2dnbGVBZG1pbkNoYW5nZShjb252ZXJzYXRpb25JZCksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBhcHByb3ZlUGVuZGluZ01lbWJlcnNoaXBGcm9tR3JvdXBWMihcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChcbiAgICAgIGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpICYmXG4gICAgICB0aGlzLmlzTWVtYmVyUmVxdWVzdGluZ1RvSm9pbihjb252ZXJzYXRpb25JZClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICdhcHByb3ZlUGVuZGluZ0FwcHJvdmFsUmVxdWVzdCcsXG4gICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiAoKSA9PlxuICAgICAgICAgIHRoaXMuYXBwcm92ZVBlbmRpbmdBcHByb3ZhbFJlcXVlc3QoY29udmVyc2F0aW9uSWQpLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmV2b2tlUGVuZGluZ01lbWJlcnNoaXBzRnJvbUdyb3VwVjIoXG4gICAgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBbY29udmVyc2F0aW9uSWRdID0gY29udmVyc2F0aW9uSWRzO1xuXG4gICAgLy8gT25seSBwZW5kaW5nIG1lbWJlcnNoaXBzIGNhbiBiZSByZXZva2VkIGZvciBtdWx0aXBsZSBtZW1iZXJzIGF0IG9uY2VcbiAgICBpZiAoY29udmVyc2F0aW9uSWRzLmxlbmd0aCA+IDEpIHtcbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVQZW5kaW5nTWVtYmVyJyxcbiAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IHRoaXMucmVtb3ZlUGVuZGluZ01lbWJlcihjb252ZXJzYXRpb25JZHMpLFxuICAgICAgICBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kOiBjb252ZXJzYXRpb25JZHMsXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNNZW1iZXJSZXF1ZXN0aW5nVG9Kb2luKGNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgICAgbmFtZTogJ2RlbnlQZW5kaW5nQXBwcm92YWxSZXF1ZXN0JyxcbiAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+XG4gICAgICAgICAgdGhpcy5kZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdChjb252ZXJzYXRpb25JZCksXG4gICAgICAgIGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmQ6IFtjb252ZXJzYXRpb25JZF0sXG4gICAgICB9KTtcbiAgICB9IGVsc2UgaWYgKHRoaXMuaXNNZW1iZXJQZW5kaW5nKGNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgICAgbmFtZTogJ3JlbW92ZVBlbmRpbmdNZW1iZXInLFxuICAgICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT4gdGhpcy5yZW1vdmVQZW5kaW5nTWVtYmVyKFtjb252ZXJzYXRpb25JZF0pLFxuICAgICAgICBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kOiBbY29udmVyc2F0aW9uSWRdLFxuICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgcmVtb3ZlRnJvbUdyb3VwVjIoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChcbiAgICAgIGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpICYmXG4gICAgICB0aGlzLmlzTWVtYmVyUmVxdWVzdGluZ1RvSm9pbihjb252ZXJzYXRpb25JZClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICdkZW55UGVuZGluZ0FwcHJvdmFsUmVxdWVzdCcsXG4gICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiAoKSA9PlxuICAgICAgICAgIHRoaXMuZGVueVBlbmRpbmdBcHByb3ZhbFJlcXVlc3QoY29udmVyc2F0aW9uSWQpLFxuICAgICAgICBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kOiBbY29udmVyc2F0aW9uSWRdLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIGlmIChcbiAgICAgIGlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpICYmXG4gICAgICB0aGlzLmlzTWVtYmVyUGVuZGluZyhjb252ZXJzYXRpb25JZClcbiAgICApIHtcbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVQZW5kaW5nTWVtYmVyJyxcbiAgICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IHRoaXMucmVtb3ZlUGVuZGluZ01lbWJlcihbY29udmVyc2F0aW9uSWRdKSxcbiAgICAgICAgZXh0cmFDb252ZXJzYXRpb25zRm9yU2VuZDogW2NvbnZlcnNhdGlvbklkXSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSBpZiAoaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykgJiYgdGhpcy5pc01lbWJlcihjb252ZXJzYXRpb25JZCkpIHtcbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICdyZW1vdmVGcm9tR3JvdXAnLFxuICAgICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT4gdGhpcy5yZW1vdmVNZW1iZXIoY29udmVyc2F0aW9uSWQpLFxuICAgICAgICBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kOiBbY29udmVyc2F0aW9uSWRdLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYHJlbW92ZUZyb21Hcm91cFYyOiBNZW1iZXIgJHtjb252ZXJzYXRpb25JZH0gaXMgbmVpdGhlciBhIG1lbWJlciBub3IgYSBwZW5kaW5nIG1lbWJlciBvZiB0aGUgZ3JvdXBgXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHN5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKHJlc3BvbnNlOiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBJbiBHcm91cHNWMiwgdGhpcyBtYXkgbW9kaWZ5IHRoZSBzZXJ2ZXIuIFdlIG9ubHkgd2FudCB0byBjb250aW51ZSBpZiB0aG9zZVxuICAgIC8vICAgc2VydmVyIHVwZGF0ZXMgd2VyZSBzdWNjZXNzZnVsLlxuICAgIGF3YWl0IHRoaXMuYXBwbHlNZXNzYWdlUmVxdWVzdFJlc3BvbnNlKHJlc3BvbnNlKTtcblxuICAgIGNvbnN0IGdyb3VwSWQgPSB0aGlzLmdldEdyb3VwSWRCdWZmZXIoKTtcblxuICAgIGlmICh3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5hcmVXZVByaW1hcnlEZXZpY2UoKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdzeW5jTWVzc2FnZVJlcXVlc3RSZXNwb25zZTogV2UgYXJlIHByaW1hcnkgZGV2aWNlOyBub3Qgc2VuZGluZyBtZXNzYWdlIHJlcXVlc3Qgc3luYydcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNpbmdsZVByb3RvSm9iUXVldWUuYWRkKFxuICAgICAgICBNZXNzYWdlU2VuZGVyLmdldE1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VTeW5jKHtcbiAgICAgICAgICB0aHJlYWRFMTY0OiB0aGlzLmdldCgnZTE2NCcpLFxuICAgICAgICAgIHRocmVhZFV1aWQ6IHRoaXMuZ2V0KCd1dWlkJyksXG4gICAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgICB0eXBlOiByZXNwb25zZSxcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ3N5bmNNZXNzYWdlUmVxdWVzdFJlc3BvbnNlOiBGYWlsZWQgdG8gcXVldWUgc3luYyBtZXNzYWdlJyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBzYWZlR2V0VmVyaWZpZWQoKTogUHJvbWlzZTxudW1iZXI+IHtcbiAgICBjb25zdCB1dWlkID0gdGhpcy5nZXRVdWlkKCk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICByZXR1cm4gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5WZXJpZmllZFN0YXR1cy5ERUZBVUxUO1xuICAgIH1cblxuICAgIGNvbnN0IHByb21pc2UgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmdldFZlcmlmaWVkKHV1aWQpO1xuICAgIHJldHVybiBwcm9taXNlLmNhdGNoKFxuICAgICAgKCkgPT4gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5WZXJpZmllZFN0YXR1cy5ERUZBVUxUXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVZlcmlmaWVkKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBhd2FpdCB0aGlzLmluaXRpYWxQcm9taXNlO1xuICAgICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCB0aGlzLnNhZmVHZXRWZXJpZmllZCgpO1xuXG4gICAgICBpZiAodGhpcy5nZXQoJ3ZlcmlmaWVkJykgIT09IHZlcmlmaWVkKSB7XG4gICAgICAgIHRoaXMuc2V0KHsgdmVyaWZpZWQgfSk7XG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRoaXMuZmV0Y2hDb250YWN0cygpO1xuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgdGhpcy5jb250YWN0Q29sbGVjdGlvbiEubWFwKGFzeW5jIGNvbnRhY3QgPT4ge1xuICAgICAgICBpZiAoIWlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIGF3YWl0IGNvbnRhY3QudXBkYXRlVmVyaWZpZWQoKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgc2V0VmVyaWZpZWREZWZhdWx0KG9wdGlvbnM/OiBWZXJpZmljYXRpb25PcHRpb25zKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCB7IERFRkFVTFQgfSA9IHRoaXMudmVyaWZpZWRFbnVtITtcbiAgICByZXR1cm4gdGhpcy5xdWV1ZUpvYignc2V0VmVyaWZpZWREZWZhdWx0JywgKCkgPT5cbiAgICAgIHRoaXMuX3NldFZlcmlmaWVkKERFRkFVTFQsIG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIHNldFZlcmlmaWVkKG9wdGlvbnM/OiBWZXJpZmljYXRpb25PcHRpb25zKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCB7IFZFUklGSUVEIH0gPSB0aGlzLnZlcmlmaWVkRW51bSE7XG4gICAgcmV0dXJuIHRoaXMucXVldWVKb2IoJ3NldFZlcmlmaWVkJywgKCkgPT5cbiAgICAgIHRoaXMuX3NldFZlcmlmaWVkKFZFUklGSUVELCBvcHRpb25zKVxuICAgICk7XG4gIH1cblxuICBzZXRVbnZlcmlmaWVkKG9wdGlvbnM6IFZlcmlmaWNhdGlvbk9wdGlvbnMpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IHsgVU5WRVJJRklFRCB9ID0gdGhpcy52ZXJpZmllZEVudW0hO1xuICAgIHJldHVybiB0aGlzLnF1ZXVlSm9iKCdzZXRVbnZlcmlmaWVkJywgKCkgPT5cbiAgICAgIHRoaXMuX3NldFZlcmlmaWVkKFVOVkVSSUZJRUQsIG9wdGlvbnMpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgX3NldFZlcmlmaWVkKFxuICAgIHZlcmlmaWVkOiBudW1iZXIsXG4gICAgcHJvdmlkZWRPcHRpb25zPzogVmVyaWZpY2F0aW9uT3B0aW9uc1xuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBvcHRpb25zID0gcHJvdmlkZWRPcHRpb25zIHx8IHt9O1xuICAgIHdpbmRvdy5fLmRlZmF1bHRzKG9wdGlvbnMsIHtcbiAgICAgIHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogZmFsc2UsXG4gICAgICBrZXk6IG51bGwsXG4gICAgfSk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IHsgVkVSSUZJRUQsIERFRkFVTFQgfSA9IHRoaXMudmVyaWZpZWRFbnVtITtcblxuICAgIGlmICghaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnWW91IGNhbm5vdCB2ZXJpZnkgYSBncm91cCBjb252ZXJzYXRpb24uICcgK1xuICAgICAgICAgICdZb3UgbXVzdCB2ZXJpZnkgaW5kaXZpZHVhbCBjb250YWN0cy4nXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSB0aGlzLmdldFV1aWQoKTtcbiAgICBjb25zdCBiZWdpbm5pbmdWZXJpZmllZCA9IHRoaXMuZ2V0KCd2ZXJpZmllZCcpO1xuICAgIGxldCBrZXlDaGFuZ2UgPSBmYWxzZTtcbiAgICBpZiAob3B0aW9ucy52aWFTdG9yYWdlU2VydmljZVN5bmMpIHtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgdXVpZCxcbiAgICAgICAgYFN5bmMgbWVzc2FnZSBkaWRuJ3QgdXBkYXRlIHV1aWQgZm9yIGNvbnZlcnNhdGlvbjogJHt0aGlzLmlkfWBcbiAgICAgICk7XG5cbiAgICAgIC8vIGhhbmRsZSB0aGUgaW5jb21pbmcga2V5IGZyb20gdGhlIHN5bmMgbWVzc2FnZXMgLSBuZWVkIGRpZmZlcmVudFxuICAgICAgLy8gYmVoYXZpb3IgaWYgdGhhdCBrZXkgZG9lc24ndCBtYXRjaCB0aGUgY3VycmVudCBrZXlcbiAgICAgIGtleUNoYW5nZSA9XG4gICAgICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wucHJvY2Vzc1ZlcmlmaWVkTWVzc2FnZShcbiAgICAgICAgICB1dWlkLFxuICAgICAgICAgIHZlcmlmaWVkLFxuICAgICAgICAgIG9wdGlvbnMua2V5IHx8IHVuZGVmaW5lZFxuICAgICAgICApO1xuICAgIH0gZWxzZSBpZiAodXVpZCkge1xuICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5zZXRWZXJpZmllZCh1dWlkLCB2ZXJpZmllZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy53YXJuKGBfc2V0VmVyaWZpZWQoJHt0aGlzLmlkfSk6IG5vIHV1aWQgdG8gdXBkYXRlIHByb3RvY29sIHN0b3JhZ2VgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCh7IHZlcmlmaWVkIH0pO1xuXG4gICAgLy8gV2Ugd2lsbCB1cGRhdGUgdGhlIGNvbnZlcnNhdGlvbiBkdXJpbmcgc3RvcmFnZSBzZXJ2aWNlIHN5bmNcbiAgICBpZiAoIW9wdGlvbnMudmlhU3RvcmFnZVNlcnZpY2VTeW5jKSB7XG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgfVxuXG4gICAgaWYgKCFvcHRpb25zLnZpYVN0b3JhZ2VTZXJ2aWNlU3luYykge1xuICAgICAgaWYgKGtleUNoYW5nZSkge1xuICAgICAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoJ2tleUNoYW5nZScpO1xuICAgICAgfVxuICAgICAgaWYgKGJlZ2lubmluZ1ZlcmlmaWVkICE9PSB2ZXJpZmllZCkge1xuICAgICAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoYHZlcmlmaWVkIGZyb209JHtiZWdpbm5pbmdWZXJpZmllZH0gdG89JHt2ZXJpZmllZH1gKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBkaWRWZXJpZmllZENoYW5nZSA9IGJlZ2lubmluZ1ZlcmlmaWVkICE9PSB2ZXJpZmllZDtcbiAgICBjb25zdCBpc0V4cGxpY2l0VXNlckFjdGlvbiA9ICFvcHRpb25zLnZpYVN0b3JhZ2VTZXJ2aWNlU3luYztcbiAgICBjb25zdCBzaG91bGRTaG93RnJvbVN0b3JhZ2VTeW5jID1cbiAgICAgIG9wdGlvbnMudmlhU3RvcmFnZVNlcnZpY2VTeW5jICYmIHZlcmlmaWVkICE9PSBERUZBVUxUO1xuICAgIGlmIChcbiAgICAgIC8vIFRoZSBtZXNzYWdlIGNhbWUgZnJvbSBhbiBleHBsaWNpdCB2ZXJpZmljYXRpb24gaW4gYSBjbGllbnQgKG5vdFxuICAgICAgLy8gc3RvcmFnZSBzZXJ2aWNlIHN5bmMpXG4gICAgICAoZGlkVmVyaWZpZWRDaGFuZ2UgJiYgaXNFeHBsaWNpdFVzZXJBY3Rpb24pIHx8XG4gICAgICAvLyBUaGUgdmVyaWZpY2F0aW9uIHZhbHVlIHJlY2VpdmVkIGJ5IHRoZSBzdG9yYWdlIHN5bmMgaXMgZGlmZmVyZW50IGZyb20gd2hhdCB3ZVxuICAgICAgLy8gICBoYXZlIG9uIHJlY29yZCAoYW5kIGl0J3Mgbm90IGEgdHJhbnNpdGlvbiB0byBVTlZFUklGSUVEKVxuICAgICAgKGRpZFZlcmlmaWVkQ2hhbmdlICYmIHNob3VsZFNob3dGcm9tU3RvcmFnZVN5bmMpIHx8XG4gICAgICAvLyBPdXIgbG9jYWwgdmVyaWZpY2F0aW9uIHN0YXR1cyBpcyBWRVJJRklFRCBhbmQgaXQgaGFzbid0IGNoYW5nZWQsIGJ1dCB0aGUga2V5IGRpZFxuICAgICAgLy8gICBjaGFuZ2UgKEtleTEvVkVSSUZJRUQgLT4gS2V5Mi9WRVJJRklFRCksIGJ1dCB3ZSBkb24ndCB3YW50IHRvIHNob3cgREVGQVVMVCAtPlxuICAgICAgLy8gICBERUZBVUxUIG9yIFVOVkVSSUZJRUQgLT4gVU5WRVJJRklFRFxuICAgICAgKGtleUNoYW5nZSAmJiB2ZXJpZmllZCA9PT0gVkVSSUZJRUQpXG4gICAgKSB7XG4gICAgICBhd2FpdCB0aGlzLmFkZFZlcmlmaWVkQ2hhbmdlKHRoaXMuaWQsIHZlcmlmaWVkID09PSBWRVJJRklFRCwge1xuICAgICAgICBsb2NhbDogaXNFeHBsaWNpdFVzZXJBY3Rpb24sXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGlzRXhwbGljaXRVc2VyQWN0aW9uICYmIHV1aWQpIHtcbiAgICAgIGF3YWl0IHRoaXMuc2VuZFZlcmlmeVN5bmNNZXNzYWdlKHRoaXMuZ2V0KCdlMTY0JyksIHV1aWQsIHZlcmlmaWVkKTtcbiAgICB9XG5cbiAgICByZXR1cm4ga2V5Q2hhbmdlO1xuICB9XG5cbiAgYXN5bmMgc2VuZFZlcmlmeVN5bmNNZXNzYWdlKFxuICAgIGUxNjQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgICB1dWlkOiBVVUlELFxuICAgIHN0YXRlOiBudW1iZXJcbiAgKTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGUgfCB2b2lkPiB7XG4gICAgY29uc3QgaWRlbnRpZmllciA9IHV1aWQgPyB1dWlkLnRvU3RyaW5nKCkgOiBlMTY0O1xuICAgIGlmICghaWRlbnRpZmllcikge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnc2VuZFZlcmlmeVN5bmNNZXNzYWdlOiBOZWl0aGVyIGUxNjQgbm9yIFVVSUQgd2VyZSBwcm92aWRlZCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmFyZVdlUHJpbWFyeURldmljZSgpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ3NlbmRWZXJpZnlTeW5jTWVzc2FnZTogV2UgYXJlIHByaW1hcnkgZGV2aWNlOyBub3Qgc2VuZGluZyBzeW5jJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBrZXkgPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmxvYWRJZGVudGl0eUtleShcbiAgICAgIFVVSUQuY2hlY2tlZExvb2t1cChpZGVudGlmaWVyKVxuICAgICk7XG4gICAgaWYgKCFrZXkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYHNlbmRWZXJpZnlTeW5jTWVzc2FnZTogTm8gaWRlbnRpdHkga2V5IGZvdW5kIGZvciBpZGVudGlmaWVyICR7aWRlbnRpZmllcn1gXG4gICAgICApO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBhd2FpdCBzaW5nbGVQcm90b0pvYlF1ZXVlLmFkZChcbiAgICAgICAgTWVzc2FnZVNlbmRlci5nZXRWZXJpZmljYXRpb25TeW5jKGUxNjQsIHV1aWQudG9TdHJpbmcoKSwgc3RhdGUsIGtleSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ3NlbmRWZXJpZnlTeW5jTWVzc2FnZTogRmFpbGVkIHRvIHF1ZXVlIHN5bmMgbWVzc2FnZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaXNWZXJpZmllZCgpOiBib29sZWFuIHtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIHJldHVybiB0aGlzLmdldCgndmVyaWZpZWQnKSA9PT0gdGhpcy52ZXJpZmllZEVudW0hLlZFUklGSUVEO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250YWN0Q29sbGVjdGlvbj8ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRoaXMuY29udGFjdENvbGxlY3Rpb24/LmV2ZXJ5KGNvbnRhY3QgPT4ge1xuICAgICAgaWYgKGlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBjb250YWN0LmlzVmVyaWZpZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGlzVW52ZXJpZmllZCgpOiBib29sZWFuIHtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgY29uc3QgdmVyaWZpZWQgPSB0aGlzLmdldCgndmVyaWZpZWQnKTtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgIHZlcmlmaWVkICE9PSB0aGlzLnZlcmlmaWVkRW51bSEuVkVSSUZJRUQgJiZcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdmVyaWZpZWQgIT09IHRoaXMudmVyaWZpZWRFbnVtIS5ERUZBVUxUXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5jb250YWN0Q29sbGVjdGlvbj8ubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdGhpcy5jb250YWN0Q29sbGVjdGlvbj8uc29tZShjb250YWN0ID0+IHtcbiAgICAgIGlmIChpc01lKGNvbnRhY3QuYXR0cmlidXRlcykpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGNvbnRhY3QuaXNVbnZlcmlmaWVkKCk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRVbnZlcmlmaWVkKCk6IENvbnZlcnNhdGlvbk1vZGVsQ29sbGVjdGlvblR5cGUge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gdGhpcy5pc1VudmVyaWZpZWQoKVxuICAgICAgICA/IG5ldyB3aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb25Db2xsZWN0aW9uKFt0aGlzXSlcbiAgICAgICAgOiBuZXcgd2luZG93LldoaXNwZXIuQ29udmVyc2F0aW9uQ29sbGVjdGlvbigpO1xuICAgIH1cbiAgICByZXR1cm4gbmV3IHdpbmRvdy5XaGlzcGVyLkNvbnZlcnNhdGlvbkNvbGxlY3Rpb24oXG4gICAgICB0aGlzLmNvbnRhY3RDb2xsZWN0aW9uPy5maWx0ZXIoY29udGFjdCA9PiB7XG4gICAgICAgIGlmIChpc01lKGNvbnRhY3QuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhY3QuaXNVbnZlcmlmaWVkKCk7XG4gICAgICB9KVxuICAgICk7XG4gIH1cblxuICBhc3luYyBzZXRBcHByb3ZlZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ1lvdSBjYW5ub3Qgc2V0IGEgZ3JvdXAgY29udmVyc2F0aW9uIGFzIHRydXN0ZWQuICcgK1xuICAgICAgICAgICdZb3UgbXVzdCBzZXQgaW5kaXZpZHVhbCBjb250YWN0cyBhcyB0cnVzdGVkLidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IHRoaXMuZ2V0VXVpZCgpO1xuICAgIGlmICghdXVpZCkge1xuICAgICAgbG9nLndhcm4oYHNldEFwcHJvdmVkKCR7dGhpcy5pZH0pOiBubyB1dWlkLCBpZ25vcmluZ2ApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLnNldEFwcHJvdmFsKHV1aWQsIHRydWUpO1xuICB9XG5cbiAgc2FmZUlzVW50cnVzdGVkKCk6IGJvb2xlYW4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB1dWlkID0gdGhpcy5nZXRVdWlkKCk7XG4gICAgICBzdHJpY3RBc3NlcnQodXVpZCwgYE5vIHV1aWQgZm9yIGNvbnZlcnNhdGlvbjogJHt0aGlzLmlkfWApO1xuICAgICAgcmV0dXJuIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuaXNVbnRydXN0ZWQodXVpZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgaXNVbnRydXN0ZWQoKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiB0aGlzLnNhZmVJc1VudHJ1c3RlZCgpO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGlmICghdGhpcy5jb250YWN0Q29sbGVjdGlvbiEubGVuZ3RoKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICByZXR1cm4gdGhpcy5jb250YWN0Q29sbGVjdGlvbiEuYW55KGNvbnRhY3QgPT4ge1xuICAgICAgaWYgKGlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgICByZXR1cm4gY29udGFjdC5zYWZlSXNVbnRydXN0ZWQoKTtcbiAgICB9KTtcbiAgfVxuXG4gIGdldFVudHJ1c3RlZCgpOiBDb252ZXJzYXRpb25Nb2RlbENvbGxlY3Rpb25UeXBlIHtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgaWYgKHRoaXMuaXNVbnRydXN0ZWQoKSkge1xuICAgICAgICByZXR1cm4gbmV3IHdpbmRvdy5XaGlzcGVyLkNvbnZlcnNhdGlvbkNvbGxlY3Rpb24oW3RoaXNdKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBuZXcgd2luZG93LldoaXNwZXIuQ29udmVyc2F0aW9uQ29sbGVjdGlvbigpO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgd2luZG93LldoaXNwZXIuQ29udmVyc2F0aW9uQ29sbGVjdGlvbihcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICB0aGlzLmNvbnRhY3RDb2xsZWN0aW9uIS5maWx0ZXIoY29udGFjdCA9PiB7XG4gICAgICAgIGlmIChpc01lKGNvbnRhY3QuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGNvbnRhY3QuaXNVbnRydXN0ZWQoKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGdldFNlbnRNZXNzYWdlQ291bnQoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ3NlbnRNZXNzYWdlQ291bnQnKSB8fCAwO1xuICB9XG5cbiAgZ2V0TWVzc2FnZVJlcXVlc3RSZXNwb25zZVR5cGUoKTogbnVtYmVyIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ21lc3NhZ2VSZXF1ZXN0UmVzcG9uc2VUeXBlJykgfHwgMDtcbiAgfVxuXG4gIGdldEFib3V0VGV4dCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICghdGhpcy5nZXQoJ2Fib3V0JykpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgZW1vamkgPSB0aGlzLmdldCgnYWJvdXRFbW9qaScpO1xuICAgIGNvbnN0IHRleHQgPSB0aGlzLmdldCgnYWJvdXQnKTtcblxuICAgIGlmICghZW1vamkpIHtcbiAgICAgIHJldHVybiB0ZXh0O1xuICAgIH1cblxuICAgIHJldHVybiB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tdGV4dC13aXRoLWVtb2ppJywge1xuICAgICAgdGV4dCxcbiAgICAgIGVtb2ppLFxuICAgIH0pO1xuICB9XG5cbiAgLyoqXG4gICAqIERldGVybWluZSBpZiB0aGlzIGNvbnZlcnNhdGlvbiBzaG91bGQgYmUgY29uc2lkZXJlZCBcImFjY2VwdGVkXCIgaW4gdGVybXNcbiAgICogb2YgbWVzc2FnZSByZXF1ZXN0c1xuICAgKi9cbiAgZ2V0QWNjZXB0ZWQoKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIGlzQ29udmVyc2F0aW9uQWNjZXB0ZWQodGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIG9uTWVtYmVyVmVyaWZpZWRDaGFuZ2UoKTogdm9pZCB7XG4gICAgLy8gSWYgdGhlIHZlcmlmaWVkIHN0YXRlIG9mIGEgbWVtYmVyIGNoYW5nZXMsIG91ciBhZ2dyZWdhdGUgc3RhdGUgY2hhbmdlcy5cbiAgICAvLyBXZSB0cmlnZ2VyIGJvdGggZXZlbnRzIHRvIHJlcGxpY2F0ZSB0aGUgYmVoYXZpb3Igb2Ygd2luZG93LkJhY2tib25lLk1vZGVsLnNldCgpXG4gICAgdGhpcy50cmlnZ2VyKCdjaGFuZ2U6dmVyaWZpZWQnLCB0aGlzKTtcbiAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXMsIHsgZm9yY2U6IHRydWUgfSk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVWZXJpZmllZCgpOiBQcm9taXNlPHVua25vd24+IHtcbiAgICBpZiAodGhpcy5pc1ZlcmlmaWVkKCkpIHtcbiAgICAgIHJldHVybiB0aGlzLnNldFZlcmlmaWVkRGVmYXVsdCgpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5zZXRWZXJpZmllZCgpO1xuICB9XG5cbiAgYXN5bmMgYWRkQ2hhdFNlc3Npb25SZWZyZXNoZWQoe1xuICAgIHJlY2VpdmVkQXQsXG4gICAgcmVjZWl2ZWRBdENvdW50ZXIsXG4gIH06IHtcbiAgICByZWNlaXZlZEF0OiBudW1iZXI7XG4gICAgcmVjZWl2ZWRBdENvdW50ZXI6IG51bWJlcjtcbiAgfSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKGBhZGRDaGF0U2Vzc2lvblJlZnJlc2hlZDogYWRkaW5nIGZvciAke3RoaXMuaWRGb3JMb2dnaW5nKCl9YCwge1xuICAgICAgcmVjZWl2ZWRBdCxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5pZCxcbiAgICAgIHR5cGU6ICdjaGF0LXNlc3Npb24tcmVmcmVzaGVkJyxcbiAgICAgIHNlbnRfYXQ6IHJlY2VpdmVkQXQsXG4gICAgICByZWNlaXZlZF9hdDogcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICByZWNlaXZlZF9hdF9tczogcmVjZWl2ZWRBdCxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgICAvLyBUT0RPOiBERVNLVE9QLTcyMlxuICAgICAgLy8gdGhpcyB0eXBlIGRvZXMgbm90IGZ1bGx5IGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIGl0IGlzIGV4cGVjdGVkIHRvXG4gICAgfSBhcyB1bmtub3duIGFzIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcblxuICAgIGNvbnN0IGlkID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UsIHtcbiAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgfSk7XG4gICAgY29uc3QgbW9kZWwgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICBpZCxcbiAgICAgIG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgICAgLi4ubWVzc2FnZSxcbiAgICAgICAgaWQsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ25ld21lc3NhZ2UnLCBtb2RlbCk7XG4gICAgdGhpcy51cGRhdGVVbnJlYWQoKTtcbiAgfVxuXG4gIGFzeW5jIGFkZERlbGl2ZXJ5SXNzdWUoe1xuICAgIHJlY2VpdmVkQXQsXG4gICAgcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgc2VuZGVyVXVpZCxcbiAgICBzZW50QXQsXG4gIH06IHtcbiAgICByZWNlaXZlZEF0OiBudW1iZXI7XG4gICAgcmVjZWl2ZWRBdENvdW50ZXI6IG51bWJlcjtcbiAgICBzZW5kZXJVdWlkOiBzdHJpbmc7XG4gICAgc2VudEF0OiBudW1iZXI7XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbyhgYWRkRGVsaXZlcnlJc3N1ZTogYWRkaW5nIGZvciAke3RoaXMuaWRGb3JMb2dnaW5nKCl9YCwge1xuICAgICAgc2VudEF0LFxuICAgICAgc2VuZGVyVXVpZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5pZCxcbiAgICAgIHR5cGU6ICdkZWxpdmVyeS1pc3N1ZScsXG4gICAgICBzb3VyY2VVdWlkOiBzZW5kZXJVdWlkLFxuICAgICAgc2VudF9hdDogcmVjZWl2ZWRBdCxcbiAgICAgIHJlY2VpdmVkX2F0OiByZWNlaXZlZEF0Q291bnRlcixcbiAgICAgIHJlY2VpdmVkX2F0X21zOiByZWNlaXZlZEF0LFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLlVuc2VlbixcbiAgICAgIC8vIFRPRE86IERFU0tUT1AtNzIyXG4gICAgICAvLyB0aGlzIHR5cGUgZG9lcyBub3QgZnVsbHkgaW1wbGVtZW50IHRoZSBpbnRlcmZhY2UgaXQgaXMgZXhwZWN0ZWQgdG9cbiAgICB9IGFzIHVua25vd24gYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlO1xuXG4gICAgY29uc3QgaWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZSwge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgICBjb25zdCBtb2RlbCA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgIGlkLFxuICAgICAgbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2Uoe1xuICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICBpZCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMudHJpZ2dlcignbmV3bWVzc2FnZScsIG1vZGVsKTtcblxuICAgIGF3YWl0IHRoaXMubm90aWZ5KG1vZGVsKTtcbiAgICB0aGlzLnVwZGF0ZVVucmVhZCgpO1xuICB9XG5cbiAgYXN5bmMgYWRkS2V5Q2hhbmdlKGtleUNoYW5nZWRJZDogVVVJRCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKFxuICAgICAgJ2FkZGluZyBrZXkgY2hhbmdlIGFkdmlzb3J5IGZvcicsXG4gICAgICB0aGlzLmlkRm9yTG9nZ2luZygpLFxuICAgICAga2V5Q2hhbmdlZElkLnRvU3RyaW5nKCksXG4gICAgICB0aGlzLmdldCgndGltZXN0YW1wJylcbiAgICApO1xuXG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMuaWQsXG4gICAgICB0eXBlOiAna2V5Y2hhbmdlJyxcbiAgICAgIHNlbnRfYXQ6IHRoaXMuZ2V0KCd0aW1lc3RhbXAnKSxcbiAgICAgIHJlY2VpdmVkX2F0OiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHJlY2VpdmVkX2F0X21zOiB0aW1lc3RhbXAsXG4gICAgICBrZXlfY2hhbmdlZDoga2V5Q2hhbmdlZElkLnRvU3RyaW5nKCksXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLlVuc2VlbixcbiAgICAgIHNjaGVtYVZlcnNpb246IE1lc3NhZ2UuVkVSU0lPTl9ORUVERURfRk9SX0RJU1BMQVksXG4gICAgICAvLyBUT0RPOiBERVNLVE9QLTcyMlxuICAgICAgLy8gdGhpcyB0eXBlIGRvZXMgbm90IGZ1bGx5IGltcGxlbWVudCB0aGUgaW50ZXJmYWNlIGl0IGlzIGV4cGVjdGVkIHRvXG4gICAgfSBhcyB1bmtub3duIGFzIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcblxuICAgIGNvbnN0IGlkID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UsIHtcbiAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgfSk7XG4gICAgY29uc3QgbW9kZWwgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICBpZCxcbiAgICAgIG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgICAgLi4ubWVzc2FnZSxcbiAgICAgICAgaWQsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBpc1VudHJ1c3RlZCA9IGF3YWl0IHRoaXMuaXNVbnRydXN0ZWQoKTtcblxuICAgIHRoaXMudHJpZ2dlcignbmV3bWVzc2FnZScsIG1vZGVsKTtcblxuICAgIGNvbnN0IHV1aWQgPSB0aGlzLmdldCgndXVpZCcpO1xuICAgIC8vIEdyb3VwIGNhbGxzIGFyZSBhbHdheXMgd2l0aCBmb2xrcyB0aGF0IGhhdmUgYSBVVUlEXG4gICAgaWYgKGlzVW50cnVzdGVkICYmIHV1aWQpIHtcbiAgICAgIHdpbmRvdy5yZWR1eEFjdGlvbnMuY2FsbGluZy5rZXlDaGFuZ2VkKHsgdXVpZCB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBhZGRWZXJpZmllZENoYW5nZShcbiAgICB2ZXJpZmllZENoYW5nZUlkOiBzdHJpbmcsXG4gICAgdmVyaWZpZWQ6IGJvb2xlYW4sXG4gICAgb3B0aW9uczogeyBsb2NhbD86IGJvb2xlYW4gfSA9IHsgbG9jYWw6IHRydWUgfVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoaXNNZSh0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBsb2cuaW5mbygncmVmdXNpbmcgdG8gYWRkIHZlcmlmaWVkIGNoYW5nZSBhZHZpc29yeSBmb3Igb3VyIG93biBudW1iZXInKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBsYXN0TWVzc2FnZSA9IHRoaXMuZ2V0KCd0aW1lc3RhbXAnKSB8fCBEYXRlLm5vdygpO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICAnYWRkaW5nIHZlcmlmaWVkIGNoYW5nZSBhZHZpc29yeSBmb3InLFxuICAgICAgdGhpcy5pZEZvckxvZ2dpbmcoKSxcbiAgICAgIHZlcmlmaWVkQ2hhbmdlSWQsXG4gICAgICBsYXN0TWVzc2FnZVxuICAgICk7XG5cbiAgICBjb25zdCBzaG91bGRCZVVuc2VlbiA9ICFvcHRpb25zLmxvY2FsICYmICF2ZXJpZmllZDtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZW5lcmF0ZUd1aWQoKSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmlkLFxuICAgICAgbG9jYWw6IEJvb2xlYW4ob3B0aW9ucy5sb2NhbCksXG4gICAgICByZWFkU3RhdHVzOiBzaG91bGRCZVVuc2VlbiA/IFJlYWRTdGF0dXMuVW5yZWFkIDogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IHRpbWVzdGFtcCxcbiAgICAgIHJlY2VpdmVkX2F0OiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHNlZW5TdGF0dXM6IHNob3VsZEJlVW5zZWVuID8gU2VlblN0YXR1cy5VbnNlZW4gOiBTZWVuU3RhdHVzLlVuc2VlbixcbiAgICAgIHNlbnRfYXQ6IGxhc3RNZXNzYWdlLFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgdHlwZTogJ3ZlcmlmaWVkLWNoYW5nZScsXG4gICAgICB2ZXJpZmllZCxcbiAgICAgIHZlcmlmaWVkQ2hhbmdlZDogdmVyaWZpZWRDaGFuZ2VJZCxcbiAgICB9O1xuXG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UsIHtcbiAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgfSk7XG4gICAgY29uc3QgbW9kZWwgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICBtZXNzYWdlLmlkLFxuICAgICAgbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UobWVzc2FnZSlcbiAgICApO1xuXG4gICAgdGhpcy50cmlnZ2VyKCduZXdtZXNzYWdlJywgbW9kZWwpO1xuICAgIHRoaXMudXBkYXRlVW5yZWFkKCk7XG5cbiAgICBjb25zdCB1dWlkID0gdGhpcy5nZXRVdWlkKCk7XG4gICAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykgJiYgdXVpZCkge1xuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0QWxsR3JvdXBzSW52b2x2aW5nVXVpZCh1dWlkKS50aGVuKFxuICAgICAgICBncm91cHMgPT4ge1xuICAgICAgICAgIHdpbmRvdy5fLmZvckVhY2goZ3JvdXBzLCBncm91cCA9PiB7XG4gICAgICAgICAgICBncm91cC5hZGRWZXJpZmllZENoYW5nZSh0aGlzLmlkLCB2ZXJpZmllZCwgb3B0aW9ucyk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkQ2FsbEhpc3RvcnkoXG4gICAgY2FsbEhpc3RvcnlEZXRhaWxzOiBDYWxsSGlzdG9yeURldGFpbHNUeXBlLFxuICAgIHJlY2VpdmVkQXRDb3VudGVyOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbGV0IHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIGxldCB1bnJlYWQ6IGJvb2xlYW47XG4gICAgbGV0IGRldGFpbHNUb1NhdmU6IENhbGxIaXN0b3J5RGV0YWlsc1R5cGU7XG5cbiAgICBzd2l0Y2ggKGNhbGxIaXN0b3J5RGV0YWlscy5jYWxsTW9kZSkge1xuICAgICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICAgIHRpbWVzdGFtcCA9IGNhbGxIaXN0b3J5RGV0YWlscy5lbmRlZFRpbWU7XG4gICAgICAgIHVucmVhZCA9XG4gICAgICAgICAgIWNhbGxIaXN0b3J5RGV0YWlscy53YXNEZWNsaW5lZCAmJiAhY2FsbEhpc3RvcnlEZXRhaWxzLmFjY2VwdGVkVGltZTtcbiAgICAgICAgZGV0YWlsc1RvU2F2ZSA9IHtcbiAgICAgICAgICAuLi5jYWxsSGlzdG9yeURldGFpbHMsXG4gICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgfTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENhbGxNb2RlLkdyb3VwOlxuICAgICAgICB0aW1lc3RhbXAgPSBjYWxsSGlzdG9yeURldGFpbHMuc3RhcnRlZFRpbWU7XG4gICAgICAgIHVucmVhZCA9IGZhbHNlO1xuICAgICAgICBkZXRhaWxzVG9TYXZlID0gY2FsbEhpc3RvcnlEZXRhaWxzO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY2FsbEhpc3RvcnlEZXRhaWxzKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMuaWQsXG4gICAgICB0eXBlOiAnY2FsbC1oaXN0b3J5JyxcbiAgICAgIHNlbnRfYXQ6IHRpbWVzdGFtcCxcbiAgICAgIHJlY2VpdmVkX2F0OlxuICAgICAgICByZWNlaXZlZEF0Q291bnRlciB8fCB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHJlY2VpdmVkX2F0X21zOiB0aW1lc3RhbXAsXG4gICAgICByZWFkU3RhdHVzOiB1bnJlYWQgPyBSZWFkU3RhdHVzLlVucmVhZCA6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHNlZW5TdGF0dXM6IHVucmVhZCA/IFNlZW5TdGF0dXMuVW5zZWVuIDogU2VlblN0YXR1cy5Ob3RBcHBsaWNhYmxlLFxuICAgICAgY2FsbEhpc3RvcnlEZXRhaWxzOiBkZXRhaWxzVG9TYXZlLFxuICAgICAgLy8gVE9ETzogREVTS1RPUC03MjJcbiAgICB9IGFzIHVua25vd24gYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlO1xuXG4gICAgY29uc3QgaWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZSwge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgICBjb25zdCBtb2RlbCA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgIGlkLFxuICAgICAgbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2Uoe1xuICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICBpZCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMudHJpZ2dlcignbmV3bWVzc2FnZScsIG1vZGVsKTtcbiAgICB0aGlzLnVwZGF0ZVVucmVhZCgpO1xuICB9XG5cbiAgLyoqXG4gICAqIEFkZHMgYSBncm91cCBjYWxsIGhpc3RvcnkgbWVzc2FnZSBpZiBvbmUgaXMgbmVlZGVkLiBJdCB3b24ndCBhZGQgaGlzdG9yeSBtZXNzYWdlcyBmb3JcbiAgICogdGhlIHNhbWUgZ3JvdXAgY2FsbCBlcmEgSUQuXG4gICAqXG4gICAqIFJlc29sdmVzIHdpdGggYHRydWVgIGlmIGEgbmV3IG1lc3NhZ2Ugd2FzIGFkZGVkLCBhbmQgYGZhbHNlYCBvdGhlcndpc2UuXG4gICAqL1xuICBhc3luYyB1cGRhdGVDYWxsSGlzdG9yeUZvckdyb3VwQ2FsbChcbiAgICBlcmFJZDogc3RyaW5nLFxuICAgIGNyZWF0b3JVdWlkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgLy8gV2Ugd2FudCB0byB1cGRhdGUgdGhlIGNhY2hlIHF1aWNrbHkgaW4gY2FzZSB0aGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCBtdWx0aXBsZSB0aW1lcy5cbiAgICBjb25zdCBvbGRDYWNoZWRFcmFJZCA9IHRoaXMuY2FjaGVkTGF0ZXN0R3JvdXBDYWxsRXJhSWQ7XG4gICAgdGhpcy5jYWNoZWRMYXRlc3RHcm91cENhbGxFcmFJZCA9IGVyYUlkO1xuXG4gICAgY29uc3QgYWxyZWFkeUhhc01lc3NhZ2UgPVxuICAgICAgKG9sZENhY2hlZEVyYUlkICYmIG9sZENhY2hlZEVyYUlkID09PSBlcmFJZCkgfHxcbiAgICAgIChhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuaGFzR3JvdXBDYWxsSGlzdG9yeU1lc3NhZ2UodGhpcy5pZCwgZXJhSWQpKTtcblxuICAgIGlmIChhbHJlYWR5SGFzTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMuYWRkQ2FsbEhpc3RvcnkoXG4gICAgICB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY3JlYXRvclV1aWQsXG4gICAgICAgIGVyYUlkLFxuICAgICAgICBzdGFydGVkVGltZTogRGF0ZS5ub3coKSxcbiAgICAgIH0sXG4gICAgICB1bmRlZmluZWRcbiAgICApO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgYXN5bmMgYWRkUHJvZmlsZUNoYW5nZShcbiAgICBwcm9maWxlQ2hhbmdlOiB1bmtub3duLFxuICAgIGNvbnZlcnNhdGlvbklkPzogc3RyaW5nXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmlkLFxuICAgICAgdHlwZTogJ3Byb2ZpbGUtY2hhbmdlJyxcbiAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgIHJlY2VpdmVkX2F0OiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHJlY2VpdmVkX2F0X21zOiBub3csXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLk5vdEFwcGxpY2FibGUsXG4gICAgICBjaGFuZ2VkSWQ6IGNvbnZlcnNhdGlvbklkIHx8IHRoaXMuaWQsXG4gICAgICBwcm9maWxlQ2hhbmdlLFxuICAgICAgLy8gVE9ETzogREVTS1RPUC03MjJcbiAgICB9IGFzIHVua25vd24gYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlO1xuXG4gICAgY29uc3QgaWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZSwge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgICBjb25zdCBtb2RlbCA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgIGlkLFxuICAgICAgbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2Uoe1xuICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICBpZCxcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIHRoaXMudHJpZ2dlcignbmV3bWVzc2FnZScsIG1vZGVsKTtcblxuICAgIGNvbnN0IHV1aWQgPSB0aGlzLmdldFV1aWQoKTtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSAmJiB1dWlkKSB7XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRBbGxHcm91cHNJbnZvbHZpbmdVdWlkKHV1aWQpLnRoZW4oXG4gICAgICAgIGdyb3VwcyA9PiB7XG4gICAgICAgICAgd2luZG93Ll8uZm9yRWFjaChncm91cHMsIGdyb3VwID0+IHtcbiAgICAgICAgICAgIGdyb3VwLmFkZFByb2ZpbGVDaGFuZ2UocHJvZmlsZUNoYW5nZSwgdGhpcy5pZCk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgYWRkTm90aWZpY2F0aW9uKFxuICAgIHR5cGU6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVsndHlwZSddLFxuICAgIGV4dHJhOiBQYXJ0aWFsPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4gPSB7fVxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgbWVzc2FnZTogUGFydGlhbDxNZXNzYWdlQXR0cmlidXRlc1R5cGU+ID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMuaWQsXG4gICAgICB0eXBlLFxuICAgICAgc2VudF9hdDogbm93LFxuICAgICAgcmVjZWl2ZWRfYXQ6IHdpbmRvdy5TaWduYWwuVXRpbC5pbmNyZW1lbnRNZXNzYWdlQ291bnRlcigpLFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IG5vdyxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHNlZW5TdGF0dXM6IFNlZW5TdGF0dXMuTm90QXBwbGljYWJsZSxcblxuICAgICAgLi4uZXh0cmEsXG4gICAgfTtcblxuICAgIGNvbnN0IGlkID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKFxuICAgICAgLy8gVE9ETzogREVTS1RPUC03MjJcbiAgICAgIG1lc3NhZ2UgYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAgICAge1xuICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgfVxuICAgICk7XG4gICAgY29uc3QgbW9kZWwgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIoXG4gICAgICBpZCxcbiAgICAgIG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgICAgLi4uKG1lc3NhZ2UgYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSxcbiAgICAgICAgaWQsXG4gICAgICB9KVxuICAgICk7XG5cbiAgICB0aGlzLnRyaWdnZXIoJ25ld21lc3NhZ2UnLCBtb2RlbCk7XG5cbiAgICByZXR1cm4gaWQ7XG4gIH1cblxuICBhc3luYyBtYXliZVNldFBlbmRpbmdVbml2ZXJzYWxUaW1lcihcbiAgICBoYXNVc2VySW5pdGlhdGVkTWVzc2FnZXM6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuaXNTTVNPbmx5KCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoaGFzVXNlckluaXRpYXRlZE1lc3NhZ2VzKSB7XG4gICAgICBhd2FpdCB0aGlzLm1heWJlUmVtb3ZlVW5pdmVyc2FsVGltZXIoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAodGhpcy5nZXQoJ3BlbmRpbmdVbml2ZXJzYWxUaW1lcicpIHx8IHRoaXMuZ2V0KCdleHBpcmVUaW1lcicpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXhwaXJlVGltZXIgPSB1bml2ZXJzYWxFeHBpcmVUaW1lci5nZXQoKTtcbiAgICBpZiAoIWV4cGlyZVRpbWVyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oXG4gICAgICBgbWF5YmVTZXRQZW5kaW5nVW5pdmVyc2FsVGltZXIoJHt0aGlzLmlkRm9yTG9nZ2luZygpfSk6IGFkZGVkIG5vdGlmaWNhdGlvbmBcbiAgICApO1xuICAgIGNvbnN0IG5vdGlmaWNhdGlvbklkID0gYXdhaXQgdGhpcy5hZGROb3RpZmljYXRpb24oXG4gICAgICAndW5pdmVyc2FsLXRpbWVyLW5vdGlmaWNhdGlvbidcbiAgICApO1xuICAgIHRoaXMuc2V0KCdwZW5kaW5nVW5pdmVyc2FsVGltZXInLCBub3RpZmljYXRpb25JZCk7XG4gIH1cblxuICBhc3luYyBtYXliZUFwcGx5VW5pdmVyc2FsVGltZXIoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgLy8gQ2hlY2sgaWYgd2UgaGFkIGEgbm90aWZpY2F0aW9uXG4gICAgaWYgKCEoYXdhaXQgdGhpcy5tYXliZVJlbW92ZVVuaXZlcnNhbFRpbWVyKCkpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gV2UgYWxyZWFkeSBoYXZlIGFuIGV4cGlyYXRpb24gdGltZXJcbiAgICBpZiAodGhpcy5nZXQoJ2V4cGlyZVRpbWVyJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBleHBpcmVUaW1lciA9IHVuaXZlcnNhbEV4cGlyZVRpbWVyLmdldCgpO1xuICAgIGlmIChleHBpcmVUaW1lcikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBtYXliZUFwcGx5VW5pdmVyc2FsVGltZXIoJHt0aGlzLmlkRm9yTG9nZ2luZygpfSk6IGFwcGx5aW5nIHRpbWVyYFxuICAgICAgKTtcblxuICAgICAgYXdhaXQgdGhpcy51cGRhdGVFeHBpcmF0aW9uVGltZXIoZXhwaXJlVGltZXIsIHtcbiAgICAgICAgcmVhc29uOiAnbWF5YmVBcHBseVVuaXZlcnNhbFRpbWVyJyxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIG1heWJlUmVtb3ZlVW5pdmVyc2FsVGltZXIoKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3Qgbm90aWZpY2F0aW9uSWQgPSB0aGlzLmdldCgncGVuZGluZ1VuaXZlcnNhbFRpbWVyJyk7XG4gICAgaWYgKCFub3RpZmljYXRpb25JZCkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KCdwZW5kaW5nVW5pdmVyc2FsVGltZXInLCB1bmRlZmluZWQpO1xuICAgIGxvZy5pbmZvKFxuICAgICAgYG1heWJlUmVtb3ZlVW5pdmVyc2FsVGltZXIoJHt0aGlzLmlkRm9yTG9nZ2luZygpfSk6IHJlbW92ZWQgbm90aWZpY2F0aW9uYFxuICAgICk7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQobm90aWZpY2F0aW9uSWQpO1xuICAgIGlmIChtZXNzYWdlKSB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlTWVzc2FnZShtZXNzYWdlLmlkKTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBhc3luYyBhZGRDaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24oXG4gICAgb2xkVmFsdWU6IHN0cmluZyxcbiAgICBuZXdWYWx1ZTogc3RyaW5nXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHNvdXJjZVV1aWQgPSB0aGlzLmdldENoZWNrZWRVdWlkKFxuICAgICAgJ0NoYW5nZSBudW1iZXIgbm90aWZpY2F0aW9uIHdpdGhvdXQgdXVpZCdcbiAgICApO1xuXG4gICAgY29uc3QgeyBzdG9yYWdlIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICBpZiAoc3RvcmFnZS51c2VyLmdldE91clV1aWRLaW5kKHNvdXJjZVV1aWQpICE9PSBVVUlES2luZC5Vbmtub3duKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYENvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9OiBub3QgYWRkaW5nIGNoYW5nZSBudW1iZXIgYCArXG4gICAgICAgICAgJ25vdGlmaWNhdGlvbiBmb3Igb3Vyc2VsdmVzJ1xuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBDb252ZXJzYXRpb24gJHt0aGlzLmlkRm9yTG9nZ2luZygpfTogYWRkaW5nIGNoYW5nZSBudW1iZXIgYCArXG4gICAgICAgIGBub3RpZmljYXRpb24gZm9yICR7c291cmNlVXVpZC50b1N0cmluZygpfSBmcm9tICR7b2xkVmFsdWV9IHRvICR7bmV3VmFsdWV9YFxuICAgICk7XG5cbiAgICBjb25zdCBjb252b3MgPSBbXG4gICAgICB0aGlzLFxuICAgICAgLi4uKGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldEFsbEdyb3Vwc0ludm9sdmluZ1V1aWQoXG4gICAgICAgIHNvdXJjZVV1aWRcbiAgICAgICkpLFxuICAgIF07XG5cbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGNvbnZvcy5tYXAoY29udm8gPT4ge1xuICAgICAgICByZXR1cm4gY29udm8uYWRkTm90aWZpY2F0aW9uKCdjaGFuZ2UtbnVtYmVyLW5vdGlmaWNhdGlvbicsIHtcbiAgICAgICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgICAgICAgc291cmNlVXVpZDogc291cmNlVXVpZC50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIG9uUmVhZE1lc3NhZ2UobWVzc2FnZTogTWVzc2FnZU1vZGVsLCByZWFkQXQ/OiBudW1iZXIpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBXZSBtYXJrIGFzIHJlYWQgZXZlcnl0aGluZyBvbGRlciB0aGFuIHRoaXMgbWVzc2FnZSAtIHRvIGNsZWFuIHVwIG9sZCBzdHVmZlxuICAgIC8vICAgc3RpbGwgbWFya2VkIHVucmVhZCBpbiB0aGUgZGF0YWJhc2UuIElmIHRoZSB1c2VyIGdlbmVyYWxseSBkb2Vzbid0IHJlYWQgaW5cbiAgICAvLyAgIHRoZSBkZXNrdG9wIGFwcCwgc28gdGhlIGRlc2t0b3AgYXBwIG9ubHkgZ2V0cyByZWFkIHN5bmNzLCB3ZSBjYW4gdmVyeVxuICAgIC8vICAgZWFzaWx5IGVuZCB1cCB3aXRoIG1lc3NhZ2VzIG5ldmVyIG1hcmtlZCBhcyByZWFkIChvdXIgcHJldmlvdXMgZWFybHkgcmVhZFxuICAgIC8vICAgc3luYyBoYW5kbGluZywgcmVhZCBzeW5jcyBuZXZlciBzZW50IGJlY2F1c2UgYXBwIHdhcyBvZmZsaW5lKVxuXG4gICAgLy8gV2UgcXVldWUgaXQgYmVjYXVzZSB3ZSBvZnRlbiBnZXQgYSB3aG9sZSBsb3Qgb2YgcmVhZCBzeW5jcyBhdCBvbmNlLCBhbmRcbiAgICAvLyAgIHRoZWlyIG1hcmtSZWFkIGNhbGxzIGNvdWxkIHZlcnkgZWFzaWx5IG92ZXJsYXAgZ2l2ZW4gdGhlIGFzeW5jIHB1bGwgZnJvbSBEQi5cblxuICAgIC8vIExhc3RseSwgd2UgZG9uJ3Qgc2VuZCByZWFkIHN5bmNzIGZvciBhbnkgbWVzc2FnZSBtYXJrZWQgcmVhZCBkdWUgdG8gYSByZWFkXG4gICAgLy8gICBzeW5jLiBUaGF0J3MgYSBub3RpZmljYXRpb24gZXhwbG9zaW9uIHdlIGRvbid0IG5lZWQuXG4gICAgcmV0dXJuIHRoaXMucXVldWVKb2IoJ29uUmVhZE1lc3NhZ2UnLCAoKSA9PlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIHRoaXMubWFya1JlYWQobWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0JykhLCB7XG4gICAgICAgIG5ld2VzdFNlbnRBdDogbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgICAgc2VuZFJlYWRSZWNlaXB0czogZmFsc2UsXG4gICAgICAgIHJlYWRBdCxcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHZhbGlkYXRlKGF0dHJpYnV0ZXMgPSB0aGlzLmF0dHJpYnV0ZXMpOiBzdHJpbmcgfCBudWxsIHtcbiAgICBjb25zdCByZXF1aXJlZCA9IFsndHlwZSddO1xuICAgIGNvbnN0IG1pc3NpbmcgPSB3aW5kb3cuXy5maWx0ZXIocmVxdWlyZWQsIGF0dHIgPT4gIWF0dHJpYnV0ZXNbYXR0cl0pO1xuICAgIGlmIChtaXNzaW5nLmxlbmd0aCkge1xuICAgICAgcmV0dXJuIGBDb252ZXJzYXRpb24gbXVzdCBoYXZlICR7bWlzc2luZ31gO1xuICAgIH1cblxuICAgIGlmIChhdHRyaWJ1dGVzLnR5cGUgIT09ICdwcml2YXRlJyAmJiBhdHRyaWJ1dGVzLnR5cGUgIT09ICdncm91cCcpIHtcbiAgICAgIHJldHVybiBgSW52YWxpZCBjb252ZXJzYXRpb24gdHlwZTogJHthdHRyaWJ1dGVzLnR5cGV9YDtcbiAgICB9XG5cbiAgICBjb25zdCBhdExlYXN0T25lT2YgPSBbJ2UxNjQnLCAndXVpZCcsICdncm91cElkJ107XG4gICAgY29uc3QgaGFzQXRMZWFzdE9uZU9mID1cbiAgICAgIHdpbmRvdy5fLmZpbHRlcihhdExlYXN0T25lT2YsIGF0dHIgPT4gYXR0cmlidXRlc1thdHRyXSkubGVuZ3RoID4gMDtcblxuICAgIGlmICghaGFzQXRMZWFzdE9uZU9mKSB7XG4gICAgICByZXR1cm4gJ01pc3Npbmcgb25lIG9mIGUxNjQsIHV1aWQsIG9yIGdyb3VwSWQnO1xuICAgIH1cblxuICAgIGNvbnN0IGVycm9yID0gdGhpcy52YWxpZGF0ZU51bWJlcigpIHx8IHRoaXMudmFsaWRhdGVVdWlkKCk7XG5cbiAgICBpZiAoZXJyb3IpIHtcbiAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9XG5cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhbGlkYXRlTnVtYmVyKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpICYmIHRoaXMuZ2V0KCdlMTY0JykpIHtcbiAgICAgIGNvbnN0IHJlZ2lvbkNvZGUgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3JlZ2lvbkNvZGUnKTtcbiAgICAgIGlmICghcmVnaW9uQ29kZSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vIHJlZ2lvbiBjb2RlJyk7XG4gICAgICB9XG4gICAgICBjb25zdCBudW1iZXIgPSBwYXJzZU51bWJlcihcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgdGhpcy5nZXQoJ2UxNjQnKSEsXG4gICAgICAgIHJlZ2lvbkNvZGVcbiAgICAgICk7XG4gICAgICBpZiAobnVtYmVyLmlzVmFsaWROdW1iZXIpIHtcbiAgICAgICAgdGhpcy5zZXQoeyBlMTY0OiBudW1iZXIuZTE2NCB9KTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGxldCBlcnJvck1lc3NhZ2U6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICAgIGlmIChudW1iZXIuZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICBlcnJvck1lc3NhZ2UgPSBudW1iZXIuZXJyb3IubWVzc2FnZTtcbiAgICAgIH0gZWxzZSBpZiAodHlwZW9mIG51bWJlci5lcnJvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgZXJyb3JNZXNzYWdlID0gbnVtYmVyLmVycm9yO1xuICAgICAgfVxuICAgICAgcmV0dXJuIGVycm9yTWVzc2FnZSB8fCAnSW52YWxpZCBwaG9uZSBudW1iZXInO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgdmFsaWRhdGVVdWlkKCk6IHN0cmluZyB8IG51bGwge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpICYmIHRoaXMuZ2V0KCd1dWlkJykpIHtcbiAgICAgIGlmIChpc1ZhbGlkVXVpZCh0aGlzLmdldCgndXVpZCcpKSkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuICdJbnZhbGlkIFVVSUQnO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgcXVldWVKb2I8VD4oXG4gICAgbmFtZTogc3RyaW5nLFxuICAgIGNhbGxiYWNrOiAoYWJvcnRTaWduYWw6IEFib3J0U2lnbmFsKSA9PiBQcm9taXNlPFQ+XG4gICk6IFByb21pc2U8VD4ge1xuICAgIHRoaXMuam9iUXVldWUgPSB0aGlzLmpvYlF1ZXVlIHx8IG5ldyB3aW5kb3cuUFF1ZXVlKHsgY29uY3VycmVuY3k6IDEgfSk7XG5cbiAgICBjb25zdCB0YXNrV2l0aFRpbWVvdXQgPSBjcmVhdGVUYXNrV2l0aFRpbWVvdXQoXG4gICAgICBjYWxsYmFjayxcbiAgICAgIGBjb252ZXJzYXRpb24gJHt0aGlzLmlkRm9yTG9nZ2luZygpfWBcbiAgICApO1xuXG4gICAgY29uc3QgYWJvcnRDb250cm9sbGVyID0gbmV3IEFib3J0Q29udHJvbGxlcigpO1xuICAgIGNvbnN0IHsgc2lnbmFsOiBhYm9ydFNpZ25hbCB9ID0gYWJvcnRDb250cm9sbGVyO1xuXG4gICAgY29uc3QgcXVldWVkQXQgPSBEYXRlLm5vdygpO1xuICAgIHJldHVybiB0aGlzLmpvYlF1ZXVlLmFkZChhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzdGFydGVkQXQgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3Qgd2FpdFRpbWUgPSBzdGFydGVkQXQgLSBxdWV1ZWRBdDtcblxuICAgICAgaWYgKHdhaXRUaW1lID4gSk9CX1JFUE9SVElOR19USFJFU0hPTERfTVMpIHtcbiAgICAgICAgbG9nLmluZm8oYENvbnZlcnNhdGlvbiBqb2IgJHtuYW1lfSB3YXMgYmxvY2tlZCBmb3IgJHt3YWl0VGltZX1tc2ApO1xuICAgICAgfVxuXG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gYXdhaXQgdGFza1dpdGhUaW1lb3V0KGFib3J0U2lnbmFsKTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0ZWRBdDtcblxuICAgICAgICBpZiAoZHVyYXRpb24gPiBKT0JfUkVQT1JUSU5HX1RIUkVTSE9MRF9NUykge1xuICAgICAgICAgIGxvZy5pbmZvKGBDb252ZXJzYXRpb24gam9iICR7bmFtZX0gdG9vayAke2R1cmF0aW9ufW1zYCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfVxuXG4gIGlzQWRtaW4oaWQ6IHN0cmluZyk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkID0gVVVJRC5jaGVja2VkTG9va3VwKGlkKS50b1N0cmluZygpO1xuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLmdldCgnbWVtYmVyc1YyJykgfHwgW107XG4gICAgY29uc3QgbWVtYmVyID0gbWVtYmVycy5maW5kKHggPT4geC51dWlkID09PSB1dWlkKTtcbiAgICBpZiAoIW1lbWJlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IE1FTUJFUl9ST0xFUyA9IFByb3RvLk1lbWJlci5Sb2xlO1xuXG4gICAgcmV0dXJuIG1lbWJlci5yb2xlID09PSBNRU1CRVJfUk9MRVMuQURNSU5JU1RSQVRPUjtcbiAgfVxuXG4gIGdldFV1aWQoKTogVVVJRCB8IHVuZGVmaW5lZCB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHZhbHVlID0gdGhpcy5nZXQoJ3V1aWQnKTtcbiAgICAgIHJldHVybiB2YWx1ZSAmJiBuZXcgVVVJRCh2YWx1ZSk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGdldFV1aWQoKTogZmFpbGVkIHRvIG9idGFpbiBjb252ZXJzYXRpb24oJHt0aGlzLmlkfSkgdXVpZCBkdWUgdG9gLFxuICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyKVxuICAgICAgKTtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgZ2V0Q2hlY2tlZFV1aWQocmVhc29uOiBzdHJpbmcpOiBVVUlEIHtcbiAgICBjb25zdCByZXN1bHQgPSB0aGlzLmdldFV1aWQoKTtcbiAgICBzdHJpY3RBc3NlcnQocmVzdWx0ICE9PSB1bmRlZmluZWQsIHJlYXNvbik7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0TWVtYmVyc2hpcHMoKTogQXJyYXk8e1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICAgIGlzQWRtaW46IGJvb2xlYW47XG4gIH0+IHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVycyA9IHRoaXMuZ2V0KCdtZW1iZXJzVjInKSB8fCBbXTtcbiAgICByZXR1cm4gbWVtYmVycy5tYXAobWVtYmVyID0+ICh7XG4gICAgICBpc0FkbWluOiBtZW1iZXIucm9sZSA9PT0gUHJvdG8uTWVtYmVyLlJvbGUuQURNSU5JU1RSQVRPUixcbiAgICAgIHV1aWQ6IG1lbWJlci51dWlkLFxuICAgIH0pKTtcbiAgfVxuXG4gIGdldEdyb3VwTGluaygpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLmdldCgnZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQnKSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICByZXR1cm4gd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRHcm91cExpbmsodGhpcyk7XG4gIH1cblxuICBwcml2YXRlIGdldFBlbmRpbmdNZW1iZXJzaGlwcygpOiBBcnJheTx7XG4gICAgYWRkZWRCeVVzZXJJZD86IFVVSURTdHJpbmdUeXBlO1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB9PiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIFtdO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLmdldCgncGVuZGluZ01lbWJlcnNWMicpIHx8IFtdO1xuICAgIHJldHVybiBtZW1iZXJzLm1hcChtZW1iZXIgPT4gKHtcbiAgICAgIGFkZGVkQnlVc2VySWQ6IG1lbWJlci5hZGRlZEJ5VXNlcklkLFxuICAgICAgdXVpZDogbWVtYmVyLnV1aWQsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRQZW5kaW5nQXBwcm92YWxNZW1iZXJzaGlwcygpOiBBcnJheTx7IHV1aWQ6IFVVSURTdHJpbmdUeXBlIH0+IHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gW107XG4gICAgfVxuXG4gICAgY29uc3QgbWVtYmVycyA9IHRoaXMuZ2V0KCdwZW5kaW5nQWRtaW5BcHByb3ZhbFYyJykgfHwgW107XG4gICAgcmV0dXJuIG1lbWJlcnMubWFwKG1lbWJlciA9PiAoe1xuICAgICAgdXVpZDogbWVtYmVyLnV1aWQsXG4gICAgfSkpO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRCYW5uZWRNZW1iZXJzaGlwcygpOiBBcnJheTxVVUlEU3RyaW5nVHlwZT4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBbXTtcbiAgICB9XG5cbiAgICByZXR1cm4gKHRoaXMuZ2V0KCdiYW5uZWRNZW1iZXJzVjInKSB8fCBbXSkubWFwKG1lbWJlciA9PiBtZW1iZXIudXVpZCk7XG4gIH1cblxuICBnZXRNZW1iZXJzKFxuICAgIG9wdGlvbnM6IHsgaW5jbHVkZVBlbmRpbmdNZW1iZXJzPzogYm9vbGVhbiB9ID0ge31cbiAgKTogQXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+IHtcbiAgICByZXR1cm4gY29tcGFjdChcbiAgICAgIGdldENvbnZlcnNhdGlvbk1lbWJlcnModGhpcy5hdHRyaWJ1dGVzLCBvcHRpb25zKS5tYXAoY29udmVyc2F0aW9uQXR0cnMgPT5cbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbkF0dHJzLmlkKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICBjYW5CZUFubm91bmNlbWVudEdyb3VwKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzQW5ub3VuY2VtZW50R3JvdXBSZWFkeSgpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBnZXRNZW1iZXJJZHMoKTogQXJyYXk8c3RyaW5nPiB7XG4gICAgY29uc3QgbWVtYmVycyA9IHRoaXMuZ2V0TWVtYmVycygpO1xuICAgIHJldHVybiBtZW1iZXJzLm1hcChtZW1iZXIgPT4gbWVtYmVyLmlkKTtcbiAgfVxuXG4gIGdldE1lbWJlclV1aWRzKCk6IEFycmF5PFVVSUQ+IHtcbiAgICBjb25zdCBtZW1iZXJzID0gdGhpcy5nZXRNZW1iZXJzKCk7XG4gICAgcmV0dXJuIG1lbWJlcnMubWFwKG1lbWJlciA9PiB7XG4gICAgICByZXR1cm4gbWVtYmVyLmdldENoZWNrZWRVdWlkKCdHcm91cCBtZW1iZXIgd2l0aG91dCB1dWlkJyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRSZWNpcGllbnRzKHtcbiAgICBpbmNsdWRlUGVuZGluZ01lbWJlcnMsXG4gICAgZXh0cmFDb252ZXJzYXRpb25zRm9yU2VuZCxcbiAgfToge1xuICAgIGluY2x1ZGVQZW5kaW5nTWVtYmVycz86IGJvb2xlYW47XG4gICAgZXh0cmFDb252ZXJzYXRpb25zRm9yU2VuZD86IEFycmF5PHN0cmluZz47XG4gIH0gPSB7fSk6IEFycmF5PHN0cmluZz4ge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgcmV0dXJuIFt0aGlzLmdldFNlbmRUYXJnZXQoKSFdO1xuICAgIH1cblxuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLmdldE1lbWJlcnMoeyBpbmNsdWRlUGVuZGluZ01lbWJlcnMgfSk7XG5cbiAgICAvLyBUaGVyZSBhcmUgY2FzZXMgd2hlcmUgd2UgbmVlZCB0byBzZW5kIHRvIHNvbWVvbmUgd2UganVzdCByZW1vdmVkIGZyb20gdGhlIGdyb3VwLCB0b1xuICAgIC8vICAgbGV0IHRoZW0ga25vdyB0aGF0IHdlIHJlbW92ZWQgdGhlbS4gSW4gdGhhdCBjYXNlLCB3ZSBuZWVkIHRvIHNlbmQgdG8gbW9yZSB0aGFuXG4gICAgLy8gICBhcmUgY3VycmVudGx5IGluIHRoZSBncm91cC5cbiAgICBjb25zdCBleHRyYUNvbnZlcnNhdGlvbnMgPSBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kXG4gICAgICA/IGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmRcbiAgICAgICAgICAubWFwKGlkID0+IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZCkpXG4gICAgICAgICAgLmZpbHRlcihpc05vdE5pbClcbiAgICAgIDogW107XG5cbiAgICBjb25zdCB1bmlxdWUgPSBleHRyYUNvbnZlcnNhdGlvbnMubGVuZ3RoXG4gICAgICA/IHdpbmRvdy5fLnVuaXF1ZShbLi4ubWVtYmVycywgLi4uZXh0cmFDb252ZXJzYXRpb25zXSlcbiAgICAgIDogbWVtYmVycztcblxuICAgIC8vIEVsaW1pbmF0ZSBvdXJzZWxmXG4gICAgcmV0dXJuIHdpbmRvdy5fLmNvbXBhY3QoXG4gICAgICB1bmlxdWUubWFwKG1lbWJlciA9PlxuICAgICAgICBpc01lKG1lbWJlci5hdHRyaWJ1dGVzKSA/IG51bGwgOiBtZW1iZXIuZ2V0U2VuZFRhcmdldCgpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIE1lbWJlcnMgaXMgYWxsIHBlb3BsZSBpbiB0aGUgZ3JvdXBcbiAgZ2V0TWVtYmVyQ29udmVyc2F0aW9uSWRzKCk6IFNldDxzdHJpbmc+IHtcbiAgICByZXR1cm4gbmV3IFNldChtYXAodGhpcy5nZXRNZW1iZXJzKCksIGNvbnZlcnNhdGlvbiA9PiBjb252ZXJzYXRpb24uaWQpKTtcbiAgfVxuXG4gIC8vIFJlY2lwaWVudHMgaW5jbHVkZXMgb25seSB0aGUgcGVvcGxlIHdlJ2xsIGFjdHVhbGx5IHNlbmQgdG8gZm9yIHRoaXMgY29udmVyc2F0aW9uXG4gIGdldFJlY2lwaWVudENvbnZlcnNhdGlvbklkcygpOiBTZXQ8c3RyaW5nPiB7XG4gICAgY29uc3QgcmVjaXBpZW50cyA9IHRoaXMuZ2V0UmVjaXBpZW50cygpO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkcyA9IHJlY2lwaWVudHMubWFwKGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoXG4gICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICdwcml2YXRlJ1xuICAgICAgKTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICAnZ2V0UmVjaXBpZW50Q29udmVyc2F0aW9uSWRzIHNob3VsZCBoYXZlIGNyZWF0ZWQgY29udmVyc2F0aW9uISdcbiAgICAgICk7XG4gICAgICByZXR1cm4gY29udmVyc2F0aW9uLmlkO1xuICAgIH0pO1xuXG4gICAgcmV0dXJuIG5ldyBTZXQoY29udmVyc2F0aW9uSWRzKTtcbiAgfVxuXG4gIGFzeW5jIGdldFF1b3RlQXR0YWNobWVudChcbiAgICBhdHRhY2htZW50cz86IEFycmF5PFdoYXRJc1RoaXM+LFxuICAgIHByZXZpZXc/OiBBcnJheTxXaGF0SXNUaGlzPixcbiAgICBzdGlja2VyPzogV2hhdElzVGhpc1xuICApOiBQcm9taXNlPFdoYXRJc1RoaXM+IHtcbiAgICBpZiAoYXR0YWNobWVudHMgJiYgYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBhdHRhY2htZW50c1RvVXNlID0gQXJyYXkuZnJvbSh0YWtlKGF0dGFjaG1lbnRzLCAxKSk7XG4gICAgICBjb25zdCBpc0dJRlF1b3RlID0gaXNHSUYoYXR0YWNobWVudHNUb1VzZSk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgbWFwKGF0dGFjaG1lbnRzVG9Vc2UsIGFzeW5jIGF0dGFjaG1lbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgcGF0aCwgZmlsZU5hbWUsIHRodW1ibmFpbCwgY29udGVudFR5cGUgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICBpZiAoIXBhdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBpc0dJRlF1b3RlID8gSU1BR0VfR0lGIDogY29udGVudFR5cGUsXG4gICAgICAgICAgICAgIC8vIE91ciBwcm90b3MgbGlicmFyeSBjb21wbGFpbnMgYWJvdXQgdGhpcyBmaWVsZCBiZWluZyB1bmRlZmluZWQsIHNvIHdlXG4gICAgICAgICAgICAgIC8vICAgZm9yY2UgaXQgdG8gbnVsbFxuICAgICAgICAgICAgICBmaWxlTmFtZTogZmlsZU5hbWUgfHwgbnVsbCxcbiAgICAgICAgICAgICAgdGh1bWJuYWlsOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgY29udGVudFR5cGU6IGlzR0lGUXVvdGUgPyBJTUFHRV9HSUYgOiBjb250ZW50VHlwZSxcbiAgICAgICAgICAgIC8vIE91ciBwcm90b3MgbGlicmFyeSBjb21wbGFpbnMgYWJvdXQgdGhpcyBmaWVsZCBiZWluZyB1bmRlZmluZWQsIHNvIHdlIGZvcmNlXG4gICAgICAgICAgICAvLyAgIGl0IHRvIG51bGxcbiAgICAgICAgICAgIGZpbGVOYW1lOiBmaWxlTmFtZSB8fCBudWxsLFxuICAgICAgICAgICAgdGh1bWJuYWlsOiB0aHVtYm5haWxcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAuLi4oYXdhaXQgbG9hZEF0dGFjaG1lbnREYXRhKHRodW1ibmFpbCkpLFxuICAgICAgICAgICAgICAgICAgb2JqZWN0VXJsOiBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKHRodW1ibmFpbC5wYXRoKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAocHJldmlldyAmJiBwcmV2aWV3Lmxlbmd0aCkge1xuICAgICAgY29uc3QgcHJldmlld3NUb1VzZSA9IHRha2UocHJldmlldywgMSk7XG5cbiAgICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgICAgbWFwKHByZXZpZXdzVG9Vc2UsIGFzeW5jIGF0dGFjaG1lbnQgPT4ge1xuICAgICAgICAgIGNvbnN0IHsgaW1hZ2UgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICAgICAgICBpZiAoIWltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgICAgICAgICAgLy8gT3VyIHByb3RvcyBsaWJyYXJ5IGNvbXBsYWlucyBhYm91dCB0aGVzZSBmaWVsZHMgYmVpbmcgdW5kZWZpbmVkLCBzbyB3ZVxuICAgICAgICAgICAgICAvLyAgIGZvcmNlIHRoZW0gdG8gbnVsbFxuICAgICAgICAgICAgICBmaWxlTmFtZTogbnVsbCxcbiAgICAgICAgICAgICAgdGh1bWJuYWlsOiBudWxsLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCB7IGNvbnRlbnRUeXBlIH0gPSBpbWFnZTtcblxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICBjb250ZW50VHlwZSxcbiAgICAgICAgICAgIC8vIE91ciBwcm90b3MgbGlicmFyeSBjb21wbGFpbnMgYWJvdXQgdGhpcyBmaWVsZCBiZWluZyB1bmRlZmluZWQsIHNvIHdlXG4gICAgICAgICAgICAvLyAgIGZvcmNlIGl0IHRvIG51bGxcbiAgICAgICAgICAgIGZpbGVOYW1lOiBudWxsLFxuICAgICAgICAgICAgdGh1bWJuYWlsOiBpbWFnZVxuICAgICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICAgIC4uLihhd2FpdCBsb2FkQXR0YWNobWVudERhdGEoaW1hZ2UpKSxcbiAgICAgICAgICAgICAgICAgIG9iamVjdFVybDogZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChpbWFnZS5wYXRoKSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogbnVsbCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoc3RpY2tlciAmJiBzdGlja2VyLmRhdGEgJiYgc3RpY2tlci5kYXRhLnBhdGgpIHtcbiAgICAgIGNvbnN0IHsgcGF0aCwgY29udGVudFR5cGUgfSA9IHN0aWNrZXIuZGF0YTtcblxuICAgICAgcmV0dXJuIFtcbiAgICAgICAge1xuICAgICAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgICAgIC8vIE91ciBwcm90b3MgbGlicmFyeSBjb21wbGFpbnMgYWJvdXQgdGhpcyBmaWVsZCBiZWluZyB1bmRlZmluZWQsIHNvIHdlXG4gICAgICAgICAgLy8gICBmb3JjZSBpdCB0byBudWxsXG4gICAgICAgICAgZmlsZU5hbWU6IG51bGwsXG4gICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICAuLi4oYXdhaXQgbG9hZEF0dGFjaG1lbnREYXRhKHN0aWNrZXIuZGF0YSkpLFxuICAgICAgICAgICAgb2JqZWN0VXJsOiBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKHBhdGgpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGFzeW5jIG1ha2VRdW90ZShxdW90ZWRNZXNzYWdlOiBNZXNzYWdlTW9kZWwpOiBQcm9taXNlPFF1b3RlZE1lc3NhZ2VUeXBlPiB7XG4gICAgY29uc3QgeyBnZXROYW1lIH0gPSBFbWJlZGRlZENvbnRhY3Q7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBjb25zdCBjb250YWN0ID0gZ2V0Q29udGFjdChxdW90ZWRNZXNzYWdlLmF0dHJpYnV0ZXMpITtcbiAgICBjb25zdCBhdHRhY2htZW50cyA9IHF1b3RlZE1lc3NhZ2UuZ2V0KCdhdHRhY2htZW50cycpO1xuICAgIGNvbnN0IHByZXZpZXcgPSBxdW90ZWRNZXNzYWdlLmdldCgncHJldmlldycpO1xuICAgIGNvbnN0IHN0aWNrZXIgPSBxdW90ZWRNZXNzYWdlLmdldCgnc3RpY2tlcicpO1xuXG4gICAgY29uc3QgYm9keSA9IHF1b3RlZE1lc3NhZ2UuZ2V0KCdib2R5Jyk7XG4gICAgY29uc3QgZW1iZWRkZWRDb250YWN0ID0gcXVvdGVkTWVzc2FnZS5nZXQoJ2NvbnRhY3QnKTtcbiAgICBjb25zdCBlbWJlZGRlZENvbnRhY3ROYW1lID1cbiAgICAgIGVtYmVkZGVkQ29udGFjdCAmJiBlbWJlZGRlZENvbnRhY3QubGVuZ3RoID4gMFxuICAgICAgICA/IGdldE5hbWUoZW1iZWRkZWRDb250YWN0WzBdKVxuICAgICAgICA6ICcnO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF1dGhvclV1aWQ6IGNvbnRhY3QuZ2V0KCd1dWlkJyksXG4gICAgICBhdHRhY2htZW50czogaXNUYXBUb1ZpZXcocXVvdGVkTWVzc2FnZS5hdHRyaWJ1dGVzKVxuICAgICAgICA/IFt7IGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLCBmaWxlTmFtZTogbnVsbCB9XVxuICAgICAgICA6IGF3YWl0IHRoaXMuZ2V0UXVvdGVBdHRhY2htZW50KGF0dGFjaG1lbnRzLCBwcmV2aWV3LCBzdGlja2VyKSxcbiAgICAgIGJvZHlSYW5nZXM6IHF1b3RlZE1lc3NhZ2UuZ2V0KCdib2R5UmFuZ2VzJyksXG4gICAgICBpZDogcXVvdGVkTWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgIGlzVmlld09uY2U6IGlzVGFwVG9WaWV3KHF1b3RlZE1lc3NhZ2UuYXR0cmlidXRlcyksXG4gICAgICBpc0dpZnRCYWRnZTogaXNHaWZ0QmFkZ2UocXVvdGVkTWVzc2FnZS5hdHRyaWJ1dGVzKSxcbiAgICAgIG1lc3NhZ2VJZDogcXVvdGVkTWVzc2FnZS5nZXQoJ2lkJyksXG4gICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgIHRleHQ6IGJvZHkgfHwgZW1iZWRkZWRDb250YWN0TmFtZSxcbiAgICB9O1xuICB9XG5cbiAgYXN5bmMgc2VuZFN0aWNrZXJNZXNzYWdlKHBhY2tJZDogc3RyaW5nLCBzdGlja2VySWQ6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHBhY2tEYXRhID0gU3RpY2tlcnMuZ2V0U3RpY2tlclBhY2socGFja0lkKTtcbiAgICBjb25zdCBzdGlja2VyRGF0YSA9IFN0aWNrZXJzLmdldFN0aWNrZXIocGFja0lkLCBzdGlja2VySWQpO1xuICAgIGlmICghc3RpY2tlckRhdGEgfHwgIXBhY2tEYXRhKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYEF0dGVtcHRlZCB0byBzZW5kIG5vbmV4aXN0ZW50ICgke3BhY2tJZH0sICR7c3RpY2tlcklkfSkgc3RpY2tlciFgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsga2V5IH0gPSBwYWNrRGF0YTtcbiAgICBjb25zdCB7IGVtb2ppLCBwYXRoLCB3aWR0aCwgaGVpZ2h0IH0gPSBzdGlja2VyRGF0YTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgcmVhZFN0aWNrZXJEYXRhKHBhdGgpO1xuXG4gICAgLy8gV2UgbmVlZCB0aGlzIGNvbnRlbnQgdHlwZSB0byBiZSBhbiBpbWFnZSBzbyB3ZSBjYW4gZGlzcGxheSBhbiBgPGltZz5gIGluc3RlYWQgb2YgYVxuICAgIC8vICAgYDx2aWRlbz5gIG9yIGFuIGVycm9yLCBidXQgaXQncyBub3QgY3JpdGljYWwgdGhhdCB3ZSBnZXQgdGhlIGZ1bGwgdHlwZSBjb3JyZWN0LlxuICAgIC8vICAgSW4gb3RoZXIgd29yZHMsIGl0J3MgcHJvYmFibHkgZmluZSBpZiB3ZSBzYXkgdGhhdCBhIEdJRiBpcyBgaW1hZ2UvcG5nYCwgYnV0IGl0J3NcbiAgICAvLyAgIGJ1dCBpdCdzIGJhZCBpZiB3ZSBzYXkgaXQncyBgdmlkZW8vbXA0YCBvciBgdGV4dC9wbGFpbmAuIFdlIGRvIG91ciBiZXN0IHRvIHNuaWZmXG4gICAgLy8gICB0aGUgTUlNRSB0eXBlIGhlcmUsIGJ1dCBpdCdzIG9rYXkgaWYgd2UgaGF2ZSB0byB1c2UgYSBwb3NzaWJseS1pbmNvcnJlY3RcbiAgICAvLyAgIGZhbGxiYWNrLlxuICAgIGxldCBjb250ZW50VHlwZTogTUlNRVR5cGU7XG4gICAgY29uc3Qgc25pZmZlZE1pbWVUeXBlID0gc25pZmZJbWFnZU1pbWVUeXBlKGRhdGEpO1xuICAgIGlmIChzbmlmZmVkTWltZVR5cGUpIHtcbiAgICAgIGNvbnRlbnRUeXBlID0gc25pZmZlZE1pbWVUeXBlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ3NlbmRTdGlja2VyTWVzc2FnZTogVW5hYmxlIHRvIHNuaWZmIHN0aWNrZXIgTUlNRSB0eXBlOyBmYWxsaW5nIGJhY2sgdG8gV2ViUCdcbiAgICAgICk7XG4gICAgICBjb250ZW50VHlwZSA9IElNQUdFX1dFQlA7XG4gICAgfVxuXG4gICAgY29uc3Qgc3RpY2tlciA9IHtcbiAgICAgIHBhY2tJZCxcbiAgICAgIHN0aWNrZXJJZCxcbiAgICAgIHBhY2tLZXk6IGtleSxcbiAgICAgIGVtb2ppLFxuICAgICAgZGF0YToge1xuICAgICAgICBzaXplOiBkYXRhLmJ5dGVMZW5ndGgsXG4gICAgICAgIGRhdGEsXG4gICAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgICB3aWR0aCxcbiAgICAgICAgaGVpZ2h0LFxuICAgICAgICBibHVySGFzaDogYXdhaXQgd2luZG93LmltYWdlVG9CbHVySGFzaChcbiAgICAgICAgICBuZXcgQmxvYihbZGF0YV0sIHtcbiAgICAgICAgICAgIHR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgICAgfSlcbiAgICAgICAgKSxcbiAgICAgIH0sXG4gICAgfTtcblxuICAgIHRoaXMuZW5xdWV1ZU1lc3NhZ2VGb3JTZW5kKHtcbiAgICAgIGJvZHk6IHVuZGVmaW5lZCxcbiAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIHN0aWNrZXIsXG4gICAgfSk7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5zdGlja2Vycy51c2VTdGlja2VyKHBhY2tJZCwgc3RpY2tlcklkKTtcbiAgfVxuXG4gIGFzeW5jIHNlbmREZWxldGVGb3JFdmVyeW9uZU1lc3NhZ2Uob3B0aW9uczoge1xuICAgIGlkOiBzdHJpbmc7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHRpbWVzdGFtcDogdGFyZ2V0VGltZXN0YW1wLCBpZDogbWVzc2FnZUlkIH0gPSBvcHRpb25zO1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCBnZXRNZXNzYWdlQnlJZChtZXNzYWdlSWQpO1xuICAgIGlmICghbWVzc2FnZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdzZW5kRGVsZXRlRm9yRXZlcnlvbmVNZXNzYWdlOiBDYW5ub3QgZmluZCBtZXNzYWdlIScpO1xuICAgIH1cbiAgICBjb25zdCBtZXNzYWdlTW9kZWwgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIobWVzc2FnZUlkLCBtZXNzYWdlKTtcblxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgaWYgKHRpbWVzdGFtcCAtIHRhcmdldFRpbWVzdGFtcCA+IFRIUkVFX0hPVVJTKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzZW5kIERPRSBmb3IgYSBtZXNzYWdlIG9sZGVyIHRoYW4gdGhyZWUgaG91cnMnKTtcbiAgICB9XG5cbiAgICBtZXNzYWdlTW9kZWwuc2V0KHtcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXM6IHppcE9iamVjdChcbiAgICAgICAgdGhpcy5nZXRSZWNpcGllbnRDb252ZXJzYXRpb25JZHMoKSxcbiAgICAgICAgcmVwZWF0KGZhbHNlKVxuICAgICAgKSxcbiAgICB9KTtcblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBqb2JEYXRhOiBDb252ZXJzYXRpb25RdWV1ZUpvYkRhdGEgPSB7XG4gICAgICAgIHR5cGU6IGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bS5lbnVtLkRlbGV0ZUZvckV2ZXJ5b25lLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5pZCxcbiAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICByZWNpcGllbnRzOiB0aGlzLmdldFJlY2lwaWVudHMoKSxcbiAgICAgICAgcmV2aXNpb246IHRoaXMuZ2V0KCdyZXZpc2lvbicpLFxuICAgICAgICB0YXJnZXRUaW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgYXdhaXQgY29udmVyc2F0aW9uSm9iUXVldWUuYWRkKGpvYkRhdGEsIGFzeW5jIGpvYlRvSW5zZXJ0ID0+IHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYHNlbmREZWxldGVGb3JFdmVyeW9uZU1lc3NhZ2U6IHNhdmluZyBtZXNzYWdlICR7dGhpcy5pZEZvckxvZ2dpbmcoKX0gYW5kIGpvYiAke1xuICAgICAgICAgICAgam9iVG9JbnNlcnQuaWRcbiAgICAgICAgICB9YFxuICAgICAgICApO1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZU1vZGVsLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBqb2JUb0luc2VydCxcbiAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdzZW5kRGVsZXRlRm9yRXZlcnlvbmVNZXNzYWdlOiBGYWlsZWQgdG8gcXVldWUgZGVsZXRlIGZvciBldmVyeW9uZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVNb2RlbCA9IG5ldyBEZWxldGVNb2RlbCh7XG4gICAgICB0YXJnZXRTZW50VGltZXN0YW1wOiB0YXJnZXRUaW1lc3RhbXAsXG4gICAgICBzZXJ2ZXJUaW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBmcm9tSWQ6IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpLFxuICAgIH0pO1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuVXRpbC5kZWxldGVGb3JFdmVyeW9uZShtZXNzYWdlTW9kZWwsIGRlbGV0ZU1vZGVsKTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRQcm9maWxlS2V5VXBkYXRlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmIChpc01lKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZ2V0KCdwcm9maWxlU2hhcmluZycpKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdzZW5kUHJvZmlsZUtleVVwZGF0ZTogcHJvZmlsZVNoYXJpbmcgbm90IGVuYWJsZWQgZm9yIGNvbnZlcnNhdGlvbicsXG4gICAgICAgIHRoaXMuaWRGb3JMb2dnaW5nKClcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbkpvYlF1ZXVlLmFkZCh7XG4gICAgICAgIHR5cGU6IGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bS5lbnVtLlByb2ZpbGVLZXksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmlkLFxuICAgICAgICByZXZpc2lvbjogdGhpcy5nZXQoJ3JldmlzaW9uJyksXG4gICAgICB9KTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnc2VuZFByb2ZpbGVLZXlVcGRhdGU6IEZhaWxlZCB0byBxdWV1ZSBwcm9maWxlIHNoYXJlJyxcbiAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBlbnF1ZXVlTWVzc2FnZUZvclNlbmQoXG4gICAge1xuICAgICAgYXR0YWNobWVudHMsXG4gICAgICBib2R5LFxuICAgICAgY29udGFjdCxcbiAgICAgIG1lbnRpb25zLFxuICAgICAgcHJldmlldyxcbiAgICAgIHF1b3RlLFxuICAgICAgc3RpY2tlcixcbiAgICB9OiB7XG4gICAgICBhdHRhY2htZW50czogQXJyYXk8QXR0YWNobWVudFR5cGU+O1xuICAgICAgYm9keTogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgY29udGFjdD86IEFycmF5PENvbnRhY3RXaXRoSHlkcmF0ZWRBdmF0YXI+O1xuICAgICAgbWVudGlvbnM/OiBCb2R5UmFuZ2VzVHlwZTtcbiAgICAgIHByZXZpZXc/OiBBcnJheTxMaW5rUHJldmlld1R5cGU+O1xuICAgICAgcXVvdGU/OiBRdW90ZWRNZXNzYWdlVHlwZTtcbiAgICAgIHN0aWNrZXI/OiBTdGlja2VyVHlwZTtcbiAgICB9LFxuICAgIHtcbiAgICAgIGRvbnRDbGVhckRyYWZ0LFxuICAgICAgc2VuZEhRSW1hZ2VzLFxuICAgICAgc3RvcnlJZCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIGV4dHJhUmVkdXhBY3Rpb25zLFxuICAgIH06IHtcbiAgICAgIGRvbnRDbGVhckRyYWZ0PzogYm9vbGVhbjtcbiAgICAgIHNlbmRIUUltYWdlcz86IGJvb2xlYW47XG4gICAgICBzdG9yeUlkPzogc3RyaW5nO1xuICAgICAgdGltZXN0YW1wPzogbnVtYmVyO1xuICAgICAgZXh0cmFSZWR1eEFjdGlvbnM/OiAoKSA9PiB2b2lkO1xuICAgIH0gPSB7fVxuICApOiBQcm9taXNlPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB8IHVuZGVmaW5lZD4ge1xuICAgIGlmICh0aGlzLmlzR3JvdXBWMUFuZERpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBub3cgPSB0aW1lc3RhbXAgfHwgRGF0ZS5ub3coKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgJ1NlbmRpbmcgbWVzc2FnZSB0byBjb252ZXJzYXRpb24nLFxuICAgICAgdGhpcy5pZEZvckxvZ2dpbmcoKSxcbiAgICAgICd3aXRoIHRpbWVzdGFtcCcsXG4gICAgICBub3dcbiAgICApO1xuXG4gICAgdGhpcy5jbGVhclR5cGluZ1RpbWVycygpO1xuXG4gICAgY29uc3QgbWFuZGF0b3J5UHJvZmlsZVNoYXJpbmdFbmFibGVkID0gd2luZG93LlNpZ25hbC5SZW1vdGVDb25maWcuaXNFbmFibGVkKFxuICAgICAgJ2Rlc2t0b3AubWFuZGF0b3J5UHJvZmlsZVNoYXJpbmcnXG4gICAgKTtcblxuICAgIGF3YWl0IHRoaXMubWF5YmVBcHBseVVuaXZlcnNhbFRpbWVyKCk7XG5cbiAgICBjb25zdCBleHBpcmVUaW1lciA9IHRoaXMuZ2V0KCdleHBpcmVUaW1lcicpO1xuXG4gICAgY29uc3QgcmVjaXBpZW50TWF5YmVDb252ZXJzYXRpb25zID0gbWFwKHRoaXMuZ2V0UmVjaXBpZW50cygpLCBpZGVudGlmaWVyID0+XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcilcbiAgICApO1xuICAgIGNvbnN0IHJlY2lwaWVudENvbnZlcnNhdGlvbnMgPSBmaWx0ZXIoXG4gICAgICByZWNpcGllbnRNYXliZUNvbnZlcnNhdGlvbnMsXG4gICAgICBpc05vdE5pbFxuICAgICk7XG4gICAgY29uc3QgcmVjaXBpZW50Q29udmVyc2F0aW9uSWRzID0gY29uY2F0KFxuICAgICAgbWFwKHJlY2lwaWVudENvbnZlcnNhdGlvbnMsIGMgPT4gYy5pZCksXG4gICAgICBbd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWRPclRocm93KCldXG4gICAgKTtcblxuICAgIC8vIElmIHRoZXJlIGFyZSBsaW5rIHByZXZpZXdzIHByZXNlbnQgaW4gdGhlIG1lc3NhZ2Ugd2Ugc2hvdWxkbid0IGluY2x1ZGVcbiAgICAvLyBhbnkgYXR0YWNobWVudHMgYXMgd2VsbC5cbiAgICBjb25zdCBhdHRhY2htZW50c1RvU2VuZCA9IHByZXZpZXcgJiYgcHJldmlldy5sZW5ndGggPyBbXSA6IGF0dGFjaG1lbnRzO1xuXG4gICAgaWYgKHByZXZpZXcgJiYgcHJldmlldy5sZW5ndGgpIHtcbiAgICAgIGF0dGFjaG1lbnRzLmZvckVhY2goYXR0YWNobWVudCA9PiB7XG4gICAgICAgIGlmIChhdHRhY2htZW50LnBhdGgpIHtcbiAgICAgICAgICBkZWxldGVBdHRhY2htZW50RGF0YShhdHRhY2htZW50LnBhdGgpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG5cbiAgICAvLyBIZXJlIHdlIG1vdmUgYXR0YWNobWVudHMgdG8gZGlza1xuICAgIGNvbnN0IGF0dHJpYnV0ZXMgPSBhd2FpdCB1cGdyYWRlTWVzc2FnZVNjaGVtYSh7XG4gICAgICBpZDogVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICBib2R5LFxuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMuaWQsXG4gICAgICBjb250YWN0LFxuICAgICAgcXVvdGUsXG4gICAgICBwcmV2aWV3LFxuICAgICAgYXR0YWNobWVudHM6IGF0dGFjaG1lbnRzVG9TZW5kLFxuICAgICAgc2VudF9hdDogbm93LFxuICAgICAgcmVjZWl2ZWRfYXQ6IHdpbmRvdy5TaWduYWwuVXRpbC5pbmNyZW1lbnRNZXNzYWdlQ291bnRlcigpLFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IG5vdyxcbiAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5Ob3RBcHBsaWNhYmxlLFxuICAgICAgc3RpY2tlcixcbiAgICAgIGJvZHlSYW5nZXM6IG1lbnRpb25zLFxuICAgICAgc2VuZEhRSW1hZ2VzLFxuICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDogemlwT2JqZWN0KFxuICAgICAgICByZWNpcGllbnRDb252ZXJzYXRpb25JZHMsXG4gICAgICAgIHJlcGVhdCh7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgdXBkYXRlZEF0OiBub3csXG4gICAgICAgIH0pXG4gICAgICApLFxuICAgICAgc3RvcnlJZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IG1vZGVsID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UoYXR0cmlidXRlcyk7XG4gICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3Rlcihtb2RlbC5pZCwgbW9kZWwpO1xuICAgIG1lc3NhZ2UuY2FjaGVkT3V0Z29pbmdDb250YWN0RGF0YSA9IGNvbnRhY3Q7XG4gICAgbWVzc2FnZS5jYWNoZWRPdXRnb2luZ1ByZXZpZXdEYXRhID0gcHJldmlldztcbiAgICBtZXNzYWdlLmNhY2hlZE91dGdvaW5nUXVvdGVEYXRhID0gcXVvdGU7XG4gICAgbWVzc2FnZS5jYWNoZWRPdXRnb2luZ1N0aWNrZXJEYXRhID0gc3RpY2tlcjtcblxuICAgIGNvbnN0IGRiU3RhcnQgPSBEYXRlLm5vdygpO1xuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdHlwZW9mIG1lc3NhZ2UuYXR0cmlidXRlcy50aW1lc3RhbXAgPT09ICdudW1iZXInLFxuICAgICAgJ0V4cGVjdGVkIGEgdGltZXN0YW1wJ1xuICAgICk7XG5cbiAgICBhd2FpdCBjb252ZXJzYXRpb25Kb2JRdWV1ZS5hZGQoXG4gICAgICB7XG4gICAgICAgIHR5cGU6IGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bS5lbnVtLk5vcm1hbE1lc3NhZ2UsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmlkLFxuICAgICAgICBtZXNzYWdlSWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgIHJldmlzaW9uOiB0aGlzLmdldCgncmV2aXNpb24nKSxcbiAgICAgIH0sXG4gICAgICBhc3luYyBqb2JUb0luc2VydCA9PiB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBlbnF1ZXVlTWVzc2FnZUZvclNlbmQ6IHNhdmluZyBtZXNzYWdlICR7bWVzc2FnZS5pZH0gYW5kIGpvYiAke2pvYlRvSW5zZXJ0LmlkfWBcbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywge1xuICAgICAgICAgIGpvYlRvSW5zZXJ0LFxuICAgICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3QgZGJEdXJhdGlvbiA9IERhdGUubm93KCkgLSBkYlN0YXJ0O1xuICAgIGlmIChkYkR1cmF0aW9uID4gU0VORF9SRVBPUlRJTkdfVEhSRVNIT0xEX01TKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYENvbnZlcnNhdGlvbk1vZGVsKCR7dGhpcy5pZEZvckxvZ2dpbmcoKX0uc2VuZE1lc3NhZ2UoJHtub3d9KTogYCArXG4gICAgICAgICAgYGRiIHNhdmUgdG9vayAke2RiRHVyYXRpb259bXNgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlclN0YXJ0ID0gRGF0ZS5ub3coKTtcblxuICAgIC8vIFBlcmZvcm0gYXN5bmNocm9ub3VzIHRhc2tzIGJlZm9yZSBlbnRlcmluZyB0aGUgYmF0Y2hpbmcgbW9kZVxuICAgIGF3YWl0IHRoaXMuYmVmb3JlQWRkU2luZ2xlTWVzc2FnZSgpO1xuXG4gICAgdGhpcy5pc0luUmVkdXhCYXRjaCA9IHRydWU7XG4gICAgYmF0Y2hEaXNwYXRjaCgoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCB7IGNsZWFyVW5yZWFkTWV0cmljcyB9ID0gd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zO1xuICAgICAgICBjbGVhclVucmVhZE1ldHJpY3ModGhpcy5pZCk7XG5cbiAgICAgICAgY29uc3QgZW5hYmxlUHJvZmlsZVNoYXJpbmcgPSBCb29sZWFuKFxuICAgICAgICAgIG1hbmRhdG9yeVByb2ZpbGVTaGFyaW5nRW5hYmxlZCAmJiAhdGhpcy5nZXQoJ3Byb2ZpbGVTaGFyaW5nJylcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5kb0FkZFNpbmdsZU1lc3NhZ2UobW9kZWwsIHsgaXNKdXN0U2VudDogdHJ1ZSB9KTtcblxuICAgICAgICBjb25zdCBkcmFmdFByb3BlcnRpZXMgPSBkb250Q2xlYXJEcmFmdFxuICAgICAgICAgID8ge31cbiAgICAgICAgICA6IHtcbiAgICAgICAgICAgICAgZHJhZnQ6IG51bGwsXG4gICAgICAgICAgICAgIGRyYWZ0VGltZXN0YW1wOiBudWxsLFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZTogbW9kZWwuZ2V0Tm90aWZpY2F0aW9uVGV4dCgpLFxuICAgICAgICAgICAgICBsYXN0TWVzc2FnZVN0YXR1czogJ3NlbmRpbmcnIGFzIGNvbnN0LFxuICAgICAgICAgICAgfTtcblxuICAgICAgICB0aGlzLnNldCh7XG4gICAgICAgICAgLi4uZHJhZnRQcm9wZXJ0aWVzLFxuICAgICAgICAgIC4uLihlbmFibGVQcm9maWxlU2hhcmluZyA/IHsgcHJvZmlsZVNoYXJpbmc6IHRydWUgfSA6IHt9KSxcbiAgICAgICAgICAuLi50aGlzLmluY3JlbWVudFNlbnRNZXNzYWdlQ291bnQoeyBkcnk6IHRydWUgfSksXG4gICAgICAgICAgYWN0aXZlX2F0OiBub3csXG4gICAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICAgICAgaXNBcmNoaXZlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGlmIChlbmFibGVQcm9maWxlU2hhcmluZykge1xuICAgICAgICAgIHRoaXMuY2FwdHVyZUNoYW5nZSgnbWFuZGF0b3J5UHJvZmlsZVNoYXJpbmcnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGV4dHJhUmVkdXhBY3Rpb25zPy4oKTtcbiAgICAgIH0gZmluYWxseSB7XG4gICAgICAgIHRoaXMuaXNJblJlZHV4QmF0Y2ggPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGlmIChzdGlja2VyKSB7XG4gICAgICBhd2FpdCBhZGRTdGlja2VyUGFja1JlZmVyZW5jZShtb2RlbC5pZCwgc3RpY2tlci5wYWNrSWQpO1xuICAgIH1cblxuICAgIGNvbnN0IHJlbmRlckR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHJlbmRlclN0YXJ0O1xuXG4gICAgaWYgKHJlbmRlckR1cmF0aW9uID4gU0VORF9SRVBPUlRJTkdfVEhSRVNIT0xEX01TKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYENvbnZlcnNhdGlvbk1vZGVsKCR7dGhpcy5pZEZvckxvZ2dpbmcoKX0uc2VuZE1lc3NhZ2UoJHtub3d9KTogYCArXG4gICAgICAgICAgYHJlbmRlciBzYXZlIHRvb2sgJHtyZW5kZXJEdXJhdGlvbn1tc2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gICAgcmV0dXJuIGF0dHJpYnV0ZXM7XG4gIH1cblxuICAvLyBJcyB0aGlzIHNvbWVvbmUgd2hvIGlzIGEgY29udGFjdCwgb3IgYXJlIHdlIHNoYXJpbmcgb3VyIHByb2ZpbGUgd2l0aCB0aGVtP1xuICAvLyAgIE9yIGlzIHRoZSBwZXJzb24gd2hvIGFkZGVkIHVzIHRvIHRoaXMgZ3JvdXAgYSBjb250YWN0IG9yIGFyZSB3ZSBzaGFyaW5nIHByb2ZpbGVcbiAgLy8gICB3aXRoIHRoZW0/XG4gIGlzRnJvbU9yQWRkZWRCeVRydXN0ZWRDb250YWN0KCk6IGJvb2xlYW4ge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldCgnbmFtZScpKSB8fCB0aGlzLmdldCgncHJvZmlsZVNoYXJpbmcnKTtcbiAgICB9XG5cbiAgICBjb25zdCBhZGRlZEJ5ID0gdGhpcy5nZXQoJ2FkZGVkQnknKTtcbiAgICBpZiAoIWFkZGVkQnkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBjb252ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGFkZGVkQnkpO1xuICAgIGlmICghY29udikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBCb29sZWFuKFxuICAgICAgaXNNZShjb252LmF0dHJpYnV0ZXMpIHx8IGNvbnYuZ2V0KCduYW1lJykgfHwgY29udi5nZXQoJ3Byb2ZpbGVTaGFyaW5nJylcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlTGFzdE1lc3NhZ2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPVxuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcbiAgICBpZiAoIW91ckNvbnZlcnNhdGlvbklkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZUxhc3RNZXNzYWdlOiBGYWlsZWQgdG8gZmV0Y2ggb3VyQ29udmVyc2F0aW9uSWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHRoaXMuaWQ7XG5cbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKTtcbiAgICBjb25zdCBzdGF0cyA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRDb252ZXJzYXRpb25NZXNzYWdlU3RhdHMoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBpc0dyb3VwOiBpc0dyb3VwKHRoaXMuYXR0cmlidXRlcyksXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuXG4gICAgLy8gVGhpcyBydW5zIGFzIGEgam9iIHRvIGF2b2lkIHJhY2UgY29uZGl0aW9uc1xuICAgIHRoaXMucXVldWVKb2IoJ21heWJlU2V0UGVuZGluZ1VuaXZlcnNhbFRpbWVyJywgYXN5bmMgKCkgPT5cbiAgICAgIHRoaXMubWF5YmVTZXRQZW5kaW5nVW5pdmVyc2FsVGltZXIoc3RhdHMuaGFzVXNlckluaXRpYXRlZE1lc3NhZ2VzKVxuICAgICk7XG5cbiAgICBjb25zdCB7IHByZXZpZXcsIGFjdGl2aXR5IH0gPSBzdGF0cztcbiAgICBsZXQgcHJldmlld01lc3NhZ2U6IE1lc3NhZ2VNb2RlbCB8IHVuZGVmaW5lZDtcbiAgICBsZXQgYWN0aXZpdHlNZXNzYWdlOiBNZXNzYWdlTW9kZWwgfCB1bmRlZmluZWQ7XG5cbiAgICAvLyBSZWdpc3RlciB0aGUgbWVzc2FnZSB3aXRoIE1lc3NhZ2VDb250cm9sbGVyIHNvIHRoYXQgaWYgaXQgYWxyZWFkeSBleGlzdHNcbiAgICAvLyBpbiBtZW1vcnkgd2UgdXNlIHRoYXQgZGF0YSBpbnN0ZWFkIG9mIHRoZSBkYXRhIGZyb20gdGhlIGRiIHdoaWNoIG1heVxuICAgIC8vIGJlIG91dCBvZiBkYXRlLlxuICAgIGlmIChwcmV2aWV3KSB7XG4gICAgICBwcmV2aWV3TWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihwcmV2aWV3LmlkLCBwcmV2aWV3KTtcbiAgICB9XG5cbiAgICBpZiAoYWN0aXZpdHkpIHtcbiAgICAgIGFjdGl2aXR5TWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgICAgYWN0aXZpdHkuaWQsXG4gICAgICAgIGFjdGl2aXR5XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgIHRoaXMuaGFzRHJhZnQoKSAmJlxuICAgICAgdGhpcy5nZXQoJ2RyYWZ0VGltZXN0YW1wJykgJiZcbiAgICAgICghcHJldmlld01lc3NhZ2UgfHxcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgICAgcHJldmlld01lc3NhZ2UuZ2V0KCdzZW50X2F0JykgPCB0aGlzLmdldCgnZHJhZnRUaW1lc3RhbXAnKSEpXG4gICAgKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudFRpbWVzdGFtcCA9IHRoaXMuZ2V0KCd0aW1lc3RhbXAnKSB8fCBudWxsO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IGFjdGl2aXR5TWVzc2FnZVxuICAgICAgPyBhY3Rpdml0eU1lc3NhZ2UuZ2V0KCdzZW50X2F0JykgfHxcbiAgICAgICAgYWN0aXZpdHlNZXNzYWdlLmdldCgncmVjZWl2ZWRfYXQnKSB8fFxuICAgICAgICBjdXJyZW50VGltZXN0YW1wXG4gICAgICA6IGN1cnJlbnRUaW1lc3RhbXA7XG5cbiAgICB0aGlzLnNldCh7XG4gICAgICBsYXN0TWVzc2FnZTpcbiAgICAgICAgKHByZXZpZXdNZXNzYWdlID8gcHJldmlld01lc3NhZ2UuZ2V0Tm90aWZpY2F0aW9uVGV4dCgpIDogJycpIHx8ICcnLFxuICAgICAgbGFzdE1lc3NhZ2VTdGF0dXM6XG4gICAgICAgIChwcmV2aWV3TWVzc2FnZVxuICAgICAgICAgID8gZ2V0TWVzc2FnZVByb3BTdGF0dXMocHJldmlld01lc3NhZ2UuYXR0cmlidXRlcywgb3VyQ29udmVyc2F0aW9uSWQpXG4gICAgICAgICAgOiBudWxsKSB8fCBudWxsLFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgbGFzdE1lc3NhZ2VEZWxldGVkRm9yRXZlcnlvbmU6IHByZXZpZXdNZXNzYWdlXG4gICAgICAgID8gcHJldmlld01lc3NhZ2UuZ2V0KCdkZWxldGVkRm9yRXZlcnlvbmUnKVxuICAgICAgICA6IGZhbHNlLFxuICAgIH0pO1xuXG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgc2V0QXJjaGl2ZWQoaXNBcmNoaXZlZDogYm9vbGVhbik6IHZvaWQge1xuICAgIGNvbnN0IGJlZm9yZSA9IHRoaXMuZ2V0KCdpc0FyY2hpdmVkJyk7XG5cbiAgICB0aGlzLnNldCh7IGlzQXJjaGl2ZWQgfSk7XG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gICAgY29uc3QgYWZ0ZXIgPSB0aGlzLmdldCgnaXNBcmNoaXZlZCcpO1xuXG4gICAgaWYgKEJvb2xlYW4oYmVmb3JlKSAhPT0gQm9vbGVhbihhZnRlcikpIHtcbiAgICAgIGlmIChhZnRlcikge1xuICAgICAgICB0aGlzLnVucGluKCk7XG4gICAgICB9XG4gICAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoJ2lzQXJjaGl2ZWQnKTtcbiAgICB9XG4gIH1cblxuICBzZXRNYXJrZWRVbnJlYWQobWFya2VkVW5yZWFkOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgcHJldmlvdXNNYXJrZWRVbnJlYWQgPSB0aGlzLmdldCgnbWFya2VkVW5yZWFkJyk7XG5cbiAgICB0aGlzLnNldCh7IG1hcmtlZFVucmVhZCB9KTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgICBpZiAoQm9vbGVhbihwcmV2aW91c01hcmtlZFVucmVhZCkgIT09IEJvb2xlYW4obWFya2VkVW5yZWFkKSkge1xuICAgICAgdGhpcy5jYXB0dXJlQ2hhbmdlKCdtYXJrZWRVbnJlYWQnKTtcbiAgICB9XG4gIH1cblxuICBhc3luYyByZWZyZXNoR3JvdXBMaW5rKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cEludml0ZUxpbmtQYXNzd29yZCA9IEJ5dGVzLnRvQmFzZTY0KFxuICAgICAgd2luZG93LlNpZ25hbC5Hcm91cHMuZ2VuZXJhdGVHcm91cEludml0ZUxpbmtQYXNzd29yZCgpXG4gICAgKTtcblxuICAgIGxvZy5pbmZvKCdyZWZyZXNoR3JvdXBMaW5rIGZvciBjb252ZXJzYXRpb24nLCB0aGlzLmlkRm9yTG9nZ2luZygpKTtcblxuICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICBuYW1lOiAndXBkYXRlSW52aXRlTGlua1Bhc3N3b3JkJyxcbiAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiBhc3luYyAoKSA9PlxuICAgICAgICB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZEludml0ZUxpbmtQYXNzd29yZENoYW5nZShcbiAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmRcbiAgICAgICAgKSxcbiAgICB9KTtcblxuICAgIHRoaXMuc2V0KHsgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgfSk7XG4gIH1cblxuICBhc3luYyB0b2dnbGVHcm91cExpbmsodmFsdWU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qgc2hvdWxkQ3JlYXRlTmV3R3JvdXBMaW5rID1cbiAgICAgIHZhbHVlICYmICF0aGlzLmdldCgnZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQnKTtcbiAgICBjb25zdCBncm91cEludml0ZUxpbmtQYXNzd29yZCA9XG4gICAgICB0aGlzLmdldCgnZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQnKSB8fFxuICAgICAgQnl0ZXMudG9CYXNlNjQod2luZG93LlNpZ25hbC5Hcm91cHMuZ2VuZXJhdGVHcm91cEludml0ZUxpbmtQYXNzd29yZCgpKTtcblxuICAgIGxvZy5pbmZvKCd0b2dnbGVHcm91cExpbmsgZm9yIGNvbnZlcnNhdGlvbicsIHRoaXMuaWRGb3JMb2dnaW5nKCksIHZhbHVlKTtcblxuICAgIGNvbnN0IEFDQ0VTU19FTlVNID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcbiAgICBjb25zdCBhZGRGcm9tSW52aXRlTGluayA9IHZhbHVlXG4gICAgICA/IEFDQ0VTU19FTlVNLkFOWVxuICAgICAgOiBBQ0NFU1NfRU5VTS5VTlNBVElTRklBQkxFO1xuXG4gICAgaWYgKHNob3VsZENyZWF0ZU5ld0dyb3VwTGluaykge1xuICAgICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgICAgbmFtZTogJ3VwZGF0ZU5ld0dyb3VwTGluaycsXG4gICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiBhc3luYyAoKSA9PlxuICAgICAgICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkTmV3R3JvdXBMaW5rQ2hhbmdlKFxuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgICAgICAgICBhZGRGcm9tSW52aXRlTGlua1xuICAgICAgICAgICksXG4gICAgICB9KTtcbiAgICB9IGVsc2Uge1xuICAgICAgYXdhaXQgdGhpcy5tb2RpZnlHcm91cFYyKHtcbiAgICAgICAgbmFtZTogJ3VwZGF0ZUFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGluaycsXG4gICAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiBhc3luYyAoKSA9PlxuICAgICAgICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkQWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rQ2hhbmdlKFxuICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgYWRkRnJvbUludml0ZUxpbmtcbiAgICAgICAgICApLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXQoe1xuICAgICAgYWNjZXNzQ29udHJvbDoge1xuICAgICAgICBhZGRGcm9tSW52aXRlTGluayxcbiAgICAgICAgYXR0cmlidXRlczogdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8uYXR0cmlidXRlcyB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgICAgIG1lbWJlcnM6IHRoaXMuZ2V0KCdhY2Nlc3NDb250cm9sJyk/Lm1lbWJlcnMgfHwgQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgfSxcbiAgICB9KTtcblxuICAgIGlmIChzaG91bGRDcmVhdGVOZXdHcm91cExpbmspIHtcbiAgICAgIHRoaXMuc2V0KHsgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgfSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgdXBkYXRlQWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rKHZhbHVlOiBib29sZWFuKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IEFDQ0VTU19FTlVNID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcblxuICAgIGNvbnN0IGFkZEZyb21JbnZpdGVMaW5rID0gdmFsdWVcbiAgICAgID8gQUNDRVNTX0VOVU0uQURNSU5JU1RSQVRPUlxuICAgICAgOiBBQ0NFU1NfRU5VTS5BTlk7XG5cbiAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgbmFtZTogJ3VwZGF0ZUFjY2Vzc0NvbnRyb2xBZGRGcm9tSW52aXRlTGluaycsXG4gICAgICBjcmVhdGVHcm91cENoYW5nZTogYXN5bmMgKCkgPT5cbiAgICAgICAgd2luZG93LlNpZ25hbC5Hcm91cHMuYnVpbGRBY2Nlc3NDb250cm9sQWRkRnJvbUludml0ZUxpbmtDaGFuZ2UoXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgIGFkZEZyb21JbnZpdGVMaW5rXG4gICAgICAgICksXG4gICAgfSk7XG5cbiAgICB0aGlzLnNldCh7XG4gICAgICBhY2Nlc3NDb250cm9sOiB7XG4gICAgICAgIGFkZEZyb21JbnZpdGVMaW5rLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdldCgnYWNjZXNzQ29udHJvbCcpPy5hdHRyaWJ1dGVzIHx8IEFDQ0VTU19FTlVNLk1FTUJFUixcbiAgICAgICAgbWVtYmVyczogdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8ubWVtYmVycyB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlQWNjZXNzQ29udHJvbEF0dHJpYnV0ZXModmFsdWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgbmFtZTogJ3VwZGF0ZUFjY2Vzc0NvbnRyb2xBdHRyaWJ1dGVzJyxcbiAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiBhc3luYyAoKSA9PlxuICAgICAgICB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZEFjY2Vzc0NvbnRyb2xBdHRyaWJ1dGVzQ2hhbmdlKFxuICAgICAgICAgIHRoaXMuYXR0cmlidXRlcyxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgQUNDRVNTX0VOVU0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIGFjY2Vzc0NvbnRyb2w6IHtcbiAgICAgICAgYWRkRnJvbUludml0ZUxpbms6XG4gICAgICAgICAgdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8uYWRkRnJvbUludml0ZUxpbmsgfHwgQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgICBhdHRyaWJ1dGVzOiB2YWx1ZSxcbiAgICAgICAgbWVtYmVyczogdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8ubWVtYmVycyB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlQWNjZXNzQ29udHJvbE1lbWJlcnModmFsdWU6IG51bWJlcik6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLm1vZGlmeUdyb3VwVjIoe1xuICAgICAgbmFtZTogJ3VwZGF0ZUFjY2Vzc0NvbnRyb2xNZW1iZXJzJyxcbiAgICAgIGNyZWF0ZUdyb3VwQ2hhbmdlOiBhc3luYyAoKSA9PlxuICAgICAgICB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5idWlsZEFjY2Vzc0NvbnRyb2xNZW1iZXJzQ2hhbmdlKFxuICAgICAgICAgIHRoaXMuYXR0cmlidXRlcyxcbiAgICAgICAgICB2YWx1ZVxuICAgICAgICApLFxuICAgIH0pO1xuXG4gICAgY29uc3QgQUNDRVNTX0VOVU0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuICAgIHRoaXMuc2V0KHtcbiAgICAgIGFjY2Vzc0NvbnRyb2w6IHtcbiAgICAgICAgYWRkRnJvbUludml0ZUxpbms6XG4gICAgICAgICAgdGhpcy5nZXQoJ2FjY2Vzc0NvbnRyb2wnKT8uYWRkRnJvbUludml0ZUxpbmsgfHwgQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgICBhdHRyaWJ1dGVzOiB0aGlzLmdldCgnYWNjZXNzQ29udHJvbCcpPy5hdHRyaWJ1dGVzIHx8IEFDQ0VTU19FTlVNLk1FTUJFUixcbiAgICAgICAgbWVtYmVyczogdmFsdWUsXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlQW5ub3VuY2VtZW50c09ubHkodmFsdWU6IGJvb2xlYW4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpIHx8ICF0aGlzLmNhbkJlQW5ub3VuY2VtZW50R3JvdXAoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICBuYW1lOiAndXBkYXRlQW5ub3VuY2VtZW50c09ubHknLFxuICAgICAgY3JlYXRlR3JvdXBDaGFuZ2U6IGFzeW5jICgpID0+XG4gICAgICAgIHdpbmRvdy5TaWduYWwuR3JvdXBzLmJ1aWxkQW5ub3VuY2VtZW50c09ubHlDaGFuZ2UoXG4gICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzLFxuICAgICAgICAgIHZhbHVlXG4gICAgICAgICksXG4gICAgfSk7XG5cbiAgICB0aGlzLnNldCh7IGFubm91bmNlbWVudHNPbmx5OiB2YWx1ZSB9KTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZUV4cGlyYXRpb25UaW1lcihcbiAgICBwcm92aWRlZEV4cGlyZVRpbWVyOiBudW1iZXIgfCB1bmRlZmluZWQsXG4gICAge1xuICAgICAgcmVhc29uLFxuICAgICAgcmVjZWl2ZWRBdCxcbiAgICAgIHJlY2VpdmVkQXRNUyA9IERhdGUubm93KCksXG4gICAgICBzZW50QXQ6IHByb3ZpZGVkU2VudEF0LFxuICAgICAgc291cmNlOiBwcm92aWRlZFNvdXJjZSxcbiAgICAgIGZyb21TeW5jID0gZmFsc2UsXG4gICAgICBpc0luaXRpYWxTeW5jID0gZmFsc2UsXG4gICAgICBmcm9tR3JvdXBVcGRhdGUgPSBmYWxzZSxcbiAgICB9OiB7XG4gICAgICByZWFzb246IHN0cmluZztcbiAgICAgIHJlY2VpdmVkQXQ/OiBudW1iZXI7XG4gICAgICByZWNlaXZlZEF0TVM/OiBudW1iZXI7XG4gICAgICBzZW50QXQ/OiBudW1iZXI7XG4gICAgICBzb3VyY2U/OiBzdHJpbmc7XG4gICAgICBmcm9tU3luYz86IGJvb2xlYW47XG4gICAgICBpc0luaXRpYWxTeW5jPzogYm9vbGVhbjtcbiAgICAgIGZyb21Hcm91cFVwZGF0ZT86IGJvb2xlYW47XG4gICAgfVxuICApOiBQcm9taXNlPGJvb2xlYW4gfCBudWxsIHwgTWVzc2FnZU1vZGVsIHwgdm9pZD4ge1xuICAgIGNvbnN0IGlzU2V0QnlPdGhlciA9IHByb3ZpZGVkU291cmNlIHx8IHByb3ZpZGVkU2VudEF0ICE9PSB1bmRlZmluZWQ7XG5cbiAgICBpZiAoaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIGlmIChpc1NldEJ5T3RoZXIpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICd1cGRhdGVFeHBpcmF0aW9uVGltZXI6IEdyb3VwVjIgdGltZXJzIGFyZSBub3QgdXBkYXRlZCB0aGlzIHdheSdcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGF3YWl0IHRoaXMubW9kaWZ5R3JvdXBWMih7XG4gICAgICAgIG5hbWU6ICd1cGRhdGVFeHBpcmF0aW9uVGltZXInLFxuICAgICAgICBjcmVhdGVHcm91cENoYW5nZTogKCkgPT5cbiAgICAgICAgICB0aGlzLnVwZGF0ZUV4cGlyYXRpb25UaW1lckluR3JvdXBWMihwcm92aWRlZEV4cGlyZVRpbWVyKSxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghaXNTZXRCeU90aGVyICYmIHRoaXMuaXNHcm91cFYxQW5kRGlzYWJsZWQoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAndXBkYXRlRXhwaXJhdGlvblRpbWVyOiBHcm91cFYxIGlzIGRlcHJlY2F0ZWQ7IGNhbm5vdCB1cGRhdGUgZXhwaXJhdGlvbiB0aW1lcidcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbGV0IGV4cGlyZVRpbWVyOiBudW1iZXIgfCB1bmRlZmluZWQgPSBwcm92aWRlZEV4cGlyZVRpbWVyO1xuICAgIGxldCBzb3VyY2UgPSBwcm92aWRlZFNvdXJjZTtcbiAgICBpZiAodGhpcy5nZXQoJ2xlZnQnKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICghZXhwaXJlVGltZXIpIHtcbiAgICAgIGV4cGlyZVRpbWVyID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICB0aGlzLmdldCgnZXhwaXJlVGltZXInKSA9PT0gZXhwaXJlVGltZXIgfHxcbiAgICAgICghZXhwaXJlVGltZXIgJiYgIXRoaXMuZ2V0KCdleHBpcmVUaW1lcicpKVxuICAgICkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgbG9nSWQgPVxuICAgICAgYHVwZGF0ZUV4cGlyYXRpb25UaW1lcigke3RoaXMuaWRGb3JMb2dnaW5nKCl9LCBgICtcbiAgICAgIGAke2V4cGlyZVRpbWVyIHx8ICdkaXNhYmxlZCd9KSBgICtcbiAgICAgIGBzb3VyY2U9JHtzb3VyY2UgPz8gJz8nfSByZWFzb249JHtyZWFzb259YDtcblxuICAgIGxvZy5pbmZvKGAke2xvZ0lkfTogdXBkYXRpbmdgKTtcblxuICAgIC8vIGlmIGNoYW5nZSB3YXNuJ3QgbWFkZSByZW1vdGVseSwgc2VuZCBpdCB0byB0aGUgbnVtYmVyL2dyb3VwXG4gICAgaWYgKCFpc1NldEJ5T3RoZXIpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbkpvYlF1ZXVlLmFkZCh7XG4gICAgICAgICAgdHlwZTogY29udmVyc2F0aW9uUXVldWVKb2JFbnVtLmVudW0uRGlyZWN0RXhwaXJhdGlvblRpbWVyVXBkYXRlLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmlkLFxuICAgICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICBgJHtsb2dJZH06IEZhaWxlZCB0byBxdWV1ZSBleHBpcmF0aW9uIHRpbWVyIHVwZGF0ZWAsXG4gICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICApO1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBzb3VyY2UgPSBzb3VyY2UgfHwgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcblxuICAgIHRoaXMuc2V0KHsgZXhwaXJlVGltZXIgfSk7XG5cbiAgICAvLyBUaGlzIGNhbGwgYWN0dWFsbHkgcmVtb3ZlcyB1bml2ZXJzYWwgdGltZXIgbm90aWZpY2F0aW9uIGFuZCBjbGVhcnNcbiAgICAvLyB0aGUgcGVuZGluZyBmbGFncy5cbiAgICBhd2FpdCB0aGlzLm1heWJlUmVtb3ZlVW5pdmVyc2FsVGltZXIoKTtcblxuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcblxuICAgIC8vIFdoZW4gd2UgYWRkIGEgZGlzYXBwZWFyaW5nIG1lc3NhZ2VzIG5vdGlmaWNhdGlvbiB0byB0aGUgY29udmVyc2F0aW9uLCB3ZSB3YW50IGl0XG4gICAgLy8gICB0byBiZSBhYm92ZSB0aGUgbWVzc2FnZSB0aGF0IGluaXRpYXRlZCB0aGF0IGNoYW5nZSwgaGVuY2UgdGhlIHN1YnRyYWN0aW9uLlxuICAgIGNvbnN0IHNlbnRBdCA9IChwcm92aWRlZFNlbnRBdCB8fCByZWNlaXZlZEF0TVMpIC0gMTtcblxuICAgIGNvbnN0IG1vZGVsID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2Uoe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHRoaXMuaWQsXG4gICAgICBleHBpcmF0aW9uVGltZXJVcGRhdGU6IHtcbiAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgIHNvdXJjZSxcbiAgICAgICAgZnJvbVN5bmMsXG4gICAgICAgIGZyb21Hcm91cFVwZGF0ZSxcbiAgICAgIH0sXG4gICAgICBmbGFnczogUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuRVhQSVJBVElPTl9USU1FUl9VUERBVEUsXG4gICAgICByZWFkU3RhdHVzOiBpc0luaXRpYWxTeW5jID8gUmVhZFN0YXR1cy5SZWFkIDogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgICByZWNlaXZlZF9hdF9tczogcmVjZWl2ZWRBdE1TLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHJlY2VpdmVkQXQgPz8gd2luZG93LlNpZ25hbC5VdGlsLmluY3JlbWVudE1lc3NhZ2VDb3VudGVyKCksXG4gICAgICBzZWVuU3RhdHVzOiBpc0luaXRpYWxTeW5jID8gU2VlblN0YXR1cy5TZWVuIDogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgICBzZW50X2F0OiBzZW50QXQsXG4gICAgICB0eXBlOiAndGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgIC8vIFRPRE86IERFU0tUT1AtNzIyXG4gICAgfSBhcyB1bmtub3duIGFzIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSk7XG5cbiAgICBjb25zdCBpZCA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZShtb2RlbC5hdHRyaWJ1dGVzLCB7XG4gICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgIH0pO1xuXG4gICAgbW9kZWwuc2V0KHsgaWQgfSk7XG5cbiAgICBjb25zdCBtZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGlkLCBtb2RlbCk7XG5cbiAgICB0aGlzLmFkZFNpbmdsZU1lc3NhZ2UobWVzc2FnZSk7XG4gICAgdGhpcy51cGRhdGVVbnJlYWQoKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYCR7bG9nSWR9OiBhZGRlZCBhIG5vdGlmaWNhdGlvbiByZWNlaXZlZF9hdD0ke21vZGVsLmdldCgncmVjZWl2ZWRfYXQnKX1gXG4gICAgKTtcblxuICAgIHJldHVybiBtZXNzYWdlO1xuICB9XG5cbiAgaXNTZWFyY2hhYmxlKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiAhdGhpcy5nZXQoJ2xlZnQnKTtcbiAgfVxuXG4gIC8vIERlcHJlY2F0ZWQ6IG9ubHkgYXBwbGllcyB0byBHcm91cFYxXG4gIGFzeW5jIGxlYXZlR3JvdXAoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICAgIGlmICghbWVzc2FnaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2xlYXZlR3JvdXA6IENhbm5vdCBsZWF2ZSB2MSBncm91cCB3aGVuIG9mZmxpbmUhJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc0dyb3VwVjEodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbGVhdmVHcm91cDogR3JvdXAgJHt0aGlzLmlkRm9yTG9nZ2luZygpfSBpcyBub3QgR3JvdXBWMSFgXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgY29uc3QgZ3JvdXBJZCA9IHRoaXMuZ2V0KCdncm91cElkJyk7XG5cbiAgICBpZiAoIWdyb3VwSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgbGVhdmVHcm91cC8ke3RoaXMuaWRGb3JMb2dnaW5nKCl9OiBObyBncm91cElkIWApO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwSWRlbnRpZmllcnMgPSB0aGlzLmdldFJlY2lwaWVudHMoKTtcbiAgICB0aGlzLnNldCh7IGxlZnQ6IHRydWUgfSk7XG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gICAgY29uc3QgbW9kZWwgPSBuZXcgd2luZG93LldoaXNwZXIuTWVzc2FnZSh7XG4gICAgICBjb252ZXJzYXRpb25JZDogdGhpcy5pZCxcbiAgICAgIGdyb3VwX3VwZGF0ZTogeyBsZWZ0OiAnWW91JyB9LFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IG5vdyxcbiAgICAgIHJlY2VpdmVkX2F0OiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHNlZW5TdGF0dXM6IFNlZW5TdGF0dXMuTm90QXBwbGljYWJsZSxcbiAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAvLyBUT0RPOiBERVNLVE9QLTcyMlxuICAgIH0gYXMgdW5rbm93biBhcyBNZXNzYWdlQXR0cmlidXRlc1R5cGUpO1xuXG4gICAgY29uc3QgaWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobW9kZWwuYXR0cmlidXRlcywge1xuICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICB9KTtcbiAgICBtb2RlbC5zZXQoeyBpZCB9KTtcblxuICAgIGNvbnN0IG1lc3NhZ2UgPSB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIobW9kZWwuaWQsIG1vZGVsKTtcbiAgICB0aGlzLmFkZFNpbmdsZU1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICBjb25zdCBvcHRpb25zID0gYXdhaXQgZ2V0U2VuZE9wdGlvbnModGhpcy5hdHRyaWJ1dGVzKTtcbiAgICBtZXNzYWdlLnNlbmQoXG4gICAgICBoYW5kbGVNZXNzYWdlU2VuZChcbiAgICAgICAgbWVzc2FnaW5nLmxlYXZlR3JvdXAoZ3JvdXBJZCwgZ3JvdXBJZGVudGlmaWVycywgb3B0aW9ucyksXG4gICAgICAgIHsgbWVzc2FnZUlkczogW10sIHNlbmRUeXBlOiAnbGVnYWN5R3JvdXBDaGFuZ2UnIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgYXN5bmMgbWFya1JlYWQoXG4gICAgbmV3ZXN0VW5yZWFkQXQ6IG51bWJlcixcbiAgICBvcHRpb25zOiB7XG4gICAgICByZWFkQXQ/OiBudW1iZXI7XG4gICAgICBzZW5kUmVhZFJlY2VpcHRzOiBib29sZWFuO1xuICAgICAgbmV3ZXN0U2VudEF0PzogbnVtYmVyO1xuICAgIH0gPSB7XG4gICAgICBzZW5kUmVhZFJlY2VpcHRzOiB0cnVlLFxuICAgIH1cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgbWFya0NvbnZlcnNhdGlvblJlYWQodGhpcy5hdHRyaWJ1dGVzLCBuZXdlc3RVbnJlYWRBdCwgb3B0aW9ucyk7XG4gICAgYXdhaXQgdGhpcy51cGRhdGVVbnJlYWQoKTtcbiAgfVxuXG4gIGFzeW5jIHVwZGF0ZVVucmVhZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB1bnJlYWRDb3VudCA9IGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5nZXRUb3RhbFVucmVhZEZvckNvbnZlcnNhdGlvbihcbiAgICAgIHRoaXMuaWQsXG4gICAgICB7XG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNHcm91cDogaXNHcm91cCh0aGlzLmF0dHJpYnV0ZXMpLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCBwcmV2VW5yZWFkQ291bnQgPSB0aGlzLmdldCgndW5yZWFkQ291bnQnKTtcbiAgICBpZiAocHJldlVucmVhZENvdW50ICE9PSB1bnJlYWRDb3VudCkge1xuICAgICAgdGhpcy5zZXQoeyB1bnJlYWRDb3VudCB9KTtcbiAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIGlzIGFuIGV4cGVuc2l2ZSBvcGVyYXRpb24gd2UgdXNlIHRvIHBvcHVsYXRlIHRoZSBtZXNzYWdlIHJlcXVlc3QgaGVybyByb3cuIEl0XG4gIC8vICAgc2hvd3MgZ3JvdXBzIHRoZSBjdXJyZW50IHVzZXIgaGFzIGluIGNvbW1vbiB3aXRoIHRoaXMgcG90ZW50aWFsIG5ldyBjb250YWN0LlxuICBhc3luYyB1cGRhdGVTaGFyZWRHcm91cHMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChpc01lKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG4gICAgY29uc3QgdGhlaXJVdWlkID0gdGhpcy5nZXRVdWlkKCk7XG4gICAgaWYgKCF0aGVpclV1aWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBvdXJHcm91cHMgPVxuICAgICAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0QWxsR3JvdXBzSW52b2x2aW5nVXVpZChvdXJVdWlkKTtcbiAgICBjb25zdCBzaGFyZWRHcm91cHMgPSBvdXJHcm91cHNcbiAgICAgIC5maWx0ZXIoXG4gICAgICAgIGMgPT5cbiAgICAgICAgICBjLmhhc01lbWJlcihvdXJVdWlkLnRvU3RyaW5nKCkpICYmIGMuaGFzTWVtYmVyKHRoZWlyVXVpZC50b1N0cmluZygpKVxuICAgICAgKVxuICAgICAgLnNvcnQoXG4gICAgICAgIChsZWZ0LCByaWdodCkgPT5cbiAgICAgICAgICAocmlnaHQuZ2V0KCd0aW1lc3RhbXAnKSB8fCAwKSAtIChsZWZ0LmdldCgndGltZXN0YW1wJykgfHwgMClcbiAgICAgICk7XG5cbiAgICBjb25zdCBzaGFyZWRHcm91cE5hbWVzID0gc2hhcmVkR3JvdXBzLm1hcChjb252ZXJzYXRpb24gPT5cbiAgICAgIGNvbnZlcnNhdGlvbi5nZXRUaXRsZSgpXG4gICAgKTtcblxuICAgIHRoaXMuc2V0KHsgc2hhcmVkR3JvdXBOYW1lcyB9KTtcbiAgfVxuXG4gIG9uQ2hhbmdlUHJvZmlsZUtleSgpOiB2b2lkIHtcbiAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgdGhpcy5nZXRQcm9maWxlcygpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldFByb2ZpbGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIHJlcXVlc3QgYWxsIGNvbnZlcnNhdGlvbiBtZW1iZXJzJyBrZXlzXG4gICAgY29uc3QgY29udmVyc2F0aW9ucyA9XG4gICAgICB0aGlzLmdldE1lbWJlcnMoKSBhcyB1bmtub3duIGFzIEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPjtcblxuICAgIGNvbnN0IHF1ZXVlID0gbmV3IFBRdWV1ZSh7XG4gICAgICBjb25jdXJyZW5jeTogMyxcbiAgICB9KTtcblxuICAgIC8vIENvbnZlcnQgUHJvbWlzZTx2b2lkW10+IHRoYXQgaXMgcmV0dXJuZWQgYnkgYWRkQWxsKCkgdG8gUHJvbWlzZTx2b2lkPlxuICAgIGNvbnN0IHByb21pc2UgPSAoYXN5bmMgKCkgPT4ge1xuICAgICAgYXdhaXQgcXVldWUuYWRkQWxsKFxuICAgICAgICBjb252ZXJzYXRpb25zLm1hcChcbiAgICAgICAgICBjb252ZXJzYXRpb24gPT4gKCkgPT5cbiAgICAgICAgICAgIGdldFByb2ZpbGUoY29udmVyc2F0aW9uLmdldCgndXVpZCcpLCBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JykpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSkoKTtcblxuICAgIHRoaXMuX2FjdGl2ZVByb2ZpbGVGZXRjaCA9IHByb21pc2U7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGlmICh0aGlzLl9hY3RpdmVQcm9maWxlRmV0Y2ggPT09IHByb21pc2UpIHtcbiAgICAgICAgdGhpcy5fYWN0aXZlUHJvZmlsZUZldGNoID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGdldEFjdGl2ZVByb2ZpbGVGZXRjaCgpOiBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5fYWN0aXZlUHJvZmlsZUZldGNoO1xuICB9XG5cbiAgYXN5bmMgc2V0RW5jcnlwdGVkUHJvZmlsZU5hbWUoXG4gICAgZW5jcnlwdGVkTmFtZTogc3RyaW5nLFxuICAgIGRlY3J5cHRpb25LZXk6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCFlbmNyeXB0ZWROYW1lKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZGVjcnlwdFxuICAgIGNvbnN0IHsgZ2l2ZW4sIGZhbWlseSB9ID0gZGVjcnlwdFByb2ZpbGVOYW1lKGVuY3J5cHRlZE5hbWUsIGRlY3J5cHRpb25LZXkpO1xuXG4gICAgLy8gZW5jb2RlXG4gICAgY29uc3QgcHJvZmlsZU5hbWUgPSBnaXZlbiA/IEJ5dGVzLnRvU3RyaW5nKGdpdmVuKSA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBwcm9maWxlRmFtaWx5TmFtZSA9IGZhbWlseSA/IEJ5dGVzLnRvU3RyaW5nKGZhbWlseSkgOiB1bmRlZmluZWQ7XG5cbiAgICAvLyBzZXQgdGhlbiBjaGVjayBmb3IgY2hhbmdlc1xuICAgIGNvbnN0IG9sZE5hbWUgPSB0aGlzLmdldFByb2ZpbGVOYW1lKCk7XG4gICAgY29uc3QgaGFkUHJldmlvdXNOYW1lID0gQm9vbGVhbihvbGROYW1lKTtcbiAgICB0aGlzLnNldCh7IHByb2ZpbGVOYW1lLCBwcm9maWxlRmFtaWx5TmFtZSB9KTtcblxuICAgIGNvbnN0IG5ld05hbWUgPSB0aGlzLmdldFByb2ZpbGVOYW1lKCk7XG5cbiAgICAvLyBOb3RlIHRoYXQgd2UgY29tcGFyZSB0aGUgY29tYmluZWQgbmFtZXMgdG8gZW5zdXJlIHRoYXQgd2UgZG9uJ3QgcHJlc2VudCB0aGUgZXhhY3RcbiAgICAvLyAgIHNhbWUgYmVmb3JlL2FmdGVyIHN0cmluZywgZXZlbiBpZiBzb21lb25lIGlzIG1vdmluZyBmcm9tIGp1c3QgZmlyc3QgbmFtZSB0b1xuICAgIC8vICAgZmlyc3QvbGFzdCBuYW1lIGluIHRoZWlyIHByb2ZpbGUgZGF0YS5cbiAgICBjb25zdCBuYW1lQ2hhbmdlZCA9IG9sZE5hbWUgIT09IG5ld05hbWU7XG5cbiAgICBpZiAoIWlzTWUodGhpcy5hdHRyaWJ1dGVzKSAmJiBoYWRQcmV2aW91c05hbWUgJiYgbmFtZUNoYW5nZWQpIHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IHtcbiAgICAgICAgdHlwZTogJ25hbWUnLFxuICAgICAgICBvbGROYW1lLFxuICAgICAgICBuZXdOYW1lLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgdGhpcy5hZGRQcm9maWxlQ2hhbmdlKGNoYW5nZSk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2V0UHJvZmlsZUF2YXRhcihcbiAgICBhdmF0YXJQYXRoOiB1bmRlZmluZWQgfCBudWxsIHwgc3RyaW5nLFxuICAgIGRlY3J5cHRpb25LZXk6IFVpbnQ4QXJyYXlcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKGlzTWUodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgaWYgKGF2YXRhclBhdGgpIHtcbiAgICAgICAgd2luZG93LnN0b3JhZ2UucHV0KCdhdmF0YXJVcmwnLCBhdmF0YXJQYXRoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnYXZhdGFyVXJsJyk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKCFhdmF0YXJQYXRoKSB7XG4gICAgICB0aGlzLnNldCh7IHByb2ZpbGVBdmF0YXI6IHVuZGVmaW5lZCB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gICAgaWYgKCFtZXNzYWdpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2V0UHJvZmlsZUF2YXRhcjogQ2Fubm90IGZldGNoIGF2YXRhciB3aGVuIG9mZmxpbmUhJyk7XG4gICAgfVxuICAgIGNvbnN0IGF2YXRhciA9IGF3YWl0IG1lc3NhZ2luZy5nZXRBdmF0YXIoYXZhdGFyUGF0aCk7XG5cbiAgICAvLyBkZWNyeXB0XG4gICAgY29uc3QgZGVjcnlwdGVkID0gZGVjcnlwdFByb2ZpbGUoYXZhdGFyLCBkZWNyeXB0aW9uS2V5KTtcblxuICAgIC8vIHVwZGF0ZSB0aGUgY29udmVyc2F0aW9uIGF2YXRhciBvbmx5IGlmIGhhc2ggZGlmZmVyc1xuICAgIGlmIChkZWNyeXB0ZWQpIHtcbiAgICAgIGNvbnN0IG5ld0F0dHJpYnV0ZXMgPSBhd2FpdCBDb252ZXJzYXRpb24ubWF5YmVVcGRhdGVQcm9maWxlQXZhdGFyKFxuICAgICAgICB0aGlzLmF0dHJpYnV0ZXMsXG4gICAgICAgIGRlY3J5cHRlZCxcbiAgICAgICAge1xuICAgICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICAgICAgZGVsZXRlQXR0YWNobWVudERhdGEsXG4gICAgICAgICAgZG9lc0F0dGFjaG1lbnRFeGlzdCxcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0KG5ld0F0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHNldFByb2ZpbGVLZXkoXG4gICAgcHJvZmlsZUtleTogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIHsgdmlhU3RvcmFnZVNlcnZpY2VTeW5jID0gZmFsc2UgfSA9IHt9XG4gICk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIC8vIHByb2ZpbGVLZXkgaXMgYSBzdHJpbmcgc28gd2UgY2FuIGNvbXBhcmUgaXQgZGlyZWN0bHlcbiAgICBpZiAodGhpcy5nZXQoJ3Byb2ZpbGVLZXknKSAhPT0gcHJvZmlsZUtleSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBTZXR0aW5nIHNlYWxlZFNlbmRlciB0byBVTktOT1dOIGZvciBjb252ZXJzYXRpb24gJHt0aGlzLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgICB0aGlzLnNldCh7XG4gICAgICAgIHByb2ZpbGVLZXlDcmVkZW50aWFsOiBudWxsLFxuICAgICAgICBhY2Nlc3NLZXk6IG51bGwsXG4gICAgICAgIHNlYWxlZFNlbmRlcjogU0VBTEVEX1NFTkRFUi5VTktOT1dOLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIERvbid0IHRyaWdnZXIgaW1tZWRpYXRlIHByb2ZpbGUgZmV0Y2hlcyB3aGVuIHN5bmNpbmcgdG8gcmVtb3RlIHN0b3JhZ2VcbiAgICAgIHRoaXMuc2V0KHsgcHJvZmlsZUtleSB9LCB7IHNpbGVudDogdmlhU3RvcmFnZVNlcnZpY2VTeW5jIH0pO1xuXG4gICAgICAvLyBJZiBvdXIgcHJvZmlsZSBrZXkgd2FzIGNsZWFyZWQgYWJvdmUsIHdlIGRvbid0IHRlbGwgb3VyIGxpbmtlZCBkZXZpY2VzIGFib3V0IGl0LlxuICAgICAgLy8gICBXZSB3YW50IGxpbmtlZCBkZXZpY2VzIHRvIHRlbGwgdXMgd2hhdCBpdCBzaG91bGQgYmUsIGluc3RlYWQgb2YgdGVsbGluZyB0aGVtIHRvXG4gICAgICAvLyAgIGVyYXNlIHRoZWlyIGxvY2FsIHZhbHVlLlxuICAgICAgaWYgKCF2aWFTdG9yYWdlU2VydmljZVN5bmMgJiYgcHJvZmlsZUtleSkge1xuICAgICAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoJ3Byb2ZpbGVLZXknKTtcbiAgICAgIH1cblxuICAgICAgdGhpcy5kZXJpdmVBY2Nlc3NLZXlJZk5lZWRlZCgpO1xuXG4gICAgICAvLyBXZSB3aWxsIHVwZGF0ZSB0aGUgY29udmVyc2F0aW9uIGR1cmluZyBzdG9yYWdlIHNlcnZpY2Ugc3luY1xuICAgICAgaWYgKCF2aWFTdG9yYWdlU2VydmljZVN5bmMpIHtcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgZGVyaXZlQWNjZXNzS2V5SWZOZWVkZWQoKTogdm9pZCB7XG4gICAgY29uc3QgcHJvZmlsZUtleSA9IHRoaXMuZ2V0KCdwcm9maWxlS2V5Jyk7XG4gICAgaWYgKCFwcm9maWxlS2V5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICh0aGlzLmdldCgnYWNjZXNzS2V5JykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9maWxlS2V5QnVmZmVyID0gQnl0ZXMuZnJvbUJhc2U2NChwcm9maWxlS2V5KTtcbiAgICBjb25zdCBhY2Nlc3NLZXlCdWZmZXIgPSBkZXJpdmVBY2Nlc3NLZXkocHJvZmlsZUtleUJ1ZmZlcik7XG4gICAgY29uc3QgYWNjZXNzS2V5ID0gQnl0ZXMudG9CYXNlNjQoYWNjZXNzS2V5QnVmZmVyKTtcbiAgICB0aGlzLnNldCh7IGFjY2Vzc0tleSB9KTtcbiAgfVxuXG4gIGRlcml2ZVByb2ZpbGVLZXlWZXJzaW9uKCk6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gICAgY29uc3QgcHJvZmlsZUtleSA9IHRoaXMuZ2V0KCdwcm9maWxlS2V5Jyk7XG4gICAgaWYgKCFwcm9maWxlS2V5KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdXVpZCA9IHRoaXMuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbGFzdFByb2ZpbGUgPSB0aGlzLmdldCgnbGFzdFByb2ZpbGUnKTtcbiAgICBpZiAobGFzdFByb2ZpbGU/LnByb2ZpbGVLZXkgPT09IHByb2ZpbGVLZXkpIHtcbiAgICAgIHJldHVybiBsYXN0UHJvZmlsZS5wcm9maWxlS2V5VmVyc2lvbjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9maWxlS2V5VmVyc2lvbiA9IFV0aWwuemtncm91cC5kZXJpdmVQcm9maWxlS2V5VmVyc2lvbihcbiAgICAgIHByb2ZpbGVLZXksXG4gICAgICB1dWlkXG4gICAgKTtcbiAgICBpZiAoIXByb2ZpbGVLZXlWZXJzaW9uKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ2Rlcml2ZVByb2ZpbGVLZXlWZXJzaW9uOiBGYWlsZWQgdG8gZGVyaXZlIHByb2ZpbGUga2V5IHZlcnNpb24sICcgK1xuICAgICAgICAgICdjbGVhcmluZyBwcm9maWxlIGtleS4nXG4gICAgICApO1xuICAgICAgdGhpcy5zZXRQcm9maWxlS2V5KHVuZGVmaW5lZCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgcmV0dXJuIHByb2ZpbGVLZXlWZXJzaW9uO1xuICB9XG5cbiAgYXN5bmMgdXBkYXRlTGFzdFByb2ZpbGUoXG4gICAgb2xkVmFsdWU6IENvbnZlcnNhdGlvbkxhc3RQcm9maWxlVHlwZSB8IHVuZGVmaW5lZCxcbiAgICB7IHByb2ZpbGVLZXksIHByb2ZpbGVLZXlWZXJzaW9uIH06IENvbnZlcnNhdGlvbkxhc3RQcm9maWxlVHlwZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBsYXN0UHJvZmlsZSA9IHRoaXMuZ2V0KCdsYXN0UHJvZmlsZScpO1xuXG4gICAgLy8gQXRvbWljIHVwZGF0ZXMgb25seVxuICAgIGlmIChsYXN0UHJvZmlsZSAhPT0gb2xkVmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICBsYXN0UHJvZmlsZT8ucHJvZmlsZUtleSA9PT0gcHJvZmlsZUtleSAmJlxuICAgICAgbGFzdFByb2ZpbGU/LnByb2ZpbGVLZXlWZXJzaW9uID09PSBwcm9maWxlS2V5VmVyc2lvblxuICAgICkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy53YXJuKFxuICAgICAgJ0NvbnZlcnNhdGlvbk1vZGVsLnVwZGF0ZUxhc3RQcm9maWxlOiB1cGRhdGluZyBmb3InLFxuICAgICAgdGhpcy5pZEZvckxvZ2dpbmcoKVxuICAgICk7XG5cbiAgICB0aGlzLnNldCh7IGxhc3RQcm9maWxlOiB7IHByb2ZpbGVLZXksIHByb2ZpbGVLZXlWZXJzaW9uIH0gfSk7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBhc3luYyByZW1vdmVMYXN0UHJvZmlsZShcbiAgICBvbGRWYWx1ZTogQ29udmVyc2F0aW9uTGFzdFByb2ZpbGVUeXBlIHwgdW5kZWZpbmVkXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIEF0b21pYyB1cGRhdGVzIG9ubHlcbiAgICBpZiAodGhpcy5nZXQoJ2xhc3RQcm9maWxlJykgIT09IG9sZFZhbHVlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLndhcm4oXG4gICAgICAnQ29udmVyc2F0aW9uTW9kZWwucmVtb3ZlTGFzdFByb2ZpbGU6IGNhbGxlZCBmb3InLFxuICAgICAgdGhpcy5pZEZvckxvZ2dpbmcoKVxuICAgICk7XG5cbiAgICB0aGlzLnNldCh7XG4gICAgICBsYXN0UHJvZmlsZTogdW5kZWZpbmVkLFxuXG4gICAgICAvLyBXZSBkb24ndCBoYXZlIGFueSBrbm93bGVkZ2Ugb2YgcHJvZmlsZSBhbnltb3JlLiBEcm9wIGFsbCBhc3NvY2lhdGVkXG4gICAgICAvLyBkYXRhLlxuICAgICAgYWJvdXQ6IHVuZGVmaW5lZCxcbiAgICAgIGFib3V0RW1vamk6IHVuZGVmaW5lZCxcbiAgICAgIHByb2ZpbGVBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICB9KTtcblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIGhhc01lbWJlcihpZGVudGlmaWVyOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgICBjb25zdCBpZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldENvbnZlcnNhdGlvbklkKGlkZW50aWZpZXIpO1xuICAgIGNvbnN0IG1lbWJlcklkcyA9IHRoaXMuZ2V0TWVtYmVySWRzKCk7XG5cbiAgICByZXR1cm4gd2luZG93Ll8uY29udGFpbnMobWVtYmVySWRzLCBpZCk7XG4gIH1cblxuICBmZXRjaENvbnRhY3RzKCk6IHZvaWQge1xuICAgIGNvbnN0IG1lbWJlcnMgPSB0aGlzLmdldE1lbWJlcnMoKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgdGhpcy5jb250YWN0Q29sbGVjdGlvbiEucmVzZXQobWVtYmVycyk7XG4gIH1cblxuICBhc3luYyBkZXN0cm95TWVzc2FnZXMoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdGhpcy5zZXQoe1xuICAgICAgbGFzdE1lc3NhZ2U6IG51bGwsXG4gICAgICB0aW1lc3RhbXA6IG51bGwsXG4gICAgICBhY3RpdmVfYXQ6IG51bGwsXG4gICAgICBwZW5kaW5nVW5pdmVyc2FsVGltZXI6IHVuZGVmaW5lZCxcbiAgICB9KTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG5cbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlQWxsTWVzc2FnZXNJbkNvbnZlcnNhdGlvbih0aGlzLmlkLCB7XG4gICAgICBsb2dJZDogdGhpcy5pZEZvckxvZ2dpbmcoKSxcbiAgICB9KTtcbiAgfVxuXG4gIGdldFRpdGxlKCk6IHN0cmluZyB7XG4gICAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIGNvbnN0IHVzZXJuYW1lID0gdGhpcy5nZXQoJ3VzZXJuYW1lJyk7XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIHRoaXMuZ2V0KCduYW1lJykgfHxcbiAgICAgICAgdGhpcy5nZXRQcm9maWxlTmFtZSgpIHx8XG4gICAgICAgIHRoaXMuZ2V0TnVtYmVyKCkgfHxcbiAgICAgICAgKHVzZXJuYW1lICYmIHdpbmRvdy5pMThuKCdhdC11c2VybmFtZScsIHsgdXNlcm5hbWUgfSkpIHx8XG4gICAgICAgIHdpbmRvdy5pMThuKCd1bmtub3duQ29udGFjdCcpXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcy5nZXQoJ25hbWUnKSB8fCB3aW5kb3cuaTE4bigndW5rbm93bkdyb3VwJyk7XG4gIH1cblxuICBnZXRQcm9maWxlTmFtZSgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gVXRpbC5jb21iaW5lTmFtZXMoXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgIHRoaXMuZ2V0KCdwcm9maWxlTmFtZScpISxcbiAgICAgICAgdGhpcy5nZXQoJ3Byb2ZpbGVGYW1pbHlOYW1lJylcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldE51bWJlcigpOiBzdHJpbmcge1xuICAgIGlmICghaXNEaXJlY3RDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuICcnO1xuICAgIH1cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IG51bWJlciA9IHRoaXMuZ2V0KCdlMTY0JykhO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBwYXJzZWROdW1iZXIgPSB3aW5kb3cubGlicGhvbmVudW1iZXJJbnN0YW5jZS5wYXJzZShudW1iZXIpO1xuICAgICAgY29uc3QgcmVnaW9uQ29kZSA9IGdldFJlZ2lvbkNvZGVGb3JOdW1iZXIobnVtYmVyKTtcbiAgICAgIGlmIChyZWdpb25Db2RlID09PSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3JlZ2lvbkNvZGUnKSkge1xuICAgICAgICByZXR1cm4gd2luZG93LmxpYnBob25lbnVtYmVySW5zdGFuY2UuZm9ybWF0KFxuICAgICAgICAgIHBhcnNlZE51bWJlcixcbiAgICAgICAgICB3aW5kb3cubGlicGhvbmVudW1iZXJGb3JtYXQuTkFUSU9OQUxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB3aW5kb3cubGlicGhvbmVudW1iZXJJbnN0YW5jZS5mb3JtYXQoXG4gICAgICAgIHBhcnNlZE51bWJlcixcbiAgICAgICAgd2luZG93LmxpYnBob25lbnVtYmVyRm9ybWF0LklOVEVSTkFUSU9OQUxcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bWJlcjtcbiAgICB9XG4gIH1cblxuICBnZXRDb2xvcigpOiBBdmF0YXJDb2xvclR5cGUge1xuICAgIHJldHVybiBtaWdyYXRlQ29sb3IodGhpcy5nZXQoJ2NvbG9yJykpO1xuICB9XG5cbiAgZ2V0Q29udmVyc2F0aW9uQ29sb3IoKTogQ29udmVyc2F0aW9uQ29sb3JUeXBlIHwgdW5kZWZpbmVkIHtcbiAgICByZXR1cm4gdGhpcy5nZXQoJ2NvbnZlcnNhdGlvbkNvbG9yJyk7XG4gIH1cblxuICBnZXRDdXN0b21Db2xvckRhdGEoKToge1xuICAgIGN1c3RvbUNvbG9yPzogQ3VzdG9tQ29sb3JUeXBlO1xuICAgIGN1c3RvbUNvbG9ySWQ/OiBzdHJpbmc7XG4gIH0ge1xuICAgIGlmICh0aGlzLmdldENvbnZlcnNhdGlvbkNvbG9yKCkgIT09ICdjdXN0b20nKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBjdXN0b21Db2xvcjogdW5kZWZpbmVkLFxuICAgICAgICBjdXN0b21Db2xvcklkOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBjdXN0b21Db2xvcjogdGhpcy5nZXQoJ2N1c3RvbUNvbG9yJyksXG4gICAgICBjdXN0b21Db2xvcklkOiB0aGlzLmdldCgnY3VzdG9tQ29sb3JJZCcpLFxuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGdldEF2YXRhclBhdGgoKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICBjb25zdCBzaG91bGRTaG93UHJvZmlsZUF2YXRhciA9XG4gICAgICBpc01lKHRoaXMuYXR0cmlidXRlcykgfHxcbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncHJlZmVyQ29udGFjdEF2YXRhcnMnKSA9PT0gZmFsc2U7XG4gICAgY29uc3QgYXZhdGFyID0gc2hvdWxkU2hvd1Byb2ZpbGVBdmF0YXJcbiAgICAgID8gdGhpcy5nZXQoJ3Byb2ZpbGVBdmF0YXInKSB8fCB0aGlzLmdldCgnYXZhdGFyJylcbiAgICAgIDogdGhpcy5nZXQoJ2F2YXRhcicpIHx8IHRoaXMuZ2V0KCdwcm9maWxlQXZhdGFyJyk7XG4gICAgcmV0dXJuIGF2YXRhcj8ucGF0aCB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBwcml2YXRlIGdldEF2YXRhckhhc2goKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgICBjb25zdCBhdmF0YXIgPSBpc01lKHRoaXMuYXR0cmlidXRlcylcbiAgICAgID8gdGhpcy5nZXQoJ3Byb2ZpbGVBdmF0YXInKSB8fCB0aGlzLmdldCgnYXZhdGFyJylcbiAgICAgIDogdGhpcy5nZXQoJ2F2YXRhcicpIHx8IHRoaXMuZ2V0KCdwcm9maWxlQXZhdGFyJyk7XG4gICAgcmV0dXJuIGF2YXRhcj8uaGFzaCB8fCB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRBYnNvbHV0ZUF2YXRhclBhdGgoKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgICBjb25zdCBhdmF0YXJQYXRoID0gdGhpcy5nZXRBdmF0YXJQYXRoKCk7XG4gICAgcmV0dXJuIGF2YXRhclBhdGggPyBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKGF2YXRhclBhdGgpIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgZ2V0QWJzb2x1dGVQcm9maWxlQXZhdGFyUGF0aCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IGF2YXRhclBhdGggPSB0aGlzLmdldCgncHJvZmlsZUF2YXRhcicpPy5wYXRoO1xuICAgIHJldHVybiBhdmF0YXJQYXRoID8gZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChhdmF0YXJQYXRoKSA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGdldEFic29sdXRlVW5ibHVycmVkQXZhdGFyUGF0aCgpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICAgIGNvbnN0IHVuYmx1cnJlZEF2YXRhclBhdGggPSB0aGlzLmdldCgndW5ibHVycmVkQXZhdGFyUGF0aCcpO1xuICAgIHJldHVybiB1bmJsdXJyZWRBdmF0YXJQYXRoXG4gICAgICA/IGdldEFic29sdXRlQXR0YWNobWVudFBhdGgodW5ibHVycmVkQXZhdGFyUGF0aClcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgdW5ibHVyQXZhdGFyKCk6IHZvaWQge1xuICAgIGNvbnN0IGF2YXRhclBhdGggPSB0aGlzLmdldEF2YXRhclBhdGgoKTtcbiAgICBpZiAoYXZhdGFyUGF0aCkge1xuICAgICAgdGhpcy5zZXQoJ3VuYmx1cnJlZEF2YXRhclBhdGgnLCBhdmF0YXJQYXRoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy51bnNldCgndW5ibHVycmVkQXZhdGFyUGF0aCcpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgY2FuQ2hhbmdlVGltZXIoKTogYm9vbGVhbiB7XG4gICAgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzR3JvdXBWMUFuZERpc2FibGVkKCkpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBpZiAoIWlzR3JvdXBWMih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBjb25zdCBhY2Nlc3NDb250cm9sRW51bSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG4gICAgY29uc3QgYWNjZXNzQ29udHJvbCA9IHRoaXMuZ2V0KCdhY2Nlc3NDb250cm9sJyk7XG4gICAgY29uc3QgY2FuQW55b25lQ2hhbmdlVGltZXIgPVxuICAgICAgYWNjZXNzQ29udHJvbCAmJlxuICAgICAgKGFjY2Vzc0NvbnRyb2wuYXR0cmlidXRlcyA9PT0gYWNjZXNzQ29udHJvbEVudW0uQU5ZIHx8XG4gICAgICAgIGFjY2Vzc0NvbnRyb2wuYXR0cmlidXRlcyA9PT0gYWNjZXNzQ29udHJvbEVudW0uTUVNQkVSKTtcbiAgICBpZiAoY2FuQW55b25lQ2hhbmdlVGltZXIpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLmFyZVdlQWRtaW4oKTtcbiAgfVxuXG4gIGNhbkVkaXRHcm91cEluZm8oKTogYm9vbGVhbiB7XG4gICAgaWYgKCFpc0dyb3VwVjIodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdldCgnbGVmdCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIChcbiAgICAgIHRoaXMuYXJlV2VBZG1pbigpIHx8XG4gICAgICB0aGlzLmdldCgnYWNjZXNzQ29udHJvbCcpPy5hdHRyaWJ1dGVzID09PVxuICAgICAgICBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkLk1FTUJFUlxuICAgICk7XG4gIH1cblxuICBhcmVXZUFkbWluKCk6IGJvb2xlYW4ge1xuICAgIGlmICghaXNHcm91cFYyKHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBtZW1iZXJFbnVtID0gUHJvdG8uTWVtYmVyLlJvbGU7XG4gICAgY29uc3QgbWVtYmVycyA9IHRoaXMuZ2V0KCdtZW1iZXJzVjInKSB8fCBbXTtcbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoKT8udG9TdHJpbmcoKTtcbiAgICBjb25zdCBtZSA9IG1lbWJlcnMuZmluZChpdGVtID0+IGl0ZW0udXVpZCA9PT0gb3VyVXVpZCk7XG4gICAgaWYgKCFtZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiBtZS5yb2xlID09PSBtZW1iZXJFbnVtLkFETUlOSVNUUkFUT1I7XG4gIH1cblxuICAvLyBTZXQgb2YgaXRlbXMgdG8gY2FwdHVyZUNoYW5nZXMgb246XG4gIC8vIFstXSB1dWlkXG4gIC8vIFstXSBlMTY0XG4gIC8vIFtYXSBwcm9maWxlS2V5XG4gIC8vIFstXSBpZGVudGl0eUtleVxuICAvLyBbWF0gdmVyaWZpZWQhXG4gIC8vIFstXSBwcm9maWxlTmFtZVxuICAvLyBbLV0gcHJvZmlsZUZhbWlseU5hbWVcbiAgLy8gW1hdIGJsb2NrZWRcbiAgLy8gW1hdIHdoaXRlbGlzdGVkXG4gIC8vIFtYXSBhcmNoaXZlZFxuICAvLyBbWF0gbWFya2VkVW5yZWFkXG4gIC8vIFtYXSBkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkXG4gIGNhcHR1cmVDaGFuZ2UobG9nTWVzc2FnZTogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9nLmluZm8oJ3N0b3JhZ2VTZXJ2aWNlW2NhcHR1cmVDaGFuZ2VdJywgbG9nTWVzc2FnZSwgdGhpcy5pZEZvckxvZ2dpbmcoKSk7XG4gICAgdGhpcy5zZXQoeyBuZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSB9KTtcblxuICAgIHRoaXMucXVldWVKb2IoJ2NhcHR1cmVDaGFuZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBTZXJ2aWNlcy5zdG9yYWdlU2VydmljZVVwbG9hZEpvYigpO1xuICAgIH0pO1xuICB9XG5cbiAgc3RhcnRNdXRlVGltZXIoeyB2aWFTdG9yYWdlU2VydmljZVN5bmMgPSBmYWxzZSB9ID0ge30pOiB2b2lkIHtcbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLm11dGVUaW1lcik7XG4gICAgdGhpcy5tdXRlVGltZXIgPSB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBtdXRlRXhwaXJlc0F0ID0gdGhpcy5nZXQoJ211dGVFeHBpcmVzQXQnKTtcbiAgICBpZiAoaXNOdW1iZXIobXV0ZUV4cGlyZXNBdCkgJiYgbXV0ZUV4cGlyZXNBdCA8IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSKSB7XG4gICAgICBjb25zdCBkZWxheSA9IG11dGVFeHBpcmVzQXQgLSBEYXRlLm5vdygpO1xuICAgICAgaWYgKGRlbGF5IDw9IDApIHtcbiAgICAgICAgdGhpcy5zZXRNdXRlRXhwaXJhdGlvbigwLCB7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyB9KTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aGlzLm11dGVUaW1lciA9IHNldFRpbWVvdXQoKCkgPT4gdGhpcy5zZXRNdXRlRXhwaXJhdGlvbigwKSwgZGVsYXkpO1xuICAgIH1cbiAgfVxuXG4gIHRvZ2dsZUhpZGVTdG9yaWVzKCk6IHZvaWQge1xuICAgIHRoaXMuc2V0KHsgaGlkZVN0b3J5OiAhdGhpcy5nZXQoJ2hpZGVTdG9yeScpIH0pO1xuICAgIHRoaXMuY2FwdHVyZUNoYW5nZSgnaGlkZVN0b3J5Jyk7XG4gIH1cblxuICBzZXRNdXRlRXhwaXJhdGlvbihcbiAgICBtdXRlRXhwaXJlc0F0ID0gMCxcbiAgICB7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYyA9IGZhbHNlIH0gPSB7fVxuICApOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2RXhwaXJhdGlvbiA9IHRoaXMuZ2V0KCdtdXRlRXhwaXJlc0F0Jyk7XG5cbiAgICBpZiAocHJldkV4cGlyYXRpb24gPT09IG11dGVFeHBpcmVzQXQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldCh7IG11dGVFeHBpcmVzQXQgfSk7XG5cbiAgICAvLyBEb24ndCBjYXVzZSBkdXBsaWNhdGUgY2FwdHVyZUNoYW5nZVxuICAgIHRoaXMuc3RhcnRNdXRlVGltZXIoeyB2aWFTdG9yYWdlU2VydmljZVN5bmM6IHRydWUgfSk7XG5cbiAgICBpZiAoIXZpYVN0b3JhZ2VTZXJ2aWNlU3luYykge1xuICAgICAgdGhpcy5jYXB0dXJlQ2hhbmdlKCdtdXRlZFVudGlsVGltZXN0YW1wJyk7XG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgfVxuICB9XG5cbiAgaXNNdXRlZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaXNDb252ZXJzYXRpb25NdXRlZCh0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgYXN5bmMgbm90aWZ5KFxuICAgIG1lc3NhZ2U6IFJlYWRvbmx5PE1lc3NhZ2VNb2RlbD4sXG4gICAgcmVhY3Rpb24/OiBSZWFkb25seTxSZWFjdGlvbk1vZGVsPlxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBBcyBhIHBlcmZvcm1hbmNlIG9wdGltaXphdGlvbiBkb24ndCBwZXJmb3JtIGFueSB3b3JrIGlmIG5vdGlmaWNhdGlvbnMgYXJlXG4gICAgLy8gZGlzYWJsZWQuXG4gICAgaWYgKCFub3RpZmljYXRpb25TZXJ2aWNlLmlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmlzTXV0ZWQoKSkge1xuICAgICAgaWYgKHRoaXMuZ2V0KCdkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldFV1aWQoKT8udG9TdHJpbmcoKTtcbiAgICAgIGNvbnN0IG1lbnRpb25zTWUgPSAobWVzc2FnZS5nZXQoJ2JvZHlSYW5nZXMnKSB8fCBbXSkuc29tZShcbiAgICAgICAgcmFuZ2UgPT4gcmFuZ2UubWVudGlvblV1aWQgJiYgcmFuZ2UubWVudGlvblV1aWQgPT09IG91clV1aWRcbiAgICAgICk7XG4gICAgICBpZiAoIW1lbnRpb25zTWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghaXNJbmNvbWluZyhtZXNzYWdlLmF0dHJpYnV0ZXMpICYmICFyZWFjdGlvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gdGhpcy5pZDtcblxuICAgIGNvbnN0IHNlbmRlciA9IHJlYWN0aW9uXG4gICAgICA/IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChyZWFjdGlvbi5nZXQoJ2Zyb21JZCcpKVxuICAgICAgOiBnZXRDb250YWN0KG1lc3NhZ2UuYXR0cmlidXRlcyk7XG4gICAgY29uc3Qgc2VuZGVyTmFtZSA9IHNlbmRlclxuICAgICAgPyBzZW5kZXIuZ2V0VGl0bGUoKVxuICAgICAgOiB3aW5kb3cuaTE4bigndW5rbm93bkNvbnRhY3QnKTtcbiAgICBjb25zdCBzZW5kZXJUaXRsZSA9IGlzRGlyZWN0Q29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcylcbiAgICAgID8gc2VuZGVyTmFtZVxuICAgICAgOiB3aW5kb3cuaTE4bignbm90aWZpY2F0aW9uU2VuZGVySW5Hcm91cCcsIHtcbiAgICAgICAgICBzZW5kZXI6IHNlbmRlck5hbWUsXG4gICAgICAgICAgZ3JvdXA6IHRoaXMuZ2V0VGl0bGUoKSxcbiAgICAgICAgfSk7XG5cbiAgICBsZXQgbm90aWZpY2F0aW9uSWNvblVybDtcbiAgICBjb25zdCBhdmF0YXIgPSB0aGlzLmdldCgnYXZhdGFyJykgfHwgdGhpcy5nZXQoJ3Byb2ZpbGVBdmF0YXInKTtcbiAgICBpZiAoYXZhdGFyICYmIGF2YXRhci5wYXRoKSB7XG4gICAgICBub3RpZmljYXRpb25JY29uVXJsID0gZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aChhdmF0YXIucGF0aCk7XG4gICAgfSBlbHNlIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBub3RpZmljYXRpb25JY29uVXJsID0gYXdhaXQgdGhpcy5nZXRJZGVudGljb24oKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gTm90IHRlY2huaWNhbGx5IG5lZWRlZCwgYnV0IGhlbHBzIHVzIGJlIGV4cGxpY2l0OiB3ZSBkb24ndCBzaG93IGFuIGljb24gZm9yIGFcbiAgICAgIC8vICAgZ3JvdXAgdGhhdCBkb2Vzbid0IGhhdmUgYW4gaWNvbi5cbiAgICAgIG5vdGlmaWNhdGlvbkljb25VcmwgPSB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZUpTT04gPSBtZXNzYWdlLnRvSlNPTigpO1xuICAgIGNvbnN0IG1lc3NhZ2VJZCA9IG1lc3NhZ2UuaWQ7XG4gICAgY29uc3QgaXNFeHBpcmluZ01lc3NhZ2UgPSBNZXNzYWdlLmhhc0V4cGlyYXRpb24obWVzc2FnZUpTT04pO1xuXG4gICAgbm90aWZpY2F0aW9uU2VydmljZS5hZGQoe1xuICAgICAgc2VuZGVyVGl0bGUsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG5vdGlmaWNhdGlvbkljb25VcmwsXG4gICAgICBpc0V4cGlyaW5nTWVzc2FnZSxcbiAgICAgIG1lc3NhZ2U6IG1lc3NhZ2UuZ2V0Tm90aWZpY2F0aW9uVGV4dCgpLFxuICAgICAgbWVzc2FnZUlkLFxuICAgICAgcmVhY3Rpb246IHJlYWN0aW9uID8gcmVhY3Rpb24udG9KU09OKCkgOiBudWxsLFxuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRJZGVudGljb24oKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICBjb25zdCBjb2xvciA9IHRoaXMuZ2V0Q29sb3IoKTtcbiAgICBjb25zdCB0aXRsZSA9IHRoaXMuZ2V0VGl0bGUoKTtcblxuICAgIGNvbnN0IGNvbnRlbnQgPSAodGl0bGUgJiYgZ2V0SW5pdGlhbHModGl0bGUpKSB8fCAnIyc7XG5cbiAgICBjb25zdCBjYWNoZWQgPSB0aGlzLmNhY2hlZElkZW50aWNvbjtcbiAgICBpZiAoY2FjaGVkICYmIGNhY2hlZC5jb250ZW50ID09PSBjb250ZW50ICYmIGNhY2hlZC5jb2xvciA9PT0gY29sb3IpIHtcbiAgICAgIHJldHVybiBjYWNoZWQudXJsO1xuICAgIH1cblxuICAgIGNvbnN0IHVybCA9IGF3YWl0IGNyZWF0ZUlkZW50aWNvbihjb2xvciwgY29udGVudCk7XG5cbiAgICB0aGlzLmNhY2hlZElkZW50aWNvbiA9IHsgY29udGVudCwgY29sb3IsIHVybCB9O1xuXG4gICAgcmV0dXJuIHVybDtcbiAgfVxuXG4gIG5vdGlmeVR5cGluZyhvcHRpb25zOiB7XG4gICAgaXNUeXBpbmc6IGJvb2xlYW47XG4gICAgc2VuZGVySWQ6IHN0cmluZztcbiAgICBmcm9tTWU6IGJvb2xlYW47XG4gICAgc2VuZGVyRGV2aWNlOiBudW1iZXI7XG4gIH0pOiB2b2lkIHtcbiAgICBjb25zdCB7IGlzVHlwaW5nLCBzZW5kZXJJZCwgZnJvbU1lLCBzZW5kZXJEZXZpY2UgfSA9IG9wdGlvbnM7XG5cbiAgICAvLyBXZSBkb24ndCBkbyBhbnl0aGluZyB3aXRoIHR5cGluZyBtZXNzYWdlcyBmcm9tIG91ciBvdGhlciBkZXZpY2VzXG4gICAgaWYgKGZyb21NZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIC8vIERyb3AgdHlwaW5nIGluZGljYXRvcnMgZm9yIGFubm91bmNlbWVudCBvbmx5IGdyb3VwcyB3aGVyZSB0aGUgc2VuZGVyXG4gICAgLy8gaXMgbm90IGFuIGFkbWluXG4gICAgaWYgKHRoaXMuZ2V0KCdhbm5vdW5jZW1lbnRzT25seScpICYmICF0aGlzLmlzQWRtaW4oc2VuZGVySWQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdHlwaW5nVG9rZW4gPSBgJHtzZW5kZXJJZH0uJHtzZW5kZXJEZXZpY2V9YDtcblxuICAgIHRoaXMuY29udGFjdFR5cGluZ1RpbWVycyA9IHRoaXMuY29udGFjdFR5cGluZ1RpbWVycyB8fCB7fTtcbiAgICBjb25zdCByZWNvcmQgPSB0aGlzLmNvbnRhY3RUeXBpbmdUaW1lcnNbdHlwaW5nVG9rZW5dO1xuXG4gICAgaWYgKHJlY29yZCkge1xuICAgICAgY2xlYXJUaW1lb3V0KHJlY29yZC50aW1lcik7XG4gICAgfVxuXG4gICAgaWYgKGlzVHlwaW5nKSB7XG4gICAgICB0aGlzLmNvbnRhY3RUeXBpbmdUaW1lcnNbdHlwaW5nVG9rZW5dID0gdGhpcy5jb250YWN0VHlwaW5nVGltZXJzW1xuICAgICAgICB0eXBpbmdUb2tlblxuICAgICAgXSB8fCB7XG4gICAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgICAgc2VuZGVySWQsXG4gICAgICAgIHNlbmRlckRldmljZSxcbiAgICAgIH07XG5cbiAgICAgIHRoaXMuY29udGFjdFR5cGluZ1RpbWVyc1t0eXBpbmdUb2tlbl0udGltZXIgPSBzZXRUaW1lb3V0KFxuICAgICAgICB0aGlzLmNsZWFyQ29udGFjdFR5cGluZ1RpbWVyLmJpbmQodGhpcywgdHlwaW5nVG9rZW4pLFxuICAgICAgICAxNSAqIDEwMDBcbiAgICAgICk7XG4gICAgICBpZiAoIXJlY29yZCkge1xuICAgICAgICAvLyBVc2VyIHdhcyBub3QgcHJldmlvdXNseSB0eXBpbmcgYmVmb3JlLiBTdGF0ZSBjaGFuZ2UhXG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHRoaXMuY29udGFjdFR5cGluZ1RpbWVyc1t0eXBpbmdUb2tlbl07XG4gICAgICBpZiAocmVjb3JkKSB7XG4gICAgICAgIC8vIFVzZXIgd2FzIHByZXZpb3VzbHkgdHlwaW5nLCBhbmQgaXMgbm8gbG9uZ2VyLiBTdGF0ZSBjaGFuZ2UhXG4gICAgICAgIHRoaXMudHJpZ2dlcignY2hhbmdlJywgdGhpcywgeyBmb3JjZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBjbGVhckNvbnRhY3RUeXBpbmdUaW1lcih0eXBpbmdUb2tlbjogc3RyaW5nKTogdm9pZCB7XG4gICAgdGhpcy5jb250YWN0VHlwaW5nVGltZXJzID0gdGhpcy5jb250YWN0VHlwaW5nVGltZXJzIHx8IHt9O1xuICAgIGNvbnN0IHJlY29yZCA9IHRoaXMuY29udGFjdFR5cGluZ1RpbWVyc1t0eXBpbmdUb2tlbl07XG5cbiAgICBpZiAocmVjb3JkKSB7XG4gICAgICBjbGVhclRpbWVvdXQocmVjb3JkLnRpbWVyKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmNvbnRhY3RUeXBpbmdUaW1lcnNbdHlwaW5nVG9rZW5dO1xuXG4gICAgICAvLyBVc2VyIHdhcyBwcmV2aW91c2x5IHR5cGluZywgYnV0IHRpbWVkIG91dCBvciB3ZSByZWNlaXZlZCBtZXNzYWdlLiBTdGF0ZSBjaGFuZ2UhXG4gICAgICB0aGlzLnRyaWdnZXIoJ2NoYW5nZScsIHRoaXMsIHsgZm9yY2U6IHRydWUgfSk7XG4gICAgfVxuICB9XG5cbiAgcGluKCk6IHZvaWQge1xuICAgIGlmICh0aGlzLmdldCgnaXNQaW5uZWQnKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdwaW5uaW5nJywgdGhpcy5pZEZvckxvZ2dpbmcoKSk7XG4gICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9uSWRzID0gbmV3IFNldChcbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncGlubmVkQ29udmVyc2F0aW9uSWRzJywgbmV3IEFycmF5PHN0cmluZz4oKSlcbiAgICApO1xuXG4gICAgcGlubmVkQ29udmVyc2F0aW9uSWRzLmFkZCh0aGlzLmlkKTtcblxuICAgIHRoaXMud3JpdGVQaW5uZWRDb252ZXJzYXRpb25zKFsuLi5waW5uZWRDb252ZXJzYXRpb25JZHNdKTtcblxuICAgIHRoaXMuc2V0KCdpc1Bpbm5lZCcsIHRydWUpO1xuXG4gICAgaWYgKHRoaXMuZ2V0KCdpc0FyY2hpdmVkJykpIHtcbiAgICAgIHRoaXMuc2V0KHsgaXNBcmNoaXZlZDogZmFsc2UgfSk7XG4gICAgfVxuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIHVucGluKCk6IHZvaWQge1xuICAgIGlmICghdGhpcy5nZXQoJ2lzUGlubmVkJykpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbygndW4tcGlubmluZycsIHRoaXMuaWRGb3JMb2dnaW5nKCkpO1xuXG4gICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9uSWRzID0gbmV3IFNldChcbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncGlubmVkQ29udmVyc2F0aW9uSWRzJywgbmV3IEFycmF5PHN0cmluZz4oKSlcbiAgICApO1xuXG4gICAgcGlubmVkQ29udmVyc2F0aW9uSWRzLmRlbGV0ZSh0aGlzLmlkKTtcblxuICAgIHRoaXMud3JpdGVQaW5uZWRDb252ZXJzYXRpb25zKFsuLi5waW5uZWRDb252ZXJzYXRpb25JZHNdKTtcblxuICAgIHRoaXMuc2V0KCdpc1Bpbm5lZCcsIGZhbHNlKTtcbiAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICB3cml0ZVBpbm5lZENvbnZlcnNhdGlvbnMocGlubmVkQ29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+KTogdm9pZCB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdwaW5uZWRDb252ZXJzYXRpb25JZHMnLCBwaW5uZWRDb252ZXJzYXRpb25JZHMpO1xuXG4gICAgY29uc3QgbXlJZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkKCk7XG4gICAgY29uc3QgbWUgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQobXlJZCk7XG5cbiAgICBpZiAobWUpIHtcbiAgICAgIG1lLmNhcHR1cmVDaGFuZ2UoJ3BpbicpO1xuICAgIH1cbiAgfVxuXG4gIHNldERvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQobmV3VmFsdWU6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBwcmV2aW91c1ZhbHVlID0gQm9vbGVhbih0aGlzLmdldCgnZG9udE5vdGlmeUZvck1lbnRpb25zSWZNdXRlZCcpKTtcbiAgICBpZiAocHJldmlvdXNWYWx1ZSA9PT0gbmV3VmFsdWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnNldCh7IGRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQ6IG5ld1ZhbHVlIH0pO1xuICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24odGhpcy5hdHRyaWJ1dGVzKTtcbiAgICB0aGlzLmNhcHR1cmVDaGFuZ2UoJ2RvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQnKTtcbiAgfVxuXG4gIGFja25vd2xlZGdlR3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucyhcbiAgICBncm91cE5hbWVDb2xsaXNpb25zOiBSZWFkb25seTxHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGU+XG4gICk6IHZvaWQge1xuICAgIHRoaXMuc2V0KCdhY2tub3dsZWRnZWRHcm91cE5hbWVDb2xsaXNpb25zJywgZ3JvdXBOYW1lQ29sbGlzaW9ucyk7XG4gICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbih0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgb25PcGVuU3RhcnQoKTogdm9pZCB7XG4gICAgbG9nLmluZm8oYGNvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9IG9wZW4gc3RhcnRgKTtcbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5vbkNvbnZvT3BlblN0YXJ0KHRoaXMuaWQpO1xuICB9XG5cbiAgb25PcGVuQ29tcGxldGUoc3RhcnRlZEF0OiBudW1iZXIpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGRlbHRhID0gbm93IC0gc3RhcnRlZEF0O1xuXG4gICAgbG9nLmluZm8oYGNvbnZlcnNhdGlvbiAke3RoaXMuaWRGb3JMb2dnaW5nKCl9IG9wZW4gdG9vayAke2RlbHRhfW1zYCk7XG4gICAgd2luZG93LkNJPy5oYW5kbGVFdmVudCgnY29udmVyc2F0aW9uOm9wZW4nLCB7IGRlbHRhIH0pO1xuICB9XG5cbiAgYXN5bmMgZmx1c2hEZWJvdW5jZWRVcGRhdGVzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCB0aGlzLmRlYm91bmNlZFVwZGF0ZUxhc3RNZXNzYWdlPy5mbHVzaCgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBsb2dJZCA9IHRoaXMuaWRGb3JMb2dnaW5nKCk7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBmbHVzaERlYm91bmNlZFVwZGF0ZXMoJHtsb2dJZH0pOiBnb3QgZXJyb3JgLFxuICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICApO1xuICAgIH1cbiAgfVxufVxuXG53aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb24gPSBDb252ZXJzYXRpb25Nb2RlbDtcblxud2luZG93LldoaXNwZXIuQ29udmVyc2F0aW9uQ29sbGVjdGlvbiA9IHdpbmRvdy5CYWNrYm9uZS5Db2xsZWN0aW9uLmV4dGVuZCh7XG4gIG1vZGVsOiB3aW5kb3cuV2hpc3Blci5Db252ZXJzYXRpb24sXG5cbiAgLyoqXG4gICAqIHdpbmRvdy5CYWNrYm9uZSBkZWZpbmVzIGEgYF9ieUlkYCBmaWVsZC4gSGVyZSB3ZSBzZXQgdXAgYWRkaXRpb25hbCBgX2J5RTE2NGAsXG4gICAqIGBfYnlVdWlkYCwgYW5kIGBfYnlHcm91cElkYCBmaWVsZHMgc28gd2UgY2FuIHRyYWNrIGNvbnZlcnNhdGlvbnMgYnkgbW9yZVxuICAgKiB0aGFuIGp1c3QgdGhlaXIgaWQuXG4gICAqL1xuICBpbml0aWFsaXplKCkge1xuICAgIHRoaXMuZXJhc2VMb29rdXBzKCk7XG4gICAgdGhpcy5vbihcbiAgICAgICdpZFVwZGF0ZWQnLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIChtb2RlbDogQ29udmVyc2F0aW9uTW9kZWwsIGlkUHJvcDogc3RyaW5nLCBvbGRWYWx1ZTogYW55KSA9PiB7XG4gICAgICAgIGlmIChvbGRWYWx1ZSkge1xuICAgICAgICAgIGlmIChpZFByb3AgPT09ICdlMTY0Jykge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5RTE2NFtvbGRWYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZFByb3AgPT09ICd1dWlkJykge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5VXVpZFtvbGRWYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpZFByb3AgPT09ICdncm91cElkJykge1xuICAgICAgICAgICAgZGVsZXRlIHRoaXMuX2J5R3JvdXBJZFtvbGRWYWx1ZV07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGUxNjQgPSBtb2RlbC5nZXQoJ2UxNjQnKTtcbiAgICAgICAgaWYgKGUxNjQpIHtcbiAgICAgICAgICB0aGlzLl9ieUUxNjRbZTE2NF0gPSBtb2RlbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dWlkID0gbW9kZWwuZ2V0KCd1dWlkJyk7XG4gICAgICAgIGlmICh1dWlkKSB7XG4gICAgICAgICAgdGhpcy5fYnlVdWlkW3V1aWRdID0gbW9kZWw7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBJZCA9IG1vZGVsLmdldCgnZ3JvdXBJZCcpO1xuICAgICAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgICAgIHRoaXMuX2J5R3JvdXBJZFtncm91cElkXSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcbiAgfSxcblxuICByZXNldCguLi5hcmdzOiBBcnJheTxXaGF0SXNUaGlzPikge1xuICAgIHdpbmRvdy5CYWNrYm9uZS5Db2xsZWN0aW9uLnByb3RvdHlwZS5yZXNldC5hcHBseSh0aGlzLCBhcmdzIGFzIFdoYXRJc1RoaXMpO1xuICAgIHRoaXMucmVzZXRMb29rdXBzKCk7XG4gIH0sXG5cbiAgcmVzZXRMb29rdXBzKCkge1xuICAgIHRoaXMuZXJhc2VMb29rdXBzKCk7XG4gICAgdGhpcy5nZW5lcmF0ZUxvb2t1cHModGhpcy5tb2RlbHMpO1xuICB9LFxuXG4gIGdlbmVyYXRlTG9va3Vwcyhtb2RlbHM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+KSB7XG4gICAgbW9kZWxzLmZvckVhY2gobW9kZWwgPT4ge1xuICAgICAgY29uc3QgZTE2NCA9IG1vZGVsLmdldCgnZTE2NCcpO1xuICAgICAgaWYgKGUxNjQpIHtcbiAgICAgICAgY29uc3QgZXhpc3RpbmcgPSB0aGlzLl9ieUUxNjRbZTE2NF07XG5cbiAgICAgICAgLy8gUHJlZmVyIHRoZSBjb250YWN0IHdpdGggYm90aCBlMTY0IGFuZCB1dWlkXG4gICAgICAgIGlmICghZXhpc3RpbmcgfHwgKGV4aXN0aW5nICYmICFleGlzdGluZy5nZXQoJ3V1aWQnKSkpIHtcbiAgICAgICAgICB0aGlzLl9ieUUxNjRbZTE2NF0gPSBtb2RlbDtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCB1dWlkID0gbW9kZWwuZ2V0KCd1dWlkJyk7XG4gICAgICBpZiAodXVpZCkge1xuICAgICAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuX2J5VXVpZFt1dWlkXTtcblxuICAgICAgICAvLyBQcmVmZXIgdGhlIGNvbnRhY3Qgd2l0aCBib3RoIGUxNjQgYW5kIHV1aWRcbiAgICAgICAgaWYgKCFleGlzdGluZyB8fCAoZXhpc3RpbmcgJiYgIWV4aXN0aW5nLmdldCgnZTE2NCcpKSkge1xuICAgICAgICAgIHRoaXMuX2J5VXVpZFt1dWlkXSA9IG1vZGVsO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyb3VwSWQgPSBtb2RlbC5nZXQoJ2dyb3VwSWQnKTtcbiAgICAgIGlmIChncm91cElkKSB7XG4gICAgICAgIHRoaXMuX2J5R3JvdXBJZFtncm91cElkXSA9IG1vZGVsO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGVyYXNlTG9va3VwcygpIHtcbiAgICB0aGlzLl9ieUUxNjQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgIHRoaXMuX2J5VXVpZCA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gICAgdGhpcy5fYnlHcm91cElkID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiAgfSxcblxuICBhZGQoZGF0YTogV2hhdElzVGhpcyB8IEFycmF5PFdoYXRJc1RoaXM+KSB7XG4gICAgbGV0IGh5ZHJhdGVkRGF0YTtcblxuICAgIC8vIEZpcnN0LCB3ZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZSBkYXRhIHdlJ3JlIHdvcmtpbmcgd2l0aCBpcyBDb252ZXJzYXRpb24gbW9kZWxzXG4gICAgaWYgKEFycmF5LmlzQXJyYXkoZGF0YSkpIHtcbiAgICAgIGh5ZHJhdGVkRGF0YSA9IFtdO1xuICAgICAgZm9yIChsZXQgaSA9IDAsIG1heCA9IGRhdGEubGVuZ3RoOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgaXRlbSA9IGRhdGFbaV07XG5cbiAgICAgICAgLy8gV2UgY3JlYXRlIGEgbmV3IG1vZGVsIGlmIGl0J3Mgbm90IGFscmVhZHkgYSBtb2RlbFxuICAgICAgICBpZiAoIWl0ZW0uZ2V0KSB7XG4gICAgICAgICAgaHlkcmF0ZWREYXRhLnB1c2gobmV3IHdpbmRvdy5XaGlzcGVyLkNvbnZlcnNhdGlvbihpdGVtKSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgaHlkcmF0ZWREYXRhLnB1c2goaXRlbSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKCFkYXRhLmdldCkge1xuICAgICAgaHlkcmF0ZWREYXRhID0gbmV3IHdpbmRvdy5XaGlzcGVyLkNvbnZlcnNhdGlvbihkYXRhKTtcbiAgICB9IGVsc2Uge1xuICAgICAgaHlkcmF0ZWREYXRhID0gZGF0YTtcbiAgICB9XG5cbiAgICAvLyBOZXh0LCB3ZSB1cGRhdGUgb3VyIGxvb2t1cHMgZmlyc3QgdG8gcHJldmVudCBpbmZpbml0ZSBsb29wcyBvbiB0aGUgJ2FkZCcgZXZlbnRcbiAgICB0aGlzLmdlbmVyYXRlTG9va3VwcyhcbiAgICAgIEFycmF5LmlzQXJyYXkoaHlkcmF0ZWREYXRhKSA/IGh5ZHJhdGVkRGF0YSA6IFtoeWRyYXRlZERhdGFdXG4gICAgKTtcblxuICAgIC8vIExhc3RseSwgd2UgZmlyZSBvZmYgdGhlIGFkZCBldmVudHMgcmVsYXRlZCB0byB0aGlzIGNoYW5nZVxuICAgIHdpbmRvdy5CYWNrYm9uZS5Db2xsZWN0aW9uLnByb3RvdHlwZS5hZGQuY2FsbCh0aGlzLCBoeWRyYXRlZERhdGEpO1xuXG4gICAgcmV0dXJuIGh5ZHJhdGVkRGF0YTtcbiAgfSxcblxuICAvKipcbiAgICogd2luZG93LkJhY2tib25lIGNvbGxlY3Rpb25zIGhhdmUgYSBgX2J5SWRgIGZpZWxkIHRoYXQgYGdldGAgZGVmZXJzIHRvLiBIZXJlLCB3ZVxuICAgKiBvdmVycmlkZSBgZ2V0YCB0byBmaXJzdCBhY2Nlc3Mgb3VyIGN1c3RvbSBgX2J5RTE2NGAsIGBfYnlVdWlkYCwgYW5kXG4gICAqIGBfYnlHcm91cElkYCBmdW5jdGlvbnMsIGZvbGxvd2VkIGJ5IGZhbGxpbmcgYmFjayB0byB0aGUgb3JpZ2luYWxcbiAgICogd2luZG93LkJhY2tib25lIGltcGxlbWVudGF0aW9uLlxuICAgKi9cbiAgZ2V0KGlkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gKFxuICAgICAgdGhpcy5fYnlFMTY0W2lkXSB8fFxuICAgICAgdGhpcy5fYnlFMTY0W2ArJHtpZH1gXSB8fFxuICAgICAgdGhpcy5fYnlVdWlkW2lkXSB8fFxuICAgICAgdGhpcy5fYnlHcm91cElkW2lkXSB8fFxuICAgICAgd2luZG93LkJhY2tib25lLkNvbGxlY3Rpb24ucHJvdG90eXBlLmdldC5jYWxsKHRoaXMsIGlkKVxuICAgICk7XG4gIH0sXG5cbiAgY29tcGFyYXRvcihtOiBXaGF0SXNUaGlzKSB7XG4gICAgcmV0dXJuIC0obS5nZXQoJ2FjdGl2ZV9hdCcpIHx8IDApO1xuICB9LFxufSk7XG5cbnR5cGUgU29ydGFibGVCeVRpdGxlID0ge1xuICBnZXRUaXRsZTogKCkgPT4gc3RyaW5nO1xufTtcblxuY29uc3Qgc29ydENvbnZlcnNhdGlvblRpdGxlcyA9IChcbiAgbGVmdDogU29ydGFibGVCeVRpdGxlLFxuICByaWdodDogU29ydGFibGVCeVRpdGxlLFxuICBjb2xsYXRvcjogSW50bC5Db2xsYXRvclxuKSA9PiB7XG4gIHJldHVybiBjb2xsYXRvci5jb21wYXJlKGxlZnQuZ2V0VGl0bGUoKSwgcmlnaHQuZ2V0VGl0bGUoKSk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFzRDtBQUN0RCx5QkFBdUM7QUFDdkMscUJBQW1CO0FBQ25CLGtCQUFtQztBQWFuQyx5QkFBNEI7QUFDNUIsMkJBQThCO0FBQzlCLGdDQUdPO0FBQ1AscUNBQXdDO0FBRXhDLHdCQUFzQjtBQUV0QixxQkFBeUI7QUFDekIsc0JBQWlDO0FBQ2pDLG1CQUE4QjtBQUM5QixlQUEwQjtBQU8xQiw2QkFBa0M7QUFDbEMseUJBQTBCO0FBUzFCLHFCQUEyQjtBQUMzQixvQkFBNkI7QUFDN0IsaUNBQW9DO0FBQ3BDLG1DQUFzQztBQUN0Qyx3Q0FBMkM7QUFDM0MsOEJBQWlDO0FBQ2pDLGdDQUFtQztBQUNuQyx5QkFBNEI7QUFFNUIsa0JBQWtEO0FBQ2xELGtCQUE0QztBQUU1QyxvQkFBb0U7QUFDcEUsWUFBdUI7QUFFdkIsaUNBQW9DO0FBQ3BDLDBCQUE2QjtBQUM3QixzQkFBeUI7QUFDekIsc0JBQXlCO0FBQ3pCLDJCQUFvQztBQUNwQyw0QkFBK0I7QUFDL0Isb0NBQXVDO0FBQ3ZDLGtDQUFxQztBQUNyQywrQkFBa0M7QUFDbEMsb0NBQXVDO0FBQ3ZDLCtDQUFrRDtBQUNsRCwrQkFBMkI7QUFDM0IsOEJBQTJCO0FBRTNCLGdCQUEyQjtBQUMzQix1QkFPTztBQUNQLDJCQUFzQztBQUV0QyxvQ0FNTztBQUNQLHNCQUF1QztBQUN2QyxxQkFPTztBQUNQLGtDQUdPO0FBRVAsa0NBQXFDO0FBQ3JDLHFCQUE0QjtBQUU1QixzQ0FBeUM7QUFDekMsd0JBQTJCO0FBQzNCLDBCQUE4QjtBQUM5QiwyQkFBOEI7QUFDOUIsNkJBQWdDO0FBQ2hDLFVBQXFCO0FBQ3JCLGFBQXdCO0FBQ3hCLDZCQUFnQztBQUVoQyxpQ0FBb0M7QUFDcEMsMEJBQTRDO0FBQzVDLCtCQUEyQjtBQUMzQiwwQkFBNEM7QUFHNUMsT0FBTyxVQUFVLE9BQU8sV0FBVyxDQUFDO0FBRXBDLE1BQU0sRUFBRSxVQUFVLFNBQVMsT0FBTztBQUNsQyxNQUFNLEVBQUUsWUFBWSxPQUFPLE9BQU87QUFDbEMsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFLE9BQU8sT0FBTztBQUNsQixNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLE9BQU87QUFFbEIsTUFBTSxjQUFjLFVBQVUsT0FBTztBQUNyQyxNQUFNLGVBQWUsVUFBVSxTQUFTO0FBRXhDLE1BQU0sNkJBQTZCO0FBQ25DLE1BQU0sOEJBQThCO0FBRXBDLE1BQU0sMEJBQTBCO0FBRWhDLE1BQU0sOENBQThDLG9CQUFJLElBQUk7QUFBQSxFQUMxRDtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQ0YsQ0FBQztBQVFNLE1BQU0sMEJBQTBCLE9BQU8sU0FDM0MsTUFBa0M7QUFBQSxFQUQ5QjtBQUFBO0FBeUNMLHdCQUFlLElBQUksS0FBSyxTQUFTLFFBQVcsRUFBRSxhQUFhLE9BQU8sQ0FBQztBQWdCM0QsMEJBQWlCO0FBQUE7QUFBQSxFQUloQixXQUFnRDtBQUN2RCxXQUFPO0FBQUEsTUFDTCxhQUFhO0FBQUEsTUFDYixVQUFVLE9BQU8sV0FBVyxRQUFRLFNBQVMsZUFBZTtBQUFBLE1BQzVELGNBQWM7QUFBQSxNQUNkLGtCQUFrQjtBQUFBLElBQ3BCO0FBQUEsRUFDRjtBQUFBLEVBRUEsZUFBdUI7QUFDckIsV0FBTyxxREFBNEIsS0FBSyxVQUFVO0FBQUEsRUFDcEQ7QUFBQSxFQUlBLGdCQUFvQztBQUNsQyxXQUFPLEtBQUssSUFBSSxNQUFNLEtBQUssS0FBSyxJQUFJLE1BQU07QUFBQSxFQUM1QztBQUFBLEVBRUEsdUJBQStEO0FBQzdELFVBQU0sYUFBYSxJQUFJLE9BQU8sU0FBUyxXQUE4QjtBQUNyRSxVQUFNLFdBQVcsSUFBSSxLQUFLLFNBQVMsUUFBVyxFQUFFLGFBQWEsT0FBTyxDQUFDO0FBQ3JFLGVBQVcsYUFBYSxDQUN0QixNQUNBLFVBQ0c7QUFDSCxhQUFPLFNBQVMsUUFBUSxLQUFLLFNBQVMsR0FBRyxNQUFNLFNBQVMsQ0FBQztBQUFBLElBQzNEO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVTLFdBQ1AsYUFBa0QsQ0FBQyxHQUM3QztBQUNOLFVBQU0sT0FBTyxLQUFLLElBQUksTUFBTTtBQUM1QixVQUFNLGlCQUNKLFFBQVEsd0NBQWMsTUFBTSw4QkFBOEI7QUFDNUQsUUFBSSxRQUFRLG1CQUFtQixNQUFNO0FBQ25DLFVBQUksS0FDRix1REFDSyxXQUFXLGdCQUNsQjtBQUNBLFdBQUssSUFBSSxRQUFRLGNBQWM7QUFBQSxJQUNqQztBQUVBLFFBQUksb0NBQVksV0FBVyxJQUFJLEtBQUssR0FBRztBQUNyQyxXQUFLLElBQUksRUFBRSxJQUFJLGlCQUFLLFNBQVMsRUFBRSxTQUFTLEdBQUcsTUFBTSxXQUFXLEdBQUcsQ0FBQztBQUFBLElBQ2xFO0FBRUEsU0FBSyxZQUFZO0FBRWpCLFNBQUssZUFBZSxPQUFPLFdBQVcsUUFBUSxTQUFTO0FBSXZELFNBQUssaUJBQWlCLFFBQVEsUUFBUTtBQUV0QyxTQUFLLHNCQUFzQiw0QkFBUyxLQUFLLFlBQVksR0FBRztBQUN4RCxTQUFLLDZCQUE2Qiw0QkFDaEMsS0FBSyxrQkFBa0IsS0FBSyxJQUFJLEdBQ2hDLEdBQ0Y7QUFDQSxTQUFLLDhCQUNILEtBQUssK0JBQ0wsNEJBQVMsS0FBSyxtQkFBbUIsS0FBSyxJQUFJLEdBQUcsWUFBWTtBQUUzRCxTQUFLLG9CQUFvQixLQUFLLHFCQUFxQjtBQUNuRCxTQUFLLGtCQUFrQixHQUNyQix1RUFDQSxLQUFLLDRCQUNMLElBQ0Y7QUFDQSxRQUFJLENBQUMsd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQzFDLFdBQUssa0JBQWtCLEdBQ3JCLG1CQUNBLEtBQUssdUJBQXVCLEtBQUssSUFBSSxDQUN2QztBQUFBLElBQ0Y7QUFFQSxTQUFLLEdBQUcsY0FBYyxLQUFLLFlBQVk7QUFDdkMsU0FBSyxHQUFHLHFCQUFxQixLQUFLLGtCQUFrQjtBQUVwRCxVQUFNLGVBQWUsS0FBSyxJQUFJLGNBQWM7QUFDNUMsUUFBSSxpQkFBaUIsUUFBVztBQUM5QixXQUFLLElBQUksRUFBRSxjQUFjLGtDQUFjLFFBQVEsQ0FBQztBQUFBLElBQ2xEO0FBQ0EsU0FBSyxNQUFNLHNCQUFzQjtBQUNqQyxTQUFLLE1BQU0sa0NBQWtDO0FBQzdDLFNBQUssTUFBTSxtQkFBbUI7QUFDOUIsU0FBSyxNQUFNLFFBQVE7QUFFbkIsU0FBSyxHQUFHLG1DQUFtQyxLQUFLLGFBQWE7QUFFN0QsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxtQkFBbUI7QUFJeEIsU0FBSyxHQUNILFVBQ0EsQ0FBQyxRQUFzQixVQUErQixDQUFDLE1BQU07QUFDM0QsWUFBTSxjQUFjLE9BQU8sS0FBSyxLQUFLLFdBQVcsQ0FBQyxDQUFDO0FBQ2xELFlBQU0seUJBQ0osQ0FBQyxRQUFRLFNBQ1QsUUFDRSxZQUFZLFVBQ1YsWUFBWSxNQUFNLFNBQ2hCLDRDQUE0QyxJQUFJLEdBQUcsQ0FDckQsQ0FDSjtBQUNGLFVBQUksd0JBQXdCO0FBQzFCO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxhQUFhO0FBQ3BCLGFBQUssaUJBQWlCLEtBQUs7QUFBQSxNQUM3QjtBQUNBLFdBQUssY0FBYztBQUNuQixXQUFLLFFBQVEsZ0JBQWdCLE1BQU0sS0FBSyxjQUFjO0FBQUEsSUFDeEQsQ0FDRjtBQUlBLFNBQUssaUJBQWlCLEtBQUssVUFBVTtBQUVyQyxTQUFLLDRCQUE0Qiw0QkFDL0IsS0FBSyxpQkFBaUIsS0FBSyxJQUFJLEdBQy9CLFlBQ0Y7QUFDQSxTQUFLLCtCQUErQiw0QkFDbEMsS0FBSyxvQkFBb0IsS0FBSyxJQUFJLEdBQ2xDLFlBQ0Y7QUFFQSxVQUFNLGdCQUFnQixLQUFLLFNBQVM7QUFDcEMsUUFBSSxLQUFLLElBQUksT0FBTyxNQUFNLGVBQWU7QUFDdkMsV0FBSyxJQUFJLFNBQVMsYUFBYTtBQUFBLElBS2pDO0FBQUEsRUFDRjtBQUFBLEVBRUEsb0JBQXlDO0FBQ3ZDLFdBQU87QUFBQSxNQUNMLFlBQVksTUFBTSxLQUFLLElBQUksU0FBUztBQUFBLE1BQ3BDLFlBQVksTUFBTSxLQUFLLFdBQVc7QUFBQSxNQUNsQyxXQUFXLENBQUMsT0FBZSxLQUFLLFVBQVUsRUFBRTtBQUFBLE1BQzVDLGNBQWMsTUFBTSxLQUFLLGFBQWE7QUFBQSxNQUN0QyxXQUFXLE1BQU0sNkNBQVUsS0FBSyxVQUFVO0FBQUEsTUFDMUMsU0FBUyxNQUFNLDZDQUFVLEtBQUssVUFBVTtBQUFBLE1BRXhDLGtCQUFrQixNQUFNLEtBQUssSUFBSSxlQUFlO0FBQUEsTUFDaEQsbUJBQW1CLE9BQU8sa0JBQXFDO0FBQzdELGFBQUssSUFBSSxFQUFFLGNBQWMsQ0FBQztBQUMxQixlQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsTUFDdkQ7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEseUJBQXlCLElBQXFCO0FBQzVDLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUNBLFVBQU0seUJBQXlCLEtBQUssSUFBSSx3QkFBd0I7QUFFaEUsUUFBSSxDQUFDLDBCQUEwQixDQUFDLHVCQUF1QixRQUFRO0FBQzdELGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxPQUFPLGlCQUFLLGNBQWMsRUFBRSxFQUFFLFNBQVM7QUFDN0MsV0FBTyx1QkFBdUIsS0FBSyxVQUFRLEtBQUssU0FBUyxJQUFJO0FBQUEsRUFDL0Q7QUFBQSxFQUVBLGdCQUFnQixJQUFxQjtBQUNuQyxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0IsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLG1CQUFtQixLQUFLLElBQUksa0JBQWtCO0FBRXBELFFBQUksQ0FBQyxvQkFBb0IsQ0FBQyxpQkFBaUIsUUFBUTtBQUNqRCxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sT0FBTyxpQkFBSyxjQUFjLEVBQUUsRUFBRSxTQUFTO0FBQzdDLFdBQU8saUJBQWlCLEtBQUssVUFBUSxLQUFLLFNBQVMsSUFBSTtBQUFBLEVBQ3pEO0FBQUEsRUFFQSxlQUFlLElBQXFCO0FBQ2xDLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUNBLFVBQU0sa0JBQWtCLEtBQUssSUFBSSxpQkFBaUI7QUFFbEQsUUFBSSxDQUFDLG1CQUFtQixDQUFDLGdCQUFnQixRQUFRO0FBQy9DLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxPQUFPLGlCQUFLLGNBQWMsRUFBRSxFQUFFLFNBQVM7QUFDN0MsV0FBTyxnQkFBZ0IsS0FBSyxZQUFVLE9BQU8sU0FBUyxJQUFJO0FBQUEsRUFDNUQ7QUFBQSxFQUVBLHlCQUF5QixJQUFxQjtBQUM1QyxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0IsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLHlCQUF5QixLQUFLLElBQUksd0JBQXdCO0FBRWhFLFFBQUksQ0FBQywwQkFBMEIsQ0FBQyx1QkFBdUIsUUFBUTtBQUM3RCxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sT0FBTyxpQkFBSyxjQUFjLEVBQUUsRUFBRSxTQUFTO0FBQzdDLFdBQU8sT0FBTyxFQUFFLElBQUksd0JBQXdCLFVBQVEsS0FBSyxTQUFTLElBQUk7QUFBQSxFQUN4RTtBQUFBLEVBRUEsU0FBUyxJQUFxQjtBQUM1QixRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0IsWUFBTSxJQUFJLE1BQ1IsaURBQWlELEtBQUssYUFBYSxHQUNyRTtBQUFBLElBQ0Y7QUFDQSxVQUFNLFlBQVksS0FBSyxJQUFJLFdBQVc7QUFFdEMsUUFBSSxDQUFDLGFBQWEsQ0FBQyxVQUFVLFFBQVE7QUFDbkMsYUFBTztBQUFBLElBQ1Q7QUFDQSxVQUFNLE9BQU8saUJBQUssY0FBYyxFQUFFLEVBQUUsU0FBUztBQUU3QyxXQUFPLE9BQU8sRUFBRSxJQUFJLFdBQVcsVUFBUSxLQUFLLFNBQVMsSUFBSTtBQUFBLEVBQzNEO0FBQUEsUUFFTSwrQkFDSixTQUNnRDtBQUNoRCxVQUFNLFFBQVEsS0FBSyxhQUFhO0FBQ2hDLFVBQU0sVUFBVSxLQUFLLElBQUksYUFBYTtBQUN0QyxVQUFNLGFBQWEsUUFBUSxPQUFPLE1BQU0sU0FBUyxRQUFRLE9BQU8sTUFBTTtBQUV0RSxRQUFJLFlBQVksV0FBVyxZQUFZO0FBQ3JDLFVBQUksS0FDRixrQ0FBa0MsMEJBQTBCLHNDQUFzQyxVQUNwRztBQUNBLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxPQUFPLE9BQU8sT0FBTyxxQ0FBcUM7QUFBQSxNQUMvRCxhQUFhLFdBQVc7QUFBQSxNQUN4QixPQUFPLEtBQUs7QUFBQSxJQUNkLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxxQkFDSixnQkFDZ0Q7QUFDaEQsVUFBTSxRQUFRLEtBQUssYUFBYTtBQUtoQyxRQUFJLENBQUMsS0FBSyxnQkFBZ0IsY0FBYyxHQUFHO0FBQ3pDLFVBQUksS0FDRix3QkFBd0IsVUFBVSxtRUFDcEM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZ0JBQWdCLE9BQU8sdUJBQXVCLElBQUksY0FBYztBQUN0RSxRQUFJLENBQUMsZUFBZTtBQUNsQixZQUFNLElBQUksTUFDUix3QkFBd0IsaURBQWlELGdCQUMzRTtBQUFBLElBQ0Y7QUFLQSxRQUFJLDZCQUE2QixjQUFjLElBQUksc0JBQXNCO0FBQ3pFLFFBQUksQ0FBQyw0QkFBNEI7QUFDL0IsWUFBTSxjQUFjLFlBQVk7QUFFaEMsbUNBQTZCLGNBQWMsSUFBSSxzQkFBc0I7QUFDckUsVUFBSSxDQUFDLDRCQUE0QjtBQUMvQixjQUFNLElBQUksTUFDUix3QkFBd0IsbURBQW1ELGNBQWMsYUFBYSxHQUN4RztBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxPQUFPLE9BQU8sT0FBTyx5QkFBeUI7QUFBQSxNQUNuRCxPQUFPLEtBQUs7QUFBQSxNQUNaO0FBQUEsTUFDQSwwQkFBMEIsT0FBTyxzQkFBc0I7QUFBQSxJQUN6RCxDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sOEJBQ0osZ0JBQ2dEO0FBQ2hELFVBQU0sUUFBUSxLQUFLLGFBQWE7QUFLaEMsUUFBSSxDQUFDLEtBQUsseUJBQXlCLGNBQWMsR0FBRztBQUNsRCxVQUFJLEtBQ0YsaUNBQWlDLFVBQVUsc0VBQzdDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDdEUsUUFBSSxDQUFDLGVBQWU7QUFDbEIsWUFBTSxJQUFJLE1BQ1IsaUNBQWlDLGlEQUFpRCxnQkFDcEY7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLGNBQWMsSUFBSSxNQUFNO0FBQ3JDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxJQUFJLE1BQ1IsaUNBQWlDLHdDQUF3QyxnQkFDM0U7QUFBQSxJQUNGO0FBRUEsV0FBTyxPQUFPLE9BQU8sT0FBTyw2Q0FBNkM7QUFBQSxNQUN2RSxPQUFPLEtBQUs7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sMkJBQ0osZ0JBQ2dEO0FBQ2hELFVBQU0sUUFBUSxLQUFLLGFBQWE7QUFLaEMsUUFBSSxDQUFDLEtBQUsseUJBQXlCLGNBQWMsR0FBRztBQUNsRCxVQUFJLEtBQ0YsOEJBQThCLFVBQVUsc0VBQzFDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGdCQUFnQixPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDdEUsUUFBSSxDQUFDLGVBQWU7QUFDbEIsWUFBTSxJQUFJLE1BQ1IsOEJBQThCLGlEQUFpRCxnQkFDakY7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLGNBQWMsSUFBSSxNQUFNO0FBQ3JDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxJQUFJLE1BQ1IsOEJBQThCLHdDQUF3QyxjQUFjLGFBQWEsR0FDbkc7QUFBQSxJQUNGO0FBRUEsVUFBTSxVQUFVLE9BQU8sV0FBVyxRQUFRLEtBQ3ZDLGVBQWUscUJBQVMsR0FBRyxFQUMzQixTQUFTO0FBRVosV0FBTyxPQUFPLE9BQU8sT0FBTyw0Q0FBNEM7QUFBQSxNQUN0RSxPQUFPLEtBQUs7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLDRCQUVKO0FBQ0EsVUFBTSxRQUFRLEtBQUssYUFBYTtBQUdoQyxVQUFNLGlCQUNKLE9BQU8sdUJBQXVCLDRCQUE0QjtBQUU1RCxVQUFNLFlBQVksT0FBTyx1QkFBdUIsSUFBSSxjQUFjO0FBQ2xFLFFBQUksQ0FBQyxXQUFXO0FBQ2QsWUFBTSxJQUFJLE1BQ1IsNkJBQTZCLGlEQUFpRCxnQkFDaEY7QUFBQSxJQUNGO0FBS0EsUUFBSSw2QkFBNkIsVUFBVSxJQUFJLHNCQUFzQjtBQUNyRSxRQUFJLENBQUMsNEJBQTRCO0FBQy9CLFlBQU0sVUFBVSxZQUFZO0FBRTVCLG1DQUE2QixVQUFVLElBQUksc0JBQXNCO0FBQ2pFLFVBQUksQ0FBQyw0QkFBNEI7QUFDL0IsY0FBTSxJQUFJLE1BQ1Isd0JBQXdCLG1EQUFtRCxVQUFVLGFBQWEsR0FDcEc7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUtBLFFBQUksS0FBSyx5QkFBeUIsY0FBYyxHQUFHO0FBQ2pELFVBQUksS0FDRiw2QkFBNkIsVUFBVSw2Q0FDekM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sT0FBTyxPQUFPLE9BQU8seUNBQXlDO0FBQUEsTUFDbkUsT0FBTyxLQUFLO0FBQUEsTUFDWjtBQUFBLE1BQ0EsMEJBQTBCLE9BQU8sc0JBQXNCO0FBQUEsSUFDekQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLFVBQ0osZ0JBQ2dEO0FBQ2hELFVBQU0sUUFBUSxLQUFLLGFBQWE7QUFFaEMsVUFBTSxZQUFZLE9BQU8sdUJBQXVCLElBQUksY0FBYztBQUNsRSxRQUFJLENBQUMsV0FBVztBQUNkLFlBQU0sSUFBSSxNQUNSLGFBQWEsaURBQWlELGdCQUNoRTtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU8sVUFBVSxJQUFJLE1BQU07QUFDakMsUUFBSSxDQUFDLE1BQU07QUFDVCxZQUFNLElBQUksTUFDUixhQUFhLFVBQVUsVUFBVSxhQUFhLHNCQUNoRDtBQUFBLElBQ0Y7QUFLQSxRQUFJLDZCQUE2QixVQUFVLElBQUksc0JBQXNCO0FBQ3JFLFFBQUksQ0FBQyw0QkFBNEI7QUFDL0IsWUFBTSxVQUFVLFlBQVk7QUFFNUIsbUNBQTZCLFVBQVUsSUFBSSxzQkFBc0I7QUFDakUsVUFBSSxDQUFDLDRCQUE0QjtBQUMvQixjQUFNLElBQUksTUFDUixhQUFhLG1EQUFtRCxVQUFVLGFBQWEsR0FDekY7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUtBLFFBQUksS0FBSyxTQUFTLGNBQWMsR0FBRztBQUNqQyxVQUFJLEtBQUssYUFBYSxVQUFVLGtDQUFrQztBQUNsRSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sT0FBTyxPQUFPLE9BQU8sZUFBZTtBQUFBLE1BQ3pDLE9BQU8sS0FBSztBQUFBLE1BQ1o7QUFBQSxNQUNBLDBCQUEwQixPQUFPLHNCQUFzQjtBQUFBLE1BQ3ZEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sb0JBQ0osaUJBQ2dEO0FBQ2hELFVBQU0sUUFBUSxLQUFLLGFBQWE7QUFFaEMsVUFBTSxRQUFRLGdCQUNYLElBQUksb0JBQWtCO0FBSXJCLFVBQUksQ0FBQyxLQUFLLGdCQUFnQixjQUFjLEdBQUc7QUFDekMsWUFBSSxLQUNGLHVCQUF1QixVQUFVLG1FQUNuQztBQUNBLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxnQkFBZ0IsT0FBTyx1QkFBdUIsSUFBSSxjQUFjO0FBQ3RFLFVBQUksQ0FBQyxlQUFlO0FBQ2xCLFlBQUksS0FDRix1QkFBdUIsaURBQWlELGdCQUMxRTtBQUNBLGVBQU87QUFBQSxNQUNUO0FBRUEsWUFBTSxPQUFPLGNBQWMsSUFBSSxNQUFNO0FBQ3JDLFVBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBSSxLQUNGLHVCQUF1Qix3Q0FBd0MsY0FBYyxhQUFhLEdBQzVGO0FBQ0EsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPO0FBQUEsSUFDVCxDQUFDLEVBQ0EsT0FBTyx3QkFBUTtBQUVsQixRQUFJLENBQUMsTUFBTSxRQUFRO0FBQ2pCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FBTyxPQUFPLE9BQU8sT0FBTywrQkFBK0I7QUFBQSxNQUN6RCxPQUFPLEtBQUs7QUFBQSxNQUNaO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sYUFDSixnQkFDZ0Q7QUFDaEQsVUFBTSxRQUFRLEtBQUssYUFBYTtBQUtoQyxRQUFJLENBQUMsS0FBSyxTQUFTLGNBQWMsR0FBRztBQUNsQyxVQUFJLEtBQ0YsZ0JBQWdCLFVBQVUsbUVBQzVCO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFNBQVMsT0FBTyx1QkFBdUIsSUFBSSxjQUFjO0FBQy9ELFFBQUksQ0FBQyxRQUFRO0FBQ1gsWUFBTSxJQUFJLE1BQ1IsZ0JBQWdCLGlEQUFpRCxnQkFDbkU7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLE9BQU8sSUFBSSxNQUFNO0FBQzlCLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxJQUFJLE1BQ1IsZ0JBQWdCLHdDQUF3QyxPQUFPLGFBQWEsR0FDOUU7QUFBQSxJQUNGO0FBRUEsVUFBTSxVQUFVLE9BQU8sV0FBVyxRQUFRLEtBQ3ZDLGVBQWUscUJBQVMsR0FBRyxFQUMzQixTQUFTO0FBRVosV0FBTyxPQUFPLE9BQU8sT0FBTyx3QkFBd0I7QUFBQSxNQUNsRCxPQUFPLEtBQUs7QUFBQSxNQUNaO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLGtCQUNKLGdCQUNnRDtBQUNoRCxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0IsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFFBQVEsS0FBSyxhQUFhO0FBRWhDLFFBQUksQ0FBQyxLQUFLLFNBQVMsY0FBYyxHQUFHO0FBQ2xDLFVBQUksS0FDRixxQkFBcUIsVUFBVSxtRUFDakM7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZUFBZSxPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDckUsUUFBSSxDQUFDLGNBQWM7QUFDakIsWUFBTSxJQUFJLE1BQ1IscUJBQXFCLGlEQUFpRCxnQkFDeEU7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLGFBQWEsSUFBSSxNQUFNO0FBQ3BDLFFBQUksQ0FBQyxNQUFNO0FBQ1QsWUFBTSxJQUFJLE1BQ1IscUJBQXFCLHdDQUF3QyxnQkFDL0Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxlQUFlLDhCQUFNLE9BQU87QUFFbEMsVUFBTSxPQUFPLEtBQUssUUFBUSxjQUFjLElBQ3BDLGFBQWEsVUFDYixhQUFhO0FBRWpCLFdBQU8sT0FBTyxPQUFPLE9BQU8sNEJBQTRCO0FBQUEsTUFDdEQsT0FBTyxLQUFLO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxjQUFjO0FBQUEsSUFDbEI7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQU1nQjtBQUNoQixVQUFNLE9BQU8sT0FBTyxPQUFPLGNBQWM7QUFBQSxNQUN2QyxjQUFjO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLHFCQUE4QjtBQUM1QixXQUFPLFFBQVEsS0FBSyxJQUFJLDBCQUEwQixDQUFDO0FBQUEsRUFDckQ7QUFBQSxFQUVBLGlCQUEwQjtBQUN4QixXQUFPLGtFQUEyQixLQUFLLFVBQVU7QUFBQSxFQUNuRDtBQUFBLEVBRUEsWUFBcUI7QUFDbkIsV0FBTyx3REFBc0I7QUFBQSxTQUN4QixLQUFLO0FBQUEsTUFDUixNQUFNLHdEQUFxQixLQUFLLFVBQVUsSUFBSSxXQUFXO0FBQUEsSUFDM0QsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLGtCQUF3QjtBQUN0QixRQUFJLEtBQUssZ0JBQWdCLEtBQUssYUFBYSx1QkFBdUI7QUFDbEUsU0FBSyxJQUFJO0FBQUEsTUFDUCwwQkFBMEIsS0FBSyxJQUFJO0FBQUEsSUFDckMsQ0FBQztBQUNELFdBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxFQUN2RDtBQUFBLEVBRUEsZ0JBQXNCO0FBQ3BCLFFBQUksS0FBSyxJQUFJLDBCQUEwQixNQUFNLFFBQVc7QUFDdEQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLGdCQUFnQixLQUFLLGFBQWEsNEJBQTRCO0FBQ3ZFLFNBQUssSUFBSTtBQUFBLE1BQ1AsMEJBQTBCO0FBQUEsSUFDNUIsQ0FBQztBQUNELFdBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxFQUN2RDtBQUFBLEVBRUEsdUJBQWdDO0FBQzlCLFdBQU8sNkNBQVUsS0FBSyxVQUFVO0FBQUEsRUFDbEM7QUFBQSxFQUVBLFlBQXFCO0FBQ25CLFVBQU0sT0FBTyxLQUFLLElBQUksTUFBTTtBQUM1QixRQUFJLE1BQU07QUFDUixhQUFPLE9BQU8sUUFBUSxRQUFRLGNBQWMsSUFBSTtBQUFBLElBQ2xEO0FBRUEsVUFBTSxPQUFPLEtBQUssSUFBSSxNQUFNO0FBQzVCLFFBQUksTUFBTTtBQUNSLGFBQU8sT0FBTyxRQUFRLFFBQVEsVUFBVSxJQUFJO0FBQUEsSUFDOUM7QUFFQSxVQUFNLFVBQVUsS0FBSyxJQUFJLFNBQVM7QUFDbEMsUUFBSSxTQUFTO0FBQ1gsYUFBTyxPQUFPLFFBQVEsUUFBUSxlQUFlLE9BQU87QUFBQSxJQUN0RDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxNQUFNLEVBQUUsd0JBQXdCLFVBQVUsQ0FBQyxHQUFTO0FBQ2xELFFBQUksVUFBVTtBQUNkLFVBQU0sYUFBYSxLQUFLLFVBQVU7QUFFbEMsVUFBTSxPQUFPLEtBQUssSUFBSSxNQUFNO0FBQzVCLFFBQUksTUFBTTtBQUNSLGFBQU8sUUFBUSxRQUFRLGVBQWUsSUFBSTtBQUMxQyxnQkFBVTtBQUFBLElBQ1o7QUFFQSxVQUFNLE9BQU8sS0FBSyxJQUFJLE1BQU07QUFDNUIsUUFBSSxNQUFNO0FBQ1IsYUFBTyxRQUFRLFFBQVEsaUJBQWlCLElBQUk7QUFDNUMsZ0JBQVU7QUFBQSxJQUNaO0FBRUEsVUFBTSxVQUFVLEtBQUssSUFBSSxTQUFTO0FBQ2xDLFFBQUksU0FBUztBQUNYLGFBQU8sUUFBUSxRQUFRLGdCQUFnQixPQUFPO0FBQzlDLGdCQUFVO0FBQUEsSUFDWjtBQUVBLFFBQUksV0FBVyxDQUFDLFlBQVk7QUFFMUIsV0FBSyxRQUFRLFVBQVUsTUFBTSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBRTVDLFVBQUksQ0FBQyx1QkFBdUI7QUFDMUIsYUFBSyxjQUFjLE9BQU87QUFBQSxNQUM1QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxRQUFRLEVBQUUsd0JBQXdCLFVBQVUsQ0FBQyxHQUFZO0FBQ3ZELFFBQUksWUFBWTtBQUNoQixVQUFNLGFBQWEsS0FBSyxVQUFVO0FBRWxDLFVBQU0sT0FBTyxLQUFLLElBQUksTUFBTTtBQUM1QixRQUFJLE1BQU07QUFDUixhQUFPLFFBQVEsUUFBUSxrQkFBa0IsSUFBSTtBQUM3QyxrQkFBWTtBQUFBLElBQ2Q7QUFFQSxVQUFNLE9BQU8sS0FBSyxJQUFJLE1BQU07QUFDNUIsUUFBSSxNQUFNO0FBQ1IsYUFBTyxRQUFRLFFBQVEsb0JBQW9CLElBQUk7QUFDL0Msa0JBQVk7QUFBQSxJQUNkO0FBRUEsVUFBTSxVQUFVLEtBQUssSUFBSSxTQUFTO0FBQ2xDLFFBQUksU0FBUztBQUNYLGFBQU8sUUFBUSxRQUFRLG1CQUFtQixPQUFPO0FBQ2pELGtCQUFZO0FBQUEsSUFDZDtBQUVBLFFBQUksYUFBYSxZQUFZO0FBRTNCLFdBQUssUUFBUSxVQUFVLE1BQU0sRUFBRSxPQUFPLEtBQUssQ0FBQztBQUU1QyxVQUFJLENBQUMsdUJBQXVCO0FBQzFCLGFBQUssY0FBYyxTQUFTO0FBQUEsTUFDOUI7QUFFQSxXQUFLLHVCQUF1QixFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDN0M7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEscUJBQXFCLEVBQUUsd0JBQXdCLFVBQVUsQ0FBQyxHQUFTO0FBQ2pFLFFBQUksS0FDRix5QkFBeUIsS0FBSyxhQUFhLGNBQWMsdUJBQzNEO0FBQ0EsVUFBTSxTQUFTLEtBQUssSUFBSSxnQkFBZ0I7QUFFeEMsU0FBSyxJQUFJLEVBQUUsZ0JBQWdCLEtBQUssQ0FBQztBQUVqQyxVQUFNLFFBQVEsS0FBSyxJQUFJLGdCQUFnQjtBQUV2QyxRQUFJLENBQUMseUJBQXlCLFFBQVEsTUFBTSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ2hFLFdBQUssY0FBYyxzQkFBc0I7QUFBQSxJQUMzQztBQUFBLEVBQ0Y7QUFBQSxFQUVBLHNCQUFzQixFQUFFLHdCQUF3QixVQUFVLENBQUMsR0FBUztBQUNsRSxRQUFJLEtBQ0YsMEJBQTBCLEtBQUssYUFBYSxjQUFjLHVCQUM1RDtBQUNBLFVBQU0sU0FBUyxLQUFLLElBQUksZ0JBQWdCO0FBRXhDLFNBQUssSUFBSSxFQUFFLGdCQUFnQixNQUFNLENBQUM7QUFFbEMsVUFBTSxRQUFRLEtBQUssSUFBSSxnQkFBZ0I7QUFFdkMsUUFBSSxDQUFDLHlCQUF5QixRQUFRLE1BQU0sTUFBTSxRQUFRLEtBQUssR0FBRztBQUNoRSxXQUFLLGNBQWMsdUJBQXVCO0FBQUEsSUFDNUM7QUFBQSxFQUNGO0FBQUEsRUFFQSxXQUFvQjtBQUNsQixVQUFNLG1CQUFtQixLQUFLLElBQUksa0JBQWtCLEtBQUssQ0FBQztBQUMxRCxXQUFRLEtBQUssSUFBSSxPQUFPLEtBQ3RCLEtBQUssSUFBSSxpQkFBaUIsS0FDMUIsaUJBQWlCLFNBQVM7QUFBQSxFQUM5QjtBQUFBLEVBRUEsa0JBQTBCO0FBQ3hCLFVBQU0sUUFBUSxLQUFLLElBQUksT0FBTztBQUU5QixRQUFJLE9BQU87QUFDVCxZQUFNLGFBQWEsS0FBSyxJQUFJLGlCQUFpQixLQUFLLENBQUM7QUFFbkQsYUFBTyxvREFBb0IsWUFBWSxLQUFLO0FBQUEsSUFDOUM7QUFFQSxVQUFNLG1CQUFtQixLQUFLLElBQUksa0JBQWtCLEtBQUssQ0FBQztBQUMxRCxRQUFJLGlCQUFpQixTQUFTLEdBQUc7QUFDL0IsYUFBTyxPQUFPLEtBQUssMkNBQTJDO0FBQUEsSUFDaEU7QUFFQSxVQUFNLGtCQUFrQixLQUFLLElBQUksaUJBQWlCO0FBQ2xELFFBQUksaUJBQWlCO0FBQ25CLGFBQU8sT0FBTyxLQUFLLHNDQUFzQztBQUFBLElBQzNEO0FBRUEsV0FBTyxPQUFPLEtBQUssc0NBQXNDO0FBQUEsRUFDM0Q7QUFBQSxFQUVBLGFBQW1CO0FBRWpCLFFBQUksQ0FBQyxPQUFPLE9BQU8sMEJBQTBCLEdBQUc7QUFDOUM7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLEtBQUssb0JBQW9CO0FBQzVCLFlBQU0sV0FBVztBQUNqQixXQUFLLHNCQUFzQjtBQUMzQixXQUFLLGtCQUFrQixRQUFRO0FBQUEsSUFDakM7QUFFQSxTQUFLLG9CQUFvQjtBQUFBLEVBQzNCO0FBQUEsRUFFQSx3QkFBOEI7QUFDNUIsZ0VBQXdCLEtBQUssa0JBQWtCO0FBQy9DLFNBQUsscUJBQXFCLFdBQ3hCLEtBQUssdUJBQXVCLEtBQUssSUFBSSxHQUNyQyxLQUFLLEdBQ1A7QUFBQSxFQUNGO0FBQUEsRUFFQSx5QkFBK0I7QUFDN0IsVUFBTSxXQUFXO0FBQ2pCLFNBQUssa0JBQWtCLFFBQVE7QUFHL0IsU0FBSyxzQkFBc0I7QUFBQSxFQUM3QjtBQUFBLEVBRUEsc0JBQTRCO0FBQzFCLGdFQUF3QixLQUFLLGdCQUFnQjtBQUM3QyxTQUFLLG1CQUFtQixXQUN0QixLQUFLLHFCQUFxQixLQUFLLElBQUksR0FDbkMsSUFBSSxHQUNOO0FBQUEsRUFDRjtBQUFBLEVBRUEsdUJBQTZCO0FBQzNCLFVBQU0sV0FBVztBQUNqQixTQUFLLGtCQUFrQixRQUFRO0FBRS9CLFNBQUssa0JBQWtCO0FBQUEsRUFDekI7QUFBQSxFQUVBLG9CQUEwQjtBQUN4QixnRUFBd0IsS0FBSyxnQkFBZ0I7QUFDN0MsU0FBSyxtQkFBbUI7QUFDeEIsZ0VBQXdCLEtBQUssa0JBQWtCO0FBQy9DLFNBQUsscUJBQXFCO0FBQUEsRUFDNUI7QUFBQSxRQUVNLHVCQUNKLFVBQStCLENBQUMsR0FDakI7QUFDZixRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLE9BQU8sT0FBTyx5QkFBeUI7QUFBQSxNQUNsRCxPQUFPLFFBQVE7QUFBQSxNQUNmLGNBQWM7QUFBQSxJQUNoQixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sbUJBQWtDO0FBQ3RDLFVBQU0sRUFBRSxjQUFjLE9BQU87QUFDN0IsUUFBSSxDQUFDLFdBQVc7QUFDZDtBQUFBLElBQ0Y7QUFDQSxRQUFJLENBQUMsS0FBSyxVQUFVLEdBQUc7QUFDckI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUNGLDZDQUE2QyxLQUFLLGFBQWEsR0FDakU7QUFFQSxTQUFLLGlCQUFpQjtBQUN0QixTQUFLLFFBQVEsVUFBVSxNQUFNLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFFNUMsUUFBSTtBQUVGLFlBQU0sZ0ZBQWtDO0FBQUEsUUFDdEMsd0JBQXdCLE9BQU87QUFBQSxRQUMvQixlQUFlLENBQUMsSUFBSTtBQUFBLFFBQ3BCO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxVQUFFO0FBRUEsV0FBSyxpQkFBaUI7QUFDdEIsV0FBSyxRQUFRLFVBQVUsTUFBTSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBRTVDLFVBQUksS0FDRixrREFBa0QsS0FBSyxhQUFhLEdBQ3RFO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxLQUFLLElBQUksTUFBTSxHQUFHO0FBQ3JCO0FBQUEsSUFDRjtBQUdBLFNBQUssY0FBYztBQUFBLEVBQ3JCO0FBQUEsRUFFUyxVQUFtQjtBQUMxQixXQUNFLHdEQUFxQixLQUFLLFVBQVUsS0FDcEMsNkNBQVUsS0FBSyxVQUFVLEtBQ3pCLDZDQUFVLEtBQUssVUFBVTtBQUFBLEVBRTdCO0FBQUEsUUFFTSxzQkFBcUM7QUFDekMsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYSxNQUFNLE9BQU8sT0FBTyxPQUFPLHVCQUF1QixJQUFJO0FBQ3pFLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLE9BQU8sT0FBTyxrQ0FBa0M7QUFBQSxNQUMzRCxjQUFjO0FBQUEsSUFDaEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLG1CQUFtQixNQUlWO0FBQ1AsUUFDRSxLQUFLLElBQUksY0FBYyxLQUN2QixLQUFLLElBQUksV0FBVyxLQUNwQixLQUFLLElBQUksY0FBYyxLQUN2QixLQUFLLElBQUksY0FBYyxHQUN2QjtBQUNBO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxrQ0FBa0MsS0FBSyxhQUFhLEdBQUc7QUFDaEUsVUFBTSxFQUFFLFdBQVcsY0FBYyxpQkFBaUI7QUFFbEQsU0FBSyxJQUFJLEVBQUUsV0FBVyxjQUFjLGNBQWMsY0FBYyxFQUFFLENBQUM7QUFFbkUsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQ3ZEO0FBQUEsRUFFQSxlQUNFLFVBUUksQ0FBQyxHQUN3QjtBQUM3QixRQUFJLHdEQUFxQixLQUFLLFVBQVUsS0FBSyxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQ3hFLGFBQU87QUFBQSxJQUNUO0FBQ0EsV0FBTztBQUFBLE1BQ0wsV0FBVyxNQUFNLFdBRWYsS0FBSyxJQUFJLFdBQVcsQ0FDdEI7QUFBQSxNQUVBLFVBQVUsS0FBSyxJQUFJLFVBQVU7QUFBQSxNQUM3QixTQUNFLGFBQWEsVUFBVSxRQUFRLFVBQVUsS0FBSyxjQUFjLE9BQU87QUFBQSxNQUNyRSxhQUFhLFFBQVE7QUFBQSxJQUN2QjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLGVBQWUsU0FBc0Q7QUFDbkUsVUFBTSxVQUFVLEtBQUssSUFBSSxTQUFTO0FBQ2xDLFVBQU0sZUFBZSxLQUFLLElBQUksY0FBYztBQUU1QyxRQUNFLHdEQUFxQixLQUFLLFVBQVUsS0FDcEMsQ0FBQyxXQUNBLGdCQUFnQixlQUFlLEdBQ2hDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixTQUFTLFdBQVcsS0FBSyxjQUFjO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFFQSxtQkFBMkM7QUFDekMsVUFBTSxnQkFBZ0IsS0FBSyxJQUFJLFNBQVM7QUFFeEMsUUFBSSxDQUFDLGVBQWU7QUFDbEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQzlCLGFBQU8sTUFBTSxXQUFXLGFBQWE7QUFBQSxJQUN2QztBQUNBLFFBQUksNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDOUIsYUFBTyxNQUFNLFdBQVcsYUFBYTtBQUFBLElBQ3ZDO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLGtCQUFrQixVQUFrQztBQUN4RCxVQUFNLEVBQUUsY0FBYyxPQUFPO0FBRTdCLFFBQUksQ0FBQyxXQUFXO0FBQ2Q7QUFBQSxJQUNGO0FBR0EsUUFBSSx3Q0FBSyxLQUFLLFVBQVUsR0FBRztBQUN6QjtBQUFBLElBQ0Y7QUFRQSxTQUFLLGVBQWU7QUFFcEIsVUFBTSxLQUFLLFNBQVMscUJBQXFCLFlBQVk7QUFDbkQsWUFBTSxlQUFlLEtBQUssY0FBYztBQUd4QyxVQUFJLENBQUMsd0RBQXFCLEtBQUssVUFBVSxLQUFLLENBQUMsYUFBYSxRQUFRO0FBQ2xFO0FBQUEsTUFDRjtBQUVBLFVBQUksS0FBSyxpQkFBaUIsUUFBVztBQUNuQyxZQUFJLEtBQUsscUJBQXFCLEtBQUssYUFBYSxjQUFjO0FBQzlEO0FBQUEsTUFDRjtBQUVBLFlBQU0sY0FBYyx3REFBcUIsS0FBSyxVQUFVLElBQ3BELEtBQUssY0FBYyxJQUNuQjtBQUNKLFlBQU0sVUFBVSxLQUFLLGlCQUFpQjtBQUN0QyxZQUFNLFlBQVksS0FBSyxJQUFJO0FBRTNCLFlBQU0sVUFBVTtBQUFBLFFBQ2Q7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsVUFBVSxLQUFLO0FBQUEsUUFDZjtBQUFBLE1BQ0Y7QUFDQSxXQUFLLGVBQWU7QUFFcEIsVUFBSSxLQUNGLHFCQUFxQixLQUFLLGFBQWEsZUFBZSxRQUFRLFVBQ2hFO0FBRUEsWUFBTSxpQkFBaUIsVUFBVSx3QkFBd0IsT0FBTztBQUVoRSxZQUFNLEVBQUUsZ0JBQWdCLDhCQUFNLDBCQUEwQjtBQUV4RCxZQUFNLGNBQWM7QUFBQSxXQUNkLE1BQU0sMENBQWUsS0FBSyxVQUFVO0FBQUEsUUFDeEMsUUFBUTtBQUFBLE1BQ1Y7QUFDQSxVQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxjQUFNLGdEQUNKLFVBQVUsd0JBQXdCO0FBQUEsVUFDaEM7QUFBQSxVQUNBLFlBQVk7QUFBQSxVQUNaLE9BQU87QUFBQSxVQUNQLGFBQWEsWUFBWTtBQUFBLFVBQ3pCLFNBQVM7QUFBQSxVQUNULFNBQVM7QUFBQSxRQUNYLENBQUMsR0FDRCxFQUFFLFlBQVksQ0FBQyxHQUFHLFVBQVUsU0FBUyxDQUN2QztBQUFBLE1BQ0YsT0FBTztBQUNMLGNBQU0sZ0RBQ0osT0FBTyxPQUFPLEtBQUssMEJBQTBCO0FBQUEsVUFDM0MsYUFBYSxZQUFZO0FBQUEsVUFDekI7QUFBQSxVQUNBLFdBQVc7QUFBQSxVQUNYLFFBQVE7QUFBQSxVQUNSLFlBQVk7QUFBQSxVQUNaO0FBQUEsVUFDQSxZQUFZLEtBQUssa0JBQWtCO0FBQUEsVUFDbkMsVUFBVTtBQUFBLFVBQ1Y7QUFBQSxRQUNGLENBQUMsR0FDRCxFQUFFLFlBQVksQ0FBQyxHQUFHLFVBQVUsU0FBUyxDQUN2QztBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxhQUFhLFNBQXNDO0FBQ3ZELFVBQU0sT0FBTyxRQUFRLElBQUksWUFBWTtBQUNyQyxVQUFNLE9BQU8sUUFBUSxJQUFJLFFBQVE7QUFDakMsVUFBTSxlQUFlLFFBQVEsSUFBSSxjQUFjO0FBRS9DLFVBQU0sV0FBVyxPQUFPLHVCQUF1QixpQkFBaUI7QUFBQSxNQUM5RDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLGNBQWMsR0FBRyxZQUFZO0FBR25DLFNBQUssd0JBQXdCLFdBQVc7QUFJeEMsVUFBTSxvQkFDSiwyQ0FBUSxLQUFLLFVBQVUsS0FBSyxRQUFRLElBQUksU0FBUztBQUNuRCxRQUFJLHFCQUFxQiw0QkFBUSxRQUFRLFVBQVUsR0FBRztBQUNwRDtBQUFBLElBQ0Y7QUFFQSxTQUFLLGlCQUFpQixPQUFPO0FBRzdCLFNBQUssMkJBQTRCO0FBQUEsRUFDbkM7QUFBQSxRQUlNLGlCQUNKLFNBQ0EsRUFBRSxlQUF3QyxFQUFFLFlBQVksTUFBTSxHQUMvQztBQUNmLFVBQU0sS0FBSyx1QkFBdUI7QUFDbEMsU0FBSyxtQkFBbUIsU0FBUyxFQUFFLFdBQVcsQ0FBQztBQUFBLEVBQ2pEO0FBQUEsUUFFYyx5QkFBd0M7QUFDcEQsUUFBSSxDQUFDLEtBQUssaUJBQWlCO0FBQ3pCLFdBQUssa0JBQWtCLElBQUksT0FBTyxPQUFPO0FBQUEsUUFDdkMsYUFBYTtBQUFBLFFBQ2IsU0FBUyxNQUFPLEtBQUs7QUFBQSxNQUN2QixDQUFDO0FBQUEsSUFDSDtBQUdBLFVBQU0sS0FBSyxnQkFBZ0IsSUFBSSxZQUFZO0FBQ3pDLFlBQU0sS0FBSztBQUFBLElBQ2IsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVRLG1CQUNOLFNBQ0EsRUFBRSxjQUNJO0FBQ04sVUFBTSxFQUFFLGtCQUFrQixPQUFPLGFBQWE7QUFDOUMsVUFBTSxFQUFFLGtCQUFrQixPQUFPLFdBQVcsU0FBUztBQUNyRCxVQUFNLEVBQUUsMkJBQTJCO0FBRW5DLFVBQU0saUJBQWlCLEtBQUs7QUFDNUIsVUFBTSx1QkFBdUIsdUJBQXVCO0FBQ3BELFVBQU0sV0FBVyxzQkFBc0IsU0FBUyxRQUFRO0FBQ3hELFVBQU0sYUFBYSxzQkFBc0I7QUFFekMsVUFBTSxtQkFDSixZQUFZLGNBQWMsV0FBVyxXQUFXLFNBQVMsT0FBTztBQUVsRSxRQUFJLGNBQWMsd0JBQXdCLENBQUMsa0JBQWtCO0FBQzNELFdBQUssbUJBQW1CLFFBQVcsTUFBUztBQUFBLElBQzlDLE9BQU87QUFDTCxvQkFBYztBQUFBLFFBQ1o7QUFBQSxRQUNBLFVBQVUsQ0FBQyxLQUFLLFFBQVEsV0FBVyxDQUFDO0FBQUEsUUFDcEMsVUFBVSxPQUFPLFNBQVM7QUFBQSxRQUMxQjtBQUFBLFFBQ0EsY0FBYztBQUFBLE1BQ2hCLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBRUEscUJBQW9DO0FBQ2xDLFFBQUk7QUFDSixTQUFLLGtCQUFrQixJQUFJLFFBQVEsYUFBVztBQUM1Qyx1QkFBaUI7QUFBQSxJQUNuQixDQUFDO0FBRUQsVUFBTSxTQUFTLDZCQUFNO0FBQ25CLHFCQUFlO0FBQ2YsV0FBSyxrQkFBa0I7QUFBQSxJQUN6QixHQUhlO0FBS2YsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLG1CQUNKLGlCQUNBLFVBQ2U7QUFDZixVQUFNLEVBQUUsZUFBZSwyQkFDckIsT0FBTyxhQUFhO0FBQ3RCLFVBQU0saUJBQWlCLEtBQUs7QUFFNUIsMkJBQ0UsZ0JBQ0EsZ0RBQTRCLGdCQUM5QjtBQUNBLFVBQU0sU0FBUyxLQUFLLG1CQUFtQjtBQUV2QyxRQUFJO0FBQ0YsVUFBSSx1QkFBdUI7QUFFM0IsVUFBSSxpQkFBaUI7QUFDbkIsY0FBTSx3QkFBd0IsTUFBTSxlQUFlLGVBQWU7QUFDbEUsWUFBSSx1QkFBdUI7QUFHekIsY0FBSSw0Q0FBZ0IscUJBQXFCLEdBQUc7QUFDMUMsbUNBQXVCO0FBQUEsVUFDekI7QUFBQSxRQUNGLE9BQU87QUFDTCxjQUFJLEtBQ0YsNENBQTRDLGlCQUM5QztBQUFBLFFBQ0Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLE1BQU0saUNBQ3BCLGdCQUNBLFFBQ0EsMkNBQVEsS0FBSyxVQUFVLENBQ3pCO0FBTUEsVUFBSSxDQUFDLG1CQUFtQixDQUFDLEtBQUssWUFBWSxLQUFLLFFBQVEsUUFBUTtBQUM3RCxhQUFLLGNBQWMsUUFBUSxPQUFPLElBQUksRUFBRSxlQUFlLEtBQUssQ0FBQztBQUM3RDtBQUFBLE1BQ0Y7QUFFQSxVQUFJLHdCQUF3QixRQUFRLGNBQWM7QUFDaEQsYUFBSyxjQUFjLFFBQVEsYUFBYSxJQUFJO0FBQUEsVUFDMUMsZUFBZSxDQUFDO0FBQUEsUUFDbEIsQ0FBQztBQUNEO0FBQUEsTUFDRjtBQUVBLFlBQU0sV0FBVyxNQUFNLCtCQUErQixnQkFBZ0I7QUFBQSxRQUNwRSxTQUFTLDJDQUFRLEtBQUssVUFBVTtBQUFBLFFBQ2hDLE9BQU87QUFBQSxRQUNQLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFFRCxZQUFNLFVBQStCLE1BQU0sS0FBSyxZQUFZLFFBQVE7QUFDcEUsWUFBTSxvQkFDSixZQUFZLFFBQVEsU0FBUyxRQUFRLE9BQU8sS0FBSztBQU9uRCxZQUFNLGlCQUFpQjtBQUN2QixvQkFBYztBQUFBLFFBQ1o7QUFBQSxRQUNBLFVBQVUsUUFBUSxJQUFJLENBQUMsaUJBQWdDO0FBQUEsYUFDbEQsYUFBYTtBQUFBLFFBQ2xCLEVBQUU7QUFBQSxRQUNGO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILFNBQVMsT0FBUDtBQUNBLDZCQUF1QixnQkFBZ0IsTUFBUztBQUNoRCxZQUFNO0FBQUEsSUFDUixVQUFFO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsUUFDTSxrQkFBa0IsaUJBQXdDO0FBQzlELFVBQU0sRUFBRSxlQUFlLHdCQUF3Qix3QkFDN0MsT0FBTyxhQUFhO0FBQ3RCLFVBQU0saUJBQWlCLEtBQUs7QUFFNUIsMkJBQ0UsZ0JBQ0EsZ0RBQTRCLG9CQUM5QjtBQUNBLFVBQU0sU0FBUyxLQUFLLG1CQUFtQjtBQUV2QyxRQUFJO0FBQ0YsWUFBTSxVQUFVLE1BQU0sZUFBZSxlQUFlO0FBQ3BELFVBQUksQ0FBQyxTQUFTO0FBQ1osY0FBTSxJQUFJLE1BQ1IsNkNBQTZDLGlCQUMvQztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGFBQWEsUUFBUTtBQUMzQixZQUFNLFNBQVMsUUFBUTtBQUN2QixZQUFNLFNBQVMsTUFBTSwrQkFBK0IsZ0JBQWdCO0FBQUEsUUFDbEUsU0FBUywyQ0FBUSxLQUFLLFVBQVU7QUFBQSxRQUNoQyxPQUFPO0FBQUEsUUFDUCxXQUFXO0FBQUEsUUFDWDtBQUFBLFFBQ0E7QUFBQSxRQUNBLFNBQVM7QUFBQSxNQUNYLENBQUM7QUFFRCxVQUFJLE9BQU8sU0FBUyxHQUFHO0FBQ3JCLFlBQUksS0FBSyxzREFBc0Q7QUFDL0QsNEJBQW9CLGNBQWM7QUFDbEM7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLE1BQU0sS0FBSyxZQUFZLE1BQU07QUFFN0Msb0JBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQSxVQUFVLFFBQVEsSUFBSSxDQUFDLGlCQUFnQztBQUFBLGFBQ2xELGFBQWE7QUFBQSxRQUNsQixFQUFFO0FBQUEsUUFDRixVQUFVLE9BQU8sU0FBUztBQUFBLFFBQzFCLFlBQVk7QUFBQSxRQUNaLGNBQWM7QUFBQSxNQUNoQixDQUFDO0FBQUEsSUFDSCxTQUFTLE9BQVA7QUFDQSw2QkFBdUIsZ0JBQWdCLE1BQVM7QUFDaEQsWUFBTTtBQUFBLElBQ1IsVUFBRTtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLFFBRU0sa0JBQWtCLGlCQUF3QztBQUM5RCxVQUFNLEVBQUUsZUFBZSx3QkFBd0Isd0JBQzdDLE9BQU8sYUFBYTtBQUN0QixVQUFNLGlCQUFpQixLQUFLO0FBRTVCLDJCQUNFLGdCQUNBLGdEQUE0QixvQkFDOUI7QUFDQSxVQUFNLFNBQVMsS0FBSyxtQkFBbUI7QUFFdkMsUUFBSTtBQUNGLFlBQU0sVUFBVSxNQUFNLGVBQWUsZUFBZTtBQUNwRCxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUNSLDZDQUE2QyxpQkFDL0M7QUFBQSxNQUNGO0FBRUEsWUFBTSxhQUFhLFFBQVE7QUFDM0IsWUFBTSxTQUFTLFFBQVE7QUFDdkIsWUFBTSxTQUFTLE1BQU0sK0JBQStCLGdCQUFnQjtBQUFBLFFBQ2xFLFNBQVMsMkNBQVEsS0FBSyxVQUFVO0FBQUEsUUFDaEMsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQSxTQUFTO0FBQUEsTUFDWCxDQUFDO0FBRUQsVUFBSSxPQUFPLFNBQVMsR0FBRztBQUNyQixZQUFJLEtBQUssc0RBQXNEO0FBQy9ELDRCQUFvQixjQUFjO0FBQ2xDO0FBQUEsTUFDRjtBQUVBLFlBQU0sVUFBVSxNQUFNLEtBQUssWUFBWSxNQUFNO0FBQzdDLG9CQUFjO0FBQUEsUUFDWjtBQUFBLFFBQ0EsVUFBVSxRQUFRLElBQUksQ0FBQyxpQkFBZ0M7QUFBQSxhQUNsRCxhQUFhO0FBQUEsUUFDbEIsRUFBRTtBQUFBLFFBQ0YsVUFBVSxPQUFPLFNBQVM7QUFBQSxRQUMxQixZQUFZO0FBQUEsUUFDWixjQUFjO0FBQUEsTUFDaEIsQ0FBQztBQUFBLElBQ0gsU0FBUyxPQUFQO0FBQ0EsNkJBQXVCLGdCQUFnQixNQUFTO0FBQ2hELFlBQU07QUFBQSxJQUNSLFVBQUU7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxRQUVNLGNBQ0osV0FDQSxTQUNlO0FBQ2YsVUFBTSxFQUFFLGVBQWUsMkJBQ3JCLE9BQU8sYUFBYTtBQUN0QixVQUFNLGlCQUFpQixLQUFLO0FBRTVCLDJCQUNFLGdCQUNBLGdEQUE0QixnQkFDOUI7QUFDQSxVQUFNLFNBQVMsS0FBSyxtQkFBbUI7QUFFdkMsUUFBSTtBQUNGLFlBQU0sVUFBVSxNQUFNLGVBQWUsU0FBUztBQUM5QyxVQUFJLENBQUMsU0FBUztBQUNaLGNBQU0sSUFBSSxNQUNSLDZDQUE2QyxXQUMvQztBQUFBLE1BQ0Y7QUFFQSxZQUFNLGFBQWEsUUFBUTtBQUMzQixZQUFNLFNBQVMsUUFBUTtBQUN2QixZQUFNLEVBQUUsT0FBTyxPQUFPLFlBQ3BCLE1BQU0sc0NBQXNDO0FBQUEsUUFDMUM7QUFBQSxRQUNBLFNBQVMsMkNBQVEsS0FBSyxVQUFVO0FBQUEsUUFDaEMsT0FBTztBQUFBLFFBQ1A7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0EsU0FBUztBQUFBLE1BQ1gsQ0FBQztBQUNILFlBQU0sTUFBTSxDQUFDLEdBQUcsT0FBTyxTQUFTLEdBQUcsS0FBSztBQUV4QyxZQUFNLFVBQStCLE1BQU0sS0FBSyxZQUFZLEdBQUc7QUFDL0QsWUFBTSxvQkFDSixXQUFXLFFBQVEsZ0JBQWdCLFNBQVk7QUFFakQsb0JBQWM7QUFBQSxRQUNaO0FBQUEsUUFDQSxVQUFVLFFBQVEsSUFBSSxDQUFDLGlCQUFnQztBQUFBLGFBQ2xELGFBQWE7QUFBQSxRQUNsQixFQUFFO0FBQUEsUUFDRjtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILFNBQVMsT0FBUDtBQUNBLDZCQUF1QixnQkFBZ0IsTUFBUztBQUNoRCxZQUFNO0FBQUEsSUFDUixVQUFFO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsUUFFTSxZQUNKLFVBQzhCO0FBQzlCLFVBQU0sU0FBUyxTQUNaLE9BQU8sYUFBVyxRQUFRLFFBQVEsRUFBRSxDQUFDLEVBQ3JDLElBQUksYUFBVyxPQUFPLGtCQUFrQixTQUFTLFFBQVEsSUFBSSxPQUFPLENBQUM7QUFFeEUsVUFBTSxhQUFhLFNBQVMsU0FBUyxPQUFPO0FBQzVDLFFBQUksYUFBYSxHQUFHO0FBQ2xCLFVBQUksS0FBSywyQkFBMkIsbUNBQW1DO0FBQUEsSUFDekU7QUFDQSxVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUV6RSxRQUFJLFdBQVc7QUFDZixhQUFTLE1BQU0sT0FBTyxRQUFRLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxHQUFHO0FBQ3BELFlBQU0sVUFBVSxPQUFPO0FBQ3ZCLFlBQU0sRUFBRSxlQUFlO0FBQ3ZCLFlBQU0sRUFBRSxrQkFBa0I7QUFFMUIsVUFBSSxnQkFBZ0IsUUFBUSw0QkFBNEI7QUFHdEQsY0FBTSxrQkFBa0IsTUFBTSxxQkFBcUIsVUFBVTtBQUM3RCxnQkFBUSxJQUFJLGVBQWU7QUFFM0IsY0FBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLGlCQUFpQixFQUFFLFFBQVEsQ0FBQztBQUNqRSxvQkFBWTtBQUFBLE1BQ2Q7QUFBQSxJQUNGO0FBQ0EsUUFBSSxXQUFXLEdBQUc7QUFDaEIsVUFBSSxLQUFLLG1DQUFtQyxtQkFBbUI7QUFBQSxJQUNqRTtBQUVBLFVBQU0sUUFBUSxJQUFJLE9BQU8sSUFBSSxXQUFTLE1BQU0sb0JBQW9CLENBQUMsQ0FBQztBQUVsRSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsU0FBMkI7QUFDekIsUUFBSSxLQUFLLGFBQWE7QUFDcEIsYUFBTyxLQUFLO0FBQUEsSUFDZDtBQUVBLFVBQU0sWUFBWSxLQUFLO0FBR3ZCLFNBQUssU0FBUyxNQUFNO0FBQ2xCLFVBQUksQ0FBQyxLQUFLLGdCQUFnQjtBQUN4QixjQUFNLElBQUksTUFDUix5QkFBeUIsS0FBSyxhQUFhLHdDQUM3QztBQUFBLE1BQ0Y7QUFFQSxZQUFNLEVBQUUsVUFBVSxJQUFJLE1BQU0sV0FBVztBQUN2QyxVQUFJLEtBQ0YseUJBQXlCLEtBQUssYUFBYSxxQkFBcUIsT0FDbEU7QUFFQSxhQUFPLEtBQUs7QUFBQSxJQUNkO0FBRUEsUUFBSTtBQUNGLFdBQUssY0FBYyxLQUFLLFNBQVM7QUFDakMsYUFBTyxLQUFLO0FBQUEsSUFDZCxVQUFFO0FBQ0EsV0FBSyxTQUFTO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsRUFRUSxXQUE2QjtBQUVuQyxVQUFNLFFBQVEsS0FBSyxTQUFTO0FBRTVCLFFBQUk7QUFTSixRQUFJLEtBQUssSUFBSSwrQkFBK0IsR0FBRztBQUM3QyxvQkFBYyxFQUFFLG9CQUFvQixLQUFLO0FBQUEsSUFDM0MsT0FBTztBQUNMLFlBQU0sa0JBQWtCLEtBQUssSUFBSSxhQUFhO0FBQzlDLFVBQUksaUJBQWlCO0FBQ25CLHNCQUFjO0FBQUEsVUFDWixRQUFRLDhCQUFTLEtBQUssSUFBSSxtQkFBbUIsQ0FBQztBQUFBLFVBQzlDLE1BQU07QUFBQSxVQUNOLG9CQUFvQjtBQUFBLFFBQ3RCO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQWUsT0FBTyxFQUFFLE9BQU8sS0FBSyx1QkFBdUIsQ0FBQyxDQUFDO0FBQ25FLFVBQU0sbUJBQW1CLE9BQU8sRUFBRSxNQUNoQyxPQUFPLEVBQUUsT0FBTyxjQUFjLFdBQVcsQ0FDM0M7QUFHQSxVQUFNLFlBQVksS0FBSyxJQUFJLFdBQVc7QUFDdEMsVUFBTSxpQkFBaUIsS0FBSyxJQUFJLGdCQUFnQjtBQUNoRCxVQUFNLGVBQWUsS0FBSyxnQkFBZ0I7QUFDMUMsVUFBTSxZQUFZLEtBQUssSUFBSSxPQUFPO0FBQ2xDLFVBQU0sa0JBQWtCLEtBQUssSUFBSSxpQkFBaUI7QUFDbEQsVUFBTSxrQkFBbUIsS0FBSyxTQUFTLEtBQ3JDLGtCQUNBLGtCQUFrQjtBQUNwQixVQUFNLGdCQUFnQixLQUFLLElBQUksZ0JBQWdCO0FBQy9DLFVBQU0seUJBQXlCLE9BQU8sT0FBTyxhQUFhLFVBQ3hELHlCQUNGO0FBQ0EsVUFBTSxvQkFDSixPQUFPLHVCQUF1QixxQkFBcUI7QUFFckQsUUFBSTtBQUNKLFFBQUksNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDOUIscUJBQWU7QUFBQSxJQUNqQixXQUFXLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQ3JDLHFCQUFlO0FBQUEsSUFDakI7QUFFQSxVQUFNLHFCQUFxQiw2Q0FBVSxLQUFLLFVBQVUsSUFDaEQsS0FBSyxXQUFXLEVBQ2IsS0FBSyxDQUFDLE1BQU0sVUFDWCx1QkFBdUIsTUFBTSxPQUFPLEtBQUssWUFBWSxDQUN2RCxFQUNDLElBQUksWUFBVSxPQUFPLE9BQU8sQ0FBQyxFQUM3QixPQUFPLHdCQUFRLElBQ2xCO0FBRUosVUFBTSxFQUFFLGFBQWEsa0JBQWtCLEtBQUssbUJBQW1CO0FBRy9ELFdBQU87QUFBQSxNQUNMLElBQUksS0FBSztBQUFBLE1BQ1QsTUFBTSxLQUFLLElBQUksTUFBTTtBQUFBLE1BQ3JCLE1BQU0sS0FBSyxJQUFJLE1BQU07QUFBQSxNQUlyQixVQUFVLDhCQUFTLEtBQUssSUFBSSxVQUFVLENBQUM7QUFBQSxNQUV2QyxPQUFPLEtBQUssYUFBYTtBQUFBLE1BQ3pCLFdBQVcsS0FBSyxJQUFJLE9BQU87QUFBQSxNQUMzQixZQUFZLEtBQUssSUFBSSxZQUFZO0FBQUEsTUFDakMsd0JBQXdCLEtBQUssWUFBWTtBQUFBLE1BRXpDLFVBQVUsS0FBSyxJQUFJLFdBQVc7QUFBQSxNQUM5QixjQUFjLFFBQ1oscUJBQXFCLEtBQUssZ0JBQWdCLGlCQUFpQixDQUM3RDtBQUFBLE1BQ0Esc0JBQXNCLFFBQ3BCLHFCQUFxQixLQUFLLHlCQUF5QixpQkFBaUIsQ0FDdEU7QUFBQSxNQUNBLFlBQVksS0FBSyxXQUFXO0FBQUEsTUFDNUIsU0FBUyx3Q0FBYyxLQUFLLFVBQVU7QUFBQSxNQUN0QyxRQUFRLEtBQUssSUFBSSxRQUFRLEtBQUssQ0FBQztBQUFBLE1BQy9CLGdCQUFnQixLQUFLLGVBQWU7QUFBQSxNQUNwQyxrQkFBa0IsS0FBSyxpQkFBaUI7QUFBQSxNQUN4QyxZQUFZLEtBQUssc0JBQXNCO0FBQUEsTUFDdkMsWUFBWSxLQUFLLGNBQWM7QUFBQSxNQUMvQixxQkFBcUIsS0FBSywrQkFBK0I7QUFBQSxNQUN6RCxtQkFBbUIsS0FBSyw2QkFBNkI7QUFBQSxNQUNyRDtBQUFBLE1BQ0EsbUJBQW1CLEtBQUsscUJBQXFCO0FBQUEsTUFDN0M7QUFBQSxNQUNBO0FBQUEsTUFDQSwwQkFBMEIsS0FBSyxJQUFJLDBCQUEwQjtBQUFBLE1BQzdEO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLFlBQVksS0FBSyxJQUFJLG1CQUFtQjtBQUFBLE1BQ3hDLFdBQVcsS0FBSyxJQUFJLGFBQWE7QUFBQSxNQUNqQyxrQkFBa0IsS0FBSyxJQUFJLGFBQWE7QUFBQSxNQUN4QztBQUFBLE1BQ0EsU0FBUyxLQUFLLElBQUksU0FBUztBQUFBLE1BQzNCLFdBQVcsS0FBSyxhQUFhO0FBQUEsTUFDN0IsV0FBVyxRQUFRLEtBQUssSUFBSSxXQUFXLENBQUM7QUFBQSxNQUN4QztBQUFBLE1BQ0EsWUFBWSxLQUFLLElBQUksWUFBWTtBQUFBLE1BQ2pDLFdBQVcsS0FBSyxVQUFVO0FBQUEsTUFDMUIsTUFBTSx3Q0FBSyxLQUFLLFVBQVU7QUFBQSxNQUMxQixzQkFBc0IsS0FBSyxxQkFBcUI7QUFBQSxNQUNoRCxVQUFVLEtBQUssSUFBSSxVQUFVO0FBQUEsTUFDN0IsYUFBYSxLQUFLLFlBQVk7QUFBQSxNQUM5QixZQUFZLEtBQUssV0FBVztBQUFBLE1BQzVCLGdCQUFnQixLQUFLO0FBQUEsTUFDckI7QUFBQSxNQUVBLGFBQWEsS0FBSyxJQUFJLFdBQVc7QUFBQSxNQUNqQyxNQUFNLFFBQVEsS0FBSyxJQUFJLE1BQU0sQ0FBQztBQUFBLE1BQzlCLGNBQWMsS0FBSyxJQUFJLGNBQWM7QUFBQSxNQUNyQyxjQUFjLEtBQUssZ0JBQWdCO0FBQUEsTUFDbkMsYUFBYSxLQUFLLGVBQWU7QUFBQSxNQUNqQyxjQUFjLEtBQUssSUFBSSxjQUFjLEtBQUs7QUFBQSxNQUMxQyxvQkFBb0IsS0FBSyxzQkFBc0I7QUFBQSxNQUMvQyw0QkFBNEIsS0FBSyw4QkFBOEI7QUFBQSxNQUMvRCxtQkFBbUIsS0FBSyxxQkFBcUI7QUFBQSxNQUM3QyxZQUFZLEtBQUssSUFBSSxZQUFZO0FBQUEsTUFDakM7QUFBQSxNQUNBLGdDQUNFLEtBQUssSUFBSSxlQUFlLEdBQUc7QUFBQSxNQUM3Qix5QkFBeUIsS0FBSyxJQUFJLGVBQWUsR0FBRztBQUFBLE1BQ3BELHNCQUFzQixLQUFLLElBQUksZUFBZSxHQUFHO0FBQUEsTUFDakQsbUJBQW1CLFFBQVEsS0FBSyxJQUFJLG1CQUFtQixDQUFDO0FBQUEsTUFDeEQsd0JBQXdCLEtBQUssdUJBQXVCO0FBQUEsTUFDcEQsYUFBYSxLQUFLLElBQUksYUFBYTtBQUFBLE1BQ25DLGVBQWUsS0FBSyxJQUFJLGVBQWU7QUFBQSxNQUN2Qyw4QkFBOEIsS0FBSyxJQUFJLDhCQUE4QjtBQUFBLE1BQ3JFLE1BQU0sS0FBSyxJQUFJLE1BQU07QUFBQSxNQUNyQixhQUFhLEtBQUssVUFBVTtBQUFBLE1BQzVCLGFBQWEsS0FBSyxlQUFlO0FBQUEsTUFDakMsZ0JBQWdCLEtBQUssSUFBSSxnQkFBZ0I7QUFBQSxNQUN6QyxjQUFjLEtBQUssSUFBSSxjQUFjO0FBQUEsTUFDckMsY0FBYyxLQUFLLElBQUksY0FBYztBQUFBLE1BQ3JDO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBLE9BQU8sS0FBSyxTQUFTO0FBQUEsTUFDckIsaUJBQWlCLGtCQUFrQjtBQUFBLE1BQ25DLGlCQUFpQix3Q0FBSyxLQUFLLFVBQVUsSUFDakMsT0FBTyxLQUFLLFlBQVksSUFDeEIsS0FBSyxTQUFTO0FBQUEsTUFDbEIsYUFBYSxLQUFLLElBQUksYUFBYSxLQUFLO0FBQUEsU0FDcEMsd0RBQXFCLEtBQUssVUFBVSxJQUNwQztBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sa0JBQWtCLEtBQUssSUFBSSxrQkFBa0IsS0FBSyxDQUFDO0FBQUEsTUFDckQsSUFDQTtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04saUNBQ0UsS0FBSyxJQUFJLGlDQUFpQyxLQUFLLENBQUM7QUFBQSxRQUNsRCxrQkFBa0IsQ0FBQztBQUFBLE1BQ3JCO0FBQUEsSUFDTjtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFdBQVcsTUFBNEI7QUFDckMsVUFBTSxXQUFXLEtBQUssSUFBSSxNQUFNO0FBQ2hDLFFBQUksUUFBUSxTQUFTLFVBQVU7QUFDN0IsV0FBSyxJQUFJLFFBQVEsSUFBSTtBQUVyQixVQUFJLFVBQVU7QUFDWixhQUFLLDRCQUE0QixVQUFVLElBQUk7QUFBQSxNQUNqRDtBQUVBLGFBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFDckQsV0FBSyxRQUFRLGFBQWEsTUFBTSxRQUFRLFFBQVE7QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFdBQVcsTUFBcUI7QUFDOUIsVUFBTSxXQUFXLEtBQUssSUFBSSxNQUFNO0FBQ2hDLFFBQUksUUFBUSxTQUFTLFVBQVU7QUFDN0IsV0FBSyxJQUFJLFFBQVEsaUJBQUssS0FBSyxLQUFLLFlBQVksQ0FBQyxDQUFDO0FBQzlDLGFBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFDckQsV0FBSyxRQUFRLGFBQWEsTUFBTSxRQUFRLFFBQVE7QUFBQSxJQUNsRDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLGNBQWMsU0FBd0I7QUFDcEMsVUFBTSxXQUFXLEtBQUssSUFBSSxTQUFTO0FBQ25DLFFBQUksV0FBVyxZQUFZLFVBQVU7QUFDbkMsV0FBSyxJQUFJLFdBQVcsT0FBTztBQUMzQixhQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQ3JELFdBQUssUUFBUSxhQUFhLE1BQU0sV0FBVyxRQUFRO0FBQUEsSUFDckQ7QUFBQSxFQUNGO0FBQUEsRUFFQSx3QkFBOEI7QUFDNUIsU0FBSyxJQUFJO0FBQUEsTUFDUCxjQUFlLE1BQUssSUFBSSxjQUFjLEtBQUssS0FBSztBQUFBLElBQ2xELENBQUM7QUFDRCxXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLGtCQUFzQztBQUNwQyxRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sYUFBYSxLQUFLLElBQUksV0FBVyxLQUFLLEtBQUssSUFBSSxTQUFTO0FBRzlELFFBQUksY0FBYyxXQUFXLFFBQVE7QUFDbkMsYUFBTyxXQUFXO0FBQUEsSUFDcEI7QUFFQSxVQUFNLHVCQUF1QixLQUFLLElBQUksc0JBQXNCO0FBQzVELFFBQUksNEJBQVMsb0JBQW9CLEdBQUc7QUFDbEMsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsd0JBQThCO0FBQzVCLFNBQUssSUFBSTtBQUFBLE1BQ1AsY0FBYyxLQUFLLElBQUssTUFBSyxJQUFJLGNBQWMsS0FBSyxLQUFLLEdBQUcsQ0FBQztBQUFBLElBQy9ELENBQUM7QUFDRCxXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLDBCQUEwQixFQUFFLE1BQU0sVUFBNkIsQ0FBQyxHQUVsRDtBQUNaLFVBQU0sU0FBUztBQUFBLE1BQ2IsY0FBZSxNQUFLLElBQUksY0FBYyxLQUFLLEtBQUs7QUFBQSxNQUNoRCxrQkFBbUIsTUFBSyxJQUFJLGtCQUFrQixLQUFLLEtBQUs7QUFBQSxJQUMxRDtBQUVBLFFBQUksS0FBSztBQUNQLGFBQU87QUFBQSxJQUNUO0FBQ0EsU0FBSyxJQUFJLE1BQU07QUFDZixXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBRXJELFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSw0QkFBa0M7QUFDaEMsU0FBSyxJQUFJO0FBQUEsTUFDUCxjQUFjLEtBQUssSUFBSyxNQUFLLElBQUksY0FBYyxLQUFLLEtBQUssR0FBRyxDQUFDO0FBQUEsTUFDN0Qsa0JBQWtCLEtBQUssSUFBSyxNQUFLLElBQUksa0JBQWtCLEtBQUssS0FBSyxHQUFHLENBQUM7QUFBQSxJQUN2RSxDQUFDO0FBQ0QsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQ3ZEO0FBQUEsUUFNTSxpQ0FDSixVQUF1QyxDQUFDLEdBQ3pCO0FBQ2YsVUFBTSxFQUFFLGtCQUFrQjtBQUMxQixVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUV6RSxRQUFJO0FBQ0osT0FBRztBQUNELFlBQU0sUUFBUSxXQUFXLFNBQVMsS0FBSztBQUd2QyxpQkFBVyxNQUFNLE9BQU8sT0FBTyxLQUFLLCtCQUNsQyxLQUFLLElBQUksSUFBSSxHQUNiO0FBQUEsUUFDRSxTQUFTLDJDQUFRLEtBQUssVUFBVTtBQUFBLFFBQ2hDLE9BQU87QUFBQSxRQUNQLFdBQVcsUUFBUSxNQUFNLEtBQUs7QUFBQSxRQUM5QixZQUFZLFFBQVEsTUFBTSxjQUFjO0FBQUEsUUFDeEMsUUFBUSxRQUFRLE1BQU0sVUFBVTtBQUFBLFFBQ2hDLFNBQVM7QUFBQSxNQUNYLENBQ0Y7QUFFQSxVQUFJLENBQUMsU0FBUyxRQUFRO0FBQ3BCO0FBQUEsTUFDRjtBQUVBLFlBQU0sZUFBZSxTQUFTLE9BQU8sT0FBSyxDQUFDLDhCQUFVLENBQUMsS0FBSywrQkFBVyxDQUFDLENBQUM7QUFFeEUsVUFBSSxlQUFlO0FBRWpCLGNBQU0saURBQXFCLG1CQUN6QixPQUFPLFNBQ1AsYUFBYSxJQUFJLE9BQU07QUFBQSxVQUNyQixXQUFXLEVBQUU7QUFBQSxVQUNiLFlBQVksRUFBRTtBQUFBLFVBQ2QsWUFBWSxFQUFFO0FBQUEsVUFDZCxXQUFXLEVBQUU7QUFBQSxRQUNmLEVBQUUsQ0FDSjtBQUFBLE1BQ0Y7QUFHQSxZQUFNLFFBQVEsSUFDWixhQUFhLElBQUksT0FBTSxNQUFLO0FBQzFCLGNBQU0sYUFBYSxPQUFPLGtCQUFrQixTQUFTLEVBQUUsSUFBSSxDQUFDO0FBQzVELGNBQU0sYUFBYSxNQUFNLFdBQVcseUJBQXlCO0FBQzdELFlBQUksWUFBWTtBQUNkLGdCQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksV0FBVyxZQUFZO0FBQUEsWUFDMUQ7QUFBQSxVQUNGLENBQUM7QUFBQSxRQUNIO0FBQUEsTUFDRixDQUFDLENBQ0g7QUFBQSxJQUNGLFNBQVMsU0FBUyxTQUFTO0FBQUEsRUFDN0I7QUFBQSxRQUVNLDRCQUNKLFVBQ0EsRUFBRSxXQUFXLE9BQU8sd0JBQXdCLFVBQVUsQ0FBQyxHQUN4QztBQUNmLFFBQUk7QUFDRixZQUFNLHFCQUFxQiw4QkFBTSxZQUFZLHVCQUF1QjtBQUNwRSxZQUFNLGdCQUFnQixDQUFDLFlBQVksQ0FBQztBQUNwQyxZQUFNLG9CQUNKLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUVyRCxZQUFNLDZCQUE2QixLQUFLLElBQUksNEJBQTRCO0FBQ3hFLFlBQU0sb0JBQW9CLGFBQWE7QUFDdkMsWUFBTSx3QkFBd0IsS0FBSyxZQUFZO0FBRy9DLFdBQUssSUFBSTtBQUFBLFFBQ1AsNEJBQTRCO0FBQUEsTUFDOUIsQ0FBQztBQUVELFVBQUksYUFBYSxtQkFBbUIsUUFBUTtBQUMxQyxhQUFLLFFBQVEsRUFBRSxzQkFBc0IsQ0FBQztBQUN0QyxhQUFLLHFCQUFxQixFQUFFLHNCQUFzQixDQUFDO0FBSW5ELFlBQUkscUJBQXFCLENBQUMsdUJBQXVCO0FBQy9DLGdCQUFNLEtBQUssaUNBQWlDLEVBQUUsY0FBYyxDQUFDO0FBQUEsUUFDL0Q7QUFFQSxZQUFJLGVBQWU7QUFDakIsY0FDRSw2Q0FBVSxLQUFLLFVBQVUsS0FDekIsd0RBQXFCLEtBQUssVUFBVSxHQUNwQztBQUNBLGlCQUFLLHFCQUFxQjtBQUFBLFVBQzVCLFdBQ0UscUJBQ0EsNkNBQVUsS0FBSyxVQUFVLEtBQ3pCLEtBQUssZ0JBQWdCLGlCQUFpQixHQUN0QztBQUNBLGtCQUFNLEtBQUssY0FBYztBQUFBLGNBQ3ZCLE1BQU07QUFBQSxjQUNOLG1CQUFtQixNQUNqQixLQUFLLHFCQUFxQixpQkFBaUI7QUFBQSxZQUMvQyxDQUFDO0FBQUEsVUFDSCxXQUNFLHFCQUNBLDZDQUFVLEtBQUssVUFBVSxLQUN6QixLQUFLLFNBQVMsaUJBQWlCLEdBQy9CO0FBQ0EsZ0JBQUksS0FDRixrRUFDRjtBQUFBLFVBQ0YsT0FBTztBQUNMLGdCQUFJLE1BQ0YsbUZBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsV0FBVyxhQUFhLG1CQUFtQixPQUFPO0FBRWhELGFBQUssTUFBTSxFQUFFLHNCQUFzQixDQUFDO0FBQ3BDLGFBQUssc0JBQXNCLEVBQUUsc0JBQXNCLENBQUM7QUFFcEQsWUFBSSxlQUFlO0FBQ2pCLGNBQUksNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDOUIsa0JBQU0sS0FBSyxXQUFXO0FBQUEsVUFDeEIsV0FBVyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUNyQyxrQkFBTSxLQUFLLGFBQWE7QUFBQSxVQUMxQjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLFdBQVcsYUFBYSxtQkFBbUIsUUFBUTtBQUNqRCxhQUFLLHNCQUFzQixFQUFFLHNCQUFzQixDQUFDO0FBSXBELGNBQU0sS0FBSyxnQkFBZ0I7QUFDM0IsYUFBSyxrQkFBa0I7QUFFdkIsWUFBSSxlQUFlO0FBQ2pCLGVBQUssUUFBUSxVQUFVLDhCQUE4QjtBQUVyRCxjQUFJLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQzlCLGtCQUFNLEtBQUssV0FBVztBQUFBLFVBQ3hCLFdBQVcsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDckMsa0JBQU0sS0FBSyxhQUFhO0FBQUEsVUFDMUI7QUFBQSxRQUNGO0FBQUEsTUFDRixXQUFXLGFBQWEsbUJBQW1CLGtCQUFrQjtBQUUzRCxhQUFLLE1BQU0sRUFBRSxzQkFBc0IsQ0FBQztBQUNwQyxhQUFLLHNCQUFzQixFQUFFLHNCQUFzQixDQUFDO0FBSXBELGNBQU0sS0FBSyxnQkFBZ0I7QUFDM0IsYUFBSyxrQkFBa0I7QUFFdkIsWUFBSSxlQUFlO0FBQ2pCLGVBQUssUUFBUSxVQUFVLDBDQUEwQztBQUVqRSxjQUFJLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQzlCLGtCQUFNLEtBQUssV0FBVztBQUFBLFVBQ3hCLFdBQVcsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDckMsa0JBQU0sS0FBSyxhQUFhO0FBQUEsVUFDMUI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsVUFBRTtBQUNBLGFBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxJQUN2RDtBQUFBLEVBQ0Y7QUFBQSxRQUVNLDZCQUE2QjtBQUFBLElBQ2pDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQUtnQjtBQUNoQixVQUFNLE9BQU8sT0FBTyxPQUFPLDZCQUE2QjtBQUFBLE1BQ3REO0FBQUEsTUFDQSxjQUFjO0FBQUEsTUFDZDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxtQkFBbUI7QUFBQSxJQUN2QjtBQUFBLElBQ0E7QUFBQSxLQUlnQjtBQUNoQixVQUFNLG9CQUNKLE9BQU8sdUJBQXVCLDRCQUE0QjtBQUM1RCxVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUN6RSxRQUFJO0FBQ0YsVUFBSSxrQkFBa0I7QUFDcEIsY0FBTSxLQUFLLGNBQWM7QUFBQSxVQUN2QixNQUFNO0FBQUEsVUFDTjtBQUFBLFVBQ0EsbUJBQW1CLE1BQU0sS0FBSywwQkFBMEI7QUFBQSxRQUMxRCxDQUFDO0FBQUEsTUFDSCxPQUFPO0FBQ0wsY0FBTSxLQUFLLGNBQWM7QUFBQSxVQUN2QixNQUFNO0FBQUEsVUFDTjtBQUFBLFVBQ0EsbUJBQW1CLE1BQU0sS0FBSyxVQUFVLGlCQUFpQjtBQUFBLFFBQzNELENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRixTQUFTLE9BQVA7QUFDQSxZQUFNLDRCQUNKO0FBQ0YsVUFBSSxDQUFDLE1BQU0sVUFBVTtBQUNuQixjQUFNO0FBQUEsTUFDUixPQUFPO0FBQ0wsY0FBTSxlQUFlLE1BQU0sU0FBUyxNQUFNLFFBQVE7QUFDbEQsWUFBSSxpQkFBaUIsMkJBQTJCO0FBQzlDLGdCQUFNO0FBQUEsUUFDUixPQUFPO0FBQ0wsY0FBSSxLQUNGLG1IQUNGO0FBQ0EsZUFBSyxJQUFJO0FBQUEsWUFDUCx3QkFBd0I7QUFBQSxjQUN0QjtBQUFBLGdCQUNFLE1BQU07QUFBQSxnQkFDTixXQUFXLEtBQUssSUFBSTtBQUFBLGNBQ3RCO0FBQUEsWUFDRjtBQUFBLFVBQ0YsQ0FBQztBQUFBLFFBQ0g7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFVBQU0scUJBQXFCLDhCQUFNLFlBQVksdUJBQXVCO0FBSXBFLFNBQUssSUFBSTtBQUFBLE1BQ1AsNEJBQTRCLG1CQUFtQjtBQUFBLE1BQy9DLFdBQVcsS0FBSyxJQUFJLFdBQVcsS0FBSyxLQUFLLElBQUk7QUFBQSxJQUMvQyxDQUFDO0FBQ0QsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQ3ZEO0FBQUEsUUFFTSxvQkFBbUM7QUFDdkMsVUFBTSxvQkFDSixPQUFPLHVCQUF1Qiw0QkFBNEI7QUFFNUQsVUFBTSxxQkFBcUIsS0FBSyxJQUFJLHlCQUF5QjtBQUM3RCxRQUFJLENBQUMsb0JBQW9CO0FBQ3ZCLFVBQUksS0FDRixxQkFBcUIsS0FBSyxhQUFhLHlDQUN6QztBQUFBLElBQ0Y7QUFFQSxVQUFNLEtBQUssY0FBYztBQUFBLE1BQ3ZCLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFDQSxtQkFBbUIsTUFDakIsS0FBSywyQkFBMkIsaUJBQWlCO0FBQUEsSUFDckQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLGFBQWEsaUJBQXVEO0FBQ3hFLFVBQU0sS0FBSyxjQUFjO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLE1BQ2pCLE9BQU8sT0FBTyxPQUFPLHNCQUNuQixLQUFLLFlBQ0wsZUFDRjtBQUFBLElBQ0osQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLHdCQUNKLFlBS2U7QUFDZixVQUFNLEtBQUssY0FBYztBQUFBLE1BQ3ZCLE1BQU07QUFBQSxNQUNOLG1CQUFtQixNQUNqQixPQUFPLE9BQU8sT0FBTyw0QkFDbkI7QUFBQSxRQUNFLElBQUksS0FBSztBQUFBLFFBQ1QsY0FBYyxLQUFLLElBQUksY0FBYztBQUFBLFFBQ3JDLFVBQVUsS0FBSyxJQUFJLFVBQVU7QUFBQSxRQUM3QixjQUFjLEtBQUssSUFBSSxjQUFjO0FBQUEsTUFDdkMsR0FDQSxVQUNGO0FBQUEsSUFDSixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sZUFBOEI7QUFDbEMsVUFBTSxvQkFDSixPQUFPLHVCQUF1QixxQkFBcUI7QUFFckQsUUFDRSxxQkFDQSw2Q0FBVSxLQUFLLFVBQVUsS0FDekIsS0FBSyxnQkFBZ0IsaUJBQWlCLEdBQ3RDO0FBQ0EsWUFBTSxLQUFLLGNBQWM7QUFBQSxRQUN2QixNQUFNO0FBQUEsUUFDTixtQkFBbUIsTUFBTSxLQUFLLG9CQUFvQixDQUFDLGlCQUFpQixDQUFDO0FBQUEsTUFDdkUsQ0FBQztBQUFBLElBQ0gsV0FDRSxxQkFDQSw2Q0FBVSxLQUFLLFVBQVUsS0FDekIsS0FBSyxTQUFTLGlCQUFpQixHQUMvQjtBQUNBLFlBQU0sS0FBSyxjQUFjO0FBQUEsUUFDdkIsTUFBTTtBQUFBLFFBQ04sbUJBQW1CLE1BQU0sS0FBSyxhQUFhLGlCQUFpQjtBQUFBLE1BQzlELENBQUM7QUFBQSxJQUNILE9BQU87QUFDTCxVQUFJLE1BQ0YsMEVBQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUFBLFFBRU0sZ0JBQ0osTUFDZ0Q7QUFDaEQsUUFBSSxLQUFLLFNBQVMsSUFBSSxHQUFHO0FBQ3ZCLFVBQUksS0FBSyxpREFBaUQ7QUFFMUQ7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLGdCQUFnQixJQUFJLEdBQUc7QUFDOUIsVUFBSSxLQUFLLDBEQUEwRDtBQUVuRTtBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQUssZUFBZSxJQUFJLEdBQUc7QUFDN0IsVUFBSSxLQUFLLDRDQUE0QztBQUVyRDtBQUFBLElBQ0Y7QUFFQSxXQUFPLE9BQU8sT0FBTyxPQUFPLDJCQUEyQjtBQUFBLE1BQ3JELE9BQU8sS0FBSztBQUFBLE1BQ1o7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSx1QkFBdUIsTUFBcUM7QUFDaEUsVUFBTSxLQUFLLGNBQWM7QUFBQSxNQUN2QixNQUFNO0FBQUEsTUFDTixtQkFBbUIsWUFBWSxLQUFLLGdCQUFnQixJQUFJO0FBQUEsSUFDMUQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLFlBQVksZ0JBQXVDO0FBQ3ZELFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLENBQUMsS0FBSyxTQUFTLGNBQWMsR0FBRztBQUNsQyxVQUFJLE1BQ0YsdUJBQXVCLDZDQUN6QjtBQUNBO0FBQUEsSUFDRjtBQUVBLFVBQU0sS0FBSyxjQUFjO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLE1BQU0sS0FBSyxrQkFBa0IsY0FBYztBQUFBLElBQ2hFLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSxvQ0FDSixnQkFDZTtBQUNmLFFBQ0UsNkNBQVUsS0FBSyxVQUFVLEtBQ3pCLEtBQUsseUJBQXlCLGNBQWMsR0FDNUM7QUFDQSxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUNqQixLQUFLLDhCQUE4QixjQUFjO0FBQUEsTUFDckQsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsUUFFTSxvQ0FDSixpQkFDZTtBQUNmLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLENBQUMsa0JBQWtCO0FBR3pCLFFBQUksZ0JBQWdCLFNBQVMsR0FBRztBQUM5QixZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUFNLEtBQUssb0JBQW9CLGVBQWU7QUFBQSxRQUNqRSwyQkFBMkI7QUFBQSxNQUM3QixDQUFDO0FBQUEsSUFDSCxXQUFXLEtBQUsseUJBQXlCLGNBQWMsR0FBRztBQUN4RCxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUNqQixLQUFLLDJCQUEyQixjQUFjO0FBQUEsUUFDaEQsMkJBQTJCLENBQUMsY0FBYztBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNILFdBQVcsS0FBSyxnQkFBZ0IsY0FBYyxHQUFHO0FBQy9DLFlBQU0sS0FBSyxjQUFjO0FBQUEsUUFDdkIsTUFBTTtBQUFBLFFBQ04sbUJBQW1CLE1BQU0sS0FBSyxvQkFBb0IsQ0FBQyxjQUFjLENBQUM7QUFBQSxRQUNsRSwyQkFBMkIsQ0FBQyxjQUFjO0FBQUEsTUFDNUMsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQUEsUUFFTSxrQkFBa0IsZ0JBQXVDO0FBQzdELFFBQ0UsNkNBQVUsS0FBSyxVQUFVLEtBQ3pCLEtBQUsseUJBQXlCLGNBQWMsR0FDNUM7QUFDQSxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUNqQixLQUFLLDJCQUEyQixjQUFjO0FBQUEsUUFDaEQsMkJBQTJCLENBQUMsY0FBYztBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNILFdBQ0UsNkNBQVUsS0FBSyxVQUFVLEtBQ3pCLEtBQUssZ0JBQWdCLGNBQWMsR0FDbkM7QUFDQSxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUFNLEtBQUssb0JBQW9CLENBQUMsY0FBYyxDQUFDO0FBQUEsUUFDbEUsMkJBQTJCLENBQUMsY0FBYztBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNILFdBQVcsNkNBQVUsS0FBSyxVQUFVLEtBQUssS0FBSyxTQUFTLGNBQWMsR0FBRztBQUN0RSxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUFNLEtBQUssYUFBYSxjQUFjO0FBQUEsUUFDekQsMkJBQTJCLENBQUMsY0FBYztBQUFBLE1BQzVDLENBQUM7QUFBQSxJQUNILE9BQU87QUFDTCxVQUFJLE1BQ0YsNkJBQTZCLHNFQUMvQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSwyQkFBMkIsVUFBaUM7QUFHaEUsVUFBTSxLQUFLLDRCQUE0QixRQUFRO0FBRS9DLFVBQU0sVUFBVSxLQUFLLGlCQUFpQjtBQUV0QyxRQUFJLE9BQU8sdUJBQXVCLG1CQUFtQixHQUFHO0FBQ3RELFVBQUksS0FDRixxRkFDRjtBQUNBO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLCtDQUFvQixJQUN4QiwyQkFBYyw4QkFBOEI7QUFBQSxRQUMxQyxZQUFZLEtBQUssSUFBSSxNQUFNO0FBQUEsUUFDM0IsWUFBWSxLQUFLLElBQUksTUFBTTtBQUFBLFFBQzNCO0FBQUEsUUFDQSxNQUFNO0FBQUEsTUFDUixDQUFDLENBQ0g7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRiw0REFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSxrQkFBbUM7QUFDdkMsVUFBTSxPQUFPLEtBQUssUUFBUTtBQUMxQixRQUFJLENBQUMsTUFBTTtBQUNULGFBQU8sT0FBTyxXQUFXLFFBQVEsU0FBUyxlQUFlO0FBQUEsSUFDM0Q7QUFFQSxVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsU0FBUyxZQUFZLElBQUk7QUFDbkUsV0FBTyxRQUFRLE1BQ2IsTUFBTSxPQUFPLFdBQVcsUUFBUSxTQUFTLGVBQWUsT0FDMUQ7QUFBQSxFQUNGO0FBQUEsUUFFTSxpQkFBZ0M7QUFDcEMsUUFBSSx3REFBcUIsS0FBSyxVQUFVLEdBQUc7QUFDekMsWUFBTSxLQUFLO0FBQ1gsWUFBTSxXQUFXLE1BQU0sS0FBSyxnQkFBZ0I7QUFFNUMsVUFBSSxLQUFLLElBQUksVUFBVSxNQUFNLFVBQVU7QUFDckMsYUFBSyxJQUFJLEVBQUUsU0FBUyxDQUFDO0FBQ3JCLGVBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxNQUN2RDtBQUVBO0FBQUEsSUFDRjtBQUVBLFNBQUssY0FBYztBQUVuQixVQUFNLFFBQVEsSUFFWixLQUFLLGtCQUFtQixJQUFJLE9BQU0sWUFBVztBQUMzQyxVQUFJLENBQUMsd0NBQUssUUFBUSxVQUFVLEdBQUc7QUFDN0IsY0FBTSxRQUFRLGVBQWU7QUFBQSxNQUMvQjtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBQUEsRUFDRjtBQUFBLEVBRUEsbUJBQW1CLFNBQWlEO0FBRWxFLFVBQU0sRUFBRSxZQUFZLEtBQUs7QUFDekIsV0FBTyxLQUFLLFNBQVMsc0JBQXNCLE1BQ3pDLEtBQUssYUFBYSxTQUFTLE9BQU8sQ0FDcEM7QUFBQSxFQUNGO0FBQUEsRUFFQSxZQUFZLFNBQWlEO0FBRTNELFVBQU0sRUFBRSxhQUFhLEtBQUs7QUFDMUIsV0FBTyxLQUFLLFNBQVMsZUFBZSxNQUNsQyxLQUFLLGFBQWEsVUFBVSxPQUFPLENBQ3JDO0FBQUEsRUFDRjtBQUFBLEVBRUEsY0FBYyxTQUFnRDtBQUU1RCxVQUFNLEVBQUUsZUFBZSxLQUFLO0FBQzVCLFdBQU8sS0FBSyxTQUFTLGlCQUFpQixNQUNwQyxLQUFLLGFBQWEsWUFBWSxPQUFPLENBQ3ZDO0FBQUEsRUFDRjtBQUFBLFFBRWMsYUFDWixVQUNBLGlCQUNrQjtBQUNsQixVQUFNLFVBQVUsbUJBQW1CLENBQUM7QUFDcEMsV0FBTyxFQUFFLFNBQVMsU0FBUztBQUFBLE1BQ3pCLHVCQUF1QjtBQUFBLE1BQ3ZCLEtBQUs7QUFBQSxJQUNQLENBQUM7QUFHRCxVQUFNLEVBQUUsVUFBVSxZQUFZLEtBQUs7QUFFbkMsUUFBSSxDQUFDLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUMxQyxZQUFNLElBQUksTUFDUiw4RUFFRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLE9BQU8sS0FBSyxRQUFRO0FBQzFCLFVBQU0sb0JBQW9CLEtBQUssSUFBSSxVQUFVO0FBQzdDLFFBQUksWUFBWTtBQUNoQixRQUFJLFFBQVEsdUJBQXVCO0FBQ2pDLHNDQUNFLE1BQ0EscURBQXFELEtBQUssSUFDNUQ7QUFJQSxrQkFDRSxNQUFNLE9BQU8sV0FBVyxRQUFRLFNBQVMsdUJBQ3ZDLE1BQ0EsVUFDQSxRQUFRLE9BQU8sTUFDakI7QUFBQSxJQUNKLFdBQVcsTUFBTTtBQUNmLFlBQU0sT0FBTyxXQUFXLFFBQVEsU0FBUyxZQUFZLE1BQU0sUUFBUTtBQUFBLElBQ3JFLE9BQU87QUFDTCxVQUFJLEtBQUssZ0JBQWdCLEtBQUsseUNBQXlDO0FBQUEsSUFDekU7QUFFQSxTQUFLLElBQUksRUFBRSxTQUFTLENBQUM7QUFHckIsUUFBSSxDQUFDLFFBQVEsdUJBQXVCO0FBQ2xDLGFBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxJQUN2RDtBQUVBLFFBQUksQ0FBQyxRQUFRLHVCQUF1QjtBQUNsQyxVQUFJLFdBQVc7QUFDYixhQUFLLGNBQWMsV0FBVztBQUFBLE1BQ2hDO0FBQ0EsVUFBSSxzQkFBc0IsVUFBVTtBQUNsQyxhQUFLLGNBQWMsaUJBQWlCLHdCQUF3QixVQUFVO0FBQUEsTUFDeEU7QUFBQSxJQUNGO0FBRUEsVUFBTSxvQkFBb0Isc0JBQXNCO0FBQ2hELFVBQU0sdUJBQXVCLENBQUMsUUFBUTtBQUN0QyxVQUFNLDRCQUNKLFFBQVEseUJBQXlCLGFBQWE7QUFDaEQsUUFHRyxxQkFBcUIsd0JBR3JCLHFCQUFxQiw2QkFJckIsYUFBYSxhQUFhLFVBQzNCO0FBQ0EsWUFBTSxLQUFLLGtCQUFrQixLQUFLLElBQUksYUFBYSxVQUFVO0FBQUEsUUFDM0QsT0FBTztBQUFBLE1BQ1QsQ0FBQztBQUFBLElBQ0g7QUFDQSxRQUFJLHdCQUF3QixNQUFNO0FBQ2hDLFlBQU0sS0FBSyxzQkFBc0IsS0FBSyxJQUFJLE1BQU0sR0FBRyxNQUFNLFFBQVE7QUFBQSxJQUNuRTtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsUUFFTSxzQkFDSixNQUNBLE1BQ0EsT0FDb0M7QUFDcEMsVUFBTSxhQUFhLE9BQU8sS0FBSyxTQUFTLElBQUk7QUFDNUMsUUFBSSxDQUFDLFlBQVk7QUFDZixZQUFNLElBQUksTUFDUiw0REFDRjtBQUFBLElBQ0Y7QUFFQSxRQUFJLE9BQU8sdUJBQXVCLG1CQUFtQixHQUFHO0FBQ3RELFVBQUksS0FDRixnRUFDRjtBQUNBO0FBQUEsSUFDRjtBQUVBLFVBQU0sTUFBTSxNQUFNLE9BQU8sV0FBVyxRQUFRLFNBQVMsZ0JBQ25ELGlCQUFLLGNBQWMsVUFBVSxDQUMvQjtBQUNBLFFBQUksQ0FBQyxLQUFLO0FBQ1IsWUFBTSxJQUFJLE1BQ1IsK0RBQStELFlBQ2pFO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLCtDQUFvQixJQUN4QiwyQkFBYyxvQkFBb0IsTUFBTSxLQUFLLFNBQVMsR0FBRyxPQUFPLEdBQUcsQ0FDckU7QUFBQSxJQUNGLFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRix1REFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSxhQUFzQjtBQUNwQixRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUV6QyxhQUFPLEtBQUssSUFBSSxVQUFVLE1BQU0sS0FBSyxhQUFjO0FBQUEsSUFDckQ7QUFFQSxRQUFJLENBQUMsS0FBSyxtQkFBbUIsUUFBUTtBQUNuQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sS0FBSyxtQkFBbUIsTUFBTSxhQUFXO0FBQzlDLFVBQUksd0NBQUssUUFBUSxVQUFVLEdBQUc7QUFDNUIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPLFFBQVEsV0FBVztBQUFBLElBQzVCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxlQUF3QjtBQUN0QixRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxZQUFNLFdBQVcsS0FBSyxJQUFJLFVBQVU7QUFDcEMsYUFFRSxhQUFhLEtBQUssYUFBYyxZQUVoQyxhQUFhLEtBQUssYUFBYztBQUFBLElBRXBDO0FBRUEsUUFBSSxDQUFDLEtBQUssbUJBQW1CLFFBQVE7QUFDbkMsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLEtBQUssbUJBQW1CLEtBQUssYUFBVztBQUM3QyxVQUFJLHdDQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTyxRQUFRLGFBQWE7QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsZ0JBQWlEO0FBQy9DLFFBQUksd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQ3pDLGFBQU8sS0FBSyxhQUFhLElBQ3JCLElBQUksT0FBTyxRQUFRLHVCQUF1QixDQUFDLElBQUksQ0FBQyxJQUNoRCxJQUFJLE9BQU8sUUFBUSx1QkFBdUI7QUFBQSxJQUNoRDtBQUNBLFdBQU8sSUFBSSxPQUFPLFFBQVEsdUJBQ3hCLEtBQUssbUJBQW1CLE9BQU8sYUFBVztBQUN4QyxVQUFJLHdDQUFLLFFBQVEsVUFBVSxHQUFHO0FBQzVCLGVBQU87QUFBQSxNQUNUO0FBQ0EsYUFBTyxRQUFRLGFBQWE7QUFBQSxJQUM5QixDQUFDLENBQ0g7QUFBQSxFQUNGO0FBQUEsUUFFTSxjQUE2QjtBQUNqQyxRQUFJLENBQUMsd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQzFDLFlBQU0sSUFBSSxNQUNSLDhGQUVGO0FBQUEsSUFDRjtBQUVBLFVBQU0sT0FBTyxLQUFLLFFBQVE7QUFDMUIsUUFBSSxDQUFDLE1BQU07QUFDVCxVQUFJLEtBQUssZUFBZSxLQUFLLHdCQUF3QjtBQUNyRDtBQUFBLElBQ0Y7QUFFQSxXQUFPLE9BQU8sV0FBVyxRQUFRLFNBQVMsWUFBWSxNQUFNLElBQUk7QUFBQSxFQUNsRTtBQUFBLEVBRUEsa0JBQTJCO0FBQ3pCLFFBQUk7QUFDRixZQUFNLE9BQU8sS0FBSyxRQUFRO0FBQzFCLHNDQUFhLE1BQU0sNkJBQTZCLEtBQUssSUFBSTtBQUN6RCxhQUFPLE9BQU8sV0FBVyxRQUFRLFNBQVMsWUFBWSxJQUFJO0FBQUEsSUFDNUQsU0FBUyxLQUFQO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFBQSxFQUNGO0FBQUEsRUFFQSxjQUF1QjtBQUNyQixRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxhQUFPLEtBQUssZ0JBQWdCO0FBQUEsSUFDOUI7QUFFQSxRQUFJLENBQUMsS0FBSyxrQkFBbUIsUUFBUTtBQUNuQyxhQUFPO0FBQUEsSUFDVDtBQUdBLFdBQU8sS0FBSyxrQkFBbUIsSUFBSSxhQUFXO0FBQzVDLFVBQUksd0NBQUssUUFBUSxVQUFVLEdBQUc7QUFDNUIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxhQUFPLFFBQVEsZ0JBQWdCO0FBQUEsSUFDakMsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLGVBQWdEO0FBQzlDLFFBQUksd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQ3pDLFVBQUksS0FBSyxZQUFZLEdBQUc7QUFDdEIsZUFBTyxJQUFJLE9BQU8sUUFBUSx1QkFBdUIsQ0FBQyxJQUFJLENBQUM7QUFBQSxNQUN6RDtBQUNBLGFBQU8sSUFBSSxPQUFPLFFBQVEsdUJBQXVCO0FBQUEsSUFDbkQ7QUFFQSxXQUFPLElBQUksT0FBTyxRQUFRLHVCQUV4QixLQUFLLGtCQUFtQixPQUFPLGFBQVc7QUFDeEMsVUFBSSx3Q0FBSyxRQUFRLFVBQVUsR0FBRztBQUM1QixlQUFPO0FBQUEsTUFDVDtBQUNBLGFBQU8sUUFBUSxZQUFZO0FBQUEsSUFDN0IsQ0FBQyxDQUNIO0FBQUEsRUFDRjtBQUFBLEVBRUEsc0JBQThCO0FBQzVCLFdBQU8sS0FBSyxJQUFJLGtCQUFrQixLQUFLO0FBQUEsRUFDekM7QUFBQSxFQUVBLGdDQUF3QztBQUN0QyxXQUFPLEtBQUssSUFBSSw0QkFBNEIsS0FBSztBQUFBLEVBQ25EO0FBQUEsRUFFQSxlQUFtQztBQUNqQyxRQUFJLENBQUMsS0FBSyxJQUFJLE9BQU8sR0FBRztBQUN0QixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sUUFBUSxLQUFLLElBQUksWUFBWTtBQUNuQyxVQUFNLE9BQU8sS0FBSyxJQUFJLE9BQU87QUFFN0IsUUFBSSxDQUFDLE9BQU87QUFDVixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sT0FBTyxLQUFLLGlEQUFpRDtBQUFBLE1BQ2xFO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQU1BLGNBQXVCO0FBQ3JCLFdBQU8sMERBQXVCLEtBQUssVUFBVTtBQUFBLEVBQy9DO0FBQUEsRUFFQSx5QkFBK0I7QUFHN0IsU0FBSyxRQUFRLG1CQUFtQixJQUFJO0FBQ3BDLFNBQUssUUFBUSxVQUFVLE1BQU0sRUFBRSxPQUFPLEtBQUssQ0FBQztBQUFBLEVBQzlDO0FBQUEsUUFFTSxpQkFBbUM7QUFDdkMsUUFBSSxLQUFLLFdBQVcsR0FBRztBQUNyQixhQUFPLEtBQUssbUJBQW1CO0FBQUEsSUFDakM7QUFDQSxXQUFPLEtBQUssWUFBWTtBQUFBLEVBQzFCO0FBQUEsUUFFTSx3QkFBd0I7QUFBQSxJQUM1QjtBQUFBLElBQ0E7QUFBQSxLQUlnQjtBQUNoQixRQUFJLEtBQUssdUNBQXVDLEtBQUssYUFBYSxLQUFLO0FBQUEsTUFDckU7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUNkLGdCQUFnQixLQUFLO0FBQUEsTUFDckIsTUFBTTtBQUFBLE1BQ04sU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWSxvQ0FBVztBQUFBLE1BQ3ZCLFlBQVksb0NBQVc7QUFBQSxJQUd6QjtBQUVBLFVBQU0sS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksU0FBUztBQUFBLE1BQ3ZELFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFDRCxVQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FDckMsSUFDQSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsU0FDdEI7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBQ2hDLFNBQUssYUFBYTtBQUFBLEVBQ3BCO0FBQUEsUUFFTSxpQkFBaUI7QUFBQSxJQUNyQjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEtBTWdCO0FBQ2hCLFFBQUksS0FBSyxnQ0FBZ0MsS0FBSyxhQUFhLEtBQUs7QUFBQSxNQUM5RDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFFRCxVQUFNLFVBQVU7QUFBQSxNQUNkLGdCQUFnQixLQUFLO0FBQUEsTUFDckIsTUFBTTtBQUFBLE1BQ04sWUFBWTtBQUFBLE1BQ1osU0FBUztBQUFBLE1BQ1QsYUFBYTtBQUFBLE1BQ2IsZ0JBQWdCO0FBQUEsTUFDaEIsWUFBWSxvQ0FBVztBQUFBLE1BQ3ZCLFlBQVksb0NBQVc7QUFBQSxJQUd6QjtBQUVBLFVBQU0sS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksU0FBUztBQUFBLE1BQ3ZELFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFDRCxVQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FDckMsSUFDQSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsU0FDdEI7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBRWhDLFVBQU0sS0FBSyxPQUFPLEtBQUs7QUFDdkIsU0FBSyxhQUFhO0FBQUEsRUFDcEI7QUFBQSxRQUVNLGFBQWEsY0FBbUM7QUFDcEQsUUFBSSxLQUNGLGtDQUNBLEtBQUssYUFBYSxHQUNsQixhQUFhLFNBQVMsR0FDdEIsS0FBSyxJQUFJLFdBQVcsQ0FDdEI7QUFFQSxVQUFNLFlBQVksS0FBSyxJQUFJO0FBQzNCLFVBQU0sVUFBVTtBQUFBLE1BQ2QsZ0JBQWdCLEtBQUs7QUFBQSxNQUNyQixNQUFNO0FBQUEsTUFDTixTQUFTLEtBQUssSUFBSSxXQUFXO0FBQUEsTUFDN0IsYUFBYSxPQUFPLE9BQU8sS0FBSyx3QkFBd0I7QUFBQSxNQUN4RCxnQkFBZ0I7QUFBQSxNQUNoQixhQUFhLGFBQWEsU0FBUztBQUFBLE1BQ25DLFlBQVksb0NBQVc7QUFBQSxNQUN2QixZQUFZLG9DQUFXO0FBQUEsTUFDdkIsZUFBZSxRQUFRO0FBQUEsSUFHekI7QUFFQSxVQUFNLEtBQUssTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLFNBQVM7QUFBQSxNQUN2RCxTQUFTLE9BQU8sV0FBVyxRQUFRLEtBQUssZUFBZSxFQUFFLFNBQVM7QUFBQSxJQUNwRSxDQUFDO0FBQ0QsVUFBTSxRQUFRLE9BQU8sa0JBQWtCLFNBQ3JDLElBQ0EsSUFBSSxPQUFPLFFBQVEsUUFBUTtBQUFBLFNBQ3RCO0FBQUEsTUFDSDtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBRUEsVUFBTSxjQUFjLE1BQU0sS0FBSyxZQUFZO0FBRTNDLFNBQUssUUFBUSxjQUFjLEtBQUs7QUFFaEMsVUFBTSxPQUFPLEtBQUssSUFBSSxNQUFNO0FBRTVCLFFBQUksZUFBZSxNQUFNO0FBQ3ZCLGFBQU8sYUFBYSxRQUFRLFdBQVcsRUFBRSxLQUFLLENBQUM7QUFBQSxJQUNqRDtBQUFBLEVBQ0Y7QUFBQSxRQUVNLGtCQUNKLGtCQUNBLFVBQ0EsVUFBK0IsRUFBRSxPQUFPLEtBQUssR0FDOUI7QUFDZixRQUFJLHdDQUFLLEtBQUssVUFBVSxHQUFHO0FBQ3pCLFVBQUksS0FBSyw2REFBNkQ7QUFDdEU7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLEtBQUssSUFBSSxXQUFXLEtBQUssS0FBSyxJQUFJO0FBRXRELFFBQUksS0FDRix1Q0FDQSxLQUFLLGFBQWEsR0FDbEIsa0JBQ0EsV0FDRjtBQUVBLFVBQU0saUJBQWlCLENBQUMsUUFBUSxTQUFTLENBQUM7QUFDMUMsVUFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixVQUFNLFVBQWlDO0FBQUEsTUFDckMsSUFBSSxvQkFBYTtBQUFBLE1BQ2pCLGdCQUFnQixLQUFLO0FBQUEsTUFDckIsT0FBTyxRQUFRLFFBQVEsS0FBSztBQUFBLE1BQzVCLFlBQVksaUJBQWlCLG9DQUFXLFNBQVMsb0NBQVc7QUFBQSxNQUM1RCxnQkFBZ0I7QUFBQSxNQUNoQixhQUFhLE9BQU8sT0FBTyxLQUFLLHdCQUF3QjtBQUFBLE1BQ3hELFlBQVksaUJBQWlCLG9DQUFXLFNBQVMsb0NBQVc7QUFBQSxNQUM1RCxTQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0EsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBLGlCQUFpQjtBQUFBLElBQ25CO0FBRUEsVUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLFNBQVM7QUFBQSxNQUM1QyxTQUFTLE9BQU8sV0FBVyxRQUFRLEtBQUssZUFBZSxFQUFFLFNBQVM7QUFBQSxNQUNsRSxXQUFXO0FBQUEsSUFDYixDQUFDO0FBQ0QsVUFBTSxRQUFRLE9BQU8sa0JBQWtCLFNBQ3JDLFFBQVEsSUFDUixJQUFJLE9BQU8sUUFBUSxRQUFRLE9BQU8sQ0FDcEM7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBQ2hDLFNBQUssYUFBYTtBQUVsQixVQUFNLE9BQU8sS0FBSyxRQUFRO0FBQzFCLFFBQUksd0RBQXFCLEtBQUssVUFBVSxLQUFLLE1BQU07QUFDakQsYUFBTyx1QkFBdUIsMEJBQTBCLElBQUksRUFBRSxLQUM1RCxZQUFVO0FBQ1IsZUFBTyxFQUFFLFFBQVEsUUFBUSxXQUFTO0FBQ2hDLGdCQUFNLGtCQUFrQixLQUFLLElBQUksVUFBVSxPQUFPO0FBQUEsUUFDcEQsQ0FBQztBQUFBLE1BQ0gsQ0FDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSxlQUNKLG9CQUNBLG1CQUNlO0FBQ2YsUUFBSTtBQUNKLFFBQUk7QUFDSixRQUFJO0FBRUosWUFBUSxtQkFBbUI7QUFBQSxXQUNwQix3QkFBUztBQUNaLG9CQUFZLG1CQUFtQjtBQUMvQixpQkFDRSxDQUFDLG1CQUFtQixlQUFlLENBQUMsbUJBQW1CO0FBQ3pELHdCQUFnQjtBQUFBLGFBQ1g7QUFBQSxVQUNILFVBQVUsd0JBQVM7QUFBQSxRQUNyQjtBQUNBO0FBQUEsV0FDRyx3QkFBUztBQUNaLG9CQUFZLG1CQUFtQjtBQUMvQixpQkFBUztBQUNULHdCQUFnQjtBQUNoQjtBQUFBO0FBRUEsY0FBTSw4Q0FBaUIsa0JBQWtCO0FBQUE7QUFHN0MsVUFBTSxVQUFVO0FBQUEsTUFDZCxnQkFBZ0IsS0FBSztBQUFBLE1BQ3JCLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULGFBQ0UscUJBQXFCLE9BQU8sT0FBTyxLQUFLLHdCQUF3QjtBQUFBLE1BQ2xFLGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVksU0FBUyxvQ0FBVyxTQUFTLG9DQUFXO0FBQUEsTUFDcEQsWUFBWSxTQUFTLG9DQUFXLFNBQVMsb0NBQVc7QUFBQSxNQUNwRCxvQkFBb0I7QUFBQSxJQUV0QjtBQUVBLFVBQU0sS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksU0FBUztBQUFBLE1BQ3ZELFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFDRCxVQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FDckMsSUFDQSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsU0FDdEI7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBQ2hDLFNBQUssYUFBYTtBQUFBLEVBQ3BCO0FBQUEsUUFRTSw4QkFDSixPQUNBLGFBQ2tCO0FBRWxCLFVBQU0saUJBQWlCLEtBQUs7QUFDNUIsU0FBSyw2QkFBNkI7QUFFbEMsVUFBTSxvQkFDSCxrQkFBa0IsbUJBQW1CLFNBQ3JDLE1BQU0sT0FBTyxPQUFPLEtBQUssMkJBQTJCLEtBQUssSUFBSSxLQUFLO0FBRXJFLFFBQUksbUJBQW1CO0FBQ3JCLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxLQUFLLGVBQ1Q7QUFBQSxNQUNFLFVBQVUsd0JBQVM7QUFBQSxNQUNuQjtBQUFBLE1BQ0E7QUFBQSxNQUNBLGFBQWEsS0FBSyxJQUFJO0FBQUEsSUFDeEIsR0FDQSxNQUNGO0FBQ0EsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLGlCQUNKLGVBQ0EsZ0JBQ2U7QUFDZixVQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFVBQU0sVUFBVTtBQUFBLE1BQ2QsZ0JBQWdCLEtBQUs7QUFBQSxNQUNyQixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxhQUFhLE9BQU8sT0FBTyxLQUFLLHdCQUF3QjtBQUFBLE1BQ3hELGdCQUFnQjtBQUFBLE1BQ2hCLFlBQVksb0NBQVc7QUFBQSxNQUN2QixZQUFZLG9DQUFXO0FBQUEsTUFDdkIsV0FBVyxrQkFBa0IsS0FBSztBQUFBLE1BQ2xDO0FBQUEsSUFFRjtBQUVBLFVBQU0sS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksU0FBUztBQUFBLE1BQ3ZELFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFDRCxVQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FDckMsSUFDQSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsU0FDdEI7QUFBQSxNQUNIO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBRWhDLFVBQU0sT0FBTyxLQUFLLFFBQVE7QUFDMUIsUUFBSSx3REFBcUIsS0FBSyxVQUFVLEtBQUssTUFBTTtBQUNqRCxhQUFPLHVCQUF1QiwwQkFBMEIsSUFBSSxFQUFFLEtBQzVELFlBQVU7QUFDUixlQUFPLEVBQUUsUUFBUSxRQUFRLFdBQVM7QUFDaEMsZ0JBQU0saUJBQWlCLGVBQWUsS0FBSyxFQUFFO0FBQUEsUUFDL0MsQ0FBQztBQUFBLE1BQ0gsQ0FDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSxnQkFDSixNQUNBLFFBQXdDLENBQUMsR0FDeEI7QUFDakIsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFNLFVBQTBDO0FBQUEsTUFDOUMsZ0JBQWdCLEtBQUs7QUFBQSxNQUNyQjtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1QsYUFBYSxPQUFPLE9BQU8sS0FBSyx3QkFBd0I7QUFBQSxNQUN4RCxnQkFBZ0I7QUFBQSxNQUNoQixZQUFZLG9DQUFXO0FBQUEsTUFDdkIsWUFBWSxvQ0FBVztBQUFBLFNBRXBCO0FBQUEsSUFDTDtBQUVBLFVBQU0sS0FBSyxNQUFNLE9BQU8sT0FBTyxLQUFLLFlBRWxDLFNBQ0E7QUFBQSxNQUNFLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQ0Y7QUFDQSxVQUFNLFFBQVEsT0FBTyxrQkFBa0IsU0FDckMsSUFDQSxJQUFJLE9BQU8sUUFBUSxRQUFRO0FBQUEsU0FDckI7QUFBQSxNQUNKO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxTQUFLLFFBQVEsY0FBYyxLQUFLO0FBRWhDLFdBQU87QUFBQSxFQUNUO0FBQUEsUUFFTSw4QkFDSiwwQkFDZTtBQUNmLFFBQUksQ0FBQyx3REFBcUIsS0FBSyxVQUFVLEdBQUc7QUFDMUM7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLFVBQVUsR0FBRztBQUNwQjtBQUFBLElBQ0Y7QUFFQSxRQUFJLDBCQUEwQjtBQUM1QixZQUFNLEtBQUssMEJBQTBCO0FBQ3JDO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxJQUFJLHVCQUF1QixLQUFLLEtBQUssSUFBSSxhQUFhLEdBQUc7QUFDaEU7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLHFCQUFxQixJQUFJO0FBQzdDLFFBQUksQ0FBQyxhQUFhO0FBQ2hCO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FDRixpQ0FBaUMsS0FBSyxhQUFhLHdCQUNyRDtBQUNBLFVBQU0saUJBQWlCLE1BQU0sS0FBSyxnQkFDaEMsOEJBQ0Y7QUFDQSxTQUFLLElBQUkseUJBQXlCLGNBQWM7QUFBQSxFQUNsRDtBQUFBLFFBRU0sMkJBQTBDO0FBRTlDLFFBQUksQ0FBRSxNQUFNLEtBQUssMEJBQTBCLEdBQUk7QUFDN0M7QUFBQSxJQUNGO0FBR0EsUUFBSSxLQUFLLElBQUksYUFBYSxHQUFHO0FBQzNCO0FBQUEsSUFDRjtBQUVBLFVBQU0sY0FBYyxxQkFBcUIsSUFBSTtBQUM3QyxRQUFJLGFBQWE7QUFDZixVQUFJLEtBQ0YsNEJBQTRCLEtBQUssYUFBYSxvQkFDaEQ7QUFFQSxZQUFNLEtBQUssc0JBQXNCLGFBQWE7QUFBQSxRQUM1QyxRQUFRO0FBQUEsTUFDVixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFBQSxRQUVNLDRCQUE4QztBQUNsRCxVQUFNLGlCQUFpQixLQUFLLElBQUksdUJBQXVCO0FBQ3ZELFFBQUksQ0FBQyxnQkFBZ0I7QUFDbkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxTQUFLLElBQUkseUJBQXlCLE1BQVM7QUFDM0MsUUFBSSxLQUNGLDZCQUE2QixLQUFLLGFBQWEsMEJBQ2pEO0FBRUEsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFFBQVEsY0FBYztBQUMvRCxRQUFJLFNBQVM7QUFDWCxZQUFNLE9BQU8sT0FBTyxLQUFLLGNBQWMsUUFBUSxFQUFFO0FBQUEsSUFDbkQ7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLFFBRU0sNEJBQ0osVUFDQSxVQUNlO0FBQ2YsVUFBTSxhQUFhLEtBQUssZUFDdEIseUNBQ0Y7QUFFQSxVQUFNLEVBQUUsWUFBWSxPQUFPO0FBQzNCLFFBQUksUUFBUSxLQUFLLGVBQWUsVUFBVSxNQUFNLHFCQUFTLFNBQVM7QUFDaEUsVUFBSSxLQUNGLGdCQUFnQixLQUFLLGFBQWEsd0RBRXBDO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUNGLGdCQUFnQixLQUFLLGFBQWEsNENBQ1osV0FBVyxTQUFTLFVBQVUsZUFBZSxVQUNyRTtBQUVBLFVBQU0sU0FBUztBQUFBLE1BQ2I7QUFBQSxNQUNBLEdBQUksTUFBTSxPQUFPLHVCQUF1QiwwQkFDdEMsVUFDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsSUFDWixPQUFPLElBQUksV0FBUztBQUNsQixhQUFPLE1BQU0sZ0JBQWdCLDhCQUE4QjtBQUFBLFFBQ3pELFlBQVksb0NBQVc7QUFBQSxRQUN2QixZQUFZLG9DQUFXO0FBQUEsUUFDdkIsWUFBWSxXQUFXLFNBQVM7QUFBQSxNQUNsQyxDQUFDO0FBQUEsSUFDSCxDQUFDLENBQ0g7QUFBQSxFQUNGO0FBQUEsUUFFTSxjQUFjLFNBQXVCLFFBQWdDO0FBWXpFLFdBQU8sS0FBSyxTQUFTLGlCQUFpQixNQUVwQyxLQUFLLFNBQVMsUUFBUSxJQUFJLGFBQWEsR0FBSTtBQUFBLE1BQ3pDLGNBQWMsUUFBUSxJQUFJLFNBQVM7QUFBQSxNQUNuQyxrQkFBa0I7QUFBQSxNQUNsQjtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBQUEsRUFDRjtBQUFBLEVBRVMsU0FBUyxhQUFhLEtBQUssWUFBMkI7QUFDN0QsVUFBTSxXQUFXLENBQUMsTUFBTTtBQUN4QixVQUFNLFVBQVUsT0FBTyxFQUFFLE9BQU8sVUFBVSxVQUFRLENBQUMsV0FBVyxLQUFLO0FBQ25FLFFBQUksUUFBUSxRQUFRO0FBQ2xCLGFBQU8sMEJBQTBCO0FBQUEsSUFDbkM7QUFFQSxRQUFJLFdBQVcsU0FBUyxhQUFhLFdBQVcsU0FBUyxTQUFTO0FBQ2hFLGFBQU8sOEJBQThCLFdBQVc7QUFBQSxJQUNsRDtBQUVBLFVBQU0sZUFBZSxDQUFDLFFBQVEsUUFBUSxTQUFTO0FBQy9DLFVBQU0sa0JBQ0osT0FBTyxFQUFFLE9BQU8sY0FBYyxVQUFRLFdBQVcsS0FBSyxFQUFFLFNBQVM7QUFFbkUsUUFBSSxDQUFDLGlCQUFpQjtBQUNwQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sUUFBUSxLQUFLLGVBQWUsS0FBSyxLQUFLLGFBQWE7QUFFekQsUUFBSSxPQUFPO0FBQ1QsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsaUJBQWdDO0FBQzlCLFFBQUksd0RBQXFCLEtBQUssVUFBVSxLQUFLLEtBQUssSUFBSSxNQUFNLEdBQUc7QUFDN0QsWUFBTSxhQUFhLE9BQU8sUUFBUSxJQUFJLFlBQVk7QUFDbEQsVUFBSSxDQUFDLFlBQVk7QUFDZixjQUFNLElBQUksTUFBTSxnQkFBZ0I7QUFBQSxNQUNsQztBQUNBLFlBQU0sU0FBUywyQ0FFYixLQUFLLElBQUksTUFBTSxHQUNmLFVBQ0Y7QUFDQSxVQUFJLE9BQU8sZUFBZTtBQUN4QixhQUFLLElBQUksRUFBRSxNQUFNLE9BQU8sS0FBSyxDQUFDO0FBQzlCLGVBQU87QUFBQSxNQUNUO0FBRUEsVUFBSTtBQUNKLFVBQUksT0FBTyxpQkFBaUIsT0FBTztBQUNqQyx1QkFBZSxPQUFPLE1BQU07QUFBQSxNQUM5QixXQUFXLE9BQU8sT0FBTyxVQUFVLFVBQVU7QUFDM0MsdUJBQWUsT0FBTztBQUFBLE1BQ3hCO0FBQ0EsYUFBTyxnQkFBZ0I7QUFBQSxJQUN6QjtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxlQUE4QjtBQUM1QixRQUFJLHdEQUFxQixLQUFLLFVBQVUsS0FBSyxLQUFLLElBQUksTUFBTSxHQUFHO0FBQzdELFVBQUksNkJBQVksS0FBSyxJQUFJLE1BQU0sQ0FBQyxHQUFHO0FBQ2pDLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsU0FDRSxNQUNBLFVBQ1k7QUFDWixTQUFLLFdBQVcsS0FBSyxZQUFZLElBQUksT0FBTyxPQUFPLEVBQUUsYUFBYSxFQUFFLENBQUM7QUFFckUsVUFBTSxrQkFBa0Isb0NBQ3RCLFVBQ0EsZ0JBQWdCLEtBQUssYUFBYSxHQUNwQztBQUVBLFVBQU0sa0JBQWtCLElBQUksZ0JBQWdCO0FBQzVDLFVBQU0sRUFBRSxRQUFRLGdCQUFnQjtBQUVoQyxVQUFNLFdBQVcsS0FBSyxJQUFJO0FBQzFCLFdBQU8sS0FBSyxTQUFTLElBQUksWUFBWTtBQUNuQyxZQUFNLFlBQVksS0FBSyxJQUFJO0FBQzNCLFlBQU0sV0FBVyxZQUFZO0FBRTdCLFVBQUksV0FBVyw0QkFBNEI7QUFDekMsWUFBSSxLQUFLLG9CQUFvQix3QkFBd0IsWUFBWTtBQUFBLE1BQ25FO0FBRUEsVUFBSTtBQUNGLGVBQU8sTUFBTSxnQkFBZ0IsV0FBVztBQUFBLE1BQzFDLFNBQVMsT0FBUDtBQUNBLHdCQUFnQixNQUFNO0FBQ3RCLGNBQU07QUFBQSxNQUNSLFVBQUU7QUFDQSxjQUFNLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFFOUIsWUFBSSxXQUFXLDRCQUE0QjtBQUN6QyxjQUFJLEtBQUssb0JBQW9CLGFBQWEsWUFBWTtBQUFBLFFBQ3hEO0FBQUEsTUFDRjtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLFFBQVEsSUFBcUI7QUFDM0IsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxPQUFPLGlCQUFLLGNBQWMsRUFBRSxFQUFFLFNBQVM7QUFDN0MsVUFBTSxVQUFVLEtBQUssSUFBSSxXQUFXLEtBQUssQ0FBQztBQUMxQyxVQUFNLFNBQVMsUUFBUSxLQUFLLE9BQUssRUFBRSxTQUFTLElBQUk7QUFDaEQsUUFBSSxDQUFDLFFBQVE7QUFDWCxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sZUFBZSw4QkFBTSxPQUFPO0FBRWxDLFdBQU8sT0FBTyxTQUFTLGFBQWE7QUFBQSxFQUN0QztBQUFBLEVBRUEsVUFBNEI7QUFDMUIsUUFBSTtBQUNGLFlBQU0sUUFBUSxLQUFLLElBQUksTUFBTTtBQUM3QixhQUFPLFNBQVMsSUFBSSxpQkFBSyxLQUFLO0FBQUEsSUFDaEMsU0FBUyxLQUFQO0FBQ0EsVUFBSSxLQUNGLDRDQUE0QyxLQUFLLG1CQUNqRCxPQUFPLFlBQVksR0FBRyxDQUN4QjtBQUNBLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUFBLEVBRUEsZUFBZSxRQUFzQjtBQUNuQyxVQUFNLFNBQVMsS0FBSyxRQUFRO0FBQzVCLG9DQUFhLFdBQVcsUUFBVyxNQUFNO0FBQ3pDLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFUSxpQkFHTDtBQUNELFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPLENBQUM7QUFBQSxJQUNWO0FBRUEsVUFBTSxVQUFVLEtBQUssSUFBSSxXQUFXLEtBQUssQ0FBQztBQUMxQyxXQUFPLFFBQVEsSUFBSSxZQUFXO0FBQUEsTUFDNUIsU0FBUyxPQUFPLFNBQVMsOEJBQU0sT0FBTyxLQUFLO0FBQUEsTUFDM0MsTUFBTSxPQUFPO0FBQUEsSUFDZixFQUFFO0FBQUEsRUFDSjtBQUFBLEVBRUEsZUFBbUM7QUFDakMsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxDQUFDLEtBQUssSUFBSSx5QkFBeUIsR0FBRztBQUN4QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sT0FBTyxPQUFPLE9BQU8sZUFBZSxJQUFJO0FBQUEsRUFDakQ7QUFBQSxFQUVRLHdCQUdMO0FBQ0QsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLGFBQU8sQ0FBQztBQUFBLElBQ1Y7QUFFQSxVQUFNLFVBQVUsS0FBSyxJQUFJLGtCQUFrQixLQUFLLENBQUM7QUFDakQsV0FBTyxRQUFRLElBQUksWUFBVztBQUFBLE1BQzVCLGVBQWUsT0FBTztBQUFBLE1BQ3RCLE1BQU0sT0FBTztBQUFBLElBQ2YsRUFBRTtBQUFBLEVBQ0o7QUFBQSxFQUVRLGdDQUFpRTtBQUN2RSxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0IsYUFBTyxDQUFDO0FBQUEsSUFDVjtBQUVBLFVBQU0sVUFBVSxLQUFLLElBQUksd0JBQXdCLEtBQUssQ0FBQztBQUN2RCxXQUFPLFFBQVEsSUFBSSxZQUFXO0FBQUEsTUFDNUIsTUFBTSxPQUFPO0FBQUEsSUFDZixFQUFFO0FBQUEsRUFDSjtBQUFBLEVBRVEsdUJBQThDO0FBQ3BELFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPLENBQUM7QUFBQSxJQUNWO0FBRUEsV0FBUSxNQUFLLElBQUksaUJBQWlCLEtBQUssQ0FBQyxHQUFHLElBQUksWUFBVSxPQUFPLElBQUk7QUFBQSxFQUN0RTtBQUFBLEVBRUEsV0FDRSxVQUErQyxDQUFDLEdBQ3RCO0FBQzFCLFdBQU8sMkJBQ0wsMERBQXVCLEtBQUssWUFBWSxPQUFPLEVBQUUsSUFBSSx1QkFDbkQsT0FBTyx1QkFBdUIsSUFBSSxrQkFBa0IsRUFBRSxDQUN4RCxDQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEseUJBQWtDO0FBQ2hDLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksQ0FBQyw4REFBeUIsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxlQUE4QjtBQUM1QixVQUFNLFVBQVUsS0FBSyxXQUFXO0FBQ2hDLFdBQU8sUUFBUSxJQUFJLFlBQVUsT0FBTyxFQUFFO0FBQUEsRUFDeEM7QUFBQSxFQUVBLGlCQUE4QjtBQUM1QixVQUFNLFVBQVUsS0FBSyxXQUFXO0FBQ2hDLFdBQU8sUUFBUSxJQUFJLFlBQVU7QUFDM0IsYUFBTyxPQUFPLGVBQWUsMkJBQTJCO0FBQUEsSUFDMUQsQ0FBQztBQUFBLEVBQ0g7QUFBQSxFQUVBLGNBQWM7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLE1BSUUsQ0FBQyxHQUFrQjtBQUNyQixRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUV6QyxhQUFPLENBQUMsS0FBSyxjQUFjLENBQUU7QUFBQSxJQUMvQjtBQUVBLFVBQU0sVUFBVSxLQUFLLFdBQVcsRUFBRSxzQkFBc0IsQ0FBQztBQUt6RCxVQUFNLHFCQUFxQiw0QkFDdkIsMEJBQ0csSUFBSSxRQUFNLE9BQU8sdUJBQXVCLElBQUksRUFBRSxDQUFDLEVBQy9DLE9BQU8sd0JBQVEsSUFDbEIsQ0FBQztBQUVMLFVBQU0sU0FBUyxtQkFBbUIsU0FDOUIsT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQyxJQUNuRDtBQUdKLFdBQU8sT0FBTyxFQUFFLFFBQ2QsT0FBTyxJQUFJLFlBQ1Qsd0NBQUssT0FBTyxVQUFVLElBQUksT0FBTyxPQUFPLGNBQWMsQ0FDeEQsQ0FDRjtBQUFBLEVBQ0Y7QUFBQSxFQUdBLDJCQUF3QztBQUN0QyxXQUFPLElBQUksSUFBSSwwQkFBSSxLQUFLLFdBQVcsR0FBRyxrQkFBZ0IsYUFBYSxFQUFFLENBQUM7QUFBQSxFQUN4RTtBQUFBLEVBR0EsOEJBQTJDO0FBQ3pDLFVBQU0sYUFBYSxLQUFLLGNBQWM7QUFDdEMsVUFBTSxrQkFBa0IsV0FBVyxJQUFJLGdCQUFjO0FBQ25ELFlBQU0sZUFBZSxPQUFPLHVCQUF1QixZQUNqRCxZQUNBLFNBQ0Y7QUFDQSxzQ0FDRSxjQUNBLCtEQUNGO0FBQ0EsYUFBTyxhQUFhO0FBQUEsSUFDdEIsQ0FBQztBQUVELFdBQU8sSUFBSSxJQUFJLGVBQWU7QUFBQSxFQUNoQztBQUFBLFFBRU0sbUJBQ0osYUFDQSxTQUNBLFNBQ3FCO0FBQ3JCLFFBQUksZUFBZSxZQUFZLFFBQVE7QUFDckMsWUFBTSxtQkFBbUIsTUFBTSxLQUFLLDJCQUFLLGFBQWEsQ0FBQyxDQUFDO0FBQ3hELFlBQU0sYUFBYSw2QkFBTSxnQkFBZ0I7QUFFekMsYUFBTyxRQUFRLElBQ2IsMEJBQUksa0JBQWtCLE9BQU0sZUFBYztBQUN4QyxjQUFNLEVBQUUsTUFBTSxVQUFVLFdBQVcsZ0JBQWdCO0FBRW5ELFlBQUksQ0FBQyxNQUFNO0FBQ1QsaUJBQU87QUFBQSxZQUNMLGFBQWEsYUFBYSx3QkFBWTtBQUFBLFlBR3RDLFVBQVUsWUFBWTtBQUFBLFlBQ3RCLFdBQVc7QUFBQSxVQUNiO0FBQUEsUUFDRjtBQUVBLGVBQU87QUFBQSxVQUNMLGFBQWEsYUFBYSx3QkFBWTtBQUFBLFVBR3RDLFVBQVUsWUFBWTtBQUFBLFVBQ3RCLFdBQVcsWUFDUDtBQUFBLGVBQ00sTUFBTSxtQkFBbUIsU0FBUztBQUFBLFlBQ3RDLFdBQVcsMEJBQTBCLFVBQVUsSUFBSTtBQUFBLFVBQ3JELElBQ0E7QUFBQSxRQUNOO0FBQUEsTUFDRixDQUFDLENBQ0g7QUFBQSxJQUNGO0FBRUEsUUFBSSxXQUFXLFFBQVEsUUFBUTtBQUM3QixZQUFNLGdCQUFnQiwyQkFBSyxTQUFTLENBQUM7QUFFckMsYUFBTyxRQUFRLElBQ2IsMEJBQUksZUFBZSxPQUFNLGVBQWM7QUFDckMsY0FBTSxFQUFFLFVBQVU7QUFFbEIsWUFBSSxDQUFDLE9BQU87QUFDVixpQkFBTztBQUFBLFlBQ0wsYUFBYTtBQUFBLFlBR2IsVUFBVTtBQUFBLFlBQ1YsV0FBVztBQUFBLFVBQ2I7QUFBQSxRQUNGO0FBRUEsY0FBTSxFQUFFLGdCQUFnQjtBQUV4QixlQUFPO0FBQUEsVUFDTDtBQUFBLFVBR0EsVUFBVTtBQUFBLFVBQ1YsV0FBVyxRQUNQO0FBQUEsZUFDTSxNQUFNLG1CQUFtQixLQUFLO0FBQUEsWUFDbEMsV0FBVywwQkFBMEIsTUFBTSxJQUFJO0FBQUEsVUFDakQsSUFDQTtBQUFBLFFBQ047QUFBQSxNQUNGLENBQUMsQ0FDSDtBQUFBLElBQ0Y7QUFFQSxRQUFJLFdBQVcsUUFBUSxRQUFRLFFBQVEsS0FBSyxNQUFNO0FBQ2hELFlBQU0sRUFBRSxNQUFNLGdCQUFnQixRQUFRO0FBRXRDLGFBQU87QUFBQSxRQUNMO0FBQUEsVUFDRTtBQUFBLFVBR0EsVUFBVTtBQUFBLFVBQ1YsV0FBVztBQUFBLGVBQ0wsTUFBTSxtQkFBbUIsUUFBUSxJQUFJO0FBQUEsWUFDekMsV0FBVywwQkFBMEIsSUFBSTtBQUFBLFVBQzNDO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsV0FBTyxDQUFDO0FBQUEsRUFDVjtBQUFBLFFBRU0sVUFBVSxlQUF5RDtBQUN2RSxVQUFNLEVBQUUsWUFBWTtBQUVwQixVQUFNLFVBQVUsK0JBQVcsY0FBYyxVQUFVO0FBQ25ELFVBQU0sY0FBYyxjQUFjLElBQUksYUFBYTtBQUNuRCxVQUFNLFVBQVUsY0FBYyxJQUFJLFNBQVM7QUFDM0MsVUFBTSxVQUFVLGNBQWMsSUFBSSxTQUFTO0FBRTNDLFVBQU0sT0FBTyxjQUFjLElBQUksTUFBTTtBQUNyQyxVQUFNLGtCQUFrQixjQUFjLElBQUksU0FBUztBQUNuRCxVQUFNLHNCQUNKLG1CQUFtQixnQkFBZ0IsU0FBUyxJQUN4QyxRQUFRLGdCQUFnQixFQUFFLElBQzFCO0FBRU4sV0FBTztBQUFBLE1BQ0wsWUFBWSxRQUFRLElBQUksTUFBTTtBQUFBLE1BQzlCLGFBQWEsZ0NBQVksY0FBYyxVQUFVLElBQzdDLENBQUMsRUFBRSxhQUFhLHdCQUFZLFVBQVUsS0FBSyxDQUFDLElBQzVDLE1BQU0sS0FBSyxtQkFBbUIsYUFBYSxTQUFTLE9BQU87QUFBQSxNQUMvRCxZQUFZLGNBQWMsSUFBSSxZQUFZO0FBQUEsTUFDMUMsSUFBSSxjQUFjLElBQUksU0FBUztBQUFBLE1BQy9CLFlBQVksZ0NBQVksY0FBYyxVQUFVO0FBQUEsTUFDaEQsYUFBYSxnQ0FBWSxjQUFjLFVBQVU7QUFBQSxNQUNqRCxXQUFXLGNBQWMsSUFBSSxJQUFJO0FBQUEsTUFDakMsMkJBQTJCO0FBQUEsTUFDM0IsTUFBTSxRQUFRO0FBQUEsSUFDaEI7QUFBQSxFQUNGO0FBQUEsUUFFTSxtQkFBbUIsUUFBZ0IsV0FBa0M7QUFDekUsVUFBTSxXQUFXLFNBQVMsZUFBZSxNQUFNO0FBQy9DLFVBQU0sY0FBYyxTQUFTLFdBQVcsUUFBUSxTQUFTO0FBQ3pELFFBQUksQ0FBQyxlQUFlLENBQUMsVUFBVTtBQUM3QixVQUFJLEtBQ0Ysa0NBQWtDLFdBQVcscUJBQy9DO0FBQ0E7QUFBQSxJQUNGO0FBRUEsVUFBTSxFQUFFLFFBQVE7QUFDaEIsVUFBTSxFQUFFLE9BQU8sTUFBTSxPQUFPLFdBQVc7QUFDdkMsVUFBTSxPQUFPLE1BQU0sZ0JBQWdCLElBQUk7QUFRdkMsUUFBSTtBQUNKLFVBQU0sa0JBQWtCLGtEQUFtQixJQUFJO0FBQy9DLFFBQUksaUJBQWlCO0FBQ25CLG9CQUFjO0FBQUEsSUFDaEIsT0FBTztBQUNMLFVBQUksS0FDRiw2RUFDRjtBQUNBLG9CQUFjO0FBQUEsSUFDaEI7QUFFQSxVQUFNLFVBQVU7QUFBQSxNQUNkO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUztBQUFBLE1BQ1Q7QUFBQSxNQUNBLE1BQU07QUFBQSxRQUNKLE1BQU0sS0FBSztBQUFBLFFBQ1g7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBLFVBQVUsTUFBTSxPQUFPLGdCQUNyQixJQUFJLEtBQUssQ0FBQyxJQUFJLEdBQUc7QUFBQSxVQUNmLE1BQU07QUFBQSxRQUNSLENBQUMsQ0FDSDtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBRUEsU0FBSyxzQkFBc0I7QUFBQSxNQUN6QixNQUFNO0FBQUEsTUFDTixhQUFhLENBQUM7QUFBQSxNQUNkO0FBQUEsSUFDRixDQUFDO0FBQ0QsV0FBTyxhQUFhLFNBQVMsV0FBVyxRQUFRLFNBQVM7QUFBQSxFQUMzRDtBQUFBLFFBRU0sNkJBQTZCLFNBR2pCO0FBQ2hCLFVBQU0sRUFBRSxXQUFXLGlCQUFpQixJQUFJLGNBQWM7QUFDdEQsVUFBTSxVQUFVLE1BQU0sZUFBZSxTQUFTO0FBQzlDLFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxJQUFJLE1BQU0sb0RBQW9EO0FBQUEsSUFDdEU7QUFDQSxVQUFNLGVBQWUsT0FBTyxrQkFBa0IsU0FBUyxXQUFXLE9BQU87QUFFekUsVUFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixRQUFJLFlBQVksa0JBQWtCLGFBQWE7QUFDN0MsWUFBTSxJQUFJLE1BQU0sc0RBQXNEO0FBQUEsSUFDeEU7QUFFQSxpQkFBYSxJQUFJO0FBQUEsTUFDZiw4QkFBOEIsZ0NBQzVCLEtBQUssNEJBQTRCLEdBQ2pDLDZCQUFPLEtBQUssQ0FDZDtBQUFBLElBQ0YsQ0FBQztBQUVELFFBQUk7QUFDRixZQUFNLFVBQW9DO0FBQUEsUUFDeEMsTUFBTSxxREFBeUIsS0FBSztBQUFBLFFBQ3BDLGdCQUFnQixLQUFLO0FBQUEsUUFDckI7QUFBQSxRQUNBLFlBQVksS0FBSyxjQUFjO0FBQUEsUUFDL0IsVUFBVSxLQUFLLElBQUksVUFBVTtBQUFBLFFBQzdCO0FBQUEsTUFDRjtBQUNBLFlBQU0saURBQXFCLElBQUksU0FBUyxPQUFNLGdCQUFlO0FBQzNELFlBQUksS0FDRixnREFBZ0QsS0FBSyxhQUFhLGFBQ2hFLFlBQVksSUFFaEI7QUFDQSxjQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksYUFBYSxZQUFZO0FBQUEsVUFDNUQ7QUFBQSxVQUNBLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLFFBQ3BFLENBQUM7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNILFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRixxRUFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBLFlBQU07QUFBQSxJQUNSO0FBRUEsVUFBTSxjQUFjLElBQUksMkJBQVk7QUFBQSxNQUNsQyxxQkFBcUI7QUFBQSxNQUNyQixpQkFBaUIsS0FBSyxJQUFJO0FBQUEsTUFDMUIsUUFBUSxPQUFPLHVCQUF1Qiw0QkFBNEI7QUFBQSxJQUNwRSxDQUFDO0FBQ0QsVUFBTSxPQUFPLE9BQU8sS0FBSyxrQkFBa0IsY0FBYyxXQUFXO0FBQUEsRUFDdEU7QUFBQSxRQUVNLHVCQUFzQztBQUMxQyxRQUFJLHdDQUFLLEtBQUssVUFBVSxHQUFHO0FBQ3pCO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQyxLQUFLLElBQUksZ0JBQWdCLEdBQUc7QUFDL0IsVUFBSSxNQUNGLHFFQUNBLEtBQUssYUFBYSxDQUNwQjtBQUNBO0FBQUEsSUFDRjtBQUVBLFFBQUk7QUFDRixZQUFNLGlEQUFxQixJQUFJO0FBQUEsUUFDN0IsTUFBTSxxREFBeUIsS0FBSztBQUFBLFFBQ3BDLGdCQUFnQixLQUFLO0FBQUEsUUFDckIsVUFBVSxLQUFLLElBQUksVUFBVTtBQUFBLE1BQy9CLENBQUM7QUFBQSxJQUNILFNBQVMsT0FBUDtBQUNBLFVBQUksTUFDRix1REFDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsUUFFTSxzQkFDSjtBQUFBLElBQ0U7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQVVGO0FBQUEsSUFDRTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQU9FLENBQUMsR0FDdUM7QUFDNUMsUUFBSSxLQUFLLHFCQUFxQixHQUFHO0FBQy9CO0FBQUEsSUFDRjtBQUVBLFVBQU0sTUFBTSxhQUFhLEtBQUssSUFBSTtBQUVsQyxRQUFJLEtBQ0YsbUNBQ0EsS0FBSyxhQUFhLEdBQ2xCLGtCQUNBLEdBQ0Y7QUFFQSxTQUFLLGtCQUFrQjtBQUV2QixVQUFNLGlDQUFpQyxPQUFPLE9BQU8sYUFBYSxVQUNoRSxpQ0FDRjtBQUVBLFVBQU0sS0FBSyx5QkFBeUI7QUFFcEMsVUFBTSxjQUFjLEtBQUssSUFBSSxhQUFhO0FBRTFDLFVBQU0sOEJBQThCLDBCQUFJLEtBQUssY0FBYyxHQUFHLGdCQUM1RCxPQUFPLHVCQUF1QixJQUFJLFVBQVUsQ0FDOUM7QUFDQSxVQUFNLHlCQUF5Qiw2QkFDN0IsNkJBQ0Esd0JBQ0Y7QUFDQSxVQUFNLDJCQUEyQiw2QkFDL0IsMEJBQUksd0JBQXdCLE9BQUssRUFBRSxFQUFFLEdBQ3JDLENBQUMsT0FBTyx1QkFBdUIsNEJBQTRCLENBQUMsQ0FDOUQ7QUFJQSxVQUFNLG9CQUFvQixXQUFXLFFBQVEsU0FBUyxDQUFDLElBQUk7QUFFM0QsUUFBSSxXQUFXLFFBQVEsUUFBUTtBQUM3QixrQkFBWSxRQUFRLGdCQUFjO0FBQ2hDLFlBQUksV0FBVyxNQUFNO0FBQ25CLCtCQUFxQixXQUFXLElBQUk7QUFBQSxRQUN0QztBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFHQSxVQUFNLGFBQWEsTUFBTSxxQkFBcUI7QUFBQSxNQUM1QyxJQUFJLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQUEsTUFDN0IsV0FBVztBQUFBLE1BQ1gsTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBLGdCQUFnQixLQUFLO0FBQUEsTUFDckI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsYUFBYTtBQUFBLE1BQ2IsU0FBUztBQUFBLE1BQ1QsYUFBYSxPQUFPLE9BQU8sS0FBSyx3QkFBd0I7QUFBQSxNQUN4RCxnQkFBZ0I7QUFBQSxNQUNoQjtBQUFBLE1BQ0EsWUFBWSxvQ0FBVztBQUFBLE1BQ3ZCLFlBQVksb0NBQVc7QUFBQSxNQUN2QjtBQUFBLE1BQ0EsWUFBWTtBQUFBLE1BQ1o7QUFBQSxNQUNBLDJCQUEyQixnQ0FDekIsMEJBQ0EsNkJBQU87QUFBQSxRQUNMLFFBQVEsbUNBQVc7QUFBQSxRQUNuQixXQUFXO0FBQUEsTUFDYixDQUFDLENBQ0g7QUFBQSxNQUNBO0FBQUEsSUFDRixDQUFDO0FBRUQsVUFBTSxRQUFRLElBQUksT0FBTyxRQUFRLFFBQVEsVUFBVTtBQUNuRCxVQUFNLFVBQVUsT0FBTyxrQkFBa0IsU0FBUyxNQUFNLElBQUksS0FBSztBQUNqRSxZQUFRLDRCQUE0QjtBQUNwQyxZQUFRLDRCQUE0QjtBQUNwQyxZQUFRLDBCQUEwQjtBQUNsQyxZQUFRLDRCQUE0QjtBQUVwQyxVQUFNLFVBQVUsS0FBSyxJQUFJO0FBRXpCLG9DQUNFLE9BQU8sUUFBUSxXQUFXLGNBQWMsVUFDeEMsc0JBQ0Y7QUFFQSxVQUFNLGlEQUFxQixJQUN6QjtBQUFBLE1BQ0UsTUFBTSxxREFBeUIsS0FBSztBQUFBLE1BQ3BDLGdCQUFnQixLQUFLO0FBQUEsTUFDckIsV0FBVyxRQUFRO0FBQUEsTUFDbkIsVUFBVSxLQUFLLElBQUksVUFBVTtBQUFBLElBQy9CLEdBQ0EsT0FBTSxnQkFBZTtBQUNuQixVQUFJLEtBQ0YseUNBQXlDLFFBQVEsY0FBYyxZQUFZLElBQzdFO0FBQ0EsWUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLFFBQVEsWUFBWTtBQUFBLFFBQ3ZEO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWCxTQUFTLE9BQU8sV0FBVyxRQUFRLEtBQUssZUFBZSxFQUFFLFNBQVM7QUFBQSxNQUNwRSxDQUFDO0FBQUEsSUFDSCxDQUNGO0FBRUEsVUFBTSxhQUFhLEtBQUssSUFBSSxJQUFJO0FBQ2hDLFFBQUksYUFBYSw2QkFBNkI7QUFDNUMsVUFBSSxLQUNGLHFCQUFxQixLQUFLLGFBQWEsaUJBQWlCLHNCQUN0QyxjQUNwQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLGNBQWMsS0FBSyxJQUFJO0FBRzdCLFVBQU0sS0FBSyx1QkFBdUI7QUFFbEMsU0FBSyxpQkFBaUI7QUFDdEIsa0NBQWMsTUFBTTtBQUNsQixVQUFJO0FBQ0YsY0FBTSxFQUFFLHVCQUF1QixPQUFPLGFBQWE7QUFDbkQsMkJBQW1CLEtBQUssRUFBRTtBQUUxQixjQUFNLHVCQUF1QixRQUMzQixrQ0FBa0MsQ0FBQyxLQUFLLElBQUksZ0JBQWdCLENBQzlEO0FBQ0EsYUFBSyxtQkFBbUIsT0FBTyxFQUFFLFlBQVksS0FBSyxDQUFDO0FBRW5ELGNBQU0sa0JBQWtCLGlCQUNwQixDQUFDLElBQ0Q7QUFBQSxVQUNFLE9BQU87QUFBQSxVQUNQLGdCQUFnQjtBQUFBLFVBQ2hCLGFBQWEsTUFBTSxvQkFBb0I7QUFBQSxVQUN2QyxtQkFBbUI7QUFBQSxRQUNyQjtBQUVKLGFBQUssSUFBSTtBQUFBLGFBQ0o7QUFBQSxhQUNDLHVCQUF1QixFQUFFLGdCQUFnQixLQUFLLElBQUksQ0FBQztBQUFBLGFBQ3BELEtBQUssMEJBQTBCLEVBQUUsS0FBSyxLQUFLLENBQUM7QUFBQSxVQUMvQyxXQUFXO0FBQUEsVUFDWCxXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsUUFDZCxDQUFDO0FBRUQsWUFBSSxzQkFBc0I7QUFDeEIsZUFBSyxjQUFjLHlCQUF5QjtBQUFBLFFBQzlDO0FBRUEsNEJBQW9CO0FBQUEsTUFDdEIsVUFBRTtBQUNBLGFBQUssaUJBQWlCO0FBQUEsTUFDeEI7QUFBQSxJQUNGLENBQUM7QUFFRCxRQUFJLFNBQVM7QUFDWCxZQUFNLHdCQUF3QixNQUFNLElBQUksUUFBUSxNQUFNO0FBQUEsSUFDeEQ7QUFFQSxVQUFNLGlCQUFpQixLQUFLLElBQUksSUFBSTtBQUVwQyxRQUFJLGlCQUFpQiw2QkFBNkI7QUFDaEQsVUFBSSxLQUNGLHFCQUFxQixLQUFLLGFBQWEsaUJBQWlCLDBCQUNsQyxrQkFDeEI7QUFBQSxJQUNGO0FBRUEsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUVyRCxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBS0EsZ0NBQXlDO0FBQ3ZDLFFBQUksd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQ3pDLGFBQU8sUUFBUSxLQUFLLElBQUksTUFBTSxDQUFDLEtBQUssS0FBSyxJQUFJLGdCQUFnQjtBQUFBLElBQy9EO0FBRUEsVUFBTSxVQUFVLEtBQUssSUFBSSxTQUFTO0FBQ2xDLFFBQUksQ0FBQyxTQUFTO0FBQ1osYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLE9BQU8sT0FBTyx1QkFBdUIsSUFBSSxPQUFPO0FBQ3RELFFBQUksQ0FBQyxNQUFNO0FBQ1QsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLFFBQ0wsd0NBQUssS0FBSyxVQUFVLEtBQUssS0FBSyxJQUFJLE1BQU0sS0FBSyxLQUFLLElBQUksZ0JBQWdCLENBQ3hFO0FBQUEsRUFDRjtBQUFBLFFBRU0sb0JBQW1DO0FBQ3ZDLFFBQUksQ0FBQyxLQUFLLElBQUk7QUFDWjtBQUFBLElBQ0Y7QUFFQSxVQUFNLG9CQUNKLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUNyRCxRQUFJLENBQUMsbUJBQW1CO0FBQ3RCLFlBQU0sSUFBSSxNQUFNLHNEQUFzRDtBQUFBLElBQ3hFO0FBRUEsVUFBTSxpQkFBaUIsS0FBSztBQUU1QixVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUN6RSxVQUFNLFFBQVEsTUFBTSxPQUFPLE9BQU8sS0FBSyw0QkFBNEI7QUFBQSxNQUNqRTtBQUFBLE1BQ0EsU0FBUywyQ0FBUSxLQUFLLFVBQVU7QUFBQSxNQUNoQztBQUFBLElBQ0YsQ0FBQztBQUdELFNBQUssU0FBUyxpQ0FBaUMsWUFDN0MsS0FBSyw4QkFBOEIsTUFBTSx3QkFBd0IsQ0FDbkU7QUFFQSxVQUFNLEVBQUUsU0FBUyxhQUFhO0FBQzlCLFFBQUk7QUFDSixRQUFJO0FBS0osUUFBSSxTQUFTO0FBQ1gsdUJBQWlCLE9BQU8sa0JBQWtCLFNBQVMsUUFBUSxJQUFJLE9BQU87QUFBQSxJQUN4RTtBQUVBLFFBQUksVUFBVTtBQUNaLHdCQUFrQixPQUFPLGtCQUFrQixTQUN6QyxTQUFTLElBQ1QsUUFDRjtBQUFBLElBQ0Y7QUFFQSxRQUNFLEtBQUssU0FBUyxLQUNkLEtBQUssSUFBSSxnQkFBZ0IsS0FDeEIsRUFBQyxrQkFFQSxlQUFlLElBQUksU0FBUyxJQUFJLEtBQUssSUFBSSxnQkFBZ0IsSUFDM0Q7QUFDQTtBQUFBLElBQ0Y7QUFFQSxVQUFNLG1CQUFtQixLQUFLLElBQUksV0FBVyxLQUFLO0FBQ2xELFVBQU0sWUFBWSxrQkFDZCxnQkFBZ0IsSUFBSSxTQUFTLEtBQzdCLGdCQUFnQixJQUFJLGFBQWEsS0FDakMsbUJBQ0E7QUFFSixTQUFLLElBQUk7QUFBQSxNQUNQLGFBQ0csa0JBQWlCLGVBQWUsb0JBQW9CLElBQUksT0FBTztBQUFBLE1BQ2xFLG1CQUNHLGtCQUNHLHlDQUFxQixlQUFlLFlBQVksaUJBQWlCLElBQ2pFLFNBQVM7QUFBQSxNQUNmO0FBQUEsTUFDQSwrQkFBK0IsaUJBQzNCLGVBQWUsSUFBSSxvQkFBb0IsSUFDdkM7QUFBQSxJQUNOLENBQUM7QUFFRCxXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsRUFDdkQ7QUFBQSxFQUVBLFlBQVksWUFBMkI7QUFDckMsVUFBTSxTQUFTLEtBQUssSUFBSSxZQUFZO0FBRXBDLFNBQUssSUFBSSxFQUFFLFdBQVcsQ0FBQztBQUN2QixXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBRXJELFVBQU0sUUFBUSxLQUFLLElBQUksWUFBWTtBQUVuQyxRQUFJLFFBQVEsTUFBTSxNQUFNLFFBQVEsS0FBSyxHQUFHO0FBQ3RDLFVBQUksT0FBTztBQUNULGFBQUssTUFBTTtBQUFBLE1BQ2I7QUFDQSxXQUFLLGNBQWMsWUFBWTtBQUFBLElBQ2pDO0FBQUEsRUFDRjtBQUFBLEVBRUEsZ0JBQWdCLGNBQTZCO0FBQzNDLFVBQU0sdUJBQXVCLEtBQUssSUFBSSxjQUFjO0FBRXBELFNBQUssSUFBSSxFQUFFLGFBQWEsQ0FBQztBQUN6QixXQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBRXJELFFBQUksUUFBUSxvQkFBb0IsTUFBTSxRQUFRLFlBQVksR0FBRztBQUMzRCxXQUFLLGNBQWMsY0FBYztBQUFBLElBQ25DO0FBQUEsRUFDRjtBQUFBLFFBRU0sbUJBQWtDO0FBQ3RDLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLDBCQUEwQixNQUFNLFNBQ3BDLE9BQU8sT0FBTyxPQUFPLGdDQUFnQyxDQUN2RDtBQUVBLFFBQUksS0FBSyxxQ0FBcUMsS0FBSyxhQUFhLENBQUM7QUFFakUsVUFBTSxLQUFLLGNBQWM7QUFBQSxNQUN2QixNQUFNO0FBQUEsTUFDTixtQkFBbUIsWUFDakIsT0FBTyxPQUFPLE9BQU8sOEJBQ25CLEtBQUssWUFDTCx1QkFDRjtBQUFBLElBQ0osQ0FBQztBQUVELFNBQUssSUFBSSxFQUFFLHdCQUF3QixDQUFDO0FBQUEsRUFDdEM7QUFBQSxRQUVNLGdCQUFnQixPQUErQjtBQUNuRCxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0I7QUFBQSxJQUNGO0FBRUEsVUFBTSwyQkFDSixTQUFTLENBQUMsS0FBSyxJQUFJLHlCQUF5QjtBQUM5QyxVQUFNLDBCQUNKLEtBQUssSUFBSSx5QkFBeUIsS0FDbEMsTUFBTSxTQUFTLE9BQU8sT0FBTyxPQUFPLGdDQUFnQyxDQUFDO0FBRXZFLFFBQUksS0FBSyxvQ0FBb0MsS0FBSyxhQUFhLEdBQUcsS0FBSztBQUV2RSxVQUFNLGNBQWMsOEJBQU0sY0FBYztBQUN4QyxVQUFNLG9CQUFvQixRQUN0QixZQUFZLE1BQ1osWUFBWTtBQUVoQixRQUFJLDBCQUEwQjtBQUM1QixZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixZQUNqQixPQUFPLE9BQU8sT0FBTyx3QkFDbkIsS0FBSyxZQUNMLHlCQUNBLGlCQUNGO0FBQUEsTUFDSixDQUFDO0FBQUEsSUFDSCxPQUFPO0FBQ0wsWUFBTSxLQUFLLGNBQWM7QUFBQSxRQUN2QixNQUFNO0FBQUEsUUFDTixtQkFBbUIsWUFDakIsT0FBTyxPQUFPLE9BQU8sMENBQ25CLEtBQUssWUFDTCxpQkFDRjtBQUFBLE1BQ0osQ0FBQztBQUFBLElBQ0g7QUFFQSxTQUFLLElBQUk7QUFBQSxNQUNQLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQSxZQUFZLEtBQUssSUFBSSxlQUFlLEdBQUcsY0FBYyxZQUFZO0FBQUEsUUFDakUsU0FBUyxLQUFLLElBQUksZUFBZSxHQUFHLFdBQVcsWUFBWTtBQUFBLE1BQzdEO0FBQUEsSUFDRixDQUFDO0FBRUQsUUFBSSwwQkFBMEI7QUFDNUIsV0FBSyxJQUFJLEVBQUUsd0JBQXdCLENBQUM7QUFBQSxJQUN0QztBQUFBLEVBQ0Y7QUFBQSxRQUVNLHFDQUFxQyxPQUErQjtBQUN4RSxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEdBQUc7QUFDL0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLDhCQUFNLGNBQWM7QUFFeEMsVUFBTSxvQkFBb0IsUUFDdEIsWUFBWSxnQkFDWixZQUFZO0FBRWhCLFVBQU0sS0FBSyxjQUFjO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLFlBQ2pCLE9BQU8sT0FBTyxPQUFPLDBDQUNuQixLQUFLLFlBQ0wsaUJBQ0Y7QUFBQSxJQUNKLENBQUM7QUFFRCxTQUFLLElBQUk7QUFBQSxNQUNQLGVBQWU7QUFBQSxRQUNiO0FBQUEsUUFDQSxZQUFZLEtBQUssSUFBSSxlQUFlLEdBQUcsY0FBYyxZQUFZO0FBQUEsUUFDakUsU0FBUyxLQUFLLElBQUksZUFBZSxHQUFHLFdBQVcsWUFBWTtBQUFBLE1BQzdEO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sOEJBQThCLE9BQThCO0FBQ2hFLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLEtBQUssY0FBYztBQUFBLE1BQ3ZCLE1BQU07QUFBQSxNQUNOLG1CQUFtQixZQUNqQixPQUFPLE9BQU8sT0FBTyxtQ0FDbkIsS0FBSyxZQUNMLEtBQ0Y7QUFBQSxJQUNKLENBQUM7QUFFRCxVQUFNLGNBQWMsOEJBQU0sY0FBYztBQUN4QyxTQUFLLElBQUk7QUFBQSxNQUNQLGVBQWU7QUFBQSxRQUNiLG1CQUNFLEtBQUssSUFBSSxlQUFlLEdBQUcscUJBQXFCLFlBQVk7QUFBQSxRQUM5RCxZQUFZO0FBQUEsUUFDWixTQUFTLEtBQUssSUFBSSxlQUFlLEdBQUcsV0FBVyxZQUFZO0FBQUEsTUFDN0Q7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFTSwyQkFBMkIsT0FBOEI7QUFDN0QsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CO0FBQUEsSUFDRjtBQUVBLFVBQU0sS0FBSyxjQUFjO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLFlBQ2pCLE9BQU8sT0FBTyxPQUFPLGdDQUNuQixLQUFLLFlBQ0wsS0FDRjtBQUFBLElBQ0osQ0FBQztBQUVELFVBQU0sY0FBYyw4QkFBTSxjQUFjO0FBQ3hDLFNBQUssSUFBSTtBQUFBLE1BQ1AsZUFBZTtBQUFBLFFBQ2IsbUJBQ0UsS0FBSyxJQUFJLGVBQWUsR0FBRyxxQkFBcUIsWUFBWTtBQUFBLFFBQzlELFlBQVksS0FBSyxJQUFJLGVBQWUsR0FBRyxjQUFjLFlBQVk7QUFBQSxRQUNqRSxTQUFTO0FBQUEsTUFDWDtBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVNLHdCQUF3QixPQUErQjtBQUMzRCxRQUFJLENBQUMsNkNBQVUsS0FBSyxVQUFVLEtBQUssQ0FBQyxLQUFLLHVCQUF1QixHQUFHO0FBQ2pFO0FBQUEsSUFDRjtBQUVBLFVBQU0sS0FBSyxjQUFjO0FBQUEsTUFDdkIsTUFBTTtBQUFBLE1BQ04sbUJBQW1CLFlBQ2pCLE9BQU8sT0FBTyxPQUFPLDZCQUNuQixLQUFLLFlBQ0wsS0FDRjtBQUFBLElBQ0osQ0FBQztBQUVELFNBQUssSUFBSSxFQUFFLG1CQUFtQixNQUFNLENBQUM7QUFBQSxFQUN2QztBQUFBLFFBRU0sc0JBQ0oscUJBQ0E7QUFBQSxJQUNFO0FBQUEsSUFDQTtBQUFBLElBQ0EsZUFBZSxLQUFLLElBQUk7QUFBQSxJQUN4QixRQUFRO0FBQUEsSUFDUixRQUFRO0FBQUEsSUFDUixXQUFXO0FBQUEsSUFDWCxnQkFBZ0I7QUFBQSxJQUNoQixrQkFBa0I7QUFBQSxLQVcyQjtBQUMvQyxVQUFNLGVBQWUsa0JBQWtCLG1CQUFtQjtBQUUxRCxRQUFJLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQzlCLFVBQUksY0FBYztBQUNoQixjQUFNLElBQUksTUFDUixnRUFDRjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLEtBQUssY0FBYztBQUFBLFFBQ3ZCLE1BQU07QUFBQSxRQUNOLG1CQUFtQixNQUNqQixLQUFLLCtCQUErQixtQkFBbUI7QUFBQSxNQUMzRCxDQUFDO0FBQ0QsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLENBQUMsZ0JBQWdCLEtBQUsscUJBQXFCLEdBQUc7QUFDaEQsWUFBTSxJQUFJLE1BQ1IsOEVBQ0Y7QUFBQSxJQUNGO0FBRUEsUUFBSSxjQUFrQztBQUN0QyxRQUFJLFNBQVM7QUFDYixRQUFJLEtBQUssSUFBSSxNQUFNLEdBQUc7QUFDcEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxRQUFJLENBQUMsYUFBYTtBQUNoQixvQkFBYztBQUFBLElBQ2hCO0FBQ0EsUUFDRSxLQUFLLElBQUksYUFBYSxNQUFNLGVBQzNCLENBQUMsZUFBZSxDQUFDLEtBQUssSUFBSSxhQUFhLEdBQ3hDO0FBQ0EsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLFFBQ0oseUJBQXlCLEtBQUssYUFBYSxNQUN4QyxlQUFlLHNCQUNSLFVBQVUsY0FBYztBQUVwQyxRQUFJLEtBQUssR0FBRyxpQkFBaUI7QUFHN0IsUUFBSSxDQUFDLGNBQWM7QUFDakIsVUFBSTtBQUNGLGNBQU0saURBQXFCLElBQUk7QUFBQSxVQUM3QixNQUFNLHFEQUF5QixLQUFLO0FBQUEsVUFDcEMsZ0JBQWdCLEtBQUs7QUFBQSxVQUNyQjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsU0FBUyxPQUFQO0FBQ0EsWUFBSSxNQUNGLEdBQUcsa0RBQ0gsT0FBTyxZQUFZLEtBQUssQ0FDMUI7QUFDQSxjQUFNO0FBQUEsTUFDUjtBQUFBLElBQ0Y7QUFFQSxhQUFTLFVBQVUsT0FBTyx1QkFBdUIscUJBQXFCO0FBRXRFLFNBQUssSUFBSSxFQUFFLFlBQVksQ0FBQztBQUl4QixVQUFNLEtBQUssMEJBQTBCO0FBRXJDLFdBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFJckQsVUFBTSxTQUFVLG1CQUFrQixnQkFBZ0I7QUFFbEQsVUFBTSxRQUFRLElBQUksT0FBTyxRQUFRLFFBQVE7QUFBQSxNQUN2QyxnQkFBZ0IsS0FBSztBQUFBLE1BQ3JCLHVCQUF1QjtBQUFBLFFBQ3JCO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUFBLE1BQ0EsT0FBTyw4QkFBTSxZQUFZLE1BQU07QUFBQSxNQUMvQixZQUFZLGdCQUFnQixvQ0FBVyxPQUFPLG9DQUFXO0FBQUEsTUFDekQsZ0JBQWdCO0FBQUEsTUFDaEIsYUFBYSxjQUFjLE9BQU8sT0FBTyxLQUFLLHdCQUF3QjtBQUFBLE1BQ3RFLFlBQVksZ0JBQWdCLG9DQUFXLE9BQU8sb0NBQVc7QUFBQSxNQUN6RCxTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFFUixDQUFxQztBQUVyQyxVQUFNLEtBQUssTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE1BQU0sWUFBWTtBQUFBLE1BQ2hFLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFFRCxVQUFNLElBQUksRUFBRSxHQUFHLENBQUM7QUFFaEIsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFNBQVMsSUFBSSxLQUFLO0FBRTNELFNBQUssaUJBQWlCLE9BQU87QUFDN0IsU0FBSyxhQUFhO0FBRWxCLFFBQUksS0FDRixHQUFHLDJDQUEyQyxNQUFNLElBQUksYUFBYSxHQUN2RTtBQUVBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSxlQUF3QjtBQUN0QixXQUFPLENBQUMsS0FBSyxJQUFJLE1BQU07QUFBQSxFQUN6QjtBQUFBLFFBR00sYUFBNEI7QUFDaEMsVUFBTSxFQUFFLGNBQWMsT0FBTztBQUM3QixRQUFJLENBQUMsV0FBVztBQUNkLFlBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUFBLElBQ25FO0FBRUEsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLFlBQU0sSUFBSSxNQUNSLHFCQUFxQixLQUFLLGFBQWEsbUJBQ3pDO0FBQUEsSUFDRjtBQUVBLFVBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsVUFBTSxVQUFVLEtBQUssSUFBSSxTQUFTO0FBRWxDLFFBQUksQ0FBQyxTQUFTO0FBQ1osWUFBTSxJQUFJLE1BQU0sY0FBYyxLQUFLLGFBQWEsZ0JBQWdCO0FBQUEsSUFDbEU7QUFFQSxVQUFNLG1CQUFtQixLQUFLLGNBQWM7QUFDNUMsU0FBSyxJQUFJLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFDdkIsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUVyRCxVQUFNLFFBQVEsSUFBSSxPQUFPLFFBQVEsUUFBUTtBQUFBLE1BQ3ZDLGdCQUFnQixLQUFLO0FBQUEsTUFDckIsY0FBYyxFQUFFLE1BQU0sTUFBTTtBQUFBLE1BQzVCLFlBQVksb0NBQVc7QUFBQSxNQUN2QixnQkFBZ0I7QUFBQSxNQUNoQixhQUFhLE9BQU8sT0FBTyxLQUFLLHdCQUF3QjtBQUFBLE1BQ3hELFlBQVksb0NBQVc7QUFBQSxNQUN2QixTQUFTO0FBQUEsTUFDVCxNQUFNO0FBQUEsSUFFUixDQUFxQztBQUVyQyxVQUFNLEtBQUssTUFBTSxPQUFPLE9BQU8sS0FBSyxZQUFZLE1BQU0sWUFBWTtBQUFBLE1BQ2hFLFNBQVMsT0FBTyxXQUFXLFFBQVEsS0FBSyxlQUFlLEVBQUUsU0FBUztBQUFBLElBQ3BFLENBQUM7QUFDRCxVQUFNLElBQUksRUFBRSxHQUFHLENBQUM7QUFFaEIsVUFBTSxVQUFVLE9BQU8sa0JBQWtCLFNBQVMsTUFBTSxJQUFJLEtBQUs7QUFDakUsU0FBSyxpQkFBaUIsT0FBTztBQUU3QixVQUFNLFVBQVUsTUFBTSwwQ0FBZSxLQUFLLFVBQVU7QUFDcEQsWUFBUSxLQUNOLGdEQUNFLFVBQVUsV0FBVyxTQUFTLGtCQUFrQixPQUFPLEdBQ3ZELEVBQUUsWUFBWSxDQUFDLEdBQUcsVUFBVSxvQkFBb0IsQ0FDbEQsQ0FDRjtBQUFBLEVBQ0Y7QUFBQSxRQUVNLFNBQ0osZ0JBQ0EsVUFJSTtBQUFBLElBQ0Ysa0JBQWtCO0FBQUEsRUFDcEIsR0FDZTtBQUNmLFVBQU0sc0RBQXFCLEtBQUssWUFBWSxnQkFBZ0IsT0FBTztBQUNuRSxVQUFNLEtBQUssYUFBYTtBQUFBLEVBQzFCO0FBQUEsUUFFTSxlQUE4QjtBQUNsQyxVQUFNLGNBQWMsTUFBTSxPQUFPLE9BQU8sS0FBSyw4QkFDM0MsS0FBSyxJQUNMO0FBQUEsTUFDRSxTQUFTO0FBQUEsTUFDVCxTQUFTLDJDQUFRLEtBQUssVUFBVTtBQUFBLElBQ2xDLENBQ0Y7QUFFQSxVQUFNLGtCQUFrQixLQUFLLElBQUksYUFBYTtBQUM5QyxRQUFJLG9CQUFvQixhQUFhO0FBQ25DLFdBQUssSUFBSSxFQUFFLFlBQVksQ0FBQztBQUN4QixhQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsSUFDdkQ7QUFBQSxFQUNGO0FBQUEsUUFJTSxxQkFBb0M7QUFDeEMsUUFBSSxDQUFDLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUMxQztBQUFBLElBQ0Y7QUFDQSxRQUFJLHdDQUFLLEtBQUssVUFBVSxHQUFHO0FBQ3pCO0FBQUEsSUFDRjtBQUVBLFVBQU0sVUFBVSxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWU7QUFDOUQsVUFBTSxZQUFZLEtBQUssUUFBUTtBQUMvQixRQUFJLENBQUMsV0FBVztBQUNkO0FBQUEsSUFDRjtBQUVBLFVBQU0sWUFDSixNQUFNLE9BQU8sdUJBQXVCLDBCQUEwQixPQUFPO0FBQ3ZFLFVBQU0sZUFBZSxVQUNsQixPQUNDLE9BQ0UsRUFBRSxVQUFVLFFBQVEsU0FBUyxDQUFDLEtBQUssRUFBRSxVQUFVLFVBQVUsU0FBUyxDQUFDLENBQ3ZFLEVBQ0MsS0FDQyxDQUFDLE1BQU0sVUFDSixPQUFNLElBQUksV0FBVyxLQUFLLEtBQU0sTUFBSyxJQUFJLFdBQVcsS0FBSyxFQUM5RDtBQUVGLFVBQU0sbUJBQW1CLGFBQWEsSUFBSSxrQkFDeEMsYUFBYSxTQUFTLENBQ3hCO0FBRUEsU0FBSyxJQUFJLEVBQUUsaUJBQWlCLENBQUM7QUFBQSxFQUMvQjtBQUFBLEVBRUEscUJBQTJCO0FBQ3pCLFFBQUksd0RBQXFCLEtBQUssVUFBVSxHQUFHO0FBQ3pDLFdBQUssWUFBWTtBQUFBLElBQ25CO0FBQUEsRUFDRjtBQUFBLFFBRU0sY0FBNkI7QUFFakMsVUFBTSxnQkFDSixLQUFLLFdBQVc7QUFFbEIsVUFBTSxRQUFRLElBQUksdUJBQU87QUFBQSxNQUN2QixhQUFhO0FBQUEsSUFDZixDQUFDO0FBR0QsVUFBTSxVQUFXLGFBQVk7QUFDM0IsWUFBTSxNQUFNLE9BQ1YsY0FBYyxJQUNaLGtCQUFnQixNQUNkLGtDQUFXLGFBQWEsSUFBSSxNQUFNLEdBQUcsYUFBYSxJQUFJLE1BQU0sQ0FBQyxDQUNqRSxDQUNGO0FBQUEsSUFDRixHQUFHO0FBRUgsU0FBSyxzQkFBc0I7QUFDM0IsUUFBSTtBQUNGLFlBQU07QUFBQSxJQUNSLFVBQUU7QUFDQSxVQUFJLEtBQUssd0JBQXdCLFNBQVM7QUFDeEMsYUFBSyxzQkFBc0I7QUFBQSxNQUM3QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSx3QkFBbUQ7QUFDakQsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUFBLFFBRU0sd0JBQ0osZUFDQSxlQUNlO0FBQ2YsUUFBSSxDQUFDLGVBQWU7QUFDbEI7QUFBQSxJQUNGO0FBR0EsVUFBTSxFQUFFLE9BQU8sV0FBVyxzQ0FBbUIsZUFBZSxhQUFhO0FBR3pFLFVBQU0sY0FBYyxRQUFRLE1BQU0sU0FBUyxLQUFLLElBQUk7QUFDcEQsVUFBTSxvQkFBb0IsU0FBUyxNQUFNLFNBQVMsTUFBTSxJQUFJO0FBRzVELFVBQU0sVUFBVSxLQUFLLGVBQWU7QUFDcEMsVUFBTSxrQkFBa0IsUUFBUSxPQUFPO0FBQ3ZDLFNBQUssSUFBSSxFQUFFLGFBQWEsa0JBQWtCLENBQUM7QUFFM0MsVUFBTSxVQUFVLEtBQUssZUFBZTtBQUtwQyxVQUFNLGNBQWMsWUFBWTtBQUVoQyxRQUFJLENBQUMsd0NBQUssS0FBSyxVQUFVLEtBQUssbUJBQW1CLGFBQWE7QUFDNUQsWUFBTSxTQUFTO0FBQUEsUUFDYixNQUFNO0FBQUEsUUFDTjtBQUFBLFFBQ0E7QUFBQSxNQUNGO0FBRUEsWUFBTSxLQUFLLGlCQUFpQixNQUFNO0FBQUEsSUFDcEM7QUFBQSxFQUNGO0FBQUEsUUFFTSxpQkFDSixZQUNBLGVBQ2U7QUFDZixRQUFJLHdDQUFLLEtBQUssVUFBVSxHQUFHO0FBQ3pCLFVBQUksWUFBWTtBQUNkLGVBQU8sUUFBUSxJQUFJLGFBQWEsVUFBVTtBQUFBLE1BQzVDLE9BQU87QUFDTCxlQUFPLFFBQVEsT0FBTyxXQUFXO0FBQUEsTUFDbkM7QUFBQSxJQUNGO0FBRUEsUUFBSSxDQUFDLFlBQVk7QUFDZixXQUFLLElBQUksRUFBRSxlQUFlLE9BQVUsQ0FBQztBQUNyQztBQUFBLElBQ0Y7QUFFQSxVQUFNLEVBQUUsY0FBYyxPQUFPO0FBQzdCLFFBQUksQ0FBQyxXQUFXO0FBQ2QsWUFBTSxJQUFJLE1BQU0scURBQXFEO0FBQUEsSUFDdkU7QUFDQSxVQUFNLFNBQVMsTUFBTSxVQUFVLFVBQVUsVUFBVTtBQUduRCxVQUFNLFlBQVksa0NBQWUsUUFBUSxhQUFhO0FBR3RELFFBQUksV0FBVztBQUNiLFlBQU0sZ0JBQWdCLE1BQU0sYUFBYSx5QkFDdkMsS0FBSyxZQUNMLFdBQ0E7QUFBQSxRQUNFO0FBQUEsUUFDQTtBQUFBLFFBQ0E7QUFBQSxNQUNGLENBQ0Y7QUFDQSxXQUFLLElBQUksYUFBYTtBQUFBLElBQ3hCO0FBQUEsRUFDRjtBQUFBLFFBRU0sY0FDSixZQUNBLEVBQUUsd0JBQXdCLFVBQVUsQ0FBQyxHQUNuQjtBQUVsQixRQUFJLEtBQUssSUFBSSxZQUFZLE1BQU0sWUFBWTtBQUN6QyxVQUFJLEtBQ0Ysb0RBQW9ELEtBQUssYUFBYSxHQUN4RTtBQUNBLFdBQUssSUFBSTtBQUFBLFFBQ1Asc0JBQXNCO0FBQUEsUUFDdEIsV0FBVztBQUFBLFFBQ1gsY0FBYyxrQ0FBYztBQUFBLE1BQzlCLENBQUM7QUFHRCxXQUFLLElBQUksRUFBRSxXQUFXLEdBQUcsRUFBRSxRQUFRLHNCQUFzQixDQUFDO0FBSzFELFVBQUksQ0FBQyx5QkFBeUIsWUFBWTtBQUN4QyxhQUFLLGNBQWMsWUFBWTtBQUFBLE1BQ2pDO0FBRUEsV0FBSyx3QkFBd0I7QUFHN0IsVUFBSSxDQUFDLHVCQUF1QjtBQUMxQixlQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsTUFDdkQ7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUNBLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFFQSwwQkFBZ0M7QUFDOUIsVUFBTSxhQUFhLEtBQUssSUFBSSxZQUFZO0FBQ3hDLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBQ0EsUUFBSSxLQUFLLElBQUksV0FBVyxHQUFHO0FBQ3pCO0FBQUEsSUFDRjtBQUVBLFVBQU0sbUJBQW1CLE1BQU0sV0FBVyxVQUFVO0FBQ3BELFVBQU0sa0JBQWtCLG1DQUFnQixnQkFBZ0I7QUFDeEQsVUFBTSxZQUFZLE1BQU0sU0FBUyxlQUFlO0FBQ2hELFNBQUssSUFBSSxFQUFFLFVBQVUsQ0FBQztBQUFBLEVBQ3hCO0FBQUEsRUFFQSwwQkFBOEM7QUFDNUMsVUFBTSxhQUFhLEtBQUssSUFBSSxZQUFZO0FBQ3hDLFFBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLEtBQUssSUFBSSxNQUFNO0FBQzVCLFFBQUksQ0FBQyxNQUFNO0FBQ1Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLEtBQUssSUFBSSxhQUFhO0FBQzFDLFFBQUksYUFBYSxlQUFlLFlBQVk7QUFDMUMsYUFBTyxZQUFZO0FBQUEsSUFDckI7QUFFQSxVQUFNLG9CQUFvQixLQUFLLFFBQVEsd0JBQ3JDLFlBQ0EsSUFDRjtBQUNBLFFBQUksQ0FBQyxtQkFBbUI7QUFDdEIsVUFBSSxLQUNGLHNGQUVGO0FBQ0EsV0FBSyxjQUFjLE1BQVM7QUFDNUI7QUFBQSxJQUNGO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxRQUVNLGtCQUNKLFVBQ0EsRUFBRSxZQUFZLHFCQUNDO0FBQ2YsVUFBTSxjQUFjLEtBQUssSUFBSSxhQUFhO0FBRzFDLFFBQUksZ0JBQWdCLFVBQVU7QUFDNUI7QUFBQSxJQUNGO0FBRUEsUUFDRSxhQUFhLGVBQWUsY0FDNUIsYUFBYSxzQkFBc0IsbUJBQ25DO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUNGLHFEQUNBLEtBQUssYUFBYSxDQUNwQjtBQUVBLFNBQUssSUFBSSxFQUFFLGFBQWEsRUFBRSxZQUFZLGtCQUFrQixFQUFFLENBQUM7QUFFM0QsVUFBTSxPQUFPLE9BQU8sS0FBSyxtQkFBbUIsS0FBSyxVQUFVO0FBQUEsRUFDN0Q7QUFBQSxRQUVNLGtCQUNKLFVBQ2U7QUFFZixRQUFJLEtBQUssSUFBSSxhQUFhLE1BQU0sVUFBVTtBQUN4QztBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQ0YsbURBQ0EsS0FBSyxhQUFhLENBQ3BCO0FBRUEsU0FBSyxJQUFJO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFJYixPQUFPO0FBQUEsTUFDUCxZQUFZO0FBQUEsTUFDWixlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUVELFVBQU0sT0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQzdEO0FBQUEsRUFFQSxVQUFVLFlBQTZCO0FBQ3JDLFVBQU0sS0FBSyxPQUFPLHVCQUF1QixrQkFBa0IsVUFBVTtBQUNyRSxVQUFNLFlBQVksS0FBSyxhQUFhO0FBRXBDLFdBQU8sT0FBTyxFQUFFLFNBQVMsV0FBVyxFQUFFO0FBQUEsRUFDeEM7QUFBQSxFQUVBLGdCQUFzQjtBQUNwQixVQUFNLFVBQVUsS0FBSyxXQUFXO0FBR2hDLFNBQUssa0JBQW1CLE1BQU0sT0FBTztBQUFBLEVBQ3ZDO0FBQUEsUUFFTSxrQkFBaUM7QUFDckMsU0FBSyxJQUFJO0FBQUEsTUFDUCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxXQUFXO0FBQUEsTUFDWCx1QkFBdUI7QUFBQSxJQUN6QixDQUFDO0FBQ0QsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUVyRCxVQUFNLE9BQU8sT0FBTyxLQUFLLGdDQUFnQyxLQUFLLElBQUk7QUFBQSxNQUNoRSxPQUFPLEtBQUssYUFBYTtBQUFBLElBQzNCLENBQUM7QUFBQSxFQUNIO0FBQUEsRUFFQSxXQUFtQjtBQUNqQixRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxZQUFNLFdBQVcsS0FBSyxJQUFJLFVBQVU7QUFFcEMsYUFDRSxLQUFLLElBQUksTUFBTSxLQUNmLEtBQUssZUFBZSxLQUNwQixLQUFLLFVBQVUsS0FDZCxZQUFZLE9BQU8sS0FBSyxlQUFlLEVBQUUsU0FBUyxDQUFDLEtBQ3BELE9BQU8sS0FBSyxnQkFBZ0I7QUFBQSxJQUVoQztBQUNBLFdBQU8sS0FBSyxJQUFJLE1BQU0sS0FBSyxPQUFPLEtBQUssY0FBYztBQUFBLEVBQ3ZEO0FBQUEsRUFFQSxpQkFBcUM7QUFDbkMsUUFBSSx3REFBcUIsS0FBSyxVQUFVLEdBQUc7QUFDekMsYUFBTyxLQUFLLGFBRVYsS0FBSyxJQUFJLGFBQWEsR0FDdEIsS0FBSyxJQUFJLG1CQUFtQixDQUM5QjtBQUFBLElBQ0Y7QUFFQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsWUFBb0I7QUFDbEIsUUFBSSxDQUFDLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUMxQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sU0FBUyxLQUFLLElBQUksTUFBTTtBQUM5QixRQUFJO0FBQ0YsWUFBTSxlQUFlLE9BQU8sdUJBQXVCLE1BQU0sTUFBTTtBQUMvRCxZQUFNLGFBQWEsc0RBQXVCLE1BQU07QUFDaEQsVUFBSSxlQUFlLE9BQU8sUUFBUSxJQUFJLFlBQVksR0FBRztBQUNuRCxlQUFPLE9BQU8sdUJBQXVCLE9BQ25DLGNBQ0EsT0FBTyxxQkFBcUIsUUFDOUI7QUFBQSxNQUNGO0FBQ0EsYUFBTyxPQUFPLHVCQUF1QixPQUNuQyxjQUNBLE9BQU8scUJBQXFCLGFBQzlCO0FBQUEsSUFDRixTQUFTLEdBQVA7QUFDQSxhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFdBQTRCO0FBQzFCLFdBQU8sc0NBQWEsS0FBSyxJQUFJLE9BQU8sQ0FBQztBQUFBLEVBQ3ZDO0FBQUEsRUFFQSx1QkFBMEQ7QUFDeEQsV0FBTyxLQUFLLElBQUksbUJBQW1CO0FBQUEsRUFDckM7QUFBQSxFQUVBLHFCQUdFO0FBQ0EsUUFBSSxLQUFLLHFCQUFxQixNQUFNLFVBQVU7QUFDNUMsYUFBTztBQUFBLFFBQ0wsYUFBYTtBQUFBLFFBQ2IsZUFBZTtBQUFBLE1BQ2pCO0FBQUEsSUFDRjtBQUVBLFdBQU87QUFBQSxNQUNMLGFBQWEsS0FBSyxJQUFJLGFBQWE7QUFBQSxNQUNuQyxlQUFlLEtBQUssSUFBSSxlQUFlO0FBQUEsSUFDekM7QUFBQSxFQUNGO0FBQUEsRUFFUSxnQkFBb0M7QUFDMUMsVUFBTSwwQkFDSix3Q0FBSyxLQUFLLFVBQVUsS0FDcEIsT0FBTyxRQUFRLElBQUksc0JBQXNCLE1BQU07QUFDakQsVUFBTSxTQUFTLDBCQUNYLEtBQUssSUFBSSxlQUFlLEtBQUssS0FBSyxJQUFJLFFBQVEsSUFDOUMsS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksZUFBZTtBQUNsRCxXQUFPLFFBQVEsUUFBUTtBQUFBLEVBQ3pCO0FBQUEsRUFFUSxnQkFBb0M7QUFDMUMsVUFBTSxTQUFTLHdDQUFLLEtBQUssVUFBVSxJQUMvQixLQUFLLElBQUksZUFBZSxLQUFLLEtBQUssSUFBSSxRQUFRLElBQzlDLEtBQUssSUFBSSxRQUFRLEtBQUssS0FBSyxJQUFJLGVBQWU7QUFDbEQsV0FBTyxRQUFRLFFBQVE7QUFBQSxFQUN6QjtBQUFBLEVBRUEsd0JBQTRDO0FBQzFDLFVBQU0sYUFBYSxLQUFLLGNBQWM7QUFDdEMsV0FBTyxhQUFhLDBCQUEwQixVQUFVLElBQUk7QUFBQSxFQUM5RDtBQUFBLEVBRUEsK0JBQW1EO0FBQ2pELFVBQU0sYUFBYSxLQUFLLElBQUksZUFBZSxHQUFHO0FBQzlDLFdBQU8sYUFBYSwwQkFBMEIsVUFBVSxJQUFJO0FBQUEsRUFDOUQ7QUFBQSxFQUVBLGlDQUFxRDtBQUNuRCxVQUFNLHNCQUFzQixLQUFLLElBQUkscUJBQXFCO0FBQzFELFdBQU8sc0JBQ0gsMEJBQTBCLG1CQUFtQixJQUM3QztBQUFBLEVBQ047QUFBQSxFQUVBLGVBQXFCO0FBQ25CLFVBQU0sYUFBYSxLQUFLLGNBQWM7QUFDdEMsUUFBSSxZQUFZO0FBQ2QsV0FBSyxJQUFJLHVCQUF1QixVQUFVO0FBQUEsSUFDNUMsT0FBTztBQUNMLFdBQUssTUFBTSxxQkFBcUI7QUFBQSxJQUNsQztBQUFBLEVBQ0Y7QUFBQSxFQUVRLGlCQUEwQjtBQUNoQyxRQUFJLHdEQUFxQixLQUFLLFVBQVUsR0FBRztBQUN6QyxhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksS0FBSyxxQkFBcUIsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFFBQUksQ0FBQyw2Q0FBVSxLQUFLLFVBQVUsR0FBRztBQUMvQixhQUFPO0FBQUEsSUFDVDtBQUVBLFVBQU0sb0JBQW9CLDhCQUFNLGNBQWM7QUFDOUMsVUFBTSxnQkFBZ0IsS0FBSyxJQUFJLGVBQWU7QUFDOUMsVUFBTSx1QkFDSixpQkFDQyxlQUFjLGVBQWUsa0JBQWtCLE9BQzlDLGNBQWMsZUFBZSxrQkFBa0I7QUFDbkQsUUFBSSxzQkFBc0I7QUFDeEIsYUFBTztBQUFBLElBQ1Q7QUFFQSxXQUFPLEtBQUssV0FBVztBQUFBLEVBQ3pCO0FBQUEsRUFFQSxtQkFBNEI7QUFDMUIsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsUUFBSSxLQUFLLElBQUksTUFBTSxHQUFHO0FBQ3BCLGFBQU87QUFBQSxJQUNUO0FBRUEsV0FDRSxLQUFLLFdBQVcsS0FDaEIsS0FBSyxJQUFJLGVBQWUsR0FBRyxlQUN6Qiw4QkFBTSxjQUFjLGVBQWU7QUFBQSxFQUV6QztBQUFBLEVBRUEsYUFBc0I7QUFDcEIsUUFBSSxDQUFDLDZDQUFVLEtBQUssVUFBVSxHQUFHO0FBQy9CLGFBQU87QUFBQSxJQUNUO0FBRUEsVUFBTSxhQUFhLDhCQUFNLE9BQU87QUFDaEMsVUFBTSxVQUFVLEtBQUssSUFBSSxXQUFXLEtBQUssQ0FBQztBQUMxQyxVQUFNLFVBQVUsT0FBTyxXQUFXLFFBQVEsS0FBSyxRQUFRLEdBQUcsU0FBUztBQUNuRSxVQUFNLEtBQUssUUFBUSxLQUFLLFVBQVEsS0FBSyxTQUFTLE9BQU87QUFDckQsUUFBSSxDQUFDLElBQUk7QUFDUCxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sR0FBRyxTQUFTLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBZUEsY0FBYyxZQUEwQjtBQUN0QyxRQUFJLEtBQUssaUNBQWlDLFlBQVksS0FBSyxhQUFhLENBQUM7QUFDekUsU0FBSyxJQUFJLEVBQUUseUJBQXlCLEtBQUssQ0FBQztBQUUxQyxTQUFLLFNBQVMsaUJBQWlCLFlBQVk7QUFDekMsZUFBUyx3QkFBd0I7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsZUFBZSxFQUFFLHdCQUF3QixVQUFVLENBQUMsR0FBUztBQUMzRCxnRUFBd0IsS0FBSyxTQUFTO0FBQ3RDLFNBQUssWUFBWTtBQUVqQixVQUFNLGdCQUFnQixLQUFLLElBQUksZUFBZTtBQUM5QyxRQUFJLDRCQUFTLGFBQWEsS0FBSyxnQkFBZ0IsT0FBTyxrQkFBa0I7QUFDdEUsWUFBTSxRQUFRLGdCQUFnQixLQUFLLElBQUk7QUFDdkMsVUFBSSxTQUFTLEdBQUc7QUFDZCxhQUFLLGtCQUFrQixHQUFHLEVBQUUsc0JBQXNCLENBQUM7QUFDbkQ7QUFBQSxNQUNGO0FBRUEsV0FBSyxZQUFZLFdBQVcsTUFBTSxLQUFLLGtCQUFrQixDQUFDLEdBQUcsS0FBSztBQUFBLElBQ3BFO0FBQUEsRUFDRjtBQUFBLEVBRUEsb0JBQTBCO0FBQ3hCLFNBQUssSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLLElBQUksV0FBVyxFQUFFLENBQUM7QUFDOUMsU0FBSyxjQUFjLFdBQVc7QUFBQSxFQUNoQztBQUFBLEVBRUEsa0JBQ0UsZ0JBQWdCLEdBQ2hCLEVBQUUsd0JBQXdCLFVBQVUsQ0FBQyxHQUMvQjtBQUNOLFVBQU0saUJBQWlCLEtBQUssSUFBSSxlQUFlO0FBRS9DLFFBQUksbUJBQW1CLGVBQWU7QUFDcEM7QUFBQSxJQUNGO0FBRUEsU0FBSyxJQUFJLEVBQUUsY0FBYyxDQUFDO0FBRzFCLFNBQUssZUFBZSxFQUFFLHVCQUF1QixLQUFLLENBQUM7QUFFbkQsUUFBSSxDQUFDLHVCQUF1QjtBQUMxQixXQUFLLGNBQWMscUJBQXFCO0FBQ3hDLGFBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxJQUN2RDtBQUFBLEVBQ0Y7QUFBQSxFQUVBLFVBQW1CO0FBQ2pCLFdBQU8sb0RBQW9CLEtBQUssVUFBVTtBQUFBLEVBQzVDO0FBQUEsUUFFTSxPQUNKLFNBQ0EsVUFDZTtBQUdmLFFBQUksQ0FBQyx5Q0FBb0IsV0FBVztBQUNsQztBQUFBLElBQ0Y7QUFFQSxRQUFJLEtBQUssUUFBUSxHQUFHO0FBQ2xCLFVBQUksS0FBSyxJQUFJLDhCQUE4QixHQUFHO0FBQzVDO0FBQUEsTUFDRjtBQUVBLFlBQU0sVUFBVSxPQUFPLFdBQVcsUUFBUSxLQUFLLFFBQVEsR0FBRyxTQUFTO0FBQ25FLFlBQU0sYUFBYyxTQUFRLElBQUksWUFBWSxLQUFLLENBQUMsR0FBRyxLQUNuRCxXQUFTLE1BQU0sZUFBZSxNQUFNLGdCQUFnQixPQUN0RDtBQUNBLFVBQUksQ0FBQyxZQUFZO0FBQ2Y7QUFBQSxNQUNGO0FBQUEsSUFDRjtBQUVBLFFBQUksQ0FBQywrQkFBVyxRQUFRLFVBQVUsS0FBSyxDQUFDLFVBQVU7QUFDaEQ7QUFBQSxJQUNGO0FBRUEsVUFBTSxpQkFBaUIsS0FBSztBQUU1QixVQUFNLFNBQVMsV0FDWCxPQUFPLHVCQUF1QixJQUFJLFNBQVMsSUFBSSxRQUFRLENBQUMsSUFDeEQsK0JBQVcsUUFBUSxVQUFVO0FBQ2pDLFVBQU0sYUFBYSxTQUNmLE9BQU8sU0FBUyxJQUNoQixPQUFPLEtBQUssZ0JBQWdCO0FBQ2hDLFVBQU0sY0FBYyx3REFBcUIsS0FBSyxVQUFVLElBQ3BELGFBQ0EsT0FBTyxLQUFLLDZCQUE2QjtBQUFBLE1BQ3ZDLFFBQVE7QUFBQSxNQUNSLE9BQU8sS0FBSyxTQUFTO0FBQUEsSUFDdkIsQ0FBQztBQUVMLFFBQUk7QUFDSixVQUFNLFNBQVMsS0FBSyxJQUFJLFFBQVEsS0FBSyxLQUFLLElBQUksZUFBZTtBQUM3RCxRQUFJLFVBQVUsT0FBTyxNQUFNO0FBQ3pCLDRCQUFzQiwwQkFBMEIsT0FBTyxJQUFJO0FBQUEsSUFDN0QsV0FBVyx3REFBcUIsS0FBSyxVQUFVLEdBQUc7QUFDaEQsNEJBQXNCLE1BQU0sS0FBSyxhQUFhO0FBQUEsSUFDaEQsT0FBTztBQUdMLDRCQUFzQjtBQUFBLElBQ3hCO0FBRUEsVUFBTSxjQUFjLFFBQVEsT0FBTztBQUNuQyxVQUFNLFlBQVksUUFBUTtBQUMxQixVQUFNLG9CQUFvQixRQUFRLGNBQWMsV0FBVztBQUUzRCw2Q0FBb0IsSUFBSTtBQUFBLE1BQ3RCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxTQUFTLFFBQVEsb0JBQW9CO0FBQUEsTUFDckM7QUFBQSxNQUNBLFVBQVUsV0FBVyxTQUFTLE9BQU8sSUFBSTtBQUFBLElBQzNDLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFYyxlQUFnQztBQUM1QyxVQUFNLFFBQVEsS0FBSyxTQUFTO0FBQzVCLFVBQU0sUUFBUSxLQUFLLFNBQVM7QUFFNUIsVUFBTSxVQUFXLFNBQVMsb0NBQVksS0FBSyxLQUFNO0FBRWpELFVBQU0sU0FBUyxLQUFLO0FBQ3BCLFFBQUksVUFBVSxPQUFPLFlBQVksV0FBVyxPQUFPLFVBQVUsT0FBTztBQUNsRSxhQUFPLE9BQU87QUFBQSxJQUNoQjtBQUVBLFVBQU0sTUFBTSxNQUFNLDRDQUFnQixPQUFPLE9BQU87QUFFaEQsU0FBSyxrQkFBa0IsRUFBRSxTQUFTLE9BQU8sSUFBSTtBQUU3QyxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsYUFBYSxTQUtKO0FBQ1AsVUFBTSxFQUFFLFVBQVUsVUFBVSxRQUFRLGlCQUFpQjtBQUdyRCxRQUFJLFFBQVE7QUFDVjtBQUFBLElBQ0Y7QUFJQSxRQUFJLEtBQUssSUFBSSxtQkFBbUIsS0FBSyxDQUFDLEtBQUssUUFBUSxRQUFRLEdBQUc7QUFDNUQ7QUFBQSxJQUNGO0FBRUEsVUFBTSxjQUFjLEdBQUcsWUFBWTtBQUVuQyxTQUFLLHNCQUFzQixLQUFLLHVCQUF1QixDQUFDO0FBQ3hELFVBQU0sU0FBUyxLQUFLLG9CQUFvQjtBQUV4QyxRQUFJLFFBQVE7QUFDVixtQkFBYSxPQUFPLEtBQUs7QUFBQSxJQUMzQjtBQUVBLFFBQUksVUFBVTtBQUNaLFdBQUssb0JBQW9CLGVBQWUsS0FBSyxvQkFDM0MsZ0JBQ0c7QUFBQSxRQUNILFdBQVcsS0FBSyxJQUFJO0FBQUEsUUFDcEI7QUFBQSxRQUNBO0FBQUEsTUFDRjtBQUVBLFdBQUssb0JBQW9CLGFBQWEsUUFBUSxXQUM1QyxLQUFLLHdCQUF3QixLQUFLLE1BQU0sV0FBVyxHQUNuRCxLQUFLLEdBQ1A7QUFDQSxVQUFJLENBQUMsUUFBUTtBQUVYLGFBQUssUUFBUSxVQUFVLE1BQU0sRUFBRSxPQUFPLEtBQUssQ0FBQztBQUFBLE1BQzlDO0FBQUEsSUFDRixPQUFPO0FBQ0wsYUFBTyxLQUFLLG9CQUFvQjtBQUNoQyxVQUFJLFFBQVE7QUFFVixhQUFLLFFBQVEsVUFBVSxNQUFNLEVBQUUsT0FBTyxLQUFLLENBQUM7QUFBQSxNQUM5QztBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUEsRUFFQSx3QkFBd0IsYUFBMkI7QUFDakQsU0FBSyxzQkFBc0IsS0FBSyx1QkFBdUIsQ0FBQztBQUN4RCxVQUFNLFNBQVMsS0FBSyxvQkFBb0I7QUFFeEMsUUFBSSxRQUFRO0FBQ1YsbUJBQWEsT0FBTyxLQUFLO0FBQ3pCLGFBQU8sS0FBSyxvQkFBb0I7QUFHaEMsV0FBSyxRQUFRLFVBQVUsTUFBTSxFQUFFLE9BQU8sS0FBSyxDQUFDO0FBQUEsSUFDOUM7QUFBQSxFQUNGO0FBQUEsRUFFQSxNQUFZO0FBQ1YsUUFBSSxLQUFLLElBQUksVUFBVSxHQUFHO0FBQ3hCO0FBQUEsSUFDRjtBQUVBLFFBQUksS0FBSyxXQUFXLEtBQUssYUFBYSxDQUFDO0FBQ3ZDLFVBQU0sd0JBQXdCLElBQUksSUFDaEMsT0FBTyxRQUFRLElBQUkseUJBQXlCLElBQUksTUFBYyxDQUFDLENBQ2pFO0FBRUEsMEJBQXNCLElBQUksS0FBSyxFQUFFO0FBRWpDLFNBQUsseUJBQXlCLENBQUMsR0FBRyxxQkFBcUIsQ0FBQztBQUV4RCxTQUFLLElBQUksWUFBWSxJQUFJO0FBRXpCLFFBQUksS0FBSyxJQUFJLFlBQVksR0FBRztBQUMxQixXQUFLLElBQUksRUFBRSxZQUFZLE1BQU0sQ0FBQztBQUFBLElBQ2hDO0FBQ0EsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQ3ZEO0FBQUEsRUFFQSxRQUFjO0FBQ1osUUFBSSxDQUFDLEtBQUssSUFBSSxVQUFVLEdBQUc7QUFDekI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLGNBQWMsS0FBSyxhQUFhLENBQUM7QUFFMUMsVUFBTSx3QkFBd0IsSUFBSSxJQUNoQyxPQUFPLFFBQVEsSUFBSSx5QkFBeUIsSUFBSSxNQUFjLENBQUMsQ0FDakU7QUFFQSwwQkFBc0IsT0FBTyxLQUFLLEVBQUU7QUFFcEMsU0FBSyx5QkFBeUIsQ0FBQyxHQUFHLHFCQUFxQixDQUFDO0FBRXhELFNBQUssSUFBSSxZQUFZLEtBQUs7QUFDMUIsV0FBTyxPQUFPLEtBQUssbUJBQW1CLEtBQUssVUFBVTtBQUFBLEVBQ3ZEO0FBQUEsRUFFQSx5QkFBeUIsdUJBQTRDO0FBQ25FLFdBQU8sUUFBUSxJQUFJLHlCQUF5QixxQkFBcUI7QUFFakUsVUFBTSxPQUFPLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUNoRSxVQUFNLEtBQUssT0FBTyx1QkFBdUIsSUFBSSxJQUFJO0FBRWpELFFBQUksSUFBSTtBQUNOLFNBQUcsY0FBYyxLQUFLO0FBQUEsSUFDeEI7QUFBQSxFQUNGO0FBQUEsRUFFQSxnQ0FBZ0MsVUFBeUI7QUFDdkQsVUFBTSxnQkFBZ0IsUUFBUSxLQUFLLElBQUksOEJBQThCLENBQUM7QUFDdEUsUUFBSSxrQkFBa0IsVUFBVTtBQUM5QjtBQUFBLElBQ0Y7QUFFQSxTQUFLLElBQUksRUFBRSw4QkFBOEIsU0FBUyxDQUFDO0FBQ25ELFdBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFDckQsU0FBSyxjQUFjLDhCQUE4QjtBQUFBLEVBQ25EO0FBQUEsRUFFQSxxQ0FDRSxxQkFDTTtBQUNOLFNBQUssSUFBSSxtQ0FBbUMsbUJBQW1CO0FBQy9ELFdBQU8sT0FBTyxLQUFLLG1CQUFtQixLQUFLLFVBQVU7QUFBQSxFQUN2RDtBQUFBLEVBRUEsY0FBb0I7QUFDbEIsUUFBSSxLQUFLLGdCQUFnQixLQUFLLGFBQWEsY0FBYztBQUN6RCxXQUFPLHVCQUF1QixpQkFBaUIsS0FBSyxFQUFFO0FBQUEsRUFDeEQ7QUFBQSxFQUVBLGVBQWUsV0FBeUI7QUFDdEMsVUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixVQUFNLFFBQVEsTUFBTTtBQUVwQixRQUFJLEtBQUssZ0JBQWdCLEtBQUssYUFBYSxlQUFlLFNBQVM7QUFDbkUsV0FBTyxJQUFJLFlBQVkscUJBQXFCLEVBQUUsTUFBTSxDQUFDO0FBQUEsRUFDdkQ7QUFBQSxRQUVNLHdCQUF1QztBQUMzQyxRQUFJO0FBQ0YsWUFBTSxLQUFLLDRCQUE0QixNQUFNO0FBQUEsSUFDL0MsU0FBUyxPQUFQO0FBQ0EsWUFBTSxRQUFRLEtBQUssYUFBYTtBQUNoQyxVQUFJLE1BQ0YseUJBQXlCLHFCQUN6QixPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQ0Y7QUF6cktPLEFBMnJLUCxPQUFPLFFBQVEsZUFBZTtBQUU5QixPQUFPLFFBQVEseUJBQXlCLE9BQU8sU0FBUyxXQUFXLE9BQU87QUFBQSxFQUN4RSxPQUFPLE9BQU8sUUFBUTtBQUFBLEVBT3RCLGFBQWE7QUFDWCxTQUFLLGFBQWE7QUFDbEIsU0FBSyxHQUNILGFBRUEsQ0FBQyxPQUEwQixRQUFnQixhQUFrQjtBQUMzRCxVQUFJLFVBQVU7QUFDWixZQUFJLFdBQVcsUUFBUTtBQUNyQixpQkFBTyxLQUFLLFFBQVE7QUFBQSxRQUN0QjtBQUNBLFlBQUksV0FBVyxRQUFRO0FBQ3JCLGlCQUFPLEtBQUssUUFBUTtBQUFBLFFBQ3RCO0FBQ0EsWUFBSSxXQUFXLFdBQVc7QUFDeEIsaUJBQU8sS0FBSyxXQUFXO0FBQUEsUUFDekI7QUFBQSxNQUNGO0FBQ0EsWUFBTSxPQUFPLE1BQU0sSUFBSSxNQUFNO0FBQzdCLFVBQUksTUFBTTtBQUNSLGFBQUssUUFBUSxRQUFRO0FBQUEsTUFDdkI7QUFDQSxZQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU07QUFDN0IsVUFBSSxNQUFNO0FBQ1IsYUFBSyxRQUFRLFFBQVE7QUFBQSxNQUN2QjtBQUNBLFlBQU0sVUFBVSxNQUFNLElBQUksU0FBUztBQUNuQyxVQUFJLFNBQVM7QUFDWCxhQUFLLFdBQVcsV0FBVztBQUFBLE1BQzdCO0FBQUEsSUFDRixDQUNGO0FBQUEsRUFDRjtBQUFBLEVBRUEsU0FBUyxNQUF5QjtBQUNoQyxXQUFPLFNBQVMsV0FBVyxVQUFVLE1BQU0sTUFBTSxNQUFNLElBQWtCO0FBQ3pFLFNBQUssYUFBYTtBQUFBLEVBQ3BCO0FBQUEsRUFFQSxlQUFlO0FBQ2IsU0FBSyxhQUFhO0FBQ2xCLFNBQUssZ0JBQWdCLEtBQUssTUFBTTtBQUFBLEVBQ2xDO0FBQUEsRUFFQSxnQkFBZ0IsUUFBMEM7QUFDeEQsV0FBTyxRQUFRLFdBQVM7QUFDdEIsWUFBTSxPQUFPLE1BQU0sSUFBSSxNQUFNO0FBQzdCLFVBQUksTUFBTTtBQUNSLGNBQU0sV0FBVyxLQUFLLFFBQVE7QUFHOUIsWUFBSSxDQUFDLFlBQWEsWUFBWSxDQUFDLFNBQVMsSUFBSSxNQUFNLEdBQUk7QUFDcEQsZUFBSyxRQUFRLFFBQVE7QUFBQSxRQUN2QjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLE9BQU8sTUFBTSxJQUFJLE1BQU07QUFDN0IsVUFBSSxNQUFNO0FBQ1IsY0FBTSxXQUFXLEtBQUssUUFBUTtBQUc5QixZQUFJLENBQUMsWUFBYSxZQUFZLENBQUMsU0FBUyxJQUFJLE1BQU0sR0FBSTtBQUNwRCxlQUFLLFFBQVEsUUFBUTtBQUFBLFFBQ3ZCO0FBQUEsTUFDRjtBQUVBLFlBQU0sVUFBVSxNQUFNLElBQUksU0FBUztBQUNuQyxVQUFJLFNBQVM7QUFDWCxhQUFLLFdBQVcsV0FBVztBQUFBLE1BQzdCO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSDtBQUFBLEVBRUEsZUFBZTtBQUNiLFNBQUssVUFBVSx1QkFBTyxPQUFPLElBQUk7QUFDakMsU0FBSyxVQUFVLHVCQUFPLE9BQU8sSUFBSTtBQUNqQyxTQUFLLGFBQWEsdUJBQU8sT0FBTyxJQUFJO0FBQUEsRUFDdEM7QUFBQSxFQUVBLElBQUksTUFBc0M7QUFDeEMsUUFBSTtBQUdKLFFBQUksTUFBTSxRQUFRLElBQUksR0FBRztBQUN2QixxQkFBZSxDQUFDO0FBQ2hCLGVBQVMsSUFBSSxHQUFHLE1BQU0sS0FBSyxRQUFRLElBQUksS0FBSyxLQUFLLEdBQUc7QUFDbEQsY0FBTSxPQUFPLEtBQUs7QUFHbEIsWUFBSSxDQUFDLEtBQUssS0FBSztBQUNiLHVCQUFhLEtBQUssSUFBSSxPQUFPLFFBQVEsYUFBYSxJQUFJLENBQUM7QUFBQSxRQUN6RCxPQUFPO0FBQ0wsdUJBQWEsS0FBSyxJQUFJO0FBQUEsUUFDeEI7QUFBQSxNQUNGO0FBQUEsSUFDRixXQUFXLENBQUMsS0FBSyxLQUFLO0FBQ3BCLHFCQUFlLElBQUksT0FBTyxRQUFRLGFBQWEsSUFBSTtBQUFBLElBQ3JELE9BQU87QUFDTCxxQkFBZTtBQUFBLElBQ2pCO0FBR0EsU0FBSyxnQkFDSCxNQUFNLFFBQVEsWUFBWSxJQUFJLGVBQWUsQ0FBQyxZQUFZLENBQzVEO0FBR0EsV0FBTyxTQUFTLFdBQVcsVUFBVSxJQUFJLEtBQUssTUFBTSxZQUFZO0FBRWhFLFdBQU87QUFBQSxFQUNUO0FBQUEsRUFRQSxJQUFJLElBQVk7QUFDZCxXQUNFLEtBQUssUUFBUSxPQUNiLEtBQUssUUFBUSxJQUFJLFNBQ2pCLEtBQUssUUFBUSxPQUNiLEtBQUssV0FBVyxPQUNoQixPQUFPLFNBQVMsV0FBVyxVQUFVLElBQUksS0FBSyxNQUFNLEVBQUU7QUFBQSxFQUUxRDtBQUFBLEVBRUEsV0FBVyxHQUFlO0FBQ3hCLFdBQU8sQ0FBRSxHQUFFLElBQUksV0FBVyxLQUFLO0FBQUEsRUFDakM7QUFDRixDQUFDO0FBTUQsTUFBTSx5QkFBeUIsd0JBQzdCLE1BQ0EsT0FDQSxhQUNHO0FBQ0gsU0FBTyxTQUFTLFFBQVEsS0FBSyxTQUFTLEdBQUcsTUFBTSxTQUFTLENBQUM7QUFDM0QsR0FOK0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
