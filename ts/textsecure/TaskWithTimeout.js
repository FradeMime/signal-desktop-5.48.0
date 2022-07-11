var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var TaskWithTimeout_exports = {};
__export(TaskWithTimeout_exports, {
  default: () => createTaskWithTimeout,
  resumeTasksWithTimeout: () => resumeTasksWithTimeout,
  suspendTasksWithTimeout: () => suspendTasksWithTimeout
});
module.exports = __toCommonJS(TaskWithTimeout_exports);
var durations = __toESM(require("../util/durations"));
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_explodePromise = require("../util/explodePromise");
var import_errors = require("../types/errors");
var log = __toESM(require("../logging/log"));
const tasks = /* @__PURE__ */ new Set();
let shouldStartTimers = true;
function suspendTasksWithTimeout() {
  log.info(`TaskWithTimeout: suspending ${tasks.size} tasks`);
  shouldStartTimers = false;
  for (const task of tasks) {
    task.suspend();
  }
}
function resumeTasksWithTimeout() {
  log.info(`TaskWithTimeout: resuming ${tasks.size} tasks`);
  shouldStartTimers = true;
  for (const task of tasks) {
    task.resume();
  }
}
function createTaskWithTimeout(task, id, options = {}) {
  const timeout = options.timeout || 2 * durations.MINUTE;
  const timeoutError = new Error(`${id || ""} task did not complete in time.`);
  return async (...args) => {
    let complete = false;
    let timer;
    const { promise: timerPromise, reject } = (0, import_explodePromise.explodePromise)();
    const startTimer = /* @__PURE__ */ __name(() => {
      stopTimer();
      if (complete) {
        return;
      }
      timer = setTimeout(() => {
        if (complete) {
          return;
        }
        complete = true;
        tasks.delete(entry);
        log.error((0, import_errors.toLogFormat)(timeoutError));
        reject(timeoutError);
      }, timeout);
    }, "startTimer");
    const stopTimer = /* @__PURE__ */ __name(() => {
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timer);
      timer = void 0;
    }, "stopTimer");
    const entry = {
      suspend: stopTimer,
      resume: startTimer
    };
    tasks.add(entry);
    if (shouldStartTimers) {
      startTimer();
    }
    let result;
    const run = /* @__PURE__ */ __name(async () => {
      result = await task(...args);
    }, "run");
    try {
      await Promise.race([run(), timerPromise]);
      return result;
    } finally {
      complete = true;
      tasks.delete(entry);
      stopTimer();
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  resumeTasksWithTimeout,
  suspendTasksWithTimeout
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGFza1dpdGhUaW1lb3V0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGNsZWFyVGltZW91dElmTmVjZXNzYXJ5IH0gZnJvbSAnLi4vdXRpbC9jbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSc7XG5pbXBvcnQgeyBleHBsb2RlUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvZXhwbG9kZVByb21pc2UnO1xuaW1wb3J0IHsgdG9Mb2dGb3JtYXQgfSBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcblxudHlwZSBUYXNrVHlwZSA9IHtcbiAgc3VzcGVuZCgpOiB2b2lkO1xuICByZXN1bWUoKTogdm9pZDtcbn07XG5cbmNvbnN0IHRhc2tzID0gbmV3IFNldDxUYXNrVHlwZT4oKTtcbmxldCBzaG91bGRTdGFydFRpbWVycyA9IHRydWU7XG5cbmV4cG9ydCBmdW5jdGlvbiBzdXNwZW5kVGFza3NXaXRoVGltZW91dCgpOiB2b2lkIHtcbiAgbG9nLmluZm8oYFRhc2tXaXRoVGltZW91dDogc3VzcGVuZGluZyAke3Rhc2tzLnNpemV9IHRhc2tzYCk7XG4gIHNob3VsZFN0YXJ0VGltZXJzID0gZmFsc2U7XG4gIGZvciAoY29uc3QgdGFzayBvZiB0YXNrcykge1xuICAgIHRhc2suc3VzcGVuZCgpO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXN1bWVUYXNrc1dpdGhUaW1lb3V0KCk6IHZvaWQge1xuICBsb2cuaW5mbyhgVGFza1dpdGhUaW1lb3V0OiByZXN1bWluZyAke3Rhc2tzLnNpemV9IHRhc2tzYCk7XG4gIHNob3VsZFN0YXJ0VGltZXJzID0gdHJ1ZTtcbiAgZm9yIChjb25zdCB0YXNrIG9mIHRhc2tzKSB7XG4gICAgdGFzay5yZXN1bWUoKTtcbiAgfVxufVxuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiBjcmVhdGVUYXNrV2l0aFRpbWVvdXQ8VCwgQXJncyBleHRlbmRzIEFycmF5PHVua25vd24+PihcbiAgdGFzazogKC4uLmFyZ3M6IEFyZ3MpID0+IFByb21pc2U8VD4sXG4gIGlkOiBzdHJpbmcsXG4gIG9wdGlvbnM6IHsgdGltZW91dD86IG51bWJlciB9ID0ge31cbik6ICguLi5hcmdzOiBBcmdzKSA9PiBQcm9taXNlPFQ+IHtcbiAgY29uc3QgdGltZW91dCA9IG9wdGlvbnMudGltZW91dCB8fCAyICogZHVyYXRpb25zLk1JTlVURTtcblxuICBjb25zdCB0aW1lb3V0RXJyb3IgPSBuZXcgRXJyb3IoYCR7aWQgfHwgJyd9IHRhc2sgZGlkIG5vdCBjb21wbGV0ZSBpbiB0aW1lLmApO1xuXG4gIHJldHVybiBhc3luYyAoLi4uYXJnczogQXJncykgPT4ge1xuICAgIGxldCBjb21wbGV0ZSA9IGZhbHNlO1xuXG4gICAgbGV0IHRpbWVyOiBOb2RlSlMuVGltZW91dCB8IHVuZGVmaW5lZDtcblxuICAgIGNvbnN0IHsgcHJvbWlzZTogdGltZXJQcm9taXNlLCByZWplY3QgfSA9IGV4cGxvZGVQcm9taXNlPG5ldmVyPigpO1xuXG4gICAgY29uc3Qgc3RhcnRUaW1lciA9ICgpID0+IHtcbiAgICAgIHN0b3BUaW1lcigpO1xuXG4gICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICB0aW1lciA9IHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgICBpZiAoY29tcGxldGUpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29tcGxldGUgPSB0cnVlO1xuICAgICAgICB0YXNrcy5kZWxldGUoZW50cnkpO1xuXG4gICAgICAgIGxvZy5lcnJvcih0b0xvZ0Zvcm1hdCh0aW1lb3V0RXJyb3IpKTtcbiAgICAgICAgcmVqZWN0KHRpbWVvdXRFcnJvcik7XG4gICAgICB9LCB0aW1lb3V0KTtcbiAgICB9O1xuXG4gICAgY29uc3Qgc3RvcFRpbWVyID0gKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkodGltZXIpO1xuICAgICAgdGltZXIgPSB1bmRlZmluZWQ7XG4gICAgfTtcblxuICAgIGNvbnN0IGVudHJ5OiBUYXNrVHlwZSA9IHtcbiAgICAgIHN1c3BlbmQ6IHN0b3BUaW1lcixcbiAgICAgIHJlc3VtZTogc3RhcnRUaW1lcixcbiAgICB9O1xuXG4gICAgdGFza3MuYWRkKGVudHJ5KTtcbiAgICBpZiAoc2hvdWxkU3RhcnRUaW1lcnMpIHtcbiAgICAgIHN0YXJ0VGltZXIoKTtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0OiB1bmtub3duO1xuXG4gICAgY29uc3QgcnVuID0gYXN5bmMgKCk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgdGFzayguLi5hcmdzKTtcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IFByb21pc2UucmFjZShbcnVuKCksIHRpbWVyUHJvbWlzZV0pO1xuXG4gICAgICByZXR1cm4gcmVzdWx0IGFzIFQ7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGNvbXBsZXRlID0gdHJ1ZTtcbiAgICAgIHRhc2tzLmRlbGV0ZShlbnRyeSk7XG4gICAgICBzdG9wVGltZXIoKTtcbiAgICB9XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGdCQUEyQjtBQUMzQixxQ0FBd0M7QUFDeEMsNEJBQStCO0FBQy9CLG9CQUE0QjtBQUM1QixVQUFxQjtBQU9yQixNQUFNLFFBQVEsb0JBQUksSUFBYztBQUNoQyxJQUFJLG9CQUFvQjtBQUVqQixtQ0FBeUM7QUFDOUMsTUFBSSxLQUFLLCtCQUErQixNQUFNLFlBQVk7QUFDMUQsc0JBQW9CO0FBQ3BCLGFBQVcsUUFBUSxPQUFPO0FBQ3hCLFNBQUssUUFBUTtBQUFBLEVBQ2Y7QUFDRjtBQU5nQixBQVFULGtDQUF3QztBQUM3QyxNQUFJLEtBQUssNkJBQTZCLE1BQU0sWUFBWTtBQUN4RCxzQkFBb0I7QUFDcEIsYUFBVyxRQUFRLE9BQU87QUFDeEIsU0FBSyxPQUFPO0FBQUEsRUFDZDtBQUNGO0FBTmdCLEFBUUQsK0JBQ2IsTUFDQSxJQUNBLFVBQWdDLENBQUMsR0FDRjtBQUMvQixRQUFNLFVBQVUsUUFBUSxXQUFXLElBQUksVUFBVTtBQUVqRCxRQUFNLGVBQWUsSUFBSSxNQUFNLEdBQUcsTUFBTSxtQ0FBbUM7QUFFM0UsU0FBTyxVQUFVLFNBQWU7QUFDOUIsUUFBSSxXQUFXO0FBRWYsUUFBSTtBQUVKLFVBQU0sRUFBRSxTQUFTLGNBQWMsV0FBVywwQ0FBc0I7QUFFaEUsVUFBTSxhQUFhLDZCQUFNO0FBQ3ZCLGdCQUFVO0FBRVYsVUFBSSxVQUFVO0FBQ1o7QUFBQSxNQUNGO0FBRUEsY0FBUSxXQUFXLE1BQU07QUFDdkIsWUFBSSxVQUFVO0FBQ1o7QUFBQSxRQUNGO0FBQ0EsbUJBQVc7QUFDWCxjQUFNLE9BQU8sS0FBSztBQUVsQixZQUFJLE1BQU0sK0JBQVksWUFBWSxDQUFDO0FBQ25DLGVBQU8sWUFBWTtBQUFBLE1BQ3JCLEdBQUcsT0FBTztBQUFBLElBQ1osR0FqQm1CO0FBbUJuQixVQUFNLFlBQVksNkJBQU07QUFDdEIsa0VBQXdCLEtBQUs7QUFDN0IsY0FBUTtBQUFBLElBQ1YsR0FIa0I7QUFLbEIsVUFBTSxRQUFrQjtBQUFBLE1BQ3RCLFNBQVM7QUFBQSxNQUNULFFBQVE7QUFBQSxJQUNWO0FBRUEsVUFBTSxJQUFJLEtBQUs7QUFDZixRQUFJLG1CQUFtQjtBQUNyQixpQkFBVztBQUFBLElBQ2I7QUFFQSxRQUFJO0FBRUosVUFBTSxNQUFNLG1DQUEyQjtBQUNyQyxlQUFTLE1BQU0sS0FBSyxHQUFHLElBQUk7QUFBQSxJQUM3QixHQUZZO0FBSVosUUFBSTtBQUNGLFlBQU0sUUFBUSxLQUFLLENBQUMsSUFBSSxHQUFHLFlBQVksQ0FBQztBQUV4QyxhQUFPO0FBQUEsSUFDVCxVQUFFO0FBQ0EsaUJBQVc7QUFDWCxZQUFNLE9BQU8sS0FBSztBQUNsQixnQkFBVTtBQUFBLElBQ1o7QUFBQSxFQUNGO0FBQ0Y7QUFsRXdCIiwKICAibmFtZXMiOiBbXQp9Cg==
