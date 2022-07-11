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
var NetworkStatus_exports = {};
__export(NetworkStatus_exports, {
  SmartNetworkStatus: () => SmartNetworkStatus
});
module.exports = __toCommonJS(NetworkStatus_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_DialogNetworkStatus = require("../../components/DialogNetworkStatus");
var import_user = require("../selectors/user");
var import_network = require("../selectors/network");
const mapStateToProps = /* @__PURE__ */ __name((state, ownProps) => {
  return {
    ...state.network,
    hasNetworkDialog: (0, import_network.hasNetworkDialog)(state),
    i18n: (0, import_user.getIntl)(state),
    ...ownProps
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartNetworkStatus = smart(import_DialogNetworkStatus.DialogNetworkStatus);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartNetworkStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTmV0d29ya1N0YXR1cy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjEgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgeyBEaWFsb2dOZXR3b3JrU3RhdHVzIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9EaWFsb2dOZXR3b3JrU3RhdHVzJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRJbnRsIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgaGFzTmV0d29ya0RpYWxvZyB9IGZyb20gJy4uL3NlbGVjdG9ycy9uZXR3b3JrJztcbmltcG9ydCB0eXBlIHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9fdXRpbCc7XG5cbnR5cGUgUHJvcHNUeXBlID0gUmVhZG9ubHk8eyBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludCB9PjtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUsIG93blByb3BzOiBQcm9wc1R5cGUpID0+IHtcbiAgcmV0dXJuIHtcbiAgICAuLi5zdGF0ZS5uZXR3b3JrLFxuICAgIGhhc05ldHdvcmtEaWFsb2c6IGhhc05ldHdvcmtEaWFsb2coc3RhdGUpLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIC4uLm93blByb3BzLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0TmV0d29ya1N0YXR1cyA9IHNtYXJ0KERpYWxvZ05ldHdvcmtTdGF0dXMpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUdBLHlCQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMsaUNBQW9DO0FBRXBDLGtCQUF3QjtBQUN4QixxQkFBaUM7QUFLakMsTUFBTSxrQkFBa0Isd0JBQUMsT0FBa0IsYUFBd0I7QUFDakUsU0FBTztBQUFBLE9BQ0YsTUFBTTtBQUFBLElBQ1Qsa0JBQWtCLHFDQUFpQixLQUFLO0FBQUEsSUFDeEMsTUFBTSx5QkFBUSxLQUFLO0FBQUEsT0FDaEI7QUFBQSxFQUNMO0FBQ0YsR0FQd0I7QUFTeEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFFbEQsTUFBTSxxQkFBcUIsTUFBTSw4Q0FBbUI7IiwKICAibmFtZXMiOiBbXQp9Cg==
