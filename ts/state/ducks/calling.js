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
var calling_exports = {};
__export(calling_exports, {
  actions: () => actions,
  getActiveCall: () => getActiveCall,
  getEmptyState: () => getEmptyState,
  getIncomingCall: () => getIncomingCall,
  isAnybodyElseInGroupCall: () => isAnybodyElseInGroupCall,
  reducer: () => reducer
});
module.exports = __toCommonJS(calling_exports);
var import_electron = require("electron");
var import_ringrtc = require("ringrtc");
var import_mac_screen_capture_permissions = require("mac-screen-capture-permissions");
var import_lodash = require("lodash");
var import_getOwn = require("../../util/getOwn");
var Errors = __toESM(require("../../types/errors"));
var import_user = require("../selectors/user");
var import_isConversationTooBigToRing = require("../../conversations/isConversationTooBigToRing");
var import_missingCaseError = require("../../util/missingCaseError");
var import_calling = require("../../services/calling");
var import_truncateAudioLevel = require("../../calling/truncateAudioLevel");
var import_Calling = require("../../types/Calling");
var import_callingTones = require("../../util/callingTones");
var import_callingPermissions = require("../../util/callingPermissions");
var import_isGroupCallOutboundRingEnabled = require("../../util/isGroupCallOutboundRingEnabled");
var import_sleep = require("../../util/sleep");
var import_LatestQueue = require("../../util/LatestQueue");
var import_conversations = require("./conversations");
var log = __toESM(require("../../logging/log"));
var import_assert = require("../../util/assert");
var import_waitForOnline = require("../../util/waitForOnline");
var mapUtil = __toESM(require("../../util/mapUtil"));
const getActiveCall = /* @__PURE__ */ __name(({
  activeCallState,
  callsByConversation
}) => activeCallState && (0, import_getOwn.getOwn)(callsByConversation, activeCallState.conversationId), "getActiveCall");
const getIncomingCall = /* @__PURE__ */ __name((callsByConversation, ourUuid) => Object.values(callsByConversation).find((call) => {
  switch (call.callMode) {
    case import_Calling.CallMode.Direct:
      return call.isIncoming && call.callState === import_Calling.CallState.Ringing;
    case import_Calling.CallMode.Group:
      return call.ringerUuid && call.connectionState === import_Calling.GroupCallConnectionState.NotConnected && isAnybodyElseInGroupCall(call.peekInfo, ourUuid);
    default:
      throw (0, import_missingCaseError.missingCaseError)(call);
  }
}), "getIncomingCall");
const isAnybodyElseInGroupCall = /* @__PURE__ */ __name((peekInfo, ourUuid) => Boolean(peekInfo?.uuids.some((id) => id !== ourUuid)), "isAnybodyElseInGroupCall");
const getGroupCallRingState = /* @__PURE__ */ __name((call) => call?.ringId === void 0 ? {} : { ringId: call.ringId, ringerUuid: call.ringerUuid }, "getGroupCallRingState");
const peekQueueByConversation = /* @__PURE__ */ new Map();
const doGroupCallPeek = /* @__PURE__ */ __name((conversationId, dispatch, getState) => {
  const conversation = (0, import_getOwn.getOwn)(getState().conversations.conversationLookup, conversationId);
  if (!conversation || (0, import_conversations.getConversationCallMode)(conversation) !== import_Calling.CallMode.Group) {
    return;
  }
  let queue = peekQueueByConversation.get(conversationId);
  if (!queue) {
    queue = new import_LatestQueue.LatestQueue();
    queue.onceEmpty(() => {
      peekQueueByConversation.delete(conversationId);
    });
    peekQueueByConversation.set(conversationId, queue);
  }
  queue.add(async () => {
    const state = getState();
    const existingCall = (0, import_getOwn.getOwn)(state.calling.callsByConversation, conversationId);
    if (existingCall?.callMode === import_Calling.CallMode.Group && existingCall.connectionState !== import_Calling.GroupCallConnectionState.NotConnected) {
      return;
    }
    await Promise.all([(0, import_sleep.sleep)(1e3), (0, import_waitForOnline.waitForOnline)(navigator, window)]);
    let peekInfo;
    try {
      peekInfo = await import_calling.calling.peekGroupCall(conversationId);
    } catch (err) {
      log.error("Group call peeking failed", Errors.toLogFormat(err));
      return;
    }
    if (!peekInfo) {
      return;
    }
    log.info(`doGroupCallPeek/groupv2(${conversation.groupId}): Found ${peekInfo.deviceCount} devices`);
    await import_calling.calling.updateCallHistoryForGroupCall(conversationId, peekInfo);
    const formattedPeekInfo = import_calling.calling.formatGroupCallPeekInfoForRedux(peekInfo);
    dispatch({
      type: PEEK_GROUP_CALL_FULFILLED,
      payload: {
        conversationId,
        peekInfo: formattedPeekInfo
      }
    });
  });
}, "doGroupCallPeek");
const ACCEPT_CALL_PENDING = "calling/ACCEPT_CALL_PENDING";
const CANCEL_CALL = "calling/CANCEL_CALL";
const CANCEL_INCOMING_GROUP_CALL_RING = "calling/CANCEL_INCOMING_GROUP_CALL_RING";
const START_CALLING_LOBBY = "calling/START_CALLING_LOBBY";
const CALL_STATE_CHANGE_FULFILLED = "calling/CALL_STATE_CHANGE_FULFILLED";
const CHANGE_IO_DEVICE_FULFILLED = "calling/CHANGE_IO_DEVICE_FULFILLED";
const CLOSE_NEED_PERMISSION_SCREEN = "calling/CLOSE_NEED_PERMISSION_SCREEN";
const DECLINE_DIRECT_CALL = "calling/DECLINE_DIRECT_CALL";
const GROUP_CALL_AUDIO_LEVELS_CHANGE = "calling/GROUP_CALL_AUDIO_LEVELS_CHANGE";
const GROUP_CALL_STATE_CHANGE = "calling/GROUP_CALL_STATE_CHANGE";
const HANG_UP = "calling/HANG_UP";
const INCOMING_DIRECT_CALL = "calling/INCOMING_DIRECT_CALL";
const INCOMING_GROUP_CALL = "calling/INCOMING_GROUP_CALL";
const MARK_CALL_TRUSTED = "calling/MARK_CALL_TRUSTED";
const MARK_CALL_UNTRUSTED = "calling/MARK_CALL_UNTRUSTED";
const OUTGOING_CALL = "calling/OUTGOING_CALL";
const PEEK_GROUP_CALL_FULFILLED = "calling/PEEK_GROUP_CALL_FULFILLED";
const REFRESH_IO_DEVICES = "calling/REFRESH_IO_DEVICES";
const REMOTE_SHARING_SCREEN_CHANGE = "calling/REMOTE_SHARING_SCREEN_CHANGE";
const REMOTE_VIDEO_CHANGE = "calling/REMOTE_VIDEO_CHANGE";
const RETURN_TO_ACTIVE_CALL = "calling/RETURN_TO_ACTIVE_CALL";
const SET_LOCAL_AUDIO_FULFILLED = "calling/SET_LOCAL_AUDIO_FULFILLED";
const SET_LOCAL_VIDEO_FULFILLED = "calling/SET_LOCAL_VIDEO_FULFILLED";
const SET_OUTGOING_RING = "calling/SET_OUTGOING_RING";
const SET_PRESENTING = "calling/SET_PRESENTING";
const SET_PRESENTING_SOURCES = "calling/SET_PRESENTING_SOURCES";
const TOGGLE_NEEDS_SCREEN_RECORDING_PERMISSIONS = "calling/TOGGLE_NEEDS_SCREEN_RECORDING_PERMISSIONS";
const START_DIRECT_CALL = "calling/START_DIRECT_CALL";
const TOGGLE_PARTICIPANTS = "calling/TOGGLE_PARTICIPANTS";
const TOGGLE_PIP = "calling/TOGGLE_PIP";
const TOGGLE_SETTINGS = "calling/TOGGLE_SETTINGS";
const TOGGLE_SPEAKER_VIEW = "calling/TOGGLE_SPEAKER_VIEW";
const SWITCH_TO_PRESENTATION_VIEW = "calling/SWITCH_TO_PRESENTATION_VIEW";
const SWITCH_FROM_PRESENTATION_VIEW = "calling/SWITCH_FROM_PRESENTATION_VIEW";
function acceptCall(payload) {
  return async (dispatch, getState) => {
    const { conversationId, asVideoCall } = payload;
    const call = (0, import_getOwn.getOwn)(getState().calling.callsByConversation, conversationId);
    if (!call) {
      log.error("Trying to accept a non-existent call");
      return;
    }
    switch (call.callMode) {
      case import_Calling.CallMode.Direct:
        await import_calling.calling.acceptDirectCall(conversationId, asVideoCall);
        break;
      case import_Calling.CallMode.Group:
        await import_calling.calling.joinGroupCall(conversationId, true, asVideoCall, false);
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(call);
    }
    dispatch({
      type: ACCEPT_CALL_PENDING,
      payload
    });
  };
}
function callStateChange(payload) {
  return async (dispatch) => {
    const { callState } = payload;
    if (callState === import_Calling.CallState.Ended) {
      await import_callingTones.callingTones.playEndCall();
      import_electron.ipcRenderer.send("close-screen-share-controller");
    }
    dispatch({
      type: CALL_STATE_CHANGE_FULFILLED,
      payload
    });
  };
}
function changeIODevice(payload) {
  return async (dispatch) => {
    if (payload.type === import_Calling.CallingDeviceType.CAMERA) {
      await import_calling.calling.setPreferredCamera(payload.selectedDevice);
    } else if (payload.type === import_Calling.CallingDeviceType.MICROPHONE) {
      import_calling.calling.setPreferredMicrophone(payload.selectedDevice);
    } else if (payload.type === import_Calling.CallingDeviceType.SPEAKER) {
      import_calling.calling.setPreferredSpeaker(payload.selectedDevice);
    }
    dispatch({
      type: CHANGE_IO_DEVICE_FULFILLED,
      payload
    });
  };
}
function closeNeedPermissionScreen() {
  return {
    type: CLOSE_NEED_PERMISSION_SCREEN,
    payload: null
  };
}
function cancelCall(payload) {
  import_calling.calling.stopCallingLobby(payload.conversationId);
  return {
    type: CANCEL_CALL
  };
}
function cancelIncomingGroupCallRing(payload) {
  return {
    type: CANCEL_INCOMING_GROUP_CALL_RING,
    payload
  };
}
function declineCall(payload) {
  return (dispatch, getState) => {
    const { conversationId } = payload;
    const call = (0, import_getOwn.getOwn)(getState().calling.callsByConversation, conversationId);
    if (!call) {
      log.error("Trying to decline a non-existent call");
      return;
    }
    switch (call.callMode) {
      case import_Calling.CallMode.Direct:
        import_calling.calling.declineDirectCall(conversationId);
        dispatch({
          type: DECLINE_DIRECT_CALL,
          payload
        });
        break;
      case import_Calling.CallMode.Group: {
        const { ringId } = call;
        if (ringId === void 0) {
          log.error("Trying to decline a group call without a ring ID");
        } else {
          import_calling.calling.declineGroupCall(conversationId, ringId);
          dispatch({
            type: CANCEL_INCOMING_GROUP_CALL_RING,
            payload: { conversationId, ringId }
          });
        }
        break;
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(call);
    }
  };
}
function getPresentingSources() {
  return async (dispatch, getState) => {
    const platform = (0, import_user.getPlatform)(getState());
    const needsPermission = platform === "darwin" && !(0, import_mac_screen_capture_permissions.hasScreenCapturePermission)();
    const sources = await import_calling.calling.getPresentingSources();
    if (needsPermission) {
      dispatch({
        type: TOGGLE_NEEDS_SCREEN_RECORDING_PERMISSIONS
      });
      return;
    }
    dispatch({
      type: SET_PRESENTING_SOURCES,
      payload: sources
    });
  };
}
function groupCallAudioLevelsChange(payload) {
  return { type: GROUP_CALL_AUDIO_LEVELS_CHANGE, payload };
}
function groupCallStateChange(payload) {
  return async (dispatch, getState) => {
    let didSomeoneStartPresenting;
    const activeCall = getActiveCall(getState().calling);
    if (activeCall?.callMode === import_Calling.CallMode.Group) {
      const wasSomeonePresenting = activeCall.remoteParticipants.some((participant) => participant.presenting);
      const isSomeonePresenting = payload.remoteParticipants.some((participant) => participant.presenting);
      didSomeoneStartPresenting = !wasSomeonePresenting && isSomeonePresenting;
    } else {
      didSomeoneStartPresenting = false;
    }
    const { ourUuid } = getState().user;
    (0, import_assert.strictAssert)(ourUuid, "groupCallStateChange failed to fetch our uuid");
    dispatch({
      type: GROUP_CALL_STATE_CHANGE,
      payload: {
        ...payload,
        ourUuid
      }
    });
    if (didSomeoneStartPresenting) {
      import_callingTones.callingTones.someonePresenting();
    }
    if (payload.connectionState === import_Calling.GroupCallConnectionState.NotConnected) {
      import_electron.ipcRenderer.send("close-screen-share-controller");
    }
  };
}
function hangUpActiveCall() {
  return async (dispatch, getState) => {
    const state = getState();
    const activeCall = getActiveCall(state.calling);
    if (!activeCall) {
      return;
    }
    const { conversationId } = activeCall;
    import_calling.calling.hangup(conversationId);
    dispatch({
      type: HANG_UP,
      payload: {
        conversationId
      }
    });
    if (activeCall.callMode === import_Calling.CallMode.Group) {
      await (0, import_sleep.sleep)(1e3);
      doGroupCallPeek(conversationId, dispatch, getState);
    }
  };
}
function keyChanged(payload) {
  return (dispatch, getState) => {
    const state = getState();
    const { activeCallState } = state.calling;
    const activeCall = getActiveCall(state.calling);
    if (!activeCall || !activeCallState) {
      return;
    }
    if (activeCall.callMode === import_Calling.CallMode.Group) {
      const uuidsChanged = new Set(activeCallState.safetyNumberChangedUuids);
      activeCall.remoteParticipants.forEach((participant) => {
        if (participant.uuid === payload.uuid) {
          uuidsChanged.add(participant.uuid);
        }
      });
      const safetyNumberChangedUuids = Array.from(uuidsChanged);
      if (safetyNumberChangedUuids.length) {
        dispatch({
          type: MARK_CALL_UNTRUSTED,
          payload: {
            safetyNumberChangedUuids
          }
        });
      }
    }
  };
}
function keyChangeOk(payload) {
  return (dispatch) => {
    import_calling.calling.resendGroupCallMediaKeys(payload.conversationId);
    dispatch({
      type: MARK_CALL_TRUSTED,
      payload: null
    });
  };
}
function receiveIncomingDirectCall(payload) {
  return {
    type: INCOMING_DIRECT_CALL,
    payload
  };
}
function receiveIncomingGroupCall(payload) {
  return {
    type: INCOMING_GROUP_CALL,
    payload
  };
}
function openSystemPreferencesAction() {
  return () => {
    (0, import_mac_screen_capture_permissions.openSystemPreferences)();
  };
}
function outgoingCall(payload) {
  return {
    type: OUTGOING_CALL,
    payload
  };
}
function peekGroupCallForTheFirstTime(conversationId) {
  return (dispatch, getState) => {
    const call = (0, import_getOwn.getOwn)(getState().calling.callsByConversation, conversationId);
    const shouldPeek = !call || call.callMode === import_Calling.CallMode.Group && !call.peekInfo;
    if (shouldPeek) {
      doGroupCallPeek(conversationId, dispatch, getState);
    }
  };
}
function peekGroupCallIfItHasMembers(conversationId) {
  return (dispatch, getState) => {
    const call = (0, import_getOwn.getOwn)(getState().calling.callsByConversation, conversationId);
    const shouldPeek = call && call.callMode === import_Calling.CallMode.Group && call.joinState === import_Calling.GroupCallJoinState.NotJoined && call.peekInfo && call.peekInfo.deviceCount > 0;
    if (shouldPeek) {
      doGroupCallPeek(conversationId, dispatch, getState);
    }
  };
}
function peekNotConnectedGroupCall(payload) {
  return (dispatch, getState) => {
    const { conversationId } = payload;
    doGroupCallPeek(conversationId, dispatch, getState);
  };
}
function refreshIODevices(payload) {
  return {
    type: REFRESH_IO_DEVICES,
    payload
  };
}
function remoteSharingScreenChange(payload) {
  return {
    type: REMOTE_SHARING_SCREEN_CHANGE,
    payload
  };
}
function remoteVideoChange(payload) {
  return {
    type: REMOTE_VIDEO_CHANGE,
    payload
  };
}
function returnToActiveCall() {
  return {
    type: RETURN_TO_ACTIVE_CALL
  };
}
function setIsCallActive(isCallActive) {
  return () => {
    window.SignalContext.setIsCallActive(isCallActive);
  };
}
function setLocalPreview(payload) {
  return () => {
    import_calling.calling.videoCapturer.setLocalPreview(payload.element);
  };
}
function setRendererCanvas(payload) {
  return () => {
    import_calling.calling.videoRenderer.setCanvas(payload.element);
  };
}
function setLocalAudio(payload) {
  return (dispatch, getState) => {
    const activeCall = getActiveCall(getState().calling);
    if (!activeCall) {
      log.warn("Trying to set local audio when no call is active");
      return;
    }
    import_calling.calling.setOutgoingAudio(activeCall.conversationId, payload.enabled);
    dispatch({
      type: SET_LOCAL_AUDIO_FULFILLED,
      payload
    });
  };
}
function setLocalVideo(payload) {
  return async (dispatch, getState) => {
    const activeCall = getActiveCall(getState().calling);
    if (!activeCall) {
      log.warn("Trying to set local video when no call is active");
      return;
    }
    let enabled;
    if (await (0, import_callingPermissions.requestCameraPermissions)()) {
      if (activeCall.callMode === import_Calling.CallMode.Group || activeCall.callMode === import_Calling.CallMode.Direct && activeCall.callState) {
        import_calling.calling.setOutgoingVideo(activeCall.conversationId, payload.enabled);
      } else if (payload.enabled) {
        import_calling.calling.enableLocalCamera();
      } else {
        import_calling.calling.disableLocalVideo();
      }
      ({ enabled } = payload);
    } else {
      enabled = false;
    }
    dispatch({
      type: SET_LOCAL_VIDEO_FULFILLED,
      payload: {
        ...payload,
        enabled
      }
    });
  };
}
function setGroupCallVideoRequest(payload) {
  return () => {
    import_calling.calling.setGroupCallVideoRequest(payload.conversationId, payload.resolutions.map((resolution) => ({
      ...resolution,
      framerate: void 0
    })));
  };
}
function setPresenting(sourceToPresent) {
  return async (dispatch, getState) => {
    const callingState = getState().calling;
    const { activeCallState } = callingState;
    const activeCall = getActiveCall(callingState);
    if (!activeCall || !activeCallState) {
      log.warn("Trying to present when no call is active");
      return;
    }
    import_calling.calling.setPresenting(activeCall.conversationId, activeCallState.hasLocalVideo, sourceToPresent);
    dispatch({
      type: SET_PRESENTING,
      payload: sourceToPresent
    });
    if (sourceToPresent) {
      await import_callingTones.callingTones.someonePresenting();
    }
  };
}
function setOutgoingRing(payload) {
  return {
    type: SET_OUTGOING_RING,
    payload
  };
}
function startCallingLobby({
  conversationId,
  isVideoCall
}) {
  return async (dispatch, getState) => {
    const state = getState();
    const conversation = (0, import_getOwn.getOwn)(state.conversations.conversationLookup, conversationId);
    (0, import_assert.strictAssert)(conversation, "startCallingLobby: can't start lobby without a conversation");
    (0, import_assert.strictAssert)(!state.calling.activeCallState, "startCallingLobby: can't start lobby if a call is active");
    const groupCall = getGroupCall(conversationId, state.calling);
    const groupCallDeviceCount = groupCall?.peekInfo?.deviceCount || groupCall?.remoteParticipants.length || 0;
    const callLobbyData = await import_calling.calling.startCallingLobby({
      conversation,
      hasLocalAudio: groupCallDeviceCount < 8,
      hasLocalVideo: isVideoCall
    });
    if (!callLobbyData) {
      return;
    }
    dispatch({
      type: START_CALLING_LOBBY,
      payload: {
        ...callLobbyData,
        conversationId,
        isConversationTooBigToRing: (0, import_isConversationTooBigToRing.isConversationTooBigToRing)(conversation)
      }
    });
  };
}
function startCall(payload) {
  return async (dispatch, getState) => {
    switch (payload.callMode) {
      case import_Calling.CallMode.Direct:
        await import_calling.calling.startOutgoingDirectCall(payload.conversationId, payload.hasLocalAudio, payload.hasLocalVideo);
        dispatch({
          type: START_DIRECT_CALL,
          payload
        });
        break;
      case import_Calling.CallMode.Group: {
        let outgoingRing;
        const state = getState();
        const { activeCallState } = state.calling;
        if ((0, import_isGroupCallOutboundRingEnabled.isGroupCallOutboundRingEnabled)() && activeCallState?.outgoingRing) {
          const conversation = (0, import_getOwn.getOwn)(state.conversations.conversationLookup, activeCallState.conversationId);
          outgoingRing = Boolean(conversation && !(0, import_isConversationTooBigToRing.isConversationTooBigToRing)(conversation));
        } else {
          outgoingRing = false;
        }
        await import_calling.calling.joinGroupCall(payload.conversationId, payload.hasLocalAudio, payload.hasLocalVideo, outgoingRing);
        break;
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(payload.callMode);
    }
  };
}
function toggleParticipants() {
  return {
    type: TOGGLE_PARTICIPANTS
  };
}
function togglePip() {
  return {
    type: TOGGLE_PIP
  };
}
function toggleScreenRecordingPermissionsDialog() {
  return {
    type: TOGGLE_NEEDS_SCREEN_RECORDING_PERMISSIONS
  };
}
function toggleSettings() {
  return {
    type: TOGGLE_SETTINGS
  };
}
function toggleSpeakerView() {
  return {
    type: TOGGLE_SPEAKER_VIEW
  };
}
function switchToPresentationView() {
  return {
    type: SWITCH_TO_PRESENTATION_VIEW
  };
}
function switchFromPresentationView() {
  return {
    type: SWITCH_FROM_PRESENTATION_VIEW
  };
}
const actions = {
  acceptCall,
  callStateChange,
  cancelCall,
  cancelIncomingGroupCallRing,
  changeIODevice,
  closeNeedPermissionScreen,
  declineCall,
  getPresentingSources,
  groupCallAudioLevelsChange,
  groupCallStateChange,
  hangUpActiveCall,
  keyChangeOk,
  keyChanged,
  openSystemPreferencesAction,
  outgoingCall,
  peekGroupCallForTheFirstTime,
  peekGroupCallIfItHasMembers,
  peekNotConnectedGroupCall,
  receiveIncomingDirectCall,
  receiveIncomingGroupCall,
  refreshIODevices,
  remoteSharingScreenChange,
  remoteVideoChange,
  returnToActiveCall,
  setGroupCallVideoRequest,
  setIsCallActive,
  setLocalAudio,
  setLocalPreview,
  setLocalVideo,
  setPresenting,
  setRendererCanvas,
  setOutgoingRing,
  startCall,
  startCallingLobby,
  switchToPresentationView,
  switchFromPresentationView,
  toggleParticipants,
  togglePip,
  toggleScreenRecordingPermissionsDialog,
  toggleSettings,
  toggleSpeakerView
};
function getEmptyState() {
  return {
    availableCameras: [],
    availableMicrophones: [],
    availableSpeakers: [],
    selectedCamera: void 0,
    selectedMicrophone: void 0,
    selectedSpeaker: void 0,
    callsByConversation: {},
    activeCallState: void 0
  };
}
function getGroupCall(conversationId, state) {
  const call = (0, import_getOwn.getOwn)(state.callsByConversation, conversationId);
  return call?.callMode === import_Calling.CallMode.Group ? call : void 0;
}
function removeConversationFromState(state, conversationId) {
  return {
    ...conversationId === state.activeCallState?.conversationId ? (0, import_lodash.omit)(state, "activeCallState") : state,
    callsByConversation: (0, import_lodash.omit)(state.callsByConversation, conversationId)
  };
}
function reducer(state = getEmptyState(), action) {
  const { callsByConversation } = state;
  if (action.type === START_CALLING_LOBBY) {
    const { conversationId } = action.payload;
    let call;
    let outgoingRing;
    switch (action.payload.callMode) {
      case import_Calling.CallMode.Direct:
        call = {
          callMode: import_Calling.CallMode.Direct,
          conversationId,
          isIncoming: false,
          isVideoCall: action.payload.hasLocalVideo
        };
        outgoingRing = true;
        break;
      case import_Calling.CallMode.Group: {
        const existingCall = getGroupCall(conversationId, state);
        const ringState = getGroupCallRingState(existingCall);
        call = {
          callMode: import_Calling.CallMode.Group,
          conversationId,
          connectionState: action.payload.connectionState,
          joinState: action.payload.joinState,
          peekInfo: action.payload.peekInfo || existingCall?.peekInfo || {
            uuids: action.payload.remoteParticipants.map(({ uuid }) => uuid),
            maxDevices: Infinity,
            deviceCount: action.payload.remoteParticipants.length
          },
          remoteParticipants: action.payload.remoteParticipants,
          ...ringState
        };
        outgoingRing = (0, import_isGroupCallOutboundRingEnabled.isGroupCallOutboundRingEnabled)() && !ringState.ringId && !call.peekInfo?.uuids.length && !call.remoteParticipants.length && !action.payload.isConversationTooBigToRing;
        break;
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(action.payload);
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [action.payload.conversationId]: call
      },
      activeCallState: {
        conversationId: action.payload.conversationId,
        hasLocalAudio: action.payload.hasLocalAudio,
        hasLocalVideo: action.payload.hasLocalVideo,
        localAudioLevel: 0,
        viewMode: import_Calling.CallViewMode.Grid,
        pip: false,
        safetyNumberChangedUuids: [],
        settingsDialogOpen: false,
        showParticipantsList: false,
        outgoingRing
      }
    };
  }
  if (action.type === START_DIRECT_CALL) {
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [action.payload.conversationId]: {
          callMode: import_Calling.CallMode.Direct,
          conversationId: action.payload.conversationId,
          callState: import_Calling.CallState.Prering,
          isIncoming: false,
          isVideoCall: action.payload.hasLocalVideo
        }
      },
      activeCallState: {
        conversationId: action.payload.conversationId,
        hasLocalAudio: action.payload.hasLocalAudio,
        hasLocalVideo: action.payload.hasLocalVideo,
        localAudioLevel: 0,
        viewMode: import_Calling.CallViewMode.Grid,
        pip: false,
        safetyNumberChangedUuids: [],
        settingsDialogOpen: false,
        showParticipantsList: false,
        outgoingRing: true
      }
    };
  }
  if (action.type === ACCEPT_CALL_PENDING) {
    if (!(0, import_lodash.has)(state.callsByConversation, action.payload.conversationId)) {
      log.warn("Unable to accept a non-existent call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        conversationId: action.payload.conversationId,
        hasLocalAudio: true,
        hasLocalVideo: action.payload.asVideoCall,
        localAudioLevel: 0,
        viewMode: import_Calling.CallViewMode.Grid,
        pip: false,
        safetyNumberChangedUuids: [],
        settingsDialogOpen: false,
        showParticipantsList: false,
        outgoingRing: false
      }
    };
  }
  if (action.type === CANCEL_CALL || action.type === HANG_UP || action.type === CLOSE_NEED_PERMISSION_SCREEN) {
    const activeCall = getActiveCall(state);
    if (!activeCall) {
      log.warn("No active call to remove");
      return state;
    }
    switch (activeCall.callMode) {
      case import_Calling.CallMode.Direct:
        return removeConversationFromState(state, activeCall.conversationId);
      case import_Calling.CallMode.Group:
        return (0, import_lodash.omit)(state, "activeCallState");
      default:
        throw (0, import_missingCaseError.missingCaseError)(activeCall);
    }
  }
  if (action.type === CANCEL_INCOMING_GROUP_CALL_RING) {
    const { conversationId, ringId } = action.payload;
    const groupCall = getGroupCall(conversationId, state);
    if (!groupCall || groupCall.ringId !== ringId) {
      return state;
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: (0, import_lodash.omit)(groupCall, ["ringId", "ringerUuid"])
      }
    };
  }
  if (action.type === "CONVERSATION_CHANGED") {
    const activeCall = getActiveCall(state);
    const { activeCallState } = state;
    if (!activeCallState?.outgoingRing || activeCallState.conversationId !== action.payload.id || activeCall?.callMode !== import_Calling.CallMode.Group || activeCall.joinState !== import_Calling.GroupCallJoinState.NotJoined || !(0, import_isConversationTooBigToRing.isConversationTooBigToRing)(action.payload.data)) {
      return state;
    }
    return {
      ...state,
      activeCallState: { ...activeCallState, outgoingRing: false }
    };
  }
  if (action.type === "CONVERSATION_REMOVED") {
    return removeConversationFromState(state, action.payload.id);
  }
  if (action.type === DECLINE_DIRECT_CALL) {
    return removeConversationFromState(state, action.payload.conversationId);
  }
  if (action.type === INCOMING_DIRECT_CALL) {
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [action.payload.conversationId]: {
          callMode: import_Calling.CallMode.Direct,
          conversationId: action.payload.conversationId,
          callState: import_Calling.CallState.Prering,
          isIncoming: true,
          isVideoCall: action.payload.isVideoCall
        }
      }
    };
  }
  if (action.type === INCOMING_GROUP_CALL) {
    const { conversationId, ringId, ringerUuid } = action.payload;
    let groupCall;
    const existingGroupCall = getGroupCall(conversationId, state);
    if (existingGroupCall) {
      if (existingGroupCall.ringerUuid) {
        log.info("Group call was already ringing");
        return state;
      }
      if (existingGroupCall.joinState !== import_Calling.GroupCallJoinState.NotJoined) {
        log.info("Got a ring for a call we're already in");
        return state;
      }
      groupCall = {
        ...existingGroupCall,
        ringId,
        ringerUuid
      };
    } else {
      groupCall = {
        callMode: import_Calling.CallMode.Group,
        conversationId,
        connectionState: import_Calling.GroupCallConnectionState.NotConnected,
        joinState: import_Calling.GroupCallJoinState.NotJoined,
        peekInfo: {
          uuids: [],
          maxDevices: Infinity,
          deviceCount: 0
        },
        remoteParticipants: [],
        ringId,
        ringerUuid
      };
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: groupCall
      }
    };
  }
  if (action.type === OUTGOING_CALL) {
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [action.payload.conversationId]: {
          callMode: import_Calling.CallMode.Direct,
          conversationId: action.payload.conversationId,
          callState: import_Calling.CallState.Prering,
          isIncoming: false,
          isVideoCall: action.payload.hasLocalVideo
        }
      },
      activeCallState: {
        conversationId: action.payload.conversationId,
        hasLocalAudio: action.payload.hasLocalAudio,
        hasLocalVideo: action.payload.hasLocalVideo,
        localAudioLevel: 0,
        viewMode: import_Calling.CallViewMode.Grid,
        pip: false,
        safetyNumberChangedUuids: [],
        settingsDialogOpen: false,
        showParticipantsList: false,
        outgoingRing: true
      }
    };
  }
  if (action.type === CALL_STATE_CHANGE_FULFILLED) {
    if (action.payload.callState === import_Calling.CallState.Ended && action.payload.callEndedReason !== import_ringrtc.CallEndedReason.RemoteHangupNeedPermission) {
      return removeConversationFromState(state, action.payload.conversationId);
    }
    const call = (0, import_getOwn.getOwn)(state.callsByConversation, action.payload.conversationId);
    if (call?.callMode !== import_Calling.CallMode.Direct) {
      log.warn("Cannot update state for a non-direct call");
      return state;
    }
    let activeCallState;
    if (state.activeCallState?.conversationId === action.payload.conversationId) {
      activeCallState = {
        ...state.activeCallState,
        joinedAt: action.payload.acceptedTime
      };
    } else {
      ({ activeCallState } = state);
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [action.payload.conversationId]: {
          ...call,
          callState: action.payload.callState,
          callEndedReason: action.payload.callEndedReason
        }
      },
      activeCallState
    };
  }
  if (action.type === GROUP_CALL_AUDIO_LEVELS_CHANGE) {
    const { conversationId, remoteDeviceStates } = action.payload;
    const { activeCallState } = state;
    const existingCall = getGroupCall(conversationId, state);
    if (!activeCallState || activeCallState.pip || !existingCall) {
      return state;
    }
    const localAudioLevel = (0, import_truncateAudioLevel.truncateAudioLevel)(action.payload.localAudioLevel);
    const remoteAudioLevels = /* @__PURE__ */ new Map();
    remoteDeviceStates.forEach(({ audioLevel, demuxId }) => {
      if (typeof audioLevel !== "number") {
        return;
      }
      const graded = (0, import_truncateAudioLevel.truncateAudioLevel)(audioLevel);
      if (graded > 0) {
        remoteAudioLevels.set(demuxId, graded);
      }
    });
    const oldLocalAudioLevel = activeCallState.localAudioLevel;
    const oldRemoteAudioLevels = existingCall.remoteAudioLevels;
    if (oldLocalAudioLevel === localAudioLevel && oldRemoteAudioLevels && mapUtil.isEqual(oldRemoteAudioLevels, remoteAudioLevels)) {
      return state;
    }
    return {
      ...state,
      activeCallState: { ...activeCallState, localAudioLevel },
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: { ...existingCall, remoteAudioLevels }
      }
    };
  }
  if (action.type === GROUP_CALL_STATE_CHANGE) {
    const {
      connectionState,
      conversationId,
      hasLocalAudio,
      hasLocalVideo,
      joinState,
      ourUuid,
      peekInfo,
      remoteParticipants
    } = action.payload;
    const existingCall = getGroupCall(conversationId, state);
    const existingRingState = getGroupCallRingState(existingCall);
    const newPeekInfo = peekInfo || existingCall?.peekInfo || {
      uuids: remoteParticipants.map(({ uuid }) => uuid),
      maxDevices: Infinity,
      deviceCount: remoteParticipants.length
    };
    let newActiveCallState;
    if (state.activeCallState?.conversationId === conversationId) {
      newActiveCallState = connectionState === import_Calling.GroupCallConnectionState.NotConnected ? void 0 : {
        ...state.activeCallState,
        hasLocalAudio,
        hasLocalVideo
      };
    } else {
      newActiveCallState = state.activeCallState;
    }
    if (newActiveCallState && newActiveCallState.outgoingRing && newActiveCallState.conversationId === conversationId && isAnybodyElseInGroupCall(newPeekInfo, ourUuid)) {
      newActiveCallState = {
        ...newActiveCallState,
        outgoingRing: false
      };
    }
    let newRingState;
    if (joinState === import_Calling.GroupCallJoinState.NotJoined) {
      newRingState = existingRingState;
    } else {
      newRingState = {};
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: {
          callMode: import_Calling.CallMode.Group,
          conversationId,
          connectionState,
          joinState,
          peekInfo: newPeekInfo,
          remoteParticipants,
          ...newRingState
        }
      },
      activeCallState: newActiveCallState
    };
  }
  if (action.type === PEEK_GROUP_CALL_FULFILLED) {
    const { conversationId, peekInfo } = action.payload;
    const existingCall = getGroupCall(conversationId, state) || {
      callMode: import_Calling.CallMode.Group,
      conversationId,
      connectionState: import_Calling.GroupCallConnectionState.NotConnected,
      joinState: import_Calling.GroupCallJoinState.NotJoined,
      peekInfo: {
        uuids: [],
        maxDevices: Infinity,
        deviceCount: 0
      },
      remoteParticipants: []
    };
    if (existingCall.connectionState !== import_Calling.GroupCallConnectionState.NotConnected) {
      return state;
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: {
          ...existingCall,
          peekInfo
        }
      }
    };
  }
  if (action.type === REMOTE_SHARING_SCREEN_CHANGE) {
    const { conversationId, isSharingScreen } = action.payload;
    const call = (0, import_getOwn.getOwn)(state.callsByConversation, conversationId);
    if (call?.callMode !== import_Calling.CallMode.Direct) {
      log.warn("Cannot update remote video for a non-direct call");
      return state;
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: {
          ...call,
          isSharingScreen
        }
      }
    };
  }
  if (action.type === REMOTE_VIDEO_CHANGE) {
    const { conversationId, hasVideo } = action.payload;
    const call = (0, import_getOwn.getOwn)(state.callsByConversation, conversationId);
    if (call?.callMode !== import_Calling.CallMode.Direct) {
      log.warn("Cannot update remote video for a non-direct call");
      return state;
    }
    return {
      ...state,
      callsByConversation: {
        ...callsByConversation,
        [conversationId]: {
          ...call,
          hasRemoteVideo: hasVideo
        }
      }
    };
  }
  if (action.type === RETURN_TO_ACTIVE_CALL) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot return to active call if there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        pip: false
      }
    };
  }
  if (action.type === SET_LOCAL_AUDIO_FULFILLED) {
    if (!state.activeCallState) {
      log.warn("Cannot set local audio with no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...state.activeCallState,
        hasLocalAudio: action.payload.enabled
      }
    };
  }
  if (action.type === SET_LOCAL_VIDEO_FULFILLED) {
    if (!state.activeCallState) {
      log.warn("Cannot set local video with no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...state.activeCallState,
        hasLocalVideo: action.payload.enabled
      }
    };
  }
  if (action.type === CHANGE_IO_DEVICE_FULFILLED) {
    const { selectedDevice } = action.payload;
    const nextState = /* @__PURE__ */ Object.create(null);
    if (action.payload.type === import_Calling.CallingDeviceType.CAMERA) {
      nextState.selectedCamera = selectedDevice;
    } else if (action.payload.type === import_Calling.CallingDeviceType.MICROPHONE) {
      nextState.selectedMicrophone = selectedDevice;
    } else if (action.payload.type === import_Calling.CallingDeviceType.SPEAKER) {
      nextState.selectedSpeaker = selectedDevice;
    }
    return {
      ...state,
      ...nextState
    };
  }
  if (action.type === REFRESH_IO_DEVICES) {
    const {
      availableMicrophones,
      selectedMicrophone,
      availableSpeakers,
      selectedSpeaker,
      availableCameras,
      selectedCamera
    } = action.payload;
    return {
      ...state,
      availableMicrophones,
      selectedMicrophone,
      availableSpeakers,
      selectedSpeaker,
      availableCameras,
      selectedCamera
    };
  }
  if (action.type === TOGGLE_SETTINGS) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot toggle settings when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        settingsDialogOpen: !activeCallState.settingsDialogOpen
      }
    };
  }
  if (action.type === TOGGLE_PARTICIPANTS) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot toggle participants list when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        showParticipantsList: !activeCallState.showParticipantsList
      }
    };
  }
  if (action.type === TOGGLE_PIP) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot toggle PiP when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        pip: !activeCallState.pip
      }
    };
  }
  if (action.type === SET_PRESENTING) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot toggle presenting when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        presentingSource: action.payload,
        presentingSourcesAvailable: void 0
      }
    };
  }
  if (action.type === SET_PRESENTING_SOURCES) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot set presenting sources when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        presentingSourcesAvailable: action.payload
      }
    };
  }
  if (action.type === SET_OUTGOING_RING) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot set outgoing ring when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        outgoingRing: action.payload
      }
    };
  }
  if (action.type === TOGGLE_NEEDS_SCREEN_RECORDING_PERMISSIONS) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot set presenting sources when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        showNeedsScreenRecordingPermissionsWarning: !activeCallState.showNeedsScreenRecordingPermissionsWarning
      }
    };
  }
  if (action.type === TOGGLE_SPEAKER_VIEW) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot toggle speaker view when there is no active call");
      return state;
    }
    let newViewMode;
    if (activeCallState.viewMode === import_Calling.CallViewMode.Grid) {
      newViewMode = import_Calling.CallViewMode.Speaker;
    } else {
      newViewMode = import_Calling.CallViewMode.Grid;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        viewMode: newViewMode
      }
    };
  }
  if (action.type === SWITCH_TO_PRESENTATION_VIEW) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot switch to speaker view when there is no active call");
      return state;
    }
    if (activeCallState.viewMode === import_Calling.CallViewMode.Speaker) {
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        viewMode: import_Calling.CallViewMode.Presentation
      }
    };
  }
  if (action.type === SWITCH_FROM_PRESENTATION_VIEW) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot switch to speaker view when there is no active call");
      return state;
    }
    if (activeCallState.viewMode !== import_Calling.CallViewMode.Presentation) {
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        viewMode: import_Calling.CallViewMode.Grid
      }
    };
  }
  if (action.type === MARK_CALL_UNTRUSTED) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot mark call as untrusted when there is no active call");
      return state;
    }
    const { safetyNumberChangedUuids } = action.payload;
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        pip: false,
        safetyNumberChangedUuids,
        settingsDialogOpen: false,
        showParticipantsList: false
      }
    };
  }
  if (action.type === MARK_CALL_TRUSTED) {
    const { activeCallState } = state;
    if (!activeCallState) {
      log.warn("Cannot mark call as trusted when there is no active call");
      return state;
    }
    return {
      ...state,
      activeCallState: {
        ...activeCallState,
        safetyNumberChangedUuids: []
      }
    };
  }
  return state;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  actions,
  getActiveCall,
  getEmptyState,
  getIncomingCall,
  isAnybodyElseInGroupCall,
  reducer
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB7IGlwY1JlbmRlcmVyIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHR5cGUgeyBUaHVua0FjdGlvbiwgVGh1bmtEaXNwYXRjaCB9IGZyb20gJ3JlZHV4LXRodW5rJztcbmltcG9ydCB7IENhbGxFbmRlZFJlYXNvbiB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHtcbiAgaGFzU2NyZWVuQ2FwdHVyZVBlcm1pc3Npb24sXG4gIG9wZW5TeXN0ZW1QcmVmZXJlbmNlcyxcbn0gZnJvbSAnbWFjLXNjcmVlbi1jYXB0dXJlLXBlcm1pc3Npb25zJztcbmltcG9ydCB7IGhhcywgb21pdCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyBnZXRPd24gfSBmcm9tICcuLi8uLi91dGlsL2dldE93bic7XG5pbXBvcnQgKiBhcyBFcnJvcnMgZnJvbSAnLi4vLi4vdHlwZXMvZXJyb3JzJztcbmltcG9ydCB7IGdldFBsYXRmb3JtIH0gZnJvbSAnLi4vc2VsZWN0b3JzL3VzZXInO1xuaW1wb3J0IHsgaXNDb252ZXJzYXRpb25Ub29CaWdUb1JpbmcgfSBmcm9tICcuLi8uLi9jb252ZXJzYXRpb25zL2lzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nJztcbmltcG9ydCB7IG1pc3NpbmdDYXNlRXJyb3IgfSBmcm9tICcuLi8uLi91dGlsL21pc3NpbmdDYXNlRXJyb3InO1xuaW1wb3J0IHsgY2FsbGluZyB9IGZyb20gJy4uLy4uL3NlcnZpY2VzL2NhbGxpbmcnO1xuaW1wb3J0IHsgdHJ1bmNhdGVBdWRpb0xldmVsIH0gZnJvbSAnLi4vLi4vY2FsbGluZy90cnVuY2F0ZUF1ZGlvTGV2ZWwnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgYXMgUm9vdFN0YXRlVHlwZSB9IGZyb20gJy4uL3JlZHVjZXInO1xuaW1wb3J0IHR5cGUge1xuICBDaGFuZ2VJT0RldmljZVBheWxvYWRUeXBlLFxuICBHcm91cENhbGxWaWRlb1JlcXVlc3QsXG4gIE1lZGlhRGV2aWNlU2V0dGluZ3MsXG4gIFByZXNlbnRlZFNvdXJjZSxcbiAgUHJlc2VudGFibGVTb3VyY2UsXG59IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHtcbiAgQ2FsbGluZ0RldmljZVR5cGUsXG4gIENhbGxNb2RlLFxuICBDYWxsVmlld01vZGUsXG4gIENhbGxTdGF0ZSxcbiAgR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLFxuICBHcm91cENhbGxKb2luU3RhdGUsXG59IGZyb20gJy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgY2FsbGluZ1RvbmVzIH0gZnJvbSAnLi4vLi4vdXRpbC9jYWxsaW5nVG9uZXMnO1xuaW1wb3J0IHsgcmVxdWVzdENhbWVyYVBlcm1pc3Npb25zIH0gZnJvbSAnLi4vLi4vdXRpbC9jYWxsaW5nUGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgaXNHcm91cENhbGxPdXRib3VuZFJpbmdFbmFibGVkIH0gZnJvbSAnLi4vLi4vdXRpbC9pc0dyb3VwQ2FsbE91dGJvdW5kUmluZ0VuYWJsZWQnO1xuaW1wb3J0IHsgc2xlZXAgfSBmcm9tICcuLi8uLi91dGlsL3NsZWVwJztcbmltcG9ydCB7IExhdGVzdFF1ZXVlIH0gZnJvbSAnLi4vLi4vdXRpbC9MYXRlc3RRdWV1ZSc7XG5pbXBvcnQgdHlwZSB7IFVVSURTdHJpbmdUeXBlIH0gZnJvbSAnLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQgdHlwZSB7XG4gIENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlLFxuICBDb252ZXJzYXRpb25SZW1vdmVkQWN0aW9uVHlwZSxcbn0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IGdldENvbnZlcnNhdGlvbkNhbGxNb2RlIH0gZnJvbSAnLi9jb252ZXJzYXRpb25zJztcbmltcG9ydCAqIGFzIGxvZyBmcm9tICcuLi8uLi9sb2dnaW5nL2xvZyc7XG5pbXBvcnQgeyBzdHJpY3RBc3NlcnQgfSBmcm9tICcuLi8uLi91dGlsL2Fzc2VydCc7XG5pbXBvcnQgeyB3YWl0Rm9yT25saW5lIH0gZnJvbSAnLi4vLi4vdXRpbC93YWl0Rm9yT25saW5lJztcbmltcG9ydCAqIGFzIG1hcFV0aWwgZnJvbSAnLi4vLi4vdXRpbC9tYXBVdGlsJztcblxuLy8gU3RhdGVcblxuZXhwb3J0IHR5cGUgR3JvdXBDYWxsUGVla0luZm9UeXBlID0ge1xuICB1dWlkczogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICBjcmVhdG9yVXVpZD86IFVVSURTdHJpbmdUeXBlO1xuICBlcmFJZD86IHN0cmluZztcbiAgbWF4RGV2aWNlczogbnVtYmVyO1xuICBkZXZpY2VDb3VudDogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgR3JvdXBDYWxsUGFydGljaXBhbnRJbmZvVHlwZSA9IHtcbiAgdXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gIGRlbXV4SWQ6IG51bWJlcjtcbiAgaGFzUmVtb3RlQXVkaW86IGJvb2xlYW47XG4gIGhhc1JlbW90ZVZpZGVvOiBib29sZWFuO1xuICBwcmVzZW50aW5nOiBib29sZWFuO1xuICBzaGFyaW5nU2NyZWVuOiBib29sZWFuO1xuICBzcGVha2VyVGltZT86IG51bWJlcjtcbiAgdmlkZW9Bc3BlY3RSYXRpbzogbnVtYmVyO1xufTtcblxuZXhwb3J0IHR5cGUgRGlyZWN0Q2FsbFN0YXRlVHlwZSA9IHtcbiAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdDtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgY2FsbFN0YXRlPzogQ2FsbFN0YXRlO1xuICBjYWxsRW5kZWRSZWFzb24/OiBDYWxsRW5kZWRSZWFzb247XG4gIGlzSW5jb21pbmc6IGJvb2xlYW47XG4gIGlzU2hhcmluZ1NjcmVlbj86IGJvb2xlYW47XG4gIGlzVmlkZW9DYWxsOiBib29sZWFuO1xuICBoYXNSZW1vdGVWaWRlbz86IGJvb2xlYW47XG59O1xuXG50eXBlIEdyb3VwQ2FsbFJpbmdTdGF0ZVR5cGUgPVxuICB8IHtcbiAgICAgIHJpbmdJZD86IHVuZGVmaW5lZDtcbiAgICAgIHJpbmdlclV1aWQ/OiB1bmRlZmluZWQ7XG4gICAgfVxuICB8IHtcbiAgICAgIHJpbmdJZDogYmlnaW50O1xuICAgICAgcmluZ2VyVXVpZDogVVVJRFN0cmluZ1R5cGU7XG4gICAgfTtcblxuZXhwb3J0IHR5cGUgR3JvdXBDYWxsU3RhdGVUeXBlID0ge1xuICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXA7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlO1xuICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZTtcbiAgcGVla0luZm8/OiBHcm91cENhbGxQZWVrSW5mb1R5cGU7XG4gIHJlbW90ZVBhcnRpY2lwYW50czogQXJyYXk8R3JvdXBDYWxsUGFydGljaXBhbnRJbmZvVHlwZT47XG4gIHJlbW90ZUF1ZGlvTGV2ZWxzPzogTWFwPG51bWJlciwgbnVtYmVyPjtcbn0gJiBHcm91cENhbGxSaW5nU3RhdGVUeXBlO1xuXG5leHBvcnQgdHlwZSBBY3RpdmVDYWxsU3RhdGVUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuO1xuICBoYXNMb2NhbFZpZGVvOiBib29sZWFuO1xuICBsb2NhbEF1ZGlvTGV2ZWw6IG51bWJlcjtcbiAgdmlld01vZGU6IENhbGxWaWV3TW9kZTtcbiAgam9pbmVkQXQ/OiBudW1iZXI7XG4gIG91dGdvaW5nUmluZzogYm9vbGVhbjtcbiAgcGlwOiBib29sZWFuO1xuICBwcmVzZW50aW5nU291cmNlPzogUHJlc2VudGVkU291cmNlO1xuICBwcmVzZW50aW5nU291cmNlc0F2YWlsYWJsZT86IEFycmF5PFByZXNlbnRhYmxlU291cmNlPjtcbiAgc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzOiBBcnJheTxVVUlEU3RyaW5nVHlwZT47XG4gIHNldHRpbmdzRGlhbG9nT3BlbjogYm9vbGVhbjtcbiAgc2hvd05lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNXYXJuaW5nPzogYm9vbGVhbjtcbiAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBDYWxsc0J5Q29udmVyc2F0aW9uVHlwZSA9IHtcbiAgW2NvbnZlcnNhdGlvbklkOiBzdHJpbmddOiBEaXJlY3RDYWxsU3RhdGVUeXBlIHwgR3JvdXBDYWxsU3RhdGVUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgQ2FsbGluZ1N0YXRlVHlwZSA9IE1lZGlhRGV2aWNlU2V0dGluZ3MgJiB7XG4gIGNhbGxzQnlDb252ZXJzYXRpb246IENhbGxzQnlDb252ZXJzYXRpb25UeXBlO1xuICBhY3RpdmVDYWxsU3RhdGU/OiBBY3RpdmVDYWxsU3RhdGVUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgQWNjZXB0Q2FsbFR5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGFzVmlkZW9DYWxsOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgQ2FsbFN0YXRlQ2hhbmdlVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgYWNjZXB0ZWRUaW1lPzogbnVtYmVyO1xuICBjYWxsU3RhdGU6IENhbGxTdGF0ZTtcbiAgY2FsbEVuZGVkUmVhc29uPzogQ2FsbEVuZGVkUmVhc29uO1xuICBpc0luY29taW5nOiBib29sZWFuO1xuICBpc1ZpZGVvQ2FsbDogYm9vbGVhbjtcbiAgdGl0bGU6IHN0cmluZztcbn07XG5cbmV4cG9ydCB0eXBlIENhbmNlbENhbGxUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xufTtcblxudHlwZSBDYW5jZWxJbmNvbWluZ0dyb3VwQ2FsbFJpbmdUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICByaW5nSWQ6IGJpZ2ludDtcbn07XG5cbmV4cG9ydCB0eXBlIERlY2xpbmVDYWxsVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgR3JvdXBDYWxsU3RhdGVDaGFuZ2VBcmd1bWVudFR5cGUgPSB7XG4gIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlO1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuO1xuICBoYXNMb2NhbFZpZGVvOiBib29sZWFuO1xuICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZTtcbiAgcGVla0luZm8/OiBHcm91cENhbGxQZWVrSW5mb1R5cGU7XG4gIHJlbW90ZVBhcnRpY2lwYW50czogQXJyYXk8R3JvdXBDYWxsUGFydGljaXBhbnRJbmZvVHlwZT47XG59O1xuXG50eXBlIEdyb3VwQ2FsbFN0YXRlQ2hhbmdlQWN0aW9uUGF5bG9hZFR5cGUgPVxuICBHcm91cENhbGxTdGF0ZUNoYW5nZUFyZ3VtZW50VHlwZSAmIHtcbiAgICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZTtcbiAgfTtcblxudHlwZSBIYW5nVXBBY3Rpb25QYXlsb2FkVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgS2V5Q2hhbmdlZFR5cGUgPSB7XG4gIHV1aWQ6IFVVSURTdHJpbmdUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgS2V5Q2hhbmdlT2tUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xufTtcblxuZXhwb3J0IHR5cGUgSW5jb21pbmdEaXJlY3RDYWxsVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNWaWRlb0NhbGw6IGJvb2xlYW47XG59O1xuXG50eXBlIEluY29taW5nR3JvdXBDYWxsVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgcmluZ0lkOiBiaWdpbnQ7XG4gIHJpbmdlclV1aWQ6IFVVSURTdHJpbmdUeXBlO1xufTtcblxudHlwZSBQZWVrTm90Q29ubmVjdGVkR3JvdXBDYWxsVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbn07XG5cbnR5cGUgU3RhcnREaXJlY3RDYWxsVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaGFzTG9jYWxBdWRpbzogYm9vbGVhbjtcbiAgaGFzTG9jYWxWaWRlbzogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFN0YXJ0Q2FsbFR5cGUgPSBTdGFydERpcmVjdENhbGxUeXBlICYge1xuICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0IHwgQ2FsbE1vZGUuR3JvdXA7XG59O1xuXG5leHBvcnQgdHlwZSBSZW1vdGVWaWRlb0NoYW5nZVR5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIGhhc1ZpZGVvOiBib29sZWFuO1xufTtcblxudHlwZSBSZW1vdGVTaGFyaW5nU2NyZWVuQ2hhbmdlVHlwZSA9IHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgaXNTaGFyaW5nU2NyZWVuOiBib29sZWFuO1xufTtcblxuZXhwb3J0IHR5cGUgU2V0TG9jYWxBdWRpb1R5cGUgPSB7XG4gIGVuYWJsZWQ6IGJvb2xlYW47XG59O1xuXG5leHBvcnQgdHlwZSBTZXRMb2NhbFZpZGVvVHlwZSA9IHtcbiAgZW5hYmxlZDogYm9vbGVhbjtcbn07XG5cbmV4cG9ydCB0eXBlIFNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdFR5cGUgPSB7XG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gIHJlc29sdXRpb25zOiBBcnJheTxHcm91cENhbGxWaWRlb1JlcXVlc3Q+O1xufTtcblxuZXhwb3J0IHR5cGUgU3RhcnRDYWxsaW5nTG9iYnlUeXBlID0ge1xuICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICBpc1ZpZGVvQ2FsbDogYm9vbGVhbjtcbn07XG5cbnR5cGUgU3RhcnRDYWxsaW5nTG9iYnlQYXlsb2FkVHlwZSA9XG4gIHwge1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdDtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmc7XG4gICAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuO1xuICAgICAgaGFzTG9jYWxWaWRlbzogYm9vbGVhbjtcbiAgICB9XG4gIHwge1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwO1xuICAgICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlO1xuICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGU7XG4gICAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuO1xuICAgICAgaGFzTG9jYWxWaWRlbzogYm9vbGVhbjtcbiAgICAgIGlzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nOiBib29sZWFuO1xuICAgICAgcGVla0luZm8/OiBHcm91cENhbGxQZWVrSW5mb1R5cGU7XG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IEFycmF5PEdyb3VwQ2FsbFBhcnRpY2lwYW50SW5mb1R5cGU+O1xuICAgIH07XG5cbmV4cG9ydCB0eXBlIFNldExvY2FsUHJldmlld1R5cGUgPSB7XG4gIGVsZW1lbnQ6IFJlYWN0LlJlZk9iamVjdDxIVE1MVmlkZW9FbGVtZW50PiB8IHVuZGVmaW5lZDtcbn07XG5cbmV4cG9ydCB0eXBlIFNldFJlbmRlcmVyQ2FudmFzVHlwZSA9IHtcbiAgZWxlbWVudDogUmVhY3QuUmVmT2JqZWN0PEhUTUxDYW52YXNFbGVtZW50PiB8IHVuZGVmaW5lZDtcbn07XG5cbi8vIEhlbHBlcnNcblxuZXhwb3J0IGNvbnN0IGdldEFjdGl2ZUNhbGwgPSAoe1xuICBhY3RpdmVDYWxsU3RhdGUsXG4gIGNhbGxzQnlDb252ZXJzYXRpb24sXG59OiBDYWxsaW5nU3RhdGVUeXBlKTogdW5kZWZpbmVkIHwgRGlyZWN0Q2FsbFN0YXRlVHlwZSB8IEdyb3VwQ2FsbFN0YXRlVHlwZSA9PlxuICBhY3RpdmVDYWxsU3RhdGUgJiZcbiAgZ2V0T3duKGNhbGxzQnlDb252ZXJzYXRpb24sIGFjdGl2ZUNhbGxTdGF0ZS5jb252ZXJzYXRpb25JZCk7XG5cbi8vIEluIHRoZW9yeSwgdGhlcmUgY291bGQgYmUgbXVsdGlwbGUgaW5jb21pbmcgY2FsbHMsIG9yIGFuIGluY29taW5nIGNhbGwgd2hpbGUgdGhlcmUnc1xuLy8gICBhbiBhY3RpdmUgY2FsbC4gSW4gcHJhY3RpY2UsIHRoZSBVSSBpcyBub3QgcmVhZHkgZm9yIHRoaXMsIGFuZCBSaW5nUlRDIGRvZXNuJ3Rcbi8vICAgc3VwcG9ydCBpdCBmb3IgZGlyZWN0IGNhbGxzLlxuZXhwb3J0IGNvbnN0IGdldEluY29taW5nQ2FsbCA9IChcbiAgY2FsbHNCeUNvbnZlcnNhdGlvbjogUmVhZG9ubHk8Q2FsbHNCeUNvbnZlcnNhdGlvblR5cGU+LFxuICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZVxuKTogdW5kZWZpbmVkIHwgRGlyZWN0Q2FsbFN0YXRlVHlwZSB8IEdyb3VwQ2FsbFN0YXRlVHlwZSA9PlxuICBPYmplY3QudmFsdWVzKGNhbGxzQnlDb252ZXJzYXRpb24pLmZpbmQoY2FsbCA9PiB7XG4gICAgc3dpdGNoIChjYWxsLmNhbGxNb2RlKSB7XG4gICAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgICAgcmV0dXJuIGNhbGwuaXNJbmNvbWluZyAmJiBjYWxsLmNhbGxTdGF0ZSA9PT0gQ2FsbFN0YXRlLlJpbmdpbmc7XG4gICAgICBjYXNlIENhbGxNb2RlLkdyb3VwOlxuICAgICAgICByZXR1cm4gKFxuICAgICAgICAgIGNhbGwucmluZ2VyVXVpZCAmJlxuICAgICAgICAgIGNhbGwuY29ubmVjdGlvblN0YXRlID09PSBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuTm90Q29ubmVjdGVkICYmXG4gICAgICAgICAgaXNBbnlib2R5RWxzZUluR3JvdXBDYWxsKGNhbGwucGVla0luZm8sIG91clV1aWQpXG4gICAgICAgICk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGNhbGwpO1xuICAgIH1cbiAgfSk7XG5cbmV4cG9ydCBjb25zdCBpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwgPSAoXG4gIHBlZWtJbmZvOiB1bmRlZmluZWQgfCBSZWFkb25seTxQaWNrPEdyb3VwQ2FsbFBlZWtJbmZvVHlwZSwgJ3V1aWRzJz4+LFxuICBvdXJVdWlkOiBVVUlEU3RyaW5nVHlwZVxuKTogYm9vbGVhbiA9PiBCb29sZWFuKHBlZWtJbmZvPy51dWlkcy5zb21lKGlkID0+IGlkICE9PSBvdXJVdWlkKSk7XG5cbmNvbnN0IGdldEdyb3VwQ2FsbFJpbmdTdGF0ZSA9IChcbiAgY2FsbDogUmVhZG9ubHk8dW5kZWZpbmVkIHwgR3JvdXBDYWxsU3RhdGVUeXBlPlxuKTogR3JvdXBDYWxsUmluZ1N0YXRlVHlwZSA9PlxuICBjYWxsPy5yaW5nSWQgPT09IHVuZGVmaW5lZFxuICAgID8ge31cbiAgICA6IHsgcmluZ0lkOiBjYWxsLnJpbmdJZCwgcmluZ2VyVXVpZDogY2FsbC5yaW5nZXJVdWlkIH07XG5cbi8vIFdlIG1pZ2h0IGNhbGwgdGhpcyBmdW5jdGlvbiBtYW55IHRpbWVzIGluIHJhcGlkIHN1Y2Nlc3Npb24gKGZvciBleGFtcGxlLCBpZiBsb3RzIG9mXG4vLyAgIHBlb3BsZSBhcmUgam9pbmluZyBhbmQgbGVhdmluZyBhdCBvbmNlKS4gV2Ugd2FudCB0byBtYWtlIHN1cmUgdG8gdXBkYXRlIGV2ZW50dWFsbHlcbi8vICAgKGlmIHBlb3BsZSBqb2luIGFuZCBsZWF2ZSBmb3IgYW4gaG91ciwgd2UgZG9uJ3Qgd2FudCB5b3UgdG8gaGF2ZSB0byB3YWl0IGFuIGhvdXIgdG9cbi8vICAgZ2V0IGFuIHVwZGF0ZSksIGFuZCB3ZSBhbHNvIGRvbid0IHdhbnQgdG8gdXBkYXRlIHRvbyBvZnRlbi4gVGhhdCdzIHdoeSB3ZSB1c2UgYVxuLy8gICBcImxhdGVzdCBxdWV1ZVwiLlxuY29uc3QgcGVla1F1ZXVlQnlDb252ZXJzYXRpb24gPSBuZXcgTWFwPHN0cmluZywgTGF0ZXN0UXVldWU+KCk7XG5jb25zdCBkb0dyb3VwQ2FsbFBlZWsgPSAoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gIGRpc3BhdGNoOiBUaHVua0Rpc3BhdGNoPFxuICAgIFJvb3RTdGF0ZVR5cGUsXG4gICAgdW5rbm93bixcbiAgICBQZWVrR3JvdXBDYWxsRnVsZmlsbGVkQWN0aW9uVHlwZVxuICA+LFxuICBnZXRTdGF0ZTogKCkgPT4gUm9vdFN0YXRlVHlwZVxuKSA9PiB7XG4gIGNvbnN0IGNvbnZlcnNhdGlvbiA9IGdldE93bihcbiAgICBnZXRTdGF0ZSgpLmNvbnZlcnNhdGlvbnMuY29udmVyc2F0aW9uTG9va3VwLFxuICAgIGNvbnZlcnNhdGlvbklkXG4gICk7XG4gIGlmIChcbiAgICAhY29udmVyc2F0aW9uIHx8XG4gICAgZ2V0Q29udmVyc2F0aW9uQ2FsbE1vZGUoY29udmVyc2F0aW9uKSAhPT0gQ2FsbE1vZGUuR3JvdXBcbiAgKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHF1ZXVlID0gcGVla1F1ZXVlQnlDb252ZXJzYXRpb24uZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgaWYgKCFxdWV1ZSkge1xuICAgIHF1ZXVlID0gbmV3IExhdGVzdFF1ZXVlKCk7XG4gICAgcXVldWUub25jZUVtcHR5KCgpID0+IHtcbiAgICAgIHBlZWtRdWV1ZUJ5Q29udmVyc2F0aW9uLmRlbGV0ZShjb252ZXJzYXRpb25JZCk7XG4gICAgfSk7XG4gICAgcGVla1F1ZXVlQnlDb252ZXJzYXRpb24uc2V0KGNvbnZlcnNhdGlvbklkLCBxdWV1ZSk7XG4gIH1cblxuICBxdWV1ZS5hZGQoYXN5bmMgKCkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcblxuICAgIC8vIFdlIG1ha2Ugc3VyZSB3ZSdyZSBub3QgdHJ5aW5nIHRvIHBlZWsgYXQgYSBjb25uZWN0ZWQgKG9yIGNvbm5lY3RpbmcsIG9yXG4gICAgLy8gICByZWNvbm5lY3RpbmcpIGNhbGwuIEJlY2F1c2UgdGhpcyBpcyBhc3luY2hyb25vdXMsIGl0J3MgcG9zc2libGUgdGhhdCB0aGUgY2FsbFxuICAgIC8vICAgd2lsbCBjb25uZWN0IGJ5IHRoZSB0aW1lIHdlIGRpc3BhdGNoLCBzbyB3ZSBhbHNvIG5lZWQgdG8gZG8gYSBzaW1pbGFyIGNoZWNrIGluXG4gICAgLy8gICB0aGUgcmVkdWNlci5cbiAgICBjb25zdCBleGlzdGluZ0NhbGwgPSBnZXRPd24oXG4gICAgICBzdGF0ZS5jYWxsaW5nLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICBjb252ZXJzYXRpb25JZFxuICAgICk7XG4gICAgaWYgKFxuICAgICAgZXhpc3RpbmdDYWxsPy5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiZcbiAgICAgIGV4aXN0aW5nQ2FsbC5jb25uZWN0aW9uU3RhdGUgIT09IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWRcbiAgICApIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBJZiB3ZSBwZWVrIHJpZ2h0IGFmdGVyIHJlY2VpdmluZyB0aGUgbWVzc2FnZSwgd2UgbWF5IGdldCBvdXRkYXRlZCBpbmZvcm1hdGlvbi5cbiAgICAvLyAgIFRoaXMgaXMgbW9zdCBub3RpY2VhYmxlIHdoZW4gc29tZW9uZSBsZWF2ZXMuIFdlIGFkZCBhIGRlbGF5IGFuZCB0aGVuIG1ha2Ugc3VyZVxuICAgIC8vICAgdG8gb25seSBiZSBwZWVraW5nIG9uY2UuXG4gICAgYXdhaXQgUHJvbWlzZS5hbGwoW3NsZWVwKDEwMDApLCB3YWl0Rm9yT25saW5lKG5hdmlnYXRvciwgd2luZG93KV0pO1xuXG4gICAgbGV0IHBlZWtJbmZvO1xuICAgIHRyeSB7XG4gICAgICBwZWVrSW5mbyA9IGF3YWl0IGNhbGxpbmcucGVla0dyb3VwQ2FsbChjb252ZXJzYXRpb25JZCk7XG4gICAgfSBjYXRjaCAoZXJyKSB7XG4gICAgICBsb2cuZXJyb3IoJ0dyb3VwIGNhbGwgcGVla2luZyBmYWlsZWQnLCBFcnJvcnMudG9Mb2dGb3JtYXQoZXJyKSk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKCFwZWVrSW5mbykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKFxuICAgICAgYGRvR3JvdXBDYWxsUGVlay9ncm91cHYyKCR7Y29udmVyc2F0aW9uLmdyb3VwSWR9KTogRm91bmQgJHtwZWVrSW5mby5kZXZpY2VDb3VudH0gZGV2aWNlc2BcbiAgICApO1xuXG4gICAgYXdhaXQgY2FsbGluZy51cGRhdGVDYWxsSGlzdG9yeUZvckdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwgcGVla0luZm8pO1xuXG4gICAgY29uc3QgZm9ybWF0dGVkUGVla0luZm8gPSBjYWxsaW5nLmZvcm1hdEdyb3VwQ2FsbFBlZWtJbmZvRm9yUmVkdXgocGVla0luZm8pO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogUEVFS19HUk9VUF9DQUxMX0ZVTEZJTExFRCxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHBlZWtJbmZvOiBmb3JtYXR0ZWRQZWVrSW5mbyxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH0pO1xufTtcblxuLy8gQWN0aW9uc1xuXG5jb25zdCBBQ0NFUFRfQ0FMTF9QRU5ESU5HID0gJ2NhbGxpbmcvQUNDRVBUX0NBTExfUEVORElORyc7XG5jb25zdCBDQU5DRUxfQ0FMTCA9ICdjYWxsaW5nL0NBTkNFTF9DQUxMJztcbmNvbnN0IENBTkNFTF9JTkNPTUlOR19HUk9VUF9DQUxMX1JJTkcgPVxuICAnY2FsbGluZy9DQU5DRUxfSU5DT01JTkdfR1JPVVBfQ0FMTF9SSU5HJztcbmNvbnN0IFNUQVJUX0NBTExJTkdfTE9CQlkgPSAnY2FsbGluZy9TVEFSVF9DQUxMSU5HX0xPQkJZJztcbmNvbnN0IENBTExfU1RBVEVfQ0hBTkdFX0ZVTEZJTExFRCA9ICdjYWxsaW5nL0NBTExfU1RBVEVfQ0hBTkdFX0ZVTEZJTExFRCc7XG5jb25zdCBDSEFOR0VfSU9fREVWSUNFX0ZVTEZJTExFRCA9ICdjYWxsaW5nL0NIQU5HRV9JT19ERVZJQ0VfRlVMRklMTEVEJztcbmNvbnN0IENMT1NFX05FRURfUEVSTUlTU0lPTl9TQ1JFRU4gPSAnY2FsbGluZy9DTE9TRV9ORUVEX1BFUk1JU1NJT05fU0NSRUVOJztcbmNvbnN0IERFQ0xJTkVfRElSRUNUX0NBTEwgPSAnY2FsbGluZy9ERUNMSU5FX0RJUkVDVF9DQUxMJztcbmNvbnN0IEdST1VQX0NBTExfQVVESU9fTEVWRUxTX0NIQU5HRSA9ICdjYWxsaW5nL0dST1VQX0NBTExfQVVESU9fTEVWRUxTX0NIQU5HRSc7XG5jb25zdCBHUk9VUF9DQUxMX1NUQVRFX0NIQU5HRSA9ICdjYWxsaW5nL0dST1VQX0NBTExfU1RBVEVfQ0hBTkdFJztcbmNvbnN0IEhBTkdfVVAgPSAnY2FsbGluZy9IQU5HX1VQJztcbmNvbnN0IElOQ09NSU5HX0RJUkVDVF9DQUxMID0gJ2NhbGxpbmcvSU5DT01JTkdfRElSRUNUX0NBTEwnO1xuY29uc3QgSU5DT01JTkdfR1JPVVBfQ0FMTCA9ICdjYWxsaW5nL0lOQ09NSU5HX0dST1VQX0NBTEwnO1xuY29uc3QgTUFSS19DQUxMX1RSVVNURUQgPSAnY2FsbGluZy9NQVJLX0NBTExfVFJVU1RFRCc7XG5jb25zdCBNQVJLX0NBTExfVU5UUlVTVEVEID0gJ2NhbGxpbmcvTUFSS19DQUxMX1VOVFJVU1RFRCc7XG5jb25zdCBPVVRHT0lOR19DQUxMID0gJ2NhbGxpbmcvT1VUR09JTkdfQ0FMTCc7XG5jb25zdCBQRUVLX0dST1VQX0NBTExfRlVMRklMTEVEID0gJ2NhbGxpbmcvUEVFS19HUk9VUF9DQUxMX0ZVTEZJTExFRCc7XG5jb25zdCBSRUZSRVNIX0lPX0RFVklDRVMgPSAnY2FsbGluZy9SRUZSRVNIX0lPX0RFVklDRVMnO1xuY29uc3QgUkVNT1RFX1NIQVJJTkdfU0NSRUVOX0NIQU5HRSA9ICdjYWxsaW5nL1JFTU9URV9TSEFSSU5HX1NDUkVFTl9DSEFOR0UnO1xuY29uc3QgUkVNT1RFX1ZJREVPX0NIQU5HRSA9ICdjYWxsaW5nL1JFTU9URV9WSURFT19DSEFOR0UnO1xuY29uc3QgUkVUVVJOX1RPX0FDVElWRV9DQUxMID0gJ2NhbGxpbmcvUkVUVVJOX1RPX0FDVElWRV9DQUxMJztcbmNvbnN0IFNFVF9MT0NBTF9BVURJT19GVUxGSUxMRUQgPSAnY2FsbGluZy9TRVRfTE9DQUxfQVVESU9fRlVMRklMTEVEJztcbmNvbnN0IFNFVF9MT0NBTF9WSURFT19GVUxGSUxMRUQgPSAnY2FsbGluZy9TRVRfTE9DQUxfVklERU9fRlVMRklMTEVEJztcbmNvbnN0IFNFVF9PVVRHT0lOR19SSU5HID0gJ2NhbGxpbmcvU0VUX09VVEdPSU5HX1JJTkcnO1xuY29uc3QgU0VUX1BSRVNFTlRJTkcgPSAnY2FsbGluZy9TRVRfUFJFU0VOVElORyc7XG5jb25zdCBTRVRfUFJFU0VOVElOR19TT1VSQ0VTID0gJ2NhbGxpbmcvU0VUX1BSRVNFTlRJTkdfU09VUkNFUyc7XG5jb25zdCBUT0dHTEVfTkVFRFNfU0NSRUVOX1JFQ09SRElOR19QRVJNSVNTSU9OUyA9XG4gICdjYWxsaW5nL1RPR0dMRV9ORUVEU19TQ1JFRU5fUkVDT1JESU5HX1BFUk1JU1NJT05TJztcbmNvbnN0IFNUQVJUX0RJUkVDVF9DQUxMID0gJ2NhbGxpbmcvU1RBUlRfRElSRUNUX0NBTEwnO1xuY29uc3QgVE9HR0xFX1BBUlRJQ0lQQU5UUyA9ICdjYWxsaW5nL1RPR0dMRV9QQVJUSUNJUEFOVFMnO1xuY29uc3QgVE9HR0xFX1BJUCA9ICdjYWxsaW5nL1RPR0dMRV9QSVAnO1xuY29uc3QgVE9HR0xFX1NFVFRJTkdTID0gJ2NhbGxpbmcvVE9HR0xFX1NFVFRJTkdTJztcbmNvbnN0IFRPR0dMRV9TUEVBS0VSX1ZJRVcgPSAnY2FsbGluZy9UT0dHTEVfU1BFQUtFUl9WSUVXJztcbmNvbnN0IFNXSVRDSF9UT19QUkVTRU5UQVRJT05fVklFVyA9ICdjYWxsaW5nL1NXSVRDSF9UT19QUkVTRU5UQVRJT05fVklFVyc7XG5jb25zdCBTV0lUQ0hfRlJPTV9QUkVTRU5UQVRJT05fVklFVyA9ICdjYWxsaW5nL1NXSVRDSF9GUk9NX1BSRVNFTlRBVElPTl9WSUVXJztcblxudHlwZSBBY2NlcHRDYWxsUGVuZGluZ0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL0FDQ0VQVF9DQUxMX1BFTkRJTkcnO1xuICBwYXlsb2FkOiBBY2NlcHRDYWxsVHlwZTtcbn07XG5cbnR5cGUgQ2FuY2VsQ2FsbEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL0NBTkNFTF9DQUxMJztcbn07XG5cbnR5cGUgQ2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvQ0FOQ0VMX0lOQ09NSU5HX0dST1VQX0NBTExfUklORyc7XG4gIHBheWxvYWQ6IENhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZ1R5cGU7XG59O1xuXG50eXBlIFN0YXJ0Q2FsbGluZ0xvYmJ5QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvU1RBUlRfQ0FMTElOR19MT0JCWSc7XG4gIHBheWxvYWQ6IFN0YXJ0Q2FsbGluZ0xvYmJ5UGF5bG9hZFR5cGU7XG59O1xuXG50eXBlIENhbGxTdGF0ZUNoYW5nZUZ1bGZpbGxlZEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL0NBTExfU1RBVEVfQ0hBTkdFX0ZVTEZJTExFRCc7XG4gIHBheWxvYWQ6IENhbGxTdGF0ZUNoYW5nZVR5cGU7XG59O1xuXG50eXBlIENoYW5nZUlPRGV2aWNlRnVsZmlsbGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvQ0hBTkdFX0lPX0RFVklDRV9GVUxGSUxMRUQnO1xuICBwYXlsb2FkOiBDaGFuZ2VJT0RldmljZVBheWxvYWRUeXBlO1xufTtcblxudHlwZSBDbG9zZU5lZWRQZXJtaXNzaW9uU2NyZWVuQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvQ0xPU0VfTkVFRF9QRVJNSVNTSU9OX1NDUkVFTic7XG4gIHBheWxvYWQ6IG51bGw7XG59O1xuXG50eXBlIERlY2xpbmVDYWxsQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvREVDTElORV9ESVJFQ1RfQ0FMTCc7XG4gIHBheWxvYWQ6IERlY2xpbmVDYWxsVHlwZTtcbn07XG5cbnR5cGUgR3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2VBY3Rpb25QYXlsb2FkVHlwZSA9IFJlYWRvbmx5PHtcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZztcbiAgbG9jYWxBdWRpb0xldmVsOiBudW1iZXI7XG4gIHJlbW90ZURldmljZVN0YXRlczogUmVhZG9ubHlBcnJheTx7IGF1ZGlvTGV2ZWw6IG51bWJlcjsgZGVtdXhJZDogbnVtYmVyIH0+O1xufT47XG5cbnR5cGUgR3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2VBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9HUk9VUF9DQUxMX0FVRElPX0xFVkVMU19DSEFOR0UnO1xuICBwYXlsb2FkOiBHcm91cENhbGxBdWRpb0xldmVsc0NoYW5nZUFjdGlvblBheWxvYWRUeXBlO1xufTtcblxuZXhwb3J0IHR5cGUgR3JvdXBDYWxsU3RhdGVDaGFuZ2VBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9HUk9VUF9DQUxMX1NUQVRFX0NIQU5HRSc7XG4gIHBheWxvYWQ6IEdyb3VwQ2FsbFN0YXRlQ2hhbmdlQWN0aW9uUGF5bG9hZFR5cGU7XG59O1xuXG50eXBlIEhhbmdVcEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL0hBTkdfVVAnO1xuICBwYXlsb2FkOiBIYW5nVXBBY3Rpb25QYXlsb2FkVHlwZTtcbn07XG5cbnR5cGUgSW5jb21pbmdEaXJlY3RDYWxsQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvSU5DT01JTkdfRElSRUNUX0NBTEwnO1xuICBwYXlsb2FkOiBJbmNvbWluZ0RpcmVjdENhbGxUeXBlO1xufTtcblxudHlwZSBJbmNvbWluZ0dyb3VwQ2FsbEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL0lOQ09NSU5HX0dST1VQX0NBTEwnO1xuICBwYXlsb2FkOiBJbmNvbWluZ0dyb3VwQ2FsbFR5cGU7XG59O1xuXG50eXBlIEtleUNoYW5nZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9NQVJLX0NBTExfVU5UUlVTVEVEJztcbiAgcGF5bG9hZDoge1xuICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogQXJyYXk8VVVJRFN0cmluZ1R5cGU+O1xuICB9O1xufTtcblxudHlwZSBLZXlDaGFuZ2VPa0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL01BUktfQ0FMTF9UUlVTVEVEJztcbiAgcGF5bG9hZDogbnVsbDtcbn07XG5cbnR5cGUgT3V0Z29pbmdDYWxsQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvT1VUR09JTkdfQ0FMTCc7XG4gIHBheWxvYWQ6IFN0YXJ0RGlyZWN0Q2FsbFR5cGU7XG59O1xuXG5leHBvcnQgdHlwZSBQZWVrR3JvdXBDYWxsRnVsZmlsbGVkQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvUEVFS19HUk9VUF9DQUxMX0ZVTEZJTExFRCc7XG4gIHBheWxvYWQ6IHtcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nO1xuICAgIHBlZWtJbmZvOiBHcm91cENhbGxQZWVrSW5mb1R5cGU7XG4gIH07XG59O1xuXG50eXBlIFJlZnJlc2hJT0RldmljZXNBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9SRUZSRVNIX0lPX0RFVklDRVMnO1xuICBwYXlsb2FkOiBNZWRpYURldmljZVNldHRpbmdzO1xufTtcblxudHlwZSBSZW1vdGVTaGFyaW5nU2NyZWVuQ2hhbmdlQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvUkVNT1RFX1NIQVJJTkdfU0NSRUVOX0NIQU5HRSc7XG4gIHBheWxvYWQ6IFJlbW90ZVNoYXJpbmdTY3JlZW5DaGFuZ2VUeXBlO1xufTtcblxudHlwZSBSZW1vdGVWaWRlb0NoYW5nZUFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1JFTU9URV9WSURFT19DSEFOR0UnO1xuICBwYXlsb2FkOiBSZW1vdGVWaWRlb0NoYW5nZVR5cGU7XG59O1xuXG50eXBlIFJldHVyblRvQWN0aXZlQ2FsbEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1JFVFVSTl9UT19BQ1RJVkVfQ0FMTCc7XG59O1xuXG50eXBlIFNldExvY2FsQXVkaW9BY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9TRVRfTE9DQUxfQVVESU9fRlVMRklMTEVEJztcbiAgcGF5bG9hZDogU2V0TG9jYWxBdWRpb1R5cGU7XG59O1xuXG50eXBlIFNldExvY2FsVmlkZW9GdWxmaWxsZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9TRVRfTE9DQUxfVklERU9fRlVMRklMTEVEJztcbiAgcGF5bG9hZDogU2V0TG9jYWxWaWRlb1R5cGU7XG59O1xuXG50eXBlIFNldFByZXNlbnRpbmdGdWxmaWxsZWRBY3Rpb25UeXBlID0ge1xuICB0eXBlOiAnY2FsbGluZy9TRVRfUFJFU0VOVElORyc7XG4gIHBheWxvYWQ/OiBQcmVzZW50ZWRTb3VyY2U7XG59O1xuXG50eXBlIFNldFByZXNlbnRpbmdTb3VyY2VzQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvU0VUX1BSRVNFTlRJTkdfU09VUkNFUyc7XG4gIHBheWxvYWQ6IEFycmF5PFByZXNlbnRhYmxlU291cmNlPjtcbn07XG5cbnR5cGUgU2V0T3V0Z29pbmdSaW5nQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvU0VUX09VVEdPSU5HX1JJTkcnO1xuICBwYXlsb2FkOiBib29sZWFuO1xufTtcblxudHlwZSBTaG93Q2FsbExvYmJ5QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvU1RBUlRfQ0FMTElOR19MT0JCWSc7XG4gIHBheWxvYWQ6IFN0YXJ0Q2FsbGluZ0xvYmJ5UGF5bG9hZFR5cGU7XG59O1xuXG50eXBlIFN0YXJ0RGlyZWN0Q2FsbEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1NUQVJUX0RJUkVDVF9DQUxMJztcbiAgcGF5bG9hZDogU3RhcnREaXJlY3RDYWxsVHlwZTtcbn07XG5cbnR5cGUgVG9nZ2xlTmVlZHNTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1RPR0dMRV9ORUVEU19TQ1JFRU5fUkVDT1JESU5HX1BFUk1JU1NJT05TJztcbn07XG5cbnR5cGUgVG9nZ2xlUGFydGljaXBhbnRzQWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvVE9HR0xFX1BBUlRJQ0lQQU5UUyc7XG59O1xuXG50eXBlIFRvZ2dsZVBpcEFjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1RPR0dMRV9QSVAnO1xufTtcblxudHlwZSBUb2dnbGVTZXR0aW5nc0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1RPR0dMRV9TRVRUSU5HUyc7XG59O1xuXG50eXBlIFRvZ2dsZVNwZWFrZXJWaWV3QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvVE9HR0xFX1NQRUFLRVJfVklFVyc7XG59O1xuXG50eXBlIFN3aXRjaFRvUHJlc2VudGF0aW9uVmlld0FjdGlvblR5cGUgPSB7XG4gIHR5cGU6ICdjYWxsaW5nL1NXSVRDSF9UT19QUkVTRU5UQVRJT05fVklFVyc7XG59O1xuXG50eXBlIFN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3QWN0aW9uVHlwZSA9IHtcbiAgdHlwZTogJ2NhbGxpbmcvU1dJVENIX0ZST01fUFJFU0VOVEFUSU9OX1ZJRVcnO1xufTtcblxuZXhwb3J0IHR5cGUgQ2FsbGluZ0FjdGlvblR5cGUgPVxuICB8IEFjY2VwdENhbGxQZW5kaW5nQWN0aW9uVHlwZVxuICB8IENhbmNlbENhbGxBY3Rpb25UeXBlXG4gIHwgQ2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nQWN0aW9uVHlwZVxuICB8IFN0YXJ0Q2FsbGluZ0xvYmJ5QWN0aW9uVHlwZVxuICB8IENhbGxTdGF0ZUNoYW5nZUZ1bGZpbGxlZEFjdGlvblR5cGVcbiAgfCBDaGFuZ2VJT0RldmljZUZ1bGZpbGxlZEFjdGlvblR5cGVcbiAgfCBDbG9zZU5lZWRQZXJtaXNzaW9uU2NyZWVuQWN0aW9uVHlwZVxuICB8IENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlXG4gIHwgQ29udmVyc2F0aW9uUmVtb3ZlZEFjdGlvblR5cGVcbiAgfCBEZWNsaW5lQ2FsbEFjdGlvblR5cGVcbiAgfCBHcm91cENhbGxBdWRpb0xldmVsc0NoYW5nZUFjdGlvblR5cGVcbiAgfCBHcm91cENhbGxTdGF0ZUNoYW5nZUFjdGlvblR5cGVcbiAgfCBIYW5nVXBBY3Rpb25UeXBlXG4gIHwgSW5jb21pbmdEaXJlY3RDYWxsQWN0aW9uVHlwZVxuICB8IEluY29taW5nR3JvdXBDYWxsQWN0aW9uVHlwZVxuICB8IEtleUNoYW5nZWRBY3Rpb25UeXBlXG4gIHwgS2V5Q2hhbmdlT2tBY3Rpb25UeXBlXG4gIHwgT3V0Z29pbmdDYWxsQWN0aW9uVHlwZVxuICB8IFBlZWtHcm91cENhbGxGdWxmaWxsZWRBY3Rpb25UeXBlXG4gIHwgUmVmcmVzaElPRGV2aWNlc0FjdGlvblR5cGVcbiAgfCBSZW1vdGVTaGFyaW5nU2NyZWVuQ2hhbmdlQWN0aW9uVHlwZVxuICB8IFJlbW90ZVZpZGVvQ2hhbmdlQWN0aW9uVHlwZVxuICB8IFJldHVyblRvQWN0aXZlQ2FsbEFjdGlvblR5cGVcbiAgfCBTZXRMb2NhbEF1ZGlvQWN0aW9uVHlwZVxuICB8IFNldExvY2FsVmlkZW9GdWxmaWxsZWRBY3Rpb25UeXBlXG4gIHwgU2V0UHJlc2VudGluZ1NvdXJjZXNBY3Rpb25UeXBlXG4gIHwgU2V0T3V0Z29pbmdSaW5nQWN0aW9uVHlwZVxuICB8IFNob3dDYWxsTG9iYnlBY3Rpb25UeXBlXG4gIHwgU3RhcnREaXJlY3RDYWxsQWN0aW9uVHlwZVxuICB8IFRvZ2dsZU5lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNBY3Rpb25UeXBlXG4gIHwgVG9nZ2xlUGFydGljaXBhbnRzQWN0aW9uVHlwZVxuICB8IFRvZ2dsZVBpcEFjdGlvblR5cGVcbiAgfCBTZXRQcmVzZW50aW5nRnVsZmlsbGVkQWN0aW9uVHlwZVxuICB8IFRvZ2dsZVNldHRpbmdzQWN0aW9uVHlwZVxuICB8IFRvZ2dsZVNwZWFrZXJWaWV3QWN0aW9uVHlwZVxuICB8IFN3aXRjaFRvUHJlc2VudGF0aW9uVmlld0FjdGlvblR5cGVcbiAgfCBTd2l0Y2hGcm9tUHJlc2VudGF0aW9uVmlld0FjdGlvblR5cGU7XG5cbi8vIEFjdGlvbiBDcmVhdG9yc1xuXG5mdW5jdGlvbiBhY2NlcHRDYWxsKFxuICBwYXlsb2FkOiBBY2NlcHRDYWxsVHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgQWNjZXB0Q2FsbFBlbmRpbmdBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCwgYXNWaWRlb0NhbGwgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKGdldFN0YXRlKCkuY2FsbGluZy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjYWxsKSB7XG4gICAgICBsb2cuZXJyb3IoJ1RyeWluZyB0byBhY2NlcHQgYSBub24tZXhpc3RlbnQgY2FsbCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIHN3aXRjaCAoY2FsbC5jYWxsTW9kZSkge1xuICAgICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICAgIGF3YWl0IGNhbGxpbmcuYWNjZXB0RGlyZWN0Q2FsbChjb252ZXJzYXRpb25JZCwgYXNWaWRlb0NhbGwpO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6XG4gICAgICAgIGF3YWl0IGNhbGxpbmcuam9pbkdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwgdHJ1ZSwgYXNWaWRlb0NhbGwsIGZhbHNlKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGNhbGwpO1xuICAgIH1cblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IEFDQ0VQVF9DQUxMX1BFTkRJTkcsXG4gICAgICBwYXlsb2FkLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjYWxsU3RhdGVDaGFuZ2UoXG4gIHBheWxvYWQ6IENhbGxTdGF0ZUNoYW5nZVR5cGVcbik6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICBDYWxsU3RhdGVDaGFuZ2VGdWxmaWxsZWRBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIGRpc3BhdGNoID0+IHtcbiAgICBjb25zdCB7IGNhbGxTdGF0ZSB9ID0gcGF5bG9hZDtcbiAgICBpZiAoY2FsbFN0YXRlID09PSBDYWxsU3RhdGUuRW5kZWQpIHtcbiAgICAgIGF3YWl0IGNhbGxpbmdUb25lcy5wbGF5RW5kQ2FsbCgpO1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnY2xvc2Utc2NyZWVuLXNoYXJlLWNvbnRyb2xsZXInKTtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBDQUxMX1NUQVRFX0NIQU5HRV9GVUxGSUxMRUQsXG4gICAgICBwYXlsb2FkLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjaGFuZ2VJT0RldmljZShcbiAgcGF5bG9hZDogQ2hhbmdlSU9EZXZpY2VQYXlsb2FkVHlwZVxuKTogVGh1bmtBY3Rpb248XG4gIHZvaWQsXG4gIFJvb3RTdGF0ZVR5cGUsXG4gIHVua25vd24sXG4gIENoYW5nZUlPRGV2aWNlRnVsZmlsbGVkQWN0aW9uVHlwZVxuPiB7XG4gIHJldHVybiBhc3luYyBkaXNwYXRjaCA9PiB7XG4gICAgLy8gT25seSBgc2V0UHJlZmVycmVkQ2FtZXJhYCByZXR1cm5zIGEgUHJvbWlzZS5cbiAgICBpZiAocGF5bG9hZC50eXBlID09PSBDYWxsaW5nRGV2aWNlVHlwZS5DQU1FUkEpIHtcbiAgICAgIGF3YWl0IGNhbGxpbmcuc2V0UHJlZmVycmVkQ2FtZXJhKHBheWxvYWQuc2VsZWN0ZWREZXZpY2UpO1xuICAgIH0gZWxzZSBpZiAocGF5bG9hZC50eXBlID09PSBDYWxsaW5nRGV2aWNlVHlwZS5NSUNST1BIT05FKSB7XG4gICAgICBjYWxsaW5nLnNldFByZWZlcnJlZE1pY3JvcGhvbmUocGF5bG9hZC5zZWxlY3RlZERldmljZSk7XG4gICAgfSBlbHNlIGlmIChwYXlsb2FkLnR5cGUgPT09IENhbGxpbmdEZXZpY2VUeXBlLlNQRUFLRVIpIHtcbiAgICAgIGNhbGxpbmcuc2V0UHJlZmVycmVkU3BlYWtlcihwYXlsb2FkLnNlbGVjdGVkRGV2aWNlKTtcbiAgICB9XG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogQ0hBTkdFX0lPX0RFVklDRV9GVUxGSUxMRUQsXG4gICAgICBwYXlsb2FkLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiBjbG9zZU5lZWRQZXJtaXNzaW9uU2NyZWVuKCk6IENsb3NlTmVlZFBlcm1pc3Npb25TY3JlZW5BY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBDTE9TRV9ORUVEX1BFUk1JU1NJT05fU0NSRUVOLFxuICAgIHBheWxvYWQ6IG51bGwsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGNhbmNlbENhbGwocGF5bG9hZDogQ2FuY2VsQ2FsbFR5cGUpOiBDYW5jZWxDYWxsQWN0aW9uVHlwZSB7XG4gIGNhbGxpbmcuc3RvcENhbGxpbmdMb2JieShwYXlsb2FkLmNvbnZlcnNhdGlvbklkKTtcblxuICByZXR1cm4ge1xuICAgIHR5cGU6IENBTkNFTF9DQUxMLFxuICB9O1xufVxuXG5mdW5jdGlvbiBjYW5jZWxJbmNvbWluZ0dyb3VwQ2FsbFJpbmcoXG4gIHBheWxvYWQ6IENhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZ1R5cGVcbik6IENhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZ0FjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IENBTkNFTF9JTkNPTUlOR19HUk9VUF9DQUxMX1JJTkcsXG4gICAgcGF5bG9hZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGVjbGluZUNhbGwoXG4gIHBheWxvYWQ6IERlY2xpbmVDYWxsVHlwZVxuKTogVGh1bmtBY3Rpb248XG4gIHZvaWQsXG4gIFJvb3RTdGF0ZVR5cGUsXG4gIHVua25vd24sXG4gIENhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZ0FjdGlvblR5cGUgfCBEZWNsaW5lQ2FsbEFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IHBheWxvYWQ7XG5cbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKGdldFN0YXRlKCkuY2FsbGluZy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjYWxsKSB7XG4gICAgICBsb2cuZXJyb3IoJ1RyeWluZyB0byBkZWNsaW5lIGEgbm9uLWV4aXN0ZW50IGNhbGwnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzd2l0Y2ggKGNhbGwuY2FsbE1vZGUpIHtcbiAgICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OlxuICAgICAgICBjYWxsaW5nLmRlY2xpbmVEaXJlY3RDYWxsKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgIHR5cGU6IERFQ0xJTkVfRElSRUNUX0NBTEwsXG4gICAgICAgICAgcGF5bG9hZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBDYWxsTW9kZS5Hcm91cDoge1xuICAgICAgICBjb25zdCB7IHJpbmdJZCB9ID0gY2FsbDtcbiAgICAgICAgaWYgKHJpbmdJZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgbG9nLmVycm9yKCdUcnlpbmcgdG8gZGVjbGluZSBhIGdyb3VwIGNhbGwgd2l0aG91dCBhIHJpbmcgSUQnKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBjYWxsaW5nLmRlY2xpbmVHcm91cENhbGwoY29udmVyc2F0aW9uSWQsIHJpbmdJZCk7XG4gICAgICAgICAgZGlzcGF0Y2goe1xuICAgICAgICAgICAgdHlwZTogQ0FOQ0VMX0lOQ09NSU5HX0dST1VQX0NBTExfUklORyxcbiAgICAgICAgICAgIHBheWxvYWQ6IHsgY29udmVyc2F0aW9uSWQsIHJpbmdJZCB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjYWxsKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldFByZXNlbnRpbmdTb3VyY2VzKCk6IFRodW5rQWN0aW9uPFxuICB2b2lkLFxuICBSb290U3RhdGVUeXBlLFxuICB1bmtub3duLFxuICB8IFNldFByZXNlbnRpbmdTb3VyY2VzQWN0aW9uVHlwZVxuICB8IFRvZ2dsZU5lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICAvLyBXZSBjaGVjayBpZiB0aGUgdXNlciBoYXMgcGVybWlzc2lvbnMgZmlyc3QgYmVmb3JlIGNhbGxpbmcgZGVza3RvcENhcHR1cmVyXG4gICAgLy8gTmV4dCB3ZSBjYWxsIGdldFByZXNlbnRpbmdTb3VyY2VzIHNvIHRoYXQgb25lIGdldHMgdGhlIHByb21wdCBmb3IgcGVybWlzc2lvbnMsXG4gICAgLy8gaWYgbmVjZXNzYXJ5LlxuICAgIC8vIEZpbmFsbHksIHdlIGhhdmUgdGhlIGlmIHN0YXRlbWVudCB3aGljaCBzaG93cyB0aGUgbW9kYWwsIGlmIG5lZWRlZC5cbiAgICAvLyBJdCBpcyBpbiB0aGlzIGV4YWN0IG9yZGVyIHNvIHRoYXQgZHVyaW5nIGZpcnN0LXRpbWUtdXNlIG9uZSB3aWxsIGJlXG4gICAgLy8gcHJvbXB0ZWQgZm9yIHBlcm1pc3Npb25zIGFuZCBpZiB0aGV5IHNvIGhhcHBlbiB0byBkZW55IHdlIGNhbiBzdGlsbFxuICAgIC8vIGNhcHR1cmUgdGhhdCBzdGF0ZSBjb3JyZWN0bHkuXG4gICAgY29uc3QgcGxhdGZvcm0gPSBnZXRQbGF0Zm9ybShnZXRTdGF0ZSgpKTtcbiAgICBjb25zdCBuZWVkc1Blcm1pc3Npb24gPVxuICAgICAgcGxhdGZvcm0gPT09ICdkYXJ3aW4nICYmICFoYXNTY3JlZW5DYXB0dXJlUGVybWlzc2lvbigpO1xuXG4gICAgY29uc3Qgc291cmNlcyA9IGF3YWl0IGNhbGxpbmcuZ2V0UHJlc2VudGluZ1NvdXJjZXMoKTtcblxuICAgIGlmIChuZWVkc1Blcm1pc3Npb24pIHtcbiAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgdHlwZTogVE9HR0xFX05FRURTX1NDUkVFTl9SRUNPUkRJTkdfUEVSTUlTU0lPTlMsXG4gICAgICB9KTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBTRVRfUFJFU0VOVElOR19TT1VSQ0VTLFxuICAgICAgcGF5bG9hZDogc291cmNlcyxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gZ3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2UoXG4gIHBheWxvYWQ6IEdyb3VwQ2FsbEF1ZGlvTGV2ZWxzQ2hhbmdlQWN0aW9uUGF5bG9hZFR5cGVcbik6IEdyb3VwQ2FsbEF1ZGlvTGV2ZWxzQ2hhbmdlQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7IHR5cGU6IEdST1VQX0NBTExfQVVESU9fTEVWRUxTX0NIQU5HRSwgcGF5bG9hZCB9O1xufVxuXG5mdW5jdGlvbiBncm91cENhbGxTdGF0ZUNoYW5nZShcbiAgcGF5bG9hZDogR3JvdXBDYWxsU3RhdGVDaGFuZ2VBcmd1bWVudFR5cGVcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIEdyb3VwQ2FsbFN0YXRlQ2hhbmdlQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGxldCBkaWRTb21lb25lU3RhcnRQcmVzZW50aW5nOiBib29sZWFuO1xuICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBnZXRBY3RpdmVDYWxsKGdldFN0YXRlKCkuY2FsbGluZyk7XG4gICAgaWYgKGFjdGl2ZUNhbGw/LmNhbGxNb2RlID09PSBDYWxsTW9kZS5Hcm91cCkge1xuICAgICAgY29uc3Qgd2FzU29tZW9uZVByZXNlbnRpbmcgPSBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5zb21lKFxuICAgICAgICBwYXJ0aWNpcGFudCA9PiBwYXJ0aWNpcGFudC5wcmVzZW50aW5nXG4gICAgICApO1xuICAgICAgY29uc3QgaXNTb21lb25lUHJlc2VudGluZyA9IHBheWxvYWQucmVtb3RlUGFydGljaXBhbnRzLnNvbWUoXG4gICAgICAgIHBhcnRpY2lwYW50ID0+IHBhcnRpY2lwYW50LnByZXNlbnRpbmdcbiAgICAgICk7XG4gICAgICBkaWRTb21lb25lU3RhcnRQcmVzZW50aW5nID0gIXdhc1NvbWVvbmVQcmVzZW50aW5nICYmIGlzU29tZW9uZVByZXNlbnRpbmc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRpZFNvbWVvbmVTdGFydFByZXNlbnRpbmcgPSBmYWxzZTtcbiAgICB9XG5cbiAgICBjb25zdCB7IG91clV1aWQgfSA9IGdldFN0YXRlKCkudXNlcjtcbiAgICBzdHJpY3RBc3NlcnQob3VyVXVpZCwgJ2dyb3VwQ2FsbFN0YXRlQ2hhbmdlIGZhaWxlZCB0byBmZXRjaCBvdXIgdXVpZCcpO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogR1JPVVBfQ0FMTF9TVEFURV9DSEFOR0UsXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC4uLnBheWxvYWQsXG4gICAgICAgIG91clV1aWQsXG4gICAgICB9LFxuICAgIH0pO1xuXG4gICAgaWYgKGRpZFNvbWVvbmVTdGFydFByZXNlbnRpbmcpIHtcbiAgICAgIGNhbGxpbmdUb25lcy5zb21lb25lUHJlc2VudGluZygpO1xuICAgIH1cblxuICAgIGlmIChwYXlsb2FkLmNvbm5lY3Rpb25TdGF0ZSA9PT0gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZCkge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnY2xvc2Utc2NyZWVuLXNoYXJlLWNvbnRyb2xsZXInKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGhhbmdVcEFjdGl2ZUNhbGwoKTogVGh1bmtBY3Rpb248XG4gIHZvaWQsXG4gIFJvb3RTdGF0ZVR5cGUsXG4gIHVua25vd24sXG4gIEhhbmdVcEFjdGlvblR5cGVcbj4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcblxuICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBnZXRBY3RpdmVDYWxsKHN0YXRlLmNhbGxpbmcpO1xuICAgIGlmICghYWN0aXZlQ2FsbCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IGFjdGl2ZUNhbGw7XG5cbiAgICBjYWxsaW5nLmhhbmd1cChjb252ZXJzYXRpb25JZCk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBIQU5HX1VQLFxuICAgICAgcGF5bG9hZDoge1xuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpZiAoYWN0aXZlQ2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXApIHtcbiAgICAgIC8vIFdlIHdhbnQgdG8gZ2l2ZSB0aGUgZ3JvdXAgY2FsbCB0aW1lIHRvIGRpc2Nvbm5lY3QuXG4gICAgICBhd2FpdCBzbGVlcCgxMDAwKTtcbiAgICAgIGRvR3JvdXBDYWxsUGVlayhjb252ZXJzYXRpb25JZCwgZGlzcGF0Y2gsIGdldFN0YXRlKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGtleUNoYW5nZWQoXG4gIHBheWxvYWQ6IEtleUNoYW5nZWRUeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBLZXlDaGFuZ2VkQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoKTtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGUuY2FsbGluZztcblxuICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBnZXRBY3RpdmVDYWxsKHN0YXRlLmNhbGxpbmcpO1xuICAgIGlmICghYWN0aXZlQ2FsbCB8fCAhYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGFjdGl2ZUNhbGwuY2FsbE1vZGUgPT09IENhbGxNb2RlLkdyb3VwKSB7XG4gICAgICBjb25zdCB1dWlkc0NoYW5nZWQgPSBuZXcgU2V0KGFjdGl2ZUNhbGxTdGF0ZS5zYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHMpO1xuXG4gICAgICAvLyBJdGVyYXRlIG92ZXIgZWFjaCBwYXJ0aWNpcGFudCB0byBlbnN1cmUgdGhhdCB0aGUgdXVpZCBwYXNzZWQgaW5cbiAgICAgIC8vIG1hdGNoZXMgb25lIG9mIHRoZSBwYXJ0aWNpcGFudHMgaW4gdGhlIGdyb3VwIGNhbGwuXG4gICAgICBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5mb3JFYWNoKHBhcnRpY2lwYW50ID0+IHtcbiAgICAgICAgaWYgKHBhcnRpY2lwYW50LnV1aWQgPT09IHBheWxvYWQudXVpZCkge1xuICAgICAgICAgIHV1aWRzQ2hhbmdlZC5hZGQocGFydGljaXBhbnQudXVpZCk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBjb25zdCBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHMgPSBBcnJheS5mcm9tKHV1aWRzQ2hhbmdlZCk7XG5cbiAgICAgIGlmIChzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHMubGVuZ3RoKSB7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBNQVJLX0NBTExfVU5UUlVTVEVELFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkcyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIGtleUNoYW5nZU9rKFxuICBwYXlsb2FkOiBLZXlDaGFuZ2VPa1R5cGVcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIEtleUNoYW5nZU9rQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gZGlzcGF0Y2ggPT4ge1xuICAgIGNhbGxpbmcucmVzZW5kR3JvdXBDYWxsTWVkaWFLZXlzKHBheWxvYWQuY29udmVyc2F0aW9uSWQpO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogTUFSS19DQUxMX1RSVVNURUQsXG4gICAgICBwYXlsb2FkOiBudWxsLFxuICAgIH0pO1xuICB9O1xufVxuXG5mdW5jdGlvbiByZWNlaXZlSW5jb21pbmdEaXJlY3RDYWxsKFxuICBwYXlsb2FkOiBJbmNvbWluZ0RpcmVjdENhbGxUeXBlXG4pOiBJbmNvbWluZ0RpcmVjdENhbGxBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBJTkNPTUlOR19ESVJFQ1RfQ0FMTCxcbiAgICBwYXlsb2FkLFxuICB9O1xufVxuXG5mdW5jdGlvbiByZWNlaXZlSW5jb21pbmdHcm91cENhbGwoXG4gIHBheWxvYWQ6IEluY29taW5nR3JvdXBDYWxsVHlwZVxuKTogSW5jb21pbmdHcm91cENhbGxBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBJTkNPTUlOR19HUk9VUF9DQUxMLFxuICAgIHBheWxvYWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIG9wZW5TeXN0ZW1QcmVmZXJlbmNlc0FjdGlvbigpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgbmV2ZXJcbj4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIG9wZW5TeXN0ZW1QcmVmZXJlbmNlcygpO1xuICB9O1xufVxuXG5mdW5jdGlvbiBvdXRnb2luZ0NhbGwocGF5bG9hZDogU3RhcnREaXJlY3RDYWxsVHlwZSk6IE91dGdvaW5nQ2FsbEFjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IE9VVEdPSU5HX0NBTEwsXG4gICAgcGF5bG9hZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGVla0dyb3VwQ2FsbEZvclRoZUZpcnN0VGltZShcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZ1xuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgUGVla0dyb3VwQ2FsbEZ1bGZpbGxlZEFjdGlvblR5cGU+IHtcbiAgcmV0dXJuIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKGdldFN0YXRlKCkuY2FsbGluZy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgY29uc3Qgc2hvdWxkUGVlayA9XG4gICAgICAhY2FsbCB8fCAoY2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiYgIWNhbGwucGVla0luZm8pO1xuICAgIGlmIChzaG91bGRQZWVrKSB7XG4gICAgICBkb0dyb3VwQ2FsbFBlZWsoY29udmVyc2F0aW9uSWQsIGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBwZWVrR3JvdXBDYWxsSWZJdEhhc01lbWJlcnMoXG4gIGNvbnZlcnNhdGlvbklkOiBzdHJpbmdcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIFBlZWtHcm91cENhbGxGdWxmaWxsZWRBY3Rpb25UeXBlPiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgY2FsbCA9IGdldE93bihnZXRTdGF0ZSgpLmNhbGxpbmcuY2FsbHNCeUNvbnZlcnNhdGlvbiwgY29udmVyc2F0aW9uSWQpO1xuICAgIGNvbnN0IHNob3VsZFBlZWsgPVxuICAgICAgY2FsbCAmJlxuICAgICAgY2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiZcbiAgICAgIGNhbGwuam9pblN0YXRlID09PSBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkICYmXG4gICAgICBjYWxsLnBlZWtJbmZvICYmXG4gICAgICBjYWxsLnBlZWtJbmZvLmRldmljZUNvdW50ID4gMDtcbiAgICBpZiAoc2hvdWxkUGVlaykge1xuICAgICAgZG9Hcm91cENhbGxQZWVrKGNvbnZlcnNhdGlvbklkLCBkaXNwYXRjaCwgZ2V0U3RhdGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gcGVla05vdENvbm5lY3RlZEdyb3VwQ2FsbChcbiAgcGF5bG9hZDogUGVla05vdENvbm5lY3RlZEdyb3VwQ2FsbFR5cGVcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIFBlZWtHcm91cENhbGxGdWxmaWxsZWRBY3Rpb25UeXBlPiB7XG4gIHJldHVybiAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgeyBjb252ZXJzYXRpb25JZCB9ID0gcGF5bG9hZDtcbiAgICBkb0dyb3VwQ2FsbFBlZWsoY29udmVyc2F0aW9uSWQsIGRpc3BhdGNoLCBnZXRTdGF0ZSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlZnJlc2hJT0RldmljZXMoXG4gIHBheWxvYWQ6IE1lZGlhRGV2aWNlU2V0dGluZ3Ncbik6IFJlZnJlc2hJT0RldmljZXNBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRUZSRVNIX0lPX0RFVklDRVMsXG4gICAgcGF5bG9hZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcmVtb3RlU2hhcmluZ1NjcmVlbkNoYW5nZShcbiAgcGF5bG9hZDogUmVtb3RlU2hhcmluZ1NjcmVlbkNoYW5nZVR5cGVcbik6IFJlbW90ZVNoYXJpbmdTY3JlZW5DaGFuZ2VBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBSRU1PVEVfU0hBUklOR19TQ1JFRU5fQ0hBTkdFLFxuICAgIHBheWxvYWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHJlbW90ZVZpZGVvQ2hhbmdlKFxuICBwYXlsb2FkOiBSZW1vdGVWaWRlb0NoYW5nZVR5cGVcbik6IFJlbW90ZVZpZGVvQ2hhbmdlQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogUkVNT1RFX1ZJREVPX0NIQU5HRSxcbiAgICBwYXlsb2FkLFxuICB9O1xufVxuXG5mdW5jdGlvbiByZXR1cm5Ub0FjdGl2ZUNhbGwoKTogUmV0dXJuVG9BY3RpdmVDYWxsQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogUkVUVVJOX1RPX0FDVElWRV9DQUxMLFxuICB9O1xufVxuXG5mdW5jdGlvbiBzZXRJc0NhbGxBY3RpdmUoXG4gIGlzQ2FsbEFjdGl2ZTogYm9vbGVhblxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgbmV2ZXI+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICB3aW5kb3cuU2lnbmFsQ29udGV4dC5zZXRJc0NhbGxBY3RpdmUoaXNDYWxsQWN0aXZlKTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0TG9jYWxQcmV2aWV3KFxuICBwYXlsb2FkOiBTZXRMb2NhbFByZXZpZXdUeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBuZXZlcj4ge1xuICByZXR1cm4gKCkgPT4ge1xuICAgIGNhbGxpbmcudmlkZW9DYXB0dXJlci5zZXRMb2NhbFByZXZpZXcocGF5bG9hZC5lbGVtZW50KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0UmVuZGVyZXJDYW52YXMoXG4gIHBheWxvYWQ6IFNldFJlbmRlcmVyQ2FudmFzVHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgbmV2ZXI+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjYWxsaW5nLnZpZGVvUmVuZGVyZXIuc2V0Q2FudmFzKHBheWxvYWQuZWxlbWVudCk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldExvY2FsQXVkaW8oXG4gIHBheWxvYWQ6IFNldExvY2FsQXVkaW9UeXBlXG4pOiBUaHVua0FjdGlvbjx2b2lkLCBSb290U3RhdGVUeXBlLCB1bmtub3duLCBTZXRMb2NhbEF1ZGlvQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIGNvbnN0IGFjdGl2ZUNhbGwgPSBnZXRBY3RpdmVDYWxsKGdldFN0YXRlKCkuY2FsbGluZyk7XG4gICAgaWYgKCFhY3RpdmVDYWxsKSB7XG4gICAgICBsb2cud2FybignVHJ5aW5nIHRvIHNldCBsb2NhbCBhdWRpbyB3aGVuIG5vIGNhbGwgaXMgYWN0aXZlJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY2FsbGluZy5zZXRPdXRnb2luZ0F1ZGlvKGFjdGl2ZUNhbGwuY29udmVyc2F0aW9uSWQsIHBheWxvYWQuZW5hYmxlZCk7XG5cbiAgICBkaXNwYXRjaCh7XG4gICAgICB0eXBlOiBTRVRfTE9DQUxfQVVESU9fRlVMRklMTEVELFxuICAgICAgcGF5bG9hZCxcbiAgICB9KTtcbiAgfTtcbn1cblxuZnVuY3Rpb24gc2V0TG9jYWxWaWRlbyhcbiAgcGF5bG9hZDogU2V0TG9jYWxWaWRlb1R5cGVcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIFNldExvY2FsVmlkZW9GdWxmaWxsZWRBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgYWN0aXZlQ2FsbCA9IGdldEFjdGl2ZUNhbGwoZ2V0U3RhdGUoKS5jYWxsaW5nKTtcbiAgICBpZiAoIWFjdGl2ZUNhbGwpIHtcbiAgICAgIGxvZy53YXJuKCdUcnlpbmcgdG8gc2V0IGxvY2FsIHZpZGVvIHdoZW4gbm8gY2FsbCBpcyBhY3RpdmUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsZXQgZW5hYmxlZDogYm9vbGVhbjtcbiAgICBpZiAoYXdhaXQgcmVxdWVzdENhbWVyYVBlcm1pc3Npb25zKCkpIHtcbiAgICAgIGlmIChcbiAgICAgICAgYWN0aXZlQ2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgfHxcbiAgICAgICAgKGFjdGl2ZUNhbGwuY2FsbE1vZGUgPT09IENhbGxNb2RlLkRpcmVjdCAmJiBhY3RpdmVDYWxsLmNhbGxTdGF0ZSlcbiAgICAgICkge1xuICAgICAgICBjYWxsaW5nLnNldE91dGdvaW5nVmlkZW8oYWN0aXZlQ2FsbC5jb252ZXJzYXRpb25JZCwgcGF5bG9hZC5lbmFibGVkKTtcbiAgICAgIH0gZWxzZSBpZiAocGF5bG9hZC5lbmFibGVkKSB7XG4gICAgICAgIGNhbGxpbmcuZW5hYmxlTG9jYWxDYW1lcmEoKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNhbGxpbmcuZGlzYWJsZUxvY2FsVmlkZW8oKTtcbiAgICAgIH1cbiAgICAgICh7IGVuYWJsZWQgfSA9IHBheWxvYWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBlbmFibGVkID0gZmFsc2U7XG4gICAgfVxuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogU0VUX0xPQ0FMX1ZJREVPX0ZVTEZJTExFRCxcbiAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgLi4ucGF5bG9hZCxcbiAgICAgICAgZW5hYmxlZCxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdChcbiAgcGF5bG9hZDogU2V0R3JvdXBDYWxsVmlkZW9SZXF1ZXN0VHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgbmV2ZXI+IHtcbiAgcmV0dXJuICgpID0+IHtcbiAgICBjYWxsaW5nLnNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdChcbiAgICAgIHBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICBwYXlsb2FkLnJlc29sdXRpb25zLm1hcChyZXNvbHV0aW9uID0+ICh7XG4gICAgICAgIC4uLnJlc29sdXRpb24sXG4gICAgICAgIC8vIFRoZSBgZnJhbWVyYXRlYCBwcm9wZXJ0eSBpbiBSaW5nUlRDIGhhcyB0byBiZSBzZXQsIGV2ZW4gaWYgaXQncyBzZXQgdG9cbiAgICAgICAgLy8gICBgdW5kZWZpbmVkYC5cbiAgICAgICAgZnJhbWVyYXRlOiB1bmRlZmluZWQsXG4gICAgICB9KSlcbiAgICApO1xuICB9O1xufVxuXG5mdW5jdGlvbiBzZXRQcmVzZW50aW5nKFxuICBzb3VyY2VUb1ByZXNlbnQ/OiBQcmVzZW50ZWRTb3VyY2Vcbik6IFRodW5rQWN0aW9uPHZvaWQsIFJvb3RTdGF0ZVR5cGUsIHVua25vd24sIFNldFByZXNlbnRpbmdGdWxmaWxsZWRBY3Rpb25UeXBlPiB7XG4gIHJldHVybiBhc3luYyAoZGlzcGF0Y2gsIGdldFN0YXRlKSA9PiB7XG4gICAgY29uc3QgY2FsbGluZ1N0YXRlID0gZ2V0U3RhdGUoKS5jYWxsaW5nO1xuICAgIGNvbnN0IHsgYWN0aXZlQ2FsbFN0YXRlIH0gPSBjYWxsaW5nU3RhdGU7XG4gICAgY29uc3QgYWN0aXZlQ2FsbCA9IGdldEFjdGl2ZUNhbGwoY2FsbGluZ1N0YXRlKTtcbiAgICBpZiAoIWFjdGl2ZUNhbGwgfHwgIWFjdGl2ZUNhbGxTdGF0ZSkge1xuICAgICAgbG9nLndhcm4oJ1RyeWluZyB0byBwcmVzZW50IHdoZW4gbm8gY2FsbCBpcyBhY3RpdmUnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjYWxsaW5nLnNldFByZXNlbnRpbmcoXG4gICAgICBhY3RpdmVDYWxsLmNvbnZlcnNhdGlvbklkLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlLmhhc0xvY2FsVmlkZW8sXG4gICAgICBzb3VyY2VUb1ByZXNlbnRcbiAgICApO1xuXG4gICAgZGlzcGF0Y2goe1xuICAgICAgdHlwZTogU0VUX1BSRVNFTlRJTkcsXG4gICAgICBwYXlsb2FkOiBzb3VyY2VUb1ByZXNlbnQsXG4gICAgfSk7XG5cbiAgICBpZiAoc291cmNlVG9QcmVzZW50KSB7XG4gICAgICBhd2FpdCBjYWxsaW5nVG9uZXMuc29tZW9uZVByZXNlbnRpbmcoKTtcbiAgICB9XG4gIH07XG59XG5cbmZ1bmN0aW9uIHNldE91dGdvaW5nUmluZyhwYXlsb2FkOiBib29sZWFuKTogU2V0T3V0Z29pbmdSaW5nQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogU0VUX09VVEdPSU5HX1JJTkcsXG4gICAgcGF5bG9hZCxcbiAgfTtcbn1cblxuZnVuY3Rpb24gc3RhcnRDYWxsaW5nTG9iYnkoe1xuICBjb252ZXJzYXRpb25JZCxcbiAgaXNWaWRlb0NhbGwsXG59OiBTdGFydENhbGxpbmdMb2JieVR5cGUpOiBUaHVua0FjdGlvbjxcbiAgdm9pZCxcbiAgUm9vdFN0YXRlVHlwZSxcbiAgdW5rbm93bixcbiAgU3RhcnRDYWxsaW5nTG9iYnlBY3Rpb25UeXBlXG4+IHtcbiAgcmV0dXJuIGFzeW5jIChkaXNwYXRjaCwgZ2V0U3RhdGUpID0+IHtcbiAgICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKCk7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0T3duKFxuICAgICAgc3RhdGUuY29udmVyc2F0aW9ucy5jb252ZXJzYXRpb25Mb29rdXAsXG4gICAgICBjb252ZXJzYXRpb25JZFxuICAgICk7XG4gICAgc3RyaWN0QXNzZXJ0KFxuICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgXCJzdGFydENhbGxpbmdMb2JieTogY2FuJ3Qgc3RhcnQgbG9iYnkgd2l0aG91dCBhIGNvbnZlcnNhdGlvblwiXG4gICAgKTtcblxuICAgIHN0cmljdEFzc2VydChcbiAgICAgICFzdGF0ZS5jYWxsaW5nLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgIFwic3RhcnRDYWxsaW5nTG9iYnk6IGNhbid0IHN0YXJ0IGxvYmJ5IGlmIGEgY2FsbCBpcyBhY3RpdmVcIlxuICAgICk7XG5cbiAgICAvLyBUaGUgZ3JvdXAgY2FsbCBkZXZpY2UgY291bnQgaXMgY29uc2lkZXJlZCAwIGZvciBhIGRpcmVjdCBjYWxsLlxuICAgIGNvbnN0IGdyb3VwQ2FsbCA9IGdldEdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwgc3RhdGUuY2FsbGluZyk7XG4gICAgY29uc3QgZ3JvdXBDYWxsRGV2aWNlQ291bnQgPVxuICAgICAgZ3JvdXBDYWxsPy5wZWVrSW5mbz8uZGV2aWNlQ291bnQgfHxcbiAgICAgIGdyb3VwQ2FsbD8ucmVtb3RlUGFydGljaXBhbnRzLmxlbmd0aCB8fFxuICAgICAgMDtcblxuICAgIGNvbnN0IGNhbGxMb2JieURhdGEgPSBhd2FpdCBjYWxsaW5nLnN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgIGhhc0xvY2FsQXVkaW86IGdyb3VwQ2FsbERldmljZUNvdW50IDwgOCxcbiAgICAgIGhhc0xvY2FsVmlkZW86IGlzVmlkZW9DYWxsLFxuICAgIH0pO1xuICAgIGlmICghY2FsbExvYmJ5RGF0YSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGRpc3BhdGNoKHtcbiAgICAgIHR5cGU6IFNUQVJUX0NBTExJTkdfTE9CQlksXG4gICAgICBwYXlsb2FkOiB7XG4gICAgICAgIC4uLmNhbGxMb2JieURhdGEsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICBpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZzogaXNDb252ZXJzYXRpb25Ub29CaWdUb1JpbmcoY29udmVyc2F0aW9uKSxcbiAgICAgIH0sXG4gICAgfSk7XG4gIH07XG59XG5cbmZ1bmN0aW9uIHN0YXJ0Q2FsbChcbiAgcGF5bG9hZDogU3RhcnRDYWxsVHlwZVxuKTogVGh1bmtBY3Rpb248dm9pZCwgUm9vdFN0YXRlVHlwZSwgdW5rbm93biwgU3RhcnREaXJlY3RDYWxsQWN0aW9uVHlwZT4ge1xuICByZXR1cm4gYXN5bmMgKGRpc3BhdGNoLCBnZXRTdGF0ZSkgPT4ge1xuICAgIHN3aXRjaCAocGF5bG9hZC5jYWxsTW9kZSkge1xuICAgICAgY2FzZSBDYWxsTW9kZS5EaXJlY3Q6XG4gICAgICAgIGF3YWl0IGNhbGxpbmcuc3RhcnRPdXRnb2luZ0RpcmVjdENhbGwoXG4gICAgICAgICAgcGF5bG9hZC5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBwYXlsb2FkLmhhc0xvY2FsQXVkaW8sXG4gICAgICAgICAgcGF5bG9hZC5oYXNMb2NhbFZpZGVvXG4gICAgICAgICk7XG4gICAgICAgIGRpc3BhdGNoKHtcbiAgICAgICAgICB0eXBlOiBTVEFSVF9ESVJFQ1RfQ0FMTCxcbiAgICAgICAgICBwYXlsb2FkLFxuICAgICAgICB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENhbGxNb2RlLkdyb3VwOiB7XG4gICAgICAgIGxldCBvdXRnb2luZ1Jpbmc6IGJvb2xlYW47XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZSgpO1xuICAgICAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGUuY2FsbGluZztcbiAgICAgICAgaWYgKGlzR3JvdXBDYWxsT3V0Ym91bmRSaW5nRW5hYmxlZCgpICYmIGFjdGl2ZUNhbGxTdGF0ZT8ub3V0Z29pbmdSaW5nKSB7XG4gICAgICAgICAgY29uc3QgY29udmVyc2F0aW9uID0gZ2V0T3duKFxuICAgICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9ucy5jb252ZXJzYXRpb25Mb29rdXAsXG4gICAgICAgICAgICBhY3RpdmVDYWxsU3RhdGUuY29udmVyc2F0aW9uSWRcbiAgICAgICAgICApO1xuICAgICAgICAgIG91dGdvaW5nUmluZyA9IEJvb2xlYW4oXG4gICAgICAgICAgICBjb252ZXJzYXRpb24gJiYgIWlzQ29udmVyc2F0aW9uVG9vQmlnVG9SaW5nKGNvbnZlcnNhdGlvbilcbiAgICAgICAgICApO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG91dGdvaW5nUmluZyA9IGZhbHNlO1xuICAgICAgICB9XG5cbiAgICAgICAgYXdhaXQgY2FsbGluZy5qb2luR3JvdXBDYWxsKFxuICAgICAgICAgIHBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgcGF5bG9hZC5oYXNMb2NhbEF1ZGlvLFxuICAgICAgICAgIHBheWxvYWQuaGFzTG9jYWxWaWRlbyxcbiAgICAgICAgICBvdXRnb2luZ1JpbmdcbiAgICAgICAgKTtcbiAgICAgICAgLy8gVGhlIGNhbGxpbmcgc2VydmljZSBzaG91bGQgYWxyZWFkeSBiZSB3aXJlZCB1cCB0byBSZWR1eCBzbyB3ZSBkb24ndCBuZWVkIHRvXG4gICAgICAgIC8vICAgZGlzcGF0Y2ggYW55dGhpbmcgaGVyZS5cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHBheWxvYWQuY2FsbE1vZGUpO1xuICAgIH1cbiAgfTtcbn1cblxuZnVuY3Rpb24gdG9nZ2xlUGFydGljaXBhbnRzKCk6IFRvZ2dsZVBhcnRpY2lwYW50c0FjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9QQVJUSUNJUEFOVFMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVBpcCgpOiBUb2dnbGVQaXBBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBUT0dHTEVfUElQLFxuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZygpOiBUb2dnbGVOZWVkc1NjcmVlblJlY29yZGluZ1Blcm1pc3Npb25zQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVE9HR0xFX05FRURTX1NDUkVFTl9SRUNPUkRJTkdfUEVSTUlTU0lPTlMsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHRvZ2dsZVNldHRpbmdzKCk6IFRvZ2dsZVNldHRpbmdzQWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogVE9HR0xFX1NFVFRJTkdTLFxuICB9O1xufVxuXG5mdW5jdGlvbiB0b2dnbGVTcGVha2VyVmlldygpOiBUb2dnbGVTcGVha2VyVmlld0FjdGlvblR5cGUge1xuICByZXR1cm4ge1xuICAgIHR5cGU6IFRPR0dMRV9TUEVBS0VSX1ZJRVcsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldygpOiBTd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXdBY3Rpb25UeXBlIHtcbiAgcmV0dXJuIHtcbiAgICB0eXBlOiBTV0lUQ0hfVE9fUFJFU0VOVEFUSU9OX1ZJRVcsXG4gIH07XG59XG5cbmZ1bmN0aW9uIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3KCk6IFN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3QWN0aW9uVHlwZSB7XG4gIHJldHVybiB7XG4gICAgdHlwZTogU1dJVENIX0ZST01fUFJFU0VOVEFUSU9OX1ZJRVcsXG4gIH07XG59XG5cbmV4cG9ydCBjb25zdCBhY3Rpb25zID0ge1xuICBhY2NlcHRDYWxsLFxuICBjYWxsU3RhdGVDaGFuZ2UsXG4gIGNhbmNlbENhbGwsXG4gIGNhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZyxcbiAgY2hhbmdlSU9EZXZpY2UsXG4gIGNsb3NlTmVlZFBlcm1pc3Npb25TY3JlZW4sXG4gIGRlY2xpbmVDYWxsLFxuICBnZXRQcmVzZW50aW5nU291cmNlcyxcbiAgZ3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2UsXG4gIGdyb3VwQ2FsbFN0YXRlQ2hhbmdlLFxuICBoYW5nVXBBY3RpdmVDYWxsLFxuICBrZXlDaGFuZ2VPayxcbiAga2V5Q2hhbmdlZCxcbiAgb3BlblN5c3RlbVByZWZlcmVuY2VzQWN0aW9uLFxuICBvdXRnb2luZ0NhbGwsXG4gIHBlZWtHcm91cENhbGxGb3JUaGVGaXJzdFRpbWUsXG4gIHBlZWtHcm91cENhbGxJZkl0SGFzTWVtYmVycyxcbiAgcGVla05vdENvbm5lY3RlZEdyb3VwQ2FsbCxcbiAgcmVjZWl2ZUluY29taW5nRGlyZWN0Q2FsbCxcbiAgcmVjZWl2ZUluY29taW5nR3JvdXBDYWxsLFxuICByZWZyZXNoSU9EZXZpY2VzLFxuICByZW1vdGVTaGFyaW5nU2NyZWVuQ2hhbmdlLFxuICByZW1vdGVWaWRlb0NoYW5nZSxcbiAgcmV0dXJuVG9BY3RpdmVDYWxsLFxuICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3QsXG4gIHNldElzQ2FsbEFjdGl2ZSxcbiAgc2V0TG9jYWxBdWRpbyxcbiAgc2V0TG9jYWxQcmV2aWV3LFxuICBzZXRMb2NhbFZpZGVvLFxuICBzZXRQcmVzZW50aW5nLFxuICBzZXRSZW5kZXJlckNhbnZhcyxcbiAgc2V0T3V0Z29pbmdSaW5nLFxuICBzdGFydENhbGwsXG4gIHN0YXJ0Q2FsbGluZ0xvYmJ5LFxuICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXcsXG4gIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3LFxuICB0b2dnbGVQYXJ0aWNpcGFudHMsXG4gIHRvZ2dsZVBpcCxcbiAgdG9nZ2xlU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNEaWFsb2csXG4gIHRvZ2dsZVNldHRpbmdzLFxuICB0b2dnbGVTcGVha2VyVmlldyxcbn07XG5cbmV4cG9ydCB0eXBlIEFjdGlvbnNUeXBlID0gdHlwZW9mIGFjdGlvbnM7XG5cbi8vIFJlZHVjZXJcblxuZXhwb3J0IGZ1bmN0aW9uIGdldEVtcHR5U3RhdGUoKTogQ2FsbGluZ1N0YXRlVHlwZSB7XG4gIHJldHVybiB7XG4gICAgYXZhaWxhYmxlQ2FtZXJhczogW10sXG4gICAgYXZhaWxhYmxlTWljcm9waG9uZXM6IFtdLFxuICAgIGF2YWlsYWJsZVNwZWFrZXJzOiBbXSxcbiAgICBzZWxlY3RlZENhbWVyYTogdW5kZWZpbmVkLFxuICAgIHNlbGVjdGVkTWljcm9waG9uZTogdW5kZWZpbmVkLFxuICAgIHNlbGVjdGVkU3BlYWtlcjogdW5kZWZpbmVkLFxuXG4gICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge30sXG4gICAgYWN0aXZlQ2FsbFN0YXRlOiB1bmRlZmluZWQsXG4gIH07XG59XG5cbmZ1bmN0aW9uIGdldEdyb3VwQ2FsbChcbiAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgc3RhdGU6IFJlYWRvbmx5PENhbGxpbmdTdGF0ZVR5cGU+XG4pOiB1bmRlZmluZWQgfCBHcm91cENhbGxTdGF0ZVR5cGUge1xuICBjb25zdCBjYWxsID0gZ2V0T3duKHN0YXRlLmNhbGxzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKTtcbiAgcmV0dXJuIGNhbGw/LmNhbGxNb2RlID09PSBDYWxsTW9kZS5Hcm91cCA/IGNhbGwgOiB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIHJlbW92ZUNvbnZlcnNhdGlvbkZyb21TdGF0ZShcbiAgc3RhdGU6IFJlYWRvbmx5PENhbGxpbmdTdGF0ZVR5cGU+LFxuICBjb252ZXJzYXRpb25JZDogc3RyaW5nXG4pOiBDYWxsaW5nU3RhdGVUeXBlIHtcbiAgcmV0dXJuIHtcbiAgICAuLi4oY29udmVyc2F0aW9uSWQgPT09IHN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8uY29udmVyc2F0aW9uSWRcbiAgICAgID8gb21pdChzdGF0ZSwgJ2FjdGl2ZUNhbGxTdGF0ZScpXG4gICAgICA6IHN0YXRlKSxcbiAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiBvbWl0KHN0YXRlLmNhbGxzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKSxcbiAgfTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIHJlZHVjZXIoXG4gIHN0YXRlOiBSZWFkb25seTxDYWxsaW5nU3RhdGVUeXBlPiA9IGdldEVtcHR5U3RhdGUoKSxcbiAgYWN0aW9uOiBSZWFkb25seTxDYWxsaW5nQWN0aW9uVHlwZT5cbik6IENhbGxpbmdTdGF0ZVR5cGUge1xuICBjb25zdCB7IGNhbGxzQnlDb252ZXJzYXRpb24gfSA9IHN0YXRlO1xuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU1RBUlRfQ0FMTElOR19MT0JCWSkge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgbGV0IGNhbGw6IERpcmVjdENhbGxTdGF0ZVR5cGUgfCBHcm91cENhbGxTdGF0ZVR5cGU7XG4gICAgbGV0IG91dGdvaW5nUmluZzogYm9vbGVhbjtcbiAgICBzd2l0Y2ggKGFjdGlvbi5wYXlsb2FkLmNhbGxNb2RlKSB7XG4gICAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgICAgY2FsbCA9IHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIGlzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICAgIGlzVmlkZW9DYWxsOiBhY3Rpb24ucGF5bG9hZC5oYXNMb2NhbFZpZGVvLFxuICAgICAgICB9O1xuICAgICAgICBvdXRnb2luZ1JpbmcgPSB0cnVlO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6IHtcbiAgICAgICAgLy8gV2UgZXhwZWN0IHRvIGJlIGluIHRoaXMgc3RhdGUgYnJpZWZseS4gVGhlIENhbGxpbmcgc2VydmljZSBzaG91bGQgdXBkYXRlIHRoZVxuICAgICAgICAvLyAgIGNhbGwgc3RhdGUgc2hvcnRseS5cbiAgICAgICAgY29uc3QgZXhpc3RpbmdDYWxsID0gZ2V0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkLCBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IHJpbmdTdGF0ZSA9IGdldEdyb3VwQ2FsbFJpbmdTdGF0ZShleGlzdGluZ0NhbGwpO1xuICAgICAgICBjYWxsID0ge1xuICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IGFjdGlvbi5wYXlsb2FkLmNvbm5lY3Rpb25TdGF0ZSxcbiAgICAgICAgICBqb2luU3RhdGU6IGFjdGlvbi5wYXlsb2FkLmpvaW5TdGF0ZSxcbiAgICAgICAgICBwZWVrSW5mbzogYWN0aW9uLnBheWxvYWQucGVla0luZm8gfHxcbiAgICAgICAgICAgIGV4aXN0aW5nQ2FsbD8ucGVla0luZm8gfHwge1xuICAgICAgICAgICAgICB1dWlkczogYWN0aW9uLnBheWxvYWQucmVtb3RlUGFydGljaXBhbnRzLm1hcCgoeyB1dWlkIH0pID0+IHV1aWQpLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiBJbmZpbml0eSxcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IGFjdGlvbi5wYXlsb2FkLnJlbW90ZVBhcnRpY2lwYW50cy5sZW5ndGgsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogYWN0aW9uLnBheWxvYWQucmVtb3RlUGFydGljaXBhbnRzLFxuICAgICAgICAgIC4uLnJpbmdTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgb3V0Z29pbmdSaW5nID1cbiAgICAgICAgICBpc0dyb3VwQ2FsbE91dGJvdW5kUmluZ0VuYWJsZWQoKSAmJlxuICAgICAgICAgICFyaW5nU3RhdGUucmluZ0lkICYmXG4gICAgICAgICAgIWNhbGwucGVla0luZm8/LnV1aWRzLmxlbmd0aCAmJlxuICAgICAgICAgICFjYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5sZW5ndGggJiZcbiAgICAgICAgICAhYWN0aW9uLnBheWxvYWQuaXNDb252ZXJzYXRpb25Ub29CaWdUb1Jpbmc7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihhY3Rpb24ucGF5bG9hZCk7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5jYWxsc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWRdOiBjYWxsLFxuICAgICAgfSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGhhc0xvY2FsQXVkaW86IGFjdGlvbi5wYXlsb2FkLmhhc0xvY2FsQXVkaW8sXG4gICAgICAgIGhhc0xvY2FsVmlkZW86IGFjdGlvbi5wYXlsb2FkLmhhc0xvY2FsVmlkZW8sXG4gICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5HcmlkLFxuICAgICAgICBwaXA6IGZhbHNlLFxuICAgICAgICBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHM6IFtdLFxuICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICBzaG93UGFydGljaXBhbnRzTGlzdDogZmFsc2UsXG4gICAgICAgIG91dGdvaW5nUmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU1RBUlRfRElSRUNUX0NBTEwpIHtcbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFthY3Rpb24ucGF5bG9hZC5jb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiBhY3Rpb24ucGF5bG9hZC5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5QcmVyaW5nLFxuICAgICAgICAgIGlzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICAgIGlzVmlkZW9DYWxsOiBhY3Rpb24ucGF5bG9hZC5oYXNMb2NhbFZpZGVvLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGhhc0xvY2FsQXVkaW86IGFjdGlvbi5wYXlsb2FkLmhhc0xvY2FsQXVkaW8sXG4gICAgICAgIGhhc0xvY2FsVmlkZW86IGFjdGlvbi5wYXlsb2FkLmhhc0xvY2FsVmlkZW8sXG4gICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5HcmlkLFxuICAgICAgICBwaXA6IGZhbHNlLFxuICAgICAgICBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHM6IFtdLFxuICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICBzaG93UGFydGljaXBhbnRzTGlzdDogZmFsc2UsXG4gICAgICAgIG91dGdvaW5nUmluZzogdHJ1ZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQUNDRVBUX0NBTExfUEVORElORykge1xuICAgIGlmICghaGFzKHN0YXRlLmNhbGxzQnlDb252ZXJzYXRpb24sIGFjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkKSkge1xuICAgICAgbG9nLndhcm4oJ1VuYWJsZSB0byBhY2NlcHQgYSBub24tZXhpc3RlbnQgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICBjb252ZXJzYXRpb25JZDogYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgIGhhc0xvY2FsVmlkZW86IGFjdGlvbi5wYXlsb2FkLmFzVmlkZW9DYWxsLFxuICAgICAgICBsb2NhbEF1ZGlvTGV2ZWw6IDAsXG4gICAgICAgIHZpZXdNb2RlOiBDYWxsVmlld01vZGUuR3JpZCxcbiAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzOiBbXSxcbiAgICAgICAgc2V0dGluZ3NEaWFsb2dPcGVuOiBmYWxzZSxcbiAgICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGZhbHNlLFxuICAgICAgICBvdXRnb2luZ1Jpbmc6IGZhbHNlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKFxuICAgIGFjdGlvbi50eXBlID09PSBDQU5DRUxfQ0FMTCB8fFxuICAgIGFjdGlvbi50eXBlID09PSBIQU5HX1VQIHx8XG4gICAgYWN0aW9uLnR5cGUgPT09IENMT1NFX05FRURfUEVSTUlTU0lPTl9TQ1JFRU5cbiAgKSB7XG4gICAgY29uc3QgYWN0aXZlQ2FsbCA9IGdldEFjdGl2ZUNhbGwoc3RhdGUpO1xuICAgIGlmICghYWN0aXZlQ2FsbCkge1xuICAgICAgbG9nLndhcm4oJ05vIGFjdGl2ZSBjYWxsIHRvIHJlbW92ZScpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cbiAgICBzd2l0Y2ggKGFjdGl2ZUNhbGwuY2FsbE1vZGUpIHtcbiAgICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OlxuICAgICAgICByZXR1cm4gcmVtb3ZlQ29udmVyc2F0aW9uRnJvbVN0YXRlKHN0YXRlLCBhY3RpdmVDYWxsLmNvbnZlcnNhdGlvbklkKTtcbiAgICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6XG4gICAgICAgIHJldHVybiBvbWl0KHN0YXRlLCAnYWN0aXZlQ2FsbFN0YXRlJyk7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGFjdGl2ZUNhbGwpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0FOQ0VMX0lOQ09NSU5HX0dST1VQX0NBTExfUklORykge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIHJpbmdJZCB9ID0gYWN0aW9uLnBheWxvYWQ7XG5cbiAgICBjb25zdCBncm91cENhbGwgPSBnZXRHcm91cENhbGwoY29udmVyc2F0aW9uSWQsIHN0YXRlKTtcbiAgICBpZiAoIWdyb3VwQ2FsbCB8fCBncm91cENhbGwucmluZ0lkICE9PSByaW5nSWQpIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IG9taXQoZ3JvdXBDYWxsLCBbJ3JpbmdJZCcsICdyaW5nZXJVdWlkJ10pLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ09OVkVSU0FUSU9OX0NIQU5HRUQnKSB7XG4gICAgY29uc3QgYWN0aXZlQ2FsbCA9IGdldEFjdGl2ZUNhbGwoc3RhdGUpO1xuICAgIGNvbnN0IHsgYWN0aXZlQ2FsbFN0YXRlIH0gPSBzdGF0ZTtcbiAgICBpZiAoXG4gICAgICAhYWN0aXZlQ2FsbFN0YXRlPy5vdXRnb2luZ1JpbmcgfHxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZS5jb252ZXJzYXRpb25JZCAhPT0gYWN0aW9uLnBheWxvYWQuaWQgfHxcbiAgICAgIGFjdGl2ZUNhbGw/LmNhbGxNb2RlICE9PSBDYWxsTW9kZS5Hcm91cCB8fFxuICAgICAgYWN0aXZlQ2FsbC5qb2luU3RhdGUgIT09IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQgfHxcbiAgICAgICFpc0NvbnZlcnNhdGlvblRvb0JpZ1RvUmluZyhhY3Rpb24ucGF5bG9hZC5kYXRhKVxuICAgICkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZTogeyAuLi5hY3RpdmVDYWxsU3RhdGUsIG91dGdvaW5nUmluZzogZmFsc2UgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSAnQ09OVkVSU0FUSU9OX1JFTU9WRUQnKSB7XG4gICAgcmV0dXJuIHJlbW92ZUNvbnZlcnNhdGlvbkZyb21TdGF0ZShzdGF0ZSwgYWN0aW9uLnBheWxvYWQuaWQpO1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBERUNMSU5FX0RJUkVDVF9DQUxMKSB7XG4gICAgcmV0dXJuIHJlbW92ZUNvbnZlcnNhdGlvbkZyb21TdGF0ZShzdGF0ZSwgYWN0aW9uLnBheWxvYWQuY29udmVyc2F0aW9uSWQpO1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBJTkNPTUlOR19ESVJFQ1RfQ0FMTCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4uY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2FjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGFjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLlByZXJpbmcsXG4gICAgICAgICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgICAgICAgICBpc1ZpZGVvQ2FsbDogYWN0aW9uLnBheWxvYWQuaXNWaWRlb0NhbGwsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IElOQ09NSU5HX0dST1VQX0NBTEwpIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkLCByaW5nSWQsIHJpbmdlclV1aWQgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgbGV0IGdyb3VwQ2FsbDogR3JvdXBDYWxsU3RhdGVUeXBlO1xuICAgIGNvbnN0IGV4aXN0aW5nR3JvdXBDYWxsID0gZ2V0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkLCBzdGF0ZSk7XG4gICAgaWYgKGV4aXN0aW5nR3JvdXBDYWxsKSB7XG4gICAgICBpZiAoZXhpc3RpbmdHcm91cENhbGwucmluZ2VyVXVpZCkge1xuICAgICAgICBsb2cuaW5mbygnR3JvdXAgY2FsbCB3YXMgYWxyZWFkeSByaW5naW5nJyk7XG4gICAgICAgIHJldHVybiBzdGF0ZTtcbiAgICAgIH1cbiAgICAgIGlmIChleGlzdGluZ0dyb3VwQ2FsbC5qb2luU3RhdGUgIT09IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQpIHtcbiAgICAgICAgbG9nLmluZm8oXCJHb3QgYSByaW5nIGZvciBhIGNhbGwgd2UncmUgYWxyZWFkeSBpblwiKTtcbiAgICAgICAgcmV0dXJuIHN0YXRlO1xuICAgICAgfVxuXG4gICAgICBncm91cENhbGwgPSB7XG4gICAgICAgIC4uLmV4aXN0aW5nR3JvdXBDYWxsLFxuICAgICAgICByaW5nSWQsXG4gICAgICAgIHJpbmdlclV1aWQsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBncm91cENhbGwgPSB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZCxcbiAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkLFxuICAgICAgICBwZWVrSW5mbzoge1xuICAgICAgICAgIHV1aWRzOiBbXSxcbiAgICAgICAgICBtYXhEZXZpY2VzOiBJbmZpbml0eSxcbiAgICAgICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgICAgfSxcbiAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXSxcbiAgICAgICAgcmluZ0lkLFxuICAgICAgICByaW5nZXJVdWlkLFxuICAgICAgfTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IGdyb3VwQ2FsbCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gT1VUR09JTkdfQ0FMTCkge1xuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4uY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2FjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGFjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLlByZXJpbmcsXG4gICAgICAgICAgaXNJbmNvbWluZzogZmFsc2UsXG4gICAgICAgICAgaXNWaWRlb0NhbGw6IGFjdGlvbi5wYXlsb2FkLmhhc0xvY2FsVmlkZW8sXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiBhY3Rpb24ucGF5bG9hZC5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgaGFzTG9jYWxBdWRpbzogYWN0aW9uLnBheWxvYWQuaGFzTG9jYWxBdWRpbyxcbiAgICAgICAgaGFzTG9jYWxWaWRlbzogYWN0aW9uLnBheWxvYWQuaGFzTG9jYWxWaWRlbyxcbiAgICAgICAgbG9jYWxBdWRpb0xldmVsOiAwLFxuICAgICAgICB2aWV3TW9kZTogQ2FsbFZpZXdNb2RlLkdyaWQsXG4gICAgICAgIHBpcDogZmFsc2UsXG4gICAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICAgIHNldHRpbmdzRGlhbG9nT3BlbjogZmFsc2UsXG4gICAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgICAgb3V0Z29pbmdSaW5nOiB0cnVlLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBDQUxMX1NUQVRFX0NIQU5HRV9GVUxGSUxMRUQpIHtcbiAgICAvLyBXZSB3YW50IHRvIGtlZXAgdGhlIHN0YXRlIGFyb3VuZCBmb3IgZW5kZWQgY2FsbHMgaWYgdGhleSByZXN1bHRlZCBpbiBhIG1lc3NhZ2VcbiAgICAvLyAgIHJlcXVlc3Qgc28gd2UgY2FuIHNob3cgdGhlIFwibmVlZHMgcGVybWlzc2lvblwiIHNjcmVlbi5cbiAgICBpZiAoXG4gICAgICBhY3Rpb24ucGF5bG9hZC5jYWxsU3RhdGUgPT09IENhbGxTdGF0ZS5FbmRlZCAmJlxuICAgICAgYWN0aW9uLnBheWxvYWQuY2FsbEVuZGVkUmVhc29uICE9PVxuICAgICAgICBDYWxsRW5kZWRSZWFzb24uUmVtb3RlSGFuZ3VwTmVlZFBlcm1pc3Npb25cbiAgICApIHtcbiAgICAgIHJldHVybiByZW1vdmVDb252ZXJzYXRpb25Gcm9tU3RhdGUoc3RhdGUsIGFjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkKTtcbiAgICB9XG5cbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKFxuICAgICAgc3RhdGUuY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgIGFjdGlvbi5wYXlsb2FkLmNvbnZlcnNhdGlvbklkXG4gICAgKTtcbiAgICBpZiAoY2FsbD8uY2FsbE1vZGUgIT09IENhbGxNb2RlLkRpcmVjdCkge1xuICAgICAgbG9nLndhcm4oJ0Nhbm5vdCB1cGRhdGUgc3RhdGUgZm9yIGEgbm9uLWRpcmVjdCBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgbGV0IGFjdGl2ZUNhbGxTdGF0ZTogdW5kZWZpbmVkIHwgQWN0aXZlQ2FsbFN0YXRlVHlwZTtcbiAgICBpZiAoXG4gICAgICBzdGF0ZS5hY3RpdmVDYWxsU3RhdGU/LmNvbnZlcnNhdGlvbklkID09PSBhY3Rpb24ucGF5bG9hZC5jb252ZXJzYXRpb25JZFxuICAgICkge1xuICAgICAgYWN0aXZlQ2FsbFN0YXRlID0ge1xuICAgICAgICAuLi5zdGF0ZS5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIGpvaW5lZEF0OiBhY3Rpb24ucGF5bG9hZC5hY2NlcHRlZFRpbWUsXG4gICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICAoeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlKTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFthY3Rpb24ucGF5bG9hZC5jb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAuLi5jYWxsLFxuICAgICAgICAgIGNhbGxTdGF0ZTogYWN0aW9uLnBheWxvYWQuY2FsbFN0YXRlLFxuICAgICAgICAgIGNhbGxFbmRlZFJlYXNvbjogYWN0aW9uLnBheWxvYWQuY2FsbEVuZGVkUmVhc29uLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBHUk9VUF9DQUxMX0FVRElPX0xFVkVMU19DSEFOR0UpIHtcbiAgICBjb25zdCB7IGNvbnZlcnNhdGlvbklkLCByZW1vdGVEZXZpY2VTdGF0ZXMgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGNvbnN0IGV4aXN0aW5nQ2FsbCA9IGdldEdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwgc3RhdGUpO1xuXG4gICAgLy8gVGhlIFBpUCBjaGVjayBpcyBhbiBvcHRpbWl6YXRpb24uIFdlIGRvbid0IG5lZWQgdG8gdXBkYXRlIGF1ZGlvIGxldmVscyBpZiB0aGUgdXNlclxuICAgIC8vICAgY2Fubm90IHNlZSB0aGVtLlxuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlIHx8IGFjdGl2ZUNhbGxTdGF0ZS5waXAgfHwgIWV4aXN0aW5nQ2FsbCkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGNvbnN0IGxvY2FsQXVkaW9MZXZlbCA9IHRydW5jYXRlQXVkaW9MZXZlbChhY3Rpb24ucGF5bG9hZC5sb2NhbEF1ZGlvTGV2ZWwpO1xuXG4gICAgY29uc3QgcmVtb3RlQXVkaW9MZXZlbHMgPSBuZXcgTWFwPG51bWJlciwgbnVtYmVyPigpO1xuICAgIHJlbW90ZURldmljZVN0YXRlcy5mb3JFYWNoKCh7IGF1ZGlvTGV2ZWwsIGRlbXV4SWQgfSkgPT4ge1xuICAgICAgLy8gV2UgZXhwZWN0IGBhdWRpb0xldmVsYCB0byBiZSBhIG51bWJlciBidXQgaGF2ZSB0aGlzIGNoZWNrIGp1c3QgaW4gY2FzZS5cbiAgICAgIGlmICh0eXBlb2YgYXVkaW9MZXZlbCAhPT0gJ251bWJlcicpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBncmFkZWQgPSB0cnVuY2F0ZUF1ZGlvTGV2ZWwoYXVkaW9MZXZlbCk7XG4gICAgICBpZiAoZ3JhZGVkID4gMCkge1xuICAgICAgICByZW1vdGVBdWRpb0xldmVscy5zZXQoZGVtdXhJZCwgZ3JhZGVkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIC8vIFRoaXMgYWN0aW9uIGlzIGRpc3BhdGNoZWQgZnJlcXVlbnRseS4gVGhpcyBlcXVhbGl0eSBjaGVjayBoZWxwcyBhdm9pZCByZS1yZW5kZXJzLlxuICAgIGNvbnN0IG9sZExvY2FsQXVkaW9MZXZlbCA9IGFjdGl2ZUNhbGxTdGF0ZS5sb2NhbEF1ZGlvTGV2ZWw7XG4gICAgY29uc3Qgb2xkUmVtb3RlQXVkaW9MZXZlbHMgPSBleGlzdGluZ0NhbGwucmVtb3RlQXVkaW9MZXZlbHM7XG4gICAgaWYgKFxuICAgICAgb2xkTG9jYWxBdWRpb0xldmVsID09PSBsb2NhbEF1ZGlvTGV2ZWwgJiZcbiAgICAgIG9sZFJlbW90ZUF1ZGlvTGV2ZWxzICYmXG4gICAgICBtYXBVdGlsLmlzRXF1YWwob2xkUmVtb3RlQXVkaW9MZXZlbHMsIHJlbW90ZUF1ZGlvTGV2ZWxzKVxuICAgICkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZTogeyAuLi5hY3RpdmVDYWxsU3RhdGUsIGxvY2FsQXVkaW9MZXZlbCB9LFxuICAgICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5jYWxsc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7IC4uLmV4aXN0aW5nQ2FsbCwgcmVtb3RlQXVkaW9MZXZlbHMgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gR1JPVVBfQ0FMTF9TVEFURV9DSEFOR0UpIHtcbiAgICBjb25zdCB7XG4gICAgICBjb25uZWN0aW9uU3RhdGUsXG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIGhhc0xvY2FsQXVkaW8sXG4gICAgICBoYXNMb2NhbFZpZGVvLFxuICAgICAgam9pblN0YXRlLFxuICAgICAgb3VyVXVpZCxcbiAgICAgIHBlZWtJbmZvLFxuICAgICAgcmVtb3RlUGFydGljaXBhbnRzLFxuICAgIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IGV4aXN0aW5nQ2FsbCA9IGdldEdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwgc3RhdGUpO1xuICAgIGNvbnN0IGV4aXN0aW5nUmluZ1N0YXRlID0gZ2V0R3JvdXBDYWxsUmluZ1N0YXRlKGV4aXN0aW5nQ2FsbCk7XG5cbiAgICBjb25zdCBuZXdQZWVrSW5mbyA9IHBlZWtJbmZvIHx8XG4gICAgICBleGlzdGluZ0NhbGw/LnBlZWtJbmZvIHx8IHtcbiAgICAgICAgdXVpZHM6IHJlbW90ZVBhcnRpY2lwYW50cy5tYXAoKHsgdXVpZCB9KSA9PiB1dWlkKSxcbiAgICAgICAgbWF4RGV2aWNlczogSW5maW5pdHksXG4gICAgICAgIGRldmljZUNvdW50OiByZW1vdGVQYXJ0aWNpcGFudHMubGVuZ3RoLFxuICAgICAgfTtcblxuICAgIGxldCBuZXdBY3RpdmVDYWxsU3RhdGU6IEFjdGl2ZUNhbGxTdGF0ZVR5cGUgfCB1bmRlZmluZWQ7XG4gICAgaWYgKHN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8uY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbklkKSB7XG4gICAgICBuZXdBY3RpdmVDYWxsU3RhdGUgPVxuICAgICAgICBjb25uZWN0aW9uU3RhdGUgPT09IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWRcbiAgICAgICAgICA/IHVuZGVmaW5lZFxuICAgICAgICAgIDoge1xuICAgICAgICAgICAgICAuLi5zdGF0ZS5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgICAgICAgIGhhc0xvY2FsQXVkaW8sXG4gICAgICAgICAgICAgIGhhc0xvY2FsVmlkZW8sXG4gICAgICAgICAgICB9O1xuICAgIH0gZWxzZSB7XG4gICAgICBuZXdBY3RpdmVDYWxsU3RhdGUgPSBzdGF0ZS5hY3RpdmVDYWxsU3RhdGU7XG4gICAgfVxuXG4gICAgaWYgKFxuICAgICAgbmV3QWN0aXZlQ2FsbFN0YXRlICYmXG4gICAgICBuZXdBY3RpdmVDYWxsU3RhdGUub3V0Z29pbmdSaW5nICYmXG4gICAgICBuZXdBY3RpdmVDYWxsU3RhdGUuY29udmVyc2F0aW9uSWQgPT09IGNvbnZlcnNhdGlvbklkICYmXG4gICAgICBpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwobmV3UGVla0luZm8sIG91clV1aWQpXG4gICAgKSB7XG4gICAgICBuZXdBY3RpdmVDYWxsU3RhdGUgPSB7XG4gICAgICAgIC4uLm5ld0FjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgb3V0Z29pbmdSaW5nOiBmYWxzZSxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgbGV0IG5ld1JpbmdTdGF0ZTogR3JvdXBDYWxsUmluZ1N0YXRlVHlwZTtcbiAgICBpZiAoam9pblN0YXRlID09PSBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkKSB7XG4gICAgICBuZXdSaW5nU3RhdGUgPSBleGlzdGluZ1JpbmdTdGF0ZTtcbiAgICB9IGVsc2Uge1xuICAgICAgbmV3UmluZ1N0YXRlID0ge307XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAuLi5jYWxsc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZSxcbiAgICAgICAgICBqb2luU3RhdGUsXG4gICAgICAgICAgcGVla0luZm86IG5ld1BlZWtJbmZvLFxuICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50cyxcbiAgICAgICAgICAuLi5uZXdSaW5nU3RhdGUsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiBuZXdBY3RpdmVDYWxsU3RhdGUsXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUEVFS19HUk9VUF9DQUxMX0ZVTEZJTExFRCkge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIHBlZWtJbmZvIH0gPSBhY3Rpb24ucGF5bG9hZDtcblxuICAgIGNvbnN0IGV4aXN0aW5nQ2FsbDogR3JvdXBDYWxsU3RhdGVUeXBlID0gZ2V0R3JvdXBDYWxsKFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBzdGF0ZVxuICAgICkgfHwge1xuICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWQsXG4gICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQsXG4gICAgICBwZWVrSW5mbzoge1xuICAgICAgICB1dWlkczogW10sXG4gICAgICAgIG1heERldmljZXM6IEluZmluaXR5LFxuICAgICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgIH0sXG4gICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgIH07XG5cbiAgICAvLyBUaGlzIGFjdGlvbiBzaG91bGQgb25seSB1cGRhdGUgbm9uLWNvbm5lY3RlZCBncm91cCBjYWxscy4gSXQncyBub3QgbmVjZXNzYXJpbHkgYVxuICAgIC8vICAgbWlzdGFrZSBpZiB0aGlzIGFjdGlvbiBpcyBkaXNwYXRjaGVkIFwib3ZlclwiIGEgY29ubmVjdGVkIGNhbGwuIEhlcmUncyBhIHZhbGlkXG4gICAgLy8gICBzZXF1ZW5jZSBvZiBldmVudHM6XG4gICAgLy9cbiAgICAvLyAxLiBXZSBhc2sgUmluZ1JUQyB0byBwZWVrLCBraWNraW5nIG9mZiBhbiBhc3luY2hyb25vdXMgb3BlcmF0aW9uLlxuICAgIC8vIDIuIFRoZSBhc3NvY2lhdGVkIGdyb3VwIGNhbGwgaXMgam9pbmVkLlxuICAgIC8vIDMuIFRoZSBwZWVrIHByb21pc2UgZnJvbSBzdGVwIDEgcmVzb2x2ZXMuXG4gICAgaWYgKFxuICAgICAgZXhpc3RpbmdDYWxsLmNvbm5lY3Rpb25TdGF0ZSAhPT0gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZFxuICAgICkge1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4uY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIC4uLmV4aXN0aW5nQ2FsbCxcbiAgICAgICAgICBwZWVrSW5mbyxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUkVNT1RFX1NIQVJJTkdfU0NSRUVOX0NIQU5HRSkge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIGlzU2hhcmluZ1NjcmVlbiB9ID0gYWN0aW9uLnBheWxvYWQ7XG4gICAgY29uc3QgY2FsbCA9IGdldE93bihzdGF0ZS5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKGNhbGw/LmNhbGxNb2RlICE9PSBDYWxsTW9kZS5EaXJlY3QpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgdXBkYXRlIHJlbW90ZSB2aWRlbyBmb3IgYSBub24tZGlyZWN0IGNhbGwnKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgIC4uLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAuLi5jYWxsLFxuICAgICAgICAgIGlzU2hhcmluZ1NjcmVlbixcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gUkVNT1RFX1ZJREVPX0NIQU5HRSkge1xuICAgIGNvbnN0IHsgY29udmVyc2F0aW9uSWQsIGhhc1ZpZGVvIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKHN0YXRlLmNhbGxzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoY2FsbD8uY2FsbE1vZGUgIT09IENhbGxNb2RlLkRpcmVjdCkge1xuICAgICAgbG9nLndhcm4oJ0Nhbm5vdCB1cGRhdGUgcmVtb3RlIHZpZGVvIGZvciBhIG5vbi1kaXJlY3QgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgLi4uY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgIC4uLmNhbGwsXG4gICAgICAgICAgaGFzUmVtb3RlVmlkZW86IGhhc1ZpZGVvLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBSRVRVUk5fVE9fQUNUSVZFX0NBTEwpIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgcmV0dXJuIHRvIGFjdGl2ZSBjYWxsIGlmIHRoZXJlIGlzIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VUX0xPQ0FMX0FVRElPX0ZVTEZJTExFRCkge1xuICAgIGlmICghc3RhdGUuYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHNldCBsb2NhbCBhdWRpbyB3aXRoIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLnN0YXRlLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgaGFzTG9jYWxBdWRpbzogYWN0aW9uLnBheWxvYWQuZW5hYmxlZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VUX0xPQ0FMX1ZJREVPX0ZVTEZJTExFRCkge1xuICAgIGlmICghc3RhdGUuYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHNldCBsb2NhbCB2aWRlbyB3aXRoIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLnN0YXRlLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgaGFzTG9jYWxWaWRlbzogYWN0aW9uLnBheWxvYWQuZW5hYmxlZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gQ0hBTkdFX0lPX0RFVklDRV9GVUxGSUxMRUQpIHtcbiAgICBjb25zdCB7IHNlbGVjdGVkRGV2aWNlIH0gPSBhY3Rpb24ucGF5bG9hZDtcbiAgICBjb25zdCBuZXh0U3RhdGUgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuXG4gICAgaWYgKGFjdGlvbi5wYXlsb2FkLnR5cGUgPT09IENhbGxpbmdEZXZpY2VUeXBlLkNBTUVSQSkge1xuICAgICAgbmV4dFN0YXRlLnNlbGVjdGVkQ2FtZXJhID0gc2VsZWN0ZWREZXZpY2U7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24ucGF5bG9hZC50eXBlID09PSBDYWxsaW5nRGV2aWNlVHlwZS5NSUNST1BIT05FKSB7XG4gICAgICBuZXh0U3RhdGUuc2VsZWN0ZWRNaWNyb3Bob25lID0gc2VsZWN0ZWREZXZpY2U7XG4gICAgfSBlbHNlIGlmIChhY3Rpb24ucGF5bG9hZC50eXBlID09PSBDYWxsaW5nRGV2aWNlVHlwZS5TUEVBS0VSKSB7XG4gICAgICBuZXh0U3RhdGUuc2VsZWN0ZWRTcGVha2VyID0gc2VsZWN0ZWREZXZpY2U7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgLi4ubmV4dFN0YXRlLFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFJFRlJFU0hfSU9fREVWSUNFUykge1xuICAgIGNvbnN0IHtcbiAgICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzLFxuICAgICAgc2VsZWN0ZWRNaWNyb3Bob25lLFxuICAgICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgICBzZWxlY3RlZFNwZWFrZXIsXG4gICAgICBhdmFpbGFibGVDYW1lcmFzLFxuICAgICAgc2VsZWN0ZWRDYW1lcmEsXG4gICAgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYXZhaWxhYmxlTWljcm9waG9uZXMsXG4gICAgICBzZWxlY3RlZE1pY3JvcGhvbmUsXG4gICAgICBhdmFpbGFibGVTcGVha2VycyxcbiAgICAgIHNlbGVjdGVkU3BlYWtlcixcbiAgICAgIGF2YWlsYWJsZUNhbWVyYXMsXG4gICAgICBzZWxlY3RlZENhbWVyYSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBUT0dHTEVfU0VUVElOR1MpIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgdG9nZ2xlIHNldHRpbmdzIHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGNhbGwnKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgICAgLi4uYWN0aXZlQ2FsbFN0YXRlLFxuICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46ICFhY3RpdmVDYWxsU3RhdGUuc2V0dGluZ3NEaWFsb2dPcGVuLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBUT0dHTEVfUEFSVElDSVBBTlRTKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHRvZ2dsZSBwYXJ0aWNpcGFudHMgbGlzdCB3aGVuIHRoZXJlIGlzIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6ICFhY3RpdmVDYWxsU3RhdGUuc2hvd1BhcnRpY2lwYW50c0xpc3QsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFRPR0dMRV9QSVApIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgdG9nZ2xlIFBpUCB3aGVuIHRoZXJlIGlzIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgcGlwOiAhYWN0aXZlQ2FsbFN0YXRlLnBpcCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VUX1BSRVNFTlRJTkcpIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgdG9nZ2xlIHByZXNlbnRpbmcgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAuLi5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIHByZXNlbnRpbmdTb3VyY2U6IGFjdGlvbi5wYXlsb2FkLFxuICAgICAgICBwcmVzZW50aW5nU291cmNlc0F2YWlsYWJsZTogdW5kZWZpbmVkLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgaWYgKGFjdGlvbi50eXBlID09PSBTRVRfUFJFU0VOVElOR19TT1VSQ0VTKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHNldCBwcmVzZW50aW5nIHNvdXJjZXMgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAuLi5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIHByZXNlbnRpbmdTb3VyY2VzQXZhaWxhYmxlOiBhY3Rpb24ucGF5bG9hZCxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU0VUX09VVEdPSU5HX1JJTkcpIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3Qgc2V0IG91dGdvaW5nIHJpbmcgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAuLi5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIG91dGdvaW5nUmluZzogYWN0aW9uLnBheWxvYWQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFRPR0dMRV9ORUVEU19TQ1JFRU5fUkVDT1JESU5HX1BFUk1JU1NJT05TKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHNldCBwcmVzZW50aW5nIHNvdXJjZXMgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAuLi5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIHNob3dOZWVkc1NjcmVlblJlY29yZGluZ1Blcm1pc3Npb25zV2FybmluZzpcbiAgICAgICAgICAhYWN0aXZlQ2FsbFN0YXRlLnNob3dOZWVkc1NjcmVlblJlY29yZGluZ1Blcm1pc3Npb25zV2FybmluZyxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gVE9HR0xFX1NQRUFLRVJfVklFVykge1xuICAgIGNvbnN0IHsgYWN0aXZlQ2FsbFN0YXRlIH0gPSBzdGF0ZTtcbiAgICBpZiAoIWFjdGl2ZUNhbGxTdGF0ZSkge1xuICAgICAgbG9nLndhcm4oJ0Nhbm5vdCB0b2dnbGUgc3BlYWtlciB2aWV3IHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGNhbGwnKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICBsZXQgbmV3Vmlld01vZGU6IENhbGxWaWV3TW9kZTtcbiAgICBpZiAoYWN0aXZlQ2FsbFN0YXRlLnZpZXdNb2RlID09PSBDYWxsVmlld01vZGUuR3JpZCkge1xuICAgICAgbmV3Vmlld01vZGUgPSBDYWxsVmlld01vZGUuU3BlYWtlcjtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gVGhpcyB3aWxsIHN3aXRjaCBwcmVzZW50YXRpb24vc3BlYWtlciB0byBncmlkXG4gICAgICBuZXdWaWV3TW9kZSA9IENhbGxWaWV3TW9kZS5HcmlkO1xuICAgIH1cblxuICAgIHJldHVybiB7XG4gICAgICAuLi5zdGF0ZSxcbiAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAuLi5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgIHZpZXdNb2RlOiBuZXdWaWV3TW9kZSxcbiAgICAgIH0sXG4gICAgfTtcbiAgfVxuXG4gIGlmIChhY3Rpb24udHlwZSA9PT0gU1dJVENIX1RPX1BSRVNFTlRBVElPTl9WSUVXKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHN3aXRjaCB0byBzcGVha2VyIHZpZXcgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIC8vIFwiUHJlc2VudGF0aW9uXCIgbW9kZSByZXZlcnRzIHRvIFwiR3JpZFwiIHdoZW4gdGhlIGNhbGwgaXMgb3ZlciBzbyBkb24ndFxuICAgIC8vIHN3aXRjaCBpdCBpZiBpdCBpcyBpbiBcIlNwZWFrZXJcIiBtb2RlLlxuICAgIGlmIChhY3RpdmVDYWxsU3RhdGUudmlld01vZGUgPT09IENhbGxWaWV3TW9kZS5TcGVha2VyKSB7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5QcmVzZW50YXRpb24sXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IFNXSVRDSF9GUk9NX1BSRVNFTlRBVElPTl9WSUVXKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IHN3aXRjaCB0byBzcGVha2VyIHZpZXcgd2hlbiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcpO1xuICAgICAgcmV0dXJuIHN0YXRlO1xuICAgIH1cblxuICAgIGlmIChhY3RpdmVDYWxsU3RhdGUudmlld01vZGUgIT09IENhbGxWaWV3TW9kZS5QcmVzZW50YXRpb24pIHtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgICAgLi4uYWN0aXZlQ2FsbFN0YXRlLFxuICAgICAgICB2aWV3TW9kZTogQ2FsbFZpZXdNb2RlLkdyaWQsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IE1BUktfQ0FMTF9VTlRSVVNURUQpIHtcbiAgICBjb25zdCB7IGFjdGl2ZUNhbGxTdGF0ZSB9ID0gc3RhdGU7XG4gICAgaWYgKCFhY3RpdmVDYWxsU3RhdGUpIHtcbiAgICAgIGxvZy53YXJuKCdDYW5ub3QgbWFyayBjYWxsIGFzIHVudHJ1c3RlZCB3aGVuIHRoZXJlIGlzIG5vIGFjdGl2ZSBjYWxsJyk7XG4gICAgICByZXR1cm4gc3RhdGU7XG4gICAgfVxuXG4gICAgY29uc3QgeyBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHMgfSA9IGFjdGlvbi5wYXlsb2FkO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIC4uLnN0YXRlLFxuICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgIC4uLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzLFxuICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICBzaG93UGFydGljaXBhbnRzTGlzdDogZmFsc2UsXG4gICAgICB9LFxuICAgIH07XG4gIH1cblxuICBpZiAoYWN0aW9uLnR5cGUgPT09IE1BUktfQ0FMTF9UUlVTVEVEKSB7XG4gICAgY29uc3QgeyBhY3RpdmVDYWxsU3RhdGUgfSA9IHN0YXRlO1xuICAgIGlmICghYWN0aXZlQ2FsbFN0YXRlKSB7XG4gICAgICBsb2cud2FybignQ2Fubm90IG1hcmsgY2FsbCBhcyB0cnVzdGVkIHdoZW4gdGhlcmUgaXMgbm8gYWN0aXZlIGNhbGwnKTtcbiAgICAgIHJldHVybiBzdGF0ZTtcbiAgICB9XG5cbiAgICByZXR1cm4ge1xuICAgICAgLi4uc3RhdGUsXG4gICAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgICAgLi4uYWN0aXZlQ2FsbFN0YXRlLFxuICAgICAgICBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHM6IFtdLFxuICAgICAgfSxcbiAgICB9O1xuICB9XG5cbiAgcmV0dXJuIHN0YXRlO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFHQSxzQkFBNEI7QUFFNUIscUJBQWdDO0FBQ2hDLDRDQUdPO0FBQ1Asb0JBQTBCO0FBQzFCLG9CQUF1QjtBQUN2QixhQUF3QjtBQUN4QixrQkFBNEI7QUFDNUIsd0NBQTJDO0FBQzNDLDhCQUFpQztBQUNqQyxxQkFBd0I7QUFDeEIsZ0NBQW1DO0FBU25DLHFCQU9PO0FBQ1AsMEJBQTZCO0FBQzdCLGdDQUF5QztBQUN6Qyw0Q0FBK0M7QUFDL0MsbUJBQXNCO0FBQ3RCLHlCQUE0QjtBQU01QiwyQkFBd0M7QUFDeEMsVUFBcUI7QUFDckIsb0JBQTZCO0FBQzdCLDJCQUE4QjtBQUM5QixjQUF5QjtBQXlObEIsTUFBTSxnQkFBZ0Isd0JBQUM7QUFBQSxFQUM1QjtBQUFBLEVBQ0E7QUFBQSxNQUVBLG1CQUNBLDBCQUFPLHFCQUFxQixnQkFBZ0Is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
