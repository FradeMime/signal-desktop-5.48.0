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
var preferredReactions_exports = {};
__export(preferredReactions_exports, {
  getCustomizeModalState: () => getCustomizeModalState,
  getIsCustomizingPreferredReactions: () => getIsCustomizingPreferredReactions
});
module.exports = __toCommonJS(preferredReactions_exports);
var import_reselect = require("reselect");
const getPreferredReactionsState = /* @__PURE__ */ __name((state) => state.preferredReactions, "getPreferredReactionsState");
const getCustomizeModalState = (0, import_reselect.createSelector)(getPreferredReactionsState, (state) => state.customizePreferredReactionsModal);
const getIsCustomizingPreferredReactions = (0, import_reselect.createSelector)(getCustomizeModalState, (customizeModal) => Boolean(customizeModal));
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  getCustomizeModalState,
  getIsCustomizingPreferredReactions
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsicHJlZmVycmVkUmVhY3Rpb25zLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNyZWF0ZVNlbGVjdG9yIH0gZnJvbSAncmVzZWxlY3QnO1xuXG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRSZWFjdGlvbnNTdGF0ZVR5cGUgfSBmcm9tICcuLi9kdWNrcy9wcmVmZXJyZWRSZWFjdGlvbnMnO1xuXG5jb25zdCBnZXRQcmVmZXJyZWRSZWFjdGlvbnNTdGF0ZSA9IChcbiAgc3RhdGU6IFJlYWRvbmx5PFN0YXRlVHlwZT5cbik6IFByZWZlcnJlZFJlYWN0aW9uc1N0YXRlVHlwZSA9PiBzdGF0ZS5wcmVmZXJyZWRSZWFjdGlvbnM7XG5cbmV4cG9ydCBjb25zdCBnZXRDdXN0b21pemVNb2RhbFN0YXRlID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldFByZWZlcnJlZFJlYWN0aW9uc1N0YXRlLFxuICAoc3RhdGU6IFJlYWRvbmx5PFByZWZlcnJlZFJlYWN0aW9uc1N0YXRlVHlwZT4pID0+XG4gICAgc3RhdGUuY3VzdG9taXplUHJlZmVycmVkUmVhY3Rpb25zTW9kYWxcbik7XG5cbmV4cG9ydCBjb25zdCBnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zID0gY3JlYXRlU2VsZWN0b3IoXG4gIGdldEN1c3RvbWl6ZU1vZGFsU3RhdGUsXG4gIChjdXN0b21pemVNb2RhbCk6IGJvb2xlYW4gPT4gQm9vbGVhbihjdXN0b21pemVNb2RhbClcbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBK0I7QUFLL0IsTUFBTSw2QkFBNkIsd0JBQ2pDLFVBQ2dDLE1BQU0sb0JBRkw7QUFJNUIsTUFBTSx5QkFBeUIsb0NBQ3BDLDRCQUNBLENBQUMsVUFDQyxNQUFNLGdDQUNWO0FBRU8sTUFBTSxxQ0FBcUMsb0NBQ2hELHdCQUNBLENBQUMsbUJBQTRCLFFBQVEsY0FBYyxDQUNyRDsiLAogICJuYW1lcyI6IFtdCn0K
