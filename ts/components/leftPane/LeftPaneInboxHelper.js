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
var LeftPaneInboxHelper_exports = {};
__export(LeftPaneInboxHelper_exports, {
  LeftPaneInboxHelper: () => LeftPaneInboxHelper
});
module.exports = __toCommonJS(LeftPaneInboxHelper_exports);
var import_lodash = require("lodash");
var import_react = __toESM(require("react"));
var import_Intl = require("../Intl");
var import_LeftPaneHelper = require("./LeftPaneHelper");
var import_getConversationInDirection = require("./getConversationInDirection");
var import_ConversationList = require("../ConversationList");
var import_handleKeydownForSearch = require("./handleKeydownForSearch");
var import_LeftPaneSearchInput = require("../LeftPaneSearchInput");
class LeftPaneInboxHelper extends import_LeftPaneHelper.LeftPaneHelper {
  constructor({
    conversations,
    archivedConversations,
    pinnedConversations,
    isAboutToSearchInAConversation,
    startSearchCounter,
    searchDisabled,
    searchTerm,
    searchConversation
  }) {
    super();
    this.conversations = conversations;
    this.archivedConversations = archivedConversations;
    this.pinnedConversations = pinnedConversations;
    this.isAboutToSearchInAConversation = isAboutToSearchInAConversation;
    this.startSearchCounter = startSearchCounter;
    this.searchDisabled = searchDisabled;
    this.searchTerm = searchTerm;
    this.searchConversation = searchConversation;
  }
  getRowCount() {
    const headerCount = this.hasPinnedAndNonpinned() ? 2 : 0;
    const buttonCount = this.archivedConversations.length ? 1 : 0;
    return headerCount + this.pinnedConversations.length + this.conversations.length + buttonCount;
  }
  getSearchInput({
    clearConversationSearch,
    clearSearch,
    i18n,
    showConversation,
    updateSearchTerm
  }) {
    return /* @__PURE__ */ import_react.default.createElement(import_LeftPaneSearchInput.LeftPaneSearchInput, {
      clearConversationSearch,
      clearSearch,
      disabled: this.searchDisabled,
      i18n,
      searchConversation: this.searchConversation,
      searchTerm: this.searchTerm,
      showConversation,
      startSearchCounter: this.startSearchCounter,
      updateSearchTerm
    });
  }
  getPreRowsNode({
    i18n
  }) {
    if (this.getRowCount() === 0) {
      return /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-left-pane__empty"
      }, /* @__PURE__ */ import_react.default.createElement("div", null, /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
        i18n,
        id: "emptyInboxMessage",
        components: [
          /* @__PURE__ */ import_react.default.createElement("span", null, /* @__PURE__ */ import_react.default.createElement("strong", null, i18n("composeIcon")), /* @__PURE__ */ import_react.default.createElement("span", {
            className: "module-left-pane__empty--composer_icon"
          }, /* @__PURE__ */ import_react.default.createElement("i", {
            className: "module-left-pane__empty--composer_icon--icon"
          })))
        ]
      })));
    }
    return null;
  }
  getRow(rowIndex) {
    const { conversations, archivedConversations, pinnedConversations } = this;
    const archivedConversationsCount = archivedConversations.length;
    if (this.hasPinnedAndNonpinned()) {
      switch (rowIndex) {
        case 0:
          return {
            type: import_ConversationList.RowType.Header,
            i18nKey: "LeftPane--pinned"
          };
        case pinnedConversations.length + 1:
          return {
            type: import_ConversationList.RowType.Header,
            i18nKey: "LeftPane--chats"
          };
        case pinnedConversations.length + conversations.length + 2:
          if (archivedConversationsCount) {
            return {
              type: import_ConversationList.RowType.ArchiveButton,
              archivedConversationsCount
            };
          }
          return void 0;
        default: {
          const pinnedConversation = pinnedConversations[rowIndex - 1];
          if (pinnedConversation) {
            return {
              type: import_ConversationList.RowType.Conversation,
              conversation: pinnedConversation
            };
          }
          const conversation = conversations[rowIndex - pinnedConversations.length - 2];
          return conversation ? {
            type: import_ConversationList.RowType.Conversation,
            conversation
          } : void 0;
        }
      }
    }
    const onlyConversations = pinnedConversations.length ? pinnedConversations : conversations;
    if (rowIndex < onlyConversations.length) {
      const conversation = onlyConversations[rowIndex];
      return conversation ? {
        type: import_ConversationList.RowType.Conversation,
        conversation
      } : void 0;
    }
    if (rowIndex === onlyConversations.length && archivedConversationsCount) {
      return {
        type: import_ConversationList.RowType.ArchiveButton,
        archivedConversationsCount
      };
    }
    return void 0;
  }
  getRowIndexToScrollTo(selectedConversationId) {
    if (!selectedConversationId) {
      return void 0;
    }
    const isConversationSelected = /* @__PURE__ */ __name((conversation) => conversation.id === selectedConversationId, "isConversationSelected");
    const hasHeaders = this.hasPinnedAndNonpinned();
    const pinnedConversationIndex = this.pinnedConversations.findIndex(isConversationSelected);
    if (pinnedConversationIndex !== -1) {
      const headerOffset = hasHeaders ? 1 : 0;
      return pinnedConversationIndex + headerOffset;
    }
    const conversationIndex = this.conversations.findIndex(isConversationSelected);
    if (conversationIndex !== -1) {
      const pinnedOffset = this.pinnedConversations.length;
      const headerOffset = hasHeaders ? 2 : 0;
      return conversationIndex + pinnedOffset + headerOffset;
    }
    return void 0;
  }
  requiresFullWidth() {
    const hasNoConversations = !this.conversations.length && !this.pinnedConversations.length && !this.archivedConversations.length;
    return hasNoConversations || this.isAboutToSearchInAConversation || Boolean(this.startSearchCounter);
  }
  shouldRecomputeRowHeights(old) {
    return old.pinnedConversations.length !== this.pinnedConversations.length;
  }
  getConversationAndMessageAtIndex(conversationIndex) {
    const { conversations, pinnedConversations } = this;
    const conversation = pinnedConversations[conversationIndex] || conversations[conversationIndex - pinnedConversations.length] || (0, import_lodash.last)(conversations) || (0, import_lodash.last)(pinnedConversations);
    return conversation ? { conversationId: conversation.id } : void 0;
  }
  getConversationAndMessageInDirection(toFind, selectedConversationId, _selectedMessageId) {
    return (0, import_getConversationInDirection.getConversationInDirection)([...this.pinnedConversations, ...this.conversations], toFind, selectedConversationId);
  }
  onKeyDown(event, options) {
    (0, import_handleKeydownForSearch.handleKeydownForSearch)(event, options);
  }
  hasPinnedAndNonpinned() {
    return Boolean(this.pinnedConversations.length && this.conversations.length);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPaneInboxHelper
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmVJbmJveEhlbHBlci50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIxLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgeyBsYXN0IH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5cbmltcG9ydCB7IEludGwgfSBmcm9tICcuLi9JbnRsJztcbmltcG9ydCB0eXBlIHsgVG9GaW5kVHlwZSB9IGZyb20gJy4vTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHR5cGUge1xuICBDb252ZXJzYXRpb25UeXBlLFxuICBTaG93Q29udmVyc2F0aW9uVHlwZSxcbn0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBMZWZ0UGFuZUhlbHBlciB9IGZyb20gJy4vTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHsgZ2V0Q29udmVyc2F0aW9uSW5EaXJlY3Rpb24gfSBmcm9tICcuL2dldENvbnZlcnNhdGlvbkluRGlyZWN0aW9uJztcbmltcG9ydCB0eXBlIHsgUm93IH0gZnJvbSAnLi4vQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgeyBSb3dUeXBlIH0gZnJvbSAnLi4vQ29udmVyc2F0aW9uTGlzdCc7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YSBhcyBDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZSB9IGZyb20gJy4uL2NvbnZlcnNhdGlvbkxpc3QvQ29udmVyc2F0aW9uTGlzdEl0ZW0nO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBoYW5kbGVLZXlkb3duRm9yU2VhcmNoIH0gZnJvbSAnLi9oYW5kbGVLZXlkb3duRm9yU2VhcmNoJztcbmltcG9ydCB7IExlZnRQYW5lU2VhcmNoSW5wdXQgfSBmcm9tICcuLi9MZWZ0UGFuZVNlYXJjaElucHV0JztcblxuZXhwb3J0IHR5cGUgTGVmdFBhbmVJbmJveFByb3BzVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT47XG4gIGFyY2hpdmVkQ29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT47XG4gIHBpbm5lZENvbnZlcnNhdGlvbnM6IFJlYWRvbmx5QXJyYXk8Q29udmVyc2F0aW9uTGlzdEl0ZW1Qcm9wc1R5cGU+O1xuICBpc0Fib3V0VG9TZWFyY2hJbkFDb252ZXJzYXRpb246IGJvb2xlYW47XG4gIHN0YXJ0U2VhcmNoQ291bnRlcjogbnVtYmVyO1xuICBzZWFyY2hEaXNhYmxlZDogYm9vbGVhbjtcbiAgc2VhcmNoVGVybTogc3RyaW5nO1xuICBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGU7XG59O1xuXG5leHBvcnQgY2xhc3MgTGVmdFBhbmVJbmJveEhlbHBlciBleHRlbmRzIExlZnRQYW5lSGVscGVyPExlZnRQYW5lSW5ib3hQcm9wc1R5cGU+IHtcbiAgcHJpdmF0ZSByZWFkb25seSBjb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlPjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGFyY2hpdmVkQ29udmVyc2F0aW9uczogUmVhZG9ubHlBcnJheTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT47XG5cbiAgcHJpdmF0ZSByZWFkb25seSBwaW5uZWRDb252ZXJzYXRpb25zOiBSZWFkb25seUFycmF5PENvbnZlcnNhdGlvbkxpc3RJdGVtUHJvcHNUeXBlPjtcblxuICBwcml2YXRlIHJlYWRvbmx5IGlzQWJvdXRUb1NlYXJjaEluQUNvbnZlcnNhdGlvbjogYm9vbGVhbjtcblxuICBwcml2YXRlIHJlYWRvbmx5IHN0YXJ0U2VhcmNoQ291bnRlcjogbnVtYmVyO1xuXG4gIHByaXZhdGUgcmVhZG9ubHkgc2VhcmNoRGlzYWJsZWQ6IGJvb2xlYW47XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzZWFyY2hUZXJtOiBzdHJpbmc7XG5cbiAgcHJpdmF0ZSByZWFkb25seSBzZWFyY2hDb252ZXJzYXRpb246IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGU7XG5cbiAgY29uc3RydWN0b3Ioe1xuICAgIGNvbnZlcnNhdGlvbnMsXG4gICAgYXJjaGl2ZWRDb252ZXJzYXRpb25zLFxuICAgIHBpbm5lZENvbnZlcnNhdGlvbnMsXG4gICAgaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uLFxuICAgIHN0YXJ0U2VhcmNoQ291bnRlcixcbiAgICBzZWFyY2hEaXNhYmxlZCxcbiAgICBzZWFyY2hUZXJtLFxuICAgIHNlYXJjaENvbnZlcnNhdGlvbixcbiAgfTogUmVhZG9ubHk8TGVmdFBhbmVJbmJveFByb3BzVHlwZT4pIHtcbiAgICBzdXBlcigpO1xuXG4gICAgdGhpcy5jb252ZXJzYXRpb25zID0gY29udmVyc2F0aW9ucztcbiAgICB0aGlzLmFyY2hpdmVkQ29udmVyc2F0aW9ucyA9IGFyY2hpdmVkQ29udmVyc2F0aW9ucztcbiAgICB0aGlzLnBpbm5lZENvbnZlcnNhdGlvbnMgPSBwaW5uZWRDb252ZXJzYXRpb25zO1xuICAgIHRoaXMuaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uID0gaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uO1xuICAgIHRoaXMuc3RhcnRTZWFyY2hDb3VudGVyID0gc3RhcnRTZWFyY2hDb3VudGVyO1xuICAgIHRoaXMuc2VhcmNoRGlzYWJsZWQgPSBzZWFyY2hEaXNhYmxlZDtcbiAgICB0aGlzLnNlYXJjaFRlcm0gPSBzZWFyY2hUZXJtO1xuICAgIHRoaXMuc2VhcmNoQ29udmVyc2F0aW9uID0gc2VhcmNoQ29udmVyc2F0aW9uO1xuICB9XG5cbiAgZ2V0Um93Q291bnQoKTogbnVtYmVyIHtcbiAgICBjb25zdCBoZWFkZXJDb3VudCA9IHRoaXMuaGFzUGlubmVkQW5kTm9ucGlubmVkKCkgPyAyIDogMDtcbiAgICBjb25zdCBidXR0b25Db3VudCA9IHRoaXMuYXJjaGl2ZWRDb252ZXJzYXRpb25zLmxlbmd0aCA/IDEgOiAwO1xuICAgIHJldHVybiAoXG4gICAgICBoZWFkZXJDb3VudCArXG4gICAgICB0aGlzLnBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICtcbiAgICAgIHRoaXMuY29udmVyc2F0aW9ucy5sZW5ndGggK1xuICAgICAgYnV0dG9uQ291bnRcbiAgICApO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0U2VhcmNoSW5wdXQoe1xuICAgIGNsZWFyQ29udmVyc2F0aW9uU2VhcmNoLFxuICAgIGNsZWFyU2VhcmNoLFxuICAgIGkxOG4sXG4gICAgc2hvd0NvbnZlcnNhdGlvbixcbiAgICB1cGRhdGVTZWFyY2hUZXJtLFxuICB9OiBSZWFkb25seTx7XG4gICAgY2xlYXJDb252ZXJzYXRpb25TZWFyY2g6ICgpID0+IHVua25vd247XG4gICAgY2xlYXJTZWFyY2g6ICgpID0+IHVua25vd247XG4gICAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgICBzaG93Q29udmVyc2F0aW9uOiBTaG93Q29udmVyc2F0aW9uVHlwZTtcbiAgICB1cGRhdGVTZWFyY2hUZXJtOiAoc2VhcmNoVGVybTogc3RyaW5nKSA9PiB1bmtub3duO1xuICB9Pik6IFJlYWN0Q2hpbGQge1xuICAgIHJldHVybiAoXG4gICAgICA8TGVmdFBhbmVTZWFyY2hJbnB1dFxuICAgICAgICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaD17Y2xlYXJDb252ZXJzYXRpb25TZWFyY2h9XG4gICAgICAgIGNsZWFyU2VhcmNoPXtjbGVhclNlYXJjaH1cbiAgICAgICAgZGlzYWJsZWQ9e3RoaXMuc2VhcmNoRGlzYWJsZWR9XG4gICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgIHNlYXJjaENvbnZlcnNhdGlvbj17dGhpcy5zZWFyY2hDb252ZXJzYXRpb259XG4gICAgICAgIHNlYXJjaFRlcm09e3RoaXMuc2VhcmNoVGVybX1cbiAgICAgICAgc2hvd0NvbnZlcnNhdGlvbj17c2hvd0NvbnZlcnNhdGlvbn1cbiAgICAgICAgc3RhcnRTZWFyY2hDb3VudGVyPXt0aGlzLnN0YXJ0U2VhcmNoQ291bnRlcn1cbiAgICAgICAgdXBkYXRlU2VhcmNoVGVybT17dXBkYXRlU2VhcmNoVGVybX1cbiAgICAgIC8+XG4gICAgKTtcbiAgfVxuXG4gIG92ZXJyaWRlIGdldFByZVJvd3NOb2RlKHtcbiAgICBpMThuLFxuICB9OiBSZWFkb25seTx7XG4gICAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgfT4pOiBSZWFjdENoaWxkIHwgbnVsbCB7XG4gICAgaWYgKHRoaXMuZ2V0Um93Q291bnQoKSA9PT0gMCkge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19lbXB0eVwiPlxuICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICA8SW50bFxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBpZD1cImVtcHR5SW5ib3hNZXNzYWdlXCJcbiAgICAgICAgICAgICAgY29tcG9uZW50cz17W1xuICAgICAgICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAgICAgICAgPHN0cm9uZz57aTE4bignY29tcG9zZUljb24nKX08L3N0cm9uZz5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2VtcHR5LS1jb21wb3Nlcl9pY29uXCI+XG4gICAgICAgICAgICAgICAgICAgIDxpIGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2VtcHR5LS1jb21wb3Nlcl9pY29uLS1pY29uXCIgLz5cbiAgICAgICAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3NwYW4+LFxuICAgICAgICAgICAgICBdfVxuICAgICAgICAgICAgLz5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICApO1xuICAgIH1cblxuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgZ2V0Um93KHJvd0luZGV4OiBudW1iZXIpOiB1bmRlZmluZWQgfCBSb3cge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9ucywgYXJjaGl2ZWRDb252ZXJzYXRpb25zLCBwaW5uZWRDb252ZXJzYXRpb25zIH0gPSB0aGlzO1xuXG4gICAgY29uc3QgYXJjaGl2ZWRDb252ZXJzYXRpb25zQ291bnQgPSBhcmNoaXZlZENvbnZlcnNhdGlvbnMubGVuZ3RoO1xuXG4gICAgaWYgKHRoaXMuaGFzUGlubmVkQW5kTm9ucGlubmVkKCkpIHtcbiAgICAgIHN3aXRjaCAocm93SW5kZXgpIHtcbiAgICAgICAgY2FzZSAwOlxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICB0eXBlOiBSb3dUeXBlLkhlYWRlcixcbiAgICAgICAgICAgIGkxOG5LZXk6ICdMZWZ0UGFuZS0tcGlubmVkJyxcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIHBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICsgMTpcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgdHlwZTogUm93VHlwZS5IZWFkZXIsXG4gICAgICAgICAgICBpMThuS2V5OiAnTGVmdFBhbmUtLWNoYXRzJyxcbiAgICAgICAgICB9O1xuICAgICAgICBjYXNlIHBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICsgY29udmVyc2F0aW9ucy5sZW5ndGggKyAyOlxuICAgICAgICAgIGlmIChhcmNoaXZlZENvbnZlcnNhdGlvbnNDb3VudCkge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogUm93VHlwZS5BcmNoaXZlQnV0dG9uLFxuICAgICAgICAgICAgICBhcmNoaXZlZENvbnZlcnNhdGlvbnNDb3VudCxcbiAgICAgICAgICAgIH07XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIGRlZmF1bHQ6IHtcbiAgICAgICAgICBjb25zdCBwaW5uZWRDb252ZXJzYXRpb24gPSBwaW5uZWRDb252ZXJzYXRpb25zW3Jvd0luZGV4IC0gMV07XG4gICAgICAgICAgaWYgKHBpbm5lZENvbnZlcnNhdGlvbikge1xuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgdHlwZTogUm93VHlwZS5Db252ZXJzYXRpb24sXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbjogcGlubmVkQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgfTtcbiAgICAgICAgICB9XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uID1cbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbnNbcm93SW5kZXggLSBwaW5uZWRDb252ZXJzYXRpb25zLmxlbmd0aCAtIDJdO1xuICAgICAgICAgIHJldHVybiBjb252ZXJzYXRpb25cbiAgICAgICAgICAgID8ge1xuICAgICAgICAgICAgICAgIHR5cGU6IFJvd1R5cGUuQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBjb25zdCBvbmx5Q29udmVyc2F0aW9ucyA9IHBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoXG4gICAgICA/IHBpbm5lZENvbnZlcnNhdGlvbnNcbiAgICAgIDogY29udmVyc2F0aW9ucztcbiAgICBpZiAocm93SW5kZXggPCBvbmx5Q29udmVyc2F0aW9ucy5sZW5ndGgpIHtcbiAgICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IG9ubHlDb252ZXJzYXRpb25zW3Jvd0luZGV4XTtcbiAgICAgIHJldHVybiBjb252ZXJzYXRpb25cbiAgICAgICAgPyB7XG4gICAgICAgICAgICB0eXBlOiBSb3dUeXBlLkNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgICB9XG4gICAgICAgIDogdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGlmIChyb3dJbmRleCA9PT0gb25seUNvbnZlcnNhdGlvbnMubGVuZ3RoICYmIGFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50KSB7XG4gICAgICByZXR1cm4ge1xuICAgICAgICB0eXBlOiBSb3dUeXBlLkFyY2hpdmVCdXR0b24sXG4gICAgICAgIGFyY2hpdmVkQ29udmVyc2F0aW9uc0NvdW50LFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgb3ZlcnJpZGUgZ2V0Um93SW5kZXhUb1Njcm9sbFRvKFxuICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IHN0cmluZ1xuICApOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICAgIGlmICghc2VsZWN0ZWRDb252ZXJzYXRpb25JZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBpc0NvbnZlcnNhdGlvblNlbGVjdGVkID0gKFxuICAgICAgY29udmVyc2F0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25MaXN0SXRlbVByb3BzVHlwZT5cbiAgICApID0+IGNvbnZlcnNhdGlvbi5pZCA9PT0gc2VsZWN0ZWRDb252ZXJzYXRpb25JZDtcbiAgICBjb25zdCBoYXNIZWFkZXJzID0gdGhpcy5oYXNQaW5uZWRBbmROb25waW5uZWQoKTtcblxuICAgIGNvbnN0IHBpbm5lZENvbnZlcnNhdGlvbkluZGV4ID0gdGhpcy5waW5uZWRDb252ZXJzYXRpb25zLmZpbmRJbmRleChcbiAgICAgIGlzQ29udmVyc2F0aW9uU2VsZWN0ZWRcbiAgICApO1xuICAgIGlmIChwaW5uZWRDb252ZXJzYXRpb25JbmRleCAhPT0gLTEpIHtcbiAgICAgIGNvbnN0IGhlYWRlck9mZnNldCA9IGhhc0hlYWRlcnMgPyAxIDogMDtcbiAgICAgIHJldHVybiBwaW5uZWRDb252ZXJzYXRpb25JbmRleCArIGhlYWRlck9mZnNldDtcbiAgICB9XG5cbiAgICBjb25zdCBjb252ZXJzYXRpb25JbmRleCA9IHRoaXMuY29udmVyc2F0aW9ucy5maW5kSW5kZXgoXG4gICAgICBpc0NvbnZlcnNhdGlvblNlbGVjdGVkXG4gICAgKTtcbiAgICBpZiAoY29udmVyc2F0aW9uSW5kZXggIT09IC0xKSB7XG4gICAgICBjb25zdCBwaW5uZWRPZmZzZXQgPSB0aGlzLnBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoO1xuICAgICAgY29uc3QgaGVhZGVyT2Zmc2V0ID0gaGFzSGVhZGVycyA/IDIgOiAwO1xuICAgICAgcmV0dXJuIGNvbnZlcnNhdGlvbkluZGV4ICsgcGlubmVkT2Zmc2V0ICsgaGVhZGVyT2Zmc2V0O1xuICAgIH1cblxuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBvdmVycmlkZSByZXF1aXJlc0Z1bGxXaWR0aCgpOiBib29sZWFuIHtcbiAgICBjb25zdCBoYXNOb0NvbnZlcnNhdGlvbnMgPVxuICAgICAgIXRoaXMuY29udmVyc2F0aW9ucy5sZW5ndGggJiZcbiAgICAgICF0aGlzLnBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICYmXG4gICAgICAhdGhpcy5hcmNoaXZlZENvbnZlcnNhdGlvbnMubGVuZ3RoO1xuICAgIHJldHVybiAoXG4gICAgICBoYXNOb0NvbnZlcnNhdGlvbnMgfHxcbiAgICAgIHRoaXMuaXNBYm91dFRvU2VhcmNoSW5BQ29udmVyc2F0aW9uIHx8XG4gICAgICBCb29sZWFuKHRoaXMuc3RhcnRTZWFyY2hDb3VudGVyKVxuICAgICk7XG4gIH1cblxuICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKG9sZDogUmVhZG9ubHk8TGVmdFBhbmVJbmJveFByb3BzVHlwZT4pOiBib29sZWFuIHtcbiAgICByZXR1cm4gb2xkLnBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoICE9PSB0aGlzLnBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoO1xuICB9XG5cbiAgZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgoXG4gICAgY29udmVyc2F0aW9uSW5kZXg6IG51bWJlclxuICApOiB1bmRlZmluZWQgfCB7IGNvbnZlcnNhdGlvbklkOiBzdHJpbmcgfSB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25zLCBwaW5uZWRDb252ZXJzYXRpb25zIH0gPSB0aGlzO1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9XG4gICAgICBwaW5uZWRDb252ZXJzYXRpb25zW2NvbnZlcnNhdGlvbkluZGV4XSB8fFxuICAgICAgY29udmVyc2F0aW9uc1tjb252ZXJzYXRpb25JbmRleCAtIHBpbm5lZENvbnZlcnNhdGlvbnMubGVuZ3RoXSB8fFxuICAgICAgbGFzdChjb252ZXJzYXRpb25zKSB8fFxuICAgICAgbGFzdChwaW5uZWRDb252ZXJzYXRpb25zKTtcbiAgICByZXR1cm4gY29udmVyc2F0aW9uID8geyBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkIH0gOiB1bmRlZmluZWQ7XG4gIH1cblxuICBnZXRDb252ZXJzYXRpb25BbmRNZXNzYWdlSW5EaXJlY3Rpb24oXG4gICAgdG9GaW5kOiBSZWFkb25seTxUb0ZpbmRUeXBlPixcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkOiB1bmRlZmluZWQgfCBzdHJpbmcsXG4gICAgX3NlbGVjdGVkTWVzc2FnZUlkOiB1bmtub3duXG4gICk6IHVuZGVmaW5lZCB8IHsgY29udmVyc2F0aW9uSWQ6IHN0cmluZyB9IHtcbiAgICByZXR1cm4gZ2V0Q29udmVyc2F0aW9uSW5EaXJlY3Rpb24oXG4gICAgICBbLi4udGhpcy5waW5uZWRDb252ZXJzYXRpb25zLCAuLi50aGlzLmNvbnZlcnNhdGlvbnNdLFxuICAgICAgdG9GaW5kLFxuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZFxuICAgICk7XG4gIH1cblxuICBvdmVycmlkZSBvbktleURvd24oXG4gICAgZXZlbnQ6IEtleWJvYXJkRXZlbnQsXG4gICAgb3B0aW9uczogUmVhZG9ubHk8e1xuICAgICAgc2VhcmNoSW5Db252ZXJzYXRpb246IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICAgICAgc3RhcnRTZWFyY2g6ICgpID0+IHVua25vd247XG4gICAgfT5cbiAgKTogdm9pZCB7XG4gICAgaGFuZGxlS2V5ZG93bkZvclNlYXJjaChldmVudCwgb3B0aW9ucyk7XG4gIH1cblxuICBwcml2YXRlIGhhc1Bpbm5lZEFuZE5vbnBpbm5lZCgpOiBib29sZWFuIHtcbiAgICByZXR1cm4gQm9vbGVhbihcbiAgICAgIHRoaXMucGlubmVkQ29udmVyc2F0aW9ucy5sZW5ndGggJiYgdGhpcy5jb252ZXJzYXRpb25zLmxlbmd0aFxuICAgICk7XG4gIH1cbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBcUI7QUFFckIsbUJBQWtCO0FBRWxCLGtCQUFxQjtBQU1yQiw0QkFBK0I7QUFDL0Isd0NBQTJDO0FBRTNDLDhCQUF3QjtBQUd4QixvQ0FBdUM7QUFDdkMsaUNBQW9DO0FBYTdCLE1BQU0sNEJBQTRCLHFDQUF1QztBQUFBLEVBaUI5RSxZQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxLQUNtQztBQUNuQyxVQUFNO0FBRU4sU0FBSyxnQkFBZ0I7QUFDckIsU0FBSyx3QkFBd0I7QUFDN0IsU0FBSyxzQkFBc0I7QUFDM0IsU0FBSyxpQ0FBaUM7QUFDdEMsU0FBSyxxQkFBcUI7QUFDMUIsU0FBSyxpQkFBaUI7QUFDdEIsU0FBSyxhQUFhO0FBQ2xCLFNBQUsscUJBQXFCO0FBQUEsRUFDNUI7QUFBQSxFQUVBLGNBQXNCO0FBQ3BC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
