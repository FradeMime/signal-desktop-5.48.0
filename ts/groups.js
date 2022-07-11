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
var groups_exports = {};
__export(groups_exports, {
  ID_LENGTH: () => ID_LENGTH,
  ID_V1_LENGTH: () => ID_V1_LENGTH,
  LINK_VERSION_ERROR: () => LINK_VERSION_ERROR,
  MASTER_KEY_LENGTH: () => MASTER_KEY_LENGTH,
  _isGroupChangeMessageBounceable: () => _isGroupChangeMessageBounceable,
  _maybeBuildAddBannedMemberActions: () => _maybeBuildAddBannedMemberActions,
  _mergeGroupChangeMessages: () => _mergeGroupChangeMessages,
  applyNewAvatar: () => applyNewAvatar,
  buildAccessControlAddFromInviteLinkChange: () => buildAccessControlAddFromInviteLinkChange,
  buildAccessControlAttributesChange: () => buildAccessControlAttributesChange,
  buildAccessControlMembersChange: () => buildAccessControlMembersChange,
  buildAddBannedMemberChange: () => buildAddBannedMemberChange,
  buildAddMember: () => buildAddMember,
  buildAddMembersChange: () => buildAddMembersChange,
  buildAddPendingAdminApprovalMemberChange: () => buildAddPendingAdminApprovalMemberChange,
  buildAnnouncementsOnlyChange: () => buildAnnouncementsOnlyChange,
  buildDeleteMemberChange: () => buildDeleteMemberChange,
  buildDeletePendingAdminApprovalMemberChange: () => buildDeletePendingAdminApprovalMemberChange,
  buildDeletePendingMemberChange: () => buildDeletePendingMemberChange,
  buildDisappearingMessagesTimerChange: () => buildDisappearingMessagesTimerChange,
  buildGroupLink: () => buildGroupLink,
  buildInviteLinkPasswordChange: () => buildInviteLinkPasswordChange,
  buildMigrationBubble: () => buildMigrationBubble,
  buildModifyMemberRoleChange: () => buildModifyMemberRoleChange,
  buildNewGroupLinkChange: () => buildNewGroupLinkChange,
  buildPromoteMemberChange: () => buildPromoteMemberChange,
  buildPromotePendingAdminApprovalMemberChange: () => buildPromotePendingAdminApprovalMemberChange,
  buildUpdateAttributesChange: () => buildUpdateAttributesChange,
  createGroupV2: () => createGroupV2,
  decryptGroupAvatar: () => decryptGroupAvatar,
  decryptGroupDescription: () => decryptGroupDescription,
  decryptGroupTitle: () => decryptGroupTitle,
  deriveGroupFields: () => deriveGroupFields,
  fetchMembershipProof: () => fetchMembershipProof,
  generateGroupInviteLinkPassword: () => generateGroupInviteLinkPassword,
  getBasicMigrationBubble: () => getBasicMigrationBubble,
  getGroupMigrationMembers: () => getGroupMigrationMembers,
  getMembershipList: () => getMembershipList,
  getPreJoinGroupInfo: () => getPreJoinGroupInfo,
  hasV1GroupBeenMigrated: () => hasV1GroupBeenMigrated,
  idForLogging: () => idForLogging,
  initiateMigrationToGroupV2: () => initiateMigrationToGroupV2,
  isGroupEligibleToMigrate: () => isGroupEligibleToMigrate,
  joinGroupV2ViaLinkAndMigrate: () => joinGroupV2ViaLinkAndMigrate,
  joinViaLink: () => import_joinViaLink.joinViaLink,
  maybeDeriveGroupV2Id: () => maybeDeriveGroupV2Id,
  maybeUpdateGroup: () => maybeUpdateGroup,
  modifyGroupV2: () => modifyGroupV2,
  parseGroupLink: () => parseGroupLink,
  respondToGroupV2Migration: () => respondToGroupV2Migration,
  uploadGroupChange: () => uploadGroupChange,
  waitThenMaybeUpdateGroup: () => waitThenMaybeUpdateGroup,
  waitThenRespondToGroupV2Migration: () => waitThenRespondToGroupV2Migration
});
module.exports = __toCommonJS(groups_exports);
var import_lodash = require("lodash");
var import_long = __toESM(require("long"));
var import_uuid = require("uuid");
var import_lru_cache = __toESM(require("lru-cache"));
var import_p_queue = __toESM(require("p-queue"));
var log = __toESM(require("./logging/log"));
var import_groupCredentialFetcher = require("./services/groupCredentialFetcher");
var import_Client = __toESM(require("./sql/Client"));
var import_webSafeBase64 = require("./util/webSafeBase64");
var import_assert = require("./util/assert");
var import_timestamp = require("./util/timestamp");
var durations = __toESM(require("./util/durations"));
var import_normalizeUuid = require("./util/normalizeUuid");
var import_dropNull = require("./util/dropNull");
var import_zkgroup = require("./util/zkgroup");
var import_Crypto = require("./Crypto");
var import_Message2 = require("./types/Message2");
var import_limits = require("./groups/limits");
var import_whatTypeOfConversation = require("./util/whatTypeOfConversation");
var Bytes = __toESM(require("./Bytes"));
var import_UUID = require("./types/UUID");
var Errors = __toESM(require("./types/errors"));
var import_protobuf = require("./protobuf");
var import_isNotNil = require("./util/isNotNil");
var import_util = require("./groups/util");
var import_conversationJobQueue = require("./jobs/conversationJobQueue");
var import_MessageReadStatus = require("./messages/MessageReadStatus");
var import_MessageSeenStatus = require("./MessageSeenStatus");
var import_joinViaLink = require("./groups/joinViaLink");
const MAX_CACHED_GROUP_FIELDS = 100;
const groupFieldsCache = new import_lru_cache.default({
  max: MAX_CACHED_GROUP_FIELDS
});
const { updateConversation } = import_Client.default;
if (!(0, import_lodash.isNumber)(import_Message2.CURRENT_SCHEMA_VERSION)) {
  throw new Error("groups.ts: Unable to capture max message schema from js/modules/types/message");
}
const MASTER_KEY_LENGTH = 32;
const GROUP_TITLE_MAX_ENCRYPTED_BYTES = 1024;
const GROUP_DESC_MAX_ENCRYPTED_BYTES = 8192;
const ID_V1_LENGTH = 16;
const ID_LENGTH = 32;
const TEMPORAL_AUTH_REJECTED_CODE = 401;
const GROUP_ACCESS_DENIED_CODE = 403;
const GROUP_NONEXISTENT_CODE = 404;
const SUPPORTED_CHANGE_EPOCH = 4;
const LINK_VERSION_ERROR = "LINK_VERSION_ERROR";
const GROUP_INVITE_LINK_PASSWORD_LENGTH = 16;
function generateBasicMessage() {
  return {
    id: (0, import_uuid.v4)(),
    schemaVersion: import_Message2.CURRENT_SCHEMA_VERSION
  };
}
function generateGroupInviteLinkPassword() {
  return (0, import_Crypto.getRandomBytes)(GROUP_INVITE_LINK_PASSWORD_LENGTH);
}
async function getPreJoinGroupInfo(inviteLinkPasswordBase64, masterKeyBase64) {
  const data = window.Signal.Groups.deriveGroupFields(Bytes.fromBase64(masterKeyBase64));
  return makeRequestWithTemporalRetry({
    logId: `getPreJoinInfo/groupv2(${data.id})`,
    publicParams: Bytes.toBase64(data.publicParams),
    secretParams: Bytes.toBase64(data.secretParams),
    request: (sender, options) => sender.getGroupFromLink(inviteLinkPasswordBase64, options)
  });
}
function buildGroupLink(conversation) {
  const { masterKey, groupInviteLinkPassword } = conversation.attributes;
  const bytes = import_protobuf.SignalService.GroupInviteLink.encode({
    v1Contents: {
      groupMasterKey: Bytes.fromBase64(masterKey),
      inviteLinkPassword: Bytes.fromBase64(groupInviteLinkPassword)
    }
  }).finish();
  const hash = (0, import_webSafeBase64.toWebSafeBase64)(Bytes.toBase64(bytes));
  return `https://signal.group/#${hash}`;
}
function parseGroupLink(hash) {
  const base64 = (0, import_webSafeBase64.fromWebSafeBase64)(hash);
  const buffer = Bytes.fromBase64(base64);
  const inviteLinkProto = import_protobuf.SignalService.GroupInviteLink.decode(buffer);
  if (inviteLinkProto.contents !== "v1Contents" || !inviteLinkProto.v1Contents) {
    const error = new Error("parseGroupLink: Parsed proto is missing v1Contents");
    error.name = LINK_VERSION_ERROR;
    throw error;
  }
  const {
    groupMasterKey: groupMasterKeyRaw,
    inviteLinkPassword: inviteLinkPasswordRaw
  } = inviteLinkProto.v1Contents;
  if (!groupMasterKeyRaw || !groupMasterKeyRaw.length) {
    throw new Error("v1Contents.groupMasterKey had no data!");
  }
  if (!inviteLinkPasswordRaw || !inviteLinkPasswordRaw.length) {
    throw new Error("v1Contents.inviteLinkPassword had no data!");
  }
  const masterKey = Bytes.toBase64(groupMasterKeyRaw);
  if (masterKey.length !== 44) {
    throw new Error(`masterKey had unexpected length ${masterKey.length}`);
  }
  const inviteLinkPassword = Bytes.toBase64(inviteLinkPasswordRaw);
  if (inviteLinkPassword.length === 0) {
    throw new Error(`inviteLinkPassword had unexpected length ${inviteLinkPassword.length}`);
  }
  return { masterKey, inviteLinkPassword };
}
async function uploadAvatar(options) {
  const { logId, publicParams, secretParams } = options;
  try {
    const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
    let data;
    if ("data" in options) {
      ({ data } = options);
    } else {
      data = await window.Signal.Migrations.readAttachmentData(options.path);
    }
    const hash = (0, import_Crypto.computeHash)(data);
    const blobPlaintext = import_protobuf.SignalService.GroupAttributeBlob.encode({
      avatar: data
    }).finish();
    const ciphertext = (0, import_zkgroup.encryptGroupBlob)(clientZkGroupCipher, blobPlaintext);
    const key = await makeRequestWithTemporalRetry({
      logId: `uploadGroupAvatar/${logId}`,
      publicParams,
      secretParams,
      request: (sender, requestOptions) => sender.uploadGroupAvatar(ciphertext, requestOptions)
    });
    return {
      data,
      hash,
      key
    };
  } catch (error) {
    log.warn(`uploadAvatar/${logId} Failed to upload avatar`, error.stack);
    throw error;
  }
}
function buildGroupTitleBuffer(clientZkGroupCipher, title) {
  const titleBlobPlaintext = import_protobuf.SignalService.GroupAttributeBlob.encode({
    title
  }).finish();
  const result = (0, import_zkgroup.encryptGroupBlob)(clientZkGroupCipher, titleBlobPlaintext);
  if (result.byteLength > GROUP_TITLE_MAX_ENCRYPTED_BYTES) {
    throw new Error("buildGroupTitleBuffer: encrypted group title is too long");
  }
  return result;
}
function buildGroupDescriptionBuffer(clientZkGroupCipher, description) {
  const attrsBlobPlaintext = import_protobuf.SignalService.GroupAttributeBlob.encode({
    descriptionText: description
  }).finish();
  const result = (0, import_zkgroup.encryptGroupBlob)(clientZkGroupCipher, attrsBlobPlaintext);
  if (result.byteLength > GROUP_DESC_MAX_ENCRYPTED_BYTES) {
    throw new Error("buildGroupDescriptionBuffer: encrypted group title is too long");
  }
  return result;
}
function buildGroupProto(attributes) {
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  const logId = `groupv2(${attributes.id})`;
  const { publicParams, secretParams } = attributes;
  if (!publicParams) {
    throw new Error(`buildGroupProto/${logId}: attributes were missing publicParams!`);
  }
  if (!secretParams) {
    throw new Error(`buildGroupProto/${logId}: attributes were missing secretParams!`);
  }
  const serverPublicParamsBase64 = window.getServerPublicParams();
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(serverPublicParamsBase64);
  const proto = new import_protobuf.SignalService.Group();
  proto.publicKey = Bytes.fromBase64(publicParams);
  proto.version = attributes.revision || 0;
  if (attributes.name) {
    proto.title = buildGroupTitleBuffer(clientZkGroupCipher, attributes.name);
  }
  if (attributes.avatarUrl) {
    proto.avatar = attributes.avatarUrl;
  }
  if (attributes.expireTimer) {
    const timerBlobPlaintext = import_protobuf.SignalService.GroupAttributeBlob.encode({
      disappearingMessagesDuration: attributes.expireTimer
    }).finish();
    proto.disappearingMessagesTimer = (0, import_zkgroup.encryptGroupBlob)(clientZkGroupCipher, timerBlobPlaintext);
  }
  const accessControl = new import_protobuf.SignalService.AccessControl();
  if (attributes.accessControl) {
    accessControl.attributes = attributes.accessControl.attributes || ACCESS_ENUM.MEMBER;
    accessControl.members = attributes.accessControl.members || ACCESS_ENUM.MEMBER;
  } else {
    accessControl.attributes = ACCESS_ENUM.MEMBER;
    accessControl.members = ACCESS_ENUM.MEMBER;
  }
  proto.accessControl = accessControl;
  proto.members = (attributes.membersV2 || []).map((item) => {
    const member = new import_protobuf.SignalService.Member();
    const conversation = window.ConversationController.get(item.uuid);
    if (!conversation) {
      throw new Error(`buildGroupProto/${logId}: no conversation for member!`);
    }
    const profileKeyCredentialBase64 = conversation.get("profileKeyCredential");
    if (!profileKeyCredentialBase64) {
      throw new Error(`buildGroupProto/${logId}: member was missing profileKeyCredential!`);
    }
    const presentation = (0, import_zkgroup.createProfileKeyCredentialPresentation)(clientZkProfileCipher, profileKeyCredentialBase64, secretParams);
    member.role = item.role || MEMBER_ROLE_ENUM.DEFAULT;
    member.presentation = presentation;
    return member;
  });
  const ourUuid = window.storage.user.getCheckedUuid();
  const ourUuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, ourUuid.toString());
  proto.membersPendingProfileKey = (attributes.pendingMembersV2 || []).map((item) => {
    const pendingMember = new import_protobuf.SignalService.MemberPendingProfileKey();
    const member = new import_protobuf.SignalService.Member();
    const conversation = window.ConversationController.get(item.uuid);
    if (!conversation) {
      throw new Error("buildGroupProto: no conversation for pending member!");
    }
    const uuid = conversation.get("uuid");
    if (!uuid) {
      throw new Error("buildGroupProto: pending member was missing uuid!");
    }
    const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
    member.userId = uuidCipherTextBuffer;
    member.role = item.role || MEMBER_ROLE_ENUM.DEFAULT;
    pendingMember.member = member;
    pendingMember.timestamp = import_long.default.fromNumber(item.timestamp);
    pendingMember.addedByUserId = ourUuidCipherTextBuffer;
    return pendingMember;
  });
  return proto;
}
async function buildAddMembersChange(conversation, conversationIds) {
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const { id, publicParams, revision, secretParams } = conversation;
  const logId = `groupv2(${id})`;
  if (!publicParams) {
    throw new Error(`buildAddMembersChange/${logId}: attributes were missing publicParams!`);
  }
  if (!secretParams) {
    throw new Error(`buildAddMembersChange/${logId}: attributes were missing secretParams!`);
  }
  const newGroupVersion = (revision || 0) + 1;
  const serverPublicParamsBase64 = window.getServerPublicParams();
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(serverPublicParamsBase64);
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  const ourUuid = window.storage.user.getCheckedUuid();
  const ourUuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, ourUuid.toString());
  const now = Date.now();
  const addMembers = [];
  const addPendingMembers = [];
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  await Promise.all(conversationIds.map(async (conversationId) => {
    const contact = window.ConversationController.get(conversationId);
    if (!contact) {
      (0, import_assert.assert)(false, `buildAddMembersChange/${logId}: missing local contact, skipping`);
      return;
    }
    const uuid = contact.get("uuid");
    if (!uuid) {
      (0, import_assert.assert)(false, `buildAddMembersChange/${logId}: missing UUID; skipping`);
      return;
    }
    if (!contact.get("profileKey") || !contact.get("profileKeyCredential")) {
      await contact.getProfiles();
    }
    const profileKey = contact.get("profileKey");
    const profileKeyCredential = contact.get("profileKeyCredential");
    const member = new import_protobuf.SignalService.Member();
    member.userId = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
    member.role = MEMBER_ROLE_ENUM.DEFAULT;
    member.joinedAtVersion = newGroupVersion;
    if (profileKey && profileKeyCredential) {
      member.presentation = (0, import_zkgroup.createProfileKeyCredentialPresentation)(clientZkProfileCipher, profileKeyCredential, secretParams);
      const addMemberAction = new import_protobuf.SignalService.GroupChange.Actions.AddMemberAction();
      addMemberAction.added = member;
      addMemberAction.joinFromInviteLink = false;
      addMembers.push(addMemberAction);
    } else {
      const memberPendingProfileKey = new import_protobuf.SignalService.MemberPendingProfileKey();
      memberPendingProfileKey.member = member;
      memberPendingProfileKey.addedByUserId = ourUuidCipherTextBuffer;
      memberPendingProfileKey.timestamp = import_long.default.fromNumber(now);
      const addPendingMemberAction = new import_protobuf.SignalService.GroupChange.Actions.AddMemberPendingProfileKeyAction();
      addPendingMemberAction.added = memberPendingProfileKey;
      addPendingMembers.push(addPendingMemberAction);
    }
    const doesMemberNeedUnban = conversation.bannedMembersV2?.find((bannedMember) => bannedMember.uuid === uuid);
    if (doesMemberNeedUnban) {
      const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
      const deleteMemberBannedAction = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberBannedAction();
      deleteMemberBannedAction.deletedUserId = uuidCipherTextBuffer;
      actions.deleteMembersBanned = actions.deleteMembersBanned || [];
      actions.deleteMembersBanned.push(deleteMemberBannedAction);
    }
  }));
  if (!addMembers.length && !addPendingMembers.length) {
    return void 0;
  }
  if (addMembers.length) {
    actions.addMembers = addMembers;
  }
  if (addPendingMembers.length) {
    actions.addPendingMembers = addPendingMembers;
  }
  actions.version = newGroupVersion;
  return actions;
}
async function buildUpdateAttributesChange(conversation, attributes) {
  const { publicParams, secretParams, revision, id } = conversation;
  const logId = `groupv2(${id})`;
  if (!publicParams) {
    throw new Error(`buildUpdateAttributesChange/${logId}: attributes were missing publicParams!`);
  }
  if (!secretParams) {
    throw new Error(`buildUpdateAttributesChange/${logId}: attributes were missing secretParams!`);
  }
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  let hasChangedSomething = false;
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  if ("avatar" in attributes) {
    hasChangedSomething = true;
    actions.modifyAvatar = new import_protobuf.SignalService.GroupChange.Actions.ModifyAvatarAction();
    const { avatar } = attributes;
    if (avatar) {
      const uploadedAvatar = await uploadAvatar({
        data: avatar,
        logId,
        publicParams,
        secretParams
      });
      actions.modifyAvatar.avatar = uploadedAvatar.key;
    }
  }
  const { title } = attributes;
  if (title) {
    hasChangedSomething = true;
    actions.modifyTitle = new import_protobuf.SignalService.GroupChange.Actions.ModifyTitleAction();
    actions.modifyTitle.title = buildGroupTitleBuffer(clientZkGroupCipher, title);
  }
  const { description } = attributes;
  if (typeof description === "string") {
    hasChangedSomething = true;
    actions.modifyDescription = new import_protobuf.SignalService.GroupChange.Actions.ModifyDescriptionAction();
    actions.modifyDescription.descriptionBytes = buildGroupDescriptionBuffer(clientZkGroupCipher, description);
  }
  if (!hasChangedSomething) {
    return void 0;
  }
  actions.version = (revision || 0) + 1;
  return actions;
}
function buildDisappearingMessagesTimerChange({
  expireTimer,
  group
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  const blob = new import_protobuf.SignalService.GroupAttributeBlob();
  blob.disappearingMessagesDuration = expireTimer;
  if (!group.secretParams) {
    throw new Error("buildDisappearingMessagesTimerChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const blobPlaintext = import_protobuf.SignalService.GroupAttributeBlob.encode(blob).finish();
  const blobCipherText = (0, import_zkgroup.encryptGroupBlob)(clientZkGroupCipher, blobPlaintext);
  const timerAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyDisappearingMessagesTimerAction();
  timerAction.timer = blobCipherText;
  actions.version = (group.revision || 0) + 1;
  actions.modifyDisappearingMessagesTimer = timerAction;
  return actions;
}
function buildInviteLinkPasswordChange(group, inviteLinkPassword) {
  const inviteLinkPasswordAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyInviteLinkPasswordAction();
  inviteLinkPasswordAction.inviteLinkPassword = Bytes.fromBase64(inviteLinkPassword);
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyInviteLinkPassword = inviteLinkPasswordAction;
  return actions;
}
function buildNewGroupLinkChange(group, inviteLinkPassword, addFromInviteLinkAccess) {
  const accessControlAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyAddFromInviteLinkAccessControlAction();
  accessControlAction.addFromInviteLinkAccess = addFromInviteLinkAccess;
  const inviteLinkPasswordAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyInviteLinkPasswordAction();
  inviteLinkPasswordAction.inviteLinkPassword = Bytes.fromBase64(inviteLinkPassword);
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyAddFromInviteLinkAccess = accessControlAction;
  actions.modifyInviteLinkPassword = inviteLinkPasswordAction;
  return actions;
}
function buildAccessControlAddFromInviteLinkChange(group, value) {
  const accessControlAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyAddFromInviteLinkAccessControlAction();
  accessControlAction.addFromInviteLinkAccess = value;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyAddFromInviteLinkAccess = accessControlAction;
  return actions;
}
function buildAnnouncementsOnlyChange(group, value) {
  const action = new import_protobuf.SignalService.GroupChange.Actions.ModifyAnnouncementsOnlyAction();
  action.announcementsOnly = value;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyAnnouncementsOnly = action;
  return actions;
}
function buildAccessControlAttributesChange(group, value) {
  const accessControlAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyAttributesAccessControlAction();
  accessControlAction.attributesAccess = value;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyAttributesAccess = accessControlAction;
  return actions;
}
function buildAccessControlMembersChange(group, value) {
  const accessControlAction = new import_protobuf.SignalService.GroupChange.Actions.ModifyMembersAccessControlAction();
  accessControlAction.membersAccess = value;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  actions.version = (group.revision || 0) + 1;
  actions.modifyMemberAccess = accessControlAction;
  return actions;
}
function _maybeBuildAddBannedMemberActions({
  clientZkGroupCipher,
  group,
  ourUuid,
  uuid
}) {
  const doesMemberNeedBan = !group.bannedMembersV2?.find((member) => member.uuid === uuid) && uuid !== ourUuid;
  if (!doesMemberNeedBan) {
    return {};
  }
  const sortedBannedMembers = [...group.bannedMembersV2 ?? []].sort((a, b) => {
    return b.timestamp - a.timestamp;
  });
  const deletedBannedMembers = sortedBannedMembers.slice(Math.max(0, (0, import_limits.getGroupSizeHardLimit)() - 1));
  let deleteMembersBanned = null;
  if (deletedBannedMembers.length > 0) {
    deleteMembersBanned = deletedBannedMembers.map((bannedMember) => {
      const deleteMemberBannedAction = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberBannedAction();
      deleteMemberBannedAction.deletedUserId = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, bannedMember.uuid);
      return deleteMemberBannedAction;
    });
  }
  const addMemberBannedAction = new import_protobuf.SignalService.GroupChange.Actions.AddMemberBannedAction();
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  addMemberBannedAction.added = new import_protobuf.SignalService.MemberBanned();
  addMemberBannedAction.added.userId = uuidCipherTextBuffer;
  return {
    addMembersBanned: [addMemberBannedAction],
    deleteMembersBanned
  };
}
function buildDeletePendingAdminApprovalMemberChange({
  group,
  ourUuid,
  uuid
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildDeletePendingAdminApprovalMemberChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  const deleteMemberPendingAdminApproval = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberPendingAdminApprovalAction();
  deleteMemberPendingAdminApproval.deletedUserId = uuidCipherTextBuffer;
  actions.version = (group.revision || 0) + 1;
  actions.deleteMemberPendingAdminApprovals = [
    deleteMemberPendingAdminApproval
  ];
  const { addMembersBanned, deleteMembersBanned } = _maybeBuildAddBannedMemberActions({
    clientZkGroupCipher,
    group,
    ourUuid,
    uuid
  });
  if (addMembersBanned) {
    actions.addMembersBanned = addMembersBanned;
  }
  if (deleteMembersBanned) {
    actions.deleteMembersBanned = deleteMembersBanned;
  }
  return actions;
}
function buildAddPendingAdminApprovalMemberChange({
  group,
  profileKeyCredentialBase64,
  serverPublicParamsBase64
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildAddPendingAdminApprovalMemberChange: group was missing secretParams!");
  }
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(serverPublicParamsBase64);
  const addMemberPendingAdminApproval = new import_protobuf.SignalService.GroupChange.Actions.AddMemberPendingAdminApprovalAction();
  const presentation = (0, import_zkgroup.createProfileKeyCredentialPresentation)(clientZkProfileCipher, profileKeyCredentialBase64, group.secretParams);
  const added = new import_protobuf.SignalService.MemberPendingAdminApproval();
  added.presentation = presentation;
  addMemberPendingAdminApproval.added = added;
  actions.version = (group.revision || 0) + 1;
  actions.addMemberPendingAdminApprovals = [addMemberPendingAdminApproval];
  return actions;
}
function buildAddMember({
  group,
  profileKeyCredentialBase64,
  serverPublicParamsBase64,
  uuid
}) {
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildAddMember: group was missing secretParams!");
  }
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(serverPublicParamsBase64);
  const addMember = new import_protobuf.SignalService.GroupChange.Actions.AddMemberAction();
  const presentation = (0, import_zkgroup.createProfileKeyCredentialPresentation)(clientZkProfileCipher, profileKeyCredentialBase64, group.secretParams);
  const added = new import_protobuf.SignalService.Member();
  added.presentation = presentation;
  added.role = MEMBER_ROLE_ENUM.DEFAULT;
  addMember.added = added;
  actions.version = (group.revision || 0) + 1;
  actions.addMembers = [addMember];
  const doesMemberNeedUnban = group.bannedMembersV2?.find((member) => member.uuid === uuid);
  if (doesMemberNeedUnban) {
    const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
    const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
    const deleteMemberBannedAction = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberBannedAction();
    deleteMemberBannedAction.deletedUserId = uuidCipherTextBuffer;
    actions.deleteMembersBanned = [deleteMemberBannedAction];
  }
  return actions;
}
function buildDeletePendingMemberChange({
  uuids,
  group
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildDeletePendingMemberChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const deletePendingMembers = uuids.map((uuid) => {
    const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
    const deletePendingMember = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberPendingProfileKeyAction();
    deletePendingMember.deletedUserId = uuidCipherTextBuffer;
    return deletePendingMember;
  });
  actions.version = (group.revision || 0) + 1;
  actions.deletePendingMembers = deletePendingMembers;
  return actions;
}
function buildDeleteMemberChange({
  group,
  ourUuid,
  uuid
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildDeleteMemberChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  const deleteMember = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberAction();
  deleteMember.deletedUserId = uuidCipherTextBuffer;
  actions.version = (group.revision || 0) + 1;
  actions.deleteMembers = [deleteMember];
  const { addMembersBanned, deleteMembersBanned } = _maybeBuildAddBannedMemberActions({
    clientZkGroupCipher,
    group,
    ourUuid,
    uuid
  });
  if (addMembersBanned) {
    actions.addMembersBanned = addMembersBanned;
  }
  if (deleteMembersBanned) {
    actions.deleteMembersBanned = deleteMembersBanned;
  }
  return actions;
}
function buildAddBannedMemberChange({
  uuid,
  group
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildAddBannedMemberChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  const addMemberBannedAction = new import_protobuf.SignalService.GroupChange.Actions.AddMemberBannedAction();
  addMemberBannedAction.added = new import_protobuf.SignalService.MemberBanned();
  addMemberBannedAction.added.userId = uuidCipherTextBuffer;
  actions.addMembersBanned = [addMemberBannedAction];
  if (group.pendingAdminApprovalV2?.some((item) => item.uuid === uuid)) {
    const deleteMemberPendingAdminApprovalAction = new import_protobuf.SignalService.GroupChange.Actions.DeleteMemberPendingAdminApprovalAction();
    deleteMemberPendingAdminApprovalAction.deletedUserId = uuidCipherTextBuffer;
    actions.deleteMemberPendingAdminApprovals = [
      deleteMemberPendingAdminApprovalAction
    ];
  }
  actions.version = (group.revision || 0) + 1;
  return actions;
}
function buildModifyMemberRoleChange({
  uuid,
  group,
  role
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildMakeAdminChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  const toggleAdmin = new import_protobuf.SignalService.GroupChange.Actions.ModifyMemberRoleAction();
  toggleAdmin.userId = uuidCipherTextBuffer;
  toggleAdmin.role = role;
  actions.version = (group.revision || 0) + 1;
  actions.modifyMemberRoles = [toggleAdmin];
  return actions;
}
function buildPromotePendingAdminApprovalMemberChange({
  group,
  uuid
}) {
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildAddPendingAdminApprovalMemberChange: group was missing secretParams!");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(group.secretParams);
  const uuidCipherTextBuffer = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
  const promotePendingMember = new import_protobuf.SignalService.GroupChange.Actions.PromoteMemberPendingAdminApprovalAction();
  promotePendingMember.userId = uuidCipherTextBuffer;
  promotePendingMember.role = MEMBER_ROLE_ENUM.DEFAULT;
  actions.version = (group.revision || 0) + 1;
  actions.promoteMemberPendingAdminApprovals = [promotePendingMember];
  return actions;
}
function buildPromoteMemberChange({
  group,
  profileKeyCredentialBase64,
  serverPublicParamsBase64
}) {
  const actions = new import_protobuf.SignalService.GroupChange.Actions();
  if (!group.secretParams) {
    throw new Error("buildDisappearingMessagesTimerChange: group was missing secretParams!");
  }
  const clientZkProfileCipher = (0, import_zkgroup.getClientZkProfileOperations)(serverPublicParamsBase64);
  const presentation = (0, import_zkgroup.createProfileKeyCredentialPresentation)(clientZkProfileCipher, profileKeyCredentialBase64, group.secretParams);
  const promotePendingMember = new import_protobuf.SignalService.GroupChange.Actions.PromoteMemberPendingProfileKeyAction();
  promotePendingMember.presentation = presentation;
  actions.version = (group.revision || 0) + 1;
  actions.promotePendingMembers = [promotePendingMember];
  return actions;
}
async function uploadGroupChange({
  actions,
  group,
  inviteLinkPassword
}) {
  const logId = idForLogging(group.groupId);
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  if (!group.secretParams) {
    throw new Error("uploadGroupChange: group was missing secretParams!");
  }
  if (!group.publicParams) {
    throw new Error("uploadGroupChange: group was missing publicParams!");
  }
  return makeRequestWithTemporalRetry({
    logId: `uploadGroupChange/${logId}`,
    publicParams: group.publicParams,
    secretParams: group.secretParams,
    request: (sender, options) => sender.modifyGroup(actions, options, inviteLinkPassword)
  });
}
async function modifyGroupV2({
  conversation,
  createGroupChange,
  extraConversationsForSend,
  inviteLinkPassword,
  name
}) {
  const logId = `${name}/${conversation.idForLogging()}`;
  if (!(0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
    throw new Error(`modifyGroupV2/${logId}: Called for non-GroupV2 conversation`);
  }
  const startTime = Date.now();
  const timeoutTime = startTime + durations.MINUTE;
  const MAX_ATTEMPTS = 5;
  for (let attempt = 0; attempt < MAX_ATTEMPTS; attempt += 1) {
    log.info(`modifyGroupV2/${logId}: Starting attempt ${attempt}`);
    try {
      await window.waitForEmptyEventQueue();
      log.info(`modifyGroupV2/${logId}: Queuing attempt ${attempt}`);
      await conversation.queueJob("modifyGroupV2", async () => {
        log.info(`modifyGroupV2/${logId}: Running attempt ${attempt}`);
        const actions = await createGroupChange();
        if (!actions) {
          log.warn(`modifyGroupV2/${logId}: No change actions. Returning early.`);
          return;
        }
        const currentRevision = conversation.get("revision");
        const newRevision = actions.version;
        if ((currentRevision || 0) + 1 !== newRevision) {
          throw new Error(`modifyGroupV2/${logId}: Revision mismatch - ${currentRevision} to ${newRevision}.`);
        }
        const groupChange = await window.Signal.Groups.uploadGroupChange({
          actions,
          inviteLinkPassword,
          group: conversation.attributes
        });
        const groupChangeBuffer = import_protobuf.SignalService.GroupChange.encode(groupChange).finish();
        const groupChangeBase64 = Bytes.toBase64(groupChangeBuffer);
        await window.Signal.Groups.maybeUpdateGroup({
          conversation,
          groupChange: {
            base64: groupChangeBase64,
            isTrusted: true
          },
          newRevision
        });
        const groupV2Info = conversation.getGroupV2Info({
          includePendingMembers: true,
          extraConversationsForSend
        });
        (0, import_assert.strictAssert)(groupV2Info, "missing groupV2Info");
        await import_conversationJobQueue.conversationJobQueue.add({
          type: import_conversationJobQueue.conversationQueueJobEnum.enum.GroupUpdate,
          conversationId: conversation.id,
          groupChangeBase64,
          recipients: groupV2Info.members,
          revision: groupV2Info.revision
        });
      });
      log.info(`modifyGroupV2/${logId}: Update complete, with attempt ${attempt}!`);
      break;
    } catch (error) {
      if (error.code === 409 && Date.now() <= timeoutTime) {
        log.info(`modifyGroupV2/${logId}: Conflict while updating. Trying again...`);
        await conversation.fetchLatestGroupV2Data({ force: true });
      } else if (error.code === 409) {
        log.error(`modifyGroupV2/${logId}: Conflict while updating. Timed out; not retrying.`);
        conversation.fetchLatestGroupV2Data({ force: true });
        throw error;
      } else {
        const errorString = error && error.stack ? error.stack : error;
        log.error(`modifyGroupV2/${logId}: Error updating: ${errorString}`);
        throw error;
      }
    }
  }
}
function idForLogging(groupId) {
  return `groupv2(${groupId})`;
}
function deriveGroupFields(masterKey) {
  if (masterKey.length !== MASTER_KEY_LENGTH) {
    throw new Error(`deriveGroupFields: masterKey had length ${masterKey.length}, expected ${MASTER_KEY_LENGTH}`);
  }
  const cacheKey = Bytes.toBase64(masterKey);
  const cached = groupFieldsCache.get(cacheKey);
  if (cached) {
    return cached;
  }
  log.info("deriveGroupFields: cache miss");
  const secretParams = (0, import_zkgroup.deriveGroupSecretParams)(masterKey);
  const publicParams = (0, import_zkgroup.deriveGroupPublicParams)(secretParams);
  const id = (0, import_zkgroup.deriveGroupID)(secretParams);
  const fresh = {
    id,
    secretParams,
    publicParams
  };
  groupFieldsCache.set(cacheKey, fresh);
  return fresh;
}
async function makeRequestWithTemporalRetry({
  logId,
  publicParams,
  secretParams,
  request
}) {
  const data = window.storage.get(import_groupCredentialFetcher.GROUP_CREDENTIALS_KEY);
  if (!data) {
    throw new Error(`makeRequestWithTemporalRetry/${logId}: No group credentials!`);
  }
  const groupCredentials = (0, import_groupCredentialFetcher.getCredentialsForToday)(data);
  const sender = window.textsecure.messaging;
  if (!sender) {
    throw new Error(`makeRequestWithTemporalRetry/${logId}: textsecure.messaging is not available!`);
  }
  const todayOptions = getGroupCredentials({
    authCredentialBase64: groupCredentials.today.credential,
    groupPublicParamsBase64: publicParams,
    groupSecretParamsBase64: secretParams,
    serverPublicParamsBase64: window.getServerPublicParams()
  });
  try {
    return await request(sender, todayOptions);
  } catch (todayError) {
    if (todayError.code === TEMPORAL_AUTH_REJECTED_CODE) {
      log.warn(`makeRequestWithTemporalRetry/${logId}: Trying again with tomorrow's credentials`);
      const tomorrowOptions = getGroupCredentials({
        authCredentialBase64: groupCredentials.tomorrow.credential,
        groupPublicParamsBase64: publicParams,
        groupSecretParamsBase64: secretParams,
        serverPublicParamsBase64: window.getServerPublicParams()
      });
      return request(sender, tomorrowOptions);
    }
    throw todayError;
  }
}
async function fetchMembershipProof({
  publicParams,
  secretParams
}) {
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  if (!publicParams) {
    throw new Error("fetchMembershipProof: group was missing publicParams!");
  }
  if (!secretParams) {
    throw new Error("fetchMembershipProof: group was missing secretParams!");
  }
  const response = await makeRequestWithTemporalRetry({
    logId: "fetchMembershipProof",
    publicParams,
    secretParams,
    request: (sender, options) => sender.getGroupMembershipToken(options)
  });
  return response.token;
}
async function createGroupV2({
  name,
  avatar,
  expireTimer,
  conversationIds,
  avatars
}) {
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const masterKeyBuffer = (0, import_Crypto.getRandomBytes)(32);
  const fields = deriveGroupFields(masterKeyBuffer);
  const groupId = Bytes.toBase64(fields.id);
  const logId = `groupv2(${groupId})`;
  const masterKey = Bytes.toBase64(masterKeyBuffer);
  const secretParams = Bytes.toBase64(fields.secretParams);
  const publicParams = Bytes.toBase64(fields.publicParams);
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const membersV2 = [
    {
      uuid: ourUuid,
      role: MEMBER_ROLE_ENUM.ADMINISTRATOR,
      joinedAtVersion: 0
    }
  ];
  const pendingMembersV2 = [];
  let uploadedAvatar;
  await Promise.all([
    ...conversationIds.map(async (conversationId) => {
      const contact = window.ConversationController.get(conversationId);
      if (!contact) {
        (0, import_assert.assert)(false, `createGroupV2/${logId}: missing local contact, skipping`);
        return;
      }
      const contactUuid = contact.get("uuid");
      if (!contactUuid) {
        (0, import_assert.assert)(false, `createGroupV2/${logId}: missing UUID; skipping`);
        return;
      }
      if (!contact.get("profileKey") || !contact.get("profileKeyCredential")) {
        await contact.getProfiles();
      }
      if (contact.get("profileKey") && contact.get("profileKeyCredential")) {
        membersV2.push({
          uuid: contactUuid,
          role: MEMBER_ROLE_ENUM.DEFAULT,
          joinedAtVersion: 0
        });
      } else {
        pendingMembersV2.push({
          addedByUserId: ourUuid,
          uuid: contactUuid,
          timestamp: Date.now(),
          role: MEMBER_ROLE_ENUM.DEFAULT
        });
      }
    }),
    (async () => {
      if (!avatar) {
        return;
      }
      uploadedAvatar = await uploadAvatar({
        data: avatar,
        logId,
        publicParams,
        secretParams
      });
    })()
  ]);
  if (membersV2.length + pendingMembersV2.length > (0, import_limits.getGroupSizeHardLimit)()) {
    throw new Error(`createGroupV2/${logId}: Too many members! Member count: ${membersV2.length}, Pending member count: ${pendingMembersV2.length}`);
  }
  const protoAndConversationAttributes = {
    name,
    revision: 0,
    publicParams,
    secretParams,
    accessControl: {
      attributes: ACCESS_ENUM.MEMBER,
      members: ACCESS_ENUM.MEMBER,
      addFromInviteLink: ACCESS_ENUM.UNSATISFIABLE
    },
    membersV2,
    pendingMembersV2
  };
  const groupProto = await buildGroupProto({
    id: groupId,
    avatarUrl: uploadedAvatar?.key,
    ...protoAndConversationAttributes
  });
  await makeRequestWithTemporalRetry({
    logId: `createGroupV2/${logId}`,
    publicParams,
    secretParams,
    request: (sender, options) => sender.createGroup(groupProto, options)
  });
  let avatarAttribute;
  if (uploadedAvatar) {
    try {
      avatarAttribute = {
        url: uploadedAvatar.key,
        path: await window.Signal.Migrations.writeNewAttachmentData(uploadedAvatar.data),
        hash: uploadedAvatar.hash
      };
    } catch (err) {
      log.warn(`createGroupV2/${logId}: avatar failed to save to disk. Continuing on`);
    }
  }
  const now = Date.now();
  const conversation = await window.ConversationController.getOrCreateAndWait(groupId, "group", {
    ...protoAndConversationAttributes,
    active_at: now,
    addedBy: ourUuid,
    avatar: avatarAttribute,
    avatars,
    groupVersion: 2,
    masterKey,
    profileSharing: true,
    timestamp: now,
    needsStorageServiceSync: true
  });
  await conversation.queueJob("storageServiceUploadJob", async () => {
    await window.Signal.Services.storageServiceUploadJob();
  });
  const timestamp = Date.now();
  const groupV2Info = conversation.getGroupV2Info({
    includePendingMembers: true
  });
  (0, import_assert.strictAssert)(groupV2Info, "missing groupV2Info");
  await import_conversationJobQueue.conversationJobQueue.add({
    type: import_conversationJobQueue.conversationQueueJobEnum.enum.GroupUpdate,
    conversationId: conversation.id,
    recipients: groupV2Info.members,
    revision: groupV2Info.revision
  });
  const createdTheGroupMessage = {
    ...generateBasicMessage(),
    type: "group-v2-change",
    sourceUuid: ourUuid,
    conversationId: conversation.id,
    readStatus: import_MessageReadStatus.ReadStatus.Read,
    received_at: window.Signal.Util.incrementMessageCounter(),
    received_at_ms: timestamp,
    timestamp,
    seenStatus: import_MessageSeenStatus.SeenStatus.Seen,
    sent_at: timestamp,
    groupV2Change: {
      from: ourUuid,
      details: [{ type: "create" }]
    }
  };
  await import_Client.default.saveMessages([createdTheGroupMessage], {
    forceSave: true,
    ourUuid
  });
  const model = new window.Whisper.Message(createdTheGroupMessage);
  window.MessageController.register(model.id, model);
  conversation.trigger("newmessage", model);
  if (expireTimer) {
    await conversation.updateExpirationTimer(expireTimer, {
      reason: "createGroupV2"
    });
  }
  return conversation;
}
async function hasV1GroupBeenMigrated(conversation) {
  const logId = conversation.idForLogging();
  const isGroupV1 = (0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes);
  if (!isGroupV1) {
    log.warn(`checkForGV2Existence/${logId}: Called for non-GroupV1 conversation!`);
    return false;
  }
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  const groupId = conversation.get("groupId");
  if (!groupId) {
    throw new Error(`checkForGV2Existence/${logId}: No groupId!`);
  }
  const idBuffer = Bytes.fromBinary(groupId);
  const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(idBuffer);
  const fields = deriveGroupFields(masterKeyBuffer);
  try {
    await makeRequestWithTemporalRetry({
      logId: `getGroup/${logId}`,
      publicParams: Bytes.toBase64(fields.publicParams),
      secretParams: Bytes.toBase64(fields.secretParams),
      request: (sender, options) => sender.getGroup(options)
    });
    return true;
  } catch (error) {
    const { code } = error;
    return code !== GROUP_NONEXISTENT_CODE;
  }
}
function maybeDeriveGroupV2Id(conversation) {
  const isGroupV1 = (0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes);
  const groupV1Id = conversation.get("groupId");
  const derived = conversation.get("derivedGroupV2Id");
  if (!isGroupV1 || !groupV1Id || derived) {
    return false;
  }
  const v1IdBuffer = Bytes.fromBinary(groupV1Id);
  const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(v1IdBuffer);
  const fields = deriveGroupFields(masterKeyBuffer);
  const derivedGroupV2Id = Bytes.toBase64(fields.id);
  conversation.set({
    derivedGroupV2Id
  });
  return true;
}
async function isGroupEligibleToMigrate(conversation) {
  if (!(0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
    return false;
  }
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const areWeMember = !conversation.get("left") && conversation.hasMember(ourUuid);
  if (!areWeMember) {
    return false;
  }
  const members = conversation.get("members") || [];
  for (let i = 0, max = members.length; i < max; i += 1) {
    const identifier = members[i];
    const contact = window.ConversationController.get(identifier);
    if (!contact) {
      return false;
    }
    if (!contact.get("uuid")) {
      return false;
    }
  }
  return true;
}
async function getGroupMigrationMembers(conversation) {
  const logId = conversation.idForLogging();
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const ourConversationId = window.ConversationController.getOurConversationId();
  if (!ourConversationId) {
    throw new Error(`getGroupMigrationMembers/${logId}: Couldn't fetch our own conversationId!`);
  }
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  let areWeMember = false;
  let areWeInvited = false;
  const previousGroupV1Members = conversation.get("members") || [];
  const now = Date.now();
  const memberLookup = {};
  const membersV2 = (0, import_lodash.compact)(await Promise.all(previousGroupV1Members.map(async (e164) => {
    const contact = window.ConversationController.get(e164);
    if (!contact) {
      throw new Error(`getGroupMigrationMembers/${logId}: membersV2 - missing local contact for ${e164}, skipping.`);
    }
    if (!(0, import_whatTypeOfConversation.isMe)(contact.attributes) && window.GV2_MIGRATION_DISABLE_ADD) {
      log.warn(`getGroupMigrationMembers/${logId}: membersV2 - skipping ${e164} due to GV2_MIGRATION_DISABLE_ADD flag`);
      return null;
    }
    const contactUuid = contact.get("uuid");
    if (!contactUuid) {
      log.warn(`getGroupMigrationMembers/${logId}: membersV2 - missing uuid for ${e164}, skipping.`);
      return null;
    }
    if (!contact.get("profileKey")) {
      log.warn(`getGroupMigrationMembers/${logId}: membersV2 - missing profileKey for member ${e164}, skipping.`);
      return null;
    }
    let capabilities = contact.get("capabilities");
    if (!capabilities?.["gv1-migration"] || !contact.get("profileKeyCredential")) {
      await contact.getProfiles();
    }
    capabilities = contact.get("capabilities");
    if (!capabilities?.["gv1-migration"]) {
      log.warn(`getGroupMigrationMembers/${logId}: membersV2 - member ${e164} is missing gv1-migration capability, skipping.`);
      return null;
    }
    if (!contact.get("profileKeyCredential")) {
      log.warn(`getGroupMigrationMembers/${logId}: membersV2 - no profileKeyCredential for ${e164}, skipping.`);
      return null;
    }
    const conversationId = contact.id;
    if (conversationId === ourConversationId) {
      areWeMember = true;
    }
    memberLookup[conversationId] = true;
    return {
      uuid: contactUuid,
      role: MEMBER_ROLE_ENUM.ADMINISTRATOR,
      joinedAtVersion: 0
    };
  })));
  const droppedGV2MemberIds = [];
  const pendingMembersV2 = (0, import_lodash.compact)((previousGroupV1Members || []).map((e164) => {
    const contact = window.ConversationController.get(e164);
    if (!contact) {
      throw new Error(`getGroupMigrationMembers/${logId}: pendingMembersV2 - missing local contact for ${e164}, skipping.`);
    }
    const conversationId = contact.id;
    if (memberLookup[conversationId]) {
      return null;
    }
    if (!(0, import_whatTypeOfConversation.isMe)(contact.attributes) && window.GV2_MIGRATION_DISABLE_INVITE) {
      log.warn(`getGroupMigrationMembers/${logId}: pendingMembersV2 - skipping ${e164} due to GV2_MIGRATION_DISABLE_INVITE flag`);
      droppedGV2MemberIds.push(conversationId);
      return null;
    }
    const contactUuid = contact.get("uuid");
    if (!contactUuid) {
      log.warn(`getGroupMigrationMembers/${logId}: pendingMembersV2 - missing uuid for ${e164}, skipping.`);
      droppedGV2MemberIds.push(conversationId);
      return null;
    }
    const capabilities = contact.get("capabilities");
    if (!capabilities?.["gv1-migration"]) {
      log.warn(`getGroupMigrationMembers/${logId}: pendingMembersV2 - member ${e164} is missing gv1-migration capability, skipping.`);
      droppedGV2MemberIds.push(conversationId);
      return null;
    }
    if (conversationId === ourConversationId) {
      areWeInvited = true;
    }
    return {
      uuid: contactUuid,
      timestamp: now,
      addedByUserId: ourUuid,
      role: MEMBER_ROLE_ENUM.ADMINISTRATOR
    };
  }));
  if (!areWeMember) {
    throw new Error(`getGroupMigrationMembers/${logId}: We are not a member!`);
  }
  if (areWeInvited) {
    throw new Error(`getGroupMigrationMembers/${logId}: We are invited!`);
  }
  return {
    droppedGV2MemberIds,
    membersV2,
    pendingMembersV2,
    previousGroupV1Members
  };
}
async function initiateMigrationToGroupV2(conversation) {
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  try {
    await conversation.queueJob("initiateMigrationToGroupV2", async () => {
      const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
      const isEligible = isGroupEligibleToMigrate(conversation);
      const previousGroupV1Id = conversation.get("groupId");
      if (!isEligible || !previousGroupV1Id) {
        throw new Error(`initiateMigrationToGroupV2: conversation is not eligible to migrate! ${conversation.idForLogging()}`);
      }
      const groupV1IdBuffer = Bytes.fromBinary(previousGroupV1Id);
      const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(groupV1IdBuffer);
      const fields = deriveGroupFields(masterKeyBuffer);
      const groupId = Bytes.toBase64(fields.id);
      const logId = `groupv2(${groupId})`;
      log.info(`initiateMigrationToGroupV2/${logId}: Migrating from ${conversation.idForLogging()}`);
      const masterKey = Bytes.toBase64(masterKeyBuffer);
      const secretParams = Bytes.toBase64(fields.secretParams);
      const publicParams = Bytes.toBase64(fields.publicParams);
      const ourConversationId = window.ConversationController.getOurConversationId();
      if (!ourConversationId) {
        throw new Error(`initiateMigrationToGroupV2/${logId}: Couldn't fetch our own conversationId!`);
      }
      const ourConversation = window.ConversationController.get(ourConversationId);
      if (!ourConversation) {
        throw new Error(`initiateMigrationToGroupV2/${logId}: cannot get our own conversation. Cannot migrate`);
      }
      const {
        membersV2,
        pendingMembersV2,
        droppedGV2MemberIds,
        previousGroupV1Members
      } = await getGroupMigrationMembers(conversation);
      if (membersV2.length + pendingMembersV2.length > (0, import_limits.getGroupSizeHardLimit)()) {
        throw new Error(`initiateMigrationToGroupV2/${logId}: Too many members! Member count: ${membersV2.length}, Pending member count: ${pendingMembersV2.length}`);
      }
      let avatarAttribute;
      const avatarPath = conversation.attributes.avatar?.path;
      if (avatarPath) {
        const { hash, key } = await uploadAvatar({
          logId,
          publicParams,
          secretParams,
          path: avatarPath
        });
        avatarAttribute = {
          url: key,
          path: avatarPath,
          hash
        };
      }
      const newAttributes = {
        ...conversation.attributes,
        avatar: avatarAttribute,
        revision: 0,
        groupId,
        groupVersion: 2,
        masterKey,
        publicParams,
        secretParams,
        accessControl: {
          attributes: ACCESS_ENUM.MEMBER,
          members: ACCESS_ENUM.MEMBER,
          addFromInviteLink: ACCESS_ENUM.UNSATISFIABLE
        },
        membersV2,
        pendingMembersV2,
        previousGroupV1Id,
        previousGroupV1Members,
        storageID: void 0,
        derivedGroupV2Id: void 0,
        members: void 0
      };
      const groupProto = buildGroupProto({
        ...newAttributes,
        avatarUrl: avatarAttribute?.url
      });
      try {
        await makeRequestWithTemporalRetry({
          logId: `createGroup/${logId}`,
          publicParams,
          secretParams,
          request: (sender, options) => sender.createGroup(groupProto, options)
        });
      } catch (error) {
        log.error(`initiateMigrationToGroupV2/${logId}: Error creating group:`, error.stack);
        throw error;
      }
      const groupChangeMessages = [];
      groupChangeMessages.push({
        ...generateBasicMessage(),
        type: "group-v1-migration",
        invitedGV2Members: pendingMembersV2,
        droppedGV2MemberIds,
        readStatus: import_MessageReadStatus.ReadStatus.Read,
        seenStatus: import_MessageSeenStatus.SeenStatus.Seen
      });
      await updateGroup({
        conversation,
        updates: {
          newAttributes,
          groupChangeMessages,
          members: []
        }
      });
      if (window.storage.blocked.isGroupBlocked(previousGroupV1Id)) {
        window.storage.blocked.addBlockedGroup(groupId);
      }
      updateConversation(conversation.attributes);
    });
  } catch (error) {
    const logId = conversation.idForLogging();
    if (!(0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
      throw error;
    }
    const alreadyMigrated = await hasV1GroupBeenMigrated(conversation);
    if (!alreadyMigrated) {
      log.error(`initiateMigrationToGroupV2/${logId}: Group has not already been migrated, re-throwing error`);
      throw error;
    }
    await respondToGroupV2Migration({
      conversation
    });
    return;
  }
  const groupV2Info = conversation.getGroupV2Info({
    includePendingMembers: true
  });
  (0, import_assert.strictAssert)(groupV2Info, "missing groupV2Info");
  await import_conversationJobQueue.conversationJobQueue.add({
    type: import_conversationJobQueue.conversationQueueJobEnum.enum.GroupUpdate,
    conversationId: conversation.id,
    recipients: groupV2Info.members,
    revision: groupV2Info.revision
  });
}
async function waitThenRespondToGroupV2Migration(options) {
  await window.waitForEmptyEventQueue();
  const { conversation } = options;
  await conversation.queueJob("waitThenRespondToGroupV2Migration", async () => {
    try {
      await respondToGroupV2Migration(options);
    } catch (error) {
      log.error(`waitThenRespondToGroupV2Migration/${conversation.idForLogging()}: respondToGroupV2Migration failure:`, error && error.stack ? error.stack : error);
    }
  });
}
function buildMigrationBubble(previousGroupV1MembersIds, newAttributes) {
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const ourConversationId = window.ConversationController.getOurConversationId();
  const combinedConversationIds = [
    ...(newAttributes.membersV2 || []).map((item) => item.uuid),
    ...(newAttributes.pendingMembersV2 || []).map((item) => item.uuid)
  ].map((uuid) => {
    const conversationId = window.ConversationController.ensureContactIds({
      uuid
    });
    (0, import_assert.strictAssert)(conversationId, `Conversation not found for ${uuid}`);
    return conversationId;
  });
  const droppedMemberIds = (0, import_lodash.difference)(previousGroupV1MembersIds, combinedConversationIds).filter((id) => id && id !== ourConversationId);
  const invitedMembers = (newAttributes.pendingMembersV2 || []).filter((item) => item.uuid !== ourUuid);
  const areWeInvited = (newAttributes.pendingMembersV2 || []).some((item) => item.uuid === ourUuid);
  return {
    ...generateBasicMessage(),
    type: "group-v1-migration",
    groupMigration: {
      areWeInvited,
      invitedMembers,
      droppedMemberIds
    }
  };
}
function getBasicMigrationBubble() {
  return {
    ...generateBasicMessage(),
    type: "group-v1-migration",
    groupMigration: {
      areWeInvited: false,
      invitedMembers: [],
      droppedMemberIds: []
    }
  };
}
async function joinGroupV2ViaLinkAndMigrate({
  approvalRequired,
  conversation,
  inviteLinkPassword,
  revision
}) {
  const isGroupV1 = (0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes);
  const previousGroupV1Id = conversation.get("groupId");
  if (!isGroupV1 || !previousGroupV1Id) {
    throw new Error(`joinGroupV2ViaLinkAndMigrate: Conversation is not GroupV1! ${conversation.idForLogging()}`);
  }
  const groupV1IdBuffer = Bytes.fromBinary(previousGroupV1Id);
  const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(groupV1IdBuffer);
  const fields = deriveGroupFields(masterKeyBuffer);
  const groupId = Bytes.toBase64(fields.id);
  const logId = idForLogging(groupId);
  log.info(`joinGroupV2ViaLinkAndMigrate/${logId}: Migrating from ${conversation.idForLogging()}`);
  const masterKey = Bytes.toBase64(masterKeyBuffer);
  const secretParams = Bytes.toBase64(fields.secretParams);
  const publicParams = Bytes.toBase64(fields.publicParams);
  const newAttributes = {
    ...conversation.attributes,
    revision,
    groupId,
    groupVersion: 2,
    masterKey,
    publicParams,
    secretParams,
    groupInviteLinkPassword: inviteLinkPassword,
    addedBy: void 0,
    left: true,
    previousGroupV1Id: conversation.get("groupId"),
    previousGroupV1Members: conversation.get("members"),
    storageID: void 0,
    derivedGroupV2Id: void 0,
    members: void 0
  };
  const groupChangeMessages = [
    {
      ...generateBasicMessage(),
      type: "group-v1-migration",
      groupMigration: {
        areWeInvited: false,
        invitedMembers: [],
        droppedMemberIds: []
      }
    }
  ];
  await updateGroup({
    conversation,
    updates: {
      newAttributes,
      groupChangeMessages,
      members: []
    }
  });
  await conversation.joinGroupV2ViaLink({
    inviteLinkPassword,
    approvalRequired
  });
}
async function respondToGroupV2Migration({
  conversation,
  groupChange,
  newRevision,
  receivedAt,
  sentAt
}) {
  await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
  const isGroupV1 = (0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes);
  const previousGroupV1Id = conversation.get("groupId");
  if (!isGroupV1 || !previousGroupV1Id) {
    throw new Error(`respondToGroupV2Migration: Conversation is not GroupV1! ${conversation.idForLogging()}`);
  }
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const wereWePreviouslyAMember = conversation.hasMember(ourUuid);
  const groupV1IdBuffer = Bytes.fromBinary(previousGroupV1Id);
  const masterKeyBuffer = (0, import_Crypto.deriveMasterKeyFromGroupV1)(groupV1IdBuffer);
  const fields = deriveGroupFields(masterKeyBuffer);
  const groupId = Bytes.toBase64(fields.id);
  const logId = idForLogging(groupId);
  log.info(`respondToGroupV2Migration/${logId}: Migrating from ${conversation.idForLogging()}`);
  const masterKey = Bytes.toBase64(masterKeyBuffer);
  const secretParams = Bytes.toBase64(fields.secretParams);
  const publicParams = Bytes.toBase64(fields.publicParams);
  const previousGroupV1Members = conversation.get("members");
  const previousGroupV1MembersIds = conversation.getMemberIds();
  const attributes = {
    ...conversation.attributes,
    revision: 0,
    groupId,
    groupVersion: 2,
    masterKey,
    publicParams,
    secretParams,
    previousGroupV1Id,
    previousGroupV1Members,
    storageID: void 0,
    derivedGroupV2Id: void 0,
    members: void 0
  };
  let firstGroupState;
  try {
    const response = await makeRequestWithTemporalRetry({
      logId: `getGroupLog/${logId}`,
      publicParams,
      secretParams,
      request: (sender, options) => sender.getGroupLog({
        startVersion: 0,
        includeFirstState: true,
        includeLastState: false,
        maxSupportedChangeEpoch: SUPPORTED_CHANGE_EPOCH
      }, options)
    });
    firstGroupState = response?.changes?.groupChanges?.[0]?.groupState;
  } catch (error) {
    if (error.code === GROUP_ACCESS_DENIED_CODE) {
      log.info(`respondToGroupV2Migration/${logId}: Failed to access log endpoint; fetching full group state`);
      try {
        firstGroupState = await makeRequestWithTemporalRetry({
          logId: `getGroup/${logId}`,
          publicParams,
          secretParams,
          request: (sender, options) => sender.getGroup(options)
        });
      } catch (secondError) {
        if (secondError.code === GROUP_ACCESS_DENIED_CODE) {
          log.info(`respondToGroupV2Migration/${logId}: Failed to access state endpoint; user is no longer part of group`);
          if (window.storage.blocked.isGroupBlocked(previousGroupV1Id)) {
            window.storage.blocked.addBlockedGroup(groupId);
          }
          if (wereWePreviouslyAMember) {
            log.info(`respondToGroupV2Migration/${logId}: Upgrading group with migration/removed events`);
            const ourNumber = window.textsecure.storage.user.getNumber();
            await updateGroup({
              conversation,
              receivedAt,
              sentAt,
              updates: {
                newAttributes: {
                  ...attributes,
                  addedBy: void 0,
                  left: true,
                  members: (conversation.get("members") || []).filter((item) => item !== ourUuid && item !== ourNumber)
                },
                groupChangeMessages: [
                  {
                    ...getBasicMigrationBubble(),
                    readStatus: import_MessageReadStatus.ReadStatus.Read,
                    seenStatus: import_MessageSeenStatus.SeenStatus.Seen
                  },
                  {
                    ...generateBasicMessage(),
                    type: "group-v2-change",
                    groupV2Change: {
                      details: [
                        {
                          type: "member-remove",
                          uuid: ourUuid
                        }
                      ]
                    },
                    readStatus: import_MessageReadStatus.ReadStatus.Read,
                    seenStatus: import_MessageSeenStatus.SeenStatus.Unseen
                  }
                ],
                members: []
              }
            });
            return;
          }
          log.info(`respondToGroupV2Migration/${logId}: Upgrading group with migration event; no removed event`);
          await updateGroup({
            conversation,
            receivedAt,
            sentAt,
            updates: {
              newAttributes: attributes,
              groupChangeMessages: [
                {
                  ...getBasicMigrationBubble(),
                  readStatus: import_MessageReadStatus.ReadStatus.Read,
                  seenStatus: import_MessageSeenStatus.SeenStatus.Seen
                }
              ],
              members: []
            }
          });
          return;
        }
        throw secondError;
      }
    } else {
      throw error;
    }
  }
  if (!firstGroupState) {
    throw new Error(`respondToGroupV2Migration/${logId}: Couldn't get a first group state!`);
  }
  const groupState = decryptGroupState(firstGroupState, attributes.secretParams, logId);
  const { newAttributes, newProfileKeys } = await applyGroupState({
    group: attributes,
    groupState
  });
  const groupChangeMessages = [];
  groupChangeMessages.push({
    ...buildMigrationBubble(previousGroupV1MembersIds, newAttributes),
    readStatus: import_MessageReadStatus.ReadStatus.Read,
    seenStatus: import_MessageSeenStatus.SeenStatus.Seen
  });
  const areWeInvited = (newAttributes.pendingMembersV2 || []).some((item) => item.uuid === ourUuid);
  const areWeMember = (newAttributes.membersV2 || []).some((item) => item.uuid === ourUuid);
  if (!areWeInvited && !areWeMember) {
    groupChangeMessages.push({
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        details: [
          {
            type: "member-remove",
            uuid: ourUuid
          }
        ]
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: import_MessageSeenStatus.SeenStatus.Unseen
    });
  }
  const SORT_BUFFER = 1e3;
  await updateGroup({
    conversation,
    receivedAt,
    sentAt: sentAt ? sentAt - SORT_BUFFER : void 0,
    updates: {
      newAttributes,
      groupChangeMessages,
      members: profileKeysToMembers(newProfileKeys)
    }
  });
  if (window.storage.blocked.isGroupBlocked(previousGroupV1Id)) {
    window.storage.blocked.addBlockedGroup(groupId);
  }
  updateConversation(conversation.attributes);
  await maybeUpdateGroup({
    conversation,
    groupChange,
    newRevision,
    receivedAt,
    sentAt
  });
}
const FIVE_MINUTES = 5 * durations.MINUTE;
async function waitThenMaybeUpdateGroup(options, { viaFirstStorageSync = false } = {}) {
  const { conversation } = options;
  if (conversation.isBlocked()) {
    log.info(`waitThenMaybeUpdateGroup: Group ${conversation.idForLogging()} is blocked, returning early`);
    return;
  }
  await window.waitForEmptyEventQueue();
  const { lastSuccessfulGroupFetch = 0 } = conversation;
  if (!options.force && (0, import_timestamp.isMoreRecentThan)(lastSuccessfulGroupFetch, FIVE_MINUTES)) {
    const waitTime = lastSuccessfulGroupFetch + FIVE_MINUTES - Date.now();
    log.info(`waitThenMaybeUpdateGroup/${conversation.idForLogging()}: group update was fetched recently, skipping for ${waitTime}ms`);
    return;
  }
  await conversation.queueJob("waitThenMaybeUpdateGroup", async () => {
    try {
      await maybeUpdateGroup(options, { viaFirstStorageSync });
      conversation.lastSuccessfulGroupFetch = Date.now();
    } catch (error) {
      log.error(`waitThenMaybeUpdateGroup/${conversation.idForLogging()}: maybeUpdateGroup failure:`, error && error.stack ? error.stack : error);
    }
  });
}
async function maybeUpdateGroup({
  conversation,
  dropInitialJoinMessage,
  groupChange,
  newRevision,
  receivedAt,
  sentAt
}, { viaFirstStorageSync = false } = {}) {
  const logId = conversation.idForLogging();
  try {
    await (0, import_groupCredentialFetcher.maybeFetchNewCredentials)();
    const updates = await getGroupUpdates({
      group: conversation.attributes,
      serverPublicParamsBase64: window.getServerPublicParams(),
      newRevision,
      groupChange,
      dropInitialJoinMessage
    });
    await updateGroup({ conversation, receivedAt, sentAt, updates }, { viaFirstStorageSync });
  } catch (error) {
    log.error(`maybeUpdateGroup/${logId}: Failed to update group:`, error && error.stack ? error.stack : error);
    throw error;
  }
}
async function updateGroup({
  conversation,
  receivedAt,
  sentAt,
  updates
}, { viaFirstStorageSync = false } = {}) {
  const logId = conversation.idForLogging();
  const { newAttributes, groupChangeMessages, members } = updates;
  const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
  const startingRevision = conversation.get("revision");
  const endingRevision = newAttributes.revision;
  const wasMemberOrPending = conversation.hasMember(ourUuid) || conversation.isMemberPending(ourUuid);
  const isMemberOrPending = !newAttributes.left || newAttributes.pendingMembersV2?.some((item) => item.uuid === ourUuid);
  const isMemberOrPendingOrAwaitingApproval = isMemberOrPending || newAttributes.pendingAdminApprovalV2?.some((item) => item.uuid === ourUuid);
  const isInitialDataFetch = !(0, import_lodash.isNumber)(startingRevision) && (0, import_lodash.isNumber)(endingRevision);
  const finalReceivedAt = receivedAt || window.Signal.Util.incrementMessageCounter();
  const initialSentAt = sentAt || Date.now();
  const previousId = conversation.get("groupId");
  const idChanged = previousId && previousId !== newAttributes.groupId;
  let activeAt = conversation.get("active_at") || null;
  if (!viaFirstStorageSync && isMemberOrPendingOrAwaitingApproval && isInitialDataFetch && newAttributes.name) {
    activeAt = initialSentAt;
  }
  let syntheticSentAt = initialSentAt - (groupChangeMessages.length + 1);
  const timestamp = Date.now();
  const changeMessagesToSave = groupChangeMessages.map((changeMessage) => {
    syntheticSentAt += 1;
    return {
      ...changeMessage,
      conversationId: conversation.id,
      received_at: finalReceivedAt,
      received_at_ms: syntheticSentAt,
      sent_at: syntheticSentAt,
      timestamp
    };
  });
  const contactsWithoutProfileKey = new Array();
  members.forEach((member) => {
    const contact = window.ConversationController.getOrCreate(member.uuid, "private");
    if (!(0, import_whatTypeOfConversation.isMe)(contact.attributes) && member.profileKey && member.profileKey.length > 0 && contact.get("profileKey") !== member.profileKey) {
      contactsWithoutProfileKey.push(contact);
      contact.setProfileKey(member.profileKey);
    }
  });
  let profileFetches;
  if (contactsWithoutProfileKey.length !== 0) {
    log.info(`updateGroup/${logId}: fetching ${contactsWithoutProfileKey.length} missing profiles`);
    const profileFetchQueue = new import_p_queue.default({
      concurrency: 3
    });
    profileFetches = profileFetchQueue.addAll(contactsWithoutProfileKey.map((contact) => () => {
      const active = contact.getActiveProfileFetch();
      return active || contact.getProfiles();
    }));
  }
  if (changeMessagesToSave.length > 0) {
    try {
      await profileFetches;
    } catch (error) {
      log.error(`updateGroup/${logId}: failed to fetch missing profiles`, Errors.toLogFormat(error));
    }
    await appendChangeMessages(conversation, changeMessagesToSave);
  }
  conversation.set({
    ...newAttributes,
    active_at: activeAt,
    temporaryMemberCount: !newAttributes.left ? void 0 : newAttributes.temporaryMemberCount
  });
  if (idChanged) {
    conversation.trigger("idUpdated", conversation, "groupId", previousId);
  }
  await updateConversation(conversation.attributes);
  const justAdded = !wasMemberOrPending && isMemberOrPending;
  const addedBy = newAttributes.pendingMembersV2?.find((item) => item.uuid === ourUuid)?.addedByUserId || newAttributes.addedBy;
  if (justAdded && addedBy) {
    const adder = window.ConversationController.get(addedBy);
    if (adder && adder.isBlocked()) {
      log.warn(`updateGroup/${logId}: Added to group by blocked user ${adder.idForLogging()}. Scheduling group leave.`);
      const waitThenLeave = /* @__PURE__ */ __name(async () => {
        log.warn(`waitThenLeave/${logId}: Waiting for empty event queue.`);
        await window.waitForEmptyEventQueue();
        log.warn(`waitThenLeave/${logId}: Empty event queue, starting group leave.`);
        await conversation.leaveGroupV2();
        log.warn(`waitThenLeave/${logId}: Leave complete.`);
      }, "waitThenLeave");
      waitThenLeave();
    }
  }
}
function _mergeGroupChangeMessages(first, second) {
  if (!first) {
    return void 0;
  }
  if (first.type !== "group-v2-change" || second.type !== first.type) {
    return void 0;
  }
  const { groupV2Change: firstChange } = first;
  const { groupV2Change: secondChange } = second;
  if (!firstChange || !secondChange) {
    return void 0;
  }
  if (firstChange.details.length !== 1 && secondChange.details.length !== 1) {
    return void 0;
  }
  const [firstDetail] = firstChange.details;
  const [secondDetail] = secondChange.details;
  let isApprovalPending;
  if (secondDetail.type === "admin-approval-add-one") {
    isApprovalPending = true;
  } else if (secondDetail.type === "admin-approval-remove-one") {
    isApprovalPending = false;
  } else {
    return void 0;
  }
  const { uuid } = secondDetail;
  (0, import_assert.strictAssert)(uuid, "admin approval message should have uuid");
  let updatedDetail;
  if (!isApprovalPending && firstDetail.type === "admin-approval-add-one" && firstDetail.uuid === uuid) {
    updatedDetail = {
      type: "admin-approval-bounce",
      uuid,
      times: 1,
      isApprovalPending
    };
  } else if (firstDetail.type === "admin-approval-bounce" && firstDetail.uuid === uuid && firstDetail.isApprovalPending === !isApprovalPending) {
    updatedDetail = {
      type: "admin-approval-bounce",
      uuid,
      times: firstDetail.times + (isApprovalPending ? 0 : 1),
      isApprovalPending
    };
  } else {
    return void 0;
  }
  return {
    ...first,
    groupV2Change: {
      ...first.groupV2Change,
      details: [updatedDetail]
    }
  };
}
function _isGroupChangeMessageBounceable(message) {
  if (message.type !== "group-v2-change") {
    return false;
  }
  const { groupV2Change } = message;
  if (!groupV2Change) {
    return false;
  }
  if (groupV2Change.details.length !== 1) {
    return false;
  }
  const [first] = groupV2Change.details;
  if (first.type === "admin-approval-add-one" || first.type === "admin-approval-bounce") {
    return true;
  }
  return false;
}
async function appendChangeMessages(conversation, messages) {
  const logId = conversation.idForLogging();
  log.info(`appendChangeMessages/${logId}: processing ${messages.length} messages`);
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  let lastMessage = await import_Client.default.getLastConversationMessage({
    conversationId: conversation.id
  });
  if (lastMessage && !_isGroupChangeMessageBounceable(lastMessage)) {
    lastMessage = void 0;
  }
  const mergedMessages = [];
  let previousMessage = lastMessage;
  for (const message of messages) {
    const merged = _mergeGroupChangeMessages(previousMessage, message);
    if (!merged) {
      if (previousMessage && previousMessage !== lastMessage) {
        mergedMessages.push(previousMessage);
      }
      previousMessage = message;
      continue;
    }
    previousMessage = merged;
    log.info(`appendChangeMessages/${logId}: merged ${message.id} into ${merged.id}`);
  }
  if (previousMessage && previousMessage !== lastMessage) {
    mergedMessages.push(previousMessage);
  }
  if (lastMessage && mergedMessages[0]?.id === lastMessage?.id) {
    const [first, ...rest] = mergedMessages;
    (0, import_assert.strictAssert)(first !== void 0, "First message must be there");
    log.info(`appendChangeMessages/${logId}: updating ${first.id}`);
    await import_Client.default.saveMessage(first, {
      ourUuid: ourUuid.toString()
    });
    log.info(`appendChangeMessages/${logId}: saving ${rest.length} new messages`);
    await import_Client.default.saveMessages(rest, {
      ourUuid: ourUuid.toString(),
      forceSave: true
    });
  } else {
    log.info(`appendChangeMessages/${logId}: saving ${mergedMessages.length} new messages`);
    await import_Client.default.saveMessages(mergedMessages, {
      ourUuid: ourUuid.toString(),
      forceSave: true
    });
  }
  let newMessages = 0;
  for (const changeMessage of mergedMessages) {
    const existing = window.MessageController.getById(changeMessage.id);
    if (existing) {
      (0, import_assert.strictAssert)(changeMessage.id === lastMessage?.id, "Should only update group change that was already in the database");
      existing.set(changeMessage);
      continue;
    }
    const model = new window.Whisper.Message(changeMessage);
    window.MessageController.register(model.id, model);
    conversation.trigger("newmessage", model);
    newMessages += 1;
  }
  if (!newMessages && mergedMessages.length > 0) {
    await conversation.updateLastMessage();
    conversation.updateUnread();
  }
}
async function getGroupUpdates({
  dropInitialJoinMessage,
  group,
  serverPublicParamsBase64,
  newRevision,
  groupChange: wrappedGroupChange
}) {
  const logId = idForLogging(group.groupId);
  log.info(`getGroupUpdates/${logId}: Starting...`);
  const currentRevision = group.revision;
  const isFirstFetch = !(0, import_lodash.isNumber)(group.revision);
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const isInitialCreationMessage = isFirstFetch && newRevision === 0;
  const weAreAwaitingApproval = (group.pendingAdminApprovalV2 || []).find((item) => item.uuid === ourUuid);
  const isOneVersionUp = (0, import_lodash.isNumber)(currentRevision) && (0, import_lodash.isNumber)(newRevision) && newRevision === currentRevision + 1;
  if (window.GV2_ENABLE_SINGLE_CHANGE_PROCESSING && wrappedGroupChange && (0, import_lodash.isNumber)(newRevision) && (isInitialCreationMessage || weAreAwaitingApproval || isOneVersionUp)) {
    log.info(`getGroupUpdates/${logId}: Processing just one change`);
    const groupChangeBuffer = Bytes.fromBase64(wrappedGroupChange.base64);
    const groupChange = import_protobuf.SignalService.GroupChange.decode(groupChangeBuffer);
    const isChangeSupported = !(0, import_lodash.isNumber)(groupChange.changeEpoch) || groupChange.changeEpoch <= SUPPORTED_CHANGE_EPOCH;
    if (isChangeSupported) {
      if (!wrappedGroupChange.isTrusted) {
        (0, import_assert.strictAssert)(groupChange.serverSignature && groupChange.actions, "Server signature must be present in untrusted group change");
        try {
          (0, import_zkgroup.verifyNotarySignature)(serverPublicParamsBase64, groupChange.actions, groupChange.serverSignature);
        } catch (error) {
          log.warn(`getGroupUpdates/${logId}: verifyNotarySignature failed, dropping the message`, Errors.toLogFormat(error));
          return {
            newAttributes: group,
            groupChangeMessages: [],
            members: []
          };
        }
      }
      return updateGroupViaSingleChange({
        group,
        newRevision,
        groupChange
      });
    }
    log.info(`getGroupUpdates/${logId}: Failing over; group change unsupported`);
  }
  if ((!isFirstFetch || (0, import_lodash.isNumber)(newRevision)) && window.GV2_ENABLE_CHANGE_PROCESSING) {
    try {
      return await updateGroupViaLogs({
        group,
        newRevision
      });
    } catch (error) {
      const nextStep = isFirstFetch ? `fetching logs since ${newRevision}` : "fetching full state";
      if (error.code === TEMPORAL_AUTH_REJECTED_CODE) {
        log.info(`getGroupUpdates/${logId}: Temporal credential failure, now ${nextStep}`);
      } else if (error.code === GROUP_ACCESS_DENIED_CODE) {
        log.info(`getGroupUpdates/${logId}: Log access denied, now ${nextStep}`);
      } else {
        throw error;
      }
    }
  }
  if (window.GV2_ENABLE_STATE_PROCESSING) {
    try {
      return await updateGroupViaState({
        dropInitialJoinMessage,
        group
      });
    } catch (error) {
      if (error.code === TEMPORAL_AUTH_REJECTED_CODE) {
        log.info(`getGroupUpdates/${logId}: Temporal credential failure. Failing; we don't know if we have access or not.`);
        throw error;
      } else if (error.code === GROUP_ACCESS_DENIED_CODE) {
        log.info(`getGroupUpdates/${logId}: Failed to get group state. Attempting to fetch pre-join information.`);
      } else {
        throw error;
      }
    }
  }
  if (window.GV2_ENABLE_PRE_JOIN_FETCH) {
    try {
      return await updateGroupViaPreJoinInfo({
        group
      });
    } catch (error) {
      if (error.code === GROUP_ACCESS_DENIED_CODE) {
        return generateLeftGroupChanges(group);
      }
      if (error.code === GROUP_NONEXISTENT_CODE) {
        return generateLeftGroupChanges(group);
      }
      throw error;
    }
  }
  log.warn(`getGroupUpdates/${logId}: No processing was legal! Returning empty changeset.`);
  return {
    newAttributes: group,
    groupChangeMessages: [],
    members: []
  };
}
async function updateGroupViaPreJoinInfo({
  group
}) {
  const logId = idForLogging(group.groupId);
  const data = window.storage.get(import_groupCredentialFetcher.GROUP_CREDENTIALS_KEY);
  if (!data) {
    throw new Error("updateGroupViaPreJoinInfo: No group credentials!");
  }
  const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
  const { publicParams, secretParams } = group;
  if (!secretParams) {
    throw new Error("updateGroupViaPreJoinInfo: group was missing secretParams!");
  }
  if (!publicParams) {
    throw new Error("updateGroupViaPreJoinInfo: group was missing publicParams!");
  }
  const inviteLinkPassword = void 0;
  const preJoinInfo = await makeRequestWithTemporalRetry({
    logId: `getPreJoinInfo/${logId}`,
    publicParams,
    secretParams,
    request: (sender, options) => sender.getGroupFromLink(inviteLinkPassword, options)
  });
  const approvalRequired = preJoinInfo.addFromInviteLink === import_protobuf.SignalService.AccessControl.AccessRequired.ADMINISTRATOR;
  if (!approvalRequired) {
    return generateLeftGroupChanges(group);
  }
  const newAttributes = {
    ...group,
    description: decryptGroupDescription(preJoinInfo.descriptionBytes, secretParams),
    name: decryptGroupTitle(preJoinInfo.title, secretParams),
    members: [],
    pendingMembersV2: [],
    pendingAdminApprovalV2: [
      {
        uuid: ourUuid,
        timestamp: Date.now()
      }
    ],
    revision: preJoinInfo.version,
    temporaryMemberCount: preJoinInfo.memberCount || 1
  };
  await applyNewAvatar((0, import_dropNull.dropNull)(preJoinInfo.avatar), newAttributes, logId);
  return {
    newAttributes,
    groupChangeMessages: extractDiffs({
      old: group,
      current: newAttributes,
      dropInitialJoinMessage: false
    }),
    members: []
  };
}
async function updateGroupViaState({
  dropInitialJoinMessage,
  group
}) {
  const logId = idForLogging(group.groupId);
  const { publicParams, secretParams } = group;
  if (!secretParams) {
    throw new Error("updateGroupViaState: group was missing secretParams!");
  }
  if (!publicParams) {
    throw new Error("updateGroupViaState: group was missing publicParams!");
  }
  const groupState = await makeRequestWithTemporalRetry({
    logId: `getGroup/${logId}`,
    publicParams,
    secretParams,
    request: (sender, requestOptions) => sender.getGroup(requestOptions)
  });
  const decryptedGroupState = decryptGroupState(groupState, secretParams, logId);
  const oldVersion = group.revision;
  const newVersion = decryptedGroupState.version;
  log.info(`getCurrentGroupState/${logId}: Applying full group state, from version ${oldVersion} to ${newVersion}.`);
  const { newAttributes, newProfileKeys } = await applyGroupState({
    group,
    groupState: decryptedGroupState
  });
  return {
    newAttributes,
    groupChangeMessages: extractDiffs({
      old: group,
      current: newAttributes,
      dropInitialJoinMessage
    }),
    members: profileKeysToMembers(newProfileKeys)
  };
}
async function updateGroupViaSingleChange({
  group,
  groupChange,
  newRevision
}) {
  const wasInGroup = !group.left;
  const result = await integrateGroupChange({
    group,
    groupChange,
    newRevision
  });
  const nowInGroup = !result.newAttributes.left;
  if (!wasInGroup && nowInGroup) {
    const { newAttributes, members } = await updateGroupViaState({
      group: result.newAttributes
    });
    return {
      ...result,
      members: [...result.members, ...members],
      newAttributes
    };
  }
  return result;
}
async function updateGroupViaLogs({
  group,
  newRevision
}) {
  const logId = idForLogging(group.groupId);
  const { publicParams, secretParams } = group;
  if (!publicParams) {
    throw new Error("updateGroupViaLogs: group was missing publicParams!");
  }
  if (!secretParams) {
    throw new Error("updateGroupViaLogs: group was missing secretParams!");
  }
  log.info(`updateGroupViaLogs/${logId}: Getting group delta from ${group.revision ?? "?"} to ${newRevision ?? "?"} for group groupv2(${group.groupId})...`);
  const currentRevision = group.revision;
  let includeFirstState = true;
  let revisionToFetch = (0, import_lodash.isNumber)(currentRevision) ? currentRevision : void 0;
  let response;
  const changes = [];
  do {
    response = await makeRequestWithTemporalRetry({
      logId: `getGroupLog/${logId}`,
      publicParams,
      secretParams,
      request: (sender, requestOptions) => sender.getGroupLog({
        startVersion: revisionToFetch,
        includeFirstState,
        includeLastState: true,
        maxSupportedChangeEpoch: SUPPORTED_CHANGE_EPOCH
      }, requestOptions)
    });
    changes.push(response.changes);
    if (response.end) {
      revisionToFetch = response.end + 1;
    }
    includeFirstState = false;
  } while (response.end && (newRevision === void 0 || response.end < newRevision));
  return integrateGroupChanges({
    changes,
    group,
    newRevision
  });
}
async function generateLeftGroupChanges(group) {
  const logId = idForLogging(group.groupId);
  log.info(`generateLeftGroupChanges/${logId}: Starting...`);
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const { masterKey, groupInviteLinkPassword } = group;
  let { revision } = group;
  try {
    if (masterKey && groupInviteLinkPassword) {
      log.info(`generateLeftGroupChanges/${logId}: Have invite link. Attempting to fetch latest revision with it.`);
      const preJoinInfo = await getPreJoinGroupInfo(groupInviteLinkPassword, masterKey);
      revision = preJoinInfo.version;
    }
  } catch (error) {
    log.warn("generateLeftGroupChanges: Failed to fetch latest revision via group link. Code:", error.code);
  }
  const newAttributes = {
    ...group,
    addedBy: void 0,
    membersV2: (group.membersV2 || []).filter((member) => member.uuid !== ourUuid),
    pendingMembersV2: (group.pendingMembersV2 || []).filter((member) => member.uuid !== ourUuid),
    pendingAdminApprovalV2: (group.pendingAdminApprovalV2 || []).filter((member) => member.uuid !== ourUuid),
    left: true,
    revision
  };
  return {
    newAttributes,
    groupChangeMessages: extractDiffs({
      current: newAttributes,
      old: group
    }),
    members: []
  };
}
function getGroupCredentials({
  authCredentialBase64,
  groupPublicParamsBase64,
  groupSecretParamsBase64,
  serverPublicParamsBase64
}) {
  const authOperations = (0, import_zkgroup.getClientZkAuthOperations)(serverPublicParamsBase64);
  const presentation = (0, import_zkgroup.getAuthCredentialPresentation)(authOperations, authCredentialBase64, groupSecretParamsBase64);
  return {
    groupPublicParamsHex: Bytes.toHex(Bytes.fromBase64(groupPublicParamsBase64)),
    authCredentialPresentationHex: Bytes.toHex(presentation)
  };
}
async function integrateGroupChanges({
  group,
  newRevision,
  changes
}) {
  const logId = idForLogging(group.groupId);
  let attributes = group;
  const finalMessages = [];
  const finalMembers = [];
  const imax = changes.length;
  for (let i = 0; i < imax; i += 1) {
    const { groupChanges } = changes[i];
    if (!groupChanges) {
      continue;
    }
    const jmax = groupChanges.length;
    for (let j = 0; j < jmax; j += 1) {
      const changeState = groupChanges[j];
      const { groupChange, groupState } = changeState;
      if (!groupChange && !groupState) {
        log.warn("integrateGroupChanges: item had neither groupState nor groupChange. Skipping.");
        continue;
      }
      try {
        const {
          newAttributes,
          groupChangeMessages,
          members
        } = await integrateGroupChange({
          group: attributes,
          newRevision,
          groupChange: (0, import_dropNull.dropNull)(groupChange),
          groupState: (0, import_dropNull.dropNull)(groupState)
        });
        attributes = newAttributes;
        finalMessages.push(groupChangeMessages);
        finalMembers.push(members);
      } catch (error) {
        log.error(`integrateGroupChanges/${logId}: Failed to apply change log, continuing to apply remaining change logs.`, error && error.stack ? error.stack : error);
      }
    }
  }
  const isFirstFetch = !(0, import_lodash.isNumber)(group.revision);
  if (isFirstFetch) {
    const joinMessages = finalMessages[0];
    const alreadyHaveJoinMessage = joinMessages && joinMessages.length > 0;
    const otherMessages = extractDiffs({
      old: group,
      current: attributes,
      dropInitialJoinMessage: alreadyHaveJoinMessage
    });
    const groupChangeMessages = alreadyHaveJoinMessage ? [joinMessages[0], ...otherMessages] : otherMessages;
    return {
      newAttributes: attributes,
      groupChangeMessages,
      members: (0, import_lodash.flatten)(finalMembers)
    };
  }
  return {
    newAttributes: attributes,
    groupChangeMessages: (0, import_lodash.flatten)(finalMessages),
    members: (0, import_lodash.flatten)(finalMembers)
  };
}
async function integrateGroupChange({
  group,
  groupChange,
  groupState,
  newRevision
}) {
  const logId = idForLogging(group.groupId);
  if (!group.secretParams) {
    throw new Error(`integrateGroupChange/${logId}: Group was missing secretParams!`);
  }
  if (!groupChange && !groupState) {
    throw new Error(`integrateGroupChange/${logId}: Neither groupChange nor groupState received!`);
  }
  const isFirstFetch = !(0, import_lodash.isNumber)(group.revision);
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const weAreAwaitingApproval = (group.pendingAdminApprovalV2 || []).find((item) => item.uuid === ourUuid);
  let isChangeSupported = false;
  let isSameVersion = false;
  let isMoreThanOneVersionUp = false;
  let groupChangeActions;
  let decryptedChangeActions;
  let sourceUuid;
  if (groupChange) {
    groupChangeActions = import_protobuf.SignalService.GroupChange.Actions.decode(groupChange.actions || new Uint8Array(0));
    if (groupChangeActions.version && newRevision !== void 0 && groupChangeActions.version > newRevision) {
      log.info(`integrateGroupChange/${logId}: Skipping ${groupChangeActions.version}, newRevision is ${newRevision}`);
      return {
        newAttributes: group,
        groupChangeMessages: [],
        members: []
      };
    }
    decryptedChangeActions = decryptGroupChange(groupChangeActions, group.secretParams, logId);
    (0, import_assert.strictAssert)(decryptedChangeActions !== void 0, "Should have decrypted group actions");
    ({ sourceUuid } = decryptedChangeActions);
    (0, import_assert.strictAssert)(sourceUuid, "Should have source UUID");
    isChangeSupported = !(0, import_lodash.isNumber)(groupChange.changeEpoch) || groupChange.changeEpoch <= SUPPORTED_CHANGE_EPOCH;
    if (group.revision !== void 0 && groupChangeActions.version) {
      if (groupChangeActions.version < group.revision) {
        log.info(`integrateGroupChange/${logId}: Skipping stale version${groupChangeActions.version}, current revision is ${group.revision}`);
        return {
          newAttributes: group,
          groupChangeMessages: [],
          members: []
        };
      }
      if (groupChangeActions.version === group.revision) {
        isSameVersion = true;
      } else if (groupChangeActions.version > group.revision + 1 || !(0, import_lodash.isNumber)(group.revision) && groupChangeActions.version > 0) {
        isMoreThanOneVersionUp = true;
      }
    }
  }
  let attributes = group;
  const aggregatedChangeMessages = [];
  const aggregatedMembers = [];
  const canApplyChange = groupChange && isChangeSupported && !isSameVersion && !isFirstFetch && (!isMoreThanOneVersionUp || weAreAwaitingApproval);
  if (canApplyChange) {
    if (!sourceUuid || !groupChangeActions || !decryptedChangeActions) {
      throw new Error(`integrateGroupChange/${logId}: Missing necessary information that should have come from group actions`);
    }
    log.info(`integrateGroupChange/${logId}: Applying group change actions, from version ${group.revision} to ${groupChangeActions.version}`);
    const { newAttributes, newProfileKeys } = await applyGroupChange({
      group,
      actions: decryptedChangeActions,
      sourceUuid
    });
    const groupChangeMessages = extractDiffs({
      old: attributes,
      current: newAttributes,
      sourceUuid
    });
    attributes = newAttributes;
    aggregatedChangeMessages.push(groupChangeMessages);
    aggregatedMembers.push(profileKeysToMembers(newProfileKeys));
  }
  if (groupState) {
    log.info(`integrateGroupChange/${logId}: Applying full group state, from version ${group.revision} to ${groupState.version}`, {
      isChangePresent: Boolean(groupChange),
      isChangeSupported,
      isFirstFetch,
      isSameVersion,
      isMoreThanOneVersionUp,
      weAreAwaitingApproval
    });
    const decryptedGroupState = decryptGroupState(groupState, group.secretParams, logId);
    const { newAttributes, newProfileKeys } = await applyGroupState({
      group: attributes,
      groupState: decryptedGroupState,
      sourceUuid: isFirstFetch ? sourceUuid : void 0
    });
    const groupChangeMessages = extractDiffs({
      old: attributes,
      current: newAttributes,
      sourceUuid: isFirstFetch ? sourceUuid : void 0
    });
    const newMembers = profileKeysToMembers(newProfileKeys);
    if (canApplyChange && (groupChangeMessages.length !== 0 || newMembers.length !== 0)) {
      (0, import_assert.assert)(groupChangeMessages.length === 0, "Fallback group state processing should not kick in");
      log.warn(`integrateGroupChange/${logId}: local state was different from the remote final state. Got ${groupChangeMessages.length} change messages, and ${newMembers.length} updated members`);
    }
    attributes = newAttributes;
    aggregatedChangeMessages.push(groupChangeMessages);
    aggregatedMembers.push(newMembers);
  } else {
    (0, import_assert.strictAssert)(canApplyChange, `integrateGroupChange/${logId}: No group state, but we can't apply changes!`);
  }
  return {
    newAttributes: attributes,
    groupChangeMessages: aggregatedChangeMessages.flat(),
    members: aggregatedMembers.flat()
  };
}
function extractDiffs({
  current,
  dropInitialJoinMessage,
  old,
  sourceUuid
}) {
  const logId = idForLogging(old.groupId);
  const details = [];
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  let areWeInGroup = false;
  let areWeInvitedToGroup = false;
  let areWePendingApproval = false;
  let whoInvitedUsUserId = null;
  if (current.accessControl && old.accessControl && old.accessControl.attributes !== void 0 && old.accessControl.attributes !== current.accessControl.attributes) {
    details.push({
      type: "access-attributes",
      newPrivilege: current.accessControl.attributes
    });
  }
  if (current.accessControl && old.accessControl && old.accessControl.members !== void 0 && old.accessControl.members !== current.accessControl.members) {
    details.push({
      type: "access-members",
      newPrivilege: current.accessControl.members
    });
  }
  const linkPreviouslyEnabled = (0, import_util.isAccessControlEnabled)(old.accessControl?.addFromInviteLink);
  const linkCurrentlyEnabled = (0, import_util.isAccessControlEnabled)(current.accessControl?.addFromInviteLink);
  if (!linkPreviouslyEnabled && linkCurrentlyEnabled) {
    details.push({
      type: "group-link-add",
      privilege: current.accessControl?.addFromInviteLink || ACCESS_ENUM.ANY
    });
  } else if (linkPreviouslyEnabled && !linkCurrentlyEnabled) {
    details.push({
      type: "group-link-remove"
    });
  } else if (linkPreviouslyEnabled && linkCurrentlyEnabled && old.accessControl?.addFromInviteLink !== current.accessControl?.addFromInviteLink) {
    details.push({
      type: "access-invite-link",
      newPrivilege: current.accessControl?.addFromInviteLink || ACCESS_ENUM.ANY
    });
  }
  if (Boolean(old.avatar) !== Boolean(current.avatar) || old.avatar?.hash !== current.avatar?.hash) {
    details.push({
      type: "avatar",
      removed: !current.avatar
    });
  }
  if (old.name !== current.name) {
    details.push({
      type: "title",
      newTitle: current.name
    });
  }
  if (old.groupInviteLinkPassword && current.groupInviteLinkPassword && old.groupInviteLinkPassword !== current.groupInviteLinkPassword) {
    details.push({
      type: "group-link-reset"
    });
  }
  if (old.description !== current.description) {
    details.push({
      type: "description",
      removed: !current.description,
      description: current.description
    });
  }
  const oldMemberLookup = new Map((old.membersV2 || []).map((member) => [member.uuid, member]));
  const oldPendingMemberLookup = new Map((old.pendingMembersV2 || []).map((member) => [member.uuid, member]));
  const oldPendingAdminApprovalLookup = new Map((old.pendingAdminApprovalV2 || []).map((member) => [member.uuid, member]));
  (current.membersV2 || []).forEach((currentMember) => {
    const { uuid } = currentMember;
    if (uuid === ourUuid) {
      areWeInGroup = true;
    }
    const oldMember = oldMemberLookup.get(uuid);
    if (!oldMember) {
      const pendingMember = oldPendingMemberLookup.get(uuid);
      if (pendingMember) {
        details.push({
          type: "member-add-from-invite",
          uuid,
          inviter: pendingMember.addedByUserId
        });
      } else if (currentMember.joinedFromLink) {
        details.push({
          type: "member-add-from-link",
          uuid
        });
      } else if (currentMember.approvedByAdmin) {
        details.push({
          type: "member-add-from-admin-approval",
          uuid
        });
      } else {
        details.push({
          type: "member-add",
          uuid
        });
      }
    } else if (oldMember.role !== currentMember.role) {
      details.push({
        type: "member-privilege",
        uuid,
        newPrivilege: currentMember.role
      });
    }
    oldPendingAdminApprovalLookup.delete(uuid);
    oldPendingMemberLookup.delete(uuid);
    oldMemberLookup.delete(uuid);
  });
  const removedMemberIds = Array.from(oldMemberLookup.keys());
  removedMemberIds.forEach((uuid) => {
    details.push({
      type: "member-remove",
      uuid
    });
  });
  let lastPendingUuid;
  let pendingCount = 0;
  (current.pendingMembersV2 || []).forEach((currentPendingMember) => {
    const { uuid } = currentPendingMember;
    const oldPendingMember = oldPendingMemberLookup.get(uuid);
    if (uuid === ourUuid) {
      areWeInvitedToGroup = true;
      whoInvitedUsUserId = currentPendingMember.addedByUserId;
    }
    if (!oldPendingMember) {
      lastPendingUuid = uuid;
      pendingCount += 1;
    }
    oldPendingMemberLookup.delete(uuid);
  });
  if (pendingCount > 1) {
    details.push({
      type: "pending-add-many",
      count: pendingCount
    });
  } else if (pendingCount === 1) {
    if (lastPendingUuid) {
      details.push({
        type: "pending-add-one",
        uuid: lastPendingUuid
      });
    } else {
      log.warn(`extractDiffs/${logId}: pendingCount was 1, no last conversationId available`);
    }
  }
  const removedPendingMemberIds = Array.from(oldPendingMemberLookup.keys());
  if (removedPendingMemberIds.length > 1) {
    const firstUuid = removedPendingMemberIds[0];
    const firstRemovedMember = oldPendingMemberLookup.get(firstUuid);
    (0, import_assert.strictAssert)(firstRemovedMember !== void 0, "First removed member not found");
    const inviter = firstRemovedMember.addedByUserId;
    const allSameInviter = removedPendingMemberIds.every((id) => oldPendingMemberLookup.get(id)?.addedByUserId === inviter);
    details.push({
      type: "pending-remove-many",
      count: removedPendingMemberIds.length,
      inviter: allSameInviter ? inviter : void 0
    });
  } else if (removedPendingMemberIds.length === 1) {
    const uuid = removedPendingMemberIds[0];
    const removedMember = oldPendingMemberLookup.get(uuid);
    (0, import_assert.strictAssert)(removedMember !== void 0, "Removed member not found");
    details.push({
      type: "pending-remove-one",
      uuid,
      inviter: removedMember.addedByUserId
    });
  }
  (current.pendingAdminApprovalV2 || []).forEach((currentPendingAdminAprovalMember) => {
    const { uuid } = currentPendingAdminAprovalMember;
    const oldPendingMember = oldPendingAdminApprovalLookup.get(uuid);
    if (uuid === ourUuid) {
      areWePendingApproval = true;
    }
    if (!oldPendingMember) {
      details.push({
        type: "admin-approval-add-one",
        uuid
      });
    }
    oldPendingAdminApprovalLookup.delete(uuid);
  });
  const removedPendingAdminApprovalIds = Array.from(oldPendingAdminApprovalLookup.keys());
  removedPendingAdminApprovalIds.forEach((uuid) => {
    details.push({
      type: "admin-approval-remove-one",
      uuid
    });
  });
  if (Boolean(old.announcementsOnly) !== Boolean(current.announcementsOnly)) {
    details.push({
      type: "announcements-only",
      announcementsOnly: Boolean(current.announcementsOnly)
    });
  }
  let message;
  let timerNotification;
  const firstUpdate = !(0, import_lodash.isNumber)(old.revision);
  const isFromUs = ourUuid === sourceUuid;
  if (firstUpdate && areWeInvitedToGroup) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        from: whoInvitedUsUserId || sourceUuid,
        details: [
          {
            type: "pending-add-one",
            uuid: ourUuid
          }
        ]
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: isFromUs ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen
    };
  } else if (firstUpdate && areWePendingApproval) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        from: ourUuid,
        details: [
          {
            type: "admin-approval-add-one",
            uuid: ourUuid
          }
        ]
      }
    };
  } else if (firstUpdate && dropInitialJoinMessage) {
    message = void 0;
  } else if (firstUpdate && current.revision === 0 && sourceUuid && sourceUuid === ourUuid) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        from: sourceUuid,
        details: [
          {
            type: "create"
          }
        ]
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: isFromUs ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen
    };
  } else if (firstUpdate && areWeInGroup) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        from: sourceUuid,
        details: [
          {
            type: "member-add",
            uuid: ourUuid
          }
        ]
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: isFromUs ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen
    };
  } else if (firstUpdate && current.revision === 0) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      groupV2Change: {
        from: sourceUuid,
        details: [
          {
            type: "create"
          }
        ]
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: isFromUs ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen
    };
  } else if (details.length > 0) {
    message = {
      ...generateBasicMessage(),
      type: "group-v2-change",
      sourceUuid,
      groupV2Change: {
        from: sourceUuid,
        details
      },
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      seenStatus: isFromUs ? import_MessageSeenStatus.SeenStatus.Seen : import_MessageSeenStatus.SeenStatus.Unseen
    };
  }
  if (Boolean(old.expireTimer) !== Boolean(current.expireTimer) || Boolean(old.expireTimer) && Boolean(current.expireTimer) && old.expireTimer !== current.expireTimer) {
    timerNotification = {
      ...generateBasicMessage(),
      type: "timer-notification",
      sourceUuid,
      flags: import_protobuf.SignalService.DataMessage.Flags.EXPIRATION_TIMER_UPDATE,
      expirationTimerUpdate: {
        expireTimer: current.expireTimer || 0,
        sourceUuid
      }
    };
  }
  const result = (0, import_lodash.compact)([message, timerNotification]);
  log.info(`extractDiffs/${logId} complete, generated ${result.length} change messages`);
  return result;
}
function profileKeysToMembers(items) {
  return items.map((item) => ({
    profileKey: Bytes.toBase64(item.profileKey),
    uuid: item.uuid
  }));
}
async function applyGroupChange({
  actions,
  group,
  sourceUuid
}) {
  const logId = idForLogging(group.groupId);
  const ourUuid = window.storage.user.getUuid()?.toString();
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const version = actions.version || 0;
  const result = { ...group };
  const newProfileKeys = [];
  const members = (0, import_lodash.fromPairs)((result.membersV2 || []).map((member) => [member.uuid, member]));
  const pendingMembers = (0, import_lodash.fromPairs)((result.pendingMembersV2 || []).map((member) => [member.uuid, member]));
  const pendingAdminApprovalMembers = (0, import_lodash.fromPairs)((result.pendingAdminApprovalV2 || []).map((member) => [member.uuid, member]));
  const bannedMembers = new Map((result.bannedMembersV2 || []).map((member) => [member.uuid, member]));
  result.revision = version;
  (actions.addMembers || []).forEach((addMember) => {
    const { added } = addMember;
    if (!added || !added.userId) {
      throw new Error("applyGroupChange: addMember.added is missing");
    }
    const addedUuid = import_UUID.UUID.cast(added.userId);
    if (members[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add member failed; already in members.`);
      return;
    }
    members[addedUuid] = {
      uuid: addedUuid,
      role: added.role || MEMBER_ROLE_ENUM.DEFAULT,
      joinedAtVersion: version,
      joinedFromLink: addMember.joinFromInviteLink || false
    };
    if (pendingMembers[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Removing newly-added member from pendingMembers.`);
      delete pendingMembers[addedUuid];
    }
    if (ourUuid && sourceUuid && addedUuid === ourUuid) {
      result.addedBy = sourceUuid;
    }
    if (added.profileKey) {
      newProfileKeys.push({
        profileKey: added.profileKey,
        uuid: import_UUID.UUID.cast(added.userId)
      });
    }
  });
  (actions.deleteMembers || []).forEach((deleteMember) => {
    const { deletedUserId } = deleteMember;
    if (!deletedUserId) {
      throw new Error("applyGroupChange: deleteMember.deletedUserId is missing");
    }
    const deletedUuid = import_UUID.UUID.cast(deletedUserId);
    if (members[deletedUuid]) {
      delete members[deletedUuid];
    } else {
      log.warn(`applyGroupChange/${logId}: Attempt to remove member failed; was not in members.`);
    }
  });
  (actions.modifyMemberRoles || []).forEach((modifyMemberRole) => {
    const { role, userId } = modifyMemberRole;
    if (!role || !userId) {
      throw new Error("applyGroupChange: modifyMemberRole had a missing value");
    }
    const userUuid = import_UUID.UUID.cast(userId);
    if (members[userUuid]) {
      members[userUuid] = {
        ...members[userUuid],
        role
      };
    } else {
      throw new Error("applyGroupChange: modifyMemberRole tried to modify nonexistent member");
    }
  });
  (actions.modifyMemberProfileKeys || []).forEach((modifyMemberProfileKey) => {
    const { profileKey, uuid } = modifyMemberProfileKey;
    if (!profileKey || !uuid) {
      throw new Error("applyGroupChange: modifyMemberProfileKey had a missing value");
    }
    newProfileKeys.push({
      profileKey,
      uuid: import_UUID.UUID.cast(uuid)
    });
  });
  (actions.addPendingMembers || []).forEach((addPendingMember) => {
    const { added } = addPendingMember;
    if (!added || !added.member || !added.member.userId) {
      throw new Error("applyGroupChange: addPendingMembers had a missing value");
    }
    const addedUuid = import_UUID.UUID.cast(added.member.userId);
    if (members[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add pendingMember failed; was already in members.`);
      return;
    }
    if (pendingMembers[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add pendingMember failed; was already in pendingMembers.`);
      return;
    }
    pendingMembers[addedUuid] = {
      uuid: addedUuid,
      addedByUserId: import_UUID.UUID.cast(added.addedByUserId),
      timestamp: added.timestamp,
      role: added.member.role || MEMBER_ROLE_ENUM.DEFAULT
    };
    if (added.member && added.member.profileKey) {
      newProfileKeys.push({
        profileKey: added.member.profileKey,
        uuid: addedUuid
      });
    }
  });
  (actions.deletePendingMembers || []).forEach((deletePendingMember) => {
    const { deletedUserId } = deletePendingMember;
    if (!deletedUserId) {
      throw new Error("applyGroupChange: deletePendingMember.deletedUserId is null!");
    }
    const deletedUuid = import_UUID.UUID.cast(deletedUserId);
    if (pendingMembers[deletedUuid]) {
      delete pendingMembers[deletedUuid];
    } else {
      log.warn(`applyGroupChange/${logId}: Attempt to remove pendingMember failed; was not in pendingMembers.`);
    }
  });
  (actions.promotePendingMembers || []).forEach((promotePendingMember) => {
    const { profileKey, uuid: rawUuid } = promotePendingMember;
    if (!profileKey || !rawUuid) {
      throw new Error("applyGroupChange: promotePendingMember had a missing value");
    }
    const uuid = import_UUID.UUID.cast(rawUuid);
    const previousRecord = pendingMembers[uuid];
    if (pendingMembers[uuid]) {
      delete pendingMembers[uuid];
    } else {
      log.warn(`applyGroupChange/${logId}: Attempt to promote pendingMember failed; was not in pendingMembers.`);
    }
    if (members[uuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to promote pendingMember failed; was already in members.`);
      return;
    }
    members[uuid] = {
      uuid,
      joinedAtVersion: version,
      role: previousRecord.role || MEMBER_ROLE_ENUM.DEFAULT
    };
    newProfileKeys.push({
      profileKey,
      uuid
    });
  });
  if (actions.modifyTitle) {
    const { title } = actions.modifyTitle;
    if (title && title.content === "title") {
      result.name = (0, import_dropNull.dropNull)(title.title);
    } else {
      log.warn(`applyGroupChange/${logId}: Clearing group title due to missing data.`);
      result.name = void 0;
    }
  }
  if (actions.modifyAvatar) {
    const { avatar } = actions.modifyAvatar;
    await applyNewAvatar((0, import_dropNull.dropNull)(avatar), result, logId);
  }
  if (actions.modifyDisappearingMessagesTimer) {
    const disappearingMessagesTimer = actions.modifyDisappearingMessagesTimer.timer;
    if (disappearingMessagesTimer && disappearingMessagesTimer.content === "disappearingMessagesDuration") {
      result.expireTimer = (0, import_dropNull.dropNull)(disappearingMessagesTimer.disappearingMessagesDuration);
    } else {
      log.warn(`applyGroupChange/${logId}: Clearing group expireTimer due to missing data.`);
      result.expireTimer = void 0;
    }
  }
  result.accessControl = result.accessControl || {
    members: ACCESS_ENUM.MEMBER,
    attributes: ACCESS_ENUM.MEMBER,
    addFromInviteLink: ACCESS_ENUM.UNSATISFIABLE
  };
  if (actions.modifyAttributesAccess) {
    result.accessControl = {
      ...result.accessControl,
      attributes: actions.modifyAttributesAccess.attributesAccess || ACCESS_ENUM.MEMBER
    };
  }
  if (actions.modifyMemberAccess) {
    result.accessControl = {
      ...result.accessControl,
      members: actions.modifyMemberAccess.membersAccess || ACCESS_ENUM.MEMBER
    };
  }
  if (actions.modifyAddFromInviteLinkAccess) {
    result.accessControl = {
      ...result.accessControl,
      addFromInviteLink: actions.modifyAddFromInviteLinkAccess.addFromInviteLinkAccess || ACCESS_ENUM.UNSATISFIABLE
    };
  }
  (actions.addMemberPendingAdminApprovals || []).forEach((pendingAdminApproval) => {
    const { added } = pendingAdminApproval;
    if (!added) {
      throw new Error("applyGroupChange: modifyMemberProfileKey had a missing value");
    }
    const addedUuid = import_UUID.UUID.cast(added.userId);
    if (members[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add pending admin approval failed; was already in members.`);
      return;
    }
    if (pendingMembers[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add pending admin approval failed; was already in pendingMembers.`);
      return;
    }
    if (pendingAdminApprovalMembers[addedUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to add pending admin approval failed; was already in pendingAdminApprovalMembers.`);
      return;
    }
    pendingAdminApprovalMembers[addedUuid] = {
      uuid: addedUuid,
      timestamp: added.timestamp
    };
    if (added.profileKey) {
      newProfileKeys.push({
        profileKey: added.profileKey,
        uuid: addedUuid
      });
    }
  });
  (actions.deleteMemberPendingAdminApprovals || []).forEach((deleteAdminApproval) => {
    const { deletedUserId } = deleteAdminApproval;
    if (!deletedUserId) {
      throw new Error("applyGroupChange: deleteAdminApproval.deletedUserId is null!");
    }
    const deletedUuid = import_UUID.UUID.cast(deletedUserId);
    if (pendingAdminApprovalMembers[deletedUuid]) {
      delete pendingAdminApprovalMembers[deletedUuid];
    } else {
      log.warn(`applyGroupChange/${logId}: Attempt to remove pendingAdminApproval failed; was not in pendingAdminApprovalMembers.`);
    }
  });
  (actions.promoteMemberPendingAdminApprovals || []).forEach((promoteAdminApproval) => {
    const { userId, role } = promoteAdminApproval;
    if (!userId) {
      throw new Error("applyGroupChange: promoteAdminApproval had a missing value");
    }
    const userUuid = import_UUID.UUID.cast(userId);
    if (pendingAdminApprovalMembers[userUuid]) {
      delete pendingAdminApprovalMembers[userUuid];
    } else {
      log.warn(`applyGroupChange/${logId}: Attempt to promote pendingAdminApproval failed; was not in pendingAdminApprovalMembers.`);
    }
    if (pendingMembers[userUuid]) {
      delete pendingAdminApprovalMembers[userUuid];
      log.warn(`applyGroupChange/${logId}: Deleted pendingAdminApproval from pendingMembers.`);
    }
    if (members[userUuid]) {
      log.warn(`applyGroupChange/${logId}: Attempt to promote pendingMember failed; was already in members.`);
      return;
    }
    members[userUuid] = {
      uuid: userUuid,
      joinedAtVersion: version,
      role: role || MEMBER_ROLE_ENUM.DEFAULT,
      approvedByAdmin: true
    };
  });
  if (actions.modifyInviteLinkPassword) {
    const { inviteLinkPassword } = actions.modifyInviteLinkPassword;
    if (inviteLinkPassword) {
      result.groupInviteLinkPassword = inviteLinkPassword;
    } else {
      result.groupInviteLinkPassword = void 0;
    }
  }
  if (actions.modifyDescription) {
    const { descriptionBytes } = actions.modifyDescription;
    if (descriptionBytes && descriptionBytes.content === "descriptionText") {
      result.description = (0, import_dropNull.dropNull)(descriptionBytes.descriptionText);
    } else {
      log.warn(`applyGroupChange/${logId}: Clearing group description due to missing data.`);
      result.description = void 0;
    }
  }
  if (actions.modifyAnnouncementsOnly) {
    const { announcementsOnly } = actions.modifyAnnouncementsOnly;
    result.announcementsOnly = announcementsOnly;
  }
  if (actions.addMembersBanned && actions.addMembersBanned.length > 0) {
    actions.addMembersBanned.forEach((member) => {
      if (bannedMembers.has(member.uuid)) {
        log.warn(`applyGroupChange/${logId}: Attempt to add banned member failed; was already in banned list.`);
        return;
      }
      bannedMembers.set(member.uuid, member);
    });
  }
  if (actions.deleteMembersBanned && actions.deleteMembersBanned.length > 0) {
    actions.deleteMembersBanned.forEach((uuid) => {
      if (!bannedMembers.has(uuid)) {
        log.warn(`applyGroupChange/${logId}: Attempt to remove banned member failed; was not in banned list.`);
        return;
      }
      bannedMembers.delete(uuid);
    });
  }
  if (ourUuid) {
    result.left = !members[ourUuid];
  }
  if (result.left) {
    result.addedBy = void 0;
  }
  result.membersV2 = (0, import_lodash.values)(members);
  result.pendingMembersV2 = (0, import_lodash.values)(pendingMembers);
  result.pendingAdminApprovalV2 = (0, import_lodash.values)(pendingAdminApprovalMembers);
  result.bannedMembersV2 = Array.from(bannedMembers.values());
  return {
    newAttributes: result,
    newProfileKeys
  };
}
async function decryptGroupAvatar(avatarKey, secretParamsBase64) {
  const sender = window.textsecure.messaging;
  if (!sender) {
    throw new Error("decryptGroupAvatar: textsecure.messaging is not available!");
  }
  const ciphertext = await sender.getGroupAvatar(avatarKey);
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParamsBase64);
  const plaintext = (0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, ciphertext);
  const blob = import_protobuf.SignalService.GroupAttributeBlob.decode(plaintext);
  if (blob.content !== "avatar") {
    throw new Error(`decryptGroupAvatar: Returned blob had incorrect content: ${blob.content}`);
  }
  const avatar = (0, import_dropNull.dropNull)(blob.avatar);
  if (!avatar) {
    throw new Error("decryptGroupAvatar: Returned blob had no avatar set!");
  }
  return avatar;
}
async function applyNewAvatar(newAvatar, result, logId) {
  try {
    if (!newAvatar && result.avatar) {
      await window.Signal.Migrations.deleteAttachmentData(result.avatar.path);
      result.avatar = void 0;
    }
    if (newAvatar && (!result.avatar || result.avatar.url !== newAvatar)) {
      if (!result.secretParams) {
        throw new Error("applyNewAvatar: group was missing secretParams!");
      }
      const data = await decryptGroupAvatar(newAvatar, result.secretParams);
      const hash = (0, import_Crypto.computeHash)(data);
      if (result.avatar?.hash === hash) {
        log.info(`applyNewAvatar/${logId}: Hash is the same, but url was different. Saving new url.`);
        result.avatar = {
          ...result.avatar,
          url: newAvatar
        };
        return;
      }
      if (result.avatar) {
        await window.Signal.Migrations.deleteAttachmentData(result.avatar.path);
      }
      const path = await window.Signal.Migrations.writeNewAttachmentData(data);
      result.avatar = {
        url: newAvatar,
        path,
        hash
      };
    }
  } catch (error) {
    log.warn(`applyNewAvatar/${logId} Failed to handle avatar, clearing it`, error.stack);
    if (result.avatar && result.avatar.path) {
      await window.Signal.Migrations.deleteAttachmentData(result.avatar.path);
    }
    result.avatar = void 0;
  }
}
async function applyGroupState({
  group,
  groupState,
  sourceUuid
}) {
  const logId = idForLogging(group.groupId);
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  const version = groupState.version || 0;
  const result = { ...group };
  const newProfileKeys = [];
  result.revision = version;
  const { title } = groupState;
  if (title && title.content === "title") {
    result.name = (0, import_dropNull.dropNull)(title.title);
  } else {
    result.name = void 0;
  }
  await applyNewAvatar((0, import_dropNull.dropNull)(groupState.avatar), result, logId);
  const { disappearingMessagesTimer } = groupState;
  if (disappearingMessagesTimer && disappearingMessagesTimer.content === "disappearingMessagesDuration") {
    result.expireTimer = (0, import_dropNull.dropNull)(disappearingMessagesTimer.disappearingMessagesDuration);
  } else {
    result.expireTimer = void 0;
  }
  const { accessControl } = groupState;
  result.accessControl = {
    attributes: accessControl && accessControl.attributes || ACCESS_ENUM.MEMBER,
    members: accessControl && accessControl.members || ACCESS_ENUM.MEMBER,
    addFromInviteLink: accessControl && accessControl.addFromInviteLink || ACCESS_ENUM.UNSATISFIABLE
  };
  result.left = true;
  const ourUuid = window.storage.user.getCheckedUuid().toString();
  const wasPreviouslyAMember = (result.membersV2 || []).some((item) => item.uuid !== ourUuid);
  if (groupState.members) {
    result.membersV2 = groupState.members.map((member) => {
      if (member.userId === ourUuid) {
        result.left = false;
        if (sourceUuid && !wasPreviouslyAMember && (0, import_lodash.isNumber)(member.joinedAtVersion) && member.joinedAtVersion === version) {
          result.addedBy = sourceUuid;
        }
      }
      if (!isValidRole(member.role)) {
        throw new Error(`applyGroupState: Member had invalid role ${member.role}`);
      }
      if (member.profileKey) {
        newProfileKeys.push({
          profileKey: member.profileKey,
          uuid: import_UUID.UUID.cast(member.userId)
        });
      }
      return {
        role: member.role || MEMBER_ROLE_ENUM.DEFAULT,
        joinedAtVersion: member.joinedAtVersion || version,
        uuid: import_UUID.UUID.cast(member.userId)
      };
    });
  }
  if (groupState.membersPendingProfileKey) {
    result.pendingMembersV2 = groupState.membersPendingProfileKey.map((member) => {
      if (!member.member || !member.member.userId) {
        throw new Error("applyGroupState: Member pending profile key did not have an associated userId");
      }
      if (!member.addedByUserId) {
        throw new Error("applyGroupState: Member pending profile key did not have an addedByUserID");
      }
      if (!isValidRole(member.member.role)) {
        throw new Error(`applyGroupState: Member pending profile key had invalid role ${member.member.role}`);
      }
      if (member.member.profileKey) {
        newProfileKeys.push({
          profileKey: member.member.profileKey,
          uuid: import_UUID.UUID.cast(member.member.userId)
        });
      }
      return {
        addedByUserId: import_UUID.UUID.cast(member.addedByUserId),
        uuid: import_UUID.UUID.cast(member.member.userId),
        timestamp: member.timestamp,
        role: member.member.role || MEMBER_ROLE_ENUM.DEFAULT
      };
    });
  }
  if (groupState.membersPendingAdminApproval) {
    result.pendingAdminApprovalV2 = groupState.membersPendingAdminApproval.map((member) => {
      if (member.profileKey) {
        newProfileKeys.push({
          profileKey: member.profileKey,
          uuid: import_UUID.UUID.cast(member.userId)
        });
      }
      return {
        uuid: import_UUID.UUID.cast(member.userId),
        timestamp: member.timestamp
      };
    });
  }
  const { inviteLinkPassword } = groupState;
  if (inviteLinkPassword) {
    result.groupInviteLinkPassword = inviteLinkPassword;
  } else {
    result.groupInviteLinkPassword = void 0;
  }
  const { descriptionBytes } = groupState;
  if (descriptionBytes && descriptionBytes.content === "descriptionText") {
    result.description = (0, import_dropNull.dropNull)(descriptionBytes.descriptionText);
  } else {
    result.description = void 0;
  }
  result.announcementsOnly = groupState.announcementsOnly;
  result.bannedMembersV2 = groupState.membersBanned;
  if (result.left) {
    result.addedBy = void 0;
  }
  return {
    newAttributes: result,
    newProfileKeys
  };
}
function isValidRole(role) {
  const MEMBER_ROLE_ENUM = import_protobuf.SignalService.Member.Role;
  return role === MEMBER_ROLE_ENUM.ADMINISTRATOR || role === MEMBER_ROLE_ENUM.DEFAULT;
}
function isValidAccess(access) {
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  return access === ACCESS_ENUM.ADMINISTRATOR || access === ACCESS_ENUM.MEMBER;
}
function isValidLinkAccess(access) {
  const ACCESS_ENUM = import_protobuf.SignalService.AccessControl.AccessRequired;
  return access === ACCESS_ENUM.UNKNOWN || access === ACCESS_ENUM.ANY || access === ACCESS_ENUM.ADMINISTRATOR || access === ACCESS_ENUM.UNSATISFIABLE;
}
function isValidProfileKey(buffer) {
  return Boolean(buffer && buffer.length === 32);
}
function normalizeTimestamp(timestamp) {
  if (!timestamp) {
    return 0;
  }
  const asNumber = timestamp.toNumber();
  const now = Date.now();
  if (!asNumber || asNumber > now) {
    return now;
  }
  return asNumber;
}
function decryptGroupChange(actions, groupSecretParams, logId) {
  const result = {
    version: (0, import_dropNull.dropNull)(actions.version)
  };
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(groupSecretParams);
  if (actions.sourceUuid && actions.sourceUuid.length !== 0) {
    try {
      result.sourceUuid = import_UUID.UUID.cast((0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, actions.sourceUuid), "actions.sourceUuid"));
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt sourceUuid.`, error && error.stack ? error.stack : error);
    }
    if (!(0, import_UUID.isValidUuid)(result.sourceUuid)) {
      log.warn(`decryptGroupChange/${logId}: Invalid sourceUuid. Clearing sourceUuid.`);
      result.sourceUuid = void 0;
    }
  } else {
    throw new Error("decryptGroupChange: Missing sourceUuid");
  }
  result.addMembers = (0, import_lodash.compact)((actions.addMembers || []).map((addMember) => {
    (0, import_assert.strictAssert)(addMember.added, "decryptGroupChange: AddMember was missing added field!");
    const decrypted = decryptMember(clientZkGroupCipher, addMember.added, logId);
    if (!decrypted) {
      return null;
    }
    return {
      added: decrypted,
      joinFromInviteLink: Boolean(addMember.joinFromInviteLink)
    };
  }));
  result.deleteMembers = (0, import_lodash.compact)((actions.deleteMembers || []).map((deleteMember) => {
    const { deletedUserId } = deleteMember;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(deletedUserId), "decryptGroupChange: deleteMember.deletedUserId was missing");
    let userId;
    try {
      userId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, deletedUserId), "actions.deleteMembers.deletedUserId");
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt deleteMembers.deletedUserId. Dropping member.`, error && error.stack ? error.stack : error);
      return null;
    }
    if (!(0, import_UUID.isValidUuid)(userId)) {
      log.warn(`decryptGroupChange/${logId}: Dropping deleteMember due to invalid userId`);
      return null;
    }
    return { deletedUserId: userId };
  }));
  result.modifyMemberRoles = (0, import_lodash.compact)((actions.modifyMemberRoles || []).map((modifyMember) => {
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(modifyMember.userId), "decryptGroupChange: modifyMemberRole.userId was missing");
    let userId;
    try {
      userId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, modifyMember.userId), "actions.modifyMemberRoles.userId");
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt modifyMemberRole.userId. Dropping member.`, error && error.stack ? error.stack : error);
      return null;
    }
    if (!(0, import_UUID.isValidUuid)(userId)) {
      log.warn(`decryptGroupChange/${logId}: Dropping modifyMemberRole due to invalid userId`);
      return null;
    }
    const role = (0, import_dropNull.dropNull)(modifyMember.role);
    if (!isValidRole(role)) {
      throw new Error(`decryptGroupChange: modifyMemberRole had invalid role ${modifyMember.role}`);
    }
    return {
      role,
      userId
    };
  }));
  result.modifyMemberProfileKeys = (0, import_lodash.compact)((actions.modifyMemberProfileKeys || []).map((modifyMemberProfileKey) => {
    const { presentation } = modifyMemberProfileKey;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(presentation), "decryptGroupChange: modifyMemberProfileKey.presentation was missing");
    const decryptedPresentation = (0, import_zkgroup.decryptProfileKeyCredentialPresentation)(clientZkGroupCipher, presentation);
    if (!decryptedPresentation.uuid || !decryptedPresentation.profileKey) {
      throw new Error("decryptGroupChange: uuid or profileKey missing after modifyMemberProfileKey decryption!");
    }
    if (!(0, import_UUID.isValidUuid)(decryptedPresentation.uuid)) {
      log.warn(`decryptGroupChange/${logId}: Dropping modifyMemberProfileKey due to invalid userId`);
      return null;
    }
    if (!isValidProfileKey(decryptedPresentation.profileKey)) {
      throw new Error("decryptGroupChange: modifyMemberProfileKey had invalid profileKey");
    }
    return decryptedPresentation;
  }));
  result.addPendingMembers = (0, import_lodash.compact)((actions.addPendingMembers || []).map((addPendingMember) => {
    (0, import_assert.strictAssert)(addPendingMember.added, "decryptGroupChange: addPendingMember was missing added field!");
    const decrypted = decryptMemberPendingProfileKey(clientZkGroupCipher, addPendingMember.added, logId);
    if (!decrypted) {
      return null;
    }
    return {
      added: decrypted
    };
  }));
  result.deletePendingMembers = (0, import_lodash.compact)((actions.deletePendingMembers || []).map((deletePendingMember) => {
    const { deletedUserId } = deletePendingMember;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(deletedUserId), "decryptGroupChange: deletePendingMembers.deletedUserId was missing");
    let userId;
    try {
      userId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, deletedUserId), "actions.deletePendingMembers.deletedUserId");
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt deletePendingMembers.deletedUserId. Dropping member.`, error && error.stack ? error.stack : error);
      return null;
    }
    if (!(0, import_UUID.isValidUuid)(userId)) {
      log.warn(`decryptGroupChange/${logId}: Dropping deletePendingMember due to invalid deletedUserId`);
      return null;
    }
    return {
      deletedUserId: userId
    };
  }));
  result.promotePendingMembers = (0, import_lodash.compact)((actions.promotePendingMembers || []).map((promotePendingMember) => {
    const { presentation } = promotePendingMember;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(presentation), "decryptGroupChange: promotePendingMember.presentation was missing");
    const decryptedPresentation = (0, import_zkgroup.decryptProfileKeyCredentialPresentation)(clientZkGroupCipher, presentation);
    if (!decryptedPresentation.uuid || !decryptedPresentation.profileKey) {
      throw new Error("decryptGroupChange: uuid or profileKey missing after promotePendingMember decryption!");
    }
    if (!(0, import_UUID.isValidUuid)(decryptedPresentation.uuid)) {
      log.warn(`decryptGroupChange/${logId}: Dropping modifyMemberProfileKey due to invalid userId`);
      return null;
    }
    if (!isValidProfileKey(decryptedPresentation.profileKey)) {
      throw new Error("decryptGroupChange: modifyMemberProfileKey had invalid profileKey");
    }
    return decryptedPresentation;
  }));
  if (actions.modifyTitle) {
    const { title } = actions.modifyTitle;
    if (Bytes.isNotEmpty(title)) {
      try {
        result.modifyTitle = {
          title: import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, title))
        };
      } catch (error) {
        log.warn(`decryptGroupChange/${logId}: Unable to decrypt modifyTitle.title`, error && error.stack ? error.stack : error);
      }
    } else {
      result.modifyTitle = {};
    }
  }
  result.modifyAvatar = actions.modifyAvatar;
  if (actions.modifyDisappearingMessagesTimer) {
    const { timer } = actions.modifyDisappearingMessagesTimer;
    if (Bytes.isNotEmpty(timer)) {
      try {
        result.modifyDisappearingMessagesTimer = {
          timer: import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, timer))
        };
      } catch (error) {
        log.warn(`decryptGroupChange/${logId}: Unable to decrypt modifyDisappearingMessagesTimer.timer`, error && error.stack ? error.stack : error);
      }
    } else {
      result.modifyDisappearingMessagesTimer = {};
    }
  }
  if (actions.modifyAttributesAccess) {
    const attributesAccess = (0, import_dropNull.dropNull)(actions.modifyAttributesAccess.attributesAccess);
    (0, import_assert.strictAssert)(isValidAccess(attributesAccess), `decryptGroupChange: modifyAttributesAccess.attributesAccess was not valid: ${actions.modifyAttributesAccess.attributesAccess}`);
    result.modifyAttributesAccess = {
      attributesAccess
    };
  }
  if (actions.modifyMemberAccess) {
    const membersAccess = (0, import_dropNull.dropNull)(actions.modifyMemberAccess.membersAccess);
    (0, import_assert.strictAssert)(isValidAccess(membersAccess), `decryptGroupChange: modifyMemberAccess.membersAccess was not valid: ${actions.modifyMemberAccess.membersAccess}`);
    result.modifyMemberAccess = {
      membersAccess
    };
  }
  if (actions.modifyAddFromInviteLinkAccess) {
    const addFromInviteLinkAccess = (0, import_dropNull.dropNull)(actions.modifyAddFromInviteLinkAccess.addFromInviteLinkAccess);
    (0, import_assert.strictAssert)(isValidLinkAccess(addFromInviteLinkAccess), `decryptGroupChange: modifyAddFromInviteLinkAccess.addFromInviteLinkAccess was not valid: ${actions.modifyAddFromInviteLinkAccess.addFromInviteLinkAccess}`);
    result.modifyAddFromInviteLinkAccess = {
      addFromInviteLinkAccess
    };
  }
  result.addMemberPendingAdminApprovals = (0, import_lodash.compact)((actions.addMemberPendingAdminApprovals || []).map((addPendingAdminApproval) => {
    const { added } = addPendingAdminApproval;
    (0, import_assert.strictAssert)(added, "decryptGroupChange: addPendingAdminApproval was missing added field!");
    const decrypted = decryptMemberPendingAdminApproval(clientZkGroupCipher, added, logId);
    if (!decrypted) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt addPendingAdminApproval.added. Dropping member.`);
      return null;
    }
    return { added: decrypted };
  }));
  result.deleteMemberPendingAdminApprovals = (0, import_lodash.compact)((actions.deleteMemberPendingAdminApprovals || []).map((deletePendingApproval) => {
    const { deletedUserId } = deletePendingApproval;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(deletedUserId), "decryptGroupChange: deletePendingApproval.deletedUserId was missing");
    let userId;
    try {
      userId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, deletedUserId), "actions.deleteMemberPendingAdminApprovals");
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt deletePendingApproval.deletedUserId. Dropping member.`, error && error.stack ? error.stack : error);
      return null;
    }
    if (!(0, import_UUID.isValidUuid)(userId)) {
      log.warn(`decryptGroupChange/${logId}: Dropping deletePendingApproval due to invalid deletedUserId`);
      return null;
    }
    return { deletedUserId: userId };
  }));
  result.promoteMemberPendingAdminApprovals = (0, import_lodash.compact)((actions.promoteMemberPendingAdminApprovals || []).map((promoteAdminApproval) => {
    const { userId } = promoteAdminApproval;
    (0, import_assert.strictAssert)(Bytes.isNotEmpty(userId), "decryptGroupChange: promoteAdminApproval.userId was missing");
    let decryptedUserId;
    try {
      decryptedUserId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, userId), "actions.promoteMemberPendingAdminApprovals.userId");
    } catch (error) {
      log.warn(`decryptGroupChange/${logId}: Unable to decrypt promoteAdminApproval.userId. Dropping member.`, error && error.stack ? error.stack : error);
      return null;
    }
    const role = (0, import_dropNull.dropNull)(promoteAdminApproval.role);
    if (!isValidRole(role)) {
      throw new Error(`decryptGroupChange: promoteAdminApproval had invalid role ${promoteAdminApproval.role}`);
    }
    return { role, userId: decryptedUserId };
  }));
  if (actions.modifyInviteLinkPassword) {
    const { inviteLinkPassword: password } = actions.modifyInviteLinkPassword;
    if (Bytes.isNotEmpty(password)) {
      result.modifyInviteLinkPassword = {
        inviteLinkPassword: Bytes.toBase64(password)
      };
    } else {
      result.modifyInviteLinkPassword = {};
    }
  }
  if (actions.modifyDescription) {
    const { descriptionBytes } = actions.modifyDescription;
    if (Bytes.isNotEmpty(descriptionBytes)) {
      try {
        result.modifyDescription = {
          descriptionBytes: import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, descriptionBytes))
        };
      } catch (error) {
        log.warn(`decryptGroupChange/${logId}: Unable to decrypt modifyDescription.descriptionBytes`, error && error.stack ? error.stack : error);
      }
    } else {
      result.modifyDescription = {};
    }
  }
  if (actions.modifyAnnouncementsOnly) {
    const { announcementsOnly } = actions.modifyAnnouncementsOnly;
    result.modifyAnnouncementsOnly = {
      announcementsOnly: Boolean(announcementsOnly)
    };
  }
  if (actions.addMembersBanned && actions.addMembersBanned.length > 0) {
    result.addMembersBanned = actions.addMembersBanned.map((item) => {
      if (!item.added || !item.added.userId) {
        log.warn(`decryptGroupChange/${logId}: addMembersBanned had a blank entry`);
        return null;
      }
      const uuid = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, item.added.userId), "addMembersBanned.added.userId");
      const timestamp = normalizeTimestamp(item.added.timestamp);
      return { uuid, timestamp };
    }).filter(import_isNotNil.isNotNil);
  }
  if (actions.deleteMembersBanned && actions.deleteMembersBanned.length > 0) {
    result.deleteMembersBanned = actions.deleteMembersBanned.map((item) => {
      if (!item.deletedUserId) {
        log.warn(`decryptGroupChange/${logId}: deleteMembersBanned had a blank entry`);
        return null;
      }
      return (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, item.deletedUserId), "deleteMembersBanned.deletedUserId");
    }).filter(import_isNotNil.isNotNil);
  }
  return result;
}
function decryptGroupTitle(title, secretParams) {
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  if (!title || !title.length) {
    return void 0;
  }
  const blob = import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, title));
  if (blob && blob.content === "title") {
    return (0, import_dropNull.dropNull)(blob.title);
  }
  return void 0;
}
function decryptGroupDescription(description, secretParams) {
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  if (!description || !description.length) {
    return void 0;
  }
  const blob = import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, description));
  if (blob && blob.content === "descriptionText") {
    return (0, import_dropNull.dropNull)(blob.descriptionText);
  }
  return void 0;
}
function decryptGroupState(groupState, groupSecretParams, logId) {
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(groupSecretParams);
  const result = {};
  if (Bytes.isNotEmpty(groupState.title)) {
    try {
      result.title = import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, groupState.title));
    } catch (error) {
      log.warn(`decryptGroupState/${logId}: Unable to decrypt title. Clearing it.`, error && error.stack ? error.stack : error);
    }
  }
  if (groupState.disappearingMessagesTimer && groupState.disappearingMessagesTimer.length) {
    try {
      result.disappearingMessagesTimer = import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, groupState.disappearingMessagesTimer));
    } catch (error) {
      log.warn(`decryptGroupState/${logId}: Unable to decrypt disappearing message timer. Clearing it.`, error && error.stack ? error.stack : error);
    }
  }
  {
    const { accessControl } = groupState;
    (0, import_assert.strictAssert)(accessControl, "No accessControl field found");
    const attributes = (0, import_dropNull.dropNull)(accessControl.attributes);
    const members = (0, import_dropNull.dropNull)(accessControl.members);
    const addFromInviteLink = (0, import_dropNull.dropNull)(accessControl.addFromInviteLink);
    (0, import_assert.strictAssert)(isValidAccess(attributes), `decryptGroupState: Access control for attributes is invalid: ${attributes}`);
    (0, import_assert.strictAssert)(isValidAccess(members), `decryptGroupState: Access control for members is invalid: ${members}`);
    (0, import_assert.strictAssert)(isValidLinkAccess(addFromInviteLink), `decryptGroupState: Access control for invite link is invalid: ${addFromInviteLink}`);
    result.accessControl = {
      attributes,
      members,
      addFromInviteLink
    };
  }
  (0, import_assert.strictAssert)((0, import_lodash.isNumber)(groupState.version), `decryptGroupState: Expected version to be a number; it was ${groupState.version}`);
  result.version = groupState.version;
  if (groupState.members) {
    result.members = (0, import_lodash.compact)(groupState.members.map((member) => decryptMember(clientZkGroupCipher, member, logId)));
  }
  if (groupState.membersPendingProfileKey) {
    result.membersPendingProfileKey = (0, import_lodash.compact)(groupState.membersPendingProfileKey.map((member) => decryptMemberPendingProfileKey(clientZkGroupCipher, member, logId)));
  }
  if (groupState.membersPendingAdminApproval) {
    result.membersPendingAdminApproval = (0, import_lodash.compact)(groupState.membersPendingAdminApproval.map((member) => decryptMemberPendingAdminApproval(clientZkGroupCipher, member, logId)));
  }
  if (Bytes.isNotEmpty(groupState.inviteLinkPassword)) {
    result.inviteLinkPassword = Bytes.toBase64(groupState.inviteLinkPassword);
  }
  if (Bytes.isNotEmpty(groupState.descriptionBytes)) {
    try {
      result.descriptionBytes = import_protobuf.SignalService.GroupAttributeBlob.decode((0, import_zkgroup.decryptGroupBlob)(clientZkGroupCipher, groupState.descriptionBytes));
    } catch (error) {
      log.warn(`decryptGroupState/${logId}: Unable to decrypt descriptionBytes. Clearing it.`, error && error.stack ? error.stack : error);
    }
  }
  const { announcementsOnly } = groupState;
  result.announcementsOnly = Boolean(announcementsOnly);
  const { membersBanned } = groupState;
  if (membersBanned && membersBanned.length > 0) {
    result.membersBanned = membersBanned.map((item) => {
      if (!item.userId) {
        log.warn(`decryptGroupState/${logId}: membersBanned had a blank entry`);
        return null;
      }
      const uuid = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, item.userId), "membersBanned.added.userId");
      const timestamp = item.timestamp?.toNumber() ?? 0;
      return { uuid, timestamp };
    }).filter(import_isNotNil.isNotNil);
  } else {
    result.membersBanned = [];
  }
  result.avatar = (0, import_dropNull.dropNull)(groupState.avatar);
  return result;
}
function decryptMember(clientZkGroupCipher, member, logId) {
  (0, import_assert.strictAssert)(Bytes.isNotEmpty(member.userId), "decryptMember: Member had missing userId");
  let userId;
  try {
    userId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, member.userId), "decryptMember.userId");
  } catch (error) {
    log.warn(`decryptMember/${logId}: Unable to decrypt member userid. Dropping member.`, error && error.stack ? error.stack : error);
    return void 0;
  }
  if (!(0, import_UUID.isValidUuid)(userId)) {
    log.warn(`decryptMember/${logId}: Dropping member due to invalid userId`);
    return void 0;
  }
  (0, import_assert.strictAssert)(Bytes.isNotEmpty(member.profileKey), "decryptMember: Member had missing profileKey");
  const profileKey = (0, import_zkgroup.decryptProfileKey)(clientZkGroupCipher, member.profileKey, import_UUID.UUID.cast(userId));
  if (!isValidProfileKey(profileKey)) {
    throw new Error("decryptMember: Member had invalid profileKey");
  }
  const role = (0, import_dropNull.dropNull)(member.role);
  if (!isValidRole(role)) {
    throw new Error(`decryptMember: Member had invalid role ${member.role}`);
  }
  return {
    userId,
    profileKey,
    role,
    joinedAtVersion: (0, import_dropNull.dropNull)(member.joinedAtVersion)
  };
}
function decryptMemberPendingProfileKey(clientZkGroupCipher, member, logId) {
  (0, import_assert.strictAssert)(Bytes.isNotEmpty(member.addedByUserId), "decryptMemberPendingProfileKey: Member had missing addedByUserId");
  let addedByUserId;
  try {
    addedByUserId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, member.addedByUserId), "decryptMemberPendingProfileKey.addedByUserId");
  } catch (error) {
    log.warn(`decryptMemberPendingProfileKey/${logId}: Unable to decrypt pending member addedByUserId. Dropping member.`, error && error.stack ? error.stack : error);
    return void 0;
  }
  if (!(0, import_UUID.isValidUuid)(addedByUserId)) {
    log.warn(`decryptMemberPendingProfileKey/${logId}: Dropping pending member due to invalid addedByUserId`);
    return void 0;
  }
  const timestamp = normalizeTimestamp(member.timestamp);
  if (!member.member) {
    log.warn(`decryptMemberPendingProfileKey/${logId}: Dropping pending member due to missing member details`);
    return void 0;
  }
  const { userId, profileKey } = member.member;
  (0, import_assert.strictAssert)(Bytes.isNotEmpty(userId), "decryptMemberPendingProfileKey: Member had missing member.userId");
  let decryptedUserId;
  try {
    decryptedUserId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, userId), "decryptMemberPendingProfileKey.member.userId");
  } catch (error) {
    log.warn(`decryptMemberPendingProfileKey/${logId}: Unable to decrypt pending member userId. Dropping member.`, error && error.stack ? error.stack : error);
    return void 0;
  }
  if (!(0, import_UUID.isValidUuid)(decryptedUserId)) {
    log.warn(`decryptMemberPendingProfileKey/${logId}: Dropping pending member due to invalid member.userId`);
    return void 0;
  }
  let decryptedProfileKey;
  if (Bytes.isNotEmpty(profileKey)) {
    try {
      decryptedProfileKey = (0, import_zkgroup.decryptProfileKey)(clientZkGroupCipher, profileKey, import_UUID.UUID.cast(decryptedUserId));
    } catch (error) {
      log.warn(`decryptMemberPendingProfileKey/${logId}: Unable to decrypt pending member profileKey. Dropping profileKey.`, error && error.stack ? error.stack : error);
    }
    if (!isValidProfileKey(decryptedProfileKey)) {
      log.warn(`decryptMemberPendingProfileKey/${logId}: Dropping profileKey, since it was invalid`);
      decryptedProfileKey = void 0;
    }
  }
  const role = (0, import_dropNull.dropNull)(member.member.role);
  (0, import_assert.strictAssert)(isValidRole(role), `decryptMemberPendingProfileKey: Member had invalid role ${role}`);
  return {
    addedByUserId,
    timestamp,
    member: {
      userId: decryptedUserId,
      profileKey: decryptedProfileKey,
      role
    }
  };
}
function decryptMemberPendingAdminApproval(clientZkGroupCipher, member, logId) {
  const timestamp = normalizeTimestamp(member.timestamp);
  const { userId, profileKey } = member;
  (0, import_assert.strictAssert)(Bytes.isNotEmpty(userId), "decryptMemberPendingAdminApproval: Missing userId");
  let decryptedUserId;
  try {
    decryptedUserId = (0, import_normalizeUuid.normalizeUuid)((0, import_zkgroup.decryptUuid)(clientZkGroupCipher, userId), "decryptMemberPendingAdminApproval.userId");
  } catch (error) {
    log.warn(`decryptMemberPendingAdminApproval/${logId}: Unable to decrypt pending member userId. Dropping member.`, error && error.stack ? error.stack : error);
    return void 0;
  }
  if (!(0, import_UUID.isValidUuid)(decryptedUserId)) {
    log.warn(`decryptMemberPendingAdminApproval/${logId}: Invalid userId. Dropping member.`);
    return void 0;
  }
  let decryptedProfileKey;
  if (Bytes.isNotEmpty(profileKey)) {
    try {
      decryptedProfileKey = (0, import_zkgroup.decryptProfileKey)(clientZkGroupCipher, profileKey, import_UUID.UUID.cast(decryptedUserId));
    } catch (error) {
      log.warn(`decryptMemberPendingAdminApproval/${logId}: Unable to decrypt profileKey. Dropping profileKey.`, error && error.stack ? error.stack : error);
    }
    if (!isValidProfileKey(decryptedProfileKey)) {
      log.warn(`decryptMemberPendingAdminApproval/${logId}: Dropping profileKey, since it was invalid`);
      decryptedProfileKey = void 0;
    }
  }
  return {
    timestamp,
    userId: decryptedUserId,
    profileKey: decryptedProfileKey
  };
}
function getMembershipList(conversationId) {
  const conversation = window.ConversationController.get(conversationId);
  if (!conversation) {
    throw new Error("getMembershipList: cannot find conversation");
  }
  const secretParams = conversation.get("secretParams");
  if (!secretParams) {
    throw new Error("getMembershipList: no secretParams");
  }
  const clientZkGroupCipher = (0, import_zkgroup.getClientZkGroupCipher)(secretParams);
  return conversation.getMembers().map((member) => {
    const uuid = member.get("uuid");
    if (!uuid) {
      throw new Error("getMembershipList: member has no UUID");
    }
    const uuidCiphertext = (0, import_zkgroup.encryptUuid)(clientZkGroupCipher, uuid);
    return { uuid, uuidCiphertext };
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ID_LENGTH,
  ID_V1_LENGTH,
  LINK_VERSION_ERROR,
  MASTER_KEY_LENGTH,
  _isGroupChangeMessageBounceable,
  _maybeBuildAddBannedMemberActions,
  _mergeGroupChangeMessages,
  applyNewAvatar,
  buildAccessControlAddFromInviteLinkChange,
  buildAccessControlAttributesChange,
  buildAccessControlMembersChange,
  buildAddBannedMemberChange,
  buildAddMember,
  buildAddMembersChange,
  buildAddPendingAdminApprovalMemberChange,
  buildAnnouncementsOnlyChange,
  buildDeleteMemberChange,
  buildDeletePendingAdminApprovalMemberChange,
  buildDeletePendingMemberChange,
  buildDisappearingMessagesTimerChange,
  buildGroupLink,
  buildInviteLinkPasswordChange,
  buildMigrationBubble,
  buildModifyMemberRoleChange,
  buildNewGroupLinkChange,
  buildPromoteMemberChange,
  buildPromotePendingAdminApprovalMemberChange,
  buildUpdateAttributesChange,
  createGroupV2,
  decryptGroupAvatar,
  decryptGroupDescription,
  decryptGroupTitle,
  deriveGroupFields,
  fetchMembershipProof,
  generateGroupInviteLinkPassword,
  getBasicMigrationBubble,
  getGroupMigrationMembers,
  getMembershipList,
  getPreJoinGroupInfo,
  hasV1GroupBeenMigrated,
  idForLogging,
  initiateMigrationToGroupV2,
  isGroupEligibleToMigrate,
  joinGroupV2ViaLinkAndMigrate,
  joinViaLink,
  maybeDeriveGroupV2Id,
  maybeUpdateGroup,
  modifyGroupV2,
  parseGroupLink,
  respondToGroupV2Migration,
  uploadGroupChange,
  waitThenMaybeUpdateGroup,
  waitThenRespondToGroupV2Migration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ3JvdXBzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHtcbiAgY29tcGFjdCxcbiAgZGlmZmVyZW5jZSxcbiAgZmxhdHRlbixcbiAgZnJvbVBhaXJzLFxuICBpc051bWJlcixcbiAgdmFsdWVzLFxufSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IExvbmcgZnJvbSAnbG9uZyc7XG5pbXBvcnQgdHlwZSB7IENsaWVudFprR3JvdXBDaXBoZXIgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQvemtncm91cCc7XG5pbXBvcnQgeyB2NCBhcyBnZXRHdWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgTFJVIGZyb20gJ2xydS1jYWNoZSc7XG5pbXBvcnQgUFF1ZXVlIGZyb20gJ3AtcXVldWUnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHtcbiAgZ2V0Q3JlZGVudGlhbHNGb3JUb2RheSxcbiAgR1JPVVBfQ1JFREVOVElBTFNfS0VZLFxuICBtYXliZUZldGNoTmV3Q3JlZGVudGlhbHMsXG59IGZyb20gJy4vc2VydmljZXMvZ3JvdXBDcmVkZW50aWFsRmV0Y2hlcic7XG5pbXBvcnQgZGF0YUludGVyZmFjZSBmcm9tICcuL3NxbC9DbGllbnQnO1xuaW1wb3J0IHsgdG9XZWJTYWZlQmFzZTY0LCBmcm9tV2ViU2FmZUJhc2U2NCB9IGZyb20gJy4vdXRpbC93ZWJTYWZlQmFzZTY0JztcbmltcG9ydCB7IGFzc2VydCwgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBpc01vcmVSZWNlbnRUaGFuIH0gZnJvbSAnLi91dGlsL3RpbWVzdGFtcCc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBub3JtYWxpemVVdWlkIH0gZnJvbSAnLi91dGlsL25vcm1hbGl6ZVV1aWQnO1xuaW1wb3J0IHsgZHJvcE51bGwgfSBmcm9tICcuL3V0aWwvZHJvcE51bGwnO1xuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgR3JvdXBWMk1lbWJlclR5cGUsXG4gIEdyb3VwVjJQZW5kaW5nQWRtaW5BcHByb3ZhbFR5cGUsXG4gIEdyb3VwVjJQZW5kaW5nTWVtYmVyVHlwZSxcbiAgR3JvdXBWMkJhbm5lZE1lbWJlclR5cGUsXG4gIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbn0gZnJvbSAnLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7XG4gIGNyZWF0ZVByb2ZpbGVLZXlDcmVkZW50aWFsUHJlc2VudGF0aW9uLFxuICBkZWNyeXB0R3JvdXBCbG9iLFxuICBkZWNyeXB0UHJvZmlsZUtleSxcbiAgZGVjcnlwdFByb2ZpbGVLZXlDcmVkZW50aWFsUHJlc2VudGF0aW9uLFxuICBkZWNyeXB0VXVpZCxcbiAgZGVyaXZlR3JvdXBJRCxcbiAgZGVyaXZlR3JvdXBQdWJsaWNQYXJhbXMsXG4gIGRlcml2ZUdyb3VwU2VjcmV0UGFyYW1zLFxuICBlbmNyeXB0R3JvdXBCbG9iLFxuICBlbmNyeXB0VXVpZCxcbiAgZ2V0QXV0aENyZWRlbnRpYWxQcmVzZW50YXRpb24sXG4gIGdldENsaWVudFprQXV0aE9wZXJhdGlvbnMsXG4gIGdldENsaWVudFprR3JvdXBDaXBoZXIsXG4gIGdldENsaWVudFprUHJvZmlsZU9wZXJhdGlvbnMsXG4gIHZlcmlmeU5vdGFyeVNpZ25hdHVyZSxcbn0gZnJvbSAnLi91dGlsL3prZ3JvdXAnO1xuaW1wb3J0IHtcbiAgY29tcHV0ZUhhc2gsXG4gIGRlcml2ZU1hc3RlcktleUZyb21Hcm91cFYxLFxuICBnZXRSYW5kb21CeXRlcyxcbn0gZnJvbSAnLi9DcnlwdG8nO1xuaW1wb3J0IHR5cGUge1xuICBHcm91cENyZWRlbnRpYWxzVHlwZSxcbiAgR3JvdXBMb2dSZXNwb25zZVR5cGUsXG59IGZyb20gJy4vdGV4dHNlY3VyZS9XZWJBUEknO1xuaW1wb3J0IHR5cGUgTWVzc2FnZVNlbmRlciBmcm9tICcuL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuaW1wb3J0IHsgQ1VSUkVOVF9TQ0hFTUFfVkVSU0lPTiBhcyBNQVhfTUVTU0FHRV9TQ0hFTUEgfSBmcm9tICcuL3R5cGVzL01lc3NhZ2UyJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldEdyb3VwU2l6ZUhhcmRMaW1pdCB9IGZyb20gJy4vZ3JvdXBzL2xpbWl0cyc7XG5pbXBvcnQge1xuICBpc0dyb3VwVjEgYXMgZ2V0SXNHcm91cFYxLFxuICBpc0dyb3VwVjIgYXMgZ2V0SXNHcm91cFYyLFxuICBpc01lLFxufSBmcm9tICcuL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuL0J5dGVzJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyRGF0YVR5cGUgfSBmcm9tICcuL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBVVUlELCBpc1ZhbGlkVXVpZCB9IGZyb20gJy4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi90eXBlcy9VVUlEJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi9wcm90b2J1Zic7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgeyBpc0FjY2Vzc0NvbnRyb2xFbmFibGVkIH0gZnJvbSAnLi9ncm91cHMvdXRpbCc7XG5cbmltcG9ydCB7XG4gIGNvbnZlcnNhdGlvbkpvYlF1ZXVlLFxuICBjb252ZXJzYXRpb25RdWV1ZUpvYkVudW0sXG59IGZyb20gJy4vam9icy9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5pbXBvcnQgeyBTZWVuU3RhdHVzIH0gZnJvbSAnLi9NZXNzYWdlU2VlblN0YXR1cyc7XG5cbnR5cGUgQWNjZXNzUmVxdWlyZWRFbnVtID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcblxuZXhwb3J0IHsgam9pblZpYUxpbmsgfSBmcm9tICcuL2dyb3Vwcy9qb2luVmlhTGluayc7XG5cbnR5cGUgR3JvdXBWMkFjY2Vzc0NyZWF0ZUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdjcmVhdGUnO1xufTtcbnR5cGUgR3JvdXBWMkFjY2Vzc0F0dHJpYnV0ZXNDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnYWNjZXNzLWF0dHJpYnV0ZXMnO1xuICBuZXdQcml2aWxlZ2U6IG51bWJlcjtcbn07XG50eXBlIEdyb3VwVjJBY2Nlc3NNZW1iZXJzQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ2FjY2Vzcy1tZW1iZXJzJztcbiAgbmV3UHJpdmlsZWdlOiBudW1iZXI7XG59O1xudHlwZSBHcm91cFYyQWNjZXNzSW52aXRlTGlua0NoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdhY2Nlc3MtaW52aXRlLWxpbmsnO1xuICBuZXdQcml2aWxlZ2U6IG51bWJlcjtcbn07XG50eXBlIEdyb3VwVjJBbm5vdW5jZW1lbnRzT25seUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdhbm5vdW5jZW1lbnRzLW9ubHknO1xuICBhbm5vdW5jZW1lbnRzT25seTogYm9vbGVhbjtcbn07XG50eXBlIEdyb3VwVjJBdmF0YXJDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnYXZhdGFyJztcbiAgcmVtb3ZlZDogYm9vbGVhbjtcbn07XG50eXBlIEdyb3VwVjJUaXRsZUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICd0aXRsZSc7XG4gIC8vIEFsbG93IGZvciBudWxsLCBiZWNhdXNlIHRoZSB0aXRsZSBjb3VsZCBiZSByZW1vdmVkIGVudGlyZWx5XG4gIG5ld1RpdGxlPzogc3RyaW5nO1xufTtcbnR5cGUgR3JvdXBWMkdyb3VwTGlua0FkZENoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdncm91cC1saW5rLWFkZCc7XG4gIHByaXZpbGVnZTogbnVtYmVyO1xufTtcbnR5cGUgR3JvdXBWMkdyb3VwTGlua1Jlc2V0Q2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ2dyb3VwLWxpbmstcmVzZXQnO1xufTtcbnR5cGUgR3JvdXBWMkdyb3VwTGlua1JlbW92ZUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdncm91cC1saW5rLXJlbW92ZSc7XG59O1xuXG4vLyBObyBkaXNhcHBlYXJpbmcgbWVzc2FnZXMgdGltZXIgY2hhbmdlIHR5cGUgLSBtZXNzYWdlLmV4cGlyYXRpb25UaW1lclVwZGF0ZSB1c2VkIGluc3RlYWRcblxudHlwZSBHcm91cFYyTWVtYmVyQWRkQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ21lbWJlci1hZGQnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn07XG50eXBlIEdyb3VwVjJNZW1iZXJBZGRGcm9tSW52aXRlQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1pbnZpdGUnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgaW52aXRlcj86IFVVSURTdHJpbmdUeXBlO1xufTtcbnR5cGUgR3JvdXBWMk1lbWJlckFkZEZyb21MaW5rQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1saW5rJztcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59O1xudHlwZSBHcm91cFYyTWVtYmVyQWRkRnJvbUFkbWluQXBwcm92YWxDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsJztcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59O1xudHlwZSBHcm91cFYyTWVtYmVyUHJpdmlsZWdlQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgbmV3UHJpdmlsZWdlOiBudW1iZXI7XG59O1xudHlwZSBHcm91cFYyTWVtYmVyUmVtb3ZlQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ21lbWJlci1yZW1vdmUnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn07XG5cbnR5cGUgR3JvdXBWMlBlbmRpbmdBZGRPbmVDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAncGVuZGluZy1hZGQtb25lJztcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59O1xudHlwZSBHcm91cFYyUGVuZGluZ0FkZE1hbnlDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAncGVuZGluZy1hZGQtbWFueSc7XG4gIGNvdW50OiBudW1iZXI7XG59O1xuLy8gTm90ZTogcGVuZGluZy1yZW1vdmUgaXMgb25seSB1c2VkIGlmIHVzZXIgZGlkbid0IGFsc28gam9pbiB0aGUgZ3JvdXAgYXQgdGhlIHNhbWUgdGltZVxudHlwZSBHcm91cFYyUGVuZGluZ1JlbW92ZU9uZUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgaW52aXRlcj86IFVVSURTdHJpbmdUeXBlO1xufTtcbi8vIE5vdGU6IHBlbmRpbmctcmVtb3ZlIGlzIG9ubHkgdXNlZCBpZiB1c2VyIGRpZG4ndCBhbHNvIGpvaW4gdGhlIGdyb3VwIGF0IHRoZSBzYW1lIHRpbWVcbnR5cGUgR3JvdXBWMlBlbmRpbmdSZW1vdmVNYW55Q2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ3BlbmRpbmctcmVtb3ZlLW1hbnknO1xuICBjb3VudDogbnVtYmVyO1xuICBpbnZpdGVyPzogVVVJRFN0cmluZ1R5cGU7XG59O1xuXG50eXBlIEdyb3VwVjJBZG1pbkFwcHJvdmFsQWRkT25lQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ2FkbWluLWFwcHJvdmFsLWFkZC1vbmUnO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn07XG4vLyBOb3RlOiBhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lIGlzIG9ubHkgdXNlZCBpZiB1c2VyIGRpZG4ndCBhbHNvIGpvaW4gdGhlIGdyb3VwIGF0XG4vLyAgIHRoZSBzYW1lIHRpbWVcbnR5cGUgR3JvdXBWMkFkbWluQXBwcm92YWxSZW1vdmVPbmVDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtcmVtb3ZlLW9uZSc7XG4gIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICBpbnZpdGVyPzogVVVJRFN0cmluZ1R5cGU7XG59O1xudHlwZSBHcm91cFYyQWRtaW5BcHByb3ZhbEJvdW5jZUNoYW5nZVR5cGUgPSB7XG4gIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnO1xuICB0aW1lczogbnVtYmVyO1xuICBpc0FwcHJvdmFsUGVuZGluZzogYm9vbGVhbjtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59O1xuZXhwb3J0IHR5cGUgR3JvdXBWMkRlc2NyaXB0aW9uQ2hhbmdlVHlwZSA9IHtcbiAgdHlwZTogJ2Rlc2NyaXB0aW9uJztcbiAgcmVtb3ZlZD86IGJvb2xlYW47XG4gIC8vIEFkZGluZyB0aGlzIGZpZWxkOyBjYW5ub3QgcmVtb3ZlIHByZXZpb3VzIGZpZWxkIGZvciBiYWNrd2FyZHMgY29tcGF0aWJpbGl0eVxuICBkZXNjcmlwdGlvbj86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEdyb3VwVjJDaGFuZ2VEZXRhaWxUeXBlID1cbiAgfCBHcm91cFYyQWNjZXNzQXR0cmlidXRlc0NoYW5nZVR5cGVcbiAgfCBHcm91cFYyQWNjZXNzQ3JlYXRlQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBY2Nlc3NJbnZpdGVMaW5rQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBY2Nlc3NNZW1iZXJzQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBZG1pbkFwcHJvdmFsQWRkT25lQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBZG1pbkFwcHJvdmFsUmVtb3ZlT25lQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBZG1pbkFwcHJvdmFsQm91bmNlQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJBbm5vdW5jZW1lbnRzT25seUNoYW5nZVR5cGVcbiAgfCBHcm91cFYyQXZhdGFyQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJEZXNjcmlwdGlvbkNoYW5nZVR5cGVcbiAgfCBHcm91cFYyR3JvdXBMaW5rQWRkQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJHcm91cExpbmtSZW1vdmVDaGFuZ2VUeXBlXG4gIHwgR3JvdXBWMkdyb3VwTGlua1Jlc2V0Q2hhbmdlVHlwZVxuICB8IEdyb3VwVjJNZW1iZXJBZGRDaGFuZ2VUeXBlXG4gIHwgR3JvdXBWMk1lbWJlckFkZEZyb21BZG1pbkFwcHJvdmFsQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJNZW1iZXJBZGRGcm9tSW52aXRlQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJNZW1iZXJBZGRGcm9tTGlua0NoYW5nZVR5cGVcbiAgfCBHcm91cFYyTWVtYmVyUHJpdmlsZWdlQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJNZW1iZXJSZW1vdmVDaGFuZ2VUeXBlXG4gIHwgR3JvdXBWMlBlbmRpbmdBZGRNYW55Q2hhbmdlVHlwZVxuICB8IEdyb3VwVjJQZW5kaW5nQWRkT25lQ2hhbmdlVHlwZVxuICB8IEdyb3VwVjJQZW5kaW5nUmVtb3ZlTWFueUNoYW5nZVR5cGVcbiAgfCBHcm91cFYyUGVuZGluZ1JlbW92ZU9uZUNoYW5nZVR5cGVcbiAgfCBHcm91cFYyVGl0bGVDaGFuZ2VUeXBlO1xuXG5leHBvcnQgdHlwZSBHcm91cFYyQ2hhbmdlVHlwZSA9IHtcbiAgZnJvbT86IFVVSURTdHJpbmdUeXBlO1xuICBkZXRhaWxzOiBBcnJheTxHcm91cFYyQ2hhbmdlRGV0YWlsVHlwZT47XG59O1xuXG5leHBvcnQgdHlwZSBHcm91cEZpZWxkcyA9IHtcbiAgcmVhZG9ubHkgaWQ6IFVpbnQ4QXJyYXk7XG4gIHJlYWRvbmx5IHNlY3JldFBhcmFtczogVWludDhBcnJheTtcbiAgcmVhZG9ubHkgcHVibGljUGFyYW1zOiBVaW50OEFycmF5O1xufTtcblxuY29uc3QgTUFYX0NBQ0hFRF9HUk9VUF9GSUVMRFMgPSAxMDA7XG5cbmNvbnN0IGdyb3VwRmllbGRzQ2FjaGUgPSBuZXcgTFJVPHN0cmluZywgR3JvdXBGaWVsZHM+KHtcbiAgbWF4OiBNQVhfQ0FDSEVEX0dST1VQX0ZJRUxEUyxcbn0pO1xuXG5jb25zdCB7IHVwZGF0ZUNvbnZlcnNhdGlvbiB9ID0gZGF0YUludGVyZmFjZTtcblxuaWYgKCFpc051bWJlcihNQVhfTUVTU0FHRV9TQ0hFTUEpKSB7XG4gIHRocm93IG5ldyBFcnJvcihcbiAgICAnZ3JvdXBzLnRzOiBVbmFibGUgdG8gY2FwdHVyZSBtYXggbWVzc2FnZSBzY2hlbWEgZnJvbSBqcy9tb2R1bGVzL3R5cGVzL21lc3NhZ2UnXG4gICk7XG59XG5cbnR5cGUgTWVtYmVyVHlwZSA9IHtcbiAgcHJvZmlsZUtleTogc3RyaW5nO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn07XG50eXBlIFVwZGF0ZXNSZXN1bHRUeXBlID0ge1xuICAvLyBUaGUgYXJyYXkgb2YgbmV3IG1lc3NhZ2VzIHRvIGJlIGFkZGVkIGludG8gdGhlIG1lc3NhZ2UgdGltZWxpbmVcbiAgZ3JvdXBDaGFuZ2VNZXNzYWdlczogQXJyYXk8R3JvdXBDaGFuZ2VNZXNzYWdlVHlwZT47XG4gIC8vIFRoZSBzZXQgb2YgbWVtYmVycyBpbiB0aGUgZ3JvdXAsIGFuZCB3ZSBsYXJnZWx5IGp1c3QgcHVsbCBwcm9maWxlIGtleXMgZm9yIGVhY2gsXG4gIC8vICAgYmVjYXVzZSB0aGUgZ3JvdXAgbWVtYmVyc2hpcCBpcyB1cGRhdGVkIGluIG5ld0F0dHJpYnV0ZXNcbiAgbWVtYmVyczogQXJyYXk8TWVtYmVyVHlwZT47XG4gIC8vIFRvIGJlIG1lcmdlZCBpbnRvIHRoZSBjb252ZXJzYXRpb24gbW9kZWxcbiAgbmV3QXR0cmlidXRlczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG59O1xuXG50eXBlIFVwbG9hZGVkQXZhdGFyVHlwZSA9IHtcbiAgZGF0YTogVWludDhBcnJheTtcbiAgaGFzaDogc3RyaW5nO1xuICBrZXk6IHN0cmluZztcbn07XG5cbnR5cGUgQmFzaWNNZXNzYWdlVHlwZSA9IFBpY2s8XG4gIE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSxcbiAgJ2lkJyB8ICdzY2hlbWFWZXJzaW9uJyB8ICdyZWFkU3RhdHVzJyB8ICdzZWVuU3RhdHVzJ1xuPjtcblxudHlwZSBHcm91cFYyQ2hhbmdlTWVzc2FnZVR5cGUgPSB7XG4gIHR5cGU6ICdncm91cC12Mi1jaGFuZ2UnO1xufSAmIFBpY2s8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlLCAnZ3JvdXBWMkNoYW5nZScgfCAnc291cmNlVXVpZCc+O1xuXG50eXBlIEdyb3VwVjFNaWdyYXRpb25NZXNzYWdlVHlwZSA9IHtcbiAgdHlwZTogJ2dyb3VwLXYxLW1pZ3JhdGlvbic7XG59ICYgUGljazxcbiAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAnaW52aXRlZEdWMk1lbWJlcnMnIHwgJ2Ryb3BwZWRHVjJNZW1iZXJJZHMnIHwgJ2dyb3VwTWlncmF0aW9uJ1xuPjtcblxudHlwZSBUaW1lck5vdGlmaWNhdGlvbk1lc3NhZ2VUeXBlID0ge1xuICB0eXBlOiAndGltZXItbm90aWZpY2F0aW9uJztcbn0gJiBQaWNrPFxuICBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gICdzb3VyY2VVdWlkJyB8ICdmbGFncycgfCAnZXhwaXJhdGlvblRpbWVyVXBkYXRlJ1xuPjtcblxudHlwZSBHcm91cENoYW5nZU1lc3NhZ2VUeXBlID0gQmFzaWNNZXNzYWdlVHlwZSAmXG4gIChcbiAgICB8IEdyb3VwVjJDaGFuZ2VNZXNzYWdlVHlwZVxuICAgIHwgR3JvdXBWMU1pZ3JhdGlvbk1lc3NhZ2VUeXBlXG4gICAgfCBUaW1lck5vdGlmaWNhdGlvbk1lc3NhZ2VUeXBlXG4gICk7XG5cbi8vIENvbnN0YW50c1xuXG5leHBvcnQgY29uc3QgTUFTVEVSX0tFWV9MRU5HVEggPSAzMjtcbmNvbnN0IEdST1VQX1RJVExFX01BWF9FTkNSWVBURURfQllURVMgPSAxMDI0O1xuY29uc3QgR1JPVVBfREVTQ19NQVhfRU5DUllQVEVEX0JZVEVTID0gODE5MjtcbmV4cG9ydCBjb25zdCBJRF9WMV9MRU5HVEggPSAxNjtcbmV4cG9ydCBjb25zdCBJRF9MRU5HVEggPSAzMjtcbmNvbnN0IFRFTVBPUkFMX0FVVEhfUkVKRUNURURfQ09ERSA9IDQwMTtcbmNvbnN0IEdST1VQX0FDQ0VTU19ERU5JRURfQ09ERSA9IDQwMztcbmNvbnN0IEdST1VQX05PTkVYSVNURU5UX0NPREUgPSA0MDQ7XG5jb25zdCBTVVBQT1JURURfQ0hBTkdFX0VQT0NIID0gNDtcbmV4cG9ydCBjb25zdCBMSU5LX1ZFUlNJT05fRVJST1IgPSAnTElOS19WRVJTSU9OX0VSUk9SJztcbmNvbnN0IEdST1VQX0lOVklURV9MSU5LX1BBU1NXT1JEX0xFTkdUSCA9IDE2O1xuXG5mdW5jdGlvbiBnZW5lcmF0ZUJhc2ljTWVzc2FnZSgpOiBCYXNpY01lc3NhZ2VUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICBpZDogZ2V0R3VpZCgpLFxuICAgIHNjaGVtYVZlcnNpb246IE1BWF9NRVNTQUdFX1NDSEVNQSxcbiAgICAvLyB0aGlzIGlzIG1pc3NpbmcgbW9zdCBwcm9wZXJ0aWVzIHRvIGZ1bGZpbGwgdGhpcyB0eXBlXG4gIH07XG59XG5cbi8vIEdyb3VwIExpbmtzXG5cbmV4cG9ydCBmdW5jdGlvbiBnZW5lcmF0ZUdyb3VwSW52aXRlTGlua1Bhc3N3b3JkKCk6IFVpbnQ4QXJyYXkge1xuICByZXR1cm4gZ2V0UmFuZG9tQnl0ZXMoR1JPVVBfSU5WSVRFX0xJTktfUEFTU1dPUkRfTEVOR1RIKTtcbn1cblxuLy8gR3JvdXAgTGlua3NcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGdldFByZUpvaW5Hcm91cEluZm8oXG4gIGludml0ZUxpbmtQYXNzd29yZEJhc2U2NDogc3RyaW5nLFxuICBtYXN0ZXJLZXlCYXNlNjQ6IHN0cmluZ1xuKTogUHJvbWlzZTxQcm90by5Hcm91cEpvaW5JbmZvPiB7XG4gIGNvbnN0IGRhdGEgPSB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5kZXJpdmVHcm91cEZpZWxkcyhcbiAgICBCeXRlcy5mcm9tQmFzZTY0KG1hc3RlcktleUJhc2U2NClcbiAgKTtcblxuICByZXR1cm4gbWFrZVJlcXVlc3RXaXRoVGVtcG9yYWxSZXRyeSh7XG4gICAgbG9nSWQ6IGBnZXRQcmVKb2luSW5mby9ncm91cHYyKCR7ZGF0YS5pZH0pYCxcbiAgICBwdWJsaWNQYXJhbXM6IEJ5dGVzLnRvQmFzZTY0KGRhdGEucHVibGljUGFyYW1zKSxcbiAgICBzZWNyZXRQYXJhbXM6IEJ5dGVzLnRvQmFzZTY0KGRhdGEuc2VjcmV0UGFyYW1zKSxcbiAgICByZXF1ZXN0OiAoc2VuZGVyLCBvcHRpb25zKSA9PlxuICAgICAgc2VuZGVyLmdldEdyb3VwRnJvbUxpbmsoaW52aXRlTGlua1Bhc3N3b3JkQmFzZTY0LCBvcHRpb25zKSxcbiAgfSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEdyb3VwTGluayhjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsKTogc3RyaW5nIHtcbiAgY29uc3QgeyBtYXN0ZXJLZXksIGdyb3VwSW52aXRlTGlua1Bhc3N3b3JkIH0gPSBjb252ZXJzYXRpb24uYXR0cmlidXRlcztcblxuICBjb25zdCBieXRlcyA9IFByb3RvLkdyb3VwSW52aXRlTGluay5lbmNvZGUoe1xuICAgIHYxQ29udGVudHM6IHtcbiAgICAgIGdyb3VwTWFzdGVyS2V5OiBCeXRlcy5mcm9tQmFzZTY0KG1hc3RlcktleSksXG4gICAgICBpbnZpdGVMaW5rUGFzc3dvcmQ6IEJ5dGVzLmZyb21CYXNlNjQoZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQpLFxuICAgIH0sXG4gIH0pLmZpbmlzaCgpO1xuXG4gIGNvbnN0IGhhc2ggPSB0b1dlYlNhZmVCYXNlNjQoQnl0ZXMudG9CYXNlNjQoYnl0ZXMpKTtcblxuICByZXR1cm4gYGh0dHBzOi8vc2lnbmFsLmdyb3VwLyMke2hhc2h9YDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlR3JvdXBMaW5rKGhhc2g6IHN0cmluZyk6IHtcbiAgbWFzdGVyS2V5OiBzdHJpbmc7XG4gIGludml0ZUxpbmtQYXNzd29yZDogc3RyaW5nO1xufSB7XG4gIGNvbnN0IGJhc2U2NCA9IGZyb21XZWJTYWZlQmFzZTY0KGhhc2gpO1xuICBjb25zdCBidWZmZXIgPSBCeXRlcy5mcm9tQmFzZTY0KGJhc2U2NCk7XG5cbiAgY29uc3QgaW52aXRlTGlua1Byb3RvID0gUHJvdG8uR3JvdXBJbnZpdGVMaW5rLmRlY29kZShidWZmZXIpO1xuICBpZiAoXG4gICAgaW52aXRlTGlua1Byb3RvLmNvbnRlbnRzICE9PSAndjFDb250ZW50cycgfHxcbiAgICAhaW52aXRlTGlua1Byb3RvLnYxQ29udGVudHNcbiAgKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoXG4gICAgICAncGFyc2VHcm91cExpbms6IFBhcnNlZCBwcm90byBpcyBtaXNzaW5nIHYxQ29udGVudHMnXG4gICAgKTtcbiAgICBlcnJvci5uYW1lID0gTElOS19WRVJTSU9OX0VSUk9SO1xuICAgIHRocm93IGVycm9yO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGdyb3VwTWFzdGVyS2V5OiBncm91cE1hc3RlcktleVJhdyxcbiAgICBpbnZpdGVMaW5rUGFzc3dvcmQ6IGludml0ZUxpbmtQYXNzd29yZFJhdyxcbiAgfSA9IGludml0ZUxpbmtQcm90by52MUNvbnRlbnRzO1xuXG4gIGlmICghZ3JvdXBNYXN0ZXJLZXlSYXcgfHwgIWdyb3VwTWFzdGVyS2V5UmF3Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndjFDb250ZW50cy5ncm91cE1hc3RlcktleSBoYWQgbm8gZGF0YSEnKTtcbiAgfVxuICBpZiAoIWludml0ZUxpbmtQYXNzd29yZFJhdyB8fCAhaW52aXRlTGlua1Bhc3N3b3JkUmF3Lmxlbmd0aCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndjFDb250ZW50cy5pbnZpdGVMaW5rUGFzc3dvcmQgaGFkIG5vIGRhdGEhJyk7XG4gIH1cblxuICBjb25zdCBtYXN0ZXJLZXkgPSBCeXRlcy50b0Jhc2U2NChncm91cE1hc3RlcktleVJhdyk7XG4gIGlmIChtYXN0ZXJLZXkubGVuZ3RoICE9PSA0NCkge1xuICAgIHRocm93IG5ldyBFcnJvcihgbWFzdGVyS2V5IGhhZCB1bmV4cGVjdGVkIGxlbmd0aCAke21hc3RlcktleS5sZW5ndGh9YCk7XG4gIH1cbiAgY29uc3QgaW52aXRlTGlua1Bhc3N3b3JkID0gQnl0ZXMudG9CYXNlNjQoaW52aXRlTGlua1Bhc3N3b3JkUmF3KTtcbiAgaWYgKGludml0ZUxpbmtQYXNzd29yZC5sZW5ndGggPT09IDApIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgaW52aXRlTGlua1Bhc3N3b3JkIGhhZCB1bmV4cGVjdGVkIGxlbmd0aCAke2ludml0ZUxpbmtQYXNzd29yZC5sZW5ndGh9YFxuICAgICk7XG4gIH1cblxuICByZXR1cm4geyBtYXN0ZXJLZXksIGludml0ZUxpbmtQYXNzd29yZCB9O1xufVxuXG4vLyBHcm91cCBNb2RpZmljYXRpb25zXG5cbmFzeW5jIGZ1bmN0aW9uIHVwbG9hZEF2YXRhcihcbiAgb3B0aW9uczoge1xuICAgIGxvZ0lkOiBzdHJpbmc7XG4gICAgcHVibGljUGFyYW1zOiBzdHJpbmc7XG4gICAgc2VjcmV0UGFyYW1zOiBzdHJpbmc7XG4gIH0gJiAoeyBwYXRoOiBzdHJpbmcgfSB8IHsgZGF0YTogVWludDhBcnJheSB9KVxuKTogUHJvbWlzZTxVcGxvYWRlZEF2YXRhclR5cGU+IHtcbiAgY29uc3QgeyBsb2dJZCwgcHVibGljUGFyYW1zLCBzZWNyZXRQYXJhbXMgfSA9IG9wdGlvbnM7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihzZWNyZXRQYXJhbXMpO1xuXG4gICAgbGV0IGRhdGE6IFVpbnQ4QXJyYXk7XG4gICAgaWYgKCdkYXRhJyBpbiBvcHRpb25zKSB7XG4gICAgICAoeyBkYXRhIH0gPSBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZGF0YSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5yZWFkQXR0YWNobWVudERhdGEob3B0aW9ucy5wYXRoKTtcbiAgICB9XG5cbiAgICBjb25zdCBoYXNoID0gY29tcHV0ZUhhc2goZGF0YSk7XG5cbiAgICBjb25zdCBibG9iUGxhaW50ZXh0ID0gUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iLmVuY29kZSh7XG4gICAgICBhdmF0YXI6IGRhdGEsXG4gICAgfSkuZmluaXNoKCk7XG4gICAgY29uc3QgY2lwaGVydGV4dCA9IGVuY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgYmxvYlBsYWludGV4dCk7XG5cbiAgICBjb25zdCBrZXkgPSBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICAgIGxvZ0lkOiBgdXBsb2FkR3JvdXBBdmF0YXIvJHtsb2dJZH1gLFxuICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgcmVxdWVzdDogKHNlbmRlciwgcmVxdWVzdE9wdGlvbnMpID0+XG4gICAgICAgIHNlbmRlci51cGxvYWRHcm91cEF2YXRhcihjaXBoZXJ0ZXh0LCByZXF1ZXN0T3B0aW9ucyksXG4gICAgfSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgZGF0YSxcbiAgICAgIGhhc2gsXG4gICAgICBrZXksXG4gICAgfTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cud2FybihgdXBsb2FkQXZhdGFyLyR7bG9nSWR9IEZhaWxlZCB0byB1cGxvYWQgYXZhdGFyYCwgZXJyb3Iuc3RhY2spO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR3JvdXBUaXRsZUJ1ZmZlcihcbiAgY2xpZW50WmtHcm91cENpcGhlcjogQ2xpZW50WmtHcm91cENpcGhlcixcbiAgdGl0bGU6IHN0cmluZ1xuKTogVWludDhBcnJheSB7XG4gIGNvbnN0IHRpdGxlQmxvYlBsYWludGV4dCA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5lbmNvZGUoe1xuICAgIHRpdGxlLFxuICB9KS5maW5pc2goKTtcblxuICBjb25zdCByZXN1bHQgPSBlbmNyeXB0R3JvdXBCbG9iKGNsaWVudFprR3JvdXBDaXBoZXIsIHRpdGxlQmxvYlBsYWludGV4dCk7XG5cbiAgaWYgKHJlc3VsdC5ieXRlTGVuZ3RoID4gR1JPVVBfVElUTEVfTUFYX0VOQ1JZUFRFRF9CWVRFUykge1xuICAgIHRocm93IG5ldyBFcnJvcignYnVpbGRHcm91cFRpdGxlQnVmZmVyOiBlbmNyeXB0ZWQgZ3JvdXAgdGl0bGUgaXMgdG9vIGxvbmcnKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR3JvdXBEZXNjcmlwdGlvbkJ1ZmZlcihcbiAgY2xpZW50WmtHcm91cENpcGhlcjogQ2xpZW50WmtHcm91cENpcGhlcixcbiAgZGVzY3JpcHRpb246IHN0cmluZ1xuKTogVWludDhBcnJheSB7XG4gIGNvbnN0IGF0dHJzQmxvYlBsYWludGV4dCA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5lbmNvZGUoe1xuICAgIGRlc2NyaXB0aW9uVGV4dDogZGVzY3JpcHRpb24sXG4gIH0pLmZpbmlzaCgpO1xuXG4gIGNvbnN0IHJlc3VsdCA9IGVuY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgYXR0cnNCbG9iUGxhaW50ZXh0KTtcblxuICBpZiAocmVzdWx0LmJ5dGVMZW5ndGggPiBHUk9VUF9ERVNDX01BWF9FTkNSWVBURURfQllURVMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGRHcm91cERlc2NyaXB0aW9uQnVmZmVyOiBlbmNyeXB0ZWQgZ3JvdXAgdGl0bGUgaXMgdG9vIGxvbmcnXG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGJ1aWxkR3JvdXBQcm90byhcbiAgYXR0cmlidXRlczogUGljazxcbiAgICBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgICB8ICdhY2Nlc3NDb250cm9sJ1xuICAgIHwgJ2V4cGlyZVRpbWVyJ1xuICAgIHwgJ2lkJ1xuICAgIHwgJ21lbWJlcnNWMidcbiAgICB8ICduYW1lJ1xuICAgIHwgJ3BlbmRpbmdNZW1iZXJzVjInXG4gICAgfCAncHVibGljUGFyYW1zJ1xuICAgIHwgJ3JldmlzaW9uJ1xuICAgIHwgJ3NlY3JldFBhcmFtcydcbiAgPiAmIHtcbiAgICBhdmF0YXJVcmw/OiBzdHJpbmc7XG4gIH1cbik6IFByb3RvLkdyb3VwIHtcbiAgY29uc3QgTUVNQkVSX1JPTEVfRU5VTSA9IFByb3RvLk1lbWJlci5Sb2xlO1xuICBjb25zdCBBQ0NFU1NfRU5VTSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG4gIGNvbnN0IGxvZ0lkID0gYGdyb3VwdjIoJHthdHRyaWJ1dGVzLmlkfSlgO1xuXG4gIGNvbnN0IHsgcHVibGljUGFyYW1zLCBzZWNyZXRQYXJhbXMgfSA9IGF0dHJpYnV0ZXM7XG5cbiAgaWYgKCFwdWJsaWNQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgYnVpbGRHcm91cFByb3RvLyR7bG9nSWR9OiBhdHRyaWJ1dGVzIHdlcmUgbWlzc2luZyBwdWJsaWNQYXJhbXMhYFxuICAgICk7XG4gIH1cbiAgaWYgKCFzZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgYnVpbGRHcm91cFByb3RvLyR7bG9nSWR9OiBhdHRyaWJ1dGVzIHdlcmUgbWlzc2luZyBzZWNyZXRQYXJhbXMhYFxuICAgICk7XG4gIH1cblxuICBjb25zdCBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQgPSB3aW5kb3cuZ2V0U2VydmVyUHVibGljUGFyYW1zKCk7XG4gIGNvbnN0IGNsaWVudFprR3JvdXBDaXBoZXIgPSBnZXRDbGllbnRaa0dyb3VwQ2lwaGVyKHNlY3JldFBhcmFtcyk7XG4gIGNvbnN0IGNsaWVudFprUHJvZmlsZUNpcGhlciA9IGdldENsaWVudFprUHJvZmlsZU9wZXJhdGlvbnMoXG4gICAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0XG4gICk7XG4gIGNvbnN0IHByb3RvID0gbmV3IFByb3RvLkdyb3VwKCk7XG5cbiAgcHJvdG8ucHVibGljS2V5ID0gQnl0ZXMuZnJvbUJhc2U2NChwdWJsaWNQYXJhbXMpO1xuICBwcm90by52ZXJzaW9uID0gYXR0cmlidXRlcy5yZXZpc2lvbiB8fCAwO1xuXG4gIGlmIChhdHRyaWJ1dGVzLm5hbWUpIHtcbiAgICBwcm90by50aXRsZSA9IGJ1aWxkR3JvdXBUaXRsZUJ1ZmZlcihjbGllbnRaa0dyb3VwQ2lwaGVyLCBhdHRyaWJ1dGVzLm5hbWUpO1xuICB9XG5cbiAgaWYgKGF0dHJpYnV0ZXMuYXZhdGFyVXJsKSB7XG4gICAgcHJvdG8uYXZhdGFyID0gYXR0cmlidXRlcy5hdmF0YXJVcmw7XG4gIH1cblxuICBpZiAoYXR0cmlidXRlcy5leHBpcmVUaW1lcikge1xuICAgIGNvbnN0IHRpbWVyQmxvYlBsYWludGV4dCA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5lbmNvZGUoe1xuICAgICAgZGlzYXBwZWFyaW5nTWVzc2FnZXNEdXJhdGlvbjogYXR0cmlidXRlcy5leHBpcmVUaW1lcixcbiAgICB9KS5maW5pc2goKTtcbiAgICBwcm90by5kaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyID0gZW5jcnlwdEdyb3VwQmxvYihcbiAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICB0aW1lckJsb2JQbGFpbnRleHRcbiAgICApO1xuICB9XG5cbiAgY29uc3QgYWNjZXNzQ29udHJvbCA9IG5ldyBQcm90by5BY2Nlc3NDb250cm9sKCk7XG4gIGlmIChhdHRyaWJ1dGVzLmFjY2Vzc0NvbnRyb2wpIHtcbiAgICBhY2Nlc3NDb250cm9sLmF0dHJpYnV0ZXMgPVxuICAgICAgYXR0cmlidXRlcy5hY2Nlc3NDb250cm9sLmF0dHJpYnV0ZXMgfHwgQUNDRVNTX0VOVU0uTUVNQkVSO1xuICAgIGFjY2Vzc0NvbnRyb2wubWVtYmVycyA9XG4gICAgICBhdHRyaWJ1dGVzLmFjY2Vzc0NvbnRyb2wubWVtYmVycyB8fCBBQ0NFU1NfRU5VTS5NRU1CRVI7XG4gIH0gZWxzZSB7XG4gICAgYWNjZXNzQ29udHJvbC5hdHRyaWJ1dGVzID0gQUNDRVNTX0VOVU0uTUVNQkVSO1xuICAgIGFjY2Vzc0NvbnRyb2wubWVtYmVycyA9IEFDQ0VTU19FTlVNLk1FTUJFUjtcbiAgfVxuICBwcm90by5hY2Nlc3NDb250cm9sID0gYWNjZXNzQ29udHJvbDtcblxuICBwcm90by5tZW1iZXJzID0gKGF0dHJpYnV0ZXMubWVtYmVyc1YyIHx8IFtdKS5tYXAoaXRlbSA9PiB7XG4gICAgY29uc3QgbWVtYmVyID0gbmV3IFByb3RvLk1lbWJlcigpO1xuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGl0ZW0udXVpZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgYnVpbGRHcm91cFByb3RvLyR7bG9nSWR9OiBubyBjb252ZXJzYXRpb24gZm9yIG1lbWJlciFgKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJyk7XG4gICAgaWYgKCFwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgYnVpbGRHcm91cFByb3RvLyR7bG9nSWR9OiBtZW1iZXIgd2FzIG1pc3NpbmcgcHJvZmlsZUtleUNyZWRlbnRpYWwhYFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgcHJlc2VudGF0aW9uID0gY3JlYXRlUHJvZmlsZUtleUNyZWRlbnRpYWxQcmVzZW50YXRpb24oXG4gICAgICBjbGllbnRaa1Byb2ZpbGVDaXBoZXIsXG4gICAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgICAgIHNlY3JldFBhcmFtc1xuICAgICk7XG5cbiAgICBtZW1iZXIucm9sZSA9IGl0ZW0ucm9sZSB8fCBNRU1CRVJfUk9MRV9FTlVNLkRFRkFVTFQ7XG4gICAgbWVtYmVyLnByZXNlbnRhdGlvbiA9IHByZXNlbnRhdGlvbjtcblxuICAgIHJldHVybiBtZW1iZXI7XG4gIH0pO1xuXG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgY29uc3Qgb3VyVXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChcbiAgICBjbGllbnRaa0dyb3VwQ2lwaGVyLFxuICAgIG91clV1aWQudG9TdHJpbmcoKVxuICApO1xuXG4gIHByb3RvLm1lbWJlcnNQZW5kaW5nUHJvZmlsZUtleSA9IChhdHRyaWJ1dGVzLnBlbmRpbmdNZW1iZXJzVjIgfHwgW10pLm1hcChcbiAgICBpdGVtID0+IHtcbiAgICAgIGNvbnN0IHBlbmRpbmdNZW1iZXIgPSBuZXcgUHJvdG8uTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkoKTtcbiAgICAgIGNvbnN0IG1lbWJlciA9IG5ldyBQcm90by5NZW1iZXIoKTtcblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGl0ZW0udXVpZCk7XG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2J1aWxkR3JvdXBQcm90bzogbm8gY29udmVyc2F0aW9uIGZvciBwZW5kaW5nIG1lbWJlciEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXVpZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKTtcbiAgICAgIGlmICghdXVpZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2J1aWxkR3JvdXBQcm90bzogcGVuZGluZyBtZW1iZXIgd2FzIG1pc3NpbmcgdXVpZCEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcbiAgICAgIG1lbWJlci51c2VySWQgPSB1dWlkQ2lwaGVyVGV4dEJ1ZmZlcjtcbiAgICAgIG1lbWJlci5yb2xlID0gaXRlbS5yb2xlIHx8IE1FTUJFUl9ST0xFX0VOVU0uREVGQVVMVDtcblxuICAgICAgcGVuZGluZ01lbWJlci5tZW1iZXIgPSBtZW1iZXI7XG4gICAgICBwZW5kaW5nTWVtYmVyLnRpbWVzdGFtcCA9IExvbmcuZnJvbU51bWJlcihpdGVtLnRpbWVzdGFtcCk7XG4gICAgICBwZW5kaW5nTWVtYmVyLmFkZGVkQnlVc2VySWQgPSBvdXJVdWlkQ2lwaGVyVGV4dEJ1ZmZlcjtcblxuICAgICAgcmV0dXJuIHBlbmRpbmdNZW1iZXI7XG4gICAgfVxuICApO1xuXG4gIHJldHVybiBwcm90bztcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGJ1aWxkQWRkTWVtYmVyc0NoYW5nZShcbiAgY29udmVyc2F0aW9uOiBQaWNrPFxuICAgIENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICAgICdiYW5uZWRNZW1iZXJzVjInIHwgJ2lkJyB8ICdwdWJsaWNQYXJhbXMnIHwgJ3JldmlzaW9uJyB8ICdzZWNyZXRQYXJhbXMnXG4gID4sXG4gIGNvbnZlcnNhdGlvbklkczogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4pOiBQcm9taXNlPHVuZGVmaW5lZCB8IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnM+IHtcbiAgY29uc3QgTUVNQkVSX1JPTEVfRU5VTSA9IFByb3RvLk1lbWJlci5Sb2xlO1xuXG4gIGNvbnN0IHsgaWQsIHB1YmxpY1BhcmFtcywgcmV2aXNpb24sIHNlY3JldFBhcmFtcyB9ID0gY29udmVyc2F0aW9uO1xuXG4gIGNvbnN0IGxvZ0lkID0gYGdyb3VwdjIoJHtpZH0pYDtcblxuICBpZiAoIXB1YmxpY1BhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBidWlsZEFkZE1lbWJlcnNDaGFuZ2UvJHtsb2dJZH06IGF0dHJpYnV0ZXMgd2VyZSBtaXNzaW5nIHB1YmxpY1BhcmFtcyFgXG4gICAgKTtcbiAgfVxuICBpZiAoIXNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBidWlsZEFkZE1lbWJlcnNDaGFuZ2UvJHtsb2dJZH06IGF0dHJpYnV0ZXMgd2VyZSBtaXNzaW5nIHNlY3JldFBhcmFtcyFgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IG5ld0dyb3VwVmVyc2lvbiA9IChyZXZpc2lvbiB8fCAwKSArIDE7XG4gIGNvbnN0IHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NCA9IHdpbmRvdy5nZXRTZXJ2ZXJQdWJsaWNQYXJhbXMoKTtcbiAgY29uc3QgY2xpZW50WmtQcm9maWxlQ2lwaGVyID0gZ2V0Q2xpZW50WmtQcm9maWxlT3BlcmF0aW9ucyhcbiAgICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjRcbiAgKTtcbiAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoc2VjcmV0UGFyYW1zKTtcblxuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICBjb25zdCBvdXJVdWlkQ2lwaGVyVGV4dEJ1ZmZlciA9IGVuY3J5cHRVdWlkKFxuICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgb3VyVXVpZC50b1N0cmluZygpXG4gICk7XG5cbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICBjb25zdCBhZGRNZW1iZXJzOiBBcnJheTxQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkFkZE1lbWJlckFjdGlvbj4gPSBbXTtcbiAgY29uc3QgYWRkUGVuZGluZ01lbWJlcnM6IEFycmF5PFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXlBY3Rpb24+ID1cbiAgICBbXTtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgY29udmVyc2F0aW9uSWRzLm1hcChhc3luYyBjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICBjb25zdCBjb250YWN0ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICAgIGlmICghY29udGFjdCkge1xuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgYGJ1aWxkQWRkTWVtYmVyc0NoYW5nZS8ke2xvZ0lkfTogbWlzc2luZyBsb2NhbCBjb250YWN0LCBza2lwcGluZ2BcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1dWlkID0gY29udGFjdC5nZXQoJ3V1aWQnKTtcbiAgICAgIGlmICghdXVpZCkge1xuICAgICAgICBhc3NlcnQoZmFsc2UsIGBidWlsZEFkZE1lbWJlcnNDaGFuZ2UvJHtsb2dJZH06IG1pc3NpbmcgVVVJRDsgc2tpcHBpbmdgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWZyZXNoIG91ciBsb2NhbCBkYXRhIHRvIGJlIHN1cmVcbiAgICAgIGlmICghY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXknKSB8fCAhY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJykpIHtcbiAgICAgICAgYXdhaXQgY29udGFjdC5nZXRQcm9maWxlcygpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwcm9maWxlS2V5ID0gY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXknKTtcbiAgICAgIGNvbnN0IHByb2ZpbGVLZXlDcmVkZW50aWFsID0gY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJyk7XG5cbiAgICAgIGNvbnN0IG1lbWJlciA9IG5ldyBQcm90by5NZW1iZXIoKTtcbiAgICAgIG1lbWJlci51c2VySWQgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcbiAgICAgIG1lbWJlci5yb2xlID0gTUVNQkVSX1JPTEVfRU5VTS5ERUZBVUxUO1xuICAgICAgbWVtYmVyLmpvaW5lZEF0VmVyc2lvbiA9IG5ld0dyb3VwVmVyc2lvbjtcblxuICAgICAgLy8gVGhpcyBpcyBpbnNwaXJlZCBieSBbQW5kcm9pZCdzIGVxdWl2YWxlbnQgY29kZV1bMF0uXG4gICAgICAvL1xuICAgICAgLy8gWzBdOiBodHRwczovL2dpdGh1Yi5jb20vc2lnbmFsYXBwL1NpZ25hbC1BbmRyb2lkL2Jsb2IvMmJlMzA2ODY3NTM5YWIxNTI2ZjBlNDlkMWFhN2JkNjFlNzgzZDIzZi9saWJzaWduYWwvc2VydmljZS9zcmMvbWFpbi9qYXZhL29yZy93aGlzcGVyc3lzdGVtcy9zaWduYWxzZXJ2aWNlL2FwaS9ncm91cHN2Mi9Hcm91cHNWMk9wZXJhdGlvbnMuamF2YSNMMTUyLUwxNzRcbiAgICAgIGlmIChwcm9maWxlS2V5ICYmIHByb2ZpbGVLZXlDcmVkZW50aWFsKSB7XG4gICAgICAgIG1lbWJlci5wcmVzZW50YXRpb24gPSBjcmVhdGVQcm9maWxlS2V5Q3JlZGVudGlhbFByZXNlbnRhdGlvbihcbiAgICAgICAgICBjbGllbnRaa1Byb2ZpbGVDaXBoZXIsXG4gICAgICAgICAgcHJvZmlsZUtleUNyZWRlbnRpYWwsXG4gICAgICAgICAgc2VjcmV0UGFyYW1zXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgYWRkTWVtYmVyQWN0aW9uID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyQWN0aW9uKCk7XG4gICAgICAgIGFkZE1lbWJlckFjdGlvbi5hZGRlZCA9IG1lbWJlcjtcbiAgICAgICAgYWRkTWVtYmVyQWN0aW9uLmpvaW5Gcm9tSW52aXRlTGluayA9IGZhbHNlO1xuXG4gICAgICAgIGFkZE1lbWJlcnMucHVzaChhZGRNZW1iZXJBY3Rpb24pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgbWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkgPSBuZXcgUHJvdG8uTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkoKTtcbiAgICAgICAgbWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkubWVtYmVyID0gbWVtYmVyO1xuICAgICAgICBtZW1iZXJQZW5kaW5nUHJvZmlsZUtleS5hZGRlZEJ5VXNlcklkID0gb3VyVXVpZENpcGhlclRleHRCdWZmZXI7XG4gICAgICAgIG1lbWJlclBlbmRpbmdQcm9maWxlS2V5LnRpbWVzdGFtcCA9IExvbmcuZnJvbU51bWJlcihub3cpO1xuXG4gICAgICAgIGNvbnN0IGFkZFBlbmRpbmdNZW1iZXJBY3Rpb24gPVxuICAgICAgICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkFkZE1lbWJlclBlbmRpbmdQcm9maWxlS2V5QWN0aW9uKCk7XG4gICAgICAgIGFkZFBlbmRpbmdNZW1iZXJBY3Rpb24uYWRkZWQgPSBtZW1iZXJQZW5kaW5nUHJvZmlsZUtleTtcblxuICAgICAgICBhZGRQZW5kaW5nTWVtYmVycy5wdXNoKGFkZFBlbmRpbmdNZW1iZXJBY3Rpb24pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBkb2VzTWVtYmVyTmVlZFVuYmFuID0gY29udmVyc2F0aW9uLmJhbm5lZE1lbWJlcnNWMj8uZmluZChcbiAgICAgICAgYmFubmVkTWVtYmVyID0+IGJhbm5lZE1lbWJlci51dWlkID09PSB1dWlkXG4gICAgICApO1xuICAgICAgaWYgKGRvZXNNZW1iZXJOZWVkVW5iYW4pIHtcbiAgICAgICAgY29uc3QgdXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcblxuICAgICAgICBjb25zdCBkZWxldGVNZW1iZXJCYW5uZWRBY3Rpb24gPVxuICAgICAgICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbigpO1xuXG4gICAgICAgIGRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbi5kZWxldGVkVXNlcklkID0gdXVpZENpcGhlclRleHRCdWZmZXI7XG5cbiAgICAgICAgYWN0aW9ucy5kZWxldGVNZW1iZXJzQmFubmVkID0gYWN0aW9ucy5kZWxldGVNZW1iZXJzQmFubmVkIHx8IFtdO1xuICAgICAgICBhY3Rpb25zLmRlbGV0ZU1lbWJlcnNCYW5uZWQucHVzaChkZWxldGVNZW1iZXJCYW5uZWRBY3Rpb24pO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG5cbiAgaWYgKCFhZGRNZW1iZXJzLmxlbmd0aCAmJiAhYWRkUGVuZGluZ01lbWJlcnMubGVuZ3RoKSB7XG4gICAgLy8gVGhpcyBzaG91bGRuJ3QgaGFwcGVuLiBXaGVuIHRoZXNlIGFjdGlvbnMgYXJlIHBhc3NlZCB0byBgbW9kaWZ5R3JvdXBWMmAsIGEgd2FybmluZ1xuICAgIC8vICAgd2lsbCBiZSBsb2dnZWQuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBpZiAoYWRkTWVtYmVycy5sZW5ndGgpIHtcbiAgICBhY3Rpb25zLmFkZE1lbWJlcnMgPSBhZGRNZW1iZXJzO1xuICB9XG4gIGlmIChhZGRQZW5kaW5nTWVtYmVycy5sZW5ndGgpIHtcbiAgICBhY3Rpb25zLmFkZFBlbmRpbmdNZW1iZXJzID0gYWRkUGVuZGluZ01lbWJlcnM7XG4gIH1cbiAgYWN0aW9ucy52ZXJzaW9uID0gbmV3R3JvdXBWZXJzaW9uO1xuXG4gIHJldHVybiBhY3Rpb25zO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYnVpbGRVcGRhdGVBdHRyaWJ1dGVzQ2hhbmdlKFxuICBjb252ZXJzYXRpb246IFBpY2s8XG4gICAgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gICAgJ2lkJyB8ICdyZXZpc2lvbicgfCAncHVibGljUGFyYW1zJyB8ICdzZWNyZXRQYXJhbXMnXG4gID4sXG4gIGF0dHJpYnV0ZXM6IFJlYWRvbmx5PHtcbiAgICBhdmF0YXI/OiB1bmRlZmluZWQgfCBVaW50OEFycmF5O1xuICAgIGRlc2NyaXB0aW9uPzogc3RyaW5nO1xuICAgIHRpdGxlPzogc3RyaW5nO1xuICB9PlxuKTogUHJvbWlzZTx1bmRlZmluZWQgfCBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zPiB7XG4gIGNvbnN0IHsgcHVibGljUGFyYW1zLCBzZWNyZXRQYXJhbXMsIHJldmlzaW9uLCBpZCB9ID0gY29udmVyc2F0aW9uO1xuXG4gIGNvbnN0IGxvZ0lkID0gYGdyb3VwdjIoJHtpZH0pYDtcblxuICBpZiAoIXB1YmxpY1BhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBidWlsZFVwZGF0ZUF0dHJpYnV0ZXNDaGFuZ2UvJHtsb2dJZH06IGF0dHJpYnV0ZXMgd2VyZSBtaXNzaW5nIHB1YmxpY1BhcmFtcyFgXG4gICAgKTtcbiAgfVxuICBpZiAoIXNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBidWlsZFVwZGF0ZUF0dHJpYnV0ZXNDaGFuZ2UvJHtsb2dJZH06IGF0dHJpYnV0ZXMgd2VyZSBtaXNzaW5nIHNlY3JldFBhcmFtcyFgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuXG4gIGxldCBoYXNDaGFuZ2VkU29tZXRoaW5nID0gZmFsc2U7XG5cbiAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoc2VjcmV0UGFyYW1zKTtcblxuICAvLyBUaGVyZSBhcmUgdGhyZWUgcG9zc2libGUgc3RhdGVzIGhlcmU6XG4gIC8vXG4gIC8vIDEuICdhdmF0YXInIG5vdCBpbiBhdHRyaWJ1dGVzOiB3ZSBkb24ndCB3YW50IHRvIGNoYW5nZSB0aGUgYXZhdGFyLlxuICAvLyAyLiBhdHRyaWJ1dGVzLmF2YXRhciA9PT0gdW5kZWZpbmVkOiB3ZSB3YW50IHRvIGNsZWFyIHRoZSBhdmF0YXIuXG4gIC8vIDMuIGF0dHJpYnV0ZXMuYXZhdGFyICE9PSB1bmRlZmluZWQ6IHdlIHdhbnQgdG8gdXBkYXRlIHRoZSBhdmF0YXIuXG4gIGlmICgnYXZhdGFyJyBpbiBhdHRyaWJ1dGVzKSB7XG4gICAgaGFzQ2hhbmdlZFNvbWV0aGluZyA9IHRydWU7XG5cbiAgICBhY3Rpb25zLm1vZGlmeUF2YXRhciA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUF2YXRhckFjdGlvbigpO1xuICAgIGNvbnN0IHsgYXZhdGFyIH0gPSBhdHRyaWJ1dGVzO1xuICAgIGlmIChhdmF0YXIpIHtcbiAgICAgIGNvbnN0IHVwbG9hZGVkQXZhdGFyID0gYXdhaXQgdXBsb2FkQXZhdGFyKHtcbiAgICAgICAgZGF0YTogYXZhdGFyLFxuICAgICAgICBsb2dJZCxcbiAgICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgICBzZWNyZXRQYXJhbXMsXG4gICAgICB9KTtcbiAgICAgIGFjdGlvbnMubW9kaWZ5QXZhdGFyLmF2YXRhciA9IHVwbG9hZGVkQXZhdGFyLmtleTtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBkb24ndCBzZXQgYGFjdGlvbnMubW9kaWZ5QXZhdGFyLmF2YXRhcmAsIGl0IHdpbGwgYmUgY2xlYXJlZC5cbiAgfVxuXG4gIGNvbnN0IHsgdGl0bGUgfSA9IGF0dHJpYnV0ZXM7XG4gIGlmICh0aXRsZSkge1xuICAgIGhhc0NoYW5nZWRTb21ldGhpbmcgPSB0cnVlO1xuXG4gICAgYWN0aW9ucy5tb2RpZnlUaXRsZSA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeVRpdGxlQWN0aW9uKCk7XG4gICAgYWN0aW9ucy5tb2RpZnlUaXRsZS50aXRsZSA9IGJ1aWxkR3JvdXBUaXRsZUJ1ZmZlcihcbiAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICB0aXRsZVxuICAgICk7XG4gIH1cblxuICBjb25zdCB7IGRlc2NyaXB0aW9uIH0gPSBhdHRyaWJ1dGVzO1xuICBpZiAodHlwZW9mIGRlc2NyaXB0aW9uID09PSAnc3RyaW5nJykge1xuICAgIGhhc0NoYW5nZWRTb21ldGhpbmcgPSB0cnVlO1xuXG4gICAgYWN0aW9ucy5tb2RpZnlEZXNjcmlwdGlvbiA9XG4gICAgICBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlEZXNjcmlwdGlvbkFjdGlvbigpO1xuICAgIGFjdGlvbnMubW9kaWZ5RGVzY3JpcHRpb24uZGVzY3JpcHRpb25CeXRlcyA9IGJ1aWxkR3JvdXBEZXNjcmlwdGlvbkJ1ZmZlcihcbiAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICBkZXNjcmlwdGlvblxuICAgICk7XG4gIH1cblxuICBpZiAoIWhhc0NoYW5nZWRTb21ldGhpbmcpIHtcbiAgICAvLyBUaGlzIHNob3VsZG4ndCBoYXBwZW4uIFdoZW4gdGhlc2UgYWN0aW9ucyBhcmUgcGFzc2VkIHRvIGBtb2RpZnlHcm91cFYyYCwgYSB3YXJuaW5nXG4gICAgLy8gICB3aWxsIGJlIGxvZ2dlZC5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgYWN0aW9ucy52ZXJzaW9uID0gKHJldmlzaW9uIHx8IDApICsgMTtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lckNoYW5nZSh7XG4gIGV4cGlyZVRpbWVyLFxuICBncm91cCxcbn06IHtcbiAgZXhwaXJlVGltZXI6IG51bWJlcjtcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlO1xufSk6IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMge1xuICBjb25zdCBhY3Rpb25zID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMoKTtcblxuICBjb25zdCBibG9iID0gbmV3IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYigpO1xuICBibG9iLmRpc2FwcGVhcmluZ01lc3NhZ2VzRHVyYXRpb24gPSBleHBpcmVUaW1lcjtcblxuICBpZiAoIWdyb3VwLnNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdidWlsZERpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXJDaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnXG4gICAgKTtcbiAgfVxuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihncm91cC5zZWNyZXRQYXJhbXMpO1xuXG4gIGNvbnN0IGJsb2JQbGFpbnRleHQgPSBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2IuZW5jb2RlKGJsb2IpLmZpbmlzaCgpO1xuICBjb25zdCBibG9iQ2lwaGVyVGV4dCA9IGVuY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgYmxvYlBsYWludGV4dCk7XG5cbiAgY29uc3QgdGltZXJBY3Rpb24gPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeURpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXJBY3Rpb24oKTtcbiAgdGltZXJBY3Rpb24udGltZXIgPSBibG9iQ2lwaGVyVGV4dDtcblxuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLm1vZGlmeURpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIgPSB0aW1lckFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkSW52aXRlTGlua1Bhc3N3b3JkQ2hhbmdlKFxuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIGludml0ZUxpbmtQYXNzd29yZDogc3RyaW5nXG4pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgaW52aXRlTGlua1Bhc3N3b3JkQWN0aW9uID1cbiAgICBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlJbnZpdGVMaW5rUGFzc3dvcmRBY3Rpb24oKTtcbiAgaW52aXRlTGlua1Bhc3N3b3JkQWN0aW9uLmludml0ZUxpbmtQYXNzd29yZCA9XG4gICAgQnl0ZXMuZnJvbUJhc2U2NChpbnZpdGVMaW5rUGFzc3dvcmQpO1xuXG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLm1vZGlmeUludml0ZUxpbmtQYXNzd29yZCA9IGludml0ZUxpbmtQYXNzd29yZEFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkTmV3R3JvdXBMaW5rQ2hhbmdlKFxuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIGludml0ZUxpbmtQYXNzd29yZDogc3RyaW5nLFxuICBhZGRGcm9tSW52aXRlTGlua0FjY2VzczogQWNjZXNzUmVxdWlyZWRFbnVtXG4pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWNjZXNzQ29udHJvbEFjdGlvbiA9XG4gICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3NDb250cm9sQWN0aW9uKCk7XG4gIGFjY2Vzc0NvbnRyb2xBY3Rpb24uYWRkRnJvbUludml0ZUxpbmtBY2Nlc3MgPSBhZGRGcm9tSW52aXRlTGlua0FjY2VzcztcblxuICBjb25zdCBpbnZpdGVMaW5rUGFzc3dvcmRBY3Rpb24gPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUludml0ZUxpbmtQYXNzd29yZEFjdGlvbigpO1xuICBpbnZpdGVMaW5rUGFzc3dvcmRBY3Rpb24uaW52aXRlTGlua1Bhc3N3b3JkID1cbiAgICBCeXRlcy5mcm9tQmFzZTY0KGludml0ZUxpbmtQYXNzd29yZCk7XG5cbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMubW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3MgPSBhY2Nlc3NDb250cm9sQWN0aW9uO1xuICBhY3Rpb25zLm1vZGlmeUludml0ZUxpbmtQYXNzd29yZCA9IGludml0ZUxpbmtQYXNzd29yZEFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWNjZXNzQ29udHJvbEFkZEZyb21JbnZpdGVMaW5rQ2hhbmdlKFxuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIHZhbHVlOiBBY2Nlc3NSZXF1aXJlZEVudW1cbik6IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMge1xuICBjb25zdCBhY2Nlc3NDb250cm9sQWN0aW9uID1cbiAgICBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlBZGRGcm9tSW52aXRlTGlua0FjY2Vzc0NvbnRyb2xBY3Rpb24oKTtcbiAgYWNjZXNzQ29udHJvbEFjdGlvbi5hZGRGcm9tSW52aXRlTGlua0FjY2VzcyA9IHZhbHVlO1xuXG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLm1vZGlmeUFkZEZyb21JbnZpdGVMaW5rQWNjZXNzID0gYWNjZXNzQ29udHJvbEFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQW5ub3VuY2VtZW50c09ubHlDaGFuZ2UoXG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgdmFsdWU6IGJvb2xlYW5cbik6IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMge1xuICBjb25zdCBhY3Rpb24gPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlBbm5vdW5jZW1lbnRzT25seUFjdGlvbigpO1xuICBhY3Rpb24uYW5ub3VuY2VtZW50c09ubHkgPSB2YWx1ZTtcblxuICBjb25zdCBhY3Rpb25zID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMoKTtcbiAgYWN0aW9ucy52ZXJzaW9uID0gKGdyb3VwLnJldmlzaW9uIHx8IDApICsgMTtcbiAgYWN0aW9ucy5tb2RpZnlBbm5vdW5jZW1lbnRzT25seSA9IGFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWNjZXNzQ29udHJvbEF0dHJpYnV0ZXNDaGFuZ2UoXG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSxcbiAgdmFsdWU6IEFjY2Vzc1JlcXVpcmVkRW51bVxuKTogUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB7XG4gIGNvbnN0IGFjY2Vzc0NvbnRyb2xBY3Rpb24gPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUF0dHJpYnV0ZXNBY2Nlc3NDb250cm9sQWN0aW9uKCk7XG4gIGFjY2Vzc0NvbnRyb2xBY3Rpb24uYXR0cmlidXRlc0FjY2VzcyA9IHZhbHVlO1xuXG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLm1vZGlmeUF0dHJpYnV0ZXNBY2Nlc3MgPSBhY2Nlc3NDb250cm9sQWN0aW9uO1xuXG4gIHJldHVybiBhY3Rpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBY2Nlc3NDb250cm9sTWVtYmVyc0NoYW5nZShcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICB2YWx1ZTogQWNjZXNzUmVxdWlyZWRFbnVtXG4pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWNjZXNzQ29udHJvbEFjdGlvbiA9XG4gICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5TWVtYmVyc0FjY2Vzc0NvbnRyb2xBY3Rpb24oKTtcbiAgYWNjZXNzQ29udHJvbEFjdGlvbi5tZW1iZXJzQWNjZXNzID0gdmFsdWU7XG5cbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMubW9kaWZ5TWVtYmVyQWNjZXNzID0gYWNjZXNzQ29udHJvbEFjdGlvbjtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9tYXliZUJ1aWxkQWRkQmFubmVkTWVtYmVyQWN0aW9ucyh7XG4gIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gIGdyb3VwLFxuICBvdXJVdWlkLFxuICB1dWlkLFxufToge1xuICBjbGllbnRaa0dyb3VwQ2lwaGVyOiBDbGllbnRaa0dyb3VwQ2lwaGVyO1xuICBncm91cDogUGljazxDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZSwgJ2Jhbm5lZE1lbWJlcnNWMic+O1xuICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59KTogUGljazxcbiAgUHJvdG8uR3JvdXBDaGFuZ2UuSUFjdGlvbnMsXG4gICdhZGRNZW1iZXJzQmFubmVkJyB8ICdkZWxldGVNZW1iZXJzQmFubmVkJ1xuPiB7XG4gIGNvbnN0IGRvZXNNZW1iZXJOZWVkQmFuID1cbiAgICAhZ3JvdXAuYmFubmVkTWVtYmVyc1YyPy5maW5kKG1lbWJlciA9PiBtZW1iZXIudXVpZCA9PT0gdXVpZCkgJiZcbiAgICB1dWlkICE9PSBvdXJVdWlkO1xuICBpZiAoIWRvZXNNZW1iZXJOZWVkQmFuKSB7XG4gICAgcmV0dXJuIHt9O1xuICB9XG4gIC8vIFNvcnQgY3VycmVudCBiYW5uZWQgbWVtYmVycyBieSBkZWNyZWFzaW5nIHRpbWVzdGFtcFxuICBjb25zdCBzb3J0ZWRCYW5uZWRNZW1iZXJzID0gWy4uLihncm91cC5iYW5uZWRNZW1iZXJzVjIgPz8gW10pXS5zb3J0KFxuICAgIChhLCBiKSA9PiB7XG4gICAgICByZXR1cm4gYi50aW1lc3RhbXAgLSBhLnRpbWVzdGFtcDtcbiAgICB9XG4gICk7XG5cbiAgLy8gQWxsIG1lbWJlcnMgYWZ0ZXIgdGhlIGxpbWl0IGhhdmUgdG8gYmUgZGVsZXRlZCBhbmQgYXJlIG9sZGVyIHRoYW4gdGhlXG4gIC8vIHJlc3Qgb2YgdGhlIGxpc3QuXG4gIGNvbnN0IGRlbGV0ZWRCYW5uZWRNZW1iZXJzID0gc29ydGVkQmFubmVkTWVtYmVycy5zbGljZShcbiAgICBNYXRoLm1heCgwLCBnZXRHcm91cFNpemVIYXJkTGltaXQoKSAtIDEpXG4gICk7XG5cbiAgbGV0IGRlbGV0ZU1lbWJlcnNCYW5uZWQgPSBudWxsO1xuICBpZiAoZGVsZXRlZEJhbm5lZE1lbWJlcnMubGVuZ3RoID4gMCkge1xuICAgIGRlbGV0ZU1lbWJlcnNCYW5uZWQgPSBkZWxldGVkQmFubmVkTWVtYmVycy5tYXAoYmFubmVkTWVtYmVyID0+IHtcbiAgICAgIGNvbnN0IGRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbiA9XG4gICAgICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbigpO1xuXG4gICAgICBkZWxldGVNZW1iZXJCYW5uZWRBY3Rpb24uZGVsZXRlZFVzZXJJZCA9IGVuY3J5cHRVdWlkKFxuICAgICAgICBjbGllbnRaa0dyb3VwQ2lwaGVyLFxuICAgICAgICBiYW5uZWRNZW1iZXIudXVpZFxuICAgICAgKTtcblxuICAgICAgcmV0dXJuIGRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbjtcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IGFkZE1lbWJlckJhbm5lZEFjdGlvbiA9XG4gICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyQmFubmVkQWN0aW9uKCk7XG5cbiAgY29uc3QgdXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcbiAgYWRkTWVtYmVyQmFubmVkQWN0aW9uLmFkZGVkID0gbmV3IFByb3RvLk1lbWJlckJhbm5lZCgpO1xuICBhZGRNZW1iZXJCYW5uZWRBY3Rpb24uYWRkZWQudXNlcklkID0gdXVpZENpcGhlclRleHRCdWZmZXI7XG5cbiAgcmV0dXJuIHtcbiAgICBhZGRNZW1iZXJzQmFubmVkOiBbYWRkTWVtYmVyQmFubmVkQWN0aW9uXSxcbiAgICBkZWxldGVNZW1iZXJzQmFubmVkLFxuICB9O1xufVxuXG4vLyBUT0RPIEFORC0xMTAxXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREZWxldGVQZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlckNoYW5nZSh7XG4gIGdyb3VwLFxuICBvdXJVdWlkLFxuICB1dWlkLFxufToge1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIG91clV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn0pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGREZWxldGVQZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlckNoYW5nZTogZ3JvdXAgd2FzIG1pc3Npbmcgc2VjcmV0UGFyYW1zISdcbiAgICApO1xuICB9XG4gIGNvbnN0IGNsaWVudFprR3JvdXBDaXBoZXIgPSBnZXRDbGllbnRaa0dyb3VwQ2lwaGVyKGdyb3VwLnNlY3JldFBhcmFtcyk7XG4gIGNvbnN0IHV1aWRDaXBoZXJUZXh0QnVmZmVyID0gZW5jcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgdXVpZCk7XG5cbiAgY29uc3QgZGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWwgPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uKCk7XG4gIGRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsLmRlbGV0ZWRVc2VySWQgPSB1dWlkQ2lwaGVyVGV4dEJ1ZmZlcjtcblxuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLmRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyA9IFtcbiAgICBkZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbCxcbiAgXTtcblxuICBjb25zdCB7IGFkZE1lbWJlcnNCYW5uZWQsIGRlbGV0ZU1lbWJlcnNCYW5uZWQgfSA9XG4gICAgX21heWJlQnVpbGRBZGRCYW5uZWRNZW1iZXJBY3Rpb25zKHtcbiAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICBncm91cCxcbiAgICAgIG91clV1aWQsXG4gICAgICB1dWlkLFxuICAgIH0pO1xuXG4gIGlmIChhZGRNZW1iZXJzQmFubmVkKSB7XG4gICAgYWN0aW9ucy5hZGRNZW1iZXJzQmFubmVkID0gYWRkTWVtYmVyc0Jhbm5lZDtcbiAgfVxuICBpZiAoZGVsZXRlTWVtYmVyc0Jhbm5lZCkge1xuICAgIGFjdGlvbnMuZGVsZXRlTWVtYmVyc0Jhbm5lZCA9IGRlbGV0ZU1lbWJlcnNCYW5uZWQ7XG4gIH1cblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkQWRkUGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJDaGFuZ2Uoe1xuICBncm91cCxcbiAgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQsXG4gIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NCxcbn06IHtcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlO1xuICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NDogc3RyaW5nO1xuICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQ6IHN0cmluZztcbn0pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGRBZGRQZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlckNoYW5nZTogZ3JvdXAgd2FzIG1pc3Npbmcgc2VjcmV0UGFyYW1zISdcbiAgICApO1xuICB9XG4gIGNvbnN0IGNsaWVudFprUHJvZmlsZUNpcGhlciA9IGdldENsaWVudFprUHJvZmlsZU9wZXJhdGlvbnMoXG4gICAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0XG4gICk7XG5cbiAgY29uc3QgYWRkTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWwgPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uKCk7XG4gIGNvbnN0IHByZXNlbnRhdGlvbiA9IGNyZWF0ZVByb2ZpbGVLZXlDcmVkZW50aWFsUHJlc2VudGF0aW9uKFxuICAgIGNsaWVudFprUHJvZmlsZUNpcGhlcixcbiAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgICBncm91cC5zZWNyZXRQYXJhbXNcbiAgKTtcblxuICBjb25zdCBhZGRlZCA9IG5ldyBQcm90by5NZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbCgpO1xuICBhZGRlZC5wcmVzZW50YXRpb24gPSBwcmVzZW50YXRpb247XG5cbiAgYWRkTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWwuYWRkZWQgPSBhZGRlZDtcblxuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLmFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyA9IFthZGRNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbF07XG5cbiAgcmV0dXJuIGFjdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZEFkZE1lbWJlcih7XG4gIGdyb3VwLFxuICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0LFxuICB1dWlkLFxufToge1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIHByb2ZpbGVLZXlDcmVkZW50aWFsQmFzZTY0OiBzdHJpbmc7XG4gIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NDogc3RyaW5nO1xuICBqb2luRnJvbUludml0ZUxpbms/OiBib29sZWFuO1xuICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbn0pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgTUVNQkVSX1JPTEVfRU5VTSA9IFByb3RvLk1lbWJlci5Sb2xlO1xuXG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuXG4gIGlmICghZ3JvdXAuc2VjcmV0UGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdidWlsZEFkZE1lbWJlcjogZ3JvdXAgd2FzIG1pc3Npbmcgc2VjcmV0UGFyYW1zIScpO1xuICB9XG4gIGNvbnN0IGNsaWVudFprUHJvZmlsZUNpcGhlciA9IGdldENsaWVudFprUHJvZmlsZU9wZXJhdGlvbnMoXG4gICAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0XG4gICk7XG5cbiAgY29uc3QgYWRkTWVtYmVyID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyQWN0aW9uKCk7XG4gIGNvbnN0IHByZXNlbnRhdGlvbiA9IGNyZWF0ZVByb2ZpbGVLZXlDcmVkZW50aWFsUHJlc2VudGF0aW9uKFxuICAgIGNsaWVudFprUHJvZmlsZUNpcGhlcixcbiAgICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NCxcbiAgICBncm91cC5zZWNyZXRQYXJhbXNcbiAgKTtcblxuICBjb25zdCBhZGRlZCA9IG5ldyBQcm90by5NZW1iZXIoKTtcbiAgYWRkZWQucHJlc2VudGF0aW9uID0gcHJlc2VudGF0aW9uO1xuICBhZGRlZC5yb2xlID0gTUVNQkVSX1JPTEVfRU5VTS5ERUZBVUxUO1xuXG4gIGFkZE1lbWJlci5hZGRlZCA9IGFkZGVkO1xuXG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMuYWRkTWVtYmVycyA9IFthZGRNZW1iZXJdO1xuXG4gIGNvbnN0IGRvZXNNZW1iZXJOZWVkVW5iYW4gPSBncm91cC5iYW5uZWRNZW1iZXJzVjI/LmZpbmQoXG4gICAgbWVtYmVyID0+IG1lbWJlci51dWlkID09PSB1dWlkXG4gICk7XG4gIGlmIChkb2VzTWVtYmVyTmVlZFVuYmFuKSB7XG4gICAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoZ3JvdXAuc2VjcmV0UGFyYW1zKTtcbiAgICBjb25zdCB1dWlkQ2lwaGVyVGV4dEJ1ZmZlciA9IGVuY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIHV1aWQpO1xuXG4gICAgY29uc3QgZGVsZXRlTWVtYmVyQmFubmVkQWN0aW9uID1cbiAgICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckJhbm5lZEFjdGlvbigpO1xuXG4gICAgZGVsZXRlTWVtYmVyQmFubmVkQWN0aW9uLmRlbGV0ZWRVc2VySWQgPSB1dWlkQ2lwaGVyVGV4dEJ1ZmZlcjtcbiAgICBhY3Rpb25zLmRlbGV0ZU1lbWJlcnNCYW5uZWQgPSBbZGVsZXRlTWVtYmVyQmFubmVkQWN0aW9uXTtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGREZWxldGVQZW5kaW5nTWVtYmVyQ2hhbmdlKHtcbiAgdXVpZHMsXG4gIGdyb3VwLFxufToge1xuICB1dWlkczogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG59KTogUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB7XG4gIGNvbnN0IGFjdGlvbnMgPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucygpO1xuXG4gIGlmICghZ3JvdXAuc2VjcmV0UGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2J1aWxkRGVsZXRlUGVuZGluZ01lbWJlckNoYW5nZTogZ3JvdXAgd2FzIG1pc3Npbmcgc2VjcmV0UGFyYW1zISdcbiAgICApO1xuICB9XG4gIGNvbnN0IGNsaWVudFprR3JvdXBDaXBoZXIgPSBnZXRDbGllbnRaa0dyb3VwQ2lwaGVyKGdyb3VwLnNlY3JldFBhcmFtcyk7XG5cbiAgY29uc3QgZGVsZXRlUGVuZGluZ01lbWJlcnMgPSB1dWlkcy5tYXAodXVpZCA9PiB7XG4gICAgY29uc3QgdXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcbiAgICBjb25zdCBkZWxldGVQZW5kaW5nTWVtYmVyID1cbiAgICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlclBlbmRpbmdQcm9maWxlS2V5QWN0aW9uKCk7XG4gICAgZGVsZXRlUGVuZGluZ01lbWJlci5kZWxldGVkVXNlcklkID0gdXVpZENpcGhlclRleHRCdWZmZXI7XG4gICAgcmV0dXJuIGRlbGV0ZVBlbmRpbmdNZW1iZXI7XG4gIH0pO1xuXG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMuZGVsZXRlUGVuZGluZ01lbWJlcnMgPSBkZWxldGVQZW5kaW5nTWVtYmVycztcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkRGVsZXRlTWVtYmVyQ2hhbmdlKHtcbiAgZ3JvdXAsXG4gIG91clV1aWQsXG4gIHV1aWQsXG59OiB7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgb3VyVXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xufSk6IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMge1xuICBjb25zdCBhY3Rpb25zID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMoKTtcblxuICBpZiAoIWdyb3VwLnNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcignYnVpbGREZWxldGVNZW1iZXJDaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnKTtcbiAgfVxuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihncm91cC5zZWNyZXRQYXJhbXMpO1xuICBjb25zdCB1dWlkQ2lwaGVyVGV4dEJ1ZmZlciA9IGVuY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIHV1aWQpO1xuXG4gIGNvbnN0IGRlbGV0ZU1lbWJlciA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckFjdGlvbigpO1xuICBkZWxldGVNZW1iZXIuZGVsZXRlZFVzZXJJZCA9IHV1aWRDaXBoZXJUZXh0QnVmZmVyO1xuXG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMuZGVsZXRlTWVtYmVycyA9IFtkZWxldGVNZW1iZXJdO1xuXG4gIGNvbnN0IHsgYWRkTWVtYmVyc0Jhbm5lZCwgZGVsZXRlTWVtYmVyc0Jhbm5lZCB9ID1cbiAgICBfbWF5YmVCdWlsZEFkZEJhbm5lZE1lbWJlckFjdGlvbnMoe1xuICAgICAgY2xpZW50WmtHcm91cENpcGhlcixcbiAgICAgIGdyb3VwLFxuICAgICAgb3VyVXVpZCxcbiAgICAgIHV1aWQsXG4gICAgfSk7XG5cbiAgaWYgKGFkZE1lbWJlcnNCYW5uZWQpIHtcbiAgICBhY3Rpb25zLmFkZE1lbWJlcnNCYW5uZWQgPSBhZGRNZW1iZXJzQmFubmVkO1xuICB9XG4gIGlmIChkZWxldGVNZW1iZXJzQmFubmVkKSB7XG4gICAgYWN0aW9ucy5kZWxldGVNZW1iZXJzQmFubmVkID0gZGVsZXRlTWVtYmVyc0Jhbm5lZDtcbiAgfVxuXG4gIHJldHVybiBhY3Rpb25zO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRBZGRCYW5uZWRNZW1iZXJDaGFuZ2Uoe1xuICB1dWlkLFxuICBncm91cCxcbn06IHtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbn0pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGRBZGRCYW5uZWRNZW1iZXJDaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnXG4gICAgKTtcbiAgfVxuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihncm91cC5zZWNyZXRQYXJhbXMpO1xuICBjb25zdCB1dWlkQ2lwaGVyVGV4dEJ1ZmZlciA9IGVuY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIHV1aWQpO1xuXG4gIGNvbnN0IGFkZE1lbWJlckJhbm5lZEFjdGlvbiA9XG4gICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyQmFubmVkQWN0aW9uKCk7XG5cbiAgYWRkTWVtYmVyQmFubmVkQWN0aW9uLmFkZGVkID0gbmV3IFByb3RvLk1lbWJlckJhbm5lZCgpO1xuICBhZGRNZW1iZXJCYW5uZWRBY3Rpb24uYWRkZWQudXNlcklkID0gdXVpZENpcGhlclRleHRCdWZmZXI7XG5cbiAgYWN0aW9ucy5hZGRNZW1iZXJzQmFubmVkID0gW2FkZE1lbWJlckJhbm5lZEFjdGlvbl07XG5cbiAgaWYgKGdyb3VwLnBlbmRpbmdBZG1pbkFwcHJvdmFsVjI/LnNvbWUoaXRlbSA9PiBpdGVtLnV1aWQgPT09IHV1aWQpKSB7XG4gICAgY29uc3QgZGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxBY3Rpb24gPVxuICAgICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuRGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxBY3Rpb24oKTtcblxuICAgIGRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uLmRlbGV0ZWRVc2VySWQgPSB1dWlkQ2lwaGVyVGV4dEJ1ZmZlcjtcblxuICAgIGFjdGlvbnMuZGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxzID0gW1xuICAgICAgZGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxBY3Rpb24sXG4gICAgXTtcbiAgfVxuXG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG5cbiAgcmV0dXJuIGFjdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZE1vZGlmeU1lbWJlclJvbGVDaGFuZ2Uoe1xuICB1dWlkLFxuICBncm91cCxcbiAgcm9sZSxcbn06IHtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgcm9sZTogbnVtYmVyO1xufSk6IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMge1xuICBjb25zdCBhY3Rpb25zID0gbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMoKTtcblxuICBpZiAoIWdyb3VwLnNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcignYnVpbGRNYWtlQWRtaW5DaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnKTtcbiAgfVxuXG4gIGNvbnN0IGNsaWVudFprR3JvdXBDaXBoZXIgPSBnZXRDbGllbnRaa0dyb3VwQ2lwaGVyKGdyb3VwLnNlY3JldFBhcmFtcyk7XG4gIGNvbnN0IHV1aWRDaXBoZXJUZXh0QnVmZmVyID0gZW5jcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgdXVpZCk7XG5cbiAgY29uc3QgdG9nZ2xlQWRtaW4gPSBuZXcgUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlNZW1iZXJSb2xlQWN0aW9uKCk7XG4gIHRvZ2dsZUFkbWluLnVzZXJJZCA9IHV1aWRDaXBoZXJUZXh0QnVmZmVyO1xuICB0b2dnbGVBZG1pbi5yb2xlID0gcm9sZTtcblxuICBhY3Rpb25zLnZlcnNpb24gPSAoZ3JvdXAucmV2aXNpb24gfHwgMCkgKyAxO1xuICBhY3Rpb25zLm1vZGlmeU1lbWJlclJvbGVzID0gW3RvZ2dsZUFkbWluXTtcblxuICByZXR1cm4gYWN0aW9ucztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJ1aWxkUHJvbW90ZVBlbmRpbmdBZG1pbkFwcHJvdmFsTWVtYmVyQ2hhbmdlKHtcbiAgZ3JvdXAsXG4gIHV1aWQsXG59OiB7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59KTogUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB7XG4gIGNvbnN0IE1FTUJFUl9ST0xFX0VOVU0gPSBQcm90by5NZW1iZXIuUm9sZTtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGRBZGRQZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlckNoYW5nZTogZ3JvdXAgd2FzIG1pc3Npbmcgc2VjcmV0UGFyYW1zISdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoZ3JvdXAuc2VjcmV0UGFyYW1zKTtcbiAgY29uc3QgdXVpZENpcGhlclRleHRCdWZmZXIgPSBlbmNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1dWlkKTtcblxuICBjb25zdCBwcm9tb3RlUGVuZGluZ01lbWJlciA9XG4gICAgbmV3IFByb3RvLkdyb3VwQ2hhbmdlLkFjdGlvbnMuUHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uKCk7XG4gIHByb21vdGVQZW5kaW5nTWVtYmVyLnVzZXJJZCA9IHV1aWRDaXBoZXJUZXh0QnVmZmVyO1xuICBwcm9tb3RlUGVuZGluZ01lbWJlci5yb2xlID0gTUVNQkVSX1JPTEVfRU5VTS5ERUZBVUxUO1xuXG4gIGFjdGlvbnMudmVyc2lvbiA9IChncm91cC5yZXZpc2lvbiB8fCAwKSArIDE7XG4gIGFjdGlvbnMucHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyA9IFtwcm9tb3RlUGVuZGluZ01lbWJlcl07XG5cbiAgcmV0dXJuIGFjdGlvbnM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBidWlsZFByb21vdGVNZW1iZXJDaGFuZ2Uoe1xuICBncm91cCxcbiAgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQsXG4gIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NCxcbn06IHtcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlO1xuICBwcm9maWxlS2V5Q3JlZGVudGlhbEJhc2U2NDogc3RyaW5nO1xuICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQ6IHN0cmluZztcbn0pOiBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zIHtcbiAgY29uc3QgYWN0aW9ucyA9IG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zKCk7XG5cbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnYnVpbGREaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyQ2hhbmdlOiBncm91cCB3YXMgbWlzc2luZyBzZWNyZXRQYXJhbXMhJ1xuICAgICk7XG4gIH1cbiAgY29uc3QgY2xpZW50WmtQcm9maWxlQ2lwaGVyID0gZ2V0Q2xpZW50WmtQcm9maWxlT3BlcmF0aW9ucyhcbiAgICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjRcbiAgKTtcblxuICBjb25zdCBwcmVzZW50YXRpb24gPSBjcmVhdGVQcm9maWxlS2V5Q3JlZGVudGlhbFByZXNlbnRhdGlvbihcbiAgICBjbGllbnRaa1Byb2ZpbGVDaXBoZXIsXG4gICAgcHJvZmlsZUtleUNyZWRlbnRpYWxCYXNlNjQsXG4gICAgZ3JvdXAuc2VjcmV0UGFyYW1zXG4gICk7XG5cbiAgY29uc3QgcHJvbW90ZVBlbmRpbmdNZW1iZXIgPVxuICAgIG5ldyBQcm90by5Hcm91cENoYW5nZS5BY3Rpb25zLlByb21vdGVNZW1iZXJQZW5kaW5nUHJvZmlsZUtleUFjdGlvbigpO1xuICBwcm9tb3RlUGVuZGluZ01lbWJlci5wcmVzZW50YXRpb24gPSBwcmVzZW50YXRpb247XG5cbiAgYWN0aW9ucy52ZXJzaW9uID0gKGdyb3VwLnJldmlzaW9uIHx8IDApICsgMTtcbiAgYWN0aW9ucy5wcm9tb3RlUGVuZGluZ01lbWJlcnMgPSBbcHJvbW90ZVBlbmRpbmdNZW1iZXJdO1xuXG4gIHJldHVybiBhY3Rpb25zO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBsb2FkR3JvdXBDaGFuZ2Uoe1xuICBhY3Rpb25zLFxuICBncm91cCxcbiAgaW52aXRlTGlua1Bhc3N3b3JkLFxufToge1xuICBhY3Rpb25zOiBQcm90by5Hcm91cENoYW5nZS5JQWN0aW9ucztcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlO1xuICBpbnZpdGVMaW5rUGFzc3dvcmQ/OiBzdHJpbmc7XG59KTogUHJvbWlzZTxQcm90by5JR3JvdXBDaGFuZ2U+IHtcbiAgY29uc3QgbG9nSWQgPSBpZEZvckxvZ2dpbmcoZ3JvdXAuZ3JvdXBJZCk7XG5cbiAgLy8gRW5zdXJlIHdlIGhhdmUgdGhlIGNyZWRlbnRpYWxzIHdlIG5lZWQgYmVmb3JlIGF0dGVtcHRpbmcgR3JvdXBzVjIgb3BlcmF0aW9uc1xuICBhd2FpdCBtYXliZUZldGNoTmV3Q3JlZGVudGlhbHMoKTtcblxuICBpZiAoIWdyb3VwLnNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBsb2FkR3JvdXBDaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnKTtcbiAgfVxuICBpZiAoIWdyb3VwLnB1YmxpY1BhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBsb2FkR3JvdXBDaGFuZ2U6IGdyb3VwIHdhcyBtaXNzaW5nIHB1YmxpY1BhcmFtcyEnKTtcbiAgfVxuXG4gIHJldHVybiBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICBsb2dJZDogYHVwbG9hZEdyb3VwQ2hhbmdlLyR7bG9nSWR9YCxcbiAgICBwdWJsaWNQYXJhbXM6IGdyb3VwLnB1YmxpY1BhcmFtcyxcbiAgICBzZWNyZXRQYXJhbXM6IGdyb3VwLnNlY3JldFBhcmFtcyxcbiAgICByZXF1ZXN0OiAoc2VuZGVyLCBvcHRpb25zKSA9PlxuICAgICAgc2VuZGVyLm1vZGlmeUdyb3VwKGFjdGlvbnMsIG9wdGlvbnMsIGludml0ZUxpbmtQYXNzd29yZCksXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gbW9kaWZ5R3JvdXBWMih7XG4gIGNvbnZlcnNhdGlvbixcbiAgY3JlYXRlR3JvdXBDaGFuZ2UsXG4gIGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmQsXG4gIGludml0ZUxpbmtQYXNzd29yZCxcbiAgbmFtZSxcbn06IHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbDtcbiAgY3JlYXRlR3JvdXBDaGFuZ2U6ICgpID0+IFByb21pc2U8UHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucyB8IHVuZGVmaW5lZD47XG4gIGV4dHJhQ29udmVyc2F0aW9uc0ZvclNlbmQ/OiBBcnJheTxzdHJpbmc+O1xuICBpbnZpdGVMaW5rUGFzc3dvcmQ/OiBzdHJpbmc7XG4gIG5hbWU6IHN0cmluZztcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgbG9nSWQgPSBgJHtuYW1lfS8ke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gO1xuXG4gIGlmICghZ2V0SXNHcm91cFYyKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBtb2RpZnlHcm91cFYyLyR7bG9nSWR9OiBDYWxsZWQgZm9yIG5vbi1Hcm91cFYyIGNvbnZlcnNhdGlvbmBcbiAgICApO1xuICB9XG5cbiAgY29uc3Qgc3RhcnRUaW1lID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgdGltZW91dFRpbWUgPSBzdGFydFRpbWUgKyBkdXJhdGlvbnMuTUlOVVRFO1xuXG4gIGNvbnN0IE1BWF9BVFRFTVBUUyA9IDU7XG5cbiAgZm9yIChsZXQgYXR0ZW1wdCA9IDA7IGF0dGVtcHQgPCBNQVhfQVRURU1QVFM7IGF0dGVtcHQgKz0gMSkge1xuICAgIGxvZy5pbmZvKGBtb2RpZnlHcm91cFYyLyR7bG9nSWR9OiBTdGFydGluZyBhdHRlbXB0ICR7YXR0ZW1wdH1gKTtcbiAgICB0cnkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIGF3YWl0IHdpbmRvdy53YWl0Rm9yRW1wdHlFdmVudFF1ZXVlKCk7XG5cbiAgICAgIGxvZy5pbmZvKGBtb2RpZnlHcm91cFYyLyR7bG9nSWR9OiBRdWV1aW5nIGF0dGVtcHQgJHthdHRlbXB0fWApO1xuXG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgYXdhaXQgY29udmVyc2F0aW9uLnF1ZXVlSm9iKCdtb2RpZnlHcm91cFYyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBsb2cuaW5mbyhgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogUnVubmluZyBhdHRlbXB0ICR7YXR0ZW1wdH1gKTtcblxuICAgICAgICBjb25zdCBhY3Rpb25zID0gYXdhaXQgY3JlYXRlR3JvdXBDaGFuZ2UoKTtcbiAgICAgICAgaWYgKCFhY3Rpb25zKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogTm8gY2hhbmdlIGFjdGlvbnMuIFJldHVybmluZyBlYXJseS5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICAvLyBUaGUgbmV3IHJldmlzaW9uIGhhcyB0byBiZSBleGFjdGx5IG9uZSBtb3JlIHRoYW4gdGhlIGN1cnJlbnQgcmV2aXNpb25cbiAgICAgICAgLy8gICBvciBpdCB3b24ndCB1cGxvYWQgcHJvcGVybHksIGFuZCBpdCB3b24ndCBhcHBseSBpbiBtYXliZVVwZGF0ZUdyb3VwXG4gICAgICAgIGNvbnN0IGN1cnJlbnRSZXZpc2lvbiA9IGNvbnZlcnNhdGlvbi5nZXQoJ3JldmlzaW9uJyk7XG4gICAgICAgIGNvbnN0IG5ld1JldmlzaW9uID0gYWN0aW9ucy52ZXJzaW9uO1xuXG4gICAgICAgIGlmICgoY3VycmVudFJldmlzaW9uIHx8IDApICsgMSAhPT0gbmV3UmV2aXNpb24pIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICBgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogUmV2aXNpb24gbWlzbWF0Y2ggLSAke2N1cnJlbnRSZXZpc2lvbn0gdG8gJHtuZXdSZXZpc2lvbn0uYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBVcGxvYWQuIElmIHdlIGRvbid0IGhhdmUgcGVybWlzc2lvbiwgdGhlIHNlcnZlciB3aWxsIHJldHVybiBhbiBlcnJvciBoZXJlLlxuICAgICAgICBjb25zdCBncm91cENoYW5nZSA9IGF3YWl0IHdpbmRvdy5TaWduYWwuR3JvdXBzLnVwbG9hZEdyb3VwQ2hhbmdlKHtcbiAgICAgICAgICBhY3Rpb25zLFxuICAgICAgICAgIGludml0ZUxpbmtQYXNzd29yZCxcbiAgICAgICAgICBncm91cDogY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGdyb3VwQ2hhbmdlQnVmZmVyID1cbiAgICAgICAgICBQcm90by5Hcm91cENoYW5nZS5lbmNvZGUoZ3JvdXBDaGFuZ2UpLmZpbmlzaCgpO1xuICAgICAgICBjb25zdCBncm91cENoYW5nZUJhc2U2NCA9IEJ5dGVzLnRvQmFzZTY0KGdyb3VwQ2hhbmdlQnVmZmVyKTtcblxuICAgICAgICAvLyBBcHBseSBjaGFuZ2UgbG9jYWxseSwganVzdCBsaWtlIHdlIHdvdWxkIHdpdGggYW4gaW5jb21pbmcgY2hhbmdlLiBUaGlzIHdpbGxcbiAgICAgICAgLy8gICBjaGFuZ2UgY29udmVyc2F0aW9uIHN0YXRlIGFuZCBhZGQgY2hhbmdlIG5vdGlmaWNhdGlvbnMgdG8gdGhlIHRpbWVsaW5lLlxuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkdyb3Vwcy5tYXliZVVwZGF0ZUdyb3VwKHtcbiAgICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgICAgZ3JvdXBDaGFuZ2U6IHtcbiAgICAgICAgICAgIGJhc2U2NDogZ3JvdXBDaGFuZ2VCYXNlNjQsXG4gICAgICAgICAgICBpc1RydXN0ZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBuZXdSZXZpc2lvbixcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZ3JvdXBWMkluZm8gPSBjb252ZXJzYXRpb24uZ2V0R3JvdXBWMkluZm8oe1xuICAgICAgICAgIGluY2x1ZGVQZW5kaW5nTWVtYmVyczogdHJ1ZSxcbiAgICAgICAgICBleHRyYUNvbnZlcnNhdGlvbnNGb3JTZW5kLFxuICAgICAgICB9KTtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KGdyb3VwVjJJbmZvLCAnbWlzc2luZyBncm91cFYySW5mbycpO1xuXG4gICAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbkpvYlF1ZXVlLmFkZCh7XG4gICAgICAgICAgdHlwZTogY29udmVyc2F0aW9uUXVldWVKb2JFbnVtLmVudW0uR3JvdXBVcGRhdGUsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICBncm91cENoYW5nZUJhc2U2NCxcbiAgICAgICAgICByZWNpcGllbnRzOiBncm91cFYySW5mby5tZW1iZXJzLFxuICAgICAgICAgIHJldmlzaW9uOiBncm91cFYySW5mby5yZXZpc2lvbixcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgLy8gSWYgd2UndmUgZ290dGVuIGhlcmUgd2l0aCBubyBlcnJvciwgd2UgZXhpdCFcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogVXBkYXRlIGNvbXBsZXRlLCB3aXRoIGF0dGVtcHQgJHthdHRlbXB0fSFgXG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSA0MDkgJiYgRGF0ZS5ub3coKSA8PSB0aW1lb3V0VGltZSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogQ29uZmxpY3Qgd2hpbGUgdXBkYXRpbmcuIFRyeWluZyBhZ2Fpbi4uLmBcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICBhd2FpdCBjb252ZXJzYXRpb24uZmV0Y2hMYXRlc3RHcm91cFYyRGF0YSh7IGZvcmNlOiB0cnVlIH0pO1xuICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSA0MDkpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGBtb2RpZnlHcm91cFYyLyR7bG9nSWR9OiBDb25mbGljdCB3aGlsZSB1cGRhdGluZy4gVGltZWQgb3V0OyBub3QgcmV0cnlpbmcuYFxuICAgICAgICApO1xuICAgICAgICAvLyBXZSBkb24ndCB3YWl0IGhlcmUgYmVjYXVzZSB3ZSdyZSBicmVha2luZyBvdXQgb2YgdGhlIGxvb3AgaW1tZWRpYXRlbHkuXG4gICAgICAgIGNvbnZlcnNhdGlvbi5mZXRjaExhdGVzdEdyb3VwVjJEYXRhKHsgZm9yY2U6IHRydWUgfSk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgZXJyb3JTdHJpbmcgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICAgIGxvZy5lcnJvcihgbW9kaWZ5R3JvdXBWMi8ke2xvZ0lkfTogRXJyb3IgdXBkYXRpbmc6ICR7ZXJyb3JTdHJpbmd9YCk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4vLyBVdGlsaXR5XG5cbmV4cG9ydCBmdW5jdGlvbiBpZEZvckxvZ2dpbmcoZ3JvdXBJZDogc3RyaW5nIHwgdW5kZWZpbmVkKTogc3RyaW5nIHtcbiAgcmV0dXJuIGBncm91cHYyKCR7Z3JvdXBJZH0pYDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlcml2ZUdyb3VwRmllbGRzKG1hc3RlcktleTogVWludDhBcnJheSk6IEdyb3VwRmllbGRzIHtcbiAgaWYgKG1hc3RlcktleS5sZW5ndGggIT09IE1BU1RFUl9LRVlfTEVOR1RIKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYGRlcml2ZUdyb3VwRmllbGRzOiBtYXN0ZXJLZXkgaGFkIGxlbmd0aCAke21hc3RlcktleS5sZW5ndGh9LCBgICtcbiAgICAgICAgYGV4cGVjdGVkICR7TUFTVEVSX0tFWV9MRU5HVEh9YFxuICAgICk7XG4gIH1cblxuICBjb25zdCBjYWNoZUtleSA9IEJ5dGVzLnRvQmFzZTY0KG1hc3RlcktleSk7XG4gIGNvbnN0IGNhY2hlZCA9IGdyb3VwRmllbGRzQ2FjaGUuZ2V0KGNhY2hlS2V5KTtcbiAgaWYgKGNhY2hlZCkge1xuICAgIHJldHVybiBjYWNoZWQ7XG4gIH1cblxuICBsb2cuaW5mbygnZGVyaXZlR3JvdXBGaWVsZHM6IGNhY2hlIG1pc3MnKTtcblxuICBjb25zdCBzZWNyZXRQYXJhbXMgPSBkZXJpdmVHcm91cFNlY3JldFBhcmFtcyhtYXN0ZXJLZXkpO1xuICBjb25zdCBwdWJsaWNQYXJhbXMgPSBkZXJpdmVHcm91cFB1YmxpY1BhcmFtcyhzZWNyZXRQYXJhbXMpO1xuICBjb25zdCBpZCA9IGRlcml2ZUdyb3VwSUQoc2VjcmV0UGFyYW1zKTtcblxuICBjb25zdCBmcmVzaCA9IHtcbiAgICBpZCxcbiAgICBzZWNyZXRQYXJhbXMsXG4gICAgcHVibGljUGFyYW1zLFxuICB9O1xuICBncm91cEZpZWxkc0NhY2hlLnNldChjYWNoZUtleSwgZnJlc2gpO1xuICByZXR1cm4gZnJlc2g7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1ha2VSZXF1ZXN0V2l0aFRlbXBvcmFsUmV0cnk8VD4oe1xuICBsb2dJZCxcbiAgcHVibGljUGFyYW1zLFxuICBzZWNyZXRQYXJhbXMsXG4gIHJlcXVlc3QsXG59OiB7XG4gIGxvZ0lkOiBzdHJpbmc7XG4gIHB1YmxpY1BhcmFtczogc3RyaW5nO1xuICBzZWNyZXRQYXJhbXM6IHN0cmluZztcbiAgcmVxdWVzdDogKHNlbmRlcjogTWVzc2FnZVNlbmRlciwgb3B0aW9uczogR3JvdXBDcmVkZW50aWFsc1R5cGUpID0+IFByb21pc2U8VD47XG59KTogUHJvbWlzZTxUPiB7XG4gIGNvbnN0IGRhdGEgPSB3aW5kb3cuc3RvcmFnZS5nZXQoR1JPVVBfQ1JFREVOVElBTFNfS0VZKTtcbiAgaWYgKCFkYXRhKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYG1ha2VSZXF1ZXN0V2l0aFRlbXBvcmFsUmV0cnkvJHtsb2dJZH06IE5vIGdyb3VwIGNyZWRlbnRpYWxzIWBcbiAgICApO1xuICB9XG4gIGNvbnN0IGdyb3VwQ3JlZGVudGlhbHMgPSBnZXRDcmVkZW50aWFsc0ZvclRvZGF5KGRhdGEpO1xuXG4gIGNvbnN0IHNlbmRlciA9IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZztcbiAgaWYgKCFzZW5kZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgbWFrZVJlcXVlc3RXaXRoVGVtcG9yYWxSZXRyeS8ke2xvZ0lkfTogdGV4dHNlY3VyZS5tZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSFgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHRvZGF5T3B0aW9ucyA9IGdldEdyb3VwQ3JlZGVudGlhbHMoe1xuICAgIGF1dGhDcmVkZW50aWFsQmFzZTY0OiBncm91cENyZWRlbnRpYWxzLnRvZGF5LmNyZWRlbnRpYWwsXG4gICAgZ3JvdXBQdWJsaWNQYXJhbXNCYXNlNjQ6IHB1YmxpY1BhcmFtcyxcbiAgICBncm91cFNlY3JldFBhcmFtc0Jhc2U2NDogc2VjcmV0UGFyYW1zLFxuICAgIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NDogd2luZG93LmdldFNlcnZlclB1YmxpY1BhcmFtcygpLFxuICB9KTtcblxuICB0cnkge1xuICAgIHJldHVybiBhd2FpdCByZXF1ZXN0KHNlbmRlciwgdG9kYXlPcHRpb25zKTtcbiAgfSBjYXRjaCAodG9kYXlFcnJvcikge1xuICAgIGlmICh0b2RheUVycm9yLmNvZGUgPT09IFRFTVBPUkFMX0FVVEhfUkVKRUNURURfQ09ERSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5LyR7bG9nSWR9OiBUcnlpbmcgYWdhaW4gd2l0aCB0b21vcnJvdydzIGNyZWRlbnRpYWxzYFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHRvbW9ycm93T3B0aW9ucyA9IGdldEdyb3VwQ3JlZGVudGlhbHMoe1xuICAgICAgICBhdXRoQ3JlZGVudGlhbEJhc2U2NDogZ3JvdXBDcmVkZW50aWFscy50b21vcnJvdy5jcmVkZW50aWFsLFxuICAgICAgICBncm91cFB1YmxpY1BhcmFtc0Jhc2U2NDogcHVibGljUGFyYW1zLFxuICAgICAgICBncm91cFNlY3JldFBhcmFtc0Jhc2U2NDogc2VjcmV0UGFyYW1zLFxuICAgICAgICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQ6IHdpbmRvdy5nZXRTZXJ2ZXJQdWJsaWNQYXJhbXMoKSxcbiAgICAgIH0pO1xuXG4gICAgICByZXR1cm4gcmVxdWVzdChzZW5kZXIsIHRvbW9ycm93T3B0aW9ucyk7XG4gICAgfVxuXG4gICAgdGhyb3cgdG9kYXlFcnJvcjtcbiAgfVxufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hNZW1iZXJzaGlwUHJvb2Yoe1xuICBwdWJsaWNQYXJhbXMsXG4gIHNlY3JldFBhcmFtcyxcbn06IHtcbiAgcHVibGljUGFyYW1zOiBzdHJpbmc7XG4gIHNlY3JldFBhcmFtczogc3RyaW5nO1xufSk6IFByb21pc2U8c3RyaW5nIHwgdW5kZWZpbmVkPiB7XG4gIC8vIEVuc3VyZSB3ZSBoYXZlIHRoZSBjcmVkZW50aWFscyB3ZSBuZWVkIGJlZm9yZSBhdHRlbXB0aW5nIEdyb3Vwc1YyIG9wZXJhdGlvbnNcbiAgYXdhaXQgbWF5YmVGZXRjaE5ld0NyZWRlbnRpYWxzKCk7XG5cbiAgaWYgKCFwdWJsaWNQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZldGNoTWVtYmVyc2hpcFByb29mOiBncm91cCB3YXMgbWlzc2luZyBwdWJsaWNQYXJhbXMhJyk7XG4gIH1cbiAgaWYgKCFzZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2ZldGNoTWVtYmVyc2hpcFByb29mOiBncm91cCB3YXMgbWlzc2luZyBzZWNyZXRQYXJhbXMhJyk7XG4gIH1cblxuICBjb25zdCByZXNwb25zZSA9IGF3YWl0IG1ha2VSZXF1ZXN0V2l0aFRlbXBvcmFsUmV0cnkoe1xuICAgIGxvZ0lkOiAnZmV0Y2hNZW1iZXJzaGlwUHJvb2YnLFxuICAgIHB1YmxpY1BhcmFtcyxcbiAgICBzZWNyZXRQYXJhbXMsXG4gICAgcmVxdWVzdDogKHNlbmRlciwgb3B0aW9ucykgPT4gc2VuZGVyLmdldEdyb3VwTWVtYmVyc2hpcFRva2VuKG9wdGlvbnMpLFxuICB9KTtcbiAgcmV0dXJuIHJlc3BvbnNlLnRva2VuO1xufVxuXG4vLyBDcmVhdGluZyBhIGdyb3VwXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjcmVhdGVHcm91cFYyKHtcbiAgbmFtZSxcbiAgYXZhdGFyLFxuICBleHBpcmVUaW1lcixcbiAgY29udmVyc2F0aW9uSWRzLFxuICBhdmF0YXJzLFxufTogUmVhZG9ubHk8e1xuICBuYW1lOiBzdHJpbmc7XG4gIGF2YXRhcjogdW5kZWZpbmVkIHwgVWludDhBcnJheTtcbiAgZXhwaXJlVGltZXI6IHVuZGVmaW5lZCB8IG51bWJlcjtcbiAgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+O1xuICBhdmF0YXJzPzogQXJyYXk8QXZhdGFyRGF0YVR5cGU+O1xufT4pOiBQcm9taXNlPENvbnZlcnNhdGlvbk1vZGVsPiB7XG4gIC8vIEVuc3VyZSB3ZSBoYXZlIHRoZSBjcmVkZW50aWFscyB3ZSBuZWVkIGJlZm9yZSBhdHRlbXB0aW5nIEdyb3Vwc1YyIG9wZXJhdGlvbnNcbiAgYXdhaXQgbWF5YmVGZXRjaE5ld0NyZWRlbnRpYWxzKCk7XG5cbiAgY29uc3QgQUNDRVNTX0VOVU0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuICBjb25zdCBNRU1CRVJfUk9MRV9FTlVNID0gUHJvdG8uTWVtYmVyLlJvbGU7XG5cbiAgY29uc3QgbWFzdGVyS2V5QnVmZmVyID0gZ2V0UmFuZG9tQnl0ZXMoMzIpO1xuICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gIGNvbnN0IGdyb3VwSWQgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuaWQpO1xuICBjb25zdCBsb2dJZCA9IGBncm91cHYyKCR7Z3JvdXBJZH0pYDtcblxuICBjb25zdCBtYXN0ZXJLZXkgPSBCeXRlcy50b0Jhc2U2NChtYXN0ZXJLZXlCdWZmZXIpO1xuICBjb25zdCBzZWNyZXRQYXJhbXMgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuc2VjcmV0UGFyYW1zKTtcbiAgY29uc3QgcHVibGljUGFyYW1zID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLnB1YmxpY1BhcmFtcyk7XG5cbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuXG4gIGNvbnN0IG1lbWJlcnNWMjogQXJyYXk8R3JvdXBWMk1lbWJlclR5cGU+ID0gW1xuICAgIHtcbiAgICAgIHV1aWQ6IG91clV1aWQsXG4gICAgICByb2xlOiBNRU1CRVJfUk9MRV9FTlVNLkFETUlOSVNUUkFUT1IsXG4gICAgICBqb2luZWRBdFZlcnNpb246IDAsXG4gICAgfSxcbiAgXTtcbiAgY29uc3QgcGVuZGluZ01lbWJlcnNWMjogQXJyYXk8R3JvdXBWMlBlbmRpbmdNZW1iZXJUeXBlPiA9IFtdO1xuXG4gIGxldCB1cGxvYWRlZEF2YXRhcjogdW5kZWZpbmVkIHwgVXBsb2FkZWRBdmF0YXJUeXBlO1xuXG4gIGF3YWl0IFByb21pc2UuYWxsKFtcbiAgICAuLi5jb252ZXJzYXRpb25JZHMubWFwKGFzeW5jIGNvbnZlcnNhdGlvbklkID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgaWYgKCFjb250YWN0KSB7XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICBgY3JlYXRlR3JvdXBWMi8ke2xvZ0lkfTogbWlzc2luZyBsb2NhbCBjb250YWN0LCBza2lwcGluZ2BcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjb250YWN0VXVpZCA9IGNvbnRhY3QuZ2V0KCd1dWlkJyk7XG4gICAgICBpZiAoIWNvbnRhY3RVdWlkKSB7XG4gICAgICAgIGFzc2VydChmYWxzZSwgYGNyZWF0ZUdyb3VwVjIvJHtsb2dJZH06IG1pc3NpbmcgVVVJRDsgc2tpcHBpbmdgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBSZWZyZXNoIG91ciBsb2NhbCBkYXRhIHRvIGJlIHN1cmVcbiAgICAgIGlmICghY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXknKSB8fCAhY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJykpIHtcbiAgICAgICAgYXdhaXQgY29udGFjdC5nZXRQcm9maWxlcygpO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXknKSAmJiBjb250YWN0LmdldCgncHJvZmlsZUtleUNyZWRlbnRpYWwnKSkge1xuICAgICAgICBtZW1iZXJzVjIucHVzaCh7XG4gICAgICAgICAgdXVpZDogY29udGFjdFV1aWQsXG4gICAgICAgICAgcm9sZTogTUVNQkVSX1JPTEVfRU5VTS5ERUZBVUxULFxuICAgICAgICAgIGpvaW5lZEF0VmVyc2lvbjogMCxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwZW5kaW5nTWVtYmVyc1YyLnB1c2goe1xuICAgICAgICAgIGFkZGVkQnlVc2VySWQ6IG91clV1aWQsXG4gICAgICAgICAgdXVpZDogY29udGFjdFV1aWQsXG4gICAgICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICAgIHJvbGU6IE1FTUJFUl9ST0xFX0VOVU0uREVGQVVMVCxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSksXG4gICAgKGFzeW5jICgpID0+IHtcbiAgICAgIGlmICghYXZhdGFyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdXBsb2FkZWRBdmF0YXIgPSBhd2FpdCB1cGxvYWRBdmF0YXIoe1xuICAgICAgICBkYXRhOiBhdmF0YXIsXG4gICAgICAgIGxvZ0lkLFxuICAgICAgICBwdWJsaWNQYXJhbXMsXG4gICAgICAgIHNlY3JldFBhcmFtcyxcbiAgICAgIH0pO1xuICAgIH0pKCksXG4gIF0pO1xuXG4gIGlmIChtZW1iZXJzVjIubGVuZ3RoICsgcGVuZGluZ01lbWJlcnNWMi5sZW5ndGggPiBnZXRHcm91cFNpemVIYXJkTGltaXQoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBjcmVhdGVHcm91cFYyLyR7bG9nSWR9OiBUb28gbWFueSBtZW1iZXJzISBNZW1iZXIgY291bnQ6ICR7bWVtYmVyc1YyLmxlbmd0aH0sIFBlbmRpbmcgbWVtYmVyIGNvdW50OiAke3BlbmRpbmdNZW1iZXJzVjIubGVuZ3RofWBcbiAgICApO1xuICB9XG5cbiAgY29uc3QgcHJvdG9BbmRDb252ZXJzYXRpb25BdHRyaWJ1dGVzID0ge1xuICAgIG5hbWUsXG5cbiAgICAvLyBDb3JlIEdyb3VwVjIgaW5mb1xuICAgIHJldmlzaW9uOiAwLFxuICAgIHB1YmxpY1BhcmFtcyxcbiAgICBzZWNyZXRQYXJhbXMsXG5cbiAgICAvLyBHcm91cFYyIHN0YXRlXG4gICAgYWNjZXNzQ29udHJvbDoge1xuICAgICAgYXR0cmlidXRlczogQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgbWVtYmVyczogQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgYWRkRnJvbUludml0ZUxpbms6IEFDQ0VTU19FTlVNLlVOU0FUSVNGSUFCTEUsXG4gICAgfSxcbiAgICBtZW1iZXJzVjIsXG4gICAgcGVuZGluZ01lbWJlcnNWMixcbiAgfTtcblxuICBjb25zdCBncm91cFByb3RvID0gYXdhaXQgYnVpbGRHcm91cFByb3RvKHtcbiAgICBpZDogZ3JvdXBJZCxcbiAgICBhdmF0YXJVcmw6IHVwbG9hZGVkQXZhdGFyPy5rZXksXG4gICAgLi4ucHJvdG9BbmRDb252ZXJzYXRpb25BdHRyaWJ1dGVzLFxuICB9KTtcblxuICBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICBsb2dJZDogYGNyZWF0ZUdyb3VwVjIvJHtsb2dJZH1gLFxuICAgIHB1YmxpY1BhcmFtcyxcbiAgICBzZWNyZXRQYXJhbXMsXG4gICAgcmVxdWVzdDogKHNlbmRlciwgb3B0aW9ucykgPT4gc2VuZGVyLmNyZWF0ZUdyb3VwKGdyb3VwUHJvdG8sIG9wdGlvbnMpLFxuICB9KTtcblxuICBsZXQgYXZhdGFyQXR0cmlidXRlOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVsnYXZhdGFyJ107XG4gIGlmICh1cGxvYWRlZEF2YXRhcikge1xuICAgIHRyeSB7XG4gICAgICBhdmF0YXJBdHRyaWJ1dGUgPSB7XG4gICAgICAgIHVybDogdXBsb2FkZWRBdmF0YXIua2V5LFxuICAgICAgICBwYXRoOiBhd2FpdCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdBdHRhY2htZW50RGF0YShcbiAgICAgICAgICB1cGxvYWRlZEF2YXRhci5kYXRhXG4gICAgICAgICksXG4gICAgICAgIGhhc2g6IHVwbG9hZGVkQXZhdGFyLmhhc2gsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBjcmVhdGVHcm91cFYyLyR7bG9nSWR9OiBhdmF0YXIgZmFpbGVkIHRvIHNhdmUgdG8gZGlzay4gQ29udGludWluZyBvbmBcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcblxuICBjb25zdCBjb252ZXJzYXRpb24gPSBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZUFuZFdhaXQoXG4gICAgZ3JvdXBJZCxcbiAgICAnZ3JvdXAnLFxuICAgIHtcbiAgICAgIC4uLnByb3RvQW5kQ29udmVyc2F0aW9uQXR0cmlidXRlcyxcbiAgICAgIGFjdGl2ZV9hdDogbm93LFxuICAgICAgYWRkZWRCeTogb3VyVXVpZCxcbiAgICAgIGF2YXRhcjogYXZhdGFyQXR0cmlidXRlLFxuICAgICAgYXZhdGFycyxcbiAgICAgIGdyb3VwVmVyc2lvbjogMixcbiAgICAgIG1hc3RlcktleSxcbiAgICAgIHByb2ZpbGVTaGFyaW5nOiB0cnVlLFxuICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICBuZWVkc1N0b3JhZ2VTZXJ2aWNlU3luYzogdHJ1ZSxcbiAgICB9XG4gICk7XG5cbiAgYXdhaXQgY29udmVyc2F0aW9uLnF1ZXVlSm9iKCdzdG9yYWdlU2VydmljZVVwbG9hZEpvYicsIGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzLnN0b3JhZ2VTZXJ2aWNlVXBsb2FkSm9iKCk7XG4gIH0pO1xuXG4gIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gIGNvbnN0IGdyb3VwVjJJbmZvID0gY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKHtcbiAgICBpbmNsdWRlUGVuZGluZ01lbWJlcnM6IHRydWUsXG4gIH0pO1xuICBzdHJpY3RBc3NlcnQoZ3JvdXBWMkluZm8sICdtaXNzaW5nIGdyb3VwVjJJbmZvJyk7XG5cbiAgYXdhaXQgY29udmVyc2F0aW9uSm9iUXVldWUuYWRkKHtcbiAgICB0eXBlOiBjb252ZXJzYXRpb25RdWV1ZUpvYkVudW0uZW51bS5Hcm91cFVwZGF0ZSxcbiAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgIHJlY2lwaWVudHM6IGdyb3VwVjJJbmZvLm1lbWJlcnMsXG4gICAgcmV2aXNpb246IGdyb3VwVjJJbmZvLnJldmlzaW9uLFxuICB9KTtcblxuICBjb25zdCBjcmVhdGVkVGhlR3JvdXBNZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgLi4uZ2VuZXJhdGVCYXNpY01lc3NhZ2UoKSxcbiAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICBzb3VyY2VVdWlkOiBvdXJVdWlkLFxuICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgIHJlY2VpdmVkX2F0OiB3aW5kb3cuU2lnbmFsLlV0aWwuaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICByZWNlaXZlZF9hdF9tczogdGltZXN0YW1wLFxuICAgIHRpbWVzdGFtcCxcbiAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLlNlZW4sXG4gICAgc2VudF9hdDogdGltZXN0YW1wLFxuICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgIGZyb206IG91clV1aWQsXG4gICAgICBkZXRhaWxzOiBbeyB0eXBlOiAnY3JlYXRlJyB9XSxcbiAgICB9LFxuICB9O1xuICBhd2FpdCBkYXRhSW50ZXJmYWNlLnNhdmVNZXNzYWdlcyhbY3JlYXRlZFRoZUdyb3VwTWVzc2FnZV0sIHtcbiAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgb3VyVXVpZCxcbiAgfSk7XG4gIGNvbnN0IG1vZGVsID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UoY3JlYXRlZFRoZUdyb3VwTWVzc2FnZSk7XG4gIHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3Rlcihtb2RlbC5pZCwgbW9kZWwpO1xuICBjb252ZXJzYXRpb24udHJpZ2dlcignbmV3bWVzc2FnZScsIG1vZGVsKTtcblxuICBpZiAoZXhwaXJlVGltZXIpIHtcbiAgICBhd2FpdCBjb252ZXJzYXRpb24udXBkYXRlRXhwaXJhdGlvblRpbWVyKGV4cGlyZVRpbWVyLCB7XG4gICAgICByZWFzb246ICdjcmVhdGVHcm91cFYyJyxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBjb252ZXJzYXRpb247XG59XG5cbi8vIE1pZ3JhdGluZyBhIGdyb3VwXG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYXNWMUdyb3VwQmVlbk1pZ3JhdGVkKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgbG9nSWQgPSBjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCk7XG4gIGNvbnN0IGlzR3JvdXBWMSA9IGdldElzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gIGlmICghaXNHcm91cFYxKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgY2hlY2tGb3JHVjJFeGlzdGVuY2UvJHtsb2dJZH06IENhbGxlZCBmb3Igbm9uLUdyb3VwVjEgY29udmVyc2F0aW9uIWBcbiAgICApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVuc3VyZSB3ZSBoYXZlIHRoZSBjcmVkZW50aWFscyB3ZSBuZWVkIGJlZm9yZSBhdHRlbXB0aW5nIEdyb3Vwc1YyIG9wZXJhdGlvbnNcbiAgYXdhaXQgbWF5YmVGZXRjaE5ld0NyZWRlbnRpYWxzKCk7XG5cbiAgY29uc3QgZ3JvdXBJZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2dyb3VwSWQnKTtcbiAgaWYgKCFncm91cElkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBjaGVja0ZvckdWMkV4aXN0ZW5jZS8ke2xvZ0lkfTogTm8gZ3JvdXBJZCFgKTtcbiAgfVxuXG4gIGNvbnN0IGlkQnVmZmVyID0gQnl0ZXMuZnJvbUJpbmFyeShncm91cElkKTtcbiAgY29uc3QgbWFzdGVyS2V5QnVmZmVyID0gZGVyaXZlTWFzdGVyS2V5RnJvbUdyb3VwVjEoaWRCdWZmZXIpO1xuICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gIHRyeSB7XG4gICAgYXdhaXQgbWFrZVJlcXVlc3RXaXRoVGVtcG9yYWxSZXRyeSh7XG4gICAgICBsb2dJZDogYGdldEdyb3VwLyR7bG9nSWR9YCxcbiAgICAgIHB1YmxpY1BhcmFtczogQnl0ZXMudG9CYXNlNjQoZmllbGRzLnB1YmxpY1BhcmFtcyksXG4gICAgICBzZWNyZXRQYXJhbXM6IEJ5dGVzLnRvQmFzZTY0KGZpZWxkcy5zZWNyZXRQYXJhbXMpLFxuICAgICAgcmVxdWVzdDogKHNlbmRlciwgb3B0aW9ucykgPT4gc2VuZGVyLmdldEdyb3VwKG9wdGlvbnMpLFxuICAgIH0pO1xuICAgIHJldHVybiB0cnVlO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IHsgY29kZSB9ID0gZXJyb3I7XG4gICAgcmV0dXJuIGNvZGUgIT09IEdST1VQX05PTkVYSVNURU5UX0NPREU7XG4gIH1cbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG1heWJlRGVyaXZlR3JvdXBWMklkKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwpOiBib29sZWFuIHtcbiAgY29uc3QgaXNHcm91cFYxID0gZ2V0SXNHcm91cFYxKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgY29uc3QgZ3JvdXBWMUlkID0gY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpO1xuICBjb25zdCBkZXJpdmVkID0gY29udmVyc2F0aW9uLmdldCgnZGVyaXZlZEdyb3VwVjJJZCcpO1xuXG4gIGlmICghaXNHcm91cFYxIHx8ICFncm91cFYxSWQgfHwgZGVyaXZlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IHYxSWRCdWZmZXIgPSBCeXRlcy5mcm9tQmluYXJ5KGdyb3VwVjFJZCk7XG4gIGNvbnN0IG1hc3RlcktleUJ1ZmZlciA9IGRlcml2ZU1hc3RlcktleUZyb21Hcm91cFYxKHYxSWRCdWZmZXIpO1xuICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuICBjb25zdCBkZXJpdmVkR3JvdXBWMklkID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLmlkKTtcblxuICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICBkZXJpdmVkR3JvdXBWMklkLFxuICB9KTtcblxuICByZXR1cm4gdHJ1ZTtcbn1cblxudHlwZSBXcmFwcGVkR3JvdXBDaGFuZ2VUeXBlID0gUmVhZG9ubHk8e1xuICBiYXNlNjQ6IHN0cmluZztcbiAgaXNUcnVzdGVkOiBib29sZWFuO1xufT47XG5cbnR5cGUgTWlncmF0ZVByb3BzVHlwZSA9IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbDtcbiAgbmV3UmV2aXNpb24/OiBudW1iZXI7XG4gIHJlY2VpdmVkQXQ/OiBudW1iZXI7XG4gIHNlbnRBdD86IG51bWJlcjtcbiAgZ3JvdXBDaGFuZ2U/OiBXcmFwcGVkR3JvdXBDaGFuZ2VUeXBlO1xufT47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpc0dyb3VwRWxpZ2libGVUb01pZ3JhdGUoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbik6IFByb21pc2U8Ym9vbGVhbj4ge1xuICBpZiAoIWdldElzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IGFyZVdlTWVtYmVyID1cbiAgICAhY29udmVyc2F0aW9uLmdldCgnbGVmdCcpICYmIGNvbnZlcnNhdGlvbi5oYXNNZW1iZXIob3VyVXVpZCk7XG4gIGlmICghYXJlV2VNZW1iZXIpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBtZW1iZXJzID0gY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpIHx8IFtdO1xuICBmb3IgKGxldCBpID0gMCwgbWF4ID0gbWVtYmVycy5sZW5ndGg7IGkgPCBtYXg7IGkgKz0gMSkge1xuICAgIGNvbnN0IGlkZW50aWZpZXIgPSBtZW1iZXJzW2ldO1xuICAgIGNvbnN0IGNvbnRhY3QgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcik7XG5cbiAgICBpZiAoIWNvbnRhY3QpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKCFjb250YWN0LmdldCgndXVpZCcpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbik6IFByb21pc2U8e1xuICBkcm9wcGVkR1YyTWVtYmVySWRzOiBBcnJheTxzdHJpbmc+O1xuICBtZW1iZXJzVjI6IEFycmF5PEdyb3VwVjJNZW1iZXJUeXBlPjtcbiAgcGVuZGluZ01lbWJlcnNWMjogQXJyYXk8R3JvdXBWMlBlbmRpbmdNZW1iZXJUeXBlPjtcbiAgcHJldmlvdXNHcm91cFYxTWVtYmVyczogQXJyYXk8c3RyaW5nPjtcbn0+IHtcbiAgY29uc3QgbG9nSWQgPSBjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCk7XG4gIGNvbnN0IE1FTUJFUl9ST0xFX0VOVU0gPSBQcm90by5NZW1iZXIuUm9sZTtcblxuICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcbiAgaWYgKCFvdXJDb252ZXJzYXRpb25JZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMvJHtsb2dJZH06IENvdWxkbid0IGZldGNoIG91ciBvd24gY29udmVyc2F0aW9uSWQhYFxuICAgICk7XG4gIH1cblxuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgbGV0IGFyZVdlTWVtYmVyID0gZmFsc2U7XG4gIGxldCBhcmVXZUludml0ZWQgPSBmYWxzZTtcblxuICBjb25zdCBwcmV2aW91c0dyb3VwVjFNZW1iZXJzID0gY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpIHx8IFtdO1xuICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICBjb25zdCBtZW1iZXJMb29rdXA6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+ID0ge307XG4gIGNvbnN0IG1lbWJlcnNWMjogQXJyYXk8R3JvdXBWMk1lbWJlclR5cGU+ID0gY29tcGFjdChcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIHByZXZpb3VzR3JvdXBWMU1lbWJlcnMubWFwKGFzeW5jIGUxNjQgPT4ge1xuICAgICAgICBjb25zdCBjb250YWN0ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGUxNjQpO1xuXG4gICAgICAgIGlmICghY29udGFjdCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMvJHtsb2dJZH06IG1lbWJlcnNWMiAtIG1pc3NpbmcgbG9jYWwgY29udGFjdCBmb3IgJHtlMTY0fSwgc2tpcHBpbmcuYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc01lKGNvbnRhY3QuYXR0cmlidXRlcykgJiYgd2luZG93LkdWMl9NSUdSQVRJT05fRElTQUJMRV9BREQpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMvJHtsb2dJZH06IG1lbWJlcnNWMiAtIHNraXBwaW5nICR7ZTE2NH0gZHVlIHRvIEdWMl9NSUdSQVRJT05fRElTQUJMRV9BREQgZmxhZ2BcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGFjdFV1aWQgPSBjb250YWN0LmdldCgndXVpZCcpO1xuICAgICAgICBpZiAoIWNvbnRhY3RVdWlkKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZ2V0R3JvdXBNaWdyYXRpb25NZW1iZXJzLyR7bG9nSWR9OiBtZW1iZXJzVjIgLSBtaXNzaW5nIHV1aWQgZm9yICR7ZTE2NH0sIHNraXBwaW5nLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCFjb250YWN0LmdldCgncHJvZmlsZUtleScpKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZ2V0R3JvdXBNaWdyYXRpb25NZW1iZXJzLyR7bG9nSWR9OiBtZW1iZXJzVjIgLSBtaXNzaW5nIHByb2ZpbGVLZXkgZm9yIG1lbWJlciAke2UxNjR9LCBza2lwcGluZy5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGxldCBjYXBhYmlsaXRpZXMgPSBjb250YWN0LmdldCgnY2FwYWJpbGl0aWVzJyk7XG5cbiAgICAgICAgLy8gUmVmcmVzaCBvdXIgbG9jYWwgZGF0YSB0byBiZSBzdXJlXG4gICAgICAgIGlmIChcbiAgICAgICAgICAhY2FwYWJpbGl0aWVzPy5bJ2d2MS1taWdyYXRpb24nXSB8fFxuICAgICAgICAgICFjb250YWN0LmdldCgncHJvZmlsZUtleUNyZWRlbnRpYWwnKVxuICAgICAgICApIHtcbiAgICAgICAgICBhd2FpdCBjb250YWN0LmdldFByb2ZpbGVzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBjYXBhYmlsaXRpZXMgPSBjb250YWN0LmdldCgnY2FwYWJpbGl0aWVzJyk7XG4gICAgICAgIGlmICghY2FwYWJpbGl0aWVzPy5bJ2d2MS1taWdyYXRpb24nXSkge1xuICAgICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICAgYGdldEdyb3VwTWlncmF0aW9uTWVtYmVycy8ke2xvZ0lkfTogbWVtYmVyc1YyIC0gbWVtYmVyICR7ZTE2NH0gaXMgbWlzc2luZyBndjEtbWlncmF0aW9uIGNhcGFiaWxpdHksIHNraXBwaW5nLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY29udGFjdC5nZXQoJ3Byb2ZpbGVLZXlDcmVkZW50aWFsJykpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMvJHtsb2dJZH06IG1lbWJlcnNWMiAtIG5vIHByb2ZpbGVLZXlDcmVkZW50aWFsIGZvciAke2UxNjR9LCBza2lwcGluZy5gXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gY29udGFjdC5pZDtcblxuICAgICAgICBpZiAoY29udmVyc2F0aW9uSWQgPT09IG91ckNvbnZlcnNhdGlvbklkKSB7XG4gICAgICAgICAgYXJlV2VNZW1iZXIgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVtYmVyTG9va3VwW2NvbnZlcnNhdGlvbklkXSA9IHRydWU7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB1dWlkOiBjb250YWN0VXVpZCxcbiAgICAgICAgICByb2xlOiBNRU1CRVJfUk9MRV9FTlVNLkFETUlOSVNUUkFUT1IsXG4gICAgICAgICAgam9pbmVkQXRWZXJzaW9uOiAwLFxuICAgICAgICB9O1xuICAgICAgfSlcbiAgICApXG4gICk7XG5cbiAgY29uc3QgZHJvcHBlZEdWMk1lbWJlcklkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCBwZW5kaW5nTWVtYmVyc1YyOiBBcnJheTxHcm91cFYyUGVuZGluZ01lbWJlclR5cGU+ID0gY29tcGFjdChcbiAgICAocHJldmlvdXNHcm91cFYxTWVtYmVycyB8fCBbXSkubWFwKGUxNjQgPT4ge1xuICAgICAgY29uc3QgY29udGFjdCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChlMTY0KTtcblxuICAgICAgaWYgKCFjb250YWN0KSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgZ2V0R3JvdXBNaWdyYXRpb25NZW1iZXJzLyR7bG9nSWR9OiBwZW5kaW5nTWVtYmVyc1YyIC0gbWlzc2luZyBsb2NhbCBjb250YWN0IGZvciAke2UxNjR9LCBza2lwcGluZy5gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gY29udGFjdC5pZDtcbiAgICAgIC8vIElmIHdlJ3ZlIGFscmVhZHkgYWRkZWQgdGhpcyBjb250YWN0IGFib3ZlLCB3ZSdsbCBza2lwIGhlcmVcbiAgICAgIGlmIChtZW1iZXJMb29rdXBbY29udmVyc2F0aW9uSWRdKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKSAmJiB3aW5kb3cuR1YyX01JR1JBVElPTl9ESVNBQkxFX0lOVklURSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZ2V0R3JvdXBNaWdyYXRpb25NZW1iZXJzLyR7bG9nSWR9OiBwZW5kaW5nTWVtYmVyc1YyIC0gc2tpcHBpbmcgJHtlMTY0fSBkdWUgdG8gR1YyX01JR1JBVElPTl9ESVNBQkxFX0lOVklURSBmbGFnYFxuICAgICAgICApO1xuICAgICAgICBkcm9wcGVkR1YyTWVtYmVySWRzLnB1c2goY29udmVyc2F0aW9uSWQpO1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udGFjdFV1aWQgPSBjb250YWN0LmdldCgndXVpZCcpO1xuICAgICAgaWYgKCFjb250YWN0VXVpZCkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZ2V0R3JvdXBNaWdyYXRpb25NZW1iZXJzLyR7bG9nSWR9OiBwZW5kaW5nTWVtYmVyc1YyIC0gbWlzc2luZyB1dWlkIGZvciAke2UxNjR9LCBza2lwcGluZy5gXG4gICAgICAgICk7XG4gICAgICAgIGRyb3BwZWRHVjJNZW1iZXJJZHMucHVzaChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBjYXBhYmlsaXRpZXMgPSBjb250YWN0LmdldCgnY2FwYWJpbGl0aWVzJyk7XG4gICAgICBpZiAoIWNhcGFiaWxpdGllcz8uWydndjEtbWlncmF0aW9uJ10pIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGdldEdyb3VwTWlncmF0aW9uTWVtYmVycy8ke2xvZ0lkfTogcGVuZGluZ01lbWJlcnNWMiAtIG1lbWJlciAke2UxNjR9IGlzIG1pc3NpbmcgZ3YxLW1pZ3JhdGlvbiBjYXBhYmlsaXR5LCBza2lwcGluZy5gXG4gICAgICAgICk7XG4gICAgICAgIGRyb3BwZWRHVjJNZW1iZXJJZHMucHVzaChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoY29udmVyc2F0aW9uSWQgPT09IG91ckNvbnZlcnNhdGlvbklkKSB7XG4gICAgICAgIGFyZVdlSW52aXRlZCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHV1aWQ6IGNvbnRhY3RVdWlkLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgYWRkZWRCeVVzZXJJZDogb3VyVXVpZCxcbiAgICAgICAgcm9sZTogTUVNQkVSX1JPTEVfRU5VTS5BRE1JTklTVFJBVE9SLFxuICAgICAgfTtcbiAgICB9KVxuICApO1xuXG4gIGlmICghYXJlV2VNZW1iZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoYGdldEdyb3VwTWlncmF0aW9uTWVtYmVycy8ke2xvZ0lkfTogV2UgYXJlIG5vdCBhIG1lbWJlciFgKTtcbiAgfVxuICBpZiAoYXJlV2VJbnZpdGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBnZXRHcm91cE1pZ3JhdGlvbk1lbWJlcnMvJHtsb2dJZH06IFdlIGFyZSBpbnZpdGVkIWApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkcm9wcGVkR1YyTWVtYmVySWRzLFxuICAgIG1lbWJlcnNWMixcbiAgICBwZW5kaW5nTWVtYmVyc1YyLFxuICAgIHByZXZpb3VzR3JvdXBWMU1lbWJlcnMsXG4gIH07XG59XG5cbi8vIFRoaXMgaXMgY2FsbGVkIHdoZW4gdGhlIHVzZXIgY2hvb3NlcyB0byBtaWdyYXRlIGEgR3JvdXBWMS4gSXQgd2lsbCB1cGRhdGUgdGhlIHNlcnZlcixcbi8vICAgdGhlbiBsZXQgYWxsIG1lbWJlcnMga25vdyBhYm91dCB0aGUgbmV3IGdyb3VwLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYXRlTWlncmF0aW9uVG9Hcm91cFYyKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgLy8gRW5zdXJlIHdlIGhhdmUgdGhlIGNyZWRlbnRpYWxzIHdlIG5lZWQgYmVmb3JlIGF0dGVtcHRpbmcgR3JvdXBzVjIgb3BlcmF0aW9uc1xuICBhd2FpdCBtYXliZUZldGNoTmV3Q3JlZGVudGlhbHMoKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGNvbnZlcnNhdGlvbi5xdWV1ZUpvYignaW5pdGlhdGVNaWdyYXRpb25Ub0dyb3VwVjInLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBBQ0NFU1NfRU5VTSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG5cbiAgICAgIGNvbnN0IGlzRWxpZ2libGUgPSBpc0dyb3VwRWxpZ2libGVUb01pZ3JhdGUoY29udmVyc2F0aW9uKTtcbiAgICAgIGNvbnN0IHByZXZpb3VzR3JvdXBWMUlkID0gY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpO1xuXG4gICAgICBpZiAoIWlzRWxpZ2libGUgfHwgIXByZXZpb3VzR3JvdXBWMUlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgaW5pdGlhdGVNaWdyYXRpb25Ub0dyb3VwVjI6IGNvbnZlcnNhdGlvbiBpcyBub3QgZWxpZ2libGUgdG8gbWlncmF0ZSEgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncm91cFYxSWRCdWZmZXIgPSBCeXRlcy5mcm9tQmluYXJ5KHByZXZpb3VzR3JvdXBWMUlkKTtcbiAgICAgIGNvbnN0IG1hc3RlcktleUJ1ZmZlciA9IGRlcml2ZU1hc3RlcktleUZyb21Hcm91cFYxKGdyb3VwVjFJZEJ1ZmZlcik7XG4gICAgICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gICAgICBjb25zdCBncm91cElkID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLmlkKTtcbiAgICAgIGNvbnN0IGxvZ0lkID0gYGdyb3VwdjIoJHtncm91cElkfSlgO1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBpbml0aWF0ZU1pZ3JhdGlvblRvR3JvdXBWMi8ke2xvZ0lkfTogTWlncmF0aW5nIGZyb20gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWFzdGVyS2V5ID0gQnl0ZXMudG9CYXNlNjQobWFzdGVyS2V5QnVmZmVyKTtcbiAgICAgIGNvbnN0IHNlY3JldFBhcmFtcyA9IEJ5dGVzLnRvQmFzZTY0KGZpZWxkcy5zZWNyZXRQYXJhbXMpO1xuICAgICAgY29uc3QgcHVibGljUGFyYW1zID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLnB1YmxpY1BhcmFtcyk7XG5cbiAgICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbklkID1cbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcbiAgICAgIGlmICghb3VyQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbml0aWF0ZU1pZ3JhdGlvblRvR3JvdXBWMi8ke2xvZ0lkfTogQ291bGRuJ3QgZmV0Y2ggb3VyIG93biBjb252ZXJzYXRpb25JZCFgXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBvdXJDb252ZXJzYXRpb24gPVxuICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQob3VyQ29udmVyc2F0aW9uSWQpO1xuICAgICAgaWYgKCFvdXJDb252ZXJzYXRpb24pIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbml0aWF0ZU1pZ3JhdGlvblRvR3JvdXBWMi8ke2xvZ0lkfTogY2Fubm90IGdldCBvdXIgb3duIGNvbnZlcnNhdGlvbi4gQ2Fubm90IG1pZ3JhdGVgXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWVtYmVyc1YyLFxuICAgICAgICBwZW5kaW5nTWVtYmVyc1YyLFxuICAgICAgICBkcm9wcGVkR1YyTWVtYmVySWRzLFxuICAgICAgICBwcmV2aW91c0dyb3VwVjFNZW1iZXJzLFxuICAgICAgfSA9IGF3YWl0IGdldEdyb3VwTWlncmF0aW9uTWVtYmVycyhjb252ZXJzYXRpb24pO1xuXG4gICAgICBpZiAoXG4gICAgICAgIG1lbWJlcnNWMi5sZW5ndGggKyBwZW5kaW5nTWVtYmVyc1YyLmxlbmd0aCA+XG4gICAgICAgIGdldEdyb3VwU2l6ZUhhcmRMaW1pdCgpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgIGBpbml0aWF0ZU1pZ3JhdGlvblRvR3JvdXBWMi8ke2xvZ0lkfTogVG9vIG1hbnkgbWVtYmVycyEgTWVtYmVyIGNvdW50OiAke21lbWJlcnNWMi5sZW5ndGh9LCBQZW5kaW5nIG1lbWJlciBjb3VudDogJHtwZW5kaW5nTWVtYmVyc1YyLmxlbmd0aH1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIC8vIE5vdGU6IEEgZmV3IGdyb3VwIGVsZW1lbnRzIGRvbid0IG5lZWQgdG8gY2hhbmdlIGhlcmU6XG4gICAgICAvLyAgIC0gbmFtZVxuICAgICAgLy8gICAtIGV4cGlyZVRpbWVyXG4gICAgICBsZXQgYXZhdGFyQXR0cmlidXRlOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZVsnYXZhdGFyJ107XG4gICAgICBjb25zdCBhdmF0YXJQYXRoID0gY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMuYXZhdGFyPy5wYXRoO1xuICAgICAgaWYgKGF2YXRhclBhdGgpIHtcbiAgICAgICAgY29uc3QgeyBoYXNoLCBrZXkgfSA9IGF3YWl0IHVwbG9hZEF2YXRhcih7XG4gICAgICAgICAgbG9nSWQsXG4gICAgICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgICAgIHNlY3JldFBhcmFtcyxcbiAgICAgICAgICBwYXRoOiBhdmF0YXJQYXRoLFxuICAgICAgICB9KTtcbiAgICAgICAgYXZhdGFyQXR0cmlidXRlID0ge1xuICAgICAgICAgIHVybDoga2V5LFxuICAgICAgICAgIHBhdGg6IGF2YXRhclBhdGgsXG4gICAgICAgICAgaGFzaCxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3QXR0cmlidXRlcyA9IHtcbiAgICAgICAgLi4uY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsXG4gICAgICAgIGF2YXRhcjogYXZhdGFyQXR0cmlidXRlLFxuXG4gICAgICAgIC8vIENvcmUgR3JvdXBWMiBpbmZvXG4gICAgICAgIHJldmlzaW9uOiAwLFxuICAgICAgICBncm91cElkLFxuICAgICAgICBncm91cFZlcnNpb246IDIsXG4gICAgICAgIG1hc3RlcktleSxcbiAgICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgICBzZWNyZXRQYXJhbXMsXG5cbiAgICAgICAgLy8gR3JvdXBWMiBzdGF0ZVxuICAgICAgICBhY2Nlc3NDb250cm9sOiB7XG4gICAgICAgICAgYXR0cmlidXRlczogQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgICAgICAgIG1lbWJlcnM6IEFDQ0VTU19FTlVNLk1FTUJFUixcbiAgICAgICAgICBhZGRGcm9tSW52aXRlTGluazogQUNDRVNTX0VOVU0uVU5TQVRJU0ZJQUJMRSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVtYmVyc1YyLFxuICAgICAgICBwZW5kaW5nTWVtYmVyc1YyLFxuXG4gICAgICAgIC8vIENhcHR1cmUgcHJldmlvdXMgR3JvdXBWMSBkYXRhIGZvciBmdXR1cmUgdXNlXG4gICAgICAgIHByZXZpb3VzR3JvdXBWMUlkLFxuICAgICAgICBwcmV2aW91c0dyb3VwVjFNZW1iZXJzLFxuXG4gICAgICAgIC8vIENsZWFyIHN0b3JhZ2UgSUQsIHNpbmNlIHdlIG5lZWQgdG8gc3RhcnQgb3ZlciBvbiB0aGUgc3RvcmFnZSBzZXJ2aWNlXG4gICAgICAgIHN0b3JhZ2VJRDogdW5kZWZpbmVkLFxuXG4gICAgICAgIC8vIENsZWFyIG9ic29sZXRlIGRhdGFcbiAgICAgICAgZGVyaXZlZEdyb3VwVjJJZDogdW5kZWZpbmVkLFxuICAgICAgICBtZW1iZXJzOiB1bmRlZmluZWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBncm91cFByb3RvID0gYnVpbGRHcm91cFByb3RvKHtcbiAgICAgICAgLi4ubmV3QXR0cmlidXRlcyxcbiAgICAgICAgYXZhdGFyVXJsOiBhdmF0YXJBdHRyaWJ1dGU/LnVybCxcbiAgICAgIH0pO1xuXG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICAgICAgICBsb2dJZDogYGNyZWF0ZUdyb3VwLyR7bG9nSWR9YCxcbiAgICAgICAgICBwdWJsaWNQYXJhbXMsXG4gICAgICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgICAgIHJlcXVlc3Q6IChzZW5kZXIsIG9wdGlvbnMpID0+IHNlbmRlci5jcmVhdGVHcm91cChncm91cFByb3RvLCBvcHRpb25zKSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgYGluaXRpYXRlTWlncmF0aW9uVG9Hcm91cFYyLyR7bG9nSWR9OiBFcnJvciBjcmVhdGluZyBncm91cDpgLFxuICAgICAgICAgIGVycm9yLnN0YWNrXG4gICAgICAgICk7XG5cbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGdyb3VwQ2hhbmdlTWVzc2FnZXM6IEFycmF5PEdyb3VwQ2hhbmdlTWVzc2FnZVR5cGU+ID0gW107XG4gICAgICBncm91cENoYW5nZU1lc3NhZ2VzLnB1c2goe1xuICAgICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgICB0eXBlOiAnZ3JvdXAtdjEtbWlncmF0aW9uJyxcbiAgICAgICAgaW52aXRlZEdWMk1lbWJlcnM6IHBlbmRpbmdNZW1iZXJzVjIsXG4gICAgICAgIGRyb3BwZWRHVjJNZW1iZXJJZHMsXG4gICAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IHVwZGF0ZUdyb3VwKHtcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICB1cGRhdGVzOiB7XG4gICAgICAgICAgbmV3QXR0cmlidXRlcyxcbiAgICAgICAgICBncm91cENoYW5nZU1lc3NhZ2VzLFxuICAgICAgICAgIG1lbWJlcnM6IFtdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGlmICh3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmlzR3JvdXBCbG9ja2VkKHByZXZpb3VzR3JvdXBWMUlkKSkge1xuICAgICAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmFkZEJsb2NrZWRHcm91cChncm91cElkKTtcbiAgICAgIH1cblxuICAgICAgLy8gU2F2ZSB0aGVzZSBtb3N0IHJlY2VudCB1cGRhdGVzIHRvIGNvbnZlcnNhdGlvblxuICAgICAgdXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgICB9KTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zdCBsb2dJZCA9IGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKTtcbiAgICBpZiAoIWdldElzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cblxuICAgIGNvbnN0IGFscmVhZHlNaWdyYXRlZCA9IGF3YWl0IGhhc1YxR3JvdXBCZWVuTWlncmF0ZWQoY29udmVyc2F0aW9uKTtcbiAgICBpZiAoIWFscmVhZHlNaWdyYXRlZCkge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgaW5pdGlhdGVNaWdyYXRpb25Ub0dyb3VwVjIvJHtsb2dJZH06IEdyb3VwIGhhcyBub3QgYWxyZWFkeSBiZWVuIG1pZ3JhdGVkLCByZS10aHJvd2luZyBlcnJvcmBcbiAgICAgICk7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBhd2FpdCByZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uKHtcbiAgICAgIGNvbnZlcnNhdGlvbixcbiAgICB9KTtcblxuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGdyb3VwVjJJbmZvID0gY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKHtcbiAgICBpbmNsdWRlUGVuZGluZ01lbWJlcnM6IHRydWUsXG4gIH0pO1xuICBzdHJpY3RBc3NlcnQoZ3JvdXBWMkluZm8sICdtaXNzaW5nIGdyb3VwVjJJbmZvJyk7XG5cbiAgYXdhaXQgY29udmVyc2F0aW9uSm9iUXVldWUuYWRkKHtcbiAgICB0eXBlOiBjb252ZXJzYXRpb25RdWV1ZUpvYkVudW0uZW51bS5Hcm91cFVwZGF0ZSxcbiAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgIHJlY2lwaWVudHM6IGdyb3VwVjJJbmZvLm1lbWJlcnMsXG4gICAgcmV2aXNpb246IGdyb3VwVjJJbmZvLnJldmlzaW9uLFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhaXRUaGVuUmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbihcbiAgb3B0aW9uczogTWlncmF0ZVByb3BzVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIC8vIEZpcnN0IHdhaXQgdG8gcHJvY2VzcyBhbGwgaW5jb21pbmcgbWVzc2FnZXMgb24gdGhlIHdlYnNvY2tldFxuICBhd2FpdCB3aW5kb3cud2FpdEZvckVtcHR5RXZlbnRRdWV1ZSgpO1xuXG4gIC8vIFRoZW4gd2FpdCB0byBwcm9jZXNzIGFsbCBvdXRzdGFuZGluZyBtZXNzYWdlcyBmb3IgdGhpcyBjb252ZXJzYXRpb25cbiAgY29uc3QgeyBjb252ZXJzYXRpb24gfSA9IG9wdGlvbnM7XG5cbiAgYXdhaXQgY29udmVyc2F0aW9uLnF1ZXVlSm9iKCd3YWl0VGhlblJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIEFuZCBmaW5hbGx5IHRyeSB0byBtaWdyYXRlIHRoZSBncm91cFxuICAgICAgYXdhaXQgcmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbihvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgd2FpdFRoZW5SZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uLyR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfTogcmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbiBmYWlsdXJlOmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gYnVpbGRNaWdyYXRpb25CdWJibGUoXG4gIHByZXZpb3VzR3JvdXBWMU1lbWJlcnNJZHM6IEFycmF5PHN0cmluZz4sXG4gIG5ld0F0dHJpYnV0ZXM6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlXG4pOiBHcm91cENoYW5nZU1lc3NhZ2VUeXBlIHtcbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3VyQ29udmVyc2F0aW9uSWQoKTtcblxuICAvLyBBc3NlbWJsZSBpdGVtcyB0byBjb21tZW1vcmF0ZSB0aGlzIGV2ZW50IGZvciB0aGUgdGltZWxpbmUuLlxuICBjb25zdCBjb21iaW5lZENvbnZlcnNhdGlvbklkczogQXJyYXk8c3RyaW5nPiA9IFtcbiAgICAuLi4obmV3QXR0cmlidXRlcy5tZW1iZXJzVjIgfHwgW10pLm1hcChpdGVtID0+IGl0ZW0udXVpZCksXG4gICAgLi4uKG5ld0F0dHJpYnV0ZXMucGVuZGluZ01lbWJlcnNWMiB8fCBbXSkubWFwKGl0ZW0gPT4gaXRlbS51dWlkKSxcbiAgXS5tYXAodXVpZCA9PiB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIHV1aWQsXG4gICAgfSk7XG4gICAgc3RyaWN0QXNzZXJ0KGNvbnZlcnNhdGlvbklkLCBgQ29udmVyc2F0aW9uIG5vdCBmb3VuZCBmb3IgJHt1dWlkfWApO1xuICAgIHJldHVybiBjb252ZXJzYXRpb25JZDtcbiAgfSk7XG4gIGNvbnN0IGRyb3BwZWRNZW1iZXJJZHM6IEFycmF5PHN0cmluZz4gPSBkaWZmZXJlbmNlKFxuICAgIHByZXZpb3VzR3JvdXBWMU1lbWJlcnNJZHMsXG4gICAgY29tYmluZWRDb252ZXJzYXRpb25JZHNcbiAgKS5maWx0ZXIoaWQgPT4gaWQgJiYgaWQgIT09IG91ckNvbnZlcnNhdGlvbklkKTtcbiAgY29uc3QgaW52aXRlZE1lbWJlcnMgPSAobmV3QXR0cmlidXRlcy5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKS5maWx0ZXIoXG4gICAgaXRlbSA9PiBpdGVtLnV1aWQgIT09IG91clV1aWRcbiAgKTtcblxuICBjb25zdCBhcmVXZUludml0ZWQgPSAobmV3QXR0cmlidXRlcy5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKS5zb21lKFxuICAgIGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgIHR5cGU6ICdncm91cC12MS1taWdyYXRpb24nLFxuICAgIGdyb3VwTWlncmF0aW9uOiB7XG4gICAgICBhcmVXZUludml0ZWQsXG4gICAgICBpbnZpdGVkTWVtYmVycyxcbiAgICAgIGRyb3BwZWRNZW1iZXJJZHMsXG4gICAgfSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldEJhc2ljTWlncmF0aW9uQnViYmxlKCk6IEdyb3VwQ2hhbmdlTWVzc2FnZVR5cGUge1xuICByZXR1cm4ge1xuICAgIC4uLmdlbmVyYXRlQmFzaWNNZXNzYWdlKCksXG4gICAgdHlwZTogJ2dyb3VwLXYxLW1pZ3JhdGlvbicsXG4gICAgZ3JvdXBNaWdyYXRpb246IHtcbiAgICAgIGFyZVdlSW52aXRlZDogZmFsc2UsXG4gICAgICBpbnZpdGVkTWVtYmVyczogW10sXG4gICAgICBkcm9wcGVkTWVtYmVySWRzOiBbXSxcbiAgICB9LFxuICB9O1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gam9pbkdyb3VwVjJWaWFMaW5rQW5kTWlncmF0ZSh7XG4gIGFwcHJvdmFsUmVxdWlyZWQsXG4gIGNvbnZlcnNhdGlvbixcbiAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICByZXZpc2lvbixcbn06IHtcbiAgYXBwcm92YWxSZXF1aXJlZDogYm9vbGVhbjtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbDtcbiAgaW52aXRlTGlua1Bhc3N3b3JkOiBzdHJpbmc7XG4gIHJldmlzaW9uOiBudW1iZXI7XG59KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlzR3JvdXBWMSA9IGdldElzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gIGNvbnN0IHByZXZpb3VzR3JvdXBWMUlkID0gY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpO1xuXG4gIGlmICghaXNHcm91cFYxIHx8ICFwcmV2aW91c0dyb3VwVjFJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBqb2luR3JvdXBWMlZpYUxpbmtBbmRNaWdyYXRlOiBDb252ZXJzYXRpb24gaXMgbm90IEdyb3VwVjEhICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICApO1xuICB9XG5cbiAgLy8gRGVyaXZlIEdyb3VwVjIgZmllbGRzXG4gIGNvbnN0IGdyb3VwVjFJZEJ1ZmZlciA9IEJ5dGVzLmZyb21CaW5hcnkocHJldmlvdXNHcm91cFYxSWQpO1xuICBjb25zdCBtYXN0ZXJLZXlCdWZmZXIgPSBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShncm91cFYxSWRCdWZmZXIpO1xuICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gIGNvbnN0IGdyb3VwSWQgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuaWQpO1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cElkKTtcbiAgbG9nLmluZm8oXG4gICAgYGpvaW5Hcm91cFYyVmlhTGlua0FuZE1pZ3JhdGUvJHtsb2dJZH06IE1pZ3JhdGluZyBmcm9tICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgKTtcblxuICBjb25zdCBtYXN0ZXJLZXkgPSBCeXRlcy50b0Jhc2U2NChtYXN0ZXJLZXlCdWZmZXIpO1xuICBjb25zdCBzZWNyZXRQYXJhbXMgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuc2VjcmV0UGFyYW1zKTtcbiAgY29uc3QgcHVibGljUGFyYW1zID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLnB1YmxpY1BhcmFtcyk7XG5cbiAgLy8gQSBtaW5pLW1pZ3JhdGlvbiwgd2hpY2ggd2lsbCBub3Qgc2hvdyBkcm9wcGVkL2ludml0ZWQgbWVtYmVyc1xuICBjb25zdCBuZXdBdHRyaWJ1dGVzID0ge1xuICAgIC4uLmNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLFxuXG4gICAgLy8gQ29yZSBHcm91cFYyIGluZm9cbiAgICByZXZpc2lvbixcbiAgICBncm91cElkLFxuICAgIGdyb3VwVmVyc2lvbjogMixcbiAgICBtYXN0ZXJLZXksXG4gICAgcHVibGljUGFyYW1zLFxuICAgIHNlY3JldFBhcmFtcyxcbiAgICBncm91cEludml0ZUxpbmtQYXNzd29yZDogaW52aXRlTGlua1Bhc3N3b3JkLFxuXG4gICAgYWRkZWRCeTogdW5kZWZpbmVkLFxuICAgIGxlZnQ6IHRydWUsXG5cbiAgICAvLyBDYXB0dXJlIHByZXZpb3VzIEdyb3VwVjEgZGF0YSBmb3IgZnV0dXJlIHVzZVxuICAgIHByZXZpb3VzR3JvdXBWMUlkOiBjb252ZXJzYXRpb24uZ2V0KCdncm91cElkJyksXG4gICAgcHJldmlvdXNHcm91cFYxTWVtYmVyczogY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpLFxuXG4gICAgLy8gQ2xlYXIgc3RvcmFnZSBJRCwgc2luY2Ugd2UgbmVlZCB0byBzdGFydCBvdmVyIG9uIHRoZSBzdG9yYWdlIHNlcnZpY2VcbiAgICBzdG9yYWdlSUQ6IHVuZGVmaW5lZCxcblxuICAgIC8vIENsZWFyIG9ic29sZXRlIGRhdGFcbiAgICBkZXJpdmVkR3JvdXBWMklkOiB1bmRlZmluZWQsXG4gICAgbWVtYmVyczogdW5kZWZpbmVkLFxuICB9O1xuICBjb25zdCBncm91cENoYW5nZU1lc3NhZ2VzOiBBcnJheTxHcm91cENoYW5nZU1lc3NhZ2VUeXBlPiA9IFtcbiAgICB7XG4gICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgdHlwZTogJ2dyb3VwLXYxLW1pZ3JhdGlvbicsXG4gICAgICBncm91cE1pZ3JhdGlvbjoge1xuICAgICAgICBhcmVXZUludml0ZWQ6IGZhbHNlLFxuICAgICAgICBpbnZpdGVkTWVtYmVyczogW10sXG4gICAgICAgIGRyb3BwZWRNZW1iZXJJZHM6IFtdLFxuICAgICAgfSxcbiAgICB9LFxuICBdO1xuICBhd2FpdCB1cGRhdGVHcm91cCh7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIHVwZGF0ZXM6IHtcbiAgICAgIG5ld0F0dHJpYnV0ZXMsXG4gICAgICBncm91cENoYW5nZU1lc3NhZ2VzLFxuICAgICAgbWVtYmVyczogW10sXG4gICAgfSxcbiAgfSk7XG5cbiAgLy8gTm93IHRoaW5ncyBhcmUgc2V0IHVwLCBzbyB3ZSBjYW4gZ28gdGhyb3VnaCBub3JtYWwgY2hhbm5lbHNcbiAgYXdhaXQgY29udmVyc2F0aW9uLmpvaW5Hcm91cFYyVmlhTGluayh7XG4gICAgaW52aXRlTGlua1Bhc3N3b3JkLFxuICAgIGFwcHJvdmFsUmVxdWlyZWQsXG4gIH0pO1xufVxuXG4vLyBUaGlzIG1heSBiZSBjYWxsZWQgZnJvbSBzdG9yYWdlIHNlcnZpY2UsIGFuIG91dC1vZi1iYW5kIGNoZWNrLCBvciBhbiBpbmNvbWluZyBtZXNzYWdlLlxuLy8gICBJZiB0aGlzIGlzIGtpY2tlZCBvZmYgdmlhIGFuIGluY29taW5nIG1lc3NhZ2UsIHdlIHdhbnQgdG8gZG8gdGhlIHJpZ2h0IHRoaW5nIGFuZCBoaXRcbi8vICAgdGhlIGxvZyBlbmRwb2ludCAtIHRoZSBwYXJhbWV0ZXJzIGJleW9uZCBjb252ZXJzYXRpb24gYXJlIG5lZWRlZCBpbiB0aGF0IHNjZW5hcmlvLlxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24oe1xuICBjb252ZXJzYXRpb24sXG4gIGdyb3VwQ2hhbmdlLFxuICBuZXdSZXZpc2lvbixcbiAgcmVjZWl2ZWRBdCxcbiAgc2VudEF0LFxufTogTWlncmF0ZVByb3BzVHlwZSk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBFbnN1cmUgd2UgaGF2ZSB0aGUgY3JlZGVudGlhbHMgd2UgbmVlZCBiZWZvcmUgYXR0ZW1wdGluZyBHcm91cHNWMiBvcGVyYXRpb25zXG4gIGF3YWl0IG1heWJlRmV0Y2hOZXdDcmVkZW50aWFscygpO1xuXG4gIGNvbnN0IGlzR3JvdXBWMSA9IGdldElzR3JvdXBWMShjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gIGNvbnN0IHByZXZpb3VzR3JvdXBWMUlkID0gY29udmVyc2F0aW9uLmdldCgnZ3JvdXBJZCcpO1xuXG4gIGlmICghaXNHcm91cFYxIHx8ICFwcmV2aW91c0dyb3VwVjFJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGByZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uOiBDb252ZXJzYXRpb24gaXMgbm90IEdyb3VwVjEhICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICApO1xuICB9XG5cbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuICBjb25zdCB3ZXJlV2VQcmV2aW91c2x5QU1lbWJlciA9IGNvbnZlcnNhdGlvbi5oYXNNZW1iZXIob3VyVXVpZCk7XG5cbiAgLy8gRGVyaXZlIEdyb3VwVjIgZmllbGRzXG4gIGNvbnN0IGdyb3VwVjFJZEJ1ZmZlciA9IEJ5dGVzLmZyb21CaW5hcnkocHJldmlvdXNHcm91cFYxSWQpO1xuICBjb25zdCBtYXN0ZXJLZXlCdWZmZXIgPSBkZXJpdmVNYXN0ZXJLZXlGcm9tR3JvdXBWMShncm91cFYxSWRCdWZmZXIpO1xuICBjb25zdCBmaWVsZHMgPSBkZXJpdmVHcm91cEZpZWxkcyhtYXN0ZXJLZXlCdWZmZXIpO1xuXG4gIGNvbnN0IGdyb3VwSWQgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuaWQpO1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cElkKTtcbiAgbG9nLmluZm8oXG4gICAgYHJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24vJHtsb2dJZH06IE1pZ3JhdGluZyBmcm9tICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgKTtcblxuICBjb25zdCBtYXN0ZXJLZXkgPSBCeXRlcy50b0Jhc2U2NChtYXN0ZXJLZXlCdWZmZXIpO1xuICBjb25zdCBzZWNyZXRQYXJhbXMgPSBCeXRlcy50b0Jhc2U2NChmaWVsZHMuc2VjcmV0UGFyYW1zKTtcbiAgY29uc3QgcHVibGljUGFyYW1zID0gQnl0ZXMudG9CYXNlNjQoZmllbGRzLnB1YmxpY1BhcmFtcyk7XG5cbiAgY29uc3QgcHJldmlvdXNHcm91cFYxTWVtYmVycyA9IGNvbnZlcnNhdGlvbi5nZXQoJ21lbWJlcnMnKTtcbiAgY29uc3QgcHJldmlvdXNHcm91cFYxTWVtYmVyc0lkcyA9IGNvbnZlcnNhdGlvbi5nZXRNZW1iZXJJZHMoKTtcblxuICAvLyBTa2VsZXRvbiBvZiB0aGUgbmV3IGdyb3VwIHN0YXRlIC0gbm90IHVzZWZ1bCB1bnRpbCB3ZSBhZGQgdGhlIGdyb3VwJ3Mgc2VydmVyIHN0YXRlXG4gIGNvbnN0IGF0dHJpYnV0ZXMgPSB7XG4gICAgLi4uY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsXG5cbiAgICAvLyBDb3JlIEdyb3VwVjIgaW5mb1xuICAgIHJldmlzaW9uOiAwLFxuICAgIGdyb3VwSWQsXG4gICAgZ3JvdXBWZXJzaW9uOiAyLFxuICAgIG1hc3RlcktleSxcbiAgICBwdWJsaWNQYXJhbXMsXG4gICAgc2VjcmV0UGFyYW1zLFxuXG4gICAgLy8gQ2FwdHVyZSBwcmV2aW91cyBHcm91cFYxIGRhdGEgZm9yIGZ1dHVyZSB1c2VcbiAgICBwcmV2aW91c0dyb3VwVjFJZCxcbiAgICBwcmV2aW91c0dyb3VwVjFNZW1iZXJzLFxuXG4gICAgLy8gQ2xlYXIgc3RvcmFnZSBJRCwgc2luY2Ugd2UgbmVlZCB0byBzdGFydCBvdmVyIG9uIHRoZSBzdG9yYWdlIHNlcnZpY2VcbiAgICBzdG9yYWdlSUQ6IHVuZGVmaW5lZCxcblxuICAgIC8vIENsZWFyIG9ic29sZXRlIGRhdGFcbiAgICBkZXJpdmVkR3JvdXBWMklkOiB1bmRlZmluZWQsXG4gICAgbWVtYmVyczogdW5kZWZpbmVkLFxuICB9O1xuXG4gIGxldCBmaXJzdEdyb3VwU3RhdGU6IFByb3RvLklHcm91cCB8IG51bGwgfCB1bmRlZmluZWQ7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCByZXNwb25zZTogR3JvdXBMb2dSZXNwb25zZVR5cGUgPSBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICAgIGxvZ0lkOiBgZ2V0R3JvdXBMb2cvJHtsb2dJZH1gLFxuICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgcmVxdWVzdDogKHNlbmRlciwgb3B0aW9ucykgPT5cbiAgICAgICAgc2VuZGVyLmdldEdyb3VwTG9nKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHN0YXJ0VmVyc2lvbjogMCxcbiAgICAgICAgICAgIGluY2x1ZGVGaXJzdFN0YXRlOiB0cnVlLFxuICAgICAgICAgICAgaW5jbHVkZUxhc3RTdGF0ZTogZmFsc2UsXG4gICAgICAgICAgICBtYXhTdXBwb3J0ZWRDaGFuZ2VFcG9jaDogU1VQUE9SVEVEX0NIQU5HRV9FUE9DSCxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG9wdGlvbnNcbiAgICAgICAgKSxcbiAgICB9KTtcblxuICAgIC8vIEF0dGVtcHQgdG8gc3RhcnQgd2l0aCB0aGUgZmlyc3QgZ3JvdXAgc3RhdGUsIG9ubHkgbGF0ZXIgcHJvY2Vzc2luZyBmdXR1cmUgdXBkYXRlc1xuICAgIGZpcnN0R3JvdXBTdGF0ZSA9IHJlc3BvbnNlPy5jaGFuZ2VzPy5ncm91cENoYW5nZXM/LlswXT8uZ3JvdXBTdGF0ZTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gR1JPVVBfQUNDRVNTX0RFTklFRF9DT0RFKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYHJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24vJHtsb2dJZH06IEZhaWxlZCB0byBhY2Nlc3MgbG9nIGVuZHBvaW50OyBmZXRjaGluZyBmdWxsIGdyb3VwIHN0YXRlYFxuICAgICAgKTtcbiAgICAgIHRyeSB7XG4gICAgICAgIGZpcnN0R3JvdXBTdGF0ZSA9IGF3YWl0IG1ha2VSZXF1ZXN0V2l0aFRlbXBvcmFsUmV0cnkoe1xuICAgICAgICAgIGxvZ0lkOiBgZ2V0R3JvdXAvJHtsb2dJZH1gLFxuICAgICAgICAgIHB1YmxpY1BhcmFtcyxcbiAgICAgICAgICBzZWNyZXRQYXJhbXMsXG4gICAgICAgICAgcmVxdWVzdDogKHNlbmRlciwgb3B0aW9ucykgPT4gc2VuZGVyLmdldEdyb3VwKG9wdGlvbnMpLFxuICAgICAgICB9KTtcbiAgICAgIH0gY2F0Y2ggKHNlY29uZEVycm9yKSB7XG4gICAgICAgIGlmIChzZWNvbmRFcnJvci5jb2RlID09PSBHUk9VUF9BQ0NFU1NfREVOSUVEX0NPREUpIHtcbiAgICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAgIGByZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uLyR7bG9nSWR9OiBGYWlsZWQgdG8gYWNjZXNzIHN0YXRlIGVuZHBvaW50OyB1c2VyIGlzIG5vIGxvbmdlciBwYXJ0IG9mIGdyb3VwYFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBpZiAod2luZG93LnN0b3JhZ2UuYmxvY2tlZC5pc0dyb3VwQmxvY2tlZChwcmV2aW91c0dyb3VwVjFJZCkpIHtcbiAgICAgICAgICAgIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuYWRkQmxvY2tlZEdyb3VwKGdyb3VwSWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICh3ZXJlV2VQcmV2aW91c2x5QU1lbWJlcikge1xuICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgIGByZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uLyR7bG9nSWR9OiBVcGdyYWRpbmcgZ3JvdXAgd2l0aCBtaWdyYXRpb24vcmVtb3ZlZCBldmVudHNgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uc3Qgb3VyTnVtYmVyID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgICAgICAgICAgYXdhaXQgdXBkYXRlR3JvdXAoe1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgICAgICAgIHJlY2VpdmVkQXQsXG4gICAgICAgICAgICAgIHNlbnRBdCxcbiAgICAgICAgICAgICAgdXBkYXRlczoge1xuICAgICAgICAgICAgICAgIG5ld0F0dHJpYnV0ZXM6IHtcbiAgICAgICAgICAgICAgICAgIC8vIEJlY2F1c2Ugd2UncmUgdXNpbmcgYXR0cmlidXRlcyBoZXJlLCB3ZSB1cGdyYWRlIHRoaXMgdG8gYSB2MiBncm91cFxuICAgICAgICAgICAgICAgICAgLi4uYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICAgIGFkZGVkQnk6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICAgIGxlZnQ6IHRydWUsXG4gICAgICAgICAgICAgICAgICBtZW1iZXJzOiAoY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpIHx8IFtdKS5maWx0ZXIoXG4gICAgICAgICAgICAgICAgICAgIGl0ZW0gPT4gaXRlbSAhPT0gb3VyVXVpZCAmJiBpdGVtICE9PSBvdXJOdW1iZXJcbiAgICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBncm91cENoYW5nZU1lc3NhZ2VzOiBbXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIC4uLmdldEJhc2ljTWlncmF0aW9uQnViYmxlKCksXG4gICAgICAgICAgICAgICAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgICAgICAgICAgICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgICAgLi4uZ2VuZXJhdGVCYXNpY01lc3NhZ2UoKSxcbiAgICAgICAgICAgICAgICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScsXG4gICAgICAgICAgICAgICAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgICAgICAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyBhcyBjb25zdCxcbiAgICAgICAgICAgICAgICAgICAgICAgICAgdXVpZDogb3VyVXVpZCxcbiAgICAgICAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgICAgICAgICAgICAgICBzZWVuU3RhdHVzOiBTZWVuU3RhdHVzLlVuc2VlbixcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBtZW1iZXJzOiBbXSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYHJlc3BvbmRUb0dyb3VwVjJNaWdyYXRpb24vJHtsb2dJZH06IFVwZ3JhZGluZyBncm91cCB3aXRoIG1pZ3JhdGlvbiBldmVudDsgbm8gcmVtb3ZlZCBldmVudGBcbiAgICAgICAgICApO1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUdyb3VwKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgIHJlY2VpdmVkQXQsXG4gICAgICAgICAgICBzZW50QXQsXG4gICAgICAgICAgICB1cGRhdGVzOiB7XG4gICAgICAgICAgICAgIG5ld0F0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAuLi5nZXRCYXNpY01pZ3JhdGlvbkJ1YmJsZSgpLFxuICAgICAgICAgICAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgICAgICAgICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIG1lbWJlcnM6IFtdLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgdGhyb3cgc2Vjb25kRXJyb3I7XG4gICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuICBpZiAoIWZpcnN0R3JvdXBTdGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGByZXNwb25kVG9Hcm91cFYyTWlncmF0aW9uLyR7bG9nSWR9OiBDb3VsZG4ndCBnZXQgYSBmaXJzdCBncm91cCBzdGF0ZSFgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGdyb3VwU3RhdGUgPSBkZWNyeXB0R3JvdXBTdGF0ZShcbiAgICBmaXJzdEdyb3VwU3RhdGUsXG4gICAgYXR0cmlidXRlcy5zZWNyZXRQYXJhbXMsXG4gICAgbG9nSWRcbiAgKTtcbiAgY29uc3QgeyBuZXdBdHRyaWJ1dGVzLCBuZXdQcm9maWxlS2V5cyB9ID0gYXdhaXQgYXBwbHlHcm91cFN0YXRlKHtcbiAgICBncm91cDogYXR0cmlidXRlcyxcbiAgICBncm91cFN0YXRlLFxuICB9KTtcblxuICAvLyBHZW5lcmF0ZSBub3RpZmljYXRpb25zIGludG8gdGhlIHRpbWVsaW5lXG4gIGNvbnN0IGdyb3VwQ2hhbmdlTWVzc2FnZXM6IEFycmF5PEdyb3VwQ2hhbmdlTWVzc2FnZVR5cGU+ID0gW107XG5cbiAgZ3JvdXBDaGFuZ2VNZXNzYWdlcy5wdXNoKHtcbiAgICAuLi5idWlsZE1pZ3JhdGlvbkJ1YmJsZShwcmV2aW91c0dyb3VwVjFNZW1iZXJzSWRzLCBuZXdBdHRyaWJ1dGVzKSxcbiAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICB9KTtcblxuICBjb25zdCBhcmVXZUludml0ZWQgPSAobmV3QXR0cmlidXRlcy5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKS5zb21lKFxuICAgIGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkXG4gICk7XG4gIGNvbnN0IGFyZVdlTWVtYmVyID0gKG5ld0F0dHJpYnV0ZXMubWVtYmVyc1YyIHx8IFtdKS5zb21lKFxuICAgIGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkXG4gICk7XG4gIGlmICghYXJlV2VJbnZpdGVkICYmICFhcmVXZU1lbWJlcikge1xuICAgIC8vIEFkZCBhIG1lc3NhZ2UgdG8gdGhlIHRpbWVsaW5lIHNheWluZyB0aGUgdXNlciB3YXMgcmVtb3ZlZC4gVGhpcyBzaG91bGRuJ3QgaGFwcGVuLlxuICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXMucHVzaCh7XG4gICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScsXG4gICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnbWVtYmVyLXJlbW92ZScgYXMgY29uc3QsXG4gICAgICAgICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgfSk7XG4gIH1cblxuICAvLyBUaGlzIGJ1ZmZlciBlbnN1cmVzIHRoYXQgYWxsIG1pZ3JhdGlvbi1yZWxhdGVkIG1lc3NhZ2VzIGFyZSBzb3J0ZWQgYWJvdmVcbiAgLy8gICBhbnkgaW5pdGlhdGluZyBtZXNzYWdlLiBXZSBuZWVkIHRvIGRvIHRoaXMgYmVjYXVzZSBncm91cENoYW5nZU1lc3NhZ2VzIGFyZVxuICAvLyAgIGFscmVhZHkgc29ydGVkIHZpYSB1cGRhdGVzIHRvIHNlbnRBdCBpbnNpZGUgb2YgdXBkYXRlR3JvdXAoKS5cbiAgY29uc3QgU09SVF9CVUZGRVIgPSAxMDAwO1xuICBhd2FpdCB1cGRhdGVHcm91cCh7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIHJlY2VpdmVkQXQsXG4gICAgc2VudEF0OiBzZW50QXQgPyBzZW50QXQgLSBTT1JUX0JVRkZFUiA6IHVuZGVmaW5lZCxcbiAgICB1cGRhdGVzOiB7XG4gICAgICBuZXdBdHRyaWJ1dGVzLFxuICAgICAgZ3JvdXBDaGFuZ2VNZXNzYWdlcyxcbiAgICAgIG1lbWJlcnM6IHByb2ZpbGVLZXlzVG9NZW1iZXJzKG5ld1Byb2ZpbGVLZXlzKSxcbiAgICB9LFxuICB9KTtcblxuICBpZiAod2luZG93LnN0b3JhZ2UuYmxvY2tlZC5pc0dyb3VwQmxvY2tlZChwcmV2aW91c0dyb3VwVjFJZCkpIHtcbiAgICB3aW5kb3cuc3RvcmFnZS5ibG9ja2VkLmFkZEJsb2NrZWRHcm91cChncm91cElkKTtcbiAgfVxuXG4gIC8vIFNhdmUgdGhlc2UgbW9zdCByZWNlbnQgdXBkYXRlcyB0byBjb252ZXJzYXRpb25cbiAgdXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICAvLyBGaW5hbGx5LCBjaGVjayBmb3IgYW55IGNoYW5nZXMgdG8gdGhlIGdyb3VwIHNpbmNlIGl0cyBpbml0aWFsIGNyZWF0aW9uIHVzaW5nIG5vcm1hbFxuICAvLyAgIGdyb3VwIHVwZGF0ZSBjb2RlcGF0aHMuXG4gIGF3YWl0IG1heWJlVXBkYXRlR3JvdXAoe1xuICAgIGNvbnZlcnNhdGlvbixcbiAgICBncm91cENoYW5nZSxcbiAgICBuZXdSZXZpc2lvbixcbiAgICByZWNlaXZlZEF0LFxuICAgIHNlbnRBdCxcbiAgfSk7XG59XG5cbi8vIEZldGNoaW5nIGFuZCBhcHBseWluZyBncm91cCBjaGFuZ2VzXG5cbnR5cGUgTWF5YmVVcGRhdGVQcm9wc1R5cGUgPSBSZWFkb25seTx7XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWw7XG4gIG5ld1JldmlzaW9uPzogbnVtYmVyO1xuICByZWNlaXZlZEF0PzogbnVtYmVyO1xuICBzZW50QXQ/OiBudW1iZXI7XG4gIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2U/OiBib29sZWFuO1xuICBmb3JjZT86IGJvb2xlYW47XG4gIGdyb3VwQ2hhbmdlPzogV3JhcHBlZEdyb3VwQ2hhbmdlVHlwZTtcbn0+O1xuXG5jb25zdCBGSVZFX01JTlVURVMgPSA1ICogZHVyYXRpb25zLk1JTlVURTtcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdhaXRUaGVuTWF5YmVVcGRhdGVHcm91cChcbiAgb3B0aW9uczogTWF5YmVVcGRhdGVQcm9wc1R5cGUsXG4gIHsgdmlhRmlyc3RTdG9yYWdlU3luYyA9IGZhbHNlIH0gPSB7fVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHsgY29udmVyc2F0aW9uIH0gPSBvcHRpb25zO1xuXG4gIGlmIChjb252ZXJzYXRpb24uaXNCbG9ja2VkKCkpIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGB3YWl0VGhlbk1heWJlVXBkYXRlR3JvdXA6IEdyb3VwICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBibG9ja2VkLCByZXR1cm5pbmcgZWFybHlgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBGaXJzdCB3YWl0IHRvIHByb2Nlc3MgYWxsIGluY29taW5nIG1lc3NhZ2VzIG9uIHRoZSB3ZWJzb2NrZXRcbiAgYXdhaXQgd2luZG93LndhaXRGb3JFbXB0eUV2ZW50UXVldWUoKTtcblxuICAvLyBUaGVuIG1ha2Ugc3VyZSB3ZSBoYXZlbid0IGZldGNoZWQgdGhpcyBncm91cCB0b28gcmVjZW50bHlcbiAgY29uc3QgeyBsYXN0U3VjY2Vzc2Z1bEdyb3VwRmV0Y2ggPSAwIH0gPSBjb252ZXJzYXRpb247XG4gIGlmIChcbiAgICAhb3B0aW9ucy5mb3JjZSAmJlxuICAgIGlzTW9yZVJlY2VudFRoYW4obGFzdFN1Y2Nlc3NmdWxHcm91cEZldGNoLCBGSVZFX01JTlVURVMpXG4gICkge1xuICAgIGNvbnN0IHdhaXRUaW1lID0gbGFzdFN1Y2Nlc3NmdWxHcm91cEZldGNoICsgRklWRV9NSU5VVEVTIC0gRGF0ZS5ub3coKTtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGB3YWl0VGhlbk1heWJlVXBkYXRlR3JvdXAvJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9OiBncm91cCB1cGRhdGUgYCArXG4gICAgICAgIGB3YXMgZmV0Y2hlZCByZWNlbnRseSwgc2tpcHBpbmcgZm9yICR7d2FpdFRpbWV9bXNgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGVuIHdhaXQgdG8gcHJvY2VzcyBhbGwgb3V0c3RhbmRpbmcgbWVzc2FnZXMgZm9yIHRoaXMgY29udmVyc2F0aW9uXG4gIGF3YWl0IGNvbnZlcnNhdGlvbi5xdWV1ZUpvYignd2FpdFRoZW5NYXliZVVwZGF0ZUdyb3VwJywgYXN5bmMgKCkgPT4ge1xuICAgIHRyeSB7XG4gICAgICAvLyBBbmQgZmluYWxseSB0cnkgdG8gdXBkYXRlIHRoZSBncm91cFxuICAgICAgYXdhaXQgbWF5YmVVcGRhdGVHcm91cChvcHRpb25zLCB7IHZpYUZpcnN0U3RvcmFnZVN5bmMgfSk7XG5cbiAgICAgIGNvbnZlcnNhdGlvbi5sYXN0U3VjY2Vzc2Z1bEdyb3VwRmV0Y2ggPSBEYXRlLm5vdygpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGB3YWl0VGhlbk1heWJlVXBkYXRlR3JvdXAvJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9OiBtYXliZVVwZGF0ZUdyb3VwIGZhaWx1cmU6YCxcbiAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYXliZVVwZGF0ZUdyb3VwKFxuICB7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2UsXG4gICAgZ3JvdXBDaGFuZ2UsXG4gICAgbmV3UmV2aXNpb24sXG4gICAgcmVjZWl2ZWRBdCxcbiAgICBzZW50QXQsXG4gIH06IE1heWJlVXBkYXRlUHJvcHNUeXBlLFxuICB7IHZpYUZpcnN0U3RvcmFnZVN5bmMgPSBmYWxzZSB9ID0ge31cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBsb2dJZCA9IGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKTtcblxuICB0cnkge1xuICAgIC8vIEVuc3VyZSB3ZSBoYXZlIHRoZSBjcmVkZW50aWFscyB3ZSBuZWVkIGJlZm9yZSBhdHRlbXB0aW5nIEdyb3Vwc1YyIG9wZXJhdGlvbnNcbiAgICBhd2FpdCBtYXliZUZldGNoTmV3Q3JlZGVudGlhbHMoKTtcblxuICAgIGNvbnN0IHVwZGF0ZXMgPSBhd2FpdCBnZXRHcm91cFVwZGF0ZXMoe1xuICAgICAgZ3JvdXA6IGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLFxuICAgICAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0OiB3aW5kb3cuZ2V0U2VydmVyUHVibGljUGFyYW1zKCksXG4gICAgICBuZXdSZXZpc2lvbixcbiAgICAgIGdyb3VwQ2hhbmdlLFxuICAgICAgZHJvcEluaXRpYWxKb2luTWVzc2FnZSxcbiAgICB9KTtcblxuICAgIGF3YWl0IHVwZGF0ZUdyb3VwKFxuICAgICAgeyBjb252ZXJzYXRpb24sIHJlY2VpdmVkQXQsIHNlbnRBdCwgdXBkYXRlcyB9LFxuICAgICAgeyB2aWFGaXJzdFN0b3JhZ2VTeW5jIH1cbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgIGBtYXliZVVwZGF0ZUdyb3VwLyR7bG9nSWR9OiBGYWlsZWQgdG8gdXBkYXRlIGdyb3VwOmAsXG4gICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZUdyb3VwKFxuICB7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIHJlY2VpdmVkQXQsXG4gICAgc2VudEF0LFxuICAgIHVwZGF0ZXMsXG4gIH06IHtcbiAgICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsO1xuICAgIHJlY2VpdmVkQXQ/OiBudW1iZXI7XG4gICAgc2VudEF0PzogbnVtYmVyO1xuICAgIHVwZGF0ZXM6IFVwZGF0ZXNSZXN1bHRUeXBlO1xuICB9LFxuICB7IHZpYUZpcnN0U3RvcmFnZVN5bmMgPSBmYWxzZSB9ID0ge31cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBsb2dJZCA9IGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKTtcblxuICBjb25zdCB7IG5ld0F0dHJpYnV0ZXMsIGdyb3VwQ2hhbmdlTWVzc2FnZXMsIG1lbWJlcnMgfSA9IHVwZGF0ZXM7XG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpO1xuXG4gIGNvbnN0IHN0YXJ0aW5nUmV2aXNpb24gPSBjb252ZXJzYXRpb24uZ2V0KCdyZXZpc2lvbicpO1xuICBjb25zdCBlbmRpbmdSZXZpc2lvbiA9IG5ld0F0dHJpYnV0ZXMucmV2aXNpb247XG5cbiAgY29uc3Qgd2FzTWVtYmVyT3JQZW5kaW5nID1cbiAgICBjb252ZXJzYXRpb24uaGFzTWVtYmVyKG91clV1aWQpIHx8IGNvbnZlcnNhdGlvbi5pc01lbWJlclBlbmRpbmcob3VyVXVpZCk7XG4gIGNvbnN0IGlzTWVtYmVyT3JQZW5kaW5nID1cbiAgICAhbmV3QXR0cmlidXRlcy5sZWZ0IHx8XG4gICAgbmV3QXR0cmlidXRlcy5wZW5kaW5nTWVtYmVyc1YyPy5zb21lKGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkKTtcbiAgY29uc3QgaXNNZW1iZXJPclBlbmRpbmdPckF3YWl0aW5nQXBwcm92YWwgPVxuICAgIGlzTWVtYmVyT3JQZW5kaW5nIHx8XG4gICAgbmV3QXR0cmlidXRlcy5wZW5kaW5nQWRtaW5BcHByb3ZhbFYyPy5zb21lKGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkKTtcblxuICBjb25zdCBpc0luaXRpYWxEYXRhRmV0Y2ggPVxuICAgICFpc051bWJlcihzdGFydGluZ1JldmlzaW9uKSAmJiBpc051bWJlcihlbmRpbmdSZXZpc2lvbik7XG5cbiAgLy8gRW5zdXJlIHRoYXQgYWxsIGdlbmVyYXRlZCBtZXNzYWdlcyBhcmUgb3JkZXJlZCBwcm9wZXJseS5cbiAgLy8gQmVmb3JlIHRoZSBwcm92aWRlZCB0aW1lc3RhbXAgc28gdXBkYXRlIG1lc3NhZ2VzIGFwcGVhciBiZWZvcmUgdGhlXG4gIC8vICAgaW5pdGlhdGluZyBtZXNzYWdlLCBvciBhZnRlciBub3coKS5cbiAgY29uc3QgZmluYWxSZWNlaXZlZEF0ID1cbiAgICByZWNlaXZlZEF0IHx8IHdpbmRvdy5TaWduYWwuVXRpbC5pbmNyZW1lbnRNZXNzYWdlQ291bnRlcigpO1xuICBjb25zdCBpbml0aWFsU2VudEF0ID0gc2VudEF0IHx8IERhdGUubm93KCk7XG5cbiAgLy8gR3JvdXBWMSAtPiBHcm91cFYyIG1pZ3JhdGlvbiBjaGFuZ2VzIHRoZSBncm91cElkLCBhbmQgd2UgbmVlZCB0byB1cGRhdGUgb3VyIGlkLWJhc2VkXG4gIC8vICAgbG9va3VwcyBpZiB0aGVyZSdzIGEgY2hhbmdlIG9uIHRoYXQgZmllbGQuXG4gIGNvbnN0IHByZXZpb3VzSWQgPSBjb252ZXJzYXRpb24uZ2V0KCdncm91cElkJyk7XG4gIGNvbnN0IGlkQ2hhbmdlZCA9IHByZXZpb3VzSWQgJiYgcHJldmlvdXNJZCAhPT0gbmV3QXR0cmlidXRlcy5ncm91cElkO1xuXG4gIC8vIEJ5IHVwZGF0aW5nIGFjdGl2ZUF0IHdlIGZvcmNlIHRoaXMgY29udmVyc2F0aW9uIGludG8gdGhlIGxlZnQgcGFuZSBpZiB0aGlzIGlzIHRoZVxuICAvLyAgIGZpcnN0IHRpbWUgd2UndmUgZmV0Y2hlZCBkYXRhIGFib3V0IGl0LCBhbmQgd2Ugd2VyZSBhYmxlIHRvIGZldGNoIGl0cyBuYW1lLiBOb2JvZHlcbiAgLy8gICBsaWtlcyB0byBzZWUgVW5rbm93biBHcm91cCBpbiB0aGUgbGVmdCBwYW5lLiBBZnRlciBmaXJzdCBmZXRjaCwgd2UgcmVseSBvbiBub3JtYWxcbiAgLy8gICBtZXNzYWdlIGFjdGl2aXR5IChpbmNsdWRpbmcgZ3JvdXAgY2hhbmdlIG1lc3NzYWdlcykgdG8gc2V0IHRoZSB0aW1lc3RhbXAgcHJvcGVybHkuXG4gIGxldCBhY3RpdmVBdCA9IGNvbnZlcnNhdGlvbi5nZXQoJ2FjdGl2ZV9hdCcpIHx8IG51bGw7XG4gIGlmIChcbiAgICAhdmlhRmlyc3RTdG9yYWdlU3luYyAmJlxuICAgIGlzTWVtYmVyT3JQZW5kaW5nT3JBd2FpdGluZ0FwcHJvdmFsICYmXG4gICAgaXNJbml0aWFsRGF0YUZldGNoICYmXG4gICAgbmV3QXR0cmlidXRlcy5uYW1lXG4gICkge1xuICAgIGFjdGl2ZUF0ID0gaW5pdGlhbFNlbnRBdDtcbiAgfVxuXG4gIC8vIFNhdmUgYWxsIHN5bnRoZXRpYyBtZXNzYWdlcyBkZXNjcmliaW5nIGdyb3VwIGNoYW5nZXNcbiAgbGV0IHN5bnRoZXRpY1NlbnRBdCA9IGluaXRpYWxTZW50QXQgLSAoZ3JvdXBDaGFuZ2VNZXNzYWdlcy5sZW5ndGggKyAxKTtcbiAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgY29uc3QgY2hhbmdlTWVzc2FnZXNUb1NhdmUgPSBncm91cENoYW5nZU1lc3NhZ2VzLm1hcChjaGFuZ2VNZXNzYWdlID0+IHtcbiAgICAvLyBXZSBkbyB0aGlzIHRvIHByZXNlcnZlIHRoZSBvcmRlciBvZiB0aGUgdGltZWxpbmUuIFdlIG9ubHkgdXBkYXRlIHNlbnRBdCB0byBlbnN1cmVcbiAgICAvLyAgIHRoYXQgd2UgZG9uJ3Qgc3RvbXAgb24gbWVzc2FnZXMgcmVjZWl2ZWQgYXJvdW5kIHRoZSBzYW1lIHRpbWUgYXMgdGhlIG1lc3NhZ2VcbiAgICAvLyAgIHdoaWNoIGluaXRpYXRlZCB0aGlzIGdyb3VwIGZldGNoIGFuZCBpbi1jb252ZXJzYXRpb24gbWVzc2FnZXMuXG4gICAgc3ludGhldGljU2VudEF0ICs9IDE7XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uY2hhbmdlTWVzc2FnZSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICByZWNlaXZlZF9hdDogZmluYWxSZWNlaXZlZEF0LFxuICAgICAgcmVjZWl2ZWRfYXRfbXM6IHN5bnRoZXRpY1NlbnRBdCxcbiAgICAgIHNlbnRfYXQ6IHN5bnRoZXRpY1NlbnRBdCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9KTtcblxuICBjb25zdCBjb250YWN0c1dpdGhvdXRQcm9maWxlS2V5ID0gbmV3IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPigpO1xuXG4gIC8vIENhcHR1cmUgcHJvZmlsZSBrZXkgZm9yIGVhY2ggbWVtYmVyIGluIHRoZSBncm91cCwgaWYgd2UgZG9uJ3QgaGF2ZSBpdCB5ZXRcbiAgbWVtYmVycy5mb3JFYWNoKG1lbWJlciA9PiB7XG4gICAgY29uc3QgY29udGFjdCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKFxuICAgICAgbWVtYmVyLnV1aWQsXG4gICAgICAncHJpdmF0ZSdcbiAgICApO1xuXG4gICAgaWYgKFxuICAgICAgIWlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKSAmJlxuICAgICAgbWVtYmVyLnByb2ZpbGVLZXkgJiZcbiAgICAgIG1lbWJlci5wcm9maWxlS2V5Lmxlbmd0aCA+IDAgJiZcbiAgICAgIGNvbnRhY3QuZ2V0KCdwcm9maWxlS2V5JykgIT09IG1lbWJlci5wcm9maWxlS2V5XG4gICAgKSB7XG4gICAgICBjb250YWN0c1dpdGhvdXRQcm9maWxlS2V5LnB1c2goY29udGFjdCk7XG4gICAgICBjb250YWN0LnNldFByb2ZpbGVLZXkobWVtYmVyLnByb2ZpbGVLZXkpO1xuICAgIH1cbiAgfSk7XG5cbiAgbGV0IHByb2ZpbGVGZXRjaGVzOiBQcm9taXNlPEFycmF5PHZvaWQ+PiB8IHVuZGVmaW5lZDtcbiAgaWYgKGNvbnRhY3RzV2l0aG91dFByb2ZpbGVLZXkubGVuZ3RoICE9PSAwKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgdXBkYXRlR3JvdXAvJHtsb2dJZH06IGZldGNoaW5nIGAgK1xuICAgICAgICBgJHtjb250YWN0c1dpdGhvdXRQcm9maWxlS2V5Lmxlbmd0aH0gbWlzc2luZyBwcm9maWxlc2BcbiAgICApO1xuXG4gICAgY29uc3QgcHJvZmlsZUZldGNoUXVldWUgPSBuZXcgUFF1ZXVlKHtcbiAgICAgIGNvbmN1cnJlbmN5OiAzLFxuICAgIH0pO1xuICAgIHByb2ZpbGVGZXRjaGVzID0gcHJvZmlsZUZldGNoUXVldWUuYWRkQWxsKFxuICAgICAgY29udGFjdHNXaXRob3V0UHJvZmlsZUtleS5tYXAoY29udGFjdCA9PiAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGl2ZSA9IGNvbnRhY3QuZ2V0QWN0aXZlUHJvZmlsZUZldGNoKCk7XG4gICAgICAgIHJldHVybiBhY3RpdmUgfHwgY29udGFjdC5nZXRQcm9maWxlcygpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgaWYgKGNoYW5nZU1lc3NhZ2VzVG9TYXZlLmxlbmd0aCA+IDApIHtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgcHJvZmlsZUZldGNoZXM7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYHVwZGF0ZUdyb3VwLyR7bG9nSWR9OiBmYWlsZWQgdG8gZmV0Y2ggbWlzc2luZyBwcm9maWxlc2AsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICAgIGF3YWl0IGFwcGVuZENoYW5nZU1lc3NhZ2VzKGNvbnZlcnNhdGlvbiwgY2hhbmdlTWVzc2FnZXNUb1NhdmUpO1xuICB9XG5cbiAgLy8gV2UgdXBkYXRlIGdyb3VwIG1lbWJlcnNoaXAgbGFzdCB0byBlbnN1cmUgdGhhdCBhbGwgbm90aWZpY2F0aW9ucyBhcmUgaW4gcGxhY2UgYmVmb3JlXG4gIC8vICAgdGhlIGdyb3VwIHVwZGF0ZXMgaGFwcGVuIG9uIHRoZSBtb2RlbC5cblxuICBjb252ZXJzYXRpb24uc2V0KHtcbiAgICAuLi5uZXdBdHRyaWJ1dGVzLFxuICAgIGFjdGl2ZV9hdDogYWN0aXZlQXQsXG4gICAgdGVtcG9yYXJ5TWVtYmVyQ291bnQ6ICFuZXdBdHRyaWJ1dGVzLmxlZnRcbiAgICAgID8gdW5kZWZpbmVkXG4gICAgICA6IG5ld0F0dHJpYnV0ZXMudGVtcG9yYXJ5TWVtYmVyQ291bnQsXG4gIH0pO1xuXG4gIGlmIChpZENoYW5nZWQpIHtcbiAgICBjb252ZXJzYXRpb24udHJpZ2dlcignaWRVcGRhdGVkJywgY29udmVyc2F0aW9uLCAnZ3JvdXBJZCcsIHByZXZpb3VzSWQpO1xuICB9XG5cbiAgLy8gU2F2ZSB0aGVzZSBtb3N0IHJlY2VudCB1cGRhdGVzIHRvIGNvbnZlcnNhdGlvblxuICBhd2FpdCB1cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuXG4gIC8vIElmIHdlJ3ZlIGJlZW4gYWRkZWQgYnkgYSBibG9ja2VkIGNvbnRhY3QsIHRoZW4gc2NoZWR1bGUgYSB0YXNrIHRvIGxlYXZlIGdyb3VwXG4gIGNvbnN0IGp1c3RBZGRlZCA9ICF3YXNNZW1iZXJPclBlbmRpbmcgJiYgaXNNZW1iZXJPclBlbmRpbmc7XG4gIGNvbnN0IGFkZGVkQnkgPVxuICAgIG5ld0F0dHJpYnV0ZXMucGVuZGluZ01lbWJlcnNWMj8uZmluZChpdGVtID0+IGl0ZW0udXVpZCA9PT0gb3VyVXVpZClcbiAgICAgID8uYWRkZWRCeVVzZXJJZCB8fCBuZXdBdHRyaWJ1dGVzLmFkZGVkQnk7XG5cbiAgaWYgKGp1c3RBZGRlZCAmJiBhZGRlZEJ5KSB7XG4gICAgY29uc3QgYWRkZXIgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoYWRkZWRCeSk7XG5cbiAgICBpZiAoYWRkZXIgJiYgYWRkZXIuaXNCbG9ja2VkKCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgdXBkYXRlR3JvdXAvJHtsb2dJZH06IEFkZGVkIHRvIGdyb3VwIGJ5IGJsb2NrZWQgdXNlciAke2FkZGVyLmlkRm9yTG9nZ2luZygpfS4gU2NoZWR1bGluZyBncm91cCBsZWF2ZS5gXG4gICAgICApO1xuXG4gICAgICAvLyBXYWl0IGZvciBlbXB0eSBxdWV1ZSB0byBtYWtlIGl0IG1vcmUgbGlrZWx5IHRoZSBncm91cCB1cGRhdGUgc3VjY2VlZHNcbiAgICAgIGNvbnN0IHdhaXRUaGVuTGVhdmUgPSBhc3luYyAoKSA9PiB7XG4gICAgICAgIGxvZy53YXJuKGB3YWl0VGhlbkxlYXZlLyR7bG9nSWR9OiBXYWl0aW5nIGZvciBlbXB0eSBldmVudCBxdWV1ZS5gKTtcbiAgICAgICAgYXdhaXQgd2luZG93LndhaXRGb3JFbXB0eUV2ZW50UXVldWUoKTtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYHdhaXRUaGVuTGVhdmUvJHtsb2dJZH06IEVtcHR5IGV2ZW50IHF1ZXVlLCBzdGFydGluZyBncm91cCBsZWF2ZS5gXG4gICAgICAgICk7XG5cbiAgICAgICAgYXdhaXQgY29udmVyc2F0aW9uLmxlYXZlR3JvdXBWMigpO1xuICAgICAgICBsb2cud2Fybihgd2FpdFRoZW5MZWF2ZS8ke2xvZ0lkfTogTGVhdmUgY29tcGxldGUuYCk7XG4gICAgICB9O1xuXG4gICAgICAvLyBDYW5ub3QgYXdhaXQgaGVyZSwgd291bGQgaW5maW5pdGVseSBibG9jayBxdWV1ZVxuICAgICAgd2FpdFRoZW5MZWF2ZSgpO1xuICAgIH1cbiAgfVxufVxuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZ1xuZXhwb3J0IGZ1bmN0aW9uIF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMoXG4gIGZpcnN0OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfCB1bmRlZmluZWQsXG4gIHNlY29uZDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlXG4pOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfCB1bmRlZmluZWQge1xuICBpZiAoIWZpcnN0KSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChmaXJzdC50eXBlICE9PSAnZ3JvdXAtdjItY2hhbmdlJyB8fCBzZWNvbmQudHlwZSAhPT0gZmlyc3QudHlwZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IGdyb3VwVjJDaGFuZ2U6IGZpcnN0Q2hhbmdlIH0gPSBmaXJzdDtcbiAgY29uc3QgeyBncm91cFYyQ2hhbmdlOiBzZWNvbmRDaGFuZ2UgfSA9IHNlY29uZDtcbiAgaWYgKCFmaXJzdENoYW5nZSB8fCAhc2Vjb25kQ2hhbmdlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChmaXJzdENoYW5nZS5kZXRhaWxzLmxlbmd0aCAhPT0gMSAmJiBzZWNvbmRDaGFuZ2UuZGV0YWlscy5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgW2ZpcnN0RGV0YWlsXSA9IGZpcnN0Q2hhbmdlLmRldGFpbHM7XG4gIGNvbnN0IFtzZWNvbmREZXRhaWxdID0gc2Vjb25kQ2hhbmdlLmRldGFpbHM7XG4gIGxldCBpc0FwcHJvdmFsUGVuZGluZzogYm9vbGVhbjtcbiAgaWYgKHNlY29uZERldGFpbC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScpIHtcbiAgICBpc0FwcHJvdmFsUGVuZGluZyA9IHRydWU7XG4gIH0gZWxzZSBpZiAoc2Vjb25kRGV0YWlsLnR5cGUgPT09ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJykge1xuICAgIGlzQXBwcm92YWxQZW5kaW5nID0gZmFsc2U7XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IHsgdXVpZCB9ID0gc2Vjb25kRGV0YWlsO1xuICBzdHJpY3RBc3NlcnQodXVpZCwgJ2FkbWluIGFwcHJvdmFsIG1lc3NhZ2Ugc2hvdWxkIGhhdmUgdXVpZCcpO1xuXG4gIGxldCB1cGRhdGVkRGV0YWlsO1xuICAvLyBNZW1iZXIgd2FzIHByZXZpb3VzbHkgYWRkZWQgYW5kIGlzIG5vdyByZW1vdmVkXG4gIGlmIChcbiAgICAhaXNBcHByb3ZhbFBlbmRpbmcgJiZcbiAgICBmaXJzdERldGFpbC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScgJiZcbiAgICBmaXJzdERldGFpbC51dWlkID09PSB1dWlkXG4gICkge1xuICAgIHVwZGF0ZWREZXRhaWwgPSB7XG4gICAgICB0eXBlOiAnYWRtaW4tYXBwcm92YWwtYm91bmNlJyBhcyBjb25zdCxcbiAgICAgIHV1aWQsXG4gICAgICB0aW1lczogMSxcbiAgICAgIGlzQXBwcm92YWxQZW5kaW5nLFxuICAgIH07XG5cbiAgICAvLyBUaGVyZSBpcyBhbiBleGlzdGluZyBib3VuY2UgZXZlbnQgLSBtZXJnZSB0aGlzIG9uZSBpbnRvIGl0LlxuICB9IGVsc2UgaWYgKFxuICAgIGZpcnN0RGV0YWlsLnR5cGUgPT09ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnICYmXG4gICAgZmlyc3REZXRhaWwudXVpZCA9PT0gdXVpZCAmJlxuICAgIGZpcnN0RGV0YWlsLmlzQXBwcm92YWxQZW5kaW5nID09PSAhaXNBcHByb3ZhbFBlbmRpbmdcbiAgKSB7XG4gICAgdXBkYXRlZERldGFpbCA9IHtcbiAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1ib3VuY2UnIGFzIGNvbnN0LFxuICAgICAgdXVpZCxcbiAgICAgIHRpbWVzOiBmaXJzdERldGFpbC50aW1lcyArIChpc0FwcHJvdmFsUGVuZGluZyA/IDAgOiAxKSxcbiAgICAgIGlzQXBwcm92YWxQZW5kaW5nLFxuICAgIH07XG4gIH0gZWxzZSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4uZmlyc3QsXG4gICAgZ3JvdXBWMkNoYW5nZToge1xuICAgICAgLi4uZmlyc3QuZ3JvdXBWMkNoYW5nZSxcbiAgICAgIGRldGFpbHM6IFt1cGRhdGVkRGV0YWlsXSxcbiAgICB9LFxuICB9O1xufVxuXG4vLyBFeHBvcnRlZCBmb3IgdGVzdGluZ1xuZXhwb3J0IGZ1bmN0aW9uIF9pc0dyb3VwQ2hhbmdlTWVzc2FnZUJvdW5jZWFibGUoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZVxuKTogYm9vbGVhbiB7XG4gIGlmIChtZXNzYWdlLnR5cGUgIT09ICdncm91cC12Mi1jaGFuZ2UnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgeyBncm91cFYyQ2hhbmdlIH0gPSBtZXNzYWdlO1xuICBpZiAoIWdyb3VwVjJDaGFuZ2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoZ3JvdXBWMkNoYW5nZS5kZXRhaWxzLmxlbmd0aCAhPT0gMSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGNvbnN0IFtmaXJzdF0gPSBncm91cFYyQ2hhbmdlLmRldGFpbHM7XG4gIGlmIChcbiAgICBmaXJzdC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYWRkLW9uZScgfHxcbiAgICBmaXJzdC50eXBlID09PSAnYWRtaW4tYXBwcm92YWwtYm91bmNlJ1xuICApIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gYXBwZW5kQ2hhbmdlTWVzc2FnZXMoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gIG1lc3NhZ2VzOiBSZWFkb25seUFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBsb2dJZCA9IGNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKTtcblxuICBsb2cuaW5mbyhcbiAgICBgYXBwZW5kQ2hhbmdlTWVzc2FnZXMvJHtsb2dJZH06IHByb2Nlc3NpbmcgJHttZXNzYWdlcy5sZW5ndGh9IG1lc3NhZ2VzYFxuICApO1xuXG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICBsZXQgbGFzdE1lc3NhZ2UgPSBhd2FpdCBkYXRhSW50ZXJmYWNlLmdldExhc3RDb252ZXJzYXRpb25NZXNzYWdlKHtcbiAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICB9KTtcblxuICBpZiAobGFzdE1lc3NhZ2UgJiYgIV9pc0dyb3VwQ2hhbmdlTWVzc2FnZUJvdW5jZWFibGUobGFzdE1lc3NhZ2UpKSB7XG4gICAgbGFzdE1lc3NhZ2UgPSB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBtZXJnZWRNZXNzYWdlcyA9IFtdO1xuICBsZXQgcHJldmlvdXNNZXNzYWdlID0gbGFzdE1lc3NhZ2U7XG4gIGZvciAoY29uc3QgbWVzc2FnZSBvZiBtZXNzYWdlcykge1xuICAgIGNvbnN0IG1lcmdlZCA9IF9tZXJnZUdyb3VwQ2hhbmdlTWVzc2FnZXMocHJldmlvdXNNZXNzYWdlLCBtZXNzYWdlKTtcbiAgICBpZiAoIW1lcmdlZCkge1xuICAgICAgaWYgKHByZXZpb3VzTWVzc2FnZSAmJiBwcmV2aW91c01lc3NhZ2UgIT09IGxhc3RNZXNzYWdlKSB7XG4gICAgICAgIG1lcmdlZE1lc3NhZ2VzLnB1c2gocHJldmlvdXNNZXNzYWdlKTtcbiAgICAgIH1cbiAgICAgIHByZXZpb3VzTWVzc2FnZSA9IG1lc3NhZ2U7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBwcmV2aW91c01lc3NhZ2UgPSBtZXJnZWQ7XG4gICAgbG9nLmluZm8oXG4gICAgICBgYXBwZW5kQ2hhbmdlTWVzc2FnZXMvJHtsb2dJZH06IG1lcmdlZCAke21lc3NhZ2UuaWR9IGludG8gJHttZXJnZWQuaWR9YFxuICAgICk7XG4gIH1cblxuICBpZiAocHJldmlvdXNNZXNzYWdlICYmIHByZXZpb3VzTWVzc2FnZSAhPT0gbGFzdE1lc3NhZ2UpIHtcbiAgICBtZXJnZWRNZXNzYWdlcy5wdXNoKHByZXZpb3VzTWVzc2FnZSk7XG4gIH1cblxuICAvLyBVcGRhdGUgZXhpc3RpbmcgbWVzc2FnZVxuICBpZiAobGFzdE1lc3NhZ2UgJiYgbWVyZ2VkTWVzc2FnZXNbMF0/LmlkID09PSBsYXN0TWVzc2FnZT8uaWQpIHtcbiAgICBjb25zdCBbZmlyc3QsIC4uLnJlc3RdID0gbWVyZ2VkTWVzc2FnZXM7XG4gICAgc3RyaWN0QXNzZXJ0KGZpcnN0ICE9PSB1bmRlZmluZWQsICdGaXJzdCBtZXNzYWdlIG11c3QgYmUgdGhlcmUnKTtcblxuICAgIGxvZy5pbmZvKGBhcHBlbmRDaGFuZ2VNZXNzYWdlcy8ke2xvZ0lkfTogdXBkYXRpbmcgJHtmaXJzdC5pZH1gKTtcbiAgICBhd2FpdCBkYXRhSW50ZXJmYWNlLnNhdmVNZXNzYWdlKGZpcnN0LCB7XG4gICAgICBvdXJVdWlkOiBvdXJVdWlkLnRvU3RyaW5nKCksXG5cbiAgICAgIC8vIFdlIGRvbid0IHVzZSBmb3JjZVNhdmUgaGVyZSBiZWNhdXNlIHRoaXMgaXMgYW4gdXBkYXRlIG9mIGV4aXN0aW5nXG4gICAgICAvLyBtZXNzYWdlLlxuICAgIH0pO1xuXG4gICAgbG9nLmluZm8oXG4gICAgICBgYXBwZW5kQ2hhbmdlTWVzc2FnZXMvJHtsb2dJZH06IHNhdmluZyAke3Jlc3QubGVuZ3RofSBuZXcgbWVzc2FnZXNgXG4gICAgKTtcbiAgICBhd2FpdCBkYXRhSW50ZXJmYWNlLnNhdmVNZXNzYWdlcyhyZXN0LCB7XG4gICAgICBvdXJVdWlkOiBvdXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgYXBwZW5kQ2hhbmdlTWVzc2FnZXMvJHtsb2dJZH06IHNhdmluZyAke21lcmdlZE1lc3NhZ2VzLmxlbmd0aH0gbmV3IG1lc3NhZ2VzYFxuICAgICk7XG4gICAgYXdhaXQgZGF0YUludGVyZmFjZS5zYXZlTWVzc2FnZXMobWVyZ2VkTWVzc2FnZXMsIHtcbiAgICAgIG91clV1aWQ6IG91clV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICB9KTtcbiAgfVxuXG4gIGxldCBuZXdNZXNzYWdlcyA9IDA7XG4gIGZvciAoY29uc3QgY2hhbmdlTWVzc2FnZSBvZiBtZXJnZWRNZXNzYWdlcykge1xuICAgIGNvbnN0IGV4aXN0aW5nID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmdldEJ5SWQoY2hhbmdlTWVzc2FnZS5pZCk7XG5cbiAgICAvLyBVcGRhdGUgZXhpc3RpbmcgbWVzc2FnZVxuICAgIGlmIChleGlzdGluZykge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBjaGFuZ2VNZXNzYWdlLmlkID09PSBsYXN0TWVzc2FnZT8uaWQsXG4gICAgICAgICdTaG91bGQgb25seSB1cGRhdGUgZ3JvdXAgY2hhbmdlIHRoYXQgd2FzIGFscmVhZHkgaW4gdGhlIGRhdGFiYXNlJ1xuICAgICAgKTtcbiAgICAgIGV4aXN0aW5nLnNldChjaGFuZ2VNZXNzYWdlKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IG1vZGVsID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UoY2hhbmdlTWVzc2FnZSk7XG4gICAgd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKG1vZGVsLmlkLCBtb2RlbCk7XG4gICAgY29udmVyc2F0aW9uLnRyaWdnZXIoJ25ld21lc3NhZ2UnLCBtb2RlbCk7XG4gICAgbmV3TWVzc2FnZXMgKz0gMTtcbiAgfVxuXG4gIC8vIFdlIHVwZGF0ZWQgdGhlIG1lc3NhZ2UsIGJ1dCBkaWRuJ3QgYWRkIG5ldyBvbmVzIC0gcmVmcmVzaCBsZWZ0IHBhbmVcbiAgaWYgKCFuZXdNZXNzYWdlcyAmJiBtZXJnZWRNZXNzYWdlcy5sZW5ndGggPiAwKSB7XG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnVwZGF0ZUxhc3RNZXNzYWdlKCk7XG4gICAgY29udmVyc2F0aW9uLnVwZGF0ZVVucmVhZCgpO1xuICB9XG59XG5cbnR5cGUgR2V0R3JvdXBVcGRhdGVzVHlwZSA9IFJlYWRvbmx5PHtcbiAgZHJvcEluaXRpYWxKb2luTWVzc2FnZT86IGJvb2xlYW47XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgc2VydmVyUHVibGljUGFyYW1zQmFzZTY0OiBzdHJpbmc7XG4gIG5ld1JldmlzaW9uPzogbnVtYmVyO1xuICBncm91cENoYW5nZT86IFdyYXBwZWRHcm91cENoYW5nZVR5cGU7XG59PjtcblxuYXN5bmMgZnVuY3Rpb24gZ2V0R3JvdXBVcGRhdGVzKHtcbiAgZHJvcEluaXRpYWxKb2luTWVzc2FnZSxcbiAgZ3JvdXAsXG4gIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NCxcbiAgbmV3UmV2aXNpb24sXG4gIGdyb3VwQ2hhbmdlOiB3cmFwcGVkR3JvdXBDaGFuZ2UsXG59OiBHZXRHcm91cFVwZGF0ZXNUeXBlKTogUHJvbWlzZTxVcGRhdGVzUmVzdWx0VHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cC5ncm91cElkKTtcblxuICBsb2cuaW5mbyhgZ2V0R3JvdXBVcGRhdGVzLyR7bG9nSWR9OiBTdGFydGluZy4uLmApO1xuXG4gIGNvbnN0IGN1cnJlbnRSZXZpc2lvbiA9IGdyb3VwLnJldmlzaW9uO1xuICBjb25zdCBpc0ZpcnN0RmV0Y2ggPSAhaXNOdW1iZXIoZ3JvdXAucmV2aXNpb24pO1xuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgaXNJbml0aWFsQ3JlYXRpb25NZXNzYWdlID0gaXNGaXJzdEZldGNoICYmIG5ld1JldmlzaW9uID09PSAwO1xuICBjb25zdCB3ZUFyZUF3YWl0aW5nQXBwcm92YWwgPSAoZ3JvdXAucGVuZGluZ0FkbWluQXBwcm92YWxWMiB8fCBbXSkuZmluZChcbiAgICBpdGVtID0+IGl0ZW0udXVpZCA9PT0gb3VyVXVpZFxuICApO1xuICBjb25zdCBpc09uZVZlcnNpb25VcCA9XG4gICAgaXNOdW1iZXIoY3VycmVudFJldmlzaW9uKSAmJlxuICAgIGlzTnVtYmVyKG5ld1JldmlzaW9uKSAmJlxuICAgIG5ld1JldmlzaW9uID09PSBjdXJyZW50UmV2aXNpb24gKyAxO1xuXG4gIGlmIChcbiAgICB3aW5kb3cuR1YyX0VOQUJMRV9TSU5HTEVfQ0hBTkdFX1BST0NFU1NJTkcgJiZcbiAgICB3cmFwcGVkR3JvdXBDaGFuZ2UgJiZcbiAgICBpc051bWJlcihuZXdSZXZpc2lvbikgJiZcbiAgICAoaXNJbml0aWFsQ3JlYXRpb25NZXNzYWdlIHx8IHdlQXJlQXdhaXRpbmdBcHByb3ZhbCB8fCBpc09uZVZlcnNpb25VcClcbiAgKSB7XG4gICAgbG9nLmluZm8oYGdldEdyb3VwVXBkYXRlcy8ke2xvZ0lkfTogUHJvY2Vzc2luZyBqdXN0IG9uZSBjaGFuZ2VgKTtcblxuICAgIGNvbnN0IGdyb3VwQ2hhbmdlQnVmZmVyID0gQnl0ZXMuZnJvbUJhc2U2NCh3cmFwcGVkR3JvdXBDaGFuZ2UuYmFzZTY0KTtcbiAgICBjb25zdCBncm91cENoYW5nZSA9IFByb3RvLkdyb3VwQ2hhbmdlLmRlY29kZShncm91cENoYW5nZUJ1ZmZlcik7XG4gICAgY29uc3QgaXNDaGFuZ2VTdXBwb3J0ZWQgPVxuICAgICAgIWlzTnVtYmVyKGdyb3VwQ2hhbmdlLmNoYW5nZUVwb2NoKSB8fFxuICAgICAgZ3JvdXBDaGFuZ2UuY2hhbmdlRXBvY2ggPD0gU1VQUE9SVEVEX0NIQU5HRV9FUE9DSDtcblxuICAgIGlmIChpc0NoYW5nZVN1cHBvcnRlZCkge1xuICAgICAgaWYgKCF3cmFwcGVkR3JvdXBDaGFuZ2UuaXNUcnVzdGVkKSB7XG4gICAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgICBncm91cENoYW5nZS5zZXJ2ZXJTaWduYXR1cmUgJiYgZ3JvdXBDaGFuZ2UuYWN0aW9ucyxcbiAgICAgICAgICAnU2VydmVyIHNpZ25hdHVyZSBtdXN0IGJlIHByZXNlbnQgaW4gdW50cnVzdGVkIGdyb3VwIGNoYW5nZSdcbiAgICAgICAgKTtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB2ZXJpZnlOb3RhcnlTaWduYXR1cmUoXG4gICAgICAgICAgICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQsXG4gICAgICAgICAgICBncm91cENoYW5nZS5hY3Rpb25zLFxuICAgICAgICAgICAgZ3JvdXBDaGFuZ2Uuc2VydmVyU2lnbmF0dXJlXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBnZXRHcm91cFVwZGF0ZXMvJHtsb2dJZH06IHZlcmlmeU5vdGFyeVNpZ25hdHVyZSBmYWlsZWQsIGAgK1xuICAgICAgICAgICAgICAnZHJvcHBpbmcgdGhlIG1lc3NhZ2UnLFxuICAgICAgICAgICAgRXJyb3JzLnRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG5ld0F0dHJpYnV0ZXM6IGdyb3VwLFxuICAgICAgICAgICAgZ3JvdXBDaGFuZ2VNZXNzYWdlczogW10sXG4gICAgICAgICAgICBtZW1iZXJzOiBbXSxcbiAgICAgICAgICB9O1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB1cGRhdGVHcm91cFZpYVNpbmdsZUNoYW5nZSh7XG4gICAgICAgIGdyb3VwLFxuICAgICAgICBuZXdSZXZpc2lvbixcbiAgICAgICAgZ3JvdXBDaGFuZ2UsXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBnZXRHcm91cFVwZGF0ZXMvJHtsb2dJZH06IEZhaWxpbmcgb3ZlcjsgZ3JvdXAgY2hhbmdlIHVuc3VwcG9ydGVkYFxuICAgICk7XG4gIH1cblxuICBpZiAoXG4gICAgKCFpc0ZpcnN0RmV0Y2ggfHwgaXNOdW1iZXIobmV3UmV2aXNpb24pKSAmJlxuICAgIHdpbmRvdy5HVjJfRU5BQkxFX0NIQU5HRV9QUk9DRVNTSU5HXG4gICkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdXBkYXRlR3JvdXBWaWFMb2dzKHtcbiAgICAgICAgZ3JvdXAsXG4gICAgICAgIG5ld1JldmlzaW9uLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IG5leHRTdGVwID0gaXNGaXJzdEZldGNoXG4gICAgICAgID8gYGZldGNoaW5nIGxvZ3Mgc2luY2UgJHtuZXdSZXZpc2lvbn1gXG4gICAgICAgIDogJ2ZldGNoaW5nIGZ1bGwgc3RhdGUnO1xuXG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gVEVNUE9SQUxfQVVUSF9SRUpFQ1RFRF9DT0RFKSB7XG4gICAgICAgIC8vIFdlIHdpbGwgZmFpbCBvdmVyIHRvIHRoZSB1cGRhdGVHcm91cFZpYVN0YXRlIGNhbGwgYmVsb3dcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGdldEdyb3VwVXBkYXRlcy8ke2xvZ0lkfTogVGVtcG9yYWwgY3JlZGVudGlhbCBmYWlsdXJlLCBub3cgJHtuZXh0U3RlcH1gXG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGVycm9yLmNvZGUgPT09IEdST1VQX0FDQ0VTU19ERU5JRURfQ09ERSkge1xuICAgICAgICAvLyBXZSB3aWxsIGZhaWwgb3ZlciB0byB0aGUgdXBkYXRlR3JvdXBWaWFTdGF0ZSBjYWxsIGJlbG93XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBnZXRHcm91cFVwZGF0ZXMvJHtsb2dJZH06IExvZyBhY2Nlc3MgZGVuaWVkLCBub3cgJHtuZXh0U3RlcH1gXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpZiAod2luZG93LkdWMl9FTkFCTEVfU1RBVEVfUFJPQ0VTU0lORykge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdXBkYXRlR3JvdXBWaWFTdGF0ZSh7XG4gICAgICAgIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2UsXG4gICAgICAgIGdyb3VwLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSBURU1QT1JBTF9BVVRIX1JFSkVDVEVEX0NPREUpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGdldEdyb3VwVXBkYXRlcy8ke2xvZ0lkfTogVGVtcG9yYWwgY3JlZGVudGlhbCBmYWlsdXJlLiBGYWlsaW5nOyB3ZSBkb24ndCBrbm93IGlmIHdlIGhhdmUgYWNjZXNzIG9yIG5vdC5gXG4gICAgICAgICk7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfSBlbHNlIGlmIChlcnJvci5jb2RlID09PSBHUk9VUF9BQ0NFU1NfREVOSUVEX0NPREUpIHtcbiAgICAgICAgLy8gV2Ugd2lsbCBmYWlsIG92ZXIgdG8gdGhlIHVwZGF0ZUdyb3VwVmlhUHJlSm9pbkluZm8gY2FsbCBiZWxvd1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgZ2V0R3JvdXBVcGRhdGVzLyR7bG9nSWR9OiBGYWlsZWQgdG8gZ2V0IGdyb3VwIHN0YXRlLiBBdHRlbXB0aW5nIHRvIGZldGNoIHByZS1qb2luIGluZm9ybWF0aW9uLmBcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh3aW5kb3cuR1YyX0VOQUJMRV9QUkVfSk9JTl9GRVRDSCkge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gYXdhaXQgdXBkYXRlR3JvdXBWaWFQcmVKb2luSW5mbyh7XG4gICAgICAgIGdyb3VwLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvci5jb2RlID09PSBHUk9VUF9BQ0NFU1NfREVOSUVEX0NPREUpIHtcbiAgICAgICAgcmV0dXJuIGdlbmVyYXRlTGVmdEdyb3VwQ2hhbmdlcyhncm91cCk7XG4gICAgICB9XG4gICAgICBpZiAoZXJyb3IuY29kZSA9PT0gR1JPVVBfTk9ORVhJU1RFTlRfQ09ERSkge1xuICAgICAgICByZXR1cm4gZ2VuZXJhdGVMZWZ0R3JvdXBDaGFuZ2VzKGdyb3VwKTtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2UgZ2V0IGFub3RoZXIgdGVtcG9yYWwgZmFpbHVyZSwgd2UnbGwgZmFpbCBhbmQgdHJ5IGFnYWluIGxhdGVyLlxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgbG9nLndhcm4oXG4gICAgYGdldEdyb3VwVXBkYXRlcy8ke2xvZ0lkfTogTm8gcHJvY2Vzc2luZyB3YXMgbGVnYWwhIFJldHVybmluZyBlbXB0eSBjaGFuZ2VzZXQuYFxuICApO1xuICByZXR1cm4ge1xuICAgIG5ld0F0dHJpYnV0ZXM6IGdyb3VwLFxuICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IFtdLFxuICAgIG1lbWJlcnM6IFtdLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVHcm91cFZpYVByZUpvaW5JbmZvKHtcbiAgZ3JvdXAsXG59OiB7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbn0pOiBQcm9taXNlPFVwZGF0ZXNSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IGxvZ0lkID0gaWRGb3JMb2dnaW5nKGdyb3VwLmdyb3VwSWQpO1xuICBjb25zdCBkYXRhID0gd2luZG93LnN0b3JhZ2UuZ2V0KEdST1VQX0NSRURFTlRJQUxTX0tFWSk7XG4gIGlmICghZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlR3JvdXBWaWFQcmVKb2luSW5mbzogTm8gZ3JvdXAgY3JlZGVudGlhbHMhJyk7XG4gIH1cbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgeyBwdWJsaWNQYXJhbXMsIHNlY3JldFBhcmFtcyB9ID0gZ3JvdXA7XG4gIGlmICghc2VjcmV0UGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ3VwZGF0ZUdyb3VwVmlhUHJlSm9pbkluZm86IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnXG4gICAgKTtcbiAgfVxuICBpZiAoIXB1YmxpY1BhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICd1cGRhdGVHcm91cFZpYVByZUpvaW5JbmZvOiBncm91cCB3YXMgbWlzc2luZyBwdWJsaWNQYXJhbXMhJ1xuICAgICk7XG4gIH1cblxuICAvLyBObyBwYXNzd29yZCwgYnV0IGlmIHdlJ3JlIGFscmVhZHkgcGVuZGluZyBhcHByb3ZhbCwgd2UgY2FuIGFjY2VzcyB0aGlzIHdpdGhvdXQgaXQuXG4gIGNvbnN0IGludml0ZUxpbmtQYXNzd29yZCA9IHVuZGVmaW5lZDtcbiAgY29uc3QgcHJlSm9pbkluZm8gPSBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICBsb2dJZDogYGdldFByZUpvaW5JbmZvLyR7bG9nSWR9YCxcbiAgICBwdWJsaWNQYXJhbXMsXG4gICAgc2VjcmV0UGFyYW1zLFxuICAgIHJlcXVlc3Q6IChzZW5kZXIsIG9wdGlvbnMpID0+XG4gICAgICBzZW5kZXIuZ2V0R3JvdXBGcm9tTGluayhpbnZpdGVMaW5rUGFzc3dvcmQsIG9wdGlvbnMpLFxuICB9KTtcblxuICBjb25zdCBhcHByb3ZhbFJlcXVpcmVkID1cbiAgICBwcmVKb2luSW5mby5hZGRGcm9tSW52aXRlTGluayA9PT1cbiAgICBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkLkFETUlOSVNUUkFUT1I7XG5cbiAgLy8gSWYgdGhlIGdyb3VwIGRvZXNuJ3QgcmVxdWlyZSBhcHByb3ZhbCB0byBqb2luIHZpYSBsaW5rLCB0aGVuIHdlIHNob3VsZCBuZXZlciBoYXZlXG4gIC8vICAgZ290dGVuIGhlcmUuXG4gIGlmICghYXBwcm92YWxSZXF1aXJlZCkge1xuICAgIHJldHVybiBnZW5lcmF0ZUxlZnRHcm91cENoYW5nZXMoZ3JvdXApO1xuICB9XG5cbiAgY29uc3QgbmV3QXR0cmlidXRlczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgLi4uZ3JvdXAsXG4gICAgZGVzY3JpcHRpb246IGRlY3J5cHRHcm91cERlc2NyaXB0aW9uKFxuICAgICAgcHJlSm9pbkluZm8uZGVzY3JpcHRpb25CeXRlcyxcbiAgICAgIHNlY3JldFBhcmFtc1xuICAgICksXG4gICAgbmFtZTogZGVjcnlwdEdyb3VwVGl0bGUocHJlSm9pbkluZm8udGl0bGUsIHNlY3JldFBhcmFtcyksXG4gICAgbWVtYmVyczogW10sXG4gICAgcGVuZGluZ01lbWJlcnNWMjogW10sXG4gICAgcGVuZGluZ0FkbWluQXBwcm92YWxWMjogW1xuICAgICAge1xuICAgICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgIF0sXG4gICAgcmV2aXNpb246IHByZUpvaW5JbmZvLnZlcnNpb24sXG5cbiAgICB0ZW1wb3JhcnlNZW1iZXJDb3VudDogcHJlSm9pbkluZm8ubWVtYmVyQ291bnQgfHwgMSxcbiAgfTtcblxuICBhd2FpdCBhcHBseU5ld0F2YXRhcihkcm9wTnVsbChwcmVKb2luSW5mby5hdmF0YXIpLCBuZXdBdHRyaWJ1dGVzLCBsb2dJZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdBdHRyaWJ1dGVzLFxuICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IGV4dHJhY3REaWZmcyh7XG4gICAgICBvbGQ6IGdyb3VwLFxuICAgICAgY3VycmVudDogbmV3QXR0cmlidXRlcyxcbiAgICAgIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2U6IGZhbHNlLFxuICAgIH0pLFxuICAgIG1lbWJlcnM6IFtdLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVHcm91cFZpYVN0YXRlKHtcbiAgZHJvcEluaXRpYWxKb2luTWVzc2FnZSxcbiAgZ3JvdXAsXG59OiB7XG4gIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2U/OiBib29sZWFuO1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG59KTogUHJvbWlzZTxVcGRhdGVzUmVzdWx0VHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cC5ncm91cElkKTtcbiAgY29uc3QgeyBwdWJsaWNQYXJhbXMsIHNlY3JldFBhcmFtcyB9ID0gZ3JvdXA7XG4gIGlmICghc2VjcmV0UGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1cGRhdGVHcm91cFZpYVN0YXRlOiBncm91cCB3YXMgbWlzc2luZyBzZWNyZXRQYXJhbXMhJyk7XG4gIH1cbiAgaWYgKCFwdWJsaWNQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZUdyb3VwVmlhU3RhdGU6IGdyb3VwIHdhcyBtaXNzaW5nIHB1YmxpY1BhcmFtcyEnKTtcbiAgfVxuXG4gIGNvbnN0IGdyb3VwU3RhdGUgPSBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICBsb2dJZDogYGdldEdyb3VwLyR7bG9nSWR9YCxcbiAgICBwdWJsaWNQYXJhbXMsXG4gICAgc2VjcmV0UGFyYW1zLFxuICAgIHJlcXVlc3Q6IChzZW5kZXIsIHJlcXVlc3RPcHRpb25zKSA9PiBzZW5kZXIuZ2V0R3JvdXAocmVxdWVzdE9wdGlvbnMpLFxuICB9KTtcblxuICBjb25zdCBkZWNyeXB0ZWRHcm91cFN0YXRlID0gZGVjcnlwdEdyb3VwU3RhdGUoXG4gICAgZ3JvdXBTdGF0ZSxcbiAgICBzZWNyZXRQYXJhbXMsXG4gICAgbG9nSWRcbiAgKTtcblxuICBjb25zdCBvbGRWZXJzaW9uID0gZ3JvdXAucmV2aXNpb247XG4gIGNvbnN0IG5ld1ZlcnNpb24gPSBkZWNyeXB0ZWRHcm91cFN0YXRlLnZlcnNpb247XG4gIGxvZy5pbmZvKFxuICAgIGBnZXRDdXJyZW50R3JvdXBTdGF0ZS8ke2xvZ0lkfTogQXBwbHlpbmcgZnVsbCBncm91cCBzdGF0ZSwgZnJvbSB2ZXJzaW9uICR7b2xkVmVyc2lvbn0gdG8gJHtuZXdWZXJzaW9ufS5gXG4gICk7XG4gIGNvbnN0IHsgbmV3QXR0cmlidXRlcywgbmV3UHJvZmlsZUtleXMgfSA9IGF3YWl0IGFwcGx5R3JvdXBTdGF0ZSh7XG4gICAgZ3JvdXAsXG4gICAgZ3JvdXBTdGF0ZTogZGVjcnlwdGVkR3JvdXBTdGF0ZSxcbiAgfSk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdBdHRyaWJ1dGVzLFxuICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IGV4dHJhY3REaWZmcyh7XG4gICAgICBvbGQ6IGdyb3VwLFxuICAgICAgY3VycmVudDogbmV3QXR0cmlidXRlcyxcbiAgICAgIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2UsXG4gICAgfSksXG4gICAgbWVtYmVyczogcHJvZmlsZUtleXNUb01lbWJlcnMobmV3UHJvZmlsZUtleXMpLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiB1cGRhdGVHcm91cFZpYVNpbmdsZUNoYW5nZSh7XG4gIGdyb3VwLFxuICBncm91cENoYW5nZSxcbiAgbmV3UmV2aXNpb24sXG59OiB7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgZ3JvdXBDaGFuZ2U6IFByb3RvLklHcm91cENoYW5nZTtcbiAgbmV3UmV2aXNpb246IG51bWJlcjtcbn0pOiBQcm9taXNlPFVwZGF0ZXNSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IHdhc0luR3JvdXAgPSAhZ3JvdXAubGVmdDtcbiAgY29uc3QgcmVzdWx0OiBVcGRhdGVzUmVzdWx0VHlwZSA9IGF3YWl0IGludGVncmF0ZUdyb3VwQ2hhbmdlKHtcbiAgICBncm91cCxcbiAgICBncm91cENoYW5nZSxcbiAgICBuZXdSZXZpc2lvbixcbiAgfSk7XG5cbiAgY29uc3Qgbm93SW5Hcm91cCA9ICFyZXN1bHQubmV3QXR0cmlidXRlcy5sZWZ0O1xuXG4gIC8vIElmIHdlIHdlcmUganVzdCBhZGRlZCB0byB0aGUgZ3JvdXAgKGZvciBleGFtcGxlLCB2aWEgYSBqb2luIGxpbmspLCB3ZSBnbyBmZXRjaCB0aGVcbiAgLy8gICBlbnRpcmUgZ3JvdXAgc3RhdGUgdG8gbWFrZSBzdXJlIHdlJ3JlIHVwIHRvIGRhdGUuXG4gIGlmICghd2FzSW5Hcm91cCAmJiBub3dJbkdyb3VwKSB7XG4gICAgY29uc3QgeyBuZXdBdHRyaWJ1dGVzLCBtZW1iZXJzIH0gPSBhd2FpdCB1cGRhdGVHcm91cFZpYVN0YXRlKHtcbiAgICAgIGdyb3VwOiByZXN1bHQubmV3QXR0cmlidXRlcyxcbiAgICB9KTtcblxuICAgIC8vIFdlIGRpc2NhcmQgYW55IGNoYW5nZSBldmVudHMgdGhhdCBjb21lIG91dCBvZiB0aGlzIGZ1bGwgZ3JvdXAgZmV0Y2gsIGJ1dCB3ZSBkb1xuICAgIC8vICAga2VlcCB0aGUgZmluYWwgZ3JvdXAgYXR0cmlidXRlcyBnZW5lcmF0ZWQsIGFzIHdlbGwgYXMgYW55IG5ldyBtZW1iZXJzLlxuICAgIHJldHVybiB7XG4gICAgICAuLi5yZXN1bHQsXG4gICAgICBtZW1iZXJzOiBbLi4ucmVzdWx0Lm1lbWJlcnMsIC4uLm1lbWJlcnNdLFxuICAgICAgbmV3QXR0cmlidXRlcyxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlR3JvdXBWaWFMb2dzKHtcbiAgZ3JvdXAsXG4gIG5ld1JldmlzaW9uLFxufToge1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIG5ld1JldmlzaW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG59KTogUHJvbWlzZTxVcGRhdGVzUmVzdWx0VHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cC5ncm91cElkKTtcbiAgY29uc3QgeyBwdWJsaWNQYXJhbXMsIHNlY3JldFBhcmFtcyB9ID0gZ3JvdXA7XG4gIGlmICghcHVibGljUGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd1cGRhdGVHcm91cFZpYUxvZ3M6IGdyb3VwIHdhcyBtaXNzaW5nIHB1YmxpY1BhcmFtcyEnKTtcbiAgfVxuICBpZiAoIXNlY3JldFBhcmFtcykge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlR3JvdXBWaWFMb2dzOiBncm91cCB3YXMgbWlzc2luZyBzZWNyZXRQYXJhbXMhJyk7XG4gIH1cblxuICBsb2cuaW5mbyhcbiAgICBgdXBkYXRlR3JvdXBWaWFMb2dzLyR7bG9nSWR9OiBHZXR0aW5nIGdyb3VwIGRlbHRhIGZyb20gYCArXG4gICAgICBgJHtncm91cC5yZXZpc2lvbiA/PyAnPyd9IHRvICR7bmV3UmV2aXNpb24gPz8gJz8nfSBmb3IgZ3JvdXAgYCArXG4gICAgICBgZ3JvdXB2Migke2dyb3VwLmdyb3VwSWR9KS4uLmBcbiAgKTtcblxuICBjb25zdCBjdXJyZW50UmV2aXNpb24gPSBncm91cC5yZXZpc2lvbjtcbiAgbGV0IGluY2x1ZGVGaXJzdFN0YXRlID0gdHJ1ZTtcblxuICAvLyBUaGUgcmFuZ2UgaXMgaW5jbHVzaXZlIHNvIG1ha2Ugc3VyZSB0aGF0IHdlIGFsd2F5cyByZXF1ZXN0IHRoZSByZXZpc2lvblxuICAvLyB0aGF0IHdlIGFyZSBjdXJyZW50bHkgYXQgc2luY2Ugd2UgbWlnaHQgd2FudCB0aGUgbGF0ZXN0IGZ1bGwgc3RhdGUgaW5cbiAgLy8gYGludGVncmF0ZUdyb3VwQ2hhbmdlc2AuXG4gIGxldCByZXZpc2lvblRvRmV0Y2ggPSBpc051bWJlcihjdXJyZW50UmV2aXNpb24pID8gY3VycmVudFJldmlzaW9uIDogdW5kZWZpbmVkO1xuXG4gIGxldCByZXNwb25zZTtcbiAgY29uc3QgY2hhbmdlczogQXJyYXk8UHJvdG8uSUdyb3VwQ2hhbmdlcz4gPSBbXTtcbiAgZG8ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgcmVzcG9uc2UgPSBhd2FpdCBtYWtlUmVxdWVzdFdpdGhUZW1wb3JhbFJldHJ5KHtcbiAgICAgIGxvZ0lkOiBgZ2V0R3JvdXBMb2cvJHtsb2dJZH1gLFxuICAgICAgcHVibGljUGFyYW1zLFxuICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWxvb3AtZnVuY1xuICAgICAgcmVxdWVzdDogKHNlbmRlciwgcmVxdWVzdE9wdGlvbnMpID0+XG4gICAgICAgIHNlbmRlci5nZXRHcm91cExvZyhcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGFydFZlcnNpb246IHJldmlzaW9uVG9GZXRjaCxcbiAgICAgICAgICAgIGluY2x1ZGVGaXJzdFN0YXRlLFxuICAgICAgICAgICAgaW5jbHVkZUxhc3RTdGF0ZTogdHJ1ZSxcbiAgICAgICAgICAgIG1heFN1cHBvcnRlZENoYW5nZUVwb2NoOiBTVVBQT1JURURfQ0hBTkdFX0VQT0NILFxuICAgICAgICAgIH0sXG4gICAgICAgICAgcmVxdWVzdE9wdGlvbnNcbiAgICAgICAgKSxcbiAgICB9KTtcblxuICAgIGNoYW5nZXMucHVzaChyZXNwb25zZS5jaGFuZ2VzKTtcbiAgICBpZiAocmVzcG9uc2UuZW5kKSB7XG4gICAgICByZXZpc2lvblRvRmV0Y2ggPSByZXNwb25zZS5lbmQgKyAxO1xuICAgIH1cblxuICAgIGluY2x1ZGVGaXJzdFN0YXRlID0gZmFsc2U7XG4gIH0gd2hpbGUgKFxuICAgIHJlc3BvbnNlLmVuZCAmJlxuICAgIChuZXdSZXZpc2lvbiA9PT0gdW5kZWZpbmVkIHx8IHJlc3BvbnNlLmVuZCA8IG5ld1JldmlzaW9uKVxuICApO1xuXG4gIC8vIFdvdWxkIGJlIG5pY2UgdG8gY2FjaGUgdGhlIHVudXNlZCBncm91cENoYW5nZXMgaGVyZSwgdG8gcmVkdWNlIHNlcnZlciByb3VuZHRyaXBzXG5cbiAgcmV0dXJuIGludGVncmF0ZUdyb3VwQ2hhbmdlcyh7XG4gICAgY2hhbmdlcyxcbiAgICBncm91cCxcbiAgICBuZXdSZXZpc2lvbixcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlTGVmdEdyb3VwQ2hhbmdlcyhcbiAgZ3JvdXA6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlXG4pOiBQcm9taXNlPFVwZGF0ZXNSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IGxvZ0lkID0gaWRGb3JMb2dnaW5nKGdyb3VwLmdyb3VwSWQpO1xuICBsb2cuaW5mbyhgZ2VuZXJhdGVMZWZ0R3JvdXBDaGFuZ2VzLyR7bG9nSWR9OiBTdGFydGluZy4uLmApO1xuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgeyBtYXN0ZXJLZXksIGdyb3VwSW52aXRlTGlua1Bhc3N3b3JkIH0gPSBncm91cDtcbiAgbGV0IHsgcmV2aXNpb24gfSA9IGdyb3VwO1xuXG4gIHRyeSB7XG4gICAgaWYgKG1hc3RlcktleSAmJiBncm91cEludml0ZUxpbmtQYXNzd29yZCkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBnZW5lcmF0ZUxlZnRHcm91cENoYW5nZXMvJHtsb2dJZH06IEhhdmUgaW52aXRlIGxpbmsuIEF0dGVtcHRpbmcgdG8gZmV0Y2ggbGF0ZXN0IHJldmlzaW9uIHdpdGggaXQuYFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHByZUpvaW5JbmZvID0gYXdhaXQgZ2V0UHJlSm9pbkdyb3VwSW5mbyhcbiAgICAgICAgZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQsXG4gICAgICAgIG1hc3RlcktleVxuICAgICAgKTtcblxuICAgICAgcmV2aXNpb24gPSBwcmVKb2luSW5mby52ZXJzaW9uO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cud2FybihcbiAgICAgICdnZW5lcmF0ZUxlZnRHcm91cENoYW5nZXM6IEZhaWxlZCB0byBmZXRjaCBsYXRlc3QgcmV2aXNpb24gdmlhIGdyb3VwIGxpbmsuIENvZGU6JyxcbiAgICAgIGVycm9yLmNvZGVcbiAgICApO1xuICB9XG5cbiAgY29uc3QgbmV3QXR0cmlidXRlczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgLi4uZ3JvdXAsXG4gICAgYWRkZWRCeTogdW5kZWZpbmVkLFxuICAgIG1lbWJlcnNWMjogKGdyb3VwLm1lbWJlcnNWMiB8fCBbXSkuZmlsdGVyKFxuICAgICAgbWVtYmVyID0+IG1lbWJlci51dWlkICE9PSBvdXJVdWlkXG4gICAgKSxcbiAgICBwZW5kaW5nTWVtYmVyc1YyOiAoZ3JvdXAucGVuZGluZ01lbWJlcnNWMiB8fCBbXSkuZmlsdGVyKFxuICAgICAgbWVtYmVyID0+IG1lbWJlci51dWlkICE9PSBvdXJVdWlkXG4gICAgKSxcbiAgICBwZW5kaW5nQWRtaW5BcHByb3ZhbFYyOiAoZ3JvdXAucGVuZGluZ0FkbWluQXBwcm92YWxWMiB8fCBbXSkuZmlsdGVyKFxuICAgICAgbWVtYmVyID0+IG1lbWJlci51dWlkICE9PSBvdXJVdWlkXG4gICAgKSxcbiAgICBsZWZ0OiB0cnVlLFxuICAgIHJldmlzaW9uLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgbmV3QXR0cmlidXRlcyxcbiAgICBncm91cENoYW5nZU1lc3NhZ2VzOiBleHRyYWN0RGlmZnMoe1xuICAgICAgY3VycmVudDogbmV3QXR0cmlidXRlcyxcbiAgICAgIG9sZDogZ3JvdXAsXG4gICAgfSksXG4gICAgbWVtYmVyczogW10sXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEdyb3VwQ3JlZGVudGlhbHMoe1xuICBhdXRoQ3JlZGVudGlhbEJhc2U2NCxcbiAgZ3JvdXBQdWJsaWNQYXJhbXNCYXNlNjQsXG4gIGdyb3VwU2VjcmV0UGFyYW1zQmFzZTY0LFxuICBzZXJ2ZXJQdWJsaWNQYXJhbXNCYXNlNjQsXG59OiB7XG4gIGF1dGhDcmVkZW50aWFsQmFzZTY0OiBzdHJpbmc7XG4gIGdyb3VwUHVibGljUGFyYW1zQmFzZTY0OiBzdHJpbmc7XG4gIGdyb3VwU2VjcmV0UGFyYW1zQmFzZTY0OiBzdHJpbmc7XG4gIHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NDogc3RyaW5nO1xufSk6IEdyb3VwQ3JlZGVudGlhbHNUeXBlIHtcbiAgY29uc3QgYXV0aE9wZXJhdGlvbnMgPSBnZXRDbGllbnRaa0F1dGhPcGVyYXRpb25zKHNlcnZlclB1YmxpY1BhcmFtc0Jhc2U2NCk7XG5cbiAgY29uc3QgcHJlc2VudGF0aW9uID0gZ2V0QXV0aENyZWRlbnRpYWxQcmVzZW50YXRpb24oXG4gICAgYXV0aE9wZXJhdGlvbnMsXG4gICAgYXV0aENyZWRlbnRpYWxCYXNlNjQsXG4gICAgZ3JvdXBTZWNyZXRQYXJhbXNCYXNlNjRcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGdyb3VwUHVibGljUGFyYW1zSGV4OiBCeXRlcy50b0hleChcbiAgICAgIEJ5dGVzLmZyb21CYXNlNjQoZ3JvdXBQdWJsaWNQYXJhbXNCYXNlNjQpXG4gICAgKSxcbiAgICBhdXRoQ3JlZGVudGlhbFByZXNlbnRhdGlvbkhleDogQnl0ZXMudG9IZXgocHJlc2VudGF0aW9uKSxcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaW50ZWdyYXRlR3JvdXBDaGFuZ2VzKHtcbiAgZ3JvdXAsXG4gIG5ld1JldmlzaW9uLFxuICBjaGFuZ2VzLFxufToge1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIG5ld1JldmlzaW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gIGNoYW5nZXM6IEFycmF5PFByb3RvLklHcm91cENoYW5nZXM+O1xufSk6IFByb21pc2U8VXBkYXRlc1Jlc3VsdFR5cGU+IHtcbiAgY29uc3QgbG9nSWQgPSBpZEZvckxvZ2dpbmcoZ3JvdXAuZ3JvdXBJZCk7XG4gIGxldCBhdHRyaWJ1dGVzID0gZ3JvdXA7XG4gIGNvbnN0IGZpbmFsTWVzc2FnZXM6IEFycmF5PEFycmF5PEdyb3VwQ2hhbmdlTWVzc2FnZVR5cGU+PiA9IFtdO1xuICBjb25zdCBmaW5hbE1lbWJlcnM6IEFycmF5PEFycmF5PE1lbWJlclR5cGU+PiA9IFtdO1xuXG4gIGNvbnN0IGltYXggPSBjaGFuZ2VzLmxlbmd0aDtcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBpbWF4OyBpICs9IDEpIHtcbiAgICBjb25zdCB7IGdyb3VwQ2hhbmdlcyB9ID0gY2hhbmdlc1tpXTtcblxuICAgIGlmICghZ3JvdXBDaGFuZ2VzKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBqbWF4ID0gZ3JvdXBDaGFuZ2VzLmxlbmd0aDtcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGptYXg7IGogKz0gMSkge1xuICAgICAgY29uc3QgY2hhbmdlU3RhdGUgPSBncm91cENoYW5nZXNbal07XG5cbiAgICAgIGNvbnN0IHsgZ3JvdXBDaGFuZ2UsIGdyb3VwU3RhdGUgfSA9IGNoYW5nZVN0YXRlO1xuXG4gICAgICBpZiAoIWdyb3VwQ2hhbmdlICYmICFncm91cFN0YXRlKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdpbnRlZ3JhdGVHcm91cENoYW5nZXM6IGl0ZW0gaGFkIG5laXRoZXIgZ3JvdXBTdGF0ZSBub3IgZ3JvdXBDaGFuZ2UuIFNraXBwaW5nLidcbiAgICAgICAgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IHtcbiAgICAgICAgICBuZXdBdHRyaWJ1dGVzLFxuICAgICAgICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXMsXG4gICAgICAgICAgbWVtYmVycyxcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgICAgICB9ID0gYXdhaXQgaW50ZWdyYXRlR3JvdXBDaGFuZ2Uoe1xuICAgICAgICAgIGdyb3VwOiBhdHRyaWJ1dGVzLFxuICAgICAgICAgIG5ld1JldmlzaW9uLFxuICAgICAgICAgIGdyb3VwQ2hhbmdlOiBkcm9wTnVsbChncm91cENoYW5nZSksXG4gICAgICAgICAgZ3JvdXBTdGF0ZTogZHJvcE51bGwoZ3JvdXBTdGF0ZSksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGF0dHJpYnV0ZXMgPSBuZXdBdHRyaWJ1dGVzO1xuICAgICAgICBmaW5hbE1lc3NhZ2VzLnB1c2goZ3JvdXBDaGFuZ2VNZXNzYWdlcyk7XG4gICAgICAgIGZpbmFsTWVtYmVycy5wdXNoKG1lbWJlcnMpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGBpbnRlZ3JhdGVHcm91cENoYW5nZXMvJHtsb2dJZH06IEZhaWxlZCB0byBhcHBseSBjaGFuZ2UgbG9nLCBjb250aW51aW5nIHRvIGFwcGx5IHJlbWFpbmluZyBjaGFuZ2UgbG9ncy5gLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIC8vIElmIHRoaXMgaXMgb3VyIGZpcnN0IGZldGNoLCB3ZSB3aWxsIGNvbGxhcHNlIHRoaXMgZG93biB0byBvbmUgc2V0IG9mIG1lc3NhZ2VzXG4gIGNvbnN0IGlzRmlyc3RGZXRjaCA9ICFpc051bWJlcihncm91cC5yZXZpc2lvbik7XG4gIGlmIChpc0ZpcnN0RmV0Y2gpIHtcbiAgICAvLyBUaGUgZmlyc3QgYXJyYXkgaW4gZmluYWxNZXNzYWdlcyBpcyBmcm9tIHRoZSBmaXJzdCByZXZpc2lvbiB3ZSBjb3VsZCBwcm9jZXNzLiBJdFxuICAgIC8vICAgc2hvdWxkIGNvbnRhaW4gYSBtZXNzYWdlIGFib3V0IGhvdyB3ZSBqb2luZWQgdGhlIGdyb3VwLlxuICAgIGNvbnN0IGpvaW5NZXNzYWdlcyA9IGZpbmFsTWVzc2FnZXNbMF07XG4gICAgY29uc3QgYWxyZWFkeUhhdmVKb2luTWVzc2FnZSA9IGpvaW5NZXNzYWdlcyAmJiBqb2luTWVzc2FnZXMubGVuZ3RoID4gMDtcblxuICAgIC8vIFRoZXJlIGhhdmUgYmVlbiBvdGhlciBjaGFuZ2VzIHNpbmNlIHRoYXQgZmlyc3QgcmV2aXNpb24sIHNvIHdlIGdlbmVyYXRlIGRpZmZzIGZvclxuICAgIC8vICAgdGhlIHdob2xlIG9mIHRoZSBjaGFuZ2Ugc2luY2UgdGhlbiwgbGlrZWx5IHdpdGhvdXQgdGhlIGluaXRpYWwgam9pbiBtZXNzYWdlLlxuICAgIGNvbnN0IG90aGVyTWVzc2FnZXMgPSBleHRyYWN0RGlmZnMoe1xuICAgICAgb2xkOiBncm91cCxcbiAgICAgIGN1cnJlbnQ6IGF0dHJpYnV0ZXMsXG4gICAgICBkcm9wSW5pdGlhbEpvaW5NZXNzYWdlOiBhbHJlYWR5SGF2ZUpvaW5NZXNzYWdlLFxuICAgIH0pO1xuXG4gICAgY29uc3QgZ3JvdXBDaGFuZ2VNZXNzYWdlcyA9IGFscmVhZHlIYXZlSm9pbk1lc3NhZ2VcbiAgICAgID8gW2pvaW5NZXNzYWdlc1swXSwgLi4ub3RoZXJNZXNzYWdlc11cbiAgICAgIDogb3RoZXJNZXNzYWdlcztcblxuICAgIHJldHVybiB7XG4gICAgICBuZXdBdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgICAgZ3JvdXBDaGFuZ2VNZXNzYWdlcyxcbiAgICAgIG1lbWJlcnM6IGZsYXR0ZW4oZmluYWxNZW1iZXJzKSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdBdHRyaWJ1dGVzOiBhdHRyaWJ1dGVzLFxuICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IGZsYXR0ZW4oZmluYWxNZXNzYWdlcyksXG4gICAgbWVtYmVyczogZmxhdHRlbihmaW5hbE1lbWJlcnMpLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBpbnRlZ3JhdGVHcm91cENoYW5nZSh7XG4gIGdyb3VwLFxuICBncm91cENoYW5nZSxcbiAgZ3JvdXBTdGF0ZSxcbiAgbmV3UmV2aXNpb24sXG59OiB7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgZ3JvdXBDaGFuZ2U/OiBQcm90by5JR3JvdXBDaGFuZ2U7XG4gIGdyb3VwU3RhdGU/OiBQcm90by5JR3JvdXA7XG4gIG5ld1JldmlzaW9uOiBudW1iZXIgfCB1bmRlZmluZWQ7XG59KTogUHJvbWlzZTxVcGRhdGVzUmVzdWx0VHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cC5ncm91cElkKTtcbiAgaWYgKCFncm91cC5zZWNyZXRQYXJhbXMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgaW50ZWdyYXRlR3JvdXBDaGFuZ2UvJHtsb2dJZH06IEdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyFgXG4gICAgKTtcbiAgfVxuXG4gIGlmICghZ3JvdXBDaGFuZ2UgJiYgIWdyb3VwU3RhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgaW50ZWdyYXRlR3JvdXBDaGFuZ2UvJHtsb2dJZH06IE5laXRoZXIgZ3JvdXBDaGFuZ2Ugbm9yIGdyb3VwU3RhdGUgcmVjZWl2ZWQhYFxuICAgICk7XG4gIH1cblxuICBjb25zdCBpc0ZpcnN0RmV0Y2ggPSAhaXNOdW1iZXIoZ3JvdXAucmV2aXNpb24pO1xuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IHdlQXJlQXdhaXRpbmdBcHByb3ZhbCA9IChncm91cC5wZW5kaW5nQWRtaW5BcHByb3ZhbFYyIHx8IFtdKS5maW5kKFxuICAgIGl0ZW0gPT4gaXRlbS51dWlkID09PSBvdXJVdWlkXG4gICk7XG5cbiAgLy8gVGhlc2UgbmVlZCB0byBiZSBwb3B1bGF0ZWQgZnJvbSB0aGUgZ3JvdXBDaGFuZ2UuIEJ1dCB3ZSBtaWdodCBub3QgZ2V0IG9uZSFcbiAgbGV0IGlzQ2hhbmdlU3VwcG9ydGVkID0gZmFsc2U7XG4gIGxldCBpc1NhbWVWZXJzaW9uID0gZmFsc2U7XG4gIGxldCBpc01vcmVUaGFuT25lVmVyc2lvblVwID0gZmFsc2U7XG4gIGxldCBncm91cENoYW5nZUFjdGlvbnM6IHVuZGVmaW5lZCB8IFByb3RvLkdyb3VwQ2hhbmdlLklBY3Rpb25zO1xuICBsZXQgZGVjcnlwdGVkQ2hhbmdlQWN0aW9uczogdW5kZWZpbmVkIHwgRGVjcnlwdGVkR3JvdXBDaGFuZ2VBY3Rpb25zO1xuICBsZXQgc291cmNlVXVpZDogdW5kZWZpbmVkIHwgVVVJRFN0cmluZ1R5cGU7XG5cbiAgaWYgKGdyb3VwQ2hhbmdlKSB7XG4gICAgZ3JvdXBDaGFuZ2VBY3Rpb25zID0gUHJvdG8uR3JvdXBDaGFuZ2UuQWN0aW9ucy5kZWNvZGUoXG4gICAgICBncm91cENoYW5nZS5hY3Rpb25zIHx8IG5ldyBVaW50OEFycmF5KDApXG4gICAgKTtcblxuICAgIC8vIFZlcnNpb24gaXMgaGlnaGVyIHRoYXQgd2hhdCB3ZSBoYXZlIGluIHRoZSBpbmNvbWluZyBtZXNzYWdlXG4gICAgaWYgKFxuICAgICAgZ3JvdXBDaGFuZ2VBY3Rpb25zLnZlcnNpb24gJiZcbiAgICAgIG5ld1JldmlzaW9uICE9PSB1bmRlZmluZWQgJiZcbiAgICAgIGdyb3VwQ2hhbmdlQWN0aW9ucy52ZXJzaW9uID4gbmV3UmV2aXNpb25cbiAgICApIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgaW50ZWdyYXRlR3JvdXBDaGFuZ2UvJHtsb2dJZH06IFNraXBwaW5nIGAgK1xuICAgICAgICAgIGAke2dyb3VwQ2hhbmdlQWN0aW9ucy52ZXJzaW9ufSwgbmV3UmV2aXNpb24gaXMgJHtuZXdSZXZpc2lvbn1gXG4gICAgICApO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbmV3QXR0cmlidXRlczogZ3JvdXAsXG4gICAgICAgIGdyb3VwQ2hhbmdlTWVzc2FnZXM6IFtdLFxuICAgICAgICBtZW1iZXJzOiBbXSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZGVjcnlwdGVkQ2hhbmdlQWN0aW9ucyA9IGRlY3J5cHRHcm91cENoYW5nZShcbiAgICAgIGdyb3VwQ2hhbmdlQWN0aW9ucyxcbiAgICAgIGdyb3VwLnNlY3JldFBhcmFtcyxcbiAgICAgIGxvZ0lkXG4gICAgKTtcblxuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGRlY3J5cHRlZENoYW5nZUFjdGlvbnMgIT09IHVuZGVmaW5lZCxcbiAgICAgICdTaG91bGQgaGF2ZSBkZWNyeXB0ZWQgZ3JvdXAgYWN0aW9ucydcbiAgICApO1xuICAgICh7IHNvdXJjZVV1aWQgfSA9IGRlY3J5cHRlZENoYW5nZUFjdGlvbnMpO1xuICAgIHN0cmljdEFzc2VydChzb3VyY2VVdWlkLCAnU2hvdWxkIGhhdmUgc291cmNlIFVVSUQnKTtcblxuICAgIGlzQ2hhbmdlU3VwcG9ydGVkID1cbiAgICAgICFpc051bWJlcihncm91cENoYW5nZS5jaGFuZ2VFcG9jaCkgfHxcbiAgICAgIGdyb3VwQ2hhbmdlLmNoYW5nZUVwb2NoIDw9IFNVUFBPUlRFRF9DSEFOR0VfRVBPQ0g7XG5cbiAgICAvLyBWZXJzaW9uIGlzIGxvd2VyIG9yIHRoZSBzYW1lIGFzIHdoYXQgd2UgY3VycmVudGx5IGhhdmVcbiAgICBpZiAoZ3JvdXAucmV2aXNpb24gIT09IHVuZGVmaW5lZCAmJiBncm91cENoYW5nZUFjdGlvbnMudmVyc2lvbikge1xuICAgICAgaWYgKGdyb3VwQ2hhbmdlQWN0aW9ucy52ZXJzaW9uIDwgZ3JvdXAucmV2aXNpb24pIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGludGVncmF0ZUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBTa2lwcGluZyBzdGFsZSB2ZXJzaW9uYCArXG4gICAgICAgICAgICBgJHtncm91cENoYW5nZUFjdGlvbnMudmVyc2lvbn0sIGN1cnJlbnQgYCArXG4gICAgICAgICAgICBgcmV2aXNpb24gaXMgJHtncm91cC5yZXZpc2lvbn1gXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgbmV3QXR0cmlidXRlczogZ3JvdXAsXG4gICAgICAgICAgZ3JvdXBDaGFuZ2VNZXNzYWdlczogW10sXG4gICAgICAgICAgbWVtYmVyczogW10sXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoZ3JvdXBDaGFuZ2VBY3Rpb25zLnZlcnNpb24gPT09IGdyb3VwLnJldmlzaW9uKSB7XG4gICAgICAgIGlzU2FtZVZlcnNpb24gPSB0cnVlO1xuICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgZ3JvdXBDaGFuZ2VBY3Rpb25zLnZlcnNpb24gPiBncm91cC5yZXZpc2lvbiArIDEgfHxcbiAgICAgICAgKCFpc051bWJlcihncm91cC5yZXZpc2lvbikgJiYgZ3JvdXBDaGFuZ2VBY3Rpb25zLnZlcnNpb24gPiAwKVxuICAgICAgKSB7XG4gICAgICAgIGlzTW9yZVRoYW5PbmVWZXJzaW9uVXAgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGxldCBhdHRyaWJ1dGVzID0gZ3JvdXA7XG4gIGNvbnN0IGFnZ3JlZ2F0ZWRDaGFuZ2VNZXNzYWdlcyA9IFtdO1xuICBjb25zdCBhZ2dyZWdhdGVkTWVtYmVycyA9IFtdO1xuXG4gIGNvbnN0IGNhbkFwcGx5Q2hhbmdlID1cbiAgICBncm91cENoYW5nZSAmJlxuICAgIGlzQ2hhbmdlU3VwcG9ydGVkICYmXG4gICAgIWlzU2FtZVZlcnNpb24gJiZcbiAgICAhaXNGaXJzdEZldGNoICYmXG4gICAgKCFpc01vcmVUaGFuT25lVmVyc2lvblVwIHx8IHdlQXJlQXdhaXRpbmdBcHByb3ZhbCk7XG5cbiAgLy8gQXBwbHkgdGhlIGNoYW5nZSBmaXJzdFxuICBpZiAoY2FuQXBwbHlDaGFuZ2UpIHtcbiAgICBpZiAoIXNvdXJjZVV1aWQgfHwgIWdyb3VwQ2hhbmdlQWN0aW9ucyB8fCAhZGVjcnlwdGVkQ2hhbmdlQWN0aW9ucykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgaW50ZWdyYXRlR3JvdXBDaGFuZ2UvJHtsb2dJZH06IE1pc3NpbmcgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIHRoYXQgc2hvdWxkIGhhdmUgY29tZSBmcm9tIGdyb3VwIGFjdGlvbnNgXG4gICAgICApO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgYGludGVncmF0ZUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBcHBseWluZyBncm91cCBjaGFuZ2UgYWN0aW9ucywgYCArXG4gICAgICAgIGBmcm9tIHZlcnNpb24gJHtncm91cC5yZXZpc2lvbn0gdG8gJHtncm91cENoYW5nZUFjdGlvbnMudmVyc2lvbn1gXG4gICAgKTtcblxuICAgIGNvbnN0IHsgbmV3QXR0cmlidXRlcywgbmV3UHJvZmlsZUtleXMgfSA9IGF3YWl0IGFwcGx5R3JvdXBDaGFuZ2Uoe1xuICAgICAgZ3JvdXAsXG4gICAgICBhY3Rpb25zOiBkZWNyeXB0ZWRDaGFuZ2VBY3Rpb25zLFxuICAgICAgc291cmNlVXVpZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3VwQ2hhbmdlTWVzc2FnZXMgPSBleHRyYWN0RGlmZnMoe1xuICAgICAgb2xkOiBhdHRyaWJ1dGVzLFxuICAgICAgY3VycmVudDogbmV3QXR0cmlidXRlcyxcbiAgICAgIHNvdXJjZVV1aWQsXG4gICAgfSk7XG5cbiAgICBhdHRyaWJ1dGVzID0gbmV3QXR0cmlidXRlcztcbiAgICBhZ2dyZWdhdGVkQ2hhbmdlTWVzc2FnZXMucHVzaChncm91cENoYW5nZU1lc3NhZ2VzKTtcbiAgICBhZ2dyZWdhdGVkTWVtYmVycy5wdXNoKHByb2ZpbGVLZXlzVG9NZW1iZXJzKG5ld1Byb2ZpbGVLZXlzKSk7XG4gIH1cblxuICAvLyBBcHBseSB0aGUgZ3JvdXAgc3RhdGUgYWZ0ZXJ3YXJkcyB0byB2ZXJpZnkgdGhhdCB3ZSBkaWRuJ3QgbWlzcyBhbnl0aGluZ1xuICBpZiAoZ3JvdXBTdGF0ZSkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYGludGVncmF0ZUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBcHBseWluZyBmdWxsIGdyb3VwIHN0YXRlLCBgICtcbiAgICAgICAgYGZyb20gdmVyc2lvbiAke2dyb3VwLnJldmlzaW9ufSB0byAke2dyb3VwU3RhdGUudmVyc2lvbn1gLFxuICAgICAge1xuICAgICAgICBpc0NoYW5nZVByZXNlbnQ6IEJvb2xlYW4oZ3JvdXBDaGFuZ2UpLFxuICAgICAgICBpc0NoYW5nZVN1cHBvcnRlZCxcbiAgICAgICAgaXNGaXJzdEZldGNoLFxuICAgICAgICBpc1NhbWVWZXJzaW9uLFxuICAgICAgICBpc01vcmVUaGFuT25lVmVyc2lvblVwLFxuICAgICAgICB3ZUFyZUF3YWl0aW5nQXBwcm92YWwsXG4gICAgICB9XG4gICAgKTtcblxuICAgIGNvbnN0IGRlY3J5cHRlZEdyb3VwU3RhdGUgPSBkZWNyeXB0R3JvdXBTdGF0ZShcbiAgICAgIGdyb3VwU3RhdGUsXG4gICAgICBncm91cC5zZWNyZXRQYXJhbXMsXG4gICAgICBsb2dJZFxuICAgICk7XG5cbiAgICBjb25zdCB7IG5ld0F0dHJpYnV0ZXMsIG5ld1Byb2ZpbGVLZXlzIH0gPSBhd2FpdCBhcHBseUdyb3VwU3RhdGUoe1xuICAgICAgZ3JvdXA6IGF0dHJpYnV0ZXMsXG4gICAgICBncm91cFN0YXRlOiBkZWNyeXB0ZWRHcm91cFN0YXRlLFxuICAgICAgc291cmNlVXVpZDogaXNGaXJzdEZldGNoID8gc291cmNlVXVpZCA6IHVuZGVmaW5lZCxcbiAgICB9KTtcblxuICAgIGNvbnN0IGdyb3VwQ2hhbmdlTWVzc2FnZXMgPSBleHRyYWN0RGlmZnMoe1xuICAgICAgb2xkOiBhdHRyaWJ1dGVzLFxuICAgICAgY3VycmVudDogbmV3QXR0cmlidXRlcyxcbiAgICAgIHNvdXJjZVV1aWQ6IGlzRmlyc3RGZXRjaCA/IHNvdXJjZVV1aWQgOiB1bmRlZmluZWQsXG4gICAgfSk7XG5cbiAgICBjb25zdCBuZXdNZW1iZXJzID0gcHJvZmlsZUtleXNUb01lbWJlcnMobmV3UHJvZmlsZUtleXMpO1xuXG4gICAgaWYgKFxuICAgICAgY2FuQXBwbHlDaGFuZ2UgJiZcbiAgICAgIChncm91cENoYW5nZU1lc3NhZ2VzLmxlbmd0aCAhPT0gMCB8fCBuZXdNZW1iZXJzLmxlbmd0aCAhPT0gMClcbiAgICApIHtcbiAgICAgIGFzc2VydChcbiAgICAgICAgZ3JvdXBDaGFuZ2VNZXNzYWdlcy5sZW5ndGggPT09IDAsXG4gICAgICAgICdGYWxsYmFjayBncm91cCBzdGF0ZSBwcm9jZXNzaW5nIHNob3VsZCBub3Qga2ljayBpbidcbiAgICAgICk7XG5cbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgaW50ZWdyYXRlR3JvdXBDaGFuZ2UvJHtsb2dJZH06IGxvY2FsIHN0YXRlIHdhcyBkaWZmZXJlbnQgZnJvbSBgICtcbiAgICAgICAgICAndGhlIHJlbW90ZSBmaW5hbCBzdGF0ZS4gJyArXG4gICAgICAgICAgYEdvdCAke2dyb3VwQ2hhbmdlTWVzc2FnZXMubGVuZ3RofSBjaGFuZ2UgbWVzc2FnZXMsIGFuZCBgICtcbiAgICAgICAgICBgJHtuZXdNZW1iZXJzLmxlbmd0aH0gdXBkYXRlZCBtZW1iZXJzYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBhdHRyaWJ1dGVzID0gbmV3QXR0cmlidXRlcztcbiAgICBhZ2dyZWdhdGVkQ2hhbmdlTWVzc2FnZXMucHVzaChncm91cENoYW5nZU1lc3NhZ2VzKTtcbiAgICBhZ2dyZWdhdGVkTWVtYmVycy5wdXNoKG5ld01lbWJlcnMpO1xuICB9IGVsc2Uge1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGNhbkFwcGx5Q2hhbmdlLFxuICAgICAgYGludGVncmF0ZUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBObyBncm91cCBzdGF0ZSwgYnV0IHdlIGNhbid0IGFwcGx5IGNoYW5nZXMhYFxuICAgICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIG5ld0F0dHJpYnV0ZXM6IGF0dHJpYnV0ZXMsXG4gICAgZ3JvdXBDaGFuZ2VNZXNzYWdlczogYWdncmVnYXRlZENoYW5nZU1lc3NhZ2VzLmZsYXQoKSxcbiAgICBtZW1iZXJzOiBhZ2dyZWdhdGVkTWVtYmVycy5mbGF0KCksXG4gIH07XG59XG5cbmZ1bmN0aW9uIGV4dHJhY3REaWZmcyh7XG4gIGN1cnJlbnQsXG4gIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2UsXG4gIG9sZCxcbiAgc291cmNlVXVpZCxcbn06IHtcbiAgY3VycmVudDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2U/OiBib29sZWFuO1xuICBvbGQ6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlO1xuICBzb3VyY2VVdWlkPzogVVVJRFN0cmluZ1R5cGU7XG59KTogQXJyYXk8R3JvdXBDaGFuZ2VNZXNzYWdlVHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhvbGQuZ3JvdXBJZCk7XG4gIGNvbnN0IGRldGFpbHM6IEFycmF5PEdyb3VwVjJDaGFuZ2VEZXRhaWxUeXBlPiA9IFtdO1xuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG4gIGNvbnN0IEFDQ0VTU19FTlVNID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcblxuICBsZXQgYXJlV2VJbkdyb3VwID0gZmFsc2U7XG4gIGxldCBhcmVXZUludml0ZWRUb0dyb3VwID0gZmFsc2U7XG4gIGxldCBhcmVXZVBlbmRpbmdBcHByb3ZhbCA9IGZhbHNlO1xuICBsZXQgd2hvSW52aXRlZFVzVXNlcklkID0gbnVsbDtcblxuICAvLyBhY2Nlc3MgY29udHJvbFxuXG4gIGlmIChcbiAgICBjdXJyZW50LmFjY2Vzc0NvbnRyb2wgJiZcbiAgICBvbGQuYWNjZXNzQ29udHJvbCAmJlxuICAgIG9sZC5hY2Nlc3NDb250cm9sLmF0dHJpYnV0ZXMgIT09IHVuZGVmaW5lZCAmJlxuICAgIG9sZC5hY2Nlc3NDb250cm9sLmF0dHJpYnV0ZXMgIT09IGN1cnJlbnQuYWNjZXNzQ29udHJvbC5hdHRyaWJ1dGVzXG4gICkge1xuICAgIGRldGFpbHMucHVzaCh7XG4gICAgICB0eXBlOiAnYWNjZXNzLWF0dHJpYnV0ZXMnLFxuICAgICAgbmV3UHJpdmlsZWdlOiBjdXJyZW50LmFjY2Vzc0NvbnRyb2wuYXR0cmlidXRlcyxcbiAgICB9KTtcbiAgfVxuICBpZiAoXG4gICAgY3VycmVudC5hY2Nlc3NDb250cm9sICYmXG4gICAgb2xkLmFjY2Vzc0NvbnRyb2wgJiZcbiAgICBvbGQuYWNjZXNzQ29udHJvbC5tZW1iZXJzICE9PSB1bmRlZmluZWQgJiZcbiAgICBvbGQuYWNjZXNzQ29udHJvbC5tZW1iZXJzICE9PSBjdXJyZW50LmFjY2Vzc0NvbnRyb2wubWVtYmVyc1xuICApIHtcbiAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgdHlwZTogJ2FjY2Vzcy1tZW1iZXJzJyxcbiAgICAgIG5ld1ByaXZpbGVnZTogY3VycmVudC5hY2Nlc3NDb250cm9sLm1lbWJlcnMsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBsaW5rUHJldmlvdXNseUVuYWJsZWQgPSBpc0FjY2Vzc0NvbnRyb2xFbmFibGVkKFxuICAgIG9sZC5hY2Nlc3NDb250cm9sPy5hZGRGcm9tSW52aXRlTGlua1xuICApO1xuICBjb25zdCBsaW5rQ3VycmVudGx5RW5hYmxlZCA9IGlzQWNjZXNzQ29udHJvbEVuYWJsZWQoXG4gICAgY3VycmVudC5hY2Nlc3NDb250cm9sPy5hZGRGcm9tSW52aXRlTGlua1xuICApO1xuXG4gIGlmICghbGlua1ByZXZpb3VzbHlFbmFibGVkICYmIGxpbmtDdXJyZW50bHlFbmFibGVkKSB7XG4gICAgZGV0YWlscy5wdXNoKHtcbiAgICAgIHR5cGU6ICdncm91cC1saW5rLWFkZCcsXG4gICAgICBwcml2aWxlZ2U6IGN1cnJlbnQuYWNjZXNzQ29udHJvbD8uYWRkRnJvbUludml0ZUxpbmsgfHwgQUNDRVNTX0VOVU0uQU5ZLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKGxpbmtQcmV2aW91c2x5RW5hYmxlZCAmJiAhbGlua0N1cnJlbnRseUVuYWJsZWQpIHtcbiAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgdHlwZTogJ2dyb3VwLWxpbmstcmVtb3ZlJyxcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChcbiAgICBsaW5rUHJldmlvdXNseUVuYWJsZWQgJiZcbiAgICBsaW5rQ3VycmVudGx5RW5hYmxlZCAmJlxuICAgIG9sZC5hY2Nlc3NDb250cm9sPy5hZGRGcm9tSW52aXRlTGluayAhPT1cbiAgICAgIGN1cnJlbnQuYWNjZXNzQ29udHJvbD8uYWRkRnJvbUludml0ZUxpbmtcbiAgKSB7XG4gICAgZGV0YWlscy5wdXNoKHtcbiAgICAgIHR5cGU6ICdhY2Nlc3MtaW52aXRlLWxpbmsnLFxuICAgICAgbmV3UHJpdmlsZWdlOiBjdXJyZW50LmFjY2Vzc0NvbnRyb2w/LmFkZEZyb21JbnZpdGVMaW5rIHx8IEFDQ0VTU19FTlVNLkFOWSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGF2YXRhclxuXG4gIGlmIChcbiAgICBCb29sZWFuKG9sZC5hdmF0YXIpICE9PSBCb29sZWFuKGN1cnJlbnQuYXZhdGFyKSB8fFxuICAgIG9sZC5hdmF0YXI/Lmhhc2ggIT09IGN1cnJlbnQuYXZhdGFyPy5oYXNoXG4gICkge1xuICAgIGRldGFpbHMucHVzaCh7XG4gICAgICB0eXBlOiAnYXZhdGFyJyxcbiAgICAgIHJlbW92ZWQ6ICFjdXJyZW50LmF2YXRhcixcbiAgICB9KTtcbiAgfVxuXG4gIC8vIG5hbWVcblxuICBpZiAob2xkLm5hbWUgIT09IGN1cnJlbnQubmFtZSkge1xuICAgIGRldGFpbHMucHVzaCh7XG4gICAgICB0eXBlOiAndGl0bGUnLFxuICAgICAgbmV3VGl0bGU6IGN1cnJlbnQubmFtZSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGdyb3VwSW52aXRlTGlua1Bhc3N3b3JkXG5cbiAgLy8gTm90ZTogd2Ugb25seSBjYXB0dXJlIGxpbmsgcmVzZXRzIGhlcmUuIEVuYWJsZS9kaXNhYmxlIGFyZSBjb250cm9sbGVkIGJ5IHRoZVxuICAvLyAgIGFjY2Vzc0NvbnRyb2wuYWRkRnJvbUludml0ZUxpbmtcbiAgaWYgKFxuICAgIG9sZC5ncm91cEludml0ZUxpbmtQYXNzd29yZCAmJlxuICAgIGN1cnJlbnQuZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgJiZcbiAgICBvbGQuZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgIT09IGN1cnJlbnQuZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmRcbiAgKSB7XG4gICAgZGV0YWlscy5wdXNoKHtcbiAgICAgIHR5cGU6ICdncm91cC1saW5rLXJlc2V0JyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIGRlc2NyaXB0aW9uXG4gIGlmIChvbGQuZGVzY3JpcHRpb24gIT09IGN1cnJlbnQuZGVzY3JpcHRpb24pIHtcbiAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgdHlwZTogJ2Rlc2NyaXB0aW9uJyxcbiAgICAgIHJlbW92ZWQ6ICFjdXJyZW50LmRlc2NyaXB0aW9uLFxuICAgICAgZGVzY3JpcHRpb246IGN1cnJlbnQuZGVzY3JpcHRpb24sXG4gICAgfSk7XG4gIH1cblxuICAvLyBObyBkaXNhcHBlYXJpbmcgbWVzc2FnZSB0aW1lciBjaGVjayBoZXJlIC0gc2VlIGJlbG93XG5cbiAgLy8gbWVtYmVyc1YyXG5cbiAgY29uc3Qgb2xkTWVtYmVyTG9va3VwID0gbmV3IE1hcDxVVUlEU3RyaW5nVHlwZSwgR3JvdXBWMk1lbWJlclR5cGU+KFxuICAgIChvbGQubWVtYmVyc1YyIHx8IFtdKS5tYXAobWVtYmVyID0+IFttZW1iZXIudXVpZCwgbWVtYmVyXSlcbiAgKTtcbiAgY29uc3Qgb2xkUGVuZGluZ01lbWJlckxvb2t1cCA9IG5ldyBNYXA8XG4gICAgVVVJRFN0cmluZ1R5cGUsXG4gICAgR3JvdXBWMlBlbmRpbmdNZW1iZXJUeXBlXG4gID4oKG9sZC5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKS5tYXAobWVtYmVyID0+IFttZW1iZXIudXVpZCwgbWVtYmVyXSkpO1xuICBjb25zdCBvbGRQZW5kaW5nQWRtaW5BcHByb3ZhbExvb2t1cCA9IG5ldyBNYXA8XG4gICAgVVVJRFN0cmluZ1R5cGUsXG4gICAgR3JvdXBWMlBlbmRpbmdBZG1pbkFwcHJvdmFsVHlwZVxuICA+KChvbGQucGVuZGluZ0FkbWluQXBwcm92YWxWMiB8fCBbXSkubWFwKG1lbWJlciA9PiBbbWVtYmVyLnV1aWQsIG1lbWJlcl0pKTtcblxuICAoY3VycmVudC5tZW1iZXJzVjIgfHwgW10pLmZvckVhY2goY3VycmVudE1lbWJlciA9PiB7XG4gICAgY29uc3QgeyB1dWlkIH0gPSBjdXJyZW50TWVtYmVyO1xuXG4gICAgaWYgKHV1aWQgPT09IG91clV1aWQpIHtcbiAgICAgIGFyZVdlSW5Hcm91cCA9IHRydWU7XG4gICAgfVxuXG4gICAgY29uc3Qgb2xkTWVtYmVyID0gb2xkTWVtYmVyTG9va3VwLmdldCh1dWlkKTtcbiAgICBpZiAoIW9sZE1lbWJlcikge1xuICAgICAgY29uc3QgcGVuZGluZ01lbWJlciA9IG9sZFBlbmRpbmdNZW1iZXJMb29rdXAuZ2V0KHV1aWQpO1xuICAgICAgaWYgKHBlbmRpbmdNZW1iZXIpIHtcbiAgICAgICAgZGV0YWlscy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWludml0ZScsXG4gICAgICAgICAgdXVpZCxcbiAgICAgICAgICBpbnZpdGVyOiBwZW5kaW5nTWVtYmVyLmFkZGVkQnlVc2VySWQsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50TWVtYmVyLmpvaW5lZEZyb21MaW5rKSB7XG4gICAgICAgIGRldGFpbHMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQtZnJvbS1saW5rJyxcbiAgICAgICAgICB1dWlkLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSBpZiAoY3VycmVudE1lbWJlci5hcHByb3ZlZEJ5QWRtaW4pIHtcbiAgICAgICAgZGV0YWlscy5wdXNoKHtcbiAgICAgICAgICB0eXBlOiAnbWVtYmVyLWFkZC1mcm9tLWFkbWluLWFwcHJvdmFsJyxcbiAgICAgICAgICB1dWlkLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGRldGFpbHMucHVzaCh7XG4gICAgICAgICAgdHlwZTogJ21lbWJlci1hZGQnLFxuICAgICAgICAgIHV1aWQsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAob2xkTWVtYmVyLnJvbGUgIT09IGN1cnJlbnRNZW1iZXIucm9sZSkge1xuICAgICAgZGV0YWlscy5wdXNoKHtcbiAgICAgICAgdHlwZTogJ21lbWJlci1wcml2aWxlZ2UnLFxuICAgICAgICB1dWlkLFxuICAgICAgICBuZXdQcml2aWxlZ2U6IGN1cnJlbnRNZW1iZXIucm9sZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIC8vIFdlIGRvbid0IHdhbnQgdG8gZ2VuZXJhdGUgYW4gYWRtaW4tYXBwcm92YWwtcmVtb3ZlIGV2ZW50IGZvciB0aGlzIG5ld2x5LWFkZGVkXG4gICAgLy8gICBtZW1iZXIuIEJ1dCB3ZSBkb24ndCBrbm93IGZvciBzdXJlIGlmIHRoaXMgaXMgYW4gYWRtaW4gYXBwcm92YWw7IGZvciB0aGF0IHdlXG4gICAgLy8gICBjb25zdWx0ZWQgdGhlIGFwcHJvdmVkQnlBZG1pbiBmbGFnIHNhdmVkIG9uIHRoZSBtZW1iZXIuXG4gICAgb2xkUGVuZGluZ0FkbWluQXBwcm92YWxMb29rdXAuZGVsZXRlKHV1aWQpO1xuXG4gICAgLy8gSWYgd2UgY2FwdHVyZSBhIHBlbmRpbmcgcmVtb3ZlIGhlcmUsIGl0J3MgYW4gJ2FjY2VwdCBpbnZpdGF0aW9uJywgYW5kIHdlIGRvbid0XG4gICAgLy8gICB3YW50IHRvIGdlbmVyYXRlIGEgcGVuZGluZy1yZW1vdmUgZXZlbnQgZm9yIGl0XG4gICAgb2xkUGVuZGluZ01lbWJlckxvb2t1cC5kZWxldGUodXVpZCk7XG5cbiAgICAvLyBUaGlzIGRlbGV0aW9uIG1ha2VzIGl0IGVhc2llciB0byBjYXB0dXJlIHJlbW92YWxzXG4gICAgb2xkTWVtYmVyTG9va3VwLmRlbGV0ZSh1dWlkKTtcbiAgfSk7XG5cbiAgY29uc3QgcmVtb3ZlZE1lbWJlcklkcyA9IEFycmF5LmZyb20ob2xkTWVtYmVyTG9va3VwLmtleXMoKSk7XG4gIHJlbW92ZWRNZW1iZXJJZHMuZm9yRWFjaCh1dWlkID0+IHtcbiAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgdHlwZTogJ21lbWJlci1yZW1vdmUnLFxuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gcGVuZGluZ01lbWJlcnNWMlxuXG4gIGxldCBsYXN0UGVuZGluZ1V1aWQ6IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkO1xuICBsZXQgcGVuZGluZ0NvdW50ID0gMDtcbiAgKGN1cnJlbnQucGVuZGluZ01lbWJlcnNWMiB8fCBbXSkuZm9yRWFjaChjdXJyZW50UGVuZGluZ01lbWJlciA9PiB7XG4gICAgY29uc3QgeyB1dWlkIH0gPSBjdXJyZW50UGVuZGluZ01lbWJlcjtcbiAgICBjb25zdCBvbGRQZW5kaW5nTWVtYmVyID0gb2xkUGVuZGluZ01lbWJlckxvb2t1cC5nZXQodXVpZCk7XG5cbiAgICBpZiAodXVpZCA9PT0gb3VyVXVpZCkge1xuICAgICAgYXJlV2VJbnZpdGVkVG9Hcm91cCA9IHRydWU7XG4gICAgICB3aG9JbnZpdGVkVXNVc2VySWQgPSBjdXJyZW50UGVuZGluZ01lbWJlci5hZGRlZEJ5VXNlcklkO1xuICAgIH1cblxuICAgIGlmICghb2xkUGVuZGluZ01lbWJlcikge1xuICAgICAgbGFzdFBlbmRpbmdVdWlkID0gdXVpZDtcbiAgICAgIHBlbmRpbmdDb3VudCArPSAxO1xuICAgIH1cblxuICAgIC8vIFRoaXMgZGVsZXRpb24gbWFrZXMgaXQgZWFzaWVyIHRvIGNhcHR1cmUgcmVtb3ZhbHNcbiAgICBvbGRQZW5kaW5nTWVtYmVyTG9va3VwLmRlbGV0ZSh1dWlkKTtcbiAgfSk7XG5cbiAgaWYgKHBlbmRpbmdDb3VudCA+IDEpIHtcbiAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgdHlwZTogJ3BlbmRpbmctYWRkLW1hbnknLFxuICAgICAgY291bnQ6IHBlbmRpbmdDb3VudCxcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChwZW5kaW5nQ291bnQgPT09IDEpIHtcbiAgICBpZiAobGFzdFBlbmRpbmdVdWlkKSB7XG4gICAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgICB0eXBlOiAncGVuZGluZy1hZGQtb25lJyxcbiAgICAgICAgdXVpZDogbGFzdFBlbmRpbmdVdWlkLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZXh0cmFjdERpZmZzLyR7bG9nSWR9OiBwZW5kaW5nQ291bnQgd2FzIDEsIG5vIGxhc3QgY29udmVyc2F0aW9uSWQgYXZhaWxhYmxlYFxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBOb3RlOiBUaGUgb25seSBtZW1iZXJzIGxlZnQgb3ZlciBoZXJlIHNob3VsZCBiZSBwZW9wbGUgd2hvIHdlcmUgbW92ZWQgZnJvbSB0aGVcbiAgLy8gICBwZW5kaW5nIGxpc3QgYnV0IGFsc28gbm90IGFkZGVkIHRvIHRoZSBncm91cCBhdCB0aGUgc2FtZSB0aW1lLlxuICBjb25zdCByZW1vdmVkUGVuZGluZ01lbWJlcklkcyA9IEFycmF5LmZyb20ob2xkUGVuZGluZ01lbWJlckxvb2t1cC5rZXlzKCkpO1xuICBpZiAocmVtb3ZlZFBlbmRpbmdNZW1iZXJJZHMubGVuZ3RoID4gMSkge1xuICAgIGNvbnN0IGZpcnN0VXVpZCA9IHJlbW92ZWRQZW5kaW5nTWVtYmVySWRzWzBdO1xuICAgIGNvbnN0IGZpcnN0UmVtb3ZlZE1lbWJlciA9IG9sZFBlbmRpbmdNZW1iZXJMb29rdXAuZ2V0KGZpcnN0VXVpZCk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgZmlyc3RSZW1vdmVkTWVtYmVyICE9PSB1bmRlZmluZWQsXG4gICAgICAnRmlyc3QgcmVtb3ZlZCBtZW1iZXIgbm90IGZvdW5kJ1xuICAgICk7XG4gICAgY29uc3QgaW52aXRlciA9IGZpcnN0UmVtb3ZlZE1lbWJlci5hZGRlZEJ5VXNlcklkO1xuICAgIGNvbnN0IGFsbFNhbWVJbnZpdGVyID0gcmVtb3ZlZFBlbmRpbmdNZW1iZXJJZHMuZXZlcnkoXG4gICAgICBpZCA9PiBvbGRQZW5kaW5nTWVtYmVyTG9va3VwLmdldChpZCk/LmFkZGVkQnlVc2VySWQgPT09IGludml0ZXJcbiAgICApO1xuICAgIGRldGFpbHMucHVzaCh7XG4gICAgICB0eXBlOiAncGVuZGluZy1yZW1vdmUtbWFueScsXG4gICAgICBjb3VudDogcmVtb3ZlZFBlbmRpbmdNZW1iZXJJZHMubGVuZ3RoLFxuICAgICAgaW52aXRlcjogYWxsU2FtZUludml0ZXIgPyBpbnZpdGVyIDogdW5kZWZpbmVkLFxuICAgIH0pO1xuICB9IGVsc2UgaWYgKHJlbW92ZWRQZW5kaW5nTWVtYmVySWRzLmxlbmd0aCA9PT0gMSkge1xuICAgIGNvbnN0IHV1aWQgPSByZW1vdmVkUGVuZGluZ01lbWJlcklkc1swXTtcbiAgICBjb25zdCByZW1vdmVkTWVtYmVyID0gb2xkUGVuZGluZ01lbWJlckxvb2t1cC5nZXQodXVpZCk7XG4gICAgc3RyaWN0QXNzZXJ0KHJlbW92ZWRNZW1iZXIgIT09IHVuZGVmaW5lZCwgJ1JlbW92ZWQgbWVtYmVyIG5vdCBmb3VuZCcpO1xuXG4gICAgZGV0YWlscy5wdXNoKHtcbiAgICAgIHR5cGU6ICdwZW5kaW5nLXJlbW92ZS1vbmUnLFxuICAgICAgdXVpZCxcbiAgICAgIGludml0ZXI6IHJlbW92ZWRNZW1iZXIuYWRkZWRCeVVzZXJJZCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIHBlbmRpbmdBZG1pbkFwcHJvdmFsVjJcblxuICAoY3VycmVudC5wZW5kaW5nQWRtaW5BcHByb3ZhbFYyIHx8IFtdKS5mb3JFYWNoKFxuICAgIGN1cnJlbnRQZW5kaW5nQWRtaW5BcHJvdmFsTWVtYmVyID0+IHtcbiAgICAgIGNvbnN0IHsgdXVpZCB9ID0gY3VycmVudFBlbmRpbmdBZG1pbkFwcm92YWxNZW1iZXI7XG4gICAgICBjb25zdCBvbGRQZW5kaW5nTWVtYmVyID0gb2xkUGVuZGluZ0FkbWluQXBwcm92YWxMb29rdXAuZ2V0KHV1aWQpO1xuXG4gICAgICBpZiAodXVpZCA9PT0gb3VyVXVpZCkge1xuICAgICAgICBhcmVXZVBlbmRpbmdBcHByb3ZhbCA9IHRydWU7XG4gICAgICB9XG5cbiAgICAgIGlmICghb2xkUGVuZGluZ01lbWJlcikge1xuICAgICAgICBkZXRhaWxzLnB1c2goe1xuICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1hZGQtb25lJyxcbiAgICAgICAgICB1dWlkLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgLy8gVGhpcyBkZWxldGlvbiBtYWtlcyBpdCBlYXNpZXIgdG8gY2FwdHVyZSByZW1vdmFsc1xuICAgICAgb2xkUGVuZGluZ0FkbWluQXBwcm92YWxMb29rdXAuZGVsZXRlKHV1aWQpO1xuICAgIH1cbiAgKTtcblxuICAvLyBOb3RlOiBUaGUgb25seSBtZW1iZXJzIGxlZnQgb3ZlciBoZXJlIHNob3VsZCBiZSBwZW9wbGUgd2hvIHdlcmUgbW92ZWQgZnJvbSB0aGVcbiAgLy8gICBwZW5kaW5nQWRtaW5BcHByb3ZhbCBsaXN0IGJ1dCBhbHNvIG5vdCBhZGRlZCB0byB0aGUgZ3JvdXAgYXQgdGhlIHNhbWUgdGltZS5cbiAgY29uc3QgcmVtb3ZlZFBlbmRpbmdBZG1pbkFwcHJvdmFsSWRzID0gQXJyYXkuZnJvbShcbiAgICBvbGRQZW5kaW5nQWRtaW5BcHByb3ZhbExvb2t1cC5rZXlzKClcbiAgKTtcbiAgcmVtb3ZlZFBlbmRpbmdBZG1pbkFwcHJvdmFsSWRzLmZvckVhY2godXVpZCA9PiB7XG4gICAgZGV0YWlscy5wdXNoKHtcbiAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1yZW1vdmUtb25lJyxcbiAgICAgIHV1aWQsXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFubm91bmNlbWVudHNPbmx5XG5cbiAgaWYgKEJvb2xlYW4ob2xkLmFubm91bmNlbWVudHNPbmx5KSAhPT0gQm9vbGVhbihjdXJyZW50LmFubm91bmNlbWVudHNPbmx5KSkge1xuICAgIGRldGFpbHMucHVzaCh7XG4gICAgICB0eXBlOiAnYW5ub3VuY2VtZW50cy1vbmx5JyxcbiAgICAgIGFubm91bmNlbWVudHNPbmx5OiBCb29sZWFuKGN1cnJlbnQuYW5ub3VuY2VtZW50c09ubHkpLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gTm90ZTogY3VycmVudGx5IG5vIGRpZmYgZ2VuZXJhdGVkIGZvciBiYW5uZWRNZW1iZXJzVjIgY2hhbmdlc1xuXG4gIC8vIGZpbmFsIHByb2Nlc3NpbmdcblxuICBsZXQgbWVzc2FnZTogR3JvdXBDaGFuZ2VNZXNzYWdlVHlwZSB8IHVuZGVmaW5lZDtcbiAgbGV0IHRpbWVyTm90aWZpY2F0aW9uOiBHcm91cENoYW5nZU1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkO1xuXG4gIGNvbnN0IGZpcnN0VXBkYXRlID0gIWlzTnVtYmVyKG9sZC5yZXZpc2lvbik7XG4gIGNvbnN0IGlzRnJvbVVzID0gb3VyVXVpZCA9PT0gc291cmNlVXVpZDtcblxuICAvLyBIZXJlIHdlIGhhcmRjb2RlIGluaXRpYWwgbWVzc2FnZXMgaWYgdGhpcyBpcyBvdXIgZmlyc3QgdGltZSBwcm9jZXNzaW5nIGRhdGEgdGhpc1xuICAvLyAgIGdyb3VwLiBJZGVhbGx5IHdlIGNhbiBjb2xsYXBzZSBpdCBkb3duIHRvIGp1c3Qgb25lIG9mOiAneW91IHdlcmUgYWRkZWQnLFxuICAvLyAgICd5b3Ugd2VyZSBpbnZpdGVkJywgb3IgJ3lvdSBjcmVhdGVkLidcbiAgaWYgKGZpcnN0VXBkYXRlICYmIGFyZVdlSW52aXRlZFRvR3JvdXApIHtcbiAgICAvLyBOb3RlLCB3ZSB3aWxsIGFkZCAneW91IHdlcmUgaW52aXRlZCcgdG8gZ3JvdXAgZXZlbiBpZiBkcm9wSW5pdGlhbEpvaW5NZXNzYWdlID0gdHJ1ZVxuICAgIG1lc3NhZ2UgPSB7XG4gICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScsXG4gICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgIGZyb206IHdob0ludml0ZWRVc1VzZXJJZCB8fCBzb3VyY2VVdWlkLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ3BlbmRpbmctYWRkLW9uZScsXG4gICAgICAgICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgICAgc2VlblN0YXR1czogaXNGcm9tVXMgPyBTZWVuU3RhdHVzLlNlZW4gOiBTZWVuU3RhdHVzLlVuc2VlbixcbiAgICB9O1xuICB9IGVsc2UgaWYgKGZpcnN0VXBkYXRlICYmIGFyZVdlUGVuZGluZ0FwcHJvdmFsKSB7XG4gICAgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmdlbmVyYXRlQmFzaWNNZXNzYWdlKCksXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZnJvbTogb3VyVXVpZCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdhZG1pbi1hcHByb3ZhbC1hZGQtb25lJyxcbiAgICAgICAgICAgIHV1aWQ6IG91clV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfSBlbHNlIGlmIChmaXJzdFVwZGF0ZSAmJiBkcm9wSW5pdGlhbEpvaW5NZXNzYWdlKSB7XG4gICAgLy8gTm9uZSBvZiB0aGUgcmVzdCBvZiB0aGUgbWVzc2FnZXMgc2hvdWxkIGJlIGFkZGVkIGlmIGRyb3BJbml0aWFsSm9pbk1lc3NhZ2UgPSB0cnVlXG4gICAgbWVzc2FnZSA9IHVuZGVmaW5lZDtcbiAgfSBlbHNlIGlmIChcbiAgICBmaXJzdFVwZGF0ZSAmJlxuICAgIGN1cnJlbnQucmV2aXNpb24gPT09IDAgJiZcbiAgICBzb3VyY2VVdWlkICYmXG4gICAgc291cmNlVXVpZCA9PT0gb3VyVXVpZFxuICApIHtcbiAgICBtZXNzYWdlID0ge1xuICAgICAgLi4uZ2VuZXJhdGVCYXNpY01lc3NhZ2UoKSxcbiAgICAgIHR5cGU6ICdncm91cC12Mi1jaGFuZ2UnLFxuICAgICAgZ3JvdXBWMkNoYW5nZToge1xuICAgICAgICBmcm9tOiBzb3VyY2VVdWlkLFxuICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogJ2NyZWF0ZScsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBpc0Zyb21VcyA/IFNlZW5TdGF0dXMuU2VlbiA6IFNlZW5TdGF0dXMuVW5zZWVuLFxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmlyc3RVcGRhdGUgJiYgYXJlV2VJbkdyb3VwKSB7XG4gICAgbWVzc2FnZSA9IHtcbiAgICAgIC4uLmdlbmVyYXRlQmFzaWNNZXNzYWdlKCksXG4gICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZnJvbTogc291cmNlVXVpZCxcbiAgICAgICAgZGV0YWlsczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItYWRkJyxcbiAgICAgICAgICAgIHV1aWQ6IG91clV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBpc0Zyb21VcyA/IFNlZW5TdGF0dXMuU2VlbiA6IFNlZW5TdGF0dXMuVW5zZWVuLFxuICAgIH07XG4gIH0gZWxzZSBpZiAoZmlyc3RVcGRhdGUgJiYgY3VycmVudC5yZXZpc2lvbiA9PT0gMCkge1xuICAgIG1lc3NhZ2UgPSB7XG4gICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgdHlwZTogJ2dyb3VwLXYyLWNoYW5nZScsXG4gICAgICBncm91cFYyQ2hhbmdlOiB7XG4gICAgICAgIGZyb206IHNvdXJjZVV1aWQsXG4gICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAnY3JlYXRlJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHNlZW5TdGF0dXM6IGlzRnJvbVVzID8gU2VlblN0YXR1cy5TZWVuIDogU2VlblN0YXR1cy5VbnNlZW4sXG4gICAgfTtcbiAgfSBlbHNlIGlmIChkZXRhaWxzLmxlbmd0aCA+IDApIHtcbiAgICBtZXNzYWdlID0ge1xuICAgICAgLi4uZ2VuZXJhdGVCYXNpY01lc3NhZ2UoKSxcbiAgICAgIHR5cGU6ICdncm91cC12Mi1jaGFuZ2UnLFxuICAgICAgc291cmNlVXVpZCxcbiAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgZnJvbTogc291cmNlVXVpZCxcbiAgICAgICAgZGV0YWlscyxcbiAgICAgIH0sXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWVuU3RhdHVzOiBpc0Zyb21VcyA/IFNlZW5TdGF0dXMuU2VlbiA6IFNlZW5TdGF0dXMuVW5zZWVuLFxuICAgIH07XG4gIH1cblxuICAvLyBUaGlzIGlzIGNoZWNrZWQgZGlmZmVyZW50bHksIGJlY2F1c2UgaXQgbmVlZHMgdG8gYmUgaXRzIG93biBlbnRyeSBpbiB0aGUgdGltZWxpbmUsXG4gIC8vICAgd2l0aCBpdHMgb3duIGljb24sIGV0Yy5cbiAgaWYgKFxuICAgIC8vIFR1cm4gb24gb3IgdHVybmVkIG9mZlxuICAgIEJvb2xlYW4ob2xkLmV4cGlyZVRpbWVyKSAhPT0gQm9vbGVhbihjdXJyZW50LmV4cGlyZVRpbWVyKSB8fFxuICAgIC8vIFN0aWxsIG9uLCBidXQgY2hhbmdlZCB2YWx1ZVxuICAgIChCb29sZWFuKG9sZC5leHBpcmVUaW1lcikgJiZcbiAgICAgIEJvb2xlYW4oY3VycmVudC5leHBpcmVUaW1lcikgJiZcbiAgICAgIG9sZC5leHBpcmVUaW1lciAhPT0gY3VycmVudC5leHBpcmVUaW1lcilcbiAgKSB7XG4gICAgdGltZXJOb3RpZmljYXRpb24gPSB7XG4gICAgICAuLi5nZW5lcmF0ZUJhc2ljTWVzc2FnZSgpLFxuICAgICAgdHlwZTogJ3RpbWVyLW5vdGlmaWNhdGlvbicsXG4gICAgICBzb3VyY2VVdWlkLFxuICAgICAgZmxhZ3M6IFByb3RvLkRhdGFNZXNzYWdlLkZsYWdzLkVYUElSQVRJT05fVElNRVJfVVBEQVRFLFxuICAgICAgZXhwaXJhdGlvblRpbWVyVXBkYXRlOiB7XG4gICAgICAgIGV4cGlyZVRpbWVyOiBjdXJyZW50LmV4cGlyZVRpbWVyIHx8IDAsXG4gICAgICAgIHNvdXJjZVV1aWQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBjb25zdCByZXN1bHQgPSBjb21wYWN0KFttZXNzYWdlLCB0aW1lck5vdGlmaWNhdGlvbl0pO1xuXG4gIGxvZy5pbmZvKFxuICAgIGBleHRyYWN0RGlmZnMvJHtsb2dJZH0gY29tcGxldGUsIGdlbmVyYXRlZCAke3Jlc3VsdC5sZW5ndGh9IGNoYW5nZSBtZXNzYWdlc2BcbiAgKTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5mdW5jdGlvbiBwcm9maWxlS2V5c1RvTWVtYmVycyhpdGVtczogQXJyYXk8R3JvdXBDaGFuZ2VNZW1iZXJUeXBlPikge1xuICByZXR1cm4gaXRlbXMubWFwKGl0ZW0gPT4gKHtcbiAgICBwcm9maWxlS2V5OiBCeXRlcy50b0Jhc2U2NChpdGVtLnByb2ZpbGVLZXkpLFxuICAgIHV1aWQ6IGl0ZW0udXVpZCxcbiAgfSkpO1xufVxuXG50eXBlIEdyb3VwQ2hhbmdlTWVtYmVyVHlwZSA9IHtcbiAgcHJvZmlsZUtleTogVWludDhBcnJheTtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG59O1xudHlwZSBHcm91cEFwcGx5UmVzdWx0VHlwZSA9IHtcbiAgbmV3QXR0cmlidXRlczogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIG5ld1Byb2ZpbGVLZXlzOiBBcnJheTxHcm91cENoYW5nZU1lbWJlclR5cGU+O1xufTtcblxuYXN5bmMgZnVuY3Rpb24gYXBwbHlHcm91cENoYW5nZSh7XG4gIGFjdGlvbnMsXG4gIGdyb3VwLFxuICBzb3VyY2VVdWlkLFxufToge1xuICBhY3Rpb25zOiBEZWNyeXB0ZWRHcm91cENoYW5nZUFjdGlvbnM7XG4gIGdyb3VwOiBDb252ZXJzYXRpb25BdHRyaWJ1dGVzVHlwZTtcbiAgc291cmNlVXVpZDogVVVJRFN0cmluZ1R5cGU7XG59KTogUHJvbWlzZTxHcm91cEFwcGx5UmVzdWx0VHlwZT4ge1xuICBjb25zdCBsb2dJZCA9IGlkRm9yTG9nZ2luZyhncm91cC5ncm91cElkKTtcbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuXG4gIGNvbnN0IEFDQ0VTU19FTlVNID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcbiAgY29uc3QgTUVNQkVSX1JPTEVfRU5VTSA9IFByb3RvLk1lbWJlci5Sb2xlO1xuXG4gIGNvbnN0IHZlcnNpb24gPSBhY3Rpb25zLnZlcnNpb24gfHwgMDtcbiAgY29uc3QgcmVzdWx0ID0geyAuLi5ncm91cCB9O1xuICBjb25zdCBuZXdQcm9maWxlS2V5czogQXJyYXk8R3JvdXBDaGFuZ2VNZW1iZXJUeXBlPiA9IFtdO1xuXG4gIGNvbnN0IG1lbWJlcnM6IFJlY29yZDxVVUlEU3RyaW5nVHlwZSwgR3JvdXBWMk1lbWJlclR5cGU+ID0gZnJvbVBhaXJzKFxuICAgIChyZXN1bHQubWVtYmVyc1YyIHx8IFtdKS5tYXAobWVtYmVyID0+IFttZW1iZXIudXVpZCwgbWVtYmVyXSlcbiAgKTtcbiAgY29uc3QgcGVuZGluZ01lbWJlcnM6IFJlY29yZDxVVUlEU3RyaW5nVHlwZSwgR3JvdXBWMlBlbmRpbmdNZW1iZXJUeXBlPiA9XG4gICAgZnJvbVBhaXJzKFxuICAgICAgKHJlc3VsdC5wZW5kaW5nTWVtYmVyc1YyIHx8IFtdKS5tYXAobWVtYmVyID0+IFttZW1iZXIudXVpZCwgbWVtYmVyXSlcbiAgICApO1xuICBjb25zdCBwZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlcnM6IFJlY29yZDxcbiAgICBVVUlEU3RyaW5nVHlwZSxcbiAgICBHcm91cFYyUGVuZGluZ0FkbWluQXBwcm92YWxUeXBlXG4gID4gPSBmcm9tUGFpcnMoXG4gICAgKHJlc3VsdC5wZW5kaW5nQWRtaW5BcHByb3ZhbFYyIHx8IFtdKS5tYXAobWVtYmVyID0+IFttZW1iZXIudXVpZCwgbWVtYmVyXSlcbiAgKTtcbiAgY29uc3QgYmFubmVkTWVtYmVycyA9IG5ldyBNYXA8VVVJRFN0cmluZ1R5cGUsIEdyb3VwVjJCYW5uZWRNZW1iZXJUeXBlPihcbiAgICAocmVzdWx0LmJhbm5lZE1lbWJlcnNWMiB8fCBbXSkubWFwKG1lbWJlciA9PiBbbWVtYmVyLnV1aWQsIG1lbWJlcl0pXG4gICk7XG5cbiAgLy8gdmVyc2lvbj86IG51bWJlcjtcbiAgcmVzdWx0LnJldmlzaW9uID0gdmVyc2lvbjtcblxuICAvLyBhZGRNZW1iZXJzPzogQXJyYXk8R3JvdXBDaGFuZ2UuQWN0aW9ucy5BZGRNZW1iZXJBY3Rpb24+O1xuICAoYWN0aW9ucy5hZGRNZW1iZXJzIHx8IFtdKS5mb3JFYWNoKGFkZE1lbWJlciA9PiB7XG4gICAgY29uc3QgeyBhZGRlZCB9ID0gYWRkTWVtYmVyO1xuICAgIGlmICghYWRkZWQgfHwgIWFkZGVkLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcHBseUdyb3VwQ2hhbmdlOiBhZGRNZW1iZXIuYWRkZWQgaXMgbWlzc2luZycpO1xuICAgIH1cblxuICAgIGNvbnN0IGFkZGVkVXVpZCA9IFVVSUQuY2FzdChhZGRlZC51c2VySWQpO1xuXG4gICAgaWYgKG1lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIGFkZCBtZW1iZXIgZmFpbGVkOyBhbHJlYWR5IGluIG1lbWJlcnMuYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBtZW1iZXJzW2FkZGVkVXVpZF0gPSB7XG4gICAgICB1dWlkOiBhZGRlZFV1aWQsXG4gICAgICByb2xlOiBhZGRlZC5yb2xlIHx8IE1FTUJFUl9ST0xFX0VOVU0uREVGQVVMVCxcbiAgICAgIGpvaW5lZEF0VmVyc2lvbjogdmVyc2lvbixcbiAgICAgIGpvaW5lZEZyb21MaW5rOiBhZGRNZW1iZXIuam9pbkZyb21JbnZpdGVMaW5rIHx8IGZhbHNlLFxuICAgIH07XG5cbiAgICBpZiAocGVuZGluZ01lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBSZW1vdmluZyBuZXdseS1hZGRlZCBtZW1iZXIgZnJvbSBwZW5kaW5nTWVtYmVycy5gXG4gICAgICApO1xuICAgICAgZGVsZXRlIHBlbmRpbmdNZW1iZXJzW2FkZGVkVXVpZF07XG4gICAgfVxuXG4gICAgLy8gQ2FwdHVyZSB3aG8gYWRkZWQgdXNcbiAgICBpZiAob3VyVXVpZCAmJiBzb3VyY2VVdWlkICYmIGFkZGVkVXVpZCA9PT0gb3VyVXVpZCkge1xuICAgICAgcmVzdWx0LmFkZGVkQnkgPSBzb3VyY2VVdWlkO1xuICAgIH1cblxuICAgIGlmIChhZGRlZC5wcm9maWxlS2V5KSB7XG4gICAgICBuZXdQcm9maWxlS2V5cy5wdXNoKHtcbiAgICAgICAgcHJvZmlsZUtleTogYWRkZWQucHJvZmlsZUtleSxcbiAgICAgICAgdXVpZDogVVVJRC5jYXN0KGFkZGVkLnVzZXJJZCksXG4gICAgICB9KTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIGRlbGV0ZU1lbWJlcnM/OiBBcnJheTxHcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckFjdGlvbj47XG4gIChhY3Rpb25zLmRlbGV0ZU1lbWJlcnMgfHwgW10pLmZvckVhY2goZGVsZXRlTWVtYmVyID0+IHtcbiAgICBjb25zdCB7IGRlbGV0ZWRVc2VySWQgfSA9IGRlbGV0ZU1lbWJlcjtcbiAgICBpZiAoIWRlbGV0ZWRVc2VySWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2FwcGx5R3JvdXBDaGFuZ2U6IGRlbGV0ZU1lbWJlci5kZWxldGVkVXNlcklkIGlzIG1pc3NpbmcnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IGRlbGV0ZWRVdWlkID0gVVVJRC5jYXN0KGRlbGV0ZWRVc2VySWQpO1xuICAgIGlmIChtZW1iZXJzW2RlbGV0ZWRVdWlkXSkge1xuICAgICAgZGVsZXRlIG1lbWJlcnNbZGVsZXRlZFV1aWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGFwcGx5R3JvdXBDaGFuZ2UvJHtsb2dJZH06IEF0dGVtcHQgdG8gcmVtb3ZlIG1lbWJlciBmYWlsZWQ7IHdhcyBub3QgaW4gbWVtYmVycy5gXG4gICAgICApO1xuICAgIH1cbiAgfSk7XG5cbiAgLy8gbW9kaWZ5TWVtYmVyUm9sZXM/OiBBcnJheTxHcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeU1lbWJlclJvbGVBY3Rpb24+O1xuICAoYWN0aW9ucy5tb2RpZnlNZW1iZXJSb2xlcyB8fCBbXSkuZm9yRWFjaChtb2RpZnlNZW1iZXJSb2xlID0+IHtcbiAgICBjb25zdCB7IHJvbGUsIHVzZXJJZCB9ID0gbW9kaWZ5TWVtYmVyUm9sZTtcbiAgICBpZiAoIXJvbGUgfHwgIXVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdhcHBseUdyb3VwQ2hhbmdlOiBtb2RpZnlNZW1iZXJSb2xlIGhhZCBhIG1pc3NpbmcgdmFsdWUnKTtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VyVXVpZCA9IFVVSUQuY2FzdCh1c2VySWQpO1xuICAgIGlmIChtZW1iZXJzW3VzZXJVdWlkXSkge1xuICAgICAgbWVtYmVyc1t1c2VyVXVpZF0gPSB7XG4gICAgICAgIC4uLm1lbWJlcnNbdXNlclV1aWRdLFxuICAgICAgICByb2xlLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYXBwbHlHcm91cENoYW5nZTogbW9kaWZ5TWVtYmVyUm9sZSB0cmllZCB0byBtb2RpZnkgbm9uZXhpc3RlbnQgbWVtYmVyJ1xuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIG1vZGlmeU1lbWJlclByb2ZpbGVLZXlzPzpcbiAgLy8gQXJyYXk8R3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlNZW1iZXJQcm9maWxlS2V5QWN0aW9uPjtcbiAgKGFjdGlvbnMubW9kaWZ5TWVtYmVyUHJvZmlsZUtleXMgfHwgW10pLmZvckVhY2gobW9kaWZ5TWVtYmVyUHJvZmlsZUtleSA9PiB7XG4gICAgY29uc3QgeyBwcm9maWxlS2V5LCB1dWlkIH0gPSBtb2RpZnlNZW1iZXJQcm9maWxlS2V5O1xuICAgIGlmICghcHJvZmlsZUtleSB8fCAhdXVpZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYXBwbHlHcm91cENoYW5nZTogbW9kaWZ5TWVtYmVyUHJvZmlsZUtleSBoYWQgYSBtaXNzaW5nIHZhbHVlJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBuZXdQcm9maWxlS2V5cy5wdXNoKHtcbiAgICAgIHByb2ZpbGVLZXksXG4gICAgICB1dWlkOiBVVUlELmNhc3QodXVpZCksXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIGFkZFBlbmRpbmdNZW1iZXJzPzogQXJyYXk8XG4gIC8vICAgR3JvdXBDaGFuZ2UuQWN0aW9ucy5BZGRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleUFjdGlvblxuICAvLyA+O1xuICAoYWN0aW9ucy5hZGRQZW5kaW5nTWVtYmVycyB8fCBbXSkuZm9yRWFjaChhZGRQZW5kaW5nTWVtYmVyID0+IHtcbiAgICBjb25zdCB7IGFkZGVkIH0gPSBhZGRQZW5kaW5nTWVtYmVyO1xuICAgIGlmICghYWRkZWQgfHwgIWFkZGVkLm1lbWJlciB8fCAhYWRkZWQubWVtYmVyLnVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYXBwbHlHcm91cENoYW5nZTogYWRkUGVuZGluZ01lbWJlcnMgaGFkIGEgbWlzc2luZyB2YWx1ZSdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgYWRkZWRVdWlkID0gVVVJRC5jYXN0KGFkZGVkLm1lbWJlci51c2VySWQpO1xuXG4gICAgaWYgKG1lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIGFkZCBwZW5kaW5nTWVtYmVyIGZhaWxlZDsgd2FzIGFscmVhZHkgaW4gbWVtYmVycy5gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAocGVuZGluZ01lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIGFkZCBwZW5kaW5nTWVtYmVyIGZhaWxlZDsgd2FzIGFscmVhZHkgaW4gcGVuZGluZ01lbWJlcnMuYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBwZW5kaW5nTWVtYmVyc1thZGRlZFV1aWRdID0ge1xuICAgICAgdXVpZDogYWRkZWRVdWlkLFxuICAgICAgYWRkZWRCeVVzZXJJZDogVVVJRC5jYXN0KGFkZGVkLmFkZGVkQnlVc2VySWQpLFxuICAgICAgdGltZXN0YW1wOiBhZGRlZC50aW1lc3RhbXAsXG4gICAgICByb2xlOiBhZGRlZC5tZW1iZXIucm9sZSB8fCBNRU1CRVJfUk9MRV9FTlVNLkRFRkFVTFQsXG4gICAgfTtcblxuICAgIGlmIChhZGRlZC5tZW1iZXIgJiYgYWRkZWQubWVtYmVyLnByb2ZpbGVLZXkpIHtcbiAgICAgIG5ld1Byb2ZpbGVLZXlzLnB1c2goe1xuICAgICAgICBwcm9maWxlS2V5OiBhZGRlZC5tZW1iZXIucHJvZmlsZUtleSxcbiAgICAgICAgdXVpZDogYWRkZWRVdWlkLFxuICAgICAgfSk7XG4gICAgfVxuICB9KTtcblxuICAvLyBkZWxldGVQZW5kaW5nTWVtYmVycz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuRGVsZXRlTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXlBY3Rpb25cbiAgLy8gPjtcbiAgKGFjdGlvbnMuZGVsZXRlUGVuZGluZ01lbWJlcnMgfHwgW10pLmZvckVhY2goZGVsZXRlUGVuZGluZ01lbWJlciA9PiB7XG4gICAgY29uc3QgeyBkZWxldGVkVXNlcklkIH0gPSBkZWxldGVQZW5kaW5nTWVtYmVyO1xuICAgIGlmICghZGVsZXRlZFVzZXJJZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnYXBwbHlHcm91cENoYW5nZTogZGVsZXRlUGVuZGluZ01lbWJlci5kZWxldGVkVXNlcklkIGlzIG51bGwhJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBkZWxldGVkVXVpZCA9IFVVSUQuY2FzdChkZWxldGVkVXNlcklkKTtcblxuICAgIGlmIChwZW5kaW5nTWVtYmVyc1tkZWxldGVkVXVpZF0pIHtcbiAgICAgIGRlbGV0ZSBwZW5kaW5nTWVtYmVyc1tkZWxldGVkVXVpZF07XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgYXBwbHlHcm91cENoYW5nZS8ke2xvZ0lkfTogQXR0ZW1wdCB0byByZW1vdmUgcGVuZGluZ01lbWJlciBmYWlsZWQ7IHdhcyBub3QgaW4gcGVuZGluZ01lbWJlcnMuYFxuICAgICAgKTtcbiAgICB9XG4gIH0pO1xuXG4gIC8vIHByb21vdGVQZW5kaW5nTWVtYmVycz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuUHJvbW90ZU1lbWJlclBlbmRpbmdQcm9maWxlS2V5QWN0aW9uXG4gIC8vID47XG4gIChhY3Rpb25zLnByb21vdGVQZW5kaW5nTWVtYmVycyB8fCBbXSkuZm9yRWFjaChwcm9tb3RlUGVuZGluZ01lbWJlciA9PiB7XG4gICAgY29uc3QgeyBwcm9maWxlS2V5LCB1dWlkOiByYXdVdWlkIH0gPSBwcm9tb3RlUGVuZGluZ01lbWJlcjtcbiAgICBpZiAoIXByb2ZpbGVLZXkgfHwgIXJhd1V1aWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2FwcGx5R3JvdXBDaGFuZ2U6IHByb21vdGVQZW5kaW5nTWVtYmVyIGhhZCBhIG1pc3NpbmcgdmFsdWUnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHV1aWQgPSBVVUlELmNhc3QocmF3VXVpZCk7XG4gICAgY29uc3QgcHJldmlvdXNSZWNvcmQgPSBwZW5kaW5nTWVtYmVyc1t1dWlkXTtcblxuICAgIGlmIChwZW5kaW5nTWVtYmVyc1t1dWlkXSkge1xuICAgICAgZGVsZXRlIHBlbmRpbmdNZW1iZXJzW3V1aWRdO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGFwcGx5R3JvdXBDaGFuZ2UvJHtsb2dJZH06IEF0dGVtcHQgdG8gcHJvbW90ZSBwZW5kaW5nTWVtYmVyIGZhaWxlZDsgd2FzIG5vdCBpbiBwZW5kaW5nTWVtYmVycy5gXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChtZW1iZXJzW3V1aWRdKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGFwcGx5R3JvdXBDaGFuZ2UvJHtsb2dJZH06IEF0dGVtcHQgdG8gcHJvbW90ZSBwZW5kaW5nTWVtYmVyIGZhaWxlZDsgd2FzIGFscmVhZHkgaW4gbWVtYmVycy5gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1lbWJlcnNbdXVpZF0gPSB7XG4gICAgICB1dWlkLFxuICAgICAgam9pbmVkQXRWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgcm9sZTogcHJldmlvdXNSZWNvcmQucm9sZSB8fCBNRU1CRVJfUk9MRV9FTlVNLkRFRkFVTFQsXG4gICAgfTtcblxuICAgIG5ld1Byb2ZpbGVLZXlzLnB1c2goe1xuICAgICAgcHJvZmlsZUtleSxcbiAgICAgIHV1aWQsXG4gICAgfSk7XG4gIH0pO1xuXG4gIC8vIG1vZGlmeVRpdGxlPzogR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlUaXRsZUFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5VGl0bGUpIHtcbiAgICBjb25zdCB7IHRpdGxlIH0gPSBhY3Rpb25zLm1vZGlmeVRpdGxlO1xuICAgIGlmICh0aXRsZSAmJiB0aXRsZS5jb250ZW50ID09PSAndGl0bGUnKSB7XG4gICAgICByZXN1bHQubmFtZSA9IGRyb3BOdWxsKHRpdGxlLnRpdGxlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBDbGVhcmluZyBncm91cCB0aXRsZSBkdWUgdG8gbWlzc2luZyBkYXRhLmBcbiAgICAgICk7XG4gICAgICByZXN1bHQubmFtZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBtb2RpZnlBdmF0YXI/OiBHcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUF2YXRhckFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5QXZhdGFyKSB7XG4gICAgY29uc3QgeyBhdmF0YXIgfSA9IGFjdGlvbnMubW9kaWZ5QXZhdGFyO1xuICAgIGF3YWl0IGFwcGx5TmV3QXZhdGFyKGRyb3BOdWxsKGF2YXRhciksIHJlc3VsdCwgbG9nSWQpO1xuICB9XG5cbiAgLy8gbW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lcj86XG4gIC8vICAgR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlEaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyQWN0aW9uO1xuICBpZiAoYWN0aW9ucy5tb2RpZnlEaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyKSB7XG4gICAgY29uc3QgZGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lcjogUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iIHwgdW5kZWZpbmVkID1cbiAgICAgIGFjdGlvbnMubW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lci50aW1lcjtcbiAgICBpZiAoXG4gICAgICBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyICYmXG4gICAgICBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyLmNvbnRlbnQgPT09ICdkaXNhcHBlYXJpbmdNZXNzYWdlc0R1cmF0aW9uJ1xuICAgICkge1xuICAgICAgcmVzdWx0LmV4cGlyZVRpbWVyID0gZHJvcE51bGwoXG4gICAgICAgIGRpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIuZGlzYXBwZWFyaW5nTWVzc2FnZXNEdXJhdGlvblxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBDbGVhcmluZyBncm91cCBleHBpcmVUaW1lciBkdWUgdG8gbWlzc2luZyBkYXRhLmBcbiAgICAgICk7XG4gICAgICByZXN1bHQuZXhwaXJlVGltZXIgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgcmVzdWx0LmFjY2Vzc0NvbnRyb2wgPSByZXN1bHQuYWNjZXNzQ29udHJvbCB8fCB7XG4gICAgbWVtYmVyczogQUNDRVNTX0VOVU0uTUVNQkVSLFxuICAgIGF0dHJpYnV0ZXM6IEFDQ0VTU19FTlVNLk1FTUJFUixcbiAgICBhZGRGcm9tSW52aXRlTGluazogQUNDRVNTX0VOVU0uVU5TQVRJU0ZJQUJMRSxcbiAgfTtcblxuICAvLyBtb2RpZnlBdHRyaWJ1dGVzQWNjZXNzPzpcbiAgLy8gR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlBdHRyaWJ1dGVzQWNjZXNzQ29udHJvbEFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5QXR0cmlidXRlc0FjY2Vzcykge1xuICAgIHJlc3VsdC5hY2Nlc3NDb250cm9sID0ge1xuICAgICAgLi4ucmVzdWx0LmFjY2Vzc0NvbnRyb2wsXG4gICAgICBhdHRyaWJ1dGVzOlxuICAgICAgICBhY3Rpb25zLm1vZGlmeUF0dHJpYnV0ZXNBY2Nlc3MuYXR0cmlidXRlc0FjY2VzcyB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgfTtcbiAgfVxuXG4gIC8vIG1vZGlmeU1lbWJlckFjY2Vzcz86IEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5TWVtYmVyc0FjY2Vzc0NvbnRyb2xBY3Rpb247XG4gIGlmIChhY3Rpb25zLm1vZGlmeU1lbWJlckFjY2Vzcykge1xuICAgIHJlc3VsdC5hY2Nlc3NDb250cm9sID0ge1xuICAgICAgLi4ucmVzdWx0LmFjY2Vzc0NvbnRyb2wsXG4gICAgICBtZW1iZXJzOiBhY3Rpb25zLm1vZGlmeU1lbWJlckFjY2Vzcy5tZW1iZXJzQWNjZXNzIHx8IEFDQ0VTU19FTlVNLk1FTUJFUixcbiAgICB9O1xuICB9XG5cbiAgLy8gbW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3M/OlxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3NDb250cm9sQWN0aW9uO1xuICBpZiAoYWN0aW9ucy5tb2RpZnlBZGRGcm9tSW52aXRlTGlua0FjY2Vzcykge1xuICAgIHJlc3VsdC5hY2Nlc3NDb250cm9sID0ge1xuICAgICAgLi4ucmVzdWx0LmFjY2Vzc0NvbnRyb2wsXG4gICAgICBhZGRGcm9tSW52aXRlTGluazpcbiAgICAgICAgYWN0aW9ucy5tb2RpZnlBZGRGcm9tSW52aXRlTGlua0FjY2Vzcy5hZGRGcm9tSW52aXRlTGlua0FjY2VzcyB8fFxuICAgICAgICBBQ0NFU1NfRU5VTS5VTlNBVElTRklBQkxFLFxuICAgIH07XG4gIH1cblxuICAvLyBhZGRNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHM/OiBBcnJheTxcbiAgLy8gICBHcm91cENoYW5nZS5BY3Rpb25zLkFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uXG4gIC8vID47XG4gIChhY3Rpb25zLmFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyB8fCBbXSkuZm9yRWFjaChcbiAgICBwZW5kaW5nQWRtaW5BcHByb3ZhbCA9PiB7XG4gICAgICBjb25zdCB7IGFkZGVkIH0gPSBwZW5kaW5nQWRtaW5BcHByb3ZhbDtcbiAgICAgIGlmICghYWRkZWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdhcHBseUdyb3VwQ2hhbmdlOiBtb2RpZnlNZW1iZXJQcm9maWxlS2V5IGhhZCBhIG1pc3NpbmcgdmFsdWUnXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBjb25zdCBhZGRlZFV1aWQgPSBVVUlELmNhc3QoYWRkZWQudXNlcklkKTtcblxuICAgICAgaWYgKG1lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgYXBwbHlHcm91cENoYW5nZS8ke2xvZ0lkfTogQXR0ZW1wdCB0byBhZGQgcGVuZGluZyBhZG1pbiBhcHByb3ZhbCBmYWlsZWQ7IHdhcyBhbHJlYWR5IGluIG1lbWJlcnMuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAocGVuZGluZ01lbWJlcnNbYWRkZWRVdWlkXSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgYXBwbHlHcm91cENoYW5nZS8ke2xvZ0lkfTogQXR0ZW1wdCB0byBhZGQgcGVuZGluZyBhZG1pbiBhcHByb3ZhbCBmYWlsZWQ7IHdhcyBhbHJlYWR5IGluIHBlbmRpbmdNZW1iZXJzLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHBlbmRpbmdBZG1pbkFwcHJvdmFsTWVtYmVyc1thZGRlZFV1aWRdKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIGFkZCBwZW5kaW5nIGFkbWluIGFwcHJvdmFsIGZhaWxlZDsgd2FzIGFscmVhZHkgaW4gcGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzLmBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBwZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlcnNbYWRkZWRVdWlkXSA9IHtcbiAgICAgICAgdXVpZDogYWRkZWRVdWlkLFxuICAgICAgICB0aW1lc3RhbXA6IGFkZGVkLnRpbWVzdGFtcCxcbiAgICAgIH07XG5cbiAgICAgIGlmIChhZGRlZC5wcm9maWxlS2V5KSB7XG4gICAgICAgIG5ld1Byb2ZpbGVLZXlzLnB1c2goe1xuICAgICAgICAgIHByb2ZpbGVLZXk6IGFkZGVkLnByb2ZpbGVLZXksXG4gICAgICAgICAgdXVpZDogYWRkZWRVdWlkLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLy8gZGVsZXRlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxzPzogQXJyYXk8XG4gIC8vICAgR3JvdXBDaGFuZ2UuQWN0aW9ucy5EZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbEFjdGlvblxuICAvLyA+O1xuICAoYWN0aW9ucy5kZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHMgfHwgW10pLmZvckVhY2goXG4gICAgZGVsZXRlQWRtaW5BcHByb3ZhbCA9PiB7XG4gICAgICBjb25zdCB7IGRlbGV0ZWRVc2VySWQgfSA9IGRlbGV0ZUFkbWluQXBwcm92YWw7XG4gICAgICBpZiAoIWRlbGV0ZWRVc2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdhcHBseUdyb3VwQ2hhbmdlOiBkZWxldGVBZG1pbkFwcHJvdmFsLmRlbGV0ZWRVc2VySWQgaXMgbnVsbCEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGRlbGV0ZWRVdWlkID0gVVVJRC5jYXN0KGRlbGV0ZWRVc2VySWQpO1xuXG4gICAgICBpZiAocGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzW2RlbGV0ZWRVdWlkXSkge1xuICAgICAgICBkZWxldGUgcGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzW2RlbGV0ZWRVdWlkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIHJlbW92ZSBwZW5kaW5nQWRtaW5BcHByb3ZhbCBmYWlsZWQ7IHdhcyBub3QgaW4gcGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzLmBcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgLy8gcHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuUHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uXG4gIC8vID47XG4gIChhY3Rpb25zLnByb21vdGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHMgfHwgW10pLmZvckVhY2goXG4gICAgcHJvbW90ZUFkbWluQXBwcm92YWwgPT4ge1xuICAgICAgY29uc3QgeyB1c2VySWQsIHJvbGUgfSA9IHByb21vdGVBZG1pbkFwcHJvdmFsO1xuICAgICAgaWYgKCF1c2VySWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICdhcHBseUdyb3VwQ2hhbmdlOiBwcm9tb3RlQWRtaW5BcHByb3ZhbCBoYWQgYSBtaXNzaW5nIHZhbHVlJ1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB1c2VyVXVpZCA9IFVVSUQuY2FzdCh1c2VySWQpO1xuXG4gICAgICBpZiAocGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzW3VzZXJVdWlkXSkge1xuICAgICAgICBkZWxldGUgcGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzW3VzZXJVdWlkXTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIHByb21vdGUgcGVuZGluZ0FkbWluQXBwcm92YWwgZmFpbGVkOyB3YXMgbm90IGluIHBlbmRpbmdBZG1pbkFwcHJvdmFsTWVtYmVycy5gXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgICBpZiAocGVuZGluZ01lbWJlcnNbdXNlclV1aWRdKSB7XG4gICAgICAgIGRlbGV0ZSBwZW5kaW5nQWRtaW5BcHByb3ZhbE1lbWJlcnNbdXNlclV1aWRdO1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgYXBwbHlHcm91cENoYW5nZS8ke2xvZ0lkfTogRGVsZXRlZCBwZW5kaW5nQWRtaW5BcHByb3ZhbCBmcm9tIHBlbmRpbmdNZW1iZXJzLmBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lbWJlcnNbdXNlclV1aWRdKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIHByb21vdGUgcGVuZGluZ01lbWJlciBmYWlsZWQ7IHdhcyBhbHJlYWR5IGluIG1lbWJlcnMuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIG1lbWJlcnNbdXNlclV1aWRdID0ge1xuICAgICAgICB1dWlkOiB1c2VyVXVpZCxcbiAgICAgICAgam9pbmVkQXRWZXJzaW9uOiB2ZXJzaW9uLFxuICAgICAgICByb2xlOiByb2xlIHx8IE1FTUJFUl9ST0xFX0VOVU0uREVGQVVMVCxcbiAgICAgICAgYXBwcm92ZWRCeUFkbWluOiB0cnVlLFxuICAgICAgfTtcbiAgICB9XG4gICk7XG5cbiAgLy8gbW9kaWZ5SW52aXRlTGlua1Bhc3N3b3JkPzogR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlJbnZpdGVMaW5rUGFzc3dvcmRBY3Rpb247XG4gIGlmIChhY3Rpb25zLm1vZGlmeUludml0ZUxpbmtQYXNzd29yZCkge1xuICAgIGNvbnN0IHsgaW52aXRlTGlua1Bhc3N3b3JkIH0gPSBhY3Rpb25zLm1vZGlmeUludml0ZUxpbmtQYXNzd29yZDtcbiAgICBpZiAoaW52aXRlTGlua1Bhc3N3b3JkKSB7XG4gICAgICByZXN1bHQuZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgPSBpbnZpdGVMaW5rUGFzc3dvcmQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIHJlc3VsdC5ncm91cEludml0ZUxpbmtQYXNzd29yZCA9IHVuZGVmaW5lZDtcbiAgICB9XG4gIH1cblxuICAvLyBtb2RpZnlEZXNjcmlwdGlvbj86IEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5RGVzY3JpcHRpb25BY3Rpb247XG4gIGlmIChhY3Rpb25zLm1vZGlmeURlc2NyaXB0aW9uKSB7XG4gICAgY29uc3QgeyBkZXNjcmlwdGlvbkJ5dGVzIH0gPSBhY3Rpb25zLm1vZGlmeURlc2NyaXB0aW9uO1xuICAgIGlmIChkZXNjcmlwdGlvbkJ5dGVzICYmIGRlc2NyaXB0aW9uQnl0ZXMuY29udGVudCA9PT0gJ2Rlc2NyaXB0aW9uVGV4dCcpIHtcbiAgICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IGRyb3BOdWxsKGRlc2NyaXB0aW9uQnl0ZXMuZGVzY3JpcHRpb25UZXh0KTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBDbGVhcmluZyBncm91cCBkZXNjcmlwdGlvbiBkdWUgdG8gbWlzc2luZyBkYXRhLmBcbiAgICAgICk7XG4gICAgICByZXN1bHQuZGVzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgaWYgKGFjdGlvbnMubW9kaWZ5QW5ub3VuY2VtZW50c09ubHkpIHtcbiAgICBjb25zdCB7IGFubm91bmNlbWVudHNPbmx5IH0gPSBhY3Rpb25zLm1vZGlmeUFubm91bmNlbWVudHNPbmx5O1xuICAgIHJlc3VsdC5hbm5vdW5jZW1lbnRzT25seSA9IGFubm91bmNlbWVudHNPbmx5O1xuICB9XG5cbiAgaWYgKGFjdGlvbnMuYWRkTWVtYmVyc0Jhbm5lZCAmJiBhY3Rpb25zLmFkZE1lbWJlcnNCYW5uZWQubGVuZ3RoID4gMCkge1xuICAgIGFjdGlvbnMuYWRkTWVtYmVyc0Jhbm5lZC5mb3JFYWNoKG1lbWJlciA9PiB7XG4gICAgICBpZiAoYmFubmVkTWVtYmVycy5oYXMobWVtYmVyLnV1aWQpKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBhcHBseUdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBBdHRlbXB0IHRvIGFkZCBiYW5uZWQgbWVtYmVyIGZhaWxlZDsgd2FzIGFscmVhZHkgaW4gYmFubmVkIGxpc3QuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGJhbm5lZE1lbWJlcnMuc2V0KG1lbWJlci51dWlkLCBtZW1iZXIpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKGFjdGlvbnMuZGVsZXRlTWVtYmVyc0Jhbm5lZCAmJiBhY3Rpb25zLmRlbGV0ZU1lbWJlcnNCYW5uZWQubGVuZ3RoID4gMCkge1xuICAgIGFjdGlvbnMuZGVsZXRlTWVtYmVyc0Jhbm5lZC5mb3JFYWNoKHV1aWQgPT4ge1xuICAgICAgaWYgKCFiYW5uZWRNZW1iZXJzLmhhcyh1dWlkKSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgYXBwbHlHcm91cENoYW5nZS8ke2xvZ0lkfTogQXR0ZW1wdCB0byByZW1vdmUgYmFubmVkIG1lbWJlciBmYWlsZWQ7IHdhcyBub3QgaW4gYmFubmVkIGxpc3QuYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGJhbm5lZE1lbWJlcnMuZGVsZXRlKHV1aWQpO1xuICAgIH0pO1xuICB9XG5cbiAgaWYgKG91clV1aWQpIHtcbiAgICByZXN1bHQubGVmdCA9ICFtZW1iZXJzW291clV1aWRdO1xuICB9XG4gIGlmIChyZXN1bHQubGVmdCkge1xuICAgIHJlc3VsdC5hZGRlZEJ5ID0gdW5kZWZpbmVkO1xuICB9XG5cbiAgLy8gR28gZnJvbSBsb29rdXBzIGJhY2sgdG8gYXJyYXlzXG4gIHJlc3VsdC5tZW1iZXJzVjIgPSB2YWx1ZXMobWVtYmVycyk7XG4gIHJlc3VsdC5wZW5kaW5nTWVtYmVyc1YyID0gdmFsdWVzKHBlbmRpbmdNZW1iZXJzKTtcbiAgcmVzdWx0LnBlbmRpbmdBZG1pbkFwcHJvdmFsVjIgPSB2YWx1ZXMocGVuZGluZ0FkbWluQXBwcm92YWxNZW1iZXJzKTtcbiAgcmVzdWx0LmJhbm5lZE1lbWJlcnNWMiA9IEFycmF5LmZyb20oYmFubmVkTWVtYmVycy52YWx1ZXMoKSk7XG5cbiAgcmV0dXJuIHtcbiAgICBuZXdBdHRyaWJ1dGVzOiByZXN1bHQsXG4gICAgbmV3UHJvZmlsZUtleXMsXG4gIH07XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBkZWNyeXB0R3JvdXBBdmF0YXIoXG4gIGF2YXRhcktleTogc3RyaW5nLFxuICBzZWNyZXRQYXJhbXNCYXNlNjQ6IHN0cmluZ1xuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IHNlbmRlciA9IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZztcbiAgaWYgKCFzZW5kZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZGVjcnlwdEdyb3VwQXZhdGFyOiB0ZXh0c2VjdXJlLm1lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlISdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgY2lwaGVydGV4dCA9IGF3YWl0IHNlbmRlci5nZXRHcm91cEF2YXRhcihhdmF0YXJLZXkpO1xuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihzZWNyZXRQYXJhbXNCYXNlNjQpO1xuICBjb25zdCBwbGFpbnRleHQgPSBkZWNyeXB0R3JvdXBCbG9iKGNsaWVudFprR3JvdXBDaXBoZXIsIGNpcGhlcnRleHQpO1xuICBjb25zdCBibG9iID0gUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iLmRlY29kZShwbGFpbnRleHQpO1xuICBpZiAoYmxvYi5jb250ZW50ICE9PSAnYXZhdGFyJykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBkZWNyeXB0R3JvdXBBdmF0YXI6IFJldHVybmVkIGJsb2IgaGFkIGluY29ycmVjdCBjb250ZW50OiAke2Jsb2IuY29udGVudH1gXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGF2YXRhciA9IGRyb3BOdWxsKGJsb2IuYXZhdGFyKTtcbiAgaWYgKCFhdmF0YXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2RlY3J5cHRHcm91cEF2YXRhcjogUmV0dXJuZWQgYmxvYiBoYWQgbm8gYXZhdGFyIHNldCEnKTtcbiAgfVxuXG4gIHJldHVybiBhdmF0YXI7XG59XG5cbi8vIE92ZXdyaXRpbmcgcmVzdWx0LmF2YXRhciBhcyBwYXJ0IG9mIGZ1bmN0aW9uYWxpdHlcbi8qIGVzbGludC1kaXNhYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYXBwbHlOZXdBdmF0YXIoXG4gIG5ld0F2YXRhcjogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICByZXN1bHQ6IFBpY2s8Q29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsICdhdmF0YXInIHwgJ3NlY3JldFBhcmFtcyc+LFxuICBsb2dJZDogc3RyaW5nXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICAvLyBBdmF0YXIgaGFzIGJlZW4gZHJvcHBlZFxuICAgIGlmICghbmV3QXZhdGFyICYmIHJlc3VsdC5hdmF0YXIpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdHRhY2htZW50RGF0YShyZXN1bHQuYXZhdGFyLnBhdGgpO1xuICAgICAgcmVzdWx0LmF2YXRhciA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICAvLyBHcm91cCBoYXMgYXZhdGFyOyBoYXMgaXQgY2hhbmdlZD9cbiAgICBpZiAobmV3QXZhdGFyICYmICghcmVzdWx0LmF2YXRhciB8fCByZXN1bHQuYXZhdGFyLnVybCAhPT0gbmV3QXZhdGFyKSkge1xuICAgICAgaWYgKCFyZXN1bHQuc2VjcmV0UGFyYW1zKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignYXBwbHlOZXdBdmF0YXI6IGdyb3VwIHdhcyBtaXNzaW5nIHNlY3JldFBhcmFtcyEnKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZGF0YSA9IGF3YWl0IGRlY3J5cHRHcm91cEF2YXRhcihuZXdBdmF0YXIsIHJlc3VsdC5zZWNyZXRQYXJhbXMpO1xuICAgICAgY29uc3QgaGFzaCA9IGNvbXB1dGVIYXNoKGRhdGEpO1xuXG4gICAgICBpZiAocmVzdWx0LmF2YXRhcj8uaGFzaCA9PT0gaGFzaCkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgYXBwbHlOZXdBdmF0YXIvJHtsb2dJZH06IEhhc2ggaXMgdGhlIHNhbWUsIGJ1dCB1cmwgd2FzIGRpZmZlcmVudC4gU2F2aW5nIG5ldyB1cmwuYFxuICAgICAgICApO1xuICAgICAgICByZXN1bHQuYXZhdGFyID0ge1xuICAgICAgICAgIC4uLnJlc3VsdC5hdmF0YXIsXG4gICAgICAgICAgdXJsOiBuZXdBdmF0YXIsXG4gICAgICAgIH07XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlc3VsdC5hdmF0YXIpIHtcbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmRlbGV0ZUF0dGFjaG1lbnREYXRhKHJlc3VsdC5hdmF0YXIucGF0aCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHBhdGggPSBhd2FpdCB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdBdHRhY2htZW50RGF0YShkYXRhKTtcbiAgICAgIHJlc3VsdC5hdmF0YXIgPSB7XG4gICAgICAgIHVybDogbmV3QXZhdGFyLFxuICAgICAgICBwYXRoLFxuICAgICAgICBoYXNoLFxuICAgICAgfTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgYXBwbHlOZXdBdmF0YXIvJHtsb2dJZH0gRmFpbGVkIHRvIGhhbmRsZSBhdmF0YXIsIGNsZWFyaW5nIGl0YCxcbiAgICAgIGVycm9yLnN0YWNrXG4gICAgKTtcbiAgICBpZiAocmVzdWx0LmF2YXRhciAmJiByZXN1bHQuYXZhdGFyLnBhdGgpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5kZWxldGVBdHRhY2htZW50RGF0YShyZXN1bHQuYXZhdGFyLnBhdGgpO1xuICAgIH1cbiAgICByZXN1bHQuYXZhdGFyID0gdW5kZWZpbmVkO1xuICB9XG59XG4vKiBlc2xpbnQtZW5hYmxlIG5vLXBhcmFtLXJlYXNzaWduICovXG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5R3JvdXBTdGF0ZSh7XG4gIGdyb3VwLFxuICBncm91cFN0YXRlLFxuICBzb3VyY2VVdWlkLFxufToge1xuICBncm91cDogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGU7XG4gIGdyb3VwU3RhdGU6IERlY3J5cHRlZEdyb3VwU3RhdGU7XG4gIHNvdXJjZVV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbn0pOiBQcm9taXNlPEdyb3VwQXBwbHlSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IGxvZ0lkID0gaWRGb3JMb2dnaW5nKGdyb3VwLmdyb3VwSWQpO1xuICBjb25zdCBBQ0NFU1NfRU5VTSA9IFByb3RvLkFjY2Vzc0NvbnRyb2wuQWNjZXNzUmVxdWlyZWQ7XG4gIGNvbnN0IE1FTUJFUl9ST0xFX0VOVU0gPSBQcm90by5NZW1iZXIuUm9sZTtcbiAgY29uc3QgdmVyc2lvbiA9IGdyb3VwU3RhdGUudmVyc2lvbiB8fCAwO1xuICBjb25zdCByZXN1bHQgPSB7IC4uLmdyb3VwIH07XG4gIGNvbnN0IG5ld1Byb2ZpbGVLZXlzOiBBcnJheTxHcm91cENoYW5nZU1lbWJlclR5cGU+ID0gW107XG5cbiAgLy8gdmVyc2lvblxuICByZXN1bHQucmV2aXNpb24gPSB2ZXJzaW9uO1xuXG4gIC8vIHRpdGxlXG4gIC8vIE5vdGU6IER1cmluZyBkZWNyeXB0aW9uLCB0aXRsZSBiZWNvbWVzIGEgR3JvdXBBdHRyaWJ1dGVCbG9iXG4gIGNvbnN0IHsgdGl0bGUgfSA9IGdyb3VwU3RhdGU7XG4gIGlmICh0aXRsZSAmJiB0aXRsZS5jb250ZW50ID09PSAndGl0bGUnKSB7XG4gICAgcmVzdWx0Lm5hbWUgPSBkcm9wTnVsbCh0aXRsZS50aXRsZSk7XG4gIH0gZWxzZSB7XG4gICAgcmVzdWx0Lm5hbWUgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBhdmF0YXJcbiAgYXdhaXQgYXBwbHlOZXdBdmF0YXIoZHJvcE51bGwoZ3JvdXBTdGF0ZS5hdmF0YXIpLCByZXN1bHQsIGxvZ0lkKTtcblxuICAvLyBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyXG4gIC8vIE5vdGU6IGR1cmluZyBkZWNyeXB0aW9uLCBkaXNhcHBlYXJpbmdNZXNzYWdlVGltZXIgYmVjb21lcyBhIEdyb3VwQXR0cmlidXRlQmxvYlxuICBjb25zdCB7IGRpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIgfSA9IGdyb3VwU3RhdGU7XG4gIGlmIChcbiAgICBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyICYmXG4gICAgZGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lci5jb250ZW50ID09PSAnZGlzYXBwZWFyaW5nTWVzc2FnZXNEdXJhdGlvbidcbiAgKSB7XG4gICAgcmVzdWx0LmV4cGlyZVRpbWVyID0gZHJvcE51bGwoXG4gICAgICBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyLmRpc2FwcGVhcmluZ01lc3NhZ2VzRHVyYXRpb25cbiAgICApO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5leHBpcmVUaW1lciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIGFjY2Vzc0NvbnRyb2xcbiAgY29uc3QgeyBhY2Nlc3NDb250cm9sIH0gPSBncm91cFN0YXRlO1xuICByZXN1bHQuYWNjZXNzQ29udHJvbCA9IHtcbiAgICBhdHRyaWJ1dGVzOlxuICAgICAgKGFjY2Vzc0NvbnRyb2wgJiYgYWNjZXNzQ29udHJvbC5hdHRyaWJ1dGVzKSB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgbWVtYmVyczogKGFjY2Vzc0NvbnRyb2wgJiYgYWNjZXNzQ29udHJvbC5tZW1iZXJzKSB8fCBBQ0NFU1NfRU5VTS5NRU1CRVIsXG4gICAgYWRkRnJvbUludml0ZUxpbms6XG4gICAgICAoYWNjZXNzQ29udHJvbCAmJiBhY2Nlc3NDb250cm9sLmFkZEZyb21JbnZpdGVMaW5rKSB8fFxuICAgICAgQUNDRVNTX0VOVU0uVU5TQVRJU0ZJQUJMRSxcbiAgfTtcblxuICAvLyBPcHRpbWl6YXRpb246IHdlIGFzc3VtZSB3ZSBoYXZlIGxlZnQgdGhlIGdyb3VwIHVubGVzcyB3ZSBhcmUgZm91bmQgaW4gbWVtYmVyc1xuICByZXN1bHQubGVmdCA9IHRydWU7XG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKTtcblxuICAvLyBtZW1iZXJzXG4gIGNvbnN0IHdhc1ByZXZpb3VzbHlBTWVtYmVyID0gKHJlc3VsdC5tZW1iZXJzVjIgfHwgW10pLnNvbWUoXG4gICAgaXRlbSA9PiBpdGVtLnV1aWQgIT09IG91clV1aWRcbiAgKTtcbiAgaWYgKGdyb3VwU3RhdGUubWVtYmVycykge1xuICAgIHJlc3VsdC5tZW1iZXJzVjIgPSBncm91cFN0YXRlLm1lbWJlcnMubWFwKG1lbWJlciA9PiB7XG4gICAgICBpZiAobWVtYmVyLnVzZXJJZCA9PT0gb3VyVXVpZCkge1xuICAgICAgICByZXN1bHQubGVmdCA9IGZhbHNlO1xuXG4gICAgICAgIC8vIENhcHR1cmUgd2hvIGFkZGVkIHVzIGlmIHdlIHdlcmUgcHJldmlvdXNseSBub3QgaW4gZ3JvdXBcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHNvdXJjZVV1aWQgJiZcbiAgICAgICAgICAhd2FzUHJldmlvdXNseUFNZW1iZXIgJiZcbiAgICAgICAgICBpc051bWJlcihtZW1iZXIuam9pbmVkQXRWZXJzaW9uKSAmJlxuICAgICAgICAgIG1lbWJlci5qb2luZWRBdFZlcnNpb24gPT09IHZlcnNpb25cbiAgICAgICAgKSB7XG4gICAgICAgICAgcmVzdWx0LmFkZGVkQnkgPSBzb3VyY2VVdWlkO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWYWxpZFJvbGUobWVtYmVyLnJvbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgYXBwbHlHcm91cFN0YXRlOiBNZW1iZXIgaGFkIGludmFsaWQgcm9sZSAke21lbWJlci5yb2xlfWBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKG1lbWJlci5wcm9maWxlS2V5KSB7XG4gICAgICAgIG5ld1Byb2ZpbGVLZXlzLnB1c2goe1xuICAgICAgICAgIHByb2ZpbGVLZXk6IG1lbWJlci5wcm9maWxlS2V5LFxuICAgICAgICAgIHV1aWQ6IFVVSUQuY2FzdChtZW1iZXIudXNlcklkKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvbGU6IG1lbWJlci5yb2xlIHx8IE1FTUJFUl9ST0xFX0VOVU0uREVGQVVMVCxcbiAgICAgICAgam9pbmVkQXRWZXJzaW9uOiBtZW1iZXIuam9pbmVkQXRWZXJzaW9uIHx8IHZlcnNpb24sXG4gICAgICAgIHV1aWQ6IFVVSUQuY2FzdChtZW1iZXIudXNlcklkKSxcbiAgICAgIH07XG4gICAgfSk7XG4gIH1cblxuICAvLyBtZW1iZXJzUGVuZGluZ1Byb2ZpbGVLZXlcbiAgaWYgKGdyb3VwU3RhdGUubWVtYmVyc1BlbmRpbmdQcm9maWxlS2V5KSB7XG4gICAgcmVzdWx0LnBlbmRpbmdNZW1iZXJzVjIgPSBncm91cFN0YXRlLm1lbWJlcnNQZW5kaW5nUHJvZmlsZUtleS5tYXAoXG4gICAgICBtZW1iZXIgPT4ge1xuICAgICAgICBpZiAoIW1lbWJlci5tZW1iZXIgfHwgIW1lbWJlci5tZW1iZXIudXNlcklkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ2FwcGx5R3JvdXBTdGF0ZTogTWVtYmVyIHBlbmRpbmcgcHJvZmlsZSBrZXkgZGlkIG5vdCBoYXZlIGFuIGFzc29jaWF0ZWQgdXNlcklkJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoIW1lbWJlci5hZGRlZEJ5VXNlcklkKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ2FwcGx5R3JvdXBTdGF0ZTogTWVtYmVyIHBlbmRpbmcgcHJvZmlsZSBrZXkgZGlkIG5vdCBoYXZlIGFuIGFkZGVkQnlVc2VySUQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghaXNWYWxpZFJvbGUobWVtYmVyLm1lbWJlci5yb2xlKSkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgIGBhcHBseUdyb3VwU3RhdGU6IE1lbWJlciBwZW5kaW5nIHByb2ZpbGUga2V5IGhhZCBpbnZhbGlkIHJvbGUgJHttZW1iZXIubWVtYmVyLnJvbGV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAobWVtYmVyLm1lbWJlci5wcm9maWxlS2V5KSB7XG4gICAgICAgICAgbmV3UHJvZmlsZUtleXMucHVzaCh7XG4gICAgICAgICAgICBwcm9maWxlS2V5OiBtZW1iZXIubWVtYmVyLnByb2ZpbGVLZXksXG4gICAgICAgICAgICB1dWlkOiBVVUlELmNhc3QobWVtYmVyLm1lbWJlci51c2VySWQpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBhZGRlZEJ5VXNlcklkOiBVVUlELmNhc3QobWVtYmVyLmFkZGVkQnlVc2VySWQpLFxuICAgICAgICAgIHV1aWQ6IFVVSUQuY2FzdChtZW1iZXIubWVtYmVyLnVzZXJJZCksXG4gICAgICAgICAgdGltZXN0YW1wOiBtZW1iZXIudGltZXN0YW1wLFxuICAgICAgICAgIHJvbGU6IG1lbWJlci5tZW1iZXIucm9sZSB8fCBNRU1CRVJfUk9MRV9FTlVNLkRFRkFVTFQsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIG1lbWJlcnNQZW5kaW5nQWRtaW5BcHByb3ZhbFxuICBpZiAoZ3JvdXBTdGF0ZS5tZW1iZXJzUGVuZGluZ0FkbWluQXBwcm92YWwpIHtcbiAgICByZXN1bHQucGVuZGluZ0FkbWluQXBwcm92YWxWMiA9IGdyb3VwU3RhdGUubWVtYmVyc1BlbmRpbmdBZG1pbkFwcHJvdmFsLm1hcChcbiAgICAgIG1lbWJlciA9PiB7XG4gICAgICAgIGlmIChtZW1iZXIucHJvZmlsZUtleSkge1xuICAgICAgICAgIG5ld1Byb2ZpbGVLZXlzLnB1c2goe1xuICAgICAgICAgICAgcHJvZmlsZUtleTogbWVtYmVyLnByb2ZpbGVLZXksXG4gICAgICAgICAgICB1dWlkOiBVVUlELmNhc3QobWVtYmVyLnVzZXJJZCksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHV1aWQ6IFVVSUQuY2FzdChtZW1iZXIudXNlcklkKSxcbiAgICAgICAgICB0aW1lc3RhbXA6IG1lbWJlci50aW1lc3RhbXAsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIC8vIGludml0ZUxpbmtQYXNzd29yZFxuICBjb25zdCB7IGludml0ZUxpbmtQYXNzd29yZCB9ID0gZ3JvdXBTdGF0ZTtcbiAgaWYgKGludml0ZUxpbmtQYXNzd29yZCkge1xuICAgIHJlc3VsdC5ncm91cEludml0ZUxpbmtQYXNzd29yZCA9IGludml0ZUxpbmtQYXNzd29yZDtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQuZ3JvdXBJbnZpdGVMaW5rUGFzc3dvcmQgPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBkZXNjcmlwdGlvbkJ5dGVzXG4gIGNvbnN0IHsgZGVzY3JpcHRpb25CeXRlcyB9ID0gZ3JvdXBTdGF0ZTtcbiAgaWYgKGRlc2NyaXB0aW9uQnl0ZXMgJiYgZGVzY3JpcHRpb25CeXRlcy5jb250ZW50ID09PSAnZGVzY3JpcHRpb25UZXh0Jykge1xuICAgIHJlc3VsdC5kZXNjcmlwdGlvbiA9IGRyb3BOdWxsKGRlc2NyaXB0aW9uQnl0ZXMuZGVzY3JpcHRpb25UZXh0KTtcbiAgfSBlbHNlIHtcbiAgICByZXN1bHQuZGVzY3JpcHRpb24gPSB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBhbm5vdW5jZW1lbnRzT25seVxuICByZXN1bHQuYW5ub3VuY2VtZW50c09ubHkgPSBncm91cFN0YXRlLmFubm91bmNlbWVudHNPbmx5O1xuXG4gIC8vIG1lbWJlcnNCYW5uZWRcbiAgcmVzdWx0LmJhbm5lZE1lbWJlcnNWMiA9IGdyb3VwU3RhdGUubWVtYmVyc0Jhbm5lZDtcblxuICBpZiAocmVzdWx0LmxlZnQpIHtcbiAgICByZXN1bHQuYWRkZWRCeSA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgbmV3QXR0cmlidXRlczogcmVzdWx0LFxuICAgIG5ld1Byb2ZpbGVLZXlzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkUm9sZShyb2xlPzogbnVtYmVyKTogcm9sZSBpcyBudW1iZXIge1xuICBjb25zdCBNRU1CRVJfUk9MRV9FTlVNID0gUHJvdG8uTWVtYmVyLlJvbGU7XG5cbiAgcmV0dXJuIChcbiAgICByb2xlID09PSBNRU1CRVJfUk9MRV9FTlVNLkFETUlOSVNUUkFUT1IgfHwgcm9sZSA9PT0gTUVNQkVSX1JPTEVfRU5VTS5ERUZBVUxUXG4gICk7XG59XG5cbmZ1bmN0aW9uIGlzVmFsaWRBY2Nlc3MoYWNjZXNzPzogbnVtYmVyKTogYWNjZXNzIGlzIG51bWJlciB7XG4gIGNvbnN0IEFDQ0VTU19FTlVNID0gUHJvdG8uQWNjZXNzQ29udHJvbC5BY2Nlc3NSZXF1aXJlZDtcblxuICByZXR1cm4gYWNjZXNzID09PSBBQ0NFU1NfRU5VTS5BRE1JTklTVFJBVE9SIHx8IGFjY2VzcyA9PT0gQUNDRVNTX0VOVU0uTUVNQkVSO1xufVxuXG5mdW5jdGlvbiBpc1ZhbGlkTGlua0FjY2VzcyhhY2Nlc3M/OiBudW1iZXIpOiBhY2Nlc3MgaXMgbnVtYmVyIHtcbiAgY29uc3QgQUNDRVNTX0VOVU0gPSBQcm90by5BY2Nlc3NDb250cm9sLkFjY2Vzc1JlcXVpcmVkO1xuXG4gIHJldHVybiAoXG4gICAgYWNjZXNzID09PSBBQ0NFU1NfRU5VTS5VTktOT1dOIHx8XG4gICAgYWNjZXNzID09PSBBQ0NFU1NfRU5VTS5BTlkgfHxcbiAgICBhY2Nlc3MgPT09IEFDQ0VTU19FTlVNLkFETUlOSVNUUkFUT1IgfHxcbiAgICBhY2Nlc3MgPT09IEFDQ0VTU19FTlVNLlVOU0FUSVNGSUFCTEVcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFByb2ZpbGVLZXkoYnVmZmVyPzogVWludDhBcnJheSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihidWZmZXIgJiYgYnVmZmVyLmxlbmd0aCA9PT0gMzIpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemVUaW1lc3RhbXAodGltZXN0YW1wOiBMb25nIHwgbnVsbCB8IHVuZGVmaW5lZCk6IG51bWJlciB7XG4gIGlmICghdGltZXN0YW1wKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBjb25zdCBhc051bWJlciA9IHRpbWVzdGFtcC50b051bWJlcigpO1xuXG4gIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gIGlmICghYXNOdW1iZXIgfHwgYXNOdW1iZXIgPiBub3cpIHtcbiAgICByZXR1cm4gbm93O1xuICB9XG5cbiAgcmV0dXJuIGFzTnVtYmVyO1xufVxuXG50eXBlIERlY3J5cHRlZEdyb3VwQ2hhbmdlQWN0aW9ucyA9IHtcbiAgdmVyc2lvbj86IG51bWJlcjtcbiAgc291cmNlVXVpZD86IFVVSURTdHJpbmdUeXBlO1xuICBhZGRNZW1iZXJzPzogUmVhZG9ubHlBcnJheTx7XG4gICAgYWRkZWQ6IERlY3J5cHRlZE1lbWJlcjtcbiAgICBqb2luRnJvbUludml0ZUxpbms6IGJvb2xlYW47XG4gIH0+O1xuICBkZWxldGVNZW1iZXJzPzogUmVhZG9ubHlBcnJheTx7XG4gICAgZGVsZXRlZFVzZXJJZDogc3RyaW5nO1xuICB9PjtcbiAgbW9kaWZ5TWVtYmVyUm9sZXM/OiBSZWFkb25seUFycmF5PHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICByb2xlOiBQcm90by5NZW1iZXIuUm9sZTtcbiAgfT47XG4gIG1vZGlmeU1lbWJlclByb2ZpbGVLZXlzPzogUmVhZG9ubHlBcnJheTx7XG4gICAgcHJvZmlsZUtleTogVWludDhBcnJheTtcbiAgICB1dWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgfT47XG4gIGFkZFBlbmRpbmdNZW1iZXJzPzogUmVhZG9ubHlBcnJheTx7XG4gICAgYWRkZWQ6IERlY3J5cHRlZE1lbWJlclBlbmRpbmdQcm9maWxlS2V5O1xuICB9PjtcbiAgZGVsZXRlUGVuZGluZ01lbWJlcnM/OiBSZWFkb25seUFycmF5PHtcbiAgICBkZWxldGVkVXNlcklkOiBzdHJpbmc7XG4gIH0+O1xuICBwcm9tb3RlUGVuZGluZ01lbWJlcnM/OiBSZWFkb25seUFycmF5PHtcbiAgICBwcm9maWxlS2V5OiBVaW50OEFycmF5O1xuICAgIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xuICB9PjtcbiAgbW9kaWZ5VGl0bGU/OiB7XG4gICAgdGl0bGU/OiBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2I7XG4gIH07XG4gIG1vZGlmeURpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXI/OiB7XG4gICAgdGltZXI/OiBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2I7XG4gIH07XG4gIGFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscz86IFJlYWRvbmx5QXJyYXk8e1xuICAgIGFkZGVkOiBEZWNyeXB0ZWRNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbDtcbiAgfT47XG4gIGRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscz86IFJlYWRvbmx5QXJyYXk8e1xuICAgIGRlbGV0ZWRVc2VySWQ6IHN0cmluZztcbiAgfT47XG4gIHByb21vdGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHM/OiBSZWFkb25seUFycmF5PHtcbiAgICB1c2VySWQ6IHN0cmluZztcbiAgICByb2xlOiBQcm90by5NZW1iZXIuUm9sZTtcbiAgfT47XG4gIG1vZGlmeUludml0ZUxpbmtQYXNzd29yZD86IHtcbiAgICBpbnZpdGVMaW5rUGFzc3dvcmQ/OiBzdHJpbmc7XG4gIH07XG4gIG1vZGlmeURlc2NyaXB0aW9uPzoge1xuICAgIGRlc2NyaXB0aW9uQnl0ZXM/OiBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2I7XG4gIH07XG4gIG1vZGlmeUFubm91bmNlbWVudHNPbmx5Pzoge1xuICAgIGFubm91bmNlbWVudHNPbmx5OiBib29sZWFuO1xuICB9O1xuICBhZGRNZW1iZXJzQmFubmVkPzogUmVhZG9ubHlBcnJheTxHcm91cFYyQmFubmVkTWVtYmVyVHlwZT47XG4gIGRlbGV0ZU1lbWJlcnNCYW5uZWQ/OiBSZWFkb25seUFycmF5PFVVSURTdHJpbmdUeXBlPjtcbn0gJiBQaWNrPFxuICBQcm90by5Hcm91cENoYW5nZS5JQWN0aW9ucyxcbiAgfCAnbW9kaWZ5QXR0cmlidXRlc0FjY2VzcydcbiAgfCAnbW9kaWZ5TWVtYmVyQWNjZXNzJ1xuICB8ICdtb2RpZnlBZGRGcm9tSW52aXRlTGlua0FjY2VzcydcbiAgfCAnbW9kaWZ5QXZhdGFyJ1xuPjtcblxuZnVuY3Rpb24gZGVjcnlwdEdyb3VwQ2hhbmdlKFxuICBhY3Rpb25zOiBSZWFkb25seTxQcm90by5Hcm91cENoYW5nZS5JQWN0aW9ucz4sXG4gIGdyb3VwU2VjcmV0UGFyYW1zOiBzdHJpbmcsXG4gIGxvZ0lkOiBzdHJpbmdcbik6IERlY3J5cHRlZEdyb3VwQ2hhbmdlQWN0aW9ucyB7XG4gIGNvbnN0IHJlc3VsdDogRGVjcnlwdGVkR3JvdXBDaGFuZ2VBY3Rpb25zID0ge1xuICAgIHZlcnNpb246IGRyb3BOdWxsKGFjdGlvbnMudmVyc2lvbiksXG4gIH07XG5cbiAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoZ3JvdXBTZWNyZXRQYXJhbXMpO1xuXG4gIGlmIChhY3Rpb25zLnNvdXJjZVV1aWQgJiYgYWN0aW9ucy5zb3VyY2VVdWlkLmxlbmd0aCAhPT0gMCkge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQuc291cmNlVXVpZCA9IFVVSUQuY2FzdChcbiAgICAgICAgbm9ybWFsaXplVXVpZChcbiAgICAgICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBhY3Rpb25zLnNvdXJjZVV1aWQpLFxuICAgICAgICAgICdhY3Rpb25zLnNvdXJjZVV1aWQnXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBzb3VyY2VVdWlkLmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWRVdWlkKHJlc3VsdC5zb3VyY2VVdWlkKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IEludmFsaWQgc291cmNlVXVpZC4gQ2xlYXJpbmcgc291cmNlVXVpZC5gXG4gICAgICApO1xuICAgICAgcmVzdWx0LnNvdXJjZVV1aWQgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcignZGVjcnlwdEdyb3VwQ2hhbmdlOiBNaXNzaW5nIHNvdXJjZVV1aWQnKTtcbiAgfVxuXG4gIC8vIGFkZE1lbWJlcnM/OiBBcnJheTxHcm91cENoYW5nZS5BY3Rpb25zLkFkZE1lbWJlckFjdGlvbj47XG4gIHJlc3VsdC5hZGRNZW1iZXJzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5hZGRNZW1iZXJzIHx8IFtdKS5tYXAoYWRkTWVtYmVyID0+IHtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgYWRkTWVtYmVyLmFkZGVkLFxuICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBBZGRNZW1iZXIgd2FzIG1pc3NpbmcgYWRkZWQgZmllbGQhJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGRlY3J5cHRNZW1iZXIoXG4gICAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICAgIGFkZE1lbWJlci5hZGRlZCxcbiAgICAgICAgbG9nSWRcbiAgICAgICk7XG4gICAgICBpZiAoIWRlY3J5cHRlZCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWRkZWQ6IGRlY3J5cHRlZCxcbiAgICAgICAgam9pbkZyb21JbnZpdGVMaW5rOiBCb29sZWFuKGFkZE1lbWJlci5qb2luRnJvbUludml0ZUxpbmspLFxuICAgICAgfTtcbiAgICB9KVxuICApO1xuXG4gIC8vIGRlbGV0ZU1lbWJlcnM/OiBBcnJheTxHcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlckFjdGlvbj47XG4gIHJlc3VsdC5kZWxldGVNZW1iZXJzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5kZWxldGVNZW1iZXJzIHx8IFtdKS5tYXAoZGVsZXRlTWVtYmVyID0+IHtcbiAgICAgIGNvbnN0IHsgZGVsZXRlZFVzZXJJZCB9ID0gZGVsZXRlTWVtYmVyO1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBCeXRlcy5pc05vdEVtcHR5KGRlbGV0ZWRVc2VySWQpLFxuICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBkZWxldGVNZW1iZXIuZGVsZXRlZFVzZXJJZCB3YXMgbWlzc2luZydcbiAgICAgICk7XG5cbiAgICAgIGxldCB1c2VySWQ6IHN0cmluZztcbiAgICAgIHRyeSB7XG4gICAgICAgIHVzZXJJZCA9IG5vcm1hbGl6ZVV1aWQoXG4gICAgICAgICAgZGVjcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgZGVsZXRlZFVzZXJJZCksXG4gICAgICAgICAgJ2FjdGlvbnMuZGVsZXRlTWVtYmVycy5kZWxldGVkVXNlcklkJ1xuICAgICAgICApO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGRlY3J5cHRHcm91cENoYW5nZS8ke2xvZ0lkfTogVW5hYmxlIHRvIGRlY3J5cHQgZGVsZXRlTWVtYmVycy5kZWxldGVkVXNlcklkLiBEcm9wcGluZyBtZW1iZXIuYCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWYWxpZFV1aWQodXNlcklkKSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBEcm9wcGluZyBkZWxldGVNZW1iZXIgZHVlIHRvIGludmFsaWQgdXNlcklkYFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4geyBkZWxldGVkVXNlcklkOiB1c2VySWQgfTtcbiAgICB9KVxuICApO1xuXG4gIC8vIG1vZGlmeU1lbWJlclJvbGVzPzogQXJyYXk8R3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlNZW1iZXJSb2xlQWN0aW9uPjtcbiAgcmVzdWx0Lm1vZGlmeU1lbWJlclJvbGVzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5tb2RpZnlNZW1iZXJSb2xlcyB8fCBbXSkubWFwKG1vZGlmeU1lbWJlciA9PiB7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIEJ5dGVzLmlzTm90RW1wdHkobW9kaWZ5TWVtYmVyLnVzZXJJZCksXG4gICAgICAgICdkZWNyeXB0R3JvdXBDaGFuZ2U6IG1vZGlmeU1lbWJlclJvbGUudXNlcklkIHdhcyBtaXNzaW5nJ1xuICAgICAgKTtcblxuICAgICAgbGV0IHVzZXJJZDogc3RyaW5nO1xuICAgICAgdHJ5IHtcbiAgICAgICAgdXNlcklkID0gbm9ybWFsaXplVXVpZChcbiAgICAgICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBtb2RpZnlNZW1iZXIudXNlcklkKSxcbiAgICAgICAgICAnYWN0aW9ucy5tb2RpZnlNZW1iZXJSb2xlcy51c2VySWQnXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBtb2RpZnlNZW1iZXJSb2xlLnVzZXJJZC4gRHJvcHBpbmcgbWVtYmVyLmAsXG4gICAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzVmFsaWRVdWlkKHVzZXJJZCkpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGRlY3J5cHRHcm91cENoYW5nZS8ke2xvZ0lkfTogRHJvcHBpbmcgbW9kaWZ5TWVtYmVyUm9sZSBkdWUgdG8gaW52YWxpZCB1c2VySWRgXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvbGUgPSBkcm9wTnVsbChtb2RpZnlNZW1iZXIucm9sZSk7XG4gICAgICBpZiAoIWlzVmFsaWRSb2xlKHJvbGUpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlOiBtb2RpZnlNZW1iZXJSb2xlIGhhZCBpbnZhbGlkIHJvbGUgJHttb2RpZnlNZW1iZXIucm9sZX1gXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHJvbGUsXG4gICAgICAgIHVzZXJJZCxcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICAvLyBtb2RpZnlNZW1iZXJQcm9maWxlS2V5cz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5TWVtYmVyUHJvZmlsZUtleUFjdGlvblxuICAvLyA+O1xuICByZXN1bHQubW9kaWZ5TWVtYmVyUHJvZmlsZUtleXMgPSBjb21wYWN0KFxuICAgIChhY3Rpb25zLm1vZGlmeU1lbWJlclByb2ZpbGVLZXlzIHx8IFtdKS5tYXAobW9kaWZ5TWVtYmVyUHJvZmlsZUtleSA9PiB7XG4gICAgICBjb25zdCB7IHByZXNlbnRhdGlvbiB9ID0gbW9kaWZ5TWVtYmVyUHJvZmlsZUtleTtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgQnl0ZXMuaXNOb3RFbXB0eShwcmVzZW50YXRpb24pLFxuICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBtb2RpZnlNZW1iZXJQcm9maWxlS2V5LnByZXNlbnRhdGlvbiB3YXMgbWlzc2luZydcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGRlY3J5cHRlZFByZXNlbnRhdGlvbiA9IGRlY3J5cHRQcm9maWxlS2V5Q3JlZGVudGlhbFByZXNlbnRhdGlvbihcbiAgICAgICAgY2xpZW50WmtHcm91cENpcGhlcixcbiAgICAgICAgcHJlc2VudGF0aW9uXG4gICAgICApO1xuXG4gICAgICBpZiAoIWRlY3J5cHRlZFByZXNlbnRhdGlvbi51dWlkIHx8ICFkZWNyeXB0ZWRQcmVzZW50YXRpb24ucHJvZmlsZUtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogdXVpZCBvciBwcm9maWxlS2V5IG1pc3NpbmcgYWZ0ZXIgbW9kaWZ5TWVtYmVyUHJvZmlsZUtleSBkZWNyeXB0aW9uISdcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgaWYgKCFpc1ZhbGlkVXVpZChkZWNyeXB0ZWRQcmVzZW50YXRpb24udXVpZCkpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYGRlY3J5cHRHcm91cENoYW5nZS8ke2xvZ0lkfTogRHJvcHBpbmcgbW9kaWZ5TWVtYmVyUHJvZmlsZUtleSBkdWUgdG8gaW52YWxpZCB1c2VySWRgXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWYWxpZFByb2ZpbGVLZXkoZGVjcnlwdGVkUHJlc2VudGF0aW9uLnByb2ZpbGVLZXkpKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBtb2RpZnlNZW1iZXJQcm9maWxlS2V5IGhhZCBpbnZhbGlkIHByb2ZpbGVLZXknXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBkZWNyeXB0ZWRQcmVzZW50YXRpb247XG4gICAgfSlcbiAgKTtcblxuICAvLyBhZGRQZW5kaW5nTWVtYmVycz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXlBY3Rpb25cbiAgLy8gPjtcbiAgcmVzdWx0LmFkZFBlbmRpbmdNZW1iZXJzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5hZGRQZW5kaW5nTWVtYmVycyB8fCBbXSkubWFwKGFkZFBlbmRpbmdNZW1iZXIgPT4ge1xuICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICBhZGRQZW5kaW5nTWVtYmVyLmFkZGVkLFxuICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBhZGRQZW5kaW5nTWVtYmVyIHdhcyBtaXNzaW5nIGFkZGVkIGZpZWxkISdcbiAgICAgICk7XG4gICAgICBjb25zdCBkZWNyeXB0ZWQgPSBkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkoXG4gICAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICAgIGFkZFBlbmRpbmdNZW1iZXIuYWRkZWQsXG4gICAgICAgIGxvZ0lkXG4gICAgICApO1xuICAgICAgaWYgKCFkZWNyeXB0ZWQpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGFkZGVkOiBkZWNyeXB0ZWQsXG4gICAgICB9O1xuICAgIH0pXG4gICk7XG5cbiAgLy8gZGVsZXRlUGVuZGluZ01lbWJlcnM/OiBBcnJheTxcbiAgLy8gICBHcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlclBlbmRpbmdQcm9maWxlS2V5QWN0aW9uXG4gIC8vID47XG4gIHJlc3VsdC5kZWxldGVQZW5kaW5nTWVtYmVycyA9IGNvbXBhY3QoXG4gICAgKGFjdGlvbnMuZGVsZXRlUGVuZGluZ01lbWJlcnMgfHwgW10pLm1hcChkZWxldGVQZW5kaW5nTWVtYmVyID0+IHtcbiAgICAgIGNvbnN0IHsgZGVsZXRlZFVzZXJJZCB9ID0gZGVsZXRlUGVuZGluZ01lbWJlcjtcbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgQnl0ZXMuaXNOb3RFbXB0eShkZWxldGVkVXNlcklkKSxcbiAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogZGVsZXRlUGVuZGluZ01lbWJlcnMuZGVsZXRlZFVzZXJJZCB3YXMgbWlzc2luZydcbiAgICAgICk7XG4gICAgICBsZXQgdXNlcklkOiBzdHJpbmc7XG4gICAgICB0cnkge1xuICAgICAgICB1c2VySWQgPSBub3JtYWxpemVVdWlkKFxuICAgICAgICAgIGRlY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIGRlbGV0ZWRVc2VySWQpLFxuICAgICAgICAgICdhY3Rpb25zLmRlbGV0ZVBlbmRpbmdNZW1iZXJzLmRlbGV0ZWRVc2VySWQnXG4gICAgICAgICk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBkZWxldGVQZW5kaW5nTWVtYmVycy5kZWxldGVkVXNlcklkLiBEcm9wcGluZyBtZW1iZXIuYCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWYWxpZFV1aWQodXNlcklkKSkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBEcm9wcGluZyBkZWxldGVQZW5kaW5nTWVtYmVyIGR1ZSB0byBpbnZhbGlkIGRlbGV0ZWRVc2VySWRgXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGRlbGV0ZWRVc2VySWQ6IHVzZXJJZCxcbiAgICAgIH07XG4gICAgfSlcbiAgKTtcblxuICAvLyBwcm9tb3RlUGVuZGluZ01lbWJlcnM/OiBBcnJheTxcbiAgLy8gICBHcm91cENoYW5nZS5BY3Rpb25zLlByb21vdGVNZW1iZXJQZW5kaW5nUHJvZmlsZUtleUFjdGlvblxuICAvLyA+O1xuICByZXN1bHQucHJvbW90ZVBlbmRpbmdNZW1iZXJzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5wcm9tb3RlUGVuZGluZ01lbWJlcnMgfHwgW10pLm1hcChwcm9tb3RlUGVuZGluZ01lbWJlciA9PiB7XG4gICAgICBjb25zdCB7IHByZXNlbnRhdGlvbiB9ID0gcHJvbW90ZVBlbmRpbmdNZW1iZXI7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIEJ5dGVzLmlzTm90RW1wdHkocHJlc2VudGF0aW9uKSxcbiAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogcHJvbW90ZVBlbmRpbmdNZW1iZXIucHJlc2VudGF0aW9uIHdhcyBtaXNzaW5nJ1xuICAgICAgKTtcbiAgICAgIGNvbnN0IGRlY3J5cHRlZFByZXNlbnRhdGlvbiA9IGRlY3J5cHRQcm9maWxlS2V5Q3JlZGVudGlhbFByZXNlbnRhdGlvbihcbiAgICAgICAgY2xpZW50WmtHcm91cENpcGhlcixcbiAgICAgICAgcHJlc2VudGF0aW9uXG4gICAgICApO1xuXG4gICAgICBpZiAoIWRlY3J5cHRlZFByZXNlbnRhdGlvbi51dWlkIHx8ICFkZWNyeXB0ZWRQcmVzZW50YXRpb24ucHJvZmlsZUtleSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogdXVpZCBvciBwcm9maWxlS2V5IG1pc3NpbmcgYWZ0ZXIgcHJvbW90ZVBlbmRpbmdNZW1iZXIgZGVjcnlwdGlvbiEnXG4gICAgICAgICk7XG4gICAgICB9XG5cbiAgICAgIGlmICghaXNWYWxpZFV1aWQoZGVjcnlwdGVkUHJlc2VudGF0aW9uLnV1aWQpKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IERyb3BwaW5nIG1vZGlmeU1lbWJlclByb2ZpbGVLZXkgZHVlIHRvIGludmFsaWQgdXNlcklkYFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzVmFsaWRQcm9maWxlS2V5KGRlY3J5cHRlZFByZXNlbnRhdGlvbi5wcm9maWxlS2V5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogbW9kaWZ5TWVtYmVyUHJvZmlsZUtleSBoYWQgaW52YWxpZCBwcm9maWxlS2V5J1xuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gZGVjcnlwdGVkUHJlc2VudGF0aW9uO1xuICAgIH0pXG4gICk7XG5cbiAgLy8gbW9kaWZ5VGl0bGU/OiBHcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeVRpdGxlQWN0aW9uO1xuICBpZiAoYWN0aW9ucy5tb2RpZnlUaXRsZSkge1xuICAgIGNvbnN0IHsgdGl0bGUgfSA9IGFjdGlvbnMubW9kaWZ5VGl0bGU7XG5cbiAgICBpZiAoQnl0ZXMuaXNOb3RFbXB0eSh0aXRsZSkpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdC5tb2RpZnlUaXRsZSA9IHtcbiAgICAgICAgICB0aXRsZTogUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iLmRlY29kZShcbiAgICAgICAgICAgIGRlY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgdGl0bGUpXG4gICAgICAgICAgKSxcbiAgICAgICAgfTtcbiAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IG1vZGlmeVRpdGxlLnRpdGxlYCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0Lm1vZGlmeVRpdGxlID0ge307XG4gICAgfVxuICB9XG5cbiAgLy8gbW9kaWZ5QXZhdGFyPzogR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlBdmF0YXJBY3Rpb247XG4gIC8vIE5vdGU6IGRlY3J5cHRpb24gaGFwcGVucyBkdXJpbmcgYXBwbGljYXRpb24gb2YgdGhlIGNoYW5nZSwgb24gZG93bmxvYWQgb2YgdGhlIGF2YXRhclxuICByZXN1bHQubW9kaWZ5QXZhdGFyID0gYWN0aW9ucy5tb2RpZnlBdmF0YXI7XG5cbiAgLy8gbW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lcj86XG4gIC8vIEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lckFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lcikge1xuICAgIGNvbnN0IHsgdGltZXIgfSA9IGFjdGlvbnMubW9kaWZ5RGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lcjtcblxuICAgIGlmIChCeXRlcy5pc05vdEVtcHR5KHRpbWVyKSkge1xuICAgICAgdHJ5IHtcbiAgICAgICAgcmVzdWx0Lm1vZGlmeURpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIgPSB7XG4gICAgICAgICAgdGltZXI6IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5kZWNvZGUoXG4gICAgICAgICAgICBkZWNyeXB0R3JvdXBCbG9iKGNsaWVudFprR3JvdXBDaXBoZXIsIHRpbWVyKVxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBtb2RpZnlEaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyLnRpbWVyYCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0Lm1vZGlmeURpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIgPSB7fTtcbiAgICB9XG4gIH1cblxuICAvLyBtb2RpZnlBdHRyaWJ1dGVzQWNjZXNzPzpcbiAgLy8gR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlBdHRyaWJ1dGVzQWNjZXNzQ29udHJvbEFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5QXR0cmlidXRlc0FjY2Vzcykge1xuICAgIGNvbnN0IGF0dHJpYnV0ZXNBY2Nlc3MgPSBkcm9wTnVsbChcbiAgICAgIGFjdGlvbnMubW9kaWZ5QXR0cmlidXRlc0FjY2Vzcy5hdHRyaWJ1dGVzQWNjZXNzXG4gICAgKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBpc1ZhbGlkQWNjZXNzKGF0dHJpYnV0ZXNBY2Nlc3MpLFxuICAgICAgYGRlY3J5cHRHcm91cENoYW5nZTogbW9kaWZ5QXR0cmlidXRlc0FjY2Vzcy5hdHRyaWJ1dGVzQWNjZXNzIHdhcyBub3QgdmFsaWQ6ICR7YWN0aW9ucy5tb2RpZnlBdHRyaWJ1dGVzQWNjZXNzLmF0dHJpYnV0ZXNBY2Nlc3N9YFxuICAgICk7XG5cbiAgICByZXN1bHQubW9kaWZ5QXR0cmlidXRlc0FjY2VzcyA9IHtcbiAgICAgIGF0dHJpYnV0ZXNBY2Nlc3MsXG4gICAgfTtcbiAgfVxuXG4gIC8vIG1vZGlmeU1lbWJlckFjY2Vzcz86IEdyb3VwQ2hhbmdlLkFjdGlvbnMuTW9kaWZ5TWVtYmVyc0FjY2Vzc0NvbnRyb2xBY3Rpb247XG4gIGlmIChhY3Rpb25zLm1vZGlmeU1lbWJlckFjY2Vzcykge1xuICAgIGNvbnN0IG1lbWJlcnNBY2Nlc3MgPSBkcm9wTnVsbChhY3Rpb25zLm1vZGlmeU1lbWJlckFjY2Vzcy5tZW1iZXJzQWNjZXNzKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBpc1ZhbGlkQWNjZXNzKG1lbWJlcnNBY2Nlc3MpLFxuICAgICAgYGRlY3J5cHRHcm91cENoYW5nZTogbW9kaWZ5TWVtYmVyQWNjZXNzLm1lbWJlcnNBY2Nlc3Mgd2FzIG5vdCB2YWxpZDogJHthY3Rpb25zLm1vZGlmeU1lbWJlckFjY2Vzcy5tZW1iZXJzQWNjZXNzfWBcbiAgICApO1xuXG4gICAgcmVzdWx0Lm1vZGlmeU1lbWJlckFjY2VzcyA9IHtcbiAgICAgIG1lbWJlcnNBY2Nlc3MsXG4gICAgfTtcbiAgfVxuXG4gIC8vIG1vZGlmeUFkZEZyb21JbnZpdGVMaW5rQWNjZXNzPzpcbiAgLy8gICBHcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUFkZEZyb21JbnZpdGVMaW5rQWNjZXNzQ29udHJvbEFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3MpIHtcbiAgICBjb25zdCBhZGRGcm9tSW52aXRlTGlua0FjY2VzcyA9IGRyb3BOdWxsKFxuICAgICAgYWN0aW9ucy5tb2RpZnlBZGRGcm9tSW52aXRlTGlua0FjY2Vzcy5hZGRGcm9tSW52aXRlTGlua0FjY2Vzc1xuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgaXNWYWxpZExpbmtBY2Nlc3MoYWRkRnJvbUludml0ZUxpbmtBY2Nlc3MpLFxuICAgICAgYGRlY3J5cHRHcm91cENoYW5nZTogbW9kaWZ5QWRkRnJvbUludml0ZUxpbmtBY2Nlc3MuYWRkRnJvbUludml0ZUxpbmtBY2Nlc3Mgd2FzIG5vdCB2YWxpZDogJHthY3Rpb25zLm1vZGlmeUFkZEZyb21JbnZpdGVMaW5rQWNjZXNzLmFkZEZyb21JbnZpdGVMaW5rQWNjZXNzfWBcbiAgICApO1xuXG4gICAgcmVzdWx0Lm1vZGlmeUFkZEZyb21JbnZpdGVMaW5rQWNjZXNzID0ge1xuICAgICAgYWRkRnJvbUludml0ZUxpbmtBY2Nlc3MsXG4gICAgfTtcbiAgfVxuXG4gIC8vIGFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuQWRkTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxBY3Rpb25cbiAgLy8gPjtcbiAgcmVzdWx0LmFkZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyA9IGNvbXBhY3QoXG4gICAgKGFjdGlvbnMuYWRkTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxzIHx8IFtdKS5tYXAoXG4gICAgICBhZGRQZW5kaW5nQWRtaW5BcHByb3ZhbCA9PiB7XG4gICAgICAgIGNvbnN0IHsgYWRkZWQgfSA9IGFkZFBlbmRpbmdBZG1pbkFwcHJvdmFsO1xuICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgYWRkZWQsXG4gICAgICAgICAgJ2RlY3J5cHRHcm91cENoYW5nZTogYWRkUGVuZGluZ0FkbWluQXBwcm92YWwgd2FzIG1pc3NpbmcgYWRkZWQgZmllbGQhJ1xuICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGRlY3J5cHRlZCA9IGRlY3J5cHRNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbChcbiAgICAgICAgICBjbGllbnRaa0dyb3VwQ2lwaGVyLFxuICAgICAgICAgIGFkZGVkLFxuICAgICAgICAgIGxvZ0lkXG4gICAgICAgICk7XG4gICAgICAgIGlmICghZGVjcnlwdGVkKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBhZGRQZW5kaW5nQWRtaW5BcHByb3ZhbC5hZGRlZC4gRHJvcHBpbmcgbWVtYmVyLmBcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHsgYWRkZWQ6IGRlY3J5cHRlZCB9O1xuICAgICAgfVxuICAgIClcbiAgKTtcblxuICAvLyBkZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHM/OiBBcnJheTxcbiAgLy8gICBHcm91cENoYW5nZS5BY3Rpb25zLkRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uXG4gIC8vID47XG4gIHJlc3VsdC5kZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHMgPSBjb21wYWN0KFxuICAgIChhY3Rpb25zLmRlbGV0ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscyB8fCBbXSkubWFwKFxuICAgICAgZGVsZXRlUGVuZGluZ0FwcHJvdmFsID0+IHtcbiAgICAgICAgY29uc3QgeyBkZWxldGVkVXNlcklkIH0gPSBkZWxldGVQZW5kaW5nQXBwcm92YWw7XG4gICAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgICBCeXRlcy5pc05vdEVtcHR5KGRlbGV0ZWRVc2VySWQpLFxuICAgICAgICAgICdkZWNyeXB0R3JvdXBDaGFuZ2U6IGRlbGV0ZVBlbmRpbmdBcHByb3ZhbC5kZWxldGVkVXNlcklkIHdhcyBtaXNzaW5nJ1xuICAgICAgICApO1xuXG4gICAgICAgIGxldCB1c2VySWQ6IHN0cmluZztcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICB1c2VySWQgPSBub3JtYWxpemVVdWlkKFxuICAgICAgICAgICAgZGVjcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgZGVsZXRlZFVzZXJJZCksXG4gICAgICAgICAgICAnYWN0aW9ucy5kZWxldGVNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbHMnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IGRlbGV0ZVBlbmRpbmdBcHByb3ZhbC5kZWxldGVkVXNlcklkLiBEcm9wcGluZyBtZW1iZXIuYCxcbiAgICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKCFpc1ZhbGlkVXVpZCh1c2VySWQpKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBEcm9wcGluZyBkZWxldGVQZW5kaW5nQXBwcm92YWwgZHVlIHRvIGludmFsaWQgZGVsZXRlZFVzZXJJZGBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyBkZWxldGVkVXNlcklkOiB1c2VySWQgfTtcbiAgICAgIH1cbiAgICApXG4gICk7XG5cbiAgLy8gcHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscz86IEFycmF5PFxuICAvLyAgIEdyb3VwQ2hhbmdlLkFjdGlvbnMuUHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsQWN0aW9uXG4gIC8vID47XG4gIHJlc3VsdC5wcm9tb3RlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxzID0gY29tcGFjdChcbiAgICAoYWN0aW9ucy5wcm9tb3RlTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWxzIHx8IFtdKS5tYXAoXG4gICAgICBwcm9tb3RlQWRtaW5BcHByb3ZhbCA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXNlcklkIH0gPSBwcm9tb3RlQWRtaW5BcHByb3ZhbDtcbiAgICAgICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgICAgIEJ5dGVzLmlzTm90RW1wdHkodXNlcklkKSxcbiAgICAgICAgICAnZGVjcnlwdEdyb3VwQ2hhbmdlOiBwcm9tb3RlQWRtaW5BcHByb3ZhbC51c2VySWQgd2FzIG1pc3NpbmcnXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IGRlY3J5cHRlZFVzZXJJZDogc3RyaW5nO1xuICAgICAgICB0cnkge1xuICAgICAgICAgIGRlY3J5cHRlZFVzZXJJZCA9IG5vcm1hbGl6ZVV1aWQoXG4gICAgICAgICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCB1c2VySWQpLFxuICAgICAgICAgICAgJ2FjdGlvbnMucHJvbW90ZU1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFscy51c2VySWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IHByb21vdGVBZG1pbkFwcHJvdmFsLnVzZXJJZC4gRHJvcHBpbmcgbWVtYmVyLmAsXG4gICAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybiBudWxsO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgcm9sZSA9IGRyb3BOdWxsKHByb21vdGVBZG1pbkFwcHJvdmFsLnJvbGUpO1xuICAgICAgICBpZiAoIWlzVmFsaWRSb2xlKHJvbGUpKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgYGRlY3J5cHRHcm91cENoYW5nZTogcHJvbW90ZUFkbWluQXBwcm92YWwgaGFkIGludmFsaWQgcm9sZSAke3Byb21vdGVBZG1pbkFwcHJvdmFsLnJvbGV9YFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4geyByb2xlLCB1c2VySWQ6IGRlY3J5cHRlZFVzZXJJZCB9O1xuICAgICAgfVxuICAgIClcbiAgKTtcblxuICAvLyBtb2RpZnlJbnZpdGVMaW5rUGFzc3dvcmQ/OiBHcm91cENoYW5nZS5BY3Rpb25zLk1vZGlmeUludml0ZUxpbmtQYXNzd29yZEFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5SW52aXRlTGlua1Bhc3N3b3JkKSB7XG4gICAgY29uc3QgeyBpbnZpdGVMaW5rUGFzc3dvcmQ6IHBhc3N3b3JkIH0gPSBhY3Rpb25zLm1vZGlmeUludml0ZUxpbmtQYXNzd29yZDtcbiAgICBpZiAoQnl0ZXMuaXNOb3RFbXB0eShwYXNzd29yZCkpIHtcbiAgICAgIHJlc3VsdC5tb2RpZnlJbnZpdGVMaW5rUGFzc3dvcmQgPSB7XG4gICAgICAgIGludml0ZUxpbmtQYXNzd29yZDogQnl0ZXMudG9CYXNlNjQocGFzc3dvcmQpLFxuICAgICAgfTtcbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0Lm1vZGlmeUludml0ZUxpbmtQYXNzd29yZCA9IHt9O1xuICAgIH1cbiAgfVxuXG4gIC8vIG1vZGlmeURlc2NyaXB0aW9uPzogR3JvdXBDaGFuZ2UuQWN0aW9ucy5Nb2RpZnlEZXNjcmlwdGlvbkFjdGlvbjtcbiAgaWYgKGFjdGlvbnMubW9kaWZ5RGVzY3JpcHRpb24pIHtcbiAgICBjb25zdCB7IGRlc2NyaXB0aW9uQnl0ZXMgfSA9IGFjdGlvbnMubW9kaWZ5RGVzY3JpcHRpb247XG4gICAgaWYgKEJ5dGVzLmlzTm90RW1wdHkoZGVzY3JpcHRpb25CeXRlcykpIHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHJlc3VsdC5tb2RpZnlEZXNjcmlwdGlvbiA9IHtcbiAgICAgICAgICBkZXNjcmlwdGlvbkJ5dGVzOiBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2IuZGVjb2RlKFxuICAgICAgICAgICAgZGVjcnlwdEdyb3VwQmxvYihjbGllbnRaa0dyb3VwQ2lwaGVyLCBkZXNjcmlwdGlvbkJ5dGVzKVxuICAgICAgICAgICksXG4gICAgICAgIH07XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBtb2RpZnlEZXNjcmlwdGlvbi5kZXNjcmlwdGlvbkJ5dGVzYCxcbiAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgcmVzdWx0Lm1vZGlmeURlc2NyaXB0aW9uID0ge307XG4gICAgfVxuICB9XG5cbiAgLy8gbW9kaWZ5QW5ub3VuY2VtZW50c09ubHlcbiAgaWYgKGFjdGlvbnMubW9kaWZ5QW5ub3VuY2VtZW50c09ubHkpIHtcbiAgICBjb25zdCB7IGFubm91bmNlbWVudHNPbmx5IH0gPSBhY3Rpb25zLm1vZGlmeUFubm91bmNlbWVudHNPbmx5O1xuICAgIHJlc3VsdC5tb2RpZnlBbm5vdW5jZW1lbnRzT25seSA9IHtcbiAgICAgIGFubm91bmNlbWVudHNPbmx5OiBCb29sZWFuKGFubm91bmNlbWVudHNPbmx5KSxcbiAgICB9O1xuICB9XG5cbiAgLy8gYWRkTWVtYmVyc0Jhbm5lZFxuICBpZiAoYWN0aW9ucy5hZGRNZW1iZXJzQmFubmVkICYmIGFjdGlvbnMuYWRkTWVtYmVyc0Jhbm5lZC5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0LmFkZE1lbWJlcnNCYW5uZWQgPSBhY3Rpb25zLmFkZE1lbWJlcnNCYW5uZWRcbiAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5hZGRlZCB8fCAhaXRlbS5hZGRlZC51c2VySWQpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBkZWNyeXB0R3JvdXBDaGFuZ2UvJHtsb2dJZH06IGFkZE1lbWJlcnNCYW5uZWQgaGFkIGEgYmxhbmsgZW50cnlgXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dWlkID0gbm9ybWFsaXplVXVpZChcbiAgICAgICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBpdGVtLmFkZGVkLnVzZXJJZCksXG4gICAgICAgICAgJ2FkZE1lbWJlcnNCYW5uZWQuYWRkZWQudXNlcklkJ1xuICAgICAgICApO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBub3JtYWxpemVUaW1lc3RhbXAoaXRlbS5hZGRlZC50aW1lc3RhbXApO1xuXG4gICAgICAgIHJldHVybiB7IHV1aWQsIHRpbWVzdGFtcCB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuICB9XG5cbiAgLy8gZGVsZXRlTWVtYmVyc0Jhbm5lZFxuICBpZiAoYWN0aW9ucy5kZWxldGVNZW1iZXJzQmFubmVkICYmIGFjdGlvbnMuZGVsZXRlTWVtYmVyc0Jhbm5lZC5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0LmRlbGV0ZU1lbWJlcnNCYW5uZWQgPSBhY3Rpb25zLmRlbGV0ZU1lbWJlcnNCYW5uZWRcbiAgICAgIC5tYXAoaXRlbSA9PiB7XG4gICAgICAgIGlmICghaXRlbS5kZWxldGVkVXNlcklkKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZGVjcnlwdEdyb3VwQ2hhbmdlLyR7bG9nSWR9OiBkZWxldGVNZW1iZXJzQmFubmVkIGhhZCBhIGJsYW5rIGVudHJ5YFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG5vcm1hbGl6ZVV1aWQoXG4gICAgICAgICAgZGVjcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgaXRlbS5kZWxldGVkVXNlcklkKSxcbiAgICAgICAgICAnZGVsZXRlTWVtYmVyc0Jhbm5lZC5kZWxldGVkVXNlcklkJ1xuICAgICAgICApO1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGRlY3J5cHRHcm91cFRpdGxlKFxuICB0aXRsZTogVWludDhBcnJheSB8IHVuZGVmaW5lZCxcbiAgc2VjcmV0UGFyYW1zOiBzdHJpbmdcbik6IHN0cmluZyB8IHVuZGVmaW5lZCB7XG4gIGNvbnN0IGNsaWVudFprR3JvdXBDaXBoZXIgPSBnZXRDbGllbnRaa0dyb3VwQ2lwaGVyKHNlY3JldFBhcmFtcyk7XG4gIGlmICghdGl0bGUgfHwgIXRpdGxlLmxlbmd0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3QgYmxvYiA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5kZWNvZGUoXG4gICAgZGVjcnlwdEdyb3VwQmxvYihjbGllbnRaa0dyb3VwQ2lwaGVyLCB0aXRsZSlcbiAgKTtcblxuICBpZiAoYmxvYiAmJiBibG9iLmNvbnRlbnQgPT09ICd0aXRsZScpIHtcbiAgICByZXR1cm4gZHJvcE51bGwoYmxvYi50aXRsZSk7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZGVjcnlwdEdyb3VwRGVzY3JpcHRpb24oXG4gIGRlc2NyaXB0aW9uOiBVaW50OEFycmF5IHwgdW5kZWZpbmVkLFxuICBzZWNyZXRQYXJhbXM6IHN0cmluZ1xuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgY2xpZW50WmtHcm91cENpcGhlciA9IGdldENsaWVudFprR3JvdXBDaXBoZXIoc2VjcmV0UGFyYW1zKTtcbiAgaWYgKCFkZXNjcmlwdGlvbiB8fCAhZGVzY3JpcHRpb24ubGVuZ3RoKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGJsb2IgPSBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2IuZGVjb2RlKFxuICAgIGRlY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgZGVzY3JpcHRpb24pXG4gICk7XG5cbiAgaWYgKGJsb2IgJiYgYmxvYi5jb250ZW50ID09PSAnZGVzY3JpcHRpb25UZXh0Jykge1xuICAgIHJldHVybiBkcm9wTnVsbChibG9iLmRlc2NyaXB0aW9uVGV4dCk7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG50eXBlIERlY3J5cHRlZEdyb3VwU3RhdGUgPSB7XG4gIHRpdGxlPzogUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iO1xuICBkaXNhcHBlYXJpbmdNZXNzYWdlc1RpbWVyPzogUHJvdG8uR3JvdXBBdHRyaWJ1dGVCbG9iO1xuICBhY2Nlc3NDb250cm9sPzoge1xuICAgIGF0dHJpYnV0ZXM6IG51bWJlcjtcbiAgICBtZW1iZXJzOiBudW1iZXI7XG4gICAgYWRkRnJvbUludml0ZUxpbms6IG51bWJlcjtcbiAgfTtcbiAgdmVyc2lvbj86IG51bWJlcjtcbiAgbWVtYmVycz86IFJlYWRvbmx5QXJyYXk8RGVjcnlwdGVkTWVtYmVyPjtcbiAgbWVtYmVyc1BlbmRpbmdQcm9maWxlS2V5PzogUmVhZG9ubHlBcnJheTxEZWNyeXB0ZWRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleT47XG4gIG1lbWJlcnNQZW5kaW5nQWRtaW5BcHByb3ZhbD86IFJlYWRvbmx5QXJyYXk8RGVjcnlwdGVkTWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWw+O1xuICBpbnZpdGVMaW5rUGFzc3dvcmQ/OiBzdHJpbmc7XG4gIGRlc2NyaXB0aW9uQnl0ZXM/OiBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2I7XG4gIGF2YXRhcj86IHN0cmluZztcbiAgYW5ub3VuY2VtZW50c09ubHk/OiBib29sZWFuO1xuICBtZW1iZXJzQmFubmVkPzogQXJyYXk8R3JvdXBWMkJhbm5lZE1lbWJlclR5cGU+O1xufTtcblxuZnVuY3Rpb24gZGVjcnlwdEdyb3VwU3RhdGUoXG4gIGdyb3VwU3RhdGU6IFJlYWRvbmx5PFByb3RvLklHcm91cD4sXG4gIGdyb3VwU2VjcmV0UGFyYW1zOiBzdHJpbmcsXG4gIGxvZ0lkOiBzdHJpbmdcbik6IERlY3J5cHRlZEdyb3VwU3RhdGUge1xuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihncm91cFNlY3JldFBhcmFtcyk7XG4gIGNvbnN0IHJlc3VsdDogRGVjcnlwdGVkR3JvdXBTdGF0ZSA9IHt9O1xuXG4gIC8vIHRpdGxlXG4gIGlmIChCeXRlcy5pc05vdEVtcHR5KGdyb3VwU3RhdGUudGl0bGUpKSB7XG4gICAgdHJ5IHtcbiAgICAgIHJlc3VsdC50aXRsZSA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5kZWNvZGUoXG4gICAgICAgIGRlY3J5cHRHcm91cEJsb2IoY2xpZW50WmtHcm91cENpcGhlciwgZ3JvdXBTdGF0ZS50aXRsZSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZGVjcnlwdEdyb3VwU3RhdGUvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IHRpdGxlLiBDbGVhcmluZyBpdC5gLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgLy8gYXZhdGFyXG4gIC8vIE5vdGU6IGRlY3J5cHRpb24gaGFwcGVucyBkdXJpbmcgYXBwbGljYXRpb24gb2YgdGhlIGNoYW5nZSwgb24gZG93bmxvYWQgb2YgdGhlIGF2YXRhclxuXG4gIC8vIGRpc2FwcGVhcmluZyBtZXNzYWdlIHRpbWVyXG4gIGlmIChcbiAgICBncm91cFN0YXRlLmRpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIgJiZcbiAgICBncm91cFN0YXRlLmRpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXIubGVuZ3RoXG4gICkge1xuICAgIHRyeSB7XG4gICAgICByZXN1bHQuZGlzYXBwZWFyaW5nTWVzc2FnZXNUaW1lciA9IFByb3RvLkdyb3VwQXR0cmlidXRlQmxvYi5kZWNvZGUoXG4gICAgICAgIGRlY3J5cHRHcm91cEJsb2IoXG4gICAgICAgICAgY2xpZW50WmtHcm91cENpcGhlcixcbiAgICAgICAgICBncm91cFN0YXRlLmRpc2FwcGVhcmluZ01lc3NhZ2VzVGltZXJcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBkZWNyeXB0R3JvdXBTdGF0ZS8ke2xvZ0lkfTogVW5hYmxlIHRvIGRlY3J5cHQgZGlzYXBwZWFyaW5nIG1lc3NhZ2UgdGltZXIuIENsZWFyaW5nIGl0LmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBhY2Nlc3NDb250cm9sXG4gIHtcbiAgICBjb25zdCB7IGFjY2Vzc0NvbnRyb2wgfSA9IGdyb3VwU3RhdGU7XG4gICAgc3RyaWN0QXNzZXJ0KGFjY2Vzc0NvbnRyb2wsICdObyBhY2Nlc3NDb250cm9sIGZpZWxkIGZvdW5kJyk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gZHJvcE51bGwoYWNjZXNzQ29udHJvbC5hdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBtZW1iZXJzID0gZHJvcE51bGwoYWNjZXNzQ29udHJvbC5tZW1iZXJzKTtcbiAgICBjb25zdCBhZGRGcm9tSW52aXRlTGluayA9IGRyb3BOdWxsKGFjY2Vzc0NvbnRyb2wuYWRkRnJvbUludml0ZUxpbmspO1xuXG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgaXNWYWxpZEFjY2VzcyhhdHRyaWJ1dGVzKSxcbiAgICAgIGBkZWNyeXB0R3JvdXBTdGF0ZTogQWNjZXNzIGNvbnRyb2wgZm9yIGF0dHJpYnV0ZXMgaXMgaW52YWxpZDogJHthdHRyaWJ1dGVzfWBcbiAgICApO1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGlzVmFsaWRBY2Nlc3MobWVtYmVycyksXG4gICAgICBgZGVjcnlwdEdyb3VwU3RhdGU6IEFjY2VzcyBjb250cm9sIGZvciBtZW1iZXJzIGlzIGludmFsaWQ6ICR7bWVtYmVyc31gXG4gICAgKTtcbiAgICBzdHJpY3RBc3NlcnQoXG4gICAgICBpc1ZhbGlkTGlua0FjY2VzcyhhZGRGcm9tSW52aXRlTGluayksXG4gICAgICBgZGVjcnlwdEdyb3VwU3RhdGU6IEFjY2VzcyBjb250cm9sIGZvciBpbnZpdGUgbGluayBpcyBpbnZhbGlkOiAke2FkZEZyb21JbnZpdGVMaW5rfWBcbiAgICApO1xuXG4gICAgcmVzdWx0LmFjY2Vzc0NvbnRyb2wgPSB7XG4gICAgICBhdHRyaWJ1dGVzLFxuICAgICAgbWVtYmVycyxcbiAgICAgIGFkZEZyb21JbnZpdGVMaW5rLFxuICAgIH07XG4gIH1cblxuICAvLyB2ZXJzaW9uXG4gIHN0cmljdEFzc2VydChcbiAgICBpc051bWJlcihncm91cFN0YXRlLnZlcnNpb24pLFxuICAgIGBkZWNyeXB0R3JvdXBTdGF0ZTogRXhwZWN0ZWQgdmVyc2lvbiB0byBiZSBhIG51bWJlcjsgaXQgd2FzICR7Z3JvdXBTdGF0ZS52ZXJzaW9ufWBcbiAgKTtcbiAgcmVzdWx0LnZlcnNpb24gPSBncm91cFN0YXRlLnZlcnNpb247XG5cbiAgLy8gbWVtYmVyc1xuICBpZiAoZ3JvdXBTdGF0ZS5tZW1iZXJzKSB7XG4gICAgcmVzdWx0Lm1lbWJlcnMgPSBjb21wYWN0KFxuICAgICAgZ3JvdXBTdGF0ZS5tZW1iZXJzLm1hcCgobWVtYmVyOiBQcm90by5JTWVtYmVyKSA9PlxuICAgICAgICBkZWNyeXB0TWVtYmVyKGNsaWVudFprR3JvdXBDaXBoZXIsIG1lbWJlciwgbG9nSWQpXG4gICAgICApXG4gICAgKTtcbiAgfVxuXG4gIC8vIG1lbWJlcnNQZW5kaW5nUHJvZmlsZUtleVxuICBpZiAoZ3JvdXBTdGF0ZS5tZW1iZXJzUGVuZGluZ1Byb2ZpbGVLZXkpIHtcbiAgICByZXN1bHQubWVtYmVyc1BlbmRpbmdQcm9maWxlS2V5ID0gY29tcGFjdChcbiAgICAgIGdyb3VwU3RhdGUubWVtYmVyc1BlbmRpbmdQcm9maWxlS2V5Lm1hcChcbiAgICAgICAgKG1lbWJlcjogUHJvdG8uSU1lbWJlclBlbmRpbmdQcm9maWxlS2V5KSA9PlxuICAgICAgICAgIGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleShjbGllbnRaa0dyb3VwQ2lwaGVyLCBtZW1iZXIsIGxvZ0lkKVxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBtZW1iZXJzUGVuZGluZ0FkbWluQXBwcm92YWxcbiAgaWYgKGdyb3VwU3RhdGUubWVtYmVyc1BlbmRpbmdBZG1pbkFwcHJvdmFsKSB7XG4gICAgcmVzdWx0Lm1lbWJlcnNQZW5kaW5nQWRtaW5BcHByb3ZhbCA9IGNvbXBhY3QoXG4gICAgICBncm91cFN0YXRlLm1lbWJlcnNQZW5kaW5nQWRtaW5BcHByb3ZhbC5tYXAoXG4gICAgICAgIChtZW1iZXI6IFByb3RvLklNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbCkgPT5cbiAgICAgICAgICBkZWNyeXB0TWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWwoY2xpZW50WmtHcm91cENpcGhlciwgbWVtYmVyLCBsb2dJZClcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgLy8gaW52aXRlTGlua1Bhc3N3b3JkXG4gIGlmIChCeXRlcy5pc05vdEVtcHR5KGdyb3VwU3RhdGUuaW52aXRlTGlua1Bhc3N3b3JkKSkge1xuICAgIHJlc3VsdC5pbnZpdGVMaW5rUGFzc3dvcmQgPSBCeXRlcy50b0Jhc2U2NChncm91cFN0YXRlLmludml0ZUxpbmtQYXNzd29yZCk7XG4gIH1cblxuICAvLyBkZXNjcmlwdGlvbkJ5dGVzXG4gIGlmIChCeXRlcy5pc05vdEVtcHR5KGdyb3VwU3RhdGUuZGVzY3JpcHRpb25CeXRlcykpIHtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0LmRlc2NyaXB0aW9uQnl0ZXMgPSBQcm90by5Hcm91cEF0dHJpYnV0ZUJsb2IuZGVjb2RlKFxuICAgICAgICBkZWNyeXB0R3JvdXBCbG9iKGNsaWVudFprR3JvdXBDaXBoZXIsIGdyb3VwU3RhdGUuZGVzY3JpcHRpb25CeXRlcylcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZGVjcnlwdEdyb3VwU3RhdGUvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IGRlc2NyaXB0aW9uQnl0ZXMuIENsZWFyaW5nIGl0LmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG4gIH1cblxuICAvLyBhbm5vdW5jZW1lbnRzT25seVxuICBjb25zdCB7IGFubm91bmNlbWVudHNPbmx5IH0gPSBncm91cFN0YXRlO1xuICByZXN1bHQuYW5ub3VuY2VtZW50c09ubHkgPSBCb29sZWFuKGFubm91bmNlbWVudHNPbmx5KTtcblxuICAvLyBtZW1iZXJzQmFubmVkXG4gIGNvbnN0IHsgbWVtYmVyc0Jhbm5lZCB9ID0gZ3JvdXBTdGF0ZTtcbiAgaWYgKG1lbWJlcnNCYW5uZWQgJiYgbWVtYmVyc0Jhbm5lZC5sZW5ndGggPiAwKSB7XG4gICAgcmVzdWx0Lm1lbWJlcnNCYW5uZWQgPSBtZW1iZXJzQmFubmVkXG4gICAgICAubWFwKGl0ZW0gPT4ge1xuICAgICAgICBpZiAoIWl0ZW0udXNlcklkKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgZGVjcnlwdEdyb3VwU3RhdGUvJHtsb2dJZH06IG1lbWJlcnNCYW5uZWQgaGFkIGEgYmxhbmsgZW50cnlgXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB1dWlkID0gbm9ybWFsaXplVXVpZChcbiAgICAgICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBpdGVtLnVzZXJJZCksXG4gICAgICAgICAgJ21lbWJlcnNCYW5uZWQuYWRkZWQudXNlcklkJ1xuICAgICAgICApO1xuICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBpdGVtLnRpbWVzdGFtcD8udG9OdW1iZXIoKSA/PyAwO1xuXG4gICAgICAgIHJldHVybiB7IHV1aWQsIHRpbWVzdGFtcCB9O1xuICAgICAgfSlcbiAgICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuICB9IGVsc2Uge1xuICAgIHJlc3VsdC5tZW1iZXJzQmFubmVkID0gW107XG4gIH1cblxuICByZXN1bHQuYXZhdGFyID0gZHJvcE51bGwoZ3JvdXBTdGF0ZS5hdmF0YXIpO1xuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbnR5cGUgRGVjcnlwdGVkTWVtYmVyID0gUmVhZG9ubHk8e1xuICB1c2VySWQ6IHN0cmluZztcbiAgcHJvZmlsZUtleTogVWludDhBcnJheTtcbiAgcm9sZTogUHJvdG8uTWVtYmVyLlJvbGU7XG4gIGpvaW5lZEF0VmVyc2lvbj86IG51bWJlcjtcbn0+O1xuXG5mdW5jdGlvbiBkZWNyeXB0TWVtYmVyKFxuICBjbGllbnRaa0dyb3VwQ2lwaGVyOiBDbGllbnRaa0dyb3VwQ2lwaGVyLFxuICBtZW1iZXI6IFJlYWRvbmx5PFByb3RvLklNZW1iZXI+LFxuICBsb2dJZDogc3RyaW5nXG4pOiBEZWNyeXB0ZWRNZW1iZXIgfCB1bmRlZmluZWQge1xuICAvLyB1c2VySWRcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIEJ5dGVzLmlzTm90RW1wdHkobWVtYmVyLnVzZXJJZCksXG4gICAgJ2RlY3J5cHRNZW1iZXI6IE1lbWJlciBoYWQgbWlzc2luZyB1c2VySWQnXG4gICk7XG5cbiAgbGV0IHVzZXJJZDogc3RyaW5nO1xuICB0cnkge1xuICAgIHVzZXJJZCA9IG5vcm1hbGl6ZVV1aWQoXG4gICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBtZW1iZXIudXNlcklkKSxcbiAgICAgICdkZWNyeXB0TWVtYmVyLnVzZXJJZCdcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGRlY3J5cHRNZW1iZXIvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IG1lbWJlciB1c2VyaWQuIERyb3BwaW5nIG1lbWJlci5gLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXVpZCh1c2VySWQpKSB7XG4gICAgbG9nLndhcm4oYGRlY3J5cHRNZW1iZXIvJHtsb2dJZH06IERyb3BwaW5nIG1lbWJlciBkdWUgdG8gaW52YWxpZCB1c2VySWRgKTtcblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBwcm9maWxlS2V5XG4gIHN0cmljdEFzc2VydChcbiAgICBCeXRlcy5pc05vdEVtcHR5KG1lbWJlci5wcm9maWxlS2V5KSxcbiAgICAnZGVjcnlwdE1lbWJlcjogTWVtYmVyIGhhZCBtaXNzaW5nIHByb2ZpbGVLZXknXG4gICk7XG4gIGNvbnN0IHByb2ZpbGVLZXkgPSBkZWNyeXB0UHJvZmlsZUtleShcbiAgICBjbGllbnRaa0dyb3VwQ2lwaGVyLFxuICAgIG1lbWJlci5wcm9maWxlS2V5LFxuICAgIFVVSUQuY2FzdCh1c2VySWQpXG4gICk7XG5cbiAgaWYgKCFpc1ZhbGlkUHJvZmlsZUtleShwcm9maWxlS2V5KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZGVjcnlwdE1lbWJlcjogTWVtYmVyIGhhZCBpbnZhbGlkIHByb2ZpbGVLZXknKTtcbiAgfVxuXG4gIC8vIHJvbGVcbiAgY29uc3Qgcm9sZSA9IGRyb3BOdWxsKG1lbWJlci5yb2xlKTtcblxuICBpZiAoIWlzVmFsaWRSb2xlKHJvbGUpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBkZWNyeXB0TWVtYmVyOiBNZW1iZXIgaGFkIGludmFsaWQgcm9sZSAke21lbWJlci5yb2xlfWApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB1c2VySWQsXG4gICAgcHJvZmlsZUtleSxcbiAgICByb2xlLFxuICAgIGpvaW5lZEF0VmVyc2lvbjogZHJvcE51bGwobWVtYmVyLmpvaW5lZEF0VmVyc2lvbiksXG4gIH07XG59XG5cbnR5cGUgRGVjcnlwdGVkTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkgPSB7XG4gIGFkZGVkQnlVc2VySWQ6IHN0cmluZztcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIG1lbWJlcjoge1xuICAgIHVzZXJJZDogc3RyaW5nO1xuICAgIHByb2ZpbGVLZXk/OiBVaW50OEFycmF5O1xuICAgIHJvbGU/OiBQcm90by5NZW1iZXIuUm9sZTtcbiAgfTtcbn07XG5cbmZ1bmN0aW9uIGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleShcbiAgY2xpZW50WmtHcm91cENpcGhlcjogQ2xpZW50WmtHcm91cENpcGhlcixcbiAgbWVtYmVyOiBSZWFkb25seTxQcm90by5JTWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXk+LFxuICBsb2dJZDogc3RyaW5nXG4pOiBEZWNyeXB0ZWRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleSB8IHVuZGVmaW5lZCB7XG4gIC8vIGFkZGVkQnlVc2VySWRcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIEJ5dGVzLmlzTm90RW1wdHkobWVtYmVyLmFkZGVkQnlVc2VySWQpLFxuICAgICdkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXk6IE1lbWJlciBoYWQgbWlzc2luZyBhZGRlZEJ5VXNlcklkJ1xuICApO1xuXG4gIGxldCBhZGRlZEJ5VXNlcklkOiBzdHJpbmc7XG4gIHRyeSB7XG4gICAgYWRkZWRCeVVzZXJJZCA9IG5vcm1hbGl6ZVV1aWQoXG4gICAgICBkZWNyeXB0VXVpZChjbGllbnRaa0dyb3VwQ2lwaGVyLCBtZW1iZXIuYWRkZWRCeVVzZXJJZCksXG4gICAgICAnZGVjcnlwdE1lbWJlclBlbmRpbmdQcm9maWxlS2V5LmFkZGVkQnlVc2VySWQnXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IHBlbmRpbmcgbWVtYmVyIGFkZGVkQnlVc2VySWQuIERyb3BwaW5nIG1lbWJlci5gLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXVpZChhZGRlZEJ5VXNlcklkKSkge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleS8ke2xvZ0lkfTogRHJvcHBpbmcgcGVuZGluZyBtZW1iZXIgZHVlIHRvIGludmFsaWQgYWRkZWRCeVVzZXJJZGBcbiAgICApO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyB0aW1lc3RhbXBcbiAgY29uc3QgdGltZXN0YW1wID0gbm9ybWFsaXplVGltZXN0YW1wKG1lbWJlci50aW1lc3RhbXApO1xuXG4gIGlmICghbWVtYmVyLm1lbWJlcikge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleS8ke2xvZ0lkfTogRHJvcHBpbmcgcGVuZGluZyBtZW1iZXIgZHVlIHRvIG1pc3NpbmcgbWVtYmVyIGRldGFpbHNgXG4gICAgKTtcblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCB7IHVzZXJJZCwgcHJvZmlsZUtleSB9ID0gbWVtYmVyLm1lbWJlcjtcblxuICAvLyB1c2VySWRcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIEJ5dGVzLmlzTm90RW1wdHkodXNlcklkKSxcbiAgICAnZGVjcnlwdE1lbWJlclBlbmRpbmdQcm9maWxlS2V5OiBNZW1iZXIgaGFkIG1pc3NpbmcgbWVtYmVyLnVzZXJJZCdcbiAgKTtcblxuICBsZXQgZGVjcnlwdGVkVXNlcklkOiBzdHJpbmc7XG4gIHRyeSB7XG4gICAgZGVjcnlwdGVkVXNlcklkID0gbm9ybWFsaXplVXVpZChcbiAgICAgIGRlY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIHVzZXJJZCksXG4gICAgICAnZGVjcnlwdE1lbWJlclBlbmRpbmdQcm9maWxlS2V5Lm1lbWJlci51c2VySWQnXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkvJHtsb2dJZH06IFVuYWJsZSB0byBkZWNyeXB0IHBlbmRpbmcgbWVtYmVyIHVzZXJJZC4gRHJvcHBpbmcgbWVtYmVyLmAsXG4gICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICApO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAoIWlzVmFsaWRVdWlkKGRlY3J5cHRlZFVzZXJJZCkpIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkvJHtsb2dJZH06IERyb3BwaW5nIHBlbmRpbmcgbWVtYmVyIGR1ZSB0byBpbnZhbGlkIG1lbWJlci51c2VySWRgXG4gICAgKTtcblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICAvLyBwcm9maWxlS2V5XG4gIGxldCBkZWNyeXB0ZWRQcm9maWxlS2V5OiBVaW50OEFycmF5IHwgdW5kZWZpbmVkO1xuICBpZiAoQnl0ZXMuaXNOb3RFbXB0eShwcm9maWxlS2V5KSkge1xuICAgIHRyeSB7XG4gICAgICBkZWNyeXB0ZWRQcm9maWxlS2V5ID0gZGVjcnlwdFByb2ZpbGVLZXkoXG4gICAgICAgIGNsaWVudFprR3JvdXBDaXBoZXIsXG4gICAgICAgIHByb2ZpbGVLZXksXG4gICAgICAgIFVVSUQuY2FzdChkZWNyeXB0ZWRVc2VySWQpXG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleS8ke2xvZ0lkfTogVW5hYmxlIHRvIGRlY3J5cHQgcGVuZGluZyBtZW1iZXIgcHJvZmlsZUtleS4gRHJvcHBpbmcgcHJvZmlsZUtleS5gLFxuICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1ZhbGlkUHJvZmlsZUtleShkZWNyeXB0ZWRQcm9maWxlS2V5KSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBkZWNyeXB0TWVtYmVyUGVuZGluZ1Byb2ZpbGVLZXkvJHtsb2dJZH06IERyb3BwaW5nIHByb2ZpbGVLZXksIHNpbmNlIGl0IHdhcyBpbnZhbGlkYFxuICAgICAgKTtcbiAgICAgIGRlY3J5cHRlZFByb2ZpbGVLZXkgPSB1bmRlZmluZWQ7XG4gICAgfVxuICB9XG5cbiAgLy8gcm9sZVxuICBjb25zdCByb2xlID0gZHJvcE51bGwobWVtYmVyLm1lbWJlci5yb2xlKTtcblxuICBzdHJpY3RBc3NlcnQoXG4gICAgaXNWYWxpZFJvbGUocm9sZSksXG4gICAgYGRlY3J5cHRNZW1iZXJQZW5kaW5nUHJvZmlsZUtleTogTWVtYmVyIGhhZCBpbnZhbGlkIHJvbGUgJHtyb2xlfWBcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGFkZGVkQnlVc2VySWQsXG4gICAgdGltZXN0YW1wLFxuICAgIG1lbWJlcjoge1xuICAgICAgdXNlcklkOiBkZWNyeXB0ZWRVc2VySWQsXG4gICAgICBwcm9maWxlS2V5OiBkZWNyeXB0ZWRQcm9maWxlS2V5LFxuICAgICAgcm9sZSxcbiAgICB9LFxuICB9O1xufVxuXG50eXBlIERlY3J5cHRlZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsID0ge1xuICB1c2VySWQ6IHN0cmluZztcbiAgcHJvZmlsZUtleT86IFVpbnQ4QXJyYXk7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufTtcblxuZnVuY3Rpb24gZGVjcnlwdE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsKFxuICBjbGllbnRaa0dyb3VwQ2lwaGVyOiBDbGllbnRaa0dyb3VwQ2lwaGVyLFxuICBtZW1iZXI6IFJlYWRvbmx5PFByb3RvLklNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbD4sXG4gIGxvZ0lkOiBzdHJpbmdcbik6IERlY3J5cHRlZE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsIHwgdW5kZWZpbmVkIHtcbiAgLy8gdGltZXN0YW1wXG4gIGNvbnN0IHRpbWVzdGFtcCA9IG5vcm1hbGl6ZVRpbWVzdGFtcChtZW1iZXIudGltZXN0YW1wKTtcblxuICBjb25zdCB7IHVzZXJJZCwgcHJvZmlsZUtleSB9ID0gbWVtYmVyO1xuXG4gIC8vIHVzZXJJZFxuICBzdHJpY3RBc3NlcnQoXG4gICAgQnl0ZXMuaXNOb3RFbXB0eSh1c2VySWQpLFxuICAgICdkZWNyeXB0TWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWw6IE1pc3NpbmcgdXNlcklkJ1xuICApO1xuXG4gIGxldCBkZWNyeXB0ZWRVc2VySWQ6IHN0cmluZztcbiAgdHJ5IHtcbiAgICBkZWNyeXB0ZWRVc2VySWQgPSBub3JtYWxpemVVdWlkKFxuICAgICAgZGVjcnlwdFV1aWQoY2xpZW50WmtHcm91cENpcGhlciwgdXNlcklkKSxcbiAgICAgICdkZWNyeXB0TWVtYmVyUGVuZGluZ0FkbWluQXBwcm92YWwudXNlcklkJ1xuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgZGVjcnlwdE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBwZW5kaW5nIG1lbWJlciB1c2VySWQuIERyb3BwaW5nIG1lbWJlci5gLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKCFpc1ZhbGlkVXVpZChkZWNyeXB0ZWRVc2VySWQpKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgZGVjcnlwdE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsLyR7bG9nSWR9OiBJbnZhbGlkIHVzZXJJZC4gRHJvcHBpbmcgbWVtYmVyLmBcbiAgICApO1xuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIC8vIHByb2ZpbGVLZXlcbiAgbGV0IGRlY3J5cHRlZFByb2ZpbGVLZXk6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ7XG4gIGlmIChCeXRlcy5pc05vdEVtcHR5KHByb2ZpbGVLZXkpKSB7XG4gICAgdHJ5IHtcbiAgICAgIGRlY3J5cHRlZFByb2ZpbGVLZXkgPSBkZWNyeXB0UHJvZmlsZUtleShcbiAgICAgICAgY2xpZW50WmtHcm91cENpcGhlcixcbiAgICAgICAgcHJvZmlsZUtleSxcbiAgICAgICAgVVVJRC5jYXN0KGRlY3J5cHRlZFVzZXJJZClcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZGVjcnlwdE1lbWJlclBlbmRpbmdBZG1pbkFwcHJvdmFsLyR7bG9nSWR9OiBVbmFibGUgdG8gZGVjcnlwdCBwcm9maWxlS2V5LiBEcm9wcGluZyBwcm9maWxlS2V5LmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWlzVmFsaWRQcm9maWxlS2V5KGRlY3J5cHRlZFByb2ZpbGVLZXkpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYGRlY3J5cHRNZW1iZXJQZW5kaW5nQWRtaW5BcHByb3ZhbC8ke2xvZ0lkfTogRHJvcHBpbmcgcHJvZmlsZUtleSwgc2luY2UgaXQgd2FzIGludmFsaWRgXG4gICAgICApO1xuXG4gICAgICBkZWNyeXB0ZWRQcm9maWxlS2V5ID0gdW5kZWZpbmVkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiB7XG4gICAgdGltZXN0YW1wLFxuICAgIHVzZXJJZDogZGVjcnlwdGVkVXNlcklkLFxuICAgIHByb2ZpbGVLZXk6IGRlY3J5cHRlZFByb2ZpbGVLZXksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZW1iZXJzaGlwTGlzdChcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogQXJyYXk8eyB1dWlkOiBVVUlEU3RyaW5nVHlwZTsgdXVpZENpcGhlcnRleHQ6IFVpbnQ4QXJyYXkgfT4ge1xuICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0TWVtYmVyc2hpcExpc3Q6IGNhbm5vdCBmaW5kIGNvbnZlcnNhdGlvbicpO1xuICB9XG5cbiAgY29uc3Qgc2VjcmV0UGFyYW1zID0gY29udmVyc2F0aW9uLmdldCgnc2VjcmV0UGFyYW1zJyk7XG4gIGlmICghc2VjcmV0UGFyYW1zKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRNZW1iZXJzaGlwTGlzdDogbm8gc2VjcmV0UGFyYW1zJyk7XG4gIH1cblxuICBjb25zdCBjbGllbnRaa0dyb3VwQ2lwaGVyID0gZ2V0Q2xpZW50WmtHcm91cENpcGhlcihzZWNyZXRQYXJhbXMpO1xuXG4gIHJldHVybiBjb252ZXJzYXRpb24uZ2V0TWVtYmVycygpLm1hcChtZW1iZXIgPT4ge1xuICAgIGNvbnN0IHV1aWQgPSBtZW1iZXIuZ2V0KCd1dWlkJyk7XG4gICAgaWYgKCF1dWlkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldE1lbWJlcnNoaXBMaXN0OiBtZW1iZXIgaGFzIG5vIFVVSUQnKTtcbiAgICB9XG5cbiAgICBjb25zdCB1dWlkQ2lwaGVydGV4dCA9IGVuY3J5cHRVdWlkKGNsaWVudFprR3JvdXBDaXBoZXIsIHV1aWQpO1xuICAgIHJldHVybiB7IHV1aWQsIHV1aWRDaXBo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
