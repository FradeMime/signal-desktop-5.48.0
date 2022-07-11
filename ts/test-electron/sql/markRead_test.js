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
  _removeAllMessages,
  _removeAllReactions,
  _getAllReactions,
  _getAllMessages,
  addReaction,
  saveMessages,
  getTotalUnreadForConversation,
  getUnreadByConversationAndMarkRead,
  getUnreadReactionsAndMarkRead
} = import_Client.default;
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
describe("sql/markRead", () => {
  beforeEach(async () => {
    await _removeAllMessages();
    await _removeAllReactions();
  });
  it("properly finds and reads unread messages in current conversation", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const start = Date.now();
    const readAt = start + 20;
    const conversationId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "incoming",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1,
      readStatus: import_MessageReadStatus.ReadStatus.Read
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId: getUuid(),
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message5 = {
      id: getUuid(),
      body: "message 5",
      type: "story",
      conversationId,
      sent_at: start + 5,
      received_at: start + 5,
      timestamp: start + 5,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId: getUuid()
    };
    const message6 = {
      id: getUuid(),
      body: "message 6",
      type: "incoming",
      conversationId,
      sent_at: start + 6,
      received_at: start + 6,
      timestamp: start + 6,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId: getUuid()
    };
    const message7 = {
      id: getUuid(),
      body: "message 7",
      type: "incoming",
      conversationId,
      sent_at: start + 7,
      received_at: start + 7,
      timestamp: start + 7,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    await saveMessages([message1, message2, message3, message4, message5, message6, message7], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 7);
    import_chai.assert.strictEqual(await getTotalUnreadForConversation(conversationId, {
      storyId: void 0,
      isGroup: false
    }), 4, "unread count");
    const markedRead = await getUnreadByConversationAndMarkRead({
      conversationId,
      newestUnreadAt: message4.received_at,
      readAt
    });
    import_chai.assert.lengthOf(markedRead, 2, "two messages marked read");
    import_chai.assert.strictEqual(await getTotalUnreadForConversation(conversationId, {
      storyId: void 0,
      isGroup: false
    }), 2, "unread count");
    import_chai.assert.strictEqual(markedRead[0].id, message4.id, "first should be message4");
    import_chai.assert.strictEqual(markedRead[1].id, message2.id, "second should be message2");
    const markedRead2 = await getUnreadByConversationAndMarkRead({
      conversationId,
      newestUnreadAt: message7.received_at,
      readAt
    });
    import_chai.assert.lengthOf(markedRead2, 2, "two messages marked read");
    import_chai.assert.strictEqual(markedRead2[0].id, message7.id, "should be message7");
    import_chai.assert.strictEqual(await getTotalUnreadForConversation(conversationId, {
      storyId: void 0,
      isGroup: false
    }), 0, "unread count");
  });
  it("properly finds and reads unread messages in story", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const start = Date.now();
    const readAt = start + 20;
    const conversationId = getUuid();
    const storyId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "story",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1,
      readStatus: import_MessageReadStatus.ReadStatus.Read,
      storyId
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId,
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId: getUuid()
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId
    };
    const message5 = {
      id: getUuid(),
      body: "message 5",
      type: "incoming",
      conversationId,
      sent_at: start + 5,
      received_at: start + 5,
      timestamp: start + 5,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId: getUuid()
    };
    const message6 = {
      id: getUuid(),
      body: "message 6",
      type: "incoming",
      conversationId,
      sent_at: start + 6,
      received_at: start + 6,
      timestamp: start + 6,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId: getUuid()
    };
    const message7 = {
      id: getUuid(),
      body: "message 7",
      type: "incoming",
      conversationId,
      sent_at: start + 7,
      received_at: start + 7,
      timestamp: start + 7,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId
    };
    await saveMessages([message1, message2, message3, message4, message5, message6, message7], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 7);
    const markedRead = await getUnreadByConversationAndMarkRead({
      conversationId,
      newestUnreadAt: message7.received_at,
      readAt,
      storyId
    });
    import_chai.assert.lengthOf(markedRead, 3, "three messages marked read");
    import_chai.assert.strictEqual(markedRead[0].id, message7.id, "first should be message7");
    import_chai.assert.strictEqual(markedRead[1].id, message4.id, "first should be message4");
    import_chai.assert.strictEqual(markedRead[2].id, message2.id, "second should be message2");
  });
  it("properly starts disappearing message timer, even if message is already read", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const start = Date.now();
    const readAt = start + 20;
    const conversationId = getUuid();
    const expireTimer = 15;
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "incoming",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1,
      expireTimer,
      expirationStartTimestamp: start + 1,
      readStatus: import_MessageReadStatus.ReadStatus.Read
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      expireTimer,
      readStatus: import_MessageReadStatus.ReadStatus.Read
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId: getUuid(),
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3,
      expireTimer,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4,
      expireTimer,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message5 = {
      id: getUuid(),
      body: "message 5",
      type: "incoming",
      conversationId,
      sent_at: start + 5,
      received_at: start + 5,
      timestamp: start + 5,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    await saveMessages([message1, message2, message3, message4, message5], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.strictEqual(await getTotalUnreadForConversation(conversationId, {
      storyId: void 0,
      isGroup: false
    }), 2, "unread count");
    import_chai.assert.lengthOf(await _getAllMessages(), 5);
    const markedRead = await getUnreadByConversationAndMarkRead({
      conversationId,
      newestUnreadAt: message4.received_at,
      readAt
    });
    import_chai.assert.lengthOf(markedRead, 1, "one message marked read");
    import_chai.assert.strictEqual(markedRead[0].id, message4.id, "first should be message4");
    import_chai.assert.strictEqual(await getTotalUnreadForConversation(conversationId, {
      storyId: void 0,
      isGroup: false
    }), 1, "unread count");
    const allMessages = await _getAllMessages();
    const sorted = allMessages.sort((left, right) => left.timestamp - right.timestamp);
    import_chai.assert.strictEqual(sorted[1].id, message2.id, "checking message 2");
    import_chai.assert.isAtMost(sorted[1].expirationStartTimestamp ?? Infinity, Date.now(), "checking message 2 expirationStartTimestamp");
    import_chai.assert.strictEqual(sorted[3].id, message4.id, "checking message 4");
    import_chai.assert.isAtMost(sorted[3].expirationStartTimestamp ?? Infinity, Date.now(), "checking message 4 expirationStartTimestamp");
  });
  it("properly finds and reads unread reactions in current conversation", async () => {
    import_chai.assert.lengthOf(await _getAllReactions(), 0);
    const start = Date.now();
    const conversationId = getUuid();
    const storyId = getUuid();
    const ourUuid = getUuid();
    const pad = Array.from({ length: 4 }, (_) => {
      return {
        id: getUuid(),
        body: "pad message",
        type: "incoming",
        conversationId,
        sent_at: start - 1,
        received_at: start - 1,
        timestamp: start - 1
      };
    });
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "incoming",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      storyId
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId: getUuid(),
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4
    };
    const message5 = {
      id: getUuid(),
      body: "message 5",
      type: "incoming",
      conversationId,
      sent_at: start + 5,
      received_at: start + 5,
      timestamp: start + 5
    };
    await saveMessages([...pad, message1, message2, message3, message4, message5], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), pad.length + 5);
    const reaction1 = {
      conversationId,
      emoji: "\u{1F389}",
      fromId: getUuid(),
      messageId: message1.id,
      messageReceivedAt: message1.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction2 = {
      conversationId,
      emoji: "\u{1F680}",
      fromId: getUuid(),
      messageId: message2.id,
      messageReceivedAt: message2.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction3 = {
      conversationId: getUuid(),
      emoji: "\u2600\uFE0F",
      fromId: getUuid(),
      messageId: message3.id,
      messageReceivedAt: message3.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction4 = {
      conversationId,
      emoji: "\u2764\uFE0F\u200D\u{1F525}",
      fromId: getUuid(),
      messageId: message4.id,
      messageReceivedAt: message4.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction5 = {
      conversationId,
      emoji: "\u{1F192}",
      fromId: getUuid(),
      messageId: message5.id,
      messageReceivedAt: message5.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    await addReaction(reaction1);
    await addReaction(reaction2);
    await addReaction(reaction3);
    await addReaction(reaction4);
    await addReaction(reaction5);
    import_chai.assert.lengthOf(await _getAllReactions(), 5);
    const markedRead = await getUnreadReactionsAndMarkRead({
      conversationId,
      newestUnreadAt: reaction4.messageReceivedAt
    });
    import_chai.assert.lengthOf(markedRead, 2, "two reactions marked read");
    import_chai.assert.strictEqual(markedRead[0].messageId, reaction4.messageId, "first should be reaction4");
    import_chai.assert.strictEqual(markedRead[1].messageId, reaction1.messageId, "second should be reaction1");
    const markedRead2 = await getUnreadReactionsAndMarkRead({
      conversationId,
      newestUnreadAt: reaction5.messageReceivedAt
    });
    import_chai.assert.lengthOf(markedRead2, 1);
    import_chai.assert.strictEqual(markedRead2[0].messageId, reaction5.messageId, "should be reaction5");
  });
  it("properly finds and reads unread reactions in story", async () => {
    import_chai.assert.lengthOf(await _getAllReactions(), 0);
    const start = Date.now();
    const conversationId = getUuid();
    const storyId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "incoming",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1,
      storyId
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      storyId: getUuid()
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId: getUuid(),
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4,
      storyId
    };
    const message5 = {
      id: getUuid(),
      body: "message 5",
      type: "incoming",
      conversationId,
      sent_at: start + 5,
      received_at: start + 5,
      timestamp: start + 5,
      storyId
    };
    await saveMessages([message1, message2, message3, message4, message5], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 5);
    const reaction1 = {
      conversationId,
      emoji: "\u{1F389}",
      fromId: getUuid(),
      messageId: message1.id,
      messageReceivedAt: message1.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction2 = {
      conversationId,
      emoji: "\u{1F680}",
      fromId: getUuid(),
      messageId: message2.id,
      messageReceivedAt: message2.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction3 = {
      conversationId: getUuid(),
      emoji: "\u2600\uFE0F",
      fromId: getUuid(),
      messageId: message3.id,
      messageReceivedAt: message3.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction4 = {
      conversationId,
      emoji: "\u2764\uFE0F\u200D\u{1F525}",
      fromId: getUuid(),
      messageId: message4.id,
      messageReceivedAt: message4.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    const reaction5 = {
      conversationId,
      emoji: "\u{1F192}",
      fromId: getUuid(),
      messageId: message5.id,
      messageReceivedAt: message5.received_at,
      targetAuthorUuid: getUuid(),
      targetTimestamp: start
    };
    await addReaction(reaction1);
    await addReaction(reaction2);
    await addReaction(reaction3);
    await addReaction(reaction4);
    await addReaction(reaction5);
    import_chai.assert.lengthOf(await _getAllReactions(), 5);
    const markedRead = await getUnreadReactionsAndMarkRead({
      conversationId,
      newestUnreadAt: reaction4.messageReceivedAt,
      storyId
    });
    import_chai.assert.lengthOf(markedRead, 2, "two reactions marked read");
    import_chai.assert.strictEqual(markedRead[0].messageId, reaction4.messageId, "first should be reaction4");
    import_chai.assert.strictEqual(markedRead[1].messageId, reaction1.messageId, "second should be reaction1");
    const markedRead2 = await getUnreadReactionsAndMarkRead({
      conversationId,
      newestUnreadAt: reaction5.messageReceivedAt,
      storyId
    });
    import_chai.assert.lengthOf(markedRead2, 1);
    import_chai.assert.strictEqual(markedRead2[0].messageId, reaction5.messageId, "should be reaction5");
  });
  it("does not include group story replies", async () => {
    import_chai.assert.lengthOf(await _getAllMessages(), 0);
    const start = Date.now();
    const readAt = start + 20;
    const conversationId = getUuid();
    const storyId = getUuid();
    const ourUuid = getUuid();
    const message1 = {
      id: getUuid(),
      body: "message 1",
      type: "story",
      conversationId,
      sent_at: start + 1,
      received_at: start + 1,
      timestamp: start + 1,
      readStatus: import_MessageReadStatus.ReadStatus.Read
    };
    const message2 = {
      id: getUuid(),
      body: "message 2",
      type: "incoming",
      conversationId,
      sent_at: start + 2,
      received_at: start + 2,
      timestamp: start + 2,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId
    };
    const message3 = {
      id: getUuid(),
      body: "message 3",
      type: "incoming",
      conversationId,
      sent_at: start + 3,
      received_at: start + 3,
      timestamp: start + 3,
      readStatus: import_MessageReadStatus.ReadStatus.Unread
    };
    const message4 = {
      id: getUuid(),
      body: "message 4",
      type: "incoming",
      conversationId,
      sent_at: start + 4,
      received_at: start + 4,
      timestamp: start + 4,
      readStatus: import_MessageReadStatus.ReadStatus.Unread,
      storyId
    };
    await saveMessages([message1, message2, message3, message4], {
      forceSave: true,
      ourUuid
    });
    import_chai.assert.lengthOf(await _getAllMessages(), 4);
    const markedRead = await getUnreadByConversationAndMarkRead({
      conversationId,
      isGroup: true,
      newestUnreadAt: message4.received_at,
      readAt
    });
    import_chai.assert.lengthOf(markedRead, 1, "1 message marked read");
    import_chai.assert.strictEqual(markedRead[0].id, message3.id, "first should be message3");
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFya1JlYWRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IGRhdGFJbnRlcmZhY2UgZnJvbSAnLi4vLi4vc3FsL0NsaWVudCc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5cbmltcG9ydCB0eXBlIHsgUmVhY3Rpb25UeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvUmVhY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgTWVzc2FnZUF0dHJpYnV0ZXNUeXBlIH0gZnJvbSAnLi4vLi4vbW9kZWwtdHlwZXMuZCc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuXG5jb25zdCB7XG4gIF9yZW1vdmVBbGxNZXNzYWdlcyxcbiAgX3JlbW92ZUFsbFJlYWN0aW9ucyxcbiAgX2dldEFsbFJlYWN0aW9ucyxcbiAgX2dldEFsbE1lc3NhZ2VzLFxuICBhZGRSZWFjdGlvbixcbiAgc2F2ZU1lc3NhZ2VzLFxuICBnZXRUb3RhbFVucmVhZEZvckNvbnZlcnNhdGlvbixcbiAgZ2V0VW5yZWFkQnlDb252ZXJzYXRpb25BbmRNYXJrUmVhZCxcbiAgZ2V0VW5yZWFkUmVhY3Rpb25zQW5kTWFya1JlYWQsXG59ID0gZGF0YUludGVyZmFjZTtcblxuZnVuY3Rpb24gZ2V0VXVpZCgpOiBVVUlEU3RyaW5nVHlwZSB7XG4gIHJldHVybiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbn1cblxuZGVzY3JpYmUoJ3NxbC9tYXJrUmVhZCcsICgpID0+IHtcbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgX3JlbW92ZUFsbE1lc3NhZ2VzKCk7XG4gICAgYXdhaXQgX3JlbW92ZUFsbFJlYWN0aW9ucygpO1xuICB9KTtcblxuICBpdCgncHJvcGVybHkgZmluZHMgYW5kIHJlYWRzIHVucmVhZCBtZXNzYWdlcyBpbiBjdXJyZW50IGNvbnZlcnNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHJlYWRBdCA9IHN0YXJ0ICsgMjA7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgY29uc3Qgb3VyVXVpZCA9IGdldFV1aWQoKTtcblxuICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDEsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAxLFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDEsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAyLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMixcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAyLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMzogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDMnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICBzZW50X2F0OiBzdGFydCArIDMsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAzLFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDMsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U0OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNCcsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDQsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA0LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDQsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U1OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICB0eXBlOiAnc3RvcnknLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDUsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA1LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDUsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U2OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNicsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDYsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA2LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDYsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U3OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNycsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDcsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA3LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDcsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuXG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFxuICAgICAgW21lc3NhZ2UxLCBtZXNzYWdlMiwgbWVzc2FnZTMsIG1lc3NhZ2U0LCBtZXNzYWdlNSwgbWVzc2FnZTYsIG1lc3NhZ2U3XSxcbiAgICAgIHtcbiAgICAgICAgZm9yY2VTYXZlOiB0cnVlLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfVxuICAgICk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDcpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGF3YWl0IGdldFRvdGFsVW5yZWFkRm9yQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIDQsXG4gICAgICAndW5yZWFkIGNvdW50J1xuICAgICk7XG5cbiAgICBjb25zdCBtYXJrZWRSZWFkID0gYXdhaXQgZ2V0VW5yZWFkQnlDb252ZXJzYXRpb25BbmRNYXJrUmVhZCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG5ld2VzdFVucmVhZEF0OiBtZXNzYWdlNC5yZWNlaXZlZF9hdCxcbiAgICAgIHJlYWRBdCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihtYXJrZWRSZWFkLCAyLCAndHdvIG1lc3NhZ2VzIG1hcmtlZCByZWFkJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgYXdhaXQgZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgc3RvcnlJZDogdW5kZWZpbmVkLFxuICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgMixcbiAgICAgICd1bnJlYWQgY291bnQnXG4gICAgKTtcblxuICAgIC8vIFNvcnRlZCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgbWFya2VkUmVhZFswXS5pZCxcbiAgICAgIG1lc3NhZ2U0LmlkLFxuICAgICAgJ2ZpcnN0IHNob3VsZCBiZSBtZXNzYWdlNCdcbiAgICApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWRbMV0uaWQsXG4gICAgICBtZXNzYWdlMi5pZCxcbiAgICAgICdzZWNvbmQgc2hvdWxkIGJlIG1lc3NhZ2UyJ1xuICAgICk7XG5cbiAgICBjb25zdCBtYXJrZWRSZWFkMiA9IGF3YWl0IGdldFVucmVhZEJ5Q29udmVyc2F0aW9uQW5kTWFya1JlYWQoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBuZXdlc3RVbnJlYWRBdDogbWVzc2FnZTcucmVjZWl2ZWRfYXQsXG4gICAgICByZWFkQXQsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YobWFya2VkUmVhZDIsIDIsICd0d28gbWVzc2FnZXMgbWFya2VkIHJlYWQnKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWFya2VkUmVhZDJbMF0uaWQsIG1lc3NhZ2U3LmlkLCAnc2hvdWxkIGJlIG1lc3NhZ2U3Jyk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBhd2FpdCBnZXRUb3RhbFVucmVhZEZvckNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZCwge1xuICAgICAgICBzdG9yeUlkOiB1bmRlZmluZWQsXG4gICAgICAgIGlzR3JvdXA6IGZhbHNlLFxuICAgICAgfSksXG4gICAgICAwLFxuICAgICAgJ3VucmVhZCBjb3VudCdcbiAgICApO1xuICB9KTtcblxuICBpdCgncHJvcGVybHkgZmluZHMgYW5kIHJlYWRzIHVucmVhZCBtZXNzYWdlcyBpbiBzdG9yeScsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDApO1xuXG4gICAgY29uc3Qgc3RhcnQgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHJlYWRBdCA9IHN0YXJ0ICsgMjA7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgY29uc3Qgc3RvcnlJZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgIHR5cGU6ICdzdG9yeScsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMSxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDEsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIHN0b3J5SWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAyLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMixcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAyLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgICBzdG9yeUlkLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMyxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDMsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMyxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSA0JyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgNCxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDQsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgNCxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgc3RvcnlJZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U1OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDUsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA1LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDUsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U2OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNicsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDYsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA2LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDYsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQ6IGdldFV1aWQoKSxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U3OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNycsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDcsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA3LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDcsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQsXG4gICAgfTtcblxuICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhcbiAgICAgIFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTUsIG1lc3NhZ2U2LCBtZXNzYWdlN10sXG4gICAgICB7XG4gICAgICAgIGZvcmNlU2F2ZTogdHJ1ZSxcbiAgICAgICAgb3VyVXVpZCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCA3KTtcblxuICAgIGNvbnN0IG1hcmtlZFJlYWQgPSBhd2FpdCBnZXRVbnJlYWRCeUNvbnZlcnNhdGlvbkFuZE1hcmtSZWFkKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbmV3ZXN0VW5yZWFkQXQ6IG1lc3NhZ2U3LnJlY2VpdmVkX2F0LFxuICAgICAgcmVhZEF0LFxuICAgICAgc3RvcnlJZCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihtYXJrZWRSZWFkLCAzLCAndGhyZWUgbWVzc2FnZXMgbWFya2VkIHJlYWQnKTtcblxuICAgIC8vIFNvcnRlZCBpbiBkZXNjZW5kaW5nIG9yZGVyXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgbWFya2VkUmVhZFswXS5pZCxcbiAgICAgIG1lc3NhZ2U3LmlkLFxuICAgICAgJ2ZpcnN0IHNob3VsZCBiZSBtZXNzYWdlNydcbiAgICApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWRbMV0uaWQsXG4gICAgICBtZXNzYWdlNC5pZCxcbiAgICAgICdmaXJzdCBzaG91bGQgYmUgbWVzc2FnZTQnXG4gICAgKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBtYXJrZWRSZWFkWzJdLmlkLFxuICAgICAgbWVzc2FnZTIuaWQsXG4gICAgICAnc2Vjb25kIHNob3VsZCBiZSBtZXNzYWdlMidcbiAgICApO1xuICB9KTtcblxuICBpdCgncHJvcGVybHkgc3RhcnRzIGRpc2FwcGVhcmluZyBtZXNzYWdlIHRpbWVyLCBldmVuIGlmIG1lc3NhZ2UgaXMgYWxyZWFkeSByZWFkJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcmVhZEF0ID0gc3RhcnQgKyAyMDtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBleHBpcmVUaW1lciA9IDE1O1xuICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAxLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMSxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAxLFxuICAgICAgZXhwaXJlVGltZXIsXG4gICAgICBleHBpcmF0aW9uU3RhcnRUaW1lc3RhbXA6IHN0YXJ0ICsgMSxcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UyOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMicsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDIsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAyLFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDIsXG4gICAgICBleHBpcmVUaW1lcixcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMyxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDMsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMyxcbiAgICAgIGV4cGlyZVRpbWVyLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5VbnJlYWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlNDogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDQnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyA0LFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgNCxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyA0LFxuICAgICAgZXhwaXJlVGltZXIsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U1OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNScsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDUsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA1LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDUsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuXG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTVdLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgYXdhaXQgZ2V0VG90YWxVbnJlYWRGb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgc3RvcnlJZDogdW5kZWZpbmVkLFxuICAgICAgICBpc0dyb3VwOiBmYWxzZSxcbiAgICAgIH0pLFxuICAgICAgMixcbiAgICAgICd1bnJlYWQgY291bnQnXG4gICAgKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIDUpO1xuXG4gICAgY29uc3QgbWFya2VkUmVhZCA9IGF3YWl0IGdldFVucmVhZEJ5Q29udmVyc2F0aW9uQW5kTWFya1JlYWQoe1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBuZXdlc3RVbnJlYWRBdDogbWVzc2FnZTQucmVjZWl2ZWRfYXQsXG4gICAgICByZWFkQXQsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YobWFya2VkUmVhZCwgMSwgJ29uZSBtZXNzYWdlIG1hcmtlZCByZWFkJyk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgbWFya2VkUmVhZFswXS5pZCxcbiAgICAgIG1lc3NhZ2U0LmlkLFxuICAgICAgJ2ZpcnN0IHNob3VsZCBiZSBtZXNzYWdlNCdcbiAgICApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIGF3YWl0IGdldFRvdGFsVW5yZWFkRm9yQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkLCB7XG4gICAgICAgIHN0b3J5SWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgaXNHcm91cDogZmFsc2UsXG4gICAgICB9KSxcbiAgICAgIDEsXG4gICAgICAndW5yZWFkIGNvdW50J1xuICAgICk7XG5cbiAgICBjb25zdCBhbGxNZXNzYWdlcyA9IGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpO1xuICAgIGNvbnN0IHNvcnRlZCA9IGFsbE1lc3NhZ2VzLnNvcnQoXG4gICAgICAobGVmdCwgcmlnaHQpID0+IGxlZnQudGltZXN0YW1wIC0gcmlnaHQudGltZXN0YW1wXG4gICAgKTtcblxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzb3J0ZWRbMV0uaWQsIG1lc3NhZ2UyLmlkLCAnY2hlY2tpbmcgbWVzc2FnZSAyJyk7XG4gICAgYXNzZXJ0LmlzQXRNb3N0KFxuICAgICAgc29ydGVkWzFdLmV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCA/PyBJbmZpbml0eSxcbiAgICAgIERhdGUubm93KCksXG4gICAgICAnY2hlY2tpbmcgbWVzc2FnZSAyIGV4cGlyYXRpb25TdGFydFRpbWVzdGFtcCdcbiAgICApO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNvcnRlZFszXS5pZCwgbWVzc2FnZTQuaWQsICdjaGVja2luZyBtZXNzYWdlIDQnKTtcbiAgICBhc3NlcnQuaXNBdE1vc3QoXG4gICAgICBzb3J0ZWRbM10uZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wID8/IEluZmluaXR5LFxuICAgICAgRGF0ZS5ub3coKSxcbiAgICAgICdjaGVja2luZyBtZXNzYWdlIDQgZXhwaXJhdGlvblN0YXJ0VGltZXN0YW1wJ1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdwcm9wZXJseSBmaW5kcyBhbmQgcmVhZHMgdW5yZWFkIHJlYWN0aW9ucyBpbiBjdXJyZW50IGNvbnZlcnNhdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFJlYWN0aW9ucygpLCAwKTtcblxuICAgIGNvbnN0IHN0YXJ0ID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBzdG9yeUlkID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICBjb25zdCBwYWQ6IEFycmF5PE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZT4gPSBBcnJheS5mcm9tKHsgbGVuZ3RoOiA0IH0sIF8gPT4ge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgICAgYm9keTogJ3BhZCBtZXNzYWdlJyxcbiAgICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHNlbnRfYXQ6IHN0YXJ0IC0gMSxcbiAgICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0IC0gMSxcbiAgICAgICAgdGltZXN0YW1wOiBzdGFydCAtIDEsXG4gICAgICB9O1xuICAgIH0pO1xuICAgIGNvbnN0IG1lc3NhZ2UxOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMScsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDEsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAxLFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDEsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAyLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMixcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAyLFxuICAgICAgc3RvcnlJZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQ6IGdldFV1aWQoKSxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMyxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDMsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMyxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U0OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNCcsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDQsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA0LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlNTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDUnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyA1LFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgNSxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyA1LFxuICAgIH07XG5cbiAgICBhd2FpdCBzYXZlTWVzc2FnZXMoXG4gICAgICBbLi4ucGFkLCBtZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTVdLFxuICAgICAge1xuICAgICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9XG4gICAgKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbE1lc3NhZ2VzKCksIHBhZC5sZW5ndGggKyA1KTtcblxuICAgIGNvbnN0IHJlYWN0aW9uMTogUmVhY3Rpb25UeXBlID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBlbW9qaTogJ1x1RDgzQ1x1REY4OScsXG4gICAgICBmcm9tSWQ6IGdldFV1aWQoKSxcbiAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZTEuaWQsXG4gICAgICBtZXNzYWdlUmVjZWl2ZWRBdDogbWVzc2FnZTEucmVjZWl2ZWRfYXQsXG4gICAgICB0YXJnZXRBdXRob3JVdWlkOiBnZXRVdWlkKCksXG4gICAgICB0YXJnZXRUaW1lc3RhbXA6IHN0YXJ0LFxuICAgIH07XG4gICAgY29uc3QgcmVhY3Rpb24yOiBSZWFjdGlvblR5cGUgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGVtb2ppOiAnXHVEODNEXHVERTgwJyxcbiAgICAgIGZyb21JZDogZ2V0VXVpZCgpLFxuICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlMi5pZCxcbiAgICAgIG1lc3NhZ2VSZWNlaXZlZEF0OiBtZXNzYWdlMi5yZWNlaXZlZF9hdCxcbiAgICAgIHRhcmdldEF1dGhvclV1aWQ6IGdldFV1aWQoKSxcbiAgICAgIHRhcmdldFRpbWVzdGFtcDogc3RhcnQsXG4gICAgfTtcbiAgICBjb25zdCByZWFjdGlvbjM6IFJlYWN0aW9uVHlwZSA9IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBnZXRVdWlkKCksXG4gICAgICBlbW9qaTogJ1x1MjYwMFx1RkUwRicsXG4gICAgICBmcm9tSWQ6IGdldFV1aWQoKSxcbiAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZTMuaWQsXG4gICAgICBtZXNzYWdlUmVjZWl2ZWRBdDogbWVzc2FnZTMucmVjZWl2ZWRfYXQsXG4gICAgICB0YXJnZXRBdXRob3JVdWlkOiBnZXRVdWlkKCksXG4gICAgICB0YXJnZXRUaW1lc3RhbXA6IHN0YXJ0LFxuICAgIH07XG4gICAgY29uc3QgcmVhY3Rpb240OiBSZWFjdGlvblR5cGUgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGVtb2ppOiAnXHUyNzY0XHVGRTBGXHUyMDBEXHVEODNEXHVERDI1JyxcbiAgICAgIGZyb21JZDogZ2V0VXVpZCgpLFxuICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlNC5pZCxcbiAgICAgIG1lc3NhZ2VSZWNlaXZlZEF0OiBtZXNzYWdlNC5yZWNlaXZlZF9hdCxcbiAgICAgIHRhcmdldEF1dGhvclV1aWQ6IGdldFV1aWQoKSxcbiAgICAgIHRhcmdldFRpbWVzdGFtcDogc3RhcnQsXG4gICAgfTtcbiAgICBjb25zdCByZWFjdGlvbjU6IFJlYWN0aW9uVHlwZSA9IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZW1vamk6ICdcdUQ4M0NcdUREOTInLFxuICAgICAgZnJvbUlkOiBnZXRVdWlkKCksXG4gICAgICBtZXNzYWdlSWQ6IG1lc3NhZ2U1LmlkLFxuICAgICAgbWVzc2FnZVJlY2VpdmVkQXQ6IG1lc3NhZ2U1LnJlY2VpdmVkX2F0LFxuICAgICAgdGFyZ2V0QXV0aG9yVXVpZDogZ2V0VXVpZCgpLFxuICAgICAgdGFyZ2V0VGltZXN0YW1wOiBzdGFydCxcbiAgICB9O1xuXG4gICAgYXdhaXQgYWRkUmVhY3Rpb24ocmVhY3Rpb24xKTtcbiAgICBhd2FpdCBhZGRSZWFjdGlvbihyZWFjdGlvbjIpO1xuICAgIGF3YWl0IGFkZFJlYWN0aW9uKHJlYWN0aW9uMyk7XG4gICAgYXdhaXQgYWRkUmVhY3Rpb24ocmVhY3Rpb240KTtcbiAgICBhd2FpdCBhZGRSZWFjdGlvbihyZWFjdGlvbjUpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxSZWFjdGlvbnMoKSwgNSk7XG4gICAgY29uc3QgbWFya2VkUmVhZCA9IGF3YWl0IGdldFVucmVhZFJlYWN0aW9uc0FuZE1hcmtSZWFkKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbmV3ZXN0VW5yZWFkQXQ6IHJlYWN0aW9uNC5tZXNzYWdlUmVjZWl2ZWRBdCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihtYXJrZWRSZWFkLCAyLCAndHdvIHJlYWN0aW9ucyBtYXJrZWQgcmVhZCcpO1xuXG4gICAgLy8gU29ydGVkIGluIGRlc2NlbmRpbmcgb3JkZXJcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICBtYXJrZWRSZWFkWzBdLm1lc3NhZ2VJZCxcbiAgICAgIHJlYWN0aW9uNC5tZXNzYWdlSWQsXG4gICAgICAnZmlyc3Qgc2hvdWxkIGJlIHJlYWN0aW9uNCdcbiAgICApO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWRbMV0ubWVzc2FnZUlkLFxuICAgICAgcmVhY3Rpb24xLm1lc3NhZ2VJZCxcbiAgICAgICdzZWNvbmQgc2hvdWxkIGJlIHJlYWN0aW9uMSdcbiAgICApO1xuXG4gICAgY29uc3QgbWFya2VkUmVhZDIgPSBhd2FpdCBnZXRVbnJlYWRSZWFjdGlvbnNBbmRNYXJrUmVhZCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG5ld2VzdFVucmVhZEF0OiByZWFjdGlvbjUubWVzc2FnZVJlY2VpdmVkQXQsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YobWFya2VkUmVhZDIsIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWQyWzBdLm1lc3NhZ2VJZCxcbiAgICAgIHJlYWN0aW9uNS5tZXNzYWdlSWQsXG4gICAgICAnc2hvdWxkIGJlIHJlYWN0aW9uNSdcbiAgICApO1xuICB9KTtcblxuICBpdCgncHJvcGVybHkgZmluZHMgYW5kIHJlYWRzIHVucmVhZCByZWFjdGlvbnMgaW4gc3RvcnknLCBhc3luYyAoKSA9PiB7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxSZWFjdGlvbnMoKSwgMCk7XG5cbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSBnZXRVdWlkKCk7XG4gICAgY29uc3Qgc3RvcnlJZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgY29uc3QgbWVzc2FnZTE6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAxJyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMSxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDEsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMSxcbiAgICAgIHN0b3J5SWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlMjogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDInLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAyLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMixcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAyLFxuICAgICAgc3RvcnlJZDogZ2V0VXVpZCgpLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTM6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAzJyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAzLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMyxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAzLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTQ6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSA0JyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgNCxcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDQsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgNCxcbiAgICAgIHN0b3J5SWQsXG4gICAgfTtcbiAgICBjb25zdCBtZXNzYWdlNTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDUnLFxuICAgICAgdHlwZTogJ2luY29taW5nJyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyA1LFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgNSxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyA1LFxuICAgICAgc3RvcnlJZCxcbiAgICB9O1xuXG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2VzKFttZXNzYWdlMSwgbWVzc2FnZTIsIG1lc3NhZ2UzLCBtZXNzYWdlNCwgbWVzc2FnZTVdLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgNSk7XG5cbiAgICBjb25zdCByZWFjdGlvbjE6IFJlYWN0aW9uVHlwZSA9IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZW1vamk6ICdcdUQ4M0NcdURGODknLFxuICAgICAgZnJvbUlkOiBnZXRVdWlkKCksXG4gICAgICBtZXNzYWdlSWQ6IG1lc3NhZ2UxLmlkLFxuICAgICAgbWVzc2FnZVJlY2VpdmVkQXQ6IG1lc3NhZ2UxLnJlY2VpdmVkX2F0LFxuICAgICAgdGFyZ2V0QXV0aG9yVXVpZDogZ2V0VXVpZCgpLFxuICAgICAgdGFyZ2V0VGltZXN0YW1wOiBzdGFydCxcbiAgICB9O1xuICAgIGNvbnN0IHJlYWN0aW9uMjogUmVhY3Rpb25UeXBlID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBlbW9qaTogJ1x1RDgzRFx1REU4MCcsXG4gICAgICBmcm9tSWQ6IGdldFV1aWQoKSxcbiAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZTIuaWQsXG4gICAgICBtZXNzYWdlUmVjZWl2ZWRBdDogbWVzc2FnZTIucmVjZWl2ZWRfYXQsXG4gICAgICB0YXJnZXRBdXRob3JVdWlkOiBnZXRVdWlkKCksXG4gICAgICB0YXJnZXRUaW1lc3RhbXA6IHN0YXJ0LFxuICAgIH07XG4gICAgY29uc3QgcmVhY3Rpb24zOiBSZWFjdGlvblR5cGUgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgZW1vamk6ICdcdTI2MDBcdUZFMEYnLFxuICAgICAgZnJvbUlkOiBnZXRVdWlkKCksXG4gICAgICBtZXNzYWdlSWQ6IG1lc3NhZ2UzLmlkLFxuICAgICAgbWVzc2FnZVJlY2VpdmVkQXQ6IG1lc3NhZ2UzLnJlY2VpdmVkX2F0LFxuICAgICAgdGFyZ2V0QXV0aG9yVXVpZDogZ2V0VXVpZCgpLFxuICAgICAgdGFyZ2V0VGltZXN0YW1wOiBzdGFydCxcbiAgICB9O1xuICAgIGNvbnN0IHJlYWN0aW9uNDogUmVhY3Rpb25UeXBlID0ge1xuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBlbW9qaTogJ1x1Mjc2NFx1RkUwRlx1MjAwRFx1RDgzRFx1REQyNScsXG4gICAgICBmcm9tSWQ6IGdldFV1aWQoKSxcbiAgICAgIG1lc3NhZ2VJZDogbWVzc2FnZTQuaWQsXG4gICAgICBtZXNzYWdlUmVjZWl2ZWRBdDogbWVzc2FnZTQucmVjZWl2ZWRfYXQsXG4gICAgICB0YXJnZXRBdXRob3JVdWlkOiBnZXRVdWlkKCksXG4gICAgICB0YXJnZXRUaW1lc3RhbXA6IHN0YXJ0LFxuICAgIH07XG4gICAgY29uc3QgcmVhY3Rpb241OiBSZWFjdGlvblR5cGUgPSB7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGVtb2ppOiAnXHVEODNDXHVERDkyJyxcbiAgICAgIGZyb21JZDogZ2V0VXVpZCgpLFxuICAgICAgbWVzc2FnZUlkOiBtZXNzYWdlNS5pZCxcbiAgICAgIG1lc3NhZ2VSZWNlaXZlZEF0OiBtZXNzYWdlNS5yZWNlaXZlZF9hdCxcbiAgICAgIHRhcmdldEF1dGhvclV1aWQ6IGdldFV1aWQoKSxcbiAgICAgIHRhcmdldFRpbWVzdGFtcDogc3RhcnQsXG4gICAgfTtcblxuICAgIGF3YWl0IGFkZFJlYWN0aW9uKHJlYWN0aW9uMSk7XG4gICAgYXdhaXQgYWRkUmVhY3Rpb24ocmVhY3Rpb24yKTtcbiAgICBhd2FpdCBhZGRSZWFjdGlvbihyZWFjdGlvbjMpO1xuICAgIGF3YWl0IGFkZFJlYWN0aW9uKHJlYWN0aW9uNCk7XG4gICAgYXdhaXQgYWRkUmVhY3Rpb24ocmVhY3Rpb241KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsUmVhY3Rpb25zKCksIDUpO1xuICAgIGNvbnN0IG1hcmtlZFJlYWQgPSBhd2FpdCBnZXRVbnJlYWRSZWFjdGlvbnNBbmRNYXJrUmVhZCh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIG5ld2VzdFVucmVhZEF0OiByZWFjdGlvbjQubWVzc2FnZVJlY2VpdmVkQXQsXG4gICAgICBzdG9yeUlkLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKG1hcmtlZFJlYWQsIDIsICd0d28gcmVhY3Rpb25zIG1hcmtlZCByZWFkJyk7XG5cbiAgICAvLyBTb3J0ZWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWRbMF0ubWVzc2FnZUlkLFxuICAgICAgcmVhY3Rpb240Lm1lc3NhZ2VJZCxcbiAgICAgICdmaXJzdCBzaG91bGQgYmUgcmVhY3Rpb240J1xuICAgICk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgbWFya2VkUmVhZFsxXS5tZXNzYWdlSWQsXG4gICAgICByZWFjdGlvbjEubWVzc2FnZUlkLFxuICAgICAgJ3NlY29uZCBzaG91bGQgYmUgcmVhY3Rpb24xJ1xuICAgICk7XG5cbiAgICBjb25zdCBtYXJrZWRSZWFkMiA9IGF3YWl0IGdldFVucmVhZFJlYWN0aW9uc0FuZE1hcmtSZWFkKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgbmV3ZXN0VW5yZWFkQXQ6IHJlYWN0aW9uNS5tZXNzYWdlUmVjZWl2ZWRBdCxcbiAgICAgIHN0b3J5SWQsXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YobWFya2VkUmVhZDIsIDEpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWQyWzBdLm1lc3NhZ2VJZCxcbiAgICAgIHJlYWN0aW9uNS5tZXNzYWdlSWQsXG4gICAgICAnc2hvdWxkIGJlIHJlYWN0aW9uNSdcbiAgICApO1xuICB9KTtcblxuICBpdCgnZG9lcyBub3QgaW5jbHVkZSBncm91cCBzdG9yeSByZXBsaWVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsTWVzc2FnZXMoKSwgMCk7XG5cbiAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcmVhZEF0ID0gc3RhcnQgKyAyMDtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IGdldFV1aWQoKTtcbiAgICBjb25zdCBzdG9yeUlkID0gZ2V0VXVpZCgpO1xuICAgIGNvbnN0IG91clV1aWQgPSBnZXRVdWlkKCk7XG5cbiAgICBjb25zdCBtZXNzYWdlMTogTWVzc2FnZUF0dHJpYnV0ZXNUeXBlID0ge1xuICAgICAgaWQ6IGdldFV1aWQoKSxcbiAgICAgIGJvZHk6ICdtZXNzYWdlIDEnLFxuICAgICAgdHlwZTogJ3N0b3J5JyxcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgc2VudF9hdDogc3RhcnQgKyAxLFxuICAgICAgcmVjZWl2ZWRfYXQ6IHN0YXJ0ICsgMSxcbiAgICAgIHRpbWVzdGFtcDogc3RhcnQgKyAxLFxuICAgICAgcmVhZFN0YXR1czogUmVhZFN0YXR1cy5SZWFkLFxuICAgIH07XG4gICAgY29uc3QgbWVzc2FnZTI6IE1lc3NhZ2VBdHRyaWJ1dGVzVHlwZSA9IHtcbiAgICAgIGlkOiBnZXRVdWlkKCksXG4gICAgICBib2R5OiAnbWVzc2FnZSAyJyxcbiAgICAgIHR5cGU6ICdpbmNvbWluZycsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIHNlbnRfYXQ6IHN0YXJ0ICsgMixcbiAgICAgIHJlY2VpdmVkX2F0OiBzdGFydCArIDIsXG4gICAgICB0aW1lc3RhbXA6IHN0YXJ0ICsgMixcbiAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuVW5yZWFkLFxuICAgICAgc3RvcnlJZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2UzOiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgMycsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDMsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyAzLFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDMsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICB9O1xuICAgIGNvbnN0IG1lc3NhZ2U0OiBNZXNzYWdlQXR0cmlidXRlc1R5cGUgPSB7XG4gICAgICBpZDogZ2V0VXVpZCgpLFxuICAgICAgYm9keTogJ21lc3NhZ2UgNCcsXG4gICAgICB0eXBlOiAnaW5jb21pbmcnLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzZW50X2F0OiBzdGFydCArIDQsXG4gICAgICByZWNlaXZlZF9hdDogc3RhcnQgKyA0LFxuICAgICAgdGltZXN0YW1wOiBzdGFydCArIDQsXG4gICAgICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlVucmVhZCxcbiAgICAgIHN0b3J5SWQsXG4gICAgfTtcblxuICAgIGF3YWl0IHNhdmVNZXNzYWdlcyhbbWVzc2FnZTEsIG1lc3NhZ2UyLCBtZXNzYWdlMywgbWVzc2FnZTRdLCB7XG4gICAgICBmb3JjZVNhdmU6IHRydWUsXG4gICAgICBvdXJVdWlkLFxuICAgIH0pO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxNZXNzYWdlcygpLCA0KTtcblxuICAgIGNvbnN0IG1hcmtlZFJlYWQgPSBhd2FpdCBnZXRVbnJlYWRCeUNvbnZlcnNhdGlvbkFuZE1hcmtSZWFkKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgaXNHcm91cDogdHJ1ZSxcbiAgICAgIG5ld2VzdFVucmVhZEF0OiBtZXNzYWdlNC5yZWNlaXZlZF9hdCxcbiAgICAgIHJlYWRBdCxcbiAgICB9KTtcblxuICAgIGFzc2VydC5sZW5ndGhPZihtYXJrZWRSZWFkLCAxLCAnMSBtZXNzYWdlIG1hcmtlZCByZWFkJyk7XG5cbiAgICAvLyBTb3J0ZWQgaW4gZGVzY2VuZGluZyBvcmRlclxuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIG1hcmtlZFJlYWRbMF0uaWQsXG4gICAgICBtZXNzYWdlMy5pZCxcbiAgICAgICdmaXJzdCBzaG91bGQgYmUgbWVzc2FnZTMnXG4gICAgKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsb0JBQTBCO0FBQzFCLGtCQUFxQjtBQUtyQiwrQkFBMkI7QUFFM0IsTUFBTTtBQUFBLEVBQ0o7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLElBQ0U7QUFFSixtQkFBbUM7QUFDakMsU0FBTyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUNsQztBQUZTLEFBSVQsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixhQUFXLFlBQVk7QUFDckIsVUFBTSxtQkFBbUI7QUFDekIsVUFBTSxvQkFBb0I7QUFBQSxFQUM1QixDQUFDO0FBRUQsS0FB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
