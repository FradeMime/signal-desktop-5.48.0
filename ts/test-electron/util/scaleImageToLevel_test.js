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
var import_chai = require("chai");
var import_blueimp_load_image = __toESM(require("blueimp-load-image"));
var import_MIME = require("../../types/MIME");
var import_scaleImageToLevel = require("../../util/scaleImageToLevel");
describe("scaleImageToLevel", () => {
  async function getBlob(path) {
    const response = await fetch(path);
    return response.blob();
  }
  it("doesn't scale images that are already small enough", async () => {
    const testCases = [
      {
        path: "../fixtures/kitten-1-64-64.jpg",
        contentType: import_MIME.IMAGE_JPEG,
        expectedWidth: 64,
        expectedHeight: 64
      },
      {
        path: "../fixtures/20x200-yellow.png",
        contentType: import_MIME.IMAGE_PNG,
        expectedWidth: 20,
        expectedHeight: 200
      }
    ];
    await Promise.all(testCases.map(async ({ path, contentType, expectedWidth, expectedHeight }) => {
      const blob = await getBlob(path);
      const scaled = await (0, import_scaleImageToLevel.scaleImageToLevel)(blob, contentType, true);
      const data = await (0, import_blueimp_load_image.default)(scaled.blob, { orientation: true });
      const { originalWidth: width, originalHeight: height } = data;
      import_chai.assert.strictEqual(width, expectedWidth);
      import_chai.assert.strictEqual(height, expectedHeight);
      import_chai.assert.strictEqual(scaled.contentType, contentType);
      import_chai.assert.strictEqual(scaled.blob.type, contentType);
    }));
  });
  it("removes EXIF data from small images", async () => {
    const original = await getBlob("../fixtures/kitten-2-64-64.jpg");
    import_chai.assert.isDefined((await (0, import_blueimp_load_image.default)(original, { meta: true, orientation: true })).exif, "Test setup failure: expected fixture to have EXIF data");
    const scaled = await (0, import_scaleImageToLevel.scaleImageToLevel)(original, import_MIME.IMAGE_JPEG, true);
    import_chai.assert.isUndefined((await (0, import_blueimp_load_image.default)(scaled.blob, { meta: true, orientation: true })).exif);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2NhbGVJbWFnZVRvTGV2ZWxfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBhc3NlcnQgfSBmcm9tICdjaGFpJztcbmltcG9ydCBsb2FkSW1hZ2UgZnJvbSAnYmx1ZWltcC1sb2FkLWltYWdlJztcbmltcG9ydCB7IElNQUdFX0pQRUcsIElNQUdFX1BORyB9IGZyb20gJy4uLy4uL3R5cGVzL01JTUUnO1xuXG5pbXBvcnQgeyBzY2FsZUltYWdlVG9MZXZlbCB9IGZyb20gJy4uLy4uL3V0aWwvc2NhbGVJbWFnZVRvTGV2ZWwnO1xuXG5kZXNjcmliZSgnc2NhbGVJbWFnZVRvTGV2ZWwnLCAoKSA9PiB7XG4gIC8vIE5PVEU6IFRoZXNlIHRlc3RzIGFyZSBpbmNvbXBsZXRlLlxuXG4gIGFzeW5jIGZ1bmN0aW9uIGdldEJsb2IocGF0aDogc3RyaW5nKTogUHJvbWlzZTxCbG9iPiB7XG4gICAgY29uc3QgcmVzcG9uc2UgPSBhd2FpdCBmZXRjaChwYXRoKTtcbiAgICByZXR1cm4gcmVzcG9uc2UuYmxvYigpO1xuICB9XG5cbiAgaXQoXCJkb2Vzbid0IHNjYWxlIGltYWdlcyB0aGF0IGFyZSBhbHJlYWR5IHNtYWxsIGVub3VnaFwiLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgdGVzdENhc2VzID0gW1xuICAgICAge1xuICAgICAgICBwYXRoOiAnLi4vZml4dHVyZXMva2l0dGVuLTEtNjQtNjQuanBnJyxcbiAgICAgICAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gICAgICAgIGV4cGVjdGVkV2lkdGg6IDY0LFxuICAgICAgICBleHBlY3RlZEhlaWdodDogNjQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICBwYXRoOiAnLi4vZml4dHVyZXMvMjB4MjAwLXllbGxvdy5wbmcnLFxuICAgICAgICBjb250ZW50VHlwZTogSU1BR0VfUE5HLFxuICAgICAgICBleHBlY3RlZFdpZHRoOiAyMCxcbiAgICAgICAgZXhwZWN0ZWRIZWlnaHQ6IDIwMCxcbiAgICAgIH0sXG4gICAgXTtcblxuICAgIGF3YWl0IFByb21pc2UuYWxsKFxuICAgICAgdGVzdENhc2VzLm1hcChcbiAgICAgICAgYXN5bmMgKHsgcGF0aCwgY29udGVudFR5cGUsIGV4cGVjdGVkV2lkdGgsIGV4cGVjdGVkSGVpZ2h0IH0pID0+IHtcbiAgICAgICAgICBjb25zdCBibG9iID0gYXdhaXQgZ2V0QmxvYihwYXRoKTtcbiAgICAgICAgICBjb25zdCBzY2FsZWQgPSBhd2FpdCBzY2FsZUltYWdlVG9MZXZlbChibG9iLCBjb250ZW50VHlwZSwgdHJ1ZSk7XG5cbiAgICAgICAgICBjb25zdCBkYXRhID0gYXdhaXQgbG9hZEltYWdlKHNjYWxlZC5ibG9iLCB7IG9yaWVudGF0aW9uOiB0cnVlIH0pO1xuICAgICAgICAgIGNvbnN0IHsgb3JpZ2luYWxXaWR0aDogd2lkdGgsIG9yaWdpbmFsSGVpZ2h0OiBoZWlnaHQgfSA9IGRhdGE7XG5cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwod2lkdGgsIGV4cGVjdGVkV2lkdGgpO1xuICAgICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChoZWlnaHQsIGV4cGVjdGVkSGVpZ2h0KTtcbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoc2NhbGVkLmNvbnRlbnRUeXBlLCBjb250ZW50VHlwZSk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHNjYWxlZC5ibG9iLnR5cGUsIGNvbnRlbnRUeXBlKTtcbiAgICAgICAgfVxuICAgICAgKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZW1vdmVzIEVYSUYgZGF0YSBmcm9tIHNtYWxsIGltYWdlcycsIGFzeW5jICgpID0+IHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IGF3YWl0IGdldEJsb2IoJy4uL2ZpeHR1cmVzL2tpdHRlbi0yLTY0LTY0LmpwZycpO1xuICAgIGFzc2VydC5pc0RlZmluZWQoXG4gICAgICAoYXdhaXQgbG9hZEltYWdlKG9yaWdpbmFsLCB7IG1ldGE6IHRydWUsIG9yaWVudGF0aW9uOiB0cnVlIH0pKS5leGlmLFxuICAgICAgJ1Rlc3Qgc2V0dXAgZmFpbHVyZTogZXhwZWN0ZWQgZml4dHVyZSB0byBoYXZlIEVYSUYgZGF0YSdcbiAgICApO1xuXG4gICAgY29uc3Qgc2NhbGVkID0gYXdhaXQgc2NhbGVJbWFnZVRvTGV2ZWwob3JpZ2luYWwsIElNQUdFX0pQRUcsIHRydWUpO1xuICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgIChhd2FpdCBsb2FkSW1hZ2Uoc2NhbGVkLmJsb2IsIHsgbWV0YTogdHJ1ZSwgb3JpZW50YXRpb246IHRydWUgfSkpLmV4aWZcbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLGtCQUF1QjtBQUN2QixnQ0FBc0I7QUFDdEIsa0JBQXNDO0FBRXRDLCtCQUFrQztBQUVsQyxTQUFTLHFCQUFxQixNQUFNO0FBR2xDLHlCQUF1QixNQUE2QjtBQUNsRCxVQUFNLFdBQVcsTUFBTSxNQUFNLElBQUk7QUFDakMsV0FBTyxTQUFTLEtBQUs7QUFBQSxFQUN2QjtBQUhlLEFBS2YsS0FBRyxzREFBc0QsWUFBWTtBQUNuRSxVQUFNLFlBQVk7QUFBQSxNQUNoQjtBQUFBLFFBQ0UsTUFBTTtBQUFBLFFBQ04sYUFBYTtBQUFBLFFBQ2IsZUFBZTtBQUFBLFFBQ2YsZ0JBQWdCO0FBQUEsTUFDbEI7QUFBQSxNQUNBO0FBQUEsUUFDRSxNQUFNO0FBQUEsUUFDTixhQUFhO0FBQUEsUUFDYixlQUFlO0FBQUEsUUFDZixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFFQSxVQUFNLFFBQVEsSUFDWixVQUFVLElBQ1IsT0FBTyxFQUFFLE1BQU0sYUFBYSxlQUFlLHFCQUFxQjtBQUM5RCxZQUFNLE9BQU8sTUFBTSxRQUFRLElBQUk7QUFDL0IsWUFBTSxTQUFTLE1BQU0sZ0RBQWtCLE1BQU0sYUFBYSxJQUFJO0FBRTlELFlBQU0sT0FBTyxNQUFNLHVDQUFVLE9BQU8sTUFBTSxFQUFFLGFBQWEsS0FBSyxDQUFDO0FBQy9ELFlBQU0sRUFBRSxlQUFlLE9BQU8sZ0JBQWdCLFdBQVc7QUFFekQseUJBQU8sWUFBWSxPQUFPLGFBQWE7QUFDdkMseUJBQU8sWUFBWSxRQUFRLGNBQWM7QUFDekMseUJBQU8sWUFBWSxPQUFPLGFBQWEsV0FBVztBQUNsRCx5QkFBTyxZQUFZLE9BQU8sS0FBSyxNQUFNLFdBQVc7QUFBQSxJQUNsRCxDQUNGLENBQ0Y7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHVDQUF1QyxZQUFZO0FBQ3BELFVBQU0sV0FBVyxNQUFNLFFBQVEsZ0NBQWdDO0FBQy9ELHVCQUFPLFVBQ0osT0FBTSx1Q0FBVSxVQUFVLEVBQUUsTUFBTSxNQUFNLGFBQWEsS0FBSyxDQUFDLEdBQUcsTUFDL0Qsd0RBQ0Y7QUFFQSxVQUFNLFNBQVMsTUFBTSxnREFBa0IsVUFBVSx3QkFBWSxJQUFJO0FBQ2pFLHVCQUFPLFlBQ0osT0FBTSx1Q0FBVSxPQUFPLE1BQU0sRUFBRSxNQUFNLE1BQU0sYUFBYSxLQUFLLENBQUMsR0FBRyxJQUNwRTtBQUFBLEVBQ0YsQ0FBQztBQUNILENBQUM7IiwKICAibmFtZXMiOiBbXQp9Cg==
