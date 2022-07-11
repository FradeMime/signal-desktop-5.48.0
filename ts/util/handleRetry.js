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
var handleRetry_exports = {};
__export(handleRetry_exports, {
  _getRetryRecord: () => _getRetryRecord,
  onDecryptionError: () => onDecryptionError,
  onRetryRequest: () => onRetryRequest
});
module.exports = __toCommonJS(handleRetry_exports);
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_lodash = require("lodash");
var Bytes = __toESM(require("../Bytes"));
var import_version = require("./version");
var import_assert = require("./assert");
var import_getSendOptions = require("./getSendOptions");
var import_handleMessageSend = require("./handleMessageSend");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
var import_timestamp = require("./timestamp");
var import_parseIntOrThrow = require("./parseIntOrThrow");
var RemoteConfig = __toESM(require("../RemoteConfig"));
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_ToastDecryptionError = require("../components/ToastDecryptionError");
var import_showToast = require("./showToast");
var Errors = __toESM(require("../types/errors"));
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
const RETRY_LIMIT = 5;
const retryRecord = /* @__PURE__ */ new Map();
function _getRetryRecord() {
  return retryRecord;
}
async function onRetryRequest(event) {
  const { confirm, retryRequest } = event;
  const {
    groupId: requestGroupId,
    requesterDevice,
    requesterUuid,
    senderDevice,
    sentAt
  } = retryRequest;
  const logId = `${requesterUuid}.${requesterDevice} ${sentAt}.${senderDevice}`;
  log.info(`onRetryRequest/${logId}: Starting...`);
  if (!RemoteConfig.isEnabled("desktop.senderKey.retry")) {
    log.warn(`onRetryRequest/${logId}: Feature flag disabled, returning early.`);
    confirm();
    return;
  }
  const retryCount = (retryRecord.get(sentAt) || 0) + 1;
  retryRecord.set(sentAt, retryCount);
  if (retryCount > RETRY_LIMIT) {
    log.warn(`onRetryRequest/${logId}: retryCount is ${retryCount}; returning early.`);
    confirm();
    return;
  }
  if (window.RETRY_DELAY) {
    log.warn(`onRetryRequest/${logId}: Delaying because RETRY_DELAY is set...`);
    await new Promise((resolve) => setTimeout(resolve, 5e3));
  }
  const HOUR = 60 * 60 * 1e3;
  const DAY = 24 * HOUR;
  let retryRespondMaxAge = 14 * DAY;
  try {
    retryRespondMaxAge = (0, import_parseIntOrThrow.parseIntOrThrow)(RemoteConfig.getValue("desktop.retryRespondMaxAge"), "retryRespondMaxAge");
  } catch (error) {
    log.warn(`onRetryRequest/${logId}: Failed to parse integer from desktop.retryRespondMaxAge feature flag`, error && error.stack ? error.stack : error);
  }
  const didArchive = await archiveSessionOnMatch(retryRequest);
  if ((0, import_timestamp.isOlderThan)(sentAt, retryRespondMaxAge)) {
    log.info(`onRetryRequest/${logId}: Message is too old, refusing to send again.`);
    await sendDistributionMessageOrNullMessage(logId, retryRequest, didArchive);
    confirm();
    return;
  }
  const sentProto = await window.Signal.Data.getSentProtoByRecipient({
    now: Date.now(),
    recipientUuid: requesterUuid,
    timestamp: sentAt
  });
  if (!sentProto) {
    log.info(`onRetryRequest/${logId}: Did not find sent proto`);
    await sendDistributionMessageOrNullMessage(logId, retryRequest, didArchive);
    confirm();
    return;
  }
  log.info(`onRetryRequest/${logId}: Resending message`);
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error(`onRetryRequest/${logId}: messaging is not available!`);
  }
  const { contentHint, messageIds, proto, timestamp } = sentProto;
  const { contentProto, groupId } = await maybeAddSenderKeyDistributionMessage({
    contentProto: import_protobuf.SignalService.Content.decode(proto),
    logId,
    messageIds,
    requestGroupId,
    requesterUuid,
    timestamp
  });
  const recipientConversation = window.ConversationController.getOrCreate(requesterUuid, "private");
  const sendOptions = await (0, import_getSendOptions.getSendOptions)(recipientConversation.attributes);
  const promise = messaging.sendMessageProtoAndWait({
    timestamp,
    recipients: [requesterUuid],
    proto: new import_protobuf.SignalService.Content(contentProto),
    contentHint,
    groupId,
    options: sendOptions
  });
  await (0, import_handleMessageSend.handleMessageSend)(promise, {
    messageIds: [],
    sendType: "resendFromLog"
  });
  confirm();
  log.info(`onRetryRequest/${logId}: Resend complete.`);
}
function maybeShowDecryptionToast(logId, name, deviceId) {
  if ((0, import_version.isProduction)(window.getVersion())) {
    return;
  }
  log.info(`maybeShowDecryptionToast/${logId}: Showing decryption error toast`);
  (0, import_showToast.showToast)(import_ToastDecryptionError.ToastDecryptionError, {
    deviceId,
    name,
    onShowDebugLog: () => window.showDebugLog()
  });
}
async function onDecryptionError(event) {
  const { confirm, decryptionError } = event;
  const { senderUuid, senderDevice, timestamp } = decryptionError;
  const logId = `${senderUuid}.${senderDevice} ${timestamp}`;
  log.info(`onDecryptionError/${logId}: Starting...`);
  const retryCount = (retryRecord.get(timestamp) || 0) + 1;
  retryRecord.set(timestamp, retryCount);
  if (retryCount > RETRY_LIMIT) {
    log.warn(`onDecryptionError/${logId}: retryCount is ${retryCount}; returning early.`);
    confirm();
    return;
  }
  const conversation = window.ConversationController.getOrCreate(senderUuid, "private");
  if (!conversation.get("capabilities")?.senderKey) {
    await conversation.getProfiles();
  }
  const name = conversation.getTitle();
  maybeShowDecryptionToast(logId, name, senderDevice);
  if (conversation.get("capabilities")?.senderKey && RemoteConfig.isEnabled("desktop.senderKey.retry")) {
    await requestResend(decryptionError);
  } else {
    await startAutomaticSessionReset(decryptionError);
  }
  confirm();
  log.info(`onDecryptionError/${logId}: ...complete`);
}
async function archiveSessionOnMatch({
  ratchetKey,
  requesterUuid,
  requesterDevice,
  senderDevice
}) {
  const ourDeviceId = (0, import_parseIntOrThrow.parseIntOrThrow)(window.textsecure.storage.user.getDeviceId(), "archiveSessionOnMatch/getDeviceId");
  if (ourDeviceId !== senderDevice || !ratchetKey) {
    return false;
  }
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  const address = new import_QualifiedAddress.QualifiedAddress(ourUuid, import_Address.Address.create(requesterUuid, requesterDevice));
  const session = await window.textsecure.storage.protocol.loadSession(address);
  if (session && session.currentRatchetKeyMatches(ratchetKey)) {
    log.info("archiveSessionOnMatch: Matching device and ratchetKey, archiving session");
    await window.textsecure.storage.protocol.archiveSession(address);
    return true;
  }
  return false;
}
async function sendDistributionMessageOrNullMessage(logId, options, didArchive) {
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const { groupId, requesterUuid } = options;
  let sentDistributionMessage = false;
  log.info(`sendDistributionMessageOrNullMessage/${logId}: Starting...`);
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error(`sendDistributionMessageOrNullMessage/${logId}: messaging is not available!`);
  }
  const conversation = window.ConversationController.getOrCreate(requesterUuid, "private");
  const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
  if (groupId) {
    const group = window.ConversationController.get(groupId);
    const distributionId = group?.get("senderKeyInfo")?.distributionId;
    if (group && !group.hasMember(requesterUuid)) {
      throw new Error(`sendDistributionMessageOrNullMessage/${logId}: Requester ${requesterUuid} is not a member of ${conversation.idForLogging()}`);
    }
    if (group && distributionId) {
      log.info(`sendDistributionMessageOrNullMessage/${logId}: Found matching group, sending sender key distribution message`);
      try {
        await (0, import_handleMessageSend.handleMessageSend)(messaging.sendSenderKeyDistributionMessage({
          contentHint: ContentHint.RESENDABLE,
          distributionId,
          groupId,
          identifiers: [requesterUuid],
          throwIfNotInDatabase: true
        }, sendOptions), { messageIds: [], sendType: "senderKeyDistributionMessage" });
        sentDistributionMessage = true;
      } catch (error) {
        log.error(`sendDistributionMessageOrNullMessage/${logId}: Failed to send sender key distribution message`, error && error.stack ? error.stack : error);
      }
    }
  }
  if (!sentDistributionMessage) {
    if (!didArchive) {
      log.info(`sendDistributionMessageOrNullMessage/${logId}: Did't send distribution message and didn't archive session. Returning early.`);
      return;
    }
    log.info(`sendDistributionMessageOrNullMessage/${logId}: Did not send distribution message, sending null message`);
    try {
      const nullMessage = import_SendMessage.default.getNullMessage({
        uuid: requesterUuid
      });
      await (0, import_handleMessageSend.handleMessageSend)(messaging.sendIndividualProto({
        ...nullMessage,
        options: sendOptions,
        proto: import_protobuf.SignalService.Content.decode(Bytes.fromBase64(nullMessage.protoBase64)),
        timestamp: Date.now()
      }), { messageIds: [], sendType: nullMessage.type });
    } catch (error) {
      log.error("sendDistributionMessageOrNullMessage: Failed to send null message", Errors.toLogFormat(error));
    }
  }
}
async function getRetryConversation({
  logId,
  messageIds,
  requestGroupId
}) {
  if (messageIds.length !== 1) {
    return window.ConversationController.get(requestGroupId);
  }
  const [messageId] = messageIds;
  const message = await window.Signal.Data.getMessageById(messageId);
  if (!message) {
    log.warn(`getRetryConversation/${logId}: Unable to find message ${messageId}`);
    return window.ConversationController.get(requestGroupId);
  }
  const { conversationId } = message;
  return window.ConversationController.get(conversationId);
}
async function maybeAddSenderKeyDistributionMessage({
  contentProto,
  logId,
  messageIds,
  requestGroupId,
  requesterUuid,
  timestamp
}) {
  const conversation = await getRetryConversation({
    logId,
    messageIds,
    requestGroupId
  });
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error(`maybeAddSenderKeyDistributionMessage/${logId}: messaging is not available!`);
  }
  if (!conversation) {
    log.warn(`maybeAddSenderKeyDistributionMessage/${logId}: Unable to find conversation`);
    return {
      contentProto
    };
  }
  if (!conversation.hasMember(requesterUuid)) {
    throw new Error(`maybeAddSenderKeyDistributionMessage/${logId}: Recipient ${requesterUuid} is not a member of ${conversation.idForLogging()}`);
  }
  if (!(0, import_whatTypeOfConversation.isGroupV2)(conversation.attributes)) {
    return {
      contentProto
    };
  }
  const senderKeyInfo = conversation.get("senderKeyInfo");
  if (senderKeyInfo && senderKeyInfo.distributionId) {
    const protoWithDistributionMessage = await messaging.getSenderKeyDistributionMessage(senderKeyInfo.distributionId, { throwIfNotInDatabase: true, timestamp });
    return {
      contentProto: {
        ...contentProto,
        senderKeyDistributionMessage: protoWithDistributionMessage.senderKeyDistributionMessage
      },
      groupId: conversation.get("groupId")
    };
  }
  return {
    contentProto,
    groupId: conversation.get("groupId")
  };
}
async function requestResend(decryptionError) {
  const {
    cipherTextBytes,
    cipherTextType,
    contentHint,
    groupId,
    receivedAtCounter,
    receivedAtDate,
    senderDevice,
    senderUuid,
    timestamp
  } = decryptionError;
  const logId = `${senderUuid}.${senderDevice} ${timestamp}`;
  log.info(`requestResend/${logId}: Starting...`, {
    cipherTextBytesLength: cipherTextBytes?.byteLength,
    cipherTextType,
    contentHint,
    groupId: groupId ? `groupv2(${groupId})` : void 0
  });
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error(`requestResend/${logId}: messaging is not available!`);
  }
  const group = groupId ? window.ConversationController.get(groupId) : void 0;
  const sender = window.ConversationController.getOrCreate(senderUuid, "private");
  const conversation = group || sender;
  if (!cipherTextBytes || !(0, import_lodash.isNumber)(cipherTextType)) {
    log.warn(`requestResend/${logId}: Missing cipherText information, failing over to automatic reset`);
    startAutomaticSessionReset(decryptionError);
    return;
  }
  try {
    const message = import_libsignal_client.DecryptionErrorMessage.forOriginal(Buffer.from(cipherTextBytes), cipherTextType, timestamp, senderDevice);
    const plaintext = import_libsignal_client.PlaintextContent.from(message);
    const options = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
    const result = await (0, import_handleMessageSend.handleMessageSend)(messaging.sendRetryRequest({
      plaintext,
      options,
      groupId,
      uuid: senderUuid
    }), { messageIds: [], sendType: "retryRequest" });
    if (result && result.errors && result.errors.length > 0) {
      throw result.errors[0];
    }
  } catch (error) {
    log.error(`requestResend/${logId}: Failed to send retry request, failing over to automatic reset`, error && error.stack ? error.stack : error);
    startAutomaticSessionReset(decryptionError);
    return;
  }
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  if (contentHint === ContentHint.RESENDABLE) {
    const { retryPlaceholders } = window.Signal.Services;
    (0, import_assert.strictAssert)(retryPlaceholders, "requestResend: adding placeholder");
    log.info(`requestResend/${logId}: Adding placeholder`);
    const state = window.reduxStore.getState();
    const selectedId = state.conversations.selectedConversationId;
    const wasOpened = selectedId === conversation.id;
    await retryPlaceholders.add({
      conversationId: conversation.get("id"),
      receivedAt: receivedAtDate,
      receivedAtCounter,
      sentAt: timestamp,
      senderUuid,
      wasOpened
    });
    return;
  }
  if (contentHint === ContentHint.IMPLICIT) {
    log.info(`requestResend/${logId}: contentHint is IMPLICIT, doing nothing.`);
    return;
  }
  log.warn(`requestResend/${logId}: No content hint, adding error immediately`);
  conversation.queueJob("addDeliveryIssue", async () => {
    conversation.addDeliveryIssue({
      receivedAt: receivedAtDate,
      receivedAtCounter,
      senderUuid,
      sentAt: timestamp
    });
  });
}
function scheduleSessionReset(senderUuid, senderDevice) {
  const { lightSessionResetQueue } = window.Signal.Services;
  if (!lightSessionResetQueue) {
    throw new Error("scheduleSessionReset: lightSessionResetQueue is not available!");
  }
  lightSessionResetQueue.add(() => {
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    window.textsecure.storage.protocol.lightSessionReset(new import_QualifiedAddress.QualifiedAddress(ourUuid, import_Address.Address.create(senderUuid, senderDevice)));
  });
}
function startAutomaticSessionReset(decryptionError) {
  const { senderUuid, senderDevice, timestamp } = decryptionError;
  const logId = `${senderUuid}.${senderDevice} ${timestamp}`;
  log.info(`startAutomaticSessionReset/${logId}: Starting...`);
  scheduleSessionReset(senderUuid, senderDevice);
  const conversationId = window.ConversationController.ensureContactIds({
    uuid: senderUuid
  });
  if (!conversationId) {
    log.warn("onLightSessionReset: No conversation id, cannot add message to timeline");
    return;
  }
  const conversation = window.ConversationController.get(conversationId);
  if (!conversation) {
    log.warn("onLightSessionReset: No conversation, cannot add message to timeline");
    return;
  }
  const receivedAt = Date.now();
  const receivedAtCounter = window.Signal.Util.incrementMessageCounter();
  conversation.queueJob("addChatSessionRefreshed", async () => {
    conversation.addChatSessionRefreshed({ receivedAt, receivedAtCounter });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _getRetryRecord,
  onDecryptionError,
  onRetryRequest
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlUmV0cnkudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQge1xuICBEZWNyeXB0aW9uRXJyb3JNZXNzYWdlLFxuICBQbGFpbnRleHRDb250ZW50LFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuaW1wb3J0IHsgaXNOdW1iZXIgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBpc1Byb2R1Y3Rpb24gfSBmcm9tICcuL3ZlcnNpb24nO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0IHsgZ2V0U2VuZE9wdGlvbnMgfSBmcm9tICcuL2dldFNlbmRPcHRpb25zJztcbmltcG9ydCB7IGhhbmRsZU1lc3NhZ2VTZW5kIH0gZnJvbSAnLi9oYW5kbGVNZXNzYWdlU2VuZCc7XG5pbXBvcnQgeyBpc0dyb3VwVjIgfSBmcm9tICcuL3doYXRUeXBlT2ZDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgaXNPbGRlclRoYW4gfSBmcm9tICcuL3RpbWVzdGFtcCc7XG5pbXBvcnQgeyBwYXJzZUludE9yVGhyb3cgfSBmcm9tICcuL3BhcnNlSW50T3JUaHJvdyc7XG5pbXBvcnQgKiBhcyBSZW1vdGVDb25maWcgZnJvbSAnLi4vUmVtb3RlQ29uZmlnJztcbmltcG9ydCB7IEFkZHJlc3MgfSBmcm9tICcuLi90eXBlcy9BZGRyZXNzJztcbmltcG9ydCB7IFF1YWxpZmllZEFkZHJlc3MgfSBmcm9tICcuLi90eXBlcy9RdWFsaWZpZWRBZGRyZXNzJztcbmltcG9ydCB7IFRvYXN0RGVjcnlwdGlvbkVycm9yIH0gZnJvbSAnLi4vY29tcG9uZW50cy9Ub2FzdERlY3J5cHRpb25FcnJvcic7XG5pbXBvcnQgeyBzaG93VG9hc3QgfSBmcm9tICcuL3Nob3dUb2FzdCc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcblxuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25Nb2RlbCB9IGZyb20gJy4uL21vZGVscy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHtcbiAgRGVjcnlwdGlvbkVycm9yRXZlbnQsXG4gIERlY3J5cHRpb25FcnJvckV2ZW50RGF0YSxcbiAgUmV0cnlSZXF1ZXN0RXZlbnQsXG4gIFJldHJ5UmVxdWVzdEV2ZW50RGF0YSxcbn0gZnJvbSAnLi4vdGV4dHNlY3VyZS9tZXNzYWdlUmVjZWl2ZXJFdmVudHMnO1xuXG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCBNZXNzYWdlU2VuZGVyIGZyb20gJy4uL3RleHRzZWN1cmUvU2VuZE1lc3NhZ2UnO1xuXG5jb25zdCBSRVRSWV9MSU1JVCA9IDU7XG5cbi8vIE5vdGU6IE5laXRoZXIgb2YgdGhlIHRoZSB0d28gZnVuY3Rpb25zIG9uUmV0cnlSZXF1ZXN0IGFuZCBvbkRlY3J5dGlvbkVycm9yIHVzZSBhIGpvYlxuLy8gICBxdWV1ZSB0byBtYWtlIHN1cmUgc2VuZHMgYXJlIHJlbGlhYmxlLiBUaGF0J3MgdW5uZWNlc3NhcnkgYmVjYXVzZSB0aGVzZSB0YXNrcyBhcmVcbi8vICAgdGllZCB0byBpbmNvbWluZyBtZXNzYWdlIHByb2Nlc3NpbmcgcXVldWUsIGFuZCB3aWxsIG9ubHkgY29uZmlybSgpIGNvbXBsZXRpb24gb25cbi8vICAgc3VjY2Vzc2Z1bCBzZW5kLlxuXG4vLyBFbnRyeXBvaW50c1xuXG5jb25zdCByZXRyeVJlY29yZCA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCk7XG5cbmV4cG9ydCBmdW5jdGlvbiBfZ2V0UmV0cnlSZWNvcmQoKTogTWFwPG51bWJlciwgbnVtYmVyPiB7XG4gIHJldHVybiByZXRyeVJlY29yZDtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uUmV0cnlSZXF1ZXN0KGV2ZW50OiBSZXRyeVJlcXVlc3RFdmVudCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IGNvbmZpcm0sIHJldHJ5UmVxdWVzdCB9ID0gZXZlbnQ7XG4gIGNvbnN0IHtcbiAgICBncm91cElkOiByZXF1ZXN0R3JvdXBJZCxcbiAgICByZXF1ZXN0ZXJEZXZpY2UsXG4gICAgcmVxdWVzdGVyVXVpZCxcbiAgICBzZW5kZXJEZXZpY2UsXG4gICAgc2VudEF0LFxuICB9ID0gcmV0cnlSZXF1ZXN0O1xuICBjb25zdCBsb2dJZCA9IGAke3JlcXVlc3RlclV1aWR9LiR7cmVxdWVzdGVyRGV2aWNlfSAke3NlbnRBdH0uJHtzZW5kZXJEZXZpY2V9YDtcblxuICBsb2cuaW5mbyhgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IFN0YXJ0aW5nLi4uYCk7XG5cbiAgaWYgKCFSZW1vdGVDb25maWcuaXNFbmFibGVkKCdkZXNrdG9wLnNlbmRlcktleS5yZXRyeScpKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IEZlYXR1cmUgZmxhZyBkaXNhYmxlZCwgcmV0dXJuaW5nIGVhcmx5LmBcbiAgICApO1xuICAgIGNvbmZpcm0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCByZXRyeUNvdW50ID0gKHJldHJ5UmVjb3JkLmdldChzZW50QXQpIHx8IDApICsgMTtcbiAgcmV0cnlSZWNvcmQuc2V0KHNlbnRBdCwgcmV0cnlDb3VudCk7XG4gIGlmIChyZXRyeUNvdW50ID4gUkVUUllfTElNSVQpIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBvblJldHJ5UmVxdWVzdC8ke2xvZ0lkfTogcmV0cnlDb3VudCBpcyAke3JldHJ5Q291bnR9OyByZXR1cm5pbmcgZWFybHkuYFxuICAgICk7XG4gICAgY29uZmlybSgpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICh3aW5kb3cuUkVUUllfREVMQVkpIHtcbiAgICBsb2cud2Fybihgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IERlbGF5aW5nIGJlY2F1c2UgUkVUUllfREVMQVkgaXMgc2V0Li4uYCk7XG4gICAgYXdhaXQgbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMDApKTtcbiAgfVxuXG4gIGNvbnN0IEhPVVIgPSA2MCAqIDYwICogMTAwMDtcbiAgY29uc3QgREFZID0gMjQgKiBIT1VSO1xuICBsZXQgcmV0cnlSZXNwb25kTWF4QWdlID0gMTQgKiBEQVk7XG4gIHRyeSB7XG4gICAgcmV0cnlSZXNwb25kTWF4QWdlID0gcGFyc2VJbnRPclRocm93KFxuICAgICAgUmVtb3RlQ29uZmlnLmdldFZhbHVlKCdkZXNrdG9wLnJldHJ5UmVzcG9uZE1heEFnZScpLFxuICAgICAgJ3JldHJ5UmVzcG9uZE1heEFnZSdcbiAgICApO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy53YXJuKFxuICAgICAgYG9uUmV0cnlSZXF1ZXN0LyR7bG9nSWR9OiBGYWlsZWQgdG8gcGFyc2UgaW50ZWdlciBmcm9tIGRlc2t0b3AucmV0cnlSZXNwb25kTWF4QWdlIGZlYXR1cmUgZmxhZ2AsXG4gICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICApO1xuICB9XG5cbiAgY29uc3QgZGlkQXJjaGl2ZSA9IGF3YWl0IGFyY2hpdmVTZXNzaW9uT25NYXRjaChyZXRyeVJlcXVlc3QpO1xuXG4gIGlmIChpc09sZGVyVGhhbihzZW50QXQsIHJldHJ5UmVzcG9uZE1heEFnZSkpIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBvblJldHJ5UmVxdWVzdC8ke2xvZ0lkfTogTWVzc2FnZSBpcyB0b28gb2xkLCByZWZ1c2luZyB0byBzZW5kIGFnYWluLmBcbiAgICApO1xuICAgIGF3YWl0IHNlbmREaXN0cmlidXRpb25NZXNzYWdlT3JOdWxsTWVzc2FnZShsb2dJZCwgcmV0cnlSZXF1ZXN0LCBkaWRBcmNoaXZlKTtcbiAgICBjb25maXJtKCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc2VudFByb3RvID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldFNlbnRQcm90b0J5UmVjaXBpZW50KHtcbiAgICBub3c6IERhdGUubm93KCksXG4gICAgcmVjaXBpZW50VXVpZDogcmVxdWVzdGVyVXVpZCxcbiAgICB0aW1lc3RhbXA6IHNlbnRBdCxcbiAgfSk7XG5cbiAgaWYgKCFzZW50UHJvdG8pIHtcbiAgICBsb2cuaW5mbyhgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IERpZCBub3QgZmluZCBzZW50IHByb3RvYCk7XG4gICAgYXdhaXQgc2VuZERpc3RyaWJ1dGlvbk1lc3NhZ2VPck51bGxNZXNzYWdlKGxvZ0lkLCByZXRyeVJlcXVlc3QsIGRpZEFyY2hpdmUpO1xuICAgIGNvbmZpcm0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2cuaW5mbyhgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IFJlc2VuZGluZyBtZXNzYWdlYCk7XG5cbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcihgb25SZXRyeVJlcXVlc3QvJHtsb2dJZH06IG1lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlIWApO1xuICB9XG5cbiAgY29uc3QgeyBjb250ZW50SGludCwgbWVzc2FnZUlkcywgcHJvdG8sIHRpbWVzdGFtcCB9ID0gc2VudFByb3RvO1xuXG4gIGNvbnN0IHsgY29udGVudFByb3RvLCBncm91cElkIH0gPSBhd2FpdCBtYXliZUFkZFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2Uoe1xuICAgIGNvbnRlbnRQcm90bzogUHJvdG8uQ29udGVudC5kZWNvZGUocHJvdG8pLFxuICAgIGxvZ0lkLFxuICAgIG1lc3NhZ2VJZHMsXG4gICAgcmVxdWVzdEdyb3VwSWQsXG4gICAgcmVxdWVzdGVyVXVpZCxcbiAgICB0aW1lc3RhbXAsXG4gIH0pO1xuXG4gIGNvbnN0IHJlY2lwaWVudENvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKFxuICAgIHJlcXVlc3RlclV1aWQsXG4gICAgJ3ByaXZhdGUnXG4gICk7XG4gIGNvbnN0IHNlbmRPcHRpb25zID0gYXdhaXQgZ2V0U2VuZE9wdGlvbnMocmVjaXBpZW50Q29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICBjb25zdCBwcm9taXNlID0gbWVzc2FnaW5nLnNlbmRNZXNzYWdlUHJvdG9BbmRXYWl0KHtcbiAgICB0aW1lc3RhbXAsXG4gICAgcmVjaXBpZW50czogW3JlcXVlc3RlclV1aWRdLFxuICAgIHByb3RvOiBuZXcgUHJvdG8uQ29udGVudChjb250ZW50UHJvdG8pLFxuICAgIGNvbnRlbnRIaW50LFxuICAgIGdyb3VwSWQsXG4gICAgb3B0aW9uczogc2VuZE9wdGlvbnMsXG4gIH0pO1xuXG4gIGF3YWl0IGhhbmRsZU1lc3NhZ2VTZW5kKHByb21pc2UsIHtcbiAgICBtZXNzYWdlSWRzOiBbXSxcbiAgICBzZW5kVHlwZTogJ3Jlc2VuZEZyb21Mb2cnLFxuICB9KTtcblxuICBjb25maXJtKCk7XG4gIGxvZy5pbmZvKGBvblJldHJ5UmVxdWVzdC8ke2xvZ0lkfTogUmVzZW5kIGNvbXBsZXRlLmApO1xufVxuXG5mdW5jdGlvbiBtYXliZVNob3dEZWNyeXB0aW9uVG9hc3QoXG4gIGxvZ0lkOiBzdHJpbmcsXG4gIG5hbWU6IHN0cmluZyxcbiAgZGV2aWNlSWQ6IG51bWJlclxuKSB7XG4gIGlmIChpc1Byb2R1Y3Rpb24od2luZG93LmdldFZlcnNpb24oKSkpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsb2cuaW5mbyhgbWF5YmVTaG93RGVjcnlwdGlvblRvYXN0LyR7bG9nSWR9OiBTaG93aW5nIGRlY3J5cHRpb24gZXJyb3IgdG9hc3RgKTtcbiAgc2hvd1RvYXN0KFRvYXN0RGVjcnlwdGlvbkVycm9yLCB7XG4gICAgZGV2aWNlSWQsXG4gICAgbmFtZSxcbiAgICBvblNob3dEZWJ1Z0xvZzogKCkgPT4gd2luZG93LnNob3dEZWJ1Z0xvZygpLFxuICB9KTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIG9uRGVjcnlwdGlvbkVycm9yKFxuICBldmVudDogRGVjcnlwdGlvbkVycm9yRXZlbnRcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IGNvbmZpcm0sIGRlY3J5cHRpb25FcnJvciB9ID0gZXZlbnQ7XG4gIGNvbnN0IHsgc2VuZGVyVXVpZCwgc2VuZGVyRGV2aWNlLCB0aW1lc3RhbXAgfSA9IGRlY3J5cHRpb25FcnJvcjtcbiAgY29uc3QgbG9nSWQgPSBgJHtzZW5kZXJVdWlkfS4ke3NlbmRlckRldmljZX0gJHt0aW1lc3RhbXB9YDtcblxuICBsb2cuaW5mbyhgb25EZWNyeXB0aW9uRXJyb3IvJHtsb2dJZH06IFN0YXJ0aW5nLi4uYCk7XG5cbiAgY29uc3QgcmV0cnlDb3VudCA9IChyZXRyeVJlY29yZC5nZXQodGltZXN0YW1wKSB8fCAwKSArIDE7XG4gIHJldHJ5UmVjb3JkLnNldCh0aW1lc3RhbXAsIHJldHJ5Q291bnQpO1xuICBpZiAocmV0cnlDb3VudCA+IFJFVFJZX0xJTUlUKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgb25EZWNyeXB0aW9uRXJyb3IvJHtsb2dJZH06IHJldHJ5Q291bnQgaXMgJHtyZXRyeUNvdW50fTsgcmV0dXJuaW5nIGVhcmx5LmBcbiAgICApO1xuICAgIGNvbmZpcm0oKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZShcbiAgICBzZW5kZXJVdWlkLFxuICAgICdwcml2YXRlJ1xuICApO1xuICBpZiAoIWNvbnZlcnNhdGlvbi5nZXQoJ2NhcGFiaWxpdGllcycpPy5zZW5kZXJLZXkpIHtcbiAgICBhd2FpdCBjb252ZXJzYXRpb24uZ2V0UHJvZmlsZXMoKTtcbiAgfVxuXG4gIGNvbnN0IG5hbWUgPSBjb252ZXJzYXRpb24uZ2V0VGl0bGUoKTtcbiAgbWF5YmVTaG93RGVjcnlwdGlvblRvYXN0KGxvZ0lkLCBuYW1lLCBzZW5kZXJEZXZpY2UpO1xuXG4gIGlmIChcbiAgICBjb252ZXJzYXRpb24uZ2V0KCdjYXBhYmlsaXRpZXMnKT8uc2VuZGVyS2V5ICYmXG4gICAgUmVtb3RlQ29uZmlnLmlzRW5hYmxlZCgnZGVza3RvcC5zZW5kZXJLZXkucmV0cnknKVxuICApIHtcbiAgICBhd2FpdCByZXF1ZXN0UmVzZW5kKGRlY3J5cHRpb25FcnJvcik7XG4gIH0gZWxzZSB7XG4gICAgYXdhaXQgc3RhcnRBdXRvbWF0aWNTZXNzaW9uUmVzZXQoZGVjcnlwdGlvbkVycm9yKTtcbiAgfVxuXG4gIGNvbmZpcm0oKTtcbiAgbG9nLmluZm8oYG9uRGVjcnlwdGlvbkVycm9yLyR7bG9nSWR9OiAuLi5jb21wbGV0ZWApO1xufVxuXG4vLyBIZWxwZXJzXG5cbmFzeW5jIGZ1bmN0aW9uIGFyY2hpdmVTZXNzaW9uT25NYXRjaCh7XG4gIHJhdGNoZXRLZXksXG4gIHJlcXVlc3RlclV1aWQsXG4gIHJlcXVlc3RlckRldmljZSxcbiAgc2VuZGVyRGV2aWNlLFxufTogUmV0cnlSZXF1ZXN0RXZlbnREYXRhKTogUHJvbWlzZTxib29sZWFuPiB7XG4gIGNvbnN0IG91ckRldmljZUlkID0gcGFyc2VJbnRPclRocm93KFxuICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpLFxuICAgICdhcmNoaXZlU2Vzc2lvbk9uTWF0Y2gvZ2V0RGV2aWNlSWQnXG4gICk7XG4gIGlmIChvdXJEZXZpY2VJZCAhPT0gc2VuZGVyRGV2aWNlIHx8ICFyYXRjaGV0S2V5KSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICBjb25zdCBhZGRyZXNzID0gbmV3IFF1YWxpZmllZEFkZHJlc3MoXG4gICAgb3VyVXVpZCxcbiAgICBBZGRyZXNzLmNyZWF0ZShyZXF1ZXN0ZXJVdWlkLCByZXF1ZXN0ZXJEZXZpY2UpXG4gICk7XG4gIGNvbnN0IHNlc3Npb24gPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmxvYWRTZXNzaW9uKGFkZHJlc3MpO1xuXG4gIGlmIChzZXNzaW9uICYmIHNlc3Npb24uY3VycmVudFJhdGNoZXRLZXlNYXRjaGVzKHJhdGNoZXRLZXkpKSB7XG4gICAgbG9nLmluZm8oXG4gICAgICAnYXJjaGl2ZVNlc3Npb25Pbk1hdGNoOiBNYXRjaGluZyBkZXZpY2UgYW5kIHJhdGNoZXRLZXksIGFyY2hpdmluZyBzZXNzaW9uJ1xuICAgICk7XG4gICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihhZGRyZXNzKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gc2VuZERpc3RyaWJ1dGlvbk1lc3NhZ2VPck51bGxNZXNzYWdlKFxuICBsb2dJZDogc3RyaW5nLFxuICBvcHRpb25zOiBSZXRyeVJlcXVlc3RFdmVudERhdGEsXG4gIGRpZEFyY2hpdmU6IGJvb2xlYW5cbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG4gIGNvbnN0IHsgZ3JvdXBJZCwgcmVxdWVzdGVyVXVpZCB9ID0gb3B0aW9ucztcbiAgbGV0IHNlbnREaXN0cmlidXRpb25NZXNzYWdlID0gZmFsc2U7XG4gIGxvZy5pbmZvKGBzZW5kRGlzdHJpYnV0aW9uTWVzc2FnZU9yTnVsbE1lc3NhZ2UvJHtsb2dJZH06IFN0YXJ0aW5nLi4uYCk7XG5cbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzZW5kRGlzdHJpYnV0aW9uTWVzc2FnZU9yTnVsbE1lc3NhZ2UvJHtsb2dJZH06IG1lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlIWBcbiAgICApO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoXG4gICAgcmVxdWVzdGVyVXVpZCxcbiAgICAncHJpdmF0ZSdcbiAgKTtcbiAgY29uc3Qgc2VuZE9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG5cbiAgaWYgKGdyb3VwSWQpIHtcbiAgICBjb25zdCBncm91cCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cElkKTtcbiAgICBjb25zdCBkaXN0cmlidXRpb25JZCA9IGdyb3VwPy5nZXQoJ3NlbmRlcktleUluZm8nKT8uZGlzdHJpYnV0aW9uSWQ7XG5cbiAgICBpZiAoZ3JvdXAgJiYgIWdyb3VwLmhhc01lbWJlcihyZXF1ZXN0ZXJVdWlkKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBgc2VuZERpc3RyaWJ1dGlvbk1lc3NhZ2VPck51bGxNZXNzYWdlLyR7bG9nSWR9OiBSZXF1ZXN0ZXIgJHtyZXF1ZXN0ZXJVdWlkfSBpcyBub3QgYSBtZW1iZXIgb2YgJHtjb252ZXJzYXRpb24uaWRGb3JMb2dnaW5nKCl9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBpZiAoZ3JvdXAgJiYgZGlzdHJpYnV0aW9uSWQpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgc2VuZERpc3RyaWJ1dGlvbk1lc3NhZ2VPck51bGxNZXNzYWdlLyR7bG9nSWR9OiBGb3VuZCBtYXRjaGluZyBncm91cCwgc2VuZGluZyBzZW5kZXIga2V5IGRpc3RyaWJ1dGlvbiBtZXNzYWdlYFxuICAgICAgKTtcblxuICAgICAgdHJ5IHtcbiAgICAgICAgYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICAgICAgbWVzc2FnaW5nLnNlbmRTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlKFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgICAgICAgICAgZGlzdHJpYnV0aW9uSWQsXG4gICAgICAgICAgICAgIGdyb3VwSWQsXG4gICAgICAgICAgICAgIGlkZW50aWZpZXJzOiBbcmVxdWVzdGVyVXVpZF0sXG4gICAgICAgICAgICAgIHRocm93SWZOb3RJbkRhdGFiYXNlOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHNlbmRPcHRpb25zXG4gICAgICAgICAgKSxcbiAgICAgICAgICB7IG1lc3NhZ2VJZHM6IFtdLCBzZW5kVHlwZTogJ3NlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UnIH1cbiAgICAgICAgKTtcbiAgICAgICAgc2VudERpc3RyaWJ1dGlvbk1lc3NhZ2UgPSB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgIGBzZW5kRGlzdHJpYnV0aW9uTWVzc2FnZU9yTnVsbE1lc3NhZ2UvJHtsb2dJZH06IEZhaWxlZCB0byBzZW5kIHNlbmRlciBrZXkgZGlzdHJpYnV0aW9uIG1lc3NhZ2VgLFxuICAgICAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICAgICApO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICghc2VudERpc3RyaWJ1dGlvbk1lc3NhZ2UpIHtcbiAgICBpZiAoIWRpZEFyY2hpdmUpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgc2VuZERpc3RyaWJ1dGlvbk1lc3NhZ2VPck51bGxNZXNzYWdlLyR7bG9nSWR9OiBEaWQndCBzZW5kIGRpc3RyaWJ1dGlvbiBtZXNzYWdlIGFuZCBkaWRuJ3QgYXJjaGl2ZSBzZXNzaW9uLiBSZXR1cm5pbmcgZWFybHkuYFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzZW5kRGlzdHJpYnV0aW9uTWVzc2FnZU9yTnVsbE1lc3NhZ2UvJHtsb2dJZH06IERpZCBub3Qgc2VuZCBkaXN0cmlidXRpb24gbWVzc2FnZSwgc2VuZGluZyBudWxsIG1lc3NhZ2VgXG4gICAgKTtcblxuICAgIC8vIEVucXVldWUgYSBudWxsIG1lc3NhZ2UgdXNpbmcgdGhlIG5ld2x5LWNyZWF0ZWQgc2Vzc2lvblxuICAgIHRyeSB7XG4gICAgICBjb25zdCBudWxsTWVzc2FnZSA9IE1lc3NhZ2VTZW5kZXIuZ2V0TnVsbE1lc3NhZ2Uoe1xuICAgICAgICB1dWlkOiByZXF1ZXN0ZXJVdWlkLFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBoYW5kbGVNZXNzYWdlU2VuZChcbiAgICAgICAgbWVzc2FnaW5nLnNlbmRJbmRpdmlkdWFsUHJvdG8oe1xuICAgICAgICAgIC4uLm51bGxNZXNzYWdlLFxuICAgICAgICAgIG9wdGlvbnM6IHNlbmRPcHRpb25zLFxuICAgICAgICAgIHByb3RvOiBQcm90by5Db250ZW50LmRlY29kZShcbiAgICAgICAgICAgIEJ5dGVzLmZyb21CYXNlNjQobnVsbE1lc3NhZ2UucHJvdG9CYXNlNjQpXG4gICAgICAgICAgKSxcbiAgICAgICAgICB0aW1lc3RhbXA6IERhdGUubm93KCksXG4gICAgICAgIH0pLFxuICAgICAgICB7IG1lc3NhZ2VJZHM6IFtdLCBzZW5kVHlwZTogbnVsbE1lc3NhZ2UudHlwZSB9XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdzZW5kRGlzdHJpYnV0aW9uTWVzc2FnZU9yTnVsbE1lc3NhZ2U6IEZhaWxlZCB0byBzZW5kIG51bGwgbWVzc2FnZScsXG4gICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICk7XG4gICAgfVxuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFJldHJ5Q29udmVyc2F0aW9uKHtcbiAgbG9nSWQsXG4gIG1lc3NhZ2VJZHMsXG4gIHJlcXVlc3RHcm91cElkLFxufToge1xuICBsb2dJZDogc3RyaW5nO1xuICBtZXNzYWdlSWRzOiBBcnJheTxzdHJpbmc+O1xuICByZXF1ZXN0R3JvdXBJZD86IHN0cmluZztcbn0pOiBQcm9taXNlPENvbnZlcnNhdGlvbk1vZGVsIHwgdW5kZWZpbmVkPiB7XG4gIGlmIChtZXNzYWdlSWRzLmxlbmd0aCAhPT0gMSkge1xuICAgIC8vIEZhaWwgb3ZlciB0byByZXF1ZXN0ZWQgZ3JvdXBJZFxuICAgIHJldHVybiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQocmVxdWVzdEdyb3VwSWQpO1xuICB9XG5cbiAgY29uc3QgW21lc3NhZ2VJZF0gPSBtZXNzYWdlSWRzO1xuICBjb25zdCBtZXNzYWdlID0gYXdhaXQgd2luZG93LlNpZ25hbC5EYXRhLmdldE1lc3NhZ2VCeUlkKG1lc3NhZ2VJZCk7XG4gIGlmICghbWVzc2FnZSkge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGdldFJldHJ5Q29udmVyc2F0aW9uLyR7bG9nSWR9OiBVbmFibGUgdG8gZmluZCBtZXNzYWdlICR7bWVzc2FnZUlkfWBcbiAgICApO1xuICAgIC8vIEZhaWwgb3ZlciB0byByZXF1ZXN0ZWQgZ3JvdXBJZFxuICAgIHJldHVybiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQocmVxdWVzdEdyb3VwSWQpO1xuICB9XG5cbiAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gbWVzc2FnZTtcbiAgcmV0dXJuIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG1heWJlQWRkU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZSh7XG4gIGNvbnRlbnRQcm90byxcbiAgbG9nSWQsXG4gIG1lc3NhZ2VJZHMsXG4gIHJlcXVlc3RHcm91cElkLFxuICByZXF1ZXN0ZXJVdWlkLFxuICB0aW1lc3RhbXAsXG59OiB7XG4gIGNvbnRlbnRQcm90bzogUHJvdG8uSUNvbnRlbnQ7XG4gIGxvZ0lkOiBzdHJpbmc7XG4gIG1lc3NhZ2VJZHM6IEFycmF5PHN0cmluZz47XG4gIHJlcXVlc3RHcm91cElkPzogc3RyaW5nO1xuICByZXF1ZXN0ZXJVdWlkOiBzdHJpbmc7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufSk6IFByb21pc2U8e1xuICBjb250ZW50UHJvdG86IFByb3RvLklDb250ZW50O1xuICBncm91cElkPzogc3RyaW5nO1xufT4ge1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBhd2FpdCBnZXRSZXRyeUNvbnZlcnNhdGlvbih7XG4gICAgbG9nSWQsXG4gICAgbWVzc2FnZUlkcyxcbiAgICByZXF1ZXN0R3JvdXBJZCxcbiAgfSk7XG5cbiAgY29uc3QgeyBtZXNzYWdpbmcgfSA9IHdpbmRvdy50ZXh0c2VjdXJlO1xuICBpZiAoIW1lc3NhZ2luZykge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBtYXliZUFkZFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UvJHtsb2dJZH06IG1lc3NhZ2luZyBpcyBub3QgYXZhaWxhYmxlIWBcbiAgICApO1xuICB9XG5cbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICBsb2cud2FybihcbiAgICAgIGBtYXliZUFkZFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UvJHtsb2dJZH06IFVuYWJsZSB0byBmaW5kIGNvbnZlcnNhdGlvbmBcbiAgICApO1xuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50UHJvdG8sXG4gICAgfTtcbiAgfVxuXG4gIGlmICghY29udmVyc2F0aW9uLmhhc01lbWJlcihyZXF1ZXN0ZXJVdWlkKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBtYXliZUFkZFNlbmRlcktleURpc3RyaWJ1dGlvbk1lc3NhZ2UvJHtsb2dJZH06IFJlY2lwaWVudCAke3JlcXVlc3RlclV1aWR9IGlzIG5vdCBhIG1lbWJlciBvZiAke2NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgKTtcbiAgfVxuXG4gIGlmICghaXNHcm91cFYyKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKSkge1xuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50UHJvdG8sXG4gICAgfTtcbiAgfVxuXG4gIGNvbnN0IHNlbmRlcktleUluZm8gPSBjb252ZXJzYXRpb24uZ2V0KCdzZW5kZXJLZXlJbmZvJyk7XG4gIGlmIChzZW5kZXJLZXlJbmZvICYmIHNlbmRlcktleUluZm8uZGlzdHJpYnV0aW9uSWQpIHtcbiAgICBjb25zdCBwcm90b1dpdGhEaXN0cmlidXRpb25NZXNzYWdlID1cbiAgICAgIGF3YWl0IG1lc3NhZ2luZy5nZXRTZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlKFxuICAgICAgICBzZW5kZXJLZXlJbmZvLmRpc3RyaWJ1dGlvbklkLFxuICAgICAgICB7IHRocm93SWZOb3RJbkRhdGFiYXNlOiB0cnVlLCB0aW1lc3RhbXAgfVxuICAgICAgKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50UHJvdG86IHtcbiAgICAgICAgLi4uY29udGVudFByb3RvLFxuICAgICAgICBzZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlOlxuICAgICAgICAgIHByb3RvV2l0aERpc3RyaWJ1dGlvbk1lc3NhZ2Uuc2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZSxcbiAgICAgIH0sXG4gICAgICBncm91cElkOiBjb252ZXJzYXRpb24uZ2V0KCdncm91cElkJyksXG4gICAgfTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgY29udGVudFByb3RvLFxuICAgIGdyb3VwSWQ6IGNvbnZlcnNhdGlvbi5nZXQoJ2dyb3VwSWQnKSxcbiAgfTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVxdWVzdFJlc2VuZChkZWNyeXB0aW9uRXJyb3I6IERlY3J5cHRpb25FcnJvckV2ZW50RGF0YSkge1xuICBjb25zdCB7XG4gICAgY2lwaGVyVGV4dEJ5dGVzLFxuICAgIGNpcGhlclRleHRUeXBlLFxuICAgIGNvbnRlbnRIaW50LFxuICAgIGdyb3VwSWQsXG4gICAgcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgcmVjZWl2ZWRBdERhdGUsXG4gICAgc2VuZGVyRGV2aWNlLFxuICAgIHNlbmRlclV1aWQsXG4gICAgdGltZXN0YW1wLFxuICB9ID0gZGVjcnlwdGlvbkVycm9yO1xuICBjb25zdCBsb2dJZCA9IGAke3NlbmRlclV1aWR9LiR7c2VuZGVyRGV2aWNlfSAke3RpbWVzdGFtcH1gO1xuXG4gIGxvZy5pbmZvKGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBTdGFydGluZy4uLmAsIHtcbiAgICBjaXBoZXJUZXh0Qnl0ZXNMZW5ndGg6IGNpcGhlclRleHRCeXRlcz8uYnl0ZUxlbmd0aCxcbiAgICBjaXBoZXJUZXh0VHlwZSxcbiAgICBjb250ZW50SGludCxcbiAgICBncm91cElkOiBncm91cElkID8gYGdyb3VwdjIoJHtncm91cElkfSlgIDogdW5kZWZpbmVkLFxuICB9KTtcblxuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSFgKTtcbiAgfVxuXG4gIC8vIDEuIEZpbmQgdGhlIHRhcmdldCBjb252ZXJzYXRpb25cblxuICBjb25zdCBncm91cCA9IGdyb3VwSWRcbiAgICA/IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChncm91cElkKVxuICAgIDogdW5kZWZpbmVkO1xuICBjb25zdCBzZW5kZXIgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZShcbiAgICBzZW5kZXJVdWlkLFxuICAgICdwcml2YXRlJ1xuICApO1xuICBjb25zdCBjb252ZXJzYXRpb24gPSBncm91cCB8fCBzZW5kZXI7XG5cbiAgLy8gMi4gU2VuZCByZXNlbmQgcmVxdWVzdFxuXG4gIGlmICghY2lwaGVyVGV4dEJ5dGVzIHx8ICFpc051bWJlcihjaXBoZXJUZXh0VHlwZSkpIHtcbiAgICBsb2cud2FybihcbiAgICAgIGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBNaXNzaW5nIGNpcGhlclRleHQgaW5mb3JtYXRpb24sIGZhaWxpbmcgb3ZlciB0byBhdXRvbWF0aWMgcmVzZXRgXG4gICAgKTtcbiAgICBzdGFydEF1dG9tYXRpY1Nlc3Npb25SZXNldChkZWNyeXB0aW9uRXJyb3IpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHRyeSB7XG4gICAgY29uc3QgbWVzc2FnZSA9IERlY3J5cHRpb25FcnJvck1lc3NhZ2UuZm9yT3JpZ2luYWwoXG4gICAgICBCdWZmZXIuZnJvbShjaXBoZXJUZXh0Qnl0ZXMpLFxuICAgICAgY2lwaGVyVGV4dFR5cGUsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICBzZW5kZXJEZXZpY2VcbiAgICApO1xuXG4gICAgY29uc3QgcGxhaW50ZXh0ID0gUGxhaW50ZXh0Q29udGVudC5mcm9tKG1lc3NhZ2UpO1xuICAgIGNvbnN0IG9wdGlvbnMgPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICBtZXNzYWdpbmcuc2VuZFJldHJ5UmVxdWVzdCh7XG4gICAgICAgIHBsYWludGV4dCxcbiAgICAgICAgb3B0aW9ucyxcbiAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgdXVpZDogc2VuZGVyVXVpZCxcbiAgICAgIH0pLFxuICAgICAgeyBtZXNzYWdlSWRzOiBbXSwgc2VuZFR5cGU6ICdyZXRyeVJlcXVlc3QnIH1cbiAgICApO1xuICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgIHRocm93IHJlc3VsdC5lcnJvcnNbMF07XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGxvZy5lcnJvcihcbiAgICAgIGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBGYWlsZWQgdG8gc2VuZCByZXRyeSByZXF1ZXN0LCBmYWlsaW5nIG92ZXIgdG8gYXV0b21hdGljIHJlc2V0YCxcbiAgICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvclxuICAgICk7XG4gICAgc3RhcnRBdXRvbWF0aWNTZXNzaW9uUmVzZXQoZGVjcnlwdGlvbkVycm9yKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG5cbiAgLy8gMy4gRGV0ZXJtaW5lIGhvdyB0byByZXByZXNlbnQgdGhpcyB0byB0aGUgdXNlci4gVGhyZWUgZGlmZmVyZW50IG9wdGlvbnMuXG5cbiAgLy8gV2UgYmVsaWV2ZSB0aGF0IGl0IGNvdWxkIGJlIHN1Y2Nlc3NmdWxseSByZS1zZW50LCBzbyB3ZSdsbCBhZGQgYSBwbGFjZWhvbGRlci5cbiAgaWYgKGNvbnRlbnRIaW50ID09PSBDb250ZW50SGludC5SRVNFTkRBQkxFKSB7XG4gICAgY29uc3QgeyByZXRyeVBsYWNlaG9sZGVycyB9ID0gd2luZG93LlNpZ25hbC5TZXJ2aWNlcztcbiAgICBzdHJpY3RBc3NlcnQocmV0cnlQbGFjZWhvbGRlcnMsICdyZXF1ZXN0UmVzZW5kOiBhZGRpbmcgcGxhY2Vob2xkZXInKTtcblxuICAgIGxvZy5pbmZvKGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBBZGRpbmcgcGxhY2Vob2xkZXJgKTtcblxuICAgIGNvbnN0IHN0YXRlID0gd2luZG93LnJlZHV4U3RvcmUuZ2V0U3RhdGUoKTtcbiAgICBjb25zdCBzZWxlY3RlZElkID0gc3RhdGUuY29udmVyc2F0aW9ucy5zZWxlY3RlZENvbnZlcnNhdGlvbklkO1xuICAgIGNvbnN0IHdhc09wZW5lZCA9IHNlbGVjdGVkSWQgPT09IGNvbnZlcnNhdGlvbi5pZDtcblxuICAgIGF3YWl0IHJldHJ5UGxhY2Vob2xkZXJzLmFkZCh7XG4gICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmdldCgnaWQnKSxcbiAgICAgIHJlY2VpdmVkQXQ6IHJlY2VpdmVkQXREYXRlLFxuICAgICAgcmVjZWl2ZWRBdENvdW50ZXIsXG4gICAgICBzZW50QXQ6IHRpbWVzdGFtcCxcbiAgICAgIHNlbmRlclV1aWQsXG4gICAgICB3YXNPcGVuZWQsXG4gICAgfSk7XG5cbiAgICByZXR1cm47XG4gIH1cblxuICAvLyBUaGlzIG1lc3NhZ2UgY2Fubm90IGJlIHJlc2VudC4gV2UnbGwgc2hvdyBubyBlcnJvciBhbmQgdHJ1c3QgdGhlIG90aGVyIHNpZGUgdG9cbiAgLy8gICByZXNldCB0aGVpciBzZXNzaW9uLlxuICBpZiAoY29udGVudEhpbnQgPT09IENvbnRlbnRIaW50LklNUExJQ0lUKSB7XG4gICAgbG9nLmluZm8oYHJlcXVlc3RSZXNlbmQvJHtsb2dJZH06IGNvbnRlbnRIaW50IGlzIElNUExJQ0lULCBkb2luZyBub3RoaW5nLmApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxvZy53YXJuKGByZXF1ZXN0UmVzZW5kLyR7bG9nSWR9OiBObyBjb250ZW50IGhpbnQsIGFkZGluZyBlcnJvciBpbW1lZGlhdGVseWApO1xuICBjb252ZXJzYXRpb24ucXVldWVKb2IoJ2FkZERlbGl2ZXJ5SXNzdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29udmVyc2F0aW9uLmFkZERlbGl2ZXJ5SXNzdWUoe1xuICAgICAgcmVjZWl2ZWRBdDogcmVjZWl2ZWRBdERhdGUsXG4gICAgICByZWNlaXZlZEF0Q291bnRlcixcbiAgICAgIHNlbmRlclV1aWQsXG4gICAgICBzZW50QXQ6IHRpbWVzdGFtcCxcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNjaGVkdWxlU2Vzc2lvblJlc2V0KHNlbmRlclV1aWQ6IHN0cmluZywgc2VuZGVyRGV2aWNlOiBudW1iZXIpIHtcbiAgLy8gUG9zdHBvbmUgc2VuZGluZyBsaWdodCBzZXNzaW9uIHJlc2V0cyB1bnRpbCB0aGUgcXVldWUgaXMgZW1wdHlcbiAgY29uc3QgeyBsaWdodFNlc3Npb25SZXNldFF1ZXVlIH0gPSB3aW5kb3cuU2lnbmFsLlNlcnZpY2VzO1xuXG4gIGlmICghbGlnaHRTZXNzaW9uUmVzZXRRdWV1ZSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdzY2hlZHVsZVNlc3Npb25SZXNldDogbGlnaHRTZXNzaW9uUmVzZXRRdWV1ZSBpcyBub3QgYXZhaWxhYmxlISdcbiAgICApO1xuICB9XG5cbiAgbGlnaHRTZXNzaW9uUmVzZXRRdWV1ZS5hZGQoKCkgPT4ge1xuICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wubGlnaHRTZXNzaW9uUmVzZXQoXG4gICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBBZGRyZXNzLmNyZWF0ZShzZW5kZXJVdWlkLCBzZW5kZXJEZXZpY2UpKVxuICAgICk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzdGFydEF1dG9tYXRpY1Nlc3Npb25SZXNldChkZWNyeXB0aW9uRXJyb3I6IERlY3J5cHRpb25FcnJvckV2ZW50RGF0YSkge1xuICBjb25zdCB7IHNlbmRlclV1aWQsIHNlbmRlckRldmljZSwgdGltZXN0YW1wIH0gPSBkZWNyeXB0aW9uRXJyb3I7XG4gIGNvbnN0IGxvZ0lkID0gYCR7c2VuZGVyVXVpZH0uJHtzZW5kZXJEZXZpY2V9ICR7dGltZXN0YW1wfWA7XG5cbiAgbG9nLmluZm8oYHN0YXJ0QXV0b21hdGljU2Vzc2lvblJlc2V0LyR7bG9nSWR9OiBTdGFydGluZy4uLmApO1xuXG4gIHNjaGVkdWxlU2Vzc2lvblJlc2V0KHNlbmRlclV1aWQsIHNlbmRlckRldmljZSk7XG5cbiAgY29uc3QgY29udmVyc2F0aW9uSWQgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5lbnN1cmVDb250YWN0SWRzKHtcbiAgICB1dWlkOiBzZW5kZXJVdWlkLFxuICB9KTtcblxuICBpZiAoIWNvbnZlcnNhdGlvbklkKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICAnb25MaWdodFNlc3Npb25SZXNldDogTm8gY29udmVyc2F0aW9uIGlkLCBjYW5ub3QgYWRkIG1lc3NhZ2UgdG8gdGltZWxpbmUnXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcblxuICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ29uTGlnaHRTZXNzaW9uUmVzZXQ6IE5vIGNvbnZlcnNhdGlvbiwgY2Fubm90IGFkZCBtZXNzYWdlIHRvIHRpbWVsaW5lJ1xuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgcmVjZWl2ZWRBdCA9IERhdGUubm93KCk7XG4gIGNvbnN0IHJlY2VpdmVkQXRDb3VudGVyID0gd2luZG93LlNpZ25hbC5VdGlsLmluY3JlbWVudE1lc3NhZ2VDb3VudGVyKCk7XG4gIGNvbnZlcnNhdGlvbi5xdWV1ZUpvYignYWRkQ2hhdFNlc3Npb25SZWZyZXNoZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29udmVyc2F0aW9uLmFkZENoYXRTZXNzaW9uUmVmcmVzaGVkKHsgcmVjZWl2ZWRBdCwgcmVjZWl2ZWRBdENvdW50ZXIgfSk7XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSw4QkFHTztBQUNQLG9CQUF5QjtBQUV6QixZQUF1QjtBQUN2QixxQkFBNkI7QUFD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
