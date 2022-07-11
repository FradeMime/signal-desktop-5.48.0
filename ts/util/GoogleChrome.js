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
var GoogleChrome_exports = {};
__export(GoogleChrome_exports, {
  isImageTypeSupported: () => isImageTypeSupported,
  isVideoTypeSupported: () => isVideoTypeSupported
});
module.exports = __toCommonJS(GoogleChrome_exports);
const SUPPORTED_IMAGE_MIME_TYPES = {
  "image/bmp": true,
  "image/gif": true,
  "image/jpeg": true,
  "image/svg+xml": false,
  "image/webp": true,
  "image/x-xbitmap": true,
  "image/vnd.microsoft.icon": true,
  "image/ico": true,
  "image/icon": true,
  "image/x-icon": true,
  "image/apng": true,
  "image/png": true
};
const isImageTypeSupported = /* @__PURE__ */ __name((mimeType) => SUPPORTED_IMAGE_MIME_TYPES[mimeType] === true, "isImageTypeSupported");
const SUPPORTED_VIDEO_MIME_TYPES = {
  "video/mp4": true,
  "video/ogg": true,
  "video/webm": true
};
const isVideoTypeSupported = /* @__PURE__ */ __name((mimeType) => SUPPORTED_VIDEO_MIME_TYPES[mimeType] === true, "isVideoTypeSupported");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isImageTypeSupported,
  isVideoTypeSupported
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiR29vZ2xlQ2hyb21lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgKiBhcyBNSU1FIGZyb20gJy4uL3R5cGVzL01JTUUnO1xuXG50eXBlIE1JTUVUeXBlU3VwcG9ydE1hcCA9IFJlY29yZDxzdHJpbmcsIGJvb2xlYW4+O1xuXG4vLyBTZWU6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL0NvbXBhcmlzb25fb2Zfd2ViX2Jyb3dzZXJzI0ltYWdlX2Zvcm1hdF9zdXBwb3J0XG5jb25zdCBTVVBQT1JURURfSU1BR0VfTUlNRV9UWVBFUzogTUlNRVR5cGVTdXBwb3J0TWFwID0ge1xuICAnaW1hZ2UvYm1wJzogdHJ1ZSxcbiAgJ2ltYWdlL2dpZic6IHRydWUsXG4gICdpbWFnZS9qcGVnJzogdHJ1ZSxcbiAgLy8gTm8gbmVlZCB0byBzdXBwb3J0IFNWR1xuICAnaW1hZ2Uvc3ZnK3htbCc6IGZhbHNlLFxuICAnaW1hZ2Uvd2VicCc6IHRydWUsXG4gICdpbWFnZS94LXhiaXRtYXAnOiB0cnVlLFxuICAvLyBJQ09cbiAgJ2ltYWdlL3ZuZC5taWNyb3NvZnQuaWNvbic6IHRydWUsXG4gICdpbWFnZS9pY28nOiB0cnVlLFxuICAnaW1hZ2UvaWNvbic6IHRydWUsXG4gICdpbWFnZS94LWljb24nOiB0cnVlLFxuICAvLyBQTkdcbiAgJ2ltYWdlL2FwbmcnOiB0cnVlLFxuICAnaW1hZ2UvcG5nJzogdHJ1ZSxcbn07XG5cbmV4cG9ydCBjb25zdCBpc0ltYWdlVHlwZVN1cHBvcnRlZCA9IChtaW1lVHlwZTogTUlNRS5NSU1FVHlwZSk6IGJvb2xlYW4gPT5cbiAgU1VQUE9SVEVEX0lNQUdFX01JTUVfVFlQRVNbbWltZVR5cGVdID09PSB0cnVlO1xuXG5jb25zdCBTVVBQT1JURURfVklERU9fTUlNRV9UWVBFUzogTUlNRVR5cGVTdXBwb3J0TWFwID0ge1xuICAndmlkZW8vbXA0JzogdHJ1ZSxcbiAgJ3ZpZGVvL29nZyc6IHRydWUsXG4gICd2aWRlby93ZWJtJzogdHJ1ZSxcbn07XG5cbi8vIFNlZTogaHR0cHM6Ly93d3cuY2hyb21pdW0ub3JnL2F1ZGlvLXZpZGVvXG5leHBvcnQgY29uc3QgaXNWaWRlb1R5cGVTdXBwb3J0ZWQgPSAobWltZVR5cGU6IE1JTUUuTUlNRVR5cGUpOiBib29sZWFuID0+XG4gIFNVUFBPUlRFRF9WSURFT19NSU1FX1RZUEVTW21pbWVUeXBlXSA9PT0gdHJ1ZTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBLE1BQU0sNkJBQWlEO0FBQUEsRUFDckQsYUFBYTtBQUFBLEVBQ2IsYUFBYTtBQUFBLEVBQ2IsY0FBYztBQUFBLEVBRWQsaUJBQWlCO0FBQUEsRUFDakIsY0FBYztBQUFBLEVBQ2QsbUJBQW1CO0FBQUEsRUFFbkIsNEJBQTRCO0FBQUEsRUFDNUIsYUFBYTtBQUFBLEVBQ2IsY0FBYztBQUFBLEVBQ2QsZ0JBQWdCO0FBQUEsRUFFaEIsY0FBYztBQUFBLEVBQ2QsYUFBYTtBQUNmO0FBRU8sTUFBTSx1QkFBdUIsd0JBQUMsYUFDbkMsMkJBQTJCLGNBQWMsTUFEUDtBQUdwQyxNQUFNLDZCQUFpRDtBQUFBLEVBQ3JELGFBQWE7QUFBQSxFQUNiLGFBQWE7QUFBQSxFQUNiLGNBQWM7QUFDaEI7QUFHTyxNQUFNLHVCQUF1Qix3QkFBQyxhQUNuQywyQkFBMkIsY0FBYyxNQURQOyIsCiAgIm5hbWVzIjogW10KfQo=
