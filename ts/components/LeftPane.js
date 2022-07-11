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
  LeftPane: () => LeftPane,
  LeftPaneMode: () => LeftPaneMode
});
module.exports = __toCommonJS(LeftPane_exports);
var import_react = __toESM(require("react"));
var import_react_measure = __toESM(require("react-measure"));
var import_classnames = __toESM(require("classnames"));
var import_lodash = require("lodash");
var import_LeftPaneHelper = require("./leftPane/LeftPaneHelper");
var import_LeftPaneInboxHelper = require("./leftPane/LeftPaneInboxHelper");
var import_LeftPaneSearchHelper = require("./leftPane/LeftPaneSearchHelper");
var import_LeftPaneArchiveHelper = require("./leftPane/LeftPaneArchiveHelper");
var import_LeftPaneComposeHelper = require("./leftPane/LeftPaneComposeHelper");
var import_LeftPaneChooseGroupMembersHelper = require("./leftPane/LeftPaneChooseGroupMembersHelper");
var import_LeftPaneSetGroupMetadataHelper = require("./leftPane/LeftPaneSetGroupMetadataHelper");
var OS = __toESM(require("../OS"));
var import_Util = require("../types/Util");
var import_usePrevious = require("../hooks/usePrevious");
var import_missingCaseError = require("../util/missingCaseError");
var import_util = require("./_util");
var KeyboardLayout = __toESM(require("../services/keyboardLayout"));
var import_leftPaneWidth = require("../util/leftPaneWidth");
var import_ConversationList = require("./ConversationList");
var import_ContactCheckbox = require("./conversationList/ContactCheckbox");
var LeftPaneMode = /* @__PURE__ */ ((LeftPaneMode2) => {
  LeftPaneMode2[LeftPaneMode2["Inbox"] = 0] = "Inbox";
  LeftPaneMode2[LeftPaneMode2["Search"] = 1] = "Search";
  LeftPaneMode2[LeftPaneMode2["Archive"] = 2] = "Archive";
  LeftPaneMode2[LeftPaneMode2["Compose"] = 3] = "Compose";
  LeftPaneMode2[LeftPaneMode2["ChooseGroupMembers"] = 4] = "ChooseGroupMembers";
  LeftPaneMode2[LeftPaneMode2["SetGroupMetadata"] = 5] = "SetGroupMetadata";
  return LeftPaneMode2;
})(LeftPaneMode || {});
const LeftPane = /* @__PURE__ */ __name(({
  challengeStatus,
  crashReportCount,
  clearConversationSearch,
  clearGroupCreationError,
  clearSearch,
  closeMaximumGroupSizeModal,
  closeRecommendedGroupSizeModal,
  composeDeleteAvatarFromDisk,
  composeReplaceAvatar,
  composeSaveAvatarToDisk,
  createGroup,
  getPreferredBadge,
  i18n,
  modeSpecificProps,
  preferredWidthFromStorage,
  renderCaptchaDialog,
  renderCrashReportDialog,
  renderExpiredBuildDialog,
  renderMainHeader,
  renderMessageSearchResult,
  renderNetworkStatus,
  renderRelinkDialog,
  renderUpdateDialog,
  savePreferredLeftPaneWidth,
  searchInConversation,
  selectedConversationId,
  selectedMessageId,
  setChallengeStatus,
  setComposeGroupAvatar,
  setComposeGroupExpireTimer,
  setComposeGroupName,
  setComposeSearchTerm,
  showArchivedConversations,
  showChooseGroupMembers,
  showInbox,
  startComposing,
  startSearch,
  showUserNotFoundModal,
  setIsFetchingUUID,
  lookupConversationWithoutUuid,
  toggleConversationInChooseMembers,
  showConversation,
  startSettingGroupMetadata,
  theme,
  toggleComposeEditingAvatar,
  updateSearchTerm
}) => {
  const [preferredWidth, setPreferredWidth] = (0, import_react.useState)((0, import_lodash.clamp)(preferredWidthFromStorage, import_leftPaneWidth.MIN_WIDTH, import_leftPaneWidth.MAX_WIDTH));
  const [isResizing, setIsResizing] = (0, import_react.useState)(false);
  const previousModeSpecificProps = (0, import_usePrevious.usePrevious)(modeSpecificProps, modeSpecificProps);
  let helper;
  let shouldRecomputeRowHeights;
  switch (modeSpecificProps.mode) {
    case 0 /* Inbox */: {
      const inboxHelper = new import_LeftPaneInboxHelper.LeftPaneInboxHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? inboxHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = inboxHelper;
      break;
    }
    case 1 /* Search */: {
      const searchHelper = new import_LeftPaneSearchHelper.LeftPaneSearchHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? searchHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = searchHelper;
      break;
    }
    case 2 /* Archive */: {
      const archiveHelper = new import_LeftPaneArchiveHelper.LeftPaneArchiveHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? archiveHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = archiveHelper;
      break;
    }
    case 3 /* Compose */: {
      const composeHelper = new import_LeftPaneComposeHelper.LeftPaneComposeHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? composeHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = composeHelper;
      break;
    }
    case 4 /* ChooseGroupMembers */: {
      const chooseGroupMembersHelper = new import_LeftPaneChooseGroupMembersHelper.LeftPaneChooseGroupMembersHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? chooseGroupMembersHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = chooseGroupMembersHelper;
      break;
    }
    case 5 /* SetGroupMetadata */: {
      const setGroupMetadataHelper = new import_LeftPaneSetGroupMetadataHelper.LeftPaneSetGroupMetadataHelper(modeSpecificProps);
      shouldRecomputeRowHeights = previousModeSpecificProps.mode === modeSpecificProps.mode ? setGroupMetadataHelper.shouldRecomputeRowHeights(previousModeSpecificProps) : true;
      helper = setGroupMetadataHelper;
      break;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(modeSpecificProps);
  }
  (0, import_react.useEffect)(() => {
    const onKeyDown = /* @__PURE__ */ __name((event) => {
      const { ctrlKey, shiftKey, altKey, metaKey } = event;
      const commandOrCtrl = OS.isMacOS() ? metaKey : ctrlKey;
      const key = KeyboardLayout.lookup(event);
      if (key === "Escape") {
        const backAction = helper.getBackAction({
          showInbox,
          startComposing,
          showChooseGroupMembers
        });
        if (backAction) {
          event.preventDefault();
          event.stopPropagation();
          backAction();
          return;
        }
      }
      if (commandOrCtrl && !shiftKey && !altKey && (key === "n" || key === "N")) {
        startComposing();
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      let conversationToOpen;
      const numericIndex = keyboardKeyToNumericIndex(event.key);
      const openedByNumber = commandOrCtrl && (0, import_lodash.isNumber)(numericIndex);
      if (openedByNumber) {
        conversationToOpen = helper.getConversationAndMessageAtIndex(numericIndex);
      } else {
        let toFind;
        if (altKey && !shiftKey && key === "ArrowUp" || commandOrCtrl && shiftKey && key === "[" || ctrlKey && shiftKey && key === "Tab") {
          toFind = { direction: import_LeftPaneHelper.FindDirection.Up, unreadOnly: false };
        } else if (altKey && !shiftKey && key === "ArrowDown" || commandOrCtrl && shiftKey && key === "]" || ctrlKey && key === "Tab") {
          toFind = { direction: import_LeftPaneHelper.FindDirection.Down, unreadOnly: false };
        } else if (altKey && shiftKey && key === "ArrowUp") {
          toFind = { direction: import_LeftPaneHelper.FindDirection.Up, unreadOnly: true };
        } else if (altKey && shiftKey && key === "ArrowDown") {
          toFind = { direction: import_LeftPaneHelper.FindDirection.Down, unreadOnly: true };
        }
        if (toFind) {
          conversationToOpen = helper.getConversationAndMessageInDirection(toFind, selectedConversationId, selectedMessageId);
        }
      }
      if (conversationToOpen) {
        const { conversationId, messageId } = conversationToOpen;
        showConversation({ conversationId, messageId });
        if (openedByNumber) {
          clearSearch();
        }
        event.preventDefault();
        event.stopPropagation();
      }
      helper.onKeyDown(event, {
        searchInConversation,
        selectedConversationId,
        startSearch
      });
    }, "onKeyDown");
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [
    clearSearch,
    helper,
    searchInConversation,
    selectedConversationId,
    selectedMessageId,
    showChooseGroupMembers,
    showConversation,
    showInbox,
    startComposing,
    startSearch
  ]);
  const requiresFullWidth = helper.requiresFullWidth();
  (0, import_react.useEffect)(() => {
    if (!isResizing) {
      return import_lodash.noop;
    }
    const onMouseMove = /* @__PURE__ */ __name((event) => {
      let width2;
      if (requiresFullWidth) {
        width2 = Math.max(event.clientX, import_leftPaneWidth.MIN_FULL_WIDTH);
      } else if (event.clientX < import_leftPaneWidth.SNAP_WIDTH) {
        width2 = import_leftPaneWidth.MIN_WIDTH;
      } else {
        width2 = (0, import_lodash.clamp)(event.clientX, import_leftPaneWidth.MIN_FULL_WIDTH, import_leftPaneWidth.MAX_WIDTH);
      }
      setPreferredWidth(Math.min(width2, import_leftPaneWidth.MAX_WIDTH));
      event.preventDefault();
    }, "onMouseMove");
    const stopResizing = /* @__PURE__ */ __name(() => {
      setIsResizing(false);
    }, "stopResizing");
    document.body.addEventListener("mousemove", onMouseMove);
    document.body.addEventListener("mouseup", stopResizing);
    document.body.addEventListener("mouseleave", stopResizing);
    return () => {
      document.body.removeEventListener("mousemove", onMouseMove);
      document.body.removeEventListener("mouseup", stopResizing);
      document.body.removeEventListener("mouseleave", stopResizing);
    };
  }, [isResizing, requiresFullWidth]);
  (0, import_react.useEffect)(() => {
    if (!isResizing) {
      return import_lodash.noop;
    }
    document.body.classList.add("is-resizing-left-pane");
    return () => {
      document.body.classList.remove("is-resizing-left-pane");
    };
  }, [isResizing]);
  (0, import_react.useEffect)(() => {
    if (isResizing || preferredWidth === preferredWidthFromStorage) {
      return;
    }
    const timeout = setTimeout(() => {
      savePreferredLeftPaneWidth(preferredWidth);
    }, 1e3);
    return () => {
      clearTimeout(timeout);
    };
  }, [
    isResizing,
    preferredWidth,
    preferredWidthFromStorage,
    savePreferredLeftPaneWidth
  ]);
  const preRowsNode = helper.getPreRowsNode({
    clearConversationSearch,
    clearGroupCreationError,
    clearSearch,
    closeMaximumGroupSizeModal,
    closeRecommendedGroupSizeModal,
    composeDeleteAvatarFromDisk,
    composeReplaceAvatar,
    composeSaveAvatarToDisk,
    createGroup,
    i18n,
    removeSelectedContact: toggleConversationInChooseMembers,
    setComposeGroupAvatar,
    setComposeGroupExpireTimer,
    setComposeGroupName,
    toggleComposeEditingAvatar
  });
  const footerContents = helper.getFooterContents({
    createGroup,
    i18n,
    startSettingGroupMetadata
  });
  const getRow = (0, import_react.useMemo)(() => helper.getRow.bind(helper), [helper]);
  const onSelectConversation = (0, import_react.useCallback)((conversationId, messageId) => {
    showConversation({
      conversationId,
      messageId,
      switchToAssociatedView: true
    });
  }, [showConversation]);
  const previousSelectedConversationId = (0, import_usePrevious.usePrevious)(selectedConversationId, selectedConversationId);
  const isScrollable = helper.isScrollable();
  let rowIndexToScrollTo;
  let scrollBehavior;
  if (isScrollable) {
    rowIndexToScrollTo = previousSelectedConversationId === selectedConversationId ? void 0 : helper.getRowIndexToScrollTo(selectedConversationId);
    scrollBehavior = import_Util.ScrollBehavior.Default;
  } else {
    rowIndexToScrollTo = 0;
    scrollBehavior = import_Util.ScrollBehavior.Hard;
  }
  const listKey = preRowsNode ? 1 : 0;
  const width = (0, import_leftPaneWidth.getWidthFromPreferredWidth)(preferredWidth, {
    requiresFullWidth
  });
  const widthBreakpoint = (0, import_util.getConversationListWidthBreakpoint)(width);
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-left-pane", isResizing && "module-left-pane--is-resizing", `module-left-pane--width-${widthBreakpoint}`),
    style: { width }
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__header"
  }, helper.getHeaderContents({
    i18n,
    showInbox,
    startComposing,
    showChooseGroupMembers
  }) || renderMainHeader()), helper.getSearchInput({
    clearConversationSearch,
    clearSearch,
    i18n,
    onChangeComposeSearchTerm: (event) => {
      setComposeSearchTerm(event.target.value);
    },
    updateSearchTerm,
    showConversation
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__dialogs"
  }, renderExpiredBuildDialog({
    containerWidthBreakpoint: widthBreakpoint
  }), renderRelinkDialog({ containerWidthBreakpoint: widthBreakpoint }), renderNetworkStatus({ containerWidthBreakpoint: widthBreakpoint }), renderUpdateDialog({ containerWidthBreakpoint: widthBreakpoint })), preRowsNode && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, {
    key: 0
  }, preRowsNode), /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
    bounds: true
  }, ({ contentRect, measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__list--measure",
    ref: measureRef
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__list--wrapper"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    "aria-live": "polite",
    className: "module-left-pane__list",
    key: listKey,
    role: "presentation",
    tabIndex: -1
  }, /* @__PURE__ */ import_react.default.createElement(import_ConversationList.ConversationList, {
    dimensions: {
      width,
      height: contentRect.bounds?.height || 0
    },
    getPreferredBadge,
    getRow,
    i18n,
    onClickArchiveButton: showArchivedConversations,
    onClickContactCheckbox: (conversationId, disabledReason) => {
      switch (disabledReason) {
        case void 0:
          toggleConversationInChooseMembers(conversationId);
          break;
        case import_ContactCheckbox.ContactCheckboxDisabledReason.AlreadyAdded:
        case import_ContactCheckbox.ContactCheckboxDisabledReason.MaximumContactsSelected:
          break;
        default:
          throw (0, import_missingCaseError.missingCaseError)(disabledReason);
      }
    },
    showUserNotFoundModal,
    setIsFetchingUUID,
    lookupConversationWithoutUuid,
    showConversation,
    onSelectConversation,
    renderMessageSearchResult,
    rowCount: helper.getRowCount(),
    scrollBehavior,
    scrollToRowIndex: rowIndexToScrollTo,
    scrollable: isScrollable,
    shouldRecomputeRowHeights,
    showChooseGroupMembers,
    theme
  }))))), footerContents && /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__footer"
  }, footerContents), /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-left-pane__resize-grab-area",
    onMouseDown: () => {
      setIsResizing(true);
    }
  })), challengeStatus !== "idle" && renderCaptchaDialog({
    onSkip() {
      setChallengeStatus("idle");
    }
  }), crashReportCount > 0 && renderCrashReportDialog());
}, "LeftPane");
function keyboardKeyToNumericIndex(key) {
  if (key.length !== 1) {
    return void 0;
  }
  const result = parseInt(key, 10) - 1;
  const isValidIndex = Number.isInteger(result) && result >= 0 && result <= 8;
  return isValidIndex ? result : void 0;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  LeftPane,
  LeftPaneMode
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTGVmdFBhbmUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0LCB7IHVzZUVmZmVjdCwgdXNlQ2FsbGJhY2ssIHVzZU1lbW8sIHVzZVN0YXRlIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHR5cGUgeyBNZWFzdXJlZENvbXBvbmVudFByb3BzIH0gZnJvbSAncmVhY3QtbWVhc3VyZSc7XG5pbXBvcnQgTWVhc3VyZSBmcm9tICdyZWFjdC1tZWFzdXJlJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHsgY2xhbXAsIGlzTnVtYmVyLCBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUgeyBMZWZ0UGFuZUhlbHBlciwgVG9GaW5kVHlwZSB9IGZyb20gJy4vbGVmdFBhbmUvTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHsgRmluZERpcmVjdGlvbiB9IGZyb20gJy4vbGVmdFBhbmUvTGVmdFBhbmVIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBMZWZ0UGFuZUluYm94UHJvcHNUeXBlIH0gZnJvbSAnLi9sZWZ0UGFuZS9MZWZ0UGFuZUluYm94SGVscGVyJztcbmltcG9ydCB7IExlZnRQYW5lSW5ib3hIZWxwZXIgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lSW5ib3hIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBMZWZ0UGFuZVNlYXJjaFByb3BzVHlwZSB9IGZyb20gJy4vbGVmdFBhbmUvTGVmdFBhbmVTZWFyY2hIZWxwZXInO1xuaW1wb3J0IHsgTGVmdFBhbmVTZWFyY2hIZWxwZXIgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lU2VhcmNoSGVscGVyJztcbmltcG9ydCB0eXBlIHsgTGVmdFBhbmVBcmNoaXZlUHJvcHNUeXBlIH0gZnJvbSAnLi9sZWZ0UGFuZS9MZWZ0UGFuZUFyY2hpdmVIZWxwZXInO1xuaW1wb3J0IHsgTGVmdFBhbmVBcmNoaXZlSGVscGVyIH0gZnJvbSAnLi9sZWZ0UGFuZS9MZWZ0UGFuZUFyY2hpdmVIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBMZWZ0UGFuZUNvbXBvc2VQcm9wc1R5cGUgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lQ29tcG9zZUhlbHBlcic7XG5pbXBvcnQgeyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lQ29tcG9zZUhlbHBlcic7XG5pbXBvcnQgdHlwZSB7IExlZnRQYW5lQ2hvb3NlR3JvdXBNZW1iZXJzUHJvcHNUeXBlIH0gZnJvbSAnLi9sZWZ0UGFuZS9MZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcic7XG5pbXBvcnQgeyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlciB9IGZyb20gJy4vbGVmdFBhbmUvTGVmdFBhbmVDaG9vc2VHcm91cE1lbWJlcnNIZWxwZXInO1xuaW1wb3J0IHR5cGUgeyBMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFQcm9wc1R5cGUgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YUhlbHBlcic7XG5pbXBvcnQgeyBMZWZ0UGFuZVNldEdyb3VwTWV0YWRhdGFIZWxwZXIgfSBmcm9tICcuL2xlZnRQYW5lL0xlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YUhlbHBlcic7XG5cbmltcG9ydCAqIGFzIE9TIGZyb20gJy4uL09TJztcbmltcG9ydCB0eXBlIHsgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBTY3JvbGxCZWhhdmlvciB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuaW1wb3J0IHR5cGUgeyBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZSB9IGZyb20gJy4uL3N0YXRlL3NlbGVjdG9ycy9iYWRnZXMnO1xuaW1wb3J0IHsgdXNlUHJldmlvdXMgfSBmcm9tICcuLi9ob29rcy91c2VQcmV2aW91cyc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB0eXBlIHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25MaXN0V2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi9fdXRpbCc7XG5pbXBvcnQgKiBhcyBLZXlib2FyZExheW91dCBmcm9tICcuLi9zZXJ2aWNlcy9rZXlib2FyZExheW91dCc7XG5pbXBvcnQge1xuICBNSU5fV0lEVEgsXG4gIFNOQVBfV0lEVEgsXG4gIE1JTl9GVUxMX1dJRFRILFxuICBNQVhfV0lEVEgsXG4gIGdldFdpZHRoRnJvbVByZWZlcnJlZFdpZHRoLFxufSBmcm9tICcuLi91dGlsL2xlZnRQYW5lV2lkdGgnO1xuaW1wb3J0IHR5cGUgeyBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZEFjdGlvbnNUeXBlIH0gZnJvbSAnLi4vdXRpbC9sb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZCc7XG5pbXBvcnQgdHlwZSB7IFNob3dDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5cbmltcG9ydCB7IENvbnZlcnNhdGlvbkxpc3QgfSBmcm9tICcuL0NvbnZlcnNhdGlvbkxpc3QnO1xuaW1wb3J0IHsgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb24gfSBmcm9tICcuL2NvbnZlcnNhdGlvbkxpc3QvQ29udGFjdENoZWNrYm94JztcblxuaW1wb3J0IHR5cGUge1xuICBEZWxldGVBdmF0YXJGcm9tRGlza0FjdGlvblR5cGUsXG4gIFJlcGxhY2VBdmF0YXJBY3Rpb25UeXBlLFxuICBTYXZlQXZhdGFyVG9EaXNrQWN0aW9uVHlwZSxcbn0gZnJvbSAnLi4vdHlwZXMvQXZhdGFyJztcblxuZXhwb3J0IGVudW0gTGVmdFBhbmVNb2RlIHtcbiAgSW5ib3gsXG4gIFNlYXJjaCxcbiAgQXJjaGl2ZSxcbiAgQ29tcG9zZSxcbiAgQ2hvb3NlR3JvdXBNZW1iZXJzLFxuICBTZXRHcm91cE1ldGFkYXRhLFxufVxuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSB7XG4gIC8vIFRoZXNlIGhlbHAgcHJldmVudCBpbnZhbGlkIHN0YXRlcy4gRm9yIGV4YW1wbGUsIHdlIGRvbid0IG5lZWQgdGhlIGxpc3Qgb2YgcGlubmVkXG4gIC8vICAgY29udmVyc2F0aW9ucyBpZiB3ZSdyZSB0cnlpbmcgdG8gc3RhcnQgYSBuZXcgY29udmVyc2F0aW9uLiBJZGVhbGx5IHRoZXNlIHdvdWxkIGJlXG4gIC8vICAgYXQgdGhlIHRvcCBsZXZlbCwgYnV0IHRoaXMgaXMgbm90IHN1cHBvcnRlZCBieSByZWFjdC1yZWR1eCArIFR5cGVTY3JpcHQuXG4gIG1vZGVTcGVjaWZpY1Byb3BzOlxuICAgIHwgKHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkluYm94O1xuICAgICAgfSAmIExlZnRQYW5lSW5ib3hQcm9wc1R5cGUpXG4gICAgfCAoe1xuICAgICAgICBtb2RlOiBMZWZ0UGFuZU1vZGUuU2VhcmNoO1xuICAgICAgfSAmIExlZnRQYW5lU2VhcmNoUHJvcHNUeXBlKVxuICAgIHwgKHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkFyY2hpdmU7XG4gICAgICB9ICYgTGVmdFBhbmVBcmNoaXZlUHJvcHNUeXBlKVxuICAgIHwgKHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNvbXBvc2U7XG4gICAgICB9ICYgTGVmdFBhbmVDb21wb3NlUHJvcHNUeXBlKVxuICAgIHwgKHtcbiAgICAgICAgbW9kZTogTGVmdFBhbmVNb2RlLkNob29zZUdyb3VwTWVtYmVycztcbiAgICAgIH0gJiBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc1Byb3BzVHlwZSlcbiAgICB8ICh7XG4gICAgICAgIG1vZGU6IExlZnRQYW5lTW9kZS5TZXRHcm91cE1ldGFkYXRhO1xuICAgICAgfSAmIExlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YVByb3BzVHlwZSk7XG4gIGdldFByZWZlcnJlZEJhZGdlOiBQcmVmZXJyZWRCYWRnZVNlbGVjdG9yVHlwZTtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgcHJlZmVycmVkV2lkdGhGcm9tU3RvcmFnZTogbnVtYmVyO1xuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkOiB1bmRlZmluZWQgfCBzdHJpbmc7XG4gIHNlbGVjdGVkTWVzc2FnZUlkOiB1bmRlZmluZWQgfCBzdHJpbmc7XG4gIHJlZ2lvbkNvZGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgY2hhbGxlbmdlU3RhdHVzOiAnaWRsZScgfCAncmVxdWlyZWQnIHwgJ3BlbmRpbmcnO1xuICBzZXRDaGFsbGVuZ2VTdGF0dXM6IChzdGF0dXM6ICdpZGxlJykgPT4gdm9pZDtcbiAgY3Jhc2hSZXBvcnRDb3VudDogbnVtYmVyO1xuICB0aGVtZTogVGhlbWVUeXBlO1xuXG4gIC8vIEFjdGlvbiBDcmVhdG9yc1xuICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaDogKCkgPT4gdm9pZDtcbiAgY2xlYXJHcm91cENyZWF0aW9uRXJyb3I6ICgpID0+IHZvaWQ7XG4gIGNsZWFyU2VhcmNoOiAoKSA9PiB2b2lkO1xuICBjbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbDogKCkgPT4gdm9pZDtcbiAgY2xvc2VSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsOiAoKSA9PiB2b2lkO1xuICBjb21wb3NlRGVsZXRlQXZhdGFyRnJvbURpc2s6IERlbGV0ZUF2YXRhckZyb21EaXNrQWN0aW9uVHlwZTtcbiAgY29tcG9zZVJlcGxhY2VBdmF0YXI6IFJlcGxhY2VBdmF0YXJBY3Rpb25UeXBlO1xuICBjb21wb3NlU2F2ZUF2YXRhclRvRGlzazogU2F2ZUF2YXRhclRvRGlza0FjdGlvblR5cGU7XG4gIGNyZWF0ZUdyb3VwOiAoKSA9PiB2b2lkO1xuICBzYXZlUHJlZmVycmVkTGVmdFBhbmVXaWR0aDogKF86IG51bWJlcikgPT4gdm9pZDtcbiAgc2VhcmNoSW5Db252ZXJzYXRpb246IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBzZXRDb21wb3NlR3JvdXBBdmF0YXI6IChfOiB1bmRlZmluZWQgfCBVaW50OEFycmF5KSA9PiB2b2lkO1xuICBzZXRDb21wb3NlR3JvdXBFeHBpcmVUaW1lcjogKF86IG51bWJlcikgPT4gdm9pZDtcbiAgc2V0Q29tcG9zZUdyb3VwTmFtZTogKF86IHN0cmluZykgPT4gdm9pZDtcbiAgc2V0Q29tcG9zZVNlYXJjaFRlcm06IChjb21wb3NlU2VhcmNoVGVybTogc3RyaW5nKSA9PiB2b2lkO1xuICBzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zOiAoKSA9PiB2b2lkO1xuICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzOiAoKSA9PiB2b2lkO1xuICBzaG93Q29udmVyc2F0aW9uOiBTaG93Q29udmVyc2F0aW9uVHlwZTtcbiAgc2hvd0luYm94OiAoKSA9PiB2b2lkO1xuICBzdGFydENvbXBvc2luZzogKCkgPT4gdm9pZDtcbiAgc3RhcnRTZWFyY2g6ICgpID0+IHVua25vd247XG4gIHN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGE6ICgpID0+IHZvaWQ7XG4gIHRvZ2dsZUNvbXBvc2VFZGl0aW5nQXZhdGFyOiAoKSA9PiB1bmtub3duO1xuICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnM6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xuICB1cGRhdGVTZWFyY2hUZXJtOiAoXzogc3RyaW5nKSA9PiB2b2lkO1xuXG4gIC8vIFJlbmRlciBQcm9wc1xuICByZW5kZXJFeHBpcmVkQnVpbGREaWFsb2c6IChcbiAgICBfOiBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+XG4gICkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlck1haW5IZWFkZXI6ICgpID0+IEpTWC5FbGVtZW50O1xuICByZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0OiAoaWQ6IHN0cmluZykgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlck5ldHdvcmtTdGF0dXM6IChcbiAgICBfOiBSZWFkb25seTx7IGNvbnRhaW5lcldpZHRoQnJlYWtwb2ludDogV2lkdGhCcmVha3BvaW50IH0+XG4gICkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlclJlbGlua0RpYWxvZzogKFxuICAgIF86IFJlYWRvbmx5PHsgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQgfT5cbiAgKSA9PiBKU1guRWxlbWVudDtcbiAgcmVuZGVyVXBkYXRlRGlhbG9nOiAoXG4gICAgXzogUmVhZG9ubHk8eyBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludCB9PlxuICApID0+IEpTWC5FbGVtZW50O1xuICByZW5kZXJDYXB0Y2hhRGlhbG9nOiAocHJvcHM6IHsgb25Ta2lwKCk6IHZvaWQgfSkgPT4gSlNYLkVsZW1lbnQ7XG4gIHJlbmRlckNyYXNoUmVwb3J0RGlhbG9nOiAoKSA9PiBKU1guRWxlbWVudDtcbn0gJiBMb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZEFjdGlvbnNUeXBlO1xuXG5leHBvcnQgY29uc3QgTGVmdFBhbmU6IFJlYWN0LkZDPFByb3BzVHlwZT4gPSAoe1xuICBjaGFsbGVuZ2VTdGF0dXMsXG4gIGNyYXNoUmVwb3J0Q291bnQsXG4gIGNsZWFyQ29udmVyc2F0aW9uU2VhcmNoLFxuICBjbGVhckdyb3VwQ3JlYXRpb25FcnJvcixcbiAgY2xlYXJTZWFyY2gsXG4gIGNsb3NlTWF4aW11bUdyb3VwU2l6ZU1vZGFsLFxuICBjbG9zZVJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWwsXG4gIGNvbXBvc2VEZWxldGVBdmF0YXJGcm9tRGlzayxcbiAgY29tcG9zZVJlcGxhY2VBdmF0YXIsXG4gIGNvbXBvc2VTYXZlQXZhdGFyVG9EaXNrLFxuICBjcmVhdGVHcm91cCxcbiAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gIGkxOG4sXG4gIG1vZGVTcGVjaWZpY1Byb3BzLFxuICBwcmVmZXJyZWRXaWR0aEZyb21TdG9yYWdlLFxuICByZW5kZXJDYXB0Y2hhRGlhbG9nLFxuICByZW5kZXJDcmFzaFJlcG9ydERpYWxvZyxcbiAgcmVuZGVyRXhwaXJlZEJ1aWxkRGlhbG9nLFxuICByZW5kZXJNYWluSGVhZGVyLFxuICByZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0LFxuICByZW5kZXJOZXR3b3JrU3RhdHVzLFxuICByZW5kZXJSZWxpbmtEaWFsb2csXG4gIHJlbmRlclVwZGF0ZURpYWxvZyxcbiAgc2F2ZVByZWZlcnJlZExlZnRQYW5lV2lkdGgsXG4gIHNlYXJjaEluQ29udmVyc2F0aW9uLFxuICBzZWxlY3RlZENvbnZlcnNhdGlvbklkLFxuICBzZWxlY3RlZE1lc3NhZ2VJZCxcbiAgc2V0Q2hhbGxlbmdlU3RhdHVzLFxuICBzZXRDb21wb3NlR3JvdXBBdmF0YXIsXG4gIHNldENvbXBvc2VHcm91cEV4cGlyZVRpbWVyLFxuICBzZXRDb21wb3NlR3JvdXBOYW1lLFxuICBzZXRDb21wb3NlU2VhcmNoVGVybSxcbiAgc2hvd0FyY2hpdmVkQ29udmVyc2F0aW9ucyxcbiAgc2hvd0Nob29zZUdyb3VwTWVtYmVycyxcbiAgc2hvd0luYm94LFxuICBzdGFydENvbXBvc2luZyxcbiAgc3RhcnRTZWFyY2gsXG4gIHNob3dVc2VyTm90Rm91bmRNb2RhbCxcbiAgc2V0SXNGZXRjaGluZ1VVSUQsXG4gIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkLFxuICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMsXG4gIHNob3dDb252ZXJzYXRpb24sXG4gIHN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGEsXG4gIHRoZW1lLFxuICB0b2dnbGVDb21wb3NlRWRpdGluZ0F2YXRhcixcbiAgdXBkYXRlU2VhcmNoVGVybSxcbn0pID0+IHtcbiAgY29uc3QgW3ByZWZlcnJlZFdpZHRoLCBzZXRQcmVmZXJyZWRXaWR0aF0gPSB1c2VTdGF0ZShcbiAgICAvLyBUaGlzIGNsYW1wIGlzIHByZXNlbnQganVzdCBpbiBjYXNlIHdlIGdldCBhIGJvZ3VzIHZhbHVlIGZyb20gc3RvcmFnZS5cbiAgICBjbGFtcChwcmVmZXJyZWRXaWR0aEZyb21TdG9yYWdlLCBNSU5fV0lEVEgsIE1BWF9XSURUSClcbiAgKTtcbiAgY29uc3QgW2lzUmVzaXppbmcsIHNldElzUmVzaXppbmddID0gdXNlU3RhdGUoZmFsc2UpO1xuXG4gIGNvbnN0IHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHMgPSB1c2VQcmV2aW91cyhcbiAgICBtb2RlU3BlY2lmaWNQcm9wcyxcbiAgICBtb2RlU3BlY2lmaWNQcm9wc1xuICApO1xuXG4gIC8vIFRoZSBsZWZ0IHBhbmUgY2FuIGJlIGluIHZhcmlvdXMgbW9kZXM6IHRoZSBpbmJveCwgdGhlIGFyY2hpdmUsIHRoZSBjb21wb3NlciwgZXRjLlxuICAvLyAgIElkZWFsbHksIHRoaXMgd291bGQgcmVuZGVyIHN1YmNvbXBvbmVudHMgc3VjaCBhcyBgPExlZnRQYW5lSW5ib3g+YCBvclxuICAvLyAgIGA8TGVmdFBhbmVBcmNoaXZlPmAgKGFuZCBpZiB0aGVyZSdzIGEgd2F5IHRvIGRvIHRoYXQgY2xlYW5seSwgd2Ugc2hvdWxkIHJlZmFjdG9yXG4gIC8vICAgdGhpcykuXG4gIC8vXG4gIC8vIEJ1dCBkb2luZyB0aGF0IHByZXNlbnRzIHR3byBwcm9ibGVtczpcbiAgLy9cbiAgLy8gMS4gRGlmZmVyZW50IGNvbXBvbmVudHMgcmVuZGVyIHRoZSBzYW1lIGxvZ2ljYWwgaW5wdXRzICh0aGUgbWFpbiBoZWFkZXIncyBzZWFyY2gpLFxuICAvLyAgICBidXQgUmVhY3QgZG9lc24ndCBrbm93IHRoYXQgdGhleSdyZSB0aGUgc2FtZSwgc28geW91IGNhbiBsb3NlIGZvY3VzIGFzIHlvdSBjaGFuZ2VcbiAgLy8gICAgbW9kZXMuXG4gIC8vIDIuIFRoZXNlIGNvbXBvbmVudHMgcmVuZGVyIHZpcnR1YWxpemVkIGxpc3RzLCB3aGljaCBhcmUgc29tZXdoYXQgc2xvdyB0byBpbml0aWFsaXplLlxuICAvLyAgICBTd2l0Y2hpbmcgYmV0d2VlbiBtb2RlcyBjYW4gY2F1c2Ugbm90aWNlYWJsZSBoaWNjdXBzLlxuICAvL1xuICAvLyBUbyBnZXQgYXJvdW5kIHRob3NlIHByb2JsZW1zLCB3ZSB1c2UgXCJoZWxwZXJzXCIgd2hpY2ggYWxsIGNvcnJlc3BvbmQgdG8gdGhlIHNhbWVcbiAgLy8gICBpbnRlcmZhY2UuXG4gIC8vXG4gIC8vIFVuZm9ydHVuYXRlbHksIHRoZXJlJ3MgYSBsaXR0bGUgYml0IG9mIHJlcGV0aXRpb24gaGVyZSBiZWNhdXNlIFR5cGVTY3JpcHQgaXNuJ3QgcXVpdGVcbiAgLy8gICBzbWFydCBlbm91Z2guXG4gIGxldCBoZWxwZXI6IExlZnRQYW5lSGVscGVyPHVua25vd24+O1xuICBsZXQgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0czogYm9vbGVhbjtcbiAgc3dpdGNoIChtb2RlU3BlY2lmaWNQcm9wcy5tb2RlKSB7XG4gICAgY2FzZSBMZWZ0UGFuZU1vZGUuSW5ib3g6IHtcbiAgICAgIGNvbnN0IGluYm94SGVscGVyID0gbmV3IExlZnRQYW5lSW5ib3hIZWxwZXIobW9kZVNwZWNpZmljUHJvcHMpO1xuICAgICAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyA9XG4gICAgICAgIHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHMubW9kZSA9PT0gbW9kZVNwZWNpZmljUHJvcHMubW9kZVxuICAgICAgICAgID8gaW5ib3hIZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyhwcmV2aW91c01vZGVTcGVjaWZpY1Byb3BzKVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgIGhlbHBlciA9IGluYm94SGVscGVyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgTGVmdFBhbmVNb2RlLlNlYXJjaDoge1xuICAgICAgY29uc3Qgc2VhcmNoSGVscGVyID0gbmV3IExlZnRQYW5lU2VhcmNoSGVscGVyKG1vZGVTcGVjaWZpY1Byb3BzKTtcbiAgICAgIHNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMgPVxuICAgICAgICBwcmV2aW91c01vZGVTcGVjaWZpY1Byb3BzLm1vZGUgPT09IG1vZGVTcGVjaWZpY1Byb3BzLm1vZGVcbiAgICAgICAgICA/IHNlYXJjaEhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHMpXG4gICAgICAgICAgOiB0cnVlO1xuICAgICAgaGVscGVyID0gc2VhcmNoSGVscGVyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgTGVmdFBhbmVNb2RlLkFyY2hpdmU6IHtcbiAgICAgIGNvbnN0IGFyY2hpdmVIZWxwZXIgPSBuZXcgTGVmdFBhbmVBcmNoaXZlSGVscGVyKG1vZGVTcGVjaWZpY1Byb3BzKTtcbiAgICAgIHNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMgPVxuICAgICAgICBwcmV2aW91c01vZGVTcGVjaWZpY1Byb3BzLm1vZGUgPT09IG1vZGVTcGVjaWZpY1Byb3BzLm1vZGVcbiAgICAgICAgICA/IGFyY2hpdmVIZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyhwcmV2aW91c01vZGVTcGVjaWZpY1Byb3BzKVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgIGhlbHBlciA9IGFyY2hpdmVIZWxwZXI7XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgY2FzZSBMZWZ0UGFuZU1vZGUuQ29tcG9zZToge1xuICAgICAgY29uc3QgY29tcG9zZUhlbHBlciA9IG5ldyBMZWZ0UGFuZUNvbXBvc2VIZWxwZXIobW9kZVNwZWNpZmljUHJvcHMpO1xuICAgICAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyA9XG4gICAgICAgIHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHMubW9kZSA9PT0gbW9kZVNwZWNpZmljUHJvcHMubW9kZVxuICAgICAgICAgID8gY29tcG9zZUhlbHBlci5zaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzKHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHMpXG4gICAgICAgICAgOiB0cnVlO1xuICAgICAgaGVscGVyID0gY29tcG9zZUhlbHBlcjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIExlZnRQYW5lTW9kZS5DaG9vc2VHcm91cE1lbWJlcnM6IHtcbiAgICAgIGNvbnN0IGNob29zZUdyb3VwTWVtYmVyc0hlbHBlciA9IG5ldyBMZWZ0UGFuZUNob29zZUdyb3VwTWVtYmVyc0hlbHBlcihcbiAgICAgICAgbW9kZVNwZWNpZmljUHJvcHNcbiAgICAgICk7XG4gICAgICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzID1cbiAgICAgICAgcHJldmlvdXNNb2RlU3BlY2lmaWNQcm9wcy5tb2RlID09PSBtb2RlU3BlY2lmaWNQcm9wcy5tb2RlXG4gICAgICAgICAgPyBjaG9vc2VHcm91cE1lbWJlcnNIZWxwZXIuc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cyhcbiAgICAgICAgICAgICAgcHJldmlvdXNNb2RlU3BlY2lmaWNQcm9wc1xuICAgICAgICAgICAgKVxuICAgICAgICAgIDogdHJ1ZTtcbiAgICAgIGhlbHBlciA9IGNob29zZUdyb3VwTWVtYmVyc0hlbHBlcjtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjYXNlIExlZnRQYW5lTW9kZS5TZXRHcm91cE1ldGFkYXRhOiB7XG4gICAgICBjb25zdCBzZXRHcm91cE1ldGFkYXRhSGVscGVyID0gbmV3IExlZnRQYW5lU2V0R3JvdXBNZXRhZGF0YUhlbHBlcihcbiAgICAgICAgbW9kZVNwZWNpZmljUHJvcHNcbiAgICAgICk7XG4gICAgICBzaG91bGRSZWNvbXB1dGVSb3dIZWlnaHRzID1cbiAgICAgICAgcHJldmlvdXNNb2RlU3BlY2lmaWNQcm9wcy5tb2RlID09PSBtb2RlU3BlY2lmaWNQcm9wcy5tb2RlXG4gICAgICAgICAgPyBzZXRHcm91cE1ldGFkYXRhSGVscGVyLnNob3VsZFJlY29tcHV0ZVJvd0hlaWdodHMoXG4gICAgICAgICAgICAgIHByZXZpb3VzTW9kZVNwZWNpZmljUHJvcHNcbiAgICAgICAgICAgIClcbiAgICAgICAgICA6IHRydWU7XG4gICAgICBoZWxwZXIgPSBzZXRHcm91cE1ldGFkYXRhSGVscGVyO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGRlZmF1bHQ6XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKG1vZGVTcGVjaWZpY1Byb3BzKTtcbiAgfVxuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3Qgb25LZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KSA9PiB7XG4gICAgICBjb25zdCB7IGN0cmxLZXksIHNoaWZ0S2V5LCBhbHRLZXksIG1ldGFLZXkgfSA9IGV2ZW50O1xuICAgICAgY29uc3QgY29tbWFuZE9yQ3RybCA9IE9TLmlzTWFjT1MoKSA/IG1ldGFLZXkgOiBjdHJsS2V5O1xuICAgICAgY29uc3Qga2V5ID0gS2V5Ym9hcmRMYXlvdXQubG9va3VwKGV2ZW50KTtcblxuICAgICAgaWYgKGtleSA9PT0gJ0VzY2FwZScpIHtcbiAgICAgICAgY29uc3QgYmFja0FjdGlvbiA9IGhlbHBlci5nZXRCYWNrQWN0aW9uKHtcbiAgICAgICAgICBzaG93SW5ib3gsXG4gICAgICAgICAgc3RhcnRDb21wb3NpbmcsXG4gICAgICAgICAgc2hvd0Nob29zZUdyb3VwTWVtYmVycyxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmIChiYWNrQWN0aW9uKSB7XG4gICAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgICBiYWNrQWN0aW9uKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGlmIChcbiAgICAgICAgY29tbWFuZE9yQ3RybCAmJlxuICAgICAgICAhc2hpZnRLZXkgJiZcbiAgICAgICAgIWFsdEtleSAmJlxuICAgICAgICAoa2V5ID09PSAnbicgfHwga2V5ID09PSAnTicpXG4gICAgICApIHtcbiAgICAgICAgc3RhcnRDb21wb3NpbmcoKTtcblxuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBsZXQgY29udmVyc2F0aW9uVG9PcGVuOlxuICAgICAgICB8IHVuZGVmaW5lZFxuICAgICAgICB8IHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgICAgICAgICBtZXNzYWdlSWQ/OiBzdHJpbmc7XG4gICAgICAgICAgfTtcblxuICAgICAgY29uc3QgbnVtZXJpY0luZGV4ID0ga2V5Ym9hcmRLZXlUb051bWVyaWNJbmRleChldmVudC5rZXkpO1xuICAgICAgY29uc3Qgb3BlbmVkQnlOdW1iZXIgPSBjb21tYW5kT3JDdHJsICYmIGlzTnVtYmVyKG51bWVyaWNJbmRleCk7XG4gICAgICBpZiAob3BlbmVkQnlOdW1iZXIpIHtcbiAgICAgICAgY29udmVyc2F0aW9uVG9PcGVuID1cbiAgICAgICAgICBoZWxwZXIuZ2V0Q29udmVyc2F0aW9uQW5kTWVzc2FnZUF0SW5kZXgobnVtZXJpY0luZGV4KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCB0b0ZpbmQ6IHVuZGVmaW5lZCB8IFRvRmluZFR5cGU7XG4gICAgICAgIGlmIChcbiAgICAgICAgICAoYWx0S2V5ICYmICFzaGlmdEtleSAmJiBrZXkgPT09ICdBcnJvd1VwJykgfHxcbiAgICAgICAgICAoY29tbWFuZE9yQ3RybCAmJiBzaGlmdEtleSAmJiBrZXkgPT09ICdbJykgfHxcbiAgICAgICAgICAoY3RybEtleSAmJiBzaGlmdEtleSAmJiBrZXkgPT09ICdUYWInKVxuICAgICAgICApIHtcbiAgICAgICAgICB0b0ZpbmQgPSB7IGRpcmVjdGlvbjogRmluZERpcmVjdGlvbi5VcCwgdW5yZWFkT25seTogZmFsc2UgfTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICAoYWx0S2V5ICYmICFzaGlmdEtleSAmJiBrZXkgPT09ICdBcnJvd0Rvd24nKSB8fFxuICAgICAgICAgIChjb21tYW5kT3JDdHJsICYmIHNoaWZ0S2V5ICYmIGtleSA9PT0gJ10nKSB8fFxuICAgICAgICAgIChjdHJsS2V5ICYmIGtleSA9PT0gJ1RhYicpXG4gICAgICAgICkge1xuICAgICAgICAgIHRvRmluZCA9IHsgZGlyZWN0aW9uOiBGaW5kRGlyZWN0aW9uLkRvd24sIHVucmVhZE9ubHk6IGZhbHNlIH07XG4gICAgICAgIH0gZWxzZSBpZiAoYWx0S2V5ICYmIHNoaWZ0S2V5ICYmIGtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICAgICAgdG9GaW5kID0geyBkaXJlY3Rpb246IEZpbmREaXJlY3Rpb24uVXAsIHVucmVhZE9ubHk6IHRydWUgfTtcbiAgICAgICAgfSBlbHNlIGlmIChhbHRLZXkgJiYgc2hpZnRLZXkgJiYga2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgICAgIHRvRmluZCA9IHsgZGlyZWN0aW9uOiBGaW5kRGlyZWN0aW9uLkRvd24sIHVucmVhZE9ubHk6IHRydWUgfTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodG9GaW5kKSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uVG9PcGVuID0gaGVscGVyLmdldENvbnZlcnNhdGlvbkFuZE1lc3NhZ2VJbkRpcmVjdGlvbihcbiAgICAgICAgICAgIHRvRmluZCxcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgICBzZWxlY3RlZE1lc3NhZ2VJZFxuICAgICAgICAgICk7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgaWYgKGNvbnZlcnNhdGlvblRvT3Blbikge1xuICAgICAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkLCBtZXNzYWdlSWQgfSA9IGNvbnZlcnNhdGlvblRvT3BlbjtcbiAgICAgICAgc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkLCBtZXNzYWdlSWQgfSk7XG4gICAgICAgIGlmIChvcGVuZWRCeU51bWJlcikge1xuICAgICAgICAgIGNsZWFyU2VhcmNoKCk7XG4gICAgICAgIH1cbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG5cbiAgICAgIGhlbHBlci5vbktleURvd24oZXZlbnQsIHtcbiAgICAgICAgc2VhcmNoSW5Db252ZXJzYXRpb24sXG4gICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gICAgICAgIHN0YXJ0U2VhcmNoLFxuICAgICAgfSk7XG4gICAgfTtcblxuICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBvbktleURvd24pO1xuICAgIHJldHVybiAoKSA9PiB7XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdrZXlkb3duJywgb25LZXlEb3duKTtcbiAgICB9O1xuICB9LCBbXG4gICAgY2xlYXJTZWFyY2gsXG4gICAgaGVscGVyLFxuICAgIHNlYXJjaEluQ29udmVyc2F0aW9uLFxuICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWQsXG4gICAgc2VsZWN0ZWRNZXNzYWdlSWQsXG4gICAgc2hvd0Nob29zZUdyb3VwTWVtYmVycyxcbiAgICBzaG93Q29udmVyc2F0aW9uLFxuICAgIHNob3dJbmJveCxcbiAgICBzdGFydENvbXBvc2luZyxcbiAgICBzdGFydFNlYXJjaCxcbiAgXSk7XG5cbiAgY29uc3QgcmVxdWlyZXNGdWxsV2lkdGggPSBoZWxwZXIucmVxdWlyZXNGdWxsV2lkdGgoKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNSZXNpemluZykge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgY29uc3Qgb25Nb3VzZU1vdmUgPSAoZXZlbnQ6IE1vdXNlRXZlbnQpID0+IHtcbiAgICAgIGxldCB3aWR0aDogbnVtYmVyO1xuICAgICAgaWYgKHJlcXVpcmVzRnVsbFdpZHRoKSB7XG4gICAgICAgIHdpZHRoID0gTWF0aC5tYXgoZXZlbnQuY2xpZW50WCwgTUlOX0ZVTExfV0lEVEgpO1xuICAgICAgfSBlbHNlIGlmIChldmVudC5jbGllbnRYIDwgU05BUF9XSURUSCkge1xuICAgICAgICB3aWR0aCA9IE1JTl9XSURUSDtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHdpZHRoID0gY2xhbXAoZXZlbnQuY2xpZW50WCwgTUlOX0ZVTExfV0lEVEgsIE1BWF9XSURUSCk7XG4gICAgICB9XG4gICAgICBzZXRQcmVmZXJyZWRXaWR0aChNYXRoLm1pbih3aWR0aCwgTUFYX1dJRFRIKSk7XG5cbiAgICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gICAgfTtcblxuICAgIGNvbnN0IHN0b3BSZXNpemluZyA9ICgpID0+IHtcbiAgICAgIHNldElzUmVzaXppbmcoZmFsc2UpO1xuICAgIH07XG5cbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIG9uTW91c2VNb3ZlKTtcbiAgICBkb2N1bWVudC5ib2R5LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXppbmcpO1xuICAgIGRvY3VtZW50LmJvZHkuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHN0b3BSZXNpemluZyk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCBvbk1vdXNlTW92ZSk7XG4gICAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCBzdG9wUmVzaXppbmcpO1xuICAgICAgZG9jdW1lbnQuYm9keS5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgc3RvcFJlc2l6aW5nKTtcbiAgICB9O1xuICB9LCBbaXNSZXNpemluZywgcmVxdWlyZXNGdWxsV2lkdGhdKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIGlmICghaXNSZXNpemluZykge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuXG4gICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QuYWRkKCdpcy1yZXNpemluZy1sZWZ0LXBhbmUnKTtcbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgZG9jdW1lbnQuYm9keS5jbGFzc0xpc3QucmVtb3ZlKCdpcy1yZXNpemluZy1sZWZ0LXBhbmUnKTtcbiAgICB9O1xuICB9LCBbaXNSZXNpemluZ10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKGlzUmVzaXppbmcgfHwgcHJlZmVycmVkV2lkdGggPT09IHByZWZlcnJlZFdpZHRoRnJvbVN0b3JhZ2UpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzYXZlUHJlZmVycmVkTGVmdFBhbmVXaWR0aChwcmVmZXJyZWRXaWR0aCk7XG4gICAgfSwgMTAwMCk7XG5cbiAgICByZXR1cm4gKCkgPT4ge1xuICAgICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIH07XG4gIH0sIFtcbiAgICBpc1Jlc2l6aW5nLFxuICAgIHByZWZlcnJlZFdpZHRoLFxuICAgIHByZWZlcnJlZFdpZHRoRnJvbVN0b3JhZ2UsXG4gICAgc2F2ZVByZWZlcnJlZExlZnRQYW5lV2lkdGgsXG4gIF0pO1xuXG4gIGNvbnN0IHByZVJvd3NOb2RlID0gaGVscGVyLmdldFByZVJvd3NOb2RlKHtcbiAgICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaCxcbiAgICBjbGVhckdyb3VwQ3JlYXRpb25FcnJvcixcbiAgICBjbGVhclNlYXJjaCxcbiAgICBjbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbCxcbiAgICBjbG9zZVJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWwsXG4gICAgY29tcG9zZURlbGV0ZUF2YXRhckZyb21EaXNrLFxuICAgIGNvbXBvc2VSZXBsYWNlQXZhdGFyLFxuICAgIGNvbXBvc2VTYXZlQXZhdGFyVG9EaXNrLFxuICAgIGNyZWF0ZUdyb3VwLFxuICAgIGkxOG4sXG4gICAgcmVtb3ZlU2VsZWN0ZWRDb250YWN0OiB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMsXG4gICAgc2V0Q29tcG9zZUdyb3VwQXZhdGFyLFxuICAgIHNldENvbXBvc2VHcm91cEV4cGlyZVRpbWVyLFxuICAgIHNldENvbXBvc2VHcm91cE5hbWUsXG4gICAgdG9nZ2xlQ29tcG9zZUVkaXRpbmdBdmF0YXIsXG4gIH0pO1xuICBjb25zdCBmb290ZXJDb250ZW50cyA9IGhlbHBlci5nZXRGb290ZXJDb250ZW50cyh7XG4gICAgY3JlYXRlR3JvdXAsXG4gICAgaTE4bixcbiAgICBzdGFydFNldHRpbmdHcm91cE1ldGFkYXRhLFxuICB9KTtcblxuICBjb25zdCBnZXRSb3cgPSB1c2VNZW1vKCgpID0+IGhlbHBlci5nZXRSb3cuYmluZChoZWxwZXIpLCBbaGVscGVyXSk7XG5cbiAgY29uc3Qgb25TZWxlY3RDb252ZXJzYXRpb24gPSB1c2VDYWxsYmFjayhcbiAgICAoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgbWVzc2FnZUlkPzogc3RyaW5nKSA9PiB7XG4gICAgICBzaG93Q29udmVyc2F0aW9uKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIG1lc3NhZ2VJZCxcbiAgICAgICAgc3dpdGNoVG9Bc3NvY2lhdGVkVmlldzogdHJ1ZSxcbiAgICAgIH0pO1xuICAgIH0sXG4gICAgW3Nob3dDb252ZXJzYXRpb25dXG4gICk7XG5cbiAgY29uc3QgcHJldmlvdXNTZWxlY3RlZENvbnZlcnNhdGlvbklkID0gdXNlUHJldmlvdXMoXG4gICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZCxcbiAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkXG4gICk7XG5cbiAgY29uc3QgaXNTY3JvbGxhYmxlID0gaGVscGVyLmlzU2Nyb2xsYWJsZSgpO1xuXG4gIGxldCByb3dJbmRleFRvU2Nyb2xsVG86IHVuZGVmaW5lZCB8IG51bWJlcjtcbiAgbGV0IHNjcm9sbEJlaGF2aW9yOiBTY3JvbGxCZWhhdmlvcjtcbiAgaWYgKGlzU2Nyb2xsYWJsZSkge1xuICAgIHJvd0luZGV4VG9TY3JvbGxUbyA9XG4gICAgICBwcmV2aW91c1NlbGVjdGVkQ29udmVyc2F0aW9uSWQgPT09IHNlbGVjdGVkQ29udmVyc2F0aW9uSWRcbiAgICAgICAgPyB1bmRlZmluZWRcbiAgICAgICAgOiBoZWxwZXIuZ2V0Um93SW5kZXhUb1Njcm9sbFRvKHNlbGVjdGVkQ29udmVyc2F0aW9uSWQpO1xuICAgIHNjcm9sbEJlaGF2aW9yID0gU2Nyb2xsQmVoYXZpb3IuRGVmYXVsdDtcbiAgfSBlbHNlIHtcbiAgICByb3dJbmRleFRvU2Nyb2xsVG8gPSAwO1xuICAgIHNjcm9sbEJlaGF2aW9yID0gU2Nyb2xsQmVoYXZpb3IuSGFyZDtcbiAgfVxuXG4gIC8vIFdlIGVuc3VyZSB0aGF0IHRoZSBsaXN0S2V5IGRpZmZlcnMgYmV0d2VlbiBzb21lIG1vZGVzIChlLmcuIGluYm94L2FyY2hpdmVkKSwgZW5zdXJpbmdcbiAgLy8gICB0aGF0IEF1dG9TaXplciBwcm9wZXJseSBkZXRlY3RzIHRoZSBuZXcgc2l6ZSBvZiBpdHMgc2xvdCBpbiB0aGUgZmxleGJveC4gVGhlXG4gIC8vICAgYXJjaGl2ZSBleHBsYWluZXIgdGV4dCBhdCB0aGUgdG9wIG9mIHRoZSBhcmNoaXZlIHZpZXcgY2F1c2VzIHByb2JsZW1zIG90aGVyd2lzZS5cbiAgLy8gICBJdCBhbHNvIGVuc3VyZXMgdGhhdCB3ZSBzY3JvbGwgdG8gdGhlIHRvcCB3aGVuIHN3aXRjaGluZyB2aWV3cy5cbiAgY29uc3QgbGlzdEtleSA9IHByZVJvd3NOb2RlID8gMSA6IDA7XG5cbiAgY29uc3Qgd2lkdGggPSBnZXRXaWR0aEZyb21QcmVmZXJyZWRXaWR0aChwcmVmZXJyZWRXaWR0aCwge1xuICAgIHJlcXVpcmVzRnVsbFdpZHRoLFxuICB9KTtcblxuICBjb25zdCB3aWR0aEJyZWFrcG9pbnQgPSBnZXRDb252ZXJzYXRpb25MaXN0V2lkdGhCcmVha3BvaW50KHdpZHRoKTtcblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgJ21vZHVsZS1sZWZ0LXBhbmUnLFxuICAgICAgICBpc1Jlc2l6aW5nICYmICdtb2R1bGUtbGVmdC1wYW5lLS1pcy1yZXNpemluZycsXG4gICAgICAgIGBtb2R1bGUtbGVmdC1wYW5lLS13aWR0aC0ke3dpZHRoQnJlYWtwb2ludH1gXG4gICAgICApfVxuICAgICAgc3R5bGU9e3sgd2lkdGggfX1cbiAgICA+XG4gICAgICB7LyogZXNsaW50LWVuYWJsZSBqc3gtYTExeS9uby1zdGF0aWMtZWxlbWVudC1pbnRlcmFjdGlvbnMgKi99XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2hlYWRlclwiPlxuICAgICAgICB7aGVscGVyLmdldEhlYWRlckNvbnRlbnRzKHtcbiAgICAgICAgICBpMThuLFxuICAgICAgICAgIHNob3dJbmJveCxcbiAgICAgICAgICBzdGFydENvbXBvc2luZyxcbiAgICAgICAgICBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzLFxuICAgICAgICB9KSB8fCByZW5kZXJNYWluSGVhZGVyKCl9XG4gICAgICA8L2Rpdj5cbiAgICAgIHtoZWxwZXIuZ2V0U2VhcmNoSW5wdXQoe1xuICAgICAgICBjbGVhckNvbnZlcnNhdGlvblNlYXJjaCxcbiAgICAgICAgY2xlYXJTZWFyY2gsXG4gICAgICAgIGkxOG4sXG4gICAgICAgIG9uQ2hhbmdlQ29tcG9zZVNlYXJjaFRlcm06IGV2ZW50ID0+IHtcbiAgICAgICAgICBzZXRDb21wb3NlU2VhcmNoVGVybShldmVudC50YXJnZXQudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgICB1cGRhdGVTZWFyY2hUZXJtLFxuICAgICAgICBzaG93Q29udmVyc2F0aW9uLFxuICAgICAgfSl9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2RpYWxvZ3NcIj5cbiAgICAgICAge3JlbmRlckV4cGlyZWRCdWlsZERpYWxvZyh7XG4gICAgICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiB3aWR0aEJyZWFrcG9pbnQsXG4gICAgICAgIH0pfVxuICAgICAgICB7cmVuZGVyUmVsaW5rRGlhbG9nKHsgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiB3aWR0aEJyZWFrcG9pbnQgfSl9XG4gICAgICAgIHtyZW5kZXJOZXR3b3JrU3RhdHVzKHsgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiB3aWR0aEJyZWFrcG9pbnQgfSl9XG4gICAgICAgIHtyZW5kZXJVcGRhdGVEaWFsb2coeyBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IHdpZHRoQnJlYWtwb2ludCB9KX1cbiAgICAgIDwvZGl2PlxuICAgICAge3ByZVJvd3NOb2RlICYmIDxSZWFjdC5GcmFnbWVudCBrZXk9ezB9PntwcmVSb3dzTm9kZX08L1JlYWN0LkZyYWdtZW50Pn1cbiAgICAgIDxNZWFzdXJlIGJvdW5kcz5cbiAgICAgICAgeyh7IGNvbnRlbnRSZWN0LCBtZWFzdXJlUmVmIH06IE1lYXN1cmVkQ29tcG9uZW50UHJvcHMpID0+IChcbiAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2xpc3QtLW1lYXN1cmVcIiByZWY9e21lYXN1cmVSZWZ9PlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtbGVmdC1wYW5lX19saXN0LS13cmFwcGVyXCI+XG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBhcmlhLWxpdmU9XCJwb2xpdGVcIlxuICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS1sZWZ0LXBhbmVfX2xpc3RcIlxuICAgICAgICAgICAgICAgIGtleT17bGlzdEtleX1cbiAgICAgICAgICAgICAgICByb2xlPVwicHJlc2VudGF0aW9uXCJcbiAgICAgICAgICAgICAgICB0YWJJbmRleD17LTF9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8Q29udmVyc2F0aW9uTGlzdFxuICAgICAgICAgICAgICAgICAgZGltZW5zaW9ucz17e1xuICAgICAgICAgICAgICAgICAgICB3aWR0aCxcbiAgICAgICAgICAgICAgICAgICAgaGVpZ2h0OiBjb250ZW50UmVjdC5ib3VuZHM/LmhlaWdodCB8fCAwLFxuICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgICAgICAgIGdldFJvdz17Z2V0Um93fVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAgIG9uQ2xpY2tBcmNoaXZlQnV0dG9uPXtzaG93QXJjaGl2ZWRDb252ZXJzYXRpb25zfVxuICAgICAgICAgICAgICAgICAgb25DbGlja0NvbnRhY3RDaGVja2JveD17KFxuICAgICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgICAgICAgICAgICAgICAgICBkaXNhYmxlZFJlYXNvbjogdW5kZWZpbmVkIHwgQ29udGFjdENoZWNrYm94RGlzYWJsZWRSZWFzb25cbiAgICAgICAgICAgICAgICAgICkgPT4ge1xuICAgICAgICAgICAgICAgICAgICBzd2l0Y2ggKGRpc2FibGVkUmVhc29uKSB7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSB1bmRlZmluZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgICB0b2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnMoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbi5BbHJlYWR5QWRkZWQ6XG4gICAgICAgICAgICAgICAgICAgICAgY2FzZSBDb250YWN0Q2hlY2tib3hEaXNhYmxlZFJlYXNvbi5NYXhpbXVtQ29udGFjdHNTZWxlY3RlZDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFRoZXNlIGFyZSBuby1vcHMuXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihkaXNhYmxlZFJlYXNvbik7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAgICAgICBzaG93VXNlck5vdEZvdW5kTW9kYWw9e3Nob3dVc2VyTm90Rm91bmRNb2RhbH1cbiAgICAgICAgICAgICAgICAgIHNldElzRmV0Y2hpbmdVVUlEPXtzZXRJc0ZldGNoaW5nVVVJRH1cbiAgICAgICAgICAgICAgICAgIGxvb2t1cENvbnZlcnNhdGlvbldpdGhvdXRVdWlkPXtsb29rdXBDb252ZXJzYXRpb25XaXRob3V0VXVpZH1cbiAgICAgICAgICAgICAgICAgIHNob3dDb252ZXJzYXRpb249e3Nob3dDb252ZXJzYXRpb259XG4gICAgICAgICAgICAgICAgICBvblNlbGVjdENvbnZlcnNhdGlvbj17b25TZWxlY3RDb252ZXJzYXRpb259XG4gICAgICAgICAgICAgICAgICByZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0PXtyZW5kZXJNZXNzYWdlU2VhcmNoUmVzdWx0fVxuICAgICAgICAgICAgICAgICAgcm93Q291bnQ9e2hlbHBlci5nZXRSb3dDb3VudCgpfVxuICAgICAgICAgICAgICAgICAgc2Nyb2xsQmVoYXZpb3I9e3Njcm9sbEJlaGF2aW9yfVxuICAgICAgICAgICAgICAgICAgc2Nyb2xsVG9Sb3dJbmRleD17cm93SW5kZXhUb1Njcm9sbFRvfVxuICAgICAgICAgICAgICAgICAgc2Nyb2xsYWJsZT17aXNTY3JvbGxhYmxlfVxuICAgICAgICAgICAgICAgICAgc2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0cz17c2hvdWxkUmVjb21wdXRlUm93SGVpZ2h0c31cbiAgICAgICAgICAgICAgICAgIHNob3dDaG9vc2VHcm91cE1lbWJlcnM9e3Nob3dDaG9vc2VHcm91cE1lbWJlcnN9XG4gICAgICAgICAgICAgICAgICB0aGVtZT17dGhlbWV9XG4gICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgKX1cbiAgICAgIDwvTWVhc3VyZT5cbiAgICAgIHtmb290ZXJDb250ZW50cyAmJiAoXG4gICAgICAgIDxkaXYgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9fZm9vdGVyXCI+e2Zvb3RlckNvbnRlbnRzfTwvZGl2PlxuICAgICAgKX1cbiAgICAgIDw+XG4gICAgICAgIHsvKiBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUganN4LWExMXkvbm8tc3RhdGljLWVsZW1lbnQtaW50ZXJhY3Rpb25zICovfVxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPVwibW9kdWxlLWxlZnQtcGFuZV9fcmVzaXplLWdyYWItYXJlYVwiXG4gICAgICAgICAgb25Nb3VzZURvd249eygpID0+IHtcbiAgICAgICAgICAgIHNldElzUmVzaXppbmcodHJ1ZSk7XG4gICAgICAgICAgfX1cbiAgICAgICAgLz5cbiAgICAgIDwvPlxuICAgICAge2NoYWxsZW5nZVN0YXR1cyAhPT0gJ2lkbGUnICYmXG4gICAgICAgIHJlbmRlckNhcHRjaGFEaWFsb2coe1xuICAgICAgICAgIG9uU2tpcCgpIHtcbiAgICAgICAgICAgIHNldENoYWxsZW5nZVN0YXR1cygnaWRsZScpO1xuICAgICAgICAgIH0sXG4gICAgICAgIH0pfVxuICAgICAge2NyYXNoUmVwb3J0Q291bnQgPiAwICYmIHJlbmRlckNyYXNoUmVwb3J0RGlhbG9nKCl9XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBrZXlib2FyZEtleVRvTnVtZXJpY0luZGV4KGtleTogc3RyaW5nKTogdW5kZWZpbmVkIHwgbnVtYmVyIHtcbiAgaWYgKGtleS5sZW5ndGggIT09IDEpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHJlc3VsdCA9IHBhcnNlSW50KGtleSwgMTApIC0gMTtcbiAgY29uc3QgaXNWYWxpZEluZGV4ID0gTnVtYmVyLmlzSW50ZWdlcihyZXN1bHQpICYmIHJlc3VsdCA+PSAwICYmIHJlc3VsdCA8PSA4O1xuICByZXR1cm4gaXNWYWxpZEluZGV4ID8gcmVzdWx0IDogdW5kZWZpbmVkO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsbUJBQWlFO0FBRWpFLDJCQUFvQjtBQUNwQix3QkFBdUI7QUFDdkIsb0JBQXNDO0FBR3RDLDRCQUE4QjtBQUU5QixpQ0FBb0M7QUFFcEMsa0NBQXFDO0FBRXJDLG1DQUFzQztBQUV0QyxtQ0FBc0M7QUFFdEMsOENBQWlEO0FBRWpELDRDQUErQztBQUUvQyxTQUFvQjtBQUVwQixrQkFBK0I7QUFFL0IseUJBQTRCO0FBQzVCLDhCQUFpQztBQUVqQyxrQkFBbUQ7QUFDbkQscUJBQWdDO0FBQ2hDLDJCQU1PO0FBSVAsOEJBQWlDO0FBQ2pDLDZCQUE4QztBQVF2QyxJQUFLLGVBQUwsa0JBQUssa0JBQUw7QUFDTDtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFOVTtBQUFBO0FBeUZMLE1BQU0sV0FBZ0Msd0JBQUM7QUFBQSxFQUM1QztBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7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S0FDcEQsbURBQUM7QUFBQSxJQUFJLFdBQVU7QUFBQSxLQUNiLG1EQUFDO0FBQUEsSUFDQyxhQUFVO0FBQUEsSUFDVixXQUFVO0FBQUEsSUFDVixLQUFLO0FBQUEsSUFDTCxNQUFLO0FBQUEsSUFDTCxVQUFVO0FBQUEsS0FFVixtREFBQztBQUFBLElBQ0MsWUFBWTtBQUFBLE1BQ1Y7QUFBQSxNQUNBLFFBQVEsWUFBWSxRQUFRLFVBQVU7QUFBQSxJQUN4QztBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0Esc0JBQXNCO0FBQUEsSUFDdEIsd0JBQXdCLENBQ3RCLGdCQUNBLG1CQUNHO0FBQ0gsY0FBUTtBQUFBLGFBQ0Q7QUFDSCw0Q0FBa0MsY0FBYztBQUNoRDtBQUFBLGFBQ0cscURBQThCO0FBQUEsYUFDOUIscURBQThCO0FBRWpDO0FBQUE7QUFFQSxnQkFBTSw4Q0FBaUIsY0FBYztBQUFBO0FBQUEsSUFFM0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBLFVBQVUsT0FBTyxZQUFZO0FBQUEsSUFDN0I7QUFBQSxJQUNBLGtCQUFrQjtBQUFBLElBQ2xCLFlBQVk7QUFBQSxJQUNaO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxHQUNGLENBQ0YsQ0FDRixDQUNGLENBRUosR0FDQyxrQkFDQyxtREFBQztBQUFBLElBQUksV0FBVTtBQUFBLEtBQTRCLGNBQWUsR0FFNUQsd0ZBRUUsbURBQUM7QUFBQSxJQUNDLFdBQVU7QUFBQSxJQUNWLGFBQWEsTUFBTTtBQUNqQixvQkFBYyxJQUFJO0FBQUEsSUFDcEI7QUFBQSxHQUNGLENBQ0YsR0FDQyxvQkFBb0IsVUFDbkIsb0JBQW9CO0FBQUEsSUFDbEIsU0FBUztBQUNQLHlCQUFtQixNQUFNO0FBQUEsSUFDM0I7QUFBQSxFQUNGLENBQUMsR0FDRixtQkFBbUIsS0FBSyx3QkFBd0IsQ0FDbkQ7QUFFSixHQXBmNkM7QUFzZjdDLG1DQUFtQyxLQUFpQztBQUNsRSxNQUFJLElBQUksV0FBVyxHQUFHO0FBQ3BCLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxTQUFTLFNBQVMsS0FBSyxFQUFFLElBQUk7QUFDbkMsUUFBTSxlQUFlLE9BQU8sVUFBVSxNQUFNLEtBQUssVUFBVSxLQUFLLFVBQVU7QUFDMUUsU0FBTyxlQUFlLFNBQVM7QUFDakM7QUFQUyIsCiAgIm5hbWVzIjogW10KfQo=
