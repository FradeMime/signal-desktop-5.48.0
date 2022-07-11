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
var sendGroupUpdate_exports = {};
__export(sendGroupUpdate_exports, {
  sendGroupUpdate: () => sendGroupUpdate
});
module.exports = __toCommonJS(sendGroupUpdate_exports);
var import_getSendOptions = require("../../util/getSendOptions");
var import_whatTypeOfConversation = require("../../util/whatTypeOfConversation");
var import_protobuf = require("../../protobuf");
var import_handleMultipleSendErrors = require("./handleMultipleSendErrors");
var import_wrapWithSyncMessageSend = require("../../util/wrapWithSyncMessageSend");
var Bytes = __toESM(require("../../Bytes"));
var import_assert = require("../../util/assert");
var import_ourProfileKey = require("../../services/ourProfileKey");
var import_getUntrustedConversationUuids = require("./getUntrustedConversationUuids");
async function sendGroupUpdate(conversation, {
  isFinalAttempt,
  shouldContinue,
  timeRemaining,
  timestamp,
  log
}, data) {
  if (!shouldContinue) {
    log.info("Ran out of time. Giving up on sending group update");
    return;
  }
  if (!(0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
    log.error(`Conversation ${conversation.idForLogging()} is not GroupV2, cannot send group update!`);
    return;
  }
  log.info(`Starting group update for ${conversation.idForLogging()} with timestamp ${timestamp}`);
  const { groupChangeBase64, recipients, revision } = data;
  const untrustedUuids = (0, import_getUntrustedConversationUuids.getUntrustedConversationUuids)(recipients);
  if (untrustedUuids.length) {
    window.reduxActions.conversations.conversationStoppedByMissingVerification({
      conversationId: conversation.id,
      untrustedUuids
    });
    throw new Error(`Group update blocked because ${untrustedUuids.length} conversation(s) were untrusted. Failing this attempt.`);
  }
  const sendOptions = await (0, import_getSendOptions.getSendOptionsForRecipients)(recipients);
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const contentHint = ContentHint.RESENDABLE;
  const sendType = "groupChange";
  const logId = `sendGroupUpdate/${conversation.idForLogging()}`;
  const groupChange = groupChangeBase64 ? Bytes.fromBase64(groupChangeBase64) : void 0;
  let profileKey;
  if (conversation.get("profileSharing")) {
    profileKey = await import_ourProfileKey.ourProfileKeyService.get();
  }
  const groupV2Info = conversation.getGroupV2Info();
  (0, import_assert.strictAssert)(groupV2Info, "groupV2Info missing");
  const groupV2 = {
    ...groupV2Info,
    revision,
    members: recipients,
    groupChange
  };
  try {
    await conversation.queueJob("conversationQueue/sendGroupUpdate", async (abortSignal) => (0, import_wrapWithSyncMessageSend.wrapWithSyncMessageSend)({
      conversation,
      logId,
      messageIds: [],
      send: async () => window.Signal.Util.sendToGroup({
        abortSignal,
        groupSendOptions: {
          groupV2,
          timestamp,
          profileKey
        },
        contentHint,
        messageId: void 0,
        sendOptions,
        sendTarget: conversation.toSenderKeyTarget(),
        sendType
      }),
      sendType,
      timestamp
    }));
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
  sendGroupUpdate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZEdyb3VwVXBkYXRlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGdldFNlbmRPcHRpb25zRm9yUmVjaXBpZW50cyB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0U2VuZE9wdGlvbnMnO1xuaW1wb3J0IHsgaXNHcm91cFYyIH0gZnJvbSAnLi4vLi4vdXRpbC93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi8uLi9wcm90b2J1Zic7XG5pbXBvcnQge1xuICBoYW5kbGVNdWx0aXBsZVNlbmRFcnJvcnMsXG4gIG1heWJlRXhwYW5kRXJyb3JzLFxufSBmcm9tICcuL2hhbmRsZU11bHRpcGxlU2VuZEVycm9ycyc7XG5pbXBvcnQgeyB3cmFwV2l0aFN5bmNNZXNzYWdlU2VuZCB9IGZyb20gJy4uLy4uL3V0aWwvd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vLi4vQnl0ZXMnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgb3VyUHJvZmlsZUtleVNlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9vdXJQcm9maWxlS2V5JztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uLy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgR3JvdXBWMkluZm9UeXBlIH0gZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7XG4gIEdyb3VwVXBkYXRlSm9iRGF0YSxcbiAgQ29udmVyc2F0aW9uUXVldWVKb2JCdW5kbGUsXG59IGZyb20gJy4uL2NvbnZlcnNhdGlvbkpvYlF1ZXVlJztcbmltcG9ydCB7IGdldFVudHJ1c3RlZENvbnZlcnNhdGlvblV1aWRzIH0gZnJvbSAnLi9nZXRVbnRydXN0ZWRDb252ZXJzYXRpb25VdWlkcyc7XG5cbi8vIE5vdGU6IGJlY2F1c2Ugd2UgZG9uJ3QgaGF2ZSBhIHJlY2lwaWVudCBtYXAsIGlmIHNvbWUgc2VuZHMgZmFpbCwgd2Ugd2lsbCByZXNlbmQgdGhpc1xuLy8gICBtZXNzYWdlIHRvIGZvbGtzIHRoYXQgZ290IGl0IG9uIHRoZSBmaXJzdCBnby1yb3VuZC4gVGhpcyBpcyBva2F5LCBiZWNhdXNlIHJlY2VpdmVyc1xuLy8gICB3aWxsIGRyb3AgdGhpcyBhcyBhbiBlbXB0eSBtZXNzYWdlIGlmIHRoZXkgYWxyZWFkeSBrbm93IGFib3V0IGl0cyByZXZpc2lvbi5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzZW5kR3JvdXBVcGRhdGUoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsXG4gIHtcbiAgICBpc0ZpbmFsQXR0ZW1wdCxcbiAgICBzaG91bGRDb250aW51ZSxcbiAgICB0aW1lUmVtYWluaW5nLFxuICAgIHRpbWVzdGFtcCxcbiAgICBsb2csXG4gIH06IENvbnZlcnNhdGlvblF1ZXVlSm9iQnVuZGxlLFxuICBkYXRhOiBHcm91cFVwZGF0ZUpvYkRhdGFcbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIXNob3VsZENvbnRpbnVlKSB7XG4gICAgbG9nLmluZm8oJ1JhbiBvdXQgb2YgdGltZS4gR2l2aW5nIHVwIG9uIHNlbmRpbmcgZ3JvdXAgdXBkYXRlJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFpc0dyb3VwVjIoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYENvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaXMgbm90IEdyb3VwVjIsIGNhbm5vdCBzZW5kIGdyb3VwIHVwZGF0ZSFgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2cuaW5mbyhcbiAgICBgU3RhcnRpbmcgZ3JvdXAgdXBkYXRlIGZvciAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gd2l0aCB0aW1lc3RhbXAgJHt0aW1lc3RhbXB9YFxuICApO1xuXG4gIGNvbnN0IHsgZ3JvdXBDaGFuZ2VCYXNlNjQsIHJlY2lwaWVudHMsIHJldmlzaW9uIH0gPSBkYXRhO1xuXG4gIGNvbnN0IHVudHJ1c3RlZFV1aWRzID0gZ2V0VW50cnVzdGVkQ29udmVyc2F0aW9uVXVpZHMocmVjaXBpZW50cyk7XG4gIGlmICh1bnRydXN0ZWRVdWlkcy5sZW5ndGgpIHtcbiAgICB3aW5kb3cucmVkdXhBY3Rpb25zLmNvbnZlcnNhdGlvbnMuY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbih7XG4gICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgdW50cnVzdGVkVXVpZHMsXG4gICAgfSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYEdyb3VwIHVwZGF0ZSBibG9ja2VkIGJlY2F1c2UgJHt1bnRydXN0ZWRVdWlkcy5sZW5ndGh9IGNvbnZlcnNhdGlvbihzKSB3ZXJlIHVudHJ1c3RlZC4gRmFpbGluZyB0aGlzIGF0dGVtcHQuYFxuICAgICk7XG4gIH1cblxuICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zRm9yUmVjaXBpZW50cyhyZWNpcGllbnRzKTtcblxuICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG4gIGNvbnN0IGNvbnRlbnRIaW50ID0gQ29udGVudEhpbnQuUkVTRU5EQUJMRTtcbiAgY29uc3Qgc2VuZFR5cGUgPSAnZ3JvdXBDaGFuZ2UnO1xuICBjb25zdCBsb2dJZCA9IGBzZW5kR3JvdXBVcGRhdGUvJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YDtcblxuICBjb25zdCBncm91cENoYW5nZSA9IGdyb3VwQ2hhbmdlQmFzZTY0XG4gICAgPyBCeXRlcy5mcm9tQmFzZTY0KGdyb3VwQ2hhbmdlQmFzZTY0KVxuICAgIDogdW5kZWZpbmVkO1xuXG4gIGxldCBwcm9maWxlS2V5OiBVaW50OEFycmF5IHwgdW5kZWZpbmVkO1xuICBpZiAoY29udmVyc2F0aW9uLmdldCgncHJvZmlsZVNoYXJpbmcnKSkge1xuICAgIHByb2ZpbGVLZXkgPSBhd2FpdCBvdXJQcm9maWxlS2V5U2VydmljZS5nZXQoKTtcbiAgfVxuXG4gIGNvbnN0IGdyb3VwVjJJbmZvID0gY29udmVyc2F0aW9uLmdldEdyb3VwVjJJbmZvKCk7XG4gIHN0cmljdEFzc2VydChncm91cFYySW5mbywgJ2dyb3VwVjJJbmZvIG1pc3NpbmcnKTtcbiAgY29uc3QgZ3JvdXBWMjogR3JvdXBWMkluZm9UeXBlID0ge1xuICAgIC4uLmdyb3VwVjJJbmZvLFxuICAgIHJldmlzaW9uLFxuICAgIG1lbWJlcnM6IHJlY2lwaWVudHMsXG4gICAgZ3JvdXBDaGFuZ2UsXG4gIH07XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBjb252ZXJzYXRpb24ucXVldWVKb2IoXG4gICAgICAnY29udmVyc2F0aW9uUXVldWUvc2VuZEdyb3VwVXBkYXRlJyxcbiAgICAgIGFzeW5jIGFib3J0U2lnbmFsID0+XG4gICAgICAgIHdyYXBXaXRoU3luY01lc3NhZ2VTZW5kKHtcbiAgICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgICAgbG9nSWQsXG4gICAgICAgICAgbWVzc2FnZUlkczogW10sXG4gICAgICAgICAgc2VuZDogYXN5bmMgKCkgPT5cbiAgICAgICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5zZW5kVG9Hcm91cCh7XG4gICAgICAgICAgICAgIGFib3J0U2lnbmFsLFxuICAgICAgICAgICAgICBncm91cFNlbmRPcHRpb25zOiB7XG4gICAgICAgICAgICAgICAgZ3JvdXBWMixcbiAgICAgICAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgICAgICAgcHJvZmlsZUtleSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZDogdW5kZWZpbmVkLFxuICAgICAgICAgICAgICBzZW5kT3B0aW9ucyxcbiAgICAgICAgICAgICAgc2VuZFRhcmdldDogY29udmVyc2F0aW9uLnRvU2VuZGVyS2V5VGFyZ2V0KCksXG4gICAgICAgICAgICAgIHNlbmRUeXBlLFxuICAgICAgICAgICAgfSksXG4gICAgICAgICAgc2VuZFR5cGUsXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB9KVxuICAgICk7XG4gIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgYXdhaXQgaGFuZGxlTXVsdGlwbGVTZW5kRXJyb3JzKHtcbiAgICAgIGVycm9yczogbWF5YmVFeHBhbmRFcnJvcnMoZXJyb3IpLFxuICAgICAgaXNGaW5hbEF0dGVtcHQsXG4gICAgICBsb2csXG4gICAgICB0aW1lUmVtYWluaW5nLFxuICAgICAgdG9UaHJvdzogZXJyb3IsXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw0QkFBNEM7QUFDNUMsb0NBQTBCO0FBQzFCLHNCQUF1QztBQUN2QyxzQ0FHTztBQUNQLHFDQUF3QztBQUN4QyxZQUF1QjtBQUN2QixvQkFBNkI7QUFDN0IsMkJBQXFDO0FBUXJDLDJDQUE4QztBQUs5QywrQkFDRSxjQUNBO0FBQUEsRUFDRTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUVGLE1BQ2U7QUFDZixNQUFJLENBQUMsZ0JBQWdCO0FBQ25CLFFBQUksS0FBSyxvREFBb0Q7QUFDN0Q7QUFBQSxFQUNGO0FBRUEsTUFBSSxDQUFDLDZDQUFVLGFBQWEsVUFBVSxHQUFHO0FBQ3ZDLFFBQUksTUFDRixnQkFBZ0IsYUFBYSxhQUFhLDZDQUM1QztBQUNBO0FBQUEsRUFDRjtBQUVBLE1BQUksS0FDRiw2QkFBNkIsYUFBYSxhQUFhLG9CQUFvQixXQUM3RTtBQUVBLFFBQU0sRUFBRSxtQkFBbUIsWUFBWSxhQUFhO0FBRXBELFFBQU0saUJBQWlCLHdFQUE4QixVQUFVO0FBQy9ELE1BQUksZUFBZSxRQUFRO0FBQ3pCLFdBQU8sYUFBYSxjQUFjLHlDQUF5QztBQUFBLE1BQ3pFLGdCQUFnQixhQUFhO0FBQUEsTUFDN0I7QUFBQSxJQUNGLENBQUM7QUFDRCxVQUFNLElBQUksTUFDUixnQ0FBZ0MsZUFBZSw4REFDakQ7QUFBQSxFQUNGO0FBRUEsUUFBTSxjQUFjLE1BQU0sdURBQTRCLFVBQVU7QUFFaEUsUUFBTSxFQUFFLGdCQUFnQiw4QkFBTSwwQkFBMEI7QUFDeEQsUUFBTSxjQUFjLFlBQVk7QUFDaEMsUUFBTSxXQUFXO0FBQ2pCLFFBQU0sUUFBUSxtQkFBbUIsYUFBYSxhQUFhO0FBRTNELFFBQU0sY0FBYyxvQkFDaEIsTUFBTSxXQUFXLGlCQUFpQixJQUNsQztBQUVKLE1BQUk7QUFDSixNQUFJLGFBQWEsSUFBSSxnQkFBZ0IsR0FBRztBQUN0QyxpQkFBYSxNQUFNLDBDQUFxQixJQUFJO0FBQUEsRUFDOUM7QUFFQSxRQUFNLGNBQWMsYUFBYSxlQUFlO0FBQ2hELGtDQUFhLGFBQWEscUJBQXFCO0FBQy9DLFFBQU0sVUFBMkI7QUFBQSxPQUM1QjtBQUFBLElBQ0g7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLE1BQUk7QUFDRixVQUFNLGFBQWEsU0FDakIscUNBQ0EsT0FBTSxnQkFDSiw0REFBd0I7QUFBQSxNQUN0QjtBQUFBLE1BQ0E7QUFBQSxNQUNBLFlBQVksQ0FBQztBQUFBLE1BQ2IsTUFBTSxZQUNKLE9BQU8sT0FBTyxLQUFLLFlBQVk7QUFBQSxRQUM3QjtBQUFBLFFBQ0Esa0JBQWtCO0FBQUEsVUFDaEI7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBO0FBQUEsUUFDQSxXQUFXO0FBQUEsUUFDWDtBQUFBLFFBQ0EsWUFBWSxhQUFhLGtCQUFrQjtBQUFBLFFBQzNDO0FBQUEsTUFDRixDQUFDO0FBQUEsTUFDSDtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUMsQ0FDTDtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsVUFBTSw4REFBeUI7QUFBQSxNQUM3QixRQUFRLHVEQUFrQixLQUFLO0FBQUEsTUFDL0I7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0EsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQXBHc0IiLAogICJuYW1lcyI6IFtdCn0K
