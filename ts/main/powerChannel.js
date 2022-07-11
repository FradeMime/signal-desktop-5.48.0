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
var powerChannel_exports = {};
__export(powerChannel_exports, {
  PowerChannel: () => PowerChannel
});
module.exports = __toCommonJS(powerChannel_exports);
var import_electron = require("electron");
const _PowerChannel = class {
  static initialize({ send }) {
    if (_PowerChannel.isInitialized) {
      throw new Error("PowerChannel already initialized");
    }
    _PowerChannel.isInitialized = true;
    import_electron.powerMonitor.on("suspend", () => {
      send("power-channel:suspend");
    });
    import_electron.powerMonitor.on("resume", () => {
      send("power-channel:resume");
    });
    import_electron.powerMonitor.on("lock-screen", () => {
      send("power-channel:lock-screen");
    });
  }
};
let PowerChannel = _PowerChannel;
PowerChannel.isInitialized = false;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  PowerChannel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicG93ZXJDaGFubmVsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHBvd2VyTW9uaXRvciB9IGZyb20gJ2VsZWN0cm9uJztcblxuZXhwb3J0IHR5cGUgSW5pdGlhbGl6ZU9wdGlvbnMgPSB7XG4gIHNlbmQoZXZlbnQ6IHN0cmluZyk6IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgUG93ZXJDaGFubmVsIHtcbiAgcHJpdmF0ZSBzdGF0aWMgaXNJbml0aWFsaXplZCA9IGZhbHNlO1xuXG4gIHN0YXRpYyBpbml0aWFsaXplKHsgc2VuZCB9OiBJbml0aWFsaXplT3B0aW9ucyk6IHZvaWQge1xuICAgIGlmIChQb3dlckNoYW5uZWwuaXNJbml0aWFsaXplZCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdQb3dlckNoYW5uZWwgYWxyZWFkeSBpbml0aWFsaXplZCcpO1xuICAgIH1cbiAgICBQb3dlckNoYW5uZWwuaXNJbml0aWFsaXplZCA9IHRydWU7XG5cbiAgICBwb3dlck1vbml0b3Iub24oJ3N1c3BlbmQnLCAoKSA9PiB7XG4gICAgICBzZW5kKCdwb3dlci1jaGFubmVsOnN1c3BlbmQnKTtcbiAgICB9KTtcbiAgICBwb3dlck1vbml0b3Iub24oJ3Jlc3VtZScsICgpID0+IHtcbiAgICAgIHNlbmQoJ3Bvd2VyLWNoYW5uZWw6cmVzdW1lJyk7XG4gICAgfSk7XG4gICAgcG93ZXJNb25pdG9yLm9uKCdsb2NrLXNjcmVlbicsICgpID0+IHtcbiAgICAgIHNlbmQoJ3Bvd2VyLWNoYW5uZWw6bG9jay1zY3JlZW4nKTtcbiAgICB9KTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE2QjtBQU10Qiw0QkFBbUI7QUFBQSxTQUdqQixXQUFXLEVBQUUsUUFBaUM7QUFDbkQsUUFBSSxjQUFhLGVBQWU7QUFDOUIsWUFBTSxJQUFJLE1BQU0sa0NBQWtDO0FBQUEsSUFDcEQ7QUFDQSxrQkFBYSxnQkFBZ0I7QUFFN0IsaUNBQWEsR0FBRyxXQUFXLE1BQU07QUFDL0IsV0FBSyx1QkFBdUI7QUFBQSxJQUM5QixDQUFDO0FBQ0QsaUNBQWEsR0FBRyxVQUFVLE1BQU07QUFDOUIsV0FBSyxzQkFBc0I7QUFBQSxJQUM3QixDQUFDO0FBQ0QsaUNBQWEsR0FBRyxlQUFlLE1BQU07QUFDbkMsV0FBSywyQkFBMkI7QUFBQSxJQUNsQyxDQUFDO0FBQUEsRUFDSDtBQUNGO0FBbkJPO0FBQ1UsQUFEVixhQUNVLGdCQUFnQjsiLAogICJuYW1lcyI6IFtdCn0K
