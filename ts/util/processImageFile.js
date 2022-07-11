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
var processImageFile_exports = {};
__export(processImageFile_exports, {
  processImageFile: () => processImageFile
});
module.exports = __toCommonJS(processImageFile_exports);
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_canvasToBytes = require("./canvasToBytes");
async function processImageFile(file) {
  const { image } = await (0, import_blueimp_load_image.default)(file, {
    canvas: true,
    cover: true,
    crop: true,
    imageSmoothingQuality: "medium",
    maxHeight: 512,
    maxWidth: 512,
    minHeight: 2,
    minWidth: 2
  });
  if (!(image instanceof HTMLCanvasElement)) {
    throw new Error("Loaded image was not a canvas");
  }
  return (0, import_canvasToBytes.canvasToBytes)(image);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  processImageFile
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJvY2Vzc0ltYWdlRmlsZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IExvYWRJbWFnZU9wdGlvbnMgfSBmcm9tICdibHVlaW1wLWxvYWQtaW1hZ2UnO1xuaW1wb3J0IGxvYWRJbWFnZSBmcm9tICdibHVlaW1wLWxvYWQtaW1hZ2UnO1xuaW1wb3J0IHsgY2FudmFzVG9CeXRlcyB9IGZyb20gJy4vY2FudmFzVG9CeXRlcyc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBwcm9jZXNzSW1hZ2VGaWxlKGZpbGU6IEZpbGUpOiBQcm9taXNlPFVpbnQ4QXJyYXk+IHtcbiAgY29uc3QgeyBpbWFnZSB9ID0gYXdhaXQgbG9hZEltYWdlKGZpbGUsIHtcbiAgICBjYW52YXM6IHRydWUsXG4gICAgY292ZXI6IHRydWUsXG4gICAgY3JvcDogdHJ1ZSxcbiAgICBpbWFnZVNtb290aGluZ1F1YWxpdHk6ICdtZWRpdW0nLFxuICAgIG1heEhlaWdodDogNTEyLFxuICAgIG1heFdpZHRoOiA1MTIsXG4gICAgbWluSGVpZ2h0OiAyLFxuICAgIG1pbldpZHRoOiAyLFxuICAgIC8vIGBpbWFnZVNtb290aGluZ1F1YWxpdHlgIGlzIG5vdCBwcmVzZW50IGluIGBsb2FkSW1hZ2VgJ3MgdHlwZXMsIGJ1dCBpdCBpc1xuICAgIC8vICAgZG9jdW1lbnRlZCBhbmQgc3VwcG9ydGVkLiBVcGRhdGluZyBEZWZpbml0ZWx5VHlwZWQgaXMgdGhlIGxvbmctdGVybSBzb2x1dGlvblxuICAgIC8vICAgaGVyZS5cbiAgfSBhcyBMb2FkSW1hZ2VPcHRpb25zKTtcblxuICAvLyBOT1RFOiBUaGUgdHlwZXMgZm9yIGBsb2FkSW1hZ2VgIHNheSB0aGlzIGNhbiBuZXZlciBiZSBhIGNhbnZhcywgYnV0IGl0IHdpbGwgYmUgaWZcbiAgLy8gICBgY2FudmFzOiB0cnVlYCwgYXQgbGVhc3QgaW4gb3VyIGNhc2UuIEFnYWluLCB1cGRhdGluZyBEZWZpbml0ZWx5VHlwZWQgc2hvdWxkXG4gIC8vICAgYWRkcmVzcyB0aGlzLlxuICBpZiAoIShpbWFnZSBpbnN0YW5jZW9mIEhUTUxDYW52YXNFbGVtZW50KSkge1xuICAgIHRocm93IG5ldyBFcnJvcignTG9hZGVkIGltYWdlIHdhcyBub3QgYSBjYW52YXMnKTtcbiAgfVxuXG4gIHJldHVybiBjYW52YXNUb0J5dGVzKGltYWdlKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxnQ0FBc0I7QUFDdEIsMkJBQThCO0FBRTlCLGdDQUF1QyxNQUFpQztBQUN0RSxRQUFNLEVBQUUsVUFBVSxNQUFNLHVDQUFVLE1BQU07QUFBQSxJQUN0QyxRQUFRO0FBQUEsSUFDUixPQUFPO0FBQUEsSUFDUCxNQUFNO0FBQUEsSUFDTix1QkFBdUI7QUFBQSxJQUN2QixXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsSUFDVixXQUFXO0FBQUEsSUFDWCxVQUFVO0FBQUEsRUFJWixDQUFxQjtBQUtyQixNQUFJLENBQUUsa0JBQWlCLG9CQUFvQjtBQUN6QyxVQUFNLElBQUksTUFBTSwrQkFBK0I7QUFBQSxFQUNqRDtBQUVBLFNBQU8sd0NBQWMsS0FBSztBQUM1QjtBQXZCc0IiLAogICJuYW1lcyI6IFtdCn0K
