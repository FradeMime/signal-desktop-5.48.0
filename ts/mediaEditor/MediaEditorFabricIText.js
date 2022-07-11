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
var MediaEditorFabricIText_exports = {};
__export(MediaEditorFabricIText_exports, {
  MediaEditorFabricIText: () => MediaEditorFabricIText
});
module.exports = __toCommonJS(MediaEditorFabricIText_exports);
var import_fabric = require("fabric");
var import_customFabricObjectControls = require("./util/customFabricObjectControls");
class MediaEditorFabricIText extends import_fabric.fabric.IText {
  constructor(text, options) {
    super(text, {
      fontFamily: "Inter",
      fontWeight: "bold",
      lockScalingFlip: true,
      originX: "center",
      originY: "center",
      textAlign: "center",
      ...options
    });
    this.on("modified", () => this.canvas?.bringToFront(this));
  }
  static fromObject(options, callback) {
    const result = new MediaEditorFabricIText(options.text, options);
    callback(result);
    return result;
  }
}
MediaEditorFabricIText.prototype.type = "MediaEditorFabricIText";
MediaEditorFabricIText.prototype.lockScalingFlip = true;
MediaEditorFabricIText.prototype.borderColor = "#ffffff";
MediaEditorFabricIText.prototype.controls = import_customFabricObjectControls.customFabricObjectControls;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditorFabricIText
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3JGYWJyaWNJVGV4dC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBmYWJyaWMgfSBmcm9tICdmYWJyaWMnO1xuaW1wb3J0IHsgY3VzdG9tRmFicmljT2JqZWN0Q29udHJvbHMgfSBmcm9tICcuL3V0aWwvY3VzdG9tRmFicmljT2JqZWN0Q29udHJvbHMnO1xuXG5leHBvcnQgY2xhc3MgTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCBleHRlbmRzIGZhYnJpYy5JVGV4dCB7XG4gIGNvbnN0cnVjdG9yKHRleHQ6IHN0cmluZywgb3B0aW9uczogZmFicmljLklUZXh0T3B0aW9ucykge1xuICAgIHN1cGVyKHRleHQsIHtcbiAgICAgIGZvbnRGYW1pbHk6ICdJbnRlcicsXG4gICAgICBmb250V2VpZ2h0OiAnYm9sZCcsXG4gICAgICBsb2NrU2NhbGluZ0ZsaXA6IHRydWUsXG4gICAgICBvcmlnaW5YOiAnY2VudGVyJyxcbiAgICAgIG9yaWdpblk6ICdjZW50ZXInLFxuICAgICAgdGV4dEFsaWduOiAnY2VudGVyJyxcbiAgICAgIC4uLm9wdGlvbnMsXG4gICAgfSk7XG5cbiAgICB0aGlzLm9uKCdtb2RpZmllZCcsICgpID0+IHRoaXMuY2FudmFzPy5icmluZ1RvRnJvbnQodGhpcykpO1xuICB9XG5cbiAgc3RhdGljIG92ZXJyaWRlIGZyb21PYmplY3QoXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG1heC1sZW5cbiAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgQHR5cGVzY3JpcHQtZXNsaW50L25vLWV4cGxpY2l0LWFueSwgQHR5cGVzY3JpcHQtZXNsaW50L2V4cGxpY2l0LW1vZHVsZS1ib3VuZGFyeS10eXBlc1xuICAgIG9wdGlvbnM6IGFueSxcbiAgICBjYWxsYmFjazogKF86IE1lZGlhRWRpdG9yRmFicmljSVRleHQpID0+IHVua25vd25cbiAgKTogTWVkaWFFZGl0b3JGYWJyaWNJVGV4dCB7XG4gICAgY29uc3QgcmVzdWx0ID0gbmV3IE1lZGlhRWRpdG9yRmFicmljSVRleHQob3B0aW9ucy50ZXh0LCBvcHRpb25zKTtcbiAgICBjYWxsYmFjayhyZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH1cbn1cblxuTWVkaWFFZGl0b3JGYWJyaWNJVGV4dC5wcm90b3R5cGUudHlwZSA9ICdNZWRpYUVkaXRvckZhYnJpY0lUZXh0Jztcbk1lZGlhRWRpdG9yRmFicmljSVRleHQucHJvdG90eXBlLmxvY2tTY2FsaW5nRmxpcCA9IHRydWU7XG5NZWRpYUVkaXRvckZhYnJpY0lUZXh0LnByb3RvdHlwZS5ib3JkZXJDb2xvciA9ICcjZmZmZmZmJztcbk1lZGlhRWRpdG9yRmFicmljSVRleHQucHJvdG90eXBlLmNvbnRyb2xzID0gY3VzdG9tRmFicmljT2JqZWN0Q29udHJvbHM7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBQ3ZCLHdDQUEyQztBQUVwQyxNQUFNLCtCQUErQixxQkFBTyxNQUFNO0FBQUEsRUFDdkQsWUFBWSxNQUFjLFNBQThCO0FBQ3RELFVBQU0sTUFBTTtBQUFBLE1BQ1YsWUFBWTtBQUFBLE1BQ1osWUFBWTtBQUFBLE1BQ1osaUJBQWlCO0FBQUEsTUFDakIsU0FBUztBQUFBLE1BQ1QsU0FBUztBQUFBLE1BQ1QsV0FBVztBQUFBLFNBQ1I7QUFBQSxJQUNMLENBQUM7QUFFRCxTQUFLLEdBQUcsWUFBWSxNQUFNLEtBQUssUUFBUSxhQUFhLElBQUksQ0FBQztBQUFBLEVBQzNEO0FBQUEsU0FFZ0IsV0FHZCxTQUNBLFVBQ3dCO0FBQ3hCLFVBQU0sU0FBUyxJQUFJLHVCQUF1QixRQUFRLE1BQU0sT0FBTztBQUMvRCxhQUFTLE1BQU07QUFDZixXQUFPO0FBQUEsRUFDVDtBQUNGO0FBekJPLEFBMkJQLHVCQUF1QixVQUFVLE9BQU87QUFDeEMsdUJBQXVCLFVBQVUsa0JBQWtCO0FBQ25ELHVCQUF1QixVQUFVLGNBQWM7QUFDL0MsdUJBQXVCLFVBQVUsV0FBVzsiLAogICJuYW1lcyI6IFtdCn0K
