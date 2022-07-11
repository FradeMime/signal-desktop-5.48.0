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
var safetyNumber_exports = {};
__export(safetyNumber_exports, {
  getContactSafetyNumber: () => getContactSafetyNumber
});
module.exports = __toCommonJS(safetyNumber_exports);
var import_reselect = require("reselect");
const getSafetyNumber = /* @__PURE__ */ __name((state) => state.safetyNumber, "getSafetyNumber");
const getContactID = /* @__PURE__ */ __name((_, props) => props.contactID, "getContactID");
const getContactSafetyNumber = (0, import_reselect.createSelector)([getSafetyNumber, getContactID], ({ contacts }, contactID) => contacts[contactID]);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getContactSafetyNumber
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsic2FmZXR5TnVtYmVyLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMCBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUge1xuICBTYWZldHlOdW1iZXJDb250YWN0VHlwZSxcbiAgU2FmZXR5TnVtYmVyU3RhdGVUeXBlLFxufSBmcm9tICcuLi9kdWNrcy9zYWZldHlOdW1iZXInO1xuXG5jb25zdCBnZXRTYWZldHlOdW1iZXIgPSAoc3RhdGU6IFN0YXRlVHlwZSk6IFNhZmV0eU51bWJlclN0YXRlVHlwZSA9PlxuICBzdGF0ZS5zYWZldHlOdW1iZXI7XG5cbnR5cGUgUHJvcHMgPSB7XG4gIGNvbnRhY3RJRDogc3RyaW5nO1xufTtcblxuY29uc3QgZ2V0Q29udGFjdElEID0gKF86IFN0YXRlVHlwZSwgcHJvcHM6IFByb3BzKTogc3RyaW5nID0+IHByb3BzLmNvbnRhY3RJRDtcblxuZXhwb3J0IGNvbnN0IGdldENvbnRhY3RTYWZldHlOdW1iZXIgPSBjcmVhdGVTZWxlY3RvcihcbiAgW2dldFNhZmV0eU51bWJlciwgZ2V0Q29udGFjdElEXSxcbiAgKFxuICAgIHsgY29udGFjdHMgfTogU2FmZXR5TnVtYmVyU3RhdGVUeXBlLFxuICAgIGNvbnRhY3RJRDogc3RyaW5nXG4gICk6IFNhZmV0eU51bWJlckNvbnRhY3RUeXBlID0+IGNvbnRhY3RzW2NvbnRhY3RJRF1cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0Esc0JBQStCO0FBUS9CLE1BQU0sa0JBQWtCLHdCQUFDLFVBQ3ZCLE1BQU0sY0FEZ0I7QUFPeEIsTUFBTSxlQUFlLHdCQUFDLEdBQWMsVUFBeUIsTUFBTSxXQUE5QztBQUVkLE1BQU0seUJBQXlCLG9DQUNwQyxDQUFDLGlCQUFpQixZQUFZLEdBQzlCLENBQ0UsRUFBRSxZQUNGLGNBQzRCLFNBQVMsVUFDekM7IiwKICAibmFtZXMiOiBbXQp9Cg==
