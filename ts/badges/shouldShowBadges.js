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
var shouldShowBadges_exports = {};
__export(shouldShowBadges_exports, {
  shouldShowBadges: () => shouldShowBadges
});
module.exports = __toCommonJS(shouldShowBadges_exports);
var import_RemoteConfig = require("../RemoteConfig");
var import_environment = require("../environment");
var import_version = require("../util/version");
function shouldShowBadges() {
  if ((0, import_RemoteConfig.isEnabled)("desktop.showUserBadges2") || (0, import_RemoteConfig.isEnabled)("desktop.internalUser") || (0, import_environment.getEnvironment)() === import_environment.Environment.Staging || (0, import_environment.getEnvironment)() === import_environment.Environment.Development || Boolean(window.STORYBOOK_ENV)) {
    return true;
  }
  if ((0, import_RemoteConfig.isEnabled)("desktop.showUserBadges.beta") && (0, import_version.isBeta)(window.getVersion())) {
    return true;
  }
  return false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shouldShowBadges
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkU2hvd0JhZGdlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpc0VuYWJsZWQgfSBmcm9tICcuLi9SZW1vdGVDb25maWcnO1xuaW1wb3J0IHsgZ2V0RW52aXJvbm1lbnQsIEVudmlyb25tZW50IH0gZnJvbSAnLi4vZW52aXJvbm1lbnQnO1xuaW1wb3J0IHsgaXNCZXRhIH0gZnJvbSAnLi4vdXRpbC92ZXJzaW9uJztcblxuZXhwb3J0IGZ1bmN0aW9uIHNob3VsZFNob3dCYWRnZXMoKTogYm9vbGVhbiB7XG4gIGlmIChcbiAgICBpc0VuYWJsZWQoJ2Rlc2t0b3Auc2hvd1VzZXJCYWRnZXMyJykgfHxcbiAgICBpc0VuYWJsZWQoJ2Rlc2t0b3AuaW50ZXJuYWxVc2VyJykgfHxcbiAgICBnZXRFbnZpcm9ubWVudCgpID09PSBFbnZpcm9ubWVudC5TdGFnaW5nIHx8XG4gICAgZ2V0RW52aXJvbm1lbnQoKSA9PT0gRW52aXJvbm1lbnQuRGV2ZWxvcG1lbnQgfHxcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueVxuICAgIEJvb2xlYW4oKHdpbmRvdyBhcyBhbnkpLlNUT1JZQk9PS19FTlYpXG4gICkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG5cbiAgaWYgKGlzRW5hYmxlZCgnZGVza3RvcC5zaG93VXNlckJhZGdlcy5iZXRhJykgJiYgaXNCZXRhKHdpbmRvdy5nZXRWZXJzaW9uKCkpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsMEJBQTBCO0FBQzFCLHlCQUE0QztBQUM1QyxxQkFBdUI7QUFFaEIsNEJBQXFDO0FBQzFDLE1BQ0UsbUNBQVUseUJBQXlCLEtBQ25DLG1DQUFVLHNCQUFzQixLQUNoQyx1Q0FBZSxNQUFNLCtCQUFZLFdBQ2pDLHVDQUFlLE1BQU0sK0JBQVksZUFFakMsUUFBUyxPQUFlLGFBQWEsR0FDckM7QUFDQSxXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksbUNBQVUsNkJBQTZCLEtBQUssMkJBQU8sT0FBTyxXQUFXLENBQUMsR0FBRztBQUMzRSxXQUFPO0FBQUEsRUFDVDtBQUVBLFNBQU87QUFDVDtBQWpCZ0IiLAogICJuYW1lcyI6IFtdCn0K
