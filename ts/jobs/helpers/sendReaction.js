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
var sendReaction_exports = {};
__export(sendReaction_exports, {
  sendReaction: () => sendReaction
});
module.exports = __toCommonJS(sendReaction_exports);
var import_lodash = require("lodash");
var Errors = __toESM(require("../../types/errors"));
var import_iterables = require("../../util/iterables");
var reactionUtil = __toESM(require("../../reactions/util"));
var import_MessageSendState = require("../../messages/MessageSendState");
var import_getMessageById = require("../../messages/getMessageById");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_getSendOptions = require("../../util/getSendOptions");
var import_protobuf = require("../../protobuf");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_message = require("../../state/selectors/message");
var import_findAndFormatContact = require("../../util/findAndFormatContact");
var import_UUID = require("../../types/UUID");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_incrementMessageCounter = require("../../util/incrementMessageCounter");
var import_isConversationAccepted = require("../../util/isConversationAccepted");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
async function sendReaction(conversation, {
  isFinalAttempt,
  messaging,
  shouldContinue,
  timeRemaining,
  log
}, data) {
  const { messageId, revision } = data;
  const ourUuid = window.textsecure.storage.user.getCheckedUuid().toString();
  await window.ConversationController.load();
  const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
  const message = await (0, import_getMessageById.getMessageById)(messageId);
  if (!message) {
    log.info(`message ${messageId} was not found, maybe because it was deleted. Giving up on sending its reactions`);
    return;
  }
  const { pendingReaction, emojiToRemove } = reactionUtil.getNewestPendingOutgoingReaction(getReactions(message), ourConversationId);
  if (!pendingReaction) {
    log.info(`no pending reaction for ${messageId}. Doing nothing`);
    return;
  }
  if (!(0, import_message.canReact)(message.attributes, ourConversationId, import_findAndFormatContact.findAndFormatContact)) {
    log.info(`could not react to ${messageId}. Removing this pending reaction`);
    markReactionFailed(message, pendingReaction);
    await window.Signal.Data.saveMessage(message.attributes, { ourUuid });
    return;
  }
  if (!shouldContinue) {
    log.info(`reacting to message ${messageId} ran out of time. Giving up on sending it`);
    markReactionFailed(message, pendingReaction);
    await window.Signal.Data.saveMessage(message.attributes, { ourUuid });
    return;
  }
  let sendErrors = [];
  const saveErrors = /* @__PURE__ */ __name((errors) => {
    sendErrors = errors;
  }, "saveErrors");
  let originalError;
  try {
    const messageConversation = message.getConversation();
    if (messageConversation !== conversation) {
      log.error(`message conversation '${messageConversation?.idForLogging()}' does not match job conversation ${conversation.idForLogging()}`);
      return;
    }
    const {
      allRecipientIdentifiers,
      recipientIdentifiersWithoutMe,
      untrustedUuids
    } = getRecipients(log, pendingReaction, conversation);
    if (untrustedUuids.length) {
      window.reduxActions.conversations.conversationStoppedByMissingVerification({
        conversationId: conversation.id,
        untrustedUuids
      });
      throw new Error(`Reaction for message ${messageId} sending blocked because ${untrustedUuids.length} conversation(s) were untrusted. Failing this attempt.`);
    }
    const expireTimer = message.get("expireTimer");
    const profileKey = conversation.get("profileSharing") ? await import_ourProfileKey.ourProfileKeyService.get() : void 0;
    const reactionForSend = pendingReaction.emoji ? pendingReaction : {
      ...pendingReaction,
      emoji: emojiToRemove,
      remove: true
    };
    const ephemeralMessageForReactionSend = new window.Whisper.Message({
      id: import_UUID.UUID.generate().toString(),
      type: "outgoing",
      conversationId: conversation.get("id"),
      sent_at: pendingReaction.timestamp,
      received_at: (0, import_incrementMessageCounter.incrementMessageCounter)(),
      received_at_ms: pendingReaction.timestamp,
      timestamp: pendingReaction.timestamp,
      sendStateByConversationId: (0, import_iterables.zipObject)(Object.keys(pendingReaction.isSentByConversationId || {}), (0, import_iterables.repeat)({
        status: import_MessageSendState.SendStatus.Pending,
        updatedAt: Date.now()
      }))
    });
    if ((0, import_message.isStory)(message.attributes) && (0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
      ephemeralMessageForReactionSend.set({
        storyId: message.id,
        storyReactionEmoji: reactionForSend.emoji
      });
    } else {
      ephemeralMessageForReactionSend.doNotSave = true;
    }
    let didFullySend;
    const successfulConversationIds = /* @__PURE__ */ new Set();
    if (recipientIdentifiersWithoutMe.length === 0) {
      log.info("sending sync reaction message only");
      const dataMessage = await messaging.getDataMessage({
        attachments: [],
        expireTimer,
        groupV2: conversation.getGroupV2Info({
          members: recipientIdentifiersWithoutMe
        }),
        preview: [],
        profileKey,
        reaction: reactionForSend,
        recipients: allRecipientIdentifiers,
        timestamp: pendingReaction.timestamp
      });
      await ephemeralMessageForReactionSend.sendSyncMessageOnly(dataMessage, saveErrors);
      didFullySend = true;
      successfulConversationIds.add(ourConversationId);
    } else {
      const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
      const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
      let promise;
      if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
        if (!(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is not accepted; refusing to send`);
          markReactionFailed(message, pendingReaction);
          return;
        }
        if ((0, import_isConversationUnregistered.isConversationUnregistered)(conversation.attributes)) {
          log.info(`conversation ${conversation.idForLogging()} is unregistered; refusing to send`);
          markReactionFailed(message, pendingReaction);
          return;
        }
        if (conversation.isBlocked()) {
          log.info(`conversation ${conversation.idForLogging()} is blocked; refusing to send`);
          markReactionFailed(message, pendingReaction);
          return;
        }
        log.info("sending direct reaction message");
        promise = messaging.sendMessageToIdentifier({
          identifier: recipientIdentifiersWithoutMe[0],
          messageText: void 0,
          attachments: [],
          quote: void 0,
          preview: [],
          sticker: void 0,
          reaction: reactionForSend,
          deletedForEveryoneTimestamp: void 0,
          timestamp: pendingReaction.timestamp,
          expireTimer,
          contentHint: ContentHint.RESENDABLE,
          groupId: void 0,
          profileKey,
          options: sendOptions,
          storyContext: (0, import_message.isStory)(message.attributes) ? {
            authorUuid: message.get("sourceUuid"),
            timestamp: message.get("sent_at")
          } : void 0
        });
      } else {
        log.info("sending group reaction message");
        promise = conversation.queueJob("conversationQueue/sendReaction", (abortSignal) => {
          if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes) && !(0, import_lodash.isNumber)(revision)) {
            log.error("No revision provided, but conversation is GroupV2");
          }
          const groupV2Info = conversation.getGroupV2Info({
            members: recipientIdentifiersWithoutMe
          });
          if (groupV2Info && (0, import_lodash.isNumber)(revision)) {
            groupV2Info.revision = revision;
          }
          return window.Signal.Util.sendToGroup({
            abortSignal,
            contentHint: ContentHint.RESENDABLE,
            groupSendOptions: {
              groupV1: conversation.getGroupV1Info(recipientIdentifiersWithoutMe),
              groupV2: groupV2Info,
              reaction: reactionForSend,
              timestamp: pendingReaction.timestamp,
              expireTimer,
              profileKey,
              storyContext: (0, import_message.isStory)(message.attributes) ? {
                authorUuid: message.get("sourceUuid"),
                timestamp: message.get("sent_at")
              } : void 0
            },
            messageId,
            sendOptions,
            sendTarget: conversation.toSenderKeyTarget(),
            sendType: "reaction"
          });
        });
      }
      await ephemeralMessageForReactionSend.send((0, import_handleMessageSend.handleMessageSend)(promise, {
        messageIds: [messageId],
        sendType: "reaction"
      }), saveErrors);
      try {
        await promise;
      } catch (error) {
        if (error instanceof Error) {
          originalError = error;
        } else {
          log.error(`promise threw something other than an error: ${Errors.toLogFormat(error)}`);
        }
      }
      didFullySend = true;
      const reactionSendStateByConversationId = ephemeralMessageForReactionSend.get("sendStateByConversationId") || {};
      for (const [conversationId, sendState] of Object.entries(reactionSendStateByConversationId)) {
        if ((0, import_MessageSendState.isSent)(sendState.status)) {
          successfulConversationIds.add(conversationId);
        } else {
          didFullySend = false;
        }
      }
      if (!ephemeralMessageForReactionSend.doNotSave) {
        const reactionMessage = ephemeralMessageForReactionSend;
        await Promise.all([
          await window.Signal.Data.saveMessage(reactionMessage.attributes, {
            ourUuid,
            forceSave: true
          }),
          reactionMessage.hydrateStoryContext(message)
        ]);
        conversation.addSingleMessage(window.MessageController.register(reactionMessage.id, reactionMessage));
      }
    }
    const newReactions = reactionUtil.markOutgoingReactionSent(getReactions(message), pendingReaction, successfulConversationIds, message.attributes);
    setReactions(message, newReactions);
    if (!didFullySend) {
      throw new Error("reaction did not fully send");
    }
  } catch (thrownError) {
    await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      errors: [thrownError, ...sendErrors],
      isFinalAttempt,
      log,
      markFailed: () => markReactionFailed(message, pendingReaction),
      timeRemaining,
      toThrow: originalError || thrownError
    });
  } finally {
    await window.Signal.Data.saveMessage(message.attributes, { ourUuid });
  }
}
const getReactions = /* @__PURE__ */ __name((message) => message.get("reactions") || [], "getReactions");
const setReactions = /* @__PURE__ */ __name((message, reactions) => {
  if (reactions.length) {
    message.set("reactions", reactions);
  } else {
    message.unset("reactions");
  }
}, "setReactions");
function getRecipients(log, reaction, conversation) {
  const allRecipientIdentifiers = [];
  const recipientIdentifiersWithoutMe = [];
  const untrustedUuids = [];
  const currentConversationRecipients = conversation.getMemberConversationIds();
  for (const id of reactionUtil.getUnsentConversationIds(reaction)) {
    const recipient = window.ConversationController.get(id);
    if (!recipient) {
      continue;
    }
    const recipientIdentifier = recipient.getSendTarget();
    const isRecipientMe = (0, import_whatTypeOfConversation.isMe)(recipient.attributes);
    if (!recipientIdentifier || !currentConversationRecipients.has(id) && !isRecipientMe) {
      continue;
    }
    if (recipient.isUntrusted()) {
      const uuid = recipient.get("uuid");
      if (!uuid) {
        log.error(`sendReaction/getRecipients: Untrusted conversation ${recipient.idForLogging()} missing UUID.`);
        continue;
      }
      untrustedUuids.push(uuid);
      continue;
    }
    if (recipient.isUnregistered()) {
      untrustedUuids.push(recipientIdentifier);
      continue;
    }
    allRecipientIdentifiers.push(recipientIdentifier);
    if (!isRecipientMe) {
      recipientIdentifiersWithoutMe.push(recipientIdentifier);
    }
  }
  return {
    allRecipientIdentifiers,
    recipientIdentifiersWithoutMe,
    untrustedUuids
  };
}
function markReactionFailed(message, pendingReaction) {
  const newReactions = reactionUtil.markOutgoingReactionFailed(getReactions(message), pendingReaction);
  setReactions(message, newReactions);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  sendReaction
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZFJlYWN0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IHJlcGVhdCwgemlwT2JqZWN0IH0gZnJvbSAnLi4vLi4vdXRpbC9pdGVyYWJsZXMnO1xuaW1wb3J0IHR5cGUgeyBDYWxsYmFja1Jlc3VsdFR5cGUgfSBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL1R5cGVzLmQnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlTW9kZWwgfSBmcm9tICcuLi8uLi9tb2RlbHMvbWVzc2FnZXMnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlUmVhY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuXG5pbXBvcnQgKiBhcyByZWFjdGlvblV0aWwgZnJvbSAnLi4vLi4vcmVhY3Rpb25zL3V0aWwnO1xuaW1wb3J0IHsgaXNTZW50LCBTZW5kU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQgeyBnZXRNZXNzYWdlQnlJZCB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL2dldE1lc3NhZ2VCeUlkJztcbmltcG9ydCB7XG4gIGlzTWUsXG4gIGlzRGlyZWN0Q29udmVyc2F0aW9uLFxuICBpc0dyb3VwVjIsXG59IGZyb20gJy4uLy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi4vLi4vdXRpbC9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBvdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL291clByb2ZpbGVLZXknO1xuaW1wb3J0IHsgY2FuUmVhY3QsIGlzU3RvcnkgfSBmcm9tICcuLi8uLi9zdGF0ZS9zZWxlY3RvcnMvbWVzc2FnZSc7XG5pbXBvcnQgeyBmaW5kQW5kRm9ybWF0Q29udGFjdCB9IGZyb20gJy4uLy4uL3V0aWwvZmluZEFuZEZvcm1hdENvbnRhY3QnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzIH0gZnJvbSAnLi9oYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMnO1xuaW1wb3J0IHsgaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIgfSBmcm9tICcuLi8uLi91dGlsL2luY3JlbWVudE1lc3NhZ2VDb3VudGVyJztcblxuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25RdWV1ZUpvYkJ1bmRsZSxcbiAgUmVhY3Rpb25Kb2JEYXRhLFxufSBmcm9tICcuLi9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbkFjY2VwdGVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvbkFjY2VwdGVkJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgdHlwZSB7IExvZ2dlclR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9Mb2dnaW5nJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmRSZWFjdGlvbihcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAge1xuICAgIGlzRmluYWxBdHRlbXB0LFxuICAgIG1lc3NhZ2luZyxcbiAgICBzaG91bGRDb250aW51ZSxcbiAgICB0aW1lUmVtYWluaW5nLFxuICAgIGxvZyxcbiAgfTogQ29udmVyc2F0aW9uUXVldWVKb2JCdW5kbGUsXG4gIGRhdGE6IFJlYWN0aW9uSm9iRGF0YVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHsgbWVzc2FnZUlkLCByZXZpc2lvbiB9ID0gZGF0YTtcbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpLnRvU3RyaW5nKCk7XG5cbiAgYXdhaXQgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIubG9hZCgpO1xuXG4gIGNvbnN0IG91ckNvbnZlcnNhdGlvbklkID1cbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPdXJDb252ZXJzYXRpb25JZE9yVGhyb3coKTtcblxuICBjb25zdCBtZXNzYWdlID0gYXdhaXQgZ2V0TWVzc2FnZUJ5SWQobWVzc2FnZUlkKTtcbiAgaWYgKCFtZXNzYWdlKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICBgbWVzc2FnZSAke21lc3NhZ2VJZH0gd2FzIG5vdCBmb3VuZCwgbWF5YmUgYmVjYXVzZSBpdCB3YXMgZGVsZXRlZC4gR2l2aW5nIHVwIG9uIHNlbmRpbmcgaXRzIHJlYWN0aW9uc2BcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgcGVuZGluZ1JlYWN0aW9uLCBlbW9qaVRvUmVtb3ZlIH0gPVxuICAgIHJlYWN0aW9uVXRpbC5nZXROZXdlc3RQZW5kaW5nT3V0Z29pbmdSZWFjdGlvbihcbiAgICAgIGdldFJlYWN0aW9ucyhtZXNzYWdlKSxcbiAgICAgIG91ckNvbnZlcnNhdGlvbklkXG4gICAgKTtcbiAgaWYgKCFwZW5kaW5nUmVhY3Rpb24pIHtcbiAgICBsb2cuaW5mbyhgbm8gcGVuZGluZyByZWFjdGlvbiBmb3IgJHttZXNzYWdlSWR9LiBEb2luZyBub3RoaW5nYCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFjYW5SZWFjdChtZXNzYWdlLmF0dHJpYnV0ZXMsIG91ckNvbnZlcnNhdGlvbklkLCBmaW5kQW5kRm9ybWF0Q29udGFjdCkpIHtcbiAgICBsb2cuaW5mbyhgY291bGQgbm90IHJlYWN0IHRvICR7bWVzc2FnZUlkfS4gUmVtb3ZpbmcgdGhpcyBwZW5kaW5nIHJlYWN0aW9uYCk7XG4gICAgbWFya1JlYWN0aW9uRmFpbGVkKG1lc3NhZ2UsIHBlbmRpbmdSZWFjdGlvbik7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywgeyBvdXJVdWlkIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghc2hvdWxkQ29udGludWUpIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGByZWFjdGluZyB0byBtZXNzYWdlICR7bWVzc2FnZUlkfSByYW4gb3V0IG9mIHRpbWUuIEdpdmluZyB1cCBvbiBzZW5kaW5nIGl0YFxuICAgICk7XG4gICAgbWFya1JlYWN0aW9uRmFpbGVkKG1lc3NhZ2UsIHBlbmRpbmdSZWFjdGlvbik7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywgeyBvdXJVdWlkIH0pO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBzZW5kRXJyb3JzOiBBcnJheTxFcnJvcj4gPSBbXTtcbiAgY29uc3Qgc2F2ZUVycm9ycyA9IChlcnJvcnM6IEFycmF5PEVycm9yPik6IHZvaWQgPT4ge1xuICAgIHNlbmRFcnJvcnMgPSBlcnJvcnM7XG4gIH07XG5cbiAgbGV0IG9yaWdpbmFsRXJyb3I6IEVycm9yIHwgdW5kZWZpbmVkO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVzc2FnZUNvbnZlcnNhdGlvbiA9IG1lc3NhZ2UuZ2V0Q29udmVyc2F0aW9uKCk7XG4gICAgaWYgKG1lc3NhZ2VDb252ZXJzYXRpb24gIT09IGNvbnZlcnNhdGlvbikge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgbWVzc2FnZSBjb252ZXJzYXRpb24gJyR7bWVzc2FnZUNvbnZlcnNhdGlvbj8uaWRGb3JMb2dnaW5nKCl9JyBkb2VzIG5vdCBtYXRjaCBqb2IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgYWxsUmVjaXBpZW50SWRlbnRpZmllcnMsXG4gICAgICByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZSxcbiAgICAgIHVudHJ1c3RlZFV1aWRzLFxuICAgIH0gPSBnZXRSZWNpcGllbnRzKGxvZywgcGVuZGluZ1JlYWN0aW9uLCBjb252ZXJzYXRpb24pO1xuXG4gICAgaWYgKHVudHJ1c3RlZFV1aWRzLmxlbmd0aCkge1xuICAgICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLmNvbnZlcnNhdGlvblN0b3BwZWRCeU1pc3NpbmdWZXJpZmljYXRpb24oXG4gICAgICAgIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICAgIHVudHJ1c3RlZFV1aWRzLFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgUmVhY3Rpb24gZm9yIG1lc3NhZ2UgJHttZXNzYWdlSWR9IHNlbmRpbmcgYmxvY2tlZCBiZWNhdXNlICR7dW50cnVzdGVkVXVpZHMubGVuZ3RofSBjb252ZXJzYXRpb24ocykgd2VyZSB1bnRydXN0ZWQuIEZhaWxpbmcgdGhpcyBhdHRlbXB0LmBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhwaXJlVGltZXIgPSBtZXNzYWdlLmdldCgnZXhwaXJlVGltZXInKTtcbiAgICBjb25zdCBwcm9maWxlS2V5ID0gY29udmVyc2F0aW9uLmdldCgncHJvZmlsZVNoYXJpbmcnKVxuICAgICAgPyBhd2FpdCBvdXJQcm9maWxlS2V5U2VydmljZS5nZXQoKVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCByZWFjdGlvbkZvclNlbmQgPSBwZW5kaW5nUmVhY3Rpb24uZW1vamlcbiAgICAgID8gcGVuZGluZ1JlYWN0aW9uXG4gICAgICA6IHtcbiAgICAgICAgICAuLi5wZW5kaW5nUmVhY3Rpb24sXG4gICAgICAgICAgZW1vamk6IGVtb2ppVG9SZW1vdmUsXG4gICAgICAgICAgcmVtb3ZlOiB0cnVlLFxuICAgICAgICB9O1xuXG4gICAgY29uc3QgZXBoZW1lcmFsTWVzc2FnZUZvclJlYWN0aW9uU2VuZCA9IG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlKHtcbiAgICAgIGlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmdldCgnaWQnKSxcbiAgICAgIHNlbnRfYXQ6IHBlbmRpbmdSZWFjdGlvbi50aW1lc3RhbXAsXG4gICAgICByZWNlaXZlZF9hdDogaW5jcmVtZW50TWVzc2FnZUNvdW50ZXIoKSxcbiAgICAgIHJlY2VpdmVkX2F0X21zOiBwZW5kaW5nUmVhY3Rpb24udGltZXN0YW1wLFxuICAgICAgdGltZXN0YW1wOiBwZW5kaW5nUmVhY3Rpb24udGltZXN0YW1wLFxuICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDogemlwT2JqZWN0KFxuICAgICAgICBPYmplY3Qua2V5cyhwZW5kaW5nUmVhY3Rpb24uaXNTZW50QnlDb252ZXJzYXRpb25JZCB8fCB7fSksXG4gICAgICAgIHJlcGVhdCh7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICB9KVxuICAgICAgKSxcbiAgICB9KTtcblxuICAgIGlmIChcbiAgICAgIGlzU3RvcnkobWVzc2FnZS5hdHRyaWJ1dGVzKSAmJlxuICAgICAgaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpXG4gICAgKSB7XG4gICAgICBlcGhlbWVyYWxNZXNzYWdlRm9yUmVhY3Rpb25TZW5kLnNldCh7XG4gICAgICAgIHN0b3J5SWQ6IG1lc3NhZ2UuaWQsXG4gICAgICAgIHN0b3J5UmVhY3Rpb25FbW9qaTogcmVhY3Rpb25Gb3JTZW5kLmVtb2ppLFxuICAgICAgfSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGVwaGVtZXJhbE1lc3NhZ2VGb3JSZWFjdGlvblNlbmQuZG9Ob3RTYXZlID0gdHJ1ZTtcbiAgICB9XG5cbiAgICBsZXQgZGlkRnVsbHlTZW5kOiBib29sZWFuO1xuICAgIGNvbnN0IHN1Y2Nlc3NmdWxDb252ZXJzYXRpb25JZHMgPSBuZXcgU2V0PHN0cmluZz4oKTtcblxuICAgIGlmIChyZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZS5sZW5ndGggPT09IDApIHtcbiAgICAgIGxvZy5pbmZvKCdzZW5kaW5nIHN5bmMgcmVhY3Rpb24gbWVzc2FnZSBvbmx5Jyk7XG4gICAgICBjb25zdCBkYXRhTWVzc2FnZSA9IGF3YWl0IG1lc3NhZ2luZy5nZXREYXRhTWVzc2FnZSh7XG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgZXhwaXJlVGltZXIsXG4gICAgICAgIGdyb3VwVjI6IGNvbnZlcnNhdGlvbi5nZXRHcm91cFYySW5mbyh7XG4gICAgICAgICAgbWVtYmVyczogcmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWUsXG4gICAgICAgIH0pLFxuICAgICAgICBwcmV2aWV3OiBbXSxcbiAgICAgICAgcHJvZmlsZUtleSxcbiAgICAgICAgcmVhY3Rpb246IHJlYWN0aW9uRm9yU2VuZCxcbiAgICAgICAgcmVjaXBpZW50czogYWxsUmVjaXBpZW50SWRlbnRpZmllcnMsXG4gICAgICAgIHRpbWVzdGFtcDogcGVuZGluZ1JlYWN0aW9uLnRpbWVzdGFtcCxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgZXBoZW1lcmFsTWVzc2FnZUZvclJlYWN0aW9uU2VuZC5zZW5kU3luY01lc3NhZ2VPbmx5KFxuICAgICAgICBkYXRhTWVzc2FnZSxcbiAgICAgICAgc2F2ZUVycm9yc1xuICAgICAgKTtcblxuICAgICAgZGlkRnVsbHlTZW5kID0gdHJ1ZTtcbiAgICAgIHN1Y2Nlc3NmdWxDb252ZXJzYXRpb25JZHMuYWRkKG91ckNvbnZlcnNhdGlvbklkKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3Qgc2VuZE9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgICAgIGxldCBwcm9taXNlOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT47XG4gICAgICBpZiAoaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGlmICghaXNDb252ZXJzYXRpb25BY2NlcHRlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIG5vdCBhY2NlcHRlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1hcmtSZWFjdGlvbkZhaWxlZChtZXNzYWdlLCBwZW5kaW5nUmVhY3Rpb24pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyB1bnJlZ2lzdGVyZWQ7IHJlZnVzaW5nIHRvIHNlbmRgXG4gICAgICAgICAgKTtcbiAgICAgICAgICBtYXJrUmVhY3Rpb25GYWlsZWQobWVzc2FnZSwgcGVuZGluZ1JlYWN0aW9uKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQoKSkge1xuICAgICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgYmxvY2tlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgICApO1xuICAgICAgICAgIG1hcmtSZWFjdGlvbkZhaWxlZChtZXNzYWdlLCBwZW5kaW5nUmVhY3Rpb24pO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGxvZy5pbmZvKCdzZW5kaW5nIGRpcmVjdCByZWFjdGlvbiBtZXNzYWdlJyk7XG4gICAgICAgIHByb21pc2UgPSBtZXNzYWdpbmcuc2VuZE1lc3NhZ2VUb0lkZW50aWZpZXIoe1xuICAgICAgICAgIGlkZW50aWZpZXI6IHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lWzBdLFxuICAgICAgICAgIG1lc3NhZ2VUZXh0OiB1bmRlZmluZWQsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICAgIHF1b3RlOiB1bmRlZmluZWQsXG4gICAgICAgICAgcHJldmlldzogW10sXG4gICAgICAgICAgc3RpY2tlcjogdW5kZWZpbmVkLFxuICAgICAgICAgIHJlYWN0aW9uOiByZWFjdGlvbkZvclNlbmQsXG4gICAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lVGltZXN0YW1wOiB1bmRlZmluZWQsXG4gICAgICAgICAgdGltZXN0YW1wOiBwZW5kaW5nUmVhY3Rpb24udGltZXN0YW1wLFxuICAgICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgICAgIGdyb3VwSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICBwcm9maWxlS2V5LFxuICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgIHN0b3J5Q29udGV4dDogaXNTdG9yeShtZXNzYWdlLmF0dHJpYnV0ZXMpXG4gICAgICAgICAgICA/IHtcbiAgICAgICAgICAgICAgICBhdXRob3JVdWlkOiBtZXNzYWdlLmdldCgnc291cmNlVXVpZCcpLFxuICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogbWVzc2FnZS5nZXQoJ3NlbnRfYXQnKSxcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbG9nLmluZm8oJ3NlbmRpbmcgZ3JvdXAgcmVhY3Rpb24gbWVzc2FnZScpO1xuICAgICAgICBwcm9taXNlID0gY29udmVyc2F0aW9uLnF1ZXVlSm9iKFxuICAgICAgICAgICdjb252ZXJzYXRpb25RdWV1ZS9zZW5kUmVhY3Rpb24nLFxuICAgICAgICAgIGFib3J0U2lnbmFsID0+IHtcbiAgICAgICAgICAgIC8vIE5vdGU6IHRoaXMgd2lsbCBoYXBwZW4gZm9yIGFsbCBvbGQgam9icyBxdWV1ZWQgYmVmb3JlIDUuMzIueFxuICAgICAgICAgICAgaWYgKGlzR3JvdXBWMihjb252ZXJzYXRpb24uYXR0cmlidXRlcykgJiYgIWlzTnVtYmVyKHJldmlzaW9uKSkge1xuICAgICAgICAgICAgICBsb2cuZXJyb3IoJ05vIHJldmlzaW9uIHByb3ZpZGVkLCBidXQgY29udmVyc2F0aW9uIGlzIEdyb3VwVjInKTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgZ3JvdXBWMkluZm8gPSBjb252ZXJzYXRpb24uZ2V0R3JvdXBWMkluZm8oe1xuICAgICAgICAgICAgICBtZW1iZXJzOiByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZSxcbiAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgaWYgKGdyb3VwVjJJbmZvICYmIGlzTnVtYmVyKHJldmlzaW9uKSkge1xuICAgICAgICAgICAgICBncm91cFYySW5mby5yZXZpc2lvbiA9IHJldmlzaW9uO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICByZXR1cm4gd2luZG93LlNpZ25hbC5VdGlsLnNlbmRUb0dyb3VwKHtcbiAgICAgICAgICAgICAgYWJvcnRTaWduYWwsXG4gICAgICAgICAgICAgIGNvbnRlbnRIaW50OiBDb250ZW50SGludC5SRVNFTkRBQkxFLFxuICAgICAgICAgICAgICBncm91cFNlbmRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBWMTogY29udmVyc2F0aW9uLmdldEdyb3VwVjFJbmZvKFxuICAgICAgICAgICAgICAgICAgcmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWVcbiAgICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgICAgIGdyb3VwVjI6IGdyb3VwVjJJbmZvLFxuICAgICAgICAgICAgICAgIHJlYWN0aW9uOiByZWFjdGlvbkZvclNlbmQsXG4gICAgICAgICAgICAgICAgdGltZXN0YW1wOiBwZW5kaW5nUmVhY3Rpb24udGltZXN0YW1wLFxuICAgICAgICAgICAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgICAgICAgICAgIHByb2ZpbGVLZXksXG4gICAgICAgICAgICAgICAgc3RvcnlDb250ZXh0OiBpc1N0b3J5KG1lc3NhZ2UuYXR0cmlidXRlcylcbiAgICAgICAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgICAgICAgIGF1dGhvclV1aWQ6IG1lc3NhZ2UuZ2V0KCdzb3VyY2VVdWlkJyksXG4gICAgICAgICAgICAgICAgICAgICAgdGltZXN0YW1wOiBtZXNzYWdlLmdldCgnc2VudF9hdCcpLFxuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkLFxuICAgICAgICAgICAgICBzZW5kT3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VuZFRhcmdldDogY29udmVyc2F0aW9uLnRvU2VuZGVyS2V5VGFyZ2V0KCksXG4gICAgICAgICAgICAgIHNlbmRUeXBlOiAncmVhY3Rpb24nLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfVxuXG4gICAgICBhd2FpdCBlcGhlbWVyYWxNZXNzYWdlRm9yUmVhY3Rpb25TZW5kLnNlbmQoXG4gICAgICAgIGhhbmRsZU1lc3NhZ2VTZW5kKHByb21pc2UsIHtcbiAgICAgICAgICBtZXNzYWdlSWRzOiBbbWVzc2FnZUlkXSxcbiAgICAgICAgICBzZW5kVHlwZTogJ3JlYWN0aW9uJyxcbiAgICAgICAgfSksXG4gICAgICAgIHNhdmVFcnJvcnNcbiAgICAgICk7XG5cbiAgICAgIC8vIEJlY2F1c2UgbWVzc2FnZS5zZW5kIHN3YWxsb3dzIGFuZCBwcm9jZXNzZXMgZXJyb3JzLCB3ZSdsbCBhd2FpdCB0aGUgaW5uZXIgcHJvbWlzZVxuICAgICAgLy8gICB0byBnZXQgdGhlIFNlbmRNZXNzYWdlUHJvdG9FcnJvciwgd2hpY2ggZ2l2ZXMgdXMgaW5mb3JtYXRpb24gdXBzdHJlYW1cbiAgICAgIC8vLyAgcHJvY2Vzc29ycyBuZWVkIHRvIGRldGVjdCBjZXJ0YWluIGtpbmRzIG9mIGVycm9ycy5cbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHByb21pc2U7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvcikge1xuICAgICAgICAgIG9yaWdpbmFsRXJyb3IgPSBlcnJvcjtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICBgcHJvbWlzZSB0aHJldyBzb21ldGhpbmcgb3RoZXIgdGhhbiBhbiBlcnJvcjogJHtFcnJvcnMudG9Mb2dGb3JtYXQoXG4gICAgICAgICAgICAgIGVycm9yXG4gICAgICAgICAgICApfWBcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGRpZEZ1bGx5U2VuZCA9IHRydWU7XG4gICAgICBjb25zdCByZWFjdGlvblNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPVxuICAgICAgICBlcGhlbWVyYWxNZXNzYWdlRm9yUmVhY3Rpb25TZW5kLmdldCgnc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCcpIHx8IHt9O1xuICAgICAgZm9yIChjb25zdCBbY29udmVyc2F0aW9uSWQsIHNlbmRTdGF0ZV0gb2YgT2JqZWN0LmVudHJpZXMoXG4gICAgICAgIHJlYWN0aW9uU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZFxuICAgICAgKSkge1xuICAgICAgICBpZiAoaXNTZW50KHNlbmRTdGF0ZS5zdGF0dXMpKSB7XG4gICAgICAgICAgc3VjY2Vzc2Z1bENvbnZlcnNhdGlvbklkcy5hZGQoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRpZEZ1bGx5U2VuZCA9IGZhbHNlO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmICghZXBoZW1lcmFsTWVzc2FnZUZvclJlYWN0aW9uU2VuZC5kb05vdFNhdmUpIHtcbiAgICAgICAgY29uc3QgcmVhY3Rpb25NZXNzYWdlID0gZXBoZW1lcmFsTWVzc2FnZUZvclJlYWN0aW9uU2VuZDtcblxuICAgICAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICAgICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKHJlYWN0aW9uTWVzc2FnZS5hdHRyaWJ1dGVzLCB7XG4gICAgICAgICAgICBvdXJVdWlkLFxuICAgICAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIHJlYWN0aW9uTWVzc2FnZS5oeWRyYXRlU3RvcnlDb250ZXh0KG1lc3NhZ2UpLFxuICAgICAgICBdKTtcblxuICAgICAgICBjb252ZXJzYXRpb24uYWRkU2luZ2xlTWVzc2FnZShcbiAgICAgICAgICB3aW5kb3cuTWVzc2FnZUNvbnRyb2xsZXIucmVnaXN0ZXIocmVhY3Rpb25NZXNzYWdlLmlkLCByZWFjdGlvbk1lc3NhZ2UpXG4gICAgICAgICk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgY29uc3QgbmV3UmVhY3Rpb25zID0gcmVhY3Rpb25VdGlsLm1hcmtPdXRnb2luZ1JlYWN0aW9uU2VudChcbiAgICAgIGdldFJlYWN0aW9ucyhtZXNzYWdlKSxcbiAgICAgIHBlbmRpbmdSZWFjdGlvbixcbiAgICAgIHN1Y2Nlc3NmdWxDb252ZXJzYXRpb25JZHMsXG4gICAgICBtZXNzYWdlLmF0dHJpYnV0ZXNcbiAgICApO1xuICAgIHNldFJlYWN0aW9ucyhtZXNzYWdlLCBuZXdSZWFjdGlvbnMpO1xuXG4gICAgaWYgKCFkaWRGdWxseVNlbmQpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcigncmVhY3Rpb24gZGlkIG5vdCBmdWxseSBzZW5kJyk7XG4gICAgfVxuICB9IGNhdGNoICh0aHJvd25FcnJvcjogdW5rbm93bikge1xuICAgIGF3YWl0IGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyh7XG4gICAgICBlcnJvcnM6IFt0aHJvd25FcnJvciwgLi4uc2VuZEVycm9yc10sXG4gICAgICBpc0ZpbmFsQXR0ZW1wdCxcbiAgICAgIGxvZyxcbiAgICAgIG1hcmtGYWlsZWQ6ICgpID0+IG1hcmtSZWFjdGlvbkZhaWxlZChtZXNzYWdlLCBwZW5kaW5nUmVhY3Rpb24pLFxuICAgICAgdGltZVJlbWFpbmluZyxcbiAgICAgIC8vIEluIHRoZSBjYXNlIG9mIGEgZmFpbGVkIGdyb3VwIHNlbmQgdGhyb3duRXJyb3Igd2lsbCBub3QgYmUgU2VudE1lc3NhZ2VQcm90b0Vycm9yLFxuICAgICAgLy8gICBidXQgd2Ugc2hvdWxkIGhhdmUgYmVlbiBhYmxlIHRvIGhhcnZlc3QgdGhlIG9yaWdpbmFsIGVycm9yLiBJbiB0aGUgTm90ZSB0byBTZWxmXG4gICAgICAvLyAgIHNlbmQgY2FzZSwgdGhyb3duRXJyb3Igd2lsbCBiZSB0aGUgZXJyb3Igd2UgY2FyZSBhYm91dCwgYW5kIHdlIHdvbid0IGhhdmUgYW5cbiAgICAgIC8vICAgb3JpZ2luYWxFcnJvci5cbiAgICAgIHRvVGhyb3c6IG9yaWdpbmFsRXJyb3IgfHwgdGhyb3duRXJyb3IsXG4gICAgfSk7XG4gIH0gZmluYWxseSB7XG4gICAgYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLnNhdmVNZXNzYWdlKG1lc3NhZ2UuYXR0cmlidXRlcywgeyBvdXJVdWlkIH0pO1xuICB9XG59XG5cbmNvbnN0IGdldFJlYWN0aW9ucyA9IChtZXNzYWdlOiBNZXNzYWdlTW9kZWwpOiBBcnJheTxNZXNzYWdlUmVhY3Rpb25UeXBlPiA9PlxuICBtZXNzYWdlLmdldCgncmVhY3Rpb25zJykgfHwgW107XG5cbmNvbnN0IHNldFJlYWN0aW9ucyA9IChcbiAgbWVzc2FnZTogTWVzc2FnZU1vZGVsLFxuICByZWFjdGlvbnM6IEFycmF5PE1lc3NhZ2VSZWFjdGlvblR5cGU+XG4pOiB2b2lkID0+IHtcbiAgaWYgKHJlYWN0aW9ucy5sZW5ndGgpIHtcbiAgICBtZXNzYWdlLnNldCgncmVhY3Rpb25zJywgcmVhY3Rpb25zKTtcbiAgfSBlbHNlIHtcbiAgICBtZXNzYWdlLnVuc2V0KCdyZWFjdGlvbnMnKTtcbiAgfVxufTtcblxuZnVuY3Rpb24gZ2V0UmVjaXBpZW50cyhcbiAgbG9nOiBMb2dnZXJUeXBlLFxuICByZWFjdGlvbjogUmVhZG9ubHk8TWVzc2FnZVJlYWN0aW9uVHlwZT4sXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbik6IHtcbiAgYWxsUmVjaXBpZW50SWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz47XG4gIHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lOiBBcnJheTxzdHJpbmc+O1xuICB1bnRydXN0ZWRVdWlkczogQXJyYXk8c3RyaW5nPjtcbn0ge1xuICBjb25zdCBhbGxSZWNpcGllbnRJZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCByZWNpcGllbnRJZGVudGlmaWVyc1dpdGhvdXRNZTogQXJyYXk8c3RyaW5nPiA9IFtdO1xuICBjb25zdCB1bnRydXN0ZWRVdWlkczogQXJyYXk8c3RyaW5nPiA9IFtdO1xuXG4gIGNvbnN0IGN1cnJlbnRDb252ZXJzYXRpb25SZWNpcGllbnRzID0gY29udmVyc2F0aW9uLmdldE1lbWJlckNvbnZlcnNhdGlvbklkcygpO1xuXG4gIGZvciAoY29uc3QgaWQgb2YgcmVhY3Rpb25VdGlsLmdldFVuc2VudENvbnZlcnNhdGlvbklkcyhyZWFjdGlvbikpIHtcbiAgICBjb25zdCByZWNpcGllbnQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWQpO1xuICAgIGlmICghcmVjaXBpZW50KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCByZWNpcGllbnRJZGVudGlmaWVyID0gcmVjaXBpZW50LmdldFNlbmRUYXJnZXQoKTtcbiAgICBjb25zdCBpc1JlY2lwaWVudE1lID0gaXNNZShyZWNpcGllbnQuYXR0cmlidXRlcyk7XG5cbiAgICBpZiAoXG4gICAgICAhcmVjaXBpZW50SWRlbnRpZmllciB8fFxuICAgICAgKCFjdXJyZW50Q29udmVyc2F0aW9uUmVjaXBpZW50cy5oYXMoaWQpICYmICFpc1JlY2lwaWVudE1lKVxuICAgICkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgaWYgKHJlY2lwaWVudC5pc1VudHJ1c3RlZCgpKSB7XG4gICAgICBjb25zdCB1dWlkID0gcmVjaXBpZW50LmdldCgndXVpZCcpO1xuICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICBgc2VuZFJlYWN0aW9uL2dldFJlY2lwaWVudHM6IFVudHJ1c3RlZCBjb252ZXJzYXRpb24gJHtyZWNpcGllbnQuaWRGb3JMb2dnaW5nKCl9IG1pc3NpbmcgVVVJRC5gXG4gICAgICAgICk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgdW50cnVzdGVkVXVpZHMucHVzaCh1dWlkKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAocmVjaXBpZW50LmlzVW5yZWdpc3RlcmVkKCkpIHtcbiAgICAgIHVudHJ1c3RlZFV1aWRzLnB1c2gocmVjaXBpZW50SWRlbnRpZmllcik7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBhbGxSZWNpcGllbnRJZGVudGlmaWVycy5wdXNoKHJlY2lwaWVudElkZW50aWZpZXIpO1xuICAgIGlmICghaXNSZWNpcGllbnRNZSkge1xuICAgICAgcmVjaXBpZW50SWRlbnRpZmllcnNXaXRob3V0TWUucHVzaChyZWNpcGllbnRJZGVudGlmaWVyKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIGFsbFJlY2lwaWVudElkZW50aWZpZXJzLFxuICAgIHJlY2lwaWVudElkZW50aWZpZXJzV2l0aG91dE1lLFxuICAgIHVudHJ1c3RlZFV1aWRzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBtYXJrUmVhY3Rpb25GYWlsZWQoXG4gIG1lc3NhZ2U6IE1lc3NhZ2VNb2RlbCxcbiAgcGVuZGluZ1JlYWN0aW9uOiBNZXNzYWdlUmVhY3Rpb25UeXBlXG4pOiB2b2lkIHtcbiAgY29uc3QgbmV3UmVhY3Rpb25zID0gcmVhY3Rpb25VdGlsLm1hcmtPdXRnb2luZ1JlYWN0aW9uRmFpbGVkKFxuICAgIGdldFJlYWN0aW9ucyhtZXNzYWdlKSxcbiAgICBwZW5kaW5nUmVhY3Rpb25cbiAgKTtcbiAgc2V0UmVhY3Rpb25zKG1lc3NhZ2UsIG5ld1JlYWN0aW9ucyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXlCO0FBRXpCLGFBQXdCO0FBQ3hCLHVCQUFrQztBQU1sQyxtQkFBOEI7QUFDOUIsOEJB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
