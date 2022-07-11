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
var MediaEditorFabricSticker_exports = {};
__export(MediaEditorFabricSticker_exports, {
  MediaEditorFabricSticker: () => MediaEditorFabricSticker
});
module.exports = __toCommonJS(MediaEditorFabricSticker_exports);
var import_fabric = require("fabric");
var import_customFabricObjectControls = require("./util/customFabricObjectControls");
class MediaEditorFabricSticker extends import_fabric.fabric.Image {
  constructor(element, options = {}) {
    let normalizedElement;
    if (typeof element === "string") {
      normalizedElement = new Image();
      normalizedElement.src = element;
    } else {
      normalizedElement = element;
    }
    super(normalizedElement, options);
    this.on("modified", () => this.canvas?.bringToFront(this));
  }
  static fromObject(options, callback) {
    callback(new MediaEditorFabricSticker(options.src, options));
  }
}
MediaEditorFabricSticker.prototype.type = "MediaEditorFabricSticker";
MediaEditorFabricSticker.prototype.borderColor = "#ffffff";
MediaEditorFabricSticker.prototype.controls = import_customFabricObjectControls.customFabricObjectControls;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditorFabricSticker
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3JGYWJyaWNTdGlja2VyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGZhYnJpYyB9IGZyb20gJ2ZhYnJpYyc7XG5pbXBvcnQgeyBjdXN0b21GYWJyaWNPYmplY3RDb250cm9scyB9IGZyb20gJy4vdXRpbC9jdXN0b21GYWJyaWNPYmplY3RDb250cm9scyc7XG5cbmV4cG9ydCBjbGFzcyBNZWRpYUVkaXRvckZhYnJpY1N0aWNrZXIgZXh0ZW5kcyBmYWJyaWMuSW1hZ2Uge1xuICBjb25zdHJ1Y3RvcihcbiAgICBlbGVtZW50OiBzdHJpbmcgfCBIVE1MSW1hZ2VFbGVtZW50IHwgSFRNTFZpZGVvRWxlbWVudCxcbiAgICBvcHRpb25zOiBmYWJyaWMuSUltYWdlT3B0aW9ucyA9IHt9XG4gICkge1xuICAgIC8vIEZhYnJpYyBzZWVtcyB0byBoYXZlIGlzc3VlcyB3aGVuIHBhc3NlZCBhIHN0cmluZywgYnV0IG5vdCBhbiBJbWFnZS5cbiAgICBsZXQgbm9ybWFsaXplZEVsZW1lbnQ6IHVuZGVmaW5lZCB8IEhUTUxJbWFnZUVsZW1lbnQgfCBIVE1MVmlkZW9FbGVtZW50O1xuICAgIGlmICh0eXBlb2YgZWxlbWVudCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIG5vcm1hbGl6ZWRFbGVtZW50ID0gbmV3IEltYWdlKCk7XG4gICAgICBub3JtYWxpemVkRWxlbWVudC5zcmMgPSBlbGVtZW50O1xuICAgIH0gZWxzZSB7XG4gICAgICBub3JtYWxpemVkRWxlbWVudCA9IGVsZW1lbnQ7XG4gICAgfVxuXG4gICAgc3VwZXIobm9ybWFsaXplZEVsZW1lbnQsIG9wdGlvbnMpO1xuXG4gICAgdGhpcy5vbignbW9kaWZpZWQnLCAoKSA9PiB0aGlzLmNhbnZhcz8uYnJpbmdUb0Zyb250KHRoaXMpKTtcbiAgfVxuXG4gIHN0YXRpYyBmcm9tT2JqZWN0KFxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBtYXgtbGVuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnksIEB0eXBlc2NyaXB0LWVzbGludC9leHBsaWNpdC1tb2R1bGUtYm91bmRhcnktdHlwZXNcbiAgICBvcHRpb25zOiBhbnksXG4gICAgY2FsbGJhY2s6IChfOiBNZWRpYUVkaXRvckZhYnJpY1N0aWNrZXIpID0+IHVua25vd25cbiAgKTogdm9pZCB7XG4gICAgY2FsbGJhY2sobmV3IE1lZGlhRWRpdG9yRmFicmljU3RpY2tlcihvcHRpb25zLnNyYywgb3B0aW9ucykpO1xuICB9XG59XG5cbk1lZGlhRWRpdG9yRmFicmljU3RpY2tlci5wcm90b3R5cGUudHlwZSA9ICdNZWRpYUVkaXRvckZhYnJpY1N0aWNrZXInO1xuTWVkaWFFZGl0b3JGYWJyaWNTdGlja2VyLnByb3RvdHlwZS5ib3JkZXJDb2xvciA9ICcjZmZmZmZmJztcbk1lZGlhRWRpdG9yRmFicmljU3RpY2tlci5wcm90b3R5cGUuY29udHJvbHMgPSBjdXN0b21GYWJyaWNPYmplY3RDb250cm9scztcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBdUI7QUFDdkIsd0NBQTJDO0FBRXBDLE1BQU0saUNBQWlDLHFCQUFPLE1BQU07QUFBQSxFQUN6RCxZQUNFLFNBQ0EsVUFBZ0MsQ0FBQyxHQUNqQztBQUVBLFFBQUk7QUFDSixRQUFJLE9BQU8sWUFBWSxVQUFVO0FBQy9CLDBCQUFvQixJQUFJLE1BQU07QUFDOUIsd0JBQWtCLE1BQU07QUFBQSxJQUMxQixPQUFPO0FBQ0wsMEJBQW9CO0FBQUEsSUFDdEI7QUFFQSxVQUFNLG1CQUFtQixPQUFPO0FBRWhDLFNBQUssR0FBRyxZQUFZLE1BQU0sS0FBSyxRQUFRLGFBQWEsSUFBSSxDQUFDO0FBQUEsRUFDM0Q7QUFBQSxTQUVPLFdBR0wsU0FDQSxVQUNNO0FBQ04sYUFBUyxJQUFJLHlCQUF5QixRQUFRLEtBQUssT0FBTyxDQUFDO0FBQUEsRUFDN0Q7QUFDRjtBQTNCTyxBQTZCUCx5QkFBeUIsVUFBVSxPQUFPO0FBQzFDLHlCQUF5QixVQUFVLGNBQWM7QUFDakQseUJBQXlCLFVBQVUsV0FBVzsiLAogICJuYW1lcyI6IFtdCn0K
