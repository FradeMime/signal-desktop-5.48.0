var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_sendToGroup = require("../../util/sendToGroup");
var import_Errors = require("../../textsecure/Errors");
describe("sendToGroup", () => {
  describe("#_analyzeSenderKeyDevices", () => {
    function getDefaultDeviceList() {
      return [
        {
          identifier: "ident-guid-one",
          id: 1,
          registrationId: 11
        },
        {
          identifier: "ident-guid-one",
          id: 2,
          registrationId: 22
        },
        {
          identifier: "ident-guid-two",
          id: 2,
          registrationId: 33
        }
      ];
    }
    it("returns nothing if new and previous lists are the same", () => {
      const memberDevices = getDefaultDeviceList();
      const devicesForSend = getDefaultDeviceList();
      const {
        newToMemberDevices,
        newToMemberUuids,
        removedFromMemberDevices,
        removedFromMemberUuids
      } = (0, import_sendToGroup._analyzeSenderKeyDevices)(memberDevices, devicesForSend);
      import_chai.assert.isEmpty(newToMemberDevices);
      import_chai.assert.isEmpty(newToMemberUuids);
      import_chai.assert.isEmpty(removedFromMemberDevices);
      import_chai.assert.isEmpty(removedFromMemberUuids);
    });
    it("returns set of new devices", () => {
      const memberDevices = getDefaultDeviceList();
      const devicesForSend = getDefaultDeviceList();
      memberDevices.pop();
      memberDevices.pop();
      const {
        newToMemberDevices,
        newToMemberUuids,
        removedFromMemberDevices,
        removedFromMemberUuids
      } = (0, import_sendToGroup._analyzeSenderKeyDevices)(memberDevices, devicesForSend);
      import_chai.assert.deepEqual(newToMemberDevices, [
        {
          identifier: "ident-guid-one",
          id: 2,
          registrationId: 22
        },
        {
          identifier: "ident-guid-two",
          id: 2,
          registrationId: 33
        }
      ]);
      import_chai.assert.deepEqual(newToMemberUuids, ["ident-guid-one", "ident-guid-two"]);
      import_chai.assert.isEmpty(removedFromMemberDevices);
      import_chai.assert.isEmpty(removedFromMemberUuids);
    });
    it("returns set of removed devices", () => {
      const memberDevices = getDefaultDeviceList();
      const devicesForSend = getDefaultDeviceList();
      devicesForSend.pop();
      devicesForSend.pop();
      const {
        newToMemberDevices,
        newToMemberUuids,
        removedFromMemberDevices,
        removedFromMemberUuids
      } = (0, import_sendToGroup._analyzeSenderKeyDevices)(memberDevices, devicesForSend);
      import_chai.assert.isEmpty(newToMemberDevices);
      import_chai.assert.isEmpty(newToMemberUuids);
      import_chai.assert.deepEqual(removedFromMemberDevices, [
        {
          identifier: "ident-guid-one",
          id: 2,
          registrationId: 22
        },
        {
          identifier: "ident-guid-two",
          id: 2,
          registrationId: 33
        }
      ]);
      import_chai.assert.deepEqual(removedFromMemberUuids, [
        "ident-guid-one",
        "ident-guid-two"
      ]);
    });
    it("returns empty removals if partial send", () => {
      const memberDevices = getDefaultDeviceList();
      const devicesForSend = getDefaultDeviceList();
      devicesForSend.pop();
      devicesForSend.pop();
      const isPartialSend = true;
      const {
        newToMemberDevices,
        newToMemberUuids,
        removedFromMemberDevices,
        removedFromMemberUuids
      } = (0, import_sendToGroup._analyzeSenderKeyDevices)(memberDevices, devicesForSend, isPartialSend);
      import_chai.assert.isEmpty(newToMemberDevices);
      import_chai.assert.isEmpty(newToMemberUuids);
      import_chai.assert.isEmpty(removedFromMemberDevices);
      import_chai.assert.isEmpty(removedFromMemberUuids);
    });
  });
  describe("#_waitForAll", () => {
    it("returns result of provided tasks", async () => {
      const task1 = /* @__PURE__ */ __name(() => Promise.resolve(1), "task1");
      const task2 = /* @__PURE__ */ __name(() => Promise.resolve(2), "task2");
      const task3 = /* @__PURE__ */ __name(() => Promise.resolve(3), "task3");
      const result = await (0, import_sendToGroup._waitForAll)({
        tasks: [task1, task2, task3],
        maxConcurrency: 1
      });
      import_chai.assert.deepEqual(result, [1, 2, 3]);
    });
  });
  describe("#_shouldFailSend", () => {
    it("returns false for a generic error", async () => {
      const error = new Error("generic");
      import_chai.assert.isFalse((0, import_sendToGroup._shouldFailSend)(error, "testing generic"));
    });
    it("returns true for any error with 'untrusted' identity", async () => {
      const error = new Error("This was an untrusted identity.");
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(error, "logId"));
    });
    it("returns true for certain types of error subclasses", async () => {
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.OutgoingIdentityKeyError("something"), "testing OutgoingIdentityKeyError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.UnregisteredUserError("something", new import_Errors.HTTPError("something", {
        code: 400,
        headers: {}
      })), "testing UnregisteredUserError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.ConnectTimeoutError("something"), "testing ConnectTimeoutError"));
    });
    it("returns false for unspecified error codes", () => {
      const error = new Error("generic");
      error.code = 422;
      import_chai.assert.isFalse((0, import_sendToGroup._shouldFailSend)(error, "testing generic 422"));
      error.code = 204;
      import_chai.assert.isFalse((0, import_sendToGroup._shouldFailSend)(error, "testing generic 204"));
    });
    it("returns true for a specified error codes", () => {
      const error = new Error("generic");
      error.code = 401;
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(error, "testing generic"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.HTTPError("something", {
        code: 404,
        headers: {}
      }), "testing HTTPError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.OutgoingMessageError("something", null, null, new import_Errors.HTTPError("something", {
        code: 413,
        headers: {}
      })), "testing OutgoingMessageError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.OutgoingMessageError("something", null, null, new import_Errors.HTTPError("something", {
        code: 429,
        headers: {}
      })), "testing OutgoingMessageError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.SendMessageNetworkError("something", null, new import_Errors.HTTPError("something", {
        code: 428,
        headers: {}
      })), "testing SendMessageNetworkError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.SendMessageChallengeError("something", new import_Errors.HTTPError("something", {
        code: 500,
        headers: {}
      })), "testing SendMessageChallengeError"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.MessageError("something", new import_Errors.HTTPError("something", {
        code: 508,
        headers: {}
      })), "testing MessageError"));
    });
    it("returns true for errors inside of SendMessageProtoError", () => {
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.SendMessageProtoError({}), "testing missing errors list"));
      const error = new Error("generic");
      error.code = 401;
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.SendMessageProtoError({ errors: [error] }), "testing one error with code"));
      import_chai.assert.isTrue((0, import_sendToGroup._shouldFailSend)(new import_Errors.SendMessageProtoError({
        errors: [
          new Error("something"),
          new import_Errors.ConnectTimeoutError("something")
        ]
      }), "testing ConnectTimeoutError"));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2VuZFRvR3JvdXBfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcblxuaW1wb3J0IHtcbiAgX2FuYWx5emVTZW5kZXJLZXlEZXZpY2VzLFxuICBfd2FpdEZvckFsbCxcbiAgX3Nob3VsZEZhaWxTZW5kLFxufSBmcm9tICcuLi8uLi91dGlsL3NlbmRUb0dyb3VwJztcblxuaW1wb3J0IHR5cGUgeyBEZXZpY2VUeXBlIH0gZnJvbSAnLi4vLi4vdGV4dHNlY3VyZS9UeXBlcy5kJztcbmltcG9ydCB7XG4gIENvbm5lY3RUaW1lb3V0RXJyb3IsXG4gIEhUVFBFcnJvcixcbiAgTWVzc2FnZUVycm9yLFxuICBPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3IsXG4gIE91dGdvaW5nTWVzc2FnZUVycm9yLFxuICBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yLFxuICBTZW5kTWVzc2FnZU5ldHdvcmtFcnJvcixcbiAgU2VuZE1lc3NhZ2VQcm90b0Vycm9yLFxuICBVbnJlZ2lzdGVyZWRVc2VyRXJyb3IsXG59IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvRXJyb3JzJztcblxuZGVzY3JpYmUoJ3NlbmRUb0dyb3VwJywgKCkgPT4ge1xuICBkZXNjcmliZSgnI19hbmFseXplU2VuZGVyS2V5RGV2aWNlcycsICgpID0+IHtcbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0RGV2aWNlTGlzdCgpOiBBcnJheTxEZXZpY2VUeXBlPiB7XG4gICAgICByZXR1cm4gW1xuICAgICAgICB7XG4gICAgICAgICAgaWRlbnRpZmllcjogJ2lkZW50LWd1aWQtb25lJyxcbiAgICAgICAgICBpZDogMSxcbiAgICAgICAgICByZWdpc3RyYXRpb25JZDogMTEsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZGVudGlmaWVyOiAnaWRlbnQtZ3VpZC1vbmUnLFxuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAyMixcbiAgICAgICAgfSxcbiAgICAgICAge1xuICAgICAgICAgIGlkZW50aWZpZXI6ICdpZGVudC1ndWlkLXR3bycsXG4gICAgICAgICAgaWQ6IDIsXG4gICAgICAgICAgcmVnaXN0cmF0aW9uSWQ6IDMzLFxuICAgICAgICB9LFxuICAgICAgXTtcbiAgICB9XG5cbiAgICBpdCgncmV0dXJucyBub3RoaW5nIGlmIG5ldyBhbmQgcHJldmlvdXMgbGlzdHMgYXJlIHRoZSBzYW1lJywgKCkgPT4ge1xuICAgICAgY29uc3QgbWVtYmVyRGV2aWNlcyA9IGdldERlZmF1bHREZXZpY2VMaXN0KCk7XG4gICAgICBjb25zdCBkZXZpY2VzRm9yU2VuZCA9IGdldERlZmF1bHREZXZpY2VMaXN0KCk7XG5cbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbmV3VG9NZW1iZXJEZXZpY2VzLFxuICAgICAgICBuZXdUb01lbWJlclV1aWRzLFxuICAgICAgICByZW1vdmVkRnJvbU1lbWJlckRldmljZXMsXG4gICAgICAgIHJlbW92ZWRGcm9tTWVtYmVyVXVpZHMsXG4gICAgICB9ID0gX2FuYWx5emVTZW5kZXJLZXlEZXZpY2VzKG1lbWJlckRldmljZXMsIGRldmljZXNGb3JTZW5kKTtcblxuICAgICAgYXNzZXJ0LmlzRW1wdHkobmV3VG9NZW1iZXJEZXZpY2VzKTtcbiAgICAgIGFzc2VydC5pc0VtcHR5KG5ld1RvTWVtYmVyVXVpZHMpO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkocmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzKTtcbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlbW92ZWRGcm9tTWVtYmVyVXVpZHMpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIHNldCBvZiBuZXcgZGV2aWNlcycsICgpID0+IHtcbiAgICAgIGNvbnN0IG1lbWJlckRldmljZXMgPSBnZXREZWZhdWx0RGV2aWNlTGlzdCgpO1xuICAgICAgY29uc3QgZGV2aWNlc0ZvclNlbmQgPSBnZXREZWZhdWx0RGV2aWNlTGlzdCgpO1xuXG4gICAgICBtZW1iZXJEZXZpY2VzLnBvcCgpO1xuICAgICAgbWVtYmVyRGV2aWNlcy5wb3AoKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICBuZXdUb01lbWJlckRldmljZXMsXG4gICAgICAgIG5ld1RvTWVtYmVyVXVpZHMsXG4gICAgICAgIHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcyxcbiAgICAgICAgcmVtb3ZlZEZyb21NZW1iZXJVdWlkcyxcbiAgICAgIH0gPSBfYW5hbHl6ZVNlbmRlcktleURldmljZXMobWVtYmVyRGV2aWNlcywgZGV2aWNlc0ZvclNlbmQpO1xuXG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKG5ld1RvTWVtYmVyRGV2aWNlcywgW1xuICAgICAgICB7XG4gICAgICAgICAgaWRlbnRpZmllcjogJ2lkZW50LWd1aWQtb25lJyxcbiAgICAgICAgICBpZDogMixcbiAgICAgICAgICByZWdpc3RyYXRpb25JZDogMjIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZGVudGlmaWVyOiAnaWRlbnQtZ3VpZC10d28nLFxuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAzMyxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChuZXdUb01lbWJlclV1aWRzLCBbJ2lkZW50LWd1aWQtb25lJywgJ2lkZW50LWd1aWQtdHdvJ10pO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkocmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzKTtcbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlbW92ZWRGcm9tTWVtYmVyVXVpZHMpO1xuICAgIH0pO1xuICAgIGl0KCdyZXR1cm5zIHNldCBvZiByZW1vdmVkIGRldmljZXMnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJEZXZpY2VzID0gZ2V0RGVmYXVsdERldmljZUxpc3QoKTtcbiAgICAgIGNvbnN0IGRldmljZXNGb3JTZW5kID0gZ2V0RGVmYXVsdERldmljZUxpc3QoKTtcblxuICAgICAgZGV2aWNlc0ZvclNlbmQucG9wKCk7XG4gICAgICBkZXZpY2VzRm9yU2VuZC5wb3AoKTtcblxuICAgICAgY29uc3Qge1xuICAgICAgICBuZXdUb01lbWJlckRldmljZXMsXG4gICAgICAgIG5ld1RvTWVtYmVyVXVpZHMsXG4gICAgICAgIHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcyxcbiAgICAgICAgcmVtb3ZlZEZyb21NZW1iZXJVdWlkcyxcbiAgICAgIH0gPSBfYW5hbHl6ZVNlbmRlcktleURldmljZXMobWVtYmVyRGV2aWNlcywgZGV2aWNlc0ZvclNlbmQpO1xuXG4gICAgICBhc3NlcnQuaXNFbXB0eShuZXdUb01lbWJlckRldmljZXMpO1xuICAgICAgYXNzZXJ0LmlzRW1wdHkobmV3VG9NZW1iZXJVdWlkcyk7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcywgW1xuICAgICAgICB7XG4gICAgICAgICAgaWRlbnRpZmllcjogJ2lkZW50LWd1aWQtb25lJyxcbiAgICAgICAgICBpZDogMixcbiAgICAgICAgICByZWdpc3RyYXRpb25JZDogMjIsXG4gICAgICAgIH0sXG4gICAgICAgIHtcbiAgICAgICAgICBpZGVudGlmaWVyOiAnaWRlbnQtZ3VpZC10d28nLFxuICAgICAgICAgIGlkOiAyLFxuICAgICAgICAgIHJlZ2lzdHJhdGlvbklkOiAzMyxcbiAgICAgICAgfSxcbiAgICAgIF0pO1xuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZW1vdmVkRnJvbU1lbWJlclV1aWRzLCBbXG4gICAgICAgICdpZGVudC1ndWlkLW9uZScsXG4gICAgICAgICdpZGVudC1ndWlkLXR3bycsXG4gICAgICBdKTtcbiAgICB9KTtcbiAgICBpdCgncmV0dXJucyBlbXB0eSByZW1vdmFscyBpZiBwYXJ0aWFsIHNlbmQnLCAoKSA9PiB7XG4gICAgICBjb25zdCBtZW1iZXJEZXZpY2VzID0gZ2V0RGVmYXVsdERldmljZUxpc3QoKTtcbiAgICAgIGNvbnN0IGRldmljZXNGb3JTZW5kID0gZ2V0RGVmYXVsdERldmljZUxpc3QoKTtcblxuICAgICAgZGV2aWNlc0ZvclNlbmQucG9wKCk7XG4gICAgICBkZXZpY2VzRm9yU2VuZC5wb3AoKTtcblxuICAgICAgY29uc3QgaXNQYXJ0aWFsU2VuZCA9IHRydWU7XG4gICAgICBjb25zdCB7XG4gICAgICAgIG5ld1RvTWVtYmVyRGV2aWNlcyxcbiAgICAgICAgbmV3VG9NZW1iZXJVdWlkcyxcbiAgICAgICAgcmVtb3ZlZEZyb21NZW1iZXJEZXZpY2VzLFxuICAgICAgICByZW1vdmVkRnJvbU1lbWJlclV1aWRzLFxuICAgICAgfSA9IF9hbmFseXplU2VuZGVyS2V5RGV2aWNlcyhcbiAgICAgICAgbWVtYmVyRGV2aWNlcyxcbiAgICAgICAgZGV2aWNlc0ZvclNlbmQsXG4gICAgICAgIGlzUGFydGlhbFNlbmRcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc0VtcHR5KG5ld1RvTWVtYmVyRGV2aWNlcyk7XG4gICAgICBhc3NlcnQuaXNFbXB0eShuZXdUb01lbWJlclV1aWRzKTtcbiAgICAgIGFzc2VydC5pc0VtcHR5KHJlbW92ZWRGcm9tTWVtYmVyRGV2aWNlcyk7XG4gICAgICBhc3NlcnQuaXNFbXB0eShyZW1vdmVkRnJvbU1lbWJlclV1aWRzKTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJyNfd2FpdEZvckFsbCcsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyByZXN1bHQgb2YgcHJvdmlkZWQgdGFza3MnLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCB0YXNrMSA9ICgpID0+IFByb21pc2UucmVzb2x2ZSgxKTtcbiAgICAgIGNvbnN0IHRhc2syID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKDIpO1xuICAgICAgY29uc3QgdGFzazMgPSAoKSA9PiBQcm9taXNlLnJlc29sdmUoMyk7XG5cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IF93YWl0Rm9yQWxsKHtcbiAgICAgICAgdGFza3M6IFt0YXNrMSwgdGFzazIsIHRhc2szXSxcbiAgICAgICAgbWF4Q29uY3VycmVuY3k6IDEsXG4gICAgICB9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIFsxLCAyLCAzXSk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCcjX3Nob3VsZEZhaWxTZW5kJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGZhbHNlIGZvciBhIGdlbmVyaWMgZXJyb3InLCBhc3luYyAoKSA9PiB7XG4gICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignZ2VuZXJpYycpO1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoX3Nob3VsZEZhaWxTZW5kKGVycm9yLCAndGVzdGluZyBnZW5lcmljJykpO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIHRydWUgZm9yIGFueSBlcnJvciB3aXRoICd1bnRydXN0ZWQnIGlkZW50aXR5XCIsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdUaGlzIHdhcyBhbiB1bnRydXN0ZWQgaWRlbnRpdHkuJyk7XG4gICAgICBhc3NlcnQuaXNUcnVlKF9zaG91bGRGYWlsU2VuZChlcnJvciwgJ2xvZ0lkJykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgY2VydGFpbiB0eXBlcyBvZiBlcnJvciBzdWJjbGFzc2VzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgX3Nob3VsZEZhaWxTZW5kKFxuICAgICAgICAgIG5ldyBPdXRnb2luZ0lkZW50aXR5S2V5RXJyb3IoJ3NvbWV0aGluZycpLFxuICAgICAgICAgICd0ZXN0aW5nIE91dGdvaW5nSWRlbnRpdHlLZXlFcnJvcidcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIF9zaG91bGRGYWlsU2VuZChcbiAgICAgICAgICBuZXcgVW5yZWdpc3RlcmVkVXNlckVycm9yKFxuICAgICAgICAgICAgJ3NvbWV0aGluZycsXG4gICAgICAgICAgICBuZXcgSFRUUEVycm9yKCdzb21ldGhpbmcnLCB7XG4gICAgICAgICAgICAgIGNvZGU6IDQwMCxcbiAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgJ3Rlc3RpbmcgVW5yZWdpc3RlcmVkVXNlckVycm9yJ1xuICAgICAgICApXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgX3Nob3VsZEZhaWxTZW5kKFxuICAgICAgICAgIG5ldyBDb25uZWN0VGltZW91dEVycm9yKCdzb21ldGhpbmcnKSxcbiAgICAgICAgICAndGVzdGluZyBDb25uZWN0VGltZW91dEVycm9yJ1xuICAgICAgICApXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgZmFsc2UgZm9yIHVuc3BlY2lmaWVkIGVycm9yIGNvZGVzJywgKCkgPT4ge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoJ2dlbmVyaWMnKTtcblxuICAgICAgZXJyb3IuY29kZSA9IDQyMjtcbiAgICAgIGFzc2VydC5pc0ZhbHNlKF9zaG91bGRGYWlsU2VuZChlcnJvciwgJ3Rlc3RpbmcgZ2VuZXJpYyA0MjInKSk7XG5cbiAgICAgIGVycm9yLmNvZGUgPSAyMDQ7XG4gICAgICBhc3NlcnQuaXNGYWxzZShfc2hvdWxkRmFpbFNlbmQoZXJyb3IsICd0ZXN0aW5nIGdlbmVyaWMgMjA0JykpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgYSBzcGVjaWZpZWQgZXJyb3IgY29kZXMnLCAoKSA9PiB7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgY29uc3QgZXJyb3I6IGFueSA9IG5ldyBFcnJvcignZ2VuZXJpYycpO1xuICAgICAgZXJyb3IuY29kZSA9IDQwMTtcblxuICAgICAgYXNzZXJ0LmlzVHJ1ZShfc2hvdWxkRmFpbFNlbmQoZXJyb3IsICd0ZXN0aW5nIGdlbmVyaWMnKSk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBfc2hvdWxkRmFpbFNlbmQoXG4gICAgICAgICAgbmV3IEhUVFBFcnJvcignc29tZXRoaW5nJywge1xuICAgICAgICAgICAgY29kZTogNDA0LFxuICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgfSksXG4gICAgICAgICAgJ3Rlc3RpbmcgSFRUUEVycm9yJ1xuICAgICAgICApXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgX3Nob3VsZEZhaWxTZW5kKFxuICAgICAgICAgIG5ldyBPdXRnb2luZ01lc3NhZ2VFcnJvcihcbiAgICAgICAgICAgICdzb21ldGhpbmcnLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBuZXcgSFRUUEVycm9yKCdzb21ldGhpbmcnLCB7XG4gICAgICAgICAgICAgIGNvZGU6IDQxMyxcbiAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgJ3Rlc3RpbmcgT3V0Z29pbmdNZXNzYWdlRXJyb3InXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBfc2hvdWxkRmFpbFNlbmQoXG4gICAgICAgICAgbmV3IE91dGdvaW5nTWVzc2FnZUVycm9yKFxuICAgICAgICAgICAgJ3NvbWV0aGluZycsXG4gICAgICAgICAgICBudWxsLFxuICAgICAgICAgICAgbnVsbCxcbiAgICAgICAgICAgIG5ldyBIVFRQRXJyb3IoJ3NvbWV0aGluZycsIHtcbiAgICAgICAgICAgICAgY29kZTogNDI5LFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICAndGVzdGluZyBPdXRnb2luZ01lc3NhZ2VFcnJvcidcbiAgICAgICAgKVxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIF9zaG91bGRGYWlsU2VuZChcbiAgICAgICAgICBuZXcgU2VuZE1lc3NhZ2VOZXR3b3JrRXJyb3IoXG4gICAgICAgICAgICAnc29tZXRoaW5nJyxcbiAgICAgICAgICAgIG51bGwsXG4gICAgICAgICAgICBuZXcgSFRUUEVycm9yKCdzb21ldGhpbmcnLCB7XG4gICAgICAgICAgICAgIGNvZGU6IDQyOCxcbiAgICAgICAgICAgICAgaGVhZGVyczoge30sXG4gICAgICAgICAgICB9KVxuICAgICAgICAgICksXG4gICAgICAgICAgJ3Rlc3RpbmcgU2VuZE1lc3NhZ2VOZXR3b3JrRXJyb3InXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBfc2hvdWxkRmFpbFNlbmQoXG4gICAgICAgICAgbmV3IFNlbmRNZXNzYWdlQ2hhbGxlbmdlRXJyb3IoXG4gICAgICAgICAgICAnc29tZXRoaW5nJyxcbiAgICAgICAgICAgIG5ldyBIVFRQRXJyb3IoJ3NvbWV0aGluZycsIHtcbiAgICAgICAgICAgICAgY29kZTogNTAwLFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICAndGVzdGluZyBTZW5kTWVzc2FnZUNoYWxsZW5nZUVycm9yJ1xuICAgICAgICApXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgX3Nob3VsZEZhaWxTZW5kKFxuICAgICAgICAgIG5ldyBNZXNzYWdlRXJyb3IoXG4gICAgICAgICAgICAnc29tZXRoaW5nJyxcbiAgICAgICAgICAgIG5ldyBIVFRQRXJyb3IoJ3NvbWV0aGluZycsIHtcbiAgICAgICAgICAgICAgY29kZTogNTA4LFxuICAgICAgICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgKSxcbiAgICAgICAgICAndGVzdGluZyBNZXNzYWdlRXJyb3InXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gICAgaXQoJ3JldHVybnMgdHJ1ZSBmb3IgZXJyb3JzIGluc2lkZSBvZiBTZW5kTWVzc2FnZVByb3RvRXJyb3InLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICBfc2hvdWxkRmFpbFNlbmQoXG4gICAgICAgICAgbmV3IFNlbmRNZXNzYWdlUHJvdG9FcnJvcih7fSksXG4gICAgICAgICAgJ3Rlc3RpbmcgbWlzc2luZyBlcnJvcnMgbGlzdCdcbiAgICAgICAgKVxuICAgICAgKTtcblxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgICAgIGNvbnN0IGVycm9yOiBhbnkgPSBuZXcgRXJyb3IoJ2dlbmVyaWMnKTtcbiAgICAgIGVycm9yLmNvZGUgPSA0MDE7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIF9zaG91bGRGYWlsU2VuZChcbiAgICAgICAgICBuZXcgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKHsgZXJyb3JzOiBbZXJyb3JdIH0pLFxuICAgICAgICAgICd0ZXN0aW5nIG9uZSBlcnJvciB3aXRoIGNvZGUnXG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGFzc2VydC5pc1RydWUoXG4gICAgICAgIF9zaG91bGRGYWlsU2VuZChcbiAgICAgICAgICBuZXcgU2VuZE1lc3NhZ2VQcm90b0Vycm9yKHtcbiAgICAgICAgICAgIGVycm9yczogW1xuICAgICAgICAgICAgICBuZXcgRXJyb3IoJ3NvbWV0aGluZycpLFxuICAgICAgICAgICAgICBuZXcgQ29ubmVjdFRpbWVvdXRFcnJvcignc29tZXRoaW5nJyksXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgICd0ZXN0aW5nIENvbm5lY3RUaW1lb3V0RXJyb3InXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOztBQUdBLGtCQUF1QjtBQUV2Qix5QkFJTztBQUdQLG9CQVVPO0FBRVAsU0FBUyxlQUFlLE1BQU07QUFDNUIsV0FBUyw2QkFBNkIsTUFBTTtBQUMxQyxvQ0FBbUQ7QUFDakQsYUFBTztBQUFBLFFBQ0w7QUFBQSxVQUNFLFlBQVk7QUFBQSxVQUNaLElBQUk7QUFBQSxVQUNKLGdCQUFnQjtBQUFBLFFBQ2xCO0FBQUEsUUFDQTtBQUFBLFVBQ0UsWUFBWTtBQUFBLFVBQ1osSUFBSTtBQUFBLFVBQ0osZ0JBQWdCO0FBQUEsUUFDbEI7QUFBQSxRQUNBO0FBQUEsVUFDRSxZQUFZO0FBQUEsVUFDWixJQUFJO0FBQUEsVUFDSixnQkFBZ0I7QUFBQSxRQUNsQjtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBbEJTLEFBb0JULE9BQUcsMERBQTBELE1BQU07QUFDakUsWUFBTSxnQkFBZ0IscUJBQXFCO0FBQzNDLFlBQU0saUJBQWlCLHFCQUFxQjtBQUU1QyxZQUFNO0FBQUEsUUFDSjtBQUFBLFFBQ0E7QUFBQSxRQUNBO0FBQUEsUUFDQTtBQUFBLFVBQ0UsaURBQXlCLGVBQWUsY0FBYztBQUUxRCx5QkFBTyxRQUFRLGtCQUFrQjtBQUNqQyx5QkFBTyxRQUFRLGdCQUFnQjtBQUMvQix5QkFBTyxRQUFRLHdCQUF3QjtBQUN2Qyx5QkFBTyxRQUFRLHNCQUFzQjtBQUFBLElBQ3ZDLENBQUM7QUFDRCxPQUFHLDhCQUE4QixNQUFNO0FBQ3JDLFlBQU0sZ0JBQWdCLHFCQUFxQjtBQUMzQyxZQUFNLGlCQUFpQixxQkFBcUI7QUFFNUMsb0JBQWMsSUFBSTtBQUNsQixvQkFBYyxJQUFJO0FBRWxCLFlBQU07QUFBQSxR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
