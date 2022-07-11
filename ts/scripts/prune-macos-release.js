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
var prune_macos_release_exports = {};
__export(prune_macos_release_exports, {
  afterPack: () => afterPack
});
module.exports = __toCommonJS(prune_macos_release_exports);
var import_promises = __toESM(require("fs/promises"));
var import_path = __toESM(require("path"));
var import_rimraf = __toESM(require("rimraf"));
async function afterPack({
  appOutDir,
  packager,
  electronPlatformName
}) {
  if (electronPlatformName !== "darwin") {
    return;
  }
  const { productFilename } = packager.appInfo;
  const frameworkDir = import_path.default.join(appOutDir, `${productFilename}.app`, "Contents", "Frameworks", "Electron Framework.framework");
  const versionsDir = import_path.default.join(frameworkDir, "Versions");
  const currentVersion = import_path.default.join(versionsDir, "Current");
  const subFolders = await import_promises.default.readdir(currentVersion);
  for (const folder of subFolders) {
    const sourcePath = import_path.default.join(currentVersion, folder);
    const targetPath = import_path.default.join(frameworkDir, folder);
    console.log("Replacing electron framework symlink with real folder", sourcePath);
    import_rimraf.default.sync(targetPath);
    await import_promises.default.rename(sourcePath, targetPath);
  }
  console.log("Removing duplicate electron framework", versionsDir);
  import_rimraf.default.sync(versionsDir);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterPack
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJ1bmUtbWFjb3MtcmVsZWFzZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBmcyBmcm9tICdmcy9wcm9taXNlcyc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCByaW1yYWYgZnJvbSAncmltcmFmJztcbmltcG9ydCB0eXBlIHsgQWZ0ZXJQYWNrQ29udGV4dCB9IGZyb20gJ2VsZWN0cm9uLWJ1aWxkZXInO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWZ0ZXJQYWNrKHtcbiAgYXBwT3V0RGlyLFxuICBwYWNrYWdlcixcbiAgZWxlY3Ryb25QbGF0Zm9ybU5hbWUsXG59OiBBZnRlclBhY2tDb250ZXh0KTogUHJvbWlzZTx2b2lkPiB7XG4gIGlmIChlbGVjdHJvblBsYXRmb3JtTmFtZSAhPT0gJ2RhcndpbicpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB7IHByb2R1Y3RGaWxlbmFtZSB9ID0gcGFja2FnZXIuYXBwSW5mbztcblxuICBjb25zdCBmcmFtZXdvcmtEaXIgPSBwYXRoLmpvaW4oXG4gICAgYXBwT3V0RGlyLFxuICAgIGAke3Byb2R1Y3RGaWxlbmFtZX0uYXBwYCxcbiAgICAnQ29udGVudHMnLFxuICAgICdGcmFtZXdvcmtzJyxcbiAgICAnRWxlY3Ryb24gRnJhbWV3b3JrLmZyYW1ld29yaydcbiAgKTtcblxuICBjb25zdCB2ZXJzaW9uc0RpciA9IHBhdGguam9pbihmcmFtZXdvcmtEaXIsICdWZXJzaW9ucycpO1xuICBjb25zdCBjdXJyZW50VmVyc2lvbiA9IHBhdGguam9pbih2ZXJzaW9uc0RpciwgJ0N1cnJlbnQnKTtcblxuICBjb25zdCBzdWJGb2xkZXJzID0gYXdhaXQgZnMucmVhZGRpcihjdXJyZW50VmVyc2lvbik7XG4gIGZvciAoY29uc3QgZm9sZGVyIG9mIHN1YkZvbGRlcnMpIHtcbiAgICBjb25zdCBzb3VyY2VQYXRoID0gcGF0aC5qb2luKGN1cnJlbnRWZXJzaW9uLCBmb2xkZXIpO1xuICAgIGNvbnN0IHRhcmdldFBhdGggPSBwYXRoLmpvaW4oZnJhbWV3b3JrRGlyLCBmb2xkZXIpO1xuXG4gICAgY29uc29sZS5sb2coXG4gICAgICAnUmVwbGFjaW5nIGVsZWN0cm9uIGZyYW1ld29yayBzeW1saW5rIHdpdGggcmVhbCBmb2xkZXInLFxuICAgICAgc291cmNlUGF0aFxuICAgICk7XG4gICAgcmltcmFmLnN5bmModGFyZ2V0UGF0aCk7XG5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgIGF3YWl0IGZzLnJlbmFtZShzb3VyY2VQYXRoLCB0YXJnZXRQYXRoKTtcbiAgfVxuXG4gIGNvbnNvbGUubG9nKCdSZW1vdmluZyBkdXBsaWNhdGUgZWxlY3Ryb24gZnJhbWV3b3JrJywgdmVyc2lvbnNEaXIpO1xuICByaW1yYWYuc3luYyh2ZXJzaW9uc0Rpcik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQWU7QUFDZixrQkFBaUI7QUFDakIsb0JBQW1CO0FBR25CLHlCQUFnQztBQUFBLEVBQzlCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNrQztBQUNsQyxNQUFJLHlCQUF5QixVQUFVO0FBQ3JDO0FBQUEsRUFDRjtBQUVBLFFBQU0sRUFBRSxvQkFBb0IsU0FBUztBQUVyQyxRQUFNLGVBQWUsb0JBQUssS0FDeEIsV0FDQSxHQUFHLHVCQUNILFlBQ0EsY0FDQSw4QkFDRjtBQUVBLFFBQU0sY0FBYyxvQkFBSyxLQUFLLGNBQWMsVUFBVTtBQUN0RCxRQUFNLGlCQUFpQixvQkFBSyxLQUFLLGFBQWEsU0FBUztBQUV2RCxRQUFNLGFBQWEsTUFBTSx3QkFBRyxRQUFRLGNBQWM7QUFDbEQsYUFBVyxVQUFVLFlBQVk7QUFDL0IsVUFBTSxhQUFhLG9CQUFLLEtBQUssZ0JBQWdCLE1BQU07QUFDbkQsVUFBTSxhQUFhLG9CQUFLLEtBQUssY0FBYyxNQUFNO0FBRWpELFlBQVEsSUFDTix5REFDQSxVQUNGO0FBQ0EsMEJBQU8sS0FBSyxVQUFVO0FBR3RCLFVBQU0sd0JBQUcsT0FBTyxZQUFZLFVBQVU7QUFBQSxFQUN4QztBQUVBLFVBQVEsSUFBSSx5Q0FBeUMsV0FBVztBQUNoRSx3QkFBTyxLQUFLLFdBQVc7QUFDekI7QUF2Q3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
