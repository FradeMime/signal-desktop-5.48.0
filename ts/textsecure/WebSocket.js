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
var WebSocket_exports = {};
__export(WebSocket_exports, {
  connect: () => connect
});
module.exports = __toCommonJS(WebSocket_exports);
var import_websocket = require("websocket");
var import_AbortableProcess = require("../util/AbortableProcess");
var import_assert = require("../util/assert");
var import_explodePromise = require("../util/explodePromise");
var import_getUserAgent = require("../util/getUserAgent");
var durations = __toESM(require("../util/durations"));
var log = __toESM(require("../logging/log"));
var Timers = __toESM(require("../Timers"));
var import_Errors = require("./Errors");
var import_Utils = require("./Utils");
const TEN_SECONDS = 10 * durations.SECOND;
function connect({
  name,
  url,
  certificateAuthority,
  version,
  proxyAgent,
  extraHeaders = {},
  timeout = TEN_SECONDS,
  createResource
}) {
  const fixedScheme = url.replace("https://", "wss://").replace("http://", "ws://");
  const headers = {
    ...extraHeaders,
    "User-Agent": (0, import_getUserAgent.getUserAgent)(version)
  };
  const client = new import_websocket.client({
    tlsOptions: {
      ca: certificateAuthority,
      agent: proxyAgent
    },
    maxReceivedFrameSize: 2162688
  });
  client.connect(fixedScheme, void 0, void 0, headers);
  const { stack } = new Error();
  const { promise, resolve, reject } = (0, import_explodePromise.explodePromise)();
  const timer = Timers.setTimeout(() => {
    reject(new import_Errors.ConnectTimeoutError("Connection timed out"));
    client.abort();
  }, timeout);
  let resource;
  client.on("connect", (socket) => {
    Timers.clearTimeout(timer);
    resource = createResource(socket);
    resolve(resource);
  });
  client.on("httpResponse", async (response) => {
    Timers.clearTimeout(timer);
    const statusCode = response.statusCode || -1;
    await (0, import_Utils.handleStatusCode)(statusCode);
    const error = new import_Errors.HTTPError("connectResource: invalid websocket response", {
      code: statusCode || -1,
      headers: {},
      stack
    });
    const translatedError = (0, import_Utils.translateError)(error);
    (0, import_assert.strictAssert)(translatedError, "`httpResponse` event cannot be emitted with 200 status code");
    reject(translatedError);
  });
  client.on("connectFailed", (e) => {
    Timers.clearTimeout(timer);
    reject(new import_Errors.HTTPError("connectResource: connectFailed", {
      code: -1,
      headers: {},
      response: e.toString(),
      stack
    }));
  });
  return new import_AbortableProcess.AbortableProcess(`WebSocket.connect(${name})`, {
    abort() {
      if (resource) {
        log.warn(`WebSocket: closing socket ${name}`);
        resource.close(3e3, "aborted");
      } else {
        log.warn(`WebSocket: aborting connection ${name}`);
        Timers.clearTimeout(timer);
        client.abort();
      }
    }
  }, promise);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  connect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiV2ViU29ja2V0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIFByb3h5QWdlbnQgZnJvbSAncHJveHktYWdlbnQnO1xuaW1wb3J0IHsgY2xpZW50IGFzIFdlYlNvY2tldENsaWVudCB9IGZyb20gJ3dlYnNvY2tldCc7XG5pbXBvcnQgdHlwZSB7IGNvbm5lY3Rpb24gYXMgV2ViU29ja2V0IH0gZnJvbSAnd2Vic29ja2V0JztcblxuaW1wb3J0IHsgQWJvcnRhYmxlUHJvY2VzcyB9IGZyb20gJy4uL3V0aWwvQWJvcnRhYmxlUHJvY2Vzcyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyBleHBsb2RlUHJvbWlzZSB9IGZyb20gJy4uL3V0aWwvZXhwbG9kZVByb21pc2UnO1xuaW1wb3J0IHsgZ2V0VXNlckFnZW50IH0gZnJvbSAnLi4vdXRpbC9nZXRVc2VyQWdlbnQnO1xuaW1wb3J0ICogYXMgZHVyYXRpb25zIGZyb20gJy4uL3V0aWwvZHVyYXRpb25zJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgKiBhcyBUaW1lcnMgZnJvbSAnLi4vVGltZXJzJztcbmltcG9ydCB7IENvbm5lY3RUaW1lb3V0RXJyb3IsIEhUVFBFcnJvciB9IGZyb20gJy4vRXJyb3JzJztcbmltcG9ydCB7IGhhbmRsZVN0YXR1c0NvZGUsIHRyYW5zbGF0ZUVycm9yIH0gZnJvbSAnLi9VdGlscyc7XG5cbmNvbnN0IFRFTl9TRUNPTkRTID0gMTAgKiBkdXJhdGlvbnMuU0VDT05EO1xuXG5leHBvcnQgdHlwZSBJUmVzb3VyY2UgPSB7XG4gIGNsb3NlKGNvZGU6IG51bWJlciwgcmVhc29uOiBzdHJpbmcpOiB2b2lkO1xufTtcblxuZXhwb3J0IHR5cGUgQ29ubmVjdE9wdGlvbnNUeXBlPFJlc291cmNlIGV4dGVuZHMgSVJlc291cmNlPiA9IFJlYWRvbmx5PHtcbiAgbmFtZTogc3RyaW5nO1xuICB1cmw6IHN0cmluZztcbiAgY2VydGlmaWNhdGVBdXRob3JpdHk6IHN0cmluZztcbiAgdmVyc2lvbjogc3RyaW5nO1xuICBwcm94eUFnZW50PzogUmV0dXJuVHlwZTx0eXBlb2YgUHJveHlBZ2VudD47XG4gIHRpbWVvdXQ/OiBudW1iZXI7XG4gIGV4dHJhSGVhZGVycz86IFJlY29yZDxzdHJpbmcsIHN0cmluZz47XG5cbiAgY3JlYXRlUmVzb3VyY2Uoc29ja2V0OiBXZWJTb2NrZXQpOiBSZXNvdXJjZTtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gY29ubmVjdDxSZXNvdXJjZSBleHRlbmRzIElSZXNvdXJjZT4oe1xuICBuYW1lLFxuICB1cmwsXG4gIGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICB2ZXJzaW9uLFxuICBwcm94eUFnZW50LFxuICBleHRyYUhlYWRlcnMgPSB7fSxcbiAgdGltZW91dCA9IFRFTl9TRUNPTkRTLFxuICBjcmVhdGVSZXNvdXJjZSxcbn06IENvbm5lY3RPcHRpb25zVHlwZTxSZXNvdXJjZT4pOiBBYm9ydGFibGVQcm9jZXNzPFJlc291cmNlPiB7XG4gIGNvbnN0IGZpeGVkU2NoZW1lID0gdXJsXG4gICAgLnJlcGxhY2UoJ2h0dHBzOi8vJywgJ3dzczovLycpXG4gICAgLnJlcGxhY2UoJ2h0dHA6Ly8nLCAnd3M6Ly8nKTtcblxuICBjb25zdCBoZWFkZXJzID0ge1xuICAgIC4uLmV4dHJhSGVhZGVycyxcbiAgICAnVXNlci1BZ2VudCc6IGdldFVzZXJBZ2VudCh2ZXJzaW9uKSxcbiAgfTtcbiAgY29uc3QgY2xpZW50ID0gbmV3IFdlYlNvY2tldENsaWVudCh7XG4gICAgdGxzT3B0aW9uczoge1xuICAgICAgY2E6IGNlcnRpZmljYXRlQXV0aG9yaXR5LFxuICAgICAgYWdlbnQ6IHByb3h5QWdlbnQsXG4gICAgfSxcbiAgICBtYXhSZWNlaXZlZEZyYW1lU2l6ZTogMHgyMTAwMDAsXG4gIH0pO1xuXG4gIGNsaWVudC5jb25uZWN0KGZpeGVkU2NoZW1lLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgaGVhZGVycyk7XG5cbiAgY29uc3QgeyBzdGFjayB9ID0gbmV3IEVycm9yKCk7XG5cbiAgY29uc3QgeyBwcm9taXNlLCByZXNvbHZlLCByZWplY3QgfSA9IGV4cGxvZGVQcm9taXNlPFJlc291cmNlPigpO1xuXG4gIGNvbnN0IHRpbWVyID0gVGltZXJzLnNldFRpbWVvdXQoKCkgPT4ge1xuICAgIHJlamVjdChuZXcgQ29ubmVjdFRpbWVvdXRFcnJvcignQ29ubmVjdGlvbiB0aW1lZCBvdXQnKSk7XG5cbiAgICBjbGllbnQuYWJvcnQoKTtcbiAgfSwgdGltZW91dCk7XG5cbiAgbGV0IHJlc291cmNlOiBSZXNvdXJjZSB8IHVuZGVmaW5lZDtcbiAgY2xpZW50Lm9uKCdjb25uZWN0Jywgc29ja2V0ID0+IHtcbiAgICBUaW1lcnMuY2xlYXJUaW1lb3V0KHRpbWVyKTtcblxuICAgIHJlc291cmNlID0gY3JlYXRlUmVzb3VyY2Uoc29ja2V0KTtcbiAgICByZXNvbHZlKHJlc291cmNlKTtcbiAgfSk7XG5cbiAgY2xpZW50Lm9uKCdodHRwUmVzcG9uc2UnLCBhc3luYyByZXNwb25zZSA9PiB7XG4gICAgVGltZXJzLmNsZWFyVGltZW91dCh0aW1lcik7XG5cbiAgICBjb25zdCBzdGF0dXNDb2RlID0gcmVzcG9uc2Uuc3RhdHVzQ29kZSB8fCAtMTtcbiAgICBhd2FpdCBoYW5kbGVTdGF0dXNDb2RlKHN0YXR1c0NvZGUpO1xuXG4gICAgY29uc3QgZXJyb3IgPSBuZXcgSFRUUEVycm9yKCdjb25uZWN0UmVzb3VyY2U6IGludmFsaWQgd2Vic29ja2V0IHJlc3BvbnNlJywge1xuICAgICAgY29kZTogc3RhdHVzQ29kZSB8fCAtMSxcbiAgICAgIGhlYWRlcnM6IHt9LFxuICAgICAgc3RhY2ssXG4gICAgfSk7XG5cbiAgICBjb25zdCB0cmFuc2xhdGVkRXJyb3IgPSB0cmFuc2xhdGVFcnJvcihlcnJvcik7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgdHJhbnNsYXRlZEVycm9yLFxuICAgICAgJ2BodHRwUmVzcG9uc2VgIGV2ZW50IGNhbm5vdCBiZSBlbWl0dGVkIHdpdGggMjAwIHN0YXR1cyBjb2RlJ1xuICAgICk7XG5cbiAgICByZWplY3QodHJhbnNsYXRlZEVycm9yKTtcbiAgfSk7XG5cbiAgY2xpZW50Lm9uKCdjb25uZWN0RmFpbGVkJywgZSA9PiB7XG4gICAgVGltZXJzLmNsZWFyVGltZW91dCh0aW1lcik7XG5cbiAgICByZWplY3QoXG4gICAgICBuZXcgSFRUUEVycm9yKCdjb25uZWN0UmVzb3VyY2U6IGNvbm5lY3RGYWlsZWQnLCB7XG4gICAgICAgIGNvZGU6IC0xLFxuICAgICAgICBoZWFkZXJzOiB7fSxcbiAgICAgICAgcmVzcG9uc2U6IGUudG9TdHJpbmcoKSxcbiAgICAgICAgc3RhY2ssXG4gICAgICB9KVxuICAgICk7XG4gIH0pO1xuXG4gIHJldHVybiBuZXcgQWJvcnRhYmxlUHJvY2VzczxSZXNvdXJjZT4oXG4gICAgYFdlYlNvY2tldC5jb25uZWN0KCR7bmFtZX0pYCxcbiAgICB7XG4gICAgICBhYm9ydCgpIHtcbiAgICAgICAgaWYgKHJlc291cmNlKSB7XG4gICAgICAgICAgbG9nLndhcm4oYFdlYlNvY2tldDogY2xvc2luZyBzb2NrZXQgJHtuYW1lfWApO1xuICAgICAgICAgIHJlc291cmNlLmNsb3NlKDMwMDAsICdhYm9ydGVkJyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbG9nLndhcm4oYFdlYlNvY2tldDogYWJvcnRpbmcgY29ubmVjdGlvbiAke25hbWV9YCk7XG4gICAgICAgICAgVGltZXJzLmNsZWFyVGltZW91dCh0aW1lcik7XG4gICAgICAgICAgY2xpZW50LmFib3J0KCk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgfSxcbiAgICBwcm9taXNlXG4gICk7XG59XG4iXSwKICAi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
