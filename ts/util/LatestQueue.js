var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var LatestQueue_exports = {};
__export(LatestQueue_exports, {
  LatestQueue: () => LatestQueue
});
module.exports = __toCommonJS(LatestQueue_exports);
class LatestQueue {
  constructor() {
    this.isRunning = false;
    this.onceEmptyCallbacks = [];
  }
  add(task) {
    if (this.isRunning) {
      this.queuedTask = task;
    } else {
      this.isRunning = true;
      task().finally(() => {
        this.isRunning = false;
        const { queuedTask } = this;
        if (queuedTask) {
          this.queuedTask = void 0;
          this.add(queuedTask);
        } else {
          try {
            this.onceEmptyCallbacks.forEach((callback) => {
              callback();
            });
          } finally {
            this.onceEmptyCallbacks = [];
          }
        }
      });
    }
  }
  onceEmpty(callback) {
    this.onceEmptyCallbacks.push(callback);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LatestQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGF0ZXN0UXVldWUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyoqXG4gKiBUaGlzIGNsYXNzIHRyaWVzIHRvIGVuZm9yY2UgYSBzdGF0ZSBtYWNoaW5lIHRoYXQgbG9va3Mgc29tZXRoaW5nIGxpa2UgdGhpczpcbiAqXG4gKiAuLS0tLS0tLS0tLS0tLS0tLS0tLS0uICBjYWxsZWQgICAuLS0tLS0tLS0tLS0uICBjYWxsZWQgIC4tLS0tLS0tLS0tLS0tLS0tLS0tLS0uXG4gKiB8ICAgICAgICAgICAgICAgICAgICB8IC0tLS0tLS0tPiB8ICAgICAgICAgICB8IC0tLS0tLS0+IHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiB8IE5vdGhpbmcgaXMgcnVubmluZyB8ICAgICAgICAgICB8IDEgcnVubmluZyB8ICAgICAgICAgIHwgMSBydW5uaW5nLCAxIHF1ZXVlZCB8XG4gKiB8ICAgICAgICAgICAgICAgICAgICB8IDwtLS0tLS0tLSB8ICAgICAgICAgICB8IDwtLS0tLS0tIHwgICAgICAgICAgICAgICAgICAgICB8XG4gKiAnLS0tLS0tLS0tLS0tLS0tLS0tLS0nICAgZG9uZSAgICAnLS0tLS0tLS0tLS0nICAgZG9uZSAgICctLS0tLS0tLS0tLS0tLS0tLS0tLS0nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICBeXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAnLS0tLS0tLS0tLS0nXG4gKiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYWxsZWRcbiAqXG4gKiBNb3N0IG5vdGFibHksIGlmIHNvbWV0aGluZyBpcyBxdWV1ZWQgYW5kIHRoZSBmdW5jdGlvbiBpcyBjYWxsZWQgYWdhaW4sIHdlIGRpc2NhcmQgdGhlXG4gKiAgIHByZXZpb3VzbHkgcXVldWVkIHRhc2sgY29tcGxldGVseS5cbiAqL1xuZXhwb3J0IGNsYXNzIExhdGVzdFF1ZXVlIHtcbiAgcHJpdmF0ZSBpc1J1bm5pbmc6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSBxdWV1ZWRUYXNrPzogKCkgPT4gUHJvbWlzZTx2b2lkPjtcblxuICBwcml2YXRlIG9uY2VFbXB0eUNhbGxiYWNrczogQXJyYXk8KCkgPT4gdW5rbm93bj47XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5pc1J1bm5pbmcgPSBmYWxzZTtcbiAgICB0aGlzLm9uY2VFbXB0eUNhbGxiYWNrcyA9IFtdO1xuICB9XG5cbiAgLyoqXG4gICAqIERvZXMgb25lIG9mIHRoZSBmb2xsb3dpbmc6XG4gICAqXG4gICAqIDEuIFJ1bnMgdGhlIHRhc2sgaW1tZWRpYXRlbHkuXG4gICAqIDIuIEVucXVldWVzIHRoZSB0YXNrLCBkZXN0cm95aW5nIGFueSBwcmV2aW91c2x5LWVucXVldWVkIHRhc2suIEluIG90aGVyIHdvcmRzLCAwIG9yIDFcbiAgICogICAgdGFza3Mgd2lsbCBiZSBlbnF1ZXVlZCBhdCBhIHRpbWUuXG4gICAqL1xuICBhZGQodGFzazogKCkgPT4gUHJvbWlzZTx2b2lkPik6IHZvaWQge1xuICAgIGlmICh0aGlzLmlzUnVubmluZykge1xuICAgICAgdGhpcy5xdWV1ZWRUYXNrID0gdGFzaztcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5pc1J1bm5pbmcgPSB0cnVlO1xuICAgICAgdGFzaygpLmZpbmFsbHkoKCkgPT4ge1xuICAgICAgICB0aGlzLmlzUnVubmluZyA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHsgcXVldWVkVGFzayB9ID0gdGhpcztcbiAgICAgICAgaWYgKHF1ZXVlZFRhc2spIHtcbiAgICAgICAgICB0aGlzLnF1ZXVlZFRhc2sgPSB1bmRlZmluZWQ7XG4gICAgICAgICAgdGhpcy5hZGQocXVldWVkVGFzayk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgdHJ5IHtcbiAgICAgICAgICAgIHRoaXMub25jZUVtcHR5Q2FsbGJhY2tzLmZvckVhY2goY2FsbGJhY2sgPT4ge1xuICAgICAgICAgICAgICBjYWxsYmFjaygpO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfSBmaW5hbGx5IHtcbiAgICAgICAgICAgIHRoaXMub25jZUVtcHR5Q2FsbGJhY2tzID0gW107XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogQWRkcyBhIGNhbGxiYWNrIHRvIGJlIGNhbGxlZCB0aGUgZmlyc3QgdGltZSB0aGUgcXVldWUgZ29lcyBmcm9tIFwicnVubmluZ1wiIHRvIFwiZW1wdHlcIi5cbiAgICovXG4gIG9uY2VFbXB0eShjYWxsYmFjazogKCkgPT4gdW5rbm93bik6IHZvaWQge1xuICAgIHRoaXMub25jZUVtcHR5Q2FsbGJhY2tzLnB1c2goY2FsbGJhY2spO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBa0JPLE1BQU0sWUFBWTtBQUFBLEVBT3ZCLGNBQWM7QUFDWixTQUFLLFlBQVk7QUFDakIsU0FBSyxxQkFBcUIsQ0FBQztBQUFBLEVBQzdCO0FBQUEsRUFTQSxJQUFJLE1BQWlDO0FBQ25DLFFBQUksS0FBSyxXQUFXO0FBQ2xCLFdBQUssYUFBYTtBQUFBLElBQ3BCLE9BQU87QUFDTCxXQUFLLFlBQVk7QUFDakIsV0FBSyxFQUFFLFFBQVEsTUFBTTtBQUNuQixhQUFLLFlBQVk7QUFFakIsY0FBTSxFQUFFLGVBQWU7QUFDdkIsWUFBSSxZQUFZO0FBQ2QsZUFBSyxhQUFhO0FBQ2xCLGVBQUssSUFBSSxVQUFVO0FBQUEsUUFDckIsT0FBTztBQUNMLGNBQUk7QUFDRixpQkFBSyxtQkFBbUIsUUFBUSxjQUFZO0FBQzFDLHVCQUFTO0FBQUEsWUFDWCxDQUFDO0FBQUEsVUFDSCxVQUFFO0FBQ0EsaUJBQUsscUJBQXFCLENBQUM7QUFBQSxVQUM3QjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUFBLEVBS0EsVUFBVSxVQUErQjtBQUN2QyxTQUFLLG1CQUFtQixLQUFLLFFBQVE7QUFBQSxFQUN2QztBQUNGO0FBbERPIiwKICAibmFtZXMiOiBbXQp9Cg==
