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
var import_sinon = __toESM(require("sinon"));
var import_retryPlaceholders = require("../../util/retryPlaceholders");
describe("RetryPlaceholders", () => {
  const NOW = 1e6;
  let clock;
  beforeEach(() => {
    window.storage.put(import_retryPlaceholders.STORAGE_KEY, void 0);
    clock = import_sinon.default.useFakeTimers({
      now: NOW
    });
  });
  afterEach(() => {
    clock.restore();
  });
  function getDefaultItem() {
    return {
      conversationId: "conversation-id",
      sentAt: NOW - 10,
      receivedAt: NOW - 5,
      receivedAtCounter: 4,
      senderUuid: "sender-uuid"
    };
  }
  describe("constructor", () => {
    it("loads previously-saved data on creation", () => {
      const items = [
        getDefaultItem(),
        { ...getDefaultItem(), conversationId: "conversation-id-2" }
      ];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
    });
    it("starts with no data if provided data fails to parse", () => {
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, [
        { item: "is wrong shape!" },
        { bad: "is not good!" }
      ]);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(0, placeholders.getCount());
    });
  });
  describe("#add", () => {
    it("adds one item", async () => {
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      await placeholders.add(getDefaultItem());
      import_chai.assert.strictEqual(1, placeholders.getCount());
    });
    it("throws if provided data fails to parse", () => {
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.isRejected(placeholders.add({
        item: "is wrong shape!"
      }), "Item did not match schema");
    });
  });
  describe("#getNextToExpire", () => {
    it("returns nothing if no items", () => {
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(0, placeholders.getCount());
      import_chai.assert.isUndefined(placeholders.getNextToExpire());
    });
    it("returns only item if just one item", () => {
      const item = getDefaultItem();
      const items = [item];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(1, placeholders.getCount());
      import_chai.assert.deepEqual(item, placeholders.getNextToExpire());
    });
    it("returns soonest expiration given a list, and after add", async () => {
      const older = {
        ...getDefaultItem(),
        receivedAt: NOW
      };
      const newer = {
        ...getDefaultItem(),
        receivedAt: NOW + 10
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.deepEqual(older, placeholders.getNextToExpire());
      const oldest = {
        ...getDefaultItem(),
        receivedAt: NOW - 5
      };
      await placeholders.add(oldest);
      import_chai.assert.strictEqual(3, placeholders.getCount());
      import_chai.assert.deepEqual(oldest, placeholders.getNextToExpire());
    });
  });
  describe("#getExpiredAndRemove", () => {
    it("does nothing if no item expired", async () => {
      const older = {
        ...getDefaultItem(),
        receivedAt: NOW + 10
      };
      const newer = {
        ...getDefaultItem(),
        receivedAt: NOW + 15
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.deepEqual([], await placeholders.getExpiredAndRemove());
      import_chai.assert.strictEqual(2, placeholders.getCount());
    });
    it("removes just one if expired", async () => {
      const older = {
        ...getDefaultItem(),
        receivedAt: (0, import_retryPlaceholders.getDeltaIntoPast)() - 1e3
      };
      const newer = {
        ...getDefaultItem(),
        receivedAt: NOW + 15
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.deepEqual([older], await placeholders.getExpiredAndRemove());
      import_chai.assert.strictEqual(1, placeholders.getCount());
      import_chai.assert.deepEqual(newer, placeholders.getNextToExpire());
    });
    it("removes all if expired", async () => {
      const older = {
        ...getDefaultItem(),
        receivedAt: (0, import_retryPlaceholders.getDeltaIntoPast)() - 1e3
      };
      const newer = {
        ...getDefaultItem(),
        receivedAt: (0, import_retryPlaceholders.getDeltaIntoPast)() - 900
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.deepEqual([older, newer], await placeholders.getExpiredAndRemove());
      import_chai.assert.strictEqual(0, placeholders.getCount());
    });
  });
  describe("#findByConversationAndMarkOpened", () => {
    it("does nothing if no items found matching conversation", async () => {
      const older = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1"
      };
      const newer = {
        ...getDefaultItem(),
        conversationId: "conversation-id-2"
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      await placeholders.findByConversationAndMarkOpened("conversation-id-3");
      import_chai.assert.strictEqual(2, placeholders.getCount());
      const saveItems = window.storage.get(import_retryPlaceholders.STORAGE_KEY);
      import_chai.assert.deepEqual([older, newer], saveItems);
    });
    it("updates all items matching conversation", async () => {
      const convo1a = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        receivedAt: NOW - 5
      };
      const convo1b = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        receivedAt: NOW - 4
      };
      const convo2a = {
        ...getDefaultItem(),
        conversationId: "conversation-id-2",
        receivedAt: NOW + 15
      };
      const items = [convo1a, convo1b, convo2a];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(3, placeholders.getCount());
      await placeholders.findByConversationAndMarkOpened("conversation-id-1");
      import_chai.assert.strictEqual(3, placeholders.getCount());
      const firstSaveItems = window.storage.get(import_retryPlaceholders.STORAGE_KEY);
      import_chai.assert.deepEqual([
        {
          ...convo1a,
          wasOpened: true
        },
        {
          ...convo1b,
          wasOpened: true
        },
        convo2a
      ], firstSaveItems);
      const convo2b = {
        ...getDefaultItem(),
        conversationId: "conversation-id-2",
        receivedAt: NOW + 16
      };
      await placeholders.add(convo2b);
      import_chai.assert.strictEqual(4, placeholders.getCount());
      await placeholders.findByConversationAndMarkOpened("conversation-id-2");
      import_chai.assert.strictEqual(4, placeholders.getCount());
      const secondSaveItems = window.storage.get(import_retryPlaceholders.STORAGE_KEY);
      import_chai.assert.deepEqual([
        {
          ...convo1a,
          wasOpened: true
        },
        {
          ...convo1b,
          wasOpened: true
        },
        {
          ...convo2a,
          wasOpened: true
        },
        {
          ...convo2b,
          wasOpened: true
        }
      ], secondSaveItems);
    });
  });
  describe("#findByMessageAndRemove", () => {
    it("does nothing if no item matching message found", async () => {
      const sentAt = NOW - 20;
      const older = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        sentAt: NOW - 10
      };
      const newer = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        sentAt: NOW - 11
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.isUndefined(await placeholders.findByMessageAndRemove("conversation-id-1", sentAt));
      import_chai.assert.strictEqual(2, placeholders.getCount());
    });
    it("removes the item matching message", async () => {
      const sentAt = NOW - 20;
      const older = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        sentAt: NOW - 10
      };
      const newer = {
        ...getDefaultItem(),
        conversationId: "conversation-id-1",
        sentAt
      };
      const items = [older, newer];
      window.storage.put(import_retryPlaceholders.STORAGE_KEY, items);
      const placeholders = new import_retryPlaceholders.RetryPlaceholders();
      import_chai.assert.strictEqual(2, placeholders.getCount());
      import_chai.assert.deepEqual(newer, await placeholders.findByMessageAndRemove("conversation-id-1", sentAt));
      import_chai.assert.strictEqual(1, placeholders.getCount());
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicmV0cnlQbGFjZWhvbGRlcnNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB0eXBlIHsgUmV0cnlJdGVtVHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvcmV0cnlQbGFjZWhvbGRlcnMnO1xuaW1wb3J0IHtcbiAgZ2V0RGVsdGFJbnRvUGFzdCxcbiAgUmV0cnlQbGFjZWhvbGRlcnMsXG4gIFNUT1JBR0VfS0VZLFxufSBmcm9tICcuLi8uLi91dGlsL3JldHJ5UGxhY2Vob2xkZXJzJztcblxuLyogZXNsaW50LWRpc2FibGUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSAqL1xuXG5kZXNjcmliZSgnUmV0cnlQbGFjZWhvbGRlcnMnLCAoKSA9PiB7XG4gIGNvbnN0IE5PVyA9IDFfMDAwXzAwMDtcbiAgbGV0IGNsb2NrOiBhbnk7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCB1bmRlZmluZWQgYXMgYW55KTtcblxuICAgIGNsb2NrID0gc2lub24udXNlRmFrZVRpbWVycyh7XG4gICAgICBub3c6IE5PVyxcbiAgICB9KTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBjbG9jay5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGZ1bmN0aW9uIGdldERlZmF1bHRJdGVtKCk6IFJldHJ5SXRlbVR5cGUge1xuICAgIHJldHVybiB7XG4gICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZCcsXG4gICAgICBzZW50QXQ6IE5PVyAtIDEwLFxuICAgICAgcmVjZWl2ZWRBdDogTk9XIC0gNSxcbiAgICAgIHJlY2VpdmVkQXRDb3VudGVyOiA0LFxuICAgICAgc2VuZGVyVXVpZDogJ3NlbmRlci11dWlkJyxcbiAgICB9O1xuICB9XG5cbiAgZGVzY3JpYmUoJ2NvbnN0cnVjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdsb2FkcyBwcmV2aW91c2x5LXNhdmVkIGRhdGEgb24gY3JlYXRpb24nLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtczogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbXG4gICAgICAgIGdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIHsgLi4uZ2V0RGVmYXVsdEl0ZW0oKSwgY29udmVyc2F0aW9uSWQ6ICdjb252ZXJzYXRpb24taWQtMicgfSxcbiAgICAgIF07XG4gICAgICB3aW5kb3cuc3RvcmFnZS5wdXQoU1RPUkFHRV9LRVksIGl0ZW1zKTtcblxuICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gbmV3IFJldHJ5UGxhY2Vob2xkZXJzKCk7XG5cbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgfSk7XG4gICAgaXQoJ3N0YXJ0cyB3aXRoIG5vIGRhdGEgaWYgcHJvdmlkZWQgZGF0YSBmYWlscyB0byBwYXJzZScsICgpID0+IHtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgW1xuICAgICAgICB7IGl0ZW06ICdpcyB3cm9uZyBzaGFwZSEnIH0sXG4gICAgICAgIHsgYmFkOiAnaXMgbm90IGdvb2QhJyB9LFxuICAgICAgXSBhcyBhbnkpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcblxuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDAsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNhZGQnLCAoKSA9PiB7XG4gICAgaXQoJ2FkZHMgb25lIGl0ZW0nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGF3YWl0IHBsYWNlaG9sZGVycy5hZGQoZ2V0RGVmYXVsdEl0ZW0oKSk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoMSwgcGxhY2Vob2xkZXJzLmdldENvdW50KCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Rocm93cyBpZiBwcm92aWRlZCBkYXRhIGZhaWxzIHRvIHBhcnNlJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gbmV3IFJldHJ5UGxhY2Vob2xkZXJzKCk7XG4gICAgICBhc3NlcnQuaXNSZWplY3RlZChcbiAgICAgICAgcGxhY2Vob2xkZXJzLmFkZCh7XG4gICAgICAgICAgaXRlbTogJ2lzIHdyb25nIHNoYXBlIScsXG4gICAgICAgIH0gYXMgYW55KSxcbiAgICAgICAgJ0l0ZW0gZGlkIG5vdCBtYXRjaCBzY2hlbWEnXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2dldE5leHRUb0V4cGlyZScsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBub3RoaW5nIGlmIG5vIGl0ZW1zJywgKCkgPT4ge1xuICAgICAgY29uc3QgcGxhY2Vob2xkZXJzID0gbmV3IFJldHJ5UGxhY2Vob2xkZXJzKCk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoMCwgcGxhY2Vob2xkZXJzLmdldENvdW50KCkpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHBsYWNlaG9sZGVycy5nZXROZXh0VG9FeHBpcmUoKSk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgb25seSBpdGVtIGlmIGp1c3Qgb25lIGl0ZW0nLCAoKSA9PiB7XG4gICAgICBjb25zdCBpdGVtID0gZ2V0RGVmYXVsdEl0ZW0oKTtcbiAgICAgIGNvbnN0IGl0ZW1zOiBBcnJheTxSZXRyeUl0ZW1UeXBlPiA9IFtpdGVtXTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgaXRlbXMpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgxLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGl0ZW0sIHBsYWNlaG9sZGVycy5nZXROZXh0VG9FeHBpcmUoKSk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgc29vbmVzdCBleHBpcmF0aW9uIGdpdmVuIGEgbGlzdCwgYW5kIGFmdGVyIGFkZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZGVyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICByZWNlaXZlZEF0OiBOT1csXG4gICAgICB9O1xuICAgICAgY29uc3QgbmV3ZXIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIHJlY2VpdmVkQXQ6IE5PVyArIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZW1zOiBBcnJheTxSZXRyeUl0ZW1UeXBlPiA9IFtvbGRlciwgbmV3ZXJdO1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCBpdGVtcyk7XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IG5ldyBSZXRyeVBsYWNlaG9sZGVycygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDIsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwob2xkZXIsIHBsYWNlaG9sZGVycy5nZXROZXh0VG9FeHBpcmUoKSk7XG5cbiAgICAgIGNvbnN0IG9sZGVzdCA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdEl0ZW0oKSxcbiAgICAgICAgcmVjZWl2ZWRBdDogTk9XIC0gNSxcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHBsYWNlaG9sZGVycy5hZGQob2xkZXN0KTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgzLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG9sZGVzdCwgcGxhY2Vob2xkZXJzLmdldE5leHRUb0V4cGlyZSgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNnZXRFeHBpcmVkQW5kUmVtb3ZlJywgKCkgPT4ge1xuICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgbm8gaXRlbSBleHBpcmVkJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkZXIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIHJlY2VpdmVkQXQ6IE5PVyArIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICByZWNlaXZlZEF0OiBOT1cgKyAxNSxcbiAgICAgIH07XG4gICAgICBjb25zdCBpdGVtczogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbb2xkZXIsIG5ld2VyXTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgaXRlbXMpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFtdLCBhd2FpdCBwbGFjZWhvbGRlcnMuZ2V0RXhwaXJlZEFuZFJlbW92ZSgpKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgfSk7XG4gICAgaXQoJ3JlbW92ZXMganVzdCBvbmUgaWYgZXhwaXJlZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG9sZGVyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICByZWNlaXZlZEF0OiBnZXREZWx0YUludG9QYXN0KCkgLSAxMDAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICByZWNlaXZlZEF0OiBOT1cgKyAxNSxcbiAgICAgIH07XG4gICAgICBjb25zdCBpdGVtczogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbb2xkZXIsIG5ld2VyXTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgaXRlbXMpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFtvbGRlcl0sIGF3YWl0IHBsYWNlaG9sZGVycy5nZXRFeHBpcmVkQW5kUmVtb3ZlKCkpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDEsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwobmV3ZXIsIHBsYWNlaG9sZGVycy5nZXROZXh0VG9FeHBpcmUoKSk7XG4gICAgfSk7XG4gICAgaXQoJ3JlbW92ZXMgYWxsIGlmIGV4cGlyZWQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBvbGRlciA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdEl0ZW0oKSxcbiAgICAgICAgcmVjZWl2ZWRBdDogZ2V0RGVsdGFJbnRvUGFzdCgpIC0gMTAwMCxcbiAgICAgIH07XG4gICAgICBjb25zdCBuZXdlciA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdEl0ZW0oKSxcbiAgICAgICAgcmVjZWl2ZWRBdDogZ2V0RGVsdGFJbnRvUGFzdCgpIC0gOTAwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZW1zOiBBcnJheTxSZXRyeUl0ZW1UeXBlPiA9IFtvbGRlciwgbmV3ZXJdO1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCBpdGVtcyk7XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IG5ldyBSZXRyeVBsYWNlaG9sZGVycygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDIsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIFtvbGRlciwgbmV3ZXJdLFxuICAgICAgICBhd2FpdCBwbGFjZWhvbGRlcnMuZ2V0RXhwaXJlZEFuZFJlbW92ZSgpXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDAsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNmaW5kQnlDb252ZXJzYXRpb25BbmRNYXJrT3BlbmVkJywgKCkgPT4ge1xuICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgbm8gaXRlbXMgZm91bmQgbWF0Y2hpbmcgY29udmVyc2F0aW9uJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3Qgb2xkZXIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkLTEnLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0yJyxcbiAgICAgIH07XG4gICAgICBjb25zdCBpdGVtczogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbb2xkZXIsIG5ld2VyXTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgaXRlbXMpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhd2FpdCBwbGFjZWhvbGRlcnMuZmluZEJ5Q29udmVyc2F0aW9uQW5kTWFya09wZW5lZCgnY29udmVyc2F0aW9uLWlkLTMnKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG5cbiAgICAgIGNvbnN0IHNhdmVJdGVtcyA9IHdpbmRvdy5zdG9yYWdlLmdldChTVE9SQUdFX0tFWSk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFtvbGRlciwgbmV3ZXJdLCBzYXZlSXRlbXMpO1xuICAgIH0pO1xuICAgIGl0KCd1cGRhdGVzIGFsbCBpdGVtcyBtYXRjaGluZyBjb252ZXJzYXRpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBjb252bzFhID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0xJyxcbiAgICAgICAgcmVjZWl2ZWRBdDogTk9XIC0gNSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb252bzFiID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0xJyxcbiAgICAgICAgcmVjZWl2ZWRBdDogTk9XIC0gNCxcbiAgICAgIH07XG4gICAgICBjb25zdCBjb252bzJhID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0yJyxcbiAgICAgICAgcmVjZWl2ZWRBdDogTk9XICsgMTUsXG4gICAgICB9O1xuICAgICAgY29uc3QgaXRlbXM6IEFycmF5PFJldHJ5SXRlbVR5cGU+ID0gW2NvbnZvMWEsIGNvbnZvMWIsIGNvbnZvMmFdO1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCBpdGVtcyk7XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IG5ldyBSZXRyeVBsYWNlaG9sZGVycygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDMsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICAgIGF3YWl0IHBsYWNlaG9sZGVycy5maW5kQnlDb252ZXJzYXRpb25BbmRNYXJrT3BlbmVkKCdjb252ZXJzYXRpb24taWQtMScpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDMsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcblxuICAgICAgY29uc3QgZmlyc3RTYXZlSXRlbXMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoU1RPUkFHRV9LRVkpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLmNvbnZvMWEsXG4gICAgICAgICAgICB3YXNPcGVuZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5jb252bzFiLFxuICAgICAgICAgICAgd2FzT3BlbmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgY29udm8yYSxcbiAgICAgICAgXSxcbiAgICAgICAgZmlyc3RTYXZlSXRlbXNcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGNvbnZvMmIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkLTInLFxuICAgICAgICByZWNlaXZlZEF0OiBOT1cgKyAxNixcbiAgICAgIH07XG5cbiAgICAgIGF3YWl0IHBsYWNlaG9sZGVycy5hZGQoY29udm8yYik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoNCwgcGxhY2Vob2xkZXJzLmdldENvdW50KCkpO1xuICAgICAgYXdhaXQgcGxhY2Vob2xkZXJzLmZpbmRCeUNvbnZlcnNhdGlvbkFuZE1hcmtPcGVuZWQoJ2NvbnZlcnNhdGlvbi1pZC0yJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoNCwgcGxhY2Vob2xkZXJzLmdldENvdW50KCkpO1xuXG4gICAgICBjb25zdCBzZWNvbmRTYXZlSXRlbXMgPSB3aW5kb3cuc3RvcmFnZS5nZXQoU1RPUkFHRV9LRVkpO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLmNvbnZvMWEsXG4gICAgICAgICAgICB3YXNPcGVuZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5jb252bzFiLFxuICAgICAgICAgICAgd2FzT3BlbmVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgLi4uY29udm8yYSxcbiAgICAgICAgICAgIHdhc09wZW5lZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIC4uLmNvbnZvMmIsXG4gICAgICAgICAgICB3YXNPcGVuZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgICAgc2Vjb25kU2F2ZUl0ZW1zXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnI2ZpbmRCeU1lc3NhZ2VBbmRSZW1vdmUnLCAoKSA9PiB7XG4gICAgaXQoJ2RvZXMgbm90aGluZyBpZiBubyBpdGVtIG1hdGNoaW5nIG1lc3NhZ2UgZm91bmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzZW50QXQgPSBOT1cgLSAyMDtcblxuICAgICAgY29uc3Qgb2xkZXIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkLTEnLFxuICAgICAgICBzZW50QXQ6IE5PVyAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0xJyxcbiAgICAgICAgc2VudEF0OiBOT1cgLSAxMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBpdGVtczogQXJyYXk8UmV0cnlJdGVtVHlwZT4gPSBbb2xkZXIsIG5ld2VyXTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnB1dChTVE9SQUdFX0tFWSwgaXRlbXMpO1xuXG4gICAgICBjb25zdCBwbGFjZWhvbGRlcnMgPSBuZXcgUmV0cnlQbGFjZWhvbGRlcnMoKTtcbiAgICAgIGFzc2VydC5zdHJpY3RFcXVhbCgyLCBwbGFjZWhvbGRlcnMuZ2V0Q291bnQoKSk7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIGF3YWl0IHBsYWNlaG9sZGVycy5maW5kQnlNZXNzYWdlQW5kUmVtb3ZlKCdjb252ZXJzYXRpb24taWQtMScsIHNlbnRBdClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoMiwgcGxhY2Vob2xkZXJzLmdldENvdW50KCkpO1xuICAgIH0pO1xuICAgIGl0KCdyZW1vdmVzIHRoZSBpdGVtIG1hdGNoaW5nIG1lc3NhZ2UnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBzZW50QXQgPSBOT1cgLSAyMDtcblxuICAgICAgY29uc3Qgb2xkZXIgPSB7XG4gICAgICAgIC4uLmdldERlZmF1bHRJdGVtKCksXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnY29udmVyc2F0aW9uLWlkLTEnLFxuICAgICAgICBzZW50QXQ6IE5PVyAtIDEwLFxuICAgICAgfTtcbiAgICAgIGNvbnN0IG5ld2VyID0ge1xuICAgICAgICAuLi5nZXREZWZhdWx0SXRlbSgpLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZlcnNhdGlvbi1pZC0xJyxcbiAgICAgICAgc2VudEF0LFxuICAgICAgfTtcbiAgICAgIGNvbnN0IGl0ZW1zOiBBcnJheTxSZXRyeUl0ZW1UeXBlPiA9IFtvbGRlciwgbmV3ZXJdO1xuICAgICAgd2luZG93LnN0b3JhZ2UucHV0KFNUT1JBR0VfS0VZLCBpdGVtcyk7XG5cbiAgICAgIGNvbnN0IHBsYWNlaG9sZGVycyA9IG5ldyBSZXRyeVBsYWNlaG9sZGVycygpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDIsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIG5ld2VyLFxuICAgICAgICBhd2FpdCBwbGFjZWhvbGRlcnMuZmluZEJ5TWVzc2FnZUFuZFJlbW92ZSgnY29udmVyc2F0aW9uLWlkLTEnLCBzZW50QXQpXG4gICAgICApO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKDEsIHBsYWNlaG9sZGVycy5nZXRDb3VudCgpKTtcbiAgICB9KTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsbUJBQWtCO0FBR2xCLCtCQUlPO0FBSVAsU0FBUyxxQkFBcUIsTUFBTTtBQUNsQyxRQUFNLE1BQU07QUFDWixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsV0FBTyxRQUFRLElBQUksc0NBQWEsTUFBZ0I7QUFFaEQsWUFBUSxxQkFBTSxjQUFjO0FBQUEsTUFDMUIsS0FBSztBQUFBLElBQ1AsQ0FBQztBQUFBLEVBQ0gsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFVBQU0sUUFBUTtBQUFBLEVBQ2hCLENBQUM7QUFFRCw0QkFBeUM7QUFDdkMsV0FBTztBQUFBLE1BQ0wsZ0JBQWdCO0FBQUEsTUFDaEIsUUFBUSxNQUFNO0FBQUEsTUFDZCxZQUFZLE1BQU07QUFBQSxNQUNsQixtQkFBbUI7QUFBQSxNQUNuQixZQUFZO0FBQUEsSUFDZDtBQUFBLEVBQ0Y7QUFSUyxBQVVULFdBQVMsZUFBZSxNQUFNO0FBQzVCLE9BQUcsMkNBQTJDLE1BQU07QUFDbEQsWUFBTSxRQUE4QjtBQUFBLFFBQ2xDLGVBQWU7QUFBQSxRQUNmLEtBQUssZUFBZSxHQUFHLGdCQUFnQixvQkFBb0I7QUFBQSxNQUM3RDtBQUNBLGFBQU8sUUFBUSxJQUFJLHNDQUFhLEtBQUs7QUFFckMsWUFBTSxlQUFlLElBQUksMkNBQWtCO0FBRTNDLHlCQUFPLFlBQVks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
