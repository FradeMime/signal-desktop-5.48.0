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
var storageRecordOps_exports = {};
__export(storageRecordOps_exports, {
  mergeAccountRecord: () => mergeAccountRecord,
  mergeContactRecord: () => mergeContactRecord,
  mergeGroupV1Record: () => mergeGroupV1Record,
  mergeGroupV2Record: () => mergeGroupV2Record,
  toAccountRecord: () => toAccountRecord,
  toContactRecord: () => toContactRecord,
  toGroupV1Record: () => toGroupV1Record,
  toGroupV2Record: () => toGroupV2Record
});
module.exports = __toCommonJS(storageRecordOps_exports);
var import_lodash = require("lodash");
var import_long = __toESM(require("long"));
var import_Crypto = require("../Crypto");
var Bytes = __toESM(require("../Bytes"));
var import_groups = require("../groups");
var import_assert = require("../util/assert");
var import_dropNull = require("../util/dropNull");
var import_normalizeUuid = require("../util/normalizeUuid");
var import_missingCaseError = require("../util/missingCaseError");
var import_phoneNumberSharingMode = require("../util/phoneNumberSharingMode");
var import_phoneNumberDiscoverability = require("../util/phoneNumberDiscoverability");
var import_arePinnedConversationsEqual = require("../util/arePinnedConversationsEqual");
var import_timestampLongUtils = require("../util/timestampLongUtils");
var import_universalExpireTimer = require("../util/universalExpireTimer");
var import_ourProfileKey = require("./ourProfileKey");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_UUID = require("../types/UUID");
var preferredReactionEmoji = __toESM(require("../reactions/preferredReactionEmoji"));
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
function toRecordVerified(verified) {
  const VERIFIED_ENUM = window.textsecure.storage.protocol.VerifiedStatus;
  const STATE_ENUM = import_protobuf.SignalService.ContactRecord.IdentityState;
  switch (verified) {
    case VERIFIED_ENUM.VERIFIED:
      return STATE_ENUM.VERIFIED;
    case VERIFIED_ENUM.UNVERIFIED:
      return STATE_ENUM.UNVERIFIED;
    default:
      return STATE_ENUM.DEFAULT;
  }
}
function addUnknownFields(record, conversation, details) {
  if (record.__unknownFields) {
    details.push("adding unknown fields");
    conversation.set({
      storageUnknownFields: Bytes.toBase64(Bytes.concatenate(record.__unknownFields))
    });
  } else if (conversation.get("storageUnknownFields")) {
    details.push("clearing unknown fields");
    conversation.unset("storageUnknownFields");
  }
}
function applyUnknownFields(record, conversation) {
  const storageUnknownFields = conversation.get("storageUnknownFields");
  if (storageUnknownFields) {
    log.info("storageService.applyUnknownFields: Applying unknown fields for", conversation.idForLogging());
    record.__unknownFields = [Bytes.fromBase64(storageUnknownFields)];
  }
}
async function toContactRecord(conversation) {
  const contactRecord = new import_protobuf.SignalService.ContactRecord();
  const uuid = conversation.getUuid();
  if (uuid) {
    contactRecord.serviceUuid = uuid.toString();
  }
  const e164 = conversation.get("e164");
  if (e164) {
    contactRecord.serviceE164 = e164;
  }
  const profileKey = conversation.get("profileKey");
  if (profileKey) {
    contactRecord.profileKey = Bytes.fromBase64(String(profileKey));
  }
  const identityKey = uuid ? await window.textsecure.storage.protocol.loadIdentityKey(uuid) : void 0;
  if (identityKey) {
    contactRecord.identityKey = identityKey;
  }
  const verified = conversation.get("verified");
  if (verified) {
    contactRecord.identityState = toRecordVerified(Number(verified));
  }
  const profileName = conversation.get("profileName");
  if (profileName) {
    contactRecord.givenName = profileName;
  }
  const profileFamilyName = conversation.get("profileFamilyName");
  if (profileFamilyName) {
    contactRecord.familyName = profileFamilyName;
  }
  contactRecord.blocked = conversation.isBlocked();
  contactRecord.whitelisted = Boolean(conversation.get("profileSharing"));
  contactRecord.archived = Boolean(conversation.get("isArchived"));
  contactRecord.markedUnread = Boolean(conversation.get("markedUnread"));
  contactRecord.mutedUntilTimestamp = (0, import_timestampLongUtils.getSafeLongFromTimestamp)(conversation.get("muteExpiresAt"));
  if (conversation.get("hideStory") !== void 0) {
    contactRecord.hideStory = Boolean(conversation.get("hideStory"));
  }
  applyUnknownFields(contactRecord, conversation);
  return contactRecord;
}
function toAccountRecord(conversation) {
  const accountRecord = new import_protobuf.SignalService.AccountRecord();
  if (conversation.get("profileKey")) {
    accountRecord.profileKey = Bytes.fromBase64(String(conversation.get("profileKey")));
  }
  if (conversation.get("profileName")) {
    accountRecord.givenName = conversation.get("profileName") || "";
  }
  if (conversation.get("profileFamilyName")) {
    accountRecord.familyName = conversation.get("profileFamilyName") || "";
  }
  const avatarUrl = window.storage.get("avatarUrl");
  if (avatarUrl !== void 0) {
    accountRecord.avatarUrl = avatarUrl;
  }
  accountRecord.noteToSelfArchived = Boolean(conversation.get("isArchived"));
  accountRecord.noteToSelfMarkedUnread = Boolean(conversation.get("markedUnread"));
  accountRecord.readReceipts = Boolean(window.Events.getReadReceiptSetting());
  accountRecord.sealedSenderIndicators = Boolean(window.storage.get("sealedSenderIndicators"));
  accountRecord.typingIndicators = Boolean(window.Events.getTypingIndicatorSetting());
  accountRecord.linkPreviews = Boolean(window.Events.getLinkPreviewSetting());
  const preferContactAvatars = window.storage.get("preferContactAvatars");
  if (preferContactAvatars !== void 0) {
    accountRecord.preferContactAvatars = Boolean(preferContactAvatars);
  }
  const primarySendsSms = window.storage.get("primarySendsSms");
  if (primarySendsSms !== void 0) {
    accountRecord.primarySendsSms = Boolean(primarySendsSms);
  }
  const accountE164 = window.storage.get("accountE164");
  if (accountE164 !== void 0) {
    accountRecord.e164 = accountE164;
  }
  const rawPreferredReactionEmoji = window.storage.get("preferredReactionEmoji");
  if (preferredReactionEmoji.canBeSynced(rawPreferredReactionEmoji)) {
    accountRecord.preferredReactionEmoji = rawPreferredReactionEmoji;
  }
  const universalExpireTimer = (0, import_universalExpireTimer.get)();
  if (universalExpireTimer) {
    accountRecord.universalExpireTimer = Number(universalExpireTimer);
  }
  const PHONE_NUMBER_SHARING_MODE_ENUM = import_protobuf.SignalService.AccountRecord.PhoneNumberSharingMode;
  const phoneNumberSharingMode = (0, import_phoneNumberSharingMode.parsePhoneNumberSharingMode)(window.storage.get("phoneNumberSharingMode"));
  switch (phoneNumberSharingMode) {
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.Everybody:
      accountRecord.phoneNumberSharingMode = PHONE_NUMBER_SHARING_MODE_ENUM.EVERYBODY;
      break;
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.ContactsOnly:
      accountRecord.phoneNumberSharingMode = PHONE_NUMBER_SHARING_MODE_ENUM.CONTACTS_ONLY;
      break;
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.Nobody:
      accountRecord.phoneNumberSharingMode = PHONE_NUMBER_SHARING_MODE_ENUM.NOBODY;
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(phoneNumberSharingMode);
  }
  const phoneNumberDiscoverability = (0, import_phoneNumberDiscoverability.parsePhoneNumberDiscoverability)(window.storage.get("phoneNumberDiscoverability"));
  switch (phoneNumberDiscoverability) {
    case import_phoneNumberDiscoverability.PhoneNumberDiscoverability.Discoverable:
      accountRecord.notDiscoverableByPhoneNumber = false;
      break;
    case import_phoneNumberDiscoverability.PhoneNumberDiscoverability.NotDiscoverable:
      accountRecord.notDiscoverableByPhoneNumber = true;
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(phoneNumberDiscoverability);
  }
  const pinnedConversations = window.storage.get("pinnedConversationIds", new Array()).map((id) => {
    const pinnedConversation = window.ConversationController.get(id);
    if (pinnedConversation) {
      const pinnedConversationRecord = new import_protobuf.SignalService.AccountRecord.PinnedConversation();
      if (pinnedConversation.get("type") === "private") {
        pinnedConversationRecord.identifier = "contact";
        pinnedConversationRecord.contact = {
          uuid: pinnedConversation.get("uuid"),
          e164: pinnedConversation.get("e164")
        };
      } else if ((0, import_whatTypeOfConversation.isGroupV1)(pinnedConversation.attributes)) {
        pinnedConversationRecord.identifier = "legacyGroupId";
        const groupId = pinnedConversation.get("groupId");
        if (!groupId) {
          throw new Error("toAccountRecord: trying to pin a v1 Group without groupId");
        }
        pinnedConversationRecord.legacyGroupId = Bytes.fromBinary(groupId);
      } else if ((0, import_whatTypeOfConversation.isGroupV2)(pinnedConversation.attributes)) {
        pinnedConversationRecord.identifier = "groupMasterKey";
        const masterKey = pinnedConversation.get("masterKey");
        if (!masterKey) {
          throw new Error("toAccountRecord: trying to pin a v2 Group without masterKey");
        }
        pinnedConversationRecord.groupMasterKey = Bytes.fromBase64(masterKey);
      }
      return pinnedConversationRecord;
    }
    return void 0;
  }).filter((pinnedConversationClass) => pinnedConversationClass !== void 0);
  accountRecord.pinnedConversations = pinnedConversations;
  const subscriberId = window.storage.get("subscriberId");
  if (subscriberId instanceof Uint8Array) {
    accountRecord.subscriberId = subscriberId;
  }
  const subscriberCurrencyCode = window.storage.get("subscriberCurrencyCode");
  if (typeof subscriberCurrencyCode === "string") {
    accountRecord.subscriberCurrencyCode = subscriberCurrencyCode;
  }
  const displayBadgesOnProfile = window.storage.get("displayBadgesOnProfile");
  if (displayBadgesOnProfile !== void 0) {
    accountRecord.displayBadgesOnProfile = displayBadgesOnProfile;
  }
  const keepMutedChatsArchived = window.storage.get("keepMutedChatsArchived");
  if (keepMutedChatsArchived !== void 0) {
    accountRecord.keepMutedChatsArchived = keepMutedChatsArchived;
  }
  applyUnknownFields(accountRecord, conversation);
  return accountRecord;
}
function toGroupV1Record(conversation) {
  const groupV1Record = new import_protobuf.SignalService.GroupV1Record();
  groupV1Record.id = Bytes.fromBinary(String(conversation.get("groupId")));
  groupV1Record.blocked = conversation.isBlocked();
  groupV1Record.whitelisted = Boolean(conversation.get("profileSharing"));
  groupV1Record.archived = Boolean(conversation.get("isArchived"));
  groupV1Record.markedUnread = Boolean(conversation.get("markedUnread"));
  groupV1Record.mutedUntilTimestamp = (0, import_timestampLongUtils.getSafeLongFromTimestamp)(conversation.get("muteExpiresAt"));
  applyUnknownFields(groupV1Record, conversation);
  return groupV1Record;
}
function toGroupV2Record(conversation) {
  const groupV2Record = new import_protobuf.SignalService.GroupV2Record();
  const masterKey = conversation.get("masterKey");
  if (masterKey !== void 0) {
    groupV2Record.masterKey = Bytes.fromBase64(masterKey);
  }
  groupV2Record.blocked = conversation.isBlocked();
  groupV2Record.whitelisted = Boolean(conversation.get("profileSharing"));
  groupV2Record.archived = Boolean(conversation.get("isArchived"));
  groupV2Record.markedUnread = Boolean(conversation.get("markedUnread"));
  groupV2Record.mutedUntilTimestamp = (0, import_timestampLongUtils.getSafeLongFromTimestamp)(conversation.get("muteExpiresAt"));
  groupV2Record.dontNotifyForMentionsIfMuted = Boolean(conversation.get("dontNotifyForMentionsIfMuted"));
  groupV2Record.hideStory = Boolean(conversation.get("hideStory"));
  applyUnknownFields(groupV2Record, conversation);
  return groupV2Record;
}
function applyMessageRequestState(record, conversation) {
  const messageRequestEnum = import_protobuf.SignalService.SyncMessage.MessageRequestResponse.Type;
  if (record.blocked) {
    conversation.applyMessageRequestResponse(messageRequestEnum.BLOCK, {
      fromSync: true,
      viaStorageServiceSync: true
    });
  } else if (record.whitelisted) {
    conversation.applyMessageRequestResponse(messageRequestEnum.ACCEPT, {
      fromSync: true,
      viaStorageServiceSync: true
    });
  } else if (!record.blocked) {
    conversation.unblock({ viaStorageServiceSync: true });
  }
  if (record.whitelisted === false) {
    conversation.disableProfileSharing({ viaStorageServiceSync: true });
  }
}
function doRecordsConflict(localRecord, remoteRecord) {
  const details = new Array();
  for (const key of Object.keys(remoteRecord)) {
    const localValue = localRecord[key];
    const remoteValue = remoteRecord[key];
    if (localValue instanceof Uint8Array) {
      const areEqual2 = Bytes.areEqual(localValue, remoteValue);
      if (!areEqual2) {
        details.push(`key=${key}: different bytes`);
      }
      continue;
    }
    if (import_long.default.isLong(localValue) || typeof localValue === "number") {
      if (!import_long.default.isLong(remoteValue) && typeof remoteValue !== "number") {
        details.push(`key=${key}: type mismatch`);
        continue;
      }
      const areEqual2 = import_long.default.fromValue(localValue).equals(import_long.default.fromValue(remoteValue));
      if (!areEqual2) {
        details.push(`key=${key}: different integers`);
      }
      continue;
    }
    if (key === "pinnedConversations") {
      const areEqual2 = (0, import_arePinnedConversationsEqual.arePinnedConversationsEqual)(localValue, remoteValue);
      if (!areEqual2) {
        details.push("pinnedConversations");
      }
      continue;
    }
    if (localValue === remoteValue) {
      continue;
    }
    if (remoteValue === null && (localValue === false || localValue === "" || localValue === 0 || import_long.default.isLong(localValue) && localValue.toNumber() === 0)) {
      continue;
    }
    const areEqual = (0, import_lodash.isEqual)(localValue, remoteValue);
    if (!areEqual) {
      details.push(`key=${key}: different values`);
    }
  }
  return {
    hasConflict: details.length > 0,
    details
  };
}
function doesRecordHavePendingChanges(mergedRecord, serviceRecord, conversation) {
  const shouldSync = Boolean(conversation.get("needsStorageServiceSync"));
  if (!shouldSync) {
    return { hasConflict: false, details: [] };
  }
  const { hasConflict, details } = doRecordsConflict(mergedRecord, serviceRecord);
  if (!hasConflict) {
    conversation.set({ needsStorageServiceSync: false });
  }
  return {
    hasConflict,
    details
  };
}
async function mergeGroupV1Record(storageID, storageVersion, groupV1Record) {
  if (!groupV1Record.id) {
    throw new Error(`No ID for ${storageID}`);
  }
  const groupId = Bytes.toBinary(groupV1Record.id);
  let details = new Array();
  let conversation = window.ConversationController.get(groupId);
  if (conversation && !(0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
    throw new Error(`Record has group type mismatch ${conversation.idForLogging()}`);
  }
  if (!conversation) {
    const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(groupV1Record.id);
    const fields = (0, import_groups.deriveGroupFields)(masterKeyBuffer);
    const derivedGroupV2Id = Bytes.toBase64(fields.id);
    details.push(`failed to find group by v1 id attempting lookup by v2 groupv2(${derivedGroupV2Id})`);
    conversation = window.ConversationController.get(derivedGroupV2Id);
  }
  if (!conversation) {
    if (groupV1Record.id.byteLength !== 16) {
      throw new Error("Not a valid gv1");
    }
    conversation = await window.ConversationController.getOrCreateAndWait(groupId, "group");
    details.push("created a new group locally");
  }
  const oldStorageID = conversation.get("storageID");
  const oldStorageVersion = conversation.get("storageVersion");
  if (!(0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
    details.push("GV1 record for GV2 group, dropping");
    return {
      hasConflict: false,
      shouldDrop: true,
      conversation,
      oldStorageID,
      oldStorageVersion,
      details
    };
  }
  conversation.set({
    isArchived: Boolean(groupV1Record.archived),
    markedUnread: Boolean(groupV1Record.markedUnread),
    storageID,
    storageVersion
  });
  conversation.setMuteExpiration((0, import_timestampLongUtils.getTimestampFromLong)(groupV1Record.mutedUntilTimestamp), {
    viaStorageServiceSync: true
  });
  applyMessageRequestState(groupV1Record, conversation);
  let hasPendingChanges;
  if ((0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
    addUnknownFields(groupV1Record, conversation, details);
    const { hasConflict, details: extraDetails } = doesRecordHavePendingChanges(toGroupV1Record(conversation), groupV1Record, conversation);
    details = details.concat(extraDetails);
    hasPendingChanges = hasConflict;
  } else {
    hasPendingChanges = true;
    details.push("marking v1 group for an update to v2");
  }
  return {
    hasConflict: hasPendingChanges,
    conversation,
    oldStorageID,
    oldStorageVersion,
    details,
    updatedConversations: [conversation]
  };
}
function getGroupV2Conversation(masterKeyBuffer) {
  const groupFields = (0, import_groups.deriveGroupFields)(masterKeyBuffer);
  const groupId = Bytes.toBase64(groupFields.id);
  const masterKey = Bytes.toBase64(masterKeyBuffer);
  const secretParams = Bytes.toBase64(groupFields.secretParams);
  const publicParams = Bytes.toBase64(groupFields.publicParams);
  const groupV2 = window.ConversationController.get(groupId);
  if (groupV2) {
    groupV2.maybeRepairGroupV2({
      masterKey,
      secretParams,
      publicParams
    });
    return groupV2;
  }
  const groupV1 = window.ConversationController.getByDerivedGroupV2Id(groupId);
  if (groupV1) {
    return groupV1;
  }
  const conversationId = window.ConversationController.ensureGroup(groupId, {
    groupVersion: 2,
    masterKey,
    secretParams,
    publicParams
  });
  const conversation = window.ConversationController.get(conversationId);
  if (!conversation) {
    throw new Error(`getGroupV2Conversation: Failed to create conversation for groupv2(${groupId})`);
  }
  return conversation;
}
async function mergeGroupV2Record(storageID, storageVersion, groupV2Record) {
  if (!groupV2Record.masterKey) {
    throw new Error(`No master key for ${storageID}`);
  }
  const masterKeyBuffer = groupV2Record.masterKey;
  const conversation = getGroupV2Conversation(masterKeyBuffer);
  const oldStorageID = conversation.get("storageID");
  const oldStorageVersion = conversation.get("storageVersion");
  conversation.set({
    hideStory: Boolean(groupV2Record.hideStory),
    isArchived: Boolean(groupV2Record.archived),
    markedUnread: Boolean(groupV2Record.markedUnread),
    dontNotifyForMentionsIfMuted: Boolean(groupV2Record.dontNotifyForMentionsIfMuted),
    storageID,
    storageVersion
  });
  conversation.setMuteExpiration((0, import_timestampLongUtils.getTimestampFromLong)(groupV2Record.mutedUntilTimestamp), {
    viaStorageServiceSync: true
  });
  applyMessageRequestState(groupV2Record, conversation);
  let details = new Array();
  addUnknownFields(groupV2Record, conversation, details);
  const { hasConflict, details: extraDetails } = doesRecordHavePendingChanges(toGroupV2Record(conversation), groupV2Record, conversation);
  details = details.concat(extraDetails);
  const isGroupNewToUs = !(0, import_lodash.isNumber)(conversation.get("revision"));
  const isFirstSync = !window.storage.get("storageFetchComplete");
  const dropInitialJoinMessage = isFirstSync;
  if ((0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
    (0, import_groups.waitThenRespondToGroupV2Migration)({
      conversation
    });
  } else if (isGroupNewToUs) {
    (0, import_groups.waitThenMaybeUpdateGroup)({
      conversation,
      dropInitialJoinMessage
    }, { viaFirstStorageSync: isFirstSync });
  }
  return {
    hasConflict,
    conversation,
    updatedConversations: [conversation],
    oldStorageID,
    oldStorageVersion,
    details
  };
}
async function mergeContactRecord(storageID, storageVersion, originalContactRecord) {
  const contactRecord = {
    ...originalContactRecord,
    serviceUuid: originalContactRecord.serviceUuid ? (0, import_normalizeUuid.normalizeUuid)(originalContactRecord.serviceUuid, "ContactRecord.serviceUuid") : void 0
  };
  const e164 = (0, import_dropNull.dropNull)(contactRecord.serviceE164);
  const uuid = (0, import_dropNull.dropNull)(contactRecord.serviceUuid);
  if (!uuid) {
    return { hasConflict: false, shouldDrop: true, details: ["no uuid"] };
  }
  if (!(0, import_UUID.isValidUuid)(uuid)) {
    return { hasConflict: false, shouldDrop: true, details: ["invalid uuid"] };
  }
  if (window.storage.user.getOurUuidKind(new import_UUID.UUID(uuid)) !== import_UUID.UUIDKind.Unknown) {
    return { hasConflict: false, shouldDrop: true, details: ["our own uuid"] };
  }
  const id = window.ConversationController.ensureContactIds({
    e164,
    uuid,
    highTrust: true,
    reason: "mergeContactRecord"
  });
  if (!id) {
    throw new Error(`No ID for ${storageID}`);
  }
  const conversation = await window.ConversationController.getOrCreateAndWait(id, "private");
  let needsProfileFetch = false;
  if (contactRecord.profileKey && contactRecord.profileKey.length > 0) {
    needsProfileFetch = await conversation.setProfileKey(Bytes.toBase64(contactRecord.profileKey), { viaStorageServiceSync: true });
  }
  let details = new Array();
  const remoteName = (0, import_dropNull.dropNull)(contactRecord.givenName);
  const remoteFamilyName = (0, import_dropNull.dropNull)(contactRecord.familyName);
  const localName = conversation.get("profileName");
  const localFamilyName = conversation.get("profileFamilyName");
  if (remoteName && (localName !== remoteName || localFamilyName !== remoteFamilyName)) {
    if (localName) {
      conversation.getProfiles();
      details.push("refreshing profile");
    } else {
      conversation.set({
        profileName: remoteName,
        profileFamilyName: remoteFamilyName
      });
      details.push("updated profile name");
    }
  }
  if (contactRecord.identityKey) {
    const verified = await conversation.safeGetVerified();
    const storageServiceVerified = contactRecord.identityState || 0;
    const verifiedOptions = {
      key: contactRecord.identityKey,
      viaStorageServiceSync: true
    };
    const STATE_ENUM = import_protobuf.SignalService.ContactRecord.IdentityState;
    if (verified !== storageServiceVerified) {
      details.push(`updating verified state to=${verified}`);
    }
    let keyChange;
    switch (storageServiceVerified) {
      case STATE_ENUM.VERIFIED:
        keyChange = await conversation.setVerified(verifiedOptions);
        break;
      case STATE_ENUM.UNVERIFIED:
        keyChange = await conversation.setUnverified(verifiedOptions);
        break;
      default:
        keyChange = await conversation.setVerifiedDefault(verifiedOptions);
    }
    if (keyChange) {
      details.push("key changed");
    }
  }
  applyMessageRequestState(contactRecord, conversation);
  addUnknownFields(contactRecord, conversation, details);
  const oldStorageID = conversation.get("storageID");
  const oldStorageVersion = conversation.get("storageVersion");
  conversation.set({
    hideStory: Boolean(contactRecord.hideStory),
    isArchived: Boolean(contactRecord.archived),
    markedUnread: Boolean(contactRecord.markedUnread),
    storageID,
    storageVersion
  });
  conversation.setMuteExpiration((0, import_timestampLongUtils.getTimestampFromLong)(contactRecord.mutedUntilTimestamp), {
    viaStorageServiceSync: true
  });
  const { hasConflict, details: extraDetails } = doesRecordHavePendingChanges(await toContactRecord(conversation), contactRecord, conversation);
  details = details.concat(extraDetails);
  return {
    hasConflict,
    conversation,
    updatedConversations: [conversation],
    needsProfileFetch,
    oldStorageID,
    oldStorageVersion,
    details
  };
}
async function mergeAccountRecord(storageID, storageVersion, accountRecord) {
  let details = new Array();
  const {
    linkPreviews,
    notDiscoverableByPhoneNumber,
    noteToSelfArchived,
    noteToSelfMarkedUnread,
    phoneNumberSharingMode,
    pinnedConversations,
    profileKey,
    readReceipts,
    sealedSenderIndicators,
    typingIndicators,
    preferContactAvatars,
    primarySendsSms,
    universalExpireTimer,
    e164: accountE164,
    preferredReactionEmoji: rawPreferredReactionEmoji,
    subscriberId,
    subscriberCurrencyCode,
    displayBadgesOnProfile,
    keepMutedChatsArchived
  } = accountRecord;
  const updatedConversations = new Array();
  window.storage.put("read-receipt-setting", Boolean(readReceipts));
  if (typeof sealedSenderIndicators === "boolean") {
    window.storage.put("sealedSenderIndicators", sealedSenderIndicators);
  }
  if (typeof typingIndicators === "boolean") {
    window.storage.put("typingIndicators", typingIndicators);
  }
  if (typeof linkPreviews === "boolean") {
    window.storage.put("linkPreviews", linkPreviews);
  }
  if (typeof preferContactAvatars === "boolean") {
    const previous = window.storage.get("preferContactAvatars");
    window.storage.put("preferContactAvatars", preferContactAvatars);
    if (Boolean(previous) !== Boolean(preferContactAvatars)) {
      window.ConversationController.forceRerender();
    }
  }
  if (typeof primarySendsSms === "boolean") {
    window.storage.put("primarySendsSms", primarySendsSms);
  }
  if (typeof accountE164 === "string" && accountE164) {
    window.storage.put("accountE164", accountE164);
    window.storage.user.setNumber(accountE164);
  }
  if (preferredReactionEmoji.canBeSynced(rawPreferredReactionEmoji)) {
    const localPreferredReactionEmoji = window.storage.get("preferredReactionEmoji") || [];
    if (!(0, import_lodash.isEqual)(localPreferredReactionEmoji, rawPreferredReactionEmoji)) {
      log.warn("storageService: remote and local preferredReactionEmoji do not match", localPreferredReactionEmoji.length, rawPreferredReactionEmoji.length);
    }
    window.storage.put("preferredReactionEmoji", rawPreferredReactionEmoji);
  }
  (0, import_universalExpireTimer.set)(universalExpireTimer || 0);
  const PHONE_NUMBER_SHARING_MODE_ENUM = import_protobuf.SignalService.AccountRecord.PhoneNumberSharingMode;
  let phoneNumberSharingModeToStore;
  switch (phoneNumberSharingMode) {
    case void 0:
    case null:
    case PHONE_NUMBER_SHARING_MODE_ENUM.EVERYBODY:
      phoneNumberSharingModeToStore = import_phoneNumberSharingMode.PhoneNumberSharingMode.Everybody;
      break;
    case PHONE_NUMBER_SHARING_MODE_ENUM.CONTACTS_ONLY:
      phoneNumberSharingModeToStore = import_phoneNumberSharingMode.PhoneNumberSharingMode.ContactsOnly;
      break;
    case PHONE_NUMBER_SHARING_MODE_ENUM.NOBODY:
      phoneNumberSharingModeToStore = import_phoneNumberSharingMode.PhoneNumberSharingMode.Nobody;
      break;
    default:
      (0, import_assert.assert)(false, `storageService.mergeAccountRecord: Got an unexpected phone number sharing mode: ${phoneNumberSharingMode}. Falling back to default`);
      phoneNumberSharingModeToStore = import_phoneNumberSharingMode.PhoneNumberSharingMode.Everybody;
      break;
  }
  window.storage.put("phoneNumberSharingMode", phoneNumberSharingModeToStore);
  const discoverability = notDiscoverableByPhoneNumber ? import_phoneNumberDiscoverability.PhoneNumberDiscoverability.NotDiscoverable : import_phoneNumberDiscoverability.PhoneNumberDiscoverability.Discoverable;
  window.storage.put("phoneNumberDiscoverability", discoverability);
  if (profileKey) {
    import_ourProfileKey.ourProfileKeyService.set(profileKey);
  }
  if (pinnedConversations) {
    const modelPinnedConversations = window.getConversations().filter((conversation2) => Boolean(conversation2.get("isPinned")));
    const modelPinnedConversationIds = modelPinnedConversations.map((conversation2) => conversation2.get("id"));
    const missingStoragePinnedConversationIds = window.storage.get("pinnedConversationIds", new Array()).filter((id) => !modelPinnedConversationIds.includes(id));
    if (missingStoragePinnedConversationIds.length !== 0) {
      log.warn("mergeAccountRecord: pinnedConversationIds in storage does not match pinned Conversation models");
    }
    const locallyPinnedConversations = modelPinnedConversations.concat(missingStoragePinnedConversationIds.map((conversationId) => window.ConversationController.get(conversationId)).filter((conversation2) => conversation2 !== void 0));
    details.push(`local pinned=${locallyPinnedConversations.length}`, `remote pinned=${pinnedConversations.length}`);
    const remotelyPinnedConversationPromises = pinnedConversations.map(async ({ contact, legacyGroupId, groupMasterKey }) => {
      let conversationId;
      if (contact) {
        conversationId = window.ConversationController.ensureContactIds(contact);
      } else if (legacyGroupId && legacyGroupId.length) {
        conversationId = Bytes.toBinary(legacyGroupId);
      } else if (groupMasterKey && groupMasterKey.length) {
        const groupFields = (0, import_groups.deriveGroupFields)(groupMasterKey);
        const groupId = Bytes.toBase64(groupFields.id);
        conversationId = groupId;
      } else {
        log.error("storageService.mergeAccountRecord: Invalid identifier received");
      }
      if (!conversationId) {
        log.error("storageService.mergeAccountRecord: missing conversation id.");
        return void 0;
      }
      return window.ConversationController.get(conversationId);
    });
    const remotelyPinnedConversations = (await Promise.all(remotelyPinnedConversationPromises)).filter((conversation2) => conversation2 !== void 0);
    const remotelyPinnedConversationIds = remotelyPinnedConversations.map(({ id }) => id);
    const conversationsToUnpin = locallyPinnedConversations.filter(({ id }) => !remotelyPinnedConversationIds.includes(id));
    details.push(`unpinning=${conversationsToUnpin.length}`, `pinning=${remotelyPinnedConversations.length}`);
    conversationsToUnpin.forEach((conversation2) => {
      conversation2.set({ isPinned: false });
      updatedConversations.push(conversation2);
    });
    remotelyPinnedConversations.forEach((conversation2) => {
      conversation2.set({ isPinned: true, isArchived: false });
      updatedConversations.push(conversation2);
    });
    window.storage.put("pinnedConversationIds", remotelyPinnedConversationIds);
  }
  if (subscriberId instanceof Uint8Array) {
    window.storage.put("subscriberId", subscriberId);
  }
  if (typeof subscriberCurrencyCode === "string") {
    window.storage.put("subscriberCurrencyCode", subscriberCurrencyCode);
  }
  window.storage.put("displayBadgesOnProfile", Boolean(displayBadgesOnProfile));
  window.storage.put("keepMutedChatsArchived", Boolean(keepMutedChatsArchived));
  const ourID = window.ConversationController.getOurConversationId();
  if (!ourID) {
    throw new Error("Could not find ourID");
  }
  const conversation = await window.ConversationController.getOrCreateAndWait(ourID, "private");
  addUnknownFields(accountRecord, conversation, details);
  const oldStorageID = conversation.get("storageID");
  const oldStorageVersion = conversation.get("storageVersion");
  conversation.set({
    isArchived: Boolean(noteToSelfArchived),
    markedUnread: Boolean(noteToSelfMarkedUnread),
    storageID,
    storageVersion
  });
  let needsProfileFetch = false;
  if (profileKey && profileKey.length > 0) {
    needsProfileFetch = await conversation.setProfileKey(Bytes.toBase64(profileKey), { viaStorageServiceSync: true });
    const avatarUrl = (0, import_dropNull.dropNull)(accountRecord.avatarUrl);
    await conversation.setProfileAvatar(avatarUrl, profileKey);
    window.storage.put("avatarUrl", avatarUrl);
  }
  const { hasConflict, details: extraDetails } = doesRecordHavePendingChanges(toAccountRecord(conversation), accountRecord, conversation);
  updatedConversations.push(conversation);
  details = details.concat(extraDetails);
  return {
    hasConflict,
    conversation,
    updatedConversations,
    needsProfileFetch,
    oldStorageID,
    oldStorageVersion,
    details
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  mergeAccountRecord,
  mergeContactRecord,
  mergeGroupV1Record,
  mergeGroupV2Record,
  toAccountRecord,
  toContactRecord,
  toGroupV1Record,
  toGroupV2Record
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RvcmFnZVJlY29yZE9wcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzRXF1YWwsIGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBMb25nIGZyb20gJ2xvbmcnO1xuXG5pbXBvcnQgeyBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMSB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQge1xuICBkZXJpdmVHcm91cEZpZWxkcyxcbiAgd2FpdFRoZW5NYXliZVVwZGF0ZUdyb3VwLFxuICB3YWl0VGhlblJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24sXG59IGZyb20gJy4uL2dyb3Vwcyc7XG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBkcm9wTnVsbCB9IGZyb20gJy4uL3V0aWwvZHJvcE51bGwnO1xuaW1wb3J0IHsgbm9ybWFsaXplVXVpZCB9IGZyb20gJy4uL3V0aWwvbm9ybWFsaXplVXVpZCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7XG4gIFBob25lTnVtYmVyU2hhcmluZ01vZGUsXG4gIHBhcnNlUGhvbmVOdW1iZXJTaGFyaW5nTW9kZSxcbn0gZnJvbSAnLi4vdXRpbC9waG9uZU51bWJlclNoYXJpbmdNb2RlJztcbmltcG9ydCB7XG4gIFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5LFxuICBwYXJzZVBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5LFxufSBmcm9tICcuLi91dGlsL3Bob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5JztcbmltcG9ydCB7IGFyZVBpbm5lZENvbnZlcnNhdGlvbnNFcXVhbCB9IGZyb20gJy4uL3V0aWwvYXJlUGlubmVkQ29udmVyc2F0aW9uc0VxdWFsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQge1xuICBnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAsXG4gIGdldFRpbWVzdGFtcEZyb21Mb25nLFxufSBmcm9tICcuLi91dGlsL3RpbWVzdGFtcExvbmdVdGlscyc7XG5pbXBvcnQge1xuICBnZXQgYXMgZ2V0VW5pdmVyc2FsRXhwaXJlVGltZXIsXG4gIHNldCBhcyBzZXRVbml2ZXJzYWxFeHBpcmVUaW1lcixcbn0gZnJvbSAnLi4vdXRpbC91bml2ZXJzYWxFeHBpcmVUaW1lcic7XG5pbXBvcnQgeyBvdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4vb3VyUHJvZmlsZUtleSc7XG5pbXBvcnQgeyBpc0dyb3VwVjEsIGlzR3JvdXBWMiB9IGZyb20gJy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBpc1ZhbGlkVXVpZCwgVVVJRCwgVVVJREtpbmQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCAqIGFzIHByZWZlcnJlZFJlYWN0aW9uRW1vamkgZnJvbSAnLi4vcmVhY3Rpb25zL3ByZWZlcnJlZFJlYWN0aW9uRW1vamknO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uL3Byb3RvYnVmJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbnR5cGUgUmVjb3JkQ2xhc3MgPVxuICB8IFByb3RvLklBY2NvdW50UmVjb3JkXG4gIHwgUHJvdG8uSUNvbnRhY3RSZWNvcmRcbiAgfCBQcm90by5JR3JvdXBWMVJlY29yZFxuICB8IFByb3RvLklHcm91cFYyUmVjb3JkO1xuXG5leHBvcnQgdHlwZSBNZXJnZVJlc3VsdFR5cGUgPSBSZWFkb25seTx7XG4gIGhhc0NvbmZsaWN0OiBib29sZWFuO1xuICBzaG91bGREcm9wPzogYm9vbGVhbjtcbiAgY29udmVyc2F0aW9uPzogQ29udmVyc2F0aW9uTW9kZWw7XG4gIG5lZWRzUHJvZmlsZUZldGNoPzogYm9vbGVhbjtcbiAgdXBkYXRlZENvbnZlcnNhdGlvbnM/OiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvbk1vZGVsPjtcbiAgb2xkU3RvcmFnZUlEPzogc3RyaW5nO1xuICBvbGRTdG9yYWdlVmVyc2lvbj86IG51bWJlcjtcbiAgZGV0YWlsczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufT47XG5cbnR5cGUgSGFzQ29uZmxpY3RSZXN1bHRUeXBlID0gUmVhZG9ubHk8e1xuICBoYXNDb25mbGljdDogYm9vbGVhbjtcbiAgZGV0YWlsczogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufT47XG5cbmZ1bmN0aW9uIHRvUmVjb3JkVmVyaWZpZWQodmVyaWZpZWQ6IG51bWJlcik6IFByb3RvLkNvbnRhY3RSZWNvcmQuSWRlbnRpdHlTdGF0ZSB7XG4gIGNvbnN0IFZFUklGSUVEX0VOVU0gPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLlZlcmlmaWVkU3RhdHVzO1xuICBjb25zdCBTVEFURV9FTlVNID0gUHJvdG8uQ29udGFjdFJlY29yZC5JZGVudGl0eVN0YXRlO1xuXG4gIHN3aXRjaCAodmVyaWZpZWQpIHtcbiAgICBjYXNlIFZFUklGSUVEX0VOVU0uVkVSSUZJRUQ6XG4gICAgICByZXR1cm4gU1RBVEVfRU5VTS5WRVJJRklFRDtcbiAgICBjYXNlIFZFUklGSUVEX0VOVU0uVU5WRVJJRklFRDpcbiAgICAgIHJldHVybiBTVEFURV9FTlVNLlVOVkVSSUZJRUQ7XG4gICAgZGVmYXVsdDpcbiAgICAgIHJldHVybiBTVEFURV9FTlVNLkRFRkFVTFQ7XG4gIH1cbn1cblxuZnVuY3Rpb24gYWRkVW5rbm93bkZpZWxkcyhcbiAgcmVjb3JkOiBSZWNvcmRDbGFzcyxcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAgZGV0YWlsczogQXJyYXk8c3RyaW5nPlxuKTogdm9pZCB7XG4gIGlmIChyZWNvcmQuX191bmtub3duRmllbGRzKSB7XG4gICAgZGV0YWlscy5wdXNoKCdhZGRpbmcgdW5rbm93biBmaWVsZHMnKTtcbiAgICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICAgIHN0b3JhZ2VVbmtub3duRmllbGRzOiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgQnl0ZXMuY29uY2F0ZW5hdGUocmVjb3JkLl9fdW5rbm93bkZpZWxkcylcbiAgICAgICksXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVVua25vd25GaWVsZHMnKSkge1xuICAgIC8vIElmIHRoZSByZWNvcmQgZG9lc24ndCBoYXZlIHVua25vd24gZmllbGRzIGF0dGFjaGVkIGJ1dCB3ZSBoYXZlIHRoZW1cbiAgICAvLyBzYXZlZCBsb2NhbGx5IHRoZW4gd2UgbmVlZCB0byBjbGVhciBpdCBvdXRcbiAgICBkZXRhaWxzLnB1c2goJ2NsZWFyaW5nIHVua25vd24gZmllbGRzJyk7XG4gICAgY29udmVyc2F0aW9uLnVuc2V0KCdzdG9yYWdlVW5rbm93bkZpZWxkcycpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGFwcGx5VW5rbm93bkZpZWxkcyhcbiAgcmVjb3JkOiBSZWNvcmRDbGFzcyxcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbFxuKTogdm9pZCB7XG4gIGNvbnN0IHN0b3JhZ2VVbmtub3duRmllbGRzID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVVua25vd25GaWVsZHMnKTtcbiAgaWYgKHN0b3JhZ2VVbmtub3duRmllbGRzKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICAnc3RvcmFnZVNlcnZpY2UuYXBwbHlVbmtub3duRmllbGRzOiBBcHBseWluZyB1bmtub3duIGZpZWxkcyBmb3InLFxuICAgICAgY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpXG4gICAgKTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICByZWNvcmQuX191bmtub3duRmllbGRzID0gW0J5dGVzLmZyb21CYXNlNjQoc3RvcmFnZVVua25vd25GaWVsZHMpXTtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdG9Db250YWN0UmVjb3JkKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBQcm9taXNlPFByb3RvLkNvbnRhY3RSZWNvcmQ+IHtcbiAgY29uc3QgY29udGFjdFJlY29yZCA9IG5ldyBQcm90by5Db250YWN0UmVjb3JkKCk7XG4gIGNvbnN0IHV1aWQgPSBjb252ZXJzYXRpb24uZ2V0VXVpZCgpO1xuICBpZiAodXVpZCkge1xuICAgIGNvbnRhY3RSZWNvcmQuc2VydmljZVV1aWQgPSB1dWlkLnRvU3RyaW5nKCk7XG4gIH1cbiAgY29uc3QgZTE2NCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2UxNjQnKTtcbiAgaWYgKGUxNjQpIHtcbiAgICBjb250YWN0UmVjb3JkLnNlcnZpY2VFMTY0ID0gZTE2NDtcbiAgfVxuICBjb25zdCBwcm9maWxlS2V5ID0gY29udmVyc2F0aW9uLmdldCgncHJvZmlsZUtleScpO1xuICBpZiAocHJvZmlsZUtleSkge1xuICAgIGNvbnRhY3RSZWNvcmQucHJvZmlsZUtleSA9IEJ5dGVzLmZyb21CYXNlNjQoU3RyaW5nKHByb2ZpbGVLZXkpKTtcbiAgfVxuXG4gIGNvbnN0IGlkZW50aXR5S2V5ID0gdXVpZFxuICAgID8gYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5sb2FkSWRlbnRpdHlLZXkodXVpZClcbiAgICA6IHVuZGVmaW5lZDtcbiAgaWYgKGlkZW50aXR5S2V5KSB7XG4gICAgY29udGFjdFJlY29yZC5pZGVudGl0eUtleSA9IGlkZW50aXR5S2V5O1xuICB9XG4gIGNvbnN0IHZlcmlmaWVkID0gY29udmVyc2F0aW9uLmdldCgndmVyaWZpZWQnKTtcbiAgaWYgKHZlcmlmaWVkKSB7XG4gICAgY29udGFjdFJlY29yZC5pZGVudGl0eVN0YXRlID0gdG9SZWNvcmRWZXJpZmllZChOdW1iZXIodmVyaWZpZWQpKTtcbiAgfVxuICBjb25zdCBwcm9maWxlTmFtZSA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVOYW1lJyk7XG4gIGlmIChwcm9maWxlTmFtZSkge1xuICAgIGNvbnRhY3RSZWNvcmQuZ2l2ZW5OYW1lID0gcHJvZmlsZU5hbWU7XG4gIH1cbiAgY29uc3QgcHJvZmlsZUZhbWlseU5hbWUgPSBjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlRmFtaWx5TmFtZScpO1xuICBpZiAocHJvZmlsZUZhbWlseU5hbWUpIHtcbiAgICBjb250YWN0UmVjb3JkLmZhbWlseU5hbWUgPSBwcm9maWxlRmFtaWx5TmFtZTtcbiAgfVxuICBjb250YWN0UmVjb3JkLmJsb2NrZWQgPSBjb252ZXJzYXRpb24uaXNCbG9ja2VkKCk7XG4gIGNvbnRhY3RSZWNvcmQud2hpdGVsaXN0ZWQgPSBCb29sZWFuKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVTaGFyaW5nJykpO1xuICBjb250YWN0UmVjb3JkLmFyY2hpdmVkID0gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCdpc0FyY2hpdmVkJykpO1xuICBjb250YWN0UmVjb3JkLm1hcmtlZFVucmVhZCA9IEJvb2xlYW4oY29udmVyc2F0aW9uLmdldCgnbWFya2VkVW5yZWFkJykpO1xuICBjb250YWN0UmVjb3JkLm11dGVkVW50aWxUaW1lc3RhbXAgPSBnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAoXG4gICAgY29udmVyc2F0aW9uLmdldCgnbXV0ZUV4cGlyZXNBdCcpXG4gICk7XG4gIGlmIChjb252ZXJzYXRpb24uZ2V0KCdoaWRlU3RvcnknKSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgY29udGFjdFJlY29yZC5oaWRlU3RvcnkgPSBCb29sZWFuKGNvbnZlcnNhdGlvbi5nZXQoJ2hpZGVTdG9yeScpKTtcbiAgfVxuXG4gIGFwcGx5VW5rbm93bkZpZWxkcyhjb250YWN0UmVjb3JkLCBjb252ZXJzYXRpb24pO1xuXG4gIHJldHVybiBjb250YWN0UmVjb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9BY2NvdW50UmVjb3JkKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBQcm90by5BY2NvdW50UmVjb3JkIHtcbiAgY29uc3QgYWNjb3VudFJlY29yZCA9IG5ldyBQcm90by5BY2NvdW50UmVjb3JkKCk7XG5cbiAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVLZXknKSkge1xuICAgIGFjY291bnRSZWNvcmQucHJvZmlsZUtleSA9IEJ5dGVzLmZyb21CYXNlNjQoXG4gICAgICBTdHJpbmcoY29udmVyc2F0aW9uLmdldCgncHJvZmlsZUtleScpKVxuICAgICk7XG4gIH1cbiAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVOYW1lJykpIHtcbiAgICBhY2NvdW50UmVjb3JkLmdpdmVuTmFtZSA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVOYW1lJykgfHwgJyc7XG4gIH1cbiAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVGYW1pbHlOYW1lJykpIHtcbiAgICBhY2NvdW50UmVjb3JkLmZhbWlseU5hbWUgPSBjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlRmFtaWx5TmFtZScpIHx8ICcnO1xuICB9XG4gIGNvbnN0IGF2YXRhclVybCA9IHdpbmRvdy5zdG9yYWdlLmdldCgnYXZhdGFyVXJsJyk7XG4gIGlmIChhdmF0YXJVcmwgIT09IHVuZGVmaW5lZCkge1xuICAgIGFjY291bnRSZWNvcmQuYXZhdGFyVXJsID0gYXZhdGFyVXJsO1xuICB9XG4gIGFjY291bnRSZWNvcmQubm90ZVRvU2VsZkFyY2hpdmVkID0gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCdpc0FyY2hpdmVkJykpO1xuICBhY2NvdW50UmVjb3JkLm5vdGVUb1NlbGZNYXJrZWRVbnJlYWQgPSBCb29sZWFuKFxuICAgIGNvbnZlcnNhdGlvbi5nZXQoJ21hcmtlZFVucmVhZCcpXG4gICk7XG4gIGFjY291bnRSZWNvcmQucmVhZFJlY2VpcHRzID0gQm9vbGVhbih3aW5kb3cuRXZlbnRzLmdldFJlYWRSZWNlaXB0U2V0dGluZygpKTtcbiAgYWNjb3VudFJlY29yZC5zZWFsZWRTZW5kZXJJbmRpY2F0b3JzID0gQm9vbGVhbihcbiAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3NlYWxlZFNlbmRlckluZGljYXRvcnMnKVxuICApO1xuICBhY2NvdW50UmVjb3JkLnR5cGluZ0luZGljYXRvcnMgPSBCb29sZWFuKFxuICAgIHdpbmRvdy5FdmVudHMuZ2V0VHlwaW5nSW5kaWNhdG9yU2V0dGluZygpXG4gICk7XG4gIGFjY291bnRSZWNvcmQubGlua1ByZXZpZXdzID0gQm9vbGVhbih3aW5kb3cuRXZlbnRzLmdldExpbmtQcmV2aWV3U2V0dGluZygpKTtcblxuICBjb25zdCBwcmVmZXJDb250YWN0QXZhdGFycyA9IHdpbmRvdy5zdG9yYWdlLmdldCgncHJlZmVyQ29udGFjdEF2YXRhcnMnKTtcbiAgaWYgKHByZWZlckNvbnRhY3RBdmF0YXJzICE9PSB1bmRlZmluZWQpIHtcbiAgICBhY2NvdW50UmVjb3JkLnByZWZlckNvbnRhY3RBdmF0YXJzID0gQm9vbGVhbihwcmVmZXJDb250YWN0QXZhdGFycyk7XG4gIH1cblxuICBjb25zdCBwcmltYXJ5U2VuZHNTbXMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ByaW1hcnlTZW5kc1NtcycpO1xuICBpZiAocHJpbWFyeVNlbmRzU21zICE9PSB1bmRlZmluZWQpIHtcbiAgICBhY2NvdW50UmVjb3JkLnByaW1hcnlTZW5kc1NtcyA9IEJvb2xlYW4ocHJpbWFyeVNlbmRzU21zKTtcbiAgfVxuXG4gIGNvbnN0IGFjY291bnRFMTY0ID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdhY2NvdW50RTE2NCcpO1xuICBpZiAoYWNjb3VudEUxNjQgIT09IHVuZGVmaW5lZCkge1xuICAgIGFjY291bnRSZWNvcmQuZTE2NCA9IGFjY291bnRFMTY0O1xuICB9XG5cbiAgY29uc3QgcmF3UHJlZmVycmVkUmVhY3Rpb25FbW9qaSA9IHdpbmRvdy5zdG9yYWdlLmdldChcbiAgICAncHJlZmVycmVkUmVhY3Rpb25FbW9qaSdcbiAgKTtcbiAgaWYgKHByZWZlcnJlZFJlYWN0aW9uRW1vamkuY2FuQmVTeW5jZWQocmF3UHJlZmVycmVkUmVhY3Rpb25FbW9qaSkpIHtcbiAgICBhY2NvdW50UmVjb3JkLnByZWZlcnJlZFJlYWN0aW9uRW1vamkgPSByYXdQcmVmZXJyZWRSZWFjdGlvbkVtb2ppO1xuICB9XG5cbiAgY29uc3QgdW5pdmVyc2FsRXhwaXJlVGltZXIgPSBnZXRVbml2ZXJzYWxFeHBpcmVUaW1lcigpO1xuICBpZiAodW5pdmVyc2FsRXhwaXJlVGltZXIpIHtcbiAgICBhY2NvdW50UmVjb3JkLnVuaXZlcnNhbEV4cGlyZVRpbWVyID0gTnVtYmVyKHVuaXZlcnNhbEV4cGlyZVRpbWVyKTtcbiAgfVxuXG4gIGNvbnN0IFBIT05FX05VTUJFUl9TSEFSSU5HX01PREVfRU5VTSA9XG4gICAgUHJvdG8uQWNjb3VudFJlY29yZC5QaG9uZU51bWJlclNoYXJpbmdNb2RlO1xuICBjb25zdCBwaG9uZU51bWJlclNoYXJpbmdNb2RlID0gcGFyc2VQaG9uZU51bWJlclNoYXJpbmdNb2RlKFxuICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncGhvbmVOdW1iZXJTaGFyaW5nTW9kZScpXG4gICk7XG4gIHN3aXRjaCAocGhvbmVOdW1iZXJTaGFyaW5nTW9kZSkge1xuICAgIGNhc2UgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5FdmVyeWJvZHk6XG4gICAgICBhY2NvdW50UmVjb3JkLnBob25lTnVtYmVyU2hhcmluZ01vZGUgPVxuICAgICAgICBQSE9ORV9OVU1CRVJfU0hBUklOR19NT0RFX0VOVU0uRVZFUllCT0RZO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLkNvbnRhY3RzT25seTpcbiAgICAgIGFjY291bnRSZWNvcmQucGhvbmVOdW1iZXJTaGFyaW5nTW9kZSA9XG4gICAgICAgIFBIT05FX05VTUJFUl9TSEFSSU5HX01PREVfRU5VTS5DT05UQUNUU19PTkxZO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLk5vYm9keTpcbiAgICAgIGFjY291bnRSZWNvcmQucGhvbmVOdW1iZXJTaGFyaW5nTW9kZSA9XG4gICAgICAgIFBIT05FX05VTUJFUl9TSEFSSU5HX01PREVfRU5VTS5OT0JPRFk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihwaG9uZU51bWJlclNoYXJpbmdNb2RlKTtcbiAgfVxuXG4gIGNvbnN0IHBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5ID0gcGFyc2VQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eShcbiAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3Bob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5JylcbiAgKTtcbiAgc3dpdGNoIChwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eSkge1xuICAgIGNhc2UgUGhvbmVOdW1iZXJEaXNjb3ZlcmFiaWxpdHkuRGlzY292ZXJhYmxlOlxuICAgICAgYWNjb3VudFJlY29yZC5ub3REaXNjb3ZlcmFibGVCeVBob25lTnVtYmVyID0gZmFsc2U7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5Lk5vdERpc2NvdmVyYWJsZTpcbiAgICAgIGFjY291bnRSZWNvcmQubm90RGlzY292ZXJhYmxlQnlQaG9uZU51bWJlciA9IHRydWU7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eSk7XG4gIH1cblxuICBjb25zdCBwaW5uZWRDb252ZXJzYXRpb25zID0gd2luZG93LnN0b3JhZ2VcbiAgICAuZ2V0KCdwaW5uZWRDb252ZXJzYXRpb25JZHMnLCBuZXcgQXJyYXk8c3RyaW5nPigpKVxuICAgIC5tYXAoaWQgPT4ge1xuICAgICAgY29uc3QgcGlubmVkQ29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkKTtcblxuICAgICAgaWYgKHBpbm5lZENvbnZlcnNhdGlvbikge1xuICAgICAgICBjb25zdCBwaW5uZWRDb252ZXJzYXRpb25SZWNvcmQgPVxuICAgICAgICAgIG5ldyBQcm90by5BY2NvdW50UmVjb3JkLlBpbm5lZENvbnZlcnNhdGlvbigpO1xuXG4gICAgICAgIGlmIChwaW5uZWRDb252ZXJzYXRpb24uZ2V0KCd0eXBlJykgPT09ICdwcml2YXRlJykge1xuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvblJlY29yZC5pZGVudGlmaWVyID0gJ2NvbnRhY3QnO1xuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvblJlY29yZC5jb250YWN0ID0ge1xuICAgICAgICAgICAgdXVpZDogcGlubmVkQ29udmVyc2F0aW9uLmdldCgndXVpZCcpLFxuICAgICAgICAgICAgZTE2NDogcGlubmVkQ29udmVyc2F0aW9uLmdldCgnZTE2NCcpLFxuICAgICAgICAgIH07XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHcm91cFYxKHBpbm5lZENvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvblJlY29yZC5pZGVudGlmaWVyID0gJ2xlZ2FjeUdyb3VwSWQnO1xuICAgICAgICAgIGNvbnN0IGdyb3VwSWQgPSBwaW5uZWRDb252ZXJzYXRpb24uZ2V0KCdncm91cElkJyk7XG4gICAgICAgICAgaWYgKCFncm91cElkKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICd0b0FjY291bnRSZWNvcmQ6IHRyeWluZyB0byBwaW4gYSB2MSBHcm91cCB3aXRob3V0IGdyb3VwSWQnXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25SZWNvcmQubGVnYWN5R3JvdXBJZCA9IEJ5dGVzLmZyb21CaW5hcnkoZ3JvdXBJZCk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNHcm91cFYyKHBpbm5lZENvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIHBpbm5lZENvbnZlcnNhdGlvblJlY29yZC5pZGVudGlmaWVyID0gJ2dyb3VwTWFzdGVyS2V5JztcbiAgICAgICAgICBjb25zdCBtYXN0ZXJLZXkgPSBwaW5uZWRDb252ZXJzYXRpb24uZ2V0KCdtYXN0ZXJLZXknKTtcbiAgICAgICAgICBpZiAoIW1hc3RlcktleSkge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAndG9BY2NvdW50UmVjb3JkOiB0cnlpbmcgdG8gcGluIGEgdjIgR3JvdXAgd2l0aG91dCBtYXN0ZXJLZXknXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBwaW5uZWRDb252ZXJzYXRpb25SZWNvcmQuZ3JvdXBNYXN0ZXJLZXkgPSBCeXRlcy5mcm9tQmFzZTY0KG1hc3RlcktleSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcGlubmVkQ29udmVyc2F0aW9uUmVjb3JkO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH0pXG4gICAgLmZpbHRlcihcbiAgICAgIChcbiAgICAgICAgcGlubmVkQ29udmVyc2F0aW9uQ2xhc3NcbiAgICAgICk6IHBpbm5lZENvbnZlcnNhdGlvbkNsYXNzIGlzIFByb3RvLkFjY291bnRSZWNvcmQuUGlubmVkQ29udmVyc2F0aW9uID0+XG4gICAgICAgIHBpbm5lZENvbnZlcnNhdGlvbkNsYXNzICE9PSB1bmRlZmluZWRcbiAgICApO1xuXG4gIGFjY291bnRSZWNvcmQucGlubmVkQ29udmVyc2F0aW9ucyA9IHBpbm5lZENvbnZlcnNhdGlvbnM7XG5cbiAgY29uc3Qgc3Vic2NyaWJlcklkID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdWJzY3JpYmVySWQnKTtcbiAgaWYgKHN1YnNjcmliZXJJZCBpbnN0YW5jZW9mIFVpbnQ4QXJyYXkpIHtcbiAgICBhY2NvdW50UmVjb3JkLnN1YnNjcmliZXJJZCA9IHN1YnNjcmliZXJJZDtcbiAgfVxuICBjb25zdCBzdWJzY3JpYmVyQ3VycmVuY3lDb2RlID0gd2luZG93LnN0b3JhZ2UuZ2V0KCdzdWJzY3JpYmVyQ3VycmVuY3lDb2RlJyk7XG4gIGlmICh0eXBlb2Ygc3Vic2NyaWJlckN1cnJlbmN5Q29kZSA9PT0gJ3N0cmluZycpIHtcbiAgICBhY2NvdW50UmVjb3JkLnN1YnNjcmliZXJDdXJyZW5jeUNvZGUgPSBzdWJzY3JpYmVyQ3VycmVuY3lDb2RlO1xuICB9XG4gIGNvbnN0IGRpc3BsYXlCYWRnZXNPblByb2ZpbGUgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ2Rpc3BsYXlCYWRnZXNPblByb2ZpbGUnKTtcbiAgaWYgKGRpc3BsYXlCYWRnZXNPblByb2ZpbGUgIT09IHVuZGVmaW5lZCkge1xuICAgIGFjY291bnRSZWNvcmQuZGlzcGxheUJhZGdlc09uUHJvZmlsZSA9IGRpc3BsYXlCYWRnZXNPblByb2ZpbGU7XG4gIH1cbiAgY29uc3Qga2VlcE11dGVkQ2hhdHNBcmNoaXZlZCA9IHdpbmRvdy5zdG9yYWdlLmdldCgna2VlcE11dGVkQ2hhdHNBcmNoaXZlZCcpO1xuICBpZiAoa2VlcE11dGVkQ2hhdHNBcmNoaXZlZCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgYWNjb3VudFJlY29yZC5rZWVwTXV0ZWRDaGF0c0FyY2hpdmVkID0ga2VlcE11dGVkQ2hhdHNBcmNoaXZlZDtcbiAgfVxuXG4gIGFwcGx5VW5rbm93bkZpZWxkcyhhY2NvdW50UmVjb3JkLCBjb252ZXJzYXRpb24pO1xuXG4gIHJldHVybiBhY2NvdW50UmVjb3JkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gdG9Hcm91cFYxUmVjb3JkKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBQcm90by5Hcm91cFYxUmVjb3JkIHtcbiAgY29uc3QgZ3JvdXBWMVJlY29yZCA9IG5ldyBQcm90by5Hcm91cFYxUmVjb3JkKCk7XG5cbiAgZ3JvdXBWMVJlY29yZC5pZCA9IEJ5dGVzLmZyb21CaW5hcnkoU3RyaW5nKGNvbnZlcnNhdGlvbi5nZXQoJ2dyb3VwSWQnKSkpO1xuICBncm91cFYxUmVjb3JkLmJsb2NrZWQgPSBjb252ZXJzYXRpb24uaXNCbG9ja2VkKCk7XG4gIGdyb3VwVjFSZWNvcmQud2hpdGVsaXN0ZWQgPSBCb29sZWFuKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVTaGFyaW5nJykpO1xuICBncm91cFYxUmVjb3JkLmFyY2hpdmVkID0gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCdpc0FyY2hpdmVkJykpO1xuICBncm91cFYxUmVjb3JkLm1hcmtlZFVucmVhZCA9IEJvb2xlYW4oY29udmVyc2F0aW9uLmdldCgnbWFya2VkVW5yZWFkJykpO1xuICBncm91cFYxUmVjb3JkLm11dGVkVW50aWxUaW1lc3RhbXAgPSBnZXRTYWZlTG9uZ0Zyb21UaW1lc3RhbXAoXG4gICAgY29udmVyc2F0aW9uLmdldCgnbXV0ZUV4cGlyZXNBdCcpXG4gICk7XG5cbiAgYXBwbHlVbmtub3duRmllbGRzKGdyb3VwVjFSZWNvcmQsIGNvbnZlcnNhdGlvbik7XG5cbiAgcmV0dXJuIGdyb3VwVjFSZWNvcmQ7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiB0b0dyb3VwVjJSZWNvcmQoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbik6IFByb3RvLkdyb3VwVjJSZWNvcmQge1xuICBjb25zdCBncm91cFYyUmVjb3JkID0gbmV3IFByb3RvLkdyb3VwVjJSZWNvcmQoKTtcblxuICBjb25zdCBtYXN0ZXJLZXkgPSBjb252ZXJzYXRpb24uZ2V0KCdtYXN0ZXJLZXknKTtcbiAgaWYgKG1hc3RlcktleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgZ3JvdXBWMlJlY29yZC5tYXN0ZXJLZXkgPSBCeXRlcy5mcm9tQmFzZTY0KG1hc3RlcktleSk7XG4gIH1cbiAgZ3JvdXBWMlJlY29yZC5ibG9ja2VkID0gY29udmVyc2F0aW9uLmlzQmxvY2tlZCgpO1xuICBncm91cFYyUmVjb3JkLndoaXRlbGlzdGVkID0gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlU2hhcmluZycpKTtcbiAgZ3JvdXBWMlJlY29yZC5hcmNoaXZlZCA9IEJvb2xlYW4oY29udmVyc2F0aW9uLmdldCgnaXNBcmNoaXZlZCcpKTtcbiAgZ3JvdXBWMlJlY29yZC5tYXJrZWRVbnJlYWQgPSBCb29sZWFuKGNvbnZlcnNhdGlvbi5nZXQoJ21hcmtlZFVucmVhZCcpKTtcbiAgZ3JvdXBWMlJlY29yZC5tdXRlZFVudGlsVGltZXN0YW1wID0gZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wKFxuICAgIGNvbnZlcnNhdGlvbi5nZXQoJ211dGVFeHBpcmVzQXQnKVxuICApO1xuICBncm91cFYyUmVjb3JkLmRvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQgPSBCb29sZWFuKFxuICAgIGNvbnZlcnNhdGlvbi5nZXQoJ2RvbnROb3RpZnlGb3JNZW50aW9uc0lmTXV0ZWQnKVxuICApO1xuICBncm91cFYyUmVjb3JkLmhpZGVTdG9yeSA9IEJvb2xlYW4oY29udmVyc2F0aW9uLmdldCgnaGlkZVN0b3J5JykpO1xuXG4gIGFwcGx5VW5rbm93bkZpZWxkcyhncm91cFYyUmVjb3JkLCBjb252ZXJzYXRpb24pO1xuXG4gIHJldHVybiBncm91cFYyUmVjb3JkO1xufVxuXG50eXBlIE1lc3NhZ2VSZXF1ZXN0Q2FwYWJsZVJlY29yZCA9IFByb3RvLklDb250YWN0UmVjb3JkIHwgUHJvdG8uSUdyb3VwVjFSZWNvcmQ7XG5cbmZ1bmN0aW9uIGFwcGx5TWVzc2FnZVJlcXVlc3RTdGF0ZShcbiAgcmVjb3JkOiBNZXNzYWdlUmVxdWVzdENhcGFibGVSZWNvcmQsXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbik6IHZvaWQge1xuICBjb25zdCBtZXNzYWdlUmVxdWVzdEVudW0gPSBQcm90by5TeW5jTWVzc2FnZS5NZXNzYWdlUmVxdWVzdFJlc3BvbnNlLlR5cGU7XG5cbiAgaWYgKHJlY29yZC5ibG9ja2VkKSB7XG4gICAgY29udmVyc2F0aW9uLmFwcGx5TWVzc2FnZVJlcXVlc3RSZXNwb25zZShtZXNzYWdlUmVxdWVzdEVudW0uQkxPQ0ssIHtcbiAgICAgIGZyb21TeW5jOiB0cnVlLFxuICAgICAgdmlhU3RvcmFnZVNlcnZpY2VTeW5jOiB0cnVlLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKHJlY29yZC53aGl0ZWxpc3RlZCkge1xuICAgIC8vIHVuYmxvY2tpbmcgaXMgYWxzbyBoYW5kbGVkIGJ5IHRoaXMgZnVuY3Rpb24gd2hpY2ggaXMgd2h5IHRoZSBuZXh0XG4gICAgLy8gY29uZGl0aW9uIGlzIHBhcnQgb2YgdGhlIGVsc2UtaWYgYW5kIG5vdCBzZXBhcmF0ZVxuICAgIGNvbnZlcnNhdGlvbi5hcHBseU1lc3NhZ2VSZXF1ZXN0UmVzcG9uc2UobWVzc2FnZVJlcXVlc3RFbnVtLkFDQ0VQVCwge1xuICAgICAgZnJvbVN5bmM6IHRydWUsXG4gICAgICB2aWFTdG9yYWdlU2VydmljZVN5bmM6IHRydWUsXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoIXJlY29yZC5ibG9ja2VkKSB7XG4gICAgLy8gaWYgdGhlIGNvbmRpdGlvbiBhYm92ZSBmYWlsZWQgdGhlIHN0YXRlIGNvdWxkIHN0aWxsIGJlIGJsb2NrZWQ9ZmFsc2VcbiAgICAvLyBpbiB3aGljaCBjYXNlIHdlIHNob3VsZCB1bmJsb2NrIHRoZSBjb252ZXJzYXRpb25cbiAgICBjb252ZXJzYXRpb24udW5ibG9jayh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSB9KTtcbiAgfVxuXG4gIGlmIChyZWNvcmQud2hpdGVsaXN0ZWQgPT09IGZhbHNlKSB7XG4gICAgY29udmVyc2F0aW9uLmRpc2FibGVQcm9maWxlU2hhcmluZyh7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSB9KTtcbiAgfVxufVxuXG50eXBlIFJlY29yZENsYXNzT2JqZWN0ID0ge1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBba2V5OiBzdHJpbmddOiBhbnk7XG59O1xuXG5mdW5jdGlvbiBkb1JlY29yZHNDb25mbGljdChcbiAgbG9jYWxSZWNvcmQ6IFJlY29yZENsYXNzT2JqZWN0LFxuICByZW1vdGVSZWNvcmQ6IFJlY29yZENsYXNzT2JqZWN0XG4pOiBIYXNDb25mbGljdFJlc3VsdFR5cGUge1xuICBjb25zdCBkZXRhaWxzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcblxuICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhyZW1vdGVSZWNvcmQpKSB7XG4gICAgY29uc3QgbG9jYWxWYWx1ZSA9IGxvY2FsUmVjb3JkW2tleV07XG4gICAgY29uc3QgcmVtb3RlVmFsdWUgPSByZW1vdGVSZWNvcmRba2V5XTtcblxuICAgIC8vIFNvbWV0aW1lcyB3ZSBoYXZlIGEgQnl0ZUJ1ZmZlciBhbmQgYW4gVWludDhBcnJheSwgdGhpcyBlbnN1cmVzIHRoYXQgd2VcbiAgICAvLyBhcmUgY29tcGFyaW5nIHRoZW0gYm90aCBlcXVhbGx5IGJ5IGNvbnZlcnRpbmcgdGhlbSBpbnRvIGJhc2U2NCBzdHJpbmcuXG4gICAgaWYgKGxvY2FsVmFsdWUgaW5zdGFuY2VvZiBVaW50OEFycmF5KSB7XG4gICAgICBjb25zdCBhcmVFcXVhbCA9IEJ5dGVzLmFyZUVxdWFsKGxvY2FsVmFsdWUsIHJlbW90ZVZhbHVlKTtcbiAgICAgIGlmICghYXJlRXF1YWwpIHtcbiAgICAgICAgZGV0YWlscy5wdXNoKGBrZXk9JHtrZXl9OiBkaWZmZXJlbnQgYnl0ZXNgKTtcbiAgICAgIH1cbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIC8vIElmIGJvdGggdHlwZXMgYXJlIExvbmcgd2UgY2FuIHVzZSBMb25nJ3MgZXF1YWxzIHRvIGNvbXBhcmUgdGhlbVxuICAgIGlmIChMb25nLmlzTG9uZyhsb2NhbFZhbHVlKSB8fCB0eXBlb2YgbG9jYWxWYWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIGlmICghTG9uZy5pc0xvbmcocmVtb3RlVmFsdWUpICYmIHR5cGVvZiByZW1vdGVWYWx1ZSAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgZGV0YWlscy5wdXNoKGBrZXk9JHtrZXl9OiB0eXBlIG1pc21hdGNoYCk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBhcmVFcXVhbCA9IExvbmcuZnJvbVZhbHVlKGxvY2FsVmFsdWUpLmVxdWFscyhcbiAgICAgICAgTG9uZy5mcm9tVmFsdWUocmVtb3RlVmFsdWUpXG4gICAgICApO1xuICAgICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgICBkZXRhaWxzLnB1c2goYGtleT0ke2tleX06IGRpZmZlcmVudCBpbnRlZ2Vyc2ApO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGtleSA9PT0gJ3Bpbm5lZENvbnZlcnNhdGlvbnMnKSB7XG4gICAgICBjb25zdCBhcmVFcXVhbCA9IGFyZVBpbm5lZENvbnZlcnNhdGlvbnNFcXVhbChsb2NhbFZhbHVlLCByZW1vdGVWYWx1ZSk7XG4gICAgICBpZiAoIWFyZUVxdWFsKSB7XG4gICAgICAgIGRldGFpbHMucHVzaCgncGlubmVkQ29udmVyc2F0aW9ucycpO1xuICAgICAgfVxuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKGxvY2FsVmFsdWUgPT09IHJlbW90ZVZhbHVlKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBTb21ldGltZXMgd2UgZ2V0IGBudWxsYCB2YWx1ZXMgZnJvbSBQcm90b2J1ZiBhbmQgdGhleSBzaG91bGQgZGVmYXVsdCB0b1xuICAgIC8vIGZhbHNlLCBlbXB0eSBzdHJpbmcsIG9yIDAgZm9yIHRoZXNlIHJlY29yZHMgd2UgZG8gbm90IGNvdW50IHRoZW0gYXNcbiAgICAvLyBjb25mbGljdGluZy5cbiAgICBpZiAoXG4gICAgICByZW1vdGVWYWx1ZSA9PT0gbnVsbCAmJlxuICAgICAgKGxvY2FsVmFsdWUgPT09IGZhbHNlIHx8XG4gICAgICAgIGxvY2FsVmFsdWUgPT09ICcnIHx8XG4gICAgICAgIGxvY2FsVmFsdWUgPT09IDAgfHxcbiAgICAgICAgKExvbmcuaXNMb25nKGxvY2FsVmFsdWUpICYmIGxvY2FsVmFsdWUudG9OdW1iZXIoKSA9PT0gMCkpXG4gICAgKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVFcXVhbCA9IGlzRXF1YWwobG9jYWxWYWx1ZSwgcmVtb3RlVmFsdWUpO1xuXG4gICAgaWYgKCFhcmVFcXVhbCkge1xuICAgICAgZGV0YWlscy5wdXNoKGBrZXk9JHtrZXl9OiBkaWZmZXJlbnQgdmFsdWVzYCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNDb25mbGljdDogZGV0YWlscy5sZW5ndGggPiAwLFxuICAgIGRldGFpbHMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGRvZXNSZWNvcmRIYXZlUGVuZGluZ0NoYW5nZXMoXG4gIG1lcmdlZFJlY29yZDogUmVjb3JkQ2xhc3MsXG4gIHNlcnZpY2VSZWNvcmQ6IFJlY29yZENsYXNzLFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBIYXNDb25mbGljdFJlc3VsdFR5cGUge1xuICBjb25zdCBzaG91bGRTeW5jID0gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCduZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYycpKTtcblxuICBpZiAoIXNob3VsZFN5bmMpIHtcbiAgICByZXR1cm4geyBoYXNDb25mbGljdDogZmFsc2UsIGRldGFpbHM6IFtdIH07XG4gIH1cblxuICBjb25zdCB7IGhhc0NvbmZsaWN0LCBkZXRhaWxzIH0gPSBkb1JlY29yZHNDb25mbGljdChcbiAgICBtZXJnZWRSZWNvcmQsXG4gICAgc2VydmljZVJlY29yZFxuICApO1xuXG4gIGlmICghaGFzQ29uZmxpY3QpIHtcbiAgICBjb252ZXJzYXRpb24uc2V0KHsgbmVlZHNTdG9yYWdlU2VydmljZVN5bmM6IGZhbHNlIH0pO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNDb25mbGljdCxcbiAgICBkZXRhaWxzLFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWVyZ2VHcm91cFYxUmVjb3JkKFxuICBzdG9yYWdlSUQ6IHN0cmluZyxcbiAgc3RvcmFnZVZlcnNpb246IG51bWJlcixcbiAgZ3JvdXBWMVJlY29yZDogUHJvdG8uSUdyb3VwVjFSZWNvcmRcbik6IFByb21pc2U8TWVyZ2VSZXN1bHRUeXBlPiB7XG4gIGlmICghZ3JvdXBWMVJlY29yZC5pZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gSUQgZm9yICR7c3RvcmFnZUlEfWApO1xuICB9XG5cbiAgY29uc3QgZ3JvdXBJZCA9IEJ5dGVzLnRvQmluYXJ5KGdyb3VwVjFSZWNvcmQuaWQpO1xuICBsZXQgZGV0YWlscyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG5cbiAgLy8gQXR0ZW1wdCB0byBmZXRjaCBhbiBleGlzdGluZyBncm91cCBwZXJ0YWluaW5nIHRvIHRoZSBgZ3JvdXBJZGAgb3IgY3JlYXRlXG4gIC8vIGEgbmV3IGdyb3VwIGFuZCBwb3B1bGF0ZSBpdCB3aXRoIHRoZSBhdHRyaWJ1dGVzIGZyb20gdGhlIHJlY29yZC5cbiAgbGV0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cElkKTtcblxuICAvLyBCZWNhdXNlIENvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0IHJldHJpZXZlcyBhbGwgdHlwZXMgb2YgcmVjb3JkcyB3ZVxuICAvLyBtYXkgc29tZXRpbWVzIGhhdmUgYSBzaXR1YXRpb24gd2hlcmUgd2UgZ2V0IGEgcmVjb3JkIG9mIGdyb3VwdjEgdHlwZVxuICAvLyB3aGVyZSB0aGUgYmluYXJ5IHJlcHJlc2VudGF0aW9uIG9mIGl0cyBJRCBtYXRjaGVzIGEgdjIgcmVjb3JkIGluIG1lbW9yeS5cbiAgLy8gSGVyZSB3ZSBlbnN1cmUgdGhhdCB0aGUgcmVjb3JkIHdlJ3JlIGFib3V0IHRvIHByb2Nlc3MgaXMgR1YxIG90aGVyd2lzZVxuICAvLyB3ZSBkcm9wIHRoZSB1cGRhdGUuXG4gIGlmIChjb252ZXJzYXRpb24gJiYgIWlzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgUmVjb3JkIGhhcyBncm91cCB0eXBlIG1pc21hdGNoICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICApO1xuICB9XG5cbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAvLyBJdCdzIHBvc3NpYmxlIHRoaXMgZ3JvdXAgd2FzIG1pZ3JhdGVkIHRvIGEgR1YyIGlmIHNvIHdlIGF0dGVtcHQgdG9cbiAgICAvLyByZXRyaWV2ZSB0aGUgbWFzdGVyIGtleSBhbmQgZmluZCB0aGUgY29udmVyc2F0aW9uIGxvY2FsbHkuIElmIHdlXG4gICAgLy8gYXJlIHN1Y2Nlc3NmdWwgdGhlbiB3ZSBjb250aW51ZSBzZXR0aW5nIGFuZCBhcHBseWluZyBzdGF0ZS5cbiAgICBjb25zdCBtYXN0ZXJLZXlCdWZmZXIgPSBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShncm91cFYxUmVjb3JkLmlkKTtcbiAgICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuICAgIGNvbnN0IGRlcml2ZWRHcm91cFYySWQgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuaWQpO1xuXG4gICAgZGV0YWlscy5wdXNoKFxuICAgICAgJ2ZhaWxlZCB0byBmaW5kIGdyb3VwIGJ5IHYxIGlkICcgK1xuICAgICAgICBgYXR0ZW1wdGluZyBsb29rdXAgYnkgdjIgZ3JvdXB2Migke2Rlcml2ZWRHcm91cFYySWR9KWBcbiAgICApO1xuICAgIGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChkZXJpdmVkR3JvdXBWMklkKTtcbiAgfVxuICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgIGlmIChncm91cFYxUmVjb3JkLmlkLmJ5dGVMZW5ndGggIT09IDE2KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBhIHZhbGlkIGd2MScpO1xuICAgIH1cblxuICAgIGNvbnZlcnNhdGlvbiA9IGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlQW5kV2FpdChcbiAgICAgIGdyb3VwSWQsXG4gICAgICAnZ3JvdXAnXG4gICAgKTtcbiAgICBkZXRhaWxzLnB1c2goJ2NyZWF0ZWQgYSBuZXcgZ3JvdXAgbG9jYWxseScpO1xuICB9XG5cbiAgY29uc3Qgb2xkU3RvcmFnZUlEID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZUlEJyk7XG4gIGNvbnN0IG9sZFN0b3JhZ2VWZXJzaW9uID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKTtcblxuICBpZiAoIWlzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICBkZXRhaWxzLnB1c2goJ0dWMSByZWNvcmQgZm9yIEdWMiBncm91cCwgZHJvcHBpbmcnKTtcblxuICAgIHJldHVybiB7XG4gICAgICAvLyBOb3RlOiBjb25mbGljdHMgY2F1c2UgaW1tZWRpYXRlIHVwbG9hZHMsIGJ1dCB3ZSBzaG91bGQgdXBsb2FkXG4gICAgICAvLyBvbmx5IGluIHJlc3BvbnNlIHRvIHVzZXIncyBhY3Rpb24uXG4gICAgICBoYXNDb25mbGljdDogZmFsc2UsXG4gICAgICBzaG91bGREcm9wOiB0cnVlLFxuICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgb2xkU3RvcmFnZUlELFxuICAgICAgb2xkU3RvcmFnZVZlcnNpb24sXG4gICAgICBkZXRhaWxzLFxuICAgIH07XG4gIH1cblxuICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICBpc0FyY2hpdmVkOiBCb29sZWFuKGdyb3VwVjFSZWNvcmQuYXJjaGl2ZWQpLFxuICAgIG1hcmtlZFVucmVhZDogQm9vbGVhbihncm91cFYxUmVjb3JkLm1hcmtlZFVucmVhZCksXG4gICAgc3RvcmFnZUlELFxuICAgIHN0b3JhZ2VWZXJzaW9uLFxuICB9KTtcblxuICBjb252ZXJzYXRpb24uc2V0TXV0ZUV4cGlyYXRpb24oXG4gICAgZ2V0VGltZXN0YW1wRnJvbUxvbmcoZ3JvdXBWMVJlY29yZC5tdXRlZFVudGlsVGltZXN0YW1wKSxcbiAgICB7XG4gICAgICB2aWFTdG9yYWdlU2VydmljZVN5bmM6IHRydWUsXG4gICAgfVxuICApO1xuXG4gIGFwcGx5TWVzc2FnZVJlcXVlc3RTdGF0ZShncm91cFYxUmVjb3JkLCBjb252ZXJzYXRpb24pO1xuXG4gIGxldCBoYXNQZW5kaW5nQ2hhbmdlczogYm9vbGVhbjtcblxuICBpZiAoaXNHcm91cFYxKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgIGFkZFVua25vd25GaWVsZHMoZ3JvdXBWMVJlY29yZCwgY29udmVyc2F0aW9uLCBkZXRhaWxzKTtcblxuICAgIGNvbnN0IHsgaGFzQ29uZmxpY3QsIGRldGFpbHM6IGV4dHJhRGV0YWlscyB9ID0gZG9lc1JlY29yZEhhdmVQZW5kaW5nQ2hhbmdlcyhcbiAgICAgIHRvR3JvdXBWMVJlY29yZChjb252ZXJzYXRpb24pLFxuICAgICAgZ3JvdXBWMVJlY29yZCxcbiAgICAgIGNvbnZlcnNhdGlvblxuICAgICk7XG5cbiAgICBkZXRhaWxzID0gZGV0YWlscy5jb25jYXQoZXh0cmFEZXRhaWxzKTtcbiAgICBoYXNQZW5kaW5nQ2hhbmdlcyA9IGhhc0NvbmZsaWN0O1xuICB9IGVsc2Uge1xuICAgIC8vIFdlIGNhbm5vdCBwcmVzZXJ2ZSB1bmtub3duIGZpZWxkcyBpZiBsb2NhbCBncm91cCBpcyBWMiBhbmQgdGhlIHJlbW90ZSBpc1xuICAgIC8vIHN0aWxsIFYxLCBiZWNhdXNlIHRoZSBzdG9yYWdlSXRlbSB0aGF0IHdlJ2xsIHB1dCBpbnRvIG1hbmlmZXN0IHdpbGwgaGF2ZVxuICAgIC8vIGEgZGlmZmVyZW50IHJlY29yZCB0eXBlLlxuXG4gICAgLy8gV2Ugd2FudCB0byB1cGdyYWRlIGdyb3VwIGluIHRoZSBzdG9yYWdlIGFmdGVyIG1lcmdpbmcgaXQuXG4gICAgaGFzUGVuZGluZ0NoYW5nZXMgPSB0cnVlO1xuICAgIGRldGFpbHMucHVzaCgnbWFya2luZyB2MSBncm91cCBmb3IgYW4gdXBkYXRlIHRvIHYyJyk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGhhc0NvbmZsaWN0OiBoYXNQZW5kaW5nQ2hhbmdlcyxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgb2xkU3RvcmFnZUlELFxuICAgIG9sZFN0b3JhZ2VWZXJzaW9uLFxuICAgIGRldGFpbHMsXG4gICAgdXBkYXRlZENvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb25dLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRHcm91cFYyQ29udmVyc2F0aW9uKFxuICBtYXN0ZXJLZXlCdWZmZXI6IFVpbnQ4QXJyYXlcbik6IENvbnZlcnNhdGlvbk1vZGVsIHtcbiAgY29uc3QgZ3JvdXBGaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gIGNvbnN0IGdyb3VwSWQgPSBCeXRlcy50b0Jhc2U2NChncm91cEZpZWxkcy5pZCk7XG4gIGNvbnN0IG1hc3RlcktleSA9IEJ5dGVzLnRvQmFzZTY0KG1hc3RlcktleUJ1ZmZlcik7XG4gIGNvbnN0IHNlY3JldFBhcmFtcyA9IEJ5dGVzLnRvQmFzZTY0KGdyb3VwRmllbGRzLnNlY3JldFBhcmFtcyk7XG4gIGNvbnN0IHB1YmxpY1BhcmFtcyA9IEJ5dGVzLnRvQmFzZTY0KGdyb3VwRmllbGRzLnB1YmxpY1BhcmFtcyk7XG5cbiAgLy8gRmlyc3Qgd2UgY2hlY2sgZm9yIGFuIGV4aXN0aW5nIEdyb3VwVjIgZ3JvdXBcbiAgY29uc3QgZ3JvdXBWMiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cElkKTtcbiAgaWYgKGdyb3VwVjIpIHtcbiAgICBncm91cFYyLm1heWJlUmVwYWlyR3JvdXBWMih7XG4gICAgICBtYXN0ZXJLZXksXG4gICAgICBzZWNyZXRQYXJhbXMsXG4gICAgICBwdWJsaWNQYXJhbXMsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gZ3JvdXBWMjtcbiAgfVxuXG4gIC8vIFRoZW4gY2hlY2sgZm9yIFYxIGdyb3VwIHdpdGggbWF0Y2hpbmcgZGVyaXZlZCBHVjIgaWRcbiAgY29uc3QgZ3JvdXBWMSA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldEJ5RGVyaXZlZEdyb3VwVjJJZChncm91cElkKTtcbiAgaWYgKGdyb3VwVjEpIHtcbiAgICByZXR1cm4gZ3JvdXBWMTtcbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlR3JvdXAoZ3JvdXBJZCwge1xuICAgIC8vIE5vdGU6IFdlIGRvbid0IHNldCBhY3RpdmVfYXQsIGJlY2F1c2Ugd2UgZG9uJ3Qgd2FudCB0aGUgZ3JvdXAgdG8gc2hvdyB1bnRpbFxuICAgIC8vICAgd2UgaGF2ZSBpbmZvcm1hdGlvbiBhYm91dCBpdCBiZXlvbmQgdGhlc2UgaW5pdGlhbCBkZXRhaWxzLlxuICAgIC8vICAgc2VlIG1heWJlVXBkYXRlR3JvdXAoKS5cbiAgICBncm91cFZlcnNpb246IDIsXG4gICAgbWFzdGVyS2V5LFxuICAgIHNlY3JldFBhcmFtcyxcbiAgICBwdWJsaWNQYXJhbXMsXG4gIH0pO1xuICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBnZXRHcm91cFYyQ29udmVyc2F0aW9uOiBGYWlsZWQgdG8gY3JlYXRlIGNvbnZlcnNhdGlvbiBmb3IgZ3JvdXB2Migke2dyb3VwSWR9KWBcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIGNvbnZlcnNhdGlvbjtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1lcmdlR3JvdXBWMlJlY29yZChcbiAgc3RvcmFnZUlEOiBzdHJpbmcsXG4gIHN0b3JhZ2VWZXJzaW9uOiBudW1iZXIsXG4gIGdyb3VwVjJSZWNvcmQ6IFByb3RvLklHcm91cFYyUmVjb3JkXG4pOiBQcm9taXNlPE1lcmdlUmVzdWx0VHlwZT4ge1xuICBpZiAoIWdyb3VwVjJSZWNvcmQubWFzdGVyS2V5KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBObyBtYXN0ZXIga2V5IGZvciAke3N0b3JhZ2VJRH1gKTtcbiAgfVxuXG4gIGNvbnN0IG1hc3RlcktleUJ1ZmZlciA9IGdyb3VwVjJSZWNvcmQubWFzdGVyS2V5O1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXRHcm91cFYyQ29udmVyc2F0aW9uKG1hc3RlcktleUJ1ZmZlcik7XG5cbiAgY29uc3Qgb2xkU3RvcmFnZUlEID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZUlEJyk7XG4gIGNvbnN0IG9sZFN0b3JhZ2VWZXJzaW9uID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKTtcblxuICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICBoaWRlU3Rvcnk6IEJvb2xlYW4oZ3JvdXBWMlJlY29yZC5oaWRlU3RvcnkpLFxuICAgIGlzQXJjaGl2ZWQ6IEJvb2xlYW4oZ3JvdXBWMlJlY29yZC5hcmNoaXZlZCksXG4gICAgbWFya2VkVW5yZWFkOiBCb29sZWFuKGdyb3VwVjJSZWNvcmQubWFya2VkVW5yZWFkKSxcbiAgICBkb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkOiBCb29sZWFuKFxuICAgICAgZ3JvdXBWMlJlY29yZC5kb250Tm90aWZ5Rm9yTWVudGlvbnNJZk11dGVkXG4gICAgKSxcbiAgICBzdG9yYWdlSUQsXG4gICAgc3RvcmFnZVZlcnNpb24sXG4gIH0pO1xuXG4gIGNvbnZlcnNhdGlvbi5zZXRNdXRlRXhwaXJhdGlvbihcbiAgICBnZXRUaW1lc3RhbXBGcm9tTG9uZyhncm91cFYyUmVjb3JkLm11dGVkVW50aWxUaW1lc3RhbXApLFxuICAgIHtcbiAgICAgIHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgYXBwbHlNZXNzYWdlUmVxdWVzdFN0YXRlKGdyb3VwVjJSZWNvcmQsIGNvbnZlcnNhdGlvbik7XG5cbiAgbGV0IGRldGFpbHMgPSBuZXcgQXJyYXk8c3RyaW5nPigpO1xuXG4gIGFkZFVua25vd25GaWVsZHMoZ3JvdXBWMlJlY29yZCwgY29udmVyc2F0aW9uLCBkZXRhaWxzKTtcblxuICBjb25zdCB7IGhhc0NvbmZsaWN0LCBkZXRhaWxzOiBleHRyYURldGFpbHMgfSA9IGRvZXNSZWNvcmRIYXZlUGVuZGluZ0NoYW5nZXMoXG4gICAgdG9Hcm91cFYyUmVjb3JkKGNvbnZlcnNhdGlvbiksXG4gICAgZ3JvdXBWMlJlY29yZCxcbiAgICBjb252ZXJzYXRpb25cbiAgKTtcblxuICBkZXRhaWxzID0gZGV0YWlscy5jb25jYXQoZXh0cmFEZXRhaWxzKTtcblxuICBjb25zdCBpc0dyb3VwTmV3VG9VcyA9ICFpc051bWJlcihjb252ZXJzYXRpb24uZ2V0KCdyZXZpc2lvbicpKTtcbiAgY29uc3QgaXNGaXJzdFN5bmMgPSAhd2luZG93LnN0b3JhZ2UuZ2V0KCdzdG9yYWdlRmV0Y2hDb21wbGV0ZScpO1xuICBjb25zdCBkcm9wSW5pdGlhbEpvaW5NZXNzYWdlID0gaXNGaXJzdFN5bmM7XG5cbiAgaWYgKGlzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAvLyBJZiB3ZSBmb3VuZCBhIEdyb3VwVjEgY29udmVyc2F0aW9uIGZyb20gdGhpcyBpbmNvbWluZyBHcm91cFYyIHJlY29yZCwgd2UgbmVlZCB0b1xuICAgIC8vICAgbWlncmF0ZSBpdCFcblxuICAgIC8vIFdlIGRvbid0IGF3YWl0IHRoaXMgYmVjYXVzZSB0aGlzIGNvdWxkIHRha2UgYSB2ZXJ5IGxvbmcgdGltZSwgd2FpdGluZyBmb3IgcXVldWVzIHRvXG4gICAgLy8gICBlbXB0eSwgZXRjLlxuICAgIHdhaXRUaGVuUmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbih7XG4gICAgICBjb252ZXJzYXRpb24sXG4gICAgfSk7XG4gIH0gZWxzZSBpZiAoaXNHcm91cE5ld1RvVXMpIHtcbiAgICAvLyBXZSBkb24ndCBuZWVkIHRvIHVwZGF0ZSBHcm91cFYyIGdyb3VwcyBhbGwgdGhlIHRpbWUuIFdlIGZldGNoIGdyb3VwIHN0YXRlIHRoZSBmaXJzdFxuICAgIC8vICAgdGltZSB3ZSBoZWFyIGFib3V0IHRoZXNlIGdyb3VwcywgZnJvbSB0aGVuIG9uIHdlIHJlbHkgb24gaW5jb21pbmcgbWVzc2FnZXMgb3JcbiAgICAvLyAgIHRoZSB1c2VyIG9wZW5pbmcgdGhhdCBjb252ZXJzYXRpb24uXG5cbiAgICAvLyBXZSBkb24ndCBhd2FpdCB0aGlzIGJlY2F1c2UgdGhpcyBjb3VsZCB0YWtlIGEgdmVyeSBsb25nIHRpbWUsIHdhaXRpbmcgZm9yIHF1ZXVlcyB0b1xuICAgIC8vICAgZW1wdHksIGV0Yy5cbiAgICB3YWl0VGhlbk1heWJlVXBkYXRlR3JvdXAoXG4gICAgICB7XG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgZHJvcEluaXRpYWxKb2luTWVzc2FnZSxcbiAgICAgIH0sXG4gICAgICB7IHZpYUZpcnN0U3RvcmFnZVN5bmM6IGlzRmlyc3RTeW5jIH1cbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNDb25mbGljdCxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgdXBkYXRlZENvbnZlcnNhdGlvbnM6IFtjb252ZXJzYXRpb25dLFxuICAgIG9sZFN0b3JhZ2VJRCxcbiAgICBvbGRTdG9yYWdlVmVyc2lvbixcbiAgICBkZXRhaWxzLFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbWVyZ2VDb250YWN0UmVjb3JkKFxuICBzdG9yYWdlSUQ6IHN0cmluZyxcbiAgc3RvcmFnZVZlcnNpb246IG51bWJlcixcbiAgb3JpZ2luYWxDb250YWN0UmVjb3JkOiBQcm90by5JQ29udGFjdFJlY29yZFxuKTogUHJvbWlzZTxNZXJnZVJlc3VsdFR5cGU+IHtcbiAgY29uc3QgY29udGFjdFJlY29yZCA9IHtcbiAgICAuLi5vcmlnaW5hbENvbnRhY3RSZWNvcmQsXG5cbiAgICBzZXJ2aWNlVXVpZDogb3JpZ2luYWxDb250YWN0UmVjb3JkLnNlcnZpY2VVdWlkXG4gICAgICA/IG5vcm1hbGl6ZVV1aWQoXG4gICAgICAgICAgb3JpZ2luYWxDb250YWN0UmVjb3JkLnNlcnZpY2VVdWlkLFxuICAgICAgICAgICdDb250YWN0UmVjb3JkLnNlcnZpY2VVdWlkJ1xuICAgICAgICApXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfTtcblxuICBjb25zdCBlMTY0ID0gZHJvcE51bGwoY29udGFjdFJlY29yZC5zZXJ2aWNlRTE2NCk7XG4gIGNvbnN0IHV1aWQgPSBkcm9wTnVsbChjb250YWN0UmVjb3JkLnNlcnZpY2VVdWlkKTtcblxuICAvLyBBbGwgY29udGFjdHMgbXVzdCBoYXZlIFVVSURcbiAgaWYgKCF1dWlkKSB7XG4gICAgcmV0dXJuIHsgaGFzQ29uZmxpY3Q6IGZhbHNlLCBzaG91bGREcm9wOiB0cnVlLCBkZXRhaWxzOiBbJ25vIHV1aWQnXSB9O1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXVpZCh1dWlkKSkge1xuICAgIHJldHVybiB7IGhhc0NvbmZsaWN0OiBmYWxzZSwgc2hvdWxkRHJvcDogdHJ1ZSwgZGV0YWlsczogWydpbnZhbGlkIHV1aWQnXSB9O1xuICB9XG5cbiAgaWYgKHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0T3VyVXVpZEtpbmQobmV3IFVVSUQodXVpZCkpICE9PSBVVUlES2luZC5Vbmtub3duKSB7XG4gICAgcmV0dXJuIHsgaGFzQ29uZmxpY3Q6IGZhbHNlLCBzaG91bGREcm9wOiB0cnVlLCBkZXRhaWxzOiBbJ291ciBvd24gdXVpZCddIH07XG4gIH1cblxuICBjb25zdCBpZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgIGUxNjQsXG4gICAgdXVpZCxcbiAgICBoaWdoVHJ1c3Q6IHRydWUsXG4gICAgcmVhc29uOiAnbWVyZ2VDb250YWN0UmVjb3JkJyxcbiAgfSk7XG5cbiAgaWYgKCFpZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgTm8gSUQgZm9yICR7c3RvcmFnZUlEfWApO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGVBbmRXYWl0KFxuICAgIGlkLFxuICAgICdwcml2YXRlJ1xuICApO1xuXG4gIGxldCBuZWVkc1Byb2ZpbGVGZXRjaCA9IGZhbHNlO1xuICBpZiAoY29udGFjdFJlY29yZC5wcm9maWxlS2V5ICYmIGNvbnRhY3RSZWNvcmQucHJvZmlsZUtleS5sZW5ndGggPiAwKSB7XG4gICAgbmVlZHNQcm9maWxlRmV0Y2ggPSBhd2FpdCBjb252ZXJzYXRpb24uc2V0UHJvZmlsZUtleShcbiAgICAgIEJ5dGVzLnRvQmFzZTY0KGNvbnRhY3RSZWNvcmQucHJvZmlsZUtleSksXG4gICAgICB7IHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSB9XG4gICAgKTtcbiAgfVxuXG4gIGxldCBkZXRhaWxzID0gbmV3IEFycmF5PHN0cmluZz4oKTtcbiAgY29uc3QgcmVtb3RlTmFtZSA9IGRyb3BOdWxsKGNvbnRhY3RSZWNvcmQuZ2l2ZW5OYW1lKTtcbiAgY29uc3QgcmVtb3RlRmFtaWx5TmFtZSA9IGRyb3BOdWxsKGNvbnRhY3RSZWNvcmQuZmFtaWx5TmFtZSk7XG4gIGNvbnN0IGxvY2FsTmFtZSA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVOYW1lJyk7XG4gIGNvbnN0IGxvY2FsRmFtaWx5TmFtZSA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVGYW1pbHlOYW1lJyk7XG4gIGlmIChcbiAgICByZW1vdGVOYW1lICYmXG4gICAgKGxvY2FsTmFtZSAhPT0gcmVtb3RlTmFtZSB8fCBsb2NhbEZhbWlseU5hbWUgIT09IHJlbW90ZUZhbWlseU5hbWUpXG4gICkge1xuICAgIC8vIExvY2FsIG5hbWUgZG9lc24ndCBtYXRjaCByZW1vdGUgbmFtZSwgZmV0Y2ggcHJvZmlsZVxuICAgIGlmIChsb2NhbE5hbWUpIHtcbiAgICAgIGNvbnZlcnNhdGlvbi5nZXRQcm9maWxlcygpO1xuICAgICAgZGV0YWlscy5wdXNoKCdyZWZyZXNoaW5nIHByb2ZpbGUnKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgIHByb2ZpbGVOYW1lOiByZW1vdGVOYW1lLFxuICAgICAgICBwcm9maWxlRmFtaWx5TmFtZTogcmVtb3RlRmFtaWx5TmFtZSxcbiAgICAgIH0pO1xuICAgICAgZGV0YWlscy5wdXNoKCd1cGRhdGVkIHByb2ZpbGUgbmFtZScpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChjb250YWN0UmVjb3JkLmlkZW50aXR5S2V5KSB7XG4gICAgY29uc3QgdmVyaWZpZWQgPSBhd2FpdCBjb252ZXJzYXRpb24uc2FmZUdldFZlcmlmaWVkKCk7XG4gICAgY29uc3Qgc3RvcmFnZVNlcnZpY2VWZXJpZmllZCA9IGNvbnRhY3RSZWNvcmQuaWRlbnRpdHlTdGF0ZSB8fCAwO1xuICAgIGNvbnN0IHZlcmlmaWVkT3B0aW9ucyA9IHtcbiAgICAgIGtleTogY29udGFjdFJlY29yZC5pZGVudGl0eUtleSxcbiAgICAgIHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSxcbiAgICB9O1xuICAgIGNvbnN0IFNUQVRFX0VOVU0gPSBQcm90by5Db250YWN0UmVjb3JkLklkZW50aXR5U3RhdGU7XG5cbiAgICBpZiAodmVyaWZpZWQgIT09IHN0b3JhZ2VTZXJ2aWNlVmVyaWZpZWQpIHtcbiAgICAgIGRldGFpbHMucHVzaChgdXBkYXRpbmcgdmVyaWZpZWQgc3RhdGUgdG89JHt2ZXJpZmllZH1gKTtcbiAgICB9XG5cbiAgICAvLyBVcGRhdGUgdmVyaWZpZWQgc3RhdHVzIHVuY29uZGl0aW9uYWxseSB0byBtYWtlIHN1cmUgd2Ugd2lsbCB0YWtlIHRoZVxuICAgIC8vIGxhdGVzdCBpZGVudGl0eSBrZXkgZnJvbSB0aGUgbWFuaWZlc3QuXG4gICAgbGV0IGtleUNoYW5nZTogYm9vbGVhbjtcbiAgICBzd2l0Y2ggKHN0b3JhZ2VTZXJ2aWNlVmVyaWZpZWQpIHtcbiAgICAgIGNhc2UgU1RBVEVfRU5VTS5WRVJJRklFRDpcbiAgICAgICAga2V5Q2hhbmdlID0gYXdhaXQgY29udmVyc2F0aW9uLnNldFZlcmlmaWVkKHZlcmlmaWVkT3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBTVEFURV9FTlVNLlVOVkVSSUZJRUQ6XG4gICAgICAgIGtleUNoYW5nZSA9IGF3YWl0IGNvbnZlcnNhdGlvbi5zZXRVbnZlcmlmaWVkKHZlcmlmaWVkT3B0aW9ucyk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAga2V5Q2hhbmdlID0gYXdhaXQgY29udmVyc2F0aW9uLnNldFZlcmlmaWVkRGVmYXVsdCh2ZXJpZmllZE9wdGlvbnMpO1xuICAgIH1cblxuICAgIGlmIChrZXlDaGFuZ2UpIHtcbiAgICAgIGRldGFpbHMucHVzaCgna2V5IGNoYW5nZWQnKTtcbiAgICB9XG4gIH1cblxuICBhcHBseU1lc3NhZ2VSZXF1ZXN0U3RhdGUoY29udGFjdFJlY29yZCwgY29udmVyc2F0aW9uKTtcblxuICBhZGRVbmtub3duRmllbGRzKGNvbnRhY3RSZWNvcmQsIGNvbnZlcnNhdGlvbiwgZGV0YWlscyk7XG5cbiAgY29uc3Qgb2xkU3RvcmFnZUlEID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZUlEJyk7XG4gIGNvbnN0IG9sZFN0b3JhZ2VWZXJzaW9uID0gY29udmVyc2F0aW9uLmdldCgnc3RvcmFnZVZlcnNpb24nKTtcblxuICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICBoaWRlU3Rvcnk6IEJvb2xlYW4oY29udGFjdFJlY29yZC5oaWRlU3RvcnkpLFxuICAgIGlzQXJjaGl2ZWQ6IEJvb2xlYW4oY29udGFjdFJlY29yZC5hcmNoaXZlZCksXG4gICAgbWFya2VkVW5yZWFkOiBCb29sZWFuKGNvbnRhY3RSZWNvcmQubWFya2VkVW5yZWFkKSxcbiAgICBzdG9yYWdlSUQsXG4gICAgc3RvcmFnZVZlcnNpb24sXG4gIH0pO1xuXG4gIGNvbnZlcnNhdGlvbi5zZXRNdXRlRXhwaXJhdGlvbihcbiAgICBnZXRUaW1lc3RhbXBGcm9tTG9uZyhjb250YWN0UmVjb3JkLm11dGVkVW50aWxUaW1lc3RhbXApLFxuICAgIHtcbiAgICAgIHZpYVN0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgY29uc3QgeyBoYXNDb25mbGljdCwgZGV0YWlsczogZXh0cmFEZXRhaWxzIH0gPSBkb2VzUmVjb3JkSGF2ZVBlbmRpbmdDaGFuZ2VzKFxuICAgIGF3YWl0IHRvQ29udGFjdFJlY29yZChjb252ZXJzYXRpb24pLFxuICAgIGNvbnRhY3RSZWNvcmQsXG4gICAgY29udmVyc2F0aW9uXG4gICk7XG4gIGRldGFpbHMgPSBkZXRhaWxzLmNvbmNhdChleHRyYURldGFpbHMpO1xuXG4gIHJldHVybiB7XG4gICAgaGFzQ29uZmxpY3QsXG4gICAgY29udmVyc2F0aW9uLFxuICAgIHVwZGF0ZWRDb252ZXJzYXRpb25zOiBbY29udmVyc2F0aW9uXSxcbiAgICBuZWVkc1Byb2ZpbGVGZXRjaCxcbiAgICBvbGRTdG9yYWdlSUQsXG4gICAgb2xkU3RvcmFnZVZlcnNpb24sXG4gICAgZGV0YWlscyxcbiAgfTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG1lcmdlQWNjb3VudFJlY29yZChcbiAgc3RvcmFnZUlEOiBzdHJpbmcsXG4gIHN0b3JhZ2VWZXJzaW9uOiBudW1iZXIsXG4gIGFjY291bnRSZWNvcmQ6IFByb3RvLklBY2NvdW50UmVjb3JkXG4pOiBQcm9taXNlPE1lcmdlUmVzdWx0VHlwZT4ge1xuICBsZXQgZGV0YWlscyA9IG5ldyBBcnJheTxzdHJpbmc+KCk7XG4gIGNvbnN0IHtcbiAgICBsaW5rUHJldmlld3MsXG4gICAgbm90RGlzY292ZXJhYmxlQnlQaG9uZU51bWJlcixcbiAgICBub3RlVG9TZWxmQXJjaGl2ZWQsXG4gICAgbm90ZVRvU2VsZk1hcmtlZFVucmVhZCxcbiAgICBwaG9uZU51bWJlclNoYXJpbmdNb2RlLFxuICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgcHJvZmlsZUtleSxcbiAgICByZWFkUmVjZWlwdHMsXG4gICAgc2VhbGVkU2VuZGVySW5kaWNhdG9ycyxcbiAgICB0eXBpbmdJbmRpY2F0b3JzLFxuICAgIHByZWZlckNvbnRhY3RBdmF0YXJzLFxuICAgIHByaW1hcnlTZW5kc1NtcyxcbiAgICB1bml2ZXJzYWxFeHBpcmVUaW1lcixcbiAgICBlMTY0OiBhY2NvdW50RTE2NCxcbiAgICBwcmVmZXJyZWRSZWFjdGlvbkVtb2ppOiByYXdQcmVmZXJyZWRSZWFjdGlvbkVtb2ppLFxuICAgIHN1YnNjcmliZXJJZCxcbiAgICBzdWJzY3JpYmVyQ3VycmVuY3lDb2RlLFxuICAgIGRpc3BsYXlCYWRnZXNPblByb2ZpbGUsXG4gICAga2VlcE11dGVkQ2hhdHNBcmNoaXZlZCxcbiAgfSA9IGFjY291bnRSZWNvcmQ7XG5cbiAgY29uc3QgdXBkYXRlZENvbnZlcnNhdGlvbnMgPSBuZXcgQXJyYXk8Q29udmVyc2F0aW9uTW9kZWw+KCk7XG5cbiAgd2luZG93LnN0b3JhZ2UucHV0KCdyZWFkLXJlY2VpcHQtc2V0dGluZycsIEJvb2xlYW4ocmVhZFJlY2VpcHRzKSk7XG5cbiAgaWYgKHR5cGVvZiBzZWFsZWRTZW5kZXJJbmRpY2F0b3JzID09PSAnYm9vbGVhbicpIHtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ3NlYWxlZFNlbmRlckluZGljYXRvcnMnLCBzZWFsZWRTZW5kZXJJbmRpY2F0b3JzKTtcbiAgfVxuXG4gIGlmICh0eXBlb2YgdHlwaW5nSW5kaWNhdG9ycyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCd0eXBpbmdJbmRpY2F0b3JzJywgdHlwaW5nSW5kaWNhdG9ycyk7XG4gIH1cblxuICBpZiAodHlwZW9mIGxpbmtQcmV2aWV3cyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdsaW5rUHJldmlld3MnLCBsaW5rUHJldmlld3MpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBwcmVmZXJDb250YWN0QXZhdGFycyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgY29uc3QgcHJldmlvdXMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ByZWZlckNvbnRhY3RBdmF0YXJzJyk7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdwcmVmZXJDb250YWN0QXZhdGFycycsIHByZWZlckNvbnRhY3RBdmF0YXJzKTtcblxuICAgIGlmIChCb29sZWFuKHByZXZpb3VzKSAhPT0gQm9vbGVhbihwcmVmZXJDb250YWN0QXZhdGFycykpIHtcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmZvcmNlUmVyZW5kZXIoKTtcbiAgICB9XG4gIH1cblxuICBpZiAodHlwZW9mIHByaW1hcnlTZW5kc1NtcyA9PT0gJ2Jvb2xlYW4nKSB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdwcmltYXJ5U2VuZHNTbXMnLCBwcmltYXJ5U2VuZHNTbXMpO1xuICB9XG5cbiAgaWYgKHR5cGVvZiBhY2NvdW50RTE2NCA9PT0gJ3N0cmluZycgJiYgYWNjb3VudEUxNjQpIHtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2FjY291bnRFMTY0JywgYWNjb3VudEUxNjQpO1xuICAgIHdpbmRvdy5zdG9yYWdlLnVzZXIuc2V0TnVtYmVyKGFjY291bnRFMTY0KTtcbiAgfVxuXG4gIGlmIChwcmVmZXJyZWRSZWFjdGlvbkVtb2ppLmNhbkJlU3luY2VkKHJhd1ByZWZlcnJlZFJlYWN0aW9uRW1vamkpKSB7XG4gICAgY29uc3QgbG9jYWxQcmVmZXJyZWRSZWFjdGlvbkVtb2ppID1cbiAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgncHJlZmVycmVkUmVhY3Rpb25FbW9qaScpIHx8IFtdO1xuICAgIGlmICghaXNFcXVhbChsb2NhbFByZWZlcnJlZFJlYWN0aW9uRW1vamksIHJhd1ByZWZlcnJlZFJlYWN0aW9uRW1vamkpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgJ3N0b3JhZ2VTZXJ2aWNlOiByZW1vdGUgYW5kIGxvY2FsIHByZWZlcnJlZFJlYWN0aW9uRW1vamkgZG8gbm90IG1hdGNoJyxcbiAgICAgICAgbG9jYWxQcmVmZXJyZWRSZWFjdGlvbkVtb2ppLmxlbmd0aCxcbiAgICAgICAgcmF3UHJlZmVycmVkUmVhY3Rpb25FbW9qaS5sZW5ndGhcbiAgICAgICk7XG4gICAgfVxuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgncHJlZmVycmVkUmVhY3Rpb25FbW9qaScsIHJhd1ByZWZlcnJlZFJlYWN0aW9uRW1vamkpO1xuICB9XG5cbiAgc2V0VW5pdmVyc2FsRXhwaXJlVGltZXIodW5pdmVyc2FsRXhwaXJlVGltZXIgfHwgMCk7XG5cbiAgY29uc3QgUEhPTkVfTlVNQkVSX1NIQVJJTkdfTU9ERV9FTlVNID1cbiAgICBQcm90by5BY2NvdW50UmVjb3JkLlBob25lTnVtYmVyU2hhcmluZ01vZGU7XG4gIGxldCBwaG9uZU51bWJlclNoYXJpbmdNb2RlVG9TdG9yZTogUGhvbmVOdW1iZXJTaGFyaW5nTW9kZTtcbiAgc3dpdGNoIChwaG9uZU51bWJlclNoYXJpbmdNb2RlKSB7XG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgY2FzZSBudWxsOlxuICAgIGNhc2UgUEhPTkVfTlVNQkVSX1NIQVJJTkdfTU9ERV9FTlVNLkVWRVJZQk9EWTpcbiAgICAgIHBob25lTnVtYmVyU2hhcmluZ01vZGVUb1N0b3JlID0gUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5FdmVyeWJvZHk7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFBIT05FX05VTUJFUl9TSEFSSU5HX01PREVfRU5VTS5DT05UQUNUU19PTkxZOlxuICAgICAgcGhvbmVOdW1iZXJTaGFyaW5nTW9kZVRvU3RvcmUgPSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLkNvbnRhY3RzT25seTtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgUEhPTkVfTlVNQkVSX1NIQVJJTkdfTU9ERV9FTlVNLk5PQk9EWTpcbiAgICAgIHBob25lTnVtYmVyU2hhcmluZ01vZGVUb1N0b3JlID0gUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5Ob2JvZHk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgYXNzZXJ0KFxuICAgICAgICBmYWxzZSxcbiAgICAgICAgYHN0b3JhZ2VTZXJ2aWNlLm1lcmdlQWNjb3VudFJlY29yZDogR290IGFuIHVuZXhwZWN0ZWQgcGhvbmUgbnVtYmVyIHNoYXJpbmcgbW9kZTogJHtwaG9uZU51bWJlclNoYXJpbmdNb2RlfS4gRmFsbGluZyBiYWNrIHRvIGRlZmF1bHRgXG4gICAgICApO1xuICAgICAgcGhvbmVOdW1iZXJTaGFyaW5nTW9kZVRvU3RvcmUgPSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLkV2ZXJ5Ym9keTtcbiAgICAgIGJyZWFrO1xuICB9XG4gIHdpbmRvdy5zdG9yYWdlLnB1dCgncGhvbmVOdW1iZXJTaGFyaW5nTW9kZScsIHBob25lTnVtYmVyU2hhcmluZ01vZGVUb1N0b3JlKTtcblxuICBjb25zdCBkaXNjb3ZlcmFiaWxpdHkgPSBub3REaXNjb3ZlcmFibGVCeVBob25lTnVtYmVyXG4gICAgPyBQaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eS5Ob3REaXNjb3ZlcmFibGVcbiAgICA6IFBob25lTnVtYmVyRGlzY292ZXJhYmlsaXR5LkRpc2NvdmVyYWJsZTtcbiAgd2luZG93LnN0b3JhZ2UucHV0KCdwaG9uZU51bWJlckRpc2NvdmVyYWJpbGl0eScsIGRpc2NvdmVyYWJpbGl0eSk7XG5cbiAgaWYgKHByb2ZpbGVLZXkpIHtcbiAgICBvdXJQcm9maWxlS2V5U2VydmljZS5zZXQocHJvZmlsZUtleSk7XG4gIH1cblxuICBpZiAocGlubmVkQ29udmVyc2F0aW9ucykge1xuICAgIGNvbnN0IG1vZGVsUGlubmVkQ29udmVyc2F0aW9ucyA9IHdpbmRvd1xuICAgICAgLmdldENvbnZlcnNhdGlvbnMoKVxuICAgICAgLmZpbHRlcihjb252ZXJzYXRpb24gPT4gQm9vbGVhbihjb252ZXJzYXRpb24uZ2V0KCdpc1Bpbm5lZCcpKSk7XG5cbiAgICBjb25zdCBtb2RlbFBpbm5lZENvbnZlcnNhdGlvbklkcyA9IG1vZGVsUGlubmVkQ29udmVyc2F0aW9ucy5tYXAoXG4gICAgICBjb252ZXJzYXRpb24gPT4gY29udmVyc2F0aW9uLmdldCgnaWQnKVxuICAgICk7XG5cbiAgICBjb25zdCBtaXNzaW5nU3RvcmFnZVBpbm5lZENvbnZlcnNhdGlvbklkcyA9IHdpbmRvdy5zdG9yYWdlXG4gICAgICAuZ2V0KCdwaW5uZWRDb252ZXJzYXRpb25JZHMnLCBuZXcgQXJyYXk8c3RyaW5nPigpKVxuICAgICAgLmZpbHRlcihpZCA9PiAhbW9kZWxQaW5uZWRDb252ZXJzYXRpb25JZHMuaW5jbHVkZXMoaWQpKTtcblxuICAgIGlmIChtaXNzaW5nU3RvcmFnZVBpbm5lZENvbnZlcnNhdGlvbklkcy5sZW5ndGggIT09IDApIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnbWVyZ2VBY2NvdW50UmVjb3JkOiBwaW5uZWRDb252ZXJzYXRpb25JZHMgaW4gc3RvcmFnZSBkb2VzIG5vdCBtYXRjaCBwaW5uZWQgQ29udmVyc2F0aW9uIG1vZGVscydcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbG9jYWxseVBpbm5lZENvbnZlcnNhdGlvbnMgPSBtb2RlbFBpbm5lZENvbnZlcnNhdGlvbnMuY29uY2F0KFxuICAgICAgbWlzc2luZ1N0b3JhZ2VQaW5uZWRDb252ZXJzYXRpb25JZHNcbiAgICAgICAgLm1hcChjb252ZXJzYXRpb25JZCA9PlxuICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZClcbiAgICAgICAgKVxuICAgICAgICAuZmlsdGVyKFxuICAgICAgICAgIChjb252ZXJzYXRpb24pOiBjb252ZXJzYXRpb24gaXMgQ29udmVyc2F0aW9uTW9kZWwgPT5cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbiAhPT0gdW5kZWZpbmVkXG4gICAgICAgIClcbiAgICApO1xuXG4gICAgZGV0YWlscy5wdXNoKFxuICAgICAgYGxvY2FsIHBpbm5lZD0ke2xvY2FsbHlQaW5uZWRDb252ZXJzYXRpb25zLmxlbmd0aH1gLFxuICAgICAgYHJlbW90ZSBwaW5uZWQ9JHtwaW5uZWRDb252ZXJzYXRpb25zLmxlbmd0aH1gXG4gICAgKTtcblxuICAgIGNvbnN0IHJlbW90ZWx5UGlubmVkQ29udmVyc2F0aW9uUHJvbWlzZXMgPSBwaW5uZWRDb252ZXJzYXRpb25zLm1hcChcbiAgICAgIGFzeW5jICh7IGNvbnRhY3QsIGxlZ2FjeUdyb3VwSWQsIGdyb3VwTWFzdGVyS2V5IH0pID0+IHtcbiAgICAgICAgbGV0IGNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG5cbiAgICAgICAgaWYgKGNvbnRhY3QpIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCA9XG4gICAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKGNvbnRhY3QpO1xuICAgICAgICB9IGVsc2UgaWYgKGxlZ2FjeUdyb3VwSWQgJiYgbGVnYWN5R3JvdXBJZC5sZW5ndGgpIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCA9IEJ5dGVzLnRvQmluYXJ5KGxlZ2FjeUdyb3VwSWQpO1xuICAgICAgICB9IGVsc2UgaWYgKGdyb3VwTWFzdGVyS2V5ICYmIGdyb3VwTWFzdGVyS2V5Lmxlbmd0aCkge1xuICAgICAgICAgIGNvbnN0IGdyb3VwRmllbGRzID0gZGVyaXZlR3JvdXBGaWVsZHMoZ3JvdXBNYXN0ZXJLZXkpO1xuICAgICAgICAgIGNvbnN0IGdyb3VwSWQgPSBCeXRlcy50b0Jhc2U2NChncm91cEZpZWxkcy5pZCk7XG5cbiAgICAgICAgICBjb252ZXJzYXRpb25JZCA9IGdyb3VwSWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ3N0b3JhZ2VTZXJ2aWNlLm1lcmdlQWNjb3VudFJlY29yZDogSW52YWxpZCBpZGVudGlmaWVyIHJlY2VpdmVkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIWNvbnZlcnNhdGlvbklkKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ3N0b3JhZ2VTZXJ2aWNlLm1lcmdlQWNjb3VudFJlY29yZDogbWlzc2luZyBjb252ZXJzYXRpb24gaWQuJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgfVxuICAgICk7XG5cbiAgICBjb25zdCByZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvbnMgPSAoXG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChyZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvblByb21pc2VzKVxuICAgICkuZmlsdGVyKFxuICAgICAgKGNvbnZlcnNhdGlvbik6IGNvbnZlcnNhdGlvbiBpcyBDb252ZXJzYXRpb25Nb2RlbCA9PlxuICAgICAgICBjb252ZXJzYXRpb24gIT09IHVuZGVmaW5lZFxuICAgICk7XG5cbiAgICBjb25zdCByZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvbklkcyA9IHJlbW90ZWx5UGlubmVkQ29udmVyc2F0aW9ucy5tYXAoXG4gICAgICAoeyBpZCB9KSA9PiBpZFxuICAgICk7XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25zVG9VbnBpbiA9IGxvY2FsbHlQaW5uZWRDb252ZXJzYXRpb25zLmZpbHRlcihcbiAgICAgICh7IGlkIH0pID0+ICFyZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvbklkcy5pbmNsdWRlcyhpZClcbiAgICApO1xuXG4gICAgZGV0YWlscy5wdXNoKFxuICAgICAgYHVucGlubmluZz0ke2NvbnZlcnNhdGlvbnNUb1VucGluLmxlbmd0aH1gLFxuICAgICAgYHBpbm5pbmc9JHtyZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RofWBcbiAgICApO1xuXG4gICAgY29udmVyc2F0aW9uc1RvVW5waW4uZm9yRWFjaChjb252ZXJzYXRpb24gPT4ge1xuICAgICAgY29udmVyc2F0aW9uLnNldCh7IGlzUGlubmVkOiBmYWxzZSB9KTtcbiAgICAgIHVwZGF0ZWRDb252ZXJzYXRpb25zLnB1c2goY29udmVyc2F0aW9uKTtcbiAgICB9KTtcblxuICAgIHJlbW90ZWx5UGlubmVkQ29udmVyc2F0aW9ucy5mb3JFYWNoKGNvbnZlcnNhdGlvbiA9PiB7XG4gICAgICBjb252ZXJzYXRpb24uc2V0KHsgaXNQaW5uZWQ6IHRydWUsIGlzQXJjaGl2ZWQ6IGZhbHNlIH0pO1xuICAgICAgdXBkYXRlZENvbnZlcnNhdGlvbnMucHVzaChjb252ZXJzYXRpb24pO1xuICAgIH0pO1xuXG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdwaW5uZWRDb252ZXJzYXRpb25JZHMnLCByZW1vdGVseVBpbm5lZENvbnZlcnNhdGlvbklkcyk7XG4gIH1cblxuICBpZiAoc3Vic2NyaWJlcklkIGluc3RhbmNlb2YgVWludDhBcnJheSkge1xuICAgIHdpbmRvdy5zdG9yYWdlLnB1dCgnc3Vic2NyaWJlcklkJywgc3Vic2NyaWJlcklkKTtcbiAgfVxuICBpZiAodHlwZW9mIHN1YnNjcmliZXJDdXJyZW5jeUNvZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KCdzdWJzY3JpYmVyQ3VycmVuY3lDb2RlJywgc3Vic2NyaWJlckN1cnJlbmN5Q29kZSk7XG4gIH1cbiAgd2luZG93LnN0b3JhZ2UucHV0KCdkaXNwbGF5QmFkZ2VzT25Qcm9maWxlJywgQm9vbGVhbihkaXNwbGF5QmFkZ2VzT25Qcm9maWxlKSk7XG4gIHdpbmRvdy5zdG9yYWdlLnB1dCgna2VlcE11dGVkQ2hhdHNBcmNoaXZlZCcsIEJvb2xlYW4oa2VlcE11dGVkQ2hhdHNBcmNoaXZlZCkpO1xuXG4gIGNvbnN0IG91cklEID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcblxuICBpZiAoIW91cklEKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBvdXJJRCcpO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGVBbmRXYWl0KFxuICAgIG91cklELFxuICAgICdwcml2YXRlJ1xuICApO1xuXG4gIGFkZFVua25vd25GaWVsZHMoYWNjb3VudFJlY29yZCwgY29udmVyc2F0aW9uLCBkZXRhaWxzKTtcblxuICBjb25zdCBvbGRTdG9yYWdlSUQgPSBjb252ZXJzYXRpb24uZ2V0KCdzdG9yYWdlSUQnKTtcbiAgY29uc3Qgb2xkU3RvcmFnZVZlcnNpb24gPSBjb252ZXJzYXRpb24uZ2V0KCdzdG9yYWdlVmVyc2lvbicpO1xuXG4gIGNvbnZlcnNhdGlvbi5zZXQoe1xuICAgIGlzQXJjaGl2ZWQ6IEJvb2xlYW4obm90ZVRvU2VsZkFyY2hpdmVkKSxcbiAgICBtYXJrZWRVbnJlYWQ6IEJvb2xlYW4obm90ZVRvU2VsZk1hcmtlZFVucmVhZCksXG4gICAgc3RvcmFnZUlELFxuICAgIHN0b3JhZ2VWZXJzaW9uLFxuICB9KTtcblxuICBsZXQgbmVlZHNQcm9maWxlRmV0Y2ggPSBmYWxzZTtcbiAgaWYgKHByb2ZpbGVLZXkgJiYgcHJvZmlsZUtleS5sZW5ndGggPiAwKSB7XG4gICAgbmVlZHNQcm9maWxlRmV0Y2ggPSBhd2FpdCBjb252ZXJzYXRpb24uc2V0UHJvZmlsZUtleShcbiAgICAgIEJ5dGVzLnRvQmFzZTY0KHByb2ZpbGVLZXkpLFxuICAgICAgeyB2aWFTdG9yYWdlU2VydmljZVN5bmM6IHRydWUgfVxuICAgICk7XG5cbiAgICBjb25zdCBhdmF0YXJVcmwgPSBkcm9wTnVsbChhY2NvdW50UmVjb3JkLmF2YXRhclVybCk7XG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnNldFByb2ZpbGVBdmF0YXIoYXZhdGFyVXJsLCBwcm9maWxlS2V5KTtcbiAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2F2YXRhclVybCcsIGF2YXRhclVybCk7XG4gIH1cblxuICBjb25zdCB7IGhhc0NvbmZsaWN0LCBkZXRhaWxzOiBleHRyYURldGFpbHMgfSA9IGRvZXNSZWNvcmRIYXZlUGVuZGluZ0NoYW5nZXMoXG4gICAgdG9BY2NvdW50UmVjb3JkKGNvbnZlcnNhdGlvbiksXG4gICAgYWNjb3VudFJlY29yZCxcbiAgICBjb252ZXJzYXRpb25cbiAgKTtcblxuICB1cGRhdGVkQ29udmVyc2F0aW9ucy5wdXNoKGNvbnZlcnNhdGlvbik7XG5cbiAgZGV0YWlscyA9IGRldGFpbHMuY29uY2F0KGV4dHJhRGV0YWlscyk7XG5cbiAgcmV0dXJuIHtcbiAgICBoYXNDb25mbGljdCxcbiAgICBjb252ZXJzYXRpb24sXG4gICAgdXBkYXRlZENvbnZlcnNhdGlvbnMsXG4gICAgbmVlZHNQcm9maWxlRmV0Y2gsXG4gICAgb2xkU3RvcmFnZUlELFxuICAgIG9sZFN0b3JhZ2VWZXJzaW9uLFxuICAgIGRldGFpbHMsXG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBa0M7QUFDbEMsa0JBQWlCO0FBRWpCLG9CQUEyQztBQUMzQyxZQUF1QjtBQUN2QixvQkFJTztBQUNQLG9CQUF1QjtBQUN2QixzQkFBeUI7QUFDekIsMkJBQThCO0FBQzlCLDhCQUFpQztBQUNqQyxvQ0FHTztBQUNQLHdDQUdPO0FBQ1AseUNBQTRDO0FBRTVDLGdDQUdPO0FBQ1Asa0NBR087QUFDUCwyQkFBcUM7QUFDckMsb0NBQXFDO0FBQ3JDLGtCQUE0QztBQUM1Qyw2QkFBd0M7QUFDeEMsc0JBQXVDO0FBQ3ZDLFVBQXFCO0FBd0JyQiwwQkFBMEIsVUFBcUQ7QUFDN0UsUUFBTSxnQkFBZ0IsT0FBTyxXQUFXLFFBQVEsU0FBUztBQUN6RCxRQUFNLGFBQWEsOEJBQU0sY0FBYztBQUV2QyxVQUFRO0FBQUEsU0FDRCxjQUFjO0FBQ2pCLGFBQU8sV0FBVztBQUFBLFNBQ2YsY0FBYztBQUNqQixhQUFPLFdBQVc7QUFBQTtBQUVsQixhQUFPLFdBQVc7QUFBQTtBQUV4QjtBQVpTLEFBY1QsMEJBQ0UsUUFDQSxjQUNBLFNBQ007QUFDTixNQUFJLE9BQU8saUJBQWlCO0FBQzFCLFlBQVEsS0FBSyx1QkFBdUI7QUFDcEMsaUJBQWEsSUFBSTtBQUFBLE1BQ2Ysc0JBQXNCLE1BQU0sU0FDMUIsTUFBTSxZQUFZLE9BQU8sZUFBZSxDQUMxQztBQUFBLElBQ0YsQ0FBQztBQUFBLEVBQ0gsV0FBVyxhQUFhLElBQUksc0JBQXNCLEdBQUc7QUFHbkQsWUFBUSxLQUFLLHlCQUF5QjtBQUN0QyxpQkFBYSxNQUFNLHNCQUFzQjtBQUFBLEVBQzNDO0FBQ0Y7QUFsQlMsQUFvQlQsNEJBQ0UsUUFDQSxjQUNNO0FBQ04sUUFBTSx1QkFBdUIsYUFBYSxJQUFJLHNCQUFzQjtBQUNwRSxNQUFJLHNCQUFzQjtBQUN4QixRQUFJLEtBQ0Ysa0VBQ0EsYUFBYSxhQUFhLENBQzVCO0FBRUEsV0FBTyxrQkFBa0IsQ0FBQyxNQUFNLFdBQVcsb0JBQW9CLENBQUM7QUFBQSxFQUNsRTtBQUNGO0FBYlMsQUFlVCwrQkFDRSxjQUM4QjtBQUM5QixRQUFNLGdCQUFnQixJQUFJLDhCQUFNLGNBQWM7QUFDOUMsUUFBTSxPQUFPLGFBQWEsUUFBUTtBQUNsQyxNQUFJLE1BQU07QUFDUixrQkFBYyxjQUFjLEtBQUssU0FBUztBQUFBLEVBQzVDO0FBQ0EsUUFBTSxPQUFPLGFBQWEsSUFBSSxNQUFNO0FBQ3BDLE1BQUksTUFBTTtBQUNSLGtCQUFjLGNBQWM7QUFBQSxFQUM5QjtBQUNBLFFBQU0sYUFBYSxhQUFhLElBQUksWUFBWTtBQUNoRCxNQUFJLFlBQVk7QUFDZCxrQkFBYyxhQUFhLE1BQU0sV0FBVyxPQUFPLFVBQVUsQ0FBQztBQUFBLEVBQ2hFO0FBRUEsUUFBTSxjQUFjLE9BQ2hCLE1BQU0sT0FBTyxXQUFXLFFBQVEsU0FBUyxnQkFBZ0IsSUFBSSxJQUM3RDtBQUNKLE1BQUksYUFBYTtBQUNmLGtCQUFjLGNBQWM7QUFBQSxFQUM5QjtBQUNBLFFBQU0sV0FBVyxhQUFhLElBQUksVUFBVTtBQUM1QyxNQUFJLFVBQVU7QUFDWixrQkFBYyxnQkFBZ0IsaUJBQWlCLE9BQU8sUUFBUSxDQUFDO0FBQUEsRUFDakU7QUFDQSxRQUFNLGNBQWMsYUFBYSxJQUFJLGFBQWE7QUFDbEQsTUFBSSxhQUFhO0FBQ2Ysa0JBQWMsWUFBWTtBQUFBLEVBQzVCO0FBQ0EsUUFBTSxvQkFBb0IsYUFBYSxJQUFJLG1CQUFtQjtBQUM5RCxNQUFJLG1CQUFtQjtBQUNyQixrQkFBYyxhQUFhO0FBQUEsRUFDN0I7QUFDQSxnQkFBYyxVQUFVLGFBQWEsVUFBVTtBQUMvQyxnQkFBYyxjQUFjLFFBQVEsYUFBYSxJQUFJLGdCQUFnQixDQUFDO0FBQ3RFLGdCQUFjLFdBQVcsUUFBUSxhQUFhLElBQUksWUFBWSxDQUFDO0FBQy9ELGdCQUFjLGVBQWUsUUFBUSxhQUFhLElBQUksY0FBYyxDQUFDO0FBQ3JFLGdCQUFjLHNCQUFzQix3REFDbEMsYUFBYSxJQUFJLGVBQWUsQ0FDbEM7QUFDQSxNQUFJLGFBQWEsSUFBSSxXQUFXLE1BQU0sUUFBVztBQUMvQyxrQkFBYyxZQUFZLFFBQVEsYUFBYSxJQUFJLFdBQVcsQ0FBQztBQUFBLEVBQ2pFO0FBRUEscUJBQW1CLGVBQWUsWUFBWTtBQUU5QyxTQUFPO0FBQ1Q7QUFqRHNCLEFBbURmLHlCQUNMLGNBQ3FCO0FBQ3JCLFFBQU0sZ0JBQWdCLElBQUksOEJBQU0sY0FBYztBQUU5QyxNQUFJLGFBQWEsSUFBSSxZQUFZLEdBQUc7QUFDbEMsa0JBQWMsYUFBYSxNQUFNLFdBQy9CLE9BQU8sYUFBYSxJQUFJLFlBQVksQ0FBQyxDQUN2QztBQUFBLEVBQ0Y7QUFDQSxNQUFJLGFBQWEsSUFBSSxhQUFhLEdBQUc7QUFDbkMsa0JBQWMsWUFBWSxhQUFhLElBQUksYUFBYSxLQUFLO0FBQUEsRUFDL0Q7QUFDQSxNQUFJLGFBQWEsSUFBSSxtQkFBbUIsR0FBRztBQUN6QyxrQkFBYyxhQUFhLGFBQWEsSUFBSSxtQkFBbUIsS0FBSztBQUFBLEVBQ3RFO0FBQ0EsUUFBTSxZQUFZLE9BQU8sUUFBUSxJQUFJLFdBQVc7QUFDaEQsTUFBSSxjQUFjLFFBQVc7QUFDM0Isa0JBQWMsWUFBWTtBQUFBLEVBQzVCO0FBQ0EsZ0JBQWMscUJBQXFCLFFBQVEsYUFBYSxJQUFJLFlBQVksQ0FBQztBQUN6RSxnQkFBYyx5QkFBeUIsUUFDckMsYUFBYSxJQUFJLGNBQWMsQ0FDakM7QUFDQSxnQkFBYyxlQUFlLFFBQVEsT0FBTyxPQUFPLHNCQUFzQixDQUFDO0FBQzFFLGdCQUFjLHlCQUF5QixRQUNyQyxPQUFPLFFBQVEsSUFBSSx3QkFBd0IsQ0FDN0M7QUFDQSxnQkFBYyxtQkFBbUIsUUFDL0IsT0FBTyxPQUFPLDBCQUEwQixDQUMxQztBQUNBLGdCQUFjLGVBQWUsUUFBUSxPQUFPLE9BQU8sc0JBQXNCLENBQUM7QUFFMUUsUUFBTSx1QkFBdUIsT0FBTyxRQUFRLElBQUksc0JBQXNCO0FBQ3RFLE1BQUkseUJBQXlCLFFBQVc7QUFDdEMsa0JBQWMsdUJBQXVCLFFBQVEsb0JBQW9CO0FBQUEsRUFDbkU7QUFFQSxRQUFNLGtCQUFrQixPQUFPLFFBQVEsSUFBSSxpQkFBaUI7QUFDNUQsTUFBSSxvQkFBb0IsUUFBVztBQUNqQyxrQkFBYyxrQkFBa0IsUUFBUSxlQUFlO0FBQUEsRUFDekQ7QUFFQSxRQUFNLGNBQWMsT0FBTyxRQUFRLElBQUksYUFBYTtBQUNwRCxNQUFJLGdCQUFnQixRQUFXO0FBQzdCLGtCQUFjLE9BQU87QUFBQSxFQUN2QjtBQUVBLFFBQU0sNEJBQTRCLE9BQU8sUUFBUSxJQUMvQyx3QkFDRjtBQUNBLE1BQUksdUJBQXVCLFlBQVkseUJBQXlCLEdBQUc7QUFDakUsa0JBQWMseUJBQXlCO0FBQUEsRUFDekM7QUFFQSxRQUFNLHVCQUF1QixxQ0FBd0I7QUFDckQsTUFBSSxzQkFBc0I7QUFDeEIsa0JBQWMsdUJBQXVCLE9BQU8sb0JBQW9CO0FBQUEsRUFDbEU7QUFFQSxRQUFNLGlDQUNKLDhCQUFNLGNBQWM7QUFDdEIsUUFBTSx5QkFBeUIsK0RBQzdCLE9BQU8sUUFBUSxJQUFJLHdCQUF3QixDQUM3QztBQUNBLFVBQVE7QUFBQSxTQUNELHFEQUF1QjtBQUMxQixvQkFBYyx5QkFDWiwrQkFBK0I7QUFDakM7QUFBQSxTQUNHLHFEQUF1QjtBQUMxQixvQkFBYyx5QkFDWiwrQkFBK0I7QUFDakM7QUFBQSxTQUNHLHFEQUF1QjtBQUMxQixvQkFBYyx5QkFDWiwrQkFBK0I7QUFDakM7QUFBQTtBQUVBLFlBQU0sOENBQWlCLHNCQUFzQjtBQUFBO0FBR2pELFFBQU0sNkJBQTZCLHVFQUNqQyxPQUFPLFFBQVEsSUFBSSw0QkFBNEIsQ0FDakQ7QUFDQSxVQUFRO0FBQUEsU0FDRCw2REFBMkI7QUFDOUIsb0JBQWMsK0JBQStCO0FBQzdDO0FBQUEsU0FDRyw2REFBMkI7QUFDOUIsb0JBQWMsK0JBQStCO0FBQzdDO0FBQUE7QUFFQSxZQUFNLDhDQUFpQiwwQkFBMEI7QUFBQTtBQUdyRCxRQUFNLHNCQUFzQixPQUFPLFFBQ2hDLElBQUkseUJBQXlCLElBQUksTUFBYyxDQUFDLEVBQ2hELElBQUksUUFBTTtBQUNULFVBQU0scUJBQXFCLE9BQU8sdUJBQXVCLElBQUksRUFBRTtBQUUvRCxRQUFJLG9CQUFvQjtBQUN0QixZQUFNLDJCQUNKLElBQUksOEJBQU0sY0FBYyxtQkFBbUI7QUFFN0MsVUFBSSxtQkFBbUIsSUFBSSxNQUFNLE1BQU0sV0FBVztBQUNoRCxpQ0FBeUIsYUFBYTtBQUN0QyxpQ0FBeUIsVUFBVTtBQUFBLFVBQ2pDLE1BQU0sbUJBQW1CLElBQUksTUFBTTtBQUFBLFVBQ25DLE1BQU0sbUJBQW1CLElBQUksTUFBTTtBQUFBLFFBQ3JDO0FBQUEsTUFDRixXQUFXLDZDQUFVLG1CQUFtQixVQUFVLEdBQUc7QUFDbkQsaUNBQXlCLGFBQWE7QUFDdEMsY0FBTSxVQUFVLG1CQUFtQixJQUFJLFNBQVM7QUFDaEQsWUFBSSxDQUFDLFNBQVM7QUFDWixnQkFBTSxJQUFJLE1BQ1IsMkRBQ0Y7QUFBQSxRQUNGO0FBQ0EsaUNBQXlCLGdCQUFnQixNQUFNLFdBQVcsT0FBTztBQUFBLE1BQ25FLFdBQVcsNkNBQVUsbUJBQW1CLFVBQVUsR0FBRztBQUNuRCxpQ0FBeUIsYUFBYTtBQUN0QyxjQUFNLFlBQVksbUJBQW1CLElBQUksV0FBVztBQUNwRCxZQUFJLENBQUMsV0FBVztBQUNkLGdCQUFNLElBQUksTUFDUiw2REFDRjtBQUFBLFFBQ0Y7QUFDQSxpQ0FBeUIsaUJBQWlCLE1BQU0sV0FBVyxTQUFTO0FBQUEsTUFDdEU7QUFFQSxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU87QUFBQSxFQUNULENBQUMsRUFDQSxPQUNDLENBQ0UsNEJBRUEsNEJBQTRCLE1BQ2hDO0FBRUYsZ0JBQWMsc0JBQXNCO0FBRXBDLFFBQU0sZUFBZSxPQUFPLFFBQVEsSUFBSSxjQUFjO0FBQ3RELE1BQUksd0JBQXdCLFlBQVk7QUFDdEMsa0JBQWMsZUFBZTtBQUFBLEVBQy9CO0FBQ0EsUUFBTSx5QkFBeUIsT0FBTyxRQUFRLElBQUksd0JBQXdCO0FBQzFFLE1BQUksT0FBTywyQkFBMkIsVUFBVTtBQUM5QyxrQkFBYyx5QkFBeUI7QUFBQSxFQUN6QztBQUNBLFFBQU0seUJBQXlCLE9BQU8sUUFBUSxJQUFJLHdCQUF3QjtBQUMxRSxNQUFJLDJCQUEyQixRQUFXO0FBQ3hDLGtCQUFjLHlCQUF5QjtBQUFBLEVBQ3pDO0FBQ0EsUUFBTSx5QkFBeUIsT0FBTyxRQUFRLElBQUksd0JBQXdCO0FBQzFFLE1BQUksMkJBQTJCLFFBQVc7QUFDeEMsa0JBQWMseUJBQXlCO0FBQUEsRUFDekM7QUFFQSxxQkFBbUIsZUFBZSxZQUFZO0FBRTlDLFNBQU87QUFDVDtBQXJLZ0IsQUF1S1QseUJBQ0wsY0FDcUI7QUFDckIsUUFBTSxnQkFBZ0IsSUFBSSw4QkFBTSxjQUFjO0FBRTlDLGdCQUFjLEtBQUssTUFBTSxXQUFXLE9BQU8sYUFBYSxJQUFJLFNBQVMsQ0FBQyxDQUFDO0FBQ3ZFLGdCQUFjLFVBQVUsYUFBYSxVQUFVO0FBQy9DLGdCQUFjLGNBQWMsUUFBUSxhQUFhLElBQUksZ0JBQWdCLENBQUM7QUFDdEUsZ0JBQWMsV0FBVyxRQUFRLGFBQWEsSUFBSSxZQUFZLENBQUM7QUFDL0QsZ0JBQWMsZUFBZSxRQUFRLGFBQWEsSUFBSSxjQUFjLENBQUM7QUFDckUsZ0JBQWMsc0JBQXNCLHdEQUNsQyxhQUFhLElBQUksZUFBZSxDQUNsQztBQUVBLHFCQUFtQixlQUFlLFlBQVk7QUFFOUMsU0FBTztBQUNUO0FBakJnQixBQW1CVCx5QkFDTCxjQUNxQjtBQUNyQixRQUFNLGdCQUFnQixJQUFJLDhCQUFNLGNBQWM7QUFFOUMsUUFBTSxZQUFZLGFBQWEsSUFBSSxXQUFXO0FBQzlDLE1BQUksY0FBYyxRQUFXO0FBQzNCLGtCQUFjLFlBQVksTUFBTSxXQUFXLFNBQVM7QUFBQSxFQUN0RDtBQUNBLGdCQUFjLFVBQVUsYUFBYSxVQUFVO0FBQy9DLGdCQUFjLGNBQWMsUUFBUSxhQUFhLElBQUksZ0JBQWdCLENBQUM7QUFDdEUsZ0JBQWMsV0FBVyxRQUFRLGFBQWEsSUFBSSxZQUFZLENBQUM7QUFDL0QsZ0JBQWMsZUFBZSxRQUFRLGFBQWEsSUFBSSxjQUFjLENBQUM7QUFDckUsZ0JBQWMsc0JBQXNCLHdEQUNsQyxhQUFhLElBQUksZUFBZSxDQUNsQztBQUNBLGdCQUFjLCtCQUErQixRQUMzQyxhQUFhLElBQUksOEJBQThCLENBQ2pEO0FBQ0EsZ0JBQWMsWUFBWSxRQUFRLGFBQWEsSUFBSSxXQUFXLENBQUM7QUFFL0QscUJBQW1CLGVBQWUsWUFBWTtBQUU5QyxTQUFPO0FBQ1Q7QUF4QmdCLEFBNEJoQixrQ0FDRSxRQUNBLGNBQ007QUFDTixRQUFNLHFCQUFxQiw4QkFBTSxZQUFZLHVCQUF1QjtBQUVwRSxNQUFJLE9BQU8sU0FBUztBQUNsQixpQkFBYSw0QkFBNEIsbUJBQW1CLE9BQU87QUFBQSxNQUNqRSxVQUFVO0FBQUEsTUFDVix1QkFBdUI7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSCxXQUFXLE9BQU8sYUFBYTtBQUc3QixpQkFBYSw0QkFBNEIsbUJBQW1CLFFBQVE7QUFBQSxNQUNsRSxVQUFVO0FBQUEsTUFDVix1QkFBdUI7QUFBQSxJQUN6QixDQUFDO0FBQUEsRUFDSCxXQUFXLENBQUMsT0FBTyxTQUFTO0FBRzFCLGlCQUFhLFFBQVEsRUFBRSx1QkFBdUIsS0FBSyxDQUFDO0FBQUEsRUFDdEQ7QUFFQSxNQUFJLE9BQU8sZ0JBQWdCLE9BQU87QUFDaEMsaUJBQWEsc0JBQXNCLEVBQUUsdUJBQXVCLEtBQUssQ0FBQztBQUFBLEVBQ3BFO0FBQ0Y7QUEzQlMsQUFrQ1QsMkJBQ0UsYUFDQSxjQUN1QjtBQUN2QixRQUFNLFVBQVUsSUFBSSxNQUFjO0FBRWxDLGFBQVcsT0FBTyxPQUFPLEtBQUssWUFBWSxHQUFHO0FBQzNDLFVBQU0sYUFBYSxZQUFZO0FBQy9CLFVBQU0sY0FBYyxhQUFhO0FBSWpDLFFBQUksc0JBQXNCLFlBQVk7QUFDcEMsWUFBTSxZQUFXLE1BQU0sU0FBUyxZQUFZLFdBQVc7QUFDdkQsVUFBSSxDQUFDLFdBQVU7QUFDYixnQkFBUSxLQUFLLE9BQU8sc0JBQXNCO0FBQUEsTUFDNUM7QUFDQTtBQUFBLElBQ0Y7QUFHQSxRQUFJLG9CQUFLLE9BQU8sVUFBVSxLQUFLLE9BQU8sZUFBZSxVQUFVO0FBQzdELFVBQUksQ0FBQyxvQkFBSyxPQUFPLFdBQVcsS0FBSyxPQUFPLGdCQUFnQixVQUFVO0FBQ2hFLGdCQUFRLEtBQUssT0FBTyxvQkFBb0I7QUFDeEM7QUFBQSxNQUNGO0FBRUEsWUFBTSxZQUFXLG9CQUFLLFVBQVUsVUFBVSxFQUFFLE9BQzFDLG9CQUFLLFVBQVUsV0FBVyxDQUM1QjtBQUNBLFVBQUksQ0FBQyxXQUFVO0FBQ2IsZ0JBQVEsS0FBSyxPQUFPLHlCQUF5QjtBQUFBLE1BQy9DO0FBQ0E7QUFBQSxJQUNGO0FBRUEsUUFBSSxRQUFRLHVCQUF1QjtBQUNqQyxZQUFNLFlBQVcsb0VBQTRCLFlBQVksV0FBVztBQUNwRSxVQUFJLENBQUMsV0FBVTtBQUNiLGdCQUFRLEtBQUsscUJBQXFCO0FBQUEsTUFDcEM7QUFDQTtBQUFBLElBQ0Y7QUFFQSxRQUFJLGVBQWUsYUFBYTtBQUM5QjtBQUFBLElBQ0Y7QUFLQSxRQUNFLGdCQUFnQixRQUNmLGdCQUFlLFNBQ2QsZUFBZSxNQUNmLGVBQWUsS0FDZCxvQkFBSyxPQUFPLFVBQVUsS0FBSyxXQUFXLFNBQVMsTUFBTSxJQUN4RDtBQUNBO0FBQUEsSUFDRjtBQUVBLFVBQU0sV0FBVywyQkFBUSxZQUFZLFdBQVc7QUFFaEQsUUFBSSxDQUFDLFVBQVU7QUFDYixjQUFRLEtBQUssT0FBTyx1QkFBdUI7QUFBQSxJQUM3QztBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQUEsSUFDTCxhQUFhLFFBQVEsU0FBUztBQUFBLElBQzlCO0FBQUEsRUFDRjtBQUNGO0FBeEVTLEFBMEVULHNDQUNFLGNBQ0EsZUFDQSxjQUN1QjtBQUN2QixRQUFNLGFBQWEsUUFBUSxhQUFhLElBQUkseUJBQXlCLENBQUM7QUFFdEUsTUFBSSxDQUFDLFlBQVk7QUFDZixXQUFPLEVBQUUsYUFBYSxPQUFPLFNBQVMsQ0FBQyxFQUFFO0FBQUEsRUFDM0M7QUFFQSxRQUFNLEVBQUUsYUFBYSxZQUFZLGtCQUMvQixjQUNBLGFBQ0Y7QUFFQSxNQUFJLENBQUMsYUFBYTtBQUNoQixpQkFBYSxJQUFJLEVBQUUseUJBQXlCLE1BQU0sQ0FBQztBQUFBLEVBQ3JEO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBeEJTLEFBMEJULGtDQUNFLFdBQ0EsZ0JBQ0EsZUFDMEI7QUFDMUIsTUFBSSxDQUFDLGNBQWMsSUFBSTtBQUNyQixVQUFNLElBQUksTUFBTSxhQUFhLFdBQVc7QUFBQSxFQUMxQztBQUVBLFFBQU0sVUFBVSxNQUFNLFNBQVMsY0FBYyxFQUFFO0FBQy9DLE1BQUksVUFBVSxJQUFJLE1BQWM7QUFJaEMsTUFBSSxlQUFlLE9BQU8sdUJBQXVCLElBQUksT0FBTztBQU81RCxNQUFJLGdCQUFnQixDQUFDLDZDQUFVLGFBQWEsVUFBVSxHQUFHO0FBQ3ZELFVBQU0sSUFBSSxNQUNSLGtDQUFrQyxhQUFhLGFBQWEsR0FDOUQ7QUFBQSxFQUNGO0FBRUEsTUFBSSxDQUFDLGNBQWM7QUFJakIsVUFBTSxrQkFBa0IsOENBQTJCLGNBQWMsRUFBRTtBQUNuRSxVQUFNLFNBQVMscUNBQWtCLGVBQWU7QUFDaEQsVUFBTSxtQkFBbUIsTUFBTSxTQUFTLE9BQU8sRUFBRTtBQUVqRCxZQUFRLEtBQ04saUVBQ3FDLG1CQUN2QztBQUNBLG1CQUFlLE9BQU8sdUJBQXVCLElBQUksZ0JBQWdCO0FBQUEsRUFDbkU7QUFDQSxNQUFJLENBQUMsY0FBYztBQUNqQixRQUFJLGNBQWMsR0FBRyxlQUFlLElBQUk7QUFDdEMsWUFBTSxJQUFJLE1BQU0saUJBQWlCO0FBQUEsSUFDbkM7QUFFQSxtQkFBZSxNQUFNLE9BQU8sdUJBQXVCLG1CQUNqRCxTQUNBLE9BQ0Y7QUFDQSxZQUFRLEtBQUssNkJBQTZCO0FBQUEsRUFDNUM7QUFFQSxRQUFNLGVBQWUsYUFBYSxJQUFJLFdBQVc7QUFDakQsUUFBTSxvQkFBb0IsYUFBYSxJQUFJLGdCQUFnQjtBQUUzRCxNQUFJLENBQUMsNkNBQVUsYUFBYSxVQUFVLEdBQUc7QUFDdkMsWUFBUSxLQUFLLG9DQUFvQztBQUVqRCxXQUFPO0FBQUEsTUFHTCxhQUFhO0FBQUEsTUFDYixZQUFZO0FBQUEsTUFDWjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsZUFBYSxJQUFJO0FBQUEsSUFDZixZQUFZLFFBQVEsY0FBYyxRQUFRO0FBQUEsSUFDMUMsY0FBYyxRQUFRLGNBQWMsWUFBWTtBQUFBLElBQ2hEO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUVELGVBQWEsa0JBQ1gsb0RBQXFCLGNBQWMsbUJBQW1CLEdBQ3REO0FBQUEsSUFDRSx1QkFBdUI7QUFBQSxFQUN6QixDQUNGO0FBRUEsMkJBQXlCLGVBQWUsWUFBWTtBQUVwRCxNQUFJO0FBRUosTUFBSSw2Q0FBVSxhQUFhLFVBQVUsR0FBRztBQUN0QyxxQkFBaUIsZUFBZSxjQUFjLE9BQU87QUFFckQsVUFBTSxFQUFFLGFBQWEsU0FBUyxpQkFBaUIsNkJBQzdDLGdCQUFnQixZQUFZLEdBQzVCLGVBQ0EsWUFDRjtBQUVBLGNBQVUsUUFBUSxPQUFPLFlBQVk7QUFDckMsd0JBQW9CO0FBQUEsRUFDdEIsT0FBTztBQU1MLHdCQUFvQjtBQUNwQixZQUFRLEtBQUssc0NBQXNDO0FBQUEsRUFDckQ7QUFFQSxTQUFPO0FBQUEsSUFDTCxhQUFhO0FBQUEsSUFDYjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esc0JBQXNCLENBQUMsWUFBWTtBQUFBLEVBQ3JDO0FBQ0Y7QUF0SHNCLEFBd0h0QixnQ0FDRSxpQkFDbUI7QUFDbkIsUUFBTSxjQUFjLHFDQUFrQixlQUFlO0FBRXJELFFBQU0sVUFBVSxNQUFNLFNBQVMsWUFBWSxFQUFFO0FBQzdDLFFBQU0sWUFBWSxNQUFNLFNBQVMsZUFBZTtBQUNoRCxRQUFNLGVBQWUsTUFBTSxTQUFTLFlBQVksWUFBWTtBQUM1RCxRQUFNLGVBQWUsTUFBTSxTQUFTLFlBQVksWUFBWTtBQUc1RCxRQUFNLFVBQVUsT0FBTyx1QkFBdUIsSUFBSSxPQUFPO0FBQ3pELE1BQUksU0FBUztBQUNYLFlBQVEsbUJBQW1CO0FBQUEsTUFDekI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0YsQ0FBQztBQUVELFdBQU87QUFBQSxFQUNUO0FBR0EsUUFBTSxVQUFVLE9BQU8sdUJBQXVCLHNCQUFzQixPQUFPO0FBQzNFLE1BQUksU0FBUztBQUNYLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxpQkFBaUIsT0FBTyx1QkFBdUIsWUFBWSxTQUFTO0FBQUEsSUFJeEUsY0FBYztBQUFBLElBQ2Q7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNELFFBQU0sZUFBZSxPQUFPLHVCQUF1QixJQUFJLGNBQWM7QUFDckUsTUFBSSxDQUFDLGNBQWM7QUFDakIsVUFBTSxJQUFJLE1BQ1IscUVBQXFFLFVBQ3ZFO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDtBQTdDUyxBQStDVCxrQ0FDRSxXQUNBLGdCQUNBLGVBQzBCO0FBQzFCLE1BQUksQ0FBQyxjQUFjLFdBQVc7QUFDNUIsVUFBTSxJQUFJLE1BQU0scUJBQXFCLFdBQVc7QUFBQSxFQUNsRDtBQUVBLFFBQU0sa0JBQWtCLGNBQWM7QUFDdEMsUUFBTSxlQUFlLHVCQUF1QixlQUFlO0FBRTNELFFBQU0sZUFBZSxhQUFhLElBQUksV0FBVztBQUNqRCxRQUFNLG9CQUFvQixhQUFhLElBQUksZ0JBQWdCO0FBRTNELGVBQWEsSUFBSTtBQUFBLElBQ2YsV0FBVyxRQUFRLGNBQWMsU0FBUztBQUFBLElBQzFDLFlBQVksUUFBUSxjQUFjLFFBQVE7QUFBQSxJQUMxQyxjQUFjLFFBQVEsY0FBYyxZQUFZO0FBQUEsSUFDaEQsOEJBQThCLFFBQzVCLGNBQWMsNEJBQ2hCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFFRCxlQUFhLGtCQUNYLG9EQUFxQixjQUFjLG1CQUFtQixHQUN0RDtBQUFBLElBQ0UsdUJBQXVCO0FBQUEsRUFDekIsQ0FDRjtBQUVBLDJCQUF5QixlQUFlLFlBQVk7QUFFcEQsTUFBSSxVQUFVLElBQUksTUFBYztBQUVoQyxtQkFBaUIsZUFBZSxjQUFjLE9BQU87QUFFckQsUUFBTSxFQUFFLGFBQWEsU0FBUyxpQkFBaUIsNkJBQzdDLGdCQUFnQixZQUFZLEdBQzVCLGVBQ0EsWUFDRjtBQUVBLFlBQVUsUUFBUSxPQUFPLFlBQVk7QUFFckMsUUFBTSxpQkFBaUIsQ0FBQyw0QkFBUyxhQUFhLElBQUksVUFBVSxDQUFDO0FBQzdELFFBQU0sY0FBYyxDQUFDLE9BQU8sUUFBUSxJQUFJLHNCQUFzQjtBQUM5RCxRQUFNLHlCQUF5QjtBQUUvQixNQUFJLDZDQUFVLGFBQWEsVUFBVSxHQUFHO0FBTXRDLHlEQUFrQztBQUFBLE1BQ2hDO0FBQUEsSUFDRixDQUFDO0FBQUEsRUFDSCxXQUFXLGdCQUFnQjtBQU96QixnREFDRTtBQUFBLE1BQ0U7QUFBQSxNQUNBO0FBQUEsSUFDRixHQUNBLEVBQUUscUJBQXFCLFlBQVksQ0FDckM7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQSxzQkFBc0IsQ0FBQyxZQUFZO0FBQUEsSUFDbkM7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEVBQ0Y7QUFDRjtBQXBGc0IsQUFzRnRCLGtDQUNFLFdBQ0EsZ0JBQ0EsdUJBQzBCO0FBQzFCLFFBQU0sZ0JBQWdCO0FBQUEsT0FDakI7QUFBQSxJQUVILGFBQWEsc0JBQXNCLGNBQy9CLHdDQUNFLHNCQUFzQixhQUN0QiwyQkFDRixJQUNBO0FBQUEsRUFDTjtBQUVBLFFBQU0sT0FBTyw4QkFBUyxjQUFjLFdBQVc7QUFDL0MsUUFBTSxPQUFPLDhCQUFTLGNBQWMsV0FBVztBQUcvQyxNQUFJLENBQUMsTUFBTTtBQUNULFdBQU8sRUFBRSxhQUFhLE9BQU8sWUFBWSxNQUFNLFNBQVMsQ0FBQyxTQUFTLEVBQUU7QUFBQSxFQUN0RTtBQUVBLE1BQUksQ0FBQyw2QkFBWSxJQUFJLEdBQUc7QUFDdEIsV0FBTyxFQUFFLGFBQWEsT0FBTyxZQUFZLE1BQU0sU0FBUyxDQUFDLGNBQWMsRUFBRTtBQUFBLEVBQzNFO0FBRUEsTUFBSSxPQUFPLFFBQVEsS0FBSyxlQUFlLElBQUksaUJBQUssSUFBSSxDQUFDLE1BQU0scUJBQVMsU0FBUztBQUMzRSxXQUFPLEVBQUUsYUFBYSxPQUFPLFlBQVksTUFBTSxTQUFTLENBQUMsY0FBYyxFQUFFO0FBQUEsRUFDM0U7QUFFQSxRQUFNLEtBQUssT0FBTyx1QkFBdUIsaUJBQWlCO0FBQUEsSUFDeEQ7QUFBQSxJQUNBO0FBQUEsSUFDQSxXQUFXO0FBQUEsSUFDWCxRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsTUFBSSxDQUFDLElBQUk7QUFDUCxVQUFNLElBQUksTUFBTSxhQUFhLFdBQVc7QUFBQSxFQUMxQztBQUVBLFFBQU0sZUFBZSxNQUFNLE9BQU8sdUJBQXVCLG1CQUN2RCxJQUNBLFNBQ0Y7QUFFQSxNQUFJLG9CQUFvQjtBQUN4QixNQUFJLGNBQWMsY0FBYyxjQUFjLFdBQVcsU0FBUyxHQUFHO0FBQ25FLHdCQUFvQixNQUFNLGFBQWEsY0FDckMsTUFBTSxTQUFTLGNBQWMsVUFBVSxHQUN2QyxFQUFFLHVCQUF1QixLQUFLLENBQ2hDO0FBQUEsRUFDRjtBQUVBLE1BQUksVUFBVSxJQUFJLE1BQWM7QUFDaEMsUUFBTSxhQUFhLDhCQUFTLGNBQWMsU0FBUztBQUNuRCxRQUFNLG1CQUFtQiw4QkFBUyxjQUFjLFVBQVU7QUFDMUQsUUFBTSxZQUFZLGFBQWEsSUFBSSxhQUFhO0FBQ2hELFFBQU0sa0JBQWtCLGFBQWEsSUFBSSxtQkFBbUI7QUFDNUQsTUFDRSxjQUNDLGVBQWMsY0FBYyxvQkFBb0IsbUJBQ2pEO0FBRUEsUUFBSSxXQUFXO0FBQ2IsbUJBQWEsWUFBWTtBQUN6QixjQUFRLEtBQUssb0JBQW9CO0FBQUEsSUFDbkMsT0FBTztBQUNMLG1CQUFhLElBQUk7QUFBQSxRQUNmLGFBQWE7QUFBQSxRQUNiLG1CQUFtQjtBQUFBLE1BQ3JCLENBQUM7QUFDRCxjQUFRLEtBQUssc0JBQXNCO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBRUEsTUFBSSxjQUFjLGFBQWE7QUFDN0IsVUFBTSxXQUFXLE1BQU0sYUFBYSxnQkFBZ0I7QUFDcEQsVUFBTSx5QkFBeUIsY0FBYyxpQkFBaUI7QUFDOUQsVUFBTSxrQkFBa0I7QUFBQSxNQUN0QixLQUFLLGNBQWM7QUFBQSxNQUNuQix1QkFBdUI7QUFBQSxJQUN6QjtBQUNBLFVBQU0sYUFBYSw4QkFBTSxjQUFjO0FBRXZDLFFBQUksYUFBYSx3QkFBd0I7QUFDdkMsY0FBUSxLQUFLLDhCQUE4QixVQUFVO0FBQUEsSUFDdkQ7QUFJQSxRQUFJO0FBQ0osWUFBUTtBQUFBLFdBQ0QsV0FBVztBQUNkLG9CQUFZLE1BQU0sYUFBYSxZQUFZLGVBQWU7QUFDMUQ7QUFBQSxXQUNHLFdBQVc7QUFDZCxvQkFBWSxNQUFNLGFBQWEsY0FBYyxlQUFlO0FBQzVEO0FBQUE7QUFFQSxvQkFBWSxNQUFNLGFBQWEsbUJBQW1CLGVBQWU7QUFBQTtBQUdyRSxRQUFJLFdBQVc7QUFDYixjQUFRLEtBQUssYUFBYTtBQUFBLElBQzVCO0FBQUEsRUFDRjtBQUVBLDJCQUF5QixlQUFlLFlBQVk7QUFFcEQsbUJBQWlCLGVBQWUsY0FBYyxPQUFPO0FBRXJELFFBQU0sZUFBZSxhQUFhLElBQUksV0FBVztBQUNqRCxRQUFNLG9CQUFvQixhQUFhLElBQUksZ0JBQWdCO0FBRTNELGVBQWEsSUFBSTtBQUFBLElBQ2YsV0FBVyxRQUFRLGNBQWMsU0FBUztBQUFBLElBQzFDLFlBQVksUUFBUSxjQUFjLFFBQVE7QUFBQSxJQUMxQyxjQUFjLFFBQVEsY0FBYyxZQUFZO0FBQUEsSUFDaEQ7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsZUFBYSxrQkFDWCxvREFBcUIsY0FBYyxtQkFBbUIsR0FDdEQ7QUFBQSxJQUNFLHVCQUF1QjtBQUFBLEVBQ3pCLENBQ0Y7QUFFQSxRQUFNLEVBQUUsYUFBYSxTQUFTLGlCQUFpQiw2QkFDN0MsTUFBTSxnQkFBZ0IsWUFBWSxHQUNsQyxlQUNBLFlBQ0Y7QUFDQSxZQUFVLFFBQVEsT0FBTyxZQUFZO0FBRXJDLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0Esc0JBQXNCLENBQUMsWUFBWTtBQUFBLElBQ25DO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBcEpzQixBQXNKdEIsa0NBQ0UsV0FDQSxnQkFDQSxlQUMwQjtBQUMxQixNQUFJLFVBQVUsSUFBSSxNQUFjO0FBQ2hDLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNO0FBQUEsSUFDTix3QkFBd0I7QUFBQSxJQUN4QjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLE1BQ0U7QUFFSixRQUFNLHVCQUF1QixJQUFJLE1BQXlCO0FBRTFELFNBQU8sUUFBUSxJQUFJLHdCQUF3QixRQUFRLFlBQVksQ0FBQztBQUVoRSxNQUFJLE9BQU8sMkJBQTJCLFdBQVc7QUFDL0MsV0FBTyxRQUFRLElBQUksMEJBQTBCLHNCQUFzQjtBQUFBLEVBQ3JFO0FBRUEsTUFBSSxPQUFPLHFCQUFxQixXQUFXO0FBQ3pDLFdBQU8sUUFBUSxJQUFJLG9CQUFvQixnQkFBZ0I7QUFBQSxFQUN6RDtBQUVBLE1BQUksT0FBTyxpQkFBaUIsV0FBVztBQUNyQyxXQUFPLFFBQVEsSUFBSSxnQkFBZ0IsWUFBWTtBQUFBLEVBQ2pEO0FBRUEsTUFBSSxPQUFPLHlCQUF5QixXQUFXO0FBQzdDLFVBQU0sV0FBVyxPQUFPLFFBQVEsSUFBSSxzQkFBc0I7QUFDMUQsV0FBTyxRQUFRLElBQUksd0JBQXdCLG9CQUFvQjtBQUUvRCxRQUFJLFFBQVEsUUFBUSxNQUFNLFFBQVEsb0JBQW9CLEdBQUc7QUFDdkQsYUFBTyx1QkFBdUIsY0FBYztBQUFBLElBQzlDO0FBQUEsRUFDRjtBQUVBLE1BQUksT0FBTyxvQkFBb0IsV0FBVztBQUN4QyxXQUFPLFFBQVEsSUFBSSxtQkFBbUIsZUFBZTtBQUFBLEVBQ3ZEO0FBRUEsTUFBSSxPQUFPLGdCQUFnQixZQUFZLGFBQWE7QUFDbEQsV0FBTyxRQUFRLElBQUksZUFBZSxXQUFXO0FBQzdDLFdBQU8sUUFBUSxLQUFLLFVBQVUsV0FBVztBQUFBLEVBQzNDO0FBRUEsTUFBSSx1QkFBdUIsWUFBWSx5QkFBeUIsR0FBRztBQUNqRSxVQUFNLDhCQUNKLE9BQU8sUUFBUSxJQUFJLHdCQUF3QixLQUFLLENBQUM7QUFDbkQsUUFBSSxDQUFDLDJCQUFRLDZCQUE2Qix5QkFBeUIsR0FBRztBQUNwRSxVQUFJLEtBQ0Ysd0VBQ0EsNEJBQTRCLFFBQzVCLDBCQUEwQixNQUM1QjtBQUFBLElBQ0Y7QUFDQSxXQUFPLFFBQVEsSUFBSSwwQkFBMEIseUJBQXlCO0FBQUEsRUFDeEU7QUFFQSx1Q0FBd0Isd0JBQXdCLENBQUM7QUFFakQsUUFBTSxpQ0FDSiw4QkFBTSxjQUFjO0FBQ3RCLE1BQUk7QUFDSixVQUFRO0FBQUEsU0FDRDtBQUFBLFNBQ0E7QUFBQSxTQUNBLCtCQUErQjtBQUNsQyxzQ0FBZ0MscURBQXVCO0FBQ3ZEO0FBQUEsU0FDRywrQkFBK0I7QUFDbEMsc0NBQWdDLHFEQUF1QjtBQUN2RDtBQUFBLFNBQ0csK0JBQStCO0FBQ2xDLHNDQUFnQyxxREFBdUI7QUFDdkQ7QUFBQTtBQUVBLGdDQUNFLE9BQ0EsbUZBQW1GLGlEQUNyRjtBQUNBLHNDQUFnQyxxREFBdUI7QUFDdkQ7QUFBQTtBQUVKLFNBQU8sUUFBUSxJQUFJLDBCQUEwQiw2QkFBNkI7QUFFMUUsUUFBTSxrQkFBa0IsK0JBQ3BCLDZEQUEyQixrQkFDM0IsNkRBQTJCO0FBQy9CLFNBQU8sUUFBUSxJQUFJLDhCQUE4QixlQUFlO0FBRWhFLE1BQUksWUFBWTtBQUNkLDhDQUFxQixJQUFJLFVBQVU7QUFBQSxFQUNyQztBQUVBLE1BQUkscUJBQXFCO0FBQ3ZCLFVBQU0sMkJBQTJCLE9BQzlCLGlCQUFpQixFQUNqQixPQUFPLG1CQUFnQixRQUFRLGNBQWEsSUFBSSxVQUFVLENBQUMsQ0FBQztBQUUvRCxVQUFNLDZCQUE2Qix5QkFBeUIsSUFDMUQsbUJBQWdCLGNBQWEsSUFBSSxJQUFJLENBQ3ZDO0FBRUEsVUFBTSxzQ0FBc0MsT0FBTyxRQUNoRCxJQUFJLHlCQUF5QixJQUFJLE1BQWMsQ0FBQyxFQUNoRCxPQUFPLFFBQU0sQ0FBQywyQkFBMkIsU0FBUyxFQUFFLENBQUM7QUFFeEQsUUFBSSxvQ0FBb0MsV0FBVyxHQUFHO0FBQ3BELFVBQUksS0FDRixnR0FDRjtBQUFBLElBQ0Y7QUFFQSxVQUFNLDZCQUE2Qix5QkFBeUIsT0FDMUQsb0NBQ0csSUFBSSxvQkFDSCxPQUFPLHVCQUF1QixJQUFJLGNBQWMsQ0FDbEQsRUFDQyxPQUNDLENBQUMsa0JBQ0Msa0JBQWlCLE1BQ3JCLENBQ0o7QUFFQSxZQUFRLEtBQ04sZ0JBQWdCLDJCQUEyQixVQUMzQyxpQkFBaUIsb0JBQW9CLFFBQ3ZDO0FBRUEsVUFBTSxxQ0FBcUMsb0JBQW9CLElBQzdELE9BQU8sRUFBRSxTQUFTLGVBQWUscUJBQXFCO0FBQ3BELFVBQUk7QUFFSixVQUFJLFNBQVM7QUFDWCx5QkFDRSxPQUFPLHVCQUF1QixpQkFBaUIsT0FBTztBQUFBLE1BQzFELFdBQVcsaUJBQWlCLGNBQWMsUUFBUTtBQUNoRCx5QkFBaUIsTUFBTSxTQUFTLGFBQWE7QUFBQSxNQUMvQyxXQUFXLGtCQUFrQixlQUFlLFFBQVE7QUFDbEQsY0FBTSxjQUFjLHFDQUFrQixjQUFjO0FBQ3BELGNBQU0sVUFBVSxNQUFNLFNBQVMsWUFBWSxFQUFFO0FBRTdDLHlCQUFpQjtBQUFBLE1BQ25CLE9BQU87QUFDTCxZQUFJLE1BQ0YsZ0VBQ0Y7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFDLGdCQUFnQjtBQUNuQixZQUFJLE1BQ0YsNkRBQ0Y7QUFDQSxlQUFPO0FBQUEsTUFDVDtBQUVBLGFBQU8sT0FBTyx1QkFBdUIsSUFBSSxjQUFjO0FBQUEsSUFDekQsQ0FDRjtBQUVBLFVBQU0sOEJBQ0osT0FBTSxRQUFRLElBQUksa0NBQWtDLEdBQ3BELE9BQ0EsQ0FBQyxrQkFDQyxrQkFBaUIsTUFDckI7QUFFQSxVQUFNLGdDQUFnQyw0QkFBNEIsSUFDaEUsQ0FBQyxFQUFFLFNBQVMsRUFDZDtBQUVBLFVBQU0sdUJBQXVCLDJCQUEyQixPQUN0RCxDQUFDLEVBQUUsU0FBUyxDQUFDLDhCQUE4QixTQUFTLEVBQUUsQ0FDeEQ7QUFFQSxZQUFRLEtBQ04sYUFBYSxxQkFBcUIsVUFDbEMsV0FBVyw0QkFBNEIsUUFDekM7QUFFQSx5QkFBcUIsUUFBUSxtQkFBZ0I7QUFDM0Msb0JBQWEsSUFBSSxFQUFFLFVBQVUsTUFBTSxDQUFDO0FBQ3BDLDJCQUFxQixLQUFLLGFBQVk7QUFBQSxJQUN4QyxDQUFDO0FBRUQsZ0NBQTRCLFFBQVEsbUJBQWdCO0FBQ2xELG9CQUFhLElBQUksRUFBRSxVQUFVLE1BQU0sWUFBWSxNQUFNLENBQUM7QUFDdEQsMkJBQXFCLEtBQUssYUFBWTtBQUFBLElBQ3hDLENBQUM7QUFFRCxXQUFPLFFBQVEsSUFBSSx5QkFBeUIsNkJBQTZCO0FBQUEsRUFDM0U7QUFFQSxNQUFJLHdCQUF3QixZQUFZO0FBQ3RDLFdBQU8sUUFBUSxJQUFJLGdCQUFnQixZQUFZO0FBQUEsRUFDakQ7QUFDQSxNQUFJLE9BQU8sMkJBQTJCLFVBQVU7QUFDOUMsV0FBTyxRQUFRLElBQUksMEJBQTBCLHNCQUFzQjtBQUFBLEVBQ3JFO0FBQ0EsU0FBTyxRQUFRLElBQUksMEJBQTBCLFFBQVEsc0JBQXNCLENBQUM7QUFDNUUsU0FBTyxRQUFRLElBQUksMEJBQTBCLFFBQVEsc0JBQXNCLENBQUM7QUFFNUUsUUFBTSxRQUFRLE9BQU8sdUJBQXVCLHFCQUFxQjtBQUVqRSxNQUFJLENBQUMsT0FBTztBQUNWLFVBQU0sSUFBSSxNQUFNLHNCQUFzQjtBQUFBLEVBQ3hDO0FBRUEsUUFBTSxlQUFlLE1BQU0sT0FBTyx1QkFBdUIsbUJBQ3ZELE9BQ0EsU0FDRjtBQUVBLG1CQUFpQixlQUFlLGNBQWMsT0FBTztBQUVyRCxRQUFNLGVBQWUsYUFBYSxJQUFJLFdBQVc7QUFDakQsUUFBTSxvQkFBb0IsYUFBYSxJQUFJLGdCQUFnQjtBQUUzRCxlQUFhLElBQUk7QUFBQSxJQUNmLFlBQVksUUFBUSxrQkFBa0I7QUFBQSxJQUN0QyxjQUFjLFFBQVEsc0JBQXNCO0FBQUEsSUFDNUM7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDO0FBRUQsTUFBSSxvQkFBb0I7QUFDeEIsTUFBSSxjQUFjLFdBQVcsU0FBUyxHQUFHO0FBQ3ZDLHdCQUFvQixNQUFNLGFBQWEsY0FDckMsTUFBTSxTQUFTLFVBQVUsR0FDekIsRUFBRSx1QkFBdUIsS0FBSyxDQUNoQztBQUVBLFVBQU0sWUFBWSw4QkFBUyxjQUFjLFNBQVM7QUFDbEQsVUFBTSxhQUFhLGlCQUFpQixXQUFXLFVBQVU7QUFDekQsV0FBTyxRQUFRLElBQUksYUFBYSxTQUFTO0FBQUEsRUFDM0M7QUFFQSxRQUFNLEVBQUUsYUFBYSxTQUFTLGlCQUFpQiw2QkFDN0MsZ0JBQWdCLFlBQVksR0FDNUIsZUFDQSxZQUNGO0FBRUEsdUJBQXFCLEtBQUssWUFBWTtBQUV0QyxZQUFVLFFBQVEsT0FBTyxZQUFZO0FBRXJDLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGO0FBalJzQiIsCiAgIm5hbWVzIjogW10KfQo=
