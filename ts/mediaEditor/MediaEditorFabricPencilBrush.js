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
var MediaEditorFabricPencilBrush_exports = {};
__export(MediaEditorFabricPencilBrush_exports, {
  MediaEditorFabricPencilBrush: () => MediaEditorFabricPencilBrush
});
module.exports = __toCommonJS(MediaEditorFabricPencilBrush_exports);
var import_fabric = require("fabric");
var import_MediaEditorFabricPath = require("./MediaEditorFabricPath");
class MediaEditorFabricPencilBrush extends import_fabric.fabric.PencilBrush {
  createPath(pathData) {
    return new import_MediaEditorFabricPath.MediaEditorFabricPath(pathData, {
      fill: void 0,
      stroke: this.color,
      strokeWidth: this.width,
      strokeLineCap: this.strokeLineCap,
      strokeMiterLimit: this.strokeMiterLimit,
      strokeLineJoin: this.strokeLineJoin,
      strokeDashArray: this.strokeDashArray
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditorFabricPencilBrush
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3JGYWJyaWNQZW5jaWxCcnVzaC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBmYWJyaWMgfSBmcm9tICdmYWJyaWMnO1xuaW1wb3J0IHsgTWVkaWFFZGl0b3JGYWJyaWNQYXRoIH0gZnJvbSAnLi9NZWRpYUVkaXRvckZhYnJpY1BhdGgnO1xuXG5leHBvcnQgY2xhc3MgTWVkaWFFZGl0b3JGYWJyaWNQZW5jaWxCcnVzaCBleHRlbmRzIGZhYnJpYy5QZW5jaWxCcnVzaCB7XG4gIHB1YmxpYyBzdHJva2VNaXRlckxpbWl0OiB1bmRlZmluZWQgfCBudW1iZXI7XG5cbiAgb3ZlcnJpZGUgY3JlYXRlUGF0aChcbiAgICBwYXRoRGF0YT86IHN0cmluZyB8IEFycmF5PGZhYnJpYy5Qb2ludD5cbiAgKTogTWVkaWFFZGl0b3JGYWJyaWNQYXRoIHtcbiAgICByZXR1cm4gbmV3IE1lZGlhRWRpdG9yRmFicmljUGF0aChwYXRoRGF0YSwge1xuICAgICAgZmlsbDogdW5kZWZpbmVkLFxuICAgICAgc3Ryb2tlOiB0aGlzLmNvbG9yLFxuICAgICAgc3Ryb2tlV2lkdGg6IHRoaXMud2lkdGgsXG4gICAgICBzdHJva2VMaW5lQ2FwOiB0aGlzLnN0cm9rZUxpbmVDYXAsXG4gICAgICBzdHJva2VNaXRlckxpbWl0OiB0aGlzLnN0cm9rZU1pdGVyTGltaXQsXG4gICAgICBzdHJva2VMaW5lSm9pbjogdGhpcy5zdHJva2VMaW5lSm9pbixcbiAgICAgIHN0cm9rZURhc2hBcnJheTogdGhpcy5zdHJva2VEYXNoQXJyYXksXG4gICAgfSk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBdUI7QUFDdkIsbUNBQXNDO0FBRS9CLE1BQU0scUNBQXFDLHFCQUFPLFlBQVk7QUFBQSxFQUcxRCxXQUNQLFVBQ3VCO0FBQ3ZCLFdBQU8sSUFBSSxtREFBc0IsVUFBVTtBQUFBLE1BQ3pDLE1BQU07QUFBQSxNQUNOLFFBQVEsS0FBSztBQUFBLE1BQ2IsYUFBYSxLQUFLO0FBQUEsTUFDbEIsZUFBZSxLQUFLO0FBQUEsTUFDcEIsa0JBQWtCLEtBQUs7QUFBQSxNQUN2QixnQkFBZ0IsS0FBSztBQUFBLE1BQ3JCLGlCQUFpQixLQUFLO0FBQUEsSUFDeEIsQ0FBQztBQUFBLEVBQ0g7QUFDRjtBQWhCTyIsCiAgIm5hbWVzIjogW10KfQo=
