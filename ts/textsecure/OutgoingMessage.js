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
var OutgoingMessage_exports = {};
__export(OutgoingMessage_exports, {
  SenderCertificateMode: () => SenderCertificateMode,
  default: () => OutgoingMessage,
  padMessage: () => padMessage,
  serializedCertificateSchema: () => serializedCertificateSchema
});
module.exports = __toCommonJS(OutgoingMessage_exports);
var import_lodash = require("lodash");
var import_zod = require("zod");
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_Errors = require("./Errors");
var import_PhoneNumber = require("../types/PhoneNumber");
var import_Address = require("../types/Address");
var import_QualifiedAddress = require("../types/QualifiedAddress");
var import_UUID = require("../types/UUID");
var import_LibSignalStores = require("../LibSignalStores");
var import_updateConversationsWithUuidLookup = require("../updateConversationsWithUuidLookup");
var import_getKeysForIdentifier = require("./getKeysForIdentifier");
var import_protobuf = require("../protobuf");
var log = __toESM(require("../logging/log"));
var SenderCertificateMode = /* @__PURE__ */ ((SenderCertificateMode2) => {
  SenderCertificateMode2[SenderCertificateMode2["WithE164"] = 0] = "WithE164";
  SenderCertificateMode2[SenderCertificateMode2["WithoutE164"] = 1] = "WithoutE164";
  return SenderCertificateMode2;
})(SenderCertificateMode || {});
const serializedCertificateSchema = import_zod.z.object({
  expires: import_zod.z.number().optional(),
  serialized: import_zod.z.instanceof(Uint8Array)
});
function ciphertextMessageTypeToEnvelopeType(type) {
  if (type === import_libsignal_client.CiphertextMessageType.PreKey) {
    return import_protobuf.SignalService.Envelope.Type.PREKEY_BUNDLE;
  }
  if (type === import_libsignal_client.CiphertextMessageType.Whisper) {
    return import_protobuf.SignalService.Envelope.Type.CIPHERTEXT;
  }
  if (type === import_libsignal_client.CiphertextMessageType.Plaintext) {
    return import_protobuf.SignalService.Envelope.Type.PLAINTEXT_CONTENT;
  }
  throw new Error(`ciphertextMessageTypeToEnvelopeType: Unrecognized type ${type}`);
}
function getPaddedMessageLength(messageLength) {
  const messageLengthWithTerminator = messageLength + 1;
  let messagePartCount = Math.floor(messageLengthWithTerminator / 160);
  if (messageLengthWithTerminator % 160 !== 0) {
    messagePartCount += 1;
  }
  return messagePartCount * 160;
}
function padMessage(messageBuffer) {
  const plaintext = new Uint8Array(getPaddedMessageLength(messageBuffer.byteLength + 1) - 1);
  plaintext.set(messageBuffer);
  plaintext[messageBuffer.byteLength] = 128;
  return plaintext;
}
class OutgoingMessage {
  constructor({
    callback,
    contentHint,
    groupId,
    identifiers,
    message,
    options,
    sendLogCallback,
    server,
    timestamp
  }) {
    if (message instanceof import_protobuf.SignalService.DataMessage) {
      const content = new import_protobuf.SignalService.Content();
      content.dataMessage = message;
      this.message = content;
    } else {
      this.message = message;
    }
    this.server = server;
    this.timestamp = timestamp;
    this.identifiers = identifiers;
    this.contentHint = contentHint;
    this.groupId = groupId;
    this.callback = callback;
    this.identifiersCompleted = 0;
    this.errors = [];
    this.successfulIdentifiers = [];
    this.failoverIdentifiers = [];
    this.unidentifiedDeliveries = [];
    this.recipients = {};
    this.sendLogCallback = sendLogCallback;
    this.sendMetadata = options?.sendMetadata;
    this.online = options?.online;
  }
  numberCompleted() {
    this.identifiersCompleted += 1;
    if (this.identifiersCompleted >= this.identifiers.length) {
      const proto = this.message;
      const contentProto = this.getContentProtoBytes();
      const { timestamp, contentHint, recipients } = this;
      let dataMessage;
      if (proto instanceof import_protobuf.SignalService.Content && proto.dataMessage) {
        dataMessage = import_protobuf.SignalService.DataMessage.encode(proto.dataMessage).finish();
      } else if (proto instanceof import_protobuf.SignalService.DataMessage) {
        dataMessage = import_protobuf.SignalService.DataMessage.encode(proto).finish();
      }
      this.callback({
        successfulIdentifiers: this.successfulIdentifiers,
        failoverIdentifiers: this.failoverIdentifiers,
        errors: this.errors,
        unidentifiedDeliveries: this.unidentifiedDeliveries,
        contentHint,
        dataMessage,
        recipients,
        contentProto,
        timestamp
      });
    }
  }
  registerError(identifier, reason, providedError) {
    let error = providedError;
    if (!error || error instanceof import_Errors.HTTPError && error.code !== 404) {
      if (error && error.code === 428) {
        error = new import_Errors.SendMessageChallengeError(identifier, error);
      } else {
        error = new import_Errors.OutgoingMessageError(identifier, null, null, error);
      }
    }
    error.reason = reason;
    error.stackForLog = providedError ? providedError.stack : void 0;
    this.errors[this.errors.length] = error;
    this.numberCompleted();
  }
  reloadDevicesAndSend(identifier, recurse) {
    return async () => {
      const ourUuid = window.textsecure.storage.user.getCheckedUuid();
      const deviceIds = await window.textsecure.storage.protocol.getDeviceIds({
        ourUuid,
        identifier
      });
      if (deviceIds.length === 0) {
        this.registerError(identifier, "reloadDevicesAndSend: Got empty device list when loading device keys", void 0);
        return void 0;
      }
      return this.doSendMessage(identifier, deviceIds, recurse);
    };
  }
  async getKeysForIdentifier(identifier, updateDevices) {
    const { sendMetadata } = this;
    const info = sendMetadata && sendMetadata[identifier] ? sendMetadata[identifier] : { accessKey: void 0 };
    const { accessKey } = info;
    try {
      const { accessKeyFailed } = await (0, import_getKeysForIdentifier.getKeysForIdentifier)(identifier, this.server, updateDevices, accessKey);
      if (accessKeyFailed && !this.failoverIdentifiers.includes(identifier)) {
        this.failoverIdentifiers.push(identifier);
      }
    } catch (error) {
      if (error?.message?.includes("untrusted identity for address")) {
        error.timestamp = this.timestamp;
      }
      throw error;
    }
  }
  async transmitMessage(identifier, jsonData, timestamp, { accessKey } = {}) {
    let promise;
    if (accessKey) {
      promise = this.server.sendMessagesUnauth(identifier, jsonData, timestamp, this.online, { accessKey });
    } else {
      promise = this.server.sendMessages(identifier, jsonData, timestamp, this.online);
    }
    return promise.catch((e) => {
      if (e instanceof import_Errors.HTTPError && e.code !== 409 && e.code !== 410) {
        if (e.code === 404) {
          throw new import_Errors.UnregisteredUserError(identifier, e);
        }
        if (e.code === 428) {
          throw new import_Errors.SendMessageChallengeError(identifier, e);
        }
        throw new import_Errors.SendMessageNetworkError(identifier, jsonData, e);
      }
      throw e;
    });
  }
  getPlaintext() {
    if (!this.plaintext) {
      const { message } = this;
      if (message instanceof import_protobuf.SignalService.Content) {
        this.plaintext = padMessage(import_protobuf.SignalService.Content.encode(message).finish());
      } else {
        this.plaintext = message.serialize();
      }
    }
    return this.plaintext;
  }
  getContentProtoBytes() {
    if (this.message instanceof import_protobuf.SignalService.Content) {
      return new Uint8Array(import_protobuf.SignalService.Content.encode(this.message).finish());
    }
    return void 0;
  }
  async getCiphertextMessage({
    identityKeyStore,
    protocolAddress,
    sessionStore
  }) {
    const { message } = this;
    if (message instanceof import_protobuf.SignalService.Content) {
      return (0, import_libsignal_client.signalEncrypt)(Buffer.from(this.getPlaintext()), protocolAddress, sessionStore, identityKeyStore);
    }
    return message.asCiphertextMessage();
  }
  async doSendMessage(identifier, deviceIds, recurse) {
    const { sendMetadata } = this;
    const { accessKey, senderCertificate } = sendMetadata?.[identifier] || {};
    if (accessKey && !senderCertificate) {
      log.warn("OutgoingMessage.doSendMessage: accessKey was provided, but senderCertificate was not");
    }
    const sealedSender = Boolean(accessKey && senderCertificate);
    const ourNumber = window.textsecure.storage.user.getNumber();
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const ourDeviceId = window.textsecure.storage.user.getDeviceId();
    if ((identifier === ourNumber || identifier === ourUuid.toString()) && !sealedSender) {
      deviceIds = (0, import_lodash.reject)(deviceIds, (deviceId) => deviceId === ourDeviceId || typeof ourDeviceId === "string" && deviceId === parseInt(ourDeviceId, 10));
    }
    const sessionStore = new import_LibSignalStores.Sessions({ ourUuid });
    const identityKeyStore = new import_LibSignalStores.IdentityKeys({ ourUuid });
    return Promise.all(deviceIds.map(async (destinationDeviceId) => {
      const theirUuid = import_UUID.UUID.checkedLookup(identifier);
      const address = new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, destinationDeviceId));
      return window.textsecure.storage.protocol.enqueueSessionJob(address, async () => {
        const protocolAddress = import_libsignal_client.ProtocolAddress.new(theirUuid.toString(), destinationDeviceId);
        const activeSession = await sessionStore.getSession(protocolAddress);
        if (!activeSession) {
          throw new Error("OutgoingMessage.doSendMessage: No active session!");
        }
        const destinationRegistrationId = activeSession.remoteRegistrationId();
        if (sealedSender && senderCertificate) {
          const ciphertextMessage2 = await this.getCiphertextMessage({
            identityKeyStore,
            protocolAddress,
            sessionStore
          });
          const certificate = import_libsignal_client.SenderCertificate.deserialize(Buffer.from(senderCertificate.serialized));
          const groupIdBuffer = this.groupId ? Buffer.from(this.groupId, "base64") : null;
          const content2 = import_libsignal_client.UnidentifiedSenderMessageContent.new(ciphertextMessage2, certificate, this.contentHint, groupIdBuffer);
          const buffer = await (0, import_libsignal_client.sealedSenderEncrypt)(content2, protocolAddress, identityKeyStore);
          return {
            type: import_protobuf.SignalService.Envelope.Type.UNIDENTIFIED_SENDER,
            destinationDeviceId,
            destinationRegistrationId,
            content: buffer.toString("base64")
          };
        }
        const ciphertextMessage = await this.getCiphertextMessage({
          identityKeyStore,
          protocolAddress,
          sessionStore
        });
        const type = ciphertextMessageTypeToEnvelopeType(ciphertextMessage.type());
        const content = ciphertextMessage.serialize().toString("base64");
        return {
          type,
          destinationDeviceId,
          destinationRegistrationId,
          content
        };
      });
    })).then(async (jsonData) => {
      if (sealedSender) {
        return this.transmitMessage(identifier, jsonData, this.timestamp, {
          accessKey
        }).then(() => {
          this.recipients[identifier] = deviceIds;
          this.unidentifiedDeliveries.push(identifier);
          this.successfulIdentifiers.push(identifier);
          this.numberCompleted();
          if (this.sendLogCallback) {
            this.sendLogCallback({
              identifier,
              deviceIds
            });
          } else if (this.successfulIdentifiers.length > 1) {
            log.warn(`OutgoingMessage.doSendMessage: no sendLogCallback provided for message ${this.timestamp}, but multiple recipients`);
          }
        }, async (error) => {
          if (error instanceof import_Errors.HTTPError && (error.code === 401 || error.code === 403)) {
            if (this.failoverIdentifiers.indexOf(identifier) === -1) {
              this.failoverIdentifiers.push(identifier);
            }
            if (sendMetadata) {
              delete sendMetadata[identifier];
            }
            return this.doSendMessage(identifier, deviceIds, recurse);
          }
          throw error;
        });
      }
      return this.transmitMessage(identifier, jsonData, this.timestamp).then(() => {
        this.successfulIdentifiers.push(identifier);
        this.recipients[identifier] = deviceIds;
        this.numberCompleted();
        if (this.sendLogCallback) {
          this.sendLogCallback({
            identifier,
            deviceIds
          });
        } else if (this.successfulIdentifiers.length > 1) {
          log.warn(`OutgoingMessage.doSendMessage: no sendLogCallback provided for message ${this.timestamp}, but multiple recipients`);
        }
      });
    }).catch(async (error) => {
      if (error instanceof import_Errors.HTTPError && (error.code === 410 || error.code === 409)) {
        if (!recurse) {
          this.registerError(identifier, "Hit retry limit attempting to reload device list", error);
          return void 0;
        }
        const response = error.response;
        let p = Promise.resolve();
        if (error.code === 409) {
          p = this.removeDeviceIdsForIdentifier(identifier, response.extraDevices || []);
        } else {
          p = Promise.all((response.staleDevices || []).map(async (deviceId) => {
            await window.textsecure.storage.protocol.archiveSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(import_UUID.UUID.checkedLookup(identifier), deviceId)));
          }));
        }
        return p.then(async () => {
          const resetDevices = error.code === 410 ? response.staleDevices : response.missingDevices;
          return this.getKeysForIdentifier(identifier, resetDevices).then(this.reloadDevicesAndSend(identifier, error.code === 409));
        });
      }
      if (error?.message?.includes("untrusted identity for address")) {
        error.timestamp = this.timestamp;
        log.error('Got "key changed" error from encrypt - no identityKey for application layer', identifier, deviceIds);
        log.info("closing all sessions for", identifier);
        window.textsecure.storage.protocol.archiveAllSessions(import_UUID.UUID.checkedLookup(identifier)).then(() => {
          throw error;
        }, (innerError) => {
          log.error(`doSendMessage: Error closing sessions: ${innerError.stack}`);
          throw error;
        });
      }
      this.registerError(identifier, "Failed to create or send message", error);
      return void 0;
    });
  }
  async removeDeviceIdsForIdentifier(identifier, deviceIdsToRemove) {
    const ourUuid = window.textsecure.storage.user.getCheckedUuid();
    const theirUuid = import_UUID.UUID.checkedLookup(identifier);
    await Promise.all(deviceIdsToRemove.map(async (deviceId) => {
      await window.textsecure.storage.protocol.archiveSession(new import_QualifiedAddress.QualifiedAddress(ourUuid, new import_Address.Address(theirUuid, deviceId)));
    }));
  }
  async sendToIdentifier(providedIdentifier) {
    let identifier = providedIdentifier;
    try {
      if ((0, import_UUID.isValidUuid)(identifier)) {
      } else if ((0, import_PhoneNumber.isValidNumber)(identifier)) {
        if (!window.textsecure.messaging) {
          throw new Error("sendToIdentifier: window.textsecure.messaging is not available!");
        }
        try {
          await (0, import_updateConversationsWithUuidLookup.updateConversationsWithUuidLookup)({
            conversationController: window.ConversationController,
            conversations: [
              window.ConversationController.getOrCreate(identifier, "private")
            ],
            messaging: window.textsecure.messaging
          });
          const uuid = window.ConversationController.get(identifier)?.get("uuid");
          if (!uuid) {
            throw new import_Errors.UnregisteredUserError(identifier, new import_Errors.HTTPError("User is not registered", {
              code: -1,
              headers: {}
            }));
          }
          identifier = uuid;
        } catch (error) {
          log.error(`sendToIdentifier: Failed to fetch UUID for identifier ${identifier}`, error && error.stack ? error.stack : error);
        }
      } else {
        throw new Error(`sendToIdentifier: identifier ${identifier} was neither a UUID or E164`);
      }
      const ourUuid = window.textsecure.storage.user.getCheckedUuid();
      const deviceIds = await window.textsecure.storage.protocol.getDeviceIds({
        ourUuid,
        identifier
      });
      if (deviceIds.length === 0) {
        await this.getKeysForIdentifier(identifier);
      }
      await this.reloadDevicesAndSend(identifier, true)();
    } catch (error) {
      if (error?.message?.includes("untrusted identity for address")) {
        const newError = new import_Errors.OutgoingIdentityKeyError(identifier);
        this.registerError(identifier, "Untrusted identity", newError);
      } else {
        this.registerError(identifier, `Failed to retrieve new device keys for identifier ${identifier}`, error);
      }
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SenderCertificateMode,
  padMessage,
  serializedCertificateSchema
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiT3V0Z29pbmdNZXNzYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuLyogZXNsaW50LWRpc2FibGUgbW9yZS9uby10aGVuICovXG4vKiBlc2xpbnQtZGlzYWJsZSBuby1wYXJhbS1yZWFzc2lnbiAqL1xuXG5pbXBvcnQgeyByZWplY3QgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyB6IH0gZnJvbSAnem9kJztcbmltcG9ydCB0eXBlIHtcbiAgQ2lwaGVydGV4dE1lc3NhZ2UsXG4gIFBsYWludGV4dENvbnRlbnQsXG59IGZyb20gJ0BzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudCc7XG5pbXBvcnQge1xuICBDaXBoZXJ0ZXh0TWVzc2FnZVR5cGUsXG4gIFByb3RvY29sQWRkcmVzcyxcbiAgc2VhbGVkU2VuZGVyRW5jcnlwdCxcbiAgU2VuZGVyQ2VydGlmaWNhdGUsXG4gIHNpZ25hbEVuY3J5cHQsXG4gIFVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2VDb250ZW50LFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQgdHlwZSB7IFdlYkFQSVR5cGUsIE1lc3NhZ2VUeXBlIH0gZnJvbSAnLi9XZWJBUEknO1xuaW1wb3J0IHR5cGUgeyBTZW5kTWV0YWRhdGFUeXBlLCBTZW5kT3B0aW9uc1R5cGUgfSBmcm9tICcuL1NlbmRNZXNzYWdlJztcbmltcG9ydCB7XG4gIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvcixcbiAgT3V0Z29pbmdNZXNzYWdlRXJyb3IsXG4gIFNlbmRNZXNzYWdlTmV0d29ya0Vycm9yLFxuICBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yLFxuICBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IsXG4gIEhUVFBFcnJvcixcbn0gZnJvbSAnLi9FcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBDYWxsYmFja1Jlc3VsdFR5cGUsIEN1c3RvbUVycm9yIH0gZnJvbSAnLi9UeXBlcy5kJztcbmltcG9ydCB7IGlzVmFsaWROdW1iZXIgfSBmcm9tICcuLi90eXBlcy9QaG9uZU51bWJlcic7XG5pbXBvcnQgeyBBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvQWRkcmVzcyc7XG5pbXBvcnQgeyBRdWFsaWZpZWRBZGRyZXNzIH0gZnJvbSAnLi4vdHlwZXMvUXVhbGlmaWVkQWRkcmVzcyc7XG5pbXBvcnQgeyBVVUlELCBpc1ZhbGlkVXVpZCB9IGZyb20gJy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgU2Vzc2lvbnMsIElkZW50aXR5S2V5cyB9IGZyb20gJy4uL0xpYlNpZ25hbFN0b3Jlcyc7XG5pbXBvcnQgeyB1cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAgfSBmcm9tICcuLi91cGRhdGVDb252ZXJzYXRpb25zV2l0aFV1aWRMb29rdXAnO1xuaW1wb3J0IHsgZ2V0S2V5c0ZvcklkZW50aWZpZXIgfSBmcm9tICcuL2dldEtleXNGb3JJZGVudGlmaWVyJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuXG5leHBvcnQgY29uc3QgZW51bSBTZW5kZXJDZXJ0aWZpY2F0ZU1vZGUge1xuICBXaXRoRTE2NCxcbiAgV2l0aG91dEUxNjQsXG59XG5cbmV4cG9ydCB0eXBlIFNlbmRMb2dDYWxsYmFja1R5cGUgPSAob3B0aW9uczoge1xuICBpZGVudGlmaWVyOiBzdHJpbmc7XG4gIGRldmljZUlkczogQXJyYXk8bnVtYmVyPjtcbn0pID0+IFByb21pc2U8dm9pZD47XG5cbmV4cG9ydCBjb25zdCBzZXJpYWxpemVkQ2VydGlmaWNhdGVTY2hlbWEgPSB6Lm9iamVjdCh7XG4gIGV4cGlyZXM6IHoubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgc2VyaWFsaXplZDogei5pbnN0YW5jZW9mKFVpbnQ4QXJyYXkpLFxufSk7XG5cbmV4cG9ydCB0eXBlIFNlcmlhbGl6ZWRDZXJ0aWZpY2F0ZVR5cGUgPSB6LmluZmVyPFxuICB0eXBlb2Ygc2VyaWFsaXplZENlcnRpZmljYXRlU2NoZW1hXG4+O1xuXG50eXBlIE91dGdvaW5nTWVzc2FnZU9wdGlvbnNUeXBlID0gU2VuZE9wdGlvbnNUeXBlICYge1xuICBvbmxpbmU/OiBib29sZWFuO1xufTtcblxuZnVuY3Rpb24gY2lwaGVydGV4dE1lc3NhZ2VUeXBlVG9FbnZlbG9wZVR5cGUodHlwZTogbnVtYmVyKSB7XG4gIGlmICh0eXBlID09PSBDaXBoZXJ0ZXh0TWVzc2FnZVR5cGUuUHJlS2V5KSB7XG4gICAgcmV0dXJuIFByb3RvLkVudmVsb3BlLlR5cGUuUFJFS0VZX0JVTkRMRTtcbiAgfVxuICBpZiAodHlwZSA9PT0gQ2lwaGVydGV4dE1lc3NhZ2VUeXBlLldoaXNwZXIpIHtcbiAgICByZXR1cm4gUHJvdG8uRW52ZWxvcGUuVHlwZS5DSVBIRVJURVhUO1xuICB9XG4gIGlmICh0eXBlID09PSBDaXBoZXJ0ZXh0TWVzc2FnZVR5cGUuUGxhaW50ZXh0KSB7XG4gICAgcmV0dXJuIFByb3RvLkVudmVsb3BlLlR5cGUuUExBSU5URVhUX0NPTlRFTlQ7XG4gIH1cbiAgdGhyb3cgbmV3IEVycm9yKFxuICAgIGBjaXBoZXJ0ZXh0TWVzc2FnZVR5cGVUb0VudmVsb3BlVHlwZTogVW5yZWNvZ25pemVkIHR5cGUgJHt0eXBlfWBcbiAgKTtcbn1cblxuZnVuY3Rpb24gZ2V0UGFkZGVkTWVzc2FnZUxlbmd0aChtZXNzYWdlTGVuZ3RoOiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBtZXNzYWdlTGVuZ3RoV2l0aFRlcm1pbmF0b3IgPSBtZXNzYWdlTGVuZ3RoICsgMTtcbiAgbGV0IG1lc3NhZ2VQYXJ0Q291bnQgPSBNYXRoLmZsb29yKG1lc3NhZ2VMZW5ndGhXaXRoVGVybWluYXRvciAvIDE2MCk7XG5cbiAgaWYgKG1lc3NhZ2VMZW5ndGhXaXRoVGVybWluYXRvciAlIDE2MCAhPT0gMCkge1xuICAgIG1lc3NhZ2VQYXJ0Q291bnQgKz0gMTtcbiAgfVxuXG4gIHJldHVybiBtZXNzYWdlUGFydENvdW50ICogMTYwO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFkTWVzc2FnZShtZXNzYWdlQnVmZmVyOiBVaW50OEFycmF5KTogVWludDhBcnJheSB7XG4gIGNvbnN0IHBsYWludGV4dCA9IG5ldyBVaW50OEFycmF5KFxuICAgIGdldFBhZGRlZE1lc3NhZ2VMZW5ndGgobWVzc2FnZUJ1ZmZlci5ieXRlTGVuZ3RoICsgMSkgLSAxXG4gICk7XG4gIHBsYWludGV4dC5zZXQobWVzc2FnZUJ1ZmZlcik7XG4gIHBsYWludGV4dFttZXNzYWdlQnVmZmVyLmJ5dGVMZW5ndGhdID0gMHg4MDtcblxuICByZXR1cm4gcGxhaW50ZXh0O1xufVxuXG5leHBvcnQgZGVmYXVsdCBjbGFzcyBPdXRnb2luZ01lc3NhZ2Uge1xuICBzZXJ2ZXI6IFdlYkFQSVR5cGU7XG5cbiAgdGltZXN0YW1wOiBudW1iZXI7XG5cbiAgaWRlbnRpZmllcnM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcblxuICBtZXNzYWdlOiBQcm90by5Db250ZW50IHwgUGxhaW50ZXh0Q29udGVudDtcblxuICBjYWxsYmFjazogKHJlc3VsdDogQ2FsbGJhY2tSZXN1bHRUeXBlKSA9PiB2b2lkO1xuXG4gIHBsYWludGV4dD86IFVpbnQ4QXJyYXk7XG5cbiAgaWRlbnRpZmllcnNDb21wbGV0ZWQ6IG51bWJlcjtcblxuICBlcnJvcnM6IEFycmF5PEN1c3RvbUVycm9yPjtcblxuICBzdWNjZXNzZnVsSWRlbnRpZmllcnM6IEFycmF5PHN0cmluZz47XG5cbiAgZmFpbG92ZXJJZGVudGlmaWVyczogQXJyYXk8c3RyaW5nPjtcblxuICB1bmlkZW50aWZpZWREZWxpdmVyaWVzOiBBcnJheTxzdHJpbmc+O1xuXG4gIHNlbmRNZXRhZGF0YT86IFNlbmRNZXRhZGF0YVR5cGU7XG5cbiAgb25saW5lPzogYm9vbGVhbjtcblxuICBncm91cElkPzogc3RyaW5nO1xuXG4gIGNvbnRlbnRIaW50OiBudW1iZXI7XG5cbiAgcmVjaXBpZW50czogUmVjb3JkPHN0cmluZywgQXJyYXk8bnVtYmVyPj47XG5cbiAgc2VuZExvZ0NhbGxiYWNrPzogU2VuZExvZ0NhbGxiYWNrVHlwZTtcblxuICBjb25zdHJ1Y3Rvcih7XG4gICAgY2FsbGJhY2ssXG4gICAgY29udGVudEhpbnQsXG4gICAgZ3JvdXBJZCxcbiAgICBpZGVudGlmaWVycyxcbiAgICBtZXNzYWdlLFxuICAgIG9wdGlvbnMsXG4gICAgc2VuZExvZ0NhbGxiYWNrLFxuICAgIHNlcnZlcixcbiAgICB0aW1lc3RhbXAsXG4gIH06IHtcbiAgICBjYWxsYmFjazogKHJlc3VsdDogQ2FsbGJhY2tSZXN1bHRUeXBlKSA9PiB2b2lkO1xuICAgIGNvbnRlbnRIaW50OiBudW1iZXI7XG4gICAgZ3JvdXBJZDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgIGlkZW50aWZpZXJzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG4gICAgbWVzc2FnZTogUHJvdG8uQ29udGVudCB8IFByb3RvLkRhdGFNZXNzYWdlIHwgUGxhaW50ZXh0Q29udGVudDtcbiAgICBvcHRpb25zPzogT3V0Z29pbmdNZXNzYWdlT3B0aW9uc1R5cGU7XG4gICAgc2VuZExvZ0NhbGxiYWNrPzogU2VuZExvZ0NhbGxiYWNrVHlwZTtcbiAgICBzZXJ2ZXI6IFdlYkFQSVR5cGU7XG4gICAgdGltZXN0YW1wOiBudW1iZXI7XG4gIH0pIHtcbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFByb3RvLkRhdGFNZXNzYWdlKSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gbmV3IFByb3RvLkNvbnRlbnQoKTtcbiAgICAgIGNvbnRlbnQuZGF0YU1lc3NhZ2UgPSBtZXNzYWdlO1xuICAgICAgdGhpcy5tZXNzYWdlID0gY29udGVudDtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5tZXNzYWdlID0gbWVzc2FnZTtcbiAgICB9XG5cbiAgICB0aGlzLnNlcnZlciA9IHNlcnZlcjtcbiAgICB0aGlzLnRpbWVzdGFtcCA9IHRpbWVzdGFtcDtcbiAgICB0aGlzLmlkZW50aWZpZXJzID0gaWRlbnRpZmllcnM7XG4gICAgdGhpcy5jb250ZW50SGludCA9IGNvbnRlbnRIaW50O1xuICAgIHRoaXMuZ3JvdXBJZCA9IGdyb3VwSWQ7XG4gICAgdGhpcy5jYWxsYmFjayA9IGNhbGxiYWNrO1xuXG4gICAgdGhpcy5pZGVudGlmaWVyc0NvbXBsZXRlZCA9IDA7XG4gICAgdGhpcy5lcnJvcnMgPSBbXTtcbiAgICB0aGlzLnN1Y2Nlc3NmdWxJZGVudGlmaWVycyA9IFtdO1xuICAgIHRoaXMuZmFpbG92ZXJJZGVudGlmaWVycyA9IFtdO1xuICAgIHRoaXMudW5pZGVudGlmaWVkRGVsaXZlcmllcyA9IFtdO1xuICAgIHRoaXMucmVjaXBpZW50cyA9IHt9O1xuICAgIHRoaXMuc2VuZExvZ0NhbGxiYWNrID0gc2VuZExvZ0NhbGxiYWNrO1xuXG4gICAgdGhpcy5zZW5kTWV0YWRhdGEgPSBvcHRpb25zPy5zZW5kTWV0YWRhdGE7XG4gICAgdGhpcy5vbmxpbmUgPSBvcHRpb25zPy5vbmxpbmU7XG4gIH1cblxuICBudW1iZXJDb21wbGV0ZWQoKTogdm9pZCB7XG4gICAgdGhpcy5pZGVudGlmaWVyc0NvbXBsZXRlZCArPSAxO1xuICAgIGlmICh0aGlzLmlkZW50aWZpZXJzQ29tcGxldGVkID49IHRoaXMuaWRlbnRpZmllcnMubGVuZ3RoKSB7XG4gICAgICBjb25zdCBwcm90byA9IHRoaXMubWVzc2FnZTtcbiAgICAgIGNvbnN0IGNvbnRlbnRQcm90byA9IHRoaXMuZ2V0Q29udGVudFByb3RvQnl0ZXMoKTtcbiAgICAgIGNvbnN0IHsgdGltZXN0YW1wLCBjb250ZW50SGludCwgcmVjaXBpZW50cyB9ID0gdGhpcztcbiAgICAgIGxldCBkYXRhTWVzc2FnZTogVWludDhBcnJheSB8IHVuZGVmaW5lZDtcblxuICAgICAgaWYgKHByb3RvIGluc3RhbmNlb2YgUHJvdG8uQ29udGVudCAmJiBwcm90by5kYXRhTWVzc2FnZSkge1xuICAgICAgICBkYXRhTWVzc2FnZSA9IFByb3RvLkRhdGFNZXNzYWdlLmVuY29kZShwcm90by5kYXRhTWVzc2FnZSkuZmluaXNoKCk7XG4gICAgICB9IGVsc2UgaWYgKHByb3RvIGluc3RhbmNlb2YgUHJvdG8uRGF0YU1lc3NhZ2UpIHtcbiAgICAgICAgZGF0YU1lc3NhZ2UgPSBQcm90by5EYXRhTWVzc2FnZS5lbmNvZGUocHJvdG8pLmZpbmlzaCgpO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmNhbGxiYWNrKHtcbiAgICAgICAgc3VjY2Vzc2Z1bElkZW50aWZpZXJzOiB0aGlzLnN1Y2Nlc3NmdWxJZGVudGlmaWVycyxcbiAgICAgICAgZmFpbG92ZXJJZGVudGlmaWVyczogdGhpcy5mYWlsb3ZlcklkZW50aWZpZXJzLFxuICAgICAgICBlcnJvcnM6IHRoaXMuZXJyb3JzLFxuICAgICAgICB1bmlkZW50aWZpZWREZWxpdmVyaWVzOiB0aGlzLnVuaWRlbnRpZmllZERlbGl2ZXJpZXMsXG5cbiAgICAgICAgY29udGVudEhpbnQsXG4gICAgICAgIGRhdGFNZXNzYWdlLFxuICAgICAgICByZWNpcGllbnRzLFxuICAgICAgICBjb250ZW50UHJvdG8sXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHJlZ2lzdGVyRXJyb3IoXG4gICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgIHJlYXNvbjogc3RyaW5nLFxuICAgIHByb3ZpZGVkRXJyb3I/OiBFcnJvclxuICApOiB2b2lkIHtcbiAgICBsZXQgZXJyb3IgPSBwcm92aWRlZEVycm9yO1xuXG4gICAgaWYgKCFlcnJvciB8fCAoZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IgJiYgZXJyb3IuY29kZSAhPT0gNDA0KSkge1xuICAgICAgaWYgKGVycm9yICYmIGVycm9yLmNvZGUgPT09IDQyOCkge1xuICAgICAgICBlcnJvciA9IG5ldyBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yKGlkZW50aWZpZXIsIGVycm9yKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGVycm9yID0gbmV3IE91dGdvaW5nTWVzc2FnZUVycm9yKGlkZW50aWZpZXIsIG51bGwsIG51bGwsIGVycm9yKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBlcnJvci5yZWFzb24gPSByZWFzb247XG4gICAgZXJyb3Iuc3RhY2tGb3JMb2cgPSBwcm92aWRlZEVycm9yID8gcHJvdmlkZWRFcnJvci5zdGFjayA6IHVuZGVmaW5lZDtcblxuICAgIHRoaXMuZXJyb3JzW3RoaXMuZXJyb3JzLmxlbmd0aF0gPSBlcnJvcjtcbiAgICB0aGlzLm51bWJlckNvbXBsZXRlZCgpO1xuICB9XG5cbiAgcmVsb2FkRGV2aWNlc0FuZFNlbmQoXG4gICAgaWRlbnRpZmllcjogc3RyaW5nLFxuICAgIHJlY3Vyc2U/OiBib29sZWFuXG4gICk6ICgpID0+IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG4gICAgICBjb25zdCBkZXZpY2VJZHMgPSBhd2FpdCB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmdldERldmljZUlkcyh7XG4gICAgICAgIG91clV1aWQsXG4gICAgICAgIGlkZW50aWZpZXIsXG4gICAgICB9KTtcbiAgICAgIGlmIChkZXZpY2VJZHMubGVuZ3RoID09PSAwKSB7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFcnJvcihcbiAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICdyZWxvYWREZXZpY2VzQW5kU2VuZDogR290IGVtcHR5IGRldmljZSBsaXN0IHdoZW4gbG9hZGluZyBkZXZpY2Uga2V5cycsXG4gICAgICAgICAgdW5kZWZpbmVkXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy5kb1NlbmRNZXNzYWdlKGlkZW50aWZpZXIsIGRldmljZUlkcywgcmVjdXJzZSk7XG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldEtleXNGb3JJZGVudGlmaWVyKFxuICAgIGlkZW50aWZpZXI6IHN0cmluZyxcbiAgICB1cGRhdGVEZXZpY2VzPzogQXJyYXk8bnVtYmVyPlxuICApOiBQcm9taXNlPHZvaWQgfCBBcnJheTx2b2lkIHwgbnVsbD4+IHtcbiAgICBjb25zdCB7IHNlbmRNZXRhZGF0YSB9ID0gdGhpcztcbiAgICBjb25zdCBpbmZvID1cbiAgICAgIHNlbmRNZXRhZGF0YSAmJiBzZW5kTWV0YWRhdGFbaWRlbnRpZmllcl1cbiAgICAgICAgPyBzZW5kTWV0YWRhdGFbaWRlbnRpZmllcl1cbiAgICAgICAgOiB7IGFjY2Vzc0tleTogdW5kZWZpbmVkIH07XG4gICAgY29uc3QgeyBhY2Nlc3NLZXkgfSA9IGluZm87XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgeyBhY2Nlc3NLZXlGYWlsZWQgfSA9IGF3YWl0IGdldEtleXNGb3JJZGVudGlmaWVyKFxuICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICB0aGlzLnNlcnZlcixcbiAgICAgICAgdXBkYXRlRGV2aWNlcyxcbiAgICAgICAgYWNjZXNzS2V5XG4gICAgICApO1xuICAgICAgaWYgKGFjY2Vzc0tleUZhaWxlZCAmJiAhdGhpcy5mYWlsb3ZlcklkZW50aWZpZXJzLmluY2x1ZGVzKGlkZW50aWZpZXIpKSB7XG4gICAgICAgIHRoaXMuZmFpbG92ZXJJZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCd1bnRydXN0ZWQgaWRlbnRpdHkgZm9yIGFkZHJlc3MnKSkge1xuICAgICAgICBlcnJvci50aW1lc3RhbXAgPSB0aGlzLnRpbWVzdGFtcDtcbiAgICAgIH1cbiAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIHRyYW5zbWl0TWVzc2FnZShcbiAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAganNvbkRhdGE6IFJlYWRvbmx5QXJyYXk8TWVzc2FnZVR5cGU+LFxuICAgIHRpbWVzdGFtcDogbnVtYmVyLFxuICAgIHsgYWNjZXNzS2V5IH06IHsgYWNjZXNzS2V5Pzogc3RyaW5nIH0gPSB7fVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgcHJvbWlzZTtcblxuICAgIGlmIChhY2Nlc3NLZXkpIHtcbiAgICAgIHByb21pc2UgPSB0aGlzLnNlcnZlci5zZW5kTWVzc2FnZXNVbmF1dGgoXG4gICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgIGpzb25EYXRhLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIHRoaXMub25saW5lLFxuICAgICAgICB7IGFjY2Vzc0tleSB9XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBwcm9taXNlID0gdGhpcy5zZXJ2ZXIuc2VuZE1lc3NhZ2VzKFxuICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICBqc29uRGF0YSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB0aGlzLm9ubGluZVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcHJvbWlzZS5jYXRjaChlID0+IHtcbiAgICAgIGlmIChlIGluc3RhbmNlb2YgSFRUUEVycm9yICYmIGUuY29kZSAhPT0gNDA5ICYmIGUuY29kZSAhPT0gNDEwKSB7XG4gICAgICAgIC8vIDQwOSBhbmQgNDEwIHNob3VsZCBidWJibGUgYW5kIGJlIGhhbmRsZWQgYnkgZG9TZW5kTWVzc2FnZVxuICAgICAgICAvLyA0MDQgc2hvdWxkIHRocm93IFVucmVnaXN0ZXJlZFVzZXJFcnJvclxuICAgICAgICAvLyA0Mjggc2hvdWxkIHRocm93IFNlbmRNZXNzYWdlQ2hhbGxlbmdlRXJyb3JcbiAgICAgICAgLy8gYWxsIG90aGVyIG5ldHdvcmsgZXJyb3JzIGNhbiBiZSByZXRyaWVkIGxhdGVyLlxuICAgICAgICBpZiAoZS5jb2RlID09PSA0MDQpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgVW5yZWdpc3RlcmVkVXNlckVycm9yKGlkZW50aWZpZXIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChlLmNvZGUgPT09IDQyOCkge1xuICAgICAgICAgIHRocm93IG5ldyBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yKGlkZW50aWZpZXIsIGUpO1xuICAgICAgICB9XG4gICAgICAgIHRocm93IG5ldyBTZW5kTWVzc2FnZU5ldHdvcmtFcnJvcihpZGVudGlmaWVyLCBqc29uRGF0YSwgZSk7XG4gICAgICB9XG4gICAgICB0aHJvdyBlO1xuICAgIH0pO1xuICB9XG5cbiAgZ2V0UGxhaW50ZXh0KCk6IFVpbnQ4QXJyYXkge1xuICAgIGlmICghdGhpcy5wbGFpbnRleHQpIHtcbiAgICAgIGNvbnN0IHsgbWVzc2FnZSB9ID0gdGhpcztcblxuICAgICAgaWYgKG1lc3NhZ2UgaW5zdGFuY2VvZiBQcm90by5Db250ZW50KSB7XG4gICAgICAgIHRoaXMucGxhaW50ZXh0ID0gcGFkTWVzc2FnZShQcm90by5Db250ZW50LmVuY29kZShtZXNzYWdlKS5maW5pc2goKSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aGlzLnBsYWludGV4dCA9IG1lc3NhZ2Uuc2VyaWFsaXplKCk7XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0aGlzLnBsYWludGV4dDtcbiAgfVxuXG4gIGdldENvbnRlbnRQcm90b0J5dGVzKCk6IFVpbnQ4QXJyYXkgfCB1bmRlZmluZWQge1xuICAgIGlmICh0aGlzLm1lc3NhZ2UgaW5zdGFuY2VvZiBQcm90by5Db250ZW50KSB7XG4gICAgICByZXR1cm4gbmV3IFVpbnQ4QXJyYXkoUHJvdG8uQ29udGVudC5lbmNvZGUodGhpcy5tZXNzYWdlKS5maW5pc2goKSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGFzeW5jIGdldENpcGhlcnRleHRNZXNzYWdlKHtcbiAgICBpZGVudGl0eUtleVN0b3JlLFxuICAgIHByb3RvY29sQWRkcmVzcyxcbiAgICBzZXNzaW9uU3RvcmUsXG4gIH06IHtcbiAgICBpZGVudGl0eUtleVN0b3JlOiBJZGVudGl0eUtleXM7XG4gICAgcHJvdG9jb2xBZGRyZXNzOiBQcm90b2NvbEFkZHJlc3M7XG4gICAgc2Vzc2lvblN0b3JlOiBTZXNzaW9ucztcbiAgfSk6IFByb21pc2U8Q2lwaGVydGV4dE1lc3NhZ2U+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2UgfSA9IHRoaXM7XG5cbiAgICBpZiAobWVzc2FnZSBpbnN0YW5jZW9mIFByb3RvLkNvbnRlbnQpIHtcbiAgICAgIHJldHVybiBzaWduYWxFbmNyeXB0KFxuICAgICAgICBCdWZmZXIuZnJvbSh0aGlzLmdldFBsYWludGV4dCgpKSxcbiAgICAgICAgcHJvdG9jb2xBZGRyZXNzLFxuICAgICAgICBzZXNzaW9uU3RvcmUsXG4gICAgICAgIGlkZW50aXR5S2V5U3RvcmVcbiAgICAgICk7XG4gICAgfVxuXG4gICAgcmV0dXJuIG1lc3NhZ2UuYXNDaXBoZXJ0ZXh0TWVzc2FnZSgpO1xuICB9XG5cbiAgYXN5bmMgZG9TZW5kTWVzc2FnZShcbiAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgZGV2aWNlSWRzOiBBcnJheTxudW1iZXI+LFxuICAgIHJlY3Vyc2U/OiBib29sZWFuXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgc2VuZE1ldGFkYXRhIH0gPSB0aGlzO1xuICAgIGNvbnN0IHsgYWNjZXNzS2V5LCBzZW5kZXJDZXJ0aWZpY2F0ZSB9ID0gc2VuZE1ldGFkYXRhPy5baWRlbnRpZmllcl0gfHwge307XG5cbiAgICBpZiAoYWNjZXNzS2V5ICYmICFzZW5kZXJDZXJ0aWZpY2F0ZSkge1xuICAgICAgbG9nLndhcm4oXG4gICAgICAgICdPdXRnb2luZ01lc3NhZ2UuZG9TZW5kTWVzc2FnZTogYWNjZXNzS2V5IHdhcyBwcm92aWRlZCwgYnV0IHNlbmRlckNlcnRpZmljYXRlIHdhcyBub3QnXG4gICAgICApO1xuICAgIH1cblxuICAgIGNvbnN0IHNlYWxlZFNlbmRlciA9IEJvb2xlYW4oYWNjZXNzS2V5ICYmIHNlbmRlckNlcnRpZmljYXRlKTtcblxuICAgIC8vIFdlIGRvbid0IHNlbmQgdG8gb3Vyc2VsdmVzIHVubGVzcyBzZWFsZWRTZW5kZXIgaXMgZW5hYmxlZFxuICAgIGNvbnN0IG91ck51bWJlciA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXROdW1iZXIoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS51c2VyLmdldENoZWNrZWRVdWlkKCk7XG4gICAgY29uc3Qgb3VyRGV2aWNlSWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0RGV2aWNlSWQoKTtcbiAgICBpZiAoXG4gICAgICAoaWRlbnRpZmllciA9PT0gb3VyTnVtYmVyIHx8IGlkZW50aWZpZXIgPT09IG91clV1aWQudG9TdHJpbmcoKSkgJiZcbiAgICAgICFzZWFsZWRTZW5kZXJcbiAgICApIHtcbiAgICAgIGRldmljZUlkcyA9IHJlamVjdChcbiAgICAgICAgZGV2aWNlSWRzLFxuICAgICAgICBkZXZpY2VJZCA9PlxuICAgICAgICAgIC8vIGJlY2F1c2Ugd2Ugc3RvcmUgb3VyIG93biBkZXZpY2UgSUQgYXMgYSBzdHJpbmcgYXQgbGVhc3Qgc29tZXRpbWVzXG4gICAgICAgICAgZGV2aWNlSWQgPT09IG91ckRldmljZUlkIHx8XG4gICAgICAgICAgKHR5cGVvZiBvdXJEZXZpY2VJZCA9PT0gJ3N0cmluZycgJiZcbiAgICAgICAgICAgIGRldmljZUlkID09PSBwYXJzZUludChvdXJEZXZpY2VJZCwgMTApKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBzZXNzaW9uU3RvcmUgPSBuZXcgU2Vzc2lvbnMoeyBvdXJVdWlkIH0pO1xuICAgIGNvbnN0IGlkZW50aXR5S2V5U3RvcmUgPSBuZXcgSWRlbnRpdHlLZXlzKHsgb3VyVXVpZCB9KTtcblxuICAgIHJldHVybiBQcm9taXNlLmFsbChcbiAgICAgIGRldmljZUlkcy5tYXAoYXN5bmMgZGVzdGluYXRpb25EZXZpY2VJZCA9PiB7XG4gICAgICAgIGNvbnN0IHRoZWlyVXVpZCA9IFVVSUQuY2hlY2tlZExvb2t1cChpZGVudGlmaWVyKTtcbiAgICAgICAgY29uc3QgYWRkcmVzcyA9IG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgICAgIG91clV1aWQsXG4gICAgICAgICAgbmV3IEFkZHJlc3ModGhlaXJVdWlkLCBkZXN0aW5hdGlvbkRldmljZUlkKVxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sLmVucXVldWVTZXNzaW9uSm9iPE1lc3NhZ2VUeXBlPihcbiAgICAgICAgICBhZGRyZXNzLFxuICAgICAgICAgIGFzeW5jICgpID0+IHtcbiAgICAgICAgICAgIGNvbnN0IHByb3RvY29sQWRkcmVzcyA9IFByb3RvY29sQWRkcmVzcy5uZXcoXG4gICAgICAgICAgICAgIHRoZWlyVXVpZC50b1N0cmluZygpLFxuICAgICAgICAgICAgICBkZXN0aW5hdGlvbkRldmljZUlkXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBhY3RpdmVTZXNzaW9uID0gYXdhaXQgc2Vzc2lvblN0b3JlLmdldFNlc3Npb24oXG4gICAgICAgICAgICAgIHByb3RvY29sQWRkcmVzc1xuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIGlmICghYWN0aXZlU2Vzc2lvbikge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAgICAgJ091dGdvaW5nTWVzc2FnZS5kb1NlbmRNZXNzYWdlOiBObyBhY3RpdmUgc2Vzc2lvbiEnXG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGNvbnN0IGRlc3RpbmF0aW9uUmVnaXN0cmF0aW9uSWQgPVxuICAgICAgICAgICAgICBhY3RpdmVTZXNzaW9uLnJlbW90ZVJlZ2lzdHJhdGlvbklkKCk7XG5cbiAgICAgICAgICAgIGlmIChzZWFsZWRTZW5kZXIgJiYgc2VuZGVyQ2VydGlmaWNhdGUpIHtcbiAgICAgICAgICAgICAgY29uc3QgY2lwaGVydGV4dE1lc3NhZ2UgPSBhd2FpdCB0aGlzLmdldENpcGhlcnRleHRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgICBpZGVudGl0eUtleVN0b3JlLFxuICAgICAgICAgICAgICAgIHByb3RvY29sQWRkcmVzcyxcbiAgICAgICAgICAgICAgICBzZXNzaW9uU3RvcmUsXG4gICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgIGNvbnN0IGNlcnRpZmljYXRlID0gU2VuZGVyQ2VydGlmaWNhdGUuZGVzZXJpYWxpemUoXG4gICAgICAgICAgICAgICAgQnVmZmVyLmZyb20oc2VuZGVyQ2VydGlmaWNhdGUuc2VyaWFsaXplZClcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgY29uc3QgZ3JvdXBJZEJ1ZmZlciA9IHRoaXMuZ3JvdXBJZFxuICAgICAgICAgICAgICAgID8gQnVmZmVyLmZyb20odGhpcy5ncm91cElkLCAnYmFzZTY0JylcbiAgICAgICAgICAgICAgICA6IG51bGw7XG5cbiAgICAgICAgICAgICAgY29uc3QgY29udGVudCA9IFVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2VDb250ZW50Lm5ldyhcbiAgICAgICAgICAgICAgICBjaXBoZXJ0ZXh0TWVzc2FnZSxcbiAgICAgICAgICAgICAgICBjZXJ0aWZpY2F0ZSxcbiAgICAgICAgICAgICAgICB0aGlzLmNvbnRlbnRIaW50LFxuICAgICAgICAgICAgICAgIGdyb3VwSWRCdWZmZXJcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBzZWFsZWRTZW5kZXJFbmNyeXB0KFxuICAgICAgICAgICAgICAgIGNvbnRlbnQsXG4gICAgICAgICAgICAgICAgcHJvdG9jb2xBZGRyZXNzLFxuICAgICAgICAgICAgICAgIGlkZW50aXR5S2V5U3RvcmVcbiAgICAgICAgICAgICAgKTtcblxuICAgICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFByb3RvLkVudmVsb3BlLlR5cGUuVU5JREVOVElGSUVEX1NFTkRFUixcbiAgICAgICAgICAgICAgICBkZXN0aW5hdGlvbkRldmljZUlkLFxuICAgICAgICAgICAgICAgIGRlc3RpbmF0aW9uUmVnaXN0cmF0aW9uSWQsXG4gICAgICAgICAgICAgICAgY29udGVudDogYnVmZmVyLnRvU3RyaW5nKCdiYXNlNjQnKSxcbiAgICAgICAgICAgICAgfTtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgY29uc3QgY2lwaGVydGV4dE1lc3NhZ2UgPSBhd2FpdCB0aGlzLmdldENpcGhlcnRleHRNZXNzYWdlKHtcbiAgICAgICAgICAgICAgaWRlbnRpdHlLZXlTdG9yZSxcbiAgICAgICAgICAgICAgcHJvdG9jb2xBZGRyZXNzLFxuICAgICAgICAgICAgICBzZXNzaW9uU3RvcmUsXG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIGNvbnN0IHR5cGUgPSBjaXBoZXJ0ZXh0TWVzc2FnZVR5cGVUb0VudmVsb3BlVHlwZShcbiAgICAgICAgICAgICAgY2lwaGVydGV4dE1lc3NhZ2UudHlwZSgpXG4gICAgICAgICAgICApO1xuXG4gICAgICAgICAgICBjb25zdCBjb250ZW50ID0gY2lwaGVydGV4dE1lc3NhZ2Uuc2VyaWFsaXplKCkudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICB0eXBlLFxuICAgICAgICAgICAgICBkZXN0aW5hdGlvbkRldmljZUlkLFxuICAgICAgICAgICAgICBkZXN0aW5hdGlvblJlZ2lzdHJhdGlvbklkLFxuICAgICAgICAgICAgICBjb250ZW50LFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KVxuICAgIClcbiAgICAgIC50aGVuKGFzeW5jIChqc29uRGF0YTogQXJyYXk8TWVzc2FnZVR5cGU+KSA9PiB7XG4gICAgICAgIGlmIChzZWFsZWRTZW5kZXIpIHtcbiAgICAgICAgICByZXR1cm4gdGhpcy50cmFuc21pdE1lc3NhZ2UoaWRlbnRpZmllciwganNvbkRhdGEsIHRoaXMudGltZXN0YW1wLCB7XG4gICAgICAgICAgICBhY2Nlc3NLZXksXG4gICAgICAgICAgfSkudGhlbihcbiAgICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgICAgdGhpcy5yZWNpcGllbnRzW2lkZW50aWZpZXJdID0gZGV2aWNlSWRzO1xuICAgICAgICAgICAgICB0aGlzLnVuaWRlbnRpZmllZERlbGl2ZXJpZXMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgdGhpcy5zdWNjZXNzZnVsSWRlbnRpZmllcnMucHVzaChpZGVudGlmaWVyKTtcbiAgICAgICAgICAgICAgdGhpcy5udW1iZXJDb21wbGV0ZWQoKTtcblxuICAgICAgICAgICAgICBpZiAodGhpcy5zZW5kTG9nQ2FsbGJhY2spIHtcbiAgICAgICAgICAgICAgICB0aGlzLnNlbmRMb2dDYWxsYmFjayh7XG4gICAgICAgICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgICAgZGV2aWNlSWRzLFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3VjY2Vzc2Z1bElkZW50aWZpZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgICBsb2cud2FybihcbiAgICAgICAgICAgICAgICAgIGBPdXRnb2luZ01lc3NhZ2UuZG9TZW5kTWVzc2FnZTogbm8gc2VuZExvZ0NhbGxiYWNrIHByb3ZpZGVkIGZvciBtZXNzYWdlICR7dGhpcy50aW1lc3RhbXB9LCBidXQgbXVsdGlwbGUgcmVjaXBpZW50c2BcbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgYXN5bmMgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IgJiZcbiAgICAgICAgICAgICAgICAoZXJyb3IuY29kZSA9PT0gNDAxIHx8IGVycm9yLmNvZGUgPT09IDQwMylcbiAgICAgICAgICAgICAgKSB7XG4gICAgICAgICAgICAgICAgaWYgKHRoaXMuZmFpbG92ZXJJZGVudGlmaWVycy5pbmRleE9mKGlkZW50aWZpZXIpID09PSAtMSkge1xuICAgICAgICAgICAgICAgICAgdGhpcy5mYWlsb3ZlcklkZW50aWZpZXJzLnB1c2goaWRlbnRpZmllcik7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHRoYXQgd2UgZG9uJ3QgaGl0IHRoaXMgY29kZXBhdGggdGhlIG5leHQgdGltZSB0aHJvdWdoXG4gICAgICAgICAgICAgICAgaWYgKHNlbmRNZXRhZGF0YSkge1xuICAgICAgICAgICAgICAgICAgZGVsZXRlIHNlbmRNZXRhZGF0YVtpZGVudGlmaWVyXTtcbiAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICByZXR1cm4gdGhpcy5kb1NlbmRNZXNzYWdlKGlkZW50aWZpZXIsIGRldmljZUlkcywgcmVjdXJzZSk7XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMudHJhbnNtaXRNZXNzYWdlKGlkZW50aWZpZXIsIGpzb25EYXRhLCB0aGlzLnRpbWVzdGFtcCkudGhlbihcbiAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICB0aGlzLnN1Y2Nlc3NmdWxJZGVudGlmaWVycy5wdXNoKGlkZW50aWZpZXIpO1xuICAgICAgICAgICAgdGhpcy5yZWNpcGllbnRzW2lkZW50aWZpZXJdID0gZGV2aWNlSWRzO1xuICAgICAgICAgICAgdGhpcy5udW1iZXJDb21wbGV0ZWQoKTtcblxuICAgICAgICAgICAgaWYgKHRoaXMuc2VuZExvZ0NhbGxiYWNrKSB7XG4gICAgICAgICAgICAgIHRoaXMuc2VuZExvZ0NhbGxiYWNrKHtcbiAgICAgICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgICAgIGRldmljZUlkcyxcbiAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9IGVsc2UgaWYgKHRoaXMuc3VjY2Vzc2Z1bElkZW50aWZpZXJzLmxlbmd0aCA+IDEpIHtcbiAgICAgICAgICAgICAgbG9nLndhcm4oXG4gICAgICAgICAgICAgICAgYE91dGdvaW5nTWVzc2FnZS5kb1NlbmRNZXNzYWdlOiBubyBzZW5kTG9nQ2FsbGJhY2sgcHJvdmlkZWQgZm9yIG1lc3NhZ2UgJHt0aGlzLnRpbWVzdGFtcH0sIGJ1dCBtdWx0aXBsZSByZWNpcGllbnRzYFxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgICAuY2F0Y2goYXN5bmMgZXJyb3IgPT4ge1xuICAgICAgICBpZiAoXG4gICAgICAgICAgZXJyb3IgaW5zdGFuY2VvZiBIVFRQRXJyb3IgJiZcbiAgICAgICAgICAoZXJyb3IuY29kZSA9PT0gNDEwIHx8IGVycm9yLmNvZGUgPT09IDQwOSlcbiAgICAgICAgKSB7XG4gICAgICAgICAgaWYgKCFyZWN1cnNlKSB7XG4gICAgICAgICAgICB0aGlzLnJlZ2lzdGVyRXJyb3IoXG4gICAgICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgICAgICdIaXQgcmV0cnkgbGltaXQgYXR0ZW1wdGluZyB0byByZWxvYWQgZGV2aWNlIGxpc3QnLFxuICAgICAgICAgICAgICBlcnJvclxuICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgcmVzcG9uc2UgPSBlcnJvci5yZXNwb25zZSBhcyB7XG4gICAgICAgICAgICBleHRyYURldmljZXM/OiBBcnJheTxudW1iZXI+O1xuICAgICAgICAgICAgc3RhbGVEZXZpY2VzPzogQXJyYXk8bnVtYmVyPjtcbiAgICAgICAgICAgIG1pc3NpbmdEZXZpY2VzPzogQXJyYXk8bnVtYmVyPjtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGxldCBwOiBQcm9taXNlPGFueT4gPSBQcm9taXNlLnJlc29sdmUoKTtcbiAgICAgICAgICBpZiAoZXJyb3IuY29kZSA9PT0gNDA5KSB7XG4gICAgICAgICAgICBwID0gdGhpcy5yZW1vdmVEZXZpY2VJZHNGb3JJZGVudGlmaWVyKFxuICAgICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgICByZXNwb25zZS5leHRyYURldmljZXMgfHwgW11cbiAgICAgICAgICAgICk7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHAgPSBQcm9taXNlLmFsbChcbiAgICAgICAgICAgICAgKHJlc3BvbnNlLnN0YWxlRGV2aWNlcyB8fCBbXSkubWFwKGFzeW5jIChkZXZpY2VJZDogbnVtYmVyKSA9PiB7XG4gICAgICAgICAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihcbiAgICAgICAgICAgICAgICAgIG5ldyBRdWFsaWZpZWRBZGRyZXNzKFxuICAgICAgICAgICAgICAgICAgICBvdXJVdWlkLFxuICAgICAgICAgICAgICAgICAgICBuZXcgQWRkcmVzcyhVVUlELmNoZWNrZWRMb29rdXAoaWRlbnRpZmllciksIGRldmljZUlkKVxuICAgICAgICAgICAgICAgICAgKVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHJldHVybiBwLnRoZW4oYXN5bmMgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgcmVzZXREZXZpY2VzID1cbiAgICAgICAgICAgICAgZXJyb3IuY29kZSA9PT0gNDEwXG4gICAgICAgICAgICAgICAgPyByZXNwb25zZS5zdGFsZURldmljZXNcbiAgICAgICAgICAgICAgICA6IHJlc3BvbnNlLm1pc3NpbmdEZXZpY2VzO1xuICAgICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0S2V5c0ZvcklkZW50aWZpZXIoaWRlbnRpZmllciwgcmVzZXREZXZpY2VzKS50aGVuKFxuICAgICAgICAgICAgICAvLyBXZSBjb250aW51ZSB0byByZXRyeSBhcyBsb25nIGFzIHRoZSBlcnJvciBjb2RlIHdhcyA0MDk7IHRoZSBhc3N1bXB0aW9uIGlzXG4gICAgICAgICAgICAgIC8vICAgdGhhdCB3ZSdsbCByZXF1ZXN0IG5ldyBkZXZpY2UgaW5mbyBhbmQgdGhlIG5leHQgcmVxdWVzdCB3aWxsIHN1Y2NlZWQuXG4gICAgICAgICAgICAgIHRoaXMucmVsb2FkRGV2aWNlc0FuZFNlbmQoaWRlbnRpZmllciwgZXJyb3IuY29kZSA9PT0gNDA5KVxuICAgICAgICAgICAgKTtcbiAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCd1bnRydXN0ZWQgaWRlbnRpdHkgZm9yIGFkZHJlc3MnKSkge1xuICAgICAgICAgIGVycm9yLnRpbWVzdGFtcCA9IHRoaXMudGltZXN0YW1wO1xuICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICdHb3QgXCJrZXkgY2hhbmdlZFwiIGVycm9yIGZyb20gZW5jcnlwdCAtIG5vIGlkZW50aXR5S2V5IGZvciBhcHBsaWNhdGlvbiBsYXllcicsXG4gICAgICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgICAgICAgZGV2aWNlSWRzXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIGxvZy5pbmZvKCdjbG9zaW5nIGFsbCBzZXNzaW9ucyBmb3InLCBpZGVudGlmaWVyKTtcbiAgICAgICAgICB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnByb3RvY29sXG4gICAgICAgICAgICAuYXJjaGl2ZUFsbFNlc3Npb25zKFVVSUQuY2hlY2tlZExvb2t1cChpZGVudGlmaWVyKSlcbiAgICAgICAgICAgIC50aGVuKFxuICAgICAgICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIGlubmVyRXJyb3IgPT4ge1xuICAgICAgICAgICAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgICAgICAgICAgIGBkb1NlbmRNZXNzYWdlOiBFcnJvciBjbG9zaW5nIHNlc3Npb25zOiAke2lubmVyRXJyb3Iuc3RhY2t9YFxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgICAgdGhyb3cgZXJyb3I7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0aGlzLnJlZ2lzdGVyRXJyb3IoXG4gICAgICAgICAgaWRlbnRpZmllcixcbiAgICAgICAgICAnRmFpbGVkIHRvIGNyZWF0ZSBvciBzZW5kIG1lc3NhZ2UnLFxuICAgICAgICAgIGVycm9yXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH0pO1xuICB9XG5cbiAgYXN5bmMgcmVtb3ZlRGV2aWNlSWRzRm9ySWRlbnRpZmllcihcbiAgICBpZGVudGlmaWVyOiBzdHJpbmcsXG4gICAgZGV2aWNlSWRzVG9SZW1vdmU6IEFycmF5PG51bWJlcj5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICAgIGNvbnN0IHRoZWlyVXVpZCA9IFVVSUQuY2hlY2tlZExvb2t1cChpZGVudGlmaWVyKTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZGV2aWNlSWRzVG9SZW1vdmUubWFwKGFzeW5jIGRldmljZUlkID0+IHtcbiAgICAgICAgYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5hcmNoaXZlU2Vzc2lvbihcbiAgICAgICAgICBuZXcgUXVhbGlmaWVkQWRkcmVzcyhvdXJVdWlkLCBuZXcgQWRkcmVzcyh0aGVpclV1aWQsIGRldmljZUlkKSlcbiAgICAgICAgKTtcbiAgICAgIH0pXG4gICAgKTtcbiAgfVxuXG4gIGFzeW5jIHNlbmRUb0lkZW50aWZpZXIocHJvdmlkZWRJZGVudGlmaWVyOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsZXQgaWRlbnRpZmllciA9IHByb3ZpZGVkSWRlbnRpZmllcjtcbiAgICB0cnkge1xuICAgICAgaWYgKGlzVmFsaWRVdWlkKGlkZW50aWZpZXIpKSB7XG4gICAgICAgIC8vIFdlJ3JlIGdvb2QhXG4gICAgICB9IGVsc2UgaWYgKGlzVmFsaWROdW1iZXIoaWRlbnRpZmllcikpIHtcbiAgICAgICAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcpIHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnc2VuZFRvSWRlbnRpZmllcjogd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nIGlzIG5vdCBhdmFpbGFibGUhJ1xuICAgICAgICAgICk7XG4gICAgICAgIH1cblxuICAgICAgICB0cnkge1xuICAgICAgICAgIGF3YWl0IHVwZGF0ZUNvbnZlcnNhdGlvbnNXaXRoVXVpZExvb2t1cCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25Db250cm9sbGVyOiB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlcixcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IFtcbiAgICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0T3JDcmVhdGUoaWRlbnRpZmllciwgJ3ByaXZhdGUnKSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBtZXNzYWdpbmc6IHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZyxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IHV1aWQgPVxuICAgICAgICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpPy5nZXQoJ3V1aWQnKTtcbiAgICAgICAgICBpZiAoIXV1aWQpIHtcbiAgICAgICAgICAgIHRocm93IG5ldyBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IoXG4gICAgICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgICAgIG5ldyBIVFRQRXJyb3IoJ1VzZXIgaXMgbm90IHJlZ2lzdGVyZWQnLCB7XG4gICAgICAgICAgICAgICAgY29kZTogLTEsXG4gICAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICApO1xuICAgICAgICAgIH1cbiAgICAgICAgICBpZGVudGlmaWVyID0gdXVpZDtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICBgc2VuZFRvSWRlbnRpZmllcjogRmFpbGVkIHRvIGZldGNoIFVVSUQgZm9yIGlkZW50aWZpZXIgJHtpZGVudGlmaWVyfWAsXG4gICAgICAgICAgICBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3JcbiAgICAgICAgICApO1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgYHNlbmRUb0lkZW50aWZpZXI6IGlkZW50aWZpZXIgJHtpZGVudGlmaWVyfSB3YXMgbmVpdGhlciBhIFVVSUQgb3IgRTE2NGBcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgY29uc3Qgb3VyVXVpZCA9IHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXRDaGVja2VkVXVpZCgpO1xuICAgICAgY29uc3QgZGV2aWNlSWRzID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wcm90b2NvbC5nZXREZXZpY2VJZHMoe1xuICAgICAgICBvdXJVdWlkLFxuICAgICAgICBpZGVudGlmaWVyLFxuICAgICAgfSk7XG4gICAgICBpZiAoZGV2aWNlSWRzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgICBhd2FpdCB0aGlzLmdldEtleXNGb3JJZGVudGlmaWVyKGlkZW50aWZpZXIpO1xuICAgICAgfVxuICAgICAgYXdhaXQgdGhpcy5yZWxvYWREZXZpY2VzQW5kU2VuZChpZGVudGlmaWVyLCB0cnVlKSgpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBpZiAoZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCd1bnRydXN0ZWQgaWRlbnRpdHkgZm9yIGFkZHJlc3MnKSkge1xuICAgICAgICBjb25zdCBuZXdFcnJvciA9IG5ldyBPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3IoaWRlbnRpZmllcik7XG4gICAgICAgIHRoaXMucmVnaXN0ZXJFcnJvcihpZGVudGlmaWVyLCAnVW50cnVzdGVkIGlkZW50aXR5JywgbmV3RXJyb3IpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5yZWdpc3RlckVycm9yKFxuICAgICAgICAgIGlkZW50aWZpZXIsXG4gICAgICAgICAgYEZhaWxlZCB0byByZXRyaWV2ZSBuZXcgZGV2aWNlIGtleXMgZm9yIGlkZW50aWZpZXIgJHtpZGVudGlmaWVyfWAsXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxvQkFBdUI7QUFFdkIsaUJBQWtCO0FBS2xCLDhCQU9PO0FBSVAsb0JBT087QUFFUCx5QkFBOEI7QUFDOUIscUJBQXdCO0FB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
