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
var AsyncQueue_exports = {};
__export(AsyncQueue_exports, {
  AsyncQueue: () => AsyncQueue
});
module.exports = __toCommonJS(AsyncQueue_exports);
var import_lodash = require("lodash");
class AsyncQueue {
  constructor() {
    this.onAdd = import_lodash.noop;
    this.queue = [];
    this.isReading = false;
  }
  add(value) {
    this.queue.push(value);
    this.onAdd();
  }
  async *[Symbol.asyncIterator]() {
    if (this.isReading) {
      throw new Error("Cannot iterate over a queue more than once");
    }
    this.isReading = true;
    while (true) {
      yield* this.queue;
      this.queue = [];
      await new Promise((resolve) => {
        this.onAdd = (0, import_lodash.once)(resolve);
      });
    }
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AsyncQueue
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXN5bmNRdWV1ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBvbmNlLCBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuLyoqXG4gKiBZb3UgY2FuIGRvIHR3byB0aGluZ3Mgd2l0aCBhbiBhc3luYyBxdWV1ZTpcbiAqXG4gKiAxLiBQdXQgdmFsdWVzIGluLlxuICogMi4gQ29uc3VtZSB2YWx1ZXMgb3V0IGluIHRoZSBvcmRlciB0aGV5IHdlcmUgYWRkZWQuXG4gKlxuICogVmFsdWVzIGFyZSByZW1vdmVkIGZyb20gdGhlIHF1ZXVlIHdoZW4gdGhleSdyZSBjb25zdW1lZC5cbiAqXG4gKiBUaGVyZSBjYW4gb25seSBiZSBvbmUgY29uc3VtZXIsIHRob3VnaCB0aGlzIGNvdWxkIGJlIGNoYW5nZWQuXG4gKlxuICogU2VlIHRoZSB0ZXN0cyB0byBzZWUgaG93IHRoaXMgd29ya3MuXG4gKi9cbmV4cG9ydCBjbGFzcyBBc3luY1F1ZXVlPFQ+IGltcGxlbWVudHMgQXN5bmNJdGVyYWJsZTxUPiB7XG4gIHByaXZhdGUgb25BZGQ6ICgpID0+IHZvaWQgPSBub29wO1xuXG4gIHByaXZhdGUgcXVldWU6IEFycmF5PFQ+ID0gW107XG5cbiAgcHJpdmF0ZSBpc1JlYWRpbmcgPSBmYWxzZTtcblxuICBhZGQodmFsdWU6IFJlYWRvbmx5PFQ+KTogdm9pZCB7XG4gICAgdGhpcy5xdWV1ZS5wdXNoKHZhbHVlKTtcbiAgICB0aGlzLm9uQWRkKCk7XG4gIH1cblxuICBhc3luYyAqW1N5bWJvbC5hc3luY0l0ZXJhdG9yXSgpOiBBc3luY0l0ZXJhdG9yPFQ+IHtcbiAgICBpZiAodGhpcy5pc1JlYWRpbmcpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ2Fubm90IGl0ZXJhdGUgb3ZlciBhIHF1ZXVlIG1vcmUgdGhhbiBvbmNlJyk7XG4gICAgfVxuICAgIHRoaXMuaXNSZWFkaW5nID0gdHJ1ZTtcblxuICAgIHdoaWxlICh0cnVlKSB7XG4gICAgICB5aWVsZCogdGhpcy5xdWV1ZTtcblxuICAgICAgdGhpcy5xdWV1ZSA9IFtdO1xuXG4gICAgICAvLyBXZSB3YW50IHRvIGl0ZXJhdGUgb3ZlciB0aGUgcXVldWUgaW4gc2VyaWVzLlxuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIGF3YWl0IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgICB0aGlzLm9uQWRkID0gb25jZShyZXNvbHZlKTtcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUEyQjtBQWNwQixNQUFNLFdBQTBDO0FBQUEsRUFBaEQ7QUFDRyxpQkFBb0I7QUFFcEIsaUJBQWtCLENBQUM7QUFFbkIscUJBQVk7QUFBQTtBQUFBLEVBRXBCLElBQUksT0FBMEI7QUFDNUIsU0FBSyxNQUFNLEtBQUssS0FBSztBQUNyQixTQUFLLE1BQU07QUFBQSxFQUNiO0FBQUEsVUFFUSxPQUFPLGlCQUFtQztBQUNoRCxRQUFJLEtBQUssV0FBVztBQUNsQixZQUFNLElBQUksTUFBTSw0Q0FBNEM7QUFBQSxJQUM5RDtBQUNBLFNBQUssWUFBWTtBQUVqQixXQUFPLE1BQU07QUFDWCxhQUFPLEtBQUs7QUFFWixXQUFLLFFBQVEsQ0FBQztBQUlkLFlBQU0sSUFBSSxRQUFjLGFBQVc7QUFDakMsYUFBSyxRQUFRLHdCQUFLLE9BQU87QUFBQSxNQUMzQixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQTlCTyIsCiAgIm5hbWVzIjogW10KfQo=
