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
var UpdateDialog_exports = {};
__export(UpdateDialog_exports, {
  SmartUpdateDialog: () => SmartUpdateDialog
});
module.exports = __toCommonJS(UpdateDialog_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_DialogUpdate = require("../../components/DialogUpdate");
var import_user = require("../selectors/user");
var import_network = require("../selectors/network");
const mapStateToProps = /* @__PURE__ */ __name((state, ownProps) => {
  return {
    ...state.updates,
    hasNetworkDialog: (0, import_network.hasNetworkDialog)(state),
    i18n: (0, import_user.getIntl)(state),
    currentVersion: window.getVersion(),
    ...ownProps
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartUpdateDialog = smart(import_DialogUpdate.DialogUpdate);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartUpdateDialog
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVXBkYXRlRGlhbG9nLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IERpYWxvZ1VwZGF0ZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvRGlhbG9nVXBkYXRlJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgaGFzTmV0d29ya0RpYWxvZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9uZXR3b3JrJztcbmltcG9ydCB0eXBlIHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9fdXRpbCc7XG5cbnR5cGUgUHJvcHNUeXBlID0gUmVhZG9ubHk8eyBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludCB9PjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUsIG93blByb3BzOiBQcm9wc1R5cGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZS51cGRhdGVzLFxuICAgIGhhc05ldHdvcmtEaWFsb2c6IGhhc05ldHdvcmtEaWFsb2coc3RhdGUpLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIGN1cnJlbnRWZXJzaW9uOiB3aW5kb3cuZ2V0VmVyc2lvbigpLFxuICAgIC4uLm93blByb3BzLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0VXBkYXRlRGlhbG9nID0gc21hcnQoRGlhbG9nVXBkYXRlKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSx5QkFBd0I7QUFDeEIscUJBQW1DO0FBQ25DLDBCQUE2QjtBQUU3QixrQkFBd0I7QUFDeEIscUJBQWlDO0FBS2pDLE1BQU0sa0JBQWtCLHdCQUFDLE9BQWtCLGFBQXdCO0FBQ2pFLFNBQU87QUFBQSxPQUNGLE1BQU07QUFBQSxJQUNULGtCQUFrQixxQ0FBaUIsS0FBSztBQUFBLElBQ3hDLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLGdCQUFnQixPQUFPLFdBQVc7QUFBQSxPQUMvQjtBQUFBLEVBQ0w7QUFDRixHQVJ3QjtBQVV4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLG9CQUFvQixNQUFNLGdDQUFZOyIsCiAgIm5hbWVzIjogW10KfQo=
