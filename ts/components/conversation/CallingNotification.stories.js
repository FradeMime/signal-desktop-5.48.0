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
var CallingNotification_stories_exports = {};
__export(CallingNotification_stories_exports, {
  AcceptedIncomingAudioCall: () => AcceptedIncomingAudioCall,
  AcceptedIncomingVideoCall: () => AcceptedIncomingVideoCall,
  AcceptedOutgoingAudioCall: () => AcceptedOutgoingAudioCall,
  AcceptedOutgoingVideoCall: () => AcceptedOutgoingVideoCall,
  DeclinedIncomingAudioCall: () => DeclinedIncomingAudioCall,
  DeclinedIncomingVideoCall: () => DeclinedIncomingVideoCall,
  DeclinedOutgoingAudioCall: () => DeclinedOutgoingAudioCall,
  DeclinedOutgoingVideoCall: () => DeclinedOutgoingVideoCall,
  GroupCallActiveCallFull: () => GroupCallActiveCallFull,
  GroupCallBySomeone: () => GroupCallBySomeone,
  GroupCallByUnknown: () => GroupCallByUnknown,
  GroupCallByYou: () => GroupCallByYou,
  GroupCallEnded: () => GroupCallEnded,
  GroupCallStartedBySomeoneWithALongName: () => GroupCallStartedBySomeoneWithALongName,
  TwoIncomingDirectCallsBackToBack: () => TwoIncomingDirectCallsBackToBack,
  TwoOutgoingDirectCallsBackToBack: () => TwoOutgoingDirectCallsBackToBack,
  default: () => CallingNotification_stories_default
});
module.exports = __toCommonJS(CallingNotification_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_setupI18n = require("../../util/setupI18n");
var import_messages = __toESM(require("../../../_locales/en/messages.json"));
var import_Calling = require("../../types/Calling");
var import_CallingNotification = require("./CallingNotification");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
var CallingNotification_stories_default = {
  title: "Components/Conversation/CallingNotification"
};
const getCommonProps = /* @__PURE__ */ __name(() => ({
  conversationId: "fake-conversation-id",
  i18n,
  isNextItemCallingNotification: false,
  messageId: "fake-message-id",
  now: Date.now(),
  returnToActiveCall: (0, import_addon_actions.action)("returnToActiveCall"),
  startCallingLobby: (0, import_addon_actions.action)("startCallingLobby")
}), "getCommonProps");
const AcceptedIncomingAudioCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: 16188948e5,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: false,
  wasIncoming: true,
  wasVideoCall: false
}), "AcceptedIncomingAudioCall");
const AcceptedIncomingVideoCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: 16188948e5,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: false,
  wasIncoming: true,
  wasVideoCall: true
}), "AcceptedIncomingVideoCall");
const DeclinedIncomingAudioCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: void 0,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: true,
  wasIncoming: true,
  wasVideoCall: false
}), "DeclinedIncomingAudioCall");
const DeclinedIncomingVideoCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: void 0,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: true,
  wasIncoming: true,
  wasVideoCall: true
}), "DeclinedIncomingVideoCall");
const AcceptedOutgoingAudioCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: 16188948e5,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: false,
  wasIncoming: false,
  wasVideoCall: false
}), "AcceptedOutgoingAudioCall");
const AcceptedOutgoingVideoCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: 16188948e5,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: false,
  wasIncoming: false,
  wasVideoCall: true
}), "AcceptedOutgoingVideoCall");
const DeclinedOutgoingAudioCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: void 0,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: true,
  wasIncoming: false,
  wasVideoCall: false
}), "DeclinedOutgoingAudioCall");
const DeclinedOutgoingVideoCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  acceptedTime: void 0,
  callMode: import_Calling.CallMode.Direct,
  endedTime: 16188948e5,
  wasDeclined: true,
  wasIncoming: false,
  wasVideoCall: true
}), "DeclinedOutgoingVideoCall");
const TwoIncomingDirectCallsBackToBack = /* @__PURE__ */ __name(() => {
  const call1 = {
    callMode: import_Calling.CallMode.Direct,
    wasIncoming: true,
    wasVideoCall: true,
    wasDeclined: false,
    acceptedTime: 16188948e5,
    endedTime: 16188948e5
  };
  const call2 = {
    callMode: import_Calling.CallMode.Direct,
    wasIncoming: true,
    wasVideoCall: false,
    wasDeclined: false,
    endedTime: 16188948e5
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
    ...getCommonProps(),
    ...call1,
    isNextItemCallingNotification: true
  }), /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
    ...getCommonProps(),
    ...call2
  }));
}, "TwoIncomingDirectCallsBackToBack");
TwoIncomingDirectCallsBackToBack.story = {
  name: "Two incoming direct calls back-to-back"
};
const TwoOutgoingDirectCallsBackToBack = /* @__PURE__ */ __name(() => {
  const call1 = {
    callMode: import_Calling.CallMode.Direct,
    wasIncoming: false,
    wasVideoCall: true,
    wasDeclined: false,
    acceptedTime: 16188948e5,
    endedTime: 16188948e5
  };
  const call2 = {
    callMode: import_Calling.CallMode.Direct,
    wasIncoming: false,
    wasVideoCall: false,
    wasDeclined: false,
    endedTime: 16188948e5
  };
  return /* @__PURE__ */ React.createElement(React.Fragment, null, /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
    ...getCommonProps(),
    ...call1,
    isNextItemCallingNotification: true
  }), /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
    ...getCommonProps(),
    ...call2
  }));
}, "TwoOutgoingDirectCallsBackToBack");
TwoOutgoingDirectCallsBackToBack.story = {
  name: "Two outgoing direct calls back-to-back"
};
const GroupCallByUnknown = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  callMode: import_Calling.CallMode.Group,
  creator: void 0,
  deviceCount: 15,
  ended: false,
  maxDevices: 16,
  startedTime: 16188948e5
}), "GroupCallByUnknown");
const GroupCallByYou = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  callMode: import_Calling.CallMode.Group,
  creator: { isMe: true, title: "Alicia" },
  deviceCount: 15,
  ended: false,
  maxDevices: 16,
  startedTime: 16188948e5
}), "GroupCallByYou");
const GroupCallBySomeone = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  callMode: import_Calling.CallMode.Group,
  creator: { isMe: false, title: "Alicia" },
  deviceCount: 15,
  ended: false,
  maxDevices: 16,
  startedTime: 16188948e5
}), "GroupCallBySomeone");
const GroupCallStartedBySomeoneWithALongName = /* @__PURE__ */ __name(() => {
  const longName = "\u{1F624}\u{1FA90}\u{1F986}".repeat(50);
  return /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
    ...getCommonProps(),
    callMode: import_Calling.CallMode.Group,
    creator: {
      isMe: false,
      title: longName
    },
    deviceCount: 15,
    ended: false,
    maxDevices: 16,
    startedTime: 16188948e5
  });
}, "GroupCallStartedBySomeoneWithALongName");
GroupCallStartedBySomeoneWithALongName.story = {
  name: "Group call: started by someone with a long name"
};
const GroupCallActiveCallFull = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  callMode: import_Calling.CallMode.Group,
  deviceCount: 16,
  ended: false,
  maxDevices: 16,
  startedTime: 16188948e5
}), "GroupCallActiveCallFull");
GroupCallActiveCallFull.story = {
  name: "Group call: active, call full"
};
const GroupCallEnded = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallingNotification.CallingNotification, {
  ...getCommonProps(),
  callMode: import_Calling.CallMode.Group,
  deviceCount: 0,
  ended: true,
  maxDevices: 16,
  startedTime: 16188948e5
}), "GroupCallEnded");
GroupCallEnded.story = {
  name: "Group call: ended"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  AcceptedIncomingAudioCall,
  AcceptedIncomingVideoCall,
  AcceptedOutgoingAudioCall,
  AcceptedOutgoingVideoCall,
  DeclinedIncomingAudioCall,
  DeclinedIncomingVideoCall,
  DeclinedOutgoingAudioCall,
  DeclinedOutgoingVideoCall,
  GroupCallActiveCallFull,
  GroupCallBySomeone,
  GroupCallByUnknown,
  GroupCallByYou,
  GroupCallEnded,
  GroupCallStartedBySomeoneWithALongName,
  TwoIncomingDirectCallsBackToBack,
  TwoOutgoingDirectCallsBackToBack
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbGluZ05vdGlmaWNhdGlvbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjEtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGFjdGlvbiB9IGZyb20gJ0BzdG9yeWJvb2svYWRkb24tYWN0aW9ucyc7XG5cbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uLy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCBlbk1lc3NhZ2VzIGZyb20gJy4uLy4uLy4uL19sb2NhbGVzL2VuL21lc3NhZ2VzLmpzb24nO1xuaW1wb3J0IHsgQ2FsbE1vZGUgfSBmcm9tICcuLi8uLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IENhbGxpbmdOb3RpZmljYXRpb24gfSBmcm9tICcuL0NhbGxpbmdOb3RpZmljYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBDYWxsaW5nTm90aWZpY2F0aW9uVHlwZSB9IGZyb20gJy4uLy4uL3V0aWwvY2FsbGluZ05vdGlmaWNhdGlvbic7XG5cbmNvbnN0IGkxOG4gPSBzZXR1cEkxOG4oJ2VuJywgZW5NZXNzYWdlcyk7XG5cbmV4cG9ydCBkZWZhdWx0IHtcbiAgdGl0bGU6ICdDb21wb25lbnRzL0NvbnZlcnNhdGlvbi9DYWxsaW5nTm90aWZpY2F0aW9uJyxcbn07XG5cbmNvbnN0IGdldENvbW1vblByb3BzID0gKCkgPT4gKHtcbiAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gIGkxOG4sXG4gIGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uOiBmYWxzZSxcbiAgbWVzc2FnZUlkOiAnZmFrZS1tZXNzYWdlLWlkJyxcbiAgbm93OiBEYXRlLm5vdygpLFxuICByZXR1cm5Ub0FjdGl2ZUNhbGw6IGFjdGlvbigncmV0dXJuVG9BY3RpdmVDYWxsJyksXG4gIHN0YXJ0Q2FsbGluZ0xvYmJ5OiBhY3Rpb24oJ3N0YXJ0Q2FsbGluZ0xvYmJ5JyksXG59KTtcblxuLypcbjxDYWxsaW5nTm90aWZpY2F0aW9uXG4gIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICBhY2NlcHRlZFRpbWU9e3dhc0RlY2xpbmVkID8gdW5kZWZpbmVkIDogMTYxODg5NDgwMDAwMH1cbiAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgZW5kZWRUaW1lPXsxNjE4ODk0ODAwMDAwfVxuICB3YXNEZWNsaW5lZD17d2FzRGVjbGluZWR9XG4gIHdhc0luY29taW5nPXt3YXNJbmNvbWluZ31cbiAgd2FzVmlkZW9DYWxsPXt3YXNWaWRlb0NhbGx9XG4vPlxuICovXG5cbmV4cG9ydCBjb25zdCBBY2NlcHRlZEluY29taW5nQXVkaW9DYWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBhY2NlcHRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgICBlbmRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgd2FzRGVjbGluZWQ9e2ZhbHNlfVxuICAgIHdhc0luY29taW5nXG4gICAgd2FzVmlkZW9DYWxsPXtmYWxzZX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBBY2NlcHRlZEluY29taW5nVmlkZW9DYWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBhY2NlcHRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgICBlbmRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgd2FzRGVjbGluZWQ9e2ZhbHNlfVxuICAgIHdhc0luY29taW5nXG4gICAgd2FzVmlkZW9DYWxsXG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRGVjbGluZWRJbmNvbWluZ0F1ZGlvQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgYWNjZXB0ZWRUaW1lPXt1bmRlZmluZWR9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgICBlbmRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgd2FzRGVjbGluZWRcbiAgICB3YXNJbmNvbWluZ1xuICAgIHdhc1ZpZGVvQ2FsbD17ZmFsc2V9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRGVjbGluZWRJbmNvbWluZ1ZpZGVvQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgYWNjZXB0ZWRUaW1lPXt1bmRlZmluZWR9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgICBlbmRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgd2FzRGVjbGluZWRcbiAgICB3YXNJbmNvbWluZ1xuICAgIHdhc1ZpZGVvQ2FsbFxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IEFjY2VwdGVkT3V0Z29pbmdBdWRpb0NhbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ05vdGlmaWNhdGlvblxuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIGFjY2VwdGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuRGlyZWN0fVxuICAgIGVuZGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgICB3YXNEZWNsaW5lZD17ZmFsc2V9XG4gICAgd2FzSW5jb21pbmc9e2ZhbHNlfVxuICAgIHdhc1ZpZGVvQ2FsbD17ZmFsc2V9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgQWNjZXB0ZWRPdXRnb2luZ1ZpZGVvQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgYWNjZXB0ZWRUaW1lPXsxNjE4ODk0ODAwMDAwfVxuICAgIGNhbGxNb2RlPXtDYWxsTW9kZS5EaXJlY3R9XG4gICAgZW5kZWRUaW1lPXsxNjE4ODk0ODAwMDAwfVxuICAgIHdhc0RlY2xpbmVkPXtmYWxzZX1cbiAgICB3YXNJbmNvbWluZz17ZmFsc2V9XG4gICAgd2FzVmlkZW9DYWxsXG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgRGVjbGluZWRPdXRnb2luZ0F1ZGlvQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgYWNjZXB0ZWRUaW1lPXt1bmRlZmluZWR9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkRpcmVjdH1cbiAgICBlbmRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgd2FzRGVjbGluZWRcbiAgICB3YXNJbmNvbWluZz17ZmFsc2V9XG4gICAgd2FzVmlkZW9DYWxsPXtmYWxzZX1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBEZWNsaW5lZE91dGdvaW5nVmlkZW9DYWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBhY2NlcHRlZFRpbWU9e3VuZGVmaW5lZH1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuRGlyZWN0fVxuICAgIGVuZGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgICB3YXNEZWNsaW5lZFxuICAgIHdhc0luY29taW5nPXtmYWxzZX1cbiAgICB3YXNWaWRlb0NhbGxcbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBUd29JbmNvbWluZ0RpcmVjdENhbGxzQmFja1RvQmFjayA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIGNvbnN0IGNhbGwxOiBDYWxsaW5nTm90aWZpY2F0aW9uVHlwZSA9IHtcbiAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgIHdhc0luY29taW5nOiB0cnVlLFxuICAgIHdhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgYWNjZXB0ZWRUaW1lOiAxNjE4ODk0ODAwMDAwLFxuICAgIGVuZGVkVGltZTogMTYxODg5NDgwMDAwMCxcbiAgfTtcbiAgY29uc3QgY2FsbDI6IENhbGxpbmdOb3RpZmljYXRpb25UeXBlID0ge1xuICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgd2FzSW5jb21pbmc6IHRydWUsXG4gICAgd2FzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgZW5kZWRUaW1lOiAxNjE4ODk0ODAwMDAwLFxuICB9O1xuXG4gIHJldHVybiAoXG4gICAgPD5cbiAgICAgIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgICAgICB7Li4uY2FsbDF9XG4gICAgICAgIGlzTmV4dEl0ZW1DYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgICAvPlxuICAgICAgPENhbGxpbmdOb3RpZmljYXRpb24gey4uLmdldENvbW1vblByb3BzKCl9IHsuLi5jYWxsMn0gLz5cbiAgICA8Lz5cbiAgKTtcbn07XG5cblR3b0luY29taW5nRGlyZWN0Q2FsbHNCYWNrVG9CYWNrLnN0b3J5ID0ge1xuICBuYW1lOiAnVHdvIGluY29taW5nIGRpcmVjdCBjYWxscyBiYWNrLXRvLWJhY2snLFxufTtcblxuZXhwb3J0IGNvbnN0IFR3b091dGdvaW5nRGlyZWN0Q2FsbHNCYWNrVG9CYWNrID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgY2FsbDE6IENhbGxpbmdOb3RpZmljYXRpb25UeXBlID0ge1xuICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgd2FzSW5jb21pbmc6IGZhbHNlLFxuICAgIHdhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgYWNjZXB0ZWRUaW1lOiAxNjE4ODk0ODAwMDAwLFxuICAgIGVuZGVkVGltZTogMTYxODg5NDgwMDAwMCxcbiAgfTtcbiAgY29uc3QgY2FsbDI6IENhbGxpbmdOb3RpZmljYXRpb25UeXBlID0ge1xuICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgd2FzSW5jb21pbmc6IGZhbHNlLFxuICAgIHdhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgd2FzRGVjbGluZWQ6IGZhbHNlLFxuICAgIGVuZGVkVGltZTogMTYxODg5NDgwMDAwMCxcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDw+XG4gICAgICA8Q2FsbGluZ05vdGlmaWNhdGlvblxuICAgICAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICAgICAgey4uLmNhbGwxfVxuICAgICAgICBpc05leHRJdGVtQ2FsbGluZ05vdGlmaWNhdGlvblxuICAgICAgLz5cbiAgICAgIDxDYWxsaW5nTm90aWZpY2F0aW9uIHsuLi5nZXRDb21tb25Qcm9wcygpfSB7Li4uY2FsbDJ9IC8+XG4gICAgPC8+XG4gICk7XG59O1xuXG5Ud29PdXRnb2luZ0RpcmVjdENhbGxzQmFja1RvQmFjay5zdG9yeSA9IHtcbiAgbmFtZTogJ1R3byBvdXRnb2luZyBkaXJlY3QgY2FsbHMgYmFjay10by1iYWNrJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxCeVVua25vd24gPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ05vdGlmaWNhdGlvblxuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIGNhbGxNb2RlPXtDYWxsTW9kZS5Hcm91cH1cbiAgICBjcmVhdG9yPXt1bmRlZmluZWR9XG4gICAgZGV2aWNlQ291bnQ9ezE1fVxuICAgIGVuZGVkPXtmYWxzZX1cbiAgICBtYXhEZXZpY2VzPXsxNn1cbiAgICBzdGFydGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxCeVlvdSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsaW5nTm90aWZpY2F0aW9uXG4gICAgey4uLmdldENvbW1vblByb3BzKCl9XG4gICAgY2FsbE1vZGU9e0NhbGxNb2RlLkdyb3VwfVxuICAgIGNyZWF0b3I9e3sgaXNNZTogdHJ1ZSwgdGl0bGU6ICdBbGljaWEnIH19XG4gICAgZGV2aWNlQ291bnQ9ezE1fVxuICAgIGVuZGVkPXtmYWxzZX1cbiAgICBtYXhEZXZpY2VzPXsxNn1cbiAgICBzdGFydGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgLz5cbik7XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxCeVNvbWVvbmUgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbGluZ05vdGlmaWNhdGlvblxuICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgIGNhbGxNb2RlPXtDYWxsTW9kZS5Hcm91cH1cbiAgICBjcmVhdG9yPXt7IGlzTWU6IGZhbHNlLCB0aXRsZTogJ0FsaWNpYScgfX1cbiAgICBkZXZpY2VDb3VudD17MTV9XG4gICAgZW5kZWQ9e2ZhbHNlfVxuICAgIG1heERldmljZXM9ezE2fVxuICAgIHN0YXJ0ZWRUaW1lPXsxNjE4ODk0ODAwMDAwfVxuICAvPlxuKTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbFN0YXJ0ZWRCeVNvbWVvbmVXaXRoQUxvbmdOYW1lID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgY29uc3QgbG9uZ05hbWUgPSAnXHVEODNEXHVERTI0XHVEODNFXHVERTkwXHVEODNFXHVERDg2Jy5yZXBlYXQoNTApO1xuXG4gIHJldHVybiAoXG4gICAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICAgIHsuLi5nZXRDb21tb25Qcm9wcygpfVxuICAgICAgY2FsbE1vZGU9e0NhbGxNb2RlLkdyb3VwfVxuICAgICAgY3JlYXRvcj17e1xuICAgICAgICBpc01lOiBmYWxzZSxcbiAgICAgICAgdGl0bGU6IGxvbmdOYW1lLFxuICAgICAgfX1cbiAgICAgIGRldmljZUNvdW50PXsxNX1cbiAgICAgIGVuZGVkPXtmYWxzZX1cbiAgICAgIG1heERldmljZXM9ezE2fVxuICAgICAgc3RhcnRlZFRpbWU9ezE2MTg4OTQ4MDAwMDB9XG4gICAgLz5cbiAgKTtcbn07XG5cbkdyb3VwQ2FsbFN0YXJ0ZWRCeVNvbWVvbmVXaXRoQUxvbmdOYW1lLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogc3RhcnRlZCBieSBzb21lb25lIHdpdGggYSBsb25nIG5hbWUnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbEFjdGl2ZUNhbGxGdWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuR3JvdXB9XG4gICAgZGV2aWNlQ291bnQ9ezE2fVxuICAgIGVuZGVkPXtmYWxzZX1cbiAgICBtYXhEZXZpY2VzPXsxNn1cbiAgICBzdGFydGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgLz5cbik7XG5cbkdyb3VwQ2FsbEFjdGl2ZUNhbGxGdWxsLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogYWN0aXZlLCBjYWxsIGZ1bGwnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbEVuZGVkID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxpbmdOb3RpZmljYXRpb25cbiAgICB7Li4uZ2V0Q29tbW9uUHJvcHMoKX1cbiAgICBjYWxsTW9kZT17Q2FsbE1vZGUuR3JvdXB9XG4gICAgZGV2aWNlQ291bnQ9ezB9XG4gICAgZW5kZWRcbiAgICBtYXhEZXZpY2VzPXsxNn1cbiAgICBzdGFydGVkVGltZT17MTYxODg5NDgwMDAwMH1cbiAgLz5cbik7XG5cbkdyb3VwQ2FsbEVuZGVkLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbDogZW5k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QixVQUFVLHdCQUFTO0FBQUEsRUFDbkIsU0FBUztBQUFBLEVBQ1QsYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLENBQ2YsR0FUZ0M7QUFZM0IsTUFBTSxpQkFBaUIsNkJBQzVCLG9DQUFDO0FBQUEsS0FDSyxlQUFlO0FBQUEsRUFDbkIsVUFBVSx3QkFBUztBQUFBLEVBQ25CLFNBQVMsRUFBRSxNQUFNLE1BQU0sT0FBTyxTQUFTO0FBQUEsRUFDdkMsYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLENBQ2YsR0FUNEI7QUFZdkIsTUFBTSxxQkFBcUIsNkJBQ2hDLG9DQUFDO0FBQUEsS0FDSyxlQUFlO0FBQUEsRUFDbkIsVUFBVSx3QkFBUztBQUFBLEVBQ25CLFNBQVMsRUFBRSxNQUFNLE9BQU8sT0FBTyxTQUFTO0FBQUEsRUFDeEMsYUFBYTtBQUFBLEVBQ2IsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osYUFBYTtBQUFBLENBQ2YsR0FUZ0M7QUFZM0IsTUFBTSx5Q0FBeUMsNkJBQW1CO0FBQ3ZFLFFBQU0sV0FBVyw4QkFBUyxPQUFPLEVBQUU7QUFFbkMsU0FDRSxvQ0FBQztBQUFBLE9BQ0ssZUFBZTtBQUFBLElBQ25CLFVBQVUsd0JBQVM7QUFBQSxJQUNuQixTQUFTO0FBQUEsTUFDUCxNQUFNO0FBQUEsTUFDTixPQUFPO0FBQUEsSUFDVDtBQUFBLElBQ0EsYUFBYTtBQUFBLElBQ2IsT0FBTztBQUFBLElBQ1AsWUFBWTtBQUFBLElBQ1osYUFBYTtBQUFBLEdBQ2Y7QUFFSixHQWpCc0Q7QUFtQnRELHVDQUF1QyxRQUFRO0FBQUEsRUFDN0MsTUFBTTtBQUNSO0FBRU8sTUFBTSwwQkFBMEIsNkJBQ3JDLG9DQUFDO0FBQUEsS0FDSyxlQUFlO0FBQUEsRUFDbkIsVUFBVSx3QkFBUztBQUFBLEVBQ25CLGFBQWE7QUFBQSxFQUNiLE9BQU87QUFBQSxFQUNQLFlBQVk7QUFBQSxFQUNaLGFBQWE7QUFBQSxDQUNmLEdBUnFDO0FBV3ZDLHdCQUF3QixRQUFRO0FBQUEsRUFDOUIsTUFBTTtBQUNSO0FBRU8sTUFBTSxpQkFBaUIsNkJBQzVCLG9DQUFDO0FBQUEsS0FDSyxlQUFlO0FBQUEsRUFDbkIsVUFBVSx3QkFBUztBQUFBLEVBQ25CLGFBQWE7QUFBQSxFQUNiLE9BQUs7QUFBQSxFQUNMLFlBQVk7QUFBQSxFQUNaLGFBQWE7QUFBQSxDQUNmLEdBUjRCO0FBVzlCLGVBQWUsUUFBUTtBQUFBLEVBQ3JCLE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
