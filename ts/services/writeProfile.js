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
var writeProfile_exports = {};
__export(writeProfile_exports, {
  writeProfile: () => writeProfile
});
module.exports = __toCommonJS(writeProfile_exports);
var import_Client = __toESM(require("../sql/Client"));
var Errors = __toESM(require("../types/errors"));
var log = __toESM(require("../logging/log"));
var import_Crypto = require("../Crypto");
var import_encryptProfileData = require("../util/encryptProfileData");
var import_getProfile = require("../util/getProfile");
var import_singleProtoJobQueue = require("../jobs/singleProtoJobQueue");
var import_assert = require("../util/assert");
var import_whitespaceStringUtil = require("../util/whitespaceStringUtil");
var import_SendMessage = __toESM(require("../textsecure/SendMessage"));
async function writeProfile(conversation, avatar) {
  const { messaging } = window.textsecure;
  if (!messaging) {
    throw new Error("messaging is not available!");
  }
  const model = window.ConversationController.get(conversation.id);
  if (!model) {
    return;
  }
  await (0, import_getProfile.getProfile)(model.get("uuid"), model.get("e164"));
  const {
    aboutEmoji,
    aboutText,
    avatarHash,
    avatarPath,
    familyName,
    firstName
  } = conversation;
  (0, import_assert.strictAssert)(!(0, import_whitespaceStringUtil.isWhitespace)(String(conversation.firstName)), "writeProfile: Cannot set an empty profile name");
  const [profileData, encryptedAvatarData] = await (0, import_encryptProfileData.encryptProfileData)(conversation, avatar);
  const avatarRequestHeaders = await messaging.putProfile(profileData);
  const { newAvatar } = avatar;
  let maybeProfileAvatarUpdate = {};
  if (profileData.sameAvatar) {
    log.info("writeProfile: not updating avatar");
  } else if (avatarRequestHeaders && encryptedAvatarData && newAvatar) {
    log.info("writeProfile: uploading new avatar");
    const avatarUrl = await messaging.uploadAvatar(avatarRequestHeaders, encryptedAvatarData);
    const hash = await (0, import_Crypto.computeHash)(newAvatar);
    if (hash !== avatarHash) {
      log.info("writeProfile: removing old avatar and saving the new one");
      const [path] = await Promise.all([
        window.Signal.Migrations.writeNewAttachmentData(newAvatar),
        avatarPath ? window.Signal.Migrations.deleteAttachmentData(avatarPath) : void 0
      ]);
      maybeProfileAvatarUpdate = {
        profileAvatar: { hash, path }
      };
    }
    await window.storage.put("avatarUrl", avatarUrl);
  } else if (avatarPath) {
    log.info("writeProfile: removing avatar");
    await Promise.all([
      window.Signal.Migrations.deleteAttachmentData(avatarPath),
      window.storage.put("avatarUrl", void 0)
    ]);
    maybeProfileAvatarUpdate = { profileAvatar: void 0 };
  }
  model.set({
    about: aboutText,
    aboutEmoji,
    profileName: firstName,
    profileFamilyName: familyName,
    ...maybeProfileAvatarUpdate
  });
  import_Client.default.updateConversation(model.attributes);
  model.captureChange("writeProfile");
  try {
    await import_singleProtoJobQueue.singleProtoJobQueue.add(import_SendMessage.default.getFetchLocalProfileSyncMessage());
  } catch (error) {
    log.error("writeProfile: Failed to queue sync message", Errors.toLogFormat(error));
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  writeProfile
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid3JpdGVQcm9maWxlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGNvbXB1dGVIYXNoIH0gZnJvbSAnLi4vQ3J5cHRvJztcbmltcG9ydCB7IGVuY3J5cHRQcm9maWxlRGF0YSB9IGZyb20gJy4uL3V0aWwvZW5jcnlwdFByb2ZpbGVEYXRhJztcbmltcG9ydCB7IGdldFByb2ZpbGUgfSBmcm9tICcuLi91dGlsL2dldFByb2ZpbGUnO1xuaW1wb3J0IHsgc2luZ2xlUHJvdG9Kb2JRdWV1ZSB9IGZyb20gJy4uL2pvYnMvc2luZ2xlUHJvdG9Kb2JRdWV1ZSc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBpc1doaXRlc3BhY2UgfSBmcm9tICcuLi91dGlsL3doaXRlc3BhY2VTdHJpbmdVdGlsJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyVXBkYXRlVHlwZSB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciBmcm9tICcuLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIHdyaXRlUHJvZmlsZShcbiAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlLFxuICBhdmF0YXI6IEF2YXRhclVwZGF0ZVR5cGVcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IG1lc3NhZ2luZyB9ID0gd2luZG93LnRleHRzZWN1cmU7XG4gIGlmICghbWVzc2FnaW5nKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdtZXNzYWdpbmcgaXMgbm90IGF2YWlsYWJsZSEnKTtcbiAgfVxuXG4gIC8vIEJlZm9yZSB3ZSB3cml0ZSBhbnl0aGluZyB3ZSByZXF1ZXN0IHRoZSB1c2VyJ3MgcHJvZmlsZSBzbyB0aGF0IHdlIGNhblxuICAvLyBoYXZlIGFuIHVwLXRvLWRhdGUgcGF5bWVudEFkZHJlc3MgdG8gYmUgYWJsZSB0byBpbmNsdWRlIGl0IHdoZW4gd2Ugd3JpdGVcbiAgY29uc3QgbW9kZWwgPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uLmlkKTtcbiAgaWYgKCFtb2RlbCkge1xuICAgIHJldHVybjtcbiAgfVxuICBhd2FpdCBnZXRQcm9maWxlKG1vZGVsLmdldCgndXVpZCcpLCBtb2RlbC5nZXQoJ2UxNjQnKSk7XG5cbiAgLy8gRW5jcnlwdCB0aGUgcHJvZmlsZSBkYXRhLCB1cGRhdGUgcHJvZmlsZSwgYW5kIGlmIG5lZWRlZCB1cGxvYWQgdGhlIGF2YXRhclxuICBjb25zdCB7XG4gICAgYWJvdXRFbW9qaSxcbiAgICBhYm91dFRleHQsXG4gICAgYXZhdGFySGFzaCxcbiAgICBhdmF0YXJQYXRoLFxuICAgIGZhbWlseU5hbWUsXG4gICAgZmlyc3ROYW1lLFxuICB9ID0gY29udmVyc2F0aW9uO1xuXG4gIHN0cmljdEFzc2VydChcbiAgICAhaXNXaGl0ZXNwYWNlKFN0cmluZyhjb252ZXJzYXRpb24uZmlyc3ROYW1lKSksXG4gICAgJ3dyaXRlUHJvZmlsZTogQ2Fubm90IHNldCBhbiBlbXB0eSBwcm9maWxlIG5hbWUnXG4gICk7XG5cbiAgY29uc3QgW3Byb2ZpbGVEYXRhLCBlbmNyeXB0ZWRBdmF0YXJEYXRhXSA9IGF3YWl0IGVuY3J5cHRQcm9maWxlRGF0YShcbiAgICBjb252ZXJzYXRpb24sXG4gICAgYXZhdGFyXG4gICk7XG4gIGNvbnN0IGF2YXRhclJlcXVlc3RIZWFkZXJzID0gYXdhaXQgbWVzc2FnaW5nLnB1dFByb2ZpbGUocHJvZmlsZURhdGEpO1xuXG4gIC8vIFVwbG9hZCB0aGUgYXZhdGFyIGlmIHByb3ZpZGVkXG4gIC8vIGRlbGV0ZSBleGlzdGluZyBmaWxlcyBvbiBkaXNrIGlmIGF2YXRhciBoYXMgYmVlbiByZW1vdmVkXG4gIC8vIHVwZGF0ZSB0aGUgYWNjb3VudCdzIGF2YXRhciBwYXRoIGFuZCBoYXNoIGlmIGl0J3MgYSBuZXcgYXZhdGFyXG4gIGNvbnN0IHsgbmV3QXZhdGFyIH0gPSBhdmF0YXI7XG4gIGxldCBtYXliZVByb2ZpbGVBdmF0YXJVcGRhdGU6IHtcbiAgICBwcm9maWxlQXZhdGFyPzpcbiAgICAgIHwge1xuICAgICAgICAgIGhhc2g6IHN0cmluZztcbiAgICAgICAgICBwYXRoOiBzdHJpbmc7XG4gICAgICAgIH1cbiAgICAgIHwgdW5kZWZpbmVkO1xuICB9ID0ge307XG4gIGlmIChwcm9maWxlRGF0YS5zYW1lQXZhdGFyKSB7XG4gICAgbG9nLmluZm8oJ3dyaXRlUHJvZmlsZTogbm90IHVwZGF0aW5nIGF2YXRhcicpO1xuICB9IGVsc2UgaWYgKGF2YXRhclJlcXVlc3RIZWFkZXJzICYmIGVuY3J5cHRlZEF2YXRhckRhdGEgJiYgbmV3QXZhdGFyKSB7XG4gICAgbG9nLmluZm8oJ3dyaXRlUHJvZmlsZTogdXBsb2FkaW5nIG5ldyBhdmF0YXInKTtcbiAgICBjb25zdCBhdmF0YXJVcmwgPSBhd2FpdCBtZXNzYWdpbmcudXBsb2FkQXZhdGFyKFxuICAgICAgYXZhdGFyUmVxdWVzdEhlYWRlcnMsXG4gICAgICBlbmNyeXB0ZWRBdmF0YXJEYXRhXG4gICAgKTtcblxuICAgIGNvbnN0IGhhc2ggPSBhd2FpdCBjb21wdXRlSGFzaChuZXdBdmF0YXIpO1xuXG4gICAgaWYgKGhhc2ggIT09IGF2YXRhckhhc2gpIHtcbiAgICAgIGxvZy5pbmZvKCd3cml0ZVByb2ZpbGU6IHJlbW92aW5nIG9sZCBhdmF0YXIgYW5kIHNhdmluZyB0aGUgbmV3IG9uZScpO1xuICAgICAgY29uc3QgW3BhdGhdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMud3JpdGVOZXdBdHRhY2htZW50RGF0YShuZXdBdmF0YXIpLFxuICAgICAgICBhdmF0YXJQYXRoXG4gICAgICAgICAgPyB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZGVsZXRlQXR0YWNobWVudERhdGEoYXZhdGFyUGF0aClcbiAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIF0pO1xuICAgICAgbWF5YmVQcm9maWxlQXZhdGFyVXBkYXRlID0ge1xuICAgICAgICBwcm9maWxlQXZhdGFyOiB7IGhhc2gsIHBhdGggfSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHV0KCdhdmF0YXJVcmwnLCBhdmF0YXJVcmwpO1xuICB9IGVsc2UgaWYgKGF2YXRhclBhdGgpIHtcbiAgICBsb2cuaW5mbygnd3JpdGVQcm9maWxlOiByZW1vdmluZyBhdmF0YXInKTtcbiAgICBhd2FpdCBQcm9taXNlLmFsbChbXG4gICAgICB3aW5kb3cuU2lnbmFsLk1pZ3JhdGlvbnMuZGVsZXRlQXR0YWNobWVudERhdGEoYXZhdGFyUGF0aCksXG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoJ2F2YXRhclVybCcsIHVuZGVmaW5lZCksXG4gICAgXSk7XG5cbiAgICBtYXliZVByb2ZpbGVBdmF0YXJVcGRhdGUgPSB7IHByb2ZpbGVBdmF0YXI6IHVuZGVmaW5lZCB9O1xuICB9XG5cbiAgLy8gVXBkYXRlIGJhY2tib25lLCB1cGRhdGUgREIsIHJ1biBzdG9yYWdlIHNlcnZpY2UgdXBsb2FkXG4gIG1vZGVsLnNldCh7XG4gICAgYWJvdXQ6IGFib3V0VGV4dCxcbiAgICBhYm91dEVtb2ppLFxuICAgIHByb2ZpbGVOYW1lOiBmaXJzdE5hbWUsXG4gICAgcHJvZmlsZUZhbWlseU5hbWU6IGZhbWlseU5hbWUsXG4gICAgLi4ubWF5YmVQcm9maWxlQXZhdGFyVXBkYXRlLFxuICB9KTtcblxuICBkYXRhSW50ZXJmYWNlLnVwZGF0ZUNvbnZlcnNhdGlvbihtb2RlbC5hdHRyaWJ1dGVzKTtcbiAgbW9kZWwuY2FwdHVyZUNoYW5nZSgnd3JpdGVQcm9maWxlJyk7XG5cbiAgdHJ5IHtcbiAgICBhd2FpdCBzaW5nbGVQcm90b0pvYlF1ZXVlLmFkZChcbiAgICAgIE1lc3NhZ2VTZW5kZXIuZ2V0RmV0Y2hMb2NhbFByb2ZpbGVTeW5jTWVzc2FnZSgpXG4gICAgKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBsb2cuZXJyb3IoXG4gICAgICAnd3JpdGVQcm9maWxlOiBGYWlsZWQgdG8gcXVldWUgc3luYyBtZXNzYWdlJyxcbiAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICApO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQTBCO0FBRTFCLGFBQXdCO0FBQ3hCLFVBQXFCO0FBQ3JCLG9CQUE0QjtBQUM1QixnQ0FBbUM7QUFDbkMsd0JBQTJCO0FBQzNCLGlDQUFvQztBQUNwQyxvQkFBNkI7QUFDN0Isa0NBQTZCO0FBRTdCLHlCQUEwQjtBQUUxQiw0QkFDRSxjQUNBLFFBQ2U7QUFDZixRQUFNLEVBQUUsY0FBYyxPQUFPO0FBQzdCLE1BQUksQ0FBQyxXQUFXO0FBQ2QsVUFBTSxJQUFJLE1BQU0sNkJBQTZCO0FBQUEsRUFDL0M7QUFJQSxRQUFNLFFBQVEsT0FBTyx1QkFBdUIsSUFBSSxhQUFhLEVBQUU7QUFDL0QsTUFBSSxDQUFDLE9BQU87QUFDVjtBQUFBLEVBQ0Y7QUFDQSxRQUFNLGtDQUFXLE1BQU0sSUFBSSxNQUFNLEdBQUcsTUFBTSxJQUFJLE1BQU0sQ0FBQztBQUdyRCxRQUFNO0FBQUEsSUFDSjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLGtDQUNFLENBQUMsOENBQWEsT0FBTyxhQUFhLFNBQVMsQ0FBQyxHQUM1QyxnREFDRjtBQUVBLFFBQU0sQ0FBQyxhQUFhLHVCQUF1QixNQUFNLGtEQUMvQyxjQUNBLE1BQ0Y7QUFDQSxRQUFNLHVCQUF1QixNQUFNLFVBQVUsV0FBVyxXQUFXO0FBS25FLFFBQU0sRUFBRSxjQUFjO0FBQ3RCLE1BQUksMkJBT0EsQ0FBQztBQUNMLE1BQUksWUFBWSxZQUFZO0FBQzFCLFFBQUksS0FBSyxtQ0FBbUM7QUFBQSxFQUM5QyxXQUFXLHdCQUF3Qix1QkFBdUIsV0FBVztBQUNuRSxRQUFJLEtBQUssb0NBQW9DO0FBQzdDLFVBQU0sWUFBWSxNQUFNLFVBQVUsYUFDaEMsc0JBQ0EsbUJBQ0Y7QUFFQSxVQUFNLE9BQU8sTUFBTSwrQkFBWSxTQUFTO0FBRXhDLFFBQUksU0FBUyxZQUFZO0FBQ3ZCLFVBQUksS0FBSywwREFBMEQ7QUFDbkUsWUFBTSxDQUFDLFFBQVEsTUFBTSxRQUFRLElBQUk7QUFBQSxRQUMvQixPQUFPLE9BQU8sV0FBVyx1QkFBdUIsU0FBUztBQUFBLFFBQ3pELGFBQ0ksT0FBTyxPQUFPLFdBQVcscUJBQXFCLFVBQVUsSUFDeEQ7QUFBQSxNQUNOLENBQUM7QUFDRCxpQ0FBMkI7QUFBQSxRQUN6QixlQUFlLEVBQUUsTUFBTSxLQUFLO0FBQUEsTUFDOUI7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLFFBQVEsSUFBSSxhQUFhLFNBQVM7QUFBQSxFQUNqRCxXQUFXLFlBQVk7QUFDckIsUUFBSSxLQUFLLCtCQUErQjtBQUN4QyxVQUFNLFFBQVEsSUFBSTtBQUFBLE1BQ2hCLE9BQU8sT0FBTyxXQUFXLHFCQUFxQixVQUFVO0FBQUEsTUFDeEQsT0FBTyxRQUFRLElBQUksYUFBYSxNQUFTO0FBQUEsSUFDM0MsQ0FBQztBQUVELCtCQUEyQixFQUFFLGVBQWUsT0FBVTtBQUFBLEVBQ3hEO0FBR0EsUUFBTSxJQUFJO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUDtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsbUJBQW1CO0FBQUEsT0FDaEI7QUFBQSxFQUNMLENBQUM7QUFFRCx3QkFBYyxtQkFBbUIsTUFBTSxVQUFVO0FBQ2pELFFBQU0sY0FBYyxjQUFjO0FBRWxDLE1BQUk7QUFDRixVQUFNLCtDQUFvQixJQUN4QiwyQkFBYyxnQ0FBZ0MsQ0FDaEQ7QUFBQSxFQUNGLFNBQVMsT0FBUDtBQUNBLFFBQUksTUFDRiw4Q0FDQSxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLEVBQ0Y7QUFDRjtBQTNHc0IiLAogICJuYW1lcyI6IFtdCn0K
