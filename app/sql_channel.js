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
var sql_channel_exports = {};
__export(sql_channel_exports, {
  initialize: () => initialize
});
module.exports = __toCommonJS(sql_channel_exports);
var import_electron = require("electron");
var import_user_config = require("./user_config");
var import_ephemeral_config = require("./ephemeral_config");
let sql;
let initialized = false;
const SQL_CHANNEL_KEY = "sql-channel";
const ERASE_SQL_KEY = "erase-sql-key";
function initialize(mainSQL) {
  if (initialized) {
    throw new Error("sqlChannels: already initialized!");
  }
  initialized = true;
  sql = mainSQL;
  import_electron.ipcMain.on(SQL_CHANNEL_KEY, async (event, jobId, callName, ...args) => {
    try {
      if (!sql) {
        throw new Error(`${SQL_CHANNEL_KEY}: Not yet initialized!`);
      }
      const result = await sql.sqlCall(callName, args);
      event.sender.send(`${SQL_CHANNEL_KEY}-done`, jobId, null, result);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`sql channel error with call ${callName}: ${errorForDisplay}`);
      if (!event.sender.isDestroyed()) {
        event.sender.send(`${SQL_CHANNEL_KEY}-done`, jobId, errorForDisplay);
      }
    }
  });
  import_electron.ipcMain.on(ERASE_SQL_KEY, async (event) => {
    try {
      (0, import_user_config.remove)();
      (0, import_ephemeral_config.remove)();
      event.sender.send(`${ERASE_SQL_KEY}-done`);
    } catch (error) {
      const errorForDisplay = error && error.stack ? error.stack : error;
      console.log(`sql-erase error: ${errorForDisplay}`);
      event.sender.send(`${ERASE_SQL_KEY}-done`, error);
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  initialize
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic3FsX2NoYW5uZWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpcGNNYWluIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgeyByZW1vdmUgYXMgcmVtb3ZlVXNlckNvbmZpZyB9IGZyb20gJy4vdXNlcl9jb25maWcnO1xuaW1wb3J0IHsgcmVtb3ZlIGFzIHJlbW92ZUVwaGVtZXJhbENvbmZpZyB9IGZyb20gJy4vZXBoZW1lcmFsX2NvbmZpZyc7XG5cbnR5cGUgU1FMVHlwZSA9IHtcbiAgc3FsQ2FsbChjYWxsTmFtZTogc3RyaW5nLCBhcmdzOiBSZWFkb25seUFycmF5PHVua25vd24+KTogdW5rbm93bjtcbn07XG5cbmxldCBzcWw6IFNRTFR5cGUgfCB1bmRlZmluZWQ7XG5cbmxldCBpbml0aWFsaXplZCA9IGZhbHNlO1xuXG5jb25zdCBTUUxfQ0hBTk5FTF9LRVkgPSAnc3FsLWNoYW5uZWwnO1xuY29uc3QgRVJBU0VfU1FMX0tFWSA9ICdlcmFzZS1zcWwta2V5JztcblxuZXhwb3J0IGZ1bmN0aW9uIGluaXRpYWxpemUobWFpblNRTDogU1FMVHlwZSk6IHZvaWQge1xuICBpZiAoaW5pdGlhbGl6ZWQpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3NxbENoYW5uZWxzOiBhbHJlYWR5IGluaXRpYWxpemVkIScpO1xuICB9XG4gIGluaXRpYWxpemVkID0gdHJ1ZTtcblxuICBzcWwgPSBtYWluU1FMO1xuXG4gIGlwY01haW4ub24oU1FMX0NIQU5ORUxfS0VZLCBhc3luYyAoZXZlbnQsIGpvYklkLCBjYWxsTmFtZSwgLi4uYXJncykgPT4ge1xuICAgIHRyeSB7XG4gICAgICBpZiAoIXNxbCkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYCR7U1FMX0NIQU5ORUxfS0VZfTogTm90IHlldCBpbml0aWFsaXplZCFgKTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHNxbC5zcWxDYWxsKGNhbGxOYW1lLCBhcmdzKTtcbiAgICAgIGV2ZW50LnNlbmRlci5zZW5kKGAke1NRTF9DSEFOTkVMX0tFWX0tZG9uZWAsIGpvYklkLCBudWxsLCByZXN1bHQpO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICBjb25zdCBlcnJvckZvckRpc3BsYXkgPSBlcnJvciAmJiBlcnJvci5zdGFjayA/IGVycm9yLnN0YWNrIDogZXJyb3I7XG4gICAgICBjb25zb2xlLmxvZyhcbiAgICAgICAgYHNxbCBjaGFubmVsIGVycm9yIHdpdGggY2FsbCAke2NhbGxOYW1lfTogJHtlcnJvckZvckRpc3BsYXl9YFxuICAgICAgKTtcbiAgICAgIGlmICghZXZlbnQuc2VuZGVyLmlzRGVzdHJveWVkKCkpIHtcbiAgICAgICAgZXZlbnQuc2VuZGVyLnNlbmQoYCR7U1FMX0NIQU5ORUxfS0VZfS1kb25lYCwgam9iSWQsIGVycm9yRm9yRGlzcGxheSk7XG4gICAgICB9XG4gICAgfVxuICB9KTtcblxuICBpcGNNYWluLm9uKEVSQVNFX1NRTF9LRVksIGFzeW5jIGV2ZW50ID0+IHtcbiAgICB0cnkge1xuICAgICAgcmVtb3ZlVXNlckNvbmZpZygpO1xuICAgICAgcmVtb3ZlRXBoZW1lcmFsQ29uZmlnKCk7XG4gICAgICBldmVudC5zZW5kZXIuc2VuZChgJHtFUkFTRV9TUUxfS0VZfS1kb25lYCk7XG4gICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgIGNvbnN0IGVycm9yRm9yRGlzcGxheSA9IGVycm9yICYmIGVycm9yLnN0YWNrID8gZXJyb3Iuc3RhY2sgOiBlcnJvcjtcbiAgICAgIGNvbnNvbGUubG9nKGBzcWwtZXJhc2UgZXJyb3I6ICR7ZXJyb3JGb3JEaXNwbGF5fWApO1xuICAgICAgZXZlbnQuc2VuZGVyLnNlbmQoYCR7RVJBU0VfU1FMX0tFWX0tZG9uZWAsIGVycm9yKTtcbiAgICB9XG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUF3QjtBQUV4Qix5QkFBMkM7QUFDM0MsOEJBQWdEO0FBTWhELElBQUk7QUFFSixJQUFJLGNBQWM7QUFFbEIsTUFBTSxrQkFBa0I7QUFDeEIsTUFBTSxnQkFBZ0I7QUFFZixvQkFBb0IsU0FBd0I7QUFDakQsTUFBSSxhQUFhO0FBQ2YsVUFBTSxJQUFJLE1BQU0sbUNBQW1DO0FBQUEsRUFDckQ7QUFDQSxnQkFBYztBQUVkLFFBQU07QUFFTiwwQkFBUSxHQUFHLGlCQUFpQixPQUFPLE9BQU8sT0FBTyxhQUFhLFNBQVM7QUFDckUsUUFBSTtBQUNGLFVBQUksQ0FBQyxLQUFLO0FBQ1IsY0FBTSxJQUFJLE1BQU0sR0FBRyx1Q0FBdUM7QUFBQSxNQUM1RDtBQUNBLFlBQU0sU0FBUyxNQUFNLElBQUksUUFBUSxVQUFVLElBQUk7QUFDL0MsWUFBTSxPQUFPLEtBQUssR0FBRyx3QkFBd0IsT0FBTyxNQUFNLE1BQU07QUFBQSxJQUNsRSxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUNOLCtCQUErQixhQUFhLGlCQUM5QztBQUNBLFVBQUksQ0FBQyxNQUFNLE9BQU8sWUFBWSxHQUFHO0FBQy9CLGNBQU0sT0FBTyxLQUFLLEdBQUcsd0JBQXdCLE9BQU8sZUFBZTtBQUFBLE1BQ3JFO0FBQUEsSUFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELDBCQUFRLEdBQUcsZUFBZSxPQUFNLFVBQVM7QUFDdkMsUUFBSTtBQUNGLHFDQUFpQjtBQUNqQiwwQ0FBc0I7QUFDdEIsWUFBTSxPQUFPLEtBQUssR0FBRyxvQkFBb0I7QUFBQSxJQUMzQyxTQUFTLE9BQVA7QUFDQSxZQUFNLGtCQUFrQixTQUFTLE1BQU0sUUFBUSxNQUFNLFFBQVE7QUFDN0QsY0FBUSxJQUFJLG9CQUFvQixpQkFBaUI7QUFDakQsWUFBTSxPQUFPLEtBQUssR0FBRyxzQkFBc0IsS0FBSztBQUFBLElBQ2xEO0FBQUEsRUFDRixDQUFDO0FBQ0g7QUFyQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
