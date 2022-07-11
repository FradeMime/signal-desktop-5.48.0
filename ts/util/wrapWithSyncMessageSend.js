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
var wrapWithSyncMessageSend_exports = {};
__export(wrapWithSyncMessageSend_exports, {
  wrapWithSyncMessageSend: () => wrapWithSyncMessageSend
});
module.exports = __toCommonJS(wrapWithSyncMessageSend_exports);
var log = __toESM(require("../logging/log"));
var import_Errors = require("../textsecure/Errors");
var import_getSendOptions = require("./getSendOptions");
var import_handleMessageSend = require("./handleMessageSend");
var import_areAllErrorsUnregistered = require("../jobs/helpers/areAllErrorsUnregistered");
async function wrapWithSyncMessageSend({
  conversation,
  logId,
  messageIds,
  send,
  sendType,
  timestamp
}) {
  const sender = window.textsecure.messaging;
  if (!sender) {
    throw new Error(`wrapWithSyncMessageSend/${logId}: textsecure.messaging is not available!`);
  }
  let response;
  let error;
  let didSuccessfullySendOne = false;
  try {
    response = await (0, import_handleMessageSend.handleMessageSend)(send(sender), { messageIds, sendType });
    didSuccessfullySendOne = true;
  } catch (thrown) {
    if (thrown instanceof import_Errors.SendMessageProtoError) {
      didSuccessfullySendOne = Boolean(thrown.successfulIdentifiers && thrown.successfulIdentifiers.length > 0);
      error = thrown;
    }
    if (thrown instanceof Error) {
      error = thrown;
    } else {
      log.error(`wrapWithSyncMessageSend/${logId}: Thrown value was not an Error, returning early`);
      throw error;
    }
  }
  if (!response && !error) {
    throw new Error(`wrapWithSyncMessageSend/${logId}: message send didn't return result or error!`);
  }
  const dataMessage = response?.dataMessage || (error instanceof import_Errors.SendMessageProtoError ? error.dataMessage : void 0);
  if (didSuccessfullySendOne) {
    if (!dataMessage) {
      log.error(`wrapWithSyncMessageSend/${logId}: dataMessage was not returned by send!`);
    } else {
      log.info(`wrapWithSyncMessageSend/${logId}: Sending sync message...`);
      const ourConversation = window.ConversationController.getOurConversationOrThrow();
      const options = await (0, import_getSendOptions.getSendOptions)(ourConversation.attributes, {
        syncMessage: true
      });
      await (0, import_handleMessageSend.handleMessageSend)(sender.sendSyncMessage({
        destination: conversation.get("e164"),
        destinationUuid: conversation.get("uuid"),
        encodedDataMessage: dataMessage,
        expirationStartTimestamp: null,
        options,
        timestamp
      }), { messageIds, sendType: sendType === "message" ? "sentSync" : sendType });
    }
  }
  if (error instanceof Error) {
    if ((0, import_areAllErrorsUnregistered.areAllErrorsUnregistered)(conversation.attributes, error)) {
      log.info(`wrapWithSyncMessageSend/${logId}: Group send failures were all UnregisteredUserError, returning succcessfully.`);
      return;
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  wrapWithSyncMessageSend
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxuaW1wb3J0IHsgU2VuZE1lc3NhZ2VQcm90b0Vycm9yIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgZ2V0U2VuZE9wdGlvbnMgfSBmcm9tICcuL2dldFNlbmRPcHRpb25zJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi9oYW5kbGVNZXNzYWdlU2VuZCc7XG5cbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2tSZXN1bHRUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFNlbmRUeXBlc1R5cGUgfSBmcm9tICcuL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB0eXBlIE1lc3NhZ2VTZW5kZXIgZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgeyBhcmVBbGxFcnJvcnNVbnJlZ2lzdGVyZWQgfSBmcm9tICcuLi9qb2JzL2hlbHBlcnMvYXJlQWxsRXJyb3JzVW5yZWdpc3RlcmVkJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyYXBXaXRoU3luY01lc3NhZ2VTZW5kKHtcbiAgY29udmVyc2F0aW9uLFxuICBsb2dJZCxcbiAgbWVzc2FnZUlkcyxcbiAgc2VuZCxcbiAgc2VuZFR5cGUsXG4gIHRpbWVzdGFtcCxcbn06IHtcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbDtcbiAgbG9nSWQ6IHN0cmluZztcbiAgbWVzc2FnZUlkczogQXJyYXk8c3RyaW5nPjtcbiAgc2VuZDogKHNlbmRlcjogTWVzc2FnZVNlbmRlcikgPT4gUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+O1xuICBzZW5kVHlwZTogU2VuZFR5cGVzVHlwZTtcbiAgdGltZXN0YW1wOiBudW1iZXI7XG59KTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHNlbmRlciA9IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZztcbiAgaWYgKCFzZW5kZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQvJHtsb2dJZH06IHRleHRzZWN1cmUubWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUhYFxuICAgICk7XG4gIH1cblxuICBsZXQgcmVzcG9uc2U6IENhbGxiYWNrUmVzdWx0VHlwZSB8IHVuZGVmaW5lZDtcbiAgbGV0IGVycm9yOiBFcnJvciB8IHVuZGVmaW5lZDtcbiAgbGV0IGRpZFN1Y2Nlc3NmdWxseVNlbmRPbmUgPSBmYWxzZTtcblxuICB0cnkge1xuICAgIHJlc3BvbnNlID0gYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoc2VuZChzZW5kZXIpLCB7IG1lc3NhZ2VJZHMsIHNlbmRUeXBlIH0pO1xuICAgIGRpZFN1Y2Nlc3NmdWxseVNlbmRPbmUgPSB0cnVlO1xuICB9IGNhdGNoICh0aHJvd24pIHtcbiAgICBpZiAodGhyb3duIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKSB7XG4gICAgICBkaWRTdWNjZXNzZnVsbHlTZW5kT25lID0gQm9vbGVhbihcbiAgICAgICAgdGhyb3duLnN1Y2Nlc3NmdWxJZGVudGlmaWVycyAmJiB0aHJvd24uc3VjY2Vzc2Z1bElkZW50aWZpZXJzLmxlbmd0aCA+IDBcbiAgICAgICk7XG4gICAgICBlcnJvciA9IHRocm93bjtcbiAgICB9XG4gICAgaWYgKHRocm93biBpbnN0YW5jZW9mIEVycm9yKSB7XG4gICAgICBlcnJvciA9IHRocm93bjtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQvJHtsb2dJZH06IFRocm93biB2YWx1ZSB3YXMgbm90IGFuIEVycm9yLCByZXR1cm5pbmcgZWFybHlgXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG5cbiAgaWYgKCFyZXNwb25zZSAmJiAhZXJyb3IpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQvJHtsb2dJZH06IG1lc3NhZ2Ugc2VuZCBkaWRuJ3QgcmV0dXJuIHJlc3VsdCBvciBlcnJvciFgXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGRhdGFNZXNzYWdlID1cbiAgICByZXNwb25zZT8uZGF0YU1lc3NhZ2UgfHxcbiAgICAoZXJyb3IgaW5zdGFuY2VvZiBTZW5kTWVzc2FnZVByb3RvRXJyb3IgPyBlcnJvci5kYXRhTWVzc2FnZSA6IHVuZGVmaW5lZCk7XG5cbiAgaWYgKGRpZFN1Y2Nlc3NmdWxseVNlbmRPbmUpIHtcbiAgICBpZiAoIWRhdGFNZXNzYWdlKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGB3cmFwV2l0aFN5bmNNZXNzYWdlU2VuZC8ke2xvZ0lkfTogZGF0YU1lc3NhZ2Ugd2FzIG5vdCByZXR1cm5lZCBieSBzZW5kIWBcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKGB3cmFwV2l0aFN5bmNNZXNzYWdlU2VuZC8ke2xvZ0lkfTogU2VuZGluZyBzeW5jIG1lc3NhZ2UuLi5gKTtcbiAgICAgIGNvbnN0IG91ckNvbnZlcnNhdGlvbiA9XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbk9yVGhyb3coKTtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhvdXJDb252ZXJzYXRpb24uYXR0cmlidXRlcywge1xuICAgICAgICBzeW5jTWVzc2FnZTogdHJ1ZSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICAgIHNlbmRlci5zZW5kU3luY01lc3NhZ2Uoe1xuICAgICAgICAgIGRlc3RpbmF0aW9uOiBjb252ZXJzYXRpb24uZ2V0KCdlMTY0JyksXG4gICAgICAgICAgZGVzdGluYXRpb25VdWlkOiBjb252ZXJzYXRpb24uZ2V0KCd1dWlkJyksXG4gICAgICAgICAgZW5jb2RlZERhdGFNZXNzYWdlOiBkYXRhTWVzc2FnZSxcbiAgICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IG51bGwsXG4gICAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIH0pLFxuICAgICAgICB7IG1lc3NhZ2VJZHMsIHNlbmRUeXBlOiBzZW5kVHlwZSA9PT0gJ21lc3NhZ2UnID8gJ3NlbnRTeW5jJyA6IHNlbmRUeXBlIH1cbiAgICAgICk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpIHtcbiAgICBpZiAoYXJlQWxsRXJyb3JzVW5yZWdpc3RlcmVkKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzLCBlcnJvcikpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQvJHtsb2dJZH06IEdyb3VwIHNlbmQgZmFpbHVyZXMgd2VyZSBhbGwgVW5yZWdpc3RlcmVkVXNlckVycm9yLCByZXR1cm5pbmcgc3VjY2Nlc3NmdWxseS5gXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHRocm93IGVycm9yO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsVUFBcUI7QUFFckIsb0JBQXNDO0FBQ3RDLDRCQUErQjtBQUMvQiwrQkFBa0M7QUFNbEMsc0NBQXlDO0FBRXpDLHVDQUE4QztBQUFBLEVBQzVDO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQVFnQjtBQUNoQixRQUFNLFNBQVMsT0FBTyxXQUFXO0FBQ2pDLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQ1IsMkJBQTJCLCtDQUM3QjtBQUFBLEVBQ0Y7QUFFQSxNQUFJO0FBQ0osTUFBSTtBQUNKLE1BQUkseUJBQXlCO0FBRTdCLE1BQUk7QUFDRixlQUFXLE1BQU0sZ0RBQWtCLEtBQUssTUFBTSxHQUFHLEVBQUUsWUFBWSxTQUFTLENBQUM7QUFDekUsNkJBQXlCO0FBQUEsRUFDM0IsU0FBUyxRQUFQO0FBQ0EsUUFBSSxrQkFBa0IscUNBQXVCO0FBQzNDLCtCQUF5QixRQUN2QixPQUFPLHlCQUF5QixPQUFPLHNCQUFzQixTQUFTLENBQ3hFO0FBQ0EsY0FBUTtBQUFBLElBQ1Y7QUFDQSxRQUFJLGtCQUFrQixPQUFPO0FBQzNCLGNBQVE7QUFBQSxJQUNWLE9BQU87QUFDTCxVQUFJLE1BQ0YsMkJBQTJCLHVEQUM3QjtBQUNBLFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUVBLE1BQUksQ0FBQyxZQUFZLENBQUMsT0FBTztBQUN2QixVQUFNLElBQUksTUFDUiwyQkFBMkIsb0RBQzdCO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FDSixVQUFVLGVBQ1Qsa0JBQWlCLHNDQUF3QixNQUFNLGNBQWM7QUFFaEUsTUFBSSx3QkFBd0I7QUFDMUIsUUFBSSxDQUFDLGFBQWE7QUFDaEIsVUFBSSxNQUNGLDJCQUEyQiw4Q0FDN0I7QUFBQSxJQUNGLE9BQU87QUFDTCxVQUFJLEtBQUssMkJBQTJCLGdDQUFnQztBQUNwRSxZQUFNLGtCQUNKLE9BQU8sdUJBQXVCLDBCQUEwQjtBQUMxRCxZQUFNLFVBQVUsTUFBTSwwQ0FBZSxnQkFBZ0IsWUFBWTtBQUFBLFFBQy9ELGFBQWE7QUFBQSxNQUNmLENBQUM7QUFDRCxZQUFNLGdEQUNKLE9BQU8sZ0JBQWdCO0FBQUEsUUFDckIsYUFBYSxhQUFhLElBQUksTUFBTTtBQUFBLFFBQ3BDLGlCQUFpQixhQUFhLElBQUksTUFBTTtBQUFBLFFBQ3hDLG9CQUFvQjtBQUFBLFFBQ3BCLDBCQUEwQjtBQUFBLFFBQzFCO0FBQUEsUUFDQTtBQUFBLE1BQ0YsQ0FBQyxHQUNELEVBQUUsWUFBWSxVQUFVLGFBQWEsWUFBWSxhQUFhLFNBQVMsQ0FDekU7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLE1BQUksaUJBQWlCLE9BQU87QUFDMUIsUUFBSSw4REFBeUIsYUFBYSxZQUFZLEtBQUssR0FBRztBQUM1RCxVQUFJLEtBQ0YsMkJBQTJCLHFGQUM3QjtBQUNBO0FBQUEsSUFDRjtBQUVBLFVBQU07QUFBQSxFQUNSO0FBQ0Y7QUE1RnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
