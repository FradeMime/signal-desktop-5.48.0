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
var ConversationList_exports = {};
__export(ConversationList_exports, {
  ConversationList: () => ConversationList,
  RowType: () => RowType
});
module.exports = __toCommonJS(ConversationList_exports);
var import_react = __toESM(require("react"));
var import_react_virtualized = require("react-virtualized");
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_missingCaseError = require("../util/missingCaseError");
var import_assert = require("../util/assert");
var import_Util = require("../types/Util");
var import_util = require("./_util");
var import_ConversationListItem = require("./conversationList/ConversationListItem");
var import_ContactListItem = require("./conversationList/ContactListItem");
var import_ContactCheckbox = require("./conversationList/ContactCheckbox");
var import_PhoneNumberCheckbox = require("./conversationList/PhoneNumberCheckbox");
var import_UsernameCheckbox = require("./conversationList/UsernameCheckbox");
var import_CreateNewGroupButton = require("./conversationList/CreateNewGroupButton");
var import_StartNewConversation = require("./conversationList/StartNewConversation");
var import_SearchResultsLoadingFakeHeader = require("./conversationList/SearchResultsLoadingFakeHeader");
var import_SearchResultsLoadingFakeRow = require("./conversationList/SearchResultsLoadingFakeRow");
var import_UsernameSearchResultListItem = require("./conversationList/UsernameSearchResultListItem");
var RowType = /* @__PURE__ */ ((RowType2) => {
  RowType2["ArchiveButton"] = "ArchiveButton";
  RowType2["Blank"] = "Blank";
  RowType2["Contact"] = "Contact";
  RowType2["ContactCheckbox"] = "ContactCheckbox";
  RowType2["PhoneNumberCheckbox"] = "PhoneNumberCheckbox";
  RowType2["UsernameCheckbox"] = "UsernameCheckbox";
  RowType2["Conversation"] = "Conversation";
  RowType2["CreateNewGroup"] = "CreateNewGroup";
  RowType2["Header"] = "Header";
  RowType2["MessageSearchResult"] = "MessageSearchResult";
  RowType2["SearchResultsLoadingFakeHeader"] = "SearchResultsLoadingFakeHeader";
  RowType2["SearchResultsLoadingFakeRow"] = "SearchResultsLoadingFakeRow";
  RowType2["StartNewConversation"] = "StartNewConversation";
  RowType2["UsernameSearchResult"] = "UsernameSearchResult";
  return RowType2;
})(RowType || {});
const NORMAL_ROW_HEIGHT = 76;
const HEADER_ROW_HEIGHT = 40;
const ConversationList = /* @__PURE__ */ __name(({
  dimensions,
  getPreferredBadge,
  getRow,
  i18n,
  onClickArchiveButton,
  onClickContactCheckbox,
  onSelectConversation,
  renderMessageSearchResult,
  rowCount,
  scrollBehavior = import_Util.ScrollBehavior.Default,
  scrollToRowIndex,
  scrollable = true,
  shouldRecomputeRowHeights,
  showChooseGroupMembers,
  lookupConversationWithoutUuid,
  showUserNotFoundModal,
  setIsFetchingUUID,
  showConversation,
  theme
}) => {
  const listRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    const list = listRef.current;
    if (shouldRecomputeRowHeights && list) {
      list.recomputeRowHeights();
    }
  });
  const calculateRowHeight = (0, import_react.useCallback)(({ index }) => {
    const row = getRow(index);
    if (!row) {
      (0, import_assert.assert)(false, `Expected a row at index ${index}`);
      return NORMAL_ROW_HEIGHT;
    }
    switch (row.type) {
      case "Header" /* Header */:
      case "SearchResultsLoadingFakeHeader" /* SearchResultsLoadingFakeHeader */:
        return HEADER_ROW_HEIGHT;
      default:
        return NORMAL_ROW_HEIGHT;
    }
  }, [getRow]);
  const renderRow = (0, import_react.useCallback)(({ key, index, style }) => {
    const row = getRow(index);
    if (!row) {
      (0, import_assert.assert)(false, `Expected a row at index ${index}`);
      return /* @__PURE__ */ import_react.default.createElement("div", {
        key,
        style
      });
    }
    let result;
    switch (row.type) {
      case "ArchiveButton" /* ArchiveButton */:
        result = /* @__PURE__ */ import_react.default.createElement("button", {
          "aria-label": i18n("archivedConversations"),
          className: "module-conversation-list__item--archive-button",
          onClick: onClickArchiveButton,
          type: "button"
        }, /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-conversation-list__item--archive-button__icon"
        }), /* @__PURE__ */ import_react.default.createElement("span", {
          className: "module-conversation-list__item--archive-button__text"
        }, i18n("archivedConversations")), /* @__PURE__ */ import_react.default.createElement("span", {
          className: "module-conversation-list__item--archive-button__archived-count"
        }, row.archivedConversationsCount));
        break;
      case "Blank" /* Blank */:
        result = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null);
        break;
      case "Contact" /* Contact */: {
        const { isClickable = true } = row;
        result = /* @__PURE__ */ import_react.default.createElement(import_ContactListItem.ContactListItem, {
          ...row.contact,
          badge: getPreferredBadge(row.contact.badges),
          onClick: isClickable ? onSelectConversation : void 0,
          i18n,
          theme
        });
        break;
      }
      case "ContactCheckbox" /* ContactCheckbox */:
        result = /* @__PURE__ */ import_react.default.createElement(import_ContactCheckbox.ContactCheckbox, {
          ...row.contact,
          badge: getPreferredBadge(row.contact.badges),
          isChecked: row.isChecked,
          disabledReason: row.disabledReason,
          onClick: onClickContactCheckbox,
          i18n,
          theme
        });
        break;
      case "PhoneNumberCheckbox" /* PhoneNumberCheckbox */:
        result = /* @__PURE__ */ import_react.default.createElement(import_PhoneNumberCheckbox.PhoneNumberCheckbox, {
          phoneNumber: row.phoneNumber,
          lookupConversationWithoutUuid,
          showUserNotFoundModal,
          setIsFetchingUUID,
          toggleConversationInChooseMembers: (conversationId) => onClickContactCheckbox(conversationId, void 0),
          isChecked: row.isChecked,
          isFetching: row.isFetching,
          i18n,
          theme
        });
        break;
      case "UsernameCheckbox" /* UsernameCheckbox */:
        result = /* @__PURE__ */ import_react.default.createElement(import_UsernameCheckbox.UsernameCheckbox, {
          username: row.username,
          lookupConversationWithoutUuid,
          showUserNotFoundModal,
          setIsFetchingUUID,
          toggleConversationInChooseMembers: (conversationId) => onClickContactCheckbox(conversationId, void 0),
          isChecked: row.isChecked,
          isFetching: row.isFetching,
          i18n,
          theme
        });
        break;
      case "Conversation" /* Conversation */: {
        const itemProps = (0, import_lodash.pick)(row.conversation, [
          "acceptedMessageRequest",
          "avatarPath",
          "badges",
          "color",
          "draftPreview",
          "id",
          "isMe",
          "isSelected",
          "isPinned",
          "lastMessage",
          "lastUpdated",
          "markedUnread",
          "muteExpiresAt",
          "name",
          "phoneNumber",
          "profileName",
          "sharedGroupNames",
          "shouldShowDraft",
          "title",
          "type",
          "typingContactId",
          "unblurredAvatarPath",
          "unreadCount"
        ]);
        const { badges, title, unreadCount, lastMessage } = itemProps;
        result = /* @__PURE__ */ import_react.default.createElement("div", {
          "aria-label": i18n("ConversationList__aria-label", {
            lastMessage: (0, import_lodash.get)(lastMessage, "text") || i18n("ConversationList__last-message-undefined"),
            title,
            unreadCount: String(unreadCount)
          })
        }, /* @__PURE__ */ import_react.default.createElement(import_ConversationListItem.ConversationListItem, {
          ...itemProps,
          key,
          badge: getPreferredBadge(badges),
          onClick: onSelectConversation,
          i18n,
          theme
        }));
        break;
      }
      case "CreateNewGroup" /* CreateNewGroup */:
        result = /* @__PURE__ */ import_react.default.createElement(import_CreateNewGroupButton.CreateNewGroupButton, {
          i18n,
          onClick: showChooseGroupMembers
        });
        break;
      case "Header" /* Header */:
        result = /* @__PURE__ */ import_react.default.createElement("div", {
          className: "module-conversation-list__item--header",
          "aria-label": i18n(row.i18nKey)
        }, i18n(row.i18nKey));
        break;
      case "MessageSearchResult" /* MessageSearchResult */:
        result = /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, renderMessageSearchResult(row.messageId));
        break;
      case "SearchResultsLoadingFakeHeader" /* SearchResultsLoadingFakeHeader */:
        result = /* @__PURE__ */ import_react.default.createElement(import_SearchResultsLoadingFakeHeader.SearchResultsLoadingFakeHeader, null);
        break;
      case "SearchResultsLoadingFakeRow" /* SearchResultsLoadingFakeRow */:
        result = /* @__PURE__ */ import_react.default.createElement(import_SearchResultsLoadingFakeRow.SearchResultsLoadingFakeRow, null);
        break;
      case "StartNewConversation" /* StartNewConversation */:
        result = /* @__PURE__ */ import_react.default.createElement(import_StartNewConversation.StartNewConversation, {
          i18n,
          phoneNumber: row.phoneNumber,
          isFetching: row.isFetching,
          lookupConversationWithoutUuid,
          showUserNotFoundModal,
          setIsFetchingUUID,
          showConversation
        });
        break;
      case "UsernameSearchResult" /* UsernameSearchResult */:
        result = /* @__PURE__ */ import_react.default.createElement(import_UsernameSearchResultListItem.UsernameSearchResultListItem, {
          i18n,
          username: row.username,
          isFetchingUsername: row.isFetchingUsername,
          lookupConversationWithoutUuid,
          showUserNotFoundModal,
          setIsFetchingUUID,
          showConversation
        });
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(row);
    }
    return /* @__PURE__ */ import_react.default.createElement("span", {
      "aria-rowindex": index + 1,
      role: "row",
      style,
      key
    }, /* @__PURE__ */ import_react.default.createElement("span", {
      role: "gridcell",
      "aria-colindex": 1
    }, result));
  }, [
    getPreferredBadge,
    getRow,
    i18n,
    onClickArchiveButton,
    onClickContactCheckbox,
    onSelectConversation,
    lookupConversationWithoutUuid,
    showUserNotFoundModal,
    setIsFetchingUUID,
    renderMessageSearchResult,
    showChooseGroupMembers,
    showConversation,
    theme
  ]);
  const { width = 0, height = 0 } = dimensions || {};
  if (!width || !height) {
    return null;
  }
  const widthBreakpoint = (0, import_util.getConversationListWidthBreakpoint)(width);
  return /* @__PURE__ */ import_react.default.createElement(import_react_virtualized.List, {
    className: (0, import_classnames.default)("module-conversation-list", `module-conversation-list--scroll-behavior-${scrollBehavior}`, `module-conversation-list--width-${widthBreakpoint}`),
    height,
    ref: listRef,
    rowCount,
    rowHeight: calculateRowHeight,
    rowRenderer: renderRow,
    scrollToIndex: scrollToRowIndex,
    style: {
      overflowY: scrollable ? "overlay" : "hidden"
    },
    tabIndex: -1,
    width
  });
}, "ConversationList");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ConversationList,
  RowType
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ29udmVyc2F0aW9uTGlzdC50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHR5cGUgeyBSZWFjdE5vZGUgfSBmcm9tICdyZWFjdCc7XG5pbXBvcnQgUmVhY3QsIHsgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBMaXN0Um93UmVuZGVyZXIgfSBmcm9tICdyZWFjdC12aXJ0dWFsaXplZCc7XG5pbXBvcnQgeyBMaXN0IH0gZnJvbSAncmVhY3QtdmlydHVhbGl6ZWQnO1xuaW1wb3J0IGNsYXNzTmFtZXMgZnJvbSAnY2xhc3NuYW1lcyc7XG5pbXBvcnQgeyBnZXQsIHBpY2sgfSBmcm9tICdsb2Rhc2gnO1xuXG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcbmltcG9ydCB0eXBlIHsgUGFyc2VkRTE2NFR5cGUgfSBmcm9tICcuLi91dGlsL2xpYnBob25lbnVtYmVySW5zdGFuY2UnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFNjcm9sbEJlaGF2aW9yIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25MaXN0V2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgdHlwZSB7IFByZWZlcnJlZEJhZGdlU2VsZWN0b3JUeXBlIH0gZnJvbSAnLi4vc3RhdGUvc2VsZWN0b3JzL2JhZGdlcyc7XG5pbXBvcnQgdHlwZSB7IExvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkQWN0aW9uc1R5cGUgfSBmcm9tICcuLi91dGlsL2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkJztcbmltcG9ydCB0eXBlIHsgU2hvd0NvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcblxuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGEgYXMgQ29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGUgfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0IHsgQ29udmVyc2F0aW9uTGlzdEl0ZW0gfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBDb250YWN0TGlzdEl0ZW1Db252ZXJzYXRpb25UeXBlIGFzIENvbnRhY3RMaXN0SXRlbVByb3BzVHlwZSB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9Db250YWN0TGlzdEl0ZW0nO1xuaW1wb3J0IHsgQ29udGFjdExpc3RJdGVtIH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L0NvbnRhY3RMaXN0SXRlbSc7XG5pbXBvcnQgdHlwZSB7IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uIH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L0NvbnRhY3RDaGVja2JveCc7XG5pbXBvcnQgeyBDb250YWN0Q2hlY2tib3ggYXMgQ29udGFjdENoZWNrYm94Q29tcG9uZW50IH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L0NvbnRhY3RDaGVja2JveCc7XG5pbXBvcnQgeyBQaG9uZU51bWJlckNoZWNrYm94IGFzIFBob25lTnVtYmVyQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvUGhvbmVOdW1iZXJDaGVja2JveCc7XG5pbXBvcnQgeyBVc2VybmFtZUNoZWNrYm94IGFzIFVzZXJuYW1lQ2hlY2tib3hDb21wb25lbnQgfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvVXNlcm5hbWVDaGVja2JveCc7XG5pbXBvcnQgeyBDcmVhdGVOZXdHcm91cEJ1dHRvbiB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9DcmVhdGVOZXdHcm91cEJ1dHRvbic7XG5pbXBvcnQgeyBTdGFydE5ld0NvbnZlcnNhdGlvbiBhcyBTdGFydE5ld0NvbnZlcnNhdGlvbkNvbXBvbmVudCB9IGZyb20gJy4vY29udmVyc2F0aW9uTGlzdC9TdGFydE5ld0NvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VIZWFkZXIgYXMgU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyQ29tcG9uZW50IH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L1NlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZUhlYWRlcic7XG5pbXBvcnQgeyBTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VSb3cgYXMgU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlUm93Q29tcG9uZW50IH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L1NlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZVJvdyc7XG5pbXBvcnQgeyBVc2VybmFtZVNlYXJjaFJlc3VsdExpc3RJdGVtIH0gZnJvbSAnLi9jb252ZXJzYXRpb25MaXN0L1VzZXJuYW1lU2VhcmNoUmVzdWx0TGlzdEl0ZW0nO1xuXG5leHBvcnQgZW51bSBSb3dUeXBlIHtcbiAgQXJjaGl2ZUJ1dHRvbiA9ICdBcmNoaXZlQnV0dG9uJyxcbiAgQmxhbmsgPSAnQmxhbmsnLFxuICBDb250YWN0ID0gJ0NvbnRhY3QnLFxuICBDb250YWN0Q2hlY2tib3ggPSAnQ29udGFjdENoZWNrYm94JyxcbiAgUGhvbmVOdW1iZXJDaGVja2JveCA9ICdQaG9uZU51bWJlckNoZWNrYm94JyxcbiAgVXNlcm5hbWVDaGVja2JveCA9ICdVc2VybmFtZUNoZWNrYm94JyxcbiAgQ29udmVyc2F0aW9uID0gJ0NvbnZlcnNhdGlvbicsXG4gIENyZWF0ZU5ld0dyb3VwID0gJ0NyZWF0ZU5ld0dyb3VwJyxcbiAgSGVhZGVyID0gJ0hlYWRlcicsXG4gIE1lc3NhZ2VTZWFyY2hSZXN1bHQgPSAnTWVzc2FnZVNlYXJjaFJlc3VsdCcsXG4gIFNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZUhlYWRlciA9ICdTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VIZWFkZXInLFxuICBTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VSb3cgPSAnU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlUm93JyxcbiAgU3RhcnROZXdDb252ZXJzYXRpb24gPSAnU3RhcnROZXdDb252ZXJzYXRpb24nLFxuICBVc2VybmFtZVNlYXJjaFJlc3VsdCA9ICdVc2VybmFtZVNlYXJjaFJlc3VsdCcsXG59XG5cbnR5cGUgQXJjaGl2ZUJ1dHRvblJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuQXJjaGl2ZUJ1dHRvbjtcbiAgYXJjaGl2ZWRDb252ZXJzYXRpb25zQ291bnQ6IG51bWJlcjtcbn07XG5cbnR5cGUgQmxhbmtSb3dUeXBlID0geyB0eXBlOiBSb3dUeXBlLkJsYW5rIH07XG5cbnR5cGUgQ29udGFjdFJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuQ29udGFjdDtcbiAgY29udGFjdDogQ29udGFjdExpc3RJdGVtUHJvcHNUeXBlO1xuICBpc0NsaWNrYWJsZT86IGJvb2xlYW47XG59O1xuXG50eXBlIENvbnRhY3RDaGVja2JveFJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuQ29udGFjdENoZWNrYm94O1xuICBjb250YWN0OiBDb250YWN0TGlzdEl0ZW1Qcm9wc1R5cGU7XG4gIGlzQ2hlY2tlZDogYm9vbGVhbjtcbiAgZGlzYWJsZWRSZWFzb24/OiBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbjtcbn07XG5cbnR5cGUgUGhvbmVOdW1iZXJDaGVja2JveFJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuUGhvbmVOdW1iZXJDaGVja2JveDtcbiAgcGhvbmVOdW1iZXI6IFBhcnNlZEUxNjRUeXBlO1xuICBpc0NoZWNrZWQ6IGJvb2xlYW47XG4gIGlzRmV0Y2hpbmc6IGJvb2xlYW47XG59O1xuXG50eXBlIFVzZXJuYW1lQ2hlY2tib3hSb3dUeXBlID0ge1xuICB0eXBlOiBSb3dUeXBlLlVzZXJuYW1lQ2hlY2tib3g7XG4gIHVzZXJuYW1lOiBzdHJpbmc7XG4gIGlzQ2hlY2tlZDogYm9vbGVhbjtcbiAgaXNGZXRjaGluZzogYm9vbGVhbjtcbn07XG5cbnR5cGUgQ29udmVyc2F0aW9uUm93VHlwZSA9IHtcbiAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb247XG4gIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGU7XG59O1xuXG50eXBlIENyZWF0ZU5ld0dyb3VwUm93VHlwZSA9IHtcbiAgdHlwZTogUm93VHlwZS5DcmVhdGVOZXdHcm91cDtcbn07XG5cbnR5cGUgTWVzc2FnZVJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuTWVzc2FnZVNlYXJjaFJlc3VsdDtcbiAgbWVzc2FnZUlkOiBzdHJpbmc7XG59O1xuXG50eXBlIEhlYWRlclJvd1R5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuSGVhZGVyO1xuICBpMThuS2V5OiBzdHJpbmc7XG59O1xuXG50eXBlIFNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZUhlYWRlclR5cGUgPSB7XG4gIHR5cGU6IFJvd1R5cGUuU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyO1xufTtcblxudHlwZSBTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VSb3dUeXBlID0ge1xuICB0eXBlOiBSb3dUeXBlLlNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZVJvdztcbn07XG5cbnR5cGUgU3RhcnROZXdDb252ZXJzYXRpb25Sb3dUeXBlID0ge1xuICB0eXBlOiBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uO1xuICBwaG9uZU51bWJlcjogUGFyc2VkRTE2NFR5cGU7XG4gIGlzRmV0Y2hpbmc6IGJvb2xlYW47XG59O1xuXG50eXBlIFVzZXJuYW1lUm93VHlwZSA9IHtcbiAgdHlwZTogUm93VHlwZS5Vc2VybmFtZVNlYXJjaFJlc3VsdDtcbiAgdXNlcm5hbWU6IHN0cmluZztcbiAgaXNGZXRjaGluZ1VzZXJuYW1lOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgUm93ID1cbiAgfCBBcmNoaXZlQnV0dG9uUm93VHlwZVxuICB8IEJsYW5rUm93VHlwZVxuICB8IENvbnRhY3RSb3dUeXBlXG4gIHwgQ29udGFjdENoZWNrYm94Um93VHlwZVxuICB8IFBob25lTnVtYmVyQ2hlY2tib3hSb3dUeXBlXG4gIHwgVXNlcm5hbWVDaGVja2JveFJvd1R5cGVcbiAgfCBDb252ZXJzYXRpb25Sb3dUeXBlXG4gIHwgQ3JlYXRlTmV3R3JvdXBSb3dUeXBlXG4gIHwgTWVzc2FnZVJvd1R5cGVcbiAgfCBIZWFkZXJSb3dUeXBlXG4gIHwgU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyVHlwZVxuICB8IFNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZVJvd1R5cGVcbiAgfCBTdGFydE5ld0NvbnZlcnNhdGlvblJvd1R5cGVcbiAgfCBVc2VybmFtZVJvd1R5cGU7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgZGltZW5zaW9ucz86IHtcbiAgICB3aWR0aDogbnVtYmVyO1xuICAgIGhlaWdodDogbnVtYmVyO1xuICB9O1xuICByb3dDb3VudDogbnVtYmVyO1xuICAvLyBJZiBgZ2V0Um93YCBpcyBjYWxsZWQgd2l0aCBhbiBpbnZhbGlkIGluZGV4LCBpdCBzaG91bGQgcmV0dXJuIGB1bmRlZmluZWRgLiBIb3dldmVyLFxuICAvLyAgIHRoaXMgc2hvdWxkIG9ubHkgaGFwcGVuIGlmIHRoZXJlIGlzIGEgYnVnIHNvbWV3aGVyZS4gRm9yIGV4YW1wbGUsIGFuIGluYWNjdXJhdGVcbiAgLy8gICBgcm93Q291bnRgLlxuICBnZXRSb3c6IChpbmRleDogbnVtYmVyKSA9PiB1bmRlZmluZWQgfCBSb3c7XG4gIHNjcm9sbEJlaGF2aW9yPzogU2Nyb2xsQmVoYXZpb3I7XG4gIHNjcm9sbFRvUm93SW5kZXg/OiBudW1iZXI7XG4gIHNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHM6IGJvb2xlYW47XG4gIHNjcm9sbGFibGU/OiBib29sZWFuO1xuXG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgdGhlbWU6IFRoZW1lVHlwZTtcblxuICBvbkNsaWNrQXJjaGl2ZUJ1dHRvbjogKCkgPT4gdm9pZDtcbiAgb25DbGlja0NvbnRhY3RDaGVja2JveDogKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgZGlzYWJsZWRSZWFzb246IHVuZGVmaW5lZCB8IENvbnRhY3RDaGVja2JveERpc2FibGVkUmVhc29uXG4gICkgPT4gdm9pZDtcbiAgb25TZWxlY3RDb252ZXJzYXRpb246IChjb252ZXJzYXRpb25JZDogc3RyaW5nLCBtZXNzYWdlSWQ/OiBzdHJpbmcpID0+IHZvaWQ7XG4gIHJlbmRlck1lc3NhZ2VTZWFyY2hSZXN1bHQ6IChpZDogc3RyaW5nKSA9PiBKU1guRWxlbWVudDtcbiAgc2hvd0Nob29zZUdyb3VwTWVtYmVyczogKCkgPT4gdm9pZDtcbiAgc2hvd0NvbnZlcnNhdGlvbjogU2hvd0NvbnZlcnNhdGlvblR5cGU7XG59ICYgTG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWRBY3Rpb25zVHlwZTtcblxuY29uc3QgTk9STUFMX1JPV19IRUlHSFQgPSA3NjtcbmNvbnN0IEhFQURFUl9ST1dfSEVJR0hUID0gNDA7XG5cbmV4cG9ydCBjb25zdCBDb252ZXJzYXRpb25MaXN0OiBSZWFjdC5GQzxQcm9wc1R5cGU+ID0gKHtcbiAgZGltZW5zaW9ucyxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGdldFJvdyxcbiAgaTE4bixcbiAgb25DbGlja0FyY2hpdmVCdXR0b24sXG4gIG9uQ2xpY2tDb250YWN0Q2hlY2tib3gsXG4gIG9uU2VsZWN0Q29udmVyc2F0aW9uLFxuICByZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0LFxuICByb3dDb3VudCxcbiAgc2Nyb2xsQmVoYXZpb3IgPSBTY3JvbGxCZWhhdmlvci5EZWZhdWx0LFxuICBzY3JvbGxUb1Jvd0luZGV4LFxuICBzY3JvbGxhYmxlID0gdHJ1ZSxcbiAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyxcbiAgc2hvd0Nob29zZUdyb3VwTWVtYmVycyxcbiAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQsXG4gIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgc2V0SXNGZXRjaGluZ1VVSUQsXG4gIHNob3dDb252ZXJzYXRpb24sXG4gIHRoZW1lLFxufSkgPT4ge1xuICBjb25zdCBsaXN0UmVmID0gdXNlUmVmPG51bGwgfCBMaXN0PihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGNvbnN0IGxpc3QgPSBsaXN0UmVmLmN1cnJlbnQ7XG4gICAgaWYgKHNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMgJiYgbGlzdCkge1xuICAgICAgbGlzdC5yZWNvbXB1dGVSb3dIZWlnaHRzKCk7XG4gICAgfVxuICB9KTtcblxuICBjb25zdCBjYWxjdWxhdGVSb3dIZWlnaHQgPSB1c2VDYWxsYmFjayhcbiAgICAoeyBpbmRleCB9OiB7IGluZGV4OiBudW1iZXIgfSk6IG51bWJlciA9PiB7XG4gICAgICBjb25zdCByb3cgPSBnZXRSb3coaW5kZXgpO1xuICAgICAgaWYgKCFyb3cpIHtcbiAgICAgICAgYXNzZXJ0KGZhbHNlLCBgRXhwZWN0ZWQgYSByb3cgYXQgaW5kZXggJHtpbmRleH1gKTtcbiAgICAgICAgcmV0dXJuIE5PUk1BTF9ST1dfSEVJR0hUO1xuICAgICAgfVxuICAgICAgc3dpdGNoIChyb3cudHlwZSkge1xuICAgICAgICBjYXNlIFJvd1R5cGUuSGVhZGVyOlxuICAgICAgICBjYXNlIFJvd1R5cGUuU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyOlxuICAgICAgICAgIHJldHVybiBIRUFERVJfUk9XX0hFSUdIVDtcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gTk9STUFMX1JPV19IRUlHSFQ7XG4gICAgICB9XG4gICAgfSxcbiAgICBbZ2V0Um93XVxuICApO1xuXG4gIGNvbnN0IHJlbmRlclJvdzogTGlzdFJvd1JlbmRlcmVyID0gdXNlQ2FsbGJhY2soXG4gICAgKHsga2V5LCBpbmRleCwgc3R5bGUgfSkgPT4ge1xuICAgICAgY29uc3Qgcm93ID0gZ2V0Um93KGluZGV4KTtcbiAgICAgIGlmICghcm93KSB7XG4gICAgICAgIGFzc2VydChmYWxzZSwgYEV4cGVjdGVkIGEgcm93IGF0IGluZGV4ICR7aW5kZXh9YCk7XG4gICAgICAgIHJldHVybiA8ZGl2IGtleT17a2V5fSBzdHlsZT17c3R5bGV9IC8+O1xuICAgICAgfVxuXG4gICAgICBsZXQgcmVzdWx0OiBSZWFjdE5vZGU7XG4gICAgICBzd2l0Y2ggKHJvdy50eXBlKSB7XG4gICAgICAgIGNhc2UgUm93VHlwZS5BcmNoaXZlQnV0dG9uOlxuICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgIDxidXR0b25cbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bignYXJjaGl2ZWRDb252ZXJzYXRpb25zJyl9XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jb252ZXJzYXRpb24tbGlzdF9faXRlbS0tYXJjaGl2ZS1idXR0b25cIlxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQXJjaGl2ZUJ1dHRvbn1cbiAgICAgICAgICAgICAgdHlwZT1cImJ1dHRvblwiXG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWNvbnZlcnNhdGlvbi1saXN0X19pdGVtLS1hcmNoaXZlLWJ1dHRvbl9faWNvblwiIC8+XG4gICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1jb252ZXJzYXRpb24tbGlzdF9faXRlbS0tYXJjaGl2ZS1idXR0b25fX3RleHRcIj5cbiAgICAgICAgICAgICAgICB7aTE4bignYXJjaGl2ZWRDb252ZXJzYXRpb25zJyl9XG4gICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgPHNwYW4gY2xhc3NOYW1lPVwibW9kdWxlLWNvbnZlcnNhdGlvbi1saXN0X19pdGVtLS1hcmNoaXZlLWJ1dHRvbl9fYXJjaGl2ZWQtY291bnRcIj5cbiAgICAgICAgICAgICAgICB7cm93LmFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50fVxuICAgICAgICAgICAgICA8L3NwYW4+XG4gICAgICAgICAgICA8L2J1dHRvbj5cbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJvd1R5cGUuQmxhbms6XG4gICAgICAgICAgcmVzdWx0ID0gPD48Lz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5Db250YWN0OiB7XG4gICAgICAgICAgY29uc3QgeyBpc0NsaWNrYWJsZSA9IHRydWUgfSA9IHJvdztcbiAgICAgICAgICByZXN1bHQgPSAoXG4gICAgICAgICAgICA8Q29udGFjdExpc3RJdGVtXG4gICAgICAgICAgICAgIHsuLi5yb3cuY29udGFjdH1cbiAgICAgICAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKHJvdy5jb250YWN0LmJhZGdlcyl9XG4gICAgICAgICAgICAgIG9uQ2xpY2s9e2lzQ2xpY2thYmxlID8gb25TZWxlY3RDb252ZXJzYXRpb24gOiB1bmRlZmluZWR9XG4gICAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlIFJvd1R5cGUuQ29udGFjdENoZWNrYm94OlxuICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgIDxDb250YWN0Q2hlY2tib3hDb21wb25lbnRcbiAgICAgICAgICAgICAgey4uLnJvdy5jb250YWN0fVxuICAgICAgICAgICAgICBiYWRnZT17Z2V0UHJlZmVycmVkQmFkZ2Uocm93LmNvbnRhY3QuYmFkZ2VzKX1cbiAgICAgICAgICAgICAgaXNDaGVja2VkPXtyb3cuaXNDaGVja2VkfVxuICAgICAgICAgICAgICBkaXNhYmxlZFJlYXNvbj17cm93LmRpc2FibGVkUmVhc29ufVxuICAgICAgICAgICAgICBvbkNsaWNrPXtvbkNsaWNrQ29udGFjdENoZWNrYm94fVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5QaG9uZU51bWJlckNoZWNrYm94OlxuICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgIDxQaG9uZU51bWJlckNoZWNrYm94Q29tcG9uZW50XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyPXtyb3cucGhvbmVOdW1iZXJ9XG4gICAgICAgICAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkPXtsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZH1cbiAgICAgICAgICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsPXtzaG93VXNlck5vdEZvdW5kTW9kYWx9XG4gICAgICAgICAgICAgIHNldElzRmV0Y2hpbmdVVUlEPXtzZXRJc0ZldGNoaW5nVVVJRH1cbiAgICAgICAgICAgICAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzPXtjb252ZXJzYXRpb25JZCA9PlxuICAgICAgICAgICAgICAgIG9uQ2xpY2tDb250YWN0Q2hlY2tib3goY29udmVyc2F0aW9uSWQsIHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpc0NoZWNrZWQ9e3Jvdy5pc0NoZWNrZWR9XG4gICAgICAgICAgICAgIGlzRmV0Y2hpbmc9e3Jvdy5pc0ZldGNoaW5nfVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5Vc2VybmFtZUNoZWNrYm94OlxuICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgIDxVc2VybmFtZUNoZWNrYm94Q29tcG9uZW50XG4gICAgICAgICAgICAgIHVzZXJuYW1lPXtyb3cudXNlcm5hbWV9XG4gICAgICAgICAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkPXtsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZH1cbiAgICAgICAgICAgICAgc2hvd1VzZXJOb3RGb3VuZE1vZGFsPXtzaG93VXNlck5vdEZvdW5kTW9kYWx9XG4gICAgICAgICAgICAgIHNldElzRmV0Y2hpbmdVVUlEPXtzZXRJc0ZldGNoaW5nVVVJRH1cbiAgICAgICAgICAgICAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzPXtjb252ZXJzYXRpb25JZCA9PlxuICAgICAgICAgICAgICAgIG9uQ2xpY2tDb250YWN0Q2hlY2tib3goY29udmVyc2F0aW9uSWQsIHVuZGVmaW5lZClcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICBpc0NoZWNrZWQ9e3Jvdy5pc0NoZWNrZWR9XG4gICAgICAgICAgICAgIGlzRmV0Y2hpbmc9e3Jvdy5pc0ZldGNoaW5nfVxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5Db252ZXJzYXRpb246IHtcbiAgICAgICAgICBjb25zdCBpdGVtUHJvcHMgPSBwaWNrKHJvdy5jb252ZXJzYXRpb24sIFtcbiAgICAgICAgICAgICdhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0JyxcbiAgICAgICAgICAgICdhdmF0YXJQYXRoJyxcbiAgICAgICAgICAgICdiYWRnZXMnLFxuICAgICAgICAgICAgJ2NvbG9yJyxcbiAgICAgICAgICAgICdkcmFmdFByZXZpZXcnLFxuICAgICAgICAgICAgJ2lkJyxcbiAgICAgICAgICAgICdpc01lJyxcbiAgICAgICAgICAgICdpc1NlbGVjdGVkJyxcbiAgICAgICAgICAgICdpc1Bpbm5lZCcsXG4gICAgICAgICAgICAnbGFzdE1lc3NhZ2UnLFxuICAgICAgICAgICAgJ2xhc3RVcGRhdGVkJyxcbiAgICAgICAgICAgICdtYXJrZWRVbnJlYWQnLFxuICAgICAgICAgICAgJ211dGVFeHBpcmVzQXQnLFxuICAgICAgICAgICAgJ25hbWUnLFxuICAgICAgICAgICAgJ3Bob25lTnVtYmVyJyxcbiAgICAgICAgICAgICdwcm9maWxlTmFtZScsXG4gICAgICAgICAgICAnc2hhcmVkR3JvdXBOYW1lcycsXG4gICAgICAgICAgICAnc2hvdWxkU2hvd0RyYWZ0JyxcbiAgICAgICAgICAgICd0aXRsZScsXG4gICAgICAgICAgICAndHlwZScsXG4gICAgICAgICAgICAndHlwaW5nQ29udGFjdElkJyxcbiAgICAgICAgICAgICd1bmJsdXJyZWRBdmF0YXJQYXRoJyxcbiAgICAgICAgICAgICd1bnJlYWRDb3VudCcsXG4gICAgICAgICAgXSk7XG4gICAgICAgICAgY29uc3QgeyBiYWRnZXMsIHRpdGxlLCB1bnJlYWRDb3VudCwgbGFzdE1lc3NhZ2UgfSA9IGl0ZW1Qcm9wcztcbiAgICAgICAgICByZXN1bHQgPSAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGFyaWEtbGFiZWw9e2kxOG4oJ0NvbnZlcnNhdGlvbkxpc3RfX2FyaWEtbGFiZWwnLCB7XG4gICAgICAgICAgICAgICAgbGFzdE1lc3NhZ2U6XG4gICAgICAgICAgICAgICAgICBnZXQobGFzdE1lc3NhZ2UsICd0ZXh0JykgfHxcbiAgICAgICAgICAgICAgICAgIGkxOG4oJ0NvbnZlcnNhdGlvbkxpc3RfX2xhc3QtbWVzc2FnZS11bmRlZmluZWQnKSxcbiAgICAgICAgICAgICAgICB0aXRsZSxcbiAgICAgICAgICAgICAgICB1bnJlYWRDb3VudDogU3RyaW5nKHVucmVhZENvdW50KSxcbiAgICAgICAgICAgICAgfSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIDxDb252ZXJzYXRpb25MaXN0SXRlbVxuICAgICAgICAgICAgICAgIHsuLi5pdGVtUHJvcHN9XG4gICAgICAgICAgICAgICAga2V5PXtrZXl9XG4gICAgICAgICAgICAgICAgYmFkZ2U9e2dldFByZWZlcnJlZEJhZGdlKGJhZGdlcyl9XG4gICAgICAgICAgICAgICAgb25DbGljaz17b25TZWxlY3RDb252ZXJzYXRpb259XG4gICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGNhc2UgUm93VHlwZS5DcmVhdGVOZXdHcm91cDpcbiAgICAgICAgICByZXN1bHQgPSAoXG4gICAgICAgICAgICA8Q3JlYXRlTmV3R3JvdXBCdXR0b25cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgb25DbGljaz17c2hvd0Nob29zZUdyb3VwTWVtYmVyc31cbiAgICAgICAgICAgIC8+XG4gICAgICAgICAgKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSb3dUeXBlLkhlYWRlcjpcbiAgICAgICAgICByZXN1bHQgPSAoXG4gICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1jb252ZXJzYXRpb24tbGlzdF9faXRlbS0taGVhZGVyXCJcbiAgICAgICAgICAgICAgYXJpYS1sYWJlbD17aTE4bihyb3cuaTE4bktleSl9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHtpMThuKHJvdy5pMThuS2V5KX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5NZXNzYWdlU2VhcmNoUmVzdWx0OlxuICAgICAgICAgIHJlc3VsdCA9IDw+e3JlbmRlck1lc3NhZ2VTZWFyY2hSZXN1bHQocm93Lm1lc3NhZ2VJZCl9PC8+O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJvd1R5cGUuU2VhcmNoUmVzdWx0c0xvYWRpbmdGYWtlSGVhZGVyOlxuICAgICAgICAgIHJlc3VsdCA9IDxTZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VIZWFkZXJDb21wb25lbnQgLz47XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUm93VHlwZS5TZWFyY2hSZXN1bHRzTG9hZGluZ0Zha2VSb3c6XG4gICAgICAgICAgcmVzdWx0ID0gPFNlYXJjaFJlc3VsdHNMb2FkaW5nRmFrZVJvd0NvbXBvbmVudCAvPjtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBSb3dUeXBlLlN0YXJ0TmV3Q29udmVyc2F0aW9uOlxuICAgICAgICAgIHJlc3VsdCA9IChcbiAgICAgICAgICAgIDxTdGFydE5ld0NvbnZlcnNhdGlvbkNvbXBvbmVudFxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBwaG9uZU51bWJlcj17cm93LnBob25lTnVtYmVyfVxuICAgICAgICAgICAgICBpc0ZldGNoaW5nPXtyb3cuaXNGZXRjaGluZ31cbiAgICAgICAgICAgICAgbG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWQ9e2xvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkfVxuICAgICAgICAgICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWw9e3Nob3dVc2VyTm90Rm91bmRNb2RhbH1cbiAgICAgICAgICAgICAgc2V0SXNGZXRjaGluZ1VVSUQ9e3NldElzRmV0Y2hpbmdVVUlEfVxuICAgICAgICAgICAgICBzaG93Q29udmVyc2F0aW9uPXtzaG93Q29udmVyc2F0aW9ufVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICApO1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlIFJvd1R5cGUuVXNlcm5hbWVTZWFyY2hSZXN1bHQ6XG4gICAgICAgICAgcmVzdWx0ID0gKFxuICAgICAgICAgICAgPFVzZXJuYW1lU2VhcmNoUmVzdWx0TGlzdEl0ZW1cbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgdXNlcm5hbWU9e3Jvdy51c2VybmFtZX1cbiAgICAgICAgICAgICAgaXNGZXRjaGluZ1VzZXJuYW1lPXtyb3cuaXNGZXRjaGluZ1VzZXJuYW1lfVxuICAgICAgICAgICAgICBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZD17bG9va3VwQ29udmVyc2F0aW9uV2l0aG91dFV1aWR9XG4gICAgICAgICAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbD17c2hvd1VzZXJOb3RGb3VuZE1vZGFsfVxuICAgICAgICAgICAgICBzZXRJc0ZldGNoaW5nVVVJRD17c2V0SXNGZXRjaGluZ1VVSUR9XG4gICAgICAgICAgICAgIHNob3dDb252ZXJzYXRpb249e3Nob3dDb252ZXJzYXRpb259XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihyb3cpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8c3BhbiBhcmlhLXJvd2luZGV4PXtpbmRleCArIDF9IHJvbGU9XCJyb3dcIiBzdHlsZT17c3R5bGV9IGtleT17a2V5fT5cbiAgICAgICAgICA8c3BhbiByb2xlPVwiZ3JpZGNlbGxcIiBhcmlhLWNvbGluZGV4PXsxfT5cbiAgICAgICAgICAgIHtyZXN1bHR9XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L3NwYW4+XG4gICAgICApO1xuICAgIH0sXG4gICAgW1xuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICBnZXRSb3csXG4gICAgICBpMThuLFxuICAgICAgb25DbGlja0FyY2hpdmVCdXR0b24sXG4gICAgICBvbkNsaWNrQ29udGFjdENoZWNrYm94LFxuICAgICAgb25TZWxlY3RDb252ZXJzYXRpb24sXG4gICAgICBsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCxcbiAgICAgIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgICAgIHNldElzRmV0Y2hpbmdVVUlELFxuICAgICAgcmVuZGVyTWVzc2FnZVNlYXJjaFJlc3VsdCxcbiAgICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnMsXG4gICAgICBzaG93Q29udmVyc2F0aW9uLFxuICAgICAgdGhlbWUsXG4gICAgXVxuICApO1xuXG4gIC8vIFRob3VnaCBgd2lkdGhgIGFuZCBgaGVpZ2h0YCBhcmUgcmVxdWlyZWQgcHJvcGVydGllcywgd2Ugd2FudCB0byBiZSBjYXJlZnVsIGluIGNhc2VcbiAgLy8gICB0aGUgY2FsbGVyIHNlbmRzIGJvZ3VzIGRhdGEuIE5vdGFibHksIHJlYWN0LW1lYXN1cmUncyB0eXBlcyBzZWVtIHRvIGJlIGluYWNjdXJhdGUuXG4gIGNvbnN0IHsgd2lkdGggPSAwLCBoZWlnaHQgPSAwIH0gPSBkaW1lbnNpb25zIHx8IHt9O1xuICBpZiAoIXdpZHRoIHx8ICFoZWlnaHQpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIGNvbnN0IHdpZHRoQnJlYWtwb2ludCA9IGdldENvbnZlcnNhdGlvbkxpc3RXaWR0aEJyZWFrcG9pbnQod2lkdGgpO1xuXG4gIHJldHVybiAoXG4gICAgPExpc3RcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgJ21vZHVsZS1jb252ZXJzYXRpb24tbGlzdCcsXG4gICAgICAgIGBtb2R1bGUtY29udmVyc2F0aW9uLWxpc3QtLXNjcm9sbC1iZWhhdmlvci0ke3Njcm9sbEJlaGF2aW9yfWAsXG4gICAgICAgIGBtb2R1bGUtY29udmVyc2F0aW9uLWxpc3QtLXdpZHRoLSR7d2lkdGhCcmVha3BvaW50fWBcbiAgICAgICl9XG4gICAgICBoZWlnaHQ9e2hlaWdodH1cbiAgICAgIHJlZj17bGlzdFJlZn1cbiAgICAgIHJvd0NvdW50PXtyb3dDb3VudH1cbiAgICAgIHJvd0hlaWdodD17Y2FsY3VsYXRlUm93SGVpZ2h0fVxuICAgICAgcm93UmVuZGVyZXI9e3JlbmRlclJvd31cbiAgICAgIHNjcm9sbFRvSW5kZXg9e3Njcm9sbFRvUm93SW5kZXh9XG4gICAgICBzdHlsZT17e1xuICAgICAgICAvLyBTZWUgYDxUaW1lbGluZT5gIGZvciBhbiBleHBsYW5hdGlvbiBvZiB0aGlzIGBhbnlgIGNhc3QuXG4gICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG4gICAgICAgIG92ZXJmbG93WTogc2Nyb2xsYWJsZSA/ICgnb3ZlcmxheScgYXMgYW55KSA6ICdoaWRkZW4nLFxuICAgICAgfX1cbiAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgIHdpZHRoPXt3aWR0aH1cbiAgICAvPlxuICApO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFzRDtBQUV0RCwrQkFBcUI7QUFDckIsd0JBQXVCO0FBQ3ZCLG9CQUEwQjtBQUUxQiw4QkFBaUM7QUFDakMsb0JBQXVCO0FBR3ZCLGtCQUErQjtBQUMvQixrQkFBbUQ7QUFNbkQsa0NBQXFDO0FBRXJDLDZCQUFnQztBQUVoQyw2QkFBNEQ7QUFDNUQsaUNBQW9FO0FBQ3BFLDhCQUE4RDtBQUM5RCxrQ0FBcUM7QUFDckMsa0NBQXNFO0FBQ3RFLDRDQUEwRjtBQUMxRix5Q0FBb0Y7QUFDcEYsMENBQTZDO0FBRXRDLElBQUssVUFBTCxrQkFBSyxhQUFMO0FBQ0wsOEJBQWdCO0FBQ2hCLHNCQUFRO0FBQ1Isd0JBQVU7QUFDVixn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
