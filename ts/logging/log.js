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
var log_exports = {};
__export(log_exports, {
  debug: () => debug,
  error: () => error,
  fatal: () => fatal,
  info: () => info,
  setLogAtLevel: () => setLogAtLevel,
  trace: () => trace,
  warn: () => warn
});
module.exports = __toCommonJS(log_exports);
var import_lodash = require("lodash");
var import_Logging = require("../types/Logging");
let logAtLevel = import_lodash.noop;
let hasInitialized = false;
const fatal = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Fatal, ...args), "fatal");
const error = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Error, ...args), "error");
const warn = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Warn, ...args), "warn");
const info = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Info, ...args), "info");
const debug = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Debug, ...args), "debug");
const trace = /* @__PURE__ */ __name((...args) => logAtLevel(import_Logging.LogLevel.Trace, ...args), "trace");
function setLogAtLevel(log) {
  if (hasInitialized) {
    throw new Error("Logger has already been initialized");
  }
  logAtLevel = log;
  hasInitialized = true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  debug,
  error,
  fatal,
  info,
  setLogAtLevel,
  trace,
  warn
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibG9nLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBMb2dGdW5jdGlvbiB9IGZyb20gJy4uL3R5cGVzL0xvZ2dpbmcnO1xuaW1wb3J0IHsgTG9nTGV2ZWwgfSBmcm9tICcuLi90eXBlcy9Mb2dnaW5nJztcblxudHlwZSBMb2dBdExldmVsRm5UeXBlID0gKFxuICBsZXZlbDogTG9nTGV2ZWwsXG4gIC4uLmFyZ3M6IFJlYWRvbmx5QXJyYXk8dW5rbm93bj5cbikgPT4gdm9pZDtcblxubGV0IGxvZ0F0TGV2ZWw6IExvZ0F0TGV2ZWxGblR5cGUgPSBub29wO1xubGV0IGhhc0luaXRpYWxpemVkID0gZmFsc2U7XG5cbmV4cG9ydCBjb25zdCBmYXRhbDogTG9nRnVuY3Rpb24gPSAoLi4uYXJncykgPT5cbiAgbG9nQXRMZXZlbChMb2dMZXZlbC5GYXRhbCwgLi4uYXJncyk7XG5leHBvcnQgY29uc3QgZXJyb3I6IExvZ0Z1bmN0aW9uID0gKC4uLmFyZ3MpID0+XG4gIGxvZ0F0TGV2ZWwoTG9nTGV2ZWwuRXJyb3IsIC4uLmFyZ3MpO1xuZXhwb3J0IGNvbnN0IHdhcm46IExvZ0Z1bmN0aW9uID0gKC4uLmFyZ3MpID0+XG4gIGxvZ0F0TGV2ZWwoTG9nTGV2ZWwuV2FybiwgLi4uYXJncyk7XG5leHBvcnQgY29uc3QgaW5mbzogTG9nRnVuY3Rpb24gPSAoLi4uYXJncykgPT5cbiAgbG9nQXRMZXZlbChMb2dMZXZlbC5JbmZvLCAuLi5hcmdzKTtcbmV4cG9ydCBjb25zdCBkZWJ1ZzogTG9nRnVuY3Rpb24gPSAoLi4uYXJncykgPT5cbiAgbG9nQXRMZXZlbChMb2dMZXZlbC5EZWJ1ZywgLi4uYXJncyk7XG5leHBvcnQgY29uc3QgdHJhY2U6IExvZ0Z1bmN0aW9uID0gKC4uLmFyZ3MpID0+XG4gIGxvZ0F0TGV2ZWwoTG9nTGV2ZWwuVHJhY2UsIC4uLmFyZ3MpO1xuXG4vKipcbiAqIFNldHMgdGhlIGxvdy1sZXZlbCBsb2dnaW5nIGludGVyZmFjZS4gU2hvdWxkIGJlIGNhbGxlZCBlYXJseSBpbiBhIHByb2Nlc3MncyBsaWZlLCBhbmRcbiAqIGNhbiBvbmx5IGJlIGNhbGxlZCBvbmNlLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2V0TG9nQXRMZXZlbChsb2c6IExvZ0F0TGV2ZWxGblR5cGUpOiB2b2lkIHtcbiAgaWYgKGhhc0luaXRpYWxpemVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdMb2dnZXIgaGFzIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCcpO1xuICB9XG4gIGxvZ0F0TGV2ZWwgPSBsb2c7XG4gIGhhc0luaXRpYWxpemVkID0gdHJ1ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBcUI7QUFFckIscUJBQXlCO0FBT3pCLElBQUksYUFBK0I7QUFDbkMsSUFBSSxpQkFBaUI7QUFFZCxNQUFNLFFBQXFCLDJCQUFJLFNBQ3BDLFdBQVcsd0JBQVMsT0FBTyxHQUFHLElBQUksR0FERjtBQUUzQixNQUFNLFFBQXFCLDJCQUFJLFNBQ3BDLFdBQVcsd0JBQVMsT0FBTyxHQUFHLElBQUksR0FERjtBQUUzQixNQUFNLE9BQW9CLDJCQUFJLFNBQ25DLFdBQVcsd0JBQVMsTUFBTSxHQUFHLElBQUksR0FERjtBQUUxQixNQUFNLE9BQW9CLDJCQUFJLFNBQ25DLFdBQVcsd0JBQVMsTUFBTSxHQUFHLElBQUksR0FERjtBQUUxQixNQUFNLFFBQXFCLDJCQUFJLFNBQ3BDLFdBQVcsd0JBQVMsT0FBTyxHQUFHLElBQUksR0FERjtBQUUzQixNQUFNLFFBQXFCLDJCQUFJLFNBQ3BDLFdBQVcsd0JBQVMsT0FBTyxHQUFHLElBQUksR0FERjtBQU8zQix1QkFBdUIsS0FBNkI7QUFDekQsTUFBSSxnQkFBZ0I7QUFDbEIsVUFBTSxJQUFJLE1BQU0scUNBQXFDO0FBQUEsRUFDdkQ7QUFDQSxlQUFhO0FBQ2IsbUJBQWlCO0FBQ25CO0FBTmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
