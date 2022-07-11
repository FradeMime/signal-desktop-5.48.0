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
var RemoteConfigStub_exports = {};
__export(RemoteConfigStub_exports, {
  updateRemoteConfig: () => updateRemoteConfig
});
module.exports = __toCommonJS(RemoteConfigStub_exports);
var import_RemoteConfig = require("../../RemoteConfig");
async function updateRemoteConfig(newConfig) {
  const fakeServer = {
    async getConfig() {
      return newConfig;
    }
  };
  await (0, import_RemoteConfig.refreshRemoteConfig)(fakeServer);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  updateRemoteConfig
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVtb3RlQ29uZmlnU3R1Yi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyByZWZyZXNoUmVtb3RlQ29uZmlnIH0gZnJvbSAnLi4vLi4vUmVtb3RlQ29uZmlnJztcbmltcG9ydCB0eXBlIHsgV2ViQVBJVHlwZSB9IGZyb20gJy4uLy4uL3RleHRzZWN1cmUvV2ViQVBJJztcbmltcG9ydCB0eXBlIHsgVW53cmFwUHJvbWlzZSB9IGZyb20gJy4uLy4uL3R5cGVzL1V0aWwnO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gdXBkYXRlUmVtb3RlQ29uZmlnKFxuICBuZXdDb25maWc6IFVud3JhcFByb21pc2U8UmV0dXJuVHlwZTxXZWJBUElUeXBlWydnZXRDb25maWcnXT4+XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgZmFrZVNlcnZlciA9IHtcbiAgICBhc3luYyBnZXRDb25maWcoKSB7XG4gICAgICByZXR1cm4gbmV3Q29uZmlnO1xuICAgIH0sXG4gIH0gYXMgUGFydGlhbDxXZWJBUElUeXBlPiBhcyB1bmtub3duIGFzIFdlYkFQSVR5cGU7XG5cbiAgYXdhaXQgcmVmcmVzaFJlbW90ZUNvbmZpZyhmYWtlU2VydmVyKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSwwQkFBb0M7QUFJcEMsa0NBQ0UsV0FDZTtBQUNmLFFBQU0sYUFBYTtBQUFBLFVBQ1gsWUFBWTtBQUNoQixhQUFPO0FBQUEsSUFDVDtBQUFBLEVBQ0Y7QUFFQSxRQUFNLDZDQUFvQixVQUFVO0FBQ3RDO0FBVnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
