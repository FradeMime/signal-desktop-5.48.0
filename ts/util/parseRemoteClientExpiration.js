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
var parseRemoteClientExpiration_exports = {};
__export(parseRemoteClientExpiration_exports, {
  parseRemoteClientExpiration: () => parseRemoteClientExpiration
});
module.exports = __toCommonJS(parseRemoteClientExpiration_exports);
var import_semver = __toESM(require("semver"));
function parseRemoteClientExpiration(remoteExpirationValue) {
  const remoteVersions = JSON.parse(remoteExpirationValue) || [];
  const ourVersion = window.getVersion();
  return remoteVersions.reduce((acc, remoteVersion) => {
    const minVersion = remoteVersion["min-version"];
    const { iso8601 } = remoteVersion;
    if (import_semver.default.gt(minVersion, ourVersion)) {
      const timestamp = new Date(iso8601).getTime();
      if (!acc) {
        return timestamp;
      }
      return timestamp < acc ? timestamp : acc;
    }
    return acc;
  }, null);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseRemoteClientExpiration
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VSZW1vdGVDbGllbnRFeHBpcmF0aW9uLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBzZW12ZXIgZnJvbSAnc2VtdmVyJztcblxudHlwZSBSZW1vdGVWZXJzaW9uID0ge1xuICAnbWluLXZlcnNpb24nOiBzdHJpbmc7XG4gIGlzbzg2MDE6IHN0cmluZztcbn07XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZVJlbW90ZUNsaWVudEV4cGlyYXRpb24oXG4gIHJlbW90ZUV4cGlyYXRpb25WYWx1ZTogc3RyaW5nXG4pOiBudW1iZXIgfCBudWxsIHtcbiAgY29uc3QgcmVtb3RlVmVyc2lvbnMgPSBKU09OLnBhcnNlKHJlbW90ZUV4cGlyYXRpb25WYWx1ZSkgfHwgW107XG4gIGNvbnN0IG91clZlcnNpb24gPSB3aW5kb3cuZ2V0VmVyc2lvbigpO1xuXG4gIHJldHVybiByZW1vdGVWZXJzaW9ucy5yZWR1Y2UoXG4gICAgKGFjYzogbnVtYmVyIHwgbnVsbCwgcmVtb3RlVmVyc2lvbjogUmVtb3RlVmVyc2lvbikgPT4ge1xuICAgICAgY29uc3QgbWluVmVyc2lvbiA9IHJlbW90ZVZlcnNpb25bJ21pbi12ZXJzaW9uJ107XG4gICAgICBjb25zdCB7IGlzbzg2MDEgfSA9IHJlbW90ZVZlcnNpb247XG5cbiAgICAgIGlmIChzZW12ZXIuZ3QobWluVmVyc2lvbiwgb3VyVmVyc2lvbikpIHtcbiAgICAgICAgY29uc3QgdGltZXN0YW1wID0gbmV3IERhdGUoaXNvODYwMSkuZ2V0VGltZSgpO1xuXG4gICAgICAgIGlmICghYWNjKSB7XG4gICAgICAgICAgcmV0dXJuIHRpbWVzdGFtcDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aW1lc3RhbXAgPCBhY2MgPyB0aW1lc3RhbXAgOiBhY2M7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2M7XG4gICAgfSxcbiAgICBudWxsXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQW1CO0FBT1oscUNBQ0wsdUJBQ2U7QUFDZixRQUFNLGlCQUFpQixLQUFLLE1BQU0scUJBQXFCLEtBQUssQ0FBQztBQUM3RCxRQUFNLGFBQWEsT0FBTyxXQUFXO0FBRXJDLFNBQU8sZUFBZSxPQUNwQixDQUFDLEtBQW9CLGtCQUFpQztBQUNwRCxVQUFNLGFBQWEsY0FBYztBQUNqQyxVQUFNLEVBQUUsWUFBWTtBQUVwQixRQUFJLHNCQUFPLEdBQUcsWUFBWSxVQUFVLEdBQUc7QUFDckMsWUFBTSxZQUFZLElBQUksS0FBSyxPQUFPLEVBQUUsUUFBUTtBQUU1QyxVQUFJLENBQUMsS0FBSztBQUNSLGVBQU87QUFBQSxNQUNUO0FBRUEsYUFBTyxZQUFZLE1BQU0sWUFBWTtBQUFBLElBQ3ZDO0FBRUEsV0FBTztBQUFBLEVBQ1QsR0FDQSxJQUNGO0FBQ0Y7QUF6QmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
