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
var fuse_electron_exports = {};
__export(fuse_electron_exports, {
  afterPack: () => afterPack
});
module.exports = __toCommonJS(fuse_electron_exports);
var import_path = __toESM(require("path"));
var import_fuses = require("@electron/fuses");
async function afterPack({
  appOutDir,
  packager,
  electronPlatformName
}) {
  const { productFilename } = packager.appInfo;
  let target;
  if (electronPlatformName === "darwin") {
    target = `${productFilename}.app`;
  } else if (electronPlatformName === "win32") {
    target = `${productFilename}.exe`;
  } else if (electronPlatformName === "linux") {
    target = packager.executableName;
  } else {
    throw new Error(`Unsupported platform: ${electronPlatformName}`);
  }
  const electron = import_path.default.join(appOutDir, target);
  const enableInspectArguments = Boolean(process.env.DISABLE_INSPECT_FUSE);
  console.log(`Fusing electron at ${electron} inspect-arguments=${enableInspectArguments}`);
  await (0, import_fuses.flipFuses)(electron, {
    version: import_fuses.FuseVersion.V1,
    [import_fuses.FuseV1Options.RunAsNode]: false,
    [import_fuses.FuseV1Options.EnableCookieEncryption]: true,
    [import_fuses.FuseV1Options.EnableNodeOptionsEnvironmentVariable]: false,
    [import_fuses.FuseV1Options.EnableNodeCliInspectArguments]: enableInspectArguments,
    [import_fuses.FuseV1Options.EnableEmbeddedAsarIntegrityValidation]: true,
    [import_fuses.FuseV1Options.OnlyLoadAppFromAsar]: true
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterPack
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZnVzZS1lbGVjdHJvbi50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGZsaXBGdXNlcywgRnVzZVZlcnNpb24sIEZ1c2VWMU9wdGlvbnMgfSBmcm9tICdAZWxlY3Ryb24vZnVzZXMnO1xuaW1wb3J0IHR5cGUgeyBBZnRlclBhY2tDb250ZXh0IH0gZnJvbSAnZWxlY3Ryb24tYnVpbGRlcic7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZnRlclBhY2soe1xuICBhcHBPdXREaXIsXG4gIHBhY2thZ2VyLFxuICBlbGVjdHJvblBsYXRmb3JtTmFtZSxcbn06IEFmdGVyUGFja0NvbnRleHQpOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgeyBwcm9kdWN0RmlsZW5hbWUgfSA9IHBhY2thZ2VyLmFwcEluZm87XG5cbiAgbGV0IHRhcmdldDtcbiAgaWYgKGVsZWN0cm9uUGxhdGZvcm1OYW1lID09PSAnZGFyd2luJykge1xuICAgIHRhcmdldCA9IGAke3Byb2R1Y3RGaWxlbmFtZX0uYXBwYDtcbiAgfSBlbHNlIGlmIChlbGVjdHJvblBsYXRmb3JtTmFtZSA9PT0gJ3dpbjMyJykge1xuICAgIHRhcmdldCA9IGAke3Byb2R1Y3RGaWxlbmFtZX0uZXhlYDtcbiAgfSBlbHNlIGlmIChlbGVjdHJvblBsYXRmb3JtTmFtZSA9PT0gJ2xpbnV4Jykge1xuICAgIC8vIFNhZGx5LCBgTGludXhQYWNrYWdlcmAgdHlwZSBpcyBub3QgZXhwb3J0ZWQgYnkgZWxlY3Ryb24tYnVpbGRlciBzbyB3ZVxuICAgIC8vIGhhdmUgdG8gaW1wcm92aXNlXG4gICAgdGFyZ2V0ID0gKHBhY2thZ2VyIGFzIHVua25vd24gYXMgeyBleGVjdXRhYmxlTmFtZTogc3RyaW5nIH0pLmV4ZWN1dGFibGVOYW1lO1xuICB9IGVsc2Uge1xuICAgIHRocm93IG5ldyBFcnJvcihgVW5zdXBwb3J0ZWQgcGxhdGZvcm06ICR7ZWxlY3Ryb25QbGF0Zm9ybU5hbWV9YCk7XG4gIH1cblxuICBjb25zdCBlbGVjdHJvbiA9IHBhdGguam9pbihhcHBPdXREaXIsIHRhcmdldCk7XG5cbiAgY29uc3QgZW5hYmxlSW5zcGVjdEFyZ3VtZW50cyA9IEJvb2xlYW4ocHJvY2Vzcy5lbnYuRElTQUJMRV9JTlNQRUNUX0ZVU0UpO1xuXG4gIGNvbnNvbGUubG9nKFxuICAgIGBGdXNpbmcgZWxlY3Ryb24gYXQgJHtlbGVjdHJvbn0gYCArXG4gICAgICBgaW5zcGVjdC1hcmd1bWVudHM9JHtlbmFibGVJbnNwZWN0QXJndW1lbnRzfWBcbiAgKTtcbiAgYXdhaXQgZmxpcEZ1c2VzKGVsZWN0cm9uLCB7XG4gICAgdmVyc2lvbjogRnVzZVZlcnNpb24uVjEsXG4gICAgLy8gRGlzYWJsZXMgRUxFQ1RST05fUlVOX0FTX05PREVcbiAgICBbRnVzZVYxT3B0aW9ucy5SdW5Bc05vZGVdOiBmYWxzZSxcbiAgICAvLyBFbmFibGVzIGNvb2tpZSBlbmNyeXB0aW9uXG4gICAgW0Z1c2VWMU9wdGlvbnMuRW5hYmxlQ29va2llRW5jcnlwdGlvbl06IHRydWUsXG4gICAgLy8gRGlzYWJsZXMgdGhlIE5PREVfT1BUSU9OUyBlbnZpcm9ubWVudCB2YXJpYWJsZVxuICAgIFtGdXNlVjFPcHRpb25zLkVuYWJsZU5vZGVPcHRpb25zRW52aXJvbm1lbnRWYXJpYWJsZV06IGZhbHNlLFxuICAgIC8vIERpc2FibGVzIHRoZSAtLWluc3BlY3QgYW5kIC0taW5zcGVjdC1icmsgZmFtaWx5IG9mIENMSSBvcHRpb25zXG4gICAgW0Z1c2VWMU9wdGlvbnMuRW5hYmxlTm9kZUNsaUluc3BlY3RBcmd1bWVudHNdOiBlbmFibGVJbnNwZWN0QXJndW1lbnRzLFxuICAgIC8vIEVuYWJsZXMgdmFsaWRhdGlvbiBvZiB0aGUgYXBwLmFzYXIgYXJjaGl2ZSBvbiBtYWNPU1xuICAgIFtGdXNlVjFPcHRpb25zLkVuYWJsZUVtYmVkZGVkQXNhckludGVncml0eVZhbGlkYXRpb25dOiB0cnVlLFxuICAgIC8vIEVuZm9yY2VzIHRoYXQgRWxlY3Ryb24gd2lsbCBvbmx5IGxvYWQgeW91ciBhcHAgZnJvbSBcImFwcC5hc2FyXCIgaW5zdGVhZCBvZlxuICAgIC8vIGl0cyBub3JtYWwgc2VhcmNoIHBhdGhzXG4gICAgW0Z1c2VWMU9wdGlvbnMuT25seUxvYWRBcHBGcm9tQXNhcl06IHRydWUsXG4gIH0pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGtCQUFpQjtBQUNqQixtQkFBc0Q7QUFHdEQseUJBQWdDO0FBQUEsRUFDOUI7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEdBQ2tDO0FBQ2xDLFFBQU0sRUFBRSxvQkFBb0IsU0FBUztBQUVyQyxNQUFJO0FBQ0osTUFBSSx5QkFBeUIsVUFBVTtBQUNyQyxhQUFTLEdBQUc7QUFBQSxFQUNkLFdBQVcseUJBQXlCLFNBQVM7QUFDM0MsYUFBUyxHQUFHO0FBQUEsRUFDZCxXQUFXLHlCQUF5QixTQUFTO0FBRzNDLGFBQVUsU0FBbUQ7QUFBQSxFQUMvRCxPQUFPO0FBQ0wsVUFBTSxJQUFJLE1BQU0seUJBQXlCLHNCQUFzQjtBQUFBLEVBQ2pFO0FBRUEsUUFBTSxXQUFXLG9CQUFLLEtBQUssV0FBVyxNQUFNO0FBRTVDLFFBQU0seUJBQXlCLFFBQVEsUUFBUSxJQUFJLG9CQUFvQjtBQUV2RSxVQUFRLElBQ04sc0JBQXNCLDhCQUNDLHdCQUN6QjtBQUNBLFFBQU0sNEJBQVUsVUFBVTtBQUFBLElBQ3hCLFNBQVMseUJBQVk7QUFBQSxLQUVwQiwyQkFBYyxZQUFZO0FBQUEsS0FFMUIsMkJBQWMseUJBQXlCO0FBQUEsS0FFdkMsMkJBQWMsdUNBQXVDO0FBQUEsS0FFckQsMkJBQWMsZ0NBQWdDO0FBQUEsS0FFOUMsMkJBQWMsd0NBQXdDO0FBQUEsS0FHdEQsMkJBQWMsc0JBQXNCO0FBQUEsRUFDdkMsQ0FBQztBQUNIO0FBNUNzQiIsCiAgIm5hbWVzIjogW10KfQo=
