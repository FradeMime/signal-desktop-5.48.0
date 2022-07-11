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
var EmbeddedContact_exports = {};
__export(EmbeddedContact_exports, {
  AddressType: () => AddressType,
  ContactFormType: () => ContactFormType,
  _validate: () => _validate,
  embeddedContactSelector: () => embeddedContactSelector,
  getName: () => getName,
  numberToAddressType: () => numberToAddressType,
  numberToEmailType: () => numberToEmailType,
  numberToPhoneType: () => numberToPhoneType,
  parseAndWriteAvatar: () => parseAndWriteAvatar
});
module.exports = __toCommonJS(EmbeddedContact_exports);
var import_lodash = require("lodash");
var import_protobuf = require("../protobuf");
var import_isNotNil = require("../util/isNotNil");
var import_PhoneNumber = require("./PhoneNumber");
var import_errors = require("./errors");
var ContactFormType = /* @__PURE__ */ ((ContactFormType2) => {
  ContactFormType2[ContactFormType2["HOME"] = 1] = "HOME";
  ContactFormType2[ContactFormType2["MOBILE"] = 2] = "MOBILE";
  ContactFormType2[ContactFormType2["WORK"] = 3] = "WORK";
  ContactFormType2[ContactFormType2["CUSTOM"] = 4] = "CUSTOM";
  return ContactFormType2;
})(ContactFormType || {});
var AddressType = /* @__PURE__ */ ((AddressType2) => {
  AddressType2[AddressType2["HOME"] = 1] = "HOME";
  AddressType2[AddressType2["WORK"] = 2] = "WORK";
  AddressType2[AddressType2["CUSTOM"] = 3] = "CUSTOM";
  return AddressType2;
})(AddressType || {});
const DEFAULT_PHONE_TYPE = import_protobuf.SignalService.DataMessage.Contact.Phone.Type.HOME;
const DEFAULT_EMAIL_TYPE = import_protobuf.SignalService.DataMessage.Contact.Email.Type.HOME;
const DEFAULT_ADDRESS_TYPE = import_protobuf.SignalService.DataMessage.Contact.PostalAddress.Type.HOME;
function numberToPhoneType(type) {
  if (type === import_protobuf.SignalService.DataMessage.Contact.Phone.Type.MOBILE) {
    return type;
  }
  if (type === import_protobuf.SignalService.DataMessage.Contact.Phone.Type.WORK) {
    return type;
  }
  if (type === import_protobuf.SignalService.DataMessage.Contact.Phone.Type.CUSTOM) {
    return type;
  }
  return DEFAULT_PHONE_TYPE;
}
function numberToEmailType(type) {
  if (type === import_protobuf.SignalService.DataMessage.Contact.Email.Type.MOBILE) {
    return type;
  }
  if (type === import_protobuf.SignalService.DataMessage.Contact.Email.Type.WORK) {
    return type;
  }
  if (type === import_protobuf.SignalService.DataMessage.Contact.Email.Type.CUSTOM) {
    return type;
  }
  return DEFAULT_EMAIL_TYPE;
}
function numberToAddressType(type) {
  if (type === import_protobuf.SignalService.DataMessage.Contact.PostalAddress.Type.WORK) {
    return type;
  }
  if (type === import_protobuf.SignalService.DataMessage.Contact.PostalAddress.Type.CUSTOM) {
    return type;
  }
  return DEFAULT_ADDRESS_TYPE;
}
function embeddedContactSelector(contact, options) {
  const { getAbsoluteAttachmentPath, firstNumber, uuid, regionCode } = options;
  let { avatar } = contact;
  if (avatar && avatar.avatar) {
    if (avatar.avatar.error) {
      avatar = void 0;
    } else {
      avatar = {
        ...avatar,
        avatar: {
          ...avatar.avatar,
          path: avatar.avatar.path ? getAbsoluteAttachmentPath(avatar.avatar.path) : void 0
        }
      };
    }
  }
  return {
    ...contact,
    firstNumber,
    uuid,
    avatar,
    number: contact.number && contact.number.map((item) => ({
      ...item,
      value: (0, import_PhoneNumber.format)(item.value, {
        ourRegionCode: regionCode
      })
    }))
  };
}
function getName(contact) {
  const { name, organization } = contact;
  const displayName = name && name.displayName || void 0;
  const givenName = name && name.givenName || void 0;
  const familyName = name && name.familyName || void 0;
  const backupName = givenName && familyName && `${givenName} ${familyName}` || void 0;
  return displayName || organization || backupName || givenName || familyName;
}
function parseAndWriteAvatar(upgradeAttachment) {
  return async (contact, context) => {
    const { message, getRegionCode, logger } = context;
    const { avatar } = contact;
    const contactWithUpdatedAvatar = avatar && avatar.avatar ? {
      ...contact,
      avatar: {
        ...avatar,
        avatar: await upgradeAttachment(avatar.avatar, context)
      }
    } : (0, import_lodash.omit)(contact, ["avatar"]);
    const parsedContact = parseContact(contactWithUpdatedAvatar, {
      regionCode: getRegionCode()
    });
    const error = _validate(parsedContact, {
      messageId: idForLogging(message)
    });
    if (error) {
      logger.error("parseAndWriteAvatar: contact was malformed.", (0, import_errors.toLogFormat)(error));
    }
    return parsedContact;
  };
}
function parseContact(contact, { regionCode }) {
  const boundParsePhone = /* @__PURE__ */ __name((phoneNumber) => parsePhoneItem(phoneNumber, { regionCode }), "boundParsePhone");
  const skipEmpty = /* @__PURE__ */ __name((arr) => {
    const filtered = arr.filter(import_isNotNil.isNotNil);
    return filtered.length ? filtered : void 0;
  }, "skipEmpty");
  const number = skipEmpty((contact.number || []).map(boundParsePhone));
  const email = skipEmpty((contact.email || []).map(parseEmailItem));
  const address = skipEmpty((contact.address || []).map(parseAddress));
  let result = {
    ...(0, import_lodash.omit)(contact, ["avatar", "number", "email", "address"]),
    ...parseAvatar(contact.avatar)
  };
  if (number) {
    result = { ...result, number };
  }
  if (email) {
    result = { ...result, email };
  }
  if (address) {
    result = { ...result, address };
  }
  return result;
}
function idForLogging(message) {
  return `${message.source}.${message.sourceDevice} ${message.sent_at}`;
}
function _validate(contact, { messageId }) {
  const { name, number, email, address, organization } = contact;
  if ((!name || !name.displayName) && !organization) {
    return new Error(`Message ${messageId}: Contact had neither 'displayName' nor 'organization'`);
  }
  if ((!number || !number.length) && (!email || !email.length) && (!address || !address.length)) {
    return new Error(`Message ${messageId}: Contact had no included numbers, email or addresses`);
  }
  return void 0;
}
function parsePhoneItem(item, { regionCode }) {
  if (!item.value) {
    return void 0;
  }
  return {
    ...item,
    type: item.type || DEFAULT_PHONE_TYPE,
    value: (0, import_PhoneNumber.parse)(item.value, { regionCode })
  };
}
function parseEmailItem(item) {
  if (!item.value) {
    return void 0;
  }
  return { ...item, type: item.type || DEFAULT_EMAIL_TYPE };
}
function parseAddress(address) {
  if (!address) {
    return void 0;
  }
  if (!address.street && !address.pobox && !address.neighborhood && !address.city && !address.region && !address.postcode && !address.country) {
    return void 0;
  }
  return { ...address, type: address.type || DEFAULT_ADDRESS_TYPE };
}
function parseAvatar(avatar) {
  if (!avatar) {
    return void 0;
  }
  return {
    avatar: {
      ...avatar,
      isProfile: avatar.isProfile || false
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AddressType,
  ContactFormType,
  _validate,
  embeddedContactSelector,
  getName,
  numberToAddressType,
  numberToEmailType,
  numberToPhoneType,
  parseAndWriteAvatar
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1iZWRkZWRDb250YWN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgb21pdCB9IGZyb20gJ2xvZGFzaCc7XG5cbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi9wcm90b2J1Zic7XG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuXG5pbXBvcnQgeyBpc05vdE5pbCB9IGZyb20gJy4uL3V0aWwvaXNOb3ROaWwnO1xuaW1wb3J0IHtcbiAgZm9ybWF0IGFzIGZvcm1hdFBob25lTnVtYmVyLFxuICBwYXJzZSBhcyBwYXJzZVBob25lTnVtYmVyLFxufSBmcm9tICcuL1Bob25lTnVtYmVyJztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUsIG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtIH0gZnJvbSAnLi9BdHRhY2htZW50JztcbmltcG9ydCB7IHRvTG9nRm9ybWF0IH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi9Mb2dnaW5nJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuL1VVSUQnO1xuXG5leHBvcnQgdHlwZSBFbWJlZGRlZENvbnRhY3RUeXBlID0ge1xuICBuYW1lPzogTmFtZTtcbiAgbnVtYmVyPzogQXJyYXk8UGhvbmU+O1xuICBlbWFpbD86IEFycmF5PEVtYWlsPjtcbiAgYWRkcmVzcz86IEFycmF5PFBvc3RhbEFkZHJlc3M+O1xuICBhdmF0YXI/OiBBdmF0YXI7XG4gIG9yZ2FuaXphdGlvbj86IHN0cmluZztcblxuICAvLyBQb3B1bGF0ZWQgYnkgc2VsZWN0b3JcbiAgZmlyc3ROdW1iZXI/OiBzdHJpbmc7XG4gIHV1aWQ/OiBVVUlEU3RyaW5nVHlwZTtcbn07XG5cbnR5cGUgTmFtZSA9IHtcbiAgZ2l2ZW5OYW1lPzogc3RyaW5nO1xuICBmYW1pbHlOYW1lPzogc3RyaW5nO1xuICBwcmVmaXg/OiBzdHJpbmc7XG4gIHN1ZmZpeD86IHN0cmluZztcbiAgbWlkZGxlTmFtZT86IHN0cmluZztcbiAgZGlzcGxheU5hbWU/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgZW51bSBDb250YWN0Rm9ybVR5cGUge1xuICBIT01FID0gMSxcbiAgTU9CSUxFID0gMixcbiAgV09SSyA9IDMsXG4gIENVU1RPTSA9IDQsXG59XG5cbmV4cG9ydCBlbnVtIEFkZHJlc3NUeXBlIHtcbiAgSE9NRSA9IDEsXG4gIFdPUksgPSAyLFxuICBDVVNUT00gPSAzLFxufVxuXG5leHBvcnQgdHlwZSBQaG9uZSA9IHtcbiAgdmFsdWU6IHN0cmluZztcbiAgdHlwZTogQ29udGFjdEZvcm1UeXBlO1xuICBsYWJlbD86IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIEVtYWlsID0ge1xuICB2YWx1ZTogc3RyaW5nO1xuICB0eXBlOiBDb250YWN0Rm9ybVR5cGU7XG4gIGxhYmVsPzogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgUG9zdGFsQWRkcmVzcyA9IHtcbiAgdHlwZTogQWRkcmVzc1R5cGU7XG4gIGxhYmVsPzogc3RyaW5nO1xuICBzdHJlZXQ/OiBzdHJpbmc7XG4gIHBvYm94Pzogc3RyaW5nO1xuICBuZWlnaGJvcmhvb2Q/OiBzdHJpbmc7XG4gIGNpdHk/OiBzdHJpbmc7XG4gIHJlZ2lvbj86IHN0cmluZztcbiAgcG9zdGNvZGU/OiBzdHJpbmc7XG4gIGNvdW50cnk/OiBzdHJpbmc7XG59O1xuXG5leHBvcnQgdHlwZSBBdmF0YXIgPSB7XG4gIGF2YXRhcjogQXR0YWNobWVudFR5cGU7XG4gIGlzUHJvZmlsZTogYm9vbGVhbjtcbn07XG5cbmNvbnN0IERFRkFVTFRfUEhPTkVfVFlQRSA9IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuUGhvbmUuVHlwZS5IT01FO1xuY29uc3QgREVGQVVMVF9FTUFJTF9UWVBFID0gUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5FbWFpbC5UeXBlLkhPTUU7XG5jb25zdCBERUZBVUxUX0FERFJFU1NfVFlQRSA9IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuUG9zdGFsQWRkcmVzcy5UeXBlLkhPTUU7XG5cbmV4cG9ydCBmdW5jdGlvbiBudW1iZXJUb1Bob25lVHlwZShcbiAgdHlwZTogbnVtYmVyXG4pOiBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LlBob25lLlR5cGUge1xuICBpZiAodHlwZSA9PT0gUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5QaG9uZS5UeXBlLk1PQklMRSkge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIGlmICh0eXBlID09PSBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LlBob25lLlR5cGUuV09SSykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIGlmICh0eXBlID09PSBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LlBob25lLlR5cGUuQ1VTVE9NKSB7XG4gICAgcmV0dXJuIHR5cGU7XG4gIH1cblxuICByZXR1cm4gREVGQVVMVF9QSE9ORV9UWVBFO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gbnVtYmVyVG9FbWFpbFR5cGUoXG4gIHR5cGU6IG51bWJlclxuKTogUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5FbWFpbC5UeXBlIHtcbiAgaWYgKHR5cGUgPT09IFByb3RvLkRhdGFNZXNzYWdlLkNvbnRhY3QuRW1haWwuVHlwZS5NT0JJTEUpIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICBpZiAodHlwZSA9PT0gUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5FbWFpbC5UeXBlLldPUkspIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuICBpZiAodHlwZSA9PT0gUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5FbWFpbC5UeXBlLkNVU1RPTSkge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG5cbiAgcmV0dXJuIERFRkFVTFRfRU1BSUxfVFlQRTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIG51bWJlclRvQWRkcmVzc1R5cGUoXG4gIHR5cGU6IG51bWJlclxuKTogUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5Qb3N0YWxBZGRyZXNzLlR5cGUge1xuICBpZiAodHlwZSA9PT0gUHJvdG8uRGF0YU1lc3NhZ2UuQ29udGFjdC5Qb3N0YWxBZGRyZXNzLlR5cGUuV09SSykge1xuICAgIHJldHVybiB0eXBlO1xuICB9XG4gIGlmICh0eXBlID09PSBQcm90by5EYXRhTWVzc2FnZS5Db250YWN0LlBvc3RhbEFkZHJlc3MuVHlwZS5DVVNUT00pIHtcbiAgICByZXR1cm4gdHlwZTtcbiAgfVxuXG4gIHJldHVybiBERUZBVUxUX0FERFJFU1NfVFlQRTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGVtYmVkZGVkQ29udGFjdFNlbGVjdG9yKFxuICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlLFxuICBvcHRpb25zOiB7XG4gICAgcmVnaW9uQ29kZT86IHN0cmluZztcbiAgICBmaXJzdE51bWJlcj86IHN0cmluZztcbiAgICB1dWlkPzogVVVJRFN0cmluZ1R5cGU7XG4gICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aDogKHBhdGg6IHN0cmluZykgPT4gc3RyaW5nO1xuICB9XG4pOiBFbWJlZGRlZENvbnRhY3RUeXBlIHtcbiAgY29uc3QgeyBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoLCBmaXJzdE51bWJlciwgdXVpZCwgcmVnaW9uQ29kZSB9ID0gb3B0aW9ucztcblxuICBsZXQgeyBhdmF0YXIgfSA9IGNvbnRhY3Q7XG4gIGlmIChhdmF0YXIgJiYgYXZhdGFyLmF2YXRhcikge1xuICAgIGlmIChhdmF0YXIuYXZhdGFyLmVycm9yKSB7XG4gICAgICBhdmF0YXIgPSB1bmRlZmluZWQ7XG4gICAgfSBlbHNlIHtcbiAgICAgIGF2YXRhciA9IHtcbiAgICAgICAgLi4uYXZhdGFyLFxuICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAuLi5hdmF0YXIuYXZhdGFyLFxuICAgICAgICAgIHBhdGg6IGF2YXRhci5hdmF0YXIucGF0aFxuICAgICAgICAgICAgPyBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoKGF2YXRhci5hdmF0YXIucGF0aClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLmNvbnRhY3QsXG4gICAgZmlyc3ROdW1iZXIsXG4gICAgdXVpZCxcbiAgICBhdmF0YXIsXG4gICAgbnVtYmVyOlxuICAgICAgY29udGFjdC5udW1iZXIgJiZcbiAgICAgIGNvbnRhY3QubnVtYmVyLm1hcChpdGVtID0+ICh7XG4gICAgICAgIC4uLml0ZW0sXG4gICAgICAgIHZhbHVlOiBmb3JtYXRQaG9uZU51bWJlcihpdGVtLnZhbHVlLCB7XG4gICAgICAgICAgb3VyUmVnaW9uQ29kZTogcmVnaW9uQ29kZSxcbiAgICAgICAgfSksXG4gICAgICB9KSksXG4gIH07XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXROYW1lKGNvbnRhY3Q6IEVtYmVkZGVkQ29udGFjdFR5cGUpOiBzdHJpbmcgfCB1bmRlZmluZWQge1xuICBjb25zdCB7IG5hbWUsIG9yZ2FuaXphdGlvbiB9ID0gY29udGFjdDtcbiAgY29uc3QgZGlzcGxheU5hbWUgPSAobmFtZSAmJiBuYW1lLmRpc3BsYXlOYW1lKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IGdpdmVuTmFtZSA9IChuYW1lICYmIG5hbWUuZ2l2ZW5OYW1lKSB8fCB1bmRlZmluZWQ7XG4gIGNvbnN0IGZhbWlseU5hbWUgPSAobmFtZSAmJiBuYW1lLmZhbWlseU5hbWUpIHx8IHVuZGVmaW5lZDtcbiAgY29uc3QgYmFja3VwTmFtZSA9XG4gICAgKGdpdmVuTmFtZSAmJiBmYW1pbHlOYW1lICYmIGAke2dpdmVuTmFtZX0gJHtmYW1pbHlOYW1lfWApIHx8IHVuZGVmaW5lZDtcblxuICByZXR1cm4gZGlzcGxheU5hbWUgfHwgb3JnYW5pemF0aW9uIHx8IGJhY2t1cE5hbWUgfHwgZ2l2ZW5OYW1lIHx8IGZhbWlseU5hbWU7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUFuZFdyaXRlQXZhdGFyKFxuICB1cGdyYWRlQXR0YWNobWVudDogdHlwZW9mIG1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtXG4pIHtcbiAgcmV0dXJuIGFzeW5jIChcbiAgICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlLFxuICAgIGNvbnRleHQ6IHtcbiAgICAgIG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZTtcbiAgICAgIGdldFJlZ2lvbkNvZGU6ICgpID0+IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgICAgIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnZXJyb3InPjtcbiAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGE6IChkYXRhOiBVaW50OEFycmF5KSA9PiBQcm9taXNlPHN0cmluZz47XG4gICAgfVxuICApOiBQcm9taXNlPEVtYmVkZGVkQ29udGFjdFR5cGU+ID0+IHtcbiAgICBjb25zdCB7IG1lc3NhZ2UsIGdldFJlZ2lvbkNvZGUsIGxvZ2dlciB9ID0gY29udGV4dDtcbiAgICBjb25zdCB7IGF2YXRhciB9ID0gY29udGFjdDtcblxuICAgIGNvbnN0IGNvbnRhY3RXaXRoVXBkYXRlZEF2YXRhciA9XG4gICAgICBhdmF0YXIgJiYgYXZhdGFyLmF2YXRhclxuICAgICAgICA/IHtcbiAgICAgICAgICAgIC4uLmNvbnRhY3QsXG4gICAgICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgICAgLi4uYXZhdGFyLFxuICAgICAgICAgICAgICBhdmF0YXI6IGF3YWl0IHVwZ3JhZGVBdHRhY2htZW50KGF2YXRhci5hdmF0YXIsIGNvbnRleHQpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9XG4gICAgICAgIDogb21pdChjb250YWN0LCBbJ2F2YXRhciddKTtcblxuICAgIC8vIGVsaW1pbmF0ZXMgZW1wdHkgbnVtYmVycywgZW1haWxzLCBhbmQgYWRkcmVzc2VzOyBhZGRzIHR5cGUgaWYgbm90IHByb3ZpZGVkXG4gICAgY29uc3QgcGFyc2VkQ29udGFjdCA9IHBhcnNlQ29udGFjdChjb250YWN0V2l0aFVwZGF0ZWRBdmF0YXIsIHtcbiAgICAgIHJlZ2lvbkNvZGU6IGdldFJlZ2lvbkNvZGUoKSxcbiAgICB9KTtcblxuICAgIGNvbnN0IGVycm9yID0gX3ZhbGlkYXRlKHBhcnNlZENvbnRhY3QsIHtcbiAgICAgIG1lc3NhZ2VJZDogaWRGb3JMb2dnaW5nKG1lc3NhZ2UpLFxuICAgIH0pO1xuICAgIGlmIChlcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICAncGFyc2VBbmRXcml0ZUF2YXRhcjogY29udGFjdCB3YXMgbWFsZm9ybWVkLicsXG4gICAgICAgIHRvTG9nRm9ybWF0KGVycm9yKVxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gcGFyc2VkQ29udGFjdDtcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VDb250YWN0KFxuICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlLFxuICB7IHJlZ2lvbkNvZGUgfTogeyByZWdpb25Db2RlOiBzdHJpbmcgfCB1bmRlZmluZWQgfVxuKTogRW1iZWRkZWRDb250YWN0VHlwZSB7XG4gIGNvbnN0IGJvdW5kUGFyc2VQaG9uZSA9IChwaG9uZU51bWJlcjogUGhvbmUpOiBQaG9uZSB8IHVuZGVmaW5lZCA9PlxuICAgIHBhcnNlUGhvbmVJdGVtKHBob25lTnVtYmVyLCB7IHJlZ2lvbkNvZGUgfSk7XG5cbiAgY29uc3Qgc2tpcEVtcHR5ID0gPFQ+KGFycjogQXJyYXk8VCB8IHVuZGVmaW5lZD4pOiBBcnJheTxUPiB8IHVuZGVmaW5lZCA9PiB7XG4gICAgY29uc3QgZmlsdGVyZWQ6IEFycmF5PFQ+ID0gYXJyLmZpbHRlcihpc05vdE5pbCk7XG4gICAgcmV0dXJuIGZpbHRlcmVkLmxlbmd0aCA/IGZpbHRlcmVkIDogdW5kZWZpbmVkO1xuICB9O1xuXG4gIGNvbnN0IG51bWJlciA9IHNraXBFbXB0eSgoY29udGFjdC5udW1iZXIgfHwgW10pLm1hcChib3VuZFBhcnNlUGhvbmUpKTtcbiAgY29uc3QgZW1haWwgPSBza2lwRW1wdHkoKGNvbnRhY3QuZW1haWwgfHwgW10pLm1hcChwYXJzZUVtYWlsSXRlbSkpO1xuICBjb25zdCBhZGRyZXNzID0gc2tpcEVtcHR5KChjb250YWN0LmFkZHJlc3MgfHwgW10pLm1hcChwYXJzZUFkZHJlc3MpKTtcblxuICBsZXQgcmVzdWx0ID0ge1xuICAgIC4uLm9taXQoY29udGFjdCwgWydhdmF0YXInLCAnbnVtYmVyJywgJ2VtYWlsJywgJ2FkZHJlc3MnXSksXG4gICAgLi4ucGFyc2VBdmF0YXIoY29udGFjdC5hdmF0YXIpLFxuICB9O1xuXG4gIGlmIChudW1iZXIpIHtcbiAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgbnVtYmVyIH07XG4gIH1cbiAgaWYgKGVtYWlsKSB7XG4gICAgcmVzdWx0ID0geyAuLi5yZXN1bHQsIGVtYWlsIH07XG4gIH1cbiAgaWYgKGFkZHJlc3MpIHtcbiAgICByZXN1bHQgPSB7IC4uLnJlc3VsdCwgYWRkcmVzcyB9O1xuICB9XG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmZ1bmN0aW9uIGlkRm9yTG9nZ2luZyhtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpOiBzdHJpbmcge1xuICByZXR1cm4gYCR7bWVzc2FnZS5zb3VyY2V9LiR7bWVzc2FnZS5zb3VyY2VEZXZpY2V9ICR7bWVzc2FnZS5zZW50X2F0fWA7XG59XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nXG5leHBvcnQgZnVuY3Rpb24gX3ZhbGlkYXRlKFxuICBjb250YWN0OiBFbWJlZGRlZENvbnRhY3RUeXBlLFxuICB7IG1lc3NhZ2VJZCB9OiB7IG1lc3NhZ2VJZDogc3RyaW5nIH1cbik6IEVycm9yIHwgdW5kZWZpbmVkIHtcbiAgY29uc3QgeyBuYW1lLCBudW1iZXIsIGVtYWlsLCBhZGRyZXNzLCBvcmdhbml6YXRpb24gfSA9IGNvbnRhY3Q7XG5cbiAgaWYgKCghbmFtZSB8fCAhbmFtZS5kaXNwbGF5TmFtZSkgJiYgIW9yZ2FuaXphdGlvbikge1xuICAgIHJldHVybiBuZXcgRXJyb3IoXG4gICAgICBgTWVzc2FnZSAke21lc3NhZ2VJZH06IENvbnRhY3QgaGFkIG5laXRoZXIgJ2Rpc3BsYXlOYW1lJyBub3IgJ29yZ2FuaXphdGlvbidgXG4gICAgKTtcbiAgfVxuXG4gIGlmIChcbiAgICAoIW51bWJlciB8fCAhbnVtYmVyLmxlbmd0aCkgJiZcbiAgICAoIWVtYWlsIHx8ICFlbWFpbC5sZW5ndGgpICYmXG4gICAgKCFhZGRyZXNzIHx8ICFhZGRyZXNzLmxlbmd0aClcbiAgKSB7XG4gICAgcmV0dXJuIG5ldyBFcnJvcihcbiAgICAgIGBNZXNzYWdlICR7bWVzc2FnZUlkfTogQ29udGFjdCBoYWQgbm8gaW5jbHVkZWQgbnVtYmVycywgZW1haWwgb3IgYWRkcmVzc2VzYFxuICAgICk7XG4gIH1cblxuICByZXR1cm4gdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBwYXJzZVBob25lSXRlbShcbiAgaXRlbTogUGhvbmUsXG4gIHsgcmVnaW9uQ29kZSB9OiB7IHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZCB9XG4pOiBQaG9uZSB8IHVuZGVmaW5lZCB7XG4gIGlmICghaXRlbS52YWx1ZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4ge1xuICAgIC4uLml0ZW0sXG4gICAgdHlwZTogaXRlbS50eXBlIHx8IERFRkFVTFRfUEhPTkVfVFlQRSxcbiAgICB2YWx1ZTogcGFyc2VQaG9uZU51bWJlcihpdGVtLnZhbHVlLCB7IHJlZ2lvbkNvZGUgfSksXG4gIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlRW1haWxJdGVtKGl0ZW06IEVtYWlsKTogRW1haWwgfCB1bmRlZmluZWQge1xuICBpZiAoIWl0ZW0udmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHsgLi4uaXRlbSwgdHlwZTogaXRlbS50eXBlIHx8IERFRkFVTFRfRU1BSUxfVFlQRSB9O1xufVxuXG5mdW5jdGlvbiBwYXJzZUFkZHJlc3MoYWRkcmVzczogUG9zdGFsQWRkcmVzcyk6IFBvc3RhbEFkZHJlc3MgfCB1bmRlZmluZWQge1xuICBpZiAoIWFkZHJlc3MpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgaWYgKFxuICAgICFhZGRyZXNzLnN0cmVldCAmJlxuICAgICFhZGRyZXNzLnBvYm94ICYmXG4gICAgIWFkZHJlc3MubmVpZ2hib3Job29kICYmXG4gICAgIWFkZHJlc3MuY2l0eSAmJlxuICAgICFhZGRyZXNzLnJlZ2lvbiAmJlxuICAgICFhZGRyZXNzLnBvc3Rjb2RlICYmXG4gICAgIWFkZHJlc3MuY291bnRyeVxuICApIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgcmV0dXJuIHsgLi4uYWRkcmVzcywgdHlwZTogYWRkcmVzcy50eXBlIHx8IERFRkFVTFRfQUREUkVTU19UWVBFIH07XG59XG5cbmZ1bmN0aW9uIHBhcnNlQXZhdGFyKGF2YXRhcj86IEF2YXRhcik6IHsgYXZhdGFyOiBBdmF0YXIgfSB8IHVuZGVmaW5lZCB7XG4gIGlmICghYXZhdGFyKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgYXZhdGFyOiB7XG4gICAgICAuLi5hdmF0YXIsXG4gICAgICBpc1Byb2ZpbGU6IGF2YXRhci5pc1Byb2ZpbGUgfHwgZmFsc2UsXG4gICAgfSxcbiAgfTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXFCO0FBRXJCLHNCQUF1QztBQUd2QyxzQkFBeUI7QUFDekIseUJBR087QUFFUCxvQkFBNEI7QUEwQnJCLElBQUssa0JBQUwsa0JBQUsscUJB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
