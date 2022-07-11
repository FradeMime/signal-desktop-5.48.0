var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_heic_convert = __toESM(require("heic-convert"));
var import_worker_threads = require("worker_threads");
if (!import_worker_threads.parentPort) {
  throw new Error("Must run as a worker thread");
}
const port = import_worker_threads.parentPort;
function respond(uuid, error, response) {
  const wrappedResponse = {
    uuid,
    error: error ? error.stack : void 0,
    response
  };
  port.postMessage(wrappedResponse);
}
port.on("message", async ({ uuid, data }) => {
  try {
    const file = await (0, import_heic_convert.default)({
      buffer: new Uint8Array(data),
      format: "JPEG",
      quality: 0.75
    });
    respond(uuid, void 0, file);
  } catch (error) {
    respond(uuid, error, void 0);
  }
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGVpY0NvbnZlcnRlcldvcmtlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgaGVpY0NvbnZlcnQgZnJvbSAnaGVpYy1jb252ZXJ0JztcbmltcG9ydCB7IHBhcmVudFBvcnQgfSBmcm9tICd3b3JrZXJfdGhyZWFkcyc7XG5cbmltcG9ydCB0eXBlIHtcbiAgV3JhcHBlZFdvcmtlclJlcXVlc3QsXG4gIFdyYXBwZWRXb3JrZXJSZXNwb25zZSxcbn0gZnJvbSAnLi9oZWljQ29udmVydGVyTWFpbic7XG5cbmlmICghcGFyZW50UG9ydCkge1xuICB0aHJvdyBuZXcgRXJyb3IoJ011c3QgcnVuIGFzIGEgd29ya2VyIHRocmVhZCcpO1xufVxuXG5jb25zdCBwb3J0ID0gcGFyZW50UG9ydDtcblxuZnVuY3Rpb24gcmVzcG9uZCh1dWlkOiBzdHJpbmcsIGVycm9yOiBFcnJvciB8IHVuZGVmaW5lZCwgcmVzcG9uc2U/OiBGaWxlKSB7XG4gIGNvbnN0IHdyYXBwZWRSZXNwb25zZTogV3JhcHBlZFdvcmtlclJlc3BvbnNlID0ge1xuICAgIHV1aWQsXG4gICAgZXJyb3I6IGVycm9yID8gZXJyb3Iuc3RhY2sgOiB1bmRlZmluZWQsXG4gICAgcmVzcG9uc2UsXG4gIH07XG4gIHBvcnQucG9zdE1lc3NhZ2Uod3JhcHBlZFJlc3BvbnNlKTtcbn1cblxucG9ydC5vbignbWVzc2FnZScsIGFzeW5jICh7IHV1aWQsIGRhdGEgfTogV3JhcHBlZFdvcmtlclJlcXVlc3QpID0+IHtcbiAgdHJ5IHtcbiAgICBjb25zdCBmaWxlID0gYXdhaXQgaGVpY0NvbnZlcnQoe1xuICAgICAgYnVmZmVyOiBuZXcgVWludDhBcnJheShkYXRhKSxcbiAgICAgIGZvcm1hdDogJ0pQRUcnLFxuICAgICAgcXVhbGl0eTogMC43NSxcbiAgICB9KTtcblxuICAgIHJlc3BvbmQodXVpZCwgdW5kZWZpbmVkLCBmaWxlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICByZXNwb25kKHV1aWQsIGVycm9yLCB1bmRlZmluZWQpO1xuICB9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFHQSwwQkFBd0I7QUFDeEIsNEJBQTJCO0FBTzNCLElBQUksQ0FBQyxrQ0FBWTtBQUNmLFFBQU0sSUFBSSxNQUFNLDZCQUE2QjtBQUMvQztBQUVBLE1BQU0sT0FBTztBQUViLGlCQUFpQixNQUFjLE9BQTBCLFVBQWlCO0FBQ3hFLFFBQU0sa0JBQXlDO0FBQUEsSUFDN0M7QUFBQSxJQUNBLE9BQU8sUUFBUSxNQUFNLFFBQVE7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFDQSxPQUFLLFlBQVksZUFBZTtBQUNsQztBQVBTLEFBU1QsS0FBSyxHQUFHLFdBQVcsT0FBTyxFQUFFLE1BQU0sV0FBaUM7QUFDakUsTUFBSTtBQUNGLFVBQU0sT0FBTyxNQUFNLGlDQUFZO0FBQUEsTUFDN0IsUUFBUSxJQUFJLFdBQVcsSUFBSTtBQUFBLE1BQzNCLFFBQVE7QUFBQSxNQUNSLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFFRCxZQUFRLE1BQU0sUUFBVyxJQUFJO0FBQUEsRUFDL0IsU0FBUyxPQUFQO0FBQ0EsWUFBUSxNQUFNLE9BQU8sTUFBUztBQUFBLEVBQ2hDO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
