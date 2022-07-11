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
var avatarDataToBytes_exports = {};
__export(avatarDataToBytes_exports, {
  avatarDataToBytes: () => avatarDataToBytes
});
module.exports = __toCommonJS(avatarDataToBytes_exports);
var import_Colors = require("../types/Colors");
var import_canvasToBytes = require("./canvasToBytes");
var import_avatarTextSizeCalculator = require("./avatarTextSizeCalculator");
const CANVAS_SIZE = 1024;
function getAvatarColor(color) {
  return import_Colors.AvatarColorMap.get(color) || { bg: "black", fg: "white" };
}
function setCanvasBackground(bg, context, canvas) {
  context.fillStyle = bg;
  context.fillRect(0, 0, canvas.width, canvas.height);
}
async function drawImage(src, context, canvas) {
  const image = new Image();
  image.src = src;
  await image.decode();
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);
}
async function getFont(text) {
  const font = new window.FontFace("Inter", 'url("fonts/inter-v3.10/Inter-Regular.woff2")');
  await font.load();
  const measurerCanvas = document.createElement("canvas");
  measurerCanvas.width = CANVAS_SIZE;
  measurerCanvas.height = CANVAS_SIZE;
  const measurerContext = measurerCanvas.getContext("2d");
  if (!measurerContext) {
    throw new Error("getFont: could not get canvas rendering context");
  }
  const fontSize = (0, import_avatarTextSizeCalculator.getFittedFontSize)(CANVAS_SIZE, text, (candidateFontSize) => {
    const candidateFont = `${candidateFontSize}px Inter`;
    measurerContext.font = candidateFont;
    const {
      actualBoundingBoxLeft,
      actualBoundingBoxRight,
      actualBoundingBoxAscent,
      actualBoundingBoxDescent
    } = measurerContext.measureText(text);
    const width = Math.abs(actualBoundingBoxLeft) + Math.abs(actualBoundingBoxRight);
    const height = Math.abs(actualBoundingBoxAscent) + Math.abs(actualBoundingBoxDescent);
    return { height, width };
  });
  return `${fontSize}px Inter`;
}
async function avatarDataToBytes(avatarData) {
  const canvas = document.createElement("canvas");
  canvas.width = CANVAS_SIZE;
  canvas.height = CANVAS_SIZE;
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("avatarDataToBytes: could not get canvas rendering context");
  }
  const { color, icon, imagePath, text } = avatarData;
  if (imagePath) {
    await drawImage(window.Signal?.Migrations ? window.Signal.Migrations.getAbsoluteAvatarPath(imagePath) : imagePath, context, canvas);
  } else if (color && text) {
    const { bg, fg } = getAvatarColor(color);
    const textToWrite = text.toLocaleUpperCase();
    setCanvasBackground(bg, context, canvas);
    context.fillStyle = fg;
    const font = await getFont(textToWrite);
    context.font = font;
    context.textBaseline = "middle";
    context.textAlign = "center";
    context.fillText(textToWrite, CANVAS_SIZE / 2, CANVAS_SIZE / 2 + 30);
  } else if (color && icon) {
    const iconPath = `images/avatars/avatar_${icon}.svg`;
    await drawImage(iconPath, context, canvas);
    context.globalCompositeOperation = "destination-over";
    const { bg } = getAvatarColor(color);
    setCanvasBackground(bg, context, canvas);
  }
  return (0, import_canvasToBytes.canvasToBytes)(canvas);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  avatarDataToBytes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYXZhdGFyRGF0YVRvQnl0ZXMudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBBdmF0YXJDb2xvclR5cGUgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHsgQXZhdGFyQ29sb3JNYXAgfSBmcm9tICcuLi90eXBlcy9Db2xvcnMnO1xuaW1wb3J0IHR5cGUgeyBBdmF0YXJEYXRhVHlwZSB9IGZyb20gJy4uL3R5cGVzL0F2YXRhcic7XG5pbXBvcnQgeyBjYW52YXNUb0J5dGVzIH0gZnJvbSAnLi9jYW52YXNUb0J5dGVzJztcbmltcG9ydCB7IGdldEZpdHRlZEZvbnRTaXplIH0gZnJvbSAnLi9hdmF0YXJUZXh0U2l6ZUNhbGN1bGF0b3InO1xuXG5jb25zdCBDQU5WQVNfU0laRSA9IDEwMjQ7XG5cbmZ1bmN0aW9uIGdldEF2YXRhckNvbG9yKGNvbG9yOiBBdmF0YXJDb2xvclR5cGUpOiB7IGJnOiBzdHJpbmc7IGZnOiBzdHJpbmcgfSB7XG4gIHJldHVybiBBdmF0YXJDb2xvck1hcC5nZXQoY29sb3IpIHx8IHsgYmc6ICdibGFjaycsIGZnOiAnd2hpdGUnIH07XG59XG5cbmZ1bmN0aW9uIHNldENhbnZhc0JhY2tncm91bmQoXG4gIGJnOiBzdHJpbmcsXG4gIGNvbnRleHQ6IENhbnZhc1JlbmRlcmluZ0NvbnRleHQyRCxcbiAgY2FudmFzOiBIVE1MQ2FudmFzRWxlbWVudFxuKTogdm9pZCB7XG4gIGNvbnRleHQuZmlsbFN0eWxlID0gYmc7XG4gIGNvbnRleHQuZmlsbFJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gZHJhd0ltYWdlKFxuICBzcmM6IHN0cmluZyxcbiAgY29udGV4dDogQ2FudmFzUmVuZGVyaW5nQ29udGV4dDJELFxuICBjYW52YXM6IEhUTUxDYW52YXNFbGVtZW50XG4pOiBQcm9taXNlPHZvaWQ+IHtcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgaW1hZ2Uuc3JjID0gc3JjO1xuICBhd2FpdCBpbWFnZS5kZWNvZGUoKTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgbm8tcGFyYW0tcmVhc3NpZ25cbiAgY2FudmFzLmhlaWdodCA9IGltYWdlLmhlaWdodDtcbiAgY29udGV4dC5kcmF3SW1hZ2UoaW1hZ2UsIDAsIDApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBnZXRGb250KHRleHQ6IHN0cmluZyk6IFByb21pc2U8c3RyaW5nPiB7XG4gIGNvbnN0IGZvbnQgPSBuZXcgd2luZG93LkZvbnRGYWNlKFxuICAgICdJbnRlcicsXG4gICAgJ3VybChcImZvbnRzL2ludGVyLXYzLjEwL0ludGVyLVJlZ3VsYXIud29mZjJcIiknXG4gICk7XG4gIGF3YWl0IGZvbnQubG9hZCgpO1xuXG4gIGNvbnN0IG1lYXN1cmVyQ2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIG1lYXN1cmVyQ2FudmFzLndpZHRoID0gQ0FOVkFTX1NJWkU7XG4gIG1lYXN1cmVyQ2FudmFzLmhlaWdodCA9IENBTlZBU19TSVpFO1xuXG4gIGNvbnN0IG1lYXN1cmVyQ29udGV4dCA9IG1lYXN1cmVyQ2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gIGlmICghbWVhc3VyZXJDb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdnZXRGb250OiBjb3VsZCBub3QgZ2V0IGNhbnZhcyByZW5kZXJpbmcgY29udGV4dCcpO1xuICB9XG5cbiAgY29uc3QgZm9udFNpemUgPSBnZXRGaXR0ZWRGb250U2l6ZShDQU5WQVNfU0laRSwgdGV4dCwgY2FuZGlkYXRlRm9udFNpemUgPT4ge1xuICAgIGNvbnN0IGNhbmRpZGF0ZUZvbnQgPSBgJHtjYW5kaWRhdGVGb250U2l6ZX1weCBJbnRlcmA7XG4gICAgbWVhc3VyZXJDb250ZXh0LmZvbnQgPSBjYW5kaWRhdGVGb250O1xuXG4gICAgY29uc3Qge1xuICAgICAgYWN0dWFsQm91bmRpbmdCb3hMZWZ0LFxuICAgICAgYWN0dWFsQm91bmRpbmdCb3hSaWdodCxcbiAgICAgIGFjdHVhbEJvdW5kaW5nQm94QXNjZW50LFxuICAgICAgYWN0dWFsQm91bmRpbmdCb3hEZXNjZW50LFxuICAgIH0gPSBtZWFzdXJlckNvbnRleHQubWVhc3VyZVRleHQodGV4dCk7XG5cbiAgICBjb25zdCB3aWR0aCA9XG4gICAgICBNYXRoLmFicyhhY3R1YWxCb3VuZGluZ0JveExlZnQpICsgTWF0aC5hYnMoYWN0dWFsQm91bmRpbmdCb3hSaWdodCk7XG4gICAgY29uc3QgaGVpZ2h0ID1cbiAgICAgIE1hdGguYWJzKGFjdHVhbEJvdW5kaW5nQm94QXNjZW50KSArIE1hdGguYWJzKGFjdHVhbEJvdW5kaW5nQm94RGVzY2VudCk7XG5cbiAgICByZXR1cm4geyBoZWlnaHQsIHdpZHRoIH07XG4gIH0pO1xuXG4gIHJldHVybiBgJHtmb250U2l6ZX1weCBJbnRlcmA7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhdmF0YXJEYXRhVG9CeXRlcyhcbiAgYXZhdGFyRGF0YTogQXZhdGFyRGF0YVR5cGVcbik6IFByb21pc2U8VWludDhBcnJheT4ge1xuICBjb25zdCBjYW52YXMgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdjYW52YXMnKTtcbiAgY2FudmFzLndpZHRoID0gQ0FOVkFTX1NJWkU7XG4gIGNhbnZhcy5oZWlnaHQgPSBDQU5WQVNfU0laRTtcbiAgY29uc3QgY29udGV4dCA9IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuXG4gIGlmICghY29udGV4dCkge1xuICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICdhdmF0YXJEYXRhVG9CeXRlczogY291bGQgbm90IGdldCBjYW52YXMgcmVuZGVyaW5nIGNvbnRleHQnXG4gICAgKTtcbiAgfVxuXG4gIGNvbnN0IHsgY29sb3IsIGljb24sIGltYWdlUGF0aCwgdGV4dCB9ID0gYXZhdGFyRGF0YTtcblxuICBpZiAoaW1hZ2VQYXRoKSB7XG4gICAgYXdhaXQgZHJhd0ltYWdlKFxuICAgICAgd2luZG93LlNpZ25hbD8uTWlncmF0aW9uc1xuICAgICAgICA/IHdpbmRvdy5TaWduYWwuTWlncmF0aW9ucy5nZXRBYnNvbHV0ZUF2YXRhclBhdGgoaW1hZ2VQYXRoKVxuICAgICAgICA6IGltYWdlUGF0aCxcbiAgICAgIGNvbnRleHQsXG4gICAgICBjYW52YXNcbiAgICApO1xuICB9IGVsc2UgaWYgKGNvbG9yICYmIHRleHQpIHtcbiAgICBjb25zdCB7IGJnLCBmZyB9ID0gZ2V0QXZhdGFyQ29sb3IoY29sb3IpO1xuICAgIGNvbnN0IHRleHRUb1dyaXRlID0gdGV4dC50b0xvY2FsZVVwcGVyQ2FzZSgpO1xuXG4gICAgc2V0Q2FudmFzQmFja2dyb3VuZChiZywgY29udGV4dCwgY2FudmFzKTtcbiAgICBjb250ZXh0LmZpbGxTdHlsZSA9IGZnO1xuICAgIGNvbnN0IGZvbnQgPSBhd2FpdCBnZXRGb250KHRleHRUb1dyaXRlKTtcbiAgICBjb250ZXh0LmZvbnQgPSBmb250O1xuICAgIGNvbnRleHQudGV4dEJhc2VsaW5lID0gJ21pZGRsZSc7XG4gICAgY29udGV4dC50ZXh0QWxpZ24gPSAnY2VudGVyJztcbiAgICBjb250ZXh0LmZpbGxUZXh0KHRleHRUb1dyaXRlLCBDQU5WQVNfU0laRSAvIDIsIENBTlZBU19TSVpFIC8gMiArIDMwKTtcbiAgfSBlbHNlIGlmIChjb2xvciAmJiBpY29uKSB7XG4gICAgY29uc3QgaWNvblBhdGggPSBgaW1hZ2VzL2F2YXRhcnMvYXZhdGFyXyR7aWNvbn0uc3ZnYDtcbiAgICBhd2FpdCBkcmF3SW1hZ2UoaWNvblBhdGgsIGNvbnRleHQsIGNhbnZhcyk7XG4gICAgY29udGV4dC5nbG9iYWxDb21wb3NpdGVPcGVyYXRpb24gPSAnZGVzdGluYXRpb24tb3Zlcic7XG4gICAgY29uc3QgeyBiZyB9ID0gZ2V0QXZhdGFyQ29sb3IoY29sb3IpO1xuICAgIHNldENhbnZhc0JhY2tncm91bmQoYmcsIGNvbnRleHQsIGNhbnZhcyk7XG4gIH1cblxuICByZXR1cm4gY2FudmFzVG9CeXRlcyhjYW52YXMpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG9CQUErQjtBQUUvQiwyQkFBOEI7QUFDOUIsc0NBQWtDO0FBRWxDLE1BQU0sY0FBYztBQUVwQix3QkFBd0IsT0FBb0Q7QUFDMUUsU0FBTyw2QkFBZSxJQUFJLEtBQUssS0FBSyxFQUFFLElBQUksU0FBUyxJQUFJLFFBQVE7QUFDakU7QUFGUyxBQUlULDZCQUNFLElBQ0EsU0FDQSxRQUNNO0FBQ04sVUFBUSxZQUFZO0FBQ3BCLFVBQVEsU0FBUyxHQUFHLEdBQUcsT0FBTyxPQUFPLE9BQU8sTUFBTTtBQUNwRDtBQVBTLEFBU1QseUJBQ0UsS0FDQSxTQUNBLFFBQ2U7QUFDZixRQUFNLFFBQVEsSUFBSSxNQUFNO0FBQ3hCLFFBQU0sTUFBTTtBQUNaLFFBQU0sTUFBTSxPQUFPO0FBRW5CLFNBQU8sUUFBUSxNQUFNO0FBRXJCLFNBQU8sU0FBUyxNQUFNO0FBQ3RCLFVBQVEsVUFBVSxPQUFPLEdBQUcsQ0FBQztBQUMvQjtBQWJlLEFBZWYsdUJBQXVCLE1BQStCO0FBQ3BELFFBQU0sT0FBTyxJQUFJLE9BQU8sU0FDdEIsU0FDQSw4Q0FDRjtBQUNBLFFBQU0sS0FBSyxLQUFLO0FBRWhCLFFBQU0saUJBQWlCLFNBQVMsY0FBYyxRQUFRO0FBQ3RELGlCQUFlLFFBQVE7QUFDdkIsaUJBQWUsU0FBUztBQUV4QixRQUFNLGtCQUFrQixlQUFlLFdBQVcsSUFBSTtBQUN0RCxNQUFJLENBQUMsaUJBQWlCO0FBQ3BCLFVBQU0sSUFBSSxNQUFNLGlEQUFpRDtBQUFBLEVBQ25FO0FBRUEsUUFBTSxXQUFXLHVEQUFrQixhQUFhLE1BQU0sdUJBQXFCO0FBQ3pFLFVBQU0sZ0JBQWdCLEdBQUc7QUFDekIsb0JBQWdCLE9BQU87QUFFdkIsVUFBTTtBQUFBLE1BQ0o7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxRQUNFLGdCQUFnQixZQUFZLElBQUk7QUFFcEMsVUFBTSxRQUNKLEtBQUssSUFBSSxxQkFBcUIsSUFBSSxLQUFLLElBQUksc0JBQXNCO0FBQ25FLFVBQU0sU0FDSixLQUFLLElBQUksdUJBQXVCLElBQUksS0FBSyxJQUFJLHdCQUF3QjtBQUV2RSxXQUFPLEVBQUUsUUFBUSxNQUFNO0FBQUEsRUFDekIsQ0FBQztBQUVELFNBQU8sR0FBRztBQUNaO0FBcENlLEFBc0NmLGlDQUNFLFlBQ3FCO0FBQ3JCLFFBQU0sU0FBUyxTQUFTLGNBQWMsUUFBUTtBQUM5QyxTQUFPLFFBQVE7QUFDZixTQUFPLFNBQVM7QUFDaEIsUUFBTSxVQUFVLE9BQU8sV0FBVyxJQUFJO0FBRXRDLE1BQUksQ0FBQyxTQUFTO0FBQ1osVUFBTSxJQUFJLE1BQ1IsMkRBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxFQUFFLE9BQU8sTUFBTSxXQUFXLFNBQVM7QUFFekMsTUFBSSxXQUFXO0FBQ2IsVUFBTSxVQUNKLE9BQU8sUUFBUSxhQUNYLE9BQU8sT0FBTyxXQUFXLHNCQUFzQixTQUFTLElBQ3hELFdBQ0osU0FDQSxNQUNGO0FBQUEsRUFDRixXQUFXLFNBQVMsTUFBTTtBQUN4QixVQUFNLEVBQUUsSUFBSSxPQUFPLGVBQWUsS0FBSztBQUN2QyxVQUFNLGNBQWMsS0FBSyxrQkFBa0I7QUFFM0Msd0JBQW9CLElBQUksU0FBUyxNQUFNO0FBQ3ZDLFlBQVEsWUFBWTtBQUNwQixVQUFNLE9BQU8sTUFBTSxRQUFRLFdBQVc7QUFDdEMsWUFBUSxPQUFPO0FBQ2YsWUFBUSxlQUFlO0FBQ3ZCLFlBQVEsWUFBWTtBQUNwQixZQUFRLFNBQVMsYUFBYSxjQUFjLEdBQUcsY0FBYyxJQUFJLEVBQUU7QUFBQSxFQUNyRSxXQUFXLFNBQVMsTUFBTTtBQUN4QixVQUFNLFdBQVcseUJBQXlCO0FBQzFDLFVBQU0sVUFBVSxVQUFVLFNBQVMsTUFBTTtBQUN6QyxZQUFRLDJCQUEyQjtBQUNuQyxVQUFNLEVBQUUsT0FBTyxlQUFlLEtBQUs7QUFDbkMsd0JBQW9CLElBQUksU0FBUyxNQUFNO0FBQUEsRUFDekM7QUFFQSxTQUFPLHdDQUFjLE1BQU07QUFDN0I7QUE1Q3NCIiwKICAibmFtZXMiOiBbXQp9Cg==
