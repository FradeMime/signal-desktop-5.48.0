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
var hasExpired_exports = {};
__export(hasExpired_exports, {
  hasExpired: () => hasExpired
});
module.exports = __toCommonJS(hasExpired_exports);
var import_environment = require("../environment");
var import_timestamp = require("./timestamp");
var log = __toESM(require("../logging/log"));
const ONE_DAY_MS = 86400 * 1e3;
const NINETY_ONE_DAYS = 91 * ONE_DAY_MS;
const THIRTY_ONE_DAYS = 31 * ONE_DAY_MS;
function hasExpired() {
  let buildExpiration = 0;
  try {
    buildExpiration = window.getExpiration();
    if (buildExpiration) {
      log.info("Build expires: ", new Date(buildExpiration).toISOString());
    }
  } catch (e) {
    log.error("Error retrieving build expiration date", e.stack);
    return true;
  }
  if ((0, import_environment.getEnvironment)() === import_environment.Environment.Production) {
    const safeExpirationMs = window.Events.getAutoDownloadUpdate() ? NINETY_ONE_DAYS : THIRTY_ONE_DAYS;
    const buildExpirationDuration = buildExpiration - Date.now();
    const tooFarIntoFuture = buildExpirationDuration > safeExpirationMs;
    if (tooFarIntoFuture) {
      log.error("Build expiration is set too far into the future", buildExpiration);
    }
    return tooFarIntoFuture || (0, import_timestamp.isInPast)(buildExpiration);
  }
  return buildExpiration !== 0 && (0, import_timestamp.isInPast)(buildExpiration);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  hasExpired
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFzRXhwaXJlZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBFbnZpcm9ubWVudCwgZ2V0RW52aXJvbm1lbnQgfSBmcm9tICcuLi9lbnZpcm9ubWVudCc7XG5pbXBvcnQgeyBpc0luUGFzdCB9IGZyb20gJy4vdGltZXN0YW1wJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5cbmNvbnN0IE9ORV9EQVlfTVMgPSA4NjQwMCAqIDEwMDA7XG5jb25zdCBOSU5FVFlfT05FX0RBWVMgPSA5MSAqIE9ORV9EQVlfTVM7XG5jb25zdCBUSElSVFlfT05FX0RBWVMgPSAzMSAqIE9ORV9EQVlfTVM7XG5cbmV4cG9ydCBmdW5jdGlvbiBoYXNFeHBpcmVkKCk6IGJvb2xlYW4ge1xuICBsZXQgYnVpbGRFeHBpcmF0aW9uID0gMDtcblxuICB0cnkge1xuICAgIGJ1aWxkRXhwaXJhdGlvbiA9IHdpbmRvdy5nZXRFeHBpcmF0aW9uKCk7XG4gICAgaWYgKGJ1aWxkRXhwaXJhdGlvbikge1xuICAgICAgbG9nLmluZm8oJ0J1aWxkIGV4cGlyZXM6ICcsIG5ldyBEYXRlKGJ1aWxkRXhwaXJhdGlvbikudG9JU09TdHJpbmcoKSk7XG4gICAgfVxuICB9IGNhdGNoIChlKSB7XG4gICAgbG9nLmVycm9yKCdFcnJvciByZXRyaWV2aW5nIGJ1aWxkIGV4cGlyYXRpb24gZGF0ZScsIGUuc3RhY2spO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH1cblxuICBpZiAoZ2V0RW52aXJvbm1lbnQoKSA9PT0gRW52aXJvbm1lbnQuUHJvZHVjdGlvbikge1xuICAgIGNvbnN0IHNhZmVFeHBpcmF0aW9uTXMgPSB3aW5kb3cuRXZlbnRzLmdldEF1dG9Eb3dubG9hZFVwZGF0ZSgpXG4gICAgICA/IE5JTkVUWV9PTkVfREFZU1xuICAgICAgOiBUSElSVFlfT05FX0RBWVM7XG5cbiAgICBjb25zdCBidWlsZEV4cGlyYXRpb25EdXJhdGlvbiA9IGJ1aWxkRXhwaXJhdGlvbiAtIERhdGUubm93KCk7XG4gICAgY29uc3QgdG9vRmFySW50b0Z1dHVyZSA9IGJ1aWxkRXhwaXJhdGlvbkR1cmF0aW9uID4gc2FmZUV4cGlyYXRpb25NcztcblxuICAgIGlmICh0b29GYXJJbnRvRnV0dXJlKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgICdCdWlsZCBleHBpcmF0aW9uIGlzIHNldCB0b28gZmFyIGludG8gdGhlIGZ1dHVyZScsXG4gICAgICAgIGJ1aWxkRXhwaXJhdGlvblxuICAgICAgKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdG9vRmFySW50b0Z1dHVyZSB8fCBpc0luUGFzdChidWlsZEV4cGlyYXRpb24pO1xuICB9XG5cbiAgcmV0dXJuIGJ1aWxkRXhwaXJhdGlvbiAhPT0gMCAmJiBpc0luUGFzdChidWlsZEV4cGlyYXRpb24pO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUE0QztBQUM1Qyx1QkFBeUI7QUFDekIsVUFBcUI7QUFFckIsTUFBTSxhQUFhLFFBQVE7QUFDM0IsTUFBTSxrQkFBa0IsS0FBSztBQUM3QixNQUFNLGtCQUFrQixLQUFLO0FBRXRCLHNCQUErQjtBQUNwQyxNQUFJLGtCQUFrQjtBQUV0QixNQUFJO0FBQ0Ysc0JBQWtCLE9BQU8sY0FBYztBQUN2QyxRQUFJLGlCQUFpQjtBQUNuQixVQUFJLEtBQUssbUJBQW1CLElBQUksS0FBSyxlQUFlLEVBQUUsWUFBWSxDQUFDO0FBQUEsSUFDckU7QUFBQSxFQUNGLFNBQVMsR0FBUDtBQUNBLFFBQUksTUFBTSwwQ0FBMEMsRUFBRSxLQUFLO0FBRTNELFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSx1Q0FBZSxNQUFNLCtCQUFZLFlBQVk7QUFDL0MsVUFBTSxtQkFBbUIsT0FBTyxPQUFPLHNCQUFzQixJQUN6RCxrQkFDQTtBQUVKLFVBQU0sMEJBQTBCLGtCQUFrQixLQUFLLElBQUk7QUFDM0QsVUFBTSxtQkFBbUIsMEJBQTBCO0FBRW5ELFFBQUksa0JBQWtCO0FBQ3BCLFVBQUksTUFDRixtREFDQSxlQUNGO0FBQUEsSUFDRjtBQUVBLFdBQU8sb0JBQW9CLCtCQUFTLGVBQWU7QUFBQSxFQUNyRDtBQUVBLFNBQU8sb0JBQW9CLEtBQUssK0JBQVMsZUFBZTtBQUMxRDtBQWpDZ0IiLAogICJuYW1lcyI6IFtdCn0K
