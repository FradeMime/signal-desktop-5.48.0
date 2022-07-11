var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var fs = __toESM(require("fs"));
var path = __toESM(require("path"));
var import_chai = require("chai");
var import_MIME = require("../../types/MIME");
var import_sniffImageMimeType = require("../../util/sniffImageMimeType");
describe("sniffImageMimeType", () => {
  const fixture = /* @__PURE__ */ __name((filename) => {
    const fixturePath = path.join(__dirname, "..", "..", "..", "fixtures", filename);
    return fs.promises.readFile(fixturePath);
  }, "fixture");
  it("returns undefined for empty buffers", () => {
    import_chai.assert.isUndefined((0, import_sniffImageMimeType.sniffImageMimeType)(new Uint8Array()));
  });
  it("returns undefined for non-image files", async () => {
    await Promise.all(["pixabay-Soap-Bubble-7141.mp4", "lorem-ipsum.txt"].map(async (filename) => {
      import_chai.assert.isUndefined((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture(filename)));
    }));
  });
  it("sniffs ICO files", async () => {
    import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture("kitten-1-64-64.ico")), import_MIME.IMAGE_ICO);
  });
  it("sniffs BMP files", async () => {
    import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture("2x2.bmp")), import_MIME.IMAGE_BMP);
  });
  it("sniffs GIF files", async () => {
    import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture("giphy-GVNvOUpeYmI7e.gif")), import_MIME.IMAGE_GIF);
  });
  it("sniffs WEBP files", async () => {
    import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture("512x515-thumbs-up-lincoln.webp")), import_MIME.IMAGE_WEBP);
  });
  it("sniffs PNG files", async () => {
    await Promise.all([
      "freepngs-2cd43b_bed7d1327e88454487397574d87b64dc_mv2.png",
      "Animated_PNG_example_bouncing_beach_ball.png"
    ].map(async (filename) => {
      import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture(filename)), import_MIME.IMAGE_PNG);
    }));
  });
  it("sniffs JPEG files", async () => {
    import_chai.assert.strictEqual((0, import_sniffImageMimeType.sniffImageMimeType)(await fixture("kitten-1-64-64.jpg")), import_MIME.IMAGE_JPEG);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic25pZmZJbWFnZU1pbWVUeXBlX3Rlc3QudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0ICogYXMgZnMgZnJvbSAnZnMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJ2NoYWknO1xuaW1wb3J0IHtcbiAgSU1BR0VfQk1QLFxuICBJTUFHRV9HSUYsXG4gIElNQUdFX0lDTyxcbiAgSU1BR0VfSlBFRyxcbiAgSU1BR0VfUE5HLFxuICBJTUFHRV9XRUJQLFxufSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcblxuaW1wb3J0IHsgc25pZmZJbWFnZU1pbWVUeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9zbmlmZkltYWdlTWltZVR5cGUnO1xuXG5kZXNjcmliZSgnc25pZmZJbWFnZU1pbWVUeXBlJywgKCkgPT4ge1xuICBjb25zdCBmaXh0dXJlID0gKGZpbGVuYW1lOiBzdHJpbmcpOiBQcm9taXNlPEJ1ZmZlcj4gPT4ge1xuICAgIGNvbnN0IGZpeHR1cmVQYXRoID0gcGF0aC5qb2luKFxuICAgICAgX19kaXJuYW1lLFxuICAgICAgJy4uJyxcbiAgICAgICcuLicsXG4gICAgICAnLi4nLFxuICAgICAgJ2ZpeHR1cmVzJyxcbiAgICAgIGZpbGVuYW1lXG4gICAgKTtcbiAgICByZXR1cm4gZnMucHJvbWlzZXMucmVhZEZpbGUoZml4dHVyZVBhdGgpO1xuICB9O1xuXG4gIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBmb3IgZW1wdHkgYnVmZmVycycsICgpID0+IHtcbiAgICBhc3NlcnQuaXNVbmRlZmluZWQoc25pZmZJbWFnZU1pbWVUeXBlKG5ldyBVaW50OEFycmF5KCkpKTtcbiAgfSk7XG5cbiAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGZvciBub24taW1hZ2UgZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBbJ3BpeGFiYXktU29hcC1CdWJibGUtNzE0MS5tcDQnLCAnbG9yZW0taXBzdW0udHh0J10ubWFwKFxuICAgICAgICBhc3luYyBmaWxlbmFtZSA9PiB7XG4gICAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHNuaWZmSW1hZ2VNaW1lVHlwZShhd2FpdCBmaXh0dXJlKGZpbGVuYW1lKSkpO1xuICAgICAgICB9XG4gICAgICApXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3NuaWZmcyBJQ08gZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgc25pZmZJbWFnZU1pbWVUeXBlKGF3YWl0IGZpeHR1cmUoJ2tpdHRlbi0xLTY0LTY0LmljbycpKSxcbiAgICAgIElNQUdFX0lDT1xuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdzbmlmZnMgQk1QIGZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChzbmlmZkltYWdlTWltZVR5cGUoYXdhaXQgZml4dHVyZSgnMngyLmJtcCcpKSwgSU1BR0VfQk1QKTtcbiAgfSk7XG5cbiAgaXQoJ3NuaWZmcyBHSUYgZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgc25pZmZJbWFnZU1pbWVUeXBlKGF3YWl0IGZpeHR1cmUoJ2dpcGh5LUdWTnZPVXBlWW1JN2UuZ2lmJykpLFxuICAgICAgSU1BR0VfR0lGXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3NuaWZmcyBXRUJQIGZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgIHNuaWZmSW1hZ2VNaW1lVHlwZShhd2FpdCBmaXh0dXJlKCc1MTJ4NTE1LXRodW1icy11cC1saW5jb2xuLndlYnAnKSksXG4gICAgICBJTUFHRV9XRUJQXG4gICAgKTtcbiAgfSk7XG5cbiAgaXQoJ3NuaWZmcyBQTkcgZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBbXG4gICAgICAgICdmcmVlcG5ncy0yY2Q0M2JfYmVkN2QxMzI3ZTg4NDU0NDg3Mzk3NTc0ZDg3YjY0ZGNfbXYyLnBuZycsXG4gICAgICAgICdBbmltYXRlZF9QTkdfZXhhbXBsZV9ib3VuY2luZ19iZWFjaF9iYWxsLnBuZycsXG4gICAgICBdLm1hcChhc3luYyBmaWxlbmFtZSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBzbmlmZkltYWdlTWltZVR5cGUoYXdhaXQgZml4dHVyZShmaWxlbmFtZSkpLFxuICAgICAgICAgIElNQUdFX1BOR1xuICAgICAgICApO1xuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgnc25pZmZzIEpQRUcgZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgc25pZmZJbWFnZU1pbWVUeXBlKGF3YWl0IGZpeHR1cmUoJ2tpdHRlbi0xLTY0LTY0LmpwZycpKSxcbiAgICAgIElNQUdFX0pQRUdcbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFNBQW9CO0FBQ3BCLFdBQXNCO0FBQ3RCLGtCQUF1QjtBQUN2QixrQkFPTztBQUVQLGdDQUFtQztBQUVuQyxTQUFTLHNCQUFzQixNQUFNO0FBQ25DLFFBQU0sVUFBVSx3QkFBQyxhQUFzQztBQUNyRCxVQUFNLGNBQWMsS0FBSyxLQUN2QixXQUNBLE1BQ0EsTUFDQSxNQUNBLFlBQ0EsUUFDRjtBQUNBLFdBQU8sR0FBRyxTQUFTLFNBQVMsV0FBVztBQUFBLEVBQ3pDLEdBVmdCO0FBWWhCLEtBQUcsdUNBQXVDLE1BQU07QUFDOUMsdUJBQU8sWUFBWSxrREFBbUIsSUFBSSxXQUFXLENBQUMsQ0FBQztBQUFBLEVBQ3pELENBQUM7QUFFRCxLQUFHLHlDQUF5QyxZQUFZO0FBQ3RELFVBQU0sUUFBUSxJQUNaLENBQUMsZ0NBQWdDLGlCQUFpQixFQUFFLElBQ2xELE9BQU0sYUFBWTtBQUNoQix5QkFBTyxZQUFZLGtEQUFtQixNQUFNLFFBQVEsUUFBUSxDQUFDLENBQUM7QUFBQSxJQUNoRSxDQUNGLENBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLG9CQUFvQixZQUFZO0FBQ2pDLHVCQUFPLFlBQ0wsa0RBQW1CLE1BQU0sUUFBUSxvQkFBb0IsQ0FBQyxHQUN0RCxxQkFDRjtBQUFBLEVBQ0YsQ0FBQztBQUVELEtBQUcsb0JBQW9CLFlBQVk7QUFDakMsdUJBQU8sWUFBWSxrREFBbUIsTUFBTSxRQUFRLFNBQVMsQ0FBQyxHQUFHLHFCQUFTO0FBQUEsRUFDNUUsQ0FBQztBQUVELEtBQUcsb0JBQW9CLFlBQVk7QUFDakMsdUJBQU8sWUFDTCxrREFBbUIsTUFBTSxRQUFRLHlCQUF5QixDQUFDLEdBQzNELHFCQUNGO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxxQkFBcUIsWUFBWTtBQUNsQyx1QkFBTyxZQUNMLGtEQUFtQixNQUFNLFFBQVEsZ0NBQWdDLENBQUMsR0FDbEUsc0JBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLG9CQUFvQixZQUFZO0FBQ2pDLFVBQU0sUUFBUSxJQUNaO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxJQUNGLEVBQUUsSUFBSSxPQUFNLGFBQVk7QUFDdEIseUJBQU8sWUFDTCxrREFBbUIsTUFBTSxRQUFRLFFBQVEsQ0FBQyxHQUMxQyxxQkFDRjtBQUFBLElBQ0YsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRyxxQkFBcUIsWUFBWTtBQUNsQyx1QkFBTyxZQUNMLGtEQUFtQixNQUFNLFFBQVEsb0JBQW9CLENBQUMsR0FDdEQsc0JBQ0Y7QUFBQSxFQUNGLENBQUM7QUFDSCxDQUFDOyIsCiAgIm5hbWVzIjogW10KfQo=
