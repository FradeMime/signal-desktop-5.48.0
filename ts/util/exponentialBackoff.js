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
var exponentialBackoff_exports = {};
__export(exponentialBackoff_exports, {
  exponentialBackoffMaxAttempts: () => exponentialBackoffMaxAttempts,
  exponentialBackoffSleepTime: () => exponentialBackoffSleepTime
});
module.exports = __toCommonJS(exponentialBackoff_exports);
var durations = __toESM(require("./durations"));
const BACKOFF_FACTOR = 1.9;
const MAX_BACKOFF = 15 * durations.MINUTE;
function exponentialBackoffSleepTime(attempt) {
  const failureCount = attempt - 1;
  if (failureCount === 0) {
    return 0;
  }
  return Math.min(MAX_BACKOFF, 100 * BACKOFF_FACTOR ** failureCount);
}
function exponentialBackoffMaxAttempts(desiredDurationMs) {
  let attempts = 0;
  let total = 0;
  do {
    attempts += 1;
    total += exponentialBackoffSleepTime(attempts);
  } while (total < desiredDurationMs);
  return attempts;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  exponentialBackoffMaxAttempts,
  exponentialBackoffSleepTime
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXhwb25lbnRpYWxCYWNrb2ZmLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuL2R1cmF0aW9ucyc7XG5cbmNvbnN0IEJBQ0tPRkZfRkFDVE9SID0gMS45O1xuY29uc3QgTUFYX0JBQ0tPRkYgPSAxNSAqIGR1cmF0aW9ucy5NSU5VVEU7XG5cbi8qKlxuICogRm9yIGEgZ2l2ZW4gYXR0ZW1wdCwgaG93IGxvbmcgc2hvdWxkIHdlIHNsZWVwIChpbiBtaWxsaXNlY29uZHMpP1xuICpcbiAqIFRoZSBhdHRlbXB0IHNob3VsZCBiZSBhIHBvc2l0aXZlIGludGVnZXIsIGFuZCBpdCBpcyAxLWluZGV4ZWQuIFRoZSBmaXJzdCBhdHRlbXB0IGlzIDEsXG4gKiB0aGUgc2Vjb25kIGlzIDIsIGFuZCBzbyBvbi5cbiAqXG4gKiBUaGlzIGlzIG1vZGlmaWVkIGZyb20gW2lPUydzIGNvZGViYXNlXVswXS5cbiAqXG4gKiBbMF06IGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLWlPUy9ibG9iLzYwNjk3NDE2MDI0MjE3NDRlZGZiNTk5MjNkMmZiM2E2NmIxYjIzYzEvU2lnbmFsU2VydmljZUtpdC9zcmMvVXRpbC9PV1NPcGVyYXRpb24uc3dpZnRcbiAqL1xuZXhwb3J0IGZ1bmN0aW9uIGV4cG9uZW50aWFsQmFja29mZlNsZWVwVGltZShhdHRlbXB0OiBudW1iZXIpOiBudW1iZXIge1xuICBjb25zdCBmYWlsdXJlQ291bnQgPSBhdHRlbXB0IC0gMTtcbiAgaWYgKGZhaWx1cmVDb3VudCA9PT0gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIHJldHVybiBNYXRoLm1pbihNQVhfQkFDS09GRiwgMTAwICogQkFDS09GRl9GQUNUT1IgKiogZmFpbHVyZUNvdW50KTtcbn1cblxuLyoqXG4gKiBJZiBJIHdhbnQgdG8gcmV0cnkgZm9yIFggbWlsbGlzZWNvbmRzLCBob3cgbWFueSBhdHRlbXB0cyBpcyB0aGF0LCByb3VnaGx5PyBGb3IgZXhhbXBsZSxcbiAqIDI0IGhvdXJzICg4Niw0MDAsMDAwIG1pbGxpc2Vjb25kcykgaXMgMTExIGF0dGVtcHRzLlxuICpcbiAqIGBkZXNpcmVkRHVyYXRpb25Nc2Agc2hvdWxkIGJlIGF0IGxlYXN0IDEuXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBleHBvbmVudGlhbEJhY2tvZmZNYXhBdHRlbXB0cyhcbiAgZGVzaXJlZER1cmF0aW9uTXM6IG51bWJlclxuKTogbnVtYmVyIHtcbiAgbGV0IGF0dGVtcHRzID0gMDtcbiAgbGV0IHRvdGFsID0gMDtcbiAgLy8gVGhlcmUncyBwcm9iYWJseSBzb21lIGFsZ2VicmEgd2UgY291bGQgZG8gaGVyZSBpbnN0ZWFkIG9mIHRoaXMgbG9vcCwgYnV0IHRoaXMgaXNcbiAgLy8gICBmYXN0IGV2ZW4gZm9yIGdpYW50IG51bWJlcnMsIGFuZCBpcyB0eXBpY2FsbHkgY2FsbGVkIGp1c3Qgb25jZSBhdCBzdGFydHVwLlxuICBkbyB7XG4gICAgYXR0ZW1wdHMgKz0gMTtcbiAgICB0b3RhbCArPSBleHBvbmVudGlhbEJhY2tvZmZTbGVlcFRpbWUoYXR0ZW1wdHMpO1xuICB9IHdoaWxlICh0b3RhbCA8IGRlc2lyZWREdXJhdGlvbk1zKTtcbiAgcmV0dXJuIGF0dGVtcHRzO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsZ0JBQTJCO0FBRTNCLE1BQU0saUJBQWlCO0FBQ3ZCLE1BQU0sY0FBYyxLQUFLLFVBQVU7QUFZNUIscUNBQXFDLFNBQXlCO0FBQ25FLFFBQU0sZUFBZSxVQUFVO0FBQy9CLE1BQUksaUJBQWlCLEdBQUc7QUFDdEIsV0FBTztBQUFBLEVBQ1Q7QUFDQSxTQUFPLEtBQUssSUFBSSxhQUFhLE1BQU0sa0JBQWtCLFlBQVk7QUFDbkU7QUFOZ0IsQUFjVCx1Q0FDTCxtQkFDUTtBQUNSLE1BQUksV0FBVztBQUNmLE1BQUksUUFBUTtBQUdaLEtBQUc7QUFDRCxnQkFBWTtBQUNaLGFBQVMsNEJBQTRCLFFBQVE7QUFBQSxFQUMvQyxTQUFTLFFBQVE7QUFDakIsU0FBTztBQUNUO0FBWmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
