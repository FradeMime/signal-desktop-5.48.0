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
var Errors = __toESM(require("../types/errors"));
var import_common = require("./common");
var import_curve = require("./curve");
var import_signature = require("./signature");
const OPTIONS = [
  {
    names: ["help", "h"],
    type: "bool",
    help: "Print this help and exit."
  },
  {
    names: ["key", "k"],
    type: "string",
    help: "Path where public key will go",
    default: "public.key"
  },
  {
    names: ["private", "p"],
    type: "string",
    help: "Path where private key will go",
    default: "private.key"
  }
];
const cliOptions = (0, import_common.getCliOptions)(OPTIONS);
go(cliOptions).catch((error) => {
  console.error("Something went wrong!", Errors.toLogFormat(error));
});
async function go(options) {
  const { key: publicKeyPath, private: privateKeyPath } = options;
  const { publicKey, privateKey } = (0, import_curve.keyPair)();
  await Promise.all([
    (0, import_signature.writeHexToPath)(publicKeyPath, publicKey),
    (0, import_signature.writeHexToPath)(privateKeyPath, privateKey)
  ]);
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2VuZXJhdGVLZXlQYWlyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuLyogZXNsaW50LWRpc2FibGUgbm8tY29uc29sZSAqL1xuaW1wb3J0ICogYXMgRXJyb3JzIGZyb20gJy4uL3R5cGVzL2Vycm9ycyc7XG5pbXBvcnQgeyBnZXRDbGlPcHRpb25zIH0gZnJvbSAnLi9jb21tb24nO1xuaW1wb3J0IHsga2V5UGFpciB9IGZyb20gJy4vY3VydmUnO1xuaW1wb3J0IHsgd3JpdGVIZXhUb1BhdGggfSBmcm9tICcuL3NpZ25hdHVyZSc7XG5cbmNvbnN0IE9QVElPTlMgPSBbXG4gIHtcbiAgICBuYW1lczogWydoZWxwJywgJ2gnXSxcbiAgICB0eXBlOiAnYm9vbCcsXG4gICAgaGVscDogJ1ByaW50IHRoaXMgaGVscCBhbmQgZXhpdC4nLFxuICB9LFxuICB7XG4gICAgbmFtZXM6IFsna2V5JywgJ2snXSxcbiAgICB0eXBlOiAnc3RyaW5nJyxcbiAgICBoZWxwOiAnUGF0aCB3aGVyZSBwdWJsaWMga2V5IHdpbGwgZ28nLFxuICAgIGRlZmF1bHQ6ICdwdWJsaWMua2V5JyxcbiAgfSxcbiAge1xuICAgIG5hbWVzOiBbJ3ByaXZhdGUnLCAncCddLFxuICAgIHR5cGU6ICdzdHJpbmcnLFxuICAgIGhlbHA6ICdQYXRoIHdoZXJlIHByaXZhdGUga2V5IHdpbGwgZ28nLFxuICAgIGRlZmF1bHQ6ICdwcml2YXRlLmtleScsXG4gIH0sXG5dO1xuXG50eXBlIE9wdGlvbnNUeXBlID0ge1xuICBrZXk6IHN0cmluZztcbiAgcHJpdmF0ZTogc3RyaW5nO1xufTtcblxuY29uc3QgY2xpT3B0aW9ucyA9IGdldENsaU9wdGlvbnM8T3B0aW9uc1R5cGU+KE9QVElPTlMpO1xuZ28oY2xpT3B0aW9ucykuY2F0Y2goZXJyb3IgPT4ge1xuICBjb25zb2xlLmVycm9yKCdTb21ldGhpbmcgd2VudCB3cm9uZyEnLCBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyb3IpKTtcbn0pO1xuXG5hc3luYyBmdW5jdGlvbiBnbyhvcHRpb25zOiBPcHRpb25zVHlwZSkge1xuICBjb25zdCB7IGtleTogcHVibGljS2V5UGF0aCwgcHJpdmF0ZTogcHJpdmF0ZUtleVBhdGggfSA9IG9wdGlvbnM7XG4gIGNvbnN0IHsgcHVibGljS2V5LCBwcml2YXRlS2V5IH0gPSBrZXlQYWlyKCk7XG5cbiAgYXdhaXQgUHJvbWlzZS5hbGwoW1xuICAgIHdyaXRlSGV4VG9QYXRoKHB1YmxpY0tleVBhdGgsIHB1YmxpY0tleSksXG4gICAgd3JpdGVIZXhUb1BhdGgocHJpdmF0ZUtleVBhdGgsIHByaXZhdGVLZXkpLFxuICBdKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJQSxhQUF3QjtBQUN4QixvQkFBOEI7QUFDOUIsbUJBQXdCO0FBQ3hCLHVCQUErQjtBQUUvQixNQUFNLFVBQVU7QUFBQSxFQUNkO0FBQUEsSUFDRSxPQUFPLENBQUMsUUFBUSxHQUFHO0FBQUEsSUFDbkIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLENBQUMsT0FBTyxHQUFHO0FBQUEsSUFDbEIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFBQSxFQUNBO0FBQUEsSUFDRSxPQUFPLENBQUMsV0FBVyxHQUFHO0FBQUEsSUFDdEIsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLElBQ04sU0FBUztBQUFBLEVBQ1g7QUFDRjtBQU9BLE1BQU0sYUFBYSxpQ0FBMkIsT0FBTztBQUNyRCxHQUFHLFVBQVUsRUFBRSxNQUFNLFdBQVM7QUFDNUIsVUFBUSxNQUFNLHlCQUF5QixPQUFPLFlBQVksS0FBSyxDQUFDO0FBQ2xFLENBQUM7QUFFRCxrQkFBa0IsU0FBc0I7QUFDdEMsUUFBTSxFQUFFLEtBQUssZUFBZSxTQUFTLG1CQUFtQjtBQUN4RCxRQUFNLEVBQUUsV0FBVyxlQUFlLDBCQUFRO0FBRTFDLFFBQU0sUUFBUSxJQUFJO0FBQUEsSUFDaEIscUNBQWUsZUFBZSxTQUFTO0FBQUEsSUFDdkMscUNBQWUsZ0JBQWdCLFVBQVU7QUFBQSxFQUMzQyxDQUFDO0FBQ0g7QUFSZSIsCiAgIm5hbWVzIjogW10KfQo=
