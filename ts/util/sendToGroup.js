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
var sendToGroup_exports = {};
__export(sendToGroup_exports, {
  _analyzeSenderKeyDevices: () => _analyzeSenderKeyDevices,
  _shouldFailSend: () => _shouldFailSend,
  _waitForAll: () => _waitForAll,
  sendContentMessageToGroup: () => sendContentMessageToGroup,
  sendToGroup: () => sendToGroup,
  sendToGroupViaSenderKey: () => sendToGroupViaSenderKey
});
module.exports = __toCommonJS(sendToGroup_exports);
var import_lodash = require("lodash");
var import_p_queue = __toESM(require("p-queue"));
var import_libsignal_client = require("@signalapp/libsignal-client");
var Bytes = __toESM(require("../Bytes"));
var import_senderCertificate = require("../services/senderCertificate");
var import_OutgoingMessage = require("../textsecure/OutgoingMessage");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_UUID = require("../types/UUID");
var import_RemoteConfig = require("../RemoteConfig");
var import_isRecord = require("./isRecord");
var import_timestamp = require("./timestamp");
var import_Errors = require("../textsecure/Errors");
var import_LibSignalStores = require("../LibSignalStores");
var import_getKeysForIdentifier = require("../textsecure/getKeysForIdentifier");
var import_handleMessageSend = require("./handleMessageSend");
var import_SealedSender = require("../types/SealedSender");
var import_parseIntOrThrow = require("./parseIntOrThrow");
var import_WebAPI = require("../textsecure/WebAPI");
var import_protobuf = require("../protobuf");
var import_assert = require("./assert");
var log = __toESM(require("../logging/log"));
var import_SignalProtocolStore = require("../SignalProtocolStore");
const ERROR_EXPIRED_OR_MISSING_DEVICES = 409;
const ERROR_STALE_DEVICES = 410;
const HOUR = 60 * 60 * 1e3;
const DAY = 24 * HOUR;
const MAX_CONCURRENCY = 5;
const MAX_RECURSION = 10;
const ACCESS_KEY_LENGTH = 16;
const ZERO_ACCESS_KEY = Bytes.toBase64(new Uint8Array(ACCESS_KEY_LENGTH));
async function sendToGroup({
  abortSignal,
  contentHint,
  groupSendOptions,
  isPartialSend,
  messageId,
  sendOptions,
  sendTarget,
  sendType
}) {
  (0, import_assert.strictAssert)(window.textsecure.messaging, "sendToGroup: textsecure.messaging not available!");
  const { timestamp } = groupSendOptions;
  const recipients = getRecipients(groupSendOptions);
  const protoAttributes = window.textsecure.messaging.getAttrsFromGroupOptions(groupSendOptions);
  const contentMessage = await window.textsecure.messaging.getContentMessage(protoAttributes);
  if (abortSignal?.aborted) {
    throw new Error("sendToGroup was aborted");
  }
  return sendContentMessageToGroup({
    contentHint,
    contentMessage,
    isPartialSend,
    messageId,
    recipients,
    sendOptions,
    sendTarget,
    sendType,
    timestamp
  });
}
async function sendContentMessageToGroup({
  contentHint,
  contentMessage,
  isPartialSend,
  messageId,
  online,
  recipients,
  sendOptions,
  sendTarget,
  sendType,
  timestamp
}) {
  const logId = sendTarget.idForLogging();
  (0, import_assert.strictAssert)(window.textsecure.messaging, "sendContentMessageToGroup: textsecure.messaging not available!");
  const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
  const ourConversation = window.ConversationController.get(ourConversationId);
  if ((0, import_RemoteConfig.isEnabled)("desktop.sendSenderKey3") && (0, import_RemoteConfig.isEnabled)("desktop.senderKey.send") && ourConversation?.get("capabilities")?.senderKey && sendTarget.isValid()) {
    try {
      return await sendToGroupViaSenderKey({
        contentHint,
        contentMessage,
        isPartialSend,
        messageId,
        online,
        recipients,
        recursionCount: 0,
        sendOptions,
        sendTarget,
        sendType,
        timestamp
      });
    } catch (error) {
      if (!(error instanceof Error)) {
        throw error;
      }
      if (_shouldFailSend(error, logId)) {
        throw error;
      }
      log.error(`sendToGroup/${logId}: Sender Key send failed, logging, proceeding to normal send`, error && error.stack ? error.stack : error);
    }
  }
  const sendLogCallback = window.textsecure.messaging.makeSendLogCallback({
    contentHint,
    messageId,
    proto: Buffer.from(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
    sendType,
    timestamp
  });
  const groupId = sendTarget.isGroupV2() ? sendTarget.getGroupId() : void 0;
  return window.textsecure.messaging.sendGroupProto({
    contentHint,
    groupId,
    options: { ...sendOptions, online },
    proto: contentMessage,
    recipients,
    sendLogCallback,
    timestamp
  });
}
async function sendToGroupViaSenderKey(options) {
  const {
    contentHint,
    contentMessage,
    isPartialSend,
    messageId,
    online,
    recipients,
    recursionCount,
    sendOptions,
    sendTarget,
    sendType,
    timestamp
  } = options;
  const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
  const logId = sendTarget.idForLogging();
  log.info(`sendToGroupViaSenderKey/${logId}: Starting ${timestamp}, recursion count ${recursionCount}...`);
  if (recursionCount > MAX_RECURSION) {
    throw new Error(`sendToGroupViaSenderKey/${logId}: Too much recursion! Count is at ${recursionCount}`);
  }
  const groupId = sendTarget.getGroupId();
  if (!sendTarget.isValid()) {
    throw new Error(`sendToGroupViaSenderKey/${logId}: sendTarget is not valid!`);
  }
  if (contentHint !== ContentHint.DEFAULT && contentHint !== ContentHint.RESENDABLE && contentHint !== ContentHint.IMPLICIT) {
    throw new Error(`sendToGroupViaSenderKey/${logId}: Invalid contentHint ${contentHint}`);
  }
  (0, import_assert.strictAssert)(window.textsecure.messaging, "sendToGroupViaSenderKey: textsecure.messaging not available!");
  const EXPIRE_DURATION = getSenderKeyExpireDuration();
  const senderKeyInfo = sendTarget.getSenderKeyInfo();
  if (!senderKeyInfo) {
    log.info(`sendToGroupViaSenderKey/${logId}: Adding initial sender key info`);
    await sendTarget.saveSenderKeyInfo({
      createdAtDate: Date.now(),
      distributionId: import_UUID.UUID.generate().toString(),
      memberDevices: []
    });
    return sendToGroupViaSenderKey({
      ...options,
      recursionCount: recursionCount + 1
    });
  }
  if ((0, import_timestamp.isOlderThan)(senderKeyInfo.createdAtDate, EXPIRE_DURATION)) {
    const { createdAtDate: createdAtDate2 } = senderKeyInfo;
    log.info(`sendToGroupViaSenderKey/${logId}: Resetting sender key; ${createdAtDate2} is too old`);
    await resetSenderKey(sendTarget);
    return sendToGroupViaSenderKey({
      ...options,
      recursionCount: recursionCount + 1
    });
  }
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  const { devices: currentDevices, emptyIdentifiers } = await window.textsecure.storage.protocol.getOpenDevices(ourUuid, recipients);
  if (emptyIdentifiers.length > 0 && emptyIdentifiers.some(isIdentifierRegistered)) {
    await fetchKeysForIdentifiers(emptyIdentifiers);
    return sendToGroupViaSenderKey({
      ...options,
      recursionCount: recursionCount + 1
    });
  }
  const { memberDevices, distributionId, createdAtDate } = senderKeyInfo;
  const memberSet = new Set(sendTarget.getMembers());
  const [devicesForSenderKey, devicesForNormalSend] = (0, import_lodash.partition)(currentDevices, (device) => isValidSenderKeyRecipient(memberSet, device.identifier));
  const senderKeyRecipients = getUuidsFromDevices(devicesForSenderKey);
  const normalSendRecipients = getUuidsFromDevices(devicesForNormalSend);
  log.info(`sendToGroupViaSenderKey/${logId}: ${senderKeyRecipients.length} accounts for sender key (${devicesForSenderKey.length} devices), ${normalSendRecipients.length} accounts for normal send (${devicesForNormalSend.length} devices)`);
  if (senderKeyRecipients.length < 2) {
    throw new Error(`sendToGroupViaSenderKey/${logId}: Not enough recipients for Sender Key message. Failing over.`);
  }
  const {
    newToMemberDevices,
    newToMemberUuids,
    removedFromMemberDevices,
    removedFromMemberUuids
  } = _analyzeSenderKeyDevices(memberDevices, devicesForSenderKey, isPartialSend);
  const keyNeedsReset = Array.from(removedFromMemberUuids).some((uuid) => !sendTarget.hasMember(uuid));
  if (keyNeedsReset) {
    await resetSenderKey(sendTarget);
    return sendToGroupViaSenderKey({
      ...options,
      recursionCount: recursionCount + 1
    });
  }
  if (newToMemberUuids.length > 0) {
    log.info(`sendToGroupViaSenderKey/${logId}: Sending sender key to ${newToMemberUuids.length} members: ${JSON.stringify(newToMemberUuids)}`);
    try {
      await (0, import_handleMessageSend.handleMessageSend)(window.textsecure.messaging.sendSenderKeyDistributionMessage({
        contentHint: ContentHint.RESENDABLE,
        distributionId,
        groupId,
        identifiers: newToMemberUuids
      }, sendOptions ? { ...sendOptions, online: false } : void 0), { messageIds: [], sendType: "senderKeyDistributionMessage" });
    } catch (error) {
      if (error instanceof import_Errors.SendMessageProtoError) {
        throw new import_Errors.SendMessageProtoError({
          ...error,
          sendIsNotFinal: true
        });
      }
      throw error;
    }
    const updatedMemberDevices = [...memberDevices, ...newToMemberDevices];
    await sendTarget.saveSenderKeyInfo({
      createdAtDate,
      distributionId,
      memberDevices: updatedMemberDevices
    });
    return sendToGroupViaSenderKey({
      ...options,
      recursionCount: recursionCount + 1
    });
  }
  if (removedFromMemberDevices.length > 0) {
    const updatedMemberDevices = [
      ...(0, import_lodash.differenceWith)(memberDevices, removedFromMemberDevices, deviceComparator)
    ];
    await sendTarget.saveSenderKeyInfo({
      createdAtDate,
      distributionId,
      memberDevices: updatedMemberDevices
    });
  }
  let sendLogId;
  let senderKeyRecipientsWithDevices = {};
  devicesForSenderKey.forEach((item) => {
    const { id, identifier } = item;
    senderKeyRecipientsWithDevices[identifier] || (senderKeyRecipientsWithDevices[identifier] = []);
    senderKeyRecipientsWithDevices[identifier].push(id);
  });
  try {
    const messageBuffer = await encryptForSenderKey({
      contentHint,
      devices: devicesForSenderKey,
      distributionId,
      contentMessage: import_protobuf.SignalService.Content.encode(contentMessage).finish(),
      groupId
    });
    const accessKeys = getXorOfAccessKeys(devicesForSenderKey);
    const result = await window.textsecure.messaging.sendWithSenderKey(messageBuffer, accessKeys, timestamp, online);
    const parsed = import_WebAPI.multiRecipient200ResponseSchema.safeParse(result);
    if (parsed.success) {
      const { uuids404 } = parsed.data;
      if (uuids404 && uuids404.length > 0) {
        await _waitForAll({
          tasks: uuids404.map((uuid) => async () => markIdentifierUnregistered(uuid))
        });
      }
      senderKeyRecipientsWithDevices = (0, import_lodash.omit)(senderKeyRecipientsWithDevices, uuids404 || []);
    } else {
      log.error(`sendToGroupViaSenderKey/${logId}: Server returned unexpected 200 response ${JSON.stringify(parsed.error.flatten())}`);
    }
    if ((0, import_handleMessageSend.shouldSaveProto)(sendType)) {
      sendLogId = await window.Signal.Data.insertSentProto({
        contentHint,
        proto: Buffer.from(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
        timestamp
      }, {
        recipients: senderKeyRecipientsWithDevices,
        messageIds: messageId ? [messageId] : []
      });
    }
  } catch (error) {
    if (error.code === ERROR_EXPIRED_OR_MISSING_DEVICES) {
      await handle409Response(logId, error);
      return sendToGroupViaSenderKey({
        ...options,
        recursionCount: recursionCount + 1
      });
    }
    if (error.code === ERROR_STALE_DEVICES) {
      await handle410Response(sendTarget, error);
      return sendToGroupViaSenderKey({
        ...options,
        recursionCount: recursionCount + 1
      });
    }
    if (error.code === import_libsignal_client.ErrorCode.InvalidRegistrationId && error.addr) {
      const address = error.addr;
      const name = address.name();
      const brokenAccount = window.ConversationController.get(name);
      if (brokenAccount) {
        log.warn(`sendToGroupViaSenderKey/${logId}: Disabling sealed sender for ${brokenAccount.idForLogging()}`);
        brokenAccount.set({ sealedSender: import_SealedSender.SEALED_SENDER.DISABLED });
        window.Signal.Data.updateConversation(brokenAccount.attributes);
        return sendToGroupViaSenderKey({
          ...options,
          recursionCount: recursionCount + 1
        });
      }
    }
    throw new Error(`sendToGroupViaSenderKey/${logId}: Returned unexpected error ${error.code}. Failing over. ${error.stack || error}`);
  }
  if (normalSendRecipients.length === 0) {
    return {
      dataMessage: contentMessage.dataMessage ? import_protobuf.SignalService.DataMessage.encode(contentMessage.dataMessage).finish() : void 0,
      successfulIdentifiers: senderKeyRecipients,
      unidentifiedDeliveries: senderKeyRecipients,
      contentHint,
      timestamp,
      contentProto: Buffer.from(import_protobuf.SignalService.Content.encode(contentMessage).finish()),
      recipients: senderKeyRecipientsWithDevices
    };
  }
  const sendLogCallback = /* @__PURE__ */ __name(async ({
    identifier,
    deviceIds
  }) => {
    if (!(0, import_handleMessageSend.shouldSaveProto)(sendType)) {
      return;
    }
    const sentToConversation = window.ConversationController.get(identifier);
    if (!sentToConversation) {
      log.warn(`sendToGroupViaSenderKey/callback: Unable to find conversation for identifier ${identifier}`);
      return;
    }
    const recipientUuid = sentToConversation.get("uuid");
    if (!recipientUuid) {
      log.warn(`sendToGroupViaSenderKey/callback: Conversation ${sentToConversation.idForLogging()} had no UUID`);
      return;
    }
    await window.Signal.Data.insertProtoRecipients({
      id: sendLogId,
      recipientUuid,
      deviceIds
    });
  }, "sendLogCallback");
  try {
    const normalSendResult = await window.textsecure.messaging.sendGroupProto({
      contentHint,
      groupId,
      options: { ...sendOptions, online },
      proto: contentMessage,
      recipients: normalSendRecipients,
      sendLogCallback,
      timestamp
    });
    return mergeSendResult({
      result: normalSendResult,
      senderKeyRecipients,
      senderKeyRecipientsWithDevices
    });
  } catch (error) {
    if (error instanceof import_Errors.SendMessageProtoError) {
      const callbackResult = mergeSendResult({
        result: error,
        senderKeyRecipients,
        senderKeyRecipientsWithDevices
      });
      throw new import_Errors.SendMessageProtoError(callbackResult);
    }
    throw error;
  }
}
function mergeSendResult({
  result,
  senderKeyRecipients,
  senderKeyRecipientsWithDevices
}) {
  return {
    ...result,
    successfulIdentifiers: [
      ...result.successfulIdentifiers || [],
      ...senderKeyRecipients
    ],
    unidentifiedDeliveries: [
      ...result.unidentifiedDeliveries || [],
      ...senderKeyRecipients
    ],
    recipients: {
      ...result.recipients,
      ...senderKeyRecipientsWithDevices
    }
  };
}
const MAX_SENDER_KEY_EXPIRE_DURATION = 90 * DAY;
function getSenderKeyExpireDuration() {
  try {
    const parsed = (0, import_parseIntOrThrow.parseIntOrThrow)((0, import_RemoteConfig.getValue)("desktop.senderKeyMaxAge"), "getSenderKeyExpireDuration");
    const duration = Math.min(parsed, MAX_SENDER_KEY_EXPIRE_DURATION);
    log.info(`getSenderKeyExpireDuration: using expire duration of ${duration}`);
    return duration;
  } catch (error) {
    log.warn(`getSenderKeyExpireDuration: Failed to parse integer. Using default of ${MAX_SENDER_KEY_EXPIRE_DURATION}.`, error && error.stack ? error.stack : error);
    return MAX_SENDER_KEY_EXPIRE_DURATION;
  }
}
function _shouldFailSend(error, logId) {
  const logError = /* @__PURE__ */ __name((message) => {
    log.error(`_shouldFailSend/${logId}: ${message}`);
  }, "logError");
  if (error instanceof Error && error.message.includes("untrusted identity")) {
    logError("'untrusted identity' error, failing.");
    return true;
  }
  if (error instanceof import_Errors.OutgoingIdentityKeyError) {
    logError("OutgoingIdentityKeyError error, failing.");
    return true;
  }
  if (error instanceof import_Errors.UnregisteredUserError) {
    logError("UnregisteredUserError error, failing.");
    return true;
  }
  if (error instanceof import_Errors.ConnectTimeoutError) {
    logError("ConnectTimeoutError error, failing.");
    return true;
  }
  if ((0, import_isRecord.isRecord)(error) && typeof error.code === "number") {
    if (error.code === 400) {
      logError("Invalid request, failing.");
      return true;
    }
    if (error.code === 401) {
      logError("Permissions error, failing.");
      return true;
    }
    if (error.code === 404) {
      logError("Missing user or endpoint error, failing.");
      return true;
    }
    if (error.code === 413 || error.code === 429) {
      logError("Rate limit error, failing.");
      return true;
    }
    if (error.code === 428) {
      logError("Challenge error, failing.");
      return true;
    }
    if (error.code === 500) {
      logError("Server error, failing.");
      return true;
    }
    if (error.code === 508) {
      logError("Fail job error, failing.");
      return true;
    }
  }
  if (error instanceof import_Errors.SendMessageProtoError) {
    if (!error.errors || !error.errors.length) {
      logError("SendMessageProtoError had no errors, failing.");
      return true;
    }
    for (const innerError of error.errors) {
      const shouldFail = _shouldFailSend(innerError, logId);
      if (shouldFail) {
        return true;
      }
    }
  }
  return false;
}
async function _waitForAll({
  tasks,
  maxConcurrency = MAX_CONCURRENCY
}) {
  const queue = new import_p_queue.default({
    concurrency: maxConcurrency,
    timeout: 2 * 60 * 1e3,
    throwOnTimeout: true
  });
  return queue.addAll(tasks);
}
function getRecipients(options) {
  if (options.groupV2) {
    return options.groupV2.members;
  }
  if (options.groupV1) {
    return options.groupV1.members;
  }
  throw new Error("getRecipients: Unable to extract recipients!");
}
async function markIdentifierUnregistered(identifier) {
  const conversation = window.ConversationController.getOrCreate(identifier, "private");
  conversation.setUnregistered();
  window.Signal.Data.updateConversation(conversation.attributes);
  const uuid = import_UUID.UUID.lookup(identifier);
  if (!uuid) {
    log.warn(`No uuid found for ${identifier}`);
    return;
  }
  await window.textsecure.storage.protocol.archiveAllSessions(uuid);
}
function isIdentifierRegistered(identifier) {
  const conversation = window.ConversationController.getOrCreate(identifier, "private");
  const isUnregistered = conversation.isUnregistered();
  return !isUnregistered;
}
async function handle409Response(logId, error) {
  const parsed = import_WebAPI.multiRecipient409ResponseSchema.safeParse(error.response);
  if (parsed.success) {
    await _waitForAll({
      tasks: parsed.data.map((item) => async () => {
        const { uuid, devices } = item;
        if (devices.missingDevices && devices.missingDevices.length > 0) {
          await fetchKeysForIdentifier(uuid, devices.missingDevices);
        }
        if (devices.extraDevices && devices.extraDevices.length > 0) {
          const ourUuid = window.textsecure.storage.user.getCheckedUuid();
          await _waitForAll({
            tasks: devices.extraDevices.map((deviceId) => async () => {
              await window.textsecure.storage.protocol.archiveSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, import_Address.Address.create(uuid, deviceId)));
            })
          });
        }
      }),
      maxConcurrency: 2
    });
  } else {
    log.error(`handle409Response/${logId}: Server returned unexpected 409 response ${JSON.stringify(parsed.error.flatten())}`);
    throw error;
  }
}
async function handle410Response(sendTarget, error) {
  const logId = sendTarget.idForLogging();
  const parsed = import_WebAPI.multiRecipient410ResponseSchema.safeParse(error.response);
  if (parsed.success) {
    await _waitForAll({
      tasks: parsed.data.map((item) => async () => {
        const { uuid, devices } = item;
        if (devices.staleDevices && devices.staleDevices.length > 0) {
          const ourUuid = window.textsecure.storage.user.getCheckedUuid();
          await _waitForAll({
            tasks: devices.staleDevices.map((deviceId) => async () => {
              await window.textsecure.storage.protocol.archiveSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, import_Address.Address.create(uuid, deviceId)));
            })
          });
          await fetchKeysForIdentifier(uuid, devices.staleDevices);
          const senderKeyInfo = sendTarget.getSenderKeyInfo();
          if (senderKeyInfo) {
            const devicesToRemove = devices.staleDevices.map((id) => ({ id, identifier: uuid }));
            await sendTarget.saveSenderKeyInfo({
              ...senderKeyInfo,
              memberDevices: (0, import_lodash.differenceWith)(senderKeyInfo.memberDevices, devicesToRemove, partialDeviceComparator)
            });
          }
        }
      }),
      maxConcurrency: 2
    });
  } else {
    log.error(`handle410Response/${logId}: Server returned unexpected 410 response ${JSON.stringify(parsed.error.flatten())}`);
    throw error;
  }
}
function getXorOfAccessKeys(devices) {
  const uuids = getUuidsFromDevices(devices);
  const result = Buffer.alloc(ACCESS_KEY_LENGTH);
  (0, import_assert.strictAssert)(result.length === ACCESS_KEY_LENGTH, "getXorOfAccessKeys starting value");
  uuids.forEach((uuid) => {
    const conversation = window.ConversationController.get(uuid);
    if (!conversation) {
      throw new Error(`getXorOfAccessKeys: Unable to fetch conversation for UUID ${uuid}`);
    }
    const accessKey = getAccessKey(conversation.attributes);
    if (!accessKey) {
      throw new Error(`getXorOfAccessKeys: No accessKey for UUID ${uuid}`);
    }
    const accessKeyBuffer = Buffer.from(accessKey, "base64");
    if (accessKeyBuffer.length !== ACCESS_KEY_LENGTH) {
      throw new Error(`getXorOfAccessKeys: Access key for ${uuid} had length ${accessKeyBuffer.length}`);
    }
    for (let i = 0; i < ACCESS_KEY_LENGTH; i += 1) {
      result[i] ^= accessKeyBuffer[i];
    }
  });
  return result;
}
async function encryptForSenderKey({
  contentHint,
  contentMessage,
  devices,
  distributionId,
  groupId
}) {
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  const ourDeviceId = window.textsecure.storage.user.getDeviceId();
  if (!ourDeviceId) {
    throw new Error("encryptForSenderKey: Unable to fetch our uuid or deviceId");
  }
  const sender = import_libsignal_client.ProtocolAddress.new(ourUuid.toString(), (0, import_parseIntOrThrow.parseIntOrThrow)(ourDeviceId, "encryptForSenderKey, ourDeviceId"));
  const ourAddress = getOurAddress();
  const senderKeyStore = new import_LibSignalStores.SenderKeys({ ourUuid, zone: import_SignalProtocolStore.GLOBAL_ZONE });
  const message = Buffer.from((0, import_OutgoingMessage.padMessage)(contentMessage));
  const ciphertextMessage = await window.textsecure.storage.protocol.enqueueSenderKeyJob(new import_QualifiedAddress.QualifiedAddress(ourUuid, ourAddress), () => (0, import_libsignal_client.groupEncrypt)(sender, distributionId, senderKeyStore, message));
  const groupIdBuffer = groupId ? Buffer.from(groupId, "base64") : null;
  const senderCertificateObject = await import_senderCertificate.senderCertificateService.get(import_OutgoingMessage.SenderCertificateMode.WithoutE164);
  if (!senderCertificateObject) {
    throw new Error("encryptForSenderKey: Unable to fetch sender certificate!");
  }
  const senderCertificate = import_libsignal_client.SenderCertificate.deserialize(Buffer.from(senderCertificateObject.serialized));
  const content = import_libsignal_client.UnidentifiedSenderMessageContent.new(ciphertextMessage, senderCertificate, contentHint, groupIdBuffer);
  const recipients = devices.slice().sort((a, b) => {
    if (a.identifier === b.identifier) {
      return 0;
    }
    if (a.identifier < b.identifier) {
      return -1;
    }
    return 1;
  }).map((device) => {
    return import_libsignal_client.ProtocolAddress.new(import_UUID.UUID.checkedLookup(device.identifier).toString(), device.id);
  });
  const identityKeyStore = new import_LibSignalStores.IdentityKeys({ ourUuid });
  const sessionStore = new import_LibSignalStores.Sessions({ ourUuid });
  return (0, import_libsignal_client.sealedSenderMultiRecipientEncrypt)(content, recipients, identityKeyStore, sessionStore);
}
function isValidSenderKeyRecipient(members, uuid) {
  const memberConversation = window.ConversationController.get(uuid);
  if (!memberConversation) {
    log.warn(`isValidSenderKeyRecipient: Missing conversation model for member ${uuid}`);
    return false;
  }
  if (!members.has(memberConversation)) {
    log.info(`isValidSenderKeyRecipient: Sending to ${uuid}, not a group member`);
    return false;
  }
  const capabilities = memberConversation.get("capabilities");
  if (!capabilities?.senderKey) {
    return false;
  }
  if (!getAccessKey(memberConversation.attributes)) {
    return false;
  }
  if (memberConversation.isUnregistered()) {
    log.warn(`isValidSenderKeyRecipient: Member ${uuid} is unregistered`);
    return false;
  }
  return true;
}
function deviceComparator(left, right) {
  return Boolean(left && right && left.id === right.id && left.identifier === right.identifier && left.registrationId === right.registrationId);
}
function partialDeviceComparator(left, right) {
  return Boolean(left && right && left.id === right.id && left.identifier === right.identifier);
}
function getUuidsFromDevices(devices) {
  const uuids = /* @__PURE__ */ new Set();
  devices.forEach((device) => {
    uuids.add(device.identifier);
  });
  return Array.from(uuids);
}
function _analyzeSenderKeyDevices(memberDevices, devicesForSend, isPartialSend) {
  const newToMemberDevices = (0, import_lodash.differenceWith)(devicesForSend, memberDevices, deviceComparator);
  const newToMemberUuids = getUuidsFromDevices(newToMemberDevices);
  if (isPartialSend) {
    return {
      newToMemberDevices,
      newToMemberUuids,
      removedFromMemberDevices: [],
      removedFromMemberUuids: []
    };
  }
  const removedFromMemberDevices = (0, import_lodash.differenceWith)(memberDevices, devicesForSend, deviceComparator);
  const removedFromMemberUuids = getUuidsFromDevices(removedFromMemberDevices);
  return {
    newToMemberDevices,
    newToMemberUuids,
    removedFromMemberDevices,
    removedFromMemberUuids
  };
}
function getOurAddress() {
  const ourUuid = window.textsecure.storage.user.getCheckedUuid();
  const ourDeviceId = window.textsecure.storage.user.getDeviceId();
  if (!ourDeviceId) {
    throw new Error("getOurAddress: Unable to fetch our deviceId");
  }
  return new import_Address.Address(ourUuid, ourDeviceId);
}
async function resetSenderKey(sendTarget) {
  const logId = sendTarget.idForLogging();
  log.info(`resetSenderKey/${logId}: Sender key needs reset. Clearing data...`);
  const senderKeyInfo = sendTarget.getSenderKeyInfo();
  if (!senderKeyInfo) {
    log.warn(`resetSenderKey/${logId}: No sender key info`);
    return;
  }
  const { distributionId } = senderKeyInfo;
  const ourAddress = getOurAddress();
  await sendTarget.saveSenderKeyInfo({
    createdAtDate: Date.now(),
    distributionId,
    memberDevices: []
  });
  const ourUuid = window.storage.user.getCheckedUuid();
  await window.textsecure.storage.protocol.removeSenderKey(new import_QualifiedAddress.QualifiedAddress(ourUuid, ourAddress), distributionId);
}
function getAccessKey(attributes) {
  const { sealedSender, accessKey } = attributes;
  if (sealedSender === import_SealedSender.SEALED_SENDER.ENABLED) {
    return accessKey || void 0;
  }
  if (sealedSender === import_SealedSender.SEALED_SENDER.UNKNOWN || sealedSender === import_SealedSender.SEALED_SENDER.UNRESTRICTED) {
    return ZERO_ACCESS_KEY;
  }
  return void 0;
}
async function fetchKeysForIdentifiers(identifiers) {
  log.info(`fetchKeysForIdentifiers: Fetching keys for ${identifiers.length} identifiers`);
  try {
    await _waitForAll({
      tasks: identifiers.map((identifier) => async () => fetchKeysForIdentifier(identifier))
    });
  } catch (error) {
    log.error("fetchKeysForIdentifiers: Failed to fetch keys:", error && error.stack ? error.stack : error);
    throw error;
  }
}
async function fetchKeysForIdentifier(identifier, devices) {
  log.info(`fetchKeysForIdentifier: Fetching ${devices || "all"} devices for ${identifier}`);
  if (!window.textsecure?.messaging?.server) {
    throw new Error("fetchKeysForIdentifier: No server available!");
  }
  const emptyConversation = window.ConversationController.getOrCreate(identifier, "private");
  try {
    const { accessKeyFailed } = await (0, import_getKeysForIdentifier.getKeysForIdentifier)(identifier, window.textsecure?.messaging?.server, devices, getAccessKey(emptyConversation.attributes));
    if (accessKeyFailed) {
      log.info(`fetchKeysForIdentifiers: Setting sealedSender to DISABLED for conversation ${emptyConversation.idForLogging()}`);
      emptyConversation.set({
        sealedSender: import_SealedSender.SEALED_SENDER.DISABLED
      });
      window.Signal.Data.updateConversation(emptyConversation.attributes);
    }
  } catch (error) {
    if (error instanceof import_Errors.UnregisteredUserError) {
      await markIdentifierUnregistered(identifier);
      return;
    }
    throw error;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _analyzeSenderKeyDevices,
  _shouldFailSend,
  _waitForAll,
  sendContentMessageToGroup,
  sendToGroup,
  sendToGroupViaSenderKey
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZFRvR3JvdXAudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBkaWZmZXJlbmNlV2l0aCwgb21pdCwgcGFydGl0aW9uIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBQUXVldWUgZnJvbSAncC1xdWV1ZSc7XG5cbmltcG9ydCB7XG4gIEVycm9yQ29kZSxcbiAgZ3JvdXBFbmNyeXB0LFxuICBQcm90b2NvbEFkZHJlc3MsXG4gIHNlYWxlZFNlbmRlck11bHRpUmVjaXBpZW50RW5jcnlwdCxcbiAgU2VuZGVyQ2VydGlmaWNhdGUsXG4gIFVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2VDb250ZW50LFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgc2VuZGVyQ2VydGlmaWNhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2VuZGVyQ2VydGlmaWNhdGUnO1xuaW1wb3J0IHR5cGUgeyBTZW5kTG9nQ2FsbGJhY2tUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9PdXRnb2luZ01lc3NhZ2UnO1xuaW1wb3J0IHtcbiAgcGFkTWVzc2FnZSxcbiAgU2VuZGVyQ2VydGlmaWNhdGVNb2RlLFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL091dGdvaW5nTWVzc2FnZSc7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgeyBnZXRWYWx1ZSwgaXNFbmFibGVkIH0gZnJvbSAnLi4vUmVtb3RlQ29uZmlnJztcbmltcG9ydCB7IGlzUmVjb3JkIH0gZnJvbSAnLi9pc1JlY29yZCc7XG5cbmltcG9ydCB7IGlzT2xkZXJUaGFuIH0gZnJvbSAnLi90aW1lc3RhbXAnO1xuaW1wb3J0IHR5cGUge1xuICBHcm91cFNlbmRPcHRpb25zVHlwZSxcbiAgU2VuZE9wdGlvbnNUeXBlLFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcbmltcG9ydCB7XG4gIENvbm5lY3RUaW1lb3V0RXJyb3IsXG4gIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvcixcbiAgU2VuZE1lc3NhZ2VQcm90b0Vycm9yLFxuICBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IsXG59IGZyb20gJy4uL3RleHRzZWN1cmUvRXJyb3JzJztcbmltcG9ydCB0eXBlIHsgSFRUUEVycm9yIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9FcnJvcnMnO1xuaW1wb3J0IHsgSWRlbnRpdHlLZXlzLCBTZW5kZXJLZXlzLCBTZXNzaW9ucyB9IGZyb20gJy4uL0xpYlNpZ25hbFN0b3Jlcyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbk1vZGVsIH0gZnJvbSAnLi4vbW9kZWxzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBEZXZpY2VUeXBlLCBDYWxsYmFja1Jlc3VsdFR5cGUgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1R5cGVzLmQnO1xuaW1wb3J0IHsgZ2V0S2V5c0ZvcklkZW50aWZpZXIgfSBmcm9tICcuLi90ZXh0c2VjdXJlL2dldEtleXNGb3JJZGVudGlmaWVyJztcbmltcG9ydCB0eXBlIHtcbiAgQ29udmVyc2F0aW9uQXR0cmlidXRlc1R5cGUsXG4gIFNlbmRlcktleUluZm9UeXBlLFxufSBmcm9tICcuLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgU2VuZFR5cGVzVHlwZSB9IGZyb20gJy4vaGFuZGxlTWVzc2FnZVNlbmQnO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQsIHNob3VsZFNhdmVQcm90byB9IGZyb20gJy4vaGFuZGxlTWVzc2FnZVNlbmQnO1xuaW1wb3J0IHsgU0VBTEVEX1NFTkRFUiB9IGZyb20gJy4uL3R5cGVzL1NlYWxlZFNlbmRlcic7XG5pbXBvcnQgeyBwYXJzZUludE9yVGhyb3cgfSBmcm9tICcuL3BhcnNlSW50T3JUaHJvdyc7XG5pbXBvcnQge1xuICBtdWx0aVJlY2lwaWVudDIwMFJlc3BvbnNlU2NoZW1hLFxuICBtdWx0aVJlY2lwaWVudDQwOVJlc3BvbnNlU2NoZW1hLFxuICBtdWx0aVJlY2lwaWVudDQxMFJlc3BvbnNlU2NoZW1hLFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL1dlYkFQSSc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuL2Fzc2VydCc7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgR0xPQkFMX1pPTkUgfSBmcm9tICcuLi9TaWduYWxQcm90b2NvbFN0b3JlJztcblxuY29uc3QgRVJST1JfRVhQSVJFRF9PUl9NSVNTSU5HX0RFVklDRVMgPSA0MDk7XG5jb25zdCBFUlJPUl9TVEFMRV9ERVZJQ0VTID0gNDEwO1xuXG5jb25zdCBIT1VSID0gNjAgKiA2MCAqIDEwMDA7XG5jb25zdCBEQVkgPSAyNCAqIEhPVVI7XG5cbmNvbnN0IE1BWF9DT05DVVJSRU5DWSA9IDU7XG5cbi8vIHNlbmRXaXRoU2VuZGVyS2V5IGlzIHJlY3Vyc2l2ZSwgYnV0IHdlIGRvbid0IHdhbnQgdG8gbG9vcCBiYWNrIHRvbyBtYW55IHRpbWVzLlxuY29uc3QgTUFYX1JFQ1VSU0lPTiA9IDEwO1xuXG5jb25zdCBBQ0NFU1NfS0VZX0xFTkdUSCA9IDE2O1xuY29uc3QgWkVST19BQ0NFU1NfS0VZID0gQnl0ZXMudG9CYXNlNjQobmV3IFVpbnQ4QXJyYXkoQUNDRVNTX0tFWV9MRU5HVEgpKTtcblxuLy8gUHVibGljIEFQSTpcblxuZXhwb3J0IHR5cGUgU2VuZGVyS2V5VGFyZ2V0VHlwZSA9IHtcbiAgZ2V0R3JvdXBJZDogKCkgPT4gc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBnZXRNZW1iZXJzOiAoKSA9PiBBcnJheTxDb252ZXJzYXRpb25Nb2RlbD47XG4gIGhhc01lbWJlcjogKGlkOiBzdHJpbmcpID0+IGJvb2xlYW47XG4gIGlkRm9yTG9nZ2luZzogKCkgPT4gc3RyaW5nO1xuICBpc0dyb3VwVjI6ICgpID0+IGJvb2xlYW47XG4gIGlzVmFsaWQ6ICgpID0+IGJvb2xlYW47XG5cbiAgZ2V0U2VuZGVyS2V5SW5mbzogKCkgPT4gU2VuZGVyS2V5SW5mb1R5cGUgfCB1bmRlZmluZWQ7XG4gIHNhdmVTZW5kZXJLZXlJbmZvOiAoc2VuZGVyS2V5SW5mbzogU2VuZGVyS2V5SW5mb1R5cGUpID0+IFByb21pc2U8dm9pZD47XG59O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFRvR3JvdXAoe1xuICBhYm9ydFNpZ25hbCxcbiAgY29udGVudEhpbnQsXG4gIGdyb3VwU2VuZE9wdGlvbnMsXG4gIGlzUGFydGlhbFNlbmQsXG4gIG1lc3NhZ2VJZCxcbiAgc2VuZE9wdGlvbnMsXG4gIHNlbmRUYXJnZXQsXG4gIHNlbmRUeXBlLFxufToge1xuICBhYm9ydFNpZ25hbD86IEFib3J0U2lnbmFsO1xuICBjb250ZW50SGludDogbnVtYmVyO1xuICBncm91cFNlbmRPcHRpb25zOiBHcm91cFNlbmRPcHRpb25zVHlwZTtcbiAgaXNQYXJ0aWFsU2VuZD86IGJvb2xlYW47XG4gIG1lc3NhZ2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBzZW5kT3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgc2VuZFRhcmdldDogU2VuZGVyS2V5VGFyZ2V0VHlwZTtcbiAgc2VuZFR5cGU6IFNlbmRUeXBlc1R5cGU7XG59KTogUHJvbWlzZTxDYWxsYmFja1Jlc3VsdFR5cGU+IHtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZyxcbiAgICAnc2VuZFRvR3JvdXA6IHRleHRzZWN1cmUubWVzc2FnaW5nIG5vdCBhdmFpbGFibGUhJ1xuICApO1xuXG4gIGNvbnN0IHsgdGltZXN0YW1wIH0gPSBncm91cFNlbmRPcHRpb25zO1xuICBjb25zdCByZWNpcGllbnRzID0gZ2V0UmVjaXBpZW50cyhncm91cFNlbmRPcHRpb25zKTtcblxuICAvLyBGaXJzdCwgZG8gdGhlIGF0dGFjaG1lbnQgdXBsb2FkIGFuZCBwcmVwYXJlIHRoZSBwcm90byB3ZSdsbCBiZSBzZW5kaW5nXG4gIGNvbnN0IHByb3RvQXR0cmlidXRlcyA9XG4gICAgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLmdldEF0dHJzRnJvbUdyb3VwT3B0aW9ucyhncm91cFNlbmRPcHRpb25zKTtcbiAgY29uc3QgY29udGVudE1lc3NhZ2UgPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcuZ2V0Q29udGVudE1lc3NhZ2UoXG4gICAgcHJvdG9BdHRyaWJ1dGVzXG4gICk7XG5cbiAgLy8gQXR0YWNobWVudCB1cGxvYWQgbWlnaHQgdGFrZSB0b28gbG9uZyB0byBzdWNjZWVkIC0gd2UgZG9uJ3Qgd2FudCB0byBwcm9jZWVkXG4gIC8vIHdpdGggdGhlIHNlbmQgaWYgdGhlIGNhbGxlciBhYm9ydGVkIHRoaXMgY2FsbC5cbiAgaWYgKGFib3J0U2lnbmFsPy5hYm9ydGVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdzZW5kVG9Hcm91cCB3YXMgYWJvcnRlZCcpO1xuICB9XG5cbiAgcmV0dXJuIHNlbmRDb250ZW50TWVzc2FnZVRvR3JvdXAoe1xuICAgIGNvbnRlbnRIaW50LFxuICAgIGNvbnRlbnRNZXNzYWdlLFxuICAgIGlzUGFydGlhbFNlbmQsXG4gICAgbWVzc2FnZUlkLFxuICAgIHJlY2lwaWVudHMsXG4gICAgc2VuZE9wdGlvbnMsXG4gICAgc2VuZFRhcmdldCxcbiAgICBzZW5kVHlwZSxcbiAgICB0aW1lc3RhbXAsXG4gIH0pO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZENvbnRlbnRNZXNzYWdlVG9Hcm91cCh7XG4gIGNvbnRlbnRIaW50LFxuICBjb250ZW50TWVzc2FnZSxcbiAgaXNQYXJ0aWFsU2VuZCxcbiAgbWVzc2FnZUlkLFxuICBvbmxpbmUsXG4gIHJlY2lwaWVudHMsXG4gIHNlbmRPcHRpb25zLFxuICBzZW5kVGFyZ2V0LFxuICBzZW5kVHlwZSxcbiAgdGltZXN0YW1wLFxufToge1xuICBjb250ZW50SGludDogbnVtYmVyO1xuICBjb250ZW50TWVzc2FnZTogUHJvdG8uQ29udGVudDtcbiAgaXNQYXJ0aWFsU2VuZD86IGJvb2xlYW47XG4gIG1lc3NhZ2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBvbmxpbmU/OiBib29sZWFuO1xuICByZWNpcGllbnRzOiBBcnJheTxzdHJpbmc+O1xuICBzZW5kT3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgc2VuZFRhcmdldDogU2VuZGVyS2V5VGFyZ2V0VHlwZTtcbiAgc2VuZFR5cGU6IFNlbmRUeXBlc1R5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufSk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IGxvZ0lkID0gc2VuZFRhcmdldC5pZEZvckxvZ2dpbmcoKTtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZyxcbiAgICAnc2VuZENvbnRlbnRNZXNzYWdlVG9Hcm91cDogdGV4dHNlY3VyZS5tZXNzYWdpbmcgbm90IGF2YWlsYWJsZSEnXG4gICk7XG5cbiAgY29uc3Qgb3VyQ29udmVyc2F0aW9uSWQgPVxuICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuICBjb25zdCBvdXJDb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQob3VyQ29udmVyc2F0aW9uSWQpO1xuXG4gIGlmIChcbiAgICBpc0VuYWJsZWQoJ2Rlc2t0b3Auc2VuZFNlbmRlcktleTMnKSAmJlxuICAgIGlzRW5hYmxlZCgnZGVza3RvcC5zZW5kZXJLZXkuc2VuZCcpICYmXG4gICAgb3VyQ29udmVyc2F0aW9uPy5nZXQoJ2NhcGFiaWxpdGllcycpPy5zZW5kZXJLZXkgJiZcbiAgICBzZW5kVGFyZ2V0LmlzVmFsaWQoKVxuICApIHtcbiAgICB0cnkge1xuICAgICAgcmV0dXJuIGF3YWl0IHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5KHtcbiAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgIGNvbnRlbnRNZXNzYWdlLFxuICAgICAgICBpc1BhcnRpYWxTZW5kLFxuICAgICAgICBtZXNzYWdlSWQsXG4gICAgICAgIG9ubGluZSxcbiAgICAgICAgcmVjaXBpZW50cyxcbiAgICAgICAgcmVjdXJzaW9uQ291bnQ6IDAsXG4gICAgICAgIHNlbmRPcHRpb25zLFxuICAgICAgICBzZW5kVGFyZ2V0LFxuICAgICAgICBzZW5kVHlwZSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfSk7XG4gICAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICAgIGlmICghKGVycm9yIGluc3RhbmNlb2YgRXJyb3IpKSB7XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgICAgfVxuXG4gICAgICBpZiAoX3Nob3VsZEZhaWxTZW5kKGVycm9yLCBsb2dJZCkpIHtcbiAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICB9XG5cbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgYHNlbmRUb0dyb3VwLyR7bG9nSWR9OiBTZW5kZXIgS2V5IHNlbmQgZmFpbGVkLCBsb2dnaW5nLCBwcm9jZWVkaW5nIHRvIG5vcm1hbCBzZW5kYCxcbiAgICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgICApO1xuICAgIH1cbiAgfVxuXG4gIGNvbnN0IHNlbmRMb2dDYWxsYmFjayA9IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZy5tYWtlU2VuZExvZ0NhbGxiYWNrKHtcbiAgICBjb250ZW50SGludCxcbiAgICBtZXNzYWdlSWQsXG4gICAgcHJvdG86IEJ1ZmZlci5mcm9tKFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKSksXG4gICAgc2VuZFR5cGUsXG4gICAgdGltZXN0YW1wLFxuICB9KTtcbiAgY29uc3QgZ3JvdXBJZCA9IHNlbmRUYXJnZXQuaXNHcm91cFYyKCkgPyBzZW5kVGFyZ2V0LmdldEdyb3VwSWQoKSA6IHVuZGVmaW5lZDtcbiAgcmV0dXJuIHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZy5zZW5kR3JvdXBQcm90byh7XG4gICAgY29udGVudEhpbnQsXG4gICAgZ3JvdXBJZCxcbiAgICBvcHRpb25zOiB7IC4uLnNlbmRPcHRpb25zLCBvbmxpbmUgfSxcbiAgICBwcm90bzogY29udGVudE1lc3NhZ2UsXG4gICAgcmVjaXBpZW50cyxcbiAgICBzZW5kTG9nQ2FsbGJhY2ssXG4gICAgdGltZXN0YW1wLFxuICB9KTtcbn1cblxuLy8gVGhlIFByaW1hcnkgU2VuZGVyIEtleSB3b3JrZmxvd1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkob3B0aW9uczoge1xuICBjb250ZW50SGludDogbnVtYmVyO1xuICBjb250ZW50TWVzc2FnZTogUHJvdG8uQ29udGVudDtcbiAgaXNQYXJ0aWFsU2VuZD86IGJvb2xlYW47XG4gIG1lc3NhZ2VJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICBvbmxpbmU/OiBib29sZWFuO1xuICByZWNpcGllbnRzOiBBcnJheTxzdHJpbmc+O1xuICByZWN1cnNpb25Db3VudDogbnVtYmVyO1xuICBzZW5kT3B0aW9ucz86IFNlbmRPcHRpb25zVHlwZTtcbiAgc2VuZFRhcmdldDogU2VuZGVyS2V5VGFyZ2V0VHlwZTtcbiAgc2VuZFR5cGU6IFNlbmRUeXBlc1R5cGU7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufSk6IFByb21pc2U8Q2FsbGJhY2tSZXN1bHRUeXBlPiB7XG4gIGNvbnN0IHtcbiAgICBjb250ZW50SGludCxcbiAgICBjb250ZW50TWVzc2FnZSxcbiAgICBpc1BhcnRpYWxTZW5kLFxuICAgIG1lc3NhZ2VJZCxcbiAgICBvbmxpbmUsXG4gICAgcmVjaXBpZW50cyxcbiAgICByZWN1cnNpb25Db3VudCxcbiAgICBzZW5kT3B0aW9ucyxcbiAgICBzZW5kVGFyZ2V0LFxuICAgIHNlbmRUeXBlLFxuICAgIHRpbWVzdGFtcCxcbiAgfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcblxuICBjb25zdCBsb2dJZCA9IHNlbmRUYXJnZXQuaWRGb3JMb2dnaW5nKCk7XG4gIGxvZy5pbmZvKFxuICAgIGBzZW5kVG9Hcm91cFZpYVNlbmRlcktleS8ke2xvZ0lkfTogU3RhcnRpbmcgJHt0aW1lc3RhbXB9LCByZWN1cnNpb24gY291bnQgJHtyZWN1cnNpb25Db3VudH0uLi5gXG4gICk7XG5cbiAgaWYgKHJlY3Vyc2lvbkNvdW50ID4gTUFYX1JFQ1VSU0lPTikge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzZW5kVG9Hcm91cFZpYVNlbmRlcktleS8ke2xvZ0lkfTogVG9vIG11Y2ggcmVjdXJzaW9uISBDb3VudCBpcyBhdCAke3JlY3Vyc2lvbkNvdW50fWBcbiAgICApO1xuICB9XG5cbiAgY29uc3QgZ3JvdXBJZCA9IHNlbmRUYXJnZXQuZ2V0R3JvdXBJZCgpO1xuICBpZiAoIXNlbmRUYXJnZXQuaXNWYWxpZCgpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5LyR7bG9nSWR9OiBzZW5kVGFyZ2V0IGlzIG5vdCB2YWxpZCFgXG4gICAgKTtcbiAgfVxuXG4gIGlmIChcbiAgICBjb250ZW50SGludCAhPT0gQ29udGVudEhpbnQuREVGQVVMVCAmJlxuICAgIGNvbnRlbnRIaW50ICE9PSBDb250ZW50SGludC5SRVNFTkRBQkxFICYmXG4gICAgY29udGVudEhpbnQgIT09IENvbnRlbnRIaW50LklNUExJQ0lUXG4gICkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgIGBzZW5kVG9Hcm91cFZpYVNlbmRlcktleS8ke2xvZ0lkfTogSW52YWxpZCBjb250ZW50SGludCAke2NvbnRlbnRIaW50fWBcbiAgICApO1xuICB9XG5cbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZyxcbiAgICAnc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXk6IHRleHRzZWN1cmUubWVzc2FnaW5nIG5vdCBhdmFpbGFibGUhJ1xuICApO1xuXG4gIC8vIDEuIEFkZCBzZW5kZXIga2V5IGluZm8gaWYgd2UgaGF2ZSBub25lLCBvciBjbGVhciBvdXQgaWYgaXQncyB0b28gb2xkXG4gIGNvbnN0IEVYUElSRV9EVVJBVElPTiA9IGdldFNlbmRlcktleUV4cGlyZUR1cmF0aW9uKCk7XG5cbiAgLy8gTm90ZTogRnJvbSBoZXJlIG9uLCBnZW5lcmFsbHkgbmVlZCB0byByZWN1cnNlIGlmIHdlIGNoYW5nZSBzZW5kZXJLZXlJbmZvXG4gIGNvbnN0IHNlbmRlcktleUluZm8gPSBzZW5kVGFyZ2V0LmdldFNlbmRlcktleUluZm8oKTtcblxuICBpZiAoIXNlbmRlcktleUluZm8pIHtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzZW5kVG9Hcm91cFZpYVNlbmRlcktleS8ke2xvZ0lkfTogQWRkaW5nIGluaXRpYWwgc2VuZGVyIGtleSBpbmZvYFxuICAgICk7XG4gICAgYXdhaXQgc2VuZFRhcmdldC5zYXZlU2VuZGVyS2V5SW5mbyh7XG4gICAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpLFxuICAgICAgZGlzdHJpYnV0aW9uSWQ6IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpLFxuICAgICAgbWVtYmVyRGV2aWNlczogW10sXG4gICAgfSk7XG5cbiAgICAvLyBSZXN0YXJ0IGhlcmUgYmVjYXVzZSB3ZSB1cGRhdGVkIHNlbmRlcktleUluZm9cbiAgICByZXR1cm4gc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHJlY3Vyc2lvbkNvdW50OiByZWN1cnNpb25Db3VudCArIDEsXG4gICAgfSk7XG4gIH1cbiAgaWYgKGlzT2xkZXJUaGFuKHNlbmRlcktleUluZm8uY3JlYXRlZEF0RGF0ZSwgRVhQSVJFX0RVUkFUSU9OKSkge1xuICAgIGNvbnN0IHsgY3JlYXRlZEF0RGF0ZSB9ID0gc2VuZGVyS2V5SW5mbztcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBzZW5kVG9Hcm91cFZpYVNlbmRlcktleS8ke2xvZ0lkfTogUmVzZXR0aW5nIHNlbmRlciBrZXk7ICR7Y3JlYXRlZEF0RGF0ZX0gaXMgdG9vIG9sZGBcbiAgICApO1xuICAgIGF3YWl0IHJlc2V0U2VuZGVyS2V5KHNlbmRUYXJnZXQpO1xuXG4gICAgLy8gUmVzdGFydCBoZXJlIGJlY2F1c2Ugd2UgdXBkYXRlZCBzZW5kZXJLZXlJbmZvXG4gICAgcmV0dXJuIHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICByZWN1cnNpb25Db3VudDogcmVjdXJzaW9uQ291bnQgKyAxLFxuICAgIH0pO1xuICB9XG5cbiAgLy8gMi4gRmV0Y2ggYWxsIGRldmljZXMgd2UgYmVsaWV2ZSB3ZSdsbCBiZSBzZW5kaW5nIHRvXG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgY29uc3QgeyBkZXZpY2VzOiBjdXJyZW50RGV2aWNlcywgZW1wdHlJZGVudGlmaWVycyB9ID1cbiAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmdldE9wZW5EZXZpY2VzKFxuICAgICAgb3VyVXVpZCxcbiAgICAgIHJlY2lwaWVudHNcbiAgICApO1xuXG4gIC8vIDMuIElmIHdlIGhhdmUgbm8gb3BlbiBzZXNzaW9ucyB3aXRoIHBlb3BsZSB3ZSBiZWxpZXZlIHdlIGFyZSBzZW5kaW5nIHRvLCBhbmQgd2VcbiAgLy8gICBiZWxpZXZlIHRoYXQgYW55IGhhdmUgc2lnbmFsIGFjY291bnRzLCBmZXRjaCB0aGVpciBwcmVrZXkgYnVuZGxlIGFuZCBzdGFydFxuICAvLyAgIHNlc3Npb25zIHdpdGggdGhlbS5cbiAgaWYgKFxuICAgIGVtcHR5SWRlbnRpZmllcnMubGVuZ3RoID4gMCAmJlxuICAgIGVtcHR5SWRlbnRpZmllcnMuc29tZShpc0lkZW50aWZpZXJSZWdpc3RlcmVkKVxuICApIHtcbiAgICBhd2FpdCBmZXRjaEtleXNGb3JJZGVudGlmaWVycyhlbXB0eUlkZW50aWZpZXJzKTtcblxuICAgIC8vIFJlc3RhcnQgaGVyZSB0byBjYXB0dXJlIGRldmljZXMgZm9yIGFjY291bnRzIHdlIGp1c3Qgc3RhcnRlZCBzZXNzaW9ucyB3aXRoXG4gICAgcmV0dXJuIHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5KHtcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgICByZWN1cnNpb25Db3VudDogcmVjdXJzaW9uQ291bnQgKyAxLFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgeyBtZW1iZXJEZXZpY2VzLCBkaXN0cmlidXRpb25JZCwgY3JlYXRlZEF0RGF0ZSB9ID0gc2VuZGVyS2V5SW5mbztcbiAgY29uc3QgbWVtYmVyU2V0ID0gbmV3IFNldChzZW5kVGFyZ2V0LmdldE1lbWJlcnMoKSk7XG5cbiAgLy8gNC4gUGFydGl0aW9uIGRldmljZXMgaW50byBzZW5kZXIga2V5IGFuZCBub24tc2VuZGVyIGtleSBncm91cHNcbiAgY29uc3QgW2RldmljZXNGb3JTZW5kZXJLZXksIGRldmljZXNGb3JOb3JtYWxTZW5kXSA9IHBhcnRpdGlvbihcbiAgICBjdXJyZW50RGV2aWNlcyxcbiAgICBkZXZpY2UgPT4gaXNWYWxpZFNlbmRlcktleVJlY2lwaWVudChtZW1iZXJTZXQsIGRldmljZS5pZGVudGlmaWVyKVxuICApO1xuXG4gIGNvbnN0IHNlbmRlcktleVJlY2lwaWVudHMgPSBnZXRVdWlkc0Zyb21EZXZpY2VzKGRldmljZXNGb3JTZW5kZXJLZXkpO1xuICBjb25zdCBub3JtYWxTZW5kUmVjaXBpZW50cyA9IGdldFV1aWRzRnJvbURldmljZXMoZGV2aWNlc0Zvck5vcm1hbFNlbmQpO1xuICBsb2cuaW5mbyhcbiAgICBgc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkvJHtsb2dJZH06YCArXG4gICAgICBgICR7c2VuZGVyS2V5UmVjaXBpZW50cy5sZW5ndGh9IGFjY291bnRzIGZvciBzZW5kZXIga2V5ICgke2RldmljZXNGb3JTZW5kZXJLZXkubGVuZ3RofSBkZXZpY2VzKSxgICtcbiAgICAgIGAgJHtub3JtYWxTZW5kUmVjaXBpZW50cy5sZW5ndGh9IGFjY291bnRzIGZvciBub3JtYWwgc2VuZCAoJHtkZXZpY2VzRm9yTm9ybWFsU2VuZC5sZW5ndGh9IGRldmljZXMpYFxuICApO1xuXG4gIC8vIDUuIEVuc3VyZSB3ZSBoYXZlIGVub3VnaCByZWNpcGllbnRzXG4gIGlmIChzZW5kZXJLZXlSZWNpcGllbnRzLmxlbmd0aCA8IDIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICBgc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkvJHtsb2dJZH06IE5vdCBlbm91Z2ggcmVjaXBpZW50cyBmb3IgU2VuZGVyIEtleSBtZXNzYWdlLiBGYWlsaW5nIG92ZXIuYFxuICAgICk7XG4gIH1cblxuICAvLyA2LiBBbmFseXplIHRhcmdldCBkZXZpY2VzIGZvciBzZW5kZXIga2V5LCBkZXRlcm1pbmUgd2hpY2ggaGF2ZSBiZWVuIGFkZGVkIG9yIHJlbW92ZWRcbiAgY29uc3Qge1xuICAgIG5ld1RvTWVtYmVyRGV2aWNlcyxcbiAgICBuZXdUb01lbWJlclV1aWRzLFxuICAgIHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcyxcbiAgICByZW1vdmVkRnJvbU1lbWJlclV1aWRzLFxuICB9ID0gX2FuYWx5emVTZW5kZXJLZXlEZXZpY2VzKFxuICAgIG1lbWJlckRldmljZXMsXG4gICAgZGV2aWNlc0ZvclNlbmRlcktleSxcbiAgICBpc1BhcnRpYWxTZW5kXG4gICk7XG5cbiAgLy8gNy4gSWYgbWVtYmVycyBoYXZlIGJlZW4gcmVtb3ZlZCBmcm9tIHRoZSBncm91cCwgd2UgbmVlZCB0byByZXNldCBvdXIgc2VuZGVyIGtleSwgdGhlblxuICAvLyAgIHN0YXJ0IG92ZXIgdG8gZ2V0IGEgZnJlc2ggc2V0IG9mIHRhcmdldCBkZXZpY2VzLlxuICBjb25zdCBrZXlOZWVkc1Jlc2V0ID0gQXJyYXkuZnJvbShyZW1vdmVkRnJvbU1lbWJlclV1aWRzKS5zb21lKFxuICAgIHV1aWQgPT4gIXNlbmRUYXJnZXQuaGFzTWVtYmVyKHV1aWQpXG4gICk7XG4gIGlmIChrZXlOZWVkc1Jlc2V0KSB7XG4gICAgYXdhaXQgcmVzZXRTZW5kZXJLZXkoc2VuZFRhcmdldCk7XG5cbiAgICAvLyBSZXN0YXJ0IGhlcmUgdG8gc3RhcnQgb3ZlcjsgZW1wdHkgbWVtYmVyRGV2aWNlcyBtZWFucyB3ZSdsbCBzZW5kIGRpc3RyaWJ1dGlvblxuICAgIC8vICAgbWVzc2FnZSB0byBldmVyeW9uZS5cbiAgICByZXR1cm4gc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkoe1xuICAgICAgLi4ub3B0aW9ucyxcbiAgICAgIHJlY3Vyc2lvbkNvdW50OiByZWN1cnNpb25Db3VudCArIDEsXG4gICAgfSk7XG4gIH1cblxuICAvLyA4LiBJZiB0aGVyZSBhcmUgbmV3IG1lbWJlcnMgb3IgbmV3IGRldmljZXMgaW4gdGhlIGdyb3VwLCB3ZSBuZWVkIHRvIGVuc3VyZSB0aGF0IHRoZXlcbiAgLy8gICBoYXZlIG91ciBzZW5kZXIga2V5IGJlZm9yZSB3ZSBzZW5kIHNlbmRlciBrZXkgbWVzc2FnZXMgdG8gdGhlbS5cbiAgaWYgKG5ld1RvTWVtYmVyVXVpZHMubGVuZ3RoID4gMCkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5LyR7bG9nSWR9OiBTZW5kaW5nIHNlbmRlciBrZXkgdG8gJHtcbiAgICAgICAgbmV3VG9NZW1iZXJVdWlkcy5sZW5ndGhcbiAgICAgIH0gbWVtYmVyczogJHtKU09OLnN0cmluZ2lmeShuZXdUb01lbWJlclV1aWRzKX1gXG4gICAgKTtcbiAgICB0cnkge1xuICAgICAgYXdhaXQgaGFuZGxlTWVzc2FnZVNlbmQoXG4gICAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZy5zZW5kU2VuZGVyS2V5RGlzdHJpYnV0aW9uTWVzc2FnZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuUkVTRU5EQUJMRSxcbiAgICAgICAgICAgIGRpc3RyaWJ1dGlvbklkLFxuICAgICAgICAgICAgZ3JvdXBJZCxcbiAgICAgICAgICAgIGlkZW50aWZpZXJzOiBuZXdUb01lbWJlclV1aWRzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgc2VuZE9wdGlvbnMgPyB7IC4uLnNlbmRPcHRpb25zLCBvbmxpbmU6IGZhbHNlIH0gOiB1bmRlZmluZWRcbiAgICAgICAgKSxcbiAgICAgICAgeyBtZXNzYWdlSWRzOiBbXSwgc2VuZFR5cGU6ICdzZW5kZXJLZXlEaXN0cmlidXRpb25NZXNzYWdlJyB9XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICAvLyBJZiB3ZSBwYXJ0aWFsbHkgZmFpbCB0byBzZW5kIHRoZSBzZW5kZXIga2V5IGRpc3RyaWJ1dGlvbiBtZXNzYWdlIChTS0RNKSwgd2UgZG9uJ3RcbiAgICAgIC8vICAgd2FudCB0aGUgc3VjY2Vzc2Z1bCBTS0RNIHNlbmRzIHRvIGJlIGNvbnNpZGVyZWQgYW4gb3ZlcmFsbCBzdWNjZXNzLlxuICAgICAgaWYgKGVycm9yIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKSB7XG4gICAgICAgIHRocm93IG5ldyBTZW5kTWVzc2FnZVByb3RvRXJyb3Ioe1xuICAgICAgICAgIC4uLmVycm9yLFxuICAgICAgICAgIHNlbmRJc05vdEZpbmFsOiB0cnVlLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgLy8gVXBkYXRlIG1lbWJlckRldmljZXMgd2l0aCBuZXcgZGV2aWNlc1xuICAgIGNvbnN0IHVwZGF0ZWRNZW1iZXJEZXZpY2VzID0gWy4uLm1lbWJlckRldmljZXMsIC4uLm5ld1RvTWVtYmVyRGV2aWNlc107XG5cbiAgICBhd2FpdCBzZW5kVGFyZ2V0LnNhdmVTZW5kZXJLZXlJbmZvKHtcbiAgICAgIGNyZWF0ZWRBdERhdGUsXG4gICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgIG1lbWJlckRldmljZXM6IHVwZGF0ZWRNZW1iZXJEZXZpY2VzLFxuICAgIH0pO1xuXG4gICAgLy8gUmVzdGFydCBoZXJlIGJlY2F1c2Ugd2UgbWlnaHQgaGF2ZSBkaXNjb3ZlcmVkIG5ldyBvciBkcm9wcGVkIGRldmljZXMgYXMgcGFydCBvZlxuICAgIC8vICAgZGlzdHJpYnV0aW5nIG91ciBzZW5kZXIga2V5LlxuICAgIHJldHVybiBzZW5kVG9Hcm91cFZpYVNlbmRlcktleSh7XG4gICAgICAuLi5vcHRpb25zLFxuICAgICAgcmVjdXJzaW9uQ291bnQ6IHJlY3Vyc2lvbkNvdW50ICsgMSxcbiAgICB9KTtcbiAgfVxuXG4gIC8vIDkuIFVwZGF0ZSBtZW1iZXJEZXZpY2VzIHdpdGggcmVtb3ZhbHMgd2hpY2ggZGlkbid0IHJlcXVpcmUgYSByZXNldC5cbiAgaWYgKHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgY29uc3QgdXBkYXRlZE1lbWJlckRldmljZXMgPSBbXG4gICAgICAuLi5kaWZmZXJlbmNlV2l0aDxEZXZpY2VUeXBlLCBEZXZpY2VUeXBlPihcbiAgICAgICAgbWVtYmVyRGV2aWNlcyxcbiAgICAgICAgcmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzLFxuICAgICAgICBkZXZpY2VDb21wYXJhdG9yXG4gICAgICApLFxuICAgIF07XG5cbiAgICBhd2FpdCBzZW5kVGFyZ2V0LnNhdmVTZW5kZXJLZXlJbmZvKHtcbiAgICAgIGNyZWF0ZWRBdERhdGUsXG4gICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgIG1lbWJlckRldmljZXM6IHVwZGF0ZWRNZW1iZXJEZXZpY2VzLFxuICAgIH0pO1xuXG4gICAgLy8gTm90ZSwgd2UgZG8gbm90IG5lZWQgdG8gcmVzdGFydCBoZXJlIGJlY2F1c2Ugd2UgZG9uJ3QgcmVmZXIgYmFjayB0byBzZW5kZXJLZXlJbmZvXG4gICAgLy8gICBhZnRlciB0aGlzIHBvaW50LlxuICB9XG5cbiAgLy8gMTAuIFNlbmQgdGhlIFNlbmRlciBLZXkgbWVzc2FnZSFcbiAgbGV0IHNlbmRMb2dJZDogbnVtYmVyO1xuICBsZXQgc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxudW1iZXI+PiA9IHt9O1xuICBkZXZpY2VzRm9yU2VuZGVyS2V5LmZvckVhY2goaXRlbSA9PiB7XG4gICAgY29uc3QgeyBpZCwgaWRlbnRpZmllciB9ID0gaXRlbTtcbiAgICBzZW5kZXJLZXlSZWNpcGllbnRzV2l0aERldmljZXNbaWRlbnRpZmllcl0gfHw9IFtdO1xuICAgIHNlbmRlcktleVJlY2lwaWVudHNXaXRoRGV2aWNlc1tpZGVudGlmaWVyXS5wdXNoKGlkKTtcbiAgfSk7XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBtZXNzYWdlQnVmZmVyID0gYXdhaXQgZW5jcnlwdEZvclNlbmRlcktleSh7XG4gICAgICBjb250ZW50SGludCxcbiAgICAgIGRldmljZXM6IGRldmljZXNGb3JTZW5kZXJLZXksXG4gICAgICBkaXN0cmlidXRpb25JZCxcbiAgICAgIGNvbnRlbnRNZXNzYWdlOiBQcm90by5Db250ZW50LmVuY29kZShjb250ZW50TWVzc2FnZSkuZmluaXNoKCksXG4gICAgICBncm91cElkLFxuICAgIH0pO1xuICAgIGNvbnN0IGFjY2Vzc0tleXMgPSBnZXRYb3JPZkFjY2Vzc0tleXMoZGV2aWNlc0ZvclNlbmRlcktleSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcuc2VuZFdpdGhTZW5kZXJLZXkoXG4gICAgICBtZXNzYWdlQnVmZmVyLFxuICAgICAgYWNjZXNzS2V5cyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICAgIG9ubGluZVxuICAgICk7XG5cbiAgICBjb25zdCBwYXJzZWQgPSBtdWx0aVJlY2lwaWVudDIwMFJlc3BvbnNlU2NoZW1hLnNhZmVQYXJzZShyZXN1bHQpO1xuICAgIGlmIChwYXJzZWQuc3VjY2Vzcykge1xuICAgICAgY29uc3QgeyB1dWlkczQwNCB9ID0gcGFyc2VkLmRhdGE7XG4gICAgICBpZiAodXVpZHM0MDQgJiYgdXVpZHM0MDQubGVuZ3RoID4gMCkge1xuICAgICAgICBhd2FpdCBfd2FpdEZvckFsbCh7XG4gICAgICAgICAgdGFza3M6IHV1aWRzNDA0Lm1hcChcbiAgICAgICAgICAgIHV1aWQgPT4gYXN5bmMgKCkgPT4gbWFya0lkZW50aWZpZXJVbnJlZ2lzdGVyZWQodXVpZClcbiAgICAgICAgICApLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzID0gb21pdChcbiAgICAgICAgc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzLFxuICAgICAgICB1dWlkczQwNCB8fCBbXVxuICAgICAgKTtcbiAgICB9IGVsc2Uge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICBgc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkvJHtsb2dJZH06IFNlcnZlciByZXR1cm5lZCB1bmV4cGVjdGVkIDIwMCByZXNwb25zZSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICAgIHBhcnNlZC5lcnJvci5mbGF0dGVuKClcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRTYXZlUHJvdG8oc2VuZFR5cGUpKSB7XG4gICAgICBzZW5kTG9nSWQgPSBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEuaW5zZXJ0U2VudFByb3RvKFxuICAgICAgICB7XG4gICAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgICAgcHJvdG86IEJ1ZmZlci5mcm9tKFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKSksXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB9LFxuICAgICAgICB7XG4gICAgICAgICAgcmVjaXBpZW50czogc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzLFxuICAgICAgICAgIG1lc3NhZ2VJZHM6IG1lc3NhZ2VJZCA/IFttZXNzYWdlSWRdIDogW10sXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfVxuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGlmIChlcnJvci5jb2RlID09PSBFUlJPUl9FWFBJUkVEX09SX01JU1NJTkdfREVWSUNFUykge1xuICAgICAgYXdhaXQgaGFuZGxlNDA5UmVzcG9uc2UobG9nSWQsIGVycm9yKTtcblxuICAgICAgLy8gUmVzdGFydCBoZXJlIHRvIGNhcHR1cmUgdGhlIHJpZ2h0IHNldCBvZiBkZXZpY2VzIGZvciBvdXIgbmV4dCBzZW5kLlxuICAgICAgcmV0dXJuIHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5KHtcbiAgICAgICAgLi4ub3B0aW9ucyxcbiAgICAgICAgcmVjdXJzaW9uQ291bnQ6IHJlY3Vyc2lvbkNvdW50ICsgMSxcbiAgICAgIH0pO1xuICAgIH1cbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gRVJST1JfU1RBTEVfREVWSUNFUykge1xuICAgICAgYXdhaXQgaGFuZGxlNDEwUmVzcG9uc2Uoc2VuZFRhcmdldCwgZXJyb3IpO1xuXG4gICAgICAvLyBSZXN0YXJ0IGhlcmUgdG8gdXNlIHRoZSByaWdodCByZWdpc3RyYXRpb25JZHMgZm9yIGRldmljZXMgd2UgYWxyZWFkeSBrbmV3IGFib3V0LFxuICAgICAgLy8gICBhcyB3ZWxsIGFzIHNlbmQgb3VyIHNlbmRlciBrZXkgdG8gdGhlc2UgcmUtcmVnaXN0ZXJlZCBvciByZS1saW5rZWQgZGV2aWNlcy5cbiAgICAgIHJldHVybiBzZW5kVG9Hcm91cFZpYVNlbmRlcktleSh7XG4gICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgIHJlY3Vyc2lvbkNvdW50OiByZWN1cnNpb25Db3VudCArIDEsXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGVycm9yLmNvZGUgPT09IEVycm9yQ29kZS5JbnZhbGlkUmVnaXN0cmF0aW9uSWQgJiYgZXJyb3IuYWRkcikge1xuICAgICAgY29uc3QgYWRkcmVzcyA9IGVycm9yLmFkZHIgYXMgUHJvdG9jb2xBZGRyZXNzO1xuICAgICAgY29uc3QgbmFtZSA9IGFkZHJlc3MubmFtZSgpO1xuXG4gICAgICBjb25zdCBicm9rZW5BY2NvdW50ID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KG5hbWUpO1xuICAgICAgaWYgKGJyb2tlbkFjY291bnQpIHtcbiAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgYHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5LyR7bG9nSWR9OiBEaXNhYmxpbmcgc2VhbGVkIHNlbmRlciBmb3IgJHticm9rZW5BY2NvdW50LmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgKTtcbiAgICAgICAgYnJva2VuQWNjb3VudC5zZXQoeyBzZWFsZWRTZW5kZXI6IFNFQUxFRF9TRU5ERVIuRElTQUJMRUQgfSk7XG4gICAgICAgIHdpbmRvdy5TaWduYWwuRGF0YS51cGRhdGVDb252ZXJzYXRpb24oYnJva2VuQWNjb3VudC5hdHRyaWJ1dGVzKTtcblxuICAgICAgICAvLyBOb3cgdGhhdCB3ZSd2ZSBlbGltaW5hdGUgdGhpcyBwcm9ibGVtYXRpYyBhY2NvdW50LCB3ZSBjYW4gdHJ5IHRoZSBzZW5kIGFnYWluLlxuICAgICAgICByZXR1cm4gc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkoe1xuICAgICAgICAgIC4uLm9wdGlvbnMsXG4gICAgICAgICAgcmVjdXJzaW9uQ291bnQ6IHJlY3Vyc2lvbkNvdW50ICsgMSxcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgYHNlbmRUb0dyb3VwVmlhU2VuZGVyS2V5LyR7bG9nSWR9OiBSZXR1cm5lZCB1bmV4cGVjdGVkIGVycm9yICR7XG4gICAgICAgIGVycm9yLmNvZGVcbiAgICAgIH0uIEZhaWxpbmcgb3Zlci4gJHtlcnJvci5zdGFjayB8fCBlcnJvcn1gXG4gICAgKTtcbiAgfVxuXG4gIC8vIDExLiBSZXR1cm4gZWFybHkgaWYgdGhlcmUgYXJlIG5vIG5vcm1hbCBzZW5kIHJlY2lwaWVudHNcbiAgaWYgKG5vcm1hbFNlbmRSZWNpcGllbnRzLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybiB7XG4gICAgICBkYXRhTWVzc2FnZTogY29udGVudE1lc3NhZ2UuZGF0YU1lc3NhZ2VcbiAgICAgICAgPyBQcm90by5EYXRhTWVzc2FnZS5lbmNvZGUoY29udGVudE1lc3NhZ2UuZGF0YU1lc3NhZ2UpLmZpbmlzaCgpXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgc3VjY2Vzc2Z1bElkZW50aWZpZXJzOiBzZW5kZXJLZXlSZWNpcGllbnRzLFxuICAgICAgdW5pZGVudGlmaWVkRGVsaXZlcmllczogc2VuZGVyS2V5UmVjaXBpZW50cyxcblxuICAgICAgY29udGVudEhpbnQsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgICBjb250ZW50UHJvdG86IEJ1ZmZlci5mcm9tKFByb3RvLkNvbnRlbnQuZW5jb2RlKGNvbnRlbnRNZXNzYWdlKS5maW5pc2goKSksXG4gICAgICByZWNpcGllbnRzOiBzZW5kZXJLZXlSZWNpcGllbnRzV2l0aERldmljZXMsXG4gICAgfTtcbiAgfVxuXG4gIC8vIDEyLiBTZW5kIG5vcm1hbCBtZXNzYWdlIHRvIHRoZSBsZWZ0b3ZlciBub3JtYWwgcmVjaXBpZW50cy4gVGhlbiBjb21iaW5lIG5vcm1hbCBzZW5kXG4gIC8vICAgIHJlc3VsdCB3aXRoIHJlc3VsdCBmcm9tIHNlbmRlciBrZXkgc2VuZCBmb3IgZmluYWwgcmV0dXJuIHZhbHVlLlxuXG4gIC8vIFdlIGRvbid0IHdhbnQgdG8gdXNlIGEgbm9ybWFsIHNlbmQgbG9nIGNhbGxiYWNrIGhlcmUsIGJlY2F1c2UgdGhlIHByb3RvIGhhcyBhbHJlYWR5XG4gIC8vICAgYmVlbiBzYXZlZCBhcyBwYXJ0IG9mIHRoZSBTZW5kZXIgS2V5IHNlbmQuIFdlJ3JlIGp1c3QgYWRkaW5nIHJlY2lwaWVudHMgaGVyZS5cbiAgY29uc3Qgc2VuZExvZ0NhbGxiYWNrOiBTZW5kTG9nQ2FsbGJhY2tUeXBlID0gYXN5bmMgKHtcbiAgICBpZGVudGlmaWVyLFxuICAgIGRldmljZUlkcyxcbiAgfToge1xuICAgIGlkZW50aWZpZXI6IHN0cmluZztcbiAgICBkZXZpY2VJZHM6IEFycmF5PG51bWJlcj47XG4gIH0pID0+IHtcbiAgICBpZiAoIXNob3VsZFNhdmVQcm90byhzZW5kVHlwZSkpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzZW50VG9Db252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoaWRlbnRpZmllcik7XG4gICAgaWYgKCFzZW50VG9Db252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkvY2FsbGJhY2s6IFVuYWJsZSB0byBmaW5kIGNvbnZlcnNhdGlvbiBmb3IgaWRlbnRpZmllciAke2lkZW50aWZpZXJ9YFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgcmVjaXBpZW50VXVpZCA9IHNlbnRUb0NvbnZlcnNhdGlvbi5nZXQoJ3V1aWQnKTtcbiAgICBpZiAoIXJlY2lwaWVudFV1aWQpIHtcbiAgICAgIGxvZy53YXJuKFxuICAgICAgICBgc2VuZFRvR3JvdXBWaWFTZW5kZXJLZXkvY2FsbGJhY2s6IENvbnZlcnNhdGlvbiAke3NlbnRUb0NvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX0gaGFkIG5vIFVVSURgXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGF3YWl0IHdpbmRvdy5TaWduYWwuRGF0YS5pbnNlcnRQcm90b1JlY2lwaWVudHMoe1xuICAgICAgaWQ6IHNlbmRMb2dJZCxcbiAgICAgIHJlY2lwaWVudFV1aWQsXG4gICAgICBkZXZpY2VJZHMsXG4gICAgfSk7XG4gIH07XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBub3JtYWxTZW5kUmVzdWx0ID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLnNlbmRHcm91cFByb3RvKHtcbiAgICAgIGNvbnRlbnRIaW50LFxuICAgICAgZ3JvdXBJZCxcbiAgICAgIG9wdGlvbnM6IHsgLi4uc2VuZE9wdGlvbnMsIG9ubGluZSB9LFxuICAgICAgcHJvdG86IGNvbnRlbnRNZXNzYWdlLFxuICAgICAgcmVjaXBpZW50czogbm9ybWFsU2VuZFJlY2lwaWVudHMsXG4gICAgICBzZW5kTG9nQ2FsbGJhY2ssXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSk7XG5cbiAgICByZXR1cm4gbWVyZ2VTZW5kUmVzdWx0KHtcbiAgICAgIHJlc3VsdDogbm9ybWFsU2VuZFJlc3VsdCxcbiAgICAgIHNlbmRlcktleVJlY2lwaWVudHMsXG4gICAgICBzZW5kZXJLZXlSZWNpcGllbnRzV2l0aERldmljZXMsXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yOiB1bmtub3duKSB7XG4gICAgaWYgKGVycm9yIGluc3RhbmNlb2YgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKSB7XG4gICAgICBjb25zdCBjYWxsYmFja1Jlc3VsdCA9IG1lcmdlU2VuZFJlc3VsdCh7XG4gICAgICAgIHJlc3VsdDogZXJyb3IsXG4gICAgICAgIHNlbmRlcktleVJlY2lwaWVudHMsXG4gICAgICAgIHNlbmRlcktleVJlY2lwaWVudHNXaXRoRGV2aWNlcyxcbiAgICAgIH0pO1xuICAgICAgdGhyb3cgbmV3IFNlbmRNZXNzYWdlUHJvdG9FcnJvcihjYWxsYmFja1Jlc3VsdCk7XG4gICAgfVxuXG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cbn1cblxuLy8gVXRpbGl0eSBNZXRob2RzXG5cbmZ1bmN0aW9uIG1lcmdlU2VuZFJlc3VsdCh7XG4gIHJlc3VsdCxcbiAgc2VuZGVyS2V5UmVjaXBpZW50cyxcbiAgc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzLFxufToge1xuICByZXN1bHQ6IENhbGxiYWNrUmVzdWx0VHlwZSB8IFNlbmRNZXNzYWdlUHJvdG9FcnJvcjtcbiAgc2VuZGVyS2V5UmVjaXBpZW50czogQXJyYXk8c3RyaW5nPjtcbiAgc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzOiBSZWNvcmQ8c3RyaW5nLCBBcnJheTxudW1iZXI+Pjtcbn0pOiBDYWxsYmFja1Jlc3VsdFR5cGUge1xuICByZXR1cm4ge1xuICAgIC4uLnJlc3VsdCxcbiAgICBzdWNjZXNzZnVsSWRlbnRpZmllcnM6IFtcbiAgICAgIC4uLihyZXN1bHQuc3VjY2Vzc2Z1bElkZW50aWZpZXJzIHx8IFtdKSxcbiAgICAgIC4uLnNlbmRlcktleVJlY2lwaWVudHMsXG4gICAgXSxcbiAgICB1bmlkZW50aWZpZWREZWxpdmVyaWVzOiBbXG4gICAgICAuLi4ocmVzdWx0LnVuaWRlbnRpZmllZERlbGl2ZXJpZXMgfHwgW10pLFxuICAgICAgLi4uc2VuZGVyS2V5UmVjaXBpZW50cyxcbiAgICBdLFxuICAgIHJlY2lwaWVudHM6IHtcbiAgICAgIC4uLnJlc3VsdC5yZWNpcGllbnRzLFxuICAgICAgLi4uc2VuZGVyS2V5UmVjaXBpZW50c1dpdGhEZXZpY2VzLFxuICAgIH0sXG4gIH07XG59XG5cbmNvbnN0IE1BWF9TRU5ERVJfS0VZX0VYUElSRV9EVVJBVElPTiA9IDkwICogREFZO1xuXG5mdW5jdGlvbiBnZXRTZW5kZXJLZXlFeHBpcmVEdXJhdGlvbigpOiBudW1iZXIge1xuICB0cnkge1xuICAgIGNvbnN0IHBhcnNlZCA9IHBhcnNlSW50T3JUaHJvdyhcbiAgICAgIGdldFZhbHVlKCdkZXNrdG9wLnNlbmRlcktleU1heEFnZScpLFxuICAgICAgJ2dldFNlbmRlcktleUV4cGlyZUR1cmF0aW9uJ1xuICAgICk7XG5cbiAgICBjb25zdCBkdXJhdGlvbiA9IE1hdGgubWluKHBhcnNlZCwgTUFYX1NFTkRFUl9LRVlfRVhQSVJFX0RVUkFUSU9OKTtcbiAgICBsb2cuaW5mbyhcbiAgICAgIGBnZXRTZW5kZXJLZXlFeHBpcmVEdXJhdGlvbjogdXNpbmcgZXhwaXJlIGR1cmF0aW9uIG9mICR7ZHVyYXRpb259YFxuICAgICk7XG5cbiAgICByZXR1cm4gZHVyYXRpb247XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLndhcm4oXG4gICAgICBgZ2V0U2VuZGVyS2V5RXhwaXJlRHVyYXRpb246IEZhaWxlZCB0byBwYXJzZSBpbnRlZ2VyLiBVc2luZyBkZWZhdWx0IG9mICR7TUFYX1NFTkRFUl9LRVlfRVhQSVJFX0RVUkFUSU9OfS5gLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICByZXR1cm4gTUFYX1NFTkRFUl9LRVlfRVhQSVJFX0RVUkFUSU9OO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBfc2hvdWxkRmFpbFNlbmQoZXJyb3I6IHVua25vd24sIGxvZ0lkOiBzdHJpbmcpOiBib29sZWFuIHtcbiAgY29uc3QgbG9nRXJyb3IgPSAobWVzc2FnZTogc3RyaW5nKSA9PiB7XG4gICAgbG9nLmVycm9yKGBfc2hvdWxkRmFpbFNlbmQvJHtsb2dJZH06ICR7bWVzc2FnZX1gKTtcbiAgfTtcblxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBFcnJvciAmJiBlcnJvci5tZXNzYWdlLmluY2x1ZGVzKCd1bnRydXN0ZWQgaWRlbnRpdHknKSkge1xuICAgIGxvZ0Vycm9yKFwiJ3VudHJ1c3RlZCBpZGVudGl0eScgZXJyb3IsIGZhaWxpbmcuXCIpO1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGVycm9yIGluc3RhbmNlb2YgT3V0Z29pbmdJZGVudGl0eUtleUVycm9yKSB7XG4gICAgbG9nRXJyb3IoJ091dGdvaW5nSWRlbnRpdHlLZXlFcnJvciBlcnJvciwgZmFpbGluZy4nKTtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIFVucmVnaXN0ZXJlZFVzZXJFcnJvcikge1xuICAgIGxvZ0Vycm9yKCdVbnJlZ2lzdGVyZWRVc2VyRXJyb3IgZXJyb3IsIGZhaWxpbmcuJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBDb25uZWN0VGltZW91dEVycm9yKSB7XG4gICAgbG9nRXJyb3IoJ0Nvbm5lY3RUaW1lb3V0RXJyb3IgZXJyb3IsIGZhaWxpbmcuJyk7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICAvLyBLbm93biBlcnJvciB0eXBlcyBjYXB0dXJlZCBoZXJlOlxuICAvLyAgIEhUVFBFcnJvclxuICAvLyAgIE91dGdvaW5nTWVzc2FnZUVycm9yXG4gIC8vICAgU2VuZE1lc3NhZ2VOZXR3b3JrRXJyb3JcbiAgLy8gICBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yXG4gIC8vICAgTWVzc2FnZUVycm9yXG4gIGlmIChpc1JlY29yZChlcnJvcikgJiYgdHlwZW9mIGVycm9yLmNvZGUgPT09ICdudW1iZXInKSB7XG4gICAgaWYgKGVycm9yLmNvZGUgPT09IDQwMCkge1xuICAgICAgbG9nRXJyb3IoJ0ludmFsaWQgcmVxdWVzdCwgZmFpbGluZy4nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChlcnJvci5jb2RlID09PSA0MDEpIHtcbiAgICAgIGxvZ0Vycm9yKCdQZXJtaXNzaW9ucyBlcnJvciwgZmFpbGluZy4nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChlcnJvci5jb2RlID09PSA0MDQpIHtcbiAgICAgIGxvZ0Vycm9yKCdNaXNzaW5nIHVzZXIgb3IgZW5kcG9pbnQgZXJyb3IsIGZhaWxpbmcuJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDEzIHx8IGVycm9yLmNvZGUgPT09IDQyOSkge1xuICAgICAgbG9nRXJyb3IoJ1JhdGUgbGltaXQgZXJyb3IsIGZhaWxpbmcuJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDI4KSB7XG4gICAgICBsb2dFcnJvcignQ2hhbGxlbmdlIGVycm9yLCBmYWlsaW5nLicpO1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuXG4gICAgaWYgKGVycm9yLmNvZGUgPT09IDUwMCkge1xuICAgICAgbG9nRXJyb3IoJ1NlcnZlciBlcnJvciwgZmFpbGluZy4nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cblxuICAgIGlmIChlcnJvci5jb2RlID09PSA1MDgpIHtcbiAgICAgIGxvZ0Vycm9yKCdGYWlsIGpvYiBlcnJvciwgZmFpbGluZy4nKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgfVxuXG4gIGlmIChlcnJvciBpbnN0YW5jZW9mIFNlbmRNZXNzYWdlUHJvdG9FcnJvcikge1xuICAgIGlmICghZXJyb3IuZXJyb3JzIHx8ICFlcnJvci5lcnJvcnMubGVuZ3RoKSB7XG4gICAgICBsb2dFcnJvcignU2VuZE1lc3NhZ2VQcm90b0Vycm9yIGhhZCBubyBlcnJvcnMsIGZhaWxpbmcuJyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICBmb3IgKGNvbnN0IGlubmVyRXJyb3Igb2YgZXJyb3IuZXJyb3JzKSB7XG4gICAgICBjb25zdCBzaG91bGRGYWlsID0gX3Nob3VsZEZhaWxTZW5kKGlubmVyRXJyb3IsIGxvZ0lkKTtcbiAgICAgIGlmIChzaG91bGRGYWlsKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBmYWxzZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIF93YWl0Rm9yQWxsPFQ+KHtcbiAgdGFza3MsXG4gIG1heENvbmN1cnJlbmN5ID0gTUFYX0NPTkNVUlJFTkNZLFxufToge1xuICB0YXNrczogQXJyYXk8KCkgPT4gUHJvbWlzZTxUPj47XG4gIG1heENvbmN1cnJlbmN5PzogbnVtYmVyO1xufSk6IFByb21pc2U8QXJyYXk8VD4+IHtcbiAgY29uc3QgcXVldWUgPSBuZXcgUFF1ZXVlKHtcbiAgICBjb25jdXJyZW5jeTogbWF4Q29uY3VycmVuY3ksXG4gICAgdGltZW91dDogMiAqIDYwICogMTAwMCxcbiAgICB0aHJvd09uVGltZW91dDogdHJ1ZSxcbiAgfSk7XG4gIHJldHVybiBxdWV1ZS5hZGRBbGwodGFza3MpO1xufVxuXG5mdW5jdGlvbiBnZXRSZWNpcGllbnRzKG9wdGlvbnM6IEdyb3VwU2VuZE9wdGlvbnNUeXBlKTogQXJyYXk8c3RyaW5nPiB7XG4gIGlmIChvcHRpb25zLmdyb3VwVjIpIHtcbiAgICByZXR1cm4gb3B0aW9ucy5ncm91cFYyLm1lbWJlcnM7XG4gIH1cbiAgaWYgKG9wdGlvbnMuZ3JvdXBWMSkge1xuICAgIHJldHVybiBvcHRpb25zLmdyb3VwVjEubWVtYmVycztcbiAgfVxuXG4gIHRocm93IG5ldyBFcnJvcignZ2V0UmVjaXBpZW50czogVW5hYmxlIHRvIGV4dHJhY3QgcmVjaXBpZW50cyEnKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gbWFya0lkZW50aWZpZXJVbnJlZ2lzdGVyZWQoaWRlbnRpZmllcjogc3RyaW5nKSB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKFxuICAgIGlkZW50aWZpZXIsXG4gICAgJ3ByaXZhdGUnXG4gICk7XG5cbiAgY29udmVyc2F0aW9uLnNldFVucmVnaXN0ZXJlZCgpO1xuICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcblxuICBjb25zdCB1dWlkID0gVVVJRC5sb29rdXAoaWRlbnRpZmllcik7XG4gIGlmICghdXVpZCkge1xuICAgIGxvZy53YXJuKGBObyB1dWlkIGZvdW5kIGZvciAke2lkZW50aWZpZXJ9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlQWxsU2Vzc2lvbnModXVpZCk7XG59XG5cbmZ1bmN0aW9uIGlzSWRlbnRpZmllclJlZ2lzdGVyZWQoaWRlbnRpZmllcjogc3RyaW5nKSB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlKFxuICAgIGlkZW50aWZpZXIsXG4gICAgJ3ByaXZhdGUnXG4gICk7XG4gIGNvbnN0IGlzVW5yZWdpc3RlcmVkID0gY29udmVyc2F0aW9uLmlzVW5yZWdpc3RlcmVkKCk7XG5cbiAgcmV0dXJuICFpc1VucmVnaXN0ZXJlZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gaGFuZGxlNDA5UmVzcG9uc2UobG9nSWQ6IHN0cmluZywgZXJyb3I6IEhUVFBFcnJvcikge1xuICBjb25zdCBwYXJzZWQgPSBtdWx0aVJlY2lwaWVudDQwOVJlc3BvbnNlU2NoZW1hLnNhZmVQYXJzZShlcnJvci5yZXNwb25zZSk7XG4gIGlmIChwYXJzZWQuc3VjY2Vzcykge1xuICAgIGF3YWl0IF93YWl0Rm9yQWxsKHtcbiAgICAgIHRhc2tzOiBwYXJzZWQuZGF0YS5tYXAoaXRlbSA9PiBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXVpZCwgZGV2aWNlcyB9ID0gaXRlbTtcbiAgICAgICAgLy8gU3RhcnQgbmV3IHNlc3Npb25zIHdpdGggZGV2aWNlcyB3ZSBkaWRuJ3Qga25vdyBhYm91dCBiZWZvcmVcbiAgICAgICAgaWYgKGRldmljZXMubWlzc2luZ0RldmljZXMgJiYgZGV2aWNlcy5taXNzaW5nRGV2aWNlcy5sZW5ndGggPiAwKSB7XG4gICAgICAgICAgYXdhaXQgZmV0Y2hLZXlzRm9ySWRlbnRpZmllcih1dWlkLCBkZXZpY2VzLm1pc3NpbmdEZXZpY2VzKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEFyY2hpdmUgc2Vzc2lvbnMgd2l0aCBkZXZpY2VzIHRoYXQgaGF2ZSBiZWVuIHJlbW92ZWRcbiAgICAgICAgaWYgKGRldmljZXMuZXh0cmFEZXZpY2VzICYmIGRldmljZXMuZXh0cmFEZXZpY2VzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG5cbiAgICAgICAgICBhd2FpdCBfd2FpdEZvckFsbCh7XG4gICAgICAgICAgICB0YXNrczogZGV2aWNlcy5leHRyYURldmljZXMubWFwKGRldmljZUlkID0+IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihcbiAgICAgICAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBBZGRyZXNzLmNyZWF0ZSh1dWlkLCBkZXZpY2VJZCkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgfSksXG4gICAgICBtYXhDb25jdXJyZW5jeTogMixcbiAgICB9KTtcbiAgfSBlbHNlIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICBgaGFuZGxlNDA5UmVzcG9uc2UvJHtsb2dJZH06IFNlcnZlciByZXR1cm5lZCB1bmV4cGVjdGVkIDQwOSByZXNwb25zZSAke0pTT04uc3RyaW5naWZ5KFxuICAgICAgICBwYXJzZWQuZXJyb3IuZmxhdHRlbigpXG4gICAgICApfWBcbiAgICApO1xuICAgIHRocm93IGVycm9yO1xuICB9XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGhhbmRsZTQxMFJlc3BvbnNlKFxuICBzZW5kVGFyZ2V0OiBTZW5kZXJLZXlUYXJnZXRUeXBlLFxuICBlcnJvcjogSFRUUEVycm9yXG4pIHtcbiAgY29uc3QgbG9nSWQgPSBzZW5kVGFyZ2V0LmlkRm9yTG9nZ2luZygpO1xuXG4gIGNvbnN0IHBhcnNlZCA9IG11bHRpUmVjaXBpZW50NDEwUmVzcG9uc2VTY2hlbWEuc2FmZVBhcnNlKGVycm9yLnJlc3BvbnNlKTtcbiAgaWYgKHBhcnNlZC5zdWNjZXNzKSB7XG4gICAgYXdhaXQgX3dhaXRGb3JBbGwoe1xuICAgICAgdGFza3M6IHBhcnNlZC5kYXRhLm1hcChpdGVtID0+IGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgeyB1dWlkLCBkZXZpY2VzIH0gPSBpdGVtO1xuICAgICAgICBpZiAoZGV2aWNlcy5zdGFsZURldmljZXMgJiYgZGV2aWNlcy5zdGFsZURldmljZXMubGVuZ3RoID4gMCkge1xuICAgICAgICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgICAgICAgIC8vIEZpcnN0LCBhcmNoaXZlIG91ciBleGlzdGluZyBzZXNzaW9ucyB3aXRoIHRoZXNlIGRldmljZXNcbiAgICAgICAgICBhd2FpdCBfd2FpdEZvckFsbCh7XG4gICAgICAgICAgICB0YXNrczogZGV2aWNlcy5zdGFsZURldmljZXMubWFwKGRldmljZUlkID0+IGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihcbiAgICAgICAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBBZGRyZXNzLmNyZWF0ZSh1dWlkLCBkZXZpY2VJZCkpXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIC8vIFN0YXJ0IG5ldyBzZXNzaW9ucyB3aXRoIHRoZXNlIGRldmljZXNcbiAgICAgICAgICBhd2FpdCBmZXRjaEtleXNGb3JJZGVudGlmaWVyKHV1aWQsIGRldmljZXMuc3RhbGVEZXZpY2VzKTtcblxuICAgICAgICAgIC8vIEZvcmdldCB0aGF0IHdlJ3ZlIHNlbnQgb3VyIHNlbmRlciBrZXkgdG8gdGhlc2UgZGV2aWNlcywgc2luY2UgdGhleSd2ZVxuICAgICAgICAgIC8vICAgYmVlbiByZS1yZWdpc3RlcmVkIG9yIHJlLWxpbmtlZC5cbiAgICAgICAgICBjb25zdCBzZW5kZXJLZXlJbmZvID0gc2VuZFRhcmdldC5nZXRTZW5kZXJLZXlJbmZvKCk7XG4gICAgICAgICAgaWYgKHNlbmRlcktleUluZm8pIHtcbiAgICAgICAgICAgIGNvbnN0IGRldmljZXNUb1JlbW92ZTogQXJyYXk8UGFydGlhbERldmljZVR5cGU+ID1cbiAgICAgICAgICAgICAgZGV2aWNlcy5zdGFsZURldmljZXMubWFwKGlkID0+ICh7IGlkLCBpZGVudGlmaWVyOiB1dWlkIH0pKTtcbiAgICAgICAgICAgIGF3YWl0IHNlbmRUYXJnZXQuc2F2ZVNlbmRlcktleUluZm8oe1xuICAgICAgICAgICAgICAuLi5zZW5kZXJLZXlJbmZvLFxuICAgICAgICAgICAgICBtZW1iZXJEZXZpY2VzOiBkaWZmZXJlbmNlV2l0aChcbiAgICAgICAgICAgICAgICBzZW5kZXJLZXlJbmZvLm1lbWJlckRldmljZXMsXG4gICAgICAgICAgICAgICAgZGV2aWNlc1RvUmVtb3ZlLFxuICAgICAgICAgICAgICAgIHBhcnRpYWxEZXZpY2VDb21wYXJhdG9yXG4gICAgICAgICAgICAgICksXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0pLFxuICAgICAgbWF4Q29uY3VycmVuY3k6IDIsXG4gICAgfSk7XG4gIH0gZWxzZSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgYGhhbmRsZTQxMFJlc3BvbnNlLyR7bG9nSWR9OiBTZXJ2ZXIgcmV0dXJuZWQgdW5leHBlY3RlZCA0MTAgcmVzcG9uc2UgJHtKU09OLnN0cmluZ2lmeShcbiAgICAgICAgcGFyc2VkLmVycm9yLmZsYXR0ZW4oKVxuICAgICAgKX1gXG4gICAgKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5mdW5jdGlvbiBnZXRYb3JPZkFjY2Vzc0tleXMoZGV2aWNlczogQXJyYXk8RGV2aWNlVHlwZT4pOiBCdWZmZXIge1xuICBjb25zdCB1dWlkcyA9IGdldFV1aWRzRnJvbURldmljZXMoZGV2aWNlcyk7XG5cbiAgY29uc3QgcmVzdWx0ID0gQnVmZmVyLmFsbG9jKEFDQ0VTU19LRVlfTEVOR1RIKTtcbiAgc3RyaWN0QXNzZXJ0KFxuICAgIHJlc3VsdC5sZW5ndGggPT09IEFDQ0VTU19LRVlfTEVOR1RILFxuICAgICdnZXRYb3JPZkFjY2Vzc0tleXMgc3RhcnRpbmcgdmFsdWUnXG4gICk7XG5cbiAgdXVpZHMuZm9yRWFjaCh1dWlkID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQodXVpZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGdldFhvck9mQWNjZXNzS2V5czogVW5hYmxlIHRvIGZldGNoIGNvbnZlcnNhdGlvbiBmb3IgVVVJRCAke3V1aWR9YFxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY2Nlc3NLZXkgPSBnZXRBY2Nlc3NLZXkoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgIGlmICghYWNjZXNzS2V5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoYGdldFhvck9mQWNjZXNzS2V5czogTm8gYWNjZXNzS2V5IGZvciBVVUlEICR7dXVpZH1gKTtcbiAgICB9XG5cbiAgICBjb25zdCBhY2Nlc3NLZXlCdWZmZXIgPSBCdWZmZXIuZnJvbShhY2Nlc3NLZXksICdiYXNlNjQnKTtcbiAgICBpZiAoYWNjZXNzS2V5QnVmZmVyLmxlbmd0aCAhPT0gQUNDRVNTX0tFWV9MRU5HVEgpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgYGdldFhvck9mQWNjZXNzS2V5czogQWNjZXNzIGtleSBmb3IgJHt1dWlkfSBoYWQgbGVuZ3RoICR7YWNjZXNzS2V5QnVmZmVyLmxlbmd0aH1gXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgQUNDRVNTX0tFWV9MRU5HVEg7IGkgKz0gMSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIHJlc3VsdFtpXSBePSBhY2Nlc3NLZXlCdWZmZXJbaV07XG4gICAgfVxuICB9KTtcblxuICByZXR1cm4gcmVzdWx0O1xufVxuXG5hc3luYyBmdW5jdGlvbiBlbmNyeXB0Rm9yU2VuZGVyS2V5KHtcbiAgY29udGVudEhpbnQsXG4gIGNvbnRlbnRNZXNzYWdlLFxuICBkZXZpY2VzLFxuICBkaXN0cmlidXRpb25JZCxcbiAgZ3JvdXBJZCxcbn06IHtcbiAgY29udGVudEhpbnQ6IG51bWJlcjtcbiAgY29udGVudE1lc3NhZ2U6IFVpbnQ4QXJyYXk7XG4gIGRldmljZXM6IEFycmF5PERldmljZVR5cGU+O1xuICBkaXN0cmlidXRpb25JZDogc3RyaW5nO1xuICBncm91cElkPzogc3RyaW5nO1xufSk6IFByb21pc2U8QnVmZmVyPiB7XG4gIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcbiAgY29uc3Qgb3VyRGV2aWNlSWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0RGV2aWNlSWQoKTtcbiAgaWYgKCFvdXJEZXZpY2VJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdlbmNyeXB0Rm9yU2VuZGVyS2V5OiBVbmFibGUgdG8gZmV0Y2ggb3VyIHV1aWQgb3IgZGV2aWNlSWQnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHNlbmRlciA9IFByb3RvY29sQWRkcmVzcy5uZXcoXG4gICAgb3VyVXVpZC50b1N0cmluZygpLFxuICAgIHBhcnNlSW50T3JUaHJvdyhvdXJEZXZpY2VJZCwgJ2VuY3J5cHRGb3JTZW5kZXJLZXksIG91ckRldmljZUlkJylcbiAgKTtcbiAgY29uc3Qgb3VyQWRkcmVzcyA9IGdldE91ckFkZHJlc3MoKTtcbiAgY29uc3Qgc2VuZGVyS2V5U3RvcmUgPSBuZXcgU2VuZGVyS2V5cyh7IG91clV1aWQsIHpvbmU6IEdMT0JBTF9aT05FIH0pO1xuICBjb25zdCBtZXNzYWdlID0gQnVmZmVyLmZyb20ocGFkTWVzc2FnZShjb250ZW50TWVzc2FnZSkpO1xuXG4gIGNvbnN0IGNpcGhlcnRleHRNZXNzYWdlID1cbiAgICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmVucXVldWVTZW5kZXJLZXlKb2IoXG4gICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBvdXJBZGRyZXNzKSxcbiAgICAgICgpID0+IGdyb3VwRW5jcnlwdChzZW5kZXIsIGRpc3RyaWJ1dGlvbklkLCBzZW5kZXJLZXlTdG9yZSwgbWVzc2FnZSlcbiAgICApO1xuXG4gIGNvbnN0IGdyb3VwSWRCdWZmZXIgPSBncm91cElkID8gQnVmZmVyLmZyb20oZ3JvdXBJZCwgJ2Jhc2U2NCcpIDogbnVsbDtcbiAgY29uc3Qgc2VuZGVyQ2VydGlmaWNhdGVPYmplY3QgPSBhd2FpdCBzZW5kZXJDZXJ0aWZpY2F0ZVNlcnZpY2UuZ2V0KFxuICAgIFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NFxuICApO1xuICBpZiAoIXNlbmRlckNlcnRpZmljYXRlT2JqZWN0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdlbmNyeXB0Rm9yU2VuZGVyS2V5OiBVbmFibGUgdG8gZmV0Y2ggc2VuZGVyIGNlcnRpZmljYXRlIScpO1xuICB9XG5cbiAgY29uc3Qgc2VuZGVyQ2VydGlmaWNhdGUgPSBTZW5kZXJDZXJ0aWZpY2F0ZS5kZXNlcmlhbGl6ZShcbiAgICBCdWZmZXIuZnJvbShzZW5kZXJDZXJ0aWZpY2F0ZU9iamVjdC5zZXJpYWxpemVkKVxuICApO1xuICBjb25zdCBjb250ZW50ID0gVW5pZGVudGlmaWVkU2VuZGVyTWVzc2FnZUNvbnRlbnQubmV3KFxuICAgIGNpcGhlcnRleHRNZXNzYWdlLFxuICAgIHNlbmRlckNlcnRpZmljYXRlLFxuICAgIGNvbnRlbnRIaW50LFxuICAgIGdyb3VwSWRCdWZmZXJcbiAgKTtcblxuICBjb25zdCByZWNpcGllbnRzID0gZGV2aWNlc1xuICAgIC5zbGljZSgpXG4gICAgLnNvcnQoKGEsIGIpOiBudW1iZXIgPT4ge1xuICAgICAgaWYgKGEuaWRlbnRpZmllciA9PT0gYi5pZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiAwO1xuICAgICAgfVxuXG4gICAgICBpZiAoYS5pZGVudGlmaWVyIDwgYi5pZGVudGlmaWVyKSB7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIDE7XG4gICAgfSlcbiAgICAubWFwKGRldmljZSA9PiB7XG4gICAgICByZXR1cm4gUHJvdG9jb2xBZGRyZXNzLm5ldyhcbiAgICAgICAgVVVJRC5jaGVja2VkTG9va3VwKGRldmljZS5pZGVudGlmaWVyKS50b1N0cmluZygpLFxuICAgICAgICBkZXZpY2UuaWRcbiAgICAgICk7XG4gICAgfSk7XG4gIGNvbnN0IGlkZW50aXR5S2V5U3RvcmUgPSBuZXcgSWRlbnRpdHlLZXlzKHsgb3VyVXVpZCB9KTtcbiAgY29uc3Qgc2Vzc2lvblN0b3JlID0gbmV3IFNlc3Npb25zKHsgb3VyVXVpZCB9KTtcbiAgcmV0dXJuIHNlYWxlZFNlbmRlck11bHRpUmVjaXBpZW50RW5jcnlwdChcbiAgICBjb250ZW50LFxuICAgIHJlY2lwaWVudHMsXG4gICAgaWRlbnRpdHlLZXlTdG9yZSxcbiAgICBzZXNzaW9uU3RvcmVcbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNWYWxpZFNlbmRlcktleVJlY2lwaWVudChcbiAgbWVtYmVyczogU2V0PENvbnZlcnNhdGlvbk1vZGVsPixcbiAgdXVpZDogc3RyaW5nXG4pOiBib29sZWFuIHtcbiAgY29uc3QgbWVtYmVyQ29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KHV1aWQpO1xuICBpZiAoIW1lbWJlckNvbnZlcnNhdGlvbikge1xuICAgIGxvZy53YXJuKFxuICAgICAgYGlzVmFsaWRTZW5kZXJLZXlSZWNpcGllbnQ6IE1pc3NpbmcgY29udmVyc2F0aW9uIG1vZGVsIGZvciBtZW1iZXIgJHt1dWlkfWBcbiAgICApO1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIGlmICghbWVtYmVycy5oYXMobWVtYmVyQ29udmVyc2F0aW9uKSkge1xuICAgIGxvZy5pbmZvKFxuICAgICAgYGlzVmFsaWRTZW5kZXJLZXlSZWNpcGllbnQ6IFNlbmRpbmcgdG8gJHt1dWlkfSwgbm90IGEgZ3JvdXAgbWVtYmVyYFxuICAgICk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgY2FwYWJpbGl0aWVzID0gbWVtYmVyQ29udmVyc2F0aW9uLmdldCgnY2FwYWJpbGl0aWVzJyk7XG4gIGlmICghY2FwYWJpbGl0aWVzPy5zZW5kZXJLZXkpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAoIWdldEFjY2Vzc0tleShtZW1iZXJDb252ZXJzYXRpb24uYXR0cmlidXRlcykpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBpZiAobWVtYmVyQ29udmVyc2F0aW9uLmlzVW5yZWdpc3RlcmVkKCkpIHtcbiAgICBsb2cud2FybihgaXNWYWxpZFNlbmRlcktleVJlY2lwaWVudDogTWVtYmVyICR7dXVpZH0gaXMgdW5yZWdpc3RlcmVkYCk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIGRldmljZUNvbXBhcmF0b3IobGVmdD86IERldmljZVR5cGUsIHJpZ2h0PzogRGV2aWNlVHlwZSk6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBsZWZ0ICYmXG4gICAgICByaWdodCAmJlxuICAgICAgbGVmdC5pZCA9PT0gcmlnaHQuaWQgJiZcbiAgICAgIGxlZnQuaWRlbnRpZmllciA9PT0gcmlnaHQuaWRlbnRpZmllciAmJlxuICAgICAgbGVmdC5yZWdpc3RyYXRpb25JZCA9PT0gcmlnaHQucmVnaXN0cmF0aW9uSWRcbiAgKTtcbn1cblxudHlwZSBQYXJ0aWFsRGV2aWNlVHlwZSA9IE9taXQ8RGV2aWNlVHlwZSwgJ3JlZ2lzdHJhdGlvbklkJz47XG5cbmZ1bmN0aW9uIHBhcnRpYWxEZXZpY2VDb21wYXJhdG9yKFxuICBsZWZ0PzogUGFydGlhbERldmljZVR5cGUsXG4gIHJpZ2h0PzogUGFydGlhbERldmljZVR5cGVcbik6IGJvb2xlYW4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBsZWZ0ICYmXG4gICAgICByaWdodCAmJlxuICAgICAgbGVmdC5pZCA9PT0gcmlnaHQuaWQgJiZcbiAgICAgIGxlZnQuaWRlbnRpZmllciA9PT0gcmlnaHQuaWRlbnRpZmllclxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRVdWlkc0Zyb21EZXZpY2VzKGRldmljZXM6IEFycmF5PERldmljZVR5cGU+KTogQXJyYXk8c3RyaW5nPiB7XG4gIGNvbnN0IHV1aWRzID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGRldmljZXMuZm9yRWFjaChkZXZpY2UgPT4ge1xuICAgIHV1aWRzLmFkZChkZXZpY2UuaWRlbnRpZmllcik7XG4gIH0pO1xuXG4gIHJldHVybiBBcnJheS5mcm9tKHV1aWRzKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIF9hbmFseXplU2VuZGVyS2V5RGV2aWNlcyhcbiAgbWVtYmVyRGV2aWNlczogQXJyYXk8RGV2aWNlVHlwZT4sXG4gIGRldmljZXNGb3JTZW5kOiBBcnJheTxEZXZpY2VUeXBlPixcbiAgaXNQYXJ0aWFsU2VuZD86IGJvb2xlYW5cbik6IHtcbiAgbmV3VG9NZW1iZXJEZXZpY2VzOiBBcnJheTxEZXZpY2VUeXBlPjtcbiAgbmV3VG9NZW1iZXJVdWlkczogQXJyYXk8c3RyaW5nPjtcbiAgcmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzOiBBcnJheTxEZXZpY2VUeXBlPjtcbiAgcmVtb3ZlZEZyb21NZW1iZXJVdWlkczogQXJyYXk8c3RyaW5nPjtcbn0ge1xuICBjb25zdCBuZXdUb01lbWJlckRldmljZXMgPSBkaWZmZXJlbmNlV2l0aDxEZXZpY2VUeXBlLCBEZXZpY2VUeXBlPihcbiAgICBkZXZpY2VzRm9yU2VuZCxcbiAgICBtZW1iZXJEZXZpY2VzLFxuICAgIGRldmljZUNvbXBhcmF0b3JcbiAgKTtcbiAgY29uc3QgbmV3VG9NZW1iZXJVdWlkcyA9IGdldFV1aWRzRnJvbURldmljZXMobmV3VG9NZW1iZXJEZXZpY2VzKTtcblxuICAvLyBJZiB0aGlzIGlzIGEgcGFydGlhbCBzZW5kLCB3ZSB3b24ndCBkbyBhbnl0aGluZyB3aXRoIGRldmljZSByZW1vdmFsc1xuICBpZiAoaXNQYXJ0aWFsU2VuZCkge1xuICAgIHJldHVybiB7XG4gICAgICBuZXdUb01lbWJlckRldmljZXMsXG4gICAgICBuZXdUb01lbWJlclV1aWRzLFxuICAgICAgcmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzOiBbXSxcbiAgICAgIHJlbW92ZWRGcm9tTWVtYmVyVXVpZHM6IFtdLFxuICAgIH07XG4gIH1cblxuICBjb25zdCByZW1vdmVkRnJvbU1lbWJlckRldmljZXMgPSBkaWZmZXJlbmNlV2l0aDxEZXZpY2VUeXBlLCBEZXZpY2VUeXBlPihcbiAgICBtZW1iZXJEZXZpY2VzLFxuICAgIGRldmljZXNGb3JTZW5kLFxuICAgIGRldmljZUNvbXBhcmF0b3JcbiAgKTtcbiAgY29uc3QgcmVtb3ZlZEZyb21NZW1iZXJVdWlkcyA9IGdldFV1aWRzRnJvbURldmljZXMocmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzKTtcblxuICByZXR1cm4ge1xuICAgIG5ld1RvTWVtYmVyRGV2aWNlcyxcbiAgICBuZXdUb01lbWJlclV1aWRzLFxuICAgIHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcyxcbiAgICByZW1vdmVkRnJvbU1lbWJlclV1aWRzLFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRPdXJBZGRyZXNzKCk6IEFkZHJlc3Mge1xuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG4gIGNvbnN0IG91ckRldmljZUlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldERldmljZUlkKCk7XG4gIGlmICghb3VyRGV2aWNlSWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ2dldE91ckFkZHJlc3M6IFVuYWJsZSB0byBmZXRjaCBvdXIgZGV2aWNlSWQnKTtcbiAgfVxuICByZXR1cm4gbmV3IEFkZHJlc3Mob3VyVXVpZCwgb3VyRGV2aWNlSWQpO1xufVxuXG5hc3luYyBmdW5jdGlvbiByZXNldFNlbmRlcktleShzZW5kVGFyZ2V0OiBTZW5kZXJLZXlUYXJnZXRUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGxvZ0lkID0gc2VuZFRhcmdldC5pZEZvckxvZ2dpbmcoKTtcblxuICBsb2cuaW5mbyhgcmVzZXRTZW5kZXJLZXkvJHtsb2dJZH06IFNlbmRlciBrZXkgbmVlZHMgcmVzZXQuIENsZWFyaW5nIGRhdGEuLi5gKTtcbiAgY29uc3Qgc2VuZGVyS2V5SW5mbyA9IHNlbmRUYXJnZXQuZ2V0U2VuZGVyS2V5SW5mbygpO1xuICBpZiAoIXNlbmRlcktleUluZm8pIHtcbiAgICBsb2cud2FybihgcmVzZXRTZW5kZXJLZXkvJHtsb2dJZH06IE5vIHNlbmRlciBrZXkgaW5mb2ApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHsgZGlzdHJpYnV0aW9uSWQgfSA9IHNlbmRlcktleUluZm87XG4gIGNvbnN0IG91ckFkZHJlc3MgPSBnZXRPdXJBZGRyZXNzKCk7XG5cbiAgLy8gTm90ZTogV2UgcHJlc2VydmUgZXhpc3RpbmcgZGlzdHJpYnV0aW9uSWQgdG8gbWluaW1pemUgc3BhY2UgZm9yIHNlbmRlciBrZXkgc3RvcmFnZVxuICBhd2FpdCBzZW5kVGFyZ2V0LnNhdmVTZW5kZXJLZXlJbmZvKHtcbiAgICBjcmVhdGVkQXREYXRlOiBEYXRlLm5vdygpLFxuICAgIGRpc3RyaWJ1dGlvbklkLFxuICAgIG1lbWJlckRldmljZXM6IFtdLFxuICB9KTtcblxuICBjb25zdCBvdXJVdWlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLnJlbW92ZVNlbmRlcktleShcbiAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBvdXJBZGRyZXNzKSxcbiAgICBkaXN0cmlidXRpb25JZFxuICApO1xufVxuXG5mdW5jdGlvbiBnZXRBY2Nlc3NLZXkoXG4gIGF0dHJpYnV0ZXM6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlXG4pOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCB7IHNlYWxlZFNlbmRlciwgYWNjZXNzS2V5IH0gPSBhdHRyaWJ1dGVzO1xuXG4gIGlmIChzZWFsZWRTZW5kZXIgPT09IFNFQUxFRF9TRU5ERVIuRU5BQkxFRCkge1xuICAgIHJldHVybiBhY2Nlc3NLZXkgfHwgdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKFxuICAgIHNlYWxlZFNlbmRlciA9PT0gU0VBTEVEX1NFTkRFUi5VTktOT1dOIHx8XG4gICAgc2VhbGVkU2VuZGVyID09PSBTRUFMRURfU0VOREVSLlVOUkVTVFJJQ1RFRFxuICApIHtcbiAgICByZXR1cm4gWkVST19BQ0NFU1NfS0VZO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZmV0Y2hLZXlzRm9ySWRlbnRpZmllcnMoXG4gIGlkZW50aWZpZXJzOiBBcnJheTxzdHJpbmc+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgbG9nLmluZm8oXG4gICAgYGZldGNoS2V5c0ZvcklkZW50aWZpZXJzOiBGZXRjaGluZyBrZXlzIGZvciAke2lkZW50aWZpZXJzLmxlbmd0aH0gaWRlbnRpZmllcnNgXG4gICk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBfd2FpdEZvckFsbCh7XG4gICAgICB0YXNrczogaWRlbnRpZmllcnMubWFwKFxuICAgICAgICBpZGVudGlmaWVyID0+IGFzeW5jICgpID0+IGZldGNoS2V5c0ZvcklkZW50aWZpZXIoaWRlbnRpZmllcilcbiAgICAgICksXG4gICAgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgbG9nLmVycm9yKFxuICAgICAgJ2ZldGNoS2V5c0ZvcklkZW50aWZpZXJzOiBGYWlsZWQgdG8gZmV0Y2gga2V5czonLFxuICAgICAgZXJyb3IgJiYgZXJyb3Iuc3RhY2sgPyBlcnJvci5zdGFjayA6IGVycm9yXG4gICAgKTtcbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuXG5hc3luYyBmdW5jdGlvbiBmZXRjaEtleXNGb3JJZGVudGlmaWVyKFxuICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gIGRldmljZXM/OiBBcnJheTxudW1iZXI+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgbG9nLmluZm8oXG4gICAgYGZldGNoS2V5c0ZvcklkZW50aWZpZXI6IEZldGNoaW5nICR7XG4gICAgICBkZXZpY2VzIHx8ICdhbGwnXG4gICAgfSBkZXZpY2VzIGZvciAke2lkZW50aWZpZXJ9YFxuICApO1xuXG4gIGlmICghd2luZG93LnRleHRzZWN1cmU/Lm1lc3NhZ2luZz8uc2VydmVyKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdmZXRjaEtleXNGb3JJZGVudGlmaWVyOiBObyBzZXJ2ZXIgYXZhaWxhYmxlIScpO1xuICB9XG5cbiAgY29uc3QgZW1wdHlDb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZShcbiAgICBpZGVudGlmaWVyLFxuICAgICdwcml2YXRlJ1xuICApO1xuXG4gIHRyeSB7XG4gICAgY29uc3QgeyBhY2Nlc3NLZXlGYWlsZWQgfSA9IGF3YWl0IGdldEtleXNGb3JJZGVudGlmaWVyKFxuICAgICAgaWRlbnRpZmllcixcbiAgICAgIHdpbmRvdy50ZXh0c2VjdXJlPy5tZXNzYWdpbmc/LnNlcnZlcixcbiAgICAgIGRldmljZXMsXG4gICAgICBnZXRBY2Nlc3NLZXkoZW1wdHlDb252ZXJzYXRpb24uYXR0cmlidXRlcylcbiAgICApO1xuICAgIGlmIChhY2Nlc3NLZXlGYWlsZWQpIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICBgZmV0Y2hLZXlzRm9ySWRlbnRpZmllcnM6IFNldHRpbmcgc2VhbGVkU2VuZGVyIHRvIERJU0FCTEVEIGZvciBjb252ZXJzYXRpb24gJHtlbXB0eUNvbnZlcnNhdGlvbi5pZEZvckxvZ2dpbmcoKX1gXG4gICAgICApO1xuICAgICAgZW1wdHlDb252ZXJzYXRpb24uc2V0KHtcbiAgICAgICAgc2VhbGVkU2VuZGVyOiBTRUFMRURfU0VOREVSLkRJU0FCTEVELFxuICAgICAgfSk7XG4gICAgICB3aW5kb3cuU2lnbmFsLkRhdGEudXBkYXRlQ29udmVyc2F0aW9uKGVtcHR5Q29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpO1xuICAgIH1cbiAgfSBjYXRjaCAoZXJyb3I6IHVua25vd24pIHtcbiAgICBpZiAoZXJyb3IgaW5zdGFuY2VvZiBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IpIHtcbiAgICAgIGF3YWl0IG1hcmtJZGVudGlmaWVyVW5yZWdpc3RlcmVkKGlkZW50aWZpZXIpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB0aHJvdyBlcnJvcjtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBZ0Q7QUFDaEQscUJBQW1CO0FBRW5CLDhCQU9PO0FBQ1AsWUFBdUI7QUFDdkIsK0JBQXlDO0FBRXpDLDZCQUdPO0FBQ1AscUJBQXdCO0FBQ3hCLDhCQUFpQztBQUNqQyxrQkFBcUI7QUFDckIsMEJBQW9DO0FBQ3BDLHNCQUF5QjtBQUV6Qix1QkFBNEI7QUFLNUIsb0JBS087QUFFUCw2QkFBbUQ7QUFHbkQsa0NBQXFDO0FBTXJDLCtCQUFtRDtBQUNuRCww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
