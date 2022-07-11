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
var import_stream = require("stream");
var sinon = __toESM(require("sinon"));
var import_lodash = require("lodash");
var import_events = require("events");
var import_getStreamWithTimeout = require("../../util/getStreamWithTimeout");
describe("getStreamWithTimeout", () => {
  let sandbox;
  let clock;
  const pushAndWait = /* @__PURE__ */ __name((stream, chunk) => {
    const promise = (0, import_events.once)(stream, chunk === null ? "end" : "data");
    stream.push(chunk);
    return promise;
  }, "pushAndWait");
  beforeEach(() => {
    sandbox = sinon.createSandbox();
    clock = sandbox.useFakeTimers();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("resolves on finished stream", async () => {
    const stream = new import_stream.Readable({
      read: import_lodash.noop
    });
    stream.push("hello");
    stream.push(" ");
    stream.push("world");
    stream.push(null);
    const abort = sinon.stub();
    const data = await (0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
      name: "test",
      timeout: 1e3,
      abortController: { abort }
    });
    import_chai.assert.strictEqual(Buffer.from(data).toString(), "hello world");
    sinon.assert.notCalled(abort);
  });
  it("does not timeout on slow but steady stream", async () => {
    const stream = new import_stream.Readable({
      read: import_lodash.noop
    });
    const abort = sinon.stub();
    const data = (0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
      name: "test",
      timeout: 1e3,
      abortController: { abort }
    });
    await clock.tickAsync(500);
    await pushAndWait(stream, "hello ");
    await clock.tickAsync(500);
    await pushAndWait(stream, "world");
    await clock.tickAsync(500);
    await pushAndWait(stream, null);
    await clock.nextAsync();
    import_chai.assert.strictEqual(Buffer.from(await data).toString(), "hello world");
    sinon.assert.notCalled(abort);
  });
  it("does timeout on slow but unsteady stream", async () => {
    const stream = new import_stream.Readable({
      read: import_lodash.noop
    });
    const abort = sinon.stub();
    const data = (0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
      name: "test",
      timeout: 1e3,
      abortController: { abort }
    });
    await clock.tickAsync(500);
    await pushAndWait(stream, "hello ");
    await clock.tickAsync(500);
    await pushAndWait(stream, "world");
    const promise = import_chai.assert.isRejected(data, "getStreamWithTimeout(test) timed out");
    await clock.tickAsync(1e3);
    await promise;
    sinon.assert.called(abort);
  });
  it("rejects on timeout", async () => {
    const stream = new import_stream.Readable({
      read: import_lodash.noop
    });
    const abort = sinon.stub();
    const promise = import_chai.assert.isRejected((0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
      name: "test",
      timeout: 1e3,
      abortController: { abort }
    }), "getStreamWithTimeout(test) timed out");
    await clock.tickAsync(1e3);
    await promise;
    sinon.assert.called(abort);
  });
  it("rejects on stream error", async () => {
    const stream = new import_stream.Readable({
      read: import_lodash.noop
    });
    const abort = sinon.stub();
    const promise = import_chai.assert.isRejected((0, import_getStreamWithTimeout.getStreamWithTimeout)(stream, {
      name: "test",
      timeout: 1e3,
      abortController: { abort }
    }), "welp");
    stream.emit("error", new Error("welp"));
    await promise;
    sinon.assert.notCalled(abort);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RyZWFtV2l0aFRpbWVvdXRfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHsgUmVhZGFibGUgfSBmcm9tICdzdHJlYW0nO1xuaW1wb3J0ICogYXMgc2lub24gZnJvbSAnc2lub24nO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBvbmNlIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHsgZ2V0U3RyZWFtV2l0aFRpbWVvdXQgfSBmcm9tICcuLi8uLi91dGlsL2dldFN0cmVhbVdpdGhUaW1lb3V0JztcblxuZGVzY3JpYmUoJ2dldFN0cmVhbVdpdGhUaW1lb3V0JywgKCkgPT4ge1xuICBsZXQgc2FuZGJveDogc2lub24uU2lub25TYW5kYm94O1xuICBsZXQgY2xvY2s6IHNpbm9uLlNpbm9uRmFrZVRpbWVycztcblxuICAvLyBUaGlzIGhlbHBzIHRlc3RzIHByZXNlcnZlIG9yZGVyaW5nLlxuICBjb25zdCBwdXNoQW5kV2FpdCA9IChcbiAgICBzdHJlYW06IFJlYWRhYmxlLFxuICAgIGNodW5rOiBzdHJpbmcgfCBudWxsXG4gICk6IFByb21pc2U8dW5rbm93bj4gPT4ge1xuICAgIGNvbnN0IHByb21pc2UgPSBvbmNlKHN0cmVhbSwgY2h1bmsgPT09IG51bGwgPyAnZW5kJyA6ICdkYXRhJyk7XG4gICAgc3RyZWFtLnB1c2goY2h1bmspO1xuICAgIHJldHVybiBwcm9taXNlO1xuICB9O1xuXG4gIGJlZm9yZUVhY2goKCkgPT4ge1xuICAgIHNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gICAgY2xvY2sgPSBzYW5kYm94LnVzZUZha2VUaW1lcnMoKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Jlc29sdmVzIG9uIGZpbmlzaGVkIHN0cmVhbScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBzdHJlYW0gPSBuZXcgUmVhZGFibGUoe1xuICAgICAgcmVhZDogbm9vcCxcbiAgICB9KTtcblxuICAgIHN0cmVhbS5wdXNoKCdoZWxsbycpO1xuICAgIHN0cmVhbS5wdXNoKCcgJyk7XG4gICAgc3RyZWFtLnB1c2goJ3dvcmxkJyk7XG4gICAgc3RyZWFtLnB1c2gobnVsbCk7XG5cbiAgICBjb25zdCBhYm9ydCA9IHNpbm9uLnN0dWIoKTtcbiAgICBjb25zdCBkYXRhID0gYXdhaXQgZ2V0U3RyZWFtV2l0aFRpbWVvdXQoc3RyZWFtLCB7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgYWJvcnRDb250cm9sbGVyOiB7IGFib3J0IH0sXG4gICAgfSk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnVmZmVyLmZyb20oZGF0YSkudG9TdHJpbmcoKSwgJ2hlbGxvIHdvcmxkJyk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChhYm9ydCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIG5vdCB0aW1lb3V0IG9uIHNsb3cgYnV0IHN0ZWFkeSBzdHJlYW0nLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3Qgc3RyZWFtID0gbmV3IFJlYWRhYmxlKHtcbiAgICAgIHJlYWQ6IG5vb3AsXG4gICAgfSk7XG5cbiAgICBjb25zdCBhYm9ydCA9IHNpbm9uLnN0dWIoKTtcbiAgICBjb25zdCBkYXRhID0gZ2V0U3RyZWFtV2l0aFRpbWVvdXQoc3RyZWFtLCB7XG4gICAgICBuYW1lOiAndGVzdCcsXG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgICAgYWJvcnRDb250cm9sbGVyOiB7IGFib3J0IH0sXG4gICAgfSk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoNTAwKTtcbiAgICBhd2FpdCBwdXNoQW5kV2FpdChzdHJlYW0sICdoZWxsbyAnKTtcbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoNTAwKTtcbiAgICBhd2FpdCBwdXNoQW5kV2FpdChzdHJlYW0sICd3b3JsZCcpO1xuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYyg1MDApO1xuICAgIGF3YWl0IHB1c2hBbmRXYWl0KHN0cmVhbSwgbnVsbCk7XG4gICAgYXdhaXQgY2xvY2submV4dEFzeW5jKCk7XG5cbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoQnVmZmVyLmZyb20oYXdhaXQgZGF0YSkudG9TdHJpbmcoKSwgJ2hlbGxvIHdvcmxkJyk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChhYm9ydCk7XG4gIH0pO1xuXG4gIGl0KCdkb2VzIHRpbWVvdXQgb24gc2xvdyBidXQgdW5zdGVhZHkgc3RyZWFtJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7XG4gICAgICByZWFkOiBub29wLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWJvcnQgPSBzaW5vbi5zdHViKCk7XG4gICAgY29uc3QgZGF0YSA9IGdldFN0cmVhbVdpdGhUaW1lb3V0KHN0cmVhbSwge1xuICAgICAgbmFtZTogJ3Rlc3QnLFxuICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgIGFib3J0Q29udHJvbGxlcjogeyBhYm9ydCB9LFxuICAgIH0pO1xuXG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDUwMCk7XG4gICAgYXdhaXQgcHVzaEFuZFdhaXQoc3RyZWFtLCAnaGVsbG8gJyk7XG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDUwMCk7XG4gICAgYXdhaXQgcHVzaEFuZFdhaXQoc3RyZWFtLCAnd29ybGQnKTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBhc3NlcnQuaXNSZWplY3RlZChcbiAgICAgIGRhdGEsXG4gICAgICAnZ2V0U3RyZWFtV2l0aFRpbWVvdXQodGVzdCkgdGltZWQgb3V0J1xuICAgICk7XG5cbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoMTAwMCk7XG5cbiAgICBhd2FpdCBwcm9taXNlO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWQoYWJvcnQpO1xuICB9KTtcblxuICBpdCgncmVqZWN0cyBvbiB0aW1lb3V0JywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7XG4gICAgICByZWFkOiBub29wLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWJvcnQgPSBzaW5vbi5zdHViKCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgZ2V0U3RyZWFtV2l0aFRpbWVvdXQoc3RyZWFtLCB7XG4gICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgYWJvcnRDb250cm9sbGVyOiB7IGFib3J0IH0sXG4gICAgICB9KSxcbiAgICAgICdnZXRTdHJlYW1XaXRoVGltZW91dCh0ZXN0KSB0aW1lZCBvdXQnXG4gICAgKTtcblxuICAgIGF3YWl0IGNsb2NrLnRpY2tBc3luYygxMDAwKTtcblxuICAgIGF3YWl0IHByb21pc2U7XG5cbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkKGFib3J0KTtcbiAgfSk7XG5cbiAgaXQoJ3JlamVjdHMgb24gc3RyZWFtIGVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHN0cmVhbSA9IG5ldyBSZWFkYWJsZSh7XG4gICAgICByZWFkOiBub29wLFxuICAgIH0pO1xuXG4gICAgY29uc3QgYWJvcnQgPSBzaW5vbi5zdHViKCk7XG4gICAgY29uc3QgcHJvbWlzZSA9IGFzc2VydC5pc1JlamVjdGVkKFxuICAgICAgZ2V0U3RyZWFtV2l0aFRpbWVvdXQoc3RyZWFtLCB7XG4gICAgICAgIG5hbWU6ICd0ZXN0JyxcbiAgICAgICAgdGltZW91dDogMTAwMCxcbiAgICAgICAgYWJvcnRDb250cm9sbGVyOiB7IGFib3J0IH0sXG4gICAgICB9KSxcbiAgICAgICd3ZWxwJ1xuICAgICk7XG5cbiAgICBzdHJlYW0uZW1pdCgnZXJyb3InLCBuZXcgRXJyb3IoJ3dlbHAnKSk7XG5cbiAgICBhd2FpdCBwcm9taXNlO1xuICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoYWJvcnQpO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixvQkFBeUI7QUFDekIsWUFBdUI7QUFDdkIsb0JBQXFCO0FBQ3JCLG9CQUFxQjtBQUVyQixrQ0FBcUM7QUFFckMsU0FBUyx3QkFBd0IsTUFBTTtBQUNyQyxNQUFJO0FBQ0osTUFBSTtBQUdKLFFBQU0sY0FBYyx3QkFDbEIsUUFDQSxVQUNxQjtBQUNyQixVQUFNLFVBQVUsd0JBQUssUUFBUSxVQUFVLE9BQU8sUUFBUSxNQUFNO0FBQzVELFdBQU8sS0FBSyxLQUFLO0FBQ2pCLFdBQU87QUFBQSxFQUNULEdBUG9CO0FBU3BCLGFBQVcsTUFBTTtBQUNmLGNBQVUsTUFBTSxjQUFjO0FBQzlCLFlBQVEsUUFBUSxjQUFjO0FBQUEsRUFDaEMsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLFlBQVEsUUFBUTtBQUFBLEVBQ2xCLENBQUM7QUFFRCxLQUFHLCtCQUErQixZQUFZO0FBQzVDLFVBQU0sU0FBUyxJQUFJLHVCQUFTO0FBQUEsTUFDMUIsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUVELFdBQU8sS0FBSyxPQUFPO0FBQ25CLFdBQU8sS0FBSyxHQUFHO0FBQ2YsV0FBTyxLQUFLLE9BQU87QUFDbkIsV0FBTyxLQUFLLElBQUk7QUFFaEIsVUFBTSxRQUFRLE1BQU0sS0FBSztBQUN6QixVQUFNLE9BQU8sTUFBTSxzREFBcUIsUUFBUTtBQUFBLE1BQzlDLE1BQU07QUFBQSxNQUNOLFNBQVM7QUFBQSxNQUNULGlCQUFpQixFQUFFLE1BQU07QUFBQSxJQUMzQixDQUFDO0FBRUQsdUJBQU8sWUFBWSxPQUFPLEtBQUssSUFBSSxFQUFFLFNBQVMsR0FBRyxhQUFhO0FBQzlELFVBQU0sT0FBTyxV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
