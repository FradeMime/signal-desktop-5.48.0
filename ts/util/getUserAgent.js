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
var getUserAgent_exports = {};
__export(getUserAgent_exports, {
  getUserAgent: () => getUserAgent
});
module.exports = __toCommonJS(getUserAgent_exports);
var import_os = __toESM(require("os"));
var import_getOwn = require("./getOwn");
const PLATFORM_STRINGS = {
  win32: "Windows",
  darwin: "macOS",
  linux: "Linux"
};
function getUserAgent(appVersion, release = import_os.default.release()) {
  const platformString = (0, import_getOwn.getOwn)(PLATFORM_STRINGS, process.platform);
  let result = `Signal-Desktop/${appVersion}`;
  if (platformString) {
    result += ` ${platformString} ${release}`;
  }
  return result;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getUserAgent
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0VXNlckFnZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBvcyBmcm9tICdvcyc7XG5cbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4vZ2V0T3duJztcblxuY29uc3QgUExBVEZPUk1fU1RSSU5HUzogeyBbcGxhdGZvcm06IHN0cmluZ106IHN0cmluZyB9ID0ge1xuICB3aW4zMjogJ1dpbmRvd3MnLFxuICBkYXJ3aW46ICdtYWNPUycsXG4gIGxpbnV4OiAnTGludXgnLFxufTtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFVzZXJBZ2VudChcbiAgYXBwVmVyc2lvbjogc3RyaW5nLFxuICByZWxlYXNlID0gb3MucmVsZWFzZSgpXG4pOiBzdHJpbmcge1xuICAvLyBgcHJvY2Vzcy5wbGF0Zm9ybWAgY291bGQgYmUgbWlzc2luZyBpZiBzb21lb25lIGZpZ3VyZXMgb3V0IGhvdyB0byBjb21waWxlIFNpZ25hbCBvblxuICAvLyAgIGFuIHVuc3VwcG9ydGVkIE9TIGFuZCBmb3JnZXRzIHRvIHVwZGF0ZSB0aGlzIGZpbGUuIFdlJ2QgcmF0aGVyIHNlbmQgbm90aGluZyB0aGFuXG4gIC8vICAgY3Jhc2guXG4gIGNvbnN0IHBsYXRmb3JtU3RyaW5nID0gZ2V0T3duKFBMQVRGT1JNX1NUUklOR1MsIHByb2Nlc3MucGxhdGZvcm0pO1xuXG4gIGxldCByZXN1bHQgPSBgU2lnbmFsLURlc2t0b3AvJHthcHBWZXJzaW9ufWA7XG4gIGlmIChwbGF0Zm9ybVN0cmluZykge1xuICAgIHJlc3VsdCArPSBgICR7cGxhdGZvcm1TdHJpbmd9ICR7cmVsZWFzZX1gO1xuICB9XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxnQkFBZTtBQUVmLG9CQUF1QjtBQUV2QixNQUFNLG1CQUFtRDtBQUFBLEVBQ3ZELE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLE9BQU87QUFDVDtBQUVPLHNCQUNMLFlBQ0EsVUFBVSxrQkFBRyxRQUFRLEdBQ2I7QUFJUixRQUFNLGlCQUFpQiwwQkFBTyxrQkFBa0IsUUFBUSxRQUFRO0FBRWhFLE1BQUksU0FBUyxrQkFBa0I7QUFDL0IsTUFBSSxnQkFBZ0I7QUFDbEIsY0FBVSxJQUFJLGtCQUFrQjtBQUFBLEVBQ2xDO0FBRUEsU0FBTztBQUNUO0FBZmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
