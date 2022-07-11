var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var user_config_exports = {};
__export(user_config_exports, {
  get: () => get,
  remove: () => remove,
  set: () => set,
  userConfig: () => userConfig
});
module.exports = __toCommonJS(user_config_exports);
var import_path = require("path");
var import_fs = require("fs");
var import_electron = require("electron");
var import_base_config = require("./base_config");
var import_config = __toESM(require("./config"));
let userData;
if (import_config.default.has("storagePath")) {
  userData = String(import_config.default.get("storagePath"));
} else if (import_config.default.has("storageProfile")) {
  userData = (0, import_path.join)(import_electron.app.getPath("appData"), `Signal-${import_config.default.get("storageProfile")}`);
}
if (userData !== void 0) {
  try {
    (0, import_fs.mkdirSync)(userData, { recursive: true });
  } catch (error) {
    console.error("Failed to create userData", error?.stack || String(error));
  }
  import_electron.app.setPath("userData", userData);
}
console.log(`userData: ${import_electron.app.getPath("userData")}`);
const userDataPath = import_electron.app.getPath("userData");
const targetPath = (0, import_path.join)(userDataPath, "config.json");
const userConfig = (0, import_base_config.start)({
  name: "user",
  targetPath,
  throwOnFilesystemErrors: true
});
const get = userConfig.get.bind(userConfig);
const remove = userConfig.remove.bind(userConfig);
const set = userConfig.set.bind(userConfig);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  get,
  remove,
  set,
  userConfig
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlcl9jb25maWcudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE3LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBta2RpclN5bmMgfSBmcm9tICdmcyc7XG5pbXBvcnQgeyBhcHAgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB7IHN0YXJ0IH0gZnJvbSAnLi9iYXNlX2NvbmZpZyc7XG5pbXBvcnQgY29uZmlnIGZyb20gJy4vY29uZmlnJztcblxubGV0IHVzZXJEYXRhOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4vLyBVc2Ugc2VwYXJhdGUgZGF0YSBkaXJlY3RvcnkgZm9yIGJlbmNobWFya3MgJiBkZXZlbG9wbWVudFxuaWYgKGNvbmZpZy5oYXMoJ3N0b3JhZ2VQYXRoJykpIHtcbiAgdXNlckRhdGEgPSBTdHJpbmcoY29uZmlnLmdldCgnc3RvcmFnZVBhdGgnKSk7XG59IGVsc2UgaWYgKGNvbmZpZy5oYXMoJ3N0b3JhZ2VQcm9maWxlJykpIHtcbiAgdXNlckRhdGEgPSBqb2luKFxuICAgIGFwcC5nZXRQYXRoKCdhcHBEYXRhJyksXG4gICAgYFNpZ25hbC0ke2NvbmZpZy5nZXQoJ3N0b3JhZ2VQcm9maWxlJyl9YFxuICApO1xufVxuXG5pZiAodXNlckRhdGEgIT09IHVuZGVmaW5lZCkge1xuICB0cnkge1xuICAgIG1rZGlyU3luYyh1c2VyRGF0YSwgeyByZWN1cnNpdmU6IHRydWUgfSk7XG4gIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgY29uc29sZS5lcnJvcignRmFpbGVkIHRvIGNyZWF0ZSB1c2VyRGF0YScsIGVycm9yPy5zdGFjayB8fCBTdHJpbmcoZXJyb3IpKTtcbiAgfVxuXG4gIGFwcC5zZXRQYXRoKCd1c2VyRGF0YScsIHVzZXJEYXRhKTtcbn1cblxuY29uc29sZS5sb2coYHVzZXJEYXRhOiAke2FwcC5nZXRQYXRoKCd1c2VyRGF0YScpfWApO1xuXG5jb25zdCB1c2VyRGF0YVBhdGggPSBhcHAuZ2V0UGF0aCgndXNlckRhdGEnKTtcbmNvbnN0IHRhcmdldFBhdGggPSBqb2luKHVzZXJEYXRhUGF0aCwgJ2NvbmZpZy5qc29uJyk7XG5cbmV4cG9ydCBjb25zdCB1c2VyQ29uZmlnID0gc3RhcnQoe1xuICBuYW1lOiAndXNlcicsXG4gIHRhcmdldFBhdGgsXG4gIHRocm93T25GaWxlc3lzdGVtRXJyb3JzOiB0cnVlLFxufSk7XG5cbmV4cG9ydCBjb25zdCBnZXQgPSB1c2VyQ29uZmlnLmdldC5iaW5kKHVzZXJDb25maWcpO1xuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IHVzZXJDb25maWcucmVtb3ZlLmJpbmQodXNlckNvbmZpZyk7XG5leHBvcnQgY29uc3Qgc2V0ID0gdXNlckNvbmZpZy5zZXQuYmluZCh1c2VyQ29uZmlnKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFxQjtBQUNyQixnQkFBMEI7QUFDMUIsc0JBQW9CO0FBRXBCLHlCQUFzQjtBQUN0QixvQkFBbUI7QUFFbkIsSUFBSTtBQUVKLElBQUksc0JBQU8sSUFBSSxhQUFhLEdBQUc7QUFDN0IsYUFBVyxPQUFPLHNCQUFPLElBQUksYUFBYSxDQUFDO0FBQzdDLFdBQVcsc0JBQU8sSUFBSSxnQkFBZ0IsR0FBRztBQUN2QyxhQUFXLHNCQUNULG9CQUFJLFFBQVEsU0FBUyxHQUNyQixVQUFVLHNCQUFPLElBQUksZ0JBQWdCLEdBQ3ZDO0FBQ0Y7QUFFQSxJQUFJLGFBQWEsUUFBVztBQUMxQixNQUFJO0FBQ0YsNkJBQVUsVUFBVSxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQUEsRUFDekMsU0FBUyxPQUFQO0FBQ0EsWUFBUSxNQUFNLDZCQUE2QixPQUFPLFNBQVMsT0FBTyxLQUFLLENBQUM7QUFBQSxFQUMxRTtBQUVBLHNCQUFJLFFBQVEsWUFBWSxRQUFRO0FBQ2xDO0FBRUEsUUFBUSxJQUFJLGFBQWEsb0JBQUksUUFBUSxVQUFVLEdBQUc7QUFFbEQsTUFBTSxlQUFlLG9CQUFJLFFBQVEsVUFBVTtBQUMzQyxNQUFNLGFBQWEsc0JBQUssY0FBYyxhQUFhO0FBRTVDLE1BQU0sYUFBYSw4QkFBTTtBQUFBLEVBQzlCLE1BQU07QUFBQSxFQUNOO0FBQUEsRUFDQSx5QkFBeUI7QUFDM0IsQ0FBQztBQUVNLE1BQU0sTUFBTSxXQUFXLElBQUksS0FBSyxVQUFVO0FBQzFDLE1BQU0sU0FBUyxXQUFXLE9BQU8sS0FBSyxVQUFVO0FBQ2hELE1BQU0sTUFBTSxXQUFXLElBQUksS0FBSyxVQUFVOyIsCiAgIm5hbWVzIjogW10KfQo=
