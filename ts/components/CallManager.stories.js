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
var CallManager_stories_exports = {};
__export(CallManager_stories_exports, {
  CallRequestNeeded: () => CallRequestNeeded,
  GroupCallSafetyNumberChanged: () => GroupCallSafetyNumberChanged,
  NoCall: () => NoCall,
  OngoingDirectCall: () => OngoingDirectCall,
  OngoingGroupCall: () => OngoingGroupCall,
  RingingDirectCall: () => RingingDirectCall,
  RingingGroupCall: () => RingingGroupCall,
  default: () => CallManager_stories_default
});
module.exports = __toCommonJS(CallManager_stories_exports);
var React = __toESM(require("react"));
var import_addon_actions = require("@storybook/addon-actions");
var import_addon_knobs = require("@storybook/addon-knobs");
var import_CallManager = require("./CallManager");
var import_Calling = require("../types/Calling");
var import_Colors = require("../types/Colors");
var import_getDefaultConversation = require("../test-both/helpers/getDefaultConversation");
var import_fakeGetGroupCallVideoFrameSource = require("../test-both/helpers/fakeGetGroupCallVideoFrameSource");
var import_setupI18n = require("../util/setupI18n");
var import_messages = __toESM(require("../../_locales/en/messages.json"));
var import_Util = require("../types/Util");
const i18n = (0, import_setupI18n.setupI18n)("en", import_messages.default);
const getConversation = /* @__PURE__ */ __name(() => (0, import_getDefaultConversation.getDefaultConversation)({
  id: "3051234567",
  avatarPath: void 0,
  color: (0, import_addon_knobs.select)("Callee color", import_Colors.AvatarColors, "ultramarine"),
  title: (0, import_addon_knobs.text)("Callee Title", "Rick Sanchez"),
  name: (0, import_addon_knobs.text)("Callee Name", "Rick Sanchez"),
  phoneNumber: "3051234567",
  profileName: "Rick Sanchez",
  markedUnread: false,
  type: "direct",
  lastUpdated: Date.now()
}), "getConversation");
const getCommonActiveCallData = /* @__PURE__ */ __name(() => ({
  conversation: getConversation(),
  joinedAt: Date.now(),
  hasLocalAudio: (0, import_addon_knobs.boolean)("hasLocalAudio", true),
  hasLocalVideo: (0, import_addon_knobs.boolean)("hasLocalVideo", false),
  localAudioLevel: (0, import_addon_knobs.select)("localAudioLevel", [0, 0.5, 1], 0),
  viewMode: (0, import_addon_knobs.select)("viewMode", [import_Calling.CallViewMode.Grid, import_Calling.CallViewMode.Presentation, import_Calling.CallViewMode.Speaker], import_Calling.CallViewMode.Grid),
  outgoingRing: (0, import_addon_knobs.boolean)("outgoingRing", true),
  pip: (0, import_addon_knobs.boolean)("pip", false),
  settingsDialogOpen: (0, import_addon_knobs.boolean)("settingsDialogOpen", false),
  showParticipantsList: (0, import_addon_knobs.boolean)("showParticipantsList", false)
}), "getCommonActiveCallData");
const createProps = /* @__PURE__ */ __name((storyProps = {}) => ({
  ...storyProps,
  availableCameras: [],
  acceptCall: (0, import_addon_actions.action)("accept-call"),
  bounceAppIconStart: (0, import_addon_actions.action)("bounce-app-icon-start"),
  bounceAppIconStop: (0, import_addon_actions.action)("bounce-app-icon-stop"),
  cancelCall: (0, import_addon_actions.action)("cancel-call"),
  closeNeedPermissionScreen: (0, import_addon_actions.action)("close-need-permission-screen"),
  declineCall: (0, import_addon_actions.action)("decline-call"),
  getGroupCallVideoFrameSource: (_, demuxId) => (0, import_fakeGetGroupCallVideoFrameSource.fakeGetGroupCallVideoFrameSource)(demuxId),
  getPreferredBadge: () => void 0,
  getPresentingSources: (0, import_addon_actions.action)("get-presenting-sources"),
  hangUpActiveCall: (0, import_addon_actions.action)("hang-up-active-call"),
  i18n,
  isGroupCallOutboundRingEnabled: true,
  keyChangeOk: (0, import_addon_actions.action)("key-change-ok"),
  me: {
    ...(0, import_getDefaultConversation.getDefaultConversation)({
      color: (0, import_addon_knobs.select)("Caller color", import_Colors.AvatarColors, "ultramarine"),
      title: (0, import_addon_knobs.text)("Caller Title", "Morty Smith")
    }),
    uuid: "cb0dd0c8-7393-41e9-a0aa-d631c4109541"
  },
  notifyForCall: (0, import_addon_actions.action)("notify-for-call"),
  openSystemPreferencesAction: (0, import_addon_actions.action)("open-system-preferences-action"),
  playRingtone: (0, import_addon_actions.action)("play-ringtone"),
  renderDeviceSelection: () => /* @__PURE__ */ React.createElement("div", null),
  renderSafetyNumberViewer: (_) => /* @__PURE__ */ React.createElement("div", null),
  setGroupCallVideoRequest: (0, import_addon_actions.action)("set-group-call-video-request"),
  setIsCallActive: (0, import_addon_actions.action)("set-is-call-active"),
  setLocalAudio: (0, import_addon_actions.action)("set-local-audio"),
  setLocalPreview: (0, import_addon_actions.action)("set-local-preview"),
  setLocalVideo: (0, import_addon_actions.action)("set-local-video"),
  setPresenting: (0, import_addon_actions.action)("toggle-presenting"),
  setRendererCanvas: (0, import_addon_actions.action)("set-renderer-canvas"),
  setOutgoingRing: (0, import_addon_actions.action)("set-outgoing-ring"),
  startCall: (0, import_addon_actions.action)("start-call"),
  stopRingtone: (0, import_addon_actions.action)("stop-ringtone"),
  switchToPresentationView: (0, import_addon_actions.action)("switch-to-presentation-view"),
  switchFromPresentationView: (0, import_addon_actions.action)("switch-from-presentation-view"),
  theme: import_Util.ThemeType.light,
  toggleParticipants: (0, import_addon_actions.action)("toggle-participants"),
  togglePip: (0, import_addon_actions.action)("toggle-pip"),
  toggleScreenRecordingPermissionsDialog: (0, import_addon_actions.action)("toggle-screen-recording-permissions-dialog"),
  toggleSettings: (0, import_addon_actions.action)("toggle-settings"),
  toggleSpeakerView: (0, import_addon_actions.action)("toggle-speaker-view")
}), "createProps");
var CallManager_stories_default = {
  title: "Components/CallManager"
};
const NoCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps()
}), "NoCall");
const OngoingDirectCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    activeCall: {
      ...getCommonActiveCallData(),
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Accepted,
      peekedParticipants: [],
      remoteParticipants: [
        { hasRemoteVideo: true, presenting: false, title: "Remy" }
      ]
    }
  })
}), "OngoingDirectCall");
const OngoingGroupCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    activeCall: {
      ...getCommonActiveCallData(),
      callMode: import_Calling.CallMode.Group,
      connectionState: import_Calling.GroupCallConnectionState.Connected,
      conversationsWithSafetyNumberChanges: [],
      deviceCount: 0,
      joinState: import_Calling.GroupCallJoinState.Joined,
      maxDevices: 5,
      groupMembers: [],
      peekedParticipants: [],
      remoteParticipants: [],
      remoteAudioLevels: /* @__PURE__ */ new Map()
    }
  })
}), "OngoingGroupCall");
const RingingDirectCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    incomingCall: {
      callMode: import_Calling.CallMode.Direct,
      conversation: getConversation(),
      isVideoCall: true
    }
  })
}), "RingingDirectCall");
RingingDirectCall.story = {
  name: "Ringing (direct call)"
};
const RingingGroupCall = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    incomingCall: {
      callMode: import_Calling.CallMode.Group,
      conversation: {
        ...getConversation(),
        type: "group",
        title: "Tahoe Trip"
      },
      otherMembersRung: [
        { firstName: "Morty", title: "Morty Smith" },
        { firstName: "Summer", title: "Summer Smith" }
      ],
      ringer: { firstName: "Rick", title: "Rick Sanchez" }
    }
  })
}), "RingingGroupCall");
RingingGroupCall.story = {
  name: "Ringing (group call)"
};
const CallRequestNeeded = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    activeCall: {
      ...getCommonActiveCallData(),
      callEndedReason: import_Calling.CallEndedReason.RemoteHangupNeedPermission,
      callMode: import_Calling.CallMode.Direct,
      callState: import_Calling.CallState.Accepted,
      peekedParticipants: [],
      remoteParticipants: [
        { hasRemoteVideo: true, presenting: false, title: "Mike" }
      ]
    }
  })
}), "CallRequestNeeded");
const GroupCallSafetyNumberChanged = /* @__PURE__ */ __name(() => /* @__PURE__ */ React.createElement(import_CallManager.CallManager, {
  ...createProps({
    activeCall: {
      ...getCommonActiveCallData(),
      callMode: import_Calling.CallMode.Group,
      connectionState: import_Calling.GroupCallConnectionState.Connected,
      conversationsWithSafetyNumberChanges: [
        {
          ...(0, import_getDefaultConversation.getDefaultConversation)({
            title: "Aaron"
          })
        }
      ],
      deviceCount: 0,
      joinState: import_Calling.GroupCallJoinState.Joined,
      maxDevices: 5,
      groupMembers: [],
      peekedParticipants: [],
      remoteParticipants: [],
      remoteAudioLevels: /* @__PURE__ */ new Map()
    }
  })
}), "GroupCallSafetyNumberChanged");
GroupCallSafetyNumberChanged.story = {
  name: "Group call - Safety Number Changed"
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallRequestNeeded,
  GroupCallSafetyNumberChanged,
  NoCall,
  OngoingDirectCall,
  OngoingGroupCall,
  RingingDirectCall,
  RingingGroupCall
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbE1hbmFnZXIuc3Rvcmllcy50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgKiBhcyBSZWFjdCBmcm9tICdyZWFjdCc7XG5pbXBvcnQgeyBhY3Rpb24gfSBmcm9tICdAc3Rvcnlib29rL2FkZG9uLWFjdGlvbnMnO1xuaW1wb3J0IHsgYm9vbGVhbiwgc2VsZWN0LCB0ZXh0IH0gZnJvbSAnQHN0b3J5Ym9vay9hZGRvbi1rbm9icyc7XG5cbmltcG9ydCB0eXBlIHsgUHJvcHNUeXBlIH0gZnJvbSAnLi9DYWxsTWFuYWdlcic7XG5pbXBvcnQgeyBDYWxsTWFuYWdlciB9IGZyb20gJy4vQ2FsbE1hbmFnZXInO1xuaW1wb3J0IHtcbiAgQ2FsbEVuZGVkUmVhc29uLFxuICBDYWxsTW9kZSxcbiAgQ2FsbFN0YXRlLFxuICBDYWxsVmlld01vZGUsXG4gIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSxcbiAgR3JvdXBDYWxsSm9pblN0YXRlLFxufSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uVHlwZVR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB0eXBlIHsgQXZhdGFyQ29sb3JUeXBlIH0gZnJvbSAnLi4vdHlwZXMvQ29sb3JzJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgeyBnZXREZWZhdWx0Q29udmVyc2F0aW9uIH0gZnJvbSAnLi4vdGVzdC1ib3RoL2hlbHBlcnMvZ2V0RGVmYXVsdENvbnZlcnNhdGlvbic7XG5pbXBvcnQgeyBmYWtlR2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSB9IGZyb20gJy4uL3Rlc3QtYm90aC9oZWxwZXJzL2Zha2VHZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlJztcbmltcG9ydCB7IHNldHVwSTE4biB9IGZyb20gJy4uL3V0aWwvc2V0dXBJMThuJztcbmltcG9ydCB0eXBlIHsgU2FmZXR5TnVtYmVyUHJvcHMgfSBmcm9tICcuL1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyc7XG5pbXBvcnQgZW5NZXNzYWdlcyBmcm9tICcuLi8uLi9fbG9jYWxlcy9lbi9tZXNzYWdlcy5qc29uJztcbmltcG9ydCB7IFRoZW1lVHlwZSB9IGZyb20gJy4uL3R5cGVzL1V0aWwnO1xuXG5jb25zdCBpMThuID0gc2V0dXBJMThuKCdlbicsIGVuTWVzc2FnZXMpO1xuXG5jb25zdCBnZXRDb252ZXJzYXRpb24gPSAoKSA9PlxuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICBpZDogJzMwNTEyMzQ1NjcnLFxuICAgIGF2YXRhclBhdGg6IHVuZGVmaW5lZCxcbiAgICBjb2xvcjogc2VsZWN0KFxuICAgICAgJ0NhbGxlZSBjb2xvcicsXG4gICAgICBBdmF0YXJDb2xvcnMsXG4gICAgICAndWx0cmFtYXJpbmUnIGFzIEF2YXRhckNvbG9yVHlwZVxuICAgICksXG4gICAgdGl0bGU6IHRleHQoJ0NhbGxlZSBUaXRsZScsICdSaWNrIFNhbmNoZXonKSxcbiAgICBuYW1lOiB0ZXh0KCdDYWxsZWUgTmFtZScsICdSaWNrIFNhbmNoZXonKSxcbiAgICBwaG9uZU51bWJlcjogJzMwNTEyMzQ1NjcnLFxuICAgIHByb2ZpbGVOYW1lOiAnUmljayBTYW5jaGV6JyxcbiAgICBtYXJrZWRVbnJlYWQ6IGZhbHNlLFxuICAgIHR5cGU6ICdkaXJlY3QnIGFzIENvbnZlcnNhdGlvblR5cGVUeXBlLFxuICAgIGxhc3RVcGRhdGVkOiBEYXRlLm5vdygpLFxuICB9KTtcblxuY29uc3QgZ2V0Q29tbW9uQWN0aXZlQ2FsbERhdGEgPSAoKSA9PiAoe1xuICBjb252ZXJzYXRpb246IGdldENvbnZlcnNhdGlvbigpLFxuICBqb2luZWRBdDogRGF0ZS5ub3coKSxcbiAgaGFzTG9jYWxBdWRpbzogYm9vbGVhbignaGFzTG9jYWxBdWRpbycsIHRydWUpLFxuICBoYXNMb2NhbFZpZGVvOiBib29sZWFuKCdoYXNMb2NhbFZpZGVvJywgZmFsc2UpLFxuICBsb2NhbEF1ZGlvTGV2ZWw6IHNlbGVjdCgnbG9jYWxBdWRpb0xldmVsJywgWzAsIDAuNSwgMV0sIDApLFxuICB2aWV3TW9kZTogc2VsZWN0KFxuICAgICd2aWV3TW9kZScsXG4gICAgW0NhbGxWaWV3TW9kZS5HcmlkLCBDYWxsVmlld01vZGUuUHJlc2VudGF0aW9uLCBDYWxsVmlld01vZGUuU3BlYWtlcl0sXG4gICAgQ2FsbFZpZXdNb2RlLkdyaWRcbiAgKSxcbiAgb3V0Z29pbmdSaW5nOiBib29sZWFuKCdvdXRnb2luZ1JpbmcnLCB0cnVlKSxcbiAgcGlwOiBib29sZWFuKCdwaXAnLCBmYWxzZSksXG4gIHNldHRpbmdzRGlhbG9nT3BlbjogYm9vbGVhbignc2V0dGluZ3NEaWFsb2dPcGVuJywgZmFsc2UpLFxuICBzaG93UGFydGljaXBhbnRzTGlzdDogYm9vbGVhbignc2hvd1BhcnRpY2lwYW50c0xpc3QnLCBmYWxzZSksXG59KTtcblxuY29uc3QgY3JlYXRlUHJvcHMgPSAoc3RvcnlQcm9wczogUGFydGlhbDxQcm9wc1R5cGU+ID0ge30pOiBQcm9wc1R5cGUgPT4gKHtcbiAgLi4uc3RvcnlQcm9wcyxcbiAgYXZhaWxhYmxlQ2FtZXJhczogW10sXG4gIGFjY2VwdENhbGw6IGFjdGlvbignYWNjZXB0LWNhbGwnKSxcbiAgYm91bmNlQXBwSWNvblN0YXJ0OiBhY3Rpb24oJ2JvdW5jZS1hcHAtaWNvbi1zdGFydCcpLFxuICBib3VuY2VBcHBJY29uU3RvcDogYWN0aW9uKCdib3VuY2UtYXBwLWljb24tc3RvcCcpLFxuICBjYW5jZWxDYWxsOiBhY3Rpb24oJ2NhbmNlbC1jYWxsJyksXG4gIGNsb3NlTmVlZFBlcm1pc3Npb25TY3JlZW46IGFjdGlvbignY2xvc2UtbmVlZC1wZXJtaXNzaW9uLXNjcmVlbicpLFxuICBkZWNsaW5lQ2FsbDogYWN0aW9uKCdkZWNsaW5lLWNhbGwnKSxcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZTogKF86IHN0cmluZywgZGVtdXhJZDogbnVtYmVyKSA9PlxuICAgIGZha2VHZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlKGRlbXV4SWQpLFxuICBnZXRQcmVmZXJyZWRCYWRnZTogKCkgPT4gdW5kZWZpbmVkLFxuICBnZXRQcmVzZW50aW5nU291cmNlczogYWN0aW9uKCdnZXQtcHJlc2VudGluZy1zb3VyY2VzJyksXG4gIGhhbmdVcEFjdGl2ZUNhbGw6IGFjdGlvbignaGFuZy11cC1hY3RpdmUtY2FsbCcpLFxuICBpMThuLFxuICBpc0dyb3VwQ2FsbE91dGJvdW5kUmluZ0VuYWJsZWQ6IHRydWUsXG4gIGtleUNoYW5nZU9rOiBhY3Rpb24oJ2tleS1jaGFuZ2Utb2snKSxcbiAgbWU6IHtcbiAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgIGNvbG9yOiBzZWxlY3QoXG4gICAgICAgICdDYWxsZXIgY29sb3InLFxuICAgICAgICBBdmF0YXJDb2xvcnMsXG4gICAgICAgICd1bHRyYW1hcmluZScgYXMgQXZhdGFyQ29sb3JUeXBlXG4gICAgICApLFxuICAgICAgdGl0bGU6IHRleHQoJ0NhbGxlciBUaXRsZScsICdNb3J0eSBTbWl0aCcpLFxuICAgIH0pLFxuICAgIHV1aWQ6ICdjYjBkZDBjOC03MzkzLTQxZTktYTBhYS1kNjMxYzQxMDk1NDEnLFxuICB9LFxuICBub3RpZnlGb3JDYWxsOiBhY3Rpb24oJ25vdGlmeS1mb3ItY2FsbCcpLFxuICBvcGVuU3lzdGVtUHJlZmVyZW5jZXNBY3Rpb246IGFjdGlvbignb3Blbi1zeXN0ZW0tcHJlZmVyZW5jZXMtYWN0aW9uJyksXG4gIHBsYXlSaW5ndG9uZTogYWN0aW9uKCdwbGF5LXJpbmd0b25lJyksXG4gIHJlbmRlckRldmljZVNlbGVjdGlvbjogKCkgPT4gPGRpdiAvPixcbiAgcmVuZGVyU2FmZXR5TnVtYmVyVmlld2VyOiAoXzogU2FmZXR5TnVtYmVyUHJvcHMpID0+IDxkaXYgLz4sXG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdDogYWN0aW9uKCdzZXQtZ3JvdXAtY2FsbC12aWRlby1yZXF1ZXN0JyksXG4gIHNldElzQ2FsbEFjdGl2ZTogYWN0aW9uKCdzZXQtaXMtY2FsbC1hY3RpdmUnKSxcbiAgc2V0TG9jYWxBdWRpbzogYWN0aW9uKCdzZXQtbG9jYWwtYXVkaW8nKSxcbiAgc2V0TG9jYWxQcmV2aWV3OiBhY3Rpb24oJ3NldC1sb2NhbC1wcmV2aWV3JyksXG4gIHNldExvY2FsVmlkZW86IGFjdGlvbignc2V0LWxvY2FsLXZpZGVvJyksXG4gIHNldFByZXNlbnRpbmc6IGFjdGlvbigndG9nZ2xlLXByZXNlbnRpbmcnKSxcbiAgc2V0UmVuZGVyZXJDYW52YXM6IGFjdGlvbignc2V0LXJlbmRlcmVyLWNhbnZhcycpLFxuICBzZXRPdXRnb2luZ1Jpbmc6IGFjdGlvbignc2V0LW91dGdvaW5nLXJpbmcnKSxcbiAgc3RhcnRDYWxsOiBhY3Rpb24oJ3N0YXJ0LWNhbGwnKSxcbiAgc3RvcFJpbmd0b25lOiBhY3Rpb24oJ3N0b3AtcmluZ3RvbmUnKSxcbiAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3OiBhY3Rpb24oJ3N3aXRjaC10by1wcmVzZW50YXRpb24tdmlldycpLFxuICBzd2l0Y2hGcm9tUHJlc2VudGF0aW9uVmlldzogYWN0aW9uKCdzd2l0Y2gtZnJvbS1wcmVzZW50YXRpb24tdmlldycpLFxuICB0aGVtZTogVGhlbWVUeXBlLmxpZ2h0LFxuICB0b2dnbGVQYXJ0aWNpcGFudHM6IGFjdGlvbigndG9nZ2xlLXBhcnRpY2lwYW50cycpLFxuICB0b2dnbGVQaXA6IGFjdGlvbigndG9nZ2xlLXBpcCcpLFxuICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZzogYWN0aW9uKFxuICAgICd0b2dnbGUtc2NyZWVuLXJlY29yZGluZy1wZXJtaXNzaW9ucy1kaWFsb2cnXG4gICksXG4gIHRvZ2dsZVNldHRpbmdzOiBhY3Rpb24oJ3RvZ2dsZS1zZXR0aW5ncycpLFxuICB0b2dnbGVTcGVha2VyVmlldzogYWN0aW9uKCd0b2dnbGUtc3BlYWtlci12aWV3JyksXG59KTtcblxuZXhwb3J0IGRlZmF1bHQge1xuICB0aXRsZTogJ0NvbXBvbmVudHMvQ2FsbE1hbmFnZXInLFxufTtcblxuZXhwb3J0IGNvbnN0IE5vQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiA8Q2FsbE1hbmFnZXIgey4uLmNyZWF0ZVByb3BzKCl9IC8+O1xuXG5leHBvcnQgY29uc3QgT25nb2luZ0RpcmVjdENhbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbE1hbmFnZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgYWN0aXZlQ2FsbDoge1xuICAgICAgICAuLi5nZXRDb21tb25BY3RpdmVDYWxsRGF0YSgpLFxuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5BY2NlcHRlZCxcbiAgICAgICAgcGVla2VkUGFydGljaXBhbnRzOiBbXSxcbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgeyBoYXNSZW1vdGVWaWRlbzogdHJ1ZSwgcHJlc2VudGluZzogZmFsc2UsIHRpdGxlOiAnUmVteScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgT25nb2luZ0dyb3VwQ2FsbCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsTWFuYWdlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhY3RpdmVDYWxsOiB7XG4gICAgICAgIC4uLmdldENvbW1vbkFjdGl2ZUNhbGxEYXRhKCksXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICBjb252ZXJzYXRpb25zV2l0aFNhZmV0eU51bWJlckNoYW5nZXM6IFtdLFxuICAgICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkLFxuICAgICAgICBtYXhEZXZpY2VzOiA1LFxuICAgICAgICBncm91cE1lbWJlcnM6IFtdLFxuICAgICAgICBwZWVrZWRQYXJ0aWNpcGFudHM6IFtdLFxuICAgICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgICAgICByZW1vdGVBdWRpb0xldmVsczogbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgUmluZ2luZ0RpcmVjdENhbGwgPSAoKTogSlNYLkVsZW1lbnQgPT4gKFxuICA8Q2FsbE1hbmFnZXJcbiAgICB7Li4uY3JlYXRlUHJvcHMoe1xuICAgICAgaW5jb21pbmdDYWxsOiB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QgYXMgY29uc3QsXG4gICAgICAgIGNvbnZlcnNhdGlvbjogZ2V0Q29udmVyc2F0aW9uKCksXG4gICAgICAgIGlzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgfSxcbiAgICB9KX1cbiAgLz5cbik7XG5cblJpbmdpbmdEaXJlY3RDYWxsLnN0b3J5ID0ge1xuICBuYW1lOiAnUmluZ2luZyAoZGlyZWN0IGNhbGwpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBSaW5naW5nR3JvdXBDYWxsID0gKCk6IEpTWC5FbGVtZW50ID0+IChcbiAgPENhbGxNYW5hZ2VyXG4gICAgey4uLmNyZWF0ZVByb3BzKHtcbiAgICAgIGluY29taW5nQ2FsbDoge1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAgYXMgY29uc3QsXG4gICAgICAgIGNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgIC4uLmdldENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgdGl0bGU6ICdUYWhvZSBUcmlwJyxcbiAgICAgICAgfSxcbiAgICAgICAgb3RoZXJNZW1iZXJzUnVuZzogW1xuICAgICAgICAgIHsgZmlyc3ROYW1lOiAnTW9ydHknLCB0aXRsZTogJ01vcnR5IFNtaXRoJyB9LFxuICAgICAgICAgIHsgZmlyc3ROYW1lOiAnU3VtbWVyJywgdGl0bGU6ICdTdW1tZXIgU21pdGgnIH0sXG4gICAgICAgIF0sXG4gICAgICAgIHJpbmdlcjogeyBmaXJzdE5hbWU6ICdSaWNrJywgdGl0bGU6ICdSaWNrIFNhbmNoZXonIH0sXG4gICAgICB9LFxuICAgIH0pfVxuICAvPlxuKTtcblxuUmluZ2luZ0dyb3VwQ2FsbC5zdG9yeSA9IHtcbiAgbmFtZTogJ1JpbmdpbmcgKGdyb3VwIGNhbGwpJyxcbn07XG5cbmV4cG9ydCBjb25zdCBDYWxsUmVxdWVzdE5lZWRlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsTWFuYWdlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhY3RpdmVDYWxsOiB7XG4gICAgICAgIC4uLmdldENvbW1vbkFjdGl2ZUNhbGxEYXRhKCksXG4gICAgICAgIGNhbGxFbmRlZFJlYXNvbjogQ2FsbEVuZGVkUmVhc29uLlJlbW90ZUhhbmd1cE5lZWRQZXJtaXNzaW9uLFxuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5BY2NlcHRlZCxcbiAgICAgICAgcGVla2VkUGFydGljaXBhbnRzOiBbXSxcbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgeyBoYXNSZW1vdGVWaWRlbzogdHJ1ZSwgcHJlc2VudGluZzogZmFsc2UsIHRpdGxlOiAnTWlrZScgfSxcbiAgICAgICAgXSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5leHBvcnQgY29uc3QgR3JvdXBDYWxsU2FmZXR5TnVtYmVyQ2hhbmdlZCA9ICgpOiBKU1guRWxlbWVudCA9PiAoXG4gIDxDYWxsTWFuYWdlclxuICAgIHsuLi5jcmVhdGVQcm9wcyh7XG4gICAgICBhY3RpdmVDYWxsOiB7XG4gICAgICAgIC4uLmdldENvbW1vbkFjdGl2ZUNhbGxEYXRhKCksXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICBjb252ZXJzYXRpb25zV2l0aFNhZmV0eU51bWJlckNoYW5nZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgICAgdGl0bGU6ICdBYXJvbicsXG4gICAgICAgICAgICB9KSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkLFxuICAgICAgICBtYXhEZXZpY2VzOiA1LFxuICAgICAgICBncm91cE1lbWJlcnM6IFtdLFxuICAgICAgICBwZWVrZWRQYXJ0aWNpcGFudHM6IFtdLFxuICAgICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgICAgICByZW1vdGVBdWRpb0xldmVsczogbmV3IE1hcDxudW1iZXIsIG51bWJlcj4oKSxcbiAgICAgIH0sXG4gICAgfSl9XG4gIC8+XG4pO1xuXG5Hcm91cENhbGxTYWZldHlOdW1iZXJDaGFuZ2VkLnN0b3J5ID0ge1xuICBuYW1lOiAnR3JvdXAgY2FsbCAtIFNhZmV0eSBOdW1iZXIgQ2hhbmdlZCcsXG59O1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBR0EsWUFBdUI7QUFDdkIsMkJBQXVCO0FBQ3ZCLHlCQUFzQztBQUd0Qyx5QkFBNEI7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
