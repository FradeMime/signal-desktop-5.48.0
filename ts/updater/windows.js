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
var windows_exports = {};
__export(windows_exports, {
  WindowsUpdater: () => WindowsUpdater
});
module.exports = __toCommonJS(windows_exports);
var import_path = require("path");
var import_child_process = require("child_process");
var import_fs = require("fs");
var import_electron = require("electron");
var import_pify = __toESM(require("pify"));
var import_common = require("./common");
var import_window_state = require("../../app/window_state");
const readdir = (0, import_pify.default)(import_fs.readdir);
const unlink = (0, import_pify.default)(import_fs.unlink);
const IS_EXE = /\.exe$/i;
class WindowsUpdater extends import_common.Updater {
  constructor() {
    super(...arguments);
    this.installing = false;
  }
  async deletePreviousInstallers() {
    const userDataPath = import_electron.app.getPath("userData");
    const files = await readdir(userDataPath);
    await Promise.all(files.map(async (file) => {
      const isExe = IS_EXE.test(file);
      if (!isExe) {
        return;
      }
      const fullPath = (0, import_path.join)(userDataPath, file);
      try {
        await unlink(fullPath);
      } catch (error) {
        this.logger.error(`deletePreviousInstallers: couldn't delete file ${file}`);
      }
    }));
  }
  async installUpdate(updateFilePath) {
    const { logger } = this;
    logger.info("downloadAndInstall: showing dialog...");
    this.setUpdateListener(async () => {
      try {
        await this.install(updateFilePath);
        this.installing = true;
      } catch (error) {
        this.markCannotUpdate(error);
        throw error;
      }
      (0, import_window_state.markShouldQuit)();
      import_electron.app.quit();
    });
  }
  async install(filePath) {
    if (this.installing) {
      return;
    }
    const { logger } = this;
    logger.info("windows/install: installing package...");
    const args = ["--updated"];
    const options = {
      detached: true,
      stdio: "ignore"
    };
    try {
      await spawn(filePath, args, options);
    } catch (error) {
      if (error.code === "UNKNOWN" || error.code === "EACCES") {
        logger.warn("windows/install: Error running installer; Trying again with elevate.exe");
        await spawn(getElevatePath(), [filePath, ...args], options);
        return;
      }
      throw error;
    }
  }
}
function getElevatePath() {
  const installPath = import_electron.app.getAppPath();
  return (0, import_path.join)(installPath, "resources", "elevate.exe");
}
async function spawn(exe, args, options) {
  return new Promise((resolve, reject) => {
    const emitter = (0, import_child_process.spawn)(exe, args, options);
    emitter.on("error", reject);
    emitter.unref();
    setTimeout(resolve, 200);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  WindowsUpdater
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2luZG93cy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHsgU3Bhd25PcHRpb25zIH0gZnJvbSAnY2hpbGRfcHJvY2Vzcyc7XG5pbXBvcnQgeyBzcGF3biBhcyBzcGF3bkVtaXR0ZXIgfSBmcm9tICdjaGlsZF9wcm9jZXNzJztcbmltcG9ydCB7IHJlYWRkaXIgYXMgcmVhZGRpckNhbGxiYWNrLCB1bmxpbmsgYXMgdW5saW5rQ2FsbGJhY2sgfSBmcm9tICdmcyc7XG5cbmltcG9ydCB7IGFwcCB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQgeyBVcGRhdGVyIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsgbWFya1Nob3VsZFF1aXQgfSBmcm9tICcuLi8uLi9hcHAvd2luZG93X3N0YXRlJztcblxuY29uc3QgcmVhZGRpciA9IHBpZnkocmVhZGRpckNhbGxiYWNrKTtcbmNvbnN0IHVubGluayA9IHBpZnkodW5saW5rQ2FsbGJhY2spO1xuXG5jb25zdCBJU19FWEUgPSAvXFwuZXhlJC9pO1xuXG5leHBvcnQgY2xhc3MgV2luZG93c1VwZGF0ZXIgZXh0ZW5kcyBVcGRhdGVyIHtcbiAgcHJpdmF0ZSBpbnN0YWxsaW5nID0gZmFsc2U7XG5cbiAgLy8gVGhpcyBpcyBmaXhlZCBieSBvdXIgbmV3IGluc3RhbGwgbWVjaGFuaXNtcy4uLlxuICAvLyAgIGh0dHBzOi8vZ2l0aHViLmNvbS9zaWduYWxhcHAvU2lnbmFsLURlc2t0b3AvaXNzdWVzLzIzNjlcbiAgLy8gLi4uYnV0IHdlIHNob3VsZCBhbHNvIGNsZWFuIHVwIHRob3NlIG9sZCBpbnN0YWxsZXJzLlxuICBwcm90ZWN0ZWQgYXN5bmMgZGVsZXRlUHJldmlvdXNJbnN0YWxsZXJzKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHVzZXJEYXRhUGF0aCA9IGFwcC5nZXRQYXRoKCd1c2VyRGF0YScpO1xuICAgIGNvbnN0IGZpbGVzOiBBcnJheTxzdHJpbmc+ID0gYXdhaXQgcmVhZGRpcih1c2VyRGF0YVBhdGgpO1xuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgZmlsZXMubWFwKGFzeW5jIGZpbGUgPT4ge1xuICAgICAgICBjb25zdCBpc0V4ZSA9IElTX0VYRS50ZXN0KGZpbGUpO1xuICAgICAgICBpZiAoIWlzRXhlKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgZnVsbFBhdGggPSBqb2luKHVzZXJEYXRhUGF0aCwgZmlsZSk7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgYXdhaXQgdW5saW5rKGZ1bGxQYXRoKTtcbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICB0aGlzLmxvZ2dlci5lcnJvcihcbiAgICAgICAgICAgIGBkZWxldGVQcmV2aW91c0luc3RhbGxlcnM6IGNvdWxkbid0IGRlbGV0ZSBmaWxlICR7ZmlsZX1gXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIHByb3RlY3RlZCBhc3luYyBpbnN0YWxsVXBkYXRlKHVwZGF0ZUZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcztcblxuICAgIGxvZ2dlci5pbmZvKCdkb3dubG9hZEFuZEluc3RhbGw6IHNob3dpbmcgZGlhbG9nLi4uJyk7XG4gICAgdGhpcy5zZXRVcGRhdGVMaXN0ZW5lcihhc3luYyAoKSA9PiB7XG4gICAgICB0cnkge1xuICAgICAgICBhd2FpdCB0aGlzLmluc3RhbGwodXBkYXRlRmlsZVBhdGgpO1xuICAgICAgICB0aGlzLmluc3RhbGxpbmcgPSB0cnVlO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgdGhpcy5tYXJrQ2Fubm90VXBkYXRlKGVycm9yKTtcblxuICAgICAgICB0aHJvdyBlcnJvcjtcbiAgICAgIH1cblxuICAgICAgbWFya1Nob3VsZFF1aXQoKTtcbiAgICAgIGFwcC5xdWl0KCk7XG4gICAgfSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGluc3RhbGwoZmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGlmICh0aGlzLmluc3RhbGxpbmcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcztcblxuICAgIGxvZ2dlci5pbmZvKCd3aW5kb3dzL2luc3RhbGw6IGluc3RhbGxpbmcgcGFja2FnZS4uLicpO1xuICAgIGNvbnN0IGFyZ3MgPSBbJy0tdXBkYXRlZCddO1xuICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICBkZXRhY2hlZDogdHJ1ZSxcbiAgICAgIHN0ZGlvOiAnaWdub3JlJyBhcyBjb25zdCwgLy8gVHlwZVNjcmlwdCBjb25zaWRlcnMgdGhpcyBhIHBsYWluIHN0cmluZyB3aXRob3V0IGhlbHBcbiAgICB9O1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHNwYXduKGZpbGVQYXRoLCBhcmdzLCBvcHRpb25zKTtcbiAgICB9IGNhdGNoIChlcnJvcikge1xuICAgICAgaWYgKGVycm9yLmNvZGUgPT09ICdVTktOT1dOJyB8fCBlcnJvci5jb2RlID09PSAnRUFDQ0VTJykge1xuICAgICAgICBsb2dnZXIud2FybihcbiAgICAgICAgICAnd2luZG93cy9pbnN0YWxsOiBFcnJvciBydW5uaW5nIGluc3RhbGxlcjsgVHJ5aW5nIGFnYWluIHdpdGggZWxldmF0ZS5leGUnXG4gICAgICAgICk7XG4gICAgICAgIGF3YWl0IHNwYXduKGdldEVsZXZhdGVQYXRoKCksIFtmaWxlUGF0aCwgLi4uYXJnc10sIG9wdGlvbnMpO1xuXG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuICB9XG59XG5cbi8vIEhlbHBlcnNcblxuZnVuY3Rpb24gZ2V0RWxldmF0ZVBhdGgoKSB7XG4gIGNvbnN0IGluc3RhbGxQYXRoID0gYXBwLmdldEFwcFBhdGgoKTtcblxuICByZXR1cm4gam9pbihpbnN0YWxsUGF0aCwgJ3Jlc291cmNlcycsICdlbGV2YXRlLmV4ZScpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBzcGF3bihcbiAgZXhlOiBzdHJpbmcsXG4gIGFyZ3M6IEFycmF5PHN0cmluZz4sXG4gIG9wdGlvbnM6IFNwYXduT3B0aW9uc1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgZW1pdHRlciA9IHNwYXduRW1pdHRlcihleGUsIGFyZ3MsIG9wdGlvbnMpO1xuICAgIGVtaXR0ZXIub24oJ2Vycm9yJywgcmVqZWN0KTtcbiAgICBlbWl0dGVyLnVucmVmKCk7XG5cbiAgICBzZXRUaW1lb3V0KHJlc29sdmUsIDIwMCk7XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFxQjtBQUVyQiwyQkFBc0M7QUFDdEMsZ0JBQXFFO0FBRXJFLHNCQUFvQjtBQUNwQixrQkFBaUI7QUFFakIsb0JBQXdCO0FBQ3hCLDBCQUErQjtBQUUvQixNQUFNLFVBQVUseUJBQUssaUJBQWU7QUFDcEMsTUFBTSxTQUFTLHlCQUFLLGdCQUFjO0FBRWxDLE1BQU0sU0FBUztBQUVSLE1BQU0sdUJBQXVCLHNCQUFRO0FBQUEsRUFBckM7QUFBQTtBQUNHLHNCQUFhO0FBQUE7QUFBQSxRQUtMLDJCQUEwQztBQUN4RCxVQUFNLGVBQWUsb0JBQUksUUFBUSxVQUFVO0FBQzNDLFVBQU0sUUFBdUIsTUFBTSxRQUFRLFlBQVk7QUFDdkQsVUFBTSxRQUFRLElBQ1osTUFBTSxJQUFJLE9BQU0sU0FBUTtBQUN0QixZQUFNLFFBQVEsT0FBTyxLQUFLLElBQUk7QUFDOUIsVUFBSSxDQUFDLE9BQU87QUFDVjtBQUFBLE1BQ0Y7QUFFQSxZQUFNLFdBQVcsc0JBQUssY0FBYyxJQUFJO0FBQ3hDLFVBQUk7QUFDRixjQUFNLE9BQU8sUUFBUTtBQUFBLE1BQ3ZCLFNBQVMsT0FBUDtBQUNBLGFBQUssT0FBTyxNQUNWLGtEQUFrRCxNQUNwRDtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUMsQ0FDSDtBQUFBLEVBQ0Y7QUFBQSxRQUNnQixjQUFjLGdCQUF1QztBQUNuRSxVQUFNLEVBQUUsV0FBVztBQUVuQixXQUFPLEtBQUssdUNBQXVDO0FBQ25ELFNBQUssa0JBQWtCLFlBQVk7QUFDakMsVUFBSTtBQUNGLGNBQU0sS0FBSyxRQUFRLGNBQWM7QUFDakMsYUFBSyxhQUFhO0FBQUEsTUFDcEIsU0FBUyxPQUFQO0FBQ0EsYUFBSyxpQkFBaUIsS0FBSztBQUUzQixjQUFNO0FBQUEsTUFDUjtBQUVBLDhDQUFlO0FBQ2YsMEJBQUksS0FBSztBQUFBLElBQ1gsQ0FBQztBQUFBLEVBQ0g7QUFBQSxRQUVjLFFBQVEsVUFBaUM7QUFDckQsUUFBSSxLQUFLLFlBQVk7QUFDbkI7QUFBQSxJQUNGO0FBRUEsVUFBTSxFQUFFLFdBQVc7QUFFbkIsV0FBTyxLQUFLLHdDQUF3QztBQUNwRCxVQUFNLE9BQU8sQ0FBQyxXQUFXO0FBQ3pCLFVBQU0sVUFBVTtBQUFBLE1BQ2QsVUFBVTtBQUFBLE1BQ1YsT0FBTztBQUFBLElBQ1Q7QUFFQSxRQUFJO0FBQ0YsWUFBTSxNQUFNLFVBQVUsTUFBTSxPQUFPO0FBQUEsSUFDckMsU0FBUyxPQUFQO0FBQ0EsVUFBSSxNQUFNLFNBQVMsYUFBYSxNQUFNLFNBQVMsVUFBVTtBQUN2RCxlQUFPLEtBQ0wseUVBQ0Y7QUFDQSxjQUFNLE1BQU0sZUFBZSxHQUFHLENBQUMsVUFBVSxHQUFHLElBQUksR0FBRyxPQUFPO0FBRTFEO0FBQUEsTUFDRjtBQUVBLFlBQU07QUFBQSxJQUNSO0FBQUEsRUFDRjtBQUNGO0FBM0VPLEFBK0VQLDBCQUEwQjtBQUN4QixRQUFNLGNBQWMsb0JBQUksV0FBVztBQUVuQyxTQUFPLHNCQUFLLGFBQWEsYUFBYSxhQUFhO0FBQ3JEO0FBSlMsQUFNVCxxQkFDRSxLQUNBLE1BQ0EsU0FDZTtBQUNmLFNBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RDLFVBQU0sVUFBVSxnQ0FBYSxLQUFLLE1BQU0sT0FBTztBQUMvQyxZQUFRLEdBQUcsU0FBUyxNQUFNO0FBQzFCLFlBQVEsTUFBTTtBQUVkLGVBQVcsU0FBUyxHQUFHO0FBQUEsRUFDekIsQ0FBQztBQUNIO0FBWmUiLAogICJuYW1lcyI6IFtdCn0K
