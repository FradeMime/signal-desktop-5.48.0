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
var isFileDangerous_exports = {};
__export(isFileDangerous_exports, {
  isFileDangerous: () => isFileDangerous
});
module.exports = __toCommonJS(isFileDangerous_exports);
const DANGEROUS_FILE_TYPES = /\.(ADE|ADP|APK|BAT|CAB|CHM|CMD|COM|CPL|DIAGCAB|DLL|DMG|EXE|HTA|INF|INS|ISP|JAR|JS|JSE|LIB|LNK|MDE|MHT|MSC|MSI|MSP|MST|NSH|PIF|PS1|PSC1|PSM1|PSRC|REG|SCR|SCT|SETTINGCONTENT-MS|SHB|SYS|VB|VBE|VBS|VXD|WSC|WSF|WSH)\.?$/i;
function isFileDangerous(fileName) {
  return DANGEROUS_FILE_TYPES.test(fileName);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isFileDangerous
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNGaWxlRGFuZ2Vyb3VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOC0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuY29uc3QgREFOR0VST1VTX0ZJTEVfVFlQRVMgPVxuICAvXFwuKEFERXxBRFB8QVBLfEJBVHxDQUJ8Q0hNfENNRHxDT018Q1BMfERJQUdDQUJ8RExMfERNR3xFWEV8SFRBfElORnxJTlN8SVNQfEpBUnxKU3xKU0V8TElCfExOS3xNREV8TUhUfE1TQ3xNU0l8TVNQfE1TVHxOU0h8UElGfFBTMXxQU0MxfFBTTTF8UFNSQ3xSRUd8U0NSfFNDVHxTRVRUSU5HQ09OVEVOVC1NU3xTSEJ8U1lTfFZCfFZCRXxWQlN8VlhEfFdTQ3xXU0Z8V1NIKVxcLj8kL2k7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0ZpbGVEYW5nZXJvdXMoZmlsZU5hbWU6IHN0cmluZyk6IGJvb2xlYW4ge1xuICByZXR1cm4gREFOR0VST1VTX0ZJTEVfVFlQRVMudGVzdChmaWxlTmFtZSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsTUFBTSx1QkFDSjtBQUVLLHlCQUF5QixVQUEyQjtBQUN6RCxTQUFPLHFCQUFxQixLQUFLLFFBQVE7QUFDM0M7QUFGZ0IiLAogICJuYW1lcyI6IFtdCn0K
