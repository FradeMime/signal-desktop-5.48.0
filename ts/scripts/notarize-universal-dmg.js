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
var notarize_universal_dmg_exports = {};
__export(notarize_universal_dmg_exports, {
  afterAllArtifactBuild: () => afterAllArtifactBuild
});
module.exports = __toCommonJS(notarize_universal_dmg_exports);
var import_electron_notarize = require("electron-notarize");
var packageJson = __toESM(require("../../package.json"));
async function afterAllArtifactBuild({
  platformToTargets,
  artifactPaths
}) {
  const platforms = Array.from(platformToTargets.keys()).map((platform) => platform.name);
  if (platforms.length !== 1) {
    console.log(`notarize: Skipping, too many platforms ${platforms}`);
    return;
  }
  if (platforms[0] !== "mac") {
    console.log(`notarize: Skipping, platform is ${platforms[0]}`);
    return;
  }
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
  const artifactsToStaple = artifactPaths.filter((artifactPath) => /^.*mac-universal.*\.dmg$/.test(artifactPath));
  if (artifactsToStaple.length !== 1) {
    console.log(`notarize: Skipping, too many dmgs ${artifactsToStaple}`);
    return;
  }
  const [dmgPath] = artifactsToStaple;
  console.log(`Notarizing dmg: ${dmgPath}`);
  await (0, import_electron_notarize.notarize)({
    appBundleId,
    appPath: dmgPath,
    appleId,
    appleIdPassword
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterAllArtifactBuild
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibm90YXJpemUtdW5pdmVyc2FsLWRtZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IEJ1aWxkUmVzdWx0IH0gZnJvbSAnZWxlY3Ryb24tYnVpbGRlcic7XG5cbmltcG9ydCB7IG5vdGFyaXplIH0gZnJvbSAnZWxlY3Ryb24tbm90YXJpemUnO1xuXG5pbXBvcnQgKiBhcyBwYWNrYWdlSnNvbiBmcm9tICcuLi8uLi9wYWNrYWdlLmpzb24nO1xuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gYWZ0ZXJBbGxBcnRpZmFjdEJ1aWxkKHtcbiAgcGxhdGZvcm1Ub1RhcmdldHMsXG4gIGFydGlmYWN0UGF0aHMsXG59OiBCdWlsZFJlc3VsdCk6IFByb21pc2U8dm9pZD4ge1xuICBjb25zdCBwbGF0Zm9ybXMgPSBBcnJheS5mcm9tKHBsYXRmb3JtVG9UYXJnZXRzLmtleXMoKSkubWFwKFxuICAgIHBsYXRmb3JtID0+IHBsYXRmb3JtLm5hbWVcbiAgKTtcbiAgaWYgKHBsYXRmb3Jtcy5sZW5ndGggIT09IDEpIHtcbiAgICBjb25zb2xlLmxvZyhgbm90YXJpemU6IFNraXBwaW5nLCB0b28gbWFueSBwbGF0Zm9ybXMgJHtwbGF0Zm9ybXN9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKHBsYXRmb3Jtc1swXSAhPT0gJ21hYycpIHtcbiAgICBjb25zb2xlLmxvZyhgbm90YXJpemU6IFNraXBwaW5nLCBwbGF0Zm9ybSBpcyAke3BsYXRmb3Jtc1swXX1gKTtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBhcHBCdW5kbGVJZCA9IHBhY2thZ2VKc29uLmJ1aWxkLmFwcElkO1xuICBpZiAoIWFwcEJ1bmRsZUlkKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2FwcEJ1bmRsZUlkIG11c3QgYmUgcHJvdmlkZWQgaW4gcGFja2FnZS5qc29uOiBidWlsZC5hcHBJZCdcbiAgICApO1xuICB9XG5cbiAgY29uc3QgYXBwbGVJZCA9IHByb2Nlc3MuZW52LkFQUExFX1VTRVJOQU1FO1xuICBpZiAoIWFwcGxlSWQpIHtcbiAgICBjb25zb2xlLndhcm4oXG4gICAgICAnYXBwbGVJZCBtdXN0IGJlIHByb3ZpZGVkIGluIGVudmlyb25tZW50IHZhcmlhYmxlIEFQUExFX1VTRVJOQU1FJ1xuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXBwbGVJZFBhc3N3b3JkID0gcHJvY2Vzcy5lbnYuQVBQTEVfUEFTU1dPUkQ7XG4gIGlmICghYXBwbGVJZFBhc3N3b3JkKSB7XG4gICAgY29uc29sZS53YXJuKFxuICAgICAgJ2FwcGxlSWRQYXNzd29yZCBtdXN0IGJlIHByb3ZpZGVkIGluIGVudmlyb25tZW50IHZhcmlhYmxlIEFQUExFX1BBU1NXT1JEJ1xuICAgICk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgYXJ0aWZhY3RzVG9TdGFwbGUgPSBhcnRpZmFjdFBhdGhzLmZpbHRlcihhcnRpZmFjdFBhdGggPT5cbiAgICAvXi4qbWFjLXVuaXZlcnNhbC4qXFwuZG1nJC8udGVzdChhcnRpZmFjdFBhdGgpXG4gICk7XG4gIGlmIChhcnRpZmFjdHNUb1N0YXBsZS5sZW5ndGggIT09IDEpIHtcbiAgICBjb25zb2xlLmxvZyhgbm90YXJpemU6IFNraXBwaW5nLCB0b28gbWFueSBkbWdzICR7YXJ0aWZhY3RzVG9TdGFwbGV9YCk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgW2RtZ1BhdGhdID0gYXJ0aWZhY3RzVG9TdGFwbGU7XG4gIGNvbnNvbGUubG9nKGBOb3Rhcml6aW5nIGRtZzogJHtkbWdQYXRofWApO1xuICBhd2FpdCBub3Rhcml6ZSh7XG4gICAgYXBwQnVuZGxlSWQsXG4gICAgYXBwUGF0aDogZG1nUGF0aCxcbiAgICBhcHBsZUlkLFxuICAgIGFwcGxlSWRQYXNzd29yZCxcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsK0JBQXlCO0FBRXpCLGtCQUE2QjtBQUU3QixxQ0FBNEM7QUFBQSxFQUMxQztBQUFBLEVBQ0E7QUFBQSxHQUM2QjtBQUM3QixRQUFNLFlBQVksTUFBTSxLQUFLLGtCQUFrQixLQUFLLENBQUMsRUFBRSxJQUNyRCxjQUFZLFNBQVMsSUFDdkI7QUFDQSxNQUFJLFVBQVUsV0FBVyxHQUFHO0FBQzFCLFlBQVEsSUFBSSwwQ0FBMEMsV0FBVztBQUNqRTtBQUFBLEVBQ0Y7QUFFQSxNQUFJLFVBQVUsT0FBTyxPQUFPO0FBQzFCLFlBQVEsSUFBSSxtQ0FBbUMsVUFBVSxJQUFJO0FBQzdEO0FBQUEsRUFDRjtBQUVBLFFBQU0sY0FBYyxZQUFZLE1BQU07QUFDdEMsTUFBSSxDQUFDLGFBQWE7QUFDaEIsVUFBTSxJQUFJLE1BQ1IsMkRBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxVQUFVLFFBQVEsSUFBSTtBQUM1QixNQUFJLENBQUMsU0FBUztBQUNaLFlBQVEsS0FDTixpRUFDRjtBQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sa0JBQWtCLFFBQVEsSUFBSTtBQUNwQyxNQUFJLENBQUMsaUJBQWlCO0FBQ3BCLFlBQVEsS0FDTix5RUFDRjtBQUNBO0FBQUEsRUFDRjtBQUVBLFFBQU0sb0JBQW9CLGNBQWMsT0FBTyxrQkFDN0MsMkJBQTJCLEtBQUssWUFBWSxDQUM5QztBQUNBLE1BQUksa0JBQWtCLFdBQVcsR0FBRztBQUNsQyxZQUFRLElBQUkscUNBQXFDLG1CQUFtQjtBQUNwRTtBQUFBLEVBQ0Y7QUFFQSxRQUFNLENBQUMsV0FBVztBQUNsQixVQUFRLElBQUksbUJBQW1CLFNBQVM7QUFDeEMsUUFBTSx1Q0FBUztBQUFBLElBQ2I7QUFBQSxJQUNBLFNBQVM7QUFBQSxJQUNUO0FBQUEsSUFDQTtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBeERzQiIsCiAgIm5hbWVzIjogW10KfQo=
