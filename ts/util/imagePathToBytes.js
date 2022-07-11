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
var imagePathToBytes_exports = {};
__export(imagePathToBytes_exports, {
  imagePathToBytes: () => imagePathToBytes
});
module.exports = __toCommonJS(imagePathToBytes_exports);
var import_canvasToBytes = require("./canvasToBytes");
async function imagePathToBytes(src) {
  const image = new Image();
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) {
    throw new Error("imagePathToArrayBuffer: could not get canvas rendering context");
  }
  image.src = src;
  await image.decode();
  canvas.width = image.width;
  canvas.height = image.height;
  context.drawImage(image, 0, 0);
  return (0, import_canvasToBytes.canvasToBytes)(canvas);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  imagePathToBytes
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW1hZ2VQYXRoVG9CeXRlcy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjYW52YXNUb0J5dGVzIH0gZnJvbSAnLi9jYW52YXNUb0J5dGVzJztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGltYWdlUGF0aFRvQnl0ZXMoc3JjOiBzdHJpbmcpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgY29uc3QgaW1hZ2UgPSBuZXcgSW1hZ2UoKTtcbiAgY29uc3QgY2FudmFzID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG4gIGNvbnN0IGNvbnRleHQgPSBjYW52YXMuZ2V0Q29udGV4dCgnMmQnKTtcbiAgaWYgKCFjb250ZXh0KSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgJ2ltYWdlUGF0aFRvQXJyYXlCdWZmZXI6IGNvdWxkIG5vdCBnZXQgY2FudmFzIHJlbmRlcmluZyBjb250ZXh0J1xuICAgICk7XG4gIH1cblxuICBpbWFnZS5zcmMgPSBzcmM7XG4gIGF3YWl0IGltYWdlLmRlY29kZSgpO1xuXG4gIGNhbnZhcy53aWR0aCA9IGltYWdlLndpZHRoO1xuICBjYW52YXMuaGVpZ2h0ID0gaW1hZ2UuaGVpZ2h0O1xuXG4gIGNvbnRleHQuZHJhd0ltYWdlKGltYWdlLCAwLCAwKTtcblxuICByZXR1cm4gY2FudmFzVG9CeXRlcyhjYW52YXMpO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLDJCQUE4QjtBQUU5QixnQ0FBdUMsS0FBa0M7QUFDdkUsUUFBTSxRQUFRLElBQUksTUFBTTtBQUN4QixRQUFNLFNBQVMsU0FBUyxjQUFjLFFBQVE7QUFDOUMsUUFBTSxVQUFVLE9BQU8sV0FBVyxJQUFJO0FBQ3RDLE1BQUksQ0FBQyxTQUFTO0FBQ1osVUFBTSxJQUFJLE1BQ1IsZ0VBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxNQUFNO0FBQ1osUUFBTSxNQUFNLE9BQU87QUFFbkIsU0FBTyxRQUFRLE1BQU07QUFDckIsU0FBTyxTQUFTLE1BQU07QUFFdEIsVUFBUSxVQUFVLE9BQU8sR0FBRyxDQUFDO0FBRTdCLFNBQU8sd0NBQWMsTUFBTTtBQUM3QjtBQW5Cc0IiLAogICJuYW1lcyI6IFtdCn0K
