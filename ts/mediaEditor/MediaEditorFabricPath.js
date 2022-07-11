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
var MediaEditorFabricPath_exports = {};
__export(MediaEditorFabricPath_exports, {
  MediaEditorFabricPath: () => MediaEditorFabricPath
});
module.exports = __toCommonJS(MediaEditorFabricPath_exports);
var import_fabric = require("fabric");
class MediaEditorFabricPath extends import_fabric.fabric.Path {
  constructor(path, options) {
    super(path, {
      evented: false,
      fill: void 0,
      hasControls: false,
      lockScalingFlip: true,
      selectable: false,
      ...options || {}
    });
  }
  static fromObject(options, callback) {
    const result = new MediaEditorFabricPath(options.path, options);
    callback(result);
    return result;
  }
}
MediaEditorFabricPath.prototype.type = "MediaEditorFabricPath";
MediaEditorFabricPath.prototype.borderColor = "#ffffff";
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditorFabricPath
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3JGYWJyaWNQYXRoLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGZhYnJpYyB9IGZyb20gJ2ZhYnJpYyc7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYUVkaXRvckZhYnJpY1BhdGggZXh0ZW5kcyBmYWJyaWMuUGF0aCB7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHBhdGg/OiBzdHJpbmcgfCBBcnJheTxmYWJyaWMuUG9pbnQ+LFxuICAgIG9wdGlvbnM/OiBmYWJyaWMuSVBhdGhPcHRpb25zXG4gICkge1xuICAgIHN1cGVyKHBhdGgsIHtcbiAgICAgIGV2ZW50ZWQ6IGZhbHNlLFxuICAgICAgZmlsbDogdW5kZWZpbmVkLFxuICAgICAgaGFzQ29udHJvbHM6IGZhbHNlLFxuICAgICAgbG9ja1NjYWxpbmdGbGlwOiB0cnVlLFxuICAgICAgc2VsZWN0YWJsZTogZmFsc2UsXG4gICAgICAuLi4ob3B0aW9ucyB8fCB7fSksXG4gICAgfSk7XG4gIH1cblxuICBzdGF0aWMgb3ZlcnJpZGUgZnJvbU9iamVjdChcbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbWF4LWxlblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55LCBAdHlwZXNjcmlwdC1lc2xpbnQvZXhwbGljaXQtbW9kdWxlLWJvdW5kYXJ5LXR5cGVzXG4gICAgb3B0aW9uczogYW55LFxuICAgIGNhbGxiYWNrOiAoXzogTWVkaWFFZGl0b3JGYWJyaWNQYXRoKSA9PiB1bmtub3duXG4gICk6IE1lZGlhRWRpdG9yRmFicmljUGF0aCB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IE1lZGlhRWRpdG9yRmFicmljUGF0aChvcHRpb25zLnBhdGgsIG9wdGlvbnMpO1xuICAgIGNhbGxiYWNrKHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfVxufVxuXG5NZWRpYUVkaXRvckZhYnJpY1BhdGgucHJvdG90eXBlLnR5cGUgPSAnTWVkaWFFZGl0b3JGYWJyaWNQYXRoJztcbk1lZGlhRWRpdG9yRmFicmljUGF0aC5wcm90b3R5cGUuYm9yZGVyQ29sb3IgPSAnI2ZmZmZmZic7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBRWhCLE1BQU0sOEJBQThCLHFCQUFPLEtBQUs7QUFBQSxFQUNyRCxZQUNFLE1BQ0EsU0FDQTtBQUNBLFVBQU0sTUFBTTtBQUFBLE1BQ1YsU0FBUztBQUFBLE1BQ1QsTUFBTTtBQUFBLE1BQ04sYUFBYTtBQUFBLE1BQ2IsaUJBQWlCO0FBQUEsTUFDakIsWUFBWTtBQUFBLFNBQ1IsV0FBVyxDQUFDO0FBQUEsSUFDbEIsQ0FBQztBQUFBLEVBQ0g7QUFBQSxTQUVnQixXQUdkLFNBQ0EsVUFDdUI7QUFDdkIsVUFBTSxTQUFTLElBQUksc0JBQXNCLFFBQVEsTUFBTSxPQUFPO0FBQzlELGFBQVMsTUFBTTtBQUNmLFdBQU87QUFBQSxFQUNUO0FBQ0Y7QUF6Qk8sQUEyQlAsc0JBQXNCLFVBQVUsT0FBTztBQUN2QyxzQkFBc0IsVUFBVSxjQUFjOyIsCiAgIm5hbWVzIjogW10KfQo=
