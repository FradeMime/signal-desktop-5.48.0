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
var sinon = __toESM(require("sinon"));
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_MessageSendState = require("../../messages/MessageSendState");
var import_SendMessage = __toESM(require("../../textsecure/SendMessage"));
var import_UUID = require("../../types/UUID");
var import_protobuf = require("../../protobuf");
var import_helpers = require("../../messages/helpers");
describe("Message", () => {
  const STORAGE_KEYS_TO_RESTORE = [
    "number_id",
    "uuid_id"
  ];
  const oldStorageValues = /* @__PURE__ */ new Map();
  const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
  const attributes = {
    type: "outgoing",
    body: "hi",
    conversationId: "foo",
    attachments: [],
    received_at: new Date().getTime()
  };
  const source = "+1 415-555-5555";
  const me = "+14155555556";
  const ourUuid = import_UUID.UUID.generate().toString();
  function createMessage(attrs) {
    const messages = new window.Whisper.MessageCollection();
    return messages.add({
      received_at: Date.now(),
      ...attrs
    });
  }
  before(async () => {
    window.ConversationController.reset();
    await window.ConversationController.load();
    STORAGE_KEYS_TO_RESTORE.forEach((key) => {
      oldStorageValues.set(key, window.textsecure.storage.get(key));
    });
    window.textsecure.storage.put("number_id", `${me}.2`);
    window.textsecure.storage.put("uuid_id", `${ourUuid}.2`);
  });
  after(async () => {
    await window.Signal.Data.removeAll();
    await window.storage.fetch();
    oldStorageValues.forEach((oldValue, key) => {
      if (oldValue) {
        window.textsecure.storage.put(key, oldValue);
      } else {
        window.textsecure.storage.remove(key);
      }
    });
  });
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.sandbox = sinon.createSandbox();
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  describe("send", () => {
    let oldMessageSender;
    beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
      oldMessageSender = window.textsecure.messaging;
      window.textsecure.messaging = oldMessageSender ?? new import_SendMessage.default({});
      this.sandbox.stub(window.textsecure.messaging, "sendSyncMessage").resolves({});
    }, "beforeEach"));
    afterEach(() => {
      if (oldMessageSender) {
        window.textsecure.messaging = oldMessageSender;
      } else {
        delete window.textsecure.messaging;
      }
    });
    it("updates `sendStateByConversationId`", async function test() {
      this.sandbox.useFakeTimers(1234);
      const ourConversationId = window.ConversationController.getOurConversationIdOrThrow();
      const conversation1 = await window.ConversationController.getOrCreateAndWait("a072df1d-7cee-43e2-9e6b-109710a2131c", "private");
      const conversation2 = await window.ConversationController.getOrCreateAndWait("62bd8ef1-68da-4cfd-ac1f-3ea85db7473e", "private");
      const message = createMessage({
        type: "outgoing",
        conversationId: (await window.ConversationController.getOrCreateAndWait("71cc190f-97ba-4c61-9d41-0b9444d721f9", "group")).id,
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: 123
          },
          [conversation1.id]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: 123
          },
          [conversation2.id]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: 456
          }
        }
      });
      const fakeDataMessage = new Uint8Array(0);
      const conversation1Uuid = conversation1.get("uuid");
      const ignoredUuid = import_UUID.UUID.generate().toString();
      if (!conversation1Uuid) {
        throw new Error("Test setup failed: conversation1 should have a UUID");
      }
      const promise = Promise.resolve({
        successfulIdentifiers: [conversation1Uuid, ignoredUuid],
        errors: [
          Object.assign(new Error("failed"), {
            identifier: conversation2.get("uuid")
          })
        ],
        dataMessage: fakeDataMessage
      });
      await message.send(promise);
      const result = message.get("sendStateByConversationId") || {};
      import_chai.assert.hasAllKeys(result, [
        ourConversationId,
        conversation1.id,
        conversation2.id
      ]);
      import_chai.assert.strictEqual(result[ourConversationId]?.status, import_MessageSendState.SendStatus.Sent);
      import_chai.assert.strictEqual(result[ourConversationId]?.updatedAt, 1234);
      import_chai.assert.strictEqual(result[conversation1.id]?.status, import_MessageSendState.SendStatus.Sent);
      import_chai.assert.strictEqual(result[conversation1.id]?.updatedAt, 1234);
      import_chai.assert.strictEqual(result[conversation2.id]?.status, import_MessageSendState.SendStatus.Failed);
      import_chai.assert.strictEqual(result[conversation2.id]?.updatedAt, 1234);
    });
    it("saves errors from promise rejections with errors", async () => {
      const message = createMessage({ type: "outgoing", source });
      const promise = Promise.reject(new Error("foo bar"));
      await message.send(promise);
      const errors = message.get("errors") || [];
      import_chai.assert.lengthOf(errors, 1);
      import_chai.assert.strictEqual(errors[0].message, "foo bar");
    });
    it("saves errors from promise rejections with objects", async () => {
      const message = createMessage({ type: "outgoing", source });
      const result = {
        errors: [new Error("baz qux")]
      };
      const promise = Promise.reject(result);
      await message.send(promise);
      const errors = message.get("errors") || [];
      import_chai.assert.lengthOf(errors, 1);
      import_chai.assert.strictEqual(errors[0].message, "baz qux");
    });
  });
  describe("getContact", () => {
    it("gets outgoing contact", () => {
      const messages = new window.Whisper.MessageCollection();
      const message = messages.add(attributes);
      import_chai.assert.exists((0, import_helpers.getContact)(message.attributes));
    });
    it("gets incoming contact", () => {
      const messages = new window.Whisper.MessageCollection();
      const message = messages.add({
        type: "incoming",
        source
      });
      import_chai.assert.exists((0, import_helpers.getContact)(message.attributes));
    });
  });
  describe("getNotificationData", () => {
    it("handles unsupported messages", () => {
      import_chai.assert.deepEqual(createMessage({
        supportedVersionAtReceive: 0,
        requiredProtocolVersion: Infinity
      }).getNotificationData(), { text: "Unsupported message" });
    });
    it("handles erased tap-to-view messages", () => {
      import_chai.assert.deepEqual(createMessage({
        isViewOnce: true,
        isErased: true
      }).getNotificationData(), { text: "View-once Media" });
    });
    it("handles tap-to-view photos", () => {
      import_chai.assert.deepEqual(createMessage({
        isViewOnce: true,
        isErased: false,
        attachments: [
          {
            contentType: "image/png"
          }
        ]
      }).getNotificationData(), { text: "View-once Photo", emoji: "\u{1F4F7}" });
    });
    it("handles tap-to-view videos", () => {
      import_chai.assert.deepEqual(createMessage({
        isViewOnce: true,
        isErased: false,
        attachments: [
          {
            contentType: "video/mp4"
          }
        ]
      }).getNotificationData(), { text: "View-once Video", emoji: "\u{1F3A5}" });
    });
    it("handles non-media tap-to-view file types", () => {
      import_chai.assert.deepEqual(createMessage({
        isViewOnce: true,
        isErased: false,
        attachments: [
          {
            contentType: "text/plain"
          }
        ]
      }).getNotificationData(), { text: "Media Message", emoji: "\u{1F4CE}" });
    });
    it("handles group updates where you left the group", () => {
      import_chai.assert.deepEqual(createMessage({
        group_update: {
          left: "You"
        }
      }).getNotificationData(), { text: "You are no longer a member of the group." });
    });
    it("handles group updates where someone left the group", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: {
          left: "Alice"
        }
      }).getNotificationData(), { text: "Alice left the group." });
    });
    it("handles empty group updates with a generic message", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source: "Alice",
        group_update: {}
      }).getNotificationData(), { text: "Alice updated the group." });
    });
    it("handles group name updates by you", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source: me,
        group_update: { name: "blerg" }
      }).getNotificationData(), {
        text: "You updated the group. Group name is now 'blerg'."
      });
    });
    it("handles group name updates by someone else", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { name: "blerg" }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Group name is now 'blerg'."
      });
    });
    it("handles group avatar updates", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { avatarUpdated: true }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Group avatar was updated."
      });
    });
    it("handles you joining the group", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { joined: [me] }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. You joined the group."
      });
    });
    it("handles someone else joining the group", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { joined: ["Bob"] }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Bob joined the group."
      });
    });
    it("handles multiple people joining the group", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { joined: ["Bob", "Alice", "Eve"] }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Bob, Alice, Eve joined the group."
      });
    });
    it("handles multiple people joining the group, including you", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { joined: ["Bob", me, "Alice", "Eve"] }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Bob, Alice, Eve joined the group. You joined the group."
      });
    });
    it("handles multiple changes to group properties", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        group_update: { joined: ["Bob"], name: "blerg" }
      }).getNotificationData(), {
        text: "+1 415-555-5555 updated the group. Bob joined the group. Group name is now 'blerg'."
      });
    });
    it("handles a session ending", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        flags: true
      }).getNotificationData(), { text: i18n("sessionEnded") });
    });
    it("handles incoming message errors", () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        errors: [{}]
      }).getNotificationData(), { text: i18n("incomingError") });
    });
    const attachmentTestCases = [
      {
        title: "GIF",
        attachment: {
          contentType: "image/gif"
        },
        expectedText: "GIF",
        expectedEmoji: "\u{1F3A1}"
      },
      {
        title: "photo",
        attachment: {
          contentType: "image/png"
        },
        expectedText: "Photo",
        expectedEmoji: "\u{1F4F7}"
      },
      {
        title: "video",
        attachment: {
          contentType: "video/mp4"
        },
        expectedText: "Video",
        expectedEmoji: "\u{1F3A5}"
      },
      {
        title: "voice message",
        attachment: {
          contentType: "audio/ogg",
          flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE
        },
        expectedText: "Voice Message",
        expectedEmoji: "\u{1F3A4}"
      },
      {
        title: "audio message",
        attachment: {
          contentType: "audio/ogg",
          fileName: "audio.ogg"
        },
        expectedText: "Audio Message",
        expectedEmoji: "\u{1F508}"
      },
      {
        title: "plain text",
        attachment: {
          contentType: "text/plain"
        },
        expectedText: "File",
        expectedEmoji: "\u{1F4CE}"
      },
      {
        title: "unspecified-type",
        attachment: {
          contentType: null
        },
        expectedText: "File",
        expectedEmoji: "\u{1F4CE}"
      }
    ];
    attachmentTestCases.forEach(({ title, attachment, expectedText, expectedEmoji }) => {
      it(`handles single ${title} attachments`, () => {
        import_chai.assert.deepEqual(createMessage({
          type: "incoming",
          source,
          attachments: [attachment]
        }).getNotificationData(), { text: expectedText, emoji: expectedEmoji });
      });
      it(`handles multiple attachments where the first is a ${title}`, () => {
        import_chai.assert.deepEqual(createMessage({
          type: "incoming",
          source,
          attachments: [
            attachment,
            {
              contentType: "text/html"
            }
          ]
        }).getNotificationData(), { text: expectedText, emoji: expectedEmoji });
      });
      it(`respects the caption for ${title} attachments`, () => {
        import_chai.assert.deepEqual(createMessage({
          type: "incoming",
          source,
          attachments: [attachment],
          body: "hello world"
        }).getNotificationData(), { text: "hello world", emoji: expectedEmoji });
      });
    });
    it('handles a "plain" message', () => {
      import_chai.assert.deepEqual(createMessage({
        type: "incoming",
        source,
        body: "hello world"
      }).getNotificationData(), { text: "hello world" });
    });
  });
  describe("getNotificationText", () => {
    it("returns a notification's text", () => {
      import_chai.assert.strictEqual(createMessage({
        type: "incoming",
        source,
        body: "hello world"
      }).getNotificationText(), "hello world");
    });
    it("shows a notification's emoji on non-Linux", function test() {
      this.sandbox.replace(window.Signal, "OS", {
        ...window.Signal.OS,
        isLinux() {
          return false;
        }
      });
      import_chai.assert.strictEqual(createMessage({
        type: "incoming",
        source,
        attachments: [
          {
            contentType: "image/png"
          }
        ]
      }).getNotificationText(), "\u{1F4F7} Photo");
    });
    it("hides emoji on Linux", function test() {
      this.sandbox.replace(window.Signal, "OS", {
        ...window.Signal.OS,
        isLinux() {
          return true;
        }
      });
      import_chai.assert.strictEqual(createMessage({
        type: "incoming",
        source,
        attachments: [
          {
            contentType: "image/png"
          }
        ]
      }).getNotificationText(), "Photo");
    });
  });
});
describe("MessageCollection", () => {
  it("should be ordered oldest to newest", () => {
    const messages = new window.Whisper.MessageCollection();
    const today = Date.now();
    const tomorrow = today + 12345;
    messages.add({ received_at: today });
    messages.add({ received_at: tomorrow });
    const { models } = messages;
    const firstTimestamp = models[0].get("received_at");
    const secondTimestamp = models[1].get("received_at");
    (0, import_chai.assert)(typeof firstTimestamp === "number");
    (0, import_chai.assert)(typeof secondTimestamp === "number");
    (0, import_chai.assert)(firstTimestamp < secondTimestamp);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBTZW5kU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQgTWVzc2FnZVNlbmRlciBmcm9tICcuLi8uLi90ZXh0c2VjdXJlL1NlbmRNZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgV2ViQVBJVHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvV2ViQVBJJztcbmltcG9ydCB0eXBlIHsgQ2FsbGJhY2tSZXN1bHRUeXBlIH0gZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCB0eXBlIHsgU3RvcmFnZUFjY2Vzc1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9TdG9yYWdlLmQnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uLy4uL3Byb3RvYnVmJztcbmltcG9ydCB7IGdldENvbnRhY3QgfSBmcm9tICcuLi8uLi9tZXNzYWdlcy9oZWxwZXJzJztcblxuZGVzY3JpYmUoJ01lc3NhZ2UnLCAoKSA9PiB7XG4gIGNvbnN0IFNUT1JBR0VfS0VZU19UT19SRVNUT1JFOiBBcnJheTxrZXlvZiBTdG9yYWdlQWNjZXNzVHlwZT4gPSBbXG4gICAgJ251bWJlcl9pZCcsXG4gICAgJ3V1aWRfaWQnLFxuICBdO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBjb25zdCBvbGRTdG9yYWdlVmFsdWVzID0gbmV3IE1hcDxrZXlvZiBTdG9yYWdlQWNjZXNzVHlwZSwgYW55PigpO1xuXG4gIGNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbiAgY29uc3QgYXR0cmlidXRlcyA9IHtcbiAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgIGJvZHk6ICdoaScsXG4gICAgY29udmVyc2F0aW9uSWQ6ICdmb28nLFxuICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICByZWNlaXZlZF9hdDogbmV3IERhdGUoKS5nZXRUaW1lKCksXG4gIH07XG5cbiAgY29uc3Qgc291cmNlID0gJysxIDQxNS01NTUtNTU1NSc7XG4gIGNvbnN0IG1lID0gJysxNDE1NTU1NTU1Nic7XG4gIGNvbnN0IG91clV1aWQgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcblxuICBmdW5jdGlvbiBjcmVhdGVNZXNzYWdlKGF0dHJzOiB7IFtrZXk6IHN0cmluZ106IHVua25vd24gfSkge1xuICAgIGNvbnN0IG1lc3NhZ2VzID0gbmV3IHdpbmRvdy5XaGlzcGVyLk1lc3NhZ2VDb2xsZWN0aW9uKCk7XG4gICAgcmV0dXJuIG1lc3NhZ2VzLmFkZCh7XG4gICAgICByZWNlaXZlZF9hdDogRGF0ZS5ub3coKSxcbiAgICAgIC4uLmF0dHJzLFxuICAgIH0pO1xuICB9XG5cbiAgYmVmb3JlKGFzeW5jICgpID0+IHtcbiAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5yZXNldCgpO1xuICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmxvYWQoKTtcblxuICAgIFNUT1JBR0VfS0VZU19UT19SRVNUT1JFLmZvckVhY2goa2V5ID0+IHtcbiAgICAgIG9sZFN0b3JhZ2VWYWx1ZXMuc2V0KGtleSwgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5nZXQoa2V5KSk7XG4gICAgfSk7XG4gICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wdXQoJ251bWJlcl9pZCcsIGAke21lfS4yYCk7XG4gICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5wdXQoJ3V1aWRfaWQnLCBgJHtvdXJVdWlkfS4yYCk7XG4gIH0pO1xuXG4gIGFmdGVyKGFzeW5jICgpID0+IHtcbiAgICBhd2FpdCB3aW5kb3cuU2lnbmFsLkRhdGEucmVtb3ZlQWxsKCk7XG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UuZmV0Y2goKTtcblxuICAgIG9sZFN0b3JhZ2VWYWx1ZXMuZm9yRWFjaCgob2xkVmFsdWUsIGtleSkgPT4ge1xuICAgICAgaWYgKG9sZFZhbHVlKSB7XG4gICAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHV0KGtleSwgb2xkVmFsdWUpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUuc3RvcmFnZS5yZW1vdmUoa2V5KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG5cbiAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgIHRoaXMuc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKGZ1bmN0aW9uIGFmdGVyRWFjaCgpIHtcbiAgICB0aGlzLnNhbmRib3gucmVzdG9yZSgpO1xuICB9KTtcblxuICAvLyBOT1RFOiBUaGVzZSB0ZXN0cyBhcmUgaW5jb21wbGV0ZS5cbiAgZGVzY3JpYmUoJ3NlbmQnLCAoKSA9PiB7XG4gICAgbGV0IG9sZE1lc3NhZ2VTZW5kZXI6IHVuZGVmaW5lZCB8IE1lc3NhZ2VTZW5kZXI7XG5cbiAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICBvbGRNZXNzYWdlU2VuZGVyID0gd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nO1xuXG4gICAgICB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcgPVxuICAgICAgICBvbGRNZXNzYWdlU2VuZGVyID8/IG5ldyBNZXNzYWdlU2VuZGVyKHt9IGFzIFdlYkFQSVR5cGUpO1xuICAgICAgdGhpcy5zYW5kYm94XG4gICAgICAgIC5zdHViKHdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZywgJ3NlbmRTeW5jTWVzc2FnZScpXG4gICAgICAgIC5yZXNvbHZlcyh7fSk7XG4gICAgfSk7XG5cbiAgICBhZnRlckVhY2goKCkgPT4ge1xuICAgICAgaWYgKG9sZE1lc3NhZ2VTZW5kZXIpIHtcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nID0gb2xkTWVzc2FnZVNlbmRlcjtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIC8vIGB3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmdgIGNhbiBiZSB1bmRlZmluZWQgaW4gdGVzdHMuIEluc3RlYWQgb2YgdXBkYXRpbmdcbiAgICAgICAgLy8gICB0aGUgcmVhbCB0eXBlLCBJIGp1c3QgaWdub3JlIGl0LlxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICBkZWxldGUgKHdpbmRvdy50ZXh0c2VjdXJlIGFzIGFueSkubWVzc2FnaW5nO1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgaXQoJ3VwZGF0ZXMgYHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWRgJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgIHRoaXMuc2FuZGJveC51c2VGYWtlVGltZXJzKDEyMzQpO1xuXG4gICAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9XG4gICAgICAgIHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE91ckNvbnZlcnNhdGlvbklkT3JUaHJvdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uMSA9XG4gICAgICAgIGF3YWl0IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldE9yQ3JlYXRlQW5kV2FpdChcbiAgICAgICAgICAnYTA3MmRmMWQtN2NlZS00M2UyLTllNmItMTA5NzEwYTIxMzFjJyxcbiAgICAgICAgICAncHJpdmF0ZSdcbiAgICAgICAgKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbjIgPVxuICAgICAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZUFuZFdhaXQoXG4gICAgICAgICAgJzYyYmQ4ZWYxLTY4ZGEtNGNmZC1hYzFmLTNlYTg1ZGI3NDczZScsXG4gICAgICAgICAgJ3ByaXZhdGUnXG4gICAgICAgICk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IChcbiAgICAgICAgICBhd2FpdCB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXRPckNyZWF0ZUFuZFdhaXQoXG4gICAgICAgICAgICAnNzFjYzE5MGYtOTdiYS00YzYxLTlkNDEtMGI5NDQ0ZDcyMWY5JyxcbiAgICAgICAgICAgICdncm91cCdcbiAgICAgICAgICApXG4gICAgICAgICkuaWQsXG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogMTIzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW2NvbnZlcnNhdGlvbjEuaWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogMTIzLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW2NvbnZlcnNhdGlvbjIuaWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogNDU2LFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZmFrZURhdGFNZXNzYWdlID0gbmV3IFVpbnQ4QXJyYXkoMCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb24xVXVpZCA9IGNvbnZlcnNhdGlvbjEuZ2V0KCd1dWlkJyk7XG4gICAgICBjb25zdCBpZ25vcmVkVXVpZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuXG4gICAgICBpZiAoIWNvbnZlcnNhdGlvbjFVdWlkKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignVGVzdCBzZXR1cCBmYWlsZWQ6IGNvbnZlcnNhdGlvbjEgc2hvdWxkIGhhdmUgYSBVVUlEJyk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBQcm9taXNlLnJlc29sdmU8Q2FsbGJhY2tSZXN1bHRUeXBlPih7XG4gICAgICAgIHN1Y2Nlc3NmdWxJZGVudGlmaWVyczogW2NvbnZlcnNhdGlvbjFVdWlkLCBpZ25vcmVkVXVpZF0sXG4gICAgICAgIGVycm9yczogW1xuICAgICAgICAgIE9iamVjdC5hc3NpZ24obmV3IEVycm9yKCdmYWlsZWQnKSwge1xuICAgICAgICAgICAgaWRlbnRpZmllcjogY29udmVyc2F0aW9uMi5nZXQoJ3V1aWQnKSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgXSxcbiAgICAgICAgZGF0YU1lc3NhZ2U6IGZha2VEYXRhTWVzc2FnZSxcbiAgICAgIH0pO1xuXG4gICAgICBhd2FpdCBtZXNzYWdlLnNlbmQocHJvbWlzZSk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IG1lc3NhZ2UuZ2V0KCdzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkJykgfHwge307XG4gICAgICBhc3NlcnQuaGFzQWxsS2V5cyhyZXN1bHQsIFtcbiAgICAgICAgb3VyQ29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbjEuaWQsXG4gICAgICAgIGNvbnZlcnNhdGlvbjIuaWQsXG4gICAgICBdKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbb3VyQ29udmVyc2F0aW9uSWRdPy5zdGF0dXMsIFNlbmRTdGF0dXMuU2VudCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0W291ckNvbnZlcnNhdGlvbklkXT8udXBkYXRlZEF0LCAxMjM0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbY29udmVyc2F0aW9uMS5pZF0/LnN0YXR1cywgU2VuZFN0YXR1cy5TZW50KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbY29udmVyc2F0aW9uMS5pZF0/LnVwZGF0ZWRBdCwgMTIzNCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0W2NvbnZlcnNhdGlvbjIuaWRdPy5zdGF0dXMsIFNlbmRTdGF0dXMuRmFpbGVkKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHRbY29udmVyc2F0aW9uMi5pZF0/LnVwZGF0ZWRBdCwgMTIzNCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2F2ZXMgZXJyb3JzIGZyb20gcHJvbWlzZSByZWplY3Rpb25zIHdpdGggZXJyb3JzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGNyZWF0ZU1lc3NhZ2UoeyB0eXBlOiAnb3V0Z29pbmcnLCBzb3VyY2UgfSk7XG5cbiAgICAgIGNvbnN0IHByb21pc2UgPSBQcm9taXNlLnJlamVjdChuZXcgRXJyb3IoJ2ZvbyBiYXInKSk7XG4gICAgICBhd2FpdCBtZXNzYWdlLnNlbmQocHJvbWlzZSk7XG5cbiAgICAgIGNvbnN0IGVycm9ycyA9IG1lc3NhZ2UuZ2V0KCdlcnJvcnMnKSB8fCBbXTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihlcnJvcnMsIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVycm9yc1swXS5tZXNzYWdlLCAnZm9vIGJhcicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NhdmVzIGVycm9ycyBmcm9tIHByb21pc2UgcmVqZWN0aW9ucyB3aXRoIG9iamVjdHMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZSh7IHR5cGU6ICdvdXRnb2luZycsIHNvdXJjZSB9KTtcblxuICAgICAgY29uc3QgcmVzdWx0ID0ge1xuICAgICAgICBlcnJvcnM6IFtuZXcgRXJyb3IoJ2JheiBxdXgnKV0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvbWlzZSA9IFByb21pc2UucmVqZWN0KHJlc3VsdCk7XG4gICAgICBhd2FpdCBtZXNzYWdlLnNlbmQocHJvbWlzZSk7XG5cbiAgICAgIGNvbnN0IGVycm9ycyA9IG1lc3NhZ2UuZ2V0KCdlcnJvcnMnKSB8fCBbXTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihlcnJvcnMsIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVycm9yc1swXS5tZXNzYWdlLCAnYmF6IHF1eCcpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q29udGFjdCcsICgpID0+IHtcbiAgICBpdCgnZ2V0cyBvdXRnb2luZyBjb250YWN0JywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBuZXcgd2luZG93LldoaXNwZXIuTWVzc2FnZUNvbGxlY3Rpb24oKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlcy5hZGQoYXR0cmlidXRlcyk7XG4gICAgICBhc3NlcnQuZXhpc3RzKGdldENvbnRhY3QobWVzc2FnZS5hdHRyaWJ1dGVzKSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZ2V0cyBpbmNvbWluZyBjb250YWN0JywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZXMgPSBuZXcgd2luZG93LldoaXNwZXIuTWVzc2FnZUNvbGxlY3Rpb24oKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBtZXNzYWdlcy5hZGQoe1xuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICBzb3VyY2UsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5leGlzdHMoZ2V0Q29udGFjdChtZXNzYWdlLmF0dHJpYnV0ZXMpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgLy8gTm90ZSB0aGF0IHNvbWUgb2YgdGhpcyBtZXRob2QncyBiZWhhdmlvciBpcyB1bnRlc3RlZDpcbiAgLy8gLSBDYWxsIGhpc3RvcnlcbiAgLy8gLSBDb250YWN0c1xuICAvLyAtIEV4cGlyYXRpb24gdGltZXIgdXBkYXRlc1xuICAvLyAtIEtleSBjaGFuZ2VzXG4gIC8vIC0gUHJvZmlsZSBjaGFuZ2VzXG4gIC8vIC0gU3RpY2tlcnNcbiAgZGVzY3JpYmUoJ2dldE5vdGlmaWNhdGlvbkRhdGEnLCAoKSA9PiB7XG4gICAgaXQoJ2hhbmRsZXMgdW5zdXBwb3J0ZWQgbWVzc2FnZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICBzdXBwb3J0ZWRWZXJzaW9uQXRSZWNlaXZlOiAwLFxuICAgICAgICAgIHJlcXVpcmVkUHJvdG9jb2xWZXJzaW9uOiBJbmZpbml0eSxcbiAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICB7IHRleHQ6ICdVbnN1cHBvcnRlZCBtZXNzYWdlJyB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgZXJhc2VkIHRhcC10by12aWV3IG1lc3NhZ2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgaXNWaWV3T25jZTogdHJ1ZSxcbiAgICAgICAgICBpc0VyYXNlZDogdHJ1ZSxcbiAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICB7IHRleHQ6ICdWaWV3LW9uY2UgTWVkaWEnIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyB0YXAtdG8tdmlldyBwaG90b3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICBpc1ZpZXdPbmNlOiB0cnVlLFxuICAgICAgICAgIGlzRXJhc2VkOiBmYWxzZSxcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiAnVmlldy1vbmNlIFBob3RvJywgZW1vamk6ICdcdUQ4M0RcdURDRjcnIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyB0YXAtdG8tdmlldyB2aWRlb3MnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICBpc1ZpZXdPbmNlOiB0cnVlLFxuICAgICAgICAgIGlzRXJhc2VkOiBmYWxzZSxcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ3ZpZGVvL21wNCcsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiAnVmlldy1vbmNlIFZpZGVvJywgZW1vamk6ICdcdUQ4M0NcdURGQTUnIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBub24tbWVkaWEgdGFwLXRvLXZpZXcgZmlsZSB0eXBlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgIGlzVmlld09uY2U6IHRydWUsXG4gICAgICAgICAgaXNFcmFzZWQ6IGZhbHNlLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAndGV4dC9wbGFpbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiAnTWVkaWEgTWVzc2FnZScsIGVtb2ppOiAnXHVEODNEXHVEQ0NFJyB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgZ3JvdXAgdXBkYXRlcyB3aGVyZSB5b3UgbGVmdCB0aGUgZ3JvdXAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICBncm91cF91cGRhdGU6IHtcbiAgICAgICAgICAgIGxlZnQ6ICdZb3UnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiAnWW91IGFyZSBubyBsb25nZXIgYSBtZW1iZXIgb2YgdGhlIGdyb3VwLicgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGdyb3VwIHVwZGF0ZXMgd2hlcmUgc29tZW9uZSBsZWZ0IHRoZSBncm91cCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGdyb3VwX3VwZGF0ZToge1xuICAgICAgICAgICAgbGVmdDogJ0FsaWNlJyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHsgdGV4dDogJ0FsaWNlIGxlZnQgdGhlIGdyb3VwLicgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGVtcHR5IGdyb3VwIHVwZGF0ZXMgd2l0aCBhIGdlbmVyaWMgbWVzc2FnZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgICAgc291cmNlOiAnQWxpY2UnLFxuICAgICAgICAgIGdyb3VwX3VwZGF0ZToge30sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiAnQWxpY2UgdXBkYXRlZCB0aGUgZ3JvdXAuJyB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgZ3JvdXAgbmFtZSB1cGRhdGVzIGJ5IHlvdScsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgICAgc291cmNlOiBtZSxcbiAgICAgICAgICBncm91cF91cGRhdGU6IHsgbmFtZTogJ2JsZXJnJyB9LFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIllvdSB1cGRhdGVkIHRoZSBncm91cC4gR3JvdXAgbmFtZSBpcyBub3cgJ2JsZXJnJy5cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGdyb3VwIG5hbWUgdXBkYXRlcyBieSBzb21lb25lIGVsc2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBncm91cF91cGRhdGU6IHsgbmFtZTogJ2JsZXJnJyB9LFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIisxIDQxNS01NTUtNTU1NSB1cGRhdGVkIHRoZSBncm91cC4gR3JvdXAgbmFtZSBpcyBub3cgJ2JsZXJnJy5cIixcbiAgICAgICAgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGdyb3VwIGF2YXRhciB1cGRhdGVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgZ3JvdXBfdXBkYXRlOiB7IGF2YXRhclVwZGF0ZWQ6IHRydWUgfSxcbiAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICB7XG4gICAgICAgICAgdGV4dDogJysxIDQxNS01NTUtNTU1NSB1cGRhdGVkIHRoZSBncm91cC4gR3JvdXAgYXZhdGFyIHdhcyB1cGRhdGVkLicsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyB5b3Ugam9pbmluZyB0aGUgZ3JvdXAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBncm91cF91cGRhdGU6IHsgam9pbmVkOiBbbWVdIH0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICcrMSA0MTUtNTU1LTU1NTUgdXBkYXRlZCB0aGUgZ3JvdXAuIFlvdSBqb2luZWQgdGhlIGdyb3VwLicsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBzb21lb25lIGVsc2Ugam9pbmluZyB0aGUgZ3JvdXAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBncm91cF91cGRhdGU6IHsgam9pbmVkOiBbJ0JvYiddIH0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICcrMSA0MTUtNTU1LTU1NTUgdXBkYXRlZCB0aGUgZ3JvdXAuIEJvYiBqb2luZWQgdGhlIGdyb3VwLicsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBtdWx0aXBsZSBwZW9wbGUgam9pbmluZyB0aGUgZ3JvdXAnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBncm91cF91cGRhdGU6IHsgam9pbmVkOiBbJ0JvYicsICdBbGljZScsICdFdmUnXSB9LFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiAnKzEgNDE1LTU1NS01NTU1IHVwZGF0ZWQgdGhlIGdyb3VwLiBCb2IsIEFsaWNlLCBFdmUgam9pbmVkIHRoZSBncm91cC4nLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgbXVsdGlwbGUgcGVvcGxlIGpvaW5pbmcgdGhlIGdyb3VwLCBpbmNsdWRpbmcgeW91JywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgZ3JvdXBfdXBkYXRlOiB7IGpvaW5lZDogWydCb2InLCBtZSwgJ0FsaWNlJywgJ0V2ZSddIH0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAge1xuICAgICAgICAgIHRleHQ6ICcrMSA0MTUtNTU1LTU1NTUgdXBkYXRlZCB0aGUgZ3JvdXAuIEJvYiwgQWxpY2UsIEV2ZSBqb2luZWQgdGhlIGdyb3VwLiBZb3Ugam9pbmVkIHRoZSBncm91cC4nLFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgbXVsdGlwbGUgY2hhbmdlcyB0byBncm91cCBwcm9wZXJ0aWVzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgZ3JvdXBfdXBkYXRlOiB7IGpvaW5lZDogWydCb2InXSwgbmFtZTogJ2JsZXJnJyB9LFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHtcbiAgICAgICAgICB0ZXh0OiBcIisxIDQxNS01NTUtNTU1NSB1cGRhdGVkIHRoZSBncm91cC4gQm9iIGpvaW5lZCB0aGUgZ3JvdXAuIEdyb3VwIG5hbWUgaXMgbm93ICdibGVyZycuXCIsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBhIHNlc3Npb24gZW5kaW5nJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgZmxhZ3M6IHRydWUsXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiBpMThuKCdzZXNzaW9uRW5kZWQnKSB9XG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgaW5jb21pbmcgbWVzc2FnZSBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBlcnJvcnM6IFt7fV0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvbkRhdGEoKSxcbiAgICAgICAgeyB0ZXh0OiBpMThuKCdpbmNvbWluZ0Vycm9yJykgfVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGNvbnN0IGF0dGFjaG1lbnRUZXN0Q2FzZXMgPSBbXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAnR0lGJyxcbiAgICAgICAgYXR0YWNobWVudDoge1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnaW1hZ2UvZ2lmJyxcbiAgICAgICAgfSxcbiAgICAgICAgZXhwZWN0ZWRUZXh0OiAnR0lGJyxcbiAgICAgICAgZXhwZWN0ZWRFbW9qaTogJ1x1RDgzQ1x1REZBMScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ3Bob3RvJyxcbiAgICAgICAgYXR0YWNobWVudDoge1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgfSxcbiAgICAgICAgZXhwZWN0ZWRUZXh0OiAnUGhvdG8nLFxuICAgICAgICBleHBlY3RlZEVtb2ppOiAnXHVEODNEXHVEQ0Y3JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAndmlkZW8nLFxuICAgICAgICBhdHRhY2htZW50OiB7XG4gICAgICAgICAgY29udGVudFR5cGU6ICd2aWRlby9tcDQnLFxuICAgICAgICB9LFxuICAgICAgICBleHBlY3RlZFRleHQ6ICdWaWRlbycsXG4gICAgICAgIGV4cGVjdGVkRW1vamk6ICdcdUQ4M0NcdURGQTUnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICd2b2ljZSBtZXNzYWdlJyxcbiAgICAgICAgYXR0YWNobWVudDoge1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXVkaW8vb2dnJyxcbiAgICAgICAgICBmbGFnczogUHJvdG8uQXR0YWNobWVudFBvaW50ZXIuRmxhZ3MuVk9JQ0VfTUVTU0FHRSxcbiAgICAgICAgfSxcbiAgICAgICAgZXhwZWN0ZWRUZXh0OiAnVm9pY2UgTWVzc2FnZScsXG4gICAgICAgIGV4cGVjdGVkRW1vamk6ICdcdUQ4M0NcdURGQTQnLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgdGl0bGU6ICdhdWRpbyBtZXNzYWdlJyxcbiAgICAgICAgYXR0YWNobWVudDoge1xuICAgICAgICAgIGNvbnRlbnRUeXBlOiAnYXVkaW8vb2dnJyxcbiAgICAgICAgICBmaWxlTmFtZTogJ2F1ZGlvLm9nZycsXG4gICAgICAgIH0sXG4gICAgICAgIGV4cGVjdGVkVGV4dDogJ0F1ZGlvIE1lc3NhZ2UnLFxuICAgICAgICBleHBlY3RlZEVtb2ppOiAnXHVEODNEXHVERDA4JyxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHRpdGxlOiAncGxhaW4gdGV4dCcsXG4gICAgICAgIGF0dGFjaG1lbnQ6IHtcbiAgICAgICAgICBjb250ZW50VHlwZTogJ3RleHQvcGxhaW4nLFxuICAgICAgICB9LFxuICAgICAgICBleHBlY3RlZFRleHQ6ICdGaWxlJyxcbiAgICAgICAgZXhwZWN0ZWRFbW9qaTogJ1x1RDgzRFx1RENDRScsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICB0aXRsZTogJ3Vuc3BlY2lmaWVkLXR5cGUnLFxuICAgICAgICBhdHRhY2htZW50OiB7XG4gICAgICAgICAgY29udGVudFR5cGU6IG51bGwsXG4gICAgICAgIH0sXG4gICAgICAgIGV4cGVjdGVkVGV4dDogJ0ZpbGUnLFxuICAgICAgICBleHBlY3RlZEVtb2ppOiAnXHVEODNEXHVEQ0NFJyxcbiAgICAgIH0sXG4gICAgXTtcbiAgICBhdHRhY2htZW50VGVzdENhc2VzLmZvckVhY2goXG4gICAgICAoeyB0aXRsZSwgYXR0YWNobWVudCwgZXhwZWN0ZWRUZXh0LCBleHBlY3RlZEVtb2ppIH0pID0+IHtcbiAgICAgICAgaXQoYGhhbmRsZXMgc2luZ2xlICR7dGl0bGV9IGF0dGFjaG1lbnRzYCwgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICBhdHRhY2htZW50czogW2F0dGFjaG1lbnRdLFxuICAgICAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICAgICAgeyB0ZXh0OiBleHBlY3RlZFRleHQsIGVtb2ppOiBleHBlY3RlZEVtb2ppIH1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChgaGFuZGxlcyBtdWx0aXBsZSBhdHRhY2htZW50cyB3aGVyZSB0aGUgZmlyc3QgaXMgYSAke3RpdGxlfWAsICgpID0+IHtcbiAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgICAgICBhdHRhY2htZW50LFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAndGV4dC9odG1sJyxcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICAgICAgeyB0ZXh0OiBleHBlY3RlZFRleHQsIGVtb2ppOiBleHBlY3RlZEVtb2ppIH1cbiAgICAgICAgICApO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChgcmVzcGVjdHMgdGhlIGNhcHRpb24gZm9yICR7dGl0bGV9IGF0dGFjaG1lbnRzYCwgKCkgPT4ge1xuICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICAgICAgc291cmNlLFxuICAgICAgICAgICAgICBhdHRhY2htZW50czogW2F0dGFjaG1lbnRdLFxuICAgICAgICAgICAgICBib2R5OiAnaGVsbG8gd29ybGQnLFxuICAgICAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uRGF0YSgpLFxuICAgICAgICAgICAgeyB0ZXh0OiAnaGVsbG8gd29ybGQnLCBlbW9qaTogZXhwZWN0ZWRFbW9qaSB9XG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIGl0KCdoYW5kbGVzIGEgXCJwbGFpblwiIG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBib2R5OiAnaGVsbG8gd29ybGQnLFxuICAgICAgICB9KS5nZXROb3RpZmljYXRpb25EYXRhKCksXG4gICAgICAgIHsgdGV4dDogJ2hlbGxvIHdvcmxkJyB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Tm90aWZpY2F0aW9uVGV4dCcsICgpID0+IHtcbiAgICBpdChcInJldHVybnMgYSBub3RpZmljYXRpb24ncyB0ZXh0XCIsICgpID0+IHtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgICBzb3VyY2UsXG4gICAgICAgICAgYm9keTogJ2hlbGxvIHdvcmxkJyxcbiAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uVGV4dCgpLFxuICAgICAgICAnaGVsbG8gd29ybGQnXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJzaG93cyBhIG5vdGlmaWNhdGlvbidzIGVtb2ppIG9uIG5vbi1MaW51eFwiLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgdGhpcy5zYW5kYm94LnJlcGxhY2Uod2luZG93LlNpZ25hbCwgJ09TJywge1xuICAgICAgICAuLi53aW5kb3cuU2lnbmFsLk9TLFxuICAgICAgICBpc0xpbnV4KCkge1xuICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgICAgc291cmNlLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAnaW1hZ2UvcG5nJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSkuZ2V0Tm90aWZpY2F0aW9uVGV4dCgpLFxuICAgICAgICAnXHVEODNEXHVEQ0Y3IFBob3RvJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdoaWRlcyBlbW9qaSBvbiBMaW51eCcsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICB0aGlzLnNhbmRib3gucmVwbGFjZSh3aW5kb3cuU2lnbmFsLCAnT1MnLCB7XG4gICAgICAgIC4uLndpbmRvdy5TaWduYWwuT1MsXG4gICAgICAgIGlzTGludXgoKSB7XG4gICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICAgIHNvdXJjZSxcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogJ2ltYWdlL3BuZycsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIH0pLmdldE5vdGlmaWNhdGlvblRleHQoKSxcbiAgICAgICAgJ1Bob3RvJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcblxuZGVzY3JpYmUoJ01lc3NhZ2VDb2xsZWN0aW9uJywgKCkgPT4ge1xuICBpdCgnc2hvdWxkIGJlIG9yZGVyZWQgb2xkZXN0IHRvIG5ld2VzdCcsICgpID0+IHtcbiAgICBjb25zdCBtZXNzYWdlcyA9IG5ldyB3aW5kb3cuV2hpc3Blci5NZXNzYWdlQ29sbGVjdGlvbigpO1xuICAgIC8vIFRpbWVzdGFtcHNcbiAgICBjb25zdCB0b2RheSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgdG9tb3Jyb3cgPSB0b2RheSArIDEyMzQ1O1xuXG4gICAgLy8gQWRkIHRocmVhZHNcbiAgICBtZXNzYWdlcy5hZGQoeyByZWNlaXZlZF9hdDogdG9kYXkgfSk7XG4gICAgbWVzc2FnZXMuYWRkKHsgcmVjZWl2ZWRfYXQ6IHRvbW9ycm93IH0pO1xuXG4gICAgY29uc3QgeyBtb2RlbHMgfSA9IG1lc3NhZ2VzO1xuICAgIGNvbnN0IGZpcnN0VGltZXN0YW1wID0gbW9kZWxzWzBdLmdldCgncmVjZWl2ZWRfYXQnKTtcbiAgICBjb25zdCBzZWNvbmRUaW1lc3RhbXAgPSBtb2RlbHNbMV0uZ2V0KCdyZWNlaXZlZF9hdCcpO1xuXG4gICAgLy8gQ29tcGFyZSB0aW1lc3RhbXBzXG4gICAgYXNzZXJ0KHR5cGVvZiBmaXJzdFRpbWVzdGFtcCA9PT0gJ251bWJlcicpO1xuICAgIGFzc2VydCh0eXBlb2Ygc2Vjb25kVGltZXN0YW1wID09PSAnbnVtYmVyJyk7XG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1ub24tbnVsbC1hc3NlcnRpb25cbiAgICBhc3NlcnQoZmlyc3RUaW1lc3RhbXAhIDwgc2Vjb25kVGltZXN0YW1wISk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3Mi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
