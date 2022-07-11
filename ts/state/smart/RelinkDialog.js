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
var RelinkDialog_exports = {};
__export(RelinkDialog_exports, {
  SmartRelinkDialog: () => SmartRelinkDialog
});
module.exports = __toCommonJS(RelinkDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_DialogRelink = require("../../components/DialogRelink");
var import_user = require("../selectors/user");
var import_registration = require("../../util/registration");
const mapStateToProps = /* @__PURE__ */ __name((state, ownProps) => {
  return {
    i18n: (0, import_user.getIntl)(state),
    isRegistrationDone: (0, import_registration.isDone)(),
    ...ownProps
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartRelinkDialog = smart(import_DialogRelink.DialogRelink);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartRelinkDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiUmVsaW5rRGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IERpYWxvZ1JlbGluayB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGlhbG9nUmVsaW5rJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgaXNEb25lIH0gZnJvbSAnLi4vLi4vdXRpbC9yZWdpc3RyYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL191dGlsJztcblxudHlwZSBQcm9wc1R5cGUgPSBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgb3duUHJvcHM6IFByb3BzVHlwZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIGlzUmVnaXN0cmF0aW9uRG9uZTogaXNEb25lKCksXG4gICAgLi4ub3duUHJvcHMsXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRSZWxpbmtEaWFsb2cgPSBzbWFydChEaWFsb2dSZWxpbmspO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsMEJBQTZCO0FBRTdCLGtCQUF3QjtBQUN4QiwwQkFBdUI7QUFLdkIsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsYUFBd0I7QUFDakUsU0FBTztBQUFBLElBQ0wsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkIsb0JBQW9CLGdDQUFPO0FBQUEsT0FDeEI7QUFBQSxFQUNMO0FBQ0YsR0FOd0I7QUFReEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSxvQkFBb0IsTUFBTSxnQ0FBWTsiLAogICJuYW1lcyI6IFtdCn0K
