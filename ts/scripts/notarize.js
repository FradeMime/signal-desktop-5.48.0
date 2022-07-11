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
var notarize_exports = {};
__export(notarize_exports, {
  afterSign: () => afterSign
});
module.exports = __toCommonJS(notarize_exports);
var import_path = __toESM(require("path"));
var import_electron_notarize = require("electron-notarize");
var packageJson = __toESM(require("../../package.json"));
async function afterSign({
  appOutDir,
  packager,
  electronPlatformName
}) {
  if (electronPlatformName !== "darwin") {
    console.log("notarize: Skipping, not on macOS");
    return;
  }
  const { productFilename } = packager.appInfo;
  const appPath = import_path.default.join(appOutDir, `${productFilename}.app`);
  const appBundleId = packageJson.build.appId;
  if (!appBundleId) {
    throw new Error("appBundleId must be provided in package.json: build.appId");
  }
  const appleId = process.env.APPLE_USERNAME;
  if (!appleId) {
    console.warn("appleId must be provided in environment variable APPLE_USERNAME");
    return;
  }
  const appleIdPassword = process.env.APPLE_PASSWORD;
  if (!appleIdPassword) {
    console.warn("appleIdPassword must be provided in environment variable APPLE_PASSWORD");
    return;
  }
  const teamId = process.env.APPLE_TEAM_ID;
  if (!teamId) {
    console.warn("teamId must be provided in environment variable APPLE_TEAM_ID");
    return;
  }
  console.log("Notarizing with...");
  console.log(`  primaryBundleId: ${appBundleId}`);
  console.log(`  username: ${appleId}`);
  console.log(`  file: ${appPath}`);
  await (0, import_electron_notarize.notarize)({
    tool: "notarytool",
    appBundleId,
    appPath,
    appleId,
    appleIdPassword,
    teamId
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterSign
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm90YXJpemUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB0eXBlIHsgQWZ0ZXJQYWNrQ29udGV4dCB9IGZyb20gJ2VsZWN0cm9uLWJ1aWxkZXInO1xuXG5pbXBvcnQgeyBub3Rhcml6ZSB9IGZyb20gJ2VsZWN0cm9uLW5vdGFyaXplJztcblxuaW1wb3J0ICogYXMgcGFja2FnZUpzb24gZnJvbSAnLi4vLi4vcGFja2FnZS5qc29uJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGFmdGVyU2lnbih7XG4gIGFwcE91dERpcixcbiAgcGFja2FnZXIsXG4gIGVsZWN0cm9uUGxhdGZvcm1OYW1lLFxufTogQWZ0ZXJQYWNrQ29udGV4dCk6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoZWxlY3Ryb25QbGF0Zm9ybU5hbWUgIT09ICdkYXJ3aW4nKSB7XG4gICAgY29uc29sZS5sb2coJ25vdGFyaXplOiBTa2lwcGluZywgbm90IG9uIG1hY09TJyk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgeyBwcm9kdWN0RmlsZW5hbWUgfSA9IHBhY2thZ2VyLmFwcEluZm87XG5cbiAgY29uc3QgYXBwUGF0aCA9IHBhdGguam9pbihhcHBPdXREaXIsIGAke3Byb2R1Y3RGaWxlbmFtZX0uYXBwYCk7XG5cbiAgY29uc3QgYXBwQnVuZGxlSWQgPSBwYWNrYWdlSnNvbi5idWlsZC5hcHBJZDtcbiAgaWYgKCFhcHBCdW5kbGVJZCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdhcHBCdW5kbGVJZCBtdXN0IGJlIHByb3ZpZGVkIGluIHBhY2thZ2UuanNvbjogYnVpbGQuYXBwSWQnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGFwcGxlSWQgPSBwcm9jZXNzLmVudi5BUFBMRV9VU0VSTkFNRTtcbiAgaWYgKCFhcHBsZUlkKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ2FwcGxlSWQgbXVzdCBiZSBwcm92aWRlZCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZSBBUFBMRV9VU0VSTkFNRSdcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGFwcGxlSWRQYXNzd29yZCA9IHByb2Nlc3MuZW52LkFQUExFX1BBU1NXT1JEO1xuICBpZiAoIWFwcGxlSWRQYXNzd29yZCkge1xuICAgIGNvbnNvbGUud2FybihcbiAgICAgICdhcHBsZUlkUGFzc3dvcmQgbXVzdCBiZSBwcm92aWRlZCBpbiBlbnZpcm9ubWVudCB2YXJpYWJsZSBBUFBMRV9QQVNTV09SRCdcbiAgICApO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRlYW1JZCA9IHByb2Nlc3MuZW52LkFQUExFX1RFQU1fSUQ7XG4gIGlmICghdGVhbUlkKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ3RlYW1JZCBtdXN0IGJlIHByb3ZpZGVkIGluIGVudmlyb25tZW50IHZhcmlhYmxlIEFQUExFX1RFQU1fSUQnXG4gICAgKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zb2xlLmxvZygnTm90YXJpemluZyB3aXRoLi4uJyk7XG4gIGNvbnNvbGUubG9nKGAgIHByaW1hcnlCdW5kbGVJZDogJHthcHBCdW5kbGVJZH1gKTtcbiAgY29uc29sZS5sb2coYCAgdXNlcm5hbWU6ICR7YXBwbGVJZH1gKTtcbiAgY29uc29sZS5sb2coYCAgZmlsZTogJHthcHBQYXRofWApO1xuXG4gIGF3YWl0IG5vdGFyaXplKHtcbiAgICB0b29sOiAnbm90YXJ5dG9vbCcsXG4gICAgYXBwQnVuZGxlSWQsXG4gICAgYXBwUGF0aCxcbiAgICBhcHBsZUlkLFxuICAgIGFwcGxlSWRQYXNzd29yZCxcbiAgICB0ZWFtSWQsXG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFpQjtBQUdqQiwrQkFBeUI7QUFFekIsa0JBQTZCO0FBRTdCLHlCQUFnQztBQUFBLEVBQzlCO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxHQUNrQztBQUNsQyxNQUFJLHlCQUF5QixVQUFVO0FBQ3JDLFlBQVEsSUFBSSxrQ0FBa0M7QUFDOUM7QUFBQSxFQUNGO0FBRUEsUUFBTSxFQUFFLG9CQUFvQixTQUFTO0FBRXJDLFFBQU0sVUFBVSxvQkFBSyxLQUFLLFdBQVcsR0FBRyxxQkFBcUI7QUFFN0QsUUFBTSxjQUFjLFlBQVksTUFBTTtBQUN0QyxNQUFJLENBQUMsYUFBYTtBQUNoQixVQUFNLElBQUksTUFDUiwyREFDRjtBQUFBLEVBQ0Y7QUFFQSxRQUFNLFVBQVUsUUFBUSxJQUFJO0FBQzVCLE1BQUksQ0FBQyxTQUFTO0FBQ1osWUFBUSxLQUNOLGlFQUNGO0FBQ0E7QUFBQSxFQUNGO0FBRUEsUUFBTSxrQkFBa0IsUUFBUSxJQUFJO0FBQ3BDLE1BQUksQ0FBQyxpQkFBaUI7QUFDcEIsWUFBUSxLQUNOLHlFQUNGO0FBQ0E7QUFBQSxFQUNGO0FBRUEsUUFBTSxTQUFTLFFBQVEsSUFBSTtBQUMzQixNQUFJLENBQUMsUUFBUTtBQUNYLFlBQVEsS0FDTiwrREFDRjtBQUNBO0FBQUEsRUFDRjtBQUVBLFVBQVEsSUFBSSxvQkFBb0I7QUFDaEMsVUFBUSxJQUFJLHNCQUFzQixhQUFhO0FBQy9DLFVBQVEsSUFBSSxlQUFlLFNBQVM7QUFDcEMsVUFBUSxJQUFJLFdBQVcsU0FBUztBQUVoQyxRQUFNLHVDQUFTO0FBQUEsSUFDYixNQUFNO0FBQUEsSUFDTjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGLENBQUM7QUFDSDtBQTFEc0IiLAogICJuYW1lcyI6IFtdCn0K
