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
var sendDirectExpirationTimerUpdate_exports = {};
__export(sendDirectExpirationTimerUpdate_exports, {
  sendDirectExpirationTimerUpdate: () => sendDirectExpirationTimerUpdate
});
module.exports = __toCommonJS(sendDirectExpirationTimerUpdate_exports);
var import_getSendOptions = require("../../util/getSendOptions");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_protobuf = require("../../protobuf");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_wrapWithSyncMessageSend = require("../../util/wrapWithSyncMessageSend");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_handleMessageSend = require("../../util/handleMessageSend");
var import_isConversationAccepted = require("../../util/isConversationAccepted");
var import_isConversationUnregistered = require("../../util/isConversationUnregistered");
async function sendDirectExpirationTimerUpdate(conversation, {
  isFinalAttempt,
  messaging,
  shouldContinue,
  timeRemaining,
  timestamp,
  log
}, data) {
  if (!shouldContinue) {
    log.info("Ran out of time. Giving up on sending expiration timer update");
    return;
  }
  if (!(0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
    log.error(`Conversation ${conversation.idForLogging()} is not a 1:1 conversation; cancelling expiration timer job.`);
    return;
  }
  if (conversation.isUntrusted()) {
    const uuid = conversation.getCheckedUuid("Expiration timer send blocked: untrusted and missing uuid!").toString();
    window.reduxActions.conversations.conversationStoppedByMissingVerification({
      conversationId: conversation.id,
      untrustedUuids: [uuid]
    });
    throw new Error("Expiration timer send blocked because conversation is untrusted. Failing this attempt.");
  }
  log.info(`Starting expiration timer update for ${conversation.idForLogging()} with timestamp ${timestamp}`);
  const { expireTimer } = data;
  const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
  let profileKey;
  if (conversation.get("profileSharing")) {
    profileKey = await import_ourProfileKey.ourProfileKeyService.get();
  }
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const contentHint = ContentHint.RESENDABLE;
  const sendType = "expirationTimerUpdate";
  const flags = import_protobuf.SignalService.DataMessage.Flags.EXPIRATION_TIMER_UPDATE;
  const proto = await messaging.getContentMessage({
    expireTimer,
    flags,
    profileKey,
    recipients: conversation.getRecipients(),
    timestamp
  });
  if (!proto.dataMessage) {
    log.error("ContentMessage proto didn't have a data message; cancelling job.");
    return;
  }
  const logId = `expirationTimerUdate/${conversation.idForLogging()}`;
  try {
    if ((0, import_whatTypeOfConversation.isMe)(conversation.attributes)) {
      await (0, import_handleMessageSend.handleMessageSend)(messaging.sendSyncMessage({
        encodedDataMessage: import_protobuf.SignalService.DataMessage.encode(proto.dataMessage).finish(),
        destination: conversation.get("e164"),
        destinationUuid: conversation.get("uuid"),
        expirationStartTimestamp: null,
        options: sendOptions,
        timestamp
      }), { messageIds: [], sendType });
    } else if ((0, import_whatTypeOfConversation.isDirectConversation)(conversation.attributes)) {
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
      await (0, import_wrapWithSyncMessageSend.wrapWithSyncMessageSend)({
        conversation,
        logId,
        messageIds: [],
        send: async (sender) => sender.sendIndividualProto({
          contentHint,
          identifier: conversation.getSendTarget(),
          options: sendOptions,
          proto,
          timestamp
        }),
        sendType,
        timestamp
      });
    }
  } catch (error) {
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
  sendDirectExpirationTimerUpdate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZERpcmVjdEV4cGlyYXRpb25UaW1lclVwZGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBnZXRTZW5kT3B0aW9ucyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgaXNEaXJlY3RDb252ZXJzYXRpb24sIGlzTWUgfSBmcm9tICcuLi8uLi91dGlsL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB7XG4gIGhhbmRsZU11bHRpcGxlU2VuZEVycm9ycyxcbiAgbWF5YmVFeHBhbmRFcnJvcnMsXG59IGZyb20gJy4vaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzJztcbmltcG9ydCB7IHdyYXBXaXRoU3luY01lc3NhZ2VTZW5kIH0gZnJvbSAnLi4vLi4vdXRpbC93cmFwV2l0aFN5bmNNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBvdXJQcm9maWxlS2V5U2VydmljZSB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL291clByb2ZpbGVLZXknO1xuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vLi4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUge1xuICBFeHBpcmF0aW9uVGltZXJVcGRhdGVKb2JEYXRhLFxuICBDb252ZXJzYXRpb25RdWV1ZUpvYkJ1bmRsZSxcbn0gZnJvbSAnLi4vY29udmVyc2F0aW9uSm9iUXVldWUnO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuLi8uLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGlzQ29udmVyc2F0aW9uQWNjZXB0ZWQgfSBmcm9tICcuLi8uLi91dGlsL2lzQ29udmVyc2F0aW9uQWNjZXB0ZWQnO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQgfSBmcm9tICcuLi8uLi91dGlsL2lzQ29udmVyc2F0aW9uVW5yZWdpc3RlcmVkJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHNlbmREaXJlY3RFeHBpcmF0aW9uVGltZXJVcGRhdGUoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gIHtcbiAgICBpc0ZpbmFsQXR0ZW1wdCxcbiAgICBtZXNzYWdpbmcsXG4gICAgc2hvdWxkQ29udGludWUsXG4gICAgdGltZVJlbWFpbmluZyxcbiAgICB0aW1lc3RhbXAsXG4gICAgbG9nLFxuICB9OiBDb252ZXJzYXRpb25RdWV1ZUpvYkJ1bmRsZSxcbiAgZGF0YTogRXhwaXJhdGlvblRpbWVyVXBkYXRlSm9iRGF0YVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmICghc2hvdWxkQ29udGludWUpIHtcbiAgICBsb2cuaW5mbygnUmFuIG91dCBvZiB0aW1lLiBHaXZpbmcgdXAgb24gc2VuZGluZyBleHBpcmF0aW9uIHRpbWVyIHVwZGF0ZScpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghaXNEaXJlY3RDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYENvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgbm90IGEgMToxIGNvbnZlcnNhdGlvbjsgY2FuY2VsbGluZyBleHBpcmF0aW9uIHRpbWVyIGpvYi5gXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY29udmVyc2F0aW9uLmlzVW50cnVzdGVkKCkpIHtcbiAgICBjb25zdCB1dWlkID0gY29udmVyc2F0aW9uXG4gICAgICAuZ2V0Q2hlY2tlZFV1aWQoXG4gICAgICAgICdFeHBpcmF0aW9uIHRpbWVyIHNlbmQgYmxvY2tlZDogdW50cnVzdGVkIGFuZCBtaXNzaW5nIHV1aWQhJ1xuICAgICAgKVxuICAgICAgLnRvU3RyaW5nKCk7XG4gICAgd2luZG93LnJlZHV4QWN0aW9ucy5jb252ZXJzYXRpb25zLmNvbnZlcnNhdGlvblN0b3BwZWRCeU1pc3NpbmdWZXJpZmljYXRpb24oe1xuICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCxcbiAgICAgIHVudHJ1c3RlZFV1aWRzOiBbdXVpZF0sXG4gICAgfSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ0V4cGlyYXRpb24gdGltZXIgc2VuZCBibG9ja2VkIGJlY2F1c2UgY29udmVyc2F0aW9uIGlzIHVudHJ1c3RlZC4gRmFpbGluZyB0aGlzIGF0dGVtcHQuJ1xuICAgICk7XG4gIH1cblxuICBsb2cuaW5mbyhcbiAgICBgU3RhcnRpbmcgZXhwaXJhdGlvbiB0aW1lciB1cGRhdGUgZm9yICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSB3aXRoIHRpbWVzdGFtcCAke3RpbWVzdGFtcH1gXG4gICk7XG5cbiAgY29uc3QgeyBleHBpcmVUaW1lciB9ID0gZGF0YTtcblxuICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgbGV0IHByb2ZpbGVLZXk6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQ7XG4gIGlmIChjb252ZXJzYXRpb24uZ2V0KCdwcm9maWxlU2hhcmluZycpKSB7XG4gICAgcHJvZmlsZUtleSA9IGF3YWl0IG91clByb2ZpbGVLZXlTZXJ2aWNlLmdldCgpO1xuICB9XG5cbiAgY29uc3QgeyBDb250ZW50SGludCB9ID0gUHJvdG8uVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZS5NZXNzYWdlO1xuICBjb25zdCBjb250ZW50SGludCA9IENvbnRlbnRIaW50LlJFU0VOREFCTEU7XG5cbiAgY29uc3Qgc2VuZFR5cGUgPSAnZXhwaXJhdGlvblRpbWVyVXBkYXRlJztcbiAgY29uc3QgZmxhZ3MgPSBQcm90by5EYXRhTWVzc2FnZS5GbGFncy5FWFBJUkFUSU9OX1RJTUVSX1VQREFURTtcbiAgY29uc3QgcHJvdG8gPSBhd2FpdCBtZXNzYWdpbmcuZ2V0Q29udGVudE1lc3NhZ2Uoe1xuICAgIGV4cGlyZVRpbWVyLFxuICAgIGZsYWdzLFxuICAgIHByb2ZpbGVLZXksXG4gICAgcmVjaXBpZW50czogY29udmVyc2F0aW9uLmdldFJlY2lwaWVudHMoKSxcbiAgICB0aW1lc3RhbXAsXG4gIH0pO1xuXG4gIGlmICghcHJvdG8uZGF0YU1lc3NhZ2UpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBcIkNvbnRlbnRNZXNzYWdlIHByb3RvIGRpZG4ndCBoYXZlIGEgZGF0YSBtZXNzYWdlOyBjYW5jZWxsaW5nIGpvYi5cIlxuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbG9nSWQgPSBgZXhwaXJhdGlvblRpbWVyVWRhdGUvJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YDtcblxuICB0cnkge1xuICAgIGlmIChpc01lKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgICAgYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICAgIG1lc3NhZ2luZy5zZW5kU3luY01lc3NhZ2Uoe1xuICAgICAgICAgIGVuY29kZWREYXRhTWVzc2FnZTogUHJvdG8uRGF0YU1lc3NhZ2UuZW5jb2RlKFxuICAgICAgICAgICAgcHJvdG8uZGF0YU1lc3NhZ2VcbiAgICAgICAgICApLmZpbmlzaCgpLFxuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JyksXG4gICAgICAgICAgZGVzdGluYXRpb25VdWlkOiBjb252ZXJzYXRpb24uZ2V0KCd1dWlkJyksXG4gICAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wOiBudWxsLFxuICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgfSksXG4gICAgICAgIHsgbWVzc2FnZUlkczogW10sIHNlbmRUeXBlIH1cbiAgICAgICk7XG4gICAgfSBlbHNlIGlmIChpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgIGlmICghaXNDb252ZXJzYXRpb25BY2NlcHRlZChjb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgYGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgbm90IGFjY2VwdGVkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBpZiAoaXNDb252ZXJzYXRpb25VbnJlZ2lzdGVyZWQoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9IGlzIHVucmVnaXN0ZXJlZDsgcmVmdXNpbmcgdG8gc2VuZGBcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgaWYgKGNvbnZlcnNhdGlvbi5pc0Jsb2NrZWQoKSkge1xuICAgICAgICBsb2cuaW5mbyhcbiAgICAgICAgICBgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSBpcyBibG9ja2VkOyByZWZ1c2luZyB0byBzZW5kYFxuICAgICAgICApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGF3YWl0IHdyYXBXaXRoU3luY01lc3NhZ2VTZW5kKHtcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBsb2dJZCxcbiAgICAgICAgbWVzc2FnZUlkczogW10sXG4gICAgICAgIHNlbmQ6IGFzeW5jIHNlbmRlciA9PlxuICAgICAgICAgIHNlbmRlci5zZW5kSW5kaXZpZHVhbFByb3RvKHtcbiAgICAgICAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgICAgICAgaWRlbnRpZmllcjogY29udmVyc2F0aW9uLmdldFNlbmRUYXJnZXQoKSxcbiAgICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgICAgcHJvdG8sXG4gICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgfSksXG4gICAgICAgIHNlbmRUeXBlLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9KTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgYXdhaXQgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgIGVycm9yczogbWF5YmVFeHBhbmRFcnJvcnMoZXJyb3IpLFxuICAgICAgaXNGaW5hbEF0dGVtcHQsXG4gICAgICBsb2csXG4gICAgICB0aW1lUmVtYWluaW5nLFxuICAgICAgdG9UaHJvdzogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw0QkFBK0I7QUFDL0Isb0NBQTJDO0FBQzNDLHNCQUF1QztBQUN2QyxzQ0FHTztBQUNQLHFDQUF3QztBQUN4QywyQkFBcUM7QUFPckMsK0JBQWtDO0FBQ2xDLG9DQUF1QztBQUN2Qyx3Q0FBMkM7QUFFM0MsK0NBQ0UsY0FDQTtBQUFBLEVBQ0U7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBRUYsTUFDZTtBQUNmLE1BQUksQ0FBQyxnQkFBZ0I7QUFDbkIsUUFBSSxLQUFLLCtEQUErRDtBQUN4RTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLENBQUMsd0RBQXFCLGFBQWEsVUFBVSxHQUFHO0FBQ2xELFFBQUksTUFDRixnQkFBZ0IsYUFBYSxhQUFhLCtEQUM1QztBQUNBO0FBQUEsRUFDRjtBQUVBLE1BQUksYUFBYSxZQUFZLEdBQUc7QUFDOUIsVUFBTSxP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
