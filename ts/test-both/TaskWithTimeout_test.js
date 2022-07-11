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
var import_sleep = require("../util/sleep");
var import_explodePromise = require("../util/explodePromise");
var import_TaskWithTimeout = __toESM(require("../textsecure/TaskWithTimeout"));
describe("createTaskWithTimeout", () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.createSandbox();
  });
  afterEach(() => {
    sandbox.restore();
  });
  it("resolves when promise resolves", async () => {
    const task = /* @__PURE__ */ __name(() => Promise.resolve("hi!"), "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "resolving-task");
    const result = await taskWithTimeout();
    import_chai.assert.strictEqual(result, "hi!");
  });
  it("flows error from promise back", async () => {
    const error = new Error("original");
    const task = /* @__PURE__ */ __name(() => Promise.reject(error), "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "rejecting-task");
    await import_chai.assert.isRejected(taskWithTimeout(), "original");
  });
  it("rejects if promise takes too long (this one logs error to console)", async () => {
    const clock = sandbox.useFakeTimers();
    const { promise: pause } = (0, import_explodePromise.explodePromise)();
    const task = /* @__PURE__ */ __name(() => pause, "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "slow-task");
    const promise = import_chai.assert.isRejected(taskWithTimeout());
    await clock.runToLastAsync();
    await promise;
  });
  it("rejects if task throws (and does not log about taking too long)", async () => {
    const clock = sandbox.useFakeTimers();
    const error = new Error("Task is throwing!");
    const task = /* @__PURE__ */ __name(() => {
      throw error;
    }, "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "throwing-task");
    await clock.runToLastAsync();
    await import_chai.assert.isRejected(taskWithTimeout(), "Task is throwing!");
  });
  it("passes arguments to the underlying function", async () => {
    const task = /* @__PURE__ */ __name((arg) => Promise.resolve(arg), "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "arguments-task");
    const result = await taskWithTimeout("hi!");
    import_chai.assert.strictEqual(result, "hi!");
  });
  it("suspends and resumes tasks", async () => {
    const clock = sandbox.useFakeTimers();
    let state = 0;
    const task = /* @__PURE__ */ __name(async () => {
      state = 1;
      await (0, import_sleep.sleep)(900);
      state = 2;
      await (0, import_sleep.sleep)(900);
      state = 3;
    }, "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "suspend-task", {
      timeout: 1e3
    });
    const promise = taskWithTimeout();
    import_chai.assert.strictEqual(state, 1);
    (0, import_TaskWithTimeout.suspendTasksWithTimeout)();
    await clock.tickAsync(900);
    import_chai.assert.strictEqual(state, 2);
    (0, import_TaskWithTimeout.resumeTasksWithTimeout)();
    await clock.tickAsync(900);
    import_chai.assert.strictEqual(state, 3);
    await promise;
  });
  it("suspends and resumes timing out task", async () => {
    const clock = sandbox.useFakeTimers();
    const { promise: pause } = (0, import_explodePromise.explodePromise)();
    const task = /* @__PURE__ */ __name(() => pause, "task");
    const taskWithTimeout = (0, import_TaskWithTimeout.default)(task, "suspend-slow-task");
    const promise = import_chai.assert.isRejected(taskWithTimeout());
    (0, import_TaskWithTimeout.suspendTasksWithTimeout)();
    await clock.runToLastAsync();
    (0, import_TaskWithTimeout.resumeTasksWithTimeout)();
    await clock.runToLastAsync();
    await promise;
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGFza1dpdGhUaW1lb3V0X3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCAqIGFzIHNpbm9uIGZyb20gJ3Npbm9uJztcblxuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IGV4cGxvZGVQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9leHBsb2RlUHJvbWlzZSc7XG5pbXBvcnQgY3JlYXRlVGFza1dpdGhUaW1lb3V0LCB7XG4gIHN1c3BlbmRUYXNrc1dpdGhUaW1lb3V0LFxuICByZXN1bWVUYXNrc1dpdGhUaW1lb3V0LFxufSBmcm9tICcuLi90ZXh0c2VjdXJlL1Rhc2tXaXRoVGltZW91dCc7XG5cbmRlc2NyaWJlKCdjcmVhdGVUYXNrV2l0aFRpbWVvdXQnLCAoKSA9PiB7XG4gIGxldCBzYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG5cbiAgYmVmb3JlRWFjaCgoKSA9PiB7XG4gICAgc2FuZGJveCA9IHNpbm9uLmNyZWF0ZVNhbmRib3goKTtcbiAgfSk7XG5cbiAgYWZ0ZXJFYWNoKCgpID0+IHtcbiAgICBzYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgaXQoJ3Jlc29sdmVzIHdoZW4gcHJvbWlzZSByZXNvbHZlcycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0YXNrID0gKCkgPT4gUHJvbWlzZS5yZXNvbHZlKCdoaSEnKTtcbiAgICBjb25zdCB0YXNrV2l0aFRpbWVvdXQgPSBjcmVhdGVUYXNrV2l0aFRpbWVvdXQodGFzaywgJ3Jlc29sdmluZy10YXNrJyk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0YXNrV2l0aFRpbWVvdXQoKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCAnaGkhJyk7XG4gIH0pO1xuXG4gIGl0KCdmbG93cyBlcnJvciBmcm9tIHByb21pc2UgYmFjaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignb3JpZ2luYWwnKTtcbiAgICBjb25zdCB0YXNrID0gKCkgPT4gUHJvbWlzZS5yZWplY3QoZXJyb3IpO1xuICAgIGNvbnN0IHRhc2tXaXRoVGltZW91dCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCAncmVqZWN0aW5nLXRhc2snKTtcblxuICAgIGF3YWl0IGFzc2VydC5pc1JlamVjdGVkKHRhc2tXaXRoVGltZW91dCgpLCAnb3JpZ2luYWwnKTtcbiAgfSk7XG5cbiAgaXQoJ3JlamVjdHMgaWYgcHJvbWlzZSB0YWtlcyB0b28gbG9uZyAodGhpcyBvbmUgbG9ncyBlcnJvciB0byBjb25zb2xlKScsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbG9jayA9IHNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuXG4gICAgY29uc3QgeyBwcm9taXNlOiBwYXVzZSB9ID0gZXhwbG9kZVByb21pc2U8dm9pZD4oKTtcblxuICAgIC8vIE5ldmVyIHJlc29sdmVzXG4gICAgY29uc3QgdGFzayA9ICgpID0+IHBhdXNlO1xuICAgIGNvbnN0IHRhc2tXaXRoVGltZW91dCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCAnc2xvdy10YXNrJyk7XG5cbiAgICBjb25zdCBwcm9taXNlID0gYXNzZXJ0LmlzUmVqZWN0ZWQodGFza1dpdGhUaW1lb3V0KCkpO1xuXG4gICAgYXdhaXQgY2xvY2sucnVuVG9MYXN0QXN5bmMoKTtcblxuICAgIGF3YWl0IHByb21pc2U7XG4gIH0pO1xuXG4gIGl0KCdyZWplY3RzIGlmIHRhc2sgdGhyb3dzIChhbmQgZG9lcyBub3QgbG9nIGFib3V0IHRha2luZyB0b28gbG9uZyknLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgY2xvY2sgPSBzYW5kYm94LnVzZUZha2VUaW1lcnMoKTtcblxuICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdUYXNrIGlzIHRocm93aW5nIScpO1xuICAgIGNvbnN0IHRhc2sgPSAoKSA9PiB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9O1xuICAgIGNvbnN0IHRhc2tXaXRoVGltZW91dCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCAndGhyb3dpbmctdGFzaycpO1xuICAgIGF3YWl0IGNsb2NrLnJ1blRvTGFzdEFzeW5jKCk7XG4gICAgYXdhaXQgYXNzZXJ0LmlzUmVqZWN0ZWQodGFza1dpdGhUaW1lb3V0KCksICdUYXNrIGlzIHRocm93aW5nIScpO1xuICB9KTtcblxuICBpdCgncGFzc2VzIGFyZ3VtZW50cyB0byB0aGUgdW5kZXJseWluZyBmdW5jdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCB0YXNrID0gKGFyZzogc3RyaW5nKSA9PiBQcm9taXNlLnJlc29sdmUoYXJnKTtcbiAgICBjb25zdCB0YXNrV2l0aFRpbWVvdXQgPSBjcmVhdGVUYXNrV2l0aFRpbWVvdXQodGFzaywgJ2FyZ3VtZW50cy10YXNrJyk7XG5cbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0YXNrV2l0aFRpbWVvdXQoJ2hpIScpO1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsICdoaSEnKTtcbiAgfSk7XG5cbiAgaXQoJ3N1c3BlbmRzIGFuZCByZXN1bWVzIHRhc2tzJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IGNsb2NrID0gc2FuZGJveC51c2VGYWtlVGltZXJzKCk7XG5cbiAgICBsZXQgc3RhdGUgPSAwO1xuXG4gICAgY29uc3QgdGFzayA9IGFzeW5jICgpID0+IHtcbiAgICAgIHN0YXRlID0gMTtcbiAgICAgIGF3YWl0IHNsZWVwKDkwMCk7XG4gICAgICBzdGF0ZSA9IDI7XG4gICAgICBhd2FpdCBzbGVlcCg5MDApO1xuICAgICAgc3RhdGUgPSAzO1xuICAgIH07XG4gICAgY29uc3QgdGFza1dpdGhUaW1lb3V0ID0gY3JlYXRlVGFza1dpdGhUaW1lb3V0KHRhc2ssICdzdXNwZW5kLXRhc2snLCB7XG4gICAgICB0aW1lb3V0OiAxMDAwLFxuICAgIH0pO1xuXG4gICAgY29uc3QgcHJvbWlzZSA9IHRhc2tXaXRoVGltZW91dCgpO1xuXG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHN0YXRlLCAxKTtcblxuICAgIHN1c3BlbmRUYXNrc1dpdGhUaW1lb3V0KCk7XG4gICAgYXdhaXQgY2xvY2sudGlja0FzeW5jKDkwMCk7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKHN0YXRlLCAyKTtcblxuICAgIHJlc3VtZVRhc2tzV2l0aFRpbWVvdXQoKTtcbiAgICBhd2FpdCBjbG9jay50aWNrQXN5bmMoOTAwKTtcbiAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc3RhdGUsIDMpO1xuXG4gICAgYXdhaXQgcHJvbWlzZTtcbiAgfSk7XG5cbiAgaXQoJ3N1c3BlbmRzIGFuZCByZXN1bWVzIHRpbWluZyBvdXQgdGFzaycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBjbG9jayA9IHNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuXG4gICAgY29uc3QgeyBwcm9taXNlOiBwYXVzZSB9ID0gZXhwbG9kZVByb21pc2U8dm9pZD4oKTtcblxuICAgIC8vIE5ldmVyIHJlc29sdmVzXG4gICAgY29uc3QgdGFzayA9ICgpID0+IHBhdXNlO1xuICAgIGNvbnN0IHRhc2tXaXRoVGltZW91dCA9IGNyZWF0ZVRhc2tXaXRoVGltZW91dCh0YXNrLCAnc3VzcGVuZC1zbG93LXRhc2snKTtcblxuICAgIGNvbnN0IHByb21pc2UgPSBhc3NlcnQuaXNSZWplY3RlZCh0YXNrV2l0aFRpbWVvdXQoKSk7XG5cbiAgICBzdXNwZW5kVGFza3NXaXRoVGltZW91dCgpO1xuXG4gICAgYXdhaXQgY2xvY2sucnVuVG9MYXN0QXN5bmMoKTtcblxuICAgIHJlc3VtZVRhc2tzV2l0aFRpbWVvdXQoKTtcblxuICAgIGF3YWl0IGNsb2NrLnJ1blRvTGFzdEFzeW5jKCk7XG5cbiAgICBhd2FpdCBwcm9taXNlO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixZQUF1QjtBQUV2QixtQkFBc0I7QUFDdEIsNEJBQStCO0FBQy9CLDZCQUdPO0FBRVAsU0FBUyx5QkFBeUIsTUFBTTtBQUN0QyxNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsY0FBVSxNQUFNLGNBQWM7QUFBQSxFQUNoQyxDQUFDO0FBRUQsWUFBVSxNQUFNO0FBQ2QsWUFBUSxRQUFRO0FBQUEsRUFDbEIsQ0FBQztBQUVELEtBQUcsa0NBQWtDLFlBQVk7QUFDL0MsVUFBTSxPQUFPLDZCQUFNLFFBQVEsUUFBUSxLQUFLLEdBQTNCO0FBQ2IsVUFBTSxrQkFBa0Isb0NBQXNCLE1BQU0sZ0JBQWdCO0FBRXBFLFVBQU0sU0FBUyxNQUFNLGdCQUFnQjtBQUNyQyx1QkFBTyxZQUFZLFFBQVEsS0FBSztBQUFBLEVBQ2xDLENBQUM7QUFFRCxLQUFHLGlDQUFpQyxZQUFZO0FBQzlDLFVBQU0sUUFBUSxJQUFJLE1BQU0sVUFBVTtBQUNsQyxVQUFNLE9BQU8sNkJBQU0sUUFBUSxPQUFPLEtBQUssR0FBMUI7QUFDYixVQUFNLGtCQUFrQixvQ0FBc0IsTUFBTSxnQkFBZ0I7QUFFcEUsVUFBTSxtQkFBTyxXQUFXLGdCQUFnQixHQUFHLFVBQVU7QUFBQSxFQUN2RCxDQUFDO0FBRUQsS0FBRyxzRUFBc0UsWUFBWTtBQUNuRixVQUFNLFFBQVEsUUFBUSxjQUFjO0FBRXBDLFVBQU0sRUFBRSxTQUFTLFVBQVUsMENBQXFCO0FBR2hELFVBQU0sT0FBTyw2QkFBTSxPQUFOO0FBQ2IsVUFBTSxrQkFBa0Isb0NBQXNCLE1BQU0sV0FBVztBQUUvRCxVQUFNLFVBQVUsbUJBQU8sV0FBVyxnQkFBZ0IsQ0FBQztBQUVuRCxVQUFNLE1BQU0sZUFBZTtBQUUzQixVQUFNO0FBQUEsRUFDUixDQUFDO0FBRUQsS0FBRyxtRUFBbUUsWUFBWTtBQUNoRixVQUFNLFFBQVEsUUFBUSxjQUFjO0FBRXBDLFVBQU0sUUFBUSxJQUFJLE1BQU0sbUJBQW1CO0FBQzNDLFVBQU0sT0FBTyw2QkFBTTtBQUNqQixZQUFNO0FBQUEsSUFDUixHQUZhO0FBR2IsVUFBTSxrQkFBa0Isb0NBQXNCLE1BQU0sZUFBZTtBQUNuRSxVQUFNLE1BQU0sZUFBZTtBQUMzQixVQUFNLG1CQUFPLFdBQVcsZ0JBQWdCLEdBQUcsbUJBQW1CO0FBQUEsRUFDaEUsQ0FBQztBQUVELEtBQUcsK0NBQStDLFlBQVk7QUFDNUQsVUFBTSxPQUFPLHdCQUFDLFFBQWdCLFFBQVEsUUFBUSxHQUFHLEdBQXBDO0FBQ2IsVUFBTSxrQkFBa0Isb0NBQXNCLE1BQU0sZ0JBQWdCO0FBRXBFLFVBQU0sU0FBUyxNQUFNLGdCQUFnQixLQUFLO0FBQzFDLHVCQUFPLFlBQVksUUFBUSxLQUFLO0FBQUEsRUFDbEMsQ0FBQztBQUVELEtBQUcsOEJBQThCLFlBQVk7QUFDM0MsVUFBTSxRQUFRLFFBQVEsY0FBYztBQUVwQyxRQUFJLFFBQVE7QUFFWixVQUFNLE9BQU8sbUNBQVk7QUFDdkIsY0FBUTtBQUNSLFlBQU0sd0JBQU0sR0FBRztBQUNmLGNBQVE7QUFDUixZQUFNLHdCQUFNLEdBQUc7QUFDZixjQUFRO0FBQUEsSUFDVixHQU5hO0FBT2IsVUFBTSxrQkFBa0Isb0NBQXNCLE1BQU0sZ0JBQWdCO0FBQUEsTUFDbEUsU0FBUztBQUFBLElBQ1gsQ0FBQztBQUVELFVBQU0sVUFBVSxnQkFBZ0I7QUFFaEMsdUJBQU8sWUFBWSxPQUFPLENBQUM7QUFFM0Isd0RBQXdCO0FBQ3hCLFVBQU0sTUFBTSxVQUFVLEdBQUc7QUFDekIsdUJBQU8sWUFBWSxPQUFPLENBQUM7QUFFM0IsdURBQXVCO0FBQ3ZCLFVBQU0sTUFBTSxVQUFVLEdBQUc7QUFDekIsdUJBQU8sWUFBWSxPQUFPLENBQUM7QUFFM0IsVUFBTTtBQUFBLEVBQ1IsQ0FBQztBQUVELEtBQUcsd0NBQXdDLFlBQVk7QUFDckQsVUFBTSxRQUFRLFFBQVEsY0FBYztBQUVwQyxVQUFNLEVBQUUsU0FBUyxVQUFVLDBDQUFxQjtBQUdoRCxVQUFNLE9BQU8sNkJBQU0sT0FBTjtBQUNiLFVBQU0sa0JBQWtCLG9DQUFzQixNQUFNLG1CQUFtQjtBQUV2RSxVQUFNLFVBQVUsbUJBQU8sV0FBVyxnQkFBZ0IsQ0FBQztBQUVuRCx3REFBd0I7QUFFeEIsVUFBTSxNQUFNLGVBQWU7QUFFM0IsdURBQXVCO0FBRXZCLFVBQU0sTUFBTSxlQUFlO0FBRTNCLFVBQU07QUFBQSxFQUNSLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
