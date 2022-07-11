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
var main_process_logging_exports = {};
__export(main_process_logging_exports, {
  eliminateOldEntries: () => eliminateOldEntries,
  eliminateOutOfDateFiles: () => eliminateOutOfDateFiles,
  fetchAdditionalLogData: () => fetchAdditionalLogData,
  fetchLog: () => fetchLog,
  fetchLogs: () => fetchLogs,
  initialize: () => initialize,
  isLineAfterDate: () => isLineAfterDate
});
module.exports = __toCommonJS(main_process_logging_exports);
var import_path = require("path");
var import_split2 = __toESM(require("split2"));
var import_fs = require("fs");
var import_electron = require("electron");
var import_pino_multi_stream = __toESM(require("pino-multi-stream"));
var import_pino = __toESM(require("pino"));
var mkdirp = __toESM(require("mkdirp"));
var import_lodash = require("lodash");
var import_firstline = __toESM(require("firstline"));
var import_read_last_lines = require("read-last-lines");
var import_rimraf = __toESM(require("rimraf"));
var import_rotating_file_stream = require("rotating-file-stream");
var durations = __toESM(require("../util/durations"));
var log = __toESM(require("./log"));
var import_environment = require("../environment");
var import_shared = require("./shared");
const MAX_LOG_LINES = 1e6;
let globalLogger;
let shouldRestart = false;
const isRunningFromConsole = Boolean(process.stdout.isTTY) || (0, import_environment.getEnvironment)() === import_environment.Environment.Test;
async function initialize(getMainWindow) {
  if (globalLogger) {
    throw new Error("Already called initialize!");
  }
  const basePath = import_electron.app.getPath("userData");
  const logPath = (0, import_path.join)(basePath, "logs");
  mkdirp.sync(logPath);
  let appMetrics = import_electron.app.getAppMetrics();
  setInterval(() => {
    appMetrics = import_electron.app.getAppMetrics();
  }, 30 * durations.SECOND).unref();
  try {
    await cleanupLogs(logPath);
  } catch (error) {
    const errorString = `Failed to clean logs; deleting all. Error: ${error.stack}`;
    console.error(errorString);
    await deleteAllLogs(logPath);
    mkdirp.sync(logPath);
    setTimeout(() => {
      console.error(errorString);
    }, 500);
  }
  const logFile = (0, import_path.join)(logPath, "main.log");
  const stream = (0, import_rotating_file_stream.createStream)(logFile, {
    interval: "1d",
    rotate: 3
  });
  const onClose = /* @__PURE__ */ __name(() => {
    globalLogger = void 0;
    if (shouldRestart) {
      initialize(getMainWindow);
    }
  }, "onClose");
  stream.on("close", onClose);
  stream.on("error", onClose);
  const streams = [];
  streams.push({ stream });
  if (isRunningFromConsole) {
    streams.push({
      level: "debug",
      stream: process.stdout
    });
  }
  const logger = (0, import_pino_multi_stream.default)({
    streams,
    timestamp: import_pino.default.stdTimeFunctions.isoTime
  });
  import_electron.ipcMain.removeHandler("fetch-log");
  import_electron.ipcMain.handle("fetch-log", async () => {
    const mainWindow = getMainWindow();
    if (!mainWindow) {
      logger.info("Logs were requested, but the main window is missing");
      return;
    }
    let data;
    try {
      const [logEntries, rest] = await Promise.all([
        fetchLogs(logPath),
        fetchAdditionalLogData(mainWindow)
      ]);
      data = {
        logEntries,
        appMetrics,
        ...rest
      };
    } catch (error) {
      logger.error(`Problem loading log data: ${error.stack}`);
      return;
    }
    return data;
  });
  import_electron.ipcMain.removeHandler("delete-all-logs");
  import_electron.ipcMain.handle("delete-all-logs", async () => {
    shouldRestart = true;
    try {
      await deleteAllLogs(logPath);
    } catch (error) {
      logger.error(`Problem deleting all logs: ${error.stack}`);
    }
  });
  globalLogger = logger;
  return log;
}
async function deleteAllLogs(logPath) {
  return new Promise((resolve, reject) => {
    (0, import_rimraf.default)(logPath, {
      disableGlob: true
    }, (error) => {
      if (error) {
        return reject(error);
      }
      return resolve();
    });
  });
}
async function cleanupLogs(logPath) {
  const now = new Date();
  const earliestDate = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() - 3));
  try {
    const remaining = await eliminateOutOfDateFiles(logPath, earliestDate);
    const files = (0, import_lodash.filter)(remaining, (file) => !file.start && file.end);
    if (!files.length) {
      return;
    }
    await eliminateOldEntries(files, earliestDate);
  } catch (error) {
    console.error("Error cleaning logs; deleting and starting over from scratch.", error.stack);
    await deleteAllLogs(logPath);
    mkdirp.sync(logPath);
  }
}
function isLineAfterDate(line, date) {
  if (!line) {
    return false;
  }
  try {
    const data = JSON.parse(line);
    return new Date(data.time).getTime() > date.getTime();
  } catch (e) {
    console.log("error parsing log line", e.stack, line);
    return false;
  }
}
function eliminateOutOfDateFiles(logPath, date) {
  const files = (0, import_fs.readdirSync)(logPath);
  const paths = files.map((file) => (0, import_path.join)(logPath, file));
  return Promise.all((0, import_lodash.map)(paths, (target) => Promise.all([(0, import_firstline.default)(target), (0, import_read_last_lines.read)(target, 2)]).then((results) => {
    const start = results[0];
    const end = results[1].split("\n");
    const file = {
      path: target,
      start: isLineAfterDate(start, date),
      end: isLineAfterDate(end[end.length - 1], date) || isLineAfterDate(end[end.length - 2], date)
    };
    if (!file.start && !file.end) {
      (0, import_fs.unlinkSync)(file.path);
    }
    return file;
  })));
}
async function eliminateOldEntries(files, date) {
  await Promise.all((0, import_lodash.map)(files, (file) => fetchLog(file.path).then((lines) => {
    const recent = (0, import_lodash.filter)(lines, (line) => new Date(line.time) >= date);
    const text = (0, import_lodash.map)(recent, (line) => JSON.stringify(line)).join("\n");
    return (0, import_fs.writeFileSync)(file.path, `${text}
`);
  })));
}
async function fetchLog(logFile) {
  const results = new Array();
  const rawStream = (0, import_fs.createReadStream)(logFile);
  const jsonStream = rawStream.pipe((0, import_split2.default)((line) => {
    try {
      return JSON.parse(line);
    } catch (e) {
      return void 0;
    }
  }));
  rawStream.on("error", (error) => jsonStream.emit("error", error));
  for await (const line of jsonStream) {
    const result = line && (0, import_lodash.pick)(line, ["level", "time", "msg"]);
    if (!(0, import_shared.isLogEntry)(result)) {
      continue;
    }
    results.push(result);
    if (results.length > MAX_LOG_LINES) {
      results.shift();
    }
  }
  return results;
}
function fetchLogs(logPath) {
  const files = (0, import_fs.readdirSync)(logPath);
  const paths = files.map((file) => (0, import_path.join)(logPath, file));
  const fileListEntry = {
    level: import_shared.LogLevel.Info,
    time: new Date().toISOString(),
    msg: `Loaded this list of log files from logPath: ${files.join(", ")}`
  };
  return Promise.all(paths.map(fetchLog)).then((results) => {
    const data = (0, import_lodash.flatten)(results);
    data.push(fileListEntry);
    return (0, import_lodash.sortBy)(data, (logEntry) => logEntry.time);
  });
}
const fetchAdditionalLogData = /* @__PURE__ */ __name((mainWindow) => new Promise((resolve) => {
  mainWindow.webContents.send("additional-log-data-request");
  import_electron.ipcMain.once("additional-log-data-response", (_event, data) => {
    resolve(data);
  });
}), "fetchAdditionalLogData");
function logAtLevel(level, ...args) {
  if (globalLogger) {
    const levelString = (0, import_shared.getLogLevelString)(level);
    globalLogger[levelString]((0, import_shared.cleanArgs)(args));
  } else if (isRunningFromConsole && !process.stdout.destroyed) {
    console._log(...args);
  }
}
if (!console._log) {
  log.setLogAtLevel(logAtLevel);
  console._log = console.log;
  console.log = log.info;
  console._error = console.error;
  console.error = log.error;
  console._warn = console.warn;
  console.warn = log.warn;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  eliminateOldEntries,
  eliminateOutOfDateFiles,
  fetchAdditionalLogData,
  fetchLog,
  fetchLogs,
  initialize,
  isLineAfterDate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFpbl9wcm9jZXNzX2xvZ2dpbmcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG4vLyBOT1RFOiBUZW1wb3JhcmlseSBhbGxvdyBgdGhlbmAgdW50aWwgd2UgY29udmVydCB0aGUgZW50aXJlIGZpbGUgdG8gYGFzeW5jYCAvIGBhd2FpdGA6XG4vKiBlc2xpbnQtZGlzYWJsZSBtb3JlL25vLXRoZW4gKi9cbi8qIGVzbGludC1kaXNhYmxlIG5vLWNvbnNvbGUgKi9cblxuaW1wb3J0IHsgam9pbiB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IHNwbGl0MiBmcm9tICdzcGxpdDInO1xuaW1wb3J0IHsgcmVhZGRpclN5bmMsIGNyZWF0ZVJlYWRTdHJlYW0sIHVubGlua1N5bmMsIHdyaXRlRmlsZVN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgeyBhcHAsIGlwY01haW4gYXMgaXBjIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHBpbm9tcyBmcm9tICdwaW5vLW11bHRpLXN0cmVhbSc7XG5pbXBvcnQgcGlubyBmcm9tICdwaW5vJztcbmltcG9ydCAqIGFzIG1rZGlycCBmcm9tICdta2RpcnAnO1xuaW1wb3J0IHsgZmlsdGVyLCBmbGF0dGVuLCBtYXAsIHBpY2ssIHNvcnRCeSB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgcmVhZEZpcnN0TGluZSBmcm9tICdmaXJzdGxpbmUnO1xuaW1wb3J0IHsgcmVhZCBhcyByZWFkTGFzdExpbmVzIH0gZnJvbSAncmVhZC1sYXN0LWxpbmVzJztcbmltcG9ydCByaW1yYWYgZnJvbSAncmltcmFmJztcbmltcG9ydCB7IGNyZWF0ZVN0cmVhbSB9IGZyb20gJ3JvdGF0aW5nLWZpbGUtc3RyZWFtJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuXG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi9sb2cnO1xuaW1wb3J0IHsgRW52aXJvbm1lbnQsIGdldEVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xuXG5pbXBvcnQgdHlwZSB7IEZldGNoTG9nSXBjRGF0YSwgTG9nRW50cnlUeXBlIH0gZnJvbSAnLi9zaGFyZWQnO1xuaW1wb3J0IHsgTG9nTGV2ZWwsIGNsZWFuQXJncywgZ2V0TG9nTGV2ZWxTdHJpbmcsIGlzTG9nRW50cnkgfSBmcm9tICcuL3NoYXJlZCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gV2Ugd2FudCB0byBleHRlbmQgYENvbnNvbGVgLCBzbyB3ZSBuZWVkIGFuIGludGVyZmFjZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gIGludGVyZmFjZSBDb25zb2xlIHtcbiAgICBfbG9nOiB0eXBlb2YgY29uc29sZS5sb2c7XG4gICAgX3dhcm46IHR5cGVvZiBjb25zb2xlLndhcm47XG4gICAgX2Vycm9yOiB0eXBlb2YgY29uc29sZS5lcnJvcjtcbiAgfVxufVxuXG5jb25zdCBNQVhfTE9HX0xJTkVTID0gMTAwMDAwMDtcblxubGV0IGdsb2JhbExvZ2dlcjogdW5kZWZpbmVkIHwgcGluby5Mb2dnZXI7XG5sZXQgc2hvdWxkUmVzdGFydCA9IGZhbHNlO1xuXG5jb25zdCBpc1J1bm5pbmdGcm9tQ29uc29sZSA9XG4gIEJvb2xlYW4ocHJvY2Vzcy5zdGRvdXQuaXNUVFkpIHx8IGdldEVudmlyb25tZW50KCkgPT09IEVudmlyb25tZW50LlRlc3Q7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBpbml0aWFsaXplKFxuICBnZXRNYWluV2luZG93OiAoKSA9PiB1bmRlZmluZWQgfCBCcm93c2VyV2luZG93XG4pOiBQcm9taXNlPExvZ2dlclR5cGU+IHtcbiAgaWYgKGdsb2JhbExvZ2dlcikge1xuICAgIHRocm93IG5ldyBFcnJvcignQWxyZWFkeSBjYWxsZWQgaW5pdGlhbGl6ZSEnKTtcbiAgfVxuXG4gIGNvbnN0IGJhc2VQYXRoID0gYXBwLmdldFBhdGgoJ3VzZXJEYXRhJyk7XG4gIGNvbnN0IGxvZ1BhdGggPSBqb2luKGJhc2VQYXRoLCAnbG9ncycpO1xuICBta2RpcnAuc3luYyhsb2dQYXRoKTtcblxuICBsZXQgYXBwTWV0cmljcyA9IGFwcC5nZXRBcHBNZXRyaWNzKCk7XG5cbiAgc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgIC8vIENQVSBzdGF0cyBhcmUgY29tcHV0ZWQgc2luY2UgdGhlIGxhc3QgY2FsbCB0byBgZ2V0QXBwTWV0cmljc2AuXG4gICAgYXBwTWV0cmljcyA9IGFwcC5nZXRBcHBNZXRyaWNzKCk7XG4gIH0sIDMwICogZHVyYXRpb25zLlNFQ09ORCkudW5yZWYoKTtcblxuICB0cnkge1xuICAgIGF3YWl0IGNsZWFudXBMb2dzKGxvZ1BhdGgpO1xuICB9IGNhdGNoIChlcnJvcikge1xuICAgIGNvbnN0IGVycm9yU3RyaW5nID0gYEZhaWxlZCB0byBjbGVhbiBsb2dzOyBkZWxldGluZyBhbGwuIEVycm9yOiAke2Vycm9yLnN0YWNrfWA7XG4gICAgY29uc29sZS5lcnJvcihlcnJvclN0cmluZyk7XG4gICAgYXdhaXQgZGVsZXRlQWxsTG9ncyhsb2dQYXRoKTtcbiAgICBta2RpcnAuc3luYyhsb2dQYXRoKTtcblxuICAgIC8vIElmIHdlIHdhbnQgdGhpcyBsb2cgZW50cnkgdG8gcGVyc2lzdCBvbiBkaXNrLCB3ZSBuZWVkIHRvIHdhaXQgdW50aWwgd2UndmVcbiAgICAvLyAgIHNldCB1cCBvdXIgbG9nZ2luZyBpbmZyYXN0cnVjdHVyZS5cbiAgICBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIGNvbnNvbGUuZXJyb3IoZXJyb3JTdHJpbmcpO1xuICAgIH0sIDUwMCk7XG4gIH1cblxuICBjb25zdCBsb2dGaWxlID0gam9pbihsb2dQYXRoLCAnbWFpbi5sb2cnKTtcbiAgY29uc3Qgc3RyZWFtID0gY3JlYXRlU3RyZWFtKGxvZ0ZpbGUsIHtcbiAgICBpbnRlcnZhbDogJzFkJyxcbiAgICByb3RhdGU6IDMsXG4gIH0pO1xuXG4gIGNvbnN0IG9uQ2xvc2UgPSAoKSA9PiB7XG4gICAgZ2xvYmFsTG9nZ2VyID0gdW5kZWZpbmVkO1xuXG4gICAgaWYgKHNob3VsZFJlc3RhcnQpIHtcbiAgICAgIGluaXRpYWxpemUoZ2V0TWFpbldpbmRvdyk7XG4gICAgfVxuICB9O1xuXG4gIHN0cmVhbS5vbignY2xvc2UnLCBvbkNsb3NlKTtcbiAgc3RyZWFtLm9uKCdlcnJvcicsIG9uQ2xvc2UpO1xuXG4gIGNvbnN0IHN0cmVhbXM6IHBpbm9tcy5TdHJlYW1zID0gW107XG4gIHN0cmVhbXMucHVzaCh7IHN0cmVhbSB9KTtcblxuICBpZiAoaXNSdW5uaW5nRnJvbUNvbnNvbGUpIHtcbiAgICBzdHJlYW1zLnB1c2goe1xuICAgICAgbGV2ZWw6ICdkZWJ1ZycgYXMgY29uc3QsXG4gICAgICBzdHJlYW06IHByb2Nlc3Muc3Rkb3V0LFxuICAgIH0pO1xuICB9XG5cbiAgY29uc3QgbG9nZ2VyID0gcGlub21zKHtcbiAgICBzdHJlYW1zLFxuICAgIHRpbWVzdGFtcDogcGluby5zdGRUaW1lRnVuY3Rpb25zLmlzb1RpbWUsXG4gIH0pO1xuXG4gIGlwYy5yZW1vdmVIYW5kbGVyKCdmZXRjaC1sb2cnKTtcbiAgaXBjLmhhbmRsZSgnZmV0Y2gtbG9nJywgYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IG1haW5XaW5kb3cgPSBnZXRNYWluV2luZG93KCk7XG4gICAgaWYgKCFtYWluV2luZG93KSB7XG4gICAgICBsb2dnZXIuaW5mbygnTG9ncyB3ZXJlIHJlcXVlc3RlZCwgYnV0IHRoZSBtYWluIHdpbmRvdyBpcyBtaXNzaW5nJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IGRhdGE6IEZldGNoTG9nSXBjRGF0YTtcbiAgICB0cnkge1xuICAgICAgY29uc3QgW2xvZ0VudHJpZXMsIHJlc3RdID0gYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgICAgICBmZXRjaExvZ3MobG9nUGF0aCksXG4gICAgICAgIGZldGNoQWRkaXRpb25hbExvZ0RhdGEobWFpbldpbmRvdyksXG4gICAgICBdKTtcbiAgICAgIGRhdGEgPSB7XG4gICAgICAgIGxvZ0VudHJpZXMsXG4gICAgICAgIGFwcE1ldHJpY3MsXG4gICAgICAgIC4uLnJlc3QsXG4gICAgICB9O1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoYFByb2JsZW0gbG9hZGluZyBsb2cgZGF0YTogJHtlcnJvci5zdGFja31gKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICByZXR1cm4gZGF0YTtcbiAgfSk7XG5cbiAgaXBjLnJlbW92ZUhhbmRsZXIoJ2RlbGV0ZS1hbGwtbG9ncycpO1xuICBpcGMuaGFuZGxlKCdkZWxldGUtYWxsLWxvZ3MnLCBhc3luYyAoKSA9PiB7XG4gICAgLy8gUmVzdGFydCBsb2dnaW5nIHdoZW4gdGhlIHN0cmVhbXMgd2lsbCBjbG9zZVxuICAgIHNob3VsZFJlc3RhcnQgPSB0cnVlO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGRlbGV0ZUFsbExvZ3MobG9nUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihgUHJvYmxlbSBkZWxldGluZyBhbGwgbG9nczogJHtlcnJvci5zdGFja31gKTtcbiAgICB9XG4gIH0pO1xuXG4gIGdsb2JhbExvZ2dlciA9IGxvZ2dlcjtcblxuICByZXR1cm4gbG9nO1xufVxuXG5hc3luYyBmdW5jdGlvbiBkZWxldGVBbGxMb2dzKGxvZ1BhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT4ge1xuICAgIHJpbXJhZihcbiAgICAgIGxvZ1BhdGgsXG4gICAgICB7XG4gICAgICAgIGRpc2FibGVHbG9iOiB0cnVlLFxuICAgICAgfSxcbiAgICAgIGVycm9yID0+IHtcbiAgICAgICAgaWYgKGVycm9yKSB7XG4gICAgICAgICAgcmV0dXJuIHJlamVjdChlcnJvcik7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gcmVzb2x2ZSgpO1xuICAgICAgfVxuICAgICk7XG4gIH0pO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjbGVhbnVwTG9ncyhsb2dQYXRoOiBzdHJpbmcpIHtcbiAgY29uc3Qgbm93ID0gbmV3IERhdGUoKTtcbiAgY29uc3QgZWFybGllc3REYXRlID0gbmV3IERhdGUoXG4gICAgRGF0ZS5VVEMobm93LmdldFVUQ0Z1bGxZZWFyKCksIG5vdy5nZXRVVENNb250aCgpLCBub3cuZ2V0VVRDRGF0ZSgpIC0gMylcbiAgKTtcblxuICB0cnkge1xuICAgIGNvbnN0IHJlbWFpbmluZyA9IGF3YWl0IGVsaW1pbmF0ZU91dE9mRGF0ZUZpbGVzKGxvZ1BhdGgsIGVhcmxpZXN0RGF0ZSk7XG4gICAgY29uc3QgZmlsZXMgPSBmaWx0ZXIocmVtYWluaW5nLCBmaWxlID0+ICFmaWxlLnN0YXJ0ICYmIGZpbGUuZW5kKTtcblxuICAgIGlmICghZmlsZXMubGVuZ3RoKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgZWxpbWluYXRlT2xkRW50cmllcyhmaWxlcywgZWFybGllc3REYXRlKTtcbiAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICBjb25zb2xlLmVycm9yKFxuICAgICAgJ0Vycm9yIGNsZWFuaW5nIGxvZ3M7IGRlbGV0aW5nIGFuZCBzdGFydGluZyBvdmVyIGZyb20gc2NyYXRjaC4nLFxuICAgICAgZXJyb3Iuc3RhY2tcbiAgICApO1xuXG4gICAgLy8gZGVsZXRlIGFuZCByZS1jcmVhdGUgdGhlIGxvZyBkaXJlY3RvcnlcbiAgICBhd2FpdCBkZWxldGVBbGxMb2dzKGxvZ1BhdGgpO1xuICAgIG1rZGlycC5zeW5jKGxvZ1BhdGgpO1xuICB9XG59XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIG9ubHkuXG5leHBvcnQgZnVuY3Rpb24gaXNMaW5lQWZ0ZXJEYXRlKGxpbmU6IHN0cmluZywgZGF0ZTogUmVhZG9ubHk8RGF0ZT4pOiBib29sZWFuIHtcbiAgaWYgKCFsaW5lKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgdHJ5IHtcbiAgICBjb25zdCBkYXRhID0gSlNPTi5wYXJzZShsaW5lKTtcbiAgICByZXR1cm4gbmV3IERhdGUoZGF0YS50aW1lKS5nZXRUaW1lKCkgPiBkYXRlLmdldFRpbWUoKTtcbiAgfSBjYXRjaCAoZSkge1xuICAgIGNvbnNvbGUubG9nKCdlcnJvciBwYXJzaW5nIGxvZyBsaW5lJywgZS5zdGFjaywgbGluZSk7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG59XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIG9ubHkuXG5leHBvcnQgZnVuY3Rpb24gZWxpbWluYXRlT3V0T2ZEYXRlRmlsZXMoXG4gIGxvZ1BhdGg6IHN0cmluZyxcbiAgZGF0ZTogUmVhZG9ubHk8RGF0ZT5cbik6IFByb21pc2U8XG4gIEFycmF5PHtcbiAgICBwYXRoOiBzdHJpbmc7XG4gICAgc3RhcnQ6IGJvb2xlYW47XG4gICAgZW5kOiBib29sZWFuO1xuICB9PlxuPiB7XG4gIGNvbnN0IGZpbGVzID0gcmVhZGRpclN5bmMobG9nUGF0aCk7XG4gIGNvbnN0IHBhdGhzID0gZmlsZXMubWFwKGZpbGUgPT4gam9pbihsb2dQYXRoLCBmaWxlKSk7XG5cbiAgcmV0dXJuIFByb21pc2UuYWxsKFxuICAgIG1hcChwYXRocywgdGFyZ2V0ID0+XG4gICAgICBQcm9taXNlLmFsbChbcmVhZEZpcnN0TGluZSh0YXJnZXQpLCByZWFkTGFzdExpbmVzKHRhcmdldCwgMildKS50aGVuKFxuICAgICAgICByZXN1bHRzID0+IHtcbiAgICAgICAgICBjb25zdCBzdGFydCA9IHJlc3VsdHNbMF07XG4gICAgICAgICAgY29uc3QgZW5kID0gcmVzdWx0c1sxXS5zcGxpdCgnXFxuJyk7XG5cbiAgICAgICAgICBjb25zdCBmaWxlID0ge1xuICAgICAgICAgICAgcGF0aDogdGFyZ2V0LFxuICAgICAgICAgICAgc3RhcnQ6IGlzTGluZUFmdGVyRGF0ZShzdGFydCwgZGF0ZSksXG4gICAgICAgICAgICBlbmQ6XG4gICAgICAgICAgICAgIGlzTGluZUFmdGVyRGF0ZShlbmRbZW5kLmxlbmd0aCAtIDFdLCBkYXRlKSB8fFxuICAgICAgICAgICAgICBpc0xpbmVBZnRlckRhdGUoZW5kW2VuZC5sZW5ndGggLSAyXSwgZGF0ZSksXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGlmICghZmlsZS5zdGFydCAmJiAhZmlsZS5lbmQpIHtcbiAgICAgICAgICAgIHVubGlua1N5bmMoZmlsZS5wYXRoKTtcbiAgICAgICAgICB9XG5cbiAgICAgICAgICByZXR1cm4gZmlsZTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgIClcbiAgKTtcbn1cblxuLy8gRXhwb3J0ZWQgZm9yIHRlc3Rpbmcgb25seS5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBlbGltaW5hdGVPbGRFbnRyaWVzKFxuICBmaWxlczogUmVhZG9ubHlBcnJheTx7IHBhdGg6IHN0cmluZyB9PixcbiAgZGF0ZTogUmVhZG9ubHk8RGF0ZT5cbik6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBQcm9taXNlLmFsbChcbiAgICBtYXAoZmlsZXMsIGZpbGUgPT5cbiAgICAgIGZldGNoTG9nKGZpbGUucGF0aCkudGhlbihsaW5lcyA9PiB7XG4gICAgICAgIGNvbnN0IHJlY2VudCA9IGZpbHRlcihsaW5lcywgbGluZSA9PiBuZXcgRGF0ZShsaW5lLnRpbWUpID49IGRhdGUpO1xuICAgICAgICBjb25zdCB0ZXh0ID0gbWFwKHJlY2VudCwgbGluZSA9PiBKU09OLnN0cmluZ2lmeShsaW5lKSkuam9pbignXFxuJyk7XG5cbiAgICAgICAgcmV0dXJuIHdyaXRlRmlsZVN5bmMoZmlsZS5wYXRoLCBgJHt0ZXh0fVxcbmApO1xuICAgICAgfSlcbiAgICApXG4gICk7XG59XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIG9ubHkuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gZmV0Y2hMb2cobG9nRmlsZTogc3RyaW5nKTogUHJvbWlzZTxBcnJheTxMb2dFbnRyeVR5cGU+PiB7XG4gIGNvbnN0IHJlc3VsdHMgPSBuZXcgQXJyYXk8TG9nRW50cnlUeXBlPigpO1xuXG4gIGNvbnN0IHJhd1N0cmVhbSA9IGNyZWF0ZVJlYWRTdHJlYW0obG9nRmlsZSk7XG4gIGNvbnN0IGpzb25TdHJlYW0gPSByYXdTdHJlYW0ucGlwZShcbiAgICBzcGxpdDIobGluZSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICByZXR1cm4gSlNPTi5wYXJzZShsaW5lKTtcbiAgICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9KVxuICApO1xuXG4gIC8vIFByb3BhZ2F0ZSBmcyBlcnJvcnMgZG93biB0byB0aGUganNvbiBzdHJlYW0gc28gdGhhdCBmb3IgbG9vcCBiZWxvdyBoYW5kbGVzXG4gIC8vIHRoZW0uXG4gIHJhd1N0cmVhbS5vbignZXJyb3InLCBlcnJvciA9PiBqc29uU3RyZWFtLmVtaXQoJ2Vycm9yJywgZXJyb3IpKTtcblxuICBmb3IgYXdhaXQgKGNvbnN0IGxpbmUgb2YganNvblN0cmVhbSkge1xuICAgIGNvbnN0IHJlc3VsdCA9IGxpbmUgJiYgcGljayhsaW5lLCBbJ2xldmVsJywgJ3RpbWUnLCAnbXNnJ10pO1xuICAgIGlmICghaXNMb2dFbnRyeShyZXN1bHQpKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICByZXN1bHRzLnB1c2gocmVzdWx0KTtcbiAgICBpZiAocmVzdWx0cy5sZW5ndGggPiBNQVhfTE9HX0xJTkVTKSB7XG4gICAgICByZXN1bHRzLnNoaWZ0KCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHJlc3VsdHM7XG59XG5cbi8vIEV4cG9ydGVkIGZvciB0ZXN0aW5nIG9ubHkuXG5leHBvcnQgZnVuY3Rpb24gZmV0Y2hMb2dzKGxvZ1BhdGg6IHN0cmluZyk6IFByb21pc2U8QXJyYXk8TG9nRW50cnlUeXBlPj4ge1xuICBjb25zdCBmaWxlcyA9IHJlYWRkaXJTeW5jKGxvZ1BhdGgpO1xuICBjb25zdCBwYXRocyA9IGZpbGVzLm1hcChmaWxlID0+IGpvaW4obG9nUGF0aCwgZmlsZSkpO1xuXG4gIC8vIGNyZWF0aW5nIGEgbWFudWFsIGxvZyBlbnRyeSBmb3IgdGhlIGZpbmFsIGxvZyByZXN1bHRcbiAgY29uc3QgZmlsZUxpc3RFbnRyeTogTG9nRW50cnlUeXBlID0ge1xuICAgIGxldmVsOiBMb2dMZXZlbC5JbmZvLFxuICAgIHRpbWU6IG5ldyBEYXRlKCkudG9JU09TdHJpbmcoKSxcbiAgICBtc2c6IGBMb2FkZWQgdGhpcyBsaXN0IG9mIGxvZyBmaWxlcyBmcm9tIGxvZ1BhdGg6ICR7ZmlsZXMuam9pbignLCAnKX1gLFxuICB9O1xuXG4gIHJldHVybiBQcm9taXNlLmFsbChwYXRocy5tYXAoZmV0Y2hMb2cpKS50aGVuKHJlc3VsdHMgPT4ge1xuICAgIGNvbnN0IGRhdGEgPSBmbGF0dGVuKHJlc3VsdHMpO1xuXG4gICAgZGF0YS5wdXNoKGZpbGVMaXN0RW50cnkpO1xuXG4gICAgcmV0dXJuIHNvcnRCeShkYXRhLCBsb2dFbnRyeSA9PiBsb2dFbnRyeS50aW1lKTtcbiAgfSk7XG59XG5cbmV4cG9ydCBjb25zdCBmZXRjaEFkZGl0aW9uYWxMb2dEYXRhID0gKFxuICBtYWluV2luZG93OiBCcm93c2VyV2luZG93XG4pOiBQcm9taXNlPE9taXQ8RmV0Y2hMb2dJcGNEYXRhLCAnbG9nRW50cmllcycgfCAnYXBwTWV0cmljcyc+PiA9PlxuICBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBtYWluV2luZG93LndlYkNvbnRlbnRzLnNlbmQoJ2FkZGl0aW9uYWwtbG9nLWRhdGEtcmVxdWVzdCcpO1xuICAgIGlwYy5vbmNlKCdhZGRpdGlvbmFsLWxvZy1kYXRhLXJlc3BvbnNlJywgKF9ldmVudCwgZGF0YSkgPT4ge1xuICAgICAgcmVzb2x2ZShkYXRhKTtcbiAgICB9KTtcbiAgfSk7XG5cbmZ1bmN0aW9uIGxvZ0F0TGV2ZWwobGV2ZWw6IExvZ0xldmVsLCAuLi5hcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KSB7XG4gIGlmIChnbG9iYWxMb2dnZXIpIHtcbiAgICBjb25zdCBsZXZlbFN0cmluZyA9IGdldExvZ0xldmVsU3RyaW5nKGxldmVsKTtcbiAgICBnbG9iYWxMb2dnZXJbbGV2ZWxTdHJpbmddKGNsZWFuQXJncyhhcmdzKSk7XG4gIH0gZWxzZSBpZiAoaXNSdW5uaW5nRnJvbUNvbnNvbGUgJiYgIXByb2Nlc3Muc3Rkb3V0LmRlc3Ryb3llZCkge1xuICAgIGNvbnNvbGUuX2xvZyguLi5hcmdzKTtcbiAgfVxufVxuXG4vLyBUaGlzIGJsb3dzIHVwIHVzaW5nIG1vY2hhIC0td2F0Y2gsIHNvIHdlIGVuc3VyZSBpdCBpcyBydW4ganVzdCBvbmNlXG5pZiAoIWNvbnNvbGUuX2xvZykge1xuICBsb2cuc2V0TG9nQXRMZXZlbChsb2dBdExldmVsKTtcblxuICBjb25zb2xlLl9sb2cgPSBjb25zb2xlLmxvZztcbiAgY29uc29sZS5sb2cgPSBsb2cuaW5mbztcbiAgY29uc29sZS5fZXJyb3IgPSBjb25zb2xlLmVycm9yO1xuICBjb25zb2xlLmVycm9yID0gbG9nLmVycm9yO1xuICBjb25zb2xlLl93YXJuID0gY29uc29sZS53YXJuO1xuICBjb25zb2xlLndhcm4gPSBsb2cud2Fybjtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFPQSxrQkFBcUI7QUFDckIsb0JBQW1CO0FBQ25CLGdCQUF5RTtBQUV6RSxzQkFBb0M7QUFDcEMsK0JBQW1CO0FBQ25CLGtCQUFpQjtBQUNqQixhQUF3QjtBQUN4QixvQkFBbUQ7QUFDbkQsdUJBQTBCO0FBQzFCLDZCQUFzQztBQUN0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
