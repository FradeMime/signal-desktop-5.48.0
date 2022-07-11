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
var badges_exports = {};
__export(badges_exports, {
  default: () => updateToSchemaVersion44
});
module.exports = __toCommonJS(badges_exports);
function updateToSchemaVersion44(currentVersion, db, logger) {
  if (currentVersion >= 44) {
    return;
  }
  db.transaction(() => {
    db.exec(`
      CREATE TABLE badges(
        id TEXT PRIMARY KEY,
        category TEXT NOT NULL,
        name TEXT NOT NULL,
        descriptionTemplate TEXT NOT NULL
      );

      CREATE TABLE badgeImageFiles(
        badgeId TEXT REFERENCES badges(id)
          ON DELETE CASCADE
          ON UPDATE CASCADE,
        'order' INTEGER NOT NULL,
        url TEXT NOT NULL,
        localPath TEXT,
        theme TEXT NOT NULL
      );
      `);
    db.pragma("user_version = 44");
  })();
  logger.info("updateToSchemaVersion44: success!");
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiNDQtYmFkZ2VzLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGF0YWJhc2UgfSBmcm9tICdiZXR0ZXItc3FsaXRlMyc7XG5cbmltcG9ydCB0eXBlIHsgTG9nZ2VyVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL0xvZ2dpbmcnO1xuXG5leHBvcnQgZGVmYXVsdCBmdW5jdGlvbiB1cGRhdGVUb1NjaGVtYVZlcnNpb240NChcbiAgY3VycmVudFZlcnNpb246IG51bWJlcixcbiAgZGI6IERhdGFiYXNlLFxuICBsb2dnZXI6IExvZ2dlclR5cGVcbik6IHZvaWQge1xuICBpZiAoY3VycmVudFZlcnNpb24gPj0gNDQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBkYi50cmFuc2FjdGlvbigoKSA9PiB7XG4gICAgZGIuZXhlYyhcbiAgICAgIGBcbiAgICAgIENSRUFURSBUQUJMRSBiYWRnZXMoXG4gICAgICAgIGlkIFRFWFQgUFJJTUFSWSBLRVksXG4gICAgICAgIGNhdGVnb3J5IFRFWFQgTk9UIE5VTEwsXG4gICAgICAgIG5hbWUgVEVYVCBOT1QgTlVMTCxcbiAgICAgICAgZGVzY3JpcHRpb25UZW1wbGF0ZSBURVhUIE5PVCBOVUxMXG4gICAgICApO1xuXG4gICAgICBDUkVBVEUgVEFCTEUgYmFkZ2VJbWFnZUZpbGVzKFxuICAgICAgICBiYWRnZUlkIFRFWFQgUkVGRVJFTkNFUyBiYWRnZXMoaWQpXG4gICAgICAgICAgT04gREVMRVRFIENBU0NBREVcbiAgICAgICAgICBPTiBVUERBVEUgQ0FTQ0FERSxcbiAgICAgICAgJ29yZGVyJyBJTlRFR0VSIE5PVCBOVUxMLFxuICAgICAgICB1cmwgVEVYVCBOT1QgTlVMTCxcbiAgICAgICAgbG9jYWxQYXRoIFRFWFQsXG4gICAgICAgIHRoZW1lIFRFWFQgTk9UIE5VTExcbiAgICAgICk7XG4gICAgICBgXG4gICAgKTtcblxuICAgIGRiLnByYWdtYSgndXNlcl92ZXJzaW9uID0gNDQnKTtcbiAgfSkoKTtcblxuICBsb2dnZXIuaW5mbygndXBkYXRlVG9TY2hlbWFWZXJzaW9uNDQ6IHN1Y2Nlc3MhJyk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBT2UsaUNBQ2IsZ0JBQ0EsSUFDQSxRQUNNO0FBQ04sTUFBSSxrQkFBa0IsSUFBSTtBQUN4QjtBQUFBLEVBQ0Y7QUFFQSxLQUFHLFlBQVksTUFBTTtBQUNuQixPQUFHLEtBQ0Q7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBLE9Ba0JGO0FBRUEsT0FBRyxPQUFPLG1CQUFtQjtBQUFBLEVBQy9CLENBQUMsRUFBRTtBQUVILFNBQU8sS0FBSyxtQ0FBbUM7QUFDakQ7QUFuQ3dCIiwKICAibmFtZXMiOiBbXQp9Cg==
