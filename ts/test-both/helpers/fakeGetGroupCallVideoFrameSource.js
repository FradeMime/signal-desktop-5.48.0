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
var fakeGetGroupCallVideoFrameSource_exports = {};
__export(fakeGetGroupCallVideoFrameSource_exports, {
  fakeGetGroupCallVideoFrameSource: () => fakeGetGroupCallVideoFrameSource
});
module.exports = __toCommonJS(fakeGetGroupCallVideoFrameSource_exports);
const COLORS = [
  [255, 0, 0],
  [255, 153, 0],
  [255, 255, 0],
  [0, 255, 0],
  [0, 153, 255],
  [255, 0, 255],
  [153, 51, 255]
];
class FakeGroupCallVideoFrameSource {
  constructor(width, height, r, g, b) {
    const length = width * height * 4;
    this.sourceArray = new Uint8Array(length);
    for (let i = 0; i < length; i += 4) {
      this.sourceArray[i] = r;
      this.sourceArray[i + 1] = g;
      this.sourceArray[i + 2] = b;
      this.sourceArray[i + 3] = 255;
    }
    this.dimensions = [width, height];
  }
  receiveVideoFrame(destinationBuffer) {
    if (Math.random() < 0.5) {
      return void 0;
    }
    destinationBuffer.set(this.sourceArray);
    return this.dimensions;
  }
}
function fakeGetGroupCallVideoFrameSource(demuxId) {
  const color = COLORS[demuxId % COLORS.length];
  if (!color) {
    throw new Error("Expected a color, but it was not found");
  }
  const [r, g, b] = color;
  return new FakeGroupCallVideoFrameSource(13, 10, r, g, b);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeGetGroupCallVideoFrameSource
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBWaWRlb0ZyYW1lU291cmNlIH0gZnJvbSAncmluZ3J0Yyc7XG5cbmNvbnN0IENPTE9SUzogQXJyYXk8W251bWJlciwgbnVtYmVyLCBudW1iZXJdPiA9IFtcbiAgWzB4ZmYsIDB4MDAsIDB4MDBdLFxuICBbMHhmZiwgMHg5OSwgMHgwMF0sXG4gIFsweGZmLCAweGZmLCAweDAwXSxcbiAgWzB4MDAsIDB4ZmYsIDB4MDBdLFxuICBbMHgwMCwgMHg5OSwgMHhmZl0sXG4gIFsweGZmLCAweDAwLCAweGZmXSxcbiAgWzB4OTksIDB4MzMsIDB4ZmZdLFxuXTtcblxuY2xhc3MgRmFrZUdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UgaW1wbGVtZW50cyBWaWRlb0ZyYW1lU291cmNlIHtcbiAgcHJpdmF0ZSByZWFkb25seSBzb3VyY2VBcnJheTogVWludDhBcnJheTtcblxuICBwcml2YXRlIHJlYWRvbmx5IGRpbWVuc2lvbnM6IFtudW1iZXIsIG51bWJlcl07XG5cbiAgY29uc3RydWN0b3Iod2lkdGg6IG51bWJlciwgaGVpZ2h0OiBudW1iZXIsIHI6IG51bWJlciwgZzogbnVtYmVyLCBiOiBudW1iZXIpIHtcbiAgICBjb25zdCBsZW5ndGggPSB3aWR0aCAqIGhlaWdodCAqIDQ7XG5cbiAgICB0aGlzLnNvdXJjZUFycmF5ID0gbmV3IFVpbnQ4QXJyYXkobGVuZ3RoKTtcbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGxlbmd0aDsgaSArPSA0KSB7XG4gICAgICB0aGlzLnNvdXJjZUFycmF5W2ldID0gcjtcbiAgICAgIHRoaXMuc291cmNlQXJyYXlbaSArIDFdID0gZztcbiAgICAgIHRoaXMuc291cmNlQXJyYXlbaSArIDJdID0gYjtcbiAgICAgIHRoaXMuc291cmNlQXJyYXlbaSArIDNdID0gMjU1O1xuICAgIH1cblxuICAgIHRoaXMuZGltZW5zaW9ucyA9IFt3aWR0aCwgaGVpZ2h0XTtcbiAgfVxuXG4gIHJlY2VpdmVWaWRlb0ZyYW1lKGRlc3RpbmF0aW9uQnVmZmVyOiBCdWZmZXIpOiBbbnVtYmVyLCBudW1iZXJdIHwgdW5kZWZpbmVkIHtcbiAgICAvLyBTaW11bGF0ZSBuZXR3b3JrIGppdHRlci4gQWxzbyBpbXByb3ZlcyBwZXJmb3JtYW5jZSB3aGVuIHRlc3RpbmcuXG4gICAgaWYgKE1hdGgucmFuZG9tKCkgPCAwLjUpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgZGVzdGluYXRpb25CdWZmZXIuc2V0KHRoaXMuc291cmNlQXJyYXkpO1xuICAgIHJldHVybiB0aGlzLmRpbWVuc2lvbnM7XG4gIH1cbn1cblxuLyoqXG4gKiBUaGlzIHByb2R1Y2VzIGEgZmFrZSB2aWRlbyBmcmFtZSBzb3VyY2UgdGhhdCBpcyBhIHNpbmdsZSBjb2xvci5cbiAqXG4gKiBUaGUgYXNwZWN0IHJhdGlvIGlzIGZpeGVkIGF0IDEuMyBiZWNhdXNlIHRoYXQgbWF0Y2hlcyBtYW55IG9mIG91ciBzdG9yaWVzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UoXG4gIGRlbXV4SWQ6IG51bWJlclxuKTogVmlkZW9GcmFtZVNvdXJjZSB7XG4gIGNvbnN0IGNvbG9yID0gQ09MT1JTW2RlbXV4SWQgJSBDT0xPUlMubGVuZ3RoXTtcbiAgaWYgKCFjb2xvcikge1xuICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgYSBjb2xvciwgYnV0IGl0IHdhcyBub3QgZm91bmQnKTtcbiAgfVxuICBjb25zdCBbciwgZywgYl0gPSBjb2xvcjtcblxuICByZXR1cm4gbmV3IEZha2VHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlKDEzLCAxMCwgciwgZywgYik7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBS0EsTUFBTSxTQUEwQztBQUFBLEVBQzlDLENBQUMsS0FBTSxHQUFNLENBQUk7QUFBQSxFQUNqQixDQUFDLEtBQU0sS0FBTSxDQUFJO0FBQUEsRUFDakIsQ0FBQyxLQUFNLEtBQU0sQ0FBSTtBQUFBLEVBQ2pCLENBQUMsR0FBTSxLQUFNLENBQUk7QUFBQSxFQUNqQixDQUFDLEdBQU0sS0FBTSxHQUFJO0FBQUEsRUFDakIsQ0FBQyxLQUFNLEdBQU0sR0FBSTtBQUFBLEVBQ2pCLENBQUMsS0FBTSxJQUFNLEdBQUk7QUFDbkI7QUFFQSxNQUFNLDhCQUEwRDtBQUFBLEVBSzlELFlBQVksT0FBZSxRQUFnQixHQUFXLEdBQVcsR0FBVztBQUMxRSxVQUFNLFNBQVMsUUFBUSxTQUFTO0FBRWhDLFNBQUssY0FBYyxJQUFJLFdBQVcsTUFBTTtBQUN4QyxhQUFTLElBQUksR0FBRyxJQUFJLFFBQVEsS0FBSyxHQUFHO0FBQ2xDLFdBQUssWUFBWSxLQUFLO0FBQ3RCLFdBQUssWUFBWSxJQUFJLEtBQUs7QUFDMUIsV0FBSyxZQUFZLElBQUksS0FBSztBQUMxQixXQUFLLFlBQVksSUFBSSxLQUFLO0FBQUEsSUFDNUI7QUFFQSxTQUFLLGFBQWEsQ0FBQyxPQUFPLE1BQU07QUFBQSxFQUNsQztBQUFBLEVBRUEsa0JBQWtCLG1CQUF5RDtBQUV6RSxRQUFJLEtBQUssT0FBTyxJQUFJLEtBQUs7QUFDdkIsYUFBTztBQUFBLElBQ1Q7QUFFQSxzQkFBa0IsSUFBSSxLQUFLLFdBQVc7QUFDdEMsV0FBTyxLQUFLO0FBQUEsRUFDZDtBQUNGO0FBNUJBLEFBbUNPLDBDQUNMLFNBQ2tCO0FBQ2xCLFFBQU0sUUFBUSxPQUFPLFVBQVUsT0FBTztBQUN0QyxNQUFJLENBQUMsT0FBTztBQUNWLFVBQU0sSUFBSSxNQUFNLHdDQUF3QztBQUFBLEVBQzFEO0FBQ0EsUUFBTSxDQUFDLEdBQUcsR0FBRyxLQUFLO0FBRWxCLFNBQU8sSUFBSSw4QkFBOEIsSUFBSSxJQUFJLEdBQUcsR0FBRyxDQUFDO0FBQzFEO0FBVmdCIiwKICAibmFtZXMiOiBbXQp9Cg==
