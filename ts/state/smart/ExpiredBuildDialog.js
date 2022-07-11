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
var ExpiredBuildDialog_exports = {};
__export(ExpiredBuildDialog_exports, {
  SmartExpiredBuildDialog: () => SmartExpiredBuildDialog
});
module.exports = __toCommonJS(ExpiredBuildDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_DialogExpiredBuild = require("../../components/DialogExpiredBuild");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state, ownProps) => {
  return {
    hasExpired: state.expiration.hasExpired,
    i18n: (0, import_user.getIntl)(state),
    ...ownProps
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartExpiredBuildDialog = smart(import_DialogExpiredBuild.DialogExpiredBuild);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartExpiredBuildDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiRXhwaXJlZEJ1aWxkRGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IERpYWxvZ0V4cGlyZWRCdWlsZCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGlhbG9nRXhwaXJlZEJ1aWxkJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHR5cGUgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL191dGlsJztcblxudHlwZSBQcm9wc1R5cGUgPSBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgb3duUHJvcHM6IFByb3BzVHlwZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGhhc0V4cGlyZWQ6IHN0YXRlLmV4cGlyYXRpb24uaGFzRXhwaXJlZCxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICAuLi5vd25Qcm9wcyxcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydEV4cGlyZWRCdWlsZERpYWxvZyA9IHNtYXJ0KERpYWxvZ0V4cGlyZWRCdWlsZCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyxnQ0FBbUM7QUFFbkMsa0JBQXdCO0FBS3hCLE1BQU0sa0JBQWtCLHdCQUFDLE9BQWtCLGFBQXdCO0FBQ2pFLFNBQU87QUFBQSxJQUNMLFlBQVksTUFBTSxXQUFXO0FBQUEsSUFDN0IsTUFBTSx5QkFBUSxLQUFLO0FBQUEsT0FDaEI7QUFBQSxFQUNMO0FBQ0YsR0FOd0I7QUFReEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSwwQkFBMEIsTUFBTSw0Q0FBa0I7IiwKICAibmFtZXMiOiBbXQp9Cg==
