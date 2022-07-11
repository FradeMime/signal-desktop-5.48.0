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
const {
  removeAll,
  _getAllMessages,
  saveMessages,
  getConversationMessageStats
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/conversationSummary", () => {
  beforeEach(async () => {
    await removeAll();
  });
  describe("getConversationMessageStats", () => {
    it("returns the latest message in current conversation", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "outgoing",
        conversationId: getUuid(),
        sent_at: now + 3,
        received_at: now + 3,
        timestamp: now + 3
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message2.body, "activity");
      import_chai.assert.strictEqual(messages.preview?.body, message2.body, "preview");
      import_chai.assert.isTrue(messages.hasUserInitiatedMessages);
    });
    it("returns the latest message in current conversation excluding group story replies", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2,
        storyId: getUuid()
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "incoming",
        conversationId,
        sent_at: now + 3,
        received_at: now + 3,
        timestamp: now + 3,
        storyId: getUuid()
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const messages = await getConversationMessageStats({
        conversationId,
        isGroup: true,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message1.body, "activity");
      import_chai.assert.strictEqual(messages.preview?.body, message1.body, "preview");
      import_chai.assert.isTrue(messages.hasUserInitiatedMessages);
    });
    it("preview excludes several message types, allows type = NULL", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: null,
        conversationId,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "change-number-notification",
        conversationId,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "group-v1-migration",
        conversationId,
        sent_at: now + 3,
        received_at: now + 3,
        timestamp: now + 3
      };
      const message4 = {
        id: getUuid(),
        body: "message 5",
        type: "profile-change",
        conversationId,
        sent_at: now + 5,
        received_at: now + 5,
        timestamp: now + 5
      };
      const message5 = {
        id: getUuid(),
        body: "message 6",
        type: "story",
        conversationId,
        sent_at: now + 6,
        received_at: now + 6,
        timestamp: now + 6
      };
      const message6 = {
        id: getUuid(),
        body: "message 7",
        type: "universal-timer-notification",
        conversationId,
        sent_at: now + 7,
        received_at: now + 7,
        timestamp: now + 7
      };
      const message7 = {
        id: getUuid(),
        body: "message 8",
        type: "verified-change",
        conversationId,
        sent_at: now + 8,
        received_at: now + 8,
        timestamp: now + 8
      };
      await saveMessages([message1, message2, message3, message4, message5, message6, message7], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 7);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.preview?.body, message1.body);
    });
    it("activity excludes several message types, allows type = NULL", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: null,
        conversationId,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "change-number-notification",
        conversationId,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "group-v1-migration",
        conversationId,
        sent_at: now + 3,
        received_at: now + 3,
        timestamp: now + 3
      };
      const message4 = {
        id: getUuid(),
        body: "message 4",
        type: "keychange",
        conversationId,
        sent_at: now + 4,
        received_at: now + 4,
        timestamp: now + 4
      };
      const message5 = {
        id: getUuid(),
        body: "message 6",
        type: "profile-change",
        conversationId,
        sent_at: now + 6,
        received_at: now + 6,
        timestamp: now + 6
      };
      const message6 = {
        id: getUuid(),
        body: "message 7",
        type: "story",
        conversationId,
        sent_at: now + 7,
        received_at: now + 7,
        timestamp: now + 7
      };
      const message7 = {
        id: getUuid(),
        body: "message 8",
        type: "universal-timer-notification",
        conversationId,
        sent_at: now + 8,
        received_at: now + 8,
        timestamp: now + 8
      };
      const message8 = {
        id: getUuid(),
        body: "message 9",
        type: "verified-change",
        conversationId,
        sent_at: now + 9,
        received_at: now + 9,
        timestamp: now + 9
      };
      await saveMessages([
        message1,
        message2,
        message3,
        message4,
        message5,
        message6,
        message7,
        message8
      ], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 8);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message1.body);
    });
    it("activity excludes expirationTimerUpdates with fromSync = true, includes fromSync = undefined", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        expirationTimerUpdate: {
          expireTimer: 10,
          source: "you"
        },
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        expirationTimerUpdate: {
          expireTimer: 10,
          fromSync: true
        },
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      await saveMessages([message1, message2], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 2);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message1.body);
    });
    it("activity excludes expirationTimerUpdates with fromSync = true, includes fromSync = false", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        expirationTimerUpdate: {
          expireTimer: 10,
          source: "you",
          fromSync: false
        },
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        expirationTimerUpdate: {
          expireTimer: 10,
          fromSync: true
        },
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      await saveMessages([message1, message2], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 2);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message1.body);
    });
    it("preview excludes expired message, includes non-disappearing message", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        expirationStartTimestamp: now - 2 * 1e3,
        expireTimer: 1,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      await saveMessages([message1, message2], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 2);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.preview?.body, message1.body);
    });
    it("preview excludes expired message, includes non-disappearing message", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        expirationStartTimestamp: now,
        expireTimer: 30,
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        expirationStartTimestamp: now - 2 * 1e3,
        expireTimer: 1,
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      await saveMessages([message1, message2], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 2);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.preview?.body, message1.body);
    });
    it("excludes group v2 change events where someone else leaves a group", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const otherUuid = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1 - removing ourselves",
        type: "group-v2-change",
        conversationId,
        groupV2Change: {
          from: ourUuid,
          details: [
            {
              type: "member-remove",
              uuid: ourUuid
            }
          ]
        },
        sent_at: now + 1,
        received_at: now + 1,
        timestamp: now + 1
      };
      const message2 = {
        id: getUuid(),
        body: "message 2 - someone else leaving",
        type: "group-v2-change",
        conversationId,
        groupV2Change: {
          from: otherUuid,
          details: [
            {
              type: "member-remove",
              uuid: otherUuid
            }
          ]
        },
        sent_at: now + 2,
        received_at: now + 2,
        timestamp: now + 2
      };
      await saveMessages([message1, message2], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 2);
      const messages = await getConversationMessageStats({
        conversationId,
        ourUuid
      });
      import_chai.assert.strictEqual(messages.activity?.body, message1.body, "activity");
      import_chai.assert.strictEqual(messages.preview?.body, message1.body, "preview");
      import_chai.assert.isFalse(messages.hasUserInitiatedMessages);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uU3VtbWFyeV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uLy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuXG5pbXBvcnQgdHlwZSB7IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSB9IGZyb20gJy4uLy4uL21vZGVsLXR5cGVzLmQnO1xuXG5jb25zdCB7XG4gIHJlbW92ZUFsbCxcbiAgX2dldEFsbE1lc3NhZ2VzLFxuICBzYXZlTWVzc2FnZXMsXG4gIGdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyxcbn0gPSBkYXRhSW50ZXJmYWNlO1xuXG5mdW5jdGlvbiBnZXRVdWlkKCk6IFVVSURTdHJpbmdUeXBlIHtcbiAgcmV0dXJuIFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xufVxuXG5kZXNjcmliZSgnc3FsL2NvbnZlcnNhdGlvblN1bW1hcnknLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlbW92ZUFsbCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRoZSBsYXRlc3QgbWVzc2FnZSBpbiBjdXJyZW50IGNvbnZlcnNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDEsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAxLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDEsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMixcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAyLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAzLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMyxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAzLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRDb252ZXJzYXRpb25NZXNzYWdlU3RhdHMoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXMuYWN0aXZpdHk/LmJvZHksIG1lc3NhZ2UyLmJvZHksICdhY3Rpdml0eScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLnByZXZpZXc/LmJvZHksIG1lc3NhZ2UyLmJvZHksICdwcmV2aWV3Jyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKG1lc3NhZ2VzLmhhc1VzZXJJbml0aWF0ZWRNZXNzYWdlcyk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0aGUgbGF0ZXN0IG1lc3NhZ2UgaW4gY3VycmVudCBjb252ZXJzYXRpb24gZXhjbHVkaW5nIGdyb3VwIHN0b3J5IHJlcGxpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMixcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDIsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMixcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDMsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMyxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRDb252ZXJzYXRpb25NZXNzYWdlU3RhdHMoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXMuYWN0aXZpdHk/LmJvZHksIG1lc3NhZ2UxLmJvZHksICdhY3Rpdml0eScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLnByZXZpZXc/LmJvZHksIG1lc3NhZ2UxLmJvZHksICdwcmV2aWV3Jyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKG1lc3NhZ2VzLmhhc1VzZXJJbml0aWF0ZWRNZXNzYWdlcyk7XG4gICAgfSk7XG5cbiAgICBpdCgncHJldmlldyBleGNsdWRlcyBzZXZlcmFsIG1lc3NhZ2UgdHlwZXMsIGFsbG93cyB0eXBlID0gTlVMTCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvciBXZSdyZSBmb3JjaW5nIGEgbnVsbCB0eXBlIGhlcmUgZm9yIHRlc3RpbmdcbiAgICAgICAgdHlwZTogbnVsbCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDEsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAxLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDEsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdjaGFuZ2UtbnVtYmVyLW5vdGlmaWNhdGlvbicsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMixcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAyLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnZ3JvdXAtdjEtbWlncmF0aW9uJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDMsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAzLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDMsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICAgIHR5cGU6ICdwcm9maWxlLWNoYW5nZScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyA1LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgNSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyA1LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U1OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDYnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgNixcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDYsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgNixcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA3JyxcbiAgICAgICAgdHlwZTogJ3VuaXZlcnNhbC10aW1lci1ub3RpZmljYXRpb24nLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgNyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDcsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgNyxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA4JyxcbiAgICAgICAgdHlwZTogJ3ZlcmlmaWVkLWNoYW5nZScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyA4LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgOCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyA4LFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFxuICAgICAgICBbbWVzc2FnZTEsIG1lc3NhZ2UyLCBtZXNzYWdlMywgbWVzc2FnZTQsIG1lc3NhZ2U1LCBtZXNzYWdlNiwgbWVzc2FnZTddLFxuICAgICAgICB7XG4gICAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICAgIG91clV1aWQsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgNyk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLnByZXZpZXc/LmJvZHksIG1lc3NhZ2UxLmJvZHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2FjdGl2aXR5IGV4Y2x1ZGVzIHNldmVyYWwgbWVzc2FnZSB0eXBlcywgYWxsb3dzIHR5cGUgPSBOVUxMJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgICAvLyBAdHMtZXhwZWN0LWVycm9yIFdlJ3JlIGZvcmNpbmcgYSBudWxsIHR5cGUgaGVyZSBmb3IgdGVzdGluZ1xuICAgICAgICB0eXBlOiBudWxsLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMSxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDEsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ2NoYW5nZS1udW1iZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDIsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAyLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDIsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICAgIHR5cGU6ICdncm91cC12MS1taWdyYXRpb24nLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDMsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMyxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA0JyxcbiAgICAgICAgdHlwZTogJ2tleWNoYW5nZScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyA0LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgNCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyA0LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2U1OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDYnLFxuICAgICAgICB0eXBlOiAncHJvZmlsZS1jaGFuZ2UnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgNixcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDYsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgNixcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlNjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSA3JyxcbiAgICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDcsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyA3LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDcsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTc6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgOCcsXG4gICAgICAgIHR5cGU6ICd1bml2ZXJzYWwtdGltZXItbm90aWZpY2F0aW9uJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDgsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyA4LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDgsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTg6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgOScsXG4gICAgICAgIHR5cGU6ICd2ZXJpZmllZC1jaGFuZ2UnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93ICsgOSxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDksXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgOSxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhcbiAgICAgICAgW1xuICAgICAgICAgIG1lc3NhZ2UxLFxuICAgICAgICAgIG1lc3NhZ2UyLFxuICAgICAgICAgIG1lc3NhZ2UzLFxuICAgICAgICAgIG1lc3NhZ2U0LFxuICAgICAgICAgIG1lc3NhZ2U1LFxuICAgICAgICAgIG1lc3NhZ2U2LFxuICAgICAgICAgIG1lc3NhZ2U3LFxuICAgICAgICAgIG1lc3NhZ2U4LFxuICAgICAgICBdLFxuICAgICAgICB7XG4gICAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICAgIG91clV1aWQsXG4gICAgICAgIH1cbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgOCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLmFjdGl2aXR5Py5ib2R5LCBtZXNzYWdlMS5ib2R5KTtcbiAgICB9KTtcblxuICAgIGl0KCdhY3Rpdml0eSBleGNsdWRlcyBleHBpcmF0aW9uVGltZXJVcGRhdGVzIHdpdGggZnJvbVN5bmMgPSB0cnVlLCBpbmNsdWRlcyBmcm9tU3luYyA9IHVuZGVmaW5lZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGV4cGlyYXRpb25UaW1lclVwZGF0ZToge1xuICAgICAgICAgIGV4cGlyZVRpbWVyOiAxMCxcbiAgICAgICAgICBzb3VyY2U6ICd5b3UnLFxuICAgICAgICB9LFxuICAgICAgICBzZW50X2F0OiBub3cgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgZXhwaXJhdGlvblRpbWVyVXBkYXRlOiB7XG4gICAgICAgICAgZXhwaXJlVGltZXI6IDEwLFxuICAgICAgICAgIGZyb21TeW5jOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMixcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAyLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTJdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDIpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlcy5hY3Rpdml0eT8uYm9keSwgbWVzc2FnZTEuYm9keSk7XG4gICAgfSk7XG5cbiAgICBpdCgnYWN0aXZpdHkgZXhjbHVkZXMgZXhwaXJhdGlvblRpbWVyVXBkYXRlcyB3aXRoIGZyb21TeW5jID0gdHJ1ZSwgaW5jbHVkZXMgZnJvbVN5bmMgPSBmYWxzZScsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGV4cGlyYXRpb25UaW1lclVwZGF0ZToge1xuICAgICAgICAgIGV4cGlyZVRpbWVyOiAxMCxcbiAgICAgICAgICBzb3VyY2U6ICd5b3UnLFxuICAgICAgICAgIGZyb21TeW5jOiBmYWxzZSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMSxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDEsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGV4cGlyYXRpb25UaW1lclVwZGF0ZToge1xuICAgICAgICAgIGV4cGlyZVRpbWVyOiAxMCxcbiAgICAgICAgICBmcm9tU3luYzogdHJ1ZSxcbiAgICAgICAgfSxcbiAgICAgICAgc2VudF9hdDogbm93ICsgMixcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyArIDIsXG4gICAgICAgIHRpbWVzdGFtcDogbm93ICsgMixcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhbbWVzc2FnZTEsIG1lc3NhZ2UyXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAyKTtcblxuICAgICAgY29uc3QgbWVzc2FnZXMgPSBhd2FpdCBnZXRDb252ZXJzYXRpb25NZXNzYWdlU3RhdHMoe1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXMuYWN0aXZpdHk/LmJvZHksIG1lc3NhZ2UxLmJvZHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3ByZXZpZXcgZXhjbHVkZXMgZXhwaXJlZCBtZXNzYWdlLCBpbmNsdWRlcyBub24tZGlzYXBwZWFyaW5nIG1lc3NhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wOiBub3cgLSAyICogMTAwMCxcbiAgICAgICAgZXhwaXJlVGltZXI6IDEsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDIsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAyLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDIsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMl0sIHtcbiAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMik7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLnByZXZpZXc/LmJvZHksIG1lc3NhZ2UxLmJvZHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3ByZXZpZXcgZXhjbHVkZXMgZXhwaXJlZCBtZXNzYWdlLCBpbmNsdWRlcyBub24tZGlzYXBwZWFyaW5nIG1lc3NhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IG5vdyxcbiAgICAgICAgZXhwaXJlVGltZXI6IDMwLFxuICAgICAgICBzZW50X2F0OiBub3cgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wOiBub3cgLSAyICogMTAwMCxcbiAgICAgICAgZXhwaXJlVGltZXI6IDEsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyArIDIsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgKyAyLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyArIDIsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMl0sIHtcbiAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMik7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VzID0gYXdhaXQgZ2V0Q29udmVyc2F0aW9uTWVzc2FnZVN0YXRzKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2VzLnByZXZpZXc/LmJvZHksIG1lc3NhZ2UxLmJvZHkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2V4Y2x1ZGVzIGdyb3VwIHYyIGNoYW5nZSBldmVudHMgd2hlcmUgc29tZW9uZSBlbHNlIGxlYXZlcyBhIGdyb3VwJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3RoZXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDEgLSByZW1vdmluZyBvdXJzZWx2ZXMnLFxuICAgICAgICB0eXBlOiAnZ3JvdXAtdjItY2hhbmdlJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGdyb3VwVjJDaGFuZ2U6IHtcbiAgICAgICAgICBmcm9tOiBvdXJVdWlkLFxuICAgICAgICAgIGRldGFpbHM6IFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgdHlwZTogJ21lbWJlci1yZW1vdmUnLFxuICAgICAgICAgICAgICB1dWlkOiBvdXJVdWlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBzZW50X2F0OiBub3cgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMSxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDIgLSBzb21lb25lIGVsc2UgbGVhdmluZycsXG4gICAgICAgIHR5cGU6ICdncm91cC12Mi1jaGFuZ2UnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgZ3JvdXBWMkNoYW5nZToge1xuICAgICAgICAgIGZyb206IG90aGVyVXVpZCxcbiAgICAgICAgICBkZXRhaWxzOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIHR5cGU6ICdtZW1iZXItcmVtb3ZlJyxcbiAgICAgICAgICAgICAgdXVpZDogb3RoZXJVdWlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9LFxuICAgICAgICBzZW50X2F0OiBub3cgKyAyLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93ICsgMixcbiAgICAgICAgdGltZXN0YW1wOiBub3cgKyAyLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTJdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDIpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlcyA9IGF3YWl0IGdldENvbnZlcnNhdGlvbk1lc3NhZ2VTdGF0cyh7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlcy5hY3Rpdml0eT8uYm9keSwgbWVzc2FnZTEuYm9keSwgJ2FjdGl2aXR5Jyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZXMucHJldmlldz8uYm9keSwgbWVzc2FnZTEuYm9keSwgJ3ByZXZpZXcnKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKG1lc3NhZ2VzLmhhc1VzZXJJbml0aWF0ZWRNZXNzYWdlcyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUEwQjtBQUMxQixrQkFBcUI7QUFLckIsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULFNBQVMsMkJBQTJCLE1BQU07QUFDeEMsYUFBVyxZQUFZO0FBQ3JCLFVBQU0sVUFBVTtBQUFBLEVBQ2xCLENBQUM7QUFFRCxXQUFTLCtCQUErQixNQUFNO0FBQzVDLE9BQUcsc0RBQXNELFlBQVk7QUFDbkUseUJBQU8sU0FBUyxNQUFNLGdCQUFnQixHQUFHLENBQUM7QUFFMUMsWUFBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixZQUFNLGlCQUFpQixRQUFRO0FBQy9CLFlBQU0sVUFBVSxRQUFRO0FBQ3hCLFlBQU0sV0FBa0M7QUFBQSxRQUN0QyxJQUFJLFFBQVE7QUFBQSxRQUNaLE1BQU07QUFBQSxRQUNOLE1BQU07QUFBQSxRQUNOO0FBQUEsUUFDQSxTQUFTLE1BQU07QUFBQSxRQUNmLGFBQWEsTUFBTTtBQUFBLFFBQ25CLFdBQVcsTUFBTTtBQUFBLE1BQ25CO0FBQ0EsWUFBTSxXQUFrQztBQUFBLFFBQ3RDLElBQUksUUFBUTtBQUFBLFFBQ1osTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ047QUFBQSxRQUNBLFNBQVMsTUFBTTtBQUFBLFFBQ2YsYUFBYSxNQUFNO0FBQUEsUUFDbkIsV0FBVyxNQUFNO0FBQUEsTUFDbkI7QUFDQSxZQUFNLFdBQWtDO0FBQUEsUUFDdEMsSUFBSSxRQUFRO0FBQUEsUUFDWixNQUFNO0FBQUEsUUFDTixNQUFNO0FBQUEsUUFDTixnQkFBZ0IsUUFBUTtBQUFBLFFBQ3hCLFNBQVMsTUFBTTtBQUFBLFFB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
