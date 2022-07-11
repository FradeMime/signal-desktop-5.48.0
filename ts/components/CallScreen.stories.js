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
var CallScreen_stories_exports = {};
__export(CallScreen_stories_exports, {
  Default: () => Default,
  GroupCall0: () => GroupCall0,
  GroupCall1: () => GroupCall1,
  GroupCallMany: () => GroupCallMany,
  GroupCallReconnecting: () => GroupCallReconnecting,
  GroupCallSomeoneIsSharingScreen: () => GroupCallSomeoneIsSharingScreen,
  GroupCallSomeoneIsSharingScreenAndYoureReconnecting: () => GroupCallSomeoneIsSharingScreenAndYoureReconnecting,
  HasLocalAudio: () => HasLocalAudio,
  HasLocalVideo: () => HasLocalVideo,
  HasRemoteVideo: () => HasRemoteVideo,
  PreRing: () => PreRing,
  _Ended: () => _Ended,
  _Reconnecting: () => _Reconnecting,
  _Ringing: () => _Ringing,
  default: () => CallScreen_stories_default
});
module.exports = __toCommonJS(CallScreen_stories_exports);
var React = __toESM(require("react"));
var import_lodash = require("lodash");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_addon_actions = require("@storybook/addon-actions");
var import_Calling = require("../types/Calling");
var import_Colors = require("../types/Colors");
var import_CallScreen = require("./CallScreen");
var import_setupI18n = require("../util/setupI18n");
var import_missingCaseError = require("../util/missingCaseError");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeGetGroupCallVideoFrameSource = require("../test-both/helpers/fakeGetGroupCallVideoFrameSource");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
const MAX_PARTICIPANTS = 64;
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
  id: "3051234567",
  avatarPath: void 0,
  color: import_Colors.AvatarColors[0],
  title: "Rick Sanchez",
  name: "Rick Sanchez",
  phoneNumber: "3051234567",
  profileName: "Rick Sanchez"
});
const createActiveDirectCallProp = /* @__PURE__ */ __name((overrideProps) => ({
  callMode: import_Calling.CallMode.Direct,
  conversation,
  callState: (0, import_addon_knobs.select)("callState", import_Calling.CallState, overrideProps.callState || import_Calling.CallState.Accepted),
  peekedParticipants: [],
  remoteParticipants: [
    {
      hasRemoteVideo: (0, import_addon_knobs.boolean)("hasRemoteVideo", Boolean(overrideProps.hasRemoteVideo)),
      presenting: false,
      title: "test"
    }
  ]
}), "createActiveDirectCallProp");
const createActiveGroupCallProp = /* @__PURE__ */ __name((overrideProps) => ({
  callMode: import_Calling.CallMode.Group,
  connectionState: overrideProps.connectionState || import_Calling.GroupCallConnectionState.Connected,
  conversationsWithSafetyNumberChanges: [],
  joinState: import_Calling.GroupCallJoinState.Joined,
  maxDevices: 5,
  deviceCount: (overrideProps.remoteParticipants || []).length,
  groupMembers: overrideProps.remoteParticipants || [],
  peekedParticipants: overrideProps.peekedParticipants || overrideProps.remoteParticipants || [],
  remoteParticipants: overrideProps.remoteParticipants || [],
  remoteAudioLevels: /* @__PURE__ */ new Map()
}), "createActiveGroupCallProp");
const createActiveCallProp = /* @__PURE__ */ __name((overrideProps) => {
  const baseResult = {
    joinedAt: Date.now(),
    conversation,
    hasLocalAudio: (0, import_addon_knobs.boolean)("hasLocalAudio", overrideProps.hasLocalAudio || false),
    hasLocalVideo: (0, import_addon_knobs.boolean)("hasLocalVideo", overrideProps.hasLocalVideo || false),
    localAudioLevel: (0, import_addon_knobs.select)("localAudioLevel", [0, 0.5, 1], overrideProps.localAudioLevel || 0),
    viewMode: (0, import_addon_knobs.select)("viewMode", [import_Calling.CallViewMode.Grid, import_Calling.CallViewMode.Speaker, import_Calling.CallViewMode.Presentation], overrideProps.viewMode || import_Calling.CallViewMode.Grid),
    outgoingRing: true,
    pip: false,
    settingsDialogOpen: false,
    showParticipantsList: false
  };
  switch (overrideProps.callMode) {
    case import_Calling.CallMode.Direct:
      return { ...baseResult, ...createActiveDirectCallProp(overrideProps) };
    case import_Calling.CallMode.Group:
      return { ...baseResult, ...createActiveGroupCallProp(overrideProps) };
    default:
      throw (0, import_missingCaseError.missingCaseError)(overrideProps);
  }
}, "createActiveCallProp");
const createProps = /* @__PURE__ */ __name((overrideProps = {
  callMode: import_Calling.CallMode.Direct
}) => ({
  activeCall: createActiveCallProp(overrideProps),
  getGroupCallVideoFrameSource: import_fakeGetGroupCallVideoFrameSource.fakeGetGroupCallVideoFrameSource,
  getPresentingSources: (0, import_addon_actions.action)("get-presenting-sources"),
  hangUpActiveCall: (0, import_addon_actions.action)("hang-up"),
  i18n,
  me: (0, import_getDefaultConversation.getDefaultConversation)({
    color: import_Colors.AvatarColors[1],
    id: "6146087e-f7ef-457e-9a8d-47df1fdd6b25",
    name: "Morty Smith",
    profileName: "Morty Smith",
    title: "Morty Smith",
    uuid: "3c134598-eecb-42ab-9ad3-2b0873f771b2"
  }),
  openSystemPreferencesAction: (0, import_addon_actions.action)("open-system-preferences-action"),
  setGroupCallVideoRequest: (0, import_addon_actions.action)("set-group-call-video-request"),
  setLocalAudio: (0, import_addon_actions.action)("set-local-audio"),
  setLocalPreview: (0, import_addon_actions.action)("set-local-preview"),
  setLocalVideo: (0, import_addon_actions.action)("set-local-video"),
  setPresenting: (0, import_addon_actions.action)("toggle-presenting"),
  setRendererCanvas: (0, import_addon_actions.action)("set-renderer-canvas"),
  stickyControls: (0, import_addon_knobs.boolean)("stickyControls", false),
  switchToPresentationView: (0, import_addon_actions.action)("switch-to-presentation-view"),
  switchFromPresentationView: (0, import_addon_actions.action)("switch-from-presentation-view"),
  toggleParticipants: (0, import_addon_actions.action)("toggle-participants"),
  togglePip: (0, import_addon_actions.action)("toggle-pip"),
  toggleScreenRecordingPermissionsDialog: (0, import_addon_actions.action)("toggle-screen-recording-permissions-dialog"),
  toggleSettings: (0, import_addon_actions.action)("toggle-settings"),
  toggleSpeakerView: (0, import_addon_actions.action)("toggle-speaker-view")
}), "createProps");
var CallScreen_stories_default = {
  title: "Components/CallScreen"
};
const Default = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps()
  });
}, "Default");
const PreRing = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Prering
    })
  });
}, "PreRing");
PreRing.story = {
  name: "Pre-Ring"
};
const _Ringing = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Ringing
    })
  });
}, "_Ringing");
const _Reconnecting = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Reconnecting
    })
  });
}, "_Reconnecting");
const _Ended = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Ended
    })
  });
}, "_Ended");
const HasLocalAudio = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      hasLocalAudio: true
    })
  });
}, "HasLocalAudio");
HasLocalAudio.story = {
  name: "hasLocalAudio"
};
const HasLocalVideo = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      hasLocalVideo: true
    })
  });
}, "HasLocalVideo");
HasLocalVideo.story = {
  name: "hasLocalVideo"
};
const HasRemoteVideo = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Direct,
      hasRemoteVideo: true
    })
  });
}, "HasRemoteVideo");
HasRemoteVideo.story = {
  name: "hasRemoteVideo"
};
const GroupCall1 = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
  ...createProps({
    callMode: import_Calling.CallMode.Group,
    remoteParticipants: [
      {
        demuxId: 0,
        hasRemoteAudio: true,
        hasRemoteVideo: true,
        presenting: false,
        sharingScreen: false,
        videoAspectRatio: 1.3,
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          isBlocked: false,
          uuid: "72fa60e5-25fb-472d-8a56-e56867c57dda",
          title: "Tyler"
        })
      }
    ]
  })
}), "GroupCall1");
GroupCall1.story = {
  name: "Group call - 1"
};
const allRemoteParticipants = (0, import_lodash.times)(MAX_PARTICIPANTS).map((index) => ({
  demuxId: index,
  hasRemoteAudio: index % 3 !== 0,
  hasRemoteVideo: index % 4 !== 0,
  presenting: false,
  sharingScreen: false,
  videoAspectRatio: 1.3,
  ...(0, import_getDefaultConversation.getDefaultConversationWithUuid)({
    isBlocked: index === 10 || index === MAX_PARTICIPANTS - 1,
    title: `Participant ${index + 1}`
  })
}));
const GroupCallMany = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
    ...createProps({
      callMode: import_Calling.CallMode.Group,
      remoteParticipants: allRemoteParticipants.slice(0, (0, import_addon_knobs.number)("Participant count", 40, {
        range: true,
        min: 0,
        max: MAX_PARTICIPANTS,
        step: 1
      }))
    })
  });
}, "GroupCallMany");
GroupCallMany.story = {
  name: "Group call - Many"
};
const GroupCallReconnecting = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
  ...createProps({
    callMode: import_Calling.CallMode.Group,
    connectionState: import_Calling.GroupCallConnectionState.Reconnecting,
    remoteParticipants: [
      {
        demuxId: 0,
        hasRemoteAudio: true,
        hasRemoteVideo: true,
        presenting: false,
        sharingScreen: false,
        videoAspectRatio: 1.3,
        ...(0, import_getDefaultConversation.getDefaultConversation)({
          isBlocked: false,
          title: "Tyler",
          uuid: "33871c64-0c22-45ce-8aa4-0ec237ac4a31"
        })
      }
    ]
  })
}), "GroupCallReconnecting");
GroupCallReconnecting.story = {
  name: "Group call - reconnecting"
};
const GroupCall0 = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
  ...createProps({
    callMode: import_Calling.CallMode.Group,
    remoteParticipants: []
  })
}), "GroupCall0");
GroupCall0.story = {
  name: "Group call - 0"
};
const GroupCallSomeoneIsSharingScreen = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
  ...createProps({
    callMode: import_Calling.CallMode.Group,
    remoteParticipants: allRemoteParticipants.slice(0, 5).map((participant, index) => ({
      ...participant,
      presenting: index === 1,
      sharingScreen: index === 1
    }))
  })
}), "GroupCallSomeoneIsSharingScreen");
GroupCallSomeoneIsSharingScreen.story = {
  name: "Group call - someone is sharing screen"
};
const GroupCallSomeoneIsSharingScreenAndYoureReconnecting = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallScreen.CallScreen, {
  ...createProps({
    callMode: import_Calling.CallMode.Group,
    connectionState: import_Calling.GroupCallConnectionState.Reconnecting,
    remoteParticipants: allRemoteParticipants.slice(0, 5).map((participant, index) => ({
      ...participant,
      presenting: index === 1,
      sharingScreen: index === 1
    }))
  })
}), "GroupCallSomeoneIsSharingScreenAndYoureReconnecting");
GroupCallSomeoneIsSharingScreenAndYoureReconnecting.story = {
  name: "Group call - someone is sharing screen and you're reconnecting"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  Default,
  GroupCall0,
  GroupCall1,
  GroupCallMany,
  GroupCallReconnecting,
  GroupCallSomeoneIsSharingScreen,
  GroupCallSomeoneIsSharingScreenAndYoureReconnecting,
  HasLocalAudio,
  HasLocalVideo,
  HasRemoteVideo,
  PreRing,
  _Ended,
  _Reconnecting,
  _Ringing
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbFNjcmVlbi5zdG9yaWVzLnRzeCJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCAqIGFzIFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHRpbWVzIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IGJvb2xlYW4sIHNlbGVjdCwgbnVtYmVyIH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuXG5pbXBvcnQgdHlwZSB7IEdyb3VwQ2FsbFJlbW90ZVBhcnRpY2lwYW50VHlwZSB9IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHtcbiAgQ2FsbE1vZGUsXG4gIENhbGxWaWV3TW9kZSxcbiAgQ2FsbFN0YXRlLFxuICBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUsXG4gIEdyb3VwQ2FsbEpvaW5TdGF0ZSxcbn0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IFByb3BzVHlwZSB9IGZyb20gJy4vQ2FsbFNjcmVlbic7XG5pbXBvcnQgeyBDYWxsU2NyZWVuIH0gZnJvbSAnLi9DYWxsU2NyZWVuJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHtcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbixcbiAgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbldpdGhVdWlkLFxufSBmcm9tICcuLi90ZXN0LWJvdGgvaGVscGVycy9nZXREZWZhdWx0Q29udmVyc2F0aW9uJztcbmltcG9ydCB7IGZha2VHZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UnO1xuaW1wb3J0IGVuTWVzc2FnZXMgZnJvbSAnLi4vLi4vX2xvY2FsZXMvZW4vbWVzc2FnZXMuanNvbic7XG5cbmNvbnN0IE1BWF9QQVJUSUNJUEFOVFMgPSA2NDtcblxuY29uc3QgaTE4biA9IHNldHVwSTE4bignZW4nLCBlbk1lc3NhZ2VzKTtcblxuY29uc3QgY29udmVyc2F0aW9uID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gIGlkOiAnMzA1MTIzNDU2NycsXG4gIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgY29sb3I6IEF2YXRhckNvbG9yc1swXSxcbiAgdGl0bGU6ICdSaWNrIFNhbmNoZXonLFxuICBuYW1lOiAnUmljayBTYW5jaGV6JyxcbiAgcGhvbmVOdW1iZXI6ICczMDUxMjM0NTY3JyxcbiAgcHJvZmlsZU5hbWU6ICdSaWNrIFNhbmNoZXonLFxufSk7XG5cbnR5cGUgT3ZlcnJpZGVQcm9wc0Jhc2UgPSB7XG4gIGhhc0xvY2FsQXVkaW8/OiBib29sZWFuO1xuICBoYXNMb2NhbFZpZGVvPzogYm9vbGVhbjtcbiAgbG9jYWxBdWRpb0xldmVsPzogbnVtYmVyO1xuICB2aWV3TW9kZT86IENhbGxWaWV3TW9kZTtcbn07XG5cbnR5cGUgRGlyZWN0Q2FsbE92ZXJyaWRlUHJvcHMgPSBPdmVycmlkZVByb3BzQmFzZSAmIHtcbiAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdDtcbiAgY2FsbFN0YXRlPzogQ2FsbFN0YXRlO1xuICBoYXNSZW1vdGVWaWRlbz86IGJvb2xlYW47XG59O1xuXG50eXBlIEdyb3VwQ2FsbE92ZXJyaWRlUHJvcHMgPSBPdmVycmlkZVByb3BzQmFzZSAmIHtcbiAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwO1xuICBjb25uZWN0aW9uU3RhdGU/OiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGU7XG4gIHBlZWtlZFBhcnRpY2lwYW50cz86IEFycmF5PENvbnZlcnNhdGlvblR5cGU+O1xuICByZW1vdGVQYXJ0aWNpcGFudHM/OiBBcnJheTxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGU+O1xufTtcblxuY29uc3QgY3JlYXRlQWN0aXZlRGlyZWN0Q2FsbFByb3AgPSAoXG4gIG92ZXJyaWRlUHJvcHM6IERpcmVjdENhbGxPdmVycmlkZVByb3BzXG4pID0+ICh7XG4gIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QgYXMgQ2FsbE1vZGUuRGlyZWN0LFxuICBjb252ZXJzYXRpb24sXG4gIGNhbGxTdGF0ZTogc2VsZWN0KFxuICAgICdjYWxsU3RhdGUnLFxuICAgIENhbGxTdGF0ZSxcbiAgICBvdmVycmlkZVByb3BzLmNhbGxTdGF0ZSB8fCBDYWxsU3RhdGUuQWNjZXB0ZWRcbiAgKSxcbiAgcGVla2VkUGFydGljaXBhbnRzOiBbXSBhcyBbXSxcbiAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAge1xuICAgICAgaGFzUmVtb3RlVmlkZW86IGJvb2xlYW4oXG4gICAgICAgICdoYXNSZW1vdGVWaWRlbycsXG4gICAgICAgIEJvb2xlYW4ob3ZlcnJpZGVQcm9wcy5oYXNSZW1vdGVWaWRlbylcbiAgICAgICksXG4gICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgIHRpdGxlOiAndGVzdCcsXG4gICAgfSxcbiAgXSBhcyBbXG4gICAge1xuICAgICAgaGFzUmVtb3RlVmlkZW86IGJvb2xlYW47XG4gICAgICBwcmVzZW50aW5nOiBib29sZWFuO1xuICAgICAgdGl0bGU6IHN0cmluZztcbiAgICB9XG4gIF0sXG59KTtcblxuY29uc3QgY3JlYXRlQWN0aXZlR3JvdXBDYWxsUHJvcCA9IChvdmVycmlkZVByb3BzOiBHcm91cENhbGxPdmVycmlkZVByb3BzKSA9PiAoe1xuICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAgYXMgQ2FsbE1vZGUuR3JvdXAsXG4gIGNvbm5lY3Rpb25TdGF0ZTpcbiAgICBvdmVycmlkZVByb3BzLmNvbm5lY3Rpb25TdGF0ZSB8fCBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICBjb252ZXJzYXRpb25zV2l0aFNhZmV0eU51bWJlckNoYW5nZXM6IFtdLFxuICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Kb2luZWQsXG4gIG1heERldmljZXM6IDUsXG4gIGRldmljZUNvdW50OiAob3ZlcnJpZGVQcm9wcy5yZW1vdGVQYXJ0aWNpcGFudHMgfHwgW10pLmxlbmd0aCxcbiAgZ3JvdXBNZW1iZXJzOiBvdmVycmlkZVByb3BzLnJlbW90ZVBhcnRpY2lwYW50cyB8fCBbXSxcbiAgLy8gQmVjYXVzZSByZW1vdGUgcGFydGljaXBhbnRzIGFyZSBhIHN1cGVyc2V0LCB3ZSBjYW4gdXNlIHRoZW0gaW4gcGxhY2Ugb2YgcGVla2VkXG4gIC8vICAgcGFydGljaXBhbnRzLlxuICBwZWVrZWRQYXJ0aWNpcGFudHM6XG4gICAgb3ZlcnJpZGVQcm9wcy5wZWVrZWRQYXJ0aWNpcGFudHMgfHwgb3ZlcnJpZGVQcm9wcy5yZW1vdGVQYXJ0aWNpcGFudHMgfHwgW10sXG4gIHJlbW90ZVBhcnRpY2lwYW50czogb3ZlcnJpZGVQcm9wcy5yZW1vdGVQYXJ0aWNpcGFudHMgfHwgW10sXG4gIHJlbW90ZUF1ZGlvTGV2ZWxzOiBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpLFxufSk7XG5cbmNvbnN0IGNyZWF0ZUFjdGl2ZUNhbGxQcm9wID0gKFxuICBvdmVycmlkZVByb3BzOiBEaXJlY3RDYWxsT3ZlcnJpZGVQcm9wcyB8IEdyb3VwQ2FsbE92ZXJyaWRlUHJvcHNcbikgPT4ge1xuICBjb25zdCBiYXNlUmVzdWx0ID0ge1xuICAgIGpvaW5lZEF0OiBEYXRlLm5vdygpLFxuICAgIGNvbnZlcnNhdGlvbixcbiAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuKFxuICAgICAgJ2hhc0xvY2FsQXVkaW8nLFxuICAgICAgb3ZlcnJpZGVQcm9wcy5oYXNMb2NhbEF1ZGlvIHx8IGZhbHNlXG4gICAgKSxcbiAgICBoYXNMb2NhbFZpZGVvOiBib29sZWFuKFxuICAgICAgJ2hhc0xvY2FsVmlkZW8nLFxuICAgICAgb3ZlcnJpZGVQcm9wcy5oYXNMb2NhbFZpZGVvIHx8IGZhbHNlXG4gICAgKSxcbiAgICBsb2NhbEF1ZGlvTGV2ZWw6IHNlbGVjdChcbiAgICAgICdsb2NhbEF1ZGlvTGV2ZWwnLFxuICAgICAgWzAsIDAuNSwgMV0sXG4gICAgICBvdmVycmlkZVByb3BzLmxvY2FsQXVkaW9MZXZlbCB8fCAwXG4gICAgKSxcbiAgICB2aWV3TW9kZTogc2VsZWN0KFxuICAgICAgJ3ZpZXdNb2RlJyxcbiAgICAgIFtDYWxsVmlld01vZGUuR3JpZCwgQ2FsbFZpZXdNb2RlLlNwZWFrZXIsIENhbGxWaWV3TW9kZS5QcmVzZW50YXRpb25dLFxuICAgICAgb3ZlcnJpZGVQcm9wcy52aWV3TW9kZSB8fCBDYWxsVmlld01vZGUuR3JpZFxuICAgICksXG4gICAgb3V0Z29pbmdSaW5nOiB0cnVlLFxuICAgIHBpcDogZmFsc2UsXG4gICAgc2V0dGluZ3NEaWFsb2dPcGVuOiBmYWxzZSxcbiAgICBzaG93UGFydGljaXBhbnRzTGlzdDogZmFsc2UsXG4gIH07XG5cbiAgc3dpdGNoIChvdmVycmlkZVByb3BzLmNhbGxNb2RlKSB7XG4gICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICByZXR1cm4geyAuLi5iYXNlUmVzdWx0LCAuLi5jcmVhdGVBY3RpdmVEaXJlY3RDYWxsUHJvcChvdmVycmlkZVByb3BzKSB9O1xuICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6XG4gICAgICByZXR1cm4geyAuLi5iYXNlUmVzdWx0LCAuLi5jcmVhdGVBY3RpdmVHcm91cENhbGxQcm9wKG92ZXJyaWRlUHJvcHMpIH07XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3Iob3ZlcnJpZGVQcm9wcyk7XG4gIH1cbn07XG5cbmNvbnN0IGNyZWF0ZVByb3BzID0gKFxuICBvdmVycmlkZVByb3BzOiBEaXJlY3RDYWxsT3ZlcnJpZGVQcm9wcyB8IEdyb3VwQ2FsbE92ZXJyaWRlUHJvcHMgPSB7XG4gICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCBhcyBDYWxsTW9kZS5EaXJlY3QsXG4gIH1cbik6IFByb3BzVHlwZSA9PiAoe1xuICBhY3RpdmVDYWxsOiBjcmVhdGVBY3RpdmVDYWxsUHJvcChvdmVycmlkZVByb3BzKSxcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZTogZmFrZUdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UsXG4gIGdldFByZXNlbnRpbmdTb3VyY2VzOiBhY3Rpb24oJ2dldC1wcmVzZW50aW5nLXNvdXJjZXMnKSxcbiAgaGFuZ1VwQWN0aXZlQ2FsbDogYWN0aW9uKCdoYW5nLXVwJyksXG4gIGkxOG4sXG4gIG1lOiBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBjb2xvcjogQXZhdGFyQ29sb3JzWzFdLFxuICAgIGlkOiAnNjE0NjA4N2UtZjdlZi00NTdlLTlhOGQtNDdkZjFmZGQ2YjI1JyxcbiAgICBuYW1lOiAnTW9ydHkgU21pdGgnLFxuICAgIHByb2ZpbGVOYW1lOiAnTW9ydHkgU21pdGgnLFxuICAgIHRpdGxlOiAnTW9ydHkgU21pdGgnLFxuICAgIHV1aWQ6ICczYzEzNDU5OC1lZWNiLTQyYWItOWFkMy0yYjA4NzNmNzcxYjInLFxuICB9KSxcbiAgb3BlblN5c3RlbVByZWZlcmVuY2VzQWN0aW9uOiBhY3Rpb24oJ29wZW4tc3lzdGVtLXByZWZlcmVuY2VzLWFjdGlvbicpLFxuICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3Q6IGFjdGlvbignc2V0LWdyb3VwLWNhbGwtdmlkZW8tcmVxdWVzdCcpLFxuICBzZXRMb2NhbEF1ZGlvOiBhY3Rpb24oJ3NldC1sb2NhbC1hdWRpbycpLFxuICBzZXRMb2NhbFByZXZpZXc6IGFjdGlvbignc2V0LWxvY2FsLXByZXZpZXcnKSxcbiAgc2V0TG9jYWxWaWRlbzogYWN0aW9uKCdzZXQtbG9jYWwtdmlkZW8nKSxcbiAgc2V0UHJlc2VudGluZzogYWN0aW9uKCd0b2dnbGUtcHJlc2VudGluZycpLFxuICBzZXRSZW5kZXJlckNhbnZhczogYWN0aW9uKCdzZXQtcmVuZGVyZXItY2FudmFzJyksXG4gIHN0aWNreUNvbnRyb2xzOiBib29sZWFuKCdzdGlja3lDb250cm9scycsIGZhbHNlKSxcbiAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3OiBhY3Rpb24oJ3N3aXRjaC10by1wcmVzZW50YXRpb24tdmlldycpLFxuICBzd2l0Y2hGcm9tUHJlc2VudGF0aW9uVmlldzogYWN0aW9uKCdzd2l0Y2gtZnJvbS1wcmVzZW50YXRpb24tdmlldycpLFxuICB0b2dnbGVQYXJ0aWNpcGFudHM6IGFjdGlvbigndG9nZ2xlLXBhcnRpY2lwYW50cycpLFxuICB0b2dnbGVQaXA6IGFjdGlvbigndG9nZ2xlLXBpcCcpLFxuICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZzogYWN0aW9uKFxuICAgICd0b2dnbGUtc2NyZWVuLXJlY29yZGluZy1wZXJtaXNzaW9ucy1kaWFsb2cnXG4gICksXG4gIHRvZ2dsZVNldHRpbmdzOiBhY3Rpb24oJ3RvZ2dsZS1zZXR0aW5ncycpLFxuICB0b2dnbGVTcGVha2VyVmlldzogYWN0aW9uKCd0b2dnbGUtc3BlYWtlci12aWV3JyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ2FsbFNjcmVlbicsXG59O1xuXG5leHBvcnQgY29uc3QgRGVmYXVsdCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiA8Q2FsbFNjcmVlbiB7Li4uY3JlYXRlUHJvcHMoKX0gLz47XG59O1xuXG5leHBvcnQgY29uc3QgUHJlUmluZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhbGxTY3JlZW5cbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLlByZXJpbmcsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuUHJlUmluZy5zdG9yeSA9IHtcbiAgbmFtZTogJ1ByZS1SaW5nJyxcbn07XG5cbmV4cG9ydCBjb25zdCBfUmluZ2luZyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhbGxTY3JlZW5cbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLlJpbmdpbmcsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IF9SZWNvbm5lY3RpbmcgPSAoKTogSlNYLkVsZW1lbnQgPT4ge1xuICByZXR1cm4gKFxuICAgIDxDYWxsU2NyZWVuXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5SZWNvbm5lY3RpbmcsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuZXhwb3J0IGNvbnN0IF9FbmRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhbGxTY3JlZW5cbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLkVuZGVkLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbmV4cG9ydCBjb25zdCBIYXNMb2NhbEF1ZGlvID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q2FsbFNjcmVlblxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgIH0pfVxuICAgIC8+XG4gICk7XG59O1xuXG5IYXNMb2NhbEF1ZGlvLnN0b3J5ID0ge1xuICBuYW1lOiAnaGFzTG9jYWxBdWRpbycsXG59O1xuXG5leHBvcnQgY29uc3QgSGFzTG9jYWxWaWRlbyA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhbGxTY3JlZW5cbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGhhc0xvY2FsVmlkZW86IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuSGFzTG9jYWxWaWRlby5zdG9yeSA9IHtcbiAgbmFtZTogJ2hhc0xvY2FsVmlkZW8nLFxufTtcblxuZXhwb3J0IGNvbnN0IEhhc1JlbW90ZVZpZGVvID0gKCk6IEpTWC5FbGVtZW50ID0+IHtcbiAgcmV0dXJuIChcbiAgICA8Q2FsbFNjcmVlblxuICAgICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICB9KX1cbiAgICAvPlxuICApO1xufTtcblxuSGFzUmVtb3RlVmlkZW8uc3RvcnkgPSB7XG4gIG5hbWU6ICdoYXNSZW1vdGVWaWRlbycsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsMSA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsU2NyZWVuXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgICAgICB7XG4gICAgICAgICAgZGVtdXhJZDogMCxcbiAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiAxLjMsXG4gICAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgICBpc0Jsb2NrZWQ6IGZhbHNlLFxuICAgICAgICAgICAgdXVpZDogJzcyZmE2MGU1LTI1ZmItNDcyZC04YTU2LWU1Njg2N2M1N2RkYScsXG4gICAgICAgICAgICB0aXRsZTogJ1R5bGVyJyxcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Hcm91cENhbGwxLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbCAtIDEnLFxufTtcblxuLy8gV2UgZ2VuZXJhdGUgdGhlc2UgdXBmcm9udCBzbyB0aGF0IHRoZSBsaXN0IGlzIHN0YWJsZSB3aGVuIHlvdSBtb3ZlIHRoZSBzbGlkZXIuXG5jb25zdCBhbGxSZW1vdGVQYXJ0aWNpcGFudHMgPSB0aW1lcyhNQVhfUEFSVElDSVBBTlRTKS5tYXAoaW5kZXggPT4gKHtcbiAgZGVtdXhJZDogaW5kZXgsXG4gIGhhc1JlbW90ZUF1ZGlvOiBpbmRleCAlIDMgIT09IDAsXG4gIGhhc1JlbW90ZVZpZGVvOiBpbmRleCAlIDQgIT09IDAsXG4gIHByZXNlbnRpbmc6IGZhbHNlLFxuICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgdmlkZW9Bc3BlY3RSYXRpbzogMS4zLFxuICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICAgIGlzQmxvY2tlZDogaW5kZXggPT09IDEwIHx8IGluZGV4ID09PSBNQVhfUEFSVElDSVBBTlRTIC0gMSxcbiAgICB0aXRsZTogYFBhcnRpY2lwYW50ICR7aW5kZXggKyAxfWAsXG4gIH0pLFxufSkpO1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsTWFueSA9ICgpOiBKU1guRWxlbWVudCA9PiB7XG4gIHJldHVybiAoXG4gICAgPENhbGxTY3JlZW5cbiAgICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBhbGxSZW1vdGVQYXJ0aWNpcGFudHMuc2xpY2UoXG4gICAgICAgICAgMCxcbiAgICAgICAgICBudW1iZXIoJ1BhcnRpY2lwYW50IGNvdW50JywgNDAsIHtcbiAgICAgICAgICAgIHJhbmdlOiB0cnVlLFxuICAgICAgICAgICAgbWluOiAwLFxuICAgICAgICAgICAgbWF4OiBNQVhfUEFSVElDSVBBTlRTLFxuICAgICAgICAgICAgc3RlcDogMSxcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcbn07XG5cbkdyb3VwQ2FsbE1hbnkuc3RvcnkgPSB7XG4gIG5hbWU6ICdHcm91cCBjYWxsIC0gTWFueScsXG59O1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsUmVjb25uZWN0aW5nID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxTY3JlZW5cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nLFxuICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgIHtcbiAgICAgICAgICBkZW11eElkOiAwLFxuICAgICAgICAgIGhhc1JlbW90ZUF1ZGlvOiB0cnVlLFxuICAgICAgICAgIGhhc1JlbW90ZVZpZGVvOiB0cnVlLFxuICAgICAgICAgIHByZXNlbnRpbmc6IGZhbHNlLFxuICAgICAgICAgIHNoYXJpbmdTY3JlZW46IGZhbHNlLFxuICAgICAgICAgIHZpZGVvQXNwZWN0UmF0aW86IDEuMyxcbiAgICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGlzQmxvY2tlZDogZmFsc2UsXG4gICAgICAgICAgICB0aXRsZTogJ1R5bGVyJyxcbiAgICAgICAgICAgIHV1aWQ6ICczMzg3MWM2NC0wYzIyLTQ1Y2UtOGFhNC0wZWMyMzdhYzRhMzEnLFxuICAgICAgICAgIH0pLFxuICAgICAgICB9LFxuICAgICAgXSxcbiAgICB9KX1cbiAgLz5cbik7XG5cbkdyb3VwQ2FsbFJlY29ubmVjdGluZy5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGwgLSByZWNvbm5lY3RpbmcnLFxufTtcblxuZXhwb3J0IGNvbnN0IEdyb3VwQ2FsbDAgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbFNjcmVlblxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgIH0pfVxuICAvPlxuKTtcblxuR3JvdXBDYWxsMC5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGwgLSAwJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxTb21lb25lSXNTaGFyaW5nU2NyZWVuID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxTY3JlZW5cbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBhbGxSZW1vdGVQYXJ0aWNpcGFudHNcbiAgICAgICAgLnNsaWNlKDAsIDUpXG4gICAgICAgIC5tYXAoKHBhcnRpY2lwYW50LCBpbmRleCkgPT4gKHtcbiAgICAgICAgICAuLi5wYXJ0aWNpcGFudCxcbiAgICAgICAgICBwcmVzZW50aW5nOiBpbmRleCA9PT0gMSxcbiAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBpbmRleCA9PT0gMSxcbiAgICAgICAgfSkpLFxuICAgIH0pfVxuICAvPlxuKTtcblxuR3JvdXBDYWxsU29tZW9uZUlzU2hhcmluZ1NjcmVlbi5zdG9yeSA9IHtcbiAgbmFtZTogJ0dyb3VwIGNhbGwgLSBzb21lb25lIGlzIHNoYXJpbmcgc2NyZWVuJyxcbn07XG5cbmV4cG9ydCBjb25zdCBHcm91cENhbGxTb21lb25lSXNTaGFyaW5nU2NyZWVuQW5kWW91cmVSZWNvbm5lY3RpbmcgPVxuICAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICAgIDxDYWxsU2NyZWVuXG4gICAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZyxcbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBhbGxSZW1vdGVQYXJ0aWNpcGFudHNcbiAgICAgICAgICAuc2xpY2UoMCwgNSlcbiAgICAgICAgICAubWFwKChwYXJ0aWNpcGFudCwgaW5kZXgpID0+ICh7XG4gICAgICAgICAgICAuLi5wYXJ0aWNpcGFudCxcbiAgICAgICAgICAgIHByZXNlbnRpbmc6IGluZGV4ID09PSAxLFxuICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogaW5kZXggPT09IDEsXG4gICAgICAgICAgfSkpLFxuICAgICAgfSl9XG4gICAgLz5cbiAgKTtcblxuR3JvdXBDYWxsU29tZW9uZUlzU2hhcmluZ1NjcmVlbkFuZFlvdXJlUmVjb25uZWN0aW5nLnN0b3J5ID0ge1xuICBuYW1lOiBcIkdyb3VwIGNhbGwgLSBzb21lb25lIGlzIHNoYXJpbmcgc2NyZWVuIGFuZCB5b3UncmUgcmVjb25uZWN0aW5nXCIsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxZQUF1QjtB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QkFBUztBQUFBLElBQ25CLGlCQUFpQix3Q0FBeUI7QUFBQSxJQUMxQyxvQkFBb0I7QUFBQSxNQUNsQjtBQUFBLFFBQ0UsU0FBUztBQUFBLFFBQ1QsZ0JBQWdCO0FBQUEsUUFDaEIsZ0JBQWdCO0FBQUEsUUFDaEIsWUFBWTtBQUFBLFFBQ1osZUFBZTtBQUFBLFFBQ2Ysa0JBQWtCO0FBQUEsV0FDZiwwREFBdUI7QUFBQSxVQUN4QixXQUFXO0FBQUEsVUFDWCxPQUFPO0FBQUEsVUFDUCxNQUFNO0FBQUEsUUFDUixDQUFDO0FBQUEsTUFDSDtBQUFBLElBQ0Y7QUFBQSxFQUNGLENBQUM7QUFBQSxDQUNILEdBckJtQztBQXdCckMsc0JBQXNCLFFBQVE7QUFBQSxFQUM1QixNQUFNO0FBQ1I7QUFFTyxNQUFNLGFBQWEsNkJBQ3hCLG9DQUFDO0FBQUEsS0FDSyxZQUFZO0FBQUEsSUFDZCxVQUFVLHdCQUFTO0FBQUEsSUFDbkIsb0JBQW9CLENBQUM7QUFBQSxFQUN2QixDQUFDO0FBQUEsQ0FDSCxHQU53QjtBQVMxQixXQUFXLFFBQVE7QUFBQSxFQUNqQixNQUFNO0FBQ1I7QUFFTyxNQUFNLGtDQUFrQyw2QkFDN0Msb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFVBQVUsd0JBQVM7QUFBQSxJQUNuQixvQkFBb0Isc0JBQ2pCLE1BQU0sR0FBRyxDQUFDLEVBQ1YsSUFBSSxDQUFDLGFBQWEsVUFBVztBQUFBLFNBQ3pCO0FBQUEsTUFDSCxZQUFZLFVBQVU7QUFBQSxNQUN0QixlQUFlLFVBQVU7QUFBQSxJQUMzQixFQUFFO0FBQUEsRUFDTixDQUFDO0FBQUEsQ0FDSCxHQVo2QztBQWUvQyxnQ0FBZ0MsUUFBUTtBQUFBLEVBQ3RDLE1BQU07QUFDUjtBQUVPLE1BQU0sc0RBQ1gsNkJBQ0Usb0NBQUM7QUFBQSxLQUNLLFlBQVk7QUFBQSxJQUNkLFVBQVUsd0JBQVM7QUFBQSxJQUNuQixpQkFBaUIsd0NBQXlCO0FBQUEsSUFDMUMsb0JBQW9CLHNCQUNqQixNQUFNLEdBQUcsQ0FBQyxFQUNWLElBQUksQ0FBQyxhQUFhLFVBQVc7QUFBQSxTQUN6QjtBQUFBLE1BQ0gsWUFBWSxVQUFVO0FBQUEsTUFDdEIsZUFBZSxVQUFVO0FBQUEsSUFDM0IsRUFBRTtBQUFBLEVBQ04sQ0FBQztBQUFBLENBQ0gsR0FiRjtBQWdCRixvREFBb0QsUUFBUTtBQUFBLEVBQzFELE1BQU07QUFDUjsiLAogICJuYW1lcyI6IFtdCn0K
