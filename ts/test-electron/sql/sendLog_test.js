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
var import_Crypto = require("../../Crypto");
function getUuid() {
  return import_UUID.UUID.generate().toString();
}
const {
  _getAllSentProtoMessageIds,
  _getAllSentProtoRecipients,
  deleteSentProtoByMessageId,
  deleteSentProtoRecipient,
  deleteSentProtosOlderThan,
  getAllSentProtos,
  getSentProtoByRecipient,
  insertProtoRecipients,
  insertSentProto,
  removeAllSentProtos,
  removeMessage,
  saveMessage
} = import_Client.default;
describe("sql/sendLog", () => {
  beforeEach(async () => {
    await removeAllSentProtos();
  });
  it("roundtrips with insertSentProto/getAllSentProtos", async () => {
    const bytes = (0, import_Crypto.getRandomBytes)(128);
    const timestamp = Date.now();
    const proto = {
      contentHint: 1,
      proto: bytes,
      timestamp
    };
    await insertSentProto(proto, {
      messageIds: [getUuid()],
      recipients: {
        [getUuid()]: [1, 2]
      }
    });
    const allProtos = await getAllSentProtos();
    import_chai.assert.lengthOf(allProtos, 1);
    const actual = allProtos[0];
    import_chai.assert.strictEqual(actual.contentHint, proto.contentHint);
    import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(actual.proto, proto.proto));
    import_chai.assert.strictEqual(actual.timestamp, proto.timestamp);
    await removeAllSentProtos();
    import_chai.assert.lengthOf(await getAllSentProtos(), 0);
  });
  it("cascades deletes into both tables with foreign keys", async () => {
    import_chai.assert.lengthOf(await getAllSentProtos(), 0);
    import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
    import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
    const bytes = (0, import_Crypto.getRandomBytes)(128);
    const timestamp = Date.now();
    const proto = {
      contentHint: 1,
      proto: bytes,
      timestamp
    };
    await insertSentProto(proto, {
      messageIds: [getUuid(), getUuid()],
      recipients: {
        [getUuid()]: [1, 2],
        [getUuid()]: [1]
      }
    });
    import_chai.assert.lengthOf(await getAllSentProtos(), 1);
    import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 2);
    import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 3);
    await removeAllSentProtos();
    import_chai.assert.lengthOf(await getAllSentProtos(), 0);
    import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
    import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
  });
  it("trigger deletes payload when referenced message is deleted", async () => {
    const id = getUuid();
    const timestamp = Date.now();
    const ourUuid = getUuid();
    await saveMessage({
      id,
      body: "some text",
      conversationId: getUuid(),
      received_at: timestamp,
      sent_at: timestamp,
      timestamp,
      type: "outgoing"
    }, { forceSave: true, ourUuid });
    const bytes = (0, import_Crypto.getRandomBytes)(128);
    const proto = {
      contentHint: 1,
      proto: bytes,
      timestamp
    };
    await insertSentProto(proto, {
      messageIds: [id],
      recipients: {
        [getUuid()]: [1, 2]
      }
    });
    const allProtos = await getAllSentProtos();
    import_chai.assert.lengthOf(allProtos, 1);
    const actual = allProtos[0];
    import_chai.assert.strictEqual(actual.timestamp, proto.timestamp);
    await removeMessage(id);
    import_chai.assert.lengthOf(await getAllSentProtos(), 0);
  });
  describe("#insertSentProto", () => {
    it("supports adding duplicates", async () => {
      const timestamp = Date.now();
      const messageIds = [getUuid()];
      const recipients = {
        [getUuid()]: [1]
      };
      const proto1 = {
        contentHint: 7,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      const proto2 = {
        contentHint: 9,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
      await insertSentProto(proto1, { messageIds, recipients });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 1);
      await insertSentProto(proto2, { messageIds, recipients });
      import_chai.assert.lengthOf(await getAllSentProtos(), 2);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 2);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
    });
  });
  describe("#insertProtoRecipients", () => {
    it("handles duplicates, adding new recipients if needed", async () => {
      const timestamp = Date.now();
      const messageIds = [getUuid()];
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
      const id = await insertSentProto(proto, {
        messageIds,
        recipients: {
          [getUuid()]: [1]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 1);
      const recipientUuid = getUuid();
      await insertProtoRecipients({
        id,
        recipientUuid,
        deviceIds: [1, 2]
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 3);
    });
  });
  describe("#deleteSentProtosOlderThan", () => {
    it("deletes all older timestamps", async () => {
      const timestamp = Date.now();
      const proto1 = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp: timestamp + 10
      };
      const proto2 = {
        contentHint: 2,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      const proto3 = {
        contentHint: 0,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp: timestamp - 15
      };
      await insertSentProto(proto1, {
        messageIds: [getUuid()],
        recipients: {
          [getUuid()]: [1]
        }
      });
      await insertSentProto(proto2, {
        messageIds: [getUuid()],
        recipients: {
          [getUuid()]: [1, 2]
        }
      });
      await insertSentProto(proto3, {
        messageIds: [getUuid()],
        recipients: {
          [getUuid()]: [1, 2, 3]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 3);
      await deleteSentProtosOlderThan(timestamp);
      const allProtos = await getAllSentProtos();
      import_chai.assert.lengthOf(allProtos, 2);
      const actual1 = allProtos[0];
      import_chai.assert.strictEqual(actual1.contentHint, proto1.contentHint);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(actual1.proto, proto1.proto));
      import_chai.assert.strictEqual(actual1.timestamp, proto1.timestamp);
      const actual2 = allProtos[1];
      import_chai.assert.strictEqual(actual2.contentHint, proto2.contentHint);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(actual2.proto, proto2.proto));
      import_chai.assert.strictEqual(actual2.timestamp, proto2.timestamp);
    });
  });
  describe("#deleteSentProtoByMessageId", () => {
    it("deletes all records related to that messageId", async () => {
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
      const messageId = getUuid();
      const timestamp = Date.now();
      const proto1 = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      const proto2 = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp: timestamp - 10
      };
      const proto3 = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp: timestamp - 20
      };
      await insertSentProto(proto1, {
        messageIds: [messageId, getUuid()],
        recipients: {
          [getUuid()]: [1, 2],
          [getUuid()]: [1]
        }
      });
      await insertSentProto(proto2, {
        messageIds: [messageId],
        recipients: {
          [getUuid()]: [1]
        }
      });
      await insertSentProto(proto3, {
        messageIds: [getUuid()],
        recipients: {
          [getUuid()]: [1]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 3);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 4);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 5);
      await deleteSentProtoByMessageId(messageId);
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 1);
    });
  });
  describe("#deleteSentProtoRecipient", () => {
    it("does not delete payload if recipient remains", async () => {
      const timestamp = Date.now();
      const recipientUuid1 = getUuid();
      const recipientUuid2 = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid1]: [1, 2],
          [recipientUuid2]: [1]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 3);
      await deleteSentProtoRecipient({
        timestamp,
        recipientUuid: recipientUuid1,
        deviceId: 1
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
    });
    it("deletes payload if no recipients remain", async () => {
      const timestamp = Date.now();
      const recipientUuid1 = getUuid();
      const recipientUuid2 = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid1]: [1, 2],
          [recipientUuid2]: [1]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 3);
      await deleteSentProtoRecipient({
        timestamp,
        recipientUuid: recipientUuid1,
        deviceId: 1
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      await deleteSentProtoRecipient({
        timestamp,
        recipientUuid: recipientUuid1,
        deviceId: 2
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 1);
      await deleteSentProtoRecipient({
        timestamp,
        recipientUuid: recipientUuid2,
        deviceId: 1
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
    });
    it("deletes multiple recipients in a single transaction", async () => {
      const timestamp = Date.now();
      const recipientUuid1 = getUuid();
      const recipientUuid2 = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid1]: [1, 2],
          [recipientUuid2]: [1]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 3);
      await deleteSentProtoRecipient([
        {
          timestamp,
          recipientUuid: recipientUuid1,
          deviceId: 1
        },
        {
          timestamp,
          recipientUuid: recipientUuid1,
          deviceId: 2
        },
        {
          timestamp,
          recipientUuid: recipientUuid2,
          deviceId: 1
        }
      ]);
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
    });
  });
  describe("#getSentProtoByRecipient", () => {
    it("returns matching payload", async () => {
      const timestamp = Date.now();
      const recipientUuid = getUuid();
      const messageIds = [getUuid(), getUuid()];
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds,
        recipients: {
          [recipientUuid]: [1, 2]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 2);
      const actual = await getSentProtoByRecipient({
        now: timestamp,
        timestamp,
        recipientUuid
      });
      if (!actual) {
        throw new Error("Failed to fetch proto!");
      }
      import_chai.assert.strictEqual(actual.contentHint, proto.contentHint);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(actual.proto, proto.proto));
      import_chai.assert.strictEqual(actual.timestamp, proto.timestamp);
      import_chai.assert.sameMembers(actual.messageIds, messageIds);
    });
    it("returns matching payload with no messageIds", async () => {
      const timestamp = Date.now();
      const recipientUuid = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [],
        recipients: {
          [recipientUuid]: [1, 2]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      import_chai.assert.lengthOf(await _getAllSentProtoMessageIds(), 0);
      const actual = await getSentProtoByRecipient({
        now: timestamp,
        timestamp,
        recipientUuid
      });
      if (!actual) {
        throw new Error("Failed to fetch proto!");
      }
      import_chai.assert.strictEqual(actual.contentHint, proto.contentHint);
      import_chai.assert.isTrue((0, import_Crypto.constantTimeEqual)(actual.proto, proto.proto));
      import_chai.assert.strictEqual(actual.timestamp, proto.timestamp);
      import_chai.assert.deepEqual(actual.messageIds, []);
    });
    it("returns nothing if payload does not have recipient", async () => {
      const timestamp = Date.now();
      const recipientUuid = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid]: [1, 2]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      const actual = await getSentProtoByRecipient({
        now: timestamp,
        timestamp,
        recipientUuid: getUuid()
      });
      import_chai.assert.isUndefined(actual);
    });
    it("returns nothing if timestamp does not match", async () => {
      const timestamp = Date.now();
      const recipientUuid = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid]: [1, 2]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      const actual = await getSentProtoByRecipient({
        now: timestamp,
        timestamp: timestamp + 1,
        recipientUuid
      });
      import_chai.assert.isUndefined(actual);
    });
    it("returns nothing if timestamp proto is too old", async () => {
      const TWO_DAYS = 2 * 24 * 60 * 60 * 1e3;
      const timestamp = Date.now();
      const recipientUuid = getUuid();
      const proto = {
        contentHint: 1,
        proto: (0, import_Crypto.getRandomBytes)(128),
        timestamp
      };
      await insertSentProto(proto, {
        messageIds: [getUuid()],
        recipients: {
          [recipientUuid]: [1, 2]
        }
      });
      import_chai.assert.lengthOf(await getAllSentProtos(), 1);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 2);
      const actual = await getSentProtoByRecipient({
        now: timestamp + TWO_DAYS,
        timestamp,
        recipientUuid
      });
      import_chai.assert.isUndefined(actual);
      import_chai.assert.lengthOf(await getAllSentProtos(), 0);
      import_chai.assert.lengthOf(await _getAllSentProtoRecipients(), 0);
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZExvZ190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuXG5pbXBvcnQgZGF0YUludGVyZmFjZSBmcm9tICcuLi8uLi9zcWwvQ2xpZW50JztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgVVVJRFN0cmluZ1R5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VVUlEJztcbmltcG9ydCB7IGNvbnN0YW50VGltZUVxdWFsLCBnZXRSYW5kb21CeXRlcyB9IGZyb20gJy4uLy4uL0NyeXB0byc7XG5cbmZ1bmN0aW9uIGdldFV1aWQoKTogVVVJRFN0cmluZ1R5cGUge1xuICByZXR1cm4gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG59XG5cbmNvbnN0IHtcbiAgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMsXG4gIF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzLFxuICBkZWxldGVTZW50UHJvdG9CeU1lc3NhZ2VJZCxcbiAgZGVsZXRlU2VudFByb3RvUmVjaXBpZW50LFxuICBkZWxldGVTZW50UHJvdG9zT2xkZXJUaGFuLFxuICBnZXRBbGxTZW50UHJvdG9zLFxuICBnZXRTZW50UHJvdG9CeVJlY2lwaWVudCxcbiAgaW5zZXJ0UHJvdG9SZWNpcGllbnRzLFxuICBpbnNlcnRTZW50UHJvdG8sXG4gIHJlbW92ZUFsbFNlbnRQcm90b3MsXG4gIHJlbW92ZU1lc3NhZ2UsXG4gIHNhdmVNZXNzYWdlLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmRlc2NyaWJlKCdzcWwvc2VuZExvZycsICgpID0+IHtcbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgcmVtb3ZlQWxsU2VudFByb3RvcygpO1xuICB9KTtcblxuICBpdCgncm91bmR0cmlwcyB3aXRoIGluc2VydFNlbnRQcm90by9nZXRBbGxTZW50UHJvdG9zJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGJ5dGVzID0gZ2V0UmFuZG9tQnl0ZXMoMTI4KTtcbiAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICBwcm90bzogYnl0ZXMsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfTtcbiAgICBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8sIHtcbiAgICAgIG1lc3NhZ2VJZHM6IFtnZXRVdWlkKCldLFxuICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICBbZ2V0VXVpZCgpXTogWzEsIDJdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjb25zdCBhbGxQcm90b3MgPSBhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsUHJvdG9zLCAxKTtcbiAgICBjb25zdCBhY3R1YWwgPSBhbGxQcm90b3NbMF07XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLmNvbnRlbnRIaW50LCBwcm90by5jb250ZW50SGludCk7XG4gICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChhY3R1YWwucHJvdG8sIHByb3RvLnByb3RvKSk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbC50aW1lc3RhbXAsIHByb3RvLnRpbWVzdGFtcCk7XG5cbiAgICBhd2FpdCByZW1vdmVBbGxTZW50UHJvdG9zKCk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgfSk7XG5cbiAgaXQoJ2Nhc2NhZGVzIGRlbGV0ZXMgaW50byBib3RoIHRhYmxlcyB3aXRoIGZvcmVpZ24ga2V5cycsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMCk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDApO1xuXG4gICAgY29uc3QgYnl0ZXMgPSBnZXRSYW5kb21CeXRlcygxMjgpO1xuICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICBjb250ZW50SGludDogMSxcbiAgICAgIHByb3RvOiBieXRlcyxcbiAgICAgIHRpbWVzdGFtcCxcbiAgICB9O1xuICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bywge1xuICAgICAgbWVzc2FnZUlkczogW2dldFV1aWQoKSwgZ2V0VXVpZCgpXSxcbiAgICAgIHJlY2lwaWVudHM6IHtcbiAgICAgICAgW2dldFV1aWQoKV06IFsxLCAyXSxcbiAgICAgICAgW2dldFV1aWQoKV06IFsxXSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAxKTtcbiAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMik7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDMpO1xuXG4gICAgYXdhaXQgcmVtb3ZlQWxsU2VudFByb3RvcygpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMCk7XG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9NZXNzYWdlSWRzKCksIDApO1xuICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAwKTtcbiAgfSk7XG5cbiAgaXQoJ3RyaWdnZXIgZGVsZXRlcyBwYXlsb2FkIHdoZW4gcmVmZXJlbmNlZCBtZXNzYWdlIGlzIGRlbGV0ZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgaWQgPSBnZXRVdWlkKCk7XG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICBjb25zdCBvdXJVdWlkID0gZ2V0VXVpZCgpO1xuXG4gICAgYXdhaXQgc2F2ZU1lc3NhZ2UoXG4gICAgICB7XG4gICAgICAgIGlkLFxuXG4gICAgICAgIGJvZHk6ICdzb21lIHRleHQnLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogZ2V0VXVpZCgpLFxuICAgICAgICByZWNlaXZlZF9hdDogdGltZXN0YW1wLFxuICAgICAgICBzZW50X2F0OiB0aW1lc3RhbXAsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgdHlwZTogJ291dGdvaW5nJyxcbiAgICAgIH0sXG4gICAgICB7IGZvcmNlU2F2ZTogdHJ1ZSwgb3VyVXVpZCB9XG4gICAgKTtcblxuICAgIGNvbnN0IGJ5dGVzID0gZ2V0UmFuZG9tQnl0ZXMoMTI4KTtcbiAgICBjb25zdCBwcm90byA9IHtcbiAgICAgIGNvbnRlbnRIaW50OiAxLFxuICAgICAgcHJvdG86IGJ5dGVzLFxuICAgICAgdGltZXN0YW1wLFxuICAgIH07XG4gICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvLCB7XG4gICAgICBtZXNzYWdlSWRzOiBbaWRdLFxuICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICBbZ2V0VXVpZCgpXTogWzEsIDJdLFxuICAgICAgfSxcbiAgICB9KTtcbiAgICBjb25zdCBhbGxQcm90b3MgPSBhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCk7XG5cbiAgICBhc3NlcnQubGVuZ3RoT2YoYWxsUHJvdG9zLCAxKTtcbiAgICBjb25zdCBhY3R1YWwgPSBhbGxQcm90b3NbMF07XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLnRpbWVzdGFtcCwgcHJvdG8udGltZXN0YW1wKTtcblxuICAgIGF3YWl0IHJlbW92ZU1lc3NhZ2UoaWQpO1xuXG4gICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMCk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjaW5zZXJ0U2VudFByb3RvJywgKCkgPT4ge1xuICAgIGl0KCdzdXBwb3J0cyBhZGRpbmcgZHVwbGljYXRlcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IG1lc3NhZ2VJZHMgPSBbZ2V0VXVpZCgpXTtcbiAgICAgIGNvbnN0IHJlY2lwaWVudHMgPSB7XG4gICAgICAgIFtnZXRVdWlkKCldOiBbMV0sXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvdG8xID0ge1xuICAgICAgICBjb250ZW50SGludDogNyxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH07XG4gICAgICBjb25zdCBwcm90bzIgPSB7XG4gICAgICAgIGNvbnRlbnRIaW50OiA5LFxuICAgICAgICBwcm90bzogZ2V0UmFuZG9tQnl0ZXMoMTI4KSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMCk7XG5cbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bzEsIHsgbWVzc2FnZUlkcywgcmVjaXBpZW50cyB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMSk7XG5cbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bzIsIHsgbWVzc2FnZUlkcywgcmVjaXBpZW50cyB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMik7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMik7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMik7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjaW5zZXJ0UHJvdG9SZWNpcGllbnRzJywgKCkgPT4ge1xuICAgIGl0KCdoYW5kbGVzIGR1cGxpY2F0ZXMsIGFkZGluZyBuZXcgcmVjaXBpZW50cyBpZiBuZWVkZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgICBjb25zdCBtZXNzYWdlSWRzID0gW2dldFV1aWQoKV07XG4gICAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvTWVzc2FnZUlkcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAwKTtcblxuICAgICAgY29uc3QgaWQgPSBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8sIHtcbiAgICAgICAgbWVzc2FnZUlkcyxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtnZXRVdWlkKCldOiBbMV0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMSk7XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBhd2FpdCBpbnNlcnRQcm90b1JlY2lwaWVudHMoe1xuICAgICAgICBpZCxcbiAgICAgICAgcmVjaXBpZW50VXVpZCxcbiAgICAgICAgZGV2aWNlSWRzOiBbMSwgMl0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMyk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZGVsZXRlU2VudFByb3Rvc09sZGVyVGhhbicsICgpID0+IHtcbiAgICBpdCgnZGVsZXRlcyBhbGwgb2xkZXIgdGltZXN0YW1wcycsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHByb3RvMSA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCArIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IHByb3RvMiA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDIsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvdG8zID0ge1xuICAgICAgICBjb250ZW50SGludDogMCxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wIC0gMTUsXG4gICAgICB9O1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvMSwge1xuICAgICAgICBtZXNzYWdlSWRzOiBbZ2V0VXVpZCgpXSxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtnZXRVdWlkKCldOiBbMV0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bzIsIHtcbiAgICAgICAgbWVzc2FnZUlkczogW2dldFV1aWQoKV0sXG4gICAgICAgIHJlY2lwaWVudHM6IHtcbiAgICAgICAgICBbZ2V0VXVpZCgpXTogWzEsIDJdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8zLCB7XG4gICAgICAgIG1lc3NhZ2VJZHM6IFtnZXRVdWlkKCldLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW2dldFV1aWQoKV06IFsxLCAyLCAzXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAzKTtcblxuICAgICAgYXdhaXQgZGVsZXRlU2VudFByb3Rvc09sZGVyVGhhbih0aW1lc3RhbXApO1xuXG4gICAgICBjb25zdCBhbGxQcm90b3MgPSBhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYWxsUHJvdG9zLCAyKTtcblxuICAgICAgY29uc3QgYWN0dWFsMSA9IGFsbFByb3Rvc1swXTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwxLmNvbnRlbnRIaW50LCBwcm90bzEuY29udGVudEhpbnQpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChhY3R1YWwxLnByb3RvLCBwcm90bzEucHJvdG8pKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwxLnRpbWVzdGFtcCwgcHJvdG8xLnRpbWVzdGFtcCk7XG5cbiAgICAgIGNvbnN0IGFjdHVhbDIgPSBhbGxQcm90b3NbMV07XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsMi5jb250ZW50SGludCwgcHJvdG8yLmNvbnRlbnRIaW50KTtcbiAgICAgIGFzc2VydC5pc1RydWUoY29uc3RhbnRUaW1lRXF1YWwoYWN0dWFsMi5wcm90bywgcHJvdG8yLnByb3RvKSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsMi50aW1lc3RhbXAsIHByb3RvMi50aW1lc3RhbXApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2RlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkJywgKCkgPT4ge1xuICAgIGl0KCdkZWxldGVzIGFsbCByZWNvcmRzIHJlbGF0ZWQgdG8gdGhhdCBtZXNzYWdlSWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvTWVzc2FnZUlkcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAwKTtcblxuICAgICAgY29uc3QgbWVzc2FnZUlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcbiAgICAgIGNvbnN0IHByb3RvMSA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvdG8yID0ge1xuICAgICAgICBjb250ZW50SGludDogMSxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wIC0gMTAsXG4gICAgICB9O1xuICAgICAgY29uc3QgcHJvdG8zID0ge1xuICAgICAgICBjb250ZW50SGludDogMSxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcDogdGltZXN0YW1wIC0gMjAsXG4gICAgICB9O1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvMSwge1xuICAgICAgICBtZXNzYWdlSWRzOiBbbWVzc2FnZUlkLCBnZXRVdWlkKCldLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW2dldFV1aWQoKV06IFsxLCAyXSxcbiAgICAgICAgICBbZ2V0VXVpZCgpXTogWzFdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG4gICAgICBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8yLCB7XG4gICAgICAgIG1lc3NhZ2VJZHM6IFttZXNzYWdlSWRdLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW2dldFV1aWQoKV06IFsxXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvMywge1xuICAgICAgICBtZXNzYWdlSWRzOiBbZ2V0VXVpZCgpXSxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtnZXRVdWlkKCldOiBbMV0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMyk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b01lc3NhZ2VJZHMoKSwgNCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgNSk7XG5cbiAgICAgIGF3YWl0IGRlbGV0ZVNlbnRQcm90b0J5TWVzc2FnZUlkKG1lc3NhZ2VJZCk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9NZXNzYWdlSWRzKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDEpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2RlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCcsICgpID0+IHtcbiAgICBpdCgnZG9lcyBub3QgZGVsZXRlIHBheWxvYWQgaWYgcmVjaXBpZW50IHJlbWFpbnMnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgICBjb25zdCByZWNpcGllbnRVdWlkMSA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQyID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGNvbnRlbnRIaW50OiAxLFxuICAgICAgICBwcm90bzogZ2V0UmFuZG9tQnl0ZXMoMTI4KSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bywge1xuICAgICAgICBtZXNzYWdlSWRzOiBbZ2V0VXVpZCgpXSxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtyZWNpcGllbnRVdWlkMV06IFsxLCAyXSxcbiAgICAgICAgICBbcmVjaXBpZW50VXVpZDJdOiBbMV0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMyk7XG5cbiAgICAgIGF3YWl0IGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCh7XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgcmVjaXBpZW50VXVpZDogcmVjaXBpZW50VXVpZDEsXG4gICAgICAgIGRldmljZUlkOiAxLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDIpO1xuICAgIH0pO1xuXG4gICAgaXQoJ2RlbGV0ZXMgcGF5bG9hZCBpZiBubyByZWNpcGllbnRzIHJlbWFpbicsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQxID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgcmVjaXBpZW50VXVpZDIgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvLCB7XG4gICAgICAgIG1lc3NhZ2VJZHM6IFtnZXRVdWlkKCldLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW3JlY2lwaWVudFV1aWQxXTogWzEsIDJdLFxuICAgICAgICAgIFtyZWNpcGllbnRVdWlkMl06IFsxXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAxKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAzKTtcblxuICAgICAgYXdhaXQgZGVsZXRlU2VudFByb3RvUmVjaXBpZW50KHtcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICByZWNpcGllbnRVdWlkOiByZWNpcGllbnRVdWlkMSxcbiAgICAgICAgZGV2aWNlSWQ6IDEsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMik7XG5cbiAgICAgIGF3YWl0IGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudCh7XG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgcmVjaXBpZW50VXVpZDogcmVjaXBpZW50VXVpZDEsXG4gICAgICAgIGRldmljZUlkOiAyLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDEpO1xuXG4gICAgICBhd2FpdCBkZWxldGVTZW50UHJvdG9SZWNpcGllbnQoe1xuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIHJlY2lwaWVudFV1aWQ6IHJlY2lwaWVudFV1aWQyLFxuICAgICAgICBkZXZpY2VJZDogMSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAwKTtcbiAgICB9KTtcblxuICAgIGl0KCdkZWxldGVzIG11bHRpcGxlIHJlY2lwaWVudHMgaW4gYSBzaW5nbGUgdHJhbnNhY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgICBjb25zdCByZWNpcGllbnRVdWlkMSA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQyID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGNvbnRlbnRIaW50OiAxLFxuICAgICAgICBwcm90bzogZ2V0UmFuZG9tQnl0ZXMoMTI4KSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bywge1xuICAgICAgICBtZXNzYWdlSWRzOiBbZ2V0VXVpZCgpXSxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtyZWNpcGllbnRVdWlkMV06IFsxLCAyXSxcbiAgICAgICAgICBbcmVjaXBpZW50VXVpZDJdOiBbMV0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMyk7XG5cbiAgICAgIGF3YWl0IGRlbGV0ZVNlbnRQcm90b1JlY2lwaWVudChbXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgcmVjaXBpZW50VXVpZDogcmVjaXBpZW50VXVpZDEsXG4gICAgICAgICAgZGV2aWNlSWQ6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgcmVjaXBpZW50VXVpZDogcmVjaXBpZW50VXVpZDEsXG4gICAgICAgICAgZGV2aWNlSWQ6IDIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgICAgcmVjaXBpZW50VXVpZDogcmVjaXBpZW50VXVpZDIsXG4gICAgICAgICAgZGV2aWNlSWQ6IDEsXG4gICAgICAgIH0sXG4gICAgICBdKTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMCk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjZ2V0U2VudFByb3RvQnlSZWNpcGllbnQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgbWF0Y2hpbmcgcGF5bG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBtZXNzYWdlSWRzID0gW2dldFV1aWQoKSwgZ2V0VXVpZCgpXTtcbiAgICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBjb250ZW50SGludDogMSxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH07XG4gICAgICBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8sIHtcbiAgICAgICAgbWVzc2FnZUlkcyxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtyZWNpcGllbnRVdWlkXTogWzEsIDJdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDIpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9NZXNzYWdlSWRzKCksIDIpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBnZXRTZW50UHJvdG9CeVJlY2lwaWVudCh7XG4gICAgICAgIG5vdzogdGltZXN0YW1wLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICAgIHJlY2lwaWVudFV1aWQsXG4gICAgICB9KTtcblxuICAgICAgaWYgKCFhY3R1YWwpIHtcbiAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdGYWlsZWQgdG8gZmV0Y2ggcHJvdG8hJyk7XG4gICAgICB9XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLmNvbnRlbnRIaW50LCBwcm90by5jb250ZW50SGludCk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGNvbnN0YW50VGltZUVxdWFsKGFjdHVhbC5wcm90bywgcHJvdG8ucHJvdG8pKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChhY3R1YWwudGltZXN0YW1wLCBwcm90by50aW1lc3RhbXApO1xuICAgICAgYXNzZXJ0LnNhbWVNZW1iZXJzKGFjdHVhbC5tZXNzYWdlSWRzLCBtZXNzYWdlSWRzKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG1hdGNoaW5nIHBheWxvYWQgd2l0aCBubyBtZXNzYWdlSWRzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgICAgY29uc3QgcmVjaXBpZW50VXVpZCA9IGdldFV1aWQoKTtcbiAgICAgIGNvbnN0IHByb3RvID0ge1xuICAgICAgICBjb250ZW50SGludDogMSxcbiAgICAgICAgcHJvdG86IGdldFJhbmRvbUJ5dGVzKDEyOCksXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgIH07XG4gICAgICBhd2FpdCBpbnNlcnRTZW50UHJvdG8ocHJvdG8sIHtcbiAgICAgICAgbWVzc2FnZUlkczogW10sXG4gICAgICAgIHJlY2lwaWVudHM6IHtcbiAgICAgICAgICBbcmVjaXBpZW50VXVpZF06IFsxLCAyXSxcbiAgICAgICAgfSxcbiAgICAgIH0pO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAxKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAyKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvTWVzc2FnZUlkcygpLCAwKTtcblxuICAgICAgY29uc3QgYWN0dWFsID0gYXdhaXQgZ2V0U2VudFByb3RvQnlSZWNpcGllbnQoe1xuICAgICAgICBub3c6IHRpbWVzdGFtcCxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGlmICghYWN0dWFsKSB7XG4gICAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGZldGNoIHByb3RvIScpO1xuICAgICAgfVxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdHVhbC5jb250ZW50SGludCwgcHJvdG8uY29udGVudEhpbnQpO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShjb25zdGFudFRpbWVFcXVhbChhY3R1YWwucHJvdG8sIHByb3RvLnByb3RvKSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLnRpbWVzdGFtcCwgcHJvdG8udGltZXN0YW1wKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLm1lc3NhZ2VJZHMsIFtdKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIG5vdGhpbmcgaWYgcGF5bG9hZCBkb2VzIG5vdCBoYXZlIHJlY2lwaWVudCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvLCB7XG4gICAgICAgIG1lc3NhZ2VJZHM6IFtnZXRVdWlkKCldLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW3JlY2lwaWVudFV1aWRdOiBbMSwgMl0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMik7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IGdldFNlbnRQcm90b0J5UmVjaXBpZW50KHtcbiAgICAgICAgbm93OiB0aW1lc3RhbXAsXG4gICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgcmVjaXBpZW50VXVpZDogZ2V0VXVpZCgpLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChhY3R1YWwpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgbm90aGluZyBpZiB0aW1lc3RhbXAgZG9lcyBub3QgbWF0Y2gnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgICBjb25zdCByZWNpcGllbnRVdWlkID0gZ2V0VXVpZCgpO1xuICAgICAgY29uc3QgcHJvdG8gPSB7XG4gICAgICAgIGNvbnRlbnRIaW50OiAxLFxuICAgICAgICBwcm90bzogZ2V0UmFuZG9tQnl0ZXMoMTI4KSxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgfTtcbiAgICAgIGF3YWl0IGluc2VydFNlbnRQcm90byhwcm90bywge1xuICAgICAgICBtZXNzYWdlSWRzOiBbZ2V0VXVpZCgpXSxcbiAgICAgICAgcmVjaXBpZW50czoge1xuICAgICAgICAgIFtyZWNpcGllbnRVdWlkXTogWzEsIDJdLFxuICAgICAgICB9LFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBnZXRBbGxTZW50UHJvdG9zKCksIDEpO1xuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IF9nZXRBbGxTZW50UHJvdG9SZWNpcGllbnRzKCksIDIpO1xuXG4gICAgICBjb25zdCBhY3R1YWwgPSBhd2FpdCBnZXRTZW50UHJvdG9CeVJlY2lwaWVudCh7XG4gICAgICAgIG5vdzogdGltZXN0YW1wLFxuICAgICAgICB0aW1lc3RhbXA6IHRpbWVzdGFtcCArIDEsXG4gICAgICAgIHJlY2lwaWVudFV1aWQsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGFjdHVhbCk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBub3RoaW5nIGlmIHRpbWVzdGFtcCBwcm90byBpcyB0b28gb2xkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgVFdPX0RBWVMgPSAyICogMjQgKiA2MCAqIDYwICogMTAwMDtcbiAgICAgIGNvbnN0IHRpbWVzdGFtcCA9IERhdGUubm93KCk7XG5cbiAgICAgIGNvbnN0IHJlY2lwaWVudFV1aWQgPSBnZXRVdWlkKCk7XG4gICAgICBjb25zdCBwcm90byA9IHtcbiAgICAgICAgY29udGVudEhpbnQ6IDEsXG4gICAgICAgIHByb3RvOiBnZXRSYW5kb21CeXRlcygxMjgpLFxuICAgICAgICB0aW1lc3RhbXAsXG4gICAgICB9O1xuICAgICAgYXdhaXQgaW5zZXJ0U2VudFByb3RvKHByb3RvLCB7XG4gICAgICAgIG1lc3NhZ2VJZHM6IFtnZXRVdWlkKCldLFxuICAgICAgICByZWNpcGllbnRzOiB7XG4gICAgICAgICAgW3JlY2lwaWVudFV1aWRdOiBbMSwgMl0sXG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0Lmxlbmd0aE9mKGF3YWl0IGdldEFsbFNlbnRQcm90b3MoKSwgMSk7XG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgX2dldEFsbFNlbnRQcm90b1JlY2lwaWVudHMoKSwgMik7XG5cbiAgICAgIGNvbnN0IGFjdHVhbCA9IGF3YWl0IGdldFNlbnRQcm90b0J5UmVjaXBpZW50KHtcbiAgICAgICAgbm93OiB0aW1lc3RhbXAgKyBUV09fREFZUyxcbiAgICAgICAgdGltZXN0YW1wLFxuICAgICAgICByZWNpcGllbnRVdWlkLFxuICAgICAgfSk7XG5cbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChhY3R1YWwpO1xuXG4gICAgICBhc3NlcnQubGVuZ3RoT2YoYXdhaXQgZ2V0QWxsU2VudFByb3RvcygpLCAwKTtcbiAgICAgIGFzc2VydC5sZW5ndGhPZihhd2FpdCBfZ2V0QWxsU2VudFByb3RvUmVjaXBpZW50cygpLCAwKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFFdkIsb0JBQTBCO0FBQzFCLGtCQUFxQjtBQUVyQixvQkFBa0Q7QUFFbEQsbUJBQW1DO0FBQ2pDLFNBQU8saUJBQUssU0FBUyxFQUFFLFNBQVM7QUFDbEM7QUFGUyxBQUlULE1BQU07QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxJQUNFO0FBRUosU0FBUyxlQUFlLE1BQU07QUFDNUIsYUFBVyxZQUFZO0FBQ3JCLFVBQU0sb0JBQW9CO0FBQUEsRUFDNUIsQ0FBQztBQUVELEtBQUcsb0RBQW9ELFlBQVk7QUFDakUsVUFBTSxRQUFRLGtDQUFlLEdBQUc7QUFDaEMsVUFBTSxZQUFZLEtBQUssSUFBSTtBQUMzQixVQUFNLFFBQVE7QUFBQSxNQUNaLGFBQWE7QUFBQSxNQUNiLE9BQU87QUFBQSxNQUNQO0FBQUEsSUFDRjtBQUNBLFVBQU0sZ0JBQWdCLE9BQU87QUFBQSxNQUMzQixZQUFZLENBQUMsUUFBUSxDQUFDO0FBQUEsTUFDdEIsWUFBWTtBQUFB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
