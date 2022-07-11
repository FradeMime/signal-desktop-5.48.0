var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var customFabricObjectControls_exports = {};
__export(customFabricObjectControls_exports, {
  customFabricObjectControls: () => customFabricObjectControls
});
module.exports = __toCommonJS(customFabricObjectControls_exports);
var import_fabric = require("fabric");
const resizeControl = new import_fabric.fabric.Control({
  actionHandler: import_fabric.fabric.controlsUtils.scalingEqually,
  cursorStyleHandler: () => "se-resize",
  render: (ctx, left, top) => {
    const size = 12;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(left, top, size, 0, 2 * Math.PI, false);
    ctx.fill();
    const arrowSize = 5;
    ctx.fillStyle = "#3b3b3b";
    ctx.strokeStyle = "#3b3b3b";
    ctx.beginPath();
    ctx.moveTo(left + 0.5, top + 0.5);
    ctx.lineTo(left + arrowSize, top + arrowSize);
    ctx.moveTo(left + arrowSize, top + 1);
    ctx.lineTo(left + arrowSize, top + arrowSize);
    ctx.lineTo(left + 1, top + arrowSize);
    ctx.moveTo(left - 0.5, top - 0.5);
    ctx.lineTo(left - arrowSize, top - arrowSize);
    ctx.moveTo(left - arrowSize, top - 1);
    ctx.lineTo(left - arrowSize, top - arrowSize);
    ctx.lineTo(left - 1, top - arrowSize);
    ctx.stroke();
    ctx.restore();
  },
  x: 0.5,
  y: 0.5
});
const rotateControl = new import_fabric.fabric.Control({
  actionHandler: import_fabric.fabric.controlsUtils.rotationWithSnapping,
  actionName: "rotate",
  cursorStyleHandler: import_fabric.fabric.controlsUtils.rotationStyleHandler,
  offsetY: -40,
  render(ctx, left, top, _, target) {
    const size = 5;
    ctx.save();
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    ctx.moveTo(left, top);
    const radians = 0 - (target.angle || 0) * Math.PI / 180;
    const targetLeft = 40 * Math.sin(radians);
    const targetTop = 40 * Math.cos(radians);
    ctx.lineTo(left + targetLeft, top + targetTop);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(left, top);
    ctx.arc(left, top, size, 0, 2 * Math.PI, false);
    ctx.fill();
    ctx.restore();
  },
  withConnection: false,
  x: 0,
  y: -0.5
});
const deleteControl = new import_fabric.fabric.Control({
  cursorStyleHandler: () => "pointer",
  mouseUpHandler: (_eventData, { target }) => {
    if (!target.canvas) {
      return false;
    }
    target.canvas.remove(target);
    return true;
  },
  render: (ctx, left, top) => {
    const size = 12;
    ctx.save();
    ctx.fillStyle = "#000";
    ctx.strokeStyle = "#000";
    ctx.lineWidth = 1;
    ctx.beginPath();
    ctx.arc(left, top, size, 0, 2 * Math.PI, false);
    ctx.fill();
    const xSize = 4;
    ctx.fillStyle = "#fff";
    ctx.strokeStyle = "#fff";
    ctx.beginPath();
    const topLeft = new import_fabric.fabric.Point(left - xSize, top - xSize);
    const topRight = new import_fabric.fabric.Point(left + xSize, top - xSize);
    const bottomRight = new import_fabric.fabric.Point(left + xSize, top + xSize);
    const bottomLeft = new import_fabric.fabric.Point(left - xSize, top + xSize);
    ctx.moveTo(topLeft.x, topLeft.y);
    ctx.lineTo(bottomRight.x, bottomRight.y);
    ctx.moveTo(topRight.x, topRight.y);
    ctx.lineTo(bottomLeft.x, bottomLeft.y);
    ctx.stroke();
    ctx.restore();
  },
  x: -0.5,
  y: -0.5
});
const customFabricObjectControls = {
  br: resizeControl,
  mtr: rotateControl,
  tl: deleteControl
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  customFabricObjectControls
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3VzdG9tRmFicmljT2JqZWN0Q29udHJvbHMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZmFicmljIH0gZnJvbSAnZmFicmljJztcblxuY29uc3QgcmVzaXplQ29udHJvbCA9IG5ldyBmYWJyaWMuQ29udHJvbCh7XG4gIGFjdGlvbkhhbmRsZXI6IGZhYnJpYy5jb250cm9sc1V0aWxzLnNjYWxpbmdFcXVhbGx5LFxuICBjdXJzb3JTdHlsZUhhbmRsZXI6ICgpID0+ICdzZS1yZXNpemUnLFxuICByZW5kZXI6IChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcikgPT4ge1xuICAgIC8vIGNpcmNsZVxuICAgIGNvbnN0IHNpemUgPSAxMjtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnI2ZmZic7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyNmZmYnO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGxlZnQsIHRvcCwgc2l6ZSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgLy8gYXJyb3dzIE5XICYgU0VcbiAgICBjb25zdCBhcnJvd1NpemUgPSA1O1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzNiM2IzYic7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMzYjNiM2InO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcblxuICAgIC8vIFNFXG4gICAgY3R4Lm1vdmVUbyhsZWZ0ICsgMC41LCB0b3AgKyAwLjUpO1xuICAgIGN0eC5saW5lVG8obGVmdCArIGFycm93U2l6ZSwgdG9wICsgYXJyb3dTaXplKTtcbiAgICBjdHgubW92ZVRvKGxlZnQgKyBhcnJvd1NpemUsIHRvcCArIDEpO1xuICAgIGN0eC5saW5lVG8obGVmdCArIGFycm93U2l6ZSwgdG9wICsgYXJyb3dTaXplKTtcbiAgICBjdHgubGluZVRvKGxlZnQgKyAxLCB0b3AgKyBhcnJvd1NpemUpO1xuXG4gICAgLy8gTldcbiAgICBjdHgubW92ZVRvKGxlZnQgLSAwLjUsIHRvcCAtIDAuNSk7XG4gICAgY3R4LmxpbmVUbyhsZWZ0IC0gYXJyb3dTaXplLCB0b3AgLSBhcnJvd1NpemUpO1xuICAgIGN0eC5tb3ZlVG8obGVmdCAtIGFycm93U2l6ZSwgdG9wIC0gMSk7XG4gICAgY3R4LmxpbmVUbyhsZWZ0IC0gYXJyb3dTaXplLCB0b3AgLSBhcnJvd1NpemUpO1xuICAgIGN0eC5saW5lVG8obGVmdCAtIDEsIHRvcCAtIGFycm93U2l6ZSk7XG5cbiAgICBjdHguc3Ryb2tlKCk7XG4gICAgY3R4LnJlc3RvcmUoKTtcbiAgfSxcbiAgeDogMC41LFxuICB5OiAwLjUsXG59KTtcblxuY29uc3Qgcm90YXRlQ29udHJvbCA9IG5ldyBmYWJyaWMuQ29udHJvbCh7XG4gIGFjdGlvbkhhbmRsZXI6IGZhYnJpYy5jb250cm9sc1V0aWxzLnJvdGF0aW9uV2l0aFNuYXBwaW5nLFxuICBhY3Rpb25OYW1lOiAncm90YXRlJyxcbiAgY3Vyc29yU3R5bGVIYW5kbGVyOiBmYWJyaWMuY29udHJvbHNVdGlscy5yb3RhdGlvblN0eWxlSGFuZGxlcixcbiAgb2Zmc2V0WTogLTQwLFxuICByZW5kZXIoXG4gICAgY3R4OiBDYW52YXNSZW5kZXJpbmdDb250ZXh0MkQsXG4gICAgbGVmdDogbnVtYmVyLFxuICAgIHRvcDogbnVtYmVyLFxuICAgIF8sXG4gICAgdGFyZ2V0OiBmYWJyaWMuT2JqZWN0XG4gICkge1xuICAgIGNvbnN0IHNpemUgPSA1O1xuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmJztcblxuICAgIC8vIGNvbm5lY3RpbmcgbGluZVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgubW92ZVRvKGxlZnQsIHRvcCk7XG4gICAgY29uc3QgcmFkaWFucyA9IDAgLSAoKHRhcmdldC5hbmdsZSB8fCAwKSAqIE1hdGguUEkpIC8gMTgwO1xuICAgIGNvbnN0IHRhcmdldExlZnQgPSA0MCAqIE1hdGguc2luKHJhZGlhbnMpO1xuICAgIGNvbnN0IHRhcmdldFRvcCA9IDQwICogTWF0aC5jb3MocmFkaWFucyk7XG4gICAgY3R4LmxpbmVUbyhsZWZ0ICsgdGFyZ2V0TGVmdCwgdG9wICsgdGFyZ2V0VG9wKTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICAvLyBjaXJjbGVcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY3R4Lm1vdmVUbyhsZWZ0LCB0b3ApO1xuICAgIGN0eC5hcmMobGVmdCwgdG9wLCBzaXplLCAwLCAyICogTWF0aC5QSSwgZmFsc2UpO1xuICAgIGN0eC5maWxsKCk7XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9LFxuICB3aXRoQ29ubmVjdGlvbjogZmFsc2UsXG4gIHg6IDAsXG4gIHk6IC0wLjUsXG59KTtcblxuY29uc3QgZGVsZXRlQ29udHJvbCA9IG5ldyBmYWJyaWMuQ29udHJvbCh7XG4gIGN1cnNvclN0eWxlSGFuZGxlcjogKCkgPT4gJ3BvaW50ZXInLFxuICAvLyBUaGlzIGlzIGxpZnRlZCBmcm9tIDxodHRwOi8vZmFicmljanMuY29tL2N1c3RvbS1jb250cm9sLXJlbmRlcj4uXG4gIG1vdXNlVXBIYW5kbGVyOiAoX2V2ZW50RGF0YSwgeyB0YXJnZXQgfSkgPT4ge1xuICAgIGlmICghdGFyZ2V0LmNhbnZhcykge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICB0YXJnZXQuY2FudmFzLnJlbW92ZSh0YXJnZXQpO1xuICAgIHJldHVybiB0cnVlO1xuICB9LFxuICByZW5kZXI6IChjdHg6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCwgbGVmdDogbnVtYmVyLCB0b3A6IG51bWJlcikgPT4ge1xuICAgIC8vIGNpcmNsZVxuICAgIGNvbnN0IHNpemUgPSAxMjtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5maWxsU3R5bGUgPSAnIzAwMCc7XG4gICAgY3R4LnN0cm9rZVN0eWxlID0gJyMwMDAnO1xuICAgIGN0eC5saW5lV2lkdGggPSAxO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHguYXJjKGxlZnQsIHRvcCwgc2l6ZSwgMCwgMiAqIE1hdGguUEksIGZhbHNlKTtcbiAgICBjdHguZmlsbCgpO1xuXG4gICAgLy8geFxuICAgIGNvbnN0IHhTaXplID0gNDtcbiAgICBjdHguZmlsbFN0eWxlID0gJyNmZmYnO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9ICcjZmZmJztcbiAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgY29uc3QgdG9wTGVmdCA9IG5ldyBmYWJyaWMuUG9pbnQobGVmdCAtIHhTaXplLCB0b3AgLSB4U2l6ZSk7XG4gICAgY29uc3QgdG9wUmlnaHQgPSBuZXcgZmFicmljLlBvaW50KGxlZnQgKyB4U2l6ZSwgdG9wIC0geFNpemUpO1xuICAgIGNvbnN0IGJvdHRvbVJpZ2h0ID0gbmV3IGZhYnJpYy5Qb2ludChsZWZ0ICsgeFNpemUsIHRvcCArIHhTaXplKTtcbiAgICBjb25zdCBib3R0b21MZWZ0ID0gbmV3IGZhYnJpYy5Qb2ludChsZWZ0IC0geFNpemUsIHRvcCArIHhTaXplKTtcblxuICAgIGN0eC5tb3ZlVG8odG9wTGVmdC54LCB0b3BMZWZ0LnkpO1xuICAgIGN0eC5saW5lVG8oYm90dG9tUmlnaHQueCwgYm90dG9tUmlnaHQueSk7XG4gICAgY3R4Lm1vdmVUbyh0b3BSaWdodC54LCB0b3BSaWdodC55KTtcbiAgICBjdHgubGluZVRvKGJvdHRvbUxlZnQueCwgYm90dG9tTGVmdC55KTtcbiAgICBjdHguc3Ryb2tlKCk7XG5cbiAgICBjdHgucmVzdG9yZSgpO1xuICB9LFxuICB4OiAtMC41LFxuICB5OiAtMC41LFxufSk7XG5cbmV4cG9ydCBjb25zdCBjdXN0b21GYWJyaWNPYmplY3RDb250cm9scyA9IHtcbiAgYnI6IHJlc2l6ZUNvbnRyb2wsXG4gIG10cjogcm90YXRlQ29udHJvbCxcbiAgdGw6IGRlbGV0ZUNvbnRyb2wsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esb0JBQXVCO0FBRXZCLE1BQU0sZ0JBQWdCLElBQUkscUJBQU8sUUFBUTtBQUFBLEVBQ3ZDLGVBQWUscUJBQU8sY0FBYztBQUFBLEVBQ3BDLG9CQUFvQixNQUFNO0FBQUEsRUFDMUIsUUFBUSxDQUFDLEtBQStCLE1BQWMsUUFBZ0I7QUFFcEUsVUFBTSxPQUFPO0FBQ2IsUUFBSSxLQUFLO0FBQ1QsUUFBSSxZQUFZO0FBQ2hCLFFBQUksY0FBYztBQUNsQixRQUFJLFlBQVk7QUFDaEIsUUFBSSxVQUFVO0FBQ2QsUUFBSSxJQUFJLE1BQU0sS0FBSyxNQUFNLEdBQUcsSUFBSSxLQUFLLElBQUksS0FBSztBQUM5QyxRQUFJLEtBQUs7QUFHVCxVQUFNLFlBQVk7QUFDbEIsUUFBSSxZQUFZO0FBQ2hCLFFBQUksY0FBYztBQUNsQixRQUFJLFVBQVU7QUFHZCxRQUFJLE9BQU8sT0FBTyxLQUFLLE1BQU0sR0FBRztBQUNoQyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sU0FBUztBQUM1QyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sQ0FBQztBQUNwQyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sU0FBUztBQUM1QyxRQUFJLE9BQU8sT0FBTyxHQUFHLE1BQU0sU0FBUztBQUdwQyxRQUFJLE9BQU8sT0FBTyxLQUFLLE1BQU0sR0FBRztBQUNoQyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sU0FBUztBQUM1QyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sQ0FBQztBQUNwQyxRQUFJLE9BQU8sT0FBTyxXQUFXLE1BQU0sU0FBUztBQUM1QyxRQUFJLE9BQU8sT0FBTyxHQUFHLE1BQU0sU0FBUztBQUVwQyxRQUFJ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
