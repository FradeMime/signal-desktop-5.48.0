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
var sendDeleteForEveryone_exports = {};
__export(sendDeleteForEveryone_exports, {
  sendDeleteForEveryone: () => sendDeleteForEveryone
});
module.exports = __toCommonJS(sendDeleteForEveryone_exports);
var import_lodash = require("lodash");
var Errors = __toESM(require("../../types/errors"));
var import_getSendOptions = require("../../util/getSendOptions");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_protobuf = require("../../protobuf");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_wrapWithSyncMessageSend = require("../../util/wrapWithSyncMessageSend");
var import_getUntrustedConversationUuids = require("./getUntrustedConversationUuids");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_isConversationAccepted = require("../../util/isConversationAccepted");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
var import_getMessageById = require("../../messages/getMessageById");
var import_isNotNil = require("../../util/isNotNil");
var import_Errors = require("../../textsecure/Errors");
var import_assert = require("../../util/assert");
async function sendDeleteForEveryone(conversation, {
  isFinalAttempt,
  messaging,
  shouldContinue,
  timestamp,
  timeRemaining,
  log
}, data) {
  const {
    messageId,
    recipients: recipientsFromJob,
    revision,
    targetTimestamp
  } = data;
  const message = await (0, import_getMessageById.getMessageById)(messageId);
  if (!message) {
    log.error(`Failed to fetch message ${messageId}. Failing job.`);
    return;
  }
  if (!shouldContinue) {
    log.info("Ran out of time. Giving up on sending delete for everyone");
    updateMessageWithFailure(message, [new Error("Ran out of time!")], log);
    return;
  }
  const sendType = "deleteForEveryone";
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const contentHint = ContentHint.RESENDABLE;
  const messageIds = [messageId];
  const logId = `deleteForEveryone/${conversation.idForLogging()}`;
  const deletedForEveryoneSendStatus = message.get("deletedForEveryoneSendStatus");
  const recipients = deletedForEveryoneSendStatus ? getRecipients(deletedForEveryoneSendStatus) : recipientsFromJob;
  const untrustedUuids = (0, import_getUntrustedConversationUuids.getUntrustedConversationUuids)(recipients);
  if (untrustedUuids.length) {
    window.reduxActions.conversations.conversationStoppedByMissingVerification({
      conversationId: conversation.id,
      untrustedUuids
    });
    throw new Error(`Delete for everyone blocked because ${untrustedUuids.length} conversation(s) were untrusted. Failing this attempt.`);
  }
  await conversation.queueJob("conversationQueue/sendDeleteForEveryone", async (abortSignal) => {
    log.info(`Sending deleteForEveryone to conversation ${logId}`, `with timestamp ${timestamp}`, `for message ${targetTimestamp}`);
    let profileKey;
    if (conversation.get("profileSharing")) {
      profileKey = await import_ourProfileKey.ourProfileKeyService.get();
    }
    const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
    try {
      if ((0, import_whatTypeOfConversation.isMe)(conversation.attributes)) {
        const proto = await messaging.getContentMessage({
          deletedForEveryoneTimestamp: targetTimestamp,
          profileKey,
          recipients: conversation.getRecipients(),
          timestamp
        });
        (0, import_assert.strictAssert)(proto.dataMessage, "ContentMessage must have dataMessage");
        await (0, import_handleMessageSend.handleMessageSend)(messaging.sendSyncMessage({
          encodedDataMessage: import_protobuf.SignalService.DataMessage.encode(proto.dataMessage).finish(),
          destination: conversation.get("e164"),
          destinationUuid: conversation.get("uuid"),
          expirationStartTimestamp: null,
          options: sendOptions,
          timestamp
        }), { messageIds, sendType });
        await updateMessageWithSuccessfulSends(message);
      } else if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
        if (!(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is not accepted; refusing to send`);
          updateMessageWithFailure(message, [new Error("Message request was not accepted")], log);
          return;
        }
        if ((0, import_isConversationUnregistered.isConversationUnregistered)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is unregistered; refusing to send`);
          updateMessageWithFailure(message, [new Error("Contact no longer has a Signal account")], log);
          return;
        }
        if (conversation.isBlocked()) {
          log.info(`conversation ${conversation.idForLogging()} is blocked; refusing to send`);
          updateMessageWithFailure(message, [new Error("Contact is blocked")], log);
          return;
        }
        await (0, import_wrapWithSyncMessageSend.wrapWithSyncMessageSend)({
          conversation,
          logId,
          messageIds,
          send: async (sender) => sender.sendMessageToIdentifier({
            identifier: conversation.getSendTarget(),
            messageText: void 0,
            attachments: [],
            deletedForEveryoneTimestamp: targetTimestamp,
            timestamp,
            expireTimer: void 0,
            contentHint,
            groupId: void 0,
            profileKey,
            options: sendOptions
          }),
          sendType,
          timestamp
        });
        await updateMessageWithSuccessfulSends(message);
      } else {
        if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes) && !(0, import_lodash.isNumber)(revision)) {
          log.error("No revision provided, but conversation is GroupV2");
        }
        const groupV2Info = conversation.getGroupV2Info({
          members: recipients
        });
        if (groupV2Info && (0, import_lodash.isNumber)(revision)) {
          groupV2Info.revision = revision;
        }
        await (0, import_wrapWithSyncMessageSend.wrapWithSyncMessageSend)({
          conversation,
          logId,
          messageIds,
          send: async () => window.Signal.Util.sendToGroup({
            abortSignal,
            contentHint,
            groupSendOptions: {
              groupV1: conversation.getGroupV1Info(recipients),
              groupV2: groupV2Info,
              deletedForEveryoneTimestamp: targetTimestamp,
              timestamp,
              profileKey
            },
            messageId,
            sendOptions,
            sendTarget: conversation.toSenderKeyTarget(),
            sendType: "deleteForEveryone"
          }),
          sendType,
          timestamp
        });
        await updateMessageWithSuccessfulSends(message);
      }
    } catch (error) {
      if (error instanceof import_Errors.SendMessageProtoError) {
        await updateMessageWithSuccessfulSends(message, error);
      }
      const errors = (0, import_handleMultipleSendErrors.maybeExpandErrors)(error);
      await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
        errors,
        isFinalAttempt,
        log,
        markFailed: () => updateMessageWithFailure(message, errors, log),
        timeRemaining,
        toThrow: error
      });
    }
  });
}
function getRecipients(sendStatusByConversationId) {
  return Object.entries(sendStatusByConversationId).filter(([_, isSent]) => !isSent).map(([conversationId]) => {
    const recipient = window.ConversationController.get(conversationId);
    if (!recipient) {
      return null;
    }
    return recipient.get("uuid");
  }).filter(import_isNotNil.isNotNil);
}
async function updateMessageWithSuccessfulSends(message, result) {
  if (!result) {
    message.set({
      deletedForEveryoneSendStatus: {},
      deletedForEveryoneFailed: void 0
    });
    await window.Signal.Data.saveMessage(message.attributes, {
      ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
    });
    return;
  }
  const deletedForEveryoneSendStatus = {
    ...message.get("deletedForEveryoneSendStatus")
  };
  result.successfulIdentifiers?.forEach((identifier) => {
    const conversation = window.ConversationController.get(identifier);
    if (!conversation) {
      return;
    }
    deletedForEveryoneSendStatus[conversation.id] = true;
  });
  message.set({
    deletedForEveryoneSendStatus,
    deletedForEveryoneFailed: void 0
  });
  await window.Signal.Data.saveMessage(message.attributes, {
    ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
  });
}
async function updateMessageWithFailure(message, errors, log) {
  log.error("updateMessageWithFailure: Setting this set of errors", errors.map(Errors.toLogFormat));
  message.set({ deletedForEveryoneFailed: true });
  await window.Signal.Data.saveMessage(message.attributes, {
    ourUuid: window.textsecure.storage.user.getCheckedUuid().toString()
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendDeleteForEveryone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZERlbGV0ZUZvckV2ZXJ5b25lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uLy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHtcbiAgaXNEaXJlY3RDb252ZXJzYXRpb24sXG4gIGlzR3JvdXBWMixcbiAgaXNNZSxcbn0gZnJvbSAnLi4vLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi8uLi9wcm90b2J1Zic7XG5pbXBvcnQge1xuICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMsXG4gIG1heWJlRXhwYW5kRXJyb3JzLFxufSBmcm9tICcuL2hhbmRsZU11bHRpcGxlU2VuZEVycm9ycyc7XG5pbXBvcnQgeyBvdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL291clByb2ZpbGVLZXknO1xuaW1wb3J0IHsgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQgfSBmcm9tICcuLi8uLi91dGlsL3dyYXBXaXRoU3luY01lc3NhZ2VTZW5kJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uUXVldWVKb2JCdW5kbGUsXG4gIERlbGV0ZUZvckV2ZXJ5b25lSm9iRGF0YSxcbn0gZnJvbSAnLi4vY29udmVyc2F0aW9uSm9iUXVldWUnO1xuaW1wb3J0IHsgZ2V0VW50cnVzdGVkQ29udmVyc2F0aW9uVXVpZHMgfSBmcm9tICcuL2dldFVudHJ1c3RlZENvbnZlcnNhdGlvblV1aWRzJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi4vLi4vdXRpbC9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbkFjY2VwdGVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvbkFjY2VwdGVkJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlQnlJZCB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL2dldE1lc3NhZ2VCeUlkJztcbmltcG9ydCB7IGlzTm90TmlsIH0gZnJvbSAnLi4vLi4vdXRpbC9pc05vdE5pbCc7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrUmVzdWx0VHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VNb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9tZXNzYWdlcyc7XG5pbXBvcnQgeyBTZW5kTWVzc2FnZVByb3RvRXJyb3IgfSBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmREZWxldGVGb3JFdmVyeW9uZShcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAge1xuICAgIGlzRmluYWxBdHRlbXB0LFxuICAgIG1lc3NhZ2luZyxcbiAgICBzaG91bGRDb250aW51ZSxcbiAgICB0aW1lc3RhbXAsXG4gICAgdGltZVJlbWFpbmluZyxcbiAgICBsb2csXG4gIH06IENvbnZlcnNhdGlvblF1ZXVlSm9iQnVuZGxlLFxuICBkYXRhOiBEZWxldGVGb3JFdmVyeW9uZUpvYkRhdGFcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7XG4gICAgbWVzc2FnZUlkLFxuICAgIHJlY2lwaWVudHM6IHJlY2lwaWVudHNGcm9tSm9iLFxuICAgIHJldmlzaW9uLFxuICAgIHRhcmdldFRpbWVzdGFtcCxcbiAgfSA9IGRhdGE7XG5cbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIGxvZy5lcnJvcihgRmFpbGVkIHRvIGZldGNoIG1lc3NhZ2UgJHttZXNzYWdlSWR9LiBGYWlsaW5nIGpvYi5gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIXNob3VsZENvbnRpbnVlKSB7XG4gICAgbG9nLmluZm8oJ1JhbiBvdXQgb2YgdGltZS4gR2l2aW5nIHVwIG9uIHNlbmRpbmcgZGVsZXRlIGZvciBldmVyeW9uZScpO1xuICAgIHVwZGF0ZU1lc3NhZ2VXaXRoRmFpbHVyZShtZXNzYWdlLCBbbmV3IEVycm9yKCdSYW4gb3V0IG9mIHRpbWUhJyldLCBsb2cpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHNlbmRUeXBlID0gJ2RlbGV0ZUZvckV2ZXJ5b25lJztcbiAgY29uc3QgeyBDb250ZW50SGludCB9ID0gUHJvdG8uVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZS5NZXNzYWdlO1xuICBjb25zdCBjb250ZW50SGludCA9IENvbnRlbnRIaW50LlJFU0VOREFCTEU7XG4gIGNvbnN0IG1lc3NhZ2VJZHMgPSBbbWVzc2FnZUlkXTtcblxuICBjb25zdCBsb2dJZCA9IGBkZWxldGVGb3JFdmVyeW9uZS8ke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gO1xuXG4gIGNvbnN0IGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXMgPSBtZXNzYWdlLmdldChcbiAgICAnZGVsZXRlZEZvckV2ZXJ5b25lU2VuZFN0YXR1cydcbiAgKTtcbiAgY29uc3QgcmVjaXBpZW50cyA9IGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXNcbiAgICA/IGdldFJlY2lwaWVudHMoZGVsZXRlZEZvckV2ZXJ5b25lU2VuZFN0YXR1cylcbiAgICA6IHJlY2lwaWVudHNGcm9tSm9iO1xuXG4gIGNvbnN0IHVudHJ1c3RlZFV1aWRzID0gZ2V0VW50cnVzdGVkQ29udmVyc2F0aW9uVXVpZHMocmVjaXBpZW50cyk7XG4gIGlmICh1bnRydXN0ZWRVdWlkcy5sZW5ndGgpIHtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMuY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbih7XG4gICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgdW50cnVzdGVkVXVpZHMsXG4gICAgfSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYERlbGV0ZSBmb3IgZXZlcnlvbmUgYmxvY2tlZCBiZWNhdXNlICR7dW50cnVzdGVkVXVpZHMubGVuZ3RofSBjb252ZXJzYXRpb24ocykgd2VyZSB1bnRydXN0ZWQuIEZhaWxpbmcgdGhpcyBhdHRlbXB0LmBcbiAgICApO1xuICB9XG5cbiAgYXdhaXQgY29udmVyc2F0aW9uLnF1ZXVlSm9iKFxuICAgICdjb252ZXJzYXRpb25RdWV1ZS9zZW5kRGVsZXRlRm9yRXZlcnlvbmUnLFxuICAgIGFzeW5jIGFib3J0U2lnbmFsID0+IHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgU2VuZGluZyBkZWxldGVGb3JFdmVyeW9uZSB0byBjb252ZXJzYXRpb24gJHtsb2dJZH1gLFxuICAgICAgICBgd2l0aCB0aW1lc3RhbXAgJHt0aW1lc3RhbXB9YCxcbiAgICAgICAgYGZvciBtZXNzYWdlICR7dGFyZ2V0VGltZXN0YW1wfWBcbiAgICAgICk7XG5cbiAgICAgIGxldCBwcm9maWxlS2V5OiBVaW50OEFycmF5IHwgdW5kZWZpbmVkO1xuICAgICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVTaGFyaW5nJykpIHtcbiAgICAgICAgcHJvZmlsZUtleSA9IGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLmdldCgpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKGlzTWUoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgY29uc3QgcHJvdG8gPSBhd2FpdCBtZXNzYWdpbmcuZ2V0Q29udGVudE1lc3NhZ2Uoe1xuICAgICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wOiB0YXJnZXRUaW1lc3RhbXAsXG4gICAgICAgICAgICBwcm9maWxlS2V5LFxuICAgICAgICAgICAgcmVjaXBpZW50czogY29udmVyc2F0aW9uLmdldFJlY2lwaWVudHMoKSxcbiAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBzdHJpY3RBc3NlcnQoXG4gICAgICAgICAgICBwcm90by5kYXRhTWVzc2FnZSxcbiAgICAgICAgICAgICdDb250ZW50TWVzc2FnZSBtdXN0IGhhdmUgZGF0YU1lc3NhZ2UnXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKFxuICAgICAgICAgICAgbWVzc2FnaW5nLnNlbmRTeW5jTWVzc2FnZSh7XG4gICAgICAgICAgICAgIGVuY29kZWREYXRhTWVzc2FnZTogUHJvdG8uRGF0YU1lc3NhZ2UuZW5jb2RlKFxuICAgICAgICAgICAgICAgIHByb3RvLmRhdGFNZXNzYWdlXG4gICAgICAgICAgICAgICkuZmluaXNoKCksXG4gICAgICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JyksXG4gICAgICAgICAgICAgIGRlc3RpbmF0aW9uVXVpZDogY29udmVyc2F0aW9uLmdldCgndXVpZCcpLFxuICAgICAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IG51bGwsXG4gICAgICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICAgIHsgbWVzc2FnZUlkcywgc2VuZFR5cGUgfVxuICAgICAgICAgICk7XG4gICAgICAgICAgYXdhaXQgdXBkYXRlTWVzc2FnZVdpdGhTdWNjZXNzZnVsU2VuZHMobWVzc2FnZSk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgaWYgKCFpc0NvbnZlcnNhdGlvbkFjY2VwdGVkKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIG5vdCBhY2NlcHRlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1cGRhdGVNZXNzYWdlV2l0aEZhaWx1cmUoXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIFtuZXcgRXJyb3IoJ01lc3NhZ2UgcmVxdWVzdCB3YXMgbm90IGFjY2VwdGVkJyldLFxuICAgICAgICAgICAgICBsb2dcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGlmIChpc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyB1bnJlZ2lzdGVyZWQ7IHJlZnVzaW5nIHRvIHNlbmRgXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZVdpdGhGYWlsdXJlKFxuICAgICAgICAgICAgICBtZXNzYWdlLFxuICAgICAgICAgICAgICBbbmV3IEVycm9yKCdDb250YWN0IG5vIGxvbmdlciBoYXMgYSBTaWduYWwgYWNjb3VudCcpXSxcbiAgICAgICAgICAgICAgbG9nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZiAoY29udmVyc2F0aW9uLmlzQmxvY2tlZCgpKSB7XG4gICAgICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgYmxvY2tlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgICAgICk7XG4gICAgICAgICAgICB1cGRhdGVNZXNzYWdlV2l0aEZhaWx1cmUoXG4gICAgICAgICAgICAgIG1lc3NhZ2UsXG4gICAgICAgICAgICAgIFtuZXcgRXJyb3IoJ0NvbnRhY3QgaXMgYmxvY2tlZCcpXSxcbiAgICAgICAgICAgICAgbG9nXG4gICAgICAgICAgICApO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIGF3YWl0IHdyYXBXaXRoU3luY01lc3NhZ2VTZW5kKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgIGxvZ0lkLFxuICAgICAgICAgICAgbWVzc2FnZUlkcyxcbiAgICAgICAgICAgIHNlbmQ6IGFzeW5jIHNlbmRlciA9PlxuICAgICAgICAgICAgICBzZW5kZXIuc2VuZE1lc3NhZ2VUb0lkZW50aWZpZXIoe1xuICAgICAgICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbm9uLW51bGwtYXNzZXJ0aW9uXG4gICAgICAgICAgICAgICAgaWRlbnRpZmllcjogY29udmVyc2F0aW9uLmdldFNlbmRUYXJnZXQoKSEsXG4gICAgICAgICAgICAgICAgbWVzc2FnZVRleHQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wOiB0YXJnZXRUaW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgICAgIGV4cGlyZVRpbWVyOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgICAgICAgZ3JvdXBJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVLZXksXG4gICAgICAgICAgICAgICAgb3B0aW9uczogc2VuZE9wdGlvbnMsXG4gICAgICAgICAgICAgIH0pLFxuICAgICAgICAgICAgc2VuZFR5cGUsXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhd2FpdCB1cGRhdGVNZXNzYWdlV2l0aFN1Y2Nlc3NmdWxTZW5kcyhtZXNzYWdlKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBpZiAoaXNHcm91cFYyKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSAmJiAhaXNOdW1iZXIocmV2aXNpb24pKSB7XG4gICAgICAgICAgICBsb2cuZXJyb3IoJ05vIHJldmlzaW9uIHByb3ZpZGVkLCBidXQgY29udmVyc2F0aW9uIGlzIEdyb3VwVjInKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBncm91cFYySW5mbyA9IGNvbnZlcnNhdGlvbi5nZXRHcm91cFYySW5mbyh7XG4gICAgICAgICAgICBtZW1iZXJzOiByZWNpcGllbnRzLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGlmIChncm91cFYySW5mbyAmJiBpc051bWJlcihyZXZpc2lvbikpIHtcbiAgICAgICAgICAgIGdyb3VwVjJJbmZvLnJldmlzaW9uID0gcmV2aXNpb247XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXdhaXQgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICAgICAgbG9nSWQsXG4gICAgICAgICAgICBtZXNzYWdlSWRzLFxuICAgICAgICAgICAgc2VuZDogYXN5bmMgKCkgPT5cbiAgICAgICAgICAgICAgd2luZG93LlNpZ25hbC5VdGlsLnNlbmRUb0dyb3VwKHtcbiAgICAgICAgICAgICAgICBhYm9ydFNpZ25hbCxcbiAgICAgICAgICAgICAgICBjb250ZW50SGludCxcbiAgICAgICAgICAgICAgICBncm91cFNlbmRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgICBncm91cFYxOiBjb252ZXJzYXRpb24uZ2V0R3JvdXBWMUluZm8ocmVjaXBpZW50cyksXG4gICAgICAgICAgICAgICAgICBncm91cFYyOiBncm91cFYySW5mbyxcbiAgICAgICAgICAgICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVRpbWVzdGFtcDogdGFyZ2V0VGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICAgICAgICAgICAgcHJvZmlsZUtleSxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgICAgICAgICBzZW5kT3B0aW9ucyxcbiAgICAgICAgICAgICAgICBzZW5kVGFyZ2V0OiBjb252ZXJzYXRpb24udG9TZW5kZXJLZXlUYXJnZXQoKSxcbiAgICAgICAgICAgICAgICBzZW5kVHlwZTogJ2RlbGV0ZUZvckV2ZXJ5b25lJyxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICBzZW5kVHlwZSxcbiAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGF3YWl0IHVwZGF0ZU1lc3NhZ2VXaXRoU3VjY2Vzc2Z1bFNlbmRzKG1lc3NhZ2UpO1xuICAgICAgICB9XG4gICAgICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBTZW5kTWVzc2FnZVByb3RvRXJyb3IpIHtcbiAgICAgICAgICBhd2FpdCB1cGRhdGVNZXNzYWdlV2l0aFN1Y2Nlc3NmdWxTZW5kcyhtZXNzYWdlLCBlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICBjb25zdCBlcnJvcnMgPSBtYXliZUV4cGFuZEVycm9ycyhlcnJvcik7XG4gICAgICAgIGF3YWl0IGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyh7XG4gICAgICAgICAgZXJyb3JzLFxuICAgICAgICAgIGlzRmluYWxBdHRlbXB0LFxuICAgICAgICAgIGxvZyxcbiAgICAgICAgICBtYXJrRmFpbGVkOiAoKSA9PiB1cGRhdGVNZXNzYWdlV2l0aEZhaWx1cmUobWVzc2FnZSwgZXJyb3JzLCBsb2cpLFxuICAgICAgICAgIHRpbWVSZW1haW5pbmcsXG4gICAgICAgICAgdG9UaHJvdzogZXJyb3IsXG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH1cbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0UmVjaXBpZW50cyhcbiAgc2VuZFN0YXR1c0J5Q29udmVyc2F0aW9uSWQ6IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+XG4pOiBBcnJheTxzdHJpbmc+IHtcbiAgcmV0dXJuIE9iamVjdC5lbnRyaWVzKHNlbmRTdGF0dXNCeUNvbnZlcnNhdGlvbklkKVxuICAgIC5maWx0ZXIoKFtfLCBpc1NlbnRdKSA9PiAhaXNTZW50KVxuICAgIC5tYXAoKFtjb252ZXJzYXRpb25JZF0pID0+IHtcbiAgICAgIGNvbnN0IHJlY2lwaWVudCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgICBpZiAoIXJlY2lwaWVudCkge1xuICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgIH1cbiAgICAgIHJldHVybiByZWNpcGllbnQuZ2V0KCd1dWlkJyk7XG4gICAgfSlcbiAgICAuZmlsdGVyKGlzTm90TmlsKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gdXBkYXRlTWVzc2FnZVdpdGhTdWNjZXNzZnVsU2VuZHMoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCxcbiAgcmVzdWx0PzogQ2FsbGJhY2tSZXN1bHRUeXBlIHwgU2VuZE1lc3NhZ2VQcm90b0Vycm9yXG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgaWYgKCFyZXN1bHQpIHtcbiAgICBtZXNzYWdlLnNldCh7XG4gICAgICBkZWxldGVkRm9yRXZlcnlvbmVTZW5kU3RhdHVzOiB7fSxcbiAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZUZhaWxlZDogdW5kZWZpbmVkLFxuICAgIH0pO1xuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZShtZXNzYWdlLmF0dHJpYnV0ZXMsIHtcbiAgICAgIG91clV1aWQ6IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCksXG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBkZWxldGVkRm9yRXZlcnlvbmVTZW5kU3RhdHVzID0ge1xuICAgIC4uLm1lc3NhZ2UuZ2V0KCdkZWxldGVkRm9yRXZlcnlvbmVTZW5kU3RhdHVzJyksXG4gIH07XG5cbiAgcmVzdWx0LnN1Y2Nlc3NmdWxJZGVudGlmaWVycz8uZm9yRWFjaChpZGVudGlmaWVyID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcik7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lU2VuZFN0YXR1c1tjb252ZXJzYXRpb24uaWRdID0gdHJ1ZTtcbiAgfSk7XG5cbiAgbWVzc2FnZS5zZXQoe1xuICAgIGRlbGV0ZWRGb3JFdmVyeW9uZVNlbmRTdGF0dXMsXG4gICAgZGVsZXRlZEZvckV2ZXJ5b25lRmFpbGVkOiB1bmRlZmluZWQsXG4gIH0pO1xuICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuc2F2ZU1lc3NhZ2UobWVzc2FnZS5hdHRyaWJ1dGVzLCB7XG4gICAgb3VyVXVpZDogd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCkudG9TdHJpbmcoKSxcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHVwZGF0ZU1lc3NhZ2VXaXRoRmFpbHVyZShcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsLFxuICBlcnJvcnM6IFJlYWRvbmx5QXJyYXk8dW5rbm93bj4sXG4gIGxvZzogTG9nZ2VyVHlwZVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxvZy5lcnJvcihcbiAgICAndXBkYXRlTWVzc2FnZVdpdGhGYWlsdXJlOiBTZXR0aW5nIHRoaXMgc2V0IG9mIGVycm9ycycsXG4gICAgZXJyb3JzLm1hcChFcnJvcnMudG9Mb2dGb3JtYXQpXG4gICk7XG5cbiAgbWVzc2FnZS5zZXQoeyBkZWxldGVkRm9yRXZlcnlvbmVGYWlsZWQ6IHRydWUgfSk7XG4gIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5zYXZlTWVzc2FnZShtZXNzYWdlLmF0dHJpYnV0ZXMsIHtcbiAgICBvdXJVdWlkOiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKS50b1N0cmluZygpLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUI7QUFFekIsYUFBd0I7QUFDeEIsNEJBQStCO0FBQy9CLG9DQUlPO0FBQ1Asc0JBQXVDO0FBQ3ZDLHNDQUdPO0FBQ1AsMkJBQXFDO0FBQ3JDLHFDQUF3QztBQU94QywyQ0FBOEM7QUFDOUMsK0JBQWtDO0FBQ2xDLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFDM0MsNEJBQStCO0FBQy9CLHNCQUF5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
