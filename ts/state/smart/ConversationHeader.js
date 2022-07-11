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
var ConversationHeader_exports = {};
__export(ConversationHeader_exports, {
  SmartConversationHeader: () => SmartConversationHeader
});
module.exports = __toCommonJS(ConversationHeader_exports);
var import_react_redux = require("react-redux");
var import_lodash = require("lodash");
var import_ConversationHeader = require("../../components/conversation/ConversationHeader");
var import_badges = require("../selectors/badges");
var import_conversations = require("../selectors/conversations");
var import_Calling = require("../../types/Calling");
var import_conversations2 = require("../ducks/conversations");
var import_calling = require("../ducks/calling");
var import_user = require("../selectors/user");
var import_getOwn = require("../../util/getOwn");
var import_missingCaseError = require("../../util/missingCaseError");
var import_isConversationSMSOnly = require("../../util/isConversationSMSOnly");
var import_assert = require("../../util/assert");
const getOutgoingCallButtonStyle = /* @__PURE__ */ __name((conversation, state) => {
  const { calling } = state;
  const ourUuid = (0, import_user.getUserUuid)(state);
  (0, import_assert.strictAssert)(ourUuid, "getOutgoingCallButtonStyle missing our uuid");
  if ((0, import_calling.getActiveCall)(calling)) {
    return import_ConversationHeader.OutgoingCallButtonStyle.None;
  }
  const conversationCallMode = (0, import_conversations2.getConversationCallMode)(conversation);
  switch (conversationCallMode) {
    case import_Calling.CallMode.None:
      return import_ConversationHeader.OutgoingCallButtonStyle.None;
    case import_Calling.CallMode.Direct:
      return import_ConversationHeader.OutgoingCallButtonStyle.Both;
    case import_Calling.CallMode.Group: {
      const call = (0, import_getOwn.getOwn)(calling.callsByConversation, conversation.id);
      if (call?.callMode === import_Calling.CallMode.Group && (0, import_calling.isAnybodyElseInGroupCall)(call.peekInfo, ourUuid)) {
        return import_ConversationHeader.OutgoingCallButtonStyle.Join;
      }
      return import_ConversationHeader.OutgoingCallButtonStyle.JustVideo;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(conversationCallMode);
  }
}, "getOutgoingCallButtonStyle");
const mapStateToProps = /* @__PURE__ */ __name((state, ownProps) => {
  const { id } = ownProps;
  const conversation = (0, import_conversations.getConversationSelector)(state)(id);
  if (!conversation) {
    throw new Error("Could not find conversation");
  }
  return {
    ...(0, import_lodash.pick)(conversation, [
      "acceptedMessageRequest",
      "announcementsOnly",
      "areWeAdmin",
      "avatarPath",
      "canChangeTimer",
      "color",
      "expireTimer",
      "groupVersion",
      "isArchived",
      "isMe",
      "isPinned",
      "isVerified",
      "left",
      "markedUnread",
      "muteExpiresAt",
      "name",
      "phoneNumber",
      "profileName",
      "sharedGroupNames",
      "title",
      "type",
      "unblurredAvatarPath"
    ]),
    badge: (0, import_badges.getPreferredBadgeSelector)(state)(conversation.badges),
    conversationTitle: state.conversations.selectedConversationTitle,
    isMissingMandatoryProfileSharing: (0, import_conversations.isMissingRequiredProfileSharing)(conversation),
    isSMSOnly: (0, import_isConversationSMSOnly.isConversationSMSOnly)(conversation),
    i18n: (0, import_user.getIntl)(state),
    showBackButton: state.conversations.selectedConversationPanelDepth > 0,
    outgoingCallButtonStyle: getOutgoingCallButtonStyle(conversation, state),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, {});
const SmartConversationHeader = smart(import_ConversationHeader.ConversationHeader);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartConversationHeader
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uSGVhZGVyLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBwaWNrIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7XG4gIENvbnZlcnNhdGlvbkhlYWRlcixcbiAgT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUsXG59IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL0NvbnZlcnNhdGlvbkhlYWRlcic7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQge1xuICBnZXRDb252ZXJzYXRpb25TZWxlY3RvcixcbiAgaXNNaXNzaW5nUmVxdWlyZWRQcm9maWxlU2hhcmluZyxcbn0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IENhbGxNb2RlIH0gZnJvbSAnLi4vLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvbkNhbGxNb2RlIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRBY3RpdmVDYWxsLCBpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwgfSBmcm9tICcuLi9kdWNrcy9jYWxsaW5nJztcbmltcG9ydCB7IGdldFVzZXJVdWlkLCBnZXRJbnRsLCBnZXRUaGVtZSB9IGZyb20gJy4uL3NlbGVjdG9ycy91c2VyJztcbmltcG9ydCB7IGdldE93biB9IGZyb20gJy4uLy4uL3V0aWwvZ2V0T3duJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25TTVNPbmx5IH0gZnJvbSAnLi4vLi4vdXRpbC9pc0NvbnZlcnNhdGlvblNNU09ubHknO1xuaW1wb3J0IHsgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuXG5leHBvcnQgdHlwZSBPd25Qcm9wcyA9IHtcbiAgaWQ6IHN0cmluZztcblxuICBvbkFyY2hpdmU6ICgpID0+IHZvaWQ7XG4gIG9uRGVsZXRlTWVzc2FnZXM6ICgpID0+IHZvaWQ7XG4gIG9uR29CYWNrOiAoKSA9PiB2b2lkO1xuICBvbk1hcmtVbnJlYWQ6ICgpID0+IHZvaWQ7XG4gIG9uTW92ZVRvSW5ib3g6ICgpID0+IHZvaWQ7XG4gIG9uT3V0Z29pbmdBdWRpb0NhbGxJbkNvbnZlcnNhdGlvbjogKCkgPT4gdm9pZDtcbiAgb25PdXRnb2luZ1ZpZGVvQ2FsbEluQ29udmVyc2F0aW9uOiAoKSA9PiB2b2lkO1xuICBvblNlYXJjaEluQ29udmVyc2F0aW9uOiAoKSA9PiB2b2lkO1xuICBvblNldERpc2FwcGVhcmluZ01lc3NhZ2VzOiAoc2Vjb25kczogbnVtYmVyKSA9PiB2b2lkO1xuICBvblNldE11dGVOb3RpZmljYXRpb25zOiAoc2Vjb25kczogbnVtYmVyKSA9PiB2b2lkO1xuICBvblNldFBpbjogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xuICBvblNob3dBbGxNZWRpYTogKCkgPT4gdm9pZDtcbiAgb25TaG93Q29udmVyc2F0aW9uRGV0YWlsczogKCkgPT4gdm9pZDtcbiAgb25TaG93R3JvdXBNZW1iZXJzOiAoKSA9PiB2b2lkO1xufTtcblxuY29uc3QgZ2V0T3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUgPSAoXG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZSxcbiAgc3RhdGU6IFN0YXRlVHlwZVxuKTogT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUgPT4ge1xuICBjb25zdCB7IGNhbGxpbmcgfSA9IHN0YXRlO1xuICBjb25zdCBvdXJVdWlkID0gZ2V0VXNlclV1aWQoc3RhdGUpO1xuICBzdHJpY3RBc3NlcnQob3VyVXVpZCwgJ2dldE91dGdvaW5nQ2FsbEJ1dHRvblN0eWxlIG1pc3Npbmcgb3VyIHV1aWQnKTtcblxuICBpZiAoZ2V0QWN0aXZlQ2FsbChjYWxsaW5nKSkge1xuICAgIHJldHVybiBPdXRnb2luZ0NhbGxCdXR0b25TdHlsZS5Ob25lO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uQ2FsbE1vZGUgPSBnZXRDb252ZXJzYXRpb25DYWxsTW9kZShjb252ZXJzYXRpb24pO1xuICBzd2l0Y2ggKGNvbnZlcnNhdGlvbkNhbGxNb2RlKSB7XG4gICAgY2FzZSBDYWxsTW9kZS5Ob25lOlxuICAgICAgcmV0dXJuIE91dGdvaW5nQ2FsbEJ1dHRvblN0eWxlLk5vbmU7XG4gICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICByZXR1cm4gT3V0Z29pbmdDYWxsQnV0dG9uU3R5bGUuQm90aDtcbiAgICBjYXNlIENhbGxNb2RlLkdyb3VwOiB7XG4gICAgICBjb25zdCBjYWxsID0gZ2V0T3duKGNhbGxpbmcuY2FsbHNCeUNvbnZlcnNhdGlvbiwgY29udmVyc2F0aW9uLmlkKTtcbiAgICAgIGlmIChcbiAgICAgICAgY2FsbD8uY2FsbE1vZGUgPT09IENhbGxNb2RlLkdyb3VwICYmXG4gICAgICAgIGlzQW55Ym9keUVsc2VJbkdyb3VwQ2FsbChjYWxsLnBlZWtJbmZvLCBvdXJVdWlkKVxuICAgICAgKSB7XG4gICAgICAgIHJldHVybiBPdXRnb2luZ0NhbGxCdXR0b25TdHlsZS5Kb2luO1xuICAgICAgfVxuICAgICAgcmV0dXJuIE91dGdvaW5nQ2FsbEJ1dHRvblN0eWxlLkp1c3RWaWRlbztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY29udmVyc2F0aW9uQ2FsbE1vZGUpO1xuICB9XG59O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgb3duUHJvcHM6IE93blByb3BzKSA9PiB7XG4gIGNvbnN0IHsgaWQgfSA9IG93blByb3BzO1xuXG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKShpZCk7XG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKCdDb3VsZCBub3QgZmluZCBjb252ZXJzYXRpb24nKTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgLi4ucGljayhjb252ZXJzYXRpb24sIFtcbiAgICAgICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0JyxcbiAgICAgICdhbm5vdW5jZW1lbnRzT25seScsXG4gICAgICAnYXJlV2VBZG1pbicsXG4gICAgICAnYXZhdGFyUGF0aCcsXG4gICAgICAnY2FuQ2hhbmdlVGltZXInLFxuICAgICAgJ2NvbG9yJyxcbiAgICAgICdleHBpcmVUaW1lcicsXG4gICAgICAnZ3JvdXBWZXJzaW9uJyxcbiAgICAgICdpc0FyY2hpdmVkJyxcbiAgICAgICdpc01lJyxcbiAgICAgICdpc1Bpbm5lZCcsXG4gICAgICAnaXNWZXJpZmllZCcsXG4gICAgICAnbGVmdCcsXG4gICAgICAnbWFya2VkVW5yZWFkJyxcbiAgICAgICdtdXRlRXhwaXJlc0F0JyxcbiAgICAgICduYW1lJyxcbiAgICAgICdwaG9uZU51bWJlcicsXG4gICAgICAncHJvZmlsZU5hbWUnLFxuICAgICAgJ3NoYXJlZEdyb3VwTmFtZXMnLFxuICAgICAgJ3RpdGxlJyxcbiAgICAgICd0eXBlJyxcbiAgICAgICd1bmJsdXJyZWRBdmF0YXJQYXRoJyxcbiAgICBdKSxcbiAgICBiYWRnZTogZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSkoY29udmVyc2F0aW9uLmJhZGdlcyksXG4gICAgY29udmVyc2F0aW9uVGl0bGU6IHN0YXRlLmNvbnZlcnNhdGlvbnMuc2VsZWN0ZWRDb252ZXJzYXRpb25UaXRsZSxcbiAgICBpc01pc3NpbmdNYW5kYXRvcnlQcm9maWxlU2hhcmluZzpcbiAgICAgIGlzTWlzc2luZ1JlcXVpcmVkUHJvZmlsZVNoYXJpbmcoY29udmVyc2F0aW9uKSxcbiAgICBpc1NNU09ubHk6IGlzQ29udmVyc2F0aW9uU01TT25seShjb252ZXJzYXRpb24pLFxuICAgIGkxOG46IGdldEludGwoc3RhdGUpLFxuICAgIHNob3dCYWNrQnV0dG9uOiBzdGF0ZS5jb252ZXJzYXRpb25zLnNlbGVjdGVkQ29udmVyc2F0aW9uUGFuZWxEZXB0aCA+IDAsXG4gICAgb3V0Z29pbmdDYWxsQnV0dG9uU3R5bGU6IGdldE91dGdvaW5nQ2FsbEJ1dHRvblN0eWxlKGNvbnZlcnNhdGlvbiwgc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCB7fSk7XG5cbmV4cG9ydCBjb25zdCBTbWFydENvbnZlcnNhdGlvbkhlYWRlciA9IHNtYXJ0KENvbnZlcnNhdGlvbkhlYWRlcik7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBQ3hCLG9CQUFxQjtBQUNyQixnQ0FHTztBQUNQLG9CQUEwQztBQUMxQywyQkFHTztBQUVQLHFCQUF5QjtBQUV6Qiw0QkFBd0M7QUFDeEMscUJBQXdEO0FBQ3hELGtCQUErQztBQUMvQyxvQkFBdUI7QUFDdkIsOEJBQWlDO0FBQ2pDLG1DQUFzQztBQUN0QyxvQkFBNkI7QUFxQjdCLE1BQU0sNkJBQTZCLHdCQUNqQyxjQUNBLFVBQzRCO0FBQzVCLFFBQU0sRUFBRSxZQUFZO0FBQ3BCLFFBQU0sVUFBVSw2QkFBWSxLQUFLO0FBQ2pDLGtDQUFhLFNBQVMsNkNBQTZDO0FBRW5FLE1BQUksa0NBQWMsT0FBTyxHQUFHO0FBQzFCLFdBQU8sa0RBQXdCO0FBQUEsRUFDakM7QUFFQSxRQUFNLHVCQUF1QixtREFBd0IsWUFBWTtBQUNqRSxVQUFRO0FBQUEsU0FDRCx3QkFBUztBQUNaLGFBQU8sa0RBQXdCO0FBQUEsU0FDNUIsd0JBQVM7QUFDWixhQUFPLGtEQUF3QjtBQUFBLFNBQzVCLHdCQUFTLE9BQU87QUFDbkIsWUFBTSxPQUFPLDBCQUFPLFFBQVEscUJBQXFCLGFBQWEsRUFBRTtBQUNoRSxVQUNFLE1BQU0sYUFBYSx3QkFBUyxTQUM1Qiw2Q0FBeUIsS0FBSyxVQUFVLE9BQU8sR0FDL0M7QUFDQSxlQUFPLGtEQUF3QjtBQUFBLE1BQ2pDO0FBQ0EsYUFBTyxrREFBd0I7QUFBQSxJQUNqQztBQUFBO0FBRUUsWUFBTSw4Q0FBaUIsb0JBQW9CO0FBQUE7QUFFakQsR0EvQm1DO0FBaUNuQyxNQUFNLGtCQUFrQix3QkFBQyxPQUFrQixhQUF1QjtBQUNoRSxRQUFNLEVBQUUsT0FBTztBQUVmLFFBQU0sZUFBZSxrREFBd0IsS0FBSyxFQUFFLEVBQUU7QUFDdEQsTUFBSSxDQUFDLGNBQWM7QUFDakIsVUFBTSxJQUFJLE1BQU0sNkJBQTZCO0FBQUEsRUFDL0M7QUFFQSxTQUFPO0FBQUEsT0FDRix3QkFBSyxjQUFjO0FBQUEsTUFDcEI7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNGLENBQUM7QUFBQSxJQUNELE9BQU8sNkNBQTBCLEtBQUssRUFBRSxhQUFhLE1BQU07QUFBQSxJQUMzRCxtQkFBbUIsTUFBTSxjQUFjO0FBQUEsSUFDdkMsa0NBQ0UsMERBQWdDLFlBQVk7QUFBQSxJQUM5QyxXQUFXLHdEQUFzQixZQUFZO0FBQUEsSUFDN0MsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkIsZ0JBQWdCLE1BQU0sY0FBYyxpQ0FBaUM7QUFBQSxJQUNyRSx5QkFBeUIsMkJBQTJCLGNBQWMsS0FBSztBQUFBLElBQ3ZFLE9BQU8sMEJBQVMsS0FBSztBQUFBLEVBQ3ZCO0FBQ0YsR0EzQ3dCO0FBNkN4QixNQUFNLFFBQVEsZ0NBQVEsaUJBQWlCLENBQUMsQ0FBQztBQUVsQyxNQUFNLDBCQUEwQixNQUFNLDRDQUFrQjsiLAogICJuYW1lcyI6IFtdCn0K
