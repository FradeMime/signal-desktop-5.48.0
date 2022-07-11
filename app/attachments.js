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
var __reExport = (target, mod, secondTarget) => (__copyProps(target, mod, "default"), secondTarget && __copyProps(secondTarget, mod, "default"));
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var attachments_exports = {};
__export(attachments_exports, {
  clearTempPath: () => clearTempPath,
  deleteAll: () => deleteAll,
  deleteAllBadges: () => deleteAllBadges,
  deleteAllDraftAttachments: () => deleteAllDraftAttachments,
  deleteAllStickers: () => deleteAllStickers,
  getAllAttachments: () => getAllAttachments,
  getAllDraftAttachments: () => getAllDraftAttachments,
  getAllStickers: () => getAllStickers,
  getBuiltInImages: () => getBuiltInImages
});
module.exports = __toCommonJS(attachments_exports);
var import_path = require("path");
var import_fast_glob = __toESM(require("fast-glob"));
var import_glob = __toESM(require("glob"));
var import_pify = __toESM(require("pify"));
var import_fs_extra = __toESM(require("fs-extra"));
var import_lodash = require("lodash");
var import_normalize_path = __toESM(require("normalize-path"));
var import_attachments = require("../ts/util/attachments");
__reExport(attachments_exports, require("../ts/util/attachments"), module.exports);
const getAllAttachments = /* @__PURE__ */ __name(async (userDataPath) => {
  const dir = (0, import_attachments.getPath)(userDataPath);
  const pattern = (0, import_normalize_path.default)((0, import_path.join)(dir, "**", "*"));
  const files = await (0, import_fast_glob.default)(pattern, { onlyFiles: true });
  return (0, import_lodash.map)(files, (file) => (0, import_path.relative)(dir, file));
}, "getAllAttachments");
const getAllBadgeImageFiles = /* @__PURE__ */ __name(async (userDataPath) => {
  const dir = (0, import_attachments.getBadgesPath)(userDataPath);
  const pattern = (0, import_normalize_path.default)((0, import_path.join)(dir, "**", "*"));
  const files = await (0, import_fast_glob.default)(pattern, { onlyFiles: true });
  return (0, import_lodash.map)(files, (file) => (0, import_path.relative)(dir, file));
}, "getAllBadgeImageFiles");
const getAllStickers = /* @__PURE__ */ __name(async (userDataPath) => {
  const dir = (0, import_attachments.getStickersPath)(userDataPath);
  const pattern = (0, import_normalize_path.default)((0, import_path.join)(dir, "**", "*"));
  const files = await (0, import_fast_glob.default)(pattern, { onlyFiles: true });
  return (0, import_lodash.map)(files, (file) => (0, import_path.relative)(dir, file));
}, "getAllStickers");
const getAllDraftAttachments = /* @__PURE__ */ __name(async (userDataPath) => {
  const dir = (0, import_attachments.getDraftPath)(userDataPath);
  const pattern = (0, import_normalize_path.default)((0, import_path.join)(dir, "**", "*"));
  const files = await (0, import_fast_glob.default)(pattern, { onlyFiles: true });
  return (0, import_lodash.map)(files, (file) => (0, import_path.relative)(dir, file));
}, "getAllDraftAttachments");
const getBuiltInImages = /* @__PURE__ */ __name(async () => {
  const dir = (0, import_path.join)(__dirname, "../images");
  const pattern = (0, import_path.join)(dir, "**", "*.svg");
  const files = await (0, import_pify.default)(import_glob.default)(pattern, { nodir: true });
  return (0, import_lodash.map)(files, (file) => (0, import_path.relative)(dir, file));
}, "getBuiltInImages");
const clearTempPath = /* @__PURE__ */ __name((userDataPath) => {
  const tempPath = (0, import_attachments.getTempPath)(userDataPath);
  return import_fs_extra.default.emptyDir(tempPath);
}, "clearTempPath");
const deleteAll = /* @__PURE__ */ __name(async ({
  userDataPath,
  attachments
}) => {
  const deleteFromDisk = (0, import_attachments.createDeleter)((0, import_attachments.getPath)(userDataPath));
  for (let index = 0, max = attachments.length; index < max; index += 1) {
    const file = attachments[index];
    await deleteFromDisk(file);
  }
  console.log(`deleteAll: deleted ${attachments.length} files`);
}, "deleteAll");
const deleteAllStickers = /* @__PURE__ */ __name(async ({
  userDataPath,
  stickers
}) => {
  const deleteFromDisk = (0, import_attachments.createDeleter)((0, import_attachments.getStickersPath)(userDataPath));
  for (let index = 0, max = stickers.length; index < max; index += 1) {
    const file = stickers[index];
    await deleteFromDisk(file);
  }
  console.log(`deleteAllStickers: deleted ${stickers.length} files`);
}, "deleteAllStickers");
const deleteAllBadges = /* @__PURE__ */ __name(async ({
  userDataPath,
  pathsToKeep
}) => {
  const deleteFromDisk = (0, import_attachments.createDeleter)((0, import_attachments.getBadgesPath)(userDataPath));
  let filesDeleted = 0;
  for (const file of await getAllBadgeImageFiles(userDataPath)) {
    if (!pathsToKeep.has(file)) {
      await deleteFromDisk(file);
      filesDeleted += 1;
    }
  }
  console.log(`deleteAllBadges: deleted ${filesDeleted} files`);
}, "deleteAllBadges");
const deleteAllDraftAttachments = /* @__PURE__ */ __name(async ({
  userDataPath,
  attachments
}) => {
  const deleteFromDisk = (0, import_attachments.createDeleter)((0, import_attachments.getDraftPath)(userDataPath));
  for (let index = 0, max = attachments.length; index < max; index += 1) {
    const file = attachments[index];
    await deleteFromDisk(file);
  }
  console.log(`deleteAllDraftAttachments: deleted ${attachments.length} files`);
}, "deleteAllDraftAttachments");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  clearTempPath,
  deleteAll,
  deleteAllBadges,
  deleteAllDraftAttachments,
  deleteAllStickers,
  getAllAttachments,
  getAllDraftAttachments,
  getAllStickers,
  getBuiltInImages
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXR0YWNobWVudHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBqb2luLCByZWxhdGl2ZSB9IGZyb20gJ3BhdGgnO1xuXG5pbXBvcnQgZmFzdEdsb2IgZnJvbSAnZmFzdC1nbG9iJztcbmltcG9ydCBnbG9iIGZyb20gJ2dsb2InO1xuaW1wb3J0IHBpZnkgZnJvbSAncGlmeSc7XG5pbXBvcnQgZnNlIGZyb20gJ2ZzLWV4dHJhJztcbmltcG9ydCB7IG1hcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgbm9ybWFsaXplUGF0aCBmcm9tICdub3JtYWxpemUtcGF0aCc7XG5cbmltcG9ydCB7XG4gIGdldFBhdGgsXG4gIGdldFN0aWNrZXJzUGF0aCxcbiAgZ2V0QmFkZ2VzUGF0aCxcbiAgZ2V0RHJhZnRQYXRoLFxuICBnZXRUZW1wUGF0aCxcbiAgY3JlYXRlRGVsZXRlcixcbn0gZnJvbSAnLi4vdHMvdXRpbC9hdHRhY2htZW50cyc7XG5cbmV4cG9ydCAqIGZyb20gJy4uL3RzL3V0aWwvYXR0YWNobWVudHMnO1xuXG5leHBvcnQgY29uc3QgZ2V0QWxsQXR0YWNobWVudHMgPSBhc3luYyAoXG4gIHVzZXJEYXRhUGF0aDogc3RyaW5nXG4pOiBQcm9taXNlPFJlYWRvbmx5QXJyYXk8c3RyaW5nPj4gPT4ge1xuICBjb25zdCBkaXIgPSBnZXRQYXRoKHVzZXJEYXRhUGF0aCk7XG4gIGNvbnN0IHBhdHRlcm4gPSBub3JtYWxpemVQYXRoKGpvaW4oZGlyLCAnKionLCAnKicpKTtcblxuICBjb25zdCBmaWxlcyA9IGF3YWl0IGZhc3RHbG9iKHBhdHRlcm4sIHsgb25seUZpbGVzOiB0cnVlIH0pO1xuICByZXR1cm4gbWFwKGZpbGVzLCBmaWxlID0+IHJlbGF0aXZlKGRpciwgZmlsZSkpO1xufTtcblxuY29uc3QgZ2V0QWxsQmFkZ2VJbWFnZUZpbGVzID0gYXN5bmMgKFxuICB1c2VyRGF0YVBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTxSZWFkb25seUFycmF5PHN0cmluZz4+ID0+IHtcbiAgY29uc3QgZGlyID0gZ2V0QmFkZ2VzUGF0aCh1c2VyRGF0YVBhdGgpO1xuICBjb25zdCBwYXR0ZXJuID0gbm9ybWFsaXplUGF0aChqb2luKGRpciwgJyoqJywgJyonKSk7XG5cbiAgY29uc3QgZmlsZXMgPSBhd2FpdCBmYXN0R2xvYihwYXR0ZXJuLCB7IG9ubHlGaWxlczogdHJ1ZSB9KTtcbiAgcmV0dXJuIG1hcChmaWxlcywgZmlsZSA9PiByZWxhdGl2ZShkaXIsIGZpbGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRBbGxTdGlja2VycyA9IGFzeW5jIChcbiAgdXNlckRhdGFQYXRoOiBzdHJpbmdcbik6IFByb21pc2U8UmVhZG9ubHlBcnJheTxzdHJpbmc+PiA9PiB7XG4gIGNvbnN0IGRpciA9IGdldFN0aWNrZXJzUGF0aCh1c2VyRGF0YVBhdGgpO1xuICBjb25zdCBwYXR0ZXJuID0gbm9ybWFsaXplUGF0aChqb2luKGRpciwgJyoqJywgJyonKSk7XG5cbiAgY29uc3QgZmlsZXMgPSBhd2FpdCBmYXN0R2xvYihwYXR0ZXJuLCB7IG9ubHlGaWxlczogdHJ1ZSB9KTtcbiAgcmV0dXJuIG1hcChmaWxlcywgZmlsZSA9PiByZWxhdGl2ZShkaXIsIGZpbGUpKTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRBbGxEcmFmdEF0dGFjaG1lbnRzID0gYXN5bmMgKFxuICB1c2VyRGF0YVBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTxSZWFkb25seUFycmF5PHN0cmluZz4+ID0+IHtcbiAgY29uc3QgZGlyID0gZ2V0RHJhZnRQYXRoKHVzZXJEYXRhUGF0aCk7XG4gIGNvbnN0IHBhdHRlcm4gPSBub3JtYWxpemVQYXRoKGpvaW4oZGlyLCAnKionLCAnKicpKTtcblxuICBjb25zdCBmaWxlcyA9IGF3YWl0IGZhc3RHbG9iKHBhdHRlcm4sIHsgb25seUZpbGVzOiB0cnVlIH0pO1xuICByZXR1cm4gbWFwKGZpbGVzLCBmaWxlID0+IHJlbGF0aXZlKGRpciwgZmlsZSkpO1xufTtcblxuZXhwb3J0IGNvbnN0IGdldEJ1aWx0SW5JbWFnZXMgPSBhc3luYyAoKTogUHJvbWlzZTxSZWFkb25seUFycmF5PHN0cmluZz4+ID0+IHtcbiAgY29uc3QgZGlyID0gam9pbihfX2Rpcm5hbWUsICcuLi9pbWFnZXMnKTtcbiAgY29uc3QgcGF0dGVybiA9IGpvaW4oZGlyLCAnKionLCAnKi5zdmcnKTtcblxuICAvLyBOb3RlOiB3ZSBjYW5ub3QgdXNlIGZhc3QtZ2xvYiBoZXJlIGJlY2F1c2UsIGluc2lkZSBvZiAuYXNhciBmaWxlcywgcmVhZGRpciB3aWxsIG5vdFxuICAvLyAgIGhvbm9yIHRoZSB3aXRoRmlsZVR5cGVzIGZsYWc6IGh0dHBzOi8vZ2l0aHViLmNvbS9lbGVjdHJvbi9lbGVjdHJvbi9pc3N1ZXMvMTkwNzRcbiAgY29uc3QgZmlsZXMgPSBhd2FpdCBwaWZ5KGdsb2IpKHBhdHRlcm4sIHsgbm9kaXI6IHRydWUgfSk7XG4gIHJldHVybiBtYXAoZmlsZXMsIGZpbGUgPT4gcmVsYXRpdmUoZGlyLCBmaWxlKSk7XG59O1xuXG5leHBvcnQgY29uc3QgY2xlYXJUZW1wUGF0aCA9ICh1c2VyRGF0YVBhdGg6IHN0cmluZyk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCB0ZW1wUGF0aCA9IGdldFRlbXBQYXRoKHVzZXJEYXRhUGF0aCk7XG4gIHJldHVybiBmc2UuZW1wdHlEaXIodGVtcFBhdGgpO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFsbCA9IGFzeW5jICh7XG4gIHVzZXJEYXRhUGF0aCxcbiAgYXR0YWNobWVudHMsXG59OiB7XG4gIHVzZXJEYXRhUGF0aDogc3RyaW5nO1xuICBhdHRhY2htZW50czogUmVhZG9ubHlBcnJheTxzdHJpbmc+O1xufSk6IFByb21pc2U8dm9pZD4gPT4ge1xuICBjb25zdCBkZWxldGVGcm9tRGlzayA9IGNyZWF0ZURlbGV0ZXIoZ2V0UGF0aCh1c2VyRGF0YVBhdGgpKTtcblxuICBmb3IgKGxldCBpbmRleCA9IDAsIG1heCA9IGF0dGFjaG1lbnRzLmxlbmd0aDsgaW5kZXggPCBtYXg7IGluZGV4ICs9IDEpIHtcbiAgICBjb25zdCBmaWxlID0gYXR0YWNobWVudHNbaW5kZXhdO1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgYXdhaXQgZGVsZXRlRnJvbURpc2soZmlsZSk7XG4gIH1cblxuICBjb25zb2xlLmxvZyhgZGVsZXRlQWxsOiBkZWxldGVkICR7YXR0YWNobWVudHMubGVuZ3RofSBmaWxlc2ApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFsbFN0aWNrZXJzID0gYXN5bmMgKHtcbiAgdXNlckRhdGFQYXRoLFxuICBzdGlja2Vycyxcbn06IHtcbiAgdXNlckRhdGFQYXRoOiBzdHJpbmc7XG4gIHN0aWNrZXJzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG59KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IGRlbGV0ZUZyb21EaXNrID0gY3JlYXRlRGVsZXRlcihnZXRTdGlja2Vyc1BhdGgodXNlckRhdGFQYXRoKSk7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwLCBtYXggPSBzdGlja2Vycy5sZW5ndGg7IGluZGV4IDwgbWF4OyBpbmRleCArPSAxKSB7XG4gICAgY29uc3QgZmlsZSA9IHN0aWNrZXJzW2luZGV4XTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgIGF3YWl0IGRlbGV0ZUZyb21EaXNrKGZpbGUpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYGRlbGV0ZUFsbFN0aWNrZXJzOiBkZWxldGVkICR7c3RpY2tlcnMubGVuZ3RofSBmaWxlc2ApO1xufTtcblxuZXhwb3J0IGNvbnN0IGRlbGV0ZUFsbEJhZGdlcyA9IGFzeW5jICh7XG4gIHVzZXJEYXRhUGF0aCxcbiAgcGF0aHNUb0tlZXAsXG59OiB7XG4gIHVzZXJEYXRhUGF0aDogc3RyaW5nO1xuICBwYXRoc1RvS2VlcDogU2V0PHN0cmluZz47XG59KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IGRlbGV0ZUZyb21EaXNrID0gY3JlYXRlRGVsZXRlcihnZXRCYWRnZXNQYXRoKHVzZXJEYXRhUGF0aCkpO1xuXG4gIGxldCBmaWxlc0RlbGV0ZWQgPSAwO1xuICBmb3IgKGNvbnN0IGZpbGUgb2YgYXdhaXQgZ2V0QWxsQmFkZ2VJbWFnZUZpbGVzKHVzZXJEYXRhUGF0aCkpIHtcbiAgICBpZiAoIXBhdGhzVG9LZWVwLmhhcyhmaWxlKSkge1xuICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWF3YWl0LWluLWxvb3BcbiAgICAgIGF3YWl0IGRlbGV0ZUZyb21EaXNrKGZpbGUpO1xuICAgICAgZmlsZXNEZWxldGVkICs9IDE7XG4gICAgfVxuICB9XG5cbiAgY29uc29sZS5sb2coYGRlbGV0ZUFsbEJhZGdlczogZGVsZXRlZCAke2ZpbGVzRGVsZXRlZH0gZmlsZXNgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBkZWxldGVBbGxEcmFmdEF0dGFjaG1lbnRzID0gYXN5bmMgKHtcbiAgdXNlckRhdGFQYXRoLFxuICBhdHRhY2htZW50cyxcbn06IHtcbiAgdXNlckRhdGFQYXRoOiBzdHJpbmc7XG4gIGF0dGFjaG1lbnRzOiBSZWFkb25seUFycmF5PHN0cmluZz47XG59KTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gIGNvbnN0IGRlbGV0ZUZyb21EaXNrID0gY3JlYXRlRGVsZXRlcihnZXREcmFmdFBhdGgodXNlckRhdGFQYXRoKSk7XG5cbiAgZm9yIChsZXQgaW5kZXggPSAwLCBtYXggPSBhdHRhY2htZW50cy5sZW5ndGg7IGluZGV4IDwgbWF4OyBpbmRleCArPSAxKSB7XG4gICAgY29uc3QgZmlsZSA9IGF0dGFjaG1lbnRzW2luZGV4XTtcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tYXdhaXQtaW4tbG9vcFxuICAgIGF3YWl0IGRlbGV0ZUZyb21EaXNrKGZpbGUpO1xuICB9XG5cbiAgY29uc29sZS5sb2coYGRlbGV0ZUFsbERyYWZ0QXR0YWNobWVudHM6IGRlbGV0ZWQgJHthdHRhY2htZW50cy5sZW5ndGh9IGZpbGVzYCk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQStCO0FBRS9CLHVCQUFxQjtBQUNyQixrQkFBaUI7QUFDakIsa0JBQWlCO0FBQ2pCLHNCQUFnQjtBQUNoQixvQkFBb0I7QUFDcEIsNEJBQTBCO0FBRTFCLHlCQU9PO0FBRVAsZ0NBQWMsbUNBckJkO0FBdUJPLE1BQU0sb0JBQW9CLDhCQUMvQixpQkFDbUM7QUFDbkMsUUFBTSxNQUFNLGdDQUFRLFlBQVk7QUFDaEMsUUFBTSxVQUFVLG1DQUFjLHNCQUFLLEtBQUssTUFBTSxHQUFHLENBQUM7QUFFbEQsUUFBTSxRQUFRLE1BQU0sOEJBQVMsU0FBUyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQ3pELFNBQU8sdUJBQUksT0FBTyxVQUFRLDBCQUFTLEtBQUssSUFBSSxDQUFDO0FBQy9DLEdBUmlDO0FBVWpDLE1BQU0sd0JBQXdCLDhCQUM1QixpQkFDbUM7QUFDbkMsUUFBTSxNQUFNLHNDQUFjLFlBQVk7QUFDdEMsUUFBTSxVQUFVLG1DQUFjLHNCQUFLLEtBQUssTUFBTSxHQUFHLENBQUM7QUFFbEQsUUFBTSxRQUFRLE1BQU0sOEJBQVMsU0FBUyxFQUFFLFdBQVcsS0FBSyxDQUFDO0FBQ3pELFNBQU8sdUJBQUksT0FBTyxVQUFRLDBCQUFTLEtBQUssSUFBSSxDQUFDO0FBQy9DLEdBUjhCO0FBVXZCLE1BQU0saUJBQWlCLDhCQUM1QixpQkFDbUM7QUFDbkMsUUFBTSxNQUFNLHdDQUFnQixZQUFZO0FBQ3hDLFFBQU0sVUFBVSxtQ0FBYyxzQkFBSyxLQUFLLE1BQU0sR0FB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
