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
var deleteAllLogs_exports = {};
__export(deleteAllLogs_exports, {
  deleteAllLogs: () => deleteAllLogs
});
module.exports = __toCommonJS(deleteAllLogs_exports);
var import_electron = require("electron");
var import_p_timeout = __toESM(require("p-timeout"));
var import_set_up_renderer_logging = require("../logging/set_up_renderer_logging");
var durations = __toESM(require("./durations"));
function deleteAllLogs() {
  (0, import_set_up_renderer_logging.beforeRestart)();
  return (0, import_p_timeout.default)(import_electron.ipcRenderer.invoke("delete-all-logs"), 5 * durations.SECOND);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  deleteAllLogs
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGVsZXRlQWxsTG9ncy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHBUaW1lb3V0IGZyb20gJ3AtdGltZW91dCc7XG5cbmltcG9ydCB7IGJlZm9yZVJlc3RhcnQgfSBmcm9tICcuLi9sb2dnaW5nL3NldF91cF9yZW5kZXJlcl9sb2dnaW5nJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuL2R1cmF0aW9ucyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBkZWxldGVBbGxMb2dzKCk6IFByb21pc2U8dm9pZD4ge1xuICAvLyBSZXN0YXJ0IGxvZ2dpbmcgYWdhaW4gd2hlbiB0aGUgZmlsZSBzdHJlYW0gY2xvc2VcbiAgYmVmb3JlUmVzdGFydCgpO1xuXG4gIHJldHVybiBwVGltZW91dChpcGNSZW5kZXJlci5pbnZva2UoJ2RlbGV0ZS1hbGwtbG9ncycpLCA1ICogZHVyYXRpb25zLlNFQ09ORCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQTRCO0FBQzVCLHVCQUFxQjtBQUVyQixxQ0FBOEI7QUFDOUIsZ0JBQTJCO0FBRXBCLHlCQUF3QztBQUU3QyxvREFBYztBQUVkLFNBQU8sOEJBQVMsNEJBQVksT0FBTyxpQkFBaUIsR0FBRyxJQUFJLFVBQVUsTUFBTTtBQUM3RTtBQUxnQiIsCiAgIm5hbWVzIjogW10KfQo=
