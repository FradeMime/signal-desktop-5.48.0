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
  saveMessage,
  searchMessages
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/fullTextSearch", () => {
  beforeEach(async () => {
    await removeAll();
  });
  it("returns messages matching query", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const now = Date.now();
    const conversationId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1 - generic string",
      type: "outgoing",
      conversationId,
      sent_at: now - 20,
      received_at: now - 20,
      timestamp: now - 20
    };
    const message2 = {
      id: getUuid(),
      body: "message 2 - unique string",
      type: "outgoing",
      conversationId,
      sent_at: now - 10,
      received_at: now - 10,
      timestamp: now - 10
    };
    const message3 = {
      id: getUuid(),
      body: "message 3 - generic string",
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
    const searchResults = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults, 1);
    import_chai.assert.strictEqual(searchResults[0].id, message2.id);
    message3.body = "message 3 - unique string";
    await saveMessage(message3, { ourUuid });
    const searchResults2 = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults2, 2);
    import_chai.assert.strictEqual(searchResults2[0].id, message3.id);
    import_chai.assert.strictEqual(searchResults2[1].id, message2.id);
  });
  it("excludes messages with isViewOnce = true", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const now = Date.now();
    const conversationId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1 - unique string",
      type: "outgoing",
      conversationId,
      sent_at: now - 20,
      received_at: now - 20,
      timestamp: now - 20
    };
    const message2 = {
      id: getUuid(),
      body: "message 2 - unique string",
      type: "outgoing",
      conversationId,
      sent_at: now - 10,
      received_at: now - 10,
      timestamp: now - 10,
      isViewOnce: true
    };
    const message3 = {
      id: getUuid(),
      body: "message 3 - generic string",
      type: "outgoing",
      conversationId,
      sent_at: now,
      received_at: now,
      timestamp: now,
      isViewOnce: true
    };
    await saveMessages([message1, message2, message3], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 3);
    const searchResults = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults, 1);
    import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    message1.body = "message 3 - unique string";
    await saveMessage(message3, { ourUuid });
    const searchResults2 = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults2, 1);
    import_chai.assert.strictEqual(searchResults2[0].id, message1.id);
  });
  it("excludes messages with storyId !== null", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const now = Date.now();
    const conversationId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1 - unique string",
      type: "outgoing",
      conversationId,
      sent_at: now - 20,
      received_at: now - 20,
      timestamp: now - 20
    };
    const message2 = {
      id: getUuid(),
      body: "message 2 - unique string",
      type: "outgoing",
      conversationId,
      sent_at: now - 10,
      received_at: now - 10,
      timestamp: now - 10,
      storyId: getUuid()
    };
    const message3 = {
      id: getUuid(),
      body: "message 3 - generic string",
      type: "outgoing",
      conversationId,
      sent_at: now,
      received_at: now,
      timestamp: now,
      storyId: getUuid()
    };
    await saveMessages([message1, message2, message3], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 3);
    const searchResults = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults, 1);
    import_chai.assert.strictEqual(searchResults[0].id, message1.id);
    message1.body = "message 3 - unique string";
    await saveMessage(message3, { ourUuid });
    const searchResults2 = await searchMessages("unique");
    import_chai.assert.lengthOf(searchResults2, 1);
    import_chai.assert.strictEqual(searchResults2[0].id, message1.id);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZnVsbFRleHRTZWFyY2hfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5cbmNvbnN0IHtcbiAgcmVtb3ZlQWxsLFxuICBfZ2V0QWxsTWVzc2FnZXMsXG4gIHNhdmVNZXNzYWdlcyxcbiAgc2F2ZU1lc3NhZ2UsXG4gIHNlYXJjaE1lc3NhZ2VzLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmRlc2NyaWJlKCdzcWwvZnVsbFRleHRTZWFyY2gnLCAoKSA9PiB7XG4gIGJlZm9yZUVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGF3YWl0IHJlbW92ZUFsbCgpO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBtZXNzYWdlcyBtYXRjaGluZyBxdWVyeScsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMSAtIGdlbmVyaWMgc3RyaW5nJyxcbiAgICAgIHR5cGU6ICdvdXRnb2luZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IG5vdyAtIDIwLFxuICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyAtIDIwLFxuICAgICAgdGltZXN0YW1wOiBub3cgLSAyMCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMiAtIHVuaXF1ZSBzdHJpbmcnLFxuICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogbm93IC0gMTAsXG4gICAgICByZWNlaXZlZF9hdDogbm93IC0gMTAsXG4gICAgICB0aW1lc3RhbXA6IG5vdyAtIDEwLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAzIC0gZ2VuZXJpYyBzdHJpbmcnLFxuICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogbm93LFxuICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgIH07XG5cbiAgICBhd2FpdCBzYXZlTWVzc2FnZXMoW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTNdLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCAzKTtcblxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMgPSBhd2FpdCBzZWFyY2hNZXNzYWdlcygndW5pcXVlJyk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHNlYXJjaFJlc3VsdHMsIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZWFyY2hSZXN1bHRzWzBdLmlkLCBtZXNzYWdlMi5pZCk7XG5cbiAgICBtZXNzYWdlMy5ib2R5ID0gJ21lc3NhZ2UgMyAtIHVuaXF1ZSBzdHJpbmcnO1xuICAgIGF3YWl0IHNhdmVNZXNzYWdlKG1lc3NhZ2UzLCB7IG91clV1aWQgfSk7XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzMiA9IGF3YWl0IHNlYXJjaE1lc3NhZ2VzKCd1bmlxdWUnKTtcbiAgICBhc3NlcnQubGVuZ3RoT2Yoc2VhcmNoUmVzdWx0czIsIDIpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZWFyY2hSZXN1bHRzMlswXS5pZCwgbWVzc2FnZTMuaWQpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzZWFyY2hSZXN1bHRzMlsxXS5pZCwgbWVzc2FnZTIuaWQpO1xuICB9KTtcblxuICBpdCgnZXhjbHVkZXMgbWVzc2FnZXMgd2l0aCBpc1ZpZXdPbmNlID0gdHJ1ZScsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMSAtIHVuaXF1ZSBzdHJpbmcnLFxuICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogbm93IC0gMjAsXG4gICAgICByZWNlaXZlZF9hdDogbm93IC0gMjAsXG4gICAgICB0aW1lc3RhbXA6IG5vdyAtIDIwLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAyIC0gdW5pcXVlIHN0cmluZycsXG4gICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBub3cgLSAxMCxcbiAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAxMCxcbiAgICAgIHRpbWVzdGFtcDogbm93IC0gMTAsXG4gICAgICBpc1ZpZXdPbmNlOiB0cnVlLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAzIC0gZ2VuZXJpYyBzdHJpbmcnLFxuICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogbm93LFxuICAgICAgcmVjZWl2ZWRfYXQ6IG5vdyxcbiAgICAgIHRpbWVzdGFtcDogbm93LFxuICAgICAgaXNWaWV3T25jZTogdHJ1ZSxcbiAgICB9O1xuXG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzXSwge1xuICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgb3VyVXVpZCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMyk7XG5cbiAgICBjb25zdCBzZWFyY2hSZXN1bHRzID0gYXdhaXQgc2VhcmNoTWVzc2FnZXMoJ3VuaXF1ZScpO1xuICAgIGFzc2VydC5sZW5ndGhPZihzZWFyY2hSZXN1bHRzLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VhcmNoUmVzdWx0c1swXS5pZCwgbWVzc2FnZTEuaWQpO1xuXG4gICAgbWVzc2FnZTEuYm9keSA9ICdtZXNzYWdlIDMgLSB1bmlxdWUgc3RyaW5nJztcbiAgICBhd2FpdCBzYXZlTWVzc2FnZShtZXNzYWdlMywgeyBvdXJVdWlkIH0pO1xuXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0czIgPSBhd2FpdCBzZWFyY2hNZXNzYWdlcygndW5pcXVlJyk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKHNlYXJjaFJlc3VsdHMyLCAxKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2VhcmNoUmVzdWx0czJbMF0uaWQsIG1lc3NhZ2UxLmlkKTtcbiAgfSk7XG5cbiAgaXQoJ2V4Y2x1ZGVzIG1lc3NhZ2VzIHdpdGggc3RvcnlJZCAhPT0gbnVsbCcsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgY29uc3Qgbm93ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMSAtIHVuaXF1ZSBzdHJpbmcnLFxuICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogbm93IC0gMjAsXG4gICAgICByZWNlaXZlZF9hdDogbm93IC0gMjAsXG4gICAgICB0aW1lc3RhbXA6IG5vdyAtIDIwLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAyIC0gdW5pcXVlIHN0cmluZycsXG4gICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBub3cgLSAxMCxcbiAgICAgIHJlY2VpdmVkX2F0OiBub3cgLSAxMCxcbiAgICAgIHRpbWVzdGFtcDogbm93IC0gMTAsXG4gICAgICBzdG9yeUlkOiBnZXRVdWlkKCksXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDMgLSBnZW5lcmljIHN0cmluZycsXG4gICAgICB0eXBlOiAnb3V0Z29pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBub3csXG4gICAgICByZWNlaXZlZF9hdDogbm93LFxuICAgICAgdGltZXN0YW1wOiBub3csXG4gICAgICBzdG9yeUlkOiBnZXRVdWlkKCksXG4gICAgfTtcblxuICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhbbWVzc2FnZTEsIG1lc3NhZ2UyLCBtZXNzYWdlM10sIHtcbiAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgIG91clV1aWQsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDMpO1xuXG4gICAgY29uc3Qgc2VhcmNoUmVzdWx0cyA9IGF3YWl0IHNlYXJjaE1lc3NhZ2VzKCd1bmlxdWUnKTtcbiAgICBhc3NlcnQubGVuZ3RoT2Yoc2VhcmNoUmVzdWx0cywgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlYXJjaFJlc3VsdHNbMF0uaWQsIG1lc3NhZ2UxLmlkKTtcblxuICAgIG1lc3NhZ2UxLmJvZHkgPSAnbWVzc2FnZSAzIC0gdW5pcXVlIHN0cmluZyc7XG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2UobWVzc2FnZTMsIHsgb3VyVXVpZCB9KTtcblxuICAgIGNvbnN0IHNlYXJjaFJlc3VsdHMyID0gYXdhaXQgc2VhcmNoTWVzc2FnZXMoJ3VuaXF1ZScpO1xuICAgIGFzc2VydC5sZW5ndGhPZihzZWFyY2hSZXN1bHRzMiwgMSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNlYXJjaFJlc3VsdHMyWzBdLmlkLCBtZXNzYWdlMS5pZCk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBRXZCLG9CQUEwQjtBQUMxQixrQkFBcUI7QUFLckIsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUVKLG1CQUFtQztBQUNqQyxTQUFPLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQ2xDO0FBRlMsQUFJVCxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLGFBQVcsWUFBWTtBQUNyQixVQUFNLFVBQVU7QUFBQSxFQUNsQixDQUFDO0FBRUQsS0FBRyxtQ0FBbUMsWUFBWTtBQUNoRCx1QkFBTyxTQUFTLE1BQU0sZ0JBQWdCLEdBQUcsQ0FBQztBQUUxQyxVQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLFVBQU0saUJBQWlCLFFBQVE7QUFDL0IsVUFBTSxVQUFVLFFBQVE7QUFDeEIsVUFBTSxXQUFrQztBQUFBLE1BQ3RDLElBQUksUUFBUTtBQUFBLE1BQ1osTUFBTTtBQUFBLE1BQ04sTUFBTTtBQUFBLE1BQ047QUFBQSxNQUNBLFNBQVMsTUFBTTtBQUFBLE1BQ2YsYUFBYSxNQUFNO0FBQUEsTUFDbkIsV0FBVyxNQUFNO0FBQUEsSUFDbkI7QUFDQSxVQUFNLFdBQWtDO0FBQUEsTUFDdEMsSUFBSSxRQUFRO0FBQUEsTUFDWixNQUFNO0FBQUEsTUFDTixNQUFNO0FBQUEsTUFDTjtBQUFBLE1BQ0EsU0FBUyxNQUFNO0FBQUEsTUFDZixhQUFhLE1BQU07QUFBQSxNQUNuQixXQUFXLE1BQU07QUFBQSxJQUNuQjtBQUNBLFVBQU0sV0FBa0M7QUFBQSxNQUN0QyxJQUFJLFFBQVE7QUFBQSxNQUNaLE1BQU07QUFBQSxNQUNOLE1BQU07QUFBQSxNQUNOO0FBQUEsTUFD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
