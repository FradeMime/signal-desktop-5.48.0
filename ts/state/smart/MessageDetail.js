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
var MessageDetail_exports = {};
__export(MessageDetail_exports, {
  Contact: () => import_MessageDetail2.Contact,
  SmartMessageDetail: () => SmartMessageDetail
});
module.exports = __toCommonJS(MessageDetail_exports);
var import_react_redux = require("react-redux");
var import_MessageDetail = require("../../components/conversation/MessageDetail");
var import_actions = require("../actions");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
var import_renderAudioAttachment = require("./renderAudioAttachment");
var import_renderEmojiPicker = require("./renderEmojiPicker");
var import_renderReactionPicker = require("./renderReactionPicker");
var import_conversations = require("../selectors/conversations");
var import_MessageDetail2 = require("../../components/conversation/MessageDetail");
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const {
    contacts,
    errors,
    message,
    receivedAt,
    sentAt,
    showSafetyNumber,
    displayTapToViewMessage,
    kickOffAttachmentDownload,
    markAttachmentAsCorrupted,
    markViewed,
    openConversation,
    openGiftBadge,
    openLink,
    reactToMessage,
    replyToMessage,
    retryDeleteForEveryone,
    retrySend,
    showContactDetail,
    showContactModal,
    showExpiredIncomingTapToViewToast,
    showExpiredOutgoingTapToViewToast,
    showForwardMessageModal,
    showVisualAttachment,
    startConversation
  } = props;
  const contactNameColor = message.conversationType === "group" ? (0, import_conversations.getContactNameColorSelector)(state)(message.conversationId, message.author.id) : void 0;
  const getPreferredBadge = (0, import_badges.getPreferredBadgeSelector)(state);
  return {
    contacts,
    contactNameColor,
    errors,
    message,
    receivedAt,
    sentAt,
    getPreferredBadge,
    i18n: (0, import_user.getIntl)(state),
    interactionMode: (0, import_user.getInteractionMode)(state),
    theme: (0, import_user.getTheme)(state),
    showSafetyNumber,
    displayTapToViewMessage,
    kickOffAttachmentDownload,
    markAttachmentAsCorrupted,
    markViewed,
    openConversation,
    openGiftBadge,
    openLink,
    reactToMessage,
    renderAudioAttachment: import_renderAudioAttachment.renderAudioAttachment,
    renderEmojiPicker: import_renderEmojiPicker.renderEmojiPicker,
    renderReactionPicker: import_renderReactionPicker.renderReactionPicker,
    replyToMessage,
    retryDeleteForEveryone,
    retrySend,
    showContactDetail,
    showContactModal,
    showExpiredIncomingTapToViewToast,
    showExpiredOutgoingTapToViewToast,
    showForwardMessageModal,
    showVisualAttachment,
    startConversation
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartMessageDetail = smart(import_MessageDetail.MessageDetail);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Contact,
  SmartMessageDetail
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZURldGFpbC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgY29ubmVjdCB9IGZyb20gJ3JlYWN0LXJlZHV4JztcblxuaW1wb3J0IHR5cGUgeyBFeHRlcm5hbFByb3BzIGFzIE1lc3NhZ2VEZXRhaWxQcm9wcyB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL01lc3NhZ2VEZXRhaWwnO1xuaW1wb3J0IHsgTWVzc2FnZURldGFpbCB9IGZyb20gJy4uLy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL01lc3NhZ2VEZXRhaWwnO1xuXG5pbXBvcnQgeyBtYXBEaXNwYXRjaFRvUHJvcHMgfSBmcm9tICcuLi9hY3Rpb25zJztcbmltcG9ydCB0eXBlIHsgU3RhdGVUeXBlIH0gZnJvbSAnLi4vcmVkdWNlcic7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgeyBnZXRJbnRsLCBnZXRJbnRlcmFjdGlvbk1vZGUsIGdldFRoZW1lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgcmVuZGVyQXVkaW9BdHRhY2htZW50IH0gZnJvbSAnLi9yZW5kZXJBdWRpb0F0dGFjaG1lbnQnO1xuaW1wb3J0IHsgcmVuZGVyRW1vamlQaWNrZXIgfSBmcm9tICcuL3JlbmRlckVtb2ppUGlja2VyJztcbmltcG9ydCB7IHJlbmRlclJlYWN0aW9uUGlja2VyIH0gZnJvbSAnLi9yZW5kZXJSZWFjdGlvblBpY2tlcic7XG5pbXBvcnQgeyBnZXRDb250YWN0TmFtZUNvbG9yU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvY29udmVyc2F0aW9ucyc7XG5cbmV4cG9ydCB7IENvbnRhY3QgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL2NvbnZlcnNhdGlvbi9NZXNzYWdlRGV0YWlsJztcbmV4cG9ydCB0eXBlIE93blByb3BzID0gT21pdDxcbiAgTWVzc2FnZURldGFpbFByb3BzLFxuICB8ICdnZXRQcmVmZXJyZWRCYWRnZSdcbiAgfCAnaTE4bidcbiAgfCAnaW50ZXJhY3Rpb25Nb2RlJ1xuICB8ICdyZW5kZXJBdWRpb0F0dGFjaG1lbnQnXG4gIHwgJ3JlbmRlckVtb2ppUGlja2VyJ1xuICB8ICdyZW5kZXJSZWFjdGlvblBpY2tlcidcbiAgfCAndGhlbWUnXG4+O1xuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoXG4gIHN0YXRlOiBTdGF0ZVR5cGUsXG4gIHByb3BzOiBPd25Qcm9wc1xuKTogTWVzc2FnZURldGFpbFByb3BzID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbnRhY3RzLFxuICAgIGVycm9ycyxcbiAgICBtZXNzYWdlLFxuICAgIHJlY2VpdmVkQXQsXG4gICAgc2VudEF0LFxuXG4gICAgc2hvd1NhZmV0eU51bWJlcixcblxuICAgIGRpc3BsYXlUYXBUb1ZpZXdNZXNzYWdlLFxuICAgIGtpY2tPZmZBdHRhY2htZW50RG93bmxvYWQsXG4gICAgbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZCxcbiAgICBtYXJrVmlld2VkLFxuICAgIG9wZW5Db252ZXJzYXRpb24sXG4gICAgb3BlbkdpZnRCYWRnZSxcbiAgICBvcGVuTGluayxcbiAgICByZWFjdFRvTWVzc2FnZSxcbiAgICByZXBseVRvTWVzc2FnZSxcbiAgICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lLFxuICAgIHJldHJ5U2VuZCxcbiAgICBzaG93Q29udGFjdERldGFpbCxcbiAgICBzaG93Q29udGFjdE1vZGFsLFxuICAgIHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCxcbiAgICBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwsXG4gICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQsXG4gICAgc3RhcnRDb252ZXJzYXRpb24sXG4gIH0gPSBwcm9wcztcblxuICBjb25zdCBjb250YWN0TmFtZUNvbG9yID1cbiAgICBtZXNzYWdlLmNvbnZlcnNhdGlvblR5cGUgPT09ICdncm91cCdcbiAgICAgID8gZ2V0Q29udGFjdE5hbWVDb2xvclNlbGVjdG9yKHN0YXRlKShcbiAgICAgICAgICBtZXNzYWdlLmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIG1lc3NhZ2UuYXV0aG9yLmlkXG4gICAgICAgIClcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gIGNvbnN0IGdldFByZWZlcnJlZEJhZGdlID0gZ2V0UHJlZmVycmVkQmFkZ2VTZWxlY3RvcihzdGF0ZSk7XG5cbiAgcmV0dXJuIHtcbiAgICBjb250YWN0cyxcbiAgICBjb250YWN0TmFtZUNvbG9yLFxuICAgIGVycm9ycyxcbiAgICBtZXNzYWdlLFxuICAgIHJlY2VpdmVkQXQsXG4gICAgc2VudEF0LFxuXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgaW50ZXJhY3Rpb25Nb2RlOiBnZXRJbnRlcmFjdGlvbk1vZGUoc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG5cbiAgICBzaG93U2FmZXR5TnVtYmVyLFxuXG4gICAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2UsXG4gICAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZCxcbiAgICBtYXJrQXR0YWNobWVudEFzQ29ycnVwdGVkLFxuICAgIG1hcmtWaWV3ZWQsXG4gICAgb3BlbkNvbnZlcnNhdGlvbixcbiAgICBvcGVuR2lmdEJhZGdlLFxuICAgIG9wZW5MaW5rLFxuICAgIHJlYWN0VG9NZXNzYWdlLFxuICAgIHJlbmRlckF1ZGlvQXR0YWNobWVudCxcbiAgICByZW5kZXJFbW9qaVBpY2tlcixcbiAgICByZW5kZXJSZWFjdGlvblBpY2tlcixcbiAgICByZXBseVRvTWVzc2FnZSxcbiAgICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lLFxuICAgIHJldHJ5U2VuZCxcbiAgICBzaG93Q29udGFjdERldGFpbCxcbiAgICBzaG93Q29udGFjdE1vZGFsLFxuICAgIHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCxcbiAgICBzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QsXG4gICAgc2hvd0ZvcndhcmRNZXNzYWdlTW9kYWwsXG4gICAgc2hvd1Zpc3VhbEF0dGFjaG1lbnQsXG4gICAgc3RhcnRDb252ZXJzYXRpb24sXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuZXhwb3J0IGNvbnN0IFNtYXJ0TWVzc2FnZURldGFpbCA9IHNtYXJ0KE1lc3NhZ2VEZXRhaWwpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EseUJBQXdCO0FBR3hCLDJCQUE4QjtBQUU5QixxQkFBbUM7QUFFbkMsb0JBQTBDO0FBQzFDLGtCQUFzRDtBQUN0RCxtQ0FBc0M7QUFDdEMsK0JBQWtDO0FBQ2xDLGtDQUFxQztBQUNyQywyQkFBNEM7QUFFNUMsNEJBQXdCO0FBWXhCLE1BQU0sa0JBQWtCLHdCQUN0QixPQUNBLFVBQ3VCO0FBQ3ZCLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUVBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxNQUNFO0FBRUosUUFBTSxtQkFDSixRQUFRLHFCQUFxQixVQUN6QixzREFBNEIsS0FBSyxFQUMvQixRQUFRLGdCQUNSLFFBQVEsT0FBTyxFQUNqQixJQUNBO0FBRU4sUUFBTSxvQkFBb0IsNkNBQTBCLEtBQUs7QUFFekQsU0FBTztBQUFBLElBQ0w7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBRUE7QUFBQSxJQUNBLE1BQU0seUJBQVEsS0FBSztBQUFBLElBQ25CLGlCQUFpQixvQ0FBbUIsS0FBSztBQUFBLElBQ3pDLE9BQU8sMEJBQVMsS0FBSztBQUFBLElBRXJCO0FBQUEsSUFFQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFDRjtBQUNGLEdBaEZ3QjtBQWtGeEIsTUFBTSxRQUFRLGdDQUFRLGlCQUFpQixpQ0FBa0I7QUFDbEQsTUFBTSxxQkFBcUIsTUFBTSxrQ0FBYTsiLAogICJuYW1lcyI6IFtdCn0K
