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
var MediaEditorFabricCropRect_exports = {};
__export(MediaEditorFabricCropRect_exports, {
  MediaEditorFabricCropRect: () => MediaEditorFabricCropRect
});
module.exports = __toCommonJS(MediaEditorFabricCropRect_exports);
var import_fabric = require("fabric");
var import_lodash = require("lodash");
const _MediaEditorFabricCropRect = class extends import_fabric.fabric.Rect {
  constructor(options) {
    super({
      fill: void 0,
      lockScalingFlip: true,
      ...options || {}
    });
    this.on("modified", this.containBounds.bind(this));
  }
  containBounds() {
    if (!this.canvas) {
      return;
    }
    const zoom = this.canvas.getZoom() || 1;
    const { left, top, height, width } = this.getBoundingRect();
    const canvasHeight = this.canvas.getHeight();
    const canvasWidth = this.canvas.getWidth();
    if (height > canvasHeight || width > canvasWidth) {
      this.canvas.discardActiveObject();
    } else {
      this.set("left", (0, import_lodash.clamp)(left / zoom, _MediaEditorFabricCropRect.PADDING / zoom, (canvasWidth - width - _MediaEditorFabricCropRect.PADDING) / zoom));
      this.set("top", (0, import_lodash.clamp)(top / zoom, _MediaEditorFabricCropRect.PADDING / zoom, (canvasHeight - height - _MediaEditorFabricCropRect.PADDING) / zoom));
    }
    this.setCoords();
  }
  render(ctx) {
    super.render(ctx);
    const bounds = this.getBoundingRect();
    const zoom = this.canvas?.getZoom() || 1;
    const canvasWidth = (this.canvas?.getWidth() || 0) / zoom;
    const canvasHeight = (this.canvas?.getHeight() || 0) / zoom;
    const height = bounds.height / zoom;
    const left = bounds.left / zoom;
    const top = bounds.top / zoom;
    const width = bounds.width / zoom;
    ctx.save();
    ctx.fillStyle = "rgba(0, 0, 0, 0.4)";
    ctx.fillRect(0, 0, canvasWidth, top);
    ctx.fillRect(0, top, left, height);
    ctx.fillRect(0, height + top, canvasWidth, canvasHeight - top);
    ctx.fillRect(left + width, top, canvasWidth - left, height);
    ctx.restore();
  }
};
let MediaEditorFabricCropRect = _MediaEditorFabricCropRect;
MediaEditorFabricCropRect.PADDING = 4;
MediaEditorFabricCropRect.prototype.controls = {
  tl: new import_fabric.fabric.Control({
    x: -0.5,
    y: -0.5,
    actionHandler: import_fabric.fabric.controlsUtils.scalingEqually,
    cursorStyle: "nwse-resize",
    render: (ctx, left, top, _, rect) => {
      const WIDTH = getMinSize(rect.width);
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left - 2, top + WIDTH);
      ctx.lineTo(left - 2, top - 2);
      ctx.lineTo(left + WIDTH, top - 2);
      ctx.stroke();
      ctx.restore();
    }
  }),
  tr: new import_fabric.fabric.Control({
    x: 0.5,
    y: -0.5,
    actionHandler: import_fabric.fabric.controlsUtils.scalingEqually,
    cursorStyle: "nesw-resize",
    render: (ctx, left, top, _, rect) => {
      const WIDTH = getMinSize(rect.width);
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left + 2, top + WIDTH);
      ctx.lineTo(left + 2, top - 2);
      ctx.lineTo(left - WIDTH, top - 2);
      ctx.stroke();
      ctx.restore();
    }
  }),
  bl: new import_fabric.fabric.Control({
    x: -0.5,
    y: 0.5,
    actionHandler: import_fabric.fabric.controlsUtils.scalingEqually,
    cursorStyle: "nesw-resize",
    render: (ctx, left, top, _, rect) => {
      const WIDTH = getMinSize(rect.width);
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left - 2, top - WIDTH);
      ctx.lineTo(left - 2, top + 2);
      ctx.lineTo(left + WIDTH, top + 2);
      ctx.stroke();
      ctx.restore();
    }
  }),
  br: new import_fabric.fabric.Control({
    x: 0.5,
    y: 0.5,
    actionHandler: import_fabric.fabric.controlsUtils.scalingEqually,
    cursorStyle: "nwse-resize",
    render: (ctx, left, top, _, rect) => {
      const WIDTH = getMinSize(rect.width);
      ctx.save();
      ctx.fillStyle = "#fff";
      ctx.strokeStyle = "#fff";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(left + 2, top - WIDTH);
      ctx.lineTo(left + 2, top + 2);
      ctx.lineTo(left - WIDTH, top + 2);
      ctx.stroke();
      ctx.restore();
    }
  })
};
MediaEditorFabricCropRect.prototype.excludeFromExport = true;
MediaEditorFabricCropRect.prototype.borderColor = "#ffffff";
MediaEditorFabricCropRect.prototype.cornerColor = "#ffffff";
function getMinSize(width) {
  return Math.min(width || 24, 24);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  MediaEditorFabricCropRect
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBmYWJyaWMgfSBmcm9tICdmYWJyaWMnO1xuaW1wb3J0IHsgY2xhbXAgfSBmcm9tICdsb2Rhc2gnO1xuXG5leHBvcnQgY2xhc3MgTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdCBleHRlbmRzIGZhYnJpYy5SZWN0IHtcbiAgc3RhdGljIFBBRERJTkcgPSA0O1xuXG4gIGNvbnN0cnVjdG9yKG9wdGlvbnM/OiBmYWJyaWMuSVJlY3RPcHRpb25zKSB7XG4gICAgc3VwZXIoe1xuICAgICAgZmlsbDogdW5kZWZpbmVkLFxuICAgICAgbG9ja1NjYWxpbmdGbGlwOiB0cnVlLFxuICAgICAgLi4uKG9wdGlvbnMgfHwge30pLFxuICAgIH0pO1xuXG4gICAgdGhpcy5vbignbW9kaWZpZWQnLCB0aGlzLmNvbnRhaW5Cb3VuZHMuYmluZCh0aGlzKSk7XG4gIH1cblxuICBwcml2YXRlIGNvbnRhaW5Cb3VuZHMoKSB7XG4gICAgaWYgKCF0aGlzLmNhbnZhcykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHpvb20gPSB0aGlzLmNhbnZhcy5nZXRab29tKCkgfHwgMTtcblxuICAgIGNvbnN0IHsgbGVmdCwgdG9wLCBoZWlnaHQsIHdpZHRoIH0gPSB0aGlzLmdldEJvdW5kaW5nUmVjdCgpO1xuXG4gICAgY29uc3QgY2FudmFzSGVpZ2h0ID0gdGhpcy5jYW52YXMuZ2V0SGVpZ2h0KCk7XG4gICAgY29uc3QgY2FudmFzV2lkdGggPSB0aGlzLmNhbnZhcy5nZXRXaWR0aCgpO1xuXG4gICAgaWYgKGhlaWdodCA+IGNhbnZhc0hlaWdodCB8fCB3aWR0aCA+IGNhbnZhc1dpZHRoKSB7XG4gICAgICB0aGlzLmNhbnZhcy5kaXNjYXJkQWN0aXZlT2JqZWN0KCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRoaXMuc2V0KFxuICAgICAgICAnbGVmdCcsXG4gICAgICAgIGNsYW1wKFxuICAgICAgICAgIGxlZnQgLyB6b29tLFxuICAgICAgICAgIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QuUEFERElORyAvIHpvb20sXG4gICAgICAgICAgKGNhbnZhc1dpZHRoIC0gd2lkdGggLSBNZWRpYUVkaXRvckZhYnJpY0Nyb3BSZWN0LlBBRERJTkcpIC8gem9vbVxuICAgICAgICApXG4gICAgICApO1xuICAgICAgdGhpcy5zZXQoXG4gICAgICAgICd0b3AnLFxuICAgICAgICBjbGFtcChcbiAgICAgICAgICB0b3AgLyB6b29tLFxuICAgICAgICAgIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QuUEFERElORyAvIHpvb20sXG4gICAgICAgICAgKGNhbnZhc0hlaWdodCAtIGhlaWdodCAtIE1lZGlhRWRpdG9yRmFicmljQ3JvcFJlY3QuUEFERElORykgLyB6b29tXG4gICAgICAgIClcbiAgICAgICk7XG4gICAgfVxuXG4gICAgdGhpcy5zZXRDb29yZHMoKTtcbiAgfVxuXG4gIG92ZXJyaWRlIHJlbmRlcihjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCk6IHZvaWQge1xuICAgIHN1cGVyLnJlbmRlcihjdHgpO1xuXG4gICAgY29uc3QgYm91bmRzID0gdGhpcy5nZXRCb3VuZGluZ1JlY3QoKTtcblxuICAgIGNvbnN0IHpvb20gPSB0aGlzLmNhbnZhcz8uZ2V0Wm9vbSgpIHx8IDE7XG4gICAgY29uc3QgY2FudmFzV2lkdGggPSAodGhpcy5jYW52YXM/LmdldFdpZHRoKCkgfHwgMCkgLyB6b29tO1xuICAgIGNvbnN0IGNhbnZhc0hlaWdodCA9ICh0aGlzLmNhbnZhcz8uZ2V0SGVpZ2h0KCkgfHwgMCkgLyB6b29tO1xuICAgIGNvbnN0IGhlaWdodCA9IGJvdW5kcy5oZWlnaHQgLyB6b29tO1xuICAgIGNvbnN0IGxlZnQgPSBib3VuZHMubGVmdCAvIHpvb207XG4gICAgY29uc3QgdG9wID0gYm91bmRzLnRvcCAvIHpvb207XG4gICAgY29uc3Qgd2lkdGggPSBib3VuZHMud2lkdGggLyB6b29tO1xuXG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZmlsbFN0eWxlID0gJ3JnYmEoMCwgMCwgMCwgMC40KSc7XG4gICAgLy8gdG9wXG4gICAgY3R4LmZpbGxSZWN0KDAsIDAsIGNhbnZhc1dpZHRoLCB0b3ApO1xuICAgIC8vIGxlZnRcbiAgICBjdHguZmlsbFJlY3QoMCwgdG9wLCBsZWZ0LCBoZWlnaHQpO1xuICAgIC8vIGJvdHRvbVxuICAgIGN0eC5maWxsUmVjdCgwLCBoZWlnaHQgKyB0b3AsIGNhbnZhc1dpZHRoLCBjYW52YXNIZWlnaHQgLSB0b3ApO1xuICAgIC8vIHJpZ2h0XG4gICAgY3R4LmZpbGxSZWN0KGxlZnQgKyB3aWR0aCwgdG9wLCBjYW52YXNXaWR0aCAtIGxlZnQsIGhlaWdodCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfVxufVxuXG5NZWRpYUVkaXRvckZhYnJpY0Nyb3BSZWN0LnByb3RvdHlwZS5jb250cm9scyA9IHtcbiAgdGw6IG5ldyBmYWJyaWMuQ29udHJvbCh7XG4gICAgeDogLTAuNSxcbiAgICB5OiAtMC41LFxuICAgIGFjdGlvbkhhbmRsZXI6IGZhYnJpYy5jb250cm9sc1V0aWxzLnNjYWxpbmdFcXVhbGx5LFxuICAgIGN1cnNvclN0eWxlOiAnbndzZS1yZXNpemUnLFxuICAgIHJlbmRlcjogKFxuICAgICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgICBsZWZ0OiBudW1iZXIsXG4gICAgICB0b3A6IG51bWJlcixcbiAgICAgIF8sXG4gICAgICByZWN0OiBmYWJyaWMuT2JqZWN0XG4gICAgKSA9PiB7XG4gICAgICBjb25zdCBXSURUSCA9IGdldE1pblNpemUocmVjdC53aWR0aCk7XG5cbiAgICAgIGN0eC5zYXZlKCk7XG4gICAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgICAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZmYnO1xuICAgICAgY3R4LmxpbmVXaWR0aCA9IDM7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgubW92ZVRvKGxlZnQgLSAyLCB0b3AgKyBXSURUSCk7XG4gICAgICBjdHgubGluZVRvKGxlZnQgLSAyLCB0b3AgLSAyKTtcbiAgICAgIGN0eC5saW5lVG8obGVmdCArIFdJRFRILCB0b3AgLSAyKTtcbiAgICAgIGN0eC5zdHJva2UoKTtcblxuICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICB9LFxuICB9KSxcbiAgdHI6IG5ldyBmYWJyaWMuQ29udHJvbCh7XG4gICAgeDogMC41LFxuICAgIHk6IC0wLjUsXG4gICAgYWN0aW9uSGFuZGxlcjogZmFicmljLmNvbnRyb2xzVXRpbHMuc2NhbGluZ0VxdWFsbHksXG4gICAgY3Vyc29yU3R5bGU6ICduZXN3LXJlc2l6ZScsXG4gICAgcmVuZGVyOiAoXG4gICAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICAgIGxlZnQ6IG51bWJlcixcbiAgICAgIHRvcDogbnVtYmVyLFxuICAgICAgXyxcbiAgICAgIHJlY3Q6IGZhYnJpYy5PYmplY3RcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IFdJRFRIID0gZ2V0TWluU2l6ZShyZWN0LndpZHRoKTtcblxuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8obGVmdCArIDIsIHRvcCArIFdJRFRIKTtcbiAgICAgIGN0eC5saW5lVG8obGVmdCArIDIsIHRvcCAtIDIpO1xuICAgICAgY3R4LmxpbmVUbyhsZWZ0IC0gV0lEVEgsIHRvcCAtIDIpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0sXG4gIH0pLFxuICBibDogbmV3IGZhYnJpYy5Db250cm9sKHtcbiAgICB4OiAtMC41LFxuICAgIHk6IDAuNSxcbiAgICBhY3Rpb25IYW5kbGVyOiBmYWJyaWMuY29udHJvbHNVdGlscy5zY2FsaW5nRXF1YWxseSxcbiAgICBjdXJzb3JTdHlsZTogJ25lc3ctcmVzaXplJyxcbiAgICByZW5kZXI6IChcbiAgICAgIGN0eDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICAgICAgbGVmdDogbnVtYmVyLFxuICAgICAgdG9wOiBudW1iZXIsXG4gICAgICBfLFxuICAgICAgcmVjdDogZmFicmljLk9iamVjdFxuICAgICkgPT4ge1xuICAgICAgY29uc3QgV0lEVEggPSBnZXRNaW5TaXplKHJlY3Qud2lkdGgpO1xuXG4gICAgICBjdHguc2F2ZSgpO1xuICAgICAgY3R4LmZpbGxTdHlsZSA9ICcjZmZmJztcbiAgICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmJztcbiAgICAgIGN0eC5saW5lV2lkdGggPSAzO1xuICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgY3R4Lm1vdmVUbyhsZWZ0IC0gMiwgdG9wIC0gV0lEVEgpO1xuICAgICAgY3R4LmxpbmVUbyhsZWZ0IC0gMiwgdG9wICsgMik7XG4gICAgICBjdHgubGluZVRvKGxlZnQgKyBXSURUSCwgdG9wICsgMik7XG4gICAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgfSxcbiAgfSksXG4gIGJyOiBuZXcgZmFicmljLkNvbnRyb2woe1xuICAgIHg6IDAuNSxcbiAgICB5OiAwLjUsXG4gICAgYWN0aW9uSGFuZGxlcjogZmFicmljLmNvbnRyb2xzVXRpbHMuc2NhbGluZ0VxdWFsbHksXG4gICAgY3Vyc29yU3R5bGU6ICdud3NlLXJlc2l6ZScsXG4gICAgcmVuZGVyOiAoXG4gICAgICBjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgICAgIGxlZnQ6IG51bWJlcixcbiAgICAgIHRvcDogbnVtYmVyLFxuICAgICAgXyxcbiAgICAgIHJlY3Q6IGZhYnJpYy5PYmplY3RcbiAgICApID0+IHtcbiAgICAgIGNvbnN0IFdJRFRIID0gZ2V0TWluU2l6ZShyZWN0LndpZHRoKTtcblxuICAgICAgY3R4LnNhdmUoKTtcbiAgICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHguc3Ryb2tlU3R5bGUgPSAnI2ZmZic7XG4gICAgICBjdHgubGluZVdpZHRoID0gMztcbiAgICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICAgIGN0eC5tb3ZlVG8obGVmdCArIDIsIHRvcCAtIFdJRFRIKTtcbiAgICAgIGN0eC5saW5lVG8obGVmdCArIDIsIHRvcCArIDIpO1xuICAgICAgY3R4LmxpbmVUbyhsZWZ0IC0gV0lEVEgsIHRvcCArIDIpO1xuICAgICAgY3R4LnN0cm9rZSgpO1xuXG4gICAgICBjdHgucmVzdG9yZSgpO1xuICAgIH0sXG4gIH0pLFxufTtcblxuTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdC5wcm90b3R5cGUuZXhjbHVkZUZyb21FeHBvcnQgPSB0cnVlO1xuTWVkaWFFZGl0b3JGYWJyaWNDcm9wUmVjdC5wcm90b3R5cGUuYm9yZGVyQ29sb3IgPSAnI2ZmZmZmZic7XG5NZWRpYUVkaXRvckZhYnJpY0Nyb3BSZWN0LnByb3RvdHlwZS5jb3JuZXJDb2xvciA9ICcjZmZmZmZmJztcblxuZnVuY3Rpb24gZ2V0TWluU2l6ZSh3aWR0aDogbnVtYmVyIHwgdW5kZWZpbmVkKTogbnVtYmVyIHtcbiAgcmV0dXJuIE1hdGgubWluKHdpZHRoIHx8IDI0LCAyNCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBQ3ZCLG9CQUFzQjtBQUVmLGlEQUF3QyxxQkFBTyxLQUFLO0FBQUEsRUFHekQsWUFBWSxTQUErQjtBQUN6QyxVQUFNO0FBQUEsTUFDSixNQUFNO0FBQUEsTUFDTixpQkFBaUI7QUFBQSxTQUNiLFdBQVcsQ0FBQztBQUFBLElBQ2xCLENBQUM7QUFFRCxTQUFLLEdBQUcsWUFBWSxLQUFLLGNBQWMsS0FBSyxJQUFJLENBQUM7QUFBQSxFQUNuRDtBQUFBLEVBRVEsZ0JBQWdCO0FBQ3RCLFFBQUksQ0FBQyxLQUFLLFFBQVE7QUFDaEI7QUFBQSxJQUNGO0FBRUEsVUFBTSxPQUFPLEtBQUssT0FBTyxRQUFRLEtBQUs7QUFFdEMsVUFBTSxFQUFFLE1BQU0sS0FBSyxRQUFRLFVBQVUsS0FBSyxnQkFBZ0I7QUFFMUQsVUFBTSxlQUFlLEtBQUssT0FBTyxVQUFVO0FBQzNDLFVBQU0sY0FBYyxLQUFLLE9BQU8sU0FBUztBQUV6QyxRQUFJLFNBQVMsZ0JBQWdCLFFBQVEsYUFBYTtBQUNoRCxXQUFLLE9BQU8sb0JBQW9CO0FBQUEsSUFDbEMsT0FBTztBQUNMLFdBQUssSUFDSCxRQUNBLHlCQUNFLE9BQU8sTUFDUCwyQkFBMEIsVUFBVSxNQUNuQyxlQUFjLFFBQVEsMkJBQTBCLFdBQVcsSUFDOUQsQ0FDRjtBQUNBLFdBQUssSUFDSCxPQUNBLHlCQUNFLE1BQU0sTUFDTiwyQkFBMEIsVUFBVSxNQUNuQyxnQkFBZSxTQUFTLDJCQUEwQixXQUFXLElBQ2hFLENBQ0Y7QUFBQSxJQUNGO0FBRUEsU0FBSyxVQUFVO0FBQUEsRUFDakI7QUFBQSxFQUVTLE9BQU8sS0FBcUM7QUFDbkQsVUFBTSxPQUFPLEdBQUc7QUFFaEIsVUFBTSxTQUFTLEtBQUssZ0JBQWdCO0FBRXBDLFVBQU0sT0FBTyxLQUFLLFFBQVEsUUFBUSxLQUFLO0FBQ3ZDLFVBQU0sY0FBZSxNQUFLLFFBQVEsU0FBUyxLQUFLLEtBQUs7QUFDckQsVUFBTSxlQUFnQixNQUFLLFFBQVEsVUFBVSxLQUFLLEtBQUs7QUFDdkQsVUFBTSxTQUFTLE9BQU8sU0FBUztBQUMvQixVQUFNLE9BQU8sT0FBTyxPQUFPO0FBQzNCLFVBQU0sTUFBTSxPQUFPLE1BQU07QUFDekIsVUFBTSxRQUFRLE9BQU8sUUFBUTtBQUU3QixRQUFJLEtBQUs7QUFDVCxRQUFJLFlBQVk7QUFFaEIsUUFBSSxTQUFTLEdBQUcsR0FBRyxhQUFhLEdBQUc7QUFFbkMsUUFBSSxTQUFTLEdBQUcsS0FBSyxNQUFNLE1BQU07QUFFakMsUUFBSSxTQUFTLEdBQUcsU0FBUyxLQUFLLGFBQWEsZUFBZSxHQUFHO0FBRTdELFFBQUksU0FBUyxPQUFPLE9BQU8sS0FBSyxjQUFjLE1BQU0sTUFBTTtBQUMxRCxRQUFJLFFBQVE7QUFBQSxFQUNkO0FBQ0Y7QUExRU87QUFDRSxBQURGLDBCQUNFLFVBQVU7QUEyRW5CLDBCQUEwQixVQUFVLFdBQVc7QUFBQSxFQUM3QyxJQUFJLElBQUkscUJBQU8sUUFBUTtBQUFBLElBQ3JCLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILGVBQWUscUJBQU8sY0FBYztBQUFBLElBQ3BDLGFBQWE7QUFBQSxJQUNiLFFBQVEsQ0FDTixLQUNBLE1BQ0EsS0FDQSxHQUNBLFNBQ0c7QUFDSCxZQUFNLFFBQVEsV0FBVyxLQUFLLEtBQUs7QUFFbkMsVUFBSSxLQUFLO0FBQ1QsVUFBSSxZQUFZO0FBQ2hCLFVBQUksY0FBYztBQUNsQixVQUFJLFlBQVk7QUFDaEIsVUFBSSxVQUFVO0FBQ2QsVUFBSSxPQUFPLE9BQU8sR0FBRyxNQUFNLEtBQUs7QUFDaEMsVUFBSSxPQUFPLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDNUIsVUFBSSxPQUFPLE9BQU8sT0FBTyxNQUFNLENBQUM7QUFDaEMsVUFBSSxPQUFPO0FBRVgsVUFBSSxRQUFRO0FBQUEsSUFDZDtBQUFBLEVBQ0YsQ0FBQztBQUFBLEVBQ0QsSUFBSSxJQUFJLHFCQUFPLFFBQVE7QUFBQSxJQUNyQixHQUFHO0FBQUEsSUFDSCxHQUFHO0FBQUEsSUFDSCxlQUFlLHFCQUFPLGNBQWM7QUFBQSxJQUNwQyxhQUFhO0FBQUEsSUFDYixRQUFRLENBQ04sS0FDQSxNQUNBLEtBQ0EsR0FDQSxTQUNHO0FBQ0gsWUFBTSxRQUFRLFdBQVcsS0FBSyxLQUFLO0FBRW5DLFVBQUksS0FBSztBQUNULFVBQUksWUFBWTtBQUNoQixVQUFJLGNBQWM7QUFDbEIsVUFBSSxZQUFZO0FBQ2hCLFVBQUksVUFBVTtBQUNkLFVBQUksT0FBTyxPQUFPLEdBQUcsTUFBTSxLQUFLO0FBQ2hDLFVBQUksT0FBTyxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBQzVCLFVBQUksT0FBTyxPQUFPLE9BQU8sTUFBTSxDQUFDO0FBQ2hDLFVBQUksT0FBTztBQUVYLFVBQUksUUFBUTtBQUFBLElBQ2Q7QUFBQSxFQUNGLENBQUM7QUFBQSxFQUNELElBQUksSUFBSSxxQkFBTyxRQUFRO0FBQUEsSUFDckIsR0FBRztBQUFBLElBQ0gsR0FBRztBQUFBLElBQ0gsZUFBZSxxQkFBTyxjQUFjO0FBQUEsSUFDcEMsYUFBYTtBQUFBLElBQ2IsUUFBUSxDQUNOLEtBQ0EsTUFDQSxLQUNBLEdBQ0EsU0FDRztBQUNILFlBQU0sUUFBUSxXQUFXLEtBQUssS0FBSztBQUVuQyxVQUFJLEtBQUs7QUFDVCxVQUFJLFlBQVk7QUFDaEIsVUFBSSxjQUFjO0FBQ2xCLFVBQUksWUFBWTtBQUNoQixVQUFJLFVBQVU7QUFDZCxVQUFJLE9BQU8sT0FBTyxHQUFHLE1BQU0sS0FBSztBQUNoQyxVQUFJLE9BQU8sT0FBTyxHQUFHLE1BQU0sQ0FBQztBQUM1QixVQUFJLE9BQU8sT0FBTyxPQUFPLE1BQU0sQ0FBQztBQUNoQyxVQUFJLE9BQU87QUFFWCxVQUFJLFFBQVE7QUFBQSxJQUNkO0FBQUEsRUFDRixDQUFDO0FBQUEsRUFDRCxJQUFJLElBQUkscUJBQU8sUUFBUTtBQUFBLElBQ3JCLEdBQUc7QUFBQSxJQUNILEdBQUc7QUFBQSxJQUNILGVBQWUscUJBQU8sY0FBYztBQUFBLElBQ3BDLGFBQWE7QUFBQSxJQUNiLFFBQVEsQ0FDTixLQUNBLE1BQ0EsS0FDQSxHQUNBLFNBQ0c7QUFDSCxZQUFNLFFBQVEsV0FBVyxLQUFLLEtBQUs7QUFFbkMsVUFBSSxLQUFLO0FBQ1QsVUFBSSxZQUFZO0FBQ2hCLFVBQUksY0FBYztBQUNsQixVQUFJLFlBQVk7QUFDaEIsVUFBSSxVQUFVO0FBQ2QsVUFBSSxPQUFPLE9BQU8sR0FBRyxNQUFNLEtBQUs7QUFDaEMsVUFBSSxPQUFPLE9BQU8sR0FBRyxNQUFNLENBQUM7QUFDNUIsVUFBSSxPQUFPLE9BQU8sT0FBTyxNQUFNLENBQUM7QUFDaEMsVUFBSSxPQUFPO0FBRVgsVUFBSSxRQUFRO0FBQUEsSUFDZDtBQUFBLEVBQ0YsQ0FBQztBQUNIO0FBRUEsMEJBQTBCLFVBQVUsb0JBQW9CO0FBQ3hELDBCQUEwQixVQUFVLGNBQWM7QUFDbEQsMEJBQTBCLFVBQVUsY0FBYztBQUVsRCxvQkFBb0IsT0FBbUM7QUFDckQsU0FBTyxLQUFLLElBQUksU0FBUyxJQUFJLEVBQUU7QUFDakM7QUFGUyIsCiAgIm5hbWVzIjogW10KfQo=
