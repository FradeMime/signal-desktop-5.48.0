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
var waitForSettingsChange_exports = {};
__export(waitForSettingsChange_exports, {
  waitForSettingsChange: () => waitForSettingsChange
});
module.exports = __toCommonJS(waitForSettingsChange_exports);
var import_electron = require("electron");
var import_explodePromise = require("../util/explodePromise");
let preferencesChangeResolvers = new Array();
import_electron.ipcRenderer.on("preferences-changed", (_event) => {
  const resolvers = preferencesChangeResolvers;
  preferencesChangeResolvers = [];
  for (const resolve of resolvers) {
    resolve();
  }
});
function waitForSettingsChange() {
  const { promise, resolve } = (0, import_explodePromise.explodePromise)();
  preferencesChangeResolvers.push(resolve);
  return promise;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  waitForSettingsChange
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2FpdEZvclNldHRpbmdzQ2hhbmdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlwY1JlbmRlcmVyIGFzIGlwYyB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHsgZXhwbG9kZVByb21pc2UgfSBmcm9tICcuLi91dGlsL2V4cGxvZGVQcm9taXNlJztcblxubGV0IHByZWZlcmVuY2VzQ2hhbmdlUmVzb2x2ZXJzID0gbmV3IEFycmF5PCgpID0+IHZvaWQ+KCk7XG5cbmlwYy5vbigncHJlZmVyZW5jZXMtY2hhbmdlZCcsIF9ldmVudCA9PiB7XG4gIGNvbnN0IHJlc29sdmVycyA9IHByZWZlcmVuY2VzQ2hhbmdlUmVzb2x2ZXJzO1xuICBwcmVmZXJlbmNlc0NoYW5nZVJlc29sdmVycyA9IFtdO1xuXG4gIGZvciAoY29uc3QgcmVzb2x2ZSBvZiByZXNvbHZlcnMpIHtcbiAgICByZXNvbHZlKCk7XG4gIH1cbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gd2FpdEZvclNldHRpbmdzQ2hhbmdlKCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCB7IHByb21pc2UsIHJlc29sdmUgfSA9IGV4cGxvZGVQcm9taXNlPHZvaWQ+KCk7XG5cbiAgcHJlZmVyZW5jZXNDaGFuZ2VSZXNvbHZlcnMucHVzaChyZXNvbHZlKTtcblxuICByZXR1cm4gcHJvbWlzZTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBbUM7QUFFbkMsNEJBQStCO0FBRS9CLElBQUksNkJBQTZCLElBQUksTUFBa0I7QUFFdkQsNEJBQUksR0FBRyx1QkFBdUIsWUFBVTtBQUN0QyxRQUFNLFlBQVk7QUFDbEIsK0JBQTZCLENBQUM7QUFFOUIsYUFBVyxXQUFXLFdBQVc7QUFDL0IsWUFBUTtBQUFBLEVBQ1Y7QUFDRixDQUFDO0FBRU0saUNBQWdEO0FBQ3JELFFBQU0sRUFBRSxTQUFTLFlBQVksMENBQXFCO0FBRWxELDZCQUEyQixLQUFLLE9BQU87QUFFdkMsU0FBTztBQUNUO0FBTmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
