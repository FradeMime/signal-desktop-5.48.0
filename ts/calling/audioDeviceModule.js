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
var audioDeviceModule_exports = {};
__export(audioDeviceModule_exports, {
  AudioDeviceModule: () => AudioDeviceModule,
  getAudioDeviceModule: () => getAudioDeviceModule,
  parseAudioDeviceModule: () => parseAudioDeviceModule
});
module.exports = __toCommonJS(audioDeviceModule_exports);
var import_enum = require("../util/enum");
var OS = __toESM(require("../OS"));
var AudioDeviceModule = /* @__PURE__ */ ((AudioDeviceModule2) => {
  AudioDeviceModule2["Default"] = "Default";
  AudioDeviceModule2["WindowsAdm2"] = "WindowsAdm2";
  return AudioDeviceModule2;
})(AudioDeviceModule || {});
const parseAudioDeviceModule = (0, import_enum.makeEnumParser)(AudioDeviceModule, "Default" /* Default */);
const getAudioDeviceModule = /* @__PURE__ */ __name(() => OS.isWindows() ? "WindowsAdm2" /* WindowsAdm2 */ : "Default" /* Default */, "getAudioDeviceModule");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AudioDeviceModule,
  getAudioDeviceModule,
  parseAudioDeviceModule
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXVkaW9EZXZpY2VNb2R1bGUudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgbWFrZUVudW1QYXJzZXIgfSBmcm9tICcuLi91dGlsL2VudW0nO1xuaW1wb3J0ICogYXMgT1MgZnJvbSAnLi4vT1MnO1xuXG5leHBvcnQgZW51bSBBdWRpb0RldmljZU1vZHVsZSB7XG4gIERlZmF1bHQgPSAnRGVmYXVsdCcsXG4gIFdpbmRvd3NBZG0yID0gJ1dpbmRvd3NBZG0yJyxcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlQXVkaW9EZXZpY2VNb2R1bGUgPSBtYWtlRW51bVBhcnNlcihcbiAgQXVkaW9EZXZpY2VNb2R1bGUsXG4gIEF1ZGlvRGV2aWNlTW9kdWxlLkRlZmF1bHRcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRBdWRpb0RldmljZU1vZHVsZSA9ICgpOiBBdWRpb0RldmljZU1vZHVsZSA9PlxuICBPUy5pc1dpbmRvd3MoKSA/IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yIDogQXVkaW9EZXZpY2VNb2R1bGUuRGVmYXVsdDtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQStCO0FBQy9CLFNBQW9CO0FBRWIsSUFBSyxvQkFBTCxrQkFBSyx1QkFBTDtBQUNMLGtDQUFVO0FBQ1Ysc0NBQWM7QUFGSjtBQUFBO0FBS0wsTUFBTSx5QkFBeUIsZ0NBQ3BDLG1CQUNBLHVCQUNGO0FBRU8sTUFBTSx1QkFBdUIsNkJBQ2xDLEdBQUcsVUFBVSxJQUFJLGtDQUFnQyx5QkFEZjsiLAogICJuYW1lcyI6IFtdCn0K
