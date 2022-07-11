var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
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
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var ephemeral_config_exports = {};
__export(ephemeral_config_exports, {
  ephemeralConfig: () => ephemeralConfig,
  get: () => get,
  remove: () => remove,
  set: () => set
});
module.exports = __toCommonJS(ephemeral_config_exports);
var import_path = require("path");
var import_electron = require("electron");
var import_base_config = require("./base_config");
const userDataPath = import_electron.app.getPath("userData");
const targetPath = (0, import_path.join)(userDataPath, "ephemeral.json");
const ephemeralConfig = (0, import_base_config.start)({
  name: "ephemeral",
  targetPath,
  throwOnFilesystemErrors: false
});
const get = ephemeralConfig.get.bind(ephemeralConfig);
const remove = ephemeralConfig.remove.bind(ephemeralConfig);
const set = ephemeralConfig.set.bind(ephemeralConfig);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ephemeralConfig,
  get,
  remove,
  set
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXBoZW1lcmFsX2NvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGpvaW4gfSBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgYXBwIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5pbXBvcnQgeyBzdGFydCB9IGZyb20gJy4vYmFzZV9jb25maWcnO1xuXG5jb25zdCB1c2VyRGF0YVBhdGggPSBhcHAuZ2V0UGF0aCgndXNlckRhdGEnKTtcbmNvbnN0IHRhcmdldFBhdGggPSBqb2luKHVzZXJEYXRhUGF0aCwgJ2VwaGVtZXJhbC5qc29uJyk7XG5cbmV4cG9ydCBjb25zdCBlcGhlbWVyYWxDb25maWcgPSBzdGFydCh7XG4gIG5hbWU6ICdlcGhlbWVyYWwnLFxuICB0YXJnZXRQYXRoLFxuICB0aHJvd09uRmlsZXN5c3RlbUVycm9yczogZmFsc2UsXG59KTtcblxuZXhwb3J0IGNvbnN0IGdldCA9IGVwaGVtZXJhbENvbmZpZy5nZXQuYmluZChlcGhlbWVyYWxDb25maWcpO1xuZXhwb3J0IGNvbnN0IHJlbW92ZSA9IGVwaGVtZXJhbENvbmZpZy5yZW1vdmUuYmluZChlcGhlbWVyYWxDb25maWcpO1xuZXhwb3J0IGNvbnN0IHNldCA9IGVwaGVtZXJhbENvbmZpZy5zZXQuYmluZChlcGhlbWVyYWxDb25maWcpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQXFCO0FBRXJCLHNCQUFvQjtBQUVwQix5QkFBc0I7QUFFdEIsTUFBTSxlQUFlLG9CQUFJLFFBQVEsVUFBVTtBQUMzQyxNQUFNLGFBQWEsc0JBQUssY0FBYyxnQkFBZ0I7QUFFL0MsTUFBTSxrQkFBa0IsOEJBQU07QUFBQSxFQUNuQyxNQUFNO0FBQUEsRUFDTjtBQUFBLEVBQ0EseUJBQXlCO0FBQzNCLENBQUM7QUFFTSxNQUFNLE1BQU0sZ0JBQWdCLElBQUksS0FBSyxlQUFlO0FBQ3BELE1BQU0sU0FBUyxnQkFBZ0IsT0FBTyxLQUFLLGVBQWU7QUFDMUQsTUFBTSxNQUFNLGdCQUFnQixJQUFJLEtBQUssZUFBZTsiLAogICJuYW1lcyI6IFtdCn0K
