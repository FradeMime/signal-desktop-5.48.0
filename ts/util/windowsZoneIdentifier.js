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
var windowsZoneIdentifier_exports = {};
__export(windowsZoneIdentifier_exports, {
  writeWindowsZoneIdentifier: () => writeWindowsZoneIdentifier
});
module.exports = __toCommonJS(windowsZoneIdentifier_exports);
var fs = __toESM(require("fs"));
var import_OS = require("../OS");
const ZONE_IDENTIFIER_CONTENTS = Buffer.from("[ZoneTransfer]\r\nZoneId=3");
async function writeWindowsZoneIdentifier(filePath) {
  if (!(0, import_OS.isWindows)()) {
    throw new Error("writeWindowsZoneIdentifier should only run on Windows");
  }
  if (!fs.existsSync(filePath)) {
    throw new Error("writeWindowsZoneIdentifier could not find the original file");
  }
  await fs.promises.writeFile(`${filePath}:Zone.Identifier`, ZONE_IDENTIFIER_CONTENTS, {
    flag: "wx"
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  writeWindowsZoneIdentifier
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsid2luZG93c1pvbmVJZGVudGlmaWVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIGZzIGZyb20gJ2ZzJztcbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gJy4uL09TJztcblxuY29uc3QgWk9ORV9JREVOVElGSUVSX0NPTlRFTlRTID0gQnVmZmVyLmZyb20oJ1tab25lVHJhbnNmZXJdXFxyXFxuWm9uZUlkPTMnKTtcblxuLyoqXG4gKiBJbnRlcm5ldCBFeHBsb3JlciBpbnRyb2R1Y2VkIHRoZSBjb25jZXB0IG9mIFwiU2VjdXJpdHkgWm9uZXNcIi4gRm9yIG91ciBwdXJwb3Nlcywgd2VcbiAqIGp1c3QgbmVlZCB0byBzZXQgdGhlIHNlY3VyaXR5IHpvbmUgdG8gdGhlIFwiSW50ZXJuZXRcIiB6b25lLCB3aGljaCBXaW5kb3dzIHdpbGwgdXNlIHRvXG4gKiBvZmZlciBzb21lIHByb3RlY3Rpb25zLiBUaGlzIGlzIGN1c3RvbWl6YWJsZSBieSB0aGUgdXNlciAob3IsIG1vcmUgbGlrZWx5LCBieSBJVCkuXG4gKlxuICogVG8gZG8gdGhpcywgd2Ugd3JpdGUgdGhlIFwiWm9uZS5JZGVudGlmaWVyXCIgZm9yIHRoZSBOVEZTIGFsdGVybmF0aXZlIGRhdGEgc3RyZWFtLlxuICpcbiAqIFRoaXMgY2FuIGZhaWwgaW4gYSBidW5jaCBvZiBzaXR1YXRpb25zOlxuICpcbiAqIC0gVGhlIE9TIGlzIG5vdCBXaW5kb3dzLlxuICogLSBUaGUgZmlsZXN5c3RlbSBpcyBub3QgTlRGUy5cbiAqIC0gV3JpdGluZyB0aGUgbWV0YWRhdGEgZmlsZSBmYWlscyBmb3Igc29tZSByZWFzb24gKHBlcm1pc3Npb25zLCBmb3IgZXhhbXBsZSkuXG4gKiAtIFRoZSBtZXRhZGF0YSBmaWxlIGFscmVhZHkgZXhpc3RzLiAoV2UgY291bGQgY2hvb3NlIHRvIG92ZXJ3cml0ZSBpdC4pXG4gKiAtIFRoZSBvcmlnaW5hbCBmaWxlIGlzIGRlbGV0ZWQgYmV0d2VlbiB0aGUgdGltZSB0aGF0IHdlIGNoZWNrIGZvciBpdHMgZXhpc3RlbmNlIGFuZFxuICogICB3aGVuIHdlIHdyaXRlIHRoZSBtZXRhZGF0YS4gVGhpcyBpcyBhIHJhcmUgcmFjZSBjb25kaXRpb24sIGJ1dCBpcyBwb3NzaWJsZS5cbiAqXG4gKiBDb25zdW1lcnMgb2YgdGhpcyBtb2R1bGUgc2hvdWxkIHByb2JhYmx5IHRvbGVyYXRlIGZhaWx1cmVzLlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVXaW5kb3dzWm9uZUlkZW50aWZpZXIoXG4gIGZpbGVQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8dm9pZD4ge1xuICBpZiAoIWlzV2luZG93cygpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCd3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllciBzaG91bGQgb25seSBydW4gb24gV2luZG93cycpO1xuICB9XG5cbiAgaWYgKCFmcy5leGlzdHNTeW5jKGZpbGVQYXRoKSkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICd3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllciBjb3VsZCBub3QgZmluZCB0aGUgb3JpZ2luYWwgZmlsZSdcbiAgICApO1xuICB9XG5cbiAgYXdhaXQgZnMucHJvbWlzZXMud3JpdGVGaWxlKFxuICAgIGAke2ZpbGVQYXRofTpab25lLklkZW50aWZpZXJgLFxuICAgIFpPTkVfSURFTlRJRklFUl9DT05URU5UUyxcbiAgICB7XG4gICAgICBmbGFnOiAnd3gnLFxuICAgIH1cbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxTQUFvQjtBQUNwQixnQkFBMEI7QUFFMUIsTUFBTSwyQkFBMkIsT0FBTyxLQUFLLDRCQUE0QjtBQW9CekUsMENBQ0UsVUFDZTtBQUNmLE1BQUksQ0FBQyx5QkFBVSxHQUFHO0FBQ2hCLFVBQU0sSUFBSSxNQUFNLHVEQUF1RDtBQUFBLEVBQ3pFO0FBRUEsTUFBSSxDQUFDLEdBQUcsV0FBVyxRQUFRLEdBQUc7QUFDNUIsVUFBTSxJQUFJLE1BQ1IsNkRBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxHQUFHLFNBQVMsVUFDaEIsR0FBRyw0QkFDSCwwQkFDQTtBQUFBLElBQ0UsTUFBTTtBQUFBLEVBQ1IsQ0FDRjtBQUNGO0FBcEJzQiIsCiAgIm5hbWVzIjogW10KfQo=
