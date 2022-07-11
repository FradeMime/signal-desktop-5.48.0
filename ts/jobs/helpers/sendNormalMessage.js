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
var sendNormalMessage_exports = {};
__export(sendNormalMessage_exports, {
  sendNormalMessage: () => sendNormalMessage
});
module.exports = __toCommonJS(sendNormalMessage_exports);
var import_lodash = require("lodash");
var Errors = __toESM(require("../../types/errors"));
var import_getMessageById = require("../../messages/getMessageById");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_getSendOptions = require("../../util/getSendOptions");
var import_protobuf = require("../../protobuf");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_MessageSendState = require("../../messages/MessageSendState");
var import_message = require("../../state/selectors/message");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
var import_isConversationAccepted = require("../../util/isConversationAccepted");
async function sendNormalMessage(conversation, {
  isFinalAttempt,
  messaging,
  shouldContinue,
  timeRemaining,
  log
}, data) {
  const { Message } = window.Signal.Types;
  const { messageId, revision } = data;
  const message = await (0, import_getMessageById.getMessageById)(messageId);
  if (!message) {
    log.info(`message ${messageId} was not found, maybe because it was deleted. Giving up on sending it`);
    return;
  }
  const messageConversation = message.getConversation();
  if (messageConversation !== conversation) {
    log.error(`Message conversation '${messageConversation?.idForLogging()}' does not match job conversation ${conversation.idForLogging()}`);
    return;
  }
  if (!(0, import_message.isOutgoing)(message.attributes)) {
    log.error(`message ${messageId} was not an outgoing message to begin with. This is probably a bogus job. Giving up on sending it`);
    return;
  }
  if (message.isErased() || message.get("deletedForEveryone")) {
    log.info(`message ${messageId} was erased. Giving up on sending it`);
    return;
  }
  let messageSendErrors = [];
  const saveErrors = isFinalAttempt ? void 0 : (errors) => {
    messageSendErrors = errors;
  };
  if (!shouldContinue) {
    log.info(`message ${messageId} ran out of time. Giving up on sending it`);
    await markMessageFailed(message, [
      new Error("Message send ran out of time")
    ]);
    return;
  }
  let profileKey;
  if (conversation.get("profileSharing")) {
    profileKey = await import_ourProfileKey.ourProfileKeyService.get();
  }
  let originalError;
  try {
    const {
      allRecipientIdentifiers,
      recipientIdentifiersWithoutMe,
      sentRecipientIdentifiers,
      untrustedUuids
    } = getMessageRecipients({
      log,
      message,
      conversation
    });
    if (untrustedUuids.length) {
      window.reduxActions.conversations.conversationStoppedByMissingVerification({
        conversationId: conversation.id,
        untrustedUuids
      });
      throw new Error(`Message ${messageId} sending blocked because ${untrustedUuids.length} conversation(s) were untrusted. Failing this attempt.`);
    }
    if (!allRecipientIdentifiers.length) {
      log.warn(`trying to send message ${messageId} but it looks like it was already sent to everyone. This is unexpected, but we're giving up`);
      return;
    }
    const {
      attachments,
      body,
      contact,
      deletedForEveryoneTimestamp,
      expireTimer,
      mentions,
      messageTimestamp,
      preview,
      quote,
      sticker,
      storyContext
    } = await getMessageSendData({ log, message });
    let messageSendPromise;
    if (recipientIdentifiersWithoutMe.length === 0) {
      if (!(0, import_whatTypeOfConversation.isMe)(conversation.attributes) && !(0, import_whatTypeOfConversation.isGroup)(conversation.attributes) && sentRecipientIdentifiers.length === 0) {
        log.info("No recipients; not sending to ourselves or to group, and no successful sends. Failing job.");
        markMessageFailed(message, [new Error("No valid recipients")]);
        return;
      }
      log.info("sending sync message only");
      const dataMessage = await messaging.getDataMessage({
        attachments,
        body,
        contact,
        deletedForEveryoneTimestamp,
        expireTimer,
        groupV2: conversation.getGroupV2Info({
          members: recipientIdentifiersWithoutMe
        }),
        preview,
        profileKey,
        quote,
        recipients: allRecipientIdentifiers,
        sticker,
        timestamp: messageTimestamp
      });
      messageSendPromise = message.sendSyncMessageOnly(dataMessage, saveErrors);
    } else {
      const conversationType = conversation.get("type");
      const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
      const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
      let innerPromise;
      if (conversationType === Message.GROUP) {
        if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes) && !(0, import_lodash.isNumber)(revision)) {
          log.error("No revision provided, but conversation is GroupV2");
        }
        const groupV2Info = conversation.getGroupV2Info({
          members: recipientIdentifiersWithoutMe
        });
        if (groupV2Info && (0, import_lodash.isNumber)(revision)) {
          groupV2Info.revision = revision;
        }
        log.info("sending group message");
        innerPromise = conversation.queueJob("conversationQueue/sendNormalMessage", (abortSignal) => window.Signal.Util.sendToGroup({
          abortSignal,
          contentHint: ContentHint.RESENDABLE,
          groupSendOptions: {
            attachments,
            contact,
            deletedForEveryoneTimestamp,
            expireTimer,
            groupV1: conversation.getGroupV1Info(recipientIdentifiersWithoutMe),
            groupV2: groupV2Info,
            messageText: body,
            preview,
            profileKey,
            quote,
            sticker,
            storyContext,
            timestamp: messageTimestamp,
            mentions
          },
          messageId,
          sendOptions,
          sendTarget: conversation.toSenderKeyTarget(),
          sendType: "message"
        }));
      } else {
        if (!(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is not accepted; refusing to send`);
          markMessageFailed(message, [
            new Error("Message request was not accepted")
          ]);
          return;
        }
        if ((0, import_isConversationUnregistered.isConversationUnregistered)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is unregistered; refusing to send`);
          markMessageFailed(message, [
            new Error("Contact no longer has a Signal account")
          ]);
          return;
        }
        if (conversation.isBlocked()) {
          log.info(`conversation ${conversation.idForLogging()} is blocked; refusing to send`);
          markMessageFailed(message, [new Error("Contact is blocked")]);
          return;
        }
        log.info("sending direct message");
        innerPromise = messaging.sendMessageToIdentifier({
          attachments,
          contact,
          contentHint: ContentHint.RESENDABLE,
          deletedForEveryoneTimestamp,
          expireTimer,
          groupId: void 0,
          identifier: recipientIdentifiersWithoutMe[0],
          messageText: body,
          options: sendOptions,
          preview,
          profileKey,
          quote,
          reaction: void 0,
          sticker,
          storyContext,
          timestamp: messageTimestamp
        });
      }
      messageSendPromise = message.send((0, import_handleMessageSend.handleMessageSend)(innerPromise, {
        messageIds: [messageId],
        sendType: "message"
      }), saveErrors);
      try {
        await innerPromise;
      } catch (error) {
        if (error instanceof Error) {
          originalError = error;
        } else {
          log.error(`promiseForError threw something other than an error: ${Errors.toLogFormat(error)}`);
        }
      }
    }
    await messageSendPromise;
    const didFullySend = !messageSendErrors.length || didSendToEveryone(message);
    if (!didFullySend) {
      throw new Error("message did not fully send");
    }
  } catch (thrownError) {
    const errors = [thrownError, ...messageSendErrors];
    await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      errors,
      isFinalAttempt,
      log,
      markFailed: () => markMessageFailed(message, messageSendErrors),
      timeRemaining,
      toThrow: originalError || thrownError
    });
  }
}
function getMessageRecipients({
  log,
  conversation,
  message
}) {
  const allRecipientIdentifiers = [];
  const recipientIdentifiersWithoutMe = [];
  const untrustedUuids = [];
  const sentRecipientIdentifiers = [];
  const currentConversationRecipients = conversation.getMemberConversationIds();
  Object.entries(message.get("sendStateByConversationId") || {}).forEach(([recipientConversationId, sendState]) => {
    const recipient = window.ConversationController.get(recipientConversationId);
    if (!recipient) {
      return;
    }
    const isRecipientMe = (0, import_whatTypeOfConversation.isMe)(recipient.attributes);
    if (!currentConversationRecipients.has(recipientConversationId) && !isRecipientMe) {
      return;
    }
    if (recipient.isUntrusted()) {
      const uuid = recipient.get("uuid");
      if (!uuid) {
        log.error(`sendNormalMessage/getMessageRecipients: Untrusted conversation ${recipient.idForLogging()} missing UUID.`);
        return;
      }
      untrustedUuids.push(uuid);
      return;
    }
    if (recipient.isUnregistered()) {
      return;
    }
    const recipientIdentifier = recipient.getSendTarget();
    if (!recipientIdentifier) {
      return;
    }
    if ((0, import_MessageSendState.isSent)(sendState.status)) {
      sentRecipientIdentifiers.push(recipientIdentifier);
      return;
    }
    allRecipientIdentifiers.push(recipientIdentifier);
    if (!isRecipientMe) {
      recipientIdentifiersWithoutMe.push(recipientIdentifier);
    }
  });
  return {
    allRecipientIdentifiers,
    recipientIdentifiersWithoutMe,
    sentRecipientIdentifiers,
    untrustedUuids
  };
}
async function getMessageSendData({
  log,
  message
}) {
  const {
    loadAttachmentData,
    loadContactData,
    loadPreviewData,
    loadQuoteData,
    loadStickerData
  } = window.Signal.Migrations;
  let messageTimestamp;
  const sentAt = message.get("sent_at");
  const timestamp = message.get("timestamp");
  if (sentAt) {
    messageTimestamp = sentAt;
  } else if (timestamp) {
    log.error("message lacked sent_at. Falling back to timestamp");
    messageTimestamp = timestamp;
  } else {
    log.error("message lacked sent_at and timestamp. Falling back to current time");
    messageTimestamp = Date.now();
  }
  const storyId = message.get("storyId");
  const [attachmentsWithData, contact, preview, quote, sticker, storyMessage] = await Promise.all([
    Promise.all((message.get("attachments") ?? []).map(loadAttachmentData)),
    message.cachedOutgoingContactData || loadContactData(message.get("contact")),
    message.cachedOutgoingPreviewData || loadPreviewData(message.get("preview")),
    message.cachedOutgoingQuoteData || loadQuoteData(message.get("quote")),
    message.cachedOutgoingStickerData || loadStickerData(message.get("sticker")),
    storyId ? (0, import_getMessageById.getMessageById)(storyId) : void 0
  ]);
  const { body, attachments } = window.Whisper.Message.getLongMessageAttachment({
    body: message.get("body"),
    attachments: attachmentsWithData,
    now: messageTimestamp
  });
  return {
    attachments,
    body,
    contact,
    deletedForEveryoneTimestamp: message.get("deletedForEveryoneTimestamp"),
    expireTimer: message.get("expireTimer"),
    mentions: message.get("bodyRanges"),
    messageTimestamp,
    preview,
    quote,
    sticker,
    storyContext: storyMessage ? {
      authorUuid: storyMessage.get("sourceUuid"),
      timestamp: storyMessage.get("sent_at")
    } : void 0
  };
}
async function markMessageFailed(message, errors) {
  message.markFailed();
  message.saveErrors(errors, { skipSave: true });
  await window.Signal.Data.saveMessage(message.attributes, {
    ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
  });
}
function didSendToEveryone(message) {
  const sendStateByConversationId = message.get("sendStateByConversationId") || {};
  return Object.values(sendStateByConversationId).every((sendState) => (0, import_MessageSendState.isSent)(sendState.status));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendNormalMessage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZE5vcm1hbE1lc3NhZ2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZU1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL21lc3NhZ2VzJztcbmltcG9ydCB7IGdldE1lc3NhZ2VCeUlkIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvZ2V0TWVzc2FnZUJ5SWQnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGlzR3JvdXAsIGlzR3JvdXBWMiwgaXNNZSB9IGZyb20gJy4uLy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi4vLi4vdXRpbC9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrUmVzdWx0VHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgeyBpc1NlbnQgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9NZXNzYWdlU2VuZFN0YXRlJztcbmltcG9ydCB7IGlzT3V0Z29pbmcgfSBmcm9tICcuLi8uLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7XG4gIEF0dGFjaG1lbnRUeXBlLFxuICBDb250YWN0V2l0aEh5ZHJhdGVkQXZhdGFyLFxufSBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHR5cGUgeyBCb2R5UmFuZ2VzVHlwZSwgU3RvcnlDb250ZXh0VHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBXaGF0SXNUaGlzIH0gZnJvbSAnLi4vLi4vd2luZG93LmQnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvblF1ZXVlSm9iQnVuZGxlLFxuICBOb3JtYWxNZXNzYWdlU2VuZEpvYkRhdGEsXG59IGZyb20gJy4uL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcblxuaW1wb3J0IHsgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzIH0gZnJvbSAnLi9oYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMnO1xuaW1wb3J0IHsgb3VyUHJvZmlsZUtleVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vdXJQcm9maWxlS2V5JztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbkFjY2VwdGVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvbkFjY2VwdGVkJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmROb3JtYWxNZXNzYWdlKFxuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsLFxuICB7XG4gICAgaXNGaW5hbEF0dGVtcHQsXG4gICAgbWVzc2FnaW5nLFxuICAgIHNob3VsZENvbnRpbnVlLFxuICAgIHRpbWVSZW1haW5pbmcsXG4gICAgbG9nLFxuICB9OiBDb252ZXJzYXRpb25RdWV1ZUpvYkJ1bmRsZSxcbiAgZGF0YTogTm9ybWFsTWVzc2FnZVNlbmRKb2JEYXRhXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBNZXNzYWdlIH0gPSB3aW5kb3cuU2lnbmFsLlR5cGVzO1xuXG4gIGNvbnN0IHsgbWVzc2FnZUlkLCByZXZpc2lvbiB9ID0gZGF0YTtcbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYG1lc3NhZ2UgJHttZXNzYWdlSWR9IHdhcyBub3QgZm91bmQsIG1heWJlIGJlY2F1c2UgaXQgd2FzIGRlbGV0ZWQuIEdpdmluZyB1cCBvbiBzZW5kaW5nIGl0YFxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbWVzc2FnZUNvbnZlcnNhdGlvbiA9IG1lc3NhZ2UuZ2V0Q29udmVyc2F0aW9uKCk7XG4gIGlmIChtZXNzYWdlQ29udmVyc2F0aW9uICE9PSBjb252ZXJzYXRpb24pIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgTWVzc2FnZSBjb252ZXJzYXRpb24gJyR7bWVzc2FnZUNvbnZlcnNhdGlvbj8uaWRGb3JMb2dnaW5nKCl9JyBkb2VzIG5vdCBtYXRjaCBqb2IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghaXNPdXRnb2luZyhtZXNzYWdlLmF0dHJpYnV0ZXMpKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYG1lc3NhZ2UgJHttZXNzYWdlSWR9IHdhcyBub3QgYW4gb3V0Z29pbmcgbWVzc2FnZSB0byBiZWdpbiB3aXRoLiBUaGlzIGlzIHByb2JhYmx5IGEgYm9ndXMgam9iLiBHaXZpbmcgdXAgb24gc2VuZGluZyBpdGBcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmIChtZXNzYWdlLmlzRXJhc2VkKCkgfHwgbWVzc2FnZS5nZXQoJ2RlbGV0ZWRGb3JFdmVyeW9uZScpKSB7XG4gICAgbG9nLmluZm8oYG1lc3NhZ2UgJHttZXNzYWdlSWR9IHdhcyBlcmFzZWQuIEdpdmluZyB1cCBvbiBzZW5kaW5nIGl0YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IG1lc3NhZ2VTZW5kRXJyb3JzOiBBcnJheTxFcnJvcj4gPSBbXTtcblxuICAvLyBXZSBkb24ndCB3YW50IHRvIHNhdmUgZXJyb3JzIG9uIG1lc3NhZ2VzIHVubGVzcyB3ZSdyZSBnaXZpbmcgdXAuIElmIGl0J3Mgb3VyXG4gIC8vICAgZmluYWwgYXR0ZW1wdCwgd2Uga25vdyB1cGZyb250IHRoYXQgd2Ugd2FudCB0byBnaXZlIHVwLiBIb3dldmVyLCB3ZSBtaWdodCBhbHNvXG4gIC8vICAgd2FudCB0byBnaXZlIHVwIGlmICgxKSB3ZSBnZXQgYSA1MDggZnJvbSB0aGUgc2VydmVyLCBhc2tpbmcgdXMgdG8gcGxlYXNlIHN0b3BcbiAgLy8gICAoMikgd2UgZ2V0IGEgNDI4IGZyb20gdGhlIHNlcnZlciwgZmxhZ2dpbmcgdGhlIG1lc3NhZ2UgZm9yIHNwYW0gKDMpIHNvbWUgb3RoZXJcbiAgLy8gICByZWFzb24gbm90IGtub3duIGF0IHRoZSB0aW1lIG9mIHRoaXMgd3JpdGluZy5cbiAgLy9cbiAgLy8gVGhpcyBhd2t3YXJkIGNhbGxiYWNrIGxldHMgdXMgaG9sZCBvbnRvIGVycm9ycyB3ZSBtaWdodCB3YW50IHRvIHNhdmUsIHNvIHdlIGNhblxuICAvLyAgIGRlY2lkZSB3aGV0aGVyIHRvIHNhdmUgdGhlbSBsYXRlciBvbi5cbiAgY29uc3Qgc2F2ZUVycm9ycyA9IGlzRmluYWxBdHRlbXB0XG4gICAgPyB1bmRlZmluZWRcbiAgICA6IChlcnJvcnM6IEFycmF5PEVycm9yPikgPT4ge1xuICAgICAgICBtZXNzYWdlU2VuZEVycm9ycyA9IGVycm9ycztcbiAgICAgIH07XG5cbiAgaWYgKCFzaG91bGRDb250aW51ZSkge1xuICAgIGxvZy5pbmZvKGBtZXNzYWdlICR7bWVzc2FnZUlkfSByYW4gb3V0IG9mIHRpbWUuIEdpdmluZyB1cCBvbiBzZW5kaW5nIGl0YCk7XG4gICAgYXdhaXQgbWFya01lc3NhZ2VGYWlsZWQobWVzc2FnZSwgW1xuICAgICAgbmV3IEVycm9yKCdNZXNzYWdlIHNlbmQgcmFuIG91dCBvZiB0aW1lJyksXG4gICAgXSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHByb2ZpbGVLZXk6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ7XG4gIGlmIChjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlU2hhcmluZycpKSB7XG4gICAgcHJvZmlsZUtleSA9IGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLmdldCgpO1xuICB9XG5cbiAgbGV0IG9yaWdpbmFsRXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgY29uc3Qge1xuICAgICAgYWxsUmVjaXBpZW50SWRlbnRpZmllcnMsXG4gICAgICByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZSxcbiAgICAgIHNlbnRSZWNpcGllbnRJZGVudGlmaWVycyxcbiAgICAgIHVudHJ1c3RlZFV1aWRzLFxuICAgIH0gPSBnZXRNZXNzYWdlUmVjaXBpZW50cyh7XG4gICAgICBsb2csXG4gICAgICBtZXNzYWdlLFxuICAgICAgY29udmVyc2F0aW9uLFxuICAgIH0pO1xuXG4gICAgaWYgKHVudHJ1c3RlZFV1aWRzLmxlbmd0aCkge1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLmNvbnZlcnNhdGlvblN0b3BwZWRCeU1pc3NpbmdWZXJpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICAgIHVudHJ1c3RlZFV1aWRzLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgTWVzc2FnZSAke21lc3NhZ2VJZH0gc2VuZGluZyBibG9ja2VkIGJlY2F1c2UgJHt1bnRydXN0ZWRVdWlkcy5sZW5ndGh9IGNvbnZlcnNhdGlvbihzKSB3ZXJlIHVudHJ1c3RlZC4gRmFpbGluZyB0aGlzIGF0dGVtcHQuYFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoIWFsbFJlY2lwaWVudElkZW50aWZpZXJzLmxlbmd0aCkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgIGB0cnlpbmcgdG8gc2VuZCBtZXNzYWdlICR7bWVzc2FnZUlkfSBidXQgaXQgbG9va3MgbGlrZSBpdCB3YXMgYWxyZWFkeSBzZW50IHRvIGV2ZXJ5b25lLiBUaGlzIGlzIHVuZXhwZWN0ZWQsIGJ1dCB3ZSdyZSBnaXZpbmcgdXBgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHtcbiAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgYm9keSxcbiAgICAgIGNvbnRhY3QsXG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmVUaW1lc3RhbXAsXG4gICAgICBleHBpcmVUaW1lcixcbiAgICAgIG1lbnRpb25zLFxuICAgICAgbWVzc2FnZVRpbWVzdGFtcCxcbiAgICAgIHByZXZpZXcsXG4gICAgICBxdW90ZSxcbiAgICAgIHN0aWNrZXIsXG4gICAgICBzdG9yeUNvbnRleHQsXG4gICAgfSA9IGF3YWl0IGdldE1lc3NhZ2VTZW5kRGF0YSh7IGxvZywgbWVzc2FnZSB9KTtcblxuICAgIGxldCBtZXNzYWdlU2VuZFByb21pc2U6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlIHwgdm9pZD47XG5cbiAgICBpZiAocmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWUubGVuZ3RoID09PSAwKSB7XG4gICAgICBpZiAoXG4gICAgICAgICFpc01lKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSAmJlxuICAgICAgICAhaXNHcm91cChjb252ZXJzYXRpb24uYXR0cmlidXRlcykgJiZcbiAgICAgICAgc2VudFJlY2lwaWVudElkZW50aWZpZXJzLmxlbmd0aCA9PT0gMFxuICAgICAgKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICdObyByZWNpcGllbnRzOyBub3Qgc2VuZGluZyB0byBvdXJzZWx2ZXMgb3IgdG8gZ3JvdXAsIGFuZCBubyBzdWNjZXNzZnVsIHNlbmRzLiBGYWlsaW5nIGpvYi4nXG4gICAgICAgICk7XG4gICAgICAgIG1hcmtNZXNzYWdlRmFpbGVkKG1lc3NhZ2UsIFtuZXcgRXJyb3IoJ05vIHZhbGlkIHJlY2lwaWVudHMnKV0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIC8vIFdlJ3JlIHNlbmRpbmcgdG8gTm90ZSB0byBTZWxmIG9yIGEgJ2xvbmVseSBncm91cCcgd2l0aCBqdXN0IHVzIGluIGl0XG4gICAgICBsb2cuaW5mbygnc2VuZGluZyBzeW5jIG1lc3NhZ2Ugb25seScpO1xuICAgICAgY29uc3QgZGF0YU1lc3NhZ2UgPSBhd2FpdCBtZXNzYWdpbmcuZ2V0RGF0YU1lc3NhZ2Uoe1xuICAgICAgICBhdHRhY2htZW50cyxcbiAgICAgICAgYm9keSxcbiAgICAgICAgY29udGFjdCxcbiAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wLFxuICAgICAgICBleHBpcmVUaW1lcixcbiAgICAgICAgZ3JvdXBWMjogY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKHtcbiAgICAgICAgICBtZW1iZXJzOiByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZSxcbiAgICAgICAgfSksXG4gICAgICAgIHByZXZpZXcsXG4gICAgICAgIHByb2ZpbGVLZXksXG4gICAgICAgIHF1b3RlLFxuICAgICAgICByZWNpcGllbnRzOiBhbGxSZWNpcGllbnRJZGVudGlmaWVycyxcbiAgICAgICAgc3RpY2tlcixcbiAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlVGltZXN0YW1wLFxuICAgICAgfSk7XG4gICAgICBtZXNzYWdlU2VuZFByb21pc2UgPSBtZXNzYWdlLnNlbmRTeW5jTWVzc2FnZU9ubHkoZGF0YU1lc3NhZ2UsIHNhdmVFcnJvcnMpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25UeXBlID0gY29udmVyc2F0aW9uLmdldCgndHlwZScpO1xuICAgICAgY29uc3Qgc2VuZE9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICAgIGxldCBpbm5lclByb21pc2U6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPjtcbiAgICAgIGlmIChjb252ZXJzYXRpb25UeXBlID09PSBNZXNzYWdlLkdST1VQKSB7XG4gICAgICAgIC8vIE5vdGU6IHRoaXMgd2lsbCBoYXBwZW4gZm9yIGFsbCBvbGQgam9icyBxdWV1ZWQgYmVvcmUgNS4zMi54XG4gICAgICAgIGlmIChpc0dyb3VwVjIoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpICYmICFpc051bWJlcihyZXZpc2lvbikpIHtcbiAgICAgICAgICBsb2cuZXJyb3IoJ05vIHJldmlzaW9uIHByb3ZpZGVkLCBidXQgY29udmVyc2F0aW9uIGlzIEdyb3VwVjInKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGdyb3VwVjJJbmZvID0gY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKHtcbiAgICAgICAgICBtZW1iZXJzOiByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZSxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChncm91cFYySW5mbyAmJiBpc051bWJlcihyZXZpc2lvbikpIHtcbiAgICAgICAgICBncm91cFYySW5mby5yZXZpc2lvbiA9IHJldmlzaW9uO1xuICAgICAgICB9XG5cbiAgICAgICAgbG9nLmluZm8oJ3NlbmRpbmcgZ3JvdXAgbWVzc2FnZScpO1xuICAgICAgICBpbm5lclByb21pc2UgPSBjb252ZXJzYXRpb24ucXVldWVKb2IoXG4gICAgICAgICAgJ2NvbnZlcnNhdGlvblF1ZXVlL3NlbmROb3JtYWxNZXNzYWdlJyxcbiAgICAgICAgICBhYm9ydFNpZ25hbCA9PlxuICAgICAgICAgICAgd2luZG93LlNpZ25hbC5VdGlsLnNlbmRUb0dyb3VwKHtcbiAgICAgICAgICAgICAgYWJvcnRTaWduYWwsXG4gICAgICAgICAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgICAgICAgICBncm91cFNlbmRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgYXR0YWNobWVudHMsXG4gICAgICAgICAgICAgICAgY29udGFjdCxcbiAgICAgICAgICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmVUaW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgICAgICAgICAgZ3JvdXBWMTogY29udmVyc2F0aW9uLmdldEdyb3VwVjFJbmZvKFxuICAgICAgICAgICAgICAgICAgcmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGdyb3VwVjI6IGdyb3VwVjJJbmZvLFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VUZXh0OiBib2R5LFxuICAgICAgICAgICAgICAgIHByZXZpZXcsXG4gICAgICAgICAgICAgICAgcHJvZmlsZUtleSxcbiAgICAgICAgICAgICAgICBxdW90ZSxcbiAgICAgICAgICAgICAgICBzdGlja2VyLFxuICAgICAgICAgICAgICAgIHN0b3J5Q29udGV4dCxcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgbWVudGlvbnMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgICAgc2VuZE9wdGlvbnMsXG4gICAgICAgICAgICAgIHNlbmRUYXJnZXQ6IGNvbnZlcnNhdGlvbi50b1NlbmRlcktleVRhcmdldCgpLFxuICAgICAgICAgICAgICBzZW5kVHlwZTogJ21lc3NhZ2UnLFxuICAgICAgICAgICAgfSlcbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGlmICghaXNDb252ZXJzYXRpb25BY2NlcHRlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIG5vdCBhY2NlcHRlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1hcmtNZXNzYWdlRmFpbGVkKG1lc3NhZ2UsIFtcbiAgICAgICAgICAgIG5ldyBFcnJvcignTWVzc2FnZSByZXF1ZXN0IHdhcyBub3QgYWNjZXB0ZWQnKSxcbiAgICAgICAgICBdKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgdW5yZWdpc3RlcmVkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgICAgICk7XG4gICAgICAgICAgbWFya01lc3NhZ2VGYWlsZWQobWVzc2FnZSwgW1xuICAgICAgICAgICAgbmV3IEVycm9yKCdDb250YWN0IG5vIGxvbmdlciBoYXMgYSBTaWduYWwgYWNjb3VudCcpLFxuICAgICAgICAgIF0pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoY29udmVyc2F0aW9uLmlzQmxvY2tlZCgpKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBibG9ja2VkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgICAgICk7XG4gICAgICAgICAgbWFya01lc3NhZ2VGYWlsZWQobWVzc2FnZSwgW25ldyBFcnJvcignQ29udGFjdCBpcyBibG9ja2VkJyldKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBsb2cuaW5mbygnc2VuZGluZyBkaXJlY3QgbWVzc2FnZScpO1xuICAgICAgICBpbm5lclByb21pc2UgPSBtZXNzYWdpbmcuc2VuZE1lc3NhZ2VUb0lkZW50aWZpZXIoe1xuICAgICAgICAgIGF0dGFjaG1lbnRzLFxuICAgICAgICAgIGNvbnRhY3QsXG4gICAgICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LlJFU0VOREFCTEUsXG4gICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wLFxuICAgICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICAgIGdyb3VwSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBpZGVudGlmaWVyOiByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZVswXSxcbiAgICAgICAgICBtZXNzYWdlVGV4dDogYm9keSxcbiAgICAgICAgICBvcHRpb25zOiBzZW5kT3B0aW9ucyxcbiAgICAgICAgICBwcmV2aWV3LFxuICAgICAgICAgIHByb2ZpbGVLZXksXG4gICAgICAgICAgcXVvdGUsXG4gICAgICAgICAgcmVhY3Rpb246IHVuZGVmaW5lZCxcbiAgICAgICAgICBzdGlja2VyLFxuICAgICAgICAgIHN0b3J5Q29udGV4dCxcbiAgICAgICAgICB0aW1lc3RhbXA6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgICAgIH0pO1xuICAgICAgfVxuXG4gICAgICBtZXNzYWdlU2VuZFByb21pc2UgPSBtZXNzYWdlLnNlbmQoXG4gICAgICAgIGhhbmRsZU1lc3NhZ2VTZW5kKGlubmVyUHJvbWlzZSwge1xuICAgICAgICAgIG1lc3NhZ2VJZHM6IFttZXNzYWdlSWRdLFxuICAgICAgICAgIHNlbmRUeXBlOiAnbWVzc2FnZScsXG4gICAgICAgIH0pLFxuICAgICAgICBzYXZlRXJyb3JzXG4gICAgICApO1xuXG4gICAgICAvLyBCZWNhdXNlIG1lc3NhZ2Uuc2VuZCBzd2FsbG93cyBhbmQgcHJvY2Vzc2VzIGVycm9ycywgd2UnbGwgYXdhaXQgdGhlIGlubmVyIHByb21pc2VcbiAgICAgIC8vICAgdG8gZ2V0IHRoZSBTZW5kTWVzc2FnZVByb3RvRXJyb3IsIHdoaWNoIGdpdmVzIHVzIGluZm9ybWF0aW9uIHVwc3RyZWFtXG4gICAgICAvLyAgIHByb2Nlc3NvcnMgbmVlZCB0byBkZXRlY3QgY2VydGFpbiBraW5kcyBvZiBzaXR1YXRpb25zLlxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgaW5uZXJQcm9taXNlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICAgICAgICBvcmlnaW5hbEVycm9yID0gZXJyb3I7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgYHByb21pc2VGb3JFcnJvciB0aHJldyBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBlcnJvcjogJHtFcnJvcnMudG9Mb2dGb3JtYXQoXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgYXdhaXQgbWVzc2FnZVNlbmRQcm9taXNlO1xuXG4gICAgY29uc3QgZGlkRnVsbHlTZW5kID1cbiAgICAgICFtZXNzYWdlU2VuZEVycm9ycy5sZW5ndGggfHwgZGlkU2VuZFRvRXZlcnlvbmUobWVzc2FnZSk7XG4gICAgaWYgKCFkaWRGdWxseVNlbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignbWVzc2FnZSBkaWQgbm90IGZ1bGx5IHNlbmQnKTtcbiAgICB9XG4gIH0gY2F0Y2ggKHRocm93bkVycm9yOiB1bmtub3duKSB7XG4gICAgY29uc3QgZXJyb3JzID0gW3Rocm93bkVycm9yLCAuLi5tZXNzYWdlU2VuZEVycm9yc107XG4gICAgYXdhaXQgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgIGVycm9ycyxcbiAgICAgIGlzRmluYWxBdHRlbXB0LFxuICAgICAgbG9nLFxuICAgICAgbWFya0ZhaWxlZDogKCkgPT4gbWFya01lc3NhZ2VGYWlsZWQobWVzc2FnZSwgbWVzc2FnZVNlbmRFcnJvcnMpLFxuICAgICAgdGltZVJlbWFpbmluZyxcbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGEgZmFpbGVkIGdyb3VwIHNlbmQgdGhyb3duRXJyb3Igd2lsbCBub3QgYmUgU2VudE1lc3NhZ2VQcm90b0Vycm9yLFxuICAgICAgLy8gICBidXQgd2Ugc2hvdWxkIGhhdmUgYmVlbiBhYmxlIHRvIGhhcnZlc3QgdGhlIG9yaWdpbmFsIGVycm9yLiBJbiB0aGUgTm90ZSB0byBTZWxmXG4gICAgICAvLyAgIHNlbmQgY2FzZSwgdGhyb3duRXJyb3Igd2lsbCBiZSB0aGUgZXJyb3Igd2UgY2FyZSBhYm91dCwgYW5kIHdlIHdvbid0IGhhdmUgYW5cbiAgICAgIC8vICAgb3JpZ2luYWxFcnJvci5cbiAgICAgIHRvVGhyb3c6IG9yaWdpbmFsRXJyb3IgfHwgdGhyb3duRXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVzc2FnZVJlY2lwaWVudHMoe1xuICBsb2csXG4gIGNvbnZlcnNhdGlvbixcbiAgbWVzc2FnZSxcbn06IFJlYWRvbmx5PHtcbiAgbG9nOiBMb2dnZXJUeXBlO1xuICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsO1xuICBtZXNzYWdlOiBNZXNzYWdlTW9kZWw7XG59Pik6IHtcbiAgYWxsUmVjaXBpZW50SWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz47XG4gIHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lOiBBcnJheTxzdHJpbmc+O1xuICBzZW50UmVjaXBpZW50SWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz47XG4gIHVudHJ1c3RlZFV1aWRzOiBBcnJheTxzdHJpbmc+O1xufSB7XG4gIGNvbnN0IGFsbFJlY2lwaWVudElkZW50aWZpZXJzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0IHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0IHVudHJ1c3RlZFV1aWRzOiBBcnJheTxzdHJpbmc+ID0gW107XG4gIGNvbnN0IHNlbnRSZWNpcGllbnRJZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGNvbnN0IGN1cnJlbnRDb252ZXJzYXRpb25SZWNpcGllbnRzID0gY29udmVyc2F0aW9uLmdldE1lbWJlckNvbnZlcnNhdGlvbklkcygpO1xuXG4gIE9iamVjdC5lbnRyaWVzKG1lc3NhZ2UuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge30pLmZvckVhY2goXG4gICAgKFtyZWNpcGllbnRDb252ZXJzYXRpb25JZCwgc2VuZFN0YXRlXSkgPT4ge1xuICAgICAgY29uc3QgcmVjaXBpZW50ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KFxuICAgICAgICByZWNpcGllbnRDb252ZXJzYXRpb25JZFxuICAgICAgKTtcbiAgICAgIGlmICghcmVjaXBpZW50KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgaXNSZWNpcGllbnRNZSA9IGlzTWUocmVjaXBpZW50LmF0dHJpYnV0ZXMpO1xuXG4gICAgICBpZiAoXG4gICAgICAgICFjdXJyZW50Q29udmVyc2F0aW9uUmVjaXBpZW50cy5oYXMocmVjaXBpZW50Q29udmVyc2F0aW9uSWQpICYmXG4gICAgICAgICFpc1JlY2lwaWVudE1lXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAocmVjaXBpZW50LmlzVW50cnVzdGVkKCkpIHtcbiAgICAgICAgY29uc3QgdXVpZCA9IHJlY2lwaWVudC5nZXQoJ3V1aWQnKTtcbiAgICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgYHNlbmROb3JtYWxNZXNzYWdlL2dldE1lc3NhZ2VSZWNpcGllbnRzOiBVbnRydXN0ZWQgY29udmVyc2F0aW9uICR7cmVjaXBpZW50LmlkRm9yTG9nZ2luZygpfSBtaXNzaW5nIFVVSUQuYFxuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHVudHJ1c3RlZFV1aWRzLnB1c2godXVpZCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIGlmIChyZWNpcGllbnQuaXNVbnJlZ2lzdGVyZWQoKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudElkZW50aWZpZXIgPSByZWNpcGllbnQuZ2V0U2VuZFRhcmdldCgpO1xuICAgICAgaWYgKCFyZWNpcGllbnRJZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKGlzU2VudChzZW5kU3RhdGUuc3RhdHVzKSkge1xuICAgICAgICBzZW50UmVjaXBpZW50SWRlbnRpZmllcnMucHVzaChyZWNpcGllbnRJZGVudGlmaWVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBhbGxSZWNpcGllbnRJZGVudGlmaWVycy5wdXNoKHJlY2lwaWVudElkZW50aWZpZXIpO1xuICAgICAgaWYgKCFpc1JlY2lwaWVudE1lKSB7XG4gICAgICAgIHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lLnB1c2gocmVjaXBpZW50SWRlbnRpZmllcik7XG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgYWxsUmVjaXBpZW50SWRlbnRpZmllcnMsXG4gICAgcmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWUsXG4gICAgc2VudFJlY2lwaWVudElkZW50aWZpZXJzLFxuICAgIHVudHJ1c3RlZFV1aWRzLFxuICB9O1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRNZXNzYWdlU2VuZERhdGEoe1xuICBsb2csXG4gIG1lc3NhZ2UsXG59OiBSZWFkb25seTx7XG4gIGxvZzogTG9nZ2VyVHlwZTtcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsO1xufT4pOiBQcm9taXNlPHtcbiAgYXR0YWNobWVudHM6IEFycmF5PEF0dGFjaG1lbnRUeXBlPjtcbiAgYm9keTogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICBjb250YWN0PzogQXJyYXk8Q29udGFjdFdpdGhIeWRyYXRlZEF2YXRhcj47XG4gIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcDogdW5kZWZpbmVkIHwgbnVtYmVyO1xuICBleHBpcmVUaW1lcjogdW5kZWZpbmVkIHwgbnVtYmVyO1xuICBtZW50aW9uczogdW5kZWZpbmVkIHwgQm9keVJhbmdlc1R5cGU7XG4gIG1lc3NhZ2VUaW1lc3RhbXA6IG51bWJlcjtcbiAgcHJldmlldzogQXJyYXk8TGlua1ByZXZpZXdUeXBlPjtcbiAgcXVvdGU6IFdoYXRJc1RoaXM7XG4gIHN0aWNrZXI6IFdoYXRJc1RoaXM7XG4gIHN0b3J5Q29udGV4dD86IFN0b3J5Q29udGV4dFR5cGU7XG59PiB7XG4gIGNvbnN0IHtcbiAgICBsb2FkQXR0YWNobWVudERhdGEsXG4gICAgbG9hZENvbnRhY3REYXRhLFxuICAgIGxvYWRQcmV2aWV3RGF0YSxcbiAgICBsb2FkUXVvdGVEYXRhLFxuICAgIGxvYWRTdGlja2VyRGF0YSxcbiAgfSA9IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucztcblxuICBsZXQgbWVzc2FnZVRpbWVzdGFtcDogbnVtYmVyO1xuICBjb25zdCBzZW50QXQgPSBtZXNzYWdlLmdldCgnc2VudF9hdCcpO1xuICBjb25zdCB0aW1lc3RhbXAgPSBtZXNzYWdlLmdldCgndGltZXN0YW1wJyk7XG4gIGlmIChzZW50QXQpIHtcbiAgICBtZXNzYWdlVGltZXN0YW1wID0gc2VudEF0O1xuICB9IGVsc2UgaWYgKHRpbWVzdGFtcCkge1xuICAgIGxvZy5lcnJvcignbWVzc2FnZSBsYWNrZWQgc2VudF9hdC4gRmFsbGluZyBiYWNrIHRvIHRpbWVzdGFtcCcpO1xuICAgIG1lc3NhZ2VUaW1lc3RhbXAgPSB0aW1lc3RhbXA7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ21lc3NhZ2UgbGFja2VkIHNlbnRfYXQgYW5kIHRpbWVzdGFtcC4gRmFsbGluZyBiYWNrIHRvIGN1cnJlbnQgdGltZSdcbiAgICApO1xuICAgIG1lc3NhZ2VUaW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICB9XG5cbiAgY29uc3Qgc3RvcnlJZCA9IG1lc3NhZ2UuZ2V0KCdzdG9yeUlkJyk7XG5cbiAgY29uc3QgW2F0dGFjaG1lbnRzV2l0aERhdGEsIGNvbnRhY3QsIHByZXZpZXcsIHF1b3RlLCBzdGlja2VyLCBzdG9yeU1lc3NhZ2VdID1cbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAvLyBXZSBkb24ndCB1cGRhdGUgdGhlIGNhY2hlcyBoZXJlIGJlY2F1c2UgKDEpIHdlIGV4cGVjdCB0aGUgY2FjaGVzIHRvIGJlIHBvcHVsYXRlZFxuICAgICAgLy8gICBvbiBpbml0aWFsIHNlbmQsIHNvIHRoZXkgc2hvdWxkIGJlIHRoZXJlIGluIHRoZSA5OSUgY2FzZSAoMikgaWYgeW91J3JlIHJldHJ5aW5nXG4gICAgICAvLyAgIGEgZmFpbGVkIG1lc3NhZ2UgYWNyb3NzIHJlc3RhcnRzLCB3ZSBkb24ndCB0b3VjaCB0aGUgY2FjaGUgZm9yIHNpbXBsaWNpdHkuIElmXG4gICAgICAvLyAgIHNlbmRzIGFyZSBmYWlsaW5nLCBsZXQncyBub3QgYWRkIHRoZSBjb21wbGljYXRpb24gb2YgYSBjYWNoZS5cbiAgICAgIFByb21pc2UuYWxsKChtZXNzYWdlLmdldCgnYXR0YWNobWVudHMnKSA/PyBbXSkubWFwKGxvYWRBdHRhY2htZW50RGF0YSkpLFxuICAgICAgbWVzc2FnZS5jYWNoZWRPdXRnb2luZ0NvbnRhY3REYXRhIHx8XG4gICAgICAgIGxvYWRDb250YWN0RGF0YShtZXNzYWdlLmdldCgnY29udGFjdCcpKSxcbiAgICAgIG1lc3NhZ2UuY2FjaGVkT3V0Z29pbmdQcmV2aWV3RGF0YSB8fFxuICAgICAgICBsb2FkUHJldmlld0RhdGEobWVzc2FnZS5nZXQoJ3ByZXZpZXcnKSksXG4gICAgICBtZXNzYWdlLmNhY2hlZE91dGdvaW5nUXVvdGVEYXRhIHx8IGxvYWRRdW90ZURhdGEobWVzc2FnZS5nZXQoJ3F1b3RlJykpLFxuICAgICAgbWVzc2FnZS5jYWNoZWRPdXRnb2luZ1N0aWNrZXJEYXRhIHx8XG4gICAgICAgIGxvYWRTdGlja2VyRGF0YShtZXNzYWdlLmdldCgnc3RpY2tlcicpKSxcbiAgICAgIHN0b3J5SWQgPyBnZXRNZXNzYWdlQnlJZChzdG9yeUlkKSA6IHVuZGVmaW5lZCxcbiAgICBdKTtcblxuICBjb25zdCB7IGJvZHksIGF0dGFjaG1lbnRzIH0gPSB3aW5kb3cuV2hpc3Blci5NZXNzYWdlLmdldExvbmdNZXNzYWdlQXR0YWNobWVudChcbiAgICB7XG4gICAgICBib2R5OiBtZXNzYWdlLmdldCgnYm9keScpLFxuICAgICAgYXR0YWNobWVudHM6IGF0dGFjaG1lbnRzV2l0aERhdGEsXG4gICAgICBub3c6IG1lc3NhZ2VUaW1lc3RhbXAsXG4gICAgfVxuICApO1xuXG4gIHJldHVybiB7XG4gICAgYXR0YWNobWVudHMsXG4gICAgYm9keSxcbiAgICBjb250YWN0LFxuICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcDogbWVzc2FnZS5nZXQoJ2RlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcCcpLFxuICAgIGV4cGlyZVRpbWVyOiBtZXNzYWdlLmdldCgnZXhwaXJlVGltZXInKSxcbiAgICBtZW50aW9uczogbWVzc2FnZS5nZXQoJ2JvZHlSYW5nZXMnKSxcbiAgICBtZXNzYWdlVGltZXN0YW1wLFxuICAgIHByZXZpZXcsXG4gICAgcXVvdGUsXG4gICAgc3RpY2tlcixcbiAgICBzdG9yeUNvbnRleHQ6IHN0b3J5TWVzc2FnZVxuICAgICAgPyB7XG4gICAgICAgICAgYXV0aG9yVXVpZDogc3RvcnlNZXNzYWdlLmdldCgnc291cmNlVXVpZCcpLFxuICAgICAgICAgIHRpbWVzdGFtcDogc3RvcnlNZXNzYWdlLmdldCgnc2VudF9hdCcpLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFya01lc3NhZ2VGYWlsZWQoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCxcbiAgZXJyb3JzOiBBcnJheTxFcnJvcj5cbik6IFByb21pc2U8dm9pZD4ge1xuICBtZXNzYWdlLm1hcmtGYWlsZWQoKTtcbiAgbWVzc2FnZS5zYXZlRXJyb3JzKGVycm9ycywgeyBza2lwU2F2ZTogdHJ1ZSB9KTtcbiAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywge1xuICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBkaWRTZW5kVG9FdmVyeW9uZShtZXNzYWdlOiBSZWFkb25seTxNZXNzYWdlTW9kZWw+KTogYm9vbGVhbiB7XG4gIGNvbnN0IHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPVxuICAgIG1lc3NhZ2UuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge307XG4gIHJldHVybiBPYmplY3QudmFsdWVzKHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQpLmV2ZXJ5KHNlbmRTdGF0ZSA9PlxuICAgIGlzU2VudChzZW5kU3RhdGUuc3RhdHVzKVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUV6QixhQUF3QjtBQUV4Qiw0QkFBK0I7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QU8sU0FBUyxnQkFDNUQsTUFBTSxRQUFRLElBQUk7QUFBQSxJQUtoQixRQUFRLElBQUssU0FBUSxJQUFJLGFBQWEsS0FBSyxDQUFDLEdBQUcsSUFBSSxrQkFBa0IsQ0FBQztBQUFBLElBQ3RFLFFBQVEsNkJBQ04sZ0JBQWdCLFFBQVEsSUFBSSxTQUFTLENBQUM7QUFBQSxJQUN4QyxRQUFRLDZCQUNOLGdCQUFnQixRQUFRLElBQUksU0FBUyxDQUFDO0FBQUEsSUFDeEMsUUFBUSwyQkFBMkIsY0FBYyxRQUFRLElBQUksT0FBTyxDQUFDO0FBQUEsSUFDckUsUUFBUSw2QkFDTixnQkFBZ0IsUUFBUSxJQUFJLFNBQVMsQ0FBQztBQUFBLElBQ3hDLFVBQVUsMENBQWUsT0FBTyxJQUFJO0FBQUEsRUFDdEMsQ0FBQztBQUVILFFBQU0sRUFBRSxNQUFNLGdCQUFnQixPQUFPLFFBQVEsUUFBUSx5QkFDbkQ7QUFBQSxJQUNFLE1BQU0sUUFBUSxJQUFJLE1BQU07QUFBQSxJQUN4QixhQUFhO0FBQUEsSUFDYixLQUFLO0FBQUEsRUFDUCxDQUNGO0FBRUEsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsNkJBQTZCLFFBQVEsSUFBSSw2QkFBNkI7QUFBQSxJQUN0RSxhQUFhLFFBQVEsSUFBSSxhQUFhO0FBQUEsSUFDdEMsVUFBVSxRQUFRLElBQUksWUFBWTtBQUFBLElBQ2xDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxjQUFjLGVBQ1Y7QUFBQSxNQUNFLFlBQVksYUFBYSxJQUFJLFlBQVk7QUFBQSxNQUN6QyxXQUFXLGFBQWEsSUFBSSxTQUFTO0FBQUEsSUFDdkMsSUFDQTtBQUFBLEVBQ047QUFDRjtBQXZGZSxBQXlGZixpQ0FDRSxTQUNBLFFBQ2U7QUFDZixVQUFRLFdBQVc7QUFDbkIsVUFBUSxXQUFXLFFBQVEsRUFBRSxVQUFVLEtBQUssQ0FBQztBQUM3QyxRQUFNLE9BQU8sT0FBTyxLQUFLLFlBQVksUUFBUSxZQUFZO0FBQUEsSUFDdkQsU0FBUyxPQUFPLFdBQVcsUUFBUSxLQUFLLGVBQWUsRUFBRSxTQUFTO0FBQUEsRUFDcEUsQ0FBQztBQUNIO0FBVGUsQUFXZiwyQkFBMkIsU0FBMEM7QUFDbkUsUUFBTSw0QkFDSixRQUFRLElBQUksMkJBQTJCLEtBQUssQ0FBQztBQUMvQyxTQUFPLE9BQU8sT0FBTyx5QkFBeUIsRUFBRSxNQUFNLGVBQ3BELG9DQUFPLFVBQVUsTUFBTSxDQUN6QjtBQUNGO0FBTlMiLAogICJuYW1lcyI6IFtdCn0K
