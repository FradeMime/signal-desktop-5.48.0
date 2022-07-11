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
  copyIntoAttachmentsDirectory: () => copyIntoAttachmentsDirectory,
  createAbsolutePathGetter: () => createAbsolutePathGetter,
  createDoesExist: () => createDoesExist,
  createName: () => createName,
  createReader: () => createReader,
  createWriterForExisting: () => createWriterForExisting,
  createWriterForNew: () => createWriterForNew,
  getRelativePath: () => getRelativePath,
  openFileInFolder: () => openFileInFolder,
  saveAttachmentToDisk: () => saveAttachmentToDisk
});
module.exports = __toCommonJS(attachments_exports);
var import_electron = require("electron");
var import_lodash = require("lodash");
var import_path = require("path");
var import_fs_extra = __toESM(require("fs-extra"));
var import_v4 = __toESM(require("uuid/v4"));
var import_Crypto = require("../Crypto");
var Bytes = __toESM(require("../Bytes"));
var import_isPathInside = require("../util/isPathInside");
var import_windowsZoneIdentifier = require("../util/windowsZoneIdentifier");
var import_OS = require("../OS");
__reExport(attachments_exports, require("../util/attachments"), module.exports);
let xattr;
try {
  xattr = require("fs-xattr");
} catch (e) {
  window.SignalContext.log?.info("x-attr dependency did not load successfully");
}
const createReader = /* @__PURE__ */ __name((root) => {
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
    return import_fs_extra.default.readFile(normalized);
  };
}, "createReader");
const getRelativePath = /* @__PURE__ */ __name((name) => {
  if (!(0, import_lodash.isString)(name)) {
    throw new TypeError("'name' must be a string");
  }
  const prefix = name.slice(0, 2);
  return (0, import_path.join)(prefix, name);
}, "getRelativePath");
const createName = /* @__PURE__ */ __name((suffix = "") => `${Bytes.toHex((0, import_Crypto.getRandomBytes)(32))}${suffix}`, "createName");
const copyIntoAttachmentsDirectory = /* @__PURE__ */ __name((root) => {
  if (!(0, import_lodash.isString)(root)) {
    throw new TypeError("'root' must be a path");
  }
  const userDataPath = window.SignalContext.getPath("userData");
  return async (sourcePath) => {
    if (!(0, import_lodash.isString)(sourcePath)) {
      throw new TypeError("sourcePath must be a string");
    }
    if (!(0, import_isPathInside.isPathInside)(sourcePath, userDataPath)) {
      throw new Error("'sourcePath' must be relative to the user config directory");
    }
    const name = createName();
    const relativePath = getRelativePath(name);
    const absolutePath = (0, import_path.join)(root, relativePath);
    const normalized = (0, import_path.normalize)(absolutePath);
    if (!(0, import_isPathInside.isPathInside)(normalized, root)) {
      throw new Error("Invalid relative path");
    }
    await import_fs_extra.default.ensureFile(normalized);
    await import_fs_extra.default.copy(sourcePath, normalized);
    const { size } = await import_fs_extra.default.stat(normalized);
    return {
      path: relativePath,
      size
    };
  };
}, "copyIntoAttachmentsDirectory");
const createWriterForNew = /* @__PURE__ */ __name((root, suffix) => {
  if (!(0, import_lodash.isString)(root)) {
    throw new TypeError("'root' must be a path");
  }
  return async (bytes) => {
    if (!(0, import_lodash.isTypedArray)(bytes)) {
      throw new TypeError("'bytes' must be a typed array");
    }
    const name = createName(suffix);
    const relativePath = getRelativePath(name);
    return createWriterForExisting(root)({
      data: bytes,
      path: relativePath
    });
  };
}, "createWriterForNew");
const createWriterForExisting = /* @__PURE__ */ __name((root) => {
  if (!(0, import_lodash.isString)(root)) {
    throw new TypeError("'root' must be a path");
  }
  return async ({
    data: bytes,
    path: relativePath
  }) => {
    if (!(0, import_lodash.isString)(relativePath)) {
      throw new TypeError("'relativePath' must be a path");
    }
    if (!bytes) {
      throw new TypeError("'data' must be a Uint8Array");
    }
    const buffer = Buffer.from(bytes);
    const absolutePath = (0, import_path.join)(root, relativePath);
    const normalized = (0, import_path.normalize)(absolutePath);
    if (!(0, import_isPathInside.isPathInside)(normalized, root)) {
      throw new Error("Invalid relative path");
    }
    await import_fs_extra.default.ensureFile(normalized);
    await import_fs_extra.default.writeFile(normalized, buffer);
    return relativePath;
  };
}, "createWriterForExisting");
const createAbsolutePathGetter = /* @__PURE__ */ __name((rootPath) => (relativePath) => {
  const absolutePath = (0, import_path.join)(rootPath, relativePath);
  const normalized = (0, import_path.normalize)(absolutePath);
  if (!(0, import_isPathInside.isPathInside)(normalized, rootPath)) {
    throw new Error("Invalid relative path");
  }
  return normalized;
}, "createAbsolutePathGetter");
const createDoesExist = /* @__PURE__ */ __name((root) => {
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
    try {
      await import_fs_extra.default.access(normalized, import_fs_extra.default.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  };
}, "createDoesExist");
const openFileInFolder = /* @__PURE__ */ __name(async (target) => {
  import_electron.ipcRenderer.send("show-item-in-folder", target);
}, "openFileInFolder");
const showSaveDialog = /* @__PURE__ */ __name((defaultPath) => {
  return import_electron.ipcRenderer.invoke("show-save-dialog", { defaultPath });
}, "showSaveDialog");
async function writeWithAttributes(target, data) {
  await import_fs_extra.default.writeFile(target, Buffer.from(data));
  if (process.platform === "darwin" && xattr) {
    const type = "0003";
    const timestamp = Math.trunc(Date.now() / 1e3).toString(16);
    const appName = "Signal";
    const guid = (0, import_v4.default)();
    const attrValue = `${type};${timestamp};${appName};${guid}`;
    await xattr.set(target, "com.apple.quarantine", attrValue);
  } else if ((0, import_OS.isWindows)()) {
    try {
      await (0, import_windowsZoneIdentifier.writeWindowsZoneIdentifier)(target);
    } catch (err) {
      window.SignalContext.log?.warn("Failed to write Windows Zone.Identifier file; continuing");
    }
  }
}
const saveAttachmentToDisk = /* @__PURE__ */ __name(async ({
  data,
  name
}) => {
  const { canceled, filePath } = await showSaveDialog(name);
  if (canceled || !filePath) {
    return null;
  }
  await writeWithAttributes(filePath, data);
  const fileBasename = (0, import_path.basename)(filePath);
  return {
    fullPath: filePath,
    name: fileBasename
  };
}, "saveAttachmentToDisk");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  copyIntoAttachmentsDirectory,
  createAbsolutePathGetter,
  createDoesExist,
  createName,
  createReader,
  createWriterForExisting,
  createWriterForNew,
  getRelativePath,
  openFileInFolder,
  saveAttachmentToDisk
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXR0YWNobWVudHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE4LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBpcGNSZW5kZXJlciB9IGZyb20gJ2VsZWN0cm9uJztcbmltcG9ydCB7IGlzU3RyaW5nLCBpc1R5cGVkQXJyYXkgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgam9pbiwgbm9ybWFsaXplLCBiYXNlbmFtZSB9IGZyb20gJ3BhdGgnO1xuaW1wb3J0IGZzZSBmcm9tICdmcy1leHRyYSc7XG5pbXBvcnQgZ2V0R3VpZCBmcm9tICd1dWlkL3Y0JztcblxuaW1wb3J0IHsgZ2V0UmFuZG9tQnl0ZXMgfSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0ICogYXMgQnl0ZXMgZnJvbSAnLi4vQnl0ZXMnO1xuXG5pbXBvcnQgeyBpc1BhdGhJbnNpZGUgfSBmcm9tICcuLi91dGlsL2lzUGF0aEluc2lkZSc7XG5pbXBvcnQgeyB3cml0ZVdpbmRvd3Nab25lSWRlbnRpZmllciB9IGZyb20gJy4uL3V0aWwvd2luZG93c1pvbmVJZGVudGlmaWVyJztcbmltcG9ydCB7IGlzV2luZG93cyB9IGZyb20gJy4uL09TJztcblxuZXhwb3J0ICogZnJvbSAnLi4vdXRpbC9hdHRhY2htZW50cyc7XG5cbnR5cGUgRlNBdHRyVHlwZSA9IHtcbiAgc2V0OiAocGF0aDogc3RyaW5nLCBhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IHN0cmluZykgPT4gUHJvbWlzZTx2b2lkPjtcbn07XG5cbmxldCB4YXR0cjogRlNBdHRyVHlwZSB8IHVuZGVmaW5lZDtcblxudHJ5IHtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGdsb2JhbC1yZXF1aXJlLCBpbXBvcnQvbm8tZXh0cmFuZW91cy1kZXBlbmRlbmNpZXNcbiAgeGF0dHIgPSByZXF1aXJlKCdmcy14YXR0cicpO1xufSBjYXRjaCAoZSkge1xuICB3aW5kb3cuU2lnbmFsQ29udGV4dC5sb2c/LmluZm8oJ3gtYXR0ciBkZXBlbmRlbmN5IGRpZCBub3QgbG9hZCBzdWNjZXNzZnVsbHknKTtcbn1cblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVJlYWRlciA9IChcbiAgcm9vdDogc3RyaW5nXG4pOiAoKHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPFVpbnQ4QXJyYXk+KSA9PiB7XG4gIGlmICghaXNTdHJpbmcocm9vdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3Jvb3QnIG11c3QgYmUgYSBwYXRoXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFByb21pc2U8VWludDhBcnJheT4gPT4ge1xuICAgIGlmICghaXNTdHJpbmcocmVsYXRpdmVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyZWxhdGl2ZVBhdGgnIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWJzb2x1dGVQYXRoID0gam9pbihyb290LCByZWxhdGl2ZVBhdGgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUoYWJzb2x1dGVQYXRoKTtcbiAgICBpZiAoIWlzUGF0aEluc2lkZShub3JtYWxpemVkLCByb290KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlbGF0aXZlIHBhdGgnKTtcbiAgICB9XG4gICAgcmV0dXJuIGZzZS5yZWFkRmlsZShub3JtYWxpemVkKTtcbiAgfTtcbn07XG5cbmV4cG9ydCBjb25zdCBnZXRSZWxhdGl2ZVBhdGggPSAobmFtZTogc3RyaW5nKTogc3RyaW5nID0+IHtcbiAgaWYgKCFpc1N0cmluZyhuYW1lKSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInbmFtZScgbXVzdCBiZSBhIHN0cmluZ1wiKTtcbiAgfVxuXG4gIGNvbnN0IHByZWZpeCA9IG5hbWUuc2xpY2UoMCwgMik7XG4gIHJldHVybiBqb2luKHByZWZpeCwgbmFtZSk7XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlTmFtZSA9IChzdWZmaXggPSAnJyk6IHN0cmluZyA9PlxuICBgJHtCeXRlcy50b0hleChnZXRSYW5kb21CeXRlcygzMikpfSR7c3VmZml4fWA7XG5cbmV4cG9ydCBjb25zdCBjb3B5SW50b0F0dGFjaG1lbnRzRGlyZWN0b3J5ID0gKFxuICByb290OiBzdHJpbmdcbik6ICgoc291cmNlUGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPHsgcGF0aDogc3RyaW5nOyBzaXplOiBudW1iZXIgfT4pID0+IHtcbiAgaWYgKCFpc1N0cmluZyhyb290KSkge1xuICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCIncm9vdCcgbXVzdCBiZSBhIHBhdGhcIik7XG4gIH1cblxuICBjb25zdCB1c2VyRGF0YVBhdGggPSB3aW5kb3cuU2lnbmFsQ29udGV4dC5nZXRQYXRoKCd1c2VyRGF0YScpO1xuXG4gIHJldHVybiBhc3luYyAoXG4gICAgc291cmNlUGF0aDogc3RyaW5nXG4gICk6IFByb21pc2U8eyBwYXRoOiBzdHJpbmc7IHNpemU6IG51bWJlciB9PiA9PiB7XG4gICAgaWYgKCFpc1N0cmluZyhzb3VyY2VQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcignc291cmNlUGF0aCBtdXN0IGJlIGEgc3RyaW5nJyk7XG4gICAgfVxuXG4gICAgaWYgKCFpc1BhdGhJbnNpZGUoc291cmNlUGF0aCwgdXNlckRhdGFQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICBcIidzb3VyY2VQYXRoJyBtdXN0IGJlIHJlbGF0aXZlIHRvIHRoZSB1c2VyIGNvbmZpZyBkaXJlY3RvcnlcIlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBuYW1lID0gY3JlYXRlTmFtZSgpO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aChuYW1lKTtcbiAgICBjb25zdCBhYnNvbHV0ZVBhdGggPSBqb2luKHJvb3QsIHJlbGF0aXZlUGF0aCk7XG4gICAgY29uc3Qgbm9ybWFsaXplZCA9IG5vcm1hbGl6ZShhYnNvbHV0ZVBhdGgpO1xuICAgIGlmICghaXNQYXRoSW5zaWRlKG5vcm1hbGl6ZWQsIHJvb3QpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVsYXRpdmUgcGF0aCcpO1xuICAgIH1cblxuICAgIGF3YWl0IGZzZS5lbnN1cmVGaWxlKG5vcm1hbGl6ZWQpO1xuICAgIGF3YWl0IGZzZS5jb3B5KHNvdXJjZVBhdGgsIG5vcm1hbGl6ZWQpO1xuICAgIGNvbnN0IHsgc2l6ZSB9ID0gYXdhaXQgZnNlLnN0YXQobm9ybWFsaXplZCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgcGF0aDogcmVsYXRpdmVQYXRoLFxuICAgICAgc2l6ZSxcbiAgICB9O1xuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZVdyaXRlckZvck5ldyA9IChcbiAgcm9vdDogc3RyaW5nLFxuICBzdWZmaXg/OiBzdHJpbmdcbik6ICgoYnl0ZXM6IFVpbnQ4QXJyYXkpID0+IFByb21pc2U8c3RyaW5nPikgPT4ge1xuICBpZiAoIWlzU3RyaW5nKHJvb3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyb290JyBtdXN0IGJlIGEgcGF0aFwiKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoYnl0ZXM6IFVpbnQ4QXJyYXkpID0+IHtcbiAgICBpZiAoIWlzVHlwZWRBcnJheShieXRlcykpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInYnl0ZXMnIG11c3QgYmUgYSB0eXBlZCBhcnJheVwiKTtcbiAgICB9XG5cbiAgICBjb25zdCBuYW1lID0gY3JlYXRlTmFtZShzdWZmaXgpO1xuICAgIGNvbnN0IHJlbGF0aXZlUGF0aCA9IGdldFJlbGF0aXZlUGF0aChuYW1lKTtcbiAgICByZXR1cm4gY3JlYXRlV3JpdGVyRm9yRXhpc3Rpbmcocm9vdCkoe1xuICAgICAgZGF0YTogYnl0ZXMsXG4gICAgICBwYXRoOiByZWxhdGl2ZVBhdGgsXG4gICAgfSk7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlV3JpdGVyRm9yRXhpc3RpbmcgPSAoXG4gIHJvb3Q6IHN0cmluZ1xuKTogKChvcHRpb25zOiB7IGRhdGE/OiBVaW50OEFycmF5OyBwYXRoPzogc3RyaW5nIH0pID0+IFByb21pc2U8c3RyaW5nPikgPT4ge1xuICBpZiAoIWlzU3RyaW5nKHJvb3QpKSB7XG4gICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyb290JyBtdXN0IGJlIGEgcGF0aFwiKTtcbiAgfVxuXG4gIHJldHVybiBhc3luYyAoe1xuICAgIGRhdGE6IGJ5dGVzLFxuICAgIHBhdGg6IHJlbGF0aXZlUGF0aCxcbiAgfToge1xuICAgIGRhdGE/OiBVaW50OEFycmF5O1xuICAgIHBhdGg/OiBzdHJpbmc7XG4gIH0pOiBQcm9taXNlPHN0cmluZz4gPT4ge1xuICAgIGlmICghaXNTdHJpbmcocmVsYXRpdmVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyZWxhdGl2ZVBhdGgnIG11c3QgYmUgYSBwYXRoXCIpO1xuICAgIH1cblxuICAgIGlmICghYnl0ZXMpIHtcbiAgICAgIHRocm93IG5ldyBUeXBlRXJyb3IoXCInZGF0YScgbXVzdCBiZSBhIFVpbnQ4QXJyYXlcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYnVmZmVyID0gQnVmZmVyLmZyb20oYnl0ZXMpO1xuICAgIGNvbnN0IGFic29sdXRlUGF0aCA9IGpvaW4ocm9vdCwgcmVsYXRpdmVQYXRoKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplKGFic29sdXRlUGF0aCk7XG4gICAgaWYgKCFpc1BhdGhJbnNpZGUobm9ybWFsaXplZCwgcm9vdCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignSW52YWxpZCByZWxhdGl2ZSBwYXRoJyk7XG4gICAgfVxuXG4gICAgYXdhaXQgZnNlLmVuc3VyZUZpbGUobm9ybWFsaXplZCk7XG4gICAgYXdhaXQgZnNlLndyaXRlRmlsZShub3JtYWxpemVkLCBidWZmZXIpO1xuICAgIHJldHVybiByZWxhdGl2ZVBhdGg7XG4gIH07XG59O1xuXG5leHBvcnQgY29uc3QgY3JlYXRlQWJzb2x1dGVQYXRoR2V0dGVyID1cbiAgKHJvb3RQYXRoOiBzdHJpbmcpID0+XG4gIChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IHN0cmluZyA9PiB7XG4gICAgY29uc3QgYWJzb2x1dGVQYXRoID0gam9pbihyb290UGF0aCwgcmVsYXRpdmVQYXRoKTtcbiAgICBjb25zdCBub3JtYWxpemVkID0gbm9ybWFsaXplKGFic29sdXRlUGF0aCk7XG4gICAgaWYgKCFpc1BhdGhJbnNpZGUobm9ybWFsaXplZCwgcm9vdFBhdGgpKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0ludmFsaWQgcmVsYXRpdmUgcGF0aCcpO1xuICAgIH1cbiAgICByZXR1cm4gbm9ybWFsaXplZDtcbiAgfTtcblxuZXhwb3J0IGNvbnN0IGNyZWF0ZURvZXNFeGlzdCA9IChcbiAgcm9vdDogc3RyaW5nXG4pOiAoKHJlbGF0aXZlUGF0aDogc3RyaW5nKSA9PiBQcm9taXNlPGJvb2xlYW4+KSA9PiB7XG4gIGlmICghaXNTdHJpbmcocm9vdCkpIHtcbiAgICB0aHJvdyBuZXcgVHlwZUVycm9yKFwiJ3Jvb3QnIG11c3QgYmUgYSBwYXRoXCIpO1xuICB9XG5cbiAgcmV0dXJuIGFzeW5jIChyZWxhdGl2ZVBhdGg6IHN0cmluZyk6IFByb21pc2U8Ym9vbGVhbj4gPT4ge1xuICAgIGlmICghaXNTdHJpbmcocmVsYXRpdmVQYXRoKSkge1xuICAgICAgdGhyb3cgbmV3IFR5cGVFcnJvcihcIidyZWxhdGl2ZVBhdGgnIG11c3QgYmUgYSBzdHJpbmdcIik7XG4gICAgfVxuXG4gICAgY29uc3QgYWJzb2x1dGVQYXRoID0gam9pbihyb290LCByZWxhdGl2ZVBhdGgpO1xuICAgIGNvbnN0IG5vcm1hbGl6ZWQgPSBub3JtYWxpemUoYWJzb2x1dGVQYXRoKTtcbiAgICBpZiAoIWlzUGF0aEluc2lkZShub3JtYWxpemVkLCByb290KSkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdJbnZhbGlkIHJlbGF0aXZlIHBhdGgnKTtcbiAgICB9XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGZzZS5hY2Nlc3Mobm9ybWFsaXplZCwgZnNlLmNvbnN0YW50cy5GX09LKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICAgIH0gY2F0Y2ggKGVycm9yKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9O1xufTtcblxuZXhwb3J0IGNvbnN0IG9wZW5GaWxlSW5Gb2xkZXIgPSBhc3luYyAodGFyZ2V0OiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1pdGVtLWluLWZvbGRlcicsIHRhcmdldCk7XG59O1xuXG5jb25zdCBzaG93U2F2ZURpYWxvZyA9IChcbiAgZGVmYXVsdFBhdGg6IHN0cmluZ1xuKTogUHJvbWlzZTx7XG4gIGNhbmNlbGVkOiBib29sZWFuO1xuICBmaWxlUGF0aD86IHN0cmluZztcbn0+ID0+IHtcbiAgcmV0dXJuIGlwY1JlbmRlcmVyLmludm9rZSgnc2hvdy1zYXZlLWRpYWxvZycsIHsgZGVmYXVsdFBhdGggfSk7XG59O1xuXG5hc3luYyBmdW5jdGlvbiB3cml0ZVdpdGhBdHRyaWJ1dGVzKFxuICB0YXJnZXQ6IHN0cmluZyxcbiAgZGF0YTogVWludDhBcnJheVxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGF3YWl0IGZzZS53cml0ZUZpbGUodGFyZ2V0LCBCdWZmZXIuZnJvbShkYXRhKSk7XG5cbiAgaWYgKHByb2Nlc3MucGxhdGZvcm0gPT09ICdkYXJ3aW4nICYmIHhhdHRyKSB7XG4gICAgLy8ga0xTUXVhcmFudGluZVR5cGVJbnN0YW50TWVzc2FnZUF0dGFjaG1lbnRcbiAgICBjb25zdCB0eXBlID0gJzAwMDMnO1xuXG4gICAgLy8gSGV4YWRlY2ltYWwgc2Vjb25kcyBzaW5jZSBlcG9jaFxuICAgIGNvbnN0IHRpbWVzdGFtcCA9IE1hdGgudHJ1bmMoRGF0ZS5ub3coKSAvIDEwMDApLnRvU3RyaW5nKDE2KTtcblxuICAgIGNvbnN0IGFwcE5hbWUgPSAnU2lnbmFsJztcbiAgICBjb25zdCBndWlkID0gZ2V0R3VpZCgpO1xuXG4gICAgLy8gaHR0cHM6Ly9pbG9zdG15bm90ZXMuYmxvZ3Nwb3QuY29tLzIwMTIvMDYvZ2F0ZWtlZXBlci14cHJvdGVjdC1hbmQtcXVhcmFudGluZS5odG1sXG4gICAgY29uc3QgYXR0clZhbHVlID0gYCR7dHlwZX07JHt0aW1lc3RhbXB9OyR7YXBwTmFtZX07JHtndWlkfWA7XG5cbiAgICBhd2FpdCB4YXR0ci5zZXQodGFyZ2V0LCAnY29tLmFwcGxlLnF1YXJhbnRpbmUnLCBhdHRyVmFsdWUpO1xuICB9IGVsc2UgaWYgKGlzV2luZG93cygpKSB7XG4gICAgLy8gVGhpcyBvcGVyYXRpb24gbWF5IGZhaWwgKHNlZSB0aGUgZnVuY3Rpb24ncyBjb21tZW50cyksIHdoaWNoIGlzIG5vdCBhIHNob3ctc3RvcHBlci5cbiAgICB0cnkge1xuICAgICAgYXdhaXQgd3JpdGVXaW5kb3dzWm9uZUlkZW50aWZpZXIodGFyZ2V0KTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmxvZz8ud2FybihcbiAgICAgICAgJ0ZhaWxlZCB0byB3cml0ZSBXaW5kb3dzIFpvbmUuSWRlbnRpZmllciBmaWxlOyBjb250aW51aW5nJ1xuICAgICAgKTtcbiAgICB9XG4gIH1cbn1cblxuZXhwb3J0IGNvbnN0IHNhdmVBdHRhY2htZW50VG9EaXNrID0gYXN5bmMgKHtcbiAgZGF0YSxcbiAgbmFtZSxcbn06IHtcbiAgZGF0YTogVWludDhBcnJheTtcbiAgbmFtZTogc3RyaW5nO1xufSk6IFByb21pc2U8bnVsbCB8IHsgZnVsbFBhdGg6IHN0cmluZzsgbmFtZTogc3RyaW5nIH0+ID0+IHtcbiAgY29uc3QgeyBjYW5jZWxlZCwgZmlsZVBhdGggfSA9IGF3YWl0IHNob3dTYXZlRGlhbG9nKG5hbWUpO1xuXG4gIGlmIChjYW5jZWxlZCB8fCAhZmlsZVBhdGgpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGF3YWl0IHdyaXRlV2l0aEF0dHJpYnV0ZXMoZmlsZVBhdGgsIGRhdGEpO1xuXG4gIGNvbnN0IGZpbGVCYXNlbmFtZSA9IGJhc2VuYW1lKGZpbGVQYXRoKTtcblxuICByZXR1cm4ge1xuICAgIGZ1bGxQYXRoOiBmaWxlUGF0aCxcbiAgICBuYW1lOiBmaWxlQmFzZW5hbWUsXG4gIH07XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBNEI7QUFDNUIsb0JBQXVDO0FBQ3ZDLGtCQUEwQztBQUMxQyxzQkFBZ0I7QUFDaEIsZ0JBQW9CO0FBRXBCLG9CQUErQjtBQUMvQixZQUF1QjtBQUV2QiwwQkFBNkI7QUFDN0IsbUNBQTJDO0FBQzNDLGdCQUEwQjtBQUUxQixnQ0FBYyxnQ0FoQmQ7QUFzQkEsSUFBSTtBQUVKLElBQUk7QUFFRixVQUFRLFFBQVEsVUFBVTtBQUM1QixTQUFTLEdBQVA7QUFDQSxTQUFPLGNBQWMsS0FBSyxLQUFLLDZDQUE2QztBQUM5RTtBQUVPLE1BQU0sZUFBZSx3QkFDMUIsU0FDb0Q7QUFDcEQsTUFBSSxDQUFDLDRCQUFTLElBQUksR0FBRztBQUNuQixVQUFNLElBQUksVUFBVSx1QkFBdUI7QUFBQSxFQUM3QztBQUVBLFNBQU8sT0FBTyxpQkFBOEM7QUFDMUQsUUFBSSxDQUFDLDRCQUFTLFlBQVksR0FBRztBQUMzQixZQUFNLElBQUksVUFBVSxpQ0FBaUM7QUFBQSxJQUN2RDtBQUVBLFVBQU0sZUFBZSxzQkFBSyxNQUFNLFlBQVk7QUFDNUMsVUFBTSxhQUFhLDJCQUFVLFlBQVk7QUFDekMsUUFBSSxDQUFDLHNDQUFhLFlBQVksSUFBSSxHQUFHO0FBQ25DLFlBQU0sSUFBSSxNQUFNLHVC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
