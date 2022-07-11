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
var errors_exports = {};
__export(errors_exports, {
  isCorruptionError: () => isCorruptionError
});
module.exports = __toCommonJS(errors_exports);
function isCorruptionError(error) {
  return error?.message?.includes("SQLITE_CORRUPT") || error?.message?.includes("database disk image is malformed") || error?.message?.includes("file is not a database") || false;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isCorruptionError
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZXJyb3JzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0NvcnJ1cHRpb25FcnJvcihlcnJvcj86IEVycm9yKTogYm9vbGVhbiB7XG4gIHJldHVybiAoXG4gICAgZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCdTUUxJVEVfQ09SUlVQVCcpIHx8XG4gICAgZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCdkYXRhYmFzZSBkaXNrIGltYWdlIGlzIG1hbGZvcm1lZCcpIHx8XG4gICAgZXJyb3I/Lm1lc3NhZ2U/LmluY2x1ZGVzKCdmaWxlIGlzIG5vdCBhIGRhdGFiYXNlJykgfHxcbiAgICBmYWxzZVxuICApO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdPLDJCQUEyQixPQUF3QjtBQUN4RCxTQUNFLE9BQU8sU0FBUyxTQUFTLGdCQUFnQixLQUN6QyxPQUFPLFNBQVMsU0FBUyxrQ0FBa0MsS0FDM0QsT0FBTyxTQUFTLFNBQVMsd0JBQXdCLEtBQ2pEO0FBRUo7QUFQZ0IiLAogICJuYW1lcyI6IFtdCn0K
