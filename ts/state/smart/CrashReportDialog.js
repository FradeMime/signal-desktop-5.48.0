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
var CrashReportDialog_exports = {};
__export(CrashReportDialog_exports, {
  SmartCrashReportDialog: () => SmartCrashReportDialog
});
module.exports = __toCommonJS(CrashReportDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_CrashReportDialog = require("../../components/CrashReportDialog");
var import_user = require("../selectors/user");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    ...state.crashReports,
    i18n: (0, import_user.getIntl)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartCrashReportDialog = smart(import_CrashReportDialog.CrashReportDialog);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCrashReportDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ3Jhc2hSZXBvcnREaWFsb2cudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IENyYXNoUmVwb3J0RGlhbG9nIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9DcmFzaFJlcG9ydERpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHsgZ2V0SW50bCB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZS5jcmFzaFJlcG9ydHMsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRDcmFzaFJlcG9ydERpYWxvZyA9IHNtYXJ0KENyYXNoUmVwb3J0RGlhbG9nKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBQ25DLCtCQUFrQztBQUVsQyxrQkFBd0I7QUFFeEIsTUFBTSxrQkFBa0Isd0JBQUMsVUFBcUI7QUFDNUMsU0FBTztBQUFBLE9BQ0YsTUFBTTtBQUFBLElBQ1QsTUFBTSx5QkFBUSxLQUFLO0FBQUEsRUFDckI7QUFDRixHQUx3QjtBQU94QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLHlCQUF5QixNQUFNLDBDQUFpQjsiLAogICJuYW1lcyI6IFtdCn0K
