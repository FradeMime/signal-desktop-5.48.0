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
var BackOff_exports = {};
__export(BackOff_exports, {
  BackOff: () => BackOff,
  FIBONACCI_TIMEOUTS: () => FIBONACCI_TIMEOUTS
});
module.exports = __toCommonJS(BackOff_exports);
const SECOND = 1e3;
const FIBONACCI_TIMEOUTS = [
  1 * SECOND,
  2 * SECOND,
  3 * SECOND,
  5 * SECOND,
  8 * SECOND,
  13 * SECOND,
  21 * SECOND,
  34 * SECOND,
  55 * SECOND
];
const DEFAULT_RANDOM = /* @__PURE__ */ __name(() => Math.random(), "DEFAULT_RANDOM");
class BackOff {
  constructor(timeouts, options = {}) {
    this.timeouts = timeouts;
    this.options = options;
    this.count = 0;
  }
  get() {
    let result = this.timeouts[this.count];
    const { jitter = 0, random = DEFAULT_RANDOM } = this.options;
    if (jitter < result) {
      result += random() * jitter;
    }
    return result;
  }
  getAndIncrement() {
    const result = this.get();
    if (!this.isFull()) {
      this.count += 1;
    }
    return result;
  }
  reset() {
    this.count = 0;
  }
  isFull() {
    return this.count === this.timeouts.length - 1;
  }
  getIndex() {
    return this.count;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BackOff,
  FIBONACCI_TIMEOUTS
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFja09mZi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5jb25zdCBTRUNPTkQgPSAxMDAwO1xuXG5leHBvcnQgY29uc3QgRklCT05BQ0NJX1RJTUVPVVRTOiBSZWFkb25seUFycmF5PG51bWJlcj4gPSBbXG4gIDEgKiBTRUNPTkQsXG4gIDIgKiBTRUNPTkQsXG4gIDMgKiBTRUNPTkQsXG4gIDUgKiBTRUNPTkQsXG4gIDggKiBTRUNPTkQsXG4gIDEzICogU0VDT05ELFxuICAyMSAqIFNFQ09ORCxcbiAgMzQgKiBTRUNPTkQsXG4gIDU1ICogU0VDT05ELFxuXTtcblxuZXhwb3J0IHR5cGUgQmFja09mZk9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBqaXR0ZXI/OiBudW1iZXI7XG5cbiAgLy8gVGVzdGluZ1xuICByYW5kb20/OiAoKSA9PiBudW1iZXI7XG59PjtcblxuY29uc3QgREVGQVVMVF9SQU5ET00gPSAoKSA9PiBNYXRoLnJhbmRvbSgpO1xuXG5leHBvcnQgY2xhc3MgQmFja09mZiB7XG4gIHByaXZhdGUgY291bnQgPSAwO1xuXG4gIGNvbnN0cnVjdG9yKFxuICAgIHByaXZhdGUgcmVhZG9ubHkgdGltZW91dHM6IFJlYWRvbmx5QXJyYXk8bnVtYmVyPixcbiAgICBwcml2YXRlIHJlYWRvbmx5IG9wdGlvbnM6IEJhY2tPZmZPcHRpb25zVHlwZSA9IHt9XG4gICkge31cblxuICBwdWJsaWMgZ2V0KCk6IG51bWJlciB7XG4gICAgbGV0IHJlc3VsdCA9IHRoaXMudGltZW91dHNbdGhpcy5jb3VudF07XG4gICAgY29uc3QgeyBqaXR0ZXIgPSAwLCByYW5kb20gPSBERUZBVUxUX1JBTkRPTSB9ID0gdGhpcy5vcHRpb25zO1xuXG4gICAgLy8gRG8gbm90IGFwcGx5IGppdHRlciBsYXJnZXIgdGhhbiB0aGUgdGltZW91dCB2YWx1ZS4gSXQgaXMgc3VwcG9zZWQgdG8gYmVcbiAgICAvLyBhY3RpdmF0ZWQgZm9yIGxvbmdlciB0aW1lb3V0cy5cbiAgICBpZiAoaml0dGVyIDwgcmVzdWx0KSB7XG4gICAgICByZXN1bHQgKz0gcmFuZG9tKCkgKiBqaXR0ZXI7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwdWJsaWMgZ2V0QW5kSW5jcmVtZW50KCk6IG51bWJlciB7XG4gICAgY29uc3QgcmVzdWx0ID0gdGhpcy5nZXQoKTtcbiAgICBpZiAoIXRoaXMuaXNGdWxsKCkpIHtcbiAgICAgIHRoaXMuY291bnQgKz0gMTtcbiAgICB9XG5cbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcHVibGljIHJlc2V0KCk6IHZvaWQge1xuICAgIHRoaXMuY291bnQgPSAwO1xuICB9XG5cbiAgcHVibGljIGlzRnVsbCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gdGhpcy5jb3VudCA9PT0gdGhpcy50aW1lb3V0cy5sZW5ndGggLSAxO1xuICB9XG5cbiAgcHVibGljIGdldEluZGV4KCk6IG51bWJlciB7XG4gICAgcmV0dXJuIHRoaXMuY291bnQ7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLE1BQU0sU0FBUztBQUVSLE1BQU0scUJBQTRDO0FBQUEsRUFDdkQsSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osSUFBSTtBQUFBLEVBQ0osS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUNQO0FBU0EsTUFBTSxpQkFBaUIsNkJBQU0sS0FBSyxPQUFPLEdBQWxCO0FBRWhCLE1BQU0sUUFBUTtBQUFBLEVBR25CLFlBQ21CLFVBQ0EsVUFBOEIsQ0FBQyxHQUNoRDtBQUZpQjtBQUNBO0FBSlgsaUJBQVE7QUFBQSxFQUtiO0FBQUEsRUFFSSxNQUFjO0FBQ25CLFFBQUksU0FBUyxLQUFLLFNBQVMsS0FBSztBQUNoQyxVQUFNLEVBQUUsU0FBUyxHQUFHLFNBQVMsbUJBQW1CLEtBQUs7QUFJckQsUUFBSSxTQUFTLFFBQVE7QUFDbkIsZ0JBQVUsT0FBTyxJQUFJO0FBQUEsSUFDdkI7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUFBLEVBRU8sa0JBQTBCO0FBQy9CLFVBQU0sU0FBUyxLQUFLLElBQUk7QUFDeEIsUUFBSSxDQUFDLEtBQUssT0FBTyxHQUFHO0FBQ2xCLFdBQUssU0FBUztBQUFBLElBQ2hCO0FBRUEsV0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUVPLFFBQWM7QUFDbkIsU0FBSyxRQUFRO0FBQUEsRUFDZjtBQUFBLEVBRU8sU0FBa0I7QUFDdkIsV0FBTyxLQUFLLFVBQVUsS0FBSyxTQUFTLFNBQVM7QUFBQSxFQUMvQztBQUFBLEVBRU8sV0FBbUI7QUFDeEIsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGO0FBeENPIiwKICAibmFtZXMiOiBbXQp9Cg==
