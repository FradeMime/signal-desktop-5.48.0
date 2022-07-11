var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var Bytes = __toESM(require("../../Bytes"));
var import_Crypto = require("../../Crypto");
var import_UUID = require("../../types/UUID");
var import_encryptProfileData = require("../../util/encryptProfileData");
describe("encryptProfileData", () => {
  let keyBuffer;
  let conversation;
  beforeEach(() => {
    keyBuffer = (0, import_Crypto.getRandomBytes)(32);
    conversation = {
      aboutEmoji: "\u{1F422}",
      aboutText: "I like turtles",
      familyName: "Kid",
      firstName: "Zombie",
      profileKey: Bytes.toBase64(keyBuffer),
      uuid: import_UUID.UUID.generate().toString(),
      acceptedMessageRequest: true,
      badges: [],
      id: "",
      isMe: true,
      sharedGroupNames: [],
      title: "",
      type: "direct"
    };
  });
  it("encrypts and decrypts properly", async () => {
    const [encrypted] = await (0, import_encryptProfileData.encryptProfileData)(conversation, {
      oldAvatar: void 0,
      newAvatar: void 0
    });
    import_chai.assert.isDefined(encrypted.version);
    import_chai.assert.isDefined(encrypted.name);
    import_chai.assert.isDefined(encrypted.commitment);
    const decryptedProfileNameBytes = (0, import_Crypto.decryptProfileName)(encrypted.name, keyBuffer);
    import_chai.assert.equal(Bytes.toString(decryptedProfileNameBytes.given), conversation.firstName);
    if (decryptedProfileNameBytes.family) {
      import_chai.assert.equal(Bytes.toString(decryptedProfileNameBytes.family), conversation.familyName);
    } else {
      import_chai.assert.isDefined(decryptedProfileNameBytes.family);
    }
    if (encrypted.about) {
      const decryptedAboutBytes = (0, import_Crypto.decryptProfile)(Bytes.fromBase64(encrypted.about), keyBuffer);
      import_chai.assert.equal(Bytes.toString((0, import_Crypto.trimForDisplay)(decryptedAboutBytes)), conversation.aboutText);
    } else {
      import_chai.assert.isDefined(encrypted.about);
    }
    if (encrypted.aboutEmoji) {
      const decryptedAboutEmojiBytes = await (0, import_Crypto.decryptProfile)(Bytes.fromBase64(encrypted.aboutEmoji), keyBuffer);
      import_chai.assert.equal(Bytes.toString((0, import_Crypto.trimForDisplay)(decryptedAboutEmojiBytes)), conversation.aboutEmoji);
    } else {
      import_chai.assert.isDefined(encrypted.aboutEmoji);
    }
  });
  it("sets sameAvatar to true when avatars are the same", async () => {
    const [encrypted] = await (0, import_encryptProfileData.encryptProfileData)(conversation, {
      oldAvatar: new Uint8Array([1, 2, 3]),
      newAvatar: new Uint8Array([1, 2, 3])
    });
    import_chai.assert.isTrue(encrypted.sameAvatar);
  });
  it("sets sameAvatar to false when avatars are different", async () => {
    const [encrypted] = await (0, import_encryptProfileData.encryptProfileData)(conversation, {
      oldAvatar: new Uint8Array([1, 2, 3]),
      newAvatar: new Uint8Array([4, 5, 6, 7])
    });
    import_chai.assert.isFalse(encrypted.sameAvatar);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZW5jcnlwdFByb2ZpbGVEYXRhX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uLy4uL0J5dGVzJztcbmltcG9ydCB7XG4gIHRyaW1Gb3JEaXNwbGF5LFxuICBnZXRSYW5kb21CeXRlcyxcbiAgZGVjcnlwdFByb2ZpbGVOYW1lLFxuICBkZWNyeXB0UHJvZmlsZSxcbn0gZnJvbSAnLi4vLi4vQ3J5cHRvJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgZW5jcnlwdFByb2ZpbGVEYXRhIH0gZnJvbSAnLi4vLi4vdXRpbC9lbmNyeXB0UHJvZmlsZURhdGEnO1xuXG5kZXNjcmliZSgnZW5jcnlwdFByb2ZpbGVEYXRhJywgKCkgPT4ge1xuICBsZXQga2V5QnVmZmVyOiBVaW50OEFycmF5O1xuICBsZXQgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIGtleUJ1ZmZlciA9IGdldFJhbmRvbUJ5dGVzKDMyKTtcbiAgICBjb252ZXJzYXRpb24gPSB7XG4gICAgICBhYm91dEVtb2ppOiAnXHVEODNEXHVEQzIyJyxcbiAgICAgIGFib3V0VGV4dDogJ0kgbGlrZSB0dXJ0bGVzJyxcbiAgICAgIGZhbWlseU5hbWU6ICdLaWQnLFxuICAgICAgZmlyc3ROYW1lOiAnWm9tYmllJyxcbiAgICAgIHByb2ZpbGVLZXk6IEJ5dGVzLnRvQmFzZTY0KGtleUJ1ZmZlciksXG4gICAgICB1dWlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcblxuICAgICAgLy8gVG8gc2F0aXNmeSBUU1xuICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdDogdHJ1ZSxcbiAgICAgIGJhZGdlczogW10sXG4gICAgICBpZDogJycsXG4gICAgICBpc01lOiB0cnVlLFxuICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICB0aXRsZTogJycsXG4gICAgICB0eXBlOiAnZGlyZWN0JyBhcyBjb25zdCxcbiAgICB9O1xuICB9KTtcblxuICBpdCgnZW5jcnlwdHMgYW5kIGRlY3J5cHRzIHByb3Blcmx5JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IFtlbmNyeXB0ZWRdID0gYXdhaXQgZW5jcnlwdFByb2ZpbGVEYXRhKGNvbnZlcnNhdGlvbiwge1xuICAgICAgb2xkQXZhdGFyOiB1bmRlZmluZWQsXG4gICAgICBuZXdBdmF0YXI6IHVuZGVmaW5lZCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5pc0RlZmluZWQoZW5jcnlwdGVkLnZlcnNpb24pO1xuICAgIGFzc2VydC5pc0RlZmluZWQoZW5jcnlwdGVkLm5hbWUpO1xuICAgIGFzc2VydC5pc0RlZmluZWQoZW5jcnlwdGVkLmNvbW1pdG1lbnQpO1xuXG4gICAgY29uc3QgZGVjcnlwdGVkUHJvZmlsZU5hbWVCeXRlcyA9IGRlY3J5cHRQcm9maWxlTmFtZShcbiAgICAgIGVuY3J5cHRlZC5uYW1lLFxuICAgICAga2V5QnVmZmVyXG4gICAgKTtcbiAgICBhc3NlcnQuZXF1YWwoXG4gICAgICBCeXRlcy50b1N0cmluZyhkZWNyeXB0ZWRQcm9maWxlTmFtZUJ5dGVzLmdpdmVuKSxcbiAgICAgIGNvbnZlcnNhdGlvbi5maXJzdE5hbWVcbiAgICApO1xuICAgIGlmIChkZWNyeXB0ZWRQcm9maWxlTmFtZUJ5dGVzLmZhbWlseSkge1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBCeXRlcy50b1N0cmluZyhkZWNyeXB0ZWRQcm9maWxlTmFtZUJ5dGVzLmZhbWlseSksXG4gICAgICAgIGNvbnZlcnNhdGlvbi5mYW1pbHlOYW1lXG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBhc3NlcnQuaXNEZWZpbmVkKGRlY3J5cHRlZFByb2ZpbGVOYW1lQnl0ZXMuZmFtaWx5KTtcbiAgICB9XG5cbiAgICBpZiAoZW5jcnlwdGVkLmFib3V0KSB7XG4gICAgICBjb25zdCBkZWNyeXB0ZWRBYm91dEJ5dGVzID0gZGVjcnlwdFByb2ZpbGUoXG4gICAgICAgIEJ5dGVzLmZyb21CYXNlNjQoZW5jcnlwdGVkLmFib3V0KSxcbiAgICAgICAga2V5QnVmZmVyXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBCeXRlcy50b1N0cmluZyh0cmltRm9yRGlzcGxheShkZWNyeXB0ZWRBYm91dEJ5dGVzKSksXG4gICAgICAgIGNvbnZlcnNhdGlvbi5hYm91dFRleHRcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydC5pc0RlZmluZWQoZW5jcnlwdGVkLmFib3V0KTtcbiAgICB9XG5cbiAgICBpZiAoZW5jcnlwdGVkLmFib3V0RW1vamkpIHtcbiAgICAgIGNvbnN0IGRlY3J5cHRlZEFib3V0RW1vamlCeXRlcyA9IGF3YWl0IGRlY3J5cHRQcm9maWxlKFxuICAgICAgICBCeXRlcy5mcm9tQmFzZTY0KGVuY3J5cHRlZC5hYm91dEVtb2ppKSxcbiAgICAgICAga2V5QnVmZmVyXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmVxdWFsKFxuICAgICAgICBCeXRlcy50b1N0cmluZyh0cmltRm9yRGlzcGxheShkZWNyeXB0ZWRBYm91dEVtb2ppQnl0ZXMpKSxcbiAgICAgICAgY29udmVyc2F0aW9uLmFib3V0RW1vamlcbiAgICAgICk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFzc2VydC5pc0RlZmluZWQoZW5jcnlwdGVkLmFib3V0RW1vamkpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXQoJ3NldHMgc2FtZUF2YXRhciB0byB0cnVlIHdoZW4gYXZhdGFycyBhcmUgdGhlIHNhbWUnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgW2VuY3J5cHRlZF0gPSBhd2FpdCBlbmNyeXB0UHJvZmlsZURhdGEoY29udmVyc2F0aW9uLCB7XG4gICAgICBvbGRBdmF0YXI6IG5ldyBVaW50OEFycmF5KFsxLCAyLCAzXSksXG4gICAgICBuZXdBdmF0YXI6IG5ldyBVaW50OEFycmF5KFsxLCAyLCAzXSksXG4gICAgfSk7XG5cbiAgICBhc3NlcnQuaXNUcnVlKGVuY3J5cHRlZC5zYW1lQXZhdGFyKTtcbiAgfSk7XG5cbiAgaXQoJ3NldHMgc2FtZUF2YXRhciB0byBmYWxzZSB3aGVuIGF2YXRhcnMgYXJlIGRpZmZlcmVudCcsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBbZW5jcnlwdGVkXSA9IGF3YWl0IGVuY3J5cHRQcm9maWxlRGF0YShjb252ZXJzYXRpb24sIHtcbiAgICAgIG9sZEF2YXRhcjogbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKSxcbiAgICAgIG5ld0F2YXRhcjogbmV3IFVpbnQ4QXJyYXkoWzQsIDUsIDYsIDddKSxcbiAgICB9KTtcblxuICAgIGFzc2VydC5pc0ZhbHNlKGVuY3J5cHRlZC5zYW1lQXZhdGFyKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUV2QixZQUF1QjtBQUN2QixvQkFLTztBQUVQLGtCQUFxQjtBQUNyQixnQ0FBbUM7QUFFbkMsU0FBUyxzQkFBc0IsTUFBTTtBQUNuQyxNQUFJO0FBQ0osTUFBSTtBQUVKLGFBQVcsTUFBTTtBQUNmLGdCQUFZLGtDQUFlLEVBQUU7QUFDN0IsbUJBQWU7QUFBQSxNQUNiLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFlBQVk7QUFBQSxNQUNaLFdBQVc7QUFBQSxNQUNYLFlBQVksTUFBTSxTQUFTLFNBQVM7QUFBQSxNQUNwQyxNQUFNLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQUEsTUFHL0Isd0JBQXdCO0FBQUEsTUFDeEIsUUFBUSxDQUFDO0FBQUEsTUFDVCxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixrQkFBa0IsQ0FBQztBQUFBLE1BQ25CLE9BQU87QUFBQSxNQUNQLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxrQ0FBa0MsWUFBWTtBQUMvQyxVQUFNLENBQUMsYUFBYSxNQUFNLGtEQUFtQixjQUFjO0FBQUEsTUFDekQsV0FBVztBQUFBLE1BQ1gsV0FBVztBQUFBLElBQ2IsQ0FBQztBQUVELHVCQUFPLFVBQVUsVUFBVSxPQUFPO0FBQ2xDLHVCQUFPLFVBQVUsVUFBVSxJQUFJO0FBQy9CLHVCQUFPLFVBQVUsVUFBVSxVQUFVO0FBRXJDLFVBQU0sNEJBQTRCLHNDQUNoQyxVQUFVLE1BQ1YsU0FDRjtBQUNBLHVCQUFPLE1BQ0wsTUFBTSxTQUFTLDBCQUEwQixLQUFLLEdBQzlDLGFBQWEsU0FDZjtBQUNBLFFBQUksMEJBQTBCLFFBQVE7QUFDcEMseUJBQU8sTUFDTCxNQUFNLFNBQVMsMEJBQTBCLE1BQU0sR0FDL0MsYUFBYSxVQUNmO0FBQUEsSUFDRixPQUFPO0FBQ0wseUJBQU8sVUFBVSwwQkFBMEIsTUFBTTtBQUFBLElBQ25EO0FBRUEsUUFBSSxVQUFVLE9BQU87QUFDbkIsWUFBTSxzQkFBc0Isa0NBQzFCLE1BQU0sV0FBVyxVQUFVLEtBQUssR0FDaEMsU0FDRjtBQUNBLHlCQUFPLE1BQ0wsTUFBTSxTQUFTLGtDQUFlLG1CQUFtQixDQUFDLEdBQ2xELGFBQWEsU0FDZjtBQUFBLElBQ0YsT0FBTztBQUNMLHlCQUFPLFVBQVUsVUFBVSxLQUFLO0FBQUEsSUFDbEM7QUFFQSxRQUFJLFVBQVUsWUFBWTtBQUN4QixZQUFNLDJCQUEyQixNQUFNLGtDQUNyQyxNQUFNLFdBQVcsVUFBVSxVQUFVLEdBQ3JDLFNBQ0Y7QUFDQSx5QkFBTyxNQUNMLE1BQU0sU0FBUyxrQ0FBZSx3QkFBd0IsQ0FBQyxHQUN2RCxhQUFhLFVBQ2Y7QUFBQSxJQUNGLE9BQU87QUFDTCx5QkFBTyxVQUFVLFVBQVUsVUFBVTtBQUFBLElBQ3ZDO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxxREFBcUQsWUFBWTtBQUNsRSxVQUFNLENBQUMsYUFBYSxNQUFNLGtEQUFtQixjQUFjO0FBQUEsTUFDekQsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsTUFDbkMsV0FBVyxJQUFJLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsSUFDckMsQ0FBQztBQUVELHVCQUFPLE9BQU8sVUFBVSxVQUFVO0FBQUEsRUFDcEMsQ0FBQztBQUVELEtBQUcsdURBQXVELFlBQVk7QUFDcEUsVUFBTSxDQUFDLGFBQWEsTUFBTSxrREFBbUIsY0FBYztBQUFBLE1BQ3pELFdBQVcsSUFBSSxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLE1BQ25DLFdBQVcsSUFBSSxXQUFXLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsSUFDeEMsQ0FBQztBQUVELHVCQUFPLFFBQVEsVUFBVSxVQUFVO0FBQUEsRUFDckMsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
