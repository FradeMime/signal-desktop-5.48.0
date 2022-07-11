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
var message_exports = {};
__export(message_exports, {
  canDeleteForEveryone: () => canDeleteForEveryone,
  canDownload: () => canDownload,
  canReact: () => canReact,
  canReply: () => canReply,
  canRetryDeleteForEveryone: () => canRetryDeleteForEveryone,
  getAttachmentsForMessage: () => getAttachmentsForMessage,
  getBubblePropsForMessage: () => getBubblePropsForMessage,
  getContact: () => getContact,
  getContactId: () => getContactId,
  getConversation: () => getConversation,
  getLastChallengeError: () => getLastChallengeError,
  getMessagePropStatus: () => getMessagePropStatus,
  getPreviewsForMessage: () => getPreviewsForMessage,
  getPropsForAttachment: () => getPropsForAttachment,
  getPropsForBubble: () => getPropsForBubble,
  getPropsForCallHistory: () => getPropsForCallHistory,
  getPropsForEmbeddedContact: () => getPropsForEmbeddedContact,
  getPropsForMessage: () => getPropsForMessage,
  getPropsForQuote: () => getPropsForQuote,
  getPropsForStoryReplyContext: () => getPropsForStoryReplyContext,
  getReactionsForMessage: () => getReactionsForMessage,
  getSource: () => getSource,
  getSourceDevice: () => getSourceDevice,
  getSourceUuid: () => getSourceUuid,
  hasErrors: () => hasErrors,
  isCallHistory: () => isCallHistory,
  isChangeNumberNotification: () => isChangeNumberNotification,
  isChatSessionRefreshed: () => isChatSessionRefreshed,
  isDeliveryIssue: () => isDeliveryIssue,
  isEndSession: () => isEndSession,
  isExpirationTimerUpdate: () => isExpirationTimerUpdate,
  isGiftBadge: () => isGiftBadge,
  isGroupUpdate: () => isGroupUpdate,
  isGroupV1Migration: () => isGroupV1Migration,
  isGroupV2Change: () => isGroupV2Change,
  isIncoming: () => isIncoming,
  isKeyChange: () => isKeyChange,
  isOutgoing: () => isOutgoing,
  isProfileChange: () => isProfileChange,
  isStory: () => isStory,
  isTapToView: () => isTapToView,
  isUniversalTimerNotification: () => isUniversalTimerNotification,
  isUnsupportedMessage: () => isUnsupportedMessage,
  isVerifiedChange: () => isVerifiedChange,
  processBodyRanges: () => processBodyRanges
});
module.exports = __toCommonJS(message_exports);
var import_lodash = require("lodash");
var import_reselect = require("reselect");
var import_filesize = __toESM(require("filesize"));
var import_direction = __toESM(require("direction"));
var import_Message = require("../../components/conversation/Message");
var import_LinkPreview = require("../../types/LinkPreview");
var import_EmbeddedContact = require("../../types/EmbeddedContact");
var import_Calling = require("../../types/Calling");
var import_protobuf = require("../../protobuf");
var import_Attachment = require("../../types/Attachment");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_memoizeByRoot = require("../../util/memoizeByRoot");
var import_missingCaseError = require("../../util/missingCaseError");
var import_isNotNil = require("../../util/isNotNil");
var import_timestamp = require("../../util/timestamp");
var iterables = __toESM(require("../../util/iterables"));
var import_assert = require("../../util/assert");
var import_conversations = require("./conversations");
var import_MessageSendState = require("../../messages/MessageSendState");
var log = __toESM(require("../../logging/log"));
var import_getConversationColorAttributes = require("../../util/getConversationColorAttributes");
var import_durations = require("../../util/durations");
var import_getStoryReplyText = require("../../util/getStoryReplyText");
const THREE_HOURS = 3 * import_durations.HOUR;
function isIncoming(message) {
  return message.type === "incoming";
}
function isOutgoing(message) {
  return message.type === "outgoing";
}
function isStory(message) {
  return message.type === "story";
}
function hasErrors(message) {
  return message.errors ? message.errors.length > 0 : false;
}
function getSource(message, ourNumber) {
  if (isIncoming(message)) {
    return message.source;
  }
  if (!isOutgoing(message)) {
    log.warn("message.getSource: Called for non-incoming/non-outoing message");
  }
  return ourNumber;
}
function getSourceDevice(message, ourDeviceId) {
  const { sourceDevice } = message;
  if (isIncoming(message)) {
    return sourceDevice;
  }
  if (!isOutgoing(message)) {
    log.warn("message.getSourceDevice: Called for non-incoming/non-outoing message");
  }
  return sourceDevice || ourDeviceId;
}
function getSourceUuid(message, ourUuid) {
  if (isIncoming(message)) {
    return message.sourceUuid;
  }
  if (!isOutgoing(message)) {
    log.warn("message.getSourceUuid: Called for non-incoming/non-outoing message");
  }
  return ourUuid;
}
function getContactId(message, {
  conversationSelector,
  ourConversationId,
  ourNumber,
  ourUuid
}) {
  const source = getSource(message, ourNumber);
  const sourceUuid = getSourceUuid(message, ourUuid);
  if (!source && !sourceUuid) {
    return ourConversationId;
  }
  const conversation = conversationSelector(sourceUuid || source);
  return conversation.id;
}
function getContact(message, {
  conversationSelector,
  ourConversationId,
  ourNumber,
  ourUuid
}) {
  const source = getSource(message, ourNumber);
  const sourceUuid = getSourceUuid(message, ourUuid);
  if (!source && !sourceUuid) {
    return conversationSelector(ourConversationId);
  }
  return conversationSelector(sourceUuid || source);
}
function getConversation(message, conversationSelector) {
  return conversationSelector(message.conversationId);
}
const getAttachmentsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot)(import_lodash.identity, ({ sticker }) => sticker, ({ attachments }) => attachments, (_, sticker, attachments = []) => {
  if (sticker && sticker.data) {
    const { data } = sticker;
    if (!data.blurHash && (data.pending || !data.path)) {
      return [];
    }
    return [
      {
        ...data,
        pending: false,
        url: data.path ? window.Signal.Migrations.getAbsoluteAttachmentPath(data.path) : void 0
      }
    ];
  }
  return attachments.filter((attachment) => !attachment.error || (0, import_Attachment.canBeDownloaded)(attachment)).map((attachment) => getPropsForAttachment(attachment)).filter(import_isNotNil.isNotNil);
});
const processBodyRanges = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, ({ bodyRanges }, { conversationSelector }) => {
  if (!bodyRanges) {
    return void 0;
  }
  return bodyRanges.filter((range) => range.mentionUuid).map((range) => {
    const conversation = conversationSelector(range.mentionUuid);
    return {
      ...range,
      conversationID: conversation.id,
      replacementText: conversation.title
    };
  }).sort((a, b) => b.start - a.start);
}, (_, ranges) => ranges);
const getAuthorForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot)(import_lodash.identity, getContact, (_, convo) => {
  const {
    acceptedMessageRequest,
    avatarPath,
    badges,
    color,
    id,
    isMe,
    name,
    phoneNumber,
    profileName,
    sharedGroupNames,
    title,
    unblurredAvatarPath
  } = convo;
  const unsafe = {
    acceptedMessageRequest,
    avatarPath,
    badges,
    color,
    id,
    isMe,
    name,
    phoneNumber,
    profileName,
    sharedGroupNames,
    title,
    unblurredAvatarPath
  };
  const safe = unsafe;
  return safe;
});
const getCachedAuthorForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, getAuthorForMessage, (_, author) => author);
const getPreviewsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot)(import_lodash.identity, ({ preview }) => preview, (_, previews = []) => {
  return previews.map((preview) => ({
    ...preview,
    isStickerPack: (0, import_LinkPreview.isStickerPack)(preview.url),
    domain: (0, import_LinkPreview.getDomain)(preview.url),
    image: preview.image ? getPropsForAttachment(preview.image) : void 0
  }));
});
const getReactionsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, ({ reactions = [] }, { conversationSelector }) => {
  const reactionBySender = /* @__PURE__ */ new Map();
  for (const reaction of reactions) {
    const existingReaction = reactionBySender.get(reaction.fromId);
    if (!existingReaction || reaction.timestamp > existingReaction.timestamp) {
      reactionBySender.set(reaction.fromId, reaction);
    }
  }
  const reactionsWithEmpties = reactionBySender.values();
  const reactionsWithEmoji = iterables.filter(reactionsWithEmpties, (re) => re.emoji);
  const formattedReactions = iterables.map(reactionsWithEmoji, (re) => {
    const c = conversationSelector(re.fromId);
    const unsafe = (0, import_lodash.pick)(c, [
      "acceptedMessageRequest",
      "avatarPath",
      "badges",
      "color",
      "id",
      "isMe",
      "name",
      "phoneNumber",
      "profileName",
      "sharedGroupNames",
      "title"
    ]);
    const from = unsafe;
    (0, import_assert.strictAssert)(re.emoji, "Expected all reactions to have an emoji");
    return {
      emoji: re.emoji,
      timestamp: re.timestamp,
      from
    };
  });
  return [...formattedReactions];
}, (_, reactions) => reactions);
const getPropsForStoryReplyContext = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, (message, {
  conversationSelector,
  ourConversationId
}) => {
  const { storyReactionEmoji, storyReplyContext } = message;
  if (!storyReplyContext) {
    return void 0;
  }
  const contact = conversationSelector(storyReplyContext.authorUuid);
  const authorTitle = contact.firstName || contact.title;
  const isFromMe = contact.id === ourConversationId;
  const conversation = getConversation(message, conversationSelector);
  const { conversationColor, customColor } = (0, import_getConversationColorAttributes.getConversationColorAttributes)(conversation);
  return {
    authorTitle,
    conversationColor,
    customColor,
    emoji: storyReactionEmoji,
    isFromMe,
    rawAttachment: storyReplyContext.attachment ? processQuoteAttachment(storyReplyContext.attachment) : void 0,
    referencedMessageNotFound: !storyReplyContext.messageId,
    text: (0, import_getStoryReplyText.getStoryReplyText)(window.i18n, storyReplyContext.attachment)
  };
}, (_, storyReplyContext) => storyReplyContext);
const getPropsForQuote = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, (message, {
  conversationSelector,
  ourConversationId
}) => {
  const { quote } = message;
  if (!quote) {
    return void 0;
  }
  const {
    author,
    authorUuid,
    id: sentAt,
    isViewOnce,
    isGiftBadge: isTargetGiftBadge,
    referencedMessageNotFound,
    text = ""
  } = quote;
  const contact = conversationSelector(authorUuid || author);
  const authorId = contact.id;
  const authorName = contact.name;
  const authorPhoneNumber = contact.phoneNumber;
  const authorProfileName = contact.profileName;
  const authorTitle = contact.title;
  const isFromMe = authorId === ourConversationId;
  const firstAttachment = quote.attachments && quote.attachments[0];
  const conversation = getConversation(message, conversationSelector);
  const { conversationColor, customColor } = (0, import_getConversationColorAttributes.getConversationColorAttributes)(conversation);
  return {
    authorId,
    authorName,
    authorPhoneNumber,
    authorProfileName,
    authorTitle,
    bodyRanges: processBodyRanges(quote, { conversationSelector }),
    conversationColor,
    customColor,
    isFromMe,
    rawAttachment: firstAttachment ? processQuoteAttachment(firstAttachment) : void 0,
    isGiftBadge: Boolean(isTargetGiftBadge),
    isViewOnce,
    referencedMessageNotFound,
    sentAt: Number(sentAt),
    text
  };
}, (_, quote) => quote);
const getShallowPropsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot, import_lodash.isEqual)(import_lodash.identity, (message, {
  accountSelector,
  conversationSelector,
  ourConversationId,
  ourNumber,
  ourUuid,
  regionCode,
  selectedMessageId,
  selectedMessageCounter,
  contactNameColorSelector
}) => {
  const { expireTimer, expirationStartTimestamp, conversationId } = message;
  const expirationLength = expireTimer ? expireTimer * 1e3 : void 0;
  const expirationTimestamp = expirationStartTimestamp && expirationLength ? expirationStartTimestamp + expirationLength : void 0;
  const conversation = getConversation(message, conversationSelector);
  const isGroup = conversation.type === "group";
  const { sticker } = message;
  const isMessageTapToView = isTapToView(message);
  const isSelected = message.id === selectedMessageId;
  const selectedReaction = ((message.reactions || []).find((re) => re.fromId === ourConversationId) || {}).emoji;
  const authorId = getContactId(message, {
    conversationSelector,
    ourConversationId,
    ourNumber,
    ourUuid
  });
  const contactNameColor = contactNameColorSelector(conversationId, authorId);
  const { conversationColor, customColor } = (0, import_getConversationColorAttributes.getConversationColorAttributes)(conversation);
  return {
    canDeleteForEveryone: canDeleteForEveryone(message),
    canDownload: canDownload(message, conversationSelector),
    canReact: canReact(message, ourConversationId, conversationSelector),
    canReply: canReply(message, ourConversationId, conversationSelector),
    canRetry: hasErrors(message),
    canRetryDeleteForEveryone: canRetryDeleteForEveryone(message),
    contact: getPropsForEmbeddedContact(message, regionCode, accountSelector),
    contactNameColor,
    conversationColor,
    conversationId,
    conversationTitle: conversation.title,
    conversationType: isGroup ? "group" : "direct",
    customColor,
    deletedForEveryone: message.deletedForEveryone || false,
    direction: isIncoming(message) ? "incoming" : "outgoing",
    displayLimit: message.displayLimit,
    expirationLength,
    expirationTimestamp,
    giftBadge: message.giftBadge,
    id: message.id,
    isBlocked: conversation.isBlocked || false,
    isMessageRequestAccepted: conversation?.acceptedMessageRequest ?? true,
    isSelected,
    isSelectedCounter: isSelected ? selectedMessageCounter : void 0,
    isSticker: Boolean(sticker),
    isTapToView: isMessageTapToView,
    isTapToViewError: isMessageTapToView && isIncoming(message) && message.isTapToViewInvalid,
    isTapToViewExpired: isMessageTapToView && message.isErased,
    readStatus: message.readStatus ?? import_MessageReadStatus.ReadStatus.Read,
    selectedReaction,
    status: getMessagePropStatus(message, ourConversationId),
    text: message.body,
    textDirection: getTextDirection(message.body),
    timestamp: message.sent_at
  };
}, (_, props) => props);
function getTextAttachment(message) {
  return message.bodyAttachment && getPropsForAttachment(message.bodyAttachment);
}
function getTextDirection(body) {
  if (!body) {
    return import_Message.TextDirection.None;
  }
  const direction = (0, import_direction.default)(body);
  switch (direction) {
    case "ltr":
      return import_Message.TextDirection.LeftToRight;
    case "rtl":
      return import_Message.TextDirection.RightToLeft;
    case "neutral":
      return import_Message.TextDirection.Default;
    default: {
      const unexpected = direction;
      log.warn(`getTextDirection: unexpected direction ${unexpected}`);
      return import_Message.TextDirection.None;
    }
  }
}
const getPropsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot)(import_lodash.identity, getAttachmentsForMessage, processBodyRanges, getCachedAuthorForMessage, getPreviewsForMessage, getReactionsForMessage, getPropsForQuote, getPropsForStoryReplyContext, getTextAttachment, getShallowPropsForMessage, (_, attachments, bodyRanges, author, previews, reactions, quote, storyReplyContext, textAttachment, shallowProps) => {
  return {
    attachments,
    author,
    bodyRanges,
    previews,
    quote,
    reactions,
    storyReplyContext,
    textAttachment,
    ...shallowProps
  };
});
const getBubblePropsForMessage = (0, import_reselect.createSelectorCreator)(import_memoizeByRoot.memoizeByRoot)(import_lodash.identity, getPropsForMessage, (_, data) => ({
  type: "message",
  data,
  timestamp: data.timestamp
}));
function getPropsForBubble(message, options) {
  const { received_at_ms: receivedAt, timestamp: messageTimestamp } = message;
  const timestamp = receivedAt || messageTimestamp;
  if (isUnsupportedMessage(message)) {
    return {
      type: "unsupportedMessage",
      data: getPropsForUnsupportedMessage(message, options),
      timestamp
    };
  }
  if (isGroupV2Change(message)) {
    return {
      type: "groupV2Change",
      data: getPropsForGroupV2Change(message, options),
      timestamp
    };
  }
  if (isGroupV1Migration(message)) {
    return {
      type: "groupV1Migration",
      data: getPropsForGroupV1Migration(message, options),
      timestamp
    };
  }
  if (isExpirationTimerUpdate(message)) {
    return {
      type: "timerNotification",
      data: getPropsForTimerNotification(message, options),
      timestamp
    };
  }
  if (isKeyChange(message)) {
    return {
      type: "safetyNumberNotification",
      data: getPropsForSafetyNumberNotification(message, options),
      timestamp
    };
  }
  if (isVerifiedChange(message)) {
    return {
      type: "verificationNotification",
      data: getPropsForVerificationNotification(message, options),
      timestamp
    };
  }
  if (isGroupUpdate(message)) {
    return {
      type: "groupNotification",
      data: getPropsForGroupNotification(message, options),
      timestamp
    };
  }
  if (isEndSession(message)) {
    return {
      type: "resetSessionNotification",
      data: null,
      timestamp
    };
  }
  if (isCallHistory(message)) {
    return {
      type: "callHistory",
      data: getPropsForCallHistory(message, options),
      timestamp
    };
  }
  if (isProfileChange(message)) {
    return {
      type: "profileChange",
      data: getPropsForProfileChange(message, options),
      timestamp
    };
  }
  if (isUniversalTimerNotification(message)) {
    return {
      type: "universalTimerNotification",
      data: null,
      timestamp
    };
  }
  if (isChangeNumberNotification(message)) {
    return {
      type: "changeNumberNotification",
      data: getPropsForChangeNumberNotification(message, options),
      timestamp
    };
  }
  if (isChatSessionRefreshed(message)) {
    return {
      type: "chatSessionRefreshed",
      data: null,
      timestamp
    };
  }
  if (isDeliveryIssue(message)) {
    return {
      type: "deliveryIssue",
      data: getPropsForDeliveryIssue(message, options),
      timestamp
    };
  }
  return getBubblePropsForMessage(message, options);
}
function isUnsupportedMessage(message) {
  const versionAtReceive = message.supportedVersionAtReceive;
  const requiredVersion = message.requiredProtocolVersion;
  return (0, import_lodash.isNumber)(versionAtReceive) && (0, import_lodash.isNumber)(requiredVersion) && versionAtReceive < requiredVersion;
}
function getPropsForUnsupportedMessage(message, options) {
  const CURRENT_PROTOCOL_VERSION = import_protobuf.SignalService.DataMessage.ProtocolVersion.CURRENT;
  const requiredVersion = message.requiredProtocolVersion;
  const canProcessNow = Boolean(CURRENT_PROTOCOL_VERSION && requiredVersion && CURRENT_PROTOCOL_VERSION >= requiredVersion);
  return {
    canProcessNow,
    contact: getContact(message, options)
  };
}
function isGroupV2Change(message) {
  return Boolean(message.groupV2Change);
}
function getPropsForGroupV2Change(message, { conversationSelector, ourUuid }) {
  const change = message.groupV2Change;
  if (!change) {
    throw new Error("getPropsForGroupV2Change: Change is missing!");
  }
  const conversation = getConversation(message, conversationSelector);
  return {
    areWeAdmin: Boolean(conversation.areWeAdmin),
    groupName: conversation?.type === "group" ? conversation?.name : void 0,
    groupMemberships: conversation.memberships,
    groupBannedMemberships: conversation.bannedMemberships,
    ourUuid,
    change
  };
}
function isGroupV1Migration(message) {
  return message.type === "group-v1-migration";
}
function getPropsForGroupV1Migration(message, { conversationSelector }) {
  const migration = message.groupMigration;
  if (!migration) {
    const invitedGV2Members = message.invitedGV2Members || [];
    const droppedGV2MemberIds = message.droppedGV2MemberIds || [];
    const invitedMembers2 = invitedGV2Members.map((item) => conversationSelector(item.uuid));
    const droppedMembers2 = droppedGV2MemberIds.map((conversationId) => conversationSelector(conversationId));
    return {
      areWeInvited: false,
      droppedMembers: droppedMembers2,
      invitedMembers: invitedMembers2
    };
  }
  const {
    areWeInvited,
    droppedMemberIds,
    invitedMembers: rawInvitedMembers
  } = migration;
  const invitedMembers = rawInvitedMembers.map((item) => conversationSelector(item.uuid));
  const droppedMembers = droppedMemberIds.map((conversationId) => conversationSelector(conversationId));
  return {
    areWeInvited,
    droppedMembers,
    invitedMembers
  };
}
function isExpirationTimerUpdate(message) {
  const flag = import_protobuf.SignalService.DataMessage.Flags.EXPIRATION_TIMER_UPDATE;
  return Boolean(message.flags && message.flags & flag);
}
function getPropsForTimerNotification(message, { ourConversationId, conversationSelector }) {
  const timerUpdate = message.expirationTimerUpdate;
  if (!timerUpdate) {
    throw new Error("getPropsForTimerNotification: missing expirationTimerUpdate!");
  }
  const { expireTimer, fromSync, source, sourceUuid } = timerUpdate;
  const disabled = !expireTimer;
  const sourceId = sourceUuid || source;
  const formattedContact = conversationSelector(sourceId);
  const basicProps = {
    ...formattedContact,
    disabled,
    expireTimer,
    type: "fromOther"
  };
  if (fromSync) {
    return {
      ...basicProps,
      type: "fromSync"
    };
  }
  if (formattedContact.id === ourConversationId) {
    return {
      ...basicProps,
      type: "fromMe"
    };
  }
  if (!sourceId) {
    return {
      ...basicProps,
      type: "fromMember"
    };
  }
  return basicProps;
}
function isKeyChange(message) {
  return message.type === "keychange";
}
function getPropsForSafetyNumberNotification(message, { conversationSelector }) {
  const conversation = getConversation(message, conversationSelector);
  const isGroup = conversation?.type === "group";
  const identifier = message.key_changed;
  const contact = conversationSelector(identifier);
  return {
    isGroup,
    contact
  };
}
function isVerifiedChange(message) {
  return message.type === "verified-change";
}
function getPropsForVerificationNotification(message, { conversationSelector }) {
  const type = message.verified ? "markVerified" : "markNotVerified";
  const isLocal = message.local || false;
  const identifier = message.verifiedChanged;
  return {
    type,
    isLocal,
    contact: conversationSelector(identifier)
  };
}
function isGiftBadge(message) {
  return Boolean(message.giftBadge);
}
function isGroupUpdate(message) {
  return Boolean(message.group_update);
}
function getPropsForGroupNotification(message, options) {
  const groupUpdate = message.group_update;
  if (!groupUpdate) {
    throw new Error("getPropsForGroupNotification: Message missing group_update");
  }
  const { conversationSelector } = options;
  const changes = [];
  if (!groupUpdate.avatarUpdated && !groupUpdate.left && !groupUpdate.joined && !groupUpdate.name) {
    changes.push({
      type: "general"
    });
  }
  if (groupUpdate.joined?.length) {
    changes.push({
      type: "add",
      contacts: (0, import_lodash.map)(Array.isArray(groupUpdate.joined) ? groupUpdate.joined : [groupUpdate.joined], (identifier) => conversationSelector(identifier))
    });
  }
  if (groupUpdate.left === "You") {
    changes.push({
      type: "remove"
    });
  } else if (groupUpdate.left) {
    changes.push({
      type: "remove",
      contacts: (0, import_lodash.map)(Array.isArray(groupUpdate.left) ? groupUpdate.left : [groupUpdate.left], (identifier) => conversationSelector(identifier))
    });
  }
  if (groupUpdate.name) {
    changes.push({
      type: "name",
      newName: groupUpdate.name
    });
  }
  if (groupUpdate.avatarUpdated) {
    changes.push({
      type: "avatar"
    });
  }
  const from = getContact(message, options);
  return {
    from,
    changes
  };
}
function isEndSession(message) {
  const flag = import_protobuf.SignalService.DataMessage.Flags.END_SESSION;
  return Boolean(message.flags && message.flags & flag);
}
function isCallHistory(message) {
  return message.type === "call-history";
}
function getPropsForCallHistory(message, {
  conversationSelector,
  callSelector,
  activeCall
}) {
  const { callHistoryDetails } = message;
  if (!callHistoryDetails) {
    throw new Error("getPropsForCallHistory: Missing callHistoryDetails");
  }
  const activeCallConversationId = activeCall?.conversationId;
  switch (callHistoryDetails.callMode) {
    case void 0:
    case import_Calling.CallMode.Direct:
      return {
        ...callHistoryDetails,
        activeCallConversationId,
        callMode: import_Calling.CallMode.Direct
      };
    case import_Calling.CallMode.Group: {
      const { conversationId } = message;
      if (!conversationId) {
        throw new Error("getPropsForCallHistory: missing conversation ID");
      }
      let call = callSelector(conversationId);
      if (call && call.callMode !== import_Calling.CallMode.Group) {
        log.error("getPropsForCallHistory: there is an unexpected non-group call; pretending it does not exist");
        call = void 0;
      }
      const creator = conversationSelector(callHistoryDetails.creatorUuid);
      const deviceCount = call?.peekInfo?.deviceCount ?? 0;
      return {
        activeCallConversationId,
        callMode: import_Calling.CallMode.Group,
        conversationId,
        creator,
        deviceCount,
        ended: callHistoryDetails.eraId !== call?.peekInfo?.eraId || !deviceCount,
        maxDevices: call?.peekInfo?.maxDevices ?? Infinity,
        startedTime: callHistoryDetails.startedTime
      };
    }
    default:
      throw new Error(`getPropsForCallHistory: missing case ${(0, import_missingCaseError.missingCaseError)(callHistoryDetails)}`);
  }
}
function isProfileChange(message) {
  return message.type === "profile-change";
}
function getPropsForProfileChange(message, { conversationSelector }) {
  const change = message.profileChange;
  const { changedId } = message;
  const changedContact = conversationSelector(changedId);
  if (!change) {
    throw new Error("getPropsForProfileChange: profileChange is undefined");
  }
  return {
    changedContact,
    change
  };
}
function isUniversalTimerNotification(message) {
  return message.type === "universal-timer-notification";
}
function isChangeNumberNotification(message) {
  return message.type === "change-number-notification";
}
function getPropsForChangeNumberNotification(message, { conversationSelector }) {
  return {
    sender: conversationSelector(message.sourceUuid),
    timestamp: message.sent_at
  };
}
function isChatSessionRefreshed(message) {
  return message.type === "chat-session-refreshed";
}
function isDeliveryIssue(message) {
  return message.type === "delivery-issue";
}
function getPropsForDeliveryIssue(message, { conversationSelector }) {
  const sender = conversationSelector(message.sourceUuid);
  const conversation = conversationSelector(message.conversationId);
  return {
    sender,
    inGroup: conversation.type === "group"
  };
}
function isTapToView(message) {
  if (message.deletedForEveryone) {
    return false;
  }
  return Boolean(message.isViewOnce || message.messageTimer);
}
function getMessagePropStatus(message, ourConversationId) {
  if (!isOutgoing(message)) {
    return hasErrors(message) ? "error" : void 0;
  }
  if (getLastChallengeError(message)) {
    return "paused";
  }
  const {
    deletedForEveryone,
    deletedForEveryoneFailed,
    deletedForEveryoneSendStatus,
    sendStateByConversationId = {}
  } = message;
  if (deletedForEveryone && deletedForEveryoneSendStatus) {
    if (deletedForEveryoneFailed) {
      const anySuccessfulSends = Object.values(deletedForEveryoneSendStatus).some((item) => item);
      return anySuccessfulSends ? "partial-sent" : "error";
    }
    const missingSends = Object.values(deletedForEveryoneSendStatus).some((item) => !item);
    if (missingSends) {
      return "sending";
    }
  }
  if (ourConversationId && (0, import_MessageSendState.isMessageJustForMe)(sendStateByConversationId, ourConversationId)) {
    const status = sendStateByConversationId[ourConversationId]?.status ?? import_MessageSendState.SendStatus.Pending;
    const sent = (0, import_MessageSendState.isSent)(status);
    if (hasErrors(message) || (0, import_MessageSendState.someSendStatus)(sendStateByConversationId, import_MessageSendState.isFailed)) {
      return sent ? "partial-sent" : "error";
    }
    return sent ? "viewed" : "sending";
  }
  const sendStates = Object.values(ourConversationId ? (0, import_lodash.omit)(sendStateByConversationId, ourConversationId) : sendStateByConversationId);
  const highestSuccessfulStatus = sendStates.reduce((result, { status }) => (0, import_MessageSendState.maxStatus)(result, status), import_MessageSendState.SendStatus.Pending);
  if (hasErrors(message) || (0, import_MessageSendState.someSendStatus)(sendStateByConversationId, import_MessageSendState.isFailed)) {
    return (0, import_MessageSendState.isSent)(highestSuccessfulStatus) ? "partial-sent" : "error";
  }
  if ((0, import_MessageSendState.isViewed)(highestSuccessfulStatus)) {
    return "viewed";
  }
  if ((0, import_MessageSendState.isRead)(highestSuccessfulStatus)) {
    return "read";
  }
  if ((0, import_MessageSendState.isDelivered)(highestSuccessfulStatus)) {
    return "delivered";
  }
  if ((0, import_MessageSendState.isSent)(highestSuccessfulStatus)) {
    return "sent";
  }
  return "sending";
}
function getPropsForEmbeddedContact(message, regionCode, accountSelector) {
  const contacts = message.contact;
  if (!contacts || !contacts.length) {
    return void 0;
  }
  const firstContact = contacts[0];
  const numbers = firstContact?.number;
  const firstNumber = numbers && numbers[0] ? numbers[0].value : void 0;
  return (0, import_EmbeddedContact.embeddedContactSelector)(firstContact, {
    regionCode,
    getAbsoluteAttachmentPath: window.Signal.Migrations.getAbsoluteAttachmentPath,
    firstNumber,
    uuid: accountSelector(firstNumber)
  });
}
function getPropsForAttachment(attachment) {
  if (!attachment) {
    return void 0;
  }
  const { path, pending, size, screenshot, thumbnail } = attachment;
  return {
    ...attachment,
    fileSize: size ? (0, import_filesize.default)(size) : void 0,
    isVoiceMessage: (0, import_Attachment.isVoiceMessage)(attachment),
    pending,
    url: path ? window.Signal.Migrations.getAbsoluteAttachmentPath(path) : void 0,
    screenshot: screenshot?.path ? {
      ...screenshot,
      url: window.Signal.Migrations.getAbsoluteAttachmentPath(screenshot.path)
    } : void 0,
    thumbnail: thumbnail?.path ? {
      ...thumbnail,
      url: window.Signal.Migrations.getAbsoluteAttachmentPath(thumbnail.path)
    } : void 0
  };
}
function processQuoteAttachment(attachment) {
  const { thumbnail } = attachment;
  const path = thumbnail && thumbnail.path && window.Signal.Migrations.getAbsoluteAttachmentPath(thumbnail.path);
  const objectUrl = thumbnail && thumbnail.objectUrl;
  const thumbnailWithObjectUrl = !path && !objectUrl || !thumbnail ? void 0 : { ...thumbnail, objectUrl: path || objectUrl };
  return {
    ...attachment,
    isVoiceMessage: (0, import_Attachment.isVoiceMessage)(attachment),
    thumbnail: thumbnailWithObjectUrl
  };
}
function canReplyOrReact(message, ourConversationId, conversation) {
  const { deletedForEveryone, sendStateByConversationId } = message;
  if (!conversation) {
    return false;
  }
  if (conversation.isGroupV1AndDisabled) {
    return false;
  }
  if ((0, import_conversations.isMissingRequiredProfileSharing)(conversation)) {
    return false;
  }
  if (!conversation.acceptedMessageRequest) {
    return false;
  }
  if (deletedForEveryone) {
    return false;
  }
  if (isOutgoing(message)) {
    return (0, import_MessageSendState.isMessageJustForMe)(sendStateByConversationId, ourConversationId) || (0, import_MessageSendState.someSendStatus)(ourConversationId ? (0, import_lodash.omit)(sendStateByConversationId, ourConversationId) : sendStateByConversationId, import_MessageSendState.isSent);
  }
  if (isIncoming(message) || isStory(message)) {
    return true;
  }
  return false;
}
function canReply(message, ourConversationId, conversationSelector) {
  const conversation = getConversation(message, conversationSelector);
  if (!conversation || conversation.announcementsOnly && !conversation.areWeAdmin) {
    return false;
  }
  return canReplyOrReact(message, ourConversationId, conversation);
}
function canReact(message, ourConversationId, conversationSelector) {
  const conversation = getConversation(message, conversationSelector);
  return canReplyOrReact(message, ourConversationId, conversation);
}
function canDeleteForEveryone(message) {
  return isOutgoing(message) && !message.deletedForEveryone && (0, import_timestamp.isMoreRecentThan)(message.sent_at, THREE_HOURS) && (0, import_MessageSendState.someSendStatus)(message.sendStateByConversationId, import_MessageSendState.isSent);
}
function canRetryDeleteForEveryone(message) {
  return Boolean(message.deletedForEveryone && message.deletedForEveryoneFailed && (0, import_timestamp.isMoreRecentThan)(message.sent_at, import_durations.DAY));
}
function canDownload(message, conversationSelector) {
  if (isOutgoing(message)) {
    return true;
  }
  const conversation = getConversation(message, conversationSelector);
  const isAccepted = Boolean(conversation && conversation.acceptedMessageRequest);
  if (!isAccepted) {
    return false;
  }
  const { attachments } = message;
  if (attachments && attachments.length) {
    return attachments.every((attachment) => Boolean(attachment.path));
  }
  return true;
}
function getLastChallengeError(message) {
  const { errors } = message;
  if (!errors) {
    return void 0;
  }
  const challengeErrors = errors.filter((error) => {
    return error.name === "SendMessageChallengeError" && (0, import_lodash.isNumber)(error.retryAfter) && (0, import_lodash.isObject)(error.data);
  }).sort((a, b) => a.retryAfter - b.retryAfter);
  return challengeErrors.pop();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canDeleteForEveryone,
  canDownload,
  canReact,
  canReply,
  canRetryDeleteForEveryone,
  getAttachmentsForMessage,
  getBubblePropsForMessage,
  getContact,
  getContactId,
  getConversation,
  getLastChallengeError,
  getMessagePropStatus,
  getPreviewsForMessage,
  getPropsForAttachment,
  getPropsForBubble,
  getPropsForCallHistory,
  getPropsForEmbeddedContact,
  getPropsForMessage,
  getPropsForQuote,
  getPropsForStoryReplyContext,
  getReactionsForMessage,
  getSource,
  getSourceDevice,
  getSourceUuid,
  hasErrors,
  isCallHistory,
  isChangeNumberNotification,
  isChatSessionRefreshed,
  isDeliveryIssue,
  isEndSession,
  isExpirationTimerUpdate,
  isGiftBadge,
  isGroupUpdate,
  isGroupV1Migration,
  isGroupV2Change,
  isIncoming,
  isKeyChange,
  isOutgoing,
  isProfileChange,
  isStory,
  isTapToView,
  isUniversalTimerNotification,
  isUnsupportedMessage,
  isVerifiedChange,
  processBodyRanges
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlkZW50aXR5LCBpc0VxdWFsLCBpc051bWJlciwgaXNPYmplY3QsIG1hcCwgb21pdCwgcGljayB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvckNyZWF0b3IgfSBmcm9tICdyZXNlbGVjdCc7XG5pbXBvcnQgZmlsZXNpemUgZnJvbSAnZmlsZXNpemUnO1xuaW1wb3J0IGdldERpcmVjdGlvbiBmcm9tICdkaXJlY3Rpb24nO1xuXG5pbXBvcnQgdHlwZSB7XG4gIExhc3RNZXNzYWdlU3RhdHVzLFxuICBNZXNzYWdlUmVhY3Rpb25UeXBlLFxuICBTaGFsbG93Q2hhbGxlbmdlRXJyb3IsXG59IGZyb20gJy4uLy4uL21vZGVsLXR5cGVzLmQnO1xuXG5pbXBvcnQgdHlwZSB7IFRpbWVsaW5lSXRlbVR5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9UaW1lbGluZUl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGEgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9NZXNzYWdlJztcbmltcG9ydCB7IFRleHREaXJlY3Rpb24gfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9NZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhIGFzIFRpbWVyTm90aWZpY2F0aW9uUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9UaW1lck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YSBhcyBDaGFuZ2VOdW1iZXJOb3RpZmljYXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL0NoYW5nZU51bWJlck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YSBhcyBTYWZldHlOdW1iZXJOb3RpZmljYXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1NhZmV0eU51bWJlck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YSBhcyBWZXJpZmljYXRpb25Ob3RpZmljYXRpb25Qcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1ZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YVR5cGUgYXMgR3JvdXBzVjJQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL0dyb3VwVjJDaGFuZ2UnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGFUeXBlIGFzIEdyb3VwVjFNaWdyYXRpb25Qcm9wc1R5cGUgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Hcm91cFYxTWlncmF0aW9uJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhVHlwZSBhcyBEZWxpdmVyeUlzc3VlUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vRGVsaXZlcnlJc3N1ZU5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7XG4gIFByb3BzRGF0YSBhcyBHcm91cE5vdGlmaWNhdGlvblByb3BzLFxuICBDaGFuZ2VUeXBlLFxufSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9Hcm91cE5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uUHJvcHNUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFF1b3RlZEF0dGFjaG1lbnRUeXBlIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vUXVvdGUnO1xuXG5pbXBvcnQgeyBnZXREb21haW4sIGlzU3RpY2tlclBhY2sgfSBmcm9tICcuLi8uLi90eXBlcy9MaW5rUHJldmlldyc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgRW1iZWRkZWRDb250YWN0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5pbXBvcnQgeyBlbWJlZGRlZENvbnRhY3RTZWxlY3RvciB9IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5pbXBvcnQgdHlwZSB7IEFzc2VydFByb3BzLCBCb2R5UmFuZ2VzVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBMaW5rUHJldmlld1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9tZXNzYWdlL0xpbmtQcmV2aWV3cyc7XG5pbXBvcnQgeyBDYWxsTW9kZSB9IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGlzVm9pY2VNZXNzYWdlLCBjYW5CZURvd25sb2FkZWQgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IFJlYWRTdGF0dXMgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9NZXNzYWdlUmVhZFN0YXR1cyc7XG5cbmltcG9ydCB0eXBlIHsgQ2FsbGluZ05vdGlmaWNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi91dGlsL2NhbGxpbmdOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgbWVtb2l6ZUJ5Um9vdCB9IGZyb20gJy4uLy4uL3V0aWwvbWVtb2l6ZUJ5Um9vdCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi4vLi4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgeyBpc01vcmVSZWNlbnRUaGFuIH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lc3RhbXAnO1xuaW1wb3J0ICogYXMgaXRlcmFibGVzIGZyb20gJy4uLy4uL3V0aWwvaXRlcmFibGVzJztcbmltcG9ydCB7IHN0cmljdEFzc2VydCB9IGZyb20gJy4uLy4uL3V0aWwvYXNzZXJ0JztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25UeXBlLFxuICBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbn0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5cbmltcG9ydCB0eXBlIHsgQWNjb3VudFNlbGVjdG9yVHlwZSB9IGZyb20gJy4vYWNjb3VudHMnO1xuaW1wb3J0IHR5cGUgeyBDYWxsU2VsZWN0b3JUeXBlLCBDYWxsU3RhdGVUeXBlIH0gZnJvbSAnLi9jYWxsaW5nJztcbmltcG9ydCB0eXBlIHtcbiAgR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUsXG4gIENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvclR5cGUsXG59IGZyb20gJy4vY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBpc01pc3NpbmdSZXF1aXJlZFByb2ZpbGVTaGFyaW5nIH0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7XG4gIFNlbmRTdGF0dXMsXG4gIGlzRGVsaXZlcmVkLFxuICBpc0ZhaWxlZCxcbiAgaXNNZXNzYWdlSnVzdEZvck1lLFxuICBpc1JlYWQsXG4gIGlzU2VudCxcbiAgaXNWaWV3ZWQsXG4gIG1heFN0YXR1cyxcbiAgc29tZVNlbmRTdGF0dXMsXG59IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uLy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvbkNvbG9yQXR0cmlidXRlcyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0Q29udmVyc2F0aW9uQ29sb3JBdHRyaWJ1dGVzJztcbmltcG9ydCB7IERBWSwgSE9VUiB9IGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGdldFN0b3J5UmVwbHlUZXh0IH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRTdG9yeVJlcGx5VGV4dCc7XG5cbmNvbnN0IFRIUkVFX0hPVVJTID0gMyAqIEhPVVI7XG5cbnR5cGUgRm9ybWF0dGVkQ29udGFjdCA9IFBhcnRpYWw8Q29udmVyc2F0aW9uVHlwZT4gJlxuICBQaWNrPFxuICAgIENvbnZlcnNhdGlvblR5cGUsXG4gICAgfCAnYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCdcbiAgICB8ICdpZCdcbiAgICB8ICdpc01lJ1xuICAgIHwgJ3NoYXJlZEdyb3VwTmFtZXMnXG4gICAgfCAndGl0bGUnXG4gICAgfCAndHlwZSdcbiAgICB8ICd1bmJsdXJyZWRBdmF0YXJQYXRoJ1xuICA+O1xudHlwZSBQcm9wc0Zvck1lc3NhZ2UgPSBPbWl0PFByb3BzRGF0YSwgJ2ludGVyYWN0aW9uTW9kZSc+O1xudHlwZSBQcm9wc0ZvclVuc3VwcG9ydGVkTWVzc2FnZSA9IHtcbiAgY2FuUHJvY2Vzc05vdzogYm9vbGVhbjtcbiAgY29udGFjdDogRm9ybWF0dGVkQ29udGFjdDtcbn07XG5cbmV4cG9ydCB0eXBlIEdldFByb3BzRm9yQnViYmxlT3B0aW9ucyA9IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uU2VsZWN0b3I6IEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlO1xuICBvdXJDb252ZXJzYXRpb25JZD86IHN0cmluZztcbiAgb3VyTnVtYmVyPzogc3RyaW5nO1xuICBvdXJVdWlkPzogVVVJRFN0cmluZ1R5cGU7XG4gIHNlbGVjdGVkTWVzc2FnZUlkPzogc3RyaW5nO1xuICBzZWxlY3RlZE1lc3NhZ2VDb3VudGVyPzogbnVtYmVyO1xuICByZWdpb25Db2RlPzogc3RyaW5nO1xuICBjYWxsU2VsZWN0b3I6IENhbGxTZWxlY3RvclR5cGU7XG4gIGFjdGl2ZUNhbGw/OiBDYWxsU3RhdGVUeXBlO1xuICBhY2NvdW50U2VsZWN0b3I6IEFjY291bnRTZWxlY3RvclR5cGU7XG4gIGNvbnRhY3ROYW1lQ29sb3JTZWxlY3RvcjogQ29udGFjdE5hbWVDb2xvclNlbGVjdG9yVHlwZTtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gaXNJbmNvbWluZyhcbiAgbWVzc2FnZTogUGljazxNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSwgJ3R5cGUnPlxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBtZXNzYWdlLnR5cGUgPT09ICdpbmNvbWluZyc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBpc091dGdvaW5nKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAndHlwZSc+XG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIG1lc3NhZ2UudHlwZSA9PT0gJ291dGdvaW5nJztcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGlzU3RvcnkoXG4gIG1lc3NhZ2U6IFBpY2s8TWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsICd0eXBlJz5cbik6IGJvb2xlYW4ge1xuICByZXR1cm4gbWVzc2FnZS50eXBlID09PSAnc3RvcnknO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGFzRXJyb3JzKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAnZXJyb3JzJz5cbik6IGJvb2xlYW4ge1xuICByZXR1cm4gbWVzc2FnZS5lcnJvcnMgPyBtZXNzYWdlLmVycm9ycy5sZW5ndGggPiAwIDogZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTb3VyY2UoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICBvdXJOdW1iZXI6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGlzSW5jb21pbmcobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5zb3VyY2U7XG4gIH1cbiAgaWYgKCFpc091dGdvaW5nKG1lc3NhZ2UpKSB7XG4gICAgbG9nLndhcm4oJ21lc3NhZ2UuZ2V0U291cmNlOiBDYWxsZWQgZm9yIG5vbi1pbmNvbWluZy9ub24tb3V0b2luZyBtZXNzYWdlJyk7XG4gIH1cblxuICByZXR1cm4gb3VyTnVtYmVyO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlRGV2aWNlKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgb3VyRGV2aWNlSWQ6IG51bWJlclxuKTogc3RyaW5nIHwgbnVtYmVyIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBzb3VyY2VEZXZpY2UgfSA9IG1lc3NhZ2U7XG5cbiAgaWYgKGlzSW5jb21pbmcobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gc291cmNlRGV2aWNlO1xuICB9XG4gIGlmICghaXNPdXRnb2luZyhtZXNzYWdlKSkge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ21lc3NhZ2UuZ2V0U291cmNlRGV2aWNlOiBDYWxsZWQgZm9yIG5vbi1pbmNvbWluZy9ub24tb3V0b2luZyBtZXNzYWdlJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4gc291cmNlRGV2aWNlIHx8IG91ckRldmljZUlkO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U291cmNlVXVpZChcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gIG91clV1aWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgaWYgKGlzSW5jb21pbmcobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gbWVzc2FnZS5zb3VyY2VVdWlkO1xuICB9XG4gIGlmICghaXNPdXRnb2luZyhtZXNzYWdlKSkge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ21lc3NhZ2UuZ2V0U291cmNlVXVpZDogQ2FsbGVkIGZvciBub24taW5jb21pbmcvbm9uLW91dG9pbmcgbWVzc2FnZSdcbiAgICApO1xuICB9XG5cbiAgcmV0dXJuIG91clV1aWQ7XG59XG5cbmV4cG9ydCB0eXBlIEdldENvbnRhY3RPcHRpb25zID0gUGljazxcbiAgR2V0UHJvcHNGb3JCdWJibGVPcHRpb25zLFxuICAnY29udmVyc2F0aW9uU2VsZWN0b3InIHwgJ291ckNvbnZlcnNhdGlvbklkJyB8ICdvdXJOdW1iZXInIHwgJ291clV1aWQnXG4+O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udGFjdElkKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAge1xuICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yLFxuICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgIG91ck51bWJlcixcbiAgICBvdXJVdWlkLFxuICB9OiBHZXRDb250YWN0T3B0aW9uc1xuKTogc3RyaW5nIHwgdW5kZWZpbmVkIHtcbiAgY29uc3Qgc291cmNlID0gZ2V0U291cmNlKG1lc3NhZ2UsIG91ck51bWJlcik7XG4gIGNvbnN0IHNvdXJjZVV1aWQgPSBnZXRTb3VyY2VVdWlkKG1lc3NhZ2UsIG91clV1aWQpO1xuXG4gIGlmICghc291cmNlICYmICFzb3VyY2VVdWlkKSB7XG4gICAgcmV0dXJuIG91ckNvbnZlcnNhdGlvbklkO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uU2VsZWN0b3Ioc291cmNlVXVpZCB8fCBzb3VyY2UpO1xuICByZXR1cm4gY29udmVyc2F0aW9uLmlkO1xufVxuXG4vLyBUT0RPOiBERVNLVE9QLTIxNDVcbmV4cG9ydCBmdW5jdGlvbiBnZXRDb250YWN0KFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAge1xuICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yLFxuICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgIG91ck51bWJlcixcbiAgICBvdXJVdWlkLFxuICB9OiBHZXRDb250YWN0T3B0aW9uc1xuKTogQ29udmVyc2F0aW9uVHlwZSB7XG4gIGNvbnN0IHNvdXJjZSA9IGdldFNvdXJjZShtZXNzYWdlLCBvdXJOdW1iZXIpO1xuICBjb25zdCBzb3VyY2VVdWlkID0gZ2V0U291cmNlVXVpZChtZXNzYWdlLCBvdXJVdWlkKTtcblxuICBpZiAoIXNvdXJjZSAmJiAhc291cmNlVXVpZCkge1xuICAgIHJldHVybiBjb252ZXJzYXRpb25TZWxlY3RvcihvdXJDb252ZXJzYXRpb25JZCk7XG4gIH1cblxuICByZXR1cm4gY29udmVyc2F0aW9uU2VsZWN0b3Ioc291cmNlVXVpZCB8fCBzb3VyY2UpO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0Q29udmVyc2F0aW9uKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAnY29udmVyc2F0aW9uSWQnPixcbiAgY29udmVyc2F0aW9uU2VsZWN0b3I6IEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlXG4pOiBDb252ZXJzYXRpb25UeXBlIHtcbiAgcmV0dXJuIGNvbnZlcnNhdGlvblNlbGVjdG9yKG1lc3NhZ2UuY29udmVyc2F0aW9uSWQpO1xufVxuXG4vLyBNZXNzYWdlXG5cbmV4cG9ydCBjb25zdCBnZXRBdHRhY2htZW50c0Zvck1lc3NhZ2UgPSBjcmVhdGVTZWxlY3RvckNyZWF0b3IobWVtb2l6ZUJ5Um9vdCkoXG4gIC8vIGBtZW1vaXplQnlSb290YCByZXF1aXJlbWVudFxuICBpZGVudGl0eSxcblxuICAoeyBzdGlja2VyIH06IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlKSA9PiBzdGlja2VyLFxuICAoeyBhdHRhY2htZW50cyB9OiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSkgPT4gYXR0YWNobWVudHMsXG4gIChfLCBzdGlja2VyLCBhdHRhY2htZW50cyA9IFtdKTogQXJyYXk8QXR0YWNobWVudFR5cGU+ID0+IHtcbiAgICBpZiAoc3RpY2tlciAmJiBzdGlja2VyLmRhdGEpIHtcbiAgICAgIGNvbnN0IHsgZGF0YSB9ID0gc3RpY2tlcjtcblxuICAgICAgLy8gV2UgZG9uJ3Qgc2hvdyBhbnl0aGluZyBpZiB3ZSBkb24ndCBoYXZlIHRoZSBzdGlja2VyIG9yIHRoZSBibHVyaGFzaC4uLlxuICAgICAgaWYgKCFkYXRhLmJsdXJIYXNoICYmIChkYXRhLnBlbmRpbmcgfHwgIWRhdGEucGF0aCkpIHtcbiAgICAgICAgcmV0dXJuIFtdO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgLi4uZGF0YSxcbiAgICAgICAgICAvLyBXZSB3YW50IHRvIHNob3cgdGhlIGJsdXJoYXNoIGZvciBzdGlja2Vycywgbm90IHRoZSBzcGlubmVyXG4gICAgICAgICAgcGVuZGluZzogZmFsc2UsXG4gICAgICAgICAgdXJsOiBkYXRhLnBhdGhcbiAgICAgICAgICAgID8gd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlQXR0YWNobWVudFBhdGgoZGF0YS5wYXRoKVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIH0sXG4gICAgICBdO1xuICAgIH1cblxuICAgIHJldHVybiBhdHRhY2htZW50c1xuICAgICAgLmZpbHRlcihhdHRhY2htZW50ID0+ICFhdHRhY2htZW50LmVycm9yIHx8IGNhbkJlRG93bmxvYWRlZChhdHRhY2htZW50KSlcbiAgICAgIC5tYXAoYXR0YWNobWVudCA9PiBnZXRQcm9wc0ZvckF0dGFjaG1lbnQoYXR0YWNobWVudCkpXG4gICAgICAuZmlsdGVyKGlzTm90TmlsKTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IHByb2Nlc3NCb2R5UmFuZ2VzID0gY3JlYXRlU2VsZWN0b3JDcmVhdG9yKG1lbW9pemVCeVJvb3QsIGlzRXF1YWwpKFxuICAvLyBgbWVtb2l6ZUJ5Um9vdGAgcmVxdWlyZW1lbnRcbiAgaWRlbnRpdHksXG5cbiAgKFxuICAgIHsgYm9keVJhbmdlcyB9OiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAnYm9keVJhbmdlcyc+LFxuICAgIHsgY29udmVyc2F0aW9uU2VsZWN0b3IgfTogeyBjb252ZXJzYXRpb25TZWxlY3RvcjogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUgfVxuICApOiBCb2R5UmFuZ2VzVHlwZSB8IHVuZGVmaW5lZCA9PiB7XG4gICAgaWYgKCFib2R5UmFuZ2VzKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHJldHVybiBib2R5UmFuZ2VzXG4gICAgICAuZmlsdGVyKHJhbmdlID0+IHJhbmdlLm1lbnRpb25VdWlkKVxuICAgICAgLm1hcChyYW5nZSA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKHJhbmdlLm1lbnRpb25VdWlkKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLnJhbmdlLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklEOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICAgICAgcmVwbGFjZW1lbnRUZXh0OiBjb252ZXJzYXRpb24udGl0bGUsXG4gICAgICAgIH07XG4gICAgICB9KVxuICAgICAgLnNvcnQoKGEsIGIpID0+IGIuc3RhcnQgLSBhLnN0YXJ0KTtcbiAgfSxcbiAgKF8sIHJhbmdlcyk6IHVuZGVmaW5lZCB8IEJvZHlSYW5nZXNUeXBlID0+IHJhbmdlc1xuKTtcblxuY29uc3QgZ2V0QXV0aG9yRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihtZW1vaXplQnlSb290KShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuXG4gIGdldENvbnRhY3QsXG5cbiAgKF8sIGNvbnZvOiBDb252ZXJzYXRpb25UeXBlKTogUHJvcHNEYXRhWydhdXRob3InXSA9PiB7XG4gICAgY29uc3Qge1xuICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdCxcbiAgICAgIGF2YXRhclBhdGgsXG4gICAgICBiYWRnZXMsXG4gICAgICBjb2xvcixcbiAgICAgIGlkLFxuICAgICAgaXNNZSxcbiAgICAgIG5hbWUsXG4gICAgICBwaG9uZU51bWJlcixcbiAgICAgIHByb2ZpbGVOYW1lLFxuICAgICAgc2hhcmVkR3JvdXBOYW1lcyxcbiAgICAgIHRpdGxlLFxuICAgICAgdW5ibHVycmVkQXZhdGFyUGF0aCxcbiAgICB9ID0gY29udm87XG5cbiAgICBjb25zdCB1bnNhZmUgPSB7XG4gICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0LFxuICAgICAgYXZhdGFyUGF0aCxcbiAgICAgIGJhZGdlcyxcbiAgICAgIGNvbG9yLFxuICAgICAgaWQsXG4gICAgICBpc01lLFxuICAgICAgbmFtZSxcbiAgICAgIHBob25lTnVtYmVyLFxuICAgICAgcHJvZmlsZU5hbWUsXG4gICAgICBzaGFyZWRHcm91cE5hbWVzLFxuICAgICAgdGl0bGUsXG4gICAgICB1bmJsdXJyZWRBdmF0YXJQYXRoLFxuICAgIH07XG5cbiAgICBjb25zdCBzYWZlOiBBc3NlcnRQcm9wczxQcm9wc0RhdGFbJ2F1dGhvciddLCB0eXBlb2YgdW5zYWZlPiA9IHVuc2FmZTtcblxuICAgIHJldHVybiBzYWZlO1xuICB9XG4pO1xuXG5jb25zdCBnZXRDYWNoZWRBdXRob3JGb3JNZXNzYWdlID0gY3JlYXRlU2VsZWN0b3JDcmVhdG9yKG1lbW9pemVCeVJvb3QsIGlzRXF1YWwpKFxuICAvLyBgbWVtb2l6ZUJ5Um9vdGAgcmVxdWlyZW1lbnRcbiAgaWRlbnRpdHksXG4gIGdldEF1dGhvckZvck1lc3NhZ2UsXG4gIChfLCBhdXRob3IpOiBQcm9wc0RhdGFbJ2F1dGhvciddID0+IGF1dGhvclxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFByZXZpZXdzRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihtZW1vaXplQnlSb290KShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuICAoeyBwcmV2aWV3IH06IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlKSA9PiBwcmV2aWV3LFxuICAoXywgcHJldmlld3MgPSBbXSk6IEFycmF5PExpbmtQcmV2aWV3VHlwZT4gPT4ge1xuICAgIHJldHVybiBwcmV2aWV3cy5tYXAocHJldmlldyA9PiAoe1xuICAgICAgLi4ucHJldmlldyxcbiAgICAgIGlzU3RpY2tlclBhY2s6IGlzU3RpY2tlclBhY2socHJldmlldy51cmwpLFxuICAgICAgZG9tYWluOiBnZXREb21haW4ocHJldmlldy51cmwpLFxuICAgICAgaW1hZ2U6IHByZXZpZXcuaW1hZ2UgPyBnZXRQcm9wc0ZvckF0dGFjaG1lbnQocHJldmlldy5pbWFnZSkgOiB1bmRlZmluZWQsXG4gICAgfSkpO1xuICB9XG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0UmVhY3Rpb25zRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihcbiAgbWVtb2l6ZUJ5Um9vdCxcbiAgaXNFcXVhbFxuKShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuXG4gIChcbiAgICB7IHJlYWN0aW9ucyA9IFtdIH06IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICAgIHsgY29udmVyc2F0aW9uU2VsZWN0b3IgfTogeyBjb252ZXJzYXRpb25TZWxlY3RvcjogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGUgfVxuICApID0+IHtcbiAgICBjb25zdCByZWFjdGlvbkJ5U2VuZGVyID0gbmV3IE1hcDxzdHJpbmcsIE1lc3NhZ2VSZWFjdGlvblR5cGU+KCk7XG4gICAgZm9yIChjb25zdCByZWFjdGlvbiBvZiByZWFjdGlvbnMpIHtcbiAgICAgIGNvbnN0IGV4aXN0aW5nUmVhY3Rpb24gPSByZWFjdGlvbkJ5U2VuZGVyLmdldChyZWFjdGlvbi5mcm9tSWQpO1xuICAgICAgaWYgKFxuICAgICAgICAhZXhpc3RpbmdSZWFjdGlvbiB8fFxuICAgICAgICByZWFjdGlvbi50aW1lc3RhbXAgPiBleGlzdGluZ1JlYWN0aW9uLnRpbWVzdGFtcFxuICAgICAgKSB7XG4gICAgICAgIHJlYWN0aW9uQnlTZW5kZXIuc2V0KHJlYWN0aW9uLmZyb21JZCwgcmVhY3Rpb24pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHJlYWN0aW9uc1dpdGhFbXB0aWVzID0gcmVhY3Rpb25CeVNlbmRlci52YWx1ZXMoKTtcbiAgICBjb25zdCByZWFjdGlvbnNXaXRoRW1vamkgPSBpdGVyYWJsZXMuZmlsdGVyKFxuICAgICAgcmVhY3Rpb25zV2l0aEVtcHRpZXMsXG4gICAgICByZSA9PiByZS5lbW9qaVxuICAgICk7XG4gICAgY29uc3QgZm9ybWF0dGVkUmVhY3Rpb25zID0gaXRlcmFibGVzLm1hcChyZWFjdGlvbnNXaXRoRW1vamksIHJlID0+IHtcbiAgICAgIGNvbnN0IGMgPSBjb252ZXJzYXRpb25TZWxlY3RvcihyZS5mcm9tSWQpO1xuXG4gICAgICB0eXBlIEZyb20gPSBOb25OdWxsYWJsZTxQcm9wc0RhdGFbJ3JlYWN0aW9ucyddPlswXVsnZnJvbSddO1xuXG4gICAgICBjb25zdCB1bnNhZmUgPSBwaWNrKGMsIFtcbiAgICAgICAgJ2FjY2VwdGVkTWVzc2FnZVJlcXVlc3QnLFxuICAgICAgICAnYXZhdGFyUGF0aCcsXG4gICAgICAgICdiYWRnZXMnLFxuICAgICAgICAnY29sb3InLFxuICAgICAgICAnaWQnLFxuICAgICAgICAnaXNNZScsXG4gICAgICAgICduYW1lJyxcbiAgICAgICAgJ3Bob25lTnVtYmVyJyxcbiAgICAgICAgJ3Byb2ZpbGVOYW1lJyxcbiAgICAgICAgJ3NoYXJlZEdyb3VwTmFtZXMnLFxuICAgICAgICAndGl0bGUnLFxuICAgICAgXSk7XG5cbiAgICAgIGNvbnN0IGZyb206IEFzc2VydFByb3BzPEZyb20sIHR5cGVvZiB1bnNhZmU+ID0gdW5zYWZlO1xuXG4gICAgICBzdHJpY3RBc3NlcnQocmUuZW1vamksICdFeHBlY3RlZCBhbGwgcmVhY3Rpb25zIHRvIGhhdmUgYW4gZW1vamknKTtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW1vamk6IHJlLmVtb2ppLFxuICAgICAgICB0aW1lc3RhbXA6IHJlLnRpbWVzdGFtcCxcbiAgICAgICAgZnJvbSxcbiAgICAgIH07XG4gICAgfSk7XG5cbiAgICByZXR1cm4gWy4uLmZvcm1hdHRlZFJlYWN0aW9uc107XG4gIH0sXG5cbiAgKF8sIHJlYWN0aW9ucyk6IFByb3BzRGF0YVsncmVhY3Rpb25zJ10gPT4gcmVhY3Rpb25zXG4pO1xuXG5leHBvcnQgY29uc3QgZ2V0UHJvcHNGb3JTdG9yeVJlcGx5Q29udGV4dCA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihcbiAgbWVtb2l6ZUJ5Um9vdCxcbiAgaXNFcXVhbFxuKShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuXG4gIChcbiAgICBtZXNzYWdlOiBQaWNrPFxuICAgICAgTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gICAgICAnYm9keScgfCAnY29udmVyc2F0aW9uSWQnIHwgJ3N0b3J5UmVhY3Rpb25FbW9qaScgfCAnc3RvcnlSZXBseUNvbnRleHQnXG4gICAgPixcbiAgICB7XG4gICAgICBjb252ZXJzYXRpb25TZWxlY3RvcixcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgIH06IHtcbiAgICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yOiBHZXRDb252ZXJzYXRpb25CeUlkVHlwZTtcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkPzogc3RyaW5nO1xuICAgIH1cbiAgKTogUHJvcHNEYXRhWydzdG9yeVJlcGx5Q29udGV4dCddID0+IHtcbiAgICBjb25zdCB7IHN0b3J5UmVhY3Rpb25FbW9qaSwgc3RvcnlSZXBseUNvbnRleHQgfSA9IG1lc3NhZ2U7XG4gICAgaWYgKCFzdG9yeVJlcGx5Q29udGV4dCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBjb250YWN0ID0gY29udmVyc2F0aW9uU2VsZWN0b3Ioc3RvcnlSZXBseUNvbnRleHQuYXV0aG9yVXVpZCk7XG5cbiAgICBjb25zdCBhdXRob3JUaXRsZSA9IGNvbnRhY3QuZmlyc3ROYW1lIHx8IGNvbnRhY3QudGl0bGU7XG4gICAgY29uc3QgaXNGcm9tTWUgPSBjb250YWN0LmlkID09PSBvdXJDb252ZXJzYXRpb25JZDtcblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLCBjb252ZXJzYXRpb25TZWxlY3Rvcik7XG5cbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbkNvbG9yLCBjdXN0b21Db2xvciB9ID1cbiAgICAgIGdldENvbnZlcnNhdGlvbkNvbG9yQXR0cmlidXRlcyhjb252ZXJzYXRpb24pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF1dGhvclRpdGxlLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGVtb2ppOiBzdG9yeVJlYWN0aW9uRW1vamksXG4gICAgICBpc0Zyb21NZSxcbiAgICAgIHJhd0F0dGFjaG1lbnQ6IHN0b3J5UmVwbHlDb250ZXh0LmF0dGFjaG1lbnRcbiAgICAgICAgPyBwcm9jZXNzUXVvdGVBdHRhY2htZW50KHN0b3J5UmVwbHlDb250ZXh0LmF0dGFjaG1lbnQpXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgcmVmZXJlbmNlZE1lc3NhZ2VOb3RGb3VuZDogIXN0b3J5UmVwbHlDb250ZXh0Lm1lc3NhZ2VJZCxcbiAgICAgIHRleHQ6IGdldFN0b3J5UmVwbHlUZXh0KHdpbmRvdy5pMThuLCBzdG9yeVJlcGx5Q29udGV4dC5hdHRhY2htZW50KSxcbiAgICB9O1xuICB9LFxuXG4gIChfLCBzdG9yeVJlcGx5Q29udGV4dCk6IFByb3BzRGF0YVsnc3RvcnlSZXBseUNvbnRleHQnXSA9PiBzdG9yeVJlcGx5Q29udGV4dFxuKTtcblxuZXhwb3J0IGNvbnN0IGdldFByb3BzRm9yUXVvdGUgPSBjcmVhdGVTZWxlY3RvckNyZWF0b3IobWVtb2l6ZUJ5Um9vdCwgaXNFcXVhbCkoXG4gIC8vIGBtZW1vaXplQnlSb290YCByZXF1aXJlbWVudFxuICBpZGVudGl0eSxcblxuICAoXG4gICAgbWVzc2FnZTogUGljazxNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSwgJ2NvbnZlcnNhdGlvbklkJyB8ICdxdW90ZSc+LFxuICAgIHtcbiAgICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yLFxuICAgICAgb3VyQ29udmVyc2F0aW9uSWQsXG4gICAgfToge1xuICAgICAgY29udmVyc2F0aW9uU2VsZWN0b3I6IEdldENvbnZlcnNhdGlvbkJ5SWRUeXBlO1xuICAgICAgb3VyQ29udmVyc2F0aW9uSWQ/OiBzdHJpbmc7XG4gICAgfVxuICApOiBQcm9wc0RhdGFbJ3F1b3RlJ10gPT4ge1xuICAgIGNvbnN0IHsgcXVvdGUgfSA9IG1lc3NhZ2U7XG4gICAgaWYgKCFxdW90ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCB7XG4gICAgICBhdXRob3IsXG4gICAgICBhdXRob3JVdWlkLFxuICAgICAgaWQ6IHNlbnRBdCxcbiAgICAgIGlzVmlld09uY2UsXG4gICAgICBpc0dpZnRCYWRnZTogaXNUYXJnZXRHaWZ0QmFkZ2UsXG4gICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kLFxuICAgICAgdGV4dCA9ICcnLFxuICAgIH0gPSBxdW90ZTtcblxuICAgIGNvbnN0IGNvbnRhY3QgPSBjb252ZXJzYXRpb25TZWxlY3RvcihhdXRob3JVdWlkIHx8IGF1dGhvcik7XG5cbiAgICBjb25zdCBhdXRob3JJZCA9IGNvbnRhY3QuaWQ7XG4gICAgY29uc3QgYXV0aG9yTmFtZSA9IGNvbnRhY3QubmFtZTtcbiAgICBjb25zdCBhdXRob3JQaG9uZU51bWJlciA9IGNvbnRhY3QucGhvbmVOdW1iZXI7XG4gICAgY29uc3QgYXV0aG9yUHJvZmlsZU5hbWUgPSBjb250YWN0LnByb2ZpbGVOYW1lO1xuICAgIGNvbnN0IGF1dGhvclRpdGxlID0gY29udGFjdC50aXRsZTtcbiAgICBjb25zdCBpc0Zyb21NZSA9IGF1dGhvcklkID09PSBvdXJDb252ZXJzYXRpb25JZDtcblxuICAgIGNvbnN0IGZpcnN0QXR0YWNobWVudCA9IHF1b3RlLmF0dGFjaG1lbnRzICYmIHF1b3RlLmF0dGFjaG1lbnRzWzBdO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLCBjb252ZXJzYXRpb25TZWxlY3Rvcik7XG5cbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbkNvbG9yLCBjdXN0b21Db2xvciB9ID1cbiAgICAgIGdldENvbnZlcnNhdGlvbkNvbG9yQXR0cmlidXRlcyhjb252ZXJzYXRpb24pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF1dGhvcklkLFxuICAgICAgYXV0aG9yTmFtZSxcbiAgICAgIGF1dGhvclBob25lTnVtYmVyLFxuICAgICAgYXV0aG9yUHJvZmlsZU5hbWUsXG4gICAgICBhdXRob3JUaXRsZSxcbiAgICAgIGJvZHlSYW5nZXM6IHByb2Nlc3NCb2R5UmFuZ2VzKHF1b3RlLCB7IGNvbnZlcnNhdGlvblNlbGVjdG9yIH0pLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3IsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGlzRnJvbU1lLFxuICAgICAgcmF3QXR0YWNobWVudDogZmlyc3RBdHRhY2htZW50XG4gICAgICAgID8gcHJvY2Vzc1F1b3RlQXR0YWNobWVudChmaXJzdEF0dGFjaG1lbnQpXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgaXNHaWZ0QmFkZ2U6IEJvb2xlYW4oaXNUYXJnZXRHaWZ0QmFkZ2UpLFxuICAgICAgaXNWaWV3T25jZSxcbiAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQsXG4gICAgICBzZW50QXQ6IE51bWJlcihzZW50QXQpLFxuICAgICAgdGV4dCxcbiAgICB9O1xuICB9LFxuXG4gIChfLCBxdW90ZSk6IFByb3BzRGF0YVsncXVvdGUnXSA9PiBxdW90ZVxuKTtcblxuZXhwb3J0IHR5cGUgR2V0UHJvcHNGb3JNZXNzYWdlT3B0aW9ucyA9IFBpY2s8XG4gIEdldFByb3BzRm9yQnViYmxlT3B0aW9ucyxcbiAgfCAnY29udmVyc2F0aW9uU2VsZWN0b3InXG4gIHwgJ291ckNvbnZlcnNhdGlvbklkJ1xuICB8ICdvdXJVdWlkJ1xuICB8ICdvdXJOdW1iZXInXG4gIHwgJ3NlbGVjdGVkTWVzc2FnZUlkJ1xuICB8ICdzZWxlY3RlZE1lc3NhZ2VDb3VudGVyJ1xuICB8ICdyZWdpb25Db2RlJ1xuICB8ICdhY2NvdW50U2VsZWN0b3InXG4gIHwgJ2NvbnRhY3ROYW1lQ29sb3JTZWxlY3Rvcidcbj47XG5cbnR5cGUgU2hhbGxvd1Byb3BzVHlwZSA9IFBpY2s8XG4gIFByb3BzRm9yTWVzc2FnZSxcbiAgfCAnY2FuRGVsZXRlRm9yRXZlcnlvbmUnXG4gIHwgJ2NhbkRvd25sb2FkJ1xuICB8ICdjYW5SZWFjdCdcbiAgfCAnY2FuUmVwbHknXG4gIHwgJ2NhblJldHJ5J1xuICB8ICdjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lJ1xuICB8ICdjb250YWN0J1xuICB8ICdjb250YWN0TmFtZUNvbG9yJ1xuICB8ICdjb252ZXJzYXRpb25Db2xvcidcbiAgfCAnY29udmVyc2F0aW9uSWQnXG4gIHwgJ2NvbnZlcnNhdGlvblRpdGxlJ1xuICB8ICdjb252ZXJzYXRpb25UeXBlJ1xuICB8ICdjdXN0b21Db2xvcidcbiAgfCAnZGVsZXRlZEZvckV2ZXJ5b25lJ1xuICB8ICdkaXJlY3Rpb24nXG4gIHwgJ2Rpc3BsYXlMaW1pdCdcbiAgfCAnZXhwaXJhdGlvbkxlbmd0aCdcbiAgfCAnZXhwaXJhdGlvblRpbWVzdGFtcCdcbiAgfCAnZ2lmdEJhZGdlJ1xuICB8ICdpZCdcbiAgfCAnaXNCbG9ja2VkJ1xuICB8ICdpc01lc3NhZ2VSZXF1ZXN0QWNjZXB0ZWQnXG4gIHwgJ2lzU2VsZWN0ZWQnXG4gIHwgJ2lzU2VsZWN0ZWRDb3VudGVyJ1xuICB8ICdpc1N0aWNrZXInXG4gIHwgJ2lzVGFwVG9WaWV3J1xuICB8ICdpc1RhcFRvVmlld0Vycm9yJ1xuICB8ICdpc1RhcFRvVmlld0V4cGlyZWQnXG4gIHwgJ3JlYWRTdGF0dXMnXG4gIHwgJ3NlbGVjdGVkUmVhY3Rpb24nXG4gIHwgJ3N0YXR1cydcbiAgfCAndGV4dCdcbiAgfCAndGV4dERpcmVjdGlvbidcbiAgfCAndGltZXN0YW1wJ1xuPjtcblxuY29uc3QgZ2V0U2hhbGxvd1Byb3BzRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihtZW1vaXplQnlSb290LCBpc0VxdWFsKShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuXG4gIChcbiAgICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgICB7XG4gICAgICBhY2NvdW50U2VsZWN0b3IsXG4gICAgICBjb252ZXJzYXRpb25TZWxlY3RvcixcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgICAgb3VyTnVtYmVyLFxuICAgICAgb3VyVXVpZCxcbiAgICAgIHJlZ2lvbkNvZGUsXG4gICAgICBzZWxlY3RlZE1lc3NhZ2VJZCxcbiAgICAgIHNlbGVjdGVkTWVzc2FnZUNvdW50ZXIsXG4gICAgICBjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IsXG4gICAgfTogR2V0UHJvcHNGb3JNZXNzYWdlT3B0aW9uc1xuICApOiBTaGFsbG93UHJvcHNUeXBlID0+IHtcbiAgICBjb25zdCB7IGV4cGlyZVRpbWVyLCBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAsIGNvbnZlcnNhdGlvbklkIH0gPSBtZXNzYWdlO1xuICAgIGNvbnN0IGV4cGlyYXRpb25MZW5ndGggPSBleHBpcmVUaW1lciA/IGV4cGlyZVRpbWVyICogMTAwMCA6IHVuZGVmaW5lZDtcbiAgICBjb25zdCBleHBpcmF0aW9uVGltZXN0YW1wID1cbiAgICAgIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCAmJiBleHBpcmF0aW9uTGVuZ3RoXG4gICAgICAgID8gZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wICsgZXhwaXJhdGlvbkxlbmd0aFxuICAgICAgICA6IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLCBjb252ZXJzYXRpb25TZWxlY3Rvcik7XG4gICAgY29uc3QgaXNHcm91cCA9IGNvbnZlcnNhdGlvbi50eXBlID09PSAnZ3JvdXAnO1xuICAgIGNvbnN0IHsgc3RpY2tlciB9ID0gbWVzc2FnZTtcblxuICAgIGNvbnN0IGlzTWVzc2FnZVRhcFRvVmlldyA9IGlzVGFwVG9WaWV3KG1lc3NhZ2UpO1xuXG4gICAgY29uc3QgaXNTZWxlY3RlZCA9IG1lc3NhZ2UuaWQgPT09IHNlbGVjdGVkTWVzc2FnZUlkO1xuXG4gICAgY29uc3Qgc2VsZWN0ZWRSZWFjdGlvbiA9IChcbiAgICAgIChtZXNzYWdlLnJlYWN0aW9ucyB8fCBbXSkuZmluZChyZSA9PiByZS5mcm9tSWQgPT09IG91ckNvbnZlcnNhdGlvbklkKSB8fFxuICAgICAge31cbiAgICApLmVtb2ppO1xuXG4gICAgY29uc3QgYXV0aG9ySWQgPSBnZXRDb250YWN0SWQobWVzc2FnZSwge1xuICAgICAgY29udmVyc2F0aW9uU2VsZWN0b3IsXG4gICAgICBvdXJDb252ZXJzYXRpb25JZCxcbiAgICAgIG91ck51bWJlcixcbiAgICAgIG91clV1aWQsXG4gICAgfSk7XG4gICAgY29uc3QgY29udGFjdE5hbWVDb2xvciA9IGNvbnRhY3ROYW1lQ29sb3JTZWxlY3Rvcihjb252ZXJzYXRpb25JZCwgYXV0aG9ySWQpO1xuXG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25Db2xvciwgY3VzdG9tQ29sb3IgfSA9XG4gICAgICBnZXRDb252ZXJzYXRpb25Db2xvckF0dHJpYnV0ZXMoY29udmVyc2F0aW9uKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjYW5EZWxldGVGb3JFdmVyeW9uZTogY2FuRGVsZXRlRm9yRXZlcnlvbmUobWVzc2FnZSksXG4gICAgICBjYW5Eb3dubG9hZDogY2FuRG93bmxvYWQobWVzc2FnZSwgY29udmVyc2F0aW9uU2VsZWN0b3IpLFxuICAgICAgY2FuUmVhY3Q6IGNhblJlYWN0KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBjb252ZXJzYXRpb25TZWxlY3RvciksXG4gICAgICBjYW5SZXBseTogY2FuUmVwbHkobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGNvbnZlcnNhdGlvblNlbGVjdG9yKSxcbiAgICAgIGNhblJldHJ5OiBoYXNFcnJvcnMobWVzc2FnZSksXG4gICAgICBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lKG1lc3NhZ2UpLFxuICAgICAgY29udGFjdDogZ2V0UHJvcHNGb3JFbWJlZGRlZENvbnRhY3QobWVzc2FnZSwgcmVnaW9uQ29kZSwgYWNjb3VudFNlbGVjdG9yKSxcbiAgICAgIGNvbnRhY3ROYW1lQ29sb3IsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcixcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgY29udmVyc2F0aW9uVGl0bGU6IGNvbnZlcnNhdGlvbi50aXRsZSxcbiAgICAgIGNvbnZlcnNhdGlvblR5cGU6IGlzR3JvdXAgPyAnZ3JvdXAnIDogJ2RpcmVjdCcsXG4gICAgICBjdXN0b21Db2xvcixcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogbWVzc2FnZS5kZWxldGVkRm9yRXZlcnlvbmUgfHwgZmFsc2UsXG4gICAgICBkaXJlY3Rpb246IGlzSW5jb21pbmcobWVzc2FnZSkgPyAnaW5jb21pbmcnIDogJ291dGdvaW5nJyxcbiAgICAgIGRpc3BsYXlMaW1pdDogbWVzc2FnZS5kaXNwbGF5TGltaXQsXG4gICAgICBleHBpcmF0aW9uTGVuZ3RoLFxuICAgICAgZXhwaXJhdGlvblRpbWVzdGFtcCxcbiAgICAgIGdpZnRCYWRnZTogbWVzc2FnZS5naWZ0QmFkZ2UsXG4gICAgICBpZDogbWVzc2FnZS5pZCxcbiAgICAgIGlzQmxvY2tlZDogY29udmVyc2F0aW9uLmlzQmxvY2tlZCB8fCBmYWxzZSxcbiAgICAgIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogY29udmVyc2F0aW9uPy5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0ID8/IHRydWUsXG4gICAgICBpc1NlbGVjdGVkLFxuICAgICAgaXNTZWxlY3RlZENvdW50ZXI6IGlzU2VsZWN0ZWQgPyBzZWxlY3RlZE1lc3NhZ2VDb3VudGVyIDogdW5kZWZpbmVkLFxuICAgICAgaXNTdGlja2VyOiBCb29sZWFuKHN0aWNrZXIpLFxuICAgICAgaXNUYXBUb1ZpZXc6IGlzTWVzc2FnZVRhcFRvVmlldyxcbiAgICAgIGlzVGFwVG9WaWV3RXJyb3I6XG4gICAgICAgIGlzTWVzc2FnZVRhcFRvVmlldyAmJiBpc0luY29taW5nKG1lc3NhZ2UpICYmIG1lc3NhZ2UuaXNUYXBUb1ZpZXdJbnZhbGlkLFxuICAgICAgaXNUYXBUb1ZpZXdFeHBpcmVkOiBpc01lc3NhZ2VUYXBUb1ZpZXcgJiYgbWVzc2FnZS5pc0VyYXNlZCxcbiAgICAgIHJlYWRTdGF0dXM6IG1lc3NhZ2UucmVhZFN0YXR1cyA/PyBSZWFkU3RhdHVzLlJlYWQsXG4gICAgICBzZWxlY3RlZFJlYWN0aW9uLFxuICAgICAgc3RhdHVzOiBnZXRNZXNzYWdlUHJvcFN0YXR1cyhtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCksXG4gICAgICB0ZXh0OiBtZXNzYWdlLmJvZHksXG4gICAgICB0ZXh0RGlyZWN0aW9uOiBnZXRUZXh0RGlyZWN0aW9uKG1lc3NhZ2UuYm9keSksXG4gICAgICB0aW1lc3RhbXA6IG1lc3NhZ2Uuc2VudF9hdCxcbiAgICB9O1xuICB9LFxuXG4gIChfOiB1bmtub3duLCBwcm9wczogU2hhbGxvd1Byb3BzVHlwZSkgPT4gcHJvcHNcbik7XG5cbmZ1bmN0aW9uIGdldFRleHRBdHRhY2htZW50KFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZVxuKTogQXR0YWNobWVudFR5cGUgfCB1bmRlZmluZWQge1xuICByZXR1cm4gKFxuICAgIG1lc3NhZ2UuYm9keUF0dGFjaG1lbnQgJiYgZ2V0UHJvcHNGb3JBdHRhY2htZW50KG1lc3NhZ2UuYm9keUF0dGFjaG1lbnQpXG4gICk7XG59XG5cbmZ1bmN0aW9uIGdldFRleHREaXJlY3Rpb24oYm9keT86IHN0cmluZyk6IFRleHREaXJlY3Rpb24ge1xuICBpZiAoIWJvZHkpIHtcbiAgICByZXR1cm4gVGV4dERpcmVjdGlvbi5Ob25lO1xuICB9XG5cbiAgY29uc3QgZGlyZWN0aW9uID0gZ2V0RGlyZWN0aW9uKGJvZHkpO1xuICBzd2l0Y2ggKGRpcmVjdGlvbikge1xuICAgIGNhc2UgJ2x0cic6XG4gICAgICByZXR1cm4gVGV4dERpcmVjdGlvbi5MZWZ0VG9SaWdodDtcbiAgICBjYXNlICdydGwnOlxuICAgICAgcmV0dXJuIFRleHREaXJlY3Rpb24uUmlnaHRUb0xlZnQ7XG4gICAgY2FzZSAnbmV1dHJhbCc6XG4gICAgICByZXR1cm4gVGV4dERpcmVjdGlvbi5EZWZhdWx0O1xuICAgIGRlZmF1bHQ6IHtcbiAgICAgIGNvbnN0IHVuZXhwZWN0ZWQ6IG5ldmVyID0gZGlyZWN0aW9uO1xuICAgICAgbG9nLndhcm4oYGdldFRleHREaXJlY3Rpb246IHVuZXhwZWN0ZWQgZGlyZWN0aW9uICR7dW5leHBlY3RlZH1gKTtcbiAgICAgIHJldHVybiBUZXh0RGlyZWN0aW9uLk5vbmU7XG4gICAgfVxuICB9XG59XG5cbmV4cG9ydCBjb25zdCBnZXRQcm9wc0Zvck1lc3NhZ2U6IChcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gIG9wdGlvbnM6IEdldFByb3BzRm9yTWVzc2FnZU9wdGlvbnNcbikgPT4gT21pdDxQcm9wc0Zvck1lc3NhZ2UsICdyZW5kZXJpbmdDb250ZXh0Jz4gPSBjcmVhdGVTZWxlY3RvckNyZWF0b3IoXG4gIG1lbW9pemVCeVJvb3RcbikoXG4gIC8vIGBtZW1vaXplQnlSb290YCByZXF1aXJlbWVudFxuICBpZGVudGl0eSxcblxuICBnZXRBdHRhY2htZW50c0Zvck1lc3NhZ2UsXG4gIHByb2Nlc3NCb2R5UmFuZ2VzLFxuICBnZXRDYWNoZWRBdXRob3JGb3JNZXNzYWdlLFxuICBnZXRQcmV2aWV3c0Zvck1lc3NhZ2UsXG4gIGdldFJlYWN0aW9uc0Zvck1lc3NhZ2UsXG4gIGdldFByb3BzRm9yUXVvdGUsXG4gIGdldFByb3BzRm9yU3RvcnlSZXBseUNvbnRleHQsXG4gIGdldFRleHRBdHRhY2htZW50LFxuICBnZXRTaGFsbG93UHJvcHNGb3JNZXNzYWdlLFxuICAoXG4gICAgXyxcbiAgICBhdHRhY2htZW50czogQXJyYXk8QXR0YWNobWVudFR5cGU+LFxuICAgIGJvZHlSYW5nZXM6IEJvZHlSYW5nZXNUeXBlIHwgdW5kZWZpbmVkLFxuICAgIGF1dGhvcjogUHJvcHNEYXRhWydhdXRob3InXSxcbiAgICBwcmV2aWV3czogQXJyYXk8TGlua1ByZXZpZXdUeXBlPixcbiAgICByZWFjdGlvbnM6IFByb3BzRGF0YVsncmVhY3Rpb25zJ10sXG4gICAgcXVvdGU6IFByb3BzRGF0YVsncXVvdGUnXSxcbiAgICBzdG9yeVJlcGx5Q29udGV4dDogUHJvcHNEYXRhWydzdG9yeVJlcGx5Q29udGV4dCddLFxuICAgIHRleHRBdHRhY2htZW50OiBQcm9wc0RhdGFbJ3RleHRBdHRhY2htZW50J10sXG4gICAgc2hhbGxvd1Byb3BzOiBTaGFsbG93UHJvcHNUeXBlXG4gICk6IE9taXQ8UHJvcHNGb3JNZXNzYWdlLCAncmVuZGVyaW5nQ29udGV4dCc+ID0+IHtcbiAgICByZXR1cm4ge1xuICAgICAgYXR0YWNobWVudHMsXG4gICAgICBhdXRob3IsXG4gICAgICBib2R5UmFuZ2VzLFxuICAgICAgcHJldmlld3MsXG4gICAgICBxdW90ZSxcbiAgICAgIHJlYWN0aW9ucyxcbiAgICAgIHN0b3J5UmVwbHlDb250ZXh0LFxuICAgICAgdGV4dEF0dGFjaG1lbnQsXG4gICAgICAuLi5zaGFsbG93UHJvcHMsXG4gICAgfTtcbiAgfVxuKTtcblxuZXhwb3J0IGNvbnN0IGdldEJ1YmJsZVByb3BzRm9yTWVzc2FnZSA9IGNyZWF0ZVNlbGVjdG9yQ3JlYXRvcihtZW1vaXplQnlSb290KShcbiAgLy8gYG1lbW9pemVCeVJvb3RgIHJlcXVpcmVtZW50XG4gIGlkZW50aXR5LFxuXG4gIGdldFByb3BzRm9yTWVzc2FnZSxcblxuICAoXywgZGF0YSk6IFRpbWVsaW5lSXRlbVR5cGUgPT4gKHtcbiAgICB0eXBlOiAnbWVzc2FnZScgYXMgY29uc3QsXG4gICAgZGF0YSxcbiAgICB0aW1lc3RhbXA6IGRhdGEudGltZXN0YW1wLFxuICB9KVxuKTtcblxuLy8gVG9wLWxldmVsIHByb3AgZ2VuZXJhdGlvbiBmb3IgdGhlIG1lc3NhZ2UgYnViYmxlXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcHNGb3JCdWJibGUoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICBvcHRpb25zOiBHZXRQcm9wc0ZvckJ1YmJsZU9wdGlvbnNcbik6IFRpbWVsaW5lSXRlbVR5cGUge1xuICBjb25zdCB7IHJlY2VpdmVkX2F0X21zOiByZWNlaXZlZEF0LCB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAgfSA9IG1lc3NhZ2U7XG4gIGNvbnN0IHRpbWVzdGFtcCA9IHJlY2VpdmVkQXQgfHwgbWVzc2FnZVRpbWVzdGFtcDtcblxuICBpZiAoaXNVbnN1cHBvcnRlZE1lc3NhZ2UobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3Vuc3VwcG9ydGVkTWVzc2FnZScsXG4gICAgICBkYXRhOiBnZXRQcm9wc0ZvclVuc3VwcG9ydGVkTWVzc2FnZShtZXNzYWdlLCBvcHRpb25zKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9XG4gIGlmIChpc0dyb3VwVjJDaGFuZ2UobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2dyb3VwVjJDaGFuZ2UnLFxuICAgICAgZGF0YTogZ2V0UHJvcHNGb3JHcm91cFYyQ2hhbmdlKG1lc3NhZ2UsIG9wdGlvbnMpLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH07XG4gIH1cbiAgaWYgKGlzR3JvdXBWMU1pZ3JhdGlvbihtZXNzYWdlKSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZ3JvdXBWMU1pZ3JhdGlvbicsXG4gICAgICBkYXRhOiBnZXRQcm9wc0Zvckdyb3VwVjFNaWdyYXRpb24obWVzc2FnZSwgb3B0aW9ucyksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuICBpZiAoaXNFeHBpcmF0aW9uVGltZXJVcGRhdGUobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3RpbWVyTm90aWZpY2F0aW9uJyxcbiAgICAgIGRhdGE6IGdldFByb3BzRm9yVGltZXJOb3RpZmljYXRpb24obWVzc2FnZSwgb3B0aW9ucyksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuICBpZiAoaXNLZXlDaGFuZ2UobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3NhZmV0eU51bWJlck5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiBnZXRQcm9wc0ZvclNhZmV0eU51bWJlck5vdGlmaWNhdGlvbihtZXNzYWdlLCBvcHRpb25zKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9XG4gIGlmIChpc1ZlcmlmaWVkQ2hhbmdlKG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd2ZXJpZmljYXRpb25Ob3RpZmljYXRpb24nLFxuICAgICAgZGF0YTogZ2V0UHJvcHNGb3JWZXJpZmljYXRpb25Ob3RpZmljYXRpb24obWVzc2FnZSwgb3B0aW9ucyksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuICBpZiAoaXNHcm91cFVwZGF0ZShtZXNzYWdlKSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnZ3JvdXBOb3RpZmljYXRpb24nLFxuICAgICAgZGF0YTogZ2V0UHJvcHNGb3JHcm91cE5vdGlmaWNhdGlvbihtZXNzYWdlLCBvcHRpb25zKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9XG4gIGlmIChpc0VuZFNlc3Npb24obWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ3Jlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH07XG4gIH1cbiAgaWYgKGlzQ2FsbEhpc3RvcnkobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2NhbGxIaXN0b3J5JyxcbiAgICAgIGRhdGE6IGdldFByb3BzRm9yQ2FsbEhpc3RvcnkobWVzc2FnZSwgb3B0aW9ucyksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuICBpZiAoaXNQcm9maWxlQ2hhbmdlKG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdwcm9maWxlQ2hhbmdlJyxcbiAgICAgIGRhdGE6IGdldFByb3BzRm9yUHJvZmlsZUNoYW5nZShtZXNzYWdlLCBvcHRpb25zKSxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9XG4gIGlmIChpc1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uKG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICd1bml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbicsXG4gICAgICBkYXRhOiBudWxsLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH07XG4gIH1cbiAgaWYgKGlzQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uKG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHR5cGU6ICdjaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24nLFxuICAgICAgZGF0YTogZ2V0UHJvcHNGb3JDaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24obWVzc2FnZSwgb3B0aW9ucyksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuICBpZiAoaXNDaGF0U2Vzc2lvblJlZnJlc2hlZChtZXNzYWdlKSkge1xuICAgIHJldHVybiB7XG4gICAgICB0eXBlOiAnY2hhdFNlc3Npb25SZWZyZXNoZWQnLFxuICAgICAgZGF0YTogbnVsbCxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICB9XG4gIGlmIChpc0RlbGl2ZXJ5SXNzdWUobWVzc2FnZSkpIHtcbiAgICByZXR1cm4ge1xuICAgICAgdHlwZTogJ2RlbGl2ZXJ5SXNzdWUnLFxuICAgICAgZGF0YTogZ2V0UHJvcHNGb3JEZWxpdmVyeUlzc3VlKG1lc3NhZ2UsIG9wdGlvbnMpLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH07XG4gIH1cblxuICByZXR1cm4gZ2V0QnViYmxlUHJvcHNGb3JNZXNzYWdlKG1lc3NhZ2UsIG9wdGlvbnMpO1xufVxuXG4vLyBVbnN1cHBvcnRlZCBNZXNzYWdlXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1Vuc3VwcG9ydGVkTWVzc2FnZShcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGVcbik6IGJvb2xlYW4ge1xuICBjb25zdCB2ZXJzaW9uQXRSZWNlaXZlID0gbWVzc2FnZS5zdXBwb3J0ZWRWZXJzaW9uQXRSZWNlaXZlO1xuICBjb25zdCByZXF1aXJlZFZlcnNpb24gPSBtZXNzYWdlLnJlcXVpcmVkUHJvdG9jb2xWZXJzaW9uO1xuXG4gIHJldHVybiAoXG4gICAgaXNOdW1iZXIodmVyc2lvbkF0UmVjZWl2ZSkgJiZcbiAgICBpc051bWJlcihyZXF1aXJlZFZlcnNpb24pICYmXG4gICAgdmVyc2lvbkF0UmVjZWl2ZSA8IHJlcXVpcmVkVmVyc2lvblxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wc0ZvclVuc3VwcG9ydGVkTWVzc2FnZShcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gIG9wdGlvbnM6IEdldENvbnRhY3RPcHRpb25zXG4pOiBQcm9wc0ZvclVuc3VwcG9ydGVkTWVzc2FnZSB7XG4gIGNvbnN0IENVUlJFTlRfUFJPVE9DT0xfVkVSU0lPTiA9IFByb3RvLkRhdGFNZXNzYWdlLlByb3RvY29sVmVyc2lvbi5DVVJSRU5UO1xuXG4gIGNvbnN0IHJlcXVpcmVkVmVyc2lvbiA9IG1lc3NhZ2UucmVxdWlyZWRQcm90b2NvbFZlcnNpb247XG4gIGNvbnN0IGNhblByb2Nlc3NOb3cgPSBCb29sZWFuKFxuICAgIENVUlJFTlRfUFJPVE9DT0xfVkVSU0lPTiAmJlxuICAgICAgcmVxdWlyZWRWZXJzaW9uICYmXG4gICAgICBDVVJSRU5UX1BST1RPQ09MX1ZFUlNJT04gPj0gcmVxdWlyZWRWZXJzaW9uXG4gICk7XG5cbiAgcmV0dXJuIHtcbiAgICBjYW5Qcm9jZXNzTm93LFxuICAgIGNvbnRhY3Q6IGdldENvbnRhY3QobWVzc2FnZSwgb3B0aW9ucyksXG4gIH07XG59XG5cbi8vIEdyb3VwVjIgQ2hhbmdlXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dyb3VwVjJDaGFuZ2UobWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIEJvb2xlYW4obWVzc2FnZS5ncm91cFYyQ2hhbmdlKTtcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcHNGb3JHcm91cFYyQ2hhbmdlKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgeyBjb252ZXJzYXRpb25TZWxlY3Rvciwgb3VyVXVpZCB9OiBHZXRQcm9wc0ZvckJ1YmJsZU9wdGlvbnNcbik6IEdyb3Vwc1YyUHJvcHMge1xuICBjb25zdCBjaGFuZ2UgPSBtZXNzYWdlLmdyb3VwVjJDaGFuZ2U7XG5cbiAgaWYgKCFjaGFuZ2UpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFByb3BzRm9yR3JvdXBWMkNoYW5nZTogQ2hhbmdlIGlzIG1pc3NpbmchJyk7XG4gIH1cblxuICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXRDb252ZXJzYXRpb24obWVzc2FnZSwgY29udmVyc2F0aW9uU2VsZWN0b3IpO1xuXG4gIHJldHVybiB7XG4gICAgYXJlV2VBZG1pbjogQm9vbGVhbihjb252ZXJzYXRpb24uYXJlV2VBZG1pbiksXG4gICAgZ3JvdXBOYW1lOiBjb252ZXJzYXRpb24/LnR5cGUgPT09ICdncm91cCcgPyBjb252ZXJzYXRpb24/Lm5hbWUgOiB1bmRlZmluZWQsXG4gICAgZ3JvdXBNZW1iZXJzaGlwczogY29udmVyc2F0aW9uLm1lbWJlcnNoaXBzLFxuICAgIGdyb3VwQmFubmVkTWVtYmVyc2hpcHM6IGNvbnZlcnNhdGlvbi5iYW5uZWRNZW1iZXJzaGlwcyxcbiAgICBvdXJVdWlkLFxuICAgIGNoYW5nZSxcbiAgfTtcbn1cblxuLy8gR3JvdXBWMSBNaWdyYXRpb25cblxuZXhwb3J0IGZ1bmN0aW9uIGlzR3JvdXBWMU1pZ3JhdGlvbihtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbWVzc2FnZS50eXBlID09PSAnZ3JvdXAtdjEtbWlncmF0aW9uJztcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcHNGb3JHcm91cFYxTWlncmF0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgeyBjb252ZXJzYXRpb25TZWxlY3RvciB9OiBHZXRQcm9wc0ZvckJ1YmJsZU9wdGlvbnNcbik6IEdyb3VwVjFNaWdyYXRpb25Qcm9wc1R5cGUge1xuICBjb25zdCBtaWdyYXRpb24gPSBtZXNzYWdlLmdyb3VwTWlncmF0aW9uO1xuICBpZiAoIW1pZ3JhdGlvbikge1xuICAgIC8vIEJhY2t3YXJkcy1jb21wYXRpYmlsaXR5IHdpdGggZGF0YSBzY2hlbWEgaW4gZWFybHkgYmV0YXNcbiAgICBjb25zdCBpbnZpdGVkR1YyTWVtYmVycyA9IG1lc3NhZ2UuaW52aXRlZEdWMk1lbWJlcnMgfHwgW107XG4gICAgY29uc3QgZHJvcHBlZEdWMk1lbWJlcklkcyA9IG1lc3NhZ2UuZHJvcHBlZEdWMk1lbWJlcklkcyB8fCBbXTtcblxuICAgIGNvbnN0IGludml0ZWRNZW1iZXJzID0gaW52aXRlZEdWMk1lbWJlcnMubWFwKGl0ZW0gPT5cbiAgICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yKGl0ZW0udXVpZClcbiAgICApO1xuICAgIGNvbnN0IGRyb3BwZWRNZW1iZXJzID0gZHJvcHBlZEdWMk1lbWJlcklkcy5tYXAoY29udmVyc2F0aW9uSWQgPT5cbiAgICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yKGNvbnZlcnNhdGlvbklkKVxuICAgICk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYXJlV2VJbnZpdGVkOiBmYWxzZSxcbiAgICAgIGRyb3BwZWRNZW1iZXJzLFxuICAgICAgaW52aXRlZE1lbWJlcnMsXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHtcbiAgICBhcmVXZUludml0ZWQsXG4gICAgZHJvcHBlZE1lbWJlcklkcyxcbiAgICBpbnZpdGVkTWVtYmVyczogcmF3SW52aXRlZE1lbWJlcnMsXG4gIH0gPSBtaWdyYXRpb247XG4gIGNvbnN0IGludml0ZWRNZW1iZXJzID0gcmF3SW52aXRlZE1lbWJlcnMubWFwKGl0ZW0gPT5cbiAgICBjb252ZXJzYXRpb25TZWxlY3RvcihpdGVtLnV1aWQpXG4gICk7XG4gIGNvbnN0IGRyb3BwZWRNZW1iZXJzID0gZHJvcHBlZE1lbWJlcklkcy5tYXAoY29udmVyc2F0aW9uSWQgPT5cbiAgICBjb252ZXJzYXRpb25TZWxlY3Rvcihjb252ZXJzYXRpb25JZClcbiAgKTtcblxuICByZXR1cm4ge1xuICAgIGFyZVdlSW52aXRlZCxcbiAgICBkcm9wcGVkTWVtYmVycyxcbiAgICBpbnZpdGVkTWVtYmVycyxcbiAgfTtcbn1cblxuLy8gTm90ZTogcHJvcHMgYXJlIG51bGwhXG5cbi8vIEV4cGlyYXRpb24gVGltZXIgVXBkYXRlXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0V4cGlyYXRpb25UaW1lclVwZGF0ZShcbiAgbWVzc2FnZTogUGljazxNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSwgJ2ZsYWdzJz5cbik6IGJvb2xlYW4ge1xuICBjb25zdCBmbGFnID0gUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuRVhQSVJBVElPTl9USU1FUl9VUERBVEU7XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiBCb29sZWFuKG1lc3NhZ2UuZmxhZ3MgJiYgbWVzc2FnZS5mbGFncyAmIGZsYWcpO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wc0ZvclRpbWVyTm90aWZpY2F0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgeyBvdXJDb252ZXJzYXRpb25JZCwgY29udmVyc2F0aW9uU2VsZWN0b3IgfTogR2V0UHJvcHNGb3JCdWJibGVPcHRpb25zXG4pOiBUaW1lck5vdGlmaWNhdGlvblByb3BzIHtcbiAgY29uc3QgdGltZXJVcGRhdGUgPSBtZXNzYWdlLmV4cGlyYXRpb25UaW1lclVwZGF0ZTtcbiAgaWYgKCF0aW1lclVwZGF0ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdnZXRQcm9wc0ZvclRpbWVyTm90aWZpY2F0aW9uOiBtaXNzaW5nIGV4cGlyYXRpb25UaW1lclVwZGF0ZSEnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHsgZXhwaXJlVGltZXIsIGZyb21TeW5jLCBzb3VyY2UsIHNvdXJjZVV1aWQgfSA9IHRpbWVyVXBkYXRlO1xuICBjb25zdCBkaXNhYmxlZCA9ICFleHBpcmVUaW1lcjtcbiAgY29uc3Qgc291cmNlSWQgPSBzb3VyY2VVdWlkIHx8IHNvdXJjZTtcbiAgY29uc3QgZm9ybWF0dGVkQ29udGFjdCA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKHNvdXJjZUlkKTtcblxuICBjb25zdCBiYXNpY1Byb3BzID0ge1xuICAgIC4uLmZvcm1hdHRlZENvbnRhY3QsXG4gICAgZGlzYWJsZWQsXG4gICAgZXhwaXJlVGltZXIsXG4gICAgdHlwZTogJ2Zyb21PdGhlcicgYXMgY29uc3QsXG4gIH07XG5cbiAgaWYgKGZyb21TeW5jKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2ljUHJvcHMsXG4gICAgICB0eXBlOiAnZnJvbVN5bmMnIGFzIGNvbnN0LFxuICAgIH07XG4gIH1cbiAgaWYgKGZvcm1hdHRlZENvbnRhY3QuaWQgPT09IG91ckNvbnZlcnNhdGlvbklkKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLmJhc2ljUHJvcHMsXG4gICAgICB0eXBlOiAnZnJvbU1lJyBhcyBjb25zdCxcbiAgICB9O1xuICB9XG4gIGlmICghc291cmNlSWQpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uYmFzaWNQcm9wcyxcbiAgICAgIHR5cGU6ICdmcm9tTWVtYmVyJyBhcyBjb25zdCxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIGJhc2ljUHJvcHM7XG59XG5cbi8vIEtleSBDaGFuZ2VcblxuZXhwb3J0IGZ1bmN0aW9uIGlzS2V5Q2hhbmdlKG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiBtZXNzYWdlLnR5cGUgPT09ICdrZXljaGFuZ2UnO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wc0ZvclNhZmV0eU51bWJlck5vdGlmaWNhdGlvbihcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gIHsgY29udmVyc2F0aW9uU2VsZWN0b3IgfTogR2V0UHJvcHNGb3JCdWJibGVPcHRpb25zXG4pOiBTYWZldHlOdW1iZXJOb3RpZmljYXRpb25Qcm9wcyB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLCBjb252ZXJzYXRpb25TZWxlY3Rvcik7XG4gIGNvbnN0IGlzR3JvdXAgPSBjb252ZXJzYXRpb24/LnR5cGUgPT09ICdncm91cCc7XG4gIGNvbnN0IGlkZW50aWZpZXIgPSBtZXNzYWdlLmtleV9jaGFuZ2VkO1xuICBjb25zdCBjb250YWN0ID0gY29udmVyc2F0aW9uU2VsZWN0b3IoaWRlbnRpZmllcik7XG5cbiAgcmV0dXJuIHtcbiAgICBpc0dyb3VwLFxuICAgIGNvbnRhY3QsXG4gIH07XG59XG5cbi8vIFZlcmlmaWVkIENoYW5nZVxuXG5leHBvcnQgZnVuY3Rpb24gaXNWZXJpZmllZENoYW5nZShtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbWVzc2FnZS50eXBlID09PSAndmVyaWZpZWQtY2hhbmdlJztcbn1cblxuZnVuY3Rpb24gZ2V0UHJvcHNGb3JWZXJpZmljYXRpb25Ob3RpZmljYXRpb24oXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICB7IGNvbnZlcnNhdGlvblNlbGVjdG9yIH06IEdldFByb3BzRm9yQnViYmxlT3B0aW9uc1xuKTogVmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uUHJvcHMge1xuICBjb25zdCB0eXBlID0gbWVzc2FnZS52ZXJpZmllZCA/ICdtYXJrVmVyaWZpZWQnIDogJ21hcmtOb3RWZXJpZmllZCc7XG4gIGNvbnN0IGlzTG9jYWwgPSBtZXNzYWdlLmxvY2FsIHx8IGZhbHNlO1xuICBjb25zdCBpZGVudGlmaWVyID0gbWVzc2FnZS52ZXJpZmllZENoYW5nZWQ7XG5cbiAgcmV0dXJuIHtcbiAgICB0eXBlLFxuICAgIGlzTG9jYWwsXG4gICAgY29udGFjdDogY29udmVyc2F0aW9uU2VsZWN0b3IoaWRlbnRpZmllciksXG4gIH07XG59XG5cbi8vIEdpZnQgQmFkZ2VcblxuZXhwb3J0IGZ1bmN0aW9uIGlzR2lmdEJhZGdlKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAnZ2lmdEJhZGdlJz5cbik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihtZXNzYWdlLmdpZnRCYWRnZSk7XG59XG5cbi8vIEdyb3VwIFVwZGF0ZSAoVjEpXG5cbmV4cG9ydCBmdW5jdGlvbiBpc0dyb3VwVXBkYXRlKFxuICBtZXNzYWdlOiBQaWNrPE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLCAnZ3JvdXBfdXBkYXRlJz5cbik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihtZXNzYWdlLmdyb3VwX3VwZGF0ZSk7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BzRm9yR3JvdXBOb3RpZmljYXRpb24oXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICBvcHRpb25zOiBHZXRDb250YWN0T3B0aW9uc1xuKTogR3JvdXBOb3RpZmljYXRpb25Qcm9wcyB7XG4gIGNvbnN0IGdyb3VwVXBkYXRlID0gbWVzc2FnZS5ncm91cF91cGRhdGU7XG4gIGlmICghZ3JvdXBVcGRhdGUpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZ2V0UHJvcHNGb3JHcm91cE5vdGlmaWNhdGlvbjogTWVzc2FnZSBtaXNzaW5nIGdyb3VwX3VwZGF0ZSdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgeyBjb252ZXJzYXRpb25TZWxlY3RvciB9ID0gb3B0aW9ucztcblxuICBjb25zdCBjaGFuZ2VzID0gW107XG5cbiAgaWYgKFxuICAgICFncm91cFVwZGF0ZS5hdmF0YXJVcGRhdGVkICYmXG4gICAgIWdyb3VwVXBkYXRlLmxlZnQgJiZcbiAgICAhZ3JvdXBVcGRhdGUuam9pbmVkICYmXG4gICAgIWdyb3VwVXBkYXRlLm5hbWVcbiAgKSB7XG4gICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgIHR5cGU6ICdnZW5lcmFsJyBhcyBDaGFuZ2VUeXBlLFxuICAgIH0pO1xuICB9XG5cbiAgaWYgKGdyb3VwVXBkYXRlLmpvaW5lZD8ubGVuZ3RoKSB7XG4gICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgIHR5cGU6ICdhZGQnIGFzIENoYW5nZVR5cGUsXG4gICAgICBjb250YWN0czogbWFwKFxuICAgICAgICBBcnJheS5pc0FycmF5KGdyb3VwVXBkYXRlLmpvaW5lZClcbiAgICAgICAgICA/IGdyb3VwVXBkYXRlLmpvaW5lZFxuICAgICAgICAgIDogW2dyb3VwVXBkYXRlLmpvaW5lZF0sXG4gICAgICAgIGlkZW50aWZpZXIgPT4gY29udmVyc2F0aW9uU2VsZWN0b3IoaWRlbnRpZmllcilcbiAgICAgICksXG4gICAgfSk7XG4gIH1cblxuICBpZiAoZ3JvdXBVcGRhdGUubGVmdCA9PT0gJ1lvdScpIHtcbiAgICBjaGFuZ2VzLnB1c2goe1xuICAgICAgdHlwZTogJ3JlbW92ZScgYXMgQ2hhbmdlVHlwZSxcbiAgICB9KTtcbiAgfSBlbHNlIGlmIChncm91cFVwZGF0ZS5sZWZ0KSB7XG4gICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgIHR5cGU6ICdyZW1vdmUnIGFzIENoYW5nZVR5cGUsXG4gICAgICBjb250YWN0czogbWFwKFxuICAgICAgICBBcnJheS5pc0FycmF5KGdyb3VwVXBkYXRlLmxlZnQpID8gZ3JvdXBVcGRhdGUubGVmdCA6IFtncm91cFVwZGF0ZS5sZWZ0XSxcbiAgICAgICAgaWRlbnRpZmllciA9PiBjb252ZXJzYXRpb25TZWxlY3RvcihpZGVudGlmaWVyKVxuICAgICAgKSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChncm91cFVwZGF0ZS5uYW1lKSB7XG4gICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgIHR5cGU6ICduYW1lJyBhcyBDaGFuZ2VUeXBlLFxuICAgICAgbmV3TmFtZTogZ3JvdXBVcGRhdGUubmFtZSxcbiAgICB9KTtcbiAgfVxuXG4gIGlmIChncm91cFVwZGF0ZS5hdmF0YXJVcGRhdGVkKSB7XG4gICAgY2hhbmdlcy5wdXNoKHtcbiAgICAgIHR5cGU6ICdhdmF0YXInIGFzIENoYW5nZVR5cGUsXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBmcm9tID0gZ2V0Q29udGFjdChtZXNzYWdlLCBvcHRpb25zKTtcblxuICByZXR1cm4ge1xuICAgIGZyb20sXG4gICAgY2hhbmdlcyxcbiAgfTtcbn1cblxuLy8gRW5kIFNlc3Npb25cblxuZXhwb3J0IGZ1bmN0aW9uIGlzRW5kU2Vzc2lvbihcbiAgbWVzc2FnZTogUGljazxNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSwgJ2ZsYWdzJz5cbik6IGJvb2xlYW4ge1xuICBjb25zdCBmbGFnID0gUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuRU5EX1NFU1NJT047XG4gIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1iaXR3aXNlXG4gIHJldHVybiBCb29sZWFuKG1lc3NhZ2UuZmxhZ3MgJiYgbWVzc2FnZS5mbGFncyAmIGZsYWcpO1xufVxuXG4vLyBDYWxsIEhpc3RvcnlcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2FsbEhpc3RvcnkobWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUpOiBib29sZWFuIHtcbiAgcmV0dXJuIG1lc3NhZ2UudHlwZSA9PT0gJ2NhbGwtaGlzdG9yeSc7XG59XG5cbmV4cG9ydCB0eXBlIEdldFByb3BzRm9yQ2FsbEhpc3RvcnlPcHRpb25zID0gUGljazxcbiAgR2V0UHJvcHNGb3JCdWJibGVPcHRpb25zLFxuICAnY29udmVyc2F0aW9uU2VsZWN0b3InIHwgJ2NhbGxTZWxlY3RvcicgfCAnYWN0aXZlQ2FsbCdcbj47XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRQcm9wc0ZvckNhbGxIaXN0b3J5KFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAge1xuICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yLFxuICAgIGNhbGxTZWxlY3RvcixcbiAgICBhY3RpdmVDYWxsLFxuICB9OiBHZXRQcm9wc0ZvckNhbGxIaXN0b3J5T3B0aW9uc1xuKTogQ2FsbGluZ05vdGlmaWNhdGlvblR5cGUge1xuICBjb25zdCB7IGNhbGxIaXN0b3J5RGV0YWlscyB9ID0gbWVzc2FnZTtcbiAgaWYgKCFjYWxsSGlzdG9yeURldGFpbHMpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldFByb3BzRm9yQ2FsbEhpc3Rvcnk6IE1pc3NpbmcgY2FsbEhpc3RvcnlEZXRhaWxzJyk7XG4gIH1cblxuICBjb25zdCBhY3RpdmVDYWxsQ29udmVyc2F0aW9uSWQgPSBhY3RpdmVDYWxsPy5jb252ZXJzYXRpb25JZDtcblxuICBzd2l0Y2ggKGNhbGxIaXN0b3J5RGV0YWlscy5jYWxsTW9kZSkge1xuICAgIC8vIE9sZCBtZXNzYWdlcyB3ZXJlbid0IHNhdmVkIHdpdGggYSBjYWxsIG1vZGUuXG4gICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5jYWxsSGlzdG9yeURldGFpbHMsXG4gICAgICAgIGFjdGl2ZUNhbGxDb252ZXJzYXRpb25JZCxcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgIH07XG4gICAgY2FzZSBDYWxsTW9kZS5Hcm91cDoge1xuICAgICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gbWVzc2FnZTtcbiAgICAgIGlmICghY29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRQcm9wc0ZvckNhbGxIaXN0b3J5OiBtaXNzaW5nIGNvbnZlcnNhdGlvbiBJRCcpO1xuICAgICAgfVxuXG4gICAgICBsZXQgY2FsbCA9IGNhbGxTZWxlY3Rvcihjb252ZXJzYXRpb25JZCk7XG4gICAgICBpZiAoY2FsbCAmJiBjYWxsLmNhbGxNb2RlICE9PSBDYWxsTW9kZS5Hcm91cCkge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ2dldFByb3BzRm9yQ2FsbEhpc3Rvcnk6IHRoZXJlIGlzIGFuIHVuZXhwZWN0ZWQgbm9uLWdyb3VwIGNhbGw7IHByZXRlbmRpbmcgaXQgZG9lcyBub3QgZXhpc3QnXG4gICAgICAgICk7XG4gICAgICAgIGNhbGwgPSB1bmRlZmluZWQ7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNyZWF0b3IgPSBjb252ZXJzYXRpb25TZWxlY3RvcihjYWxsSGlzdG9yeURldGFpbHMuY3JlYXRvclV1aWQpO1xuICAgICAgY29uc3QgZGV2aWNlQ291bnQgPSBjYWxsPy5wZWVrSW5mbz8uZGV2aWNlQ291bnQgPz8gMDtcblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYWN0aXZlQ2FsbENvbnZlcnNhdGlvbklkLFxuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBjcmVhdG9yLFxuICAgICAgICBkZXZpY2VDb3VudCxcbiAgICAgICAgZW5kZWQ6XG4gICAgICAgICAgY2FsbEhpc3RvcnlEZXRhaWxzLmVyYUlkICE9PSBjYWxsPy5wZWVrSW5mbz8uZXJhSWQgfHwgIWRldmljZUNvdW50LFxuICAgICAgICBtYXhEZXZpY2VzOiBjYWxsPy5wZWVrSW5mbz8ubWF4RGV2aWNlcyA/PyBJbmZpbml0eSxcbiAgICAgICAgc3RhcnRlZFRpbWU6IGNhbGxIaXN0b3J5RGV0YWlscy5zdGFydGVkVGltZSxcbiAgICAgIH07XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIGBnZXRQcm9wc0ZvckNhbGxIaXN0b3J5OiBtaXNzaW5nIGNhc2UgJHttaXNzaW5nQ2FzZUVycm9yKFxuICAgICAgICAgIGNhbGxIaXN0b3J5RGV0YWlsc1xuICAgICAgICApfWBcbiAgICAgICk7XG4gIH1cbn1cblxuLy8gUHJvZmlsZSBDaGFuZ2VcblxuZXhwb3J0IGZ1bmN0aW9uIGlzUHJvZmlsZUNoYW5nZShtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gbWVzc2FnZS50eXBlID09PSAncHJvZmlsZS1jaGFuZ2UnO1xufVxuXG5mdW5jdGlvbiBnZXRQcm9wc0ZvclByb2ZpbGVDaGFuZ2UoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICB7IGNvbnZlcnNhdGlvblNlbGVjdG9yIH06IEdldFByb3BzRm9yQnViYmxlT3B0aW9uc1xuKTogUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvblByb3BzVHlwZSB7XG4gIGNvbnN0IGNoYW5nZSA9IG1lc3NhZ2UucHJvZmlsZUNoYW5nZTtcbiAgY29uc3QgeyBjaGFuZ2VkSWQgfSA9IG1lc3NhZ2U7XG4gIGNvbnN0IGNoYW5nZWRDb250YWN0ID0gY29udmVyc2F0aW9uU2VsZWN0b3IoY2hhbmdlZElkKTtcblxuICBpZiAoIWNoYW5nZSkge1xuICAgIHRocm93IG5ldyBFcnJvcignZ2V0UHJvcHNGb3JQcm9maWxlQ2hhbmdlOiBwcm9maWxlQ2hhbmdlIGlzIHVuZGVmaW5lZCcpO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBjaGFuZ2VkQ29udGFjdCxcbiAgICBjaGFuZ2UsXG4gIH0gYXMgUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvblByb3BzVHlwZTtcbn1cblxuLy8gVW5pdmVyc2FsIFRpbWVyIE5vdGlmaWNhdGlvblxuXG4vLyBOb3RlOiBzbWFydCwgc28gcHJvcHMgbm90IGdlbmVyYXRlZCBoZXJlXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZVxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBtZXNzYWdlLnR5cGUgPT09ICd1bml2ZXJzYWwtdGltZXItbm90aWZpY2F0aW9uJztcbn1cblxuLy8gQ2hhbmdlIE51bWJlciBOb3RpZmljYXRpb25cblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZVxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBtZXNzYWdlLnR5cGUgPT09ICdjaGFuZ2UtbnVtYmVyLW5vdGlmaWNhdGlvbic7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BzRm9yQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uKFxuICBtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgeyBjb252ZXJzYXRpb25TZWxlY3RvciB9OiBHZXRQcm9wc0ZvckJ1YmJsZU9wdGlvbnNcbik6IENoYW5nZU51bWJlck5vdGlmaWNhdGlvblByb3BzIHtcbiAgcmV0dXJuIHtcbiAgICBzZW5kZXI6IGNvbnZlcnNhdGlvblNlbGVjdG9yKG1lc3NhZ2Uuc291cmNlVXVpZCksXG4gICAgdGltZXN0YW1wOiBtZXNzYWdlLnNlbnRfYXQsXG4gIH07XG59XG5cbi8vIENoYXQgU2Vzc2lvbiBSZWZyZXNoZWRcblxuZXhwb3J0IGZ1bmN0aW9uIGlzQ2hhdFNlc3Npb25SZWZyZXNoZWQoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlXG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIG1lc3NhZ2UudHlwZSA9PT0gJ2NoYXQtc2Vzc2lvbi1yZWZyZXNoZWQnO1xufVxuXG4vLyBOb3RlOiBwcm9wcyBhcmUgbnVsbFxuXG4vLyBEZWxpdmVyeSBJc3N1ZVxuXG5leHBvcnQgZnVuY3Rpb24gaXNEZWxpdmVyeUlzc3VlKG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlKTogYm9vbGVhbiB7XG4gIHJldHVybiBtZXNzYWdlLnR5cGUgPT09ICdkZWxpdmVyeS1pc3N1ZSc7XG59XG5cbmZ1bmN0aW9uIGdldFByb3BzRm9yRGVsaXZlcnlJc3N1ZShcbiAgbWVzc2FnZTogTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gIHsgY29udmVyc2F0aW9uU2VsZWN0b3IgfTogR2V0UHJvcHNGb3JCdWJibGVPcHRpb25zXG4pOiBEZWxpdmVyeUlzc3VlUHJvcHNUeXBlIHtcbiAgY29uc3Qgc2VuZGVyID0gY29udmVyc2F0aW9uU2VsZWN0b3IobWVzc2FnZS5zb3VyY2VVdWlkKTtcbiAgY29uc3QgY29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uU2VsZWN0b3IobWVzc2FnZS5jb252ZXJzYXRpb25JZCk7XG5cbiAgcmV0dXJuIHtcbiAgICBzZW5kZXIsXG4gICAgaW5Hcm91cDogY29udmVyc2F0aW9uLnR5cGUgPT09ICdncm91cCcsXG4gIH07XG59XG5cbi8vIE90aGVyIHV0aWxpdHkgZnVuY3Rpb25zXG5cbmV4cG9ydCBmdW5jdGlvbiBpc1RhcFRvVmlldyhtZXNzYWdlOiBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSk6IGJvb2xlYW4ge1xuICAvLyBJZiBhIG1lc3NhZ2UgaXMgZGVsZXRlZCBmb3IgZXZlcnlvbmUsIHRoYXQgb3ZlcnJpZGVzIGFsbCBvdGhlciBzdHlsaW5nXG4gIGlmIChtZXNzYWdlLmRlbGV0ZWRGb3JFdmVyeW9uZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBCb29sZWFuKG1lc3NhZ2UuaXNWaWV3T25jZSB8fCBtZXNzYWdlLm1lc3NhZ2VUaW1lcik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRNZXNzYWdlUHJvcFN0YXR1cyhcbiAgbWVzc2FnZTogUGljazxcbiAgICBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgICB8ICdkZWxldGVkRm9yRXZlcnlvbmUnXG4gICAgfCAnZGVsZXRlZEZvckV2ZXJ5b25lRmFpbGVkJ1xuICAgIHwgJ2RlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXMnXG4gICAgfCAnZXJyb3JzJ1xuICAgIHwgJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnXG4gICAgfCAndHlwZSdcbiAgPixcbiAgb3VyQ29udmVyc2F0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZFxuKTogTGFzdE1lc3NhZ2VTdGF0dXMgfCB1bmRlZmluZWQge1xuICBpZiAoIWlzT3V0Z29pbmcobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gaGFzRXJyb3JzKG1lc3NhZ2UpID8gJ2Vycm9yJyA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIGlmIChnZXRMYXN0Q2hhbGxlbmdlRXJyb3IobWVzc2FnZSkpIHtcbiAgICByZXR1cm4gJ3BhdXNlZCc7XG4gIH1cblxuICBjb25zdCB7XG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lLFxuICAgIGRlbGV0ZWRGb3JFdmVyeW9uZUZhaWxlZCxcbiAgICBkZWxldGVkRm9yRXZlcnlvbmVTZW5kU3RhdHVzLFxuICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSB7fSxcbiAgfSA9IG1lc3NhZ2U7XG5cbiAgLy8gTm90ZTogd2Ugb25seSBkbyBhbnl0aGluZyBoZXJlIGlmIGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXMgZXhpc3RzLCBiZWNhdXNlIG9sZFxuICAvLyAgIG1lc3NhZ2VzIGRlbGV0ZWQgZm9yIGV2ZXJ5b25lIHdvbid0IGhhdmUgc2VuZCBzdGF0dXMuXG4gIGlmIChkZWxldGVkRm9yRXZlcnlvbmUgJiYgZGVsZXRlZEZvckV2ZXJ5b25lU2VuZFN0YXR1cykge1xuICAgIGlmIChkZWxldGVkRm9yRXZlcnlvbmVGYWlsZWQpIHtcbiAgICAgIGNvbnN0IGFueVN1Y2Nlc3NmdWxTZW5kcyA9IE9iamVjdC52YWx1ZXMoXG4gICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXNcbiAgICAgICkuc29tZShpdGVtID0+IGl0ZW0pO1xuXG4gICAgICByZXR1cm4gYW55U3VjY2Vzc2Z1bFNlbmRzID8gJ3BhcnRpYWwtc2VudCcgOiAnZXJyb3InO1xuICAgIH1cbiAgICBjb25zdCBtaXNzaW5nU2VuZHMgPSBPYmplY3QudmFsdWVzKGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXMpLnNvbWUoXG4gICAgICBpdGVtID0+ICFpdGVtXG4gICAgKTtcbiAgICBpZiAobWlzc2luZ1NlbmRzKSB7XG4gICAgICByZXR1cm4gJ3NlbmRpbmcnO1xuICAgIH1cbiAgfVxuXG4gIGlmIChcbiAgICBvdXJDb252ZXJzYXRpb25JZCAmJlxuICAgIGlzTWVzc2FnZUp1c3RGb3JNZShzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBvdXJDb252ZXJzYXRpb25JZClcbiAgKSB7XG4gICAgY29uc3Qgc3RhdHVzID1cbiAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWRbb3VyQ29udmVyc2F0aW9uSWRdPy5zdGF0dXMgPz9cbiAgICAgIFNlbmRTdGF0dXMuUGVuZGluZztcbiAgICBjb25zdCBzZW50ID0gaXNTZW50KHN0YXR1cyk7XG4gICAgaWYgKFxuICAgICAgaGFzRXJyb3JzKG1lc3NhZ2UpIHx8XG4gICAgICBzb21lU2VuZFN0YXR1cyhzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBpc0ZhaWxlZClcbiAgICApIHtcbiAgICAgIHJldHVybiBzZW50ID8gJ3BhcnRpYWwtc2VudCcgOiAnZXJyb3InO1xuICAgIH1cbiAgICByZXR1cm4gc2VudCA/ICd2aWV3ZWQnIDogJ3NlbmRpbmcnO1xuICB9XG5cbiAgY29uc3Qgc2VuZFN0YXRlcyA9IE9iamVjdC52YWx1ZXMoXG4gICAgb3VyQ29udmVyc2F0aW9uSWRcbiAgICAgID8gb21pdChzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBvdXJDb252ZXJzYXRpb25JZClcbiAgICAgIDogc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFxuICApO1xuICBjb25zdCBoaWdoZXN0U3VjY2Vzc2Z1bFN0YXR1cyA9IHNlbmRTdGF0ZXMucmVkdWNlKFxuICAgIChyZXN1bHQ6IFNlbmRTdGF0dXMsIHsgc3RhdHVzIH0pID0+IG1heFN0YXR1cyhyZXN1bHQsIHN0YXR1cyksXG4gICAgU2VuZFN0YXR1cy5QZW5kaW5nXG4gICk7XG5cbiAgaWYgKFxuICAgIGhhc0Vycm9ycyhtZXNzYWdlKSB8fFxuICAgIHNvbWVTZW5kU3RhdHVzKHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsIGlzRmFpbGVkKVxuICApIHtcbiAgICByZXR1cm4gaXNTZW50KGhpZ2hlc3RTdWNjZXNzZnVsU3RhdHVzKSA/ICdwYXJ0aWFsLXNlbnQnIDogJ2Vycm9yJztcbiAgfVxuICBpZiAoaXNWaWV3ZWQoaGlnaGVzdFN1Y2Nlc3NmdWxTdGF0dXMpKSB7XG4gICAgcmV0dXJuICd2aWV3ZWQnO1xuICB9XG4gIGlmIChpc1JlYWQoaGlnaGVzdFN1Y2Nlc3NmdWxTdGF0dXMpKSB7XG4gICAgcmV0dXJuICdyZWFkJztcbiAgfVxuICBpZiAoaXNEZWxpdmVyZWQoaGlnaGVzdFN1Y2Nlc3NmdWxTdGF0dXMpKSB7XG4gICAgcmV0dXJuICdkZWxpdmVyZWQnO1xuICB9XG4gIGlmIChpc1NlbnQoaGlnaGVzdFN1Y2Nlc3NmdWxTdGF0dXMpKSB7XG4gICAgcmV0dXJuICdzZW50JztcbiAgfVxuICByZXR1cm4gJ3NlbmRpbmcnO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcHNGb3JFbWJlZGRlZENvbnRhY3QoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGFjY291bnRTZWxlY3RvcjogKGlkZW50aWZpZXI/OiBzdHJpbmcpID0+IFVVSURTdHJpbmdUeXBlIHwgdW5kZWZpbmVkXG4pOiBFbWJlZGRlZENvbnRhY3RUeXBlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgY29udGFjdHMgPSBtZXNzYWdlLmNvbnRhY3Q7XG4gIGlmICghY29udGFjdHMgfHwgIWNvbnRhY3RzLmxlbmd0aCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBmaXJzdENvbnRhY3QgPSBjb250YWN0c1swXTtcbiAgY29uc3QgbnVtYmVycyA9IGZpcnN0Q29udGFjdD8ubnVtYmVyO1xuICBjb25zdCBmaXJzdE51bWJlciA9IG51bWJlcnMgJiYgbnVtYmVyc1swXSA/IG51bWJlcnNbMF0udmFsdWUgOiB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIGVtYmVkZGVkQ29udGFjdFNlbGVjdG9yKGZpcnN0Q29udGFjdCwge1xuICAgIHJlZ2lvbkNvZGUsXG4gICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aDpcbiAgICAgIHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5nZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoLFxuICAgIGZpcnN0TnVtYmVyLFxuICAgIHV1aWQ6IGFjY291bnRTZWxlY3RvcihmaXJzdE51bWJlciksXG4gIH0pO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UHJvcHNGb3JBdHRhY2htZW50KFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuKTogQXR0YWNobWVudFR5cGUgfCB1bmRlZmluZWQge1xuICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgeyBwYXRoLCBwZW5kaW5nLCBzaXplLCBzY3JlZW5zaG90LCB0aHVtYm5haWwgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgcmV0dXJuIHtcbiAgICAuLi5hdHRhY2htZW50LFxuICAgIGZpbGVTaXplOiBzaXplID8gZmlsZXNpemUoc2l6ZSkgOiB1bmRlZmluZWQsXG4gICAgaXNWb2ljZU1lc3NhZ2U6IGlzVm9pY2VNZXNzYWdlKGF0dGFjaG1lbnQpLFxuICAgIHBlbmRpbmcsXG4gICAgdXJsOiBwYXRoXG4gICAgICA/IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5nZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKHBhdGgpXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBzY3JlZW5zaG90OiBzY3JlZW5zaG90Py5wYXRoXG4gICAgICA/IHtcbiAgICAgICAgICAuLi5zY3JlZW5zaG90LFxuICAgICAgICAgIHVybDogd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlQXR0YWNobWVudFBhdGgoXG4gICAgICAgICAgICBzY3JlZW5zaG90LnBhdGhcbiAgICAgICAgICApLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICB0aHVtYm5haWw6IHRodW1ibmFpbD8ucGF0aFxuICAgICAgPyB7XG4gICAgICAgICAgLi4udGh1bWJuYWlsLFxuICAgICAgICAgIHVybDogd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmdldEFic29sdXRlQXR0YWNobWVudFBhdGgoXG4gICAgICAgICAgICB0aHVtYm5haWwucGF0aFxuICAgICAgICAgICksXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICB9O1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzUXVvdGVBdHRhY2htZW50KFxuICBhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZVxuKTogUXVvdGVkQXR0YWNobWVudFR5cGUge1xuICBjb25zdCB7IHRodW1ibmFpbCB9ID0gYXR0YWNobWVudDtcbiAgY29uc3QgcGF0aCA9XG4gICAgdGh1bWJuYWlsICYmXG4gICAgdGh1bWJuYWlsLnBhdGggJiZcbiAgICB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCh0aHVtYm5haWwucGF0aCk7XG4gIGNvbnN0IG9iamVjdFVybCA9IHRodW1ibmFpbCAmJiB0aHVtYm5haWwub2JqZWN0VXJsO1xuXG4gIGNvbnN0IHRodW1ibmFpbFdpdGhPYmplY3RVcmwgPVxuICAgICghcGF0aCAmJiAhb2JqZWN0VXJsKSB8fCAhdGh1bWJuYWlsXG4gICAgICA/IHVuZGVmaW5lZFxuICAgICAgOiB7IC4uLnRodW1ibmFpbCwgb2JqZWN0VXJsOiBwYXRoIHx8IG9iamVjdFVybCB9O1xuXG4gIHJldHVybiB7XG4gICAgLi4uYXR0YWNobWVudCxcbiAgICBpc1ZvaWNlTWVzc2FnZTogaXNWb2ljZU1lc3NhZ2UoYXR0YWNobWVudCksXG4gICAgdGh1bWJuYWlsOiB0aHVtYm5haWxXaXRoT2JqZWN0VXJsLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjYW5SZXBseU9yUmVhY3QoXG4gIG1lc3NhZ2U6IFBpY2s8XG4gICAgTWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsXG4gICAgJ2RlbGV0ZWRGb3JFdmVyeW9uZScgfCAnc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCcgfCAndHlwZSdcbiAgPixcbiAgb3VyQ29udmVyc2F0aW9uSWQ6IHN0cmluZyB8IHVuZGVmaW5lZCxcbiAgY29udmVyc2F0aW9uOiB1bmRlZmluZWQgfCBSZWFkb25seTxDb252ZXJzYXRpb25UeXBlPlxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IHsgZGVsZXRlZEZvckV2ZXJ5b25lLCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkIH0gPSBtZXNzYWdlO1xuXG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGNvbnZlcnNhdGlvbi5pc0dyb3VwVjFBbmREaXNhYmxlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc01pc3NpbmdSZXF1aXJlZFByb2ZpbGVTaGFyaW5nKGNvbnZlcnNhdGlvbikpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIWNvbnZlcnNhdGlvbi5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaWYgKGRlbGV0ZWRGb3JFdmVyeW9uZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChpc091dGdvaW5nKG1lc3NhZ2UpKSB7XG4gICAgcmV0dXJuIChcbiAgICAgIGlzTWVzc2FnZUp1c3RGb3JNZShzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBvdXJDb252ZXJzYXRpb25JZCkgfHxcbiAgICAgIHNvbWVTZW5kU3RhdHVzKFxuICAgICAgICBvdXJDb252ZXJzYXRpb25JZFxuICAgICAgICAgID8gb21pdChzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBvdXJDb252ZXJzYXRpb25JZClcbiAgICAgICAgICA6IHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgIGlzU2VudFxuICAgICAgKVxuICAgICk7XG4gIH1cblxuICAvLyBJZiB3ZSBnZXQgcGFzdCBhbGwgdGhlIG90aGVyIGNoZWNrcyBhYm92ZSB0aGVuIHdlIGNhbiBhbHdheXMgcmVwbHkgb3JcbiAgLy8gcmVhY3QgaWYgdGhlIG1lc3NhZ2UgdHlwZSBpcyBcImluY29taW5nXCIgfCBcInN0b3J5XCJcbiAgaWYgKGlzSW5jb21pbmcobWVzc2FnZSkgfHwgaXNTdG9yeShtZXNzYWdlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgLy8gRmFpbCBzYWZlLlxuICByZXR1cm4gZmFsc2U7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5SZXBseShcbiAgbWVzc2FnZTogUGljazxcbiAgICBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgICB8ICdjb252ZXJzYXRpb25JZCdcbiAgICB8ICdkZWxldGVkRm9yRXZlcnlvbmUnXG4gICAgfCAnc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCdcbiAgICB8ICd0eXBlJ1xuICA+LFxuICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICBjb252ZXJzYXRpb25TZWxlY3RvcjogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGVcbik6IGJvb2xlYW4ge1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXRDb252ZXJzYXRpb24obWVzc2FnZSwgY29udmVyc2F0aW9uU2VsZWN0b3IpO1xuICBpZiAoXG4gICAgIWNvbnZlcnNhdGlvbiB8fFxuICAgIChjb252ZXJzYXRpb24uYW5ub3VuY2VtZW50c09ubHkgJiYgIWNvbnZlcnNhdGlvbi5hcmVXZUFkbWluKVxuICApIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cbiAgcmV0dXJuIGNhblJlcGx5T3JSZWFjdChtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCwgY29udmVyc2F0aW9uKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhblJlYWN0KFxuICBtZXNzYWdlOiBQaWNrPFxuICAgIE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICAgIHwgJ2NvbnZlcnNhdGlvbklkJ1xuICAgIHwgJ2RlbGV0ZWRGb3JFdmVyeW9uZSdcbiAgICB8ICdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJ1xuICAgIHwgJ3R5cGUnXG4gID4sXG4gIG91ckNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gIGNvbnZlcnNhdGlvblNlbGVjdG9yOiBHZXRDb252ZXJzYXRpb25CeUlkVHlwZVxuKTogYm9vbGVhbiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvbihtZXNzYWdlLCBjb252ZXJzYXRpb25TZWxlY3Rvcik7XG4gIHJldHVybiBjYW5SZXBseU9yUmVhY3QobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGNvbnZlcnNhdGlvbik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5EZWxldGVGb3JFdmVyeW9uZShcbiAgbWVzc2FnZTogUGljazxcbiAgICBNZXNzYWdlV2l0aFVJRmllbGRzVHlwZSxcbiAgICAndHlwZScgfCAnZGVsZXRlZEZvckV2ZXJ5b25lJyB8ICdzZW50X2F0JyB8ICdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJ1xuICA+XG4pOiBib29sZWFuIHtcbiAgcmV0dXJuIChcbiAgICAvLyBJcyB0aGlzIGEgbWVzc2FnZSBJIHNlbnQ/XG4gICAgaXNPdXRnb2luZyhtZXNzYWdlKSAmJlxuICAgIC8vIEhhcyB0aGUgbWVzc2FnZSBhbHJlYWR5IGJlZW4gZGVsZXRlZD9cbiAgICAhbWVzc2FnZS5kZWxldGVkRm9yRXZlcnlvbmUgJiZcbiAgICAvLyBJcyBpdCB0b28gb2xkIHRvIGRlbGV0ZT9cbiAgICBpc01vcmVSZWNlbnRUaGFuKG1lc3NhZ2Uuc2VudF9hdCwgVEhSRUVfSE9VUlMpICYmXG4gICAgLy8gSXMgaXQgc2VudCB0byBhbnlvbmU/XG4gICAgc29tZVNlbmRTdGF0dXMobWVzc2FnZS5zZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBpc1NlbnQpXG4gICk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5SZXRyeURlbGV0ZUZvckV2ZXJ5b25lKFxuICBtZXNzYWdlOiBQaWNrPFxuICAgIE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICAgICdkZWxldGVkRm9yRXZlcnlvbmUnIHwgJ2RlbGV0ZWRGb3JFdmVyeW9uZUZhaWxlZCcgfCAnc2VudF9hdCdcbiAgPlxuKTogYm9vbGVhbiB7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIG1lc3NhZ2UuZGVsZXRlZEZvckV2ZXJ5b25lICYmXG4gICAgICBtZXNzYWdlLmRlbGV0ZWRGb3JFdmVyeW9uZUZhaWxlZCAmJlxuICAgICAgLy8gSXMgaXQgdG9vIG9sZCB0byBkZWxldGU/XG4gICAgICBpc01vcmVSZWNlbnRUaGFuKG1lc3NhZ2Uuc2VudF9hdCwgREFZKVxuICApO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gY2FuRG93bmxvYWQoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VXaXRoVUlGaWVsZHNUeXBlLFxuICBjb252ZXJzYXRpb25TZWxlY3RvcjogR2V0Q29udmVyc2F0aW9uQnlJZFR5cGVcbik6IGJvb2xlYW4ge1xuICBpZiAoaXNPdXRnb2luZyhtZXNzYWdlKSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0Q29udmVyc2F0aW9uKG1lc3NhZ2UsIGNvbnZlcnNhdGlvblNlbGVjdG9yKTtcbiAgY29uc3QgaXNBY2NlcHRlZCA9IEJvb2xlYW4oXG4gICAgY29udmVyc2F0aW9uICYmIGNvbnZlcnNhdGlvbi5hY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0XG4gICk7XG4gIGlmICghaXNBY2NlcHRlZCkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIC8vIEVuc3VyZSB0aGF0IGFsbCBhdHRhY2htZW50cyBhcmUgZG93bmxvYWRhYmxlXG4gIGNvbnN0IHsgYXR0YWNobWVudHMgfSA9IG1lc3NhZ2U7XG4gIGlmIChhdHRhY2htZW50cyAmJiBhdHRhY2htZW50cy5sZW5ndGgpIHtcbiAgICByZXR1cm4gYXR0YWNobWVudHMuZXZlcnkoYXR0YWNobWVudCA9PiBCb29sZWFuKGF0dGFjaG1lbnQucGF0aCkpO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRMYXN0Q2hhbGxlbmdlRXJyb3IoXG4gIG1lc3NhZ2U6IFBpY2s8TWVzc2FnZVdpdGhVSUZpZWxkc1R5cGUsICdlcnJvcnMnPlxuKTogU2hhbGxvd0NoYWxsZW5nZUVycm9yIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBlcnJvcnMgfSA9IG1lc3NhZ2U7XG4gIGlmICghZXJyb3JzKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGNoYWxsZW5nZUVycm9ycyA9IGVycm9yc1xuICAgIC5maWx0ZXIoKGVycm9yKTogZXJyb3IgaXMgU2hhbGxvd0NoYWxsZW5nZUVycm9yID0+IHtcbiAgICAgIHJldHVybiAoXG4gICAgICAgIGVycm9yLm5hbWUgPT09ICdTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yJyAmJlxuICAgICAgICBpc051bWJlcihlcnJvci5yZXRyeUFmdGVyKSAmJlxuICAgICAgICBpc09iamVjdChlcnJvci5kYXRhKVxuICAgICAgKTtcbiAgICB9KVxuICAgIC5zb3J0KChhLCBiKSA9PiBhLnJldHJ5QWZ0ZXIgLSBiLnJldHJ5QWZ0ZXIpO1xuXG4gIHJldHVybiBjaGFsbGVuZ2VFcnJvcnMucG9wKCk7XG59XG4iXSwKICAibWFw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
