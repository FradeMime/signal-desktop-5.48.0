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
var StickerManager_exports = {};
__export(StickerManager_exports, {
  SmartStickerManager: () => SmartStickerManager
});
module.exports = __toCommonJS(StickerManager_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_StickerManager = require("../../components/stickers/StickerManager");
var import_user = require("../selectors/user");
var import_stickers = require("../selectors/stickers");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  const blessedPacks = (0, import_stickers.getBlessedStickerPacks)(state);
  const receivedPacks = (0, import_stickers.getReceivedStickerPacks)(state);
  const installedPacks = (0, import_stickers.getInstalledStickerPacks)(state);
  const knownPacks = (0, import_stickers.getKnownStickerPacks)(state);
  return {
    blessedPacks,
    receivedPacks,
    installedPacks,
    knownPacks,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartStickerManager = smart(import_StickerManager.StickerManager);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartStickerManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlck1hbmFnZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIwIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgU3RpY2tlck1hbmFnZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3N0aWNrZXJzL1N0aWNrZXJNYW5hZ2VyJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQge1xuICBnZXRCbGVzc2VkU3RpY2tlclBhY2tzLFxuICBnZXRJbnN0YWxsZWRTdGlja2VyUGFja3MsXG4gIGdldEtub3duU3RpY2tlclBhY2tzLFxuICBnZXRSZWNlaXZlZFN0aWNrZXJQYWNrcyxcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL3N0aWNrZXJzJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUpID0+IHtcbiAgY29uc3QgYmxlc3NlZFBhY2tzID0gZ2V0Qmxlc3NlZFN0aWNrZXJQYWNrcyhzdGF0ZSk7XG4gIGNvbnN0IHJlY2VpdmVkUGFja3MgPSBnZXRSZWNlaXZlZFN0aWNrZXJQYWNrcyhzdGF0ZSk7XG4gIGNvbnN0IGluc3RhbGxlZFBhY2tzID0gZ2V0SW5zdGFsbGVkU3RpY2tlclBhY2tzKHN0YXRlKTtcbiAgY29uc3Qga25vd25QYWNrcyA9IGdldEtub3duU3RpY2tlclBhY2tzKHN0YXRlKTtcblxuICByZXR1cm4ge1xuICAgIGJsZXNzZWRQYWNrcyxcbiAgICByZWNlaXZlZFBhY2tzLFxuICAgIGluc3RhbGxlZFBhY2tzLFxuICAgIGtub3duUGFja3MsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRTdGlja2VyTWFuYWdlciA9IHNtYXJ0KFN0aWNrZXJNYW5hZ2VyKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBQ25DLDRCQUErQjtBQUcvQixrQkFBd0I7QUFDeEIsc0JBS087QUFFUCxNQUFNLGtCQUFrQix3QkFBQyxVQUFxQjtBQUM1QyxRQUFNLGVBQWUsNENBQXVCLEtBQUs7QUFDakQsUUFBTSxnQkFBZ0IsNkNBQXdCLEtBQUs7QUFDbkQsUUFBTSxpQkFBaUIsOENBQXlCLEtBQUs7QUFDckQsUUFBTSxhQUFhLDBDQUFxQixLQUFLO0FBRTdDLFNBQU87QUFBQSxJQUNMO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNLHlCQUFRLEtBQUs7QUFBQSxFQUNyQjtBQUNGLEdBYndCO0FBZXhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sc0JBQXNCLE1BQU0sb0NBQWM7IiwKICAibmFtZXMiOiBbXQp9Cg==
