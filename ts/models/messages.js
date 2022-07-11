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
var messages_exports = {};
__export(messages_exports, {
  MessageModel: () => MessageModel
});
module.exports = __toCommonJS(messages_exports);
var import_lodash = require("lodash");
var import_iterables = require("../util/iterables");
var import_isNotNil = require("../util/isNotNil");
var import_isNormalNumber = require("../util/isNormalNumber");
var import_assert = require("../util/assert");
var import_missingCaseError = require("../util/missingCaseError");
var import_dropNull = require("../util/dropNull");
var import_callingNotification = require("../util/callingNotification");
var import_Errors = require("../textsecure/Errors");
var expirationTimer = __toESM(require("../util/expirationTimer"));
var import_userLanguages = require("../util/userLanguages");
var import_UUID = require("../types/UUID");
var reactionUtil = __toESM(require("../reactions/util"));
var Stickers = __toESM(require("../types/Stickers"));
var Errors = __toESM(require("../types/errors"));
var EmbeddedContact = __toESM(require("../types/EmbeddedContact"));
var import_Attachment = require("../types/Attachment");
var Attachment = __toESM(require("../types/Attachment"));
var import_MIME = require("../types/MIME");
var MIME = __toESM(require("../types/MIME"));
var GroupChange = __toESM(require("../groupChange"));
var import_MessageReadStatus = require("../messages/MessageReadStatus");
var import_MessageSendState = require("../messages/MessageSendState");
var import_migrateLegacyReadStatus = require("../messages/migrateLegacyReadStatus");
var import_migrateLegacySendAttributes = require("../messages/migrateLegacySendAttributes");
var import_getOwn = require("../util/getOwn");
var import_MessageUpdater = require("../services/MessageUpdater");
var import_isMessageUnread = require("../util/isMessageUnread");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_handleMessageSend = require("../util/handleMessageSend");
var import_getSendOptions = require("../util/getSendOptions");
var import_findAndFormatContact = require("../util/findAndFormatContact");
var import_message = require("../state/selectors/message");
var import_calling = require("../state/selectors/calling");
var import_accounts = require("../state/selectors/accounts");
var import_conversations = require("../state/selectors/conversations");
var import_MessageReceipts = require("../messageModifiers/MessageReceipts");
var import_Deletes = require("../messageModifiers/Deletes");
var import_Reactions = require("../messageModifiers/Reactions");
var import_ReactionSource = require("../reactions/ReactionSource");
var import_ReadSyncs = require("../messageModifiers/ReadSyncs");
var import_ViewSyncs = require("../messageModifiers/ViewSyncs");
var import_ViewOnceOpenSyncs = require("../messageModifiers/ViewOnceOpenSyncs");
var LinkPreview = __toESM(require("../types/LinkPreview"));
var import_protobuf = require("../protobuf");
var import_conversationJobQueue = require("../jobs/conversationJobQueue");
var import_notifications = require("../services/notifications");
var log = __toESM(require("../logging/log"));
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_cleanup = require("../util/cleanup");
var import_helpers = require("../messages/helpers");
var import_viewOnceOpenJobQueue = require("../jobs/viewOnceOpenJobQueue");
var import_idForLogging = require("../util/idForLogging");
var import_hasAttachmentDownloads = require("../util/hasAttachmentDownloads");
var import_queueAttachmentDownloads = require("../util/queueAttachmentDownloads");
var import_findStoryMessage = require("../util/findStoryMessage");
var import_isConversationAccepted = require("../util/isConversationAccepted");
var import_storyLoader = require("../services/storyLoader");
var import_getMessageById = require("../messages/getMessageById");
var import_shouldDownloadStory = require("../util/shouldDownloadStory");
var import_stories = require("../state/selectors/stories");
var import_MessageSeenStatus = require("../MessageSeenStatus");
var import_util = require("../reactions/util");
var import_parseBadgesFromServer = require("../badges/parseBadgesFromServer");
var import_Message = require("../components/conversation/Message");
var import_downloadAttachment = require("../util/downloadAttachment");
window.Whisper = window.Whisper || {};
const { Message: TypedMessage } = window.Signal.Types;
const { upgradeMessageSchema } = window.Signal.Migrations;
const { getTextWithMentions, GoogleChrome } = window.Signal.Util;
const { getMessageBySender } = window.Signal.Data;
class MessageModel extends window.Backbone.Model {
  initialize(attributes) {
    if (_.isObject(attributes)) {
      this.set(TypedMessage.initializeSchemaVersion({
        message: attributes,
        logger: log
      }));
    }
    const readStatus = (0, import_migrateLegacyReadStatus.migrateLegacyReadStatus)(this.attributes);
    if (readStatus !== void 0) {
      this.set({
        readStatus,
        seenStatus: readStatus === import_MessageReadStatus.ReadStatus.Unread ? import_MessageSeenStatus.SeenStatus.Unseen : import_MessageSeenStatus.SeenStatus.Seen
      }, { silent: true });
    }
    const sendStateByConversationId = (0, import_migrateLegacySendAttributes.migrateLegacySendAttributes)(this.attributes, window.ConversationController.get.bind(window.ConversationController), window.ConversationController.getOurConversationIdOrThrow());
    if (sendStateByConversationId) {
      this.set("sendStateByConversationId", sendStateByConversationId, {
        silent: true
      });
    }
    this.CURRENT_PROTOCOL_VERSION = import_protobuf.SignalService.DataMessage.ProtocolVersion.CURRENT;
    this.INITIAL_PROTOCOL_VERSION = import_protobuf.SignalService.DataMessage.ProtocolVersion.INITIAL;
    this.on("change", this.notifyRedux);
  }
  notifyRedux() {
    const { storyChanged } = window.reduxActions.stories;
    if ((0, import_message.isStory)(this.attributes)) {
      const storyData = (0, import_storyLoader.getStoryDataFromMessageAttributes)(this.attributes);
      if (!storyData) {
        return;
      }
      storyChanged(storyData);
      return;
    }
    const { messageChanged } = window.reduxActions.conversations;
    if (messageChanged) {
      const conversationId = this.get("conversationId");
      messageChanged(this.id, conversationId, { ...this.attributes });
    }
  }
  getSenderIdentifier() {
    const sentAt = this.get("sent_at");
    const source = this.get("source");
    const sourceUuid = this.get("sourceUuid");
    const sourceDevice = this.get("sourceDevice");
    const sourceId = window.ConversationController.ensureContactIds({
      e164: source,
      uuid: sourceUuid
    });
    return `${sourceId}.${sourceDevice}-${sentAt}`;
  }
  getReceivedAt() {
    return Number(this.get("received_at_ms") || this.get("received_at"));
  }
  isNormalBubble() {
    const { attributes } = this;
    return !(0, import_message.isCallHistory)(attributes) && !(0, import_message.isChatSessionRefreshed)(attributes) && !(0, import_message.isEndSession)(attributes) && !(0, import_message.isExpirationTimerUpdate)(attributes) && !(0, import_message.isGroupUpdate)(attributes) && !(0, import_message.isGroupV2Change)(attributes) && !(0, import_message.isGroupV1Migration)(attributes) && !(0, import_message.isKeyChange)(attributes) && !(0, import_message.isProfileChange)(attributes) && !(0, import_message.isUniversalTimerNotification)(attributes) && !(0, import_message.isUnsupportedMessage)(attributes) && !(0, import_message.isVerifiedChange)(attributes);
  }
  async hydrateStoryContext(inMemoryMessage) {
    const storyId = this.get("storyId");
    if (!storyId) {
      return;
    }
    if (this.get("storyReplyContext")) {
      return;
    }
    const message = inMemoryMessage || await (0, import_getMessageById.getMessageById)(storyId);
    if (!message) {
      const conversation = this.getConversation();
      (0, import_assert.softAssert)(conversation && (0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes), "hydrateStoryContext: Not a type=direct conversation");
      this.set({
        storyReplyContext: {
          attachment: void 0,
          authorUuid: conversation?.get("uuid"),
          messageId: ""
        }
      });
      return;
    }
    const attachments = message.get("attachments");
    this.set({
      storyReplyContext: {
        attachment: attachments ? attachments[0] : void 0,
        authorUuid: message.get("sourceUuid"),
        messageId: message.get("id")
      }
    });
  }
  getPropsForMessageDetail(ourConversationId) {
    const newIdentity = window.i18n("newIdentity");
    const OUTGOING_KEY_ERROR = "OutgoingIdentityKeyError";
    const sendStateByConversationId = this.get("sendStateByConversationId") || {};
    const unidentifiedDeliveries = this.get("unidentifiedDeliveries") || [];
    const unidentifiedDeliveriesSet = new Set((0, import_iterables.map)(unidentifiedDeliveries, (identifier) => window.ConversationController.getConversationId(identifier)));
    let conversationIds;
    if ((0, import_message.isIncoming)(this.attributes)) {
      conversationIds = [(0, import_helpers.getContactId)(this.attributes)];
    } else if (!(0, import_lodash.isEmpty)(sendStateByConversationId)) {
      if ((0, import_MessageSendState.isMessageJustForMe)(sendStateByConversationId, ourConversationId)) {
        conversationIds = [ourConversationId];
      } else {
        conversationIds = Object.keys(sendStateByConversationId).filter((id) => id !== ourConversationId);
      }
    } else {
      conversationIds = (this.getConversation()?.getRecipients() || []).map((id) => window.ConversationController.getConversationId(id));
    }
    const allErrors = (this.get("errors") || []).map((error) => {
      if (error.name === OUTGOING_KEY_ERROR) {
        error.message = newIdentity;
      }
      return error;
    });
    const errors = _.reject(allErrors, (error) => Boolean(error.identifier || error.number));
    const errorsGroupedById = _.groupBy(allErrors, (error) => {
      const identifier = error.identifier || error.number;
      if (!identifier) {
        return null;
      }
      return window.ConversationController.getConversationId(identifier);
    });
    const contacts = conversationIds.map((id) => {
      const errorsForContact = (0, import_getOwn.getOwn)(errorsGroupedById, id);
      const isOutgoingKeyError = Boolean(errorsForContact?.some((error) => error.name === OUTGOING_KEY_ERROR));
      const isUnidentifiedDelivery = window.storage.get("unidentifiedDeliveryIndicators", false) && this.isUnidentifiedDelivery(id, unidentifiedDeliveriesSet);
      const sendState = (0, import_getOwn.getOwn)(sendStateByConversationId, id);
      let status = sendState?.status;
      if (id === ourConversationId && status && (0, import_MessageSendState.isSent)(status)) {
        status = import_MessageSendState.SendStatus.Read;
      }
      const statusTimestamp = sendState?.updatedAt;
      return {
        ...(0, import_findAndFormatContact.findAndFormatContact)(id),
        status,
        statusTimestamp: statusTimestamp === this.get("sent_at") ? void 0 : statusTimestamp,
        errors: errorsForContact,
        isOutgoingKeyError,
        isUnidentifiedDelivery
      };
    });
    return {
      sentAt: this.get("sent_at"),
      receivedAt: this.getReceivedAt(),
      message: (0, import_message.getPropsForMessage)(this.attributes, {
        conversationSelector: import_findAndFormatContact.findAndFormatContact,
        ourConversationId,
        ourNumber: window.textsecure.storage.user.getNumber(),
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString(),
        regionCode: window.storage.get("regionCode", "ZZ"),
        accountSelector: (identifier) => {
          const state = window.reduxStore.getState();
          const accountSelector = (0, import_accounts.getAccountSelector)(state);
          return accountSelector(identifier);
        },
        contactNameColorSelector: (conversationId, contactId) => {
          const state = window.reduxStore.getState();
          const contactNameColorSelector = (0, import_conversations.getContactNameColorSelector)(state);
          return contactNameColorSelector(conversationId, contactId);
        }
      }),
      errors,
      contacts
    };
  }
  getConversation() {
    return window.ConversationController.get(this.get("conversationId"));
  }
  getNotificationData() {
    const { attributes } = this;
    if ((0, import_message.isDeliveryIssue)(attributes)) {
      return {
        emoji: "\u26A0\uFE0F",
        text: window.i18n("DeliveryIssue--preview")
      };
    }
    if ((0, import_message.isChatSessionRefreshed)(attributes)) {
      return {
        emoji: "\u{1F501}",
        text: window.i18n("ChatRefresh--notification")
      };
    }
    if ((0, import_message.isUnsupportedMessage)(attributes)) {
      return {
        text: window.i18n("message--getDescription--unsupported-message")
      };
    }
    if ((0, import_message.isGroupV1Migration)(attributes)) {
      return {
        text: window.i18n("GroupV1--Migration--was-upgraded")
      };
    }
    if ((0, import_message.isProfileChange)(attributes)) {
      const change = this.get("profileChange");
      const changedId = this.get("changedId");
      const changedContact = (0, import_findAndFormatContact.findAndFormatContact)(changedId);
      if (!change) {
        throw new Error("getNotificationData: profileChange was missing!");
      }
      return {
        text: window.Signal.Util.getStringForProfileChange(change, changedContact, window.i18n)
      };
    }
    if ((0, import_message.isGroupV2Change)(attributes)) {
      const change = this.get("groupV2Change");
      (0, import_assert.strictAssert)(change, "getNotificationData: isGroupV2Change true, but no groupV2Change!");
      const changes = GroupChange.renderChange(change, {
        i18n: window.i18n,
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString(),
        renderContact: (conversationId) => {
          const conversation = window.ConversationController.get(conversationId);
          return conversation ? conversation.getTitle() : window.i18n("unknownContact");
        },
        renderString: (key, _i18n, components) => window.i18n(key, components)
      });
      return { text: changes.map(({ text }) => text).join(" ") };
    }
    const attachments = this.get("attachments") || [];
    if ((0, import_message.isTapToView)(attributes)) {
      if (this.isErased()) {
        return {
          text: window.i18n("message--getDescription--disappearing-media")
        };
      }
      if (Attachment.isImage(attachments)) {
        return {
          text: window.i18n("message--getDescription--disappearing-photo"),
          emoji: "\u{1F4F7}"
        };
      }
      if (Attachment.isVideo(attachments)) {
        return {
          text: window.i18n("message--getDescription--disappearing-video"),
          emoji: "\u{1F3A5}"
        };
      }
      return { text: window.i18n("mediaMessage"), emoji: "\u{1F4CE}" };
    }
    if ((0, import_message.isGroupUpdate)(attributes)) {
      const groupUpdate = this.get("group_update");
      const fromContact = (0, import_helpers.getContact)(this.attributes);
      const messages = [];
      if (!groupUpdate) {
        throw new Error("getNotificationData: Missing group_update");
      }
      if (groupUpdate.left === "You") {
        return { text: window.i18n("youLeftTheGroup") };
      }
      if (groupUpdate.left) {
        return {
          text: window.i18n("leftTheGroup", [
            this.getNameForNumber(groupUpdate.left)
          ])
        };
      }
      if (!fromContact) {
        return { text: "" };
      }
      if ((0, import_whatTypeOfConversation.isMe)(fromContact.attributes)) {
        messages.push(window.i18n("youUpdatedTheGroup"));
      } else {
        messages.push(window.i18n("updatedTheGroup", [fromContact.getTitle()]));
      }
      if (groupUpdate.joined && groupUpdate.joined.length) {
        const joinedContacts = _.map(groupUpdate.joined, (item) => window.ConversationController.getOrCreate(item, "private"));
        const joinedWithoutMe = joinedContacts.filter((contact) => !(0, import_whatTypeOfConversation.isMe)(contact.attributes));
        if (joinedContacts.length > 1) {
          messages.push(window.i18n("multipleJoinedTheGroup", [
            _.map(joinedWithoutMe, (contact) => contact.getTitle()).join(", ")
          ]));
          if (joinedWithoutMe.length < joinedContacts.length) {
            messages.push(window.i18n("youJoinedTheGroup"));
          }
        } else {
          const joinedContact = window.ConversationController.getOrCreate(groupUpdate.joined[0], "private");
          if ((0, import_whatTypeOfConversation.isMe)(joinedContact.attributes)) {
            messages.push(window.i18n("youJoinedTheGroup"));
          } else {
            messages.push(window.i18n("joinedTheGroup", [joinedContacts[0].getTitle()]));
          }
        }
      }
      if (groupUpdate.name) {
        messages.push(window.i18n("titleIsNow", [groupUpdate.name]));
      }
      if (groupUpdate.avatarUpdated) {
        messages.push(window.i18n("updatedGroupAvatar"));
      }
      return { text: messages.join(" ") };
    }
    if ((0, import_message.isEndSession)(attributes)) {
      return { text: window.i18n("sessionEnded") };
    }
    if ((0, import_message.isIncoming)(attributes) && (0, import_message.hasErrors)(attributes)) {
      return { text: window.i18n("incomingError") };
    }
    const body = (this.get("body") || "").trim();
    if (attachments.length) {
      const attachment = attachments[0] || {};
      const { contentType } = attachment;
      if (contentType === MIME.IMAGE_GIF || Attachment.isGIF(attachments)) {
        return {
          text: body || window.i18n("message--getNotificationText--gif"),
          emoji: "\u{1F3A1}"
        };
      }
      if (Attachment.isImage(attachments)) {
        return {
          text: body || window.i18n("message--getNotificationText--photo"),
          emoji: "\u{1F4F7}"
        };
      }
      if (Attachment.isVideo(attachments)) {
        return {
          text: body || window.i18n("message--getNotificationText--video"),
          emoji: "\u{1F3A5}"
        };
      }
      if (Attachment.isVoiceMessage(attachment)) {
        return {
          text: body || window.i18n("message--getNotificationText--voice-message"),
          emoji: "\u{1F3A4}"
        };
      }
      if (Attachment.isAudio(attachments)) {
        return {
          text: body || window.i18n("message--getNotificationText--audio-message"),
          emoji: "\u{1F508}"
        };
      }
      return {
        text: body || window.i18n("message--getNotificationText--file"),
        emoji: "\u{1F4CE}"
      };
    }
    const stickerData = this.get("sticker");
    if (stickerData) {
      const sticker = Stickers.getSticker(stickerData.packId, stickerData.stickerId);
      const { emoji } = sticker || {};
      if (!emoji) {
        log.warn("Unable to get emoji for sticker");
      }
      return {
        text: window.i18n("message--getNotificationText--stickers"),
        emoji: (0, import_dropNull.dropNull)(emoji)
      };
    }
    if ((0, import_message.isCallHistory)(attributes)) {
      const state = window.reduxStore.getState();
      const callingNotification = (0, import_message.getPropsForCallHistory)(attributes, {
        conversationSelector: import_findAndFormatContact.findAndFormatContact,
        callSelector: (0, import_calling.getCallSelector)(state),
        activeCall: (0, import_calling.getActiveCall)(state)
      });
      if (callingNotification) {
        return {
          text: (0, import_callingNotification.getCallingNotificationText)(callingNotification, window.i18n)
        };
      }
      log.error("This call history message doesn't have valid call history");
    }
    if ((0, import_message.isExpirationTimerUpdate)(attributes)) {
      const { expireTimer } = this.get("expirationTimerUpdate");
      if (!expireTimer) {
        return { text: window.i18n("disappearingMessagesDisabled") };
      }
      return {
        text: window.i18n("timerSetTo", [
          expirationTimer.format(window.i18n, expireTimer)
        ])
      };
    }
    if ((0, import_message.isKeyChange)(attributes)) {
      const identifier = this.get("key_changed");
      const conversation = window.ConversationController.get(identifier);
      return {
        text: window.i18n("safetyNumberChangedGroup", [
          conversation ? conversation.getTitle() : ""
        ])
      };
    }
    const contacts = this.get("contact");
    if (contacts && contacts.length) {
      return {
        text: EmbeddedContact.getName(contacts[0]) || window.i18n("unknownContact"),
        emoji: "\u{1F464}"
      };
    }
    const giftBadge = this.get("giftBadge");
    if (giftBadge) {
      const emoji = "\u{1F381}";
      if ((0, import_message.isOutgoing)(this.attributes)) {
        return {
          emoji,
          text: window.i18n("message--giftBadge--preview--sent")
        };
      }
      return {
        emoji,
        text: giftBadge.state === import_Message.GiftBadgeStates.Unopened ? window.i18n("message--giftBadge--preview--unopened") : window.i18n("message--giftBadge--preview--redeemed")
      };
    }
    if (body) {
      return { text: body };
    }
    return { text: "" };
  }
  getRawText() {
    const body = (this.get("body") || "").trim();
    const { attributes } = this;
    const bodyRanges = (0, import_message.processBodyRanges)(attributes, {
      conversationSelector: import_findAndFormatContact.findAndFormatContact
    });
    if (bodyRanges) {
      return getTextWithMentions(bodyRanges, body);
    }
    return body;
  }
  getNotificationText() {
    const { text, emoji } = this.getNotificationData();
    const { attributes } = this;
    if (attributes.storyReactionEmoji) {
      const conversation = this.getConversation();
      const firstName = conversation?.attributes.profileName;
      if (!conversation || !firstName) {
        return window.i18n("Quote__story-reaction--single");
      }
      if ((0, import_whatTypeOfConversation.isMe)(conversation.attributes)) {
        return window.i18n("Quote__story-reaction--yours");
      }
      return window.i18n("Quote__story-reaction", [firstName]);
    }
    let modifiedText = text;
    const bodyRanges = (0, import_message.processBodyRanges)(attributes, {
      conversationSelector: import_findAndFormatContact.findAndFormatContact
    });
    if (bodyRanges && bodyRanges.length) {
      modifiedText = getTextWithMentions(bodyRanges, modifiedText);
    }
    const shouldIncludeEmoji = Boolean(emoji) && !window.Signal.OS.isLinux();
    if (shouldIncludeEmoji) {
      return window.i18n("message--getNotificationText--text-with-emoji", {
        text: modifiedText,
        emoji
      });
    }
    return modifiedText;
  }
  idForLogging() {
    return (0, import_idForLogging.getMessageIdForLogging)(this.attributes);
  }
  defaults() {
    return {
      timestamp: new Date().getTime(),
      attachments: []
    };
  }
  validate(attributes) {
    const required = ["conversationId", "received_at", "sent_at"];
    const missing = _.filter(required, (attr) => !attributes[attr]);
    if (missing.length) {
      log.warn(`Message missing attributes: ${missing}`);
    }
  }
  merge(model) {
    const attributes = model.attributes || model;
    this.set(attributes);
  }
  getNameForNumber(number) {
    const conversation = window.ConversationController.get(number);
    if (!conversation) {
      return number;
    }
    return conversation.getTitle();
  }
  async cleanup() {
    await (0, import_cleanup.cleanupMessage)(this.attributes);
  }
  async deleteData() {
    await (0, import_cleanup.deleteMessageData)(this.attributes);
  }
  isValidTapToView() {
    const body = this.get("body");
    if (body) {
      return false;
    }
    const attachments = this.get("attachments");
    if (!attachments || attachments.length !== 1) {
      return false;
    }
    const firstAttachment = attachments[0];
    if (!window.Signal.Util.GoogleChrome.isImageTypeSupported(firstAttachment.contentType) && !window.Signal.Util.GoogleChrome.isVideoTypeSupported(firstAttachment.contentType)) {
      return false;
    }
    const quote = this.get("quote");
    const sticker = this.get("sticker");
    const contact = this.get("contact");
    const preview = this.get("preview");
    if (quote || sticker || contact && contact.length > 0 || preview && preview.length > 0) {
      return false;
    }
    return true;
  }
  async markViewOnceMessageViewed(options) {
    const { fromSync } = options || {};
    if (!this.isValidTapToView()) {
      log.warn(`markViewOnceMessageViewed: Message ${this.idForLogging()} is not a valid tap to view message!`);
      return;
    }
    if (this.isErased()) {
      log.warn(`markViewOnceMessageViewed: Message ${this.idForLogging()} is already erased!`);
      return;
    }
    if (this.get("readStatus") !== import_MessageReadStatus.ReadStatus.Viewed) {
      this.set((0, import_MessageUpdater.markViewed)(this.attributes));
    }
    await this.eraseContents();
    if (!fromSync) {
      const senderE164 = (0, import_helpers.getSource)(this.attributes);
      const senderUuid = (0, import_helpers.getSourceUuid)(this.attributes);
      const timestamp = this.get("sent_at");
      if (senderUuid === void 0) {
        throw new Error("markViewOnceMessageViewed: senderUuid is undefined");
      }
      if (window.ConversationController.areWePrimaryDevice()) {
        log.warn("markViewOnceMessageViewed: We are primary device; not sending view once open sync");
        return;
      }
      try {
        await import_viewOnceOpenJobQueue.viewOnceOpenJobQueue.add({
          viewOnceOpens: [
            {
              senderE164,
              senderUuid,
              timestamp
            }
          ]
        });
      } catch (error) {
        log.error("markViewOnceMessageViewed: Failed to queue view once open sync", Errors.toLogFormat(error));
      }
    }
  }
  async doubleCheckMissingQuoteReference() {
    const logId = this.idForLogging();
    const storyId = this.get("storyId");
    if (storyId) {
      log.warn(`doubleCheckMissingQuoteReference/${logId}: missing story reference`);
      const message = window.MessageController.getById(storyId);
      if (!message) {
        return;
      }
      if (this.get("storyReplyContext")) {
        this.unset("storyReplyContext");
      }
      await this.hydrateStoryContext(message);
      return;
    }
    const quote = this.get("quote");
    if (!quote) {
      log.warn(`doubleCheckMissingQuoteReference/${logId}: Missing quote!`);
      return;
    }
    const { authorUuid, author, id: sentAt, referencedMessageNotFound } = quote;
    const contact = window.ConversationController.get(authorUuid || author);
    if (referencedMessageNotFound && contact) {
      log.info(`doubleCheckMissingQuoteReference/${logId}: Verifying reference to ${sentAt}`);
      const inMemoryMessages = window.MessageController.filterBySentAt(Number(sentAt));
      const matchingMessage = (0, import_iterables.find)(inMemoryMessages, (message) => (0, import_helpers.isQuoteAMatch)(message.attributes, this.get("conversationId"), quote));
      if (!matchingMessage) {
        log.info(`doubleCheckMissingQuoteReference/${logId}: No match for ${sentAt}.`);
        return;
      }
      this.set({
        quote: {
          ...quote,
          referencedMessageNotFound: false
        }
      });
      log.info(`doubleCheckMissingQuoteReference/${logId}: Found match for ${sentAt}, updating.`);
      await this.copyQuoteContentFromOriginal(matchingMessage, quote);
      this.set({
        quote: {
          ...quote,
          referencedMessageNotFound: false
        }
      });
      window.Signal.Util.queueUpdateMessage(this.attributes);
    }
  }
  isErased() {
    return Boolean(this.get("isErased"));
  }
  async eraseContents(additionalProperties = {}, shouldPersist = true) {
    log.info(`Erasing data for message ${this.idForLogging()}`);
    try {
      await this.deleteData();
    } catch (error) {
      log.error(`Error erasing data for message ${this.idForLogging()}:`, error && error.stack ? error.stack : error);
    }
    this.set({
      isErased: true,
      body: "",
      bodyRanges: void 0,
      attachments: [],
      quote: void 0,
      contact: [],
      sticker: void 0,
      preview: [],
      ...additionalProperties
    });
    this.getConversation()?.debouncedUpdateLastMessage?.();
    if (shouldPersist) {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
    await window.Signal.Data.deleteSentProtoByMessageId(this.id);
  }
  isEmpty() {
    const { attributes } = this;
    const hasBody = Boolean(this.get("body"));
    const hasAttachment = (this.get("attachments") || []).length > 0;
    const hasEmbeddedContact = (this.get("contact") || []).length > 0;
    const isSticker = Boolean(this.get("sticker"));
    const isCallHistoryValue = (0, import_message.isCallHistory)(attributes);
    const isChatSessionRefreshedValue = (0, import_message.isChatSessionRefreshed)(attributes);
    const isDeliveryIssueValue = (0, import_message.isDeliveryIssue)(attributes);
    const isGiftBadgeValue = (0, import_message.isGiftBadge)(attributes);
    const isGroupUpdateValue = (0, import_message.isGroupUpdate)(attributes);
    const isGroupV2ChangeValue = (0, import_message.isGroupV2Change)(attributes);
    const isEndSessionValue = (0, import_message.isEndSession)(attributes);
    const isExpirationTimerUpdateValue = (0, import_message.isExpirationTimerUpdate)(attributes);
    const isVerifiedChangeValue = (0, import_message.isVerifiedChange)(attributes);
    const isUnsupportedMessageValue = (0, import_message.isUnsupportedMessage)(attributes);
    const isTapToViewValue = (0, import_message.isTapToView)(attributes);
    const hasErrorsValue = (0, import_message.hasErrors)(attributes);
    const isKeyChangeValue = (0, import_message.isKeyChange)(attributes);
    const isProfileChangeValue = (0, import_message.isProfileChange)(attributes);
    const isUniversalTimerNotificationValue = (0, import_message.isUniversalTimerNotification)(attributes);
    const hasSomethingToDisplay = hasBody || hasAttachment || hasEmbeddedContact || isSticker || isCallHistoryValue || isChatSessionRefreshedValue || isDeliveryIssueValue || isGiftBadgeValue || isGroupUpdateValue || isGroupV2ChangeValue || isEndSessionValue || isExpirationTimerUpdateValue || isVerifiedChangeValue || isUnsupportedMessageValue || isTapToViewValue || hasErrorsValue || isKeyChangeValue || isProfileChangeValue || isUniversalTimerNotificationValue;
    return !hasSomethingToDisplay;
  }
  isUnidentifiedDelivery(contactId, unidentifiedDeliveriesSet) {
    if ((0, import_message.isIncoming)(this.attributes)) {
      return Boolean(this.get("unidentifiedDeliveryReceived"));
    }
    return unidentifiedDeliveriesSet.has(contactId);
  }
  async saveErrors(providedErrors, options = {}) {
    const { skipSave } = options;
    let errors;
    if (!(providedErrors instanceof Array)) {
      errors = [providedErrors];
    } else {
      errors = providedErrors;
    }
    errors.forEach((e) => {
      log.error("Message.saveErrors:", e && e.reason ? e.reason : null, e && e.stack ? e.stack : e);
    });
    errors = errors.map((e) => {
      if (e.message && e.stack || e instanceof Error) {
        return _.pick(e, "name", "message", "code", "number", "identifier", "retryAfter", "data", "reason");
      }
      return e;
    });
    errors = errors.concat(this.get("errors") || []);
    this.set({ errors });
    if (!skipSave && !this.doNotSave) {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
  }
  markRead(readAt, options = {}) {
    this.set((0, import_MessageUpdater.markRead)(this.attributes, readAt, options));
  }
  getIncomingContact() {
    if (!(0, import_message.isIncoming)(this.attributes)) {
      return null;
    }
    const source = this.get("source");
    if (!source) {
      return null;
    }
    return window.ConversationController.getOrCreate(source, "private");
  }
  async retrySend() {
    const conversation = this.getConversation();
    const currentConversationRecipients = conversation.getMemberConversationIds();
    const oldSendStateByConversationId = this.get("sendStateByConversationId") || {};
    const newSendStateByConversationId = { ...oldSendStateByConversationId };
    for (const [conversationId, sendState] of Object.entries(oldSendStateByConversationId)) {
      if ((0, import_MessageSendState.isSent)(sendState.status)) {
        continue;
      }
      const recipient = window.ConversationController.get(conversationId);
      if (!recipient || !currentConversationRecipients.has(conversationId) && !(0, import_whatTypeOfConversation.isMe)(recipient.attributes)) {
        continue;
      }
      newSendStateByConversationId[conversationId] = (0, import_MessageSendState.sendStateReducer)(sendState, {
        type: import_MessageSendState.SendActionType.ManuallyRetried,
        updatedAt: Date.now()
      });
    }
    this.set("sendStateByConversationId", newSendStateByConversationId);
    await import_conversationJobQueue.conversationJobQueue.add({
      type: import_conversationJobQueue.conversationQueueJobEnum.enum.NormalMessage,
      conversationId: conversation.id,
      messageId: this.id,
      revision: conversation.get("revision")
    }, async (jobToInsert) => {
      await window.Signal.Data.saveMessage(this.attributes, {
        jobToInsert,
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    });
  }
  isReplayableError(e) {
    return e.name === "MessageError" || e.name === "OutgoingMessageError" || e.name === "SendMessageNetworkError" || e.name === "SendMessageChallengeError" || e.name === "SignedPreKeyRotationError" || e.name === "OutgoingIdentityKeyError";
  }
  hasSuccessfulDelivery() {
    const sendStateByConversationId = this.get("sendStateByConversationId");
    const withoutMe = (0, import_lodash.omit)(sendStateByConversationId, window.ConversationController.getOurConversationIdOrThrow());
    return (0, import_lodash.isEmpty)(withoutMe) || (0, import_MessageSendState.someSendStatus)(withoutMe, import_MessageSendState.isSent);
  }
  markFailed() {
    const now = Date.now();
    this.set("sendStateByConversationId", (0, import_lodash.mapValues)(this.get("sendStateByConversationId") || {}, (sendState) => (0, import_MessageSendState.sendStateReducer)(sendState, {
      type: import_MessageSendState.SendActionType.Failed,
      updatedAt: now
    })));
  }
  removeOutgoingErrors(incomingIdentifier) {
    const incomingConversationId = window.ConversationController.getConversationId(incomingIdentifier);
    const errors = _.partition(this.get("errors"), (e) => window.ConversationController.getConversationId(e.identifier || e.number) === incomingConversationId && (e.name === "MessageError" || e.name === "OutgoingMessageError" || e.name === "SendMessageNetworkError" || e.name === "SendMessageChallengeError" || e.name === "SignedPreKeyRotationError" || e.name === "OutgoingIdentityKeyError"));
    this.set({ errors: errors[1] });
    return errors[0][0];
  }
  async send(promise, saveErrors) {
    const updateLeftPane = this.getConversation()?.debouncedUpdateLastMessage || import_lodash.noop;
    updateLeftPane();
    let result;
    try {
      const value = await promise;
      result = { success: true, value };
    } catch (err) {
      result = { success: false, value: err };
    }
    updateLeftPane();
    const attributesToUpdate = {};
    if ("dataMessage" in result.value && result.value.dataMessage) {
      attributesToUpdate.dataMessage = result.value.dataMessage;
    }
    if (!this.doNotSave) {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
    const sendStateByConversationId = {
      ...this.get("sendStateByConversationId") || {}
    };
    const sendIsNotFinal = "sendIsNotFinal" in result.value && result.value.sendIsNotFinal;
    const sendIsFinal = !sendIsNotFinal;
    const successfulIdentifiers = sendIsFinal && "successfulIdentifiers" in result.value && Array.isArray(result.value.successfulIdentifiers) ? result.value.successfulIdentifiers : [];
    const sentToAtLeastOneRecipient = result.success || Boolean(successfulIdentifiers.length);
    successfulIdentifiers.forEach((identifier) => {
      const conversation = window.ConversationController.get(identifier);
      if (!conversation) {
        return;
      }
      if (conversation.isEverUnregistered()) {
        conversation.setRegistered();
      }
      const previousSendState = (0, import_getOwn.getOwn)(sendStateByConversationId, conversation.id);
      if (previousSendState) {
        sendStateByConversationId[conversation.id] = (0, import_MessageSendState.sendStateReducer)(previousSendState, {
          type: import_MessageSendState.SendActionType.Sent,
          updatedAt: Date.now()
        });
      }
    });
    const previousUnidentifiedDeliveries = this.get("unidentifiedDeliveries") || [];
    const newUnidentifiedDeliveries = sendIsFinal && "unidentifiedDeliveries" in result.value && Array.isArray(result.value.unidentifiedDeliveries) ? result.value.unidentifiedDeliveries : [];
    const promises = [];
    let errors;
    if (result.value instanceof import_Errors.SendMessageProtoError && result.value.errors) {
      ({ errors } = result.value);
    } else if ((0, import_helpers.isCustomError)(result.value)) {
      errors = [result.value];
    } else if (Array.isArray(result.value.errors)) {
      ({ errors } = result.value);
    } else {
      errors = [];
    }
    const errorsToSave = [];
    let hadSignedPreKeyRotationError = false;
    errors.forEach((error) => {
      const conversation = window.ConversationController.get(error.identifier) || window.ConversationController.get(error.number);
      if (conversation && !saveErrors && sendIsFinal) {
        const previousSendState = (0, import_getOwn.getOwn)(sendStateByConversationId, conversation.id);
        if (previousSendState) {
          sendStateByConversationId[conversation.id] = (0, import_MessageSendState.sendStateReducer)(previousSendState, {
            type: import_MessageSendState.SendActionType.Failed,
            updatedAt: Date.now()
          });
        }
      }
      let shouldSaveError = true;
      switch (error.name) {
        case "SignedPreKeyRotationError":
          hadSignedPreKeyRotationError = true;
          break;
        case "OutgoingIdentityKeyError": {
          if (conversation) {
            promises.push(conversation.getProfiles());
          }
          break;
        }
        case "UnregisteredUserError":
          if (conversation && (0, import_whatTypeOfConversation.isGroup)(conversation.attributes)) {
            shouldSaveError = false;
          }
          conversation?.setUnregistered();
          break;
        default:
          break;
      }
      if (shouldSaveError) {
        errorsToSave.push(error);
      }
    });
    if (hadSignedPreKeyRotationError) {
      promises.push(window.getAccountManager().rotateSignedPreKey(import_UUID.UUIDKind.ACI));
    }
    attributesToUpdate.sendStateByConversationId = sendStateByConversationId;
    attributesToUpdate.expirationStartTimestamp = sentToAtLeastOneRecipient ? Date.now() : void 0;
    attributesToUpdate.unidentifiedDeliveries = (0, import_lodash.union)(previousUnidentifiedDeliveries, newUnidentifiedDeliveries);
    attributesToUpdate.errors = [];
    this.set(attributesToUpdate);
    if (saveErrors) {
      saveErrors(errorsToSave);
    } else {
      this.saveErrors(errorsToSave, { skipSave: true });
    }
    if (!this.doNotSave) {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
    updateLeftPane();
    if (sentToAtLeastOneRecipient) {
      promises.push(this.sendSyncMessage());
    }
    await Promise.all(promises);
    const isTotalSuccess = result.success && !this.get("errors")?.length;
    if (isTotalSuccess) {
      delete this.cachedOutgoingPreviewData;
      delete this.cachedOutgoingQuoteData;
      delete this.cachedOutgoingStickerData;
    }
    updateLeftPane();
  }
  async sendSyncMessageOnly(dataMessage, saveErrors) {
    const conv = this.getConversation();
    this.set({ dataMessage });
    const updateLeftPane = conv?.debouncedUpdateLastMessage;
    try {
      this.set({
        expirationStartTimestamp: Date.now(),
        errors: []
      });
      const result = await this.sendSyncMessage();
      this.set({
        unidentifiedDeliveries: result && result.unidentifiedDeliveries ? result.unidentifiedDeliveries : void 0
      });
      return result;
    } catch (error) {
      const resultErrors = error?.errors;
      const errors = Array.isArray(resultErrors) ? resultErrors : [new Error("Unknown error")];
      if (saveErrors) {
        saveErrors(errors);
      } else {
        this.saveErrors(errors, { skipSave: true });
      }
      throw error;
    } finally {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
      if (updateLeftPane) {
        updateLeftPane();
      }
    }
  }
  async sendSyncMessage() {
    const ourConversation = window.ConversationController.getOurConversationOrThrow();
    const sendOptions = await (0, import_getSendOptions.getSendOptions)(ourConversation.attributes, {
      syncMessage: true
    });
    if (window.ConversationController.areWePrimaryDevice()) {
      log.warn("sendSyncMessage: We are primary device; not sending sync message");
      this.set({ dataMessage: void 0 });
      return;
    }
    const { messaging } = window.textsecure;
    if (!messaging) {
      throw new Error("sendSyncMessage: messaging not available!");
    }
    this.syncPromise = this.syncPromise || Promise.resolve();
    const next = /* @__PURE__ */ __name(async () => {
      const dataMessage = this.get("dataMessage");
      if (!dataMessage) {
        return;
      }
      const isUpdate = Boolean(this.get("synced"));
      const conv = this.getConversation();
      const sendEntries = Object.entries(this.get("sendStateByConversationId") || {});
      const sentEntries = (0, import_iterables.filter)(sendEntries, ([_conversationId, { status }]) => (0, import_MessageSendState.isSent)(status));
      const allConversationIdsSentTo = (0, import_iterables.map)(sentEntries, ([conversationId]) => conversationId);
      const conversationIdsSentTo = (0, import_iterables.filter)(allConversationIdsSentTo, (conversationId) => conversationId !== ourConversation.id);
      const unidentifiedDeliveries = this.get("unidentifiedDeliveries") || [];
      const maybeConversationsWithSealedSender = (0, import_iterables.map)(unidentifiedDeliveries, (identifier) => window.ConversationController.get(identifier));
      const conversationsWithSealedSender = (0, import_iterables.filter)(maybeConversationsWithSealedSender, import_isNotNil.isNotNil);
      const conversationIdsWithSealedSender = new Set((0, import_iterables.map)(conversationsWithSealedSender, (c) => c.id));
      return (0, import_handleMessageSend.handleMessageSend)(messaging.sendSyncMessage({
        encodedDataMessage: dataMessage,
        timestamp: this.get("sent_at"),
        destination: conv.get("e164"),
        destinationUuid: conv.get("uuid"),
        expirationStartTimestamp: this.get("expirationStartTimestamp") || null,
        conversationIdsSentTo,
        conversationIdsWithSealedSender,
        isUpdate,
        options: sendOptions
      }), { messageIds: this.id ? [this.id] : [], sendType: "sentSync" }).then(async (result) => {
        let newSendStateByConversationId;
        const sendStateByConversationId = this.get("sendStateByConversationId") || {};
        const ourOldSendState = (0, import_getOwn.getOwn)(sendStateByConversationId, ourConversation.id);
        if (ourOldSendState) {
          const ourNewSendState = (0, import_MessageSendState.sendStateReducer)(ourOldSendState, {
            type: import_MessageSendState.SendActionType.Sent,
            updatedAt: Date.now()
          });
          if (ourNewSendState !== ourOldSendState) {
            newSendStateByConversationId = {
              ...sendStateByConversationId,
              [ourConversation.id]: ourNewSendState
            };
          }
        }
        this.set({
          synced: true,
          dataMessage: null,
          ...newSendStateByConversationId ? { sendStateByConversationId: newSendStateByConversationId } : {}
        });
        if (this.doNotSave) {
          return result;
        }
        await window.Signal.Data.saveMessage(this.attributes, {
          ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
        });
        return result;
      });
    }, "next");
    this.syncPromise = this.syncPromise.then(next, next);
    return this.syncPromise;
  }
  hasRequiredAttachmentDownloads() {
    const attachments = this.get("attachments") || [];
    const hasLongMessageAttachments = attachments.some((attachment) => {
      return MIME.isLongMessage(attachment.contentType);
    });
    if (hasLongMessageAttachments) {
      return true;
    }
    const sticker = this.get("sticker");
    if (sticker) {
      return !sticker.data || !sticker.data.path;
    }
    return false;
  }
  hasAttachmentDownloads() {
    return (0, import_hasAttachmentDownloads.hasAttachmentDownloads)(this.attributes);
  }
  async queueAttachmentDownloads() {
    const value = await (0, import_queueAttachmentDownloads.queueAttachmentDownloads)(this.attributes);
    if (!value) {
      return false;
    }
    this.set(value);
    return true;
  }
  markAttachmentAsCorrupted(attachment) {
    if (!attachment.path) {
      throw new Error("Attachment can't be marked as corrupted because it wasn't loaded");
    }
    const attachments = this.get("attachments") || [];
    let changed = false;
    const newAttachments = attachments.map((existing) => {
      if (existing.path !== attachment.path) {
        return existing;
      }
      changed = true;
      return {
        ...existing,
        isCorrupted: true
      };
    });
    if (!changed) {
      throw new Error("Attachment can't be marked as corrupted because it wasn't found");
    }
    log.info("markAttachmentAsCorrupted: marking an attachment as corrupted");
    this.set({
      attachments: newAttachments
    });
  }
  async copyFromQuotedMessage(quote, conversationId) {
    if (!quote) {
      return void 0;
    }
    const { id } = quote;
    (0, import_assert.strictAssert)(id, "Quote must have an id");
    const result = {
      ...quote,
      id,
      attachments: quote.attachments.slice(),
      bodyRanges: quote.bodyRanges.map(({ start, length, mentionUuid }) => {
        (0, import_assert.strictAssert)(start !== void 0 && start !== null, "Received quote with a bodyRange.start == null");
        (0, import_assert.strictAssert)(length !== void 0 && length !== null, "Received quote with a bodyRange.length == null");
        return {
          start,
          length,
          mentionUuid: (0, import_dropNull.dropNull)(mentionUuid)
        };
      }),
      referencedMessageNotFound: false,
      isGiftBadge: quote.type === import_protobuf.SignalService.DataMessage.Quote.Type.GIFT_BADGE,
      isViewOnce: false,
      messageId: ""
    };
    const inMemoryMessages = window.MessageController.filterBySentAt(id);
    const matchingMessage = (0, import_iterables.find)(inMemoryMessages, (item) => (0, import_helpers.isQuoteAMatch)(item.attributes, conversationId, result));
    let queryMessage;
    if (matchingMessage) {
      queryMessage = matchingMessage;
    } else {
      log.info("copyFromQuotedMessage: db lookup needed", id);
      const messages = await window.Signal.Data.getMessagesBySentAt(id);
      const found = messages.find((item) => (0, import_helpers.isQuoteAMatch)(item, conversationId, result));
      if (!found) {
        result.referencedMessageNotFound = true;
        return result;
      }
      queryMessage = window.MessageController.register(found.id, found);
    }
    if (queryMessage) {
      await this.copyQuoteContentFromOriginal(queryMessage, result);
    }
    return result;
  }
  async copyQuoteContentFromOriginal(originalMessage, quote) {
    const { attachments } = quote;
    const firstAttachment = attachments ? attachments[0] : void 0;
    if ((0, import_message.isTapToView)(originalMessage.attributes)) {
      quote.text = void 0;
      quote.attachments = [
        {
          contentType: "image/jpeg"
        }
      ];
      quote.isViewOnce = true;
      return;
    }
    const isMessageAGiftBadge = (0, import_message.isGiftBadge)(originalMessage.attributes);
    if (isMessageAGiftBadge !== quote.isGiftBadge) {
      log.warn(`copyQuoteContentFromOriginal: Quote.isGiftBadge: ${quote.isGiftBadge}, isGiftBadge(message): ${isMessageAGiftBadge}`);
      quote.isGiftBadge = isMessageAGiftBadge;
    }
    if (isMessageAGiftBadge) {
      quote.text = void 0;
      quote.attachments = [];
      return;
    }
    quote.isViewOnce = false;
    quote.text = originalMessage.get("body");
    if (firstAttachment) {
      firstAttachment.thumbnail = void 0;
    }
    if (!firstAttachment || !firstAttachment.contentType || !GoogleChrome.isImageTypeSupported((0, import_MIME.stringToMIMEType)(firstAttachment.contentType)) && !GoogleChrome.isVideoTypeSupported((0, import_MIME.stringToMIMEType)(firstAttachment.contentType))) {
      return;
    }
    try {
      const schemaVersion = originalMessage.get("schemaVersion");
      if (schemaVersion && schemaVersion < TypedMessage.VERSION_NEEDED_FOR_DISPLAY) {
        const upgradedMessage = await upgradeMessageSchema(originalMessage.attributes);
        originalMessage.set(upgradedMessage);
        await window.Signal.Data.saveMessage(upgradedMessage, {
          ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
        });
      }
    } catch (error) {
      log.error("Problem upgrading message quoted message from database", Errors.toLogFormat(error));
      return;
    }
    const queryAttachments = originalMessage.get("attachments") || [];
    if (queryAttachments.length > 0) {
      const queryFirst = queryAttachments[0];
      const { thumbnail } = queryFirst;
      if (thumbnail && thumbnail.path) {
        firstAttachment.thumbnail = {
          ...thumbnail,
          copied: true
        };
      }
    }
    const queryPreview = originalMessage.get("preview") || [];
    if (queryPreview.length > 0) {
      const queryFirst = queryPreview[0];
      const { image } = queryFirst;
      if (image && image.path) {
        firstAttachment.thumbnail = {
          ...image,
          copied: true
        };
      }
    }
    const sticker = originalMessage.get("sticker");
    if (sticker && sticker.data && sticker.data.path) {
      firstAttachment.thumbnail = {
        ...sticker.data,
        copied: true
      };
    }
  }
  async handleDataMessage(initialMessage, confirm, options = {}) {
    const { data } = options;
    const message = this;
    const source = message.get("source");
    const sourceUuid = message.get("sourceUuid");
    const type = message.get("type");
    const conversationId = message.get("conversationId");
    const GROUP_TYPES = import_protobuf.SignalService.GroupContext.Type;
    const fromContact = (0, import_helpers.getContact)(this.attributes);
    if (fromContact) {
      fromContact.setRegistered();
    }
    const conversation = window.ConversationController.get(conversationId);
    const idLog = conversation.idForLogging();
    await conversation.queueJob("handleDataMessage", async () => {
      log.info(`handleDataMessage/${idLog}: processsing message ${message.idForLogging()}`);
      if ((0, import_message.isStory)(message.attributes) && !(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes, {
        ignoreEmptyConvo: true
      })) {
        log.info(`handleDataMessage/${idLog}: dropping story from !accepted`, this.getSenderIdentifier());
        confirm();
        return;
      }
      const inMemoryMessage = window.MessageController.findBySender(this.getSenderIdentifier());
      if (inMemoryMessage) {
        log.info(`handleDataMessage/${idLog}: cache hit`, this.getSenderIdentifier());
      } else {
        log.info(`handleDataMessage/${idLog}: duplicate check db lookup needed`, this.getSenderIdentifier());
      }
      const existingMessage = inMemoryMessage || await getMessageBySender(this.attributes);
      const isUpdate = Boolean(data && data.isRecipientUpdate);
      if (existingMessage && type === "incoming") {
        log.warn(`handleDataMessage/${idLog}: Received duplicate message`, this.idForLogging());
        confirm();
        return;
      }
      if (type === "outgoing") {
        if (isUpdate && existingMessage) {
          log.info(`handleDataMessage/${idLog}: Updating message ${message.idForLogging()} with received transcript`);
          const toUpdate = window.MessageController.register(existingMessage.id, existingMessage);
          const unidentifiedDeliveriesSet = new Set(toUpdate.get("unidentifiedDeliveries") ?? []);
          const sendStateByConversationId = {
            ...toUpdate.get("sendStateByConversationId") || {}
          };
          const unidentifiedStatus = data && Array.isArray(data.unidentifiedStatus) ? data.unidentifiedStatus : [];
          unidentifiedStatus.forEach(({ destinationUuid, destination, unidentified }) => {
            const identifier = destinationUuid || destination;
            if (!identifier) {
              return;
            }
            const destinationConversationId = window.ConversationController.ensureContactIds({
              uuid: destinationUuid,
              e164: destination,
              highTrust: true,
              reason: `handleDataMessage(${initialMessage.timestamp})`
            });
            if (!destinationConversationId) {
              return;
            }
            const updatedAt = data && (0, import_isNormalNumber.isNormalNumber)(data.timestamp) ? data.timestamp : Date.now();
            const previousSendState = (0, import_getOwn.getOwn)(sendStateByConversationId, destinationConversationId);
            sendStateByConversationId[destinationConversationId] = previousSendState ? (0, import_MessageSendState.sendStateReducer)(previousSendState, {
              type: import_MessageSendState.SendActionType.Sent,
              updatedAt
            }) : {
              status: import_MessageSendState.SendStatus.Sent,
              updatedAt
            };
            if (unidentified) {
              unidentifiedDeliveriesSet.add(identifier);
            }
          });
          toUpdate.set({
            sendStateByConversationId,
            unidentifiedDeliveries: [...unidentifiedDeliveriesSet]
          });
          await window.Signal.Data.saveMessage(toUpdate.attributes, {
            ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
          });
          confirm();
          return;
        }
        if (isUpdate) {
          log.warn(`handleDataMessage/${idLog}: Received update transcript, but no existing entry for message ${message.idForLogging()}. Dropping.`);
          confirm();
          return;
        }
        if (existingMessage) {
          log.warn(`handleDataMessage/${idLog}: Received duplicate transcript for message ${message.idForLogging()}, but it was not an update transcript. Dropping.`);
          confirm();
          return;
        }
      }
      if (initialMessage.groupV2) {
        if ((0, import_whatTypeOfConversation.isGroupV1)(conversation.attributes)) {
          const { revision, groupChange } = initialMessage.groupV2;
          await window.Signal.Groups.respondToGroupV2Migration({
            conversation,
            groupChange: groupChange ? {
              base64: groupChange,
              isTrusted: false
            } : void 0,
            newRevision: revision,
            receivedAt: message.get("received_at"),
            sentAt: message.get("sent_at")
          });
        } else if (initialMessage.groupV2.masterKey && initialMessage.groupV2.secretParams && initialMessage.groupV2.publicParams) {
          await conversation.maybeRepairGroupV2({
            masterKey: initialMessage.groupV2.masterKey,
            secretParams: initialMessage.groupV2.secretParams,
            publicParams: initialMessage.groupV2.publicParams
          });
          const existingRevision = conversation.get("revision");
          const isV2GroupUpdate = initialMessage.groupV2 && _.isNumber(initialMessage.groupV2.revision) && (!_.isNumber(existingRevision) || initialMessage.groupV2.revision > existingRevision);
          if (isV2GroupUpdate && initialMessage.groupV2) {
            const { revision, groupChange } = initialMessage.groupV2;
            try {
              await window.Signal.Groups.maybeUpdateGroup({
                conversation,
                groupChange: groupChange ? {
                  base64: groupChange,
                  isTrusted: false
                } : void 0,
                newRevision: revision,
                receivedAt: message.get("received_at"),
                sentAt: message.get("sent_at")
              });
            } catch (error) {
              const errorText = error && error.stack ? error.stack : error;
              log.error(`handleDataMessage/${idLog}: Failed to process group update as part of message ${message.idForLogging()}: ${errorText}`);
              throw error;
            }
          }
        }
      }
      const ourConversationId = window.ConversationController.getOurConversationId();
      const senderId = window.ConversationController.ensureContactIds({
        e164: source,
        uuid: sourceUuid
      });
      const hasGroupV2Prop = Boolean(initialMessage.groupV2);
      const isV1GroupUpdate = initialMessage.group && initialMessage.group.type !== import_protobuf.SignalService.GroupContext.Type.DELIVER;
      const isBlocked = source && window.storage.blocked.isBlocked(source) || sourceUuid && window.storage.blocked.isUuidBlocked(sourceUuid);
      if (isBlocked) {
        log.info(`handleDataMessage/${idLog}: Dropping message from blocked sender. hasGroupV2Prop: ${hasGroupV2Prop}`);
        confirm();
        return;
      }
      if (type === "incoming" && !(0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes) && hasGroupV2Prop && (conversation.get("left") || !conversation.hasMember(ourConversationId) || !conversation.hasMember(senderId))) {
        log.warn(`Received message destined for group ${conversation.idForLogging()}, which we or the sender are not a part of. Dropping.`);
        confirm();
        return;
      }
      if (type === "incoming" && !(0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes) && !hasGroupV2Prop && !isV1GroupUpdate && conversation.get("members") && (conversation.get("left") || !conversation.hasMember(ourConversationId))) {
        log.warn(`Received message destined for group ${conversation.idForLogging()}, which we're not a part of. Dropping.`);
        confirm();
        return;
      }
      if (isV1GroupUpdate && (0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
        log.warn(`Received GroupV1 update in GroupV2 conversation ${conversation.idForLogging()}. Dropping.`);
        confirm();
        return;
      }
      if (conversation.get("announcementsOnly") && !conversation.isAdmin(senderId)) {
        confirm();
        return;
      }
      const messageId = import_UUID.UUID.generate().toString();
      if (type === "incoming" && this.get("unidentifiedDeliveryReceived") && !(0, import_message.hasErrors)(this.attributes) && conversation.getAccepted()) {
        window.Whisper.deliveryReceiptQueue.add(() => {
          window.Whisper.deliveryReceiptBatcher.add({
            messageId,
            senderE164: source,
            senderUuid: sourceUuid,
            timestamp: this.get("sent_at")
          });
        });
      }
      const [quote, storyQuote] = await Promise.all([
        this.copyFromQuotedMessage(initialMessage.quote, conversation.id),
        (0, import_findStoryMessage.findStoryMessage)(conversation.id, initialMessage.storyContext)
      ]);
      const withQuoteReference = {
        ...message.attributes,
        ...initialMessage,
        quote,
        storyId: storyQuote?.id
      };
      const dataMessage = await upgradeMessageSchema(withQuoteReference);
      try {
        const now = new Date().getTime();
        const urls = LinkPreview.findLinks(dataMessage.body || "");
        const incomingPreview = dataMessage.preview || [];
        const preview = incomingPreview.filter((item) => (item.image || item.title) && urls.includes(item.url) && LinkPreview.shouldPreviewHref(item.url));
        if (preview.length < incomingPreview.length) {
          log.info(`${message.idForLogging()}: Eliminated ${preview.length - incomingPreview.length} previews with invalid urls'`);
        }
        message.set({
          id: messageId,
          attachments: dataMessage.attachments,
          body: dataMessage.body,
          bodyRanges: dataMessage.bodyRanges,
          contact: dataMessage.contact,
          conversationId: conversation.id,
          decrypted_at: now,
          errors: [],
          flags: dataMessage.flags,
          giftBadge: initialMessage.giftBadge,
          hasAttachments: dataMessage.hasAttachments,
          hasFileAttachments: dataMessage.hasFileAttachments,
          hasVisualMediaAttachments: dataMessage.hasVisualMediaAttachments,
          isViewOnce: Boolean(dataMessage.isViewOnce),
          preview,
          requiredProtocolVersion: dataMessage.requiredProtocolVersion || this.INITIAL_PROTOCOL_VERSION,
          supportedVersionAtReceive: this.CURRENT_PROTOCOL_VERSION,
          quote: dataMessage.quote,
          schemaVersion: dataMessage.schemaVersion,
          sticker: dataMessage.sticker,
          storyId: dataMessage.storyId
        });
        const isSupported = !(0, import_message.isUnsupportedMessage)(message.attributes);
        if (!isSupported) {
          await message.eraseContents();
        }
        if (isSupported) {
          let attributes = {
            ...conversation.attributes
          };
          if (!hasGroupV2Prop && initialMessage.group) {
            const pendingGroupUpdate = {};
            const memberConversations = await Promise.all(initialMessage.group.membersE164.map((e164) => window.ConversationController.getOrCreateAndWait(e164, "private")));
            const members = memberConversations.map((c) => c.get("id"));
            attributes = {
              ...attributes,
              type: "group",
              groupId: initialMessage.group.id
            };
            if (initialMessage.group.type === GROUP_TYPES.UPDATE) {
              attributes = {
                ...attributes,
                name: initialMessage.group.name,
                members: _.union(members, conversation.get("members"))
              };
              if (initialMessage.group.name !== conversation.get("name")) {
                pendingGroupUpdate.name = initialMessage.group.name;
              }
              const avatarAttachment = initialMessage.group.avatar;
              let downloadedAvatar;
              let hash;
              if (avatarAttachment) {
                try {
                  downloadedAvatar = await (0, import_downloadAttachment.downloadAttachment)(avatarAttachment);
                  if (downloadedAvatar) {
                    const loadedAttachment = await window.Signal.Migrations.loadAttachmentData(downloadedAvatar);
                    hash = (0, import_Crypto.computeHash)(loadedAttachment.data);
                  }
                } catch (err) {
                  log.info("handleDataMessage: group avatar download failed");
                }
              }
              const existingAvatar = conversation.get("avatar");
              if (!existingAvatar && avatarAttachment || existingAvatar && existingAvatar.hash !== hash || existingAvatar && !avatarAttachment) {
                if (existingAvatar && existingAvatar.path) {
                  await window.Signal.Migrations.deleteAttachmentData(existingAvatar.path);
                }
                let avatar = null;
                if (downloadedAvatar && avatarAttachment !== null) {
                  const onDiskAttachment = await Attachment.migrateDataToFileSystem(downloadedAvatar, {
                    writeNewAttachmentData: window.Signal.Migrations.writeNewAttachmentData
                  });
                  avatar = {
                    ...onDiskAttachment,
                    hash
                  };
                }
                attributes.avatar = avatar;
                pendingGroupUpdate.avatarUpdated = true;
              } else {
                log.info("handleDataMessage: Group avatar hash matched; not replacing group avatar");
              }
              const difference = _.difference(members, conversation.get("members"));
              if (difference.length > 0) {
                const maybeE164s = (0, import_iterables.map)(difference, (id) => window.ConversationController.get(id)?.get("e164"));
                const e164s = (0, import_iterables.filter)(maybeE164s, import_isNotNil.isNotNil);
                pendingGroupUpdate.joined = [...e164s];
              }
              if (conversation.get("left")) {
                log.warn("re-added to a left group");
                attributes.left = false;
                conversation.set({ addedBy: (0, import_helpers.getContactId)(message.attributes) });
              }
            } else if (initialMessage.group.type === GROUP_TYPES.QUIT) {
              const sender = window.ConversationController.get(senderId);
              const inGroup = Boolean(sender && (conversation.get("members") || []).includes(sender.id));
              if (!inGroup) {
                const senderString = sender ? sender.idForLogging() : null;
                log.info(`Got 'left' message from someone not in group: ${senderString}. Dropping.`);
                return;
              }
              if ((0, import_whatTypeOfConversation.isMe)(sender.attributes)) {
                attributes.left = true;
                pendingGroupUpdate.left = "You";
              } else {
                pendingGroupUpdate.left = sender.get("id");
              }
              attributes.members = _.without(conversation.get("members"), sender.get("id"));
            }
            if (!(0, import_lodash.isEmpty)(pendingGroupUpdate)) {
              message.set("group_update", pendingGroupUpdate);
            }
          }
          if (message.isEmpty()) {
            log.info(`handleDataMessage: Dropping empty message ${message.idForLogging()} in conversation ${conversation.idForLogging()}`);
            confirm();
            return;
          }
          if ((0, import_message.isStory)(message.attributes)) {
            attributes.hasPostedStory = true;
          } else {
            attributes.active_at = now;
          }
          conversation.set(attributes);
          if (dataMessage.expireTimer && !(0, import_message.isExpirationTimerUpdate)(dataMessage)) {
            message.set({ expireTimer: dataMessage.expireTimer });
          }
          if (!hasGroupV2Prop && !(0, import_message.isStory)(message.attributes)) {
            if ((0, import_message.isExpirationTimerUpdate)(message.attributes)) {
              message.set({
                expirationTimerUpdate: {
                  source,
                  sourceUuid,
                  expireTimer: initialMessage.expireTimer
                }
              });
              conversation.set({ expireTimer: dataMessage.expireTimer });
            }
            const { expireTimer } = dataMessage;
            const shouldLogExpireTimerChange = (0, import_message.isExpirationTimerUpdate)(message.attributes) || expireTimer;
            if (shouldLogExpireTimerChange) {
              log.info("Update conversation 'expireTimer'", {
                id: conversation.idForLogging(),
                expireTimer,
                source: "handleDataMessage"
              });
            }
            if (!(0, import_message.isEndSession)(message.attributes)) {
              if (dataMessage.expireTimer) {
                if (dataMessage.expireTimer !== conversation.get("expireTimer")) {
                  conversation.updateExpirationTimer(dataMessage.expireTimer, {
                    source,
                    receivedAt: message.get("received_at"),
                    receivedAtMS: message.get("received_at_ms"),
                    sentAt: message.get("sent_at"),
                    fromGroupUpdate: (0, import_message.isGroupUpdate)(message.attributes),
                    reason: `handleDataMessage(${this.idForLogging()})`
                  });
                }
              } else if (conversation.get("expireTimer") && !(0, import_message.isGroupUpdate)(message.attributes)) {
                conversation.updateExpirationTimer(void 0, {
                  source,
                  receivedAt: message.get("received_at"),
                  receivedAtMS: message.get("received_at_ms"),
                  sentAt: message.get("sent_at"),
                  reason: `handleDataMessage(${this.idForLogging()})`
                });
              }
            }
          }
          if (initialMessage.profileKey) {
            const { profileKey } = initialMessage;
            if (source === window.textsecure.storage.user.getNumber() || sourceUuid === window.textsecure.storage.user.getUuid()?.toString()) {
              conversation.set({ profileSharing: true });
            } else if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
              conversation.setProfileKey(profileKey);
            } else {
              const localId = window.ConversationController.ensureContactIds({
                e164: source,
                uuid: sourceUuid
              });
              window.ConversationController.get(localId).setProfileKey(profileKey);
            }
          }
          if ((0, import_message.isTapToView)(message.attributes) && type === "outgoing") {
            await message.eraseContents();
          }
          if (type === "incoming" && (0, import_message.isTapToView)(message.attributes) && !message.isValidTapToView()) {
            log.warn(`Received tap to view message ${message.idForLogging()} with invalid data. Erasing contents.`);
            message.set({
              isTapToViewInvalid: true
            });
            await message.eraseContents();
          }
        }
        const conversationTimestamp = conversation.get("timestamp");
        const isGroupStoryReply = (0, import_whatTypeOfConversation.isGroup)(conversation.attributes) && message.get("storyId");
        if (!(0, import_message.isStory)(message.attributes) && !isGroupStoryReply && (!conversationTimestamp || message.get("sent_at") > conversationTimestamp)) {
          conversation.set({
            lastMessage: message.getNotificationText(),
            timestamp: message.get("sent_at")
          });
        }
        window.MessageController.register(message.id, message);
        conversation.incrementMessageCount();
        window.Signal.Data.updateConversation(conversation.attributes);
        const reduxState = window.reduxStore.getState();
        const giftBadge = message.get("giftBadge");
        if (giftBadge) {
          const { level } = giftBadge;
          const { updatesUrl } = window.SignalContext.config;
          (0, import_assert.strictAssert)(typeof updatesUrl === "string", "getProfile: expected updatesUrl to be a defined string");
          const userLanguages = (0, import_userLanguages.getUserLanguages)(navigator.languages, window.getLocale());
          const { messaging } = window.textsecure;
          if (!messaging) {
            throw new Error("handleDataMessage: messaging is not available");
          }
          const response = await messaging.server.getBoostBadgesFromServer(userLanguages);
          const boostBadgesByLevel = (0, import_parseBadgesFromServer.parseBoostBadgeListFromServer)(response, updatesUrl);
          const badge = boostBadgesByLevel[level];
          if (!badge) {
            log.error(`handleDataMessage: gift badge with level ${level} not found on server`);
          } else {
            await window.reduxActions.badges.updateOrCreate([badge]);
            giftBadge.id = badge.id;
          }
        }
        const attachments = this.get("attachments") || [];
        let queueStoryForDownload = false;
        if ((0, import_message.isStory)(message.attributes)) {
          const isShowingStories = (0, import_stories.shouldShowStoriesView)(reduxState);
          queueStoryForDownload = isShowingStories || await (0, import_shouldDownloadStory.shouldDownloadStory)(conversation.attributes);
        }
        const shouldHoldOffDownload = (0, import_message.isStory)(message.attributes) && !queueStoryForDownload || !(0, import_message.isStory)(message.attributes) && ((0, import_Attachment.isImage)(attachments) || (0, import_Attachment.isVideo)(attachments)) && (0, import_calling.isInCall)(reduxState);
        if (this.hasAttachmentDownloads() && (conversation.getAccepted() || (0, import_message.isOutgoing)(message.attributes)) && !shouldHoldOffDownload) {
          if (window.attachmentDownloadQueue) {
            window.attachmentDownloadQueue.unshift(message);
            log.info("Adding to attachmentDownloadQueue", message.get("sent_at"));
          } else {
            await message.queueAttachmentDownloads();
          }
        }
        const isFirstRun = true;
        await this.modifyTargetMessage(conversation, isFirstRun);
        log.info("handleDataMessage: Batching save for", message.get("sent_at"));
        this.saveAndNotify(conversation, confirm);
      } catch (error) {
        const errorForLog = error && error.stack ? error.stack : error;
        log.error("handleDataMessage", message.idForLogging(), "error:", errorForLog);
        throw error;
      }
    });
  }
  async saveAndNotify(conversation, confirm) {
    await window.Signal.Util.saveNewMessageBatcher.add(this.attributes);
    log.info("Message saved", this.get("sent_at"));
    conversation.trigger("newmessage", this);
    const isFirstRun = false;
    await this.modifyTargetMessage(conversation, isFirstRun);
    const isGroupStoryReply = (0, import_whatTypeOfConversation.isGroup)(conversation.attributes) && this.get("storyId");
    if ((0, import_isMessageUnread.isMessageUnread)(this.attributes) && !isGroupStoryReply) {
      await conversation.notify(this);
    }
    if (this.get("type") === "outgoing") {
      conversation.incrementSentMessageCount();
    }
    window.Whisper.events.trigger("incrementProgress");
    confirm();
    conversation.queueJob("updateUnread", () => conversation.updateUnread());
  }
  async modifyTargetMessage(conversation, isFirstRun) {
    const message = this;
    const type = message.get("type");
    let changed = false;
    if (type === "outgoing") {
      const sendActions = import_MessageReceipts.MessageReceipts.getSingleton().forMessage(conversation, message).map((receipt) => {
        let sendActionType;
        const receiptType = receipt.get("type");
        switch (receiptType) {
          case import_MessageReceipts.MessageReceiptType.Delivery:
            sendActionType = import_MessageSendState.SendActionType.GotDeliveryReceipt;
            break;
          case import_MessageReceipts.MessageReceiptType.Read:
            sendActionType = import_MessageSendState.SendActionType.GotReadReceipt;
            break;
          case import_MessageReceipts.MessageReceiptType.View:
            sendActionType = import_MessageSendState.SendActionType.GotViewedReceipt;
            break;
          default:
            throw (0, import_missingCaseError.missingCaseError)(receiptType);
        }
        return {
          destinationConversationId: receipt.get("sourceConversationId"),
          action: {
            type: sendActionType,
            updatedAt: receipt.get("receiptTimestamp")
          }
        };
      });
      const oldSendStateByConversationId = this.get("sendStateByConversationId") || {};
      const newSendStateByConversationId = (0, import_iterables.reduce)(sendActions, (result, { destinationConversationId, action }) => {
        const oldSendState = (0, import_getOwn.getOwn)(result, destinationConversationId);
        if (!oldSendState) {
          log.warn(`Got a receipt for a conversation (${destinationConversationId}), but we have no record of sending to them`);
          return result;
        }
        const newSendState = (0, import_MessageSendState.sendStateReducer)(oldSendState, action);
        return {
          ...result,
          [destinationConversationId]: newSendState
        };
      }, oldSendStateByConversationId);
      if (!(0, import_lodash.isEqual)(oldSendStateByConversationId, newSendStateByConversationId)) {
        message.set("sendStateByConversationId", newSendStateByConversationId);
        changed = true;
      }
    }
    if (type === "incoming") {
      const readSync = import_ReadSyncs.ReadSyncs.getSingleton().forMessage(message);
      const readSyncs = readSync ? [readSync] : [];
      const viewSyncs = import_ViewSyncs.ViewSyncs.getSingleton().forMessage(message);
      const isGroupStoryReply = (0, import_whatTypeOfConversation.isGroup)(conversation.attributes) && message.get("storyId");
      const keepMutedChatsArchived = window.storage.get("keepMutedChatsArchived") ?? false;
      const keepThisConversationArchived = keepMutedChatsArchived && conversation.isMuted();
      if (readSyncs.length !== 0 || viewSyncs.length !== 0) {
        const markReadAt = Math.min(Date.now(), ...readSyncs.map((sync) => sync.get("readAt")), ...viewSyncs.map((sync) => sync.get("viewedAt")));
        if (message.get("expireTimer")) {
          const existingExpirationStartTimestamp = message.get("expirationStartTimestamp");
          message.set("expirationStartTimestamp", Math.min(existingExpirationStartTimestamp ?? Date.now(), markReadAt));
          changed = true;
        }
        let newReadStatus;
        if (viewSyncs.length) {
          newReadStatus = import_MessageReadStatus.ReadStatus.Viewed;
        } else {
          (0, import_assert.strictAssert)(readSyncs.length !== 0, "Should have either view or read syncs");
          newReadStatus = import_MessageReadStatus.ReadStatus.Read;
        }
        message.set({
          readStatus: newReadStatus,
          seenStatus: import_MessageSeenStatus.SeenStatus.Seen
        });
        changed = true;
        this.pendingMarkRead = Math.min(this.pendingMarkRead ?? Date.now(), markReadAt);
      } else if (isFirstRun && !isGroupStoryReply && !keepThisConversationArchived) {
        conversation.set({
          isArchived: false
        });
      }
      if (!isFirstRun && this.pendingMarkRead) {
        const markReadAt = this.pendingMarkRead;
        this.pendingMarkRead = void 0;
        message.getConversation()?.onReadMessage(message, markReadAt);
      }
      if ((0, import_message.isTapToView)(message.attributes)) {
        const viewOnceOpenSync = import_ViewOnceOpenSyncs.ViewOnceOpenSyncs.getSingleton().forMessage(message);
        if (viewOnceOpenSync) {
          await message.markViewOnceMessageViewed({ fromSync: true });
          changed = true;
        }
      }
    }
    if ((0, import_message.isStory)(message.attributes) && !message.get("expirationStartTimestamp")) {
      message.set("expirationStartTimestamp", Math.min(message.get("serverTimestamp") || message.get("timestamp"), Date.now()));
      changed = true;
    }
    const reactions = import_Reactions.Reactions.getSingleton().forMessage(message);
    await Promise.all(reactions.map(async (reaction) => {
      await message.handleReaction(reaction, false);
      changed = true;
    }));
    const deletes = import_Deletes.Deletes.getSingleton().forMessage(message);
    await Promise.all(deletes.map(async (del) => {
      await window.Signal.Util.deleteForEveryone(message, del, false);
      changed = true;
    }));
    if (changed && !isFirstRun) {
      log.info(`modifyTargetMessage/${this.idForLogging()}: Changes in second run; saving.`);
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
  }
  async handleReaction(reaction, shouldPersist = true) {
    const { attributes } = this;
    if (this.get("deletedForEveryone")) {
      return;
    }
    if ((0, import_message.hasErrors)(attributes) && ((0, import_message.isIncoming)(attributes) || (0, import_message.getMessagePropStatus)(attributes, window.ConversationController.getOurConversationIdOrThrow()) !== "partial-sent")) {
      return;
    }
    const conversation = this.getConversation();
    if (!conversation) {
      return;
    }
    const previousLength = (this.get("reactions") || []).length;
    if (reaction.get("source") === import_ReactionSource.ReactionSource.FromThisDevice) {
      log.info(`handleReaction: sending reaction to ${this.idForLogging()} from this device`);
      const newReaction = {
        emoji: reaction.get("remove") ? void 0 : reaction.get("emoji"),
        fromId: reaction.get("fromId"),
        targetAuthorUuid: reaction.get("targetAuthorUuid"),
        targetTimestamp: reaction.get("targetTimestamp"),
        timestamp: reaction.get("timestamp"),
        isSentByConversationId: (0, import_iterables.zipObject)(conversation.getMemberConversationIds(), (0, import_iterables.repeat)(false))
      };
      const reactions = reactionUtil.addOutgoingReaction(this.get("reactions") || [], newReaction, (0, import_message.isStory)(this.attributes));
      this.set({ reactions });
    } else {
      const oldReactions = this.get("reactions") || [];
      let reactions;
      const oldReaction = oldReactions.find((re) => (0, import_util.isNewReactionReplacingPrevious)(re, reaction.attributes, this.attributes));
      if (oldReaction) {
        this.clearNotifications(oldReaction);
      }
      if (reaction.get("remove")) {
        log.info("handleReaction: removing reaction for message", this.idForLogging());
        if (reaction.get("source") === import_ReactionSource.ReactionSource.FromSync) {
          reactions = oldReactions.filter((re) => !(0, import_util.isNewReactionReplacingPrevious)(re, reaction.attributes, this.attributes) || re.timestamp > reaction.get("timestamp"));
        } else {
          reactions = oldReactions.filter((re) => !(0, import_util.isNewReactionReplacingPrevious)(re, reaction.attributes, this.attributes));
        }
        this.set({ reactions });
        await window.Signal.Data.removeReactionFromConversation({
          emoji: reaction.get("emoji"),
          fromId: reaction.get("fromId"),
          targetAuthorUuid: reaction.get("targetAuthorUuid"),
          targetTimestamp: reaction.get("targetTimestamp")
        });
      } else {
        log.info("handleReaction: adding reaction for message", this.idForLogging());
        let reactionToAdd;
        if (reaction.get("source") === import_ReactionSource.ReactionSource.FromSync) {
          const ourReactions = [
            reaction.toJSON(),
            ...oldReactions.filter((re) => re.fromId === reaction.get("fromId"))
          ];
          reactionToAdd = (0, import_lodash.maxBy)(ourReactions, "timestamp");
        } else {
          reactionToAdd = reaction.toJSON();
        }
        reactions = oldReactions.filter((re) => !(0, import_util.isNewReactionReplacingPrevious)(re, reaction.attributes, this.attributes));
        reactions.push(reactionToAdd);
        this.set({ reactions });
        if ((0, import_message.isOutgoing)(this.attributes) && reaction.get("source") === import_ReactionSource.ReactionSource.FromSomeoneElse) {
          conversation.notify(this, reaction);
        }
        await window.Signal.Data.addReaction({
          conversationId: this.get("conversationId"),
          emoji: reaction.get("emoji"),
          fromId: reaction.get("fromId"),
          messageId: this.id,
          messageReceivedAt: this.get("received_at"),
          targetAuthorUuid: reaction.get("targetAuthorUuid"),
          targetTimestamp: reaction.get("targetTimestamp")
        });
      }
    }
    const currentLength = (this.get("reactions") || []).length;
    log.info("handleReaction:", `Done processing reaction for message ${this.idForLogging()}.`, `Went from ${previousLength} to ${currentLength} reactions.`);
    if (reaction.get("source") === import_ReactionSource.ReactionSource.FromThisDevice) {
      const jobData = {
        type: import_conversationJobQueue.conversationQueueJobEnum.enum.Reaction,
        conversationId: conversation.id,
        messageId: this.id,
        revision: conversation.get("revision")
      };
      if (shouldPersist) {
        await import_conversationJobQueue.conversationJobQueue.add(jobData, async (jobToInsert) => {
          log.info(`enqueueReactionForSend: saving message ${this.idForLogging()} and job ${jobToInsert.id}`);
          await window.Signal.Data.saveMessage(this.attributes, {
            jobToInsert,
            ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
          });
        });
      } else {
        await import_conversationJobQueue.conversationJobQueue.add(jobData);
      }
    } else if (shouldPersist) {
      await window.Signal.Data.saveMessage(this.attributes, {
        ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
      });
    }
  }
  async handleDeleteForEveryone(del, shouldPersist = true) {
    log.info("Handling DOE.", {
      fromId: del.get("fromId"),
      targetSentTimestamp: del.get("targetSentTimestamp"),
      messageServerTimestamp: this.get("serverTimestamp"),
      deleteServerTimestamp: del.get("serverTimestamp")
    });
    import_notifications.notificationService.removeBy({ messageId: this.get("id") });
    await this.eraseContents({ deletedForEveryone: true, reactions: [] }, shouldPersist);
    this.getConversation()?.updateLastMessage();
  }
  clearNotifications(reaction = {}) {
    import_notifications.notificationService.removeBy({
      ...reaction,
      messageId: this.id
    });
  }
}
window.Whisper.Message = MessageModel;
window.Whisper.Message.getLongMessageAttachment = ({
  body,
  attachments,
  now
}) => {
  if (!body || body.length <= 2048) {
    return {
      body,
      attachments
    };
  }
  const data = Bytes.fromString(body);
  const attachment = {
    contentType: MIME.LONG_MESSAGE,
    fileName: `long-message-${now}.txt`,
    data,
    size: data.byteLength
  };
  return {
    body: body.slice(0, 2048),
    attachments: [attachment, ...attachments]
  };
};
window.Whisper.MessageCollection = window.Backbone.Collection.extend({
  model: window.Whisper.Message,
  comparator(left, right) {
    if (left.get("received_at") === right.get("received_at")) {
      return (left.get("sent_at") || 0) - (right.get("sent_at") || 0);
    }
    return (left.get("received_at") || 0) - (right.get("received_at") || 0);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MessageModel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpc0VtcHR5LCBpc0VxdWFsLCBtYXBWYWx1ZXMsIG1heEJ5LCBub29wLCBvbWl0LCB1bmlvbiB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgdHlwZSB7XG4gIEN1c3RvbUVycm9yLFxuICBHcm91cFYxVXBkYXRlLFxuICBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gIE1lc3NhZ2VSZWFjdGlvblR5cGUsXG4gIFF1b3RlZE1lc3NhZ2VUeXBlLFxuICBXaGF0SXNUaGlzLFxufSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB7XG4gIGZpbHRlcixcbiAgZmluZCxcbiAgbWFwLFxuICByZWR1Y2UsXG4gIHJlcGVhdCxcbiAgemlwT2JqZWN0LFxufSBmcm9tICcuLi91dGlsL2l0ZXJhYmxlcyc7XG5pbXBvcnQgdHlwZSB7IFNlbnRFdmVudERhdGEgfSBmcm9tICcuLi90ZXh0c2VjdXJlL21lc3NhZ2VSZWNlaXZlckV2ZW50cyc7XG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL3V0aWwvaXNOb3ROaWwnO1xuaW1wb3J0IHsgaXNOb3JtYWxOdW1iZXIgfSBmcm9tICcuLi91dGlsL2lzTm9ybWFsTnVtYmVyJztcbmltcG9ydCB7IHNvZnRBc3NlcnQsIHN0cmljdEFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgZHJvcE51bGwgfSBmcm9tICcuLi91dGlsL2Ryb3BOdWxsJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUge1xuICBPd25Qcm9wcyBhcyBTbWFydE1lc3NhZ2VEZXRhaWxQcm9wc1R5cGUsXG4gIENvbnRhY3QgYXMgU21hcnRNZXNzYWdlRGV0YWlsQ29udGFjdCxcbn0gZnJvbSAnLi4vc3RhdGUvc21hcnQvTWVzc2FnZURldGFpbCc7XG5pbXBvcnQgeyBnZXRDYWxsaW5nTm90aWZpY2F0aW9uVGV4dCB9IGZyb20gJy4uL3V0aWwvY2FsbGluZ05vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7XG4gIFByb2Nlc3NlZERhdGFNZXNzYWdlLFxuICBQcm9jZXNzZWRRdW90ZSxcbiAgUHJvY2Vzc2VkVW5pZGVudGlmaWVkRGVsaXZlcnlTdGF0dXMsXG4gIENhbGxiYWNrUmVzdWx0VHlwZSxcbn0gZnJvbSAnLi4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCB7IFNlbmRNZXNzYWdlUHJvdG9FcnJvciB9IGZyb20gJy4uL3RleHRzZWN1cmUvRXJyb3JzJztcbmltcG9ydCAqIGFzIGV4cGlyYXRpb25UaW1lciBmcm9tICcuLi91dGlsL2V4cGlyYXRpb25UaW1lcic7XG5pbXBvcnQgeyBnZXRVc2VyTGFuZ3VhZ2VzIH0gZnJvbSAnLi4vdXRpbC91c2VyTGFuZ3VhZ2VzJztcblxuaW1wb3J0IHR5cGUgeyBSZWFjdGlvblR5cGUgfSBmcm9tICcuLi90eXBlcy9SZWFjdGlvbnMnO1xuaW1wb3J0IHsgVVVJRCwgVVVJREtpbmQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCAqIGFzIHJlYWN0aW9uVXRpbCBmcm9tICcuLi9yZWFjdGlvbnMvdXRpbCc7XG5pbXBvcnQgKiBhcyBTdGlja2VycyBmcm9tICcuLi90eXBlcy9TdGlja2Vycyc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCAqIGFzIEVtYmVkZGVkQ29udGFjdCBmcm9tICcuLi90eXBlcy9FbWJlZGRlZENvbnRhY3QnO1xuaW1wb3J0IHR5cGUgeyBBdHRhY2htZW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgaXNJbWFnZSwgaXNWaWRlbyB9IGZyb20gJy4uL3R5cGVzL0F0dGFjaG1lbnQnO1xuaW1wb3J0ICogYXMgQXR0YWNobWVudCBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IHN0cmluZ1RvTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCAqIGFzIE1JTUUgZnJvbSAnLi4vdHlwZXMvTUlNRSc7XG5pbXBvcnQgKiBhcyBHcm91cENoYW5nZSBmcm9tICcuLi9ncm91cENoYW5nZSc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHR5cGUgeyBTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkIH0gZnJvbSAnLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQge1xuICBTZW5kQWN0aW9uVHlwZSxcbiAgU2VuZFN0YXR1cyxcbiAgaXNNZXNzYWdlSnVzdEZvck1lLFxuICBpc1NlbnQsXG4gIHNlbmRTdGF0ZVJlZHVjZXIsXG4gIHNvbWVTZW5kU3RhdHVzLFxufSBmcm9tICcuLi9tZXNzYWdlcy9NZXNzYWdlU2VuZFN0YXRlJztcbmltcG9ydCB7IG1pZ3JhdGVMZWdhY3lSZWFkU3RhdHVzIH0gZnJvbSAnLi4vbWVzc2FnZXMvbWlncmF0ZUxlZ2FjeVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgbWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vbWVzc2FnZXMvbWlncmF0ZUxlZ2FjeVNlbmRBdHRyaWJ1dGVzJztcbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4uL3V0aWwvZ2V0T3duJztcbmltcG9ydCB7IG1hcmtSZWFkLCBtYXJrVmlld2VkIH0gZnJvbSAnLi4vc2VydmljZXMvTWVzc2FnZVVwZGF0ZXInO1xuaW1wb3J0IHsgaXNNZXNzYWdlVW5yZWFkIH0gZnJvbSAnLi4vdXRpbC9pc01lc3NhZ2VVbnJlYWQnO1xuaW1wb3J0IHtcbiAgaXNEaXJlY3RDb252ZXJzYXRpb24sXG4gIGlzR3JvdXAsXG4gIGlzR3JvdXBWMSxcbiAgaXNHcm91cFYyLFxuICBpc01lLFxufSBmcm9tICcuLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGdldFNlbmRPcHRpb25zIH0gZnJvbSAnLi4vdXRpbC9nZXRTZW5kT3B0aW9ucyc7XG5pbXBvcnQgeyBmaW5kQW5kRm9ybWF0Q29udGFjdCB9IGZyb20gJy4uL3V0aWwvZmluZEFuZEZvcm1hdENvbnRhY3QnO1xuaW1wb3J0IHtcbiAgZ2V0TWVzc2FnZVByb3BTdGF0dXMsXG4gIGdldFByb3BzRm9yQ2FsbEhpc3RvcnksXG4gIGdldFByb3BzRm9yTWVzc2FnZSxcbiAgaGFzRXJyb3JzLFxuICBpc0NhbGxIaXN0b3J5LFxuICBpc0NoYXRTZXNzaW9uUmVmcmVzaGVkLFxuICBpc0RlbGl2ZXJ5SXNzdWUsXG4gIGlzRW5kU2Vzc2lvbixcbiAgaXNFeHBpcmF0aW9uVGltZXJVcGRhdGUsXG4gIGlzR2lmdEJhZGdlLFxuICBpc0dyb3VwVXBkYXRlLFxuICBpc0dyb3VwVjFNaWdyYXRpb24sXG4gIGlzR3JvdXBWMkNoYW5nZSxcbiAgaXNJbmNvbWluZyxcbiAgaXNLZXlDaGFuZ2UsXG4gIGlzT3V0Z29pbmcsXG4gIGlzU3RvcnksXG4gIGlzUHJvZmlsZUNoYW5nZSxcbiAgaXNUYXBUb1ZpZXcsXG4gIGlzVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24sXG4gIGlzVW5zdXBwb3J0ZWRNZXNzYWdlLFxuICBpc1ZlcmlmaWVkQ2hhbmdlLFxuICBwcm9jZXNzQm9keVJhbmdlcyxcbn0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2UnO1xuaW1wb3J0IHtcbiAgaXNJbkNhbGwsXG4gIGdldENhbGxTZWxlY3RvcixcbiAgZ2V0QWN0aXZlQ2FsbCxcbn0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2NhbGxpbmcnO1xuaW1wb3J0IHsgZ2V0QWNjb3VudFNlbGVjdG9yIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2FjY291bnRzJztcbmltcG9ydCB7IGdldENvbnRhY3ROYW1lQ29sb3JTZWxlY3RvciB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7XG4gIE1lc3NhZ2VSZWNlaXB0cyxcbiAgTWVzc2FnZVJlY2VpcHRUeXBlLFxufSBmcm9tICcuLi9tZXNzYWdlTW9kaWZpZXJzL01lc3NhZ2VSZWNlaXB0cyc7XG5pbXBvcnQgeyBEZWxldGVzIH0gZnJvbSAnLi4vbWVzc2FnZU1vZGlmaWVycy9EZWxldGVzJztcbmltcG9ydCB0eXBlIHsgUmVhY3Rpb25Nb2RlbCB9IGZyb20gJy4uL21lc3NhZ2VNb2RpZmllcnMvUmVhY3Rpb25zJztcbmltcG9ydCB7IFJlYWN0aW9ucyB9IGZyb20gJy4uL21lc3NhZ2VNb2RpZmllcnMvUmVhY3Rpb25zJztcbmltcG9ydCB7IFJlYWN0aW9uU291cmNlIH0gZnJvbSAnLi4vcmVhY3Rpb25zL1JlYWN0aW9uU291cmNlJztcbmltcG9ydCB7IFJlYWRTeW5jcyB9IGZyb20gJy4uL21lc3NhZ2VNb2RpZmllcnMvUmVhZFN5bmNzJztcbmltcG9ydCB7IFZpZXdTeW5jcyB9IGZyb20gJy4uL21lc3NhZ2VNb2RpZmllcnMvVmlld1N5bmNzJztcbmltcG9ydCB7IFZpZXdPbmNlT3BlblN5bmNzIH0gZnJvbSAnLi4vbWVzc2FnZU1vZGlmaWVycy9WaWV3T25jZU9wZW5TeW5jcyc7XG5pbXBvcnQgKiBhcyBMaW5rUHJldmlldyBmcm9tICcuLi90eXBlcy9MaW5rUHJldmlldyc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0IHtcbiAgY29udmVyc2F0aW9uSm9iUXVldWUsXG4gIGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bSxcbn0gZnJvbSAnLi4vam9icy9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBub3RpZmljYXRpb25TZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvbm90aWZpY2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3VHlwZSB9IGZyb20gJy4uL3R5cGVzL21lc3NhZ2UvTGlua1ByZXZpZXdzJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBjb21wdXRlSGFzaCB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgeyBjbGVhbnVwTWVzc2FnZSwgZGVsZXRlTWVzc2FnZURhdGEgfSBmcm9tICcuLi91dGlsL2NsZWFudXAnO1xuaW1wb3J0IHtcbiAgZ2V0Q29udGFjdCxcbiAgZ2V0Q29udGFjdElkLFxuICBnZXRTb3VyY2UsXG4gIGdldFNvdXJjZVV1aWQsXG4gIGlzQ3VzdG9tRXJyb3IsXG4gIGlzUXVvdGVBTWF0Y2gsXG59IGZyb20gJy4uL21lc3NhZ2VzL2hlbHBlcnMnO1xuaW1wb3J0IHR5cGUgeyBSZXBsYWNlbWVudFZhbHVlc1R5cGUgfSBmcm9tICcuLi90eXBlcy9JMThOJztcbmltcG9ydCB7IHZpZXdPbmNlT3BlbkpvYlF1ZXVlIH0gZnJvbSAnLi4vam9icy92aWV3T25jZU9wZW5Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlSWRGb3JMb2dnaW5nIH0gZnJvbSAnLi4vdXRpbC9pZEZvckxvZ2dpbmcnO1xuaW1wb3J0IHsgaGFzQXR0YWNobWVudERvd25sb2FkcyB9IGZyb20gJy4uL3V0aWwvaGFzQXR0YWNobWVudERvd25sb2Fkcyc7XG5pbXBvcnQgeyBxdWV1ZUF0dGFjaG1lbnREb3dubG9hZHMgfSBmcm9tICcuLi91dGlsL3F1ZXVlQXR0YWNobWVudERvd25sb2Fkcyc7XG5pbXBvcnQgeyBmaW5kU3RvcnlNZXNzYWdlIH0gZnJvbSAnLi4vdXRpbC9maW5kU3RvcnlNZXNzYWdlJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uQWNjZXB0ZWQgfSBmcm9tICcuLi91dGlsL2lzQ29udmVyc2F0aW9uQWNjZXB0ZWQnO1xuaW1wb3J0IHsgZ2V0U3RvcnlEYXRhRnJvbU1lc3NhZ2VBdHRyaWJ1dGVzIH0gZnJvbSAnLi4vc2VydmljZXMvc3RvcnlMb2FkZXInO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25RdWV1ZUpvYkRhdGEgfSBmcm9tICcuLi9qb2JzL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB7IGdldE1lc3NhZ2VCeUlkIH0gZnJvbSAnLi4vbWVzc2FnZXMvZ2V0TWVzc2FnZUJ5SWQnO1xuaW1wb3J0IHsgc2hvdWxkRG93bmxvYWRTdG9yeSB9IGZyb20gJy4uL3V0aWwvc2hvdWxkRG93bmxvYWRTdG9yeSc7XG5pbXBvcnQgeyBzaG91bGRTaG93U3Rvcmllc1ZpZXcgfSBmcm9tICcuLi9zdGF0ZS9zZWxlY3RvcnMvc3Rvcmllcyc7XG5pbXBvcnQgdHlwZSB7IENvbnRhY3RXaXRoSHlkcmF0ZWRBdmF0YXIgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcbmltcG9ydCB7IFNlZW5TdGF0dXMgfSBmcm9tICcuLi9NZXNzYWdlU2VlblN0YXR1cyc7XG5pbXBvcnQgeyBpc05ld1JlYWN0aW9uUmVwbGFjaW5nUHJldmlvdXMgfSBmcm9tICcuLi9yZWFjdGlvbnMvdXRpbCc7XG5pbXBvcnQgeyBwYXJzZUJvb3N0QmFkZ2VMaXN0RnJvbVNlcnZlciB9IGZyb20gJy4uL2JhZGdlcy9wYXJzZUJhZGdlc0Zyb21TZXJ2ZXInO1xuaW1wb3J0IHsgR2lmdEJhZGdlU3RhdGVzIH0gZnJvbSAnLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vTWVzc2FnZSc7XG5pbXBvcnQgeyBkb3dubG9hZEF0dGFjaG1lbnQgfSBmcm9tICcuLi91dGlsL2Rvd25sb2FkQXR0YWNobWVudCc7XG5cbi8qIGVzbGludC1kaXNhYmxlIG1vcmUvbm8tdGhlbiAqL1xuXG50eXBlIFByb3BzRm9yTWVzc2FnZURldGFpbCA9IFBpY2s8XG4gIFNtYXJ0TWVzc2FnZURldGFpbFByb3BzVHlwZSxcbiAgJ3NlbnRBdCcgfCAncmVjZWl2ZWRBdCcgfCAnbWVzc2FnZScgfCAnZXJyb3JzJyB8ICdjb250YWN0cydcbj47XG5cbmRlY2xhcmUgY29uc3QgXzogdHlwZW9mIHdpbmRvdy5fO1xuXG53aW5kb3cuV2hpc3BlciA9IHdpbmRvdy5XaGlzcGVyIHx8IHt9O1xuXG5jb25zdCB7IE1lc3NhZ2U6IFR5cGVkTWVzc2FnZSB9ID0gd2luZG93LlNpZ25hbC5UeXBlcztcbmNvbnN0IHsgdXBncmFkZU1lc3NhZ2VTY2hlbWEgfSA9IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucztcbmNvbnN0IHsgZ2V0VGV4dFdpdGhNZW50aW9ucywgR29vZ2xlQ2hyb21lIH0gPSB3aW5kb3cuU2lnbmFsLlV0aWw7XG5jb25zdCB7IGdldE1lc3NhZ2VCeVNlbmRlciB9ID0gd2luZG93LlNpZ25hbC5EYXRhO1xuXG5leHBvcnQgY2xhc3MgTWVzc2FnZU1vZGVsIGV4dGVuZHMgd2luZG93LkJhY2tib25lLk1vZGVsPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4ge1xuICBzdGF0aWMgZ2V0TG9uZ01lc3NhZ2VBdHRhY2htZW50OiAoXG4gICAgYXR0YWNobWVudDogdHlwZW9mIHdpbmRvdy5XaGF0SXNUaGlzXG4gICkgPT4gdHlwZW9mIHdpbmRvdy5XaGF0SXNUaGlzO1xuXG4gIENVUlJFTlRfUFJPVE9DT0xfVkVSU0lPTj86IG51bWJlcjtcblxuICAvLyBTZXQgd2hlbiBzZW5kaW5nIHNvbWUgc3luYyBtZXNzYWdlcywgc28gd2UgZ2V0IHRoZSBmdW5jdGlvbmFsaXR5IG9mXG4gIC8vICAgc2VuZCgpLCB3aXRob3V0IHpvbWJpZSBtZXNzYWdlcyBnb2luZyBpbnRvIHRoZSBkYXRhYmFzZS5cbiAgZG9Ob3RTYXZlPzogYm9vbGVhbjtcblxuICBJTklUSUFMX1BST1RPQ09MX1ZFUlNJT04/OiBudW1iZXI7XG5cbiAgaXNTZWxlY3RlZD86IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBwZW5kaW5nTWFya1JlYWQ/OiBudW1iZXI7XG5cbiAgc3luY1Byb21pc2U/OiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZSB8IHZvaWQ+O1xuXG4gIGNhY2hlZE91dGdvaW5nQ29udGFjdERhdGE/OiBBcnJheTxDb250YWN0V2l0aEh5ZHJhdGVkQXZhdGFyPjtcblxuICBjYWNoZWRPdXRnb2luZ1ByZXZpZXdEYXRhPzogQXJyYXk8TGlua1ByZXZpZXdUeXBlPjtcblxuICBjYWNoZWRPdXRnb2luZ1F1b3RlRGF0YT86IFdoYXRJc1RoaXM7XG5cbiAgY2FjaGVkT3V0Z29pbmdTdGlja2VyRGF0YT86IFdoYXRJc1RoaXM7XG5cbiAgb3ZlcnJpZGUgaW5pdGlhbGl6ZShhdHRyaWJ1dGVzOiB1bmtub3duKTogdm9pZCB7XG4gICAgaWYgKF8uaXNPYmplY3QoYXR0cmlidXRlcykpIHtcbiAgICAgIHRoaXMuc2V0KFxuICAgICAgICBUeXBlZE1lc3NhZ2UuaW5pdGlhbGl6ZVNjaGVtYVZlcnNpb24oe1xuICAgICAgICAgIG1lc3NhZ2U6IGF0dHJpYnV0ZXMgYXMgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAgICAgICAgIGxvZ2dlcjogbG9nLFxuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWFkU3RhdHVzID0gbWlncmF0ZUxlZ2FjeVJlYWRTdGF0dXModGhpcy5hdHRyaWJ1dGVzKTtcbiAgICBpZiAocmVhZFN0YXR1cyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB0aGlzLnNldChcbiAgICAgICAge1xuICAgICAgICAgIHJlYWRTdGF0dXMsXG4gICAgICAgICAgc2VlblN0YXR1czpcbiAgICAgICAgICAgIHJlYWRTdGF0dXMgPT09IFJlYWRTdGF0dXMuVW5yZWFkXG4gICAgICAgICAgICAgID8gU2VlblN0YXR1cy5VbnNlZW5cbiAgICAgICAgICAgICAgOiBTZWVuU3RhdHVzLlNlZW4sXG4gICAgICAgIH0sXG4gICAgICAgIHsgc2lsZW50OiB0cnVlIH1cbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3Qgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCA9IG1pZ3JhdGVMZWdhY3lTZW5kQXR0cmlidXRlcyhcbiAgICAgIHRoaXMuYXR0cmlidXRlcyxcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldC5iaW5kKHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyKSxcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpXG4gICAgKTtcbiAgICBpZiAoc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCkge1xuICAgICAgdGhpcy5zZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnLCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCB7XG4gICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHRoaXMuQ1VSUkVOVF9QUk9UT0NPTF9WRVJTSU9OID0gUHJvdG8uRGF0YU1lc3NhZ2UuUHJvdG9jb2xWZXJzaW9uLkNVUlJFTlQ7XG4gICAgdGhpcy5JTklUSUFMX1BST1RPQ09MX1ZFUlNJT04gPSBQcm90by5EYXRhTWVzc2FnZS5Qcm90b2NvbFZlcnNpb24uSU5JVElBTDtcblxuICAgIHRoaXMub24oJ2NoYW5nZScsIHRoaXMubm90aWZ5UmVkdXgpO1xuICB9XG5cbiAgbm90aWZ5UmVkdXgoKTogdm9pZCB7XG4gICAgY29uc3QgeyBzdG9yeUNoYW5nZWQgfSA9IHdpbmRvdy5yZWR1eEFjdGlvbnMuc3RvcmllcztcblxuICAgIGlmIChpc1N0b3J5KHRoaXMuYXR0cmlidXRlcykpIHtcbiAgICAgIGNvbnN0IHN0b3J5RGF0YSA9IGdldFN0b3J5RGF0YUZyb21NZXNzYWdlQXR0cmlidXRlcyh0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gICAgICBpZiAoIXN0b3J5RGF0YSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHN0b3J5Q2hhbmdlZChzdG9yeURhdGEpO1xuXG4gICAgICAvLyBXZSBkb24ndCB3YW50IG1lc3NhZ2VDaGFuZ2VkIHRvIHJ1blxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgbWVzc2FnZUNoYW5nZWQgfSA9IHdpbmRvdy5yZWR1eEFjdGlvbnMuY29udmVyc2F0aW9ucztcblxuICAgIGlmIChtZXNzYWdlQ2hhbmdlZCkge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB0aGlzLmdldCgnY29udmVyc2F0aW9uSWQnKTtcbiAgICAgIC8vIE5vdGU6IFRoZSBjbG9uZSBpcyBpbXBvcnRhbnQgZm9yIHRyaWdnZXJpbmcgYSByZS1ydW4gb2Ygc2VsZWN0b3JzXG4gICAgICBtZXNzYWdlQ2hhbmdlZCh0aGlzLmlkLCBjb252ZXJzYXRpb25JZCwgeyAuLi50aGlzLmF0dHJpYnV0ZXMgfSk7XG4gICAgfVxuICB9XG5cbiAgZ2V0U2VuZGVySWRlbnRpZmllcigpOiBzdHJpbmcge1xuICAgIGNvbnN0IHNlbnRBdCA9IHRoaXMuZ2V0KCdzZW50X2F0Jyk7XG4gICAgY29uc3Qgc291cmNlID0gdGhpcy5nZXQoJ3NvdXJjZScpO1xuICAgIGNvbnN0IHNvdXJjZVV1aWQgPSB0aGlzLmdldCgnc291cmNlVXVpZCcpO1xuICAgIGNvbnN0IHNvdXJjZURldmljZSA9IHRoaXMuZ2V0KCdzb3VyY2VEZXZpY2UnKTtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgY29uc3Qgc291cmNlSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgIGUxNjQ6IHNvdXJjZSxcbiAgICAgIHV1aWQ6IHNvdXJjZVV1aWQsXG4gICAgfSkhO1xuXG4gICAgcmV0dXJuIGAke3NvdXJjZUlkfS4ke3NvdXJjZURldmljZX0tJHtzZW50QXR9YDtcbiAgfVxuXG4gIGdldFJlY2VpdmVkQXQoKTogbnVtYmVyIHtcbiAgICAvLyBXZSB3b3VsZCBsaWtlIHRvIGdldCB0aGUgcmVjZWl2ZWRfYXRfbXMgaWRlYWxseSBzaW5jZSByZWNlaXZlZF9hdCBpc1xuICAgIC8vIG5vdyBhbiBpbmNyZW1lbnRpbmcgY291bnRlciBmb3IgbWVzc2FnZXMgYW5kIG5vdCB0aGUgYWN0dWFsIHRpbWUgdGhhdFxuICAgIC8vIHRoZSBtZXNzYWdlIHdhcyByZWNlaXZlZC4gSWYgdGhpcyBmaWVsZCBkb2Vzbid0IGV4aXN0IG9uIHRoZSBtZXNzYWdlXG4gICAgLy8gdGhlbiB3ZSBjYW4gdHJ1c3QgcmVjZWl2ZWRfYXQuXG4gICAgcmV0dXJuIE51bWJlcih0aGlzLmdldCgncmVjZWl2ZWRfYXRfbXMnKSB8fCB0aGlzLmdldCgncmVjZWl2ZWRfYXQnKSk7XG4gIH1cblxuICBpc05vcm1hbEJ1YmJsZSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXM7XG5cbiAgICByZXR1cm4gKFxuICAgICAgIWlzQ2FsbEhpc3RvcnkoYXR0cmlidXRlcykgJiZcbiAgICAgICFpc0NoYXRTZXNzaW9uUmVmcmVzaGVkKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNFbmRTZXNzaW9uKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNFeHBpcmF0aW9uVGltZXJVcGRhdGUoYXR0cmlidXRlcykgJiZcbiAgICAgICFpc0dyb3VwVXBkYXRlKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNHcm91cFYyQ2hhbmdlKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNHcm91cFYxTWlncmF0aW9uKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNLZXlDaGFuZ2UoYXR0cmlidXRlcykgJiZcbiAgICAgICFpc1Byb2ZpbGVDaGFuZ2UoYXR0cmlidXRlcykgJiZcbiAgICAgICFpc1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uKGF0dHJpYnV0ZXMpICYmXG4gICAgICAhaXNVbnN1cHBvcnRlZE1lc3NhZ2UoYXR0cmlidXRlcykgJiZcbiAgICAgICFpc1ZlcmlmaWVkQ2hhbmdlKGF0dHJpYnV0ZXMpXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIGh5ZHJhdGVTdG9yeUNvbnRleHQoaW5NZW1vcnlNZXNzYWdlPzogTWVzc2FnZU1vZGVsKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgc3RvcnlJZCA9IHRoaXMuZ2V0KCdzdG9yeUlkJyk7XG4gICAgaWYgKCFzdG9yeUlkKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZ2V0KCdzdG9yeVJlcGx5Q29udGV4dCcpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgbWVzc2FnZSA9IGluTWVtb3J5TWVzc2FnZSB8fCAoYXdhaXQgZ2V0TWVzc2FnZUJ5SWQoc3RvcnlJZCkpO1xuXG4gICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgICAgc29mdEFzc2VydChcbiAgICAgICAgY29udmVyc2F0aW9uICYmIGlzRGlyZWN0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSxcbiAgICAgICAgJ2h5ZHJhdGVTdG9yeUNvbnRleHQ6IE5vdCBhIHR5cGU9ZGlyZWN0IGNvbnZlcnNhdGlvbidcbiAgICAgICk7XG4gICAgICB0aGlzLnNldCh7XG4gICAgICAgIHN0b3J5UmVwbHlDb250ZXh0OiB7XG4gICAgICAgICAgYXR0YWNobWVudDogdW5kZWZpbmVkLFxuICAgICAgICAgIC8vIFRoaXMgaXMgb2sgdG8gZG8gYmVjYXVzZSBzdG9yeSByZXBsaWVzIG9ubHkgc2hvdyBpbiAxOjEgY29udmVyc2F0aW9uc1xuICAgICAgICAgIC8vIHNvIHRoZSBzdG9yeSB0aGF0IHdhcyBxdW90ZWQgc2hvdWxkIGJlIGZyb20gdGhlIHNhbWUgY29udmVyc2F0aW9uLlxuICAgICAgICAgIGF1dGhvclV1aWQ6IGNvbnZlcnNhdGlvbj8uZ2V0KCd1dWlkJyksXG4gICAgICAgICAgLy8gTm8gbWVzc2FnZUlkLCByZWZlcmVuY2VkIHN0b3J5IG5vdCBmb3VuZCFcbiAgICAgICAgICBtZXNzYWdlSWQ6ICcnLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSBtZXNzYWdlLmdldCgnYXR0YWNobWVudHMnKTtcblxuICAgIHRoaXMuc2V0KHtcbiAgICAgIHN0b3J5UmVwbHlDb250ZXh0OiB7XG4gICAgICAgIGF0dGFjaG1lbnQ6IGF0dGFjaG1lbnRzID8gYXR0YWNobWVudHNbMF0gOiB1bmRlZmluZWQsXG4gICAgICAgIGF1dGhvclV1aWQ6IG1lc3NhZ2UuZ2V0KCdzb3VyY2VVdWlkJyksXG4gICAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZS5nZXQoJ2lkJyksXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgZ2V0UHJvcHNGb3JNZXNzYWdlRGV0YWlsKG91ckNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiBQcm9wc0Zvck1lc3NhZ2VEZXRhaWwge1xuICAgIGNvbnN0IG5ld0lkZW50aXR5ID0gd2luZG93LmkxOG4oJ25ld0lkZW50aXR5Jyk7XG4gICAgY29uc3QgT1VUR09JTkdfS0VZX0VSUk9SID0gJ091dGdvaW5nSWRlbnRpdHlLZXlFcnJvcic7XG5cbiAgICBjb25zdCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkID1cbiAgICAgIHRoaXMuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge307XG5cbiAgICBjb25zdCB1bmlkZW50aWZpZWREZWxpdmVyaWVzID0gdGhpcy5nZXQoJ3VuaWRlbnRpZmllZERlbGl2ZXJpZXMnKSB8fCBbXTtcbiAgICBjb25zdCB1bmlkZW50aWZpZWREZWxpdmVyaWVzU2V0ID0gbmV3IFNldChcbiAgICAgIG1hcChcbiAgICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcmllcyxcbiAgICAgICAgaWRlbnRpZmllciA9PlxuICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldENvbnZlcnNhdGlvbklkKGlkZW50aWZpZXIpIGFzIHN0cmluZ1xuICAgICAgKVxuICAgICk7XG5cbiAgICBsZXQgY29udmVyc2F0aW9uSWRzOiBBcnJheTxzdHJpbmc+O1xuICAgIC8qIGVzbGludC1kaXNhYmxlIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb24gKi9cbiAgICBpZiAoaXNJbmNvbWluZyh0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBjb252ZXJzYXRpb25JZHMgPSBbZ2V0Q29udGFjdElkKHRoaXMuYXR0cmlidXRlcykhXTtcbiAgICB9IGVsc2UgaWYgKCFpc0VtcHR5KHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQpKSB7XG4gICAgICBpZiAoaXNNZXNzYWdlSnVzdEZvck1lKHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsIG91ckNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgICBjb252ZXJzYXRpb25JZHMgPSBbb3VyQ29udmVyc2F0aW9uSWRdO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29udmVyc2F0aW9uSWRzID0gT2JqZWN0LmtleXMoc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCkuZmlsdGVyKFxuICAgICAgICAgIGlkID0+IGlkICE9PSBvdXJDb252ZXJzYXRpb25JZFxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICAvLyBPbGRlciBtZXNzYWdlcyBkb24ndCBoYXZlIHRoZSByZWNpcGllbnRzIGluY2x1ZGVkIG9uIHRoZSBtZXNzYWdlLCBzbyB3ZSBmYWxsIGJhY2tcbiAgICAgIC8vICAgdG8gdGhlIGNvbnZlcnNhdGlvbidzIGN1cnJlbnQgcmVjaXBpZW50c1xuICAgICAgY29udmVyc2F0aW9uSWRzID0gKHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk/LmdldFJlY2lwaWVudHMoKSB8fCBbXSkubWFwKFxuICAgICAgICAoaWQ6IHN0cmluZykgPT4gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0Q29udmVyc2F0aW9uSWQoaWQpIVxuICAgICAgKTtcbiAgICB9XG4gICAgLyogZXNsaW50LWVuYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uICovXG5cbiAgICAvLyBUaGlzIHdpbGwgbWFrZSB0aGUgZXJyb3IgbWVzc2FnZSBmb3Igb3V0Z29pbmcga2V5IGVycm9ycyBhIGJpdCBuaWNlclxuICAgIGNvbnN0IGFsbEVycm9ycyA9ICh0aGlzLmdldCgnZXJyb3JzJykgfHwgW10pLm1hcChlcnJvciA9PiB7XG4gICAgICBpZiAoZXJyb3IubmFtZSA9PT0gT1VUR09JTkdfS0VZX0VSUk9SKSB7XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICBlcnJvci5tZXNzYWdlID0gbmV3SWRlbnRpdHk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBlcnJvcjtcbiAgICB9KTtcblxuICAgIC8vIElmIGFuIGVycm9yIGhhcyBhIHNwZWNpZmljIG51bWJlciBpdCdzIGFzc29jaWF0ZWQgd2l0aCwgd2UnbGwgc2hvdyBpdCBuZXh0IHRvXG4gICAgLy8gICB0aGF0IGNvbnRhY3QuIE90aGVyd2lzZSwgaXQgd2lsbCBiZSBhIHN0YW5kYWxvbmUgZW50cnkuXG4gICAgY29uc3QgZXJyb3JzID0gXy5yZWplY3QoYWxsRXJyb3JzLCBlcnJvciA9PlxuICAgICAgQm9vbGVhbihlcnJvci5pZGVudGlmaWVyIHx8IGVycm9yLm51bWJlcilcbiAgICApO1xuICAgIGNvbnN0IGVycm9yc0dyb3VwZWRCeUlkID0gXy5ncm91cEJ5KGFsbEVycm9ycywgZXJyb3IgPT4ge1xuICAgICAgY29uc3QgaWRlbnRpZmllciA9IGVycm9yLmlkZW50aWZpZXIgfHwgZXJyb3IubnVtYmVyO1xuICAgICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0Q29udmVyc2F0aW9uSWQoaWRlbnRpZmllcik7XG4gICAgfSk7XG5cbiAgICBjb25zdCBjb250YWN0czogUmVhZG9ubHlBcnJheTxTbWFydE1lc3NhZ2VEZXRhaWxDb250YWN0PiA9XG4gICAgICBjb252ZXJzYXRpb25JZHMubWFwKGlkID0+IHtcbiAgICAgICAgY29uc3QgZXJyb3JzRm9yQ29udGFjdCA9IGdldE93bihlcnJvcnNHcm91cGVkQnlJZCwgaWQpO1xuICAgICAgICBjb25zdCBpc091dGdvaW5nS2V5RXJyb3IgPSBCb29sZWFuKFxuICAgICAgICAgIGVycm9yc0ZvckNvbnRhY3Q/LnNvbWUoZXJyb3IgPT4gZXJyb3IubmFtZSA9PT0gT1VUR09JTkdfS0VZX0VSUk9SKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5ID1cbiAgICAgICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3VuaWRlbnRpZmllZERlbGl2ZXJ5SW5kaWNhdG9ycycsIGZhbHNlKSAmJlxuICAgICAgICAgIHRoaXMuaXNVbmlkZW50aWZpZWREZWxpdmVyeShpZCwgdW5pZGVudGlmaWVkRGVsaXZlcmllc1NldCk7XG5cbiAgICAgICAgY29uc3Qgc2VuZFN0YXRlID0gZ2V0T3duKHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsIGlkKTtcblxuICAgICAgICBsZXQgc3RhdHVzID0gc2VuZFN0YXRlPy5zdGF0dXM7XG5cbiAgICAgICAgLy8gSWYgYSBtZXNzYWdlIHdhcyBvbmx5IHNlbnQgdG8geW91cnNlbGYgKE5vdGUgdG8gU2VsZiBvciBhIGxvbmVseSBncm91cCksIGl0XG4gICAgICAgIC8vICAgaXMgc2hvd24gcmVhZC5cbiAgICAgICAgaWYgKGlkID09PSBvdXJDb252ZXJzYXRpb25JZCAmJiBzdGF0dXMgJiYgaXNTZW50KHN0YXR1cykpIHtcbiAgICAgICAgICBzdGF0dXMgPSBTZW5kU3RhdHVzLlJlYWQ7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBzdGF0dXNUaW1lc3RhbXAgPSBzZW5kU3RhdGU/LnVwZGF0ZWRBdDtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIC4uLmZpbmRBbmRGb3JtYXRDb250YWN0KGlkKSxcbiAgICAgICAgICBzdGF0dXMsXG4gICAgICAgICAgc3RhdHVzVGltZXN0YW1wOlxuICAgICAgICAgICAgc3RhdHVzVGltZXN0YW1wID09PSB0aGlzLmdldCgnc2VudF9hdCcpXG4gICAgICAgICAgICAgID8gdW5kZWZpbmVkXG4gICAgICAgICAgICAgIDogc3RhdHVzVGltZXN0YW1wLFxuICAgICAgICAgIGVycm9yczogZXJyb3JzRm9yQ29udGFjdCxcbiAgICAgICAgICBpc091dGdvaW5nS2V5RXJyb3IsXG4gICAgICAgICAgaXNVbmlkZW50aWZpZWREZWxpdmVyeSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbnRBdDogdGhpcy5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgIHJlY2VpdmVkQXQ6IHRoaXMuZ2V0UmVjZWl2ZWRBdCgpLFxuICAgICAgbWVzc2FnZTogZ2V0UHJvcHNGb3JNZXNzYWdlKHRoaXMuYXR0cmlidXRlcywge1xuICAgICAgICBjb252ZXJzYXRpb25TZWxlY3RvcjogZmluZEFuZEZvcm1hdENvbnRhY3QsXG4gICAgICAgIG91ckNvbnZlcnNhdGlvbklkLFxuICAgICAgICBvdXJOdW1iZXI6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKSxcbiAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgcmVnaW9uQ29kZTogd2luZG93LnN0b3JhZ2UuZ2V0KCdyZWdpb25Db2RlJywgJ1paJyksXG4gICAgICAgIGFjY291bnRTZWxlY3RvcjogKGlkZW50aWZpZXI/OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCk7XG4gICAgICAgICAgY29uc3QgYWNjb3VudFNlbGVjdG9yID0gZ2V0QWNjb3VudFNlbGVjdG9yKHN0YXRlKTtcbiAgICAgICAgICByZXR1cm4gYWNjb3VudFNlbGVjdG9yKGlkZW50aWZpZXIpO1xuICAgICAgICB9LFxuICAgICAgICBjb250YWN0TmFtZUNvbG9yU2VsZWN0b3I6IChcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgICAgICAgIGNvbnRhY3RJZDogc3RyaW5nIHwgdW5kZWZpbmVkXG4gICAgICAgICkgPT4ge1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgICAgICBjb25zdCBjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IgPSBnZXRDb250YWN0TmFtZUNvbG9yU2VsZWN0b3Ioc3RhdGUpO1xuICAgICAgICAgIHJldHVybiBjb250YWN0TmFtZUNvbG9yU2VsZWN0b3IoY29udmVyc2F0aW9uSWQsIGNvbnRhY3RJZCk7XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICAgIGVycm9ycyxcbiAgICAgIGNvbnRhY3RzLFxuICAgIH07XG4gIH1cblxuICAvLyBEZXBlbmRlbmNpZXMgb2YgcHJvcC1nZW5lcmF0aW9uIGZ1bmN0aW9uc1xuICBnZXRDb252ZXJzYXRpb24oKTogQ29udmVyc2F0aW9uTW9kZWwgfCB1bmRlZmluZWQge1xuICAgIHJldHVybiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQodGhpcy5nZXQoJ2NvbnZlcnNhdGlvbklkJykpO1xuICB9XG5cbiAgZ2V0Tm90aWZpY2F0aW9uRGF0YSgpOiB7IGVtb2ppPzogc3RyaW5nOyB0ZXh0OiBzdHJpbmcgfSB7XG4gICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSB0aGlzO1xuXG4gICAgaWYgKGlzRGVsaXZlcnlJc3N1ZShhdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW1vamk6ICdcdTI2QTBcdUZFMEYnLFxuICAgICAgICB0ZXh0OiB3aW5kb3cuaTE4bignRGVsaXZlcnlJc3N1ZS0tcHJldmlldycpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaXNDaGF0U2Vzc2lvblJlZnJlc2hlZChhdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW1vamk6ICdcdUQ4M0RcdUREMDEnLFxuICAgICAgICB0ZXh0OiB3aW5kb3cuaTE4bignQ2hhdFJlZnJlc2gtLW5vdGlmaWNhdGlvbicpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaXNVbnN1cHBvcnRlZE1lc3NhZ2UoYXR0cmlidXRlcykpIHtcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6IHdpbmRvdy5pMThuKCdtZXNzYWdlLS1nZXREZXNjcmlwdGlvbi0tdW5zdXBwb3J0ZWQtbWVzc2FnZScpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoaXNHcm91cFYxTWlncmF0aW9uKGF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OiB3aW5kb3cuaTE4bignR3JvdXBWMS0tTWlncmF0aW9uLS13YXMtdXBncmFkZWQnKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzUHJvZmlsZUNoYW5nZShhdHRyaWJ1dGVzKSkge1xuICAgICAgY29uc3QgY2hhbmdlID0gdGhpcy5nZXQoJ3Byb2ZpbGVDaGFuZ2UnKTtcbiAgICAgIGNvbnN0IGNoYW5nZWRJZCA9IHRoaXMuZ2V0KCdjaGFuZ2VkSWQnKTtcbiAgICAgIGNvbnN0IGNoYW5nZWRDb250YWN0ID0gZmluZEFuZEZvcm1hdENvbnRhY3QoY2hhbmdlZElkKTtcbiAgICAgIGlmICghY2hhbmdlKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignZ2V0Tm90aWZpY2F0aW9uRGF0YTogcHJvZmlsZUNoYW5nZSB3YXMgbWlzc2luZyEnKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogd2luZG93LlNpZ25hbC5VdGlsLmdldFN0cmluZ0ZvclByb2ZpbGVDaGFuZ2UoXG4gICAgICAgICAgY2hhbmdlLFxuICAgICAgICAgIGNoYW5nZWRDb250YWN0LFxuICAgICAgICAgIHdpbmRvdy5pMThuXG4gICAgICAgICksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc0dyb3VwVjJDaGFuZ2UoYXR0cmlidXRlcykpIHtcbiAgICAgIGNvbnN0IGNoYW5nZSA9IHRoaXMuZ2V0KCdncm91cFYyQ2hhbmdlJyk7XG4gICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgIGNoYW5nZSxcbiAgICAgICAgJ2dldE5vdGlmaWNhdGlvbkRhdGE6IGlzR3JvdXBWMkNoYW5nZSB0cnVlLCBidXQgbm8gZ3JvdXBWMkNoYW5nZSEnXG4gICAgICApO1xuXG4gICAgICBjb25zdCBjaGFuZ2VzID0gR3JvdXBDaGFuZ2UucmVuZGVyQ2hhbmdlPHN0cmluZz4oY2hhbmdlLCB7XG4gICAgICAgIGkxOG46IHdpbmRvdy5pMThuLFxuICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICByZW5kZXJDb250YWN0OiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4ge1xuICAgICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9XG4gICAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICAgIHJldHVybiBjb252ZXJzYXRpb25cbiAgICAgICAgICAgID8gY29udmVyc2F0aW9uLmdldFRpdGxlKClcbiAgICAgICAgICAgIDogd2luZG93LmkxOG4oJ3Vua25vd25Db250YWN0Jyk7XG4gICAgICAgIH0sXG4gICAgICAgIHJlbmRlclN0cmluZzogKFxuICAgICAgICAgIGtleTogc3RyaW5nLFxuICAgICAgICAgIF9pMThuOiB1bmtub3duLFxuICAgICAgICAgIGNvbXBvbmVudHM6IEFycmF5PHN0cmluZz4gfCBSZXBsYWNlbWVudFZhbHVlc1R5cGU8c3RyaW5nPiB8IHVuZGVmaW5lZFxuICAgICAgICApID0+IHdpbmRvdy5pMThuKGtleSwgY29tcG9uZW50cyksXG4gICAgICB9KTtcblxuICAgICAgcmV0dXJuIHsgdGV4dDogY2hhbmdlcy5tYXAoKHsgdGV4dCB9KSA9PiB0ZXh0KS5qb2luKCcgJykgfTtcbiAgICB9XG5cbiAgICBjb25zdCBhdHRhY2htZW50cyA9IHRoaXMuZ2V0KCdhdHRhY2htZW50cycpIHx8IFtdO1xuXG4gICAgaWYgKGlzVGFwVG9WaWV3KGF0dHJpYnV0ZXMpKSB7XG4gICAgICBpZiAodGhpcy5pc0VyYXNlZCgpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDogd2luZG93LmkxOG4oJ21lc3NhZ2UtLWdldERlc2NyaXB0aW9uLS1kaXNhcHBlYXJpbmctbWVkaWEnKSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKEF0dGFjaG1lbnQuaXNJbWFnZShhdHRhY2htZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2V0RGVzY3JpcHRpb24tLWRpc2FwcGVhcmluZy1waG90bycpLFxuICAgICAgICAgIGVtb2ppOiAnXHVEODNEXHVEQ0Y3JyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChBdHRhY2htZW50LmlzVmlkZW8oYXR0YWNobWVudHMpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDogd2luZG93LmkxOG4oJ21lc3NhZ2UtLWdldERlc2NyaXB0aW9uLS1kaXNhcHBlYXJpbmctdmlkZW8nKSxcbiAgICAgICAgICBlbW9qaTogJ1x1RDgzQ1x1REZBNScsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICAvLyBUaGVyZSBzaG91bGQgYmUgYW4gaW1hZ2Ugb3IgdmlkZW8gYXR0YWNobWVudCwgYnV0IHdlIGhhdmUgYSBmYWxsYmFjayBqdXN0IGluXG4gICAgICAvLyAgIGNhc2UuXG4gICAgICByZXR1cm4geyB0ZXh0OiB3aW5kb3cuaTE4bignbWVkaWFNZXNzYWdlJyksIGVtb2ppOiAnXHVEODNEXHVEQ0NFJyB9O1xuICAgIH1cblxuICAgIGlmIChpc0dyb3VwVXBkYXRlKGF0dHJpYnV0ZXMpKSB7XG4gICAgICBjb25zdCBncm91cFVwZGF0ZSA9IHRoaXMuZ2V0KCdncm91cF91cGRhdGUnKTtcbiAgICAgIGNvbnN0IGZyb21Db250YWN0ID0gZ2V0Q29udGFjdCh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBbXTtcbiAgICAgIGlmICghZ3JvdXBVcGRhdGUpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXROb3RpZmljYXRpb25EYXRhOiBNaXNzaW5nIGdyb3VwX3VwZGF0ZScpO1xuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXBVcGRhdGUubGVmdCA9PT0gJ1lvdScpIHtcbiAgICAgICAgcmV0dXJuIHsgdGV4dDogd2luZG93LmkxOG4oJ3lvdUxlZnRUaGVHcm91cCcpIH07XG4gICAgICB9XG4gICAgICBpZiAoZ3JvdXBVcGRhdGUubGVmdCkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6IHdpbmRvdy5pMThuKCdsZWZ0VGhlR3JvdXAnLCBbXG4gICAgICAgICAgICB0aGlzLmdldE5hbWVGb3JOdW1iZXIoZ3JvdXBVcGRhdGUubGVmdCksXG4gICAgICAgICAgXSksXG4gICAgICAgIH07XG4gICAgICB9XG5cbiAgICAgIGlmICghZnJvbUNvbnRhY3QpIHtcbiAgICAgICAgcmV0dXJuIHsgdGV4dDogJycgfTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTWUoZnJvbUNvbnRhY3QuYXR0cmlidXRlcykpIHtcbiAgICAgICAgbWVzc2FnZXMucHVzaCh3aW5kb3cuaTE4bigneW91VXBkYXRlZFRoZUdyb3VwJykpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbWVzc2FnZXMucHVzaCh3aW5kb3cuaTE4bigndXBkYXRlZFRoZUdyb3VwJywgW2Zyb21Db250YWN0LmdldFRpdGxlKCldKSk7XG4gICAgICB9XG5cbiAgICAgIGlmIChncm91cFVwZGF0ZS5qb2luZWQgJiYgZ3JvdXBVcGRhdGUuam9pbmVkLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBqb2luZWRDb250YWN0cyA9IF8ubWFwKGdyb3VwVXBkYXRlLmpvaW5lZCwgaXRlbSA9PlxuICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKGl0ZW0sICdwcml2YXRlJylcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3Qgam9pbmVkV2l0aG91dE1lID0gam9pbmVkQ29udGFjdHMuZmlsdGVyKFxuICAgICAgICAgIGNvbnRhY3QgPT4gIWlzTWUoY29udGFjdC5hdHRyaWJ1dGVzKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChqb2luZWRDb250YWN0cy5sZW5ndGggPiAxKSB7XG4gICAgICAgICAgbWVzc2FnZXMucHVzaChcbiAgICAgICAgICAgIHdpbmRvdy5pMThuKCdtdWx0aXBsZUpvaW5lZFRoZUdyb3VwJywgW1xuICAgICAgICAgICAgICBfLm1hcChqb2luZWRXaXRob3V0TWUsIGNvbnRhY3QgPT4gY29udGFjdC5nZXRUaXRsZSgpKS5qb2luKCcsICcpLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgaWYgKGpvaW5lZFdpdGhvdXRNZS5sZW5ndGggPCBqb2luZWRDb250YWN0cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2god2luZG93LmkxOG4oJ3lvdUpvaW5lZFRoZUdyb3VwJykpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjb25zdCBqb2luZWRDb250YWN0ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoXG4gICAgICAgICAgICBncm91cFVwZGF0ZS5qb2luZWRbMF0sXG4gICAgICAgICAgICAncHJpdmF0ZSdcbiAgICAgICAgICApO1xuICAgICAgICAgIGlmIChpc01lKGpvaW5lZENvbnRhY3QuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIG1lc3NhZ2VzLnB1c2god2luZG93LmkxOG4oJ3lvdUpvaW5lZFRoZUdyb3VwJykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBtZXNzYWdlcy5wdXNoKFxuICAgICAgICAgICAgICB3aW5kb3cuaTE4bignam9pbmVkVGhlR3JvdXAnLCBbam9pbmVkQ29udGFjdHNbMF0uZ2V0VGl0bGUoKV0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZ3JvdXBVcGRhdGUubmFtZSkge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKHdpbmRvdy5pMThuKCd0aXRsZUlzTm93JywgW2dyb3VwVXBkYXRlLm5hbWVdKSk7XG4gICAgICB9XG4gICAgICBpZiAoZ3JvdXBVcGRhdGUuYXZhdGFyVXBkYXRlZCkge1xuICAgICAgICBtZXNzYWdlcy5wdXNoKHdpbmRvdy5pMThuKCd1cGRhdGVkR3JvdXBBdmF0YXInKSk7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7IHRleHQ6IG1lc3NhZ2VzLmpvaW4oJyAnKSB9O1xuICAgIH1cbiAgICBpZiAoaXNFbmRTZXNzaW9uKGF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiB3aW5kb3cuaTE4bignc2Vzc2lvbkVuZGVkJykgfTtcbiAgICB9XG4gICAgaWYgKGlzSW5jb21pbmcoYXR0cmlidXRlcykgJiYgaGFzRXJyb3JzKGF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4geyB0ZXh0OiB3aW5kb3cuaTE4bignaW5jb21pbmdFcnJvcicpIH07XG4gICAgfVxuXG4gICAgY29uc3QgYm9keSA9ICh0aGlzLmdldCgnYm9keScpIHx8ICcnKS50cmltKCk7XG5cbiAgICBpZiAoYXR0YWNobWVudHMubGVuZ3RoKSB7XG4gICAgICAvLyBUaGlzIHNob3VsZCBuZXZlciBoYXBwZW4gYnV0IHdlIHdhbnQgdG8gYmUgZXh0cmEtY2FyZWZ1bC5cbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQgPSBhdHRhY2htZW50c1swXSB8fCB7fTtcbiAgICAgIGNvbnN0IHsgY29udGVudFR5cGUgfSA9IGF0dGFjaG1lbnQ7XG5cbiAgICAgIGlmIChjb250ZW50VHlwZSA9PT0gTUlNRS5JTUFHRV9HSUYgfHwgQXR0YWNobWVudC5pc0dJRihhdHRhY2htZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiBib2R5IHx8IHdpbmRvdy5pMThuKCdtZXNzYWdlLS1nZXROb3RpZmljYXRpb25UZXh0LS1naWYnKSxcbiAgICAgICAgICBlbW9qaTogJ1x1RDgzQ1x1REZBMScsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoQXR0YWNobWVudC5pc0ltYWdlKGF0dGFjaG1lbnRzKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6IGJvZHkgfHwgd2luZG93LmkxOG4oJ21lc3NhZ2UtLWdldE5vdGlmaWNhdGlvblRleHQtLXBob3RvJyksXG4gICAgICAgICAgZW1vamk6ICdcdUQ4M0RcdURDRjcnLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgaWYgKEF0dGFjaG1lbnQuaXNWaWRlbyhhdHRhY2htZW50cykpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICB0ZXh0OiBib2R5IHx8IHdpbmRvdy5pMThuKCdtZXNzYWdlLS1nZXROb3RpZmljYXRpb25UZXh0LS12aWRlbycpLFxuICAgICAgICAgIGVtb2ppOiAnXHVEODNDXHVERkE1JyxcbiAgICAgICAgfTtcbiAgICAgIH1cbiAgICAgIGlmIChBdHRhY2htZW50LmlzVm9pY2VNZXNzYWdlKGF0dGFjaG1lbnQpKSB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdGV4dDpcbiAgICAgICAgICAgIGJvZHkgfHwgd2luZG93LmkxOG4oJ21lc3NhZ2UtLWdldE5vdGlmaWNhdGlvblRleHQtLXZvaWNlLW1lc3NhZ2UnKSxcbiAgICAgICAgICBlbW9qaTogJ1x1RDgzQ1x1REZBNCcsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoQXR0YWNobWVudC5pc0F1ZGlvKGF0dGFjaG1lbnRzKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6XG4gICAgICAgICAgICBib2R5IHx8IHdpbmRvdy5pMThuKCdtZXNzYWdlLS1nZXROb3RpZmljYXRpb25UZXh0LS1hdWRpby1tZXNzYWdlJyksXG4gICAgICAgICAgZW1vamk6ICdcdUQ4M0RcdUREMDgnLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogYm9keSB8fCB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tZmlsZScpLFxuICAgICAgICBlbW9qaTogJ1x1RDgzRFx1RENDRScsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGNvbnN0IHN0aWNrZXJEYXRhID0gdGhpcy5nZXQoJ3N0aWNrZXInKTtcbiAgICBpZiAoc3RpY2tlckRhdGEpIHtcbiAgICAgIGNvbnN0IHN0aWNrZXIgPSBTdGlja2Vycy5nZXRTdGlja2VyKFxuICAgICAgICBzdGlja2VyRGF0YS5wYWNrSWQsXG4gICAgICAgIHN0aWNrZXJEYXRhLnN0aWNrZXJJZFxuICAgICAgKTtcbiAgICAgIGNvbnN0IHsgZW1vamkgfSA9IHN0aWNrZXIgfHwge307XG4gICAgICBpZiAoIWVtb2ppKSB7XG4gICAgICAgIGxvZy53YXJuKCdVbmFibGUgdG8gZ2V0IGVtb2ppIGZvciBzdGlja2VyJyk7XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OiB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tc3RpY2tlcnMnKSxcbiAgICAgICAgZW1vamk6IGRyb3BOdWxsKGVtb2ppKSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgaWYgKGlzQ2FsbEhpc3RvcnkoYXR0cmlidXRlcykpIHtcbiAgICAgIGNvbnN0IHN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICAgIGNvbnN0IGNhbGxpbmdOb3RpZmljYXRpb24gPSBnZXRQcm9wc0ZvckNhbGxIaXN0b3J5KGF0dHJpYnV0ZXMsIHtcbiAgICAgICAgY29udmVyc2F0aW9uU2VsZWN0b3I6IGZpbmRBbmRGb3JtYXRDb250YWN0LFxuICAgICAgICBjYWxsU2VsZWN0b3I6IGdldENhbGxTZWxlY3RvcihzdGF0ZSksXG4gICAgICAgIGFjdGl2ZUNhbGw6IGdldEFjdGl2ZUNhbGwoc3RhdGUpLFxuICAgICAgfSk7XG4gICAgICBpZiAoY2FsbGluZ05vdGlmaWNhdGlvbikge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIHRleHQ6IGdldENhbGxpbmdOb3RpZmljYXRpb25UZXh0KGNhbGxpbmdOb3RpZmljYXRpb24sIHdpbmRvdy5pMThuKSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgbG9nLmVycm9yKFwiVGhpcyBjYWxsIGhpc3RvcnkgbWVzc2FnZSBkb2Vzbid0IGhhdmUgdmFsaWQgY2FsbCBoaXN0b3J5XCIpO1xuICAgIH1cbiAgICBpZiAoaXNFeHBpcmF0aW9uVGltZXJVcGRhdGUoYXR0cmlidXRlcykpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICBjb25zdCB7IGV4cGlyZVRpbWVyIH0gPSB0aGlzLmdldCgnZXhwaXJhdGlvblRpbWVyVXBkYXRlJykhO1xuICAgICAgaWYgKCFleHBpcmVUaW1lcikge1xuICAgICAgICByZXR1cm4geyB0ZXh0OiB3aW5kb3cuaTE4bignZGlzYXBwZWFyaW5nTWVzc2FnZXNEaXNhYmxlZCcpIH07XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIHRleHQ6IHdpbmRvdy5pMThuKCd0aW1lclNldFRvJywgW1xuICAgICAgICAgIGV4cGlyYXRpb25UaW1lci5mb3JtYXQod2luZG93LmkxOG4sIGV4cGlyZVRpbWVyKSxcbiAgICAgICAgXSksXG4gICAgICB9O1xuICAgIH1cblxuICAgIGlmIChpc0tleUNoYW5nZShhdHRyaWJ1dGVzKSkge1xuICAgICAgY29uc3QgaWRlbnRpZmllciA9IHRoaXMuZ2V0KCdrZXlfY2hhbmdlZCcpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGV4dDogd2luZG93LmkxOG4oJ3NhZmV0eU51bWJlckNoYW5nZWRHcm91cCcsIFtcbiAgICAgICAgICBjb252ZXJzYXRpb24gPyBjb252ZXJzYXRpb24uZ2V0VGl0bGUoKSA6ICcnLFxuICAgICAgICBdKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGNvbnN0IGNvbnRhY3RzID0gdGhpcy5nZXQoJ2NvbnRhY3QnKTtcbiAgICBpZiAoY29udGFjdHMgJiYgY29udGFjdHMubGVuZ3RoKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0ZXh0OlxuICAgICAgICAgIEVtYmVkZGVkQ29udGFjdC5nZXROYW1lKGNvbnRhY3RzWzBdKSB8fCB3aW5kb3cuaTE4bigndW5rbm93bkNvbnRhY3QnKSxcbiAgICAgICAgZW1vamk6ICdcdUQ4M0RcdURDNjQnLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBjb25zdCBnaWZ0QmFkZ2UgPSB0aGlzLmdldCgnZ2lmdEJhZGdlJyk7XG4gICAgaWYgKGdpZnRCYWRnZSkge1xuICAgICAgY29uc3QgZW1vamkgPSAnXHVEODNDXHVERjgxJztcblxuICAgICAgaWYgKGlzT3V0Z29pbmcodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIGVtb2ppLFxuICAgICAgICAgIHRleHQ6IHdpbmRvdy5pMThuKCdtZXNzYWdlLS1naWZ0QmFkZ2UtLXByZXZpZXctLXNlbnQnKSxcbiAgICAgICAgfTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgZW1vamksXG4gICAgICAgIHRleHQ6XG4gICAgICAgICAgZ2lmdEJhZGdlLnN0YXRlID09PSBHaWZ0QmFkZ2VTdGF0ZXMuVW5vcGVuZWRcbiAgICAgICAgICAgID8gd2luZG93LmkxOG4oJ21lc3NhZ2UtLWdpZnRCYWRnZS0tcHJldmlldy0tdW5vcGVuZWQnKVxuICAgICAgICAgICAgOiB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2lmdEJhZGdlLS1wcmV2aWV3LS1yZWRlZW1lZCcpLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICBpZiAoYm9keSkge1xuICAgICAgcmV0dXJuIHsgdGV4dDogYm9keSB9O1xuICAgIH1cblxuICAgIHJldHVybiB7IHRleHQ6ICcnIH07XG4gIH1cblxuICBnZXRSYXdUZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgYm9keSA9ICh0aGlzLmdldCgnYm9keScpIHx8ICcnKS50cmltKCk7XG4gICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgYm9keVJhbmdlcyA9IHByb2Nlc3NCb2R5UmFuZ2VzKGF0dHJpYnV0ZXMsIHtcbiAgICAgIGNvbnZlcnNhdGlvblNlbGVjdG9yOiBmaW5kQW5kRm9ybWF0Q29udGFjdCxcbiAgICB9KTtcbiAgICBpZiAoYm9keVJhbmdlcykge1xuICAgICAgcmV0dXJuIGdldFRleHRXaXRoTWVudGlvbnMoYm9keVJhbmdlcywgYm9keSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGJvZHk7XG4gIH1cblxuICBnZXROb3RpZmljYXRpb25UZXh0KCk6IHN0cmluZyB7XG4gICAgY29uc3QgeyB0ZXh0LCBlbW9qaSB9ID0gdGhpcy5nZXROb3RpZmljYXRpb25EYXRhKCk7XG4gICAgY29uc3QgeyBhdHRyaWJ1dGVzIH0gPSB0aGlzO1xuXG4gICAgaWYgKGF0dHJpYnV0ZXMuc3RvcnlSZWFjdGlvbkVtb2ppKSB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPSB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgICAgY29uc3QgZmlyc3ROYW1lID0gY29udmVyc2F0aW9uPy5hdHRyaWJ1dGVzLnByb2ZpbGVOYW1lO1xuXG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbiB8fCAhZmlyc3ROYW1lKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaTE4bignUXVvdGVfX3N0b3J5LXJlYWN0aW9uLS1zaW5nbGUnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzTWUoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIHJldHVybiB3aW5kb3cuaTE4bignUXVvdGVfX3N0b3J5LXJlYWN0aW9uLS15b3VycycpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gd2luZG93LmkxOG4oJ1F1b3RlX19zdG9yeS1yZWFjdGlvbicsIFtmaXJzdE5hbWVdKTtcbiAgICB9XG5cbiAgICBsZXQgbW9kaWZpZWRUZXh0ID0gdGV4dDtcblxuICAgIGNvbnN0IGJvZHlSYW5nZXMgPSBwcm9jZXNzQm9keVJhbmdlcyhhdHRyaWJ1dGVzLCB7XG4gICAgICBjb252ZXJzYXRpb25TZWxlY3RvcjogZmluZEFuZEZvcm1hdENvbnRhY3QsXG4gICAgfSk7XG5cbiAgICBpZiAoYm9keVJhbmdlcyAmJiBib2R5UmFuZ2VzLmxlbmd0aCkge1xuICAgICAgbW9kaWZpZWRUZXh0ID0gZ2V0VGV4dFdpdGhNZW50aW9ucyhib2R5UmFuZ2VzLCBtb2RpZmllZFRleHQpO1xuICAgIH1cblxuICAgIC8vIExpbnV4IGVtb2ppIHN1cHBvcnQgaXMgbWl4ZWQsIHNvIHdlIGRpc2FibGUgaXQuIChOb3RlIHRoYXQgdGhpcyBkb2Vzbid0IHRvdWNoXG4gICAgLy8gICB0aGUgYHRleHRgLCB3aGljaCBjYW4gY29udGFpbiBlbW9qaS4pXG4gICAgY29uc3Qgc2hvdWxkSW5jbHVkZUVtb2ppID0gQm9vbGVhbihlbW9qaSkgJiYgIXdpbmRvdy5TaWduYWwuT1MuaXNMaW51eCgpO1xuICAgIGlmIChzaG91bGRJbmNsdWRlRW1vamkpIHtcbiAgICAgIHJldHVybiB3aW5kb3cuaTE4bignbWVzc2FnZS0tZ2V0Tm90aWZpY2F0aW9uVGV4dC0tdGV4dC13aXRoLWVtb2ppJywge1xuICAgICAgICB0ZXh0OiBtb2RpZmllZFRleHQsXG4gICAgICAgIGVtb2ppLFxuICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiBtb2RpZmllZFRleHQ7XG4gIH1cblxuICAvLyBHZW5lcmFsXG4gIGlkRm9yTG9nZ2luZygpOiBzdHJpbmcge1xuICAgIHJldHVybiBnZXRNZXNzYWdlSWRGb3JMb2dnaW5nKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBvdmVycmlkZSBkZWZhdWx0cygpOiBQYXJ0aWFsPE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4ge1xuICAgIHJldHVybiB7XG4gICAgICB0aW1lc3RhbXA6IG5ldyBEYXRlKCkuZ2V0VGltZSgpLFxuICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgIH07XG4gIH1cblxuICBvdmVycmlkZSB2YWxpZGF0ZShhdHRyaWJ1dGVzOiBSZWNvcmQ8c3RyaW5nLCB1bmtub3duPik6IHZvaWQge1xuICAgIGNvbnN0IHJlcXVpcmVkID0gWydjb252ZXJzYXRpb25JZCcsICdyZWNlaXZlZF9hdCcsICdzZW50X2F0J107XG4gICAgY29uc3QgbWlzc2luZyA9IF8uZmlsdGVyKHJlcXVpcmVkLCBhdHRyID0+ICFhdHRyaWJ1dGVzW2F0dHJdKTtcbiAgICBpZiAobWlzc2luZy5sZW5ndGgpIHtcbiAgICAgIGxvZy53YXJuKGBNZXNzYWdlIG1pc3NpbmcgYXR0cmlidXRlczogJHttaXNzaW5nfWApO1xuICAgIH1cbiAgfVxuXG4gIG1lcmdlKG1vZGVsOiBNZXNzYWdlTW9kZWwpOiB2b2lkIHtcbiAgICBjb25zdCBhdHRyaWJ1dGVzID0gbW9kZWwuYXR0cmlidXRlcyB8fCBtb2RlbDtcbiAgICB0aGlzLnNldChhdHRyaWJ1dGVzKTtcbiAgfVxuXG4gIGdldE5hbWVGb3JOdW1iZXIobnVtYmVyOiBzdHJpbmcpOiBzdHJpbmcge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChudW1iZXIpO1xuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm4gbnVtYmVyO1xuICAgIH1cbiAgICByZXR1cm4gY29udmVyc2F0aW9uLmdldFRpdGxlKCk7XG4gIH1cblxuICBhc3luYyBjbGVhbnVwKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGNsZWFudXBNZXNzYWdlKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBhc3luYyBkZWxldGVEYXRhKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGRlbGV0ZU1lc3NhZ2VEYXRhKHRoaXMuYXR0cmlidXRlcyk7XG4gIH1cblxuICBpc1ZhbGlkVGFwVG9WaWV3KCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGJvZHkgPSB0aGlzLmdldCgnYm9keScpO1xuICAgIGlmIChib2R5KSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgY29uc3QgYXR0YWNobWVudHMgPSB0aGlzLmdldCgnYXR0YWNobWVudHMnKTtcbiAgICBpZiAoIWF0dGFjaG1lbnRzIHx8IGF0dGFjaG1lbnRzLmxlbmd0aCAhPT0gMSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIGNvbnN0IGZpcnN0QXR0YWNobWVudCA9IGF0dGFjaG1lbnRzWzBdO1xuICAgIGlmIChcbiAgICAgICF3aW5kb3cuU2lnbmFsLlV0aWwuR29vZ2xlQ2hyb21lLmlzSW1hZ2VUeXBlU3VwcG9ydGVkKFxuICAgICAgICBmaXJzdEF0dGFjaG1lbnQuY29udGVudFR5cGVcbiAgICAgICkgJiZcbiAgICAgICF3aW5kb3cuU2lnbmFsLlV0aWwuR29vZ2xlQ2hyb21lLmlzVmlkZW9UeXBlU3VwcG9ydGVkKFxuICAgICAgICBmaXJzdEF0dGFjaG1lbnQuY29udGVudFR5cGVcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCBxdW90ZSA9IHRoaXMuZ2V0KCdxdW90ZScpO1xuICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLmdldCgnc3RpY2tlcicpO1xuICAgIGNvbnN0IGNvbnRhY3QgPSB0aGlzLmdldCgnY29udGFjdCcpO1xuICAgIGNvbnN0IHByZXZpZXcgPSB0aGlzLmdldCgncHJldmlldycpO1xuXG4gICAgaWYgKFxuICAgICAgcXVvdGUgfHxcbiAgICAgIHN0aWNrZXIgfHxcbiAgICAgIChjb250YWN0ICYmIGNvbnRhY3QubGVuZ3RoID4gMCkgfHxcbiAgICAgIChwcmV2aWV3ICYmIHByZXZpZXcubGVuZ3RoID4gMClcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGFzeW5jIG1hcmtWaWV3T25jZU1lc3NhZ2VWaWV3ZWQob3B0aW9ucz86IHtcbiAgICBmcm9tU3luYz86IGJvb2xlYW47XG4gIH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGZyb21TeW5jIH0gPSBvcHRpb25zIHx8IHt9O1xuXG4gICAgaWYgKCF0aGlzLmlzVmFsaWRUYXBUb1ZpZXcoKSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBtYXJrVmlld09uY2VNZXNzYWdlVmlld2VkOiBNZXNzYWdlICR7dGhpcy5pZEZvckxvZ2dpbmcoKX0gaXMgbm90IGEgdmFsaWQgdGFwIHRvIHZpZXcgbWVzc2FnZSFgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAodGhpcy5pc0VyYXNlZCgpKSB7XG4gICAgICBsb2cud2FybihcbiAgICAgICAgYG1hcmtWaWV3T25jZU1lc3NhZ2VWaWV3ZWQ6IE1lc3NhZ2UgJHt0aGlzLmlkRm9yTG9nZ2luZygpfSBpcyBhbHJlYWR5IGVyYXNlZCFgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdldCgncmVhZFN0YXR1cycpICE9PSBSZWFkU3RhdHVzLlZpZXdlZCkge1xuICAgICAgdGhpcy5zZXQobWFya1ZpZXdlZCh0aGlzLmF0dHJpYnV0ZXMpKTtcbiAgICB9XG5cbiAgICBhd2FpdCB0aGlzLmVyYXNlQ29udGVudHMoKTtcblxuICAgIGlmICghZnJvbVN5bmMpIHtcbiAgICAgIGNvbnN0IHNlbmRlckUxNjQgPSBnZXRTb3VyY2UodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICAgIGNvbnN0IHNlbmRlclV1aWQgPSBnZXRTb3VyY2VVdWlkKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSB0aGlzLmdldCgnc2VudF9hdCcpO1xuXG4gICAgICBpZiAoc2VuZGVyVXVpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignbWFya1ZpZXdPbmNlTWVzc2FnZVZpZXdlZDogc2VuZGVyVXVpZCBpcyB1bmRlZmluZWQnKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmFyZVdlUHJpbWFyeURldmljZSgpKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgICdtYXJrVmlld09uY2VNZXNzYWdlVmlld2VkOiBXZSBhcmUgcHJpbWFyeSBkZXZpY2U7IG5vdCBzZW5kaW5nIHZpZXcgb25jZSBvcGVuIHN5bmMnXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgdmlld09uY2VPcGVuSm9iUXVldWUuYWRkKHtcbiAgICAgICAgICB2aWV3T25jZU9wZW5zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHNlbmRlckUxNjQsXG4gICAgICAgICAgICAgIHNlbmRlclV1aWQsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgJ21hcmtWaWV3T25jZU1lc3NhZ2VWaWV3ZWQ6IEZhaWxlZCB0byBxdWV1ZSB2aWV3IG9uY2Ugb3BlbiBzeW5jJyxcbiAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgbG9nSWQgPSB0aGlzLmlkRm9yTG9nZ2luZygpO1xuXG4gICAgY29uc3Qgc3RvcnlJZCA9IHRoaXMuZ2V0KCdzdG9yeUlkJyk7XG4gICAgaWYgKHN0b3J5SWQpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UvJHtsb2dJZH06IG1pc3Npbmcgc3RvcnkgcmVmZXJlbmNlYFxuICAgICAgKTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5nZXRCeUlkKHN0b3J5SWQpO1xuICAgICAgaWYgKCFtZXNzYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKHRoaXMuZ2V0KCdzdG9yeVJlcGx5Q29udGV4dCcpKSB7XG4gICAgICAgIHRoaXMudW5zZXQoJ3N0b3J5UmVwbHlDb250ZXh0Jyk7XG4gICAgICB9XG4gICAgICBhd2FpdCB0aGlzLmh5ZHJhdGVTdG9yeUNvbnRleHQobWVzc2FnZSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcXVvdGUgPSB0aGlzLmdldCgncXVvdGUnKTtcbiAgICBpZiAoIXF1b3RlKSB7XG4gICAgICBsb2cud2FybihgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UvJHtsb2dJZH06IE1pc3NpbmcgcXVvdGUhYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBhdXRob3JVdWlkLCBhdXRob3IsIGlkOiBzZW50QXQsIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQgfSA9IHF1b3RlO1xuICAgIGNvbnN0IGNvbnRhY3QgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoYXV0aG9yVXVpZCB8fCBhdXRob3IpO1xuXG4gICAgLy8gSXMgdGhlIHF1b3RlIHJlYWxseSB3aXRob3V0IGEgcmVmZXJlbmNlPyBDaGVjayB3aXRoIG91ciBpbiBtZW1vcnkgc3RvcmVcbiAgICAvLyBmaXJzdCB0byBtYWtlIHN1cmUgaXQncyBub3QgdGhlcmUuXG4gICAgaWYgKHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQgJiYgY29udGFjdCkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBkb3VibGVDaGVja01pc3NpbmdRdW90ZVJlZmVyZW5jZS8ke2xvZ0lkfTogVmVyaWZ5aW5nIHJlZmVyZW5jZSB0byAke3NlbnRBdH1gXG4gICAgICApO1xuICAgICAgY29uc3QgaW5NZW1vcnlNZXNzYWdlcyA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5maWx0ZXJCeVNlbnRBdChcbiAgICAgICAgTnVtYmVyKHNlbnRBdClcbiAgICAgICk7XG4gICAgICBjb25zdCBtYXRjaGluZ01lc3NhZ2UgPSBmaW5kKGluTWVtb3J5TWVzc2FnZXMsIG1lc3NhZ2UgPT5cbiAgICAgICAgaXNRdW90ZUFNYXRjaChtZXNzYWdlLmF0dHJpYnV0ZXMsIHRoaXMuZ2V0KCdjb252ZXJzYXRpb25JZCcpLCBxdW90ZSlcbiAgICAgICk7XG4gICAgICBpZiAoIW1hdGNoaW5nTWVzc2FnZSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UvJHtsb2dJZH06IE5vIG1hdGNoIGZvciAke3NlbnRBdH0uYFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXQoe1xuICAgICAgICBxdW90ZToge1xuICAgICAgICAgIC4uLnF1b3RlLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UvJHtsb2dJZH06IEZvdW5kIG1hdGNoIGZvciAke3NlbnRBdH0sIHVwZGF0aW5nLmBcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IHRoaXMuY29weVF1b3RlQ29udGVudEZyb21PcmlnaW5hbChtYXRjaGluZ01lc3NhZ2UsIHF1b3RlKTtcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICAuLi5xdW90ZSxcbiAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgd2luZG93LlNpZ25hbC5VdGlsLnF1ZXVlVXBkYXRlTWVzc2FnZSh0aGlzLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfVxuXG4gIGlzRXJhc2VkKCk6IGJvb2xlYW4ge1xuICAgIHJldHVybiBCb29sZWFuKHRoaXMuZ2V0KCdpc0VyYXNlZCcpKTtcbiAgfVxuXG4gIGFzeW5jIGVyYXNlQ29udGVudHMoXG4gICAgYWRkaXRpb25hbFByb3BlcnRpZXMgPSB7fSxcbiAgICBzaG91bGRQZXJzaXN0ID0gdHJ1ZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbyhgRXJhc2luZyBkYXRhIGZvciBtZXNzYWdlICR7dGhpcy5pZEZvckxvZ2dpbmcoKX1gKTtcblxuICAgIC8vIE5vdGU6IFRoZXJlIGFyZSBjYXNlcyB3aGVyZSB3ZSB3YW50IHRvIHJlLWVyYXNlIGEgZ2l2ZW4gbWVzc2FnZS4gRm9yIGV4YW1wbGUsIHdoZW5cbiAgICAvLyAgIGEgdmlld2VkIChvciBvdXRnb2luZykgVmlldy1PbmNlIG1lc3NhZ2UgaXMgZGVsZXRlZCBmb3IgZXZlcnlvbmUuXG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgdGhpcy5kZWxldGVEYXRhKCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYEVycm9yIGVyYXNpbmcgZGF0YSBmb3IgbWVzc2FnZSAke3RoaXMuaWRGb3JMb2dnaW5nKCl9OmAsXG4gICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgKTtcbiAgICB9XG5cbiAgICB0aGlzLnNldCh7XG4gICAgICBpc0VyYXNlZDogdHJ1ZSxcbiAgICAgIGJvZHk6ICcnLFxuICAgICAgYm9keVJhbmdlczogdW5kZWZpbmVkLFxuICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgcXVvdGU6IHVuZGVmaW5lZCxcbiAgICAgIGNvbnRhY3Q6IFtdLFxuICAgICAgc3RpY2tlcjogdW5kZWZpbmVkLFxuICAgICAgcHJldmlldzogW10sXG4gICAgICAuLi5hZGRpdGlvbmFsUHJvcGVydGllcyxcbiAgICB9KTtcbiAgICB0aGlzLmdldENvbnZlcnNhdGlvbigpPy5kZWJvdW5jZWRVcGRhdGVMYXN0TWVzc2FnZT8uKCk7XG5cbiAgICBpZiAoc2hvdWxkUGVyc2lzdCkge1xuICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKHRoaXMuYXR0cmlidXRlcywge1xuICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgfSk7XG4gICAgfVxuXG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkKHRoaXMuaWQpO1xuICB9XG5cbiAgb3ZlcnJpZGUgaXNFbXB0eSgpOiBib29sZWFuIHtcbiAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXM7XG5cbiAgICAvLyBDb3JlIG1lc3NhZ2UgdHlwZXMgLSB3ZSBjaGVjayBmb3IgYWxsIGZvdXIgYmVjYXVzZSB0aGV5IGNhbiBlYWNoIHN0YW5kIGFsb25lXG4gICAgY29uc3QgaGFzQm9keSA9IEJvb2xlYW4odGhpcy5nZXQoJ2JvZHknKSk7XG4gICAgY29uc3QgaGFzQXR0YWNobWVudCA9ICh0aGlzLmdldCgnYXR0YWNobWVudHMnKSB8fCBbXSkubGVuZ3RoID4gMDtcbiAgICBjb25zdCBoYXNFbWJlZGRlZENvbnRhY3QgPSAodGhpcy5nZXQoJ2NvbnRhY3QnKSB8fCBbXSkubGVuZ3RoID4gMDtcbiAgICBjb25zdCBpc1N0aWNrZXIgPSBCb29sZWFuKHRoaXMuZ2V0KCdzdGlja2VyJykpO1xuXG4gICAgLy8gUmVuZGVyZWQgc3luYyBtZXNzYWdlc1xuICAgIGNvbnN0IGlzQ2FsbEhpc3RvcnlWYWx1ZSA9IGlzQ2FsbEhpc3RvcnkoYXR0cmlidXRlcyk7XG4gICAgY29uc3QgaXNDaGF0U2Vzc2lvblJlZnJlc2hlZFZhbHVlID0gaXNDaGF0U2Vzc2lvblJlZnJlc2hlZChhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc0RlbGl2ZXJ5SXNzdWVWYWx1ZSA9IGlzRGVsaXZlcnlJc3N1ZShhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc0dpZnRCYWRnZVZhbHVlID0gaXNHaWZ0QmFkZ2UoYXR0cmlidXRlcyk7XG4gICAgY29uc3QgaXNHcm91cFVwZGF0ZVZhbHVlID0gaXNHcm91cFVwZGF0ZShhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc0dyb3VwVjJDaGFuZ2VWYWx1ZSA9IGlzR3JvdXBWMkNoYW5nZShhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc0VuZFNlc3Npb25WYWx1ZSA9IGlzRW5kU2Vzc2lvbihhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc0V4cGlyYXRpb25UaW1lclVwZGF0ZVZhbHVlID0gaXNFeHBpcmF0aW9uVGltZXJVcGRhdGUoYXR0cmlidXRlcyk7XG4gICAgY29uc3QgaXNWZXJpZmllZENoYW5nZVZhbHVlID0gaXNWZXJpZmllZENoYW5nZShhdHRyaWJ1dGVzKTtcblxuICAgIC8vIFBsYWNlaG9sZGVyIG1lc3NhZ2VzXG4gICAgY29uc3QgaXNVbnN1cHBvcnRlZE1lc3NhZ2VWYWx1ZSA9IGlzVW5zdXBwb3J0ZWRNZXNzYWdlKGF0dHJpYnV0ZXMpO1xuICAgIGNvbnN0IGlzVGFwVG9WaWV3VmFsdWUgPSBpc1RhcFRvVmlldyhhdHRyaWJ1dGVzKTtcblxuICAgIC8vIEVycm9yc1xuICAgIGNvbnN0IGhhc0Vycm9yc1ZhbHVlID0gaGFzRXJyb3JzKGF0dHJpYnV0ZXMpO1xuXG4gICAgLy8gTG9jYWxseS1nZW5lcmF0ZWQgbm90aWZpY2F0aW9uc1xuICAgIGNvbnN0IGlzS2V5Q2hhbmdlVmFsdWUgPSBpc0tleUNoYW5nZShhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc1Byb2ZpbGVDaGFuZ2VWYWx1ZSA9IGlzUHJvZmlsZUNoYW5nZShhdHRyaWJ1dGVzKTtcbiAgICBjb25zdCBpc1VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uVmFsdWUgPVxuICAgICAgaXNVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbihhdHRyaWJ1dGVzKTtcblxuICAgIC8vIE5vdGU6IG5vdCBhbGwgb2YgdGhlc2UgbWVzc2FnZSB0eXBlcyBnbyB0aHJvdWdoIG1lc3NhZ2UuaGFuZGxlRGF0YU1lc3NhZ2VcblxuICAgIGNvbnN0IGhhc1NvbWV0aGluZ1RvRGlzcGxheSA9XG4gICAgICAvLyBDb3JlIG1lc3NhZ2UgdHlwZXNcbiAgICAgIGhhc0JvZHkgfHxcbiAgICAgIGhhc0F0dGFjaG1lbnQgfHxcbiAgICAgIGhhc0VtYmVkZGVkQ29udGFjdCB8fFxuICAgICAgaXNTdGlja2VyIHx8XG4gICAgICAvLyBSZW5kZXJlZCBzeW5jIG1lc3NhZ2VzXG4gICAgICBpc0NhbGxIaXN0b3J5VmFsdWUgfHxcbiAgICAgIGlzQ2hhdFNlc3Npb25SZWZyZXNoZWRWYWx1ZSB8fFxuICAgICAgaXNEZWxpdmVyeUlzc3VlVmFsdWUgfHxcbiAgICAgIGlzR2lmdEJhZGdlVmFsdWUgfHxcbiAgICAgIGlzR3JvdXBVcGRhdGVWYWx1ZSB8fFxuICAgICAgaXNHcm91cFYyQ2hhbmdlVmFsdWUgfHxcbiAgICAgIGlzRW5kU2Vzc2lvblZhbHVlIHx8XG4gICAgICBpc0V4cGlyYXRpb25UaW1lclVwZGF0ZVZhbHVlIHx8XG4gICAgICBpc1ZlcmlmaWVkQ2hhbmdlVmFsdWUgfHxcbiAgICAgIC8vIFBsYWNlaG9sZGVyIG1lc3NhZ2VzXG4gICAgICBpc1Vuc3VwcG9ydGVkTWVzc2FnZVZhbHVlIHx8XG4gICAgICBpc1RhcFRvVmlld1ZhbHVlIHx8XG4gICAgICAvLyBFcnJvcnNcbiAgICAgIGhhc0Vycm9yc1ZhbHVlIHx8XG4gICAgICAvLyBMb2NhbGx5LWdlbmVyYXRlZCBub3RpZmljYXRpb25zXG4gICAgICBpc0tleUNoYW5nZVZhbHVlIHx8XG4gICAgICBpc1Byb2ZpbGVDaGFuZ2VWYWx1ZSB8fFxuICAgICAgaXNVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvblZhbHVlO1xuXG4gICAgcmV0dXJuICFoYXNTb21ldGhpbmdUb0Rpc3BsYXk7XG4gIH1cblxuICBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5KFxuICAgIGNvbnRhY3RJZDogc3RyaW5nLFxuICAgIHVuaWRlbnRpZmllZERlbGl2ZXJpZXNTZXQ6IFJlYWRvbmx5PFNldDxzdHJpbmc+PlxuICApOiBib29sZWFuIHtcbiAgICBpZiAoaXNJbmNvbWluZyh0aGlzLmF0dHJpYnV0ZXMpKSB7XG4gICAgICByZXR1cm4gQm9vbGVhbih0aGlzLmdldCgndW5pZGVudGlmaWVkRGVsaXZlcnlSZWNlaXZlZCcpKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5pZGVudGlmaWVkRGVsaXZlcmllc1NldC5oYXMoY29udGFjdElkKTtcbiAgfVxuXG4gIGFzeW5jIHNhdmVFcnJvcnMoXG4gICAgcHJvdmlkZWRFcnJvcnM6IEVycm9yIHwgQXJyYXk8RXJyb3I+LFxuICAgIG9wdGlvbnM6IHsgc2tpcFNhdmU/OiBib29sZWFuIH0gPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IHNraXBTYXZlIH0gPSBvcHRpb25zO1xuXG4gICAgbGV0IGVycm9yczogQXJyYXk8Q3VzdG9tRXJyb3I+O1xuXG4gICAgaWYgKCEocHJvdmlkZWRFcnJvcnMgaW5zdGFuY2VvZiBBcnJheSkpIHtcbiAgICAgIGVycm9ycyA9IFtwcm92aWRlZEVycm9yc107XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9ycyA9IHByb3ZpZGVkRXJyb3JzO1xuICAgIH1cblxuICAgIGVycm9ycy5mb3JFYWNoKGUgPT4ge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnTWVzc2FnZS5zYXZlRXJyb3JzOicsXG4gICAgICAgIGUgJiYgZS5yZWFzb24gPyBlLnJlYXNvbiA6IG51bGwsXG4gICAgICAgIGUgJiYgZS5zdGFjayA/IGUuc3RhY2sgOiBlXG4gICAgICApO1xuICAgIH0pO1xuICAgIGVycm9ycyA9IGVycm9ycy5tYXAoZSA9PiB7XG4gICAgICAvLyBOb3RlOiBpbiBvdXIgZW52aXJvbm1lbnQsIGluc3RhbmNlb2YgY2FuIGJlIHNjYXJ5LCBzbyB3ZSBoYXZlIGEgYmFja3VwIGNoZWNrXG4gICAgICAvLyAgIChOb2RlLmpzIHZzIEJyb3dzZXIgY29udGV4dCkuXG4gICAgICAvLyBXZSBjaGVjayBpbnN0YW5jZW9mIHNlY29uZCBiZWNhdXNlIHR5cGVzY3JpcHQgYmVsaWV2ZXMgdGhhdCBhbnl0aGluZyB0aGF0IGNvbWVzXG4gICAgICAvLyAgIHRocm91Z2ggaGVyZSBtdXN0IGJlIGFuIGluc3RhbmNlIG9mIEVycm9yLCBzbyBlIGlzICduZXZlcicgYWZ0ZXIgdGhhdCBjaGVjay5cbiAgICAgIGlmICgoZS5tZXNzYWdlICYmIGUuc3RhY2spIHx8IGUgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICByZXR1cm4gXy5waWNrKFxuICAgICAgICAgIGUsXG4gICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICdtZXNzYWdlJyxcbiAgICAgICAgICAnY29kZScsXG4gICAgICAgICAgJ251bWJlcicsXG4gICAgICAgICAgJ2lkZW50aWZpZXInLFxuICAgICAgICAgICdyZXRyeUFmdGVyJyxcbiAgICAgICAgICAnZGF0YScsXG4gICAgICAgICAgJ3JlYXNvbidcbiAgICAgICAgKSBhcyBSZXF1aXJlZDxFcnJvcj47XG4gICAgICB9XG4gICAgICByZXR1cm4gZTtcbiAgICB9KTtcbiAgICBlcnJvcnMgPSBlcnJvcnMuY29uY2F0KHRoaXMuZ2V0KCdlcnJvcnMnKSB8fCBbXSk7XG5cbiAgICB0aGlzLnNldCh7IGVycm9ycyB9KTtcblxuICAgIGlmICghc2tpcFNhdmUgJiYgIXRoaXMuZG9Ob3RTYXZlKSB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBtYXJrUmVhZChyZWFkQXQ/OiBudW1iZXIsIG9wdGlvbnMgPSB7fSk6IHZvaWQge1xuICAgIHRoaXMuc2V0KG1hcmtSZWFkKHRoaXMuYXR0cmlidXRlcywgcmVhZEF0LCBvcHRpb25zKSk7XG4gIH1cblxuICBnZXRJbmNvbWluZ0NvbnRhY3QoKTogQ29udmVyc2F0aW9uTW9kZWwgfCB1bmRlZmluZWQgfCBudWxsIHtcbiAgICBpZiAoIWlzSW5jb21pbmcodGhpcy5hdHRyaWJ1dGVzKSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIGNvbnN0IHNvdXJjZSA9IHRoaXMuZ2V0KCdzb3VyY2UnKTtcbiAgICBpZiAoIXNvdXJjZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKHNvdXJjZSwgJ3ByaXZhdGUnKTtcbiAgfVxuXG4gIGFzeW5jIHJldHJ5U2VuZCgpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHRoaXMuZ2V0Q29udmVyc2F0aW9uKCkhO1xuXG4gICAgY29uc3QgY3VycmVudENvbnZlcnNhdGlvblJlY2lwaWVudHMgPVxuICAgICAgY29udmVyc2F0aW9uLmdldE1lbWJlckNvbnZlcnNhdGlvbklkcygpO1xuXG4gICAgLy8gRGV0ZXJtaW5lIHJldHJ5IHJlY2lwaWVudHMgYW5kIGdldCB0aGVpciBtb3N0IHVwLXRvLWRhdGUgYWRkcmVzc2luZyBpbmZvcm1hdGlvblxuICAgIGNvbnN0IG9sZFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPVxuICAgICAgdGhpcy5nZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnKSB8fCB7fTtcblxuICAgIGNvbnN0IG5ld1NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSB7IC4uLm9sZFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgfTtcbiAgICBmb3IgKGNvbnN0IFtjb252ZXJzYXRpb25JZCwgc2VuZFN0YXRlXSBvZiBPYmplY3QuZW50cmllcyhcbiAgICAgIG9sZFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWRcbiAgICApKSB7XG4gICAgICBpZiAoaXNTZW50KHNlbmRTdGF0ZS5zdGF0dXMpKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCByZWNpcGllbnQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgaWYgKFxuICAgICAgICAhcmVjaXBpZW50IHx8XG4gICAgICAgICghY3VycmVudENvbnZlcnNhdGlvblJlY2lwaWVudHMuaGFzKGNvbnZlcnNhdGlvbklkKSAmJlxuICAgICAgICAgICFpc01lKHJlY2lwaWVudC5hdHRyaWJ1dGVzKSlcbiAgICAgICkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgbmV3U2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFtjb252ZXJzYXRpb25JZF0gPSBzZW5kU3RhdGVSZWR1Y2VyKFxuICAgICAgICBzZW5kU3RhdGUsXG4gICAgICAgIHtcbiAgICAgICAgICB0eXBlOiBTZW5kQWN0aW9uVHlwZS5NYW51YWxseVJldHJpZWQsXG4gICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJywgbmV3U2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCk7XG5cbiAgICBhd2FpdCBjb252ZXJzYXRpb25Kb2JRdWV1ZS5hZGQoXG4gICAgICB7XG4gICAgICAgIHR5cGU6IGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bS5lbnVtLk5vcm1hbE1lc3NhZ2UsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICAgIG1lc3NhZ2VJZDogdGhpcy5pZCxcbiAgICAgICAgcmV2aXNpb246IGNvbnZlcnNhdGlvbi5nZXQoJ3JldmlzaW9uJyksXG4gICAgICB9LFxuICAgICAgYXN5bmMgam9iVG9JbnNlcnQgPT4ge1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgam9iVG9JbnNlcnQsXG4gICAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcbiAgfVxuXG4gIGlzUmVwbGF5YWJsZUVycm9yKGU6IEVycm9yKTogYm9vbGVhbiB7XG4gICAgcmV0dXJuIChcbiAgICAgIGUubmFtZSA9PT0gJ01lc3NhZ2VFcnJvcicgfHxcbiAgICAgIGUubmFtZSA9PT0gJ091dGdvaW5nTWVzc2FnZUVycm9yJyB8fFxuICAgICAgZS5uYW1lID09PSAnU2VuZE1lc3NhZ2VOZXR3b3JrRXJyb3InIHx8XG4gICAgICBlLm5hbWUgPT09ICdTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yJyB8fFxuICAgICAgZS5uYW1lID09PSAnU2lnbmVkUHJlS2V5Um90YXRpb25FcnJvcicgfHxcbiAgICAgIGUubmFtZSA9PT0gJ091dGdvaW5nSWRlbnRpdHlLZXlFcnJvcidcbiAgICApO1xuICB9XG5cbiAgcHVibGljIGhhc1N1Y2Nlc3NmdWxEZWxpdmVyeSgpOiBib29sZWFuIHtcbiAgICBjb25zdCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkID0gdGhpcy5nZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnKTtcbiAgICBjb25zdCB3aXRob3V0TWUgPSBvbWl0KFxuICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpXG4gICAgKTtcbiAgICByZXR1cm4gaXNFbXB0eSh3aXRob3V0TWUpIHx8IHNvbWVTZW5kU3RhdHVzKHdpdGhvdXRNZSwgaXNTZW50KTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDaGFuZ2UgYW55IFBlbmRpbmcgc2VuZCBzdGF0ZSB0byBGYWlsZWQuIE5vdGUgdGhhdCB0aGlzIHdpbGwgbm90IG1hcmsgc3VjY2Vzc2Z1bFxuICAgKiBzZW5kcyBmYWlsZWQuXG4gICAqL1xuICBwdWJsaWMgbWFya0ZhaWxlZCgpOiB2b2lkIHtcbiAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgIHRoaXMuc2V0KFxuICAgICAgJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnLFxuICAgICAgbWFwVmFsdWVzKHRoaXMuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge30sIHNlbmRTdGF0ZSA9PlxuICAgICAgICBzZW5kU3RhdGVSZWR1Y2VyKHNlbmRTdGF0ZSwge1xuICAgICAgICAgIHR5cGU6IFNlbmRBY3Rpb25UeXBlLkZhaWxlZCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IG5vdyxcbiAgICAgICAgfSlcbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcmVtb3ZlT3V0Z29pbmdFcnJvcnMoaW5jb21pbmdJZGVudGlmaWVyOiBzdHJpbmcpOiBDdXN0b21FcnJvciB7XG4gICAgY29uc3QgaW5jb21pbmdDb252ZXJzYXRpb25JZCA9XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRDb252ZXJzYXRpb25JZChpbmNvbWluZ0lkZW50aWZpZXIpO1xuICAgIGNvbnN0IGVycm9ycyA9IF8ucGFydGl0aW9uKFxuICAgICAgdGhpcy5nZXQoJ2Vycm9ycycpLFxuICAgICAgZSA9PlxuICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRDb252ZXJzYXRpb25JZChcbiAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgIGUuaWRlbnRpZmllciB8fCBlLm51bWJlciFcbiAgICAgICAgKSA9PT0gaW5jb21pbmdDb252ZXJzYXRpb25JZCAmJlxuICAgICAgICAoZS5uYW1lID09PSAnTWVzc2FnZUVycm9yJyB8fFxuICAgICAgICAgIGUubmFtZSA9PT0gJ091dGdvaW5nTWVzc2FnZUVycm9yJyB8fFxuICAgICAgICAgIGUubmFtZSA9PT0gJ1NlbmRNZXNzYWdlTmV0d29ya0Vycm9yJyB8fFxuICAgICAgICAgIGUubmFtZSA9PT0gJ1NlbmRNZXNzYWdlQ2hhbGxlbmdlRXJyb3InIHx8XG4gICAgICAgICAgZS5uYW1lID09PSAnU2lnbmVkUHJlS2V5Um90YXRpb25FcnJvcicgfHxcbiAgICAgICAgICBlLm5hbWUgPT09ICdPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3InKVxuICAgICk7XG4gICAgdGhpcy5zZXQoeyBlcnJvcnM6IGVycm9yc1sxXSB9KTtcbiAgICByZXR1cm4gZXJyb3JzWzBdWzBdO1xuICB9XG5cbiAgYXN5bmMgc2VuZChcbiAgICBwcm9taXNlOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZSB8IHZvaWQgfCBudWxsPixcbiAgICBzYXZlRXJyb3JzPzogKGVycm9yczogQXJyYXk8RXJyb3I+KSA9PiB2b2lkXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVwZGF0ZUxlZnRQYW5lID1cbiAgICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk/LmRlYm91bmNlZFVwZGF0ZUxhc3RNZXNzYWdlIHx8IG5vb3A7XG5cbiAgICB1cGRhdGVMZWZ0UGFuZSgpO1xuXG4gICAgbGV0IHJlc3VsdDpcbiAgICAgIHwgeyBzdWNjZXNzOiB0cnVlOyB2YWx1ZTogQ2FsbGJhY2tSZXN1bHRUeXBlIH1cbiAgICAgIHwge1xuICAgICAgICAgIHN1Y2Nlc3M6IGZhbHNlO1xuICAgICAgICAgIHZhbHVlOiBDdXN0b21FcnJvciB8IFNlbmRNZXNzYWdlUHJvdG9FcnJvcjtcbiAgICAgICAgfTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgdmFsdWUgPSBhd2FpdCAocHJvbWlzZSBhcyBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4pO1xuICAgICAgcmVzdWx0ID0geyBzdWNjZXNzOiB0cnVlLCB2YWx1ZSB9O1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgcmVzdWx0ID0geyBzdWNjZXNzOiBmYWxzZSwgdmFsdWU6IGVyciB9O1xuICAgIH1cblxuICAgIHVwZGF0ZUxlZnRQYW5lKCk7XG5cbiAgICBjb25zdCBhdHRyaWJ1dGVzVG9VcGRhdGU6IFBhcnRpYWw8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPiA9IHt9O1xuXG4gICAgLy8gVGhpcyBpcyB1c2VkIGJ5IHNlbmRTeW5jTWVzc2FnZSwgdGhlbiBzZXQgdG8gbnVsbFxuICAgIGlmICgnZGF0YU1lc3NhZ2UnIGluIHJlc3VsdC52YWx1ZSAmJiByZXN1bHQudmFsdWUuZGF0YU1lc3NhZ2UpIHtcbiAgICAgIGF0dHJpYnV0ZXNUb1VwZGF0ZS5kYXRhTWVzc2FnZSA9IHJlc3VsdC52YWx1ZS5kYXRhTWVzc2FnZTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZG9Ob3RTYXZlKSB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICBjb25zdCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkID0ge1xuICAgICAgLi4uKHRoaXMuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge30pLFxuICAgIH07XG5cbiAgICBjb25zdCBzZW5kSXNOb3RGaW5hbCA9XG4gICAgICAnc2VuZElzTm90RmluYWwnIGluIHJlc3VsdC52YWx1ZSAmJiByZXN1bHQudmFsdWUuc2VuZElzTm90RmluYWw7XG4gICAgY29uc3Qgc2VuZElzRmluYWwgPSAhc2VuZElzTm90RmluYWw7XG5cbiAgICAvLyBDYXB0dXJlIHN1Y2Nlc3NmdWwgc2VuZHNcbiAgICBjb25zdCBzdWNjZXNzZnVsSWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz4gPVxuICAgICAgc2VuZElzRmluYWwgJiZcbiAgICAgICdzdWNjZXNzZnVsSWRlbnRpZmllcnMnIGluIHJlc3VsdC52YWx1ZSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShyZXN1bHQudmFsdWUuc3VjY2Vzc2Z1bElkZW50aWZpZXJzKVxuICAgICAgICA/IHJlc3VsdC52YWx1ZS5zdWNjZXNzZnVsSWRlbnRpZmllcnNcbiAgICAgICAgOiBbXTtcbiAgICBjb25zdCBzZW50VG9BdExlYXN0T25lUmVjaXBpZW50ID1cbiAgICAgIHJlc3VsdC5zdWNjZXNzIHx8IEJvb2xlYW4oc3VjY2Vzc2Z1bElkZW50aWZpZXJzLmxlbmd0aCk7XG5cbiAgICBzdWNjZXNzZnVsSWRlbnRpZmllcnMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gSWYgd2Ugc3VjY2Vzc2Z1bGx5IHNlbnQgdG8gYSB1c2VyLCB3ZSBjYW4gcmVtb3ZlIG91ciB1bnJlZ2lzdGVyZWQgZmxhZy5cbiAgICAgIGlmIChjb252ZXJzYXRpb24uaXNFdmVyVW5yZWdpc3RlcmVkKCkpIHtcbiAgICAgICAgY29udmVyc2F0aW9uLnNldFJlZ2lzdGVyZWQoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJldmlvdXNTZW5kU3RhdGUgPSBnZXRPd24oXG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbi5pZFxuICAgICAgKTtcbiAgICAgIGlmIChwcmV2aW91c1NlbmRTdGF0ZSkge1xuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkW2NvbnZlcnNhdGlvbi5pZF0gPSBzZW5kU3RhdGVSZWR1Y2VyKFxuICAgICAgICAgIHByZXZpb3VzU2VuZFN0YXRlLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gSW50ZWdyYXRlIHNlbmRzIHZpYSBzZWFsZWQgc2VuZGVyXG4gICAgY29uc3QgcHJldmlvdXNVbmlkZW50aWZpZWREZWxpdmVyaWVzID1cbiAgICAgIHRoaXMuZ2V0KCd1bmlkZW50aWZpZWREZWxpdmVyaWVzJykgfHwgW107XG4gICAgY29uc3QgbmV3VW5pZGVudGlmaWVkRGVsaXZlcmllcyA9XG4gICAgICBzZW5kSXNGaW5hbCAmJlxuICAgICAgJ3VuaWRlbnRpZmllZERlbGl2ZXJpZXMnIGluIHJlc3VsdC52YWx1ZSAmJlxuICAgICAgQXJyYXkuaXNBcnJheShyZXN1bHQudmFsdWUudW5pZGVudGlmaWVkRGVsaXZlcmllcylcbiAgICAgICAgPyByZXN1bHQudmFsdWUudW5pZGVudGlmaWVkRGVsaXZlcmllc1xuICAgICAgICA6IFtdO1xuXG4gICAgY29uc3QgcHJvbWlzZXM6IEFycmF5PFByb21pc2U8dW5rbm93bj4+ID0gW107XG5cbiAgICAvLyBQcm9jZXNzIGVycm9yc1xuICAgIGxldCBlcnJvcnM6IEFycmF5PEN1c3RvbUVycm9yPjtcbiAgICBpZiAocmVzdWx0LnZhbHVlIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yICYmIHJlc3VsdC52YWx1ZS5lcnJvcnMpIHtcbiAgICAgICh7IGVycm9ycyB9ID0gcmVzdWx0LnZhbHVlKTtcbiAgICB9IGVsc2UgaWYgKGlzQ3VzdG9tRXJyb3IocmVzdWx0LnZhbHVlKSkge1xuICAgICAgZXJyb3JzID0gW3Jlc3VsdC52YWx1ZV07XG4gICAgfSBlbHNlIGlmIChBcnJheS5pc0FycmF5KHJlc3VsdC52YWx1ZS5lcnJvcnMpKSB7XG4gICAgICAoeyBlcnJvcnMgfSA9IHJlc3VsdC52YWx1ZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVycm9ycyA9IFtdO1xuICAgIH1cblxuICAgIC8vIEluIGdyb3Vwcywgd2UgZG9uJ3QgdHJlYXQgdW5yZWdpc3RlcmVkIHVzZXJzIGFzIGEgdXNlci12aXNpYmxlXG4gICAgLy8gICBlcnJvci4gVGhlIG1lc3NhZ2Ugd2lsbCBsb29rIHN1Y2Nlc3NmdWwsIGJ1dCB0aGUgZGV0YWlsc1xuICAgIC8vICAgc2NyZWVuIHdpbGwgc2hvdyB0aGF0IHdlIGRpZG4ndCBzZW5kIHRvIHRoZXNlIHVucmVnaXN0ZXJlZCB1c2Vycy5cbiAgICBjb25zdCBlcnJvcnNUb1NhdmU6IEFycmF5PEN1c3RvbUVycm9yPiA9IFtdO1xuXG4gICAgbGV0IGhhZFNpZ25lZFByZUtleVJvdGF0aW9uRXJyb3IgPSBmYWxzZTtcbiAgICBlcnJvcnMuZm9yRWFjaChlcnJvciA9PiB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24gPVxuICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoZXJyb3IuaWRlbnRpZmllcikgfHxcbiAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGVycm9yLm51bWJlcik7XG5cbiAgICAgIGlmIChjb252ZXJzYXRpb24gJiYgIXNhdmVFcnJvcnMgJiYgc2VuZElzRmluYWwpIHtcbiAgICAgICAgY29uc3QgcHJldmlvdXNTZW5kU3RhdGUgPSBnZXRPd24oXG4gICAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBjb252ZXJzYXRpb24uaWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKHByZXZpb3VzU2VuZFN0YXRlKSB7XG4gICAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFtjb252ZXJzYXRpb24uaWRdID0gc2VuZFN0YXRlUmVkdWNlcihcbiAgICAgICAgICAgIHByZXZpb3VzU2VuZFN0YXRlLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0eXBlOiBTZW5kQWN0aW9uVHlwZS5GYWlsZWQsXG4gICAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGxldCBzaG91bGRTYXZlRXJyb3IgPSB0cnVlO1xuICAgICAgc3dpdGNoIChlcnJvci5uYW1lKSB7XG4gICAgICAgIGNhc2UgJ1NpZ25lZFByZUtleVJvdGF0aW9uRXJyb3InOlxuICAgICAgICAgIGhhZFNpZ25lZFByZUtleVJvdGF0aW9uRXJyb3IgPSB0cnVlO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3InOiB7XG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgcHJvbWlzZXMucHVzaChjb252ZXJzYXRpb24uZ2V0UHJvZmlsZXMoKSk7XG4gICAgICAgICAgfVxuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgJ1VucmVnaXN0ZXJlZFVzZXJFcnJvcic6XG4gICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbiAmJiBpc0dyb3VwKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgc2hvdWxkU2F2ZUVycm9yID0gZmFsc2U7XG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIElmIHdlIGp1c3QgZm91bmQgb3V0IHRoYXQgd2UgY291bGRuJ3Qgc2VuZCB0byBhIHVzZXIgYmVjYXVzZSB0aGV5IGFyZSBub1xuICAgICAgICAgIC8vICAgbG9uZ2VyIHJlZ2lzdGVyZWQsIHdlIHdpbGwgdXBkYXRlIG91ciB1bnJlZ2lzdGVyZWQgZmxhZy4gSW4gZ3JvdXBzIHdlXG4gICAgICAgICAgLy8gICB3aWxsIG5vdCBldmVudCB0cnkgdG8gc2VuZCB0byB0aGVtIGZvciA2IGhvdXJzLiBBbmQgd2Ugd2lsbCBuZXZlciB0cnlcbiAgICAgICAgICAvLyAgIHRvIGZldGNoIHRoZW0gb24gc3RhcnR1cCBhZ2Fpbi5cbiAgICAgICAgICAvL1xuICAgICAgICAgIC8vIFRoZSB3YXkgdG8gZGlzY292ZXIgcmVnaXN0cmF0aW9uIG9uY2UgbW9yZSBpczpcbiAgICAgICAgICAvLyAgIDEpIGFueSBhdHRlbXB0IHRvIHNlbmQgdG8gdGhlbSBpbiAxOjEgY29udmVyc2F0aW9uXG4gICAgICAgICAgLy8gICAyKSB0aGUgc2l4LWhvdXIgdGltZSBwZXJpb2QgaGFzIHBhc3NlZCBhbmQgd2Ugc2VuZCBpbiBhIGdyb3VwIGFnYWluXG4gICAgICAgICAgY29udmVyc2F0aW9uPy5zZXRVbnJlZ2lzdGVyZWQoKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICBicmVhaztcbiAgICAgIH1cblxuICAgICAgaWYgKHNob3VsZFNhdmVFcnJvcikge1xuICAgICAgICBlcnJvcnNUb1NhdmUucHVzaChlcnJvcik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoaGFkU2lnbmVkUHJlS2V5Um90YXRpb25FcnJvcikge1xuICAgICAgcHJvbWlzZXMucHVzaChcbiAgICAgICAgd2luZG93LmdldEFjY291bnRNYW5hZ2VyKCkucm90YXRlU2lnbmVkUHJlS2V5KFVVSURLaW5kLkFDSSlcbiAgICAgICk7XG4gICAgfVxuXG4gICAgYXR0cmlidXRlc1RvVXBkYXRlLnNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkO1xuICAgIGF0dHJpYnV0ZXNUb1VwZGF0ZS5leHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgPSBzZW50VG9BdExlYXN0T25lUmVjaXBpZW50XG4gICAgICA/IERhdGUubm93KClcbiAgICAgIDogdW5kZWZpbmVkO1xuICAgIGF0dHJpYnV0ZXNUb1VwZGF0ZS51bmlkZW50aWZpZWREZWxpdmVyaWVzID0gdW5pb24oXG4gICAgICBwcmV2aW91c1VuaWRlbnRpZmllZERlbGl2ZXJpZXMsXG4gICAgICBuZXdVbmlkZW50aWZpZWREZWxpdmVyaWVzXG4gICAgKTtcbiAgICAvLyBXZSBtYXkgb3ZlcndyaXRlIHRoaXMgaW4gdGhlIGBzYXZlRXJyb3JzYCBjYWxsIGJlbG93LlxuICAgIGF0dHJpYnV0ZXNUb1VwZGF0ZS5lcnJvcnMgPSBbXTtcblxuICAgIHRoaXMuc2V0KGF0dHJpYnV0ZXNUb1VwZGF0ZSk7XG4gICAgaWYgKHNhdmVFcnJvcnMpIHtcbiAgICAgIHNhdmVFcnJvcnMoZXJyb3JzVG9TYXZlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gV2Ugc2tpcCBzYXZlIGJlY2F1c2Ugd2UnbGwgc2F2ZSBpbiB0aGUgbmV4dCBzdGVwLlxuICAgICAgdGhpcy5zYXZlRXJyb3JzKGVycm9yc1RvU2F2ZSwgeyBza2lwU2F2ZTogdHJ1ZSB9KTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZG9Ob3RTYXZlKSB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICB9KTtcbiAgICB9XG5cbiAgICB1cGRhdGVMZWZ0UGFuZSgpO1xuXG4gICAgaWYgKHNlbnRUb0F0TGVhc3RPbmVSZWNpcGllbnQpIHtcbiAgICAgIHByb21pc2VzLnB1c2godGhpcy5zZW5kU3luY01lc3NhZ2UoKSk7XG4gICAgfVxuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwocHJvbWlzZXMpO1xuXG4gICAgY29uc3QgaXNUb3RhbFN1Y2Nlc3M6IGJvb2xlYW4gPVxuICAgICAgcmVzdWx0LnN1Y2Nlc3MgJiYgIXRoaXMuZ2V0KCdlcnJvcnMnKT8ubGVuZ3RoO1xuICAgIGlmIChpc1RvdGFsU3VjY2Vzcykge1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVkT3V0Z29pbmdQcmV2aWV3RGF0YTtcbiAgICAgIGRlbGV0ZSB0aGlzLmNhY2hlZE91dGdvaW5nUXVvdGVEYXRhO1xuICAgICAgZGVsZXRlIHRoaXMuY2FjaGVkT3V0Z29pbmdTdGlja2VyRGF0YTtcbiAgICB9XG5cbiAgICB1cGRhdGVMZWZ0UGFuZSgpO1xuICB9XG5cbiAgYXN5bmMgc2VuZFN5bmNNZXNzYWdlT25seShcbiAgICBkYXRhTWVzc2FnZTogVWludDhBcnJheSxcbiAgICBzYXZlRXJyb3JzPzogKGVycm9yczogQXJyYXk8RXJyb3I+KSA9PiB2b2lkXG4gICk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlIHwgdm9pZD4ge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgY29uc3QgY29udiA9IHRoaXMuZ2V0Q29udmVyc2F0aW9uKCkhO1xuICAgIHRoaXMuc2V0KHsgZGF0YU1lc3NhZ2UgfSk7XG5cbiAgICBjb25zdCB1cGRhdGVMZWZ0UGFuZSA9IGNvbnY/LmRlYm91bmNlZFVwZGF0ZUxhc3RNZXNzYWdlO1xuXG4gICAgdHJ5IHtcbiAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgLy8gVGhpcyBpcyB0aGUgc2FtZSBhcyBhIG5vcm1hbCBzZW5kKClcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnNlbmRTeW5jTWVzc2FnZSgpO1xuICAgICAgdGhpcy5zZXQoe1xuICAgICAgICAvLyBXZSBoYXZlIHRvIGRvIHRoaXMgYWZ0ZXJ3YXJkLCBzaW5jZSB3ZSBkaWRuJ3QgaGF2ZSBhIHByZXZpb3VzIHNlbmQhXG4gICAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJpZXM6XG4gICAgICAgICAgcmVzdWx0ICYmIHJlc3VsdC51bmlkZW50aWZpZWREZWxpdmVyaWVzXG4gICAgICAgICAgICA/IHJlc3VsdC51bmlkZW50aWZpZWREZWxpdmVyaWVzXG4gICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgY29uc3QgcmVzdWx0RXJyb3JzID0gZXJyb3I/LmVycm9ycztcbiAgICAgIGNvbnN0IGVycm9ycyA9IEFycmF5LmlzQXJyYXkocmVzdWx0RXJyb3JzKVxuICAgICAgICA/IHJlc3VsdEVycm9yc1xuICAgICAgICA6IFtuZXcgRXJyb3IoJ1Vua25vd24gZXJyb3InKV07XG4gICAgICBpZiAoc2F2ZUVycm9ycykge1xuICAgICAgICBzYXZlRXJyb3JzKGVycm9ycyk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZSBkb24ndCBzYXZlIGJlY2F1c2Ugd2UncmUgYWJvdXQgdG8gc2F2ZSBiZWxvdy5cbiAgICAgICAgdGhpcy5zYXZlRXJyb3JzKGVycm9ycywgeyBza2lwU2F2ZTogdHJ1ZSB9KTtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICB9KTtcblxuICAgICAgaWYgKHVwZGF0ZUxlZnRQYW5lKSB7XG4gICAgICAgIHVwZGF0ZUxlZnRQYW5lKCk7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc2VuZFN5bmNNZXNzYWdlKCk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlIHwgdm9pZD4ge1xuICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbiA9XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25PclRocm93KCk7XG4gICAgY29uc3Qgc2VuZE9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhvdXJDb252ZXJzYXRpb24uYXR0cmlidXRlcywge1xuICAgICAgc3luY01lc3NhZ2U6IHRydWUsXG4gICAgfSk7XG5cbiAgICBpZiAod2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuYXJlV2VQcmltYXJ5RGV2aWNlKCkpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICAnc2VuZFN5bmNNZXNzYWdlOiBXZSBhcmUgcHJpbWFyeSBkZXZpY2U7IG5vdCBzZW5kaW5nIHN5bmMgbWVzc2FnZSdcbiAgICAgICk7XG4gICAgICB0aGlzLnNldCh7IGRhdGFNZXNzYWdlOiB1bmRlZmluZWQgfSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICAgIGlmICghbWVzc2FnaW5nKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3NlbmRTeW5jTWVzc2FnZTogbWVzc2FnaW5nIG5vdCBhdmFpbGFibGUhJyk7XG4gICAgfVxuXG4gICAgdGhpcy5zeW5jUHJvbWlzZSA9IHRoaXMuc3luY1Byb21pc2UgfHwgUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgY29uc3QgbmV4dCA9IGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGRhdGFNZXNzYWdlID0gdGhpcy5nZXQoJ2RhdGFNZXNzYWdlJyk7XG4gICAgICBpZiAoIWRhdGFNZXNzYWdlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzVXBkYXRlID0gQm9vbGVhbih0aGlzLmdldCgnc3luY2VkJykpO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIGNvbnN0IGNvbnYgPSB0aGlzLmdldENvbnZlcnNhdGlvbigpITtcblxuICAgICAgY29uc3Qgc2VuZEVudHJpZXMgPSBPYmplY3QuZW50cmllcyhcbiAgICAgICAgdGhpcy5nZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnKSB8fCB7fVxuICAgICAgKTtcbiAgICAgIGNvbnN0IHNlbnRFbnRyaWVzID0gZmlsdGVyKHNlbmRFbnRyaWVzLCAoW19jb252ZXJzYXRpb25JZCwgeyBzdGF0dXMgfV0pID0+XG4gICAgICAgIGlzU2VudChzdGF0dXMpXG4gICAgICApO1xuICAgICAgY29uc3QgYWxsQ29udmVyc2F0aW9uSWRzU2VudFRvID0gbWFwKFxuICAgICAgICBzZW50RW50cmllcyxcbiAgICAgICAgKFtjb252ZXJzYXRpb25JZF0pID0+IGNvbnZlcnNhdGlvbklkXG4gICAgICApO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWRzU2VudFRvID0gZmlsdGVyKFxuICAgICAgICBhbGxDb252ZXJzYXRpb25JZHNTZW50VG8sXG4gICAgICAgIGNvbnZlcnNhdGlvbklkID0+IGNvbnZlcnNhdGlvbklkICE9PSBvdXJDb252ZXJzYXRpb24uaWRcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IHVuaWRlbnRpZmllZERlbGl2ZXJpZXMgPSB0aGlzLmdldCgndW5pZGVudGlmaWVkRGVsaXZlcmllcycpIHx8IFtdO1xuICAgICAgY29uc3QgbWF5YmVDb252ZXJzYXRpb25zV2l0aFNlYWxlZFNlbmRlciA9IG1hcChcbiAgICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcmllcyxcbiAgICAgICAgaWRlbnRpZmllciA9PiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcilcbiAgICAgICk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25zV2l0aFNlYWxlZFNlbmRlciA9IGZpbHRlcihcbiAgICAgICAgbWF5YmVDb252ZXJzYXRpb25zV2l0aFNlYWxlZFNlbmRlcixcbiAgICAgICAgaXNOb3ROaWxcbiAgICAgICk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZHNXaXRoU2VhbGVkU2VuZGVyID0gbmV3IFNldChcbiAgICAgICAgbWFwKGNvbnZlcnNhdGlvbnNXaXRoU2VhbGVkU2VuZGVyLCBjID0+IGMuaWQpXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICAgIG1lc3NhZ2luZy5zZW5kU3luY01lc3NhZ2Uoe1xuICAgICAgICAgIGVuY29kZWREYXRhTWVzc2FnZTogZGF0YU1lc3NhZ2UsXG4gICAgICAgICAgdGltZXN0YW1wOiB0aGlzLmdldCgnc2VudF9hdCcpLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb252LmdldCgnZTE2NCcpLFxuICAgICAgICAgIGRlc3RpbmF0aW9uVXVpZDogY29udi5nZXQoJ3V1aWQnKSxcbiAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6XG4gICAgICAgICAgICB0aGlzLmdldCgnZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wJykgfHwgbnVsbCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZHNTZW50VG8sXG4gICAgICAgICAgY29udmVyc2F0aW9uSWRzV2l0aFNlYWxlZFNlbmRlcixcbiAgICAgICAgICBpc1VwZGF0ZSxcbiAgICAgICAgICBvcHRpb25zOiBzZW5kT3B0aW9ucyxcbiAgICAgICAgfSksXG4gICAgICAgIC8vIE5vdGU6IGluIHNvbWUgc2l0dWF0aW9ucywgZm9yIGRvTm90U2F2ZSBtZXNzYWdlcywgdGhlIG1lc3NhZ2UgaGFzIG5vXG4gICAgICAgIC8vICAgaWQsIHNvIHdlIHByb3ZpZGUgYW4gZW1wdHkgYXJyYXkgaGVyZS5cbiAgICAgICAgeyBtZXNzYWdlSWRzOiB0aGlzLmlkID8gW3RoaXMuaWRdIDogW10sIHNlbmRUeXBlOiAnc2VudFN5bmMnIH1cbiAgICAgICkudGhlbihhc3luYyByZXN1bHQgPT4ge1xuICAgICAgICBsZXQgbmV3U2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDogdW5kZWZpbmVkIHwgU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDtcbiAgICAgICAgY29uc3Qgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCA9XG4gICAgICAgICAgdGhpcy5nZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnKSB8fCB7fTtcbiAgICAgICAgY29uc3Qgb3VyT2xkU2VuZFN0YXRlID0gZ2V0T3duKFxuICAgICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uLmlkXG4gICAgICAgICk7XG4gICAgICAgIGlmIChvdXJPbGRTZW5kU3RhdGUpIHtcbiAgICAgICAgICBjb25zdCBvdXJOZXdTZW5kU3RhdGUgPSBzZW5kU3RhdGVSZWR1Y2VyKG91ck9sZFNlbmRTdGF0ZSwge1xuICAgICAgICAgICAgdHlwZTogU2VuZEFjdGlvblR5cGUuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBpZiAob3VyTmV3U2VuZFN0YXRlICE9PSBvdXJPbGRTZW5kU3RhdGUpIHtcbiAgICAgICAgICAgIG5ld1NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSB7XG4gICAgICAgICAgICAgIC4uLnNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgICAgIFtvdXJDb252ZXJzYXRpb24uaWRdOiBvdXJOZXdTZW5kU3RhdGUsXG4gICAgICAgICAgICB9O1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMuc2V0KHtcbiAgICAgICAgICBzeW5jZWQ6IHRydWUsXG4gICAgICAgICAgZGF0YU1lc3NhZ2U6IG51bGwsXG4gICAgICAgICAgLi4uKG5ld1NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWRcbiAgICAgICAgICAgID8geyBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiBuZXdTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkIH1cbiAgICAgICAgICAgIDoge30pLFxuICAgICAgICB9KTtcblxuICAgICAgICAvLyBSZXR1cm4gZWFybHksIHNraXAgdGhlIHNhdmVcbiAgICAgICAgaWYgKHRoaXMuZG9Ob3RTYXZlKSB7XG4gICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgfVxuXG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZSh0aGlzLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICB9KTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH0pO1xuICAgIH07XG5cbiAgICB0aGlzLnN5bmNQcm9taXNlID0gdGhpcy5zeW5jUHJvbWlzZS50aGVuKG5leHQsIG5leHQpO1xuXG4gICAgcmV0dXJuIHRoaXMuc3luY1Byb21pc2U7XG4gIH1cblxuICBoYXNSZXF1aXJlZEF0dGFjaG1lbnREb3dubG9hZHMoKTogYm9vbGVhbiB7XG4gICAgY29uc3QgYXR0YWNobWVudHM6IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudFR5cGU+ID1cbiAgICAgIHRoaXMuZ2V0KCdhdHRhY2htZW50cycpIHx8IFtdO1xuXG4gICAgY29uc3QgaGFzTG9uZ01lc3NhZ2VBdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzLnNvbWUoYXR0YWNobWVudCA9PiB7XG4gICAgICByZXR1cm4gTUlNRS5pc0xvbmdNZXNzYWdlKGF0dGFjaG1lbnQuY29udGVudFR5cGUpO1xuICAgIH0pO1xuXG4gICAgaWYgKGhhc0xvbmdNZXNzYWdlQXR0YWNobWVudHMpIHtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGNvbnN0IHN0aWNrZXIgPSB0aGlzLmdldCgnc3RpY2tlcicpO1xuICAgIGlmIChzdGlja2VyKSB7XG4gICAgICByZXR1cm4gIXN0aWNrZXIuZGF0YSB8fCAhc3RpY2tlci5kYXRhLnBhdGg7XG4gICAgfVxuXG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgaGFzQXR0YWNobWVudERvd25sb2FkcygpOiBib29sZWFuIHtcbiAgICByZXR1cm4gaGFzQXR0YWNobWVudERvd25sb2Fkcyh0aGlzLmF0dHJpYnV0ZXMpO1xuICB9XG5cbiAgYXN5bmMgcXVldWVBdHRhY2htZW50RG93bmxvYWRzKCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIGNvbnN0IHZhbHVlID0gYXdhaXQgcXVldWVBdHRhY2htZW50RG93bmxvYWRzKHRoaXMuYXR0cmlidXRlcyk7XG4gICAgaWYgKCF2YWx1ZSkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRoaXMuc2V0KHZhbHVlKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIG1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQoYXR0YWNobWVudDogQXR0YWNobWVudFR5cGUpOiB2b2lkIHtcbiAgICBpZiAoIWF0dGFjaG1lbnQucGF0aCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIkF0dGFjaG1lbnQgY2FuJ3QgYmUgbWFya2VkIGFzIGNvcnJ1cHRlZCBiZWNhdXNlIGl0IHdhc24ndCBsb2FkZWRcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICAvLyBXZSBpbnRlbnRpb25hbGx5IGRvbid0IGNoZWNrIGluIHF1b3Rlcy9zdGlja2Vycy9jb250YWN0cy8uLi4gaGVyZSxcbiAgICAvLyBiZWNhdXNlIHRoaXMgZnVuY3Rpb24gc2hvdWxkIGJlIGNhbGxlZCBvbmx5IGZvciBzb21ldGhpbmcgdGhhdCBjYW5cbiAgICAvLyBiZSBkaXNwbGF5ZWQgYXMgYSBnZW5lcmljIGF0dGFjaG1lbnQuXG4gICAgY29uc3QgYXR0YWNobWVudHM6IFJlYWRvbmx5QXJyYXk8QXR0YWNobWVudFR5cGU+ID1cbiAgICAgIHRoaXMuZ2V0KCdhdHRhY2htZW50cycpIHx8IFtdO1xuXG4gICAgbGV0IGNoYW5nZWQgPSBmYWxzZTtcbiAgICBjb25zdCBuZXdBdHRhY2htZW50cyA9IGF0dGFjaG1lbnRzLm1hcChleGlzdGluZyA9PiB7XG4gICAgICBpZiAoZXhpc3RpbmcucGF0aCAhPT0gYXR0YWNobWVudC5wYXRoKSB7XG4gICAgICAgIHJldHVybiBleGlzdGluZztcbiAgICAgIH1cbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5leGlzdGluZyxcbiAgICAgICAgaXNDb3JydXB0ZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gICAgaWYgKCFjaGFuZ2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgIFwiQXR0YWNobWVudCBjYW4ndCBiZSBtYXJrZWQgYXMgY29ycnVwdGVkIGJlY2F1c2UgaXQgd2Fzbid0IGZvdW5kXCJcbiAgICAgICk7XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ21hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQ6IG1hcmtpbmcgYW4gYXR0YWNobWVudCBhcyBjb3JydXB0ZWQnKTtcblxuICAgIHRoaXMuc2V0KHtcbiAgICAgIGF0dGFjaG1lbnRzOiBuZXdBdHRhY2htZW50cyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIGNvcHlGcm9tUXVvdGVkTWVzc2FnZShcbiAgICBxdW90ZTogUHJvY2Vzc2VkUXVvdGUgfCB1bmRlZmluZWQsXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuICApOiBQcm9taXNlPFF1b3RlZE1lc3NhZ2VUeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgaWYgKCFxdW90ZSkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCB7IGlkIH0gPSBxdW90ZTtcbiAgICBzdHJpY3RBc3NlcnQoaWQsICdRdW90ZSBtdXN0IGhhdmUgYW4gaWQnKTtcblxuICAgIGNvbnN0IHJlc3VsdDogUXVvdGVkTWVzc2FnZVR5cGUgPSB7XG4gICAgICAuLi5xdW90ZSxcblxuICAgICAgaWQsXG5cbiAgICAgIGF0dGFjaG1lbnRzOiBxdW90ZS5hdHRhY2htZW50cy5zbGljZSgpLFxuICAgICAgYm9keVJhbmdlczogcXVvdGUuYm9keVJhbmdlcy5tYXAoKHsgc3RhcnQsIGxlbmd0aCwgbWVudGlvblV1aWQgfSkgPT4ge1xuICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgc3RhcnQgIT09IHVuZGVmaW5lZCAmJiBzdGFydCAhPT0gbnVsbCxcbiAgICAgICAgICAnUmVjZWl2ZWQgcXVvdGUgd2l0aCBhIGJvZHlSYW5nZS5zdGFydCA9PSBudWxsJ1xuICAgICAgICApO1xuICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgbGVuZ3RoICE9PSB1bmRlZmluZWQgJiYgbGVuZ3RoICE9PSBudWxsLFxuICAgICAgICAgICdSZWNlaXZlZCBxdW90ZSB3aXRoIGEgYm9keVJhbmdlLmxlbmd0aCA9PSBudWxsJ1xuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RhcnQsXG4gICAgICAgICAgbGVuZ3RoLFxuICAgICAgICAgIG1lbnRpb25VdWlkOiBkcm9wTnVsbChtZW50aW9uVXVpZCksXG4gICAgICAgIH07XG4gICAgICB9KSxcblxuICAgICAgLy8gSnVzdCBwbGFjZWhvbGRlciB2YWx1ZXMgZm9yIHRoZSBmaWVsZHNcbiAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgaXNHaWZ0QmFkZ2U6IHF1b3RlLnR5cGUgPT09IFByb3RvLkRhdGFNZXNzYWdlLlF1b3RlLlR5cGUuR0lGVF9CQURHRSxcbiAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgbWVzc2FnZUlkOiAnJyxcbiAgICB9O1xuXG4gICAgY29uc3QgaW5NZW1vcnlNZXNzYWdlcyA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5maWx0ZXJCeVNlbnRBdChpZCk7XG4gICAgY29uc3QgbWF0Y2hpbmdNZXNzYWdlID0gZmluZChpbk1lbW9yeU1lc3NhZ2VzLCBpdGVtID0+XG4gICAgICBpc1F1b3RlQU1hdGNoKGl0ZW0uYXR0cmlidXRlcywgY29udmVyc2F0aW9uSWQsIHJlc3VsdClcbiAgICApO1xuXG4gICAgbGV0IHF1ZXJ5TWVzc2FnZTogdW5kZWZpbmVkIHwgTWVzc2FnZU1vZGVsO1xuXG4gICAgaWYgKG1hdGNoaW5nTWVzc2FnZSkge1xuICAgICAgcXVlcnlNZXNzYWdlID0gbWF0Y2hpbmdNZXNzYWdlO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbygnY29weUZyb21RdW90ZWRNZXNzYWdlOiBkYiBsb29rdXAgbmVlZGVkJywgaWQpO1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuZ2V0TWVzc2FnZXNCeVNlbnRBdChpZCk7XG4gICAgICBjb25zdCBmb3VuZCA9IG1lc3NhZ2VzLmZpbmQoaXRlbSA9PlxuICAgICAgICBpc1F1b3RlQU1hdGNoKGl0ZW0sIGNvbnZlcnNhdGlvbklkLCByZXN1bHQpXG4gICAgICApO1xuXG4gICAgICBpZiAoIWZvdW5kKSB7XG4gICAgICAgIHJlc3VsdC5yZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kID0gdHJ1ZTtcbiAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgIH1cblxuICAgICAgcXVlcnlNZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLnJlZ2lzdGVyKGZvdW5kLmlkLCBmb3VuZCk7XG4gICAgfVxuXG4gICAgaWYgKHF1ZXJ5TWVzc2FnZSkge1xuICAgICAgYXdhaXQgdGhpcy5jb3B5UXVvdGVDb250ZW50RnJvbU9yaWdpbmFsKHF1ZXJ5TWVzc2FnZSwgcmVzdWx0KTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgYXN5bmMgY29weVF1b3RlQ29udGVudEZyb21PcmlnaW5hbChcbiAgICBvcmlnaW5hbE1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCxcbiAgICBxdW90ZTogUXVvdGVkTWVzc2FnZVR5cGVcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBhdHRhY2htZW50cyB9ID0gcXVvdGU7XG4gICAgY29uc3QgZmlyc3RBdHRhY2htZW50ID0gYXR0YWNobWVudHMgPyBhdHRhY2htZW50c1swXSA6IHVuZGVmaW5lZDtcblxuICAgIGlmIChpc1RhcFRvVmlldyhvcmlnaW5hbE1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgcXVvdGUudGV4dCA9IHVuZGVmaW5lZDtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgcXVvdGUuYXR0YWNobWVudHMgPSBbXG4gICAgICAgIHtcbiAgICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL2pwZWcnLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgcXVvdGUuaXNWaWV3T25jZSA9IHRydWU7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc01lc3NhZ2VBR2lmdEJhZGdlID0gaXNHaWZ0QmFkZ2Uob3JpZ2luYWxNZXNzYWdlLmF0dHJpYnV0ZXMpO1xuICAgIGlmIChpc01lc3NhZ2VBR2lmdEJhZGdlICE9PSBxdW90ZS5pc0dpZnRCYWRnZSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGBjb3B5UXVvdGVDb250ZW50RnJvbU9yaWdpbmFsOiBRdW90ZS5pc0dpZnRCYWRnZTogJHtxdW90ZS5pc0dpZnRCYWRnZX0sIGlzR2lmdEJhZGdlKG1lc3NhZ2UpOiAke2lzTWVzc2FnZUFHaWZ0QmFkZ2V9YFxuICAgICAgKTtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgcXVvdGUuaXNHaWZ0QmFkZ2UgPSBpc01lc3NhZ2VBR2lmdEJhZGdlO1xuICAgIH1cbiAgICBpZiAoaXNNZXNzYWdlQUdpZnRCYWRnZSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBxdW90ZS50ZXh0ID0gdW5kZWZpbmVkO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICBxdW90ZS5hdHRhY2htZW50cyA9IFtdO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgcXVvdGUuaXNWaWV3T25jZSA9IGZhbHNlO1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgcXVvdGUudGV4dCA9IG9yaWdpbmFsTWVzc2FnZS5nZXQoJ2JvZHknKTtcbiAgICBpZiAoZmlyc3RBdHRhY2htZW50KSB7XG4gICAgICBmaXJzdEF0dGFjaG1lbnQudGh1bWJuYWlsID0gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChcbiAgICAgICFmaXJzdEF0dGFjaG1lbnQgfHxcbiAgICAgICFmaXJzdEF0dGFjaG1lbnQuY29udGVudFR5cGUgfHxcbiAgICAgICghR29vZ2xlQ2hyb21lLmlzSW1hZ2VUeXBlU3VwcG9ydGVkKFxuICAgICAgICBzdHJpbmdUb01JTUVUeXBlKGZpcnN0QXR0YWNobWVudC5jb250ZW50VHlwZSlcbiAgICAgICkgJiZcbiAgICAgICAgIUdvb2dsZUNocm9tZS5pc1ZpZGVvVHlwZVN1cHBvcnRlZChcbiAgICAgICAgICBzdHJpbmdUb01JTUVUeXBlKGZpcnN0QXR0YWNobWVudC5jb250ZW50VHlwZSlcbiAgICAgICAgKSlcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgY29uc3Qgc2NoZW1hVmVyc2lvbiA9IG9yaWdpbmFsTWVzc2FnZS5nZXQoJ3NjaGVtYVZlcnNpb24nKTtcbiAgICAgIGlmIChcbiAgICAgICAgc2NoZW1hVmVyc2lvbiAmJlxuICAgICAgICBzY2hlbWFWZXJzaW9uIDwgVHlwZWRNZXNzYWdlLlZFUlNJT05fTkVFREVEX0ZPUl9ESVNQTEFZXG4gICAgICApIHtcbiAgICAgICAgY29uc3QgdXBncmFkZWRNZXNzYWdlID0gYXdhaXQgdXBncmFkZU1lc3NhZ2VTY2hlbWEoXG4gICAgICAgICAgb3JpZ2luYWxNZXNzYWdlLmF0dHJpYnV0ZXNcbiAgICAgICAgKTtcbiAgICAgICAgb3JpZ2luYWxNZXNzYWdlLnNldCh1cGdyYWRlZE1lc3NhZ2UpO1xuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodXBncmFkZWRNZXNzYWdlLCB7XG4gICAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ1Byb2JsZW0gdXBncmFkaW5nIG1lc3NhZ2UgcXVvdGVkIG1lc3NhZ2UgZnJvbSBkYXRhYmFzZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnlBdHRhY2htZW50cyA9IG9yaWdpbmFsTWVzc2FnZS5nZXQoJ2F0dGFjaG1lbnRzJykgfHwgW107XG4gICAgaWYgKHF1ZXJ5QXR0YWNobWVudHMubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcXVlcnlGaXJzdCA9IHF1ZXJ5QXR0YWNobWVudHNbMF07XG4gICAgICBjb25zdCB7IHRodW1ibmFpbCB9ID0gcXVlcnlGaXJzdDtcblxuICAgICAgaWYgKHRodW1ibmFpbCAmJiB0aHVtYm5haWwucGF0aCkge1xuICAgICAgICBmaXJzdEF0dGFjaG1lbnQudGh1bWJuYWlsID0ge1xuICAgICAgICAgIC4uLnRodW1ibmFpbCxcbiAgICAgICAgICBjb3BpZWQ6IHRydWUsXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgcXVlcnlQcmV2aWV3ID0gb3JpZ2luYWxNZXNzYWdlLmdldCgncHJldmlldycpIHx8IFtdO1xuICAgIGlmIChxdWVyeVByZXZpZXcubGVuZ3RoID4gMCkge1xuICAgICAgY29uc3QgcXVlcnlGaXJzdCA9IHF1ZXJ5UHJldmlld1swXTtcbiAgICAgIGNvbnN0IHsgaW1hZ2UgfSA9IHF1ZXJ5Rmlyc3Q7XG5cbiAgICAgIGlmIChpbWFnZSAmJiBpbWFnZS5wYXRoKSB7XG4gICAgICAgIGZpcnN0QXR0YWNobWVudC50aHVtYm5haWwgPSB7XG4gICAgICAgICAgLi4uaW1hZ2UsXG4gICAgICAgICAgY29waWVkOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgIH1cblxuICAgIGNvbnN0IHN0aWNrZXIgPSBvcmlnaW5hbE1lc3NhZ2UuZ2V0KCdzdGlja2VyJyk7XG4gICAgaWYgKHN0aWNrZXIgJiYgc3RpY2tlci5kYXRhICYmIHN0aWNrZXIuZGF0YS5wYXRoKSB7XG4gICAgICBmaXJzdEF0dGFjaG1lbnQudGh1bWJuYWlsID0ge1xuICAgICAgICAuLi5zdGlja2VyLmRhdGEsXG4gICAgICAgIGNvcGllZDogdHJ1ZSxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgaGFuZGxlRGF0YU1lc3NhZ2UoXG4gICAgaW5pdGlhbE1lc3NhZ2U6IFByb2Nlc3NlZERhdGFNZXNzYWdlLFxuICAgIGNvbmZpcm06ICgpID0+IHZvaWQsXG4gICAgb3B0aW9uczogeyBkYXRhPzogU2VudEV2ZW50RGF0YSB9ID0ge31cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3QgeyBkYXRhIH0gPSBvcHRpb25zO1xuXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBpcyBjYWxsZWQgZnJvbSB0aGUgYmFja2dyb3VuZCBzY3JpcHQgaW4gYSBmZXcgc2NlbmFyaW9zOlxuICAgIC8vICAgMS4gb24gYW4gaW5jb21pbmcgbWVzc2FnZVxuICAgIC8vICAgMi4gb24gYSBzZW50IG1lc3NhZ2Ugc3luYydkIGZyb20gYW5vdGhlciBkZXZpY2VcbiAgICAvLyAgIDMuIGluIHJhcmUgY2FzZXMsIGFuIGluY29taW5nIG1lc3NhZ2UgY2FuIGJlIHJldHJpZWQsIHRob3VnaCBpdCB3aWxsXG4gICAgLy8gICAgICBzdGlsbCBnbyB0aHJvdWdoIG9uZSBvZiB0aGUgcHJldmlvdXMgdHdvIGNvZGVwYXRoc1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdGhpcy1hbGlhc1xuICAgIGNvbnN0IG1lc3NhZ2UgPSB0aGlzO1xuICAgIGNvbnN0IHNvdXJjZSA9IG1lc3NhZ2UuZ2V0KCdzb3VyY2UnKTtcbiAgICBjb25zdCBzb3VyY2VVdWlkID0gbWVzc2FnZS5nZXQoJ3NvdXJjZVV1aWQnKTtcbiAgICBjb25zdCB0eXBlID0gbWVzc2FnZS5nZXQoJ3R5cGUnKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IG1lc3NhZ2UuZ2V0KCdjb252ZXJzYXRpb25JZCcpO1xuICAgIGNvbnN0IEdST1VQX1RZUEVTID0gUHJvdG8uR3JvdXBDb250ZXh0LlR5cGU7XG5cbiAgICBjb25zdCBmcm9tQ29udGFjdCA9IGdldENvbnRhY3QodGhpcy5hdHRyaWJ1dGVzKTtcbiAgICBpZiAoZnJvbUNvbnRhY3QpIHtcbiAgICAgIGZyb21Db250YWN0LnNldFJlZ2lzdGVyZWQoKTtcbiAgICB9XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCkhO1xuICAgIGNvbnN0IGlkTG9nID0gY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpO1xuICAgIGF3YWl0IGNvbnZlcnNhdGlvbi5xdWV1ZUpvYignaGFuZGxlRGF0YU1lc3NhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGhhbmRsZURhdGFNZXNzYWdlLyR7aWRMb2d9OiBwcm9jZXNzc2luZyBtZXNzYWdlICR7bWVzc2FnZS5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICApO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSAmJlxuICAgICAgICAhaXNDb252ZXJzYXRpb25BY2NlcHRlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcywge1xuICAgICAgICAgIGlnbm9yZUVtcHR5Q29udm86IHRydWUsXG4gICAgICAgIH0pXG4gICAgICApIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGhhbmRsZURhdGFNZXNzYWdlLyR7aWRMb2d9OiBkcm9wcGluZyBzdG9yeSBmcm9tICFhY2NlcHRlZGAsXG4gICAgICAgICAgdGhpcy5nZXRTZW5kZXJJZGVudGlmaWVyKClcbiAgICAgICAgKTtcbiAgICAgICAgY29uZmlybSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIEZpcnN0LCBjaGVjayBmb3IgZHVwbGljYXRlcy4gSWYgd2UgZmluZCBvbmUsIHN0b3AgcHJvY2Vzc2luZyBoZXJlLlxuICAgICAgY29uc3QgaW5NZW1vcnlNZXNzYWdlID0gd2luZG93Lk1lc3NhZ2VDb250cm9sbGVyLmZpbmRCeVNlbmRlcihcbiAgICAgICAgdGhpcy5nZXRTZW5kZXJJZGVudGlmaWVyKClcbiAgICAgICk7XG4gICAgICBpZiAoaW5NZW1vcnlNZXNzYWdlKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBoYW5kbGVEYXRhTWVzc2FnZS8ke2lkTG9nfTogY2FjaGUgaGl0YCxcbiAgICAgICAgICB0aGlzLmdldFNlbmRlcklkZW50aWZpZXIoKVxuICAgICAgICApO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGhhbmRsZURhdGFNZXNzYWdlLyR7aWRMb2d9OiBkdXBsaWNhdGUgY2hlY2sgZGIgbG9va3VwIG5lZWRlZGAsXG4gICAgICAgICAgdGhpcy5nZXRTZW5kZXJJZGVudGlmaWVyKClcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGV4aXN0aW5nTWVzc2FnZSA9XG4gICAgICAgIGluTWVtb3J5TWVzc2FnZSB8fCAoYXdhaXQgZ2V0TWVzc2FnZUJ5U2VuZGVyKHRoaXMuYXR0cmlidXRlcykpO1xuICAgICAgY29uc3QgaXNVcGRhdGUgPSBCb29sZWFuKGRhdGEgJiYgZGF0YS5pc1JlY2lwaWVudFVwZGF0ZSk7XG5cbiAgICAgIGlmIChleGlzdGluZ01lc3NhZ2UgJiYgdHlwZSA9PT0gJ2luY29taW5nJykge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgaGFuZGxlRGF0YU1lc3NhZ2UvJHtpZExvZ306IFJlY2VpdmVkIGR1cGxpY2F0ZSBtZXNzYWdlYCxcbiAgICAgICAgICB0aGlzLmlkRm9yTG9nZ2luZygpXG4gICAgICAgICk7XG4gICAgICAgIGNvbmZpcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKHR5cGUgPT09ICdvdXRnb2luZycpIHtcbiAgICAgICAgaWYgKGlzVXBkYXRlICYmIGV4aXN0aW5nTWVzc2FnZSkge1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYGhhbmRsZURhdGFNZXNzYWdlLyR7aWRMb2d9OiBVcGRhdGluZyBtZXNzYWdlICR7bWVzc2FnZS5pZEZvckxvZ2dpbmcoKX0gd2l0aCByZWNlaXZlZCB0cmFuc2NyaXB0YFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCB0b1VwZGF0ZSA9IHdpbmRvdy5NZXNzYWdlQ29udHJvbGxlci5yZWdpc3RlcihcbiAgICAgICAgICAgIGV4aXN0aW5nTWVzc2FnZS5pZCxcbiAgICAgICAgICAgIGV4aXN0aW5nTWVzc2FnZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25zdCB1bmlkZW50aWZpZWREZWxpdmVyaWVzU2V0ID0gbmV3IFNldDxzdHJpbmc+KFxuICAgICAgICAgICAgdG9VcGRhdGUuZ2V0KCd1bmlkZW50aWZpZWREZWxpdmVyaWVzJykgPz8gW11cbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSB7XG4gICAgICAgICAgICAuLi4odG9VcGRhdGUuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge30pLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICBjb25zdCB1bmlkZW50aWZpZWRTdGF0dXM6IEFycmF5PFByb2Nlc3NlZFVuaWRlbnRpZmllZERlbGl2ZXJ5U3RhdHVzPiA9XG4gICAgICAgICAgICBkYXRhICYmIEFycmF5LmlzQXJyYXkoZGF0YS51bmlkZW50aWZpZWRTdGF0dXMpXG4gICAgICAgICAgICAgID8gZGF0YS51bmlkZW50aWZpZWRTdGF0dXNcbiAgICAgICAgICAgICAgOiBbXTtcblxuICAgICAgICAgIHVuaWRlbnRpZmllZFN0YXR1cy5mb3JFYWNoKFxuICAgICAgICAgICAgKHsgZGVzdGluYXRpb25VdWlkLCBkZXN0aW5hdGlvbiwgdW5pZGVudGlmaWVkIH0pID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgaWRlbnRpZmllciA9IGRlc3RpbmF0aW9uVXVpZCB8fCBkZXN0aW5hdGlvbjtcbiAgICAgICAgICAgICAgaWYgKCFpZGVudGlmaWVyKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgZGVzdGluYXRpb25Db252ZXJzYXRpb25JZCA9XG4gICAgICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgICAgICAgICAgICB1dWlkOiBkZXN0aW5hdGlvblV1aWQsXG4gICAgICAgICAgICAgICAgICBlMTY0OiBkZXN0aW5hdGlvbixcbiAgICAgICAgICAgICAgICAgIGhpZ2hUcnVzdDogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIHJlYXNvbjogYGhhbmRsZURhdGFNZXNzYWdlKCR7aW5pdGlhbE1lc3NhZ2UudGltZXN0YW1wfSlgLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICBpZiAoIWRlc3RpbmF0aW9uQ29udmVyc2F0aW9uSWQpIHtcbiAgICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCB1cGRhdGVkQXQ6IG51bWJlciA9XG4gICAgICAgICAgICAgICAgZGF0YSAmJiBpc05vcm1hbE51bWJlcihkYXRhLnRpbWVzdGFtcClcbiAgICAgICAgICAgICAgICAgID8gZGF0YS50aW1lc3RhbXBcbiAgICAgICAgICAgICAgICAgIDogRGF0ZS5ub3coKTtcblxuICAgICAgICAgICAgICBjb25zdCBwcmV2aW91c1NlbmRTdGF0ZSA9IGdldE93bihcbiAgICAgICAgICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uQ29udmVyc2F0aW9uSWRcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFtkZXN0aW5hdGlvbkNvbnZlcnNhdGlvbklkXSA9XG4gICAgICAgICAgICAgICAgcHJldmlvdXNTZW5kU3RhdGVcbiAgICAgICAgICAgICAgICAgID8gc2VuZFN0YXRlUmVkdWNlcihwcmV2aW91c1NlbmRTdGF0ZSwge1xuICAgICAgICAgICAgICAgICAgICAgIHR5cGU6IFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICB9KVxuICAgICAgICAgICAgICAgICAgOiB7XG4gICAgICAgICAgICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICAgICAgICAgICAgdXBkYXRlZEF0LFxuICAgICAgICAgICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICAgIGlmICh1bmlkZW50aWZpZWQpIHtcbiAgICAgICAgICAgICAgICB1bmlkZW50aWZpZWREZWxpdmVyaWVzU2V0LmFkZChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICB0b1VwZGF0ZS5zZXQoe1xuICAgICAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgIHVuaWRlbnRpZmllZERlbGl2ZXJpZXM6IFsuLi51bmlkZW50aWZpZWREZWxpdmVyaWVzU2V0XSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodG9VcGRhdGUuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbmZpcm0oKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICBgaGFuZGxlRGF0YU1lc3NhZ2UvJHtpZExvZ306IFJlY2VpdmVkIHVwZGF0ZSB0cmFuc2NyaXB0LCBidXQgbm8gZXhpc3RpbmcgZW50cnkgZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfS4gRHJvcHBpbmcuYFxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBjb25maXJtKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIGlmIChleGlzdGluZ01lc3NhZ2UpIHtcbiAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgIGBoYW5kbGVEYXRhTWVzc2FnZS8ke2lkTG9nfTogUmVjZWl2ZWQgZHVwbGljYXRlIHRyYW5zY3JpcHQgZm9yIG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfSwgYnV0IGl0IHdhcyBub3QgYW4gdXBkYXRlIHRyYW5zY3JpcHQuIERyb3BwaW5nLmBcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgY29uZmlybSgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBHcm91cFYyXG5cbiAgICAgIGlmIChpbml0aWFsTWVzc2FnZS5ncm91cFYyKSB7XG4gICAgICAgIGlmIChpc0dyb3VwVjEoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgLy8gSWYgd2UgcmVjZWl2ZWQgYSBHcm91cFYyIG1lc3NhZ2UgaW4gYSBHcm91cFYxIGdyb3VwLCB3ZSBtaWdyYXRlIVxuXG4gICAgICAgICAgY29uc3QgeyByZXZpc2lvbiwgZ3JvdXBDaGFuZ2UgfSA9IGluaXRpYWxNZXNzYWdlLmdyb3VwVjI7XG4gICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5Hcm91cHMucmVzcG9uZFRvR3JvdXBWMk1pZ3JhdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgICAgICBncm91cENoYW5nZTogZ3JvdXBDaGFuZ2VcbiAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICBiYXNlNjQ6IGdyb3VwQ2hhbmdlLFxuICAgICAgICAgICAgICAgICAgaXNUcnVzdGVkOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgbmV3UmV2aXNpb246IHJldmlzaW9uLFxuICAgICAgICAgICAgcmVjZWl2ZWRBdDogbWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0JyksXG4gICAgICAgICAgICBzZW50QXQ6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgICAgaW5pdGlhbE1lc3NhZ2UuZ3JvdXBWMi5tYXN0ZXJLZXkgJiZcbiAgICAgICAgICBpbml0aWFsTWVzc2FnZS5ncm91cFYyLnNlY3JldFBhcmFtcyAmJlxuICAgICAgICAgIGluaXRpYWxNZXNzYWdlLmdyb3VwVjIucHVibGljUGFyYW1zXG4gICAgICAgICkge1xuICAgICAgICAgIC8vIFJlcGFpciBjb3JlIEdyb3VwVjIgZGF0YSBpZiBuZWVkZWRcbiAgICAgICAgICBhd2FpdCBjb252ZXJzYXRpb24ubWF5YmVSZXBhaXJHcm91cFYyKHtcbiAgICAgICAgICAgIG1hc3RlcktleTogaW5pdGlhbE1lc3NhZ2UuZ3JvdXBWMi5tYXN0ZXJLZXksXG4gICAgICAgICAgICBzZWNyZXRQYXJhbXM6IGluaXRpYWxNZXNzYWdlLmdyb3VwVjIuc2VjcmV0UGFyYW1zLFxuICAgICAgICAgICAgcHVibGljUGFyYW1zOiBpbml0aWFsTWVzc2FnZS5ncm91cFYyLnB1YmxpY1BhcmFtcyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFN0YW5kYXJkIEdyb3VwVjIgbW9kaWZpY2F0aW9uIGNvZGVwYXRoXG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdSZXZpc2lvbiA9IGNvbnZlcnNhdGlvbi5nZXQoJ3JldmlzaW9uJyk7XG4gICAgICAgICAgY29uc3QgaXNWMkdyb3VwVXBkYXRlID1cbiAgICAgICAgICAgIGluaXRpYWxNZXNzYWdlLmdyb3VwVjIgJiZcbiAgICAgICAgICAgIF8uaXNOdW1iZXIoaW5pdGlhbE1lc3NhZ2UuZ3JvdXBWMi5yZXZpc2lvbikgJiZcbiAgICAgICAgICAgICghXy5pc051bWJlcihleGlzdGluZ1JldmlzaW9uKSB8fFxuICAgICAgICAgICAgICBpbml0aWFsTWVzc2FnZS5ncm91cFYyLnJldmlzaW9uID4gZXhpc3RpbmdSZXZpc2lvbik7XG5cbiAgICAgICAgICBpZiAoaXNWMkdyb3VwVXBkYXRlICYmIGluaXRpYWxNZXNzYWdlLmdyb3VwVjIpIHtcbiAgICAgICAgICAgIGNvbnN0IHsgcmV2aXNpb24sIGdyb3VwQ2hhbmdlIH0gPSBpbml0aWFsTWVzc2FnZS5ncm91cFYyO1xuICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5Hcm91cHMubWF5YmVVcGRhdGVHcm91cCh7XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICAgICAgICAgIGdyb3VwQ2hhbmdlOiBncm91cENoYW5nZVxuICAgICAgICAgICAgICAgICAgPyB7XG4gICAgICAgICAgICAgICAgICAgICAgYmFzZTY0OiBncm91cENoYW5nZSxcbiAgICAgICAgICAgICAgICAgICAgICBpc1RydXN0ZWQ6IGZhbHNlLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBuZXdSZXZpc2lvbjogcmV2aXNpb24sXG4gICAgICAgICAgICAgICAgcmVjZWl2ZWRBdDogbWVzc2FnZS5nZXQoJ3JlY2VpdmVkX2F0JyksXG4gICAgICAgICAgICAgICAgc2VudEF0OiBtZXNzYWdlLmdldCgnc2VudF9hdCcpLFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAgICAgICAgIGNvbnN0IGVycm9yVGV4dCA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgICAgIGBoYW5kbGVEYXRhTWVzc2FnZS8ke2lkTG9nfTogRmFpbGVkIHRvIHByb2Nlc3MgZ3JvdXAgdXBkYXRlIGFzIHBhcnQgb2YgbWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9OiAke2Vycm9yVGV4dH1gXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIHRocm93IGVycm9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkKCkhO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICAgIGNvbnN0IHNlbmRlcklkID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZW5zdXJlQ29udGFjdElkcyh7XG4gICAgICAgIGUxNjQ6IHNvdXJjZSxcbiAgICAgICAgdXVpZDogc291cmNlVXVpZCxcbiAgICAgIH0pITtcbiAgICAgIGNvbnN0IGhhc0dyb3VwVjJQcm9wID0gQm9vbGVhbihpbml0aWFsTWVzc2FnZS5ncm91cFYyKTtcbiAgICAgIGNvbnN0IGlzVjFHcm91cFVwZGF0ZSA9XG4gICAgICAgIGluaXRpYWxNZXNzYWdlLmdyb3VwICYmXG4gICAgICAgIGluaXRpYWxNZXNzYWdlLmdyb3VwLnR5cGUgIT09IFByb3RvLkdyb3VwQ29udGV4dC5UeXBlLkRFTElWRVI7XG5cbiAgICAgIC8vIERyb3AgaWYgZnJvbSBibG9ja2VkIHVzZXIuIE9ubHkgR3JvdXBWMiBtZXNzYWdlcyBzaG91bGQgbmVlZCB0byBiZSBkcm9wcGVkIGhlcmUuXG4gICAgICBjb25zdCBpc0Jsb2NrZWQgPVxuICAgICAgICAoc291cmNlICYmIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuaXNCbG9ja2VkKHNvdXJjZSkpIHx8XG4gICAgICAgIChzb3VyY2VVdWlkICYmIHdpbmRvdy5zdG9yYWdlLmJsb2NrZWQuaXNVdWlkQmxvY2tlZChzb3VyY2VVdWlkKSk7XG4gICAgICBpZiAoaXNCbG9ja2VkKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBoYW5kbGVEYXRhTWVzc2FnZS8ke2lkTG9nfTogRHJvcHBpbmcgbWVzc2FnZSBmcm9tIGJsb2NrZWQgc2VuZGVyLiBoYXNHcm91cFYyUHJvcDogJHtoYXNHcm91cFYyUHJvcH1gXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uZmlybSgpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIERyb3AgYW4gaW5jb21pbmcgR3JvdXBWMiBtZXNzYWdlIGlmIHdlIG9yIHRoZSBzZW5kZXIgYXJlIG5vdCBwYXJ0IG9mIHRoZSBncm91cFxuICAgICAgLy8gICBhZnRlciBhcHBseWluZyB0aGUgbWVzc2FnZSdzIGFzc29jaWF0ZWQgZ3JvdXAgY2hhbmdlcy5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZSA9PT0gJ2luY29taW5nJyAmJlxuICAgICAgICAhaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgIGhhc0dyb3VwVjJQcm9wICYmXG4gICAgICAgIChjb252ZXJzYXRpb24uZ2V0KCdsZWZ0JykgfHxcbiAgICAgICAgICAhY29udmVyc2F0aW9uLmhhc01lbWJlcihvdXJDb252ZXJzYXRpb25JZCkgfHxcbiAgICAgICAgICAhY29udmVyc2F0aW9uLmhhc01lbWJlcihzZW5kZXJJZCkpXG4gICAgICApIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYFJlY2VpdmVkIG1lc3NhZ2UgZGVzdGluZWQgZm9yIGdyb3VwICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSwgd2hpY2ggd2Ugb3IgdGhlIHNlbmRlciBhcmUgbm90IGEgcGFydCBvZi4gRHJvcHBpbmcuYFxuICAgICAgICApO1xuICAgICAgICBjb25maXJtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gV2UgZHJvcCBpbmNvbWluZyBtZXNzYWdlcyBmb3IgdjEgZ3JvdXBzIHdlIGFscmVhZHkga25vdyBhYm91dCwgd2hpY2ggd2UncmUgbm90XG4gICAgICAvLyAgIGEgcGFydCBvZiwgZXhjZXB0IGZvciBncm91cCB1cGRhdGVzLiBCZWNhdXNlIGdyb3VwIHYxIHVwZGF0ZXMgaGF2ZW4ndCBiZWVuXG4gICAgICAvLyAgIGFwcGxpZWQgYnkgdGhpcyBwb2ludC5cbiAgICAgIC8vIE5vdGU6IGlmIHdlIGhhdmUgbm8gaW5mb3JtYXRpb24gYWJvdXQgYSBncm91cCBhdCBhbGwsIHdlIHdpbGwgYWNjZXB0IHRob3NlXG4gICAgICAvLyAgIG1lc3NhZ2VzLiBXZSBkZXRlY3QgdGhhdCB2aWEgYSBtaXNzaW5nICdtZW1iZXJzJyBmaWVsZC5cbiAgICAgIGlmIChcbiAgICAgICAgdHlwZSA9PT0gJ2luY29taW5nJyAmJlxuICAgICAgICAhaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgICFoYXNHcm91cFYyUHJvcCAmJlxuICAgICAgICAhaXNWMUdyb3VwVXBkYXRlICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ21lbWJlcnMnKSAmJlxuICAgICAgICAoY29udmVyc2F0aW9uLmdldCgnbGVmdCcpIHx8ICFjb252ZXJzYXRpb24uaGFzTWVtYmVyKG91ckNvbnZlcnNhdGlvbklkKSlcbiAgICAgICkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgUmVjZWl2ZWQgbWVzc2FnZSBkZXN0aW5lZCBmb3IgZ3JvdXAgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9LCB3aGljaCB3ZSdyZSBub3QgYSBwYXJ0IG9mLiBEcm9wcGluZy5gXG4gICAgICAgICk7XG4gICAgICAgIGNvbmZpcm0oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBCZWNhdXNlIEdyb3VwVjEgbWVzc2FnZXMgY2FuIG5vdyBiZSBtdWx0aXBsZXhlZCBpbnRvIEdyb3VwVjIgY29udmVyc2F0aW9ucywgd2VcbiAgICAgIC8vICAgZHJvcCBHcm91cFYxIHVwZGF0ZXMgaW4gR3JvdXBWMiBncm91cHMuXG4gICAgICBpZiAoaXNWMUdyb3VwVXBkYXRlICYmIGlzR3JvdXBWMihjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYFJlY2VpdmVkIEdyb3VwVjEgdXBkYXRlIGluIEdyb3VwVjIgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfS4gRHJvcHBpbmcuYFxuICAgICAgICApO1xuICAgICAgICBjb25maXJtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgLy8gRHJvcCBpbmNvbWluZyBtZXNzYWdlcyB0byBhbm5vdW5jZW1lbnQgb25seSBncm91cHMgd2hlcmUgc2VuZGVyIGlzIG5vdCBhZG1pblxuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdhbm5vdW5jZW1lbnRzT25seScpICYmXG4gICAgICAgICFjb252ZXJzYXRpb24uaXNBZG1pbihzZW5kZXJJZClcbiAgICAgICkge1xuICAgICAgICBjb25maXJtKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZUlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgICAgIC8vIFNlbmQgZGVsaXZlcnkgcmVjZWlwdHMsIGJ1dCBvbmx5IGZvciBpbmNvbWluZyBzZWFsZWQgc2VuZGVyIG1lc3NhZ2VzXG4gICAgICAvLyBhbmQgbm90IGZvciBtZXNzYWdlcyBmcm9tIHVuYWNjZXB0ZWQgY29udmVyc2F0aW9uc1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlID09PSAnaW5jb21pbmcnICYmXG4gICAgICAgIHRoaXMuZ2V0KCd1bmlkZW50aWZpZWREZWxpdmVyeVJlY2VpdmVkJykgJiZcbiAgICAgICAgIWhhc0Vycm9ycyh0aGlzLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgIGNvbnZlcnNhdGlvbi5nZXRBY2NlcHRlZCgpXG4gICAgICApIHtcbiAgICAgICAgLy8gTm90ZTogV2UgYm90aCBxdWV1ZSBhbmQgYmF0Y2ggYmVjYXVzZSB3ZSB3YW50IHRvIHdhaXQgdW50aWwgd2UgYXJlIGRvbmVcbiAgICAgICAgLy8gICBwcm9jZXNzaW5nIGluY29taW5nIG1lc3NhZ2VzIHRvIHN0YXJ0IHNlbmRpbmcgb3V0Z29pbmcgZGVsaXZlcnkgcmVjZWlwdHMuXG4gICAgICAgIC8vICAgVGhlIHF1ZXVlIGNhbiBiZSBwYXVzZWQgZWFzaWx5LlxuICAgICAgICB3aW5kb3cuV2hpc3Blci5kZWxpdmVyeVJlY2VpcHRRdWV1ZS5hZGQoKCkgPT4ge1xuICAgICAgICAgIHdpbmRvdy5XaGlzcGVyLmRlbGl2ZXJ5UmVjZWlwdEJhdGNoZXIuYWRkKHtcbiAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgIHNlbmRlckUxNjQ6IHNvdXJjZSxcbiAgICAgICAgICAgIHNlbmRlclV1aWQ6IHNvdXJjZVV1aWQsXG4gICAgICAgICAgICB0aW1lc3RhbXA6IHRoaXMuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBbcXVvdGUsIHN0b3J5UXVvdGVdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICB0aGlzLmNvcHlGcm9tUXVvdGVkTWVzc2FnZShpbml0aWFsTWVzc2FnZS5xdW90ZSwgY29udmVyc2F0aW9uLmlkKSxcbiAgICAgICAgZmluZFN0b3J5TWVzc2FnZShjb252ZXJzYXRpb24uaWQsIGluaXRpYWxNZXNzYWdlLnN0b3J5Q29udGV4dCksXG4gICAgICBdKTtcblxuICAgICAgY29uc3Qgd2l0aFF1b3RlUmVmZXJlbmNlID0ge1xuICAgICAgICAuLi5tZXNzYWdlLmF0dHJpYnV0ZXMsXG4gICAgICAgIC4uLmluaXRpYWxNZXNzYWdlLFxuICAgICAgICBxdW90ZSxcbiAgICAgICAgc3RvcnlJZDogc3RvcnlRdW90ZT8uaWQsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBkYXRhTWVzc2FnZSA9IGF3YWl0IHVwZ3JhZGVNZXNzYWdlU2NoZW1hKHdpdGhRdW90ZVJlZmVyZW5jZSk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IG5vdyA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xuXG4gICAgICAgIGNvbnN0IHVybHMgPSBMaW5rUHJldmlldy5maW5kTGlua3MoZGF0YU1lc3NhZ2UuYm9keSB8fCAnJyk7XG4gICAgICAgIGNvbnN0IGluY29taW5nUHJldmlldyA9IGRhdGFNZXNzYWdlLnByZXZpZXcgfHwgW107XG4gICAgICAgIGNvbnN0IHByZXZpZXcgPSBpbmNvbWluZ1ByZXZpZXcuZmlsdGVyKFxuICAgICAgICAgIChpdGVtOiB0eXBlb2Ygd2luZG93LldoYXRJc1RoaXMpID0+XG4gICAgICAgICAgICAoaXRlbS5pbWFnZSB8fCBpdGVtLnRpdGxlKSAmJlxuICAgICAgICAgICAgdXJscy5pbmNsdWRlcyhpdGVtLnVybCkgJiZcbiAgICAgICAgICAgIExpbmtQcmV2aWV3LnNob3VsZFByZXZpZXdIcmVmKGl0ZW0udXJsKVxuICAgICAgICApO1xuICAgICAgICBpZiAocHJldmlldy5sZW5ndGggPCBpbmNvbWluZ1ByZXZpZXcubGVuZ3RoKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfTogRWxpbWluYXRlZCAke1xuICAgICAgICAgICAgICBwcmV2aWV3Lmxlbmd0aCAtIGluY29taW5nUHJldmlldy5sZW5ndGhcbiAgICAgICAgICAgIH0gcHJldmlld3Mgd2l0aCBpbnZhbGlkIHVybHMnYFxuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICBtZXNzYWdlLnNldCh7XG4gICAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgICBhdHRhY2htZW50czogZGF0YU1lc3NhZ2UuYXR0YWNobWVudHMsXG4gICAgICAgICAgYm9keTogZGF0YU1lc3NhZ2UuYm9keSxcbiAgICAgICAgICBib2R5UmFuZ2VzOiBkYXRhTWVzc2FnZS5ib2R5UmFuZ2VzLFxuICAgICAgICAgIGNvbnRhY3Q6IGRhdGFNZXNzYWdlLmNvbnRhY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICBkZWNyeXB0ZWRfYXQ6IG5vdyxcbiAgICAgICAgICBlcnJvcnM6IFtdLFxuICAgICAgICAgIGZsYWdzOiBkYXRhTWVzc2FnZS5mbGFncyxcbiAgICAgICAgICBnaWZ0QmFkZ2U6IGluaXRpYWxNZXNzYWdlLmdpZnRCYWRnZSxcbiAgICAgICAgICBoYXNBdHRhY2htZW50czogZGF0YU1lc3NhZ2UuaGFzQXR0YWNobWVudHMsXG4gICAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzOiBkYXRhTWVzc2FnZS5oYXNGaWxlQXR0YWNobWVudHMsXG4gICAgICAgICAgaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50czogZGF0YU1lc3NhZ2UuaGFzVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBCb29sZWFuKGRhdGFNZXNzYWdlLmlzVmlld09uY2UpLFxuICAgICAgICAgIHByZXZpZXcsXG4gICAgICAgICAgcmVxdWlyZWRQcm90b2NvbFZlcnNpb246XG4gICAgICAgICAgICBkYXRhTWVzc2FnZS5yZXF1aXJlZFByb3RvY29sVmVyc2lvbiB8fFxuICAgICAgICAgICAgdGhpcy5JTklUSUFMX1BST1RPQ09MX1ZFUlNJT04sXG4gICAgICAgICAgc3VwcG9ydGVkVmVyc2lvbkF0UmVjZWl2ZTogdGhpcy5DVVJSRU5UX1BST1RPQ09MX1ZFUlNJT04sXG4gICAgICAgICAgcXVvdGU6IGRhdGFNZXNzYWdlLnF1b3RlLFxuICAgICAgICAgIHNjaGVtYVZlcnNpb246IGRhdGFNZXNzYWdlLnNjaGVtYVZlcnNpb24sXG4gICAgICAgICAgc3RpY2tlcjogZGF0YU1lc3NhZ2Uuc3RpY2tlcixcbiAgICAgICAgICBzdG9yeUlkOiBkYXRhTWVzc2FnZS5zdG9yeUlkLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBpc1N1cHBvcnRlZCA9ICFpc1Vuc3VwcG9ydGVkTWVzc2FnZShtZXNzYWdlLmF0dHJpYnV0ZXMpO1xuICAgICAgICBpZiAoIWlzU3VwcG9ydGVkKSB7XG4gICAgICAgICAgYXdhaXQgbWVzc2FnZS5lcmFzZUNvbnRlbnRzKCk7XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoaXNTdXBwb3J0ZWQpIHtcbiAgICAgICAgICBsZXQgYXR0cmlidXRlcyA9IHtcbiAgICAgICAgICAgIC4uLmNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLFxuICAgICAgICAgIH07XG5cbiAgICAgICAgICAvLyBHcm91cFYxXG4gICAgICAgICAgaWYgKCFoYXNHcm91cFYyUHJvcCAmJiBpbml0aWFsTWVzc2FnZS5ncm91cCkge1xuICAgICAgICAgICAgY29uc3QgcGVuZGluZ0dyb3VwVXBkYXRlOiBHcm91cFYxVXBkYXRlID0ge307XG5cbiAgICAgICAgICAgIGNvbnN0IG1lbWJlckNvbnZlcnNhdGlvbnM6IEFycmF5PENvbnZlcnNhdGlvbk1vZGVsPiA9XG4gICAgICAgICAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICAgICAgICAgIGluaXRpYWxNZXNzYWdlLmdyb3VwLm1lbWJlcnNFMTY0Lm1hcCgoZTE2NDogc3RyaW5nKSA9PlxuICAgICAgICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGVBbmRXYWl0KFxuICAgICAgICAgICAgICAgICAgICBlMTY0LFxuICAgICAgICAgICAgICAgICAgICAncHJpdmF0ZSdcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICBjb25zdCBtZW1iZXJzID0gbWVtYmVyQ29udmVyc2F0aW9ucy5tYXAoYyA9PiBjLmdldCgnaWQnKSk7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzID0ge1xuICAgICAgICAgICAgICAuLi5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICAgICAgICBncm91cElkOiBpbml0aWFsTWVzc2FnZS5ncm91cC5pZCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgICBpZiAoaW5pdGlhbE1lc3NhZ2UuZ3JvdXAudHlwZSA9PT0gR1JPVVBfVFlQRVMuVVBEQVRFKSB7XG4gICAgICAgICAgICAgIGF0dHJpYnV0ZXMgPSB7XG4gICAgICAgICAgICAgICAgLi4uYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICBuYW1lOiBpbml0aWFsTWVzc2FnZS5ncm91cC5uYW1lLFxuICAgICAgICAgICAgICAgIG1lbWJlcnM6IF8udW5pb24obWVtYmVycywgY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpKSxcbiAgICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgICBpZiAoaW5pdGlhbE1lc3NhZ2UuZ3JvdXAubmFtZSAhPT0gY29udmVyc2F0aW9uLmdldCgnbmFtZScpKSB7XG4gICAgICAgICAgICAgICAgcGVuZGluZ0dyb3VwVXBkYXRlLm5hbWUgPSBpbml0aWFsTWVzc2FnZS5ncm91cC5uYW1lO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgY29uc3QgYXZhdGFyQXR0YWNobWVudCA9IGluaXRpYWxNZXNzYWdlLmdyb3VwLmF2YXRhcjtcblxuICAgICAgICAgICAgICBsZXQgZG93bmxvYWRlZEF2YXRhcjtcbiAgICAgICAgICAgICAgbGV0IGhhc2g7XG4gICAgICAgICAgICAgIGlmIChhdmF0YXJBdHRhY2htZW50KSB7XG4gICAgICAgICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgICAgICAgIGRvd25sb2FkZWRBdmF0YXIgPSBhd2FpdCBkb3dubG9hZEF0dGFjaG1lbnQoYXZhdGFyQXR0YWNobWVudCk7XG5cbiAgICAgICAgICAgICAgICAgIGlmIChkb3dubG9hZGVkQXZhdGFyKSB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnN0IGxvYWRlZEF0dGFjaG1lbnQgPVxuICAgICAgICAgICAgICAgICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5sb2FkQXR0YWNobWVudERhdGEoXG4gICAgICAgICAgICAgICAgICAgICAgICBkb3dubG9hZGVkQXZhdGFyXG4gICAgICAgICAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICAgICAgICBoYXNoID0gY29tcHV0ZUhhc2gobG9hZGVkQXR0YWNobWVudC5kYXRhKTtcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgICAgICAgIGxvZy5pbmZvKCdoYW5kbGVEYXRhTWVzc2FnZTogZ3JvdXAgYXZhdGFyIGRvd25sb2FkIGZhaWxlZCcpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGV4aXN0aW5nQXZhdGFyID0gY29udmVyc2F0aW9uLmdldCgnYXZhdGFyJyk7XG5cbiAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgIC8vIEF2YXRhciBhZGRlZFxuICAgICAgICAgICAgICAgICghZXhpc3RpbmdBdmF0YXIgJiYgYXZhdGFyQXR0YWNobWVudCkgfHxcbiAgICAgICAgICAgICAgICAvLyBBdmF0YXIgY2hhbmdlZFxuICAgICAgICAgICAgICAgIChleGlzdGluZ0F2YXRhciAmJiBleGlzdGluZ0F2YXRhci5oYXNoICE9PSBoYXNoKSB8fFxuICAgICAgICAgICAgICAgIC8vIEF2YXRhciByZW1vdmVkXG4gICAgICAgICAgICAgICAgKGV4aXN0aW5nQXZhdGFyICYmICFhdmF0YXJBdHRhY2htZW50KVxuICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAvLyBSZW1vdmVzIGV4aXN0aW5nIGF2YXRhciBmcm9tIGRpc2tcbiAgICAgICAgICAgICAgICBpZiAoZXhpc3RpbmdBdmF0YXIgJiYgZXhpc3RpbmdBdmF0YXIucGF0aCkge1xuICAgICAgICAgICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLmRlbGV0ZUF0dGFjaG1lbnREYXRhKFxuICAgICAgICAgICAgICAgICAgICBleGlzdGluZ0F2YXRhci5wYXRoXG4gICAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIGxldCBhdmF0YXIgPSBudWxsO1xuICAgICAgICAgICAgICAgIGlmIChkb3dubG9hZGVkQXZhdGFyICYmIGF2YXRhckF0dGFjaG1lbnQgIT09IG51bGwpIHtcbiAgICAgICAgICAgICAgICAgIGNvbnN0IG9uRGlza0F0dGFjaG1lbnQgPVxuICAgICAgICAgICAgICAgICAgICBhd2FpdCBBdHRhY2htZW50Lm1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKGRvd25sb2FkZWRBdmF0YXIsIHtcbiAgICAgICAgICAgICAgICAgICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhOlxuICAgICAgICAgICAgICAgICAgICAgICAgd2luZG93LlNpZ25hbC5NaWdyYXRpb25zLndyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgICAgYXZhdGFyID0ge1xuICAgICAgICAgICAgICAgICAgICAuLi5vbkRpc2tBdHRhY2htZW50LFxuICAgICAgICAgICAgICAgICAgICBoYXNoLFxuICAgICAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmF2YXRhciA9IGF2YXRhcjtcblxuICAgICAgICAgICAgICAgIHBlbmRpbmdHcm91cFVwZGF0ZS5hdmF0YXJVcGRhdGVkID0gdHJ1ZTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAgICAgICAgICdoYW5kbGVEYXRhTWVzc2FnZTogR3JvdXAgYXZhdGFyIGhhc2ggbWF0Y2hlZDsgbm90IHJlcGxhY2luZyBncm91cCBhdmF0YXInXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGNvbnN0IGRpZmZlcmVuY2UgPSBfLmRpZmZlcmVuY2UoXG4gICAgICAgICAgICAgICAgbWVtYmVycyxcbiAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ21lbWJlcnMnKSFcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgaWYgKGRpZmZlcmVuY2UubGVuZ3RoID4gMCkge1xuICAgICAgICAgICAgICAgIC8vIEJlY2F1c2UgR3JvdXBWMSBncm91cHMgYXJlIGJhc2VkIG9uIGUxNjQgb25seVxuICAgICAgICAgICAgICAgIGNvbnN0IG1heWJlRTE2NHMgPSBtYXAoZGlmZmVyZW5jZSwgaWQgPT5cbiAgICAgICAgICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZCk/LmdldCgnZTE2NCcpXG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgICBjb25zdCBlMTY0cyA9IGZpbHRlcihtYXliZUUxNjRzLCBpc05vdE5pbCk7XG4gICAgICAgICAgICAgICAgcGVuZGluZ0dyb3VwVXBkYXRlLmpvaW5lZCA9IFsuLi5lMTY0c107XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ2xlZnQnKSkge1xuICAgICAgICAgICAgICAgIGxvZy53YXJuKCdyZS1hZGRlZCB0byBhIGxlZnQgZ3JvdXAnKTtcbiAgICAgICAgICAgICAgICBhdHRyaWJ1dGVzLmxlZnQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb24uc2V0KHsgYWRkZWRCeTogZ2V0Q29udGFjdElkKG1lc3NhZ2UuYXR0cmlidXRlcykgfSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoaW5pdGlhbE1lc3NhZ2UuZ3JvdXAudHlwZSA9PT0gR1JPVVBfVFlQRVMuUVVJVCkge1xuICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblxuICAgICAgICAgICAgICBjb25zdCBzZW5kZXIgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoc2VuZGVySWQpITtcbiAgICAgICAgICAgICAgY29uc3QgaW5Hcm91cCA9IEJvb2xlYW4oXG4gICAgICAgICAgICAgICAgc2VuZGVyICYmXG4gICAgICAgICAgICAgICAgICAoY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpIHx8IFtdKS5pbmNsdWRlcyhzZW5kZXIuaWQpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIGlmICghaW5Hcm91cCkge1xuICAgICAgICAgICAgICAgIGNvbnN0IHNlbmRlclN0cmluZyA9IHNlbmRlciA/IHNlbmRlci5pZEZvckxvZ2dpbmcoKSA6IG51bGw7XG4gICAgICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgICAgICBgR290ICdsZWZ0JyBtZXNzYWdlIGZyb20gc29tZW9uZSBub3QgaW4gZ3JvdXA6ICR7c2VuZGVyU3RyaW5nfS4gRHJvcHBpbmcuYFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKGlzTWUoc2VuZGVyLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgICAgICAgYXR0cmlidXRlcy5sZWZ0ID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICBwZW5kaW5nR3JvdXBVcGRhdGUubGVmdCA9ICdZb3UnO1xuICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHBlbmRpbmdHcm91cFVwZGF0ZS5sZWZ0ID0gc2VuZGVyLmdldCgnaWQnKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBhdHRyaWJ1dGVzLm1lbWJlcnMgPSBfLndpdGhvdXQoXG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLmdldCgnbWVtYmVycycpLFxuICAgICAgICAgICAgICAgIHNlbmRlci5nZXQoJ2lkJylcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKCFpc0VtcHR5KHBlbmRpbmdHcm91cFVwZGF0ZSkpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5zZXQoJ2dyb3VwX3VwZGF0ZScsIHBlbmRpbmdHcm91cFVwZGF0ZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gRHJvcCBlbXB0eSBtZXNzYWdlcyBhZnRlci4gVGhpcyBuZWVkcyB0byBoYXBwZW4gYWZ0ZXIgdGhlIGluaXRpYWxcbiAgICAgICAgICAvLyBtZXNzYWdlLnNldCBjYWxsIGFuZCBhZnRlciBHcm91cFYxIHByb2Nlc3NpbmcgdG8gbWFrZSBzdXJlIGFsbCBwb3NzaWJsZVxuICAgICAgICAgIC8vIHByb3BlcnRpZXMgYXJlIHNldCBiZWZvcmUgd2UgZGV0ZXJtaW5lIHRoYXQgYSBtZXNzYWdlIGlzIGVtcHR5LlxuICAgICAgICAgIGlmIChtZXNzYWdlLmlzRW1wdHkoKSkge1xuICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgIGBoYW5kbGVEYXRhTWVzc2FnZTogRHJvcHBpbmcgZW1wdHkgbWVzc2FnZSAke21lc3NhZ2UuaWRGb3JMb2dnaW5nKCl9IGluIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgY29uZmlybSgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpc1N0b3J5KG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGF0dHJpYnV0ZXMuaGFzUG9zdGVkU3RvcnkgPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhdHRyaWJ1dGVzLmFjdGl2ZV9hdCA9IG5vdztcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb252ZXJzYXRpb24uc2V0KGF0dHJpYnV0ZXMpO1xuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgZGF0YU1lc3NhZ2UuZXhwaXJlVGltZXIgJiZcbiAgICAgICAgICAgICFpc0V4cGlyYXRpb25UaW1lclVwZGF0ZShkYXRhTWVzc2FnZSlcbiAgICAgICAgICApIHtcbiAgICAgICAgICAgIG1lc3NhZ2Uuc2V0KHsgZXhwaXJlVGltZXI6IGRhdGFNZXNzYWdlLmV4cGlyZVRpbWVyIH0pO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmICghaGFzR3JvdXBWMlByb3AgJiYgIWlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgaWYgKGlzRXhwaXJhdGlvblRpbWVyVXBkYXRlKG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgbWVzc2FnZS5zZXQoe1xuICAgICAgICAgICAgICAgIGV4cGlyYXRpb25UaW1lclVwZGF0ZToge1xuICAgICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgICAgc291cmNlVXVpZCxcbiAgICAgICAgICAgICAgICAgIGV4cGlyZVRpbWVyOiBpbml0aWFsTWVzc2FnZS5leHBpcmVUaW1lcixcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uLnNldCh7IGV4cGlyZVRpbWVyOiBkYXRhTWVzc2FnZS5leHBpcmVUaW1lciB9KTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgLy8gTk9URTogUmVtb3ZlIG9uY2UgdGhlIGFib3ZlIGNhbGxzIHRoaXMubW9kZWwudXBkYXRlRXhwaXJhdGlvblRpbWVyKClcbiAgICAgICAgICAgIGNvbnN0IHsgZXhwaXJlVGltZXIgfSA9IGRhdGFNZXNzYWdlO1xuICAgICAgICAgICAgY29uc3Qgc2hvdWxkTG9nRXhwaXJlVGltZXJDaGFuZ2UgPVxuICAgICAgICAgICAgICBpc0V4cGlyYXRpb25UaW1lclVwZGF0ZShtZXNzYWdlLmF0dHJpYnV0ZXMpIHx8IGV4cGlyZVRpbWVyO1xuICAgICAgICAgICAgaWYgKHNob3VsZExvZ0V4cGlyZVRpbWVyQ2hhbmdlKSB7XG4gICAgICAgICAgICAgIGxvZy5pbmZvKFwiVXBkYXRlIGNvbnZlcnNhdGlvbiAnZXhwaXJlVGltZXInXCIsIHtcbiAgICAgICAgICAgICAgICBpZDogY29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpLFxuICAgICAgICAgICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICAgICAgICAgIHNvdXJjZTogJ2hhbmRsZURhdGFNZXNzYWdlJyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGlmICghaXNFbmRTZXNzaW9uKG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgICAgaWYgKGRhdGFNZXNzYWdlLmV4cGlyZVRpbWVyKSB7XG4gICAgICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICAgICAgZGF0YU1lc3NhZ2UuZXhwaXJlVGltZXIgIT09IGNvbnZlcnNhdGlvbi5nZXQoJ2V4cGlyZVRpbWVyJylcbiAgICAgICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi51cGRhdGVFeHBpcmF0aW9uVGltZXIoZGF0YU1lc3NhZ2UuZXhwaXJlVGltZXIsIHtcbiAgICAgICAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICAgICAgICByZWNlaXZlZEF0OiBtZXNzYWdlLmdldCgncmVjZWl2ZWRfYXQnKSxcbiAgICAgICAgICAgICAgICAgICAgcmVjZWl2ZWRBdE1TOiBtZXNzYWdlLmdldCgncmVjZWl2ZWRfYXRfbXMnKSxcbiAgICAgICAgICAgICAgICAgICAgc2VudEF0OiBtZXNzYWdlLmdldCgnc2VudF9hdCcpLFxuICAgICAgICAgICAgICAgICAgICBmcm9tR3JvdXBVcGRhdGU6IGlzR3JvdXBVcGRhdGUobWVzc2FnZS5hdHRyaWJ1dGVzKSxcbiAgICAgICAgICAgICAgICAgICAgcmVhc29uOiBgaGFuZGxlRGF0YU1lc3NhZ2UoJHt0aGlzLmlkRm9yTG9nZ2luZygpfSlgLFxuICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKFxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ2V4cGlyZVRpbWVyJykgJiZcbiAgICAgICAgICAgICAgICAvLyBXZSBvbmx5IHR1cm4gb2ZmIHRpbWVycyBpZiBpdCdzIG5vdCBhIGdyb3VwIHVwZGF0ZVxuICAgICAgICAgICAgICAgICFpc0dyb3VwVXBkYXRlKG1lc3NhZ2UuYXR0cmlidXRlcylcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgY29udmVyc2F0aW9uLnVwZGF0ZUV4cGlyYXRpb25UaW1lcih1bmRlZmluZWQsIHtcbiAgICAgICAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgICAgICAgIHJlY2VpdmVkQXQ6IG1lc3NhZ2UuZ2V0KCdyZWNlaXZlZF9hdCcpLFxuICAgICAgICAgICAgICAgICAgcmVjZWl2ZWRBdE1TOiBtZXNzYWdlLmdldCgncmVjZWl2ZWRfYXRfbXMnKSxcbiAgICAgICAgICAgICAgICAgIHNlbnRBdDogbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgICAgICAgICAgICAgIHJlYXNvbjogYGhhbmRsZURhdGFNZXNzYWdlKCR7dGhpcy5pZEZvckxvZ2dpbmcoKX0pYCxcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cblxuICAgICAgICAgIGlmIChpbml0aWFsTWVzc2FnZS5wcm9maWxlS2V5KSB7XG4gICAgICAgICAgICBjb25zdCB7IHByb2ZpbGVLZXkgfSA9IGluaXRpYWxNZXNzYWdlO1xuICAgICAgICAgICAgaWYgKFxuICAgICAgICAgICAgICBzb3VyY2UgPT09IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKSB8fFxuICAgICAgICAgICAgICBzb3VyY2VVdWlkID09PVxuICAgICAgICAgICAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkKCk/LnRvU3RyaW5nKClcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb24uc2V0KHsgcHJvZmlsZVNoYXJpbmc6IHRydWUgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKGlzRGlyZWN0Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb24uc2V0UHJvZmlsZUtleShwcm9maWxlS2V5KTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbnN0IGxvY2FsSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICAgICAgICAgICAgICBlMTY0OiBzb3VyY2UsXG4gICAgICAgICAgICAgICAgdXVpZDogc291cmNlVXVpZCxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChsb2NhbElkKSEuc2V0UHJvZmlsZUtleShcbiAgICAgICAgICAgICAgICBwcm9maWxlS2V5XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKGlzVGFwVG9WaWV3KG1lc3NhZ2UuYXR0cmlidXRlcykgJiYgdHlwZSA9PT0gJ291dGdvaW5nJykge1xuICAgICAgICAgICAgYXdhaXQgbWVzc2FnZS5lcmFzZUNvbnRlbnRzKCk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgaWYgKFxuICAgICAgICAgICAgdHlwZSA9PT0gJ2luY29taW5nJyAmJlxuICAgICAgICAgICAgaXNUYXBUb1ZpZXcobWVzc2FnZS5hdHRyaWJ1dGVzKSAmJlxuICAgICAgICAgICAgIW1lc3NhZ2UuaXNWYWxpZFRhcFRvVmlldygpXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgICAgYFJlY2VpdmVkIHRhcCB0byB2aWV3IG1lc3NhZ2UgJHttZXNzYWdlLmlkRm9yTG9nZ2luZygpfSB3aXRoIGludmFsaWQgZGF0YS4gRXJhc2luZyBjb250ZW50cy5gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgbWVzc2FnZS5zZXQoe1xuICAgICAgICAgICAgICBpc1RhcFRvVmlld0ludmFsaWQ6IHRydWUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGF3YWl0IG1lc3NhZ2UuZXJhc2VDb250ZW50cygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvblRpbWVzdGFtcCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3RpbWVzdGFtcCcpO1xuICAgICAgICBjb25zdCBpc0dyb3VwU3RvcnlSZXBseSA9XG4gICAgICAgICAgaXNHcm91cChjb252ZXJzYXRpb24uYXR0cmlidXRlcykgJiYgbWVzc2FnZS5nZXQoJ3N0b3J5SWQnKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFpc1N0b3J5KG1lc3NhZ2UuYXR0cmlidXRlcykgJiZcbiAgICAgICAgICAhaXNHcm91cFN0b3J5UmVwbHkgJiZcbiAgICAgICAgICAoIWNvbnZlcnNhdGlvblRpbWVzdGFtcCB8fFxuICAgICAgICAgICAgbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSA+IGNvbnZlcnNhdGlvblRpbWVzdGFtcClcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgICBsYXN0TWVzc2FnZTogbWVzc2FnZS5nZXROb3RpZmljYXRpb25UZXh0KCksXG4gICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2UuZ2V0KCdzZW50X2F0JyksXG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuICAgICAgICB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIobWVzc2FnZS5pZCwgbWVzc2FnZSk7XG4gICAgICAgIGNvbnZlcnNhdGlvbi5pbmNyZW1lbnRNZXNzYWdlQ291bnQoKTtcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG5cbiAgICAgICAgY29uc3QgcmVkdXhTdGF0ZSA9IHdpbmRvdy5yZWR1eFN0b3JlLmdldFN0YXRlKCk7XG5cbiAgICAgICAgY29uc3QgZ2lmdEJhZGdlID0gbWVzc2FnZS5nZXQoJ2dpZnRCYWRnZScpO1xuICAgICAgICBpZiAoZ2lmdEJhZGdlKSB7XG4gICAgICAgICAgY29uc3QgeyBsZXZlbCB9ID0gZ2lmdEJhZGdlO1xuICAgICAgICAgIGNvbnN0IHsgdXBkYXRlc1VybCB9ID0gd2luZG93LlNpZ25hbENvbnRleHQuY29uZmlnO1xuICAgICAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgICAgIHR5cGVvZiB1cGRhdGVzVXJsID09PSAnc3RyaW5nJyxcbiAgICAgICAgICAgICdnZXRQcm9maWxlOiBleHBlY3RlZCB1cGRhdGVzVXJsIHRvIGJlIGEgZGVmaW5lZCBzdHJpbmcnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCB1c2VyTGFuZ3VhZ2VzID0gZ2V0VXNlckxhbmd1YWdlcyhcbiAgICAgICAgICAgIG5hdmlnYXRvci5sYW5ndWFnZXMsXG4gICAgICAgICAgICB3aW5kb3cuZ2V0TG9jYWxlKClcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IHsgbWVzc2FnaW5nIH0gPSB3aW5kb3cudGV4dHNlY3VyZTtcbiAgICAgICAgICBpZiAoIW1lc3NhZ2luZykge1xuICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdoYW5kbGVEYXRhTWVzc2FnZTogbWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUnKTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBtZXNzYWdpbmcuc2VydmVyLmdldEJvb3N0QmFkZ2VzRnJvbVNlcnZlcihcbiAgICAgICAgICAgIHVzZXJMYW5ndWFnZXNcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGJvb3N0QmFkZ2VzQnlMZXZlbCA9IHBhcnNlQm9vc3RCYWRnZUxpc3RGcm9tU2VydmVyKFxuICAgICAgICAgICAgcmVzcG9uc2UsXG4gICAgICAgICAgICB1cGRhdGVzVXJsXG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBiYWRnZSA9IGJvb3N0QmFkZ2VzQnlMZXZlbFtsZXZlbF07XG4gICAgICAgICAgaWYgKCFiYWRnZSkge1xuICAgICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgICBgaGFuZGxlRGF0YU1lc3NhZ2U6IGdpZnQgYmFkZ2Ugd2l0aCBsZXZlbCAke2xldmVsfSBub3QgZm91bmQgb24gc2VydmVyYFxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYXdhaXQgd2luZG93LnJlZHV4QWN0aW9ucy5iYWRnZXMudXBkYXRlT3JDcmVhdGUoW2JhZGdlXSk7XG4gICAgICAgICAgICBnaWZ0QmFkZ2UuaWQgPSBiYWRnZS5pZDtcbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBPbmx5IHF1ZXVlIGF0dGFjaG1lbnRzIGZvciBkb3dubG9hZHMgaWYgdGhpcyBpcyBhIHN0b3J5IG9yXG4gICAgICAgIC8vIG91dGdvaW5nIG1lc3NhZ2Ugb3Igd2UndmUgYWNjZXB0ZWQgdGhlIGNvbnZlcnNhdGlvblxuICAgICAgICBjb25zdCBhdHRhY2htZW50cyA9IHRoaXMuZ2V0KCdhdHRhY2htZW50cycpIHx8IFtdO1xuXG4gICAgICAgIGxldCBxdWV1ZVN0b3J5Rm9yRG93bmxvYWQgPSBmYWxzZTtcbiAgICAgICAgaWYgKGlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIGNvbnN0IGlzU2hvd2luZ1N0b3JpZXMgPSBzaG91bGRTaG93U3Rvcmllc1ZpZXcocmVkdXhTdGF0ZSk7XG5cbiAgICAgICAgICBxdWV1ZVN0b3J5Rm9yRG93bmxvYWQgPVxuICAgICAgICAgICAgaXNTaG93aW5nU3RvcmllcyB8fFxuICAgICAgICAgICAgKGF3YWl0IHNob3VsZERvd25sb2FkU3RvcnkoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IHNob3VsZEhvbGRPZmZEb3dubG9hZCA9XG4gICAgICAgICAgKGlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSAmJiAhcXVldWVTdG9yeUZvckRvd25sb2FkKSB8fFxuICAgICAgICAgICghaXNTdG9yeShtZXNzYWdlLmF0dHJpYnV0ZXMpICYmXG4gICAgICAgICAgICAoaXNJbWFnZShhdHRhY2htZW50cykgfHwgaXNWaWRlbyhhdHRhY2htZW50cykpICYmXG4gICAgICAgICAgICBpc0luQ2FsbChyZWR1eFN0YXRlKSk7XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgIHRoaXMuaGFzQXR0YWNobWVudERvd25sb2FkcygpICYmXG4gICAgICAgICAgKGNvbnZlcnNhdGlvbi5nZXRBY2NlcHRlZCgpIHx8IGlzT3V0Z29pbmcobWVzc2FnZS5hdHRyaWJ1dGVzKSkgJiZcbiAgICAgICAgICAhc2hvdWxkSG9sZE9mZkRvd25sb2FkXG4gICAgICAgICkge1xuICAgICAgICAgIGlmICh3aW5kb3cuYXR0YWNobWVudERvd25sb2FkUXVldWUpIHtcbiAgICAgICAgICAgIHdpbmRvdy5hdHRhY2htZW50RG93bmxvYWRRdWV1ZS51bnNoaWZ0KG1lc3NhZ2UpO1xuICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgICdBZGRpbmcgdG8gYXR0YWNobWVudERvd25sb2FkUXVldWUnLFxuICAgICAgICAgICAgICBtZXNzYWdlLmdldCgnc2VudF9hdCcpXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBhd2FpdCBtZXNzYWdlLnF1ZXVlQXR0YWNobWVudERvd25sb2FkcygpO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGlzRmlyc3RSdW4gPSB0cnVlO1xuICAgICAgICBhd2FpdCB0aGlzLm1vZGlmeVRhcmdldE1lc3NhZ2UoY29udmVyc2F0aW9uLCBpc0ZpcnN0UnVuKTtcblxuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAnaGFuZGxlRGF0YU1lc3NhZ2U6IEJhdGNoaW5nIHNhdmUgZm9yJyxcbiAgICAgICAgICBtZXNzYWdlLmdldCgnc2VudF9hdCcpXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuc2F2ZUFuZE5vdGlmeShjb252ZXJzYXRpb24sIGNvbmZpcm0pO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgY29uc3QgZXJyb3JGb3JMb2cgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAnaGFuZGxlRGF0YU1lc3NhZ2UnLFxuICAgICAgICAgIG1lc3NhZ2UuaWRGb3JMb2dnaW5nKCksXG4gICAgICAgICAgJ2Vycm9yOicsXG4gICAgICAgICAgZXJyb3JGb3JMb2dcbiAgICAgICAgKTtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzYXZlQW5kTm90aWZ5KFxuICAgIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gICAgY29uZmlybTogKCkgPT4gdm9pZFxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLlV0aWwuc2F2ZU5ld01lc3NhZ2VCYXRjaGVyLmFkZCh0aGlzLmF0dHJpYnV0ZXMpO1xuXG4gICAgbG9nLmluZm8oJ01lc3NhZ2Ugc2F2ZWQnLCB0aGlzLmdldCgnc2VudF9hdCcpKTtcblxuICAgIGNvbnZlcnNhdGlvbi50cmlnZ2VyKCduZXdtZXNzYWdlJywgdGhpcyk7XG5cbiAgICBjb25zdCBpc0ZpcnN0UnVuID0gZmFsc2U7XG4gICAgYXdhaXQgdGhpcy5tb2RpZnlUYXJnZXRNZXNzYWdlKGNvbnZlcnNhdGlvbiwgaXNGaXJzdFJ1bik7XG5cbiAgICBjb25zdCBpc0dyb3VwU3RvcnlSZXBseSA9XG4gICAgICBpc0dyb3VwKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSAmJiB0aGlzLmdldCgnc3RvcnlJZCcpO1xuXG4gICAgaWYgKGlzTWVzc2FnZVVucmVhZCh0aGlzLmF0dHJpYnV0ZXMpICYmICFpc0dyb3VwU3RvcnlSZXBseSkge1xuICAgICAgYXdhaXQgY29udmVyc2F0aW9uLm5vdGlmeSh0aGlzKTtcbiAgICB9XG5cbiAgICAvLyBJbmNyZW1lbnQgdGhlIHNlbnQgbWVzc2FnZSBjb3VudCBpZiB0aGlzIGlzIGFuIG91dGdvaW5nIG1lc3NhZ2VcbiAgICBpZiAodGhpcy5nZXQoJ3R5cGUnKSA9PT0gJ291dGdvaW5nJykge1xuICAgICAgY29udmVyc2F0aW9uLmluY3JlbWVudFNlbnRNZXNzYWdlQ291bnQoKTtcbiAgICB9XG5cbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMudHJpZ2dlcignaW5jcmVtZW50UHJvZ3Jlc3MnKTtcbiAgICBjb25maXJtKCk7XG5cbiAgICBjb252ZXJzYXRpb24ucXVldWVKb2IoJ3VwZGF0ZVVucmVhZCcsICgpID0+IGNvbnZlcnNhdGlvbi51cGRhdGVVbnJlYWQoKSk7XG4gIH1cblxuICAvLyBUaGlzIGZ1bmN0aW9uIGlzIGNhbGxlZCB0d2ljZSAtIG9uY2UgZnJvbSBoYW5kbGVEYXRhTWVzc2FnZSwgYW5kIHRoZW4gYWdhaW4gZnJvbVxuICAvLyAgICBzYXZlQW5kTm90aWZ5LCBhIGZ1bmN0aW9uIGNhbGxlZCBhdCB0aGUgZW5kIG9mIGhhbmRsZURhdGFNZXNzYWdlIGFzIGEgY2xlYW51cCBmb3JcbiAgLy8gICAgYW55IG1pc3NlZCBvdXQtb2Ytb3JkZXIgZXZlbnRzLlxuICBhc3luYyBtb2RpZnlUYXJnZXRNZXNzYWdlKFxuICAgIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gICAgaXNGaXJzdFJ1bjogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLXRoaXMtYWxpYXNcbiAgICBjb25zdCBtZXNzYWdlID0gdGhpcztcbiAgICBjb25zdCB0eXBlID0gbWVzc2FnZS5nZXQoJ3R5cGUnKTtcbiAgICBsZXQgY2hhbmdlZCA9IGZhbHNlO1xuXG4gICAgaWYgKHR5cGUgPT09ICdvdXRnb2luZycpIHtcbiAgICAgIGNvbnN0IHNlbmRBY3Rpb25zID0gTWVzc2FnZVJlY2VpcHRzLmdldFNpbmdsZXRvbigpXG4gICAgICAgIC5mb3JNZXNzYWdlKGNvbnZlcnNhdGlvbiwgbWVzc2FnZSlcbiAgICAgICAgLm1hcChyZWNlaXB0ID0+IHtcbiAgICAgICAgICBsZXQgc2VuZEFjdGlvblR5cGU6IFNlbmRBY3Rpb25UeXBlO1xuICAgICAgICAgIGNvbnN0IHJlY2VpcHRUeXBlID0gcmVjZWlwdC5nZXQoJ3R5cGUnKTtcbiAgICAgICAgICBzd2l0Y2ggKHJlY2VpcHRUeXBlKSB7XG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VSZWNlaXB0VHlwZS5EZWxpdmVyeTpcbiAgICAgICAgICAgICAgc2VuZEFjdGlvblR5cGUgPSBTZW5kQWN0aW9uVHlwZS5Hb3REZWxpdmVyeVJlY2VpcHQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgY2FzZSBNZXNzYWdlUmVjZWlwdFR5cGUuUmVhZDpcbiAgICAgICAgICAgICAgc2VuZEFjdGlvblR5cGUgPSBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICBjYXNlIE1lc3NhZ2VSZWNlaXB0VHlwZS5WaWV3OlxuICAgICAgICAgICAgICBzZW5kQWN0aW9uVHlwZSA9IFNlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHQ7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihyZWNlaXB0VHlwZSk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGRlc3RpbmF0aW9uQ29udmVyc2F0aW9uSWQ6IHJlY2VpcHQuZ2V0KCdzb3VyY2VDb252ZXJzYXRpb25JZCcpLFxuICAgICAgICAgICAgYWN0aW9uOiB7XG4gICAgICAgICAgICAgIHR5cGU6IHNlbmRBY3Rpb25UeXBlLFxuICAgICAgICAgICAgICB1cGRhdGVkQXQ6IHJlY2VpcHQuZ2V0KCdyZWNlaXB0VGltZXN0YW1wJyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgIH0pO1xuXG4gICAgICBjb25zdCBvbGRTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkID1cbiAgICAgICAgdGhpcy5nZXQoJ3NlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQnKSB8fCB7fTtcblxuICAgICAgY29uc3QgbmV3U2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCA9IHJlZHVjZShcbiAgICAgICAgc2VuZEFjdGlvbnMsXG4gICAgICAgIChcbiAgICAgICAgICByZXN1bHQ6IFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgeyBkZXN0aW5hdGlvbkNvbnZlcnNhdGlvbklkLCBhY3Rpb24gfVxuICAgICAgICApID0+IHtcbiAgICAgICAgICBjb25zdCBvbGRTZW5kU3RhdGUgPSBnZXRPd24ocmVzdWx0LCBkZXN0aW5hdGlvbkNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgICBpZiAoIW9sZFNlbmRTdGF0ZSkge1xuICAgICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICAgIGBHb3QgYSByZWNlaXB0IGZvciBhIGNvbnZlcnNhdGlvbiAoJHtkZXN0aW5hdGlvbkNvbnZlcnNhdGlvbklkfSksIGJ1dCB3ZSBoYXZlIG5vIHJlY29yZCBvZiBzZW5kaW5nIHRvIHRoZW1gXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuIHJlc3VsdDtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBuZXdTZW5kU3RhdGUgPSBzZW5kU3RhdGVSZWR1Y2VyKG9sZFNlbmRTdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4ucmVzdWx0LFxuICAgICAgICAgICAgW2Rlc3RpbmF0aW9uQ29udmVyc2F0aW9uSWRdOiBuZXdTZW5kU3RhdGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgfSxcbiAgICAgICAgb2xkU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFxuICAgICAgKTtcblxuICAgICAgaWYgKFxuICAgICAgICAhaXNFcXVhbChvbGRTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkLCBuZXdTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkKVxuICAgICAgKSB7XG4gICAgICAgIG1lc3NhZ2Uuc2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJywgbmV3U2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCk7XG4gICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICh0eXBlID09PSAnaW5jb21pbmcnKSB7XG4gICAgICAvLyBJbiBhIGZvbGxvd3VwIChzZWUgREVTS1RPUC0yMTAwKSwgd2Ugd2FudCB0byBtYWtlIGBSZWFkU3luY3MjZm9yTWVzc2FnZWAgcmV0dXJuXG4gICAgICAvLyAgIGFuIGFycmF5LCBub3QgYW4gb2JqZWN0LiBUaGlzIGFycmF5IHdyYXBwaW5nIG1ha2VzIHRoYXQgZnV0dXJlIGEgYml0IGVhc2llci5cbiAgICAgIGNvbnN0IHJlYWRTeW5jID0gUmVhZFN5bmNzLmdldFNpbmdsZXRvbigpLmZvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgICBjb25zdCByZWFkU3luY3MgPSByZWFkU3luYyA/IFtyZWFkU3luY10gOiBbXTtcblxuICAgICAgY29uc3Qgdmlld1N5bmNzID0gVmlld1N5bmNzLmdldFNpbmdsZXRvbigpLmZvck1lc3NhZ2UobWVzc2FnZSk7XG5cbiAgICAgIGNvbnN0IGlzR3JvdXBTdG9yeVJlcGx5ID1cbiAgICAgICAgaXNHcm91cChjb252ZXJzYXRpb24uYXR0cmlidXRlcykgJiYgbWVzc2FnZS5nZXQoJ3N0b3J5SWQnKTtcblxuICAgICAgY29uc3Qga2VlcE11dGVkQ2hhdHNBcmNoaXZlZCA9XG4gICAgICAgIHdpbmRvdy5zdG9yYWdlLmdldCgna2VlcE11dGVkQ2hhdHNBcmNoaXZlZCcpID8/IGZhbHNlO1xuICAgICAgY29uc3Qga2VlcFRoaXNDb252ZXJzYXRpb25BcmNoaXZlZCA9XG4gICAgICAgIGtlZXBNdXRlZENoYXRzQXJjaGl2ZWQgJiYgY29udmVyc2F0aW9uLmlzTXV0ZWQoKTtcblxuICAgICAgaWYgKHJlYWRTeW5jcy5sZW5ndGggIT09IDAgfHwgdmlld1N5bmNzLmxlbmd0aCAhPT0gMCkge1xuICAgICAgICBjb25zdCBtYXJrUmVhZEF0ID0gTWF0aC5taW4oXG4gICAgICAgICAgRGF0ZS5ub3coKSxcbiAgICAgICAgICAuLi5yZWFkU3luY3MubWFwKHN5bmMgPT4gc3luYy5nZXQoJ3JlYWRBdCcpKSxcbiAgICAgICAgICAuLi52aWV3U3luY3MubWFwKHN5bmMgPT4gc3luYy5nZXQoJ3ZpZXdlZEF0JykpXG4gICAgICAgICk7XG5cbiAgICAgICAgaWYgKG1lc3NhZ2UuZ2V0KCdleHBpcmVUaW1lcicpKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgPSBtZXNzYWdlLmdldChcbiAgICAgICAgICAgICdleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBtZXNzYWdlLnNldChcbiAgICAgICAgICAgICdleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAnLFxuICAgICAgICAgICAgTWF0aC5taW4oZXhpc3RpbmdFeHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAgPz8gRGF0ZS5ub3coKSwgbWFya1JlYWRBdClcbiAgICAgICAgICApO1xuICAgICAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgbGV0IG5ld1JlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCB8IFJlYWRTdGF0dXMuVmlld2VkO1xuICAgICAgICBpZiAodmlld1N5bmNzLmxlbmd0aCkge1xuICAgICAgICAgIG5ld1JlYWRTdGF0dXMgPSBSZWFkU3RhdHVzLlZpZXdlZDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgICByZWFkU3luY3MubGVuZ3RoICE9PSAwLFxuICAgICAgICAgICAgJ1Nob3VsZCBoYXZlIGVpdGhlciB2aWV3IG9yIHJlYWQgc3luY3MnXG4gICAgICAgICAgKTtcbiAgICAgICAgICBuZXdSZWFkU3RhdHVzID0gUmVhZFN0YXR1cy5SZWFkO1xuICAgICAgICB9XG5cbiAgICAgICAgbWVzc2FnZS5zZXQoe1xuICAgICAgICAgIHJlYWRTdGF0dXM6IG5ld1JlYWRTdGF0dXMsXG4gICAgICAgICAgc2VlblN0YXR1czogU2VlblN0YXR1cy5TZWVuLFxuICAgICAgICB9KTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG5cbiAgICAgICAgdGhpcy5wZW5kaW5nTWFya1JlYWQgPSBNYXRoLm1pbihcbiAgICAgICAgICB0aGlzLnBlbmRpbmdNYXJrUmVhZCA/PyBEYXRlLm5vdygpLFxuICAgICAgICAgIG1hcmtSZWFkQXRcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoXG4gICAgICAgIGlzRmlyc3RSdW4gJiZcbiAgICAgICAgIWlzR3JvdXBTdG9yeVJlcGx5ICYmXG4gICAgICAgICFrZWVwVGhpc0NvbnZlcnNhdGlvbkFyY2hpdmVkXG4gICAgICApIHtcbiAgICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgaXNBcmNoaXZlZDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWlzRmlyc3RSdW4gJiYgdGhpcy5wZW5kaW5nTWFya1JlYWQpIHtcbiAgICAgICAgY29uc3QgbWFya1JlYWRBdCA9IHRoaXMucGVuZGluZ01hcmtSZWFkO1xuICAgICAgICB0aGlzLnBlbmRpbmdNYXJrUmVhZCA9IHVuZGVmaW5lZDtcblxuICAgICAgICAvLyBUaGlzIGlzIHByaW1hcmlseSB0byBhbGxvdyB0aGUgY29udmVyc2F0aW9uIHRvIG1hcmsgYWxsIG9sZGVyXG4gICAgICAgIC8vIG1lc3NhZ2VzIGFzIHJlYWQsIGFzIGlzIGRvbmUgd2hlbiB3ZSByZWNlaXZlIGEgcmVhZCBzeW5jIGZvclxuICAgICAgICAvLyBhIG1lc3NhZ2Ugd2UgYWxyZWFkeSBrbm93IGFib3V0LlxuICAgICAgICAvL1xuICAgICAgICAvLyBXZSBydW4gdGhpcyB3aGVuIGBpc0ZpcnN0UnVuYCBpcyBmYWxzZSBzbyB0aGF0IGl0IHRyaWdnZXJzIHdoZW4gdGhlXG4gICAgICAgIC8vIG1lc3NhZ2UgYW5kIHRoZSBvdGhlciBvbmVzIGFjY29tcGFueWluZyBpdCBpbiB0aGUgYmF0Y2ggYXJlIGZ1bGx5IGluXG4gICAgICAgIC8vIHRoZSBkYXRhYmFzZS5cbiAgICAgICAgbWVzc2FnZS5nZXRDb252ZXJzYXRpb24oKT8ub25SZWFkTWVzc2FnZShtZXNzYWdlLCBtYXJrUmVhZEF0KTtcbiAgICAgIH1cblxuICAgICAgLy8gQ2hlY2sgZm9yIG91dC1vZi1vcmRlciB2aWV3IG9uY2Ugb3BlbiBzeW5jc1xuICAgICAgaWYgKGlzVGFwVG9WaWV3KG1lc3NhZ2UuYXR0cmlidXRlcykpIHtcbiAgICAgICAgY29uc3Qgdmlld09uY2VPcGVuU3luYyA9XG4gICAgICAgICAgVmlld09uY2VPcGVuU3luY3MuZ2V0U2luZ2xldG9uKCkuZm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICAgICAgaWYgKHZpZXdPbmNlT3BlblN5bmMpIHtcbiAgICAgICAgICBhd2FpdCBtZXNzYWdlLm1hcmtWaWV3T25jZU1lc3NhZ2VWaWV3ZWQoeyBmcm9tU3luYzogdHJ1ZSB9KTtcbiAgICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChcbiAgICAgIGlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSAmJlxuICAgICAgIW1lc3NhZ2UuZ2V0KCdleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAnKVxuICAgICkge1xuICAgICAgbWVzc2FnZS5zZXQoXG4gICAgICAgICdleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXAnLFxuICAgICAgICBNYXRoLm1pbihcbiAgICAgICAgICBtZXNzYWdlLmdldCgnc2VydmVyVGltZXN0YW1wJykgfHwgbWVzc2FnZS5nZXQoJ3RpbWVzdGFtcCcpLFxuICAgICAgICAgIERhdGUubm93KClcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGNoYW5nZWQgPSB0cnVlO1xuICAgIH1cblxuICAgIC8vIERvZXMgdGhpcyBtZXNzYWdlIGhhdmUgYW55IHBlbmRpbmcsIHByZXZpb3VzbHktcmVjZWl2ZWQgYXNzb2NpYXRlZCByZWFjdGlvbnM/XG4gICAgY29uc3QgcmVhY3Rpb25zID0gUmVhY3Rpb25zLmdldFNpbmdsZXRvbigpLmZvck1lc3NhZ2UobWVzc2FnZSk7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICByZWFjdGlvbnMubWFwKGFzeW5jIHJlYWN0aW9uID0+IHtcbiAgICAgICAgYXdhaXQgbWVzc2FnZS5oYW5kbGVSZWFjdGlvbihyZWFjdGlvbiwgZmFsc2UpO1xuICAgICAgICBjaGFuZ2VkID0gdHJ1ZTtcbiAgICAgIH0pXG4gICAgKTtcblxuICAgIC8vIERvZXMgdGhpcyBtZXNzYWdlIGhhdmUgYW55IHBlbmRpbmcsIHByZXZpb3VzbHktcmVjZWl2ZWQgYXNzb2NpYXRlZFxuICAgIC8vIGRlbGV0ZSBmb3IgZXZlcnlvbmUgbWVzc2FnZXM/XG4gICAgY29uc3QgZGVsZXRlcyA9IERlbGV0ZXMuZ2V0U2luZ2xldG9uKCkuZm9yTWVzc2FnZShtZXNzYWdlKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgIGRlbGV0ZXMubWFwKGFzeW5jIGRlbCA9PiB7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuVXRpbC5kZWxldGVGb3JFdmVyeW9uZShtZXNzYWdlLCBkZWwsIGZhbHNlKTtcbiAgICAgICAgY2hhbmdlZCA9IHRydWU7XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBpZiAoY2hhbmdlZCAmJiAhaXNGaXJzdFJ1bikge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBtb2RpZnlUYXJnZXRNZXNzYWdlLyR7dGhpcy5pZEZvckxvZ2dpbmcoKX06IENoYW5nZXMgaW4gc2Vjb25kIHJ1bjsgc2F2aW5nLmBcbiAgICAgICk7XG4gICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UodGhpcy5hdHRyaWJ1dGVzLCB7XG4gICAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBhc3luYyBoYW5kbGVSZWFjdGlvbihcbiAgICByZWFjdGlvbjogUmVhY3Rpb25Nb2RlbCxcbiAgICBzaG91bGRQZXJzaXN0ID0gdHJ1ZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGF0dHJpYnV0ZXMgfSA9IHRoaXM7XG5cbiAgICBpZiAodGhpcy5nZXQoJ2RlbGV0ZWRGb3JFdmVyeW9uZScpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgLy8gV2UgYWxsb3cgeW91IHRvIHJlYWN0IHRvIG1lc3NhZ2VzIHdpdGggb3V0Z29pbmcgZXJyb3JzIG9ubHkgaWYgaXQgaGFzIHNlbnRcbiAgICAvLyAgIHN1Y2Nlc3NmdWxseSB0byBhdCBsZWFzdCBvbmUgcGVyc29uLlxuICAgIGlmIChcbiAgICAgIGhhc0Vycm9ycyhhdHRyaWJ1dGVzKSAmJlxuICAgICAgKGlzSW5jb21pbmcoYXR0cmlidXRlcykgfHxcbiAgICAgICAgZ2V0TWVzc2FnZVByb3BTdGF0dXMoXG4gICAgICAgICAgYXR0cmlidXRlcyxcbiAgICAgICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3coKVxuICAgICAgICApICE9PSAncGFydGlhbC1zZW50JylcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB0aGlzLmdldENvbnZlcnNhdGlvbigpO1xuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcHJldmlvdXNMZW5ndGggPSAodGhpcy5nZXQoJ3JlYWN0aW9ucycpIHx8IFtdKS5sZW5ndGg7XG4gICAgaWYgKHJlYWN0aW9uLmdldCgnc291cmNlJykgPT09IFJlYWN0aW9uU291cmNlLkZyb21UaGlzRGV2aWNlKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGhhbmRsZVJlYWN0aW9uOiBzZW5kaW5nIHJlYWN0aW9uIHRvICR7dGhpcy5pZEZvckxvZ2dpbmcoKX0gZnJvbSB0aGlzIGRldmljZWBcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IG5ld1JlYWN0aW9uID0ge1xuICAgICAgICBlbW9qaTogcmVhY3Rpb24uZ2V0KCdyZW1vdmUnKSA/IHVuZGVmaW5lZCA6IHJlYWN0aW9uLmdldCgnZW1vamknKSxcbiAgICAgICAgZnJvbUlkOiByZWFjdGlvbi5nZXQoJ2Zyb21JZCcpLFxuICAgICAgICB0YXJnZXRBdXRob3JVdWlkOiByZWFjdGlvbi5nZXQoJ3RhcmdldEF1dGhvclV1aWQnKSxcbiAgICAgICAgdGFyZ2V0VGltZXN0YW1wOiByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpLFxuICAgICAgICB0aW1lc3RhbXA6IHJlYWN0aW9uLmdldCgndGltZXN0YW1wJyksXG4gICAgICAgIGlzU2VudEJ5Q29udmVyc2F0aW9uSWQ6IHppcE9iamVjdChcbiAgICAgICAgICBjb252ZXJzYXRpb24uZ2V0TWVtYmVyQ29udmVyc2F0aW9uSWRzKCksXG4gICAgICAgICAgcmVwZWF0KGZhbHNlKVxuICAgICAgICApLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgcmVhY3Rpb25zID0gcmVhY3Rpb25VdGlsLmFkZE91dGdvaW5nUmVhY3Rpb24oXG4gICAgICAgIHRoaXMuZ2V0KCdyZWFjdGlvbnMnKSB8fCBbXSxcbiAgICAgICAgbmV3UmVhY3Rpb24sXG4gICAgICAgIGlzU3RvcnkodGhpcy5hdHRyaWJ1dGVzKVxuICAgICAgKTtcbiAgICAgIHRoaXMuc2V0KHsgcmVhY3Rpb25zIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBvbGRSZWFjdGlvbnMgPSB0aGlzLmdldCgncmVhY3Rpb25zJykgfHwgW107XG4gICAgICBsZXQgcmVhY3Rpb25zOiBBcnJheTxNZXNzYWdlUmVhY3Rpb25UeXBlPjtcbiAgICAgIGNvbnN0IG9sZFJlYWN0aW9uID0gb2xkUmVhY3Rpb25zLmZpbmQocmUgPT5cbiAgICAgICAgaXNOZXdSZWFjdGlvblJlcGxhY2luZ1ByZXZpb3VzKHJlLCByZWFjdGlvbi5hdHRyaWJ1dGVzLCB0aGlzLmF0dHJpYnV0ZXMpXG4gICAgICApO1xuICAgICAgaWYgKG9sZFJlYWN0aW9uKSB7XG4gICAgICAgIHRoaXMuY2xlYXJOb3RpZmljYXRpb25zKG9sZFJlYWN0aW9uKTtcbiAgICAgIH1cblxuICAgICAgaWYgKHJlYWN0aW9uLmdldCgncmVtb3ZlJykpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgJ2hhbmRsZVJlYWN0aW9uOiByZW1vdmluZyByZWFjdGlvbiBmb3IgbWVzc2FnZScsXG4gICAgICAgICAgdGhpcy5pZEZvckxvZ2dpbmcoKVxuICAgICAgICApO1xuXG4gICAgICAgIGlmIChyZWFjdGlvbi5nZXQoJ3NvdXJjZScpID09PSBSZWFjdGlvblNvdXJjZS5Gcm9tU3luYykge1xuICAgICAgICAgIHJlYWN0aW9ucyA9IG9sZFJlYWN0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgICByZSA9PlxuICAgICAgICAgICAgICAhaXNOZXdSZWFjdGlvblJlcGxhY2luZ1ByZXZpb3VzKFxuICAgICAgICAgICAgICAgIHJlLFxuICAgICAgICAgICAgICAgIHJlYWN0aW9uLmF0dHJpYnV0ZXMsXG4gICAgICAgICAgICAgICAgdGhpcy5hdHRyaWJ1dGVzXG4gICAgICAgICAgICAgICkgfHwgcmUudGltZXN0YW1wID4gcmVhY3Rpb24uZ2V0KCd0aW1lc3RhbXAnKVxuICAgICAgICAgICk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVhY3Rpb25zID0gb2xkUmVhY3Rpb25zLmZpbHRlcihcbiAgICAgICAgICAgIHJlID0+XG4gICAgICAgICAgICAgICFpc05ld1JlYWN0aW9uUmVwbGFjaW5nUHJldmlvdXMoXG4gICAgICAgICAgICAgICAgcmUsXG4gICAgICAgICAgICAgICAgcmVhY3Rpb24uYXR0cmlidXRlcyxcbiAgICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXNcbiAgICAgICAgICAgICAgKVxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgICAgdGhpcy5zZXQoeyByZWFjdGlvbnMgfSk7XG5cbiAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnJlbW92ZVJlYWN0aW9uRnJvbUNvbnZlcnNhdGlvbih7XG4gICAgICAgICAgZW1vamk6IHJlYWN0aW9uLmdldCgnZW1vamknKSxcbiAgICAgICAgICBmcm9tSWQ6IHJlYWN0aW9uLmdldCgnZnJvbUlkJyksXG4gICAgICAgICAgdGFyZ2V0QXV0aG9yVXVpZDogcmVhY3Rpb24uZ2V0KCd0YXJnZXRBdXRob3JVdWlkJyksXG4gICAgICAgICAgdGFyZ2V0VGltZXN0YW1wOiByZWFjdGlvbi5nZXQoJ3RhcmdldFRpbWVzdGFtcCcpLFxuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdoYW5kbGVSZWFjdGlvbjogYWRkaW5nIHJlYWN0aW9uIGZvciBtZXNzYWdlJyxcbiAgICAgICAgICB0aGlzLmlkRm9yTG9nZ2luZygpXG4gICAgICAgICk7XG5cbiAgICAgICAgbGV0IHJlYWN0aW9uVG9BZGQ6IE1lc3NhZ2VSZWFjdGlvblR5cGU7XG4gICAgICAgIGlmIChyZWFjdGlvbi5nZXQoJ3NvdXJjZScpID09PSBSZWFjdGlvblNvdXJjZS5Gcm9tU3luYykge1xuICAgICAgICAgIGNvbnN0IG91clJlYWN0aW9ucyA9IFtcbiAgICAgICAgICAgIHJlYWN0aW9uLnRvSlNPTigpLFxuICAgICAgICAgICAgLi4ub2xkUmVhY3Rpb25zLmZpbHRlcihyZSA9PiByZS5mcm9tSWQgPT09IHJlYWN0aW9uLmdldCgnZnJvbUlkJykpLFxuICAgICAgICAgIF07XG4gICAgICAgICAgcmVhY3Rpb25Ub0FkZCA9IG1heEJ5KG91clJlYWN0aW9ucywgJ3RpbWVzdGFtcCcpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlYWN0aW9uVG9BZGQgPSByZWFjdGlvbi50b0pTT04oKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlYWN0aW9ucyA9IG9sZFJlYWN0aW9ucy5maWx0ZXIoXG4gICAgICAgICAgcmUgPT5cbiAgICAgICAgICAgICFpc05ld1JlYWN0aW9uUmVwbGFjaW5nUHJldmlvdXMoXG4gICAgICAgICAgICAgIHJlLFxuICAgICAgICAgICAgICByZWFjdGlvbi5hdHRyaWJ1dGVzLFxuICAgICAgICAgICAgICB0aGlzLmF0dHJpYnV0ZXNcbiAgICAgICAgICAgIClcbiAgICAgICAgKTtcbiAgICAgICAgcmVhY3Rpb25zLnB1c2gocmVhY3Rpb25Ub0FkZCk7XG4gICAgICAgIHRoaXMuc2V0KHsgcmVhY3Rpb25zIH0pO1xuXG4gICAgICAgIGlmIChcbiAgICAgICAgICBpc091dGdvaW5nKHRoaXMuYXR0cmlidXRlcykgJiZcbiAgICAgICAgICByZWFjdGlvbi5nZXQoJ3NvdXJjZScpID09PSBSZWFjdGlvblNvdXJjZS5Gcm9tU29tZW9uZUVsc2VcbiAgICAgICAgKSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uLm5vdGlmeSh0aGlzLCByZWFjdGlvbik7XG4gICAgICAgIH1cblxuICAgICAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuYWRkUmVhY3Rpb24oe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiB0aGlzLmdldCgnY29udmVyc2F0aW9uSWQnKSxcbiAgICAgICAgICBlbW9qaTogcmVhY3Rpb24uZ2V0KCdlbW9qaScpLFxuICAgICAgICAgIGZyb21JZDogcmVhY3Rpb24uZ2V0KCdmcm9tSWQnKSxcbiAgICAgICAgICBtZXNzYWdlSWQ6IHRoaXMuaWQsXG4gICAgICAgICAgbWVzc2FnZVJlY2VpdmVkQXQ6IHRoaXMuZ2V0KCdyZWNlaXZlZF9hdCcpLFxuICAgICAgICAgIHRhcmdldEF1dGhvclV1aWQ6IHJlYWN0aW9uLmdldCgndGFyZ2V0QXV0aG9yVXVpZCcpLFxuICAgICAgICAgIHRhcmdldFRpbWVzdGFtcDogcmVhY3Rpb24uZ2V0KCd0YXJnZXRUaW1lc3RhbXAnKSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgY3VycmVudExlbmd0aCA9ICh0aGlzLmdldCgncmVhY3Rpb25zJykgfHwgW10pLmxlbmd0aDtcbiAgICBsb2cuaW5mbyhcbiAgICAgICdoYW5kbGVSZWFjdGlvbjonLFxuICAgICAgYERvbmUgcHJvY2Vzc2luZyByZWFjdGlvbiBmb3IgbWVzc2FnZSAke3RoaXMuaWRGb3JMb2dnaW5nKCl9LmAsXG4gICAgICBgV2VudCBmcm9tICR7cHJldmlvdXNMZW5ndGh9IHRvICR7Y3VycmVudExlbmd0aH0gcmVhY3Rpb25zLmBcbiAgICApO1xuXG4gICAgaWYgKHJlYWN0aW9uLmdldCgnc291cmNlJykgPT09IFJlYWN0aW9uU291cmNlLkZyb21UaGlzRGV2aWNlKSB7XG4gICAgICBjb25zdCBqb2JEYXRhOiBDb252ZXJzYXRpb25RdWV1ZUpvYkRhdGEgPSB7XG4gICAgICAgIHR5cGU6IGNvbnZlcnNhdGlvblF1ZXVlSm9iRW51bS5lbnVtLlJlYWN0aW9uLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICBtZXNzYWdlSWQ6IHRoaXMuaWQsXG4gICAgICAgIHJldmlzaW9uOiBjb252ZXJzYXRpb24uZ2V0KCdyZXZpc2lvbicpLFxuICAgICAgfTtcbiAgICAgIGlmIChzaG91bGRQZXJzaXN0KSB7XG4gICAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbkpvYlF1ZXVlLmFkZChqb2JEYXRhLCBhc3luYyBqb2JUb0luc2VydCA9PiB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgZW5xdWV1ZVJlYWN0aW9uRm9yU2VuZDogc2F2aW5nIG1lc3NhZ2UgJHt0aGlzLmlkRm9yTG9nZ2luZygpfSBhbmQgam9iICR7XG4gICAgICAgICAgICAgIGpvYlRvSW5zZXJ0LmlkXG4gICAgICAgICAgICB9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKHRoaXMuYXR0cmlidXRlcywge1xuICAgICAgICAgICAgam9iVG9JbnNlcnQsXG4gICAgICAgICAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGF3YWl0IGNvbnZlcnNhdGlvbkpvYlF1ZXVlLmFkZChqb2JEYXRhKTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKHNob3VsZFBlcnNpc3QpIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZSh0aGlzLmF0dHJpYnV0ZXMsIHtcbiAgICAgICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGhhbmRsZURlbGV0ZUZvckV2ZXJ5b25lKFxuICAgIGRlbDogdHlwZW9mIHdpbmRvdy5XaGF0SXNUaGlzLFxuICAgIHNob3VsZFBlcnNpc3QgPSB0cnVlXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdIYW5kbGluZyBET0UuJywge1xuICAgICAgZnJvbUlkOiBkZWwuZ2V0KCdmcm9tSWQnKSxcbiAgICAgIHRhcmdldFNlbnRUaW1lc3RhbXA6IGRlbC5nZXQoJ3RhcmdldFNlbnRUaW1lc3RhbXAnKSxcbiAgICAgIG1lc3NhZ2VTZXJ2ZXJUaW1lc3RhbXA6IHRoaXMuZ2V0KCdzZXJ2ZXJUaW1lc3RhbXAnKSxcbiAgICAgIGRlbGV0ZVNlcnZlclRpbWVzdGFtcDogZGVsLmdldCgnc2VydmVyVGltZXN0YW1wJyksXG4gICAgfSk7XG5cbiAgICAvLyBSZW1vdmUgYW55IG5vdGlmaWNhdGlvbnMgZm9yIHRoaXMgbWVzc2FnZVxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2UucmVtb3ZlQnkoeyBtZXNzYWdlSWQ6IHRoaXMuZ2V0KCdpZCcpIH0pO1xuXG4gICAgLy8gRXJhc2UgdGhlIGNvbnRlbnRzIG9mIHRoaXMgbWVzc2FnZVxuICAgIGF3YWl0IHRoaXMuZXJhc2VDb250ZW50cyhcbiAgICAgIHsgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlLCByZWFjdGlvbnM6IFtdIH0sXG4gICAgICBzaG91bGRQZXJzaXN0XG4gICAgKTtcblxuICAgIC8vIFVwZGF0ZSB0aGUgY29udmVyc2F0aW9uJ3MgbGFzdCBtZXNzYWdlIGluIGNhc2UgdGhpcyB3YXMgdGhlIGxhc3QgbWVzc2FnZVxuICAgIHRoaXMuZ2V0Q29udmVyc2F0aW9uKCk/LnVwZGF0ZUxhc3RNZXNzYWdlKCk7XG4gIH1cblxuICBjbGVhck5vdGlmaWNhdGlvbnMocmVhY3Rpb246IFBhcnRpYWw8UmVhY3Rpb25UeXBlPiA9IHt9KTogdm9pZCB7XG4gICAgbm90aWZpY2F0aW9uU2VydmljZS5yZW1vdmVCeSh7XG4gICAgICAuLi5yZWFjdGlvbixcbiAgICAgIG1lc3NhZ2VJZDogdGhpcy5pZCxcbiAgICB9KTtcbiAgfVxufVxuXG53aW5kb3cuV2hpc3Blci5NZXNzYWdlID0gTWVzc2FnZU1vZGVsO1xuXG53aW5kb3cuV2hpc3Blci5NZXNzYWdlLmdldExvbmdNZXNzYWdlQXR0YWNobWVudCA9ICh7XG4gIGJvZHksXG4gIGF0dGFjaG1lbnRzLFxuICBub3csXG59KSA9PiB7XG4gIGlmICghYm9keSB8fCBib2R5Lmxlbmd0aCA8PSAyMDQ4KSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJvZHksXG4gICAgICBhdHRhY2htZW50cyxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgZGF0YSA9IEJ5dGVzLmZyb21TdHJpbmcoYm9keSk7XG4gIGNvbnN0IGF0dGFjaG1lbnQgPSB7XG4gICAgY29udGVudFR5cGU6IE1JTUUuTE9OR19NRVNTQUdFLFxuICAgIGZpbGVOYW1lOiBgbG9uZy1tZXNzYWdlLSR7bm93fS50eHRgLFxuICAgIGRhdGEsXG4gICAgc2l6ZTogZGF0YS5ieXRlTGVuZ3RoLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgYm9keTogYm9keS5zbGljZSgwLCAyMDQ4KSxcbiAgICBhdHRhY2htZW50czogW2F0dGFjaG1lbnQsIC4uLmF0dGFjaG1lbnRzXSxcbiAgfTtcbn07XG5cbndpbmRvdy5XaGlzcGVyLk1lc3NhZ2VDb2xsZWN0aW9uID0gd2luZG93LkJhY2tib25lLkNvbGxlY3Rpb24uZXh0ZW5kKHtcbiAgbW9kZWw6IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2UsXG4gIGNvbXBhcmF0b3IobGVmdDogUmVhZG9ubHk8TWVzc2FnZU1vZGVsPiwgcmlnaHQ6IFJlYWRvbmx5PE1lc3NhZ2VNb2RlbD4pIHtcbiAgICBpZiAobGVmdC5nZXQoJ3JlY2VpdmVkX2F0JykgPT09IHJpZ2h0LmdldCgncmVjZWl2ZWRfYXQnKSkge1xuICAgICAgcmV0dXJuIChsZWZ0LmdldCgnc2VudF9hdCcpIHx8IDApIC0gKHJpZ2h0LmdldCgnc2VudF9hdCcpIHx8IDApO1xuICAgIH1cblxuICAgIHJldHVybiAobGVmdC5nZXQoJ3JlY2VpdmVkX2F0JykgfHwgMCkgLSAocmlnaHQuZ2V0KCdyZWNlaXZlZF9hdCcpIHx8IDApO1xuICB9LFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXNFO0FBU3RFLHVCQU9PO0FBRVAsc0JBQXlCO0FBQ3pCLDRCQUErQjtBQUMvQixvQkFBeUM7QUFDekMsOEJBQWlDO0FBQ2pDLHNCQUF5QjtBQU16QixpQ0FBMkM7QUFPM0Msb0JBQXNDO0FBQ3RDLHNCQUFpQztBQUNqQywyQkFBaUM7QUFHakMsa0JBQStCO0FBQy9CLG1CQUE4QjtBQUM5QixlQUEwQjtBQUMxQixhQUF3QjtBQUN4QixzQkFBaUM7QUFFakMsd0JBQWlDO0FBQ2pDLGlCQUE0QjtBQUM1QixrQkFBaUM7QUFDakMsV0FBc0I7QUFDdEIsa0JBQTZCO0FBQzdCLCtCQUEyQjtBQUUzQiw4QkFPTztBQUNQLHFDQUF3QztBQUN4Qyx5Q0FBNEM7QUFDNUMsb0JBQXVCO0FBQ3ZCLDRCQUFxQztBQUNyQyw2QkFBZ0M7QUFDaEMsb0NBTU87QUFDUCwrQkFBa0M7QUFDbEMsNEJBQStCO0FBQy9CLGtDQUFxQztBQUNyQyxxQkF3Qk87QUFDUCxxQkFJTztBQUNQLHNCQUFtQztBQUNuQywyQkFBNEM7QUFDNUMsNkJBR087QUFDUCxxQkFBd0I7QUFFeEIsdUJBQTBCO0FBQzFCLDRCQUErQjtBQUMvQix1QkFBMEI7QUFDMUIsdUJBQTBCO0FBQzFCLCtCQUFrQztBQUNsQyxrQkFBNkI7QUFDN0Isc0JBQXVDO0FBQ3ZDLGtDQUdPO0FBQ1AsMkJBQW9DO0FBRXBDLFVBQXFCO0FBQ3JCLFlBQXVCO0FBQ3ZCLG9CQUE0QjtBQUM1QixxQkFBa0Q7QUFDbEQscUJBT087QUFFUCxrQ0FBcUM7QUFDckMs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
