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
var isBadgeImageFileUrlValid_exports = {};
__export(isBadgeImageFileUrlValid_exports, {
  isBadgeImageFileUrlValid: () => isBadgeImageFileUrlValid
});
module.exports = __toCommonJS(isBadgeImageFileUrlValid_exports);
var import_url = require("../util/url");
function isBadgeImageFileUrlValid(url, updatesUrl) {
  const expectedPrefix = new URL("/static/badges", updatesUrl).href;
  return url.startsWith(expectedPrefix) && Boolean((0, import_url.maybeParseUrl)(url));
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  isBadgeImageFileUrlValid
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiaXNCYWRnZUltYWdlRmlsZVVybFZhbGlkLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG1heWJlUGFyc2VVcmwgfSBmcm9tICcuLi91dGlsL3VybCc7XG5cbmV4cG9ydCBmdW5jdGlvbiBpc0JhZGdlSW1hZ2VGaWxlVXJsVmFsaWQoXG4gIHVybDogc3RyaW5nLFxuICB1cGRhdGVzVXJsOiBzdHJpbmdcbik6IGJvb2xlYW4ge1xuICBjb25zdCBleHBlY3RlZFByZWZpeCA9IG5ldyBVUkwoJy9zdGF0aWMvYmFkZ2VzJywgdXBkYXRlc1VybCkuaHJlZjtcbiAgcmV0dXJuIHVybC5zdGFydHNXaXRoKGV4cGVjdGVkUHJlZml4KSAmJiBCb29sZWFuKG1heWJlUGFyc2VVcmwodXJsKSk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsaUJBQThCO0FBRXZCLGtDQUNMLEtBQ0EsWUFDUztBQUNULFFBQU0saUJBQWlCLElBQUksSUFBSSxrQkFBa0IsVUFBVSxFQUFFO0FBQzdELFNBQU8sSUFBSSxXQUFXLGNBQWMsS0FBSyxRQUFRLDhCQUFjLEdBQUcsQ0FBQztBQUNyRTtBQU5nQiIsCiAgIm5hbWVzIjogW10KfQo=
