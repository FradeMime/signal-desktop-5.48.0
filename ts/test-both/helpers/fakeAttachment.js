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
var fakeAttachment_exports = {};
__export(fakeAttachment_exports, {
  fakeAttachment: () => fakeAttachment,
  fakeDraftAttachment: () => fakeDraftAttachment,
  fakeThumbnail: () => fakeThumbnail
});
module.exports = __toCommonJS(fakeAttachment_exports);
var import_MIME = require("../../types/MIME");
const fakeAttachment = /* @__PURE__ */ __name((overrides = {}) => ({
  contentType: import_MIME.IMAGE_JPEG,
  width: 800,
  height: 600,
  size: 10304,
  ...overrides
}), "fakeAttachment");
const fakeThumbnail = /* @__PURE__ */ __name((url) => ({
  contentType: import_MIME.IMAGE_JPEG,
  height: 100,
  path: url,
  url,
  width: 100
}), "fakeThumbnail");
const fakeDraftAttachment = /* @__PURE__ */ __name((overrides = {}) => ({
  pending: false,
  contentType: import_MIME.IMAGE_JPEG,
  path: "file.jpg",
  size: 10304,
  ...overrides
}), "fakeDraftAttachment");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  fakeAttachment,
  fakeDraftAttachment,
  fakeThumbnail
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZmFrZUF0dGFjaG1lbnQudHMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7XG4gIEF0dGFjaG1lbnRUeXBlLFxuICBBdHRhY2htZW50RHJhZnRUeXBlLFxuICBUaHVtYm5haWxUeXBlLFxufSBmcm9tICcuLi8uLi90eXBlcy9BdHRhY2htZW50JztcbmltcG9ydCB7IElNQUdFX0pQRUcgfSBmcm9tICcuLi8uLi90eXBlcy9NSU1FJztcblxuZXhwb3J0IGNvbnN0IGZha2VBdHRhY2htZW50ID0gKFxuICBvdmVycmlkZXM6IFBhcnRpYWw8QXR0YWNobWVudFR5cGU+ID0ge31cbik6IEF0dGFjaG1lbnRUeXBlID0+ICh7XG4gIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICB3aWR0aDogODAwLFxuICBoZWlnaHQ6IDYwMCxcbiAgc2l6ZTogMTAzMDQsXG4gIC4uLm92ZXJyaWRlcyxcbn0pO1xuXG5leHBvcnQgY29uc3QgZmFrZVRodW1ibmFpbCA9ICh1cmw6IHN0cmluZyk6IFRodW1ibmFpbFR5cGUgPT4gKHtcbiAgY29udGVudFR5cGU6IElNQUdFX0pQRUcsXG4gIGhlaWdodDogMTAwLFxuICBwYXRoOiB1cmwsXG4gIHVybCxcbiAgd2lkdGg6IDEwMCxcbn0pO1xuXG5leHBvcnQgY29uc3QgZmFrZURyYWZ0QXR0YWNobWVudCA9IChcbiAgb3ZlcnJpZGVzOiBQYXJ0aWFsPEF0dGFjaG1lbnREcmFmdFR5cGU+ID0ge31cbik6IEF0dGFjaG1lbnREcmFmdFR5cGUgPT4gKHtcbiAgcGVuZGluZzogZmFsc2UsXG4gIGNvbnRlbnRUeXBlOiBJTUFHRV9KUEVHLFxuICBwYXRoOiAnZmlsZS5qcGcnLFxuICBzaXplOiAxMDMwNCxcbiAgLi4ub3ZlcnJpZGVzLFxufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVFBLGtCQUEyQjtBQUVwQixNQUFNLGlCQUFpQix3QkFDNUIsWUFBcUMsQ0FBQyxNQUNsQjtBQUFBLEVBQ3BCLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFFBQVE7QUFBQSxFQUNSLE1BQU07QUFBQSxLQUNIO0FBQ0wsSUFSOEI7QUFVdkIsTUFBTSxnQkFBZ0Isd0JBQUMsUUFBZ0M7QUFBQSxFQUM1RCxhQUFhO0FBQUEsRUFDYixRQUFRO0FBQUEsRUFDUixNQUFNO0FBQUEsRUFDTjtBQUFBLEVBQ0EsT0FBTztBQUNULElBTjZCO0FBUXRCLE1BQU0sc0JBQXNCLHdCQUNqQyxZQUEwQyxDQUFDLE1BQ2xCO0FBQUEsRUFDekIsU0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEtBQ0g7QUFDTCxJQVJtQzsiLAogICJuYW1lcyI6IFtdCn0K
