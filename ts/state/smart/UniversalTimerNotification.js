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
var UniversalTimerNotification_exports = {};
__export(UniversalTimerNotification_exports, {
  SmartUniversalTimerNotification: () => SmartUniversalTimerNotification
});
module.exports = __toCommonJS(UniversalTimerNotification_exports);
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_UniversalTimerNotification = require("../../components/conversation/UniversalTimerNotification");
var import_user = require("../selectors/user");
var import_items = require("../selectors/items");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    ...state.updates,
    i18n: (0, import_user.getIntl)(state),
    expireTimer: (0, import_items.getUniversalExpireTimer)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartUniversalTimerNotification = smart(import_UniversalTimerNotification.UniversalTimerNotification);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartUniversalTimerNotification
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24udHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB7IFVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IGdldEludGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBnZXRVbml2ZXJzYWxFeHBpcmVUaW1lciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgLi4uc3RhdGUudXBkYXRlcyxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICBleHBpcmVUaW1lcjogZ2V0VW5pdmVyc2FsRXhwaXJlVGltZXIoc3RhdGUpLFxuICB9O1xufTtcblxuY29uc3Qgc21hcnQgPSBjb25uZWN0KG1hcFN0YXRlVG9Qcm9wcywgbWFwRGlzcGF0Y2hUb1Byb3BzKTtcblxuZXhwb3J0IGNvbnN0IFNtYXJ0VW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24gPSBzbWFydChcbiAgVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb25cbik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLHFCQUFtQztBQUNuQyx3Q0FBMkM7QUFFM0Msa0JBQXdCO0FBQ3hCLG1CQUF3QztBQUV4QyxNQUFNLGtCQUFrQix3QkFBQyxVQUFxQjtBQUM1QyxTQUFPO0FBQUEsT0FDRixNQUFNO0FBQUEsSUFDVCxNQUFNLHlCQUFRLEtBQUs7QUFBQSxJQUNuQixhQUFhLDBDQUF3QixLQUFLO0FBQUEsRUFDNUM7QUFDRixHQU53QjtBQVF4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLGtDQUFrQyxNQUM3Qyw0REFDRjsiLAogICJuYW1lcyI6IFtdCn0K
