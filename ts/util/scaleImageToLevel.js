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
var scaleImageToLevel_exports = {};
__export(scaleImageToLevel_exports, {
  scaleImageToLevel: () => scaleImageToLevel
});
module.exports = __toCommonJS(scaleImageToLevel_exports);
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_MIME = require("../types/MIME");
var import_canvasToBlob = require("./canvasToBlob");
var import_RemoteConfig = require("../RemoteConfig");
var import_libphonenumberUtil = require("./libphonenumberUtil");
var MediaQualityLevels = /* @__PURE__ */ ((MediaQualityLevels2) => {
  MediaQualityLevels2[MediaQualityLevels2["One"] = 1] = "One";
  MediaQualityLevels2[MediaQualityLevels2["Two"] = 2] = "Two";
  MediaQualityLevels2[MediaQualityLevels2["Three"] = 3] = "Three";
  return MediaQualityLevels2;
})(MediaQualityLevels || {});
const DEFAULT_LEVEL = 1 /* One */;
const MiB = 1024 * 1024;
const DEFAULT_LEVEL_DATA = {
  maxDimensions: 1600,
  quality: 0.7,
  size: MiB,
  thresholdSize: 0.2 * MiB
};
const MEDIA_QUALITY_LEVEL_DATA = /* @__PURE__ */ new Map([
  [1 /* One */, DEFAULT_LEVEL_DATA],
  [
    2 /* Two */,
    {
      maxDimensions: 2048,
      quality: 0.75,
      size: MiB * 1.5,
      thresholdSize: 0.3 * MiB
    }
  ],
  [
    3 /* Three */,
    {
      maxDimensions: 4096,
      quality: 0.75,
      size: MiB * 3,
      thresholdSize: 0.4 * MiB
    }
  ]
]);
const SCALABLE_DIMENSIONS = [3072, 2048, 1600, 1024, 768];
const MIN_DIMENSIONS = 512;
function parseCountryValues(values) {
  const map = /* @__PURE__ */ new Map();
  values.split(",").forEach((value) => {
    const [countryCode, level] = value.split(":");
    map.set(countryCode, Number(level) === 2 ? 2 /* Two */ : 1 /* One */);
  });
  return map;
}
function getMediaQualityLevel() {
  const values = (0, import_RemoteConfig.getValue)("desktop.mediaQuality.levels");
  if (!values) {
    return DEFAULT_LEVEL;
  }
  const e164 = window.textsecure.storage.user.getNumber();
  if (!e164) {
    return DEFAULT_LEVEL;
  }
  const parsedPhoneNumber = (0, import_libphonenumberUtil.parseNumber)(e164);
  if (!parsedPhoneNumber.isValidNumber) {
    return DEFAULT_LEVEL;
  }
  const countryValues = parseCountryValues(values);
  const level = parsedPhoneNumber.countryCode ? countryValues.get(parsedPhoneNumber.countryCode) : void 0;
  if (level) {
    return level;
  }
  return countryValues.get("*") || DEFAULT_LEVEL;
}
async function getCanvasBlobAsJPEG(image, dimensions, quality) {
  const canvas = import_blueimp_load_image.default.scale(image, {
    canvas: true,
    maxHeight: dimensions,
    maxWidth: dimensions
  });
  if (!(canvas instanceof HTMLCanvasElement)) {
    throw new Error("image not a canvas");
  }
  return (0, import_canvasToBlob.canvasToBlob)(canvas, import_MIME.IMAGE_JPEG, quality);
}
async function scaleImageToLevel(fileOrBlobOrURL, contentType, sendAsHighQuality) {
  let image;
  try {
    const data = await (0, import_blueimp_load_image.default)(fileOrBlobOrURL, {
      canvas: true,
      orientation: true
    });
    if (!(data.image instanceof HTMLCanvasElement)) {
      throw new Error("image not a canvas");
    }
    ({ image } = data);
  } catch (err) {
    const error = new Error("scaleImageToLevel: Failed to process image");
    error.originalError = err;
    throw error;
  }
  const level = sendAsHighQuality ? 3 /* Three */ : getMediaQualityLevel();
  const { maxDimensions, quality, size, thresholdSize } = MEDIA_QUALITY_LEVEL_DATA.get(level) || DEFAULT_LEVEL_DATA;
  if (fileOrBlobOrURL.size <= thresholdSize) {
    const blob2 = await (0, import_canvasToBlob.canvasToBlob)(image, contentType);
    return {
      blob: blob2,
      contentType
    };
  }
  for (let i = 0; i < SCALABLE_DIMENSIONS.length; i += 1) {
    const scalableDimensions = SCALABLE_DIMENSIONS[i];
    if (maxDimensions < scalableDimensions) {
      continue;
    }
    const blob2 = await getCanvasBlobAsJPEG(image, scalableDimensions, quality);
    if (blob2.size <= size) {
      return {
        blob: blob2,
        contentType: import_MIME.IMAGE_JPEG
      };
    }
  }
  const blob = await getCanvasBlobAsJPEG(image, MIN_DIMENSIONS, quality);
  return {
    blob,
    contentType: import_MIME.IMAGE_JPEG
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  scaleImageToLevel
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2NhbGVJbWFnZVRvTGV2ZWwudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgbG9hZEltYWdlIGZyb20gJ2JsdWVpbXAtbG9hZC1pbWFnZSc7XG5cbmltcG9ydCB0eXBlIHsgTUlNRVR5cGUgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IElNQUdFX0pQRUcgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcbmltcG9ydCB7IGNhbnZhc1RvQmxvYiB9IGZyb20gJy4vY2FudmFzVG9CbG9iJztcbmltcG9ydCB7IGdldFZhbHVlIH0gZnJvbSAnLi4vUmVtb3RlQ29uZmlnJztcbmltcG9ydCB7IHBhcnNlTnVtYmVyIH0gZnJvbSAnLi9saWJwaG9uZW51bWJlclV0aWwnO1xuXG5lbnVtIE1lZGlhUXVhbGl0eUxldmVscyB7XG4gIE9uZSA9IDEsXG4gIFR3byA9IDIsXG4gIFRocmVlID0gMyxcbn1cblxuY29uc3QgREVGQVVMVF9MRVZFTCA9IE1lZGlhUXVhbGl0eUxldmVscy5PbmU7XG5cbmNvbnN0IE1pQiA9IDEwMjQgKiAxMDI0O1xuXG5jb25zdCBERUZBVUxUX0xFVkVMX0RBVEEgPSB7XG4gIG1heERpbWVuc2lvbnM6IDE2MDAsXG4gIHF1YWxpdHk6IDAuNyxcbiAgc2l6ZTogTWlCLFxuICB0aHJlc2hvbGRTaXplOiAwLjIgKiBNaUIsXG59O1xuXG5jb25zdCBNRURJQV9RVUFMSVRZX0xFVkVMX0RBVEEgPSBuZXcgTWFwKFtcbiAgW01lZGlhUXVhbGl0eUxldmVscy5PbmUsIERFRkFVTFRfTEVWRUxfREFUQV0sXG4gIFtcbiAgICBNZWRpYVF1YWxpdHlMZXZlbHMuVHdvLFxuICAgIHtcbiAgICAgIG1heERpbWVuc2lvbnM6IDIwNDgsXG4gICAgICBxdWFsaXR5OiAwLjc1LFxuICAgICAgc2l6ZTogTWlCICogMS41LFxuICAgICAgdGhyZXNob2xkU2l6ZTogMC4zICogTWlCLFxuICAgIH0sXG4gIF0sXG4gIFtcbiAgICBNZWRpYVF1YWxpdHlMZXZlbHMuVGhyZWUsXG4gICAge1xuICAgICAgbWF4RGltZW5zaW9uczogNDA5NixcbiAgICAgIHF1YWxpdHk6IDAuNzUsXG4gICAgICBzaXplOiBNaUIgKiAzLFxuICAgICAgdGhyZXNob2xkU2l6ZTogMC40ICogTWlCLFxuICAgIH0sXG4gIF0sXG5dKTtcblxuY29uc3QgU0NBTEFCTEVfRElNRU5TSU9OUyA9IFszMDcyLCAyMDQ4LCAxNjAwLCAxMDI0LCA3NjhdO1xuY29uc3QgTUlOX0RJTUVOU0lPTlMgPSA1MTI7XG5cbmZ1bmN0aW9uIHBhcnNlQ291bnRyeVZhbHVlcyh2YWx1ZXM6IHN0cmluZyk6IE1hcDxzdHJpbmcsIE1lZGlhUXVhbGl0eUxldmVscz4ge1xuICBjb25zdCBtYXAgPSBuZXcgTWFwPHN0cmluZywgTWVkaWFRdWFsaXR5TGV2ZWxzPigpO1xuICB2YWx1ZXMuc3BsaXQoJywnKS5mb3JFYWNoKHZhbHVlID0+IHtcbiAgICBjb25zdCBbY291bnRyeUNvZGUsIGxldmVsXSA9IHZhbHVlLnNwbGl0KCc6Jyk7XG4gICAgbWFwLnNldChcbiAgICAgIGNvdW50cnlDb2RlLFxuICAgICAgTnVtYmVyKGxldmVsKSA9PT0gMiA/IE1lZGlhUXVhbGl0eUxldmVscy5Ud28gOiBNZWRpYVF1YWxpdHlMZXZlbHMuT25lXG4gICAgKTtcbiAgfSk7XG4gIHJldHVybiBtYXA7XG59XG5cbmZ1bmN0aW9uIGdldE1lZGlhUXVhbGl0eUxldmVsKCk6IE1lZGlhUXVhbGl0eUxldmVscyB7XG4gIGNvbnN0IHZhbHVlcyA9IGdldFZhbHVlKCdkZXNrdG9wLm1lZGlhUXVhbGl0eS5sZXZlbHMnKTtcbiAgaWYgKCF2YWx1ZXMpIHtcbiAgICByZXR1cm4gREVGQVVMVF9MRVZFTDtcbiAgfVxuXG4gIGNvbnN0IGUxNjQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0TnVtYmVyKCk7XG4gIGlmICghZTE2NCkge1xuICAgIHJldHVybiBERUZBVUxUX0xFVkVMO1xuICB9XG5cbiAgY29uc3QgcGFyc2VkUGhvbmVOdW1iZXIgPSBwYXJzZU51bWJlcihlMTY0KTtcbiAgaWYgKCFwYXJzZWRQaG9uZU51bWJlci5pc1ZhbGlkTnVtYmVyKSB7XG4gICAgcmV0dXJuIERFRkFVTFRfTEVWRUw7XG4gIH1cblxuICBjb25zdCBjb3VudHJ5VmFsdWVzID0gcGFyc2VDb3VudHJ5VmFsdWVzKHZhbHVlcyk7XG5cbiAgY29uc3QgbGV2ZWwgPSBwYXJzZWRQaG9uZU51bWJlci5jb3VudHJ5Q29kZVxuICAgID8gY291bnRyeVZhbHVlcy5nZXQocGFyc2VkUGhvbmVOdW1iZXIuY291bnRyeUNvZGUpXG4gICAgOiB1bmRlZmluZWQ7XG4gIGlmIChsZXZlbCkge1xuICAgIHJldHVybiBsZXZlbDtcbiAgfVxuXG4gIHJldHVybiBjb3VudHJ5VmFsdWVzLmdldCgnKicpIHx8IERFRkFVTFRfTEVWRUw7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGdldENhbnZhc0Jsb2JBc0pQRUcoXG4gIGltYWdlOiBIVE1MQ2FudmFzRWxlbWVudCxcbiAgZGltZW5zaW9uczogbnVtYmVyLFxuICBxdWFsaXR5OiBudW1iZXJcbik6IFByb21pc2U8QmxvYj4ge1xuICBjb25zdCBjYW52YXMgPSBsb2FkSW1hZ2Uuc2NhbGUoaW1hZ2UsIHtcbiAgICBjYW52YXM6IHRydWUsXG4gICAgbWF4SGVpZ2h0OiBkaW1lbnNpb25zLFxuICAgIG1heFdpZHRoOiBkaW1lbnNpb25zLFxuICB9KTtcbiAgaWYgKCEoY2FudmFzIGluc3RhbmNlb2YgSFRNTENhbnZhc0VsZW1lbnQpKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdpbWFnZSBub3QgYSBjYW52YXMnKTtcbiAgfVxuICByZXR1cm4gY2FudmFzVG9CbG9iKGNhbnZhcywgSU1BR0VfSlBFRywgcXVhbGl0eSk7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBzY2FsZUltYWdlVG9MZXZlbChcbiAgZmlsZU9yQmxvYk9yVVJMOiBGaWxlIHwgQmxvYixcbiAgY29udGVudFR5cGU6IE1JTUVUeXBlLFxuICBzZW5kQXNIaWdoUXVhbGl0eT86IGJvb2xlYW5cbik6IFByb21pc2U8e1xuICBibG9iOiBCbG9iO1xuICBjb250ZW50VHlwZTogTUlNRVR5cGU7XG59PiB7XG4gIGxldCBpbWFnZTogSFRNTENhbnZhc0VsZW1lbnQ7XG4gIHRyeSB7XG4gICAgY29uc3QgZGF0YSA9IGF3YWl0IGxvYWRJbWFnZShmaWxlT3JCbG9iT3JVUkwsIHtcbiAgICAgIGNhbnZhczogdHJ1ZSxcbiAgICAgIG9yaWVudGF0aW9uOiB0cnVlLFxuICAgIH0pO1xuICAgIGlmICghKGRhdGEuaW1hZ2UgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignaW1hZ2Ugbm90IGEgY2FudmFzJyk7XG4gICAgfVxuICAgICh7IGltYWdlIH0gPSBkYXRhKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ3NjYWxlSW1hZ2VUb0xldmVsOiBGYWlsZWQgdG8gcHJvY2VzcyBpbWFnZScpO1xuICAgIGVycm9yLm9yaWdpbmFsRXJyb3IgPSBlcnI7XG4gICAgdGhyb3cgZXJyb3I7XG4gIH1cblxuICBjb25zdCBsZXZlbCA9IHNlbmRBc0hpZ2hRdWFsaXR5XG4gICAgPyBNZWRpYVF1YWxpdHlMZXZlbHMuVGhyZWVcbiAgICA6IGdldE1lZGlhUXVhbGl0eUxldmVsKCk7XG4gIGNvbnN0IHsgbWF4RGltZW5zaW9ucywgcXVhbGl0eSwgc2l6ZSwgdGhyZXNob2xkU2l6ZSB9ID1cbiAgICBNRURJQV9RVUFMSVRZX0xFVkVMX0RBVEEuZ2V0KGxldmVsKSB8fCBERUZBVUxUX0xFVkVMX0RBVEE7XG5cbiAgaWYgKGZpbGVPckJsb2JPclVSTC5zaXplIDw9IHRocmVzaG9sZFNpemUpIHtcbiAgICBjb25zdCBibG9iID0gYXdhaXQgY2FudmFzVG9CbG9iKGltYWdlLCBjb250ZW50VHlwZSk7XG4gICAgcmV0dXJuIHtcbiAgICAgIGJsb2IsXG4gICAgICBjb250ZW50VHlwZSxcbiAgICB9O1xuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCBTQ0FMQUJMRV9ESU1FTlNJT05TLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgY29uc3Qgc2NhbGFibGVEaW1lbnNpb25zID0gU0NBTEFCTEVfRElNRU5TSU9OU1tpXTtcbiAgICBpZiAobWF4RGltZW5zaW9ucyA8IHNjYWxhYmxlRGltZW5zaW9ucykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gV2UgbmVlZCB0aGVzZSBvcGVyYXRpb25zIHRvIGJlIGluIHNlcmlhbFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgY29uc3QgYmxvYiA9IGF3YWl0IGdldENhbnZhc0Jsb2JBc0pQRUcoaW1hZ2UsIHNjYWxhYmxlRGltZW5zaW9ucywgcXVhbGl0eSk7XG4gICAgaWYgKGJsb2Iuc2l6ZSA8PSBzaXplKSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICBibG9iLFxuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfSlBFRyxcbiAgICAgIH07XG4gICAgfVxuICB9XG5cbiAgY29uc3QgYmxvYiA9IGF3YWl0IGdldENhbnZhc0Jsb2JBc0pQRUcoaW1hZ2UsIE1JTl9ESU1FTlNJT05TLCBxdWFsaXR5KTtcbiAgcmV0dXJuIHtcbiAgICBibG9iLFxuICAgIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICB9O1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLGdDQUFzQjtBQUd0QixrQkFBMkI7QUFDM0IsMEJBQTZCO0FBQzdCLDBCQUF5QjtBQUN6QixnQ0FBNEI7QUFFNUIsSUFBSyxxQkFBTCxrQkFBSyx3QkFBTDtB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
