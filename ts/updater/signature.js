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
var signature_exports = {};
__export(signature_exports, {
  _getFileHash: () => _getFileHash,
  binaryToHex: () => binaryToHex,
  generateSignature: () => generateSignature,
  getSignatureFileName: () => getSignatureFileName,
  getSignaturePath: () => getSignaturePath,
  hexToBinary: () => hexToBinary,
  loadHexFromPath: () => loadHexFromPath,
  verifySignature: () => verifySignature,
  writeHexToPath: () => writeHexToPath,
  writeSignature: () => writeSignature
});
module.exports = __toCommonJS(signature_exports);
var import_crypto = require("crypto");
var import_fs = require("fs");
var import_promises = require("stream/promises");
var import_path = require("path");
var import_pify = __toESM(require("pify"));
var import_curve = require("./curve");
const readFile = (0, import_pify.default)(import_fs.readFile);
const writeFile = (0, import_pify.default)(import_fs.writeFile);
async function generateSignature(updatePackagePath, version, privateKeyPath) {
  const privateKey = await loadHexFromPath(privateKeyPath);
  const message = await generateMessage(updatePackagePath, version);
  return (0, import_curve.sign)(privateKey, message);
}
async function verifySignature(updatePackagePath, version, signature, publicKey) {
  const message = await generateMessage(updatePackagePath, version);
  return (0, import_curve.verify)(publicKey, message, signature);
}
async function generateMessage(updatePackagePath, version) {
  const hash = await _getFileHash(updatePackagePath);
  const messageString = `${Buffer.from(hash).toString("hex")}-${version}`;
  return Buffer.from(messageString);
}
async function writeSignature(updatePackagePath, version, privateKeyPath) {
  const signaturePath = getSignaturePath(updatePackagePath);
  const signature = await generateSignature(updatePackagePath, version, privateKeyPath);
  await writeHexToPath(signaturePath, signature);
  return signature;
}
async function _getFileHash(updatePackagePath) {
  const hash = (0, import_crypto.createHash)("sha256");
  await (0, import_promises.pipeline)((0, import_fs.createReadStream)(updatePackagePath), hash);
  return hash.digest();
}
function getSignatureFileName(fileName) {
  return `${fileName}.sig`;
}
function getSignaturePath(updatePackagePath) {
  const updateFullPath = (0, import_path.resolve)(updatePackagePath);
  const updateDir = (0, import_path.dirname)(updateFullPath);
  const updateFileName = (0, import_path.basename)(updateFullPath);
  return (0, import_path.join)(updateDir, getSignatureFileName(updateFileName));
}
function hexToBinary(target) {
  return Buffer.from(target, "hex");
}
function binaryToHex(data) {
  return Buffer.from(data).toString("hex");
}
async function loadHexFromPath(target) {
  const hexString = await readFile(target, "utf8");
  return hexToBinary(hexString);
}
async function writeHexToPath(target, data) {
  await writeFile(target, binaryToHex(data));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  _getFileHash,
  binaryToHex,
  generateSignature,
  getSignatureFileName,
  getSignaturePath,
  hexToBinary,
  loadHexFromPath,
  verifySignature,
  writeHexToPath,
  writeSignature
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2lnbmF0dXJlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY3JlYXRlSGFzaCB9IGZyb20gJ2NyeXB0byc7XG5pbXBvcnQge1xuICBjcmVhdGVSZWFkU3RyZWFtLFxuICByZWFkRmlsZSBhcyByZWFkRmlsZUNhbGxiYWNrLFxuICB3cml0ZUZpbGUgYXMgd3JpdGVGaWxlQ2FsbGJhY2ssXG59IGZyb20gJ2ZzJztcbmltcG9ydCB7IHBpcGVsaW5lIH0gZnJvbSAnc3RyZWFtL3Byb21pc2VzJztcbmltcG9ydCB7IGJhc2VuYW1lLCBkaXJuYW1lLCBqb2luLCByZXNvbHZlIGFzIHJlc29sdmVQYXRoIH0gZnJvbSAncGF0aCc7XG5cbmltcG9ydCBwaWZ5IGZyb20gJ3BpZnknO1xuXG5pbXBvcnQgeyBzaWduLCB2ZXJpZnkgfSBmcm9tICcuL2N1cnZlJztcblxuY29uc3QgcmVhZEZpbGUgPSBwaWZ5KHJlYWRGaWxlQ2FsbGJhY2spO1xuY29uc3Qgd3JpdGVGaWxlID0gcGlmeSh3cml0ZUZpbGVDYWxsYmFjayk7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBnZW5lcmF0ZVNpZ25hdHVyZShcbiAgdXBkYXRlUGFja2FnZVBhdGg6IHN0cmluZyxcbiAgdmVyc2lvbjogc3RyaW5nLFxuICBwcml2YXRlS2V5UGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBjb25zdCBwcml2YXRlS2V5ID0gYXdhaXQgbG9hZEhleEZyb21QYXRoKHByaXZhdGVLZXlQYXRoKTtcbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdlbmVyYXRlTWVzc2FnZSh1cGRhdGVQYWNrYWdlUGF0aCwgdmVyc2lvbik7XG5cbiAgcmV0dXJuIHNpZ24ocHJpdmF0ZUtleSwgbWVzc2FnZSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB2ZXJpZnlTaWduYXR1cmUoXG4gIHVwZGF0ZVBhY2thZ2VQYXRoOiBzdHJpbmcsXG4gIHZlcnNpb246IHN0cmluZyxcbiAgc2lnbmF0dXJlOiBCdWZmZXIsXG4gIHB1YmxpY0tleTogQnVmZmVyXG4pOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgY29uc3QgbWVzc2FnZSA9IGF3YWl0IGdlbmVyYXRlTWVzc2FnZSh1cGRhdGVQYWNrYWdlUGF0aCwgdmVyc2lvbik7XG5cbiAgcmV0dXJuIHZlcmlmeShwdWJsaWNLZXksIG1lc3NhZ2UsIHNpZ25hdHVyZSk7XG59XG5cbi8vIEhlbHBlciBtZXRob2RzXG5cbmFzeW5jIGZ1bmN0aW9uIGdlbmVyYXRlTWVzc2FnZShcbiAgdXBkYXRlUGFja2FnZVBhdGg6IHN0cmluZyxcbiAgdmVyc2lvbjogc3RyaW5nXG4pOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBjb25zdCBoYXNoID0gYXdhaXQgX2dldEZpbGVIYXNoKHVwZGF0ZVBhY2thZ2VQYXRoKTtcbiAgY29uc3QgbWVzc2FnZVN0cmluZyA9IGAke0J1ZmZlci5mcm9tKGhhc2gpLnRvU3RyaW5nKCdoZXgnKX0tJHt2ZXJzaW9ufWA7XG5cbiAgcmV0dXJuIEJ1ZmZlci5mcm9tKG1lc3NhZ2VTdHJpbmcpO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gd3JpdGVTaWduYXR1cmUoXG4gIHVwZGF0ZVBhY2thZ2VQYXRoOiBzdHJpbmcsXG4gIHZlcnNpb246IHN0cmluZyxcbiAgcHJpdmF0ZUtleVBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgY29uc3Qgc2lnbmF0dXJlUGF0aCA9IGdldFNpZ25hdHVyZVBhdGgodXBkYXRlUGFja2FnZVBhdGgpO1xuICBjb25zdCBzaWduYXR1cmUgPSBhd2FpdCBnZW5lcmF0ZVNpZ25hdHVyZShcbiAgICB1cGRhdGVQYWNrYWdlUGF0aCxcbiAgICB2ZXJzaW9uLFxuICAgIHByaXZhdGVLZXlQYXRoXG4gICk7XG4gIGF3YWl0IHdyaXRlSGV4VG9QYXRoKHNpZ25hdHVyZVBhdGgsIHNpZ25hdHVyZSk7XG5cbiAgcmV0dXJuIHNpZ25hdHVyZTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIF9nZXRGaWxlSGFzaCh1cGRhdGVQYWNrYWdlUGF0aDogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+IHtcbiAgY29uc3QgaGFzaCA9IGNyZWF0ZUhhc2goJ3NoYTI1NicpO1xuICBhd2FpdCBwaXBlbGluZShjcmVhdGVSZWFkU3RyZWFtKHVwZGF0ZVBhY2thZ2VQYXRoKSwgaGFzaCk7XG5cbiAgcmV0dXJuIGhhc2guZGlnZXN0KCk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRTaWduYXR1cmVGaWxlTmFtZShmaWxlTmFtZTogc3RyaW5nKTogc3RyaW5nIHtcbiAgcmV0dXJuIGAke2ZpbGVOYW1lfS5zaWdgO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2lnbmF0dXJlUGF0aCh1cGRhdGVQYWNrYWdlUGF0aDogc3RyaW5nKTogc3RyaW5nIHtcbiAgY29uc3QgdXBkYXRlRnVsbFBhdGggPSByZXNvbHZlUGF0aCh1cGRhdGVQYWNrYWdlUGF0aCk7XG4gIGNvbnN0IHVwZGF0ZURpciA9IGRpcm5hbWUodXBkYXRlRnVsbFBhdGgpO1xuICBjb25zdCB1cGRhdGVGaWxlTmFtZSA9IGJhc2VuYW1lKHVwZGF0ZUZ1bGxQYXRoKTtcblxuICByZXR1cm4gam9pbih1cGRhdGVEaXIsIGdldFNpZ25hdHVyZUZpbGVOYW1lKHVwZGF0ZUZpbGVOYW1lKSk7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoZXhUb0JpbmFyeSh0YXJnZXQ6IHN0cmluZyk6IEJ1ZmZlciB7XG4gIHJldHVybiBCdWZmZXIuZnJvbSh0YXJnZXQsICdoZXgnKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVRvSGV4KGRhdGE6IEJ1ZmZlcik6IHN0cmluZyB7XG4gIHJldHVybiBCdWZmZXIuZnJvbShkYXRhKS50b1N0cmluZygnaGV4Jyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBsb2FkSGV4RnJvbVBhdGgodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4ge1xuICBjb25zdCBoZXhTdHJpbmcgPSBhd2FpdCByZWFkRmlsZSh0YXJnZXQsICd1dGY4Jyk7XG5cbiAgcmV0dXJuIGhleFRvQmluYXJ5KGhleFN0cmluZyk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiB3cml0ZUhleFRvUGF0aChcbiAgdGFyZ2V0OiBzdHJpbmcsXG4gIGRhdGE6IEJ1ZmZlclxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IHdyaXRlRmlsZSh0YXJnZXQsIGJpbmFyeVRvSGV4KGRhdGEpKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBMkI7QUFDM0IsZ0JBSU87QUFDUCxzQkFBeUI7QUFDekIsa0JBQWdFO0FBRWhFLGtCQUFpQjtBQUVqQixtQkFBNkI7QUFFN0IsTUFBTSxXQUFXLHlCQUFLLGtCQUFnQjtBQUN0QyxNQUFNLFlBQVkseUJBQUssbUJBQWlCO0FBRXhDLGlDQUNFLG1CQUNBLFNBQ0EsZ0JBQ2lCO0FBQ2pCLFFBQU0sYUFBYSxNQUFNLGdCQUFnQixjQUFjO0FBQ3ZELFFBQU0sVUFBVSxNQUFNLGdCQUFnQixtQkFBbUIsT0FBTztBQUVoRSxTQUFPLHVCQUFLLFlBQVksT0FBTztBQUNqQztBQVRzQixBQVd0QiwrQkFDRSxtQkFDQSxTQUNBLFdBQ0EsV0FDa0I7QUFDbEIsUUFBTSxVQUFVLE1BQU0sZ0JBQWdCLG1CQUFtQixPQUFPO0FBRWhFLFNBQU8seUJBQU8sV0FBVyxTQUFTLFNBQVM7QUFDN0M7QUFUc0IsQUFhdEIsK0JBQ0UsbUJBQ0EsU0FDaUI7QUFDakIsUUFBTSxPQUFPLE1BQU0sYUFBYSxpQkFBaUI7QUFDakQsUUFBTSxnQkFBZ0IsR0FBRyxPQUFPLEtBQUssSUFBSSxFQUFFLFNBQVMsS0FBSyxLQUFLO0FBRTlELFNBQU8sT0FBTyxLQUFLLGFBQWE7QUFDbEM7QUFSZSxBQVVmLDhCQUNFLG1CQUNBLFNBQ0EsZ0JBQ2lCO0FBQ2pCLFFBQU0sZ0JBQWdCLGlCQUFpQixpQkFBaUI7QUFDeEQsUUFBTSxZQUFZLE1BQU0sa0JBQ3RCLG1CQUNBLFNBQ0EsY0FDRjtBQUNBLFFBQU0sZUFBZSxlQUFlLFNBQVM7QUFFN0MsU0FBTztBQUNUO0FBZHNCLEFBZ0J0Qiw0QkFBbUMsbUJBQTRDO0FBQzdFLFFBQU0sT0FBTyw4QkFBVyxRQUFRO0FBQ2hDLFFBQU0sOEJBQVMsZ0NBQWlCLGlCQUFpQixHQUFHLElBQUk7QUFFeEQsU0FBTyxLQUFLLE9BQU87QUFDckI7QUFMc0IsQUFPZiw4QkFBOEIsVUFBMEI7QUFDN0QsU0FBTyxHQUFHO0FBQ1o7QUFGZ0IsQUFJVCwwQkFBMEIsbUJBQW1DO0FBQ2xFLFFBQU0saUJBQWlCLHlCQUFZLGlCQUFpQjtBQUNwRCxRQUFNLFlBQVkseUJBQVEsY0FBYztBQUN4QyxRQUFNLGlCQUFpQiwwQkFBUyxjQUFjO0FBRTlDLFNBQU8sc0JBQUssV0FBVyxxQkFBcUIsY0FBYyxDQUFDO0FBQzdEO0FBTmdCLEFBUVQscUJBQXFCLFFBQXdCO0FBQ2xELFNBQU8sT0FBTyxLQUFLLFFBQVEsS0FBSztBQUNsQztBQUZnQixBQUlULHFCQUFxQixNQUFzQjtBQUNoRCxTQUFPLE9BQU8sS0FBSyxJQUFJLEVBQUUsU0FBUyxLQUFLO0FBQ3pDO0FBRmdCLEFBSWhCLCtCQUFzQyxRQUFpQztBQUNyRSxRQUFNLFlBQVksTUFBTSxTQUFTLFFBQVEsTUFBTTtBQUUvQyxTQUFPLFlBQVksU0FBUztBQUM5QjtBQUpzQixBQU10Qiw4QkFDRSxRQUNBLE1BQ2U7QUFDZixRQUFNLFVBQVUsUUFBUSxZQUFZLElBQUksQ0FBQztBQUMzQztBQUxzQiIsCiAgIm5hbWVzIjogW10KfQo=
