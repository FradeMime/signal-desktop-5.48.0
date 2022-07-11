var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
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
var Attachment = __toESM(require("../../types/Attachment"));
var MIME = __toESM(require("../../types/MIME"));
var import_protobuf = require("../../protobuf");
var Bytes = __toESM(require("../../Bytes"));
var logger = __toESM(require("../../logging/log"));
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
var import_durations = require("../../util/durations");
describe("Attachment", () => {
  describe("getFileExtension", () => {
    it("should return file extension from content type", () => {
      const input = (0, import_fakeAttachment.fakeAttachment)({
        data: Bytes.fromString("foo"),
        contentType: MIME.IMAGE_GIF
      });
      import_chai.assert.strictEqual(Attachment.getFileExtension(input), "gif");
    });
    it("should return file extension for QuickTime videos", () => {
      const input = (0, import_fakeAttachment.fakeAttachment)({
        data: Bytes.fromString("foo"),
        contentType: MIME.VIDEO_QUICKTIME
      });
      import_chai.assert.strictEqual(Attachment.getFileExtension(input), "mov");
    });
  });
  describe("getSuggestedFilename", () => {
    context("for attachment with filename", () => {
      it("should return existing filename if present", () => {
        const attachment = (0, import_fakeAttachment.fakeAttachment)({
          fileName: "funny-cat.mov",
          data: Bytes.fromString("foo"),
          contentType: MIME.VIDEO_QUICKTIME
        });
        const actual = Attachment.getSuggestedFilename({ attachment });
        const expected = "funny-cat.mov";
        import_chai.assert.strictEqual(actual, expected);
      });
    });
    context("for attachment without filename", () => {
      it("should generate a filename based on timestamp", () => {
        const attachment = (0, import_fakeAttachment.fakeAttachment)({
          data: Bytes.fromString("foo"),
          contentType: MIME.VIDEO_QUICKTIME
        });
        const timestamp = new Date(import_durations.DAY + new Date(import_durations.DAY).getTimezoneOffset() * 60 * 1e3);
        const actual = Attachment.getSuggestedFilename({
          attachment,
          timestamp
        });
        const expected = "signal-1970-01-02-000000.mov";
        import_chai.assert.strictEqual(actual, expected);
      });
    });
    context("for attachment with index", () => {
      it("should generate a filename based on timestamp", () => {
        const attachment = (0, import_fakeAttachment.fakeAttachment)({
          data: Bytes.fromString("foo"),
          contentType: MIME.VIDEO_QUICKTIME
        });
        const timestamp = new Date(import_durations.DAY + new Date(import_durations.DAY).getTimezoneOffset() * 60 * 1e3);
        const actual = Attachment.getSuggestedFilename({
          attachment,
          timestamp,
          index: 3
        });
        const expected = "signal-1970-01-02-000000_003.mov";
        import_chai.assert.strictEqual(actual, expected);
      });
    });
  });
  describe("isVisualMedia", () => {
    it("should return true for images", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "meme.gif",
        data: Bytes.fromString("gif"),
        contentType: MIME.IMAGE_GIF
      });
      import_chai.assert.isTrue(Attachment.isVisualMedia(attachment));
    });
    it("should return true for videos", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "meme.mp4",
        data: Bytes.fromString("mp4"),
        contentType: MIME.VIDEO_MP4
      });
      import_chai.assert.isTrue(Attachment.isVisualMedia(attachment));
    });
    it("should return false for voice message attachment", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "Voice Message.aac",
        flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE,
        data: Bytes.fromString("voice message"),
        contentType: MIME.AUDIO_AAC
      });
      import_chai.assert.isFalse(Attachment.isVisualMedia(attachment));
    });
    it("should return false for other attachments", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "foo.json",
        data: Bytes.fromString('{"foo": "bar"}'),
        contentType: MIME.APPLICATION_JSON
      });
      import_chai.assert.isFalse(Attachment.isVisualMedia(attachment));
    });
  });
  describe("isFile", () => {
    it("should return true for JSON", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "foo.json",
        data: Bytes.fromString('{"foo": "bar"}'),
        contentType: MIME.APPLICATION_JSON
      });
      import_chai.assert.isTrue(Attachment.isFile(attachment));
    });
    it("should return false for images", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "meme.gif",
        data: Bytes.fromString("gif"),
        contentType: MIME.IMAGE_GIF
      });
      import_chai.assert.isFalse(Attachment.isFile(attachment));
    });
    it("should return false for videos", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "meme.mp4",
        data: Bytes.fromString("mp4"),
        contentType: MIME.VIDEO_MP4
      });
      import_chai.assert.isFalse(Attachment.isFile(attachment));
    });
    it("should return false for voice message attachment", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "Voice Message.aac",
        flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE,
        data: Bytes.fromString("voice message"),
        contentType: MIME.AUDIO_AAC
      });
      import_chai.assert.isFalse(Attachment.isFile(attachment));
    });
  });
  describe("isVoiceMessage", () => {
    it("should return true for voice message attachment", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "Voice Message.aac",
        flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE,
        data: Bytes.fromString("voice message"),
        contentType: MIME.AUDIO_AAC
      });
      import_chai.assert.isTrue(Attachment.isVoiceMessage(attachment));
    });
    it("should return true for legacy Android voice message attachment", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        data: Bytes.fromString("voice message"),
        contentType: MIME.AUDIO_MP3
      });
      import_chai.assert.isTrue(Attachment.isVoiceMessage(attachment));
    });
    it("should return false for other attachments", () => {
      const attachment = (0, import_fakeAttachment.fakeAttachment)({
        fileName: "foo.gif",
        data: Bytes.fromString("foo"),
        contentType: MIME.IMAGE_GIF
      });
      import_chai.assert.isFalse(Attachment.isVoiceMessage(attachment));
    });
  });
  describe("replaceUnicodeOrderOverrides", () => {
    it("should sanitize left-to-right order override character", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\u202Dfig.exe",
        size: 1111
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\uFFFDfig.exe",
        size: 1111
      };
      const actual = await Attachment.replaceUnicodeOrderOverrides(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should sanitize right-to-left order override character", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\u202Efig.exe",
        size: 1111
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\uFFFDfig.exe",
        size: 1111
      };
      const actual = await Attachment.replaceUnicodeOrderOverrides(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should sanitize multiple override characters", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\u202E\u202Dlol\u202Efig.exe",
        size: 1111
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "test\uFFFD\uFFFDlol\uFFFDfig.exe",
        size: 1111
      };
      const actual = await Attachment.replaceUnicodeOrderOverrides(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should ignore non-order-override characters", () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "abc",
        size: 1111
      };
      const actual = Attachment._replaceUnicodeOrderOverridesSync(input);
      import_chai.assert.deepEqual(actual, input);
    });
    it("should replace order-override characters", () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "abc\u202D\u202E",
        size: 1111
      };
      const actual = Attachment._replaceUnicodeOrderOverridesSync(input);
      import_chai.assert.deepEqual(actual, {
        contentType: MIME.IMAGE_JPEG,
        fileName: "abc\uFFFD\uFFFD",
        size: 1111
      });
    });
  });
  describe("replaceUnicodeV2", () => {
    it("should remove all bad characters", async () => {
      const input = {
        size: 1111,
        contentType: MIME.IMAGE_JPEG,
        fileName: "file\u202A\u202B\u202C\u202D\u202E\u2066\u2067\u2068\u2069\u200E\u200F\u061C.jpeg"
      };
      const expected = {
        fileName: "file\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD\uFFFD.jpeg",
        contentType: MIME.IMAGE_JPEG,
        size: 1111
      };
      const actual = await Attachment.replaceUnicodeV2(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should should leave normal filename alone", async () => {
      const input = {
        fileName: "normal.jpeg",
        contentType: MIME.IMAGE_JPEG,
        size: 1111
      };
      const expected = {
        fileName: "normal.jpeg",
        contentType: MIME.IMAGE_JPEG,
        size: 1111
      };
      const actual = await Attachment.replaceUnicodeV2(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should handle missing fileName", async () => {
      const input = {
        size: 1111,
        contentType: MIME.IMAGE_JPEG
      };
      const expected = {
        size: 1111,
        contentType: MIME.IMAGE_JPEG
      };
      const actual = await Attachment.replaceUnicodeV2(input);
      import_chai.assert.deepEqual(actual, expected);
    });
  });
  describe("removeSchemaVersion", () => {
    it("should remove existing schema version", () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "foo.jpg",
        size: 1111,
        schemaVersion: 1
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "foo.jpg",
        size: 1111
      };
      const actual = Attachment.removeSchemaVersion({
        attachment: input,
        logger
      });
      import_chai.assert.deepEqual(actual, expected);
    });
  });
  describe("migrateDataToFileSystem", () => {
    it("should write data to disk and store relative path to it", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        data: Bytes.fromString("Above us only sky"),
        fileName: "foo.jpg",
        size: 1111
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        path: "abc/abcdefgh123456789",
        fileName: "foo.jpg",
        size: 1111
      };
      const expectedAttachmentData = Bytes.fromString("Above us only sky");
      const writeNewAttachmentData = /* @__PURE__ */ __name(async (attachmentData) => {
        import_chai.assert.deepEqual(attachmentData, expectedAttachmentData);
        return "abc/abcdefgh123456789";
      }, "writeNewAttachmentData");
      const actual = await Attachment.migrateDataToFileSystem(input, {
        writeNewAttachmentData
      });
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should skip over (invalid) attachments without data", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "foo.jpg",
        size: 1111
      };
      const expected = {
        contentType: MIME.IMAGE_JPEG,
        fileName: "foo.jpg",
        size: 1111
      };
      const writeNewAttachmentData = /* @__PURE__ */ __name(async () => "abc/abcdefgh123456789", "writeNewAttachmentData");
      const actual = await Attachment.migrateDataToFileSystem(input, {
        writeNewAttachmentData
      });
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should throw error if data is not valid", async () => {
      const input = {
        contentType: MIME.IMAGE_JPEG,
        data: 123,
        fileName: "foo.jpg",
        size: 1111
      };
      const writeNewAttachmentData = /* @__PURE__ */ __name(async () => "abc/abcdefgh123456789", "writeNewAttachmentData");
      await import_chai.assert.isRejected(Attachment.migrateDataToFileSystem(input, {
        writeNewAttachmentData
      }), "Expected `attachment.data` to be a typed array; got: number");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXR0YWNobWVudF90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCAqIGFzIEF0dGFjaG1lbnQgZnJvbSAnLi4vLi4vdHlwZXMvQXR0YWNobWVudCc7XG5pbXBvcnQgKiBhcyBNSU1FIGZyb20gJy4uLy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCAqIGFzIEJ5dGVzIGZyb20gJy4uLy4uL0J5dGVzJztcbmltcG9ydCAqIGFzIGxvZ2dlciBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5cbmltcG9ydCB7IGZha2VBdHRhY2htZW50IH0gZnJvbSAnLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUF0dGFjaG1lbnQnO1xuaW1wb3J0IHsgREFZIH0gZnJvbSAnLi4vLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5kZXNjcmliZSgnQXR0YWNobWVudCcsICgpID0+IHtcbiAgZGVzY3JpYmUoJ2dldEZpbGVFeHRlbnNpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmlsZSBleHRlbnNpb24gZnJvbSBjb250ZW50IHR5cGUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dDogQXR0YWNobWVudC5BdHRhY2htZW50VHlwZSA9IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnZm9vJyksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0dJRixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKEF0dGFjaG1lbnQuZ2V0RmlsZUV4dGVuc2lvbihpbnB1dCksICdnaWYnKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZpbGUgZXh0ZW5zaW9uIGZvciBRdWlja1RpbWUgdmlkZW9zJywgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ2ZvbycpLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5WSURFT19RVUlDS1RJTUUsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChBdHRhY2htZW50LmdldEZpbGVFeHRlbnNpb24oaW5wdXQpLCAnbW92Jyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRTdWdnZXN0ZWRGaWxlbmFtZScsICgpID0+IHtcbiAgICBjb250ZXh0KCdmb3IgYXR0YWNobWVudCB3aXRoIGZpbGVuYW1lJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCByZXR1cm4gZXhpc3RpbmcgZmlsZW5hbWUgaWYgcHJlc2VudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXR0YWNobWVudDogQXR0YWNobWVudC5BdHRhY2htZW50VHlwZSA9IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICBmaWxlTmFtZTogJ2Z1bm55LWNhdC5tb3YnLFxuICAgICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ2ZvbycpLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLlZJREVPX1FVSUNLVElNRSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IEF0dGFjaG1lbnQuZ2V0U3VnZ2VzdGVkRmlsZW5hbWUoeyBhdHRhY2htZW50IH0pO1xuICAgICAgICBjb25zdCBleHBlY3RlZCA9ICdmdW5ueS1jYXQubW92JztcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gICAgY29udGV4dCgnZm9yIGF0dGFjaG1lbnQgd2l0aG91dCBmaWxlbmFtZScsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgZ2VuZXJhdGUgYSBmaWxlbmFtZSBiYXNlZCBvbiB0aW1lc3RhbXAnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnZm9vJyksXG4gICAgICAgICAgY29udGVudFR5cGU6IE1JTUUuVklERU9fUVVJQ0tUSU1FLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoXG4gICAgICAgICAgREFZICsgbmV3IERhdGUoREFZKS5nZXRUaW1lem9uZU9mZnNldCgpICogNjAgKiAxMDAwXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IEF0dGFjaG1lbnQuZ2V0U3VnZ2VzdGVkRmlsZW5hbWUoe1xuICAgICAgICAgIGF0dGFjaG1lbnQsXG4gICAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnc2lnbmFsLTE5NzAtMDEtMDItMDAwMDAwLm1vdic7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICAgIGNvbnRleHQoJ2ZvciBhdHRhY2htZW50IHdpdGggaW5kZXgnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIGdlbmVyYXRlIGEgZmlsZW5hbWUgYmFzZWQgb24gdGltZXN0YW1wJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhdHRhY2htZW50OiBBdHRhY2htZW50LkF0dGFjaG1lbnRUeXBlID0gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ2ZvbycpLFxuICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLlZJREVPX1FVSUNLVElNRSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IG5ldyBEYXRlKFxuICAgICAgICAgIERBWSArIG5ldyBEYXRlKERBWSkuZ2V0VGltZXpvbmVPZmZzZXQoKSAqIDYwICogMTAwMFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSBBdHRhY2htZW50LmdldFN1Z2dlc3RlZEZpbGVuYW1lKHtcbiAgICAgICAgICBhdHRhY2htZW50LFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICBpbmRleDogMyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkID0gJ3NpZ25hbC0xOTcwLTAxLTAyLTAwMDAwMF8wMDMubW92JztcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1Zpc3VhbE1lZGlhJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgcmV0dXJuIHRydWUgZm9yIGltYWdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGZpbGVOYW1lOiAnbWVtZS5naWYnLFxuICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCdnaWYnKSxcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfR0lGLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKEF0dGFjaG1lbnQuaXNWaXN1YWxNZWRpYShhdHRhY2htZW50KSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciB2aWRlb3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhdHRhY2htZW50OiBBdHRhY2htZW50LkF0dGFjaG1lbnRUeXBlID0gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBmaWxlTmFtZTogJ21lbWUubXA0JyxcbiAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnbXA0JyksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLlZJREVPX01QNCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShBdHRhY2htZW50LmlzVmlzdWFsTWVkaWEoYXR0YWNobWVudCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIHZvaWNlIG1lc3NhZ2UgYXR0YWNobWVudCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGZpbGVOYW1lOiAnVm9pY2UgTWVzc2FnZS5hYWMnLFxuICAgICAgICBmbGFnczogU2lnbmFsU2VydmljZS5BdHRhY2htZW50UG9pbnRlci5GbGFncy5WT0lDRV9NRVNTQUdFLFxuICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCd2b2ljZSBtZXNzYWdlJyksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLkFVRElPX0FBQyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoQXR0YWNobWVudC5pc1Zpc3VhbE1lZGlhKGF0dGFjaG1lbnQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBvdGhlciBhdHRhY2htZW50cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGZpbGVOYW1lOiAnZm9vLmpzb24nLFxuICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCd7XCJmb29cIjogXCJiYXJcIn0nKSxcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuQVBQTElDQVRJT05fSlNPTixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoQXR0YWNobWVudC5pc1Zpc3VhbE1lZGlhKGF0dGFjaG1lbnQpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRmlsZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBKU09OJywgKCkgPT4ge1xuICAgICAgY29uc3QgYXR0YWNobWVudDogQXR0YWNobWVudC5BdHRhY2htZW50VHlwZSA9IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgZmlsZU5hbWU6ICdmb28uanNvbicsXG4gICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ3tcImZvb1wiOiBcImJhclwifScpLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5BUFBMSUNBVElPTl9KU09OLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKEF0dGFjaG1lbnQuaXNGaWxlKGF0dGFjaG1lbnQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBpbWFnZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhdHRhY2htZW50OiBBdHRhY2htZW50LkF0dGFjaG1lbnRUeXBlID0gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBmaWxlTmFtZTogJ21lbWUuZ2lmJyxcbiAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnZ2lmJyksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0dJRixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoQXR0YWNobWVudC5pc0ZpbGUoYXR0YWNobWVudCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gZmFsc2UgZm9yIHZpZGVvcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGZpbGVOYW1lOiAnbWVtZS5tcDQnLFxuICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCdtcDQnKSxcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuVklERU9fTVA0LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShBdHRhY2htZW50LmlzRmlsZShhdHRhY2htZW50KSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiBmYWxzZSBmb3Igdm9pY2UgbWVzc2FnZSBhdHRhY2htZW50JywgKCkgPT4ge1xuICAgICAgY29uc3QgYXR0YWNobWVudDogQXR0YWNobWVudC5BdHRhY2htZW50VHlwZSA9IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgZmlsZU5hbWU6ICdWb2ljZSBNZXNzYWdlLmFhYycsXG4gICAgICAgIGZsYWdzOiBTaWduYWxTZXJ2aWNlLkF0dGFjaG1lbnRQb2ludGVyLkZsYWdzLlZPSUNFX01FU1NBR0UsXG4gICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ3ZvaWNlIG1lc3NhZ2UnKSxcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuQVVESU9fQUFDLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShBdHRhY2htZW50LmlzRmlsZShhdHRhY2htZW50KSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1ZvaWNlTWVzc2FnZScsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciB2b2ljZSBtZXNzYWdlIGF0dGFjaG1lbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhdHRhY2htZW50OiBBdHRhY2htZW50LkF0dGFjaG1lbnRUeXBlID0gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBmaWxlTmFtZTogJ1ZvaWNlIE1lc3NhZ2UuYWFjJyxcbiAgICAgICAgZmxhZ3M6IFNpZ25hbFNlcnZpY2UuQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuVk9JQ0VfTUVTU0FHRSxcbiAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygndm9pY2UgbWVzc2FnZScpLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5BVURJT19BQUMsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5pc1RydWUoQXR0YWNobWVudC5pc1ZvaWNlTWVzc2FnZShhdHRhY2htZW50KSk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJldHVybiB0cnVlIGZvciBsZWdhY3kgQW5kcm9pZCB2b2ljZSBtZXNzYWdlIGF0dGFjaG1lbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhdHRhY2htZW50OiBBdHRhY2htZW50LkF0dGFjaG1lbnRUeXBlID0gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCd2b2ljZSBtZXNzYWdlJyksXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLkFVRElPX01QMyxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShBdHRhY2htZW50LmlzVm9pY2VNZXNzYWdlKGF0dGFjaG1lbnQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIGZhbHNlIGZvciBvdGhlciBhdHRhY2htZW50cycsICgpID0+IHtcbiAgICAgIGNvbnN0IGF0dGFjaG1lbnQ6IEF0dGFjaG1lbnQuQXR0YWNobWVudFR5cGUgPSBmYWtlQXR0YWNobWVudCh7XG4gICAgICAgIGZpbGVOYW1lOiAnZm9vLmdpZicsXG4gICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ2ZvbycpLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9HSUYsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKEF0dGFjaG1lbnQuaXNWb2ljZU1lc3NhZ2UoYXR0YWNobWVudCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVwbGFjZVVuaWNvZGVPcmRlck92ZXJyaWRlcycsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHNhbml0aXplIGxlZnQtdG8tcmlnaHQgb3JkZXIgb3ZlcnJpZGUgY2hhcmFjdGVyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGVzdFxcdTIwMkRmaWcuZXhlJyxcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0ZXN0XFx1RkZGRGZpZy5leGUnLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgQXR0YWNobWVudC5yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNhbml0aXplIHJpZ2h0LXRvLWxlZnQgb3JkZXIgb3ZlcnJpZGUgY2hhcmFjdGVyJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGVzdFxcdTIwMkVmaWcuZXhlJyxcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0ZXN0XFx1RkZGRGZpZy5leGUnLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgQXR0YWNobWVudC5yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNhbml0aXplIG11bHRpcGxlIG92ZXJyaWRlIGNoYXJhY3RlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICd0ZXN0XFx1MjAyZVxcdTIwMmRsb2xcXHUyMDJlZmlnLmV4ZScsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIGZpbGVOYW1lOiAndGVzdFxcdUZGRkRcXHVGRkZEbG9sXFx1RkZGRGZpZy5leGUnLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgQXR0YWNobWVudC5yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGlnbm9yZSBub24tb3JkZXItb3ZlcnJpZGUgY2hhcmFjdGVycycsICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0ge1xuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ2FiYycsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBBdHRhY2htZW50Ll9yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzU3luYyhpbnB1dCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgaW5wdXQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXBsYWNlIG9yZGVyLW92ZXJyaWRlIGNoYXJhY3RlcnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICdhYmNcXHUyMDJEXFx1MjAyRScsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBBdHRhY2htZW50Ll9yZXBsYWNlVW5pY29kZU9yZGVyT3ZlcnJpZGVzU3luYyhpbnB1dCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwge1xuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ2FiY1xcdUZGRkRcXHVGRkZEJyxcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgncmVwbGFjZVVuaWNvZGVWMicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlbW92ZSBhbGwgYmFkIGNoYXJhY3RlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6XG4gICAgICAgICAgJ2ZpbGVcXHUyMDJBXFx1MjAyQlxcdTIwMkNcXHUyMDJEXFx1MjAyRVxcdTIwNjZcXHUyMDY3XFx1MjA2OFxcdTIwNjlcXHUyMDBFXFx1MjAwRlxcdTA2MUMuanBlZycsXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIGZpbGVOYW1lOlxuICAgICAgICAgICdmaWxlXFx1RkZGRFxcdUZGRkRcXHVGRkZEXFx1RkZGRFxcdUZGRkRcXHVGRkZEXFx1RkZGRFxcdUZGRkRcXHVGRkZEXFx1RkZGRFxcdUZGRkRcXHVGRkZELmpwZWcnLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgQXR0YWNobWVudC5yZXBsYWNlVW5pY29kZVYyKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNob3VsZCBsZWF2ZSBub3JtYWwgZmlsZW5hbWUgYWxvbmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgZmlsZU5hbWU6ICdub3JtYWwuanBlZycsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIGZpbGVOYW1lOiAnbm9ybWFsLmpwZWcnLFxuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgQXR0YWNobWVudC5yZXBsYWNlVW5pY29kZVYyKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGhhbmRsZSBtaXNzaW5nIGZpbGVOYW1lJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBBdHRhY2htZW50LnJlcGxhY2VVbmljb2RlVjIoaW5wdXQpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3JlbW92ZVNjaGVtYVZlcnNpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCByZW1vdmUgZXhpc3Rpbmcgc2NoZW1hIHZlcnNpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICdmb28uanBnJyxcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogMSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ2Zvby5qcGcnLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gQXR0YWNobWVudC5yZW1vdmVTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgYXR0YWNobWVudDogaW5wdXQsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ21pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgd3JpdGUgZGF0YSB0byBkaXNrIGFuZCBzdG9yZSByZWxhdGl2ZSBwYXRoIHRvIGl0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ0Fib3ZlIHVzIG9ubHkgc2t5JyksXG4gICAgICAgIGZpbGVOYW1lOiAnZm9vLmpwZycsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgcGF0aDogJ2FiYy9hYmNkZWZnaDEyMzQ1Njc4OScsXG4gICAgICAgIGZpbGVOYW1lOiAnZm9vLmpwZycsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCBleHBlY3RlZEF0dGFjaG1lbnREYXRhID0gQnl0ZXMuZnJvbVN0cmluZygnQWJvdmUgdXMgb25seSBza3knKTtcbiAgICAgIGNvbnN0IHdyaXRlTmV3QXR0YWNobWVudERhdGEgPSBhc3luYyAoYXR0YWNobWVudERhdGE6IFVpbnQ4QXJyYXkpID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhdHRhY2htZW50RGF0YSwgZXhwZWN0ZWRBdHRhY2htZW50RGF0YSk7XG4gICAgICAgIHJldHVybiAnYWJjL2FiY2RlZmdoMTIzNDU2Nzg5JztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IEF0dGFjaG1lbnQubWlncmF0ZURhdGFUb0ZpbGVTeXN0ZW0oaW5wdXQsIHtcbiAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgc2tpcCBvdmVyIChpbnZhbGlkKSBhdHRhY2htZW50cyB3aXRob3V0IGRhdGEnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IHtcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfSlBFRyxcbiAgICAgICAgZmlsZU5hbWU6ICdmb28uanBnJyxcbiAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICBmaWxlTmFtZTogJ2Zvby5qcGcnLFxuICAgICAgICBzaXplOiAxMTExLFxuICAgICAgfTtcblxuICAgICAgY29uc3Qgd3JpdGVOZXdBdHRhY2htZW50RGF0YSA9IGFzeW5jICgpID0+ICdhYmMvYWJjZGVmZ2gxMjM0NTY3ODknO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBBdHRhY2htZW50Lm1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKGlucHV0LCB7XG4gICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHRocm93IGVycm9yIGlmIGRhdGEgaXMgbm90IHZhbGlkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSB7XG4gICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIGRhdGE6IDEyMyBhcyBhbnksXG4gICAgICAgIGZpbGVOYW1lOiAnZm9vLmpwZycsXG4gICAgICAgIHNpemU6IDExMTEsXG4gICAgICB9O1xuXG4gICAgICBjb25zdCB3cml0ZU5ld0F0dGFjaG1lbnREYXRhID0gYXN5bmMgKCkgPT4gJ2FiYy9hYmNkZWZnaDEyMzQ1Njc4OSc7XG5cbiAgICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgICBBdHRhY2htZW50Lm1pZ3JhdGVEYXRhVG9GaWxlU3lzdGVtKGlucHV0LCB7XG4gICAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgICAgfSksXG4gICAgICAgICdFeHBlY3RlZCBgYXR0YWNobWVudC5kYXRhYCB0byBiZSBhIHR5cGVkIGFycmF5OyBnb3Q6IG51bWJlcidcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLGlCQUE0QjtB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
