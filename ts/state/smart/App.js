var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
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
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var App_exports = {};
__export(App_exports, {
  SmartApp: () => SmartApp
});
module.exports = __toCommonJS(App_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_App = require("../../components/App");
var import_CallManager = require("./CallManager");
var import_CustomizingPreferredReactionsModal = require("./CustomizingPreferredReactionsModal");
var import_GlobalModalContainer = require("./GlobalModalContainer");
var import_LeftPane = require("./LeftPane");
var import_SafetyNumberViewer = require("./SafetyNumberViewer");
var import_Stories = require("./Stories");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
var import_stories = require("../selectors/stories");
var import_items = require("../selectors/items");
var import_conversations = require("../selectors/conversations");
var import_preferredReactions = require("../selectors/preferredReactions");
var import_actions = require("../actions");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    ...state.app,
    conversationsStoppingSend: (0, import_conversations.getConversationsStoppingSend)(state),
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    i18n: (0, import_user.getIntl)(state),
    localeMessages: (0, import_user.getLocaleMessages)(state),
    isCustomizingPreferredReactions: (0, import_preferredReactions.getIsCustomizingPreferredReactions)(state),
    isMaximized: (0, import_user.getIsMainWindowMaximized)(state),
    isFullScreen: (0, import_user.getIsMainWindowFullScreen)(state),
    menuOptions: (0, import_user.getMenuOptions)(state),
    platform: (0, import_user.getPlatform)(state),
    isWindows11: window.SignalContext.OS.isWindows11(),
    hideMenuBar: (0, import_items.getHideMenuBar)(state),
    renderCallManager: () => /* @__PURE__ */ import_react.default.createElement(import_CallManager.SmartCallManager, null),
    renderCustomizingPreferredReactionsModal: () => /* @__PURE__ */ import_react.default.createElement(import_CustomizingPreferredReactionsModal.SmartCustomizingPreferredReactionsModal, null),
    renderGlobalModalContainer: () => /* @__PURE__ */ import_react.default.createElement(import_GlobalModalContainer.SmartGlobalModalContainer, null),
    renderLeftPane: () => /* @__PURE__ */ import_react.default.createElement(import_LeftPane.SmartLeftPane, null),
    renderSafetyNumber: (props) => /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberViewer.SmartSafetyNumberViewer, {
      ...props
    }),
    isShowingStoriesView: (0, import_stories.shouldShowStoriesView)(state),
    renderStories: () => /* @__PURE__ */ import_react.default.createElement(import_Stories.SmartStories, null),
    requestVerification: (type, number, token) => {
      const accountManager = window.getAccountManager();
      if (type === "sms") {
        return accountManager.requestSMSVerification(number, token);
      }
      return accountManager.requestVoiceVerification(number, token);
    },
    registerSingleDevice: (number, code) => {
      return window.getAccountManager().registerSingleDevice(number, code);
    },
    selectedConversationId: state.conversations.selectedConversationId,
    selectedMessage: state.conversations.selectedMessage,
    theme: (0, import_user.getTheme)(state),
    executeMenuRole: (role) => {
      window.SignalContext.executeMenuRole(role);
    },
    executeMenuAction: (action) => {
      window.SignalContext.executeMenuAction(action);
    },
    titleBarDoubleClick: () => {
      window.titleBarDoubleClick();
    }
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartApp = smart(import_App.App);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartApp
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjb25uZWN0IH0gZnJvbSAncmVhY3QtcmVkdXgnO1xuaW1wb3J0IHR5cGUgeyBNZW51SXRlbUNvbnN0cnVjdG9yT3B0aW9ucyB9IGZyb20gJ2VsZWN0cm9uJztcblxuaW1wb3J0IHR5cGUgeyBNZW51QWN0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL21lbnUnO1xuaW1wb3J0IHsgQXBwIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9BcHAnO1xuaW1wb3J0IHsgU21hcnRDYWxsTWFuYWdlciB9IGZyb20gJy4vQ2FsbE1hbmFnZXInO1xuaW1wb3J0IHsgU21hcnRDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsIH0gZnJvbSAnLi9DdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsJztcbmltcG9ydCB7IFNtYXJ0R2xvYmFsTW9kYWxDb250YWluZXIgfSBmcm9tICcuL0dsb2JhbE1vZGFsQ29udGFpbmVyJztcbmltcG9ydCB7IFNtYXJ0TGVmdFBhbmUgfSBmcm9tICcuL0xlZnRQYW5lJztcbmltcG9ydCB7IFNtYXJ0U2FmZXR5TnVtYmVyVmlld2VyIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJWaWV3ZXInO1xuaW1wb3J0IHsgU21hcnRTdG9yaWVzIH0gZnJvbSAnLi9TdG9yaWVzJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQge1xuICBnZXRJbnRsLFxuICBnZXRMb2NhbGVNZXNzYWdlcyxcbiAgZ2V0VGhlbWUsXG4gIGdldElzTWFpbldpbmRvd01heGltaXplZCxcbiAgZ2V0SXNNYWluV2luZG93RnVsbFNjcmVlbixcbiAgZ2V0TWVudU9wdGlvbnMsXG4gIGdldFBsYXRmb3JtLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQgeyBzaG91bGRTaG93U3Rvcmllc1ZpZXcgfSBmcm9tICcuLi9zZWxlY3RvcnMvc3Rvcmllcyc7XG5pbXBvcnQgeyBnZXRIaWRlTWVudUJhciB9IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0SXNDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9ucyB9IGZyb20gJy4uL3NlbGVjdG9ycy9wcmVmZXJyZWRSZWFjdGlvbnMnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFNhZmV0eU51bWJlclByb3BzIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9TYWZldHlOdW1iZXJDaGFuZ2VEaWFsb2cnO1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICByZXR1cm4ge1xuICAgIC4uLnN0YXRlLmFwcCxcbiAgICBjb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kOiBnZXRDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kKHN0YXRlKSxcbiAgICBnZXRQcmVmZXJyZWRCYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSksXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgbG9jYWxlTWVzc2FnZXM6IGdldExvY2FsZU1lc3NhZ2VzKHN0YXRlKSxcbiAgICBpc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zOiBnZXRJc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zKHN0YXRlKSxcbiAgICBpc01heGltaXplZDogZ2V0SXNNYWluV2luZG93TWF4aW1pemVkKHN0YXRlKSxcbiAgICBpc0Z1bGxTY3JlZW46IGdldElzTWFpbldpbmRvd0Z1bGxTY3JlZW4oc3RhdGUpLFxuICAgIG1lbnVPcHRpb25zOiBnZXRNZW51T3B0aW9ucyhzdGF0ZSksXG4gICAgcGxhdGZvcm06IGdldFBsYXRmb3JtKHN0YXRlKSxcbiAgICBpc1dpbmRvd3MxMTogd2luZG93LlNpZ25hbENvbnRleHQuT1MuaXNXaW5kb3dzMTEoKSxcbiAgICBoaWRlTWVudUJhcjogZ2V0SGlkZU1lbnVCYXIoc3RhdGUpLFxuICAgIHJlbmRlckNhbGxNYW5hZ2VyOiAoKSA9PiA8U21hcnRDYWxsTWFuYWdlciAvPixcbiAgICByZW5kZXJDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsOiAoKSA9PiAoXG4gICAgICA8U21hcnRDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsIC8+XG4gICAgKSxcbiAgICByZW5kZXJHbG9iYWxNb2RhbENvbnRhaW5lcjogKCkgPT4gPFNtYXJ0R2xvYmFsTW9kYWxDb250YWluZXIgLz4sXG4gICAgcmVuZGVyTGVmdFBhbmU6ICgpID0+IDxTbWFydExlZnRQYW5lIC8+LFxuICAgIHJlbmRlclNhZmV0eU51bWJlcjogKHByb3BzOiBTYWZldHlOdW1iZXJQcm9wcykgPT4gKFxuICAgICAgPFNtYXJ0U2FmZXR5TnVtYmVyVmlld2VyIHsuLi5wcm9wc30gLz5cbiAgICApLFxuICAgIGlzU2hvd2luZ1N0b3JpZXNWaWV3OiBzaG91bGRTaG93U3Rvcmllc1ZpZXcoc3RhdGUpLFxuICAgIHJlbmRlclN0b3JpZXM6ICgpID0+IDxTbWFydFN0b3JpZXMgLz4sXG4gICAgcmVxdWVzdFZlcmlmaWNhdGlvbjogKFxuICAgICAgdHlwZTogJ3NtcycgfCAndm9pY2UnLFxuICAgICAgbnVtYmVyOiBzdHJpbmcsXG4gICAgICB0b2tlbjogc3RyaW5nXG4gICAgKTogUHJvbWlzZTx2b2lkPiA9PiB7XG4gICAgICBjb25zdCBhY2NvdW50TWFuYWdlciA9IHdpbmRvdy5nZXRBY2NvdW50TWFuYWdlcigpO1xuXG4gICAgICBpZiAodHlwZSA9PT0gJ3NtcycpIHtcbiAgICAgICAgcmV0dXJuIGFjY291bnRNYW5hZ2VyLnJlcXVlc3RTTVNWZXJpZmljYXRpb24obnVtYmVyLCB0b2tlbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiBhY2NvdW50TWFuYWdlci5yZXF1ZXN0Vm9pY2VWZXJpZmljYXRpb24obnVtYmVyLCB0b2tlbik7XG4gICAgfSxcbiAgICByZWdpc3RlclNpbmdsZURldmljZTogKG51bWJlcjogc3RyaW5nLCBjb2RlOiBzdHJpbmcpOiBQcm9taXNlPHZvaWQ+ID0+IHtcbiAgICAgIHJldHVybiB3aW5kb3cuZ2V0QWNjb3VudE1hbmFnZXIoKS5yZWdpc3RlclNpbmdsZURldmljZShudW1iZXIsIGNvZGUpO1xuICAgIH0sXG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZDogc3RhdGUuY29udmVyc2F0aW9ucy5zZWxlY3RlZENvbnZlcnNhdGlvbklkLFxuICAgIHNlbGVjdGVkTWVzc2FnZTogc3RhdGUuY29udmVyc2F0aW9ucy5zZWxlY3RlZE1lc3NhZ2UsXG4gICAgdGhlbWU6IGdldFRoZW1lKHN0YXRlKSxcblxuICAgIGV4ZWN1dGVNZW51Um9sZTogKHJvbGU6IE1lbnVJdGVtQ29uc3RydWN0b3JPcHRpb25zWydyb2xlJ10pOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy5TaWduYWxDb250ZXh0LmV4ZWN1dGVNZW51Um9sZShyb2xlKTtcbiAgICB9LFxuICAgIGV4ZWN1dGVNZW51QWN0aW9uOiAoYWN0aW9uOiBNZW51QWN0aW9uVHlwZSk6IHZvaWQgPT4ge1xuICAgICAgd2luZG93LlNpZ25hbENvbnRleHQuZXhlY3V0ZU1lbnVBY3Rpb24oYWN0aW9uKTtcbiAgICB9LFxuICAgIHRpdGxlQmFyRG91YmxlQ2xpY2s6ICgpOiB2b2lkID0+IHtcbiAgICAgIHdpbmRvdy50aXRsZUJhckRvdWJsZUNsaWNrKCk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHNtYXJ0ID0gY29ubmVjdChtYXBTdGF0ZVRvUHJvcHMsIG1hcERpc3BhdGNoVG9Qcm9wcyk7XG5cbmV4cG9ydCBjb25zdCBTbWFydEFwcCA9IHNtYXJ0KEFwcCk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWtCO0FBQ2xCLHlCQUF3QjtBQUl4QixpQkFBb0I7QUFDcEIseUJBQWlDO0FBQ2pDLGdEQUF3RDtBQUN4RCxrQ0FBMEM7QUFDMUMsc0JBQThCO0FBQzlCLGdDQUF3QztBQUN4QyxxQkFBNkI7QUFFN0Isb0JBQTBDO0FBQzFDLGtCQVFPO0FBQ1AscUJBQXNDO0FBQ3RDLG1CQUErQjtBQUMvQiwyQkFBNkM7QUFDN0MsZ0NBQW1EO0FBQ25ELHFCQUFtQztBQUduQyxNQUFNLGtCQUFrQix3QkFBQyxVQUFxQjtBQUM1QyxTQUFPO0FBQUEsT0FDRixNQUFNO0FBQUEsSUFDVCwyQkFBMkIsdURBQTZCLEtBQUs7QUFBQSxJQUM3RCxtQkFBbUIsNkNBQTBCLEtBQUs7QUFBQSxJQUNsRCxNQUFNLHlCQUFRLEtBQUs7QUFBQSxJQUNuQixnQkFBZ0IsbUNBQWtCLEtBQUs7QUFBQSxJQUN2QyxpQ0FBaUMsa0VBQW1DLEtBQUs7QUFBQSxJQUN6RSxhQUFhLDBDQUF5QixLQUFLO0FBQUEsSUFDM0MsY0FBYywyQ0FBMEIsS0FBSztBQUFBLElBQzdDLGFBQWEsZ0NBQWUsS0FBSztBQUFBLElBQ2pDLFVBQVUsNkJBQVksS0FBSztBQUFBLElBQzNCLGFBQWEsT0FBTyxjQUFjLEdBQUcsWUFBWTtBQUFBLElBQ2pELGFBQWEsaUNBQWUsS0FBSztBQUFBLElBQ2pDLG1CQUFtQixNQUFNLG1EQUFDLHlDQUFpQjtBQUFBLElBQzNDLDBDQUEwQyxNQUN4QyxtREFBQyx1RkFBd0M7QUFBQSxJQUUzQyw0QkFBNEIsTUFBTSxtREFBQywyREFBMEI7QUFBQSxJQUM3RCxnQkFBZ0IsTUFBTSxtREFBQyxtQ0FBYztBQUFBLElBQ3JDLG9CQUFvQixDQUFDLFVBQ25CLG1EQUFDO0FBQUEsU0FBNEI7QUFBQSxLQUFPO0FBQUEsSUFFdEMsc0JBQXNCLDBDQUFzQixLQUFLO0FBQUEsSUFDakQsZUFBZSxNQUFNLG1EQUFDLGlDQUFhO0FBQUEsSUFDbkMscUJBQXFCLENBQ25CLE1BQ0EsUUFDQSxVQUNrQjtBQUNsQixZQUFNLGlCQUFpQixPQUFPLGtCQUFrQjtBQUVoRCxVQUFJLFNBQVMsT0FBTztBQUNsQixlQUFPLGVBQWUsdUJBQXVCLFFBQVEsS0FBSztBQUFBLE1BQzVEO0FBRUEsYUFBTyxlQUFlLHlCQUF5QixRQUFRLEtBQUs7QUFBQSxJQUM5RDtBQUFBLElBQ0Esc0JBQXNCLENBQUMsUUFBZ0IsU0FBZ0M7QUFDckUsYUFBTyxPQUFPLGtCQUFrQixFQUFFLHFCQUFxQixRQUFRLElBQUk7QUFBQSxJQUNyRTtBQUFBLElBQ0Esd0JBQXdCLE1BQU0sY0FBYztBQUFBLElBQzVDLGlCQUFpQixNQUFNLGNBQWM7QUFBQSxJQUNyQyxPQUFPLDBCQUFTLEtBQUs7QUFBQSxJQUVyQixpQkFBaUIsQ0FBQyxTQUFtRDtBQUNuRSxhQUFPLGNBQWMsZ0JBQWdCLElBQUk7QUFBQSxJQUMzQztBQUFBLElBQ0EsbUJBQW1CLENBQUMsV0FBaUM7QUFDbkQsYUFBTyxjQUFjLGtCQUFrQixNQUFNO0FBQUEsSUFDL0M7QUFBQSxJQUNBLHFCQUFxQixNQUFZO0FBQy9CLGFBQU8sb0JBQW9CO0FBQUEsSUFDN0I7QUFBQSxFQUNGO0FBQ0YsR0F2RHdCO0FBeUR4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLGlDQUFrQjtBQUVsRCxNQUFNLFdBQVcsTUFBTSxjQUFHOyIsCiAgIm5hbWVzIjogW10KfQo=
