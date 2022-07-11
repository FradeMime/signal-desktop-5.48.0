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
var sinon = __toESM(require("sinon"));
var import_startTimeTravelDetector = require("../../util/startTimeTravelDetector");
describe("startTimeTravelDetector", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox({ useFakeTimers: true });
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("calls the callback when the time between checks is more than 2 seconds", async function test() {
    const callback = sandbox.fake();
    (0, import_startTimeTravelDetector.startTimeTravelDetector)(callback);
    await sandbox.clock.tickAsync(1234);
    await sandbox.clock.tickAsync(5678);
    sinon.assert.notCalled(callback);
    sandbox.clock.setSystemTime(Date.now() + 1e3);
    await sandbox.clock.tickAsync(1e3);
    sinon.assert.notCalled(callback);
    sandbox.clock.setSystemTime(Date.now() + 1999);
    await sandbox.clock.tickAsync(1);
    sinon.assert.notCalled(callback);
    sandbox.clock.setSystemTime(Date.now() + 2001);
    await sandbox.clock.nextAsync();
    sinon.assert.calledOnce(callback);
    sandbox.clock.setSystemTime(Date.now() + 9999);
    await sandbox.clock.nextAsync();
    sinon.assert.calledTwice(callback);
    await sandbox.clock.tickAsync(9876);
    sinon.assert.calledTwice(callback);
  });
  it("can detect time travel right after initialization", async () => {
    const callback = sandbox.fake();
    (0, import_startTimeTravelDetector.startTimeTravelDetector)(callback);
    sandbox.clock.setSystemTime(Date.now() + 2001);
    await sandbox.clock.nextAsync();
    sinon.assert.calledOnce(callback);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3RhcnRUaW1lVHJhdmVsRGV0ZWN0b3JfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5cbmltcG9ydCB7IHN0YXJ0VGltZVRyYXZlbERldGVjdG9yIH0gZnJvbSAnLi4vLi4vdXRpbC9zdGFydFRpbWVUcmF2ZWxEZXRlY3Rvcic7XG5cbmRlc2NyaWJlKCdzdGFydFRpbWVUcmF2ZWxEZXRlY3RvcicsICgpID0+IHtcbiAgbGV0IHNhbmRib3g6IHNpbm9uLlNpbm9uU2FuZGJveDtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94ID0gc2lub24uY3JlYXRlU2FuZGJveCh7IHVzZUZha2VUaW1lcnM6IHRydWUgfSk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveC5yZXN0b3JlKCk7XG4gIH0pO1xuXG4gIGl0KCdjYWxscyB0aGUgY2FsbGJhY2sgd2hlbiB0aGUgdGltZSBiZXR3ZWVuIGNoZWNrcyBpcyBtb3JlIHRoYW4gMiBzZWNvbmRzJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICBjb25zdCBjYWxsYmFjayA9IHNhbmRib3guZmFrZSgpO1xuXG4gICAgc3RhcnRUaW1lVHJhdmVsRGV0ZWN0b3IoY2FsbGJhY2spO1xuXG4gICAgLy8gTm9ybWFsIGNsb2NrIGJlaGF2aW9yXG4gICAgYXdhaXQgc2FuZGJveC5jbG9jay50aWNrQXN5bmMoMTIzNCk7XG4gICAgYXdhaXQgc2FuZGJveC5jbG9jay50aWNrQXN5bmMoNTY3OCk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChjYWxsYmFjayk7XG5cbiAgICAvLyBUaW1lIHRyYXZlbCBcdTIyNjQyc1xuICAgIHNhbmRib3guY2xvY2suc2V0U3lzdGVtVGltZShEYXRlLm5vdygpICsgMTAwMCk7XG4gICAgYXdhaXQgc2FuZGJveC5jbG9jay50aWNrQXN5bmMoMTAwMCk7XG4gICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZChjYWxsYmFjayk7XG4gICAgc2FuZGJveC5jbG9jay5zZXRTeXN0ZW1UaW1lKERhdGUubm93KCkgKyAxOTk5KTtcbiAgICBhd2FpdCBzYW5kYm94LmNsb2NrLnRpY2tBc3luYygxKTtcbiAgICBzaW5vbi5hc3NlcnQubm90Q2FsbGVkKGNhbGxiYWNrKTtcblxuICAgIC8vIFRpbWUgdHJhdmVsID4yc1xuICAgIHNhbmRib3guY2xvY2suc2V0U3lzdGVtVGltZShEYXRlLm5vdygpICsgMjAwMSk7XG4gICAgYXdhaXQgc2FuZGJveC5jbG9jay5uZXh0QXN5bmMoKTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShjYWxsYmFjayk7XG4gICAgc2FuZGJveC5jbG9jay5zZXRTeXN0ZW1UaW1lKERhdGUubm93KCkgKyA5OTk5KTtcbiAgICBhd2FpdCBzYW5kYm94LmNsb2NrLm5leHRBc3luYygpO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShjYWxsYmFjayk7XG5cbiAgICAvLyBOb3JtYWwgY2xvY2sgYmVoYXZpb3JcbiAgICBhd2FpdCBzYW5kYm94LmNsb2NrLnRpY2tBc3luYyg5ODc2KTtcbiAgICBzaW5vbi5hc3NlcnQuY2FsbGVkVHdpY2UoY2FsbGJhY2spO1xuICB9KTtcblxuICBpdCgnY2FuIGRldGVjdCB0aW1lIHRyYXZlbCByaWdodCBhZnRlciBpbml0aWFsaXphdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjYWxsYmFjayA9IHNhbmRib3guZmFrZSgpO1xuXG4gICAgc3RhcnRUaW1lVHJhdmVsRGV0ZWN0b3IoY2FsbGJhY2spO1xuXG4gICAgc2FuZGJveC5jbG9jay5zZXRTeXN0ZW1UaW1lKERhdGUubm93KCkgKyAyMDAxKTtcbiAgICBhd2FpdCBzYW5kYm94LmNsb2NrLm5leHRBc3luYygpO1xuICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGNhbGxiYWNrKTtcbiAgfSk7XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSxZQUF1QjtBQUV2QixxQ0FBd0M7QUFFeEMsU0FBUywyQkFBMkIsTUFBTTtBQUN4QyxNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWMsRUFBRSxlQUFlLEtBQUssQ0FBQztBQUFBLEVBQ3ZELENBQUM7QUFFRCxZQUFVLE1BQU07QUFDZCxZQUFRLFFBQVE7QUFBQSxFQUNsQixDQUFDO0FBRUQsS0FBRywwRUFBMEUsc0JBQXNCO0FBQ2pHLFVBQU0sV0FBVyxRQUFRLEtBQUs7QUFFOUIsZ0VBQXdCLFFBQVE7QUFHaEMsVUFBTSxRQUFRLE1BQU0sVUFBVSxJQUFJO0FBQ2xDLFVBQU0sUUFBUSxNQUFNLFVBQVUsSUFBSTtBQUNsQyxVQUFNLE9BQU8sVUFBVSxRQUFRO0FBRy9CLFlBQVEsTUFBTSxjQUFjLEtBQUssSUFBSSxJQUFJLEdBQUk7QUFDN0MsVUFBTSxRQUFRLE1BQU0sVUFBVSxHQUFJO0FBQ2xDLFVBQU0sT0FBTyxVQUFVLFFBQVE7QUFDL0IsWUFBUSxNQUFNLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSTtBQUM3QyxVQUFNLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDL0IsVUFBTSxPQUFPLFVBQVUsUUFBUTtBQUcvQixZQUFRLE1BQU0sY0FBYyxLQUFLLElBQUksSUFBSSxJQUFJO0FBQzdDLFVBQU0sUUFBUSxNQUFNLFVBQVU7QUFDOUIsVUFBTSxPQUFPLFdBQVcsUUFBUTtBQUNoQyxZQUFRLE1BQU0sY0FBYyxLQUFLLElBQUksSUFBSSxJQUFJO0FBQzdDLFVBQU0sUUFBUSxNQUFNLFVBQVU7QUFDOUIsVUFBTSxPQUFPLFlBQVksUUFBUTtBQUdqQyxVQUFNLFFBQVEsTUFBTSxVQUFVLElBQUk7QUFDbEMsVUFBTSxPQUFPLFlBQVksUUFBUTtBQUFBLEVBQ25DLENBQUM7QUFFRCxLQUFHLHFEQUFxRCxZQUFZO0FBQ2xFLFVBQU0sV0FBVyxRQUFRLEtBQUs7QUFFOUIsZ0VBQXdCLFFBQVE7QUFFaEMsWUFBUSxNQUFNLGNBQWMsS0FBSyxJQUFJLElBQUksSUFBSTtBQUM3QyxVQUFNLFFBQVEsTUFBTSxVQUFVO0FBQzlCLFVBQU0sT0FBTyxXQUFXLFFBQVE7QUFBQSxFQUNsQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
