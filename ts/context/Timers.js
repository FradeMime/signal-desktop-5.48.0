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
var Timers_exports = {};
__export(Timers_exports, {
  Timers: () => Timers
});
module.exports = __toCommonJS(Timers_exports);
var import_timers = require("timers");
class Timers {
  constructor() {
    this.counter = 0;
    this.timers = /* @__PURE__ */ new Map();
  }
  setTimeout(callback, delay) {
    let id;
    do {
      id = this.counter;
      this.counter = this.counter + 1 >>> 0;
    } while (this.timers.has(id));
    const timer = (0, import_timers.setTimeout)(() => {
      this.timers.delete(id);
      callback();
    }, delay);
    this.timers.set(id, timer);
    return { id };
  }
  clearTimeout({ id }) {
    const timer = this.timers.get(id);
    if (timer === void 0) {
      return;
    }
    this.timers.delete(id);
    return (0, import_timers.clearTimeout)(timer);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Timers
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZXJzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHNldFRpbWVvdXQsIGNsZWFyVGltZW91dCB9IGZyb20gJ3RpbWVycyc7XG5cbmV4cG9ydCB0eXBlIFRpbWVvdXQgPSB7XG4gIGlkOiBudW1iZXI7XG4gIF9fc2lnbmFsQ29udGV4dDogbmV2ZXI7XG59O1xuXG5leHBvcnQgY2xhc3MgVGltZXJzIHtcbiAgcHJpdmF0ZSBjb3VudGVyID0gMDtcblxuICBwcml2YXRlIHJlYWRvbmx5IHRpbWVycyA9IG5ldyBNYXA8bnVtYmVyLCBOb2RlSlMuVGltZW91dD4oKTtcblxuICBwdWJsaWMgc2V0VGltZW91dChjYWxsYmFjazogKCkgPT4gdm9pZCwgZGVsYXk6IG51bWJlcik6IFRpbWVvdXQge1xuICAgIGxldCBpZDogbnVtYmVyO1xuICAgIGRvIHtcbiAgICAgIGlkID0gdGhpcy5jb3VudGVyO1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWJpdHdpc2VcbiAgICAgIHRoaXMuY291bnRlciA9ICh0aGlzLmNvdW50ZXIgKyAxKSA+Pj4gMDtcbiAgICB9IHdoaWxlICh0aGlzLnRpbWVycy5oYXMoaWQpKTtcblxuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICB0aGlzLnRpbWVycy5kZWxldGUoaWQpO1xuICAgICAgY2FsbGJhY2soKTtcbiAgICB9LCBkZWxheSk7XG5cbiAgICB0aGlzLnRpbWVycy5zZXQoaWQsIHRpbWVyKTtcblxuICAgIHJldHVybiB7IGlkIH0gYXMgdW5rbm93biBhcyBUaW1lb3V0O1xuICB9XG5cbiAgcHVibGljIGNsZWFyVGltZW91dCh7IGlkIH06IFRpbWVvdXQpOiBSZXR1cm5UeXBlPHR5cGVvZiBjbGVhclRpbWVvdXQ+IHtcbiAgICBjb25zdCB0aW1lciA9IHRoaXMudGltZXJzLmdldChpZCk7XG4gICAgaWYgKHRpbWVyID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICB0aGlzLnRpbWVycy5kZWxldGUoaWQpO1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQodGltZXIpO1xuICB9XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXlDO0FBT2xDLE1BQU0sT0FBTztBQUFBLEVBQWI7QUFDRyxtQkFBVTtBQUVELGtCQUFTLG9CQUFJLElBQTRCO0FBQUE7QUFBQSxFQUVuRCxXQUFXLFVBQXNCLE9BQXdCO0FBQzlELFFBQUk7QUFDSixPQUFHO0FBQ0QsV0FBSyxLQUFLO0FBRVYsV0FBSyxVQUFXLEtBQUssVUFBVSxNQUFPO0FBQUEsSUFDeEMsU0FBUyxLQUFLLE9BQU8sSUFBSSxFQUFFO0FBRTNCLFVBQU0sUUFBUSw4QkFBVyxNQUFNO0FBQzdCLFdBQUssT0FBTyxPQUFPLEVBQUU7QUFDckIsZUFBUztBQUFBLElBQ1gsR0FBRyxLQUFLO0FBRVIsU0FBSyxPQUFPLElBQUksSUFBSSxLQUFLO0FBRXpCLFdBQU8sRUFBRSxHQUFHO0FBQUEsRUFDZDtBQUFBLEVBRU8sYUFBYSxFQUFFLE1BQWdEO0FBQ3BFLFVBQU0sUUFBUSxLQUFLLE9BQU8sSUFBSSxFQUFFO0FBQ2hDLFFBQUksVUFBVSxRQUFXO0FBQ3ZCO0FBQUEsSUFDRjtBQUVBLFNBQUssT0FBTyxPQUFPLEVBQUU7QUFDckIsV0FBTyxnQ0FBYSxLQUFLO0FBQUEsRUFDM0I7QUFDRjtBQWhDTyIsCiAgIm5hbWVzIjogW10KfQo=
