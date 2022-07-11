var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_semver = __toESM(require("semver"));
const os = require("os");
if (process.platform === "win32" && import_semver.default.satisfies(os.release(), "6.1.x")) {
  os.hostname = () => "Desktop";
}
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGF0Y2hXaW5kb3dzN0hvc3RuYW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJztcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby12YXItcmVxdWlyZXNcbmNvbnN0IG9zID0gcmVxdWlyZSgnb3MnKTtcblxuLy8gb3MuaG9zdG5hbWUoKSBkb2Vzbid0IHdvcmsgb24gV2luZG93cyA3IGFueW1vcmVcbi8vIFNlZTogaHR0cHM6Ly9naXRodWIuY29tL2VsZWN0cm9uL2VsZWN0cm9uL2lzc3Vlcy8zNDQwNFxuaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICd3aW4zMicgJiYgc2VtdmVyLnNhdGlzZmllcyhvcy5yZWxlYXNlKCksICc2LjEueCcpKSB7XG4gIG9zLmhvc3RuYW1lID0gKCkgPT4gJ0Rlc2t0b3AnO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esb0JBQW1CO0FBR25CLE1BQU0sS0FBSyxRQUFRLElBQUk7QUFJdkIsSUFBSSxRQUFRLGFBQWEsV0FBVyxzQkFBTyxVQUFVLEdBQUcsUUFBUSxHQUFHLE9BQU8sR0FBRztBQUMzRSxLQUFHLFdBQVcsTUFBTTtBQUN0QjsiLAogICJuYW1lcyI6IFtdCn0K
