var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_uuid = require("uuid");
var import_long = __toESM(require("long"));
var import_MessageReceiver = __toESM(require("../textsecure/MessageReceiver"));
var import_WebsocketResources = require("../textsecure/WebsocketResources");
var import_protobuf = require("../protobuf");
var Crypto = __toESM(require("../Crypto"));
describe("MessageReceiver", () => {
  const number = "+19999999999";
  const uuid = "aaaaaaaa-bbbb-4ccc-9ddd-eeeeeeeeeeee";
  const deviceId = 1;
  let oldUuid;
  let oldDeviceId;
  beforeEach(async () => {
    oldUuid = window.storage.user.getUuid()?.toString();
    oldDeviceId = window.storage.user.getDeviceId();
    await window.storage.user.setUuidAndDeviceId((0, import_uuid.v4)(), 2);
    await window.storage.protocol.hydrateCaches();
  });
  afterEach(async () => {
    if (oldUuid !== void 0 && oldDeviceId !== void 0) {
      await window.storage.user.setUuidAndDeviceId(oldUuid, oldDeviceId);
    }
    await window.storage.protocol.removeAllUnprocessed();
  });
  describe("connecting", () => {
    it("generates decryption-error event when it cannot decrypt", async () => {
      const messageReceiver = new import_MessageReceiver.default({
        server: {},
        storage: window.storage,
        serverTrustRoot: "AAAAAAAA"
      });
      const body = import_protobuf.SignalService.Envelope.encode({
        type: import_protobuf.SignalService.Envelope.Type.CIPHERTEXT,
        source: number,
        sourceUuid: uuid,
        sourceDevice: deviceId,
        timestamp: import_long.default.fromNumber(Date.now()),
        content: Crypto.getRandomBytes(200)
      }).finish();
      messageReceiver.handleRequest(new import_WebsocketResources.IncomingWebSocketRequest({
        id: import_long.default.fromNumber(1),
        verb: "PUT",
        path: "/api/v1/message",
        body,
        headers: []
      }, (_) => {
      }));
      await new Promise((resolve) => {
        messageReceiver.addEventListener("decryption-error", (error) => {
          import_chai.assert.strictEqual(error.decryptionError.senderUuid, uuid);
          import_chai.assert.strictEqual(error.decryptionError.senderDevice, deviceId);
          resolve();
        });
      });
      await messageReceiver.drain();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVJlY2VpdmVyX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE1LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZW1wdHktZnVuY3Rpb24gKi9cblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyB2NCBhcyBnZXRHdWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgTG9uZyBmcm9tICdsb25nJztcblxuaW1wb3J0IE1lc3NhZ2VSZWNlaXZlciBmcm9tICcuLi90ZXh0c2VjdXJlL01lc3NhZ2VSZWNlaXZlcic7XG5pbXBvcnQgeyBJbmNvbWluZ1dlYlNvY2tldFJlcXVlc3QgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1dlYnNvY2tldFJlc291cmNlcyc7XG5pbXBvcnQgdHlwZSB7IFdlYkFQSVR5cGUgfSBmcm9tICcuLi90ZXh0c2VjdXJlL1dlYkFQSSc7XG5pbXBvcnQgdHlwZSB7IERlY3J5cHRpb25FcnJvckV2ZW50IH0gZnJvbSAnLi4vdGV4dHNlY3VyZS9tZXNzYWdlUmVjZWl2ZXJFdmVudHMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uL3Byb3RvYnVmJztcbmltcG9ydCAqIGFzIENyeXB0byBmcm9tICcuLi9DcnlwdG8nO1xuXG5kZXNjcmliZSgnTWVzc2FnZVJlY2VpdmVyJywgKCkgPT4ge1xuICBjb25zdCBudW1iZXIgPSAnKzE5OTk5OTk5OTk5JztcbiAgY29uc3QgdXVpZCA9ICdhYWFhYWFhYS1iYmJiLTRjY2MtOWRkZC1lZWVlZWVlZWVlZWUnO1xuICBjb25zdCBkZXZpY2VJZCA9IDE7XG5cbiAgbGV0IG9sZFV1aWQ6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbGV0IG9sZERldmljZUlkOiBudW1iZXIgfCB1bmRlZmluZWQ7XG5cbiAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgb2xkVXVpZCA9IHdpbmRvdy5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICAgIG9sZERldmljZUlkID0gd2luZG93LnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpO1xuICAgIGF3YWl0IHdpbmRvdy5zdG9yYWdlLnVzZXIuc2V0VXVpZEFuZERldmljZUlkKGdldEd1aWQoKSwgMik7XG4gICAgYXdhaXQgd2luZG93LnN0b3JhZ2UucHJvdG9jb2wuaHlkcmF0ZUNhY2hlcygpO1xuICB9KTtcblxuICBhZnRlckVhY2goYXN5bmMgKCkgPT4ge1xuICAgIGlmIChvbGRVdWlkICE9PSB1bmRlZmluZWQgJiYgb2xkRGV2aWNlSWQgIT09IHVuZGVmaW5lZCkge1xuICAgICAgYXdhaXQgd2luZG93LnN0b3JhZ2UudXNlci5zZXRVdWlkQW5kRGV2aWNlSWQob2xkVXVpZCwgb2xkRGV2aWNlSWQpO1xuICAgIH1cbiAgICBhd2FpdCB3aW5kb3cuc3RvcmFnZS5wcm90b2NvbC5yZW1vdmVBbGxVbnByb2Nlc3NlZCgpO1xuICB9KTtcblxuICBkZXNjcmliZSgnY29ubmVjdGluZycsICgpID0+IHtcbiAgICBpdCgnZ2VuZXJhdGVzIGRlY3J5cHRpb24tZXJyb3IgZXZlbnQgd2hlbiBpdCBjYW5ub3QgZGVjcnlwdCcsIGFzeW5jICgpID0+IHtcbiAgICAgIGNvbnN0IG1lc3NhZ2VSZWNlaXZlciA9IG5ldyBNZXNzYWdlUmVjZWl2ZXIoe1xuICAgICAgICBzZXJ2ZXI6IHt9IGFzIFdlYkFQSVR5cGUsXG4gICAgICAgIHN0b3JhZ2U6IHdpbmRvdy5zdG9yYWdlLFxuICAgICAgICBzZXJ2ZXJUcnVzdFJvb3Q6ICdBQUFBQUFBQScsXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgYm9keSA9IFByb3RvLkVudmVsb3BlLmVuY29kZSh7XG4gICAgICAgIHR5cGU6IFByb3RvLkVudmVsb3BlLlR5cGUuQ0lQSEVSVEVYVCxcbiAgICAgICAgc291cmNlOiBudW1iZXIsXG4gICAgICAgIHNvdXJjZVV1aWQ6IHV1aWQsXG4gICAgICAgIHNvdXJjZURldmljZTogZGV2aWNlSWQsXG4gICAgICAgIHRpbWVzdGFtcDogTG9uZy5mcm9tTnVtYmVyKERhdGUubm93KCkpLFxuICAgICAgICBjb250ZW50OiBDcnlwdG8uZ2V0UmFuZG9tQnl0ZXMoMjAwKSxcbiAgICAgIH0pLmZpbmlzaCgpO1xuXG4gICAgICBtZXNzYWdlUmVjZWl2ZXIuaGFuZGxlUmVxdWVzdChcbiAgICAgICAgbmV3IEluY29taW5nV2ViU29ja2V0UmVxdWVzdChcbiAgICAgICAgICB7XG4gICAgICAgICAgICBpZDogTG9uZy5mcm9tTnVtYmVyKDEpLFxuICAgICAgICAgICAgdmVyYjogJ1BVVCcsXG4gICAgICAgICAgICBwYXRoOiAnL2FwaS92MS9tZXNzYWdlJyxcbiAgICAgICAgICAgIGJvZHksXG4gICAgICAgICAgICBoZWFkZXJzOiBbXSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIChfOiBCdWZmZXIpOiB2b2lkID0+IHt9XG4gICAgICAgIClcbiAgICAgICk7XG5cbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICBtZXNzYWdlUmVjZWl2ZXIuYWRkRXZlbnRMaXN0ZW5lcihcbiAgICAgICAgICAnZGVjcnlwdGlvbi1lcnJvcicsXG4gICAgICAgICAgKGVycm9yOiBEZWNyeXB0aW9uRXJyb3JFdmVudCkgPT4ge1xuICAgICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGVycm9yLmRlY3J5cHRpb25FcnJvci5zZW5kZXJVdWlkLCB1dWlkKTtcbiAgICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChlcnJvci5kZWNyeXB0aW9uRXJyb3Iuc2VuZGVyRGV2aWNlLCBkZXZpY2VJZCk7XG4gICAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGF3YWl0IG1lc3NhZ2VSZWNlaXZlci5kcmFpbigpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBS0Esa0JBQXVCO0FBQ3ZCLGtCQUE4QjtBQUM5QixrQkFBaUI7QUFFakIsNkJBQTRCO0FBQzVCLGdDQUF5QztBQUd6QyxzQkFBdUM7QUFDdkMsYUFBd0I7QUFFeEIsU0FBUyxtQkFBbUIsTUFBTTtBQUNoQyxRQUFNLFNBQVM7QUFDZixRQUFNLE9BQU87QUFDYixRQUFNLFdBQVc7QUFFakIsTUFBSTtBQUNKLE1BQUk7QUFFSixhQUFXLFlBQVk7QUFDckIsY0FBVSxPQUFPLFFBQVEsS0FBSyxRQUFRLEdBQUcsU0FBUztBQUNsRCxrQkFBYyxPQUFPLFFBQVEsS0FBSyxZQUFZO0FBQzlDLFVBQU0sT0FBTyxRQUFRLEtBQUssbUJBQW1CLG9CQUFRLEdBQUcsQ0FBQztBQUN6RCxVQUFNLE9BQU8sUUFBUSxTQUFTLGNBQWM7QUFBQSxFQUM5QyxDQUFDO0FBRUQsWUFBVSxZQUFZO0FBQ3BCLFFBQUksWUFBWSxVQUFhLGdCQUFnQixRQUFXO0FBQ3RELFlBQU0sT0FBTyxRQUFRLEtBQUssbUJBQW1CLFNBQVMsV0FBVztBQUFBLElBQ25FO0FBQ0EsVUFBTSxPQUFPLFFBQVEsU0FBUyxxQkFBcUI7QUFBQSxFQUNyRCxDQUFDO0FBRUQsV0FBUyxjQUFjLE1BQU07QUFDM0IsT0FBRywyREFBMkQsWUFBWTtBQUN4RSxZQUFNLGtCQUFrQixJQUFJLCtCQUFnQjtBQUFBLFFBQzFDLFFBQVEsQ0FBQztBQUFBLFFBQ1QsU0FBUyxPQUFPO0FBQUEsUUFDaEIsaUJBQWlCO0FBQUEsTUFDbkIsQ0FBQztBQUVELFlBQU0sT0FBTyw4QkFBTSxTQUFTLE9BQU87QUFBQSxRQUNqQyxNQUFNLDhCQUFNLFNBQVMsS0FBSztBQUFBLFFBQzFCLFFBQVE7QUFBQSxRQUNSLFlBQVk7QUFBQSxRQUNaLGNBQWM7QUFBQSxRQUNkLFdBQVcsb0JBQUssV0FBVyxLQUFLLElBQUksQ0FBQztBQUFBLFFBQ3JDLFNBQVMsT0FBTyxlQUFlLEdBQUc7QUFBQSxNQUNwQyxDQUFDLEVBQUUsT0FBTztBQUVWLHNCQUFnQixjQUNkLElBQUksbURBQ0Y7QUFBQSxRQUNFLElBQUksb0JBQUssV0FBVyxDQUFDO0FBQUEsUUFDckIsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLFFBQ047QUFBQSxRQUNBLFNBQVMsQ0FBQztBQUFBLE1BQ1osR0FDQSxDQUFDLE1BQW9CO0FBQUEsTUFBQyxDQUN4QixDQUNGO0FBRUEsWUFBTSxJQUFJLFFBQWMsYUFBVztBQUNqQyx3QkFBZ0IsaUJBQ2Qsb0JBQ0EsQ0FBQyxVQUFnQztBQUMvQiw2QkFBTyxZQUFZLE1BQU0sZ0JBQWdCLFlBQVksSUFBSTtBQUN6RCw2QkFBTyxZQUFZLE1BQU0sZ0JBQWdCLGNBQWMsUUFBUTtBQUMvRCxrQkFBUTtBQUFBLFFBQ1YsQ0FDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELFlBQU0sZ0JBQWdCLE1BQU07QUFBQSxJQUM5QixDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
