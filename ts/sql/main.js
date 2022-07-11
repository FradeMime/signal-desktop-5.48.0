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
var main_exports = {};
__export(main_exports, {
  MainSQL: () => MainSQL
});
module.exports = __toCommonJS(main_exports);
var import_path = require("path");
var import_worker_threads = require("worker_threads");
var import_util = require("util");
var import_electron = require("electron");
var import_assert = require("../util/assert");
var import_explodePromise = require("../util/explodePromise");
var import_errors = require("./errors");
const MIN_TRACE_DURATION = 40;
class MainSQL {
  constructor() {
    this.isReady = false;
    this.seq = 0;
    this.onResponse = /* @__PURE__ */ new Map();
    const scriptDir = (0, import_path.join)(import_electron.app.getAppPath(), "ts", "sql", "mainWorker.js");
    this.worker = new import_worker_threads.Worker(scriptDir);
    const { promise: onCorruption, resolve: resolveCorruption } = (0, import_explodePromise.explodePromise)();
    this.onCorruption = onCorruption;
    this.worker.on("message", (wrappedResponse) => {
      if (wrappedResponse.type === "log") {
        const { level, args } = wrappedResponse;
        (0, import_assert.strictAssert)(this.logger !== void 0, "Logger not initialized");
        this.logger[level](`MainSQL: ${(0, import_util.format)(...args)}`);
        return;
      }
      const { seq, error, response } = wrappedResponse;
      const pair = this.onResponse.get(seq);
      this.onResponse.delete(seq);
      if (!pair) {
        throw new Error(`Unexpected worker response with seq: ${seq}`);
      }
      if (error) {
        const errorObj = new Error(error);
        if ((0, import_errors.isCorruptionError)(errorObj)) {
          resolveCorruption(errorObj);
        }
        pair.reject(errorObj);
      } else {
        pair.resolve(response);
      }
    });
    this.onExit = new Promise((resolve) => {
      this.worker.once("exit", resolve);
    });
  }
  async initialize({
    configDir,
    key,
    logger
  }) {
    if (this.isReady || this.onReady) {
      throw new Error("Already initialized");
    }
    this.logger = logger;
    this.onReady = this.send({
      type: "init",
      options: { configDir, key }
    });
    await this.onReady;
    this.onReady = void 0;
    this.isReady = true;
  }
  whenCorrupted() {
    return this.onCorruption;
  }
  async close() {
    if (!this.isReady) {
      throw new Error("Not initialized");
    }
    await this.send({ type: "close" });
    await this.onExit;
  }
  async removeDB() {
    await this.send({ type: "removeDB" });
  }
  async sqlCall(method, args) {
    if (this.onReady) {
      await this.onReady;
    }
    if (!this.isReady) {
      throw new Error("Not initialized");
    }
    const { result, duration } = await this.send({
      type: "sqlCall",
      method,
      args
    });
    if (duration > MIN_TRACE_DURATION) {
      (0, import_assert.strictAssert)(this.logger !== void 0, "Logger not initialized");
      this.logger.info(`MainSQL: slow query ${method} duration=${duration}ms`);
    }
    return result;
  }
  async send(request) {
    const { seq } = this;
    this.seq += 1;
    const result = new Promise((resolve, reject) => {
      this.onResponse.set(seq, { resolve, reject });
    });
    const wrappedRequest = {
      seq,
      request
    };
    this.worker.postMessage(wrappedRequest);
    return result;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MainSQL
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBXb3JrZXIgfSBmcm9tICd3b3JrZXJfdGhyZWFkcyc7XG5pbXBvcnQgeyBmb3JtYXQgfSBmcm9tICd1dGlsJztcbmltcG9ydCB7IGFwcCB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi91dGlsL2V4cGxvZGVQcm9taXNlJztcbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgaXNDb3JydXB0aW9uRXJyb3IgfSBmcm9tICcuL2Vycm9ycyc7XG5cbmNvbnN0IE1JTl9UUkFDRV9EVVJBVElPTiA9IDQwO1xuXG5leHBvcnQgdHlwZSBJbml0aWFsaXplT3B0aW9ucyA9IFJlYWRvbmx5PHtcbiAgY29uZmlnRGlyOiBzdHJpbmc7XG4gIGtleTogc3RyaW5nO1xuICBsb2dnZXI6IExvZ2dlclR5cGU7XG59PjtcblxuZXhwb3J0IHR5cGUgV29ya2VyUmVxdWVzdCA9IFJlYWRvbmx5PFxuICB8IHtcbiAgICAgIHR5cGU6ICdpbml0JztcbiAgICAgIG9wdGlvbnM6IE9taXQ8SW5pdGlhbGl6ZU9wdGlvbnMsICdsb2dnZXInPjtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ2Nsb3NlJztcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ3JlbW92ZURCJztcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogJ3NxbENhbGwnO1xuICAgICAgbWV0aG9kOiBzdHJpbmc7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgYXJnczogUmVhZG9ubHlBcnJheTxhbnk+O1xuICAgIH1cbj47XG5cbmV4cG9ydCB0eXBlIFdyYXBwZWRXb3JrZXJSZXF1ZXN0ID0gUmVhZG9ubHk8e1xuICBzZXE6IG51bWJlcjtcbiAgcmVxdWVzdDogV29ya2VyUmVxdWVzdDtcbn0+O1xuXG5leHBvcnQgdHlwZSBXcmFwcGVkV29ya2VyTG9nRW50cnkgPSBSZWFkb25seTx7XG4gIHR5cGU6ICdsb2cnO1xuICBsZXZlbDogJ2ZhdGFsJyB8ICdlcnJvcicgfCAnd2FybicgfCAnaW5mbycgfCAnZGVidWcnIHwgJ3RyYWNlJztcbiAgYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPjtcbn0+O1xuXG5leHBvcnQgdHlwZSBXcmFwcGVkV29ya2VyUmVzcG9uc2UgPVxuICB8IFJlYWRvbmx5PHtcbiAgICAgIHR5cGU6ICdyZXNwb25zZSc7XG4gICAgICBzZXE6IG51bWJlcjtcbiAgICAgIGVycm9yOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgICAgcmVzcG9uc2U6IGFueTtcbiAgICB9PlxuICB8IFdyYXBwZWRXb3JrZXJMb2dFbnRyeTtcblxudHlwZSBQcm9taXNlUGFpcjxUPiA9IHtcbiAgcmVzb2x2ZTogKHJlc3BvbnNlOiBUKSA9PiB2b2lkO1xuICByZWplY3Q6IChlcnJvcjogRXJyb3IpID0+IHZvaWQ7XG59O1xuXG5leHBvcnQgY2xhc3MgTWFpblNRTCB7XG4gIHByaXZhdGUgcmVhZG9ubHkgd29ya2VyOiBXb3JrZXI7XG5cbiAgcHJpdmF0ZSBpc1JlYWR5ID0gZmFsc2U7XG5cbiAgcHJpdmF0ZSBvblJlYWR5OiBQcm9taXNlPHZvaWQ+IHwgdW5kZWZpbmVkO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgb25FeGl0OiBQcm9taXNlPHZvaWQ+O1xuXG4gIC8vIFRoaXMgcHJvbWlzZSBpcyByZXNvbHZlZCB3aGVuIGFueSBvZiB0aGUgcXVlcmllcyB0aGF0IHdlIHJ1biBhZ2FpbnN0IHRoZVxuICAvLyBkYXRhYmFzZSByZWplY3Qgd2l0aCBhIGNvcnJ1cHRpb24gZXJyb3IgKHNlZSBgaXNDb3JydXB0aW9uRXJyb3JgKVxuICBwcml2YXRlIHJlYWRvbmx5IG9uQ29ycnVwdGlvbjogUHJvbWlzZTxFcnJvcj47XG5cbiAgcHJpdmF0ZSBzZXEgPSAwO1xuXG4gIHByaXZhdGUgbG9nZ2VyPzogTG9nZ2VyVHlwZTtcblxuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICBwcml2YXRlIG9uUmVzcG9uc2UgPSBuZXcgTWFwPG51bWJlciwgUHJvbWlzZVBhaXI8YW55Pj4oKTtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICBjb25zdCBzY3JpcHREaXIgPSBqb2luKGFwcC5nZXRBcHBQYXRoKCksICd0cycsICdzcWwnLCAnbWFpbldvcmtlci5qcycpO1xuICAgIHRoaXMud29ya2VyID0gbmV3IFdvcmtlcihzY3JpcHREaXIpO1xuXG4gICAgY29uc3QgeyBwcm9taXNlOiBvbkNvcnJ1cHRpb24sIHJlc29sdmU6IHJlc29sdmVDb3JydXB0aW9uIH0gPVxuICAgICAgZXhwbG9kZVByb21pc2U8RXJyb3I+KCk7XG4gICAgdGhpcy5vbkNvcnJ1cHRpb24gPSBvbkNvcnJ1cHRpb247XG5cbiAgICB0aGlzLndvcmtlci5vbignbWVzc2FnZScsICh3cmFwcGVkUmVzcG9uc2U6IFdyYXBwZWRXb3JrZXJSZXNwb25zZSkgPT4ge1xuICAgICAgaWYgKHdyYXBwZWRSZXNwb25zZS50eXBlID09PSAnbG9nJykge1xuICAgICAgICBjb25zdCB7IGxldmVsLCBhcmdzIH0gPSB3cmFwcGVkUmVzcG9uc2U7XG4gICAgICAgIHN0cmljdEFzc2VydCh0aGlzLmxvZ2dlciAhPT0gdW5kZWZpbmVkLCAnTG9nZ2VyIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgICB0aGlzLmxvZ2dlcltsZXZlbF0oYE1haW5TUUw6ICR7Zm9ybWF0KC4uLmFyZ3MpfWApO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgc2VxLCBlcnJvciwgcmVzcG9uc2UgfSA9IHdyYXBwZWRSZXNwb25zZTtcblxuICAgICAgY29uc3QgcGFpciA9IHRoaXMub25SZXNwb25zZS5nZXQoc2VxKTtcbiAgICAgIHRoaXMub25SZXNwb25zZS5kZWxldGUoc2VxKTtcbiAgICAgIGlmICghcGFpcikge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFVuZXhwZWN0ZWQgd29ya2VyIHJlc3BvbnNlIHdpdGggc2VxOiAke3NlcX1gKTtcbiAgICAgIH1cblxuICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgIGNvbnN0IGVycm9yT2JqID0gbmV3IEVycm9yKGVycm9yKTtcbiAgICAgICAgaWYgKGlzQ29ycnVwdGlvbkVycm9yKGVycm9yT2JqKSkge1xuICAgICAgICAgIHJlc29sdmVDb3JydXB0aW9uKGVycm9yT2JqKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBhaXIucmVqZWN0KGVycm9yT2JqKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHBhaXIucmVzb2x2ZShyZXNwb25zZSk7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICB0aGlzLm9uRXhpdCA9IG5ldyBQcm9taXNlPHZvaWQ+KHJlc29sdmUgPT4ge1xuICAgICAgdGhpcy53b3JrZXIub25jZSgnZXhpdCcsIHJlc29sdmUpO1xuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGluaXRpYWxpemUoe1xuICAgIGNvbmZpZ0RpcixcbiAgICBrZXksXG4gICAgbG9nZ2VyLFxuICB9OiBJbml0aWFsaXplT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmlzUmVhZHkgfHwgdGhpcy5vblJlYWR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgaW5pdGlhbGl6ZWQnKTtcbiAgICB9XG5cbiAgICB0aGlzLmxvZ2dlciA9IGxvZ2dlcjtcblxuICAgIHRoaXMub25SZWFkeSA9IHRoaXMuc2VuZCh7XG4gICAgICB0eXBlOiAnaW5pdCcsXG4gICAgICBvcHRpb25zOiB7IGNvbmZpZ0Rpciwga2V5IH0sXG4gICAgfSk7XG5cbiAgICBhd2FpdCB0aGlzLm9uUmVhZHk7XG5cbiAgICB0aGlzLm9uUmVhZHkgPSB1bmRlZmluZWQ7XG4gICAgdGhpcy5pc1JlYWR5ID0gdHJ1ZTtcbiAgfVxuXG4gIHB1YmxpYyB3aGVuQ29ycnVwdGVkKCk6IFByb21pc2U8RXJyb3I+IHtcbiAgICByZXR1cm4gdGhpcy5vbkNvcnJ1cHRpb247XG4gIH1cblxuICBwdWJsaWMgYXN5bmMgY2xvc2UoKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKCF0aGlzLmlzUmVhZHkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm90IGluaXRpYWxpemVkJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5zZW5kKHsgdHlwZTogJ2Nsb3NlJyB9KTtcbiAgICBhd2FpdCB0aGlzLm9uRXhpdDtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyByZW1vdmVEQigpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBhd2FpdCB0aGlzLnNlbmQoeyB0eXBlOiAncmVtb3ZlREInIH0pO1xuICB9XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHVibGljIGFzeW5jIHNxbENhbGwobWV0aG9kOiBzdHJpbmcsIGFyZ3M6IFJlYWRvbmx5QXJyYXk8YW55Pik6IFByb21pc2U8YW55PiB7XG4gICAgaWYgKHRoaXMub25SZWFkeSkge1xuICAgICAgYXdhaXQgdGhpcy5vblJlYWR5O1xuICAgIH1cblxuICAgIGlmICghdGhpcy5pc1JlYWR5KSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ05vdCBpbml0aWFsaXplZCcpO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcmVzdWx0LCBkdXJhdGlvbiB9ID0gYXdhaXQgdGhpcy5zZW5kKHtcbiAgICAgIHR5cGU6ICdzcWxDYWxsJyxcbiAgICAgIG1ldGhvZCxcbiAgICAgIGFyZ3MsXG4gICAgfSk7XG5cbiAgICBpZiAoZHVyYXRpb24gPiBNSU5fVFJBQ0VfRFVSQVRJT04pIHtcbiAgICAgIHN0cmljdEFzc2VydCh0aGlzLmxvZ2dlciAhPT0gdW5kZWZpbmVkLCAnTG9nZ2VyIG5vdCBpbml0aWFsaXplZCcpO1xuICAgICAgdGhpcy5sb2dnZXIuaW5mbyhgTWFpblNRTDogc2xvdyBxdWVyeSAke21ldGhvZH0gZHVyYXRpb249JHtkdXJhdGlvbn1tc2ApO1xuICAgIH1cblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNlbmQ8UmVzcG9uc2U+KHJlcXVlc3Q6IFdvcmtlclJlcXVlc3QpOiBQcm9taXNlPFJlc3BvbnNlPiB7XG4gICAgY29uc3QgeyBzZXEgfSA9IHRoaXM7XG4gICAgdGhpcy5zZXEgKz0gMTtcblxuICAgIGNvbnN0IHJlc3VsdCA9IG5ldyBQcm9taXNlPFJlc3BvbnNlPigocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgICB0aGlzLm9uUmVzcG9uc2Uuc2V0KHNlcSwgeyByZXNvbHZlLCByZWplY3QgfSk7XG4gICAgfSk7XG5cbiAgICBjb25zdCB3cmFwcGVkUmVxdWVzdDogV3JhcHBlZFdvcmtlclJlcXVlc3QgPSB7XG4gICAgICBzZXEsXG4gICAgICByZXF1ZXN0LFxuICAgIH07XG4gICAgdGhpcy53b3JrZXIucG9zdE1lc3NhZ2Uod3JhcHBlZFJlcXVlc3QpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFxQjtBQUNyQiw0QkFBdUI7QUFDdkIsa0JBQXVC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
