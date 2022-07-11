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
var handleVideoAttachment_exports = {};
__export(handleVideoAttachment_exports, {
  handleVideoAttachment: () => handleVideoAttachment
});
module.exports = __toCommonJS(handleVideoAttachment_exports);
var import_blob_util = require("blob-util");
var log = __toESM(require("../logging/log"));
var import_VisualAttachment = require("../types/VisualAttachment");
var import_MIME = require("../types/MIME");
var import_fileToBytes = require("./fileToBytes");
async function handleVideoAttachment(file) {
  const objectUrl = URL.createObjectURL(file);
  if (!objectUrl) {
    throw new Error("Failed to create object url for video!");
  }
  try {
    const screenshotContentType = import_MIME.IMAGE_PNG;
    const screenshotBlob = await (0, import_VisualAttachment.makeVideoScreenshot)({
      objectUrl,
      contentType: screenshotContentType,
      logger: log
    });
    const screenshotData = await (0, import_blob_util.blobToArrayBuffer)(screenshotBlob);
    const data = await (0, import_fileToBytes.fileToBytes)(file);
    return {
      contentType: (0, import_MIME.stringToMIMEType)(file.type),
      data,
      fileName: file.name,
      path: file.name,
      pending: false,
      screenshotContentType,
      screenshotData: new Uint8Array(screenshotData),
      screenshotSize: screenshotData.byteLength,
      size: data.byteLength
    };
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  handleVideoAttachment
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaGFuZGxlVmlkZW9BdHRhY2htZW50LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGJsb2JUb0FycmF5QnVmZmVyIH0gZnJvbSAnYmxvYi11dGlsJztcblxuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IG1ha2VWaWRlb1NjcmVlbnNob3QgfSBmcm9tICcuLi90eXBlcy9WaXN1YWxBdHRhY2htZW50JztcbmltcG9ydCB7IElNQUdFX1BORywgc3RyaW5nVG9NSU1FVHlwZSB9IGZyb20gJy4uL3R5cGVzL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBJbk1lbW9yeUF0dGFjaG1lbnREcmFmdFR5cGUgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IGZpbGVUb0J5dGVzIH0gZnJvbSAnLi9maWxlVG9CeXRlcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoYW5kbGVWaWRlb0F0dGFjaG1lbnQoXG4gIGZpbGU6IFJlYWRvbmx5PEZpbGU+XG4pOiBQcm9taXNlPEluTWVtb3J5QXR0YWNobWVudERyYWZ0VHlwZT4ge1xuICBjb25zdCBvYmplY3RVcmwgPSBVUkwuY3JlYXRlT2JqZWN0VVJMKGZpbGUpO1xuICBpZiAoIW9iamVjdFVybCkge1xuICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGNyZWF0ZSBvYmplY3QgdXJsIGZvciB2aWRlbyEnKTtcbiAgfVxuICB0cnkge1xuICAgIGNvbnN0IHNjcmVlbnNob3RDb250ZW50VHlwZSA9IElNQUdFX1BORztcbiAgICBjb25zdCBzY3JlZW5zaG90QmxvYiA9IGF3YWl0IG1ha2VWaWRlb1NjcmVlbnNob3Qoe1xuICAgICAgb2JqZWN0VXJsLFxuICAgICAgY29udGVudFR5cGU6IHNjcmVlbnNob3RDb250ZW50VHlwZSxcbiAgICAgIGxvZ2dlcjogbG9nLFxuICAgIH0pO1xuICAgIGNvbnN0IHNjcmVlbnNob3REYXRhID0gYXdhaXQgYmxvYlRvQXJyYXlCdWZmZXIoc2NyZWVuc2hvdEJsb2IpO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBmaWxlVG9CeXRlcyhmaWxlKTtcblxuICAgIHJldHVybiB7XG4gICAgICBjb250ZW50VHlwZTogc3RyaW5nVG9NSU1FVHlwZShmaWxlLnR5cGUpLFxuICAgICAgZGF0YSxcbiAgICAgIGZpbGVOYW1lOiBmaWxlLm5hbWUsXG4gICAgICBwYXRoOiBmaWxlLm5hbWUsXG4gICAgICBwZW5kaW5nOiBmYWxzZSxcbiAgICAgIHNjcmVlbnNob3RDb250ZW50VHlwZSxcbiAgICAgIHNjcmVlbnNob3REYXRhOiBuZXcgVWludDhBcnJheShzY3JlZW5zaG90RGF0YSksXG4gICAgICBzY3JlZW5zaG90U2l6ZTogc2NyZWVuc2hvdERhdGEuYnl0ZUxlbmd0aCxcbiAgICAgIHNpemU6IGRhdGEuYnl0ZUxlbmd0aCxcbiAgICB9O1xuICB9IGZpbmFsbHkge1xuICAgIFVSTC5yZXZva2VPYmplY3RVUkwob2JqZWN0VXJsKTtcbiAgfVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHVCQUFrQztBQUVsQyxVQUFxQjtBQUNyQiw4QkFBb0M7QUFDcEMsa0JBQTRDO0FBRTVDLHlCQUE0QjtBQUU1QixxQ0FDRSxNQUNzQztBQUN0QyxRQUFNLFlBQVksSUFBSSxnQkFBZ0IsSUFBSTtBQUMxQyxNQUFJLENBQUMsV0FBVztBQUNkLFVBQU0sSUFBSSxNQUFNLHdDQUF3QztBQUFBLEVBQzFEO0FBQ0EsTUFBSTtBQUNGLFVBQU0sd0JBQXdCO0FBQzlCLFVBQU0saUJBQWlCLE1BQU0saURBQW9CO0FBQUEsTUFDL0M7QUFBQSxNQUNBLGFBQWE7QUFBQSxNQUNiLFFBQVE7QUFBQSxJQUNWLENBQUM7QUFDRCxVQUFNLGlCQUFpQixNQUFNLHdDQUFrQixjQUFjO0FBQzdELFVBQU0sT0FBTyxNQUFNLG9DQUFZLElBQUk7QUFFbkMsV0FBTztBQUFBLE1BQ0wsYUFBYSxrQ0FBaUIsS0FBSyxJQUFJO0FBQUEsTUFDdkM7QUFBQSxNQUNBLFVBQVUsS0FBSztBQUFBLE1BQ2YsTUFBTSxLQUFLO0FBQUEsTUFDWCxTQUFTO0FBQUEsTUFDVDtBQUFBLE1BQ0EsZ0JBQWdCLElBQUksV0FBVyxjQUFjO0FBQUEsTUFDN0MsZ0JBQWdCLGVBQWU7QUFBQSxNQUMvQixNQUFNLEtBQUs7QUFBQSxJQUNiO0FBQUEsRUFDRixVQUFFO0FBQ0EsUUFBSSxnQkFBZ0IsU0FBUztBQUFBLEVBQy9CO0FBQ0Y7QUEvQnNCIiwKICAibmFtZXMiOiBbXQp9Cg==
