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
var heicConverterMain_exports = {};
__export(heicConverterMain_exports, {
  getHeicConverter: () => getHeicConverter
});
module.exports = __toCommonJS(heicConverterMain_exports);
var import_path = require("path");
var import_worker_threads = require("worker_threads");
var import_electron = require("electron");
function getHeicConverter() {
  const scriptDir = (0, import_path.join)(import_electron.app.getAppPath(), "ts", "workers", "heicConverterWorker.js");
  const worker = new import_worker_threads.Worker(scriptDir);
  const ResponseMap = /* @__PURE__ */ new Map();
  worker.on("message", (wrappedResponse) => {
    const { uuid } = wrappedResponse;
    const resolve = ResponseMap.get(uuid);
    if (!resolve) {
      throw new Error(`Cannot find resolver for ${uuid}`);
    }
    resolve(wrappedResponse);
  });
  return async (uuid, data) => {
    const wrappedRequest = {
      uuid,
      data
    };
    const result = new Promise((resolve) => {
      ResponseMap.set(uuid, resolve);
    });
    worker.postMessage(wrappedRequest);
    return result;
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getHeicConverter
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGVpY0NvbnZlcnRlck1haW4udHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgV29ya2VyIH0gZnJvbSAnd29ya2VyX3RocmVhZHMnO1xuaW1wb3J0IHsgYXBwIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5leHBvcnQgdHlwZSBXcmFwcGVkV29ya2VyUmVxdWVzdCA9IHtcbiAgcmVhZG9ubHkgdXVpZDogc3RyaW5nO1xuICByZWFkb25seSBkYXRhOiBVaW50OEFycmF5O1xufTtcblxuZXhwb3J0IHR5cGUgV3JhcHBlZFdvcmtlclJlc3BvbnNlID0ge1xuICByZWFkb25seSB1dWlkOiBzdHJpbmc7XG4gIHJlYWRvbmx5IGVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHJlYWRvbmx5IHJlc3BvbnNlPzogRmlsZTtcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRIZWljQ29udmVydGVyKCk6IChcbiAgdXVpZDogc3RyaW5nLFxuICBkYXRhOiBVaW50OEFycmF5XG4pID0+IFByb21pc2U8V3JhcHBlZFdvcmtlclJlc3BvbnNlPiB7XG4gIGNvbnN0IHNjcmlwdERpciA9IGpvaW4oXG4gICAgYXBwLmdldEFwcFBhdGgoKSxcbiAgICAndHMnLFxuICAgICd3b3JrZXJzJyxcbiAgICAnaGVpY0NvbnZlcnRlcldvcmtlci5qcydcbiAgKTtcbiAgY29uc3Qgd29ya2VyID0gbmV3IFdvcmtlcihzY3JpcHREaXIpO1xuXG4gIGNvbnN0IFJlc3BvbnNlTWFwID0gbmV3IE1hcDxcbiAgICBzdHJpbmcsXG4gICAgKHJlc3BvbnNlOiBXcmFwcGVkV29ya2VyUmVzcG9uc2UpID0+IHZvaWRcbiAgPigpO1xuXG4gIHdvcmtlci5vbignbWVzc2FnZScsICh3cmFwcGVkUmVzcG9uc2U6IFdyYXBwZWRXb3JrZXJSZXNwb25zZSkgPT4ge1xuICAgIGNvbnN0IHsgdXVpZCB9ID0gd3JhcHBlZFJlc3BvbnNlO1xuXG4gICAgY29uc3QgcmVzb2x2ZSA9IFJlc3BvbnNlTWFwLmdldCh1dWlkKTtcbiAgICBpZiAoIXJlc29sdmUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihgQ2Fubm90IGZpbmQgcmVzb2x2ZXIgZm9yICR7dXVpZH1gKTtcbiAgICB9XG5cbiAgICByZXNvbHZlKHdyYXBwZWRSZXNwb25zZSk7XG4gIH0pO1xuXG4gIHJldHVybiBhc3luYyAodXVpZCwgZGF0YSkgPT4ge1xuICAgIGNvbnN0IHdyYXBwZWRSZXF1ZXN0OiBXcmFwcGVkV29ya2VyUmVxdWVzdCA9IHtcbiAgICAgIHV1aWQsXG4gICAgICBkYXRhLFxuICAgIH07XG5cbiAgICBjb25zdCByZXN1bHQgPSBuZXcgUHJvbWlzZTxXcmFwcGVkV29ya2VyUmVzcG9uc2U+KHJlc29sdmUgPT4ge1xuICAgICAgUmVzcG9uc2VNYXAuc2V0KHV1aWQsIHJlc29sdmUpO1xuICAgIH0pO1xuXG4gICAgd29ya2VyLnBvc3RNZXNzYWdlKHdyYXBwZWRSZXF1ZXN0KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQXFCO0FBQ3JCLDRCQUF1QjtBQUN2QixzQkFBb0I7QUFhYiw0QkFHNkI7QUFDbEMsUUFBTSxZQUFZLHNCQUNoQixvQkFBSSxXQUFXLEdBQ2YsTUFDQSxXQUNBLHdCQUNGO0FBQ0EsUUFBTSxTQUFTLElBQUksNkJBQU8sU0FBUztBQUVuQyxRQUFNLGNBQWMsb0JBQUksSUFHdEI7QUFFRixTQUFPLEdBQUcsV0FBVyxDQUFDLG9CQUEyQztBQUMvRCxVQUFNLEVBQUUsU0FBUztBQUVqQixVQUFNLFVBQVUsWUFBWSxJQUFJLElBQUk7QUFDcEMsUUFBSSxDQUFDLFNBQVM7QUFDWixZQUFNLElBQUksTUFBTSw0QkFBNEIsTUFBTTtBQUFBLElBQ3BEO0FBRUEsWUFBUSxlQUFlO0FBQUEsRUFDekIsQ0FBQztBQUVELFNBQU8sT0FBTyxNQUFNLFNBQVM7QUFDM0IsVUFBTSxpQkFBdUM7QUFBQSxNQUMzQztBQUFBLE1BQ0E7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUFTLElBQUksUUFBK0IsYUFBVztBQUMzRCxrQkFBWSxJQUFJLE1BQU0sT0FBTztBQUFBLElBQy9CLENBQUM7QUFFRCxXQUFPLFlBQVksY0FBYztBQUVqQyxXQUFPO0FBQUEsRUFDVDtBQUNGO0FBMUNnQiIsCiAgIm5hbWVzIjogW10KfQo=
