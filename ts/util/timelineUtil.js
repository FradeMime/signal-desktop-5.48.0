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
var timelineUtil_exports = {};
__export(timelineUtil_exports, {
  ScrollAnchor: () => ScrollAnchor,
  TimelineMessageLoadingState: () => TimelineMessageLoadingState,
  UnreadIndicatorPlacement: () => UnreadIndicatorPlacement,
  areMessagesInSameGroup: () => areMessagesInSameGroup,
  getScrollAnchorBeforeUpdate: () => getScrollAnchorBeforeUpdate,
  getWidthBreakpoint: () => getWidthBreakpoint,
  shouldCurrentMessageHideMetadata: () => shouldCurrentMessageHideMetadata
});
module.exports = __toCommonJS(timelineUtil_exports);
var import_lodash = require("lodash");
var log = __toESM(require("../logging/log"));
var import_util = require("../components/_util");
var import_durations = require("./durations");
var import_missingCaseError = require("./missingCaseError");
var import_timestamp = require("./timestamp");
const COLLAPSE_WITHIN = 3 * import_durations.MINUTE;
var TimelineMessageLoadingState = /* @__PURE__ */ ((TimelineMessageLoadingState2) => {
  TimelineMessageLoadingState2[TimelineMessageLoadingState2["DoingInitialLoad"] = 1] = "DoingInitialLoad";
  TimelineMessageLoadingState2[TimelineMessageLoadingState2["LoadingOlderMessages"] = 2] = "LoadingOlderMessages";
  TimelineMessageLoadingState2[TimelineMessageLoadingState2["LoadingNewerMessages"] = 3] = "LoadingNewerMessages";
  return TimelineMessageLoadingState2;
})(TimelineMessageLoadingState || {});
var ScrollAnchor = /* @__PURE__ */ ((ScrollAnchor2) => {
  ScrollAnchor2[ScrollAnchor2["ChangeNothing"] = 0] = "ChangeNothing";
  ScrollAnchor2[ScrollAnchor2["ScrollToBottom"] = 1] = "ScrollToBottom";
  ScrollAnchor2[ScrollAnchor2["ScrollToIndex"] = 2] = "ScrollToIndex";
  ScrollAnchor2[ScrollAnchor2["ScrollToUnreadIndicator"] = 3] = "ScrollToUnreadIndicator";
  ScrollAnchor2[ScrollAnchor2["Top"] = 4] = "Top";
  ScrollAnchor2[ScrollAnchor2["Bottom"] = 5] = "Bottom";
  return ScrollAnchor2;
})(ScrollAnchor || {});
var UnreadIndicatorPlacement = /* @__PURE__ */ ((UnreadIndicatorPlacement2) => {
  UnreadIndicatorPlacement2[UnreadIndicatorPlacement2["JustAbove"] = 0] = "JustAbove";
  UnreadIndicatorPlacement2[UnreadIndicatorPlacement2["JustBelow"] = 1] = "JustBelow";
  return UnreadIndicatorPlacement2;
})(UnreadIndicatorPlacement || {});
const getMessageTimelineItemData = /* @__PURE__ */ __name((timelineItem) => timelineItem?.type === "message" ? timelineItem.data : void 0, "getMessageTimelineItemData");
function shouldCurrentMessageHideMetadata(areMessagesGrouped, item, newerTimelineItem) {
  if (!areMessagesGrouped) {
    return false;
  }
  const message = getMessageTimelineItemData(item);
  if (!message) {
    return false;
  }
  const newerMessage = getMessageTimelineItemData(newerTimelineItem);
  if (!newerMessage) {
    return false;
  }
  if (newerMessage.deletedForEveryone && !message.deletedForEveryone) {
    return false;
  }
  switch (message.status) {
    case void 0:
      return true;
    case "paused":
    case "error":
    case "partial-sent":
    case "sending":
      return false;
    case "sent":
    case "delivered":
    case "read":
    case "viewed":
      return true;
    default:
      log.error((0, import_missingCaseError.missingCaseError)(message.status));
      return true;
  }
}
function areMessagesInSameGroup(olderTimelineItem, unreadIndicator, newerTimelineItem) {
  if (unreadIndicator) {
    return false;
  }
  const olderMessage = getMessageTimelineItemData(olderTimelineItem);
  if (!olderMessage) {
    return false;
  }
  const newerMessage = getMessageTimelineItemData(newerTimelineItem);
  if (!newerMessage) {
    return false;
  }
  return Boolean(!olderMessage.reactions?.length && olderMessage.author.id === newerMessage.author.id && newerMessage.timestamp >= olderMessage.timestamp && newerMessage.timestamp - olderMessage.timestamp < COLLAPSE_WITHIN && (0, import_timestamp.isSameDay)(olderMessage.timestamp, newerMessage.timestamp));
}
function getScrollAnchorBeforeUpdate(prevProps, props, isAtBottom) {
  if (props.messageLoadingState || !props.items.length) {
    return 0 /* ChangeNothing */;
  }
  const loadingStateThatJustFinished = !props.messageLoadingState && prevProps.messageLoadingState ? prevProps.messageLoadingState : void 0;
  if ((0, import_lodash.isNumber)(props.scrollToIndex) && (loadingStateThatJustFinished === 1 /* DoingInitialLoad */ || prevProps.scrollToIndex !== props.scrollToIndex || prevProps.scrollToIndexCounter !== props.scrollToIndexCounter)) {
    return 2 /* ScrollToIndex */;
  }
  switch (loadingStateThatJustFinished) {
    case 1 /* DoingInitialLoad */:
      if (props.isIncomingMessageRequest) {
        return 0 /* ChangeNothing */;
      }
      if ((0, import_lodash.isNumber)(props.oldestUnseenIndex)) {
        return 3 /* ScrollToUnreadIndicator */;
      }
      return 1 /* ScrollToBottom */;
    case 2 /* LoadingOlderMessages */:
      return 5 /* Bottom */;
    case 3 /* LoadingNewerMessages */:
      return 4 /* Top */;
    case void 0: {
      const didSomethingChange = prevProps.items.length !== props.items.length || props.haveNewest && prevProps.isSomeoneTyping !== props.isSomeoneTyping;
      if (didSomethingChange && isAtBottom) {
        return 1 /* ScrollToBottom */;
      }
      break;
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(loadingStateThatJustFinished);
  }
  return 0 /* ChangeNothing */;
}
function getWidthBreakpoint(width) {
  if (width > 606) {
    return import_util.WidthBreakpoint.Wide;
  }
  if (width > 514) {
    return import_util.WidthBreakpoint.Medium;
  }
  return import_util.WidthBreakpoint.Narrow;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  ScrollAnchor,
  TimelineMessageLoadingState,
  UnreadIndicatorPlacement,
  areMessagesInSameGroup,
  getScrollAnchorBeforeUpdate,
  getWidthBreakpoint,
  shouldCurrentMessageHideMetadata
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidGltZWxpbmVVdGlsLnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlzTnVtYmVyIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBUaW1lbGluZVByb3BzVHlwZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1RpbWVsaW5lJztcbmltcG9ydCB0eXBlIHsgVGltZWxpbmVJdGVtVHlwZSB9IGZyb20gJy4uL2NvbXBvbmVudHMvY29udmVyc2F0aW9uL1RpbWVsaW5lSXRlbSc7XG5pbXBvcnQgeyBXaWR0aEJyZWFrcG9pbnQgfSBmcm9tICcuLi9jb21wb25lbnRzL191dGlsJztcbmltcG9ydCB7IE1JTlVURSB9IGZyb20gJy4vZHVyYXRpb25zJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgaXNTYW1lRGF5IH0gZnJvbSAnLi90aW1lc3RhbXAnO1xuaW1wb3J0IHR5cGUgeyBMYXN0TWVzc2FnZVN0YXR1cyB9IGZyb20gJy4uL21vZGVsLXR5cGVzLmQnO1xuXG5jb25zdCBDT0xMQVBTRV9XSVRISU4gPSAzICogTUlOVVRFO1xuXG5leHBvcnQgZW51bSBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUge1xuICAvLyBXZSBzdGFydCB0aGUgZW51bSBhdCAxIGJlY2F1c2UgdGhlIGRlZmF1bHQgc3RhcnRpbmcgdmFsdWUgb2YgMCBpcyBmYWxzeS5cbiAgRG9pbmdJbml0aWFsTG9hZCA9IDEsXG4gIExvYWRpbmdPbGRlck1lc3NhZ2VzLFxuICBMb2FkaW5nTmV3ZXJNZXNzYWdlcyxcbn1cblxuZXhwb3J0IGVudW0gU2Nyb2xsQW5jaG9yIHtcbiAgQ2hhbmdlTm90aGluZyxcbiAgU2Nyb2xsVG9Cb3R0b20sXG4gIFNjcm9sbFRvSW5kZXgsXG4gIFNjcm9sbFRvVW5yZWFkSW5kaWNhdG9yLFxuICBUb3AsXG4gIEJvdHRvbSxcbn1cblxuZXhwb3J0IGVudW0gVW5yZWFkSW5kaWNhdG9yUGxhY2VtZW50IHtcbiAgSnVzdEFib3ZlLFxuICBKdXN0QmVsb3csXG59XG5cbmV4cG9ydCB0eXBlIE1lc3NhZ2VUaW1lbGluZUl0ZW1EYXRhVHlwZSA9IFJlYWRvbmx5PHtcbiAgYXV0aG9yOiB7IGlkOiBzdHJpbmcgfTtcbiAgZGVsZXRlZEZvckV2ZXJ5b25lPzogYm9vbGVhbjtcbiAgcmVhY3Rpb25zPzogUmVhZG9ubHlBcnJheTx1bmtub3duPjtcbiAgc3RhdHVzPzogTGFzdE1lc3NhZ2VTdGF0dXM7XG4gIHRpbWVzdGFtcDogbnVtYmVyO1xufT47XG5cbi8vIFRoaXMgbGV0cyB1cyBhdm9pZCBwYXNzaW5nIGEgZnVsbCBgTWVzc2FnZVR5cGVgLiBUaGF0J3MgdXNlZnVsIGZvciB0ZXN0cyBhbmQgZm9yXG4vLyAgIGRvY3VtZW50YXRpb24uXG5leHBvcnQgdHlwZSBNYXliZU1lc3NhZ2VUaW1lbGluZUl0ZW1UeXBlID0gUmVhZG9ubHk8XG4gIHwgdW5kZWZpbmVkXG4gIHwgVGltZWxpbmVJdGVtVHlwZVxuICB8IHsgdHlwZTogJ21lc3NhZ2UnOyBkYXRhOiBNZXNzYWdlVGltZWxpbmVJdGVtRGF0YVR5cGUgfVxuPjtcblxuY29uc3QgZ2V0TWVzc2FnZVRpbWVsaW5lSXRlbURhdGEgPSAoXG4gIHRpbWVsaW5lSXRlbTogTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZVxuKTogdW5kZWZpbmVkIHwgTWVzc2FnZVRpbWVsaW5lSXRlbURhdGFUeXBlID0+XG4gIHRpbWVsaW5lSXRlbT8udHlwZSA9PT0gJ21lc3NhZ2UnID8gdGltZWxpbmVJdGVtLmRhdGEgOiB1bmRlZmluZWQ7XG5cbmV4cG9ydCBmdW5jdGlvbiBzaG91bGRDdXJyZW50TWVzc2FnZUhpZGVNZXRhZGF0YShcbiAgYXJlTWVzc2FnZXNHcm91cGVkOiBib29sZWFuLFxuICBpdGVtOiBNYXliZU1lc3NhZ2VUaW1lbGluZUl0ZW1UeXBlLFxuICBuZXdlclRpbWVsaW5lSXRlbTogTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZVxuKTogYm9vbGVhbiB7XG4gIGlmICghYXJlTWVzc2FnZXNHcm91cGVkKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgbWVzc2FnZSA9IGdldE1lc3NhZ2VUaW1lbGluZUl0ZW1EYXRhKGl0ZW0pO1xuICBpZiAoIW1lc3NhZ2UpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBuZXdlck1lc3NhZ2UgPSBnZXRNZXNzYWdlVGltZWxpbmVJdGVtRGF0YShuZXdlclRpbWVsaW5lSXRlbSk7XG4gIGlmICghbmV3ZXJNZXNzYWdlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgLy8gSWYgbmV3ZXIgbWVzc2FnZSBpcyBkZWxldGVkLCBidXQgY3VycmVudCBpc24ndCwgd2UnbGwgc2hvdyBtZXRhZGF0YS5cbiAgaWYgKG5ld2VyTWVzc2FnZS5kZWxldGVkRm9yRXZlcnlvbmUgJiYgIW1lc3NhZ2UuZGVsZXRlZEZvckV2ZXJ5b25lKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgc3dpdGNoIChtZXNzYWdlLnN0YXR1cykge1xuICAgIGNhc2UgdW5kZWZpbmVkOlxuICAgICAgcmV0dXJuIHRydWU7XG4gICAgY2FzZSAncGF1c2VkJzpcbiAgICBjYXNlICdlcnJvcic6XG4gICAgY2FzZSAncGFydGlhbC1zZW50JzpcbiAgICBjYXNlICdzZW5kaW5nJzpcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICBjYXNlICdzZW50JzpcbiAgICBjYXNlICdkZWxpdmVyZWQnOlxuICAgIGNhc2UgJ3JlYWQnOlxuICAgIGNhc2UgJ3ZpZXdlZCc6XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICBkZWZhdWx0OlxuICAgICAgbG9nLmVycm9yKG1pc3NpbmdDYXNlRXJyb3IobWVzc2FnZS5zdGF0dXMpKTtcbiAgICAgIHJldHVybiB0cnVlO1xuICB9XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBhcmVNZXNzYWdlc0luU2FtZUdyb3VwKFxuICBvbGRlclRpbWVsaW5lSXRlbTogTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZSxcbiAgdW5yZWFkSW5kaWNhdG9yOiBib29sZWFuLFxuICBuZXdlclRpbWVsaW5lSXRlbTogTWF5YmVNZXNzYWdlVGltZWxpbmVJdGVtVHlwZVxuKTogYm9vbGVhbiB7XG4gIGlmICh1bnJlYWRJbmRpY2F0b3IpIHtcbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBjb25zdCBvbGRlck1lc3NhZ2UgPSBnZXRNZXNzYWdlVGltZWxpbmVJdGVtRGF0YShvbGRlclRpbWVsaW5lSXRlbSk7XG4gIGlmICghb2xkZXJNZXNzYWdlKSB7XG4gICAgcmV0dXJuIGZhbHNlO1xuICB9XG5cbiAgY29uc3QgbmV3ZXJNZXNzYWdlID0gZ2V0TWVzc2FnZVRpbWVsaW5lSXRlbURhdGEobmV3ZXJUaW1lbGluZUl0ZW0pO1xuICBpZiAoIW5ld2VyTWVzc2FnZSkge1xuICAgIHJldHVybiBmYWxzZTtcbiAgfVxuXG4gIHJldHVybiBCb29sZWFuKFxuICAgICFvbGRlck1lc3NhZ2UucmVhY3Rpb25zPy5sZW5ndGggJiZcbiAgICAgIG9sZGVyTWVzc2FnZS5hdXRob3IuaWQgPT09IG5ld2VyTWVzc2FnZS5hdXRob3IuaWQgJiZcbiAgICAgIG5ld2VyTWVzc2FnZS50aW1lc3RhbXAgPj0gb2xkZXJNZXNzYWdlLnRpbWVzdGFtcCAmJlxuICAgICAgbmV3ZXJNZXNzYWdlLnRpbWVzdGFtcCAtIG9sZGVyTWVzc2FnZS50aW1lc3RhbXAgPCBDT0xMQVBTRV9XSVRISU4gJiZcbiAgICAgIGlzU2FtZURheShvbGRlck1lc3NhZ2UudGltZXN0YW1wLCBuZXdlck1lc3NhZ2UudGltZXN0YW1wKVxuICApO1xufVxuXG50eXBlIFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZVByb3BzID0gUmVhZG9ubHk8XG4gIFBpY2s8XG4gICAgVGltZWxpbmVQcm9wc1R5cGUsXG4gICAgfCAnaGF2ZU5ld2VzdCdcbiAgICB8ICdpc0luY29taW5nTWVzc2FnZVJlcXVlc3QnXG4gICAgfCAnaXNTb21lb25lVHlwaW5nJ1xuICAgIHwgJ2l0ZW1zJ1xuICAgIHwgJ21lc3NhZ2VMb2FkaW5nU3RhdGUnXG4gICAgfCAnb2xkZXN0VW5zZWVuSW5kZXgnXG4gICAgfCAnc2Nyb2xsVG9JbmRleCdcbiAgICB8ICdzY3JvbGxUb0luZGV4Q291bnRlcidcbiAgPlxuPjtcblxuZXhwb3J0IGZ1bmN0aW9uIGdldFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZShcbiAgcHJldlByb3BzOiBTY3JvbGxBbmNob3JCZWZvcmVVcGRhdGVQcm9wcyxcbiAgcHJvcHM6IFNjcm9sbEFuY2hvckJlZm9yZVVwZGF0ZVByb3BzLFxuICBpc0F0Qm90dG9tOiBib29sZWFuXG4pOiBTY3JvbGxBbmNob3Ige1xuICBpZiAocHJvcHMubWVzc2FnZUxvYWRpbmdTdGF0ZSB8fCAhcHJvcHMuaXRlbXMubGVuZ3RoKSB7XG4gICAgcmV0dXJuIFNjcm9sbEFuY2hvci5DaGFuZ2VOb3RoaW5nO1xuICB9XG5cbiAgY29uc3QgbG9hZGluZ1N0YXRlVGhhdEp1c3RGaW5pc2hlZDogdW5kZWZpbmVkIHwgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlID1cbiAgICAhcHJvcHMubWVzc2FnZUxvYWRpbmdTdGF0ZSAmJiBwcmV2UHJvcHMubWVzc2FnZUxvYWRpbmdTdGF0ZVxuICAgICAgPyBwcmV2UHJvcHMubWVzc2FnZUxvYWRpbmdTdGF0ZVxuICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgaWYgKFxuICAgIGlzTnVtYmVyKHByb3BzLnNjcm9sbFRvSW5kZXgpICYmXG4gICAgKGxvYWRpbmdTdGF0ZVRoYXRKdXN0RmluaXNoZWQgPT09XG4gICAgICBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUuRG9pbmdJbml0aWFsTG9hZCB8fFxuICAgICAgcHJldlByb3BzLnNjcm9sbFRvSW5kZXggIT09IHByb3BzLnNjcm9sbFRvSW5kZXggfHxcbiAgICAgIHByZXZQcm9wcy5zY3JvbGxUb0luZGV4Q291bnRlciAhPT0gcHJvcHMuc2Nyb2xsVG9JbmRleENvdW50ZXIpXG4gICkge1xuICAgIHJldHVybiBTY3JvbGxBbmNob3IuU2Nyb2xsVG9JbmRleDtcbiAgfVxuXG4gIHN3aXRjaCAobG9hZGluZ1N0YXRlVGhhdEp1c3RGaW5pc2hlZCkge1xuICAgIGNhc2UgVGltZWxpbmVNZXNzYWdlTG9hZGluZ1N0YXRlLkRvaW5nSW5pdGlhbExvYWQ6XG4gICAgICBpZiAocHJvcHMuaXNJbmNvbWluZ01lc3NhZ2VSZXF1ZXN0KSB7XG4gICAgICAgIHJldHVybiBTY3JvbGxBbmNob3IuQ2hhbmdlTm90aGluZztcbiAgICAgIH1cbiAgICAgIGlmIChpc051bWJlcihwcm9wcy5vbGRlc3RVbnNlZW5JbmRleCkpIHtcbiAgICAgICAgcmV0dXJuIFNjcm9sbEFuY2hvci5TY3JvbGxUb1VucmVhZEluZGljYXRvcjtcbiAgICAgIH1cbiAgICAgIHJldHVybiBTY3JvbGxBbmNob3IuU2Nyb2xsVG9Cb3R0b207XG4gICAgY2FzZSBUaW1lbGluZU1lc3NhZ2VMb2FkaW5nU3RhdGUuTG9hZGluZ09sZGVyTWVzc2FnZXM6XG4gICAgICByZXR1cm4gU2Nyb2xsQW5jaG9yLkJvdHRvbTtcbiAgICBjYXNlIFRpbWVsaW5lTWVzc2FnZUxvYWRpbmdTdGF0ZS5Mb2FkaW5nTmV3ZXJNZXNzYWdlczpcbiAgICAgIHJldHVybiBTY3JvbGxBbmNob3IuVG9wO1xuICAgIGNhc2UgdW5kZWZpbmVkOiB7XG4gICAgICBjb25zdCBkaWRTb21ldGhpbmdDaGFuZ2UgPVxuICAgICAgICBwcmV2UHJvcHMuaXRlbXMubGVuZ3RoICE9PSBwcm9wcy5pdGVtcy5sZW5ndGggfHxcbiAgICAgICAgKHByb3BzLmhhdmVOZXdlc3QgJiZcbiAgICAgICAgICBwcmV2UHJvcHMuaXNTb21lb25lVHlwaW5nICE9PSBwcm9wcy5pc1NvbWVvbmVUeXBpbmcpO1xuICAgICAgaWYgKGRpZFNvbWV0aGluZ0NoYW5nZSAmJiBpc0F0Qm90dG9tKSB7XG4gICAgICAgIHJldHVybiBTY3JvbGxBbmNob3IuU2Nyb2xsVG9Cb3R0b207XG4gICAgICB9XG4gICAgICBicmVhaztcbiAgICB9XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IobG9hZGluZ1N0YXRlVGhhdEp1c3RGaW5pc2hlZCk7XG4gIH1cblxuICByZXR1cm4gU2Nyb2xsQW5jaG9yLkNoYW5nZU5vdGhpbmc7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBnZXRXaWR0aEJyZWFrcG9pbnQod2lkdGg6IG51bWJlcik6IFdpZHRoQnJlYWtwb2ludCB7XG4gIGlmICh3aWR0aCA+IDYwNikge1xuICAgIHJldHVybiBXaWR0aEJyZWFrcG9pbnQuV2lkZTtcbiAgfVxuICBpZiAod2lkdGggPiA1MTQpIHtcbiAgICByZXR1cm4gV2lkdGhCcmVha3BvaW50Lk1lZGl1bTtcbiAgfVxuICByZXR1cm4gV2lkdGhCcmVha3BvaW50Lk5hcnJvdztcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxvQkFBeUI7QUFDekIsVUFBcUI7QUFHckIsa0JBQWdDO0FBQ2hDLHVCQUF1QjtBQUN2Qiw4QkFBaUM7QUFDakMsdUJBQTBCO0FBRzFCLE1BQU0sa0JBQWtCLElBQUk7QUFFckIsSUFBSyw4QkFBTCxrQkFBSyxpQ0FBTDtBQUVMLGtGQUFtQixLQUFuQjtBQUNBO0FBQ0E7QUFKVTtBQUFBO0FBT0wsSUFBSyxlQUFMLGtCQUFLLGtCQUFMO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTlU7QUFBQTtBQVNMLElBQUssMkJBQUwsa0JBQUssOEJBQUw7QUFD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
