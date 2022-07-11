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
var MessageSendState_exports = {};
__export(MessageSendState_exports, {
  SendActionType: () => SendActionType,
  SendStatus: () => SendStatus,
  isDelivered: () => isDelivered,
  isFailed: () => isFailed,
  isMessageJustForMe: () => isMessageJustForMe,
  isRead: () => isRead,
  isSent: () => isSent,
  isViewed: () => isViewed,
  maxStatus: () => maxStatus,
  parseMessageSendStatus: () => parseMessageSendStatus,
  sendStateReducer: () => sendStateReducer,
  someSendStatus: () => someSendStatus
});
module.exports = __toCommonJS(MessageSendState_exports);
var import_enum = require("../util/enum");
var SendStatus = /* @__PURE__ */ ((SendStatus2) => {
  SendStatus2["Failed"] = "Failed";
  SendStatus2["Pending"] = "Pending";
  SendStatus2["Sent"] = "Sent";
  SendStatus2["Delivered"] = "Delivered";
  SendStatus2["Read"] = "Read";
  SendStatus2["Viewed"] = "Viewed";
  return SendStatus2;
})(SendStatus || {});
const parseMessageSendStatus = (0, import_enum.makeEnumParser)(SendStatus, "Pending" /* Pending */);
const STATUS_NUMBERS = {
  ["Failed" /* Failed */]: 0,
  ["Pending" /* Pending */]: 1,
  ["Sent" /* Sent */]: 2,
  ["Delivered" /* Delivered */]: 3,
  ["Read" /* Read */]: 4,
  ["Viewed" /* Viewed */]: 5
};
const maxStatus = /* @__PURE__ */ __name((a, b) => STATUS_NUMBERS[a] > STATUS_NUMBERS[b] ? a : b, "maxStatus");
const isViewed = /* @__PURE__ */ __name((status) => status === "Viewed" /* Viewed */, "isViewed");
const isRead = /* @__PURE__ */ __name((status) => STATUS_NUMBERS[status] >= STATUS_NUMBERS["Read" /* Read */], "isRead");
const isDelivered = /* @__PURE__ */ __name((status) => STATUS_NUMBERS[status] >= STATUS_NUMBERS["Delivered" /* Delivered */], "isDelivered");
const isSent = /* @__PURE__ */ __name((status) => STATUS_NUMBERS[status] >= STATUS_NUMBERS["Sent" /* Sent */], "isSent");
const isFailed = /* @__PURE__ */ __name((status) => status === "Failed" /* Failed */, "isFailed");
function sendStateReducer(state, action) {
  const oldStatus = state.status;
  let newStatus;
  if (oldStatus === "Pending" /* Pending */ && action.type === SendActionType.Failed) {
    newStatus = "Failed" /* Failed */;
  } else {
    newStatus = maxStatus(oldStatus, STATE_TRANSITIONS[action.type]);
  }
  return newStatus === oldStatus ? state : {
    status: newStatus,
    updatedAt: action.updatedAt
  };
}
var SendActionType = /* @__PURE__ */ ((SendActionType2) => {
  SendActionType2[SendActionType2["Failed"] = 0] = "Failed";
  SendActionType2[SendActionType2["ManuallyRetried"] = 1] = "ManuallyRetried";
  SendActionType2[SendActionType2["Sent"] = 2] = "Sent";
  SendActionType2[SendActionType2["GotDeliveryReceipt"] = 3] = "GotDeliveryReceipt";
  SendActionType2[SendActionType2["GotReadReceipt"] = 4] = "GotReadReceipt";
  SendActionType2[SendActionType2["GotViewedReceipt"] = 5] = "GotViewedReceipt";
  return SendActionType2;
})(SendActionType || {});
const STATE_TRANSITIONS = {
  [0 /* Failed */]: "Failed" /* Failed */,
  [1 /* ManuallyRetried */]: "Pending" /* Pending */,
  [2 /* Sent */]: "Sent" /* Sent */,
  [3 /* GotDeliveryReceipt */]: "Delivered" /* Delivered */,
  [4 /* GotReadReceipt */]: "Read" /* Read */,
  [5 /* GotViewedReceipt */]: "Viewed" /* Viewed */
};
const someSendStatus = /* @__PURE__ */ __name((sendStateByConversationId, predicate) => Object.values(sendStateByConversationId || {}).some((sendState) => predicate(sendState.status)), "someSendStatus");
const isMessageJustForMe = /* @__PURE__ */ __name((sendStateByConversationId, ourConversationId) => {
  const conversationIds = Object.keys(sendStateByConversationId || {});
  return Boolean(ourConversationId && conversationIds.length === 1 && conversationIds[0] === ourConversationId);
}, "isMessageJustForMe");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SendActionType,
  SendStatus,
  isDelivered,
  isFailed,
  isMessageJustForMe,
  isRead,
  isSent,
  isViewed,
  maxStatus,
  parseMessageSendStatus,
  sendStateReducer,
  someSendStatus
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZVNlbmRTdGF0ZS50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IG1ha2VFbnVtUGFyc2VyIH0gZnJvbSAnLi4vdXRpbC9lbnVtJztcblxuLyoqXG4gKiBgU2VuZFN0YXR1c2AgcmVwcmVzZW50cyB0aGUgc2VuZCBzdGF0dXMgb2YgYSBtZXNzYWdlIHRvIGEgc2luZ2xlIHJlY2lwaWVudC4gRm9yXG4gKiBleGFtcGxlLCBpZiBhIG1lc3NhZ2UgaXMgc2VudCB0byA1IHBlb3BsZSwgdGhlcmUgd291bGQgYmUgNSBgU2VuZFN0YXR1c2Blcy5cbiAqXG4gKiBVbmRlciBub3JtYWwgY29uZGl0aW9ucywgdGhlIHN0YXR1cyB3aWxsIGdvIGRvd24gdGhpcyBsaXN0LCBpbiBvcmRlcjpcbiAqXG4gKiAxLiBgUGVuZGluZ2A7IHRoZSBtZXNzYWdlIGhhcyBub3QgYmVlbiBzZW50LCBhbmQgd2UgYXJlIGNvbnRpbnVpbmcgdG8gdHJ5XG4gKiAyLiBgU2VudGA7IHRoZSBtZXNzYWdlIGhhcyBiZWVuIGRlbGl2ZXJlZCB0byB0aGUgc2VydmVyXG4gKiAzLiBgRGVsaXZlcmVkYDsgd2UndmUgcmVjZWl2ZWQgYSBkZWxpdmVyeSByZWNlaXB0XG4gKiA0LiBgUmVhZGA7IHdlJ3ZlIHJlY2VpdmVkIGEgcmVhZCByZWNlaXB0IChub3QgYXBwbGljYWJsZSBpZiB0aGUgcmVjaXBpZW50IGhhcyBkaXNhYmxlZFxuICogICAgc2VuZGluZyB0aGVzZSByZWNlaXB0cylcbiAqIDUuIGBWaWV3ZWRgOyB3ZSd2ZSByZWNlaXZlZCBhIHZpZXdlZCByZWNlaXB0IChub3QgYXBwbGljYWJsZSBmb3IgYWxsIG1lc3NhZ2UgdHlwZXMsIG9yXG4gKiAgICBpZiB0aGUgcmVjaXBpZW50IGhhcyBkaXNhYmxlZCBzZW5kaW5nIHRoZXNlIHJlY2VpcHRzKVxuICpcbiAqIFRoZXJlJ3MgYWxzbyBhIGBGYWlsZWRgIHN0YXRlLCB3aGljaCByZXByZXNlbnRzIGFuIGVycm9yIHdlIGRvbid0IHdhbnQgdG8gcmVjb3ZlciBmcm9tLlxuICpcbiAqIFRoZXJlIGFyZSBzb21lIHVudXN1YWwgY2FzZXMgd2hlcmUgbWVzc2FnZXMgZG9uJ3QgZm9sbG93IHRoaXMgcGF0dGVybi4gRm9yIGV4YW1wbGUsIGlmXG4gKiB3ZSByZWNlaXZlIGEgcmVhZCByZWNlaXB0IGJlZm9yZSB3ZSByZWNlaXZlIGEgZGVsaXZlcnkgcmVjZWlwdCwgd2UgbWlnaHQgc2tpcCB0aGVcbiAqIERlbGl2ZXJlZCBzdGF0ZS4gSG93ZXZlciwgd2Ugc2hvdWxkIG5ldmVyIGdvIFwiYmFja3dhcmRzXCIuXG4gKlxuICogQmUgY2FyZWZ1bCB3aGVuIGNoYW5naW5nIHRoZXNlIHZhbHVlcywgYXMgdGhleSBhcmUgcGVyc2lzdGVkLlxuICovXG5leHBvcnQgZW51bSBTZW5kU3RhdHVzIHtcbiAgRmFpbGVkID0gJ0ZhaWxlZCcsXG4gIFBlbmRpbmcgPSAnUGVuZGluZycsXG4gIFNlbnQgPSAnU2VudCcsXG4gIERlbGl2ZXJlZCA9ICdEZWxpdmVyZWQnLFxuICBSZWFkID0gJ1JlYWQnLFxuICBWaWV3ZWQgPSAnVmlld2VkJyxcbn1cblxuZXhwb3J0IGNvbnN0IHBhcnNlTWVzc2FnZVNlbmRTdGF0dXMgPSBtYWtlRW51bVBhcnNlcihcbiAgU2VuZFN0YXR1cyxcbiAgU2VuZFN0YXR1cy5QZW5kaW5nXG4pO1xuXG5jb25zdCBTVEFUVVNfTlVNQkVSUzogUmVjb3JkPFNlbmRTdGF0dXMsIG51bWJlcj4gPSB7XG4gIFtTZW5kU3RhdHVzLkZhaWxlZF06IDAsXG4gIFtTZW5kU3RhdHVzLlBlbmRpbmddOiAxLFxuICBbU2VuZFN0YXR1cy5TZW50XTogMixcbiAgW1NlbmRTdGF0dXMuRGVsaXZlcmVkXTogMyxcbiAgW1NlbmRTdGF0dXMuUmVhZF06IDQsXG4gIFtTZW5kU3RhdHVzLlZpZXdlZF06IDUsXG59O1xuXG5leHBvcnQgY29uc3QgbWF4U3RhdHVzID0gKGE6IFNlbmRTdGF0dXMsIGI6IFNlbmRTdGF0dXMpOiBTZW5kU3RhdHVzID0+XG4gIFNUQVRVU19OVU1CRVJTW2FdID4gU1RBVFVTX05VTUJFUlNbYl0gPyBhIDogYjtcblxuZXhwb3J0IGNvbnN0IGlzVmlld2VkID0gKHN0YXR1czogU2VuZFN0YXR1cyk6IGJvb2xlYW4gPT5cbiAgc3RhdHVzID09PSBTZW5kU3RhdHVzLlZpZXdlZDtcbmV4cG9ydCBjb25zdCBpc1JlYWQgPSAoc3RhdHVzOiBTZW5kU3RhdHVzKTogYm9vbGVhbiA9PlxuICBTVEFUVVNfTlVNQkVSU1tzdGF0dXNdID49IFNUQVRVU19OVU1CRVJTW1NlbmRTdGF0dXMuUmVhZF07XG5leHBvcnQgY29uc3QgaXNEZWxpdmVyZWQgPSAoc3RhdHVzOiBTZW5kU3RhdHVzKTogYm9vbGVhbiA9PlxuICBTVEFUVVNfTlVNQkVSU1tzdGF0dXNdID49IFNUQVRVU19OVU1CRVJTW1NlbmRTdGF0dXMuRGVsaXZlcmVkXTtcbmV4cG9ydCBjb25zdCBpc1NlbnQgPSAoc3RhdHVzOiBTZW5kU3RhdHVzKTogYm9vbGVhbiA9PlxuICBTVEFUVVNfTlVNQkVSU1tzdGF0dXNdID49IFNUQVRVU19OVU1CRVJTW1NlbmRTdGF0dXMuU2VudF07XG5leHBvcnQgY29uc3QgaXNGYWlsZWQgPSAoc3RhdHVzOiBTZW5kU3RhdHVzKTogYm9vbGVhbiA9PlxuICBzdGF0dXMgPT09IFNlbmRTdGF0dXMuRmFpbGVkO1xuXG4vKipcbiAqIGBTZW5kU3RhdGVgIGNvbWJpbmVzIGBTZW5kU3RhdHVzYCBhbmQgYSB0aW1lc3RhbXAuIFlvdSBjYW4gdXNlIGl0IHRvIHNob3cgdGhpbmdzIHRvIHRoZVxuICogdXNlciBzdWNoIGFzIFwidGhpcyBtZXNzYWdlIHdhcyBkZWxpdmVyZWQgYXQgNjowOXBtXCIuXG4gKlxuICogVGhlIHRpbWVzdGFtcCBtYXkgYmUgdW5kZWZpbmVkIGlmIHJlYWRpbmcgb2xkIGRhdGEsIHdoaWNoIGRpZCBub3Qgc3RvcmUgYSB0aW1lc3RhbXAuXG4gKi9cbmV4cG9ydCB0eXBlIFNlbmRTdGF0ZSA9IFJlYWRvbmx5PHtcbiAgc3RhdHVzOlxuICAgIHwgU2VuZFN0YXR1cy5QZW5kaW5nXG4gICAgfCBTZW5kU3RhdHVzLkZhaWxlZFxuICAgIHwgU2VuZFN0YXR1cy5TZW50XG4gICAgfCBTZW5kU3RhdHVzLkRlbGl2ZXJlZFxuICAgIHwgU2VuZFN0YXR1cy5SZWFkXG4gICAgfCBTZW5kU3RhdHVzLlZpZXdlZDtcbiAgdXBkYXRlZEF0PzogbnVtYmVyO1xufT47XG5cbi8qKlxuICogVGhlIHJlZHVjZXIgYWR2YW5jZXMgdGhlIGxpdHRsZSBgU2VuZFN0YXRlYCBzdGF0ZSBtYWNoaW5lLiBJdCBtb3N0bHkgZm9sbG93cyB0aGUgc3RlcHNcbiAqIGluIHRoZSBgU2VuZFN0YXR1c2AgZG9jdW1lbnRhdGlvbiBhYm92ZSwgYnV0IGl0IGFsc28gaGFuZGxlcyBlZGdlIGNhc2VzLlxuICovXG5leHBvcnQgZnVuY3Rpb24gc2VuZFN0YXRlUmVkdWNlcihcbiAgc3RhdGU6IFJlYWRvbmx5PFNlbmRTdGF0ZT4sXG4gIGFjdGlvbjogUmVhZG9ubHk8U2VuZEFjdGlvbj5cbik6IFNlbmRTdGF0ZSB7XG4gIGNvbnN0IG9sZFN0YXR1cyA9IHN0YXRlLnN0YXR1cztcbiAgbGV0IG5ld1N0YXR1czogU2VuZFN0YXR1cztcblxuICBpZiAoXG4gICAgb2xkU3RhdHVzID09PSBTZW5kU3RhdHVzLlBlbmRpbmcgJiZcbiAgICBhY3Rpb24udHlwZSA9PT0gU2VuZEFjdGlvblR5cGUuRmFpbGVkXG4gICkge1xuICAgIG5ld1N0YXR1cyA9IFNlbmRTdGF0dXMuRmFpbGVkO1xuICB9IGVsc2Uge1xuICAgIG5ld1N0YXR1cyA9IG1heFN0YXR1cyhvbGRTdGF0dXMsIFNUQVRFX1RSQU5TSVRJT05TW2FjdGlvbi50eXBlXSk7XG4gIH1cblxuICByZXR1cm4gbmV3U3RhdHVzID09PSBvbGRTdGF0dXNcbiAgICA/IHN0YXRlXG4gICAgOiB7XG4gICAgICAgIHN0YXR1czogbmV3U3RhdHVzLFxuICAgICAgICB1cGRhdGVkQXQ6IGFjdGlvbi51cGRhdGVkQXQsXG4gICAgICB9O1xufVxuXG5leHBvcnQgZW51bSBTZW5kQWN0aW9uVHlwZSB7XG4gIEZhaWxlZCxcbiAgTWFudWFsbHlSZXRyaWVkLFxuICBTZW50LFxuICBHb3REZWxpdmVyeVJlY2VpcHQsXG4gIEdvdFJlYWRSZWNlaXB0LFxuICBHb3RWaWV3ZWRSZWNlaXB0LFxufVxuXG5leHBvcnQgdHlwZSBTZW5kQWN0aW9uID0gUmVhZG9ubHk8e1xuICB0eXBlOlxuICAgIHwgU2VuZEFjdGlvblR5cGUuRmFpbGVkXG4gICAgfCBTZW5kQWN0aW9uVHlwZS5NYW51YWxseVJldHJpZWRcbiAgICB8IFNlbmRBY3Rpb25UeXBlLlNlbnRcbiAgICB8IFNlbmRBY3Rpb25UeXBlLkdvdERlbGl2ZXJ5UmVjZWlwdFxuICAgIHwgU2VuZEFjdGlvblR5cGUuR290UmVhZFJlY2VpcHRcbiAgICB8IFNlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHQ7XG4gIC8vIGB1cGRhdGVkQXQ/OiBudW1iZXJgIG1ha2VzIGl0IGVhc2llciB0byBmb3JnZXQgdGhlIHByb3BlcnR5LiBXaXRoIHRoaXMgdHlwZSwgeW91IGhhdmVcbiAgLy8gICB0byBleHBsaWNpdGx5IHNheSBpdCdzIG1pc3NpbmcuXG4gIHVwZGF0ZWRBdDogdW5kZWZpbmVkIHwgbnVtYmVyO1xufT47XG5cbmNvbnN0IFNUQVRFX1RSQU5TSVRJT05TOiBSZWNvcmQ8U2VuZEFjdGlvblR5cGUsIFNlbmRTdGF0dXM+ID0ge1xuICBbU2VuZEFjdGlvblR5cGUuRmFpbGVkXTogU2VuZFN0YXR1cy5GYWlsZWQsXG4gIFtTZW5kQWN0aW9uVHlwZS5NYW51YWxseVJldHJpZWRdOiBTZW5kU3RhdHVzLlBlbmRpbmcsXG4gIFtTZW5kQWN0aW9uVHlwZS5TZW50XTogU2VuZFN0YXR1cy5TZW50LFxuICBbU2VuZEFjdGlvblR5cGUuR290RGVsaXZlcnlSZWNlaXB0XTogU2VuZFN0YXR1cy5EZWxpdmVyZWQsXG4gIFtTZW5kQWN0aW9uVHlwZS5Hb3RSZWFkUmVjZWlwdF06IFNlbmRTdGF0dXMuUmVhZCxcbiAgW1NlbmRBY3Rpb25UeXBlLkdvdFZpZXdlZFJlY2VpcHRdOiBTZW5kU3RhdHVzLlZpZXdlZCxcbn07XG5cbmV4cG9ydCB0eXBlIFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgPSBSZWNvcmQ8c3RyaW5nLCBTZW5kU3RhdGU+O1xuXG5leHBvcnQgY29uc3Qgc29tZVNlbmRTdGF0dXMgPSAoXG4gIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IFJlYWRvbmx5PFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ+LFxuICBwcmVkaWNhdGU6ICh2YWx1ZTogU2VuZFN0YXR1cykgPT4gYm9vbGVhblxuKTogYm9vbGVhbiA9PlxuICBPYmplY3QudmFsdWVzKHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQgfHwge30pLnNvbWUoc2VuZFN0YXRlID0+XG4gICAgcHJlZGljYXRlKHNlbmRTdGF0ZS5zdGF0dXMpXG4gICk7XG5cbmV4cG9ydCBjb25zdCBpc01lc3NhZ2VKdXN0Rm9yTWUgPSAoXG4gIHNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ6IHVuZGVmaW5lZCB8IFJlYWRvbmx5PFNlbmRTdGF0ZUJ5Q29udmVyc2F0aW9uSWQ+LFxuICBvdXJDb252ZXJzYXRpb25JZDogc3RyaW5nIHwgdW5kZWZpbmVkXG4pOiBib29sZWFuID0+IHtcbiAgY29uc3QgY29udmVyc2F0aW9uSWRzID0gT2JqZWN0LmtleXMoc2VuZFN0YXRlQnlDb252ZXJzYXRpb25JZCB8fCB7fSk7XG4gIHJldHVybiBCb29sZWFuKFxuICAgIG91ckNvbnZlcnNhdGlvbklkICYmXG4gICAgICBjb252ZXJzYXRpb25JZHMubGVuZ3RoID09PSAxICYmXG4gICAgICBjb252ZXJzYXRpb25JZHNbMF0gPT09IG91ckNvbnZlcnNhdGlvbklkXG4gICk7XG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxrQkFBK0I7QUF3QnhCLElBQUssYUFBTCxrQkFBSyxnQkFBTDtBQUNMLDBCQUFTO0FBQ1QsMkJBQVU7QUFDVix3QkFBTztBQUNQLDZCQUFZO0FBQ1osd0JBQU87QUFDUCwwQkFBUztBQU5DO0FBQUE7QUFTTCxNQUFNLHlCQUF5QixnQ0FDcEMsWUFDQSx1QkFDRjtBQUVBLE1BQU0saUJBQTZDO0FBQUEsR0FDaEQsd0JBQW9CO0FBQUEsR0FDcEIsMEJBQXFCO0FBQUEsR0FDckIsb0JBQWtCO0FBQUEsR0FDbEIsOEJBQXVCO0FBQUEsR0FDdkIsb0JBQWtCO0FBQUEsR0FDbEIsd0JBQW9CO0FBQ3ZCO0FBRU8sTUFBTSxZQUFZLHdCQUFDLEdBQWUsTUFDdkMsZUFBZSxLQUFLLGVBQWUsS0FBSyxJQUFJLEdBRHJCO0FBR2xCLE1BQU0sV0FBVyx3QkFBQyxXQUN2QixXQUFXLHVCQURXO0FBRWpCLE1BQU0sU0FBUyx3QkFBQyxXQUNyQixlQUFlLFdBQVcsZUFBZSxvQkFEckI7QUFFZixNQUFNLGNBQWMsd0JBQUMsV0FDMUIsZUFBZSxXQUFXLGVBQWUsOEJBRGhCO0FBRXBCLE1BQU0sU0FBUyx3QkFBQyxXQUNyQixlQUFlLFdBQVcsZUFBZSxvQkFEckI7QUFFZixNQUFNLFdBQVcsd0JBQUMsV0FDdkIsV0FBVyx1QkFEVztBQXdCakIsMEJBQ0wsT0FDQSxRQUNXO0FBQ1gsUUFBTSxZQUFZLE1BQU07QUFDeEIsTUFBSTtBQUVKLE1BQ0UsY0FBYywyQkFDZCxPQUFPLFNBQVMsZUFBZSxRQUMvQjtBQUNBLGdCQUFZO0FBQUEsRUFDZCxPQUFPO0FBQ0wsZ0JBQVksVUFBVSxXQUFXLGtCQUFrQixPQUFPLEtBQUs7QUFBQSxFQUNqRTtBQUVBLFNBQU8sY0FBYyxZQUNqQixRQUNBO0FBQUEsSUFDRSxRQUFRO0FBQUEsSUFDUixXQUFXLE9BQU87QUFBQSxFQUNwQjtBQUNOO0FBdEJnQixBQXdCVCxJQUFLLGlCQUFMLGtCQUFLLG9CQUFMO0FBQ0w7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBTlU7QUFBQTtBQXNCWixNQUFNLG9CQUF3RDtBQUFBLEdBQzNELGlCQUF3QjtBQUFBLEdBQ3hCLDBCQUFpQztBQUFBLEdBQ2pDLGVBQXNCO0FBQUEsR0FDdEIsNkJBQW9DO0FBQUEsR0FDcEMseUJBQWdDO0FBQUEsR0FDaEMsMkJBQWtDO0FBQ3JDO0FBSU8sTUFBTSxpQkFBaUIsd0JBQzVCLDJCQUNBLGNBRUEsT0FBTyxPQUFPLDZCQUE2QixDQUFDLENBQUMsRUFBRSxLQUFLLGVBQ2xELFVBQVUsVUFBVSxNQUFNLENBQzVCLEdBTjRCO0FBUXZCLE1BQU0scUJBQXFCLHdCQUNoQywyQkFDQSxzQkFDWTtBQUNaLFFBQU0sa0JBQWtCLE9BQU8sS0FBSyw2QkFBNkIsQ0FBQyxDQUFDO0FBQ25FLFNBQU8sUUFDTCxxQkFDRSxnQkFBZ0IsV0FBVyxLQUMzQixnQkFBZ0IsT0FBTyxpQkFDM0I7QUFDRixHQVZrQzsiLAogICJuYW1lcyI6IFtdCn0K
