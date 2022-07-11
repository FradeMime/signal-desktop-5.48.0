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
var canvasToBlob_exports = {};
__export(canvasToBlob_exports, {
  canvasToBlob: () => canvasToBlob
});
module.exports = __toCommonJS(canvasToBlob_exports);
var import_MIME = require("../types/MIME");
async function canvasToBlob(canvas, mimeType = import_MIME.IMAGE_JPEG, quality) {
  return new Promise((resolve, reject) => canvas.toBlob((result) => {
    if (result) {
      resolve(result);
    } else {
      reject(new Error("Couldn't convert the canvas to a Blob"));
    }
  }, mimeType, quality));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  canvasToBlob
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FudmFzVG9CbG9iLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IElNQUdFX0pQRUcgfSBmcm9tICcuLi90eXBlcy9NSU1FJztcblxuLyoqXG4gKiBTaW1pbGFyIHRvIFt0aGUgYnVpbHQtaW4gYHRvQmxvYmAgbWV0aG9kXVswXSwgYnV0IHJldHVybnMgYSBQcm9taXNlLlxuICpcbiAqIFswXTogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0hUTUxDYW52YXNFbGVtZW50L3RvQmxvYlxuICovXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gY2FudmFzVG9CbG9iKFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50LFxuICBtaW1lVHlwZSA9IElNQUdFX0pQRUcsXG4gIHF1YWxpdHk/OiBudW1iZXJcbik6IFByb21pc2U8QmxvYj4ge1xuICByZXR1cm4gbmV3IFByb21pc2UoKHJlc29sdmUsIHJlamVjdCkgPT5cbiAgICBjYW52YXMudG9CbG9iKFxuICAgICAgcmVzdWx0ID0+IHtcbiAgICAgICAgaWYgKHJlc3VsdCkge1xuICAgICAgICAgIHJlc29sdmUocmVzdWx0KTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZWplY3QobmV3IEVycm9yKFwiQ291bGRuJ3QgY29udmVydCB0aGUgY2FudmFzIHRvIGEgQmxvYlwiKSk7XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW1lVHlwZSxcbiAgICAgIHF1YWxpdHlcbiAgICApXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQTJCO0FBTzNCLDRCQUNFLFFBQ0EsV0FBVyx3QkFDWCxTQUNlO0FBQ2YsU0FBTyxJQUFJLFFBQVEsQ0FBQyxTQUFTLFdBQzNCLE9BQU8sT0FDTCxZQUFVO0FBQ1IsUUFBSSxRQUFRO0FBQ1YsY0FBUSxNQUFNO0FBQUEsSUFDaEIsT0FBTztBQUNMLGFBQU8sSUFBSSxNQUFNLHVDQUF1QyxDQUFDO0FBQUEsSUFDM0Q7QUFBQSxFQUNGLEdBQ0EsVUFDQSxPQUNGLENBQ0Y7QUFDRjtBQWxCc0IiLAogICJuYW1lcyI6IFtdCn0K
