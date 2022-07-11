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
var VisualAttachment_exports = {};
__export(VisualAttachment_exports, {
  blobToArrayBuffer: () => import_blob_util.blobToArrayBuffer,
  getImageDimensions: () => getImageDimensions,
  makeImageThumbnail: () => makeImageThumbnail,
  makeObjectUrl: () => makeObjectUrl,
  makeVideoScreenshot: () => makeVideoScreenshot,
  makeVideoThumbnail: () => makeVideoThumbnail,
  revokeObjectUrl: () => revokeObjectUrl
});
module.exports = __toCommonJS(VisualAttachment_exports);
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_blob_util = require("blob-util");
var import_errors = require("./errors");
var import_MIME = require("./MIME");
var import_arrayBufferToObjectURL = require("../util/arrayBufferToObjectURL");
var import_assert = require("../util/assert");
var import_canvasToBlob = require("../util/canvasToBlob");
function getImageDimensions({
  objectUrl,
  logger
}) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.addEventListener("load", () => {
      resolve({
        height: image.naturalHeight,
        width: image.naturalWidth
      });
    });
    image.addEventListener("error", (error) => {
      logger.error("getImageDimensions error", (0, import_errors.toLogFormat)(error));
      reject(error);
    });
    image.src = objectUrl;
  });
}
function makeImageThumbnail({
  size,
  objectUrl,
  contentType = import_MIME.IMAGE_PNG,
  logger
}) {
  return new Promise((resolve, reject) => {
    const image = document.createElement("img");
    image.addEventListener("load", async () => {
      let canvas = import_blueimp_load_image.default.scale(image, {
        canvas: true,
        cover: true,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size
      });
      canvas = import_blueimp_load_image.default.scale(canvas, {
        canvas: true,
        crop: true,
        maxWidth: size,
        maxHeight: size,
        minWidth: size,
        minHeight: size
      });
      (0, import_assert.strictAssert)(canvas instanceof HTMLCanvasElement, "loadImage must produce canvas");
      try {
        const blob = await (0, import_canvasToBlob.canvasToBlob)(canvas, contentType);
        resolve(blob);
      } catch (err) {
        reject(err);
      }
    });
    image.addEventListener("error", (error) => {
      logger.error("makeImageThumbnail error", (0, import_errors.toLogFormat)(error));
      reject(error);
    });
    image.src = objectUrl;
  });
}
function makeVideoScreenshot({
  objectUrl,
  contentType = import_MIME.IMAGE_PNG,
  logger
}) {
  return new Promise((resolve, reject) => {
    const video = document.createElement("video");
    function seek() {
      video.currentTime = 1;
    }
    async function capture() {
      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      const context = canvas.getContext("2d");
      (0, import_assert.strictAssert)(context, "Failed to get canvas context");
      context.drawImage(video, 0, 0, canvas.width, canvas.height);
      video.addEventListener("loadeddata", seek);
      video.removeEventListener("seeked", capture);
      try {
        const image = (0, import_canvasToBlob.canvasToBlob)(canvas, contentType);
        resolve(image);
      } catch (err) {
        reject(err);
      }
    }
    video.addEventListener("loadeddata", seek);
    video.addEventListener("seeked", capture);
    video.addEventListener("error", (error) => {
      logger.error("makeVideoScreenshot error", (0, import_errors.toLogFormat)(error));
      reject(error);
    });
    video.src = objectUrl;
  });
}
async function makeVideoThumbnail({
  size,
  videoObjectUrl,
  logger,
  contentType
}) {
  let screenshotObjectUrl;
  try {
    const blob = await makeVideoScreenshot({
      objectUrl: videoObjectUrl,
      contentType,
      logger
    });
    const data = await (0, import_blob_util.blobToArrayBuffer)(blob);
    screenshotObjectUrl = (0, import_arrayBufferToObjectURL.arrayBufferToObjectURL)({
      data,
      type: contentType
    });
    const resultBlob = await makeImageThumbnail({
      size,
      objectUrl: screenshotObjectUrl,
      contentType,
      logger
    });
    return resultBlob;
  } finally {
    if (screenshotObjectUrl !== void 0) {
      revokeObjectUrl(screenshotObjectUrl);
    }
  }
}
function makeObjectUrl(data, contentType) {
  const blob = new Blob([data], {
    type: contentType
  });
  return URL.createObjectURL(blob);
}
function revokeObjectUrl(objectUrl) {
  URL.revokeObjectURL(objectUrl);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  blobToArrayBuffer,
  getImageDimensions,
  makeImageThumbnail,
  makeObjectUrl,
  makeVideoScreenshot,
  makeVideoThumbnail,
  revokeObjectUrl
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVmlzdWFsQXR0YWNobWVudC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTgtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnYmx1ZWltcC1sb2FkLWltYWdlJztcbmltcG9ydCB7IGJsb2JUb0FycmF5QnVmZmVyIH0gZnJvbSAnYmxvYi11dGlsJztcbmltcG9ydCB7IHRvTG9nRm9ybWF0IH0gZnJvbSAnLi9lcnJvcnMnO1xuaW1wb3J0IHR5cGUgeyBNSU1FVHlwZSB9IGZyb20gJy4vTUlNRSc7XG5pbXBvcnQgeyBJTUFHRV9QTkcgfSBmcm9tICcuL01JTUUnO1xuaW1wb3J0IHR5cGUgeyBMb2dnZXJUeXBlIH0gZnJvbSAnLi9Mb2dnaW5nJztcbmltcG9ydCB7IGFycmF5QnVmZmVyVG9PYmplY3RVUkwgfSBmcm9tICcuLi91dGlsL2FycmF5QnVmZmVyVG9PYmplY3RVUkwnO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgY2FudmFzVG9CbG9iIH0gZnJvbSAnLi4vdXRpbC9jYW52YXNUb0Jsb2InO1xuXG5leHBvcnQgeyBibG9iVG9BcnJheUJ1ZmZlciB9O1xuXG5leHBvcnQgdHlwZSBHZXRJbWFnZURpbWVuc2lvbnNPcHRpb25zVHlwZSA9IFJlYWRvbmx5PHtcbiAgb2JqZWN0VXJsOiBzdHJpbmc7XG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnZXJyb3InPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0SW1hZ2VEaW1lbnNpb25zKHtcbiAgb2JqZWN0VXJsLFxuICBsb2dnZXIsXG59OiBHZXRJbWFnZURpbWVuc2lvbnNPcHRpb25zVHlwZSk6IFByb21pc2U8eyB3aWR0aDogbnVtYmVyOyBoZWlnaHQ6IG51bWJlciB9PiB7XG4gIHJldHVybiBuZXcgUHJvbWlzZSgocmVzb2x2ZSwgcmVqZWN0KSA9PiB7XG4gICAgY29uc3QgaW1hZ2UgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcblxuICAgIGltYWdlLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWQnLCAoKSA9PiB7XG4gICAgICByZXNvbHZlKHtcbiAgICAgICAgaGVpZ2h0OiBpbWFnZS5uYXR1cmFsSGVpZ2h0LFxuICAgICAgICB3aWR0aDogaW1hZ2UubmF0dXJhbFdpZHRoLFxuICAgICAgfSk7XG4gICAgfSk7XG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvciA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ2dldEltYWdlRGltZW5zaW9ucyBlcnJvcicsIHRvTG9nRm9ybWF0KGVycm9yKSk7XG4gICAgICByZWplY3QoZXJyb3IpO1xuICAgIH0pO1xuXG4gICAgaW1hZ2Uuc3JjID0gb2JqZWN0VXJsO1xuICB9KTtcbn1cblxuZXhwb3J0IHR5cGUgTWFrZUltYWdlVGh1bWJuYWlsT3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIHNpemU6IG51bWJlcjtcbiAgb2JqZWN0VXJsOiBzdHJpbmc7XG4gIGNvbnRlbnRUeXBlPzogTUlNRVR5cGU7XG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnZXJyb3InPjtcbn0+O1xuXG5leHBvcnQgZnVuY3Rpb24gbWFrZUltYWdlVGh1bWJuYWlsKHtcbiAgc2l6ZSxcbiAgb2JqZWN0VXJsLFxuICBjb250ZW50VHlwZSA9IElNQUdFX1BORyxcbiAgbG9nZ2VyLFxufTogTWFrZUltYWdlVGh1bWJuYWlsT3B0aW9uc1R5cGUpOiBQcm9taXNlPEJsb2I+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCBpbWFnZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuXG4gICAgaW1hZ2UuYWRkRXZlbnRMaXN0ZW5lcignbG9hZCcsIGFzeW5jICgpID0+IHtcbiAgICAgIC8vIHVzaW5nIGNvbXBvbmVudHMvYmx1ZWltcC1sb2FkLWltYWdlXG5cbiAgICAgIC8vIGZpcnN0LCBtYWtlIHRoZSBjb3JyZWN0IHNpemVcbiAgICAgIGxldCBjYW52YXMgPSBsb2FkSW1hZ2Uuc2NhbGUoaW1hZ2UsIHtcbiAgICAgICAgY2FudmFzOiB0cnVlLFxuICAgICAgICBjb3ZlcjogdHJ1ZSxcbiAgICAgICAgbWF4V2lkdGg6IHNpemUsXG4gICAgICAgIG1heEhlaWdodDogc2l6ZSxcbiAgICAgICAgbWluV2lkdGg6IHNpemUsXG4gICAgICAgIG1pbkhlaWdodDogc2l6ZSxcbiAgICAgIH0pO1xuXG4gICAgICAvLyB0aGVuIGNyb3BcbiAgICAgIGNhbnZhcyA9IGxvYWRJbWFnZS5zY2FsZShjYW52YXMsIHtcbiAgICAgICAgY2FudmFzOiB0cnVlLFxuICAgICAgICBjcm9wOiB0cnVlLFxuICAgICAgICBtYXhXaWR0aDogc2l6ZSxcbiAgICAgICAgbWF4SGVpZ2h0OiBzaXplLFxuICAgICAgICBtaW5XaWR0aDogc2l6ZSxcbiAgICAgICAgbWluSGVpZ2h0OiBzaXplLFxuICAgICAgfSk7XG5cbiAgICAgIHN0cmljdEFzc2VydChcbiAgICAgICAgY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQsXG4gICAgICAgICdsb2FkSW1hZ2UgbXVzdCBwcm9kdWNlIGNhbnZhcydcbiAgICAgICk7XG5cbiAgICAgIHRyeSB7XG4gICAgICAgIGNvbnN0IGJsb2IgPSBhd2FpdCBjYW52YXNUb0Jsb2IoY2FudmFzLCBjb250ZW50VHlwZSk7XG4gICAgICAgIHJlc29sdmUoYmxvYik7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICBpbWFnZS5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGVycm9yID0+IHtcbiAgICAgIGxvZ2dlci5lcnJvcignbWFrZUltYWdlVGh1bWJuYWlsIGVycm9yJywgdG9Mb2dGb3JtYXQoZXJyb3IpKTtcbiAgICAgIHJlamVjdChlcnJvcik7XG4gICAgfSk7XG5cbiAgICBpbWFnZS5zcmMgPSBvYmplY3RVcmw7XG4gIH0pO1xufVxuXG5leHBvcnQgdHlwZSBNYWtlVmlkZW9TY3JlZW5zaG90T3B0aW9uc1R5cGUgPSBSZWFkb25seTx7XG4gIG9iamVjdFVybDogc3RyaW5nO1xuICBjb250ZW50VHlwZT86IE1JTUVUeXBlO1xuICBsb2dnZXI6IFBpY2s8TG9nZ2VyVHlwZSwgJ2Vycm9yJz47XG59PjtcblxuZXhwb3J0IGZ1bmN0aW9uIG1ha2VWaWRlb1NjcmVlbnNob3Qoe1xuICBvYmplY3RVcmwsXG4gIGNvbnRlbnRUeXBlID0gSU1BR0VfUE5HLFxuICBsb2dnZXIsXG59OiBNYWtlVmlkZW9TY3JlZW5zaG90T3B0aW9uc1R5cGUpOiBQcm9taXNlPEJsb2I+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBjb25zdCB2aWRlbyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3ZpZGVvJyk7XG5cbiAgICBmdW5jdGlvbiBzZWVrKCkge1xuICAgICAgdmlkZW8uY3VycmVudFRpbWUgPSAxLjA7XG4gICAgfVxuXG4gICAgYXN5bmMgZnVuY3Rpb24gY2FwdHVyZSgpIHtcbiAgICAgIGNvbnN0IGNhbnZhcyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2NhbnZhcycpO1xuICAgICAgY2FudmFzLndpZHRoID0gdmlkZW8udmlkZW9XaWR0aDtcbiAgICAgIGNhbnZhcy5oZWlnaHQgPSB2aWRlby52aWRlb0hlaWdodDtcbiAgICAgIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgIHN0cmljdEFzc2VydChjb250ZXh0LCAnRmFpbGVkIHRvIGdldCBjYW52YXMgY29udGV4dCcpO1xuICAgICAgY29udGV4dC5kcmF3SW1hZ2UodmlkZW8sIDAsIDAsIGNhbnZhcy53aWR0aCwgY2FudmFzLmhlaWdodCk7XG5cbiAgICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBzZWVrKTtcbiAgICAgIHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3NlZWtlZCcsIGNhcHR1cmUpO1xuXG4gICAgICB0cnkge1xuICAgICAgICBjb25zdCBpbWFnZSA9IGNhbnZhc1RvQmxvYihjYW52YXMsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgcmVzb2x2ZShpbWFnZSk7XG4gICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgcmVqZWN0KGVycik7XG4gICAgICB9XG4gICAgfVxuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIHNlZWspO1xuICAgIHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3NlZWtlZCcsIGNhcHR1cmUpO1xuXG4gICAgdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBlcnJvciA9PiB7XG4gICAgICBsb2dnZXIuZXJyb3IoJ21ha2VWaWRlb1NjcmVlbnNob3QgZXJyb3InLCB0b0xvZ0Zvcm1hdChlcnJvcikpO1xuICAgICAgcmVqZWN0KGVycm9yKTtcbiAgICB9KTtcblxuICAgIHZpZGVvLnNyYyA9IG9iamVjdFVybDtcbiAgfSk7XG59XG5cbmV4cG9ydCB0eXBlIE1ha2VWaWRlb1RodW1ibmFpbE9wdGlvbnNUeXBlID0gUmVhZG9ubHk8e1xuICBzaXplOiBudW1iZXI7XG4gIHZpZGVvT2JqZWN0VXJsOiBzdHJpbmc7XG4gIGxvZ2dlcjogUGljazxMb2dnZXJUeXBlLCAnZXJyb3InPjtcbiAgY29udGVudFR5cGU6IE1JTUVUeXBlO1xufT47XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBtYWtlVmlkZW9UaHVtYm5haWwoe1xuICBzaXplLFxuICB2aWRlb09iamVjdFVybCxcbiAgbG9nZ2VyLFxuICBjb250ZW50VHlwZSxcbn06IE1ha2VWaWRlb1RodW1ibmFpbE9wdGlvbnNUeXBlKTogUHJvbWlzZTxCbG9iPiB7XG4gIGxldCBzY3JlZW5zaG90T2JqZWN0VXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gIHRyeSB7XG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IG1ha2VWaWRlb1NjcmVlbnNob3Qoe1xuICAgICAgb2JqZWN0VXJsOiB2aWRlb09iamVjdFVybCxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgbG9nZ2VyLFxuICAgIH0pO1xuICAgIGNvbnN0IGRhdGEgPSBhd2FpdCBibG9iVG9BcnJheUJ1ZmZlcihibG9iKTtcbiAgICBzY3JlZW5zaG90T2JqZWN0VXJsID0gYXJyYXlCdWZmZXJUb09iamVjdFVSTCh7XG4gICAgICBkYXRhLFxuICAgICAgdHlwZTogY29udGVudFR5cGUsXG4gICAgfSk7XG5cbiAgICAvLyBXZSBuZWVkIHRvIHdhaXQgZm9yIHRoaXMsIG90aGVyd2lzZSB0aGUgZmluYWxseSBiZWxvdyB3aWxsIHJ1biBmaXJzdFxuICAgIGNvbnN0IHJlc3VsdEJsb2IgPSBhd2FpdCBtYWtlSW1hZ2VUaHVtYm5haWwoe1xuICAgICAgc2l6ZSxcbiAgICAgIG9iamVjdFVybDogc2NyZWVuc2hvdE9iamVjdFVybCxcbiAgICAgIGNvbnRlbnRUeXBlLFxuICAgICAgbG9nZ2VyLFxuICAgIH0pO1xuXG4gICAgcmV0dXJuIHJlc3VsdEJsb2I7XG4gIH0gZmluYWxseSB7XG4gICAgaWYgKHNjcmVlbnNob3RPYmplY3RVcmwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV2b2tlT2JqZWN0VXJsKHNjcmVlbnNob3RPYmplY3RVcmwpO1xuICAgIH1cbiAgfVxufVxuXG5leHBvcnQgZnVuY3Rpb24gbWFrZU9iamVjdFVybChcbiAgZGF0YTogVWludDhBcnJheSB8IEFycmF5QnVmZmVyLFxuICBjb250ZW50VHlwZTogTUlNRVR5cGVcbik6IHN0cmluZyB7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbZGF0YV0sIHtcbiAgICB0eXBlOiBjb250ZW50VHlwZSxcbiAgfSk7XG5cbiAgcmV0dXJuIFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiByZXZva2VPYmplY3RVcmwob2JqZWN0VXJsOiBzdHJpbmcpOiB2b2lkIHtcbiAgVVJMLnJldm9rZU9iamVjdFVSTChvYmplY3RVcmwpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGdDQUFzQjtBQUN0Qix1QkFBa0M7QUFDbEMsb0JBQTRCO0FBRTVCLGtCQUEwQjtBQUUxQixvQ0FBdUM7QUFDdkMsb0JBQTZCO0FBQzdCLDBCQUE2QjtBQVN0Qiw0QkFBNEI7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxHQUM0RTtBQUM1RSxTQUFPLElBQUksUUFBUSxDQUFDLFNBQVMsV0FBVztBQUN0QyxVQUFNLFFBQVEsU0FBUyxjQUFjLEtBQUs7QUFFMUMsVUFBTSxpQkFBaUIsUUFBUSxNQUFNO0FBQ25DLGNBQVE7QUFBQSxRQUNOLFFBQVEsTUFBTTtBQUFBLFFBQ2QsT0FBTyxNQUFNO0FBQUEsTUFDZixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBQ0QsVUFBTSxpQkFBaUIsU0FBUyxXQUFTO0FBQ3ZDLGFBQU8sTUFBTSw0QkFBNEIsK0JBQVksS0FBSyxDQUFDO0FBQzNELGFBQU8sS0FBSztBQUFBLElBQ2QsQ0FBQztBQUVELFVBQU0sTUFBTTtBQUFBLEVBQ2QsQ0FBQztBQUNIO0FBcEJnQixBQTZCVCw0QkFBNEI7QUFBQSxFQUNqQztBQUFBLEVBQ0E7QUFBQSxFQUNBLGNBQWM7QUFBQSxFQUNkO0FBQUEsR0FDK0M7QUFDL0MsU0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQVc7QUFDdEMsVUFBTSxRQUFRLFNBQVMsY0FBYyxLQUFLO0FBRTFDLFVBQU0saUJBQWlCLFFBQVEsWUFBWTtBQUl6QyxVQUFJLFNBQVMsa0NBQVUsTUFBTSxPQUFPO0FBQUEsUUFDbEMsUUFBUTtBQUFBLFFBQ1IsT0FBTztBQUFBLFFBQ1AsVUFBVTtBQUFBLFFB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
