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
var after_pack_exports = {};
__export(after_pack_exports, {
  afterPack: () => afterPack
});
module.exports = __toCommonJS(after_pack_exports);
var import_fuse_electron = require("./fuse-electron");
var import_copy_language_packs = require("./copy-language-packs");
var import_prune_macos_release = require("./prune-macos-release");
async function afterPack(context) {
  await (0, import_prune_macos_release.afterPack)(context);
  await (0, import_fuse_electron.afterPack)(context);
  await (0, import_copy_language_packs.afterPack)(context);
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  afterPack
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiYWZ0ZXItcGFjay50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQWZ0ZXJQYWNrQ29udGV4dCB9IGZyb20gJ2VsZWN0cm9uLWJ1aWxkZXInO1xuaW1wb3J0IHsgYWZ0ZXJQYWNrIGFzIGZ1c2VFbGVjdHJvbiB9IGZyb20gJy4vZnVzZS1lbGVjdHJvbic7XG5pbXBvcnQgeyBhZnRlclBhY2sgYXMgY29weVBhY2tzIH0gZnJvbSAnLi9jb3B5LWxhbmd1YWdlLXBhY2tzJztcbmltcG9ydCB7IGFmdGVyUGFjayBhcyBwcnVuZU1hY09TUmVsZWFzZSB9IGZyb20gJy4vcHJ1bmUtbWFjb3MtcmVsZWFzZSc7XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBhZnRlclBhY2soY29udGV4dDogQWZ0ZXJQYWNrQ29udGV4dCk6IFByb21pc2U8dm9pZD4ge1xuICBhd2FpdCBwcnVuZU1hY09TUmVsZWFzZShjb250ZXh0KTtcbiAgYXdhaXQgZnVzZUVsZWN0cm9uKGNvbnRleHQpO1xuICBhd2FpdCBjb3B5UGFja3MoY29udGV4dCk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBSUEsMkJBQTBDO0FBQzFDLGlDQUF1QztBQUN2QyxpQ0FBK0M7QUFFL0MseUJBQWdDLFNBQTBDO0FBQ3hFLFFBQU0sMENBQWtCLE9BQU87QUFDL0IsUUFBTSxvQ0FBYSxPQUFPO0FBQzFCLFFBQU0sMENBQVUsT0FBTztBQUN6QjtBQUpzQiIsCiAgIm5hbWVzIjogW10KfQo=
