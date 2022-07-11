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
var MessageDetail_stories_exports = {};
__export(MessageDetail_stories_exports, {
  AllErrors: () => AllErrors,
  DeliveredIncoming: () => DeliveredIncoming,
  DeliveredOutgoing: () => DeliveredOutgoing,
  MessageStatuses: () => MessageStatuses,
  NoContacts: () => NoContacts,
  NotDelivered: () => NotDelivered,
  default: () => MessageDetail_stories_default
});
module.exports = __toCommonJS(MessageDetail_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_Message = require("./Message");
var import_MessageDetail = require("./MessageDetail");
var import_MessageSendState = require("../../messages/MessageSendState");
var import_MessageReadStatus = require("../../messages/MessageReadStatus");
var import_getDefaultConversation = require("../../test-both/helpers/getDefaultConversation");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_getFakeBadge = require("../../test-both/helpers/getFakeBadge");
var import_Util = require("../../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var MessageDetail_stories_default = {
  title: "Components/Conversation/MessageDetail"
};
const defaultMessage = {
  author: (0, import_getDefaultConversation.getDefaultConversation)({
    id: "some-id",
    title: "Max"
  }),
  canReact: true,
  canReply: true,
  canRetry: true,
  canRetryDeleteForEveryone: true,
  canDeleteForEveryone: true,
  canDownload: true,
  conversationColor: "crimson",
  conversationId: "my-convo",
  conversationTitle: "Conversation Title",
  conversationType: "direct",
  direction: "incoming",
  id: "my-message",
  renderingContext: "storybook",
  isBlocked: false,
  isMessageRequestAccepted: true,
  previews: [],
  readStatus: import_MessageReadStatus.ReadStatus.Read,
  status: "sent",
  text: "A message from Max",
  textDirection: import_Message.TextDirection.Default,
  timestamp: Date.now()
};
const createProps = /* @__PURE__ */ __name((overrideProps = {}) => ({
  contacts: overrideProps.contacts || [
    {
      ...(0, import_getDefaultConversation.getDefaultConversation)({
        title: "Just Max"
      }),
      isOutgoingKeyError: false,
      isUnidentifiedDelivery: false,
      status: import_MessageSendState.SendStatus.Delivered
    }
  ],
  errors: overrideProps.errors || [],
  message: overrideProps.message || defaultMessage,
  receivedAt: (0, import_addon_knobs.number)("receivedAt", overrideProps.receivedAt || Date.now()),
  sentAt: (0, import_addon_knobs.number)("sentAt", overrideProps.sentAt || Date.now()),
  getPreferredBadge: () => (0, import_getFakeBadge.getFakeBadge)(),
  i18n,
  interactionMode: "keyboard",
  theme: import_Util.ThemeType.light,
  showSafetyNumber: (0, import_addon_actions.action)("showSafetyNumber"),
  checkForAccount: (0, import_addon_actions.action)("checkForAccount"),
  clearSelectedMessage: (0, import_addon_actions.action)("clearSelectedMessage"),
  displayTapToViewMessage: (0, import_addon_actions.action)("displayTapToViewMessage"),
  doubleCheckMissingQuoteReference: (0, import_addon_actions.action)("doubleCheckMissingQuoteReference"),
  kickOffAttachmentDownload: (0, import_addon_actions.action)("kickOffAttachmentDownload"),
  markAttachmentAsCorrupted: (0, import_addon_actions.action)("markAttachmentAsCorrupted"),
  markViewed: (0, import_addon_actions.action)("markViewed"),
  openConversation: (0, import_addon_actions.action)("openConversation"),
  openGiftBadge: (0, import_addon_actions.action)("openGiftBadge"),
  openLink: (0, import_addon_actions.action)("openLink"),
  reactToMessage: (0, import_addon_actions.action)("reactToMessage"),
  renderAudioAttachment: () => /* @__PURE__ */ React.createElement("div", null, "*AudioAttachment*"),
  renderEmojiPicker: () => /* @__PURE__ */ React.createElement("div", null),
  renderReactionPicker: () => /* @__PURE__ */ React.createElement("div", null),
  replyToMessage: (0, import_addon_actions.action)("replyToMessage"),
  retrySend: (0, import_addon_actions.action)("retrySend"),
  retryDeleteForEveryone: (0, import_addon_actions.action)("retryDeleteForEveryone"),
  showContactDetail: (0, import_addon_actions.action)("showContactDetail"),
  showContactModal: (0, import_addon_actions.action)("showContactModal"),
  showExpiredIncomingTapToViewToast: (0, import_addon_actions.action)("showExpiredIncomingTapToViewToast"),
  showExpiredOutgoingTapToViewToast: (0, import_addon_actions.action)("showExpiredOutgoingTapToViewToast"),
  showForwardMessageModal: (0, import_addon_actions.action)("showForwardMessageModal"),
  showVisualAttachment: (0, import_addon_actions.action)("showVisualAttachment"),
  startConversation: (0, import_addon_actions.action)("startConversation")
}), "createProps");
const DeliveredIncoming = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contacts: [
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          color: "forest",
          title: "Max"
        }),
        status: void 0,
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "DeliveredIncoming");
const DeliveredOutgoing = /* @__PURE__ */ __name(() => {
  const props = createProps({
    message: {
      ...defaultMessage,
      direction: "outgoing",
      text: "A message to Max"
    }
  });
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "DeliveredOutgoing");
const MessageStatuses = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contacts: [
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Max"
        }),
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Sent
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Sally"
        }),
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Pending
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Terry"
        }),
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Failed
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Theo"
        }),
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Delivered
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Nikki"
        }),
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Read
      }
    ],
    message: {
      ...defaultMessage,
      conversationType: "group",
      text: "A message to you all!"
    }
  });
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "MessageStatuses");
const NotDelivered = /* @__PURE__ */ __name(() => {
  const props = createProps({
    message: {
      ...defaultMessage,
      direction: "outgoing",
      text: "A message to Max"
    }
  });
  props.receivedAt = void 0;
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "NotDelivered");
const NoContacts = /* @__PURE__ */ __name(() => {
  const props = createProps({
    contacts: [],
    message: {
      ...defaultMessage,
      direction: "outgoing",
      text: "Is anybody there?"
    }
  });
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "NoContacts");
const AllErrors = /* @__PURE__ */ __name(() => {
  const props = createProps({
    errors: [
      {
        name: "Another Error",
        message: "Wow, that went bad."
      }
    ],
    message: {
      ...defaultMessage
    },
    contacts: [
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Max"
        }),
        isOutgoingKeyError: true,
        isUnidentifiedDelivery: false,
        status: import_MessageSendState.SendStatus.Failed
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Sally"
        }),
        errors: [
          {
            name: "Big Error",
            message: "Stuff happened, in a bad way."
          }
        ],
        isOutgoingKeyError: false,
        isUnidentifiedDelivery: true,
        status: import_MessageSendState.SendStatus.Failed
      },
      {
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          title: "Terry"
        }),
        isOutgoingKeyError: true,
        isUnidentifiedDelivery: true,
        status: import_MessageSendState.SendStatus.Failed
      }
    ]
  });
  return /* @__PURE__ */ React.createElement(import_MessageDetail.MessageDetail, {
    ...props
  });
}, "AllErrors");
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AllErrors,
  DeliveredIncoming,
  DeliveredOutgoing,
  MessageStatuses,
  NoContacts,
  NotDelivered
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiTWVzc2FnZURldGFpbC5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMSBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcblxuaW1wb3J0IHsgYWN0aW9uIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1hY3Rpb25zJztcbmltcG9ydCB7IG51bWJlciB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24ta25vYnMnO1xuXG5pbXBvcnQgdHlwZSB7IFByb3BzRGF0YSBhcyBNZXNzYWdlRGF0YVByb3BzVHlwZSB9IGZyb20gJy4vTWVzc2FnZSc7XG5pbXBvcnQgeyBUZXh0RGlyZWN0aW9uIH0gZnJvbSAnLi9NZXNzYWdlJztcbmltcG9ydCB0eXBlIHsgUHJvcHMgfSBmcm9tICcuL01lc3NhZ2VEZXRhaWwnO1xuaW1wb3J0IHsgTWVzc2FnZURldGFpbCB9IGZyb20gJy4vTWVzc2FnZURldGFpbCc7XG5pbXBvcnQgeyBTZW5kU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVNlbmRTdGF0ZSc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgc2V0dXBJMThuIH0gZnJvbSAnLi4vLi4vdXRpbC9zZXR1cEkxOG4nO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5pbXBvcnQgeyBnZXRGYWtlQmFkZ2UgfSBmcm9tICcuLi8uLi90ZXN0LWJvdGgvaGVscGVycy9nZXRGYWtlQmFkZ2UnO1xuaW1wb3J0IHsgVGhlbWVUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9NZXNzYWdlRGV0YWlsJyxcbn07XG5cbmNvbnN0IGRlZmF1bHRNZXNzYWdlOiBNZXNzYWdlRGF0YVByb3BzVHlwZSA9IHtcbiAgYXV0aG9yOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJ3NvbWUtaWQnLFxuICAgIHRpdGxlOiAnTWF4JyxcbiAgfSksXG4gIGNhblJlYWN0OiB0cnVlLFxuICBjYW5SZXBseTogdHJ1ZSxcbiAgY2FuUmV0cnk6IHRydWUsXG4gIGNhblJldHJ5RGVsZXRlRm9yRXZlcnlvbmU6IHRydWUsXG4gIGNhbkRlbGV0ZUZvckV2ZXJ5b25lOiB0cnVlLFxuICBjYW5Eb3dubG9hZDogdHJ1ZSxcbiAgY29udmVyc2F0aW9uQ29sb3I6ICdjcmltc29uJyxcbiAgY29udmVyc2F0aW9uSWQ6ICdteS1jb252bycsXG4gIGNvbnZlcnNhdGlvblRpdGxlOiAnQ29udmVyc2F0aW9uIFRpdGxlJyxcbiAgY29udmVyc2F0aW9uVHlwZTogJ2RpcmVjdCcsXG4gIGRpcmVjdGlvbjogJ2luY29taW5nJyxcbiAgaWQ6ICdteS1tZXNzYWdlJyxcbiAgcmVuZGVyaW5nQ29udGV4dDogJ3N0b3J5Ym9vaycsXG4gIGlzQmxvY2tlZDogZmFsc2UsXG4gIGlzTWVzc2FnZVJlcXVlc3RBY2NlcHRlZDogdHJ1ZSxcbiAgcHJldmlld3M6IFtdLFxuICByZWFkU3RhdHVzOiBSZWFkU3RhdHVzLlJlYWQsXG4gIHN0YXR1czogJ3NlbnQnLFxuICB0ZXh0OiAnQSBtZXNzYWdlIGZyb20gTWF4JyxcbiAgdGV4dERpcmVjdGlvbjogVGV4dERpcmVjdGlvbi5EZWZhdWx0LFxuICB0aW1lc3RhbXA6IERhdGUubm93KCksXG59O1xuXG5jb25zdCBjcmVhdGVQcm9wcyA9IChvdmVycmlkZVByb3BzOiBQYXJ0aWFsPFByb3BzPiA9IHt9KTogUHJvcHMgPT4gKHtcbiAgY29udGFjdHM6IG92ZXJyaWRlUHJvcHMuY29udGFjdHMgfHwgW1xuICAgIHtcbiAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICB0aXRsZTogJ0p1c3QgTWF4JyxcbiAgICAgIH0pLFxuICAgICAgaXNPdXRnb2luZ0tleUVycm9yOiBmYWxzZSxcbiAgICAgIGlzVW5pZGVudGlmaWVkRGVsaXZlcnk6IGZhbHNlLFxuICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICB9LFxuICBdLFxuICBlcnJvcnM6IG92ZXJyaWRlUHJvcHMuZXJyb3JzIHx8IFtdLFxuICBtZXNzYWdlOiBvdmVycmlkZVByb3BzLm1lc3NhZ2UgfHwgZGVmYXVsdE1lc3NhZ2UsXG4gIHJlY2VpdmVkQXQ6IG51bWJlcigncmVjZWl2ZWRBdCcsIG92ZXJyaWRlUHJvcHMucmVjZWl2ZWRBdCB8fCBEYXRlLm5vdygpKSxcbiAgc2VudEF0OiBudW1iZXIoJ3NlbnRBdCcsIG92ZXJyaWRlUHJvcHMuc2VudEF0IHx8IERhdGUubm93KCkpLFxuXG4gIGdldFByZWZlcnJlZEJhZGdlOiAoKSA9PiBnZXRGYWtlQmFkZ2UoKSxcbiAgaTE4bixcbiAgaW50ZXJhY3Rpb25Nb2RlOiAna2V5Ym9hcmQnLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxuXG4gIHNob3dTYWZldHlOdW1iZXI6IGFjdGlvbignc2hvd1NhZmV0eU51bWJlcicpLFxuXG4gIGNoZWNrRm9yQWNjb3VudDogYWN0aW9uKCdjaGVja0ZvckFjY291bnQnKSxcbiAgY2xlYXJTZWxlY3RlZE1lc3NhZ2U6IGFjdGlvbignY2xlYXJTZWxlY3RlZE1lc3NhZ2UnKSxcbiAgZGlzcGxheVRhcFRvVmlld01lc3NhZ2U6IGFjdGlvbignZGlzcGxheVRhcFRvVmlld01lc3NhZ2UnKSxcbiAgZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2U6IGFjdGlvbignZG91YmxlQ2hlY2tNaXNzaW5nUXVvdGVSZWZlcmVuY2UnKSxcbiAga2lja09mZkF0dGFjaG1lbnREb3dubG9hZDogYWN0aW9uKCdraWNrT2ZmQXR0YWNobWVudERvd25sb2FkJyksXG4gIG1hcmtBdHRhY2htZW50QXNDb3JydXB0ZWQ6IGFjdGlvbignbWFya0F0dGFjaG1lbnRBc0NvcnJ1cHRlZCcpLFxuICBtYXJrVmlld2VkOiBhY3Rpb24oJ21hcmtWaWV3ZWQnKSxcbiAgb3BlbkNvbnZlcnNhdGlvbjogYWN0aW9uKCdvcGVuQ29udmVyc2F0aW9uJyksXG4gIG9wZW5HaWZ0QmFkZ2U6IGFjdGlvbignb3BlbkdpZnRCYWRnZScpLFxuICBvcGVuTGluazogYWN0aW9uKCdvcGVuTGluaycpLFxuICByZWFjdFRvTWVzc2FnZTogYWN0aW9uKCdyZWFjdFRvTWVzc2FnZScpLFxuICByZW5kZXJBdWRpb0F0dGFjaG1lbnQ6ICgpID0+IDxkaXY+KkF1ZGlvQXR0YWNobWVudCo8L2Rpdj4sXG4gIHJlbmRlckVtb2ppUGlja2VyOiAoKSA9PiA8ZGl2IC8+LFxuICByZW5kZXJSZWFjdGlvblBpY2tlcjogKCkgPT4gPGRpdiAvPixcbiAgcmVwbHlUb01lc3NhZ2U6IGFjdGlvbigncmVwbHlUb01lc3NhZ2UnKSxcbiAgcmV0cnlTZW5kOiBhY3Rpb24oJ3JldHJ5U2VuZCcpLFxuICByZXRyeURlbGV0ZUZvckV2ZXJ5b25lOiBhY3Rpb24oJ3JldHJ5RGVsZXRlRm9yRXZlcnlvbmUnKSxcbiAgc2hvd0NvbnRhY3REZXRhaWw6IGFjdGlvbignc2hvd0NvbnRhY3REZXRhaWwnKSxcbiAgc2hvd0NvbnRhY3RNb2RhbDogYWN0aW9uKCdzaG93Q29udGFjdE1vZGFsJyksXG4gIHNob3dFeHBpcmVkSW5jb21pbmdUYXBUb1ZpZXdUb2FzdDogYWN0aW9uKFxuICAgICdzaG93RXhwaXJlZEluY29taW5nVGFwVG9WaWV3VG9hc3QnXG4gICksXG4gIHNob3dFeHBpcmVkT3V0Z29pbmdUYXBUb1ZpZXdUb2FzdDogYWN0aW9uKFxuICAgICdzaG93RXhwaXJlZE91dGdvaW5nVGFwVG9WaWV3VG9hc3QnXG4gICksXG4gIHNob3dGb3J3YXJkTWVzc2FnZU1vZGFsOiBhY3Rpb24oJ3Nob3dGb3J3YXJkTWVzc2FnZU1vZGFsJyksXG4gIHNob3dWaXN1YWxBdHRhY2htZW50OiBhY3Rpb24oJ3Nob3dWaXN1YWxBdHRhY2htZW50JyksXG4gIHN0YXJ0Q29udmVyc2F0aW9uOiBhY3Rpb24oJ3N0YXJ0Q29udmVyc2F0aW9uJyksXG59KTtcblxuZXhwb3J0IGNvbnN0IERlbGl2ZXJlZEluY29taW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgY29udGFjdHM6IFtcbiAgICAgIHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgY29sb3I6ICdmb3Jlc3QnLFxuICAgICAgICAgIHRpdGxlOiAnTWF4JyxcbiAgICAgICAgfSksXG4gICAgICAgIHN0YXR1czogdW5kZWZpbmVkLFxuICAgICAgICBpc091dGdvaW5nS2V5RXJyb3I6IGZhbHNlLFxuICAgICAgICBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5OiBmYWxzZSxcbiAgICAgIH0sXG4gICAgXSxcbiAgfSk7XG4gIHJldHVybiA8TWVzc2FnZURldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IERlbGl2ZXJlZE91dGdvaW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgcHJvcHMgPSBjcmVhdGVQcm9wcyh7XG4gICAgbWVzc2FnZToge1xuICAgICAgLi4uZGVmYXVsdE1lc3NhZ2UsXG4gICAgICBkaXJlY3Rpb246ICdvdXRnb2luZycsXG4gICAgICB0ZXh0OiAnQSBtZXNzYWdlIHRvIE1heCcsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiA8TWVzc2FnZURldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IE1lc3NhZ2VTdGF0dXNlcyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3RzOiBbXG4gICAgICB7XG4gICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnTWF4JyxcbiAgICAgICAgfSksXG4gICAgICAgIGlzT3V0Z29pbmdLZXlFcnJvcjogZmFsc2UsXG4gICAgICAgIGlzVW5pZGVudGlmaWVkRGVsaXZlcnk6IGZhbHNlLFxuICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuU2VudCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnU2FsbHknLFxuICAgICAgICB9KSxcbiAgICAgICAgaXNPdXRnb2luZ0tleUVycm9yOiBmYWxzZSxcbiAgICAgICAgaXNVbmlkZW50aWZpZWREZWxpdmVyeTogZmFsc2UsXG4gICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5QZW5kaW5nLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdUZXJyeScsXG4gICAgICAgIH0pLFxuICAgICAgICBpc091dGdvaW5nS2V5RXJyb3I6IGZhbHNlLFxuICAgICAgICBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5OiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkZhaWxlZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnVGhlbycsXG4gICAgICAgIH0pLFxuICAgICAgICBpc091dGdvaW5nS2V5RXJyb3I6IGZhbHNlLFxuICAgICAgICBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5OiBmYWxzZSxcbiAgICAgICAgc3RhdHVzOiBTZW5kU3RhdHVzLkRlbGl2ZXJlZCxcbiAgICAgIH0sXG4gICAgICB7XG4gICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnTmlra2knLFxuICAgICAgICB9KSxcbiAgICAgICAgaXNPdXRnb2luZ0tleUVycm9yOiBmYWxzZSxcbiAgICAgICAgaXNVbmlkZW50aWZpZWREZWxpdmVyeTogZmFsc2UsXG4gICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5SZWFkLFxuICAgICAgfSxcbiAgICBdLFxuICAgIG1lc3NhZ2U6IHtcbiAgICAgIC4uLmRlZmF1bHRNZXNzYWdlLFxuICAgICAgY29udmVyc2F0aW9uVHlwZTogJ2dyb3VwJyxcbiAgICAgIHRleHQ6ICdBIG1lc3NhZ2UgdG8geW91IGFsbCEnLFxuICAgIH0sXG4gIH0pO1xuICByZXR1cm4gPE1lc3NhZ2VEZXRhaWwgey4uLnByb3BzfSAvPjtcbn07XG5cbmV4cG9ydCBjb25zdCBOb3REZWxpdmVyZWQgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICBjb25zdCBwcm9wcyA9IGNyZWF0ZVByb3BzKHtcbiAgICBtZXNzYWdlOiB7XG4gICAgICAuLi5kZWZhdWx0TWVzc2FnZSxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIHRleHQ6ICdBIG1lc3NhZ2UgdG8gTWF4JyxcbiAgICB9LFxuICB9KTtcbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbiAgcHJvcHMucmVjZWl2ZWRBdCA9IHVuZGVmaW5lZCBhcyBhbnk7XG5cbiAgcmV0dXJuIDxNZXNzYWdlRGV0YWlsIHsuLi5wcm9wc30gLz47XG59O1xuXG5leHBvcnQgY29uc3QgTm9Db250YWN0cyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGNvbnRhY3RzOiBbXSxcbiAgICBtZXNzYWdlOiB7XG4gICAgICAuLi5kZWZhdWx0TWVzc2FnZSxcbiAgICAgIGRpcmVjdGlvbjogJ291dGdvaW5nJyxcbiAgICAgIHRleHQ6ICdJcyBhbnlib2R5IHRoZXJlPycsXG4gICAgfSxcbiAgfSk7XG4gIHJldHVybiA8TWVzc2FnZURldGFpbCB7Li4ucHJvcHN9IC8+O1xufTtcblxuZXhwb3J0IGNvbnN0IEFsbEVycm9ycyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IHByb3BzID0gY3JlYXRlUHJvcHMoe1xuICAgIGVycm9yczogW1xuICAgICAge1xuICAgICAgICBuYW1lOiAnQW5vdGhlciBFcnJvcicsXG4gICAgICAgIG1lc3NhZ2U6ICdXb3csIHRoYXQgd2VudCBiYWQuJyxcbiAgICAgIH0sXG4gICAgXSxcbiAgICBtZXNzYWdlOiB7XG4gICAgICAuLi5kZWZhdWx0TWVzc2FnZSxcbiAgICB9LFxuICAgIGNvbnRhY3RzOiBbXG4gICAgICB7XG4gICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIHRpdGxlOiAnTWF4JyxcbiAgICAgICAgfSksXG4gICAgICAgIGlzT3V0Z29pbmdLZXlFcnJvcjogdHJ1ZSxcbiAgICAgICAgaXNVbmlkZW50aWZpZWREZWxpdmVyeTogZmFsc2UsXG4gICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICB9LFxuICAgICAge1xuICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICB0aXRsZTogJ1NhbGx5JyxcbiAgICAgICAgfSksXG4gICAgICAgIGVycm9yczogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIG5hbWU6ICdCaWcgRXJyb3InLFxuICAgICAgICAgICAgbWVzc2FnZTogJ1N0dWZmIGhhcHBlbmVkLCBpbiBhIGJhZCB3YXkuJyxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBpc091dGdvaW5nS2V5RXJyb3I6IGZhbHNlLFxuICAgICAgICBpc1VuaWRlbnRpZmllZERlbGl2ZXJ5OiB0cnVlLFxuICAgICAgICBzdGF0dXM6IFNlbmRTdGF0dXMuRmFpbGVkLFxuICAgICAgfSxcbiAgICAgIHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgdGl0bGU6ICdUZXJyeScsXG4gICAgICAgIH0pLFxuICAgICAgICBpc091dGdvaW5nS2V5RXJyb3I6IHRydWUsXG4gICAgICAgIGlzVW5pZGVudGlmaWVkRGVsaXZlcnk6IHRydWUsXG4gICAgICAgIHN0YXR1czogU2VuZFN0YXR1cy5GYWlsZWQsXG4gICAgICB9LFxuICAgIF0sXG4gIH0pO1xuICByZXR1cm4gPE1lc3NhZ2VEZXRhaWwgey4uLnByb3BzfSAvPjtcbn07XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFFdkIsMkJBQXVCO0FBQ3ZCLHlCQUF1QjtBQUd2QixxQkFBOEI7QUFFOUIsMkJBQThCO0FBQzlCLDhCQUEyQjtBQUMzQiwrQkFBMkI7QUFDM0Isb0NBQXVDO0FBQ3ZDLHVCQUEwQjtBQUMxQixzQkFBdUI7QUFDdkIsMEJBQTZCO0FBQzdCLGtCQUEwQjtBQUUxQixNQUFNLE9BQU8sZ0NBQVUsTUFBTSx1QkFBVTtBQUV2QyxJQUFPLGdDQUFRO0FBQUEsRUFDYixPQUFPO0FBQ1Q7QUFFQSxNQUFNLGlCQUF1QztBQUFBLEVBQzNDLFFBQVEsMERBQXVCO0FBQUEsSUFDN0IsSUFBSTtBQUFBLElBQ0osT0FBTztBQUFBLEVBQ1QsQ0FBQztBQUFBLEVBQ0QsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsMkJBQTJCO0FBQUEsRUFDM0Isc0JBQXNCO0FBQUEsRUFDdEIsYUFBYTtBQUFBLEVBQ2IsbUJBQW1CO0FBQUEsRUFDbkIsZ0JBQWdCO0FBQUEsRUFDaEIsbUJBQW1CO0FBQUEsRUFDbkIsa0JB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
