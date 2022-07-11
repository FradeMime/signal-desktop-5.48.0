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
var imageToBlurHash_exports = {};
__export(imageToBlurHash_exports, {
  imageToBlurHash: () => imageToBlurHash
});
module.exports = __toCommonJS(imageToBlurHash_exports);
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_blurhash = require("blurhash");
const loadImageData = /* @__PURE__ */ __name(async (input) => {
  return new Promise((resolve, reject) => {
    (0, import_blueimp_load_image.default)(input, (canvasOrError) => {
      if (canvasOrError instanceof Event && canvasOrError.type === "error") {
        const processError = new Error("imageToBlurHash: Failed to process image");
        processError.originalError = canvasOrError;
        reject(processError);
        return;
      }
      if (!(canvasOrError instanceof HTMLCanvasElement)) {
        reject(new Error("imageToBlurHash: result is not a canvas"));
        return;
      }
      const context = canvasOrError.getContext("2d");
      if (!context) {
        reject(new Error("imageToBlurHash: cannot get CanvasRenderingContext2D from canvas"));
        return;
      }
      resolve(context.getImageData(0, 0, canvasOrError.width, canvasOrError.height));
    }, { canvas: true, orientation: true, maxWidth: 200, maxHeight: 200 });
  });
}, "loadImageData");
const imageToBlurHash = /* @__PURE__ */ __name(async (input) => {
  const { data, width, height } = await loadImageData(input);
  return (0, import_blurhash.encode)(data, width, height, 4, 3);
}, "imageToBlurHash");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  imageToBlurHash
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW1hZ2VUb0JsdXJIYXNoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnYmx1ZWltcC1sb2FkLWltYWdlJztcbmltcG9ydCB7IGVuY29kZSB9IGZyb20gJ2JsdXJoYXNoJztcblxudHlwZSBJbnB1dCA9IFBhcmFtZXRlcnM8dHlwZW9mIGxvYWRJbWFnZT5bMF07XG5cbmNvbnN0IGxvYWRJbWFnZURhdGEgPSBhc3luYyAoaW5wdXQ6IElucHV0KTogUHJvbWlzZTxJbWFnZURhdGE+ID0+IHtcbiAgcmV0dXJuIG5ldyBQcm9taXNlKChyZXNvbHZlLCByZWplY3QpID0+IHtcbiAgICBsb2FkSW1hZ2UoXG4gICAgICBpbnB1dCxcbiAgICAgIGNhbnZhc09yRXJyb3IgPT4ge1xuICAgICAgICBpZiAoY2FudmFzT3JFcnJvciBpbnN0YW5jZW9mIEV2ZW50ICYmIGNhbnZhc09yRXJyb3IudHlwZSA9PT0gJ2Vycm9yJykge1xuICAgICAgICAgIGNvbnN0IHByb2Nlc3NFcnJvciA9IG5ldyBFcnJvcihcbiAgICAgICAgICAgICdpbWFnZVRvQmx1ckhhc2g6IEZhaWxlZCB0byBwcm9jZXNzIGltYWdlJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgcHJvY2Vzc0Vycm9yLm9yaWdpbmFsRXJyb3IgPSBjYW52YXNPckVycm9yO1xuICAgICAgICAgIHJlamVjdChwcm9jZXNzRXJyb3IpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGlmICghKGNhbnZhc09yRXJyb3IgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKCdpbWFnZVRvQmx1ckhhc2g6IHJlc3VsdCBpcyBub3QgYSBjYW52YXMnKSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgY29udGV4dCA9IGNhbnZhc09yRXJyb3IuZ2V0Q29udGV4dCgnMmQnKTtcbiAgICAgICAgaWYgKCFjb250ZXh0KSB7XG4gICAgICAgICAgcmVqZWN0KFxuICAgICAgICAgICAgbmV3IEVycm9yKFxuICAgICAgICAgICAgICAnaW1hZ2VUb0JsdXJIYXNoOiBjYW5ub3QgZ2V0IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCBmcm9tIGNhbnZhcydcbiAgICAgICAgICAgIClcbiAgICAgICAgICApO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIHJlc29sdmUoXG4gICAgICAgICAgY29udGV4dC5nZXRJbWFnZURhdGEoMCwgMCwgY2FudmFzT3JFcnJvci53aWR0aCwgY2FudmFzT3JFcnJvci5oZWlnaHQpXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgICAgLy8gQ2FsY3VsYXRpbmcgdGhlIGJsdXJoYXNoIG9uIGxhcmdlIGltYWdlcyBpcyBhIGxvbmctcnVubmluZyBhbmRcbiAgICAgIC8vIHN5bmNocm9ub3VzIG9wZXJhdGlvbiwgc28gaGVyZSB3ZSBlbnN1cmUgdGhlIGltYWdlcyBhcmUgYSByZWFzb25hYmxlXG4gICAgICAvLyBzaXplIGJlZm9yZSBjYWxjdWxhdGluZyB0aGUgYmx1cmhhc2guIGlPUyB1c2VzIGEgbWF4IHNpemUgb2YgMjAweDIwMFxuICAgICAgLy8gYW5kIEFuZHJvaWQgdXNlcyBhIG1heCBzaXplIG9mIDEvMTYgdGhlIG9yaWdpbmFsIHNpemUuIDIwMHgyMDAgaXNcbiAgICAgIC8vIGVhc2llciBmb3IgdXMuXG4gICAgICB7IGNhbnZhczogdHJ1ZSwgb3JpZW50YXRpb246IHRydWUsIG1heFdpZHRoOiAyMDAsIG1heEhlaWdodDogMjAwIH1cbiAgICApO1xuICB9KTtcbn07XG5cbmV4cG9ydCBjb25zdCBpbWFnZVRvQmx1ckhhc2ggPSBhc3luYyAoaW5wdXQ6IElucHV0KTogUHJvbWlzZTxzdHJpbmc+ID0+IHtcbiAgY29uc3QgeyBkYXRhLCB3aWR0aCwgaGVpZ2h0IH0gPSBhd2FpdCBsb2FkSW1hZ2VEYXRhKGlucHV0KTtcbiAgLy8gNCBob3Jpem9udGFsIGNvbXBvbmVudHMgYW5kIDMgdmVydGljYWwgY29tcG9uZW50c1xuICByZXR1cm4gZW5jb2RlKGRhdGEsIHdpZHRoLCBoZWlnaHQsIDQsIDMpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxnQ0FBc0I7QUFDdEIsc0JBQXVCO0FBSXZCLE1BQU0sZ0JBQWdCLDhCQUFPLFVBQXFDO0FBQ2hFLFNBQU8sSUFBSSxRQUFRLENBQUMsU0FBUyxXQUFXO0FBQ3RDLDJDQUNFLE9BQ0EsbUJBQWlCO0FBQ2YsVUFBSSx5QkFBeUIsU0FBUyxjQUFjLFNBQVMsU0FBUztBQUNwRSxjQUFNLGVBQWUsSUFBSSxNQUN2QiwwQ0FDRjtBQUNBLHFCQUFhLGdCQUFnQjtBQUM3QixlQUFPLFlBQVk7QUFDbkI7QUFBQSxNQUNGO0FBRUEsVUFBSSxDQUFFLDBCQUF5QixvQkFBb0I7QUFDakQsZUFBTyxJQUFJLE1BQU0seUNBQXlDLENBQUM7QUFDM0Q7QUFBQSxNQUNGO0FBRUEsWUFBTSxVQUFVLGNBQWMsV0FBVyxJQUFJO0FBQzdDLFVBQUksQ0FBQyxTQUFTO0FBQ1osZUFDRSxJQUFJLE1BQ0Ysa0VBQ0YsQ0FDRjtBQUNBO0FBQUEsTUFDRjtBQUVBLGNBQ0UsUUFBUSxhQUFhLEdBQUcsR0FBRyxjQUFjLE9BQU8sY0FBYyxNQUFNLENBQ3RFO0FBQUEsSUFDRixHQU1BLEVBQUUsUUFBUSxNQUFNLGFBQWEsTUFBTSxVQUFVLEtBQUssV0FBVyxJQUFJLENBQ25FO0FBQUEsRUFDRixDQUFDO0FBQ0gsR0F6Q3NCO0FBMkNmLE1BQU0sa0JBQWtCLDhCQUFPLFVBQWtDO0FBQ3RFLFFBQU0sRUFBRSxNQUFNLE9BQU8sV0FBVyxNQUFNLGNBQWMsS0FBSztBQUV6RCxTQUFPLDRCQUFPLE1BQU0sT0FBTyxRQUFRLEdBQUcsQ0FBQztBQUN6QyxHQUorQjsiLAogICJuYW1lcyI6IFtdCn0K
