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
var macos_exports = {};
__export(macos_exports, {
  MacOSUpdater: () => MacOSUpdater
});
module.exports = __toCommonJS(macos_exports);
var import_fs = require("fs");
var import_http = require("http");
var import_uuid = require("uuid");
var import_electron = require("electron");
var import_got = __toESM(require("got"));
var import_common = require("./common");
var import_explodePromise = require("../util/explodePromise");
var Errors = __toESM(require("../types/errors"));
var import_window_state = require("../../app/window_state");
var import_Dialogs = require("../types/Dialogs");
class MacOSUpdater extends import_common.Updater {
  async deletePreviousInstallers() {
  }
  async installUpdate(updateFilePath) {
    const { logger } = this;
    try {
      await this.handToAutoUpdate(updateFilePath);
    } catch (error) {
      const readOnly = "Cannot update while running on a read-only volume";
      const message = error.message || "";
      this.markCannotUpdate(error, message.includes(readOnly) ? import_Dialogs.DialogType.MacOS_Read_Only : import_Dialogs.DialogType.Cannot_Update);
      throw error;
    }
    logger.info("downloadAndInstall: showing update dialog...");
    this.setUpdateListener(async () => {
      logger.info("performUpdate: calling quitAndInstall...");
      (0, import_window_state.markShouldQuit)();
      import_electron.autoUpdater.quitAndInstall();
    });
  }
  async handToAutoUpdate(filePath) {
    const { logger } = this;
    const { promise, resolve, reject } = (0, import_explodePromise.explodePromise)();
    const token = (0, import_uuid.v4)();
    const updateFileUrl = generateFileUrl();
    const server = (0, import_http.createServer)();
    let serverUrl;
    server.on("error", (error) => {
      logger.error(`handToAutoUpdate: ${Errors.toLogFormat(error)}`);
      this.shutdown(server);
      reject(error);
    });
    server.on("request", (request, response) => {
      const { url } = request;
      if (url === "/") {
        const absoluteUrl = `${serverUrl}${updateFileUrl}`;
        writeJSONResponse(absoluteUrl, response);
        return;
      }
      if (url === "/token") {
        writeTokenResponse(token, response);
        return;
      }
      if (!url || !url.startsWith(updateFileUrl)) {
        this.logger.error(`write404: Squirrel requested unexpected url '${url}'`);
        response.writeHead(404);
        response.end();
        return;
      }
      this.pipeUpdateToSquirrel(filePath, server, response, reject);
    });
    server.listen(0, "127.0.0.1", async () => {
      try {
        serverUrl = getServerUrl(server);
        import_electron.autoUpdater.on("error", (...args) => {
          logger.error("autoUpdater: error", ...args.map(Errors.toLogFormat));
          const [error] = args;
          reject(error);
        });
        import_electron.autoUpdater.on("update-downloaded", () => {
          logger.info("autoUpdater: update-downloaded event fired");
          this.shutdown(server);
          resolve();
        });
        const response = await import_got.default.get(`${serverUrl}/token`);
        if (JSON.parse(response.body).token !== token) {
          throw new Error("autoUpdater: did not receive token back from updates server");
        }
        import_electron.autoUpdater.setFeedURL({
          url: serverUrl,
          headers: { "Cache-Control": "no-cache" }
        });
        import_electron.autoUpdater.checkForUpdates();
      } catch (error) {
        reject(error);
      }
    });
    return promise;
  }
  pipeUpdateToSquirrel(filePath, server, response, reject) {
    const { logger } = this;
    const updateFileSize = getFileSize(filePath);
    const readStream = (0, import_fs.createReadStream)(filePath);
    response.on("error", (error) => {
      logger.error(`pipeUpdateToSquirrel: update file download request had an error ${Errors.toLogFormat(error)}`);
      this.shutdown(server);
      reject(error);
    });
    readStream.on("error", (error) => {
      logger.error(`pipeUpdateToSquirrel: read stream error response: ${Errors.toLogFormat(error)}`);
      this.shutdown(server, response);
      reject(error);
    });
    response.writeHead(200, {
      "Content-Type": "application/zip",
      "Content-Length": updateFileSize
    });
    readStream.pipe(response);
  }
  shutdown(server, response) {
    const { logger } = this;
    try {
      if (server) {
        server.close();
      }
    } catch (error) {
      logger.error(`shutdown: Error closing server ${Errors.toLogFormat(error)}`);
    }
    try {
      if (response) {
        response.end();
      }
    } catch (endError) {
      logger.error(`shutdown: couldn't end response ${Errors.toLogFormat(endError)}`);
    }
  }
}
function writeJSONResponse(url, response) {
  const data = Buffer.from(JSON.stringify({
    url
  }));
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": data.byteLength
  });
  response.end(data);
}
function writeTokenResponse(token, response) {
  const data = Buffer.from(JSON.stringify({
    token
  }));
  response.writeHead(200, {
    "Content-Type": "application/json",
    "Content-Length": data.byteLength
  });
  response.end(data);
}
function getServerUrl(server) {
  const address = server.address();
  return `http://127.0.0.1:${address.port}`;
}
function generateFileUrl() {
  return `/${(0, import_uuid.v4)()}.zip`;
}
function getFileSize(targetPath) {
  const { size } = (0, import_fs.statSync)(targetPath);
  return size;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MacOSUpdater
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibWFjb3MudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtLCBzdGF0U3luYyB9IGZyb20gJ2ZzJztcbmltcG9ydCB0eXBlIHsgSW5jb21pbmdNZXNzYWdlLCBTZXJ2ZXIsIFNlcnZlclJlc3BvbnNlIH0gZnJvbSAnaHR0cCc7XG5pbXBvcnQgeyBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdodHRwJztcbmltcG9ydCB0eXBlIHsgQWRkcmVzc0luZm8gfSBmcm9tICduZXQnO1xuXG5pbXBvcnQgeyB2NCBhcyBnZXRHdWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyBhdXRvVXBkYXRlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCBnb3QgZnJvbSAnZ290JztcblxuaW1wb3J0IHsgVXBkYXRlciB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IGV4cGxvZGVQcm9taXNlIH0gZnJvbSAnLi4vdXRpbC9leHBsb2RlUHJvbWlzZSc7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IG1hcmtTaG91bGRRdWl0IH0gZnJvbSAnLi4vLi4vYXBwL3dpbmRvd19zdGF0ZSc7XG5pbXBvcnQgeyBEaWFsb2dUeXBlIH0gZnJvbSAnLi4vdHlwZXMvRGlhbG9ncyc7XG5cbmV4cG9ydCBjbGFzcyBNYWNPU1VwZGF0ZXIgZXh0ZW5kcyBVcGRhdGVyIHtcbiAgcHJvdGVjdGVkIGFzeW5jIGRlbGV0ZVByZXZpb3VzSW5zdGFsbGVycygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBObyBpbnN0YWxsZXJzIGFyZSBjYWNoZSBvbiBtYWNPU1xuICB9XG5cbiAgcHJvdGVjdGVkIGFzeW5jIGluc3RhbGxVcGRhdGUodXBkYXRlRmlsZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IHsgbG9nZ2VyIH0gPSB0aGlzO1xuXG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IHRoaXMuaGFuZFRvQXV0b1VwZGF0ZSh1cGRhdGVGaWxlUGF0aCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IHJlYWRPbmx5ID0gJ0Nhbm5vdCB1cGRhdGUgd2hpbGUgcnVubmluZyBvbiBhIHJlYWQtb25seSB2b2x1bWUnO1xuICAgICAgY29uc3QgbWVzc2FnZTogc3RyaW5nID0gZXJyb3IubWVzc2FnZSB8fCAnJztcbiAgICAgIHRoaXMubWFya0Nhbm5vdFVwZGF0ZShcbiAgICAgICAgZXJyb3IsXG4gICAgICAgIG1lc3NhZ2UuaW5jbHVkZXMocmVhZE9ubHkpXG4gICAgICAgICAgPyBEaWFsb2dUeXBlLk1hY09TX1JlYWRfT25seVxuICAgICAgICAgIDogRGlhbG9nVHlwZS5DYW5ub3RfVXBkYXRlXG4gICAgICApO1xuXG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICAvLyBBdCB0aGlzIHBvaW50LCBjbG9zaW5nIHRoZSBhcHAgd2lsbCBjYXVzZSB0aGUgdXBkYXRlIHRvIGJlIGluc3RhbGxlZCBhdXRvbWF0aWNhbGx5XG4gICAgLy8gICBiZWNhdXNlIFNxdWlycmVsIGhhcyBjYWNoZWQgdGhlIHVwZGF0ZSBmaWxlIGFuZCB3aWxsIGRvIHRoZSByaWdodCB0aGluZy5cbiAgICBsb2dnZXIuaW5mbygnZG93bmxvYWRBbmRJbnN0YWxsOiBzaG93aW5nIHVwZGF0ZSBkaWFsb2cuLi4nKTtcblxuICAgIHRoaXMuc2V0VXBkYXRlTGlzdGVuZXIoYXN5bmMgKCkgPT4ge1xuICAgICAgbG9nZ2VyLmluZm8oJ3BlcmZvcm1VcGRhdGU6IGNhbGxpbmcgcXVpdEFuZEluc3RhbGwuLi4nKTtcbiAgICAgIG1hcmtTaG91bGRRdWl0KCk7XG4gICAgICBhdXRvVXBkYXRlci5xdWl0QW5kSW5zdGFsbCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kVG9BdXRvVXBkYXRlKGZpbGVQYXRoOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcztcbiAgICBjb25zdCB7IHByb21pc2UsIHJlc29sdmUsIHJlamVjdCB9ID0gZXhwbG9kZVByb21pc2U8dm9pZD4oKTtcblxuICAgIGNvbnN0IHRva2VuID0gZ2V0R3VpZCgpO1xuICAgIGNvbnN0IHVwZGF0ZUZpbGVVcmwgPSBnZW5lcmF0ZUZpbGVVcmwoKTtcbiAgICBjb25zdCBzZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIoKTtcbiAgICBsZXQgc2VydmVyVXJsOiBzdHJpbmc7XG5cbiAgICBzZXJ2ZXIub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgbG9nZ2VyLmVycm9yKGBoYW5kVG9BdXRvVXBkYXRlOiAke0Vycm9ycy50b0xvZ0Zvcm1hdChlcnJvcil9YCk7XG4gICAgICB0aGlzLnNodXRkb3duKHNlcnZlcik7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgc2VydmVyLm9uKFxuICAgICAgJ3JlcXVlc3QnLFxuICAgICAgKHJlcXVlc3Q6IEluY29taW5nTWVzc2FnZSwgcmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSA9PiB7XG4gICAgICAgIGNvbnN0IHsgdXJsIH0gPSByZXF1ZXN0O1xuXG4gICAgICAgIGlmICh1cmwgPT09ICcvJykge1xuICAgICAgICAgIGNvbnN0IGFic29sdXRlVXJsID0gYCR7c2VydmVyVXJsfSR7dXBkYXRlRmlsZVVybH1gO1xuICAgICAgICAgIHdyaXRlSlNPTlJlc3BvbnNlKGFic29sdXRlVXJsLCByZXNwb25zZSk7XG5cbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAodXJsID09PSAnL3Rva2VuJykge1xuICAgICAgICAgIHdyaXRlVG9rZW5SZXNwb25zZSh0b2tlbiwgcmVzcG9uc2UpO1xuXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgaWYgKCF1cmwgfHwgIXVybC5zdGFydHNXaXRoKHVwZGF0ZUZpbGVVcmwpKSB7XG4gICAgICAgICAgdGhpcy5sb2dnZXIuZXJyb3IoXG4gICAgICAgICAgICBgd3JpdGU0MDQ6IFNxdWlycmVsIHJlcXVlc3RlZCB1bmV4cGVjdGVkIHVybCAnJHt1cmx9J2BcbiAgICAgICAgICApO1xuICAgICAgICAgIHJlc3BvbnNlLndyaXRlSGVhZCg0MDQpO1xuICAgICAgICAgIHJlc3BvbnNlLmVuZCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHRoaXMucGlwZVVwZGF0ZVRvU3F1aXJyZWwoZmlsZVBhdGgsIHNlcnZlciwgcmVzcG9uc2UsIHJlamVjdCk7XG4gICAgICB9XG4gICAgKTtcblxuICAgIHNlcnZlci5saXN0ZW4oMCwgJzEyNy4wLjAuMScsIGFzeW5jICgpID0+IHtcbiAgICAgIHRyeSB7XG4gICAgICAgIHNlcnZlclVybCA9IGdldFNlcnZlclVybChzZXJ2ZXIpO1xuXG4gICAgICAgIGF1dG9VcGRhdGVyLm9uKCdlcnJvcicsICguLi5hcmdzKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmVycm9yKCdhdXRvVXBkYXRlcjogZXJyb3InLCAuLi5hcmdzLm1hcChFcnJvcnMudG9Mb2dGb3JtYXQpKTtcblxuICAgICAgICAgIGNvbnN0IFtlcnJvcl0gPSBhcmdzO1xuICAgICAgICAgIHJlamVjdChlcnJvcik7XG4gICAgICAgIH0pO1xuICAgICAgICBhdXRvVXBkYXRlci5vbigndXBkYXRlLWRvd25sb2FkZWQnLCAoKSA9PiB7XG4gICAgICAgICAgbG9nZ2VyLmluZm8oJ2F1dG9VcGRhdGVyOiB1cGRhdGUtZG93bmxvYWRlZCBldmVudCBmaXJlZCcpO1xuICAgICAgICAgIHRoaXMuc2h1dGRvd24oc2VydmVyKTtcbiAgICAgICAgICByZXNvbHZlKCk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3BvbnNlID0gYXdhaXQgZ290LmdldChgJHtzZXJ2ZXJVcmx9L3Rva2VuYCk7XG4gICAgICAgIGlmIChKU09OLnBhcnNlKHJlc3BvbnNlLmJvZHkpLnRva2VuICE9PSB0b2tlbikge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdhdXRvVXBkYXRlcjogZGlkIG5vdCByZWNlaXZlIHRva2VuIGJhY2sgZnJvbSB1cGRhdGVzIHNlcnZlcidcbiAgICAgICAgICApO1xuICAgICAgICB9XG5cbiAgICAgICAgYXV0b1VwZGF0ZXIuc2V0RmVlZFVSTCh7XG4gICAgICAgICAgdXJsOiBzZXJ2ZXJVcmwsXG4gICAgICAgICAgaGVhZGVyczogeyAnQ2FjaGUtQ29udHJvbCc6ICduby1jYWNoZScgfSxcbiAgICAgICAgfSk7XG4gICAgICAgIGF1dG9VcGRhdGVyLmNoZWNrRm9yVXBkYXRlcygpO1xuICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHJldHVybiBwcm9taXNlO1xuICB9XG5cbiAgcHJpdmF0ZSBwaXBlVXBkYXRlVG9TcXVpcnJlbChcbiAgICBmaWxlUGF0aDogc3RyaW5nLFxuICAgIHNlcnZlcjogU2VydmVyLFxuICAgIHJlc3BvbnNlOiBTZXJ2ZXJSZXNwb25zZSxcbiAgICByZWplY3Q6IChlcnJvcjogRXJyb3IpID0+IHZvaWRcbiAgKTogdm9pZCB7XG4gICAgY29uc3QgeyBsb2dnZXIgfSA9IHRoaXM7XG5cbiAgICBjb25zdCB1cGRhdGVGaWxlU2l6ZSA9IGdldEZpbGVTaXplKGZpbGVQYXRoKTtcbiAgICBjb25zdCByZWFkU3RyZWFtID0gY3JlYXRlUmVhZFN0cmVhbShmaWxlUGF0aCk7XG5cbiAgICByZXNwb25zZS5vbignZXJyb3InLCAoZXJyb3I6IEVycm9yKSA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGBwaXBlVXBkYXRlVG9TcXVpcnJlbDogdXBkYXRlIGZpbGUgZG93bmxvYWQgcmVxdWVzdCBoYWQgYW4gZXJyb3IgJHtFcnJvcnMudG9Mb2dGb3JtYXQoXG4gICAgICAgICAgZXJyb3JcbiAgICAgICAgKX1gXG4gICAgICApO1xuICAgICAgdGhpcy5zaHV0ZG93bihzZXJ2ZXIpO1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJlYWRTdHJlYW0ub24oJ2Vycm9yJywgKGVycm9yOiBFcnJvcikgPT4ge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgcGlwZVVwZGF0ZVRvU3F1aXJyZWw6IHJlYWQgc3RyZWFtIGVycm9yIHJlc3BvbnNlOiAke0Vycm9ycy50b0xvZ0Zvcm1hdChcbiAgICAgICAgICBlcnJvclxuICAgICAgICApfWBcbiAgICAgICk7XG4gICAgICB0aGlzLnNodXRkb3duKHNlcnZlciwgcmVzcG9uc2UpO1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIHJlc3BvbnNlLndyaXRlSGVhZCgyMDAsIHtcbiAgICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vemlwJyxcbiAgICAgICdDb250ZW50LUxlbmd0aCc6IHVwZGF0ZUZpbGVTaXplLFxuICAgIH0pO1xuXG4gICAgcmVhZFN0cmVhbS5waXBlKHJlc3BvbnNlKTtcbiAgfVxuXG4gIHByaXZhdGUgc2h1dGRvd24oc2VydmVyOiBTZXJ2ZXIsIHJlc3BvbnNlPzogU2VydmVyUmVzcG9uc2UpOiB2b2lkIHtcbiAgICBjb25zdCB7IGxvZ2dlciB9ID0gdGhpcztcblxuICAgIHRyeSB7XG4gICAgICBpZiAoc2VydmVyKSB7XG4gICAgICAgIHNlcnZlci5jbG9zZSgpO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBsb2dnZXIuZXJyb3IoXG4gICAgICAgIGBzaHV0ZG93bjogRXJyb3IgY2xvc2luZyBzZXJ2ZXIgJHtFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdHJ5IHtcbiAgICAgIGlmIChyZXNwb25zZSkge1xuICAgICAgICByZXNwb25zZS5lbmQoKTtcbiAgICAgIH1cbiAgICB9IGNhdGNoIChlbmRFcnJvcikge1xuICAgICAgbG9nZ2VyLmVycm9yKFxuICAgICAgICBgc2h1dGRvd246IGNvdWxkbid0IGVuZCByZXNwb25zZSAke0Vycm9ycy50b0xvZ0Zvcm1hdChlbmRFcnJvcil9YFxuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gSGVscGVyc1xuXG5mdW5jdGlvbiB3cml0ZUpTT05SZXNwb25zZSh1cmw6IHN0cmluZywgcmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSB7XG4gIGNvbnN0IGRhdGEgPSBCdWZmZXIuZnJvbShcbiAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB1cmwsXG4gICAgfSlcbiAgKTtcbiAgcmVzcG9uc2Uud3JpdGVIZWFkKDIwMCwge1xuICAgICdDb250ZW50LVR5cGUnOiAnYXBwbGljYXRpb24vanNvbicsXG4gICAgJ0NvbnRlbnQtTGVuZ3RoJzogZGF0YS5ieXRlTGVuZ3RoLFxuICB9KTtcbiAgcmVzcG9uc2UuZW5kKGRhdGEpO1xufVxuXG5mdW5jdGlvbiB3cml0ZVRva2VuUmVzcG9uc2UodG9rZW46IHN0cmluZywgcmVzcG9uc2U6IFNlcnZlclJlc3BvbnNlKSB7XG4gIGNvbnN0IGRhdGEgPSBCdWZmZXIuZnJvbShcbiAgICBKU09OLnN0cmluZ2lmeSh7XG4gICAgICB0b2tlbixcbiAgICB9KVxuICApO1xuICByZXNwb25zZS53cml0ZUhlYWQoMjAwLCB7XG4gICAgJ0NvbnRlbnQtVHlwZSc6ICdhcHBsaWNhdGlvbi9qc29uJyxcbiAgICAnQ29udGVudC1MZW5ndGgnOiBkYXRhLmJ5dGVMZW5ndGgsXG4gIH0pO1xuICByZXNwb25zZS5lbmQoZGF0YSk7XG59XG5cbmZ1bmN0aW9uIGdldFNlcnZlclVybChzZXJ2ZXI6IFNlcnZlcikge1xuICBjb25zdCBhZGRyZXNzID0gc2VydmVyLmFkZHJlc3MoKSBhcyBBZGRyZXNzSW5mbztcblxuICByZXR1cm4gYGh0dHA6Ly8xMjcuMC4wLjE6JHthZGRyZXNzLnBvcnR9YDtcbn1cbmZ1bmN0aW9uIGdlbmVyYXRlRmlsZVVybCgpOiBzdHJpbmcge1xuICByZXR1cm4gYC8ke2dldEd1aWQoKX0uemlwYDtcbn1cblxuZnVuY3Rpb24gZ2V0RmlsZVNpemUodGFyZ2V0UGF0aDogc3RyaW5nKTogbnVtYmVyIHtcbiAgY29uc3QgeyBzaXplIH0gPSBzdGF0U3luYyh0YXJnZXRQYXRoKTtcblxuICByZXR1cm4gc2l6ZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxnQkFBMkM7QUFFM0Msa0JBQTZCO0FBRzdCLGtCQUE4QjtBQUM5QixzQkFBNEI7QUFDNUIsaUJBQWdCO0FBRWhCLG9CQUF3QjtBQUN4Qiw0QkFBK0I7QUFDL0IsYUFBd0I7QUFDeEIsMEJBQStCO0FBQy9CLHFCQUEyQjtBQUVwQixNQUFNLHFCQUFxQixzQkFBUTtBQUFBLFFBQ3hCLDJCQUEwQztBQUFBLEVBRTFEO0FBQUEsUUFFZ0IsY0FBYyxnQkFBdUM7QUFDbkUsVUFBTSxFQUFFLFdBQVc7QUFFbkIsUUFBSTtBQUNGLFlBQU0sS0FBSyxpQkFBaUIsY0FBYztBQUFBLElBQzVDLFNBQVMsT0FBUDtBQUNBLFlBQU0sV0FBVztBQUNqQixZQUFNLFVBQWtCLE1BQU0sV0FBVztBQUN6QyxXQUFLLGlCQUNILE9BQ0EsUUFBUSxTQUFTLFFBQVEsSUFDckIsMEJBQVcsa0JBQ1gsMEJBQVcsYUFDakI7QUFFQSxZQUFNO0FBQUEsSUFDUjtBQUlBLFdBQU8sS0FBSyw4Q0FBOEM7QUFFMUQsU0FBSyxrQkFBa0IsWUFBWTtBQUNqQyxhQUFPLEtBQUssMENBQTBDO0FBQ3RELDhDQUFlO0FBQ2Ysa0NBQVksZUFBZTtBQUFBLElBQzdCLENBQUM7QUFBQSxFQUNIO0FBQUEsUUFFYyxpQkFBaUIsVUFBaUM7QUFDOUQsVUFBTSxFQUFFLFdBQVc7QUFDbkIsVUFBTSxF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
