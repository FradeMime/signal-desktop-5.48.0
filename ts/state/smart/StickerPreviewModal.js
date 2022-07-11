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
var StickerPreviewModal_exports = {};
__export(StickerPreviewModal_exports, {
  SmartStickerPreviewModal: () => SmartStickerPreviewModal
});
module.exports = __toCommonJS(StickerPreviewModal_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_StickerPreviewModal = require("../../components/stickers/StickerPreviewModal");
var import_user = require("../selectors/user");
var import_stickers = require("../selectors/stickers");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const { packId } = props;
  const stickersPath = (0, import_user.getStickersPath)(state);
  const tempPath = (0, import_user.getTempPath)(state);
  const packs = (0, import_stickers.getPacks)(state);
  const blessedPacks = (0, import_stickers.getBlessedPacks)(state);
  const pack = packs[packId];
  return {
    ...props,
    pack: pack ? (0, import_stickers.translatePackFromDB)(pack, packs, blessedPacks, stickersPath, tempPath) : void 0,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartStickerPreviewModal = smart(import_StickerPreviewModal.StickerPreviewModal);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartStickerPreviewModal
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiU3RpY2tlclByZXZpZXdNb2RhbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDE5LTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBTdGlja2VyUHJldmlld01vZGFsIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9zdGlja2Vycy9TdGlja2VyUHJldmlld01vZGFsJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5cbmltcG9ydCB7IGdldEludGwsIGdldFN0aWNrZXJzUGF0aCwgZ2V0VGVtcFBhdGggfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQge1xuICBnZXRCbGVzc2VkUGFja3MsXG4gIGdldFBhY2tzLFxuICB0cmFuc2xhdGVQYWNrRnJvbURCLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvc3RpY2tlcnMnO1xuXG5leHBvcnQgdHlwZSBFeHRlcm5hbFByb3BzID0ge1xuICBwYWNrSWQ6IHN0cmluZztcbiAgcmVhZG9ubHkgb25DbG9zZTogKCkgPT4gdW5rbm93bjtcbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlLCBwcm9wczogRXh0ZXJuYWxQcm9wcykgPT4ge1xuICBjb25zdCB7IHBhY2tJZCB9ID0gcHJvcHM7XG4gIGNvbnN0IHN0aWNrZXJzUGF0aCA9IGdldFN0aWNrZXJzUGF0aChzdGF0ZSk7XG4gIGNvbnN0IHRlbXBQYXRoID0gZ2V0VGVtcFBhdGgoc3RhdGUpO1xuXG4gIGNvbnN0IHBhY2tzID0gZ2V0UGFja3Moc3RhdGUpO1xuICBjb25zdCBibGVzc2VkUGFja3MgPSBnZXRCbGVzc2VkUGFja3Moc3RhdGUpO1xuICBjb25zdCBwYWNrID0gcGFja3NbcGFja0lkXTtcblxuICByZXR1cm4ge1xuICAgIC4uLnByb3BzLFxuICAgIHBhY2s6IHBhY2tcbiAgICAgID8gdHJhbnNsYXRlUGFja0Zyb21EQihwYWNrLCBwYWNrcywgYmxlc3NlZFBhY2tzLCBzdGlja2Vyc1BhdGgsIHRlbXBQYXRoKVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRTdGlja2VyUHJldmlld01vZGFsID0gc21hcnQoU3RpY2tlclByZXZpZXdNb2RhbCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyxpQ0FBb0M7QUFHcEMsa0JBQXNEO0FBQ3RELHNCQUlPO0FBT1AsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsVUFBeUI7QUFDbEUsUUFBTSxFQUFFLFdBQVc7QUFDbkIsUUFBTSxlQUFlLGlDQUFnQixLQUFLO0FBQzFDLFFBQU0sV0FBVyw2QkFBWSxLQUFLO0FBRWxDLFFBQU0sUUFBUSw4QkFBUyxLQUFLO0FBQzVCLFFBQU0sZUFBZSxxQ0FBZ0IsS0FBSztBQUMxQyxRQUFNLE9BQU8sTUFBTTtBQUVuQixTQUFPO0FBQUEsT0FDRjtBQUFBLElBQ0gsTUFBTSxPQUNGLHlDQUFvQixNQUFNLE9BQU8sY0FBYyxjQUFjLFFBQVEsSUFDckU7QUFBQSxJQUNKLE1BQU0seUJBQVEsS0FBSztBQUFBLEVBQ3JCO0FBQ0YsR0FoQndCO0FBa0J4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLDJCQUEyQixNQUFNLDhDQUFtQjsiLAogICJuYW1lcyI6IFtdCn0K
