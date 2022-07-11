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
  getMessagesWithVisualMediaAttachments,
  getMessagesWithFileAttachments
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/allMedia", () => {
  beforeEach(async () => {
    await removeAll();
  });
  describe("getMessagesWithVisualMediaAttachments", () => {
    it("returns messages matching with visual attachments", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        hasVisualMediaAttachments: true
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
        timestamp: now,
        hasVisualMediaAttachments: true
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const searchResults = await getMessagesWithVisualMediaAttachments(conversationId, { limit: 5 });
      import_chai.assert.lengthOf(searchResults, 1);
      import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    });
    it("excludes stories and story replies", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        hasVisualMediaAttachments: true
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10,
        storyId: getUuid(),
        hasVisualMediaAttachments: true
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId: getUuid(),
        hasVisualMediaAttachments: true
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const searchResults = await getMessagesWithVisualMediaAttachments(conversationId, { limit: 5 });
      import_chai.assert.lengthOf(searchResults, 1);
      import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    });
  });
  describe("getMessagesWithFileAttachments", () => {
    it("returns messages matching with visual attachments", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        hasFileAttachments: true
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
        timestamp: now,
        hasFileAttachments: true
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const searchResults = await getMessagesWithFileAttachments(conversationId, { limit: 5 });
      import_chai.assert.lengthOf(searchResults, 1);
      import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    });
    it("excludes stories and story replies", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const message1 = {
        id: getUuid(),
        body: "message 1",
        type: "outgoing",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        hasFileAttachments: true
      };
      const message2 = {
        id: getUuid(),
        body: "message 2",
        type: "outgoing",
        conversationId,
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10,
        storyId: getUuid(),
        hasFileAttachments: true
      };
      const message3 = {
        id: getUuid(),
        body: "message 3",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        storyId: getUuid(),
        hasFileAttachments: true
      };
      await saveMessages([message1, message2, message3], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 3);
      const searchResults = await getMessagesWithFileAttachments(conversationId, { limit: 5 });
      import_chai.assert.lengthOf(searchResults, 1);
      import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWxsTWVkaWFfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5cbmNvbnN0IHtcbiAgcmVtb3ZlQWxsLFxuICBfZ2V0QWxsTWVzc2FnZXMsXG4gIHNhdmVNZXNzYWdlcyxcbiAgZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cyxcbiAgZ2V0TWVzc2FnZXNXaXRoRmlsZUF0dGFjaG1lbnRzLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmRlc2NyaWJlKCdzcWwvYWxsTWVkaWEnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlbW92ZUFsbCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TWVzc2FnZXNXaXRoVmlzdWFsTWVkaWFBdHRhY2htZW50cycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBtZXNzYWdlcyBtYXRjaGluZyB3aXRoIHZpc3VhbCBhdHRhY2htZW50cycsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93IC0gMjAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93IC0gMjAsXG4gICAgICAgIGhhc1Zpc3VhbE1lZGlhQXR0YWNobWVudHM6IHRydWUsXG4gICAgICB9O1xuICAgICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBzZW50X2F0OiBub3csXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3csXG4gICAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IGdldE1lc3NhZ2VzV2l0aFZpc3VhbE1lZGlhQXR0YWNobWVudHMoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICB7IGxpbWl0OiA1IH1cbiAgICAgICk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2Yoc2VhcmNoUmVzdWx0cywgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VhcmNoUmVzdWx0c1swXS5pZCwgbWVzc2FnZTEuaWQpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2V4Y2x1ZGVzIHN0b3JpZXMgYW5kIHN0b3J5IHJlcGxpZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAyMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDIwLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93IC0gMTAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAxMCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgLSAxMCxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBoYXNWaXN1YWxNZWRpYUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IGdldE1lc3NhZ2VzV2l0aFZpc3VhbE1lZGlhQXR0YWNobWVudHMoXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICB7IGxpbWl0OiA1IH1cbiAgICAgICk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2Yoc2VhcmNoUmVzdWx0cywgMSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VhcmNoUmVzdWx0c1swXS5pZCwgbWVzc2FnZTEuaWQpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0TWVzc2FnZXNXaXRoRmlsZUF0dGFjaG1lbnRzJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIG1lc3NhZ2VzIG1hdGNoaW5nIHdpdGggdmlzdWFsIGF0dGFjaG1lbnRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93IC0gMjAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAyMCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgLSAyMCxcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93IC0gMTAsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAxMCxcbiAgICAgICAgdGltZXN0YW1wOiBub3cgLSAxMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcblxuICAgICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IGdldE1lc3NhZ2VzV2l0aEZpbGVBdHRhY2htZW50cyhcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHsgbGltaXQ6IDUgfVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihzZWFyY2hSZXN1bHRzLCAxKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZWFyY2hSZXN1bHRzWzBdLmlkLCBtZXNzYWdlMS5pZCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZXhjbHVkZXMgc3RvcmllcyBhbmQgc3RvcnkgcmVwbGllcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93IC0gMjAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93IC0gMjAsXG4gICAgICAgIGhhc0ZpbGVBdHRhY2htZW50czogdHJ1ZSxcbiAgICAgIH07XG4gICAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyAtIDEwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93IC0gMTAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93IC0gMTAsXG4gICAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICAgICAgaGFzRmlsZUF0dGFjaG1lbnRzOiB0cnVlLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgICAgICBoYXNGaWxlQXR0YWNobWVudHM6IHRydWUsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgZ2V0TWVzc2FnZXNXaXRoRmlsZUF0dGFjaG1lbnRzKFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgeyBsaW1pdDogNSB9XG4gICAgICApO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHNlYXJjaFJlc3VsdHMsIDEpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlYXJjaFJlc3VsdHNbMF0uaWQsIG1lc3NhZ2UxLmlkKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsb0JBQTBCO0FBQzFCLGtCQUFxQjtBQUtyQixNQUFNO0FBQUEsRUFDSjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULFNBQVMsZ0JBQWdCLE1BQU07QUFDN0IsYUFBVyxZQUFZO0FBQ3JCLFVBQU0sVUFBVTtBQUFBLEVB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
