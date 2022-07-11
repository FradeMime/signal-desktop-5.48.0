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
var after_all_artifact_build_exports = {};
__export(after_all_artifact_build_exports, {
  afterAllArtifactBuild: () => afterAllArtifactBuild
});
module.exports = __toCommonJS(after_all_artifact_build_exports);
var import_notarize_universal_dmg = require("./notarize-universal-dmg");
async function afterAllArtifactBuild(result) {
  await (0, import_notarize_universal_dmg.afterAllArtifactBuild)(result);
  return [];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterAllArtifactBuild
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWZ0ZXItYWxsLWFydGlmYWN0LWJ1aWxkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQnVpbGRSZXN1bHQgfSBmcm9tICdlbGVjdHJvbi1idWlsZGVyJztcbmltcG9ydCB7IGFmdGVyQWxsQXJ0aWZhY3RCdWlsZCBhcyBub3Rhcml6ZVVuaXZlcnNhbERNRyB9IGZyb20gJy4vbm90YXJpemUtdW5pdmVyc2FsLWRtZyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZnRlckFsbEFydGlmYWN0QnVpbGQoXG4gIHJlc3VsdDogQnVpbGRSZXN1bHRcbik6IFByb21pc2U8QXJyYXk8c3RyaW5nPj4ge1xuICBhd2FpdCBub3Rhcml6ZVVuaXZlcnNhbERNRyhyZXN1bHQpO1xuICByZXR1cm4gW107XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsb0NBQThEO0FBRTlELHFDQUNFLFFBQ3dCO0FBQ3hCLFFBQU0seURBQXFCLE1BQU07QUFDakMsU0FBTyxDQUFDO0FBQ1Y7QUFMc0IiLAogICJuYW1lcyI6IFtdCn0K
