var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_lodash = require("lodash");
var import_uuid = require("uuid");
var import_MessageSendState = require("../../messages/MessageSendState");
describe("message send state utilities", () => {
  describe("maxStatus", () => {
    const expectedOrder = [
      import_MessageSendState.SendStatus.Failed,
      import_MessageSendState.SendStatus.Pending,
      import_MessageSendState.SendStatus.Sent,
      import_MessageSendState.SendStatus.Delivered,
      import_MessageSendState.SendStatus.Read,
      import_MessageSendState.SendStatus.Viewed
    ];
    it("returns the input if arguments are equal", () => {
      expectedOrder.forEach((status) => {
        import_chai.assert.strictEqual((0, import_MessageSendState.maxStatus)(status, status), status);
      });
    });
    it("orders the statuses", () => {
      (0, import_lodash.times)(100, () => {
        const [a, b] = (0, import_lodash.sampleSize)(expectedOrder, 2);
        const isABigger = expectedOrder.indexOf(a) > expectedOrder.indexOf(b);
        const expected = isABigger ? a : b;
        const actual = (0, import_MessageSendState.maxStatus)(a, b);
        import_chai.assert.strictEqual(actual, expected);
      });
    });
  });
  describe("isViewed", () => {
    it("returns true for viewed statuses", () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Viewed));
    });
    it("returns false for non-viewed statuses", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Read));
      import_chai.assert.isFalse((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Delivered));
      import_chai.assert.isFalse((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Sent));
      import_chai.assert.isFalse((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Pending));
      import_chai.assert.isFalse((0, import_MessageSendState.isViewed)(import_MessageSendState.SendStatus.Failed));
    });
  });
  describe("isRead", () => {
    it("returns true for read and viewed statuses", () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Read));
      import_chai.assert.isTrue((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Viewed));
    });
    it("returns false for non-read statuses", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Delivered));
      import_chai.assert.isFalse((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Sent));
      import_chai.assert.isFalse((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Pending));
      import_chai.assert.isFalse((0, import_MessageSendState.isRead)(import_MessageSendState.SendStatus.Failed));
    });
  });
  describe("isDelivered", () => {
    it("returns true for delivered, read, and viewed statuses", () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Delivered));
      import_chai.assert.isTrue((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Read));
      import_chai.assert.isTrue((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Viewed));
    });
    it("returns false for non-delivered statuses", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Sent));
      import_chai.assert.isFalse((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Pending));
      import_chai.assert.isFalse((0, import_MessageSendState.isDelivered)(import_MessageSendState.SendStatus.Failed));
    });
  });
  describe("isSent", () => {
    it('returns true for all statuses sent and "above"', () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Sent));
      import_chai.assert.isTrue((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Delivered));
      import_chai.assert.isTrue((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Read));
      import_chai.assert.isTrue((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Viewed));
    });
    it("returns false for non-sent statuses", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Pending));
      import_chai.assert.isFalse((0, import_MessageSendState.isSent)(import_MessageSendState.SendStatus.Failed));
    });
  });
  describe("isFailed", () => {
    it("returns true for failed statuses", () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Failed));
    });
    it("returns false for non-failed statuses", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Viewed));
      import_chai.assert.isFalse((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Read));
      import_chai.assert.isFalse((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Delivered));
      import_chai.assert.isFalse((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Sent));
      import_chai.assert.isFalse((0, import_MessageSendState.isFailed)(import_MessageSendState.SendStatus.Pending));
    });
  });
  describe("someSendStatus", () => {
    it("returns false if there are no send states", () => {
      const alwaysTrue = /* @__PURE__ */ __name(() => true, "alwaysTrue");
      import_chai.assert.isFalse((0, import_MessageSendState.someSendStatus)(void 0, alwaysTrue));
      import_chai.assert.isFalse((0, import_MessageSendState.someSendStatus)({}, alwaysTrue));
    });
    it("returns false if no send states match", () => {
      const sendStateByConversationId = {
        abc: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: Date.now()
        },
        def: {
          status: import_MessageSendState.SendStatus.Read,
          updatedAt: Date.now()
        }
      };
      import_chai.assert.isFalse((0, import_MessageSendState.someSendStatus)(sendStateByConversationId, (status) => status === import_MessageSendState.SendStatus.Delivered));
    });
    it("returns true if at least one send state matches", () => {
      const sendStateByConversationId = {
        abc: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: Date.now()
        },
        def: {
          status: import_MessageSendState.SendStatus.Read,
          updatedAt: Date.now()
        }
      };
      import_chai.assert.isTrue((0, import_MessageSendState.someSendStatus)(sendStateByConversationId, (status) => status === import_MessageSendState.SendStatus.Read));
    });
  });
  describe("isMessageJustForMe", () => {
    const ourConversationId = (0, import_uuid.v4)();
    it("returns false if the conversation has an empty send state", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isMessageJustForMe)(void 0, ourConversationId));
      import_chai.assert.isFalse((0, import_MessageSendState.isMessageJustForMe)({}, ourConversationId));
    });
    it("returns false if the message is for anyone else", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isMessageJustForMe)({
        [ourConversationId]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: 123
        },
        [(0, import_uuid.v4)()]: {
          status: import_MessageSendState.SendStatus.Pending,
          updatedAt: 123
        }
      }, ourConversationId));
      import_chai.assert.isFalse((0, import_MessageSendState.isMessageJustForMe)({
        [(0, import_uuid.v4)()]: {
          status: import_MessageSendState.SendStatus.Pending,
          updatedAt: 123
        }
      }, ourConversationId));
    });
    it("returns true if the message is just for you", () => {
      import_chai.assert.isTrue((0, import_MessageSendState.isMessageJustForMe)({
        [ourConversationId]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: 123
        }
      }, ourConversationId));
    });
    it("returns false if the message is for you but we have no conversationId", () => {
      import_chai.assert.isFalse((0, import_MessageSendState.isMessageJustForMe)({
        [ourConversationId]: {
          status: import_MessageSendState.SendStatus.Sent,
          updatedAt: 123
        }
      }, void 0));
    });
  });
  describe("sendStateReducer", () => {
    const assertTransition = /* @__PURE__ */ __name((startStatus, actionType, expectedStatus) => {
      const startState = {
        status: startStatus,
        updatedAt: 1
      };
      const action = {
        type: actionType,
        updatedAt: 2
      };
      const result = (0, import_MessageSendState.sendStateReducer)(startState, action);
      import_chai.assert.strictEqual(result.status, expectedStatus);
      import_chai.assert.strictEqual(result.updatedAt, startStatus === expectedStatus ? 1 : 2);
    }, "assertTransition");
    describe("transitions from Pending", () => {
      it("goes from Pending \u2192 Failed with a failure", () => {
        const result = (0, import_MessageSendState.sendStateReducer)({ status: import_MessageSendState.SendStatus.Pending, updatedAt: 999 }, { type: import_MessageSendState.SendActionType.Failed, updatedAt: 123 });
        import_chai.assert.deepEqual(result, {
          status: import_MessageSendState.SendStatus.Failed,
          updatedAt: 123
        });
      });
      it("does nothing when receiving ManuallyRetried", () => {
        assertTransition(import_MessageSendState.SendStatus.Pending, import_MessageSendState.SendActionType.ManuallyRetried, import_MessageSendState.SendStatus.Pending);
      });
      it("goes from Pending to all other sent states", () => {
        assertTransition(import_MessageSendState.SendStatus.Pending, import_MessageSendState.SendActionType.Sent, import_MessageSendState.SendStatus.Sent);
        assertTransition(import_MessageSendState.SendStatus.Pending, import_MessageSendState.SendActionType.GotDeliveryReceipt, import_MessageSendState.SendStatus.Delivered);
        assertTransition(import_MessageSendState.SendStatus.Pending, import_MessageSendState.SendActionType.GotReadReceipt, import_MessageSendState.SendStatus.Read);
        assertTransition(import_MessageSendState.SendStatus.Pending, import_MessageSendState.SendActionType.GotViewedReceipt, import_MessageSendState.SendStatus.Viewed);
      });
    });
    describe("transitions from Failed", () => {
      it("does nothing when receiving a Failed action", () => {
        const result = (0, import_MessageSendState.sendStateReducer)({
          status: import_MessageSendState.SendStatus.Failed,
          updatedAt: 123
        }, {
          type: import_MessageSendState.SendActionType.Failed,
          updatedAt: 999
        });
        import_chai.assert.deepEqual(result, {
          status: import_MessageSendState.SendStatus.Failed,
          updatedAt: 123
        });
      });
      it("goes from Failed to all other states", () => {
        assertTransition(import_MessageSendState.SendStatus.Failed, import_MessageSendState.SendActionType.ManuallyRetried, import_MessageSendState.SendStatus.Pending);
        assertTransition(import_MessageSendState.SendStatus.Failed, import_MessageSendState.SendActionType.Sent, import_MessageSendState.SendStatus.Sent);
        assertTransition(import_MessageSendState.SendStatus.Failed, import_MessageSendState.SendActionType.GotDeliveryReceipt, import_MessageSendState.SendStatus.Delivered);
        assertTransition(import_MessageSendState.SendStatus.Failed, import_MessageSendState.SendActionType.GotReadReceipt, import_MessageSendState.SendStatus.Read);
        assertTransition(import_MessageSendState.SendStatus.Failed, import_MessageSendState.SendActionType.GotViewedReceipt, import_MessageSendState.SendStatus.Viewed);
      });
    });
    describe("transitions from Sent", () => {
      it('does nothing when trying to go "backwards"', () => {
        [import_MessageSendState.SendActionType.Failed, import_MessageSendState.SendActionType.ManuallyRetried].forEach((type) => {
          assertTransition(import_MessageSendState.SendStatus.Sent, type, import_MessageSendState.SendStatus.Sent);
        });
      });
      it("does nothing when receiving a Sent action", () => {
        assertTransition(import_MessageSendState.SendStatus.Sent, import_MessageSendState.SendActionType.Sent, import_MessageSendState.SendStatus.Sent);
      });
      it("can go forward to other states", () => {
        assertTransition(import_MessageSendState.SendStatus.Sent, import_MessageSendState.SendActionType.GotDeliveryReceipt, import_MessageSendState.SendStatus.Delivered);
        assertTransition(import_MessageSendState.SendStatus.Sent, import_MessageSendState.SendActionType.GotReadReceipt, import_MessageSendState.SendStatus.Read);
        assertTransition(import_MessageSendState.SendStatus.Sent, import_MessageSendState.SendActionType.GotViewedReceipt, import_MessageSendState.SendStatus.Viewed);
      });
    });
    describe("transitions from Delivered", () => {
      it('does nothing when trying to go "backwards"', () => {
        [
          import_MessageSendState.SendActionType.Failed,
          import_MessageSendState.SendActionType.ManuallyRetried,
          import_MessageSendState.SendActionType.Sent
        ].forEach((type) => {
          assertTransition(import_MessageSendState.SendStatus.Delivered, type, import_MessageSendState.SendStatus.Delivered);
        });
      });
      it("does nothing when receiving a delivery receipt", () => {
        assertTransition(import_MessageSendState.SendStatus.Delivered, import_MessageSendState.SendActionType.GotDeliveryReceipt, import_MessageSendState.SendStatus.Delivered);
      });
      it("can go forward to other states", () => {
        assertTransition(import_MessageSendState.SendStatus.Delivered, import_MessageSendState.SendActionType.GotReadReceipt, import_MessageSendState.SendStatus.Read);
        assertTransition(import_MessageSendState.SendStatus.Delivered, import_MessageSendState.SendActionType.GotViewedReceipt, import_MessageSendState.SendStatus.Viewed);
      });
    });
    describe("transitions from Read", () => {
      it('does nothing when trying to go "backwards"', () => {
        [
          import_MessageSendState.SendActionType.Failed,
          import_MessageSendState.SendActionType.ManuallyRetried,
          import_MessageSendState.SendActionType.Sent,
          import_MessageSendState.SendActionType.GotDeliveryReceipt
        ].forEach((type) => {
          assertTransition(import_MessageSendState.SendStatus.Read, type, import_MessageSendState.SendStatus.Read);
        });
      });
      it("does nothing when receiving a read receipt", () => {
        assertTransition(import_MessageSendState.SendStatus.Read, import_MessageSendState.SendActionType.GotReadReceipt, import_MessageSendState.SendStatus.Read);
      });
      it('can go forward to the "viewed" state', () => {
        assertTransition(import_MessageSendState.SendStatus.Read, import_MessageSendState.SendActionType.GotViewedReceipt, import_MessageSendState.SendStatus.Viewed);
      });
    });
    describe("transitions from Viewed", () => {
      it("ignores all actions", () => {
        [
          import_MessageSendState.SendActionType.Failed,
          import_MessageSendState.SendActionType.ManuallyRetried,
          import_MessageSendState.SendActionType.Sent,
          import_MessageSendState.SendActionType.GotDeliveryReceipt,
          import_MessageSendState.SendActionType.GotReadReceipt,
          import_MessageSendState.SendActionType.GotViewedReceipt
        ].forEach((type) => {
          assertTransition(import_MessageSendState.SendStatus.Viewed, type, import_MessageSendState.SendStatus.Viewed);
        });
      });
    });
    describe("legacy transitions", () => {
      it("allows actions without timestamps", () => {
        const startState = {
          status: import_MessageSendState.SendStatus.Pending,
          updatedAt: Date.now()
        };
        const action = {
          type: import_MessageSendState.SendActionType.Sent,
          updatedAt: void 0
        };
        const result = (0, import_MessageSendState.sendStateReducer)(startState, action);
        import_chai.assert.isUndefined(result.updatedAt);
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVNlbmRTdGF0ZV90ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgc2FtcGxlU2l6ZSwgdGltZXMgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgdjQgYXMgdXVpZCB9IGZyb20gJ3V1aWQnO1xuXG5pbXBvcnQgdHlwZSB7XG4gIFNlbmRBY3Rpb24sXG4gIFNlbmRTdGF0ZSxcbiAgU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbn0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQge1xuICBTZW5kQWN0aW9uVHlwZSxcbiAgU2VuZFN0YXR1cyxcbiAgaXNEZWxpdmVyZWQsXG4gIGlzRmFpbGVkLFxuICBpc01lc3NhZ2VKdXN0Rm9yTWUsXG4gIGlzUmVhZCxcbiAgaXNTZW50LFxuICBpc1ZpZXdlZCxcbiAgbWF4U3RhdHVzLFxuICBzZW5kU3RhdGVSZWR1Y2VyLFxuICBzb21lU2VuZFN0YXR1cyxcbn0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5cbmRlc2NyaWJlKCdtZXNzYWdlIHNlbmQgc3RhdGUgdXRpbGl0aWVzJywgKCkgPT4ge1xuICBkZXNjcmliZSgnbWF4U3RhdHVzJywgKCkgPT4ge1xuICAgIGNvbnN0IGV4cGVjdGVkT3JkZXIgPSBbXG4gICAgICBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgIFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgIFNlbmRTdGF0dXMuU2VudCxcbiAgICAgIFNlbmRTdGF0dXMuRGVsaXZlcmVkLFxuICAgICAgU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgU2VuZFN0YXR1cy5WaWV3ZWQsXG4gICAgXTtcblxuICAgIGl0KCdyZXR1cm5zIHRoZSBpbnB1dCBpZiBhcmd1bWVudHMgYXJlIGVxdWFsJywgKCkgPT4ge1xuICAgICAgZXhwZWN0ZWRPcmRlci5mb3JFYWNoKHN0YXR1cyA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtYXhTdGF0dXMoc3RhdHVzLCBzdGF0dXMpLCBzdGF0dXMpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBpdCgnb3JkZXJzIHRoZSBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgIHRpbWVzKDEwMCwgKCkgPT4ge1xuICAgICAgICBjb25zdCBbYSwgYl0gPSBzYW1wbGVTaXplKGV4cGVjdGVkT3JkZXIsIDIpO1xuICAgICAgICBjb25zdCBpc0FCaWdnZXIgPSBleHBlY3RlZE9yZGVyLmluZGV4T2YoYSkgPiBleHBlY3RlZE9yZGVyLmluZGV4T2YoYik7XG4gICAgICAgIGNvbnN0IGV4cGVjdGVkID0gaXNBQmlnZ2VyID8gYSA6IGI7XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gbWF4U3RhdHVzKGEsIGIpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzVmlld2VkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIHZpZXdlZCBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNWaWV3ZWQoU2VuZFN0YXR1cy5WaWV3ZWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tdmlld2VkIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWaWV3ZWQoU2VuZFN0YXR1cy5SZWFkKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1ZpZXdlZChTZW5kU3RhdHVzLkRlbGl2ZXJlZCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNWaWV3ZWQoU2VuZFN0YXR1cy5TZW50KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1ZpZXdlZChTZW5kU3RhdHVzLlBlbmRpbmcpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzVmlld2VkKFNlbmRTdGF0dXMuRmFpbGVkKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdpc1JlYWQnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgcmVhZCBhbmQgdmlld2VkIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShpc1JlYWQoU2VuZFN0YXR1cy5SZWFkKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzUmVhZChTZW5kU3RhdHVzLlZpZXdlZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIG5vbi1yZWFkIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNSZWFkKFNlbmRTdGF0dXMuRGVsaXZlcmVkKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1JlYWQoU2VuZFN0YXR1cy5TZW50KSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1JlYWQoU2VuZFN0YXR1cy5QZW5kaW5nKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1JlYWQoU2VuZFN0YXR1cy5GYWlsZWQpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRGVsaXZlcmVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGRlbGl2ZXJlZCwgcmVhZCwgYW5kIHZpZXdlZCBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNEZWxpdmVyZWQoU2VuZFN0YXR1cy5EZWxpdmVyZWQpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNEZWxpdmVyZWQoU2VuZFN0YXR1cy5SZWFkKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzRGVsaXZlcmVkKFNlbmRTdGF0dXMuVmlld2VkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLWRlbGl2ZXJlZCBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRGVsaXZlcmVkKFNlbmRTdGF0dXMuU2VudCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNEZWxpdmVyZWQoU2VuZFN0YXR1cy5QZW5kaW5nKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc0RlbGl2ZXJlZChTZW5kU3RhdHVzLkZhaWxlZCkpO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNTZW50JywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGFsbCBzdGF0dXNlcyBzZW50IGFuZCBcImFib3ZlXCInLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzU2VudChTZW5kU3RhdHVzLlNlbnQpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNTZW50KFNlbmRTdGF0dXMuRGVsaXZlcmVkKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzU2VudChTZW5kU3RhdHVzLlJlYWQpKTtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNTZW50KFNlbmRTdGF0dXMuVmlld2VkKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBmYWxzZSBmb3Igbm9uLXNlbnQgc3RhdHVzZXMnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NlbnQoU2VuZFN0YXR1cy5QZW5kaW5nKSk7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc1NlbnQoU2VuZFN0YXR1cy5GYWlsZWQpKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzRmFpbGVkJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIHRydWUgZm9yIGZhaWxlZCBzdGF0dXNlcycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1RydWUoaXNGYWlsZWQoU2VuZFN0YXR1cy5GYWlsZWQpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBub24tZmFpbGVkIHN0YXR1c2VzJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNGYWlsZWQoU2VuZFN0YXR1cy5WaWV3ZWQpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRmFpbGVkKFNlbmRTdGF0dXMuUmVhZCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNGYWlsZWQoU2VuZFN0YXR1cy5EZWxpdmVyZWQpKTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKGlzRmFpbGVkKFNlbmRTdGF0dXMuU2VudCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNGYWlsZWQoU2VuZFN0YXR1cy5QZW5kaW5nKSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdzb21lU2VuZFN0YXR1cycsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBmYWxzZSBpZiB0aGVyZSBhcmUgbm8gc2VuZCBzdGF0ZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBhbHdheXNUcnVlID0gKCkgPT4gdHJ1ZTtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKHNvbWVTZW5kU3RhdHVzKHVuZGVmaW5lZCwgYWx3YXlzVHJ1ZSkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2Uoc29tZVNlbmRTdGF0dXMoe30sIGFsd2F5c1RydWUpKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIG5vIHNlbmQgc3RhdGVzIG1hdGNoJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZDogU2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCA9IHtcbiAgICAgICAgYWJjOiB7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgdXBkYXRlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICB9LFxuICAgICAgICBkZWY6IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUmVhZCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICB9O1xuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgc29tZVNlbmRTdGF0dXMoXG4gICAgICAgICAgc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAoc3RhdHVzOiBTZW5kU3RhdHVzKSA9PiBzdGF0dXMgPT09IFNlbmRTdGF0dXMuRGVsaXZlcmVkXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyB0cnVlIGlmIGF0IGxlYXN0IG9uZSBzZW5kIHN0YXRlIG1hdGNoZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBzZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkOiBTZW5kU3RhdGVCeUNvbnZlcnNhdGlvbklkID0ge1xuICAgICAgICBhYmM6IHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IERhdGUubm93KCksXG4gICAgICAgIH0sXG4gICAgICAgIGRlZjoge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIHNvbWVTZW5kU3RhdHVzKFxuICAgICAgICAgIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgKHN0YXR1czogU2VuZFN0YXR1cykgPT4gc3RhdHVzID09PSBTZW5kU3RhdHVzLlJlYWRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2lzTWVzc2FnZUp1c3RGb3JNZScsICgpID0+IHtcbiAgICBjb25zdCBvdXJDb252ZXJzYXRpb25JZCA9IHV1aWQoKTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBjb252ZXJzYXRpb24gaGFzIGFuIGVtcHR5IHNlbmQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShpc01lc3NhZ2VKdXN0Rm9yTWUodW5kZWZpbmVkLCBvdXJDb252ZXJzYXRpb25JZCkpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNNZXNzYWdlSnVzdEZvck1lKHt9LCBvdXJDb252ZXJzYXRpb25JZCkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIG1lc3NhZ2UgaXMgZm9yIGFueW9uZSBlbHNlJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoXG4gICAgICAgIGlzTWVzc2FnZUp1c3RGb3JNZShcbiAgICAgICAgICB7XG4gICAgICAgICAgICBbb3VyQ29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgICAgICB1cGRhdGVkQXQ6IDEyMyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBbdXVpZCgpXToge1xuICAgICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICAgICAgdXBkYXRlZEF0OiAxMjMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIC8vIFRoaXMgaXMgYW4gaW52YWxpZCBzdGF0ZSwgYnV0IHdlIHN0aWxsIHdhbnQgdG8gdGVzdCB0aGUgYmVoYXZpb3IuXG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNNZXNzYWdlSnVzdEZvck1lKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFt1dWlkKCldOiB7XG4gICAgICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgICAgICB1cGRhdGVkQXQ6IDEyMyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBvdXJDb252ZXJzYXRpb25JZFxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgbWVzc2FnZSBpcyBqdXN0IGZvciB5b3UnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBpc01lc3NhZ2VKdXN0Rm9yTWUoXG4gICAgICAgICAge1xuICAgICAgICAgICAgW291ckNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICAgICAgdXBkYXRlZEF0OiAxMjMsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgb3VyQ29udmVyc2F0aW9uSWRcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBtZXNzYWdlIGlzIGZvciB5b3UgYnV0IHdlIGhhdmUgbm8gY29udmVyc2F0aW9uSWQnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgaXNNZXNzYWdlSnVzdEZvck1lKFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIFtvdXJDb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgICAgIHVwZGF0ZWRBdDogMTIzLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIHVuZGVmaW5lZFxuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnc2VuZFN0YXRlUmVkdWNlcicsICgpID0+IHtcbiAgICBjb25zdCBhc3NlcnRUcmFuc2l0aW9uID0gKFxuICAgICAgc3RhcnRTdGF0dXM6IFNlbmRTdGF0dXMsXG4gICAgICBhY3Rpb25UeXBlOiBTZW5kQWN0aW9uVHlwZSxcbiAgICAgIGV4cGVjdGVkU3RhdHVzOiBTZW5kU3RhdHVzXG4gICAgKTogdm9pZCA9PiB7XG4gICAgICBjb25zdCBzdGFydFN0YXRlOiBTZW5kU3RhdGUgPSB7XG4gICAgICAgIHN0YXR1czogc3RhcnRTdGF0dXMsXG4gICAgICAgIHVwZGF0ZWRBdDogMSxcbiAgICAgIH07XG4gICAgICBjb25zdCBhY3Rpb246IFNlbmRBY3Rpb24gPSB7XG4gICAgICAgIHR5cGU6IGFjdGlvblR5cGUsXG4gICAgICAgIHVwZGF0ZWRBdDogMixcbiAgICAgIH07XG4gICAgICBjb25zdCByZXN1bHQgPSBzZW5kU3RhdGVSZWR1Y2VyKHN0YXJ0U3RhdGUsIGFjdGlvbik7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LnN0YXR1cywgZXhwZWN0ZWRTdGF0dXMpO1xuICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICByZXN1bHQudXBkYXRlZEF0LFxuICAgICAgICBzdGFydFN0YXR1cyA9PT0gZXhwZWN0ZWRTdGF0dXMgPyAxIDogMlxuICAgICAgKTtcbiAgICB9O1xuXG4gICAgZGVzY3JpYmUoJ3RyYW5zaXRpb25zIGZyb20gUGVuZGluZycsICgpID0+IHtcbiAgICAgIGl0KCdnb2VzIGZyb20gUGVuZGluZyBcdTIxOTIgRmFpbGVkIHdpdGggYSBmYWlsdXJlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSBzZW5kU3RhdGVSZWR1Y2VyKFxuICAgICAgICAgIHsgc3RhdHVzOiBTZW5kU3RhdHVzLlBlbmRpbmcsIHVwZGF0ZWRBdDogOTk5IH0sXG4gICAgICAgICAgeyB0eXBlOiBTZW5kQWN0aW9uVHlwZS5GYWlsZWQsIHVwZGF0ZWRBdDogMTIzIH1cbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHtcbiAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuRmFpbGVkLFxuICAgICAgICAgIHVwZGF0ZWRBdDogMTIzLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gcmVjZWl2aW5nIE1hbnVhbGx5UmV0cmllZCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuTWFudWFsbHlSZXRyaWVkLFxuICAgICAgICAgIFNlbmRTdGF0dXMuUGVuZGluZ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdnb2VzIGZyb20gUGVuZGluZyB0byBhbGwgb3RoZXIgc2VudCBzdGF0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5TZW50XG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdERlbGl2ZXJ5UmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLkRlbGl2ZXJlZFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFxuICAgICAgICAgIFNlbmRTdGF0dXMuUGVuZGluZyxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlJlYWRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuR290Vmlld2VkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlZpZXdlZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJhbnNpdGlvbnMgZnJvbSBGYWlsZWQnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gcmVjZWl2aW5nIGEgRmFpbGVkIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gc2VuZFN0YXRlUmVkdWNlcihcbiAgICAgICAgICB7XG4gICAgICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuRmFpbGVkLFxuICAgICAgICAgICAgdXBkYXRlZEF0OiAxMjMsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICB0eXBlOiBTZW5kQWN0aW9uVHlwZS5GYWlsZWQsXG4gICAgICAgICAgICB1cGRhdGVkQXQ6IDk5OSxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCB7XG4gICAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICB1cGRhdGVkQXQ6IDEyMyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2dvZXMgZnJvbSBGYWlsZWQgdG8gYWxsIG90aGVyIHN0YXRlcycsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5NYW51YWxseVJldHJpZWQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5QZW5kaW5nXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuU2VudCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlNlbnRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3REZWxpdmVyeVJlY2VpcHQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5EZWxpdmVyZWRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlJlYWRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3RWaWV3ZWRSZWNlaXB0LFxuICAgICAgICAgIFNlbmRTdGF0dXMuVmlld2VkXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0cmFuc2l0aW9ucyBmcm9tIFNlbnQnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gdHJ5aW5nIHRvIGdvIFwiYmFja3dhcmRzXCInLCAoKSA9PiB7XG4gICAgICAgIFtTZW5kQWN0aW9uVHlwZS5GYWlsZWQsIFNlbmRBY3Rpb25UeXBlLk1hbnVhbGx5UmV0cmllZF0uZm9yRWFjaChcbiAgICAgICAgICB0eXBlID0+IHtcbiAgICAgICAgICAgIGFzc2VydFRyYW5zaXRpb24oU2VuZFN0YXR1cy5TZW50LCB0eXBlLCBTZW5kU3RhdHVzLlNlbnQpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gcmVjZWl2aW5nIGEgU2VudCBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oU2VuZFN0YXR1cy5TZW50LCBTZW5kQWN0aW9uVHlwZS5TZW50LCBTZW5kU3RhdHVzLlNlbnQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYW4gZ28gZm9yd2FyZCB0byBvdGhlciBzdGF0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5TZW50LFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdERlbGl2ZXJ5UmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLkRlbGl2ZXJlZFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFxuICAgICAgICAgIFNlbmRTdGF0dXMuU2VudCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlJlYWRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0VHJhbnNpdGlvbihcbiAgICAgICAgICBTZW5kU3RhdHVzLlNlbnQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuR290Vmlld2VkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlZpZXdlZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJhbnNpdGlvbnMgZnJvbSBEZWxpdmVyZWQnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gdHJ5aW5nIHRvIGdvIFwiYmFja3dhcmRzXCInLCAoKSA9PiB7XG4gICAgICAgIFtcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5GYWlsZWQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuTWFudWFsbHlSZXRyaWVkLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgIF0uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFNlbmRTdGF0dXMuRGVsaXZlcmVkLCB0eXBlLCBTZW5kU3RhdHVzLkRlbGl2ZXJlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgd2hlbiByZWNlaXZpbmcgYSBkZWxpdmVyeSByZWNlaXB0JywgKCkgPT4ge1xuICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFxuICAgICAgICAgIFNlbmRTdGF0dXMuRGVsaXZlcmVkLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdERlbGl2ZXJ5UmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLkRlbGl2ZXJlZFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYW4gZ28gZm9yd2FyZCB0byBvdGhlciBzdGF0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuR290UmVhZFJlY2VpcHQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5SZWFkXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuR290Vmlld2VkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlZpZXdlZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndHJhbnNpdGlvbnMgZnJvbSBSZWFkJywgKCkgPT4ge1xuICAgICAgaXQoJ2RvZXMgbm90aGluZyB3aGVuIHRyeWluZyB0byBnbyBcImJhY2t3YXJkc1wiJywgKCkgPT4ge1xuICAgICAgICBbXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuRmFpbGVkLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLk1hbnVhbGx5UmV0cmllZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5TZW50LFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdERlbGl2ZXJ5UmVjZWlwdCxcbiAgICAgICAgXS5mb3JFYWNoKHR5cGUgPT4ge1xuICAgICAgICAgIGFzc2VydFRyYW5zaXRpb24oU2VuZFN0YXR1cy5SZWFkLCB0eXBlLCBTZW5kU3RhdHVzLlJlYWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdoZW4gcmVjZWl2aW5nIGEgcmVhZCByZWNlaXB0JywgKCkgPT4ge1xuICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFxuICAgICAgICAgIFNlbmRTdGF0dXMuUmVhZCxcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdCxcbiAgICAgICAgICBTZW5kU3RhdHVzLlJlYWRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2FuIGdvIGZvcndhcmQgdG8gdGhlIFwidmlld2VkXCIgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydFRyYW5zaXRpb24oXG4gICAgICAgICAgU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHQsXG4gICAgICAgICAgU2VuZFN0YXR1cy5WaWV3ZWRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3RyYW5zaXRpb25zIGZyb20gVmlld2VkJywgKCkgPT4ge1xuICAgICAgaXQoJ2lnbm9yZXMgYWxsIGFjdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIFtcbiAgICAgICAgICBTZW5kQWN0aW9uVHlwZS5GYWlsZWQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuTWFudWFsbHlSZXRyaWVkLFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgICAgU2VuZEFjdGlvblR5cGUuR290RGVsaXZlcnlSZWNlaXB0LFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdFJlYWRSZWNlaXB0LFxuICAgICAgICAgIFNlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHQsXG4gICAgICAgIF0uZm9yRWFjaCh0eXBlID0+IHtcbiAgICAgICAgICBhc3NlcnRUcmFuc2l0aW9uKFNlbmRTdGF0dXMuVmlld2VkLCB0eXBlLCBTZW5kU3RhdHVzLlZpZXdlZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnbGVnYWN5IHRyYW5zaXRpb25zJywgKCkgPT4ge1xuICAgICAgaXQoJ2FsbG93cyBhY3Rpb25zIHdpdGhvdXQgdGltZXN0YW1wcycsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhcnRTdGF0ZTogU2VuZFN0YXRlID0ge1xuICAgICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgICAgIHVwZGF0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uOiBTZW5kQWN0aW9uID0ge1xuICAgICAgICAgIHR5cGU6IFNlbmRBY3Rpb25UeXBlLlNlbnQsXG4gICAgICAgICAgdXBkYXRlZEF0OiB1bmRlZmluZWQsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHNlbmRTdGF0ZVJlZHVjZXIoc3RhcnRTdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC51cGRhdGVkQXQpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUN2QixvQkFBa0M7QUFDbEMsa0JBQTJCO0FBTzNCLDhCQVlPO0FBRVAsU0FBUyxnQ0FBZ0MsTUFBTTtBQUM3QyxXQUFTLGFBQWEsTUFBTTtBQUMxQixVQUFNLGdCQUFnQjtBQUFBLE1BQ3BCLG1DQUFXO0FBQUEsTUFDWCxtQ0FBVztBQUFBLE1BQ1gsbUNBQVc7QUFBQSxNQUNYLG1DQUFXO0FBQUEsTUFDWCxtQ0FBVztBQUFBLE1BQ1gsbUNBQVc7QUFBQSxJQUNiO0FBRUEsT0FBRyw0Q0FBNEMsTUFBTTtBQUNuRCxvQkFBYyxRQUFRLFlBQVU7QUFDOUIsMkJBQU8sWUFBWSx1Q0FBVSxRQUFRLE1BQU0sR0FBRyxNQUFNO0FBQUEsTUFDdEQsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELE9BQUcsdUJBQXVCLE1BQU07QUFDOUIsK0JBQU0sS0FBSyxNQUFNO0FBQ2YsY0FBTSxDQUFDLEdBQUcsS0FBSyw4QkFBVyxlQUFlLENBQUM7QUFDMUMsY0FBTSxZQUFZLGNBQWMsUUFBUSxDQUFDLElBQUksY0FBYyxRQUFRLENBQUM7QUFDcEUsY0FBTSxXQUFXLFlBQVksSUFBSTtBQUVq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
