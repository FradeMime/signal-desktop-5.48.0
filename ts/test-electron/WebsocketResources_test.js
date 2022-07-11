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
var sinon = __toESM(require("sinon"));
var import_events = __toESM(require("events"));
var import_long = __toESM(require("long"));
var import_dropNull = require("../util/dropNull");
var import_protobuf = require("../protobuf");
var import_WebsocketResources = __toESM(require("../textsecure/WebsocketResources"));
describe("WebSocket-Resource", () => {
  class FakeSocket extends import_events.default {
    sendBytes(_) {
    }
    close() {
    }
  }
  const NOW = Date.now();
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.sandbox = sinon.createSandbox();
    this.clock = this.sandbox.useFakeTimers({
      now: NOW
    });
    this.sandbox.stub(window.SignalContext.timers, "setTimeout").callsFake(setTimeout);
    this.sandbox.stub(window.SignalContext.timers, "clearTimeout").callsFake(clearTimeout);
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  describe("requests and responses", () => {
    it("receives requests and sends responses", (done) => {
      const requestId = new import_long.default(3735928559, 2147483647);
      const socket = new FakeSocket();
      sinon.stub(socket, "sendBytes").callsFake((data) => {
        const message = import_protobuf.SignalService.WebSocketMessage.decode(data);
        import_chai.assert.strictEqual(message.type, import_protobuf.SignalService.WebSocketMessage.Type.RESPONSE);
        import_chai.assert.strictEqual(message.response?.message, "OK");
        import_chai.assert.strictEqual(message.response?.status, 200);
        const id = message.response?.id;
        if (import_long.default.isLong(id)) {
          (0, import_chai.assert)(id.equals(requestId));
        } else {
          (0, import_chai.assert)(false, `id should be Long, got ${id}`);
        }
        done();
      });
      new import_WebsocketResources.default(socket, {
        handleRequest(request) {
          import_chai.assert.strictEqual(request.verb, "PUT");
          import_chai.assert.strictEqual(request.path, "/some/path");
          import_chai.assert.deepEqual(request.body, new Uint8Array([1, 2, 3]));
          request.respond(200, "OK");
        }
      });
      socket.emit("message", {
        type: "binary",
        binaryData: import_protobuf.SignalService.WebSocketMessage.encode({
          type: import_protobuf.SignalService.WebSocketMessage.Type.REQUEST,
          request: {
            id: requestId,
            verb: "PUT",
            path: "/some/path",
            body: new Uint8Array([1, 2, 3])
          }
        }).finish()
      });
    });
    it("sends requests and receives responses", async () => {
      let requestId;
      const socket = new FakeSocket();
      sinon.stub(socket, "sendBytes").callsFake((data) => {
        const message2 = import_protobuf.SignalService.WebSocketMessage.decode(data);
        import_chai.assert.strictEqual(message2.type, import_protobuf.SignalService.WebSocketMessage.Type.REQUEST);
        import_chai.assert.strictEqual(message2.request?.verb, "PUT");
        import_chai.assert.strictEqual(message2.request?.path, "/some/path");
        import_chai.assert.deepEqual(message2.request?.body, new Uint8Array([1, 2, 3]));
        requestId = (0, import_dropNull.dropNull)(message2.request?.id);
      });
      const resource = new import_WebsocketResources.default(socket);
      const promise = resource.sendRequest({
        verb: "PUT",
        path: "/some/path",
        body: new Uint8Array([1, 2, 3])
      });
      socket.emit("message", {
        type: "binary",
        binaryData: import_protobuf.SignalService.WebSocketMessage.encode({
          type: import_protobuf.SignalService.WebSocketMessage.Type.RESPONSE,
          response: { id: requestId, message: "OK", status: 200 }
        }).finish()
      });
      const { status, message } = await promise;
      import_chai.assert.strictEqual(message, "OK");
      import_chai.assert.strictEqual(status, 200);
    });
  });
  describe("close", () => {
    it("closes the connection", (done) => {
      const socket = new FakeSocket();
      sinon.stub(socket, "close").callsFake(() => done());
      const resource = new import_WebsocketResources.default(socket);
      resource.close();
    });
    it("force closes the connection", function test(done) {
      const socket = new FakeSocket();
      const resource = new import_WebsocketResources.default(socket);
      resource.close();
      resource.addEventListener("close", () => done());
      this.clock.next();
    });
  });
  describe("with a keepalive config", () => {
    it("sends keepalives once a minute", function test(done) {
      const socket = new FakeSocket();
      sinon.stub(socket, "sendBytes").callsFake((data) => {
        const message = import_protobuf.SignalService.WebSocketMessage.decode(data);
        import_chai.assert.strictEqual(message.type, import_protobuf.SignalService.WebSocketMessage.Type.REQUEST);
        import_chai.assert.strictEqual(message.request?.verb, "GET");
        import_chai.assert.strictEqual(message.request?.path, "/v1/keepalive");
        done();
      });
      new import_WebsocketResources.default(socket, {
        keepalive: { path: "/v1/keepalive" }
      });
      this.clock.next();
    });
    it("uses / as a default path", function test(done) {
      const socket = new FakeSocket();
      sinon.stub(socket, "sendBytes").callsFake((data) => {
        const message = import_protobuf.SignalService.WebSocketMessage.decode(data);
        import_chai.assert.strictEqual(message.type, import_protobuf.SignalService.WebSocketMessage.Type.REQUEST);
        import_chai.assert.strictEqual(message.request?.verb, "GET");
        import_chai.assert.strictEqual(message.request?.path, "/");
        done();
      });
      new import_WebsocketResources.default(socket, {
        keepalive: true
      });
      this.clock.next();
    });
    it("optionally disconnects if no response", function thisNeeded1(done) {
      const socket = new FakeSocket();
      sinon.stub(socket, "close").callsFake(() => done());
      new import_WebsocketResources.default(socket, {
        keepalive: true
      });
      this.clock.next();
      this.clock.next();
    });
    it("optionally disconnects if suspended", function thisNeeded1(done) {
      const socket = new FakeSocket();
      sinon.stub(socket, "close").callsFake(() => done());
      new import_WebsocketResources.default(socket, {
        keepalive: true
      });
      this.clock.setSystemTime(NOW + 3600 * 1e3);
      this.clock.next();
    });
    it("allows resetting the keepalive timer", function thisNeeded2(done) {
      const startTime = Date.now();
      const socket = new FakeSocket();
      sinon.stub(socket, "sendBytes").callsFake((data) => {
        const message = import_protobuf.SignalService.WebSocketMessage.decode(data);
        import_chai.assert.strictEqual(message.type, import_protobuf.SignalService.WebSocketMessage.Type.REQUEST);
        import_chai.assert.strictEqual(message.request?.verb, "GET");
        import_chai.assert.strictEqual(message.request?.path, "/");
        import_chai.assert.strictEqual(Date.now(), startTime + 6e4, "keepalive time should be one minute");
        done();
      });
      const resource = new import_WebsocketResources.default(socket, {
        keepalive: true
      });
      setTimeout(() => {
        resource.keepalive?.reset();
      }, 5e3);
      this.clock.next();
      this.clock.next();
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2Vic29ja2V0UmVzb3VyY2VzX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE1LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZVxuICAgICBuby1uZXcsXG4gICAgIEB0eXBlc2NyaXB0LWVzbGludC9uby1lbXB0eS1mdW5jdGlvbixcbiAgICAgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAqL1xuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcbmltcG9ydCBFdmVudEVtaXR0ZXIgZnJvbSAnZXZlbnRzJztcbmltcG9ydCB0eXBlIHsgY29ubmVjdGlvbiBhcyBXZWJTb2NrZXQgfSBmcm9tICd3ZWJzb2NrZXQnO1xuaW1wb3J0IExvbmcgZnJvbSAnbG9uZyc7XG5cbmltcG9ydCB7IGRyb3BOdWxsIH0gZnJvbSAnLi4vdXRpbC9kcm9wTnVsbCc7XG5pbXBvcnQgeyBTaWduYWxTZXJ2aWNlIGFzIFByb3RvIH0gZnJvbSAnLi4vcHJvdG9idWYnO1xuXG5pbXBvcnQgV2ViU29ja2V0UmVzb3VyY2UgZnJvbSAnLi4vdGV4dHNlY3VyZS9XZWJzb2NrZXRSZXNvdXJjZXMnO1xuXG5kZXNjcmliZSgnV2ViU29ja2V0LVJlc291cmNlJywgKCkgPT4ge1xuICBjbGFzcyBGYWtlU29ja2V0IGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgICBwdWJsaWMgc2VuZEJ5dGVzKF86IFVpbnQ4QXJyYXkpIHt9XG5cbiAgICBwdWJsaWMgY2xvc2UoKSB7fVxuICB9XG5cbiAgY29uc3QgTk9XID0gRGF0ZS5ub3coKTtcblxuICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgdGhpcy5zYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCgpO1xuICAgIHRoaXMuY2xvY2sgPSB0aGlzLnNhbmRib3gudXNlRmFrZVRpbWVycyh7XG4gICAgICBub3c6IE5PVyxcbiAgICB9KTtcbiAgICB0aGlzLnNhbmRib3hcbiAgICAgIC5zdHViKHdpbmRvdy5TaWduYWxDb250ZXh0LnRpbWVycywgJ3NldFRpbWVvdXQnKVxuICAgICAgLmNhbGxzRmFrZShzZXRUaW1lb3V0KTtcbiAgICB0aGlzLnNhbmRib3hcbiAgICAgIC5zdHViKHdpbmRvdy5TaWduYWxDb250ZXh0LnRpbWVycywgJ2NsZWFyVGltZW91dCcpXG4gICAgICAuY2FsbHNGYWtlKGNsZWFyVGltZW91dCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbiBhZnRlckVhY2goKSB7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3JlcXVlc3RzIGFuZCByZXNwb25zZXMnLCAoKSA9PiB7XG4gICAgaXQoJ3JlY2VpdmVzIHJlcXVlc3RzIGFuZCBzZW5kcyByZXNwb25zZXMnLCBkb25lID0+IHtcbiAgICAgIC8vIG1vY2sgc29ja2V0XG4gICAgICBjb25zdCByZXF1ZXN0SWQgPSBuZXcgTG9uZygweGRlYWRiZWVmLCAweDdmZmZmZmZmKTtcbiAgICAgIGNvbnN0IHNvY2tldCA9IG5ldyBGYWtlU29ja2V0KCk7XG5cbiAgICAgIHNpbm9uLnN0dWIoc29ja2V0LCAnc2VuZEJ5dGVzJykuY2FsbHNGYWtlKChkYXRhOiBVaW50OEFycmF5KSA9PiB7XG4gICAgICAgIGNvbnN0IG1lc3NhZ2UgPSBQcm90by5XZWJTb2NrZXRNZXNzYWdlLmRlY29kZShkYXRhKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UudHlwZSwgUHJvdG8uV2ViU29ja2V0TWVzc2FnZS5UeXBlLlJFU1BPTlNFKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UucmVzcG9uc2U/Lm1lc3NhZ2UsICdPSycpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZS5yZXNwb25zZT8uc3RhdHVzLCAyMDApO1xuICAgICAgICBjb25zdCBpZCA9IG1lc3NhZ2UucmVzcG9uc2U/LmlkO1xuXG4gICAgICAgIGlmIChMb25nLmlzTG9uZyhpZCkpIHtcbiAgICAgICAgICBhc3NlcnQoaWQuZXF1YWxzKHJlcXVlc3RJZCkpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFzc2VydChmYWxzZSwgYGlkIHNob3VsZCBiZSBMb25nLCBnb3QgJHtpZH1gKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGRvbmUoKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhY3R1YWwgdGVzdFxuICAgICAgbmV3IFdlYlNvY2tldFJlc291cmNlKHNvY2tldCBhcyBXZWJTb2NrZXQsIHtcbiAgICAgICAgaGFuZGxlUmVxdWVzdChyZXF1ZXN0OiBhbnkpIHtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVxdWVzdC52ZXJiLCAnUFVUJyk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlcXVlc3QucGF0aCwgJy9zb21lL3BhdGgnKTtcbiAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlcXVlc3QuYm9keSwgbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKSk7XG4gICAgICAgICAgcmVxdWVzdC5yZXNwb25kKDIwMCwgJ09LJyk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcblxuICAgICAgLy8gbW9jayBzb2NrZXQgcmVxdWVzdFxuICAgICAgc29ja2V0LmVtaXQoJ21lc3NhZ2UnLCB7XG4gICAgICAgIHR5cGU6ICdiaW5hcnknLFxuICAgICAgICBiaW5hcnlEYXRhOiBQcm90by5XZWJTb2NrZXRNZXNzYWdlLmVuY29kZSh7XG4gICAgICAgICAgdHlwZTogUHJvdG8uV2ViU29ja2V0TWVzc2FnZS5UeXBlLlJFUVVFU1QsXG4gICAgICAgICAgcmVxdWVzdDoge1xuICAgICAgICAgICAgaWQ6IHJlcXVlc3RJZCxcbiAgICAgICAgICAgIHZlcmI6ICdQVVQnLFxuICAgICAgICAgICAgcGF0aDogJy9zb21lL3BhdGgnLFxuICAgICAgICAgICAgYm9keTogbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9KS5maW5pc2goKSxcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgaXQoJ3NlbmRzIHJlcXVlc3RzIGFuZCByZWNlaXZlcyByZXNwb25zZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgICAvLyBtb2NrIHNvY2tldCBhbmQgcmVxdWVzdCBoYW5kbGVyXG4gICAgICBsZXQgcmVxdWVzdElkOiBMb25nIHwgdW5kZWZpbmVkO1xuICAgICAgY29uc3Qgc29ja2V0ID0gbmV3IEZha2VTb2NrZXQoKTtcblxuICAgICAgc2lub24uc3R1Yihzb2NrZXQsICdzZW5kQnl0ZXMnKS5jYWxsc0Zha2UoKGRhdGE6IFVpbnQ4QXJyYXkpID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFByb3RvLldlYlNvY2tldE1lc3NhZ2UuZGVjb2RlKGRhdGEpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZS50eXBlLCBQcm90by5XZWJTb2NrZXRNZXNzYWdlLlR5cGUuUkVRVUVTVCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlLnJlcXVlc3Q/LnZlcmIsICdQVVQnKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UucmVxdWVzdD8ucGF0aCwgJy9zb21lL3BhdGgnKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChtZXNzYWdlLnJlcXVlc3Q/LmJvZHksIG5ldyBVaW50OEFycmF5KFsxLCAyLCAzXSkpO1xuICAgICAgICByZXF1ZXN0SWQgPSBkcm9wTnVsbChtZXNzYWdlLnJlcXVlc3Q/LmlkKTtcbiAgICAgIH0pO1xuXG4gICAgICAvLyBhY3R1YWwgdGVzdFxuICAgICAgY29uc3QgcmVzb3VyY2UgPSBuZXcgV2ViU29ja2V0UmVzb3VyY2Uoc29ja2V0IGFzIFdlYlNvY2tldCk7XG4gICAgICBjb25zdCBwcm9taXNlID0gcmVzb3VyY2Uuc2VuZFJlcXVlc3Qoe1xuICAgICAgICB2ZXJiOiAnUFVUJyxcbiAgICAgICAgcGF0aDogJy9zb21lL3BhdGgnLFxuICAgICAgICBib2R5OiBuZXcgVWludDhBcnJheShbMSwgMiwgM10pLFxuICAgICAgfSk7XG5cbiAgICAgIC8vIG1vY2sgc29ja2V0IHJlc3BvbnNlXG4gICAgICBzb2NrZXQuZW1pdCgnbWVzc2FnZScsIHtcbiAgICAgICAgdHlwZTogJ2JpbmFyeScsXG4gICAgICAgIGJpbmFyeURhdGE6IFByb3RvLldlYlNvY2tldE1lc3NhZ2UuZW5jb2RlKHtcbiAgICAgICAgICB0eXBlOiBQcm90by5XZWJTb2NrZXRNZXNzYWdlLlR5cGUuUkVTUE9OU0UsXG4gICAgICAgICAgcmVzcG9uc2U6IHsgaWQ6IHJlcXVlc3RJZCwgbWVzc2FnZTogJ09LJywgc3RhdHVzOiAyMDAgfSxcbiAgICAgICAgfSkuZmluaXNoKCksXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgeyBzdGF0dXMsIG1lc3NhZ2UgfSA9IGF3YWl0IHByb21pc2U7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZSwgJ09LJyk7XG4gICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3RhdHVzLCAyMDApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnY2xvc2UnLCAoKSA9PiB7XG4gICAgaXQoJ2Nsb3NlcyB0aGUgY29ubmVjdGlvbicsIGRvbmUgPT4ge1xuICAgICAgY29uc3Qgc29ja2V0ID0gbmV3IEZha2VTb2NrZXQoKTtcblxuICAgICAgc2lub24uc3R1Yihzb2NrZXQsICdjbG9zZScpLmNhbGxzRmFrZSgoKSA9PiBkb25lKCkpO1xuXG4gICAgICBjb25zdCByZXNvdXJjZSA9IG5ldyBXZWJTb2NrZXRSZXNvdXJjZShzb2NrZXQgYXMgV2ViU29ja2V0KTtcbiAgICAgIHJlc291cmNlLmNsb3NlKCk7XG4gICAgfSk7XG5cbiAgICBpdCgnZm9yY2UgY2xvc2VzIHRoZSBjb25uZWN0aW9uJywgZnVuY3Rpb24gdGVzdChkb25lKSB7XG4gICAgICBjb25zdCBzb2NrZXQgPSBuZXcgRmFrZVNvY2tldCgpO1xuXG4gICAgICBjb25zdCByZXNvdXJjZSA9IG5ldyBXZWJTb2NrZXRSZXNvdXJjZShzb2NrZXQgYXMgV2ViU29ja2V0KTtcbiAgICAgIHJlc291cmNlLmNsb3NlKCk7XG5cbiAgICAgIHJlc291cmNlLmFkZEV2ZW50TGlzdGVuZXIoJ2Nsb3NlJywgKCkgPT4gZG9uZSgpKTtcblxuICAgICAgLy8gV2FpdCA1IHNlY29uZHMgdG8gZm9yY2VmdWxseSBjbG9zZSB0aGUgY29ubmVjdGlvblxuICAgICAgdGhpcy5jbG9jay5uZXh0KCk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCd3aXRoIGEga2VlcGFsaXZlIGNvbmZpZycsICgpID0+IHtcbiAgICBpdCgnc2VuZHMga2VlcGFsaXZlcyBvbmNlIGEgbWludXRlJywgZnVuY3Rpb24gdGVzdChkb25lKSB7XG4gICAgICBjb25zdCBzb2NrZXQgPSBuZXcgRmFrZVNvY2tldCgpO1xuXG4gICAgICBzaW5vbi5zdHViKHNvY2tldCwgJ3NlbmRCeXRlcycpLmNhbGxzRmFrZShkYXRhID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFByb3RvLldlYlNvY2tldE1lc3NhZ2UuZGVjb2RlKGRhdGEpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZS50eXBlLCBQcm90by5XZWJTb2NrZXRNZXNzYWdlLlR5cGUuUkVRVUVTVCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlLnJlcXVlc3Q/LnZlcmIsICdHRVQnKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UucmVxdWVzdD8ucGF0aCwgJy92MS9rZWVwYWxpdmUnKTtcbiAgICAgICAgZG9uZSgpO1xuICAgICAgfSk7XG5cbiAgICAgIG5ldyBXZWJTb2NrZXRSZXNvdXJjZShzb2NrZXQgYXMgV2ViU29ja2V0LCB7XG4gICAgICAgIGtlZXBhbGl2ZTogeyBwYXRoOiAnL3YxL2tlZXBhbGl2ZScgfSxcbiAgICAgIH0pO1xuXG4gICAgICB0aGlzLmNsb2NrLm5leHQoKTtcbiAgICB9KTtcblxuICAgIGl0KCd1c2VzIC8gYXMgYSBkZWZhdWx0IHBhdGgnLCBmdW5jdGlvbiB0ZXN0KGRvbmUpIHtcbiAgICAgIGNvbnN0IHNvY2tldCA9IG5ldyBGYWtlU29ja2V0KCk7XG5cbiAgICAgIHNpbm9uLnN0dWIoc29ja2V0LCAnc2VuZEJ5dGVzJykuY2FsbHNGYWtlKGRhdGEgPT4ge1xuICAgICAgICBjb25zdCBtZXNzYWdlID0gUHJvdG8uV2ViU29ja2V0TWVzc2FnZS5kZWNvZGUoZGF0YSk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlLnR5cGUsIFByb3RvLldlYlNvY2tldE1lc3NhZ2UuVHlwZS5SRVFVRVNUKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UucmVxdWVzdD8udmVyYiwgJ0dFVCcpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZS5yZXF1ZXN0Py5wYXRoLCAnLycpO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcblxuICAgICAgbmV3IFdlYlNvY2tldFJlc291cmNlKHNvY2tldCBhcyBXZWJTb2NrZXQsIHtcbiAgICAgICAga2VlcGFsaXZlOiB0cnVlLFxuICAgICAgfSk7XG5cbiAgICAgIHRoaXMuY2xvY2submV4dCgpO1xuICAgIH0pO1xuXG4gICAgaXQoJ29wdGlvbmFsbHkgZGlzY29ubmVjdHMgaWYgbm8gcmVzcG9uc2UnLCBmdW5jdGlvbiB0aGlzTmVlZGVkMShkb25lKSB7XG4gICAgICBjb25zdCBzb2NrZXQgPSBuZXcgRmFrZVNvY2tldCgpO1xuXG4gICAgICBzaW5vbi5zdHViKHNvY2tldCwgJ2Nsb3NlJykuY2FsbHNGYWtlKCgpID0+IGRvbmUoKSk7XG5cbiAgICAgIG5ldyBXZWJTb2NrZXRSZXNvdXJjZShzb2NrZXQgYXMgV2ViU29ja2V0LCB7XG4gICAgICAgIGtlZXBhbGl2ZTogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBPbmUgdG8gdHJpZ2dlciBzZW5kXG4gICAgICB0aGlzLmNsb2NrLm5leHQoKTtcblxuICAgICAgLy8gQW5vdGhlciB0byB0cmlnZ2VyIHNlbmQgdGltZW91dFxuICAgICAgdGhpcy5jbG9jay5uZXh0KCk7XG4gICAgfSk7XG5cbiAgICBpdCgnb3B0aW9uYWxseSBkaXNjb25uZWN0cyBpZiBzdXNwZW5kZWQnLCBmdW5jdGlvbiB0aGlzTmVlZGVkMShkb25lKSB7XG4gICAgICBjb25zdCBzb2NrZXQgPSBuZXcgRmFrZVNvY2tldCgpO1xuXG4gICAgICBzaW5vbi5zdHViKHNvY2tldCwgJ2Nsb3NlJykuY2FsbHNGYWtlKCgpID0+IGRvbmUoKSk7XG5cbiAgICAgIG5ldyBXZWJTb2NrZXRSZXNvdXJjZShzb2NrZXQgYXMgV2ViU29ja2V0LCB7XG4gICAgICAgIGtlZXBhbGl2ZTogdHJ1ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyBKdXN0IHNraXAgb25lIGhvdXIgaW1tZWRpYXRlbHlcbiAgICAgIHRoaXMuY2xvY2suc2V0U3lzdGVtVGltZShOT1cgKyAzNjAwICogMTAwMCk7XG4gICAgICB0aGlzLmNsb2NrLm5leHQoKTtcbiAgICB9KTtcblxuICAgIGl0KCdhbGxvd3MgcmVzZXR0aW5nIHRoZSBrZWVwYWxpdmUgdGltZXInLCBmdW5jdGlvbiB0aGlzTmVlZGVkMihkb25lKSB7XG4gICAgICBjb25zdCBzdGFydFRpbWUgPSBEYXRlLm5vdygpO1xuXG4gICAgICBjb25zdCBzb2NrZXQgPSBuZXcgRmFrZVNvY2tldCgpO1xuXG4gICAgICBzaW5vbi5zdHViKHNvY2tldCwgJ3NlbmRCeXRlcycpLmNhbGxzRmFrZShkYXRhID0+IHtcbiAgICAgICAgY29uc3QgbWVzc2FnZSA9IFByb3RvLldlYlNvY2tldE1lc3NhZ2UuZGVjb2RlKGRhdGEpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwobWVzc2FnZS50eXBlLCBQcm90by5XZWJTb2NrZXRNZXNzYWdlLlR5cGUuUkVRVUVTVCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChtZXNzYWdlLnJlcXVlc3Q/LnZlcmIsICdHRVQnKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKG1lc3NhZ2UucmVxdWVzdD8ucGF0aCwgJy8nKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIERhdGUubm93KCksXG4gICAgICAgICAgc3RhcnRUaW1lICsgNjAwMDAsXG4gICAgICAgICAgJ2tlZXBhbGl2ZSB0aW1lIHNob3VsZCBiZSBvbmUgbWludXRlJ1xuICAgICAgICApO1xuICAgICAgICBkb25lKCk7XG4gICAgICB9KTtcblxuICAgICAgY29uc3QgcmVzb3VyY2UgPSBuZXcgV2ViU29ja2V0UmVzb3VyY2Uoc29ja2V0IGFzIFdlYlNvY2tldCwge1xuICAgICAgICBrZWVwYWxpdmU6IHRydWUsXG4gICAgICB9KTtcblxuICAgICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAgIHJlc291cmNlLmtlZXBhbGl2ZT8ucmVzZXQoKTtcbiAgICAgIH0sIDUwMDApO1xuXG4gICAgICAvLyBUcmlnZ2VyIHNldFRpbWVvdXQgYWJvdmVcbiAgICAgIHRoaXMuY2xvY2submV4dCgpO1xuXG4gICAgICAvLyBUcmlnZ2VyIHNlbmRCeXRlc1xuICAgICAgdGhpcy5jbG9jay5uZXh0KCk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBU0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUF5QjtBQUV6QixrQkFBaUI7QUFFakIsc0JBQXlCO0FBQ3pCLHNCQUF1QztBQUV2QyxnQ0FBOEI7QUFFOUIsU0FBUyxzQkFBc0IsTUFBTTtBQUNuQyxRQUFNLG1CQUFtQixzQkFBYTtBQUFBLElBQzdCLFVBQVUsR0FBZTtBQUFBLElBQUM7QUFBQSxJ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
