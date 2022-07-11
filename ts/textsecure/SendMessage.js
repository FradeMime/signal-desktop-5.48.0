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
var SendMessage_exports = {};
__export(SendMessage_exports, {
  default: () => MessageSender,
  singleProtoJobDataSchema: () => singleProtoJobDataSchema
});
module.exports = __toCommonJS(SendMessage_exports);
var import_zod = require("zod");
var import_long = __toESM(require("long"));
var import_p_queue = __toESM(require("p-queue"));
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_SignalProtocolStore = require("../SignalProtocolStore");
var import_assert = require("../util/assert");
var import_parseIntOrThrow = require("../util/parseIntOrThrow");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_LibSignalStores = require("../LibSignalStores");
var import_MIME = require("../types/MIME");
var import_TaskWithTimeout = __toESM(require("./TaskWithTimeout"));
var import_OutgoingMessage = __toESM(require("./OutgoingMessage"));
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_Errors = require("./Errors");
var import_iterables = require("../util/iterables");
var import_handleMessageSend = require("../util/handleMessageSend");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var import_EmbeddedContact = require("../types/EmbeddedContact");
const singleProtoJobDataSchema = import_zod.z.object({
  contentHint: import_zod.z.number(),
  identifier: import_zod.z.string(),
  isSyncMessage: import_zod.z.boolean(),
  messageIds: import_zod.z.array(import_zod.z.string()).optional(),
  protoBase64: import_zod.z.string(),
  type: import_handleMessageSend.sendTypesEnum
});
function makeAttachmentSendReady(attachment) {
  const { data } = attachment;
  if (!data) {
    throw new Error("makeAttachmentSendReady: Missing data, returning undefined");
  }
  return {
    ...attachment,
    contentType: (0, import_MIME.MIMETypeToString)(attachment.contentType),
    data
  };
}
class Message {
  constructor(options) {
    this.attachmentPointers = [];
    this.attachments = options.attachments || [];
    this.body = options.body;
    this.contact = options.contact;
    this.expireTimer = options.expireTimer;
    this.flags = options.flags;
    this.group = options.group;
    this.groupV2 = options.groupV2;
    this.needsSync = options.needsSync;
    this.preview = options.preview;
    this.profileKey = options.profileKey;
    this.quote = options.quote;
    this.recipients = options.recipients;
    this.sticker = options.sticker;
    this.reaction = options.reaction;
    this.timestamp = options.timestamp;
    this.deletedForEveryoneTimestamp = options.deletedForEveryoneTimestamp;
    this.mentions = options.mentions;
    this.groupCallUpdate = options.groupCallUpdate;
    this.storyContext = options.storyContext;
    if (!(this.recipients instanceof Array)) {
      throw new Error("Invalid recipient list");
    }
    if (!this.group && !this.groupV2 && this.recipients.length !== 1) {
      throw new Error("Invalid recipient list for non-group");
    }
    if (typeof this.timestamp !== "number") {
      throw new Error("Invalid timestamp");
    }
    if (this.expireTimer !== void 0 && this.expireTimer !== null) {
      if (typeof this.expireTimer !== "number" || !(this.expireTimer >= 0)) {
        throw new Error("Invalid expireTimer");
      }
    }
    if (this.attachments) {
      if (!(this.attachments instanceof Array)) {
        throw new Error("Invalid message attachments");
      }
    }
    if (this.flags !== void 0) {
      if (typeof this.flags !== "number") {
        throw new Error("Invalid message flags");
      }
    }
    if (this.isEndSession()) {
      if (this.body !== null || this.group !== null || this.attachments.length !== 0) {
        throw new Error("Invalid end session message");
      }
    } else {
      if (typeof this.timestamp !== "number" || this.body && typeof this.body !== "string") {
        throw new Error("Invalid message body");
      }
      if (this.group) {
        if (typeof this.group.id !== "string" || typeof this.group.type !== "number") {
          throw new Error("Invalid group context");
        }
      }
    }
  }
  isEndSession() {
    return (this.flags || 0) & import_protobuf.SignalService.DataMessage.Flags.END_SESSION;
  }
  toProto() {
    if (this.dataMessage) {
      return this.dataMessage;
    }
    const proto = new import_protobuf.SignalService.DataMessage();
    proto.timestamp = import_long.default.fromNumber(this.timestamp);
    proto.attachments = this.attachmentPointers;
    if (this.body) {
      proto.body = this.body;
      const mentionCount = this.mentions ? this.mentions.length : 0;
      const placeholders = this.body.match(/\uFFFC/g);
      const placeholderCount = placeholders ? placeholders.length : 0;
      log.info(`Sending a message with ${mentionCount} mentions and ${placeholderCount} placeholders`);
    }
    if (this.flags) {
      proto.flags = this.flags;
    }
    if (this.groupV2) {
      proto.groupV2 = new import_protobuf.SignalService.GroupContextV2();
      proto.groupV2.masterKey = this.groupV2.masterKey;
      proto.groupV2.revision = this.groupV2.revision;
      proto.groupV2.groupChange = this.groupV2.groupChange || null;
    } else if (this.group) {
      proto.group = new import_protobuf.SignalService.GroupContext();
      proto.group.id = Bytes.fromString(this.group.id);
      proto.group.type = this.group.type;
    }
    if (this.sticker) {
      proto.sticker = new import_protobuf.SignalService.DataMessage.Sticker();
      proto.sticker.packId = Bytes.fromHex(this.sticker.packId);
      proto.sticker.packKey = Bytes.fromBase64(this.sticker.packKey);
      proto.sticker.stickerId = this.sticker.stickerId;
      proto.sticker.emoji = this.sticker.emoji;
      if (this.sticker.attachmentPointer) {
        proto.sticker.data = this.sticker.attachmentPointer;
      }
    }
    if (this.reaction) {
      proto.reaction = new import_protobuf.SignalService.DataMessage.Reaction();
      proto.reaction.emoji = this.reaction.emoji || null;
      proto.reaction.remove = this.reaction.remove || false;
      proto.reaction.targetAuthorUuid = this.reaction.targetAuthorUuid || null;
      proto.reaction.targetTimestamp = this.reaction.targetTimestamp === void 0 ? null : import_long.default.fromNumber(this.reaction.targetTimestamp);
    }
    if (Array.isArray(this.preview)) {
      proto.preview = this.preview.map((preview) => {
        const item = new import_protobuf.SignalService.DataMessage.Preview();
        item.title = preview.title;
        item.url = preview.url;
        item.description = preview.description || null;
        item.date = preview.date || null;
        if (preview.attachmentPointer) {
          item.image = preview.attachmentPointer;
        }
        return item;
      });
    }
    if (Array.isArray(this.contact)) {
      proto.contact = this.contact.map((contact) => {
        const contactProto = new import_protobuf.SignalService.DataMessage.Contact();
        if (contact.name) {
          const nameProto = {
            givenName: contact.name.givenName,
            familyName: contact.name.familyName,
            prefix: contact.name.prefix,
            suffix: contact.name.suffix,
            middleName: contact.name.middleName,
            displayName: contact.name.displayName
          };
          contactProto.name = new import_protobuf.SignalService.DataMessage.Contact.Name(nameProto);
        }
        if (Array.isArray(contact.number)) {
          contactProto.number = contact.number.map((number) => {
            const numberProto = {
              value: number.value,
              type: (0, import_EmbeddedContact.numberToPhoneType)(number.type),
              label: number.label
            };
            return new import_protobuf.SignalService.DataMessage.Contact.Phone(numberProto);
          });
        }
        if (Array.isArray(contact.email)) {
          contactProto.email = contact.email.map((email) => {
            const emailProto = {
              value: email.value,
              type: (0, import_EmbeddedContact.numberToEmailType)(email.type),
              label: email.label
            };
            return new import_protobuf.SignalService.DataMessage.Contact.Email(emailProto);
          });
        }
        if (Array.isArray(contact.address)) {
          contactProto.address = contact.address.map((address) => {
            const addressProto = {
              type: (0, import_EmbeddedContact.numberToAddressType)(address.type),
              label: address.label,
              street: address.street,
              pobox: address.pobox,
              neighborhood: address.neighborhood,
              city: address.city,
              region: address.region,
              postcode: address.postcode,
              country: address.country
            };
            return new import_protobuf.SignalService.DataMessage.Contact.PostalAddress(addressProto);
          });
        }
        if (contact.avatar && contact.avatar.attachmentPointer) {
          const avatarProto = new import_protobuf.SignalService.DataMessage.Contact.Avatar();
          avatarProto.avatar = contact.avatar.attachmentPointer;
          avatarProto.isProfile = Boolean(contact.avatar.isProfile);
          contactProto.avatar = avatarProto;
        }
        if (contact.organization) {
          contactProto.organization = contact.organization;
        }
        return contactProto;
      });
    }
    if (this.quote) {
      const { QuotedAttachment } = import_protobuf.SignalService.DataMessage.Quote;
      const { BodyRange, Quote } = import_protobuf.SignalService.DataMessage;
      proto.quote = new Quote();
      const { quote } = proto;
      if (this.quote.isGiftBadge) {
        quote.type = import_protobuf.SignalService.DataMessage.Quote.Type.GIFT_BADGE;
      } else {
        quote.type = import_protobuf.SignalService.DataMessage.Quote.Type.NORMAL;
      }
      quote.id = this.quote.id === void 0 ? null : import_long.default.fromNumber(this.quote.id);
      quote.authorUuid = this.quote.authorUuid || null;
      quote.text = this.quote.text || null;
      quote.attachments = (this.quote.attachments || []).map((attachment) => {
        const quotedAttachment = new QuotedAttachment();
        quotedAttachment.contentType = attachment.contentType;
        if (attachment.fileName) {
          quotedAttachment.fileName = attachment.fileName;
        }
        if (attachment.attachmentPointer) {
          quotedAttachment.thumbnail = attachment.attachmentPointer;
        }
        return quotedAttachment;
      });
      const bodyRanges = this.quote.bodyRanges || [];
      quote.bodyRanges = bodyRanges.map((range) => {
        const bodyRange = new BodyRange();
        bodyRange.start = range.start;
        bodyRange.length = range.length;
        if (range.mentionUuid !== void 0) {
          bodyRange.mentionUuid = range.mentionUuid;
        }
        return bodyRange;
      });
      if (quote.bodyRanges.length && (!proto.requiredProtocolVersion || proto.requiredProtocolVersion < import_protobuf.SignalService.DataMessage.ProtocolVersion.MENTIONS)) {
        proto.requiredProtocolVersion = import_protobuf.SignalService.DataMessage.ProtocolVersion.MENTIONS;
      }
    }
    if (this.expireTimer) {
      proto.expireTimer = this.expireTimer;
    }
    if (this.profileKey) {
      proto.profileKey = this.profileKey;
    }
    if (this.deletedForEveryoneTimestamp) {
      proto.delete = {
        targetSentTimestamp: import_long.default.fromNumber(this.deletedForEveryoneTimestamp)
      };
    }
    if (this.mentions) {
      proto.requiredProtocolVersion = import_protobuf.SignalService.DataMessage.ProtocolVersion.MENTIONS;
      proto.bodyRanges = this.mentions.map(({ start, length, mentionUuid }) => ({
        start,
        length,
        mentionUuid
      }));
    }
    if (this.groupCallUpdate) {
      const { GroupCallUpdate } = import_protobuf.SignalService.DataMessage;
      const groupCallUpdate = new GroupCallUpdate();
      groupCallUpdate.eraId = this.groupCallUpdate.eraId;
      proto.groupCallUpdate = groupCallUpdate;
    }
    if (this.storyContext) {
      const { StoryContext } = import_protobuf.SignalService.DataMessage;
      const storyContext = new StoryContext();
      if (this.storyContext.authorUuid) {
        storyContext.authorUuid = this.storyContext.authorUuid;
      }
      storyContext.sentTimestamp = import_long.default.fromNumber(this.storyContext.timestamp);
      proto.storyContext = storyContext;
    }
    this.dataMessage = proto;
    return proto;
  }
  encode() {
    return import_protobuf.SignalService.DataMessage.encode(this.toProto()).finish();
  }
}
class MessageSender {
  constructor(server) {
    this.server = server;
    this.pendingMessages = {};
  }
  async queueJobForIdentifier(identifier, runJob) {
    const { id } = await window.ConversationController.getOrCreateAndWait(identifier, "private");
    this.pendingMessages[id] = this.pendingMessages[id] || new import_p_queue.default({ concurrency: 1 });
    const queue = this.pendingMessages[id];
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(runJob, `queueJobForIdentifier ${identifier} ${id}`);
    return queue.add(taskWithTimeout);
  }
  _getAttachmentSizeBucket(size) {
    return Math.max(541, Math.floor(1.05 ** Math.ceil(Math.log(size) / Math.log(1.05))));
  }
  static getRandomPadding() {
    const buffer = (0, import_Crypto.getRandomBytes)(2);
    const paddingLength = (new Uint16Array(buffer)[0] & 511) + 1;
    return (0, import_Crypto.getRandomBytes)(paddingLength);
  }
  getPaddedAttachment(data) {
    const size = data.byteLength;
    const paddedSize = this._getAttachmentSizeBucket(size);
    const padding = (0, import_Crypto.getZeroes)(paddedSize - size);
    return Bytes.concatenate([data, padding]);
  }
  async makeAttachmentPointer(attachment) {
    (0, import_assert.assert)(typeof attachment === "object" && attachment !== null, "Got null attachment in `makeAttachmentPointer`");
    const { data, size, contentType } = attachment;
    if (!(data instanceof Uint8Array)) {
      throw new Error(`makeAttachmentPointer: data was a '${typeof data}' instead of Uint8Array`);
    }
    if (data.byteLength !== size) {
      throw new Error(`makeAttachmentPointer: Size ${size} did not match data.byteLength ${data.byteLength}`);
    }
    if (typeof contentType !== "string") {
      throw new Error(`makeAttachmentPointer: contentType ${contentType} was not a string`);
    }
    const padded = this.getPaddedAttachment(data);
    const key = (0, import_Crypto.getRandomBytes)(64);
    const iv = (0, import_Crypto.getRandomBytes)(16);
    const result = (0, import_Crypto.encryptAttachment)(padded, key, iv);
    const id = await this.server.putAttachment(result.ciphertext);
    const proto = new import_protobuf.SignalService.AttachmentPointer();
    proto.cdnId = import_long.default.fromString(id);
    proto.contentType = attachment.contentType;
    proto.key = key;
    proto.size = data.byteLength;
    proto.digest = result.digest;
    if (attachment.fileName) {
      proto.fileName = attachment.fileName;
    }
    if (attachment.flags) {
      proto.flags = attachment.flags;
    }
    if (attachment.width) {
      proto.width = attachment.width;
    }
    if (attachment.height) {
      proto.height = attachment.height;
    }
    if (attachment.caption) {
      proto.caption = attachment.caption;
    }
    if (attachment.blurHash) {
      proto.blurHash = attachment.blurHash;
    }
    return proto;
  }
  async uploadAttachments(message) {
    try {
      message.attachmentPointers = await Promise.all(message.attachments.map((attachment) => this.makeAttachmentPointer(attachment)));
    } catch (error) {
      if (error instanceof import_Errors.HTTPError) {
        throw new import_Errors.MessageError(message, error);
      } else {
        throw error;
      }
    }
  }
  async uploadLinkPreviews(message) {
    try {
      const preview = await Promise.all((message.preview || []).map(async (item) => {
        if (!item.image) {
          return item;
        }
        const attachment = makeAttachmentSendReady(item.image);
        if (!attachment) {
          return item;
        }
        return {
          ...item,
          attachmentPointer: await this.makeAttachmentPointer(attachment)
        };
      }));
      message.preview = preview;
    } catch (error) {
      if (error instanceof import_Errors.HTTPError) {
        throw new import_Errors.MessageError(message, error);
      } else {
        throw error;
      }
    }
  }
  async uploadSticker(message) {
    try {
      const { sticker } = message;
      if (!sticker) {
        return;
      }
      if (!sticker.data) {
        throw new Error("uploadSticker: No sticker data to upload!");
      }
      message.sticker = {
        ...sticker,
        attachmentPointer: await this.makeAttachmentPointer(sticker.data)
      };
    } catch (error) {
      if (error instanceof import_Errors.HTTPError) {
        throw new import_Errors.MessageError(message, error);
      } else {
        throw error;
      }
    }
  }
  async uploadContactAvatar(message) {
    const { contact } = message;
    if (!contact || contact.length === 0) {
      return;
    }
    try {
      await Promise.all(contact.map(async (item) => {
        const itemAvatar = item?.avatar;
        const avatar = itemAvatar?.avatar;
        if (!itemAvatar || !avatar || !avatar.data) {
          return;
        }
        const attachment = makeAttachmentSendReady(avatar);
        if (!attachment) {
          return;
        }
        itemAvatar.attachmentPointer = await this.makeAttachmentPointer(attachment);
      }));
    } catch (error) {
      if (error instanceof import_Errors.HTTPError) {
        throw new import_Errors.MessageError(message, error);
      } else {
        throw error;
      }
    }
  }
  async uploadThumbnails(message) {
    const { quote } = message;
    if (!quote || !quote.attachments || quote.attachments.length === 0) {
      return;
    }
    try {
      await Promise.all(quote.attachments.map(async (attachment) => {
        if (!attachment.thumbnail) {
          return;
        }
        attachment.attachmentPointer = await this.makeAttachmentPointer(attachment.thumbnail);
      }));
    } catch (error) {
      if (error instanceof import_Errors.HTTPError) {
        throw new import_Errors.MessageError(message, error);
      } else {
        throw error;
      }
    }
  }
  async getDataMessage(options) {
    const message = await this.getHydratedMessage(options);
    return message.encode();
  }
  async getContentMessage(options) {
    const message = await this.getHydratedMessage(options);
    const dataMessage = message.toProto();
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.dataMessage = dataMessage;
    return contentMessage;
  }
  async getHydratedMessage(attributes) {
    const message = new Message(attributes);
    await Promise.all([
      this.uploadAttachments(message),
      this.uploadContactAvatar(message),
      this.uploadThumbnails(message),
      this.uploadLinkPreviews(message),
      this.uploadSticker(message)
    ]);
    return message;
  }
  getTypingContentMessage(options) {
    const ACTION_ENUM = import_protobuf.SignalService.TypingMessage.Action;
    const { recipientId, groupId, isTyping, timestamp } = options;
    if (!recipientId && !groupId) {
      throw new Error("getTypingContentMessage: Need to provide either recipientId or groupId!");
    }
    const finalTimestamp = timestamp || Date.now();
    const action = isTyping ? ACTION_ENUM.STARTED : ACTION_ENUM.STOPPED;
    const typingMessage = new import_protobuf.SignalService.TypingMessage();
    if (groupId) {
      typingMessage.groupId = groupId;
    }
    typingMessage.action = action;
    typingMessage.timestamp = import_long.default.fromNumber(finalTimestamp);
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.typingMessage = typingMessage;
    return contentMessage;
  }
  getAttrsFromGroupOptions(options) {
    const {
      attachments,
      contact,
      deletedForEveryoneTimestamp,
      expireTimer,
      flags,
      groupCallUpdate,
      groupV1,
      groupV2,
      mentions,
      messageText,
      preview,
      profileKey,
      quote,
      reaction,
      sticker,
      storyContext,
      timestamp
    } = options;
    if (!groupV1 && !groupV2) {
      throw new Error("getAttrsFromGroupOptions: Neither group1 nor groupv2 information provided!");
    }
    const myE164 = window.textsecure.storage.user.getNumber();
    const myUuid = window.textsecure.storage.user.getUuid()?.toString();
    const groupMembers = groupV2?.members || groupV1?.members || [];
    let isNotMe;
    if (myUuid) {
      isNotMe = /* @__PURE__ */ __name((r) => r !== myE164 && r !== myUuid.toString(), "isNotMe");
    } else {
      isNotMe = /* @__PURE__ */ __name((r) => r !== myE164, "isNotMe");
    }
    const blockedIdentifiers = new Set((0, import_iterables.concat)(window.storage.blocked.getBlockedUuids(), window.storage.blocked.getBlockedNumbers()));
    const recipients = groupMembers.filter((recipient) => isNotMe(recipient) && !blockedIdentifiers.has(recipient));
    return {
      attachments,
      body: messageText,
      contact,
      deletedForEveryoneTimestamp,
      expireTimer,
      flags,
      groupCallUpdate,
      groupV2,
      group: groupV1 ? {
        id: groupV1.id,
        type: import_protobuf.SignalService.GroupContext.Type.DELIVER
      } : void 0,
      mentions,
      preview,
      profileKey,
      quote,
      reaction,
      recipients,
      sticker,
      storyContext,
      timestamp
    };
  }
  static createSyncMessage() {
    const syncMessage = new import_protobuf.SignalService.SyncMessage();
    syncMessage.padding = this.getRandomPadding();
    return syncMessage;
  }
  async sendMessage({
    messageOptions,
    contentHint,
    groupId,
    options
  }) {
    const message = await this.getHydratedMessage(messageOptions);
    return new Promise((resolve, reject) => {
      this.sendMessageProto({
        callback: (res) => {
          if (res.errors && res.errors.length > 0) {
            reject(new import_Errors.SendMessageProtoError(res));
          } else {
            resolve(res);
          }
        },
        contentHint,
        groupId,
        options,
        proto: message.toProto(),
        recipients: message.recipients || [],
        timestamp: message.timestamp
      });
    });
  }
  sendMessageProto({
    callback,
    contentHint,
    groupId,
    options,
    proto,
    recipients,
    sendLogCallback,
    timestamp
  }) {
    const rejections = window.textsecure.storage.get("signedKeyRotationRejected", 0);
    if (rejections > 5) {
      throw new import_Errors.SignedPreKeyRotationError();
    }
    const outgoing = new import_OutgoingMessage.default({
      callback,
      contentHint,
      groupId,
      identifiers: recipients,
      message: proto,
      options,
      sendLogCallback,
      server: this.server,
      timestamp
    });
    recipients.forEach((identifier) => {
      this.queueJobForIdentifier(identifier, async () => outgoing.sendToIdentifier(identifier));
    });
  }
  async sendMessageProtoAndWait({
    timestamp,
    recipients,
    proto,
    contentHint,
    groupId,
    options
  }) {
    return new Promise((resolve, reject) => {
      const callback = /* @__PURE__ */ __name((result) => {
        if (result && result.errors && result.errors.length > 0) {
          reject(new import_Errors.SendMessageProtoError(result));
          return;
        }
        resolve(result);
      }, "callback");
      this.sendMessageProto({
        callback,
        contentHint,
        groupId,
        options,
        proto,
        recipients,
        timestamp
      });
    });
  }
  async sendIndividualProto({
    contentHint,
    groupId,
    identifier,
    options,
    proto,
    timestamp
  }) {
    (0, import_assert.assert)(identifier, "Identifier can't be undefined");
    return new Promise((resolve, reject) => {
      const callback = /* @__PURE__ */ __name((res) => {
        if (res && res.errors && res.errors.length > 0) {
          reject(new import_Errors.SendMessageProtoError(res));
        } else {
          resolve(res);
        }
      }, "callback");
      this.sendMessageProto({
        callback,
        contentHint,
        groupId,
        options,
        proto,
        recipients: [identifier],
        timestamp
      });
    });
  }
  async sendMessageToIdentifier({
    attachments,
    contact,
    contentHint,
    deletedForEveryoneTimestamp,
    expireTimer,
    groupId,
    identifier,
    messageText,
    options,
    preview,
    profileKey,
    quote,
    reaction,
    sticker,
    storyContext,
    timestamp
  }) {
    return this.sendMessage({
      messageOptions: {
        attachments,
        body: messageText,
        contact,
        deletedForEveryoneTimestamp,
        expireTimer,
        preview,
        profileKey,
        quote,
        reaction,
        recipients: [identifier],
        sticker,
        storyContext,
        timestamp
      },
      contentHint,
      groupId,
      options
    });
  }
  async sendSyncMessage({
    encodedDataMessage,
    timestamp,
    destination,
    destinationUuid,
    expirationStartTimestamp,
    conversationIdsSentTo = [],
    conversationIdsWithSealedSender = /* @__PURE__ */ new Set(),
    isUpdate,
    options
  }) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const dataMessage = import_protobuf.SignalService.DataMessage.decode(encodedDataMessage);
    const sentMessage = new import_protobuf.SignalService.SyncMessage.Sent();
    sentMessage.timestamp = import_long.default.fromNumber(timestamp);
    sentMessage.message = dataMessage;
    if (destination) {
      sentMessage.destination = destination;
    }
    if (destinationUuid) {
      sentMessage.destinationUuid = destinationUuid;
    }
    if (expirationStartTimestamp) {
      sentMessage.expirationStartTimestamp = import_long.default.fromNumber(expirationStartTimestamp);
    }
    if (isUpdate) {
      sentMessage.isRecipientUpdate = true;
    }
    if (!(0, import_iterables.isEmpty)(conversationIdsSentTo)) {
      sentMessage.unidentifiedStatus = [
        ...(0, import_iterables.map)(conversationIdsSentTo, (conversationId) => {
          const status = new import_protobuf.SignalService.SyncMessage.Sent.UnidentifiedDeliveryStatus();
          const conv = window.ConversationController.get(conversationId);
          if (conv) {
            const e164 = conv.get("e164");
            if (e164) {
              status.destination = e164;
            }
            const uuid = conv.get("uuid");
            if (uuid) {
              status.destinationUuid = uuid;
            }
          }
          status.unidentified = conversationIdsWithSealedSender.has(conversationId);
          return status;
        })
      ];
    }
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.sent = sentMessage;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendIndividualProto({
      identifier: myUuid.toString(),
      proto: contentMessage,
      timestamp,
      contentHint: ContentHint.RESENDABLE,
      options
    });
  }
  static getRequestBlockSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.BLOCKED;
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "blockSyncRequest"
    };
  }
  static getRequestConfigurationSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.CONFIGURATION;
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "configurationSyncRequest"
    };
  }
  static getRequestGroupSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.GROUPS;
    const syncMessage = this.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "groupSyncRequest"
    };
  }
  static getRequestContactSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.CONTACTS;
    const syncMessage = this.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "contactSyncRequest"
    };
  }
  static getRequestPniIdentitySyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.PNI_IDENTITY;
    const syncMessage = this.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "pniIdentitySyncRequest"
    };
  }
  static getFetchManifestSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const fetchLatest = new import_protobuf.SignalService.SyncMessage.FetchLatest();
    fetchLatest.type = import_protobuf.SignalService.SyncMessage.FetchLatest.Type.STORAGE_MANIFEST;
    const syncMessage = this.createSyncMessage();
    syncMessage.fetchLatest = fetchLatest;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "fetchLatestManifestSync"
    };
  }
  static getFetchLocalProfileSyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const fetchLatest = new import_protobuf.SignalService.SyncMessage.FetchLatest();
    fetchLatest.type = import_protobuf.SignalService.SyncMessage.FetchLatest.Type.LOCAL_PROFILE;
    const syncMessage = this.createSyncMessage();
    syncMessage.fetchLatest = fetchLatest;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "fetchLocalProfileSync"
    };
  }
  static getRequestKeySyncMessage() {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const request = new import_protobuf.SignalService.SyncMessage.Request();
    request.type = import_protobuf.SignalService.SyncMessage.Request.Type.KEYS;
    const syncMessage = this.createSyncMessage();
    syncMessage.request = request;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "keySyncRequest"
    };
  }
  async syncReadMessages(reads, options) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.read = [];
    for (let i = 0; i < reads.length; i += 1) {
      const proto = new import_protobuf.SignalService.SyncMessage.Read({
        ...reads[i],
        timestamp: import_long.default.fromNumber(reads[i].timestamp)
      });
      syncMessage.read.push(proto);
    }
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendIndividualProto({
      identifier: myUuid.toString(),
      proto: contentMessage,
      timestamp: Date.now(),
      contentHint: ContentHint.RESENDABLE,
      options
    });
  }
  async syncView(views, options) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.viewed = views.map((view) => new import_protobuf.SignalService.SyncMessage.Viewed({
      ...view,
      timestamp: import_long.default.fromNumber(view.timestamp)
    }));
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendIndividualProto({
      identifier: myUuid.toString(),
      proto: contentMessage,
      timestamp: Date.now(),
      contentHint: ContentHint.RESENDABLE,
      options
    });
  }
  async syncViewOnceOpen(viewOnceOpens, options) {
    if (viewOnceOpens.length !== 1) {
      throw new Error(`syncViewOnceOpen: ${viewOnceOpens.length} opens provided. Can only handle one.`);
    }
    const { senderE164, senderUuid, timestamp } = viewOnceOpens[0];
    if (!senderUuid) {
      throw new Error("syncViewOnceOpen: Missing senderUuid");
    }
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const syncMessage = MessageSender.createSyncMessage();
    const viewOnceOpen = new import_protobuf.SignalService.SyncMessage.ViewOnceOpen();
    if (senderE164 !== void 0) {
      viewOnceOpen.sender = senderE164;
    }
    viewOnceOpen.senderUuid = senderUuid;
    viewOnceOpen.timestamp = import_long.default.fromNumber(timestamp);
    syncMessage.viewOnceOpen = viewOnceOpen;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendIndividualProto({
      identifier: myUuid.toString(),
      proto: contentMessage,
      timestamp: Date.now(),
      contentHint: ContentHint.RESENDABLE,
      options
    });
  }
  static getMessageRequestResponseSync(options) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const syncMessage = MessageSender.createSyncMessage();
    const response = new import_protobuf.SignalService.SyncMessage.MessageRequestResponse();
    if (options.threadE164 !== void 0) {
      response.threadE164 = options.threadE164;
    }
    if (options.threadUuid !== void 0) {
      response.threadUuid = options.threadUuid;
    }
    if (options.groupId) {
      response.groupId = options.groupId;
    }
    response.type = options.type;
    syncMessage.messageRequestResponse = response;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "messageRequestSync"
    };
  }
  static getStickerPackSync(operations) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    const ENUM = import_protobuf.SignalService.SyncMessage.StickerPackOperation.Type;
    const packOperations = operations.map((item) => {
      const { packId, packKey, installed } = item;
      const operation = new import_protobuf.SignalService.SyncMessage.StickerPackOperation();
      operation.packId = Bytes.fromHex(packId);
      operation.packKey = Bytes.fromBase64(packKey);
      operation.type = installed ? ENUM.INSTALL : ENUM.REMOVE;
      return operation;
    });
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.stickerPackOperation = packOperations;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "stickerPackSync"
    };
  }
  static getVerificationSync(destinationE164, destinationUuid, state, identityKey) {
    const myUuid = window.textsecure.storage.user.getCheckedUuid();
    if (!destinationE164 && !destinationUuid) {
      throw new Error("syncVerification: Neither e164 nor UUID were provided");
    }
    const padding = MessageSender.getRandomPadding();
    const verified = new import_protobuf.SignalService.Verified();
    verified.state = state;
    if (destinationE164) {
      verified.destination = destinationE164;
    }
    if (destinationUuid) {
      verified.destinationUuid = destinationUuid;
    }
    verified.identityKey = identityKey;
    verified.nullMessage = padding;
    const syncMessage = MessageSender.createSyncMessage();
    syncMessage.verified = verified;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.syncMessage = syncMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier: myUuid.toString(),
      isSyncMessage: true,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "verificationSync"
    };
  }
  async sendCallingMessage(recipientId, callingMessage, options) {
    const recipients = [recipientId];
    const finalTimestamp = Date.now();
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.callingMessage = callingMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendMessageProtoAndWait({
      timestamp: finalTimestamp,
      recipients,
      proto: contentMessage,
      contentHint: ContentHint.DEFAULT,
      groupId: void 0,
      options
    });
  }
  async sendDeliveryReceipt(options) {
    return this.sendReceiptMessage({
      ...options,
      type: import_protobuf.SignalService.ReceiptMessage.Type.DELIVERY
    });
  }
  async sendReadReceipt(options) {
    return this.sendReceiptMessage({
      ...options,
      type: import_protobuf.SignalService.ReceiptMessage.Type.READ
    });
  }
  async sendViewedReceipt(options) {
    return this.sendReceiptMessage({
      ...options,
      type: import_protobuf.SignalService.ReceiptMessage.Type.VIEWED
    });
  }
  async sendReceiptMessage({
    senderE164,
    senderUuid,
    timestamps,
    type,
    options
  }) {
    if (!senderUuid && !senderE164) {
      throw new Error("sendReceiptMessage: Neither uuid nor e164 was provided!");
    }
    const receiptMessage = new import_protobuf.SignalService.ReceiptMessage();
    receiptMessage.type = type;
    receiptMessage.timestamp = timestamps.map((timestamp) => import_long.default.fromNumber(timestamp));
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.receiptMessage = receiptMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendIndividualProto({
      identifier: senderUuid || senderE164,
      proto: contentMessage,
      timestamp: Date.now(),
      contentHint: ContentHint.RESENDABLE,
      options
    });
  }
  static getNullMessage({
    uuid,
    e164,
    padding
  }) {
    const nullMessage = new import_protobuf.SignalService.NullMessage();
    const identifier = uuid || e164;
    if (!identifier) {
      throw new Error("sendNullMessage: Got neither uuid nor e164!");
    }
    nullMessage.padding = padding || MessageSender.getRandomPadding();
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.nullMessage = nullMessage;
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return {
      contentHint: ContentHint.RESENDABLE,
      identifier,
      isSyncMessage: false,
      protoBase64: Bytes.toBase64(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      type: "nullMessage"
    };
  }
  async sendRetryRequest({
    groupId,
    options,
    plaintext,
    uuid
  }) {
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    return this.sendMessageProtoAndWait({
      timestamp: Date.now(),
      recipients: [uuid],
      proto: plaintext,
      contentHint: ContentHint.DEFAULT,
      groupId,
      options
    });
  }
  makeSendLogCallback({
    contentHint,
    messageId,
    proto,
    sendType,
    timestamp
  }) {
    let initialSavePromise;
    return async ({
      identifier,
      deviceIds
    }) => {
      if (!(0, import_handleMessageSend.shouldSaveProto)(sendType)) {
        return;
      }
      const conversation = window.ConversationController.get(identifier);
      if (!conversation) {
        log.warn(`makeSendLogCallback: Unable to find conversation for identifier ${identifier}`);
        return;
      }
      const recipientUuid = conversation.get("uuid");
      if (!recipientUuid) {
        log.warn(`makeSendLogCallback: Conversation ${conversation.idForLogging()} had no UUID`);
        return;
      }
      if (!initialSavePromise) {
        initialSavePromise = window.Signal.Data.insertSentProto({
          timestamp,
          proto,
          contentHint
        }, {
          recipients: { [recipientUuid]: deviceIds },
          messageIds: messageId ? [messageId] : []
        });
        await initialSavePromise;
      } else {
        const id = await initialSavePromise;
        await window.Signal.Data.insertProtoRecipients({
          id,
          recipientUuid,
          deviceIds
        });
      }
    };
  }
  async sendGroupProto({
    contentHint,
    groupId,
    options,
    proto,
    recipients,
    sendLogCallback,
    timestamp = Date.now()
  }) {
    const myE164 = window.textsecure.storage.user.getNumber();
    const myUuid = window.textsecure.storage.user.getUuid()?.toString();
    const identifiers = recipients.filter((id) => id !== myE164 && id !== myUuid);
    if (identifiers.length === 0) {
      const dataMessage = proto.dataMessage ? import_protobuf.SignalService.DataMessage.encode(proto.dataMessage).finish() : void 0;
      return Promise.resolve({
        dataMessage,
        errors: [],
        failoverIdentifiers: [],
        successfulIdentifiers: [],
        unidentifiedDeliveries: []
      });
    }
    return new Promise((resolve, reject) => {
      const callback = /* @__PURE__ */ __name((res) => {
        if (res.errors && res.errors.length > 0) {
          reject(new import_Errors.SendMessageProtoError(res));
        } else {
          resolve(res);
        }
      }, "callback");
      this.sendMessageProto({
        callback,
        contentHint,
        groupId,
        options,
        proto,
        recipients: identifiers,
        sendLogCallback,
        timestamp
      });
    });
  }
  async getSenderKeyDistributionMessage(distributionId, {
    throwIfNotInDatabase,
    timestamp
  }) {
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const ourDeviceId = (0, import_parseIntOrThrow.parseIntOrThrow)(window.textsecure.storage.user.getDeviceId(), "getSenderKeyDistributionMessage");
    const protocolAddress = import_libsignal_client.ProtocolAddress.new(ourUuid.toString(), ourDeviceId);
    const address = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(ourUuid, ourDeviceId));
    const senderKeyDistributionMessage = await window.textsecure.storage.protocol.enqueueSenderKeyJob(address, async () => {
      const senderKeyStore = new import_LibSignalStores.SenderKeys({ ourUuid, zone: import_SignalProtocolStore.GLOBAL_ZONE });
      if (throwIfNotInDatabase) {
        const key = await senderKeyStore.getSenderKey(protocolAddress, distributionId);
        if (!key) {
          throw new Error(`getSenderKeyDistributionMessage: Distribution ${distributionId} was not in database as expected`);
        }
      }
      return import_libsignal_client.SenderKeyDistributionMessage.create(protocolAddress, distributionId, senderKeyStore);
    });
    log.info(`getSenderKeyDistributionMessage: Building ${distributionId} with timestamp ${timestamp}`);
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.senderKeyDistributionMessage = senderKeyDistributionMessage.serialize();
    return contentMessage;
  }
  async sendSenderKeyDistributionMessage({
    contentHint,
    distributionId,
    groupId,
    identifiers,
    throwIfNotInDatabase
  }, options) {
    const timestamp = Date.now();
    const contentMessage = await this.getSenderKeyDistributionMessage(distributionId, {
      throwIfNotInDatabase,
      timestamp
    });
    const sendLogCallback = identifiers.length > 1 ? this.makeSendLogCallback({
      contentHint,
      proto: Buffer.from(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      sendType: "senderKeyDistributionMessage",
      timestamp
    }) : void 0;
    return this.sendGroupProto({
      contentHint,
      groupId,
      options,
      proto: contentMessage,
      recipients: identifiers,
      sendLogCallback,
      timestamp
    });
  }
  async leaveGroup(groupId, groupIdentifiers, options) {
    const timestamp = Date.now();
    const proto = new import_protobuf.SignalService.Content({
      dataMessage: {
        group: {
          id: Bytes.fromString(groupId),
          type: import_protobuf.SignalService.GroupContext.Type.QUIT
        }
      }
    });
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    const contentHint = ContentHint.RESENDABLE;
    const sendLogCallback = groupIdentifiers.length > 1 ? this.makeSendLogCallback({
      contentHint,
      proto: Buffer.from(import_protobuf.SignalService.Content.encode(proto).finish()),
      sendType: "legacyGroupChange",
      timestamp
    }) : void 0;
    return this.sendGroupProto({
      contentHint,
      groupId: void 0,
      options,
      proto,
      recipients: groupIdentifiers,
      sendLogCallback,
      timestamp
    });
  }
  async getProfile(uuid, options) {
    if (options.accessKey !== void 0) {
      return this.server.getProfileUnauth(uuid.toString(), options);
    }
    return this.server.getProfile(uuid.toString(), options);
  }
  async checkAccountExistence(uuid) {
    return this.server.checkAccountExistence(uuid);
  }
  async getProfileForUsername(username) {
    return this.server.getProfileForUsername(username);
  }
  async getUuidsForE164s(numbers) {
    return this.server.getUuidsForE164s(numbers);
  }
  async getUuidsForE164sV2(e164s, acis, accessKeys) {
    return this.server.getUuidsForE164sV2({
      e164s,
      acis,
      accessKeys
    });
  }
  async getAvatar(path) {
    return this.server.getAvatar(path);
  }
  async getSticker(packId, stickerId) {
    return this.server.getSticker(packId, stickerId);
  }
  async getStickerPackManifest(packId) {
    return this.server.getStickerPackManifest(packId);
  }
  async createGroup(group, options) {
    return this.server.createGroup(group, options);
  }
  async uploadGroupAvatar(avatar, options) {
    return this.server.uploadGroupAvatar(avatar, options);
  }
  async getGroup(options) {
    return this.server.getGroup(options);
  }
  async getGroupFromLink(groupInviteLink, auth) {
    return this.server.getGroupFromLink(groupInviteLink, auth);
  }
  async getGroupLog(options, credentials) {
    return this.server.getGroupLog(options, credentials);
  }
  async getGroupAvatar(key) {
    return this.server.getGroupAvatar(key);
  }
  async modifyGroup(changes, options, inviteLinkBase64) {
    return this.server.modifyGroup(changes, options, inviteLinkBase64);
  }
  async sendWithSenderKey(data, accessKeys, timestamp, online) {
    return this.server.sendWithSenderKey(data, accessKeys, timestamp, online);
  }
  async fetchLinkPreviewMetadata(href, abortSignal) {
    return this.server.fetchLinkPreviewMetadata(href, abortSignal);
  }
  async fetchLinkPreviewImage(href, abortSignal) {
    return this.server.fetchLinkPreviewImage(href, abortSignal);
  }
  async makeProxiedRequest(url, options) {
    return this.server.makeProxiedRequest(url, options);
  }
  async getStorageCredentials() {
    return this.server.getStorageCredentials();
  }
  async getStorageManifest(options) {
    return this.server.getStorageManifest(options);
  }
  async getStorageRecords(data, options) {
    return this.server.getStorageRecords(data, options);
  }
  async modifyStorageRecords(data, options) {
    return this.server.modifyStorageRecords(data, options);
  }
  async getGroupMembershipToken(options) {
    return this.server.getGroupExternalCredential(options);
  }
  async sendChallengeResponse(challengeResponse) {
    return this.server.sendChallengeResponse(challengeResponse);
  }
  async putProfile(jsonData) {
    return this.server.putProfile(jsonData);
  }
  async uploadAvatar(requestHeaders, avatarData) {
    return this.server.uploadAvatar(requestHeaders, avatarData);
  }
  async putUsername(username) {
    return this.server.putUsername(username);
  }
  async deleteUsername() {
    return this.server.deleteUsername();
  }
  async whoami() {
    return this.server.whoami();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  singleProtoJobDataSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2VuZE1lc3NhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1iaXR3aXNlICovXG4vKiBlc2xpbnQtZGlzYWJsZSBtYXgtY2xhc3Nlcy1wZXItZmlsZSAqL1xuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB0eXBlIHsgRGljdGlvbmFyeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgTG9uZyBmcm9tICdsb25nJztcbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5pbXBvcnQgdHlwZSB7IFBsYWludGV4dENvbnRlbnQgfSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuaW1wb3J0IHtcbiAgUHJvdG9jb2xBZGRyZXNzLFxuICBTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlLFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQgeyBHTE9CQUxfWk9ORSB9IGZyb20gJy4uL1NpZ25hbFByb3RvY29sU3RvcmUnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgcGFyc2VJbnRPclRocm93IH0gZnJvbSAnLi4vdXRpbC9wYXJzZUludE9yVGhyb3cnO1xuaW1wb3J0IHsgQWRkcmVzcyB9IGZyb20gJy4uL3R5cGVzL0FkZHJlc3MnO1xuaW1wb3J0IHsgUXVhbGlmaWVkQWRkcmVzcyB9IGZyb20gJy4uL3R5cGVzL1F1YWxpZmllZEFkZHJlc3MnO1xuaW1wb3J0IHsgU2VuZGVyS2V5cyB9IGZyb20gJy4uL0xpYlNpZ25hbFN0b3Jlcyc7XG5pbXBvcnQgdHlwZSB7IExpbmtQcmV2aWV3VHlwZSB9IGZyb20gJy4uL3R5cGVzL21lc3NhZ2UvTGlua1ByZXZpZXdzJztcbmltcG9ydCB7IE1JTUVUeXBlVG9TdHJpbmcgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB0eXBlICogYXMgQXR0YWNobWVudCBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgVVVJRCwgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHtcbiAgQ2hhbGxlbmdlVHlwZSxcbiAgR2V0R3JvdXBMb2dPcHRpb25zVHlwZSxcbiAgR2V0UHJvZmlsZU9wdGlvbnNUeXBlLFxuICBHZXRQcm9maWxlVW5hdXRoT3B0aW9uc1R5cGUsXG4gIEdyb3VwQ3JlZGVudGlhbHNUeXBlLFxuICBHcm91cExvZ1Jlc3BvbnNlVHlwZSxcbiAgTXVsdGlSZWNpcGllbnQyMDBSZXNwb25zZVR5cGUsXG4gIFByb2ZpbGVSZXF1ZXN0RGF0YVR5cGUsXG4gIFByb3hpZWRSZXF1ZXN0T3B0aW9uc1R5cGUsXG4gIFVwbG9hZEF2YXRhckhlYWRlcnNUeXBlLFxuICBXZWJBUElUeXBlLFxufSBmcm9tICcuL1dlYkFQSSc7XG5pbXBvcnQgY3JlYXRlVGFza1dpdGhUaW1lb3V0IGZyb20gJy4vVGFza1dpdGhUaW1lb3V0JztcbmltcG9ydCB0eXBlIHtcbiAgQ2FsbGJhY2tSZXN1bHRUeXBlLFxuICBTdG9yYWdlU2VydmljZUNhbGxPcHRpb25zVHlwZSxcbiAgU3RvcmFnZVNlcnZpY2VDcmVkZW50aWFscyxcbn0gZnJvbSAnLi9UeXBlcy5kJztcbmltcG9ydCB0eXBlIHtcbiAgU2VyaWFsaXplZENlcnRpZmljYXRlVHlwZSxcbiAgU2VuZExvZ0NhbGxiYWNrVHlwZSxcbn0gZnJvbSAnLi9PdXRnb2luZ01lc3NhZ2UnO1xuaW1wb3J0IE91dGdvaW5nTWVzc2FnZSBmcm9tICcuL091dGdvaW5nTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IENEU1Jlc3BvbnNlVHlwZSB9IGZyb20gJy4vY2RzL1R5cGVzLmQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgZ2V0UmFuZG9tQnl0ZXMsIGdldFplcm9lcywgZW5jcnlwdEF0dGFjaG1lbnQgfSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0IHtcbiAgTWVzc2FnZUVycm9yLFxuICBTaWduZWRQcmVLZXlSb3RhdGlvbkVycm9yLFxuICBTZW5kTWVzc2FnZVByb3RvRXJyb3IsXG4gIEhUVFBFcnJvcixcbn0gZnJvbSAnLi9FcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBCb2R5UmFuZ2VzVHlwZSwgU3RvcnlDb250ZXh0VHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUge1xuICBMaW5rUHJldmlld0ltYWdlLFxuICBMaW5rUHJldmlld01ldGFkYXRhLFxufSBmcm9tICcuLi9saW5rUHJldmlld3MvbGlua1ByZXZpZXdGZXRjaCc7XG5pbXBvcnQgeyBjb25jYXQsIGlzRW1wdHksIG1hcCB9IGZyb20gJy4uL3V0aWwvaXRlcmFibGVzJztcbmltcG9ydCB0eXBlIHsgU2VuZFR5cGVzVHlwZSB9IGZyb20gJy4uL3V0aWwvaGFuZGxlTWVzc2FnZVNlbmQnO1xuaW1wb3J0IHsgc2hvdWxkU2F2ZVByb3RvLCBzZW5kVHlwZXNFbnVtIH0gZnJvbSAnLi4vdXRpbC9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyLCBFbWJlZGRlZENvbnRhY3RUeXBlIH0gZnJvbSAnLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB7XG4gIG51bWJlclRvUGhvbmVUeXBlLFxuICBudW1iZXJUb0VtYWlsVHlwZSxcbiAgbnVtYmVyVG9BZGRyZXNzVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB0eXBlIHsgU3RpY2tlcldpdGhIeWRyYXRlZERhdGEgfSBmcm9tICcuLi90eXBlcy9TdGlja2Vycyc7XG5cbmV4cG9ydCB0eXBlIFNlbmRNZXRhZGF0YVR5cGUgPSB7XG4gIFtpZGVudGlmaWVyOiBzdHJpbmddOiB7XG4gICAgYWNjZXNzS2V5OiBzdHJpbmc7XG4gICAgc2VuZGVyQ2VydGlmaWNhdGU/OiBTZXJpYWxpemVkQ2VydGlmaWNhdGVUeXBlO1xuICB9O1xufTtcblxuZXhwb3J0IHR5cGUgU2VuZE9wdGlvbnNUeXBlID0ge1xuICBzZW5kTWV0YWRhdGE/OiBTZW5kTWV0YWRhdGFUeXBlO1xuICBvbmxpbmU/OiBib29sZWFuO1xufTtcblxudHlwZSBRdW90ZUF0dGFjaG1lbnRUeXBlID0ge1xuICB0aHVtYm5haWw/OiBBdHRhY2htZW50VHlwZTtcbiAgYXR0YWNobWVudFBvaW50ZXI/OiBQcm90by5JQXR0YWNobWVudFBvaW50ZXI7XG59O1xuXG5leHBvcnQgdHlwZSBHcm91cFYySW5mb1R5cGUgPSB7XG4gIGdyb3VwQ2hhbmdlPzogVWludDhBcnJheTtcbiAgbWFzdGVyS2V5OiBVaW50OEFycmF5O1xuICByZXZpc2lvbjogbnVtYmVyO1xuICBtZW1iZXJzOiBBcnJheTxzdHJpbmc+O1xufTtcbmV4cG9ydCB0eXBlIEdyb3VwVjFJbmZvVHlwZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgbWVtYmVyczogQXJyYXk8c3RyaW5nPjtcbn07XG5cbnR5cGUgR3JvdXBDYWxsVXBkYXRlVHlwZSA9IHtcbiAgZXJhSWQ6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIFN0aWNrZXJUeXBlID0gU3RpY2tlcldpdGhIeWRyYXRlZERhdGEgJiB7XG4gIGF0dGFjaG1lbnRQb2ludGVyPzogUHJvdG8uSUF0dGFjaG1lbnRQb2ludGVyO1xufTtcblxuZXhwb3J0IHR5cGUgUXVvdGVUeXBlID0ge1xuICBhdHRhY2htZW50cz86IEFycmF5PEF0dGFjaG1lbnRUeXBlPjtcbiAgYXV0aG9yVXVpZD86IHN0cmluZztcbiAgYm9keVJhbmdlcz86IEJvZHlSYW5nZXNUeXBlO1xuICBpZD86IG51bWJlcjtcbiAgaXNHaWZ0QmFkZ2U/OiBib29sZWFuO1xuICB0ZXh0Pzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUmVhY3Rpb25UeXBlID0ge1xuICBlbW9qaT86IHN0cmluZztcbiAgcmVtb3ZlPzogYm9vbGVhbjtcbiAgdGFyZ2V0QXV0aG9yVXVpZD86IHN0cmluZztcbiAgdGFyZ2V0VGltZXN0YW1wPzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgQXR0YWNobWVudFR5cGUgPSB7XG4gIHNpemU6IG51bWJlcjtcbiAgZGF0YTogVWludDhBcnJheTtcbiAgY29udGVudFR5cGU6IHN0cmluZztcblxuICBmaWxlTmFtZT86IHN0cmluZztcbiAgZmxhZ3M/OiBudW1iZXI7XG4gIHdpZHRoPzogbnVtYmVyO1xuICBoZWlnaHQ/OiBudW1iZXI7XG4gIGNhcHRpb24/OiBzdHJpbmc7XG5cbiAgYXR0YWNobWVudFBvaW50ZXI/OiBQcm90by5JQXR0YWNobWVudFBvaW50ZXI7XG5cbiAgYmx1ckhhc2g/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgY29uc3Qgc2luZ2xlUHJvdG9Kb2JEYXRhU2NoZW1hID0gei5vYmplY3Qoe1xuICBjb250ZW50SGludDogei5udW1iZXIoKSxcbiAgaWRlbnRpZmllcjogei5zdHJpbmcoKSxcbiAgaXNTeW5jTWVzc2FnZTogei5ib29sZWFuKCksXG4gIG1lc3NhZ2VJZHM6IHouYXJyYXkoei5zdHJpbmcoKSkub3B0aW9uYWwoKSxcbiAgcHJvdG9CYXNlNjQ6IHouc3RyaW5nKCksXG4gIHR5cGU6IHNlbmRUeXBlc0VudW0sXG59KTtcblxuZXhwb3J0IHR5cGUgU2luZ2xlUHJvdG9Kb2JEYXRhID0gei5pbmZlcjx0eXBlb2Ygc2luZ2xlUHJvdG9Kb2JEYXRhU2NoZW1hPjtcblxuZnVuY3Rpb24gbWFrZUF0dGFjaG1lbnRTZW5kUmVhZHkoXG4gIGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGVcbik6IEF0dGFjaG1lbnRUeXBlIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBkYXRhIH0gPSBhdHRhY2htZW50O1xuXG4gIGlmICghZGF0YSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdtYWtlQXR0YWNobWVudFNlbmRSZWFkeTogTWlzc2luZyBkYXRhLCByZXR1cm5pbmcgdW5kZWZpbmVkJ1xuICAgICk7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmF0dGFjaG1lbnQsXG4gICAgY29udGVudFR5cGU6IE1JTUVUeXBlVG9TdHJpbmcoYXR0YWNobWVudC5jb250ZW50VHlwZSksXG4gICAgZGF0YSxcbiAgfTtcbn1cblxuZXhwb3J0IHR5cGUgQ29udGFjdFdpdGhIeWRyYXRlZEF2YXRhciA9IEVtYmVkZGVkQ29udGFjdFR5cGUgJiB7XG4gIGF2YXRhcj86IEF2YXRhciAmIHtcbiAgICBhdHRhY2htZW50UG9pbnRlcj86IFByb3RvLklBdHRhY2htZW50UG9pbnRlcjtcbiAgfTtcbn07XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VPcHRpb25zVHlwZSA9IHtcbiAgYXR0YWNobWVudHM/OiBSZWFkb25seUFycmF5PEF0dGFjaG1lbnRUeXBlPiB8IG51bGw7XG4gIGJvZHk/OiBzdHJpbmc7XG4gIGNvbnRhY3Q/OiBBcnJheTxDb250YWN0V2l0aEh5ZHJhdGVkQXZhdGFyPjtcbiAgZXhwaXJlVGltZXI/OiBudW1iZXI7XG4gIGZsYWdzPzogbnVtYmVyO1xuICBncm91cD86IHtcbiAgICBpZDogc3RyaW5nO1xuICAgIHR5cGU6IG51bWJlcjtcbiAgfTtcbiAgZ3JvdXBWMj86IEdyb3VwVjJJbmZvVHlwZTtcbiAgbmVlZHNTeW5jPzogYm9vbGVhbjtcbiAgcHJldmlldz86IFJlYWRvbmx5QXJyYXk8TGlua1ByZXZpZXdUeXBlPjtcbiAgcHJvZmlsZUtleT86IFVpbnQ4QXJyYXk7XG4gIHF1b3RlPzogUXVvdGVUeXBlO1xuICByZWNpcGllbnRzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gIHN0aWNrZXI/OiBTdGlja2VyVHlwZTtcbiAgcmVhY3Rpb24/OiBSZWFjdGlvblR5cGU7XG4gIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcD86IG51bWJlcjtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG4gIG1lbnRpb25zPzogQm9keVJhbmdlc1R5cGU7XG4gIGdyb3VwQ2FsbFVwZGF0ZT86IEdyb3VwQ2FsbFVwZGF0ZVR5cGU7XG4gIHN0b3J5Q29udGV4dD86IFN0b3J5Q29udGV4dFR5cGU7XG59O1xuZXhwb3J0IHR5cGUgR3JvdXBTZW5kT3B0aW9uc1R5cGUgPSB7XG4gIGF0dGFjaG1lbnRzPzogQXJyYXk8QXR0YWNobWVudFR5cGU+O1xuICBjb250YWN0PzogQXJyYXk8Q29udGFjdFdpdGhIeWRyYXRlZEF2YXRhcj47XG4gIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcD86IG51bWJlcjtcbiAgZXhwaXJlVGltZXI/OiBudW1iZXI7XG4gIGZsYWdzPzogbnVtYmVyO1xuICBncm91cENhbGxVcGRhdGU/OiBHcm91cENhbGxVcGRhdGVUeXBlO1xuICBncm91cFYxPzogR3JvdXBWMUluZm9UeXBlO1xuICBncm91cFYyPzogR3JvdXBWMkluZm9UeXBlO1xuICBtZW50aW9ucz86IEJvZHlSYW5nZXNUeXBlO1xuICBtZXNzYWdlVGV4dD86IHN0cmluZztcbiAgcHJldmlldz86IFJlYWRvbmx5QXJyYXk8TGlua1ByZXZpZXdUeXBlPjtcbiAgcHJvZmlsZUtleT86IFVpbnQ4QXJyYXk7XG4gIHF1b3RlPzogUXVvdGVUeXBlO1xuICByZWFjdGlvbj86IFJlYWN0aW9uVHlwZTtcbiAgc3RpY2tlcj86IFN0aWNrZXJUeXBlO1xuICBzdG9yeUNvbnRleHQ/OiBTdG9yeUNvbnRleHRUeXBlO1xuICB0aW1lc3RhbXA6IG51bWJlcjtcbn07XG5cbmNsYXNzIE1lc3NhZ2Uge1xuICBhdHRhY2htZW50czogUmVhZG9ubHlBcnJheTxBdHRhY2htZW50VHlwZT47XG5cbiAgYm9keT86IHN0cmluZztcblxuICBjb250YWN0PzogQXJyYXk8Q29udGFjdFdpdGhIeWRyYXRlZEF2YXRhcj47XG5cbiAgZXhwaXJlVGltZXI/OiBudW1iZXI7XG5cbiAgZmxhZ3M/OiBudW1iZXI7XG5cbiAgZ3JvdXA/OiB7XG4gICAgaWQ6IHN0cmluZztcbiAgICB0eXBlOiBudW1iZXI7XG4gIH07XG5cbiAgZ3JvdXBWMj86IEdyb3VwVjJJbmZvVHlwZTtcblxuICBuZWVkc1N5bmM/OiBib29sZWFuO1xuXG4gIHByZXZpZXc/OiBSZWFkb25seUFycmF5PExpbmtQcmV2aWV3VHlwZT47XG5cbiAgcHJvZmlsZUtleT86IFVpbnQ4QXJyYXk7XG5cbiAgcXVvdGU/OiBRdW90ZVR5cGU7XG5cbiAgcmVjaXBpZW50czogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuXG4gIHN0aWNrZXI/OiBTdGlja2VyVHlwZTtcblxuICByZWFjdGlvbj86IFJlYWN0aW9uVHlwZTtcblxuICB0aW1lc3RhbXA6IG51bWJlcjtcblxuICBkYXRhTWVzc2FnZT86IFByb3RvLkRhdGFNZXNzYWdlO1xuXG4gIGF0dGFjaG1lbnRQb2ludGVyczogQXJyYXk8UHJvdG8uSUF0dGFjaG1lbnRQb2ludGVyPiA9IFtdO1xuXG4gIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcD86IG51bWJlcjtcblxuICBtZW50aW9ucz86IEJvZHlSYW5nZXNUeXBlO1xuXG4gIGdyb3VwQ2FsbFVwZGF0ZT86IEdyb3VwQ2FsbFVwZGF0ZVR5cGU7XG5cbiAgc3RvcnlDb250ZXh0PzogU3RvcnlDb250ZXh0VHlwZTtcblxuICBjb25zdHJ1Y3RvcihvcHRpb25zOiBNZXNzYWdlT3B0aW9uc1R5cGUpIHtcbiAgICB0aGlzLmF0dGFjaG1lbnRzID0gb3B0aW9ucy5hdHRhY2htZW50cyB8fCBbXTtcbiAgICB0aGlzLmJvZHkgPSBvcHRpb25zLmJvZHk7XG4gICAgdGhpcy5jb250YWN0ID0gb3B0aW9ucy5jb250YWN0O1xuICAgIHRoaXMuZXhwaXJlVGltZXIgPSBvcHRpb25zLmV4cGlyZVRpbWVyO1xuICAgIHRoaXMuZmxhZ3MgPSBvcHRpb25zLmZsYWdzO1xuICAgIHRoaXMuZ3JvdXAgPSBvcHRpb25zLmdyb3VwO1xuICAgIHRoaXMuZ3JvdXBWMiA9IG9wdGlvbnMuZ3JvdXBWMjtcbiAgICB0aGlzLm5lZWRzU3luYyA9IG9wdGlvbnMubmVlZHNTeW5jO1xuICAgIHRoaXMucHJldmlldyA9IG9wdGlvbnMucHJldmlldztcbiAgICB0aGlzLnByb2ZpbGVLZXkgPSBvcHRpb25zLnByb2ZpbGVLZXk7XG4gICAgdGhpcy5xdW90ZSA9IG9wdGlvbnMucXVvdGU7XG4gICAgdGhpcy5yZWNpcGllbnRzID0gb3B0aW9ucy5yZWNpcGllbnRzO1xuICAgIHRoaXMuc3RpY2tlciA9IG9wdGlvbnMuc3RpY2tlcjtcbiAgICB0aGlzLnJlYWN0aW9uID0gb3B0aW9ucy5yZWFjdGlvbjtcbiAgICB0aGlzLnRpbWVzdGFtcCA9IG9wdGlvbnMudGltZXN0YW1wO1xuICAgIHRoaXMuZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wID0gb3B0aW9ucy5kZWxldGVkRm9yRXZlcnlvbmVUaW1lc3RhbXA7XG4gICAgdGhpcy5tZW50aW9ucyA9IG9wdGlvbnMubWVudGlvbnM7XG4gICAgdGhpcy5ncm91cENhbGxVcGRhdGUgPSBvcHRpb25zLmdyb3VwQ2FsbFVwZGF0ZTtcbiAgICB0aGlzLnN0b3J5Q29udGV4dCA9IG9wdGlvbnMuc3RvcnlDb250ZXh0O1xuXG4gICAgaWYgKCEodGhpcy5yZWNpcGllbnRzIGluc3RhbmNlb2YgQXJyYXkpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVjaXBpZW50IGxpc3QnKTtcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuZ3JvdXAgJiYgIXRoaXMuZ3JvdXBWMiAmJiB0aGlzLnJlY2lwaWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVjaXBpZW50IGxpc3QgZm9yIG5vbi1ncm91cCcpO1xuICAgIH1cblxuICAgIGlmICh0eXBlb2YgdGhpcy50aW1lc3RhbXAgIT09ICdudW1iZXInKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgdGltZXN0YW1wJyk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMuZXhwaXJlVGltZXIgIT09IHVuZGVmaW5lZCAmJiB0aGlzLmV4cGlyZVRpbWVyICE9PSBudWxsKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZXhwaXJlVGltZXIgIT09ICdudW1iZXInIHx8ICEodGhpcy5leHBpcmVUaW1lciA+PSAwKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgZXhwaXJlVGltZXInKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAodGhpcy5hdHRhY2htZW50cykge1xuICAgICAgaWYgKCEodGhpcy5hdHRhY2htZW50cyBpbnN0YW5jZW9mIEFycmF5KSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgbWVzc2FnZSBhdHRhY2htZW50cycpO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5mbGFncyAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBpZiAodHlwZW9mIHRoaXMuZmxhZ3MgIT09ICdudW1iZXInKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBtZXNzYWdlIGZsYWdzJyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLmlzRW5kU2Vzc2lvbigpKSB7XG4gICAgICBpZiAoXG4gICAgICAgIHRoaXMuYm9keSAhPT0gbnVsbCB8fFxuICAgICAgICB0aGlzLmdyb3VwICE9PSBudWxsIHx8XG4gICAgICAgIHRoaXMuYXR0YWNobWVudHMubGVuZ3RoICE9PSAwXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIGVuZCBzZXNzaW9uIG1lc3NhZ2UnKTtcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgaWYgKFxuICAgICAgICB0eXBlb2YgdGhpcy50aW1lc3RhbXAgIT09ICdudW1iZXInIHx8XG4gICAgICAgICh0aGlzLmJvZHkgJiYgdHlwZW9mIHRoaXMuYm9keSAhPT0gJ3N0cmluZycpXG4gICAgICApIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIG1lc3NhZ2UgYm9keScpO1xuICAgICAgfVxuICAgICAgaWYgKHRoaXMuZ3JvdXApIHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgIHR5cGVvZiB0aGlzLmdyb3VwLmlkICE9PSAnc3RyaW5nJyB8fFxuICAgICAgICAgIHR5cGVvZiB0aGlzLmdyb3VwLnR5cGUgIT09ICdudW1iZXInXG4gICAgICAgICkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCBncm91cCBjb250ZXh0Jyk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICBpc0VuZFNlc3Npb24oKSB7XG4gICAgcmV0dXJuICh0aGlzLmZsYWdzIHx8IDApICYgUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuRU5EX1NFU1NJT047XG4gIH1cblxuICB0b1Byb3RvKCk6IFByb3RvLkRhdGFNZXNzYWdlIHtcbiAgICBpZiAodGhpcy5kYXRhTWVzc2FnZSkge1xuICAgICAgcmV0dXJuIHRoaXMuZGF0YU1lc3NhZ2U7XG4gICAgfVxuICAgIGNvbnN0IHByb3RvID0gbmV3IFByb3RvLkRhdGFNZXNzYWdlKCk7XG5cbiAgICBwcm90by50aW1lc3RhbXAgPSBMb25nLmZyb21OdW1iZXIodGhpcy50aW1lc3RhbXApO1xuICAgIHByb3RvLmF0dGFjaG1lbnRzID0gdGhpcy5hdHRhY2htZW50UG9pbnRlcnM7XG5cbiAgICBpZiAodGhpcy5ib2R5KSB7XG4gICAgICBwcm90by5ib2R5ID0gdGhpcy5ib2R5O1xuXG4gICAgICBjb25zdCBtZW50aW9uQ291bnQgPSB0aGlzLm1lbnRpb25zID8gdGhpcy5tZW50aW9ucy5sZW5ndGggOiAwO1xuICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gdGhpcy5ib2R5Lm1hdGNoKC9cXHVGRkZDL2cpO1xuICAgICAgY29uc3QgcGxhY2Vob2xkZXJDb3VudCA9IHBsYWNlaG9sZGVycyA/IHBsYWNlaG9sZGVycy5sZW5ndGggOiAwO1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBTZW5kaW5nIGEgbWVzc2FnZSB3aXRoICR7bWVudGlvbkNvdW50fSBtZW50aW9ucyBhbmQgJHtwbGFjZWhvbGRlckNvdW50fSBwbGFjZWhvbGRlcnNgXG4gICAgICApO1xuICAgIH1cbiAgICBpZiAodGhpcy5mbGFncykge1xuICAgICAgcHJvdG8uZmxhZ3MgPSB0aGlzLmZsYWdzO1xuICAgIH1cbiAgICBpZiAodGhpcy5ncm91cFYyKSB7XG4gICAgICBwcm90by5ncm91cFYyID0gbmV3IFByb3RvLkdyb3VwQ29udGV4dFYyKCk7XG4gICAgICBwcm90by5ncm91cFYyLm1hc3RlcktleSA9IHRoaXMuZ3JvdXBWMi5tYXN0ZXJLZXk7XG4gICAgICBwcm90by5ncm91cFYyLnJldmlzaW9uID0gdGhpcy5ncm91cFYyLnJldmlzaW9uO1xuICAgICAgcHJvdG8uZ3JvdXBWMi5ncm91cENoYW5nZSA9IHRoaXMuZ3JvdXBWMi5ncm91cENoYW5nZSB8fCBudWxsO1xuICAgIH0gZWxzZSBpZiAodGhpcy5ncm91cCkge1xuICAgICAgcHJvdG8uZ3JvdXAgPSBuZXcgUHJvdG8uR3JvdXBDb250ZXh0KCk7XG4gICAgICBwcm90by5ncm91cC5pZCA9IEJ5dGVzLmZyb21TdHJpbmcodGhpcy5ncm91cC5pZCk7XG4gICAgICBwcm90by5ncm91cC50eXBlID0gdGhpcy5ncm91cC50eXBlO1xuICAgIH1cbiAgICBpZiAodGhpcy5zdGlja2VyKSB7XG4gICAgICBwcm90by5zdGlja2VyID0gbmV3IFByb3RvLkRhdGFNZXNzYWdlLlN0aWNrZXIoKTtcbiAgICAgIHByb3RvLnN0aWNrZXIucGFja0lkID0gQnl0ZXMuZnJvbUhleCh0aGlzLnN0aWNrZXIucGFja0lkKTtcbiAgICAgIHByb3RvLnN0aWNrZXIucGFja0tleSA9IEJ5dGVzLmZyb21CYXNlNjQodGhpcy5zdGlja2VyLnBhY2tLZXkpO1xuICAgICAgcHJvdG8uc3RpY2tlci5zdGlja2VySWQgPSB0aGlzLnN0aWNrZXIuc3RpY2tlcklkO1xuICAgICAgcHJvdG8uc3RpY2tlci5lbW9qaSA9IHRoaXMuc3RpY2tlci5lbW9qaTtcblxuICAgICAgaWYgKHRoaXMuc3RpY2tlci5hdHRhY2htZW50UG9pbnRlcikge1xuICAgICAgICBwcm90by5zdGlja2VyLmRhdGEgPSB0aGlzLnN0aWNrZXIuYXR0YWNobWVudFBvaW50ZXI7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICh0aGlzLnJlYWN0aW9uKSB7XG4gICAgICBwcm90by5yZWFjdGlvbiA9IG5ldyBQcm90by5EYXRhTWVzc2FnZS5SZWFjdGlvbigpO1xuICAgICAgcHJvdG8ucmVhY3Rpb24uZW1vamkgPSB0aGlzLnJlYWN0aW9uLmVtb2ppIHx8IG51bGw7XG4gICAgICBwcm90by5yZWFjdGlvbi5yZW1vdmUgPSB0aGlzLnJlYWN0aW9uLnJlbW92ZSB8fCBmYWxzZTtcbiAgICAgIHByb3RvLnJlYWN0aW9uLnRhcmdldEF1dGhvclV1aWQgPSB0aGlzLnJlYWN0aW9uLnRhcmdldEF1dGhvclV1aWQgfHwgbnVsbDtcbiAgICAgIHByb3RvLnJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCA9XG4gICAgICAgIHRoaXMucmVhY3Rpb24udGFyZ2V0VGltZXN0YW1wID09PSB1bmRlZmluZWRcbiAgICAgICAgICA/IG51bGxcbiAgICAgICAgICA6IExvbmcuZnJvbU51bWJlcih0aGlzLnJlYWN0aW9uLnRhcmdldFRpbWVzdGFtcCk7XG4gICAgfVxuXG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5wcmV2aWV3KSkge1xuICAgICAgcHJvdG8ucHJldmlldyA9IHRoaXMucHJldmlldy5tYXAocHJldmlldyA9PiB7XG4gICAgICAgIGNvbnN0IGl0ZW0gPSBuZXcgUHJvdG8uRGF0YU1lc3NhZ2UuUHJldmlldygpO1xuICAgICAgICBpdGVtLnRpdGxlID0gcHJldmlldy50aXRsZTtcbiAgICAgICAgaXRlbS51cmwgPSBwcmV2aWV3LnVybDtcbiAgICAgICAgaXRlbS5kZXNjcmlwdGlvbiA9IHByZXZpZXcuZGVzY3JpcHRpb24gfHwgbnVsbDtcbiAgICAgICAgaXRlbS5kYXRlID0gcHJldmlldy5kYXRlIHx8IG51bGw7XG4gICAgICAgIGlmIChwcmV2aWV3LmF0dGFjaG1lbnRQb2ludGVyKSB7XG4gICAgICAgICAgaXRlbS5pbWFnZSA9IHByZXZpZXcuYXR0YWNobWVudFBvaW50ZXI7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKEFycmF5LmlzQXJyYXkodGhpcy5jb250YWN0KSkge1xuICAgICAgcHJvdG8uY29udGFjdCA9IHRoaXMuY29udGFjdC5tYXAoY29udGFjdCA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnRhY3RQcm90byA9IG5ldyBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0KCk7XG4gICAgICAgIGlmIChjb250YWN0Lm5hbWUpIHtcbiAgICAgICAgICBjb25zdCBuYW1lUHJvdG86IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuSU5hbWUgPSB7XG4gICAgICAgICAgICBnaXZlbk5hbWU6IGNvbnRhY3QubmFtZS5naXZlbk5hbWUsXG4gICAgICAgICAgICBmYW1pbHlOYW1lOiBjb250YWN0Lm5hbWUuZmFtaWx5TmFtZSxcbiAgICAgICAgICAgIHByZWZpeDogY29udGFjdC5uYW1lLnByZWZpeCxcbiAgICAgICAgICAgIHN1ZmZpeDogY29udGFjdC5uYW1lLnN1ZmZpeCxcbiAgICAgICAgICAgIG1pZGRsZU5hbWU6IGNvbnRhY3QubmFtZS5taWRkbGVOYW1lLFxuICAgICAgICAgICAgZGlzcGxheU5hbWU6IGNvbnRhY3QubmFtZS5kaXNwbGF5TmFtZSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnRhY3RQcm90by5uYW1lID0gbmV3IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuTmFtZShuYW1lUHJvdG8pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChBcnJheS5pc0FycmF5KGNvbnRhY3QubnVtYmVyKSkge1xuICAgICAgICAgIGNvbnRhY3RQcm90by5udW1iZXIgPSBjb250YWN0Lm51bWJlci5tYXAobnVtYmVyID0+IHtcbiAgICAgICAgICAgIGNvbnN0IG51bWJlclByb3RvOiBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LklQaG9uZSA9IHtcbiAgICAgICAgICAgICAgdmFsdWU6IG51bWJlci52YWx1ZSxcbiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyVG9QaG9uZVR5cGUobnVtYmVyLnR5cGUpLFxuICAgICAgICAgICAgICBsYWJlbDogbnVtYmVyLmxhYmVsLFxuICAgICAgICAgICAgfTtcblxuICAgICAgICAgICAgcmV0dXJuIG5ldyBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LlBob25lKG51bWJlclByb3RvKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoQXJyYXkuaXNBcnJheShjb250YWN0LmVtYWlsKSkge1xuICAgICAgICAgIGNvbnRhY3RQcm90by5lbWFpbCA9IGNvbnRhY3QuZW1haWwubWFwKGVtYWlsID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGVtYWlsUHJvdG86IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuSUVtYWlsID0ge1xuICAgICAgICAgICAgICB2YWx1ZTogZW1haWwudmFsdWUsXG4gICAgICAgICAgICAgIHR5cGU6IG51bWJlclRvRW1haWxUeXBlKGVtYWlsLnR5cGUpLFxuICAgICAgICAgICAgICBsYWJlbDogZW1haWwubGFiZWwsXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICByZXR1cm4gbmV3IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuRW1haWwoZW1haWxQcm90byk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKEFycmF5LmlzQXJyYXkoY29udGFjdC5hZGRyZXNzKSkge1xuICAgICAgICAgIGNvbnRhY3RQcm90by5hZGRyZXNzID0gY29udGFjdC5hZGRyZXNzLm1hcChhZGRyZXNzID0+IHtcbiAgICAgICAgICAgIGNvbnN0IGFkZHJlc3NQcm90bzogUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5JUG9zdGFsQWRkcmVzcyA9IHtcbiAgICAgICAgICAgICAgdHlwZTogbnVtYmVyVG9BZGRyZXNzVHlwZShhZGRyZXNzLnR5cGUpLFxuICAgICAgICAgICAgICBsYWJlbDogYWRkcmVzcy5sYWJlbCxcbiAgICAgICAgICAgICAgc3RyZWV0OiBhZGRyZXNzLnN0cmVldCxcbiAgICAgICAgICAgICAgcG9ib3g6IGFkZHJlc3MucG9ib3gsXG4gICAgICAgICAgICAgIG5laWdoYm9yaG9vZDogYWRkcmVzcy5uZWlnaGJvcmhvb2QsXG4gICAgICAgICAgICAgIGNpdHk6IGFkZHJlc3MuY2l0eSxcbiAgICAgICAgICAgICAgcmVnaW9uOiBhZGRyZXNzLnJlZ2lvbixcbiAgICAgICAgICAgICAgcG9zdGNvZGU6IGFkZHJlc3MucG9zdGNvZGUsXG4gICAgICAgICAgICAgIGNvdW50cnk6IGFkZHJlc3MuY291bnRyeSxcbiAgICAgICAgICAgIH07XG5cbiAgICAgICAgICAgIHJldHVybiBuZXcgUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5Qb3N0YWxBZGRyZXNzKGFkZHJlc3NQcm90byk7XG4gICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRhY3QuYXZhdGFyICYmIGNvbnRhY3QuYXZhdGFyLmF0dGFjaG1lbnRQb2ludGVyKSB7XG4gICAgICAgICAgY29uc3QgYXZhdGFyUHJvdG8gPSBuZXcgUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5BdmF0YXIoKTtcbiAgICAgICAgICBhdmF0YXJQcm90by5hdmF0YXIgPSBjb250YWN0LmF2YXRhci5hdHRhY2htZW50UG9pbnRlcjtcbiAgICAgICAgICBhdmF0YXJQcm90by5pc1Byb2ZpbGUgPSBCb29sZWFuKGNvbnRhY3QuYXZhdGFyLmlzUHJvZmlsZSk7XG4gICAgICAgICAgY29udGFjdFByb3RvLmF2YXRhciA9IGF2YXRhclByb3RvO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGNvbnRhY3Qub3JnYW5pemF0aW9uKSB7XG4gICAgICAgICAgY29udGFjdFByb3RvLm9yZ2FuaXphdGlvbiA9IGNvbnRhY3Qub3JnYW5pemF0aW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGNvbnRhY3RQcm90bztcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnF1b3RlKSB7XG4gICAgICBjb25zdCB7IFF1b3RlZEF0dGFjaG1lbnQgfSA9IFByb3RvLkRhdGFNZXNzYWdlLlF1b3RlO1xuICAgICAgY29uc3QgeyBCb2R5UmFuZ2UsIFF1b3RlIH0gPSBQcm90by5EYXRhTWVzc2FnZTtcblxuICAgICAgcHJvdG8ucXVvdGUgPSBuZXcgUXVvdGUoKTtcbiAgICAgIGNvbnN0IHsgcXVvdGUgfSA9IHByb3RvO1xuXG4gICAgICBpZiAodGhpcy5xdW90ZS5pc0dpZnRCYWRnZSkge1xuICAgICAgICBxdW90ZS50eXBlID0gUHJvdG8uRGF0YU1lc3NhZ2UuUXVvdGUuVHlwZS5HSUZUX0JBREdFO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcXVvdGUudHlwZSA9IFByb3RvLkRhdGFNZXNzYWdlLlF1b3RlLlR5cGUuTk9STUFMO1xuICAgICAgfVxuXG4gICAgICBxdW90ZS5pZCA9XG4gICAgICAgIHRoaXMucXVvdGUuaWQgPT09IHVuZGVmaW5lZCA/IG51bGwgOiBMb25nLmZyb21OdW1iZXIodGhpcy5xdW90ZS5pZCk7XG4gICAgICBxdW90ZS5hdXRob3JVdWlkID0gdGhpcy5xdW90ZS5hdXRob3JVdWlkIHx8IG51bGw7XG4gICAgICBxdW90ZS50ZXh0ID0gdGhpcy5xdW90ZS50ZXh0IHx8IG51bGw7XG4gICAgICBxdW90ZS5hdHRhY2htZW50cyA9ICh0aGlzLnF1b3RlLmF0dGFjaG1lbnRzIHx8IFtdKS5tYXAoXG4gICAgICAgIChhdHRhY2htZW50OiBBdHRhY2htZW50VHlwZSkgPT4ge1xuICAgICAgICAgIGNvbnN0IHF1b3RlZEF0dGFjaG1lbnQgPSBuZXcgUXVvdGVkQXR0YWNobWVudCgpO1xuXG4gICAgICAgICAgcXVvdGVkQXR0YWNobWVudC5jb250ZW50VHlwZSA9IGF0dGFjaG1lbnQuY29udGVudFR5cGU7XG4gICAgICAgICAgaWYgKGF0dGFjaG1lbnQuZmlsZU5hbWUpIHtcbiAgICAgICAgICAgIHF1b3RlZEF0dGFjaG1lbnQuZmlsZU5hbWUgPSBhdHRhY2htZW50LmZpbGVOYW1lO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoYXR0YWNobWVudC5hdHRhY2htZW50UG9pbnRlcikge1xuICAgICAgICAgICAgcXVvdGVkQXR0YWNobWVudC50aHVtYm5haWwgPSBhdHRhY2htZW50LmF0dGFjaG1lbnRQb2ludGVyO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBxdW90ZWRBdHRhY2htZW50O1xuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgYm9keVJhbmdlczogQm9keVJhbmdlc1R5cGUgPSB0aGlzLnF1b3RlLmJvZHlSYW5nZXMgfHwgW107XG4gICAgICBxdW90ZS5ib2R5UmFuZ2VzID0gYm9keVJhbmdlcy5tYXAocmFuZ2UgPT4ge1xuICAgICAgICBjb25zdCBib2R5UmFuZ2UgPSBuZXcgQm9keVJhbmdlKCk7XG4gICAgICAgIGJvZHlSYW5nZS5zdGFydCA9IHJhbmdlLnN0YXJ0O1xuICAgICAgICBib2R5UmFuZ2UubGVuZ3RoID0gcmFuZ2UubGVuZ3RoO1xuICAgICAgICBpZiAocmFuZ2UubWVudGlvblV1aWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGJvZHlSYW5nZS5tZW50aW9uVXVpZCA9IHJhbmdlLm1lbnRpb25VdWlkO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBib2R5UmFuZ2U7XG4gICAgICB9KTtcbiAgICAgIGlmIChcbiAgICAgICAgcXVvdGUuYm9keVJhbmdlcy5sZW5ndGggJiZcbiAgICAgICAgKCFwcm90by5yZXF1aXJlZFByb3RvY29sVmVyc2lvbiB8fFxuICAgICAgICAgIHByb3RvLnJlcXVpcmVkUHJvdG9jb2xWZXJzaW9uIDxcbiAgICAgICAgICAgIFByb3RvLkRhdGFNZXNzYWdlLlByb3RvY29sVmVyc2lvbi5NRU5USU9OUylcbiAgICAgICkge1xuICAgICAgICBwcm90by5yZXF1aXJlZFByb3RvY29sVmVyc2lvbiA9XG4gICAgICAgICAgUHJvdG8uRGF0YU1lc3NhZ2UuUHJvdG9jb2xWZXJzaW9uLk1FTlRJT05TO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAodGhpcy5leHBpcmVUaW1lcikge1xuICAgICAgcHJvdG8uZXhwaXJlVGltZXIgPSB0aGlzLmV4cGlyZVRpbWVyO1xuICAgIH1cbiAgICBpZiAodGhpcy5wcm9maWxlS2V5KSB7XG4gICAgICBwcm90by5wcm9maWxlS2V5ID0gdGhpcy5wcm9maWxlS2V5O1xuICAgIH1cbiAgICBpZiAodGhpcy5kZWxldGVkRm9yRXZlcnlvbmVUaW1lc3RhbXApIHtcbiAgICAgIHByb3RvLmRlbGV0ZSA9IHtcbiAgICAgICAgdGFyZ2V0U2VudFRpbWVzdGFtcDogTG9uZy5mcm9tTnVtYmVyKHRoaXMuZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wKSxcbiAgICAgIH07XG4gICAgfVxuICAgIGlmICh0aGlzLm1lbnRpb25zKSB7XG4gICAgICBwcm90by5yZXF1aXJlZFByb3RvY29sVmVyc2lvbiA9XG4gICAgICAgIFByb3RvLkRhdGFNZXNzYWdlLlByb3RvY29sVmVyc2lvbi5NRU5USU9OUztcbiAgICAgIHByb3RvLmJvZHlSYW5nZXMgPSB0aGlzLm1lbnRpb25zLm1hcChcbiAgICAgICAgKHsgc3RhcnQsIGxlbmd0aCwgbWVudGlvblV1aWQgfSkgPT4gKHtcbiAgICAgICAgICBzdGFydCxcbiAgICAgICAgICBsZW5ndGgsXG4gICAgICAgICAgbWVudGlvblV1aWQsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmICh0aGlzLmdyb3VwQ2FsbFVwZGF0ZSkge1xuICAgICAgY29uc3QgeyBHcm91cENhbGxVcGRhdGUgfSA9IFByb3RvLkRhdGFNZXNzYWdlO1xuXG4gICAgICBjb25zdCBncm91cENhbGxVcGRhdGUgPSBuZXcgR3JvdXBDYWxsVXBkYXRlKCk7XG4gICAgICBncm91cENhbGxVcGRhdGUuZXJhSWQgPSB0aGlzLmdyb3VwQ2FsbFVwZGF0ZS5lcmFJZDtcblxuICAgICAgcHJvdG8uZ3JvdXBDYWxsVXBkYXRlID0gZ3JvdXBDYWxsVXBkYXRlO1xuICAgIH1cblxuICAgIGlmICh0aGlzLnN0b3J5Q29udGV4dCkge1xuICAgICAgY29uc3QgeyBTdG9yeUNvbnRleHQgfSA9IFByb3RvLkRhdGFNZXNzYWdlO1xuXG4gICAgICBjb25zdCBzdG9yeUNvbnRleHQgPSBuZXcgU3RvcnlDb250ZXh0KCk7XG4gICAgICBpZiAodGhpcy5zdG9yeUNvbnRleHQuYXV0aG9yVXVpZCkge1xuICAgICAgICBzdG9yeUNvbnRleHQuYXV0aG9yVXVpZCA9IHRoaXMuc3RvcnlDb250ZXh0LmF1dGhvclV1aWQ7XG4gICAgICB9XG4gICAgICBzdG9yeUNvbnRleHQuc2VudFRpbWVzdGFtcCA9IExvbmcuZnJvbU51bWJlcih0aGlzLnN0b3J5Q29udGV4dC50aW1lc3RhbXApO1xuXG4gICAgICBwcm90by5zdG9yeUNvbnRleHQgPSBzdG9yeUNvbnRleHQ7XG4gICAgfVxuXG4gICAgdGhpcy5kYXRhTWVzc2FnZSA9IHByb3RvO1xuICAgIHJldHVybiBwcm90bztcbiAgfVxuXG4gIGVuY29kZSgpIHtcbiAgICByZXR1cm4gUHJvdG8uRGF0YU1lc3NhZ2UuZW5jb2RlKHRoaXMudG9Qcm90bygpKS5maW5pc2goKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBNZXNzYWdlU2VuZGVyIHtcbiAgcGVuZGluZ01lc3NhZ2VzOiB7XG4gICAgW2lkOiBzdHJpbmddOiBQUXVldWU7XG4gIH07XG5cbiAgY29uc3RydWN0b3IocHVibGljIHJlYWRvbmx5IHNlcnZlcjogV2ViQVBJVHlwZSkge1xuICAgIHRoaXMucGVuZGluZ01lc3NhZ2VzID0ge307XG4gIH1cblxuICBhc3luYyBxdWV1ZUpvYkZvcklkZW50aWZpZXI8VD4oXG4gICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgIHJ1bkpvYjogKCkgPT4gUHJvbWlzZTxUPlxuICApOiBQcm9taXNlPFQ+IHtcbiAgICBjb25zdCB7IGlkIH0gPSBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZUFuZFdhaXQoXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgJ3ByaXZhdGUnXG4gICAgKTtcbiAgICB0aGlzLnBlbmRpbmdNZXNzYWdlc1tpZF0gPVxuICAgICAgdGhpcy5wZW5kaW5nTWVzc2FnZXNbaWRdIHx8IG5ldyBQUXVldWUoeyBjb25jdXJyZW5jeTogMSB9KTtcblxuICAgIGNvbnN0IHF1ZXVlID0gdGhpcy5wZW5kaW5nTWVzc2FnZXNbaWRdO1xuXG4gICAgY29uc3QgdGFza1dpdGhUaW1lb3V0ID0gY3JlYXRlVGFza1dpdGhUaW1lb3V0KFxuICAgICAgcnVuSm9iLFxuICAgICAgYHF1ZXVlSm9iRm9ySWRlbnRpZmllciAke2lkZW50aWZpZXJ9ICR7aWR9YFxuICAgICk7XG5cbiAgICByZXR1cm4gcXVldWUuYWRkKHRhc2tXaXRoVGltZW91dCk7XG4gIH1cblxuICAvLyBBdHRhY2htZW50IHVwbG9hZCBmdW5jdGlvbnNcblxuICBfZ2V0QXR0YWNobWVudFNpemVCdWNrZXQoc2l6ZTogbnVtYmVyKTogbnVtYmVyIHtcbiAgICByZXR1cm4gTWF0aC5tYXgoXG4gICAgICA1NDEsXG4gICAgICBNYXRoLmZsb29yKDEuMDUgKiogTWF0aC5jZWlsKE1hdGgubG9nKHNpemUpIC8gTWF0aC5sb2coMS4wNSkpKVxuICAgICk7XG4gIH1cblxuICBzdGF0aWMgZ2V0UmFuZG9tUGFkZGluZygpOiBVaW50OEFycmF5IHtcbiAgICAvLyBHZW5lcmF0ZSBhIHJhbmRvbSBpbnQgZnJvbSAxIGFuZCA1MTJcbiAgICBjb25zdCBidWZmZXIgPSBnZXRSYW5kb21CeXRlcygyKTtcbiAgICBjb25zdCBwYWRkaW5nTGVuZ3RoID0gKG5ldyBVaW50MTZBcnJheShidWZmZXIpWzBdICYgMHgxZmYpICsgMTtcblxuICAgIC8vIEdlbmVyYXRlIGEgcmFuZG9tIHBhZGRpbmcgYnVmZmVyIG9mIHRoZSBjaG9zZW4gc2l6ZVxuICAgIHJldHVybiBnZXRSYW5kb21CeXRlcyhwYWRkaW5nTGVuZ3RoKTtcbiAgfVxuXG4gIGdldFBhZGRlZEF0dGFjaG1lbnQoZGF0YTogUmVhZG9ubHk8VWludDhBcnJheT4pOiBVaW50OEFycmF5IHtcbiAgICBjb25zdCBzaXplID0gZGF0YS5ieXRlTGVuZ3RoO1xuICAgIGNvbnN0IHBhZGRlZFNpemUgPSB0aGlzLl9nZXRBdHRhY2htZW50U2l6ZUJ1Y2tldChzaXplKTtcbiAgICBjb25zdCBwYWRkaW5nID0gZ2V0WmVyb2VzKHBhZGRlZFNpemUgLSBzaXplKTtcblxuICAgIHJldHVybiBCeXRlcy5jb25jYXRlbmF0ZShbZGF0YSwgcGFkZGluZ10pO1xuICB9XG5cbiAgYXN5bmMgbWFrZUF0dGFjaG1lbnRQb2ludGVyKFxuICAgIGF0dGFjaG1lbnQ6IFJlYWRvbmx5PFxuICAgICAgUGFydGlhbDxBdHRhY2htZW50VHlwZT4gJlxuICAgICAgICBQaWNrPEF0dGFjaG1lbnRUeXBlLCAnZGF0YScgfCAnc2l6ZScgfCAnY29udGVudFR5cGUnPlxuICAgID5cbiAgKTogUHJvbWlzZTxQcm90by5JQXR0YWNobWVudFBvaW50ZXI+IHtcbiAgICBhc3NlcnQoXG4gICAgICB0eXBlb2YgYXR0YWNobWVudCA9PT0gJ29iamVjdCcgJiYgYXR0YWNobWVudCAhPT0gbnVsbCxcbiAgICAgICdHb3QgbnVsbCBhdHRhY2htZW50IGluIGBtYWtlQXR0YWNobWVudFBvaW50ZXJgJ1xuICAgICk7XG5cbiAgICBjb25zdCB7IGRhdGEsIHNpemUsIGNvbnRlbnRUeXBlIH0gPSBhdHRhY2htZW50O1xuICAgIGlmICghKGRhdGEgaW5zdGFuY2VvZiBVaW50OEFycmF5KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbWFrZUF0dGFjaG1lbnRQb2ludGVyOiBkYXRhIHdhcyBhICcke3R5cGVvZiBkYXRhfScgaW5zdGVhZCBvZiBVaW50OEFycmF5YFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKGRhdGEuYnl0ZUxlbmd0aCAhPT0gc2l6ZSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgbWFrZUF0dGFjaG1lbnRQb2ludGVyOiBTaXplICR7c2l6ZX0gZGlkIG5vdCBtYXRjaCBkYXRhLmJ5dGVMZW5ndGggJHtkYXRhLmJ5dGVMZW5ndGh9YFxuICAgICAgKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjb250ZW50VHlwZSAhPT0gJ3N0cmluZycpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYG1ha2VBdHRhY2htZW50UG9pbnRlcjogY29udGVudFR5cGUgJHtjb250ZW50VHlwZX0gd2FzIG5vdCBhIHN0cmluZ2BcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcGFkZGVkID0gdGhpcy5nZXRQYWRkZWRBdHRhY2htZW50KGRhdGEpO1xuICAgIGNvbnN0IGtleSA9IGdldFJhbmRvbUJ5dGVzKDY0KTtcbiAgICBjb25zdCBpdiA9IGdldFJhbmRvbUJ5dGVzKDE2KTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IGVuY3J5cHRBdHRhY2htZW50KHBhZGRlZCwga2V5LCBpdik7XG4gICAgY29uc3QgaWQgPSBhd2FpdCB0aGlzLnNlcnZlci5wdXRBdHRhY2htZW50KHJlc3VsdC5jaXBoZXJ0ZXh0KTtcblxuICAgIGNvbnN0IHByb3RvID0gbmV3IFByb3RvLkF0dGFjaG1lbnRQb2ludGVyKCk7XG4gICAgcHJvdG8uY2RuSWQgPSBMb25nLmZyb21TdHJpbmcoaWQpO1xuICAgIHByb3RvLmNvbnRlbnRUeXBlID0gYXR0YWNobWVudC5jb250ZW50VHlwZTtcbiAgICBwcm90by5rZXkgPSBrZXk7XG4gICAgcHJvdG8uc2l6ZSA9IGRhdGEuYnl0ZUxlbmd0aDtcbiAgICBwcm90by5kaWdlc3QgPSByZXN1bHQuZGlnZXN0O1xuXG4gICAgaWYgKGF0dGFjaG1lbnQuZmlsZU5hbWUpIHtcbiAgICAgIHByb3RvLmZpbGVOYW1lID0gYXR0YWNobWVudC5maWxlTmFtZTtcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnQuZmxhZ3MpIHtcbiAgICAgIHByb3RvLmZsYWdzID0gYXR0YWNobWVudC5mbGFncztcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnQud2lkdGgpIHtcbiAgICAgIHByb3RvLndpZHRoID0gYXR0YWNobWVudC53aWR0aDtcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnQuaGVpZ2h0KSB7XG4gICAgICBwcm90by5oZWlnaHQgPSBhdHRhY2htZW50LmhlaWdodDtcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnQuY2FwdGlvbikge1xuICAgICAgcHJvdG8uY2FwdGlvbiA9IGF0dGFjaG1lbnQuY2FwdGlvbjtcbiAgICB9XG4gICAgaWYgKGF0dGFjaG1lbnQuYmx1ckhhc2gpIHtcbiAgICAgIHByb3RvLmJsdXJIYXNoID0gYXR0YWNobWVudC5ibHVySGFzaDtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvdG87XG4gIH1cblxuICBhc3luYyB1cGxvYWRBdHRhY2htZW50cyhtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbWVzc2FnZS5hdHRhY2htZW50UG9pbnRlcnMgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgbWVzc2FnZS5hdHRhY2htZW50cy5tYXAoYXR0YWNobWVudCA9PlxuICAgICAgICAgIHRoaXMubWFrZUF0dGFjaG1lbnRQb2ludGVyKGF0dGFjaG1lbnQpXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgTWVzc2FnZUVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwbG9hZExpbmtQcmV2aWV3cyhtZXNzYWdlOiBNZXNzYWdlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IHByZXZpZXcgPSBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAgICAgKG1lc3NhZ2UucHJldmlldyB8fCBbXSkubWFwKGFzeW5jIChpdGVtOiBSZWFkb25seTxMaW5rUHJldmlld1R5cGU+KSA9PiB7XG4gICAgICAgICAgaWYgKCFpdGVtLmltYWdlKSB7XG4gICAgICAgICAgICByZXR1cm4gaXRlbTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgYXR0YWNobWVudCA9IG1ha2VBdHRhY2htZW50U2VuZFJlYWR5KGl0ZW0uaW1hZ2UpO1xuICAgICAgICAgIGlmICghYXR0YWNobWVudCkge1xuICAgICAgICAgICAgcmV0dXJuIGl0ZW07XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIC4uLml0ZW0sXG4gICAgICAgICAgICBhdHRhY2htZW50UG9pbnRlcjogYXdhaXQgdGhpcy5tYWtlQXR0YWNobWVudFBvaW50ZXIoYXR0YWNobWVudCksXG4gICAgICAgICAgfTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgICAgIG1lc3NhZ2UucHJldmlldyA9IHByZXZpZXc7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgTWVzc2FnZUVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwbG9hZFN0aWNrZXIobWVzc2FnZTogTWVzc2FnZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBjb25zdCB7IHN0aWNrZXIgfSA9IG1lc3NhZ2U7XG5cbiAgICAgIGlmICghc3RpY2tlcikge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoIXN0aWNrZXIuZGF0YSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwbG9hZFN0aWNrZXI6IE5vIHN0aWNrZXIgZGF0YSB0byB1cGxvYWQhJyk7XG4gICAgICB9XG5cbiAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgbWVzc2FnZS5zdGlja2VyID0ge1xuICAgICAgICAuLi5zdGlja2VyLFxuICAgICAgICBhdHRhY2htZW50UG9pbnRlcjogYXdhaXQgdGhpcy5tYWtlQXR0YWNobWVudFBvaW50ZXIoc3RpY2tlci5kYXRhKSxcbiAgICAgIH07XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgTWVzc2FnZUVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwbG9hZENvbnRhY3RBdmF0YXIobWVzc2FnZTogTWVzc2FnZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgY29udGFjdCB9ID0gbWVzc2FnZTtcbiAgICBpZiAoIWNvbnRhY3QgfHwgY29udGFjdC5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICAgIGNvbnRhY3QubWFwKGFzeW5jIChpdGVtOiBDb250YWN0V2l0aEh5ZHJhdGVkQXZhdGFyKSA9PiB7XG4gICAgICAgICAgY29uc3QgaXRlbUF2YXRhciA9IGl0ZW0/LmF2YXRhcjtcbiAgICAgICAgICBjb25zdCBhdmF0YXIgPSBpdGVtQXZhdGFyPy5hdmF0YXI7XG5cbiAgICAgICAgICBpZiAoIWl0ZW1BdmF0YXIgfHwgIWF2YXRhciB8fCAhYXZhdGFyLmRhdGEpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBhdHRhY2htZW50ID0gbWFrZUF0dGFjaG1lbnRTZW5kUmVhZHkoYXZhdGFyKTtcbiAgICAgICAgICBpZiAoIWF0dGFjaG1lbnQpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBpdGVtQXZhdGFyLmF0dGFjaG1lbnRQb2ludGVyID0gYXdhaXQgdGhpcy5tYWtlQXR0YWNobWVudFBvaW50ZXIoXG4gICAgICAgICAgICBhdHRhY2htZW50XG4gICAgICAgICAgKTtcbiAgICAgICAgfSlcbiAgICAgICk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGlmIChlcnJvciBpbnN0YW5jZW9mIEhUVFBFcnJvcikge1xuICAgICAgICB0aHJvdyBuZXcgTWVzc2FnZUVycm9yKG1lc3NhZ2UsIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHVwbG9hZFRodW1ibmFpbHMobWVzc2FnZTogTWVzc2FnZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgcXVvdGUgfSA9IG1lc3NhZ2U7XG4gICAgaWYgKCFxdW90ZSB8fCAhcXVvdGUuYXR0YWNobWVudHMgfHwgcXVvdGUuYXR0YWNobWVudHMubGVuZ3RoID09PSAwKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgICBxdW90ZS5hdHRhY2htZW50cy5tYXAoYXN5bmMgKGF0dGFjaG1lbnQ6IFF1b3RlQXR0YWNobWVudFR5cGUpID0+IHtcbiAgICAgICAgICBpZiAoIWF0dGFjaG1lbnQudGh1bWJuYWlsKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgICAgICAgYXR0YWNobWVudC5hdHRhY2htZW50UG9pbnRlciA9IGF3YWl0IHRoaXMubWFrZUF0dGFjaG1lbnRQb2ludGVyKFxuICAgICAgICAgICAgYXR0YWNobWVudC50aHVtYm5haWxcbiAgICAgICAgICApO1xuICAgICAgICB9KVxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgSFRUUEVycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBNZXNzYWdlRXJyb3IobWVzc2FnZSwgZXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUHJvdG8gYXNzZW1ibHlcblxuICBhc3luYyBnZXREYXRhTWVzc2FnZShcbiAgICBvcHRpb25zOiBSZWFkb25seTxNZXNzYWdlT3B0aW9uc1R5cGU+XG4gICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBhd2FpdCB0aGlzLmdldEh5ZHJhdGVkTWVzc2FnZShvcHRpb25zKTtcbiAgICByZXR1cm4gbWVzc2FnZS5lbmNvZGUoKTtcbiAgfVxuXG4gIGFzeW5jIGdldENvbnRlbnRNZXNzYWdlKFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PE1lc3NhZ2VPcHRpb25zVHlwZT5cbiAgKTogUHJvbWlzZTxQcm90by5Db250ZW50PiB7XG4gICAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IHRoaXMuZ2V0SHlkcmF0ZWRNZXNzYWdlKG9wdGlvbnMpO1xuICAgIGNvbnN0IGRhdGFNZXNzYWdlID0gbWVzc2FnZS50b1Byb3RvKCk7XG5cbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2UuZGF0YU1lc3NhZ2UgPSBkYXRhTWVzc2FnZTtcblxuICAgIHJldHVybiBjb250ZW50TWVzc2FnZTtcbiAgfVxuXG4gIGFzeW5jIGdldEh5ZHJhdGVkTWVzc2FnZShcbiAgICBhdHRyaWJ1dGVzOiBSZWFkb25seTxNZXNzYWdlT3B0aW9uc1R5cGU+XG4gICk6IFByb21pc2U8TWVzc2FnZT4ge1xuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgTWVzc2FnZShhdHRyaWJ1dGVzKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB0aGlzLnVwbG9hZEF0dGFjaG1lbnRzKG1lc3NhZ2UpLFxuICAgICAgdGhpcy51cGxvYWRDb250YWN0QXZhdGFyKG1lc3NhZ2UpLFxuICAgICAgdGhpcy51cGxvYWRUaHVtYm5haWxzKG1lc3NhZ2UpLFxuICAgICAgdGhpcy51cGxvYWRMaW5rUHJldmlld3MobWVzc2FnZSksXG4gICAgICB0aGlzLnVwbG9hZFN0aWNrZXIobWVzc2FnZSksXG4gICAgXSk7XG5cbiAgICByZXR1cm4gbWVzc2FnZTtcbiAgfVxuXG4gIGdldFR5cGluZ0NvbnRlbnRNZXNzYWdlKFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PHtcbiAgICAgIHJlY2lwaWVudElkPzogc3RyaW5nO1xuICAgICAgZ3JvdXBJZD86IFVpbnQ4QXJyYXk7XG4gICAgICBncm91cE1lbWJlcnM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgICAgIGlzVHlwaW5nOiBib29sZWFuO1xuICAgICAgdGltZXN0YW1wPzogbnVtYmVyO1xuICAgIH0+XG4gICk6IFByb3RvLkNvbnRlbnQge1xuICAgIGNvbnN0IEFDVElPTl9FTlVNID0gUHJvdG8uVHlwaW5nTWVzc2FnZS5BY3Rpb247XG4gICAgY29uc3QgeyByZWNpcGllbnRJZCwgZ3JvdXBJZCwgaXNUeXBpbmcsIHRpbWVzdGFtcCB9ID0gb3B0aW9ucztcblxuICAgIGlmICghcmVjaXBpZW50SWQgJiYgIWdyb3VwSWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ2dldFR5cGluZ0NvbnRlbnRNZXNzYWdlOiBOZWVkIHRvIHByb3ZpZGUgZWl0aGVyIHJlY2lwaWVudElkIG9yIGdyb3VwSWQhJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBmaW5hbFRpbWVzdGFtcCA9IHRpbWVzdGFtcCB8fCBEYXRlLm5vdygpO1xuICAgIGNvbnN0IGFjdGlvbiA9IGlzVHlwaW5nID8gQUNUSU9OX0VOVU0uU1RBUlRFRCA6IEFDVElPTl9FTlVNLlNUT1BQRUQ7XG5cbiAgICBjb25zdCB0eXBpbmdNZXNzYWdlID0gbmV3IFByb3RvLlR5cGluZ01lc3NhZ2UoKTtcbiAgICBpZiAoZ3JvdXBJZCkge1xuICAgICAgdHlwaW5nTWVzc2FnZS5ncm91cElkID0gZ3JvdXBJZDtcbiAgICB9XG4gICAgdHlwaW5nTWVzc2FnZS5hY3Rpb24gPSBhY3Rpb247XG4gICAgdHlwaW5nTWVzc2FnZS50aW1lc3RhbXAgPSBMb25nLmZyb21OdW1iZXIoZmluYWxUaW1lc3RhbXApO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnR5cGluZ01lc3NhZ2UgPSB0eXBpbmdNZXNzYWdlO1xuXG4gICAgcmV0dXJuIGNvbnRlbnRNZXNzYWdlO1xuICB9XG5cbiAgZ2V0QXR0cnNGcm9tR3JvdXBPcHRpb25zKFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PEdyb3VwU2VuZE9wdGlvbnNUeXBlPlxuICApOiBNZXNzYWdlT3B0aW9uc1R5cGUge1xuICAgIGNvbnN0IHtcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgY29udGFjdCxcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcCxcbiAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgZmxhZ3MsXG4gICAgICBncm91cENhbGxVcGRhdGUsXG4gICAgICBncm91cFYxLFxuICAgICAgZ3JvdXBWMixcbiAgICAgIG1lbnRpb25zLFxuICAgICAgbWVzc2FnZVRleHQsXG4gICAgICBwcmV2aWV3LFxuICAgICAgcHJvZmlsZUtleSxcbiAgICAgIHF1b3RlLFxuICAgICAgcmVhY3Rpb24sXG4gICAgICBzdGlja2VyLFxuICAgICAgc3RvcnlDb250ZXh0LFxuICAgICAgdGltZXN0YW1wLFxuICAgIH0gPSBvcHRpb25zO1xuXG4gICAgaWYgKCFncm91cFYxICYmICFncm91cFYyKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdnZXRBdHRyc0Zyb21Hcm91cE9wdGlvbnM6IE5laXRoZXIgZ3JvdXAxIG5vciBncm91cHYyIGluZm9ybWF0aW9uIHByb3ZpZGVkISdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgbXlFMTY0ID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldE51bWJlcigpO1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRVdWlkKCk/LnRvU3RyaW5nKCk7XG5cbiAgICBjb25zdCBncm91cE1lbWJlcnMgPSBncm91cFYyPy5tZW1iZXJzIHx8IGdyb3VwVjE/Lm1lbWJlcnMgfHwgW107XG5cbiAgICAvLyBXZSBzaG91bGQgYWx3YXlzIGhhdmUgYSBVVUlEIGJ1dCBoYXZlIHRoaXMgY2hlY2sganVzdCBpbiBjYXNlIHdlIGRvbid0LlxuICAgIGxldCBpc05vdE1lOiAocmVjaXBpZW50OiBzdHJpbmcpID0+IGJvb2xlYW47XG4gICAgaWYgKG15VXVpZCkge1xuICAgICAgaXNOb3RNZSA9IHIgPT4gciAhPT0gbXlFMTY0ICYmIHIgIT09IG15VXVpZC50b1N0cmluZygpO1xuICAgIH0gZWxzZSB7XG4gICAgICBpc05vdE1lID0gciA9PiByICE9PSBteUUxNjQ7XG4gICAgfVxuXG4gICAgY29uc3QgYmxvY2tlZElkZW50aWZpZXJzID0gbmV3IFNldChcbiAgICAgIGNvbmNhdChcbiAgICAgICAgd2luZG93LnN0b3JhZ2UuYmxvY2tlZC5nZXRCbG9ja2VkVXVpZHMoKSxcbiAgICAgICAgd2luZG93LnN0b3JhZ2UuYmxvY2tlZC5nZXRCbG9ja2VkTnVtYmVycygpXG4gICAgICApXG4gICAgKTtcblxuICAgIGNvbnN0IHJlY2lwaWVudHMgPSBncm91cE1lbWJlcnMuZmlsdGVyKFxuICAgICAgcmVjaXBpZW50ID0+IGlzTm90TWUocmVjaXBpZW50KSAmJiAhYmxvY2tlZElkZW50aWZpZXJzLmhhcyhyZWNpcGllbnQpXG4gICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBhdHRhY2htZW50cyxcbiAgICAgIGJvZHk6IG1lc3NhZ2VUZXh0LFxuICAgICAgY29udGFjdCxcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcCxcbiAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgZmxhZ3MsXG4gICAgICBncm91cENhbGxVcGRhdGUsXG4gICAgICBncm91cFYyLFxuICAgICAgZ3JvdXA6IGdyb3VwVjFcbiAgICAgICAgPyB7XG4gICAgICAgICAgICBpZDogZ3JvdXBWMS5pZCxcbiAgICAgICAgICAgIHR5cGU6IFByb3RvLkdyb3VwQ29udGV4dC5UeXBlLkRFTElWRVIsXG4gICAgICAgICAgfVxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIG1lbnRpb25zLFxuICAgICAgcHJldmlldyxcbiAgICAgIHByb2ZpbGVLZXksXG4gICAgICBxdW90ZSxcbiAgICAgIHJlYWN0aW9uLFxuICAgICAgcmVjaXBpZW50cyxcbiAgICAgIHN0aWNrZXIsXG4gICAgICBzdG9yeUNvbnRleHQsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBjcmVhdGVTeW5jTWVzc2FnZSgpOiBQcm90by5TeW5jTWVzc2FnZSB7XG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UoKTtcblxuICAgIHN5bmNNZXNzYWdlLnBhZGRpbmcgPSB0aGlzLmdldFJhbmRvbVBhZGRpbmcoKTtcblxuICAgIHJldHVybiBzeW5jTWVzc2FnZTtcbiAgfVxuXG4gIC8vIExvdy1sZXZlbCBzZW5kc1xuXG4gIGFzeW5jIHNlbmRNZXNzYWdlKHtcbiAgICBtZXNzYWdlT3B0aW9ucyxcbiAgICBjb250ZW50SGludCxcbiAgICBncm91cElkLFxuICAgIG9wdGlvbnMsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBtZXNzYWdlT3B0aW9uczogTWVzc2FnZU9wdGlvbnNUeXBlO1xuICAgIGNvbnRlbnRIaW50OiBudW1iZXI7XG4gICAgZ3JvdXBJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIG9wdGlvbnM/OiBTZW5kT3B0aW9uc1R5cGU7XG4gIH0+KTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICBjb25zdCBtZXNzYWdlID0gYXdhaXQgdGhpcy5nZXRIeWRyYXRlZE1lc3NhZ2UobWVzc2FnZU9wdGlvbnMpO1xuXG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2VQcm90byh7XG4gICAgICAgIGNhbGxiYWNrOiAocmVzOiBDYWxsYmFja1Jlc3VsdFR5cGUpID0+IHtcbiAgICAgICAgICBpZiAocmVzLmVycm9ycyAmJiByZXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICAgIHJlamVjdChuZXcgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKHJlcykpO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBjb250ZW50SGludCxcbiAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcHJvdG86IG1lc3NhZ2UudG9Qcm90bygpLFxuICAgICAgICByZWNpcGllbnRzOiBtZXNzYWdlLnJlY2lwaWVudHMgfHwgW10sXG4gICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZS50aW1lc3RhbXAsXG4gICAgICB9KTtcbiAgICB9KTtcbiAgfVxuXG4gIHNlbmRNZXNzYWdlUHJvdG8oe1xuICAgIGNhbGxiYWNrLFxuICAgIGNvbnRlbnRIaW50LFxuICAgIGdyb3VwSWQsXG4gICAgb3B0aW9ucyxcbiAgICBwcm90byxcbiAgICByZWNpcGllbnRzLFxuICAgIHNlbmRMb2dDYWxsYmFjayxcbiAgICB0aW1lc3RhbXAsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBjYWxsYmFjazogKHJlc3VsdDogQ2FsbGJhY2tSZXN1bHRUeXBlKSA9PiB2b2lkO1xuICAgIGNvbnRlbnRIaW50OiBudW1iZXI7XG4gICAgZ3JvdXBJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIG9wdGlvbnM/OiBTZW5kT3B0aW9uc1R5cGU7XG4gICAgcHJvdG86IFByb3RvLkNvbnRlbnQgfCBQcm90by5EYXRhTWVzc2FnZSB8IFBsYWludGV4dENvbnRlbnQ7XG4gICAgcmVjaXBpZW50czogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xuICAgIHNlbmRMb2dDYWxsYmFjaz86IFNlbmRMb2dDYWxsYmFja1R5cGU7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0+KTogdm9pZCB7XG4gICAgY29uc3QgcmVqZWN0aW9ucyA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UuZ2V0KFxuICAgICAgJ3NpZ25lZEtleVJvdGF0aW9uUmVqZWN0ZWQnLFxuICAgICAgMFxuICAgICk7XG4gICAgaWYgKHJlamVjdGlvbnMgPiA1KSB7XG4gICAgICB0aHJvdyBuZXcgU2lnbmVkUHJlS2V5Um90YXRpb25FcnJvcigpO1xuICAgIH1cblxuICAgIGNvbnN0IG91dGdvaW5nID0gbmV3IE91dGdvaW5nTWVzc2FnZSh7XG4gICAgICBjYWxsYmFjayxcbiAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgZ3JvdXBJZCxcbiAgICAgIGlkZW50aWZpZXJzOiByZWNpcGllbnRzLFxuICAgICAgbWVzc2FnZTogcHJvdG8sXG4gICAgICBvcHRpb25zLFxuICAgICAgc2VuZExvZ0NhbGxiYWNrLFxuICAgICAgc2VydmVyOiB0aGlzLnNlcnZlcixcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9KTtcblxuICAgIHJlY2lwaWVudHMuZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICAgIHRoaXMucXVldWVKb2JGb3JJZGVudGlmaWVyKGlkZW50aWZpZXIsIGFzeW5jICgpID0+XG4gICAgICAgIG91dGdvaW5nLnNlbmRUb0lkZW50aWZpZXIoaWRlbnRpZmllcilcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzZW5kTWVzc2FnZVByb3RvQW5kV2FpdCh7XG4gICAgdGltZXN0YW1wLFxuICAgIHJlY2lwaWVudHMsXG4gICAgcHJvdG8sXG4gICAgY29udGVudEhpbnQsXG4gICAgZ3JvdXBJZCxcbiAgICBvcHRpb25zLFxuICB9OiBSZWFkb25seTx7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gICAgcmVjaXBpZW50czogQXJyYXk8c3RyaW5nPjtcbiAgICBwcm90bzogUHJvdG8uQ29udGVudCB8IFByb3RvLkRhdGFNZXNzYWdlIHwgUGxhaW50ZXh0Q29udGVudDtcbiAgICBjb250ZW50SGludDogbnVtYmVyO1xuICAgIGdyb3VwSWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICBvcHRpb25zPzogU2VuZE9wdGlvbnNUeXBlO1xuICB9Pik6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICAgIGNvbnN0IGNhbGxiYWNrID0gKHJlc3VsdDogQ2FsbGJhY2tSZXN1bHRUeXBlKSA9PiB7XG4gICAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZWplY3QobmV3IFNlbmRNZXNzYWdlUHJvdG9FcnJvcihyZXN1bHQpKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgcmVzb2x2ZShyZXN1bHQpO1xuICAgICAgfTtcblxuICAgICAgdGhpcy5zZW5kTWVzc2FnZVByb3RvKHtcbiAgICAgICAgY2FsbGJhY2ssXG4gICAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgICBncm91cElkLFxuICAgICAgICBvcHRpb25zLFxuICAgICAgICBwcm90byxcbiAgICAgICAgcmVjaXBpZW50cyxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzZW5kSW5kaXZpZHVhbFByb3RvKHtcbiAgICBjb250ZW50SGludCxcbiAgICBncm91cElkLFxuICAgIGlkZW50aWZpZXIsXG4gICAgb3B0aW9ucyxcbiAgICBwcm90byxcbiAgICB0aW1lc3RhbXAsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBjb250ZW50SGludDogbnVtYmVyO1xuICAgIGdyb3VwSWQ/OiBzdHJpbmc7XG4gICAgaWRlbnRpZmllcjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIG9wdGlvbnM/OiBTZW5kT3B0aW9uc1R5cGU7XG4gICAgcHJvdG86IFByb3RvLkRhdGFNZXNzYWdlIHwgUHJvdG8uQ29udGVudCB8IFBsYWludGV4dENvbnRlbnQ7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0+KTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICBhc3NlcnQoaWRlbnRpZmllciwgXCJJZGVudGlmaWVyIGNhbid0IGJlIHVuZGVmaW5lZFwiKTtcbiAgICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgICAgY29uc3QgY2FsbGJhY2sgPSAocmVzOiBDYWxsYmFja1Jlc3VsdFR5cGUpID0+IHtcbiAgICAgICAgaWYgKHJlcyAmJiByZXMuZXJyb3JzICYmIHJlcy5lcnJvcnMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIHJlamVjdChuZXcgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKHJlcykpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIHJlc29sdmUocmVzKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2VQcm90byh7XG4gICAgICAgIGNhbGxiYWNrLFxuICAgICAgICBjb250ZW50SGludCxcbiAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcHJvdG8sXG4gICAgICAgIHJlY2lwaWVudHM6IFtpZGVudGlmaWVyXSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICAvLyBZb3UgbWlnaHQgd29uZGVyIHdoeSB0aGlzIHRha2VzIGEgZ3JvdXBJZC4gbW9kZWxzL21lc3NhZ2VzLnJlc2VuZCgpIGNhbiBzZW5kIGEgZ3JvdXBcbiAgLy8gICBtZXNzYWdlIHRvIGp1c3Qgb25lIHBlcnNvbi5cbiAgYXN5bmMgc2VuZE1lc3NhZ2VUb0lkZW50aWZpZXIoe1xuICAgIGF0dGFjaG1lbnRzLFxuICAgIGNvbnRhY3QsXG4gICAgY29udGVudEhpbnQsXG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wLFxuICAgIGV4cGlyZVRpbWVyLFxuICAgIGdyb3VwSWQsXG4gICAgaWRlbnRpZmllcixcbiAgICBtZXNzYWdlVGV4dCxcbiAgICBvcHRpb25zLFxuICAgIHByZXZpZXcsXG4gICAgcHJvZmlsZUtleSxcbiAgICBxdW90ZSxcbiAgICByZWFjdGlvbixcbiAgICBzdGlja2VyLFxuICAgIHN0b3J5Q29udGV4dCxcbiAgICB0aW1lc3RhbXAsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBhdHRhY2htZW50czogUmVhZG9ubHlBcnJheTxBdHRhY2htZW50VHlwZT4gfCB1bmRlZmluZWQ7XG4gICAgY29udGFjdD86IEFycmF5PENvbnRhY3RXaXRoSHlkcmF0ZWRBdmF0YXI+O1xuICAgIGNvbnRlbnRIaW50OiBudW1iZXI7XG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wOiBudW1iZXIgfCB1bmRlZmluZWQ7XG4gICAgZXhwaXJlVGltZXI6IG51bWJlciB8IHVuZGVmaW5lZDtcbiAgICBncm91cElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgaWRlbnRpZmllcjogc3RyaW5nO1xuICAgIG1lc3NhZ2VUZXh0OiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgb3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgICBwcmV2aWV3PzogUmVhZG9ubHlBcnJheTxMaW5rUHJldmlld1R5cGU+IHwgdW5kZWZpbmVkO1xuICAgIHByb2ZpbGVLZXk/OiBVaW50OEFycmF5O1xuICAgIHF1b3RlPzogUXVvdGVUeXBlO1xuICAgIHJlYWN0aW9uPzogUmVhY3Rpb25UeXBlO1xuICAgIHN0aWNrZXI/OiBTdGlja2VyVHlwZTtcbiAgICBzdG9yeUNvbnRleHQ/OiBTdG9yeUNvbnRleHRUeXBlO1xuICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICB9Pik6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2Uoe1xuICAgICAgbWVzc2FnZU9wdGlvbnM6IHtcbiAgICAgICAgYXR0YWNobWVudHMsXG4gICAgICAgIGJvZHk6IG1lc3NhZ2VUZXh0LFxuICAgICAgICBjb250YWN0LFxuICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmVUaW1lc3RhbXAsXG4gICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICBwcmV2aWV3LFxuICAgICAgICBwcm9maWxlS2V5LFxuICAgICAgICBxdW90ZSxcbiAgICAgICAgcmVhY3Rpb24sXG4gICAgICAgIHJlY2lwaWVudHM6IFtpZGVudGlmaWVyXSxcbiAgICAgICAgc3RpY2tlcixcbiAgICAgICAgc3RvcnlDb250ZXh0LFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9LFxuICAgICAgY29udGVudEhpbnQsXG4gICAgICBncm91cElkLFxuICAgICAgb3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFN1cHBvcnQgZm9yIHN5bmMgbWVzc2FnZXNcblxuICAvLyBOb3RlOiB0aGlzIGlzIHVzZWQgZm9yIHNlbmRpbmcgcmVhbCBtZXNzYWdlcyB0byB5b3VyIG90aGVyIGRldmljZXMgYWZ0ZXIgc2VuZGluZyBhXG4gIC8vICAgbWVzc2FnZSB0byBvdGhlcnMuXG4gIGFzeW5jIHNlbmRTeW5jTWVzc2FnZSh7XG4gICAgZW5jb2RlZERhdGFNZXNzYWdlLFxuICAgIHRpbWVzdGFtcCxcbiAgICBkZXN0aW5hdGlvbixcbiAgICBkZXN0aW5hdGlvblV1aWQsXG4gICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wLFxuICAgIGNvbnZlcnNhdGlvbklkc1NlbnRUbyA9IFtdLFxuICAgIGNvbnZlcnNhdGlvbklkc1dpdGhTZWFsZWRTZW5kZXIgPSBuZXcgU2V0KCksXG4gICAgaXNVcGRhdGUsXG4gICAgb3B0aW9ucyxcbiAgfTogUmVhZG9ubHk8e1xuICAgIGVuY29kZWREYXRhTWVzc2FnZTogVWludDhBcnJheTtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICBkZXN0aW5hdGlvbjogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGRlc3RpbmF0aW9uVXVpZDogc3RyaW5nIHwgbnVsbCB8IHVuZGVmaW5lZDtcbiAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IG51bWJlciB8IG51bGw7XG4gICAgY29udmVyc2F0aW9uSWRzU2VudFRvPzogSXRlcmFibGU8c3RyaW5nPjtcbiAgICBjb252ZXJzYXRpb25JZHNXaXRoU2VhbGVkU2VuZGVyPzogU2V0PHN0cmluZz47XG4gICAgaXNVcGRhdGU/OiBib29sZWFuO1xuICAgIG9wdGlvbnM/OiBTZW5kT3B0aW9uc1R5cGU7XG4gIH0+KTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IGRhdGFNZXNzYWdlID0gUHJvdG8uRGF0YU1lc3NhZ2UuZGVjb2RlKGVuY29kZWREYXRhTWVzc2FnZSk7XG4gICAgY29uc3Qgc2VudE1lc3NhZ2UgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuU2VudCgpO1xuICAgIHNlbnRNZXNzYWdlLnRpbWVzdGFtcCA9IExvbmcuZnJvbU51bWJlcih0aW1lc3RhbXApO1xuICAgIHNlbnRNZXNzYWdlLm1lc3NhZ2UgPSBkYXRhTWVzc2FnZTtcbiAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgIHNlbnRNZXNzYWdlLmRlc3RpbmF0aW9uID0gZGVzdGluYXRpb247XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvblV1aWQpIHtcbiAgICAgIHNlbnRNZXNzYWdlLmRlc3RpbmF0aW9uVXVpZCA9IGRlc3RpbmF0aW9uVXVpZDtcbiAgICB9XG4gICAgaWYgKGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCkge1xuICAgICAgc2VudE1lc3NhZ2UuZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wID0gTG9uZy5mcm9tTnVtYmVyKFxuICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaWYgKGlzVXBkYXRlKSB7XG4gICAgICBzZW50TWVzc2FnZS5pc1JlY2lwaWVudFVwZGF0ZSA9IHRydWU7XG4gICAgfVxuXG4gICAgLy8gVGhvdWdoIHRoaXMgZmllbGQgaGFzICd1bmlkZW50aWZpZWQnIGluIHRoZSBuYW1lLCBpdCBzaG91bGQgaGF2ZSBlbnRyaWVzIGZvciBlYWNoXG4gICAgLy8gICBudW1iZXIgd2Ugc2VudCB0by5cbiAgICBpZiAoIWlzRW1wdHkoY29udmVyc2F0aW9uSWRzU2VudFRvKSkge1xuICAgICAgc2VudE1lc3NhZ2UudW5pZGVudGlmaWVkU3RhdHVzID0gW1xuICAgICAgICAuLi5tYXAoY29udmVyc2F0aW9uSWRzU2VudFRvLCBjb252ZXJzYXRpb25JZCA9PiB7XG4gICAgICAgICAgY29uc3Qgc3RhdHVzID1cbiAgICAgICAgICAgIG5ldyBQcm90by5TeW5jTWVzc2FnZS5TZW50LlVuaWRlbnRpZmllZERlbGl2ZXJ5U3RhdHVzKCk7XG4gICAgICAgICAgY29uc3QgY29udiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICAgICAgaWYgKGNvbnYpIHtcbiAgICAgICAgICAgIGNvbnN0IGUxNjQgPSBjb252LmdldCgnZTE2NCcpO1xuICAgICAgICAgICAgaWYgKGUxNjQpIHtcbiAgICAgICAgICAgICAgc3RhdHVzLmRlc3RpbmF0aW9uID0gZTE2NDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGNvbnN0IHV1aWQgPSBjb252LmdldCgndXVpZCcpO1xuICAgICAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgICAgc3RhdHVzLmRlc3RpbmF0aW9uVXVpZCA9IHV1aWQ7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuICAgICAgICAgIHN0YXR1cy51bmlkZW50aWZpZWQgPVxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWRzV2l0aFNlYWxlZFNlbmRlci5oYXMoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICAgIHJldHVybiBzdGF0dXM7XG4gICAgICAgIH0pLFxuICAgICAgXTtcbiAgICB9XG5cbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IE1lc3NhZ2VTZW5kZXIuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS5zZW50ID0gc2VudE1lc3NhZ2U7XG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kSW5kaXZpZHVhbFByb3RvKHtcbiAgICAgIGlkZW50aWZpZXI6IG15VXVpZC50b1N0cmluZygpLFxuICAgICAgcHJvdG86IGNvbnRlbnRNZXNzYWdlLFxuICAgICAgdGltZXN0YW1wLFxuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBvcHRpb25zLFxuICAgIH0pO1xuICB9XG5cbiAgc3RhdGljIGdldFJlcXVlc3RCbG9ja1N5bmNNZXNzYWdlKCk6IFNpbmdsZVByb3RvSm9iRGF0YSB7XG4gICAgY29uc3QgbXlVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgICBjb25zdCByZXF1ZXN0ID0gbmV3IFByb3RvLlN5bmNNZXNzYWdlLlJlcXVlc3QoKTtcbiAgICByZXF1ZXN0LnR5cGUgPSBQcm90by5TeW5jTWVzc2FnZS5SZXF1ZXN0LlR5cGUuQkxPQ0tFRDtcbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IE1lc3NhZ2VTZW5kZXIuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIGlkZW50aWZpZXI6IG15VXVpZC50b1N0cmluZygpLFxuICAgICAgaXNTeW5jTWVzc2FnZTogdHJ1ZSxcbiAgICAgIHByb3RvQmFzZTY0OiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgUHJvdG8uQ29udGVudC5lbmNvZGUoY29udGVudE1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICApLFxuICAgICAgdHlwZTogJ2Jsb2NrU3luY1JlcXVlc3QnLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0UmVxdWVzdENvbmZpZ3VyYXRpb25TeW5jTWVzc2FnZSgpOiBTaW5nbGVQcm90b0pvYkRhdGEge1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBQcm90by5TeW5jTWVzc2FnZS5SZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC50eXBlID0gUHJvdG8uU3luY01lc3NhZ2UuUmVxdWVzdC5UeXBlLkNPTkZJR1VSQVRJT047XG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSBNZXNzYWdlU2VuZGVyLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2UucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyOiBteVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGlzU3luY01lc3NhZ2U6IHRydWUsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICdjb25maWd1cmF0aW9uU3luY1JlcXVlc3QnLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0UmVxdWVzdEdyb3VwU3luY01lc3NhZ2UoKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuUmVxdWVzdCgpO1xuICAgIHJlcXVlc3QudHlwZSA9IFByb3RvLlN5bmNNZXNzYWdlLlJlcXVlc3QuVHlwZS5HUk9VUFM7XG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSB0aGlzLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2UucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyOiBteVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGlzU3luY01lc3NhZ2U6IHRydWUsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICdncm91cFN5bmNSZXF1ZXN0JyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldFJlcXVlc3RDb250YWN0U3luY01lc3NhZ2UoKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuUmVxdWVzdCgpO1xuICAgIHJlcXVlc3QudHlwZSA9IFByb3RvLlN5bmNNZXNzYWdlLlJlcXVlc3QuVHlwZS5DT05UQUNUUztcbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IHRoaXMuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIGlkZW50aWZpZXI6IG15VXVpZC50b1N0cmluZygpLFxuICAgICAgaXNTeW5jTWVzc2FnZTogdHJ1ZSxcbiAgICAgIHByb3RvQmFzZTY0OiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgUHJvdG8uQ29udGVudC5lbmNvZGUoY29udGVudE1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICApLFxuICAgICAgdHlwZTogJ2NvbnRhY3RTeW5jUmVxdWVzdCcsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSZXF1ZXN0UG5pSWRlbnRpdHlTeW5jTWVzc2FnZSgpOiBTaW5nbGVQcm90b0pvYkRhdGEge1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3QgcmVxdWVzdCA9IG5ldyBQcm90by5TeW5jTWVzc2FnZS5SZXF1ZXN0KCk7XG4gICAgcmVxdWVzdC50eXBlID0gUHJvdG8uU3luY01lc3NhZ2UuUmVxdWVzdC5UeXBlLlBOSV9JREVOVElUWTtcbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IHRoaXMuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS5yZXF1ZXN0ID0gcmVxdWVzdDtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIGlkZW50aWZpZXI6IG15VXVpZC50b1N0cmluZygpLFxuICAgICAgaXNTeW5jTWVzc2FnZTogdHJ1ZSxcbiAgICAgIHByb3RvQmFzZTY0OiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgUHJvdG8uQ29udGVudC5lbmNvZGUoY29udGVudE1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICApLFxuICAgICAgdHlwZTogJ3BuaUlkZW50aXR5U3luY1JlcXVlc3QnLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RmV0Y2hNYW5pZmVzdFN5bmNNZXNzYWdlKCk6IFNpbmdsZVByb3RvSm9iRGF0YSB7XG4gICAgY29uc3QgbXlVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgICBjb25zdCBmZXRjaExhdGVzdCA9IG5ldyBQcm90by5TeW5jTWVzc2FnZS5GZXRjaExhdGVzdCgpO1xuICAgIGZldGNoTGF0ZXN0LnR5cGUgPSBQcm90by5TeW5jTWVzc2FnZS5GZXRjaExhdGVzdC5UeXBlLlNUT1JBR0VfTUFOSUZFU1Q7XG5cbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IHRoaXMuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS5mZXRjaExhdGVzdCA9IGZldGNoTGF0ZXN0O1xuICAgIGNvbnN0IGNvbnRlbnRNZXNzYWdlID0gbmV3IFByb3RvLkNvbnRlbnQoKTtcbiAgICBjb250ZW50TWVzc2FnZS5zeW5jTWVzc2FnZSA9IHN5bmNNZXNzYWdlO1xuXG4gICAgY29uc3QgeyBDb250ZW50SGludCB9ID0gUHJvdG8uVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZS5NZXNzYWdlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgaWRlbnRpZmllcjogbXlVdWlkLnRvU3RyaW5nKCksXG4gICAgICBpc1N5bmNNZXNzYWdlOiB0cnVlLFxuICAgICAgcHJvdG9CYXNlNjQ6IEJ5dGVzLnRvQmFzZTY0KFxuICAgICAgICBQcm90by5Db250ZW50LmVuY29kZShjb250ZW50TWVzc2FnZSkuZmluaXNoKClcbiAgICAgICksXG4gICAgICB0eXBlOiAnZmV0Y2hMYXRlc3RNYW5pZmVzdFN5bmMnLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0RmV0Y2hMb2NhbFByb2ZpbGVTeW5jTWVzc2FnZSgpOiBTaW5nbGVQcm90b0pvYkRhdGEge1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3QgZmV0Y2hMYXRlc3QgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuRmV0Y2hMYXRlc3QoKTtcbiAgICBmZXRjaExhdGVzdC50eXBlID0gUHJvdG8uU3luY01lc3NhZ2UuRmV0Y2hMYXRlc3QuVHlwZS5MT0NBTF9QUk9GSUxFO1xuXG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSB0aGlzLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2UuZmV0Y2hMYXRlc3QgPSBmZXRjaExhdGVzdDtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIGlkZW50aWZpZXI6IG15VXVpZC50b1N0cmluZygpLFxuICAgICAgaXNTeW5jTWVzc2FnZTogdHJ1ZSxcbiAgICAgIHByb3RvQmFzZTY0OiBCeXRlcy50b0Jhc2U2NChcbiAgICAgICAgUHJvdG8uQ29udGVudC5lbmNvZGUoY29udGVudE1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICApLFxuICAgICAgdHlwZTogJ2ZldGNoTG9jYWxQcm9maWxlU3luYycsXG4gICAgfTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRSZXF1ZXN0S2V5U3luY01lc3NhZ2UoKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IHJlcXVlc3QgPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuUmVxdWVzdCgpO1xuICAgIHJlcXVlc3QudHlwZSA9IFByb3RvLlN5bmNNZXNzYWdlLlJlcXVlc3QuVHlwZS5LRVlTO1xuXG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSB0aGlzLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2UucmVxdWVzdCA9IHJlcXVlc3Q7XG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyOiBteVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGlzU3luY01lc3NhZ2U6IHRydWUsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICdrZXlTeW5jUmVxdWVzdCcsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHN5bmNSZWFkTWVzc2FnZXMoXG4gICAgcmVhZHM6IFJlYWRvbmx5QXJyYXk8e1xuICAgICAgc2VuZGVyVXVpZD86IHN0cmluZztcbiAgICAgIHNlbmRlckUxNjQ/OiBzdHJpbmc7XG4gICAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB9PixcbiAgICBvcHRpb25zPzogUmVhZG9ubHk8U2VuZE9wdGlvbnNUeXBlPlxuICApOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4ge1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSBNZXNzYWdlU2VuZGVyLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2UucmVhZCA9IFtdO1xuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcmVhZHMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgIGNvbnN0IHByb3RvID0gbmV3IFByb3RvLlN5bmNNZXNzYWdlLlJlYWQoe1xuICAgICAgICAuLi5yZWFkc1tpXSxcbiAgICAgICAgdGltZXN0YW1wOiBMb25nLmZyb21OdW1iZXIocmVhZHNbaV0udGltZXN0YW1wKSxcbiAgICAgIH0pO1xuXG4gICAgICBzeW5jTWVzc2FnZS5yZWFkLnB1c2gocHJvdG8pO1xuICAgIH1cbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB0aGlzLnNlbmRJbmRpdmlkdWFsUHJvdG8oe1xuICAgICAgaWRlbnRpZmllcjogbXlVdWlkLnRvU3RyaW5nKCksXG4gICAgICBwcm90bzogY29udGVudE1lc3NhZ2UsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIG9wdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzeW5jVmlldyhcbiAgICB2aWV3czogUmVhZG9ubHlBcnJheTx7XG4gICAgICBzZW5kZXJVdWlkPzogc3RyaW5nO1xuICAgICAgc2VuZGVyRTE2ND86IHN0cmluZztcbiAgICAgIHRpbWVzdGFtcDogbnVtYmVyO1xuICAgIH0+LFxuICAgIG9wdGlvbnM/OiBTZW5kT3B0aW9uc1R5cGVcbiAgKTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IHN5bmNNZXNzYWdlID0gTWVzc2FnZVNlbmRlci5jcmVhdGVTeW5jTWVzc2FnZSgpO1xuICAgIHN5bmNNZXNzYWdlLnZpZXdlZCA9IHZpZXdzLm1hcChcbiAgICAgIHZpZXcgPT5cbiAgICAgICAgbmV3IFByb3RvLlN5bmNNZXNzYWdlLlZpZXdlZCh7XG4gICAgICAgICAgLi4udmlldyxcbiAgICAgICAgICB0aW1lc3RhbXA6IExvbmcuZnJvbU51bWJlcih2aWV3LnRpbWVzdGFtcCksXG4gICAgICAgIH0pXG4gICAgKTtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB0aGlzLnNlbmRJbmRpdmlkdWFsUHJvdG8oe1xuICAgICAgaWRlbnRpZmllcjogbXlVdWlkLnRvU3RyaW5nKCksXG4gICAgICBwcm90bzogY29udGVudE1lc3NhZ2UsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIG9wdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzeW5jVmlld09uY2VPcGVuKFxuICAgIHZpZXdPbmNlT3BlbnM6IFJlYWRvbmx5QXJyYXk8e1xuICAgICAgc2VuZGVyVXVpZD86IHN0cmluZztcbiAgICAgIHNlbmRlckUxNjQ/OiBzdHJpbmc7XG4gICAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgICB9PixcbiAgICBvcHRpb25zPzogUmVhZG9ubHk8U2VuZE9wdGlvbnNUeXBlPlxuICApOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4ge1xuICAgIGlmICh2aWV3T25jZU9wZW5zLmxlbmd0aCAhPT0gMSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgc3luY1ZpZXdPbmNlT3BlbjogJHt2aWV3T25jZU9wZW5zLmxlbmd0aH0gb3BlbnMgcHJvdmlkZWQuIENhbiBvbmx5IGhhbmRsZSBvbmUuYFxuICAgICAgKTtcbiAgICB9XG4gICAgY29uc3QgeyBzZW5kZXJFMTY0LCBzZW5kZXJVdWlkLCB0aW1lc3RhbXAgfSA9IHZpZXdPbmNlT3BlbnNbMF07XG5cbiAgICBpZiAoIXNlbmRlclV1aWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3luY1ZpZXdPbmNlT3BlbjogTWlzc2luZyBzZW5kZXJVdWlkJyk7XG4gICAgfVxuXG4gICAgY29uc3QgbXlVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IE1lc3NhZ2VTZW5kZXIuY3JlYXRlU3luY01lc3NhZ2UoKTtcblxuICAgIGNvbnN0IHZpZXdPbmNlT3BlbiA9IG5ldyBQcm90by5TeW5jTWVzc2FnZS5WaWV3T25jZU9wZW4oKTtcbiAgICBpZiAoc2VuZGVyRTE2NCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB2aWV3T25jZU9wZW4uc2VuZGVyID0gc2VuZGVyRTE2NDtcbiAgICB9XG4gICAgdmlld09uY2VPcGVuLnNlbmRlclV1aWQgPSBzZW5kZXJVdWlkO1xuICAgIHZpZXdPbmNlT3Blbi50aW1lc3RhbXAgPSBMb25nLmZyb21OdW1iZXIodGltZXN0YW1wKTtcbiAgICBzeW5jTWVzc2FnZS52aWV3T25jZU9wZW4gPSB2aWV3T25jZU9wZW47XG5cbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2Uuc3luY01lc3NhZ2UgPSBzeW5jTWVzc2FnZTtcblxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICAgIHJldHVybiB0aGlzLnNlbmRJbmRpdmlkdWFsUHJvdG8oe1xuICAgICAgaWRlbnRpZmllcjogbXlVdWlkLnRvU3RyaW5nKCksXG4gICAgICBwcm90bzogY29udGVudE1lc3NhZ2UsXG4gICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgIG9wdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgZ2V0TWVzc2FnZVJlcXVlc3RSZXNwb25zZVN5bmMoXG4gICAgb3B0aW9uczogUmVhZG9ubHk8e1xuICAgICAgdGhyZWFkRTE2ND86IHN0cmluZztcbiAgICAgIHRocmVhZFV1aWQ/OiBzdHJpbmc7XG4gICAgICBncm91cElkPzogVWludDhBcnJheTtcbiAgICAgIHR5cGU6IG51bWJlcjtcbiAgICB9PlxuICApOiBTaW5nbGVQcm90b0pvYkRhdGEge1xuICAgIGNvbnN0IG15VXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuXG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSBNZXNzYWdlU2VuZGVyLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG5cbiAgICBjb25zdCByZXNwb25zZSA9IG5ldyBQcm90by5TeW5jTWVzc2FnZS5NZXNzYWdlUmVxdWVzdFJlc3BvbnNlKCk7XG4gICAgaWYgKG9wdGlvbnMudGhyZWFkRTE2NCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXNwb25zZS50aHJlYWRFMTY0ID0gb3B0aW9ucy50aHJlYWRFMTY0O1xuICAgIH1cbiAgICBpZiAob3B0aW9ucy50aHJlYWRVdWlkICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIHJlc3BvbnNlLnRocmVhZFV1aWQgPSBvcHRpb25zLnRocmVhZFV1aWQ7XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmdyb3VwSWQpIHtcbiAgICAgIHJlc3BvbnNlLmdyb3VwSWQgPSBvcHRpb25zLmdyb3VwSWQ7XG4gICAgfVxuICAgIHJlc3BvbnNlLnR5cGUgPSBvcHRpb25zLnR5cGU7XG4gICAgc3luY01lc3NhZ2UubWVzc2FnZVJlcXVlc3RSZXNwb25zZSA9IHJlc3BvbnNlO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyOiBteVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGlzU3luY01lc3NhZ2U6IHRydWUsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICdtZXNzYWdlUmVxdWVzdFN5bmMnLFxuICAgIH07XG4gIH1cblxuICBzdGF0aWMgZ2V0U3RpY2tlclBhY2tTeW5jKFxuICAgIG9wZXJhdGlvbnM6IFJlYWRvbmx5QXJyYXk8e1xuICAgICAgcGFja0lkOiBzdHJpbmc7XG4gICAgICBwYWNrS2V5OiBzdHJpbmc7XG4gICAgICBpbnN0YWxsZWQ6IGJvb2xlYW47XG4gICAgfT5cbiAgKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgICBjb25zdCBFTlVNID0gUHJvdG8uU3luY01lc3NhZ2UuU3RpY2tlclBhY2tPcGVyYXRpb24uVHlwZTtcblxuICAgIGNvbnN0IHBhY2tPcGVyYXRpb25zID0gb3BlcmF0aW9ucy5tYXAoaXRlbSA9PiB7XG4gICAgICBjb25zdCB7IHBhY2tJZCwgcGFja0tleSwgaW5zdGFsbGVkIH0gPSBpdGVtO1xuXG4gICAgICBjb25zdCBvcGVyYXRpb24gPSBuZXcgUHJvdG8uU3luY01lc3NhZ2UuU3RpY2tlclBhY2tPcGVyYXRpb24oKTtcbiAgICAgIG9wZXJhdGlvbi5wYWNrSWQgPSBCeXRlcy5mcm9tSGV4KHBhY2tJZCk7XG4gICAgICBvcGVyYXRpb24ucGFja0tleSA9IEJ5dGVzLmZyb21CYXNlNjQocGFja0tleSk7XG4gICAgICBvcGVyYXRpb24udHlwZSA9IGluc3RhbGxlZCA/IEVOVU0uSU5TVEFMTCA6IEVOVU0uUkVNT1ZFO1xuXG4gICAgICByZXR1cm4gb3BlcmF0aW9uO1xuICAgIH0pO1xuXG4gICAgY29uc3Qgc3luY01lc3NhZ2UgPSBNZXNzYWdlU2VuZGVyLmNyZWF0ZVN5bmNNZXNzYWdlKCk7XG4gICAgc3luY01lc3NhZ2Uuc3RpY2tlclBhY2tPcGVyYXRpb24gPSBwYWNrT3BlcmF0aW9ucztcblxuICAgIGNvbnN0IGNvbnRlbnRNZXNzYWdlID0gbmV3IFByb3RvLkNvbnRlbnQoKTtcbiAgICBjb250ZW50TWVzc2FnZS5zeW5jTWVzc2FnZSA9IHN5bmNNZXNzYWdlO1xuXG4gICAgY29uc3QgeyBDb250ZW50SGludCB9ID0gUHJvdG8uVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZS5NZXNzYWdlO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgaWRlbnRpZmllcjogbXlVdWlkLnRvU3RyaW5nKCksXG4gICAgICBpc1N5bmNNZXNzYWdlOiB0cnVlLFxuICAgICAgcHJvdG9CYXNlNjQ6IEJ5dGVzLnRvQmFzZTY0KFxuICAgICAgICBQcm90by5Db250ZW50LmVuY29kZShjb250ZW50TWVzc2FnZSkuZmluaXNoKClcbiAgICAgICksXG4gICAgICB0eXBlOiAnc3RpY2tlclBhY2tTeW5jJyxcbiAgICB9O1xuICB9XG5cbiAgc3RhdGljIGdldFZlcmlmaWNhdGlvblN5bmMoXG4gICAgZGVzdGluYXRpb25FMTY0OiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgZGVzdGluYXRpb25VdWlkOiBzdHJpbmcgfCB1bmRlZmluZWQsXG4gICAgc3RhdGU6IG51bWJlcixcbiAgICBpZGVudGl0eUtleTogUmVhZG9ubHk8VWludDhBcnJheT5cbiAgKTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGlmICghZGVzdGluYXRpb25FMTY0ICYmICFkZXN0aW5hdGlvblV1aWQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc3luY1ZlcmlmaWNhdGlvbjogTmVpdGhlciBlMTY0IG5vciBVVUlEIHdlcmUgcHJvdmlkZWQnKTtcbiAgICB9XG5cbiAgICBjb25zdCBwYWRkaW5nID0gTWVzc2FnZVNlbmRlci5nZXRSYW5kb21QYWRkaW5nKCk7XG5cbiAgICBjb25zdCB2ZXJpZmllZCA9IG5ldyBQcm90by5WZXJpZmllZCgpO1xuICAgIHZlcmlmaWVkLnN0YXRlID0gc3RhdGU7XG4gICAgaWYgKGRlc3RpbmF0aW9uRTE2NCkge1xuICAgICAgdmVyaWZpZWQuZGVzdGluYXRpb24gPSBkZXN0aW5hdGlvbkUxNjQ7XG4gICAgfVxuICAgIGlmIChkZXN0aW5hdGlvblV1aWQpIHtcbiAgICAgIHZlcmlmaWVkLmRlc3RpbmF0aW9uVXVpZCA9IGRlc3RpbmF0aW9uVXVpZDtcbiAgICB9XG4gICAgdmVyaWZpZWQuaWRlbnRpdHlLZXkgPSBpZGVudGl0eUtleTtcbiAgICB2ZXJpZmllZC5udWxsTWVzc2FnZSA9IHBhZGRpbmc7XG5cbiAgICBjb25zdCBzeW5jTWVzc2FnZSA9IE1lc3NhZ2VTZW5kZXIuY3JlYXRlU3luY01lc3NhZ2UoKTtcbiAgICBzeW5jTWVzc2FnZS52ZXJpZmllZCA9IHZlcmlmaWVkO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnN5bmNNZXNzYWdlID0gc3luY01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyOiBteVV1aWQudG9TdHJpbmcoKSxcbiAgICAgIGlzU3luY01lc3NhZ2U6IHRydWUsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICd2ZXJpZmljYXRpb25TeW5jJyxcbiAgICB9O1xuICB9XG5cbiAgLy8gU2VuZGluZyBtZXNzYWdlcyB0byBjb250YWN0c1xuXG4gIGFzeW5jIHNlbmRDYWxsaW5nTWVzc2FnZShcbiAgICByZWNpcGllbnRJZDogc3RyaW5nLFxuICAgIGNhbGxpbmdNZXNzYWdlOiBSZWFkb25seTxQcm90by5JQ2FsbGluZ01lc3NhZ2U+LFxuICAgIG9wdGlvbnM/OiBSZWFkb25seTxTZW5kT3B0aW9uc1R5cGU+XG4gICk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgY29uc3QgcmVjaXBpZW50cyA9IFtyZWNpcGllbnRJZF07XG4gICAgY29uc3QgZmluYWxUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLmNhbGxpbmdNZXNzYWdlID0gY2FsbGluZ01lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kTWVzc2FnZVByb3RvQW5kV2FpdCh7XG4gICAgICB0aW1lc3RhbXA6IGZpbmFsVGltZXN0YW1wLFxuICAgICAgcmVjaXBpZW50cyxcbiAgICAgIHByb3RvOiBjb250ZW50TWVzc2FnZSxcbiAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5ERUZBVUxULFxuICAgICAgZ3JvdXBJZDogdW5kZWZpbmVkLFxuICAgICAgb3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNlbmREZWxpdmVyeVJlY2VpcHQoXG4gICAgb3B0aW9uczogUmVhZG9ubHk8e1xuICAgICAgc2VuZGVyRTE2ND86IHN0cmluZztcbiAgICAgIHNlbmRlclV1aWQ/OiBzdHJpbmc7XG4gICAgICB0aW1lc3RhbXBzOiBBcnJheTxudW1iZXI+O1xuICAgICAgb3B0aW9ucz86IFJlYWRvbmx5PFNlbmRPcHRpb25zVHlwZT47XG4gICAgfT5cbiAgKTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVjZWlwdE1lc3NhZ2Uoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHR5cGU6IFByb3RvLlJlY2VpcHRNZXNzYWdlLlR5cGUuREVMSVZFUlksXG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBzZW5kUmVhZFJlY2VpcHQoXG4gICAgb3B0aW9uczogUmVhZG9ubHk8e1xuICAgICAgc2VuZGVyRTE2ND86IHN0cmluZztcbiAgICAgIHNlbmRlclV1aWQ/OiBzdHJpbmc7XG4gICAgICB0aW1lc3RhbXBzOiBBcnJheTxudW1iZXI+O1xuICAgICAgb3B0aW9ucz86IFJlYWRvbmx5PFNlbmRPcHRpb25zVHlwZT47XG4gICAgfT5cbiAgKTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgICByZXR1cm4gdGhpcy5zZW5kUmVjZWlwdE1lc3NhZ2Uoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHR5cGU6IFByb3RvLlJlY2VpcHRNZXNzYWdlLlR5cGUuUkVBRCxcbiAgICB9KTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRWaWV3ZWRSZWNlaXB0KFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PHtcbiAgICAgIHNlbmRlckUxNjQ/OiBzdHJpbmc7XG4gICAgICBzZW5kZXJVdWlkPzogc3RyaW5nO1xuICAgICAgdGltZXN0YW1wczogQXJyYXk8bnVtYmVyPjtcbiAgICAgIG9wdGlvbnM/OiBSZWFkb25seTxTZW5kT3B0aW9uc1R5cGU+O1xuICAgIH0+XG4gICk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VuZFJlY2VpcHRNZXNzYWdlKHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICB0eXBlOiBQcm90by5SZWNlaXB0TWVzc2FnZS5UeXBlLlZJRVdFRCxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2VuZFJlY2VpcHRNZXNzYWdlKHtcbiAgICBzZW5kZXJFMTY0LFxuICAgIHNlbmRlclV1aWQsXG4gICAgdGltZXN0YW1wcyxcbiAgICB0eXBlLFxuICAgIG9wdGlvbnMsXG4gIH06IFJlYWRvbmx5PHtcbiAgICBzZW5kZXJFMTY0Pzogc3RyaW5nO1xuICAgIHNlbmRlclV1aWQ/OiBzdHJpbmc7XG4gICAgdGltZXN0YW1wczogQXJyYXk8bnVtYmVyPjtcbiAgICB0eXBlOiBQcm90by5SZWNlaXB0TWVzc2FnZS5UeXBlO1xuICAgIG9wdGlvbnM/OiBSZWFkb25seTxTZW5kT3B0aW9uc1R5cGU+O1xuICB9Pik6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgaWYgKCFzZW5kZXJVdWlkICYmICFzZW5kZXJFMTY0KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICdzZW5kUmVjZWlwdE1lc3NhZ2U6IE5laXRoZXIgdXVpZCBub3IgZTE2NCB3YXMgcHJvdmlkZWQhJ1xuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCByZWNlaXB0TWVzc2FnZSA9IG5ldyBQcm90by5SZWNlaXB0TWVzc2FnZSgpO1xuICAgIHJlY2VpcHRNZXNzYWdlLnR5cGUgPSB0eXBlO1xuICAgIHJlY2VpcHRNZXNzYWdlLnRpbWVzdGFtcCA9IHRpbWVzdGFtcHMubWFwKHRpbWVzdGFtcCA9PlxuICAgICAgTG9uZy5mcm9tTnVtYmVyKHRpbWVzdGFtcClcbiAgICApO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLnJlY2VpcHRNZXNzYWdlID0gcmVjZWlwdE1lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kSW5kaXZpZHVhbFByb3RvKHtcbiAgICAgIGlkZW50aWZpZXI6IHNlbmRlclV1aWQgfHwgc2VuZGVyRTE2NCxcbiAgICAgIHByb3RvOiBjb250ZW50TWVzc2FnZSxcbiAgICAgIHRpbWVzdGFtcDogRGF0ZS5ub3coKSxcbiAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgb3B0aW9ucyxcbiAgICB9KTtcbiAgfVxuXG4gIHN0YXRpYyBnZXROdWxsTWVzc2FnZSh7XG4gICAgdXVpZCxcbiAgICBlMTY0LFxuICAgIHBhZGRpbmcsXG4gIH06IFJlYWRvbmx5PHtcbiAgICB1dWlkPzogc3RyaW5nO1xuICAgIGUxNjQ/OiBzdHJpbmc7XG4gICAgcGFkZGluZz86IFVpbnQ4QXJyYXk7XG4gIH0+KTogU2luZ2xlUHJvdG9Kb2JEYXRhIHtcbiAgICBjb25zdCBudWxsTWVzc2FnZSA9IG5ldyBQcm90by5OdWxsTWVzc2FnZSgpO1xuXG4gICAgY29uc3QgaWRlbnRpZmllciA9IHV1aWQgfHwgZTE2NDtcbiAgICBpZiAoIWlkZW50aWZpZXIpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignc2VuZE51bGxNZXNzYWdlOiBHb3QgbmVpdGhlciB1dWlkIG5vciBlMTY0IScpO1xuICAgIH1cblxuICAgIG51bGxNZXNzYWdlLnBhZGRpbmcgPSBwYWRkaW5nIHx8IE1lc3NhZ2VTZW5kZXIuZ2V0UmFuZG9tUGFkZGluZygpO1xuXG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBuZXcgUHJvdG8uQ29udGVudCgpO1xuICAgIGNvbnRlbnRNZXNzYWdlLm51bGxNZXNzYWdlID0gbnVsbE1lc3NhZ2U7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICBpZGVudGlmaWVyLFxuICAgICAgaXNTeW5jTWVzc2FnZTogZmFsc2UsXG4gICAgICBwcm90b0Jhc2U2NDogQnl0ZXMudG9CYXNlNjQoXG4gICAgICAgIFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKVxuICAgICAgKSxcbiAgICAgIHR5cGU6ICdudWxsTWVzc2FnZScsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRSZXRyeVJlcXVlc3Qoe1xuICAgIGdyb3VwSWQsXG4gICAgb3B0aW9ucyxcbiAgICBwbGFpbnRleHQsXG4gICAgdXVpZCxcbiAgfTogUmVhZG9ubHk8e1xuICAgIGdyb3VwSWQ/OiBzdHJpbmc7XG4gICAgb3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgICBwbGFpbnRleHQ6IFBsYWludGV4dENvbnRlbnQ7XG4gICAgdXVpZDogc3RyaW5nO1xuICB9Pik6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgY29uc3QgeyBDb250ZW50SGludCB9ID0gUHJvdG8uVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZS5NZXNzYWdlO1xuXG4gICAgcmV0dXJuIHRoaXMuc2VuZE1lc3NhZ2VQcm90b0FuZFdhaXQoe1xuICAgICAgdGltZXN0YW1wOiBEYXRlLm5vdygpLFxuICAgICAgcmVjaXBpZW50czogW3V1aWRdLFxuICAgICAgcHJvdG86IHBsYWludGV4dCxcbiAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5ERUZBVUxULFxuICAgICAgZ3JvdXBJZCxcbiAgICAgIG9wdGlvbnMsXG4gICAgfSk7XG4gIH1cblxuICAvLyBHcm91cCBzZW5kc1xuXG4gIC8vIFVzZWQgdG8gZW5zdXJlIHRoYXQgd2hlbiB3ZSBzZW5kIHRvIGEgZ3JvdXAgdGhlIG9sZCB3YXksIHdlIHNhdmUgdG8gdGhlIHNlbmQgbG9nIGFzXG4gIC8vICAgd2Ugc2VuZCB0byBlYWNoIHJlY2lwaWVudC4gVGhlbiB3ZSBkb24ndCBoYXZlIGEgbG9uZyBkZWxheSBiZXR3ZWVuIHRoZSBmaXJzdCBzZW5kXG4gIC8vICAgYW5kIHRoZSBmaW5hbCBzYXZlIHRvIHRoZSBkYXRhYmFzZSB3aXRoIGFsbCByZWNpcGllbnRzLlxuICBtYWtlU2VuZExvZ0NhbGxiYWNrKHtcbiAgICBjb250ZW50SGludCxcbiAgICBtZXNzYWdlSWQsXG4gICAgcHJvdG8sXG4gICAgc2VuZFR5cGUsXG4gICAgdGltZXN0YW1wLFxuICB9OiBSZWFkb25seTx7XG4gICAgY29udGVudEhpbnQ6IG51bWJlcjtcbiAgICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gICAgcHJvdG86IEJ1ZmZlcjtcbiAgICBzZW5kVHlwZTogU2VuZFR5cGVzVHlwZTtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgfT4pOiBTZW5kTG9nQ2FsbGJhY2tUeXBlIHtcbiAgICBsZXQgaW5pdGlhbFNhdmVQcm9taXNlOiBQcm9taXNlPG51bWJlcj47XG5cbiAgICByZXR1cm4gYXN5bmMgKHtcbiAgICAgIGlkZW50aWZpZXIsXG4gICAgICBkZXZpY2VJZHMsXG4gICAgfToge1xuICAgICAgaWRlbnRpZmllcjogc3RyaW5nO1xuICAgICAgZGV2aWNlSWRzOiBBcnJheTxudW1iZXI+O1xuICAgIH0pID0+IHtcbiAgICAgIGlmICghc2hvdWxkU2F2ZVByb3RvKHNlbmRUeXBlKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChpZGVudGlmaWVyKTtcbiAgICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBtYWtlU2VuZExvZ0NhbGxiYWNrOiBVbmFibGUgdG8gZmluZCBjb252ZXJzYXRpb24gZm9yIGlkZW50aWZpZXIgJHtpZGVudGlmaWVyfWBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgY29uc3QgcmVjaXBpZW50VXVpZCA9IGNvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKTtcbiAgICAgIGlmICghcmVjaXBpZW50VXVpZCkge1xuICAgICAgICBsb2cud2FybihcbiAgICAgICAgICBgbWFrZVNlbmRMb2dDYWxsYmFjazogQ29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBoYWQgbm8gVVVJRGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWluaXRpYWxTYXZlUHJvbWlzZSkge1xuICAgICAgICBpbml0aWFsU2F2ZVByb21pc2UgPSB3aW5kb3cuU2lnbmFsLkRhdGEuaW5zZXJ0U2VudFByb3RvKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICAgIHByb3RvLFxuICAgICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICByZWNpcGllbnRzOiB7IFtyZWNpcGllbnRVdWlkXTogZGV2aWNlSWRzIH0sXG4gICAgICAgICAgICBtZXNzYWdlSWRzOiBtZXNzYWdlSWQgPyBbbWVzc2FnZUlkXSA6IFtdLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgICAgYXdhaXQgaW5pdGlhbFNhdmVQcm9taXNlO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgY29uc3QgaWQgPSBhd2FpdCBpbml0aWFsU2F2ZVByb21pc2U7XG4gICAgICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5pbnNlcnRQcm90b1JlY2lwaWVudHMoe1xuICAgICAgICAgIGlkLFxuICAgICAgICAgIHJlY2lwaWVudFV1aWQsXG4gICAgICAgICAgZGV2aWNlSWRzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9O1xuICB9XG5cbiAgLy8gTm8gZnVuY3Rpb25zIHNob3VsZCByZWFsbHkgY2FsbCB0aGlzOyBzaW5jZSBtb3N0IGdyb3VwIHNlbmRzIGFyZSBub3cgdmlhIFNlbmRlciBLZXlcbiAgYXN5bmMgc2VuZEdyb3VwUHJvdG8oe1xuICAgIGNvbnRlbnRIaW50LFxuICAgIGdyb3VwSWQsXG4gICAgb3B0aW9ucyxcbiAgICBwcm90byxcbiAgICByZWNpcGllbnRzLFxuICAgIHNlbmRMb2dDYWxsYmFjayxcbiAgICB0aW1lc3RhbXAgPSBEYXRlLm5vdygpLFxuICB9OiBSZWFkb25seTx7XG4gICAgY29udGVudEhpbnQ6IG51bWJlcjtcbiAgICBncm91cElkOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgb3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgICBwcm90bzogUHJvdG8uQ29udGVudDtcbiAgICByZWNpcGllbnRzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gICAgc2VuZExvZ0NhbGxiYWNrPzogU2VuZExvZ0NhbGxiYWNrVHlwZTtcbiAgICB0aW1lc3RhbXA6IG51bWJlcjtcbiAgfT4pOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4ge1xuICAgIGNvbnN0IG15RTE2NCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKTtcbiAgICBjb25zdCBteVV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICAgIGNvbnN0IGlkZW50aWZpZXJzID0gcmVjaXBpZW50cy5maWx0ZXIoaWQgPT4gaWQgIT09IG15RTE2NCAmJiBpZCAhPT0gbXlVdWlkKTtcblxuICAgIGlmIChpZGVudGlmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICAgIGNvbnN0IGRhdGFNZXNzYWdlID0gcHJvdG8uZGF0YU1lc3NhZ2VcbiAgICAgICAgPyBQcm90by5EYXRhTWVzc2FnZS5lbmNvZGUocHJvdG8uZGF0YU1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKHtcbiAgICAgICAgZGF0YU1lc3NhZ2UsXG4gICAgICAgIGVycm9yczogW10sXG4gICAgICAgIGZhaWxvdmVySWRlbnRpZmllcnM6IFtdLFxuICAgICAgICBzdWNjZXNzZnVsSWRlbnRpZmllcnM6IFtdLFxuICAgICAgICB1bmlkZW50aWZpZWREZWxpdmVyaWVzOiBbXSxcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICBjb25zdCBjYWxsYmFjayA9IChyZXM6IENhbGxiYWNrUmVzdWx0VHlwZSkgPT4ge1xuICAgICAgICBpZiAocmVzLmVycm9ycyAmJiByZXMuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICByZWplY3QobmV3IFNlbmRNZXNzYWdlUHJvdG9FcnJvcihyZXMpKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXNvbHZlKHJlcyk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICAgIHRoaXMuc2VuZE1lc3NhZ2VQcm90byh7XG4gICAgICAgIGNhbGxiYWNrLFxuICAgICAgICBjb250ZW50SGludCxcbiAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgcHJvdG8sXG4gICAgICAgIHJlY2lwaWVudHM6IGlkZW50aWZpZXJzLFxuICAgICAgICBzZW5kTG9nQ2FsbGJhY2ssXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0U2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZShcbiAgICBkaXN0cmlidXRpb25JZDogc3RyaW5nLFxuICAgIHtcbiAgICAgIHRocm93SWZOb3RJbkRhdGFiYXNlLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH06IHsgdGhyb3dJZk5vdEluRGF0YWJhc2U/OiBib29sZWFuOyB0aW1lc3RhbXA6IG51bWJlciB9XG4gICk6IFByb21pc2U8UHJvdG8uQ29udGVudD4ge1xuICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgICBjb25zdCBvdXJEZXZpY2VJZCA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpLFxuICAgICAgJ2dldFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UnXG4gICAgKTtcblxuICAgIGNvbnN0IHByb3RvY29sQWRkcmVzcyA9IFByb3RvY29sQWRkcmVzcy5uZXcoXG4gICAgICBvdXJVdWlkLnRvU3RyaW5nKCksXG4gICAgICBvdXJEZXZpY2VJZFxuICAgICk7XG4gICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgb3VyVXVpZCxcbiAgICAgIG5ldyBBZGRyZXNzKG91clV1aWQsIG91ckRldmljZUlkKVxuICAgICk7XG5cbiAgICBjb25zdCBzZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlID1cbiAgICAgIGF3YWl0IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuZW5xdWV1ZVNlbmRlcktleUpvYihcbiAgICAgICAgYWRkcmVzcyxcbiAgICAgICAgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHNlbmRlcktleVN0b3JlID0gbmV3IFNlbmRlcktleXMoeyBvdXJVdWlkLCB6b25lOiBHTE9CQUxfWk9ORSB9KTtcblxuICAgICAgICAgIGlmICh0aHJvd0lmTm90SW5EYXRhYmFzZSkge1xuICAgICAgICAgICAgY29uc3Qga2V5ID0gYXdhaXQgc2VuZGVyS2V5U3RvcmUuZ2V0U2VuZGVyS2V5KFxuICAgICAgICAgICAgICBwcm90b2NvbEFkZHJlc3MsXG4gICAgICAgICAgICAgIGRpc3RyaWJ1dGlvbklkXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgaWYgKCFrZXkpIHtcbiAgICAgICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAgIGBnZXRTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlOiBEaXN0cmlidXRpb24gJHtkaXN0cmlidXRpb25JZH0gd2FzIG5vdCBpbiBkYXRhYmFzZSBhcyBleHBlY3RlZGBcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZS5jcmVhdGUoXG4gICAgICAgICAgICBwcm90b2NvbEFkZHJlc3MsXG4gICAgICAgICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgICAgICAgIHNlbmRlcktleVN0b3JlXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgKTtcblxuICAgIGxvZy5pbmZvKFxuICAgICAgYGdldFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2U6IEJ1aWxkaW5nICR7ZGlzdHJpYnV0aW9uSWR9IHdpdGggdGltZXN0YW1wICR7dGltZXN0YW1wfWBcbiAgICApO1xuICAgIGNvbnN0IGNvbnRlbnRNZXNzYWdlID0gbmV3IFByb3RvLkNvbnRlbnQoKTtcbiAgICBjb250ZW50TWVzc2FnZS5zZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlID1cbiAgICAgIHNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2Uuc2VyaWFsaXplKCk7XG5cbiAgICByZXR1cm4gY29udGVudE1lc3NhZ2U7XG4gIH1cblxuICAvLyBUaGUgb25lIGdyb3VwIHNlbmQgZXhjZXB0aW9uIC0gYSBtZXNzYWdlIHRoYXQgc2hvdWxkIG5ldmVyIGJlIHNlbnQgdmlhIHNlbmRlciBrZXlcbiAgYXN5bmMgc2VuZFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UoXG4gICAge1xuICAgICAgY29udGVudEhpbnQsXG4gICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgIGdyb3VwSWQsXG4gICAgICBpZGVudGlmaWVycyxcbiAgICAgIHRocm93SWZOb3RJbkRhdGFiYXNlLFxuICAgIH06IFJlYWRvbmx5PHtcbiAgICAgIGNvbnRlbnRIaW50OiBudW1iZXI7XG4gICAgICBkaXN0cmlidXRpb25JZDogc3RyaW5nO1xuICAgICAgZ3JvdXBJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgaWRlbnRpZmllcnM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgICAgIHRocm93SWZOb3RJbkRhdGFiYXNlPzogYm9vbGVhbjtcbiAgICB9PixcbiAgICBvcHRpb25zPzogUmVhZG9ubHk8U2VuZE9wdGlvbnNUeXBlPlxuICApOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4ge1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBhd2FpdCB0aGlzLmdldFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UoXG4gICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgIHtcbiAgICAgICAgdGhyb3dJZk5vdEluRGF0YWJhc2UsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgY29uc3Qgc2VuZExvZ0NhbGxiYWNrID1cbiAgICAgIGlkZW50aWZpZXJzLmxlbmd0aCA+IDFcbiAgICAgICAgPyB0aGlzLm1ha2VTZW5kTG9nQ2FsbGJhY2soe1xuICAgICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgICBwcm90bzogQnVmZmVyLmZyb20oUHJvdG8uQ29udGVudC5lbmNvZGUoY29udGVudE1lc3NhZ2UpLmZpbmlzaCgpKSxcbiAgICAgICAgICAgIHNlbmRUeXBlOiAnc2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZScsXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgfSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kR3JvdXBQcm90byh7XG4gICAgICBjb250ZW50SGludCxcbiAgICAgIGdyb3VwSWQsXG4gICAgICBvcHRpb25zLFxuICAgICAgcHJvdG86IGNvbnRlbnRNZXNzYWdlLFxuICAgICAgcmVjaXBpZW50czogaWRlbnRpZmllcnMsXG4gICAgICBzZW5kTG9nQ2FsbGJhY2ssXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSk7XG4gIH1cblxuICAvLyBHcm91cFYxLW9ubHkgZnVuY3Rpb25zOyBub3QgdG8gYmUgdXNlZCBpbiB0aGUgZnV0dXJlXG5cbiAgYXN5bmMgbGVhdmVHcm91cChcbiAgICBncm91cElkOiBzdHJpbmcsXG4gICAgZ3JvdXBJZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPixcbiAgICBvcHRpb25zPzogU2VuZE9wdGlvbnNUeXBlXG4gICk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBwcm90byA9IG5ldyBQcm90by5Db250ZW50KHtcbiAgICAgIGRhdGFNZXNzYWdlOiB7XG4gICAgICAgIGdyb3VwOiB7XG4gICAgICAgICAgaWQ6IEJ5dGVzLmZyb21TdHJpbmcoZ3JvdXBJZCksXG4gICAgICAgICAgdHlwZTogUHJvdG8uR3JvdXBDb250ZXh0LlR5cGUuUVVJVCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICBjb25zdCBjb250ZW50SGludCA9IENvbnRlbnRIaW50LlJFU0VOREFCTEU7XG4gICAgY29uc3Qgc2VuZExvZ0NhbGxiYWNrID1cbiAgICAgIGdyb3VwSWRlbnRpZmllcnMubGVuZ3RoID4gMVxuICAgICAgICA/IHRoaXMubWFrZVNlbmRMb2dDYWxsYmFjayh7XG4gICAgICAgICAgICBjb250ZW50SGludCxcbiAgICAgICAgICAgIHByb3RvOiBCdWZmZXIuZnJvbShQcm90by5Db250ZW50LmVuY29kZShwcm90bykuZmluaXNoKCkpLFxuICAgICAgICAgICAgc2VuZFR5cGU6ICdsZWdhY3lHcm91cENoYW5nZScsXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgfSlcbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICByZXR1cm4gdGhpcy5zZW5kR3JvdXBQcm90byh7XG4gICAgICBjb250ZW50SGludCxcbiAgICAgIGdyb3VwSWQ6IHVuZGVmaW5lZCwgLy8gb25seSBmb3IgR1YyIGlkc1xuICAgICAgb3B0aW9ucyxcbiAgICAgIHByb3RvLFxuICAgICAgcmVjaXBpZW50czogZ3JvdXBJZGVudGlmaWVycyxcbiAgICAgIHNlbmRMb2dDYWxsYmFjayxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIFNpbXBsZSBwYXNzLXRocm91Z2hzXG5cbiAgYXN5bmMgZ2V0UHJvZmlsZShcbiAgICB1dWlkOiBVVUlELFxuICAgIG9wdGlvbnM6IEdldFByb2ZpbGVPcHRpb25zVHlwZSB8IEdldFByb2ZpbGVVbmF1dGhPcHRpb25zVHlwZVxuICApOiBSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ2dldFByb2ZpbGUnXT4ge1xuICAgIGlmIChvcHRpb25zLmFjY2Vzc0tleSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0UHJvZmlsZVVuYXV0aCh1dWlkLnRvU3RyaW5nKCksIG9wdGlvbnMpO1xuICAgIH1cblxuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRQcm9maWxlKHV1aWQudG9TdHJpbmcoKSwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBjaGVja0FjY291bnRFeGlzdGVuY2UodXVpZDogVVVJRCk6IFByb21pc2U8Ym9vbGVhbj4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5jaGVja0FjY291bnRFeGlzdGVuY2UodXVpZCk7XG4gIH1cblxuICBhc3luYyBnZXRQcm9maWxlRm9yVXNlcm5hbWUoXG4gICAgdXNlcm5hbWU6IHN0cmluZ1xuICApOiBSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ2dldFByb2ZpbGVGb3JVc2VybmFtZSddPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLmdldFByb2ZpbGVGb3JVc2VybmFtZSh1c2VybmFtZSk7XG4gIH1cblxuICBhc3luYyBnZXRVdWlkc0ZvckUxNjRzKFxuICAgIG51bWJlcnM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuICApOiBQcm9taXNlPERpY3Rpb25hcnk8VVVJRFN0cmluZ1R5cGUgfCBudWxsPj4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRVdWlkc0ZvckUxNjRzKG51bWJlcnMpO1xuICB9XG5cbiAgYXN5bmMgZ2V0VXVpZHNGb3JFMTY0c1YyKFxuICAgIGUxNjRzOiBSZWFkb25seUFycmF5PHN0cmluZz4sXG4gICAgYWNpczogUmVhZG9ubHlBcnJheTxVVUlEU3RyaW5nVHlwZT4sXG4gICAgYWNjZXNzS2V5czogUmVhZG9ubHlBcnJheTxzdHJpbmc+XG4gICk6IFByb21pc2U8Q0RTUmVzcG9uc2VUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLmdldFV1aWRzRm9yRTE2NHNWMih7XG4gICAgICBlMTY0cyxcbiAgICAgIGFjaXMsXG4gICAgICBhY2Nlc3NLZXlzLFxuICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgZ2V0QXZhdGFyKHBhdGg6IHN0cmluZyk6IFByb21pc2U8UmV0dXJuVHlwZTxXZWJBUElUeXBlWydnZXRBdmF0YXInXT4+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0QXZhdGFyKHBhdGgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0U3RpY2tlcihcbiAgICBwYWNrSWQ6IHN0cmluZyxcbiAgICBzdGlja2VySWQ6IG51bWJlclxuICApOiBQcm9taXNlPFJldHVyblR5cGU8V2ViQVBJVHlwZVsnZ2V0U3RpY2tlciddPj4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRTdGlja2VyKHBhY2tJZCwgc3RpY2tlcklkKTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0aWNrZXJQYWNrTWFuaWZlc3QoXG4gICAgcGFja0lkOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ2dldFN0aWNrZXJQYWNrTWFuaWZlc3QnXT4+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0U3RpY2tlclBhY2tNYW5pZmVzdChwYWNrSWQpO1xuICB9XG5cbiAgYXN5bmMgY3JlYXRlR3JvdXAoXG4gICAgZ3JvdXA6IFJlYWRvbmx5PFByb3RvLklHcm91cD4sXG4gICAgb3B0aW9uczogUmVhZG9ubHk8R3JvdXBDcmVkZW50aWFsc1R5cGU+XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5jcmVhdGVHcm91cChncm91cCwgb3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyB1cGxvYWRHcm91cEF2YXRhcihcbiAgICBhdmF0YXI6IFJlYWRvbmx5PFVpbnQ4QXJyYXk+LFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PEdyb3VwQ3JlZGVudGlhbHNUeXBlPlxuICApOiBQcm9taXNlPHN0cmluZz4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci51cGxvYWRHcm91cEF2YXRhcihhdmF0YXIsIG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgZ2V0R3JvdXAoXG4gICAgb3B0aW9uczogUmVhZG9ubHk8R3JvdXBDcmVkZW50aWFsc1R5cGU+XG4gICk6IFByb21pc2U8UHJvdG8uR3JvdXA+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0R3JvdXAob3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBnZXRHcm91cEZyb21MaW5rKFxuICAgIGdyb3VwSW52aXRlTGluazogc3RyaW5nIHwgdW5kZWZpbmVkLFxuICAgIGF1dGg6IFJlYWRvbmx5PEdyb3VwQ3JlZGVudGlhbHNUeXBlPlxuICApOiBQcm9taXNlPFByb3RvLkdyb3VwSm9pbkluZm8+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0R3JvdXBGcm9tTGluayhncm91cEludml0ZUxpbmssIGF1dGgpO1xuICB9XG5cbiAgYXN5bmMgZ2V0R3JvdXBMb2coXG4gICAgb3B0aW9uczogR2V0R3JvdXBMb2dPcHRpb25zVHlwZSxcbiAgICBjcmVkZW50aWFsczogR3JvdXBDcmVkZW50aWFsc1R5cGVcbiAgKTogUHJvbWlzZTxHcm91cExvZ1Jlc3BvbnNlVHlwZT4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRHcm91cExvZyhvcHRpb25zLCBjcmVkZW50aWFscyk7XG4gIH1cblxuICBhc3luYyBnZXRHcm91cEF2YXRhcihrZXk6IHN0cmluZyk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRHcm91cEF2YXRhcihrZXkpO1xuICB9XG5cbiAgYXN5bmMgbW9kaWZ5R3JvdXAoXG4gICAgY2hhbmdlczogUmVhZG9ubHk8UHJvdG8uR3JvdXBDaGFuZ2UuSUFjdGlvbnM+LFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PEdyb3VwQ3JlZGVudGlhbHNUeXBlPixcbiAgICBpbnZpdGVMaW5rQmFzZTY0Pzogc3RyaW5nXG4gICk6IFByb21pc2U8UHJvdG8uSUdyb3VwQ2hhbmdlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLm1vZGlmeUdyb3VwKGNoYW5nZXMsIG9wdGlvbnMsIGludml0ZUxpbmtCYXNlNjQpO1xuICB9XG5cbiAgYXN5bmMgc2VuZFdpdGhTZW5kZXJLZXkoXG4gICAgZGF0YTogUmVhZG9ubHk8VWludDhBcnJheT4sXG4gICAgYWNjZXNzS2V5czogUmVhZG9ubHk8VWludDhBcnJheT4sXG4gICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgb25saW5lPzogYm9vbGVhblxuICApOiBQcm9taXNlPE11bHRpUmVjaXBpZW50MjAwUmVzcG9uc2VUeXBlPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLnNlbmRXaXRoU2VuZGVyS2V5KGRhdGEsIGFjY2Vzc0tleXMsIHRpbWVzdGFtcCwgb25saW5lKTtcbiAgfVxuXG4gIGFzeW5jIGZldGNoTGlua1ByZXZpZXdNZXRhZGF0YShcbiAgICBocmVmOiBzdHJpbmcsXG4gICAgYWJvcnRTaWduYWw6IEFib3J0U2lnbmFsXG4gICk6IFByb21pc2U8bnVsbCB8IExpbmtQcmV2aWV3TWV0YWRhdGE+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZmV0Y2hMaW5rUHJldmlld01ldGFkYXRhKGhyZWYsIGFib3J0U2lnbmFsKTtcbiAgfVxuXG4gIGFzeW5jIGZldGNoTGlua1ByZXZpZXdJbWFnZShcbiAgICBocmVmOiBzdHJpbmcsXG4gICAgYWJvcnRTaWduYWw6IEFib3J0U2lnbmFsXG4gICk6IFByb21pc2U8bnVsbCB8IExpbmtQcmV2aWV3SW1hZ2U+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZmV0Y2hMaW5rUHJldmlld0ltYWdlKGhyZWYsIGFib3J0U2lnbmFsKTtcbiAgfVxuXG4gIGFzeW5jIG1ha2VQcm94aWVkUmVxdWVzdChcbiAgICB1cmw6IHN0cmluZyxcbiAgICBvcHRpb25zPzogUmVhZG9ubHk8UHJveGllZFJlcXVlc3RPcHRpb25zVHlwZT5cbiAgKTogUHJvbWlzZTxSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ21ha2VQcm94aWVkUmVxdWVzdCddPj4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5tYWtlUHJveGllZFJlcXVlc3QodXJsLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIGdldFN0b3JhZ2VDcmVkZW50aWFscygpOiBQcm9taXNlPFN0b3JhZ2VTZXJ2aWNlQ3JlZGVudGlhbHM+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZ2V0U3RvcmFnZUNyZWRlbnRpYWxzKCk7XG4gIH1cblxuICBhc3luYyBnZXRTdG9yYWdlTWFuaWZlc3QoXG4gICAgb3B0aW9uczogUmVhZG9ubHk8U3RvcmFnZVNlcnZpY2VDYWxsT3B0aW9uc1R5cGU+XG4gICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5nZXRTdG9yYWdlTWFuaWZlc3Qob3B0aW9ucyk7XG4gIH1cblxuICBhc3luYyBnZXRTdG9yYWdlUmVjb3JkcyhcbiAgICBkYXRhOiBSZWFkb25seTxVaW50OEFycmF5PixcbiAgICBvcHRpb25zOiBSZWFkb25seTxTdG9yYWdlU2VydmljZUNhbGxPcHRpb25zVHlwZT5cbiAgKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLmdldFN0b3JhZ2VSZWNvcmRzKGRhdGEsIG9wdGlvbnMpO1xuICB9XG5cbiAgYXN5bmMgbW9kaWZ5U3RvcmFnZVJlY29yZHMoXG4gICAgZGF0YTogUmVhZG9ubHk8VWludDhBcnJheT4sXG4gICAgb3B0aW9uczogUmVhZG9ubHk8U3RvcmFnZVNlcnZpY2VDYWxsT3B0aW9uc1R5cGU+XG4gICk6IFByb21pc2U8VWludDhBcnJheT4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci5tb2RpZnlTdG9yYWdlUmVjb3JkcyhkYXRhLCBvcHRpb25zKTtcbiAgfVxuXG4gIGFzeW5jIGdldEdyb3VwTWVtYmVyc2hpcFRva2VuKFxuICAgIG9wdGlvbnM6IFJlYWRvbmx5PEdyb3VwQ3JlZGVudGlhbHNUeXBlPlxuICApOiBQcm9taXNlPFByb3RvLkdyb3VwRXh0ZXJuYWxDcmVkZW50aWFsPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLmdldEdyb3VwRXh0ZXJuYWxDcmVkZW50aWFsKG9wdGlvbnMpO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIHNlbmRDaGFsbGVuZ2VSZXNwb25zZShcbiAgICBjaGFsbGVuZ2VSZXNwb25zZTogUmVhZG9ubHk8Q2hhbGxlbmdlVHlwZT5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLnNlbmRDaGFsbGVuZ2VSZXNwb25zZShjaGFsbGVuZ2VSZXNwb25zZSk7XG4gIH1cblxuICBhc3luYyBwdXRQcm9maWxlKFxuICAgIGpzb25EYXRhOiBSZWFkb25seTxQcm9maWxlUmVxdWVzdERhdGFUeXBlPlxuICApOiBQcm9taXNlPFVwbG9hZEF2YXRhckhlYWRlcnNUeXBlIHwgdW5kZWZpbmVkPiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLnB1dFByb2ZpbGUoanNvbkRhdGEpO1xuICB9XG5cbiAgYXN5bmMgdXBsb2FkQXZhdGFyKFxuICAgIHJlcXVlc3RIZWFkZXJzOiBSZWFkb25seTxVcGxvYWRBdmF0YXJIZWFkZXJzVHlwZT4sXG4gICAgYXZhdGFyRGF0YTogUmVhZG9ubHk8VWludDhBcnJheT5cbiAgKTogUHJvbWlzZTxzdHJpbmc+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIudXBsb2FkQXZhdGFyKHJlcXVlc3RIZWFkZXJzLCBhdmF0YXJEYXRhKTtcbiAgfVxuXG4gIGFzeW5jIHB1dFVzZXJuYW1lKFxuICAgIHVzZXJuYW1lOiBzdHJpbmdcbiAgKTogUHJvbWlzZTxSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ3B1dFVzZXJuYW1lJ10+PiB7XG4gICAgcmV0dXJuIHRoaXMuc2VydmVyLnB1dFVzZXJuYW1lKHVzZXJuYW1lKTtcbiAgfVxuICBhc3luYyBkZWxldGVVc2VybmFtZSgpOiBQcm9taXNlPFJldHVyblR5cGU8V2ViQVBJVHlwZVsnZGVsZXRlVXNlcm5hbWUnXT4+IHtcbiAgICByZXR1cm4gdGhpcy5zZXJ2ZXIuZGVsZXRlVXNlcm5hbWUoKTtcbiAgfVxuICBhc3luYyB3aG9hbWkoKTogUHJvbWlzZTxSZXR1cm5UeXBlPFdlYkFQSVR5cGVbJ3dob2FtaSddPj4ge1xuICAgIHJldHVybiB0aGlzLnNlcnZlci53aG9hbWkoKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsaUJBQWtCO0FBRWxCLGtCQUFpQjtBQUNqQixxQkFBbUI7QUFFbkIsOEJBR087QUFFUCxpQ0FBNEI7QUFDNUIsb0JBQXVCO0FBQ3ZCLDZCQUFnQztBQUNoQyxxQkFBd0I7QUFDeEIsOEJBQWlDO0FBQ2pDLDZCQUEyQjtBQUUzQixrQkFBaUM7QUFnQmpDLDZCQUFrQztBQVVsQyw2QkFBNEI7QUFFNUIsWUFBdUI7QUFD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
