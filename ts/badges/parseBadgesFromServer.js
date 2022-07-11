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
var parseBadgesFromServer_exports = {};
__export(parseBadgesFromServer_exports, {
  parseBadgeFromServer: () => parseBadgeFromServer,
  parseBadgesFromServer: () => parseBadgesFromServer,
  parseBoostBadgeListFromServer: () => parseBoostBadgeListFromServer
});
module.exports = __toCommonJS(parseBadgesFromServer_exports);
var z = __toESM(require("zod"));
var import_lodash = require("lodash");
var import_isRecord = require("../util/isRecord");
var import_isNormalNumber = require("../util/isNormalNumber");
var log = __toESM(require("../logging/log"));
var import_BadgeCategory = require("./BadgeCategory");
var import_BadgeImageTheme = require("./BadgeImageTheme");
const MAX_BADGES = 1e3;
const badgeFromServerSchema = z.object({
  category: z.string(),
  description: z.string(),
  id: z.string(),
  name: z.string(),
  svg: z.string(),
  svgs: z.array(z.record(z.string())).length(3),
  expiration: z.number().optional(),
  visible: z.boolean().optional()
});
const boostBadgesFromServerSchema = z.object({
  levels: z.record(z.object({
    badge: z.unknown()
  }).or(z.undefined()))
});
function parseBoostBadgeListFromServer(value, updatesUrl) {
  const result = {};
  const parseResult = boostBadgesFromServerSchema.safeParse(value);
  if (!parseResult.success) {
    log.warn("parseBoostBadgeListFromServer: server response was invalid:", parseResult.error.format());
    throw new Error("parseBoostBadgeListFromServer: Failed to parse server response");
  }
  const boostBadges = parseResult.data;
  Object.keys(boostBadges.levels).forEach((level) => {
    const item = boostBadges.levels[level];
    if (!item) {
      log.warn(`parseBoostBadgeListFromServer: level ${level} had no badge`);
      return;
    }
    const parsed = parseBadgeFromServer(item.badge, updatesUrl);
    if (parsed) {
      result[level] = parsed;
    }
  });
  return result;
}
function parseBadgeFromServer(value, updatesUrl) {
  const parseResult = badgeFromServerSchema.safeParse(value);
  if (!parseResult.success) {
    log.warn("parseBadgeFromServer: badge was invalid:", parseResult.error.format());
    return void 0;
  }
  const {
    category,
    description: descriptionTemplate,
    expiration,
    id,
    name,
    svg,
    svgs,
    visible
  } = parseResult.data;
  const images = parseImages(svgs, svg, updatesUrl);
  if (images.length !== 4) {
    log.warn("Got invalid number of SVGs from the server");
    return void 0;
  }
  return {
    id,
    category: (0, import_BadgeCategory.parseBadgeCategory)(category),
    name,
    descriptionTemplate,
    images,
    ...(0, import_isNormalNumber.isNormalNumber)(expiration) && typeof visible === "boolean" ? {
      expiresAt: expiration * 1e3,
      isVisible: visible
    } : {}
  };
}
function parseBadgesFromServer(value, updatesUrl) {
  if (!Array.isArray(value)) {
    return [];
  }
  const result = [];
  const numberOfBadgesToParse = Math.min(value.length, MAX_BADGES);
  for (let i = 0; i < numberOfBadgesToParse; i += 1) {
    const item = value[i];
    const parsed = parseBadgeFromServer(item, updatesUrl);
    if (!parsed) {
      continue;
    }
    result.push(parsed);
  }
  return result;
}
const parseImages = /* @__PURE__ */ __name((rawSvgs, rawSvg, updatesUrl) => {
  const result = [];
  for (const item of rawSvgs) {
    if (!(0, import_isRecord.isRecord)(item)) {
      log.warn("Got invalid SVG from the server");
      continue;
    }
    const image = {};
    for (const [rawTheme, filename] of Object.entries(item)) {
      if (typeof filename !== "string") {
        log.warn("Got an SVG from the server that lacked a valid filename");
        continue;
      }
      const theme = (0, import_BadgeImageTheme.parseBadgeImageTheme)(rawTheme);
      image[theme] = { url: parseImageFilename(filename, updatesUrl) };
    }
    if ((0, import_lodash.isEmpty)(image)) {
      log.warn("Got an SVG from the server that lacked valid values");
    } else {
      result.push(image);
    }
  }
  result.push({
    [import_BadgeImageTheme.BadgeImageTheme.Transparent]: {
      url: parseImageFilename(rawSvg, updatesUrl)
    }
  });
  return result;
}, "parseImages");
const parseImageFilename = /* @__PURE__ */ __name((filename, updatesUrl) => new URL(`/static/badges/${filename}`, updatesUrl).toString(), "parseImageFilename");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  parseBadgeFromServer,
  parseBadgesFromServer,
  parseBoostBadgeListFromServer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicGFyc2VCYWRnZXNGcm9tU2VydmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIHogZnJvbSAnem9kJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgaXNSZWNvcmQgfSBmcm9tICcuLi91dGlsL2lzUmVjb3JkJztcbmltcG9ydCB7IGlzTm9ybWFsTnVtYmVyIH0gZnJvbSAnLi4vdXRpbC9pc05vcm1hbE51bWJlcic7XG5pbXBvcnQgKiBhcyBsb2cgZnJvbSAnLi4vbG9nZ2luZy9sb2cnO1xuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUsIEJhZGdlSW1hZ2VUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBwYXJzZUJhZGdlQ2F0ZWdvcnkgfSBmcm9tICcuL0JhZGdlQ2F0ZWdvcnknO1xuaW1wb3J0IHsgQmFkZ2VJbWFnZVRoZW1lLCBwYXJzZUJhZGdlSW1hZ2VUaGVtZSB9IGZyb20gJy4vQmFkZ2VJbWFnZVRoZW1lJztcblxuY29uc3QgTUFYX0JBREdFUyA9IDEwMDA7XG5cbmNvbnN0IGJhZGdlRnJvbVNlcnZlclNjaGVtYSA9IHoub2JqZWN0KHtcbiAgY2F0ZWdvcnk6IHouc3RyaW5nKCksXG4gIGRlc2NyaXB0aW9uOiB6LnN0cmluZygpLFxuICBpZDogei5zdHJpbmcoKSxcbiAgbmFtZTogei5zdHJpbmcoKSxcbiAgc3ZnOiB6LnN0cmluZygpLFxuICBzdmdzOiB6LmFycmF5KHoucmVjb3JkKHouc3RyaW5nKCkpKS5sZW5ndGgoMyksXG4gIGV4cGlyYXRpb246IHoubnVtYmVyKCkub3B0aW9uYWwoKSxcbiAgdmlzaWJsZTogei5ib29sZWFuKCkub3B0aW9uYWwoKSxcbn0pO1xuXG4vLyBHRVQgL3YxL3N1YnNjcmlwdGlvbi9ib29zdC9iYWRnZXNcbmNvbnN0IGJvb3N0QmFkZ2VzRnJvbVNlcnZlclNjaGVtYSA9IHoub2JqZWN0KHtcbiAgbGV2ZWxzOiB6LnJlY29yZChcbiAgICB6XG4gICAgICAub2JqZWN0KHtcbiAgICAgICAgYmFkZ2U6IHoudW5rbm93bigpLFxuICAgICAgfSlcbiAgICAgIC5vcih6LnVuZGVmaW5lZCgpKVxuICApLFxufSk7XG5cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUJvb3N0QmFkZ2VMaXN0RnJvbVNlcnZlcihcbiAgdmFsdWU6IHVua25vd24sXG4gIHVwZGF0ZXNVcmw6IHN0cmluZ1xuKTogUmVjb3JkPHN0cmluZywgQmFkZ2VUeXBlPiB7XG4gIGNvbnN0IHJlc3VsdDogUmVjb3JkPHN0cmluZywgQmFkZ2VUeXBlPiA9IHt9O1xuXG4gIGNvbnN0IHBhcnNlUmVzdWx0ID0gYm9vc3RCYWRnZXNGcm9tU2VydmVyU2NoZW1hLnNhZmVQYXJzZSh2YWx1ZSk7XG4gIGlmICghcGFyc2VSZXN1bHQuc3VjY2Vzcykge1xuICAgIGxvZy53YXJuKFxuICAgICAgJ3BhcnNlQm9vc3RCYWRnZUxpc3RGcm9tU2VydmVyOiBzZXJ2ZXIgcmVzcG9uc2Ugd2FzIGludmFsaWQ6JyxcbiAgICAgIHBhcnNlUmVzdWx0LmVycm9yLmZvcm1hdCgpXG4gICAgKTtcbiAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAncGFyc2VCb29zdEJhZGdlTGlzdEZyb21TZXJ2ZXI6IEZhaWxlZCB0byBwYXJzZSBzZXJ2ZXIgcmVzcG9uc2UnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IGJvb3N0QmFkZ2VzID0gcGFyc2VSZXN1bHQuZGF0YTtcbiAgT2JqZWN0LmtleXMoYm9vc3RCYWRnZXMubGV2ZWxzKS5mb3JFYWNoKGxldmVsID0+IHtcbiAgICBjb25zdCBpdGVtID0gYm9vc3RCYWRnZXMubGV2ZWxzW2xldmVsXTtcbiAgICBpZiAoIWl0ZW0pIHtcbiAgICAgIGxvZy53YXJuKGBwYXJzZUJvb3N0QmFkZ2VMaXN0RnJvbVNlcnZlcjogbGV2ZWwgJHtsZXZlbH0gaGFkIG5vIGJhZGdlYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VCYWRnZUZyb21TZXJ2ZXIoaXRlbS5iYWRnZSwgdXBkYXRlc1VybCk7XG5cbiAgICBpZiAocGFyc2VkKSB7XG4gICAgICByZXN1bHRbbGV2ZWxdID0gcGFyc2VkO1xuICAgIH1cbiAgfSk7XG5cbiAgcmV0dXJuIHJlc3VsdDtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHBhcnNlQmFkZ2VGcm9tU2VydmVyKFxuICB2YWx1ZTogdW5rbm93bixcbiAgdXBkYXRlc1VybDogc3RyaW5nXG4pOiBCYWRnZVR5cGUgfCB1bmRlZmluZWQge1xuICBjb25zdCBwYXJzZVJlc3VsdCA9IGJhZGdlRnJvbVNlcnZlclNjaGVtYS5zYWZlUGFyc2UodmFsdWUpO1xuICBpZiAoIXBhcnNlUmVzdWx0LnN1Y2Nlc3MpIHtcbiAgICBsb2cud2FybihcbiAgICAgICdwYXJzZUJhZGdlRnJvbVNlcnZlcjogYmFkZ2Ugd2FzIGludmFsaWQ6JyxcbiAgICAgIHBhcnNlUmVzdWx0LmVycm9yLmZvcm1hdCgpXG4gICAgKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3Qge1xuICAgIGNhdGVnb3J5LFxuICAgIGRlc2NyaXB0aW9uOiBkZXNjcmlwdGlvblRlbXBsYXRlLFxuICAgIGV4cGlyYXRpb24sXG4gICAgaWQsXG4gICAgbmFtZSxcbiAgICBzdmcsXG4gICAgc3ZncyxcbiAgICB2aXNpYmxlLFxuICB9ID0gcGFyc2VSZXN1bHQuZGF0YTtcbiAgY29uc3QgaW1hZ2VzID0gcGFyc2VJbWFnZXMoc3Zncywgc3ZnLCB1cGRhdGVzVXJsKTtcbiAgaWYgKGltYWdlcy5sZW5ndGggIT09IDQpIHtcbiAgICBsb2cud2FybignR290IGludmFsaWQgbnVtYmVyIG9mIFNWR3MgZnJvbSB0aGUgc2VydmVyJyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgaWQsXG4gICAgY2F0ZWdvcnk6IHBhcnNlQmFkZ2VDYXRlZ29yeShjYXRlZ29yeSksXG4gICAgbmFtZSxcbiAgICBkZXNjcmlwdGlvblRlbXBsYXRlLFxuICAgIGltYWdlcyxcbiAgICAuLi4oaXNOb3JtYWxOdW1iZXIoZXhwaXJhdGlvbikgJiYgdHlwZW9mIHZpc2libGUgPT09ICdib29sZWFuJ1xuICAgICAgPyB7XG4gICAgICAgICAgZXhwaXJlc0F0OiBleHBpcmF0aW9uICogMTAwMCxcbiAgICAgICAgICBpc1Zpc2libGU6IHZpc2libGUsXG4gICAgICAgIH1cbiAgICAgIDoge30pLFxuICB9O1xufVxuXG5leHBvcnQgZnVuY3Rpb24gcGFyc2VCYWRnZXNGcm9tU2VydmVyKFxuICB2YWx1ZTogdW5rbm93bixcbiAgdXBkYXRlc1VybDogc3RyaW5nXG4pOiBBcnJheTxCYWRnZVR5cGU+IHtcbiAgaWYgKCFBcnJheS5pc0FycmF5KHZhbHVlKSkge1xuICAgIHJldHVybiBbXTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VsdDogQXJyYXk8QmFkZ2VUeXBlPiA9IFtdO1xuXG4gIGNvbnN0IG51bWJlck9mQmFkZ2VzVG9QYXJzZSA9IE1hdGgubWluKHZhbHVlLmxlbmd0aCwgTUFYX0JBREdFUyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbnVtYmVyT2ZCYWRnZXNUb1BhcnNlOyBpICs9IDEpIHtcbiAgICBjb25zdCBpdGVtID0gdmFsdWVbaV07XG4gICAgY29uc3QgcGFyc2VkID0gcGFyc2VCYWRnZUZyb21TZXJ2ZXIoaXRlbSwgdXBkYXRlc1VybCk7XG5cbiAgICBpZiAoIXBhcnNlZCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgcmVzdWx0LnB1c2gocGFyc2VkKTtcbiAgfVxuXG4gIHJldHVybiByZXN1bHQ7XG59XG5cbmNvbnN0IHBhcnNlSW1hZ2VzID0gKFxuICByYXdTdmdzOiBSZWFkb25seUFycmF5PFJlY29yZDxzdHJpbmcsIHN0cmluZz4+LFxuICByYXdTdmc6IHN0cmluZyxcbiAgdXBkYXRlc1VybDogc3RyaW5nXG4pOiBBcnJheTxCYWRnZUltYWdlVHlwZT4gPT4ge1xuICBjb25zdCByZXN1bHQ6IEFycmF5PEJhZGdlSW1hZ2VUeXBlPiA9IFtdO1xuXG4gIGZvciAoY29uc3QgaXRlbSBvZiByYXdTdmdzKSB7XG4gICAgaWYgKCFpc1JlY29yZChpdGVtKSkge1xuICAgICAgbG9nLndhcm4oJ0dvdCBpbnZhbGlkIFNWRyBmcm9tIHRoZSBzZXJ2ZXInKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cblxuICAgIGNvbnN0IGltYWdlOiBCYWRnZUltYWdlVHlwZSA9IHt9O1xuICAgIGZvciAoY29uc3QgW3Jhd1RoZW1lLCBmaWxlbmFtZV0gb2YgT2JqZWN0LmVudHJpZXMoaXRlbSkpIHtcbiAgICAgIGlmICh0eXBlb2YgZmlsZW5hbWUgIT09ICdzdHJpbmcnKSB7XG4gICAgICAgIGxvZy53YXJuKCdHb3QgYW4gU1ZHIGZyb20gdGhlIHNlcnZlciB0aGF0IGxhY2tlZCBhIHZhbGlkIGZpbGVuYW1lJyk7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgY29uc3QgdGhlbWUgPSBwYXJzZUJhZGdlSW1hZ2VUaGVtZShyYXdUaGVtZSk7XG4gICAgICBpbWFnZVt0aGVtZV0gPSB7IHVybDogcGFyc2VJbWFnZUZpbGVuYW1lKGZpbGVuYW1lLCB1cGRhdGVzVXJsKSB9O1xuICAgIH1cblxuICAgIGlmIChpc0VtcHR5KGltYWdlKSkge1xuICAgICAgbG9nLndhcm4oJ0dvdCBhbiBTVkcgZnJvbSB0aGUgc2VydmVyIHRoYXQgbGFja2VkIHZhbGlkIHZhbHVlcycpO1xuICAgIH0gZWxzZSB7XG4gICAgICByZXN1bHQucHVzaChpbWFnZSk7XG4gICAgfVxuICB9XG5cbiAgcmVzdWx0LnB1c2goe1xuICAgIFtCYWRnZUltYWdlVGhlbWUuVHJhbnNwYXJlbnRdOiB7XG4gICAgICB1cmw6IHBhcnNlSW1hZ2VGaWxlbmFtZShyYXdTdmcsIHVwZGF0ZXNVcmwpLFxuICAgIH0sXG4gIH0pO1xuXG4gIHJldHVybiByZXN1bHQ7XG59O1xuXG5jb25zdCBwYXJzZUltYWdlRmlsZW5hbWUgPSAoZmlsZW5hbWU6IHN0cmluZywgdXBkYXRlc1VybDogc3RyaW5nKTogc3RyaW5nID0+XG4gIG5ldyBVUkwoYC9zdGF0aWMvYmFkZ2VzLyR7ZmlsZW5hbWV9YCwgdXBkYXRlc1VybCkudG9TdHJpbmcoKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsUUFBbUI7QUFDbkIsb0JBQXdCO0FBQ3hCLHNCQUF5QjtBQUN6Qiw0QkFBK0I7QUFDL0IsVUFBcUI7QUFFckIsMkJBQW1DO0FBQ25DLDZCQUFzRDtBQUV0RCxNQUFNLGFBQWE7QUFFbkIsTUFBTSx3QkFBd0IsRUFBRSxPQUFPO0FBQUEsRUFDckMsVUFBVSxFQUFFLE9BQU87QUFBQSxFQUNuQixhQUFhLEVBQUUsT0FBTztBQUFBLEVBQ3RCLElBQUksRUFBRSxPQUFPO0FBQUEsRUFDYixNQUFNLEVBQUUsT0FBTztBQUFBLEVBQ2YsS0FBSyxFQUFFLE9BQU87QUFBQSxFQUNkLE1BQU0sRUFBRSxNQUFNLEVBQUUsT0FBTyxFQUFFLE9BQU8sQ0FBQyxDQUFDLEVBQUUsT0FBTyxDQUFDO0FBQUEsRUFDNUMsWUFBWSxFQUFFLE9BQU8sRUFBRSxTQUFTO0FBQUEsRUFDaEMsU0FBUyxFQUFFLFFBQVEsRUFBRSxTQUFTO0FBQ2hDLENBQUM7QUFHRCxNQUFNLDhCQUE4QixFQUFFLE9BQU87QUFBQSxFQUMzQyxRQUFRLEVBQUUsT0FDUixFQUNHLE9BQU87QUFBQSxJQUNOLE9BQU8sRUFBRSxRQUFRO0FBQUEsRUFDbkIsQ0FBQyxFQUNBLEdBQUcsRUFBRSxVQUFVLENBQUMsQ0FDckI7QUFDRixDQUFDO0FBRU0sdUNBQ0wsT0FDQSxZQUMyQjtBQUMzQixRQUFNLFNBQW9DLENBQUM7QUFFM0MsUUFBTSxjQUFjLDRCQUE0QixVQUFVLEtBQUs7QUFDL0QsTUFBSSxD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
