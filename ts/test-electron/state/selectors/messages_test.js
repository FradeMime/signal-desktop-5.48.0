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
var moment = __toESM(require("moment"));
var import_uuid = require("uuid");
var import_MessageSendState = require("../../../messages/MessageSendState");
var import_message = require("../../../state/selectors/message");
describe("state/selectors/messages", () => {
  let ourConversationId;
  beforeEach(() => {
    ourConversationId = (0, import_uuid.v4)();
  });
  describe("canDeleteForEveryone", () => {
    it("returns false for incoming messages", () => {
      const message = {
        type: "incoming",
        sent_at: Date.now() - 1e3
      };
      import_chai.assert.isFalse((0, import_message.canDeleteForEveryone)(message));
    });
    it("returns false for messages that were already deleted for everyone", () => {
      const message = {
        type: "outgoing",
        deletedForEveryone: true,
        sent_at: Date.now() - 1e3,
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Read,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Delivered,
            updatedAt: Date.now()
          }
        }
      };
      import_chai.assert.isFalse((0, import_message.canDeleteForEveryone)(message));
    });
    it("returns false for messages that were are too old to delete", () => {
      const message = {
        type: "outgoing",
        sent_at: Date.now() - moment.duration(4, "hours").asMilliseconds(),
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Read,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Delivered,
            updatedAt: Date.now()
          }
        }
      };
      import_chai.assert.isFalse((0, import_message.canDeleteForEveryone)(message));
    });
    it("returns false for messages that haven't been sent to anyone", () => {
      const message = {
        type: "outgoing",
        sent_at: Date.now() - 1e3,
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Failed,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      };
      import_chai.assert.isFalse((0, import_message.canDeleteForEveryone)(message));
    });
    it("returns true for messages that meet all criteria for deletion", () => {
      const message = {
        type: "outgoing",
        sent_at: Date.now() - 1e3,
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Delivered,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Failed,
            updatedAt: Date.now()
          }
        }
      };
      import_chai.assert.isTrue((0, import_message.canDeleteForEveryone)(message));
    });
  });
  describe("canReact", () => {
    const defaultConversation = {
      id: (0, import_uuid.v4)(),
      type: "direct",
      title: "Test conversation",
      isMe: false,
      sharedGroupNames: [],
      acceptedMessageRequest: true,
      badges: []
    };
    it("returns false for disabled v1 groups", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming"
      };
      const getConversationById = /* @__PURE__ */ __name(() => ({
        ...defaultConversation,
        type: "group",
        isGroupV1AndDisabled: true
      }), "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
    it("returns false if the message was deleted for everyone", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming",
        deletedForEveryone: true
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
    it("returns false for outgoing messages that have not been sent", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
    it("returns true for outgoing messages that are only sent to yourself", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
    it("returns true for outgoing messages that have been sent to at least one person", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => ({
        ...defaultConversation,
        type: "group"
      }), "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
    it("returns true for incoming messages", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming"
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReact)(message, ourConversationId, getConversationById));
    });
  });
  describe("canReply", () => {
    const defaultConversation = {
      id: (0, import_uuid.v4)(),
      type: "direct",
      title: "Test conversation",
      isMe: false,
      sharedGroupNames: [],
      acceptedMessageRequest: true,
      badges: []
    };
    it("returns false for disabled v1 groups", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming"
      };
      const getConversationById = /* @__PURE__ */ __name(() => ({
        ...defaultConversation,
        type: "group",
        isGroupV1AndDisabled: true
      }), "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
    it("returns false if the message was deleted for everyone", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming",
        deletedForEveryone: true
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
    it("returns false for outgoing messages that have not been sent", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isFalse((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
    it("returns true for outgoing messages that are only sent to yourself", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
    it("returns true for outgoing messages that have been sent to at least one person", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "outgoing",
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          }
        }
      };
      const getConversationById = /* @__PURE__ */ __name(() => ({
        ...defaultConversation,
        type: "group"
      }), "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
    it("returns true for incoming messages", () => {
      const message = {
        conversationId: "fake-conversation-id",
        type: "incoming"
      };
      const getConversationById = /* @__PURE__ */ __name(() => defaultConversation, "getConversationById");
      import_chai.assert.isTrue((0, import_message.canReply)(message, ourConversationId, getConversationById));
    });
  });
  describe("getMessagePropStatus", () => {
    const createMessage = /* @__PURE__ */ __name((overrides) => ({
      type: "outgoing",
      ...overrides
    }), "createMessage");
    it("returns undefined for incoming messages with no errors", () => {
      const message = createMessage({ type: "incoming" });
      import_chai.assert.isUndefined((0, import_message.getMessagePropStatus)(message, ourConversationId));
    });
    it('returns "error" for incoming messages with errors', () => {
      const message = createMessage({
        type: "incoming",
        errors: [new Error("something went wrong")]
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "error");
    });
    it('returns "paused" for messages with challenges', () => {
      const challengeError = Object.assign(new Error("a challenge"), {
        name: "SendMessageChallengeError",
        retryAfter: 123,
        data: {}
      });
      const message = createMessage({ errors: [challengeError] });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "paused");
    });
    it('returns "partial-sent" if the message has errors but was sent to at least one person', () => {
      const message = createMessage({
        errors: [new Error("whoopsie")],
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Delivered,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "partial-sent");
    });
    it('returns "error" if the message has errors and has not been sent', () => {
      const message = createMessage({
        errors: [new Error("whoopsie")],
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "error");
    });
    it('returns "viewed" if the message is just for you and has been sent', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "viewed");
    });
    it('returns "viewed" if the message was viewed by at least one person', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Viewed,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Read,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "viewed");
    });
    it('returns "read" if the message was read by at least one person', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Read,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "read");
    });
    it('returns "delivered" if the message was delivered to at least one person, but no "higher"', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Delivered,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "delivered");
    });
    it('returns "sent" if the message was sent to at least one person, but no "higher"', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "sent");
    });
    it('returns "sending" if the message has not been sent yet, even if it has been synced to yourself', () => {
      const message = createMessage({
        sendStateByConversationId: {
          [ourConversationId]: {
            status: import_MessageSendState.SendStatus.Sent,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          },
          [(0, import_uuid.v4)()]: {
            status: import_MessageSendState.SendStatus.Pending,
            updatedAt: Date.now()
          }
        }
      });
      import_chai.assert.strictEqual((0, import_message.getMessagePropStatus)(message, ourConversationId), "sending");
    });
  });
  describe("isEndSession", () => {
    it("checks if it is end of the session", () => {
      import_chai.assert.isFalse((0, import_message.isEndSession)({}));
      import_chai.assert.isFalse((0, import_message.isEndSession)({ flags: void 0 }));
      import_chai.assert.isFalse((0, import_message.isEndSession)({ flags: 0 }));
      import_chai.assert.isFalse((0, import_message.isEndSession)({ flags: 2 }));
      import_chai.assert.isFalse((0, import_message.isEndSession)({ flags: 4 }));
      import_chai.assert.isTrue((0, import_message.isEndSession)({ flags: 1 }));
    });
  });
  describe("isGroupUpdate", () => {
    it("checks if is group update", () => {
      import_chai.assert.isFalse((0, import_message.isGroupUpdate)({}));
      import_chai.assert.isFalse((0, import_message.isGroupUpdate)({ group_update: void 0 }));
      import_chai.assert.isTrue((0, import_message.isGroupUpdate)({ group_update: { left: "You" } }));
    });
  });
  describe("isIncoming", () => {
    it("checks if is incoming message", () => {
      import_chai.assert.isFalse((0, import_message.isIncoming)({ type: "outgoing" }));
      import_chai.assert.isFalse((0, import_message.isIncoming)({ type: "call-history" }));
      import_chai.assert.isTrue((0, import_message.isIncoming)({ type: "incoming" }));
    });
  });
  describe("isOutgoing", () => {
    it("checks if is outgoing message", () => {
      import_chai.assert.isFalse((0, import_message.isOutgoing)({ type: "incoming" }));
      import_chai.assert.isFalse((0, import_message.isOutgoing)({ type: "call-history" }));
      import_chai.assert.isTrue((0, import_message.isOutgoing)({ type: "outgoing" }));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWVzc2FnZXNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIG1vbWVudCBmcm9tICdtb21lbnQnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IHsgU2VuZFN0YXR1cyB9IGZyb20gJy4uLy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VTZW5kU3RhdGUnO1xuaW1wb3J0IHR5cGUge1xuICBNZXNzYWdlQXR0cmlidXRlc1R5cGUsXG4gIFNoYWxsb3dDaGFsbGVuZ2VFcnJvcixcbn0gZnJvbSAnLi4vLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxuaW1wb3J0IHtcbiAgY2FuRGVsZXRlRm9yRXZlcnlvbmUsXG4gIGNhblJlYWN0LFxuICBjYW5SZXBseSxcbiAgZ2V0TWVzc2FnZVByb3BTdGF0dXMsXG4gIGlzRW5kU2Vzc2lvbixcbiAgaXNHcm91cFVwZGF0ZSxcbiAgaXNJbmNvbWluZyxcbiAgaXNPdXRnb2luZyxcbn0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2UnO1xuXG5kZXNjcmliZSgnc3RhdGUvc2VsZWN0b3JzL21lc3NhZ2VzJywgKCkgPT4ge1xuICBsZXQgb3VyQ29udmVyc2F0aW9uSWQ6IHN0cmluZztcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBvdXJDb252ZXJzYXRpb25JZCA9IHV1aWQoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NhbkRlbGV0ZUZvckV2ZXJ5b25lJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBpbmNvbWluZyBtZXNzYWdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycgYXMgY29uc3QsXG4gICAgICAgIHNlbnRfYXQ6IERhdGUubm93KCkgLSAxMDAwLFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuRGVsZXRlRm9yRXZlcnlvbmUobWVzc2FnZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG1lc3NhZ2VzIHRoYXQgd2VyZSBhbHJlYWR5IGRlbGV0ZWQgZm9yIGV2ZXJ5b25lJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgZGVsZXRlZEZvckV2ZXJ5b25lOiB0cnVlLFxuICAgICAgICBzZW50X2F0OiBEYXRlLm5vdygpIC0gMTAwMCxcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhbkRlbGV0ZUZvckV2ZXJ5b25lKG1lc3NhZ2UpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBtZXNzYWdlcyB0aGF0IHdlcmUgYXJlIHRvbyBvbGQgdG8gZGVsZXRlJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgc2VudF9hdDogRGF0ZS5ub3coKSAtIG1vbWVudC5kdXJhdGlvbig0LCAnaG91cnMnKS5hc01pbGxpc2Vjb25kcygpLFxuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlJlYWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuRGVsZXRlRm9yRXZlcnlvbmUobWVzc2FnZSkpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIGZhbHNlIGZvciBtZXNzYWdlcyB0aGF0IGhhdmVuJ3QgYmVlbiBzZW50IHRvIGFueW9uZVwiLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnIGFzIGNvbnN0LFxuICAgICAgICBzZW50X2F0OiBEYXRlLm5vdygpIC0gMTAwMCxcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhbkRlbGV0ZUZvckV2ZXJ5b25lKG1lc3NhZ2UpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIG1lc3NhZ2VzIHRoYXQgbWVldCBhbGwgY3JpdGVyaWEgZm9yIGRlbGV0aW9uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgc2VudF9hdDogRGF0ZS5ub3coKSAtIDEwMDAsXG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuRGVsaXZlcmVkLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5pc1RydWUoY2FuRGVsZXRlRm9yRXZlcnlvbmUobWVzc2FnZSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2FuUmVhY3QnLCAoKSA9PiB7XG4gICAgY29uc3QgZGVmYXVsdENvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZSA9IHtcbiAgICAgIGlkOiB1dWlkKCksXG4gICAgICB0eXBlOiAnZGlyZWN0JyxcbiAgICAgIHRpdGxlOiAnVGVzdCBjb252ZXJzYXRpb24nLFxuICAgICAgaXNNZTogZmFsc2UsXG4gICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3Q6IHRydWUsXG4gICAgICBiYWRnZXM6IFtdLFxuICAgIH07XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3IgZGlzYWJsZWQgdjEgZ3JvdXBzJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycgYXMgY29uc3QsXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZCA9ICgpID0+ICh7XG4gICAgICAgIC4uLmRlZmF1bHRDb252ZXJzYXRpb24sXG4gICAgICAgIHR5cGU6ICdncm91cCcgYXMgY29uc3QsXG4gICAgICAgIGlzR3JvdXBWMUFuZERpc2FibGVkOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhblJlYWN0KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBnZXRDb252ZXJzYXRpb25CeUlkKSk7XG4gICAgfSk7XG5cbiAgICAvLyBOT1RFOiBUaGlzIGlzIG1pc3NpbmcgYSB0ZXN0IGZvciBtYW5kYXRvcnkgcHJvZmlsZSBzaGFyaW5nLlxuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG1lc3NhZ2Ugd2FzIGRlbGV0ZWQgZm9yIGV2ZXJ5b25lJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycgYXMgY29uc3QsXG4gICAgICAgIGRlbGV0ZWRGb3JFdmVyeW9uZTogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBnZXRDb252ZXJzYXRpb25CeUlkID0gKCkgPT4gZGVmYXVsdENvbnZlcnNhdGlvbjtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuUmVhY3QobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGdldENvbnZlcnNhdGlvbkJ5SWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBvdXRnb2luZyBtZXNzYWdlcyB0aGF0IGhhdmUgbm90IGJlZW4gc2VudCcsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnIGFzIGNvbnN0LFxuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBnZXRDb252ZXJzYXRpb25CeUlkID0gKCkgPT4gZGVmYXVsdENvbnZlcnNhdGlvbjtcblxuICAgICAgYXNzZXJ0LmlzRmFsc2UoY2FuUmVhY3QobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGdldENvbnZlcnNhdGlvbkJ5SWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIG91dGdvaW5nIG1lc3NhZ2VzIHRoYXQgYXJlIG9ubHkgc2VudCB0byB5b3Vyc2VsZicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnIGFzIGNvbnN0LFxuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBnZXRDb252ZXJzYXRpb25CeUlkID0gKCkgPT4gZGVmYXVsdENvbnZlcnNhdGlvbjtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShjYW5SZWFjdChtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCwgZ2V0Q29udmVyc2F0aW9uQnlJZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3Igb3V0Z29pbmcgbWVzc2FnZXMgdGhhdCBoYXZlIGJlZW4gc2VudCB0byBhdCBsZWFzdCBvbmUgcGVyc29uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycgYXMgY29uc3QsXG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGdldENvbnZlcnNhdGlvbkJ5SWQgPSAoKSA9PiAoe1xuICAgICAgICAuLi5kZWZhdWx0Q29udmVyc2F0aW9uLFxuICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoY2FuUmVhY3QobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGdldENvbnZlcnNhdGlvbkJ5SWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGluY29taW5nIG1lc3NhZ2VzJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycgYXMgY29uc3QsXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZCA9ICgpID0+IGRlZmF1bHRDb252ZXJzYXRpb247XG5cbiAgICAgIGFzc2VydC5pc1RydWUoY2FuUmVhY3QobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGdldENvbnZlcnNhdGlvbkJ5SWQpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2NhblJlcGx5JywgKCkgPT4ge1xuICAgIGNvbnN0IGRlZmF1bHRDb252ZXJzYXRpb246IENvbnZlcnNhdGlvblR5cGUgPSB7XG4gICAgICBpZDogdXVpZCgpLFxuICAgICAgdHlwZTogJ2RpcmVjdCcsXG4gICAgICB0aXRsZTogJ1Rlc3QgY29udmVyc2F0aW9uJyxcbiAgICAgIGlzTWU6IGZhbHNlLFxuICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiB0cnVlLFxuICAgICAgYmFkZ2VzOiBbXSxcbiAgICB9O1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIGRpc2FibGVkIHYxIGdyb3VwcycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnIGFzIGNvbnN0LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGdldENvbnZlcnNhdGlvbkJ5SWQgPSAoKSA9PiAoe1xuICAgICAgICAuLi5kZWZhdWx0Q29udmVyc2F0aW9uLFxuICAgICAgICB0eXBlOiAnZ3JvdXAnIGFzIGNvbnN0LFxuICAgICAgICBpc0dyb3VwVjFBbmREaXNhYmxlZDogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShjYW5SZXBseShtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCwgZ2V0Q29udmVyc2F0aW9uQnlJZCkpO1xuICAgIH0pO1xuXG4gICAgLy8gTk9URTogVGhpcyBpcyBtaXNzaW5nIGEgdGVzdCBmb3IgbWFuZGF0b3J5IHByb2ZpbGUgc2hhcmluZy5cblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBtZXNzYWdlIHdhcyBkZWxldGVkIGZvciBldmVyeW9uZScsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnIGFzIGNvbnN0LFxuICAgICAgICBkZWxldGVkRm9yRXZlcnlvbmU6IHRydWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZCA9ICgpID0+IGRlZmF1bHRDb252ZXJzYXRpb247XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhblJlcGx5KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBnZXRDb252ZXJzYXRpb25CeUlkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igb3V0Z29pbmcgbWVzc2FnZXMgdGhhdCBoYXZlIG5vdCBiZWVuIHNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZCA9ICgpID0+IGRlZmF1bHRDb252ZXJzYXRpb247XG5cbiAgICAgIGFzc2VydC5pc0ZhbHNlKGNhblJlcGx5KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBnZXRDb252ZXJzYXRpb25CeUlkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBvdXRnb2luZyBtZXNzYWdlcyB0aGF0IGFyZSBvbmx5IHNlbnQgdG8geW91cnNlbGYnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0ge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9O1xuICAgICAgY29uc3QgZ2V0Q29udmVyc2F0aW9uQnlJZCA9ICgpID0+IGRlZmF1bHRDb252ZXJzYXRpb247XG5cbiAgICAgIGFzc2VydC5pc1RydWUoY2FuUmVwbHkobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQsIGdldENvbnZlcnNhdGlvbkJ5SWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIG91dGdvaW5nIG1lc3NhZ2VzIHRoYXQgaGF2ZSBiZWVuIHNlbnQgdG8gYXQgbGVhc3Qgb25lIHBlcnNvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnIGFzIGNvbnN0LFxuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBnZXRDb252ZXJzYXRpb25CeUlkID0gKCkgPT4gKHtcbiAgICAgICAgLi4uZGVmYXVsdENvbnZlcnNhdGlvbixcbiAgICAgICAgdHlwZTogJ2dyb3VwJyBhcyBjb25zdCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGNhblJlcGx5KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBnZXRDb252ZXJzYXRpb25CeUlkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGZvciBpbmNvbWluZyBtZXNzYWdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnIGFzIGNvbnN0LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGdldENvbnZlcnNhdGlvbkJ5SWQgPSAoKSA9PiBkZWZhdWx0Q29udmVyc2F0aW9uO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGNhblJlcGx5KG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkLCBnZXRDb252ZXJzYXRpb25CeUlkKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRNZXNzYWdlUHJvcFN0YXR1cycsICgpID0+IHtcbiAgICBjb25zdCBjcmVhdGVNZXNzYWdlID0gKG92ZXJyaWRlczogUGFydGlhbDxNZXNzYWdlQXR0cmlidXRlc1R5cGU+KSA9PiAoe1xuICAgICAgdHlwZTogJ291dGdvaW5nJyBhcyBjb25zdCxcbiAgICAgIC4uLm92ZXJyaWRlcyxcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBmb3IgaW5jb21pbmcgbWVzc2FnZXMgd2l0aCBubyBlcnJvcnMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZSh7IHR5cGU6ICdpbmNvbWluZycgfSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRNZXNzYWdlUHJvcFN0YXR1cyhtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgXCJlcnJvclwiIGZvciBpbmNvbWluZyBtZXNzYWdlcyB3aXRoIGVycm9ycycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgZXJyb3JzOiBbbmV3IEVycm9yKCdzb21ldGhpbmcgd2VudCB3cm9uZycpXSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldE1lc3NhZ2VQcm9wU3RhdHVzKG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgJ2Vycm9yJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwicGF1c2VkXCIgZm9yIG1lc3NhZ2VzIHdpdGggY2hhbGxlbmdlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IGNoYWxsZW5nZUVycm9yOiBTaGFsbG93Q2hhbGxlbmdlRXJyb3IgPSBPYmplY3QuYXNzaWduKFxuICAgICAgICBuZXcgRXJyb3IoJ2EgY2hhbGxlbmdlJyksXG4gICAgICAgIHtcbiAgICAgICAgICBuYW1lOiAnU2VuZE1lc3NhZ2VDaGFsbGVuZ2VFcnJvcicsXG4gICAgICAgICAgcmV0cnlBZnRlcjogMTIzLFxuICAgICAgICAgIGRhdGE6IHt9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGNyZWF0ZU1lc3NhZ2UoeyBlcnJvcnM6IFtjaGFsbGVuZ2VFcnJvcl0gfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TWVzc2FnZVByb3BTdGF0dXMobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAncGF1c2VkJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwicGFydGlhbC1zZW50XCIgaWYgdGhlIG1lc3NhZ2UgaGFzIGVycm9ycyBidXQgd2FzIHNlbnQgdG8gYXQgbGVhc3Qgb25lIHBlcnNvbicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgZXJyb3JzOiBbbmV3IEVycm9yKCd3aG9vcHNpZScpXSxcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldE1lc3NhZ2VQcm9wU3RhdHVzKG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgJ3BhcnRpYWwtc2VudCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBcImVycm9yXCIgaWYgdGhlIG1lc3NhZ2UgaGFzIGVycm9ycyBhbmQgaGFzIG5vdCBiZWVuIHNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgIGVycm9yczogW25ldyBFcnJvcignd2hvb3BzaWUnKV0sXG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TWVzc2FnZVByb3BTdGF0dXMobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAnZXJyb3InXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgXCJ2aWV3ZWRcIiBpZiB0aGUgbWVzc2FnZSBpcyBqdXN0IGZvciB5b3UgYW5kIGhhcyBiZWVuIHNlbnQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TWVzc2FnZVByb3BTdGF0dXMobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAndmlld2VkJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwidmlld2VkXCIgaWYgdGhlIG1lc3NhZ2Ugd2FzIHZpZXdlZCBieSBhdCBsZWFzdCBvbmUgcGVyc29uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlZpZXdlZCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUmVhZCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldE1lc3NhZ2VQcm9wU3RhdHVzKG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgJ3ZpZXdlZCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBcInJlYWRcIiBpZiB0aGUgbWVzc2FnZSB3YXMgcmVhZCBieSBhdCBsZWFzdCBvbmUgcGVyc29uJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVzc2FnZSA9IGNyZWF0ZU1lc3NhZ2Uoe1xuICAgICAgICBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiB7XG4gICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlJlYWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRNZXNzYWdlUHJvcFN0YXR1cyhtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCksXG4gICAgICAgICdyZWFkJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwiZGVsaXZlcmVkXCIgaWYgdGhlIG1lc3NhZ2Ugd2FzIGRlbGl2ZXJlZCB0byBhdCBsZWFzdCBvbmUgcGVyc29uLCBidXQgbm8gXCJoaWdoZXJcIicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIGdldE1lc3NhZ2VQcm9wU3RhdHVzKG1lc3NhZ2UsIG91ckNvbnZlcnNhdGlvbklkKSxcbiAgICAgICAgJ2RlbGl2ZXJlZCdcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBcInNlbnRcIiBpZiB0aGUgbWVzc2FnZSB3YXMgc2VudCB0byBhdCBsZWFzdCBvbmUgcGVyc29uLCBidXQgbm8gXCJoaWdoZXJcIicsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2UgPSBjcmVhdGVNZXNzYWdlKHtcbiAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDoge1xuICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW3V1aWQoKV06IHtcbiAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBnZXRNZXNzYWdlUHJvcFN0YXR1cyhtZXNzYWdlLCBvdXJDb252ZXJzYXRpb25JZCksXG4gICAgICAgICdzZW50J1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIFwic2VuZGluZ1wiIGlmIHRoZSBtZXNzYWdlIGhhcyBub3QgYmVlbiBzZW50IHlldCwgZXZlbiBpZiBpdCBoYXMgYmVlbiBzeW5jZWQgdG8geW91cnNlbGYnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZXNzYWdlID0gY3JlYXRlTWVzc2FnZSh7XG4gICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHtcbiAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgZ2V0TWVzc2FnZVByb3BTdGF0dXMobWVzc2FnZSwgb3VyQ29udmVyc2F0aW9uSWQpLFxuICAgICAgICAnc2VuZGluZydcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0VuZFNlc3Npb24nLCAoKSA9PiB7XG4gICAgaXQoJ2NoZWNrcyBpZiBpdCBpcyBlbmQgb2YgdGhlIHNlc3Npb24nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0VuZFNlc3Npb24oe30pKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRW5kU2Vzc2lvbih7IGZsYWdzOiB1bmRlZmluZWQgfSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNFbmRTZXNzaW9uKHsgZmxhZ3M6IDAgfSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNFbmRTZXNzaW9uKHsgZmxhZ3M6IDIgfSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNFbmRTZXNzaW9uKHsgZmxhZ3M6IDQgfSkpO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGlzRW5kU2Vzc2lvbih7IGZsYWdzOiAxIH0pKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzR3JvdXBVcGRhdGUnLCAoKSA9PiB7XG4gICAgaXQoJ2NoZWNrcyBpZiBpcyBncm91cCB1cGRhdGUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0dyb3VwVXBkYXRlKHt9KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0dyb3VwVXBkYXRlKHsgZ3JvdXBfdXBkYXRlOiB1bmRlZmluZWQgfSkpO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGlzR3JvdXBVcGRhdGUoeyBncm91cF91cGRhdGU6IHsgbGVmdDogJ1lvdScgfSB9KSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc0luY29taW5nJywgKCkgPT4ge1xuICAgIGl0KCdjaGVja3MgaWYgaXMgaW5jb21pbmcgbWVzc2FnZScsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzSW5jb21pbmcoeyB0eXBlOiAnb3V0Z29pbmcnIH0pKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzSW5jb21pbmcoeyB0eXBlOiAnY2FsbC1oaXN0b3J5JyB9KSk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoaXNJbmNvbWluZyh7IHR5cGU6ICdpbmNvbWluZycgfSkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNPdXRnb2luZycsICgpID0+IHtcbiAgICBpdCgnY2hlY2tzIGlmIGlzIG91dGdvaW5nIG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc091dGdvaW5nKHsgdHlwZTogJ2luY29taW5nJyB9KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc091dGdvaW5nKHsgdHlwZTogJ2NhbGwtaGlzdG9yeScgfSkpO1xuXG4gICAgICBhc3NlcnQuaXNUcnVlKGlzT3V0Z29pbmcoeyB0eXBlOiAnb3V0Z29pbmcnIH0pKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsYUFBd0I7QUFDeEIsa0JBQTJCO0FBQzNCLDhCQUEyQjtBQU8zQixxQkFTTztBQUVQLFNBQVMsNEJBQTRCLE1BQU07QUFDekMsTUFBSTtBQUVKLGFBQVcsTUFBTTtBQUNmLHdCQUFvQixvQkFBSztBQUFBLEVBQzNCLENBQUM7QUFFRCxXQUFTLHdCQUF3QixNQUFNO0FBQ3JDLE9BQUcsdUNBQXVDLE1BQU07QUFDOUMsWUFBTSxVQUFVO0FBQUEsUUFDZCxNQUFNO0FBQUEsUUFDTixTQUFTLEtBQUssSUFBSSxJQUFJO0FBQUEsTUFDeEI7QUFFQSx5QkFBTyxRQUFRLHlDQUFxQixPQUFPLENBQUM7QUFBQSxJQUM5QyxDQUFDO0FBRUQsT0FBRyxxRUFBcUUsTUFBTTtBQUM1RSxZQUFNLFVBQVU7QUFBQSxRQUNkLE1BQU07QUFBQSxRQUNOLG9CQUFvQjtBQUFBLFFBQ3BCLFNBQVMsS0FBSyxJQUFJLElBQUk7QUFBQSxRQUN0QiwyQkFBMkI7QUFBQSxXQUN4QixvQkFBb0I7QUFBQSxZQUNuQixRQUFRLG1DQUFXO0FBQUEsWUFDbkIsV0FBVyxLQUFLLElBQUk7QUFBQSxVQUN0QjtBQUFBLFdBQ0Msb0JBQUssSUFBSTtBQUFBLFlBQ1IsUUFBUSxtQ0FBVztBQUFBLFlBQ25CLFdBQVcsS0FBSyxJQUFJO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLHlCQUFPLFFBQVEs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
