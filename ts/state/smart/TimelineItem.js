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
var TimelineItem_exports = {};
__export(TimelineItem_exports, {
  SmartTimelineItem: () => SmartTimelineItem
});
module.exports = __toCommonJS(TimelineItem_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_actions = require("../actions");
var import_TimelineItem = require("../../components/conversation/TimelineItem");
var import_badges = require("../selectors/badges");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
var import_timelineUtil = require("../../util/timelineUtil");
var import_ContactName = require("./ContactName");
var import_UniversalTimerNotification = require("./UniversalTimerNotification");
var import_timestamp = require("../../util/timestamp");
function renderContact(conversationId) {
  return /* @__PURE__ */ import_react.default.createElement(import_ContactName.SmartContactName, {
    conversationId
  });
}
function renderUniversalTimerNotification() {
  return /* @__PURE__ */ import_react.default.createElement(import_UniversalTimerNotification.SmartUniversalTimerNotification, null);
}
const mapStateToProps = /* @__PURE__ */ __name((state, props) => {
  const {
    containerElementRef,
    conversationId,
    isOldestTimelineItem,
    messageId,
    nextMessageId,
    previousMessageId,
    unreadIndicatorPlacement
  } = props;
  const messageSelector = (0, import_conversations.getMessageSelector)(state);
  const item = messageSelector(messageId);
  const previousItem = previousMessageId ? messageSelector(previousMessageId) : void 0;
  const nextItem = nextMessageId ? messageSelector(nextMessageId) : void 0;
  const selectedMessage = (0, import_conversations.getSelectedMessage)(state);
  const isSelected = Boolean(selectedMessage && messageId === selectedMessage.id);
  const conversation = (0, import_conversations.getConversationSelector)(state)(conversationId);
  const isNextItemCallingNotification = nextItem?.type === "callHistory";
  const shouldCollapseAbove = (0, import_timelineUtil.areMessagesInSameGroup)(previousItem, unreadIndicatorPlacement === import_timelineUtil.UnreadIndicatorPlacement.JustAbove, item);
  const shouldCollapseBelow = (0, import_timelineUtil.areMessagesInSameGroup)(item, unreadIndicatorPlacement === import_timelineUtil.UnreadIndicatorPlacement.JustBelow, nextItem);
  const shouldHideMetadata = (0, import_timelineUtil.shouldCurrentMessageHideMetadata)(shouldCollapseBelow, item, nextItem);
  const shouldRenderDateHeader = isOldestTimelineItem || Boolean(item && previousItem && item.timestamp > previousItem.timestamp && !(0, import_timestamp.isSameDay)(previousItem.timestamp, item.timestamp));
  return {
    item,
    id: messageId,
    containerElementRef,
    conversationId,
    conversationColor: conversation.conversationColor,
    customColor: conversation.customColor,
    getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
    isNextItemCallingNotification,
    isSelected,
    renderContact,
    renderUniversalTimerNotification,
    shouldCollapseAbove,
    shouldCollapseBelow,
    shouldHideMetadata,
    shouldRenderDateHeader,
    i18n: (0, import_user.getIntl)(state),
    interactionMode: (0, import_user.getInteractionMode)(state),
    theme: (0, import_user.getTheme)(state)
  };
}, "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartTimelineItem = smart(import_TimelineItem.TimelineItem);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartTimelineItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVJdGVtLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5cbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcblxuaW1wb3J0IHsgVGltZWxpbmVJdGVtIH0gZnJvbSAnLi4vLi4vY29tcG9uZW50cy9jb252ZXJzYXRpb24vVGltZWxpbmVJdGVtJztcbmltcG9ydCB7IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3IgfSBmcm9tICcuLi9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IGdldEludGwsIGdldEludGVyYWN0aW9uTW9kZSwgZ2V0VGhlbWUgfSBmcm9tICcuLi9zZWxlY3RvcnMvdXNlcic7XG5pbXBvcnQge1xuICBnZXRDb252ZXJzYXRpb25TZWxlY3RvcixcbiAgZ2V0TWVzc2FnZVNlbGVjdG9yLFxuICBnZXRTZWxlY3RlZE1lc3NhZ2UsXG59IGZyb20gJy4uL3NlbGVjdG9ycy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7XG4gIGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAsXG4gIHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhLFxuICBVbnJlYWRJbmRpY2F0b3JQbGFjZW1lbnQsXG59IGZyb20gJy4uLy4uL3V0aWwvdGltZWxpbmVVdGlsJztcblxuaW1wb3J0IHsgU21hcnRDb250YWN0TmFtZSB9IGZyb20gJy4vQ29udGFjdE5hbWUnO1xuaW1wb3J0IHsgU21hcnRVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbiB9IGZyb20gJy4vVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgaXNTYW1lRGF5IH0gZnJvbSAnLi4vLi4vdXRpbC90aW1lc3RhbXAnO1xuXG50eXBlIEV4dGVybmFsUHJvcHMgPSB7XG4gIGNvbnRhaW5lckVsZW1lbnRSZWY6IFJlZk9iamVjdDxIVE1MRWxlbWVudD47XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGlzT2xkZXN0VGltZWxpbmVJdGVtOiBib29sZWFuO1xuICBtZXNzYWdlSWQ6IHN0cmluZztcbiAgbmV4dE1lc3NhZ2VJZDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICBwcmV2aW91c01lc3NhZ2VJZDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICB1bnJlYWRJbmRpY2F0b3JQbGFjZW1lbnQ6IHVuZGVmaW5lZCB8IFVucmVhZEluZGljYXRvclBsYWNlbWVudDtcbn07XG5cbmZ1bmN0aW9uIHJlbmRlckNvbnRhY3QoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydENvbnRhY3ROYW1lIGNvbnZlcnNhdGlvbklkPXtjb252ZXJzYXRpb25JZH0gLz47XG59XG5cbmZ1bmN0aW9uIHJlbmRlclVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uKCk6IEpTWC5FbGVtZW50IHtcbiAgcmV0dXJuIDxTbWFydFVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uIC8+O1xufVxuXG5jb25zdCBtYXBTdGF0ZVRvUHJvcHMgPSAoc3RhdGU6IFN0YXRlVHlwZSwgcHJvcHM6IEV4dGVybmFsUHJvcHMpID0+IHtcbiAgY29uc3Qge1xuICAgIGNvbnRhaW5lckVsZW1lbnRSZWYsXG4gICAgY29udmVyc2F0aW9uSWQsXG4gICAgaXNPbGRlc3RUaW1lbGluZUl0ZW0sXG4gICAgbWVzc2FnZUlkLFxuICAgIG5leHRNZXNzYWdlSWQsXG4gICAgcHJldmlvdXNNZXNzYWdlSWQsXG4gICAgdW5yZWFkSW5kaWNhdG9yUGxhY2VtZW50LFxuICB9ID0gcHJvcHM7XG5cbiAgY29uc3QgbWVzc2FnZVNlbGVjdG9yID0gZ2V0TWVzc2FnZVNlbGVjdG9yKHN0YXRlKTtcblxuICBjb25zdCBpdGVtID0gbWVzc2FnZVNlbGVjdG9yKG1lc3NhZ2VJZCk7XG4gIGNvbnN0IHByZXZpb3VzSXRlbSA9IHByZXZpb3VzTWVzc2FnZUlkXG4gICAgPyBtZXNzYWdlU2VsZWN0b3IocHJldmlvdXNNZXNzYWdlSWQpXG4gICAgOiB1bmRlZmluZWQ7XG4gIGNvbnN0IG5leHRJdGVtID0gbmV4dE1lc3NhZ2VJZCA/IG1lc3NhZ2VTZWxlY3RvcihuZXh0TWVzc2FnZUlkKSA6IHVuZGVmaW5lZDtcblxuICBjb25zdCBzZWxlY3RlZE1lc3NhZ2UgPSBnZXRTZWxlY3RlZE1lc3NhZ2Uoc3RhdGUpO1xuICBjb25zdCBpc1NlbGVjdGVkID0gQm9vbGVhbihcbiAgICBzZWxlY3RlZE1lc3NhZ2UgJiYgbWVzc2FnZUlkID09PSBzZWxlY3RlZE1lc3NhZ2UuaWRcbiAgKTtcblxuICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSkoY29udmVyc2F0aW9uSWQpO1xuXG4gIGNvbnN0IGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uID0gbmV4dEl0ZW0/LnR5cGUgPT09ICdjYWxsSGlzdG9yeSc7XG5cbiAgY29uc3Qgc2hvdWxkQ29sbGFwc2VBYm92ZSA9IGFyZU1lc3NhZ2VzSW5TYW1lR3JvdXAoXG4gICAgcHJldmlvdXNJdGVtLFxuICAgIHVucmVhZEluZGljYXRvclBsYWNlbWVudCA9PT0gVW5yZWFkSW5kaWNhdG9yUGxhY2VtZW50Lkp1c3RBYm92ZSxcbiAgICBpdGVtXG4gICk7XG4gIGNvbnN0IHNob3VsZENvbGxhcHNlQmVsb3cgPSBhcmVNZXNzYWdlc0luU2FtZUdyb3VwKFxuICAgIGl0ZW0sXG4gICAgdW5yZWFkSW5kaWNhdG9yUGxhY2VtZW50ID09PSBVbnJlYWRJbmRpY2F0b3JQbGFjZW1lbnQuSnVzdEJlbG93LFxuICAgIG5leHRJdGVtXG4gICk7XG4gIGNvbnN0IHNob3VsZEhpZGVNZXRhZGF0YSA9IHNob3VsZEN1cnJlbnRNZXNzYWdlSGlkZU1ldGFkYXRhKFxuICAgIHNob3VsZENvbGxhcHNlQmVsb3csXG4gICAgaXRlbSxcbiAgICBuZXh0SXRlbVxuICApO1xuICBjb25zdCBzaG91bGRSZW5kZXJEYXRlSGVhZGVyID1cbiAgICBpc09sZGVzdFRpbWVsaW5lSXRlbSB8fFxuICAgIEJvb2xlYW4oXG4gICAgICBpdGVtICYmXG4gICAgICAgIHByZXZpb3VzSXRlbSAmJlxuICAgICAgICAvLyBUaGlzIGNvbXBhcmlzb24gYXZvaWRzIHN0cmFuZ2UgaGVhZGVyIGJlaGF2aW9yIGZvciBvdXQtb2Ytb3JkZXIgbWVzc2FnZXMuXG4gICAgICAgIGl0ZW0udGltZXN0YW1wID4gcHJldmlvdXNJdGVtLnRpbWVzdGFtcCAmJlxuICAgICAgICAhaXNTYW1lRGF5KHByZXZpb3VzSXRlbS50aW1lc3RhbXAsIGl0ZW0udGltZXN0YW1wKVxuICAgICk7XG5cbiAgcmV0dXJuIHtcbiAgICBpdGVtLFxuICAgIGlkOiBtZXNzYWdlSWQsXG4gICAgY29udGFpbmVyRWxlbWVudFJlZixcbiAgICBjb252ZXJzYXRpb25JZCxcbiAgICBjb252ZXJzYXRpb25Db2xvcjogY29udmVyc2F0aW9uLmNvbnZlcnNhdGlvbkNvbG9yLFxuICAgIGN1c3RvbUNvbG9yOiBjb252ZXJzYXRpb24uY3VzdG9tQ29sb3IsXG4gICAgZ2V0UHJlZmVycmVkQmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpLFxuICAgIGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uLFxuICAgIGlzU2VsZWN0ZWQsXG4gICAgcmVuZGVyQ29udGFjdCxcbiAgICByZW5kZXJVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbixcbiAgICBzaG91bGRDb2xsYXBzZUFib3ZlLFxuICAgIHNob3VsZENvbGxhcHNlQmVsb3csXG4gICAgc2hvdWxkSGlkZU1ldGFkYXRhLFxuICAgIHNob3VsZFJlbmRlckRhdGVIZWFkZXIsXG4gICAgaTE4bjogZ2V0SW50bChzdGF0ZSksXG4gICAgaW50ZXJhY3Rpb25Nb2RlOiBnZXRJbnRlcmFjdGlvbk1vZGUoc3RhdGUpLFxuICAgIHRoZW1lOiBnZXRUaGVtZShzdGF0ZSksXG4gIH07XG59O1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRUaW1lbGluZUl0ZW0gPSBzbWFydChUaW1lbGluZUl0ZW0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFrQjtBQUNsQix5QkFBd0I7QUFFeEIscUJBQW1DO0FBR25DLDBCQUE2QjtBQUM3QixvQkFBMEM7QUFDMUMsa0JBQXNEO0FBQ3RELDJCQUlPO0FBQ1AsMEJBSU87QUFFUCx5QkFBaUM7QUFDakMsd0NBQWdEO0FBQ2hELHVCQUEwQjtBQVkxQix1QkFBdUIsZ0JBQXFDO0FBQzFELFNBQU8sbURBQUM7QUFBQSxJQUFpQjtBQUFBLEdBQWdDO0FBQzNEO0FBRlMsQUFJVCw0Q0FBeUQ7QUFDdkQsU0FBTyxtREFBQyx1RUFBZ0M7QUFDMUM7QUFGUyxBQUlULE1BQU0sa0JBQWtCLHdCQUFDLE9BQWtCLFVBQXlCO0FBQ2xFLFFBQU07QUFBQSxJQUNKO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsTUFDRTtBQUVKLFFBQU0sa0JBQWtCLDZDQUFtQixLQUFLO0FBRWhELFFBQU0sT0FBTyxnQkFBZ0IsU0FBUztBQUN0QyxRQUFNLGVBQWUsb0JBQ2pCLGdCQUFnQixpQkFBaUIsSUFDakM7QUFDSixRQUFNLFdBQVcsZ0JBQWdCLGdCQUFnQixhQUFhLElBQUk7QUFFbEUsUUFBTSxrQkFBa0IsNkNBQW1CLEtBQUs7QUFDaEQsUUFBTSxhQUFhLFFBQ2pCLG1CQUFtQixjQUFjLGdCQUFnQixFQUNuRDtBQUVBLFFBQU0sZUFBZSxrREFBd0IsS0FBSyxFQUFFLGNBQWM7QUFFbEUsUUFBTSxnQ0FBZ0MsVUFBVSxTQUFTO0FBRXpELFFBQU0sc0JBQXNCLGdEQUMxQixjQUNBLDZCQUE2Qiw2Q0FBeUIsV0FDdEQsSUFDRjtBQUNBLFFBQU0sc0JBQXNCLGdEQUMxQixNQUNBLDZCQUE2Qiw2Q0FBeUIsV0FDdEQsUUFDRjtBQUNBLFFBQU0scUJBQXFCLDBEQUN6QixxQkFDQSxNQUNBLFFBQ0Y7QUFDQSxRQUFNLHlCQUNKLHdCQUNBLFFBQ0UsUUFDRSxnQkFFQSxLQUFLLFlBQVksYUFBYSxhQUM5QixDQUFDLGdDQUFVLGFBQWEsV0FBVyxLQUFLLFNBQVMsQ0FDckQ7QUFFRixTQUFPO0FBQUEsSUFDTDtBQUFBLElBQ0EsSUFBSTtBQUFBLElBQ0o7QUFBQSxJQUNBO0FBQUEsSUFDQSxtQkFBbUIsYUFBYTtBQUFBLElBQ2hDLGFBQWEsYUFBYTtBQUFBLElBQzFCLG1CQUFtQiw2Q0FBMEIsS0FBSztBQUFBLElBQ2xEO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0EsTUFBTSx5QkFBUSxLQUFLO0FBQUEsSUFDbkIsaUJBQWlCLG9DQUFtQixLQUFLO0FBQUEsSUFDekMsT0FBTywwQkFBUyxLQUFLO0FBQUEsRUFDdkI7QUFDRixHQXpFd0I7QUEyRXhCLE1BQU0sUUFBUSxnQ0FBUSxpQkFBaUIsaUNBQWtCO0FBRWxELE1BQU0sb0JBQW9CLE1BQU0sZ0NBQVk7IiwKICAibmFtZXMiOiBbXQp9Cg==
