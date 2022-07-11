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
var import_Client = __toESM(require("../../sql/Client"));
var import_UUID = require("../../types/UUID");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
const {
  removeAll,
  _getAllMessages,
  saveMessages,
  getMessageMetricsForConversation,
  getNewerMessagesByConversation,
  getOlderMessagesByConversation
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/timelineFetches", () => {
  beforeEach(async () => {
    await removeAll();
  });
  describe("getOlderMessagesByConversation", () => {
    it("returns N most recent messages", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId: getUuid(),
        sent_at: now,
        received_at: now,
        timestamp: now
      };
      const message4 = {
        id: getUuid(),
        body: "message 4",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId
      };
      const message5 = {
        id: getUuid(),
        body: "message 5",
        type: "outgoing",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId
      };
      await saveMessages([message1, message2, message3, message4, message5], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 5);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: false,
        limit: 5,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 3);
      import_chai.assert.strictEqual(messages[0].id, message1.id);
      import_chai.assert.strictEqual(messages[1].id, message2.id);
    });
    it("returns N most recent messages for a given story", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "story",
        type: "story",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        storyId
      };
      const message2 = {
        id: getUuid(),
        body: "story reply 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10,
        storyId
      };
      const message3 = {
        id: getUuid(),
        body: "normal message",
        type: "outgoing",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        storyId
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message2.id);
    });
    it("returns N most recent messages excluding group story replies", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "story",
        type: "incoming",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        storyId
      };
      const message2 = {
        id: getUuid(),
        body: "story reply 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10,
        storyId
      };
      const message3 = {
        id: getUuid(),
        body: "normal message",
        type: "outgoing",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message3.id);
    });
    it("returns N messages older than provided received_at", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target - 10,
        timestamp: target - 10
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target,
        received_at: target,
        timestamp: target
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target + 10,
        received_at: target + 10,
        timestamp: target + 10
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        receivedAt: target,
        sentAt: target,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message1.id);
    });
    it("returns N older messages with received_at, lesser sent_at", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target - 20,
        received_at: target,
        timestamp: target
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target,
        timestamp: target
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target,
        received_at: target,
        timestamp: target
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        receivedAt: target,
        sentAt: target,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 2);
      import_chai.assert.strictEqual(messages[0].id, message1.id, "checking message 1");
      import_chai.assert.strictEqual(messages[1].id, message2.id, "checking message 2");
    });
    it("returns N older messages, same received_at/sent_at but excludes messageId", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target,
        timestamp: target
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target,
        timestamp: target
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target,
        received_at: target,
        timestamp: target
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getOlderMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        messageId: message2.id,
        receivedAt: target,
        sentAt: target,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message1.id);
    });
  });
  describe("getNewerMessagesByConversation", () => {
    it("returns N oldest messages with no parameters", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId: getUuid(),
        sent_at: now,
        received_at: now,
        timestamp: now
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId
      };
      const message4 = {
        id: getUuid(),
        body: "message 4",
        type: "outgoing",
        conversationId,
        sent_at: now + 10,
        received_at: now + 10,
        timestamp: now + 10
      };
      const message5 = {
        id: getUuid(),
        body: "message 5",
        type: "outgoing",
        conversationId,
        sent_at: now + 20,
        received_at: now + 20,
        timestamp: now + 20
      };
      await saveMessages([message1, message2, message3, message4, message5], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 5);
      const messages = await getNewerMessagesByConversation(conversationId, {
        isGroup: false,
        limit: 5,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 3);
      import_chai.assert.strictEqual(messages[0].id, message3.id, "checking message 3");
      import_chai.assert.strictEqual(messages[1].id, message4.id, "checking message 4");
    });
    it("returns N oldest messages for a given story with no parameters", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now + 10,
        received_at: now + 10,
        timestamp: now + 10,
        storyId
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: now + 20,
        received_at: now + 20,
        timestamp: now + 20
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getNewerMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        storyId
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message2.id);
    });
    it("returns N messages newer than provided received_at", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target - 10,
        timestamp: target - 10
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target,
        received_at: target,
        timestamp: target
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target + 10,
        received_at: target + 10,
        timestamp: target + 10
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getNewerMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        receivedAt: target,
        sentAt: target,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message3.id);
    });
    it("returns N messages excluding group story replies", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target - 10,
        received_at: target - 10,
        timestamp: target - 10,
        storyId: getUuid()
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target + 20,
        received_at: target + 20,
        timestamp: target + 20
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target + 10,
        received_at: target + 10,
        timestamp: target + 10,
        storyId: getUuid()
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getNewerMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        storyId: void 0,
        receivedAt: target,
        sentAt: target
      });
      import_chai.assert.lengthOf(messages, 1);
      import_chai.assert.strictEqual(messages[0].id, message2.id);
    });
    it("returns N newer messages with same received_at, greater sent_at", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: target,
        received_at: target,
        timestamp: target
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: target + 10,
        received_at: target,
        timestamp: target
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId,
        sent_at: target + 20,
        received_at: target,
        timestamp: target
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getNewerMessagesByConversation(conversationId, {
        isGroup: true,
        limit: 5,
        receivedAt: target,
        sentAt: target,
        storyId: void 0
      });
      import_chai.assert.lengthOf(messages, 2);
      import_chai.assert.strictEqual(messages[0].id, message2.id);
      import_chai.assert.strictEqual(messages[1].id, message3.id);
    });
  });
  describe("getMessageMetricsForConversation", () => {
    it("returns metrics properly for story and non-story timelines", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const target = Date.now();
      const conversationId = getUuid();
      const storyId = getUuid();
      const ourUuid = getUuid();
      const story = {
        id: getUuid(),
        body: "story",
        type: "story",
        conversationId,
        sent_at: target - 10,
        received_at: target - 10,
        timestamp: target - 10
      };
      const oldestInStory = {
        id: getUuid(),
        body: "oldestInStory",
        type: "outgoing",
        conversationId,
        sent_at: target - 9,
        received_at: target - 9,
        timestamp: target - 9,
        storyId
      };
      const oldest = {
        id: getUuid(),
        body: "oldest",
        type: "outgoing",
        conversationId,
        sent_at: target - 8,
        received_at: target - 8,
        timestamp: target - 8
      };
      const oldestUnseen = {
        id: getUuid(),
        body: "oldestUnseen",
        type: "incoming",
        conversationId,
        sent_at: target - 7,
        received_at: target - 7,
        timestamp: target - 7,
        readStatus: import_MessageReadStatus.ReadStatus.Unread
      };
      const oldestStoryUnread = {
        id: getUuid(),
        body: "oldestStoryUnread",
        type: "incoming",
        conversationId,
        sent_at: target - 6,
        received_at: target - 6,
        timestamp: target - 6,
        readStatus: import_MessageReadStatus.ReadStatus.Unread,
        storyId
      };
      const anotherUnread = {
        id: getUuid(),
        body: "anotherUnread",
        type: "incoming",
        conversationId,
        sent_at: target - 5,
        received_at: target - 5,
        timestamp: target - 5,
        readStatus: import_MessageReadStatus.ReadStatus.Unread
      };
      const newestInStory = {
        id: getUuid(),
        body: "newestStory",
        type: "outgoing",
        conversationId,
        sent_at: target - 4,
        received_at: target - 4,
        timestamp: target - 4,
        storyId
      };
      const newest = {
        id: getUuid(),
        body: "newest",
        type: "outgoing",
        conversationId,
        sent_at: target - 3,
        received_at: target - 3,
        timestamp: target - 3
      };
      await saveMessages([
        story,
        oldestInStory,
        oldest,
        oldestUnseen,
        oldestStoryUnread,
        anotherUnread,
        newestInStory,
        newest
      ], { forceSave: true, ourUuid });
      import_chai.assert.lengthOf(await _getAllMessages(), 8);
      const metricsInTimeline = await getMessageMetricsForConversation(conversationId);
      import_chai.assert.strictEqual(metricsInTimeline?.oldest?.id, oldestInStory.id, "oldest");
      import_chai.assert.strictEqual(metricsInTimeline?.newest?.id, newest.id, "newest");
      import_chai.assert.strictEqual(metricsInTimeline?.oldestUnseen?.id, oldestUnseen.id, "oldestUnseen");
      import_chai.assert.strictEqual(metricsInTimeline?.totalUnseen, 3, "totalUnseen");
      const metricsInStory = await getMessageMetricsForConversation(conversationId, storyId);
      import_chai.assert.strictEqual(metricsInStory?.oldest?.id, oldestInStory.id, "oldestInStory");
      import_chai.assert.strictEqual(metricsInStory?.newest?.id, newestInStory.id, "newestInStory");
      import_chai.assert.strictEqual(metricsInStory?.oldestUnseen?.id, oldestStoryUnread.id, "oldestStoryUnread");
      import_chai.assert.strictEqual(metricsInStory?.totalUnseen, 1, "totalUnseen");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZWxpbmVGZXRjaGVzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uLy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsLXR5cGVzLmQnO1xuaW1wb3J0IHsgUmVhZFN0YXR1cyB9IGZyb20gJy4uLy4uL21lc3NhZ2VzL01lc3NhZ2VSZWFkU3RhdHVzJztcblxuY29uc3Qge1xuICByZW1vdmVBbGwsXG4gIF9nZXRBbGxNZXNzYWdlcyxcbiAgc2F2ZU1lc3NhZ2VzLFxuICBnZXRNZXNzYWdlTWV0cmljc0ZvckNvbnZlcnNhdGlvbixcbiAgZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uLFxuICBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24sXG59ID0gZGF0YUludGVyZmFjZTtcblxuZnVuY3Rpb24gZ2V0VXVpZCgpOiBVVUlEU3RyaW5nVHlwZSB7XG4gIHJldHVybiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbn1cblxuZGVzY3JpYmUoJ3NxbC90aW1lbGluZUZldGNoZXMnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlbW92ZUFsbCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0T2xkZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIE4gbW9zdCByZWNlbnQgbWVzc2FnZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBzdG9yeUlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDIwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93IC0gMTAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAxMCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgLSAxMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA0JyxcbiAgICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICAgIHN0b3J5SWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTU6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3csXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3csXG4gICAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTVdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDUpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAzKTtcblxuICAgICAgLy8gRmV0Y2hlZCB3aXRoIERFU0MgcXVlcnksIGJ1dCB3aXRoIHJldmVyc2UoKSBjYWxsIGFmdGVyd2FyZHNcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1swXS5pZCwgbWVzc2FnZTEuaWQpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzFdLmlkLCBtZXNzYWdlMi5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBOIG1vc3QgcmVjZW50IG1lc3NhZ2VzIGZvciBhIGdpdmVuIHN0b3J5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgc3RvcnlJZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdzdG9yeScsXG4gICAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDIwLFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdzdG9yeSByZXBseSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyAtIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93IC0gMTAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93IC0gMTAsXG4gICAgICAgIHN0b3J5SWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ25vcm1hbCBtZXNzYWdlJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiB0cnVlLFxuICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgc3RvcnlJZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1swXS5pZCwgbWVzc2FnZTIuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBtb3N0IHJlY2VudCBtZXNzYWdlcyBleGNsdWRpbmcgZ3JvdXAgc3RvcnkgcmVwbGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IHN0b3J5SWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnc3RvcnknLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93IC0gMjAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAyMCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgLSAyMCxcbiAgICAgICAgc3RvcnlJZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnc3RvcnkgcmVwbHkgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDEwLFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdub3JtYWwgbWVzc2FnZScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3csXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3csXG4gICAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1swXS5pZCwgbWVzc2FnZTMuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBtZXNzYWdlcyBvbGRlciB0aGFuIHByb3ZpZGVkIHJlY2VpdmVkX2F0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0LFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCArIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0ICsgMTAsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0ICsgMTAsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiB0cnVlLFxuICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgcmVjZWl2ZWRBdDogdGFyZ2V0LFxuICAgICAgICBzZW50QXQ6IHRhcmdldCxcbiAgICAgICAgc3RvcnlJZDogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YobWVzc2FnZXMsIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzBdLmlkLCBtZXNzYWdlMS5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBOIG9sZGVyIG1lc3NhZ2VzIHdpdGggcmVjZWl2ZWRfYXQsIGxlc3NlciBzZW50X2F0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQsXG4gICAgICAgIHJlY2VpdmVkX2F0OiB0YXJnZXQsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0LFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRPbGRlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHJlY2VpdmVkQXQ6IHRhcmdldCxcbiAgICAgICAgc2VudEF0OiB0YXJnZXQsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YobWVzc2FnZXMsIDIpO1xuXG4gICAgICAvLyBGZXRjaGVkIHdpdGggREVTQyBxdWVyeSwgYnV0IHdpdGggcmV2ZXJzZSgpIGNhbGwgYWZ0ZXJ3YXJkc1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzBdLmlkLCBtZXNzYWdlMS5pZCwgJ2NoZWNraW5nIG1lc3NhZ2UgMScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzFdLmlkLCBtZXNzYWdlMi5pZCwgJ2NoZWNraW5nIG1lc3NhZ2UgMicpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBvbGRlciBtZXNzYWdlcywgc2FtZSByZWNlaXZlZF9hdC9zZW50X2F0IGJ1dCBleGNsdWRlcyBtZXNzYWdlSWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE9sZGVyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiB0cnVlLFxuICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlMi5pZCxcbiAgICAgICAgcmVjZWl2ZWRBdDogdGFyZ2V0LFxuICAgICAgICBzZW50QXQ6IHRhcmdldCxcbiAgICAgICAgc3RvcnlJZDogdW5kZWZpbmVkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihtZXNzYWdlcywgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXNbMF0uaWQsIG1lc3NhZ2UxLmlkKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2dldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBOIG9sZGVzdCBtZXNzYWdlcyB3aXRoIG5vIHBhcmFtZXRlcnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBzdG9yeUlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3csXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3csXG4gICAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc3RvcnlJZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA0JyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMTAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMTAsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTU6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDIwLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTVdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDUpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YobWVzc2FnZXMsIDMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzBdLmlkLCBtZXNzYWdlMy5pZCwgJ2NoZWNraW5nIG1lc3NhZ2UgMycpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzFdLmlkLCBtZXNzYWdlNC5pZCwgJ2NoZWNraW5nIG1lc3NhZ2UgNCcpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBvbGRlc3QgbWVzc2FnZXMgZm9yIGEgZ2l2ZW4gc3Rvcnkgd2l0aCBubyBwYXJhbWV0ZXJzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgc3RvcnlJZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc3RvcnlJZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMTAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMTAsXG4gICAgICAgIHN0b3J5SWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDIwLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXROZXdlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHN0b3J5SWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1swXS5pZCwgbWVzc2FnZTIuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBtZXNzYWdlcyBuZXdlciB0aGFuIHByb3ZpZGVkIHJlY2VpdmVkX2F0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0LFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCArIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0ICsgMTAsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0ICsgMTAsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldE5ld2VyTWVzc2FnZXNCeUNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBpc0dyb3VwOiB0cnVlLFxuICAgICAgICBsaW1pdDogNSxcbiAgICAgICAgcmVjZWl2ZWRBdDogdGFyZ2V0LFxuICAgICAgICBzZW50QXQ6IHRhcmdldCxcbiAgICAgICAgc3RvcnlJZDogdW5kZWZpbmVkLFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YobWVzc2FnZXMsIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzWzBdLmlkLCBtZXNzYWdlMy5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBOIG1lc3NhZ2VzIGV4Y2x1ZGluZyBncm91cCBzdG9yeSByZXBsaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3QgdGFyZ2V0ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCAtIDEwLFxuICAgICAgICBzdG9yeUlkOiBnZXRVdWlkKCksXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgKyAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCArIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCArIDIwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0ICsgMTAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiB0YXJnZXQgKyAxMCxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQgKyAxMCxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXROZXdlck1lc3NhZ2VzQnlDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgcmVjZWl2ZWRBdDogdGFyZ2V0LFxuICAgICAgICBzZW50QXQ6IHRhcmdldCxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1swXS5pZCwgbWVzc2FnZTIuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgTiBuZXdlciBtZXNzYWdlcyB3aXRoIHNhbWUgcmVjZWl2ZWRfYXQsIGdyZWF0ZXIgc2VudF9hdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IHRhcmdldCA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0LFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCArIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCArIDIwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhbbWVzc2FnZTEsIG1lc3NhZ2UyLCBtZXNzYWdlM10sIHtcbiAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMyk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0TmV3ZXJNZXNzYWdlc0J5Q29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgICAgIGlzR3JvdXA6IHRydWUsXG4gICAgICAgIGxpbWl0OiA1LFxuICAgICAgICByZWNlaXZlZEF0OiB0YXJnZXQsXG4gICAgICAgIHNlbnRBdDogdGFyZ2V0LFxuICAgICAgICBzdG9yeUlkOiB1bmRlZmluZWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKG1lc3NhZ2VzLCAyKTtcbiAgICAgIC8vIFRoZXkgYXJlIG5vdCBpbiBERVNDIG9yZGVyIGJlY2F1c2UgTWVzc2FnZUNvbGxlY3Rpb24gaXMgc29ydGluZyB0aGVtXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXNbMF0uaWQsIG1lc3NhZ2UyLmlkKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlc1sxXS5pZCwgbWVzc2FnZTMuaWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb24nLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgbWV0cmljcyBwcm9wZXJseSBmb3Igc3RvcnkgYW5kIG5vbi1zdG9yeSB0aW1lbGluZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCB0YXJnZXQgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBzdG9yeUlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3Qgc3Rvcnk6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3N0b3J5JyxcbiAgICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCAtIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0IC0gMTAsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0IC0gMTAsXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2xkZXN0SW5TdG9yeTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnb2xkZXN0SW5TdG9yeScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSA5LFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0IC0gOSxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQgLSA5LFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG9sZGVzdDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnb2xkZXN0JyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCAtIDgsXG4gICAgICAgIHJlY2VpdmVkX2F0OiB0YXJnZXQgLSA4LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCAtIDgsXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2xkZXN0VW5zZWVuOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdvbGRlc3RVbnNlZW4nLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0IC0gNyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDcsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0IC0gNyxcbiAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgICB9O1xuICAgICAgY29uc3Qgb2xkZXN0U3RvcnlVbnJlYWQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ29sZGVzdFN0b3J5VW5yZWFkJyxcbiAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHRhcmdldCAtIDYsXG4gICAgICAgIHJlY2VpdmVkX2F0OiB0YXJnZXQgLSA2LFxuICAgICAgICB0aW1lc3RhbXA6IHRhcmdldCAtIDYsXG4gICAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgICBzdG9yeUlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGFub3RoZXJVbnJlYWQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ2Fub3RoZXJVbnJlYWQnLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0IC0gNSxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDUsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0IC0gNSxcbiAgICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgICB9O1xuICAgICAgY29uc3QgbmV3ZXN0SW5TdG9yeTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbmV3ZXN0U3RvcnknLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogdGFyZ2V0IC0gNCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHRhcmdldCAtIDQsXG4gICAgICAgIHRpbWVzdGFtcDogdGFyZ2V0IC0gNCxcbiAgICAgICAgc3RvcnlJZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBuZXdlc3Q6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ25ld2VzdCcsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiB0YXJnZXQgLSAzLFxuICAgICAgICByZWNlaXZlZF9hdDogdGFyZ2V0IC0gMyxcbiAgICAgICAgdGltZXN0YW1wOiB0YXJnZXQgLSAzLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFxuICAgICAgICBbXG4gICAgICAgICAgc3RvcnksXG4gICAgICAgICAgb2xkZXN0SW5TdG9yeSxcbiAgICAgICAgICBvbGRlc3QsXG4gICAgICAgICAgb2xkZXN0VW5zZWVuLFxuICAgICAgICAgIG9sZGVzdFN0b3J5VW5yZWFkLFxuICAgICAgICAgIGFub3RoZXJVbnJlYWQsXG4gICAgICAgICAgbmV3ZXN0SW5TdG9yeSxcbiAgICAgICAgICBuZXdlc3QsXG4gICAgICAgIF0sXG4gICAgICAgIHsgZm9yY2VTYXZlOiB0cnVlLCBvdXJVdWlkIH1cbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgOCk7XG5cbiAgICAgIGNvbnN0IG1ldHJpY3NJblRpbWVsaW5lID0gYXdhaXQgZ2V0TWVzc2FnZU1ldHJpY3NGb3JDb252ZXJzYXRpb24oXG4gICAgICAgIGNvbnZlcnNhdGlvbklkXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBtZXRyaWNzSW5UaW1lbGluZT8ub2xkZXN0Py5pZCxcbiAgICAgICAgb2xkZXN0SW5TdG9yeS5pZCxcbiAgICAgICAgJ29sZGVzdCdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWV0cmljc0luVGltZWxpbmU/Lm5ld2VzdD8uaWQsIG5ld2VzdC5pZCwgJ25ld2VzdCcpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBtZXRyaWNzSW5UaW1lbGluZT8ub2xkZXN0VW5zZWVuPy5pZCxcbiAgICAgICAgb2xkZXN0VW5zZWVuLmlkLFxuICAgICAgICAnb2xkZXN0VW5zZWVuJ1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXRyaWNzSW5UaW1lbGluZT8udG90YWxVbnNlZW4sIDMsICd0b3RhbFVuc2VlbicpO1xuXG4gICAgICBjb25zdCBtZXRyaWNzSW5TdG9yeSA9IGF3YWl0IGdldE1lc3NhZ2VNZXRyaWNzRm9yQ29udmVyc2F0aW9uKFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc3RvcnlJZFxuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbWV0cmljc0luU3Rvcnk/Lm9sZGVzdD8uaWQsXG4gICAgICAgIG9sZGVzdEluU3RvcnkuaWQsXG4gICAgICAgICdvbGRlc3RJblN0b3J5J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbWV0cmljc0luU3Rvcnk/Lm5ld2VzdD8uaWQsXG4gICAgICAgIG5ld2VzdEluU3RvcnkuaWQsXG4gICAgICAgICduZXdlc3RJblN0b3J5J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgbWV0cmljc0luU3Rvcnk/Lm9sZGVzdFVuc2Vlbj8uaWQsXG4gICAgICAgIG9sZGVzdFN0b3J5VW5yZWFkLmlkLFxuICAgICAgICAnb2xkZXN0U3RvcnlVbnJlYWQnXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1ldHJpY3NJblN0b3J5Py50b3RhbFVuc2VlbiwgMSwgJ3RvdGFsVW5zZWVuJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUEwQjtBQUMxQixrQkFBcUI7QUFJckIsK0JBQTJCO0FBRTNCLE1BQU07QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULFNB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
