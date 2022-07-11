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
var useGetCallingFrameBuffer_exports = {};
__export(useGetCallingFrameBuffer_exports, {
  useGetCallingFrameBuffer: () => useGetCallingFrameBuffer
});
module.exports = __toCommonJS(useGetCallingFrameBuffer_exports);
var import_react = require("react");
var import_constants = require("./constants");
function useGetCallingFrameBuffer() {
  const ref = (0, import_react.useRef)(null);
  return (0, import_react.useCallback)(() => {
    if (!ref.current) {
      ref.current = Buffer.alloc(import_constants.FRAME_BUFFER_SIZE);
    }
    return ref.current;
  }, []);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useGetCallingFrameBuffer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlR2V0Q2FsbGluZ0ZyYW1lQnVmZmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IHVzZVJlZiwgdXNlQ2FsbGJhY2sgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBGUkFNRV9CVUZGRVJfU0laRSB9IGZyb20gJy4vY29uc3RhbnRzJztcblxuLyoqXG4gKiBBIGhvb2sgdGhhdCByZXR1cm5zIGEgZnVuY3Rpb24uIFRoaXMgZnVuY3Rpb24gcmV0dXJucyBhIFwic2luZ2xldG9uXCIgYEFycmF5QnVmZmVyYCB0byBiZVxuICogdXNlZCBpbiBjYWxsIHZpZGVvIHJlbmRlcmluZy5cbiAqXG4gKiBUaGlzIGlzIG1vc3QgdXNlZnVsIGZvciBncm91cCBjYWxscywgd2hlcmUgd2UgY2FuIHJldXNlIHRoZSBzYW1lIGZyYW1lIGJ1ZmZlciBpbnN0ZWFkXG4gKiBvZiBhbGxvY2F0aW5nIG9uZSBwZXIgcGFydGljaXBhbnQuIEJlIGNhcmVmdWwgd2hlbiB1c2luZyB0aGlzIGJ1ZmZlciBlbHNld2hlcmUsIGFzIGl0XG4gKiBpcyBub3QgY2xlYW5lZCB1cCBhbmQgbWF5IGhvbGQgc3RhbGUgZGF0YS5cbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIHVzZUdldENhbGxpbmdGcmFtZUJ1ZmZlcigpOiAoKSA9PiBCdWZmZXIge1xuICBjb25zdCByZWYgPSB1c2VSZWY8QnVmZmVyIHwgbnVsbD4obnVsbCk7XG5cbiAgcmV0dXJuIHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBpZiAoIXJlZi5jdXJyZW50KSB7XG4gICAgICByZWYuY3VycmVudCA9IEJ1ZmZlci5hbGxvYyhGUkFNRV9CVUZGRVJfU0laRSk7XG4gICAgfVxuICAgIHJldHVybiByZWYuY3VycmVudDtcbiAgfSwgW10pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG1CQUFvQztBQUNwQyx1QkFBa0M7QUFVM0Isb0NBQWtEO0FBQ3ZELFFBQU0sTUFBTSx5QkFBc0IsSUFBSTtBQUV0QyxTQUFPLDhCQUFZLE1BQU07QUFDdkIsUUFBSSxDQUFDLElBQUksU0FBUztBQUNoQixVQUFJLFVBQVUsT0FBTyxNQUFNLGtDQUFpQjtBQUFBLElBQzlDO0FBQ0EsV0FBTyxJQUFJO0FBQUEsRUFDYixHQUFHLENBQUMsQ0FBQztBQUNQO0FBVGdCIiwKICAibmFtZXMiOiBbXQp9Cg==
