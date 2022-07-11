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
var limits_exports = {};
__export(limits_exports, {
  getGroupSizeHardLimit: () => getGroupSizeHardLimit,
  getGroupSizeRecommendedLimit: () => getGroupSizeRecommendedLimit
});
module.exports = __toCommonJS(limits_exports);
var import_lodash = require("lodash");
var import_parseIntOrThrow = require("../util/parseIntOrThrow");
var import_RemoteConfig = require("../RemoteConfig");
function makeGetter(configKey) {
  return (fallback) => {
    try {
      return (0, import_parseIntOrThrow.parseIntOrThrow)((0, import_RemoteConfig.getValue)(configKey), `Failed to parse ${configKey} as an integer`);
    } catch (err) {
      if ((0, import_lodash.isNumber)(fallback)) {
        return fallback;
      }
      throw err;
    }
  };
}
const getGroupSizeRecommendedLimit = makeGetter("global.groupsv2.maxGroupSize");
const getGroupSizeHardLimit = makeGetter("global.groupsv2.groupSizeHardLimit");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getGroupSizeHardLimit,
  getGroupSizeRecommendedLimit
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsibGltaXRzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IHBhcnNlSW50T3JUaHJvdyB9IGZyb20gJy4uL3V0aWwvcGFyc2VJbnRPclRocm93JztcbmltcG9ydCB0eXBlIHsgQ29uZmlnS2V5VHlwZSB9IGZyb20gJy4uL1JlbW90ZUNvbmZpZyc7XG5pbXBvcnQgeyBnZXRWYWx1ZSB9IGZyb20gJy4uL1JlbW90ZUNvbmZpZyc7XG5cbmZ1bmN0aW9uIG1ha2VHZXR0ZXIoY29uZmlnS2V5OiBDb25maWdLZXlUeXBlKTogKGZhbGxiYWNrPzogbnVtYmVyKSA9PiBudW1iZXIge1xuICByZXR1cm4gZmFsbGJhY2sgPT4ge1xuICAgIHRyeSB7XG4gICAgICByZXR1cm4gcGFyc2VJbnRPclRocm93KFxuICAgICAgICBnZXRWYWx1ZShjb25maWdLZXkpLFxuICAgICAgICBgRmFpbGVkIHRvIHBhcnNlICR7Y29uZmlnS2V5fSBhcyBhbiBpbnRlZ2VyYFxuICAgICAgKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChpc051bWJlcihmYWxsYmFjaykpIHtcbiAgICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgfVxuICAgICAgdGhyb3cgZXJyO1xuICAgIH1cbiAgfTtcbn1cblxuZXhwb3J0IGNvbnN0IGdldEdyb3VwU2l6ZVJlY29tbWVuZGVkTGltaXQgPSBtYWtlR2V0dGVyKFxuICAnZ2xvYmFsLmdyb3Vwc3YyLm1heEdyb3VwU2l6ZSdcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRHcm91cFNpemVIYXJkTGltaXQgPSBtYWtlR2V0dGVyKFxuICAnZ2xvYmFsLmdyb3Vwc3YyLmdyb3VwU2l6ZUhhcmRMaW1pdCdcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUI7QUFDekIsNkJBQWdDO0FBRWhDLDBCQUF5QjtBQUV6QixvQkFBb0IsV0FBeUQ7QUFDM0UsU0FBTyxjQUFZO0FBQ2pCLFFBQUk7QUFDRixhQUFPLDRDQUNMLGtDQUFTLFNBQVMsR0FDbEIsbUJBQW1CLHlCQUNyQjtBQUFBLElBQ0YsU0FBUyxLQUFQO0FBQ0EsVUFBSSw0QkFBUyxRQUFRLEdBQUc7QUFDdEIsZUFBTztBQUFBLE1BQ1Q7QUFDQSxZQUFNO0FBQUEsSUFDUjtBQUFBLEVBQ0Y7QUFDRjtBQWRTLEFBZ0JGLE1BQU0sK0JBQStCLFdBQzFDLDhCQUNGO0FBRU8sTUFBTSx3QkFBd0IsV0FDbkMsb0NBQ0Y7IiwKICAibmFtZXMiOiBbXQp9Cg==
