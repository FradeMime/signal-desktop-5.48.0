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
var attachments_exports = {};
__export(attachments_exports, {
  createDeleter: () => createDeleter,
  getAvatarsPath: () => getAvatarsPath,
  getBadgesPath: () => getBadgesPath,
  getDraftPath: () => getDraftPath,
  getPath: () => getPath,
  getStickersPath: () => getStickersPath,
  getTempPath: () => getTempPath,
  getUpdateCachePath: () => getUpdateCachePath
});
module.exports = __toCommonJS(attachments_exports);
var import_lodash = require("lodash");
var import_path = require("path");
var import_fs_extra = __toESM(require("fs-extra"));
var import_isPathInside = require("./isPathInside");
const PATH = "attachments.noindex";
const AVATAR_PATH = "avatars.noindex";
const BADGES_PATH = "badges.noindex";
const STICKER_PATH = "stickers.noindex";
const TEMP_PATH = "temp";
const UPDATE_CACHE_PATH = "update-cache";
const DRAFT_PATH = "drafts.noindex";
const CACHED_PATHS = /* @__PURE__ */ new Map();
const createPathGetter = /* @__PURE__ */ __name((subpath) => (userDataPath) => {
  if (!(0, import_lodash.isString)(userDataPath)) {
    throw new TypeError("'userDataPath' must be a string");
  }
  const naivePath = (0, import_path.join)(userDataPath, subpath);
  const cached = CACHED_PATHS.get(naivePath);
  if (cached) {
    return cached;
  }
  let result = naivePath;
  if (import_fs_extra.default.pathExistsSync(naivePath)) {
    result = import_fs_extra.default.realpathSync(naivePath);
  }
  CACHED_PATHS.set(naivePath, result);
  return result;
}, "createPathGetter");
const getAvatarsPath = createPathGetter(AVATAR_PATH);
const getBadgesPath = createPathGetter(BADGES_PATH);
const getDraftPath = createPathGetter(DRAFT_PATH);
const getPath = createPathGetter(PATH);
const getStickersPath = createPathGetter(STICKER_PATH);
const getTempPath = createPathGetter(TEMP_PATH);
const getUpdateCachePath = createPathGetter(UPDATE_CACHE_PATH);
const createDeleter = /* @__PURE__ */ __name((root) => {
  if (!(0, import_lodash.isString)(root)) {
    throw new TypeError("'root' must be a path");
  }
  return async (relativePath) => {
    if (!(0, import_lodash.isString)(relativePath)) {
      throw new TypeError("'relativePath' must be a string");
    }
    const absolutePath = (0, import_path.join)(root, relativePath);
    const normalized = (0, import_path.normalize)(absolutePath);
    if (!(0, import_isPathInside.isPathInside)(normalized, root)) {
      throw new Error("Invalid relative path");
    }
    await import_fs_extra.default.remove(absolutePath);
  };
}, "createDeleter");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createDeleter,
  getAvatarsPath,
  getBadgesPath,
  getDraftPath,
  getPath,
  getStickersPath,
  getTempPath,
  getUpdateCachePath
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXR0YWNobWVudHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgaXNTdHJpbmcgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgam9pbiwgbm9ybWFsaXplIH0gZnJvbSAncGF0aCc7XG5pbXBvcnQgZnNlIGZyb20gJ2ZzLWV4dHJhJztcblxuaW1wb3J0IHsgaXNQYXRoSW5zaWRlIH0gZnJvbSAnLi9pc1BhdGhJbnNpZGUnO1xuXG5jb25zdCBQQVRIID0gJ2F0dGFjaG1lbnRzLm5vaW5kZXgnO1xuY29uc3QgQVZBVEFSX1BBVEggPSAnYXZhdGFycy5ub2luZGV4JztcbmNvbnN0IEJBREdFU19QQVRIID0gJ2JhZGdlcy5ub2luZGV4JztcbmNvbnN0IFNUSUNLRVJfUEFUSCA9ICdzdGlja2Vycy5ub2luZGV4JztcbmNvbnN0IFRFTVBfUEFUSCA9ICd0ZW1wJztcbmNvbnN0IFVQREFURV9DQUNIRV9QQVRIID0gJ3VwZGF0ZS1jYWNoZSc7XG5jb25zdCBEUkFGVF9QQVRIID0gJ2RyYWZ0cy5ub2luZGV4JztcblxuY29uc3QgQ0FDSEVEX1BBVEhTID0gbmV3IE1hcDxzdHJpbmcsIHN0cmluZz4oKTtcblxuY29uc3QgY3JlYXRlUGF0aEdldHRlciA9XG4gIChzdWJwYXRoOiBzdHJpbmcpID0+XG4gICh1c2VyRGF0YVBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgaWYgKCFpc1N0cmluZyh1c2VyRGF0YVBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3VzZXJEYXRhUGF0aCcgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgICB9XG5cbiAgICBjb25zdCBuYWl2ZVBhdGggPSBqb2luKHVzZXJEYXRhUGF0aCwgc3VicGF0aCk7XG5cbiAgICBjb25zdCBjYWNoZWQgPSBDQUNIRURfUEFUSFMuZ2V0KG5haXZlUGF0aCk7XG4gICAgaWYgKGNhY2hlZCkge1xuICAgICAgcmV0dXJuIGNhY2hlZDtcbiAgICB9XG5cbiAgICBsZXQgcmVzdWx0ID0gbmFpdmVQYXRoO1xuICAgIGlmIChmc2UucGF0aEV4aXN0c1N5bmMobmFpdmVQYXRoKSkge1xuICAgICAgcmVzdWx0ID0gZnNlLnJlYWxwYXRoU3luYyhuYWl2ZVBhdGgpO1xuICAgIH1cblxuICAgIENBQ0hFRF9QQVRIUy5zZXQobmFpdmVQYXRoLCByZXN1bHQpO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGdldEF2YXRhcnNQYXRoID0gY3JlYXRlUGF0aEdldHRlcihBVkFUQVJfUEFUSCk7XG5leHBvcnQgY29uc3QgZ2V0QmFkZ2VzUGF0aCA9IGNyZWF0ZVBhdGhHZXR0ZXIoQkFER0VTX1BBVEgpO1xuZXhwb3J0IGNvbnN0IGdldERyYWZ0UGF0aCA9IGNyZWF0ZVBhdGhHZXR0ZXIoRFJBRlRfUEFUSCk7XG5leHBvcnQgY29uc3QgZ2V0UGF0aCA9IGNyZWF0ZVBhdGhHZXR0ZXIoUEFUSCk7XG5leHBvcnQgY29uc3QgZ2V0U3RpY2tlcnNQYXRoID0gY3JlYXRlUGF0aEdldHRlcihTVElDS0VSX1BBVEgpO1xuZXhwb3J0IGNvbnN0IGdldFRlbXBQYXRoID0gY3JlYXRlUGF0aEdldHRlcihURU1QX1BBVEgpO1xuZXhwb3J0IGNvbnN0IGdldFVwZGF0ZUNhY2hlUGF0aCA9IGNyZWF0ZVBhdGhHZXR0ZXIoVVBEQVRFX0NBQ0hFX1BBVEgpO1xuXG5leHBvcnQgY29uc3QgY3JlYXRlRGVsZXRlciA9IChcbiAgcm9vdDogc3RyaW5nXG4pOiAoKHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHZvaWQ+KSA9PiB7XG4gIGlmICghaXNTdHJpbmcocm9vdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3Jvb3QnIG11c3QgYmUgYSBwYXRoXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICAgIGlmICghaXNTdHJpbmcocmVsYXRpdmVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyZWxhdGl2ZVBhdGgnIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWJzb2x1dGVQYXRoID0gam9pbihyb290LCByZWxhdGl2ZVBhdGgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUoYWJzb2x1dGVQYXRoKTtcbiAgICBpZiAoIWlzUGF0aEluc2lkZShub3JtYWxpemVkLCByb290KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlbGF0aXZlIHBhdGgnKTtcbiAgICB9XG4gICAgYXdhaXQgZnNlLnJlbW92ZShhYnNvbHV0ZVBhdGgpO1xuICB9O1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLG9CQUF5QjtBQUN6QixrQkFBZ0M7QUFDaEMsc0JBQWdCO0FBRWhCLDBCQUE2QjtBQUU3QixNQUFNLE9BQU87QUFDYixNQUFNLGNBQWM7QUFDcEIsTUFBTSxjQUFjO0FBQ3BCLE1BQU0sZUFBZTtBQUNyQixNQUFNLFlBQVk7QUFDbEIsTUFBTSxvQkFBb0I7QUFDMUIsTUFBTSxhQUFhO0FBRW5CLE1BQU0sZUFBZSxvQkFBSSxJQUFvQjtBQUU3QyxNQUFNLG1CQUNKLHdCQUFDLFlBQ0QsQ0FBQyxpQkFBaUM7QUFDaEMsTUFBSSxDQUFDLDRCQUFTLFlBQVksR0FBRztBQUMzQixVQUFNLElBQUksVUFBVSxpQ0FBaUM7QUFBQSxFQUN2RDtBQUVBLFFBQU0sWUFBWSxzQkFBSyxjQUFjLE9BQU87QUFFNUMsUUFBTSxTQUFTLGFBQWEsSUFBSSxTQUFTO0FBQ3pDLE1BQUksUUFBUTtBQUNWLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxTQUFTO0FBQ2IsTUFBSSx3QkFBSSxlQUFlLFNBQVMsR0FBRztBQUNqQyxhQUFTLHdCQUFJLGFBQWEsU0FBUztBQUFBLEVBQ3JDO0FBRUEsZUFBYSxJQUFJLFdBQVcsTUFBTTtBQUVsQyxTQUFPO0FBQ1QsR0FyQkE7QUF1QkssTUFBTSxpQkFBaUIsaUJBQWlCLFdBQVc7QUFDbkQsTUFBTSxnQkFBZ0IsaUJBQWlCLFdBQVc7QUFDbEQsTUFBTSxlQUFlLGlCQUFpQixVQUFVO0FBQ2hELE1BQU0sVUFBVSxpQkFBaUIsSUFBSTtBQUNyQyxNQUFNLGtCQUFrQixpQkFBaUIsWUFBWTtBQUNyRCxNQUFNLGNBQWMsaUJBQWlCLFNBQVM7QUFDOUMsTUFBTSxxQkFBcUIsaUJBQWlCLGlCQUFpQjtBQUU3RCxNQUFNLGdCQUFnQix3QkFDM0IsU0FDOEM7QUFDOUMsTUFBSSxDQUFDLDRCQUFTLElBQUksR0FBRztBQUNuQixVQUFNLElBQUksVUFBVSx1QkFBdUI7QUFBQSxFQUM3QztBQUVBLFNBQU8sT0FBTyxpQkFBd0M7QUFDcEQsUUFBSSxDQUFDLDRCQUFTLFlBQVksR0FBRztBQUMzQixZQUFNLElBQUksVUFBVSxpQ0FBaUM7QUFBQSxJQUN2RDtBQUVBLFVBQU0sZUFBZSxzQkFBSyxNQUFNLFlBQVk7QUFDNUMsVUFBTSxhQUFhLDJCQUFVLFlBQVk7QUFDekMsUUFBSSxDQUFDLHNDQUFhLFlBQVksSUFBSSxHQUFHO0FBQ25DLFlBQU0sSUFBSSxNQUFNLHVCQUF1QjtBQUFBLElBQ3pDO0FBQ0EsVUFBTSx3QkFBSSxPQUFPLFlBQVk7QUFBQSxFQUMvQjtBQUNGLEdBbkI2QjsiLAogICJuYW1lcyI6IFtdCn0K
