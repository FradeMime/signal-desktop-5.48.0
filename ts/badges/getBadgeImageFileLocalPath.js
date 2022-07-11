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
var getBadgeImageFileLocalPath_exports = {};
__export(getBadgeImageFileLocalPath_exports, {
  getBadgeImageFileLocalPath: () => getBadgeImageFileLocalPath
});
module.exports = __toCommonJS(getBadgeImageFileLocalPath_exports);
var import_lodash = require("lodash");
var import_BadgeImageTheme = require("./BadgeImageTheme");
function getBadgeImageFileLocalPath(badge, size, theme) {
  if (!badge) {
    return void 0;
  }
  const localPathsForTheme = badge.images.map((image) => image[theme]?.localPath);
  if (theme === import_BadgeImageTheme.BadgeImageTheme.Transparent) {
    const search = size < 36 ? import_lodash.find : import_lodash.findLast;
    return search(localPathsForTheme, Boolean);
  }
  if (size < 24) {
    return (0, import_lodash.first)(localPathsForTheme);
  }
  if (size < 36) {
    return localPathsForTheme[1];
  }
  if (size < 160) {
    return localPathsForTheme[2];
  }
  return (0, import_lodash.last)(localPathsForTheme) || localPathsForTheme[2];
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getBadgeImageFileLocalPath
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QmFkZ2VJbWFnZUZpbGVMb2NhbFBhdGgudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZmluZCwgZmluZExhc3QsIGZpcnN0LCBsYXN0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgQmFkZ2VUeXBlIH0gZnJvbSAnLi90eXBlcyc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuL0JhZGdlSW1hZ2VUaGVtZSc7XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aChcbiAgYmFkZ2U6IFJlYWRvbmx5PHVuZGVmaW5lZCB8IEJhZGdlVHlwZT4sXG4gIHNpemU6IG51bWJlcixcbiAgdGhlbWU6IEJhZGdlSW1hZ2VUaGVtZVxuKTogdW5kZWZpbmVkIHwgc3RyaW5nIHtcbiAgaWYgKCFiYWRnZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBsb2NhbFBhdGhzRm9yVGhlbWU6IEFycmF5PHVuZGVmaW5lZCB8IHN0cmluZz4gPSBiYWRnZS5pbWFnZXMubWFwKFxuICAgIGltYWdlID0+IGltYWdlW3RoZW1lXT8ubG9jYWxQYXRoXG4gICk7XG5cbiAgaWYgKHRoZW1lID09PSBCYWRnZUltYWdlVGhlbWUuVHJhbnNwYXJlbnQpIHtcbiAgICBjb25zdCBzZWFyY2ggPSBzaXplIDwgMzYgPyBmaW5kIDogZmluZExhc3Q7XG4gICAgcmV0dXJuIHNlYXJjaChsb2NhbFBhdGhzRm9yVGhlbWUsIEJvb2xlYW4pO1xuICB9XG5cbiAgaWYgKHNpemUgPCAyNCkge1xuICAgIHJldHVybiBmaXJzdChsb2NhbFBhdGhzRm9yVGhlbWUpO1xuICB9XG4gIGlmIChzaXplIDwgMzYpIHtcbiAgICByZXR1cm4gbG9jYWxQYXRoc0ZvclRoZW1lWzFdO1xuICB9XG4gIGlmIChzaXplIDwgMTYwKSB7XG4gICAgcmV0dXJuIGxvY2FsUGF0aHNGb3JUaGVtZVsyXTtcbiAgfVxuICByZXR1cm4gbGFzdChsb2NhbFBhdGhzRm9yVGhlbWUpIHx8IGxvY2FsUGF0aHNGb3JUaGVtZVsyXTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBNEM7QUFFNUMsNkJBQWdDO0FBRXpCLG9DQUNMLE9BQ0EsTUFDQSxPQUNvQjtBQUNwQixNQUFJLENBQUMsT0FBTztBQUNWLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxxQkFBZ0QsTUFBTSxPQUFPLElBQ2pFLFdBQVMsTUFBTSxRQUFRLFNBQ3pCO0FBRUEsTUFBSSxVQUFVLHVDQUFnQixhQUFhO0FBQ3pDLFVBQU0sU0FBUyxPQUFPLEtBQUsscUJBQU87QUFDbEMsV0FBTyxPQUFPLG9CQUFvQixPQUFPO0FBQUEsRUFDM0M7QUFFQSxNQUFJLE9BQU8sSUFBSTtBQUNiLFdBQU8seUJBQU0sa0JBQWtCO0FBQUEsRUFDakM7QUFDQSxNQUFJLE9BQU8sSUFBSTtBQUNiLFdBQU8sbUJBQW1CO0FBQUEsRUFDNUI7QUFDQSxNQUFJLE9BQU8sS0FBSztBQUNkLFdBQU8sbUJBQW1CO0FBQUEsRUFDNUI7QUFDQSxTQUFPLHdCQUFLLGtCQUFrQixLQUFLLG1CQUFtQjtBQUN4RDtBQTVCZ0IiLAogICJuYW1lcyI6IFtdCn0K
