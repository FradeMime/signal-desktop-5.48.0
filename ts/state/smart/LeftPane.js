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
var LeftPane_exports = {};
__export(LeftPane_exports, {
  SmartLeftPane: () => SmartLeftPane
});
module.exports = __toCommonJS(LeftPane_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_lodash = require("lodash");
var import_actions = require("../actions");
var import_LeftPane = require("../../components/LeftPane");
var import_missingCaseError = require("../../util/missingCaseError");
var import_lookupConversationWithoutUuid = require("../../util/lookupConversationWithoutUuid");
var import_conversationsEnums = require("../ducks/conversationsEnums");
var import_search = require("../selectors/search");
var import_user = require("../selectors/user");
var import_badges = require("../selectors/badges");
var import_items = require("../selectors/items");
var import_conversations = require("../selectors/conversations");
var import_ExpiredBuildDialog = require("./ExpiredBuildDialog");
var import_MainHeader = require("./MainHeader");
var import_MessageSearchResult = require("./MessageSearchResult");
var import_NetworkStatus = require("./NetworkStatus");
var import_RelinkDialog = require("./RelinkDialog");
var import_UpdateDialog = require("./UpdateDialog");
var import_CaptchaDialog = require("./CaptchaDialog");
var import_CrashReportDialog = require("./CrashReportDialog");
function renderExpiredBuildDialog(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_ExpiredBuildDialog.SmartExpiredBuildDialog, {
    ...props
  });
}
function renderMainHeader() {
  return /* @__PURE__ */ import_react.default.createElement(import_MainHeader.SmartMainHeader, null);
}
function renderMessageSearchResult(id) {
  return /* @__PURE__ */ import_react.default.createElement(import_MessageSearchResult.SmartMessageSearchResult, {
    id
  });
}
function renderNetworkStatus(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_NetworkStatus.SmartNetworkStatus, {
    ...props
  });
}
function renderRelinkDialog(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_RelinkDialog.SmartRelinkDialog, {
    ...props
  });
}
function renderUpdateDialog(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_UpdateDialog.SmartUpdateDialog, {
    ...props
  });
}
function renderCaptchaDialog({ onSkip }) {
  return /* @__PURE__ */ import_react.default.createElement(import_CaptchaDialog.SmartCaptchaDialog, {
    onSkip
  });
}
function renderCrashReportDialog() {
  return /* @__PURE__ */ import_react.default.createElement(import_CrashReportDialog.SmartCrashReportDialog, null);
}
const getModeSpecificProps = /* @__PURE__ */ __name((state) => {
  const composerStep = (0, import_conversations.getComposerStep)(state);
  switch (composerStep) {
    case void 0:
      if ((0, import_conversations.getShowArchived)(state)) {
        const { archivedConversations } = (0, import_conversations.getLeftPaneLists)(state);
        const searchConversation = (0, import_search.getSearchConversation)(state);
        const searchTerm = (0, import_search.getQuery)(state);
        return {
          mode: import_LeftPane.LeftPaneMode.Archive,
          archivedConversations,
          searchConversation,
          searchTerm,
          startSearchCounter: (0, import_search.getStartSearchCounter)(state),
          ...searchConversation && searchTerm ? (0, import_search.getSearchResults)(state) : {}
        };
      }
      if ((0, import_search.isSearching)(state)) {
        const primarySendsSms = Boolean((0, import_lodash.get)(state.items, ["primarySendsSms"], false));
        return {
          mode: import_LeftPane.LeftPaneMode.Search,
          primarySendsSms,
          searchConversation: (0, import_search.getSearchConversation)(state),
          searchDisabled: state.network.challengeStatus !== "idle",
          startSearchCounter: (0, import_search.getStartSearchCounter)(state),
          ...(0, import_search.getSearchResults)(state)
        };
      }
      return {
        mode: import_LeftPane.LeftPaneMode.Inbox,
        isAboutToSearchInAConversation: (0, import_search.getIsSearchingInAConversation)(state),
        searchConversation: (0, import_search.getSearchConversation)(state),
        searchDisabled: state.network.challengeStatus !== "idle",
        searchTerm: (0, import_search.getQuery)(state),
        startSearchCounter: (0, import_search.getStartSearchCounter)(state),
        ...(0, import_conversations.getLeftPaneLists)(state)
      };
    case import_conversationsEnums.ComposerStep.StartDirectConversation:
      return {
        mode: import_LeftPane.LeftPaneMode.Compose,
        composeContacts: (0, import_conversations.getFilteredComposeContacts)(state),
        composeGroups: (0, import_conversations.getFilteredComposeGroups)(state),
        regionCode: (0, import_user.getRegionCode)(state),
        searchTerm: (0, import_conversations.getComposerConversationSearchTerm)(state),
        isUsernamesEnabled: (0, import_items.getUsernamesEnabled)(state),
        uuidFetchState: (0, import_conversations.getComposerUUIDFetchState)(state)
      };
    case import_conversationsEnums.ComposerStep.ChooseGroupMembers:
      return {
        mode: import_LeftPane.LeftPaneMode.ChooseGroupMembers,
        candidateContacts: (0, import_conversations.getFilteredCandidateContactsForNewGroup)(state),
        isShowingRecommendedGroupSizeModal: (0, import_conversations.getRecommendedGroupSizeModalState)(state) === import_conversationsEnums.OneTimeModalState.Showing,
        isShowingMaximumGroupSizeModal: (0, import_conversations.getMaximumGroupSizeModalState)(state) === import_conversationsEnums.OneTimeModalState.Showing,
        regionCode: (0, import_user.getRegionCode)(state),
        searchTerm: (0, import_conversations.getComposerConversationSearchTerm)(state),
        selectedContacts: (0, import_conversations.getComposeSelectedContacts)(state),
        isUsernamesEnabled: (0, import_items.getUsernamesEnabled)(state),
        uuidFetchState: (0, import_conversations.getComposerUUIDFetchState)(state)
      };
    case import_conversationsEnums.ComposerStep.SetGroupMetadata:
      return {
        mode: import_LeftPane.LeftPaneMode.SetGroupMetadata,
        groupAvatar: (0, import_conversations.getComposeGroupAvatar)(state),
        groupName: (0, import_conversations.getComposeGroupName)(state),
        groupExpireTimer: (0, import_conversations.getComposeGroupExpireTimer)(state),
        hasError: (0, import_conversations.hasGroupCreationError)(state),
        isCreating: (0, import_conversations.isCreatingGroup)(state),
        isEditingAvatar: (0, import_conversations.isEditingAvatar)(state),
        selectedContacts: (0, import_conversations.getComposeSelectedContacts)(state),
        userAvatarData: (0, import_conversations.getComposeAvatarData)(state)
      };
    default:
      throw (0, import_missingCaseError.missingCaseError)(composerStep);
  }
}, "getModeSpecificProps");
const mapStateToProps = /* @__PURE__ */ __name((state) => {
  return {
    modeSpecificProps: getModeSpecificProps(state),
    preferredWidthFromStorage: (0, import_items.getPreferredLeftPaneWidth)(state),
    selectedConversationId: (0, import_conversations.getSelectedConversationId)(state),
    selectedMessageId: (0, import_conversations.getSelectedMessage)(state)?.id,
    showArchived: (0, import_conversations.getShowArchived)(state),
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    i18n: (0, import_user.getIntl)(state),
    regionCode: (0, import_user.getRegionCode)(state),
    challengeStatus: state.network.challengeStatus,
    crashReportCount: state.crashReports.count,
    renderExpiredBuildDialog,
    renderMainHeader,
    renderMessageSearchResult,
    renderNetworkStatus,
    renderRelinkDialog,
    renderUpdateDialog,
    renderCaptchaDialog,
    renderCrashReportDialog,
    lookupConversationWithoutUuid: import_lookupConversationWithoutUuid.lookupConversationWithoutUuid,
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartLeftPane = smart(import_LeftPane.LeftPane);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartLeftPane
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBnZXQgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHsgbWFwRGlzcGF0Y2hUb1Byb3BzIH0gZnJvbSAnLi4vYWN0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBMZWZ0UGFuZVByb3BzVHlwZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTGVmdFBhbmUnO1xuaW1wb3J0IHsgTGVmdFBhbmUsIExlZnRQYW5lTW9kZSB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvTGVmdFBhbmUnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQgfSBmcm9tICcuLi8uLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcblxuaW1wb3J0IHsgQ29tcG9zZXJTdGVwLCBPbmVUaW1lTW9kYWxTdGF0ZSB9IGZyb20gJy4uL2R1Y2tzL2NvbnZlcnNhdGlvbnNFbnVtcyc7XG5pbXBvcnQge1xuICBnZXRJc1NlYXJjaGluZ0luQUNvbnZlcnNhdGlvbixcbiAgZ2V0UXVlcnksXG4gIGdldFNlYXJjaENvbnZlcnNhdGlvbixcbiAgZ2V0U2VhcmNoUmVzdWx0cyxcbiAgZ2V0U3RhcnRTZWFyY2hDb3VudGVyLFxuICBpc1NlYXJjaGluZyxcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL3NlYXJjaCc7XG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRSZWdpb25Db2RlLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7XG4gIGdldFByZWZlcnJlZExlZnRQYW5lV2lkdGgsXG4gIGdldFVzZXJuYW1lc0VuYWJsZWQsXG59IGZyb20gJy4uL3NlbGVjdG9ycy9pdGVtcyc7XG5pbXBvcnQge1xuICBnZXRDb21wb3NlQXZhdGFyRGF0YSxcbiAgZ2V0Q29tcG9zZUdyb3VwQXZhdGFyLFxuICBnZXRDb21wb3NlR3JvdXBFeHBpcmVUaW1lcixcbiAgZ2V0Q29tcG9zZUdyb3VwTmFtZSxcbiAgZ2V0Q29tcG9zZXJDb252ZXJzYXRpb25TZWFyY2hUZXJtLFxuICBnZXRDb21wb3NlclN0ZXAsXG4gIGdldENvbXBvc2VyVVVJREZldGNoU3RhdGUsXG4gIGdldENvbXBvc2VTZWxlY3RlZENvbnRhY3RzLFxuICBnZXRGaWx0ZXJlZENhbmRpZGF0ZUNvbnRhY3RzRm9yTmV3R3JvdXAsXG4gIGdldEZpbHRlcmVkQ29tcG9zZUNvbnRhY3RzLFxuICBnZXRGaWx0ZXJlZENvbXBvc2VHcm91cHMsXG4gIGdldExlZnRQYW5lTGlzdHMsXG4gIGdldE1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlLFxuICBnZXRSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUsXG4gIGdldFNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gIGdldFNlbGVjdGVkTWVzc2FnZSxcbiAgZ2V0U2hvd0FyY2hpdmVkLFxuICBoYXNHcm91cENyZWF0aW9uRXJyb3IsXG4gIGlzQ3JlYXRpbmdHcm91cCxcbiAgaXNFZGl0aW5nQXZhdGFyLFxufSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgdHlwZSB7IFdpZHRoQnJlYWtwb2ludCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvX3V0aWwnO1xuXG5pbXBvcnQgeyBTbWFydEV4cGlyZWRCdWlsZERpYWxvZyB9IGZyb20gJy4vRXhwaXJlZEJ1aWxkRGlhbG9nJztcbmltcG9ydCB7IFNtYXJ0TWFpbkhlYWRlciB9IGZyb20gJy4vTWFpbkhlYWRlcic7XG5pbXBvcnQgeyBTbWFydE1lc3NhZ2VTZWFyY2hSZXN1bHQgfSBmcm9tICcuL01lc3NhZ2VTZWFyY2hSZXN1bHQnO1xuaW1wb3J0IHsgU21hcnROZXR3b3JrU3RhdHVzIH0gZnJvbSAnLi9OZXR3b3JrU3RhdHVzJztcbmltcG9ydCB7IFNtYXJ0UmVsaW5rRGlhbG9nIH0gZnJvbSAnLi9SZWxpbmtEaWFsb2cnO1xuaW1wb3J0IHsgU21hcnRVcGRhdGVEaWFsb2cgfSBmcm9tICcuL1VwZGF0ZURpYWxvZyc7XG5pbXBvcnQgeyBTbWFydENhcHRjaGFEaWFsb2cgfSBmcm9tICcuL0NhcHRjaGFEaWFsb2cnO1xuaW1wb3J0IHsgU21hcnRDcmFzaFJlcG9ydERpYWxvZyB9IGZyb20gJy4vQ3Jhc2hSZXBvcnREaWFsb2cnO1xuXG5mdW5jdGlvbiByZW5kZXJFeHBpcmVkQnVpbGREaWFsb2coXG4gIHByb3BzOiBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+XG4pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiA8U21hcnRFeHBpcmVkQnVpbGREaWFsb2cgey4uLnByb3BzfSAvPjtcbn1cbmZ1bmN0aW9uIHJlbmRlck1haW5IZWFkZXIoKTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gPFNtYXJ0TWFpbkhlYWRlciAvPjtcbn1cbmZ1bmN0aW9uIHJlbmRlck1lc3NhZ2VTZWFyY2hSZXN1bHQoaWQ6IHN0cmluZyk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydE1lc3NhZ2VTZWFyY2hSZXN1bHQgaWQ9e2lkfSAvPjtcbn1cbmZ1bmN0aW9uIHJlbmRlck5ldHdvcmtTdGF0dXMoXG4gIHByb3BzOiBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+XG4pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiA8U21hcnROZXR3b3JrU3RhdHVzIHsuLi5wcm9wc30gLz47XG59XG5mdW5jdGlvbiByZW5kZXJSZWxpbmtEaWFsb2coXG4gIHByb3BzOiBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+XG4pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiA8U21hcnRSZWxpbmtEaWFsb2cgey4uLnByb3BzfSAvPjtcbn1cbmZ1bmN0aW9uIHJlbmRlclVwZGF0ZURpYWxvZyhcbiAgcHJvcHM6IFJlYWRvbmx5PHsgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQgfT5cbik6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydFVwZGF0ZURpYWxvZyB7Li4ucHJvcHN9IC8+O1xufVxuZnVuY3Rpb24gcmVuZGVyQ2FwdGNoYURpYWxvZyh7IG9uU2tpcCB9OiB7IG9uU2tpcCgpOiB2b2lkIH0pOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiA8U21hcnRDYXB0Y2hhRGlhbG9nIG9uU2tpcD17b25Ta2lwfSAvPjtcbn1cbmZ1bmN0aW9uIHJlbmRlckNyYXNoUmVwb3J0RGlhbG9nKCk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydENyYXNoUmVwb3J0RGlhbG9nIC8+O1xufVxuXG5jb25zdCBnZXRNb2RlU3BlY2lmaWNQcm9wcyA9IChcbiAgc3RhdGU6IFN0YXRlVHlwZVxuKTogTGVmdFBhbmVQcm9wc1R5cGVbJ21vZGVTcGVjaWZpY1Byb3BzJ10gPT4ge1xuICBjb25zdCBjb21wb3NlclN0ZXAgPSBnZXRDb21wb3NlclN0ZXAoc3RhdGUpO1xuICBzd2l0Y2ggKGNvbXBvc2VyU3RlcCkge1xuICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgaWYgKGdldFNob3dBcmNoaXZlZChzdGF0ZSkpIHtcbiAgICAgICAgY29uc3QgeyBhcmNoaXZlZENvbnZlcnNhdGlvbnMgfSA9IGdldExlZnRQYW5lTGlzdHMoc3RhdGUpO1xuICAgICAgICBjb25zdCBzZWFyY2hDb252ZXJzYXRpb24gPSBnZXRTZWFyY2hDb252ZXJzYXRpb24oc3RhdGUpO1xuICAgICAgICBjb25zdCBzZWFyY2hUZXJtID0gZ2V0UXVlcnkoc3RhdGUpO1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5BcmNoaXZlLFxuICAgICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9ucyxcbiAgICAgICAgICBzZWFyY2hDb252ZXJzYXRpb24sXG4gICAgICAgICAgc2VhcmNoVGVybSxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IGdldFN0YXJ0U2VhcmNoQ291bnRlcihzdGF0ZSksXG4gICAgICAgICAgLi4uKHNlYXJjaENvbnZlcnNhdGlvbiAmJiBzZWFyY2hUZXJtID8gZ2V0U2VhcmNoUmVzdWx0cyhzdGF0ZSkgOiB7fSksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICBpZiAoaXNTZWFyY2hpbmcoc3RhdGUpKSB7XG4gICAgICAgIGNvbnN0IHByaW1hcnlTZW5kc1NtcyA9IEJvb2xlYW4oXG4gICAgICAgICAgZ2V0KHN0YXRlLml0ZW1zLCBbJ3ByaW1hcnlTZW5kc1NtcyddLCBmYWxzZSlcbiAgICAgICAgKTtcblxuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5TZWFyY2gsXG4gICAgICAgICAgcHJpbWFyeVNlbmRzU21zLFxuICAgICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbjogZ2V0U2VhcmNoQ29udmVyc2F0aW9uKHN0YXRlKSxcbiAgICAgICAgICBzZWFyY2hEaXNhYmxlZDogc3RhdGUubmV0d29yay5jaGFsbGVuZ2VTdGF0dXMgIT09ICdpZGxlJyxcbiAgICAgICAgICBzdGFydFNlYXJjaENvdW50ZXI6IGdldFN0YXJ0U2VhcmNoQ291bnRlcihzdGF0ZSksXG4gICAgICAgICAgLi4uZ2V0U2VhcmNoUmVzdWx0cyhzdGF0ZSksXG4gICAgICAgIH07XG4gICAgICB9XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuSW5ib3gsXG4gICAgICAgIGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogZ2V0SXNTZWFyY2hpbmdJbkFDb252ZXJzYXRpb24oc3RhdGUpLFxuICAgICAgICBzZWFyY2hDb252ZXJzYXRpb246IGdldFNlYXJjaENvbnZlcnNhdGlvbihzdGF0ZSksXG4gICAgICAgIHNlYXJjaERpc2FibGVkOiBzdGF0ZS5uZXR3b3JrLmNoYWxsZW5nZVN0YXR1cyAhPT0gJ2lkbGUnLFxuICAgICAgICBzZWFyY2hUZXJtOiBnZXRRdWVyeShzdGF0ZSksXG4gICAgICAgIHN0YXJ0U2VhcmNoQ291bnRlcjogZ2V0U3RhcnRTZWFyY2hDb3VudGVyKHN0YXRlKSxcbiAgICAgICAgLi4uZ2V0TGVmdFBhbmVMaXN0cyhzdGF0ZSksXG4gICAgICB9O1xuICAgIGNhc2UgQ29tcG9zZXJTdGVwLlN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uOlxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNvbXBvc2UsXG4gICAgICAgIGNvbXBvc2VDb250YWN0czogZ2V0RmlsdGVyZWRDb21wb3NlQ29udGFjdHMoc3RhdGUpLFxuICAgICAgICBjb21wb3NlR3JvdXBzOiBnZXRGaWx0ZXJlZENvbXBvc2VHcm91cHMoc3RhdGUpLFxuICAgICAgICByZWdpb25Db2RlOiBnZXRSZWdpb25Db2RlKHN0YXRlKSxcbiAgICAgICAgc2VhcmNoVGVybTogZ2V0Q29tcG9zZXJDb252ZXJzYXRpb25TZWFyY2hUZXJtKHN0YXRlKSxcbiAgICAgICAgaXNVc2VybmFtZXNFbmFibGVkOiBnZXRVc2VybmFtZXNFbmFibGVkKHN0YXRlKSxcbiAgICAgICAgdXVpZEZldGNoU3RhdGU6IGdldENvbXBvc2VyVVVJREZldGNoU3RhdGUoc3RhdGUpLFxuICAgICAgfTtcbiAgICBjYXNlIENvbXBvc2VyU3RlcC5DaG9vc2VHcm91cE1lbWJlcnM6XG4gICAgICByZXR1cm4ge1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuQ2hvb3NlR3JvdXBNZW1iZXJzLFxuICAgICAgICBjYW5kaWRhdGVDb250YWN0czogZ2V0RmlsdGVyZWRDYW5kaWRhdGVDb250YWN0c0Zvck5ld0dyb3VwKHN0YXRlKSxcbiAgICAgICAgaXNTaG93aW5nUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbDpcbiAgICAgICAgICBnZXRSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGUoc3RhdGUpID09PVxuICAgICAgICAgIE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcsXG4gICAgICAgIGlzU2hvd2luZ01heGltdW1Hcm91cFNpemVNb2RhbDpcbiAgICAgICAgICBnZXRNYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZShzdGF0ZSkgPT09IE9uZVRpbWVNb2RhbFN0YXRlLlNob3dpbmcsXG4gICAgICAgIHJlZ2lvbkNvZGU6IGdldFJlZ2lvbkNvZGUoc3RhdGUpLFxuICAgICAgICBzZWFyY2hUZXJtOiBnZXRDb21wb3NlckNvbnZlcnNhdGlvblNlYXJjaFRlcm0oc3RhdGUpLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBnZXRDb21wb3NlU2VsZWN0ZWRDb250YWN0cyhzdGF0ZSksXG4gICAgICAgIGlzVXNlcm5hbWVzRW5hYmxlZDogZ2V0VXNlcm5hbWVzRW5hYmxlZChzdGF0ZSksXG4gICAgICAgIHV1aWRGZXRjaFN0YXRlOiBnZXRDb21wb3NlclVVSURGZXRjaFN0YXRlKHN0YXRlKSxcbiAgICAgIH07XG4gICAgY2FzZSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YTpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5TZXRHcm91cE1ldGFkYXRhLFxuICAgICAgICBncm91cEF2YXRhcjogZ2V0Q29tcG9zZUdyb3VwQXZhdGFyKHN0YXRlKSxcbiAgICAgICAgZ3JvdXBOYW1lOiBnZXRDb21wb3NlR3JvdXBOYW1lKHN0YXRlKSxcbiAgICAgICAgZ3JvdXBFeHBpcmVUaW1lcjogZ2V0Q29tcG9zZUdyb3VwRXhwaXJlVGltZXIoc3RhdGUpLFxuICAgICAgICBoYXNFcnJvcjogaGFzR3JvdXBDcmVhdGlvbkVycm9yKHN0YXRlKSxcbiAgICAgICAgaXNDcmVhdGluZzogaXNDcmVhdGluZ0dyb3VwKHN0YXRlKSxcbiAgICAgICAgaXNFZGl0aW5nQXZhdGFyOiBpc0VkaXRpbmdBdmF0YXIoc3RhdGUpLFxuICAgICAgICBzZWxlY3RlZENvbnRhY3RzOiBnZXRDb21wb3NlU2VsZWN0ZWRDb250YWN0cyhzdGF0ZSksXG4gICAgICAgIHVzZXJBdmF0YXJEYXRhOiBnZXRDb21wb3NlQXZhdGFyRGF0YShzdGF0ZSksXG4gICAgICB9O1xuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGNvbXBvc2VyU3RlcCk7XG4gIH1cbn07XG5cbmNvbnN0IG1hcFN0YXRlVG9Qcm9wcyA9IChzdGF0ZTogU3RhdGVUeXBlKSA9PiB7XG4gIHJldHVybiB7XG4gICAgbW9kZVNwZWNpZmljUHJvcHM6IGdldE1vZGVTcGVjaWZpY1Byb3BzKHN0YXRlKSxcbiAgICBwcmVmZXJyZWRXaWR0aEZyb21TdG9yYWdlOiBnZXRQcmVmZXJyZWRMZWZ0UGFuZVdpZHRoKHN0YXRlKSxcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkOiBnZXRTZWxlY3RlZENvbnZlcnNhdGlvbklkKHN0YXRlKSxcbiAgICBzZWxlY3RlZE1lc3NhZ2VJZDogZ2V0U2VsZWN0ZWRNZXNzYWdlKHN0YXRlKT8uaWQsXG4gICAgc2hvd0FyY2hpdmVkOiBnZXRTaG93QXJjaGl2ZWQoc3RhdGUpLFxuICAgIGdldFByZWZlcnJlZEJhZGdlOiBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yKHN0YXRlKSxcbiAgICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgICByZWdpb25Db2RlOiBnZXRSZWdpb25Db2RlKHN0YXRlKSxcbiAgICBjaGFsbGVuZ2VTdGF0dXM6IHN0YXRlLm5ldHdvcmsuY2hhbGxlbmdlU3RhdHVzLFxuICAgIGNyYXNoUmVwb3J0Q291bnQ6IHN0YXRlLmNyYXNoUmVwb3J0cy5jb3VudCxcbiAgICByZW5kZXJFeHBpcmVkQnVpbGREaWFsb2csXG4gICAgcmVuZGVyTWFpbkhlYWRlcixcbiAgICByZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0LFxuICAgIHJlbmRlck5ldHdvcmtTdGF0dXMsXG4gICAgcmVuZGVyUmVsaW5rRGlhbG9nLFxuICAgIHJlbmRlclVwZGF0ZURpYWxvZyxcbiAgICByZW5kZXJDYXB0Y2hhRGlhbG9nLFxuICAgIHJlbmRlckNyYXNoUmVwb3J0RGlhbG9nLFxuICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRMZWZ0UGFuZSA9IHNtYXJ0KExlZnRQYW5lKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIseUJBQXdCO0FBQ3hCLG9CQUFvQjtBQUNwQixxQkFBbUM7QUFFbkMsc0JBQXVDO0FBRXZDLDhCQUFpQztBQUNqQywyQ0FBOEM7QUFFOUMsZ0NBQWdEO0FBQ2hELG9CQU9PO0FBQ1Asa0JBQWlEO0FBQ2pELG9CQUEwQztBQUMxQyxtQkFHTztBQUNQLDJCQXFCTztBQUdQLGdDQUF3QztBQUN4Qyx3QkFBZ0M7QUFDaEMsaUNBQXlDO0FBQ3pDLDJCQUFtQztBQUNuQywwQkFBa0M7QUFDbEMsMEJBQWtDO0FBQ2xDLDJCQUFtQztBQUNuQywrQkFBdUM7QUFFdkMsa0NBQ0UsT0FDYTtBQUNiLFNBQU8sbURBQUM7QUFBQSxP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
