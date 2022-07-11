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
var updater_exports = {};
__export(updater_exports, {
  force: () => force,
  start: () => start
});
module.exports = __toCommonJS(updater_exports);
var import_config = __toESM(require("config"));
var import_macos = require("./macos");
var import_windows = require("./windows");
let initialized = false;
let updater;
async function start(settingsChannel, logger, getMainWindow) {
  const { platform } = process;
  if (initialized) {
    throw new Error("updater/start: Updates have already been initialized!");
  }
  initialized = true;
  if (!logger) {
    throw new Error("updater/start: Must provide logger!");
  }
  if (autoUpdateDisabled()) {
    logger.info("updater/start: Updates disabled - not starting new version checks");
    return;
  }
  if (platform === "win32") {
    updater = new import_windows.WindowsUpdater(logger, settingsChannel, getMainWindow);
  } else if (platform === "darwin") {
    updater = new import_macos.MacOSUpdater(logger, settingsChannel, getMainWindow);
  } else {
    throw new Error("updater/start: Unsupported platform");
  }
  await updater.start();
}
async function force() {
  if (!initialized) {
    throw new Error("updater/force: Updates haven't been initialized!");
  }
  if (updater) {
    await updater.force();
  }
}
function autoUpdateDisabled() {
  return process.platform === "linux" || process.mas || !import_config.default.get("updatesEnabled");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  force,
  start
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW5kZXgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgY29uZmlnIGZyb20gJ2NvbmZpZyc7XG5pbXBvcnQgdHlwZSB7IEJyb3dzZXJXaW5kb3cgfSBmcm9tICdlbGVjdHJvbic7XG5cbmltcG9ydCB0eXBlIHsgVXBkYXRlciB9IGZyb20gJy4vY29tbW9uJztcbmltcG9ydCB7IE1hY09TVXBkYXRlciB9IGZyb20gJy4vbWFjb3MnO1xuaW1wb3J0IHsgV2luZG93c1VwZGF0ZXIgfSBmcm9tICcuL3dpbmRvd3MnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvTG9nZ2luZyc7XG5pbXBvcnQgdHlwZSB7IFNldHRpbmdzQ2hhbm5lbCB9IGZyb20gJy4uL21haW4vc2V0dGluZ3NDaGFubmVsJztcblxubGV0IGluaXRpYWxpemVkID0gZmFsc2U7XG5cbmxldCB1cGRhdGVyOiBVcGRhdGVyIHwgdW5kZWZpbmVkO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gc3RhcnQoXG4gIHNldHRpbmdzQ2hhbm5lbDogU2V0dGluZ3NDaGFubmVsLFxuICBsb2dnZXI6IExvZ2dlclR5cGUsXG4gIGdldE1haW5XaW5kb3c6ICgpID0+IEJyb3dzZXJXaW5kb3cgfCB1bmRlZmluZWRcbik6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IHBsYXRmb3JtIH0gPSBwcm9jZXNzO1xuXG4gIGlmIChpbml0aWFsaXplZCkge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlci9zdGFydDogVXBkYXRlcyBoYXZlIGFscmVhZHkgYmVlbiBpbml0aWFsaXplZCEnKTtcbiAgfVxuICBpbml0aWFsaXplZCA9IHRydWU7XG5cbiAgaWYgKCFsb2dnZXIpIHtcbiAgICB0aHJvdyBuZXcgRXJyb3IoJ3VwZGF0ZXIvc3RhcnQ6IE11c3QgcHJvdmlkZSBsb2dnZXIhJyk7XG4gIH1cblxuICBpZiAoYXV0b1VwZGF0ZURpc2FibGVkKCkpIHtcbiAgICBsb2dnZXIuaW5mbyhcbiAgICAgICd1cGRhdGVyL3N0YXJ0OiBVcGRhdGVzIGRpc2FibGVkIC0gbm90IHN0YXJ0aW5nIG5ldyB2ZXJzaW9uIGNoZWNrcydcbiAgICApO1xuXG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHBsYXRmb3JtID09PSAnd2luMzInKSB7XG4gICAgdXBkYXRlciA9IG5ldyBXaW5kb3dzVXBkYXRlcihsb2dnZXIsIHNldHRpbmdzQ2hhbm5lbCwgZ2V0TWFpbldpbmRvdyk7XG4gIH0gZWxzZSBpZiAocGxhdGZvcm0gPT09ICdkYXJ3aW4nKSB7XG4gICAgdXBkYXRlciA9IG5ldyBNYWNPU1VwZGF0ZXIobG9nZ2VyLCBzZXR0aW5nc0NoYW5uZWwsIGdldE1haW5XaW5kb3cpO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcigndXBkYXRlci9zdGFydDogVW5zdXBwb3J0ZWQgcGxhdGZvcm0nKTtcbiAgfVxuXG4gIGF3YWl0IHVwZGF0ZXIuc3RhcnQoKTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGZvcmNlKCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIWluaXRpYWxpemVkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwidXBkYXRlci9mb3JjZTogVXBkYXRlcyBoYXZlbid0IGJlZW4gaW5pdGlhbGl6ZWQhXCIpO1xuICB9XG5cbiAgaWYgKHVwZGF0ZXIpIHtcbiAgICBhd2FpdCB1cGRhdGVyLmZvcmNlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gYXV0b1VwZGF0ZURpc2FibGVkKCkge1xuICByZXR1cm4gKFxuICAgIHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcgfHwgcHJvY2Vzcy5tYXMgfHwgIWNvbmZpZy5nZXQoJ3VwZGF0ZXNFbmFibGVkJylcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUFtQjtBQUluQixtQkFBNkI7QUFDN0IscUJBQStCO0FBSS9CLElBQUksY0FBYztBQUVsQixJQUFJO0FBRUoscUJBQ0UsaUJBQ0EsUUFDQSxlQUNlO0FBQ2YsUUFBTSxFQUFFLGFBQWE7QUFFckIsTUFBSSxhQUFhO0FBQ2YsVUFBTSxJQUFJLE1BQU0sdURBQXVEO0FBQUEsRUFDekU7QUFDQSxnQkFBYztBQUVkLE1BQUksQ0FBQyxRQUFRO0FBQ1gsVUFBTSxJQUFJLE1BQU0scUNBQXFDO0FBQUEsRUFDdkQ7QUFFQSxNQUFJLG1CQUFtQixHQUFHO0FBQ3hCLFdBQU8sS0FDTCxtRUFDRjtBQUVBO0FBQUEsRUFDRjtBQUVBLE1BQUksYUFBYSxTQUFTO0FBQ3hCLGNBQVUsSUFBSSw4QkFBZSxRQUFRLGlCQUFpQixhQUFhO0FBQUEsRUFDckUsV0FBVyxhQUFhLFVBQVU7QUFDaEMsY0FBVSxJQUFJLDBCQUFhLFFBQVEsaUJBQWlCLGFBQWE7QUFBQSxFQUNuRSxPQUFPO0FBQ0wsVUFBTSxJQUFJLE1BQU0scUNBQXFDO0FBQUEsRUFDdkQ7QUFFQSxRQUFNLFFBQVEsTUFBTTtBQUN0QjtBQWpDc0IsQUFtQ3RCLHVCQUE2QztBQUMzQyxNQUFJLENBQUMsYUFBYTtBQUNoQixVQUFNLElBQUksTUFBTSxrREFBa0Q7QUFBQSxFQUNwRTtBQUVBLE1BQUksU0FBUztBQUNYLFVBQU0sUUFBUSxNQUFNO0FBQUEsRUFDdEI7QUFDRjtBQVJzQixBQVV0Qiw4QkFBOEI7QUFDNUIsU0FDRSxRQUFRLGFBQWEsV0FBVyxRQUFRLE9BQU8sQ0FBQyxzQkFBTyxJQUFJLGdCQUFnQjtBQUUvRTtBQUpTIiwKICAibmFtZXMiOiBbXQp9Cg==
