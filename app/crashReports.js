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
var crashReports_exports = {};
__export(crashReports_exports, {
  setup: () => setup
});
module.exports = __toCommonJS(crashReports_exports);
var import_electron = require("electron");
var import_fs_extra = require("fs-extra");
var import_path = require("path");
var Errors = __toESM(require("../ts/types/errors"));
var import_version = require("../ts/util/version");
var import_uploadDebugLog = require("../ts/logging/uploadDebugLog");
var import_protobuf = require("../ts/protobuf");
var OS = __toESM(require("../ts/OS"));
async function getPendingDumps() {
  const crashDumpsPath = await (0, import_fs_extra.realpath)(import_electron.app.getPath("crashDumps"));
  let pendingDir;
  if (OS.isWindows()) {
    pendingDir = (0, import_path.join)(crashDumpsPath, "reports");
  } else {
    pendingDir = (0, import_path.join)(crashDumpsPath, "pending");
  }
  const files = await (0, import_fs_extra.readdir)(pendingDir);
  return files.map((file) => (0, import_path.join)(pendingDir, file));
}
async function eraseDumps(logger, files) {
  logger.warn(`crashReports: erasing ${files.length} pending dumps`);
  await Promise.all(files.map(async (fullPath) => {
    try {
      await (0, import_fs_extra.unlink)(fullPath);
    } catch (error) {
      logger.warn(`crashReports: failed to unlink crash report ${fullPath} due to error`, Errors.toLogFormat(error));
    }
  }));
}
async function setup(getLogger) {
  const isEnabled = !(0, import_version.isProduction)(import_electron.app.getVersion());
  if (isEnabled) {
    getLogger().info("crashReporter: enabled");
    import_electron.crashReporter.start({ uploadToServer: false });
  }
  import_electron.ipcMain.handle("crash-reports:get-count", async () => {
    if (!isEnabled) {
      return 0;
    }
    const pendingDumps = await getPendingDumps();
    if (pendingDumps.length !== 0) {
      getLogger().warn(`crashReports: ${pendingDumps.length} pending dumps found`);
    }
    return pendingDumps.length;
  });
  import_electron.ipcMain.handle("crash-reports:upload", async () => {
    if (!isEnabled) {
      return;
    }
    const pendingDumps = await getPendingDumps();
    if (pendingDumps.length === 0) {
      return;
    }
    const logger = getLogger();
    logger.warn(`crashReports: uploading ${pendingDumps.length} dumps`);
    const maybeDumps = await Promise.all(pendingDumps.map(async (fullPath) => {
      try {
        return {
          filename: (0, import_path.basename)(fullPath),
          content: await (0, import_fs_extra.readFile)(fullPath)
        };
      } catch (error) {
        logger.warn(`crashReports: failed to read crash report ${fullPath} due to error`, Errors.toLogFormat(error));
        return void 0;
      }
    }));
    const content = import_protobuf.SignalService.CrashReportList.encode({
      reports: maybeDumps.filter((dump) => {
        return dump !== void 0;
      })
    }).finish();
    try {
      const url = await (0, import_uploadDebugLog.upload)({
        content,
        appVersion: import_electron.app.getVersion(),
        logger,
        extension: "dmp",
        contentType: "application/octet-stream",
        compress: false,
        prefix: "desktop-crash-"
      });
      logger.info("crashReports: upload complete");
      import_electron.clipboard.writeText(url);
    } finally {
      await eraseDumps(logger, pendingDumps);
    }
  });
  import_electron.ipcMain.handle("crash-reports:erase", async () => {
    if (!isEnabled) {
      return;
    }
    const pendingDumps = await getPendingDumps();
    await eraseDumps(getLogger(), pendingDumps);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  setup
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3Jhc2hSZXBvcnRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGFwcCwgY2xpcGJvYXJkLCBjcmFzaFJlcG9ydGVyLCBpcGNNYWluIGFzIGlwYyB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IHJlYWxwYXRoLCByZWFkZGlyLCByZWFkRmlsZSwgdW5saW5rIH0gZnJvbSAnZnMtZXh0cmEnO1xuaW1wb3J0IHsgYmFzZW5hbWUsIGpvaW4gfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHMvdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHMvdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IGlzUHJvZHVjdGlvbiB9IGZyb20gJy4uL3RzL3V0aWwvdmVyc2lvbic7XG5pbXBvcnQgeyB1cGxvYWQgYXMgdXBsb2FkRGVidWdMb2cgfSBmcm9tICcuLi90cy9sb2dnaW5nL3VwbG9hZERlYnVnTG9nJztcbmltcG9ydCB7IFNpZ25hbFNlcnZpY2UgYXMgUHJvdG8gfSBmcm9tICcuLi90cy9wcm90b2J1Zic7XG5pbXBvcnQgKiBhcyBPUyBmcm9tICcuLi90cy9PUyc7XG5cbmFzeW5jIGZ1bmN0aW9uIGdldFBlbmRpbmdEdW1wcygpOiBQcm9taXNlPFJlYWRvbmx5QXJyYXk8c3RyaW5nPj4ge1xuICBjb25zdCBjcmFzaER1bXBzUGF0aCA9IGF3YWl0IHJlYWxwYXRoKGFwcC5nZXRQYXRoKCdjcmFzaER1bXBzJykpO1xuICBsZXQgcGVuZGluZ0Rpcjogc3RyaW5nO1xuICBpZiAoT1MuaXNXaW5kb3dzKCkpIHtcbiAgICBwZW5kaW5nRGlyID0gam9pbihjcmFzaER1bXBzUGF0aCwgJ3JlcG9ydHMnKTtcbiAgfSBlbHNlIHtcbiAgICAvLyBtYWNPUyBhbmQgTGludXhcbiAgICBwZW5kaW5nRGlyID0gam9pbihjcmFzaER1bXBzUGF0aCwgJ3BlbmRpbmcnKTtcbiAgfVxuXG4gIGNvbnN0IGZpbGVzID0gYXdhaXQgcmVhZGRpcihwZW5kaW5nRGlyKTtcblxuICByZXR1cm4gZmlsZXMubWFwKGZpbGUgPT4gam9pbihwZW5kaW5nRGlyLCBmaWxlKSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGVyYXNlRHVtcHMoXG4gIGxvZ2dlcjogTG9nZ2VyVHlwZSxcbiAgZmlsZXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPlxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGxvZ2dlci53YXJuKGBjcmFzaFJlcG9ydHM6IGVyYXNpbmcgJHtmaWxlcy5sZW5ndGh9IHBlbmRpbmcgZHVtcHNgKTtcbiAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgZmlsZXMubWFwKGFzeW5jIGZ1bGxQYXRoID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIGF3YWl0IHVubGluayhmdWxsUGF0aCk7XG4gICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICBgY3Jhc2hSZXBvcnRzOiBmYWlsZWQgdG8gdW5saW5rIGNyYXNoIHJlcG9ydCAke2Z1bGxQYXRofSBkdWUgdG8gZXJyb3JgLFxuICAgICAgICAgIEVycm9ycy50b0xvZ0Zvcm1hdChlcnJvcilcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICB9KVxuICApO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc2V0dXAoZ2V0TG9nZ2VyOiAoKSA9PiBMb2dnZXJUeXBlKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IGlzRW5hYmxlZCA9ICFpc1Byb2R1Y3Rpb24oYXBwLmdldFZlcnNpb24oKSk7XG5cbiAgaWYgKGlzRW5hYmxlZCkge1xuICAgIGdldExvZ2dlcigpLmluZm8oJ2NyYXNoUmVwb3J0ZXI6IGVuYWJsZWQnKTtcbiAgICBjcmFzaFJlcG9ydGVyLnN0YXJ0KHsgdXBsb2FkVG9TZXJ2ZXI6IGZhbHNlIH0pO1xuICB9XG5cbiAgaXBjLmhhbmRsZSgnY3Jhc2gtcmVwb3J0czpnZXQtY291bnQnLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybiAwO1xuICAgIH1cblxuICAgIGNvbnN0IHBlbmRpbmdEdW1wcyA9IGF3YWl0IGdldFBlbmRpbmdEdW1wcygpO1xuICAgIGlmIChwZW5kaW5nRHVtcHMubGVuZ3RoICE9PSAwKSB7XG4gICAgICBnZXRMb2dnZXIoKS53YXJuKFxuICAgICAgICBgY3Jhc2hSZXBvcnRzOiAke3BlbmRpbmdEdW1wcy5sZW5ndGh9IHBlbmRpbmcgZHVtcHMgZm91bmRgXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gcGVuZGluZ0R1bXBzLmxlbmd0aDtcbiAgfSk7XG5cbiAgaXBjLmhhbmRsZSgnY3Jhc2gtcmVwb3J0czp1cGxvYWQnLCBhc3luYyAoKSA9PiB7XG4gICAgaWYgKCFpc0VuYWJsZWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBwZW5kaW5nRHVtcHMgPSBhd2FpdCBnZXRQZW5kaW5nRHVtcHMoKTtcbiAgICBpZiAocGVuZGluZ0R1bXBzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGxvZ2dlciA9IGdldExvZ2dlcigpO1xuICAgIGxvZ2dlci53YXJuKGBjcmFzaFJlcG9ydHM6IHVwbG9hZGluZyAke3BlbmRpbmdEdW1wcy5sZW5ndGh9IGR1bXBzYCk7XG5cbiAgICBjb25zdCBtYXliZUR1bXBzID0gYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBwZW5kaW5nRHVtcHMubWFwKGFzeW5jIGZ1bGxQYXRoID0+IHtcbiAgICAgICAgdHJ5IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgZmlsZW5hbWU6IGJhc2VuYW1lKGZ1bGxQYXRoKSxcbiAgICAgICAgICAgIGNvbnRlbnQ6IGF3YWl0IHJlYWRGaWxlKGZ1bGxQYXRoKSxcbiAgICAgICAgICB9O1xuICAgICAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgICAgIGxvZ2dlci53YXJuKFxuICAgICAgICAgICAgYGNyYXNoUmVwb3J0czogZmFpbGVkIHRvIHJlYWQgY3Jhc2ggcmVwb3J0ICR7ZnVsbFBhdGh9IGR1ZSB0byBlcnJvcmAsXG4gICAgICAgICAgICBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgICB9XG4gICAgICB9KVxuICAgICk7XG5cbiAgICBjb25zdCBjb250ZW50ID0gUHJvdG8uQ3Jhc2hSZXBvcnRMaXN0LmVuY29kZSh7XG4gICAgICByZXBvcnRzOiBtYXliZUR1bXBzLmZpbHRlcihcbiAgICAgICAgKGR1bXApOiBkdW1wIGlzIHsgZmlsZW5hbWU6IHN0cmluZzsgY29udGVudDogQnVmZmVyIH0gPT4ge1xuICAgICAgICAgIHJldHVybiBkdW1wICE9PSB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICksXG4gICAgfSkuZmluaXNoKCk7XG5cbiAgICB0cnkge1xuICAgICAgY29uc3QgdXJsID0gYXdhaXQgdXBsb2FkRGVidWdMb2coe1xuICAgICAgICBjb250ZW50LFxuICAgICAgICBhcHBWZXJzaW9uOiBhcHAuZ2V0VmVyc2lvbigpLFxuICAgICAgICBsb2dnZXIsXG4gICAgICAgIGV4dGVuc2lvbjogJ2RtcCcsXG4gICAgICAgIGNvbnRlbnRUeXBlOiAnYXBwbGljYXRpb24vb2N0ZXQtc3RyZWFtJyxcbiAgICAgICAgY29tcHJlc3M6IGZhbHNlLFxuICAgICAgICBwcmVmaXg6ICdkZXNrdG9wLWNyYXNoLScsXG4gICAgICB9KTtcblxuICAgICAgbG9nZ2VyLmluZm8oJ2NyYXNoUmVwb3J0czogdXBsb2FkIGNvbXBsZXRlJyk7XG4gICAgICBjbGlwYm9hcmQud3JpdGVUZXh0KHVybCk7XG4gICAgfSBmaW5hbGx5IHtcbiAgICAgIGF3YWl0IGVyYXNlRHVtcHMobG9nZ2VyLCBwZW5kaW5nRHVtcHMpO1xuICAgIH1cbiAgfSk7XG5cbiAgaXBjLmhhbmRsZSgnY3Jhc2gtcmVwb3J0czplcmFzZScsIGFzeW5jICgpID0+IHtcbiAgICBpZiAoIWlzRW5hYmxlZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHBlbmRpbmdEdW1wcyA9IGF3YWl0IGdldFBlbmRpbmdEdW1wcygpO1xuXG4gICAgYXdhaXQgZXJhc2VEdW1wcyhnZXRMb2dnZXIoKSwgcGVuZGluZ0R1bXBzKTtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQThEO0FBQzlELHNCQUFvRDtBQUNwRCxrQkFBK0I7QUFHL0IsYUFBd0I7QUFDeEIscUJBQTZCO0FBQzdCLDRCQUF5QztBQUN6QyxzQkFBdUM7QUFDdkMsU0FBb0I7QUFFcEIsaUNBQWlFO0FBQy9ELFFBQU0saUJBQWlCLE1BQU0sOEJBQVMsb0JBQUksUUFBUSxZQUFZLENBQUM7QUFDL0QsTUFBSTtBQUNKLE1BQUksR0FBRyxVQUFVLEdBQUc7QUFDbEIsaUJBQWEsc0JBQUssZ0JBQWdCLFNBQVM7QUFBQSxFQUM3QyxPQUFPO0FBRUwsaUJBQWEsc0JBQUssZ0JBQWdCLFNBQVM7QUFBQSxFQUM3QztBQUVBLFFBQU0sUUFBUSxNQUFNLDZCQUFRLFVBQVU7QUFFdEMsU0FBTyxNQUFNLElBQUksVUFBUSxzQkFBSyxZQUFZLElBQUksQ0FBQztBQUNqRDtBQWJlLEFBZWYsMEJBQ0UsUUFDQSxPQUNlO0FBQ2YsU0FBTyxLQUFLLHlCQUF5QixNQUFNLHNCQUFzQjtBQUNqRSxRQUFNLFFBQVEsSUFDWixNQUFNLElBQUksT0FBTSxhQUFZO0FBQzFCLFFBQUk7QUFDRixZQUFNLDRCQUFPLFFBQVE7QUFBQSxJQUN2QixTQUFTLE9BQVA7QUFDQSxhQUFPLEtBQ0wsK0NBQStDLHlCQUMvQyxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUMsQ0FDSDtBQUNGO0FBakJlLEFBbUJmLHFCQUE0QixXQUE0QztBQUN0RSxRQUFNLFlBQVksQ0FBQyxpQ0FBYSxvQkFBSSxXQUFXLENBQUM7QUFFaEQsTUFBSSxXQUFXO0FBQ2IsY0FBVSxFQUFFLEtBQUssd0JBQXdCO0FBQ3pDLGtDQUFjLE1BQU0sRUFBRSxnQkFBZ0IsTUFBTSxDQUFDO0FBQUEsRUFDL0M7QUFFQSwwQkFBSSxPQUFPLDJCQUEyQixZQUFZO0FBQ2hELFFBQUksQ0FBQyxXQUFXO0FBQ2QsYUFBTztBQUFBLElBQ1Q7QUFFQSxVQUFNLGVBQWUsTUFBTSxnQkFBZ0I7QUFDM0MsUUFBSSxhQUFhLFdBQVcsR0FBRztBQUM3QixnQkFBVSxFQUFFLEtBQ1YsaUJBQWlCLGFBQWEsNEJBQ2hDO0FBQUEsSUFDRjtBQUNBLFdBQU8sYUFBYTtBQUFBLEVBQ3RCLENBQUM7QUFFRCwwQkFBSSxPQUFPLHdCQUF3QixZQUFZO0FBQzdDLFFBQUksQ0FBQyxXQUFXO0FBQ2Q7QUFBQSxJQUNGO0FBRUEsVUFBTSxlQUFlLE1BQU0sZ0JBQWdCO0FBQzNDLFFBQUksYUFBYSxXQUFXLEdBQUc7QUFDN0I7QUFBQSxJQUNGO0FBRUEsVUFBTSxTQUFTLFVBQVU7QUFDekIsV0FBTyxLQUFLLDJCQUEyQixhQUFhLGNBQWM7QUFFbEUsVUFBTSxhQUFhLE1BQU0sUUFBUSxJQUMvQixhQUFhLElBQUksT0FBTSxhQUFZO0FBQ2pDLFVBQUk7QUFDRixlQUFPO0FBQUEsVUFDTCxVQUFVLDBCQUFTLFFBQVE7QUFBQSxVQUMzQixTQUFTLE1BQU0sOEJBQVMsUUFBUTtBQUFBLFFBQ2xDO0FBQUEsTUFDRixTQUFTLE9BQVA7QUFDQSxlQUFPLEtBQ0wsNkNBQTZDLHlCQUM3QyxPQUFPLFlBQVksS0FBSyxDQUMxQjtBQUNBLGVBQU87QUFBQSxNQUNUO0FBQUEsSUFDRixDQUFDLENBQ0g7QUFFQSxVQUFNLFVBQVUsOEJBQU0sZ0JBQWdCLE9BQU87QUFBQSxNQUMzQyxTQUFTLFdBQVcsT0FDbEIsQ0FBQyxTQUF3RDtBQUN2RCxlQUFPLFNBQVM7QUFBQSxNQUNsQixDQUNGO0FBQUEsSUFDRixDQUFDLEVBQUUsT0FBTztBQUVWLFFBQUk7QUFDRixZQUFNLE1BQU0sTUFBTSxrQ0FBZTtBQUFBLFFBQy9CO0FBQUEsUUFDQSxZQUFZLG9CQUFJLFdBQVc7QUFBQSxRQUMzQjtBQUFBLFFBQ0EsV0FBVztBQUFBLFFBQ1gsYUFBYTtBQUFBLFFBQ2IsVUFBVTtBQUFBLFFBQ1YsUUFBUTtBQUFBLE1BQ1YsQ0FBQztBQUVELGFBQU8sS0FBSywrQkFBK0I7QUFDM0MsZ0NBQVUsVUFBVSxHQUFHO0FBQUEsSUFDekIsVUFBRTtBQUNBLFlBQU0sV0FBVyxRQUFRLFlBQVk7QUFBQSxJQUN2QztBQUFBLEVBQ0YsQ0FBQztBQUVELDBCQUFJLE9BQU8sdUJBQXVCLFlBQVk7QUFDNUMsUUFBSSxDQUFDLFdBQVc7QUFDZDtBQUFBLElBQ0Y7QUFFQSxVQUFNLGVBQWUsTUFBTSxnQkFBZ0I7QUFFM0MsVUFBTSxXQUFXLFVBQVUsR0FBRyxZQUFZO0FBQUEsRUFDNUMsQ0FBQztBQUNIO0FBdkZzQiIsCiAgIm5hbWVzIjogW10KfQo=
