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
var shouldUseFullSizeLinkPreviewImage_exports = {};
__export(shouldUseFullSizeLinkPreviewImage_exports, {
  shouldUseFullSizeLinkPreviewImage: () => shouldUseFullSizeLinkPreviewImage
});
module.exports = __toCommonJS(shouldUseFullSizeLinkPreviewImage_exports);
var import_Attachment = require("../types/Attachment");
const MINIMUM_FULL_SIZE_DIMENSION = 200;
function shouldUseFullSizeLinkPreviewImage({
  isStickerPack,
  image
}) {
  if (isStickerPack || !image || !(0, import_Attachment.isImageAttachment)(image)) {
    return false;
  }
  const { width, height } = image;
  return isDimensionFullSize(width) && isDimensionFullSize(height) && !isRoughlySquare(width, height);
}
function isDimensionFullSize(dimension) {
  return typeof dimension === "number" && dimension >= MINIMUM_FULL_SIZE_DIMENSION;
}
function isRoughlySquare(width, height) {
  return Math.abs(1 - width / height) < 0.05;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  shouldUseFullSizeLinkPreviewImage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTGlua1ByZXZpZXdUeXBlIH0gZnJvbSAnLi4vdHlwZXMvbWVzc2FnZS9MaW5rUHJldmlld3MnO1xuaW1wb3J0IHsgaXNJbWFnZUF0dGFjaG1lbnQgfSBmcm9tICcuLi90eXBlcy9BdHRhY2htZW50JztcblxuY29uc3QgTUlOSU1VTV9GVUxMX1NJWkVfRElNRU5TSU9OID0gMjAwO1xuXG5leHBvcnQgZnVuY3Rpb24gc2hvdWxkVXNlRnVsbFNpemVMaW5rUHJldmlld0ltYWdlKHtcbiAgaXNTdGlja2VyUGFjayxcbiAgaW1hZ2UsXG59OiBSZWFkb25seTxMaW5rUHJldmlld1R5cGU+KTogYm9vbGVhbiB7XG4gIGlmIChpc1N0aWNrZXJQYWNrIHx8ICFpbWFnZSB8fCAhaXNJbWFnZUF0dGFjaG1lbnQoaW1hZ2UpKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgeyB3aWR0aCwgaGVpZ2h0IH0gPSBpbWFnZTtcblxuICByZXR1cm4gKFxuICAgIGlzRGltZW5zaW9uRnVsbFNpemUod2lkdGgpICYmXG4gICAgaXNEaW1lbnNpb25GdWxsU2l6ZShoZWlnaHQpICYmXG4gICAgIWlzUm91Z2hseVNxdWFyZSh3aWR0aCwgaGVpZ2h0KVxuICApO1xufVxuXG5mdW5jdGlvbiBpc0RpbWVuc2lvbkZ1bGxTaXplKGRpbWVuc2lvbjogdW5rbm93bik6IGRpbWVuc2lvbiBpcyBudW1iZXIge1xuICByZXR1cm4gKFxuICAgIHR5cGVvZiBkaW1lbnNpb24gPT09ICdudW1iZXInICYmIGRpbWVuc2lvbiA+PSBNSU5JTVVNX0ZVTExfU0laRV9ESU1FTlNJT05cbiAgKTtcbn1cblxuZnVuY3Rpb24gaXNSb3VnaGx5U3F1YXJlKHdpZHRoOiBudW1iZXIsIGhlaWdodDogbnVtYmVyKTogYm9vbGVhbiB7XG4gIHJldHVybiBNYXRoLmFicygxIC0gd2lkdGggLyBoZWlnaHQpIDwgMC4wNTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSx3QkFBa0M7QUFFbEMsTUFBTSw4QkFBOEI7QUFFN0IsMkNBQTJDO0FBQUEsRUFDaEQ7QUFBQSxFQUNBO0FBQUEsR0FDcUM7QUFDckMsTUFBSSxpQkFBaUIsQ0FBQyxTQUFTLENBQUMseUNBQWtCLEtBQUssR0FBRztBQUN4RCxXQUFPO0FBQUEsRUFDVDtBQUVBLFFBQU0sRUFBRSxPQUFPLFdBQVc7QUFFMUIsU0FDRSxvQkFBb0IsS0FBSyxLQUN6QixvQkFBb0IsTUFBTSxLQUMxQixDQUFDLGdCQUFnQixPQUFPLE1BQU07QUFFbEM7QUFmZ0IsQUFpQmhCLDZCQUE2QixXQUF5QztBQUNwRSxTQUNFLE9BQU8sY0FBYyxZQUFZLGFBQWE7QUFFbEQ7QUFKUyxBQU1ULHlCQUF5QixPQUFlLFFBQXlCO0FBQy9ELFNBQU8sS0FBSyxJQUFJLElBQUksUUFBUSxNQUFNLElBQUk7QUFDeEM7QUFGUyIsCiAgIm5hbWVzIjogW10KfQo=
