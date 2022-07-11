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
var util_exports = {};
__export(util_exports, {
  checkIntegrity: () => checkIntegrity,
  gracefulRename: () => gracefulRename
});
module.exports = __toCommonJS(util_exports);
var import_fs = require("fs");
var import_promises = require("fs/promises");
var import_promises2 = require("stream/promises");
var import_crypto = require("crypto");
var Errors = __toESM(require("../types/errors"));
var durations = __toESM(require("../util/durations"));
var import_timestamp = require("../util/timestamp");
var import_sleep = require("../util/sleep");
async function checkIntegrity(fileName, sha512) {
  try {
    const hash = (0, import_crypto.createHash)("sha512");
    await (0, import_promises2.pipeline)((0, import_fs.createReadStream)(fileName), hash);
    const actualSHA512 = hash.digest("base64");
    if (sha512 === actualSHA512) {
      return { ok: true };
    }
    return {
      ok: false,
      error: `Integrity check failure: expected ${sha512}, got ${actualSHA512}`
    };
  } catch (error) {
    return {
      ok: false,
      error: Errors.toLogFormat(error)
    };
  }
}
async function doGracefulRename({
  logger,
  fromPath,
  toPath,
  startedAt,
  retryCount,
  retryAfter = 5 * durations.SECOND,
  timeout = 5 * durations.MINUTE
}) {
  try {
    await (0, import_promises.rename)(fromPath, toPath);
    if (retryCount !== 0) {
      logger.info(`gracefulRename: succeeded after ${retryCount} retries, renamed ${fromPath} to ${toPath}`);
    }
  } catch (error) {
    if (error.code !== "EACCESS" && error.code !== "EPERM") {
      throw error;
    }
    if ((0, import_timestamp.isOlderThan)(startedAt, timeout)) {
      logger.warn(`gracefulRename: timed out while retrying renaming ${fromPath} to ${toPath}`);
      throw error;
    }
    logger.warn(`gracefulRename: got ${error.code} when renaming ${fromPath} to ${toPath}, retrying in one second. (retryCount=${retryCount})`);
    await (0, import_sleep.sleep)(retryAfter);
    return doGracefulRename({
      logger,
      fromPath,
      toPath,
      startedAt,
      retryCount: retryCount + 1,
      retryAfter,
      timeout
    });
  }
}
async function gracefulRename(logger, fromPath, toPath) {
  return doGracefulRename({
    logger,
    fromPath,
    toPath,
    startedAt: Date.now(),
    retryCount: 0
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  checkIntegrity,
  gracefulRename
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXRpbC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjcmVhdGVSZWFkU3RyZWFtIH0gZnJvbSAnZnMnO1xuaW1wb3J0IHsgcmVuYW1lIH0gZnJvbSAnZnMvcHJvbWlzZXMnO1xuaW1wb3J0IHsgcGlwZWxpbmUgfSBmcm9tICdzdHJlYW0vcHJvbWlzZXMnO1xuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XG5cbmltcG9ydCAqIGFzIEVycm9ycyBmcm9tICcuLi90eXBlcy9lcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgKiBhcyBkdXJhdGlvbnMgZnJvbSAnLi4vdXRpbC9kdXJhdGlvbnMnO1xuaW1wb3J0IHsgaXNPbGRlclRoYW4gfSBmcm9tICcuLi91dGlsL3RpbWVzdGFtcCc7XG5pbXBvcnQgeyBzbGVlcCB9IGZyb20gJy4uL3V0aWwvc2xlZXAnO1xuXG5leHBvcnQgdHlwZSBDaGVja0ludGVncml0eVJlc3VsdFR5cGUgPSBSZWFkb25seTxcbiAgfCB7XG4gICAgICBvazogdHJ1ZTtcbiAgICAgIGVycm9yPzogdm9pZDtcbiAgICB9XG4gIHwge1xuICAgICAgb2s6IGZhbHNlO1xuICAgICAgZXJyb3I6IHN0cmluZztcbiAgICB9XG4+O1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2hlY2tJbnRlZ3JpdHkoXG4gIGZpbGVOYW1lOiBzdHJpbmcsXG4gIHNoYTUxMjogc3RyaW5nXG4pOiBQcm9taXNlPENoZWNrSW50ZWdyaXR5UmVzdWx0VHlwZT4ge1xuICB0cnkge1xuICAgIGNvbnN0IGhhc2ggPSBjcmVhdGVIYXNoKCdzaGE1MTInKTtcbiAgICBhd2FpdCBwaXBlbGluZShjcmVhdGVSZWFkU3RyZWFtKGZpbGVOYW1lKSwgaGFzaCk7XG5cbiAgICBjb25zdCBhY3R1YWxTSEE1MTIgPSBoYXNoLmRpZ2VzdCgnYmFzZTY0Jyk7XG4gICAgaWYgKHNoYTUxMiA9PT0gYWN0dWFsU0hBNTEyKSB7XG4gICAgICByZXR1cm4geyBvazogdHJ1ZSB9O1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICBvazogZmFsc2UsXG4gICAgICBlcnJvcjogYEludGVncml0eSBjaGVjayBmYWlsdXJlOiBleHBlY3RlZCAke3NoYTUxMn0sIGdvdCAke2FjdHVhbFNIQTUxMn1gLFxuICAgIH07XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIG9rOiBmYWxzZSxcbiAgICAgIGVycm9yOiBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpLFxuICAgIH07XG4gIH1cbn1cblxuYXN5bmMgZnVuY3Rpb24gZG9HcmFjZWZ1bFJlbmFtZSh7XG4gIGxvZ2dlcixcbiAgZnJvbVBhdGgsXG4gIHRvUGF0aCxcbiAgc3RhcnRlZEF0LFxuICByZXRyeUNvdW50LFxuICByZXRyeUFmdGVyID0gNSAqIGR1cmF0aW9ucy5TRUNPTkQsXG4gIHRpbWVvdXQgPSA1ICogZHVyYXRpb25zLk1JTlVURSxcbn06IHtcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlO1xuICBmcm9tUGF0aDogc3RyaW5nO1xuICB0b1BhdGg6IHN0cmluZztcbiAgc3RhcnRlZEF0OiBudW1iZXI7XG4gIHJldHJ5Q291bnQ6IG51bWJlcjtcbiAgcmV0cnlBZnRlcj86IG51bWJlcjtcbiAgdGltZW91dD86IG51bWJlcjtcbn0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgdHJ5IHtcbiAgICBhd2FpdCByZW5hbWUoZnJvbVBhdGgsIHRvUGF0aCk7XG5cbiAgICBpZiAocmV0cnlDb3VudCAhPT0gMCkge1xuICAgICAgbG9nZ2VyLmluZm8oXG4gICAgICAgIGBncmFjZWZ1bFJlbmFtZTogc3VjY2VlZGVkIGFmdGVyICR7cmV0cnlDb3VudH0gcmV0cmllcywgcmVuYW1lZCBgICtcbiAgICAgICAgICBgJHtmcm9tUGF0aH0gdG8gJHt0b1BhdGh9YFxuICAgICAgKTtcbiAgICB9XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgaWYgKGVycm9yLmNvZGUgIT09ICdFQUNDRVNTJyAmJiBlcnJvci5jb2RlICE9PSAnRVBFUk0nKSB7XG4gICAgICB0aHJvdyBlcnJvcjtcbiAgICB9XG5cbiAgICBpZiAoaXNPbGRlclRoYW4oc3RhcnRlZEF0LCB0aW1lb3V0KSkge1xuICAgICAgbG9nZ2VyLndhcm4oXG4gICAgICAgICdncmFjZWZ1bFJlbmFtZTogdGltZWQgb3V0IHdoaWxlIHJldHJ5aW5nIHJlbmFtaW5nICcgK1xuICAgICAgICAgIGAke2Zyb21QYXRofSB0byAke3RvUGF0aH1gXG4gICAgICApO1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgbG9nZ2VyLndhcm4oXG4gICAgICBgZ3JhY2VmdWxSZW5hbWU6IGdvdCAke2Vycm9yLmNvZGV9IHdoZW4gcmVuYW1pbmcgYCArXG4gICAgICAgIGAke2Zyb21QYXRofSB0byAke3RvUGF0aH0sIHJldHJ5aW5nIGluIG9uZSBzZWNvbmQuIGAgK1xuICAgICAgICBgKHJldHJ5Q291bnQ9JHtyZXRyeUNvdW50fSlgXG4gICAgKTtcblxuICAgIGF3YWl0IHNsZWVwKHJldHJ5QWZ0ZXIpO1xuXG4gICAgcmV0dXJuIGRvR3JhY2VmdWxSZW5hbWUoe1xuICAgICAgbG9nZ2VyLFxuICAgICAgZnJvbVBhdGgsXG4gICAgICB0b1BhdGgsXG4gICAgICBzdGFydGVkQXQsXG4gICAgICByZXRyeUNvdW50OiByZXRyeUNvdW50ICsgMSxcbiAgICAgIHJldHJ5QWZ0ZXIsXG4gICAgICB0aW1lb3V0LFxuICAgIH0pO1xuICB9XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBncmFjZWZ1bFJlbmFtZShcbiAgbG9nZ2VyOiBMb2dnZXJUeXBlLFxuICBmcm9tUGF0aDogc3RyaW5nLFxuICB0b1BhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBkb0dyYWNlZnVsUmVuYW1lKHtcbiAgICBsb2dnZXIsXG4gICAgZnJvbVBhdGgsXG4gICAgdG9QYXRoLFxuICAgIHN0YXJ0ZWRBdDogRGF0ZS5ub3coKSxcbiAgICByZXRyeUNvdW50OiAwLFxuICB9KTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGdCQUFpQztBQUNqQyxzQkFBdUI7QUFDdkIsdUJBQXlCO0FBQ3pCLG9CQUEyQjtBQUUzQixhQUF3QjtBQUV4QixnQkFBMkI7QUFDM0IsdUJBQTRCO0FBQzVCLG1CQUFzQjtBQWF0Qiw4QkFDRSxVQUNBLFFBQ21DO0FBQ25DLE1BQUk7QUFDRixVQUFNLE9BQU8sOEJBQVcsUUFBUTtBQUNoQyxVQUFNLCtCQUFTLGdDQUFpQixRQUFRLEdBQUcsSUFBSTtBQUUvQyxVQUFNLGVBQWUsS0FBSyxPQUFPLFFBQVE7QUFDekMsUUFBSSxXQUFXLGNBQWM7QUFDM0IsYUFBTyxFQUFFLElBQUksS0FBSztBQUFBLElBQ3BCO0FBRUEsV0FBTztBQUFBLE1BQ0wsSUFBSTtBQUFBLE1BQ0osT0FBTyxxQ0FBcUMsZUFBZTtBQUFBLElBQzdEO0FBQUEsRUFDRixTQUFTLE9BQVA7QUFDQSxXQUFPO0FBQUEsTUFDTCxJQUFJO0FBQUEsTUFDSixPQUFPLE9BQU8sWUFBWSxLQUFLO0FBQUEsSUFDakM7QUFBQSxFQUNGO0FBQ0Y7QUF2QnNCLEFBeUJ0QixnQ0FBZ0M7QUFBQSxFQUM5QjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBLGFBQWEsSUFBSSxVQUFVO0FBQUEsRUFDM0IsVUFBVSxJQUFJLFVBQVU7QUFBQSxHQVNSO0FBQ2hCLE1BQUk7QUFDRixVQUFNLDRCQUFPLFVBQVUsTUFBTTtBQUU3QixRQUFJLGVBQWUsR0FBRztBQUNwQixhQUFPLEtBQ0wsbUNBQW1DLCtCQUM5QixlQUFlLFFBQ3RCO0FBQUEsSUFDRjtBQUFBLEVBQ0YsU0FBUyxPQUFQO0FBQ0EsUUFBSSxNQUFNLFNBQVMsYUFBYSxNQUFNLFNBQVMsU0FBUztBQUN0RCxZQUFNO0FBQUEsSUFDUjtBQUVBLFFBQUksa0NBQVksV0FBVyxPQUFPLEdBQUc7QUFDbkMsYUFBTyxLQUNMLHFEQUNLLGVBQWUsUUFDdEI7QUFDQSxZQUFNO0FBQUEsSUFDUjtBQUVBLFdBQU8sS0FDTCx1QkFBdUIsTUFBTSxzQkFDeEIsZUFBZSwrQ0FDSCxhQUNuQjtBQUVBLFVBQU0sd0JBQU0sVUFBVTtBQUV0QixXQUFPLGlCQUFpQjtBQUFBLE1BQ3RCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQSxZQUFZLGFBQWE7QUFBQSxNQUN6QjtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxFQUNIO0FBQ0Y7QUF6RGUsQUEyRGYsOEJBQ0UsUUFDQSxVQUNBLFFBQ2U7QUFDZixTQUFPLGlCQUFpQjtBQUFBLElBQ3RCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFdBQVcsS0FBSyxJQUFJO0FBQUEsSUFDcEIsWUFBWTtBQUFBLEVBQ2QsQ0FBQztBQUNIO0FBWnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
