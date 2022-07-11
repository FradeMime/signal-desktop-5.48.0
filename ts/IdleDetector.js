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
var IdleDetector_exports = {};
__export(IdleDetector_exports, {
  IdleDetector: () => IdleDetector
});
module.exports = __toCommonJS(IdleDetector_exports);
var import_events = __toESM(require("events"));
var log = __toESM(require("./logging/log"));
var import_clearTimeoutIfNecessary = require("./util/clearTimeoutIfNecessary");
const POLL_INTERVAL_MS = 5 * 1e3;
const IDLE_THRESHOLD_MS = 20;
class IdleDetector extends import_events.default {
  start() {
    log.info("Start idle detector");
    this.scheduleNextCallback();
  }
  stop() {
    if (!this.handle) {
      return;
    }
    log.info("Stop idle detector");
    this.clearScheduledCallbacks();
  }
  clearScheduledCallbacks() {
    if (this.handle) {
      cancelIdleCallback(this.handle);
      delete this.handle;
    }
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.timeoutId);
    delete this.timeoutId;
  }
  scheduleNextCallback() {
    this.clearScheduledCallbacks();
    this.handle = window.requestIdleCallback((deadline) => {
      const { didTimeout } = deadline;
      const timeRemaining = deadline.timeRemaining();
      const isIdle = timeRemaining >= IDLE_THRESHOLD_MS;
      this.timeoutId = setTimeout(() => this.scheduleNextCallback(), POLL_INTERVAL_MS);
      if (isIdle || didTimeout) {
        this.emit("idle", { timestamp: Date.now(), didTimeout, timeRemaining });
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  IdleDetector
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiSWRsZURldGVjdG9yLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IEV2ZW50RW1pdHRlciBmcm9tICdldmVudHMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuXG5jb25zdCBQT0xMX0lOVEVSVkFMX01TID0gNSAqIDEwMDA7XG5jb25zdCBJRExFX1RIUkVTSE9MRF9NUyA9IDIwO1xuXG5leHBvcnQgY2xhc3MgSWRsZURldGVjdG9yIGV4dGVuZHMgRXZlbnRFbWl0dGVyIHtcbiAgcHJpdmF0ZSBoYW5kbGU6IHVuZGVmaW5lZCB8IFJldHVyblR5cGU8dHlwZW9mIHJlcXVlc3RJZGxlQ2FsbGJhY2s+O1xuICBwcml2YXRlIHRpbWVvdXRJZDogdW5kZWZpbmVkIHwgUmV0dXJuVHlwZTx0eXBlb2Ygc2V0VGltZW91dD47XG5cbiAgcHVibGljIHN0YXJ0KCk6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdTdGFydCBpZGxlIGRldGVjdG9yJyk7XG4gICAgdGhpcy5zY2hlZHVsZU5leHRDYWxsYmFjaygpO1xuICB9XG5cbiAgcHVibGljIHN0b3AoKTogdm9pZCB7XG4gICAgaWYgKCF0aGlzLmhhbmRsZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdTdG9wIGlkbGUgZGV0ZWN0b3InKTtcbiAgICB0aGlzLmNsZWFyU2NoZWR1bGVkQ2FsbGJhY2tzKCk7XG4gIH1cblxuICBwcml2YXRlIGNsZWFyU2NoZWR1bGVkQ2FsbGJhY2tzKCkge1xuICAgIGlmICh0aGlzLmhhbmRsZSkge1xuICAgICAgY2FuY2VsSWRsZUNhbGxiYWNrKHRoaXMuaGFuZGxlKTtcbiAgICAgIGRlbGV0ZSB0aGlzLmhhbmRsZTtcbiAgICB9XG5cbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLnRpbWVvdXRJZCk7XG4gICAgZGVsZXRlIHRoaXMudGltZW91dElkO1xuICB9XG5cbiAgcHJpdmF0ZSBzY2hlZHVsZU5leHRDYWxsYmFjaygpIHtcbiAgICB0aGlzLmNsZWFyU2NoZWR1bGVkQ2FsbGJhY2tzKCk7XG4gICAgdGhpcy5oYW5kbGUgPSB3aW5kb3cucmVxdWVzdElkbGVDYWxsYmFjayhkZWFkbGluZSA9PiB7XG4gICAgICBjb25zdCB7IGRpZFRpbWVvdXQgfSA9IGRlYWRsaW5lO1xuICAgICAgY29uc3QgdGltZVJlbWFpbmluZyA9IGRlYWRsaW5lLnRpbWVSZW1haW5pbmcoKTtcbiAgICAgIGNvbnN0IGlzSWRsZSA9IHRpbWVSZW1haW5pbmcgPj0gSURMRV9USFJFU0hPTERfTVM7XG4gICAgICB0aGlzLnRpbWVvdXRJZCA9IHNldFRpbWVvdXQoXG4gICAgICAgICgpID0+IHRoaXMuc2NoZWR1bGVOZXh0Q2FsbGJhY2soKSxcbiAgICAgICAgUE9MTF9JTlRFUlZBTF9NU1xuICAgICAgKTtcbiAgICAgIGlmIChpc0lkbGUgfHwgZGlkVGltZW91dCkge1xuICAgICAgICB0aGlzLmVtaXQoJ2lkbGUnLCB7IHRpbWVzdGFtcDogRGF0ZS5ub3coKSwgZGlkVGltZW91dCwgdGltZVJlbWFpbmluZyB9KTtcbiAgICAgIH1cbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUN6QixVQUFxQjtBQUNyQixxQ0FBd0M7QUFFeEMsTUFBTSxtQkFBbUIsSUFBSTtBQUM3QixNQUFNLG9CQUFvQjtBQUVuQixNQUFNLHFCQUFxQixzQkFBYTtBQUFBLEVBSXRDLFFBQWM7QUFDbkIsUUFBSSxLQUFLLHFCQUFxQjtBQUM5QixTQUFLLHFCQUFxQjtBQUFBLEVBQzVCO0FBQUEsRUFFTyxPQUFhO0FBQ2xCLFFBQUksQ0FBQyxLQUFLLFFBQVE7QUFDaEI7QUFBQSxJQUNGO0FBRUEsUUFBSSxLQUFLLG9CQUFvQjtBQUM3QixTQUFLLHdCQUF3QjtBQUFBLEVBQy9CO0FBQUEsRUFFUSwwQkFBMEI7QUFDaEMsUUFBSSxLQUFLLFFBQVE7QUFDZix5QkFBbUIsS0FBSyxNQUFNO0FBQzlCLGFBQU8sS0FBSztBQUFBLElBQ2Q7QUFFQSxnRUFBd0IsS0FBSyxTQUFTO0FBQ3RDLFdBQU8sS0FBSztBQUFBLEVBQ2Q7QUFBQSxFQUVRLHVCQUF1QjtBQUM3QixTQUFLLHdCQUF3QjtBQUM3QixTQUFLLFNBQVMsT0FBTyxvQkFBb0IsY0FBWTtBQUNuRCxZQUFNLEVBQUUsZUFBZTtBQUN2QixZQUFNLGdCQUFnQixTQUFTLGNBQWM7QUFDN0MsWUFBTSxTQUFTLGlCQUFpQjtBQUNoQyxXQUFLLFlBQVksV0FDZixNQUFNLEtBQUsscUJBQXFCLEdBQ2hDLGdCQUNGO0FBQ0EsVUFBSSxVQUFVLFlBQVk7QUFDeEIsYUFBSyxLQUFLLFFBQVEsRUFBRSxXQUFXLEtBQUssSUFBSSxHQUFHLFlBQVksY0FBYyxDQUFDO0FBQUEsTUFDeEU7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUEzQ08iLAogICJuYW1lcyI6IFtdCn0K
