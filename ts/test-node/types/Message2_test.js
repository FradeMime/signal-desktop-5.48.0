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
var Message = __toESM(require("../../types/Message2"));
var import_protobuf = require("../../protobuf");
var Bytes = __toESM(require("../../Bytes"));
var MIME = __toESM(require("../../types/MIME"));
describe("Message", () => {
  const logger = {
    warn: () => null,
    error: () => null,
    fatal: () => null,
    info: () => null,
    debug: () => null,
    trace: () => null
  };
  function getDefaultMessage(props) {
    return {
      id: "some-id",
      type: "incoming",
      sent_at: 45,
      received_at: 45,
      timestamp: 45,
      conversationId: "some-conversation-id",
      ...props
    };
  }
  function getDefaultContext(props) {
    return {
      getAbsoluteAttachmentPath: (_path) => "fake-absolute-attachment-path",
      getAbsoluteStickerPath: (_path) => "fake-absolute-sticker-path",
      getImageDimensions: async (_params) => ({
        width: 10,
        height: 20
      }),
      getRegionCode: () => "region-code",
      logger,
      makeImageThumbnail: async (_params) => new Blob(),
      makeObjectUrl: (_data, _contentType) => "fake-object-url",
      makeVideoScreenshot: async (_params) => new Blob(),
      revokeObjectUrl: (_objectUrl) => void 0,
      writeNewAttachmentData: async (_data) => "fake-attachment-path",
      writeNewStickerData: async (_data) => "fake-sticker-path",
      ...props
    };
  }
  const writeExistingAttachmentData = /* @__PURE__ */ __name(() => Promise.resolve("path"), "writeExistingAttachmentData");
  describe("createAttachmentDataWriter", () => {
    it("should ignore messages that didn\u2019t go through attachment migration", async () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 2
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 2
      });
      const actual = await Message.createAttachmentDataWriter({
        writeExistingAttachmentData,
        logger
      })(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should ignore messages without attachments", async () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: []
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: []
      });
      const actual = await Message.createAttachmentDataWriter({
        writeExistingAttachmentData,
        logger
      })(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should write attachments to file system on original path", async () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [
          {
            contentType: MIME.IMAGE_GIF,
            size: 3534,
            path: "ab/abcdefghi",
            data: Bytes.fromString("It\u2019s easy if you try")
          }
        ]
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [
          {
            contentType: MIME.IMAGE_GIF,
            size: 3534,
            path: "ab/abcdefghi"
          }
        ],
        contact: [],
        preview: []
      });
      const writeExistingAttachmentData2 = /* @__PURE__ */ __name(async (attachment) => {
        import_chai.assert.equal(attachment.path, "ab/abcdefghi");
        import_chai.assert.strictEqual(Bytes.toString(attachment.data || new Uint8Array()), "It\u2019s easy if you try");
        return "path";
      }, "writeExistingAttachmentData");
      const actual = await Message.createAttachmentDataWriter({
        writeExistingAttachmentData: writeExistingAttachmentData2,
        logger
      })(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should process quote attachment thumbnails", async () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [],
        quote: {
          id: 3523,
          isViewOnce: false,
          messageId: "some-message-id",
          referencedMessageNotFound: false,
          attachments: [
            {
              thumbnail: {
                path: "ab/abcdefghi",
                data: Bytes.fromString("It\u2019s easy if you try")
              }
            }
          ]
        }
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [],
        quote: {
          id: 3523,
          isViewOnce: false,
          messageId: "some-message-id",
          referencedMessageNotFound: false,
          attachments: [
            {
              thumbnail: {
                path: "ab/abcdefghi"
              }
            }
          ]
        },
        contact: [],
        preview: []
      });
      const writeExistingAttachmentData2 = /* @__PURE__ */ __name(async (attachment) => {
        import_chai.assert.equal(attachment.path, "ab/abcdefghi");
        import_chai.assert.strictEqual(Bytes.toString(attachment.data || new Uint8Array()), "It\u2019s easy if you try");
        return "path";
      }, "writeExistingAttachmentData");
      const actual = await Message.createAttachmentDataWriter({
        writeExistingAttachmentData: writeExistingAttachmentData2,
        logger
      })(input);
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should process contact avatars", async () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [],
        contact: [
          {
            name: { givenName: "john" },
            avatar: {
              isProfile: false,
              avatar: {
                contentType: MIME.IMAGE_PNG,
                size: 47,
                path: "ab/abcdefghi",
                data: Bytes.fromString("It\u2019s easy if you try")
              }
            }
          }
        ]
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 4,
        attachments: [],
        contact: [
          {
            name: { givenName: "john" },
            avatar: {
              isProfile: false,
              avatar: {
                contentType: MIME.IMAGE_PNG,
                size: 47,
                path: "ab/abcdefghi"
              }
            }
          }
        ],
        preview: []
      });
      const writeExistingAttachmentData2 = /* @__PURE__ */ __name(async (attachment) => {
        import_chai.assert.equal(attachment.path, "ab/abcdefghi");
        import_chai.assert.strictEqual(Bytes.toString(attachment.data || new Uint8Array()), "It\u2019s easy if you try");
        return "path";
      }, "writeExistingAttachmentData");
      const actual = await Message.createAttachmentDataWriter({
        writeExistingAttachmentData: writeExistingAttachmentData2,
        logger
      })(input);
      import_chai.assert.deepEqual(actual, expected);
      return "path";
    });
  });
  describe("initializeSchemaVersion", () => {
    it("should ignore messages with previously inherited schema", () => {
      const input = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 2
      });
      const expected = getDefaultMessage({
        body: "Imagine there is no heaven\u2026",
        schemaVersion: 2
      });
      const actual = Message.initializeSchemaVersion({
        message: input,
        logger
      });
      import_chai.assert.deepEqual(actual, expected);
    });
    context("for message without attachments", () => {
      it("should initialize schema version to zero", () => {
        const input = getDefaultMessage({
          body: "Imagine there is no heaven\u2026",
          attachments: []
        });
        const expected = getDefaultMessage({
          body: "Imagine there is no heaven\u2026",
          attachments: [],
          schemaVersion: 0
        });
        const actual = Message.initializeSchemaVersion({
          message: input,
          logger
        });
        import_chai.assert.deepEqual(actual, expected);
      });
    });
    context("for message with attachments", () => {
      it("should inherit existing attachment schema version", () => {
        const input = getDefaultMessage({
          body: "Imagine there is no heaven\u2026",
          attachments: [
            {
              contentType: MIME.IMAGE_JPEG,
              size: 45,
              fileName: "lennon.jpg",
              schemaVersion: 7
            }
          ]
        });
        const expected = getDefaultMessage({
          body: "Imagine there is no heaven\u2026",
          attachments: [
            {
              contentType: MIME.IMAGE_JPEG,
              size: 45,
              fileName: "lennon.jpg"
            }
          ],
          schemaVersion: 7
        });
        const actual = Message.initializeSchemaVersion({
          message: input,
          logger
        });
        import_chai.assert.deepEqual(actual, expected);
      });
    });
  });
  describe("upgradeSchema", () => {
    it("should upgrade an unversioned message to the latest version", async () => {
      const input = getDefaultMessage({
        attachments: [
          {
            contentType: MIME.AUDIO_AAC,
            flags: import_protobuf.SignalService.AttachmentPointer.Flags.VOICE_MESSAGE,
            data: Bytes.fromString("It\u2019s easy if you try"),
            fileName: "test\u202Dfig.exe",
            size: 1111
          }
        ],
        schemaVersion: 0
      });
      const expected = getDefaultMessage({
        attachments: [
          {
            contentType: MIME.AUDIO_AAC,
            flags: 1,
            path: "abc/abcdefg",
            fileName: "test\uFFFDfig.exe",
            size: 1111
          }
        ],
        hasAttachments: 1,
        hasVisualMediaAttachments: void 0,
        hasFileAttachments: void 0,
        schemaVersion: Message.CURRENT_SCHEMA_VERSION,
        contact: []
      });
      const expectedAttachmentData = "It\u2019s easy if you try";
      const context2 = getDefaultContext({
        writeNewAttachmentData: async (attachmentData) => {
          import_chai.assert.strictEqual(Bytes.toString(attachmentData), expectedAttachmentData);
          return "abc/abcdefg";
        }
      });
      const actual = await Message.upgradeSchema(input, context2);
      import_chai.assert.deepEqual(actual, expected);
    });
    context("with multiple upgrade steps", () => {
      it("should return last valid message when any upgrade step fails", async () => {
        const input = getDefaultMessage({
          attachments: [
            {
              contentType: MIME.APPLICATION_JSON,
              fileName: "test\u202Dfig.exe",
              size: 1111
            }
          ],
          body: "start",
          schemaVersion: 0
        });
        const expected = getDefaultMessage({
          attachments: [
            {
              contentType: MIME.APPLICATION_JSON,
              fileName: "test\u202Dfig.exe",
              size: 1111
            }
          ],
          body: "start +1",
          schemaVersion: 1
        });
        const v1 = /* @__PURE__ */ __name(async (message) => ({
          ...message,
          body: `${message.body} +1`
        }), "v1");
        const v2 = /* @__PURE__ */ __name(async () => {
          throw new Error("boom");
        }, "v2");
        const v3 = /* @__PURE__ */ __name(async (message) => ({
          ...message,
          body: `${message.body} +3`
        }), "v3");
        const toVersion1 = Message._withSchemaVersion({
          schemaVersion: 1,
          upgrade: v1
        });
        const toVersion2 = Message._withSchemaVersion({
          schemaVersion: 2,
          upgrade: v2
        });
        const toVersion3 = Message._withSchemaVersion({
          schemaVersion: 3,
          upgrade: v3
        });
        const context2 = getDefaultContext({ logger });
        const upgradeSchema = /* @__PURE__ */ __name(async (message) => toVersion3(await toVersion2(await toVersion1(message, context2), context2), context2), "upgradeSchema");
        const actual = await upgradeSchema(input);
        import_chai.assert.deepEqual(actual, expected);
      });
      it("should skip out-of-order upgrade steps", async () => {
        const input = getDefaultMessage({
          attachments: [
            {
              contentType: MIME.APPLICATION_JSON,
              fileName: "test\u202Dfig.exe",
              size: 1111
            }
          ],
          body: "start",
          schemaVersion: 0
        });
        const expected = getDefaultMessage({
          attachments: [
            {
              contentType: MIME.APPLICATION_JSON,
              fileName: "test\u202Dfig.exe",
              size: 1111
            }
          ],
          body: "start +1 +2",
          schemaVersion: 2
        });
        const v1 = /* @__PURE__ */ __name(async (message) => ({
          ...message,
          body: `${message.body} +1`
        }), "v1");
        const v2 = /* @__PURE__ */ __name(async (message) => ({
          ...message,
          body: `${message.body} +2`
        }), "v2");
        const v3 = /* @__PURE__ */ __name(async (message) => ({
          ...message,
          body: `${message.body} +3`
        }), "v3");
        const toVersion1 = Message._withSchemaVersion({
          schemaVersion: 1,
          upgrade: v1
        });
        const toVersion2 = Message._withSchemaVersion({
          schemaVersion: 2,
          upgrade: v2
        });
        const toVersion3 = Message._withSchemaVersion({
          schemaVersion: 3,
          upgrade: v3
        });
        const context2 = getDefaultContext({ logger });
        const atVersion1 = await toVersion1(input, context2);
        const atVersion3 = await toVersion3(atVersion1, context2);
        const actual = await toVersion2(atVersion3, context2);
        import_chai.assert.deepEqual(actual, expected);
      });
    });
  });
  describe("_withSchemaVersion", () => {
    it("should require a version number", () => {
      const toVersionX = /* @__PURE__ */ __name(() => null, "toVersionX");
      import_chai.assert.throws(() => Message._withSchemaVersion({
        schemaVersion: toVersionX,
        upgrade: () => Promise.resolve(getDefaultMessage())
      }), "_withSchemaVersion: schemaVersion is invalid");
    });
    it("should require an upgrade function", () => {
      import_chai.assert.throws(() => Message._withSchemaVersion({ schemaVersion: 2, upgrade: 3 }), "_withSchemaVersion: upgrade must be a function");
    });
    it("should skip upgrading if message has already been upgraded", async () => {
      const upgrade = /* @__PURE__ */ __name(async (message) => ({
        ...message,
        foo: true
      }), "upgrade");
      const upgradeWithVersion = Message._withSchemaVersion({
        schemaVersion: 3,
        upgrade
      });
      const input = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 4
      });
      const expected = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 4
      });
      const actual = await upgradeWithVersion(input, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should return original message if upgrade function throws", async () => {
      const upgrade = /* @__PURE__ */ __name(async () => {
        throw new Error("boom!");
      }, "upgrade");
      const upgradeWithVersion = Message._withSchemaVersion({
        schemaVersion: 3,
        upgrade
      });
      const input = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 0
      });
      const expected = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 0
      });
      const actual = await upgradeWithVersion(input, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(actual, expected);
    });
    it("should return original message if upgrade function returns null", async () => {
      const upgrade = /* @__PURE__ */ __name(async () => null, "upgrade");
      const upgradeWithVersion = Message._withSchemaVersion({
        schemaVersion: 3,
        upgrade
      });
      const input = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 0
      });
      const expected = getDefaultMessage({
        id: "guid-guid-guid-guid",
        schemaVersion: 0
      });
      const actual = await upgradeWithVersion(input, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(actual, expected);
    });
  });
  describe("_mapQuotedAttachments", () => {
    it("handles message with no quote", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!"
      });
      const result = await upgradeVersion(message, getDefaultContext());
      import_chai.assert.deepEqual(result, message);
    });
    it("handles quote with no attachments", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const expected = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const result = await upgradeVersion(message, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(result, expected);
    });
    it("handles zero attachments", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const result = await upgradeVersion(message, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(result, message);
    });
    it("handles attachments with no thumbnail", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [
            {
              fileName: "manifesto.txt",
              contentType: "text/plain"
            }
          ],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const result = await upgradeVersion(message, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(result, message);
    });
    it("does not eliminate thumbnails with missing data field", async () => {
      const upgradeAttachment = sinon.stub().returns({ fileName: "processed!" });
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [
            {
              fileName: "cat.gif",
              contentType: "image/gif",
              thumbnail: {
                fileName: "not yet downloaded!"
              }
            }
          ],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const expected = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [
            {
              contentType: "image/gif",
              fileName: "cat.gif",
              thumbnail: {
                fileName: "processed!"
              }
            }
          ],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const result = await upgradeVersion(message, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(result, expected);
    });
    it("calls provided async function for each quoted attachment", async () => {
      const upgradeAttachment = sinon.stub().resolves({
        path: "/new/path/on/disk"
      });
      const upgradeVersion = Message._mapQuotedAttachments(upgradeAttachment);
      const message = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [
            {
              thumbnail: {
                data: "data is here"
              }
            }
          ],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const expected = getDefaultMessage({
        body: "hey there!",
        quote: {
          text: "hey!",
          attachments: [
            {
              thumbnail: {
                path: "/new/path/on/disk"
              }
            }
          ],
          id: 34233,
          isViewOnce: false,
          messageId: "message-id",
          referencedMessageNotFound: false
        }
      });
      const result = await upgradeVersion(message, getDefaultContext({ logger }));
      import_chai.assert.deepEqual(result, expected);
    });
  });
  describe("_mapContact", () => {
    it("handles message with no contact field", async () => {
      const upgradeContact = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = Message._mapContact(upgradeContact);
      const message = getDefaultMessage({
        body: "hey there!"
      });
      const expected = getDefaultMessage({
        body: "hey there!",
        contact: []
      });
      const result = await upgradeVersion(message, getDefaultContext());
      import_chai.assert.deepEqual(result, expected);
    });
    it("handles one contact", async () => {
      const upgradeContact = /* @__PURE__ */ __name((contact) => Promise.resolve(contact), "upgradeContact");
      const upgradeVersion = Message._mapContact(upgradeContact);
      const message = getDefaultMessage({
        body: "hey there!",
        contact: [
          {
            name: {
              displayName: "Someone somewhere"
            }
          }
        ]
      });
      const expected = getDefaultMessage({
        body: "hey there!",
        contact: [
          {
            name: {
              displayName: "Someone somewhere"
            }
          }
        ]
      });
      const result = await upgradeVersion(message, getDefaultContext());
      import_chai.assert.deepEqual(result, expected);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZTJfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuXG5pbXBvcnQgKiBhcyBNZXNzYWdlIGZyb20gJy4uLy4uL3R5cGVzL01lc3NhZ2UyJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgfSBmcm9tICcuLi8uLi9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi8uLi9CeXRlcyc7XG5pbXBvcnQgKiBhcyBNSU1FIGZyb20gJy4uLy4uL3R5cGVzL01JTUUnO1xuXG5pbXBvcnQgdHlwZSB7IEVtYmVkZGVkQ29udGFjdFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9FbWJlZGRlZENvbnRhY3QnO1xuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC10eXBlcy5kJztcbmltcG9ydCB0eXBlIHsgQXR0YWNobWVudFR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuXG5kZXNjcmliZSgnTWVzc2FnZScsICgpID0+IHtcbiAgY29uc3QgbG9nZ2VyOiBMb2dnZXJUeXBlID0ge1xuICAgIHdhcm46ICgpID0+IG51bGwsXG4gICAgZXJyb3I6ICgpID0+IG51bGwsXG4gICAgZmF0YWw6ICgpID0+IG51bGwsXG4gICAgaW5mbzogKCkgPT4gbnVsbCxcbiAgICBkZWJ1ZzogKCkgPT4gbnVsbCxcbiAgICB0cmFjZTogKCkgPT4gbnVsbCxcbiAgfTtcblxuICBmdW5jdGlvbiBnZXREZWZhdWx0TWVzc2FnZShcbiAgICBwcm9wcz86IFBhcnRpYWw8TWVzc2FnZUF0dHJpYnV0ZXNUeXBlPlxuICApOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBpZDogJ3NvbWUtaWQnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIHNlbnRfYXQ6IDQ1LFxuICAgICAgcmVjZWl2ZWRfYXQ6IDQ1LFxuICAgICAgdGltZXN0YW1wOiA0NSxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiAnc29tZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfTtcbiAgfVxuXG4gIGZ1bmN0aW9uIGdldERlZmF1bHRDb250ZXh0KFxuICAgIHByb3BzPzogUGFydGlhbDxNZXNzYWdlLkNvbnRleHRUeXBlPlxuICApOiBNZXNzYWdlLkNvbnRleHRUeXBlIHtcbiAgICByZXR1cm4ge1xuICAgICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aDogKF9wYXRoOiBzdHJpbmcpID0+XG4gICAgICAgICdmYWtlLWFic29sdXRlLWF0dGFjaG1lbnQtcGF0aCcsXG4gICAgICBnZXRBYnNvbHV0ZVN0aWNrZXJQYXRoOiAoX3BhdGg6IHN0cmluZykgPT4gJ2Zha2UtYWJzb2x1dGUtc3RpY2tlci1wYXRoJyxcbiAgICAgIGdldEltYWdlRGltZW5zaW9uczogYXN5bmMgKF9wYXJhbXM6IHtcbiAgICAgICAgb2JqZWN0VXJsOiBzdHJpbmc7XG4gICAgICAgIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgICAgIH0pID0+ICh7XG4gICAgICAgIHdpZHRoOiAxMCxcbiAgICAgICAgaGVpZ2h0OiAyMCxcbiAgICAgIH0pLFxuICAgICAgZ2V0UmVnaW9uQ29kZTogKCkgPT4gJ3JlZ2lvbi1jb2RlJyxcbiAgICAgIGxvZ2dlcixcbiAgICAgIG1ha2VJbWFnZVRodW1ibmFpbDogYXN5bmMgKF9wYXJhbXM6IHtcbiAgICAgICAgc2l6ZTogbnVtYmVyO1xuICAgICAgICBvYmplY3RVcmw6IHN0cmluZztcbiAgICAgICAgY29udGVudFR5cGU6IE1JTUUuTUlNRVR5cGU7XG4gICAgICAgIGxvZ2dlcjogTG9nZ2VyVHlwZTtcbiAgICAgIH0pID0+IG5ldyBCbG9iKCksXG4gICAgICBtYWtlT2JqZWN0VXJsOiAoXG4gICAgICAgIF9kYXRhOiBVaW50OEFycmF5IHwgQXJyYXlCdWZmZXIsXG4gICAgICAgIF9jb250ZW50VHlwZTogTUlNRS5NSU1FVHlwZVxuICAgICAgKSA9PiAnZmFrZS1vYmplY3QtdXJsJyxcbiAgICAgIG1ha2VWaWRlb1NjcmVlbnNob3Q6IGFzeW5jIChfcGFyYW1zOiB7XG4gICAgICAgIG9iamVjdFVybDogc3RyaW5nO1xuICAgICAgICBjb250ZW50VHlwZTogTUlNRS5NSU1FVHlwZTtcbiAgICAgICAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICAgICAgfSkgPT4gbmV3IEJsb2IoKSxcbiAgICAgIHJldm9rZU9iamVjdFVybDogKF9vYmplY3RVcmw6IHN0cmluZykgPT4gdW5kZWZpbmVkLFxuICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YTogYXN5bmMgKF9kYXRhOiBVaW50OEFycmF5KSA9PlxuICAgICAgICAnZmFrZS1hdHRhY2htZW50LXBhdGgnLFxuICAgICAgd3JpdGVOZXdTdGlja2VyRGF0YTogYXN5bmMgKF9kYXRhOiBVaW50OEFycmF5KSA9PiAnZmFrZS1zdGlja2VyLXBhdGgnLFxuICAgICAgLi4ucHJvcHMsXG4gICAgfTtcbiAgfVxuICBjb25zdCB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEgPSAoKSA9PiBQcm9taXNlLnJlc29sdmUoJ3BhdGgnKTtcblxuICBkZXNjcmliZSgnY3JlYXRlQXR0YWNobWVudERhdGFXcml0ZXInLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgbWVzc2FnZXMgdGhhdCBkaWRuXHUyMDE5dCBnbyB0aHJvdWdoIGF0dGFjaG1lbnQgbWlncmF0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDIsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnSW1hZ2luZSB0aGVyZSBpcyBubyBoZWF2ZW5cdTIwMjYnLFxuICAgICAgICBzY2hlbWFWZXJzaW9uOiAyLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IE1lc3NhZ2UuY3JlYXRlQXR0YWNobWVudERhdGFXcml0ZXIoe1xuICAgICAgICB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIGlnbm9yZSBtZXNzYWdlcyB3aXRob3V0IGF0dGFjaG1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBNZXNzYWdlLmNyZWF0ZUF0dGFjaG1lbnREYXRhV3JpdGVyKHtcbiAgICAgICAgd3JpdGVFeGlzdGluZ0F0dGFjaG1lbnREYXRhLFxuICAgICAgICBsb2dnZXIsXG4gICAgICB9KShpbnB1dCk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCB3cml0ZSBhdHRhY2htZW50cyB0byBmaWxlIHN5c3RlbSBvbiBvcmlnaW5hbCBwYXRoJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgY29udGVudFR5cGU6IE1JTUUuSU1BR0VfR0lGLFxuICAgICAgICAgICAgc2l6ZTogMzUzNCxcbiAgICAgICAgICAgIHBhdGg6ICdhYi9hYmNkZWZnaGknLFxuICAgICAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnSXRcdTIwMTlzIGVhc3kgaWYgeW91IHRyeScpLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnSW1hZ2luZSB0aGVyZSBpcyBubyBoZWF2ZW5cdTIwMjYnLFxuICAgICAgICBzY2hlbWFWZXJzaW9uOiA0LFxuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0dJRixcbiAgICAgICAgICAgIHNpemU6IDM1MzQsXG4gICAgICAgICAgICBwYXRoOiAnYWIvYWJjZGVmZ2hpJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBjb250YWN0OiBbXSxcbiAgICAgICAgcHJldmlldzogW10sXG4gICAgICB9KTtcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1zaGFkb3dcbiAgICAgIGNvbnN0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YSA9IGFzeW5jIChcbiAgICAgICAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ2RhdGEnIHwgJ3BhdGgnPlxuICAgICAgKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChhdHRhY2htZW50LnBhdGgsICdhYi9hYmNkZWZnaGknKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIEJ5dGVzLnRvU3RyaW5nKGF0dGFjaG1lbnQuZGF0YSB8fCBuZXcgVWludDhBcnJheSgpKSxcbiAgICAgICAgICAnSXRcdTIwMTlzIGVhc3kgaWYgeW91IHRyeSdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICdwYXRoJztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IE1lc3NhZ2UuY3JlYXRlQXR0YWNobWVudERhdGFXcml0ZXIoe1xuICAgICAgICB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHByb2Nlc3MgcXVvdGUgYXR0YWNobWVudCB0aHVtYm5haWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICBpZDogMzUyMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdzb21lLW1lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdhYi9hYmNkZWZnaGknLFxuICAgICAgICAgICAgICAgIGRhdGE6IEJ5dGVzLmZyb21TdHJpbmcoJ0l0XHUyMDE5cyBlYXN5IGlmIHlvdSB0cnknKSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICBpZDogMzUyMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdzb21lLW1lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHRodW1ibmFpbDoge1xuICAgICAgICAgICAgICAgIHBhdGg6ICdhYi9hYmNkZWZnaGknLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBjb250YWN0OiBbXSxcbiAgICAgICAgcHJldmlldzogW10sXG4gICAgICB9KTtcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1zaGFkb3dcbiAgICAgIGNvbnN0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YSA9IGFzeW5jIChcbiAgICAgICAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ2RhdGEnIHwgJ3BhdGgnPlxuICAgICAgKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChhdHRhY2htZW50LnBhdGgsICdhYi9hYmNkZWZnaGknKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIEJ5dGVzLnRvU3RyaW5nKGF0dGFjaG1lbnQuZGF0YSB8fCBuZXcgVWludDhBcnJheSgpKSxcbiAgICAgICAgICAnSXRcdTIwMTlzIGVhc3kgaWYgeW91IHRyeSdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICdwYXRoJztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IE1lc3NhZ2UuY3JlYXRlQXR0YWNobWVudERhdGFXcml0ZXIoe1xuICAgICAgICB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHByb2Nlc3MgY29udGFjdCBhdmF0YXJzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICAgIGF0dGFjaG1lbnRzOiBbXSxcbiAgICAgICAgY29udGFjdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IHsgZ2l2ZW5OYW1lOiAnam9obicgfSxcbiAgICAgICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgICAgICBpc1Byb2ZpbGU6IGZhbHNlLFxuICAgICAgICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9QTkcsXG4gICAgICAgICAgICAgICAgc2l6ZTogNDcsXG4gICAgICAgICAgICAgICAgcGF0aDogJ2FiL2FiY2RlZmdoaScsXG4gICAgICAgICAgICAgICAgZGF0YTogQnl0ZXMuZnJvbVN0cmluZygnSXRcdTIwMTlzIGVhc3kgaWYgeW91IHRyeScpLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgYm9keTogJ0ltYWdpbmUgdGhlcmUgaXMgbm8gaGVhdmVuXHUyMDI2JyxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogNCxcbiAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICBjb250YWN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogeyBnaXZlbk5hbWU6ICdqb2huJyB9LFxuICAgICAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgICAgIGlzUHJvZmlsZTogZmFsc2UsXG4gICAgICAgICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX1BORyxcbiAgICAgICAgICAgICAgICBzaXplOiA0NyxcbiAgICAgICAgICAgICAgICBwYXRoOiAnYWIvYWJjZGVmZ2hpJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgcHJldmlldzogW10sXG4gICAgICB9KTtcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1zaGFkb3dcbiAgICAgIGNvbnN0IHdyaXRlRXhpc3RpbmdBdHRhY2htZW50RGF0YSA9IGFzeW5jIChcbiAgICAgICAgYXR0YWNobWVudDogUGljazxBdHRhY2htZW50VHlwZSwgJ2RhdGEnIHwgJ3BhdGgnPlxuICAgICAgKSA9PiB7XG4gICAgICAgIGFzc2VydC5lcXVhbChhdHRhY2htZW50LnBhdGgsICdhYi9hYmNkZWZnaGknKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIEJ5dGVzLnRvU3RyaW5nKGF0dGFjaG1lbnQuZGF0YSB8fCBuZXcgVWludDhBcnJheSgpKSxcbiAgICAgICAgICAnSXRcdTIwMTlzIGVhc3kgaWYgeW91IHRyeSdcbiAgICAgICAgKTtcbiAgICAgICAgcmV0dXJuICdwYXRoJztcbiAgICAgIH07XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IE1lc3NhZ2UuY3JlYXRlQXR0YWNobWVudERhdGFXcml0ZXIoe1xuICAgICAgICB3cml0ZUV4aXN0aW5nQXR0YWNobWVudERhdGEsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pKGlucHV0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgICByZXR1cm4gJ3BhdGgnO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaW5pdGlhbGl6ZVNjaGVtYVZlcnNpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3Nob3VsZCBpZ25vcmUgbWVzc2FnZXMgd2l0aCBwcmV2aW91c2x5IGluaGVyaXRlZCBzY2hlbWEnLCAoKSA9PiB7XG4gICAgICBjb25zdCBpbnB1dCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgYm9keTogJ0ltYWdpbmUgdGhlcmUgaXMgbm8gaGVhdmVuXHUyMDI2JyxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogMixcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDIsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gTWVzc2FnZS5pbml0aWFsaXplU2NoZW1hVmVyc2lvbih7XG4gICAgICAgIG1lc3NhZ2U6IGlucHV0LFxuICAgICAgICBsb2dnZXIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb250ZXh0KCdmb3IgbWVzc2FnZSB3aXRob3V0IGF0dGFjaG1lbnRzJywgKCkgPT4ge1xuICAgICAgaXQoJ3Nob3VsZCBpbml0aWFsaXplIHNjaGVtYSB2ZXJzaW9uIHRvIHplcm8nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlucHV0ID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICAgIGJvZHk6ICdJbWFnaW5lIHRoZXJlIGlzIG5vIGhlYXZlblx1MjAyNicsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgICAgYm9keTogJ0ltYWdpbmUgdGhlcmUgaXMgbm8gaGVhdmVuXHUyMDI2JyxcbiAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gTWVzc2FnZS5pbml0aWFsaXplU2NoZW1hVmVyc2lvbih7XG4gICAgICAgICAgbWVzc2FnZTogaW5wdXQsXG4gICAgICAgICAgbG9nZ2VyLFxuICAgICAgICB9KTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgY29udGV4dCgnZm9yIG1lc3NhZ2Ugd2l0aCBhdHRhY2htZW50cycsICgpID0+IHtcbiAgICAgIGl0KCdzaG91bGQgaW5oZXJpdCBleGlzdGluZyBhdHRhY2htZW50IHNjaGVtYSB2ZXJzaW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgICBib2R5OiAnSW1hZ2luZSB0aGVyZSBpcyBubyBoZWF2ZW5cdTIwMjYnLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLklNQUdFX0pQRUcsXG4gICAgICAgICAgICAgIHNpemU6IDQ1LFxuICAgICAgICAgICAgICBmaWxlTmFtZTogJ2xlbm5vbi5qcGcnLFxuICAgICAgICAgICAgICBzY2hlbWFWZXJzaW9uOiA3LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgICAgYm9keTogJ0ltYWdpbmUgdGhlcmUgaXMgbm8gaGVhdmVuXHUyMDI2JyxcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogTUlNRS5JTUFHRV9KUEVHLFxuICAgICAgICAgICAgICBzaXplOiA0NSxcbiAgICAgICAgICAgICAgZmlsZU5hbWU6ICdsZW5ub24uanBnJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBzY2hlbWFWZXJzaW9uOiA3LFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBhY3R1YWwgPSBNZXNzYWdlLmluaXRpYWxpemVTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgICBtZXNzYWdlOiBpbnB1dCxcbiAgICAgICAgICBsb2dnZXIsXG4gICAgICAgIH0pO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd1cGdyYWRlU2NoZW1hJywgKCkgPT4ge1xuICAgIGl0KCdzaG91bGQgdXBncmFkZSBhbiB1bnZlcnNpb25lZCBtZXNzYWdlIHRvIHRoZSBsYXRlc3QgdmVyc2lvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGlucHV0ID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLkFVRElPX0FBQyxcbiAgICAgICAgICAgIGZsYWdzOiBTaWduYWxTZXJ2aWNlLkF0dGFjaG1lbnRQb2ludGVyLkZsYWdzLlZPSUNFX01FU1NBR0UsXG4gICAgICAgICAgICBkYXRhOiBCeXRlcy5mcm9tU3RyaW5nKCdJdFx1MjAxOXMgZWFzeSBpZiB5b3UgdHJ5JyksXG4gICAgICAgICAgICBmaWxlTmFtZTogJ3Rlc3RcXHUyMDJEZmlnLmV4ZScsXG4gICAgICAgICAgICBzaXplOiAxMTExLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDAsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLkFVRElPX0FBQyxcbiAgICAgICAgICAgIGZsYWdzOiAxLFxuICAgICAgICAgICAgcGF0aDogJ2FiYy9hYmNkZWZnJyxcbiAgICAgICAgICAgIGZpbGVOYW1lOiAndGVzdFxcdUZGRkRmaWcuZXhlJyxcbiAgICAgICAgICAgIHNpemU6IDExMTEsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgaGFzQXR0YWNobWVudHM6IDEsXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHM6IHVuZGVmaW5lZCxcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzOiB1bmRlZmluZWQsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IE1lc3NhZ2UuQ1VSUkVOVF9TQ0hFTUFfVkVSU0lPTixcbiAgICAgICAgY29udGFjdDogW10sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgZXhwZWN0ZWRBdHRhY2htZW50RGF0YSA9ICdJdFx1MjAxOXMgZWFzeSBpZiB5b3UgdHJ5JztcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBnZXREZWZhdWx0Q29udGV4dCh7XG4gICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGE6IGFzeW5jIGF0dGFjaG1lbnREYXRhID0+IHtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgICBCeXRlcy50b1N0cmluZyhhdHRhY2htZW50RGF0YSksXG4gICAgICAgICAgICBleHBlY3RlZEF0dGFjaG1lbnREYXRhXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gJ2FiYy9hYmNkZWZnJztcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgTWVzc2FnZS51cGdyYWRlU2NoZW1hKGlucHV0LCBjb250ZXh0KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBjb250ZXh0KCd3aXRoIG11bHRpcGxlIHVwZ3JhZGUgc3RlcHMnLCAoKSA9PiB7XG4gICAgICBpdCgnc2hvdWxkIHJldHVybiBsYXN0IHZhbGlkIG1lc3NhZ2Ugd2hlbiBhbnkgdXBncmFkZSBzdGVwIGZhaWxzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjb25zdCBpbnB1dCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBjb250ZW50VHlwZTogTUlNRS5BUFBMSUNBVElPTl9KU09OLFxuICAgICAgICAgICAgICBmaWxlTmFtZTogJ3Rlc3RcXHUyMDJEZmlnLmV4ZScsXG4gICAgICAgICAgICAgIHNpemU6IDExMTEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgYm9keTogJ3N0YXJ0JyxcbiAgICAgICAgICBzY2hlbWFWZXJzaW9uOiAwLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6IE1JTUUuQVBQTElDQVRJT05fSlNPTixcbiAgICAgICAgICAgICAgZmlsZU5hbWU6ICd0ZXN0XFx1MjAyRGZpZy5leGUnLFxuICAgICAgICAgICAgICBzaXplOiAxMTExLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGJvZHk6ICdzdGFydCArMScsXG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdjEgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgYm9keTogYCR7bWVzc2FnZS5ib2R5fSArMWAsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2MiA9IGFzeW5jICgpID0+IHtcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Jvb20nKTtcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgdjMgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgYm9keTogYCR7bWVzc2FnZS5ib2R5fSArM2AsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHRvVmVyc2lvbjEgPSBNZXNzYWdlLl93aXRoU2NoZW1hVmVyc2lvbih7XG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMSxcbiAgICAgICAgICB1cGdyYWRlOiB2MSxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRvVmVyc2lvbjIgPSBNZXNzYWdlLl93aXRoU2NoZW1hVmVyc2lvbih7XG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMixcbiAgICAgICAgICB1cGdyYWRlOiB2MixcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHRvVmVyc2lvbjMgPSBNZXNzYWdlLl93aXRoU2NoZW1hVmVyc2lvbih7XG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMyxcbiAgICAgICAgICB1cGdyYWRlOiB2MyxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pO1xuICAgICAgICBjb25zdCB1cGdyYWRlU2NoZW1hID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSkgPT5cbiAgICAgICAgICB0b1ZlcnNpb24zKFxuICAgICAgICAgICAgYXdhaXQgdG9WZXJzaW9uMihhd2FpdCB0b1ZlcnNpb24xKG1lc3NhZ2UsIGNvbnRleHQpLCBjb250ZXh0KSxcbiAgICAgICAgICAgIGNvbnRleHRcbiAgICAgICAgICApO1xuXG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IHVwZ3JhZGVTY2hlbWEoaW5wdXQpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzaG91bGQgc2tpcCBvdXQtb2Ytb3JkZXIgdXBncmFkZSBzdGVwcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgaW5wdXQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6IE1JTUUuQVBQTElDQVRJT05fSlNPTixcbiAgICAgICAgICAgICAgZmlsZU5hbWU6ICd0ZXN0XFx1MjAyRGZpZy5leGUnLFxuICAgICAgICAgICAgICBzaXplOiAxMTExLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGJvZHk6ICdzdGFydCcsXG4gICAgICAgICAgc2NoZW1hVmVyc2lvbjogMCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBNSU1FLkFQUExJQ0FUSU9OX0pTT04sXG4gICAgICAgICAgICAgIGZpbGVOYW1lOiAndGVzdFxcdTIwMkRmaWcuZXhlJyxcbiAgICAgICAgICAgICAgc2l6ZTogMTExMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgICBib2R5OiAnc3RhcnQgKzEgKzInLFxuICAgICAgICAgIHNjaGVtYVZlcnNpb246IDIsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHYxID0gYXN5bmMgKG1lc3NhZ2U6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSkgPT4gKHtcbiAgICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICAgIGJvZHk6IGAke21lc3NhZ2UuYm9keX0gKzFgLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdjIgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSA9PiAoe1xuICAgICAgICAgIC4uLm1lc3NhZ2UsXG4gICAgICAgICAgYm9keTogYCR7bWVzc2FnZS5ib2R5fSArMmAsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCB2MyA9IGFzeW5jIChtZXNzYWdlOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUpID0+ICh7XG4gICAgICAgICAgLi4ubWVzc2FnZSxcbiAgICAgICAgICBib2R5OiBgJHttZXNzYWdlLmJvZHl9ICszYCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgdG9WZXJzaW9uMSA9IE1lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgICBzY2hlbWFWZXJzaW9uOiAxLFxuICAgICAgICAgIHVwZ3JhZGU6IHYxLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdG9WZXJzaW9uMiA9IE1lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgICBzY2hlbWFWZXJzaW9uOiAyLFxuICAgICAgICAgIHVwZ3JhZGU6IHYyLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgdG9WZXJzaW9uMyA9IE1lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgICBzY2hlbWFWZXJzaW9uOiAzLFxuICAgICAgICAgIHVwZ3JhZGU6IHYzLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBjb250ZXh0ID0gZ2V0RGVmYXVsdENvbnRleHQoeyBsb2dnZXIgfSk7XG4gICAgICAgIGNvbnN0IGF0VmVyc2lvbjEgPSBhd2FpdCB0b1ZlcnNpb24xKGlucHV0LCBjb250ZXh0KTtcblxuICAgICAgICAvLyBOb3RlOiB0aGlzIHdpbGwgZmFpbCB0byBhcHBseSBhbmQgbG9nLCBzaW5jZSBpdCdzIGp1bXBpbmcgdHdvIHZlcnNpb25zIHVwXG4gICAgICAgIGNvbnN0IGF0VmVyc2lvbjMgPSBhd2FpdCB0b1ZlcnNpb24zKGF0VmVyc2lvbjEsIGNvbnRleHQpO1xuXG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IHRvVmVyc2lvbjIoYXRWZXJzaW9uMywgY29udGV4dCk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ193aXRoU2NoZW1hVmVyc2lvbicsICgpID0+IHtcbiAgICBpdCgnc2hvdWxkIHJlcXVpcmUgYSB2ZXJzaW9uIG51bWJlcicsICgpID0+IHtcbiAgICAgIGNvbnN0IHRvVmVyc2lvblggPSAoKSA9PiBudWxsO1xuICAgICAgYXNzZXJ0LnRocm93cyhcbiAgICAgICAgKCkgPT5cbiAgICAgICAgICBNZXNzYWdlLl93aXRoU2NoZW1hVmVyc2lvbih7XG4gICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICAgICAgc2NoZW1hVmVyc2lvbjogdG9WZXJzaW9uWCBhcyBhbnksXG4gICAgICAgICAgICB1cGdyYWRlOiAoKSA9PiBQcm9taXNlLnJlc29sdmUoZ2V0RGVmYXVsdE1lc3NhZ2UoKSksXG4gICAgICAgICAgfSksXG4gICAgICAgICdfd2l0aFNjaGVtYVZlcnNpb246IHNjaGVtYVZlcnNpb24gaXMgaW52YWxpZCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHJlcXVpcmUgYW4gdXBncmFkZSBmdW5jdGlvbicsICgpID0+IHtcbiAgICAgIGFzc2VydC50aHJvd3MoXG4gICAgICAgICgpID0+XG4gICAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgICAgICBNZXNzYWdlLl93aXRoU2NoZW1hVmVyc2lvbih7IHNjaGVtYVZlcnNpb246IDIsIHVwZ3JhZGU6IDMgYXMgYW55IH0pLFxuICAgICAgICAnX3dpdGhTY2hlbWFWZXJzaW9uOiB1cGdyYWRlIG11c3QgYmUgYSBmdW5jdGlvbidcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgnc2hvdWxkIHNraXAgdXBncmFkaW5nIGlmIG1lc3NhZ2UgaGFzIGFscmVhZHkgYmVlbiB1cGdyYWRlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGUgPSBhc3luYyAobWVzc2FnZTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlKSA9PiAoe1xuICAgICAgICAuLi5tZXNzYWdlLFxuICAgICAgICBmb286IHRydWUsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVXaXRoVmVyc2lvbiA9IE1lc3NhZ2UuX3dpdGhTY2hlbWFWZXJzaW9uKHtcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogMyxcbiAgICAgICAgdXBncmFkZSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbnB1dCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgaWQ6ICdndWlkLWd1aWQtZ3VpZC1ndWlkJyxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogNCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGlkOiAnZ3VpZC1ndWlkLWd1aWQtZ3VpZCcsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDQsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IHVwZ3JhZGVXaXRoVmVyc2lvbihcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdzaG91bGQgcmV0dXJuIG9yaWdpbmFsIG1lc3NhZ2UgaWYgdXBncmFkZSBmdW5jdGlvbiB0aHJvd3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ2Jvb20hJyk7XG4gICAgICB9O1xuICAgICAgY29uc3QgdXBncmFkZVdpdGhWZXJzaW9uID0gTWVzc2FnZS5fd2l0aFNjaGVtYVZlcnNpb24oe1xuICAgICAgICBzY2hlbWFWZXJzaW9uOiAzLFxuICAgICAgICB1cGdyYWRlLFxuICAgICAgfSk7XG5cbiAgICAgIGNvbnN0IGlucHV0ID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBpZDogJ2d1aWQtZ3VpZC1ndWlkLWd1aWQnLFxuICAgICAgICBzY2hlbWFWZXJzaW9uOiAwLFxuICAgICAgfSk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgaWQ6ICdndWlkLWd1aWQtZ3VpZC1ndWlkJyxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogMCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgdXBncmFkZVdpdGhWZXJzaW9uKFxuICAgICAgICBpbnB1dCxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnRleHQoeyBsb2dnZXIgfSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCByZXR1cm4gb3JpZ2luYWwgbWVzc2FnZSBpZiB1cGdyYWRlIGZ1bmN0aW9uIHJldHVybnMgbnVsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGUgPSBhc3luYyAoKSA9PiBudWxsO1xuICAgICAgY29uc3QgdXBncmFkZVdpdGhWZXJzaW9uID0gTWVzc2FnZS5fd2l0aFNjaGVtYVZlcnNpb24oe1xuICAgICAgICBzY2hlbWFWZXJzaW9uOiAzLFxuICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgICB1cGdyYWRlOiB1cGdyYWRlIGFzIGFueSxcbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBpbnB1dCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgaWQ6ICdndWlkLWd1aWQtZ3VpZC1ndWlkJyxcbiAgICAgICAgc2NoZW1hVmVyc2lvbjogMCxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGlkOiAnZ3VpZC1ndWlkLWd1aWQtZ3VpZCcsXG4gICAgICAgIHNjaGVtYVZlcnNpb246IDAsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IHVwZ3JhZGVXaXRoVmVyc2lvbihcbiAgICAgICAgaW5wdXQsXG4gICAgICAgIGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ19tYXBRdW90ZWRBdHRhY2htZW50cycsICgpID0+IHtcbiAgICBpdCgnaGFuZGxlcyBtZXNzYWdlIHdpdGggbm8gcXVvdGUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlQXR0YWNobWVudCA9IHNpbm9uXG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLnRocm93cyhuZXcgRXJyb3IoXCJTaG91bGRuJ3QgYmUgY2FsbGVkXCIpKTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVWZXJzaW9uID0gTWVzc2FnZS5fbWFwUXVvdGVkQXR0YWNobWVudHModXBncmFkZUF0dGFjaG1lbnQpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnaGV5IHRoZXJlIScsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZ3JhZGVWZXJzaW9uKG1lc3NhZ2UsIGdldERlZmF1bHRDb250ZXh0KCkpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgcXVvdGUgd2l0aCBubyBhdHRhY2htZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub25cbiAgICAgICAgLnN0dWIoKVxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihcIlNob3VsZG4ndCBiZSBjYWxsZWRcIikpO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBNZXNzYWdlLl9tYXBRdW90ZWRBdHRhY2htZW50cyh1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICB0ZXh0OiAnaGV5IScsXG4gICAgICAgICAgaWQ6IDM0MjMzLFxuICAgICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2VJZDogJ21lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIH0gYXMgYW55LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgYm9keTogJ2hleSB0aGVyZSEnLFxuICAgICAgICBxdW90ZToge1xuICAgICAgICAgIHRleHQ6ICdoZXkhJyxcbiAgICAgICAgICBhdHRhY2htZW50czogW10sXG4gICAgICAgICAgaWQ6IDM0MjMzLFxuICAgICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2VJZDogJ21lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnRleHQoeyBsb2dnZXIgfSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgemVybyBhdHRhY2htZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub25cbiAgICAgICAgLnN0dWIoKVxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihcIlNob3VsZG4ndCBiZSBjYWxsZWRcIikpO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBNZXNzYWdlLl9tYXBRdW90ZWRBdHRhY2htZW50cyh1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICB0ZXh0OiAnaGV5IScsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICAgIGlkOiAzNDIzMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdtZXNzYWdlLWlkJyxcbiAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBncmFkZVZlcnNpb24oXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIG1lc3NhZ2UpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2hhbmRsZXMgYXR0YWNobWVudHMgd2l0aCBubyB0aHVtYm5haWwnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlQXR0YWNobWVudCA9IHNpbm9uXG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLnRocm93cyhuZXcgRXJyb3IoXCJTaG91bGRuJ3QgYmUgY2FsbGVkXCIpKTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVWZXJzaW9uID0gTWVzc2FnZS5fbWFwUXVvdGVkQXR0YWNobWVudHModXBncmFkZUF0dGFjaG1lbnQpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnaGV5IHRoZXJlIScsXG4gICAgICAgIHF1b3RlOiB7XG4gICAgICAgICAgdGV4dDogJ2hleSEnLFxuICAgICAgICAgIGF0dGFjaG1lbnRzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGZpbGVOYW1lOiAnbWFuaWZlc3RvLnR4dCcsXG4gICAgICAgICAgICAgIGNvbnRlbnRUeXBlOiAndGV4dC9wbGFpbicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaWQ6IDM0MjMzLFxuICAgICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2VJZDogJ21lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgZ2V0RGVmYXVsdENvbnRleHQoeyBsb2dnZXIgfSlcbiAgICAgICk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgbWVzc2FnZSk7XG4gICAgfSk7XG5cbiAgICBpdCgnZG9lcyBub3QgZWxpbWluYXRlIHRodW1ibmFpbHMgd2l0aCBtaXNzaW5nIGRhdGEgZmllbGQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlQXR0YWNobWVudCA9IHNpbm9uXG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLnJldHVybnMoeyBmaWxlTmFtZTogJ3Byb2Nlc3NlZCEnIH0pO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBNZXNzYWdlLl9tYXBRdW90ZWRBdHRhY2htZW50cyh1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICB0ZXh0OiAnaGV5IScsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZmlsZU5hbWU6ICdjYXQuZ2lmJyxcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9naWYnLFxuICAgICAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ25vdCB5ZXQgZG93bmxvYWRlZCEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGlkOiAzNDIzMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdtZXNzYWdlLWlkJyxcbiAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICB0ZXh0OiAnaGV5IScsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9naWYnLFxuICAgICAgICAgICAgICBmaWxlTmFtZTogJ2NhdC5naWYnLFxuICAgICAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgICAgICBmaWxlTmFtZTogJ3Byb2Nlc3NlZCEnLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGlkOiAzNDIzMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdtZXNzYWdlLWlkJyxcbiAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBncmFkZVZlcnNpb24oXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdjYWxscyBwcm92aWRlZCBhc3luYyBmdW5jdGlvbiBmb3IgZWFjaCBxdW90ZWQgYXR0YWNobWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub24uc3R1YigpLnJlc29sdmVzKHtcbiAgICAgICAgcGF0aDogJy9uZXcvcGF0aC9vbi9kaXNrJyxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBNZXNzYWdlLl9tYXBRdW90ZWRBdHRhY2htZW50cyh1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgcXVvdGU6IHtcbiAgICAgICAgICB0ZXh0OiAnaGV5IScsXG4gICAgICAgICAgYXR0YWNobWVudHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdGh1bWJuYWlsOiB7XG4gICAgICAgICAgICAgICAgZGF0YTogJ2RhdGEgaXMgaGVyZScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgICAgaWQ6IDM0MjMzLFxuICAgICAgICAgIGlzVmlld09uY2U6IGZhbHNlLFxuICAgICAgICAgIG1lc3NhZ2VJZDogJ21lc3NhZ2UtaWQnLFxuICAgICAgICAgIHJlZmVyZW5jZWRNZXNzYWdlTm90Rm91bmQ6IGZhbHNlLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBjb25zdCBleHBlY3RlZCA9IGdldERlZmF1bHRNZXNzYWdlKHtcbiAgICAgICAgYm9keTogJ2hleSB0aGVyZSEnLFxuICAgICAgICBxdW90ZToge1xuICAgICAgICAgIHRleHQ6ICdoZXkhJyxcbiAgICAgICAgICBhdHRhY2htZW50czogW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICB0aHVtYm5haWw6IHtcbiAgICAgICAgICAgICAgICBwYXRoOiAnL25ldy9wYXRoL29uL2Rpc2snLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICAgIGlkOiAzNDIzMyxcbiAgICAgICAgICBpc1ZpZXdPbmNlOiBmYWxzZSxcbiAgICAgICAgICBtZXNzYWdlSWQ6ICdtZXNzYWdlLWlkJyxcbiAgICAgICAgICByZWZlcmVuY2VkTWVzc2FnZU5vdEZvdW5kOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBncmFkZVZlcnNpb24oXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGdldERlZmF1bHRDb250ZXh0KHsgbG9nZ2VyIH0pXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ19tYXBDb250YWN0JywgKCkgPT4ge1xuICAgIGl0KCdoYW5kbGVzIG1lc3NhZ2Ugd2l0aCBubyBjb250YWN0IGZpZWxkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXBncmFkZUNvbnRhY3QgPSBzaW5vblxuICAgICAgICAuc3R1YigpXG4gICAgICAgIC50aHJvd3MobmV3IEVycm9yKFwiU2hvdWxkbid0IGJlIGNhbGxlZFwiKSk7XG4gICAgICBjb25zdCB1cGdyYWRlVmVyc2lvbiA9IE1lc3NhZ2UuX21hcENvbnRhY3QodXBncmFkZUNvbnRhY3QpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnaGV5IHRoZXJlIScsXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnaGV5IHRoZXJlIScsXG4gICAgICAgIGNvbnRhY3Q6IFtdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihtZXNzYWdlLCBnZXREZWZhdWx0Q29udGV4dCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnaGFuZGxlcyBvbmUgY29udGFjdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVDb250YWN0ID0gKGNvbnRhY3Q6IEVtYmVkZGVkQ29udGFjdFR5cGUpID0+XG4gICAgICAgIFByb21pc2UucmVzb2x2ZShjb250YWN0KTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVWZXJzaW9uID0gTWVzc2FnZS5fbWFwQ29udGFjdCh1cGdyYWRlQ29udGFjdCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBnZXREZWZhdWx0TWVzc2FnZSh7XG4gICAgICAgIGJvZHk6ICdoZXkgdGhlcmUhJyxcbiAgICAgICAgY29udGFjdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIHNvbWV3aGVyZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9KTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gZ2V0RGVmYXVsdE1lc3NhZ2Uoe1xuICAgICAgICBib2R5OiAnaGV5IHRoZXJlIScsXG4gICAgICAgIGNvbnRhY3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU29tZW9uZSBzb21ld2hlcmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfSk7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihtZXNzYWdlLCBnZXREZWZhdWx0Q29udGV4dCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBRXZCLGNBQXlCO0FBQ3pCLHNCQUE4QjtBQUM5QixZQUF1QjtBQUN2QixXQUFzQjtBQU90QixTQUFTLFdBQVcsTUFBTTtBQUN4QixRQUFNLFNBQXFCO0FBQUEsSUFDekIsTUFBTSxNQUFNO0FBQUEsSUFDWixPQUFPLE1BQU07QUFBQSxJQUNiLE9BQU8sTUFBTTtBQUFBLElBQ2IsTUFBTSxNQUFNO0FBQUEsSUFDWixPQUFPLE1BQU07QUFBQSxJQUNiLE9BQU8sTUFBTTtBQUFBLEVBQ2Y7QUFFQSw2QkFDRSxPQUN1QjtBQUN2QixXQUFPO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixTQUFTO0FBQUEsTUFDVCxhQUFhO0FBQUEsTUFDYixXQUFXO0FBQUEsTUFDWCxnQkFBZ0I7QUFBQSxTQUNiO0FBQUEsSUFDTDtBQUFBLEVBQ0Y7QUFaUyxBQWNULDZCQUNFLE9BQ3FCO0FBQ3JCLFdBQU87QUFBQSxNQUNMLDJCQUEyQixDQUFDLFVBQzFCO0FBQUEsTUFDRix3QkFBd0IsQ0FBQyxVQUFrQjtBQUFBLE1BQzNDLG9CQUFvQixPQUFPLFlBR3BCO0FBQUEsUUFDTCxPQUFPO0FBQUEsUUFDUCxRQUFRO0FBQUEsTUFDVjtBQUFBLE1BQ0EsZUFBZSxNQUFNO0FBQUEsTUFDckI7QUFBQSxNQUNBLG9CQUFvQixPQUFPLFlBS3JCLElBQUksS0FBSztBQUFBLE1BQ2YsZUFBZSxDQUNiLE9BQ0EsaUJBQ0c7QUFBQSxNQUNMLHFCQUFxQixPQUFPLFlBSXRCLElBQUksS0FBSztBQUFBLE1BQ2YsaUJBQWlCLENBQUMsZUFBdUI7QUFBQSxN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O0FBQUEsVUFDQSxJQUFJO0FBQUEsVUFDSixZQUFZO0FBQUEsVUFDWixXQUFXO0FBQUEsVUFDWCwyQkFBMkI7QUFBQSxRQUM3QjtBQUFBLE1BQ0YsQ0FBQztBQUNELFlBQU0sU0FBUyxNQUFNLGVBQ25CLFNBQ0Esa0JBQWtCLEVBQUUsT0FBTyxDQUFDLENBQzlCO0FBQ0EseUJBQU8sVUFBVSxRQUFRLFFBQVE7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBRUQsV0FBUyxlQUFlLE1BQU07QUFDNUIsT0FBRyx5Q0FBeUMsWUFBWTtBQUN0RCxZQUFNLGlCQUFpQixNQUNwQixLQUFLLEVBQ0wsT0FBTyxJQUFJLE1BQU0scUJBQXFCLENBQUM7QUFDMUMsWUFBTSxpQkFBaUIsUUFBUSxZQUFZLGNBQWM7QUFFekQsWUFBTSxVQUFVLGtCQUFrQjtBQUFBLFFBQ2hDLE1BQU07QUFBQSxNQUNSLENBQUM7QUFDRCxZQUFNLFdBQVcsa0JBQWtCO0FBQUEsUUFDakMsTUFBTTtBQUFBLFFBQ04sU0FBUyxDQUFDO0FBQUEsTUFDWixDQUFDO0FBQ0QsWUFBTSxTQUFTLE1BQU0sZUFBZSxTQUFTLGtCQUFrQixDQUFDO0FBQ2hFLHlCQUFPLFVBQVUsUUFBUSxRQUFRO0FBQUEsSUFDbkMsQ0FBQztBQUVELE9BQUcsdUJBQXVCLFlBQVk7QUFDcEMsWUFBTSxpQkFBaUIsd0JBQUMsWUFDdEIsUUFBUSxRQUFRLE9BQU8sR0FERjtBQUV2QixZQUFNLGlCQUFpQixRQUFRLFlBQVksY0FBYztBQUV6RCxZQUFNLFVBQVUsa0JBQWtCO0FBQUEsUUFDaEMsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxjQUNKLGFBQWE7QUFBQSxZQUNmO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFDRCxZQUFNLFdBQVcsa0JBQWtCO0FBQUEsUUFDakMsTUFBTTtBQUFBLFFBQ04sU0FBUztBQUFBLFVBQ1A7QUFBQSxZQUNFLE1BQU07QUFBQSxjQUNKLGFBQWE7QUFBQSxZQUNmO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFDRCxZQUFNLFNBQVMsTUFBTSxlQUFlLFNBQVMsa0JBQWtCLENBQUM7QUFDaEUseUJBQU8sVUFBVSxRQUFRLFFBQVE7QUFBQSxJQUNuQyxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
