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
var CallManager_exports = {};
__export(CallManager_exports, {
  SmartCallManager: () => SmartCallManager
});
module.exports = __toCommonJS(CallManager_exports);
var import_react = __toESM(require("react"));
var import_react_redux = require("react-redux");
var import_lodash = require("lodash");
var import_actions = require("../actions");
var import_CallManager = require("../../components/CallManager");
var import_calling = require("../../services/calling");
var import_user = require("../selectors/user");
var import_conversations = require("../selectors/conversations");
var import_calling2 = require("../ducks/calling");
var import_calling3 = require("../selectors/calling");
var import_isGroupCallOutboundRingEnabled = require("../../util/isGroupCallOutboundRingEnabled");
var import_Calling = require("../../types/Calling");
var import_missingCaseError = require("../../util/missingCaseError");
var import_CallingDeviceSelection = require("./CallingDeviceSelection");
var import_SafetyNumberViewer = require("./SafetyNumberViewer");
var import_callingTones = require("../../util/callingTones");
var import_bounceAppIcon = require("../../shims/bounceAppIcon");
var import_notifications = require("../../services/notifications");
var log = __toESM(require("../../logging/log"));
var import_badges = require("../selectors/badges");
function renderDeviceSelection() {
  return /* @__PURE__ */ import_react.default.createElement(import_CallingDeviceSelection.SmartCallingDeviceSelection, null);
}
function renderSafetyNumberViewer(props) {
  return /* @__PURE__ */ import_react.default.createElement(import_SafetyNumberViewer.SmartSafetyNumberViewer, {
    ...props
  });
}
const getGroupCallVideoFrameSource = import_calling.calling.getGroupCallVideoFrameSource.bind(import_calling.calling);
async function notifyForCall(title, isVideoCall) {
  const shouldNotify = !window.isActive() && window.Events.getCallSystemNotification();
  if (!shouldNotify) {
    return;
  }
  let notificationTitle;
  const notificationSetting = import_notifications.notificationService.getNotificationSetting();
  switch (notificationSetting) {
    case import_notifications.NotificationSetting.Off:
    case import_notifications.NotificationSetting.NoNameOrMessage:
      notificationTitle = import_notifications.FALLBACK_NOTIFICATION_TITLE;
      break;
    case import_notifications.NotificationSetting.NameOnly:
    case import_notifications.NotificationSetting.NameAndMessage:
      notificationTitle = title;
      break;
    default:
      log.error((0, import_missingCaseError.missingCaseError)(notificationSetting));
      notificationTitle = import_notifications.FALLBACK_NOTIFICATION_TITLE;
      break;
  }
  import_notifications.notificationService.notify({
    title: notificationTitle,
    icon: isVideoCall ? "images/icons/v2/video-solid-24.svg" : "images/icons/v2/phone-right-solid-24.svg",
    message: window.i18n(isVideoCall ? "incomingVideoCall" : "incomingAudioCall"),
    onNotificationClick: () => {
      window.showWindow();
    },
    silent: false
  });
}
const playRingtone = import_callingTones.callingTones.playRingtone.bind(import_callingTones.callingTones);
const stopRingtone = import_callingTones.callingTones.stopRingtone.bind(import_callingTones.callingTones);
const mapStateToActiveCallProp = /* @__PURE__ */ __name((state) => {
  const { calling } = state;
  const { activeCallState } = calling;
  if (!activeCallState) {
    return void 0;
  }
  const call = (0, import_calling2.getActiveCall)(calling);
  if (!call) {
    log.error("There was an active call state but no corresponding call");
    return void 0;
  }
  const conversationSelector = (0, import_conversations.getConversationSelector)(state);
  const conversation = conversationSelector(activeCallState.conversationId);
  if (!conversation) {
    log.error("The active call has no corresponding conversation");
    return void 0;
  }
  const conversationSelectorByUuid = (0, import_lodash.memoize)((uuid) => {
    const conversationId = window.ConversationController.ensureContactIds({
      uuid
    });
    return conversationId ? conversationSelector(conversationId) : void 0;
  });
  const baseResult = {
    conversation,
    hasLocalAudio: activeCallState.hasLocalAudio,
    hasLocalVideo: activeCallState.hasLocalVideo,
    localAudioLevel: activeCallState.localAudioLevel,
    viewMode: activeCallState.viewMode,
    joinedAt: activeCallState.joinedAt,
    outgoingRing: activeCallState.outgoingRing,
    pip: activeCallState.pip,
    presentingSource: activeCallState.presentingSource,
    presentingSourcesAvailable: activeCallState.presentingSourcesAvailable,
    settingsDialogOpen: activeCallState.settingsDialogOpen,
    showNeedsScreenRecordingPermissionsWarning: Boolean(activeCallState.showNeedsScreenRecordingPermissionsWarning),
    showParticipantsList: activeCallState.showParticipantsList
  };
  switch (call.callMode) {
    case import_Calling.CallMode.Direct:
      if (call.isIncoming && (call.callState === import_Calling.CallState.Prering || call.callState === import_Calling.CallState.Ringing)) {
        return;
      }
      return {
        ...baseResult,
        callEndedReason: call.callEndedReason,
        callMode: import_Calling.CallMode.Direct,
        callState: call.callState,
        peekedParticipants: [],
        remoteParticipants: [
          {
            hasRemoteVideo: Boolean(call.hasRemoteVideo),
            presenting: Boolean(call.isSharingScreen),
            title: conversation.title,
            uuid: conversation.uuid
          }
        ]
      };
    case import_Calling.CallMode.Group: {
      const conversationsWithSafetyNumberChanges = [];
      const groupMembers = [];
      const remoteParticipants = [];
      const peekedParticipants = [];
      const { memberships = [] } = conversation;
      const {
        peekInfo = {
          deviceCount: 0,
          maxDevices: Infinity,
          uuids: []
        }
      } = call;
      for (let i = 0; i < memberships.length; i += 1) {
        const { uuid } = memberships[i];
        const member = conversationSelector(uuid);
        if (!member) {
          log.error("Group member has no corresponding conversation");
          continue;
        }
        groupMembers.push(member);
      }
      for (let i = 0; i < call.remoteParticipants.length; i += 1) {
        const remoteParticipant = call.remoteParticipants[i];
        const remoteConversation = conversationSelectorByUuid(remoteParticipant.uuid);
        if (!remoteConversation) {
          log.error("Remote participant has no corresponding conversation");
          continue;
        }
        remoteParticipants.push({
          ...remoteConversation,
          demuxId: remoteParticipant.demuxId,
          hasRemoteAudio: remoteParticipant.hasRemoteAudio,
          hasRemoteVideo: remoteParticipant.hasRemoteVideo,
          presenting: remoteParticipant.presenting,
          sharingScreen: remoteParticipant.sharingScreen,
          speakerTime: remoteParticipant.speakerTime,
          videoAspectRatio: remoteParticipant.videoAspectRatio
        });
      }
      for (let i = 0; i < activeCallState.safetyNumberChangedUuids.length; i += 1) {
        const uuid = activeCallState.safetyNumberChangedUuids[i];
        const remoteConversation = conversationSelectorByUuid(uuid);
        if (!remoteConversation) {
          log.error("Remote participant has no corresponding conversation");
          continue;
        }
        conversationsWithSafetyNumberChanges.push(remoteConversation);
      }
      for (let i = 0; i < peekInfo.uuids.length; i += 1) {
        const peekedParticipantUuid = peekInfo.uuids[i];
        const peekedConversation = conversationSelectorByUuid(peekedParticipantUuid);
        if (!peekedConversation) {
          log.error("Remote participant has no corresponding conversation");
          continue;
        }
        peekedParticipants.push(peekedConversation);
      }
      return {
        ...baseResult,
        callMode: import_Calling.CallMode.Group,
        connectionState: call.connectionState,
        conversationsWithSafetyNumberChanges,
        deviceCount: peekInfo.deviceCount,
        groupMembers,
        joinState: call.joinState,
        maxDevices: peekInfo.maxDevices,
        peekedParticipants,
        remoteParticipants,
        remoteAudioLevels: call.remoteAudioLevels || /* @__PURE__ */ new Map()
      };
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(call);
  }
}, "mapStateToActiveCallProp");
const mapStateToIncomingCallProp = /* @__PURE__ */ __name((state) => {
  const call = (0, import_calling3.getIncomingCall)(state);
  if (!call) {
    return void 0;
  }
  const conversation = (0, import_conversations.getConversationSelector)(state)(call.conversationId);
  if (!conversation) {
    log.error("The incoming call has no corresponding conversation");
    return void 0;
  }
  switch (call.callMode) {
    case import_Calling.CallMode.Direct:
      return {
        callMode: import_Calling.CallMode.Direct,
        conversation,
        isVideoCall: call.isVideoCall
      };
    case import_Calling.CallMode.Group: {
      if (!call.ringerUuid) {
        log.error("The incoming group call has no ring state");
        return void 0;
      }
      const conversationSelector = (0, import_conversations.getConversationSelector)(state);
      const ringer = conversationSelector(call.ringerUuid);
      const otherMembersRung = (conversation.sortedGroupMembers ?? []).filter((c) => c.id !== ringer.id && !c.isMe);
      return {
        callMode: import_Calling.CallMode.Group,
        conversation,
        otherMembersRung,
        ringer
      };
    }
    default:
      throw (0, import_missingCaseError.missingCaseError)(call);
  }
}, "mapStateToIncomingCallProp");
const mapStateToProps = /* @__PURE__ */ __name((state) => ({
  activeCall: mapStateToActiveCallProp(state),
  bounceAppIconStart: import_bounceAppIcon.bounceAppIconStart,
  bounceAppIconStop: import_bounceAppIcon.bounceAppIconStop,
  availableCameras: state.calling.availableCameras,
  getGroupCallVideoFrameSource,
  getPreferredBadge: (0, import_badges.getPreferredBadgeSelector)(state),
  i18n: (0, import_user.getIntl)(state),
  isGroupCallOutboundRingEnabled: (0, import_isGroupCallOutboundRingEnabled.isGroupCallOutboundRingEnabled)(),
  incomingCall: mapStateToIncomingCallProp(state),
  me: (0, import_conversations.getMe)(state),
  notifyForCall,
  playRingtone,
  stopRingtone,
  renderDeviceSelection,
  renderSafetyNumberViewer,
  theme: (0, import_user.getTheme)(state)
}), "mapStateToProps");
const smart = (0, import_react_redux.connect)(mapStateToProps, import_actions.mapDispatchToProps);
const SmartCallManager = smart(import_CallManager.CallManager);
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  SmartCallManager
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbE1hbmFnZXIudHN4Il0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdyZWFjdC1yZWR1eCc7XG5pbXBvcnQgeyBtZW1vaXplIH0gZnJvbSAnbG9kYXNoJztcbmltcG9ydCB7IG1hcERpc3BhdGNoVG9Qcm9wcyB9IGZyb20gJy4uL2FjdGlvbnMnO1xuaW1wb3J0IHsgQ2FsbE1hbmFnZXIgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL0NhbGxNYW5hZ2VyJztcbmltcG9ydCB7IGNhbGxpbmcgYXMgY2FsbGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9jYWxsaW5nJztcbmltcG9ydCB7IGdldEludGwsIGdldFRoZW1lIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgZ2V0TWUsIGdldENvbnZlcnNhdGlvblNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgZ2V0QWN0aXZlQ2FsbCB9IGZyb20gJy4uL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRJbmNvbWluZ0NhbGwgfSBmcm9tICcuLi9zZWxlY3RvcnMvY2FsbGluZyc7XG5pbXBvcnQgeyBpc0dyb3VwQ2FsbE91dGJvdW5kUmluZ0VuYWJsZWQgfSBmcm9tICcuLi8uLi91dGlsL2lzR3JvdXBDYWxsT3V0Ym91bmRSaW5nRW5hYmxlZCc7XG5pbXBvcnQgdHlwZSB7XG4gIEFjdGl2ZUNhbGxUeXBlLFxuICBHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGUsXG59IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBVVUlEU3RyaW5nVHlwZSB9IGZyb20gJy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgQ2FsbE1vZGUsIENhbGxTdGF0ZSB9IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgfSBmcm9tICcuLi9yZWR1Y2VyJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgU21hcnRDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIH0gZnJvbSAnLi9DYWxsaW5nRGV2aWNlU2VsZWN0aW9uJztcbmltcG9ydCB0eXBlIHsgU2FmZXR5TnVtYmVyUHJvcHMgfSBmcm9tICcuLi8uLi9jb21wb25lbnRzL1NhZmV0eU51bWJlckNoYW5nZURpYWxvZyc7XG5pbXBvcnQgeyBTbWFydFNhZmV0eU51bWJlclZpZXdlciB9IGZyb20gJy4vU2FmZXR5TnVtYmVyVmlld2VyJztcbmltcG9ydCB7IGNhbGxpbmdUb25lcyB9IGZyb20gJy4uLy4uL3V0aWwvY2FsbGluZ1RvbmVzJztcbmltcG9ydCB7XG4gIGJvdW5jZUFwcEljb25TdGFydCxcbiAgYm91bmNlQXBwSWNvblN0b3AsXG59IGZyb20gJy4uLy4uL3NoaW1zL2JvdW5jZUFwcEljb24nO1xuaW1wb3J0IHtcbiAgRkFMTEJBQ0tfTk9USUZJQ0FUSU9OX1RJVExFLFxuICBOb3RpZmljYXRpb25TZXR0aW5nLFxuICBub3RpZmljYXRpb25TZXJ2aWNlLFxufSBmcm9tICcuLi8uLi9zZXJ2aWNlcy9ub3RpZmljYXRpb25zJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBnZXRQcmVmZXJyZWRCYWRnZVNlbGVjdG9yIH0gZnJvbSAnLi4vc2VsZWN0b3JzL2JhZGdlcyc7XG5cbmZ1bmN0aW9uIHJlbmRlckRldmljZVNlbGVjdGlvbigpOiBKU1guRWxlbWVudCB7XG4gIHJldHVybiA8U21hcnRDYWxsaW5nRGV2aWNlU2VsZWN0aW9uIC8+O1xufVxuXG5mdW5jdGlvbiByZW5kZXJTYWZldHlOdW1iZXJWaWV3ZXIocHJvcHM6IFNhZmV0eU51bWJlclByb3BzKTogSlNYLkVsZW1lbnQge1xuICByZXR1cm4gPFNtYXJ0U2FmZXR5TnVtYmVyVmlld2VyIHsuLi5wcm9wc30gLz47XG59XG5cbmNvbnN0IGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2UgPVxuICBjYWxsaW5nU2VydmljZS5nZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlLmJpbmQoY2FsbGluZ1NlcnZpY2UpO1xuXG5hc3luYyBmdW5jdGlvbiBub3RpZnlGb3JDYWxsKFxuICB0aXRsZTogc3RyaW5nLFxuICBpc1ZpZGVvQ2FsbDogYm9vbGVhblxuKTogUHJvbWlzZTx2b2lkPiB7XG4gIGNvbnN0IHNob3VsZE5vdGlmeSA9XG4gICAgIXdpbmRvdy5pc0FjdGl2ZSgpICYmIHdpbmRvdy5FdmVudHMuZ2V0Q2FsbFN5c3RlbU5vdGlmaWNhdGlvbigpO1xuICBpZiAoIXNob3VsZE5vdGlmeSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGxldCBub3RpZmljYXRpb25UaXRsZTogc3RyaW5nO1xuXG4gIGNvbnN0IG5vdGlmaWNhdGlvblNldHRpbmcgPSBub3RpZmljYXRpb25TZXJ2aWNlLmdldE5vdGlmaWNhdGlvblNldHRpbmcoKTtcbiAgc3dpdGNoIChub3RpZmljYXRpb25TZXR0aW5nKSB7XG4gICAgY2FzZSBOb3RpZmljYXRpb25TZXR0aW5nLk9mZjpcbiAgICBjYXNlIE5vdGlmaWNhdGlvblNldHRpbmcuTm9OYW1lT3JNZXNzYWdlOlxuICAgICAgbm90aWZpY2F0aW9uVGl0bGUgPSBGQUxMQkFDS19OT1RJRklDQVRJT05fVElUTEU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIE5vdGlmaWNhdGlvblNldHRpbmcuTmFtZU9ubHk6XG4gICAgY2FzZSBOb3RpZmljYXRpb25TZXR0aW5nLk5hbWVBbmRNZXNzYWdlOlxuICAgICAgbm90aWZpY2F0aW9uVGl0bGUgPSB0aXRsZTtcbiAgICAgIGJyZWFrO1xuICAgIGRlZmF1bHQ6XG4gICAgICBsb2cuZXJyb3IobWlzc2luZ0Nhc2VFcnJvcihub3RpZmljYXRpb25TZXR0aW5nKSk7XG4gICAgICBub3RpZmljYXRpb25UaXRsZSA9IEZBTExCQUNLX05PVElGSUNBVElPTl9USVRMRTtcbiAgICAgIGJyZWFrO1xuICB9XG5cbiAgbm90aWZpY2F0aW9uU2VydmljZS5ub3RpZnkoe1xuICAgIHRpdGxlOiBub3RpZmljYXRpb25UaXRsZSxcbiAgICBpY29uOiBpc1ZpZGVvQ2FsbFxuICAgICAgPyAnaW1hZ2VzL2ljb25zL3YyL3ZpZGVvLXNvbGlkLTI0LnN2ZydcbiAgICAgIDogJ2ltYWdlcy9pY29ucy92Mi9waG9uZS1yaWdodC1zb2xpZC0yNC5zdmcnLFxuICAgIG1lc3NhZ2U6IHdpbmRvdy5pMThuKFxuICAgICAgaXNWaWRlb0NhbGwgPyAnaW5jb21pbmdWaWRlb0NhbGwnIDogJ2luY29taW5nQXVkaW9DYWxsJ1xuICAgICksXG4gICAgb25Ob3RpZmljYXRpb25DbGljazogKCkgPT4ge1xuICAgICAgd2luZG93LnNob3dXaW5kb3coKTtcbiAgICB9LFxuICAgIHNpbGVudDogZmFsc2UsXG4gIH0pO1xufVxuXG5jb25zdCBwbGF5UmluZ3RvbmUgPSBjYWxsaW5nVG9uZXMucGxheVJpbmd0b25lLmJpbmQoY2FsbGluZ1RvbmVzKTtcbmNvbnN0IHN0b3BSaW5ndG9uZSA9IGNhbGxpbmdUb25lcy5zdG9wUmluZ3RvbmUuYmluZChjYWxsaW5nVG9uZXMpO1xuXG5jb25zdCBtYXBTdGF0ZVRvQWN0aXZlQ2FsbFByb3AgPSAoXG4gIHN0YXRlOiBTdGF0ZVR5cGVcbik6IHVuZGVmaW5lZCB8IEFjdGl2ZUNhbGxUeXBlID0+IHtcbiAgY29uc3QgeyBjYWxsaW5nIH0gPSBzdGF0ZTtcbiAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IGNhbGxpbmc7XG5cbiAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgY2FsbCA9IGdldEFjdGl2ZUNhbGwoY2FsbGluZyk7XG4gIGlmICghY2FsbCkge1xuICAgIGxvZy5lcnJvcignVGhlcmUgd2FzIGFuIGFjdGl2ZSBjYWxsIHN0YXRlIGJ1dCBubyBjb3JyZXNwb25kaW5nIGNhbGwnKTtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgY29udmVyc2F0aW9uU2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSk7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGNvbnZlcnNhdGlvblNlbGVjdG9yKGFjdGl2ZUNhbGxTdGF0ZS5jb252ZXJzYXRpb25JZCk7XG4gIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgbG9nLmVycm9yKCdUaGUgYWN0aXZlIGNhbGwgaGFzIG5vIGNvcnJlc3BvbmRpbmcgY29udmVyc2F0aW9uJyk7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnNhdGlvblNlbGVjdG9yQnlVdWlkID0gbWVtb2l6ZTxcbiAgICAodXVpZDogVVVJRFN0cmluZ1R5cGUpID0+IHVuZGVmaW5lZCB8IENvbnZlcnNhdGlvblR5cGVcbiAgPih1dWlkID0+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb25JZCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmVuc3VyZUNvbnRhY3RJZHMoe1xuICAgICAgdXVpZCxcbiAgICB9KTtcbiAgICByZXR1cm4gY29udmVyc2F0aW9uSWQgPyBjb252ZXJzYXRpb25TZWxlY3Rvcihjb252ZXJzYXRpb25JZCkgOiB1bmRlZmluZWQ7XG4gIH0pO1xuXG4gIGNvbnN0IGJhc2VSZXN1bHQgPSB7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIGhhc0xvY2FsQXVkaW86IGFjdGl2ZUNhbGxTdGF0ZS5oYXNMb2NhbEF1ZGlvLFxuICAgIGhhc0xvY2FsVmlkZW86IGFjdGl2ZUNhbGxTdGF0ZS5oYXNMb2NhbFZpZGVvLFxuICAgIGxvY2FsQXVkaW9MZXZlbDogYWN0aXZlQ2FsbFN0YXRlLmxvY2FsQXVkaW9MZXZlbCxcbiAgICB2aWV3TW9kZTogYWN0aXZlQ2FsbFN0YXRlLnZpZXdNb2RlLFxuICAgIGpvaW5lZEF0OiBhY3RpdmVDYWxsU3RhdGUuam9pbmVkQXQsXG4gICAgb3V0Z29pbmdSaW5nOiBhY3RpdmVDYWxsU3RhdGUub3V0Z29pbmdSaW5nLFxuICAgIHBpcDogYWN0aXZlQ2FsbFN0YXRlLnBpcCxcbiAgICBwcmVzZW50aW5nU291cmNlOiBhY3RpdmVDYWxsU3RhdGUucHJlc2VudGluZ1NvdXJjZSxcbiAgICBwcmVzZW50aW5nU291cmNlc0F2YWlsYWJsZTogYWN0aXZlQ2FsbFN0YXRlLnByZXNlbnRpbmdTb3VyY2VzQXZhaWxhYmxlLFxuICAgIHNldHRpbmdzRGlhbG9nT3BlbjogYWN0aXZlQ2FsbFN0YXRlLnNldHRpbmdzRGlhbG9nT3BlbixcbiAgICBzaG93TmVlZHNTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc1dhcm5pbmc6IEJvb2xlYW4oXG4gICAgICBhY3RpdmVDYWxsU3RhdGUuc2hvd05lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNXYXJuaW5nXG4gICAgKSxcbiAgICBzaG93UGFydGljaXBhbnRzTGlzdDogYWN0aXZlQ2FsbFN0YXRlLnNob3dQYXJ0aWNpcGFudHNMaXN0LFxuICB9O1xuXG4gIHN3aXRjaCAoY2FsbC5jYWxsTW9kZSkge1xuICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OlxuICAgICAgaWYgKFxuICAgICAgICBjYWxsLmlzSW5jb21pbmcgJiZcbiAgICAgICAgKGNhbGwuY2FsbFN0YXRlID09PSBDYWxsU3RhdGUuUHJlcmluZyB8fFxuICAgICAgICAgIGNhbGwuY2FsbFN0YXRlID09PSBDYWxsU3RhdGUuUmluZ2luZylcbiAgICAgICkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2VSZXN1bHQsXG4gICAgICAgIGNhbGxFbmRlZFJlYXNvbjogY2FsbC5jYWxsRW5kZWRSZWFzb24sXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGNhbGxTdGF0ZTogY2FsbC5jYWxsU3RhdGUsXG4gICAgICAgIHBlZWtlZFBhcnRpY2lwYW50czogW10sXG4gICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIGhhc1JlbW90ZVZpZGVvOiBCb29sZWFuKGNhbGwuaGFzUmVtb3RlVmlkZW8pLFxuICAgICAgICAgICAgcHJlc2VudGluZzogQm9vbGVhbihjYWxsLmlzU2hhcmluZ1NjcmVlbiksXG4gICAgICAgICAgICB0aXRsZTogY29udmVyc2F0aW9uLnRpdGxlLFxuICAgICAgICAgICAgdXVpZDogY29udmVyc2F0aW9uLnV1aWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIH07XG4gICAgY2FzZSBDYWxsTW9kZS5Hcm91cDoge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uc1dpdGhTYWZldHlOdW1iZXJDaGFuZ2VzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtdO1xuICAgICAgY29uc3QgZ3JvdXBNZW1iZXJzOiBBcnJheTxDb252ZXJzYXRpb25UeXBlPiA9IFtdO1xuICAgICAgY29uc3QgcmVtb3RlUGFydGljaXBhbnRzOiBBcnJheTxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudFR5cGU+ID0gW107XG4gICAgICBjb25zdCBwZWVrZWRQYXJ0aWNpcGFudHM6IEFycmF5PENvbnZlcnNhdGlvblR5cGU+ID0gW107XG5cbiAgICAgIGNvbnN0IHsgbWVtYmVyc2hpcHMgPSBbXSB9ID0gY29udmVyc2F0aW9uO1xuXG4gICAgICAvLyBBY3RpdmUgY2FsbHMgc2hvdWxkIGhhdmUgcGVlayBpbmZvLCBidXQgVHlwZVNjcmlwdCBkb2Vzbid0IGtub3cgdGhhdCBzbyB3ZSBoYXZlIGFcbiAgICAgIC8vICAgZmFsbGJhY2suXG4gICAgICBjb25zdCB7XG4gICAgICAgIHBlZWtJbmZvID0ge1xuICAgICAgICAgIGRldmljZUNvdW50OiAwLFxuICAgICAgICAgIG1heERldmljZXM6IEluZmluaXR5LFxuICAgICAgICAgIHV1aWRzOiBbXSxcbiAgICAgICAgfSxcbiAgICAgIH0gPSBjYWxsO1xuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IG1lbWJlcnNoaXBzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHsgdXVpZCB9ID0gbWVtYmVyc2hpcHNbaV07XG5cbiAgICAgICAgY29uc3QgbWVtYmVyID0gY29udmVyc2F0aW9uU2VsZWN0b3IodXVpZCk7XG4gICAgICAgIGlmICghbWVtYmVyKSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdHcm91cCBtZW1iZXIgaGFzIG5vIGNvcnJlc3BvbmRpbmcgY29udmVyc2F0aW9uJyk7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cblxuICAgICAgICBncm91cE1lbWJlcnMucHVzaChtZW1iZXIpO1xuICAgICAgfVxuXG4gICAgICBmb3IgKGxldCBpID0gMDsgaSA8IGNhbGwucmVtb3RlUGFydGljaXBhbnRzLmxlbmd0aDsgaSArPSAxKSB7XG4gICAgICAgIGNvbnN0IHJlbW90ZVBhcnRpY2lwYW50ID0gY2FsbC5yZW1vdGVQYXJ0aWNpcGFudHNbaV07XG5cbiAgICAgICAgY29uc3QgcmVtb3RlQ29udmVyc2F0aW9uID0gY29udmVyc2F0aW9uU2VsZWN0b3JCeVV1aWQoXG4gICAgICAgICAgcmVtb3RlUGFydGljaXBhbnQudXVpZFxuICAgICAgICApO1xuICAgICAgICBpZiAoIXJlbW90ZUNvbnZlcnNhdGlvbikge1xuICAgICAgICAgIGxvZy5lcnJvcignUmVtb3RlIHBhcnRpY2lwYW50IGhhcyBubyBjb3JyZXNwb25kaW5nIGNvbnZlcnNhdGlvbicpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzLnB1c2goe1xuICAgICAgICAgIC4uLnJlbW90ZUNvbnZlcnNhdGlvbixcbiAgICAgICAgICBkZW11eElkOiByZW1vdGVQYXJ0aWNpcGFudC5kZW11eElkLFxuICAgICAgICAgIGhhc1JlbW90ZUF1ZGlvOiByZW1vdGVQYXJ0aWNpcGFudC5oYXNSZW1vdGVBdWRpbyxcbiAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogcmVtb3RlUGFydGljaXBhbnQuaGFzUmVtb3RlVmlkZW8sXG4gICAgICAgICAgcHJlc2VudGluZzogcmVtb3RlUGFydGljaXBhbnQucHJlc2VudGluZyxcbiAgICAgICAgICBzaGFyaW5nU2NyZWVuOiByZW1vdGVQYXJ0aWNpcGFudC5zaGFyaW5nU2NyZWVuLFxuICAgICAgICAgIHNwZWFrZXJUaW1lOiByZW1vdGVQYXJ0aWNpcGFudC5zcGVha2VyVGltZSxcbiAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiByZW1vdGVQYXJ0aWNpcGFudC52aWRlb0FzcGVjdFJhdGlvLFxuICAgICAgICB9KTtcbiAgICAgIH1cblxuICAgICAgZm9yIChcbiAgICAgICAgbGV0IGkgPSAwO1xuICAgICAgICBpIDwgYWN0aXZlQ2FsbFN0YXRlLnNhZmV0eU51bWJlckNoYW5nZWRVdWlkcy5sZW5ndGg7XG4gICAgICAgIGkgKz0gMVxuICAgICAgKSB7XG4gICAgICAgIGNvbnN0IHV1aWQgPSBhY3RpdmVDYWxsU3RhdGUuc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzW2ldO1xuXG4gICAgICAgIGNvbnN0IHJlbW90ZUNvbnZlcnNhdGlvbiA9IGNvbnZlcnNhdGlvblNlbGVjdG9yQnlVdWlkKHV1aWQpO1xuICAgICAgICBpZiAoIXJlbW90ZUNvbnZlcnNhdGlvbikge1xuICAgICAgICAgIGxvZy5lcnJvcignUmVtb3RlIHBhcnRpY2lwYW50IGhhcyBubyBjb3JyZXNwb25kaW5nIGNvbnZlcnNhdGlvbicpO1xuICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG5cbiAgICAgICAgY29udmVyc2F0aW9uc1dpdGhTYWZldHlOdW1iZXJDaGFuZ2VzLnB1c2gocmVtb3RlQ29udmVyc2F0aW9uKTtcbiAgICAgIH1cblxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBwZWVrSW5mby51dWlkcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgICBjb25zdCBwZWVrZWRQYXJ0aWNpcGFudFV1aWQgPSBwZWVrSW5mby51dWlkc1tpXTtcblxuICAgICAgICBjb25zdCBwZWVrZWRDb252ZXJzYXRpb24gPSBjb252ZXJzYXRpb25TZWxlY3RvckJ5VXVpZChcbiAgICAgICAgICBwZWVrZWRQYXJ0aWNpcGFudFV1aWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKCFwZWVrZWRDb252ZXJzYXRpb24pIHtcbiAgICAgICAgICBsb2cuZXJyb3IoJ1JlbW90ZSBwYXJ0aWNpcGFudCBoYXMgbm8gY29ycmVzcG9uZGluZyBjb252ZXJzYXRpb24nKTtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHBlZWtlZFBhcnRpY2lwYW50cy5wdXNoKHBlZWtlZENvbnZlcnNhdGlvbik7XG4gICAgICB9XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIC4uLmJhc2VSZXN1bHQsXG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29ubmVjdGlvblN0YXRlOiBjYWxsLmNvbm5lY3Rpb25TdGF0ZSxcbiAgICAgICAgY29udmVyc2F0aW9uc1dpdGhTYWZldHlOdW1iZXJDaGFuZ2VzLFxuICAgICAgICBkZXZpY2VDb3VudDogcGVla0luZm8uZGV2aWNlQ291bnQsXG4gICAgICAgIGdyb3VwTWVtYmVycyxcbiAgICAgICAgam9pblN0YXRlOiBjYWxsLmpvaW5TdGF0ZSxcbiAgICAgICAgbWF4RGV2aWNlczogcGVla0luZm8ubWF4RGV2aWNlcyxcbiAgICAgICAgcGVla2VkUGFydGljaXBhbnRzLFxuICAgICAgICByZW1vdGVQYXJ0aWNpcGFudHMsXG4gICAgICAgIHJlbW90ZUF1ZGlvTGV2ZWxzOiBjYWxsLnJlbW90ZUF1ZGlvTGV2ZWxzIHx8IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KCksXG4gICAgICB9O1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjYWxsKTtcbiAgfVxufTtcblxuY29uc3QgbWFwU3RhdGVUb0luY29taW5nQ2FsbFByb3AgPSAoc3RhdGU6IFN0YXRlVHlwZSkgPT4ge1xuICBjb25zdCBjYWxsID0gZ2V0SW5jb21pbmdDYWxsKHN0YXRlKTtcbiAgaWYgKCFjYWxsKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldENvbnZlcnNhdGlvblNlbGVjdG9yKHN0YXRlKShjYWxsLmNvbnZlcnNhdGlvbklkKTtcbiAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICBsb2cuZXJyb3IoJ1RoZSBpbmNvbWluZyBjYWxsIGhhcyBubyBjb3JyZXNwb25kaW5nIGNvbnZlcnNhdGlvbicpO1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBzd2l0Y2ggKGNhbGwuY2FsbE1vZGUpIHtcbiAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QgYXMgY29uc3QsXG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgaXNWaWRlb0NhbGw6IGNhbGwuaXNWaWRlb0NhbGwsXG4gICAgICB9O1xuICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6IHtcbiAgICAgIGlmICghY2FsbC5yaW5nZXJVdWlkKSB7XG4gICAgICAgIGxvZy5lcnJvcignVGhlIGluY29taW5nIGdyb3VwIGNhbGwgaGFzIG5vIHJpbmcgc3RhdGUnKTtcbiAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY29udmVyc2F0aW9uU2VsZWN0b3IgPSBnZXRDb252ZXJzYXRpb25TZWxlY3RvcihzdGF0ZSk7XG4gICAgICBjb25zdCByaW5nZXIgPSBjb252ZXJzYXRpb25TZWxlY3RvcihjYWxsLnJpbmdlclV1aWQpO1xuICAgICAgY29uc3Qgb3RoZXJNZW1iZXJzUnVuZyA9IChjb252ZXJzYXRpb24uc29ydGVkR3JvdXBNZW1iZXJzID8/IFtdKS5maWx0ZXIoXG4gICAgICAgIGMgPT4gYy5pZCAhPT0gcmluZ2VyLmlkICYmICFjLmlzTWVcbiAgICAgICk7XG5cbiAgICAgIHJldHVybiB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCBhcyBjb25zdCxcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBvdGhlck1lbWJlcnNSdW5nLFxuICAgICAgICByaW5nZXIsXG4gICAgICB9O1xuICAgIH1cbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjYWxsKTtcbiAgfVxufTtcblxuY29uc3QgbWFwU3RhdGVUb1Byb3BzID0gKHN0YXRlOiBTdGF0ZVR5cGUpID0+ICh7XG4gIGFjdGl2ZUNhbGw6IG1hcFN0YXRlVG9BY3RpdmVDYWxsUHJvcChzdGF0ZSksXG4gIGJvdW5jZUFwcEljb25TdGFydCxcbiAgYm91bmNlQXBwSWNvblN0b3AsXG4gIGF2YWlsYWJsZUNhbWVyYXM6IHN0YXRlLmNhbGxpbmcuYXZhaWxhYmxlQ2FtZXJhcyxcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSxcbiAgZ2V0UHJlZmVycmVkQmFkZ2U6IGdldFByZWZlcnJlZEJhZGdlU2VsZWN0b3Ioc3RhdGUpLFxuICBpMThuOiBnZXRJbnRsKHN0YXRlKSxcbiAgaXNHcm91cENhbGxPdXRib3VuZFJpbmdFbmFibGVkOiBpc0dyb3VwQ2FsbE91dGJvdW5kUmluZ0VuYWJsZWQoKSxcbiAgaW5jb21pbmdDYWxsOiBtYXBTdGF0ZVRvSW5jb21pbmdDYWxsUHJvcChzdGF0ZSksXG4gIG1lOiBnZXRNZShzdGF0ZSksXG4gIG5vdGlmeUZvckNhbGwsXG4gIHBsYXlSaW5ndG9uZSxcbiAgc3RvcFJpbmd0b25lLFxuICByZW5kZXJEZXZpY2VTZWxlY3Rpb24sXG4gIHJlbmRlclNhZmV0eU51bWJlclZpZXdlcixcbiAgdGhlbWU6IGdldFRoZW1lKHN0YXRlKSxcbn0pO1xuXG5jb25zdCBzbWFydCA9IGNvbm5lY3QobWFwU3RhdGVUb1Byb3BzLCBtYXBEaXNwYXRjaFRvUHJvcHMpO1xuXG5leHBvcnQgY29uc3QgU21hcnRDYWxsTWFuYWdlciA9IHNtYXJ0KENhbGxNYW5hZ2VyKTtcbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxtQkFBa0I7QUFDbEIseUJBQXdCO0FBQ3hCLG9CQUF3QjtBQUN4QixxQkFBbUM7QUFDbkMseUJBQTRCO0FBQzVCLHFCQUEwQztBQUMxQyxrQkFBa0M7QUFDbEMsMkJBQStDO0FBQy9DLHNCQUE4QjtBQUU5QixzQkFBZ0M7QUFDaEMsNENBQStDO0FBTS9DLHFCQUFvQztBQUVwQyw4QkFBaUM7QUFDakMsb0NBQTRDO0FBRTVDLGdDQUF3QztBQUN4QywwQkFBNkI7QUFDN0IsMkJBR087QUFDUCwyQkFJTztBQUNQLFVBQXFCO0FBQ3JCLG9CQUEwQztBQUUxQyxpQ0FBOEM7QUFDNUMsU0FBTyxtREFBQywrREFBNEI7QUFDdEM7QUFGUyxBQUlULGtDQUFrQyxPQUF1QztBQUN2RSxTQUFPLG1EQUFDO0FBQUEsT0FBNEI7QUFBQSxHQUFPO0FBQzdDO0FBRlMsQUFJVCxNQUFNLCtCQUNKLHVCQUFlLDZCQUE2QixLQUFLLHNCQUFjO0FBRWpFLDZCQUNFLE9BQ0EsYUFDZTtBQUNmLFFBQU0sZUFDSixDQUFDLE9BQU8sU0FBUyxLQUFLLE9BQU8sT0FBTywwQkFBMEI7QUFDaEUsTUFBSSxDQUFDLGNBQWM7QUFDakI7QUFBQSxFQUNGO0FBRUEsTUFBSTtBQUVKLFFBQU0sc0JBQXNCLHlDQUFvQix1QkFBdUI7QUFDdkUsVUFB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
