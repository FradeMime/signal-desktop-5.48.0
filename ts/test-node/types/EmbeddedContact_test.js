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
var import_MIME = require("../../types/MIME");
var import_EmbeddedContact = require("../../types/EmbeddedContact");
var import_fakeAttachment = require("../../test-both/helpers/fakeAttachment");
var import_UUID = require("../../types/UUID");
describe("Contact", () => {
  const NUMBER = "+12025550099";
  const logger = {
    error: () => void 0
  };
  const writeNewAttachmentData = sinon.stub().throws(new Error("Shouldn't be called"));
  const getDefaultMessageAttrs = /* @__PURE__ */ __name(() => {
    return {
      id: "id",
      conversationId: "convo-id",
      type: "incoming",
      sent_at: 1,
      received_at: 2,
      timestamp: 1,
      body: "hey there"
    };
  }, "getDefaultMessageAttrs");
  describe("getName", () => {
    it("returns displayName if provided", () => {
      const contact = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc."
      };
      const expected = "displayName";
      const actual = (0, import_EmbeddedContact.getName)(contact);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns organization if no displayName", () => {
      const contact = {
        name: {
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc."
      };
      const expected = "Somewhere, Inc.";
      const actual = (0, import_EmbeddedContact.getName)(contact);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns givenName + familyName if no displayName or organization", () => {
      const contact = {
        name: {
          givenName: "givenName",
          familyName: "familyName"
        }
      };
      const expected = "givenName familyName";
      const actual = (0, import_EmbeddedContact.getName)(contact);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns just givenName", () => {
      const contact = {
        name: {
          givenName: "givenName"
        }
      };
      const expected = "givenName";
      const actual = (0, import_EmbeddedContact.getName)(contact);
      import_chai.assert.strictEqual(actual, expected);
    });
    it("returns just familyName", () => {
      const contact = {
        name: {
          familyName: "familyName"
        }
      };
      const expected = "familyName";
      const actual = (0, import_EmbeddedContact.getName)(contact);
      import_chai.assert.strictEqual(actual, expected);
    });
  });
  describe("embeddedContactSelector", () => {
    const regionCode = "1";
    const firstNumber = "+1202555000";
    const uuid = void 0;
    const getAbsoluteAttachmentPath = /* @__PURE__ */ __name((path) => `absolute:${path}`, "getAbsoluteAttachmentPath");
    it("eliminates avatar if it has had an attachment download error", () => {
      const contact = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: {
          isProfile: true,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            error: true,
            contentType: import_MIME.IMAGE_GIF
          })
        }
      };
      const expected = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: void 0,
        firstNumber,
        uuid,
        number: void 0
      };
      const actual = (0, import_EmbeddedContact.embeddedContactSelector)(contact, {
        regionCode,
        firstNumber,
        uuid,
        getAbsoluteAttachmentPath
      });
      import_chai.assert.deepEqual(actual, expected);
    });
    it("does not calculate absolute path if avatar is pending", () => {
      const contact = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: {
          isProfile: true,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            pending: true,
            contentType: import_MIME.IMAGE_GIF
          })
        }
      };
      const expected = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: {
          isProfile: true,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            pending: true,
            path: void 0,
            contentType: import_MIME.IMAGE_GIF
          })
        },
        firstNumber,
        uuid,
        number: void 0
      };
      const actual = (0, import_EmbeddedContact.embeddedContactSelector)(contact, {
        regionCode,
        firstNumber,
        uuid,
        getAbsoluteAttachmentPath
      });
      import_chai.assert.deepEqual(actual, expected);
    });
    it("calculates absolute path", () => {
      const fullUuid = import_UUID.UUID.generate().toString();
      const contact = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: {
          isProfile: true,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            path: "somewhere",
            contentType: import_MIME.IMAGE_GIF
          })
        }
      };
      const expected = {
        name: {
          displayName: "displayName",
          givenName: "givenName",
          familyName: "familyName"
        },
        organization: "Somewhere, Inc.",
        avatar: {
          isProfile: true,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            path: "absolute:somewhere",
            contentType: import_MIME.IMAGE_GIF
          })
        },
        firstNumber,
        uuid: fullUuid,
        number: void 0
      };
      const actual = (0, import_EmbeddedContact.embeddedContactSelector)(contact, {
        regionCode,
        firstNumber,
        uuid: fullUuid,
        getAbsoluteAttachmentPath
      });
      import_chai.assert.deepEqual(actual, expected);
    });
  });
  describe("parseAndWriteAvatar", () => {
    it("handles message with no avatar in contact", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1,
                value: NUMBER
              }
            ]
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        message,
        logger,
        getRegionCode: () => "1",
        writeNewAttachmentData
      });
      import_chai.assert.deepEqual(result, message.contact[0]);
    });
    it("turns phone numbers to e164 format", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1,
                value: "(202) 555-0099"
              }
            ]
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        },
        number: [
          {
            type: 1,
            value: "+12025550099"
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        message,
        getRegionCode: () => "US",
        logger,
        writeNewAttachmentData
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("removes contact avatar if it has no sub-avatar", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1,
                value: NUMBER
              }
            ],
            avatar: {
              isProfile: true
            }
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        },
        number: [
          {
            type: 1,
            value: NUMBER
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("writes avatar to disk", async () => {
      const upgradeAttachment = /* @__PURE__ */ __name(async () => {
        return (0, import_fakeAttachment.fakeAttachment)({
          path: "abc/abcdefg",
          contentType: import_MIME.IMAGE_PNG
        });
      }, "upgradeAttachment");
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1,
                value: NUMBER
              }
            ],
            email: [
              {
                type: 2,
                value: "someone@somewhere.com"
              }
            ],
            address: [
              {
                type: 1,
                street: "5 Somewhere Ave."
              }
            ],
            avatar: {
              otherKey: "otherValue",
              avatar: {
                contentType: "image/png",
                data: Buffer.from("It\u2019s easy if you try")
              }
            }
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        },
        number: [
          {
            type: 1,
            value: NUMBER
          }
        ],
        email: [
          {
            type: 2,
            value: "someone@somewhere.com"
          }
        ],
        address: [
          {
            type: 1,
            street: "5 Somewhere Ave."
          }
        ],
        avatar: {
          otherKey: "otherValue",
          isProfile: false,
          avatar: (0, import_fakeAttachment.fakeAttachment)({
            contentType: import_MIME.IMAGE_PNG,
            path: "abc/abcdefg"
          })
        }
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("removes number element if it ends up with no value", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1
              }
            ],
            email: [
              {
                type: 0,
                value: "someone@somewhere.com"
              }
            ]
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        },
        email: [
          {
            type: 1,
            value: "someone@somewhere.com"
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("drops address if it has no real values", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1,
                value: NUMBER
              }
            ],
            address: [
              {
                type: 1
              }
            ]
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        },
        number: [
          {
            value: NUMBER,
            type: 1
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("removes invalid elements if no values remain in contact", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        source: NUMBER,
        sourceDevice: 1,
        sent_at: 1232132,
        contact: [
          {
            name: {
              displayName: "Someone Somewhere"
            },
            number: [
              {
                type: 1
              }
            ],
            email: [
              {
                type: 1
              }
            ]
          }
        ]
      };
      const expected = {
        name: {
          displayName: "Someone Somewhere"
        }
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, expected);
    });
    it("handles a contact with just organization", async () => {
      const upgradeAttachment = sinon.stub().throws(new Error("Shouldn't be called"));
      const upgradeVersion = (0, import_EmbeddedContact.parseAndWriteAvatar)(upgradeAttachment);
      const message = {
        ...getDefaultMessageAttrs(),
        contact: [
          {
            organization: "Somewhere Consulting",
            number: [
              {
                type: 1,
                value: NUMBER
              }
            ]
          }
        ]
      };
      const result = await upgradeVersion(message.contact[0], {
        getRegionCode: () => "1",
        writeNewAttachmentData,
        message,
        logger
      });
      import_chai.assert.deepEqual(result, message.contact[0]);
    });
  });
  describe("_validate", () => {
    it("returns error if contact has no name.displayName or organization", () => {
      const messageId = "the-message-id";
      const contact = {
        name: {
          givenName: "Someone"
        },
        number: [
          {
            type: 1,
            value: NUMBER
          }
        ]
      };
      const expected = "Message the-message-id: Contact had neither 'displayName' nor 'organization'";
      const result = (0, import_EmbeddedContact._validate)(contact, { messageId });
      import_chai.assert.deepEqual(result?.message, expected);
    });
    it("logs if no values remain in contact", async () => {
      const messageId = "the-message-id";
      const contact = {
        name: {
          displayName: "Someone Somewhere"
        },
        number: [],
        email: []
      };
      const expected = "Message the-message-id: Contact had no included numbers, email or addresses";
      const result = (0, import_EmbeddedContact._validate)(contact, { messageId });
      import_chai.assert.deepEqual(result?.message, expected);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRW1iZWRkZWRDb250YWN0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgSU1BR0VfR0lGLCBJTUFHRV9QTkcgfSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IEF2YXRhciwgRW1haWwsIFBob25lIH0gZnJvbSAnLi4vLi4vdHlwZXMvRW1iZWRkZWRDb250YWN0JztcbmltcG9ydCB7XG4gIF92YWxpZGF0ZSxcbiAgZW1iZWRkZWRDb250YWN0U2VsZWN0b3IsXG4gIGdldE5hbWUsXG4gIHBhcnNlQW5kV3JpdGVBdmF0YXIsXG59IGZyb20gJy4uLy4uL3R5cGVzL0VtYmVkZGVkQ29udGFjdCc7XG5pbXBvcnQgeyBmYWtlQXR0YWNobWVudCB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VBdHRhY2htZW50JztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcblxuZGVzY3JpYmUoJ0NvbnRhY3QnLCAoKSA9PiB7XG4gIGNvbnN0IE5VTUJFUiA9ICcrMTIwMjU1NTAwOTknO1xuICBjb25zdCBsb2dnZXIgPSB7XG4gICAgZXJyb3I6ICgpID0+IHVuZGVmaW5lZCxcbiAgfTtcblxuICBjb25zdCB3cml0ZU5ld0F0dGFjaG1lbnREYXRhID0gc2lub25cbiAgICAuc3R1YigpXG4gICAgLnRocm93cyhuZXcgRXJyb3IoXCJTaG91bGRuJ3QgYmUgY2FsbGVkXCIpKTtcblxuICBjb25zdCBnZXREZWZhdWx0TWVzc2FnZUF0dHJzID0gKCk6IFBpY2s8XG4gICAgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlLFxuICAgIHwgJ2lkJ1xuICAgIHwgJ2NvbnZlcnNhdGlvbklkJ1xuICAgIHwgJ3R5cGUnXG4gICAgfCAnc2VudF9hdCdcbiAgICB8ICdyZWNlaXZlZF9hdCdcbiAgICB8ICd0aW1lc3RhbXAnXG4gICAgfCAnYm9keSdcbiAgPiA9PiB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiAnaWQnLFxuICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252by1pZCcsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgc2VudF9hdDogMSxcbiAgICAgIHJlY2VpdmVkX2F0OiAyLFxuICAgICAgdGltZXN0YW1wOiAxLFxuXG4gICAgICBib2R5OiAnaGV5IHRoZXJlJyxcbiAgICB9O1xuICB9O1xuXG4gIGRlc2NyaWJlKCdnZXROYW1lJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGRpc3BsYXlOYW1lIGlmIHByb3ZpZGVkJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udGFjdCA9IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIGRpc3BsYXlOYW1lOiAnZGlzcGxheU5hbWUnLFxuICAgICAgICAgIGdpdmVuTmFtZTogJ2dpdmVuTmFtZScsXG4gICAgICAgICAgZmFtaWx5TmFtZTogJ2ZhbWlseU5hbWUnLFxuICAgICAgICB9LFxuICAgICAgICBvcmdhbml6YXRpb246ICdTb21ld2hlcmUsIEluYy4nLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0gJ2Rpc3BsYXlOYW1lJztcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGdldE5hbWUoY29udGFjdCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBvcmdhbml6YXRpb24gaWYgbm8gZGlzcGxheU5hbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb250YWN0ID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZ2l2ZW5OYW1lOiAnZ2l2ZW5OYW1lJyxcbiAgICAgICAgICBmYW1pbHlOYW1lOiAnZmFtaWx5TmFtZScsXG4gICAgICAgIH0sXG4gICAgICAgIG9yZ2FuaXphdGlvbjogJ1NvbWV3aGVyZSwgSW5jLicsXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnU29tZXdoZXJlLCBJbmMuJztcbiAgICAgIGNvbnN0IGFjdHVhbCA9IGdldE5hbWUoY29udGFjdCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBnaXZlbk5hbWUgKyBmYW1pbHlOYW1lIGlmIG5vIGRpc3BsYXlOYW1lIG9yIG9yZ2FuaXphdGlvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBnaXZlbk5hbWU6ICdnaXZlbk5hbWUnLFxuICAgICAgICAgIGZhbWlseU5hbWU6ICdmYW1pbHlOYW1lJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdnaXZlbk5hbWUgZmFtaWx5TmFtZSc7XG4gICAgICBjb25zdCBhY3R1YWwgPSBnZXROYW1lKGNvbnRhY3QpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMganVzdCBnaXZlbk5hbWUnLCAoKSA9PiB7XG4gICAgICBjb25zdCBjb250YWN0ID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZ2l2ZW5OYW1lOiAnZ2l2ZW5OYW1lJyxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9ICdnaXZlbk5hbWUnO1xuICAgICAgY29uc3QgYWN0dWFsID0gZ2V0TmFtZShjb250YWN0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGp1c3QgZmFtaWx5TmFtZScsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBmYW1pbHlOYW1lOiAnZmFtaWx5TmFtZScsXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSAnZmFtaWx5TmFtZSc7XG4gICAgICBjb25zdCBhY3R1YWwgPSBnZXROYW1lKGNvbnRhY3QpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZW1iZWRkZWRDb250YWN0U2VsZWN0b3InLCAoKSA9PiB7XG4gICAgY29uc3QgcmVnaW9uQ29kZSA9ICcxJztcbiAgICBjb25zdCBmaXJzdE51bWJlciA9ICcrMTIwMjU1NTAwMCc7XG4gICAgY29uc3QgdXVpZCA9IHVuZGVmaW5lZDtcbiAgICBjb25zdCBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoID0gKHBhdGg6IHN0cmluZykgPT4gYGFic29sdXRlOiR7cGF0aH1gO1xuXG4gICAgaXQoJ2VsaW1pbmF0ZXMgYXZhdGFyIGlmIGl0IGhhcyBoYWQgYW4gYXR0YWNobWVudCBkb3dubG9hZCBlcnJvcicsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICBnaXZlbk5hbWU6ICdnaXZlbk5hbWUnLFxuICAgICAgICAgIGZhbWlseU5hbWU6ICdmYW1pbHlOYW1lJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3JnYW5pemF0aW9uOiAnU29tZXdoZXJlLCBJbmMuJyxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgZXJyb3I6IHRydWUsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfR0lGLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZGlzcGxheU5hbWU6ICdkaXNwbGF5TmFtZScsXG4gICAgICAgICAgZ2l2ZW5OYW1lOiAnZ2l2ZW5OYW1lJyxcbiAgICAgICAgICBmYW1pbHlOYW1lOiAnZmFtaWx5TmFtZScsXG4gICAgICAgIH0sXG4gICAgICAgIG9yZ2FuaXphdGlvbjogJ1NvbWV3aGVyZSwgSW5jLicsXG4gICAgICAgIGF2YXRhcjogdW5kZWZpbmVkLFxuICAgICAgICBmaXJzdE51bWJlcixcbiAgICAgICAgdXVpZCxcbiAgICAgICAgbnVtYmVyOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgYWN0dWFsID0gZW1iZWRkZWRDb250YWN0U2VsZWN0b3IoY29udGFjdCwge1xuICAgICAgICByZWdpb25Db2RlLFxuICAgICAgICBmaXJzdE51bWJlcixcbiAgICAgICAgdXVpZCxcbiAgICAgICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdkb2VzIG5vdCBjYWxjdWxhdGUgYWJzb2x1dGUgcGF0aCBpZiBhdmF0YXIgaXMgcGVuZGluZycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICBnaXZlbk5hbWU6ICdnaXZlbk5hbWUnLFxuICAgICAgICAgIGZhbWlseU5hbWU6ICdmYW1pbHlOYW1lJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3JnYW5pemF0aW9uOiAnU29tZXdoZXJlLCBJbmMuJyxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9HSUYsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICBnaXZlbk5hbWU6ICdnaXZlbk5hbWUnLFxuICAgICAgICAgIGZhbWlseU5hbWU6ICdmYW1pbHlOYW1lJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3JnYW5pemF0aW9uOiAnU29tZXdoZXJlLCBJbmMuJyxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgcGVuZGluZzogdHJ1ZSxcbiAgICAgICAgICAgIHBhdGg6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9HSUYsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICAgIGZpcnN0TnVtYmVyLFxuICAgICAgICB1dWlkLFxuICAgICAgICBudW1iZXI6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3R1YWwgPSBlbWJlZGRlZENvbnRhY3RTZWxlY3Rvcihjb250YWN0LCB7XG4gICAgICAgIHJlZ2lvbkNvZGUsXG4gICAgICAgIGZpcnN0TnVtYmVyLFxuICAgICAgICB1dWlkLFxuICAgICAgICBnZXRBYnNvbHV0ZUF0dGFjaG1lbnRQYXRoLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2NhbGN1bGF0ZXMgYWJzb2x1dGUgcGF0aCcsICgpID0+IHtcbiAgICAgIGNvbnN0IGZ1bGxVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ2Rpc3BsYXlOYW1lJyxcbiAgICAgICAgICBnaXZlbk5hbWU6ICdnaXZlbk5hbWUnLFxuICAgICAgICAgIGZhbWlseU5hbWU6ICdmYW1pbHlOYW1lJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3JnYW5pemF0aW9uOiAnU29tZXdoZXJlLCBJbmMuJyxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgcGF0aDogJ3NvbWV3aGVyZScsXG4gICAgICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfR0lGLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZGlzcGxheU5hbWU6ICdkaXNwbGF5TmFtZScsXG4gICAgICAgICAgZ2l2ZW5OYW1lOiAnZ2l2ZW5OYW1lJyxcbiAgICAgICAgICBmYW1pbHlOYW1lOiAnZmFtaWx5TmFtZScsXG4gICAgICAgIH0sXG4gICAgICAgIG9yZ2FuaXphdGlvbjogJ1NvbWV3aGVyZSwgSW5jLicsXG4gICAgICAgIGF2YXRhcjoge1xuICAgICAgICAgIGlzUHJvZmlsZTogdHJ1ZSxcbiAgICAgICAgICBhdmF0YXI6IGZha2VBdHRhY2htZW50KHtcbiAgICAgICAgICAgIHBhdGg6ICdhYnNvbHV0ZTpzb21ld2hlcmUnLFxuICAgICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0dJRixcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgICAgZmlyc3ROdW1iZXIsXG4gICAgICAgIHV1aWQ6IGZ1bGxVdWlkLFxuICAgICAgICBudW1iZXI6IHVuZGVmaW5lZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3R1YWwgPSBlbWJlZGRlZENvbnRhY3RTZWxlY3Rvcihjb250YWN0LCB7XG4gICAgICAgIHJlZ2lvbkNvZGUsXG4gICAgICAgIGZpcnN0TnVtYmVyLFxuICAgICAgICB1dWlkOiBmdWxsVXVpZCxcbiAgICAgICAgZ2V0QWJzb2x1dGVBdHRhY2htZW50UGF0aCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3BhcnNlQW5kV3JpdGVBdmF0YXInLCAoKSA9PiB7XG4gICAgaXQoJ2hhbmRsZXMgbWVzc2FnZSB3aXRoIG5vIGF2YXRhciBpbiBjb250YWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXBncmFkZUF0dGFjaG1lbnQgPSBzaW5vblxuICAgICAgICAuc3R1YigpXG4gICAgICAgIC50aHJvd3MobmV3IEVycm9yKFwiU2hvdWxkbid0IGJlIGNhbGxlZFwiKSk7XG4gICAgICBjb25zdCB1cGdyYWRlVmVyc2lvbiA9IHBhcnNlQW5kV3JpdGVBdmF0YXIodXBncmFkZUF0dGFjaG1lbnQpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZUF0dHJzKCksXG4gICAgICAgIGNvbnRhY3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU29tZW9uZSBTb21ld2hlcmUnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bWJlcjogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgICAgICB2YWx1ZTogTlVNQkVSLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZ3JhZGVWZXJzaW9uKG1lc3NhZ2UuY29udGFjdFswXSwge1xuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBsb2dnZXIsXG4gICAgICAgIGdldFJlZ2lvbkNvZGU6ICgpID0+ICcxJyxcbiAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIG1lc3NhZ2UuY29udGFjdFswXSk7XG4gICAgfSk7XG5cbiAgICBpdCgndHVybnMgcGhvbmUgbnVtYmVycyB0byBlMTY0IGZvcm1hdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub25cbiAgICAgICAgLnN0dWIoKVxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihcIlNob3VsZG4ndCBiZSBjYWxsZWRcIikpO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBwYXJzZUFuZFdyaXRlQXZhdGFyKHVwZ3JhZGVBdHRhY2htZW50KTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2VBdHRycygpLFxuICAgICAgICBjb250YWN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudW1iZXI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICcoMjAyKSA1NTUtMDA5OScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgIHZhbHVlOiAnKzEyMDI1NTUwMDk5JyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZ3JhZGVWZXJzaW9uKG1lc3NhZ2UuY29udGFjdFswXSwge1xuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBnZXRSZWdpb25Db2RlOiAoKSA9PiAnVVMnLFxuICAgICAgICBsb2dnZXIsXG4gICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBjb250YWN0IGF2YXRhciBpZiBpdCBoYXMgbm8gc3ViLWF2YXRhcicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub25cbiAgICAgICAgLnN0dWIoKVxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihcIlNob3VsZG4ndCBiZSBjYWxsZWRcIikpO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBwYXJzZUFuZFdyaXRlQXZhdGFyKHVwZ3JhZGVBdHRhY2htZW50KTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2VBdHRycygpLFxuICAgICAgICBjb250YWN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudW1iZXI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5VTUJFUixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgICAgaXNQcm9maWxlOiB0cnVlLFxuICAgICAgICAgICAgfSBhcyB1bmtub3duIGFzIEF2YXRhcixcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIFNvbWV3aGVyZScsXG4gICAgICAgIH0sXG4gICAgICAgIG51bWJlcjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICB2YWx1ZTogTlVNQkVSLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBncmFkZVZlcnNpb24obWVzc2FnZS5jb250YWN0WzBdLCB7XG4gICAgICAgIGdldFJlZ2lvbkNvZGU6ICgpID0+ICcxJyxcbiAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3dyaXRlcyBhdmF0YXIgdG8gZGlzaycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gYXN5bmMgKCkgPT4ge1xuICAgICAgICByZXR1cm4gZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgIHBhdGg6ICdhYmMvYWJjZGVmZycsXG4gICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgfSk7XG4gICAgICB9O1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBwYXJzZUFuZFdyaXRlQXZhdGFyKHVwZ3JhZGVBdHRhY2htZW50KTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2VBdHRycygpLFxuICAgICAgICBjb250YWN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudW1iZXI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5VTUJFUixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBlbWFpbDogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogMixcbiAgICAgICAgICAgICAgICB2YWx1ZTogJ3NvbWVvbmVAc29tZXdoZXJlLmNvbScsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgYWRkcmVzczogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgICAgICBzdHJlZXQ6ICc1IFNvbWV3aGVyZSBBdmUuJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhdmF0YXI6IHtcbiAgICAgICAgICAgICAgb3RoZXJLZXk6ICdvdGhlclZhbHVlJyxcbiAgICAgICAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgICAgICAgY29udGVudFR5cGU6ICdpbWFnZS9wbmcnLFxuICAgICAgICAgICAgICAgIGRhdGE6IEJ1ZmZlci5mcm9tKCdJdFx1MjAxOXMgZWFzeSBpZiB5b3UgdHJ5JyksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9IGFzIHVua25vd24gYXMgQXZhdGFyLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZXhwZWN0ZWQgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgIHZhbHVlOiBOVU1CRVIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgZW1haWw6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAyLFxuICAgICAgICAgICAgdmFsdWU6ICdzb21lb25lQHNvbWV3aGVyZS5jb20nLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICAgIGFkZHJlc3M6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgc3RyZWV0OiAnNSBTb21ld2hlcmUgQXZlLicsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgYXZhdGFyOiB7XG4gICAgICAgICAgb3RoZXJLZXk6ICdvdGhlclZhbHVlJyxcbiAgICAgICAgICBpc1Byb2ZpbGU6IGZhbHNlLFxuICAgICAgICAgIGF2YXRhcjogZmFrZUF0dGFjaG1lbnQoe1xuICAgICAgICAgICAgY29udGVudFR5cGU6IElNQUdFX1BORyxcbiAgICAgICAgICAgIHBhdGg6ICdhYmMvYWJjZGVmZycsXG4gICAgICAgICAgfSksXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihtZXNzYWdlLmNvbnRhY3RbMF0sIHtcbiAgICAgICAgZ2V0UmVnaW9uQ29kZTogKCkgPT4gJzEnLFxuICAgICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBsb2dnZXIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBleHBlY3RlZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmVtb3ZlcyBudW1iZXIgZWxlbWVudCBpZiBpdCBlbmRzIHVwIHdpdGggbm8gdmFsdWUnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlQXR0YWNobWVudCA9IHNpbm9uXG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLnRocm93cyhuZXcgRXJyb3IoXCJTaG91bGRuJ3QgYmUgY2FsbGVkXCIpKTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVWZXJzaW9uID0gcGFyc2VBbmRXcml0ZUF2YXRhcih1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlQXR0cnMoKSxcbiAgICAgICAgY29udGFjdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIFNvbWV3aGVyZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVtYmVyOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgUGhvbmUsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZW1haWw6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDAsXG4gICAgICAgICAgICAgICAgdmFsdWU6ICdzb21lb25lQHNvbWV3aGVyZS5jb20nLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIFNvbWV3aGVyZScsXG4gICAgICAgIH0sXG4gICAgICAgIGVtYWlsOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgIHZhbHVlOiAnc29tZW9uZUBzb21ld2hlcmUuY29tJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZ3JhZGVWZXJzaW9uKG1lc3NhZ2UuY29udGFjdFswXSwge1xuICAgICAgICBnZXRSZWdpb25Db2RlOiAoKSA9PiAnMScsXG4gICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdkcm9wcyBhZGRyZXNzIGlmIGl0IGhhcyBubyByZWFsIHZhbHVlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHVwZ3JhZGVBdHRhY2htZW50ID0gc2lub25cbiAgICAgICAgLnN0dWIoKVxuICAgICAgICAudGhyb3dzKG5ldyBFcnJvcihcIlNob3VsZG4ndCBiZSBjYWxsZWRcIikpO1xuICAgICAgY29uc3QgdXBncmFkZVZlcnNpb24gPSBwYXJzZUFuZFdyaXRlQXZhdGFyKHVwZ3JhZGVBdHRhY2htZW50KTtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2VBdHRycygpLFxuICAgICAgICBjb250YWN0OiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZToge1xuICAgICAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBudW1iZXI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5VTUJFUixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICBhZGRyZXNzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICBuYW1lOiB7XG4gICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIFNvbWV3aGVyZScsXG4gICAgICAgIH0sXG4gICAgICAgIG51bWJlcjogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHZhbHVlOiBOVU1CRVIsXG4gICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdXBncmFkZVZlcnNpb24obWVzc2FnZS5jb250YWN0WzBdLCB7XG4gICAgICAgIGdldFJlZ2lvbkNvZGU6ICgpID0+ICcxJyxcbiAgICAgICAgd3JpdGVOZXdBdHRhY2htZW50RGF0YSxcbiAgICAgICAgbWVzc2FnZSxcbiAgICAgICAgbG9nZ2VyLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdCwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JlbW92ZXMgaW52YWxpZCBlbGVtZW50cyBpZiBubyB2YWx1ZXMgcmVtYWluIGluIGNvbnRhY3QnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB1cGdyYWRlQXR0YWNobWVudCA9IHNpbm9uXG4gICAgICAgIC5zdHViKClcbiAgICAgICAgLnRocm93cyhuZXcgRXJyb3IoXCJTaG91bGRuJ3QgYmUgY2FsbGVkXCIpKTtcbiAgICAgIGNvbnN0IHVwZ3JhZGVWZXJzaW9uID0gcGFyc2VBbmRXcml0ZUF2YXRhcih1cGdyYWRlQXR0YWNobWVudCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlQXR0cnMoKSxcbiAgICAgICAgc291cmNlOiBOVU1CRVIsXG4gICAgICAgIHNvdXJjZURldmljZTogMSxcbiAgICAgICAgc2VudF9hdDogMTIzMjEzMixcbiAgICAgICAgY29udGFjdDogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6IHtcbiAgICAgICAgICAgICAgZGlzcGxheU5hbWU6ICdTb21lb25lIFNvbWV3aGVyZScsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgbnVtYmVyOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB0eXBlOiAxLFxuICAgICAgICAgICAgICB9IGFzIHVua25vd24gYXMgUGhvbmUsXG4gICAgICAgICAgICBdLFxuICAgICAgICAgICAgZW1haWw6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgIH0gYXMgdW5rbm93biBhcyBFbWFpbCxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgbmFtZToge1xuICAgICAgICAgIGRpc3BsYXlOYW1lOiAnU29tZW9uZSBTb21ld2hlcmUnLFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHVwZ3JhZGVWZXJzaW9uKG1lc3NhZ2UuY29udGFjdFswXSwge1xuICAgICAgICBnZXRSZWdpb25Db2RlOiAoKSA9PiAnMScsXG4gICAgICAgIHdyaXRlTmV3QXR0YWNobWVudERhdGEsXG4gICAgICAgIG1lc3NhZ2UsXG4gICAgICAgIGxvZ2dlcixcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIGV4cGVjdGVkKTtcbiAgICB9KTtcblxuICAgIGl0KCdoYW5kbGVzIGEgY29udGFjdCB3aXRoIGp1c3Qgb3JnYW5pemF0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdXBncmFkZUF0dGFjaG1lbnQgPSBzaW5vblxuICAgICAgICAuc3R1YigpXG4gICAgICAgIC50aHJvd3MobmV3IEVycm9yKFwiU2hvdWxkbid0IGJlIGNhbGxlZFwiKSk7XG4gICAgICBjb25zdCB1cGdyYWRlVmVyc2lvbiA9IHBhcnNlQW5kV3JpdGVBdmF0YXIodXBncmFkZUF0dGFjaG1lbnQpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZUF0dHJzKCksXG4gICAgICAgIGNvbnRhY3Q6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBvcmdhbml6YXRpb246ICdTb21ld2hlcmUgQ29uc3VsdGluZycsXG4gICAgICAgICAgICBudW1iZXI6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHR5cGU6IDEsXG4gICAgICAgICAgICAgICAgdmFsdWU6IE5VTUJFUixcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB1cGdyYWRlVmVyc2lvbihtZXNzYWdlLmNvbnRhY3RbMF0sIHtcbiAgICAgICAgZ2V0UmVnaW9uQ29kZTogKCkgPT4gJzEnLFxuICAgICAgICB3cml0ZU5ld0F0dGFjaG1lbnREYXRhLFxuICAgICAgICBtZXNzYWdlLFxuICAgICAgICBsb2dnZXIsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBtZXNzYWdlLmNvbnRhY3RbMF0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnX3ZhbGlkYXRlJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGVycm9yIGlmIGNvbnRhY3QgaGFzIG5vIG5hbWUuZGlzcGxheU5hbWUgb3Igb3JnYW5pemF0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZUlkID0gJ3RoZS1tZXNzYWdlLWlkJztcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBnaXZlbk5hbWU6ICdTb21lb25lJyxcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyOiBbXG4gICAgICAgICAge1xuICAgICAgICAgICAgdHlwZTogMSxcbiAgICAgICAgICAgIHZhbHVlOiBOVU1CRVIsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgICBjb25zdCBleHBlY3RlZCA9XG4gICAgICAgIFwiTWVzc2FnZSB0aGUtbWVzc2FnZS1pZDogQ29udGFjdCBoYWQgbmVpdGhlciAnZGlzcGxheU5hbWUnIG5vciAnb3JnYW5pemF0aW9uJ1wiO1xuXG4gICAgICBjb25zdCByZXN1bHQgPSBfdmFsaWRhdGUoY29udGFjdCwgeyBtZXNzYWdlSWQgfSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdD8ubWVzc2FnZSwgZXhwZWN0ZWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2xvZ3MgaWYgbm8gdmFsdWVzIHJlbWFpbiBpbiBjb250YWN0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZUlkID0gJ3RoZS1tZXNzYWdlLWlkJztcbiAgICAgIGNvbnN0IGNvbnRhY3QgPSB7XG4gICAgICAgIG5hbWU6IHtcbiAgICAgICAgICBkaXNwbGF5TmFtZTogJ1NvbWVvbmUgU29tZXdoZXJlJyxcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyOiBbXSxcbiAgICAgICAgZW1haWw6IFtdLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGV4cGVjdGVkID1cbiAgICAgICAgJ01lc3NhZ2UgdGhlLW1lc3NhZ2UtaWQ6IENvbnRhY3QgaGFkIG5vIGluY2x1ZGVkIG51bWJlcnMsIGVtYWlsIG9yIGFkZHJlc3Nlcyc7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IF92YWxpZGF0ZShjb250YWN0LCB7IG1lc3NhZ2VJZCB9KTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0Py5tZXNzYWdlLCBleHBlY3RlZCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBRXZCLGtCQUFxQztBQUdyQyw2QkFLTztBQUNQLDRCQUErQjtBQUMvQixrQkFBcUI7QUFFckIsU0FBUyxXQUFXLE1BQU07QUFDeEIsUUFBTSxTQUFTO0FBQ2YsUUFBTSxTQUFTO0FBQUEsSUFDYixPQUFPLE1BQU07QUFBQSxFQUNmO0FBRUEsUUFBTSx5QkFBeUIsTUFDNUIsS0FBSyxFQUNMLE9BQU8sSUFBSSxNQUFNLHFCQUFxQixDQUFDO0FBRTFDLFFBQU0seUJBQXlCLDZCQVMxQjtBQUNILFdBQU87QUFBQSxNQUNMLElBQUk7QUFBQSxNQUNKLGdCQUFnQjtBQUFBLE1BQ2hCLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULGFBQWE7QUFBQSxNQUNiLFdBQVc7QUFBQSxNQUVYLE1BQU07QUFBQSxJQUNSO0FBQUEsRUFDRixHQXBCK0I7QUFzQi9CLFdBQVMsV0FBVyxNQUFNO0FBQ3hCLE9BQUcsbUNBQW1DLE1BQU07QUFDMUMsWUFBTSxVQUFVO0FBQUEsUUFDZCxNQUFNO0FBQUEsVUFDSixhQUFhO0FBQUEsVUFDYixXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsUUFDZDtBQUFBLFFBQ0EsY0FBYztBQUFBLE1BQ2hCO0FBQ0EsWUFBTSxXQUFXO0FBQ2pCLFlBQU0sU0FBUyxvQ0FBUSxPQUFPO0FBQzlCLHlCQUFPLFlBQVksUUFBUSxRQUFRO0FBQUEsSUFDckMsQ0FBQztBQUVELE9BQUcsMENBQTBDLE1BQU07QUFDakQsWUFBTSxVQUFVO0FBQUEsUUFDZCxNQUFNO0FBQUEsVUFDSixXQUFXO0FBQUEsVUFDWCxZQUFZO0FBQUEsUUFD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
