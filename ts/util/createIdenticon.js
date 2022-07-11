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
var createIdenticon_exports = {};
__export(createIdenticon_exports, {
  createIdenticon: () => createIdenticon
});
module.exports = __toCommonJS(createIdenticon_exports);
var import_react = __toESM(require("react"));
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_server = require("react-dom/server");
var import_Colors = require("../types/Colors");
var import_IdenticonSVG = require("../components/IdenticonSVG");
function createIdenticon(color, content) {
  const [defaultColorValue] = Array.from(import_Colors.AvatarColorMap.values());
  const avatarColor = import_Colors.AvatarColorMap.get(color);
  const html = (0, import_server.renderToString)(/* @__PURE__ */ import_react.default.createElement(import_IdenticonSVG.IdenticonSVG, {
    backgroundColor: avatarColor?.bg || defaultColorValue.bg,
    content,
    foregroundColor: avatarColor?.fg || defaultColorValue.fg
  }));
  const svg = new Blob([html], { type: "image/svg+xml;charset=utf-8" });
  const svgUrl = URL.createObjectURL(svg);
  return new Promise((resolve) => {
    const img = document.createElement("img");
    img.onload = () => {
      const canvas = import_blueimp_load_image.default.scale(img, {
        canvas: true,
        maxWidth: 100,
        maxHeight: 100
      });
      if (!(canvas instanceof HTMLCanvasElement)) {
        resolve("");
        return;
      }
      const ctx = canvas.getContext("2d");
      if (ctx) {
        ctx.drawImage(img, 0, 0);
      }
      URL.revokeObjectURL(svgUrl);
      resolve(canvas.toDataURL("image/png"));
    };
    img.onerror = () => {
      URL.revokeObjectURL(svgUrl);
      resolve("");
    };
    img.src = svgUrl;
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  createIdenticon
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY3JlYXRlSWRlbnRpY29uLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnO1xuaW1wb3J0IGxvYWRJbWFnZSBmcm9tICdibHVlaW1wLWxvYWQtaW1hZ2UnO1xuaW1wb3J0IHsgcmVuZGVyVG9TdHJpbmcgfSBmcm9tICdyZWFjdC1kb20vc2VydmVyJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhckNvbG9yTWFwIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IElkZW50aWNvblNWRyB9IGZyb20gJy4uL2NvbXBvbmVudHMvSWRlbnRpY29uU1ZHJztcblxuZXhwb3J0IGZ1bmN0aW9uIGNyZWF0ZUlkZW50aWNvbihcbiAgY29sb3I6IEF2YXRhckNvbG9yVHlwZSxcbiAgY29udGVudDogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBjb25zdCBbZGVmYXVsdENvbG9yVmFsdWVdID0gQXJyYXkuZnJvbShBdmF0YXJDb2xvck1hcC52YWx1ZXMoKSk7XG4gIGNvbnN0IGF2YXRhckNvbG9yID0gQXZhdGFyQ29sb3JNYXAuZ2V0KGNvbG9yKTtcbiAgY29uc3QgaHRtbCA9IHJlbmRlclRvU3RyaW5nKFxuICAgIDxJZGVudGljb25TVkdcbiAgICAgIGJhY2tncm91bmRDb2xvcj17YXZhdGFyQ29sb3I/LmJnIHx8IGRlZmF1bHRDb2xvclZhbHVlLmJnfVxuICAgICAgY29udGVudD17Y29udGVudH1cbiAgICAgIGZvcmVncm91bmRDb2xvcj17YXZhdGFyQ29sb3I/LmZnIHx8IGRlZmF1bHRDb2xvclZhbHVlLmZnfVxuICAgIC8+XG4gICk7XG4gIGNvbnN0IHN2ZyA9IG5ldyBCbG9iKFtodG1sXSwgeyB0eXBlOiAnaW1hZ2Uvc3ZnK3htbDtjaGFyc2V0PXV0Zi04JyB9KTtcbiAgY29uc3Qgc3ZnVXJsID0gVVJMLmNyZWF0ZU9iamVjdFVSTChzdmcpO1xuXG4gIHJldHVybiBuZXcgUHJvbWlzZShyZXNvbHZlID0+IHtcbiAgICBjb25zdCBpbWcgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICBpbWcub25sb2FkID0gKCkgPT4ge1xuICAgICAgY29uc3QgY2FudmFzID0gbG9hZEltYWdlLnNjYWxlKGltZywge1xuICAgICAgICBjYW52YXM6IHRydWUsXG4gICAgICAgIG1heFdpZHRoOiAxMDAsXG4gICAgICAgIG1heEhlaWdodDogMTAwLFxuICAgICAgfSk7XG4gICAgICBpZiAoIShjYW52YXMgaW5zdGFuY2VvZiBIVE1MQ2FudmFzRWxlbWVudCkpIHtcbiAgICAgICAgcmVzb2x2ZSgnJyk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3R4ID0gY2FudmFzLmdldENvbnRleHQoJzJkJyk7XG4gICAgICBpZiAoY3R4KSB7XG4gICAgICAgIGN0eC5kcmF3SW1hZ2UoaW1nLCAwLCAwKTtcbiAgICAgIH1cbiAgICAgIFVSTC5yZXZva2VPYmplY3RVUkwoc3ZnVXJsKTtcbiAgICAgIHJlc29sdmUoY2FudmFzLnRvRGF0YVVSTCgnaW1hZ2UvcG5nJykpO1xuICAgIH07XG4gICAgaW1nLm9uZXJyb3IgPSAoKSA9PiB7XG4gICAgICBVUkwucmV2b2tlT2JqZWN0VVJMKHN2Z1VybCk7XG4gICAgICByZXNvbHZlKCcnKTtcbiAgICB9O1xuXG4gICAgaW1nLnNyYyA9IHN2Z1VybDtcbiAgfSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLGdDQUFzQjtBQUN0QixvQkFBK0I7QUFFL0Isb0JBQStCO0FBQy9CLDBCQUE2QjtBQUV0Qix5QkFDTCxPQUNBLFNBQ2lCO0FBQ2pCLFFBQU0sQ0FBQyxxQkFBcUIsTUFBTSxLQUFLLDZCQUFlLE9BQU8sQ0FBQztBQUM5RCxRQUFNLGNBQWMsNkJBQWUsSUFBSSxLQUFLO0FBQzVDLFFBQU0sT0FBTyxrQ0FDWCxtREFBQztBQUFBLElBQ0MsaUJBQWlCLGFBQWEsTUFBTSxrQkFBa0I7QUFBQSxJQUN0RDtBQUFBLElBQ0EsaUJBQWlCLGFBQWEsTUFBTSxrQkFBa0I7QUFBQSxHQUN4RCxDQUNGO0FBQ0EsUUFBTSxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksR0FBRyxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDcEUsUUFBTSxTQUFTLElBQUksZ0JBQWdCLEdBQUc7QUFFdEMsU0FBTyxJQUFJLFFBQVEsYUFBVztBQUM1QixVQUFNLE1BQU0sU0FBUyxjQUFjLEtBQUs7QUFDeEMsUUFBSSxTQUFTLE1BQU07QUFDakIsWUFBTSxTQUFTLGtDQUFVLE1BQU0sS0FBSztBQUFBLFFBQ2xDLFFBQVE7QUFBQSxRQUNSLFVBQVU7QUFBQSxRQUNWLFdBQVc7QUFBQSxNQUNiLENBQUM7QUFDRCxVQUFJLENBQUUsbUJBQWtCLG9CQUFvQjtBQUMxQyxnQkFBUSxFQUFFO0FBQ1Y7QUFBQSxNQUNGO0FBRUEsWUFBTSxNQUFNLE9BQU8sV0FBVyxJQUFJO0FBQ2xDLFVBQUksS0FBSztBQUNQLFlBQUksVUFBVSxLQUFLLEdBQUcsQ0FBQztBQUFBLE1BQ3pCO0FBQ0EsVUFBSSxnQkFBZ0IsTUFBTTtBQUMxQixjQUFRLE9BQU8sVUFBVSxXQUFXLENBQUM7QUFBQSxJQUN2QztBQUNBLFFBQUksVUFBVSxNQUFNO0FBQ2xCLFVBQUksZ0JBQWdCLE1BQU07QUFDMUIsY0FBUSxFQUFFO0FBQUEsSUFDWjtBQUVBLFFBQUksTUFBTTtBQUFBLEVBQ1osQ0FBQztBQUNIO0FBM0NnQiIsCiAgIm5hbWVzIjogW10KfQo=
