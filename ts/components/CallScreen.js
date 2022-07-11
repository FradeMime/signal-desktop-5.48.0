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
var CallScreen_exports = {};
__export(CallScreen_exports, {
  CallScreen: () => CallScreen,
  isInSpeakerView: () => isInSpeakerView
});
module.exports = __toCommonJS(CallScreen_exports);
var import_react = __toESM(require("react"));
var import_lodash = require("lodash");
var import_classnames = __toESM(require("classnames"));
var import_Avatar = require("./Avatar");
var import_CallingHeader = require("./CallingHeader");
var import_CallingPreCallInfo = require("./CallingPreCallInfo");
var import_CallingButton = require("./CallingButton");
var import_CallBackgroundBlur = require("./CallBackgroundBlur");
var import_Calling = require("../types/Calling");
var import_Colors = require("../types/Colors");
var import_CallingToastManager = require("./CallingToastManager");
var import_DirectCallRemoteParticipant = require("./DirectCallRemoteParticipant");
var import_GroupCallRemoteParticipants = require("./GroupCallRemoteParticipants");
var import_NeedsScreenRecordingPermissionsModal = require("./NeedsScreenRecordingPermissionsModal");
var import_missingCaseError = require("../util/missingCaseError");
var KeyboardLayout = __toESM(require("../services/keyboardLayout"));
var import_useActivateSpeakerViewOnPresenting = require("../hooks/useActivateSpeakerViewOnPresenting");
var import_CallingAudioIndicator = require("./CallingAudioIndicator");
var import_useKeyboardShortcuts = require("../hooks/useKeyboardShortcuts");
const isInSpeakerView = /* @__PURE__ */ __name((call) => {
  return Boolean(call?.viewMode === import_Calling.CallViewMode.Presentation || call?.viewMode === import_Calling.CallViewMode.Speaker);
}, "isInSpeakerView");
function DirectCallHeaderMessage({
  callState,
  i18n,
  joinedAt
}) {
  const [acceptedDuration, setAcceptedDuration] = (0, import_react.useState)();
  (0, import_react.useEffect)(() => {
    if (!joinedAt) {
      return import_lodash.noop;
    }
    const interval = setInterval(() => {
      setAcceptedDuration(Date.now() - joinedAt);
    }, 100);
    return clearInterval.bind(null, interval);
  }, [joinedAt]);
  if (callState === import_Calling.CallState.Reconnecting) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, i18n("callReconnecting"));
  }
  if (callState === import_Calling.CallState.Accepted && acceptedDuration) {
    return /* @__PURE__ */ import_react.default.createElement(import_react.default.Fragment, null, i18n("callDuration", [renderDuration(acceptedDuration)]));
  }
  return null;
}
const CallScreen = /* @__PURE__ */ __name(({
  activeCall,
  getGroupCallVideoFrameSource,
  getPresentingSources,
  groupMembers,
  hangUpActiveCall,
  i18n,
  joinedAt,
  me,
  openSystemPreferencesAction,
  setGroupCallVideoRequest,
  setLocalAudio,
  setLocalVideo,
  setLocalPreview,
  setPresenting,
  setRendererCanvas,
  stickyControls,
  switchToPresentationView,
  switchFromPresentationView,
  toggleParticipants,
  togglePip,
  toggleScreenRecordingPermissionsDialog,
  toggleSettings,
  toggleSpeakerView
}) => {
  const {
    conversation,
    hasLocalAudio,
    hasLocalVideo,
    localAudioLevel,
    presentingSource,
    remoteParticipants,
    showNeedsScreenRecordingPermissionsWarning,
    showParticipantsList
  } = activeCall;
  (0, import_useActivateSpeakerViewOnPresenting.useActivateSpeakerViewOnPresenting)({
    remoteParticipants,
    switchToPresentationView,
    switchFromPresentationView
  });
  const activeCallShortcuts = (0, import_useKeyboardShortcuts.useActiveCallShortcuts)(hangUpActiveCall);
  (0, import_useKeyboardShortcuts.useKeyboardShortcuts)(activeCallShortcuts);
  const toggleAudio = (0, import_react.useCallback)(() => {
    setLocalAudio({
      enabled: !hasLocalAudio
    });
  }, [setLocalAudio, hasLocalAudio]);
  const toggleVideo = (0, import_react.useCallback)(() => {
    setLocalVideo({
      enabled: !hasLocalVideo
    });
  }, [setLocalVideo, hasLocalVideo]);
  const togglePresenting = (0, import_react.useCallback)(() => {
    if (presentingSource) {
      setPresenting();
    } else {
      getPresentingSources();
    }
  }, [getPresentingSources, presentingSource, setPresenting]);
  const [controlsHover, setControlsHover] = (0, import_react.useState)(false);
  const onControlsMouseEnter = (0, import_react.useCallback)(() => {
    setControlsHover(true);
  }, [setControlsHover]);
  const onControlsMouseLeave = (0, import_react.useCallback)(() => {
    setControlsHover(false);
  }, [setControlsHover]);
  const [showControls, setShowControls] = (0, import_react.useState)(true);
  const localVideoRef = (0, import_react.useRef)(null);
  (0, import_react.useEffect)(() => {
    setLocalPreview({ element: localVideoRef });
    return () => {
      setLocalPreview({ element: void 0 });
    };
  }, [setLocalPreview, setRendererCanvas]);
  (0, import_react.useEffect)(() => {
    if (!showControls || stickyControls || controlsHover) {
      return import_lodash.noop;
    }
    const timer = setTimeout(() => {
      setShowControls(false);
    }, 5e3);
    return clearTimeout.bind(null, timer);
  }, [showControls, stickyControls, controlsHover]);
  (0, import_react.useEffect)(() => {
    const handleKeyDown = /* @__PURE__ */ __name((event) => {
      let eventHandled = false;
      const key = KeyboardLayout.lookup(event);
      if (event.shiftKey && (key === "V" || key === "v")) {
        toggleVideo();
        eventHandled = true;
      } else if (event.shiftKey && (key === "M" || key === "m")) {
        toggleAudio();
        eventHandled = true;
      }
      if (eventHandled) {
        event.preventDefault();
        event.stopPropagation();
        setShowControls(true);
      }
    }, "handleKeyDown");
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [toggleAudio, toggleVideo]);
  const currentPresenter = remoteParticipants.find((participant) => participant.presenting);
  const hasRemoteVideo = remoteParticipants.some((remoteParticipant) => remoteParticipant.hasRemoteVideo);
  const isSendingVideo = hasLocalVideo || presentingSource;
  let isRinging;
  let hasCallStarted;
  let headerMessage;
  let headerTitle;
  let isConnected;
  let participantCount;
  let remoteParticipantsElement;
  switch (activeCall.callMode) {
    case import_Calling.CallMode.Direct: {
      isRinging = activeCall.callState === import_Calling.CallState.Prering || activeCall.callState === import_Calling.CallState.Ringing;
      hasCallStarted = !isRinging;
      headerMessage = /* @__PURE__ */ import_react.default.createElement(DirectCallHeaderMessage, {
        i18n,
        callState: activeCall.callState || import_Calling.CallState.Prering,
        joinedAt
      });
      headerTitle = isRinging ? void 0 : conversation.title;
      isConnected = activeCall.callState === import_Calling.CallState.Accepted;
      participantCount = isConnected ? 2 : 0;
      remoteParticipantsElement = hasCallStarted ? /* @__PURE__ */ import_react.default.createElement(import_DirectCallRemoteParticipant.DirectCallRemoteParticipant, {
        conversation,
        hasRemoteVideo,
        i18n,
        setRendererCanvas
      }) : /* @__PURE__ */ import_react.default.createElement("div", {
        className: "module-ongoing-call__direct-call-ringing-spacer"
      });
      break;
    }
    case import_Calling.CallMode.Group:
      isRinging = activeCall.outgoingRing && !activeCall.remoteParticipants.length;
      hasCallStarted = activeCall.joinState !== import_Calling.GroupCallJoinState.NotJoined;
      participantCount = activeCall.remoteParticipants.length + 1;
      if (isRinging) {
        headerTitle = void 0;
      } else if (currentPresenter) {
        headerTitle = i18n("calling__presenting--person-ongoing", [
          currentPresenter.title
        ]);
      } else if (!activeCall.remoteParticipants.length) {
        headerTitle = i18n("calling__in-this-call--zero");
      }
      isConnected = activeCall.connectionState === import_Calling.GroupCallConnectionState.Connected;
      remoteParticipantsElement = /* @__PURE__ */ import_react.default.createElement(import_GroupCallRemoteParticipants.GroupCallRemoteParticipants, {
        getGroupCallVideoFrameSource,
        i18n,
        isInSpeakerView: isInSpeakerView(activeCall),
        remoteParticipants: activeCall.remoteParticipants,
        setGroupCallVideoRequest,
        remoteAudioLevels: activeCall.remoteAudioLevels
      });
      break;
    default:
      throw (0, import_missingCaseError.missingCaseError)(activeCall);
  }
  let lonelyInGroupNode;
  let localPreviewNode;
  if (activeCall.callMode === import_Calling.CallMode.Group && !activeCall.remoteParticipants.length) {
    lonelyInGroupNode = /* @__PURE__ */ import_react.default.createElement("div", {
      className: (0, import_classnames.default)("module-ongoing-call__local-preview-fullsize", presentingSource && "module-ongoing-call__local-preview-fullsize--presenting")
    }, isSendingVideo ? /* @__PURE__ */ import_react.default.createElement("video", {
      ref: localVideoRef,
      autoPlay: true
    }) : /* @__PURE__ */ import_react.default.createElement(import_CallBackgroundBlur.CallBackgroundBlur, {
      avatarPath: me.avatarPath,
      color: me.color
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: true,
      avatarPath: me.avatarPath,
      badge: void 0,
      color: me.color || import_Colors.AvatarColors[0],
      noteToSelf: false,
      conversationType: "direct",
      i18n,
      isMe: true,
      name: me.name,
      phoneNumber: me.phoneNumber,
      profileName: me.profileName,
      title: me.title,
      sharedGroupNames: [],
      size: 80
    }), /* @__PURE__ */ import_react.default.createElement("div", {
      className: "module-calling__camera-is-off"
    }, i18n("calling__your-video-is-off"))));
  } else {
    localPreviewNode = isSendingVideo ? /* @__PURE__ */ import_react.default.createElement("video", {
      className: (0, import_classnames.default)("module-ongoing-call__footer__local-preview__video", presentingSource && "module-ongoing-call__footer__local-preview__video--presenting"),
      ref: localVideoRef,
      autoPlay: true
    }) : /* @__PURE__ */ import_react.default.createElement(import_CallBackgroundBlur.CallBackgroundBlur, {
      avatarPath: me.avatarPath,
      color: me.color
    }, /* @__PURE__ */ import_react.default.createElement(import_Avatar.Avatar, {
      acceptedMessageRequest: true,
      avatarPath: me.avatarPath,
      badge: void 0,
      color: me.color || import_Colors.AvatarColors[0],
      noteToSelf: false,
      conversationType: "direct",
      i18n,
      isMe: true,
      name: me.name,
      phoneNumber: me.phoneNumber,
      profileName: me.profileName,
      title: me.title,
      sharedGroupNames: [],
      size: 80
    }));
  }
  let videoButtonType;
  if (presentingSource) {
    videoButtonType = import_CallingButton.CallingButtonType.VIDEO_DISABLED;
  } else if (hasLocalVideo) {
    videoButtonType = import_CallingButton.CallingButtonType.VIDEO_ON;
  } else {
    videoButtonType = import_CallingButton.CallingButtonType.VIDEO_OFF;
  }
  const audioButtonType = hasLocalAudio ? import_CallingButton.CallingButtonType.AUDIO_ON : import_CallingButton.CallingButtonType.AUDIO_OFF;
  const isAudioOnly = !hasLocalVideo && !hasRemoteVideo;
  const controlsFadeClass = (0, import_classnames.default)({
    "module-ongoing-call__controls--fadeIn": (showControls || isAudioOnly) && !isConnected,
    "module-ongoing-call__controls--fadeOut": !showControls && !isAudioOnly && isConnected
  });
  const isGroupCall = activeCall.callMode === import_Calling.CallMode.Group;
  let presentingButtonType;
  if (presentingSource) {
    presentingButtonType = import_CallingButton.CallingButtonType.PRESENTING_ON;
  } else if (currentPresenter) {
    presentingButtonType = import_CallingButton.CallingButtonType.PRESENTING_DISABLED;
  } else {
    presentingButtonType = import_CallingButton.CallingButtonType.PRESENTING_OFF;
  }
  return /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-calling__container", `module-ongoing-call__container--${getCallModeClassSuffix(activeCall.callMode)}`, `module-ongoing-call__container--${hasCallStarted ? "call-started" : "call-not-started"}`),
    onFocus: () => {
      setShowControls(true);
    },
    onMouseMove: () => {
      setShowControls(true);
    },
    role: "group"
  }, showNeedsScreenRecordingPermissionsWarning ? /* @__PURE__ */ import_react.default.createElement(import_NeedsScreenRecordingPermissionsModal.NeedsScreenRecordingPermissionsModal, {
    toggleScreenRecordingPermissionsDialog,
    i18n,
    openSystemPreferencesAction
  }) : null, /* @__PURE__ */ import_react.default.createElement(import_CallingToastManager.CallingToastManager, {
    activeCall,
    i18n
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-ongoing-call__header", controlsFadeClass)
  }, /* @__PURE__ */ import_react.default.createElement(import_CallingHeader.CallingHeader, {
    i18n,
    isInSpeakerView: isInSpeakerView(activeCall),
    isGroupCall,
    message: headerMessage,
    participantCount,
    showParticipantsList,
    title: headerTitle,
    toggleParticipants,
    togglePip,
    toggleSettings,
    toggleSpeakerView
  })), isRinging && /* @__PURE__ */ import_react.default.createElement(import_CallingPreCallInfo.CallingPreCallInfo, {
    conversation,
    groupMembers,
    i18n,
    me,
    ringMode: import_CallingPreCallInfo.RingMode.IsRinging
  }), remoteParticipantsElement, lonelyInGroupNode, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__footer"
  }, /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__footer__local-preview-offset"
  }), /* @__PURE__ */ import_react.default.createElement("div", {
    className: (0, import_classnames.default)("module-ongoing-call__footer__actions", controlsFadeClass)
  }, /* @__PURE__ */ import_react.default.createElement(import_CallingButton.CallingButton, {
    buttonType: presentingButtonType,
    i18n,
    onMouseEnter: onControlsMouseEnter,
    onMouseLeave: onControlsMouseLeave,
    onClick: togglePresenting
  }), /* @__PURE__ */ import_react.default.createElement(import_CallingButton.CallingButton, {
    buttonType: videoButtonType,
    i18n,
    onMouseEnter: onControlsMouseEnter,
    onMouseLeave: onControlsMouseLeave,
    onClick: toggleVideo
  }), /* @__PURE__ */ import_react.default.createElement(import_CallingButton.CallingButton, {
    buttonType: audioButtonType,
    i18n,
    onMouseEnter: onControlsMouseEnter,
    onMouseLeave: onControlsMouseLeave,
    onClick: toggleAudio
  }), /* @__PURE__ */ import_react.default.createElement(import_CallingButton.CallingButton, {
    buttonType: import_CallingButton.CallingButtonType.HANG_UP,
    i18n,
    onMouseEnter: onControlsMouseEnter,
    onMouseLeave: onControlsMouseLeave,
    onClick: hangUpActiveCall
  })), /* @__PURE__ */ import_react.default.createElement("div", {
    className: "module-ongoing-call__footer__local-preview"
  }, localPreviewNode, /* @__PURE__ */ import_react.default.createElement(import_CallingAudioIndicator.CallingAudioIndicator, {
    hasAudio: hasLocalAudio,
    audioLevel: localAudioLevel
  }))));
}, "CallScreen");
function getCallModeClassSuffix(callMode) {
  switch (callMode) {
    case import_Calling.CallMode.Direct:
      return "direct";
    case import_Calling.CallMode.Group:
      return "group";
    default:
      throw (0, import_missingCaseError.missingCaseError)(callMode);
  }
}
function renderDuration(ms) {
  const secs = Math.floor(ms / 1e3 % 60).toString().padStart(2, "0");
  const mins = Math.floor(ms / 6e4 % 60).toString().padStart(2, "0");
  const hours = Math.floor(ms / 36e5);
  if (hours > 0) {
    return `${hours}:${mins}:${secs}`;
  }
  return `${mins}:${secs}`;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallScreen,
  isInSpeakerView
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiQ2FsbFNjcmVlbi50c3giXSwKICAic291cmNlc0NvbnRlbnQiOiBbIi8vIENvcHlyaWdodCAyMDIwLTIwMjIgU2lnbmFsIE1lc3NlbmdlciwgTExDXG4vLyBTUERYLUxpY2Vuc2UtSWRlbnRpZmllcjogQUdQTC0zLjAtb25seVxuXG5pbXBvcnQgdHlwZSB7IFJlYWN0Tm9kZSB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCBSZWFjdCwgeyB1c2VTdGF0ZSwgdXNlUmVmLCB1c2VFZmZlY3QsIHVzZUNhbGxiYWNrIH0gZnJvbSAncmVhY3QnO1xuaW1wb3J0IHsgbm9vcCB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgY2xhc3NOYW1lcyBmcm9tICdjbGFzc25hbWVzJztcbmltcG9ydCB0eXBlIHsgVmlkZW9GcmFtZVNvdXJjZSB9IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHR5cGUge1xuICBBY3RpdmVDYWxsU3RhdGVUeXBlLFxuICBTZXRMb2NhbEF1ZGlvVHlwZSxcbiAgU2V0TG9jYWxQcmV2aWV3VHlwZSxcbiAgU2V0TG9jYWxWaWRlb1R5cGUsXG4gIFNldFJlbmRlcmVyQ2FudmFzVHlwZSxcbn0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY2FsbGluZyc7XG5pbXBvcnQgeyBBdmF0YXIgfSBmcm9tICcuL0F2YXRhcic7XG5pbXBvcnQgeyBDYWxsaW5nSGVhZGVyIH0gZnJvbSAnLi9DYWxsaW5nSGVhZGVyJztcbmltcG9ydCB7IENhbGxpbmdQcmVDYWxsSW5mbywgUmluZ01vZGUgfSBmcm9tICcuL0NhbGxpbmdQcmVDYWxsSW5mbyc7XG5pbXBvcnQgeyBDYWxsaW5nQnV0dG9uLCBDYWxsaW5nQnV0dG9uVHlwZSB9IGZyb20gJy4vQ2FsbGluZ0J1dHRvbic7XG5pbXBvcnQgeyBDYWxsQmFja2dyb3VuZEJsdXIgfSBmcm9tICcuL0NhbGxCYWNrZ3JvdW5kQmx1cic7XG5pbXBvcnQgdHlwZSB7XG4gIEFjdGl2ZUNhbGxUeXBlLFxuICBHcm91cENhbGxWaWRlb1JlcXVlc3QsXG4gIFByZXNlbnRlZFNvdXJjZSxcbn0gZnJvbSAnLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQge1xuICBDYWxsTW9kZSxcbiAgQ2FsbFZpZXdNb2RlLFxuICBDYWxsU3RhdGUsXG4gIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSxcbiAgR3JvdXBDYWxsSm9pblN0YXRlLFxufSBmcm9tICcuLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7IEF2YXRhckNvbG9ycyB9IGZyb20gJy4uL3R5cGVzL0NvbG9ycyc7XG5pbXBvcnQgdHlwZSB7IENvbnZlcnNhdGlvblR5cGUgfSBmcm9tICcuLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7IENhbGxpbmdUb2FzdE1hbmFnZXIgfSBmcm9tICcuL0NhbGxpbmdUb2FzdE1hbmFnZXInO1xuaW1wb3J0IHsgRGlyZWN0Q2FsbFJlbW90ZVBhcnRpY2lwYW50IH0gZnJvbSAnLi9EaXJlY3RDYWxsUmVtb3RlUGFydGljaXBhbnQnO1xuaW1wb3J0IHsgR3JvdXBDYWxsUmVtb3RlUGFydGljaXBhbnRzIH0gZnJvbSAnLi9Hcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudHMnO1xuaW1wb3J0IHR5cGUgeyBMb2NhbGl6ZXJUeXBlIH0gZnJvbSAnLi4vdHlwZXMvVXRpbCc7XG5pbXBvcnQgeyBOZWVkc1NjcmVlblJlY29yZGluZ1Blcm1pc3Npb25zTW9kYWwgfSBmcm9tICcuL05lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNNb2RhbCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCAqIGFzIEtleWJvYXJkTGF5b3V0IGZyb20gJy4uL3NlcnZpY2VzL2tleWJvYXJkTGF5b3V0JztcbmltcG9ydCB7IHVzZUFjdGl2YXRlU3BlYWtlclZpZXdPblByZXNlbnRpbmcgfSBmcm9tICcuLi9ob29rcy91c2VBY3RpdmF0ZVNwZWFrZXJWaWV3T25QcmVzZW50aW5nJztcbmltcG9ydCB7IENhbGxpbmdBdWRpb0luZGljYXRvciB9IGZyb20gJy4vQ2FsbGluZ0F1ZGlvSW5kaWNhdG9yJztcbmltcG9ydCB7XG4gIHVzZUFjdGl2ZUNhbGxTaG9ydGN1dHMsXG4gIHVzZUtleWJvYXJkU2hvcnRjdXRzLFxufSBmcm9tICcuLi9ob29rcy91c2VLZXlib2FyZFNob3J0Y3V0cyc7XG5cbmV4cG9ydCB0eXBlIFByb3BzVHlwZSA9IHtcbiAgYWN0aXZlQ2FsbDogQWN0aXZlQ2FsbFR5cGU7XG4gIGdldEdyb3VwQ2FsbFZpZGVvRnJhbWVTb3VyY2U6IChkZW11eElkOiBudW1iZXIpID0+IFZpZGVvRnJhbWVTb3VyY2U7XG4gIGdldFByZXNlbnRpbmdTb3VyY2VzOiAoKSA9PiB2b2lkO1xuICBncm91cE1lbWJlcnM/OiBBcnJheTxQaWNrPENvbnZlcnNhdGlvblR5cGUsICdpZCcgfCAnZmlyc3ROYW1lJyB8ICd0aXRsZSc+PjtcbiAgaGFuZ1VwQWN0aXZlQ2FsbDogKCkgPT4gdm9pZDtcbiAgaTE4bjogTG9jYWxpemVyVHlwZTtcbiAgam9pbmVkQXQ/OiBudW1iZXI7XG4gIG1lOiBDb252ZXJzYXRpb25UeXBlO1xuICBvcGVuU3lzdGVtUHJlZmVyZW5jZXNBY3Rpb246ICgpID0+IHVua25vd247XG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdDogKF86IEFycmF5PEdyb3VwQ2FsbFZpZGVvUmVxdWVzdD4pID0+IHZvaWQ7XG4gIHNldExvY2FsQXVkaW86IChfOiBTZXRMb2NhbEF1ZGlvVHlwZSkgPT4gdm9pZDtcbiAgc2V0TG9jYWxWaWRlbzogKF86IFNldExvY2FsVmlkZW9UeXBlKSA9PiB2b2lkO1xuICBzZXRMb2NhbFByZXZpZXc6IChfOiBTZXRMb2NhbFByZXZpZXdUeXBlKSA9PiB2b2lkO1xuICBzZXRQcmVzZW50aW5nOiAoXz86IFByZXNlbnRlZFNvdXJjZSkgPT4gdm9pZDtcbiAgc2V0UmVuZGVyZXJDYW52YXM6IChfOiBTZXRSZW5kZXJlckNhbnZhc1R5cGUpID0+IHZvaWQ7XG4gIHN0aWNreUNvbnRyb2xzOiBib29sZWFuO1xuICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXc6ICgpID0+IHZvaWQ7XG4gIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3OiAoKSA9PiB2b2lkO1xuICB0b2dnbGVQYXJ0aWNpcGFudHM6ICgpID0+IHZvaWQ7XG4gIHRvZ2dsZVBpcDogKCkgPT4gdm9pZDtcbiAgdG9nZ2xlU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNEaWFsb2c6ICgpID0+IHVua25vd247XG4gIHRvZ2dsZVNldHRpbmdzOiAoKSA9PiB2b2lkO1xuICB0b2dnbGVTcGVha2VyVmlldzogKCkgPT4gdm9pZDtcbn07XG5cbnR5cGUgRGlyZWN0Q2FsbEhlYWRlck1lc3NhZ2VQcm9wc1R5cGUgPSB7XG4gIGkxOG46IExvY2FsaXplclR5cGU7XG4gIGNhbGxTdGF0ZTogQ2FsbFN0YXRlO1xuICBqb2luZWRBdD86IG51bWJlcjtcbn07XG5cbmV4cG9ydCBjb25zdCBpc0luU3BlYWtlclZpZXcgPSAoXG4gIGNhbGw6IFBpY2s8QWN0aXZlQ2FsbFN0YXRlVHlwZSwgJ3ZpZXdNb2RlJz4gfCB1bmRlZmluZWRcbik6IGJvb2xlYW4gPT4ge1xuICByZXR1cm4gQm9vbGVhbihcbiAgICBjYWxsPy52aWV3TW9kZSA9PT0gQ2FsbFZpZXdNb2RlLlByZXNlbnRhdGlvbiB8fFxuICAgICAgY2FsbD8udmlld01vZGUgPT09IENhbGxWaWV3TW9kZS5TcGVha2VyXG4gICk7XG59O1xuXG5mdW5jdGlvbiBEaXJlY3RDYWxsSGVhZGVyTWVzc2FnZSh7XG4gIGNhbGxTdGF0ZSxcbiAgaTE4bixcbiAgam9pbmVkQXQsXG59OiBEaXJlY3RDYWxsSGVhZGVyTWVzc2FnZVByb3BzVHlwZSk6IEpTWC5FbGVtZW50IHwgbnVsbCB7XG4gIGNvbnN0IFthY2NlcHRlZER1cmF0aW9uLCBzZXRBY2NlcHRlZER1cmF0aW9uXSA9IHVzZVN0YXRlPFxuICAgIG51bWJlciB8IHVuZGVmaW5lZFxuICA+KCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBpZiAoIWpvaW5lZEF0KSB7XG4gICAgICByZXR1cm4gbm9vcDtcbiAgICB9XG4gICAgLy8gSXQncyByZWFsbHkganVtcHkgd2l0aCBhIHZhbHVlIG9mIDUwMG1zLlxuICAgIGNvbnN0IGludGVydmFsID0gc2V0SW50ZXJ2YWwoKCkgPT4ge1xuICAgICAgc2V0QWNjZXB0ZWREdXJhdGlvbihEYXRlLm5vdygpIC0gam9pbmVkQXQpO1xuICAgIH0sIDEwMCk7XG4gICAgcmV0dXJuIGNsZWFySW50ZXJ2YWwuYmluZChudWxsLCBpbnRlcnZhbCk7XG4gIH0sIFtqb2luZWRBdF0pO1xuXG4gIGlmIChjYWxsU3RhdGUgPT09IENhbGxTdGF0ZS5SZWNvbm5lY3RpbmcpIHtcbiAgICByZXR1cm4gPD57aTE4bignY2FsbFJlY29ubmVjdGluZycpfTwvPjtcbiAgfVxuICBpZiAoY2FsbFN0YXRlID09PSBDYWxsU3RhdGUuQWNjZXB0ZWQgJiYgYWNjZXB0ZWREdXJhdGlvbikge1xuICAgIHJldHVybiA8PntpMThuKCdjYWxsRHVyYXRpb24nLCBbcmVuZGVyRHVyYXRpb24oYWNjZXB0ZWREdXJhdGlvbildKX08Lz47XG4gIH1cbiAgcmV0dXJuIG51bGw7XG59XG5cbmV4cG9ydCBjb25zdCBDYWxsU2NyZWVuOiBSZWFjdC5GQzxQcm9wc1R5cGU+ID0gKHtcbiAgYWN0aXZlQ2FsbCxcbiAgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZSxcbiAgZ2V0UHJlc2VudGluZ1NvdXJjZXMsXG4gIGdyb3VwTWVtYmVycyxcbiAgaGFuZ1VwQWN0aXZlQ2FsbCxcbiAgaTE4bixcbiAgam9pbmVkQXQsXG4gIG1lLFxuICBvcGVuU3lzdGVtUHJlZmVyZW5jZXNBY3Rpb24sXG4gIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdCxcbiAgc2V0TG9jYWxBdWRpbyxcbiAgc2V0TG9jYWxWaWRlbyxcbiAgc2V0TG9jYWxQcmV2aWV3LFxuICBzZXRQcmVzZW50aW5nLFxuICBzZXRSZW5kZXJlckNhbnZhcyxcbiAgc3RpY2t5Q29udHJvbHMsXG4gIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldyxcbiAgc3dpdGNoRnJvbVByZXNlbnRhdGlvblZpZXcsXG4gIHRvZ2dsZVBhcnRpY2lwYW50cyxcbiAgdG9nZ2xlUGlwLFxuICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZyxcbiAgdG9nZ2xlU2V0dGluZ3MsXG4gIHRvZ2dsZVNwZWFrZXJWaWV3LFxufSkgPT4ge1xuICBjb25zdCB7XG4gICAgY29udmVyc2F0aW9uLFxuICAgIGhhc0xvY2FsQXVkaW8sXG4gICAgaGFzTG9jYWxWaWRlbyxcbiAgICBsb2NhbEF1ZGlvTGV2ZWwsXG4gICAgcHJlc2VudGluZ1NvdXJjZSxcbiAgICByZW1vdGVQYXJ0aWNpcGFudHMsXG4gICAgc2hvd05lZWRzU2NyZWVuUmVjb3JkaW5nUGVybWlzc2lvbnNXYXJuaW5nLFxuICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0LFxuICB9ID0gYWN0aXZlQ2FsbDtcblxuICB1c2VBY3RpdmF0ZVNwZWFrZXJWaWV3T25QcmVzZW50aW5nKHtcbiAgICByZW1vdGVQYXJ0aWNpcGFudHMsXG4gICAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3LFxuICAgIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3LFxuICB9KTtcblxuICBjb25zdCBhY3RpdmVDYWxsU2hvcnRjdXRzID0gdXNlQWN0aXZlQ2FsbFNob3J0Y3V0cyhoYW5nVXBBY3RpdmVDYWxsKTtcbiAgdXNlS2V5Ym9hcmRTaG9ydGN1dHMoYWN0aXZlQ2FsbFNob3J0Y3V0cyk7XG5cbiAgY29uc3QgdG9nZ2xlQXVkaW8gPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgc2V0TG9jYWxBdWRpbyh7XG4gICAgICBlbmFibGVkOiAhaGFzTG9jYWxBdWRpbyxcbiAgICB9KTtcbiAgfSwgW3NldExvY2FsQXVkaW8sIGhhc0xvY2FsQXVkaW9dKTtcblxuICBjb25zdCB0b2dnbGVWaWRlbyA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRMb2NhbFZpZGVvKHtcbiAgICAgIGVuYWJsZWQ6ICFoYXNMb2NhbFZpZGVvLFxuICAgIH0pO1xuICB9LCBbc2V0TG9jYWxWaWRlbywgaGFzTG9jYWxWaWRlb10pO1xuXG4gIGNvbnN0IHRvZ2dsZVByZXNlbnRpbmcgPSB1c2VDYWxsYmFjaygoKSA9PiB7XG4gICAgaWYgKHByZXNlbnRpbmdTb3VyY2UpIHtcbiAgICAgIHNldFByZXNlbnRpbmcoKTtcbiAgICB9IGVsc2Uge1xuICAgICAgZ2V0UHJlc2VudGluZ1NvdXJjZXMoKTtcbiAgICB9XG4gIH0sIFtnZXRQcmVzZW50aW5nU291cmNlcywgcHJlc2VudGluZ1NvdXJjZSwgc2V0UHJlc2VudGluZ10pO1xuXG4gIGNvbnN0IFtjb250cm9sc0hvdmVyLCBzZXRDb250cm9sc0hvdmVyXSA9IHVzZVN0YXRlKGZhbHNlKTtcblxuICBjb25zdCBvbkNvbnRyb2xzTW91c2VFbnRlciA9IHVzZUNhbGxiYWNrKCgpID0+IHtcbiAgICBzZXRDb250cm9sc0hvdmVyKHRydWUpO1xuICB9LCBbc2V0Q29udHJvbHNIb3Zlcl0pO1xuXG4gIGNvbnN0IG9uQ29udHJvbHNNb3VzZUxlYXZlID0gdXNlQ2FsbGJhY2soKCkgPT4ge1xuICAgIHNldENvbnRyb2xzSG92ZXIoZmFsc2UpO1xuICB9LCBbc2V0Q29udHJvbHNIb3Zlcl0pO1xuXG4gIGNvbnN0IFtzaG93Q29udHJvbHMsIHNldFNob3dDb250cm9sc10gPSB1c2VTdGF0ZSh0cnVlKTtcblxuICBjb25zdCBsb2NhbFZpZGVvUmVmID0gdXNlUmVmPEhUTUxWaWRlb0VsZW1lbnQgfCBudWxsPihudWxsKTtcblxuICB1c2VFZmZlY3QoKCkgPT4ge1xuICAgIHNldExvY2FsUHJldmlldyh7IGVsZW1lbnQ6IGxvY2FsVmlkZW9SZWYgfSk7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIHNldExvY2FsUHJldmlldyh7IGVsZW1lbnQ6IHVuZGVmaW5lZCB9KTtcbiAgICB9O1xuICB9LCBbc2V0TG9jYWxQcmV2aWV3LCBzZXRSZW5kZXJlckNhbnZhc10pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgaWYgKCFzaG93Q29udHJvbHMgfHwgc3RpY2t5Q29udHJvbHMgfHwgY29udHJvbHNIb3Zlcikge1xuICAgICAgcmV0dXJuIG5vb3A7XG4gICAgfVxuICAgIGNvbnN0IHRpbWVyID0gc2V0VGltZW91dCgoKSA9PiB7XG4gICAgICBzZXRTaG93Q29udHJvbHMoZmFsc2UpO1xuICAgIH0sIDUwMDApO1xuICAgIHJldHVybiBjbGVhclRpbWVvdXQuYmluZChudWxsLCB0aW1lcik7XG4gIH0sIFtzaG93Q29udHJvbHMsIHN0aWNreUNvbnRyb2xzLCBjb250cm9sc0hvdmVyXSk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBjb25zdCBoYW5kbGVLZXlEb3duID0gKGV2ZW50OiBLZXlib2FyZEV2ZW50KTogdm9pZCA9PiB7XG4gICAgICBsZXQgZXZlbnRIYW5kbGVkID0gZmFsc2U7XG5cbiAgICAgIGNvbnN0IGtleSA9IEtleWJvYXJkTGF5b3V0Lmxvb2t1cChldmVudCk7XG5cbiAgICAgIGlmIChldmVudC5zaGlmdEtleSAmJiAoa2V5ID09PSAnVicgfHwga2V5ID09PSAndicpKSB7XG4gICAgICAgIHRvZ2dsZVZpZGVvKCk7XG4gICAgICAgIGV2ZW50SGFuZGxlZCA9IHRydWU7XG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnNoaWZ0S2V5ICYmIChrZXkgPT09ICdNJyB8fCBrZXkgPT09ICdtJykpIHtcbiAgICAgICAgdG9nZ2xlQXVkaW8oKTtcbiAgICAgICAgZXZlbnRIYW5kbGVkID0gdHJ1ZTtcbiAgICAgIH1cblxuICAgICAgaWYgKGV2ZW50SGFuZGxlZCkge1xuICAgICAgICBldmVudC5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBldmVudC5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICAgICAgc2V0U2hvd0NvbnRyb2xzKHRydWUpO1xuICAgICAgfVxuICAgIH07XG5cbiAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdrZXlkb3duJywgaGFuZGxlS2V5RG93bik7XG4gICAgcmV0dXJuICgpID0+IHtcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2tleWRvd24nLCBoYW5kbGVLZXlEb3duKTtcbiAgICB9O1xuICB9LCBbdG9nZ2xlQXVkaW8sIHRvZ2dsZVZpZGVvXSk7XG5cbiAgY29uc3QgY3VycmVudFByZXNlbnRlciA9IHJlbW90ZVBhcnRpY2lwYW50cy5maW5kKFxuICAgIHBhcnRpY2lwYW50ID0+IHBhcnRpY2lwYW50LnByZXNlbnRpbmdcbiAgKTtcblxuICBjb25zdCBoYXNSZW1vdGVWaWRlbyA9IHJlbW90ZVBhcnRpY2lwYW50cy5zb21lKFxuICAgIHJlbW90ZVBhcnRpY2lwYW50ID0+IHJlbW90ZVBhcnRpY2lwYW50Lmhhc1JlbW90ZVZpZGVvXG4gICk7XG5cbiAgY29uc3QgaXNTZW5kaW5nVmlkZW8gPSBoYXNMb2NhbFZpZGVvIHx8IHByZXNlbnRpbmdTb3VyY2U7XG5cbiAgbGV0IGlzUmluZ2luZzogYm9vbGVhbjtcbiAgbGV0IGhhc0NhbGxTdGFydGVkOiBib29sZWFuO1xuICBsZXQgaGVhZGVyTWVzc2FnZTogUmVhY3ROb2RlIHwgdW5kZWZpbmVkO1xuICBsZXQgaGVhZGVyVGl0bGU6IHN0cmluZyB8IHVuZGVmaW5lZDtcbiAgbGV0IGlzQ29ubmVjdGVkOiBib29sZWFuO1xuICBsZXQgcGFydGljaXBhbnRDb3VudDogbnVtYmVyO1xuICBsZXQgcmVtb3RlUGFydGljaXBhbnRzRWxlbWVudDogUmVhY3ROb2RlO1xuXG4gIHN3aXRjaCAoYWN0aXZlQ2FsbC5jYWxsTW9kZSkge1xuICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OiB7XG4gICAgICBpc1JpbmdpbmcgPVxuICAgICAgICBhY3RpdmVDYWxsLmNhbGxTdGF0ZSA9PT0gQ2FsbFN0YXRlLlByZXJpbmcgfHxcbiAgICAgICAgYWN0aXZlQ2FsbC5jYWxsU3RhdGUgPT09IENhbGxTdGF0ZS5SaW5naW5nO1xuICAgICAgaGFzQ2FsbFN0YXJ0ZWQgPSAhaXNSaW5naW5nO1xuICAgICAgaGVhZGVyTWVzc2FnZSA9IChcbiAgICAgICAgPERpcmVjdENhbGxIZWFkZXJNZXNzYWdlXG4gICAgICAgICAgaTE4bj17aTE4bn1cbiAgICAgICAgICBjYWxsU3RhdGU9e2FjdGl2ZUNhbGwuY2FsbFN0YXRlIHx8IENhbGxTdGF0ZS5QcmVyaW5nfVxuICAgICAgICAgIGpvaW5lZEF0PXtqb2luZWRBdH1cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBoZWFkZXJUaXRsZSA9IGlzUmluZ2luZyA/IHVuZGVmaW5lZCA6IGNvbnZlcnNhdGlvbi50aXRsZTtcbiAgICAgIGlzQ29ubmVjdGVkID0gYWN0aXZlQ2FsbC5jYWxsU3RhdGUgPT09IENhbGxTdGF0ZS5BY2NlcHRlZDtcbiAgICAgIHBhcnRpY2lwYW50Q291bnQgPSBpc0Nvbm5lY3RlZCA/IDIgOiAwO1xuICAgICAgcmVtb3RlUGFydGljaXBhbnRzRWxlbWVudCA9IGhhc0NhbGxTdGFydGVkID8gKFxuICAgICAgICA8RGlyZWN0Q2FsbFJlbW90ZVBhcnRpY2lwYW50XG4gICAgICAgICAgY29udmVyc2F0aW9uPXtjb252ZXJzYXRpb259XG4gICAgICAgICAgaGFzUmVtb3RlVmlkZW89e2hhc1JlbW90ZVZpZGVvfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgc2V0UmVuZGVyZXJDYW52YXM9e3NldFJlbmRlcmVyQ2FudmFzfVxuICAgICAgICAvPlxuICAgICAgKSA6IChcbiAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtb25nb2luZy1jYWxsX19kaXJlY3QtY2FsbC1yaW5naW5nLXNwYWNlclwiIC8+XG4gICAgICApO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6XG4gICAgICBpc1JpbmdpbmcgPVxuICAgICAgICBhY3RpdmVDYWxsLm91dGdvaW5nUmluZyAmJiAhYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHMubGVuZ3RoO1xuICAgICAgaGFzQ2FsbFN0YXJ0ZWQgPSBhY3RpdmVDYWxsLmpvaW5TdGF0ZSAhPT0gR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZDtcbiAgICAgIHBhcnRpY2lwYW50Q291bnQgPSBhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5sZW5ndGggKyAxO1xuXG4gICAgICBpZiAoaXNSaW5naW5nKSB7XG4gICAgICAgIGhlYWRlclRpdGxlID0gdW5kZWZpbmVkO1xuICAgICAgfSBlbHNlIGlmIChjdXJyZW50UHJlc2VudGVyKSB7XG4gICAgICAgIGhlYWRlclRpdGxlID0gaTE4bignY2FsbGluZ19fcHJlc2VudGluZy0tcGVyc29uLW9uZ29pbmcnLCBbXG4gICAgICAgICAgY3VycmVudFByZXNlbnRlci50aXRsZSxcbiAgICAgICAgXSk7XG4gICAgICB9IGVsc2UgaWYgKCFhY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50cy5sZW5ndGgpIHtcbiAgICAgICAgaGVhZGVyVGl0bGUgPSBpMThuKCdjYWxsaW5nX19pbi10aGlzLWNhbGwtLXplcm8nKTtcbiAgICAgIH1cblxuICAgICAgaXNDb25uZWN0ZWQgPVxuICAgICAgICBhY3RpdmVDYWxsLmNvbm5lY3Rpb25TdGF0ZSA9PT0gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZDtcbiAgICAgIHJlbW90ZVBhcnRpY2lwYW50c0VsZW1lbnQgPSAoXG4gICAgICAgIDxHcm91cENhbGxSZW1vdGVQYXJ0aWNpcGFudHNcbiAgICAgICAgICBnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlPXtnZXRHcm91cENhbGxWaWRlb0ZyYW1lU291cmNlfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNJblNwZWFrZXJWaWV3PXtpc0luU3BlYWtlclZpZXcoYWN0aXZlQ2FsbCl9XG4gICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzPXthY3RpdmVDYWxsLnJlbW90ZVBhcnRpY2lwYW50c31cbiAgICAgICAgICBzZXRHcm91cENhbGxWaWRlb1JlcXVlc3Q9e3NldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdH1cbiAgICAgICAgICByZW1vdGVBdWRpb0xldmVscz17YWN0aXZlQ2FsbC5yZW1vdGVBdWRpb0xldmVsc31cbiAgICAgICAgLz5cbiAgICAgICk7XG4gICAgICBicmVhaztcbiAgICBkZWZhdWx0OlxuICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihhY3RpdmVDYWxsKTtcbiAgfVxuXG4gIGxldCBsb25lbHlJbkdyb3VwTm9kZTogUmVhY3ROb2RlO1xuICBsZXQgbG9jYWxQcmV2aWV3Tm9kZTogUmVhY3ROb2RlO1xuICBpZiAoXG4gICAgYWN0aXZlQ2FsbC5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiZcbiAgICAhYWN0aXZlQ2FsbC5yZW1vdGVQYXJ0aWNpcGFudHMubGVuZ3RoXG4gICkge1xuICAgIGxvbmVseUluR3JvdXBOb2RlID0gKFxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoXG4gICAgICAgICAgJ21vZHVsZS1vbmdvaW5nLWNhbGxfX2xvY2FsLXByZXZpZXctZnVsbHNpemUnLFxuICAgICAgICAgIHByZXNlbnRpbmdTb3VyY2UgJiZcbiAgICAgICAgICAgICdtb2R1bGUtb25nb2luZy1jYWxsX19sb2NhbC1wcmV2aWV3LWZ1bGxzaXplLS1wcmVzZW50aW5nJ1xuICAgICAgICApfVxuICAgICAgPlxuICAgICAgICB7aXNTZW5kaW5nVmlkZW8gPyAoXG4gICAgICAgICAgPHZpZGVvIHJlZj17bG9jYWxWaWRlb1JlZn0gYXV0b1BsYXkgLz5cbiAgICAgICAgKSA6IChcbiAgICAgICAgICA8Q2FsbEJhY2tncm91bmRCbHVyIGF2YXRhclBhdGg9e21lLmF2YXRhclBhdGh9IGNvbG9yPXttZS5jb2xvcn0+XG4gICAgICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgICAgIGFjY2VwdGVkTWVzc2FnZVJlcXVlc3RcbiAgICAgICAgICAgICAgYXZhdGFyUGF0aD17bWUuYXZhdGFyUGF0aH1cbiAgICAgICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICAgICAgY29sb3I9e21lLmNvbG9yIHx8IEF2YXRhckNvbG9yc1swXX1cbiAgICAgICAgICAgICAgbm90ZVRvU2VsZj17ZmFsc2V9XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgICBpc01lXG4gICAgICAgICAgICAgIG5hbWU9e21lLm5hbWV9XG4gICAgICAgICAgICAgIHBob25lTnVtYmVyPXttZS5waG9uZU51bWJlcn1cbiAgICAgICAgICAgICAgcHJvZmlsZU5hbWU9e21lLnByb2ZpbGVOYW1lfVxuICAgICAgICAgICAgICB0aXRsZT17bWUudGl0bGV9XG4gICAgICAgICAgICAgIC8vIGBzaGFyZWRHcm91cE5hbWVzYCBtYWtlcyBubyBzZW5zZSBmb3IgeW91cnNlbGYsIGJ1dCBgPEF2YXRhcj5gIG5lZWRzIGl0XG4gICAgICAgICAgICAgIC8vICAgdG8gZGV0ZXJtaW5lIGJsdXJyaW5nLlxuICAgICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzPXtbXX1cbiAgICAgICAgICAgICAgc2l6ZT17ODB9XG4gICAgICAgICAgICAvPlxuICAgICAgICAgICAgPGRpdiBjbGFzc05hbWU9XCJtb2R1bGUtY2FsbGluZ19fY2FtZXJhLWlzLW9mZlwiPlxuICAgICAgICAgICAgICB7aTE4bignY2FsbGluZ19feW91ci12aWRlby1pcy1vZmYnKX1cbiAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDwvQ2FsbEJhY2tncm91bmRCbHVyPlxuICAgICAgICApfVxuICAgICAgPC9kaXY+XG4gICAgKTtcbiAgfSBlbHNlIHtcbiAgICBsb2NhbFByZXZpZXdOb2RlID0gaXNTZW5kaW5nVmlkZW8gPyAoXG4gICAgICA8dmlkZW9cbiAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICdtb2R1bGUtb25nb2luZy1jYWxsX19mb290ZXJfX2xvY2FsLXByZXZpZXdfX3ZpZGVvJyxcbiAgICAgICAgICBwcmVzZW50aW5nU291cmNlICYmXG4gICAgICAgICAgICAnbW9kdWxlLW9uZ29pbmctY2FsbF9fZm9vdGVyX19sb2NhbC1wcmV2aWV3X192aWRlby0tcHJlc2VudGluZydcbiAgICAgICAgKX1cbiAgICAgICAgcmVmPXtsb2NhbFZpZGVvUmVmfVxuICAgICAgICBhdXRvUGxheVxuICAgICAgLz5cbiAgICApIDogKFxuICAgICAgPENhbGxCYWNrZ3JvdW5kQmx1ciBhdmF0YXJQYXRoPXttZS5hdmF0YXJQYXRofSBjb2xvcj17bWUuY29sb3J9PlxuICAgICAgICA8QXZhdGFyXG4gICAgICAgICAgYWNjZXB0ZWRNZXNzYWdlUmVxdWVzdFxuICAgICAgICAgIGF2YXRhclBhdGg9e21lLmF2YXRhclBhdGh9XG4gICAgICAgICAgYmFkZ2U9e3VuZGVmaW5lZH1cbiAgICAgICAgICBjb2xvcj17bWUuY29sb3IgfHwgQXZhdGFyQ29sb3JzWzBdfVxuICAgICAgICAgIG5vdGVUb1NlbGY9e2ZhbHNlfVxuICAgICAgICAgIGNvbnZlcnNhdGlvblR5cGU9XCJkaXJlY3RcIlxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgaXNNZVxuICAgICAgICAgIG5hbWU9e21lLm5hbWV9XG4gICAgICAgICAgcGhvbmVOdW1iZXI9e21lLnBob25lTnVtYmVyfVxuICAgICAgICAgIHByb2ZpbGVOYW1lPXttZS5wcm9maWxlTmFtZX1cbiAgICAgICAgICB0aXRsZT17bWUudGl0bGV9XG4gICAgICAgICAgLy8gU2VlIGNvbW1lbnQgYWJvdmUgYWJvdXQgYHNoYXJlZEdyb3VwTmFtZXNgLlxuICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM9e1tdfVxuICAgICAgICAgIHNpemU9ezgwfVxuICAgICAgICAvPlxuICAgICAgPC9DYWxsQmFja2dyb3VuZEJsdXI+XG4gICAgKTtcbiAgfVxuXG4gIGxldCB2aWRlb0J1dHRvblR5cGU6IENhbGxpbmdCdXR0b25UeXBlO1xuICBpZiAocHJlc2VudGluZ1NvdXJjZSkge1xuICAgIHZpZGVvQnV0dG9uVHlwZSA9IENhbGxpbmdCdXR0b25UeXBlLlZJREVPX0RJU0FCTEVEO1xuICB9IGVsc2UgaWYgKGhhc0xvY2FsVmlkZW8pIHtcbiAgICB2aWRlb0J1dHRvblR5cGUgPSBDYWxsaW5nQnV0dG9uVHlwZS5WSURFT19PTjtcbiAgfSBlbHNlIHtcbiAgICB2aWRlb0J1dHRvblR5cGUgPSBDYWxsaW5nQnV0dG9uVHlwZS5WSURFT19PRkY7XG4gIH1cblxuICBjb25zdCBhdWRpb0J1dHRvblR5cGUgPSBoYXNMb2NhbEF1ZGlvXG4gICAgPyBDYWxsaW5nQnV0dG9uVHlwZS5BVURJT19PTlxuICAgIDogQ2FsbGluZ0J1dHRvblR5cGUuQVVESU9fT0ZGO1xuXG4gIGNvbnN0IGlzQXVkaW9Pbmx5ID0gIWhhc0xvY2FsVmlkZW8gJiYgIWhhc1JlbW90ZVZpZGVvO1xuXG4gIGNvbnN0IGNvbnRyb2xzRmFkZUNsYXNzID0gY2xhc3NOYW1lcyh7XG4gICAgJ21vZHVsZS1vbmdvaW5nLWNhbGxfX2NvbnRyb2xzLS1mYWRlSW4nOlxuICAgICAgKHNob3dDb250cm9scyB8fCBpc0F1ZGlvT25seSkgJiYgIWlzQ29ubmVjdGVkLFxuICAgICdtb2R1bGUtb25nb2luZy1jYWxsX19jb250cm9scy0tZmFkZU91dCc6XG4gICAgICAhc2hvd0NvbnRyb2xzICYmICFpc0F1ZGlvT25seSAmJiBpc0Nvbm5lY3RlZCxcbiAgfSk7XG5cbiAgY29uc3QgaXNHcm91cENhbGwgPSBhY3RpdmVDYWxsLmNhbGxNb2RlID09PSBDYWxsTW9kZS5Hcm91cDtcblxuICBsZXQgcHJlc2VudGluZ0J1dHRvblR5cGU6IENhbGxpbmdCdXR0b25UeXBlO1xuICBpZiAocHJlc2VudGluZ1NvdXJjZSkge1xuICAgIHByZXNlbnRpbmdCdXR0b25UeXBlID0gQ2FsbGluZ0J1dHRvblR5cGUuUFJFU0VOVElOR19PTjtcbiAgfSBlbHNlIGlmIChjdXJyZW50UHJlc2VudGVyKSB7XG4gICAgcHJlc2VudGluZ0J1dHRvblR5cGUgPSBDYWxsaW5nQnV0dG9uVHlwZS5QUkVTRU5USU5HX0RJU0FCTEVEO1xuICB9IGVsc2Uge1xuICAgIHByZXNlbnRpbmdCdXR0b25UeXBlID0gQ2FsbGluZ0J1dHRvblR5cGUuUFJFU0VOVElOR19PRkY7XG4gIH1cblxuICByZXR1cm4gKFxuICAgIDxkaXZcbiAgICAgIGNsYXNzTmFtZT17Y2xhc3NOYW1lcyhcbiAgICAgICAgJ21vZHVsZS1jYWxsaW5nX19jb250YWluZXInLFxuICAgICAgICBgbW9kdWxlLW9uZ29pbmctY2FsbF9fY29udGFpbmVyLS0ke2dldENhbGxNb2RlQ2xhc3NTdWZmaXgoXG4gICAgICAgICAgYWN0aXZlQ2FsbC5jYWxsTW9kZVxuICAgICAgICApfWAsXG4gICAgICAgIGBtb2R1bGUtb25nb2luZy1jYWxsX19jb250YWluZXItLSR7XG4gICAgICAgICAgaGFzQ2FsbFN0YXJ0ZWQgPyAnY2FsbC1zdGFydGVkJyA6ICdjYWxsLW5vdC1zdGFydGVkJ1xuICAgICAgICB9YFxuICAgICAgKX1cbiAgICAgIG9uRm9jdXM9eygpID0+IHtcbiAgICAgICAgc2V0U2hvd0NvbnRyb2xzKHRydWUpO1xuICAgICAgfX1cbiAgICAgIG9uTW91c2VNb3ZlPXsoKSA9PiB7XG4gICAgICAgIHNldFNob3dDb250cm9scyh0cnVlKTtcbiAgICAgIH19XG4gICAgICByb2xlPVwiZ3JvdXBcIlxuICAgID5cbiAgICAgIHtzaG93TmVlZHNTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc1dhcm5pbmcgPyAoXG4gICAgICAgIDxOZWVkc1NjcmVlblJlY29yZGluZ1Blcm1pc3Npb25zTW9kYWxcbiAgICAgICAgICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZz17XG4gICAgICAgICAgICB0b2dnbGVTY3JlZW5SZWNvcmRpbmdQZXJtaXNzaW9uc0RpYWxvZ1xuICAgICAgICAgIH1cbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIG9wZW5TeXN0ZW1QcmVmZXJlbmNlc0FjdGlvbj17b3BlblN5c3RlbVByZWZlcmVuY2VzQWN0aW9ufVxuICAgICAgICAvPlxuICAgICAgKSA6IG51bGx9XG4gICAgICA8Q2FsbGluZ1RvYXN0TWFuYWdlciBhY3RpdmVDYWxsPXthY3RpdmVDYWxsfSBpMThuPXtpMThufSAvPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzc05hbWU9e2NsYXNzTmFtZXMoJ21vZHVsZS1vbmdvaW5nLWNhbGxfX2hlYWRlcicsIGNvbnRyb2xzRmFkZUNsYXNzKX1cbiAgICAgID5cbiAgICAgICAgPENhbGxpbmdIZWFkZXJcbiAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgIGlzSW5TcGVha2VyVmlldz17aXNJblNwZWFrZXJWaWV3KGFjdGl2ZUNhbGwpfVxuICAgICAgICAgIGlzR3JvdXBDYWxsPXtpc0dyb3VwQ2FsbH1cbiAgICAgICAgICBtZXNzYWdlPXtoZWFkZXJNZXNzYWdlfVxuICAgICAgICAgIHBhcnRpY2lwYW50Q291bnQ9e3BhcnRpY2lwYW50Q291bnR9XG4gICAgICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q9e3Nob3dQYXJ0aWNpcGFudHNMaXN0fVxuICAgICAgICAgIHRpdGxlPXtoZWFkZXJUaXRsZX1cbiAgICAgICAgICB0b2dnbGVQYXJ0aWNpcGFudHM9e3RvZ2dsZVBhcnRpY2lwYW50c31cbiAgICAgICAgICB0b2dnbGVQaXA9e3RvZ2dsZVBpcH1cbiAgICAgICAgICB0b2dnbGVTZXR0aW5ncz17dG9nZ2xlU2V0dGluZ3N9XG4gICAgICAgICAgdG9nZ2xlU3BlYWtlclZpZXc9e3RvZ2dsZVNwZWFrZXJWaWV3fVxuICAgICAgICAvPlxuICAgICAgPC9kaXY+XG4gICAgICB7aXNSaW5naW5nICYmIChcbiAgICAgICAgPENhbGxpbmdQcmVDYWxsSW5mb1xuICAgICAgICAgIGNvbnZlcnNhdGlvbj17Y29udmVyc2F0aW9ufVxuICAgICAgICAgIGdyb3VwTWVtYmVycz17Z3JvdXBNZW1iZXJzfVxuICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgbWU9e21lfVxuICAgICAgICAgIHJpbmdNb2RlPXtSaW5nTW9kZS5Jc1Jpbmdpbmd9XG4gICAgICAgIC8+XG4gICAgICApfVxuICAgICAge3JlbW90ZVBhcnRpY2lwYW50c0VsZW1lbnR9XG4gICAgICB7bG9uZWx5SW5Hcm91cE5vZGV9XG4gICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1vbmdvaW5nLWNhbGxfX2Zvb3RlclwiPlxuICAgICAgICB7LyogVGhpcyBsYXlvdXQtb25seSBlbGVtZW50IGlzIG5vdCBpZGVhbC5cbiAgICAgICAgICAgIFNlZSB0aGUgY29tbWVudCBpbiBfbW9kdWxlcy5jc3MgZm9yIG1vcmUuICovfVxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1vbmdvaW5nLWNhbGxfX2Zvb3Rlcl9fbG9jYWwtcHJldmlldy1vZmZzZXRcIiAvPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc05hbWVzKFxuICAgICAgICAgICAgJ21vZHVsZS1vbmdvaW5nLWNhbGxfX2Zvb3Rlcl9fYWN0aW9ucycsXG4gICAgICAgICAgICBjb250cm9sc0ZhZGVDbGFzc1xuICAgICAgICAgICl9XG4gICAgICAgID5cbiAgICAgICAgICA8Q2FsbGluZ0J1dHRvblxuICAgICAgICAgICAgYnV0dG9uVHlwZT17cHJlc2VudGluZ0J1dHRvblR5cGV9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtvbkNvbnRyb2xzTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17b25Db250cm9sc01vdXNlTGVhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXt0b2dnbGVQcmVzZW50aW5nfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENhbGxpbmdCdXR0b25cbiAgICAgICAgICAgIGJ1dHRvblR5cGU9e3ZpZGVvQnV0dG9uVHlwZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e29uQ29udHJvbHNNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtvbkNvbnRyb2xzTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZVZpZGVvfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENhbGxpbmdCdXR0b25cbiAgICAgICAgICAgIGJ1dHRvblR5cGU9e2F1ZGlvQnV0dG9uVHlwZX1cbiAgICAgICAgICAgIGkxOG49e2kxOG59XG4gICAgICAgICAgICBvbk1vdXNlRW50ZXI9e29uQ29udHJvbHNNb3VzZUVudGVyfVxuICAgICAgICAgICAgb25Nb3VzZUxlYXZlPXtvbkNvbnRyb2xzTW91c2VMZWF2ZX1cbiAgICAgICAgICAgIG9uQ2xpY2s9e3RvZ2dsZUF1ZGlvfVxuICAgICAgICAgIC8+XG4gICAgICAgICAgPENhbGxpbmdCdXR0b25cbiAgICAgICAgICAgIGJ1dHRvblR5cGU9e0NhbGxpbmdCdXR0b25UeXBlLkhBTkdfVVB9XG4gICAgICAgICAgICBpMThuPXtpMThufVxuICAgICAgICAgICAgb25Nb3VzZUVudGVyPXtvbkNvbnRyb2xzTW91c2VFbnRlcn1cbiAgICAgICAgICAgIG9uTW91c2VMZWF2ZT17b25Db250cm9sc01vdXNlTGVhdmV9XG4gICAgICAgICAgICBvbkNsaWNrPXtoYW5nVXBBY3RpdmVDYWxsfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cIm1vZHVsZS1vbmdvaW5nLWNhbGxfX2Zvb3Rlcl9fbG9jYWwtcHJldmlld1wiPlxuICAgICAgICAgIHtsb2NhbFByZXZpZXdOb2RlfVxuICAgICAgICAgIDxDYWxsaW5nQXVkaW9JbmRpY2F0b3JcbiAgICAgICAgICAgIGhhc0F1ZGlvPXtoYXNMb2NhbEF1ZGlvfVxuICAgICAgICAgICAgYXVkaW9MZXZlbD17bG9jYWxBdWRpb0xldmVsfVxuICAgICAgICAgIC8+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICk7XG59O1xuXG5mdW5jdGlvbiBnZXRDYWxsTW9kZUNsYXNzU3VmZml4KFxuICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0IHwgQ2FsbE1vZGUuR3JvdXBcbik6IHN0cmluZyB7XG4gIHN3aXRjaCAoY2FsbE1vZGUpIHtcbiAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDpcbiAgICAgIHJldHVybiAnZGlyZWN0JztcbiAgICBjYXNlIENhbGxNb2RlLkdyb3VwOlxuICAgICAgcmV0dXJuICdncm91cCc7XG4gICAgZGVmYXVsdDpcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY2FsbE1vZGUpO1xuICB9XG59XG5cbmZ1bmN0aW9uIHJlbmRlckR1cmF0aW9uKG1zOiBudW1iZXIpOiBzdHJpbmcge1xuICBjb25zdCBzZWNzID0gTWF0aC5mbG9vcigobXMgLyAxMDAwKSAlIDYwKVxuICAgIC50b1N0cmluZygpXG4gICAgLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IG1pbnMgPSBNYXRoLmZsb29yKChtcyAvIDYwMDAwKSAlIDYwKVxuICAgIC50b1N0cmluZygpXG4gICAgLnBhZFN0YXJ0KDIsICcwJyk7XG4gIGNvbnN0IGhvdXJzID0gTWF0aC5mbG9vcihtcyAvIDM2MDAwMDApO1xuICBpZiAoaG91cnMgPiAwKSB7XG4gICAgcmV0dXJuIGAke2hvdXJzfToke21pbnN9OiR7c2Vjc31gO1xuICB9XG4gIHJldHVybiBgJHttaW5zfToke3NlY3N9YDtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUlBLG1CQUFnRTtBQUNoRSxvQkFBcUI7QUFDckIsd0JBQXVCO0FBU3ZCLG9CQUF1QjtBQUN2QiwyQkFBOEI7QUFDOUIsZ0NBQTZDO0FBQzdDLDJCQUFpRDtBQUNqRCxnQ0FBbUM7QUFNbkMscUJBTU87QUFD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
