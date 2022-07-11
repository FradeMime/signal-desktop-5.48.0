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
var BadgeImage_exports = {};
__export(BadgeImage_exports, {
  BadgeImage: () => BadgeImage
});
module.exports = __toCommonJS(BadgeImage_exports);
var import_react = __toESM(require("react"));
var import_Spinner = require("./Spinner");
var import_getBadgeImageFileLocalPath = require("../badges/getBadgeImageFileLocalPath");
var import_BadgeImageTheme = require("../badges/BadgeImageTheme");
function BadgeImage({
  badge,
  size
}) {
  const { name } = badge;
  const imagePath = (0, import_getBadgeImageFileLocalPath.getBadgeImageFileLocalPath)(badge, size, import_BadgeImageTheme.BadgeImageTheme.Transparent);
  if (!imagePath) {
    return /* @__PURE__ */ import_react.default.createElement(import_Spinner.Spinner, {
      ariaLabel: name,
      moduleClassName: "BadgeImage BadgeImage__loading",
      size: `${size}px`,
      svgSize: "normal"
    });
  }
  return /* @__PURE__ */ import_react.default.createElement("img", {
    alt: name,
    className: "BadgeImage",
    src: imagePath,
    style: {
      width: size,
      height: size
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeImage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VJbWFnZS50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBCYWRnZVR5cGUgfSBmcm9tICcuLi9iYWRnZXMvdHlwZXMnO1xuaW1wb3J0IHsgU3Bpbm5lciB9IGZyb20gJy4vU3Bpbm5lcic7XG5pbXBvcnQgeyBnZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCB9IGZyb20gJy4uL2JhZGdlcy9nZXRCYWRnZUltYWdlRmlsZUxvY2FsUGF0aCc7XG5pbXBvcnQgeyBCYWRnZUltYWdlVGhlbWUgfSBmcm9tICcuLi9iYWRnZXMvQmFkZ2VJbWFnZVRoZW1lJztcblxuZXhwb3J0IGZ1bmN0aW9uIEJhZGdlSW1hZ2Uoe1xuICBiYWRnZSxcbiAgc2l6ZSxcbn06IFJlYWRvbmx5PHtcbiAgYmFkZ2U6IEJhZGdlVHlwZTtcbiAgc2l6ZTogbnVtYmVyO1xufT4pOiBKU1guRWxlbWVudCB7XG4gIGNvbnN0IHsgbmFtZSB9ID0gYmFkZ2U7XG5cbiAgY29uc3QgaW1hZ2VQYXRoID0gZ2V0QmFkZ2VJbWFnZUZpbGVMb2NhbFBhdGgoXG4gICAgYmFkZ2UsXG4gICAgc2l6ZSxcbiAgICBCYWRnZUltYWdlVGhlbWUuVHJhbnNwYXJlbnRcbiAgKTtcblxuICBpZiAoIWltYWdlUGF0aCkge1xuICAgIHJldHVybiAoXG4gICAgICA8U3Bpbm5lclxuICAgICAgICBhcmlhTGFiZWw9e25hbWV9XG4gICAgICAgIG1vZHVsZUNsYXNzTmFtZT1cIkJhZGdlSW1hZ2UgQmFkZ2VJbWFnZV9fbG9hZGluZ1wiXG4gICAgICAgIHNpemU9e2Ake3NpemV9cHhgfVxuICAgICAgICBzdmdTaXplPVwibm9ybWFsXCJcbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIHJldHVybiAoXG4gICAgPGltZ1xuICAgICAgYWx0PXtuYW1lfVxuICAgICAgY2xhc3NOYW1lPVwiQmFkZ2VJbWFnZVwiXG4gICAgICBzcmM9e2ltYWdlUGF0aH1cbiAgICAgIHN0eWxlPXt7XG4gICAgICAgIHdpZHRoOiBzaXplLFxuICAgICAgICBoZWlnaHQ6IHNpemUsXG4gICAgICB9fVxuICAgIC8+XG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBR2xCLHFCQUF3QjtBQUN4Qix3Q0FBMkM7QUFDM0MsNkJBQWdDO0FBRXpCLG9CQUFvQjtBQUFBLEVBQ3pCO0FBQUEsRUFDQTtBQUFBLEdBSWU7QUFDZixRQUFNLEVBQUUsU0FBUztBQUVqQixRQUFNLFlBQVksa0VBQ2hCLE9BQ0EsTUFDQSx1Q0FBZ0IsV0FDbEI7QUFFQSxNQUFJLENBQUMsV0FBVztBQUNkLFdBQ0UsbURBQUM7QUFBQSxNQUNDLFdBQVc7QUFBQSxNQUNYLGlCQUFnQjtBQUFBLE1BQ2hCLE1BQU0sR0FBRztBQUFBLE1BQ1QsU0FBUTtBQUFBLEtBQ1Y7QUFBQSxFQUVKO0FBRUEsU0FDRSxtREFBQztBQUFBLElBQ0MsS0FBSztBQUFBLElBQ0wsV0FBVTtBQUFBLElBQ1YsS0FBSztBQUFBLElBQ0wsT0FBTztBQUFBLE1BQ0wsT0FBTztBQUFBLE1BQ1AsUUFBUTtBQUFBLElBQ1Y7QUFBQSxHQUNGO0FBRUo7QUFyQ2dCIiwKICAibmFtZXMiOiBbXQp9Cg==
