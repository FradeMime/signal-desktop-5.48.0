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
  App: () => App
});
module.exports = __toCommonJS(App_exports);
var import_react = __toESM(require("react"));
var import_web = require("@react-spring/web");
var import_classnames = __toESM(require("classnames"));
var import_app = require("../state/ducks/app");
var import_Inbox = require("./Inbox");
var import_InstallScreen = require("../state/smart/InstallScreen");
var import_StandaloneRegistration = require("./StandaloneRegistration");
var import_Util = require("../types/Util");
var import_usePageVisibility = require("../hooks/usePageVisibility");
var import_useReducedMotion = require("../hooks/useReducedMotion");
var import_TitleBarContainer = require("./TitleBarContainer");
const App = /* @__PURE__ */ __name(({
  appView,
  cancelConversationVerification,
  conversationsStoppingSend,
  executeMenuAction,
  executeMenuRole,
  getPreferredBadge,
  hasInitialLoadCompleted,
  hideMenuBar,
  i18n,
  isCustomizingPreferredReactions,
  isFullScreen,
  isMaximized,
  isShowingStoriesView,
  isWindows11,
  localeMessages,
  menuOptions,
  openInbox,
  platform,
  registerSingleDevice,
  renderCallManager,
  renderCustomizingPreferredReactionsModal,
  renderGlobalModalContainer,
  renderLeftPane,
  renderSafetyNumber,
  renderStories,
  requestVerification,
  selectedConversationId,
  selectedMessage,
  showConversation,
  showWhatsNewModal,
  theme,
  titleBarDoubleClick,
  verifyConversationsStoppingSend
}) => {
  let contents;
  if (appView === import_app.AppViewType.Installer) {
    contents = /* @__PURE__ */ import_react.default.createElement(import_InstallScreen.SmartInstallScreen, null);
  } else if (appView === import_app.AppViewType.Standalone) {
    const onComplete = /* @__PURE__ */ __name(() => {
      window.removeSetupMenuItems();
      openInbox();
    }, "onComplete");
    contents = /* @__PURE__ */ import_react.default.createElement(import_StandaloneRegistration.StandaloneRegistration, {
      onComplete,
      requestVerification,
      registerSingleDevice
    });
  } else if (appView === import_app.AppViewType.Inbox) {
    contents = /* @__PURE__ */ import_react.default.createElement(import_Inbox.Inbox, {
      cancelConversationVerification,
      conversationsStoppingSend,
      hasInitialLoadCompleted,
      getPreferredBadge,
      i18n,
      isCustomizingPreferredReactions,
      renderCustomizingPreferredReactionsModal,
      renderLeftPane,
      renderSafetyNumber,
      selectedConversationId,
      selectedMessage,
      showConversation,
      showWhatsNewModal,
      theme,
      verifyConversationsStoppingSend
    });
  }
  (0, import_react.useEffect)(() => {
    document.body.classList.remove("light-theme");
    document.body.classList.remove("dark-theme");
    if (theme === import_Util.ThemeType.dark) {
      document.body.classList.add("dark-theme");
    }
    if (theme === import_Util.ThemeType.light) {
      document.body.classList.add("light-theme");
    }
  }, [theme]);
  const isPageVisible = (0, import_usePageVisibility.usePageVisibility)();
  (0, import_react.useEffect)(() => {
    document.body.classList.toggle("page-is-visible", isPageVisible);
  }, [isPageVisible]);
  const prefersReducedMotion = (0, import_useReducedMotion.useReducedMotion)();
  (0, import_react.useEffect)(() => {
    import_web.Globals.assign({
      skipAnimation: prefersReducedMotion
    });
  }, [prefersReducedMotion]);
  return /* @__PURE__ */ import_react.default.createElement(import_TitleBarContainer.TitleBarContainer, {
    theme,
    isMaximized,
    isFullScreen,
    platform,
    isWindows11,
    executeMenuRole,
    titleBarDoubleClick,
    hasMenu: true,
    hideMenuBar,
    localeMessages,
    menuOptions,
    executeMenuAction
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)({
      App: true,
      "light-theme": theme === import_Util.ThemeType.light,
      "dark-theme": theme === import_Util.ThemeType.dark
    })
  }, renderGlobalModalContainer(), renderCallManager(), isShowingStoriesView && renderStories(), contents));
}, "App");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  App
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQXBwLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgQ29tcG9uZW50UHJvcHMgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlRWZmZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgR2xvYmFscyB9IGZyb20gJ0ByZWFjdC1zcHJpbmcvd2ViJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuXG5pbXBvcnQgeyBBcHBWaWV3VHlwZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2FwcCc7XG5pbXBvcnQgeyBJbmJveCB9IGZyb20gJy4vSW5ib3gnO1xuaW1wb3J0IHsgU21hcnRJbnN0YWxsU2NyZWVuIH0gZnJvbSAnLi4vc3RhdGUvc21hcnQvSW5zdGFsbFNjcmVlbic7XG5pbXBvcnQgeyBTdGFuZGFsb25lUmVnaXN0cmF0aW9uIH0gZnJvbSAnLi9TdGFuZGFsb25lUmVnaXN0cmF0aW9uJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGVNZXNzYWdlc1R5cGUgfSBmcm9tICcuLi90eXBlcy9JMThOJztcbmltcG9ydCB7IHVzZVBhZ2VWaXNpYmlsaXR5IH0gZnJvbSAnLi4vaG9va3MvdXNlUGFnZVZpc2liaWxpdHknO1xuaW1wb3J0IHsgdXNlUmVkdWNlZE1vdGlvbiB9IGZyb20gJy4uL2hvb2tzL3VzZVJlZHVjZWRNb3Rpb24nO1xuaW1wb3J0IHR5cGUgeyBNZW51T3B0aW9uc1R5cGUsIE1lbnVBY3Rpb25UeXBlIH0gZnJvbSAnLi4vdHlwZXMvbWVudSc7XG5pbXBvcnQgeyBUaXRsZUJhckNvbnRhaW5lciB9IGZyb20gJy4vVGl0bGVCYXJDb250YWluZXInO1xuaW1wb3J0IHR5cGUgeyBFeGVjdXRlTWVudVJvbGVUeXBlIH0gZnJvbSAnLi9UaXRsZUJhckNvbnRhaW5lcic7XG5cbnR5cGUgUHJvcHNUeXBlID0ge1xuICBhcHBWaWV3OiBBcHBWaWV3VHlwZTtcbiAgbG9jYWxlTWVzc2FnZXM6IExvY2FsZU1lc3NhZ2VzVHlwZTtcbiAgb3BlbkluYm94OiAoKSA9PiB2b2lkO1xuICByZWdpc3RlclNpbmdsZURldmljZTogKG51bWJlcjogc3RyaW5nLCBjb2RlOiBzdHJpbmcpID0+IFByb21pc2U8dm9pZD47XG4gIHJlbmRlckNhbGxNYW5hZ2VyOiAoKSA9PiBKU1guRWxlbWVudDtcbiAgcmVuZGVyR2xvYmFsTW9kYWxDb250YWluZXI6ICgpID0+IEpTWC5FbGVtZW50O1xuICBpc1Nob3dpbmdTdG9yaWVzVmlldzogYm9vbGVhbjtcbiAgcmVuZGVyU3RvcmllczogKCkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlcXVlc3RWZXJpZmljYXRpb246IChcbiAgICB0eXBlOiAnc21zJyB8ICd2b2ljZScsXG4gICAgbnVtYmVyOiBzdHJpbmcsXG4gICAgdG9rZW46IHN0cmluZ1xuICApID0+IFByb21pc2U8dm9pZD47XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG4gIGlzTWF4aW1pemVkOiBib29sZWFuO1xuICBpc0Z1bGxTY3JlZW46IGJvb2xlYW47XG4gIG1lbnVPcHRpb25zOiBNZW51T3B0aW9uc1R5cGU7XG4gIHBsYXRmb3JtOiBzdHJpbmc7XG4gIGlzV2luZG93czExOiBib29sZWFuO1xuICBoaWRlTWVudUJhcjogYm9vbGVhbjtcblxuICBleGVjdXRlTWVudVJvbGU6IEV4ZWN1dGVNZW51Um9sZVR5cGU7XG4gIGV4ZWN1dGVNZW51QWN0aW9uOiAoYWN0aW9uOiBNZW51QWN0aW9uVHlwZSkgPT4gdm9pZDtcbiAgdGl0bGVCYXJEb3VibGVDbGljazogKCkgPT4gdm9pZDtcbn0gJiBDb21wb25lbnRQcm9wczx0eXBlb2YgSW5ib3g+O1xuXG5leHBvcnQgY29uc3QgQXBwID0gKHtcbiAgYXBwVmlldyxcbiAgY2FuY2VsQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uLFxuICBjb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kLFxuICBleGVjdXRlTWVudUFjdGlvbixcbiAgZXhlY3V0ZU1lbnVSb2xlLFxuICBnZXRQcmVmZXJyZWRCYWRnZSxcbiAgaGFzSW5pdGlhbExvYWRDb21wbGV0ZWQsXG4gIGhpZGVNZW51QmFyLFxuICBpMThuLFxuICBpc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zLFxuICBpc0Z1bGxTY3JlZW4sXG4gIGlzTWF4aW1pemVkLFxuICBpc1Nob3dpbmdTdG9yaWVzVmlldyxcbiAgaXNXaW5kb3dzMTEsXG4gIGxvY2FsZU1lc3NhZ2VzLFxuICBtZW51T3B0aW9ucyxcbiAgb3BlbkluYm94LFxuICBwbGF0Zm9ybSxcbiAgcmVnaXN0ZXJTaW5nbGVEZXZpY2UsXG4gIHJlbmRlckNhbGxNYW5hZ2VyLFxuICByZW5kZXJDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsLFxuICByZW5kZXJHbG9iYWxNb2RhbENvbnRhaW5lcixcbiAgcmVuZGVyTGVmdFBhbmUsXG4gIHJlbmRlclNhZmV0eU51bWJlcixcbiAgcmVuZGVyU3RvcmllcyxcbiAgcmVxdWVzdFZlcmlmaWNhdGlvbixcbiAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZCxcbiAgc2VsZWN0ZWRNZXNzYWdlLFxuICBzaG93Q29udmVyc2F0aW9uLFxuICBzaG93V2hhdHNOZXdNb2RhbCxcbiAgdGhlbWUsXG4gIHRpdGxlQmFyRG91YmxlQ2xpY2ssXG4gIHZlcmlmeUNvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQsXG59OiBQcm9wc1R5cGUpOiBKU1guRWxlbWVudCA9PiB7XG4gIGxldCBjb250ZW50cztcblxuICBpZiAoYXBwVmlldyA9PT0gQXBwVmlld1R5cGUuSW5zdGFsbGVyKSB7XG4gICAgY29udGVudHMgPSA8U21hcnRJbnN0YWxsU2NyZWVuIC8+O1xuICB9IGVsc2UgaWYgKGFwcFZpZXcgPT09IEFwcFZpZXdUeXBlLlN0YW5kYWxvbmUpIHtcbiAgICBjb25zdCBvbkNvbXBsZXRlID0gKCkgPT4ge1xuICAgICAgd2luZG93LnJlbW92ZVNldHVwTWVudUl0ZW1zKCk7XG4gICAgICBvcGVuSW5ib3goKTtcbiAgICB9O1xuICAgIGNvbnRlbnRzID0gKFxuICAgICAgPFN0YW5kYWxvbmVSZWdpc3RyYXRpb25cbiAgICAgICAgb25Db21wbGV0ZT17b25Db21wbGV0ZX1cbiAgICAgICAgcmVxdWVzdFZlcmlmaWNhdGlvbj17cmVxdWVzdFZlcmlmaWNhdGlvbn1cbiAgICAgICAgcmVnaXN0ZXJTaW5nbGVEZXZpY2U9e3JlZ2lzdGVyU2luZ2xlRGV2aWNlfVxuICAgICAgLz5cbiAgICApO1xuICB9IGVsc2UgaWYgKGFwcFZpZXcgPT09IEFwcFZpZXdUeXBlLkluYm94KSB7XG4gICAgY29udGVudHMgPSAoXG4gICAgICA8SW5ib3hcbiAgICAgICAgY2FuY2VsQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uPXtjYW5jZWxDb252ZXJzYXRpb25WZXJpZmljYXRpb259XG4gICAgICAgIGNvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmQ9e2NvbnZlcnNhdGlvbnNTdG9wcGluZ1NlbmR9XG4gICAgICAgIGhhc0luaXRpYWxMb2FkQ29tcGxldGVkPXtoYXNJbml0aWFsTG9hZENvbXBsZXRlZH1cbiAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlfVxuICAgICAgICBpMThuPXtpMThufVxuICAgICAgICBpc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zPXtpc0N1c3RvbWl6aW5nUHJlZmVycmVkUmVhY3Rpb25zfVxuICAgICAgICByZW5kZXJDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsPXtcbiAgICAgICAgICByZW5kZXJDdXN0b21pemluZ1ByZWZlcnJlZFJlYWN0aW9uc01vZGFsXG4gICAgICAgIH1cbiAgICAgICAgcmVuZGVyTGVmdFBhbmU9e3JlbmRlckxlZnRQYW5lfVxuICAgICAgICByZW5kZXJTYWZldHlOdW1iZXI9e3JlbmRlclNhZmV0eU51bWJlcn1cbiAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZD17c2VsZWN0ZWRDb252ZXJzYXRpb25JZH1cbiAgICAgICAgc2VsZWN0ZWRNZXNzYWdlPXtzZWxlY3RlZE1lc3NhZ2V9XG4gICAgICAgIHNob3dDb252ZXJzYXRpb249e3Nob3dDb252ZXJzYXRpb259XG4gICAgICAgIHNob3dXaGF0c05ld01vZGFsPXtzaG93V2hhdHNOZXdNb2RhbH1cbiAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICB2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kPXt2ZXJpZnlDb252ZXJzYXRpb25zU3RvcHBpbmdTZW5kfVxuICAgICAgLz5cbiAgICApO1xuICB9XG5cbiAgLy8gVGhpcyBhcmUgaGVyZSBzbyB0aGF0IHRoZW1lcyBhcmUgcHJvcGVybHkgYXBwbGllZCB0byBhbnl0aGluZyB0aGF0IGlzXG4gIC8vIGNyZWF0ZWQgaW4gYSBwb3J0YWwgYW5kIGV4aXN0cyBvdXRzaWRlIG9mIHRoZSA8QXBwIC8+IGNvbnRhaW5lci5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5yZW1vdmUoJ2xpZ2h0LXRoZW1lJyk7XG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdkYXJrLXRoZW1lJyk7XG5cbiAgICBpZiAodGhlbWUgPT09IFRoZW1lVHlwZS5kYXJrKSB7XG4gICAgICBkb2N1bWVudC5ib2R5LmNsYXNzTGlzdC5hZGQoJ2RhcmstdGhlbWUnKTtcbiAgICB9XG4gICAgaWYgKHRoZW1lID09PSBUaGVtZVR5cGUubGlnaHQpIHtcbiAgICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgnbGlnaHQtdGhlbWUnKTtcbiAgICB9XG4gIH0sIFt0aGVtZV0pO1xuXG4gIGNvbnN0IGlzUGFnZVZpc2libGUgPSB1c2VQYWdlVmlzaWJpbGl0eSgpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnRvZ2dsZSgncGFnZS1pcy12aXNpYmxlJywgaXNQYWdlVmlzaWJsZSk7XG4gIH0sIFtpc1BhZ2VWaXNpYmxlXSk7XG5cbiAgLy8gQTExeSBzZXR0aW5ncyBmb3IgcmVhY3Qtc3ByaW5nXG4gIGNvbnN0IHByZWZlcnNSZWR1Y2VkTW90aW9uID0gdXNlUmVkdWNlZE1vdGlvbigpO1xuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIEdsb2JhbHMuYXNzaWduKHtcbiAgICAgIHNraXBBbmltYXRpb246IHByZWZlcnNSZWR1Y2VkTW90aW9uLFxuICAgIH0pO1xuICB9LCBbcHJlZmVyc1JlZHVjZWRNb3Rpb25dKTtcblxuICByZXR1cm4gKFxuICAgIDxUaXRsZUJhckNvbnRhaW5lclxuICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgaXNNYXhpbWl6ZWQ9e2lzTWF4aW1pemVkfVxuICAgICAgaXNGdWxsU2NyZWVuPXtpc0Z1bGxTY3JlZW59XG4gICAgICBwbGF0Zm9ybT17cGxhdGZvcm19XG4gICAgICBpc1dpbmRvd3MxMT17aXNXaW5kb3dzMTF9XG4gICAgICBleGVjdXRlTWVudVJvbGU9e2V4ZWN1dGVNZW51Um9sZX1cbiAgICAgIHRpdGxlQmFyRG91YmxlQ2xpY2s9e3RpdGxlQmFyRG91YmxlQ2xpY2t9XG4gICAgICBoYXNNZW51XG4gICAgICBoaWRlTWVudUJhcj17aGlkZU1lbnVCYXJ9XG4gICAgICBsb2NhbGVNZXNzYWdlcz17bG9jYWxlTWVzc2FnZXN9XG4gICAgICBtZW51T3B0aW9ucz17bWVudU9wdGlvbnN9XG4gICAgICBleGVjdXRlTWVudUFjdGlvbj17ZXhlY3V0ZU1lbnVBY3Rpb259XG4gICAgPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoe1xuICAgICAgICAgIEFwcDogdHJ1ZSxcbiAgICAgICAgICAnbGlnaHQtdGhlbWUnOiB0aGVtZSA9PT0gVGhlbWVUeXBlLmxpZ2h0LFxuICAgICAgICAgICdkYXJrLXRoZW1lJzogdGhlbWUgPT09IFRoZW1lVHlwZS5kYXJrLFxuICAgICAgICB9KX1cbiAgICAgID5cbiAgICAgICAge3JlbmRlckdsb2JhbE1vZGFsQ29udGFpbmVyKCl9XG4gICAgICAgIHtyZW5kZXJDYWxsTWFuYWdlcigpfVxuICAgICAgICB7aXNTaG93aW5nU3Rvcmllc1ZpZXcgJiYgcmVuZGVyU3RvcmllcygpfVxuICAgICAgICB7Y29udGVudHN9XG4gICAgICA8L2Rpdj5cbiAgICA8L1RpdGxlQmFyQ29udGFpbmVyPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFJQSxtQkFBaUM7QUFDakMsaUJBQXdCO0FBQ3hCLHdCQUF1QjtBQUV2QixpQkFBNEI7QUFDNUIsbUJBQXNCO0FBQ3RCLDJCQUFtQztBQUNuQyxvQ0FBdUM7QUFDdkMsa0JBQTBCO0FBRTFCLCtCQUFrQztBQUNsQyw4QkFBaUM7QUFFakMsK0JBQWtDO0FBOEIzQixNQUFNLE1BQU0sd0JBQUM7QUFBQSxFQUNsQjtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsTUFDNEI7QUFDNUIsTUFBSTtBQUVKLE1BQUksWUFBWSx1QkFBWSxXQUFXO0FBQ3JDLGVBQVcsbURBQUMsNkNBQW1CO0FBQUEsRUFDakMsV0FBVyxZQUFZLHVCQUFZLFlBQVk7QUFDN0MsVUFBTSxhQUFhLDZCQUFNO0FBQ3ZCLGFBQU8scUJBQXFCO0FBQzVCLGdCQUFVO0FBQUEsSUFDWixHQUhtQjtBQUluQixlQUNFLG1EQUFDO0FBQUEsTUFDQztBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsS0FDRjtBQUFBLEVBRUosV0FBVyxZQUFZLHVCQUFZLE9BQU87QUFDeEMsZUFDRSxtREFBQztBQUFBLE1BQ0M7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUdBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLEtBQ0Y7QUFBQSxFQUVKO0FBSUEsOEJBQVUsTUFBTTtBQUNkLGFBQVMsS0FBSyxVQUFVLE9BQU8sYUFBYTtBQUM1QyxhQUFTLEtBQUssVUFBVSxPQUFPLFlBQVk7QUFFM0MsUUFBSSxVQUFVLHNCQUFVLE1BQU07QUFDNUIsZUFBUyxLQUFLLFVBQVUsSUFBSSxZQUFZO0FBQUEsSUFDMUM7QUFDQSxRQUFJLFVBQVUsc0JBQVUsT0FBTztBQUM3QixlQUFTLEtBQUssVUFBVSxJQUFJLGFBQWE7QUFBQSxJQUMzQztBQUFBLEVBQ0YsR0FBRyxDQUFDLEtBQUssQ0FBQztBQUVWLFFBQU0sZ0JBQWdCLGdEQUFrQjtBQUN4Qyw4QkFBVSxNQUFNO0FBQ2QsYUFBUyxLQUFLLFVBQVUsT0FBTyxtQkFBbUIsYUFBYTtBQUFBLEVBQ2pFLEdBQUcsQ0FBQyxhQUFhLENBQUM7QUFHbEIsUUFBTSx1QkFBdUIsOENBQWlCO0FBQzlDLDhCQUFVLE1BQU07QUFDZCx1QkFBUSxPQUFPO0FBQUEsTUFDYixlQUFlO0FBQUEsSUFDakIsQ0FBQztBQUFBLEVBQ0gsR0FBRyxDQUFDLG9CQUFvQixDQUFDO0FBRXpCLFNBQ0UsbURBQUM7QUFBQSxJQUNDO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQSxTQUFPO0FBQUEsSUFDUDtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLEtBRUEsbURBQUM7QUFBQSxJQUNDLFdBQVcsK0JBQVc7QUFBQSxNQUNwQixLQUFLO0FBQUEsTUFDTCxlQUFlLFVBQVUsc0JBQVU7QUFBQSxNQUNuQyxjQUFjLFVBQVUsc0JBQVU7QUFBQSxJQUNwQyxDQUFDO0FBQUEsS0FFQSwyQkFBMkIsR0FDM0Isa0JBQWtCLEdBQ2xCLHdCQUF3QixjQUFjLEdBQ3RDLFFBQ0gsQ0FDRjtBQUVKLEdBbkltQjsiLAogICJuYW1lcyI6IFtdCn0K
