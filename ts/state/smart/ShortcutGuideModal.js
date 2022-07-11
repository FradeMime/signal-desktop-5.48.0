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
var ShortcutGuideModal_exports = {};
__export(ShortcutGuideModal_exports, {
  SmartShortcutGuideModal: () => SmartShortcutGuideModal
});
module.exports = __toCommonJS(ShortcutGuideModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_ShortcutGuideModal = require("../../components/ShortcutGuideModal");
var import_lib = require("../../components/stickers/lib");
var import_user = require("../selectors/user");
var import_stickers = require("../selectors/stickers");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { close } = props;
  const blessedPacks = (0, import_stickers.getBlessedStickerPacks)(state);
  const installedPacks = (0, import_stickers.getInstalledStickerPacks)(state);
  const knownPacks = (0, import_stickers.getKnownStickerPacks)(state);
  const receivedPacks = (0, import_stickers.getReceivedStickerPacks)(state);
  const hasInstalledStickers = (0, import_lib.countStickers)({
    knownPacks,
    blessedPacks,
    installedPacks,
    receivedPacks
  }) > 0;
  const platform = (0, import_user.getPlatform)(state);
  return {
    close,
    hasInstalledStickers,
    platform,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartShortcutGuideModal = smart(import_ShortcutGuideModal.ShortcutGuideModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartShortcutGuideModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU2hvcnRjdXRHdWlkZU1vZGFsLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFNob3J0Y3V0R3VpZGVNb2RhbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvU2hvcnRjdXRHdWlkZU1vZGFsJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbmltcG9ydCB7IGNvdW50U3RpY2tlcnMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL3N0aWNrZXJzL2xpYic7XG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRQbGF0Zm9ybSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7XG4gIGdldEJsZXNzZWRTdGlja2VyUGFja3MsXG4gIGdldEluc3RhbGxlZFN0aWNrZXJQYWNrcyxcbiAgZ2V0S25vd25TdGlja2VyUGFja3MsXG4gIGdldFJlY2VpdmVkU3RpY2tlclBhY2tzLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvc3RpY2tlcnMnO1xuXG5leHBvcnQgdHlwZSBFeHRlcm5hbFByb3BzID0ge1xuICBjbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlLCBwcm9wczogRXh0ZXJuYWxQcm9wcykgPT4ge1xuICBjb25zdCB7IGNsb3NlIH0gPSBwcm9wcztcblxuICBjb25zdCBibGVzc2VkUGFja3MgPSBnZXRCbGVzc2VkU3RpY2tlclBhY2tzKHN0YXRlKTtcbiAgY29uc3QgaW5zdGFsbGVkUGFja3MgPSBnZXRJbnN0YWxsZWRTdGlja2VyUGFja3Moc3RhdGUpO1xuICBjb25zdCBrbm93blBhY2tzID0gZ2V0S25vd25TdGlja2VyUGFja3Moc3RhdGUpO1xuICBjb25zdCByZWNlaXZlZFBhY2tzID0gZ2V0UmVjZWl2ZWRTdGlja2VyUGFja3Moc3RhdGUpO1xuXG4gIGNvbnN0IGhhc0luc3RhbGxlZFN0aWNrZXJzID1cbiAgICBjb3VudFN0aWNrZXJzKHtcbiAgICAgIGtub3duUGFja3MsXG4gICAgICBibGVzc2VkUGFja3MsXG4gICAgICBpbnN0YWxsZWRQYWNrcyxcbiAgICAgIHJlY2VpdmVkUGFja3MsXG4gICAgfSkgPiAwO1xuXG4gIGNvbnN0IHBsYXRmb3JtID0gZ2V0UGxhdGZvcm0oc3RhdGUpO1xuXG4gIHJldHVybiB7XG4gICAgY2xvc2UsXG4gICAgaGFzSW5zdGFsbGVkU3RpY2tlcnMsXG4gICAgcGxhdGZvcm0sXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRTaG9ydGN1dEd1aWRlTW9kYWwgPSBzbWFydChTaG9ydGN1dEd1aWRlTW9kYWwpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsZ0NBQW1DO0FBR25DLGlCQUE4QjtBQUM5QixrQkFBcUM7QUFDckMsc0JBS087QUFNUCxNQUFNLGtCQUFrQix3QkFBQyxPQUFrQixVQUF5QjtBQUNsRSxRQUFNLEVBQUUsVUFBVTtBQUVsQixRQUFNLGVBQWUsNENBQXVCLEtBQUs7QUFDakQsUUFBTSxpQkFBaUIsOENBQXlCLEtBQUs7QUFDckQsUUFBTSxhQUFhLDBDQUFxQixLQUFLO0FBQzdDLFFBQU0sZ0JBQWdCLDZDQUF3QixLQUFLO0FBRW5ELFFBQU0sdUJBQ0osOEJBQWM7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRixDQUFDLElBQUk7QUFFUCxRQUFNLFdBQVcsNkJBQVksS0FBSztBQUVsQyxTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxNQUFNLHlCQUFRLEtBQUs7QUFBQSxFQUNyQjtBQUNGLEdBeEJ3QjtBQTBCeEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSwwQkFBMEIsTUFBTSw0Q0FBa0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
