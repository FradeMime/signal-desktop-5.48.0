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
const { removeAll, _getAllMessages, saveMessages, getOlderStories } = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/stories", () => {
  beforeEach(async () => {
    await removeAll();
  });
  describe("getOlderStories", () => {
    it("returns N most recent stories overall, or in converation, or by author", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const now = Date.now();
      const conversationId = getUuid();
      const sourceUuid = getUuid();
      const ourUuid = getUuid();
      const story1 = {
        id: getUuid(),
        body: "story 1",
        type: "story",
        conversationId,
        sent_at: now - 20,
        received_at: now - 20,
        timestamp: now - 20,
        sourceUuid: getUuid()
      };
      const story2 = {
        id: getUuid(),
        body: "story 2",
        type: "story",
        conversationId: getUuid(),
        sent_at: now - 10,
        received_at: now - 10,
        timestamp: now - 10,
        sourceUuid
      };
      const story3 = {
        id: getUuid(),
        body: "message 3",
        type: "incoming",
        conversationId: getUuid(),
        sent_at: now,
        received_at: now,
        timestamp: now,
        sourceUuid
      };
      const story4 = {
        id: getUuid(),
        body: "story 4",
        type: "story",
        conversationId,
        sent_at: now,
        received_at: now,
        timestamp: now,
        sourceUuid: getUuid()
      };
      const story5 = {
        id: getUuid(),
        body: "story 5",
        type: "story",
        conversationId: getUuid(),
        sent_at: now,
        received_at: now,
        timestamp: now,
        sourceUuid
      };
      await saveMessages([story1, story2, story3, story4, story5], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 5);
      const stories = await getOlderStories({
        limit: 5
      });
      import_chai.assert.lengthOf(stories, 4, "expect four total stories");
      import_chai.assert.strictEqual(stories[0].id, story1.id, "stories first should be story5");
      import_chai.assert.strictEqual(stories[3].id, story5.id, "stories last should be story1");
      const storiesInConversation = await getOlderStories({
        conversationId,
        limit: 5
      });
      import_chai.assert.lengthOf(storiesInConversation, 2, "expect two stories in conversaton");
      import_chai.assert.strictEqual(storiesInConversation[0].id, story1.id, "storiesInConversation first should be story4");
      import_chai.assert.strictEqual(storiesInConversation[1].id, story4.id, "storiesInConversation last should be story1");
      const storiesByAuthor = await getOlderStories({
        sourceUuid,
        limit: 5
      });
      import_chai.assert.lengthOf(storiesByAuthor, 2, "expect two stories by author");
      import_chai.assert.strictEqual(storiesByAuthor[0].id, story2.id, "storiesByAuthor first should be story5");
      import_chai.assert.strictEqual(storiesByAuthor[1].id, story5.id, "storiesByAuthor last should be story2");
    });
    it("returns N stories older than provided receivedAt/sentAt", async () => {
      import_chai.assert.lengthOf(await _getAllMessages(), 0);
      const start = Date.now();
      const conversationId = getUuid();
      const ourUuid = getUuid();
      const story1 = {
        id: getUuid(),
        body: "message 1",
        type: "incoming",
        conversationId,
        sent_at: start - 2,
        received_at: start - 2,
        timestamp: start - 2
      };
      const story2 = {
        id: getUuid(),
        body: "story 2",
        type: "story",
        conversationId,
        sent_at: start - 1,
        received_at: start - 1,
        timestamp: start - 1
      };
      const story3 = {
        id: getUuid(),
        body: "story 3",
        type: "story",
        conversationId,
        sent_at: start - 1,
        received_at: start,
        timestamp: start
      };
      const story4 = {
        id: getUuid(),
        body: "story 4",
        type: "story",
        conversationId,
        sent_at: start,
        received_at: start,
        timestamp: start
      };
      const story5 = {
        id: getUuid(),
        body: "story 5",
        type: "story",
        conversationId,
        sent_at: start + 1,
        received_at: start + 1,
        timestamp: start + 1
      };
      await saveMessages([story1, story2, story3, story4, story5], {
        forceSave: true,
        ourUuid
      });
      import_chai.assert.lengthOf(await _getAllMessages(), 5);
      const stories = await getOlderStories({
        receivedAt: story4.received_at,
        sentAt: story4.sent_at,
        limit: 5
      });
      import_chai.assert.lengthOf(stories, 2, "expect two stories");
      import_chai.assert.strictEqual(stories[0].id, story2.id, "stories first should be story3");
      import_chai.assert.strictEqual(stories[1].id, story3.id, "stories last should be story2");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3Rvcmllc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgZGF0YUludGVyZmFjZSBmcm9tICcuLi8uLi9zcWwvQ2xpZW50JztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcblxuaW1wb3J0IHR5cGUgeyBNZXNzYWdlQXR0cmlidXRlc1R5cGUgfSBmcm9tICcuLi8uLi9tb2RlbC10eXBlcy5kJztcblxuY29uc3QgeyByZW1vdmVBbGwsIF9nZXRBbGxNZXNzYWdlcywgc2F2ZU1lc3NhZ2VzLCBnZXRPbGRlclN0b3JpZXMgfSA9XG4gIGRhdGFJbnRlcmZhY2U7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmRlc2NyaWJlKCdzcWwvc3RvcmllcycsICgpID0+IHtcbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgcmVtb3ZlQWxsKCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRPbGRlclN0b3JpZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgTiBtb3N0IHJlY2VudCBzdG9yaWVzIG92ZXJhbGwsIG9yIGluIGNvbnZlcmF0aW9uLCBvciBieSBhdXRob3InLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBzb3VyY2VVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgICAgY29uc3Qgc3RvcnkxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICAgIGJvZHk6ICdzdG9yeSAxJyxcbiAgICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IG5vdyAtIDIwLFxuICAgICAgICByZWNlaXZlZF9hdDogbm93IC0gMjAsXG4gICAgICAgIHRpbWVzdGFtcDogbm93IC0gMjAsXG4gICAgICAgIHNvdXJjZVV1aWQ6IGdldFV1aWQoKSxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yeTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3N0b3J5IDInLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICBzZW50X2F0OiBub3cgLSAxMCxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDEwLFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyAtIDEwLFxuICAgICAgICBzb3VyY2VVdWlkLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3J5MzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc291cmNlVXVpZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yeTQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3N0b3J5IDQnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogbm93LFxuICAgICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgICB0aW1lc3RhbXA6IG5vdyxcbiAgICAgICAgc291cmNlVXVpZDogZ2V0VXVpZCgpLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3J5NTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnc3RvcnkgNScsXG4gICAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICAgIHNlbnRfYXQ6IG5vdyxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICAgIHNvdXJjZVV1aWQsXG4gICAgICB9O1xuXG4gICAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW3N0b3J5MSwgc3RvcnkyLCBzdG9yeTMsIHN0b3J5NCwgc3Rvcnk1XSwge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCA1KTtcblxuICAgICAgY29uc3Qgc3RvcmllcyA9IGF3YWl0IGdldE9sZGVyU3Rvcmllcyh7XG4gICAgICAgIGxpbWl0OiA1LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2Yoc3RvcmllcywgNCwgJ2V4cGVjdCBmb3VyIHRvdGFsIHN0b3JpZXMnKTtcblxuICAgICAgLy8gVGhleSBhcmUgaW4gQVNDIG9yZGVyXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHN0b3JpZXNbMF0uaWQsXG4gICAgICAgIHN0b3J5MS5pZCxcbiAgICAgICAgJ3N0b3JpZXMgZmlyc3Qgc2hvdWxkIGJlIHN0b3J5NSdcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHN0b3JpZXNbM10uaWQsXG4gICAgICAgIHN0b3J5NS5pZCxcbiAgICAgICAgJ3N0b3JpZXMgbGFzdCBzaG91bGQgYmUgc3RvcnkxJ1xuICAgICAgKTtcblxuICAgICAgY29uc3Qgc3Rvcmllc0luQ29udmVyc2F0aW9uID0gYXdhaXQgZ2V0T2xkZXJTdG9yaWVzKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGxpbWl0OiA1LFxuICAgICAgfSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoXG4gICAgICAgIHN0b3JpZXNJbkNvbnZlcnNhdGlvbixcbiAgICAgICAgMixcbiAgICAgICAgJ2V4cGVjdCB0d28gc3RvcmllcyBpbiBjb252ZXJzYXRvbidcbiAgICAgICk7XG5cbiAgICAgIC8vIFRoZXkgYXJlIGluIEFTQyBvcmRlclxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBzdG9yaWVzSW5Db252ZXJzYXRpb25bMF0uaWQsXG4gICAgICAgIHN0b3J5MS5pZCxcbiAgICAgICAgJ3N0b3JpZXNJbkNvbnZlcnNhdGlvbiBmaXJzdCBzaG91bGQgYmUgc3Rvcnk0J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgc3Rvcmllc0luQ29udmVyc2F0aW9uWzFdLmlkLFxuICAgICAgICBzdG9yeTQuaWQsXG4gICAgICAgICdzdG9yaWVzSW5Db252ZXJzYXRpb24gbGFzdCBzaG91bGQgYmUgc3RvcnkxJ1xuICAgICAgKTtcblxuICAgICAgY29uc3Qgc3Rvcmllc0J5QXV0aG9yID0gYXdhaXQgZ2V0T2xkZXJTdG9yaWVzKHtcbiAgICAgICAgc291cmNlVXVpZCxcbiAgICAgICAgbGltaXQ6IDUsXG4gICAgICB9KTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihzdG9yaWVzQnlBdXRob3IsIDIsICdleHBlY3QgdHdvIHN0b3JpZXMgYnkgYXV0aG9yJyk7XG5cbiAgICAgIC8vIFRoZXkgYXJlIGluIEFTQyBvcmRlclxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICBzdG9yaWVzQnlBdXRob3JbMF0uaWQsXG4gICAgICAgIHN0b3J5Mi5pZCxcbiAgICAgICAgJ3N0b3JpZXNCeUF1dGhvciBmaXJzdCBzaG91bGQgYmUgc3Rvcnk1J1xuICAgICAgKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgc3Rvcmllc0J5QXV0aG9yWzFdLmlkLFxuICAgICAgICBzdG9yeTUuaWQsXG4gICAgICAgICdzdG9yaWVzQnlBdXRob3IgbGFzdCBzaG91bGQgYmUgc3RvcnkyJ1xuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIE4gc3RvcmllcyBvbGRlciB0aGFuIHByb3ZpZGVkIHJlY2VpdmVkQXQvc2VudEF0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAwKTtcblxuICAgICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgICBjb25zdCBzdG9yeTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBzdGFydCAtIDIsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCAtIDIsXG4gICAgICAgIHRpbWVzdGFtcDogc3RhcnQgLSAyLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3J5MjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnc3RvcnkgMicsXG4gICAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBzdGFydCAtIDEsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCAtIDEsXG4gICAgICAgIHRpbWVzdGFtcDogc3RhcnQgLSAxLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHN0b3J5MzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgICBib2R5OiAnc3RvcnkgMycsXG4gICAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBzZW50X2F0OiBzdGFydCAtIDEsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCxcbiAgICAgICAgdGltZXN0YW1wOiBzdGFydCxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yeTQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3N0b3J5IDQnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogc3RhcnQsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCxcbiAgICAgICAgdGltZXN0YW1wOiBzdGFydCxcbiAgICAgIH07XG4gICAgICBjb25zdCBzdG9yeTU6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3N0b3J5IDUnLFxuICAgICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgc2VudF9hdDogc3RhcnQgKyAxLFxuICAgICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAxLFxuICAgICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMSxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhbc3RvcnkxLCBzdG9yeTIsIHN0b3J5Mywgc3Rvcnk0LCBzdG9yeTVdLCB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDUpO1xuXG4gICAgICBjb25zdCBzdG9yaWVzID0gYXdhaXQgZ2V0T2xkZXJTdG9yaWVzKHtcbiAgICAgICAgcmVjZWl2ZWRBdDogc3Rvcnk0LnJlY2VpdmVkX2F0LFxuICAgICAgICBzZW50QXQ6IHN0b3J5NC5zZW50X2F0LFxuICAgICAgICBsaW1pdDogNSxcbiAgICAgIH0pO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKHN0b3JpZXMsIDIsICdleHBlY3QgdHdvIHN0b3JpZXMnKTtcblxuICAgICAgLy8gVGhleSBhcmUgaW4gQVNDIG9yZGVyXG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHN0b3JpZXNbMF0uaWQsXG4gICAgICAgIHN0b3J5Mi5pZCxcbiAgICAgICAgJ3N0b3JpZXMgZmlyc3Qgc2hvdWxkIGJlIHN0b3J5MydcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgIHN0b3JpZXNbMV0uaWQsXG4gICAgICAgIHN0b3J5My5pZCxcbiAgICAgICAgJ3N0b3JpZXMgbGFzdCBzaG91bGQgYmUgc3RvcnkyJ1xuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsb0JBQTBCO0FBQzFCLGtCQUFxQjtBQUtyQixNQUFNLEVB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
