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
var useStickerDropzone_exports = {};
__export(useStickerDropzone_exports, {
  useStickerDropzone: () => useStickerDropzone
});
module.exports = __toCommonJS(useStickerDropzone_exports);
var import_react_dropzone = require("react-dropzone");
const useStickerDropzone = /* @__PURE__ */ __name((onDrop) => (0, import_react_dropzone.useDropzone)({
  onDrop,
  accept: [
    "image/png",
    "image/webp",
    "image/apng",
    ".apng"
  ]
}), "useStickerDropzone");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  useStickerDropzone
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidXNlU3RpY2tlckRyb3B6b25lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRHJvcHpvbmVPcHRpb25zIH0gZnJvbSAncmVhY3QtZHJvcHpvbmUnO1xuaW1wb3J0IHsgdXNlRHJvcHpvbmUgfSBmcm9tICdyZWFjdC1kcm9wem9uZSc7XG5cbmV4cG9ydCBjb25zdCB1c2VTdGlja2VyRHJvcHpvbmUgPSAoXG4gIG9uRHJvcDogRHJvcHpvbmVPcHRpb25zWydvbkRyb3AnXVxuKTogUmV0dXJuVHlwZTx0eXBlb2YgdXNlRHJvcHpvbmU+ID0+XG4gIHVzZURyb3B6b25lKHtcbiAgICBvbkRyb3AsXG4gICAgYWNjZXB0OiBbXG4gICAgICAnaW1hZ2UvcG5nJyxcbiAgICAgICdpbWFnZS93ZWJwJyxcbiAgICAgIC8vIFNvbWUgT1NlcyByZWNvZ25pemUgLmFwbmcgZmlsZXMgd2l0aCB0aGUgTUlNRSB0eXBlIGJ1dCBvdGhlcnMgZG9uJ3QsIHNvIHdlIHN1cHBseVxuICAgICAgLy8gICB0aGUgZXh0ZW5zaW9uIHRvby5cbiAgICAgICdpbWFnZS9hcG5nJyxcbiAgICAgICcuYXBuZycsXG4gICAgXSxcbiAgfSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsNEJBQTRCO0FBRXJCLE1BQU0scUJBQXFCLHdCQUNoQyxXQUVBLHVDQUFZO0FBQUEsRUFDVjtBQUFBLEVBQ0EsUUFBUTtBQUFBLElBQ047QUFBQSxJQUNBO0FBQUEsSUFHQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQ0YsQ0FBQyxHQWIrQjsiLAogICJuYW1lcyI6IFtdCn0K
