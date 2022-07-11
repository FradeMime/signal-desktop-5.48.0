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
var updateIpc_exports = {};
__export(updateIpc_exports, {
  startUpdate: () => startUpdate
});
module.exports = __toCommonJS(updateIpc_exports);
var import_electron = require("electron");
function startUpdate() {
  return import_electron.ipcRenderer.invoke("start-update");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  startUpdate
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXBkYXRlSXBjLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuXG5leHBvcnQgZnVuY3Rpb24gc3RhcnRVcGRhdGUoKTogUHJvbWlzZTx2b2lkPiB7XG4gIHJldHVybiBpcGNSZW5kZXJlci5pbnZva2UoJ3N0YXJ0LXVwZGF0ZScpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHNCQUE0QjtBQUVyQix1QkFBc0M7QUFDM0MsU0FBTyw0QkFBWSxPQUFPLGNBQWM7QUFDMUM7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
