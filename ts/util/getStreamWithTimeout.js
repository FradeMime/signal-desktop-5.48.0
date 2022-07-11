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
var getStreamWithTimeout_exports = {};
__export(getStreamWithTimeout_exports, {
  StreamTimeoutError: () => StreamTimeoutError,
  getStreamWithTimeout: () => getStreamWithTimeout
});
module.exports = __toCommonJS(getStreamWithTimeout_exports);
var Bytes = __toESM(require("../Bytes"));
var import_clearTimeoutIfNecessary = require("./clearTimeoutIfNecessary");
var import_explodePromise = require("./explodePromise");
class StreamTimeoutError extends Error {
}
function getStreamWithTimeout(stream, { name, timeout, abortController }) {
  const { promise, resolve, reject } = (0, import_explodePromise.explodePromise)();
  const chunks = new Array();
  let timer;
  const clearTimer = /* @__PURE__ */ __name(() => {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(timer);
    timer = void 0;
  }, "clearTimer");
  const reset = /* @__PURE__ */ __name(() => {
    clearTimer();
    timer = setTimeout(() => {
      abortController.abort();
      reject(new StreamTimeoutError(`getStreamWithTimeout(${name}) timed out`));
    }, timeout);
  }, "reset");
  stream.on("data", (chunk) => {
    reset();
    chunks.push(chunk);
  });
  stream.on("end", () => {
    clearTimer();
    resolve(Bytes.concatenate(chunks));
  });
  stream.on("error", (error) => {
    clearTimer();
    reject(error);
  });
  reset();
  return promise;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  StreamTimeoutError,
  getStreamWithTimeout
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0U3RyZWFtV2l0aFRpbWVvdXQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWRhYmxlIH0gZnJvbSAnc3RyZWFtJztcblxuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuaW1wb3J0IHsgY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnkgfSBmcm9tICcuL2NsZWFyVGltZW91dElmTmVjZXNzYXJ5JztcbmltcG9ydCB7IGV4cGxvZGVQcm9taXNlIH0gZnJvbSAnLi9leHBsb2RlUHJvbWlzZSc7XG5cbmV4cG9ydCB0eXBlIE9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBuYW1lOiBzdHJpbmc7XG4gIHRpbWVvdXQ6IG51bWJlcjtcbiAgYWJvcnRDb250cm9sbGVyOiB7IGFib3J0KCk6IHZvaWQgfTtcbn0+O1xuXG5leHBvcnQgY2xhc3MgU3RyZWFtVGltZW91dEVycm9yIGV4dGVuZHMgRXJyb3Ige31cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFN0cmVhbVdpdGhUaW1lb3V0KFxuICBzdHJlYW06IFJlYWRhYmxlLFxuICB7IG5hbWUsIHRpbWVvdXQsIGFib3J0Q29udHJvbGxlciB9OiBPcHRpb25zVHlwZVxuKTogUHJvbWlzZTxVaW50OEFycmF5PiB7XG4gIGNvbnN0IHsgcHJvbWlzZSwgcmVzb2x2ZSwgcmVqZWN0IH0gPSBleHBsb2RlUHJvbWlzZTxVaW50OEFycmF5PigpO1xuXG4gIGNvbnN0IGNodW5rcyA9IG5ldyBBcnJheTxVaW50OEFycmF5PigpO1xuXG4gIGxldCB0aW1lcjogTm9kZUpTLlRpbWVvdXQgfCB1bmRlZmluZWQ7XG5cbiAgY29uc3QgY2xlYXJUaW1lciA9ICgpID0+IHtcbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aW1lcik7XG4gICAgdGltZXIgPSB1bmRlZmluZWQ7XG4gIH07XG5cbiAgY29uc3QgcmVzZXQgPSAoKSA9PiB7XG4gICAgY2xlYXJUaW1lcigpO1xuXG4gICAgdGltZXIgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGFib3J0Q29udHJvbGxlci5hYm9ydCgpO1xuICAgICAgcmVqZWN0KG5ldyBTdHJlYW1UaW1lb3V0RXJyb3IoYGdldFN0cmVhbVdpdGhUaW1lb3V0KCR7bmFtZX0pIHRpbWVkIG91dGApKTtcbiAgICB9LCB0aW1lb3V0KTtcbiAgfTtcblxuICBzdHJlYW0ub24oJ2RhdGEnLCBjaHVuayA9PiB7XG4gICAgcmVzZXQoKTtcblxuICAgIGNodW5rcy5wdXNoKGNodW5rKTtcbiAgfSk7XG5cbiAgc3RyZWFtLm9uKCdlbmQnLCAoKSA9PiB7XG4gICAgY2xlYXJUaW1lcigpO1xuICAgIHJlc29sdmUoQnl0ZXMuY29uY2F0ZW5hdGUoY2h1bmtzKSk7XG4gIH0pO1xuXG4gIHN0cmVhbS5vbignZXJyb3InLCBlcnJvciA9PiB7XG4gICAgY2xlYXJUaW1lcigpO1xuICAgIHJlamVjdChlcnJvcik7XG4gIH0pO1xuXG4gIHJlc2V0KCk7XG5cbiAgcmV0dXJuIHByb21pc2U7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFLQSxZQUF1QjtBQUN2QixxQ0FBd0M7QUFDeEMsNEJBQStCO0FBUXhCLE1BQU0sMkJBQTJCLE1BQU07QUFBQztBQUF4QyxBQUVBLDhCQUNMLFFBQ0EsRUFBRSxNQUFNLFNBQVMsbUJBQ0k7QUFDckIsUUFBTSxFQUFFLFNBQVMsU0FBUyxXQUFXLDBDQUEyQjtBQUVoRSxRQUFNLFNBQVMsSUFBSSxNQUFrQjtBQUVyQyxNQUFJO0FBRUosUUFBTSxhQUFhLDZCQUFNO0FBQ3ZCLGdFQUF3QixLQUFLO0FBQzdCLFlBQVE7QUFBQSxFQUNWLEdBSG1CO0FBS25CLFFBQU0sUUFBUSw2QkFBTTtBQUNsQixlQUFXO0FBRVgsWUFBUSxXQUFXLE1BQU07QUFDdkIsc0JBQWdCLE1BQU07QUFDdEIsYUFBTyxJQUFJLG1CQUFtQix3QkFBd0IsaUJBQWlCLENBQUM7QUFBQSxJQUMxRSxHQUFHLE9BQU87QUFBQSxFQUNaLEdBUGM7QUFTZCxTQUFPLEdBQUcsUUFBUSxXQUFTO0FBQ3pCLFVBQU07QUFFTixXQUFPLEtBQUssS0FBSztBQUFBLEVBQ25CLENBQUM7QUFFRCxTQUFPLEdBQUcsT0FBTyxNQUFNO0FBQ3JCLGVBQVc7QUFDWCxZQUFRLE1BQU0sWUFBWSxNQUFNLENBQUM7QUFBQSxFQUNuQyxDQUFDO0FBRUQsU0FBTyxHQUFHLFNBQVMsV0FBUztBQUMxQixlQUFXO0FBQ1gsV0FBTyxLQUFLO0FBQUEsRUFDZCxDQUFDO0FBRUQsUUFBTTtBQUVOLFNBQU87QUFDVDtBQTNDZ0IiLAogICJuYW1lcyI6IFtdCn0K
