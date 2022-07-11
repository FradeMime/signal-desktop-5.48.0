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
  TimelineItem: () => TimelineItem
});
module.exports = __toCommonJS(TimelineItem_exports);
var import_react = __toESM(require("react"));
var import_TimelineDateHeader = require("./TimelineDateHeader");
var import_Message = require("./Message");
var import_CallingNotification = require("./CallingNotification");
var import_ChatSessionRefreshedNotification = require("./ChatSessionRefreshedNotification");
var import_DeliveryIssueNotification = require("./DeliveryIssueNotification");
var import_ChangeNumberNotification = require("./ChangeNumberNotification");
var import_InlineNotificationWrapper = require("./InlineNotificationWrapper");
var import_UnsupportedMessage = require("./UnsupportedMessage");
var import_TimerNotification = require("./TimerNotification");
var import_SafetyNumberNotification = require("./SafetyNumberNotification");
var import_VerificationNotification = require("./VerificationNotification");
var import_GroupNotification = require("./GroupNotification");
var import_GroupV2Change = require("./GroupV2Change");
var import_GroupV1Migration = require("./GroupV1Migration");
var import_ResetSessionNotification = require("./ResetSessionNotification");
var import_ProfileChangeNotification = require("./ProfileChangeNotification");
class TimelineItem extends import_react.default.PureComponent {
  render() {
    const {
      containerElementRef,
      conversationId,
      getPreferredBadge,
      i18n,
      id,
      isNextItemCallingNotification,
      isSelected,
      item,
      renderUniversalTimerNotification,
      returnToActiveCall,
      selectMessage,
      shouldCollapseAbove,
      shouldCollapseBelow,
      shouldHideMetadata,
      shouldRenderDateHeader,
      startCallingLobby,
      theme
    } = this.props;
    if (!item) {
      return null;
    }
    let itemContents;
    if (item.type === "message") {
      itemContents = /* @__PURE__ */ import_react.default.createElement(import_Message.Message, {
        ...this.props,
        ...item.data,
        shouldCollapseAbove,
        shouldCollapseBelow,
        shouldHideMetadata,
        containerElementRef,
        getPreferredBadge,
        i18n,
        theme,
        renderingContext: "conversation/TimelineItem"
      });
    } else {
      let notification;
      if (item.type === "unsupportedMessage") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_UnsupportedMessage.UnsupportedMessage, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "callHistory") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_CallingNotification.CallingNotification, {
          conversationId,
          i18n,
          isNextItemCallingNotification,
          returnToActiveCall,
          startCallingLobby,
          ...item.data
        });
      } else if (item.type === "chatSessionRefreshed") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_ChatSessionRefreshedNotification.ChatSessionRefreshedNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "deliveryIssue") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_DeliveryIssueNotification.DeliveryIssueNotification, {
          ...item.data,
          ...this.props,
          i18n
        });
      } else if (item.type === "timerNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_TimerNotification.TimerNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "universalTimerNotification") {
        notification = renderUniversalTimerNotification();
      } else if (item.type === "changeNumberNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_ChangeNumberNotification.ChangeNumberNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "safetyNumberNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberNotification.SafetyNumberNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "verificationNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_VerificationNotification.VerificationNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "groupNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_GroupNotification.GroupNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "groupV2Change") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_GroupV2Change.GroupV2Change, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "groupV1Migration") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_GroupV1Migration.GroupV1Migration, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "resetSessionNotification") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_ResetSessionNotification.ResetSessionNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else if (item.type === "profileChange") {
        notification = /* @__PURE__ */ import_react.default.createElement(import_ProfileChangeNotification.ProfileChangeNotification, {
          ...this.props,
          ...item.data,
          i18n
        });
      } else {
        const unknownItem = item;
        const asItem = unknownItem;
        throw new Error(`TimelineItem: Unknown type: ${asItem.type}`);
      }
      itemContents = /* @__PURE__ */ import_react.default.createElement(import_InlineNotificationWrapper.InlineNotificationWrapper, {
        id,
        conversationId,
        isSelected,
        selectMessage
      }, notification);
    }
    if (shouldRenderDateHeader) {
      return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, /* @__PURE__ */ import_react.default.createElement(import_TimelineDateHeader.TimelineDateHeader, {
        i18n,
        timestamp: item.timestamp
      }), itemContents);
    }
    return itemContents;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  TimelineItem
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiVGltZWxpbmVJdGVtLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMTktMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgUmVhY3RDaGlsZCwgUmVmT2JqZWN0IH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlLCBUaGVtZVR5cGUgfSBmcm9tICcuLi8uLi90eXBlcy9VdGlsJztcblxuaW1wb3J0IHR5cGUgeyBJbnRlcmFjdGlvbk1vZGVUeXBlIH0gZnJvbSAnLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBUaW1lbGluZURhdGVIZWFkZXIgfSBmcm9tICcuL1RpbWVsaW5lRGF0ZUhlYWRlcic7XG5pbXBvcnQgdHlwZSB7XG4gIFByb3BzIGFzIEFsbE1lc3NhZ2VQcm9wcyxcbiAgUHJvcHNBY3Rpb25zIGFzIE1lc3NhZ2VBY3Rpb25zVHlwZSxcbiAgUHJvcHNEYXRhIGFzIE1lc3NhZ2VQcm9wcyxcbn0gZnJvbSAnLi9NZXNzYWdlJztcbmltcG9ydCB7IE1lc3NhZ2UgfSBmcm9tICcuL01lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0FjdGlvbnNUeXBlIGFzIENhbGxpbmdOb3RpZmljYXRpb25BY3Rpb25zVHlwZSB9IGZyb20gJy4vQ2FsbGluZ05vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBDYWxsaW5nTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9DYWxsaW5nTm90aWZpY2F0aW9uJztcbmltcG9ydCB0eXBlIHsgUHJvcHNBY3Rpb25zVHlwZSBhcyBQcm9wc0NoYXRTZXNzaW9uUmVmcmVzaGVkQWN0aW9uc1R5cGUgfSBmcm9tICcuL0NoYXRTZXNzaW9uUmVmcmVzaGVkTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IENoYXRTZXNzaW9uUmVmcmVzaGVkTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9DaGF0U2Vzc2lvblJlZnJlc2hlZE5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7XG4gIFByb3BzQWN0aW9uc1R5cGUgYXMgRGVsaXZlcnlJc3N1ZUFjdGlvblByb3BzLFxuICBQcm9wc0RhdGFUeXBlIGFzIERlbGl2ZXJ5SXNzdWVQcm9wcyxcbn0gZnJvbSAnLi9EZWxpdmVyeUlzc3VlTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IERlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb24gfSBmcm9tICcuL0RlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGEgYXMgQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uUHJvcHMgfSBmcm9tICcuL0NoYW5nZU51bWJlck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgeyBDaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24gfSBmcm9tICcuL0NoYW5nZU51bWJlck5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IENhbGxpbmdOb3RpZmljYXRpb25UeXBlIH0gZnJvbSAnLi4vLi4vdXRpbC9jYWxsaW5nTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IElubGluZU5vdGlmaWNhdGlvbldyYXBwZXIgfSBmcm9tICcuL0lubGluZU5vdGlmaWNhdGlvbldyYXBwZXInO1xuaW1wb3J0IHR5cGUge1xuICBQcm9wc0FjdGlvbnMgYXMgVW5zdXBwb3J0ZWRNZXNzYWdlQWN0aW9uc1R5cGUsXG4gIFByb3BzRGF0YSBhcyBVbnN1cHBvcnRlZE1lc3NhZ2VQcm9wcyxcbn0gZnJvbSAnLi9VbnN1cHBvcnRlZE1lc3NhZ2UnO1xuaW1wb3J0IHsgVW5zdXBwb3J0ZWRNZXNzYWdlIH0gZnJvbSAnLi9VbnN1cHBvcnRlZE1lc3NhZ2UnO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGEgYXMgVGltZXJOb3RpZmljYXRpb25Qcm9wcyB9IGZyb20gJy4vVGltZXJOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVGltZXJOb3RpZmljYXRpb24gfSBmcm9tICcuL1RpbWVyTm90aWZpY2F0aW9uJztcbmltcG9ydCB0eXBlIHtcbiAgUHJvcHNBY3Rpb25zIGFzIFNhZmV0eU51bWJlckFjdGlvbnNUeXBlLFxuICBQcm9wc0RhdGEgYXMgU2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uUHJvcHMsXG59IGZyb20gJy4vU2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFNhZmV0eU51bWJlck5vdGlmaWNhdGlvbiB9IGZyb20gJy4vU2FmZXR5TnVtYmVyTm90aWZpY2F0aW9uJztcbmltcG9ydCB0eXBlIHsgUHJvcHNEYXRhIGFzIFZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvblByb3BzIH0gZnJvbSAnLi9WZXJpZmljYXRpb25Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHsgVmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uIH0gZnJvbSAnLi9WZXJpZmljYXRpb25Ob3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBQcm9wc0RhdGEgYXMgR3JvdXBOb3RpZmljYXRpb25Qcm9wcyB9IGZyb20gJy4vR3JvdXBOb3RpZmljYXRpb24nO1xuaW1wb3J0IHsgR3JvdXBOb3RpZmljYXRpb24gfSBmcm9tICcuL0dyb3VwTm90aWZpY2F0aW9uJztcbmltcG9ydCB0eXBlIHtcbiAgUHJvcHNEYXRhVHlwZSBhcyBHcm91cFYyQ2hhbmdlUHJvcHMsXG4gIFByb3BzQWN0aW9uc1R5cGUgYXMgR3JvdXBWMkNoYW5nZUFjdGlvbnNUeXBlLFxufSBmcm9tICcuL0dyb3VwVjJDaGFuZ2UnO1xuaW1wb3J0IHsgR3JvdXBWMkNoYW5nZSB9IGZyb20gJy4vR3JvdXBWMkNoYW5nZSc7XG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YVR5cGUgYXMgR3JvdXBWMU1pZ3JhdGlvblByb3BzIH0gZnJvbSAnLi9Hcm91cFYxTWlncmF0aW9uJztcbmltcG9ydCB7IEdyb3VwVjFNaWdyYXRpb24gfSBmcm9tICcuL0dyb3VwVjFNaWdyYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBTbWFydENvbnRhY3RSZW5kZXJlclR5cGUgfSBmcm9tICcuLi8uLi9ncm91cENoYW5nZSc7XG5pbXBvcnQgeyBSZXNldFNlc3Npb25Ob3RpZmljYXRpb24gfSBmcm9tICcuL1Jlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvbic7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSBhcyBQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uUHJvcHNUeXBlIH0gZnJvbSAnLi9Qcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uJztcbmltcG9ydCB7IFByb2ZpbGVDaGFuZ2VOb3RpZmljYXRpb24gfSBmcm9tICcuL1Byb2ZpbGVDaGFuZ2VOb3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBGdWxsSlNYVHlwZSB9IGZyb20gJy4uL0ludGwnO1xuXG50eXBlIENhbGxIaXN0b3J5VHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxIaXN0b3J5JztcbiAgZGF0YTogQ2FsbGluZ05vdGlmaWNhdGlvblR5cGU7XG59O1xudHlwZSBDaGF0U2Vzc2lvblJlZnJlc2hlZFR5cGUgPSB7XG4gIHR5cGU6ICdjaGF0U2Vzc2lvblJlZnJlc2hlZCc7XG4gIGRhdGE6IG51bGw7XG59O1xudHlwZSBEZWxpdmVyeUlzc3VlVHlwZSA9IHtcbiAgdHlwZTogJ2RlbGl2ZXJ5SXNzdWUnO1xuICBkYXRhOiBEZWxpdmVyeUlzc3VlUHJvcHM7XG59O1xudHlwZSBNZXNzYWdlVHlwZSA9IHtcbiAgdHlwZTogJ21lc3NhZ2UnO1xuICBkYXRhOiBPbWl0PE1lc3NhZ2VQcm9wcywgJ3JlbmRlcmluZ0NvbnRleHQnPjtcbn07XG50eXBlIFVuc3VwcG9ydGVkTWVzc2FnZVR5cGUgPSB7XG4gIHR5cGU6ICd1bnN1cHBvcnRlZE1lc3NhZ2UnO1xuICBkYXRhOiBVbnN1cHBvcnRlZE1lc3NhZ2VQcm9wcztcbn07XG50eXBlIFRpbWVyTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ3RpbWVyTm90aWZpY2F0aW9uJztcbiAgZGF0YTogVGltZXJOb3RpZmljYXRpb25Qcm9wcztcbn07XG50eXBlIFVuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ3VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uJztcbiAgZGF0YTogbnVsbDtcbn07XG50eXBlIENoYW5nZU51bWJlck5vdGlmaWNhdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24nO1xuICBkYXRhOiBDaGFuZ2VOdW1iZXJOb3RpZmljYXRpb25Qcm9wcztcbn07XG50eXBlIFNhZmV0eU51bWJlck5vdGlmaWNhdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdzYWZldHlOdW1iZXJOb3RpZmljYXRpb24nO1xuICBkYXRhOiBTYWZldHlOdW1iZXJOb3RpZmljYXRpb25Qcm9wcztcbn07XG50eXBlIFZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvblR5cGUgPSB7XG4gIHR5cGU6ICd2ZXJpZmljYXRpb25Ob3RpZmljYXRpb24nO1xuICBkYXRhOiBWZXJpZmljYXRpb25Ob3RpZmljYXRpb25Qcm9wcztcbn07XG50eXBlIEdyb3VwTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2dyb3VwTm90aWZpY2F0aW9uJztcbiAgZGF0YTogR3JvdXBOb3RpZmljYXRpb25Qcm9wcztcbn07XG50eXBlIEdyb3VwVjJDaGFuZ2VUeXBlID0ge1xuICB0eXBlOiAnZ3JvdXBWMkNoYW5nZSc7XG4gIGRhdGE6IEdyb3VwVjJDaGFuZ2VQcm9wcztcbn07XG50eXBlIEdyb3VwVjFNaWdyYXRpb25UeXBlID0ge1xuICB0eXBlOiAnZ3JvdXBWMU1pZ3JhdGlvbic7XG4gIGRhdGE6IEdyb3VwVjFNaWdyYXRpb25Qcm9wcztcbn07XG50eXBlIFJlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdyZXNldFNlc3Npb25Ob3RpZmljYXRpb24nO1xuICBkYXRhOiBudWxsO1xufTtcbnR5cGUgUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdwcm9maWxlQ2hhbmdlJztcbiAgZGF0YTogUHJvZmlsZUNoYW5nZU5vdGlmaWNhdGlvblByb3BzVHlwZTtcbn07XG5cbmV4cG9ydCB0eXBlIFRpbWVsaW5lSXRlbVR5cGUgPSAoXG4gIHwgQ2FsbEhpc3RvcnlUeXBlXG4gIHwgQ2hhdFNlc3Npb25SZWZyZXNoZWRUeXBlXG4gIHwgRGVsaXZlcnlJc3N1ZVR5cGVcbiAgfCBHcm91cE5vdGlmaWNhdGlvblR5cGVcbiAgfCBHcm91cFYxTWlncmF0aW9uVHlwZVxuICB8IEdyb3VwVjJDaGFuZ2VUeXBlXG4gIHwgTWVzc2FnZVR5cGVcbiAgfCBQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uVHlwZVxuICB8IFJlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvblR5cGVcbiAgfCBTYWZldHlOdW1iZXJOb3RpZmljYXRpb25UeXBlXG4gIHwgVGltZXJOb3RpZmljYXRpb25UeXBlXG4gIHwgVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb25UeXBlXG4gIHwgQ2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uVHlwZVxuICB8IFVuc3VwcG9ydGVkTWVzc2FnZVR5cGVcbiAgfCBWZXJpZmljYXRpb25Ob3RpZmljYXRpb25UeXBlXG4pICYgeyB0aW1lc3RhbXA6IG51bWJlciB9O1xuXG50eXBlIFByb3BzTG9jYWxUeXBlID0ge1xuICBjb250YWluZXJFbGVtZW50UmVmOiBSZWZPYmplY3Q8SFRNTEVsZW1lbnQ+O1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBpdGVtPzogVGltZWxpbmVJdGVtVHlwZTtcbiAgaWQ6IHN0cmluZztcbiAgaXNOZXh0SXRlbUNhbGxpbmdOb3RpZmljYXRpb246IGJvb2xlYW47XG4gIGlzU2VsZWN0ZWQ6IGJvb2xlYW47XG4gIHNlbGVjdE1lc3NhZ2U6IChtZXNzYWdlSWQ6IHN0cmluZywgY29udmVyc2F0aW9uSWQ6IHN0cmluZykgPT4gdW5rbm93bjtcbiAgc2hvdWxkUmVuZGVyRGF0ZUhlYWRlcjogYm9vbGVhbjtcbiAgcmVuZGVyQ29udGFjdDogU21hcnRDb250YWN0UmVuZGVyZXJUeXBlPEZ1bGxKU1hUeXBlPjtcbiAgcmVuZGVyVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb246ICgpID0+IEpTWC5FbGVtZW50O1xuICBpMThuOiBMb2NhbGl6ZXJUeXBlO1xuICBpbnRlcmFjdGlvbk1vZGU6IEludGVyYWN0aW9uTW9kZVR5cGU7XG4gIHRoZW1lOiBUaGVtZVR5cGU7XG59O1xuXG50eXBlIFByb3BzQWN0aW9uc1R5cGUgPSBNZXNzYWdlQWN0aW9uc1R5cGUgJlxuICBDYWxsaW5nTm90aWZpY2F0aW9uQWN0aW9uc1R5cGUgJlxuICBEZWxpdmVyeUlzc3VlQWN0aW9uUHJvcHMgJlxuICBHcm91cFYyQ2hhbmdlQWN0aW9uc1R5cGUgJlxuICBQcm9wc0NoYXRTZXNzaW9uUmVmcmVzaGVkQWN0aW9uc1R5cGUgJlxuICBVbnN1cHBvcnRlZE1lc3NhZ2VBY3Rpb25zVHlwZSAmXG4gIFNhZmV0eU51bWJlckFjdGlvbnNUeXBlO1xuXG5leHBvcnQgdHlwZSBQcm9wc1R5cGUgPSBQcm9wc0xvY2FsVHlwZSAmXG4gIFByb3BzQWN0aW9uc1R5cGUgJlxuICBQaWNrPFxuICAgIEFsbE1lc3NhZ2VQcm9wcyxcbiAgICB8ICdjb250YWluZXJXaWR0aEJyZWFrcG9pbnQnXG4gICAgfCAnZ2V0UHJlZmVycmVkQmFkZ2UnXG4gICAgfCAncmVuZGVyRW1vamlQaWNrZXInXG4gICAgfCAncmVuZGVyQXVkaW9BdHRhY2htZW50J1xuICAgIHwgJ3JlbmRlclJlYWN0aW9uUGlja2VyJ1xuICAgIHwgJ3Nob3VsZENvbGxhcHNlQWJvdmUnXG4gICAgfCAnc2hvdWxkQ29sbGFwc2VCZWxvdydcbiAgICB8ICdzaG91bGRIaWRlTWV0YWRhdGEnXG4gID47XG5cbmV4cG9ydCBjbGFzcyBUaW1lbGluZUl0ZW0gZXh0ZW5kcyBSZWFjdC5QdXJlQ29tcG9uZW50PFByb3BzVHlwZT4ge1xuICBwdWJsaWMgb3ZlcnJpZGUgcmVuZGVyKCk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gICAgY29uc3Qge1xuICAgICAgY29udGFpbmVyRWxlbWVudFJlZixcbiAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgZ2V0UHJlZmVycmVkQmFkZ2UsXG4gICAgICBpMThuLFxuICAgICAgaWQsXG4gICAgICBpc05leHRJdGVtQ2FsbGluZ05vdGlmaWNhdGlvbixcbiAgICAgIGlzU2VsZWN0ZWQsXG4gICAgICBpdGVtLFxuICAgICAgcmVuZGVyVW5pdmVyc2FsVGltZXJOb3RpZmljYXRpb24sXG4gICAgICByZXR1cm5Ub0FjdGl2ZUNhbGwsXG4gICAgICBzZWxlY3RNZXNzYWdlLFxuICAgICAgc2hvdWxkQ29sbGFwc2VBYm92ZSxcbiAgICAgIHNob3VsZENvbGxhcHNlQmVsb3csXG4gICAgICBzaG91bGRIaWRlTWV0YWRhdGEsXG4gICAgICBzaG91bGRSZW5kZXJEYXRlSGVhZGVyLFxuICAgICAgc3RhcnRDYWxsaW5nTG9iYnksXG4gICAgICB0aGVtZSxcbiAgICB9ID0gdGhpcy5wcm9wcztcblxuICAgIGlmICghaXRlbSkge1xuICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIHVuZGVyIG5vcm1hbCBjb25kaXRpb25zLlxuICAgICAgLy9cbiAgICAgIC8vIGA8VGltZWxpbmU+YCBhbmQgYDxUaW1lbGluZUl0ZW0+YCBhcmUgY29ubmVjdGVkIHRvIFJlZHV4IHNlcGFyYXRlbHkuIElmIGFcbiAgICAgIC8vICAgdGltZWxpbmUgaXRlbSBpcyByZW1vdmVkIGZyb20gUmVkdXgsIGA8VGltZWxpbmVJdGVtPmAgbWlnaHQgcmUtcmVuZGVyIGJlZm9yZVxuICAgICAgLy8gICBgPFRpbWVsaW5lPmAgZG9lcywgd2hpY2ggbWVhbnMgd2UnbGwgdHJ5IHRvIHJlbmRlciBub3RoaW5nLiBUaGlzIHNob3VsZCByZXNvbHZlXG4gICAgICAvLyAgIGl0c2VsZiBxdWlja2x5LCBhcyBzb29uIGFzIGA8VGltZWxpbmU+YCByZS1yZW5kZXJzLlxuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgbGV0IGl0ZW1Db250ZW50czogUmVhY3RDaGlsZDtcbiAgICBpZiAoaXRlbS50eXBlID09PSAnbWVzc2FnZScpIHtcbiAgICAgIGl0ZW1Db250ZW50cyA9IChcbiAgICAgICAgPE1lc3NhZ2VcbiAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICB7Li4uaXRlbS5kYXRhfVxuICAgICAgICAgIHNob3VsZENvbGxhcHNlQWJvdmU9e3Nob3VsZENvbGxhcHNlQWJvdmV9XG4gICAgICAgICAgc2hvdWxkQ29sbGFwc2VCZWxvdz17c2hvdWxkQ29sbGFwc2VCZWxvd31cbiAgICAgICAgICBzaG91bGRIaWRlTWV0YWRhdGE9e3Nob3VsZEhpZGVNZXRhZGF0YX1cbiAgICAgICAgICBjb250YWluZXJFbGVtZW50UmVmPXtjb250YWluZXJFbGVtZW50UmVmfVxuICAgICAgICAgIGdldFByZWZlcnJlZEJhZGdlPXtnZXRQcmVmZXJyZWRCYWRnZX1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIHRoZW1lPXt0aGVtZX1cbiAgICAgICAgICByZW5kZXJpbmdDb250ZXh0PVwiY29udmVyc2F0aW9uL1RpbWVsaW5lSXRlbVwiXG4gICAgICAgIC8+XG4gICAgICApO1xuICAgIH0gZWxzZSB7XG4gICAgICBsZXQgbm90aWZpY2F0aW9uO1xuXG4gICAgICBpZiAoaXRlbS50eXBlID09PSAndW5zdXBwb3J0ZWRNZXNzYWdlJykge1xuICAgICAgICBub3RpZmljYXRpb24gPSAoXG4gICAgICAgICAgPFVuc3VwcG9ydGVkTWVzc2FnZSB7Li4udGhpcy5wcm9wc30gey4uLml0ZW0uZGF0YX0gaTE4bj17aTE4bn0gLz5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnY2FsbEhpc3RvcnknKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbiA9IChcbiAgICAgICAgICA8Q2FsbGluZ05vdGlmaWNhdGlvblxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ9e2NvbnZlcnNhdGlvbklkfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAgIGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uPXtpc05leHRJdGVtQ2FsbGluZ05vdGlmaWNhdGlvbn1cbiAgICAgICAgICAgIHJldHVyblRvQWN0aXZlQ2FsbD17cmV0dXJuVG9BY3RpdmVDYWxsfVxuICAgICAgICAgICAgc3RhcnRDYWxsaW5nTG9iYnk9e3N0YXJ0Q2FsbGluZ0xvYmJ5fVxuICAgICAgICAgICAgey4uLml0ZW0uZGF0YX1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdjaGF0U2Vzc2lvblJlZnJlc2hlZCcpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxDaGF0U2Vzc2lvblJlZnJlc2hlZE5vdGlmaWNhdGlvblxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICB7Li4uaXRlbS5kYXRhfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdkZWxpdmVyeUlzc3VlJykge1xuICAgICAgICBub3RpZmljYXRpb24gPSAoXG4gICAgICAgICAgPERlbGl2ZXJ5SXNzdWVOb3RpZmljYXRpb25cbiAgICAgICAgICAgIHsuLi5pdGVtLmRhdGF9XG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAndGltZXJOb3RpZmljYXRpb24nKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbiA9IChcbiAgICAgICAgICA8VGltZXJOb3RpZmljYXRpb24gey4uLnRoaXMucHJvcHN9IHsuLi5pdGVtLmRhdGF9IGkxOG49e2kxOG59IC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3VuaXZlcnNhbFRpbWVyTm90aWZpY2F0aW9uJykge1xuICAgICAgICBub3RpZmljYXRpb24gPSByZW5kZXJVbml2ZXJzYWxUaW1lck5vdGlmaWNhdGlvbigpO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdjaGFuZ2VOdW1iZXJOb3RpZmljYXRpb24nKSB7XG4gICAgICAgIG5vdGlmaWNhdGlvbiA9IChcbiAgICAgICAgICA8Q2hhbmdlTnVtYmVyTm90aWZpY2F0aW9uXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHsuLi5pdGVtLmRhdGF9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3NhZmV0eU51bWJlck5vdGlmaWNhdGlvbicpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxTYWZldHlOdW1iZXJOb3RpZmljYXRpb25cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgey4uLml0ZW0uZGF0YX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAndmVyaWZpY2F0aW9uTm90aWZpY2F0aW9uJykge1xuICAgICAgICBub3RpZmljYXRpb24gPSAoXG4gICAgICAgICAgPFZlcmlmaWNhdGlvbk5vdGlmaWNhdGlvblxuICAgICAgICAgICAgey4uLnRoaXMucHJvcHN9XG4gICAgICAgICAgICB7Li4uaXRlbS5kYXRhfVxuICAgICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICAvPlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdncm91cE5vdGlmaWNhdGlvbicpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxHcm91cE5vdGlmaWNhdGlvbiB7Li4udGhpcy5wcm9wc30gey4uLml0ZW0uZGF0YX0gaTE4bj17aTE4bn0gLz5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAnZ3JvdXBWMkNoYW5nZScpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxHcm91cFYyQ2hhbmdlIHsuLi50aGlzLnByb3BzfSB7Li4uaXRlbS5kYXRhfSBpMThuPXtpMThufSAvPlxuICAgICAgICApO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLnR5cGUgPT09ICdncm91cFYxTWlncmF0aW9uJykge1xuICAgICAgICBub3RpZmljYXRpb24gPSAoXG4gICAgICAgICAgPEdyb3VwVjFNaWdyYXRpb24gey4uLnRoaXMucHJvcHN9IHsuLi5pdGVtLmRhdGF9IGkxOG49e2kxOG59IC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0udHlwZSA9PT0gJ3Jlc2V0U2Vzc2lvbk5vdGlmaWNhdGlvbicpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxSZXNldFNlc3Npb25Ob3RpZmljYXRpb25cbiAgICAgICAgICAgIHsuLi50aGlzLnByb3BzfVxuICAgICAgICAgICAgey4uLml0ZW0uZGF0YX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgLz5cbiAgICAgICAgKTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS50eXBlID09PSAncHJvZmlsZUNoYW5nZScpIHtcbiAgICAgICAgbm90aWZpY2F0aW9uID0gKFxuICAgICAgICAgIDxQcm9maWxlQ2hhbmdlTm90aWZpY2F0aW9uXG4gICAgICAgICAgICB7Li4udGhpcy5wcm9wc31cbiAgICAgICAgICAgIHsuLi5pdGVtLmRhdGF9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIC8+XG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBXZWlyZCwgeWVzLCBidXQgdGhlIGlkZWEgaXMgdG8gZ2V0IGEgY29tcGlsZSBlcnJvciB3aGVuIHdlIGFyZW4ndCBjb21wcmVoZW5zaXZlXG4gICAgICAgIC8vICAgd2l0aCBvdXIgaWYvZWxzZSBjaGVja3MgYWJvdmUsIGJ1dCBhbHNvIGxvZyBvdXQgdGhlIHR5cGUgd2UgZG9uJ3QgdW5kZXJzdGFuZFxuICAgICAgICAvLyAgIGlmIHdlIGVuY291bnRlciBpdCBhdCBydW50aW1lLlxuICAgICAgICBjb25zdCB1bmtub3duSXRlbTogbmV2ZXIgPSBpdGVtO1xuICAgICAgICBjb25zdCBhc0l0ZW0gPSB1bmtub3duSXRlbSBhcyBUaW1lbGluZUl0ZW1UeXBlO1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoYFRpbWVsaW5lSXRlbTogVW5rbm93biB0eXBlOiAke2FzSXRlbS50eXBlfWApO1xuICAgICAgfVxuXG4gICAgICBpdGVtQ29udGVudHMgPSAoXG4gICAgICAgIDxJbmxpbmVOb3RpZmljYXRpb25XcmFwcGVyXG4gICAgICAgICAgaWQ9e2lkfVxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkPXtjb252ZXJzYXRpb25JZH1cbiAgICAgICAgICBpc1NlbGVjdGVkPXtpc1NlbGVjdGVkfVxuICAgICAgICAgIHNlbGVjdE1lc3NhZ2U9e3NlbGVjdE1lc3NhZ2V9XG4gICAgICAgID5cbiAgICAgICAgICB7bm90aWZpY2F0aW9ufVxuICAgICAgICA8L0lubGluZU5vdGlmaWNhdGlvbldyYXBwZXI+XG4gICAgICApO1xuICAgIH1cblxuICAgIGlmIChzaG91bGRSZW5kZXJEYXRlSGVhZGVyKSB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8PlxuICAgICAgICAgIDxUaW1lbGluZURhdGVIZWFkZXIgaTE4bj17aTE4bn0gdGltZXN0YW1wPXtpdGVtLnRpbWVzdGFtcH0gLz5cbiAgICAgICAgICB7aXRlbUNvbnRlbnRzfVxuICAgICAgICA8Lz5cbiAgICAgICk7XG4gICAgfVxuICAgIHJldHVybiBpdGVtQ29udGVudHM7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
