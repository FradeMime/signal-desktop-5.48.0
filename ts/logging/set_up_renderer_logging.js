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
var set_up_renderer_logging_exports = {};
__export(set_up_renderer_logging_exports, {
  beforeRestart: () => beforeRestart,
  initialize: () => initialize
});
module.exports = __toCommonJS(set_up_renderer_logging_exports);
var import_electron = require("electron");
var path = __toESM(require("path"));
var import_pino = __toESM(require("pino"));
var import_rotating_file_stream = require("rotating-file-stream");
var import_libsignal_client = require("@signalapp/libsignal-client");
var import_shared = require("./shared");
var log = __toESM(require("./log"));
var import_environment = require("../environment");
function now() {
  const date = new Date();
  return date.toJSON();
}
function consoleLog(...args) {
  logAtLevel(import_shared.LogLevel.Info, ...args);
}
if (window.console) {
  console._log = console.log;
  console.log = consoleLog;
}
let globalLogger;
let shouldRestart = false;
function beforeRestart() {
  shouldRestart = true;
}
function initialize() {
  if (globalLogger) {
    throw new Error("Already called initialize!");
  }
  const basePath = import_electron.ipcRenderer.sendSync("get-user-data-path");
  const logFile = path.join(basePath, "logs", "app.log");
  const stream = (0, import_rotating_file_stream.createStream)(logFile, {
    interval: "1d",
    rotate: 3
  });
  const onClose = /* @__PURE__ */ __name(() => {
    globalLogger = void 0;
    if (shouldRestart) {
      initialize();
    }
  }, "onClose");
  stream.on("close", onClose);
  stream.on("error", onClose);
  globalLogger = (0, import_pino.default)({
    timestamp: import_pino.default.stdTimeFunctions.isoTime
  }, stream);
}
function logAtLevel(level, ...args) {
  if ((0, import_environment.getEnvironment)() !== import_environment.Environment.Production) {
    const prefix = (0, import_shared.getLogLevelString)(level).toUpperCase().padEnd(import_shared.levelMaxLength, " ");
    console._log(prefix, now(), ...args);
  }
  const levelString = (0, import_shared.getLogLevelString)(level);
  const msg = (0, import_shared.cleanArgs)(args);
  if (!globalLogger) {
    throw new Error("Logger has not been initialized yet");
    return;
  }
  globalLogger[levelString](msg);
}
log.setLogAtLevel(logAtLevel);
window.SignalContext = window.SignalContext || {};
window.SignalContext.log = {
  fatal: log.fatal,
  error: log.error,
  warn: log.warn,
  info: log.info,
  debug: log.debug,
  trace: log.trace
};
window.onerror = (_message, _script, _line, _col, error) => {
  const errorInfo = error && error.stack ? error.stack : JSON.stringify(error);
  log.error(`Top-level unhandled error: ${errorInfo}`);
};
window.addEventListener("unhandledrejection", (rejectionEvent) => {
  const error = rejectionEvent.reason;
  const errorString = error && error.stack ? error.stack : JSON.stringify(error);
  log.error(`Top-level unhandled promise rejection: ${errorString}`);
});
(0, import_libsignal_client.initLogger)(import_libsignal_client.LogLevel.Info, (level, target, file, line, message) => {
  let fileString = "";
  if (file && line) {
    fileString = ` ${file}:${line}`;
  } else if (file) {
    fileString = ` ${file}`;
  }
  const logString = `@signalapp/libsignal-client ${message} ${target}${fileString}`;
  if (level === import_libsignal_client.LogLevel.Trace) {
    log.trace(logString);
  } else if (level === import_libsignal_client.LogLevel.Debug) {
    log.debug(logString);
  } else if (level === import_libsignal_client.LogLevel.Info) {
    log.info(logString);
  } else if (level === import_libsignal_client.LogLevel.Warn) {
    log.warn(logString);
  } else if (level === import_libsignal_client.LogLevel.Error) {
    log.error(logString);
  } else {
    log.error(`${logString} (unknown log level ${level})`);
  }
});
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  beforeRestart,
  initialize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2V0X3VwX3JlbmRlcmVyX2xvZ2dpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vKiBlc2xpbnQtZW52IG5vZGUgKi9cblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuXG5pbXBvcnQgeyBpcGNSZW5kZXJlciBhcyBpcGMgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHBpbm8gZnJvbSAncGlubyc7XG5pbXBvcnQgeyBjcmVhdGVTdHJlYW0gfSBmcm9tICdyb3RhdGluZy1maWxlLXN0cmVhbSc7XG5cbmltcG9ydCB7XG4gIGluaXRMb2dnZXIsXG4gIExvZ0xldmVsIGFzIFNpZ25hbENsaWVudExvZ0xldmVsLFxufSBmcm9tICdAc2lnbmFsYXBwL2xpYnNpZ25hbC1jbGllbnQnO1xuXG5pbXBvcnQge1xuICBMb2dMZXZlbCxcbiAgY2xlYW5BcmdzLFxuICBnZXRMb2dMZXZlbFN0cmluZyxcbiAgbGV2ZWxNYXhMZW5ndGgsXG59IGZyb20gJy4vc2hhcmVkJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuL2xvZyc7XG5pbXBvcnQgeyBFbnZpcm9ubWVudCwgZ2V0RW52aXJvbm1lbnQgfSBmcm9tICcuLi9lbnZpcm9ubWVudCc7XG5cbi8vIEJhY2t3YXJkcy1jb21wYXRpYmxlIGxvZ2dpbmcsIHNpbXBsZSBzdHJpbmdzIGFuZCBubyBsZXZlbCAoZGVmYXVsdGVkIHRvIElORk8pXG5mdW5jdGlvbiBub3coKSB7XG4gIGNvbnN0IGRhdGUgPSBuZXcgRGF0ZSgpO1xuICByZXR1cm4gZGF0ZS50b0pTT04oKTtcbn1cblxuZnVuY3Rpb24gY29uc29sZUxvZyguLi5hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KSB7XG4gIGxvZ0F0TGV2ZWwoTG9nTGV2ZWwuSW5mbywgLi4uYXJncyk7XG59XG5cbmlmICh3aW5kb3cuY29uc29sZSkge1xuICBjb25zb2xlLl9sb2cgPSBjb25zb2xlLmxvZztcbiAgY29uc29sZS5sb2cgPSBjb25zb2xlTG9nO1xufVxuXG5sZXQgZ2xvYmFsTG9nZ2VyOiB1bmRlZmluZWQgfCBwaW5vLkxvZ2dlcjtcbmxldCBzaG91bGRSZXN0YXJ0ID0gZmFsc2U7XG5cbmV4cG9ydCBmdW5jdGlvbiBiZWZvcmVSZXN0YXJ0KCk6IHZvaWQge1xuICBzaG91bGRSZXN0YXJ0ID0gdHJ1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUoKTogdm9pZCB7XG4gIGlmIChnbG9iYWxMb2dnZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ0FscmVhZHkgY2FsbGVkIGluaXRpYWxpemUhJyk7XG4gIH1cblxuICBjb25zdCBiYXNlUGF0aCA9IGlwYy5zZW5kU3luYygnZ2V0LXVzZXItZGF0YS1wYXRoJyk7XG4gIGNvbnN0IGxvZ0ZpbGUgPSBwYXRoLmpvaW4oYmFzZVBhdGgsICdsb2dzJywgJ2FwcC5sb2cnKTtcbiAgY29uc3Qgc3RyZWFtID0gY3JlYXRlU3RyZWFtKGxvZ0ZpbGUsIHtcbiAgICBpbnRlcnZhbDogJzFkJyxcbiAgICByb3RhdGU6IDMsXG4gIH0pO1xuXG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgZ2xvYmFsTG9nZ2VyID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNob3VsZFJlc3RhcnQpIHtcbiAgICAgIGluaXRpYWxpemUoKTtcbiAgICB9XG4gIH07XG5cbiAgc3RyZWFtLm9uKCdjbG9zZScsIG9uQ2xvc2UpO1xuICBzdHJlYW0ub24oJ2Vycm9yJywgb25DbG9zZSk7XG5cbiAgZ2xvYmFsTG9nZ2VyID0gcGlubyhcbiAgICB7XG4gICAgICB0aW1lc3RhbXA6IHBpbm8uc3RkVGltZUZ1bmN0aW9ucy5pc29UaW1lLFxuICAgIH0sXG4gICAgc3RyZWFtXG4gICk7XG59XG5cbi8vIEEgbW9kZXJuIGxvZ2dpbmcgaW50ZXJmYWNlIGZvciB0aGUgYnJvd3NlclxuXG5mdW5jdGlvbiBsb2dBdExldmVsKGxldmVsOiBMb2dMZXZlbCwgLi4uYXJnczogUmVhZG9ubHlBcnJheTx1bmtub3duPik6IHZvaWQge1xuICBpZiAoZ2V0RW52aXJvbm1lbnQoKSAhPT0gRW52aXJvbm1lbnQuUHJvZHVjdGlvbikge1xuICAgIGNvbnN0IHByZWZpeCA9IGdldExvZ0xldmVsU3RyaW5nKGxldmVsKVxuICAgICAgLnRvVXBwZXJDYXNlKClcbiAgICAgIC5wYWRFbmQobGV2ZWxNYXhMZW5ndGgsICcgJyk7XG4gICAgY29uc29sZS5fbG9nKHByZWZpeCwgbm93KCksIC4uLmFyZ3MpO1xuICB9XG5cbiAgY29uc3QgbGV2ZWxTdHJpbmcgPSBnZXRMb2dMZXZlbFN0cmluZyhsZXZlbCk7XG4gIGNvbnN0IG1zZyA9IGNsZWFuQXJncyhhcmdzKTtcblxuICBpZiAoIWdsb2JhbExvZ2dlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9nZ2VyIGhhcyBub3QgYmVlbiBpbml0aWFsaXplZCB5ZXQnKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBnbG9iYWxMb2dnZXJbbGV2ZWxTdHJpbmddKG1zZyk7XG59XG5cbmxvZy5zZXRMb2dBdExldmVsKGxvZ0F0TGV2ZWwpO1xuXG53aW5kb3cuU2lnbmFsQ29udGV4dCA9IHdpbmRvdy5TaWduYWxDb250ZXh0IHx8IHt9O1xud2luZG93LlNpZ25hbENvbnRleHQubG9nID0ge1xuICBmYXRhbDogbG9nLmZhdGFsLFxuICBlcnJvcjogbG9nLmVycm9yLFxuICB3YXJuOiBsb2cud2FybixcbiAgaW5mbzogbG9nLmluZm8sXG4gIGRlYnVnOiBsb2cuZGVidWcsXG4gIHRyYWNlOiBsb2cudHJhY2UsXG59O1xuXG53aW5kb3cub25lcnJvciA9IChfbWVzc2FnZSwgX3NjcmlwdCwgX2xpbmUsIF9jb2wsIGVycm9yKSA9PiB7XG4gIGNvbnN0IGVycm9ySW5mbyA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBKU09OLnN0cmluZ2lmeShlcnJvcik7XG4gIGxvZy5lcnJvcihgVG9wLWxldmVsIHVuaGFuZGxlZCBlcnJvcjogJHtlcnJvckluZm99YCk7XG59O1xuXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndW5oYW5kbGVkcmVqZWN0aW9uJywgcmVqZWN0aW9uRXZlbnQgPT4ge1xuICBjb25zdCBlcnJvciA9IHJlamVjdGlvbkV2ZW50LnJlYXNvbjtcbiAgY29uc3QgZXJyb3JTdHJpbmcgPVxuICAgIGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBKU09OLnN0cmluZ2lmeShlcnJvcik7XG4gIGxvZy5lcnJvcihgVG9wLWxldmVsIHVuaGFuZGxlZCBwcm9taXNlIHJlamVjdGlvbjogJHtlcnJvclN0cmluZ31gKTtcbn0pO1xuXG5pbml0TG9nZ2VyKFxuICBTaWduYWxDbGllbnRMb2dMZXZlbC5JbmZvLFxuICAoXG4gICAgbGV2ZWw6IHVua25vd24sXG4gICAgdGFyZ2V0OiBzdHJpbmcsXG4gICAgZmlsZTogc3RyaW5nIHwgbnVsbCxcbiAgICBsaW5lOiBudW1iZXIgfCBudWxsLFxuICAgIG1lc3NhZ2U6IHN0cmluZ1xuICApID0+IHtcbiAgICBsZXQgZmlsZVN0cmluZyA9ICcnO1xuICAgIGlmIChmaWxlICYmIGxpbmUpIHtcbiAgICAgIGZpbGVTdHJpbmcgPSBgICR7ZmlsZX06JHtsaW5lfWA7XG4gICAgfSBlbHNlIGlmIChmaWxlKSB7XG4gICAgICBmaWxlU3RyaW5nID0gYCAke2ZpbGV9YDtcbiAgICB9XG4gICAgY29uc3QgbG9nU3RyaW5nID0gYEBzaWduYWxhcHAvbGlic2lnbmFsLWNsaWVudCAke21lc3NhZ2V9ICR7dGFyZ2V0fSR7ZmlsZVN0cmluZ31gO1xuXG4gICAgaWYgKGxldmVsID09PSBTaWduYWxDbGllbnRMb2dMZXZlbC5UcmFjZSkge1xuICAgICAgbG9nLnRyYWNlKGxvZ1N0cmluZyk7XG4gICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gU2lnbmFsQ2xpZW50TG9nTGV2ZWwuRGVidWcpIHtcbiAgICAgIGxvZy5kZWJ1Zyhsb2dTdHJpbmcpO1xuICAgIH0gZWxzZSBpZiAobGV2ZWwgPT09IFNpZ25hbENsaWVudExvZ0xldmVsLkluZm8pIHtcbiAgICAgIGxvZy5pbmZvKGxvZ1N0cmluZyk7XG4gICAgfSBlbHNlIGlmIChsZXZlbCA9PT0gU2lnbmFsQ2xpZW50TG9nTGV2ZWwuV2Fybikge1xuICAgICAgbG9nLndhcm4obG9nU3RyaW5nKTtcbiAgICB9IGVsc2UgaWYgKGxldmVsID09PSBTaWduYWxDbGllbnRMb2dMZXZlbC5FcnJvcikge1xuICAgICAgbG9nLmVycm9yKGxvZ1N0cmluZyk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5lcnJvcihgJHtsb2dTdHJpbmd9ICh1bmtub3duIGxvZyBsZXZlbCAke2xldmVsfSlgKTtcbiAgICB9XG4gIH1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxzQkFBbUM7QUFDbkMsV0FBc0I7QUFDdEIsa0JBQWlCO0FBQ2pCLGtDQUE2QjtBQUU3Qiw4QkFHTztBQUVQLG9CQUtPO0FBQ1AsVUFBcUI7QUFDckIseUJBQTRDO0FBRzVDLGVBQWU7QUFDYixRQUFNLE9BQU8sSUFBSSxLQUFLO0FBQ3RCLFNBQU8sS0FBSyxPQUFPO0FBQ3JCO0FBSFMsQUFLVCx1QkFBdUIsTUFBOEI7QUFDbkQsYUFBVyx1QkFBUyxNQUFNLEdBQUcsSUFBSTtBQUNuQztBQUZTLEFBSVQsSUFBSSxPQUFPLFNBQVM7QUFDbEIsVUFBUSxPQUFPLFFBQVE7QUFDdkIsVUFBUSxNQUFNO0FBQ2hCO0FBRUEsSUFBSTtBQUNKLElBQUksZ0JBQWdCO0FBRWIseUJBQStCO0FBQ3BDLGtCQUFnQjtBQUNsQjtBQUZnQixBQUlULHNCQUE0QjtBQUNqQyxNQUFJLGNBQWM7QUFDaEIsVUFBTSxJQUFJLE1BQU0sNEJBQTRCO0FBQUEsRUFDOUM7QUFFQSxRQUFNLFdBQVcsNEJBQUksU0FBUyxvQkFBb0I7QUFDbEQsUUFBTSxVQUFVLEtBQUssS0FBSyxVQUFVLFFBQVEsU0FBUztBQUNyRCxRQUFNLFNBQVMsOENBQWEsU0FBUztBQUFBLElBQ25DLFVBQVU7QUFBQSxJQUNWLFFBQVE7QUFBQSxFQUNWLENBQUM7QUFFRCxRQUFNLFVBQVUsNkJBQU07QUFDcEIsbUJBQWU7QUFFZixRQUFJLGVBQWU7QUFDakIsaUJBQVc7QUFBQSxJQUNiO0FBQUEsRUFDRixHQU5nQjtBQVFoQixTQUFPLEdBQUcsU0FBUyxPQUFPO0FBQzFCLFNBQU8sR0FBRyxTQUFTLE9BQU87QUFFMUIsaUJBQWUseUJBQ2I7QUFBQSxJQUNFLFdBQVcsb0JBQUssaUJBQWlCO0FBQUEsRUFDbkMsR0FDQSxNQUNGO0FBQ0Y7QUE3QmdCLEFBaUNoQixvQkFBb0IsVUFBb0IsTUFBb0M7QUFDMUUsTUFBSSx1Q0FBZSxNQUFNLCtCQUFZLFlBQVk7QUFDL0MsVUFBTSxTQUFTLHFDQUFrQixLQUFLLEVBQ25DLFlBQVksRUFDWixPQUFPLDhCQUFnQixHQUFHO0FBQzdCLFlBQVEsS0FBSyxRQUFRLElBQUksR0FBRyxHQUFHLElBQUk7QUFBQSxFQUNyQztBQUVBLFFBQU0sY0FBYyxxQ0FBa0IsS0FBSztBQUMzQyxRQUFNLE1BQU0sNkJBQVUsSUFBSTtBQUUxQixNQUFJLENBQUMsY0FBYztBQUNqQixVQUFNLElBQUksTUFBTSxxQ0FBcUM7QUFDckQ7QUFBQSxFQUNGO0FBRUEsZUFBYSxhQUFhLEdBQUc7QUFDL0I7QUFqQlMsQUFtQlQsSUFBSSxjQUFjLFVBQVU7QUFFNUIsT0FBTyxnQkFBZ0IsT0FBTyxpQkFBaUIsQ0FBQztBQUNoRCxPQUFPLGNBQWMsTUFBTTtBQUFBLEVBQ3pCLE9BQU8sSUFBSTtBQUFBLEVBQ1gsT0FBTyxJQUFJO0FBQUEsRUFDWCxNQUFNLElBQUk7QUFBQSxFQUNWLE1BQU0sSUFBSTtBQUFBLEVBQ1YsT0FBTyxJQUFJO0FBQUEsRUFDWCxPQUFPLElBQUk7QUFDYjtBQUVBLE9BQU8sVUFBVSxDQUFDLFVBQVUsU0FBUyxPQUFPLE1BQU0sVUFBVTtBQUMxRCxRQUFNLFlBQVksU0FBUyxNQUFNLFFBQVEsTUFBTSxRQUFRLEtBQUssVUFBVSxLQUFLO0FBQzNFLE1BQUksTUFBTSw4QkFBOEIsV0FBVztBQUNyRDtBQUVBLE9BQU8saUJBQWlCLHNCQUFzQixvQkFBa0I7QUFDOUQsUUFBTSxRQUFRLGVBQWU7QUFDN0IsUUFBTSxjQUNKLFNBQVMsTUFBTSxRQUFRLE1BQU0sUUFBUSxLQUFLLFVBQVUsS0FBSztBQUMzRCxNQUFJLE1BQU0sMENBQTBDLGFBQWE7QUFDbkUsQ0FBQztBQUVELHdDQUNFLGlDQUFxQixNQUNyQixDQUNFLE9BQ0EsUUFDQSxNQUNBLE1BQ0EsWUFDRztBQUNILE1BQUksYUFBYTtBQUNqQixNQUFJLFFBQVEsTUFBTTtBQUNoQixpQkFBYSxJQUFJLFFBQVE7QUFBQSxFQUMzQixXQUFXLE1BQU07QUFDZixpQkFBYSxJQUFJO0FBQUEsRUFDbkI7QUFDQSxRQUFNLFlBQVksK0JBQStCLFdBQVcsU0FBUztBQUVyRSxNQUFJLFVBQVUsaUNBQXFCLE9BQU87QUFDeEMsUUFBSSxNQUFNLFNBQVM7QUFBQSxFQUNyQixXQUFXLFVBQVUsaUNBQXFCLE9BQU87QUFDL0MsUUFBSSxNQUFNLFNBQVM7QUFBQSxFQUNyQixXQUFXLFVBQVUsaUNBQXFCLE1BQU07QUFDOUMsUUFBSSxLQUFLLFNBQVM7QUFBQSxFQUNwQixXQUFXLFVBQVUsaUNBQXFCLE1BQU07QUFDOUMsUUFBSSxLQUFLLFNBQVM7QUFBQSxFQUNwQixXQUFXLFVBQVUsaUNBQXFCLE9BQU87QUFDL0MsUUFBSSxNQUFNLFNBQVM7QUFBQSxFQUNyQixPQUFPO0FBQ0wsUUFBSSxNQUFNLEdBQUcsZ0NBQWdDLFFBQVE7QUFBQSxFQUN2RDtBQUNGLENBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
