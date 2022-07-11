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
var getSendOptions_exports = {};
__export(getSendOptions_exports, {
  getSendOptions: () => getSendOptions,
  getSendOptionsForRecipients: () => getSendOptionsForRecipients
});
module.exports = __toCommonJS(getSendOptions_exports);
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_getConversationMembers = require("./getConversationMembers");
var import_whatTypeOfConversation = require("./whatTypeOfConversation");
var import_isInSystemContacts = require("./isInSystemContacts");
var import_missingCaseError = require("./missingCaseError");
var import_senderCertificate = require("../services/senderCertificate");
var import_phoneNumberSharingMode = require("./phoneNumberSharingMode");
var import_OutgoingMessage = require("../textsecure/OutgoingMessage");
var import_isNotNil = require("./isNotNil");
const SEALED_SENDER = {
  UNKNOWN: 0,
  ENABLED: 1,
  DISABLED: 2,
  UNRESTRICTED: 3
};
async function getSendOptionsForRecipients(recipients) {
  const conversations = recipients.map((identifier) => window.ConversationController.get(identifier)).filter(import_isNotNil.isNotNil);
  const metadataList = await Promise.all(conversations.map((conversation) => getSendOptions(conversation.attributes)));
  return metadataList.reduce((acc, current) => {
    const { sendMetadata: accMetadata } = acc;
    const { sendMetadata: currentMetadata } = current;
    if (!currentMetadata) {
      return acc;
    }
    if (!accMetadata) {
      return current;
    }
    Object.assign(accMetadata, currentMetadata);
    return acc;
  }, {
    sendMetadata: {}
  });
}
async function getSendOptions(conversationAttrs, options = {}) {
  const { syncMessage } = options;
  if (!(0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs)) {
    const contactCollection = (0, import_getConversationMembers.getConversationMembers)(conversationAttrs);
    const sendMetadata = {};
    await Promise.all(contactCollection.map(async (contactAttrs) => {
      const conversation = window.ConversationController.get(contactAttrs.id);
      if (!conversation) {
        return;
      }
      const { sendMetadata: conversationSendMetadata } = await getSendOptions(conversation.attributes, options);
      Object.assign(sendMetadata, conversationSendMetadata || {});
    }));
    return { sendMetadata };
  }
  const { accessKey, sealedSender } = conversationAttrs;
  if (syncMessage || (0, import_whatTypeOfConversation.isMe)(conversationAttrs)) {
    return {
      sendMetadata: void 0
    };
  }
  const { e164, uuid } = conversationAttrs;
  const senderCertificate = await getSenderCertificateForDirectConversation(conversationAttrs);
  if (sealedSender === SEALED_SENDER.UNKNOWN) {
    const identifierData2 = {
      accessKey: accessKey || Bytes.toBase64((0, import_Crypto.getRandomBytes)(16)),
      senderCertificate
    };
    return {
      sendMetadata: {
        ...e164 ? { [e164]: identifierData2 } : {},
        ...uuid ? { [uuid]: identifierData2 } : {}
      }
    };
  }
  if (sealedSender === SEALED_SENDER.DISABLED) {
    return {
      sendMetadata: void 0
    };
  }
  const identifierData = {
    accessKey: accessKey && sealedSender === SEALED_SENDER.ENABLED ? accessKey : Bytes.toBase64((0, import_Crypto.getRandomBytes)(16)),
    senderCertificate
  };
  return {
    sendMetadata: {
      ...e164 ? { [e164]: identifierData } : {},
      ...uuid ? { [uuid]: identifierData } : {}
    }
  };
}
function getSenderCertificateForDirectConversation(conversationAttrs) {
  if (!(0, import_whatTypeOfConversation.isDirectConversation)(conversationAttrs)) {
    throw new Error("getSenderCertificateForDirectConversation should only be called for direct conversations");
  }
  const phoneNumberSharingMode = (0, import_phoneNumberSharingMode.parsePhoneNumberSharingMode)(window.storage.get("phoneNumberSharingMode"));
  let certificateMode;
  switch (phoneNumberSharingMode) {
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.Everybody:
      certificateMode = import_OutgoingMessage.SenderCertificateMode.WithE164;
      break;
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.ContactsOnly:
      certificateMode = (0, import_isInSystemContacts.isInSystemContacts)(conversationAttrs) ? import_OutgoingMessage.SenderCertificateMode.WithE164 : import_OutgoingMessage.SenderCertificateMode.WithoutE164;
      break;
    case import_phoneNumberSharingMode.PhoneNumberSharingMode.Nobody:
      certificateMode = import_OutgoingMessage.SenderCertificateMode.WithoutE164;
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(phoneNumberSharingMode);
  }
  return import_senderCertificate.senderCertificateService.get(certificateMode);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSendOptions,
  getSendOptionsForRecipients
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U2VuZE9wdGlvbnMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7XG4gIFNlbmRNZXRhZGF0YVR5cGUsXG4gIFNlbmRPcHRpb25zVHlwZSxcbn0gZnJvbSAnLi4vdGV4dHNlY3VyZS9TZW5kTWVzc2FnZSc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyBnZXRSYW5kb21CeXRlcyB9IGZyb20gJy4uL0NyeXB0byc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25NZW1iZXJzIH0gZnJvbSAnLi9nZXRDb252ZXJzYXRpb25NZW1iZXJzJztcbmltcG9ydCB7IGlzRGlyZWN0Q29udmVyc2F0aW9uLCBpc01lIH0gZnJvbSAnLi93aGF0VHlwZU9mQ29udmVyc2F0aW9uJztcbmltcG9ydCB7IGlzSW5TeXN0ZW1Db250YWN0cyB9IGZyb20gJy4vaXNJblN5c3RlbUNvbnRhY3RzJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgc2VuZGVyQ2VydGlmaWNhdGVTZXJ2aWNlIH0gZnJvbSAnLi4vc2VydmljZXMvc2VuZGVyQ2VydGlmaWNhdGUnO1xuaW1wb3J0IHtcbiAgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZSxcbiAgcGFyc2VQaG9uZU51bWJlclNoYXJpbmdNb2RlLFxufSBmcm9tICcuL3Bob25lTnVtYmVyU2hhcmluZ01vZGUnO1xuaW1wb3J0IHR5cGUgeyBTZXJpYWxpemVkQ2VydGlmaWNhdGVUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9PdXRnb2luZ01lc3NhZ2UnO1xuaW1wb3J0IHsgU2VuZGVyQ2VydGlmaWNhdGVNb2RlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9PdXRnb2luZ01lc3NhZ2UnO1xuaW1wb3J0IHsgaXNOb3ROaWwgfSBmcm9tICcuL2lzTm90TmlsJztcblxuY29uc3QgU0VBTEVEX1NFTkRFUiA9IHtcbiAgVU5LTk9XTjogMCxcbiAgRU5BQkxFRDogMSxcbiAgRElTQUJMRUQ6IDIsXG4gIFVOUkVTVFJJQ1RFRDogMyxcbn07XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZW5kT3B0aW9uc0ZvclJlY2lwaWVudHMoXG4gIHJlY2lwaWVudHM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuKTogUHJvbWlzZTxTZW5kT3B0aW9uc1R5cGU+IHtcbiAgY29uc3QgY29udmVyc2F0aW9ucyA9IHJlY2lwaWVudHNcbiAgICAubWFwKGlkZW50aWZpZXIgPT4gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGlkZW50aWZpZXIpKVxuICAgIC5maWx0ZXIoaXNOb3ROaWwpO1xuXG4gIGNvbnN0IG1ldGFkYXRhTGlzdCA9IGF3YWl0IFByb21pc2UuYWxsKFxuICAgIGNvbnZlcnNhdGlvbnMubWFwKGNvbnZlcnNhdGlvbiA9PiBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcykpXG4gICk7XG5cbiAgcmV0dXJuIG1ldGFkYXRhTGlzdC5yZWR1Y2UoXG4gICAgKGFjYywgY3VycmVudCk6IFNlbmRPcHRpb25zVHlwZSA9PiB7XG4gICAgICBjb25zdCB7IHNlbmRNZXRhZGF0YTogYWNjTWV0YWRhdGEgfSA9IGFjYztcbiAgICAgIGNvbnN0IHsgc2VuZE1ldGFkYXRhOiBjdXJyZW50TWV0YWRhdGEgfSA9IGN1cnJlbnQ7XG5cbiAgICAgIGlmICghY3VycmVudE1ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9XG4gICAgICBpZiAoIWFjY01ldGFkYXRhKSB7XG4gICAgICAgIHJldHVybiBjdXJyZW50O1xuICAgICAgfVxuXG4gICAgICBPYmplY3QuYXNzaWduKGFjY01ldGFkYXRhLCBjdXJyZW50TWV0YWRhdGEpO1xuXG4gICAgICByZXR1cm4gYWNjO1xuICAgIH0sXG4gICAge1xuICAgICAgc2VuZE1ldGFkYXRhOiB7fSxcbiAgICB9XG4gICk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZXRTZW5kT3B0aW9ucyhcbiAgY29udmVyc2F0aW9uQXR0cnM6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlLFxuICBvcHRpb25zOiB7IHN5bmNNZXNzYWdlPzogYm9vbGVhbiB9ID0ge31cbik6IFByb21pc2U8U2VuZE9wdGlvbnNUeXBlPiB7XG4gIGNvbnN0IHsgc3luY01lc3NhZ2UgfSA9IG9wdGlvbnM7XG5cbiAgaWYgKCFpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb25BdHRycykpIHtcbiAgICBjb25zdCBjb250YWN0Q29sbGVjdGlvbiA9IGdldENvbnZlcnNhdGlvbk1lbWJlcnMoY29udmVyc2F0aW9uQXR0cnMpO1xuICAgIGNvbnN0IHNlbmRNZXRhZGF0YTogU2VuZE1ldGFkYXRhVHlwZSA9IHt9O1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgY29udGFjdENvbGxlY3Rpb24ubWFwKGFzeW5jIGNvbnRhY3RBdHRycyA9PiB7XG4gICAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb250YWN0QXR0cnMuaWQpO1xuICAgICAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCB7IHNlbmRNZXRhZGF0YTogY29udmVyc2F0aW9uU2VuZE1ldGFkYXRhIH0gPSBhd2FpdCBnZXRTZW5kT3B0aW9ucyhcbiAgICAgICAgICBjb252ZXJzYXRpb24uYXR0cmlidXRlcyxcbiAgICAgICAgICBvcHRpb25zXG4gICAgICAgICk7XG4gICAgICAgIE9iamVjdC5hc3NpZ24oc2VuZE1ldGFkYXRhLCBjb252ZXJzYXRpb25TZW5kTWV0YWRhdGEgfHwge30pO1xuICAgICAgfSlcbiAgICApO1xuICAgIHJldHVybiB7IHNlbmRNZXRhZGF0YSB9O1xuICB9XG5cbiAgY29uc3QgeyBhY2Nlc3NLZXksIHNlYWxlZFNlbmRlciB9ID0gY29udmVyc2F0aW9uQXR0cnM7XG5cbiAgLy8gV2UgbmV2ZXIgc2VuZCBzeW5jIG1lc3NhZ2VzIG9yIHRvIG91ciBvd24gYWNjb3VudCBhcyBzZWFsZWQgc2VuZGVyXG4gIGlmIChzeW5jTWVzc2FnZSB8fCBpc01lKGNvbnZlcnNhdGlvbkF0dHJzKSkge1xuICAgIHJldHVybiB7XG4gICAgICBzZW5kTWV0YWRhdGE6IHVuZGVmaW5lZCxcbiAgICB9O1xuICB9XG5cbiAgY29uc3QgeyBlMTY0LCB1dWlkIH0gPSBjb252ZXJzYXRpb25BdHRycztcblxuICBjb25zdCBzZW5kZXJDZXJ0aWZpY2F0ZSA9IGF3YWl0IGdldFNlbmRlckNlcnRpZmljYXRlRm9yRGlyZWN0Q29udmVyc2F0aW9uKFxuICAgIGNvbnZlcnNhdGlvbkF0dHJzXG4gICk7XG5cbiAgLy8gSWYgd2UndmUgbmV2ZXIgZmV0Y2hlZCB1c2VyJ3MgcHJvZmlsZSwgd2UgZGVmYXVsdCB0byB3aGF0IHdlIGhhdmVcbiAgaWYgKHNlYWxlZFNlbmRlciA9PT0gU0VBTEVEX1NFTkRFUi5VTktOT1dOKSB7XG4gICAgY29uc3QgaWRlbnRpZmllckRhdGEgPSB7XG4gICAgICBhY2Nlc3NLZXk6IGFjY2Vzc0tleSB8fCBCeXRlcy50b0Jhc2U2NChnZXRSYW5kb21CeXRlcygxNikpLFxuICAgICAgc2VuZGVyQ2VydGlmaWNhdGUsXG4gICAgfTtcbiAgICByZXR1cm4ge1xuICAgICAgc2VuZE1ldGFkYXRhOiB7XG4gICAgICAgIC4uLihlMTY0ID8geyBbZTE2NF06IGlkZW50aWZpZXJEYXRhIH0gOiB7fSksXG4gICAgICAgIC4uLih1dWlkID8geyBbdXVpZF06IGlkZW50aWZpZXJEYXRhIH0gOiB7fSksXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoc2VhbGVkU2VuZGVyID09PSBTRUFMRURfU0VOREVSLkRJU0FCTEVEKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNlbmRNZXRhZGF0YTogdW5kZWZpbmVkLFxuICAgIH07XG4gIH1cblxuICBjb25zdCBpZGVudGlmaWVyRGF0YSA9IHtcbiAgICBhY2Nlc3NLZXk6XG4gICAgICBhY2Nlc3NLZXkgJiYgc2VhbGVkU2VuZGVyID09PSBTRUFMRURfU0VOREVSLkVOQUJMRURcbiAgICAgICAgPyBhY2Nlc3NLZXlcbiAgICAgICAgOiBCeXRlcy50b0Jhc2U2NChnZXRSYW5kb21CeXRlcygxNikpLFxuICAgIHNlbmRlckNlcnRpZmljYXRlLFxuICB9O1xuXG4gIHJldHVybiB7XG4gICAgc2VuZE1ldGFkYXRhOiB7XG4gICAgICAuLi4oZTE2NCA/IHsgW2UxNjRdOiBpZGVudGlmaWVyRGF0YSB9IDoge30pLFxuICAgICAgLi4uKHV1aWQgPyB7IFt1dWlkXTogaWRlbnRpZmllckRhdGEgfSA6IHt9KSxcbiAgICB9LFxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTZW5kZXJDZXJ0aWZpY2F0ZUZvckRpcmVjdENvbnZlcnNhdGlvbihcbiAgY29udmVyc2F0aW9uQXR0cnM6IENvbnZlcnNhdGlvbkF0dHJpYnV0ZXNUeXBlXG4pOiBQcm9taXNlPHVuZGVmaW5lZCB8IFNlcmlhbGl6ZWRDZXJ0aWZpY2F0ZVR5cGU+IHtcbiAgaWYgKCFpc0RpcmVjdENvbnZlcnNhdGlvbihjb252ZXJzYXRpb25BdHRycykpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAnZ2V0U2VuZGVyQ2VydGlmaWNhdGVGb3JEaXJlY3RDb252ZXJzYXRpb24gc2hvdWxkIG9ubHkgYmUgY2FsbGVkIGZvciBkaXJlY3QgY29udmVyc2F0aW9ucydcbiAgICApO1xuICB9XG5cbiAgY29uc3QgcGhvbmVOdW1iZXJTaGFyaW5nTW9kZSA9IHBhcnNlUGhvbmVOdW1iZXJTaGFyaW5nTW9kZShcbiAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3Bob25lTnVtYmVyU2hhcmluZ01vZGUnKVxuICApO1xuXG4gIGxldCBjZXJ0aWZpY2F0ZU1vZGU6IFNlbmRlckNlcnRpZmljYXRlTW9kZTtcbiAgc3dpdGNoIChwaG9uZU51bWJlclNoYXJpbmdNb2RlKSB7XG4gICAgY2FzZSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLkV2ZXJ5Ym9keTpcbiAgICAgIGNlcnRpZmljYXRlTW9kZSA9IFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRoRTE2NDtcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgUGhvbmVOdW1iZXJTaGFyaW5nTW9kZS5Db250YWN0c09ubHk6XG4gICAgICBjZXJ0aWZpY2F0ZU1vZGUgPSBpc0luU3lzdGVtQ29udGFjdHMoY29udmVyc2F0aW9uQXR0cnMpXG4gICAgICAgID8gU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhFMTY0XG4gICAgICAgIDogU2VuZGVyQ2VydGlmaWNhdGVNb2RlLldpdGhvdXRFMTY0O1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSBQaG9uZU51bWJlclNoYXJpbmdNb2RlLk5vYm9keTpcbiAgICAgIGNlcnRpZmljYXRlTW9kZSA9IFNlbmRlckNlcnRpZmljYXRlTW9kZS5XaXRob3V0RTE2NDtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHBob25lTnVtYmVyU2hhcmluZ01vZGUpO1xuICB9XG5cbiAgcmV0dXJuIHNlbmRlckNlcnRpZmljYXRlU2VydmljZS5nZXQoY2VydGlmaWNhdGVNb2RlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBLFlBQXVCO0FBQ3ZCLG9CQUErQjtBQUMvQixvQ0FBdUM7QUFDdkMsb0NBQTJDO0FBQzNDLGdDQUFtQztBQUNuQyw4QkFBaUM7QUFDakMsK0JBQXlD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
