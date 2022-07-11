var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var sendProfileKey_exports = {};
__export(sendProfileKey_exports, {
  canAllErrorsBeIgnored: () => canAllErrorsBeIgnored,
  sendProfileKey: () => sendProfileKey
});
module.exports = __toCommonJS(sendProfileKey_exports);
var import_lodash = require("lodash");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_getSendOptions = require("../../util/getSendOptions");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_protobuf = require("../../protobuf");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_isConversationAccepted = require("../../util/isConversationAccepted");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
var import_Errors = require("../../textsecure/Errors");
function canAllErrorsBeIgnored(conversation, error) {
  if (error instanceof import_Errors.OutgoingIdentityKeyError || error instanceof import_Errors.SendMessageChallengeError || error instanceof import_Errors.UnregisteredUserError) {
    return true;
  }
  return Boolean((0, import_whatTypeOfConversation.isGroup)(conversation) && error instanceof import_Errors.SendMessageProtoError && error.errors?.every((item) => item instanceof import_Errors.OutgoingIdentityKeyError || item instanceof import_Errors.SendMessageChallengeError || item instanceof import_Errors.UnregisteredUserError));
}
async function sendProfileKey(conversation, {
  isFinalAttempt,
  messaging,
  shouldContinue,
  timestamp,
  timeRemaining,
  log
}, data) {
  if (!shouldContinue) {
    log.info("Ran out of time. Giving up on sending profile key");
    return;
  }
  if (!conversation.get("profileSharing")) {
    log.info("No longer sharing profile. Cancelling job.");
    return;
  }
  const profileKey = await import_ourProfileKey.ourProfileKeyService.get();
  if (!profileKey) {
    log.info("Unable to fetch profile. Cancelling job.");
    return;
  }
  log.info(`starting profile key share to ${conversation.idForLogging()} with timestamp ${timestamp}`);
  const { revision } = data;
  const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const contentHint = ContentHint.RESENDABLE;
  const sendType = "profileKeyUpdate";
  let sendPromise;
  if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
    if (!(0, import_isConversationAccepted.isConversationAccepted)(conversation.attributes)) {
      log.info(`conversation ${conversation.idForLogging()} is not accepted; refusing to send`);
      return;
    }
    if ((0, import_isConversationUnregistered.isConversationUnregistered)(conversation.attributes)) {
      log.info(`conversation ${conversation.idForLogging()} is unregistered; refusing to send`);
      return;
    }
    if (conversation.isBlocked()) {
      log.info(`conversation ${conversation.idForLogging()} is blocked; refusing to send`);
      return;
    }
    const proto = await messaging.getContentMessage({
      flags: import_protobuf.SignalService.DataMessage.Flags.PROFILE_KEY_UPDATE,
      profileKey,
      recipients: conversation.getRecipients(),
      timestamp
    });
    sendPromise = messaging.sendIndividualProto({
      contentHint,
      identifier: conversation.getSendTarget(),
      options: sendOptions,
      proto,
      timestamp
    });
  } else {
    if ((0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes) && !(0, import_lodash.isNumber)(revision)) {
      log.error("No revision provided, but conversation is GroupV2");
    }
    const groupV2Info = conversation.getGroupV2Info();
    if (groupV2Info && (0, import_lodash.isNumber)(revision)) {
      groupV2Info.revision = revision;
    }
    sendPromise = window.Signal.Util.sendToGroup({
      contentHint,
      groupSendOptions: {
        flags: import_protobuf.SignalService.DataMessage.Flags.PROFILE_KEY_UPDATE,
        groupV1: conversation.getGroupV1Info(),
        groupV2: groupV2Info,
        profileKey,
        timestamp
      },
      messageId: void 0,
      sendOptions,
      sendTarget: conversation.toSenderKeyTarget(),
      sendType
    });
  }
  try {
    await (0, import_handleMessageSend.handleMessageSend)(sendPromise, {
      messageIds: [],
      sendType
    });
  } catch (error) {
    if (canAllErrorsBeIgnored(conversation.attributes, error)) {
      log.info("Group send failures were all OutgoingIdentityKeyError, SendMessageChallengeError, or UnregisteredUserError. Returning succcessfully.");
      return;
    }
    await (0, import_handleMultipleSendErrors.handleMultipleSendErrors)({
      errors: (0, import_handleMultipleSendErrors.maybeExpandErrors)(error),
      isFinalAttempt,
      log,
      timeRemaining,
      toThrow: error
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canAllErrorsBeIgnored,
  sendProfileKey
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZFByb2ZpbGVLZXkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBoYW5kbGVNZXNzYWdlU2VuZCB9IGZyb20gJy4uLy4uL3V0aWwvaGFuZGxlTWVzc2FnZVNlbmQnO1xuaW1wb3J0IHsgZ2V0U2VuZE9wdGlvbnMgfSBmcm9tICcuLi8uLi91dGlsL2dldFNlbmRPcHRpb25zJztcbmltcG9ydCB7XG4gIGlzRGlyZWN0Q29udmVyc2F0aW9uLFxuICBpc0dyb3VwLFxuICBpc0dyb3VwVjIsXG59IGZyb20gJy4uLy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vLi4vcHJvdG9idWYnO1xuaW1wb3J0IHtcbiAgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzLFxuICBtYXliZUV4cGFuZEVycm9ycyxcbn0gZnJvbSAnLi9oYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMnO1xuaW1wb3J0IHsgb3VyUHJvZmlsZUtleVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vdXJQcm9maWxlS2V5JztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uUXVldWVKb2JCdW5kbGUsXG4gIFByb2ZpbGVLZXlKb2JEYXRhLFxufSBmcm9tICcuLi9jb252ZXJzYXRpb25Kb2JRdWV1ZSc7XG5pbXBvcnQgdHlwZSB7IENhbGxiYWNrUmVzdWx0VHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgeyBpc0NvbnZlcnNhdGlvbkFjY2VwdGVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvbkFjY2VwdGVkJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblVucmVnaXN0ZXJlZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQge1xuICBPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3IsXG4gIFNlbmRNZXNzYWdlQ2hhbGxlbmdlRXJyb3IsXG4gIFNlbmRNZXNzYWdlUHJvdG9FcnJvcixcbiAgVW5yZWdpc3RlcmVkVXNlckVycm9yLFxufSBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL0Vycm9ycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBjYW5BbGxFcnJvcnNCZUlnbm9yZWQoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIGVycm9yOiB1bmtub3duXG4pOiBib29sZWFuIHtcbiAgaWYgKFxuICAgIGVycm9yIGluc3RhbmNlb2YgT3V0Z29pbmdJZGVudGl0eUtleUVycm9yIHx8XG4gICAgZXJyb3IgaW5zdGFuY2VvZiBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yIHx8XG4gICAgZXJyb3IgaW5zdGFuY2VvZiBVbnJlZ2lzdGVyZWRVc2VyRXJyb3JcbiAgKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gQm9vbGVhbihcbiAgICBpc0dyb3VwKGNvbnZlcnNhdGlvbikgJiZcbiAgICAgIGVycm9yIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yICYmXG4gICAgICBlcnJvci5lcnJvcnM/LmV2ZXJ5KFxuICAgICAgICBpdGVtID0+XG4gICAgICAgICAgaXRlbSBpbnN0YW5jZW9mIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvciB8fFxuICAgICAgICAgIGl0ZW0gaW5zdGFuY2VvZiBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yIHx8XG4gICAgICAgICAgaXRlbSBpbnN0YW5jZW9mIFVucmVnaXN0ZXJlZFVzZXJFcnJvclxuICAgICAgKVxuICApO1xufVxuXG4vLyBOb3RlOiBiZWNhdXNlIHdlIGRvbid0IGhhdmUgYSByZWNpcGllbnQgbWFwLCB3ZSB3aWxsIHJlc2VuZCB0aGlzIG1lc3NhZ2UgdG8gZm9sa3MgdGhhdFxuLy8gICBnb3QgaXQgb24gdGhlIGZpcnN0IGdvLXJvdW5kLCBpZiBzb21lIHNlbmRzIGZhaWwuIFRoaXMgaXMgb2theSwgYmVjYXVzZSBhIHJlY2lwaWVudFxuLy8gICBnZXR0aW5nIHlvdXIgcHJvZmlsZUtleSBhZ2FpbiBpcyBqdXN0IGZpbmUuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFByb2ZpbGVLZXkoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gIHtcbiAgICBpc0ZpbmFsQXR0ZW1wdCxcbiAgICBtZXNzYWdpbmcsXG4gICAgc2hvdWxkQ29udGludWUsXG4gICAgdGltZXN0YW1wLFxuICAgIHRpbWVSZW1haW5pbmcsXG4gICAgbG9nLFxuICB9OiBDb252ZXJzYXRpb25RdWV1ZUpvYkJ1bmRsZSxcbiAgZGF0YTogUHJvZmlsZUtleUpvYkRhdGFcbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXNob3VsZENvbnRpbnVlKSB7XG4gICAgbG9nLmluZm8oJ1JhbiBvdXQgb2YgdGltZS4gR2l2aW5nIHVwIG9uIHNlbmRpbmcgcHJvZmlsZSBrZXknKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoIWNvbnZlcnNhdGlvbi5nZXQoJ3Byb2ZpbGVTaGFyaW5nJykpIHtcbiAgICBsb2cuaW5mbygnTm8gbG9uZ2VyIHNoYXJpbmcgcHJvZmlsZS4gQ2FuY2VsbGluZyBqb2IuJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcHJvZmlsZUtleSA9IGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLmdldCgpO1xuICBpZiAoIXByb2ZpbGVLZXkpIHtcbiAgICBsb2cuaW5mbygnVW5hYmxlIHRvIGZldGNoIHByb2ZpbGUuIENhbmNlbGxpbmcgam9iLicpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZy5pbmZvKFxuICAgIGBzdGFydGluZyBwcm9maWxlIGtleSBzaGFyZSB0byAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gd2l0aCB0aW1lc3RhbXAgJHt0aW1lc3RhbXB9YFxuICApO1xuXG4gIGNvbnN0IHsgcmV2aXNpb24gfSA9IGRhdGE7XG4gIGNvbnN0IHNlbmRPcHRpb25zID0gYXdhaXQgZ2V0U2VuZE9wdGlvbnMoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG4gIGNvbnN0IGNvbnRlbnRIaW50ID0gQ29udGVudEhpbnQuUkVTRU5EQUJMRTtcbiAgY29uc3Qgc2VuZFR5cGUgPSAncHJvZmlsZUtleVVwZGF0ZSc7XG5cbiAgbGV0IHNlbmRQcm9taXNlOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT47XG5cbiAgLy8gTm90ZTogZmxhZ3MgYW5kIHRoZSBwcm9maWxlS2V5IGl0c2VsZiBhcmUgYWxsIHRoYXQgbWF0dGVyIGluIHRoZSBwcm90by5cblxuICAvLyBOb3RlOiB3ZSBkb24ndCBjaGVjayBmb3IgdW50cnVzdGVkIGNvbnZlcnNhdGlvbnMgaGVyZTsgd2UgYXR0ZW1wdCB0byBzZW5kIGFueXdheVxuXG4gIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICBpZiAoIWlzQ29udmVyc2F0aW9uQWNjZXB0ZWQoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgbm90IGFjY2VwdGVkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgaWYgKGlzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIHVucmVnaXN0ZXJlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChjb252ZXJzYXRpb24uaXNCbG9ja2VkKCkpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBibG9ja2VkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwcm90byA9IGF3YWl0IG1lc3NhZ2luZy5nZXRDb250ZW50TWVzc2FnZSh7XG4gICAgICBmbGFnczogUHJvdG8uRGF0YU1lc3NhZ2UuRmxhZ3MuUFJPRklMRV9LRVlfVVBEQVRFLFxuICAgICAgcHJvZmlsZUtleSxcbiAgICAgIHJlY2lwaWVudHM6IGNvbnZlcnNhdGlvbi5nZXRSZWNpcGllbnRzKCksXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSk7XG4gICAgc2VuZFByb21pc2UgPSBtZXNzYWdpbmcuc2VuZEluZGl2aWR1YWxQcm90byh7XG4gICAgICBjb250ZW50SGludCxcbiAgICAgIGlkZW50aWZpZXI6IGNvbnZlcnNhdGlvbi5nZXRTZW5kVGFyZ2V0KCksXG4gICAgICBvcHRpb25zOiBzZW5kT3B0aW9ucyxcbiAgICAgIHByb3RvLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIGlmIChpc0dyb3VwVjIoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpICYmICFpc051bWJlcihyZXZpc2lvbikpIHtcbiAgICAgIGxvZy5lcnJvcignTm8gcmV2aXNpb24gcHJvdmlkZWQsIGJ1dCBjb252ZXJzYXRpb24gaXMgR3JvdXBWMicpO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwVjJJbmZvID0gY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKCk7XG4gICAgaWYgKGdyb3VwVjJJbmZvICYmIGlzTnVtYmVyKHJldmlzaW9uKSkge1xuICAgICAgZ3JvdXBWMkluZm8ucmV2aXNpb24gPSByZXZpc2lvbjtcbiAgICB9XG5cbiAgICBzZW5kUHJvbWlzZSA9IHdpbmRvdy5TaWduYWwuVXRpbC5zZW5kVG9Hcm91cCh7XG4gICAgICBjb250ZW50SGludCxcbiAgICAgIGdyb3VwU2VuZE9wdGlvbnM6IHtcbiAgICAgICAgZmxhZ3M6IFByb3RvLkRhdGFNZXNzYWdlLkZsYWdzLlBST0ZJTEVfS0VZX1VQREFURSxcbiAgICAgICAgZ3JvdXBWMTogY29udmVyc2F0aW9uLmdldEdyb3VwVjFJbmZvKCksXG4gICAgICAgIGdyb3VwVjI6IGdyb3VwVjJJbmZvLFxuICAgICAgICBwcm9maWxlS2V5LFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9LFxuICAgICAgbWVzc2FnZUlkOiB1bmRlZmluZWQsXG4gICAgICBzZW5kT3B0aW9ucyxcbiAgICAgIHNlbmRUYXJnZXQ6IGNvbnZlcnNhdGlvbi50b1NlbmRlcktleVRhcmdldCgpLFxuICAgICAgc2VuZFR5cGUsXG4gICAgfSk7XG4gIH1cblxuICB0cnkge1xuICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKHNlbmRQcm9taXNlLCB7XG4gICAgICBtZXNzYWdlSWRzOiBbXSxcbiAgICAgIHNlbmRUeXBlLFxuICAgIH0pO1xuICB9IGNhdGNoIChlcnJvcjogdW5rbm93bikge1xuICAgIGlmIChjYW5BbGxFcnJvcnNCZUlnbm9yZWQoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMsIGVycm9yKSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdHcm91cCBzZW5kIGZhaWx1cmVzIHdlcmUgYWxsIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvciwgU2VuZE1lc3NhZ2VDaGFsbGVuZ2VFcnJvciwgb3IgVW5yZWdpc3RlcmVkVXNlckVycm9yLiBSZXR1cm5pbmcgc3VjY2Nlc3NmdWxseS4nXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyh7XG4gICAgICBlcnJvcnM6IG1heWJlRXhwYW5kRXJyb3JzKGVycm9yKSxcbiAgICAgIGlzRmluYWxBdHRlbXB0LFxuICAgICAgbG9nLFxuICAgICAgdGltZVJlbWFpbmluZyxcbiAgICAgIHRvVGhyb3c6IGVycm9yLFxuICAgIH0pO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUI7QUFFekIsK0JBQWtDO0FBQ2xDLDRCQUErQjtBQUMvQixvQ0FJTztBQUNQLHNCQUF1QztBQUN2QyxzQ0FHTztBQUNQLDJCQUFxQztBQVFyQyxvQ0FBdUM7QUFDdkMsd0NBQTJDO0FBRTNDLG9CQUtPO0FBRUEsK0JBQ0wsY0FDQSxPQUNTO0FBQ1QsTUFDRSxpQkFBaUIsMENBQ2pCLGlCQUFpQiwyQ0FDakIsaUJBQWlCLHFDQUNqQjtBQUNBLFdBQU87QUFBQSxFQUNUO0FBRUEsU0FBTyxRQUNMLDJDQUFRLFlBQVksS0FDbEIsaUJBQWlCLHVDQUNqQixNQUFNLFFBQVEsTUFDWixVQUNFLGdCQUFnQiwwQ0FDaEIsZ0JBQWdCLDJDQUNoQixnQkFBZ0IsbUNBQ3BCLENBQ0o7QUFDRjtBQXRCZ0IsQUEyQmhCLDhCQUNFLGNBQ0E7QUFBQSxFQUNFO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUVGLE1BQ2U7QUFDZixNQUFJLENBQUMsZ0JBQWdCO0FBQ25CLFFBQUksS0FBSyxtREFBbUQ7QUFDNUQ7QUFB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
