var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var CDSSocketManagerBase_exports = {};
__export(CDSSocketManagerBase_exports, {
  CDSSocketManagerBase: () => CDSSocketManagerBase
});
module.exports = __toCommonJS(CDSSocketManagerBase_exports);
var import_p_timeout = __toESM(require("p-timeout"));
var durations = __toESM(require("../../util/durations"));
var import_getBasicAuth = require("../../util/getBasicAuth");
var import_sleep = require("../../util/sleep");
var import_durations = require("../../util/durations");
var import_CDSBase = require("./CDSBase");
var import_WebSocket = require("../WebSocket");
const REQUEST_TIMEOUT = 10 * import_durations.SECOND;
class CDSSocketManagerBase extends import_CDSBase.CDSBase {
  async request(options) {
    const log = this.logger;
    if (this.retryAfter !== void 0) {
      const delay = Math.max(0, this.retryAfter - Date.now());
      log.info(`CDSSocketManager: waiting ${delay}ms before retrying`);
      await (0, import_sleep.sleep)(delay);
    }
    const auth = await this.getAuth();
    log.info("CDSSocketManager: connecting socket");
    const socket = await this.connect(auth).getResult();
    log.info("CDSSocketManager: connected socket");
    try {
      let { timeout = REQUEST_TIMEOUT } = options;
      {
        const start = Date.now();
        await (0, import_p_timeout.default)(socket.handshake(), timeout);
        const duration = Date.now() - start;
        timeout = Math.max(timeout - duration, 0);
      }
      const { response, retryAfterSecs = 0 } = await (0, import_p_timeout.default)(socket.request(options), timeout);
      if (retryAfterSecs > 0) {
        this.retryAfter = Math.max(this.retryAfter ?? Date.now(), Date.now() + retryAfterSecs * durations.SECOND);
      }
      return response;
    } finally {
      log.info("CDSSocketManager: closing socket");
      socket.close(3e3, "Normal");
    }
  }
  connect(auth) {
    return (0, import_WebSocket.connect)({
      name: "CDSSocket",
      url: this.getSocketUrl(),
      version: this.options.version,
      proxyAgent: this.proxyAgent,
      certificateAuthority: this.options.certificateAuthority,
      extraHeaders: {
        authorization: (0, import_getBasicAuth.getBasicAuth)(auth)
      },
      createResource: (socket) => {
        return this.createSocket(socket);
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CDSSocketManagerBase
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ0RTU29ja2V0TWFuYWdlckJhc2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IGNvbm5lY3Rpb24gYXMgV2ViU29ja2V0IH0gZnJvbSAnd2Vic29ja2V0JztcbmltcG9ydCBwVGltZW91dCBmcm9tICdwLXRpbWVvdXQnO1xuXG5pbXBvcnQgdHlwZSB7IEFib3J0YWJsZVByb2Nlc3MgfSBmcm9tICcuLi8uLi91dGlsL0Fib3J0YWJsZVByb2Nlc3MnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCB7IGdldEJhc2ljQXV0aCB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0QmFzaWNBdXRoJztcbmltcG9ydCB7IHNsZWVwIH0gZnJvbSAnLi4vLi4vdXRpbC9zbGVlcCc7XG5pbXBvcnQgeyBTRUNPTkQgfSBmcm9tICcuLi8uLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IENEU0Jhc2VPcHRpb25zVHlwZSB9IGZyb20gJy4vQ0RTQmFzZSc7XG5pbXBvcnQgeyBDRFNCYXNlIH0gZnJvbSAnLi9DRFNCYXNlJztcbmltcG9ydCB0eXBlIHsgQ0RTU29ja2V0QmFzZSB9IGZyb20gJy4vQ0RTU29ja2V0QmFzZSc7XG5pbXBvcnQgdHlwZSB7XG4gIENEU1JlcXVlc3RPcHRpb25zVHlwZSxcbiAgQ0RTUmVzcG9uc2VUeXBlLFxuICBDRFNBdXRoVHlwZSxcbn0gZnJvbSAnLi9UeXBlcy5kJztcbmltcG9ydCB7IGNvbm5lY3QgYXMgY29ubmVjdFdlYlNvY2tldCB9IGZyb20gJy4uL1dlYlNvY2tldCc7XG5cbmNvbnN0IFJFUVVFU1RfVElNRU9VVCA9IDEwICogU0VDT05EO1xuXG5leHBvcnQgdHlwZSBDRFNTb2NrZXRNYW5hZ2VyQmFzZU9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICB1cmw6IHN0cmluZztcbiAgY2VydGlmaWNhdGVBdXRob3JpdHk6IHN0cmluZztcbiAgdmVyc2lvbjogc3RyaW5nO1xufT4gJlxuICBDRFNCYXNlT3B0aW9uc1R5cGU7XG5cbmV4cG9ydCBhYnN0cmFjdCBjbGFzcyBDRFNTb2NrZXRNYW5hZ2VyQmFzZTxcbiAgU29ja2V0IGV4dGVuZHMgQ0RTU29ja2V0QmFzZSxcbiAgT3B0aW9ucyBleHRlbmRzIENEU1NvY2tldE1hbmFnZXJCYXNlT3B0aW9uc1R5cGVcbj4gZXh0ZW5kcyBDRFNCYXNlPE9wdGlvbnM+IHtcbiAgcHJpdmF0ZSByZXRyeUFmdGVyPzogbnVtYmVyO1xuXG4gIHB1YmxpYyBhc3luYyByZXF1ZXN0KFxuICAgIG9wdGlvbnM6IENEU1JlcXVlc3RPcHRpb25zVHlwZVxuICApOiBQcm9taXNlPENEU1Jlc3BvbnNlVHlwZT4ge1xuICAgIGNvbnN0IGxvZyA9IHRoaXMubG9nZ2VyO1xuXG4gICAgaWYgKHRoaXMucmV0cnlBZnRlciAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb25zdCBkZWxheSA9IE1hdGgubWF4KDAsIHRoaXMucmV0cnlBZnRlciAtIERhdGUubm93KCkpO1xuXG4gICAgICBsb2cuaW5mbyhgQ0RTU29ja2V0TWFuYWdlcjogd2FpdGluZyAke2RlbGF5fW1zIGJlZm9yZSByZXRyeWluZ2ApO1xuICAgICAgYXdhaXQgc2xlZXAoZGVsYXkpO1xuICAgIH1cblxuICAgIGNvbnN0IGF1dGggPSBhd2FpdCB0aGlzLmdldEF1dGgoKTtcblxuICAgIGxvZy5pbmZvKCdDRFNTb2NrZXRNYW5hZ2VyOiBjb25uZWN0aW5nIHNvY2tldCcpO1xuICAgIGNvbnN0IHNvY2tldCA9IGF3YWl0IHRoaXMuY29ubmVjdChhdXRoKS5nZXRSZXN1bHQoKTtcbiAgICBsb2cuaW5mbygnQ0RTU29ja2V0TWFuYWdlcjogY29ubmVjdGVkIHNvY2tldCcpO1xuXG4gICAgdHJ5IHtcbiAgICAgIGxldCB7IHRpbWVvdXQgPSBSRVFVRVNUX1RJTUVPVVQgfSA9IG9wdGlvbnM7XG5cbiAgICAgIC8vIEhhbmRzaGFrZVxuICAgICAge1xuICAgICAgICBjb25zdCBzdGFydCA9IERhdGUubm93KCk7XG4gICAgICAgIGF3YWl0IHBUaW1lb3V0KHNvY2tldC5oYW5kc2hha2UoKSwgdGltZW91dCk7XG4gICAgICAgIGNvbnN0IGR1cmF0aW9uID0gRGF0ZS5ub3coKSAtIHN0YXJ0O1xuXG4gICAgICAgIHRpbWVvdXQgPSBNYXRoLm1heCh0aW1lb3V0IC0gZHVyYXRpb24sIDApO1xuICAgICAgfVxuXG4gICAgICAvLyBTZW5kIHJlcXVlc3RcbiAgICAgIGNvbnN0IHsgcmVzcG9uc2UsIHJldHJ5QWZ0ZXJTZWNzID0gMCB9ID0gYXdhaXQgcFRpbWVvdXQoXG4gICAgICAgIHNvY2tldC5yZXF1ZXN0KG9wdGlvbnMpLFxuICAgICAgICB0aW1lb3V0XG4gICAgICApO1xuXG4gICAgICBpZiAocmV0cnlBZnRlclNlY3MgPiAwKSB7XG4gICAgICAgIHRoaXMucmV0cnlBZnRlciA9IE1hdGgubWF4KFxuICAgICAgICAgIHRoaXMucmV0cnlBZnRlciA/PyBEYXRlLm5vdygpLFxuICAgICAgICAgIERhdGUubm93KCkgKyByZXRyeUFmdGVyU2VjcyAqIGR1cmF0aW9ucy5TRUNPTkRcbiAgICAgICAgKTtcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHJlc3BvbnNlO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBsb2cuaW5mbygnQ0RTU29ja2V0TWFuYWdlcjogY2xvc2luZyBzb2NrZXQnKTtcbiAgICAgIHNvY2tldC5jbG9zZSgzMDAwLCAnTm9ybWFsJyk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBjb25uZWN0KGF1dGg6IENEU0F1dGhUeXBlKTogQWJvcnRhYmxlUHJvY2VzczxTb2NrZXQ+IHtcbiAgICByZXR1cm4gY29ubmVjdFdlYlNvY2tldDxTb2NrZXQ+KHtcbiAgICAgIG5hbWU6ICdDRFNTb2NrZXQnLFxuICAgICAgdXJsOiB0aGlzLmdldFNvY2tldFVybCgpLFxuICAgICAgdmVyc2lvbjogdGhpcy5vcHRpb25zLnZlcnNpb24sXG4gICAgICBwcm94eUFnZW50OiB0aGlzLnByb3h5QWdlbnQsXG4gICAgICBjZXJ0aWZpY2F0ZUF1dGhvcml0eTogdGhpcy5vcHRpb25zLmNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgZXh0cmFIZWFkZXJzOiB7XG4gICAgICAgIGF1dGhvcml6YXRpb246IGdldEJhc2ljQXV0aChhdXRoKSxcbiAgICAgIH0sXG5cbiAgICAgIGNyZWF0ZVJlc291cmNlOiAoc29ja2V0OiBXZWJTb2NrZXQpOiBTb2NrZXQgPT4ge1xuICAgICAgICByZXR1cm4gdGhpcy5jcmVhdGVTb2NrZXQoc29ja2V0KTtcbiAgICAgIH0sXG4gICAgfSk7XG4gIH1cblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgZ2V0U29ja2V0VXJsKCk6IHN0cmluZztcblxuICBwcm90ZWN0ZWQgYWJzdHJhY3QgY3JlYXRlU29ja2V0KHNvY2tldDogV2ViU29ja2V0KTogU29ja2V0O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLHVCQUFxQjtBQUdyQixnQkFBMkI7QUFDM0IsMEJBQTZCO0FBQzdCLG1CQUFzQjtBQUN0Qix1QkFBdUI7QUFFdkIscUJBQXdCO0FBT3hCLHVCQUE0QztBQUU1QyxNQUFNLGtCQUFrQixLQUFLO0FBU3RCLE1BQWUsNkJBR1osdUJBQWlCO0FBQUEsUUFHWixRQUNYLFNBQzBCO0FBQzFCLFVBQU0sTUFBTSxLQUFLO0FBRWpCLFFBQUksS0FBSyxlQUFlLFFBQVc7QUFDakMsWUFBTSxRQUFRLEtBQUssSUFBSSxHQUFHLEtBQUssYUFBYSxLQUFLLElBQUksQ0FBQztBQUV0RCxVQUFJLEtBQUssNkJBQTZCLHlCQUF5QjtBQUMvRCxZQUFNLHdCQUFNLEtBQUs7QUFBQSxJQUNuQjtBQUVBLFVBQU0sT0FBTyxNQUFNLEtBQUssUUFBUTtBQUVoQyxRQUFJLEtBQUsscUNBQXFDO0FBQzlDLFVBQU0sU0FBUyxNQUFNLEtBQUssUUFBUSxJQUFJLEVBQUUsVUFBVTtBQUNsRCxRQUFJLEtBQUssb0NBQW9DO0FBRTdDLFFBQUk7QUFDRixVQUFJLEVBQUUsVUFBVSxvQkFBb0I7QUFHcEM7QUFDRSxjQUFNLFFBQVEsS0FBSyxJQUFJO0FBQ3ZCLGNBQU0sOEJBQVMsT0FBTyxVQUFVLEdBQUcsT0FBTztBQUMxQyxjQUFNLFdBQVcsS0FBSyxJQUFJLElBQUk7QUFFOUIsa0JBQVUsS0FBSyxJQUFJLFVBQVUsVUFBVSxDQUFDO0FBQUEsTUFDMUM7QUFHQSxZQUFNLEVBQUUsVUFBVSxpQkFBaUIsTUFBTSxNQUFNLDhCQUM3QyxPQUFPLFFBQVEsT0FBTyxHQUN0QixPQUNGO0FBRUEsVUFBSSxpQkFBaUIsR0FBRztBQUN0QixhQUFLLGFBQWEsS0FBSyxJQUNyQixLQUFLLGNBQWMsS0FBSyxJQUFJLEdBQzVCLEtBQUssSUFBSSxJQUFJLGlCQUFpQixVQUFVLE1BQzFDO0FBQUEsTUFDRjtBQUVBLGFBQU87QUFBQSxJQUNULFVBQUU7QUFDQSxVQUFJLEtBQUssa0NBQWtDO0FBQzNDLGFBQU8sTUFBTSxLQUFNLFFBQVE7QUFBQSxJQUM3QjtBQUFBLEVBQ0Y7QUFBQSxFQUVRLFFBQVEsTUFBNkM7QUFDM0QsV0FBTyw4QkFBeUI7QUFBQSxNQUM5QixNQUFNO0FBQUEsTUFDTixLQUFLLEtBQUssYUFBYTtBQUFBLE1BQ3ZCLFNBQVMsS0FBSyxRQUFRO0FBQUEsTUFDdEIsWUFBWSxLQUFLO0FBQUEsTUFDakIsc0JBQXNCLEtBQUssUUFBUTtBQUFBLE1BQ25DLGNBQWM7QUFBQSxRQUNaLGVBQWUsc0NBQWEsSUFBSTtBQUFBLE1BQ2xDO0FBQUEsTUFFQSxnQkFBZ0IsQ0FBQyxXQUE4QjtBQUM3QyxlQUFPLEtBQUssYUFBYSxNQUFNO0FBQUEsTUFDakM7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBS0Y7QUE1RU8iLAogICJuYW1lcyI6IFtdCn0K
