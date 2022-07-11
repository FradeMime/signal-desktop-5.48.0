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
var handleMessageSend_exports = {};
__export(handleMessageSend_exports, {
  handleMessageSend: () => handleMessageSend,
  sendTypesEnum: () => sendTypesEnum,
  shouldSaveProto: () => shouldSaveProto
});
module.exports = __toCommonJS(handleMessageSend_exports);
var import_zod = require("zod");
var import_lodash = require("lodash");
var import_Client = __toESM(require("../sql/Client"));
var log = __toESM(require("../logging/log"));
var import_Errors = require("../textsecure/Errors");
var import_SealedSender = require("../types/SealedSender");
const { insertSentProto, updateConversation } = import_Client.default;
const sendTypesEnum = import_zod.z.enum([
  "blockSyncRequest",
  "pniIdentitySyncRequest",
  "callingMessage",
  "configurationSyncRequest",
  "contactSyncRequest",
  "deleteForEveryone",
  "deliveryReceipt",
  "expirationTimerUpdate",
  "fetchLatestManifestSync",
  "fetchLocalProfileSync",
  "groupChange",
  "groupSyncRequest",
  "keySyncRequest",
  "legacyGroupChange",
  "message",
  "messageRequestSync",
  "nullMessage",
  "profileKeyUpdate",
  "reaction",
  "readReceipt",
  "readSync",
  "resendFromLog",
  "resetSession",
  "retryRequest",
  "senderKeyDistributionMessage",
  "sentSync",
  "stickerPackSync",
  "typing",
  "verificationSync",
  "viewOnceSync",
  "viewSync",
  "viewedReceipt"
]);
function shouldSaveProto(sendType) {
  if (sendType === "callingMessage") {
    return false;
  }
  if (sendType === "resendFromLog") {
    return false;
  }
  if (sendType === "retryRequest") {
    return false;
  }
  if (sendType === "typing") {
    return false;
  }
  return true;
}
function processError(error) {
  if (error instanceof import_Errors.OutgoingMessageError || error instanceof import_Errors.SendMessageNetworkError) {
    const conversation = window.ConversationController.getOrCreate(error.identifier, "private");
    if (error.code === 401 || error.code === 403) {
      if (conversation.get("sealedSender") === import_SealedSender.SEALED_SENDER.ENABLED || conversation.get("sealedSender") === import_SealedSender.SEALED_SENDER.UNRESTRICTED) {
        log.warn(`handleMessageSend: Got 401/403 for ${conversation.idForLogging()}, removing profile key`);
        conversation.setProfileKey(void 0);
      }
      if (conversation.get("sealedSender") === import_SealedSender.SEALED_SENDER.UNKNOWN) {
        log.warn(`handleMessageSend: Got 401/403 for ${conversation.idForLogging()}, setting sealedSender = DISABLED`);
        conversation.set("sealedSender", import_SealedSender.SEALED_SENDER.DISABLED);
        updateConversation(conversation.attributes);
      }
    }
    if (error.code === 404) {
      log.warn(`handleMessageSend: Got 404 for ${conversation.idForLogging()}, marking unregistered.`);
      conversation.setUnregistered();
    }
  }
  if (error instanceof import_Errors.UnregisteredUserError) {
    const conversation = window.ConversationController.getOrCreate(error.identifier, "private");
    log.warn(`handleMessageSend: Got 404 for ${conversation.idForLogging()}, marking unregistered.`);
    conversation.setUnregistered();
  }
}
async function handleMessageSend(promise, options) {
  try {
    const result = await promise;
    await maybeSaveToSendLog(result, options);
    await handleMessageSendResult(result.failoverIdentifiers, result.unidentifiedDeliveries);
    return result;
  } catch (err) {
    processError(err);
    if (err instanceof import_Errors.SendMessageProtoError) {
      await handleMessageSendResult(err.failoverIdentifiers, err.unidentifiedDeliveries);
      err.errors?.forEach(processError);
    }
    throw err;
  }
}
async function handleMessageSendResult(failoverIdentifiers, unidentifiedDeliveries) {
  await Promise.all((failoverIdentifiers || []).map(async (identifier) => {
    const conversation = window.ConversationController.get(identifier);
    if (conversation && conversation.get("sealedSender") !== import_SealedSender.SEALED_SENDER.DISABLED) {
      log.info(`Setting sealedSender to DISABLED for conversation ${conversation.idForLogging()}`);
      conversation.set({
        sealedSender: import_SealedSender.SEALED_SENDER.DISABLED
      });
      window.Signal.Data.updateConversation(conversation.attributes);
    }
  }));
  await Promise.all((unidentifiedDeliveries || []).map(async (identifier) => {
    const conversation = window.ConversationController.get(identifier);
    if (conversation && conversation.get("sealedSender") === import_SealedSender.SEALED_SENDER.UNKNOWN) {
      if (conversation.get("accessKey")) {
        log.info(`Setting sealedSender to ENABLED for conversation ${conversation.idForLogging()}`);
        conversation.set({
          sealedSender: import_SealedSender.SEALED_SENDER.ENABLED
        });
      } else {
        log.info(`Setting sealedSender to UNRESTRICTED for conversation ${conversation.idForLogging()}`);
        conversation.set({
          sealedSender: import_SealedSender.SEALED_SENDER.UNRESTRICTED
        });
      }
      window.Signal.Data.updateConversation(conversation.attributes);
    }
  }));
}
async function maybeSaveToSendLog(result, {
  messageIds,
  sendType
}) {
  const { contentHint, contentProto, recipients, timestamp } = result;
  if (!shouldSaveProto(sendType)) {
    return;
  }
  if (!(0, import_lodash.isNumber)(contentHint) || !contentProto || !recipients || !timestamp) {
    log.warn(`handleMessageSend: Missing necessary information to save to log for ${sendType} message ${timestamp}`);
    return;
  }
  const identifiers = Object.keys(recipients);
  if (identifiers.length === 0) {
    log.warn(`handleMessageSend: ${sendType} message ${timestamp} had no recipients`);
    return;
  }
  if (identifiers.length > 1) {
    return;
  }
  await insertSentProto({
    timestamp,
    proto: Buffer.from(contentProto),
    contentHint
  }, {
    messageIds,
    recipients
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleMessageSend,
  sendTypesEnum,
  shouldSaveProto
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlTWVzc2FnZVNlbmQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2tSZXN1bHRUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7XG4gIE91dGdvaW5nTWVzc2FnZUVycm9yLFxuICBTZW5kTWVzc2FnZU5ldHdvcmtFcnJvcixcbiAgU2VuZE1lc3NhZ2VQcm90b0Vycm9yLFxuICBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IsXG59IGZyb20gJy4uL3RleHRzZWN1cmUvRXJyb3JzJztcbmltcG9ydCB7IFNFQUxFRF9TRU5ERVIgfSBmcm9tICcuLi90eXBlcy9TZWFsZWRTZW5kZXInO1xuXG5jb25zdCB7IGluc2VydFNlbnRQcm90bywgdXBkYXRlQ29udmVyc2F0aW9uIH0gPSBkYXRhSW50ZXJmYWNlO1xuXG5leHBvcnQgY29uc3Qgc2VuZFR5cGVzRW51bSA9IHouZW51bShbXG4gICdibG9ja1N5bmNSZXF1ZXN0JyxcbiAgJ3BuaUlkZW50aXR5U3luY1JlcXVlc3QnLFxuICAnY2FsbGluZ01lc3NhZ2UnLCAvLyBleGNsdWRlZCBmcm9tIHNlbmQgbG9nXG4gICdjb25maWd1cmF0aW9uU3luY1JlcXVlc3QnLFxuICAnY29udGFjdFN5bmNSZXF1ZXN0JyxcbiAgJ2RlbGV0ZUZvckV2ZXJ5b25lJyxcbiAgJ2RlbGl2ZXJ5UmVjZWlwdCcsXG4gICdleHBpcmF0aW9uVGltZXJVcGRhdGUnLFxuICAnZmV0Y2hMYXRlc3RNYW5pZmVzdFN5bmMnLFxuICAnZmV0Y2hMb2NhbFByb2ZpbGVTeW5jJyxcbiAgJ2dyb3VwQ2hhbmdlJyxcbiAgJ2dyb3VwU3luY1JlcXVlc3QnLFxuICAna2V5U3luY1JlcXVlc3QnLFxuICAnbGVnYWN5R3JvdXBDaGFuZ2UnLFxuICAnbWVzc2FnZScsXG4gICdtZXNzYWdlUmVxdWVzdFN5bmMnLFxuICAnbnVsbE1lc3NhZ2UnLFxuICAncHJvZmlsZUtleVVwZGF0ZScsXG4gICdyZWFjdGlvbicsXG4gICdyZWFkUmVjZWlwdCcsXG4gICdyZWFkU3luYycsXG4gICdyZXNlbmRGcm9tTG9nJywgLy8gZXhjbHVkZWQgZnJvbSBzZW5kIGxvZ1xuICAncmVzZXRTZXNzaW9uJyxcbiAgJ3JldHJ5UmVxdWVzdCcsIC8vIGV4Y2x1ZGVkIGZyb20gc2VuZCBsb2dcbiAgJ3NlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UnLFxuICAnc2VudFN5bmMnLFxuICAnc3RpY2tlclBhY2tTeW5jJyxcbiAgJ3R5cGluZycsIC8vIGV4Y2x1ZGVkIGZyb20gc2VuZCBsb2dcbiAgJ3ZlcmlmaWNhdGlvblN5bmMnLFxuICAndmlld09uY2VTeW5jJyxcbiAgJ3ZpZXdTeW5jJyxcbiAgJ3ZpZXdlZFJlY2VpcHQnLFxuXSk7XG5cbmV4cG9ydCB0eXBlIFNlbmRUeXBlc1R5cGUgPSB6LmluZmVyPHR5cGVvZiBzZW5kVHlwZXNFbnVtPjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFNhdmVQcm90byhzZW5kVHlwZTogU2VuZFR5cGVzVHlwZSk6IGJvb2xlYW4ge1xuICBpZiAoc2VuZFR5cGUgPT09ICdjYWxsaW5nTWVzc2FnZScpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2VuZFR5cGUgPT09ICdyZXNlbmRGcm9tTG9nJykge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmIChzZW5kVHlwZSA9PT0gJ3JldHJ5UmVxdWVzdCcpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoc2VuZFR5cGUgPT09ICd0eXBpbmcnKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHByb2Nlc3NFcnJvcihlcnJvcjogdW5rbm93bik6IHZvaWQge1xuICBpZiAoXG4gICAgZXJyb3IgaW5zdGFuY2VvZiBPdXRnb2luZ01lc3NhZ2VFcnJvciB8fFxuICAgIGVycm9yIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VOZXR3b3JrRXJyb3JcbiAgKSB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoXG4gICAgICBlcnJvci5pZGVudGlmaWVyLFxuICAgICAgJ3ByaXZhdGUnXG4gICAgKTtcbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDAxIHx8IGVycm9yLmNvZGUgPT09IDQwMykge1xuICAgICAgaWYgKFxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdzZWFsZWRTZW5kZXInKSA9PT0gU0VBTEVEX1NFTkRFUi5FTkFCTEVEIHx8XG4gICAgICAgIGNvbnZlcnNhdGlvbi5nZXQoJ3NlYWxlZFNlbmRlcicpID09PSBTRUFMRURfU0VOREVSLlVOUkVTVFJJQ1RFRFxuICAgICAgKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBoYW5kbGVNZXNzYWdlU2VuZDogR290IDQwMS80MDMgZm9yICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSwgcmVtb3ZpbmcgcHJvZmlsZSBrZXlgXG4gICAgICAgICk7XG5cbiAgICAgICAgY29udmVyc2F0aW9uLnNldFByb2ZpbGVLZXkodW5kZWZpbmVkKTtcbiAgICAgIH1cbiAgICAgIGlmIChjb252ZXJzYXRpb24uZ2V0KCdzZWFsZWRTZW5kZXInKSA9PT0gU0VBTEVEX1NFTkRFUi5VTktOT1dOKSB7XG4gICAgICAgIGxvZy53YXJuKFxuICAgICAgICAgIGBoYW5kbGVNZXNzYWdlU2VuZDogR290IDQwMS80MDMgZm9yICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSwgc2V0dGluZyBzZWFsZWRTZW5kZXIgPSBESVNBQkxFRGBcbiAgICAgICAgKTtcbiAgICAgICAgY29udmVyc2F0aW9uLnNldCgnc2VhbGVkU2VuZGVyJywgU0VBTEVEX1NFTkRFUi5ESVNBQkxFRCk7XG4gICAgICAgIHVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmIChlcnJvci5jb2RlID09PSA0MDQpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgaGFuZGxlTWVzc2FnZVNlbmQ6IEdvdCA0MDQgZm9yICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfSwgbWFya2luZyB1bnJlZ2lzdGVyZWQuYFxuICAgICAgKTtcbiAgICAgIGNvbnZlcnNhdGlvbi5zZXRVbnJlZ2lzdGVyZWQoKTtcbiAgICB9XG4gIH1cbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgVW5yZWdpc3RlcmVkVXNlckVycm9yKSB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoXG4gICAgICBlcnJvci5pZGVudGlmaWVyLFxuICAgICAgJ3ByaXZhdGUnXG4gICAgKTtcbiAgICBsb2cud2FybihcbiAgICAgIGBoYW5kbGVNZXNzYWdlU2VuZDogR290IDQwNCBmb3IgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9LCBtYXJraW5nIHVucmVnaXN0ZXJlZC5gXG4gICAgKTtcbiAgICBjb252ZXJzYXRpb24uc2V0VW5yZWdpc3RlcmVkKCk7XG4gIH1cbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGhhbmRsZU1lc3NhZ2VTZW5kKFxuICBwcm9taXNlOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4sXG4gIG9wdGlvbnM6IHtcbiAgICBtZXNzYWdlSWRzOiBBcnJheTxzdHJpbmc+O1xuICAgIHNlbmRUeXBlOiBTZW5kVHlwZXNUeXBlO1xuICB9XG4pOiBQcm9taXNlPENhbGxiYWNrUmVzdWx0VHlwZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHByb21pc2U7XG5cbiAgICBhd2FpdCBtYXliZVNhdmVUb1NlbmRMb2cocmVzdWx0LCBvcHRpb25zKTtcblxuICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kUmVzdWx0KFxuICAgICAgcmVzdWx0LmZhaWxvdmVySWRlbnRpZmllcnMsXG4gICAgICByZXN1bHQudW5pZGVudGlmaWVkRGVsaXZlcmllc1xuICAgICk7XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBwcm9jZXNzRXJyb3IoZXJyKTtcblxuICAgIGlmIChlcnIgaW5zdGFuY2VvZiBTZW5kTWVzc2FnZVByb3RvRXJyb3IpIHtcbiAgICAgIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kUmVzdWx0KFxuICAgICAgICBlcnIuZmFpbG92ZXJJZGVudGlmaWVycyxcbiAgICAgICAgZXJyLnVuaWRlbnRpZmllZERlbGl2ZXJpZXNcbiAgICAgICk7XG5cbiAgICAgIGVyci5lcnJvcnM/LmZvckVhY2gocHJvY2Vzc0Vycm9yKTtcbiAgICB9XG5cbiAgICB0aHJvdyBlcnI7XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlTWVzc2FnZVNlbmRSZXN1bHQoXG4gIGZhaWxvdmVySWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz4gfCB1bmRlZmluZWQsXG4gIHVuaWRlbnRpZmllZERlbGl2ZXJpZXM6IEFycmF5PHN0cmluZz4gfCB1bmRlZmluZWRcbik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAoZmFpbG92ZXJJZGVudGlmaWVycyB8fCBbXSkubWFwKGFzeW5jIGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdzZWFsZWRTZW5kZXInKSAhPT0gU0VBTEVEX1NFTkRFUi5ESVNBQkxFRFxuICAgICAgKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBTZXR0aW5nIHNlYWxlZFNlbmRlciB0byBESVNBQkxFRCBmb3IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgKTtcbiAgICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLkRJU0FCTEVELFxuICAgICAgICB9KTtcbiAgICAgICAgd2luZG93LlNpZ25hbC5EYXRhLnVwZGF0ZUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgICB9XG4gICAgfSlcbiAgKTtcblxuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICAodW5pZGVudGlmaWVkRGVsaXZlcmllcyB8fCBbXSkubWFwKGFzeW5jIGlkZW50aWZpZXIgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpO1xuXG4gICAgICBpZiAoXG4gICAgICAgIGNvbnZlcnNhdGlvbiAmJlxuICAgICAgICBjb252ZXJzYXRpb24uZ2V0KCdzZWFsZWRTZW5kZXInKSA9PT0gU0VBTEVEX1NFTkRFUi5VTktOT1dOXG4gICAgICApIHtcbiAgICAgICAgaWYgKGNvbnZlcnNhdGlvbi5nZXQoJ2FjY2Vzc0tleScpKSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgU2V0dGluZyBzZWFsZWRTZW5kZXIgdG8gRU5BQkxFRCBmb3IgY29udmVyc2F0aW9uICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnZlcnNhdGlvbi5zZXQoe1xuICAgICAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLkVOQUJMRUQsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLmluZm8oXG4gICAgICAgICAgICBgU2V0dGluZyBzZWFsZWRTZW5kZXIgdG8gVU5SRVNUUklDVEVEIGZvciBjb252ZXJzYXRpb24gJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgICAgICk7XG4gICAgICAgICAgY29udmVyc2F0aW9uLnNldCh7XG4gICAgICAgICAgICBzZWFsZWRTZW5kZXI6IFNFQUxFRF9TRU5ERVIuVU5SRVNUUklDVEVELFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24oY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgICAgfVxuICAgIH0pXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1heWJlU2F2ZVRvU2VuZExvZyhcbiAgcmVzdWx0OiBDYWxsYmFja1Jlc3VsdFR5cGUsXG4gIHtcbiAgICBtZXNzYWdlSWRzLFxuICAgIHNlbmRUeXBlLFxuICB9OiB7XG4gICAgbWVzc2FnZUlkczogQXJyYXk8c3RyaW5nPjtcbiAgICBzZW5kVHlwZTogU2VuZFR5cGVzVHlwZTtcbiAgfVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHsgY29udGVudEhpbnQsIGNvbnRlbnRQcm90bywgcmVjaXBpZW50cywgdGltZXN0YW1wIH0gPSByZXN1bHQ7XG5cbiAgaWYgKCFzaG91bGRTYXZlUHJvdG8oc2VuZFR5cGUpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKCFpc051bWJlcihjb250ZW50SGludCkgfHwgIWNvbnRlbnRQcm90byB8fCAhcmVjaXBpZW50cyB8fCAhdGltZXN0YW1wKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgaGFuZGxlTWVzc2FnZVNlbmQ6IE1pc3NpbmcgbmVjZXNzYXJ5IGluZm9ybWF0aW9uIHRvIHNhdmUgdG8gbG9nIGZvciAke3NlbmRUeXBlfSBtZXNzYWdlICR7dGltZXN0YW1wfWBcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGlkZW50aWZpZXJzID0gT2JqZWN0LmtleXMocmVjaXBpZW50cyk7XG4gIGlmIChpZGVudGlmaWVycy5sZW5ndGggPT09IDApIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBoYW5kbGVNZXNzYWdlU2VuZDogJHtzZW5kVHlwZX0gbWVzc2FnZSAke3RpbWVzdGFtcH0gaGFkIG5vIHJlY2lwaWVudHNgXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBJZiB0aGUgaWRlbnRpZmllciBjb3VudCBpcyBncmVhdGVyIHRoYW4gb25lLCB3ZSd2ZSBkb25lIHRoZSBzYXZlIGVsc2V3aGVyZVxuICBpZiAoaWRlbnRpZmllcnMubGVuZ3RoID4gMSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGF3YWl0IGluc2VydFNlbnRQcm90byhcbiAgICB7XG4gICAgICB0aW1lc3RhbXAsXG4gICAgICBwcm90bzogQnVmZmVyLmZyb20oY29udGVudFByb3RvKSxcbiAgICAgIGNvbnRlbnRIaW50LFxuICAgIH0sXG4gICAge1xuICAgICAgbWVzc2FnZUlkcyxcbiAgICAgIHJlY2lwaWVudHMsXG4gICAgfVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxpQkFBa0I7QUFDbEIsb0JBQXlCO0FBRXpCLG9CQUEwQjtBQUMxQixVQUFxQjtBQUNyQixvQkFLTztBQUNQLDBCQUE4QjtBQUU5QixNQUFNLEVBQUUsaUJBQWlCLHVCQUF1QjtBQUV6QyxNQUFNLGdCQUFnQixhQUFFLEtBQUs7QUFBQSxFQUNsQztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFB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
