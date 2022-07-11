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
var Timeline_exports = {};
__export(Timeline_exports, {
  Timeline: () => Timeline
});
module.exports = __toCommonJS(Timeline_exports);
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_react = __toESM(require("react"));
var import_reselect = require("reselect");
var import_react_measure = __toESM(require("react-measure"));
var import_ScrollDownButton = require("./ScrollDownButton");
var import_assert = require("../../util/assert");
var import_missingCaseError = require("../../util/missingCaseError");
var import_clearTimeoutIfNecessary = require("../../util/clearTimeoutIfNecessary");
var import_util = require("../_util");
var import_ErrorBoundary = require("./ErrorBoundary");
var import_Intl = require("../Intl");
var import_TimelineWarning = require("./TimelineWarning");
var import_TimelineWarnings = require("./TimelineWarnings");
var import_NewlyCreatedGroupInvitedContactsDialog = require("../NewlyCreatedGroupInvitedContactsDialog");
var import_contactSpoofing = require("../../util/contactSpoofing");
var import_groupMemberNameCollisions = require("../../util/groupMemberNameCollisions");
var import_TimelineFloatingHeader = require("./TimelineFloatingHeader");
var import_timelineUtil = require("../../util/timelineUtil");
var import_scrollUtil = require("../../util/scrollUtil");
var import_LastSeenIndicator = require("./LastSeenIndicator");
var import_durations = require("../../util/durations");
const AT_BOTTOM_THRESHOLD = 15;
const AT_BOTTOM_DETECTOR_STYLE = { height: AT_BOTTOM_THRESHOLD };
const MIN_ROW_HEIGHT = 18;
const SCROLL_DOWN_BUTTON_THRESHOLD = 8;
const LOAD_NEWER_THRESHOLD = 5;
const scrollToUnreadIndicator = Symbol("scrollToUnreadIndicator");
const getActions = (0, import_reselect.createSelector)((props) => props, (props) => {
  const unsafe = (0, import_lodash.pick)(props, [
    "acknowledgeGroupMemberNameCollisions",
    "blockGroupLinkRequests",
    "clearInvitedUuidsForNewlyCreatedGroup",
    "closeContactSpoofingReview",
    "setIsNearBottom",
    "reviewGroupMemberNameCollision",
    "reviewMessageRequestNameCollision",
    "learnMoreAboutDeliveryIssue",
    "loadOlderMessages",
    "loadNewerMessages",
    "loadNewestMessages",
    "markMessageRead",
    "markViewed",
    "onBlock",
    "onBlockAndReportSpam",
    "onDelete",
    "onUnblock",
    "peekGroupCallForTheFirstTime",
    "peekGroupCallIfItHasMembers",
    "removeMember",
    "selectMessage",
    "clearSelectedMessage",
    "unblurAvatar",
    "updateSharedGroups",
    "doubleCheckMissingQuoteReference",
    "checkForAccount",
    "reactToMessage",
    "replyToMessage",
    "retryDeleteForEveryone",
    "retrySend",
    "showForwardMessageModal",
    "deleteMessage",
    "deleteMessageForEveryone",
    "showMessageDetail",
    "openConversation",
    "openGiftBadge",
    "showContactDetail",
    "showContactModal",
    "kickOffAttachmentDownload",
    "markAttachmentAsCorrupted",
    "messageExpanded",
    "showVisualAttachment",
    "downloadAttachment",
    "displayTapToViewMessage",
    "openLink",
    "scrollToQuotedMessage",
    "showExpiredIncomingTapToViewToast",
    "showExpiredOutgoingTapToViewToast",
    "startConversation",
    "showIdentity",
    "downloadNewVersion",
    "contactSupport"
  ]);
  const safe = unsafe;
  return safe;
});
class Timeline extends import_react.default.Component {
  constructor() {
    super(...arguments);
    this.containerRef = import_react.default.createRef();
    this.messagesRef = import_react.default.createRef();
    this.atBottomDetectorRef = import_react.default.createRef();
    this.lastSeenIndicatorRef = import_react.default.createRef();
    this.maxVisibleRows = Math.ceil(window.innerHeight / MIN_ROW_HEIGHT);
    this.state = {
      hasRecentlyScrolled: true,
      hasDismissedDirectContactSpoofingWarning: false,
      lastMeasuredWarningHeight: 0,
      widthBreakpoint: import_util.WidthBreakpoint.Wide
    };
    this.onScroll = /* @__PURE__ */ __name(() => {
      this.setState((oldState) => oldState.hasRecentlyScrolled ? null : { hasRecentlyScrolled: true });
      (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.hasRecentlyScrolledTimeout);
      this.hasRecentlyScrolledTimeout = setTimeout(() => {
        this.setState({ hasRecentlyScrolled: false });
      }, 3e3);
    }, "onScroll");
    this.scrollToBottom = /* @__PURE__ */ __name((setFocus) => {
      const { selectMessage, id, items } = this.props;
      if (setFocus && items && items.length > 0) {
        const lastIndex = items.length - 1;
        const lastMessageId = items[lastIndex];
        selectMessage(lastMessageId, id);
      } else {
        const containerEl = this.containerRef.current;
        if (containerEl) {
          (0, import_scrollUtil.scrollToBottom)(containerEl);
        }
      }
    }, "scrollToBottom");
    this.onClickScrollDownButton = /* @__PURE__ */ __name(() => {
      this.scrollDown(false);
    }, "onClickScrollDownButton");
    this.scrollDown = /* @__PURE__ */ __name((setFocus) => {
      const {
        haveNewest,
        id,
        items,
        loadNewestMessages,
        messageLoadingState,
        oldestUnseenIndex,
        selectMessage
      } = this.props;
      const { newestBottomVisibleMessageId } = this.state;
      if (!items || items.length < 1) {
        return;
      }
      if (messageLoadingState) {
        this.scrollToBottom(setFocus);
        return;
      }
      if (newestBottomVisibleMessageId && (0, import_lodash.isNumber)(oldestUnseenIndex) && items.findIndex((item) => item === newestBottomVisibleMessageId) < oldestUnseenIndex) {
        if (setFocus) {
          const messageId = items[oldestUnseenIndex];
          selectMessage(messageId, id);
        } else {
          this.scrollToItemIndex(oldestUnseenIndex);
        }
      } else if (haveNewest) {
        this.scrollToBottom(setFocus);
      } else {
        const lastId = (0, import_lodash.last)(items);
        if (lastId) {
          loadNewestMessages(lastId, setFocus);
        }
      }
    }, "scrollDown");
    this.markNewestBottomVisibleMessageRead = (0, import_lodash.throttle)(() => {
      const { markMessageRead } = this.props;
      const { newestBottomVisibleMessageId } = this.state;
      if (newestBottomVisibleMessageId) {
        markMessageRead(newestBottomVisibleMessageId);
      }
    }, 500);
    this.handleBlur = /* @__PURE__ */ __name((event) => {
      const { clearSelectedMessage } = this.props;
      const { currentTarget } = event;
      setTimeout(() => {
        const portals = Array.from(document.querySelectorAll("body > div:not(.inbox)"));
        if (portals.some((el) => el.contains(document.activeElement))) {
          return;
        }
        if (!currentTarget.contains(document.activeElement)) {
          clearSelectedMessage();
        }
      }, 0);
    }, "handleBlur");
    this.handleKeyDown = /* @__PURE__ */ __name((event) => {
      const { selectMessage, selectedMessageId, items, id } = this.props;
      const commandKey = (0, import_lodash.get)(window, "platform") === "darwin" && event.metaKey;
      const controlKey = (0, import_lodash.get)(window, "platform") !== "darwin" && event.ctrlKey;
      const commandOrCtrl = commandKey || controlKey;
      if (!items || items.length < 1) {
        return;
      }
      if (selectedMessageId && !commandOrCtrl && event.key === "ArrowUp") {
        const selectedMessageIndex = items.findIndex((item) => item === selectedMessageId);
        if (selectedMessageIndex < 0) {
          return;
        }
        const targetIndex = selectedMessageIndex - 1;
        if (targetIndex < 0) {
          return;
        }
        const messageId = items[targetIndex];
        selectMessage(messageId, id);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (selectedMessageId && !commandOrCtrl && event.key === "ArrowDown") {
        const selectedMessageIndex = items.findIndex((item) => item === selectedMessageId);
        if (selectedMessageIndex < 0) {
          return;
        }
        const targetIndex = selectedMessageIndex + 1;
        if (targetIndex >= items.length) {
          return;
        }
        const messageId = items[targetIndex];
        selectMessage(messageId, id);
        event.preventDefault();
        event.stopPropagation();
        return;
      }
      if (commandOrCtrl && event.key === "ArrowUp") {
        const firstMessageId = (0, import_lodash.first)(items);
        if (firstMessageId) {
          selectMessage(firstMessageId, id);
          event.preventDefault();
          event.stopPropagation();
        }
        return;
      }
      if (commandOrCtrl && event.key === "ArrowDown") {
        this.scrollDown(true);
        event.preventDefault();
        event.stopPropagation();
      }
    }, "handleKeyDown");
  }
  scrollToItemIndex(itemIndex) {
    this.messagesRef.current?.querySelector(`[data-item-index="${itemIndex}"]`)?.scrollIntoViewIfNeeded();
  }
  isAtBottom() {
    const containerEl = this.containerRef.current;
    if (!containerEl) {
      return false;
    }
    const isScrolledNearBottom = (0, import_scrollUtil.getScrollBottom)(containerEl) <= AT_BOTTOM_THRESHOLD;
    const hasScrollbars = containerEl.clientHeight < containerEl.scrollHeight;
    return isScrolledNearBottom || !hasScrollbars;
  }
  updateIntersectionObserver() {
    const containerEl = this.containerRef.current;
    const messagesEl = this.messagesRef.current;
    const atBottomDetectorEl = this.atBottomDetectorRef.current;
    if (!containerEl || !messagesEl || !atBottomDetectorEl) {
      return;
    }
    const {
      haveNewest,
      haveOldest,
      id,
      items,
      loadNewerMessages,
      loadOlderMessages,
      messageLoadingState,
      setIsNearBottom
    } = this.props;
    this.intersectionObserver?.disconnect();
    if (this.intersectionObserverCallbackFrame !== void 0) {
      window.cancelAnimationFrame(this.intersectionObserverCallbackFrame);
    }
    const intersectionRatios = /* @__PURE__ */ new Map();
    const intersectionObserverCallback = /* @__PURE__ */ __name((entries) => {
      entries.forEach((entry) => {
        intersectionRatios.set(entry.target, entry.intersectionRatio);
      });
      let newIsNearBottom = false;
      let oldestPartiallyVisible;
      let newestPartiallyVisible;
      let newestFullyVisible;
      for (const [element, intersectionRatio] of intersectionRatios) {
        if (intersectionRatio === 0) {
          continue;
        }
        if (element === atBottomDetectorEl) {
          newIsNearBottom = true;
        } else {
          oldestPartiallyVisible = oldestPartiallyVisible || element;
          newestPartiallyVisible = element;
          if (intersectionRatio === 1) {
            newestFullyVisible = element;
          }
        }
      }
      let newestBottomVisible;
      if (newestFullyVisible) {
        newestBottomVisible = newestFullyVisible;
      } else if (newIsNearBottom || newestPartiallyVisible !== oldestPartiallyVisible) {
        newestBottomVisible = oldestPartiallyVisible;
      }
      const oldestPartiallyVisibleMessageId = getMessageIdFromElement(oldestPartiallyVisible);
      const newestBottomVisibleMessageId = getMessageIdFromElement(newestBottomVisible);
      this.setState({
        oldestPartiallyVisibleMessageId,
        newestBottomVisibleMessageId
      });
      setIsNearBottom(id, newIsNearBottom);
      if (newestBottomVisibleMessageId) {
        this.markNewestBottomVisibleMessageRead();
        const rowIndex = getRowIndexFromElement(newestBottomVisible);
        const maxRowIndex = items.length - 1;
        if (!messageLoadingState && !haveNewest && (0, import_lodash.isNumber)(rowIndex) && maxRowIndex >= 0 && rowIndex >= maxRowIndex - LOAD_NEWER_THRESHOLD) {
          loadNewerMessages(newestBottomVisibleMessageId);
        }
      }
      if (!messageLoadingState && !haveOldest && oldestPartiallyVisibleMessageId && oldestPartiallyVisibleMessageId === items[0]) {
        loadOlderMessages(oldestPartiallyVisibleMessageId);
      }
    }, "intersectionObserverCallback");
    this.intersectionObserver = new IntersectionObserver((entries, observer) => {
      (0, import_assert.assert)(this.intersectionObserver === observer, "observer.disconnect() should prevent callbacks from firing");
      this.intersectionObserverCallbackFrame = window.requestAnimationFrame(() => {
        if (this.intersectionObserver !== observer) {
          return;
        }
        intersectionObserverCallback(entries, observer);
      });
    }, {
      root: containerEl,
      threshold: [0, 1]
    });
    for (const child of messagesEl.children) {
      if (child.dataset.messageId) {
        this.intersectionObserver.observe(child);
      }
    }
    this.intersectionObserver.observe(atBottomDetectorEl);
  }
  componentDidMount() {
    const containerEl = this.containerRef.current;
    const messagesEl = this.messagesRef.current;
    (0, import_assert.strictAssert)(containerEl && messagesEl, "<Timeline> mounted without some refs");
    this.updateIntersectionObserver();
    window.registerForActive(this.markNewestBottomVisibleMessageRead);
    this.delayedPeekTimeout = setTimeout(() => {
      const { id, peekGroupCallForTheFirstTime } = this.props;
      this.delayedPeekTimeout = void 0;
      peekGroupCallForTheFirstTime(id);
    }, 500);
    this.peekInterval = setInterval(() => {
      const { id, peekGroupCallIfItHasMembers } = this.props;
      peekGroupCallIfItHasMembers(id);
    }, import_durations.MINUTE);
  }
  componentWillUnmount() {
    const { delayedPeekTimeout, peekInterval } = this;
    window.unregisterForActive(this.markNewestBottomVisibleMessageRead);
    this.intersectionObserver?.disconnect();
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(delayedPeekTimeout);
    if (peekInterval) {
      clearInterval(peekInterval);
    }
  }
  getSnapshotBeforeUpdate(prevProps) {
    const containerEl = this.containerRef.current;
    if (!containerEl) {
      return null;
    }
    const { props } = this;
    const { scrollToIndex } = props;
    const scrollAnchor = (0, import_timelineUtil.getScrollAnchorBeforeUpdate)(prevProps, props, this.isAtBottom());
    switch (scrollAnchor) {
      case import_timelineUtil.ScrollAnchor.ChangeNothing:
        return null;
      case import_timelineUtil.ScrollAnchor.ScrollToBottom:
        return { scrollBottom: 0 };
      case import_timelineUtil.ScrollAnchor.ScrollToIndex:
        if (scrollToIndex === void 0) {
          (0, import_assert.assert)(false, '<Timeline> got "scroll to index" scroll anchor, but no index');
          return null;
        }
        return { scrollToIndex };
      case import_timelineUtil.ScrollAnchor.ScrollToUnreadIndicator:
        return scrollToUnreadIndicator;
      case import_timelineUtil.ScrollAnchor.Top:
        return { scrollTop: containerEl.scrollTop };
      case import_timelineUtil.ScrollAnchor.Bottom:
        return { scrollBottom: (0, import_scrollUtil.getScrollBottom)(containerEl) };
      default:
        throw (0, import_missingCaseError.missingCaseError)(scrollAnchor);
    }
  }
  componentDidUpdate(prevProps, _prevState, snapshot) {
    const {
      items: oldItems,
      messageChangeCounter: previousMessageChangeCounter,
      messageLoadingState: previousMessageLoadingState
    } = prevProps;
    const {
      discardMessages,
      id,
      items: newItems,
      messageChangeCounter,
      messageLoadingState
    } = this.props;
    const containerEl = this.containerRef.current;
    if (containerEl && snapshot) {
      if (snapshot === scrollToUnreadIndicator) {
        const lastSeenIndicatorEl = this.lastSeenIndicatorRef.current;
        if (lastSeenIndicatorEl) {
          lastSeenIndicatorEl.scrollIntoView();
        } else {
          (0, import_scrollUtil.scrollToBottom)(containerEl);
          (0, import_assert.assert)(false, "<Timeline> expected a last seen indicator but it was not found");
        }
      } else if ("scrollToIndex" in snapshot) {
        this.scrollToItemIndex(snapshot.scrollToIndex);
      } else if ("scrollTop" in snapshot) {
        containerEl.scrollTop = snapshot.scrollTop;
      } else {
        (0, import_scrollUtil.setScrollBottom)(containerEl, snapshot.scrollBottom);
      }
    }
    if (oldItems.length !== newItems.length) {
      this.updateIntersectionObserver();
      const numberToKeepAtBottom = this.maxVisibleRows * 2;
      const shouldDiscardOlderMessages = this.isAtBottom() && newItems.length > numberToKeepAtBottom;
      if (shouldDiscardOlderMessages) {
        discardMessages({
          conversationId: id,
          numberToKeepAtBottom
        });
      }
      const loadingStateThatJustFinished = !messageLoadingState && previousMessageLoadingState ? previousMessageLoadingState : void 0;
      const numberToKeepAtTop = this.maxVisibleRows * 5;
      const shouldDiscardNewerMessages = !this.isAtBottom() && loadingStateThatJustFinished === import_timelineUtil.TimelineMessageLoadingState.LoadingOlderMessages && newItems.length > numberToKeepAtTop;
      if (shouldDiscardNewerMessages) {
        discardMessages({
          conversationId: id,
          numberToKeepAtTop
        });
      }
    }
    if (previousMessageChangeCounter !== messageChangeCounter) {
      this.markNewestBottomVisibleMessageRead();
    }
  }
  render() {
    const {
      acknowledgeGroupMemberNameCollisions,
      clearInvitedUuidsForNewlyCreatedGroup,
      closeContactSpoofingReview,
      contactSpoofingReview,
      getPreferredBadge,
      getTimestampForMessage,
      haveNewest,
      haveOldest,
      i18n,
      id,
      invitedContactsForNewlyCreatedGroup,
      isConversationSelected,
      isGroupV1AndDisabled,
      isSomeoneTyping,
      items,
      messageLoadingState,
      oldestUnseenIndex,
      onBlock,
      onBlockAndReportSpam,
      onDelete,
      onUnblock,
      removeMember,
      renderHeroRow,
      renderItem,
      renderTypingBubble,
      renderContactSpoofingReviewDialog,
      reviewGroupMemberNameCollision,
      reviewMessageRequestNameCollision,
      showContactModal,
      theme,
      totalUnseen,
      unblurAvatar,
      unreadCount,
      updateSharedGroups
    } = this.props;
    const {
      hasRecentlyScrolled,
      lastMeasuredWarningHeight,
      newestBottomVisibleMessageId,
      oldestPartiallyVisibleMessageId,
      widthBreakpoint
    } = this.state;
    if (!isConversationSelected) {
      return null;
    }
    const areThereAnyMessages = items.length > 0;
    const areAnyMessagesUnread = Boolean(unreadCount);
    const areAnyMessagesBelowCurrentPosition = !haveNewest || Boolean(newestBottomVisibleMessageId && newestBottomVisibleMessageId !== (0, import_lodash.last)(items));
    const areSomeMessagesBelowCurrentPosition = !haveNewest || newestBottomVisibleMessageId && !items.slice(-SCROLL_DOWN_BUTTON_THRESHOLD).includes(newestBottomVisibleMessageId);
    const areUnreadBelowCurrentPosition = Boolean(areThereAnyMessages && areAnyMessagesUnread && areAnyMessagesBelowCurrentPosition);
    const shouldShowScrollDownButton = Boolean(areThereAnyMessages && (areUnreadBelowCurrentPosition || areSomeMessagesBelowCurrentPosition));
    const actionProps = getActions(this.props);
    let floatingHeader;
    const oldestPartiallyVisibleMessageTimestamp = oldestPartiallyVisibleMessageId ? getTimestampForMessage(oldestPartiallyVisibleMessageId) : void 0;
    if (oldestPartiallyVisibleMessageId && oldestPartiallyVisibleMessageTimestamp) {
      const isLoadingMessages = Boolean(messageLoadingState);
      floatingHeader = /* @__PURE__ */ import_react.default.createElement(import_TimelineFloatingHeader.TimelineFloatingHeader, {
        i18n,
        isLoading: isLoadingMessages,
        style: lastMeasuredWarningHeight ? { marginTop: lastMeasuredWarningHeight } : void 0,
        timestamp: oldestPartiallyVisibleMessageTimestamp,
        visible: (hasRecentlyScrolled || isLoadingMessages) && (!haveOldest || oldestPartiallyVisibleMessageId !== items[0])
      });
    }
    const messageNodes = [];
    for (let itemIndex = 0; itemIndex < items.length; itemIndex += 1) {
      const previousItemIndex = itemIndex - 1;
      const nextItemIndex = itemIndex + 1;
      const previousMessageId = items[previousItemIndex];
      const nextMessageId = items[nextItemIndex];
      const messageId = items[itemIndex];
      if (!messageId) {
        (0, import_assert.assert)(false, "<Timeline> iterated through items and got an empty message ID");
        continue;
      }
      let unreadIndicatorPlacement;
      if (oldestUnseenIndex === itemIndex) {
        unreadIndicatorPlacement = import_timelineUtil.UnreadIndicatorPlacement.JustAbove;
        messageNodes.push(/* @__PURE__ */ import_react.default.createElement(import_LastSeenIndicator.LastSeenIndicator, {
          key: "last seen indicator",
          count: totalUnseen,
          i18n,
          ref: this.lastSeenIndicatorRef
        }));
      } else if (oldestUnseenIndex === nextItemIndex) {
        unreadIndicatorPlacement = import_timelineUtil.UnreadIndicatorPlacement.JustBelow;
      }
      messageNodes.push(/* @__PURE__ */ import_react.default.createElement("div", {
        key: messageId,
        "data-item-index": itemIndex,
        "data-message-id": messageId
      }, /* @__PURE__ */ import_react.default.createElement(import_ErrorBoundary.ErrorBoundary, {
        i18n,
        showDebugLog
      }, renderItem({
        actionProps,
        containerElementRef: this.containerRef,
        containerWidthBreakpoint: widthBreakpoint,
        conversationId: id,
        isOldestTimelineItem: haveOldest && itemIndex === 0,
        messageId,
        nextMessageId,
        previousMessageId,
        unreadIndicatorPlacement
      }))));
    }
    const warning = Timeline.getWarning(this.props, this.state);
    let timelineWarning;
    if (warning) {
      let text;
      let onClose;
      switch (warning.type) {
        case import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle:
          text = /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
            i18n,
            id: "ContactSpoofing__same-name",
            components: {
              link: /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning.Link, {
                onClick: () => {
                  reviewMessageRequestNameCollision({
                    safeConversationId: warning.safeConversation.id
                  });
                }
              }, i18n("ContactSpoofing__same-name__link"))
            }
          });
          onClose = /* @__PURE__ */ __name(() => {
            this.setState({
              hasDismissedDirectContactSpoofingWarning: true
            });
          }, "onClose");
          break;
        case import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle: {
          const { groupNameCollisions } = warning;
          text = /* @__PURE__ */ import_react.default.createElement(import_Intl.Intl, {
            i18n,
            id: "ContactSpoofing__same-name-in-group",
            components: {
              count: Object.values(groupNameCollisions).reduce((result, conversations) => result + conversations.length, 0).toString(),
              link: /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning.Link, {
                onClick: () => {
                  reviewGroupMemberNameCollision(id);
                }
              }, i18n("ContactSpoofing__same-name-in-group__link"))
            }
          });
          onClose = /* @__PURE__ */ __name(() => {
            acknowledgeGroupMemberNameCollisions(groupNameCollisions);
          }, "onClose");
          break;
        }
        default:
          throw (0, import_missingCaseError.missingCaseError)(warning);
      }
      timelineWarning = /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
        bounds: true,
        onResize: ({ bounds }) => {
          if (!bounds) {
            (0, import_assert.assert)(false, "We should be measuring the bounds");
            return;
          }
          this.setState({ lastMeasuredWarningHeight: bounds.height });
        }
      }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement(import_TimelineWarnings.TimelineWarnings, {
        ref: measureRef
      }, /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning, {
        i18n,
        onClose
      }, /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning.IconContainer, null, /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning.GenericIcon, null)), /* @__PURE__ */ import_react.default.createElement(import_TimelineWarning.TimelineWarning.Text, null, text))));
    }
    let contactSpoofingReviewDialog;
    if (contactSpoofingReview) {
      const commonProps = {
        getPreferredBadge,
        i18n,
        onBlock,
        onBlockAndReportSpam,
        onClose: closeContactSpoofingReview,
        onDelete,
        onShowContactModal: showContactModal,
        onUnblock,
        removeMember,
        theme
      };
      switch (contactSpoofingReview.type) {
        case import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle:
          contactSpoofingReviewDialog = renderContactSpoofingReviewDialog({
            ...commonProps,
            type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
            possiblyUnsafeConversation: contactSpoofingReview.possiblyUnsafeConversation,
            safeConversation: contactSpoofingReview.safeConversation
          });
          break;
        case import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle:
          contactSpoofingReviewDialog = renderContactSpoofingReviewDialog({
            ...commonProps,
            type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
            groupConversationId: id,
            collisionInfoByTitle: contactSpoofingReview.collisionInfoByTitle
          });
          break;
        default:
          throw (0, import_missingCaseError.missingCaseError)(contactSpoofingReview);
      }
    }
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_react_measure.default, {
      bounds: true,
      onResize: ({ bounds }) => {
        const { isNearBottom } = this.props;
        (0, import_assert.strictAssert)(bounds, "We should be measuring the bounds");
        this.setState({
          widthBreakpoint: (0, import_timelineUtil.getWidthBreakpoint)(bounds.width)
        });
        this.maxVisibleRows = Math.ceil(bounds.height / MIN_ROW_HEIGHT);
        const containerEl = this.containerRef.current;
        if (containerEl && isNearBottom) {
          (0, import_scrollUtil.scrollToBottom)(containerEl);
        }
      }
    }, ({ measureRef }) => /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-timeline", isGroupV1AndDisabled ? "module-timeline--disabled" : null, `module-timeline--width-${widthBreakpoint}`),
      role: "presentation",
      tabIndex: -1,
      onBlur: this.handleBlur,
      onKeyDown: this.handleKeyDown,
      ref: measureRef
    }, timelineWarning, floatingHeader, /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-timeline__messages__container",
      onScroll: this.onScroll,
      ref: this.containerRef
    }, /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-timeline__messages", haveNewest && "module-timeline__messages--have-newest", haveOldest && "module-timeline__messages--have-oldest"),
      ref: this.messagesRef
    }, haveOldest && /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, Timeline.getWarning(this.props, this.state) && /* @__PURE__ */ import_react.default.createElement("div", {
      style: { height: lastMeasuredWarningHeight }
    }), renderHeroRow(id, unblurAvatar, updateSharedGroups)), messageNodes, isSomeoneTyping && haveNewest && renderTypingBubble(id), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-timeline__messages__at-bottom-detector",
      ref: this.atBottomDetectorRef,
      style: AT_BOTTOM_DETECTOR_STYLE
    }))), shouldShowScrollDownButton ? /* @__PURE__ */ import_react.default.createElement(import_ScrollDownButton.ScrollDownButton, {
      conversationId: id,
      unreadCount: areUnreadBelowCurrentPosition ? unreadCount : 0,
      scrollDown: this.onClickScrollDownButton,
      i18n
    }) : null)), Boolean(invitedContactsForNewlyCreatedGroup.length) && /* @__PURE__ */ import_react.default.createElement(import_NewlyCreatedGroupInvitedContactsDialog.NewlyCreatedGroupInvitedContactsDialog, {
      contacts: invitedContactsForNewlyCreatedGroup,
      getPreferredBadge,
      i18n,
      onClose: clearInvitedUuidsForNewlyCreatedGroup,
      theme
    }), contactSpoofingReviewDialog);
  }
  static getWarning({ warning }, state) {
    if (!warning) {
      return void 0;
    }
    switch (warning.type) {
      case import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle: {
        const { hasDismissedDirectContactSpoofingWarning } = state;
        return hasDismissedDirectContactSpoofingWarning ? void 0 : warning;
      }
      case import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle:
        return (0, import_groupMemberNameCollisions.hasUnacknowledgedCollisions)(warning.acknowledgedGroupNameCollisions, warning.groupNameCollisions) ? warning : void 0;
      default:
        throw (0, import_missingCaseError.missingCaseError)(warning);
    }
  }
}
function getMessageIdFromElement(element) {
  return element instanceof HTMLElement ? element.dataset.messageId : void 0;
}
function getRowIndexFromElement(element) {
  return element instanceof HTMLElement && element.dataset.itemIndex ? parseInt(element.dataset.itemIndex, 10) : void 0;
}
function showDebugLog() {
  window.showDebugLog();
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Timeline
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmUudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgZmlyc3QsIGdldCwgaXNOdW1iZXIsIGxhc3QsIHBpY2ssIHRocm90dGxlIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCBjbGFzc05hbWVzIGZyb20gJ2NsYXNzbmFtZXMnO1xuaW1wb3J0IHR5cGUgeyBSZWFjdENoaWxkLCBSZWFjdE5vZGUsIFJlZk9iamVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBjcmVhdGVTZWxlY3RvciB9IGZyb20gJ3Jlc2VsZWN0JztcbmltcG9ydCBNZWFzdXJlIGZyb20gJ3JlYWN0LW1lYXN1cmUnO1xuXG5pbXBvcnQgeyBTY3JvbGxEb3duQnV0dG9uIH0gZnJvbSAnLi9TY3JvbGxEb3duQnV0dG9uJztcblxuaW1wb3J0IHR5cGUgeyBBc3NlcnRQcm9wcywgTG9jYWxpemVyVHlwZSwgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGUgfSBmcm9tICcuLi8uLi9zdGF0ZS9zZWxlY3RvcnMvYmFkZ2VzJztcbmltcG9ydCB7IGFzc2VydCwgc3RyaWN0QXNzZXJ0IH0gZnJvbSAnLi4vLi4vdXRpbC9hc3NlcnQnO1xuaW1wb3J0IHsgbWlzc2luZ0Nhc2VFcnJvciB9IGZyb20gJy4uLy4uL3V0aWwvbWlzc2luZ0Nhc2VFcnJvcic7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uLy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuaW1wb3J0IHsgV2lkdGhCcmVha3BvaW50IH0gZnJvbSAnLi4vX3V0aWwnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzQWN0aW9ucyBhcyBNZXNzYWdlQWN0aW9uc1R5cGUgfSBmcm9tICcuL01lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0FjdGlvbnMgYXMgVW5zdXBwb3J0ZWRNZXNzYWdlQWN0aW9uc1R5cGUgfSBmcm9tICcuL1Vuc3VwcG9ydGVkTWVzc2FnZSc7XG5pbXBvcnQgdHlwZSB7IFByb3BzQWN0aW9uc1R5cGUgYXMgQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb25BY3Rpb25zVHlwZSB9IGZyb20gJy4vQ2hhdFNlc3Npb25SZWZyZXNoZWROb3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0FjdGlvbnNUeXBlIGFzIEdyb3VwVjJDaGFuZ2VBY3Rpb25zVHlwZSB9IGZyb20gJy4vR3JvdXBWMkNoYW5nZSc7XG5pbXBvcnQgeyBFcnJvckJvdW5kYXJ5IH0gZnJvbSAnLi9FcnJvckJvdW5kYXJ5JztcbmltcG9ydCB0eXBlIHsgUHJvcHNBY3Rpb25zIGFzIFNhZmV0eU51bWJlckFjdGlvbnNUeXBlIH0gZnJvbSAnLi9TYWZldHlOdW1iZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgSW50bCB9IGZyb20gJy4uL0ludGwnO1xuaW1wb3J0IHsgVGltZWxpbmVXYXJuaW5nIH0gZnJvbSAnLi9UaW1lbGluZVdhcm5pbmcnO1xuaW1wb3J0IHsgVGltZWxpbmVXYXJuaW5ncyB9IGZyb20gJy4vVGltZWxpbmVXYXJuaW5ncyc7XG5pbXBvcnQgeyBOZXdseUNyZWF0ZWRHcm91cEludml0ZWRDb250YWN0c0RpYWxvZyB9IGZyb20gJy4uL05ld2x5Q3JlYXRlZEdyb3VwSW52aXRlZENvbnRhY3RzRGlhbG9nJztcbmltcG9ydCB7IENvbnRhY3RTcG9vZmluZ1R5cGUgfSBmcm9tICcuLi8uLi91dGlsL2NvbnRhY3RTcG9vZmluZyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBTbWFydENvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ1Byb3BzVHlwZSB9IGZyb20gJy4uLy4uL3N0YXRlL3NtYXJ0L0NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZyc7XG5pbXBvcnQgdHlwZSB7IEdyb3VwTmFtZUNvbGxpc2lvbnNXaXRoSWRzQnlUaXRsZSB9IGZyb20gJy4uLy4uL3V0aWwvZ3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucyc7XG5pbXBvcnQgeyBoYXNVbmFja25vd2xlZGdlZENvbGxpc2lvbnMgfSBmcm9tICcuLi8uLi91dGlsL2dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbnMnO1xuaW1wb3J0IHsgVGltZWxpbmVGbG9hdGluZ0hlYWRlciB9IGZyb20gJy4vVGltZWxpbmVGbG9hdGluZ0hlYWRlcic7XG5pbXBvcnQge1xuICBnZXRTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGUsXG4gIGdldFdpZHRoQnJlYWtwb2ludCxcbiAgU2Nyb2xsQW5jaG9yLFxuICBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUsXG4gIFVucmVhZEluZGljYXRvclBsYWNlbWVudCxcbn0gZnJvbSAnLi4vLi4vdXRpbC90aW1lbGluZVV0aWwnO1xuaW1wb3J0IHtcbiAgZ2V0U2Nyb2xsQm90dG9tLFxuICBzY3JvbGxUb0JvdHRvbSxcbiAgc2V0U2Nyb2xsQm90dG9tLFxufSBmcm9tICcuLi8uLi91dGlsL3Njcm9sbFV0aWwnO1xuaW1wb3J0IHsgTGFzdFNlZW5JbmRpY2F0b3IgfSBmcm9tICcuL0xhc3RTZWVuSW5kaWNhdG9yJztcbmltcG9ydCB7IE1JTlVURSB9IGZyb20gJy4uLy4uL3V0aWwvZHVyYXRpb25zJztcblxuY29uc3QgQVRfQk9UVE9NX1RIUkVTSE9MRCA9IDE1O1xuY29uc3QgQVRfQk9UVE9NX0RFVEVDVE9SX1NUWUxFID0geyBoZWlnaHQ6IEFUX0JPVFRPTV9USFJFU0hPTEQgfTtcblxuY29uc3QgTUlOX1JPV19IRUlHSFQgPSAxODtcbmNvbnN0IFNDUk9MTF9ET1dOX0JVVFRPTl9USFJFU0hPTEQgPSA4O1xuY29uc3QgTE9BRF9ORVdFUl9USFJFU0hPTEQgPSA1O1xuXG5leHBvcnQgdHlwZSBXYXJuaW5nVHlwZSA9XG4gIHwge1xuICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5EaXJlY3RDb252ZXJzYXRpb25XaXRoU2FtZVRpdGxlO1xuICAgICAgc2FmZUNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGU7XG4gICAgICBhY2tub3dsZWRnZWRHcm91cE5hbWVDb2xsaXNpb25zOiBHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGU7XG4gICAgICBncm91cE5hbWVDb2xsaXNpb25zOiBHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGU7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgQ29udGFjdFNwb29maW5nUmV2aWV3UHJvcFR5cGUgPVxuICB8IHtcbiAgICAgIHR5cGU6IENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZTtcbiAgICAgIHBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25UeXBlO1xuICAgICAgc2FmZUNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgICB9XG4gIHwge1xuICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGU7XG4gICAgICBjb2xsaXNpb25JbmZvQnlUaXRsZTogUmVjb3JkPFxuICAgICAgICBzdHJpbmcsXG4gICAgICAgIEFycmF5PHtcbiAgICAgICAgICBvbGROYW1lPzogc3RyaW5nO1xuICAgICAgICAgIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZTtcbiAgICAgICAgfT5cbiAgICAgID47XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgUHJvcHNEYXRhVHlwZSA9IHtcbiAgaGF2ZU5ld2VzdDogYm9vbGVhbjtcbiAgaGF2ZU9sZGVzdDogYm9vbGVhbjtcbiAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6IG51bWJlcjtcbiAgbWVzc2FnZUxvYWRpbmdTdGF0ZT86IFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZTtcbiAgaXNOZWFyQm90dG9tPzogYm9vbGVhbjtcbiAgaXRlbXM6IFJlYWRvbmx5QXJyYXk8c3RyaW5nPjtcbiAgb2xkZXN0VW5zZWVuSW5kZXg/OiBudW1iZXI7XG4gIHNjcm9sbFRvSW5kZXg/OiBudW1iZXI7XG4gIHNjcm9sbFRvSW5kZXhDb3VudGVyOiBudW1iZXI7XG4gIHRvdGFsVW5zZWVuOiBudW1iZXI7XG59O1xuXG50eXBlIFByb3BzSG91c2VrZWVwaW5nVHlwZSA9IHtcbiAgaWQ6IHN0cmluZztcbiAgaXNDb252ZXJzYXRpb25TZWxlY3RlZDogYm9vbGVhbjtcbiAgaXNHcm91cFYxQW5kRGlzYWJsZWQ/OiBib29sZWFuO1xuICBpc0luY29taW5nTWVzc2FnZVJlcXVlc3Q6IGJvb2xlYW47XG4gIGlzU29tZW9uZVR5cGluZzogYm9vbGVhbjtcbiAgdW5yZWFkQ291bnQ/OiBudW1iZXI7XG5cbiAgc2VsZWN0ZWRNZXNzYWdlSWQ/OiBzdHJpbmc7XG4gIGludml0ZWRDb250YWN0c0Zvck5ld2x5Q3JlYXRlZEdyb3VwOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPjtcblxuICB3YXJuaW5nPzogV2FybmluZ1R5cGU7XG4gIGNvbnRhY3RTcG9vZmluZ1Jldmlldz86IENvbnRhY3RTcG9vZmluZ1Jldmlld1Byb3BUeXBlO1xuXG4gIGRpc2NhcmRNZXNzYWdlczogKFxuICAgIF86IFJlYWRvbmx5PFxuICAgICAgfCB7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICAgICAgICBudW1iZXJUb0tlZXBBdEJvdHRvbTogbnVtYmVyO1xuICAgICAgICB9XG4gICAgICB8IHsgY29udmVyc2F0aW9uSWQ6IHN0cmluZzsgbnVtYmVyVG9LZWVwQXRUb3A6IG51bWJlciB9XG4gICAgPlxuICApID0+IHZvaWQ7XG4gIGdldFRpbWVzdGFtcEZvck1lc3NhZ2U6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5kZWZpbmVkIHwgbnVtYmVyO1xuICBnZXRQcmVmZXJyZWRCYWRnZTogUHJlZmVycmVkQmFkZ2VTZWxlY3RvclR5cGU7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG5cbiAgcmVuZGVySXRlbTogKHByb3BzOiB7XG4gICAgYWN0aW9uUHJvcHM6IFByb3BzQWN0aW9uc1R5cGU7XG4gICAgY29udGFpbmVyRWxlbWVudFJlZjogUmVmT2JqZWN0PEhUTUxFbGVtZW50PjtcbiAgICBjb250YWluZXJXaWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIGlzT2xkZXN0VGltZWxpbmVJdGVtOiBib29sZWFuO1xuICAgIG1lc3NhZ2VJZDogc3RyaW5nO1xuICAgIG5leHRNZXNzYWdlSWQ6IHVuZGVmaW5lZCB8IHN0cmluZztcbiAgICBwcmV2aW91c01lc3NhZ2VJZDogdW5kZWZpbmVkIHwgc3RyaW5nO1xuICAgIHVucmVhZEluZGljYXRvclBsYWNlbWVudDogdW5kZWZpbmVkIHwgVW5yZWFkSW5kaWNhdG9yUGxhY2VtZW50O1xuICB9KSA9PiBKU1guRWxlbWVudDtcbiAgcmVuZGVySGVyb1JvdzogKFxuICAgIGlkOiBzdHJpbmcsXG4gICAgdW5ibHVyQXZhdGFyOiAoKSA9PiB2b2lkLFxuICAgIHVwZGF0ZVNoYXJlZEdyb3VwczogKCkgPT4gdW5rbm93blxuICApID0+IEpTWC5FbGVtZW50O1xuICByZW5kZXJUeXBpbmdCdWJibGU6IChpZDogc3RyaW5nKSA9PiBKU1guRWxlbWVudDtcbiAgcmVuZGVyQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nOiAoXG4gICAgcHJvcHM6IFNtYXJ0Q29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nUHJvcHNUeXBlXG4gICkgPT4gSlNYLkVsZW1lbnQ7XG59O1xuXG5leHBvcnQgdHlwZSBQcm9wc0FjdGlvbnNUeXBlID0ge1xuICBhY2tub3dsZWRnZUdyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbnM6IChcbiAgICBncm91cE5hbWVDb2xsaXNpb25zOiBSZWFkb25seTxHcm91cE5hbWVDb2xsaXNpb25zV2l0aElkc0J5VGl0bGU+XG4gICkgPT4gdm9pZDtcbiAgY2xlYXJJbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cDogKCkgPT4gdm9pZDtcbiAgY2xvc2VDb250YWN0U3Bvb2ZpbmdSZXZpZXc6ICgpID0+IHZvaWQ7XG4gIHNldElzTmVhckJvdHRvbTogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIGlzTmVhckJvdHRvbTogYm9vbGVhbikgPT4gdW5rbm93bjtcbiAgcmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uOiAoZ3JvdXBDb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB2b2lkO1xuICByZXZpZXdNZXNzYWdlUmVxdWVzdE5hbWVDb2xsaXNpb246IChcbiAgICBfOiBSZWFkb25seTx7XG4gICAgICBzYWZlQ29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICB9PlxuICApID0+IHZvaWQ7XG5cbiAgbGVhcm5Nb3JlQWJvdXREZWxpdmVyeUlzc3VlOiAoKSA9PiB1bmtub3duO1xuICBsb2FkT2xkZXJNZXNzYWdlczogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBsb2FkTmV3ZXJNZXNzYWdlczogKG1lc3NhZ2VJZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBsb2FkTmV3ZXN0TWVzc2FnZXM6IChtZXNzYWdlSWQ6IHN0cmluZywgc2V0Rm9jdXM/OiBib29sZWFuKSA9PiB1bmtub3duO1xuICBtYXJrTWVzc2FnZVJlYWQ6IChtZXNzYWdlSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb25CbG9jazogKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpID0+IHVua25vd247XG4gIG9uQmxvY2tBbmRSZXBvcnRTcGFtOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgb25EZWxldGU6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBvblVuYmxvY2s6IChjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBwZWVrR3JvdXBDYWxsRm9yVGhlRmlyc3RUaW1lOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcGVla0dyb3VwQ2FsbElmSXRIYXNNZW1iZXJzOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgcmVtb3ZlTWVtYmVyOiAoY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2VsZWN0TWVzc2FnZTogKG1lc3NhZ2VJZDogc3RyaW5nLCBjb252ZXJzYXRpb25JZDogc3RyaW5nKSA9PiB1bmtub3duO1xuICBjbGVhclNlbGVjdGVkTWVzc2FnZTogKCkgPT4gdW5rbm93bjtcbiAgdW5ibHVyQXZhdGFyOiAoKSA9PiB2b2lkO1xuICB1cGRhdGVTaGFyZWRHcm91cHM6ICgpID0+IHVua25vd247XG59ICYgTWVzc2FnZUFjdGlvbnNUeXBlICZcbiAgU2FmZXR5TnVtYmVyQWN0aW9uc1R5cGUgJlxuICBVbnN1cHBvcnRlZE1lc3NhZ2VBY3Rpb25zVHlwZSAmXG4gIEdyb3VwVjJDaGFuZ2VBY3Rpb25zVHlwZSAmXG4gIENoYXRTZXNzaW9uUmVmcmVzaGVkTm90aWZpY2F0aW9uQWN0aW9uc1R5cGU7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IFByb3BzRGF0YVR5cGUgJlxuICBQcm9wc0hvdXNla2VlcGluZ1R5cGUgJlxuICBQcm9wc0FjdGlvbnNUeXBlO1xuXG50eXBlIFN0YXRlVHlwZSA9IHtcbiAgaGFzRGlzbWlzc2VkRGlyZWN0Q29udGFjdFNwb29maW5nV2FybmluZzogYm9vbGVhbjtcbiAgaGFzUmVjZW50bHlTY3JvbGxlZDogYm9vbGVhbjtcbiAgbGFzdE1lYXN1cmVkV2FybmluZ0hlaWdodDogbnVtYmVyO1xuICBuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkPzogc3RyaW5nO1xuICBvbGRlc3RQYXJ0aWFsbHlWaXNpYmxlTWVzc2FnZUlkPzogc3RyaW5nO1xuICB3aWR0aEJyZWFrcG9pbnQ6IFdpZHRoQnJlYWtwb2ludDtcbn07XG5cbmNvbnN0IHNjcm9sbFRvVW5yZWFkSW5kaWNhdG9yID0gU3ltYm9sKCdzY3JvbGxUb1VucmVhZEluZGljYXRvcicpO1xuXG50eXBlIFNuYXBzaG90VHlwZSA9XG4gIHwgbnVsbFxuICB8IHR5cGVvZiBzY3JvbGxUb1VucmVhZEluZGljYXRvclxuICB8IHsgc2Nyb2xsVG9JbmRleDogbnVtYmVyIH1cbiAgfCB7IHNjcm9sbFRvcDogbnVtYmVyIH1cbiAgfCB7IHNjcm9sbEJvdHRvbTogbnVtYmVyIH07XG5cbmNvbnN0IGdldEFjdGlvbnMgPSBjcmVhdGVTZWxlY3RvcihcbiAgLy8gSXQgaXMgZXhwZW5zaXZlIHRvIHBpY2sgc28gbWFueSBwcm9wZXJ0aWVzIG91dCBvZiB0aGUgYHByb3BzYCBvYmplY3Qgc28gd2VcbiAgLy8gdXNlIGBjcmVhdGVTZWxlY3RvcmAgdG8gbWVtb2l6ZSB0aGVtIGJ5IHRoZSBsYXN0IHNlZW4gYHByb3BzYCBvYmplY3QuXG4gIChwcm9wczogUHJvcHNUeXBlKSA9PiBwcm9wcyxcblxuICAocHJvcHM6IFByb3BzVHlwZSk6IFByb3BzQWN0aW9uc1R5cGUgPT4ge1xuICAgIGNvbnN0IHVuc2FmZSA9IHBpY2socHJvcHMsIFtcbiAgICAgICdhY2tub3dsZWRnZUdyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbnMnLFxuICAgICAgJ2Jsb2NrR3JvdXBMaW5rUmVxdWVzdHMnLFxuICAgICAgJ2NsZWFySW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXAnLFxuICAgICAgJ2Nsb3NlQ29udGFjdFNwb29maW5nUmV2aWV3JyxcbiAgICAgICdzZXRJc05lYXJCb3R0b20nLFxuICAgICAgJ3Jldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbicsXG4gICAgICAncmV2aWV3TWVzc2FnZVJlcXVlc3ROYW1lQ29sbGlzaW9uJyxcbiAgICAgICdsZWFybk1vcmVBYm91dERlbGl2ZXJ5SXNzdWUnLFxuICAgICAgJ2xvYWRPbGRlck1lc3NhZ2VzJyxcbiAgICAgICdsb2FkTmV3ZXJNZXNzYWdlcycsXG4gICAgICAnbG9hZE5ld2VzdE1lc3NhZ2VzJyxcbiAgICAgICdtYXJrTWVzc2FnZVJlYWQnLFxuICAgICAgJ21hcmtWaWV3ZWQnLFxuICAgICAgJ29uQmxvY2snLFxuICAgICAgJ29uQmxvY2tBbmRSZXBvcnRTcGFtJyxcbiAgICAgICdvbkRlbGV0ZScsXG4gICAgICAnb25VbmJsb2NrJyxcbiAgICAgICdwZWVrR3JvdXBDYWxsRm9yVGhlRmlyc3RUaW1lJyxcbiAgICAgICdwZWVrR3JvdXBDYWxsSWZJdEhhc01lbWJlcnMnLFxuICAgICAgJ3JlbW92ZU1lbWJlcicsXG4gICAgICAnc2VsZWN0TWVzc2FnZScsXG4gICAgICAnY2xlYXJTZWxlY3RlZE1lc3NhZ2UnLFxuICAgICAgJ3VuYmx1ckF2YXRhcicsXG4gICAgICAndXBkYXRlU2hhcmVkR3JvdXBzJyxcblxuICAgICAgJ2RvdWJsZUNoZWNrTWlzc2luZ1F1b3RlUmVmZXJlbmNlJyxcbiAgICAgICdjaGVja0ZvckFjY291bnQnLFxuICAgICAgJ3JlYWN0VG9NZXNzYWdlJyxcbiAgICAgICdyZXBseVRvTWVzc2FnZScsXG4gICAgICAncmV0cnlEZWxldGVGb3JFdmVyeW9uZScsXG4gICAgICAncmV0cnlTZW5kJyxcbiAgICAgICdzaG93Rm9yd2FyZE1lc3NhZ2VNb2RhbCcsXG4gICAgICAnZGVsZXRlTWVzc2FnZScsXG4gICAgICAnZGVsZXRlTWVzc2FnZUZvckV2ZXJ5b25lJyxcbiAgICAgICdzaG93TWVzc2FnZURldGFpbCcsXG4gICAgICAnb3BlbkNvbnZlcnNhdGlvbicsXG4gICAgICAnb3BlbkdpZnRCYWRnZScsXG4gICAgICAnc2hvd0NvbnRhY3REZXRhaWwnLFxuICAgICAgJ3Nob3dDb250YWN0TW9kYWwnLFxuICAgICAgJ2tpY2tPZmZBdHRhY2htZW50RG93bmxvYWQnLFxuICAgICAgJ21hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQnLFxuICAgICAgJ21lc3NhZ2VFeHBhbmRlZCcsXG4gICAgICAnc2hvd1Zpc3VhbEF0dGFjaG1lbnQnLFxuICAgICAgJ2Rvd25sb2FkQXR0YWNobWVudCcsXG4gICAgICAnZGlzcGxheVRhcFRvVmlld01lc3NhZ2UnLFxuICAgICAgJ29wZW5MaW5rJyxcbiAgICAgICdzY3JvbGxUb1F1b3RlZE1lc3NhZ2UnLFxuICAgICAgJ3Nob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdCcsXG4gICAgICAnc2hvd0V4cGlyZWRPdXRnb2luZ1RhcFRvVmlld1RvYXN0JyxcbiAgICAgICdzdGFydENvbnZlcnNhdGlvbicsXG5cbiAgICAgICdzaG93SWRlbnRpdHknLFxuXG4gICAgICAnZG93bmxvYWROZXdWZXJzaW9uJyxcblxuICAgICAgJ2NvbnRhY3RTdXBwb3J0JyxcbiAgICBdKTtcblxuICAgIGNvbnN0IHNhZmU6IEFzc2VydFByb3BzPFByb3BzQWN0aW9uc1R5cGUsIHR5cGVvZiB1bnNhZmU+ID0gdW5zYWZlO1xuXG4gICAgcmV0dXJuIHNhZmU7XG4gIH1cbik7XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZSBleHRlbmRzIFJlYWN0LkNvbXBvbmVudDxcbiAgUHJvcHNUeXBlLFxuICBTdGF0ZVR5cGUsXG4gIFNuYXBzaG90VHlwZVxuPiB7XG4gIHByaXZhdGUgcmVhZG9ubHkgY29udGFpbmVyUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICBwcml2YXRlIHJlYWRvbmx5IG1lc3NhZ2VzUmVmID0gUmVhY3QuY3JlYXRlUmVmPEhUTUxEaXZFbGVtZW50PigpO1xuICBwcml2YXRlIHJlYWRvbmx5IGF0Qm90dG9tRGV0ZWN0b3JSZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gIHByaXZhdGUgcmVhZG9ubHkgbGFzdFNlZW5JbmRpY2F0b3JSZWYgPSBSZWFjdC5jcmVhdGVSZWY8SFRNTERpdkVsZW1lbnQ+KCk7XG4gIHByaXZhdGUgaW50ZXJzZWN0aW9uT2JzZXJ2ZXI/OiBJbnRlcnNlY3Rpb25PYnNlcnZlcjtcbiAgcHJpdmF0ZSBpbnRlcnNlY3Rpb25PYnNlcnZlckNhbGxiYWNrRnJhbWU/OiBudW1iZXI7XG5cbiAgLy8gVGhpcyBpcyBhIGJlc3QgZ3Vlc3MuIEl0IHdpbGwgbGlrZWx5IGJlIG92ZXJyaWRkZW4gd2hlbiB0aGUgdGltZWxpbmUgaXMgbWVhc3VyZWQuXG4gIHByaXZhdGUgbWF4VmlzaWJsZVJvd3MgPSBNYXRoLmNlaWwod2luZG93LmlubmVySGVpZ2h0IC8gTUlOX1JPV19IRUlHSFQpO1xuXG4gIHByaXZhdGUgaGFzUmVjZW50bHlTY3JvbGxlZFRpbWVvdXQ/OiBOb2RlSlMuVGltZW91dDtcbiAgcHJpdmF0ZSBkZWxheWVkUGVla1RpbWVvdXQ/OiBOb2RlSlMuVGltZW91dDtcbiAgcHJpdmF0ZSBwZWVrSW50ZXJ2YWw/OiBOb2RlSlMuVGltZW91dDtcblxuICBvdmVycmlkZSBzdGF0ZTogU3RhdGVUeXBlID0ge1xuICAgIGhhc1JlY2VudGx5U2Nyb2xsZWQ6IHRydWUsXG4gICAgaGFzRGlzbWlzc2VkRGlyZWN0Q29udGFjdFNwb29maW5nV2FybmluZzogZmFsc2UsXG5cbiAgICAvLyBUaGVzZSBtYXkgYmUgc3dpZnRseSBvdmVycmlkZGVuLlxuICAgIGxhc3RNZWFzdXJlZFdhcm5pbmdIZWlnaHQ6IDAsXG4gICAgd2lkdGhCcmVha3BvaW50OiBXaWR0aEJyZWFrcG9pbnQuV2lkZSxcbiAgfTtcblxuICBwcml2YXRlIG9uU2Nyb2xsID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuc2V0U3RhdGUob2xkU3RhdGUgPT5cbiAgICAgIC8vIGBvblNjcm9sbGAgaXMgY2FsbGVkIGZyZXF1ZW50bHksIHNvIGl0J3MgcGVyZm9ybWFuY2Utc2Vuc2l0aXZlLiBXZSB0cnkgb3VyIGJlc3RcbiAgICAgIC8vICAgdG8gcmV0dXJuIGBudWxsYCBmcm9tIHRoaXMgdXBkYXRlciBiZWNhdXNlIFt0aGF0IHdvbid0IGNhdXNlIGEgcmUtcmVuZGVyXVswXS5cbiAgICAgIC8vXG4gICAgICAvLyBbMF06IGh0dHBzOi8vZ2l0aHViLmNvbS9mYWNlYm9vay9yZWFjdC9ibG9iLzI5YjdiNzc1ZjJlY2Y4NzhlYWY2MDViZTk1OWQ5NTkwMzA1OThiMDcvcGFja2FnZXMvcmVhY3QtcmVjb25jaWxlci9zcmMvUmVhY3RVcGRhdGVRdWV1ZS5qcyNMNDAxLUw0MDRcbiAgICAgIG9sZFN0YXRlLmhhc1JlY2VudGx5U2Nyb2xsZWQgPyBudWxsIDogeyBoYXNSZWNlbnRseVNjcm9sbGVkOiB0cnVlIH1cbiAgICApO1xuICAgIGNsZWFyVGltZW91dElmTmVjZXNzYXJ5KHRoaXMuaGFzUmVjZW50bHlTY3JvbGxlZFRpbWVvdXQpO1xuICAgIHRoaXMuaGFzUmVjZW50bHlTY3JvbGxlZFRpbWVvdXQgPSBzZXRUaW1lb3V0KCgpID0+IHtcbiAgICAgIHRoaXMuc2V0U3RhdGUoeyBoYXNSZWNlbnRseVNjcm9sbGVkOiBmYWxzZSB9KTtcbiAgICB9LCAzMDAwKTtcbiAgfTtcblxuICBwcml2YXRlIHNjcm9sbFRvSXRlbUluZGV4KGl0ZW1JbmRleDogbnVtYmVyKTogdm9pZCB7XG4gICAgdGhpcy5tZXNzYWdlc1JlZi5jdXJyZW50XG4gICAgICA/LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLWl0ZW0taW5kZXg9XCIke2l0ZW1JbmRleH1cIl1gKVxuICAgICAgPy5zY3JvbGxJbnRvVmlld0lmTmVlZGVkKCk7XG4gIH1cblxuICBwcml2YXRlIHNjcm9sbFRvQm90dG9tID0gKHNldEZvY3VzPzogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHsgc2VsZWN0TWVzc2FnZSwgaWQsIGl0ZW1zIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgaWYgKHNldEZvY3VzICYmIGl0ZW1zICYmIGl0ZW1zLmxlbmd0aCA+IDApIHtcbiAgICAgIGNvbnN0IGxhc3RJbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XG4gICAgICBjb25zdCBsYXN0TWVzc2FnZUlkID0gaXRlbXNbbGFzdEluZGV4XTtcbiAgICAgIHNlbGVjdE1lc3NhZ2UobGFzdE1lc3NhZ2VJZCwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgICBpZiAoY29udGFpbmVyRWwpIHtcbiAgICAgICAgc2Nyb2xsVG9Cb3R0b20oY29udGFpbmVyRWwpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcblxuICBwcml2YXRlIG9uQ2xpY2tTY3JvbGxEb3duQnV0dG9uID0gKCk6IHZvaWQgPT4ge1xuICAgIHRoaXMuc2Nyb2xsRG93bihmYWxzZSk7XG4gIH07XG5cbiAgcHJpdmF0ZSBzY3JvbGxEb3duID0gKHNldEZvY3VzPzogYm9vbGVhbik6IHZvaWQgPT4ge1xuICAgIGNvbnN0IHtcbiAgICAgIGhhdmVOZXdlc3QsXG4gICAgICBpZCxcbiAgICAgIGl0ZW1zLFxuICAgICAgbG9hZE5ld2VzdE1lc3NhZ2VzLFxuICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgICAgIG9sZGVzdFVuc2VlbkluZGV4LFxuICAgICAgc2VsZWN0TWVzc2FnZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQgfSA9IHRoaXMuc3RhdGU7XG5cbiAgICBpZiAoIWl0ZW1zIHx8IGl0ZW1zLmxlbmd0aCA8IDEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAobWVzc2FnZUxvYWRpbmdTdGF0ZSkge1xuICAgICAgdGhpcy5zY3JvbGxUb0JvdHRvbShzZXRGb2N1cyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgbmV3ZXN0Qm90dG9tVmlzaWJsZU1lc3NhZ2VJZCAmJlxuICAgICAgaXNOdW1iZXIob2xkZXN0VW5zZWVuSW5kZXgpICYmXG4gICAgICBpdGVtcy5maW5kSW5kZXgoaXRlbSA9PiBpdGVtID09PSBuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkKSA8XG4gICAgICAgIG9sZGVzdFVuc2VlbkluZGV4XG4gICAgKSB7XG4gICAgICBpZiAoc2V0Rm9jdXMpIHtcbiAgICAgICAgY29uc3QgbWVzc2FnZUlkID0gaXRlbXNbb2xkZXN0VW5zZWVuSW5kZXhdO1xuICAgICAgICBzZWxlY3RNZXNzYWdlKG1lc3NhZ2VJZCwgaWQpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0l0ZW1JbmRleChvbGRlc3RVbnNlZW5JbmRleCk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChoYXZlTmV3ZXN0KSB7XG4gICAgICB0aGlzLnNjcm9sbFRvQm90dG9tKHNldEZvY3VzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgY29uc3QgbGFzdElkID0gbGFzdChpdGVtcyk7XG4gICAgICBpZiAobGFzdElkKSB7XG4gICAgICAgIGxvYWROZXdlc3RNZXNzYWdlcyhsYXN0SWQsIHNldEZvY3VzKTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG5cbiAgcHJpdmF0ZSBpc0F0Qm90dG9tKCk6IGJvb2xlYW4ge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgICBpZiAoIWNvbnRhaW5lckVsKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IGlzU2Nyb2xsZWROZWFyQm90dG9tID1cbiAgICAgIGdldFNjcm9sbEJvdHRvbShjb250YWluZXJFbCkgPD0gQVRfQk9UVE9NX1RIUkVTSE9MRDtcbiAgICBjb25zdCBoYXNTY3JvbGxiYXJzID0gY29udGFpbmVyRWwuY2xpZW50SGVpZ2h0IDwgY29udGFpbmVyRWwuc2Nyb2xsSGVpZ2h0O1xuICAgIHJldHVybiBpc1Njcm9sbGVkTmVhckJvdHRvbSB8fCAhaGFzU2Nyb2xsYmFycztcbiAgfVxuXG4gIHByaXZhdGUgdXBkYXRlSW50ZXJzZWN0aW9uT2JzZXJ2ZXIoKTogdm9pZCB7XG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGNvbnN0IG1lc3NhZ2VzRWwgPSB0aGlzLm1lc3NhZ2VzUmVmLmN1cnJlbnQ7XG4gICAgY29uc3QgYXRCb3R0b21EZXRlY3RvckVsID0gdGhpcy5hdEJvdHRvbURldGVjdG9yUmVmLmN1cnJlbnQ7XG4gICAgaWYgKCFjb250YWluZXJFbCB8fCAhbWVzc2FnZXNFbCB8fCAhYXRCb3R0b21EZXRlY3RvckVsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3Qge1xuICAgICAgaGF2ZU5ld2VzdCxcbiAgICAgIGhhdmVPbGRlc3QsXG4gICAgICBpZCxcbiAgICAgIGl0ZW1zLFxuICAgICAgbG9hZE5ld2VyTWVzc2FnZXMsXG4gICAgICBsb2FkT2xkZXJNZXNzYWdlcyxcbiAgICAgIG1lc3NhZ2VMb2FkaW5nU3RhdGUsXG4gICAgICBzZXRJc05lYXJCb3R0b20sXG4gICAgfSA9IHRoaXMucHJvcHM7XG5cbiAgICAvLyBXZSByZS1pbml0aWFsaXplIHRoZSBgSW50ZXJzZWN0aW9uT2JzZXJ2ZXJgLiBXZSBkb24ndCB3YW50IHN0YWxlIHJlZmVyZW5jZXMgdG8gb2xkXG4gICAgLy8gICBwcm9wcywgYW5kIHdlIGNhcmUgYWJvdXQgdGhlIG9yZGVyIG9mIGBJbnRlcnNlY3Rpb25PYnNlcnZlckVudHJ5YHMuIChXZSBjb3VsZCBkb1xuICAgIC8vICAgdGhpcyBhbm90aGVyIHdheSwgYnV0IHRoaXMgYXBwcm9hY2ggd29ya3MuKVxuICAgIHRoaXMuaW50ZXJzZWN0aW9uT2JzZXJ2ZXI/LmRpc2Nvbm5lY3QoKTtcblxuICAgIGlmICh0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyQ2FsbGJhY2tGcmFtZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUodGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlckNhbGxiYWNrRnJhbWUpO1xuICAgIH1cblxuICAgIGNvbnN0IGludGVyc2VjdGlvblJhdGlvcyA9IG5ldyBNYXA8RWxlbWVudCwgbnVtYmVyPigpO1xuXG4gICAgY29uc3QgaW50ZXJzZWN0aW9uT2JzZXJ2ZXJDYWxsYmFjazogSW50ZXJzZWN0aW9uT2JzZXJ2ZXJDYWxsYmFjayA9XG4gICAgICBlbnRyaWVzID0+IHtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHRpbWUgdGhpcyBjYWxsYmFjayBpcyBjYWxsZWQsIHdlJ2xsIGdldCBlbnRyaWVzIGluIG9ic2VydmF0aW9uIG9yZGVyXG4gICAgICAgIC8vICAgKHdoaWNoIHNob3VsZCBtYXRjaCBET00gb3JkZXIpLiBXZSBkb24ndCB3YW50IHRvIGRlbGV0ZSBhbnl0aGluZyBmcm9tIG91ciBtYXBcbiAgICAgICAgLy8gICBiZWNhdXNlIHdlIGRvbid0IHdhbnQgdGhlIG9yZGVyIHRvIGNoYW5nZSBhdCBhbGwuXG4gICAgICAgIGVudHJpZXMuZm9yRWFjaChlbnRyeSA9PiB7XG4gICAgICAgICAgaW50ZXJzZWN0aW9uUmF0aW9zLnNldChlbnRyeS50YXJnZXQsIGVudHJ5LmludGVyc2VjdGlvblJhdGlvKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgbGV0IG5ld0lzTmVhckJvdHRvbSA9IGZhbHNlO1xuICAgICAgICBsZXQgb2xkZXN0UGFydGlhbGx5VmlzaWJsZTogdW5kZWZpbmVkIHwgRWxlbWVudDtcbiAgICAgICAgbGV0IG5ld2VzdFBhcnRpYWxseVZpc2libGU6IHVuZGVmaW5lZCB8IEVsZW1lbnQ7XG4gICAgICAgIGxldCBuZXdlc3RGdWxseVZpc2libGU6IHVuZGVmaW5lZCB8IEVsZW1lbnQ7XG5cbiAgICAgICAgZm9yIChjb25zdCBbZWxlbWVudCwgaW50ZXJzZWN0aW9uUmF0aW9dIG9mIGludGVyc2VjdGlvblJhdGlvcykge1xuICAgICAgICAgIGlmIChpbnRlcnNlY3Rpb25SYXRpbyA9PT0gMCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgLy8gV2UgdXNlIHRoaXMgXCJhdCBib3R0b20gZGV0ZWN0b3JcIiBmb3IgdHdvIHJlYXNvbnMsIGJvdGggZm9yIHBlcmZvcm1hbmNlLiBJdCdzXG4gICAgICAgICAgLy8gICB1c3VhbGx5IGZhc3RlciB0byB1c2UgYW4gYEludGVyc2VjdGlvbk9ic2VydmVyYCBpbnN0ZWFkIG9mIGEgc2Nyb2xsIGV2ZW50LFxuICAgICAgICAgIC8vICAgYW5kIHdlIHdhbnQgdG8gZG8gdGhhdCBoZXJlLlxuICAgICAgICAgIC8vXG4gICAgICAgICAgLy8gMS4gV2UgY2FuIGRldGVybWluZSB3aGV0aGVyIHdlJ3JlIG5lYXIgdGhlIGJvdHRvbSB3aXRob3V0IGBvblNjcm9sbGBcbiAgICAgICAgICAvLyAyLiBXZSBuZWVkIHRoaXMgaW5mb3JtYXRpb24gd2hlbiBkZWNpZGluZyB3aGV0aGVyIHRoZSBib3R0b20gb2YgdGhlIGxhc3RcbiAgICAgICAgICAvLyAgICBtZXNzYWdlIGlzIHZpc2libGUuIFdlIHdhbnQgdG8gZ2V0IGFuIGludGVyc2VjdGlvbiBvYnNlcnZlciBldmVudCB3aGVuIHRoZVxuICAgICAgICAgIC8vICAgIGJvdHRvbSBvZiB0aGUgY29udGFpbmVyIGNvbWVzIGludG8gdmlldy5cbiAgICAgICAgICBpZiAoZWxlbWVudCA9PT0gYXRCb3R0b21EZXRlY3RvckVsKSB7XG4gICAgICAgICAgICBuZXdJc05lYXJCb3R0b20gPSB0cnVlO1xuICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBvbGRlc3RQYXJ0aWFsbHlWaXNpYmxlID0gb2xkZXN0UGFydGlhbGx5VmlzaWJsZSB8fCBlbGVtZW50O1xuICAgICAgICAgICAgbmV3ZXN0UGFydGlhbGx5VmlzaWJsZSA9IGVsZW1lbnQ7XG4gICAgICAgICAgICBpZiAoaW50ZXJzZWN0aW9uUmF0aW8gPT09IDEpIHtcbiAgICAgICAgICAgICAgbmV3ZXN0RnVsbHlWaXNpYmxlID0gZWxlbWVudDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBJZiBhIG1lc3NhZ2UgaXMgZnVsbHkgdmlzaWJsZSwgdGhlbiB5b3UgY2FuIHNlZSBpdHMgYm90dG9tLiBJZiBub3QsIHRoZXJlJ3MgYVxuICAgICAgICAvLyAgIHZlcnkgdGFsbCBtZXNzYWdlIGFyb3VuZC4gV2UgYXNzdW1lIHlvdSBjYW4gc2VlIHRoZSBib3R0b20gb2YgYSBtZXNzYWdlIGlmXG4gICAgICAgIC8vICAgKDEpIGFub3RoZXIgbWVzc2FnZSBpcyBwYXJ0bHkgdmlzaWJsZSByaWdodCBiZWxvdyBpdCwgb3IgKDIpIHlvdSdyZSBuZWFyIHRoZVxuICAgICAgICAvLyAgIGJvdHRvbSBvZiB0aGUgc2Nyb2xsYWJsZSBjb250YWluZXIuXG4gICAgICAgIGxldCBuZXdlc3RCb3R0b21WaXNpYmxlOiB1bmRlZmluZWQgfCBFbGVtZW50O1xuICAgICAgICBpZiAobmV3ZXN0RnVsbHlWaXNpYmxlKSB7XG4gICAgICAgICAgbmV3ZXN0Qm90dG9tVmlzaWJsZSA9IG5ld2VzdEZ1bGx5VmlzaWJsZTtcbiAgICAgICAgfSBlbHNlIGlmIChcbiAgICAgICAgICBuZXdJc05lYXJCb3R0b20gfHxcbiAgICAgICAgICBuZXdlc3RQYXJ0aWFsbHlWaXNpYmxlICE9PSBvbGRlc3RQYXJ0aWFsbHlWaXNpYmxlXG4gICAgICAgICkge1xuICAgICAgICAgIG5ld2VzdEJvdHRvbVZpc2libGUgPSBvbGRlc3RQYXJ0aWFsbHlWaXNpYmxlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3Qgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCA9IGdldE1lc3NhZ2VJZEZyb21FbGVtZW50KFxuICAgICAgICAgIG9sZGVzdFBhcnRpYWxseVZpc2libGVcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgbmV3ZXN0Qm90dG9tVmlzaWJsZU1lc3NhZ2VJZCA9XG4gICAgICAgICAgZ2V0TWVzc2FnZUlkRnJvbUVsZW1lbnQobmV3ZXN0Qm90dG9tVmlzaWJsZSk7XG5cbiAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCxcbiAgICAgICAgICBuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkLFxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRJc05lYXJCb3R0b20oaWQsIG5ld0lzTmVhckJvdHRvbSk7XG5cbiAgICAgICAgaWYgKG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQpIHtcbiAgICAgICAgICB0aGlzLm1hcmtOZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZVJlYWQoKTtcblxuICAgICAgICAgIGNvbnN0IHJvd0luZGV4ID0gZ2V0Um93SW5kZXhGcm9tRWxlbWVudChuZXdlc3RCb3R0b21WaXNpYmxlKTtcbiAgICAgICAgICBjb25zdCBtYXhSb3dJbmRleCA9IGl0ZW1zLmxlbmd0aCAtIDE7XG5cbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAhbWVzc2FnZUxvYWRpbmdTdGF0ZSAmJlxuICAgICAgICAgICAgIWhhdmVOZXdlc3QgJiZcbiAgICAgICAgICAgIGlzTnVtYmVyKHJvd0luZGV4KSAmJlxuICAgICAgICAgICAgbWF4Um93SW5kZXggPj0gMCAmJlxuICAgICAgICAgICAgcm93SW5kZXggPj0gbWF4Um93SW5kZXggLSBMT0FEX05FV0VSX1RIUkVTSE9MRFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgbG9hZE5ld2VyTWVzc2FnZXMobmV3ZXN0Qm90dG9tVmlzaWJsZU1lc3NhZ2VJZCk7XG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKFxuICAgICAgICAgICFtZXNzYWdlTG9hZGluZ1N0YXRlICYmXG4gICAgICAgICAgIWhhdmVPbGRlc3QgJiZcbiAgICAgICAgICBvbGRlc3RQYXJ0aWFsbHlWaXNpYmxlTWVzc2FnZUlkICYmXG4gICAgICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCA9PT0gaXRlbXNbMF1cbiAgICAgICAgKSB7XG4gICAgICAgICAgbG9hZE9sZGVyTWVzc2FnZXMob2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCk7XG4gICAgICAgIH1cbiAgICAgIH07XG5cbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID0gbmV3IEludGVyc2VjdGlvbk9ic2VydmVyKFxuICAgICAgKGVudHJpZXMsIG9ic2VydmVyKSA9PiB7XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyID09PSBvYnNlcnZlcixcbiAgICAgICAgICAnb2JzZXJ2ZXIuZGlzY29ubmVjdCgpIHNob3VsZCBwcmV2ZW50IGNhbGxiYWNrcyBmcm9tIGZpcmluZydcbiAgICAgICAgKTtcblxuICAgICAgICAvLyBgcmVhY3QtbWVhc3VyZWAgc2NoZWR1bGVzIHRoZSBjYWxsYmFja3Mgb24gdGhlIG5leHQgdGljayBhbmQgc29cbiAgICAgICAgLy8gc2hvdWxkIHdlIGJlY2F1c2Ugd2Ugd2FudCBvdGhlciBwYXJ0cyBvZiB0aGlzIGNvbXBvbmVudCB0byByZXNwb25kXG4gICAgICAgIC8vIHRvIHJlc2l6ZSBldmVudHMgYmVmb3JlIHdlIHJlY2FsY3VsYXRlIHdoYXQgaXMgdmlzaWJsZS5cbiAgICAgICAgdGhpcy5pbnRlcnNlY3Rpb25PYnNlcnZlckNhbGxiYWNrRnJhbWUgPSB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKFxuICAgICAgICAgICgpID0+IHtcbiAgICAgICAgICAgIC8vIE9ic2VydmVyIHdhcyB1cGRhdGVkIGZyb20gdW5kZXIgdXNcbiAgICAgICAgICAgIGlmICh0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyICE9PSBvYnNlcnZlcikge1xuICAgICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIGludGVyc2VjdGlvbk9ic2VydmVyQ2FsbGJhY2soZW50cmllcywgb2JzZXJ2ZXIpO1xuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIHJvb3Q6IGNvbnRhaW5lckVsLFxuICAgICAgICB0aHJlc2hvbGQ6IFswLCAxXSxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgZm9yIChjb25zdCBjaGlsZCBvZiBtZXNzYWdlc0VsLmNoaWxkcmVuKSB7XG4gICAgICBpZiAoKGNoaWxkIGFzIEhUTUxFbGVtZW50KS5kYXRhc2V0Lm1lc3NhZ2VJZCkge1xuICAgICAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoY2hpbGQpO1xuICAgICAgfVxuICAgIH1cbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyLm9ic2VydmUoYXRCb3R0b21EZXRlY3RvckVsKTtcbiAgfVxuXG4gIHByaXZhdGUgbWFya05ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlUmVhZCA9IHRocm90dGxlKCgpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IG1hcmtNZXNzYWdlUmVhZCB9ID0gdGhpcy5wcm9wcztcbiAgICBjb25zdCB7IG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQgfSA9IHRoaXMuc3RhdGU7XG4gICAgaWYgKG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQpIHtcbiAgICAgIG1hcmtNZXNzYWdlUmVhZChuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkKTtcbiAgICB9XG4gIH0sIDUwMCk7XG5cbiAgcHVibGljIG92ZXJyaWRlIGNvbXBvbmVudERpZE1vdW50KCk6IHZvaWQge1xuICAgIGNvbnN0IGNvbnRhaW5lckVsID0gdGhpcy5jb250YWluZXJSZWYuY3VycmVudDtcbiAgICBjb25zdCBtZXNzYWdlc0VsID0gdGhpcy5tZXNzYWdlc1JlZi5jdXJyZW50O1xuICAgIHN0cmljdEFzc2VydChcbiAgICAgIGNvbnRhaW5lckVsICYmIG1lc3NhZ2VzRWwsXG4gICAgICAnPFRpbWVsaW5lPiBtb3VudGVkIHdpdGhvdXQgc29tZSByZWZzJ1xuICAgICk7XG5cbiAgICB0aGlzLnVwZGF0ZUludGVyc2VjdGlvbk9ic2VydmVyKCk7XG5cbiAgICB3aW5kb3cucmVnaXN0ZXJGb3JBY3RpdmUodGhpcy5tYXJrTmV3ZXN0Qm90dG9tVmlzaWJsZU1lc3NhZ2VSZWFkKTtcblxuICAgIHRoaXMuZGVsYXllZFBlZWtUaW1lb3V0ID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBjb25zdCB7IGlkLCBwZWVrR3JvdXBDYWxsRm9yVGhlRmlyc3RUaW1lIH0gPSB0aGlzLnByb3BzO1xuICAgICAgdGhpcy5kZWxheWVkUGVla1RpbWVvdXQgPSB1bmRlZmluZWQ7XG4gICAgICBwZWVrR3JvdXBDYWxsRm9yVGhlRmlyc3RUaW1lKGlkKTtcbiAgICB9LCA1MDApO1xuXG4gICAgdGhpcy5wZWVrSW50ZXJ2YWwgPSBzZXRJbnRlcnZhbCgoKSA9PiB7XG4gICAgICBjb25zdCB7IGlkLCBwZWVrR3JvdXBDYWxsSWZJdEhhc01lbWJlcnMgfSA9IHRoaXMucHJvcHM7XG4gICAgICBwZWVrR3JvdXBDYWxsSWZJdEhhc01lbWJlcnMoaWQpO1xuICAgIH0sIE1JTlVURSk7XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgY29tcG9uZW50V2lsbFVubW91bnQoKTogdm9pZCB7XG4gICAgY29uc3QgeyBkZWxheWVkUGVla1RpbWVvdXQsIHBlZWtJbnRlcnZhbCB9ID0gdGhpcztcblxuICAgIHdpbmRvdy51bnJlZ2lzdGVyRm9yQWN0aXZlKHRoaXMubWFya05ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlUmVhZCk7XG5cbiAgICB0aGlzLmludGVyc2VjdGlvbk9ic2VydmVyPy5kaXNjb25uZWN0KCk7XG5cbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeShkZWxheWVkUGVla1RpbWVvdXQpO1xuICAgIGlmIChwZWVrSW50ZXJ2YWwpIHtcbiAgICAgIGNsZWFySW50ZXJ2YWwocGVla0ludGVydmFsKTtcbiAgICB9XG4gIH1cblxuICBwdWJsaWMgb3ZlcnJpZGUgZ2V0U25hcHNob3RCZWZvcmVVcGRhdGUoXG4gICAgcHJldlByb3BzOiBSZWFkb25seTxQcm9wc1R5cGU+XG4gICk6IFNuYXBzaG90VHlwZSB7XG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGlmICghY29udGFpbmVyRWwpIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IHsgcHJvcHMgfSA9IHRoaXM7XG4gICAgY29uc3QgeyBzY3JvbGxUb0luZGV4IH0gPSBwcm9wcztcblxuICAgIGNvbnN0IHNjcm9sbEFuY2hvciA9IGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShcbiAgICAgIHByZXZQcm9wcyxcbiAgICAgIHByb3BzLFxuICAgICAgdGhpcy5pc0F0Qm90dG9tKClcbiAgICApO1xuXG4gICAgc3dpdGNoIChzY3JvbGxBbmNob3IpIHtcbiAgICAgIGNhc2UgU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmc6XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgY2FzZSBTY3JvbGxBbmNob3IuU2Nyb2xsVG9Cb3R0b206XG4gICAgICAgIHJldHVybiB7IHNjcm9sbEJvdHRvbTogMCB9O1xuICAgICAgY2FzZSBTY3JvbGxBbmNob3IuU2Nyb2xsVG9JbmRleDpcbiAgICAgICAgaWYgKHNjcm9sbFRvSW5kZXggPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIGFzc2VydChcbiAgICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgICAgJzxUaW1lbGluZT4gZ290IFwic2Nyb2xsIHRvIGluZGV4XCIgc2Nyb2xsIGFuY2hvciwgYnV0IG5vIGluZGV4J1xuICAgICAgICAgICk7XG4gICAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHsgc2Nyb2xsVG9JbmRleCB9O1xuICAgICAgY2FzZSBTY3JvbGxBbmNob3IuU2Nyb2xsVG9VbnJlYWRJbmRpY2F0b3I6XG4gICAgICAgIHJldHVybiBzY3JvbGxUb1VucmVhZEluZGljYXRvcjtcbiAgICAgIGNhc2UgU2Nyb2xsQW5jaG9yLlRvcDpcbiAgICAgICAgcmV0dXJuIHsgc2Nyb2xsVG9wOiBjb250YWluZXJFbC5zY3JvbGxUb3AgfTtcbiAgICAgIGNhc2UgU2Nyb2xsQW5jaG9yLkJvdHRvbTpcbiAgICAgICAgcmV0dXJuIHsgc2Nyb2xsQm90dG9tOiBnZXRTY3JvbGxCb3R0b20oY29udGFpbmVyRWwpIH07XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHNjcm9sbEFuY2hvcik7XG4gICAgfVxuICB9XG5cbiAgcHVibGljIG92ZXJyaWRlIGNvbXBvbmVudERpZFVwZGF0ZShcbiAgICBwcmV2UHJvcHM6IFJlYWRvbmx5PFByb3BzVHlwZT4sXG4gICAgX3ByZXZTdGF0ZTogUmVhZG9ubHk8U3RhdGVUeXBlPixcbiAgICBzbmFwc2hvdDogUmVhZG9ubHk8U25hcHNob3RUeXBlPlxuICApOiB2b2lkIHtcbiAgICBjb25zdCB7XG4gICAgICBpdGVtczogb2xkSXRlbXMsXG4gICAgICBtZXNzYWdlQ2hhbmdlQ291bnRlcjogcHJldmlvdXNNZXNzYWdlQ2hhbmdlQ291bnRlcixcbiAgICAgIG1lc3NhZ2VMb2FkaW5nU3RhdGU6IHByZXZpb3VzTWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgICB9ID0gcHJldlByb3BzO1xuICAgIGNvbnN0IHtcbiAgICAgIGRpc2NhcmRNZXNzYWdlcyxcbiAgICAgIGlkLFxuICAgICAgaXRlbXM6IG5ld0l0ZW1zLFxuICAgICAgbWVzc2FnZUNoYW5nZUNvdW50ZXIsXG4gICAgICBtZXNzYWdlTG9hZGluZ1N0YXRlLFxuICAgIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgY29udGFpbmVyRWwgPSB0aGlzLmNvbnRhaW5lclJlZi5jdXJyZW50O1xuICAgIGlmIChjb250YWluZXJFbCAmJiBzbmFwc2hvdCkge1xuICAgICAgaWYgKHNuYXBzaG90ID09PSBzY3JvbGxUb1VucmVhZEluZGljYXRvcikge1xuICAgICAgICBjb25zdCBsYXN0U2VlbkluZGljYXRvckVsID0gdGhpcy5sYXN0U2VlbkluZGljYXRvclJlZi5jdXJyZW50O1xuICAgICAgICBpZiAobGFzdFNlZW5JbmRpY2F0b3JFbCkge1xuICAgICAgICAgIGxhc3RTZWVuSW5kaWNhdG9yRWwuc2Nyb2xsSW50b1ZpZXcoKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBzY3JvbGxUb0JvdHRvbShjb250YWluZXJFbCk7XG4gICAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgICAgZmFsc2UsXG4gICAgICAgICAgICAnPFRpbWVsaW5lPiBleHBlY3RlZCBhIGxhc3Qgc2VlbiBpbmRpY2F0b3IgYnV0IGl0IHdhcyBub3QgZm91bmQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgfSBlbHNlIGlmICgnc2Nyb2xsVG9JbmRleCcgaW4gc25hcHNob3QpIHtcbiAgICAgICAgdGhpcy5zY3JvbGxUb0l0ZW1JbmRleChzbmFwc2hvdC5zY3JvbGxUb0luZGV4KTtcbiAgICAgIH0gZWxzZSBpZiAoJ3Njcm9sbFRvcCcgaW4gc25hcHNob3QpIHtcbiAgICAgICAgY29udGFpbmVyRWwuc2Nyb2xsVG9wID0gc25hcHNob3Quc2Nyb2xsVG9wO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgc2V0U2Nyb2xsQm90dG9tKGNvbnRhaW5lckVsLCBzbmFwc2hvdC5zY3JvbGxCb3R0b20pO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmIChvbGRJdGVtcy5sZW5ndGggIT09IG5ld0l0ZW1zLmxlbmd0aCkge1xuICAgICAgdGhpcy51cGRhdGVJbnRlcnNlY3Rpb25PYnNlcnZlcigpO1xuXG4gICAgICAvLyBUaGlzIGNvbmRpdGlvbiBpcyBzb21ld2hhdCBhcmJpdHJhcnkuXG4gICAgICBjb25zdCBudW1iZXJUb0tlZXBBdEJvdHRvbSA9IHRoaXMubWF4VmlzaWJsZVJvd3MgKiAyO1xuICAgICAgY29uc3Qgc2hvdWxkRGlzY2FyZE9sZGVyTWVzc2FnZXM6IGJvb2xlYW4gPVxuICAgICAgICB0aGlzLmlzQXRCb3R0b20oKSAmJiBuZXdJdGVtcy5sZW5ndGggPiBudW1iZXJUb0tlZXBBdEJvdHRvbTtcbiAgICAgIGlmIChzaG91bGREaXNjYXJkT2xkZXJNZXNzYWdlcykge1xuICAgICAgICBkaXNjYXJkTWVzc2FnZXMoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBpZCxcbiAgICAgICAgICBudW1iZXJUb0tlZXBBdEJvdHRvbSxcbiAgICAgICAgfSk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxvYWRpbmdTdGF0ZVRoYXRKdXN0RmluaXNoZWQ6XG4gICAgICAgIHwgdW5kZWZpbmVkXG4gICAgICAgIHwgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlID1cbiAgICAgICAgIW1lc3NhZ2VMb2FkaW5nU3RhdGUgJiYgcHJldmlvdXNNZXNzYWdlTG9hZGluZ1N0YXRlXG4gICAgICAgICAgPyBwcmV2aW91c01lc3NhZ2VMb2FkaW5nU3RhdGVcbiAgICAgICAgICA6IHVuZGVmaW5lZDtcbiAgICAgIGNvbnN0IG51bWJlclRvS2VlcEF0VG9wID0gdGhpcy5tYXhWaXNpYmxlUm93cyAqIDU7XG4gICAgICBjb25zdCBzaG91bGREaXNjYXJkTmV3ZXJNZXNzYWdlczogYm9vbGVhbiA9XG4gICAgICAgICF0aGlzLmlzQXRCb3R0b20oKSAmJlxuICAgICAgICBsb2FkaW5nU3RhdGVUaGF0SnVzdEZpbmlzaGVkID09PVxuICAgICAgICAgIFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZS5Mb2FkaW5nT2xkZXJNZXNzYWdlcyAmJlxuICAgICAgICBuZXdJdGVtcy5sZW5ndGggPiBudW1iZXJUb0tlZXBBdFRvcDtcblxuICAgICAgaWYgKHNob3VsZERpc2NhcmROZXdlck1lc3NhZ2VzKSB7XG4gICAgICAgIGRpc2NhcmRNZXNzYWdlcyh7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGlkLFxuICAgICAgICAgIG51bWJlclRvS2VlcEF0VG9wLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gICAgaWYgKHByZXZpb3VzTWVzc2FnZUNoYW5nZUNvdW50ZXIgIT09IG1lc3NhZ2VDaGFuZ2VDb3VudGVyKSB7XG4gICAgICB0aGlzLm1hcmtOZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZVJlYWQoKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUJsdXIgPSAoZXZlbnQ6IFJlYWN0LkZvY3VzRXZlbnQpOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IGNsZWFyU2VsZWN0ZWRNZXNzYWdlIH0gPSB0aGlzLnByb3BzO1xuXG4gICAgY29uc3QgeyBjdXJyZW50VGFyZ2V0IH0gPSBldmVudDtcblxuICAgIC8vIFRoYW5rcyB0byBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wc3RvaWNhLzQzMjNkM2U2ZTM3ZThhMjNkZDU5XG4gICAgc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICAvLyBJZiBmb2N1cyBtb3ZlZCB0byBvbmUgb2Ygb3VyIHBvcnRhbHMsIHdlIGRvIG5vdCBjbGVhciB0aGUgc2VsZWN0ZWRcbiAgICAgIC8vIG1lc3NhZ2Ugc28gdGhhdCBmb2N1cyBzdGF5cyBpbnNpZGUgdGhlIHBvcnRhbC4gV2UgbmVlZCB0byBiZSBjYXJlZnVsXG4gICAgICAvLyB0byBub3QgY3JlYXRlIGNvbGxpZGluZyBrZXlib2FyZCBzaG9ydGN1dHMgYmV0d2VlbiBzZWxlY3RlZCBtZXNzYWdlc1xuICAgICAgLy8gYW5kIG91ciBwb3J0YWxzIVxuICAgICAgY29uc3QgcG9ydGFscyA9IEFycmF5LmZyb20oXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2JvZHkgPiBkaXY6bm90KC5pbmJveCknKVxuICAgICAgKTtcbiAgICAgIGlmIChwb3J0YWxzLnNvbWUoZWwgPT4gZWwuY29udGFpbnMoZG9jdW1lbnQuYWN0aXZlRWxlbWVudCkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgaWYgKCFjdXJyZW50VGFyZ2V0LmNvbnRhaW5zKGRvY3VtZW50LmFjdGl2ZUVsZW1lbnQpKSB7XG4gICAgICAgIGNsZWFyU2VsZWN0ZWRNZXNzYWdlKCk7XG4gICAgICB9XG4gICAgfSwgMCk7XG4gIH07XG5cbiAgcHJpdmF0ZSBoYW5kbGVLZXlEb3duID0gKFxuICAgIGV2ZW50OiBSZWFjdC5LZXlib2FyZEV2ZW50PEhUTUxEaXZFbGVtZW50PlxuICApOiB2b2lkID0+IHtcbiAgICBjb25zdCB7IHNlbGVjdE1lc3NhZ2UsIHNlbGVjdGVkTWVzc2FnZUlkLCBpdGVtcywgaWQgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3QgY29tbWFuZEtleSA9IGdldCh3aW5kb3csICdwbGF0Zm9ybScpID09PSAnZGFyd2luJyAmJiBldmVudC5tZXRhS2V5O1xuICAgIGNvbnN0IGNvbnRyb2xLZXkgPSBnZXQod2luZG93LCAncGxhdGZvcm0nKSAhPT0gJ2RhcndpbicgJiYgZXZlbnQuY3RybEtleTtcbiAgICBjb25zdCBjb21tYW5kT3JDdHJsID0gY29tbWFuZEtleSB8fCBjb250cm9sS2V5O1xuXG4gICAgaWYgKCFpdGVtcyB8fCBpdGVtcy5sZW5ndGggPCAxKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKHNlbGVjdGVkTWVzc2FnZUlkICYmICFjb21tYW5kT3JDdHJsICYmIGV2ZW50LmtleSA9PT0gJ0Fycm93VXAnKSB7XG4gICAgICBjb25zdCBzZWxlY3RlZE1lc3NhZ2VJbmRleCA9IGl0ZW1zLmZpbmRJbmRleChcbiAgICAgICAgaXRlbSA9PiBpdGVtID09PSBzZWxlY3RlZE1lc3NhZ2VJZFxuICAgICAgKTtcbiAgICAgIGlmIChzZWxlY3RlZE1lc3NhZ2VJbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCB0YXJnZXRJbmRleCA9IHNlbGVjdGVkTWVzc2FnZUluZGV4IC0gMTtcbiAgICAgIGlmICh0YXJnZXRJbmRleCA8IDApIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBtZXNzYWdlSWQgPSBpdGVtc1t0YXJnZXRJbmRleF07XG4gICAgICBzZWxlY3RNZXNzYWdlKG1lc3NhZ2VJZCwgaWQpO1xuXG4gICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoc2VsZWN0ZWRNZXNzYWdlSWQgJiYgIWNvbW1hbmRPckN0cmwgJiYgZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgY29uc3Qgc2VsZWN0ZWRNZXNzYWdlSW5kZXggPSBpdGVtcy5maW5kSW5kZXgoXG4gICAgICAgIGl0ZW0gPT4gaXRlbSA9PT0gc2VsZWN0ZWRNZXNzYWdlSWRcbiAgICAgICk7XG4gICAgICBpZiAoc2VsZWN0ZWRNZXNzYWdlSW5kZXggPCAwKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgdGFyZ2V0SW5kZXggPSBzZWxlY3RlZE1lc3NhZ2VJbmRleCArIDE7XG4gICAgICBpZiAodGFyZ2V0SW5kZXggPj0gaXRlbXMubGVuZ3RoKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgbWVzc2FnZUlkID0gaXRlbXNbdGFyZ2V0SW5kZXhdO1xuICAgICAgc2VsZWN0TWVzc2FnZShtZXNzYWdlSWQsIGlkKTtcblxuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuXG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbW1hbmRPckN0cmwgJiYgZXZlbnQua2V5ID09PSAnQXJyb3dVcCcpIHtcbiAgICAgIGNvbnN0IGZpcnN0TWVzc2FnZUlkID0gZmlyc3QoaXRlbXMpO1xuICAgICAgaWYgKGZpcnN0TWVzc2FnZUlkKSB7XG4gICAgICAgIHNlbGVjdE1lc3NhZ2UoZmlyc3RNZXNzYWdlSWQsIGlkKTtcbiAgICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKCk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNvbW1hbmRPckN0cmwgJiYgZXZlbnQua2V5ID09PSAnQXJyb3dEb3duJykge1xuICAgICAgdGhpcy5zY3JvbGxEb3duKHRydWUpO1xuICAgICAgZXZlbnQucHJldmVudERlZmF1bHQoKTtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpO1xuICAgIH1cbiAgfTtcblxuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qge1xuICAgICAgYWNrbm93bGVkZ2VHcm91cE1lbWJlck5hbWVDb2xsaXNpb25zLFxuICAgICAgY2xlYXJJbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cCxcbiAgICAgIGNsb3NlQ29udGFjdFNwb29maW5nUmV2aWV3LFxuICAgICAgY29udGFjdFNwb29maW5nUmV2aWV3LFxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICBnZXRUaW1lc3RhbXBGb3JNZXNzYWdlLFxuICAgICAgaGF2ZU5ld2VzdCxcbiAgICAgIGhhdmVPbGRlc3QsXG4gICAgICBpMThuLFxuICAgICAgaWQsXG4gICAgICBpbnZpdGVkQ29udGFjdHNGb3JOZXdseUNyZWF0ZWRHcm91cCxcbiAgICAgIGlzQ29udmVyc2F0aW9uU2VsZWN0ZWQsXG4gICAgICBpc0dyb3VwVjFBbmREaXNhYmxlZCxcbiAgICAgIGlzU29tZW9uZVR5cGluZyxcbiAgICAgIGl0ZW1zLFxuICAgICAgbWVzc2FnZUxvYWRpbmdTdGF0ZSxcbiAgICAgIG9sZGVzdFVuc2VlbkluZGV4LFxuICAgICAgb25CbG9jayxcbiAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtLFxuICAgICAgb25EZWxldGUsXG4gICAgICBvblVuYmxvY2ssXG4gICAgICByZW1vdmVNZW1iZXIsXG4gICAgICByZW5kZXJIZXJvUm93LFxuICAgICAgcmVuZGVySXRlbSxcbiAgICAgIHJlbmRlclR5cGluZ0J1YmJsZSxcbiAgICAgIHJlbmRlckNvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZyxcbiAgICAgIHJldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbixcbiAgICAgIHJldmlld01lc3NhZ2VSZXF1ZXN0TmFtZUNvbGxpc2lvbixcbiAgICAgIHNob3dDb250YWN0TW9kYWwsXG4gICAgICB0aGVtZSxcbiAgICAgIHRvdGFsVW5zZWVuLFxuICAgICAgdW5ibHVyQXZhdGFyLFxuICAgICAgdW5yZWFkQ291bnQsXG4gICAgICB1cGRhdGVTaGFyZWRHcm91cHMsXG4gICAgfSA9IHRoaXMucHJvcHM7XG4gICAgY29uc3Qge1xuICAgICAgaGFzUmVjZW50bHlTY3JvbGxlZCxcbiAgICAgIGxhc3RNZWFzdXJlZFdhcm5pbmdIZWlnaHQsXG4gICAgICBuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkLFxuICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCxcbiAgICAgIHdpZHRoQnJlYWtwb2ludCxcbiAgICB9ID0gdGhpcy5zdGF0ZTtcblxuICAgIC8vIEFzIGEgcGVyZm9ybWFuY2Ugb3B0aW1pemF0aW9uLCB3ZSBkb24ndCBuZWVkIHRvIHJlbmRlciBhbnl0aGluZyBpZiB0aGlzXG4gICAgLy8gICBjb252ZXJzYXRpb24gaXNuJ3QgdGhlIGFjdGl2ZSBvbmUuXG4gICAgaWYgKCFpc0NvbnZlcnNhdGlvblNlbGVjdGVkKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBhcmVUaGVyZUFueU1lc3NhZ2VzID0gaXRlbXMubGVuZ3RoID4gMDtcbiAgICBjb25zdCBhcmVBbnlNZXNzYWdlc1VucmVhZCA9IEJvb2xlYW4odW5yZWFkQ291bnQpO1xuICAgIGNvbnN0IGFyZUFueU1lc3NhZ2VzQmVsb3dDdXJyZW50UG9zaXRpb24gPVxuICAgICAgIWhhdmVOZXdlc3QgfHxcbiAgICAgIEJvb2xlYW4oXG4gICAgICAgIG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQgJiZcbiAgICAgICAgICBuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkICE9PSBsYXN0KGl0ZW1zKVxuICAgICAgKTtcbiAgICBjb25zdCBhcmVTb21lTWVzc2FnZXNCZWxvd0N1cnJlbnRQb3NpdGlvbiA9XG4gICAgICAhaGF2ZU5ld2VzdCB8fFxuICAgICAgKG5ld2VzdEJvdHRvbVZpc2libGVNZXNzYWdlSWQgJiZcbiAgICAgICAgIWl0ZW1zXG4gICAgICAgICAgLnNsaWNlKC1TQ1JPTExfRE9XTl9CVVRUT05fVEhSRVNIT0xEKVxuICAgICAgICAgIC5pbmNsdWRlcyhuZXdlc3RCb3R0b21WaXNpYmxlTWVzc2FnZUlkKSk7XG5cbiAgICBjb25zdCBhcmVVbnJlYWRCZWxvd0N1cnJlbnRQb3NpdGlvbiA9IEJvb2xlYW4oXG4gICAgICBhcmVUaGVyZUFueU1lc3NhZ2VzICYmXG4gICAgICAgIGFyZUFueU1lc3NhZ2VzVW5yZWFkICYmXG4gICAgICAgIGFyZUFueU1lc3NhZ2VzQmVsb3dDdXJyZW50UG9zaXRpb25cbiAgICApO1xuICAgIGNvbnN0IHNob3VsZFNob3dTY3JvbGxEb3duQnV0dG9uID0gQm9vbGVhbihcbiAgICAgIGFyZVRoZXJlQW55TWVzc2FnZXMgJiZcbiAgICAgICAgKGFyZVVucmVhZEJlbG93Q3VycmVudFBvc2l0aW9uIHx8IGFyZVNvbWVNZXNzYWdlc0JlbG93Q3VycmVudFBvc2l0aW9uKVxuICAgICk7XG5cbiAgICBjb25zdCBhY3Rpb25Qcm9wcyA9IGdldEFjdGlvbnModGhpcy5wcm9wcyk7XG5cbiAgICBsZXQgZmxvYXRpbmdIZWFkZXI6IFJlYWN0Tm9kZTtcbiAgICAvLyBJdCdzIHBvc3NpYmxlIHRoYXQgYSBtZXNzYWdlIHdhcyByZW1vdmVkIGZyb20gYGl0ZW1zYCBidXQgd2Ugc3RpbGwgaGF2ZSBpdHMgSUQgaW5cbiAgICAvLyAgIHN0YXRlLiBgZ2V0VGltZXN0YW1wRm9yTWVzc2FnZWAgbWlnaHQgcmV0dXJuIHVuZGVmaW5lZCBpbiB0aGF0IGNhc2UuXG4gICAgY29uc3Qgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VUaW1lc3RhbXAgPVxuICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZFxuICAgICAgICA/IGdldFRpbWVzdGFtcEZvck1lc3NhZ2Uob2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZClcbiAgICAgICAgOiB1bmRlZmluZWQ7XG4gICAgaWYgKFxuICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCAmJlxuICAgICAgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VUaW1lc3RhbXBcbiAgICApIHtcbiAgICAgIGNvbnN0IGlzTG9hZGluZ01lc3NhZ2VzID0gQm9vbGVhbihtZXNzYWdlTG9hZGluZ1N0YXRlKTtcbiAgICAgIGZsb2F0aW5nSGVhZGVyID0gKFxuICAgICAgICA8VGltZWxpbmVGbG9hdGluZ0hlYWRlclxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNMb2FkaW5nPXtpc0xvYWRpbmdNZXNzYWdlc31cbiAgICAgICAgICBzdHlsZT17XG4gICAgICAgICAgICBsYXN0TWVhc3VyZWRXYXJuaW5nSGVpZ2h0XG4gICAgICAgICAgICAgID8geyBtYXJnaW5Ub3A6IGxhc3RNZWFzdXJlZFdhcm5pbmdIZWlnaHQgfVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZFxuICAgICAgICAgIH1cbiAgICAgICAgICB0aW1lc3RhbXA9e29sZGVzdFBhcnRpYWxseVZpc2libGVNZXNzYWdlVGltZXN0YW1wfVxuICAgICAgICAgIHZpc2libGU9e1xuICAgICAgICAgICAgKGhhc1JlY2VudGx5U2Nyb2xsZWQgfHwgaXNMb2FkaW5nTWVzc2FnZXMpICYmXG4gICAgICAgICAgICAoIWhhdmVPbGRlc3QgfHwgb2xkZXN0UGFydGlhbGx5VmlzaWJsZU1lc3NhZ2VJZCAhPT0gaXRlbXNbMF0pXG4gICAgICAgICAgfVxuICAgICAgICAvPlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCBtZXNzYWdlTm9kZXM6IEFycmF5PFJlYWN0Q2hpbGQ+ID0gW107XG4gICAgZm9yIChsZXQgaXRlbUluZGV4ID0gMDsgaXRlbUluZGV4IDwgaXRlbXMubGVuZ3RoOyBpdGVtSW5kZXggKz0gMSkge1xuICAgICAgY29uc3QgcHJldmlvdXNJdGVtSW5kZXggPSBpdGVtSW5kZXggLSAxO1xuICAgICAgY29uc3QgbmV4dEl0ZW1JbmRleCA9IGl0ZW1JbmRleCArIDE7XG5cbiAgICAgIGNvbnN0IHByZXZpb3VzTWVzc2FnZUlkOiB1bmRlZmluZWQgfCBzdHJpbmcgPSBpdGVtc1twcmV2aW91c0l0ZW1JbmRleF07XG4gICAgICBjb25zdCBuZXh0TWVzc2FnZUlkOiB1bmRlZmluZWQgfCBzdHJpbmcgPSBpdGVtc1tuZXh0SXRlbUluZGV4XTtcbiAgICAgIGNvbnN0IG1lc3NhZ2VJZCA9IGl0ZW1zW2l0ZW1JbmRleF07XG5cbiAgICAgIGlmICghbWVzc2FnZUlkKSB7XG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICBmYWxzZSxcbiAgICAgICAgICAnPFRpbWVsaW5lPiBpdGVyYXRlZCB0aHJvdWdoIGl0ZW1zIGFuZCBnb3QgYW4gZW1wdHkgbWVzc2FnZSBJRCdcbiAgICAgICAgKTtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG5cbiAgICAgIGxldCB1bnJlYWRJbmRpY2F0b3JQbGFjZW1lbnQ6IHVuZGVmaW5lZCB8IFVucmVhZEluZGljYXRvclBsYWNlbWVudDtcbiAgICAgIGlmIChvbGRlc3RVbnNlZW5JbmRleCA9PT0gaXRlbUluZGV4KSB7XG4gICAgICAgIHVucmVhZEluZGljYXRvclBsYWNlbWVudCA9IFVucmVhZEluZGljYXRvclBsYWNlbWVudC5KdXN0QWJvdmU7XG4gICAgICAgIG1lc3NhZ2VOb2Rlcy5wdXNoKFxuICAgICAgICAgIDxMYXN0U2VlbkluZGljYXRvclxuICAgICAgICAgICAga2V5PVwibGFzdCBzZWVuIGluZGljYXRvclwiXG4gICAgICAgICAgICBjb3VudD17dG90YWxVbnNlZW59XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgcmVmPXt0aGlzLmxhc3RTZWVuSW5kaWNhdG9yUmVmfVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKG9sZGVzdFVuc2VlbkluZGV4ID09PSBuZXh0SXRlbUluZGV4KSB7XG4gICAgICAgIHVucmVhZEluZGljYXRvclBsYWNlbWVudCA9IFVucmVhZEluZGljYXRvclBsYWNlbWVudC5KdXN0QmVsb3c7XG4gICAgICB9XG5cbiAgICAgIG1lc3NhZ2VOb2Rlcy5wdXNoKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAga2V5PXttZXNzYWdlSWR9XG4gICAgICAgICAgZGF0YS1pdGVtLWluZGV4PXtpdGVtSW5kZXh9XG4gICAgICAgICAgZGF0YS1tZXNzYWdlLWlkPXttZXNzYWdlSWR9XG4gICAgICAgID5cbiAgICAgICAgICA8RXJyb3JCb3VuZGFyeSBpMThuPXtpMThufSBzaG93RGVidWdMb2c9e3Nob3dEZWJ1Z0xvZ30+XG4gICAgICAgICAgICB7cmVuZGVySXRlbSh7XG4gICAgICAgICAgICAgIGFjdGlvblByb3BzLFxuICAgICAgICAgICAgICBjb250YWluZXJFbGVtZW50UmVmOiB0aGlzLmNvbnRhaW5lclJlZixcbiAgICAgICAgICAgICAgY29udGFpbmVyV2lkdGhCcmVha3BvaW50OiB3aWR0aEJyZWFrcG9pbnQsXG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBpZCxcbiAgICAgICAgICAgICAgaXNPbGRlc3RUaW1lbGluZUl0ZW06IGhhdmVPbGRlc3QgJiYgaXRlbUluZGV4ID09PSAwLFxuICAgICAgICAgICAgICBtZXNzYWdlSWQsXG4gICAgICAgICAgICAgIG5leHRNZXNzYWdlSWQsXG4gICAgICAgICAgICAgIHByZXZpb3VzTWVzc2FnZUlkLFxuICAgICAgICAgICAgICB1bnJlYWRJbmRpY2F0b3JQbGFjZW1lbnQsXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L0Vycm9yQm91bmRhcnk+XG4gICAgICAgIDwvZGl2PlxuICAgICAgKTtcbiAgICB9XG5cbiAgICBjb25zdCB3YXJuaW5nID0gVGltZWxpbmUuZ2V0V2FybmluZyh0aGlzLnByb3BzLCB0aGlzLnN0YXRlKTtcbiAgICBsZXQgdGltZWxpbmVXYXJuaW5nOiBSZWFjdE5vZGU7XG4gICAgaWYgKHdhcm5pbmcpIHtcbiAgICAgIGxldCB0ZXh0OiBSZWFjdENoaWxkO1xuICAgICAgbGV0IG9uQ2xvc2U6ICgpID0+IHZvaWQ7XG4gICAgICBzd2l0Y2ggKHdhcm5pbmcudHlwZSkge1xuICAgICAgICBjYXNlIENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZTpcbiAgICAgICAgICB0ZXh0ID0gKFxuICAgICAgICAgICAgPEludGxcbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaWQ9XCJDb250YWN0U3Bvb2ZpbmdfX3NhbWUtbmFtZVwiXG4gICAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgICBsaW5rOiAoXG4gICAgICAgICAgICAgICAgICA8VGltZWxpbmVXYXJuaW5nLkxpbmtcbiAgICAgICAgICAgICAgICAgICAgb25DbGljaz17KCkgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgIHJldmlld01lc3NhZ2VSZXF1ZXN0TmFtZUNvbGxpc2lvbih7XG4gICAgICAgICAgICAgICAgICAgICAgICBzYWZlQ29udmVyc2F0aW9uSWQ6IHdhcm5pbmcuc2FmZUNvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2kxOG4oJ0NvbnRhY3RTcG9vZmluZ19fc2FtZS1uYW1lX19saW5rJyl9XG4gICAgICAgICAgICAgICAgICA8L1RpbWVsaW5lV2FybmluZy5MaW5rPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoe1xuICAgICAgICAgICAgICBoYXNEaXNtaXNzZWREaXJlY3RDb250YWN0U3Bvb2ZpbmdXYXJuaW5nOiB0cnVlLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgfTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBDb250YWN0U3Bvb2ZpbmdUeXBlLk11bHRpcGxlR3JvdXBNZW1iZXJzV2l0aFNhbWVUaXRsZToge1xuICAgICAgICAgIGNvbnN0IHsgZ3JvdXBOYW1lQ29sbGlzaW9ucyB9ID0gd2FybmluZztcbiAgICAgICAgICB0ZXh0ID0gKFxuICAgICAgICAgICAgPEludGxcbiAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgaWQ9XCJDb250YWN0U3Bvb2ZpbmdfX3NhbWUtbmFtZS1pbi1ncm91cFwiXG4gICAgICAgICAgICAgIGNvbXBvbmVudHM9e3tcbiAgICAgICAgICAgICAgICBjb3VudDogT2JqZWN0LnZhbHVlcyhncm91cE5hbWVDb2xsaXNpb25zKVxuICAgICAgICAgICAgICAgICAgLnJlZHVjZShcbiAgICAgICAgICAgICAgICAgICAgKHJlc3VsdCwgY29udmVyc2F0aW9ucykgPT4gcmVzdWx0ICsgY29udmVyc2F0aW9ucy5sZW5ndGgsXG4gICAgICAgICAgICAgICAgICAgIDBcbiAgICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICAgIC50b1N0cmluZygpLFxuICAgICAgICAgICAgICAgIGxpbms6IChcbiAgICAgICAgICAgICAgICAgIDxUaW1lbGluZVdhcm5pbmcuTGlua1xuICAgICAgICAgICAgICAgICAgICBvbkNsaWNrPXsoKSA9PiB7XG4gICAgICAgICAgICAgICAgICAgICAgcmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uKGlkKTtcbiAgICAgICAgICAgICAgICAgICAgfX1cbiAgICAgICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICAgICAge2kxOG4oJ0NvbnRhY3RTcG9vZmluZ19fc2FtZS1uYW1lLWluLWdyb3VwX19saW5rJyl9XG4gICAgICAgICAgICAgICAgICA8L1RpbWVsaW5lV2FybmluZy5MaW5rPlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgIH19XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICk7XG4gICAgICAgICAgb25DbG9zZSA9ICgpID0+IHtcbiAgICAgICAgICAgIGFja25vd2xlZGdlR3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9ucyhncm91cE5hbWVDb2xsaXNpb25zKTtcbiAgICAgICAgICB9O1xuICAgICAgICAgIGJyZWFrO1xuICAgICAgICB9XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih3YXJuaW5nKTtcbiAgICAgIH1cblxuICAgICAgdGltZWxpbmVXYXJuaW5nID0gKFxuICAgICAgICA8TWVhc3VyZVxuICAgICAgICAgIGJvdW5kc1xuICAgICAgICAgIG9uUmVzaXplPXsoeyBib3VuZHMgfSkgPT4ge1xuICAgICAgICAgICAgaWYgKCFib3VuZHMpIHtcbiAgICAgICAgICAgICAgYXNzZXJ0KGZhbHNlLCAnV2Ugc2hvdWxkIGJlIG1lYXN1cmluZyB0aGUgYm91bmRzJyk7XG4gICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHRoaXMuc2V0U3RhdGUoeyBsYXN0TWVhc3VyZWRXYXJuaW5nSGVpZ2h0OiBib3VuZHMuaGVpZ2h0IH0pO1xuICAgICAgICAgIH19XG4gICAgICAgID5cbiAgICAgICAgICB7KHsgbWVhc3VyZVJlZiB9KSA9PiAoXG4gICAgICAgICAgICA8VGltZWxpbmVXYXJuaW5ncyByZWY9e21lYXN1cmVSZWZ9PlxuICAgICAgICAgICAgICA8VGltZWxpbmVXYXJuaW5nIGkxOG49e2kxOG59IG9uQ2xvc2U9e29uQ2xvc2V9PlxuICAgICAgICAgICAgICAgIDxUaW1lbGluZVdhcm5pbmcuSWNvbkNvbnRhaW5lcj5cbiAgICAgICAgICAgICAgICAgIDxUaW1lbGluZVdhcm5pbmcuR2VuZXJpY0ljb24gLz5cbiAgICAgICAgICAgICAgICA8L1RpbWVsaW5lV2FybmluZy5JY29uQ29udGFpbmVyPlxuICAgICAgICAgICAgICAgIDxUaW1lbGluZVdhcm5pbmcuVGV4dD57dGV4dH08L1RpbWVsaW5lV2FybmluZy5UZXh0PlxuICAgICAgICAgICAgICA8L1RpbWVsaW5lV2FybmluZz5cbiAgICAgICAgICAgIDwvVGltZWxpbmVXYXJuaW5ncz5cbiAgICAgICAgICApfVxuICAgICAgICA8L01lYXN1cmU+XG4gICAgICApO1xuICAgIH1cblxuICAgIGxldCBjb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2c6IFJlYWN0Tm9kZTtcbiAgICBpZiAoY29udGFjdFNwb29maW5nUmV2aWV3KSB7XG4gICAgICBjb25zdCBjb21tb25Qcm9wcyA9IHtcbiAgICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICAgIGkxOG4sXG4gICAgICAgIG9uQmxvY2ssXG4gICAgICAgIG9uQmxvY2tBbmRSZXBvcnRTcGFtLFxuICAgICAgICBvbkNsb3NlOiBjbG9zZUNvbnRhY3RTcG9vZmluZ1JldmlldyxcbiAgICAgICAgb25EZWxldGUsXG4gICAgICAgIG9uU2hvd0NvbnRhY3RNb2RhbDogc2hvd0NvbnRhY3RNb2RhbCxcbiAgICAgICAgb25VbmJsb2NrLFxuICAgICAgICByZW1vdmVNZW1iZXIsXG4gICAgICAgIHRoZW1lLFxuICAgICAgfTtcblxuICAgICAgc3dpdGNoIChjb250YWN0U3Bvb2ZpbmdSZXZpZXcudHlwZSkge1xuICAgICAgICBjYXNlIENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZTpcbiAgICAgICAgICBjb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2cgPSByZW5kZXJDb250YWN0U3Bvb2ZpbmdSZXZpZXdEaWFsb2coe1xuICAgICAgICAgICAgLi4uY29tbW9uUHJvcHMsXG4gICAgICAgICAgICB0eXBlOiBDb250YWN0U3Bvb2ZpbmdUeXBlLkRpcmVjdENvbnZlcnNhdGlvbldpdGhTYW1lVGl0bGUsXG4gICAgICAgICAgICBwb3NzaWJseVVuc2FmZUNvbnZlcnNhdGlvbjpcbiAgICAgICAgICAgICAgY29udGFjdFNwb29maW5nUmV2aWV3LnBvc3NpYmx5VW5zYWZlQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgc2FmZUNvbnZlcnNhdGlvbjogY29udGFjdFNwb29maW5nUmV2aWV3LnNhZmVDb252ZXJzYXRpb24sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGU6XG4gICAgICAgICAgY29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nID0gcmVuZGVyQ29udGFjdFNwb29maW5nUmV2aWV3RGlhbG9nKHtcbiAgICAgICAgICAgIC4uLmNvbW1vblByb3BzLFxuICAgICAgICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGUsXG4gICAgICAgICAgICBncm91cENvbnZlcnNhdGlvbklkOiBpZCxcbiAgICAgICAgICAgIGNvbGxpc2lvbkluZm9CeVRpdGxlOiBjb250YWN0U3Bvb2ZpbmdSZXZpZXcuY29sbGlzaW9uSW5mb0J5VGl0bGUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjb250YWN0U3Bvb2ZpbmdSZXZpZXcpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiAoXG4gICAgICA8PlxuICAgICAgICA8TWVhc3VyZVxuICAgICAgICAgIGJvdW5kc1xuICAgICAgICAgIG9uUmVzaXplPXsoeyBib3VuZHMgfSkgPT4ge1xuICAgICAgICAgICAgY29uc3QgeyBpc05lYXJCb3R0b20gfSA9IHRoaXMucHJvcHM7XG5cbiAgICAgICAgICAgIHN0cmljdEFzc2VydChib3VuZHMsICdXZSBzaG91bGQgYmUgbWVhc3VyaW5nIHRoZSBib3VuZHMnKTtcblxuICAgICAgICAgICAgdGhpcy5zZXRTdGF0ZSh7XG4gICAgICAgICAgICAgIHdpZHRoQnJlYWtwb2ludDogZ2V0V2lkdGhCcmVha3BvaW50KGJvdW5kcy53aWR0aCksXG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgdGhpcy5tYXhWaXNpYmxlUm93cyA9IE1hdGguY2VpbChib3VuZHMuaGVpZ2h0IC8gTUlOX1JPV19IRUlHSFQpO1xuXG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJFbCA9IHRoaXMuY29udGFpbmVyUmVmLmN1cnJlbnQ7XG4gICAgICAgICAgICBpZiAoY29udGFpbmVyRWwgJiYgaXNOZWFyQm90dG9tKSB7XG4gICAgICAgICAgICAgIHNjcm9sbFRvQm90dG9tKGNvbnRhaW5lckVsKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9fVxuICAgICAgICA+XG4gICAgICAgICAgeyh7IG1lYXN1cmVSZWYgfSkgPT4gKFxuICAgICAgICAgICAgPGRpdlxuICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgJ21vZHVsZS10aW1lbGluZScsXG4gICAgICAgICAgICAgICAgaXNHcm91cFYxQW5kRGlzYWJsZWQgPyAnbW9kdWxlLXRpbWVsaW5lLS1kaXNhYmxlZCcgOiBudWxsLFxuICAgICAgICAgICAgICAgIGBtb2R1bGUtdGltZWxpbmUtLXdpZHRoLSR7d2lkdGhCcmVha3BvaW50fWBcbiAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgcm9sZT1cInByZXNlbnRhdGlvblwiXG4gICAgICAgICAgICAgIHRhYkluZGV4PXstMX1cbiAgICAgICAgICAgICAgb25CbHVyPXt0aGlzLmhhbmRsZUJsdXJ9XG4gICAgICAgICAgICAgIG9uS2V5RG93bj17dGhpcy5oYW5kbGVLZXlEb3dufVxuICAgICAgICAgICAgICByZWY9e21lYXN1cmVSZWZ9XG4gICAgICAgICAgICA+XG4gICAgICAgICAgICAgIHt0aW1lbGluZVdhcm5pbmd9XG5cbiAgICAgICAgICAgICAge2Zsb2F0aW5nSGVhZGVyfVxuXG4gICAgICAgICAgICAgIDxkaXZcbiAgICAgICAgICAgICAgICBjbGFzc05hbWU9XCJtb2R1bGUtdGltZWxpbmVfX21lc3NhZ2VzX19jb250YWluZXJcIlxuICAgICAgICAgICAgICAgIG9uU2Nyb2xsPXt0aGlzLm9uU2Nyb2xsfVxuICAgICAgICAgICAgICAgIHJlZj17dGhpcy5jb250YWluZXJSZWZ9XG4gICAgICAgICAgICAgID5cbiAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgICAgICAgICAgICdtb2R1bGUtdGltZWxpbmVfX21lc3NhZ2VzJyxcbiAgICAgICAgICAgICAgICAgICAgaGF2ZU5ld2VzdCAmJiAnbW9kdWxlLXRpbWVsaW5lX19tZXNzYWdlcy0taGF2ZS1uZXdlc3QnLFxuICAgICAgICAgICAgICAgICAgICBoYXZlT2xkZXN0ICYmICdtb2R1bGUtdGltZWxpbmVfX21lc3NhZ2VzLS1oYXZlLW9sZGVzdCdcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICByZWY9e3RoaXMubWVzc2FnZXNSZWZ9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge2hhdmVPbGRlc3QgJiYgKFxuICAgICAgICAgICAgICAgICAgICA8PlxuICAgICAgICAgICAgICAgICAgICAgIHtUaW1lbGluZS5nZXRXYXJuaW5nKHRoaXMucHJvcHMsIHRoaXMuc3RhdGUpICYmIChcbiAgICAgICAgICAgICAgICAgICAgICAgIDxkaXYgc3R5bGU9e3sgaGVpZ2h0OiBsYXN0TWVhc3VyZWRXYXJuaW5nSGVpZ2h0IH19IC8+XG4gICAgICAgICAgICAgICAgICAgICAgKX1cbiAgICAgICAgICAgICAgICAgICAgICB7cmVuZGVySGVyb1JvdyhpZCwgdW5ibHVyQXZhdGFyLCB1cGRhdGVTaGFyZWRHcm91cHMpfVxuICAgICAgICAgICAgICAgICAgICA8Lz5cbiAgICAgICAgICAgICAgICAgICl9XG5cbiAgICAgICAgICAgICAgICAgIHttZXNzYWdlTm9kZXN9XG5cbiAgICAgICAgICAgICAgICAgIHtpc1NvbWVvbmVUeXBpbmcgJiYgaGF2ZU5ld2VzdCAmJiByZW5kZXJUeXBpbmdCdWJibGUoaWQpfVxuXG4gICAgICAgICAgICAgICAgICA8ZGl2XG4gICAgICAgICAgICAgICAgICAgIGNsYXNzTmFtZT1cIm1vZHVsZS10aW1lbGluZV9fbWVzc2FnZXNfX2F0LWJvdHRvbS1kZXRlY3RvclwiXG4gICAgICAgICAgICAgICAgICAgIHJlZj17dGhpcy5hdEJvdHRvbURldGVjdG9yUmVmfVxuICAgICAgICAgICAgICAgICAgICBzdHlsZT17QVRfQk9UVE9NX0RFVEVDVE9SX1NUWUxFfVxuICAgICAgICAgICAgICAgICAgLz5cbiAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgPC9kaXY+XG5cbiAgICAgICAgICAgICAge3Nob3VsZFNob3dTY3JvbGxEb3duQnV0dG9uID8gKFxuICAgICAgICAgICAgICAgIDxTY3JvbGxEb3duQnV0dG9uXG4gICAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZD17aWR9XG4gICAgICAgICAgICAgICAgICB1bnJlYWRDb3VudD17YXJlVW5yZWFkQmVsb3dDdXJyZW50UG9zaXRpb24gPyB1bnJlYWRDb3VudCA6IDB9XG4gICAgICAgICAgICAgICAgICBzY3JvbGxEb3duPXt0aGlzLm9uQ2xpY2tTY3JvbGxEb3duQnV0dG9ufVxuICAgICAgICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgICAgICAvPlxuICAgICAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICl9XG4gICAgICAgIDwvTWVhc3VyZT5cblxuICAgICAgICB7Qm9vbGVhbihpbnZpdGVkQ29udGFjdHNGb3JOZXdseUNyZWF0ZWRHcm91cC5sZW5ndGgpICYmIChcbiAgICAgICAgICA8TmV3bHlDcmVhdGVkR3JvdXBJbnZpdGVkQ29udGFjdHNEaWFsb2dcbiAgICAgICAgICAgIGNvbnRhY3RzPXtpbnZpdGVkQ29udGFjdHNGb3JOZXdseUNyZWF0ZWRHcm91cH1cbiAgICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbkNsb3NlPXtjbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwfVxuICAgICAgICAgICAgdGhlbWU9e3RoZW1lfVxuICAgICAgICAgIC8+XG4gICAgICAgICl9XG5cbiAgICAgICAge2NvbnRhY3RTcG9vZmluZ1Jldmlld0RpYWxvZ31cbiAgICAgIDwvPlxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRXYXJuaW5nKFxuICAgIHsgd2FybmluZyB9OiBQcm9wc1R5cGUsXG4gICAgc3RhdGU6IFN0YXRlVHlwZVxuICApOiB1bmRlZmluZWQgfCBXYXJuaW5nVHlwZSB7XG4gICAgaWYgKCF3YXJuaW5nKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHN3aXRjaCAod2FybmluZy50eXBlKSB7XG4gICAgICBjYXNlIENvbnRhY3RTcG9vZmluZ1R5cGUuRGlyZWN0Q29udmVyc2F0aW9uV2l0aFNhbWVUaXRsZToge1xuICAgICAgICBjb25zdCB7IGhhc0Rpc21pc3NlZERpcmVjdENvbnRhY3RTcG9vZmluZ1dhcm5pbmcgfSA9IHN0YXRlO1xuICAgICAgICByZXR1cm4gaGFzRGlzbWlzc2VkRGlyZWN0Q29udGFjdFNwb29maW5nV2FybmluZyA/IHVuZGVmaW5lZCA6IHdhcm5pbmc7XG4gICAgICB9XG4gICAgICBjYXNlIENvbnRhY3RTcG9vZmluZ1R5cGUuTXVsdGlwbGVHcm91cE1lbWJlcnNXaXRoU2FtZVRpdGxlOlxuICAgICAgICByZXR1cm4gaGFzVW5hY2tub3dsZWRnZWRDb2xsaXNpb25zKFxuICAgICAgICAgIHdhcm5pbmcuYWNrbm93bGVkZ2VkR3JvdXBOYW1lQ29sbGlzaW9ucyxcbiAgICAgICAgICB3YXJuaW5nLmdyb3VwTmFtZUNvbGxpc2lvbnNcbiAgICAgICAgKVxuICAgICAgICAgID8gd2FybmluZ1xuICAgICAgICAgIDogdW5kZWZpbmVkO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcih3YXJuaW5nKTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZ2V0TWVzc2FnZUlkRnJvbUVsZW1lbnQoXG4gIGVsZW1lbnQ6IHVuZGVmaW5lZCB8IEVsZW1lbnRcbik6IHVuZGVmaW5lZCB8IHN0cmluZyB7XG4gIHJldHVybiBlbGVtZW50IGluc3RhbmNlb2YgSFRNTEVsZW1lbnQgPyBlbGVtZW50LmRhdGFzZXQubWVzc2FnZUlkIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBnZXRSb3dJbmRleEZyb21FbGVtZW50KFxuICBlbGVtZW50OiB1bmRlZmluZWQgfCBFbGVtZW50XG4pOiB1bmRlZmluZWQgfCBudW1iZXIge1xuICByZXR1cm4gZWxlbWVudCBpbnN0YW5jZW9mIEhUTUxFbGVtZW50ICYmIGVsZW1lbnQuZGF0YXNldC5pdGVtSW5kZXhcbiAgICA/IHBhcnNlSW50KGVsZW1lbnQuZGF0YXNldC5pdGVtSW5kZXgsIDEwKVxuICAgIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBzaG93RGVi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
