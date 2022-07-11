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
var TestJobQueueStore_exports = {};
__export(TestJobQueueStore_exports, {
  TestJobQueueStore: () => TestJobQueueStore
});
module.exports = __toCommonJS(TestJobQueueStore_exports);
var import_events = __toESM(require("events"));
var import_sleep = require("../../util/sleep");
class TestJobQueueStore {
  constructor(jobs = []) {
    this.events = new import_events.default();
    this.openStreams = /* @__PURE__ */ new Set();
    this.pipes = /* @__PURE__ */ new Map();
    this.storedJobs = [];
    jobs.forEach((job) => {
      this.insert(job);
    });
  }
  async insert(job, { shouldPersist = true } = {}) {
    await fakeDelay();
    this.storedJobs.forEach((storedJob) => {
      if (job.id === storedJob.id) {
        throw new Error("Cannot store two jobs with the same ID");
      }
    });
    if (shouldPersist) {
      this.storedJobs.push(job);
    }
    this.getPipe(job.queueType).add(job);
    this.events.emit("insert");
  }
  async delete(id) {
    await fakeDelay();
    this.storedJobs = this.storedJobs.filter((job) => job.id !== id);
    this.events.emit("delete");
  }
  stream(queueType) {
    if (this.openStreams.has(queueType)) {
      throw new Error("Cannot stream the same queueType more than once");
    }
    this.openStreams.add(queueType);
    return this.getPipe(queueType);
  }
  pauseStream(queueType) {
    return this.getPipe(queueType).pause();
  }
  resumeStream(queueType) {
    return this.getPipe(queueType).resume();
  }
  getPipe(queueType) {
    const existingPipe = this.pipes.get(queueType);
    if (existingPipe) {
      return existingPipe;
    }
    const result = new Pipe();
    this.pipes.set(queueType, result);
    return result;
  }
}
class Pipe {
  constructor() {
    this.queue = [];
    this.eventEmitter = new import_events.default();
    this.isLocked = false;
    this.isPaused = false;
  }
  add(value) {
    this.queue.push(value);
    this.eventEmitter.emit("add");
  }
  async *[Symbol.asyncIterator]() {
    if (this.isLocked) {
      throw new Error("Cannot iterate over a pipe more than once");
    }
    this.isLocked = true;
    while (true) {
      for (const value of this.queue) {
        await this.waitForUnpaused();
        yield value;
      }
      this.queue = [];
      await (0, import_events.once)(this.eventEmitter, "add");
    }
  }
  pause() {
    this.isPaused = true;
  }
  resume() {
    this.isPaused = false;
    this.eventEmitter.emit("resume");
  }
  async waitForUnpaused() {
    if (this.isPaused) {
      await (0, import_events.once)(this.eventEmitter, "resume");
    }
  }
}
function fakeDelay() {
  return (0, import_sleep.sleep)(0);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TestJobQueueStore
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGVzdEpvYlF1ZXVlU3RvcmUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbWF4LWNsYXNzZXMtcGVyLWZpbGUgKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWF3YWl0LWluLWxvb3AgKi9cblxuaW1wb3J0IEV2ZW50RW1pdHRlciwgeyBvbmNlIH0gZnJvbSAnZXZlbnRzJztcblxuaW1wb3J0IHR5cGUgeyBKb2JRdWV1ZVN0b3JlLCBTdG9yZWRKb2IgfSBmcm9tICcuLi8uLi9qb2JzL3R5cGVzJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5cbmV4cG9ydCBjbGFzcyBUZXN0Sm9iUXVldWVTdG9yZSBpbXBsZW1lbnRzIEpvYlF1ZXVlU3RvcmUge1xuICBldmVudHMgPSBuZXcgRXZlbnRFbWl0dGVyKCk7XG5cbiAgcHJpdmF0ZSBvcGVuU3RyZWFtcyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuXG4gIHByaXZhdGUgcGlwZXMgPSBuZXcgTWFwPHN0cmluZywgUGlwZT4oKTtcblxuICBzdG9yZWRKb2JzOiBBcnJheTxTdG9yZWRKb2I+ID0gW107XG5cbiAgY29uc3RydWN0b3Ioam9iczogUmVhZG9ubHlBcnJheTxTdG9yZWRKb2I+ID0gW10pIHtcbiAgICBqb2JzLmZvckVhY2goam9iID0+IHtcbiAgICAgIHRoaXMuaW5zZXJ0KGpvYik7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBpbnNlcnQoXG4gICAgam9iOiBSZWFkb25seTxTdG9yZWRKb2I+LFxuICAgIHsgc2hvdWxkUGVyc2lzdCA9IHRydWUgfTogUmVhZG9ubHk8eyBzaG91bGRQZXJzaXN0PzogYm9vbGVhbiB9PiA9IHt9XG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGF3YWl0IGZha2VEZWxheSgpO1xuXG4gICAgdGhpcy5zdG9yZWRKb2JzLmZvckVhY2goc3RvcmVkSm9iID0+IHtcbiAgICAgIGlmIChqb2IuaWQgPT09IHN0b3JlZEpvYi5pZCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBzdG9yZSB0d28gam9icyB3aXRoIHRoZSBzYW1lIElEJyk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpZiAoc2hvdWxkUGVyc2lzdCkge1xuICAgICAgdGhpcy5zdG9yZWRKb2JzLnB1c2goam9iKTtcbiAgICB9XG5cbiAgICB0aGlzLmdldFBpcGUoam9iLnF1ZXVlVHlwZSkuYWRkKGpvYik7XG5cbiAgICB0aGlzLmV2ZW50cy5lbWl0KCdpbnNlcnQnKTtcbiAgfVxuXG4gIGFzeW5jIGRlbGV0ZShpZDogc3RyaW5nKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgZmFrZURlbGF5KCk7XG5cbiAgICB0aGlzLnN0b3JlZEpvYnMgPSB0aGlzLnN0b3JlZEpvYnMuZmlsdGVyKGpvYiA9PiBqb2IuaWQgIT09IGlkKTtcblxuICAgIHRoaXMuZXZlbnRzLmVtaXQoJ2RlbGV0ZScpO1xuICB9XG5cbiAgc3RyZWFtKHF1ZXVlVHlwZTogc3RyaW5nKTogUGlwZSB7XG4gICAgaWYgKHRoaXMub3BlblN0cmVhbXMuaGFzKHF1ZXVlVHlwZSkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IHN0cmVhbSB0aGUgc2FtZSBxdWV1ZVR5cGUgbW9yZSB0aGFuIG9uY2UnKTtcbiAgICB9XG4gICAgdGhpcy5vcGVuU3RyZWFtcy5hZGQocXVldWVUeXBlKTtcblxuICAgIHJldHVybiB0aGlzLmdldFBpcGUocXVldWVUeXBlKTtcbiAgfVxuXG4gIHBhdXNlU3RyZWFtKHF1ZXVlVHlwZTogc3RyaW5nKTogdm9pZCB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0UGlwZShxdWV1ZVR5cGUpLnBhdXNlKCk7XG4gIH1cblxuICByZXN1bWVTdHJlYW0ocXVldWVUeXBlOiBzdHJpbmcpOiB2b2lkIHtcbiAgICByZXR1cm4gdGhpcy5nZXRQaXBlKHF1ZXVlVHlwZSkucmVzdW1lKCk7XG4gIH1cblxuICBwcml2YXRlIGdldFBpcGUocXVldWVUeXBlOiBzdHJpbmcpOiBQaXBlIHtcbiAgICBjb25zdCBleGlzdGluZ1BpcGUgPSB0aGlzLnBpcGVzLmdldChxdWV1ZVR5cGUpO1xuICAgIGlmIChleGlzdGluZ1BpcGUpIHtcbiAgICAgIHJldHVybiBleGlzdGluZ1BpcGU7XG4gICAgfVxuXG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IFBpcGUoKTtcbiAgICB0aGlzLnBpcGVzLnNldChxdWV1ZVR5cGUsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5jbGFzcyBQaXBlIGltcGxlbWVudHMgQXN5bmNJdGVyYWJsZTxTdG9yZWRKb2I+IHtcbiAgcHJpdmF0ZSBxdWV1ZTogQXJyYXk8U3RvcmVkSm9iPiA9IFtdO1xuXG4gIHByaXZhdGUgZXZlbnRFbWl0dGVyID0gbmV3IEV2ZW50RW1pdHRlcigpO1xuXG4gIHByaXZhdGUgaXNMb2NrZWQgPSBmYWxzZTtcblxuICBwcml2YXRlIGlzUGF1c2VkID0gZmFsc2U7XG5cbiAgYWRkKHZhbHVlOiBSZWFkb25seTxTdG9yZWRKb2I+KSB7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKHZhbHVlKTtcbiAgICB0aGlzLmV2ZW50RW1pdHRlci5lbWl0KCdhZGQnKTtcbiAgfVxuXG4gIGFzeW5jICpbU3ltYm9sLmFzeW5jSXRlcmF0b3JdKCkge1xuICAgIGlmICh0aGlzLmlzTG9ja2VkKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0Nhbm5vdCBpdGVyYXRlIG92ZXIgYSBwaXBlIG1vcmUgdGhhbiBvbmNlJyk7XG4gICAgfVxuICAgIHRoaXMuaXNMb2NrZWQgPSB0cnVlO1xuXG4gICAgd2hpbGUgKHRydWUpIHtcbiAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgdGhpcy5xdWV1ZSkge1xuICAgICAgICBhd2FpdCB0aGlzLndhaXRGb3JVbnBhdXNlZCgpO1xuICAgICAgICB5aWVsZCB2YWx1ZTtcbiAgICAgIH1cbiAgICAgIHRoaXMucXVldWUgPSBbXTtcblxuICAgICAgLy8gV2UgZG8gdGhpcyBiZWNhdXNlIHdlIHdhbnQgdG8geWllbGQgdmFsdWVzIGluIHNlcmllcy5cbiAgICAgIGF3YWl0IG9uY2UodGhpcy5ldmVudEVtaXR0ZXIsICdhZGQnKTtcbiAgICB9XG4gIH1cblxuICBwYXVzZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzUGF1c2VkID0gdHJ1ZTtcbiAgfVxuXG4gIHJlc3VtZSgpOiB2b2lkIHtcbiAgICB0aGlzLmlzUGF1c2VkID0gZmFsc2U7XG4gICAgdGhpcy5ldmVudEVtaXR0ZXIuZW1pdCgncmVzdW1lJyk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHdhaXRGb3JVbnBhdXNlZCgpIHtcbiAgICBpZiAodGhpcy5pc1BhdXNlZCkge1xuICAgICAgYXdhaXQgb25jZSh0aGlzLmV2ZW50RW1pdHRlciwgJ3Jlc3VtZScpO1xuICAgIH1cbiAgfVxufVxuXG5mdW5jdGlvbiBmYWtlRGVsYXkoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBzbGVlcCgwKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFNQSxvQkFBbUM7QUFHbkMsbUJBQXNCO0FBRWYsTUFBTSxrQkFBMkM7QUFBQSxFQVN0RCxZQUFZLE9BQWlDLENBQUMsR0FBRztBQVJqRCxrQkFBUyxJQUFJLHNCQUFhO0FBRWxCLHVCQUFjLG9CQUFJLElBQVk7QUFFOUIsaUJBQVEsb0JBQUksSUFBa0I7QUFFdEMsc0JBQStCLENBQUM7QUFHOUIsU0FBSyxRQUFRLFNBQU87QUFDbEIsV0FBSyxPQUFPLEdBQUc7QUFBQSxJQUNqQixDQUFDO0FBQUEsRUFDSDtBQUFBLFFBRU0sT0FDSixLQUNBLEVBQUUsZ0JBQWdCLFNBQWdELENBQUMsR0FDcEQ7QUFDZixVQUFNLFVBQVU7QUFFaEIsU0FBSyxX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
