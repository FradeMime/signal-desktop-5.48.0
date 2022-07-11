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
var timestampLongUtils_exports = {};
__export(timestampLongUtils_exports, {
  getSafeLongFromTimestamp: () => getSafeLongFromTimestamp,
  getTimestampFromLong: () => getTimestampFromLong
});
module.exports = __toCommonJS(timestampLongUtils_exports);
var import_long = __toESM(require("long"));
function getSafeLongFromTimestamp(timestamp = 0) {
  if (timestamp >= Number.MAX_SAFE_INTEGER) {
    return import_long.default.MAX_VALUE;
  }
  return import_long.default.fromNumber(timestamp);
}
function getTimestampFromLong(value) {
  if (!value) {
    return 0;
  }
  const num = value.toNumber();
  if (num >= Number.MAX_SAFE_INTEGER) {
    return Number.MAX_SAFE_INTEGER;
  }
  return num;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getSafeLongFromTimestamp,
  getTimestampFromLong
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZXN0YW1wTG9uZ1V0aWxzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBMb25nIGZyb20gJ2xvbmcnO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0U2FmZUxvbmdGcm9tVGltZXN0YW1wKHRpbWVzdGFtcCA9IDApOiBMb25nIHtcbiAgaWYgKHRpbWVzdGFtcCA+PSBOdW1iZXIuTUFYX1NBRkVfSU5URUdFUikge1xuICAgIHJldHVybiBMb25nLk1BWF9WQUxVRTtcbiAgfVxuXG4gIHJldHVybiBMb25nLmZyb21OdW1iZXIodGltZXN0YW1wKTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGdldFRpbWVzdGFtcEZyb21Mb25nKHZhbHVlPzogTG9uZyB8IG51bGwpOiBudW1iZXIge1xuICBpZiAoIXZhbHVlKSB7XG4gICAgcmV0dXJuIDA7XG4gIH1cblxuICBjb25zdCBudW0gPSB2YWx1ZS50b051bWJlcigpO1xuXG4gIGlmIChudW0gPj0gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVIpIHtcbiAgICByZXR1cm4gTnVtYmVyLk1BWF9TQUZFX0lOVEVHRVI7XG4gIH1cblxuICByZXR1cm4gbnVtO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQWlCO0FBRVYsa0NBQWtDLFlBQVksR0FBUztBQUM1RCxNQUFJLGFBQWEsT0FBTyxrQkFBa0I7QUFDeEMsV0FBTyxvQkFBSztBQUFBLEVBQ2Q7QUFFQSxTQUFPLG9CQUFLLFdBQVcsU0FBUztBQUNsQztBQU5nQixBQVFULDhCQUE4QixPQUE2QjtBQUNoRSxNQUFJLENBQUMsT0FBTztBQUNWLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxNQUFNLE1BQU0sU0FBUztBQUUzQixNQUFJLE9BQU8sT0FBTyxrQkFBa0I7QUFDbEMsV0FBTyxPQUFPO0FBQUEsRUFDaEI7QUFFQSxTQUFPO0FBQ1Q7QUFaZ0IiLAogICJuYW1lcyI6IFtdCn0K
