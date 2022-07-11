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
var import_getAnimatedPngDataIfExists = require("../../util/getAnimatedPngDataIfExists");
describe("getAnimatedPngDataIfExists", () => {
  const fixture = /* @__PURE__ */ __name((filename) => {
    const fixturePath = path.join(__dirname, "..", "..", "..", "fixtures", filename);
    return fs.promises.readFile(fixturePath);
  }, "fixture");
  it("returns null for empty buffers", () => {
    import_chai.assert.isNull((0, import_getAnimatedPngDataIfExists.getAnimatedPngDataIfExists)(Buffer.alloc(0)));
  });
  it("returns null for non-PNG files", async () => {
    await Promise.all([
      "kitten-1-64-64.jpg",
      "512x515-thumbs-up-lincoln.webp",
      "giphy-GVNvOUpeYmI7e.gif",
      "pixabay-Soap-Bubble-7141.mp4",
      "lorem-ipsum.txt"
    ].map(async (filename) => {
      import_chai.assert.isNull((0, import_getAnimatedPngDataIfExists.getAnimatedPngDataIfExists)(await fixture(filename)));
    }));
  });
  it("returns null for non-animated PNG files", async () => {
    import_chai.assert.isNull((0, import_getAnimatedPngDataIfExists.getAnimatedPngDataIfExists)(await fixture("20x200-yellow.png")));
  });
  it("returns data for animated PNG files", async () => {
    import_chai.assert.deepEqual((0, import_getAnimatedPngDataIfExists.getAnimatedPngDataIfExists)(await fixture("Animated_PNG_example_bouncing_beach_ball.png")), { numPlays: Infinity });
    import_chai.assert.deepEqual((0, import_getAnimatedPngDataIfExists.getAnimatedPngDataIfExists)(await fixture("apng_with_2_plays.png")), { numPlays: 2 });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZ2V0QW5pbWF0ZWRQbmdEYXRhSWZFeGlzdHNfdGVzdC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBmcyBmcm9tICdmcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5cbmltcG9ydCB7IGdldEFuaW1hdGVkUG5nRGF0YUlmRXhpc3RzIH0gZnJvbSAnLi4vLi4vdXRpbC9nZXRBbmltYXRlZFBuZ0RhdGFJZkV4aXN0cyc7XG5cbmRlc2NyaWJlKCdnZXRBbmltYXRlZFBuZ0RhdGFJZkV4aXN0cycsICgpID0+IHtcbiAgY29uc3QgZml4dHVyZSA9IChmaWxlbmFtZTogc3RyaW5nKTogUHJvbWlzZTxCdWZmZXI+ID0+IHtcbiAgICBjb25zdCBmaXh0dXJlUGF0aCA9IHBhdGguam9pbihcbiAgICAgIF9fZGlybmFtZSxcbiAgICAgICcuLicsXG4gICAgICAnLi4nLFxuICAgICAgJy4uJyxcbiAgICAgICdmaXh0dXJlcycsXG4gICAgICBmaWxlbmFtZVxuICAgICk7XG4gICAgcmV0dXJuIGZzLnByb21pc2VzLnJlYWRGaWxlKGZpeHR1cmVQYXRoKTtcbiAgfTtcblxuICBpdCgncmV0dXJucyBudWxsIGZvciBlbXB0eSBidWZmZXJzJywgKCkgPT4ge1xuICAgIGFzc2VydC5pc051bGwoZ2V0QW5pbWF0ZWRQbmdEYXRhSWZFeGlzdHMoQnVmZmVyLmFsbG9jKDApKSk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIG51bGwgZm9yIG5vbi1QTkcgZmlsZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoXG4gICAgICBbXG4gICAgICAgICdraXR0ZW4tMS02NC02NC5qcGcnLFxuICAgICAgICAnNTEyeDUxNS10aHVtYnMtdXAtbGluY29sbi53ZWJwJyxcbiAgICAgICAgJ2dpcGh5LUdWTnZPVXBlWW1JN2UuZ2lmJyxcbiAgICAgICAgJ3BpeGFiYXktU29hcC1CdWJibGUtNzE0MS5tcDQnLFxuICAgICAgICAnbG9yZW0taXBzdW0udHh0JyxcbiAgICAgIF0ubWFwKGFzeW5jIGZpbGVuYW1lID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzTnVsbChnZXRBbmltYXRlZFBuZ0RhdGFJZkV4aXN0cyhhd2FpdCBmaXh0dXJlKGZpbGVuYW1lKSkpO1xuICAgICAgfSlcbiAgICApO1xuICB9KTtcblxuICBpdCgncmV0dXJucyBudWxsIGZvciBub24tYW5pbWF0ZWQgUE5HIGZpbGVzJywgYXN5bmMgKCkgPT4ge1xuICAgIGFzc2VydC5pc051bGwoXG4gICAgICBnZXRBbmltYXRlZFBuZ0RhdGFJZkV4aXN0cyhhd2FpdCBmaXh0dXJlKCcyMHgyMDAteWVsbG93LnBuZycpKVxuICAgICk7XG4gIH0pO1xuXG4gIGl0KCdyZXR1cm5zIGRhdGEgZm9yIGFuaW1hdGVkIFBORyBmaWxlcycsIGFzeW5jICgpID0+IHtcbiAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgZ2V0QW5pbWF0ZWRQbmdEYXRhSWZFeGlzdHMoXG4gICAgICAgIGF3YWl0IGZpeHR1cmUoJ0FuaW1hdGVkX1BOR19leGFtcGxlX2JvdW5jaW5nX2JlYWNoX2JhbGwucG5nJylcbiAgICAgICksXG4gICAgICB7IG51bVBsYXlzOiBJbmZpbml0eSB9XG4gICAgKTtcblxuICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICBnZXRBbmltYXRlZFBuZ0RhdGFJZkV4aXN0cyhhd2FpdCBmaXh0dXJlKCdhcG5nX3dpdGhfMl9wbGF5cy5wbmcnKSksXG4gICAgICB7IG51bVBsYXlzOiAyIH1cbiAgICApO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7OztBQUdBLFNBQW9CO0FBQ3BCLFdBQXNCO0FBQ3RCLGtCQUF1QjtBQUV2Qix3Q0FBMkM7QUFFM0MsU0FBUyw4QkFBOEIsTUFBTTtBQUMzQyxRQUFNLFVBQVUsd0JBQUMsYUFBc0M7QUFDckQsVUFBTSxjQUFjLEtBQUssS0FDdkIsV0FDQSxNQUNBLE1BQ0EsTUFDQSxZQUNBLFFBQ0Y7QUFDQSxXQUFPLEdBQUcsU0FBUyxTQUFTLFdBQVc7QUFBQSxFQUN6QyxHQVZnQjtBQVloQixLQUFHLGtDQUFrQyxNQUFNO0FBQ3pDLHVCQUFPLE9BQU8sa0VBQTJCLE9BQU8sTUFBTSxDQUFDLENBQUMsQ0FBQztBQUFBLEVBQzNELENBQUM7QUFFRCxLQUFHLGtDQUFrQyxZQUFZO0FBQy9DLFVBQU0sUUFBUSxJQUNaO0FBQUEsTUFDRTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLEVBQUUsSUFBSSxPQUFNLGFBQVk7QUFDdEIseUJBQU8sT0FBTyxrRUFBMkIsTUFBTSxRQUFRLFFBQVEsQ0FBQyxDQUFDO0FBQUEsSUFDbkUsQ0FBQyxDQUNIO0FBQUEsRUFDRixDQUFDO0FBRUQsS0FBRywyQ0FBMkMsWUFBWTtBQUN4RCx1QkFBTyxPQUNMLGtFQUEyQixNQUFNLFFBQVEsbUJBQW1CLENBQUMsQ0FDL0Q7QUFBQSxFQUNGLENBQUM7QUFFRCxLQUFHLHVDQUF1QyxZQUFZO0FBQ3BELHVCQUFPLFVBQ0wsa0VBQ0UsTUFBTSxRQUFRLDhDQUE4QyxDQUM5RCxHQUNBLEVBQUUsVUFBVSxTQUFTLENBQ3ZCO0FBRUEsdUJBQU8sVUFDTCxrRUFBMkIsTUFBTSxRQUFRLHVCQUF1QixDQUFDLEdBQ2pFLEVBQUUsVUFBVSxFQUFFLENBQ2hCO0FBQUEsRUFDRixDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
