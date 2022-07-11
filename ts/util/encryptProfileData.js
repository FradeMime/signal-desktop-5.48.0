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
var encryptProfileData_exports = {};
__export(encryptProfileData_exports, {
  encryptProfileData: () => encryptProfileData
});
module.exports = __toCommonJS(encryptProfileData_exports);
var import_assert = require("./assert");
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_zkgroup = require("./zkgroup");
async function encryptProfileData(conversation, { oldAvatar, newAvatar }) {
  const {
    aboutEmoji,
    aboutText,
    badges,
    familyName,
    firstName,
    profileKey,
    uuid
  } = conversation;
  (0, import_assert.assert)(profileKey, "profileKey");
  (0, import_assert.assert)(uuid, "uuid");
  const keyBuffer = Bytes.fromBase64(profileKey);
  const fullName = [firstName, familyName].filter(Boolean).join("\0");
  const bytesName = (0, import_Crypto.encryptProfileItemWithPadding)(Bytes.fromString(fullName), keyBuffer, import_Crypto.PaddedLengths.Name);
  const bytesAbout = aboutText ? (0, import_Crypto.encryptProfileItemWithPadding)(Bytes.fromString(aboutText), keyBuffer, import_Crypto.PaddedLengths.About) : null;
  const bytesAboutEmoji = aboutEmoji ? (0, import_Crypto.encryptProfileItemWithPadding)(Bytes.fromString(aboutEmoji), keyBuffer, import_Crypto.PaddedLengths.AboutEmoji) : null;
  const encryptedAvatarData = newAvatar ? (0, import_Crypto.encryptProfile)(newAvatar, keyBuffer) : void 0;
  const sameAvatar = Bytes.areEqual(oldAvatar, newAvatar);
  const profileData = {
    version: (0, import_zkgroup.deriveProfileKeyVersion)(profileKey, uuid),
    name: Bytes.toBase64(bytesName),
    about: bytesAbout ? Bytes.toBase64(bytesAbout) : null,
    aboutEmoji: bytesAboutEmoji ? Bytes.toBase64(bytesAboutEmoji) : null,
    badgeIds: (badges || []).map(({ id }) => id),
    paymentAddress: window.storage.get("paymentAddress") || null,
    avatar: Boolean(newAvatar),
    sameAvatar,
    commitment: (0, import_zkgroup.deriveProfileKeyCommitment)(profileKey, uuid)
  };
  return [profileData, encryptedAvatarData];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  encryptProfileData
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW5jcnlwdFByb2ZpbGVEYXRhLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBQcm9maWxlUmVxdWVzdERhdGFUeXBlIH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9XZWJBUEknO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnLi9hc3NlcnQnO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHtcbiAgUGFkZGVkTGVuZ3RocyxcbiAgZW5jcnlwdFByb2ZpbGUsXG4gIGVuY3J5cHRQcm9maWxlSXRlbVdpdGhQYWRkaW5nLFxufSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJVcGRhdGVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcbmltcG9ydCB7IGRlcml2ZVByb2ZpbGVLZXlDb21taXRtZW50LCBkZXJpdmVQcm9maWxlS2V5VmVyc2lvbiB9IGZyb20gJy4vemtncm91cCc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbmNyeXB0UHJvZmlsZURhdGEoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZSxcbiAgeyBvbGRBdmF0YXIsIG5ld0F2YXRhciB9OiBBdmF0YXJVcGRhdGVUeXBlXG4pOiBQcm9taXNlPFtQcm9maWxlUmVxdWVzdERhdGFUeXBlLCBVaW50OEFycmF5IHwgdW5kZWZpbmVkXT4ge1xuICBjb25zdCB7XG4gICAgYWJvdXRFbW9qaSxcbiAgICBhYm91dFRleHQsXG4gICAgYmFkZ2VzLFxuICAgIGZhbWlseU5hbWUsXG4gICAgZmlyc3ROYW1lLFxuICAgIHByb2ZpbGVLZXksXG4gICAgdXVpZCxcbiAgfSA9IGNvbnZlcnNhdGlvbjtcblxuICBhc3NlcnQocHJvZmlsZUtleSwgJ3Byb2ZpbGVLZXknKTtcbiAgYXNzZXJ0KHV1aWQsICd1dWlkJyk7XG5cbiAgY29uc3Qga2V5QnVmZmVyID0gQnl0ZXMuZnJvbUJhc2U2NChwcm9maWxlS2V5KTtcblxuICBjb25zdCBmdWxsTmFtZSA9IFtmaXJzdE5hbWUsIGZhbWlseU5hbWVdLmZpbHRlcihCb29sZWFuKS5qb2luKCdcXDAnKTtcblxuICBjb25zdCBieXRlc05hbWUgPSBlbmNyeXB0UHJvZmlsZUl0ZW1XaXRoUGFkZGluZyhcbiAgICBCeXRlcy5mcm9tU3RyaW5nKGZ1bGxOYW1lKSxcbiAgICBrZXlCdWZmZXIsXG4gICAgUGFkZGVkTGVuZ3Rocy5OYW1lXG4gICk7XG5cbiAgY29uc3QgYnl0ZXNBYm91dCA9IGFib3V0VGV4dFxuICAgID8gZW5jcnlwdFByb2ZpbGVJdGVtV2l0aFBhZGRpbmcoXG4gICAgICAgIEJ5dGVzLmZyb21TdHJpbmcoYWJvdXRUZXh0KSxcbiAgICAgICAga2V5QnVmZmVyLFxuICAgICAgICBQYWRkZWRMZW5ndGhzLkFib3V0XG4gICAgICApXG4gICAgOiBudWxsO1xuXG4gIGNvbnN0IGJ5dGVzQWJvdXRFbW9qaSA9IGFib3V0RW1vamlcbiAgICA/IGVuY3J5cHRQcm9maWxlSXRlbVdpdGhQYWRkaW5nKFxuICAgICAgICBCeXRlcy5mcm9tU3RyaW5nKGFib3V0RW1vamkpLFxuICAgICAgICBrZXlCdWZmZXIsXG4gICAgICAgIFBhZGRlZExlbmd0aHMuQWJvdXRFbW9qaVxuICAgICAgKVxuICAgIDogbnVsbDtcblxuICBjb25zdCBlbmNyeXB0ZWRBdmF0YXJEYXRhID0gbmV3QXZhdGFyXG4gICAgPyBlbmNyeXB0UHJvZmlsZShuZXdBdmF0YXIsIGtleUJ1ZmZlcilcbiAgICA6IHVuZGVmaW5lZDtcblxuICBjb25zdCBzYW1lQXZhdGFyID0gQnl0ZXMuYXJlRXF1YWwob2xkQXZhdGFyLCBuZXdBdmF0YXIpO1xuXG4gIGNvbnN0IHByb2ZpbGVEYXRhID0ge1xuICAgIHZlcnNpb246IGRlcml2ZVByb2ZpbGVLZXlWZXJzaW9uKHByb2ZpbGVLZXksIHV1aWQpLFxuICAgIG5hbWU6IEJ5dGVzLnRvQmFzZTY0KGJ5dGVzTmFtZSksXG4gICAgYWJvdXQ6IGJ5dGVzQWJvdXQgPyBCeXRlcy50b0Jhc2U2NChieXRlc0Fib3V0KSA6IG51bGwsXG4gICAgYWJvdXRFbW9qaTogYnl0ZXNBYm91dEVtb2ppID8gQnl0ZXMudG9CYXNlNjQoYnl0ZXNBYm91dEVtb2ppKSA6IG51bGwsXG4gICAgYmFkZ2VJZHM6IChiYWRnZXMgfHwgW10pLm1hcCgoeyBpZCB9KSA9PiBpZCksXG4gICAgcGF5bWVudEFkZHJlc3M6IHdpbmRvdy5zdG9yYWdlLmdldCgncGF5bWVudEFkZHJlc3MnKSB8fCBudWxsLFxuICAgIGF2YXRhcjogQm9vbGVhbihuZXdBdmF0YXIpLFxuICAgIHNhbWVBdmF0YXIsXG4gICAgY29tbWl0bWVudDogZGVyaXZlUHJvZmlsZUtleUNvbW1pdG1lbnQocHJvZmlsZUtleSwgdXVpZCksXG4gIH07XG5cbiAgcmV0dXJuIFtwcm9maWxlRGF0YSwgZW5jcnlwdGVkQXZhdGFyRGF0YV07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0Esb0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUlPO0FBRVAscUJBQW9FO0FBRXBFLGtDQUNFLGNBQ0EsRUFBRSxXQUFXLGFBQzhDO0FBQzNELFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLDRCQUFPLFlBQVksWUFBWTtBQUMvQiw0QkFBTyxNQUFNLE1BQU07QUFFbkIsUUFBTSxZQUFZLE1BQU0sV0FBVyxVQUFVO0FBRTdDLFFBQU0sV0FBVyxDQUFDLFdBQVcsVUFBVSxFQUFFLE9BQU8sT0FBTyxFQUFFLEtBQUssSUFBSTtBQUVsRSxRQUFNLFlBQVksaURBQ2hCLE1BQU0sV0FBVyxRQUFRLEdBQ3pCLFdBQ0EsNEJBQWMsSUFDaEI7QUFFQSxRQUFNLGFBQWEsWUFDZixpREFDRSxNQUFNLFdBQVcsU0FBUyxHQUMxQixXQUNBLDRCQUFjLEtBQ2hCLElBQ0E7QUFFSixRQUFNLGtCQUFrQixhQUNwQixpREFDRSxNQUFNLFdBQVcsVUFBVSxHQUMzQixXQUNBLDRCQUFjLFVBQ2hCLElBQ0E7QUFFSixRQUFNLHNCQUFzQixZQUN4QixrQ0FBZSxXQUFXLFNBQVMsSUFDbkM7QUFFSixRQUFNLGFBQWEsTUFBTSxTQUFTLFdBQVcsU0FBUztBQUV0RCxRQUFNLGNBQWM7QUFBQSxJQUNsQixTQUFTLDRDQUF3QixZQUFZLElBQUk7QUFBQSxJQUNqRCxNQUFNLE1BQU0sU0FBUyxTQUFTO0FBQUEsSUFDOUIsT0FBTyxhQUFhLE1BQU0sU0FBUyxVQUFVLElBQUk7QUFBQSxJQUNqRCxZQUFZLGtCQUFrQixNQUFNLFNBQVMsZUFBZSxJQUFJO0FBQUEsSUFDaEUsVUFBVyxXQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsRUFBRSxTQUFTLEVBQUU7QUFBQSxJQUMzQyxnQkFBZ0IsT0FBTyxRQUFRLElBQUksZ0JBQWdCLEtBQUs7QUFBQSxJQUN4RCxRQUFRLFFBQVEsU0FBUztBQUFBLElBQ3pCO0FBQUEsSUFDQSxZQUFZLCtDQUEyQixZQUFZLElBQUk7QUFBQSxFQUN6RDtBQUVBLFNBQU8sQ0FBQyxhQUFhLG1CQUFtQjtBQUMxQztBQTlEc0IiLAogICJuYW1lcyI6IFtdCn0K
