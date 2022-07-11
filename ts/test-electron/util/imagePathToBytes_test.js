var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var import_path = __toESM(require("path"));
var import_imagePathToBytes = require("../../util/imagePathToBytes");
describe("imagePathToBytes", () => {
  it("converts an image to an Bytes", async () => {
    const avatarPath = import_path.default.join(__dirname, "../../../fixtures/kitten-3-64-64.jpg");
    const buffer = await (0, import_imagePathToBytes.imagePathToBytes)(avatarPath);
    import_chai.assert.isDefined(buffer);
    (0, import_chai.assert)(buffer instanceof Uint8Array);
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaW1hZ2VQYXRoVG9CeXRlc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG4vL1xuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuaW1wb3J0IHsgaW1hZ2VQYXRoVG9CeXRlcyB9IGZyb20gJy4uLy4uL3V0aWwvaW1hZ2VQYXRoVG9CeXRlcyc7XG5cbmRlc2NyaWJlKCdpbWFnZVBhdGhUb0J5dGVzJywgKCkgPT4ge1xuICBpdCgnY29udmVydHMgYW4gaW1hZ2UgdG8gYW4gQnl0ZXMnLCBhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgYXZhdGFyUGF0aCA9IHBhdGguam9pbihcbiAgICAgIF9fZGlybmFtZSxcbiAgICAgICcuLi8uLi8uLi9maXh0dXJlcy9raXR0ZW4tMy02NC02NC5qcGcnXG4gICAgKTtcbiAgICBjb25zdCBidWZmZXIgPSBhd2FpdCBpbWFnZVBhdGhUb0J5dGVzKGF2YXRhclBhdGgpO1xuICAgIGFzc2VydC5pc0RlZmluZWQoYnVmZmVyKTtcbiAgICBhc3NlcnQoYnVmZmVyIGluc3RhbmNlb2YgVWludDhBcnJheSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7QUFHQSxrQkFBdUI7QUFDdkIsa0JBQWlCO0FBRWpCLDhCQUFpQztBQUVqQyxTQUFTLG9CQUFvQixNQUFNO0FBQ2pDLEtBQUcsaUNBQWlDLFlBQVk7QUFDOUMsVUFBTSxhQUFhLG9CQUFLLEtBQ3RCLFdBQ0Esc0NBQ0Y7QUFDQSxVQUFNLFNBQVMsTUFBTSw4Q0FBaUIsVUFBVTtBQUNoRCx1QkFBTyxVQUFVLE1BQU07QUFDdkIsNEJBQU8sa0JBQWtCLFVBQVU7QUFBQSxFQUNyQyxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
