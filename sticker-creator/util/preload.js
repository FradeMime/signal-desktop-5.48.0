var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var preload_exports = {};
__export(preload_exports, {
  encryptAndUpload: () => encryptAndUpload,
  processStickerImage: () => processStickerImage
});
module.exports = __toCommonJS(preload_exports);
const { encryptAndUpload, processStickerImage } = window;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  encryptAndUpload,
  processStickerImage
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlbG9hZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgTWV0YWRhdGEgfSBmcm9tICdzaGFycCc7XG5cbmRlY2xhcmUgZ2xvYmFsIHtcbiAgLy8gV2Ugd2FudCB0byBleHRlbmQgYHdpbmRvd2AncyBwcm9wZXJ0aWVzLCBzbyB3ZSBuZWVkIGFuIGludGVyZmFjZS5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXJlc3RyaWN0ZWQtc3ludGF4XG4gIGludGVyZmFjZSBXaW5kb3cge1xuICAgIHByb2Nlc3NTdGlja2VySW1hZ2U6IFByb2Nlc3NTdGlja2VySW1hZ2VGbjtcbiAgICBlbmNyeXB0QW5kVXBsb2FkOiBFbmNyeXB0QW5kVXBsb2FkRm47XG4gIH1cbn1cblxuZXhwb3J0IHR5cGUgU3RpY2tlckltYWdlRGF0YSA9IHtcbiAgYnVmZmVyOiBCdWZmZXI7XG4gIHNyYzogc3RyaW5nO1xuICBwYXRoOiBzdHJpbmc7XG4gIG1ldGE6IE1ldGFkYXRhO1xufTtcblxudHlwZSBQcm9jZXNzU3RpY2tlckltYWdlRm4gPSAoXG4gIHBhdGg6IHN0cmluZyB8IHVuZGVmaW5lZFxuKSA9PiBQcm9taXNlPFN0aWNrZXJJbWFnZURhdGE+O1xuXG5leHBvcnQgdHlwZSBTdGlja2VyRGF0YSA9IHsgaW1hZ2VEYXRhPzogU3RpY2tlckltYWdlRGF0YTsgZW1vamk/OiBzdHJpbmcgfTtcbmV4cG9ydCB0eXBlIFBhY2tNZXRhRGF0YSA9IHsgcGFja0lkOiBzdHJpbmc7IGtleTogc3RyaW5nIH07XG5cbmV4cG9ydCB0eXBlIEVuY3J5cHRBbmRVcGxvYWRGbiA9IChcbiAgbWFuaWZlc3Q6IHsgdGl0bGU6IHN0cmluZzsgYXV0aG9yOiBzdHJpbmcgfSxcbiAgc3RpY2tlcnM6IEFycmF5PFN0aWNrZXJEYXRhPixcbiAgY292ZXI6IFN0aWNrZXJJbWFnZURhdGEgfCB1bmRlZmluZWQsXG4gIG9uUHJvZ3Jlc3M/OiAoKSA9PiB1bmtub3duXG4pID0+IFByb21pc2U8UGFja01ldGFEYXRhPjtcblxuZXhwb3J0IGNvbnN0IHsgZW5jcnlwdEFuZFVwbG9hZCwgcHJvY2Vzc1N0aWNrZXJJbWFnZSB9ID0gd2luZG93O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFtQ08sTUFBTSxFQUFFLGtCQUFrQix3QkFBd0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
