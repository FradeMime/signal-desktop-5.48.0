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
var EventTarget_exports = {};
__export(EventTarget_exports, {
  default: () => EventTarget
});
module.exports = __toCommonJS(EventTarget_exports);
class EventTarget {
  dispatchEvent(ev) {
    if (!(ev instanceof Event)) {
      throw new Error("Expects an event");
    }
    if (this.listeners === null || typeof this.listeners !== "object") {
      this.listeners = {};
    }
    const listeners = this.listeners[ev.type];
    const results = [];
    if (typeof listeners === "object") {
      const max = listeners.length;
      for (let i = 0; i < max; i += 1) {
        const listener = listeners[i];
        if (typeof listener === "function") {
          results.push(listener.call(null, ev));
        }
      }
    }
    return results;
  }
  addEventListener(eventName, callback) {
    if (typeof eventName !== "string") {
      throw new Error("First argument expects a string");
    }
    if (typeof callback !== "function") {
      throw new Error("Second argument expects a function");
    }
    if (this.listeners === null || typeof this.listeners !== "object") {
      this.listeners = {};
    }
    let listeners = this.listeners[eventName];
    if (typeof listeners !== "object") {
      listeners = [];
    }
    listeners.push(callback);
    this.listeners[eventName] = listeners;
  }
  removeEventListener(eventName, callback) {
    if (typeof eventName !== "string") {
      throw new Error("First argument expects a string");
    }
    if (typeof callback !== "function") {
      throw new Error("Second argument expects a function");
    }
    if (this.listeners === null || typeof this.listeners !== "object") {
      this.listeners = {};
    }
    const listeners = this.listeners[eventName];
    if (typeof listeners === "object") {
      for (let i = 0; i < listeners.length; i += 1) {
        if (listeners[i] === callback) {
          listeners.splice(i, 1);
          return;
        }
      }
    }
    this.listeners[eventName] = listeners;
  }
  extend(source) {
    const target = this;
    for (const prop in source) {
      target[prop] = source[prop];
    }
    return target;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXZlbnRUYXJnZXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzICovXG4vKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG4vKiBlc2xpbnQtZGlzYWJsZSBndWFyZC1mb3ItaW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLXJlc3RyaWN0ZWQtc3ludGF4ICovXG5cbi8qXG4gKiBJbXBsZW1lbnRzIEV2ZW50VGFyZ2V0XG4gKiBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9BUEkvRXZlbnRUYXJnZXRcbiAqL1xuXG5leHBvcnQgdHlwZSBFdmVudEhhbmRsZXIgPSAoZXZlbnQ6IGFueSkgPT4gdW5rbm93bjtcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgRXZlbnRUYXJnZXQge1xuICBsaXN0ZW5lcnM/OiB7IFt0eXBlOiBzdHJpbmddOiBBcnJheTxFdmVudEhhbmRsZXI+IH07XG5cbiAgZGlzcGF0Y2hFdmVudChldjogRXZlbnQpOiBBcnJheTx1bmtub3duPiB7XG4gICAgaWYgKCEoZXYgaW5zdGFuY2VvZiBFdmVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0cyBhbiBldmVudCcpO1xuICAgIH1cbiAgICBpZiAodGhpcy5saXN0ZW5lcnMgPT09IG51bGwgfHwgdHlwZW9mIHRoaXMubGlzdGVuZXJzICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgY29uc3QgbGlzdGVuZXJzID0gdGhpcy5saXN0ZW5lcnNbZXYudHlwZV07XG4gICAgY29uc3QgcmVzdWx0cyA9IFtdO1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgY29uc3QgbWF4ID0gbGlzdGVuZXJzLmxlbmd0aDtcbiAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4OyBpICs9IDEpIHtcbiAgICAgICAgY29uc3QgbGlzdGVuZXIgPSBsaXN0ZW5lcnNbaV07XG4gICAgICAgIGlmICh0eXBlb2YgbGlzdGVuZXIgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICByZXN1bHRzLnB1c2gobGlzdGVuZXIuY2FsbChudWxsLCBldikpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiByZXN1bHRzO1xuICB9XG5cbiAgYWRkRXZlbnRMaXN0ZW5lcihldmVudE5hbWU6IHN0cmluZywgY2FsbGJhY2s6IEV2ZW50SGFuZGxlcik6IHZvaWQge1xuICAgIGlmICh0eXBlb2YgZXZlbnROYW1lICE9PSAnc3RyaW5nJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdGaXJzdCBhcmd1bWVudCBleHBlY3RzIGEgc3RyaW5nJyk7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgY2FsbGJhY2sgIT09ICdmdW5jdGlvbicpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2Vjb25kIGFyZ3VtZW50IGV4cGVjdHMgYSBmdW5jdGlvbicpO1xuICAgIH1cbiAgICBpZiAodGhpcy5saXN0ZW5lcnMgPT09IG51bGwgfHwgdHlwZW9mIHRoaXMubGlzdGVuZXJzICE9PSAnb2JqZWN0Jykge1xuICAgICAgdGhpcy5saXN0ZW5lcnMgPSB7fTtcbiAgICB9XG4gICAgbGV0IGxpc3RlbmVycyA9IHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV07XG4gICAgaWYgKHR5cGVvZiBsaXN0ZW5lcnMgIT09ICdvYmplY3QnKSB7XG4gICAgICBsaXN0ZW5lcnMgPSBbXTtcbiAgICB9XG4gICAgbGlzdGVuZXJzLnB1c2goY2FsbGJhY2spO1xuICAgIHRoaXMubGlzdGVuZXJzW2V2ZW50TmFtZV0gPSBsaXN0ZW5lcnM7XG4gIH1cblxuICByZW1vdmVFdmVudExpc3RlbmVyKGV2ZW50TmFtZTogc3RyaW5nLCBjYWxsYmFjazogRXZlbnRIYW5kbGVyKTogdm9pZCB7XG4gICAgaWYgKHR5cGVvZiBldmVudE5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ZpcnN0IGFyZ3VtZW50IGV4cGVjdHMgYSBzdHJpbmcnKTtcbiAgICB9XG4gICAgaWYgKHR5cGVvZiBjYWxsYmFjayAhPT0gJ2Z1bmN0aW9uJykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdTZWNvbmQgYXJndW1lbnQgZXhwZWN0cyBhIGZ1bmN0aW9uJyk7XG4gICAgfVxuICAgIGlmICh0aGlzLmxpc3RlbmVycyA9PT0gbnVsbCB8fCB0eXBlb2YgdGhpcy5saXN0ZW5lcnMgIT09ICdvYmplY3QnKSB7XG4gICAgICB0aGlzLmxpc3RlbmVycyA9IHt9O1xuICAgIH1cbiAgICBjb25zdCBsaXN0ZW5lcnMgPSB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdO1xuICAgIGlmICh0eXBlb2YgbGlzdGVuZXJzID09PSAnb2JqZWN0Jykge1xuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBsaXN0ZW5lcnMubGVuZ3RoOyBpICs9IDEpIHtcbiAgICAgICAgaWYgKGxpc3RlbmVyc1tpXSA9PT0gY2FsbGJhY2spIHtcbiAgICAgICAgICBsaXN0ZW5lcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmxpc3RlbmVyc1tldmVudE5hbWVdID0gbGlzdGVuZXJzO1xuICB9XG5cbiAgZXh0ZW5kKHNvdXJjZTogYW55KTogYW55IHtcbiAgICBjb25zdCB0YXJnZXQgPSB0aGlzIGFzIGFueTtcblxuICAgIGZvciAoY29uc3QgcHJvcCBpbiBzb3VyY2UpIHtcbiAgICAgIHRhcmdldFtwcm9wXSA9IHNv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
