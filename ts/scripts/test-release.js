var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_asar = __toESM(require("asar"));
var import_assert = __toESM(require("assert"));
var import_path = require("path");
var import_playwright = require("playwright");
var import_package = __toESM(require("../../package.json"));
const ENVIRONMENT = "production";
const RELEASE_DIR = (0, import_path.join)(__dirname, "..", "..", "release");
let archive;
let exe;
if (process.platform === "darwin") {
  archive = (0, import_path.join)("mac", `${import_package.default.productName}.app`, "Contents", "Resources", "app.asar");
  exe = (0, import_path.join)("mac", `${import_package.default.productName}.app`, "Contents", "MacOS", import_package.default.productName);
} else if (process.platform === "win32") {
  archive = (0, import_path.join)("win-unpacked", "resources", "app.asar");
  exe = (0, import_path.join)("win-unpacked", `${import_package.default.productName}.exe`);
} else if (process.platform === "linux") {
  archive = (0, import_path.join)("linux-unpacked", "resources", "app.asar");
  exe = (0, import_path.join)("linux-unpacked", import_package.default.name);
} else {
  throw new Error(`Unsupported platform: ${process.platform}`);
}
const files = [
  (0, import_path.join)("config", "default.json"),
  (0, import_path.join)("config", `${ENVIRONMENT}.json`),
  (0, import_path.join)("config", `local-${ENVIRONMENT}.json`)
];
for (const fileName of files) {
  console.log(`Checking that ${fileName} exists in asar ${archive}`);
  try {
    import_asar.default.statFile((0, import_path.join)(RELEASE_DIR, archive), fileName);
  } catch (e) {
    console.log(e);
    throw new Error(`Missing file ${fileName}`);
  }
}
const main = /* @__PURE__ */ __name(async () => {
  const executablePath = (0, import_path.join)(RELEASE_DIR, exe);
  console.log("Starting path", executablePath);
  const app = await import_playwright._electron.launch({
    executablePath,
    locale: "en"
  });
  console.log("Waiting for a first window");
  const window = await app.firstWindow();
  console.log("Waiting for app to fully load");
  await window.waitForSelector('.App, .app-loading-screen:has-text("Optimizing")');
  console.log("Checking window title");
  import_assert.default.strictEqual(await window.title(), import_package.default.productName);
  await app.close();
}, "main");
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGVzdC1yZWxlYXNlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IGFzYXIgZnJvbSAnYXNhcic7XG5pbXBvcnQgYXNzZXJ0IGZyb20gJ2Fzc2VydCc7XG5pbXBvcnQgeyBqb2luIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBfZWxlY3Ryb24gYXMgZWxlY3Ryb24gfSBmcm9tICdwbGF5d3JpZ2h0JztcblxuaW1wb3J0IHBhY2thZ2VKc29uIGZyb20gJy4uLy4uL3BhY2thZ2UuanNvbic7XG5cbmNvbnN0IEVOVklST05NRU5UID0gJ3Byb2R1Y3Rpb24nO1xuY29uc3QgUkVMRUFTRV9ESVIgPSBqb2luKF9fZGlybmFtZSwgJy4uJywgJy4uJywgJ3JlbGVhc2UnKTtcblxubGV0IGFyY2hpdmU6IHN0cmluZztcbmxldCBleGU6IHN0cmluZztcbmlmIChwcm9jZXNzLnBsYXRmb3JtID09PSAnZGFyd2luJykge1xuICBhcmNoaXZlID0gam9pbihcbiAgICAnbWFjJyxcbiAgICBgJHtwYWNrYWdlSnNvbi5wcm9kdWN0TmFtZX0uYXBwYCxcbiAgICAnQ29udGVudHMnLFxuICAgICdSZXNvdXJjZXMnLFxuICAgICdhcHAuYXNhcidcbiAgKTtcbiAgZXhlID0gam9pbihcbiAgICAnbWFjJyxcbiAgICBgJHtwYWNrYWdlSnNvbi5wcm9kdWN0TmFtZX0uYXBwYCxcbiAgICAnQ29udGVudHMnLFxuICAgICdNYWNPUycsXG4gICAgcGFja2FnZUpzb24ucHJvZHVjdE5hbWVcbiAgKTtcbn0gZWxzZSBpZiAocHJvY2Vzcy5wbGF0Zm9ybSA9PT0gJ3dpbjMyJykge1xuICBhcmNoaXZlID0gam9pbignd2luLXVucGFja2VkJywgJ3Jlc291cmNlcycsICdhcHAuYXNhcicpO1xuICBleGUgPSBqb2luKCd3aW4tdW5wYWNrZWQnLCBgJHtwYWNrYWdlSnNvbi5wcm9kdWN0TmFtZX0uZXhlYCk7XG59IGVsc2UgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdsaW51eCcpIHtcbiAgYXJjaGl2ZSA9IGpvaW4oJ2xpbnV4LXVucGFja2VkJywgJ3Jlc291cmNlcycsICdhcHAuYXNhcicpO1xuICBleGUgPSBqb2luKCdsaW51eC11bnBhY2tlZCcsIHBhY2thZ2VKc29uLm5hbWUpO1xufSBlbHNlIHtcbiAgdGhyb3cgbmV3IEVycm9yKGBVbnN1cHBvcnRlZCBwbGF0Zm9ybTogJHtwcm9jZXNzLnBsYXRmb3JtfWApO1xufVxuXG5jb25zdCBmaWxlcyA9IFtcbiAgam9pbignY29uZmlnJywgJ2RlZmF1bHQuanNvbicpLFxuICBqb2luKCdjb25maWcnLCBgJHtFTlZJUk9OTUVOVH0uanNvbmApLFxuICBqb2luKCdjb25maWcnLCBgbG9jYWwtJHtFTlZJUk9OTUVOVH0uanNvbmApLFxuXTtcblxuZm9yIChjb25zdCBmaWxlTmFtZSBvZiBmaWxlcykge1xuICBjb25zb2xlLmxvZyhgQ2hlY2tpbmcgdGhhdCAke2ZpbGVOYW1lfSBleGlzdHMgaW4gYXNhciAke2FyY2hpdmV9YCk7XG4gIHRyeSB7XG4gICAgYXNhci5zdGF0RmlsZShqb2luKFJFTEVBU0VfRElSLCBhcmNoaXZlKSwgZmlsZU5hbWUpO1xuICB9IGNhdGNoIChlKSB7XG4gICAgY29uc29sZS5sb2coZSk7XG4gICAgdGhyb3cgbmV3IEVycm9yKGBNaXNzaW5nIGZpbGUgJHtmaWxlTmFtZX1gKTtcbiAgfVxufVxuXG4vLyBBIHNpbXBsZSB0ZXN0IHRvIHZlcmlmeSBhIHZpc2libGUgd2luZG93IGlzIG9wZW5lZCB3aXRoIGEgdGl0bGVcbmNvbnN0IG1haW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IGV4ZWN1dGFibGVQYXRoID0gam9pbihSRUxFQVNFX0RJUiwgZXhlKTtcbiAgY29uc29sZS5sb2coJ1N0YXJ0aW5nIHBhdGgnLCBleGVjdXRhYmxlUGF0aCk7XG4gIGNvbnN0IGFwcCA9IGF3YWl0IGVsZWN0cm9uLmxhdW5jaCh7XG4gICAgZXhlY3V0YWJsZVBhdGgsXG4gICAgbG9jYWxlOiAnZW4nLFxuICB9KTtcblxuICBjb25zb2xlLmxvZygnV2FpdGluZyBmb3IgYSBmaXJzdCB3aW5kb3cnKTtcbiAgY29uc3Qgd2luZG93ID0gYXdhaXQgYXBwLmZpcnN0V2luZG93KCk7XG5cbiAgY29uc29sZS5sb2coJ1dhaXRpbmcgZm9yIGFwcCB0byBmdWxseSBsb2FkJyk7XG4gIGF3YWl0IHdpbmRvdy53YWl0Rm9yU2VsZWN0b3IoXG4gICAgJy5BcHAsIC5hcHAtbG9hZGluZy1zY3JlZW46aGFzLXRleHQoXCJPcHRpbWl6aW5nXCIpJ1xuICApO1xuXG4gIGNvbnNvbGUubG9nKCdDaGVja2luZyB3aW5kb3cgdGl0bGUnKTtcbiAgYXNzZXJ0LnN0cmljdEVxdWFsKGF3YWl0IHdpbmRvdy50aXRsZSgpLCBwYWNrYWdlSnNvbi5wcm9kdWN0TmFtZSk7XG5cbiAgYXdhaXQgYXBwLmNsb3NlKCk7XG59O1xuXG5tYWluKCkuY2F0Y2goZXJyb3IgPT4ge1xuICBjb25zb2xlLmVycm9yKGVycm9yKTtcbiAgcHJvY2Vzcy5leGl0KDEpO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQWlCO0FBQ2pCLG9CQUFtQjtBQUNuQixrQkFBcUI7QUFDckIsd0JBQXNDO0FBRXRDLHFCQUF3QjtBQUV4QixNQUFNLGNBQWM7QUFDcEIsTUFBTSxjQUFjLHNCQUFLLFdBQVcsTUFBTSxNQUFNLFNBQVM7QUFFekQsSUFBSTtBQUNKLElBQUk7QUFDSixJQUFJLFFBQVEsYUFBYSxVQUFVO0FBQ2pDLFlBQVUsc0JBQ1IsT0FDQSxHQUFHLHVCQUFZLG1CQUNmLFlBQ0EsYUFDQSxVQUNGO0FBQ0EsUUFBTSxzQkFDSixPQUNBLEdBQUcsdUJBQVksbUJBQ2YsWUFDQSxTQUNBLHVCQUFZLFdBQ2Q7QUFDRixXQUFXLFFBQVEsYUFBYSxTQUFTO0FBQ3ZDLFlBQVUsc0JBQUssZ0JBQWdCLGFBQWEsVUFBVTtBQUN0RCxRQUFNLHNCQUFLLGdCQUFnQixHQUFHLHVCQUFZLGlCQUFpQjtBQUM3RCxXQUFXLFFBQVEsYUFBYSxTQUFTO0FBQ3ZDLFlBQVUsc0JBQUssa0JBQWtCLGFBQWEsVUFBVTtBQUN4RCxRQUFNLHNCQUFLLGtCQUFrQix1QkFBWSxJQUFJO0FBQy9DLE9BQU87QUFDTCxRQUFNLElBQUksTUFBTSx5QkFBeUIsUUFBUSxVQUFVO0FBQzdEO0FBRUEsTUFBTSxRQUFRO0FBQUEsRUFDWixzQkFBSyxVQUFVLGNBQWM7QUFBQSxFQUM3QixzQkFBSyxVQUFVLEdBQUcsa0JBQWtCO0FBQUEsRUFDcEMsc0JBQUssVUFBVSxTQUFTLGtCQUFrQjtBQUM1QztBQUVBLFdBQVcsWUFBWSxPQUFPO0FBQzVCLFVBQVEsSUFBSSxpQkFBaUIsMkJBQTJCLFNBQVM7QUFDakUsTUFBSTtBQUNGLHdCQUFLLFNBQVMsc0JBQUssYUFBYSxPQUFPLEdBQUcsUUFBUTtBQUFBLEVBQ3BELFNBQVMsR0FBUDtBQUNBLFlBQVEsSUFBSSxDQUFDO0FBQ2IsVUFBTSxJQUFJLE1BQU0sZ0JBQWdCLFVBQVU7QUFBQSxFQUM1QztBQUNGO0FBR0EsTUFBTSxPQUFPLG1DQUFZO0FBQ3ZCLFFBQU0saUJBQWlCLHNCQUFLLGFBQWEsR0FBRztBQUM1QyxVQUFRLElBQUksaUJBQWlCLGNBQWM7QUFDM0MsUUFBTSxNQUFNLE1BQU0sNEJBQVMsT0FBTztBQUFBLElBQ2hDO0FBQUEsSUFDQSxRQUFRO0FBQUEsRUFDVixDQUFDO0FBRUQsVUFBUSxJQUFJLDRCQUE0QjtBQUN4QyxRQUFNLFNBQVMsTUFBTSxJQUFJLFlBQVk7QUFFckMsVUFBUSxJQUFJLCtCQUErQjtBQUMzQyxRQUFNLE9BQU8sZ0JBQ1gsa0RBQ0Y7QUFFQSxVQUFRLElBQUksdUJBQXVCO0FBQ25DLHdCQUFPLFlBQVksTUFBTSxPQUFPLE1BQU0sR0FBRyx1QkFBWSxXQUFXO0FBRWhFLFFBQU0sSUFBSSxNQUFNO0FBQ2xCLEdBcEJhO0FBc0JiLEtBQUssRUFBRSxNQUFNLFdBQVM7QUFDcEIsVUFBUSxNQUFNLEtBQUs7QUFDbkIsVUFBUSxLQUFLLENBQUM7QUFDaEIsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
