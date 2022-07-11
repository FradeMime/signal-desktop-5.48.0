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
var BadgeImageTheme_exports = {};
__export(BadgeImageTheme_exports, {
  BadgeImageTheme: () => BadgeImageTheme,
  parseBadgeImageTheme: () => parseBadgeImageTheme
});
module.exports = __toCommonJS(BadgeImageTheme_exports);
var import_enum = require("../util/enum");
var BadgeImageTheme = /* @__PURE__ */ ((BadgeImageTheme2) => {
  BadgeImageTheme2["Light"] = "light";
  BadgeImageTheme2["Dark"] = "dark";
  BadgeImageTheme2["Transparent"] = "transparent";
  return BadgeImageTheme2;
})(BadgeImageTheme || {});
const parseBadgeImageTheme = (0, import_enum.makeEnumParser)(BadgeImageTheme, "transparent" /* Transparent */);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  BadgeImageTheme,
  parseBadgeImageTheme
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQmFkZ2VJbWFnZVRoZW1lLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG1ha2VFbnVtUGFyc2VyIH0gZnJvbSAnLi4vdXRpbC9lbnVtJztcblxuZXhwb3J0IGVudW0gQmFkZ2VJbWFnZVRoZW1lIHtcbiAgTGlnaHQgPSAnbGlnaHQnLFxuICBEYXJrID0gJ2RhcmsnLFxuICBUcmFuc3BhcmVudCA9ICd0cmFuc3BhcmVudCcsXG59XG5cbmV4cG9ydCBjb25zdCBwYXJzZUJhZGdlSW1hZ2VUaGVtZSA9IG1ha2VFbnVtUGFyc2VyKFxuICBCYWRnZUltYWdlVGhlbWUsXG4gIEJhZGdlSW1hZ2VUaGVtZS5UcmFuc3BhcmVudFxuKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esa0JBQStCO0FBRXhCLElBQUssa0JBQUwsa0JBQUsscUJBQUw7QUFDTCw4QkFBUTtBQUNSLDZCQUFPO0FBQ1Asb0NBQWM7QUFISjtBQUFBO0FBTUwsTUFBTSx1QkFBdUIsZ0NBQ2xDLGlCQUNBLCtCQUNGOyIsCiAgIm5hbWVzIjogW10KfQo=
