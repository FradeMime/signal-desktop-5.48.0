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
  CallingClass: () => CallingClass,
  calling: () => calling
});
module.exports = __toCommonJS(calling_exports);
var import_electron = require("electron");
var import_ringrtc = require("ringrtc");
var import_lodash = require("lodash");
var import_conversations = require("../state/ducks/conversations");
var import_whatTypeOfConversation = require("../util/whatTypeOfConversation");
var import_Calling = require("../types/Calling");
var import_audioDeviceModule = require("../calling/audioDeviceModule");
var import_findBestMatchingDevice = require("../calling/findBestMatchingDevice");
var import_UUID = require("../types/UUID");
var Bytes = __toESM(require("../Bytes"));
var import_Crypto = require("../Crypto");
var import_dropNull = require("../util/dropNull");
var import_getOwn = require("../util/getOwn");
var import_isNormalNumber = require("../util/isNormalNumber");
var durations = __toESM(require("../util/durations"));
var import_clearTimeoutIfNecessary = require("../util/clearTimeoutIfNecessary");
var import_handleMessageSend = require("../util/handleMessageSend");
var import_groups = require("../groups");
var import_wrapWithSyncMessageSend = require("../util/wrapWithSyncMessageSend");
var import_missingCaseError = require("../util/missingCaseError");
var import_normalizeGroupCallTimestamp = require("../util/ringrtc/normalizeGroupCallTimestamp");
var import_constants = require("../calling/constants");
var import_callingMessageToProto = require("../util/callingMessageToProto");
var import_getSendOptions = require("../util/getSendOptions");
var import_requestMicrophonePermissions = require("../util/requestMicrophonePermissions");
var import_protobuf = require("../protobuf");
var import_Client = __toESM(require("../sql/Client"));
var import_notifications = require("./notifications");
var log = __toESM(require("../logging/log"));
var import_assert = require("../util/assert");
const {
  processGroupCallRingRequest,
  processGroupCallRingCancelation,
  cleanExpiredGroupCallRings
} = import_Client.default;
const RINGRTC_HTTP_METHOD_TO_OUR_HTTP_METHOD = /* @__PURE__ */ new Map([
  [import_ringrtc.HttpMethod.Get, "GET"],
  [import_ringrtc.HttpMethod.Put, "PUT"],
  [import_ringrtc.HttpMethod.Post, "POST"],
  [import_ringrtc.HttpMethod.Delete, "DELETE"]
]);
const CLEAN_EXPIRED_GROUP_CALL_RINGS_INTERVAL = 10 * durations.MINUTE;
var GroupCallUpdateMessageState = /* @__PURE__ */ ((GroupCallUpdateMessageState2) => {
  GroupCallUpdateMessageState2[GroupCallUpdateMessageState2["SentNothing"] = 0] = "SentNothing";
  GroupCallUpdateMessageState2[GroupCallUpdateMessageState2["SentJoin"] = 1] = "SentJoin";
  GroupCallUpdateMessageState2[GroupCallUpdateMessageState2["SentLeft"] = 2] = "SentLeft";
  return GroupCallUpdateMessageState2;
})(GroupCallUpdateMessageState || {});
function isScreenSource(source) {
  return source.id.startsWith("screen");
}
function translateSourceName(i18n, source) {
  const { name } = source;
  if (!isScreenSource(source)) {
    return name;
  }
  if (name === "Entire Screen") {
    return i18n("calling__SelectPresentingSourcesModal--entireScreen");
  }
  const match = name.match(/^Screen (\d+)$/);
  if (match) {
    return i18n("calling__SelectPresentingSourcesModal--screen", {
      id: match[1]
    });
  }
  return name;
}
function protoToCallingMessage({
  offer,
  answer,
  iceCandidates,
  legacyHangup,
  busy,
  hangup,
  supportsMultiRing,
  destinationDeviceId,
  opaque
}) {
  return {
    offer: offer ? {
      ...(0, import_dropNull.shallowDropNull)(offer),
      type: (0, import_dropNull.dropNull)(offer.type),
      opaque: offer.opaque ? Buffer.from(offer.opaque) : void 0
    } : void 0,
    answer: answer ? {
      ...(0, import_dropNull.shallowDropNull)(answer),
      opaque: answer.opaque ? Buffer.from(answer.opaque) : void 0
    } : void 0,
    iceCandidates: iceCandidates ? iceCandidates.map((candidate) => {
      return {
        ...(0, import_dropNull.shallowDropNull)(candidate),
        opaque: candidate.opaque ? Buffer.from(candidate.opaque) : void 0
      };
    }) : void 0,
    legacyHangup: legacyHangup ? {
      ...(0, import_dropNull.shallowDropNull)(legacyHangup),
      type: (0, import_dropNull.dropNull)(legacyHangup.type)
    } : void 0,
    busy: (0, import_dropNull.shallowDropNull)(busy),
    hangup: hangup ? {
      ...(0, import_dropNull.shallowDropNull)(hangup),
      type: (0, import_dropNull.dropNull)(hangup.type)
    } : void 0,
    supportsMultiRing: (0, import_dropNull.dropNull)(supportsMultiRing),
    destinationDeviceId: (0, import_dropNull.dropNull)(destinationDeviceId),
    opaque: opaque ? {
      data: opaque.data ? Buffer.from(opaque.data) : void 0
    } : void 0
  };
}
class CallingClass {
  constructor() {
    this.videoCapturer = new import_ringrtc.GumVideoCapturer({
      maxWidth: import_constants.REQUESTED_VIDEO_WIDTH,
      maxHeight: import_constants.REQUESTED_VIDEO_HEIGHT,
      maxFramerate: import_constants.REQUESTED_VIDEO_FRAMERATE
    });
    this.videoRenderer = new import_ringrtc.CanvasVideoRenderer();
    this.callsByConversation = {};
  }
  initialize(uxActions, sfuUrl) {
    this.uxActions = uxActions;
    if (!uxActions) {
      throw new Error("CallingClass.initialize: Invalid uxActions.");
    }
    this.sfuUrl = sfuUrl;
    this.previousAudioDeviceModule = (0, import_audioDeviceModule.parseAudioDeviceModule)(window.storage.get("previousAudioDeviceModule"));
    this.currentAudioDeviceModule = (0, import_audioDeviceModule.getAudioDeviceModule)();
    window.storage.put("previousAudioDeviceModule", this.currentAudioDeviceModule);
    import_ringrtc.RingRTC.setConfig({
      use_new_audio_device_module: this.currentAudioDeviceModule === import_audioDeviceModule.AudioDeviceModule.WindowsAdm2
    });
    import_ringrtc.RingRTC.handleOutgoingSignaling = this.handleOutgoingSignaling.bind(this);
    import_ringrtc.RingRTC.handleIncomingCall = this.handleIncomingCall.bind(this);
    import_ringrtc.RingRTC.handleAutoEndedIncomingCallRequest = this.handleAutoEndedIncomingCallRequest.bind(this);
    import_ringrtc.RingRTC.handleLogMessage = this.handleLogMessage.bind(this);
    import_ringrtc.RingRTC.handleSendHttpRequest = this.handleSendHttpRequest.bind(this);
    import_ringrtc.RingRTC.handleSendCallMessage = this.handleSendCallMessage.bind(this);
    import_ringrtc.RingRTC.handleSendCallMessageToGroup = this.handleSendCallMessageToGroup.bind(this);
    import_ringrtc.RingRTC.handleGroupCallRingUpdate = this.handleGroupCallRingUpdate.bind(this);
    this.attemptToGiveOurUuidToRingRtc();
    window.Whisper.events.on("userChanged", () => {
      this.attemptToGiveOurUuidToRingRtc();
    });
    import_electron.ipcRenderer.on("stop-screen-share", () => {
      uxActions.setPresenting();
    });
    import_electron.ipcRenderer.on("quit", () => {
      for (const conversationId of Object.keys(this.callsByConversation)) {
        this.hangup(conversationId);
      }
    });
    this.cleanExpiredGroupCallRingsAndLoop();
  }
  attemptToGiveOurUuidToRingRtc() {
    const ourUuid = window.textsecure.storage.user.getUuid()?.toString();
    if (!ourUuid) {
      return;
    }
    import_ringrtc.RingRTC.setSelfUuid(Buffer.from((0, import_Crypto.uuidToBytes)(ourUuid)));
  }
  async startCallingLobby({
    conversation,
    hasLocalAudio,
    hasLocalVideo
  }) {
    log.info("CallingClass.startCallingLobby()");
    const callMode = (0, import_conversations.getConversationCallMode)(conversation);
    switch (callMode) {
      case import_Calling.CallMode.None:
        log.error("Conversation does not support calls, new call not allowed.");
        return;
      case import_Calling.CallMode.Direct: {
        const conversationModel = window.ConversationController.get(conversation.id);
        if (!conversationModel || !this.getRemoteUserIdFromConversation(conversationModel)) {
          log.error("Missing remote user identifier, new call not allowed.");
          return;
        }
        break;
      }
      case import_Calling.CallMode.Group:
        break;
      default:
        throw (0, import_missingCaseError.missingCaseError)(callMode);
    }
    if (!this.uxActions) {
      log.error("Missing uxActions, new call not allowed.");
      return;
    }
    if (!this.localDeviceId) {
      log.error("Missing local device identifier, new call not allowed.");
      return;
    }
    const haveMediaPermissions = await this.requestPermissions(hasLocalVideo);
    if (!haveMediaPermissions) {
      log.info("Permissions were denied, new call not allowed.");
      return;
    }
    log.info("CallingClass.startCallingLobby(): Starting lobby");
    await this.startDeviceReselectionTimer();
    const enableLocalCameraIfNecessary = hasLocalVideo ? () => this.enableLocalCamera() : import_lodash.noop;
    switch (callMode) {
      case import_Calling.CallMode.Direct:
        (0, import_assert.assert)(hasLocalAudio, "Expected local audio to be enabled for direct call lobbies");
        enableLocalCameraIfNecessary();
        return {
          callMode: import_Calling.CallMode.Direct,
          hasLocalAudio,
          hasLocalVideo
        };
      case import_Calling.CallMode.Group: {
        if (!conversation.groupId || !conversation.publicParams || !conversation.secretParams) {
          log.error("Conversation is missing required parameters. Cannot connect group call");
          return;
        }
        const groupCall = this.connectGroupCall(conversation.id, {
          groupId: conversation.groupId,
          publicParams: conversation.publicParams,
          secretParams: conversation.secretParams
        });
        groupCall.setOutgoingAudioMuted(!hasLocalAudio);
        groupCall.setOutgoingVideoMuted(!hasLocalVideo);
        enableLocalCameraIfNecessary();
        return {
          callMode: import_Calling.CallMode.Group,
          ...this.formatGroupCallForRedux(groupCall)
        };
      }
      default:
        throw (0, import_missingCaseError.missingCaseError)(callMode);
    }
  }
  stopCallingLobby(conversationId) {
    this.disableLocalVideo();
    this.stopDeviceReselectionTimer();
    this.lastMediaDeviceSettings = void 0;
    if (conversationId) {
      this.getGroupCall(conversationId)?.disconnect();
    }
  }
  async startOutgoingDirectCall(conversationId, hasLocalAudio, hasLocalVideo) {
    log.info("CallingClass.startOutgoingDirectCall()");
    if (!this.uxActions) {
      throw new Error("Redux actions not available");
    }
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      log.error("Could not find conversation, cannot start call");
      this.stopCallingLobby();
      return;
    }
    const remoteUserId = this.getRemoteUserIdFromConversation(conversation);
    if (!remoteUserId || !this.localDeviceId) {
      log.error("Missing identifier, new call not allowed.");
      this.stopCallingLobby();
      return;
    }
    const haveMediaPermissions = await this.requestPermissions(hasLocalVideo);
    if (!haveMediaPermissions) {
      log.info("Permissions were denied, new call not allowed.");
      this.stopCallingLobby();
      return;
    }
    log.info("CallingClass.startOutgoingDirectCall(): Getting call settings");
    const callSettings = await this.getCallSettings(conversation);
    if (import_ringrtc.RingRTC.call && import_ringrtc.RingRTC.call.state !== import_ringrtc.CallState.Ended) {
      log.info("Call already in progress, new call not allowed.");
      this.stopCallingLobby();
      return;
    }
    log.info("CallingClass.startOutgoingDirectCall(): Starting in RingRTC");
    const call = import_ringrtc.RingRTC.startOutgoingCall(remoteUserId, hasLocalVideo, this.localDeviceId, callSettings);
    import_ringrtc.RingRTC.setOutgoingAudio(call.callId, hasLocalAudio);
    import_ringrtc.RingRTC.setVideoCapturer(call.callId, this.videoCapturer);
    import_ringrtc.RingRTC.setVideoRenderer(call.callId, this.videoRenderer);
    this.attachToCall(conversation, call);
    this.uxActions.outgoingCall({
      conversationId: conversation.id,
      hasLocalAudio,
      hasLocalVideo
    });
    await this.startDeviceReselectionTimer();
  }
  getDirectCall(conversationId) {
    const call = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    return call instanceof import_ringrtc.Call ? call : void 0;
  }
  getGroupCall(conversationId) {
    const call = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    return call instanceof import_ringrtc.GroupCall ? call : void 0;
  }
  getGroupCallMembers(conversationId) {
    return (0, import_groups.getMembershipList)(conversationId).map((member) => new import_ringrtc.GroupMemberInfo(Buffer.from((0, import_Crypto.uuidToBytes)(member.uuid)), Buffer.from(member.uuidCiphertext)));
  }
  async peekGroupCall(conversationId) {
    const statefulPeekInfo = this.getGroupCall(conversationId)?.getPeekInfo();
    if (statefulPeekInfo) {
      return statefulPeekInfo;
    }
    if (!this.sfuUrl) {
      throw new Error("Missing SFU URL; not peeking group call");
    }
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      throw new Error("Missing conversation; not peeking group call");
    }
    const publicParams = conversation.get("publicParams");
    const secretParams = conversation.get("secretParams");
    if (!publicParams || !secretParams) {
      throw new Error("Conversation is missing required parameters. Cannot peek group call");
    }
    const proof = await (0, import_groups.fetchMembershipProof)({ publicParams, secretParams });
    if (!proof) {
      throw new Error("No membership proof. Cannot peek group call");
    }
    const membershipProof = Bytes.fromString(proof);
    return import_ringrtc.RingRTC.peekGroupCall(this.sfuUrl, Buffer.from(membershipProof), this.getGroupCallMembers(conversationId));
  }
  connectGroupCall(conversationId, {
    groupId,
    publicParams,
    secretParams
  }) {
    const existing = this.getGroupCall(conversationId);
    if (existing) {
      const isExistingCallNotConnected = existing.getLocalDeviceState().connectionState === import_ringrtc.ConnectionState.NotConnected;
      if (isExistingCallNotConnected) {
        existing.connect();
      }
      return existing;
    }
    if (!this.sfuUrl) {
      throw new Error("Missing SFU URL; not connecting group call");
    }
    const groupIdBuffer = Buffer.from(Bytes.fromBase64(groupId));
    let updateMessageState = 0 /* SentNothing */;
    let isRequestingMembershipProof = false;
    const outerGroupCall = import_ringrtc.RingRTC.getGroupCall(groupIdBuffer, this.sfuUrl, Buffer.alloc(0), import_constants.AUDIO_LEVEL_INTERVAL_MS, {
      onLocalDeviceStateChanged: (groupCall) => {
        const localDeviceState = groupCall.getLocalDeviceState();
        const { eraId } = groupCall.getPeekInfo() || {};
        if (localDeviceState.connectionState === import_ringrtc.ConnectionState.NotConnected) {
          this.disableLocalVideo();
          delete this.callsByConversation[conversationId];
          if (updateMessageState === 1 /* SentJoin */ && eraId) {
            updateMessageState = 2 /* SentLeft */;
            this.sendGroupCallUpdateMessage(conversationId, eraId);
          }
        } else {
          this.callsByConversation[conversationId] = groupCall;
          if (localDeviceState.videoMuted) {
            this.disableLocalVideo();
          } else {
            this.videoCapturer.enableCaptureAndSend(groupCall);
          }
          if (updateMessageState === 0 /* SentNothing */ && localDeviceState.joinState === import_ringrtc.JoinState.Joined && eraId) {
            updateMessageState = 1 /* SentJoin */;
            this.sendGroupCallUpdateMessage(conversationId, eraId);
          }
        }
        this.syncGroupCallToRedux(conversationId, groupCall);
      },
      onRemoteDeviceStatesChanged: (groupCall) => {
        this.syncGroupCallToRedux(conversationId, groupCall);
      },
      onAudioLevels: (groupCall) => {
        const remoteDeviceStates = groupCall.getRemoteDeviceStates();
        if (!remoteDeviceStates) {
          return;
        }
        const localAudioLevel = groupCall.getLocalDeviceState().audioLevel;
        this.uxActions?.groupCallAudioLevelsChange({
          conversationId,
          localAudioLevel,
          remoteDeviceStates
        });
      },
      onPeekChanged: (groupCall) => {
        const localDeviceState = groupCall.getLocalDeviceState();
        const { eraId } = groupCall.getPeekInfo() || {};
        if (updateMessageState === 0 /* SentNothing */ && localDeviceState.connectionState !== import_ringrtc.ConnectionState.NotConnected && localDeviceState.joinState === import_ringrtc.JoinState.Joined && eraId) {
          updateMessageState = 1 /* SentJoin */;
          this.sendGroupCallUpdateMessage(conversationId, eraId);
        }
        this.updateCallHistoryForGroupCall(conversationId, groupCall.getPeekInfo());
        this.syncGroupCallToRedux(conversationId, groupCall);
      },
      async requestMembershipProof(groupCall) {
        if (isRequestingMembershipProof) {
          return;
        }
        isRequestingMembershipProof = true;
        try {
          const proof = await (0, import_groups.fetchMembershipProof)({
            publicParams,
            secretParams
          });
          if (proof) {
            groupCall.setMembershipProof(Buffer.from(Bytes.fromString(proof)));
          }
        } catch (err) {
          log.error("Failed to fetch membership proof", err);
        } finally {
          isRequestingMembershipProof = false;
        }
      },
      requestGroupMembers: (groupCall) => {
        groupCall.setGroupMembers(this.getGroupCallMembers(conversationId));
      },
      onEnded: import_lodash.noop
    });
    if (!outerGroupCall) {
      throw new Error("Failed to get a group call instance; cannot start call");
    }
    outerGroupCall.connect();
    this.syncGroupCallToRedux(conversationId, outerGroupCall);
    return outerGroupCall;
  }
  async joinGroupCall(conversationId, hasLocalAudio, hasLocalVideo, shouldRing) {
    const conversation = window.ConversationController.get(conversationId)?.format();
    if (!conversation) {
      log.error("Missing conversation; not joining group call");
      return;
    }
    if (!conversation.groupId || !conversation.publicParams || !conversation.secretParams) {
      log.error("Conversation is missing required parameters. Cannot join group call");
      return;
    }
    await this.startDeviceReselectionTimer();
    const groupCall = this.connectGroupCall(conversationId, {
      groupId: conversation.groupId,
      publicParams: conversation.publicParams,
      secretParams: conversation.secretParams
    });
    groupCall.setOutgoingAudioMuted(!hasLocalAudio);
    groupCall.setOutgoingVideoMuted(!hasLocalVideo);
    this.videoCapturer.enableCaptureAndSend(groupCall);
    if (shouldRing) {
      groupCall.ringAll();
    }
    groupCall.join();
  }
  getCallIdForConversation(conversationId) {
    return this.getDirectCall(conversationId)?.callId;
  }
  setGroupCallVideoRequest(conversationId, resolutions) {
    this.getGroupCall(conversationId)?.requestVideo(resolutions);
  }
  groupMembersChanged(conversationId) {
    const groupCall = this.getGroupCall(conversationId);
    if (!groupCall) {
      return;
    }
    groupCall.setGroupMembers(this.getGroupCallMembers(conversationId));
  }
  convertRingRtcConnectionState(connectionState) {
    switch (connectionState) {
      case import_ringrtc.ConnectionState.NotConnected:
        return import_Calling.GroupCallConnectionState.NotConnected;
      case import_ringrtc.ConnectionState.Connecting:
        return import_Calling.GroupCallConnectionState.Connecting;
      case import_ringrtc.ConnectionState.Connected:
        return import_Calling.GroupCallConnectionState.Connected;
      case import_ringrtc.ConnectionState.Reconnecting:
        return import_Calling.GroupCallConnectionState.Reconnecting;
      default:
        throw (0, import_missingCaseError.missingCaseError)(connectionState);
    }
  }
  convertRingRtcJoinState(joinState) {
    switch (joinState) {
      case import_ringrtc.JoinState.NotJoined:
        return import_Calling.GroupCallJoinState.NotJoined;
      case import_ringrtc.JoinState.Joining:
        return import_Calling.GroupCallJoinState.Joining;
      case import_ringrtc.JoinState.Joined:
        return import_Calling.GroupCallJoinState.Joined;
      default:
        throw (0, import_missingCaseError.missingCaseError)(joinState);
    }
  }
  formatGroupCallPeekInfoForRedux(peekInfo) {
    return {
      uuids: peekInfo.devices.map((peekDeviceInfo) => {
        if (peekDeviceInfo.userId) {
          const uuid = (0, import_Crypto.bytesToUuid)(peekDeviceInfo.userId);
          if (uuid) {
            return uuid;
          }
          log.error("Calling.formatGroupCallPeekInfoForRedux: could not convert peek UUID Uint8Array to string; using fallback UUID");
        } else {
          log.error("Calling.formatGroupCallPeekInfoForRedux: device had no user ID; using fallback UUID");
        }
        return "00000000-0000-4000-8000-000000000000";
      }),
      creatorUuid: peekInfo.creator && (0, import_Crypto.bytesToUuid)(peekInfo.creator),
      eraId: peekInfo.eraId,
      maxDevices: peekInfo.maxDevices ?? Infinity,
      deviceCount: peekInfo.deviceCount
    };
  }
  formatGroupCallForRedux(groupCall) {
    const localDeviceState = groupCall.getLocalDeviceState();
    const peekInfo = groupCall.getPeekInfo();
    const remoteDeviceStates = (0, import_lodash.uniqBy)(groupCall.getRemoteDeviceStates() || [], (remoteDeviceState) => remoteDeviceState.demuxId);
    const joinState = localDeviceState.connectionState === import_ringrtc.ConnectionState.NotConnected ? import_Calling.GroupCallJoinState.NotJoined : this.convertRingRtcJoinState(localDeviceState.joinState);
    return {
      connectionState: this.convertRingRtcConnectionState(localDeviceState.connectionState),
      joinState,
      hasLocalAudio: !localDeviceState.audioMuted,
      hasLocalVideo: !localDeviceState.videoMuted,
      peekInfo: peekInfo ? this.formatGroupCallPeekInfoForRedux(peekInfo) : void 0,
      remoteParticipants: remoteDeviceStates.map((remoteDeviceState) => {
        let uuid = (0, import_Crypto.bytesToUuid)(remoteDeviceState.userId);
        if (!uuid) {
          log.error("Calling.formatGroupCallForRedux: could not convert remote participant UUID Uint8Array to string; using fallback UUID");
          uuid = "00000000-0000-4000-8000-000000000000";
        }
        return {
          uuid,
          demuxId: remoteDeviceState.demuxId,
          hasRemoteAudio: !remoteDeviceState.audioMuted,
          hasRemoteVideo: !remoteDeviceState.videoMuted,
          presenting: Boolean(remoteDeviceState.presenting),
          sharingScreen: Boolean(remoteDeviceState.sharingScreen),
          speakerTime: (0, import_normalizeGroupCallTimestamp.normalizeGroupCallTimestamp)(remoteDeviceState.speakerTime),
          videoAspectRatio: remoteDeviceState.videoAspectRatio || (remoteDeviceState.videoMuted ? 1 : 4 / 3)
        };
      })
    };
  }
  getGroupCallVideoFrameSource(conversationId, demuxId) {
    const groupCall = this.getGroupCall(conversationId);
    if (!groupCall) {
      throw new Error("Could not find matching call");
    }
    return groupCall.getVideoSource(demuxId);
  }
  resendGroupCallMediaKeys(conversationId) {
    const groupCall = this.getGroupCall(conversationId);
    if (!groupCall) {
      throw new Error("Could not find matching call");
    }
    groupCall.resendMediaKeys();
  }
  syncGroupCallToRedux(conversationId, groupCall) {
    this.uxActions?.groupCallStateChange({
      conversationId,
      ...this.formatGroupCallForRedux(groupCall)
    });
  }
  async sendGroupCallUpdateMessage(conversationId, eraId) {
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      log.error("Unable to send group call update message for non-existent conversation");
      return;
    }
    const groupV2 = conversation.getGroupV2Info();
    const sendOptions = await (0, import_getSendOptions.getSendOptions)(conversation.attributes);
    if (!groupV2) {
      log.error("Unable to send group call update message for conversation that lacks groupV2 info");
      return;
    }
    const timestamp = Date.now();
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    (0, import_wrapWithSyncMessageSend.wrapWithSyncMessageSend)({
      conversation,
      logId: `sendToGroup/groupCallUpdate/${conversationId}-${eraId}`,
      messageIds: [],
      send: () => conversation.queueJob("sendGroupCallUpdateMessage", () => window.Signal.Util.sendToGroup({
        contentHint: ContentHint.DEFAULT,
        groupSendOptions: {
          groupCallUpdate: { eraId },
          groupV2,
          timestamp
        },
        messageId: void 0,
        sendOptions,
        sendTarget: conversation.toSenderKeyTarget(),
        sendType: "callingMessage"
      })),
      sendType: "callingMessage",
      timestamp
    }).catch((err) => {
      log.error("Failed to send group call update:", err && err.stack ? err.stack : err);
    });
  }
  async acceptDirectCall(conversationId, asVideoCall) {
    log.info("CallingClass.acceptDirectCall()");
    const callId = this.getCallIdForConversation(conversationId);
    if (!callId) {
      log.warn("Trying to accept a non-existent call");
      return;
    }
    const haveMediaPermissions = await this.requestPermissions(asVideoCall);
    if (haveMediaPermissions) {
      await this.startDeviceReselectionTimer();
      import_ringrtc.RingRTC.setVideoCapturer(callId, this.videoCapturer);
      import_ringrtc.RingRTC.setVideoRenderer(callId, this.videoRenderer);
      import_ringrtc.RingRTC.accept(callId, asVideoCall);
    } else {
      log.info("Permissions were denied, call not allowed, hanging up.");
      import_ringrtc.RingRTC.hangup(callId);
    }
  }
  declineDirectCall(conversationId) {
    log.info("CallingClass.declineDirectCall()");
    const callId = this.getCallIdForConversation(conversationId);
    if (!callId) {
      log.warn("declineDirectCall: Trying to decline a non-existent call");
      return;
    }
    import_ringrtc.RingRTC.decline(callId);
  }
  declineGroupCall(conversationId, ringId) {
    log.info("CallingClass.declineGroupCall()");
    const groupId = window.ConversationController.get(conversationId)?.get("groupId");
    if (!groupId) {
      log.error("declineGroupCall: could not find the group ID for that conversation");
      return;
    }
    const groupIdBuffer = Buffer.from(Bytes.fromBase64(groupId));
    import_ringrtc.RingRTC.cancelGroupRing(groupIdBuffer, ringId, import_ringrtc.RingCancelReason.DeclinedByUser);
  }
  hangup(conversationId) {
    log.info("CallingClass.hangup()");
    const specificCall = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    if (!specificCall) {
      log.error(`hangup: Trying to hang up a non-existent call for conversation ${conversationId}`);
    }
    import_electron.ipcRenderer.send("close-screen-share-controller");
    const entries = Object.entries(this.callsByConversation);
    log.info(`hangup: ${entries.length} call(s) to hang up...`);
    entries.forEach(([callConversationId, call]) => {
      log.info(`hangup: Hanging up conversation ${callConversationId}`);
      if (call instanceof import_ringrtc.Call) {
        import_ringrtc.RingRTC.hangup(call.callId);
      } else if (call instanceof import_ringrtc.GroupCall) {
        call.setOutgoingAudioMuted(true);
        call.setOutgoingVideoMuted(true);
        call.disconnect();
      } else {
        throw (0, import_missingCaseError.missingCaseError)(call);
      }
    });
    log.info("hangup: Done.");
  }
  setOutgoingAudio(conversationId, enabled) {
    const call = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    if (!call) {
      log.warn("Trying to set outgoing audio for a non-existent call");
      return;
    }
    if (call instanceof import_ringrtc.Call) {
      import_ringrtc.RingRTC.setOutgoingAudio(call.callId, enabled);
    } else if (call instanceof import_ringrtc.GroupCall) {
      call.setOutgoingAudioMuted(!enabled);
    } else {
      throw (0, import_missingCaseError.missingCaseError)(call);
    }
  }
  setOutgoingVideo(conversationId, enabled) {
    const call = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    if (!call) {
      log.warn("Trying to set outgoing video for a non-existent call");
      return;
    }
    if (call instanceof import_ringrtc.Call) {
      import_ringrtc.RingRTC.setOutgoingVideo(call.callId, enabled);
    } else if (call instanceof import_ringrtc.GroupCall) {
      call.setOutgoingVideoMuted(!enabled);
    } else {
      throw (0, import_missingCaseError.missingCaseError)(call);
    }
  }
  setOutgoingVideoIsScreenShare(call, enabled) {
    if (call instanceof import_ringrtc.Call) {
      import_ringrtc.RingRTC.setOutgoingVideoIsScreenShare(call.callId, enabled);
    } else if (call instanceof import_ringrtc.GroupCall) {
      call.setOutgoingVideoIsScreenShare(enabled);
      call.setPresenting(enabled);
    } else {
      throw (0, import_missingCaseError.missingCaseError)(call);
    }
  }
  async getPresentingSources() {
    const sources = await import_electron.ipcRenderer.invoke("getScreenCaptureSources");
    const presentableSources = [];
    sources.forEach((source) => {
      if (source.thumbnail.isEmpty()) {
        return;
      }
      presentableSources.push({
        appIcon: source.appIcon && !source.appIcon.isEmpty() ? source.appIcon.toDataURL() : void 0,
        id: source.id,
        name: translateSourceName(window.i18n, source),
        isScreen: isScreenSource(source),
        thumbnail: source.thumbnail.toDataURL()
      });
    });
    return presentableSources;
  }
  setPresenting(conversationId, hasLocalVideo, source) {
    const call = (0, import_getOwn.getOwn)(this.callsByConversation, conversationId);
    if (!call) {
      log.warn("Trying to set presenting for a non-existent call");
      return;
    }
    this.videoCapturer.disable();
    if (source) {
      this.hadLocalVideoBeforePresenting = hasLocalVideo;
      this.videoCapturer.enableCaptureAndSend(call, {
        maxFramerate: 5,
        maxHeight: 1080,
        maxWidth: 1920,
        screenShareSourceId: source.id
      });
      this.setOutgoingVideo(conversationId, true);
    } else {
      this.setOutgoingVideo(conversationId, this.hadLocalVideoBeforePresenting ?? hasLocalVideo);
      this.hadLocalVideoBeforePresenting = void 0;
    }
    const isPresenting = Boolean(source);
    this.setOutgoingVideoIsScreenShare(call, isPresenting);
    if (source) {
      import_electron.ipcRenderer.send("show-screen-share", source.name);
      import_notifications.notificationService.notify({
        icon: "images/icons/v2/video-solid-24.svg",
        message: window.i18n("calling__presenting--notification-body"),
        onNotificationClick: () => {
          if (this.uxActions) {
            this.uxActions.setPresenting();
          }
        },
        silent: true,
        title: window.i18n("calling__presenting--notification-title")
      });
    } else {
      import_electron.ipcRenderer.send("close-screen-share-controller");
    }
  }
  async startDeviceReselectionTimer() {
    await this.pollForMediaDevices();
    if (!this.deviceReselectionTimer) {
      this.deviceReselectionTimer = setInterval(async () => {
        await this.pollForMediaDevices();
      }, 3e3);
    }
  }
  stopDeviceReselectionTimer() {
    (0, import_clearTimeoutIfNecessary.clearTimeoutIfNecessary)(this.deviceReselectionTimer);
    this.deviceReselectionTimer = void 0;
  }
  mediaDeviceSettingsEqual(a, b) {
    if (!a && !b) {
      return true;
    }
    if (!a || !b) {
      return false;
    }
    if (a.availableCameras.length !== b.availableCameras.length || a.availableMicrophones.length !== b.availableMicrophones.length || a.availableSpeakers.length !== b.availableSpeakers.length) {
      return false;
    }
    for (let i = 0; i < a.availableCameras.length; i += 1) {
      if (a.availableCameras[i].deviceId !== b.availableCameras[i].deviceId || a.availableCameras[i].groupId !== b.availableCameras[i].groupId || a.availableCameras[i].label !== b.availableCameras[i].label) {
        return false;
      }
    }
    for (let i = 0; i < a.availableMicrophones.length; i += 1) {
      if (a.availableMicrophones[i].name !== b.availableMicrophones[i].name || a.availableMicrophones[i].uniqueId !== b.availableMicrophones[i].uniqueId) {
        return false;
      }
    }
    for (let i = 0; i < a.availableSpeakers.length; i += 1) {
      if (a.availableSpeakers[i].name !== b.availableSpeakers[i].name || a.availableSpeakers[i].uniqueId !== b.availableSpeakers[i].uniqueId) {
        return false;
      }
    }
    if (a.selectedCamera && !b.selectedCamera || !a.selectedCamera && b.selectedCamera || a.selectedMicrophone && !b.selectedMicrophone || !a.selectedMicrophone && b.selectedMicrophone || a.selectedSpeaker && !b.selectedSpeaker || !a.selectedSpeaker && b.selectedSpeaker) {
      return false;
    }
    if (a.selectedCamera && b.selectedCamera && a.selectedCamera !== b.selectedCamera) {
      return false;
    }
    if (a.selectedMicrophone && b.selectedMicrophone && a.selectedMicrophone.index !== b.selectedMicrophone.index) {
      return false;
    }
    if (a.selectedSpeaker && b.selectedSpeaker && a.selectedSpeaker.index !== b.selectedSpeaker.index) {
      return false;
    }
    return true;
  }
  async pollForMediaDevices() {
    const newSettings = await this.getMediaDeviceSettings();
    if (!this.mediaDeviceSettingsEqual(this.lastMediaDeviceSettings, newSettings)) {
      log.info("MediaDevice: available devices changed (from->to)", this.lastMediaDeviceSettings, newSettings);
      await this.selectPreferredDevices(newSettings);
      this.lastMediaDeviceSettings = newSettings;
      this.uxActions?.refreshIODevices(newSettings);
    }
  }
  async getAvailableIODevices() {
    const availableCameras = await this.videoCapturer.enumerateDevices();
    const availableMicrophones = import_ringrtc.RingRTC.getAudioInputs();
    const availableSpeakers = import_ringrtc.RingRTC.getAudioOutputs();
    return {
      availableCameras,
      availableMicrophones,
      availableSpeakers
    };
  }
  async getMediaDeviceSettings() {
    const { previousAudioDeviceModule, currentAudioDeviceModule } = this;
    if (!previousAudioDeviceModule || !currentAudioDeviceModule) {
      throw new Error("Calling#getMediaDeviceSettings cannot be called before audio device settings are set");
    }
    const { availableCameras, availableMicrophones, availableSpeakers } = await this.getAvailableIODevices();
    const preferredMicrophone = window.Events.getPreferredAudioInputDevice();
    const selectedMicIndex = (0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
      available: availableMicrophones,
      preferred: preferredMicrophone,
      previousAudioDeviceModule,
      currentAudioDeviceModule
    });
    const selectedMicrophone = selectedMicIndex !== void 0 ? availableMicrophones[selectedMicIndex] : void 0;
    const preferredSpeaker = window.Events.getPreferredAudioOutputDevice();
    const selectedSpeakerIndex = (0, import_findBestMatchingDevice.findBestMatchingAudioDeviceIndex)({
      available: availableSpeakers,
      preferred: preferredSpeaker,
      previousAudioDeviceModule,
      currentAudioDeviceModule
    });
    const selectedSpeaker = selectedSpeakerIndex !== void 0 ? availableSpeakers[selectedSpeakerIndex] : void 0;
    const preferredCamera = window.Events.getPreferredVideoInputDevice();
    const selectedCamera = (0, import_findBestMatchingDevice.findBestMatchingCameraId)(availableCameras, preferredCamera);
    return {
      availableMicrophones,
      availableSpeakers,
      selectedMicrophone,
      selectedSpeaker,
      availableCameras,
      selectedCamera
    };
  }
  setPreferredMicrophone(device) {
    log.info("MediaDevice: setPreferredMicrophone", device);
    window.Events.setPreferredAudioInputDevice(device);
    import_ringrtc.RingRTC.setAudioInput(device.index);
  }
  setPreferredSpeaker(device) {
    log.info("MediaDevice: setPreferredSpeaker", device);
    window.Events.setPreferredAudioOutputDevice(device);
    import_ringrtc.RingRTC.setAudioOutput(device.index);
  }
  enableLocalCamera() {
    this.videoCapturer.enableCapture();
  }
  disableLocalVideo() {
    this.videoCapturer.disable();
  }
  async setPreferredCamera(device) {
    log.info("MediaDevice: setPreferredCamera", device);
    window.Events.setPreferredVideoInputDevice(device);
    await this.videoCapturer.setPreferredDevice(device);
  }
  async handleCallingMessage(envelope, callingMessage) {
    log.info("CallingClass.handleCallingMessage()");
    const enableIncomingCalls = window.Events.getIncomingCallNotification();
    if (callingMessage.offer && !enableIncomingCalls) {
      log.info("Incoming calls are disabled, ignoring call offer.");
      return;
    }
    const remoteUserId = envelope.sourceUuid;
    const remoteDeviceId = this.parseDeviceId(envelope.sourceDevice);
    if (!remoteUserId || !remoteDeviceId || !this.localDeviceId) {
      log.error("Missing identifier, ignoring call message.");
      return;
    }
    const { storage } = window.textsecure;
    const senderIdentityRecord = await storage.protocol.getOrMigrateIdentityRecord(new import_UUID.UUID(remoteUserId));
    if (!senderIdentityRecord) {
      log.error("Missing sender identity record; ignoring call message.");
      return;
    }
    const senderIdentityKey = senderIdentityRecord.publicKey.slice(1);
    const ourUuid = storage.user.getCheckedUuid();
    const receiverIdentityRecord = storage.protocol.getIdentityRecord(ourUuid);
    if (!receiverIdentityRecord) {
      log.error("Missing receiver identity record; ignoring call message.");
      return;
    }
    const receiverIdentityKey = receiverIdentityRecord.publicKey.slice(1);
    const conversation = window.ConversationController.get(remoteUserId);
    if (!conversation) {
      log.error("Missing conversation; ignoring call message.");
      return;
    }
    if (callingMessage.offer && !conversation.getAccepted()) {
      log.info("Conversation was not approved by user; rejecting call message.");
      const hangup = new import_ringrtc.HangupMessage();
      hangup.callId = callingMessage.offer.callId;
      hangup.deviceId = remoteDeviceId;
      hangup.type = import_ringrtc.HangupType.NeedPermission;
      const message = new import_ringrtc.CallingMessage();
      message.legacyHangup = hangup;
      await this.handleOutgoingSignaling(remoteUserId, message);
      const ProtoOfferType = import_protobuf.SignalService.CallingMessage.Offer.Type;
      this.addCallHistoryForFailedIncomingCall(conversation, callingMessage.offer.type === ProtoOfferType.OFFER_VIDEO_CALL, envelope.timestamp);
      return;
    }
    const sourceUuid = envelope.sourceUuid ? (0, import_Crypto.uuidToBytes)(envelope.sourceUuid) : null;
    const messageAgeSec = envelope.messageAgeSec ? envelope.messageAgeSec : 0;
    log.info("CallingClass.handleCallingMessage(): Handling in RingRTC");
    import_ringrtc.RingRTC.handleCallingMessage(remoteUserId, sourceUuid ? Buffer.from(sourceUuid) : null, remoteDeviceId, this.localDeviceId, messageAgeSec, envelope.receivedAtCounter, protoToCallingMessage(callingMessage), Buffer.from(senderIdentityKey), Buffer.from(receiverIdentityKey));
  }
  async selectPreferredDevices(settings) {
    if (!this.lastMediaDeviceSettings && settings.selectedCamera || this.lastMediaDeviceSettings && settings.selectedCamera && this.lastMediaDeviceSettings.selectedCamera !== settings.selectedCamera) {
      log.info("MediaDevice: selecting camera", settings.selectedCamera);
      await this.videoCapturer.setPreferredDevice(settings.selectedCamera);
    }
    if (settings.selectedMicrophone) {
      log.info("MediaDevice: selecting microphone", settings.selectedMicrophone);
      import_ringrtc.RingRTC.setAudioInput(settings.selectedMicrophone.index);
    }
    if (settings.selectedSpeaker) {
      log.info("MediaDevice: selecting speaker", settings.selectedSpeaker);
      import_ringrtc.RingRTC.setAudioOutput(settings.selectedSpeaker.index);
    }
  }
  async requestCameraPermissions() {
    const cameraPermission = await window.getMediaCameraPermissions();
    if (!cameraPermission) {
      await window.showPermissionsPopup(true, true);
      return window.getMediaCameraPermissions();
    }
    return true;
  }
  async requestPermissions(isVideoCall) {
    const microphonePermission = await (0, import_requestMicrophonePermissions.requestMicrophonePermissions)(true);
    if (microphonePermission) {
      if (isVideoCall) {
        return this.requestCameraPermissions();
      }
      return true;
    }
    return false;
  }
  async handleSendCallMessage(recipient, data, urgency) {
    const userId = (0, import_Crypto.bytesToUuid)(recipient);
    if (!userId) {
      log.error("handleSendCallMessage(): bad recipient UUID");
      return false;
    }
    const message = new import_ringrtc.CallingMessage();
    message.opaque = new import_ringrtc.OpaqueMessage();
    message.opaque.data = Buffer.from(data);
    return this.handleOutgoingSignaling(userId, message, urgency);
  }
  async handleSendCallMessageToGroup(groupIdBytes, data, urgency) {
    const groupId = groupIdBytes.toString("base64");
    const conversation = window.ConversationController.get(groupId);
    if (!conversation) {
      log.error("handleSendCallMessageToGroup(): could not find conversation");
      return;
    }
    const timestamp = Date.now();
    const callingMessage = new import_ringrtc.CallingMessage();
    callingMessage.opaque = new import_ringrtc.OpaqueMessage();
    callingMessage.opaque.data = data;
    const contentMessage = new import_protobuf.SignalService.Content();
    contentMessage.callingMessage = (0, import_callingMessageToProto.callingMessageToProto)(callingMessage, urgency);
    const { ContentHint } = import_protobuf.SignalService.UnidentifiedSenderMessage.Message;
    await conversation.queueJob("handleSendCallMessageToGroup", async () => (0, import_handleMessageSend.handleMessageSend)(window.Signal.Util.sendContentMessageToGroup({
      contentHint: ContentHint.DEFAULT,
      contentMessage,
      isPartialSend: false,
      messageId: void 0,
      recipients: conversation.getRecipients(),
      sendOptions: await (0, import_getSendOptions.getSendOptions)(conversation.attributes),
      sendTarget: conversation.toSenderKeyTarget(),
      sendType: "callingMessage",
      timestamp
    }), { messageIds: [], sendType: "callingMessage" }));
  }
  async handleGroupCallRingUpdate(groupIdBytes, ringId, ringerBytes, update) {
    log.info(`handleGroupCallRingUpdate(): got ring update ${update}`);
    const groupId = groupIdBytes.toString("base64");
    const ringerUuid = (0, import_Crypto.bytesToUuid)(ringerBytes);
    if (!ringerUuid) {
      log.error("handleGroupCallRingUpdate(): ringerUuid was invalid");
      return;
    }
    const conversation = window.ConversationController.get(groupId);
    if (!conversation) {
      log.error("handleGroupCallRingUpdate(): could not find conversation");
      return;
    }
    const conversationId = conversation.id;
    let shouldRing = false;
    if (update === import_ringrtc.RingUpdate.Requested) {
      const processResult = await processGroupCallRingRequest(ringId);
      switch (processResult) {
        case import_Calling.ProcessGroupCallRingRequestResult.ShouldRing:
          shouldRing = true;
          break;
        case import_Calling.ProcessGroupCallRingRequestResult.RingWasPreviouslyCanceled:
          import_ringrtc.RingRTC.cancelGroupRing(groupIdBytes, ringId, null);
          break;
        case import_Calling.ProcessGroupCallRingRequestResult.ThereIsAnotherActiveRing:
          import_ringrtc.RingRTC.cancelGroupRing(groupIdBytes, ringId, import_ringrtc.RingCancelReason.Busy);
          break;
        default:
          throw (0, import_missingCaseError.missingCaseError)(processResult);
      }
    } else {
      await processGroupCallRingCancelation(ringId);
    }
    if (shouldRing) {
      log.info("handleGroupCallRingUpdate: ringing");
      this.uxActions?.receiveIncomingGroupCall({
        conversationId,
        ringId,
        ringerUuid
      });
    } else {
      log.info("handleGroupCallRingUpdate: canceling any existing ring");
      this.uxActions?.cancelIncomingGroupCallRing({
        conversationId,
        ringId
      });
    }
  }
  async handleOutgoingSignaling(remoteUserId, message, urgency) {
    const conversation = window.ConversationController.get(remoteUserId);
    const sendOptions = conversation ? await (0, import_getSendOptions.getSendOptions)(conversation.attributes) : void 0;
    if (!window.textsecure.messaging) {
      log.warn("handleOutgoingSignaling() returning false; offline");
      return false;
    }
    try {
      const result = await (0, import_handleMessageSend.handleMessageSend)(window.textsecure.messaging.sendCallingMessage(remoteUserId, (0, import_callingMessageToProto.callingMessageToProto)(message, urgency), sendOptions), { messageIds: [], sendType: "callingMessage" });
      if (result && result.errors && result.errors.length) {
        throw result.errors[0];
      }
      log.info("handleOutgoingSignaling() completed successfully");
      return true;
    } catch (err) {
      if (err && err.errors && err.errors.length > 0) {
        log.error(`handleOutgoingSignaling() failed: ${err.errors[0].reason}`);
      } else {
        log.error("handleOutgoingSignaling() failed");
      }
      return false;
    }
  }
  async handleIncomingCall(call) {
    log.info("CallingClass.handleIncomingCall()");
    if (!this.uxActions || !this.localDeviceId) {
      log.error("Missing required objects, ignoring incoming call.");
      return null;
    }
    const conversation = window.ConversationController.get(call.remoteUserId);
    if (!conversation) {
      log.error("Missing conversation, ignoring incoming call.");
      return null;
    }
    try {
      const verifiedEnum = await conversation.safeGetVerified();
      if (verifiedEnum === window.textsecure.storage.protocol.VerifiedStatus.UNVERIFIED) {
        log.info(`Peer is not trusted, ignoring incoming call for conversation: ${conversation.idForLogging()}`);
        this.addCallHistoryForFailedIncomingCall(conversation, call.isVideoCall, Date.now());
        return null;
      }
      this.attachToCall(conversation, call);
      this.uxActions.receiveIncomingDirectCall({
        conversationId: conversation.id,
        isVideoCall: call.isVideoCall
      });
      log.info("CallingClass.handleIncomingCall(): Proceeding");
      return await this.getCallSettings(conversation);
    } catch (err) {
      log.error(`Ignoring incoming call: ${err.stack}`);
      this.addCallHistoryForFailedIncomingCall(conversation, call.isVideoCall, Date.now());
      return null;
    }
  }
  handleAutoEndedIncomingCallRequest(remoteUserId, reason, ageInSeconds, wasVideoCall, receivedAtCounter) {
    const conversation = window.ConversationController.get(remoteUserId);
    if (!conversation) {
      return;
    }
    const ageInMilliseconds = (0, import_isNormalNumber.isNormalNumber)(ageInSeconds) && ageInSeconds >= 0 ? ageInSeconds * durations.SECOND : 0;
    const endedTime = Date.now() - ageInMilliseconds;
    this.addCallHistoryForAutoEndedIncomingCall(conversation, reason, endedTime, wasVideoCall, receivedAtCounter);
  }
  attachToCall(conversation, call) {
    this.callsByConversation[conversation.id] = call;
    const { uxActions } = this;
    if (!uxActions) {
      return;
    }
    let acceptedTime;
    call.handleStateChanged = () => {
      if (call.state === import_ringrtc.CallState.Accepted) {
        acceptedTime = acceptedTime || Date.now();
      } else if (call.state === import_ringrtc.CallState.Ended) {
        this.addCallHistoryForEndedCall(conversation, call, acceptedTime);
        this.stopDeviceReselectionTimer();
        this.lastMediaDeviceSettings = void 0;
        delete this.callsByConversation[conversation.id];
      }
      uxActions.callStateChange({
        conversationId: conversation.id,
        acceptedTime,
        callState: call.state,
        callEndedReason: call.endedReason,
        isIncoming: call.isIncoming,
        isVideoCall: call.isVideoCall,
        title: conversation.getTitle()
      });
    };
    call.handleRemoteVideoEnabled = () => {
      uxActions.remoteVideoChange({
        conversationId: conversation.id,
        hasVideo: call.remoteVideoEnabled
      });
    };
    call.handleRemoteSharingScreen = () => {
      uxActions.remoteSharingScreenChange({
        conversationId: conversation.id,
        isSharingScreen: Boolean(call.remoteSharingScreen)
      });
    };
  }
  async handleLogMessage(level, fileName, line, message) {
    switch (level) {
      case import_ringrtc.CallLogLevel.Info:
        log.info(`${fileName}:${line} ${message}`);
        break;
      case import_ringrtc.CallLogLevel.Warn:
        log.warn(`${fileName}:${line} ${message}`);
        break;
      case import_ringrtc.CallLogLevel.Error:
        log.error(`${fileName}:${line} ${message}`);
        break;
      default:
        break;
    }
  }
  async handleSendHttpRequest(requestId, url, method, headers, body) {
    if (!window.textsecure.messaging) {
      import_ringrtc.RingRTC.httpRequestFailed(requestId, "We are offline");
      return;
    }
    const httpMethod = RINGRTC_HTTP_METHOD_TO_OUR_HTTP_METHOD.get(method);
    if (httpMethod === void 0) {
      import_ringrtc.RingRTC.httpRequestFailed(requestId, `Unknown method: ${JSON.stringify(method)}`);
      return;
    }
    let result;
    try {
      result = await window.textsecure.messaging.server.makeSfuRequest(url, httpMethod, headers, body);
    } catch (err) {
      if (err.code !== -1) {
        import_ringrtc.RingRTC.receivedHttpResponse(requestId, err.code, Buffer.alloc(0));
      } else {
        log.error("handleSendHttpRequest: fetch failed with error", err);
        import_ringrtc.RingRTC.httpRequestFailed(requestId, String(err));
      }
      return;
    }
    import_ringrtc.RingRTC.receivedHttpResponse(requestId, result.response.status, Buffer.from(result.data));
  }
  getRemoteUserIdFromConversation(conversation) {
    const recipients = conversation.getRecipients();
    if (recipients.length !== 1) {
      return void 0;
    }
    return recipients[0];
  }
  get localDeviceId() {
    return this.parseDeviceId(window.textsecure.storage.user.getDeviceId());
  }
  parseDeviceId(deviceId) {
    if (typeof deviceId === "string") {
      return parseInt(deviceId, 10);
    }
    if (typeof deviceId === "number") {
      return deviceId;
    }
    return null;
  }
  async getCallSettings(conversation) {
    if (!window.textsecure.messaging) {
      throw new Error("getCallSettings: offline!");
    }
    const iceServer = await window.textsecure.messaging.server.getIceServers();
    const shouldRelayCalls = window.Events.getAlwaysRelayCalls();
    const isContactUnknown = !conversation.isFromOrAddedByTrustedContact();
    return {
      iceServer: {
        ...iceServer,
        urls: iceServer.urls.slice()
      },
      hideIp: shouldRelayCalls || isContactUnknown,
      bandwidthMode: import_ringrtc.BandwidthMode.Normal
    };
  }
  addCallHistoryForEndedCall(conversation, call, acceptedTimeParam) {
    let acceptedTime = acceptedTimeParam;
    const { endedReason, isIncoming } = call;
    const wasAccepted = Boolean(acceptedTime);
    const isOutgoing = !isIncoming;
    const wasDeclined = !wasAccepted && (endedReason === import_ringrtc.CallEndedReason.Declined || endedReason === import_ringrtc.CallEndedReason.DeclinedOnAnotherDevice || isIncoming && endedReason === import_ringrtc.CallEndedReason.LocalHangup || isOutgoing && endedReason === import_ringrtc.CallEndedReason.RemoteHangup || isOutgoing && endedReason === import_ringrtc.CallEndedReason.RemoteHangupNeedPermission);
    if (call.endedReason === import_ringrtc.CallEndedReason.AcceptedOnAnotherDevice) {
      acceptedTime = Date.now();
    }
    conversation.addCallHistory({
      callMode: import_Calling.CallMode.Direct,
      wasIncoming: call.isIncoming,
      wasVideoCall: call.isVideoCall,
      wasDeclined,
      acceptedTime,
      endedTime: Date.now()
    }, void 0);
  }
  addCallHistoryForFailedIncomingCall(conversation, wasVideoCall, timestamp) {
    conversation.addCallHistory({
      callMode: import_Calling.CallMode.Direct,
      wasIncoming: true,
      wasVideoCall,
      wasDeclined: false,
      acceptedTime: void 0,
      endedTime: timestamp
    }, void 0);
  }
  addCallHistoryForAutoEndedIncomingCall(conversation, reason, endedTime, wasVideoCall, receivedAtCounter) {
    let wasDeclined = false;
    let acceptedTime;
    if (reason === import_ringrtc.CallEndedReason.AcceptedOnAnotherDevice) {
      acceptedTime = endedTime;
    } else if (reason === import_ringrtc.CallEndedReason.DeclinedOnAnotherDevice) {
      wasDeclined = true;
    }
    conversation.addCallHistory({
      callMode: import_Calling.CallMode.Direct,
      wasIncoming: true,
      wasVideoCall,
      wasDeclined,
      acceptedTime,
      endedTime
    }, receivedAtCounter);
  }
  async updateCallHistoryForGroupCall(conversationId, peekInfo) {
    if (!peekInfo || !peekInfo.eraId || !peekInfo.creator) {
      return;
    }
    const creatorUuid = (0, import_Crypto.bytesToUuid)(peekInfo.creator);
    if (!creatorUuid) {
      log.error("updateCallHistoryForGroupCall(): bad creator UUID");
      return;
    }
    const creatorConversation = window.ConversationController.get(creatorUuid);
    const conversation = window.ConversationController.get(conversationId);
    if (!conversation) {
      log.error("updateCallHistoryForGroupCall(): could not find conversation");
      return;
    }
    const isNewCall = await conversation.updateCallHistoryForGroupCall(peekInfo.eraId, creatorUuid);
    const wasStartedByMe = Boolean(creatorConversation && (0, import_whatTypeOfConversation.isMe)(creatorConversation.attributes));
    const isAnybodyElseInGroupCall = Boolean(peekInfo.devices.length);
    if (isNewCall && !wasStartedByMe && isAnybodyElseInGroupCall && !conversation.isMuted()) {
      this.notifyForGroupCall(conversation, creatorConversation);
    }
  }
  notifyForGroupCall(conversation, creatorConversation) {
    let notificationTitle;
    let notificationMessage;
    switch (import_notifications.notificationService.getNotificationSetting()) {
      case import_notifications.NotificationSetting.Off:
        return;
      case import_notifications.NotificationSetting.NoNameOrMessage:
        notificationTitle = import_notifications.FALLBACK_NOTIFICATION_TITLE;
        notificationMessage = window.i18n("calling__call-notification__started-by-someone");
        break;
      default:
        notificationTitle = conversation?.getTitle() || import_notifications.FALLBACK_NOTIFICATION_TITLE;
        notificationMessage = creatorConversation ? window.i18n("calling__call-notification__started", [
          creatorConversation.getTitle()
        ]) : window.i18n("calling__call-notification__started-by-someone");
        break;
    }
    import_notifications.notificationService.notify({
      icon: "images/icons/v2/video-solid-24.svg",
      message: notificationMessage,
      onNotificationClick: () => {
        this.uxActions?.startCallingLobby({
          conversationId: conversation.id,
          isVideoCall: true
        });
      },
      silent: false,
      title: notificationTitle
    });
  }
  async cleanExpiredGroupCallRingsAndLoop() {
    try {
      await cleanExpiredGroupCallRings();
    } catch (err) {
    }
    setTimeout(() => {
      this.cleanExpiredGroupCallRingsAndLoop();
    }, CLEAN_EXPIRED_GROUP_CALL_RINGS_INTERVAL);
  }
}
const calling = new CallingClass();
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {
  CallingClass,
  calling
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiLy8gQ29weXJpZ2h0IDIwMjAtMjAyMiBTaWduYWwgTWVzc2VuZ2VyLCBMTENcbi8vIFNQRFgtTGljZW5zZS1JZGVudGlmaWVyOiBBR1BMLTMuMC1vbmx5XG5cbmltcG9ydCB0eXBlIHsgRGVza3RvcENhcHR1cmVyU291cmNlIH0gZnJvbSAnZWxlY3Ryb24nO1xuaW1wb3J0IHsgaXBjUmVuZGVyZXIgfSBmcm9tICdlbGVjdHJvbic7XG5pbXBvcnQgdHlwZSB7XG4gIEF1ZGlvRGV2aWNlLFxuICBDYWxsSWQsXG4gIENhbGxNZXNzYWdlVXJnZW5jeSxcbiAgQ2FsbFNldHRpbmdzLFxuICBEZXZpY2VJZCxcbiAgUGVla0luZm8sXG4gIFVzZXJJZCxcbiAgVmlkZW9GcmFtZVNvdXJjZSxcbiAgVmlkZW9SZXF1ZXN0LFxufSBmcm9tICdyaW5ncnRjJztcbmltcG9ydCB7XG4gIENhbGwsXG4gIENhbGxFbmRlZFJlYXNvbixcbiAgQ2FsbGluZ01lc3NhZ2UsXG4gIENhbGxMb2dMZXZlbCxcbiAgQ2FsbFN0YXRlLFxuICBDYW52YXNWaWRlb1JlbmRlcmVyLFxuICBDb25uZWN0aW9uU3RhdGUsXG4gIEpvaW5TdGF0ZSxcbiAgSHR0cE1ldGhvZCxcbiAgR3JvdXBDYWxsLFxuICBHcm91cE1lbWJlckluZm8sXG4gIEd1bVZpZGVvQ2FwdHVyZXIsXG4gIEhhbmd1cE1lc3NhZ2UsXG4gIEhhbmd1cFR5cGUsXG4gIE9wYXF1ZU1lc3NhZ2UsXG4gIFJpbmdDYW5jZWxSZWFzb24sXG4gIFJpbmdSVEMsXG4gIFJpbmdVcGRhdGUsXG4gIEJhbmR3aWR0aE1vZGUsXG59IGZyb20gJ3JpbmdydGMnO1xuaW1wb3J0IHsgdW5pcUJ5LCBub29wIH0gZnJvbSAnbG9kYXNoJztcblxuaW1wb3J0IHR5cGUge1xuICBBY3Rpb25zVHlwZSBhcyBVeEFjdGlvbnNUeXBlLFxuICBHcm91cENhbGxQYXJ0aWNpcGFudEluZm9UeXBlLFxuICBHcm91cENhbGxQZWVrSW5mb1R5cGUsXG59IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHR5cGUgeyBDb252ZXJzYXRpb25UeXBlIH0gZnJvbSAnLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBnZXRDb252ZXJzYXRpb25DYWxsTW9kZSB9IGZyb20gJy4uL3N0YXRlL2R1Y2tzL2NvbnZlcnNhdGlvbnMnO1xuaW1wb3J0IHsgaXNNZSB9IGZyb20gJy4uL3V0aWwvd2hhdFR5cGVPZkNvbnZlcnNhdGlvbic7XG5pbXBvcnQgdHlwZSB7XG4gIEF2YWlsYWJsZUlPRGV2aWNlc1R5cGUsXG4gIE1lZGlhRGV2aWNlU2V0dGluZ3MsXG4gIFByZXNlbnRhYmxlU291cmNlLFxuICBQcmVzZW50ZWRTb3VyY2UsXG59IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHtcbiAgQ2FsbE1vZGUsXG4gIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSxcbiAgR3JvdXBDYWxsSm9pblN0YXRlLFxuICBQcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3RSZXN1bHQsXG59IGZyb20gJy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHtcbiAgQXVkaW9EZXZpY2VNb2R1bGUsXG4gIGdldEF1ZGlvRGV2aWNlTW9kdWxlLFxuICBwYXJzZUF1ZGlvRGV2aWNlTW9kdWxlLFxufSBmcm9tICcuLi9jYWxsaW5nL2F1ZGlvRGV2aWNlTW9kdWxlJztcbmltcG9ydCB7XG4gIGZpbmRCZXN0TWF0Y2hpbmdBdWRpb0RldmljZUluZGV4LFxuICBmaW5kQmVzdE1hdGNoaW5nQ2FtZXJhSWQsXG59IGZyb20gJy4uL2NhbGxpbmcvZmluZEJlc3RNYXRjaGluZ0RldmljZSc7XG5pbXBvcnQgdHlwZSB7IExvY2FsaXplclR5cGUgfSBmcm9tICcuLi90eXBlcy9VdGlsJztcbmltcG9ydCB7IFVVSUQgfSBmcm9tICcuLi90eXBlcy9VVUlEJztcbmltcG9ydCB0eXBlIHsgQ29udmVyc2F0aW9uTW9kZWwgfSBmcm9tICcuLi9tb2RlbHMvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgKiBhcyBCeXRlcyBmcm9tICcuLi9CeXRlcyc7XG5pbXBvcnQgeyB1dWlkVG9CeXRlcywgYnl0ZXNUb1V1aWQgfSBmcm9tICcuLi9DcnlwdG8nO1xuaW1wb3J0IHsgZHJvcE51bGwsIHNoYWxsb3dEcm9wTnVsbCB9IGZyb20gJy4uL3V0aWwvZHJvcE51bGwnO1xuaW1wb3J0IHsgZ2V0T3duIH0gZnJvbSAnLi4vdXRpbC9nZXRPd24nO1xuaW1wb3J0IHsgaXNOb3JtYWxOdW1iZXIgfSBmcm9tICcuLi91dGlsL2lzTm9ybWFsTnVtYmVyJztcbmltcG9ydCAqIGFzIGR1cmF0aW9ucyBmcm9tICcuLi91dGlsL2R1cmF0aW9ucyc7XG5pbXBvcnQgeyBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSB9IGZyb20gJy4uL3V0aWwvY2xlYXJUaW1lb3V0SWZOZWNlc3NhcnknO1xuaW1wb3J0IHsgaGFuZGxlTWVzc2FnZVNlbmQgfSBmcm9tICcuLi91dGlsL2hhbmRsZU1lc3NhZ2VTZW5kJztcbmltcG9ydCB7IGZldGNoTWVtYmVyc2hpcFByb29mLCBnZXRNZW1iZXJzaGlwTGlzdCB9IGZyb20gJy4uL2dyb3Vwcyc7XG5pbXBvcnQgeyB3cmFwV2l0aFN5bmNNZXNzYWdlU2VuZCB9IGZyb20gJy4uL3V0aWwvd3JhcFdpdGhTeW5jTWVzc2FnZVNlbmQnO1xuaW1wb3J0IHR5cGUgeyBQcm9jZXNzZWRFbnZlbG9wZSB9IGZyb20gJy4uL3RleHRzZWN1cmUvVHlwZXMuZCc7XG5pbXBvcnQgeyBtaXNzaW5nQ2FzZUVycm9yIH0gZnJvbSAnLi4vdXRpbC9taXNzaW5nQ2FzZUVycm9yJztcbmltcG9ydCB7IG5vcm1hbGl6ZUdyb3VwQ2FsbFRpbWVzdGFtcCB9IGZyb20gJy4uL3V0aWwvcmluZ3J0Yy9ub3JtYWxpemVHcm91cENhbGxUaW1lc3RhbXAnO1xuaW1wb3J0IHtcbiAgQVVESU9fTEVWRUxfSU5URVJWQUxfTVMsXG4gIFJFUVVFU1RFRF9WSURFT19XSURUSCxcbiAgUkVRVUVTVEVEX1ZJREVPX0hFSUdIVCxcbiAgUkVRVUVTVEVEX1ZJREVPX0ZSQU1FUkFURSxcbn0gZnJvbSAnLi4vY2FsbGluZy9jb25zdGFudHMnO1xuaW1wb3J0IHsgY2FsbGluZ01lc3NhZ2VUb1Byb3RvIH0gZnJvbSAnLi4vdXRpbC9jYWxsaW5nTWVzc2FnZVRvUHJvdG8nO1xuaW1wb3J0IHsgZ2V0U2VuZE9wdGlvbnMgfSBmcm9tICcuLi91dGlsL2dldFNlbmRPcHRpb25zJztcbmltcG9ydCB7IHJlcXVlc3RNaWNyb3Bob25lUGVybWlzc2lvbnMgfSBmcm9tICcuLi91dGlsL3JlcXVlc3RNaWNyb3Bob25lUGVybWlzc2lvbnMnO1xuaW1wb3J0IHsgU2lnbmFsU2VydmljZSBhcyBQcm90byB9IGZyb20gJy4uL3Byb3RvYnVmJztcbmltcG9ydCBkYXRhSW50ZXJmYWNlIGZyb20gJy4uL3NxbC9DbGllbnQnO1xuaW1wb3J0IHtcbiAgbm90aWZpY2F0aW9uU2VydmljZSxcbiAgTm90aWZpY2F0aW9uU2V0dGluZyxcbiAgRkFMTEJBQ0tfTk9USUZJQ0FUSU9OX1RJVExFLFxufSBmcm9tICcuL25vdGlmaWNhdGlvbnMnO1xuaW1wb3J0ICogYXMgbG9nIGZyb20gJy4uL2xvZ2dpbmcvbG9nJztcbmltcG9ydCB7IGFzc2VydCB9IGZyb20gJy4uL3V0aWwvYXNzZXJ0JztcblxuY29uc3Qge1xuICBwcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3QsXG4gIHByb2Nlc3NHcm91cENhbGxSaW5nQ2FuY2VsYXRpb24sXG4gIGNsZWFuRXhwaXJlZEdyb3VwQ2FsbFJpbmdzLFxufSA9IGRhdGFJbnRlcmZhY2U7XG5cbmNvbnN0IFJJTkdSVENfSFRUUF9NRVRIT0RfVE9fT1VSX0hUVFBfTUVUSE9EOiBNYXA8XG4gIEh0dHBNZXRob2QsXG4gICdHRVQnIHwgJ1BVVCcgfCAnUE9TVCcgfCAnREVMRVRFJ1xuPiA9IG5ldyBNYXAoW1xuICBbSHR0cE1ldGhvZC5HZXQsICdHRVQnXSxcbiAgW0h0dHBNZXRob2QuUHV0LCAnUFVUJ10sXG4gIFtIdHRwTWV0aG9kLlBvc3QsICdQT1NUJ10sXG4gIFtIdHRwTWV0aG9kLkRlbGV0ZSwgJ0RFTEVURSddLFxuXSk7XG5cbmNvbnN0IENMRUFOX0VYUElSRURfR1JPVVBfQ0FMTF9SSU5HU19JTlRFUlZBTCA9IDEwICogZHVyYXRpb25zLk1JTlVURTtcblxuLy8gV2Ugc2VuZCBncm91cCBjYWxsIHVwZGF0ZSBtZXNzYWdlcyB0byB0ZWxsIG90aGVyIGNsaWVudHMgdG8gcGVlaywgd2hpY2ggdHJpZ2dlcnNcbi8vICAgbm90aWZpY2F0aW9ucywgdGltZWxpbmUgbWVzc2FnZXMsIGJpZyBncmVlbiBcIkpvaW5cIiBidXR0b25zLCBhbmQgc28gb24uIFRoaXMgZW51bVxuLy8gICByZXByZXNlbnRzIHRoZSB0aHJlZSBwb3NzaWJsZSBzdGF0ZXMgd2UgY2FuIGJlIGluLiBUaGlzIGhlbHBzIGVuc3VyZSB0aGF0IHdlIGRvbid0XG4vLyAgIHNlbmQgYW4gdXBkYXRlIG9uIGRpc2Nvbm5lY3QgaWYgd2UgbmV2ZXIgc2VudCBvbmUgd2hlbiB3ZSBqb2luZWQuXG5lbnVtIEdyb3VwQ2FsbFVwZGF0ZU1lc3NhZ2VTdGF0ZSB7XG4gIFNlbnROb3RoaW5nLFxuICBTZW50Sm9pbixcbiAgU2VudExlZnQsXG59XG5cbmZ1bmN0aW9uIGlzU2NyZWVuU291cmNlKHNvdXJjZTogUHJlc2VudGVkU291cmNlKTogYm9vbGVhbiB7XG4gIHJldHVybiBzb3VyY2UuaWQuc3RhcnRzV2l0aCgnc2NyZWVuJyk7XG59XG5cbmZ1bmN0aW9uIHRyYW5zbGF0ZVNvdXJjZU5hbWUoXG4gIGkxOG46IExvY2FsaXplclR5cGUsXG4gIHNvdXJjZTogUHJlc2VudGVkU291cmNlXG4pOiBzdHJpbmcge1xuICBjb25zdCB7IG5hbWUgfSA9IHNvdXJjZTtcbiAgaWYgKCFpc1NjcmVlblNvdXJjZShzb3VyY2UpKSB7XG4gICAgcmV0dXJuIG5hbWU7XG4gIH1cblxuICBpZiAobmFtZSA9PT0gJ0VudGlyZSBTY3JlZW4nKSB7XG4gICAgcmV0dXJuIGkxOG4oJ2NhbGxpbmdfX1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwtLWVudGlyZVNjcmVlbicpO1xuICB9XG5cbiAgY29uc3QgbWF0Y2ggPSBuYW1lLm1hdGNoKC9eU2NyZWVuIChcXGQrKSQvKTtcbiAgaWYgKG1hdGNoKSB7XG4gICAgcmV0dXJuIGkxOG4oJ2NhbGxpbmdfX1NlbGVjdFByZXNlbnRpbmdTb3VyY2VzTW9kYWwtLXNjcmVlbicsIHtcbiAgICAgIGlkOiBtYXRjaFsxXSxcbiAgICB9KTtcbiAgfVxuXG4gIHJldHVybiBuYW1lO1xufVxuXG5mdW5jdGlvbiBwcm90b1RvQ2FsbGluZ01lc3NhZ2Uoe1xuICBvZmZlcixcbiAgYW5zd2VyLFxuICBpY2VDYW5kaWRhdGVzLFxuICBsZWdhY3lIYW5ndXAsXG4gIGJ1c3ksXG4gIGhhbmd1cCxcbiAgc3VwcG9ydHNNdWx0aVJpbmcsXG4gIGRlc3RpbmF0aW9uRGV2aWNlSWQsXG4gIG9wYXF1ZSxcbn06IFByb3RvLklDYWxsaW5nTWVzc2FnZSk6IENhbGxpbmdNZXNzYWdlIHtcbiAgcmV0dXJuIHtcbiAgICBvZmZlcjogb2ZmZXJcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnNoYWxsb3dEcm9wTnVsbChvZmZlciksXG5cbiAgICAgICAgICB0eXBlOiBkcm9wTnVsbChvZmZlci50eXBlKSBhcyBudW1iZXIsXG4gICAgICAgICAgb3BhcXVlOiBvZmZlci5vcGFxdWUgPyBCdWZmZXIuZnJvbShvZmZlci5vcGFxdWUpIDogdW5kZWZpbmVkLFxuICAgICAgICB9XG4gICAgICA6IHVuZGVmaW5lZCxcbiAgICBhbnN3ZXI6IGFuc3dlclxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc2hhbGxvd0Ryb3BOdWxsKGFuc3dlciksXG4gICAgICAgICAgb3BhcXVlOiBhbnN3ZXIub3BhcXVlID8gQnVmZmVyLmZyb20oYW5zd2VyLm9wYXF1ZSkgOiB1bmRlZmluZWQsXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGljZUNhbmRpZGF0ZXM6IGljZUNhbmRpZGF0ZXNcbiAgICAgID8gaWNlQ2FuZGlkYXRlcy5tYXAoY2FuZGlkYXRlID0+IHtcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uc2hhbGxvd0Ryb3BOdWxsKGNhbmRpZGF0ZSksXG4gICAgICAgICAgICBvcGFxdWU6IGNhbmRpZGF0ZS5vcGFxdWVcbiAgICAgICAgICAgICAgPyBCdWZmZXIuZnJvbShjYW5kaWRhdGUub3BhcXVlKVxuICAgICAgICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgICAgICB9O1xuICAgICAgICB9KVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgbGVnYWN5SGFuZ3VwOiBsZWdhY3lIYW5ndXBcbiAgICAgID8ge1xuICAgICAgICAgIC4uLnNoYWxsb3dEcm9wTnVsbChsZWdhY3lIYW5ndXApLFxuICAgICAgICAgIHR5cGU6IGRyb3BOdWxsKGxlZ2FjeUhhbmd1cC50eXBlKSBhcyBudW1iZXIsXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICAgIGJ1c3k6IHNoYWxsb3dEcm9wTnVsbChidXN5KSxcbiAgICBoYW5ndXA6IGhhbmd1cFxuICAgICAgPyB7XG4gICAgICAgICAgLi4uc2hhbGxvd0Ryb3BOdWxsKGhhbmd1cCksXG4gICAgICAgICAgdHlwZTogZHJvcE51bGwoaGFuZ3VwLnR5cGUpIGFzIG51bWJlcixcbiAgICAgICAgfVxuICAgICAgOiB1bmRlZmluZWQsXG4gICAgc3VwcG9ydHNNdWx0aVJpbmc6IGRyb3BOdWxsKHN1cHBvcnRzTXVsdGlSaW5nKSxcbiAgICBkZXN0aW5hdGlvbkRldmljZUlkOiBkcm9wTnVsbChkZXN0aW5hdGlvbkRldmljZUlkKSxcbiAgICBvcGFxdWU6IG9wYXF1ZVxuICAgICAgPyB7XG4gICAgICAgICAgZGF0YTogb3BhcXVlLmRhdGEgPyBCdWZmZXIuZnJvbShvcGFxdWUuZGF0YSkgOiB1bmRlZmluZWQsXG4gICAgICAgIH1cbiAgICAgIDogdW5kZWZpbmVkLFxuICB9O1xufVxuXG5leHBvcnQgY2xhc3MgQ2FsbGluZ0NsYXNzIHtcbiAgcmVhZG9ubHkgdmlkZW9DYXB0dXJlcjogR3VtVmlkZW9DYXB0dXJlcjtcblxuICByZWFkb25seSB2aWRlb1JlbmRlcmVyOiBDYW52YXNWaWRlb1JlbmRlcmVyO1xuXG4gIHByaXZhdGUgdXhBY3Rpb25zPzogVXhBY3Rpb25zVHlwZTtcblxuICBwcml2YXRlIHNmdVVybD86IHN0cmluZztcblxuICBwcml2YXRlIGxhc3RNZWRpYURldmljZVNldHRpbmdzPzogTWVkaWFEZXZpY2VTZXR0aW5ncztcblxuICBwcml2YXRlIHByZXZpb3VzQXVkaW9EZXZpY2VNb2R1bGU/OiBBdWRpb0RldmljZU1vZHVsZTtcblxuICBwcml2YXRlIGN1cnJlbnRBdWRpb0RldmljZU1vZHVsZT86IEF1ZGlvRGV2aWNlTW9kdWxlO1xuXG4gIHByaXZhdGUgZGV2aWNlUmVzZWxlY3Rpb25UaW1lcj86IE5vZGVKUy5UaW1lb3V0O1xuXG4gIHByaXZhdGUgY2FsbHNCeUNvbnZlcnNhdGlvbjogeyBbY29udmVyc2F0aW9uSWQ6IHN0cmluZ106IENhbGwgfCBHcm91cENhbGwgfTtcblxuICBwcml2YXRlIGhhZExvY2FsVmlkZW9CZWZvcmVQcmVzZW50aW5nPzogYm9vbGVhbjtcblxuICBjb25zdHJ1Y3RvcigpIHtcbiAgICB0aGlzLnZpZGVvQ2FwdHVyZXIgPSBuZXcgR3VtVmlkZW9DYXB0dXJlcih7XG4gICAgICBtYXhXaWR0aDogUkVRVUVTVEVEX1ZJREVPX1dJRFRILFxuICAgICAgbWF4SGVpZ2h0OiBSRVFVRVNURURfVklERU9fSEVJR0hULFxuICAgICAgbWF4RnJhbWVyYXRlOiBSRVFVRVNURURfVklERU9fRlJBTUVSQVRFLFxuICAgIH0pO1xuICAgIHRoaXMudmlkZW9SZW5kZXJlciA9IG5ldyBDYW52YXNWaWRlb1JlbmRlcmVyKCk7XG5cbiAgICB0aGlzLmNhbGxzQnlDb252ZXJzYXRpb24gPSB7fTtcbiAgfVxuXG4gIGluaXRpYWxpemUodXhBY3Rpb25zOiBVeEFjdGlvbnNUeXBlLCBzZnVVcmw6IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMudXhBY3Rpb25zID0gdXhBY3Rpb25zO1xuICAgIGlmICghdXhBY3Rpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NhbGxpbmdDbGFzcy5pbml0aWFsaXplOiBJbnZhbGlkIHV4QWN0aW9ucy4nKTtcbiAgICB9XG5cbiAgICB0aGlzLnNmdVVybCA9IHNmdVVybDtcblxuICAgIHRoaXMucHJldmlvdXNBdWRpb0RldmljZU1vZHVsZSA9IHBhcnNlQXVkaW9EZXZpY2VNb2R1bGUoXG4gICAgICB3aW5kb3cuc3RvcmFnZS5nZXQoJ3ByZXZpb3VzQXVkaW9EZXZpY2VNb2R1bGUnKVxuICAgICk7XG4gICAgdGhpcy5jdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUgPSBnZXRBdWRpb0RldmljZU1vZHVsZSgpO1xuICAgIHdpbmRvdy5zdG9yYWdlLnB1dChcbiAgICAgICdwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlJyxcbiAgICAgIHRoaXMuY3VycmVudEF1ZGlvRGV2aWNlTW9kdWxlXG4gICAgKTtcblxuICAgIFJpbmdSVEMuc2V0Q29uZmlnKHtcbiAgICAgIHVzZV9uZXdfYXVkaW9fZGV2aWNlX21vZHVsZTpcbiAgICAgICAgdGhpcy5jdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUgPT09IEF1ZGlvRGV2aWNlTW9kdWxlLldpbmRvd3NBZG0yLFxuICAgIH0pO1xuXG4gICAgUmluZ1JUQy5oYW5kbGVPdXRnb2luZ1NpZ25hbGluZyA9IHRoaXMuaGFuZGxlT3V0Z29pbmdTaWduYWxpbmcuYmluZCh0aGlzKTtcbiAgICBSaW5nUlRDLmhhbmRsZUluY29taW5nQ2FsbCA9IHRoaXMuaGFuZGxlSW5jb21pbmdDYWxsLmJpbmQodGhpcyk7XG4gICAgUmluZ1JUQy5oYW5kbGVBdXRvRW5kZWRJbmNvbWluZ0NhbGxSZXF1ZXN0ID1cbiAgICAgIHRoaXMuaGFuZGxlQXV0b0VuZGVkSW5jb21pbmdDYWxsUmVxdWVzdC5iaW5kKHRoaXMpO1xuICAgIFJpbmdSVEMuaGFuZGxlTG9nTWVzc2FnZSA9IHRoaXMuaGFuZGxlTG9nTWVzc2FnZS5iaW5kKHRoaXMpO1xuICAgIFJpbmdSVEMuaGFuZGxlU2VuZEh0dHBSZXF1ZXN0ID0gdGhpcy5oYW5kbGVTZW5kSHR0cFJlcXVlc3QuYmluZCh0aGlzKTtcbiAgICBSaW5nUlRDLmhhbmRsZVNlbmRDYWxsTWVzc2FnZSA9IHRoaXMuaGFuZGxlU2VuZENhbGxNZXNzYWdlLmJpbmQodGhpcyk7XG4gICAgUmluZ1JUQy5oYW5kbGVTZW5kQ2FsbE1lc3NhZ2VUb0dyb3VwID1cbiAgICAgIHRoaXMuaGFuZGxlU2VuZENhbGxNZXNzYWdlVG9Hcm91cC5iaW5kKHRoaXMpO1xuICAgIFJpbmdSVEMuaGFuZGxlR3JvdXBDYWxsUmluZ1VwZGF0ZSA9XG4gICAgICB0aGlzLmhhbmRsZUdyb3VwQ2FsbFJpbmdVcGRhdGUuYmluZCh0aGlzKTtcblxuICAgIHRoaXMuYXR0ZW1wdFRvR2l2ZU91clV1aWRUb1JpbmdSdGMoKTtcbiAgICB3aW5kb3cuV2hpc3Blci5ldmVudHMub24oJ3VzZXJDaGFuZ2VkJywgKCkgPT4ge1xuICAgICAgdGhpcy5hdHRlbXB0VG9HaXZlT3VyVXVpZFRvUmluZ1J0YygpO1xuICAgIH0pO1xuXG4gICAgaXBjUmVuZGVyZXIub24oJ3N0b3Atc2NyZWVuLXNoYXJlJywgKCkgPT4ge1xuICAgICAgdXhBY3Rpb25zLnNldFByZXNlbnRpbmcoKTtcbiAgICB9KTtcblxuICAgIGlwY1JlbmRlcmVyLm9uKCdxdWl0JywgKCkgPT4ge1xuICAgICAgZm9yIChjb25zdCBjb252ZXJzYXRpb25JZCBvZiBPYmplY3Qua2V5cyh0aGlzLmNhbGxzQnlDb252ZXJzYXRpb24pKSB7XG4gICAgICAgIHRoaXMuaGFuZ3VwKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIHRoaXMuY2xlYW5FeHBpcmVkR3JvdXBDYWxsUmluZ3NBbmRMb29wKCk7XG4gIH1cblxuICBwcml2YXRlIGF0dGVtcHRUb0dpdmVPdXJVdWlkVG9SaW5nUnRjKCk6IHZvaWQge1xuICAgIGNvbnN0IG91clV1aWQgPSB3aW5kb3cudGV4dHNlY3VyZS5zdG9yYWdlLnVzZXIuZ2V0VXVpZCgpPy50b1N0cmluZygpO1xuICAgIGlmICghb3VyVXVpZCkge1xuICAgICAgLy8gVGhpcyBjYW4gaGFwcGVuIGlmIHdlJ3JlIG5vdCBsaW5rZWQuIEl0J3Mgb2theSBpZiB3ZSBoaXQgdGhpcyBjYXNlLlxuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIFJpbmdSVEMuc2V0U2VsZlV1aWQoQnVmZmVyLmZyb20odXVpZFRvQnl0ZXMob3VyVXVpZCkpKTtcbiAgfVxuXG4gIGFzeW5jIHN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICBjb252ZXJzYXRpb24sXG4gICAgaGFzTG9jYWxBdWRpbyxcbiAgICBoYXNMb2NhbFZpZGVvLFxuICB9OiBSZWFkb25seTx7XG4gICAgY29udmVyc2F0aW9uOiBSZWFkb25seTxDb252ZXJzYXRpb25UeXBlPjtcbiAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuO1xuICAgIGhhc0xvY2FsVmlkZW86IGJvb2xlYW47XG4gIH0+KTogUHJvbWlzZTxcbiAgICB8IHVuZGVmaW5lZFxuICAgIHwgKHsgaGFzTG9jYWxBdWRpbzogYm9vbGVhbjsgaGFzTG9jYWxWaWRlbzogYm9vbGVhbiB9ICYgKFxuICAgICAgICB8IHsgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCB9XG4gICAgICAgIHwge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwO1xuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGU7XG4gICAgICAgICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZTtcbiAgICAgICAgICAgIHBlZWtJbmZvPzogR3JvdXBDYWxsUGVla0luZm9UeXBlO1xuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBBcnJheTxHcm91cENhbGxQYXJ0aWNpcGFudEluZm9UeXBlPjtcbiAgICAgICAgICB9XG4gICAgICApKVxuICA+IHtcbiAgICBsb2cuaW5mbygnQ2FsbGluZ0NsYXNzLnN0YXJ0Q2FsbGluZ0xvYmJ5KCknKTtcblxuICAgIGNvbnN0IGNhbGxNb2RlID0gZ2V0Q29udmVyc2F0aW9uQ2FsbE1vZGUoY29udmVyc2F0aW9uKTtcbiAgICBzd2l0Y2ggKGNhbGxNb2RlKSB7XG4gICAgICBjYXNlIENhbGxNb2RlLk5vbmU6XG4gICAgICAgIGxvZy5lcnJvcignQ29udmVyc2F0aW9uIGRvZXMgbm90IHN1cHBvcnQgY2FsbHMsIG5ldyBjYWxsIG5vdCBhbGxvd2VkLicpO1xuICAgICAgICByZXR1cm47XG4gICAgICBjYXNlIENhbGxNb2RlLkRpcmVjdDoge1xuICAgICAgICBjb25zdCBjb252ZXJzYXRpb25Nb2RlbCA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChcbiAgICAgICAgICBjb252ZXJzYXRpb24uaWRcbiAgICAgICAgKTtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFjb252ZXJzYXRpb25Nb2RlbCB8fFxuICAgICAgICAgICF0aGlzLmdldFJlbW90ZVVzZXJJZEZyb21Db252ZXJzYXRpb24oY29udmVyc2F0aW9uTW9kZWwpXG4gICAgICAgICkge1xuICAgICAgICAgIGxvZy5lcnJvcignTWlzc2luZyByZW1vdGUgdXNlciBpZGVudGlmaWVyLCBuZXcgY2FsbCBub3QgYWxsb3dlZC4nKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjYXNlIENhbGxNb2RlLkdyb3VwOlxuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY2FsbE1vZGUpO1xuICAgIH1cblxuICAgIGlmICghdGhpcy51eEFjdGlvbnMpIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyB1eEFjdGlvbnMsIG5ldyBjYWxsIG5vdCBhbGxvd2VkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGlmICghdGhpcy5sb2NhbERldmljZUlkKSB7XG4gICAgICBsb2cuZXJyb3IoJ01pc3NpbmcgbG9jYWwgZGV2aWNlIGlkZW50aWZpZXIsIG5ldyBjYWxsIG5vdCBhbGxvd2VkLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhdmVNZWRpYVBlcm1pc3Npb25zID0gYXdhaXQgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbnMoaGFzTG9jYWxWaWRlbyk7XG4gICAgaWYgKCFoYXZlTWVkaWFQZXJtaXNzaW9ucykge1xuICAgICAgbG9nLmluZm8oJ1Blcm1pc3Npb25zIHdlcmUgZGVuaWVkLCBuZXcgY2FsbCBub3QgYWxsb3dlZC4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBsb2cuaW5mbygnQ2FsbGluZ0NsYXNzLnN0YXJ0Q2FsbGluZ0xvYmJ5KCk6IFN0YXJ0aW5nIGxvYmJ5Jyk7XG5cbiAgICAvLyBJdCdzIGltcG9ydGFudCB0aGF0IHRoaXMgZnVuY3Rpb24gY29tZXMgYmVmb3JlIGFueSBjYWxscyB0b1xuICAgIC8vICAgYHZpZGVvQ2FwdHVyZXIuZW5hYmxlQ2FwdHVyZWAgb3IgYHZpZGVvQ2FwdHVyZXIuZW5hYmxlQ2FwdHVyZUFuZFNlbmRgIGJlY2F1c2Ugb2ZcbiAgICAvLyAgIGEgc21hbGwgUmluZ1JUQyBidWcuXG4gICAgLy9cbiAgICAvLyBJZiB3ZSB0ZWxsIFJpbmdSVEMgdG8gc3RhcnQgY2FwdHVyaW5nIHZpZGVvICh3aXRoIHRob3NlIG1ldGhvZHMgb3Igd2l0aFxuICAgIC8vICAgYFJpbmdSVEMuc2V0UHJlZmVycmVkRGV2aWNlYCwgd2hpY2ggYWxzbyBjYXB0dXJlcyB2aWRlbykgbXVsdGlwbGUgdGltZXMgaW4gcXVpY2tcbiAgICAvLyAgIHN1Y2Nlc3Npb24sIGl0IHdpbGwgY2FsbCB0aGUgYXN5bmNocm9ub3VzIGBnZXRVc2VyTWVkaWFgIHR3aWNlLiBJdCdsbCBzYXZlIHRoZVxuICAgIC8vICAgcmVzdWx0cyBpbiB0aGUgc2FtZSB2YXJpYWJsZSwgd2hpY2ggbWVhbnMgdGhlIGZpcnN0IGNhbGwgY2FuIGJlIG92ZXJyaWRkZW4uXG4gICAgLy8gICBMYXRlciwgd2hlbiB3ZSB0cnkgdG8gdHVybiB0aGUgY2FtZXJhIG9mZiwgd2UnbGwgb25seSBkaXNhYmxlIHRoZSAqc2Vjb25kKiByZXN1bHRcbiAgICAvLyAgIG9mIGBnZXRVc2VyTWVkaWFgIGFuZCB0aGUgY2FtZXJhIHdpbGwgc3RheSBvbi5cbiAgICAvL1xuICAgIC8vIFdlIGdldCBhcm91bmQgdGhpcyBieSBgYXdhaXRgaW5nLCBtYWtpbmcgc3VyZSB3ZSdyZSBhbGwgZG9uZSB3aXRoIGBnZXRVc2VyTWVkaWFgLFxuICAgIC8vICAgYW5kIHRoZW4gY29udGludWluZy5cbiAgICAvL1xuICAgIC8vIFdlIHNob3VsZCBiZSBhYmxlIHRvIG1vdmUgdGhpcyBiZWxvdyBgdGhpcy5jb25uZWN0R3JvdXBDYWxsYCBvbmNlIHRoYXQgUmluZ1JUQyBidWdcbiAgICAvLyAgIGlzIGZpeGVkLiBTZWUgREVTS1RPUC0xMDMyLlxuICAgIGF3YWl0IHRoaXMuc3RhcnREZXZpY2VSZXNlbGVjdGlvblRpbWVyKCk7XG5cbiAgICBjb25zdCBlbmFibGVMb2NhbENhbWVyYUlmTmVjZXNzYXJ5ID0gaGFzTG9jYWxWaWRlb1xuICAgICAgPyAoKSA9PiB0aGlzLmVuYWJsZUxvY2FsQ2FtZXJhKClcbiAgICAgIDogbm9vcDtcblxuICAgIHN3aXRjaCAoY2FsbE1vZGUpIHtcbiAgICAgIGNhc2UgQ2FsbE1vZGUuRGlyZWN0OlxuICAgICAgICAvLyBXZSBjb3VsZCBlYXNpbHkgc3VwcG9ydCB0aGlzIGluIHRoZSBmdXR1cmUgaWYgd2UgbmVlZCB0by5cbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIGhhc0xvY2FsQXVkaW8sXG4gICAgICAgICAgJ0V4cGVjdGVkIGxvY2FsIGF1ZGlvIHRvIGJlIGVuYWJsZWQgZm9yIGRpcmVjdCBjYWxsIGxvYmJpZXMnXG4gICAgICAgICk7XG4gICAgICAgIGVuYWJsZUxvY2FsQ2FtZXJhSWZOZWNlc3NhcnkoKTtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICAgIGhhc0xvY2FsQXVkaW8sXG4gICAgICAgICAgaGFzTG9jYWxWaWRlbyxcbiAgICAgICAgfTtcbiAgICAgIGNhc2UgQ2FsbE1vZGUuR3JvdXA6IHtcbiAgICAgICAgaWYgKFxuICAgICAgICAgICFjb252ZXJzYXRpb24uZ3JvdXBJZCB8fFxuICAgICAgICAgICFjb252ZXJzYXRpb24ucHVibGljUGFyYW1zIHx8XG4gICAgICAgICAgIWNvbnZlcnNhdGlvbi5zZWNyZXRQYXJhbXNcbiAgICAgICAgKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ0NvbnZlcnNhdGlvbiBpcyBtaXNzaW5nIHJlcXVpcmVkIHBhcmFtZXRlcnMuIENhbm5vdCBjb25uZWN0IGdyb3VwIGNhbGwnXG4gICAgICAgICAgKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgZ3JvdXBDYWxsID0gdGhpcy5jb25uZWN0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbi5pZCwge1xuICAgICAgICAgIGdyb3VwSWQ6IGNvbnZlcnNhdGlvbi5ncm91cElkLFxuICAgICAgICAgIHB1YmxpY1BhcmFtczogY29udmVyc2F0aW9uLnB1YmxpY1BhcmFtcyxcbiAgICAgICAgICBzZWNyZXRQYXJhbXM6IGNvbnZlcnNhdGlvbi5zZWNyZXRQYXJhbXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGdyb3VwQ2FsbC5zZXRPdXRnb2luZ0F1ZGlvTXV0ZWQoIWhhc0xvY2FsQXVkaW8pO1xuICAgICAgICBncm91cENhbGwuc2V0T3V0Z29pbmdWaWRlb011dGVkKCFoYXNMb2NhbFZpZGVvKTtcblxuICAgICAgICBlbmFibGVMb2NhbENhbWVyYUlmTmVjZXNzYXJ5KCk7XG5cbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgLi4udGhpcy5mb3JtYXRHcm91cENhbGxGb3JSZWR1eChncm91cENhbGwpLFxuICAgICAgICB9O1xuICAgICAgfVxuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjYWxsTW9kZSk7XG4gICAgfVxuICB9XG5cbiAgc3RvcENhbGxpbmdMb2JieShjb252ZXJzYXRpb25JZD86IHN0cmluZyk6IHZvaWQge1xuICAgIHRoaXMuZGlzYWJsZUxvY2FsVmlkZW8oKTtcbiAgICB0aGlzLnN0b3BEZXZpY2VSZXNlbGVjdGlvblRpbWVyKCk7XG4gICAgdGhpcy5sYXN0TWVkaWFEZXZpY2VTZXR0aW5ncyA9IHVuZGVmaW5lZDtcblxuICAgIGlmIChjb252ZXJzYXRpb25JZCkge1xuICAgICAgdGhpcy5nZXRHcm91cENhbGwoY29udmVyc2F0aW9uSWQpPy5kaXNjb25uZWN0KCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgc3RhcnRPdXRnb2luZ0RpcmVjdENhbGwoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuLFxuICAgIGhhc0xvY2FsVmlkZW86IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5zdGFydE91dGdvaW5nRGlyZWN0Q2FsbCgpJyk7XG5cbiAgICBpZiAoIXRoaXMudXhBY3Rpb25zKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlZHV4IGFjdGlvbnMgbm90IGF2YWlsYWJsZScpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcignQ291bGQgbm90IGZpbmQgY29udmVyc2F0aW9uLCBjYW5ub3Qgc3RhcnQgY2FsbCcpO1xuICAgICAgdGhpcy5zdG9wQ2FsbGluZ0xvYmJ5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3RlVXNlcklkID0gdGhpcy5nZXRSZW1vdGVVc2VySWRGcm9tQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbik7XG4gICAgaWYgKCFyZW1vdGVVc2VySWQgfHwgIXRoaXMubG9jYWxEZXZpY2VJZCkge1xuICAgICAgbG9nLmVycm9yKCdNaXNzaW5nIGlkZW50aWZpZXIsIG5ldyBjYWxsIG5vdCBhbGxvd2VkLicpO1xuICAgICAgdGhpcy5zdG9wQ2FsbGluZ0xvYmJ5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgaGF2ZU1lZGlhUGVybWlzc2lvbnMgPSBhd2FpdCB0aGlzLnJlcXVlc3RQZXJtaXNzaW9ucyhoYXNMb2NhbFZpZGVvKTtcbiAgICBpZiAoIWhhdmVNZWRpYVBlcm1pc3Npb25zKSB7XG4gICAgICBsb2cuaW5mbygnUGVybWlzc2lvbnMgd2VyZSBkZW5pZWQsIG5ldyBjYWxsIG5vdCBhbGxvd2VkLicpO1xuICAgICAgdGhpcy5zdG9wQ2FsbGluZ0xvYmJ5KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5zdGFydE91dGdvaW5nRGlyZWN0Q2FsbCgpOiBHZXR0aW5nIGNhbGwgc2V0dGluZ3MnKTtcblxuICAgIGNvbnN0IGNhbGxTZXR0aW5ncyA9IGF3YWl0IHRoaXMuZ2V0Q2FsbFNldHRpbmdzKGNvbnZlcnNhdGlvbik7XG5cbiAgICAvLyBDaGVjayBzdGF0ZSBhZnRlciBhd2FpdGluZyB0byBkZWJvdW5jZSBjYWxsIGJ1dHRvbi5cbiAgICBpZiAoUmluZ1JUQy5jYWxsICYmIFJpbmdSVEMuY2FsbC5zdGF0ZSAhPT0gQ2FsbFN0YXRlLkVuZGVkKSB7XG4gICAgICBsb2cuaW5mbygnQ2FsbCBhbHJlYWR5IGluIHByb2dyZXNzLCBuZXcgY2FsbCBub3QgYWxsb3dlZC4nKTtcbiAgICAgIHRoaXMuc3RvcENhbGxpbmdMb2JieSgpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxvZy5pbmZvKCdDYWxsaW5nQ2xhc3Muc3RhcnRPdXRnb2luZ0RpcmVjdENhbGwoKTogU3RhcnRpbmcgaW4gUmluZ1JUQycpO1xuXG4gICAgLy8gV2UgY291bGQgbWFrZSB0aGlzIGZhc3RlciBieSBnZXR0aW5nIHRoZSBjYWxsIG9iamVjdFxuICAgIC8vIGZyb20gdGhlIFJpbmdSVEMgYmVmb3JlIHdlIGxvb2t1cCB0aGUgSUNFIHNlcnZlcnMuXG4gICAgY29uc3QgY2FsbCA9IFJpbmdSVEMuc3RhcnRPdXRnb2luZ0NhbGwoXG4gICAgICByZW1vdGVVc2VySWQsXG4gICAgICBoYXNMb2NhbFZpZGVvLFxuICAgICAgdGhpcy5sb2NhbERldmljZUlkLFxuICAgICAgY2FsbFNldHRpbmdzXG4gICAgKTtcblxuICAgIFJpbmdSVEMuc2V0T3V0Z29pbmdBdWRpbyhjYWxsLmNhbGxJZCwgaGFzTG9jYWxBdWRpbyk7XG4gICAgUmluZ1JUQy5zZXRWaWRlb0NhcHR1cmVyKGNhbGwuY2FsbElkLCB0aGlzLnZpZGVvQ2FwdHVyZXIpO1xuICAgIFJpbmdSVEMuc2V0VmlkZW9SZW5kZXJlcihjYWxsLmNhbGxJZCwgdGhpcy52aWRlb1JlbmRlcmVyKTtcbiAgICB0aGlzLmF0dGFjaFRvQ2FsbChjb252ZXJzYXRpb24sIGNhbGwpO1xuXG4gICAgdGhpcy51eEFjdGlvbnMub3V0Z29pbmdDYWxsKHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiBjb252ZXJzYXRpb24uaWQsXG4gICAgICBoYXNMb2NhbEF1ZGlvLFxuICAgICAgaGFzTG9jYWxWaWRlbyxcbiAgICB9KTtcblxuICAgIGF3YWl0IHRoaXMuc3RhcnREZXZpY2VSZXNlbGVjdGlvblRpbWVyKCk7XG4gIH1cblxuICBwcml2YXRlIGdldERpcmVjdENhbGwoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IHVuZGVmaW5lZCB8IENhbGwge1xuICAgIGNvbnN0IGNhbGwgPSBnZXRPd24odGhpcy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgcmV0dXJuIGNhbGwgaW5zdGFuY2VvZiBDYWxsID8gY2FsbCA6IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiB1bmRlZmluZWQgfCBHcm91cENhbGwge1xuICAgIGNvbnN0IGNhbGwgPSBnZXRPd24odGhpcy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgcmV0dXJuIGNhbGwgaW5zdGFuY2VvZiBHcm91cENhbGwgPyBjYWxsIDogdW5kZWZpbmVkO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRHcm91cENhbGxNZW1iZXJzKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpIHtcbiAgICByZXR1cm4gZ2V0TWVtYmVyc2hpcExpc3QoY29udmVyc2F0aW9uSWQpLm1hcChcbiAgICAgIG1lbWJlciA9PlxuICAgICAgICBuZXcgR3JvdXBNZW1iZXJJbmZvKFxuICAgICAgICAgIEJ1ZmZlci5mcm9tKHV1aWRUb0J5dGVzKG1lbWJlci51dWlkKSksXG4gICAgICAgICAgQnVmZmVyLmZyb20obWVtYmVyLnV1aWRDaXBoZXJ0ZXh0KVxuICAgICAgICApXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyBwZWVrR3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiBQcm9taXNlPFBlZWtJbmZvPiB7XG4gICAgLy8gVGhpcyBjYW4gYmUgdW5kZWZpbmVkIGluIHR3byBjYXNlczpcbiAgICAvL1xuICAgIC8vIDEuIFRoZXJlIGlzIG5vIGdyb3VwIGNhbGwgaW5zdGFuY2UuIFRoaXMgaXMgXCJzdGF0ZWxlc3MgcGVla2luZ1wiLCBhbmQgaXMgZXhwZWN0ZWRcbiAgICAvLyAgICB3aGVuIHdlIHdhbnQgdG8gcGVlayBvbiBhIGNhbGwgdGhhdCB3ZSd2ZSBuZXZlciBjb25uZWN0ZWQgdG8uXG4gICAgLy8gMi4gVGhlcmUgaXMgYSBncm91cCBjYWxsIGluc3RhbmNlIGJ1dCBSaW5nUlRDIGRvZXNuJ3QgaGF2ZSB0aGUgcGVlayBpbmZvIHlldC4gVGhpc1xuICAgIC8vICAgIHNob3VsZCBvbmx5IGhhcHBlbiBmb3IgYSBicmllZiBwZXJpb2QgYXMgeW91IGNvbm5lY3QgdG8gdGhlIGNhbGwuIChZb3UgcHJvYmFibHlcbiAgICAvLyAgICBkb24ndCB3YW50IHRvIGNhbGwgdGhpcyBmdW5jdGlvbiB3aGlsZSBhIGdyb3VwIGNhbGwgaXMgY29ubmVjdGVkXHUyMDE0eW91IHNob3VsZFxuICAgIC8vICAgIGluc3RlYWQgYmUgZ3JhYmJpbmcgdGhlIHBlZWsgaW5mbyBvZmYgb2YgdGhlIGluc3RhbmNlXHUyMDE0YnV0IHdlIGhhbmRsZSBpdCBoZXJlXG4gICAgLy8gICAgdG8gYXZvaWQgcG9zc2libGUgcmFjZSBjb25kaXRpb25zLilcbiAgICBjb25zdCBzdGF0ZWZ1bFBlZWtJbmZvID0gdGhpcy5nZXRHcm91cENhbGwoY29udmVyc2F0aW9uSWQpPy5nZXRQZWVrSW5mbygpO1xuICAgIGlmIChzdGF0ZWZ1bFBlZWtJbmZvKSB7XG4gICAgICByZXR1cm4gc3RhdGVmdWxQZWVrSW5mbztcbiAgICB9XG5cbiAgICBpZiAoIXRoaXMuc2Z1VXJsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ01pc3NpbmcgU0ZVIFVSTDsgbm90IHBlZWtpbmcgZ3JvdXAgY2FsbCcpO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTWlzc2luZyBjb252ZXJzYXRpb247IG5vdCBwZWVraW5nIGdyb3VwIGNhbGwnKTtcbiAgICB9XG4gICAgY29uc3QgcHVibGljUGFyYW1zID0gY29udmVyc2F0aW9uLmdldCgncHVibGljUGFyYW1zJyk7XG4gICAgY29uc3Qgc2VjcmV0UGFyYW1zID0gY29udmVyc2F0aW9uLmdldCgnc2VjcmV0UGFyYW1zJyk7XG4gICAgaWYgKCFwdWJsaWNQYXJhbXMgfHwgIXNlY3JldFBhcmFtcykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAnQ29udmVyc2F0aW9uIGlzIG1pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVycy4gQ2Fubm90IHBlZWsgZ3JvdXAgY2FsbCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvb2YgPSBhd2FpdCBmZXRjaE1lbWJlcnNoaXBQcm9vZih7IHB1YmxpY1BhcmFtcywgc2VjcmV0UGFyYW1zIH0pO1xuICAgIGlmICghcHJvb2YpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignTm8gbWVtYmVyc2hpcCBwcm9vZi4gQ2Fubm90IHBlZWsgZ3JvdXAgY2FsbCcpO1xuICAgIH1cbiAgICBjb25zdCBtZW1iZXJzaGlwUHJvb2YgPSBCeXRlcy5mcm9tU3RyaW5nKHByb29mKTtcblxuICAgIHJldHVybiBSaW5nUlRDLnBlZWtHcm91cENhbGwoXG4gICAgICB0aGlzLnNmdVVybCxcbiAgICAgIEJ1ZmZlci5mcm9tKG1lbWJlcnNoaXBQcm9vZiksXG4gICAgICB0aGlzLmdldEdyb3VwQ2FsbE1lbWJlcnMoY29udmVyc2F0aW9uSWQpXG4gICAgKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBDb25uZWN0IHRvIGEgY29udmVyc2F0aW9uJ3MgZ3JvdXAgY2FsbCBhbmQgY29ubmVjdCBpdCB0byBSZWR1eC5cbiAgICpcbiAgICogU2hvdWxkIG9ubHkgYmUgY2FsbGVkIHdpdGggZ3JvdXAgY2FsbC1jb21wYXRpYmxlIGNvbnZlcnNhdGlvbnMuXG4gICAqXG4gICAqIElkZW1wb3RlbnQuXG4gICAqL1xuICBjb25uZWN0R3JvdXBDYWxsKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAge1xuICAgICAgZ3JvdXBJZCxcbiAgICAgIHB1YmxpY1BhcmFtcyxcbiAgICAgIHNlY3JldFBhcmFtcyxcbiAgICB9OiB7XG4gICAgICBncm91cElkOiBzdHJpbmc7XG4gICAgICBwdWJsaWNQYXJhbXM6IHN0cmluZztcbiAgICAgIHNlY3JldFBhcmFtczogc3RyaW5nO1xuICAgIH1cbiAgKTogR3JvdXBDYWxsIHtcbiAgICBjb25zdCBleGlzdGluZyA9IHRoaXMuZ2V0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoZXhpc3RpbmcpIHtcbiAgICAgIGNvbnN0IGlzRXhpc3RpbmdDYWxsTm90Q29ubmVjdGVkID1cbiAgICAgICAgZXhpc3RpbmcuZ2V0TG9jYWxEZXZpY2VTdGF0ZSgpLmNvbm5lY3Rpb25TdGF0ZSA9PT1cbiAgICAgICAgQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZDtcbiAgICAgIGlmIChpc0V4aXN0aW5nQ2FsbE5vdENvbm5lY3RlZCkge1xuICAgICAgICBleGlzdGluZy5jb25uZWN0KCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gZXhpc3Rpbmc7XG4gICAgfVxuXG4gICAgaWYgKCF0aGlzLnNmdVVybCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdNaXNzaW5nIFNGVSBVUkw7IG5vdCBjb25uZWN0aW5nIGdyb3VwIGNhbGwnKTtcbiAgICB9XG5cbiAgICBjb25zdCBncm91cElkQnVmZmVyID0gQnVmZmVyLmZyb20oQnl0ZXMuZnJvbUJhc2U2NChncm91cElkKSk7XG5cbiAgICBsZXQgdXBkYXRlTWVzc2FnZVN0YXRlID0gR3JvdXBDYWxsVXBkYXRlTWVzc2FnZVN0YXRlLlNlbnROb3RoaW5nO1xuICAgIGxldCBpc1JlcXVlc3RpbmdNZW1iZXJzaGlwUHJvb2YgPSBmYWxzZTtcblxuICAgIGNvbnN0IG91dGVyR3JvdXBDYWxsID0gUmluZ1JUQy5nZXRHcm91cENhbGwoXG4gICAgICBncm91cElkQnVmZmVyLFxuICAgICAgdGhpcy5zZnVVcmwsXG4gICAgICBCdWZmZXIuYWxsb2MoMCksXG4gICAgICBBVURJT19MRVZFTF9JTlRFUlZBTF9NUyxcbiAgICAgIHtcbiAgICAgICAgb25Mb2NhbERldmljZVN0YXRlQ2hhbmdlZDogZ3JvdXBDYWxsID0+IHtcbiAgICAgICAgICBjb25zdCBsb2NhbERldmljZVN0YXRlID0gZ3JvdXBDYWxsLmdldExvY2FsRGV2aWNlU3RhdGUoKTtcbiAgICAgICAgICBjb25zdCB7IGVyYUlkIH0gPSBncm91cENhbGwuZ2V0UGVla0luZm8oKSB8fCB7fTtcblxuICAgICAgICAgIGlmIChcbiAgICAgICAgICAgIGxvY2FsRGV2aWNlU3RhdGUuY29ubmVjdGlvblN0YXRlID09PSBDb25uZWN0aW9uU3RhdGUuTm90Q29ubmVjdGVkXG4gICAgICAgICAgKSB7XG4gICAgICAgICAgICAvLyBOT1RFOiBUaGlzIGFzc3VtZXMgdGhhdCBvbmx5IG9uZSBjYWxsIGlzIGFjdGl2ZSBhdCBhIHRpbWUuIEZvciBleGFtcGxlLCBpZlxuICAgICAgICAgICAgLy8gICB0aGVyZSBhcmUgdHdvIGNhbGxzIHVzaW5nIHRoZSBjYW1lcmEsIHRoaXMgd2lsbCBkaXNhYmxlIGJvdGggb2YgdGhlbS5cbiAgICAgICAgICAgIC8vICAgVGhhdCdzIGZpbmUgZm9yIG5vdywgYnV0IHRoaXMgd2lsbCBicmVhayBpZiB0aGF0IGFzc3VtcHRpb24gY2hhbmdlcy5cbiAgICAgICAgICAgIHRoaXMuZGlzYWJsZUxvY2FsVmlkZW8oKTtcblxuICAgICAgICAgICAgZGVsZXRlIHRoaXMuY2FsbHNCeUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF07XG5cbiAgICAgICAgICAgIGlmIChcbiAgICAgICAgICAgICAgdXBkYXRlTWVzc2FnZVN0YXRlID09PSBHcm91cENhbGxVcGRhdGVNZXNzYWdlU3RhdGUuU2VudEpvaW4gJiZcbiAgICAgICAgICAgICAgZXJhSWRcbiAgICAgICAgICAgICkge1xuICAgICAgICAgICAgICB1cGRhdGVNZXNzYWdlU3RhdGUgPSBHcm91cENhbGxVcGRhdGVNZXNzYWdlU3RhdGUuU2VudExlZnQ7XG4gICAgICAgICAgICAgIHRoaXMuc2VuZEdyb3VwQ2FsbFVwZGF0ZU1lc3NhZ2UoY29udmVyc2F0aW9uSWQsIGVyYUlkKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgdGhpcy5jYWxsc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXSA9IGdyb3VwQ2FsbDtcblxuICAgICAgICAgICAgLy8gTk9URTogVGhpcyBhc3N1bWVzIG9ubHkgb25lIGFjdGl2ZSBjYWxsIGF0IGEgdGltZS4gU2VlIGNvbW1lbnQgYWJvdmUuXG4gICAgICAgICAgICBpZiAobG9jYWxEZXZpY2VTdGF0ZS52aWRlb011dGVkKSB7XG4gICAgICAgICAgICAgIHRoaXMuZGlzYWJsZUxvY2FsVmlkZW8oKTtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHRoaXMudmlkZW9DYXB0dXJlci5lbmFibGVDYXB0dXJlQW5kU2VuZChncm91cENhbGwpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoXG4gICAgICAgICAgICAgIHVwZGF0ZU1lc3NhZ2VTdGF0ZSA9PT0gR3JvdXBDYWxsVXBkYXRlTWVzc2FnZVN0YXRlLlNlbnROb3RoaW5nICYmXG4gICAgICAgICAgICAgIGxvY2FsRGV2aWNlU3RhdGUuam9pblN0YXRlID09PSBKb2luU3RhdGUuSm9pbmVkICYmXG4gICAgICAgICAgICAgIGVyYUlkXG4gICAgICAgICAgICApIHtcbiAgICAgICAgICAgICAgdXBkYXRlTWVzc2FnZVN0YXRlID0gR3JvdXBDYWxsVXBkYXRlTWVzc2FnZVN0YXRlLlNlbnRKb2luO1xuICAgICAgICAgICAgICB0aGlzLnNlbmRHcm91cENhbGxVcGRhdGVNZXNzYWdlKGNvbnZlcnNhdGlvbklkLCBlcmFJZCk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgdGhpcy5zeW5jR3JvdXBDYWxsVG9SZWR1eChjb252ZXJzYXRpb25JZCwgZ3JvdXBDYWxsKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25SZW1vdGVEZXZpY2VTdGF0ZXNDaGFuZ2VkOiBncm91cENhbGwgPT4ge1xuICAgICAgICAgIHRoaXMuc3luY0dyb3VwQ2FsbFRvUmVkdXgoY29udmVyc2F0aW9uSWQsIGdyb3VwQ2FsbCk7XG4gICAgICAgIH0sXG4gICAgICAgIG9uQXVkaW9MZXZlbHM6IGdyb3VwQ2FsbCA9PiB7XG4gICAgICAgICAgY29uc3QgcmVtb3RlRGV2aWNlU3RhdGVzID0gZ3JvdXBDYWxsLmdldFJlbW90ZURldmljZVN0YXRlcygpO1xuICAgICAgICAgIGlmICghcmVtb3RlRGV2aWNlU3RhdGVzKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIGNvbnN0IGxvY2FsQXVkaW9MZXZlbCA9IGdyb3VwQ2FsbC5nZXRMb2NhbERldmljZVN0YXRlKCkuYXVkaW9MZXZlbDtcblxuICAgICAgICAgIHRoaXMudXhBY3Rpb25zPy5ncm91cENhbGxBdWRpb0xldmVsc0NoYW5nZSh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgIGxvY2FsQXVkaW9MZXZlbCxcbiAgICAgICAgICAgIHJlbW90ZURldmljZVN0YXRlcyxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSxcbiAgICAgICAgb25QZWVrQ2hhbmdlZDogZ3JvdXBDYWxsID0+IHtcbiAgICAgICAgICBjb25zdCBsb2NhbERldmljZVN0YXRlID0gZ3JvdXBDYWxsLmdldExvY2FsRGV2aWNlU3RhdGUoKTtcbiAgICAgICAgICBjb25zdCB7IGVyYUlkIH0gPSBncm91cENhbGwuZ2V0UGVla0luZm8oKSB8fCB7fTtcbiAgICAgICAgICBpZiAoXG4gICAgICAgICAgICB1cGRhdGVNZXNzYWdlU3RhdGUgPT09IEdyb3VwQ2FsbFVwZGF0ZU1lc3NhZ2VTdGF0ZS5TZW50Tm90aGluZyAmJlxuICAgICAgICAgICAgbG9jYWxEZXZpY2VTdGF0ZS5jb25uZWN0aW9uU3RhdGUgIT09IENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWQgJiZcbiAgICAgICAgICAgIGxvY2FsRGV2aWNlU3RhdGUuam9pblN0YXRlID09PSBKb2luU3RhdGUuSm9pbmVkICYmXG4gICAgICAgICAgICBlcmFJZFxuICAgICAgICAgICkge1xuICAgICAgICAgICAgdXBkYXRlTWVzc2FnZVN0YXRlID0gR3JvdXBDYWxsVXBkYXRlTWVzc2FnZVN0YXRlLlNlbnRKb2luO1xuICAgICAgICAgICAgdGhpcy5zZW5kR3JvdXBDYWxsVXBkYXRlTWVzc2FnZShjb252ZXJzYXRpb25JZCwgZXJhSWQpO1xuICAgICAgICAgIH1cblxuICAgICAgICAgIHRoaXMudXBkYXRlQ2FsbEhpc3RvcnlGb3JHcm91cENhbGwoXG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgIGdyb3VwQ2FsbC5nZXRQZWVrSW5mbygpXG4gICAgICAgICAgKTtcbiAgICAgICAgICB0aGlzLnN5bmNHcm91cENhbGxUb1JlZHV4KGNvbnZlcnNhdGlvbklkLCBncm91cENhbGwpO1xuICAgICAgICB9LFxuICAgICAgICBhc3luYyByZXF1ZXN0TWVtYmVyc2hpcFByb29mKGdyb3VwQ2FsbCkge1xuICAgICAgICAgIGlmIChpc1JlcXVlc3RpbmdNZW1iZXJzaGlwUHJvb2YpIHtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICB9XG4gICAgICAgICAgaXNSZXF1ZXN0aW5nTWVtYmVyc2hpcFByb29mID0gdHJ1ZTtcbiAgICAgICAgICB0cnkge1xuICAgICAgICAgICAgY29uc3QgcHJvb2YgPSBhd2FpdCBmZXRjaE1lbWJlcnNoaXBQcm9vZih7XG4gICAgICAgICAgICAgIHB1YmxpY1BhcmFtcyxcbiAgICAgICAgICAgICAgc2VjcmV0UGFyYW1zLFxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICBpZiAocHJvb2YpIHtcbiAgICAgICAgICAgICAgZ3JvdXBDYWxsLnNldE1lbWJlcnNoaXBQcm9vZihcbiAgICAgICAgICAgICAgICBCdWZmZXIuZnJvbShCeXRlcy5mcm9tU3RyaW5nKHByb29mKSlcbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgICAgICAgIGxvZy5lcnJvcignRmFpbGVkIHRvIGZldGNoIG1lbWJlcnNoaXAgcHJvb2YnLCBlcnIpO1xuICAgICAgICAgIH0gZmluYWxseSB7XG4gICAgICAgICAgICBpc1JlcXVlc3RpbmdNZW1iZXJzaGlwUHJvb2YgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHJlcXVlc3RHcm91cE1lbWJlcnM6IGdyb3VwQ2FsbCA9PiB7XG4gICAgICAgICAgZ3JvdXBDYWxsLnNldEdyb3VwTWVtYmVycyh0aGlzLmdldEdyb3VwQ2FsbE1lbWJlcnMoY29udmVyc2F0aW9uSWQpKTtcbiAgICAgICAgfSxcbiAgICAgICAgb25FbmRlZDogbm9vcCxcbiAgICAgIH1cbiAgICApO1xuXG4gICAgaWYgKCFvdXRlckdyb3VwQ2FsbCkge1xuICAgICAgLy8gVGhpcyBzaG91bGQgYmUgdmVyeSByYXJlLCBsaWtlbHkgZHVlIHRvIFJpbmdSVEMgbm90IGJlaW5nIGFibGUgdG8gZ2V0IGEgbG9ja1xuICAgICAgLy8gICBvciBtZW1vcnkgb3Igc29tZXRoaW5nIGxpa2UgdGhhdC5cbiAgICAgIHRocm93IG5ldyBFcnJvcignRmFpbGVkIHRvIGdldCBhIGdyb3VwIGNhbGwgaW5zdGFuY2U7IGNhbm5vdCBzdGFydCBjYWxsJyk7XG4gICAgfVxuXG4gICAgb3V0ZXJHcm91cENhbGwuY29ubmVjdCgpO1xuXG4gICAgdGhpcy5zeW5jR3JvdXBDYWxsVG9SZWR1eChjb252ZXJzYXRpb25JZCwgb3V0ZXJHcm91cENhbGwpO1xuXG4gICAgcmV0dXJuIG91dGVyR3JvdXBDYWxsO1xuICB9XG5cbiAgcHVibGljIGFzeW5jIGpvaW5Hcm91cENhbGwoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICBoYXNMb2NhbEF1ZGlvOiBib29sZWFuLFxuICAgIGhhc0xvY2FsVmlkZW86IGJvb2xlYW4sXG4gICAgc2hvdWxkUmluZzogYm9vbGVhblxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPVxuICAgICAgd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKT8uZm9ybWF0KCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyBjb252ZXJzYXRpb247IG5vdCBqb2luaW5nIGdyb3VwIGNhbGwnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoXG4gICAgICAhY29udmVyc2F0aW9uLmdyb3VwSWQgfHxcbiAgICAgICFjb252ZXJzYXRpb24ucHVibGljUGFyYW1zIHx8XG4gICAgICAhY29udmVyc2F0aW9uLnNlY3JldFBhcmFtc1xuICAgICkge1xuICAgICAgbG9nLmVycm9yKFxuICAgICAgICAnQ29udmVyc2F0aW9uIGlzIG1pc3NpbmcgcmVxdWlyZWQgcGFyYW1ldGVycy4gQ2Fubm90IGpvaW4gZ3JvdXAgY2FsbCdcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgYXdhaXQgdGhpcy5zdGFydERldmljZVJlc2VsZWN0aW9uVGltZXIoKTtcblxuICAgIGNvbnN0IGdyb3VwQ2FsbCA9IHRoaXMuY29ubmVjdEdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCwge1xuICAgICAgZ3JvdXBJZDogY29udmVyc2F0aW9uLmdyb3VwSWQsXG4gICAgICBwdWJsaWNQYXJhbXM6IGNvbnZlcnNhdGlvbi5wdWJsaWNQYXJhbXMsXG4gICAgICBzZWNyZXRQYXJhbXM6IGNvbnZlcnNhdGlvbi5zZWNyZXRQYXJhbXMsXG4gICAgfSk7XG5cbiAgICBncm91cENhbGwuc2V0T3V0Z29pbmdBdWRpb011dGVkKCFoYXNMb2NhbEF1ZGlvKTtcbiAgICBncm91cENhbGwuc2V0T3V0Z29pbmdWaWRlb011dGVkKCFoYXNMb2NhbFZpZGVvKTtcbiAgICB0aGlzLnZpZGVvQ2FwdHVyZXIuZW5hYmxlQ2FwdHVyZUFuZFNlbmQoZ3JvdXBDYWxsKTtcblxuICAgIGlmIChzaG91bGRSaW5nKSB7XG4gICAgICBncm91cENhbGwucmluZ0FsbCgpO1xuICAgIH1cblxuICAgIGdyb3VwQ2FsbC5qb2luKCk7XG4gIH1cblxuICBwcml2YXRlIGdldENhbGxJZEZvckNvbnZlcnNhdGlvbihjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdW5kZWZpbmVkIHwgQ2FsbElkIHtcbiAgICByZXR1cm4gdGhpcy5nZXREaXJlY3RDYWxsKGNvbnZlcnNhdGlvbklkKT8uY2FsbElkO1xuICB9XG5cbiAgcHVibGljIHNldEdyb3VwQ2FsbFZpZGVvUmVxdWVzdChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIHJlc29sdXRpb25zOiBBcnJheTxWaWRlb1JlcXVlc3Q+XG4gICk6IHZvaWQge1xuICAgIHRoaXMuZ2V0R3JvdXBDYWxsKGNvbnZlcnNhdGlvbklkKT8ucmVxdWVzdFZpZGVvKHJlc29sdXRpb25zKTtcbiAgfVxuXG4gIHB1YmxpYyBncm91cE1lbWJlcnNDaGFuZ2VkKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcpOiB2b2lkIHtcbiAgICAvLyBUaGlzIHdpbGwgYmUgY2FsbGVkIGZvciBhbnkgY29udmVyc2F0aW9uIGNoYW5nZSwgc28gaXQncyBsaWtlbHkgdGhhdCB0aGVyZSB3b24ndFxuICAgIC8vICAgYmUgYSBncm91cCBjYWxsIGF2YWlsYWJsZTsgdGhhdCdzIGZpbmUuXG4gICAgY29uc3QgZ3JvdXBDYWxsID0gdGhpcy5nZXRHcm91cENhbGwoY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghZ3JvdXBDYWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgZ3JvdXBDYWxsLnNldEdyb3VwTWVtYmVycyh0aGlzLmdldEdyb3VwQ2FsbE1lbWJlcnMoY29udmVyc2F0aW9uSWQpKTtcbiAgfVxuXG4gIC8vIFNlZSB0aGUgY29tbWVudCBpbiB0eXBlcy9DYWxsaW5nLnRzIHRvIGV4cGxhaW4gd2h5IHdlIGhhdmUgdG8gZG8gdGhpcyBjb252ZXJzaW9uLlxuICBwcml2YXRlIGNvbnZlcnRSaW5nUnRjQ29ubmVjdGlvblN0YXRlKFxuICAgIGNvbm5lY3Rpb25TdGF0ZTogQ29ubmVjdGlvblN0YXRlXG4gICk6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSB7XG4gICAgc3dpdGNoIChjb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgIGNhc2UgQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZDpcbiAgICAgICAgcmV0dXJuIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWQ7XG4gICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nOlxuICAgICAgICByZXR1cm4gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3Rpbmc7XG4gICAgICBjYXNlIENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQ6XG4gICAgICAgIHJldHVybiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkO1xuICAgICAgY2FzZSBDb25uZWN0aW9uU3RhdGUuUmVjb25uZWN0aW5nOlxuICAgICAgICByZXR1cm4gR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLlJlY29ubmVjdGluZztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY29ubmVjdGlvblN0YXRlKTtcbiAgICB9XG4gIH1cblxuICAvLyBTZWUgdGhlIGNvbW1lbnQgaW4gdHlwZXMvQ2FsbGluZy50cyB0byBleHBsYWluIHdoeSB3ZSBoYXZlIHRvIGRvIHRoaXMgY29udmVyc2lvbi5cbiAgcHJpdmF0ZSBjb252ZXJ0UmluZ1J0Y0pvaW5TdGF0ZShqb2luU3RhdGU6IEpvaW5TdGF0ZSk6IEdyb3VwQ2FsbEpvaW5TdGF0ZSB7XG4gICAgc3dpdGNoIChqb2luU3RhdGUpIHtcbiAgICAgIGNhc2UgSm9pblN0YXRlLk5vdEpvaW5lZDpcbiAgICAgICAgcmV0dXJuIEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQ7XG4gICAgICBjYXNlIEpvaW5TdGF0ZS5Kb2luaW5nOlxuICAgICAgICByZXR1cm4gR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5pbmc7XG4gICAgICBjYXNlIEpvaW5TdGF0ZS5Kb2luZWQ6XG4gICAgICAgIHJldHVybiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihqb2luU3RhdGUpO1xuICAgIH1cbiAgfVxuXG4gIHB1YmxpYyBmb3JtYXRHcm91cENhbGxQZWVrSW5mb0ZvclJlZHV4KFxuICAgIHBlZWtJbmZvOiBQZWVrSW5mb1xuICApOiBHcm91cENhbGxQZWVrSW5mb1R5cGUge1xuICAgIHJldHVybiB7XG4gICAgICB1dWlkczogcGVla0luZm8uZGV2aWNlcy5tYXAocGVla0RldmljZUluZm8gPT4ge1xuICAgICAgICBpZiAocGVla0RldmljZUluZm8udXNlcklkKSB7XG4gICAgICAgICAgY29uc3QgdXVpZCA9IGJ5dGVzVG9VdWlkKHBlZWtEZXZpY2VJbmZvLnVzZXJJZCk7XG4gICAgICAgICAgaWYgKHV1aWQpIHtcbiAgICAgICAgICAgIHJldHVybiB1dWlkO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZy5mb3JtYXRHcm91cENhbGxQZWVrSW5mb0ZvclJlZHV4OiBjb3VsZCBub3QgY29udmVydCBwZWVrIFVVSUQgVWludDhBcnJheSB0byBzdHJpbmc7IHVzaW5nIGZhbGxiYWNrIFVVSUQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBsb2cuZXJyb3IoXG4gICAgICAgICAgICAnQ2FsbGluZy5mb3JtYXRHcm91cENhbGxQZWVrSW5mb0ZvclJlZHV4OiBkZXZpY2UgaGFkIG5vIHVzZXIgSUQ7IHVzaW5nIGZhbGxiYWNrIFVVSUQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gJzAwMDAwMDAwLTAwMDAtNDAwMC04MDAwLTAwMDAwMDAwMDAwMCc7XG4gICAgICB9KSxcbiAgICAgIGNyZWF0b3JVdWlkOiBwZWVrSW5mby5jcmVhdG9yICYmIGJ5dGVzVG9VdWlkKHBlZWtJbmZvLmNyZWF0b3IpLFxuICAgICAgZXJhSWQ6IHBlZWtJbmZvLmVyYUlkLFxuICAgICAgbWF4RGV2aWNlczogcGVla0luZm8ubWF4RGV2aWNlcyA/PyBJbmZpbml0eSxcbiAgICAgIGRldmljZUNvdW50OiBwZWVrSW5mby5kZXZpY2VDb3VudCxcbiAgICB9O1xuICB9XG5cbiAgcHJpdmF0ZSBmb3JtYXRHcm91cENhbGxGb3JSZWR1eChncm91cENhbGw6IEdyb3VwQ2FsbCkge1xuICAgIGNvbnN0IGxvY2FsRGV2aWNlU3RhdGUgPSBncm91cENhbGwuZ2V0TG9jYWxEZXZpY2VTdGF0ZSgpO1xuICAgIGNvbnN0IHBlZWtJbmZvID0gZ3JvdXBDYWxsLmdldFBlZWtJbmZvKCk7XG5cbiAgICAvLyBSaW5nUlRDIGRvZXNuJ3QgZW5zdXJlIHRoYXQgdGhlIGRlbXV4IElEIGlzIHVuaXF1ZS4gVGhpcyBjYW4gaGFwcGVuIGlmIHNvbWVvbmVcbiAgICAvLyAgIGxlYXZlcyB0aGUgY2FsbCBhbmQgcXVpY2tseSByZWpvaW5zOyBSaW5nUlRDIHdpbGwgdGVsbCB1cyB0aGF0IHRoZXJlIGFyZSB0d29cbiAgICAvLyAgIHBhcnRpY2lwYW50cyB3aXRoIHRoZSBzYW1lIGRlbXV4IElEIGluIHRoZSBjYWxsLiBUaGlzIHNob3VsZCBiZSByYXJlLlxuICAgIGNvbnN0IHJlbW90ZURldmljZVN0YXRlcyA9IHVuaXFCeShcbiAgICAgIGdyb3VwQ2FsbC5nZXRSZW1vdGVEZXZpY2VTdGF0ZXMoKSB8fCBbXSxcbiAgICAgIHJlbW90ZURldmljZVN0YXRlID0+IHJlbW90ZURldmljZVN0YXRlLmRlbXV4SWRcbiAgICApO1xuXG4gICAgLy8gSXQgc2hvdWxkIGJlIGltcG9zc2libGUgdG8gYmUgZGlzY29ubmVjdGVkIGFuZCBKb2luaW5nIG9yIEpvaW5lZC4gSnVzdCBpbiBjYXNlLCB3ZVxuICAgIC8vICAgdHJ5IHRvIGhhbmRsZSB0aGF0IGNhc2UuXG4gICAgY29uc3Qgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUgPVxuICAgICAgbG9jYWxEZXZpY2VTdGF0ZS5jb25uZWN0aW9uU3RhdGUgPT09IENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWRcbiAgICAgICAgPyBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkXG4gICAgICAgIDogdGhpcy5jb252ZXJ0UmluZ1J0Y0pvaW5TdGF0ZShsb2NhbERldmljZVN0YXRlLmpvaW5TdGF0ZSk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgY29ubmVjdGlvblN0YXRlOiB0aGlzLmNvbnZlcnRSaW5nUnRjQ29ubmVjdGlvblN0YXRlKFxuICAgICAgICBsb2NhbERldmljZVN0YXRlLmNvbm5lY3Rpb25TdGF0ZVxuICAgICAgKSxcbiAgICAgIGpvaW5TdGF0ZSxcbiAgICAgIGhhc0xvY2FsQXVkaW86ICFsb2NhbERldmljZVN0YXRlLmF1ZGlvTXV0ZWQsXG4gICAgICBoYXNMb2NhbFZpZGVvOiAhbG9jYWxEZXZpY2VTdGF0ZS52aWRlb011dGVkLFxuICAgICAgcGVla0luZm86IHBlZWtJbmZvXG4gICAgICAgID8gdGhpcy5mb3JtYXRHcm91cENhbGxQZWVrSW5mb0ZvclJlZHV4KHBlZWtJbmZvKVxuICAgICAgICA6IHVuZGVmaW5lZCxcbiAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogcmVtb3RlRGV2aWNlU3RhdGVzLm1hcChyZW1vdGVEZXZpY2VTdGF0ZSA9PiB7XG4gICAgICAgIGxldCB1dWlkID0gYnl0ZXNUb1V1aWQocmVtb3RlRGV2aWNlU3RhdGUudXNlcklkKTtcbiAgICAgICAgaWYgKCF1dWlkKSB7XG4gICAgICAgICAgbG9nLmVycm9yKFxuICAgICAgICAgICAgJ0NhbGxpbmcuZm9ybWF0R3JvdXBDYWxsRm9yUmVkdXg6IGNvdWxkIG5vdCBjb252ZXJ0IHJlbW90ZSBwYXJ0aWNpcGFudCBVVUlEIFVpbnQ4QXJyYXkgdG8gc3RyaW5nOyB1c2luZyBmYWxsYmFjayBVVUlEJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgdXVpZCA9ICcwMDAwMDAwMC0wMDAwLTQwMDAtODAwMC0wMDAwMDAwMDAwMDAnO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgdXVpZCxcbiAgICAgICAgICBkZW11eElkOiByZW1vdGVEZXZpY2VTdGF0ZS5kZW11eElkLFxuICAgICAgICAgIGhhc1JlbW90ZUF1ZGlvOiAhcmVtb3RlRGV2aWNlU3RhdGUuYXVkaW9NdXRlZCxcbiAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogIXJlbW90ZURldmljZVN0YXRlLnZpZGVvTXV0ZWQsXG4gICAgICAgICAgcHJlc2VudGluZzogQm9vbGVhbihyZW1vdGVEZXZpY2VTdGF0ZS5wcmVzZW50aW5nKSxcbiAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBCb29sZWFuKHJlbW90ZURldmljZVN0YXRlLnNoYXJpbmdTY3JlZW4pLFxuICAgICAgICAgIHNwZWFrZXJUaW1lOiBub3JtYWxpemVHcm91cENhbGxUaW1lc3RhbXAoXG4gICAgICAgICAgICByZW1vdGVEZXZpY2VTdGF0ZS5zcGVha2VyVGltZVxuICAgICAgICAgICksXG4gICAgICAgICAgLy8gSWYgUmluZ1JUQyBkb2Vzbid0IHNlbmQgdXMgYW4gYXNwZWN0IHJhdGlvLCB3ZSBtYWtlIGEgZ3Vlc3MuXG4gICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzpcbiAgICAgICAgICAgIHJlbW90ZURldmljZVN0YXRlLnZpZGVvQXNwZWN0UmF0aW8gfHxcbiAgICAgICAgICAgIChyZW1vdGVEZXZpY2VTdGF0ZS52aWRlb011dGVkID8gMSA6IDQgLyAzKSxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH1cblxuICBwdWJsaWMgZ2V0R3JvdXBDYWxsVmlkZW9GcmFtZVNvdXJjZShcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIGRlbXV4SWQ6IG51bWJlclxuICApOiBWaWRlb0ZyYW1lU291cmNlIHtcbiAgICBjb25zdCBncm91cENhbGwgPSB0aGlzLmdldEdyb3VwQ2FsbChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFncm91cENhbGwpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignQ291bGQgbm90IGZpbmQgbWF0Y2hpbmcgY2FsbCcpO1xuICAgIH1cbiAgICByZXR1cm4gZ3JvdXBDYWxsLmdldFZpZGVvU291cmNlKGRlbXV4SWQpO1xuICB9XG5cbiAgcHVibGljIHJlc2VuZEdyb3VwQ2FsbE1lZGlhS2V5cyhjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgY29uc3QgZ3JvdXBDYWxsID0gdGhpcy5nZXRHcm91cENhbGwoY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghZ3JvdXBDYWxsKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ0NvdWxkIG5vdCBmaW5kIG1hdGNoaW5nIGNhbGwnKTtcbiAgICB9XG4gICAgZ3JvdXBDYWxsLnJlc2VuZE1lZGlhS2V5cygpO1xuICB9XG5cbiAgcHJpdmF0ZSBzeW5jR3JvdXBDYWxsVG9SZWR1eChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIGdyb3VwQ2FsbDogR3JvdXBDYWxsXG4gICk6IHZvaWQge1xuICAgIHRoaXMudXhBY3Rpb25zPy5ncm91cENhbGxTdGF0ZUNoYW5nZSh7XG4gICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgIC4uLnRoaXMuZm9ybWF0R3JvdXBDYWxsRm9yUmVkdXgoZ3JvdXBDYWxsKSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc2VuZEdyb3VwQ2FsbFVwZGF0ZU1lc3NhZ2UoXG4gICAgY29udmVyc2F0aW9uSWQ6IHN0cmluZyxcbiAgICBlcmFJZDogc3RyaW5nXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ1VuYWJsZSB0byBzZW5kIGdyb3VwIGNhbGwgdXBkYXRlIG1lc3NhZ2UgZm9yIG5vbi1leGlzdGVudCBjb252ZXJzYXRpb24nXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGdyb3VwVjIgPSBjb252ZXJzYXRpb24uZ2V0R3JvdXBWMkluZm8oKTtcbiAgICBjb25zdCBzZW5kT3B0aW9ucyA9IGF3YWl0IGdldFNlbmRPcHRpb25zKGNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKTtcbiAgICBpZiAoIWdyb3VwVjIpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ1VuYWJsZSB0byBzZW5kIGdyb3VwIGNhbGwgdXBkYXRlIG1lc3NhZ2UgZm9yIGNvbnZlcnNhdGlvbiB0aGF0IGxhY2tzIGdyb3VwVjIgaW5mbydcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgdGltZXN0YW1wID0gRGF0ZS5ub3coKTtcblxuICAgIC8vIFdlIFwiZmlyZSBhbmQgZm9yZ2V0XCIgYmVjYXVzZSBzZW5kaW5nIHRoaXMgbWVzc2FnZSBpcyBub24tZXNzZW50aWFsLlxuICAgIGNvbnN0IHsgQ29udGVudEhpbnQgfSA9IFByb3RvLlVuaWRlbnRpZmllZFNlbmRlck1lc3NhZ2UuTWVzc2FnZTtcbiAgICB3cmFwV2l0aFN5bmNNZXNzYWdlU2VuZCh7XG4gICAgICBjb252ZXJzYXRpb24sXG4gICAgICBsb2dJZDogYHNlbmRUb0dyb3VwL2dyb3VwQ2FsbFVwZGF0ZS8ke2NvbnZlcnNhdGlvbklkfS0ke2VyYUlkfWAsXG4gICAgICBtZXNzYWdlSWRzOiBbXSxcbiAgICAgIHNlbmQ6ICgpID0+XG4gICAgICAgIGNvbnZlcnNhdGlvbi5xdWV1ZUpvYignc2VuZEdyb3VwQ2FsbFVwZGF0ZU1lc3NhZ2UnLCAoKSA9PlxuICAgICAgICAgIHdpbmRvdy5TaWduYWwuVXRpbC5zZW5kVG9Hcm91cCh7XG4gICAgICAgICAgICBjb250ZW50SGludDogQ29udGVudEhpbnQuREVGQVVMVCxcbiAgICAgICAgICAgIGdyb3VwU2VuZE9wdGlvbnM6IHtcbiAgICAgICAgICAgICAgZ3JvdXBDYWxsVXBkYXRlOiB7IGVyYUlkIH0sXG4gICAgICAgICAgICAgIGdyb3VwVjIsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBtZXNzYWdlSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHNlbmRPcHRpb25zLFxuICAgICAgICAgICAgc2VuZFRhcmdldDogY29udmVyc2F0aW9uLnRvU2VuZGVyS2V5VGFyZ2V0KCksXG4gICAgICAgICAgICBzZW5kVHlwZTogJ2NhbGxpbmdNZXNzYWdlJyxcbiAgICAgICAgICB9KVxuICAgICAgICApLFxuICAgICAgc2VuZFR5cGU6ICdjYWxsaW5nTWVzc2FnZScsXG4gICAgICB0aW1lc3RhbXAsXG4gICAgfSkuY2F0Y2goZXJyID0+IHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ0ZhaWxlZCB0byBzZW5kIGdyb3VwIGNhbGwgdXBkYXRlOicsXG4gICAgICAgIGVyciAmJiBlcnIuc3RhY2sgPyBlcnIuc3RhY2sgOiBlcnJcbiAgICAgICk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBhY2NlcHREaXJlY3RDYWxsKFxuICAgIGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsXG4gICAgYXNWaWRlb0NhbGw6IGJvb2xlYW5cbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5hY2NlcHREaXJlY3RDYWxsKCknKTtcblxuICAgIGNvbnN0IGNhbGxJZCA9IHRoaXMuZ2V0Q2FsbElkRm9yQ29udmVyc2F0aW9uKGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIWNhbGxJZCkge1xuICAgICAgbG9nLndhcm4oJ1RyeWluZyB0byBhY2NlcHQgYSBub24tZXhpc3RlbnQgY2FsbCcpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGhhdmVNZWRpYVBlcm1pc3Npb25zID0gYXdhaXQgdGhpcy5yZXF1ZXN0UGVybWlzc2lvbnMoYXNWaWRlb0NhbGwpO1xuICAgIGlmIChoYXZlTWVkaWFQZXJtaXNzaW9ucykge1xuICAgICAgYXdhaXQgdGhpcy5zdGFydERldmljZVJlc2VsZWN0aW9uVGltZXIoKTtcbiAgICAgIFJpbmdSVEMuc2V0VmlkZW9DYXB0dXJlcihjYWxsSWQsIHRoaXMudmlkZW9DYXB0dXJlcik7XG4gICAgICBSaW5nUlRDLnNldFZpZGVvUmVuZGVyZXIoY2FsbElkLCB0aGlzLnZpZGVvUmVuZGVyZXIpO1xuICAgICAgUmluZ1JUQy5hY2NlcHQoY2FsbElkLCBhc1ZpZGVvQ2FsbCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGxvZy5pbmZvKCdQZXJtaXNzaW9ucyB3ZXJlIGRlbmllZCwgY2FsbCBub3QgYWxsb3dlZCwgaGFuZ2luZyB1cC4nKTtcbiAgICAgIFJpbmdSVEMuaGFuZ3VwKGNhbGxJZCk7XG4gICAgfVxuICB9XG5cbiAgZGVjbGluZURpcmVjdENhbGwoY29udmVyc2F0aW9uSWQ6IHN0cmluZyk6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdDYWxsaW5nQ2xhc3MuZGVjbGluZURpcmVjdENhbGwoKScpO1xuXG4gICAgY29uc3QgY2FsbElkID0gdGhpcy5nZXRDYWxsSWRGb3JDb252ZXJzYXRpb24oY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghY2FsbElkKSB7XG4gICAgICBsb2cud2FybignZGVjbGluZURpcmVjdENhbGw6IFRyeWluZyB0byBkZWNsaW5lIGEgbm9uLWV4aXN0ZW50IGNhbGwnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBSaW5nUlRDLmRlY2xpbmUoY2FsbElkKTtcbiAgfVxuXG4gIGRlY2xpbmVHcm91cENhbGwoY29udmVyc2F0aW9uSWQ6IHN0cmluZywgcmluZ0lkOiBiaWdpbnQpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnQ2FsbGluZ0NsYXNzLmRlY2xpbmVHcm91cENhbGwoKScpO1xuXG4gICAgY29uc3QgZ3JvdXBJZCA9XG4gICAgICB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY29udmVyc2F0aW9uSWQpPy5nZXQoJ2dyb3VwSWQnKTtcbiAgICBpZiAoIWdyb3VwSWQpIHtcbiAgICAgIGxvZy5lcnJvcihcbiAgICAgICAgJ2RlY2xpbmVHcm91cENhbGw6IGNvdWxkIG5vdCBmaW5kIHRoZSBncm91cCBJRCBmb3IgdGhhdCBjb252ZXJzYXRpb24nXG4gICAgICApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBncm91cElkQnVmZmVyID0gQnVmZmVyLmZyb20oQnl0ZXMuZnJvbUJhc2U2NChncm91cElkKSk7XG5cbiAgICBSaW5nUlRDLmNhbmNlbEdyb3VwUmluZyhcbiAgICAgIGdyb3VwSWRCdWZmZXIsXG4gICAgICByaW5nSWQsXG4gICAgICBSaW5nQ2FuY2VsUmVhc29uLkRlY2xpbmVkQnlVc2VyXG4gICAgKTtcbiAgfVxuXG4gIGhhbmd1cChjb252ZXJzYXRpb25JZDogc3RyaW5nKTogdm9pZCB7XG4gICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5oYW5ndXAoKScpO1xuXG4gICAgY29uc3Qgc3BlY2lmaWNDYWxsID0gZ2V0T3duKHRoaXMuY2FsbHNCeUNvbnZlcnNhdGlvbiwgY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghc3BlY2lmaWNDYWxsKSB7XG4gICAgICBsb2cuZXJyb3IoXG4gICAgICAgIGBoYW5ndXA6IFRyeWluZyB0byBoYW5nIHVwIGEgbm9uLWV4aXN0ZW50IGNhbGwgZm9yIGNvbnZlcnNhdGlvbiAke2NvbnZlcnNhdGlvbklkfWBcbiAgICAgICk7XG4gICAgfVxuXG4gICAgaXBjUmVuZGVyZXIuc2VuZCgnY2xvc2Utc2NyZWVuLXNoYXJlLWNvbnRyb2xsZXInKTtcblxuICAgIGNvbnN0IGVudHJpZXMgPSBPYmplY3QuZW50cmllcyh0aGlzLmNhbGxzQnlDb252ZXJzYXRpb24pO1xuICAgIGxvZy5pbmZvKGBoYW5ndXA6ICR7ZW50cmllcy5sZW5ndGh9IGNhbGwocykgdG8gaGFuZyB1cC4uLmApO1xuXG4gICAgZW50cmllcy5mb3JFYWNoKChbY2FsbENvbnZlcnNhdGlvbklkLCBjYWxsXSkgPT4ge1xuICAgICAgbG9nLmluZm8oYGhhbmd1cDogSGFuZ2luZyB1cCBjb252ZXJzYXRpb24gJHtjYWxsQ29udmVyc2F0aW9uSWR9YCk7XG4gICAgICBpZiAoY2FsbCBpbnN0YW5jZW9mIENhbGwpIHtcbiAgICAgICAgUmluZ1JUQy5oYW5ndXAoY2FsbC5jYWxsSWQpO1xuICAgICAgfSBlbHNlIGlmIChjYWxsIGluc3RhbmNlb2YgR3JvdXBDYWxsKSB7XG4gICAgICAgIC8vIFRoaXMgZW5zdXJlcyB0aGF0IHdlIHR1cm4gb2ZmIG91ciBkZXZpY2VzLlxuICAgICAgICBjYWxsLnNldE91dGdvaW5nQXVkaW9NdXRlZCh0cnVlKTtcbiAgICAgICAgY2FsbC5zZXRPdXRnb2luZ1ZpZGVvTXV0ZWQodHJ1ZSk7XG4gICAgICAgIGNhbGwuZGlzY29ubmVjdCgpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgdGhyb3cgbWlzc2luZ0Nhc2VFcnJvcihjYWxsKTtcbiAgICAgIH1cbiAgICB9KTtcblxuICAgIGxvZy5pbmZvKCdoYW5ndXA6IERvbmUuJyk7XG4gIH1cblxuICBzZXRPdXRnb2luZ0F1ZGlvKGNvbnZlcnNhdGlvbklkOiBzdHJpbmcsIGVuYWJsZWQ6IGJvb2xlYW4pOiB2b2lkIHtcbiAgICBjb25zdCBjYWxsID0gZ2V0T3duKHRoaXMuY2FsbHNCeUNvbnZlcnNhdGlvbiwgY29udmVyc2F0aW9uSWQpO1xuICAgIGlmICghY2FsbCkge1xuICAgICAgbG9nLndhcm4oJ1RyeWluZyB0byBzZXQgb3V0Z29pbmcgYXVkaW8gZm9yIGEgbm9uLWV4aXN0ZW50IGNhbGwnKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2FsbCBpbnN0YW5jZW9mIENhbGwpIHtcbiAgICAgIFJpbmdSVEMuc2V0T3V0Z29pbmdBdWRpbyhjYWxsLmNhbGxJZCwgZW5hYmxlZCk7XG4gICAgfSBlbHNlIGlmIChjYWxsIGluc3RhbmNlb2YgR3JvdXBDYWxsKSB7XG4gICAgICBjYWxsLnNldE91dGdvaW5nQXVkaW9NdXRlZCghZW5hYmxlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY2FsbCk7XG4gICAgfVxuICB9XG5cbiAgc2V0T3V0Z29pbmdWaWRlbyhjb252ZXJzYXRpb25JZDogc3RyaW5nLCBlbmFibGVkOiBib29sZWFuKTogdm9pZCB7XG4gICAgY29uc3QgY2FsbCA9IGdldE93bih0aGlzLmNhbGxzQnlDb252ZXJzYXRpb24sIGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIWNhbGwpIHtcbiAgICAgIGxvZy53YXJuKCdUcnlpbmcgdG8gc2V0IG91dGdvaW5nIHZpZGVvIGZvciBhIG5vbi1leGlzdGVudCBjYWxsJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgaWYgKGNhbGwgaW5zdGFuY2VvZiBDYWxsKSB7XG4gICAgICBSaW5nUlRDLnNldE91dGdvaW5nVmlkZW8oY2FsbC5jYWxsSWQsIGVuYWJsZWQpO1xuICAgIH0gZWxzZSBpZiAoY2FsbCBpbnN0YW5jZW9mIEdyb3VwQ2FsbCkge1xuICAgICAgY2FsbC5zZXRPdXRnb2luZ1ZpZGVvTXV0ZWQoIWVuYWJsZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKGNhbGwpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc2V0T3V0Z29pbmdWaWRlb0lzU2NyZWVuU2hhcmUoXG4gICAgY2FsbDogQ2FsbCB8IEdyb3VwQ2FsbCxcbiAgICBlbmFibGVkOiBib29sZWFuXG4gICk6IHZvaWQge1xuICAgIGlmIChjYWxsIGluc3RhbmNlb2YgQ2FsbCkge1xuICAgICAgUmluZ1JUQy5zZXRPdXRnb2luZ1ZpZGVvSXNTY3JlZW5TaGFyZShjYWxsLmNhbGxJZCwgZW5hYmxlZCk7XG4gICAgICAvLyBOb3RlOiB0aGVyZSBpcyBubyBcInByZXNlbnRpbmdcIiBBUEkgZm9yIGRpcmVjdCBjYWxscy5cbiAgICB9IGVsc2UgaWYgKGNhbGwgaW5zdGFuY2VvZiBHcm91cENhbGwpIHtcbiAgICAgIGNhbGwuc2V0T3V0Z29pbmdWaWRlb0lzU2NyZWVuU2hhcmUoZW5hYmxlZCk7XG4gICAgICBjYWxsLnNldFByZXNlbnRpbmcoZW5hYmxlZCk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHRocm93IG1pc3NpbmdDYXNlRXJyb3IoY2FsbCk7XG4gICAgfVxuICB9XG5cbiAgYXN5bmMgZ2V0UHJlc2VudGluZ1NvdXJjZXMoKTogUHJvbWlzZTxBcnJheTxQcmVzZW50YWJsZVNvdXJjZT4+IHtcbiAgICBjb25zdCBzb3VyY2VzOiBSZWFkb25seUFycmF5PERlc2t0b3BDYXB0dXJlclNvdXJjZT4gPVxuICAgICAgYXdhaXQgaXBjUmVuZGVyZXIuaW52b2tlKCdnZXRTY3JlZW5DYXB0dXJlU291cmNlcycpO1xuXG4gICAgY29uc3QgcHJlc2VudGFibGVTb3VyY2VzOiBBcnJheTxQcmVzZW50YWJsZVNvdXJjZT4gPSBbXTtcblxuICAgIHNvdXJjZXMuZm9yRWFjaChzb3VyY2UgPT4ge1xuICAgICAgLy8gSWYgZWxlY3Ryb24gY2FuJ3QgcmV0cmlldmUgYSB0aHVtYm5haWwgdGhlbiBpdCB3b24ndCBiZSBhYmxlIHRvXG4gICAgICAvLyBwcmVzZW50IHRoaXMgc291cmNlIHNvIHdlIGZpbHRlciB0aGVzZSBvdXQuXG4gICAgICBpZiAoc291cmNlLnRodW1ibmFpbC5pc0VtcHR5KCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgcHJlc2VudGFibGVTb3VyY2VzLnB1c2goe1xuICAgICAgICBhcHBJY29uOlxuICAgICAgICAgIHNvdXJjZS5hcHBJY29uICYmICFzb3VyY2UuYXBwSWNvbi5pc0VtcHR5KClcbiAgICAgICAgICAgID8gc291cmNlLmFwcEljb24udG9EYXRhVVJMKClcbiAgICAgICAgICAgIDogdW5kZWZpbmVkLFxuICAgICAgICBpZDogc291cmNlLmlkLFxuICAgICAgICBuYW1lOiB0cmFuc2xhdGVTb3VyY2VOYW1lKHdpbmRvdy5pMThuLCBzb3VyY2UpLFxuICAgICAgICBpc1NjcmVlbjogaXNTY3JlZW5Tb3VyY2Uoc291cmNlKSxcbiAgICAgICAgdGh1bWJuYWlsOiBzb3VyY2UudGh1bWJuYWlsLnRvRGF0YVVSTCgpLFxuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICByZXR1cm4gcHJlc2VudGFibGVTb3VyY2VzO1xuICB9XG5cbiAgc2V0UHJlc2VudGluZyhcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIGhhc0xvY2FsVmlkZW86IGJvb2xlYW4sXG4gICAgc291cmNlPzogUHJlc2VudGVkU291cmNlXG4gICk6IHZvaWQge1xuICAgIGNvbnN0IGNhbGwgPSBnZXRPd24odGhpcy5jYWxsc0J5Q29udmVyc2F0aW9uLCBjb252ZXJzYXRpb25JZCk7XG4gICAgaWYgKCFjYWxsKSB7XG4gICAgICBsb2cud2FybignVHJ5aW5nIHRvIHNldCBwcmVzZW50aW5nIGZvciBhIG5vbi1leGlzdGVudCBjYWxsJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdGhpcy52aWRlb0NhcHR1cmVyLmRpc2FibGUoKTtcbiAgICBpZiAoc291cmNlKSB7XG4gICAgICB0aGlzLmhhZExvY2FsVmlkZW9CZWZvcmVQcmVzZW50aW5nID0gaGFzTG9jYWxWaWRlbztcbiAgICAgIHRoaXMudmlkZW9DYXB0dXJlci5lbmFibGVDYXB0dXJlQW5kU2VuZChjYWxsLCB7XG4gICAgICAgIC8vIDE1ZnBzIGlzIG11Y2ggbmljZXIgYnV0IHRha2VzIHVwIGEgbG90IG1vcmUgQ1BVLlxuICAgICAgICBtYXhGcmFtZXJhdGU6IDUsXG4gICAgICAgIG1heEhlaWdodDogMTA4MCxcbiAgICAgICAgbWF4V2lkdGg6IDE5MjAsXG4gICAgICAgIHNjcmVlblNoYXJlU291cmNlSWQ6IHNvdXJjZS5pZCxcbiAgICAgIH0pO1xuICAgICAgdGhpcy5zZXRPdXRnb2luZ1ZpZGVvKGNvbnZlcnNhdGlvbklkLCB0cnVlKTtcbiAgICB9IGVsc2Uge1xuICAgICAgdGhpcy5zZXRPdXRnb2luZ1ZpZGVvKFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgdGhpcy5oYWRMb2NhbFZpZGVvQmVmb3JlUHJlc2VudGluZyA/PyBoYXNMb2NhbFZpZGVvXG4gICAgICApO1xuICAgICAgdGhpcy5oYWRMb2NhbFZpZGVvQmVmb3JlUHJlc2VudGluZyA9IHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCBpc1ByZXNlbnRpbmcgPSBCb29sZWFuKHNvdXJjZSk7XG4gICAgdGhpcy5zZXRPdXRnb2luZ1ZpZGVvSXNTY3JlZW5TaGFyZShjYWxsLCBpc1ByZXNlbnRpbmcpO1xuXG4gICAgaWYgKHNvdXJjZSkge1xuICAgICAgaXBjUmVuZGVyZXIuc2VuZCgnc2hvdy1zY3JlZW4tc2hhcmUnLCBzb3VyY2UubmFtZSk7XG4gICAgICBub3RpZmljYXRpb25TZXJ2aWNlLm5vdGlmeSh7XG4gICAgICAgIGljb246ICdpbWFnZXMvaWNvbnMvdjIvdmlkZW8tc29saWQtMjQuc3ZnJyxcbiAgICAgICAgbWVzc2FnZTogd2luZG93LmkxOG4oJ2NhbGxpbmdfX3ByZXNlbnRpbmctLW5vdGlmaWNhdGlvbi1ib2R5JyksXG4gICAgICAgIG9uTm90aWZpY2F0aW9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAodGhpcy51eEFjdGlvbnMpIHtcbiAgICAgICAgICAgIHRoaXMudXhBY3Rpb25zLnNldFByZXNlbnRpbmcoKTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNpbGVudDogdHJ1ZSxcbiAgICAgICAgdGl0bGU6IHdpbmRvdy5pMThuKCdjYWxsaW5nX19wcmVzZW50aW5nLS1ub3RpZmljYXRpb24tdGl0bGUnKSxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBpcGNSZW5kZXJlci5zZW5kKCdjbG9zZS1zY3JlZW4tc2hhcmUtY29udHJvbGxlcicpO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgc3RhcnREZXZpY2VSZXNlbGVjdGlvblRpbWVyKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIC8vIFBvbGwgb25jZVxuICAgIGF3YWl0IHRoaXMucG9sbEZvck1lZGlhRGV2aWNlcygpO1xuICAgIC8vIFN0YXJ0IHRoZSB0aW1lclxuICAgIGlmICghdGhpcy5kZXZpY2VSZXNlbGVjdGlvblRpbWVyKSB7XG4gICAgICB0aGlzLmRldmljZVJlc2VsZWN0aW9uVGltZXIgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHRoaXMucG9sbEZvck1lZGlhRGV2aWNlcygpO1xuICAgICAgfSwgMzAwMCk7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdG9wRGV2aWNlUmVzZWxlY3Rpb25UaW1lcigpIHtcbiAgICBjbGVhclRpbWVvdXRJZk5lY2Vzc2FyeSh0aGlzLmRldmljZVJlc2VsZWN0aW9uVGltZXIpO1xuICAgIHRoaXMuZGV2aWNlUmVzZWxlY3Rpb25UaW1lciA9IHVuZGVmaW5lZDtcbiAgfVxuXG4gIHByaXZhdGUgbWVkaWFEZXZpY2VTZXR0aW5nc0VxdWFsKFxuICAgIGE/OiBNZWRpYURldmljZVNldHRpbmdzLFxuICAgIGI/OiBNZWRpYURldmljZVNldHRpbmdzXG4gICk6IGJvb2xlYW4ge1xuICAgIGlmICghYSAmJiAhYikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghYSB8fCAhYikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBhLmF2YWlsYWJsZUNhbWVyYXMubGVuZ3RoICE9PSBiLmF2YWlsYWJsZUNhbWVyYXMubGVuZ3RoIHx8XG4gICAgICBhLmF2YWlsYWJsZU1pY3JvcGhvbmVzLmxlbmd0aCAhPT0gYi5hdmFpbGFibGVNaWNyb3Bob25lcy5sZW5ndGggfHxcbiAgICAgIGEuYXZhaWxhYmxlU3BlYWtlcnMubGVuZ3RoICE9PSBiLmF2YWlsYWJsZVNwZWFrZXJzLmxlbmd0aFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBmb3IgKGxldCBpID0gMDsgaSA8IGEuYXZhaWxhYmxlQ2FtZXJhcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKFxuICAgICAgICBhLmF2YWlsYWJsZUNhbWVyYXNbaV0uZGV2aWNlSWQgIT09IGIuYXZhaWxhYmxlQ2FtZXJhc1tpXS5kZXZpY2VJZCB8fFxuICAgICAgICBhLmF2YWlsYWJsZUNhbWVyYXNbaV0uZ3JvdXBJZCAhPT0gYi5hdmFpbGFibGVDYW1lcmFzW2ldLmdyb3VwSWQgfHxcbiAgICAgICAgYS5hdmFpbGFibGVDYW1lcmFzW2ldLmxhYmVsICE9PSBiLmF2YWlsYWJsZUNhbWVyYXNbaV0ubGFiZWxcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5hdmFpbGFibGVNaWNyb3Bob25lcy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKFxuICAgICAgICBhLmF2YWlsYWJsZU1pY3JvcGhvbmVzW2ldLm5hbWUgIT09IGIuYXZhaWxhYmxlTWljcm9waG9uZXNbaV0ubmFtZSB8fFxuICAgICAgICBhLmF2YWlsYWJsZU1pY3JvcGhvbmVzW2ldLnVuaXF1ZUlkICE9PVxuICAgICAgICAgIGIuYXZhaWxhYmxlTWljcm9waG9uZXNbaV0udW5pcXVlSWRcbiAgICAgICkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgYS5hdmFpbGFibGVTcGVha2Vycy5sZW5ndGg7IGkgKz0gMSkge1xuICAgICAgaWYgKFxuICAgICAgICBhLmF2YWlsYWJsZVNwZWFrZXJzW2ldLm5hbWUgIT09IGIuYXZhaWxhYmxlU3BlYWtlcnNbaV0ubmFtZSB8fFxuICAgICAgICBhLmF2YWlsYWJsZVNwZWFrZXJzW2ldLnVuaXF1ZUlkICE9PSBiLmF2YWlsYWJsZVNwZWFrZXJzW2ldLnVuaXF1ZUlkXG4gICAgICApIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgfVxuICAgIH1cbiAgICBpZiAoXG4gICAgICAoYS5zZWxlY3RlZENhbWVyYSAmJiAhYi5zZWxlY3RlZENhbWVyYSkgfHxcbiAgICAgICghYS5zZWxlY3RlZENhbWVyYSAmJiBiLnNlbGVjdGVkQ2FtZXJhKSB8fFxuICAgICAgKGEuc2VsZWN0ZWRNaWNyb3Bob25lICYmICFiLnNlbGVjdGVkTWljcm9waG9uZSkgfHxcbiAgICAgICghYS5zZWxlY3RlZE1pY3JvcGhvbmUgJiYgYi5zZWxlY3RlZE1pY3JvcGhvbmUpIHx8XG4gICAgICAoYS5zZWxlY3RlZFNwZWFrZXIgJiYgIWIuc2VsZWN0ZWRTcGVha2VyKSB8fFxuICAgICAgKCFhLnNlbGVjdGVkU3BlYWtlciAmJiBiLnNlbGVjdGVkU3BlYWtlcilcbiAgICApIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgaWYgKFxuICAgICAgYS5zZWxlY3RlZENhbWVyYSAmJlxuICAgICAgYi5zZWxlY3RlZENhbWVyYSAmJlxuICAgICAgYS5zZWxlY3RlZENhbWVyYSAhPT0gYi5zZWxlY3RlZENhbWVyYVxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBhLnNlbGVjdGVkTWljcm9waG9uZSAmJlxuICAgICAgYi5zZWxlY3RlZE1pY3JvcGhvbmUgJiZcbiAgICAgIGEuc2VsZWN0ZWRNaWNyb3Bob25lLmluZGV4ICE9PSBiLnNlbGVjdGVkTWljcm9waG9uZS5pbmRleFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBpZiAoXG4gICAgICBhLnNlbGVjdGVkU3BlYWtlciAmJlxuICAgICAgYi5zZWxlY3RlZFNwZWFrZXIgJiZcbiAgICAgIGEuc2VsZWN0ZWRTcGVha2VyLmluZGV4ICE9PSBiLnNlbGVjdGVkU3BlYWtlci5pbmRleFxuICAgICkge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcG9sbEZvck1lZGlhRGV2aWNlcygpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBuZXdTZXR0aW5ncyA9IGF3YWl0IHRoaXMuZ2V0TWVkaWFEZXZpY2VTZXR0aW5ncygpO1xuICAgIGlmIChcbiAgICAgICF0aGlzLm1lZGlhRGV2aWNlU2V0dGluZ3NFcXVhbCh0aGlzLmxhc3RNZWRpYURldmljZVNldHRpbmdzLCBuZXdTZXR0aW5ncylcbiAgICApIHtcbiAgICAgIGxvZy5pbmZvKFxuICAgICAgICAnTWVkaWFEZXZpY2U6IGF2YWlsYWJsZSBkZXZpY2VzIGNoYW5nZWQgKGZyb20tPnRvKScsXG4gICAgICAgIHRoaXMubGFzdE1lZGlhRGV2aWNlU2V0dGluZ3MsXG4gICAgICAgIG5ld1NldHRpbmdzXG4gICAgICApO1xuXG4gICAgICBhd2FpdCB0aGlzLnNlbGVjdFByZWZlcnJlZERldmljZXMobmV3U2V0dGluZ3MpO1xuICAgICAgdGhpcy5sYXN0TWVkaWFEZXZpY2VTZXR0aW5ncyA9IG5ld1NldHRpbmdzO1xuICAgICAgdGhpcy51eEFjdGlvbnM/LnJlZnJlc2hJT0RldmljZXMobmV3U2V0dGluZ3MpO1xuICAgIH1cbiAgfVxuXG4gIGFzeW5jIGdldEF2YWlsYWJsZUlPRGV2aWNlcygpOiBQcm9taXNlPEF2YWlsYWJsZUlPRGV2aWNlc1R5cGU+IHtcbiAgICBjb25zdCBhdmFpbGFibGVDYW1lcmFzID0gYXdhaXQgdGhpcy52aWRlb0NhcHR1cmVyLmVudW1lcmF0ZURldmljZXMoKTtcbiAgICBjb25zdCBhdmFpbGFibGVNaWNyb3Bob25lcyA9IFJpbmdSVEMuZ2V0QXVkaW9JbnB1dHMoKTtcbiAgICBjb25zdCBhdmFpbGFibGVTcGVha2VycyA9IFJpbmdSVEMuZ2V0QXVkaW9PdXRwdXRzKCk7XG5cbiAgICByZXR1cm4ge1xuICAgICAgYXZhaWxhYmxlQ2FtZXJhcyxcbiAgICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzLFxuICAgICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgfTtcbiAgfVxuXG4gIGFzeW5jIGdldE1lZGlhRGV2aWNlU2V0dGluZ3MoKTogUHJvbWlzZTxNZWRpYURldmljZVNldHRpbmdzPiB7XG4gICAgY29uc3QgeyBwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlLCBjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUgfSA9IHRoaXM7XG4gICAgaWYgKCFwcmV2aW91c0F1ZGlvRGV2aWNlTW9kdWxlIHx8ICFjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUpIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcihcbiAgICAgICAgJ0NhbGxpbmcjZ2V0TWVkaWFEZXZpY2VTZXR0aW5ncyBjYW5ub3QgYmUgY2FsbGVkIGJlZm9yZSBhdWRpbyBkZXZpY2Ugc2V0dGluZ3MgYXJlIHNldCdcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgeyBhdmFpbGFibGVDYW1lcmFzLCBhdmFpbGFibGVNaWNyb3Bob25lcywgYXZhaWxhYmxlU3BlYWtlcnMgfSA9XG4gICAgICBhd2FpdCB0aGlzLmdldEF2YWlsYWJsZUlPRGV2aWNlcygpO1xuXG4gICAgY29uc3QgcHJlZmVycmVkTWljcm9waG9uZSA9IHdpbmRvdy5FdmVudHMuZ2V0UHJlZmVycmVkQXVkaW9JbnB1dERldmljZSgpO1xuICAgIGNvbnN0IHNlbGVjdGVkTWljSW5kZXggPSBmaW5kQmVzdE1hdGNoaW5nQXVkaW9EZXZpY2VJbmRleCh7XG4gICAgICBhdmFpbGFibGU6IGF2YWlsYWJsZU1pY3JvcGhvbmVzLFxuICAgICAgcHJlZmVycmVkOiBwcmVmZXJyZWRNaWNyb3Bob25lLFxuICAgICAgcHJldmlvdXNBdWRpb0RldmljZU1vZHVsZSxcbiAgICAgIGN1cnJlbnRBdWRpb0RldmljZU1vZHVsZSxcbiAgICB9KTtcbiAgICBjb25zdCBzZWxlY3RlZE1pY3JvcGhvbmUgPVxuICAgICAgc2VsZWN0ZWRNaWNJbmRleCAhPT0gdW5kZWZpbmVkXG4gICAgICAgID8gYXZhaWxhYmxlTWljcm9waG9uZXNbc2VsZWN0ZWRNaWNJbmRleF1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBwcmVmZXJyZWRTcGVha2VyID0gd2luZG93LkV2ZW50cy5nZXRQcmVmZXJyZWRBdWRpb091dHB1dERldmljZSgpO1xuICAgIGNvbnN0IHNlbGVjdGVkU3BlYWtlckluZGV4ID0gZmluZEJlc3RNYXRjaGluZ0F1ZGlvRGV2aWNlSW5kZXgoe1xuICAgICAgYXZhaWxhYmxlOiBhdmFpbGFibGVTcGVha2VycyxcbiAgICAgIHByZWZlcnJlZDogcHJlZmVycmVkU3BlYWtlcixcbiAgICAgIHByZXZpb3VzQXVkaW9EZXZpY2VNb2R1bGUsXG4gICAgICBjdXJyZW50QXVkaW9EZXZpY2VNb2R1bGUsXG4gICAgfSk7XG4gICAgY29uc3Qgc2VsZWN0ZWRTcGVha2VyID1cbiAgICAgIHNlbGVjdGVkU3BlYWtlckluZGV4ICE9PSB1bmRlZmluZWRcbiAgICAgICAgPyBhdmFpbGFibGVTcGVha2Vyc1tzZWxlY3RlZFNwZWFrZXJJbmRleF1cbiAgICAgICAgOiB1bmRlZmluZWQ7XG5cbiAgICBjb25zdCBwcmVmZXJyZWRDYW1lcmEgPSB3aW5kb3cuRXZlbnRzLmdldFByZWZlcnJlZFZpZGVvSW5wdXREZXZpY2UoKTtcbiAgICBjb25zdCBzZWxlY3RlZENhbWVyYSA9IGZpbmRCZXN0TWF0Y2hpbmdDYW1lcmFJZChcbiAgICAgIGF2YWlsYWJsZUNhbWVyYXMsXG4gICAgICBwcmVmZXJyZWRDYW1lcmFcbiAgICApO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGF2YWlsYWJsZU1pY3JvcGhvbmVzLFxuICAgICAgYXZhaWxhYmxlU3BlYWtlcnMsXG4gICAgICBzZWxlY3RlZE1pY3JvcGhvbmUsXG4gICAgICBzZWxlY3RlZFNwZWFrZXIsXG4gICAgICBhdmFpbGFibGVDYW1lcmFzLFxuICAgICAgc2VsZWN0ZWRDYW1lcmEsXG4gICAgfTtcbiAgfVxuXG4gIHNldFByZWZlcnJlZE1pY3JvcGhvbmUoZGV2aWNlOiBBdWRpb0RldmljZSk6IHZvaWQge1xuICAgIGxvZy5pbmZvKCdNZWRpYURldmljZTogc2V0UHJlZmVycmVkTWljcm9waG9uZScsIGRldmljZSk7XG4gICAgd2luZG93LkV2ZW50cy5zZXRQcmVmZXJyZWRBdWRpb0lucHV0RGV2aWNlKGRldmljZSk7XG4gICAgUmluZ1JUQy5zZXRBdWRpb0lucHV0KGRldmljZS5pbmRleCk7XG4gIH1cblxuICBzZXRQcmVmZXJyZWRTcGVha2VyKGRldmljZTogQXVkaW9EZXZpY2UpOiB2b2lkIHtcbiAgICBsb2cuaW5mbygnTWVkaWFEZXZpY2U6IHNldFByZWZlcnJlZFNwZWFrZXInLCBkZXZpY2UpO1xuICAgIHdpbmRvdy5FdmVudHMuc2V0UHJlZmVycmVkQXVkaW9PdXRwdXREZXZpY2UoZGV2aWNlKTtcbiAgICBSaW5nUlRDLnNldEF1ZGlvT3V0cHV0KGRldmljZS5pbmRleCk7XG4gIH1cblxuICBlbmFibGVMb2NhbENhbWVyYSgpOiB2b2lkIHtcbiAgICB0aGlzLnZpZGVvQ2FwdHVyZXIuZW5hYmxlQ2FwdHVyZSgpO1xuICB9XG5cbiAgZGlzYWJsZUxvY2FsVmlkZW8oKTogdm9pZCB7XG4gICAgdGhpcy52aWRlb0NhcHR1cmVyLmRpc2FibGUoKTtcbiAgfVxuXG4gIGFzeW5jIHNldFByZWZlcnJlZENhbWVyYShkZXZpY2U6IHN0cmluZyk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKCdNZWRpYURldmljZTogc2V0UHJlZmVycmVkQ2FtZXJhJywgZGV2aWNlKTtcbiAgICB3aW5kb3cuRXZlbnRzLnNldFByZWZlcnJlZFZpZGVvSW5wdXREZXZpY2UoZGV2aWNlKTtcbiAgICBhd2FpdCB0aGlzLnZpZGVvQ2FwdHVyZXIuc2V0UHJlZmVycmVkRGV2aWNlKGRldmljZSk7XG4gIH1cblxuICBhc3luYyBoYW5kbGVDYWxsaW5nTWVzc2FnZShcbiAgICBlbnZlbG9wZTogUHJvY2Vzc2VkRW52ZWxvcGUsXG4gICAgY2FsbGluZ01lc3NhZ2U6IFByb3RvLklDYWxsaW5nTWVzc2FnZVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBsb2cuaW5mbygnQ2FsbGluZ0NsYXNzLmhhbmRsZUNhbGxpbmdNZXNzYWdlKCknKTtcblxuICAgIGNvbnN0IGVuYWJsZUluY29taW5nQ2FsbHMgPSB3aW5kb3cuRXZlbnRzLmdldEluY29taW5nQ2FsbE5vdGlmaWNhdGlvbigpO1xuICAgIGlmIChjYWxsaW5nTWVzc2FnZS5vZmZlciAmJiAhZW5hYmxlSW5jb21pbmdDYWxscykge1xuICAgICAgLy8gRHJvcCBvZmZlcnMgc2lsZW50bHkgaWYgaW5jb21pbmcgY2FsbCBub3RpZmljYXRpb25zIGFyZSBkaXNhYmxlZC5cbiAgICAgIGxvZy5pbmZvKCdJbmNvbWluZyBjYWxscyBhcmUgZGlzYWJsZWQsIGlnbm9yaW5nIGNhbGwgb2ZmZXIuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgcmVtb3RlVXNlcklkID0gZW52ZWxvcGUuc291cmNlVXVpZDtcbiAgICBjb25zdCByZW1vdGVEZXZpY2VJZCA9IHRoaXMucGFyc2VEZXZpY2VJZChlbnZlbG9wZS5zb3VyY2VEZXZpY2UpO1xuICAgIGlmICghcmVtb3RlVXNlcklkIHx8ICFyZW1vdGVEZXZpY2VJZCB8fCAhdGhpcy5sb2NhbERldmljZUlkKSB7XG4gICAgICBsb2cuZXJyb3IoJ01pc3NpbmcgaWRlbnRpZmllciwgaWdub3JpbmcgY2FsbCBtZXNzYWdlLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHsgc3RvcmFnZSB9ID0gd2luZG93LnRleHRzZWN1cmU7XG5cbiAgICBjb25zdCBzZW5kZXJJZGVudGl0eVJlY29yZCA9XG4gICAgICBhd2FpdCBzdG9yYWdlLnByb3RvY29sLmdldE9yTWlncmF0ZUlkZW50aXR5UmVjb3JkKG5ldyBVVUlEKHJlbW90ZVVzZXJJZCkpO1xuICAgIGlmICghc2VuZGVySWRlbnRpdHlSZWNvcmQpIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyBzZW5kZXIgaWRlbnRpdHkgcmVjb3JkOyBpZ25vcmluZyBjYWxsIG1lc3NhZ2UuJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHNlbmRlcklkZW50aXR5S2V5ID0gc2VuZGVySWRlbnRpdHlSZWNvcmQucHVibGljS2V5LnNsaWNlKDEpOyAvLyBJZ25vcmUgdGhlIHR5cGUgaGVhZGVyLCBpdCBpcyBub3QgdXNlZC5cblxuICAgIGNvbnN0IG91clV1aWQgPSBzdG9yYWdlLnVzZXIuZ2V0Q2hlY2tlZFV1aWQoKTtcblxuICAgIGNvbnN0IHJlY2VpdmVySWRlbnRpdHlSZWNvcmQgPSBzdG9yYWdlLnByb3RvY29sLmdldElkZW50aXR5UmVjb3JkKG91clV1aWQpO1xuICAgIGlmICghcmVjZWl2ZXJJZGVudGl0eVJlY29yZCkge1xuICAgICAgbG9nLmVycm9yKCdNaXNzaW5nIHJlY2VpdmVyIGlkZW50aXR5IHJlY29yZDsgaWdub3JpbmcgY2FsbCBtZXNzYWdlLicpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCByZWNlaXZlcklkZW50aXR5S2V5ID0gcmVjZWl2ZXJJZGVudGl0eVJlY29yZC5wdWJsaWNLZXkuc2xpY2UoMSk7IC8vIElnbm9yZSB0aGUgdHlwZSBoZWFkZXIsIGl0IGlzIG5vdCB1c2VkLlxuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KHJlbW90ZVVzZXJJZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyBjb252ZXJzYXRpb247IGlnbm9yaW5nIGNhbGwgbWVzc2FnZS4nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBpZiAoY2FsbGluZ01lc3NhZ2Uub2ZmZXIgJiYgIWNvbnZlcnNhdGlvbi5nZXRBY2NlcHRlZCgpKSB7XG4gICAgICBsb2cuaW5mbyhcbiAgICAgICAgJ0NvbnZlcnNhdGlvbiB3YXMgbm90IGFwcHJvdmVkIGJ5IHVzZXI7IHJlamVjdGluZyBjYWxsIG1lc3NhZ2UuJ1xuICAgICAgKTtcblxuICAgICAgY29uc3QgaGFuZ3VwID0gbmV3IEhhbmd1cE1lc3NhZ2UoKTtcbiAgICAgIGhhbmd1cC5jYWxsSWQgPSBjYWxsaW5nTWVzc2FnZS5vZmZlci5jYWxsSWQ7XG4gICAgICBoYW5ndXAuZGV2aWNlSWQgPSByZW1vdGVEZXZpY2VJZDtcbiAgICAgIGhhbmd1cC50eXBlID0gSGFuZ3VwVHlwZS5OZWVkUGVybWlzc2lvbjtcblxuICAgICAgY29uc3QgbWVzc2FnZSA9IG5ldyBDYWxsaW5nTWVzc2FnZSgpO1xuICAgICAgbWVzc2FnZS5sZWdhY3lIYW5ndXAgPSBoYW5ndXA7XG5cbiAgICAgIGF3YWl0IHRoaXMuaGFuZGxlT3V0Z29pbmdTaWduYWxpbmcocmVtb3RlVXNlcklkLCBtZXNzYWdlKTtcblxuICAgICAgY29uc3QgUHJvdG9PZmZlclR5cGUgPSBQcm90by5DYWxsaW5nTWVzc2FnZS5PZmZlci5UeXBlO1xuICAgICAgdGhpcy5hZGRDYWxsSGlzdG9yeUZvckZhaWxlZEluY29taW5nQ2FsbChcbiAgICAgICAgY29udmVyc2F0aW9uLFxuICAgICAgICBjYWxsaW5nTWVzc2FnZS5vZmZlci50eXBlID09PSBQcm90b09mZmVyVHlwZS5PRkZFUl9WSURFT19DQUxMLFxuICAgICAgICBlbnZlbG9wZS50aW1lc3RhbXBcbiAgICAgICk7XG5cbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBzb3VyY2VVdWlkID0gZW52ZWxvcGUuc291cmNlVXVpZFxuICAgICAgPyB1dWlkVG9CeXRlcyhlbnZlbG9wZS5zb3VyY2VVdWlkKVxuICAgICAgOiBudWxsO1xuXG4gICAgY29uc3QgbWVzc2FnZUFnZVNlYyA9IGVudmVsb3BlLm1lc3NhZ2VBZ2VTZWMgPyBlbnZlbG9wZS5tZXNzYWdlQWdlU2VjIDogMDtcblxuICAgIGxvZy5pbmZvKCdDYWxsaW5nQ2xhc3MuaGFuZGxlQ2FsbGluZ01lc3NhZ2UoKTogSGFuZGxpbmcgaW4gUmluZ1JUQycpO1xuXG4gICAgUmluZ1JUQy5oYW5kbGVDYWxsaW5nTWVzc2FnZShcbiAgICAgIHJlbW90ZVVzZXJJZCxcbiAgICAgIHNvdXJjZVV1aWQgPyBCdWZmZXIuZnJvbShzb3VyY2VVdWlkKSA6IG51bGwsXG4gICAgICByZW1vdGVEZXZpY2VJZCxcbiAgICAgIHRoaXMubG9jYWxEZXZpY2VJZCxcbiAgICAgIG1lc3NhZ2VBZ2VTZWMsXG4gICAgICBlbnZlbG9wZS5yZWNlaXZlZEF0Q291bnRlcixcbiAgICAgIHByb3RvVG9DYWxsaW5nTWVzc2FnZShjYWxsaW5nTWVzc2FnZSksXG4gICAgICBCdWZmZXIuZnJvbShzZW5kZXJJZGVudGl0eUtleSksXG4gICAgICBCdWZmZXIuZnJvbShyZWNlaXZlcklkZW50aXR5S2V5KVxuICAgICk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHNlbGVjdFByZWZlcnJlZERldmljZXMoXG4gICAgc2V0dGluZ3M6IE1lZGlhRGV2aWNlU2V0dGluZ3NcbiAgKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgaWYgKFxuICAgICAgKCF0aGlzLmxhc3RNZWRpYURldmljZVNldHRpbmdzICYmIHNldHRpbmdzLnNlbGVjdGVkQ2FtZXJhKSB8fFxuICAgICAgKHRoaXMubGFzdE1lZGlhRGV2aWNlU2V0dGluZ3MgJiZcbiAgICAgICAgc2V0dGluZ3Muc2VsZWN0ZWRDYW1lcmEgJiZcbiAgICAgICAgdGhpcy5sYXN0TWVkaWFEZXZpY2VTZXR0aW5ncy5zZWxlY3RlZENhbWVyYSAhPT0gc2V0dGluZ3Muc2VsZWN0ZWRDYW1lcmEpXG4gICAgKSB7XG4gICAgICBsb2cuaW5mbygnTWVkaWFEZXZpY2U6IHNlbGVjdGluZyBjYW1lcmEnLCBzZXR0aW5ncy5zZWxlY3RlZENhbWVyYSk7XG4gICAgICBhd2FpdCB0aGlzLnZpZGVvQ2FwdHVyZXIuc2V0UHJlZmVycmVkRGV2aWNlKHNldHRpbmdzLnNlbGVjdGVkQ2FtZXJhKTtcbiAgICB9XG5cbiAgICAvLyBBc3N1bWUgdGhhdCB0aGUgTWVkaWFEZXZpY2VTZXR0aW5ncyBoYXZlIGJlZW4gb2J0YWluZWQgdmVyeSByZWNlbnRseSBhbmRcbiAgICAvLyB0aGUgaW5kZXggaXMgc3RpbGwgdmFsaWQgKG5vIGRldmljZXMgaGF2ZSBiZWVuIHBsdWdnZWQgaW4gaW4gYmV0d2VlbikuXG4gICAgaWYgKHNldHRpbmdzLnNlbGVjdGVkTWljcm9waG9uZSkge1xuICAgICAgbG9nLmluZm8oXG4gICAgICAgICdNZWRpYURldmljZTogc2VsZWN0aW5nIG1pY3JvcGhvbmUnLFxuICAgICAgICBzZXR0aW5ncy5zZWxlY3RlZE1pY3JvcGhvbmVcbiAgICAgICk7XG4gICAgICBSaW5nUlRDLnNldEF1ZGlvSW5wdXQoc2V0dGluZ3Muc2VsZWN0ZWRNaWNyb3Bob25lLmluZGV4KTtcbiAgICB9XG5cbiAgICBpZiAoc2V0dGluZ3Muc2VsZWN0ZWRTcGVha2VyKSB7XG4gICAgICBsb2cuaW5mbygnTWVkaWFEZXZpY2U6IHNlbGVjdGluZyBzcGVha2VyJywgc2V0dGluZ3Muc2VsZWN0ZWRTcGVha2VyKTtcbiAgICAgIFJpbmdSVEMuc2V0QXVkaW9PdXRwdXQoc2V0dGluZ3Muc2VsZWN0ZWRTcGVha2VyLmluZGV4KTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIHJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucygpOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjYW1lcmFQZXJtaXNzaW9uID0gYXdhaXQgd2luZG93LmdldE1lZGlhQ2FtZXJhUGVybWlzc2lvbnMoKTtcbiAgICBpZiAoIWNhbWVyYVBlcm1pc3Npb24pIHtcbiAgICAgIGF3YWl0IHdpbmRvdy5zaG93UGVybWlzc2lvbnNQb3B1cCh0cnVlLCB0cnVlKTtcblxuICAgICAgLy8gQ2hlY2sgdGhlIHNldHRpbmcgYWdhaW4gKGZyb20gdGhlIHNvdXJjZSBvZiB0cnV0aCkuXG4gICAgICByZXR1cm4gd2luZG93LmdldE1lZGlhQ2FtZXJhUGVybWlzc2lvbnMoKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgcmVxdWVzdFBlcm1pc3Npb25zKGlzVmlkZW9DYWxsOiBib29sZWFuKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgbWljcm9waG9uZVBlcm1pc3Npb24gPSBhd2FpdCByZXF1ZXN0TWljcm9waG9uZVBlcm1pc3Npb25zKHRydWUpO1xuICAgIGlmIChtaWNyb3Bob25lUGVybWlzc2lvbikge1xuICAgICAgaWYgKGlzVmlkZW9DYWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLnJlcXVlc3RDYW1lcmFQZXJtaXNzaW9ucygpO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG5cbiAgICByZXR1cm4gZmFsc2U7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmRDYWxsTWVzc2FnZShcbiAgICByZWNpcGllbnQ6IFVpbnQ4QXJyYXksXG4gICAgZGF0YTogVWludDhBcnJheSxcbiAgICB1cmdlbmN5OiBDYWxsTWVzc2FnZVVyZ2VuY3lcbiAgKTogUHJvbWlzZTxib29sZWFuPiB7XG4gICAgY29uc3QgdXNlcklkID0gYnl0ZXNUb1V1aWQocmVjaXBpZW50KTtcbiAgICBpZiAoIXVzZXJJZCkge1xuICAgICAgbG9nLmVycm9yKCdoYW5kbGVTZW5kQ2FsbE1lc3NhZ2UoKTogYmFkIHJlY2lwaWVudCBVVUlEJyk7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IG1lc3NhZ2UgPSBuZXcgQ2FsbGluZ01lc3NhZ2UoKTtcbiAgICBtZXNzYWdlLm9wYXF1ZSA9IG5ldyBPcGFxdWVNZXNzYWdlKCk7XG4gICAgbWVzc2FnZS5vcGFxdWUuZGF0YSA9IEJ1ZmZlci5mcm9tKGRhdGEpO1xuICAgIHJldHVybiB0aGlzLmhhbmRsZU91dGdvaW5nU2lnbmFsaW5nKHVzZXJJZCwgbWVzc2FnZSwgdXJnZW5jeSk7XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmRDYWxsTWVzc2FnZVRvR3JvdXAoXG4gICAgZ3JvdXBJZEJ5dGVzOiBCdWZmZXIsXG4gICAgZGF0YTogQnVmZmVyLFxuICAgIHVyZ2VuY3k6IENhbGxNZXNzYWdlVXJnZW5jeVxuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBncm91cElkID0gZ3JvdXBJZEJ5dGVzLnRvU3RyaW5nKCdiYXNlNjQnKTtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoZ3JvdXBJZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcignaGFuZGxlU2VuZENhbGxNZXNzYWdlVG9Hcm91cCgpOiBjb3VsZCBub3QgZmluZCBjb252ZXJzYXRpb24nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0aW1lc3RhbXAgPSBEYXRlLm5vdygpO1xuXG4gICAgY29uc3QgY2FsbGluZ01lc3NhZ2UgPSBuZXcgQ2FsbGluZ01lc3NhZ2UoKTtcbiAgICBjYWxsaW5nTWVzc2FnZS5vcGFxdWUgPSBuZXcgT3BhcXVlTWVzc2FnZSgpO1xuICAgIGNhbGxpbmdNZXNzYWdlLm9wYXF1ZS5kYXRhID0gZGF0YTtcbiAgICBjb25zdCBjb250ZW50TWVzc2FnZSA9IG5ldyBQcm90by5Db250ZW50KCk7XG4gICAgY29udGVudE1lc3NhZ2UuY2FsbGluZ01lc3NhZ2UgPSBjYWxsaW5nTWVzc2FnZVRvUHJvdG8oXG4gICAgICBjYWxsaW5nTWVzc2FnZSxcbiAgICAgIHVyZ2VuY3lcbiAgICApO1xuXG4gICAgLy8gV2UgXCJmaXJlIGFuZCBmb3JnZXRcIiBiZWNhdXNlIHNlbmRpbmcgdGhpcyBtZXNzYWdlIGlzIG5vbi1lc3NlbnRpYWwuXG4gICAgLy8gV2UgYWxzbyBkb24ndCBzeW5jIHRoaXMgbWVzc2FnZS5cbiAgICBjb25zdCB7IENvbnRlbnRIaW50IH0gPSBQcm90by5VbmlkZW50aWZpZWRTZW5kZXJNZXNzYWdlLk1lc3NhZ2U7XG4gICAgYXdhaXQgY29udmVyc2F0aW9uLnF1ZXVlSm9iKCdoYW5kbGVTZW5kQ2FsbE1lc3NhZ2VUb0dyb3VwJywgYXN5bmMgKCkgPT5cbiAgICAgIGhhbmRsZU1lc3NhZ2VTZW5kKFxuICAgICAgICB3aW5kb3cuU2lnbmFsLlV0aWwuc2VuZENvbnRlbnRNZXNzYWdlVG9Hcm91cCh7XG4gICAgICAgICAgY29udGVudEhpbnQ6IENvbnRlbnRIaW50LkRFRkFVTFQsXG4gICAgICAgICAgY29udGVudE1lc3NhZ2UsXG4gICAgICAgICAgaXNQYXJ0aWFsU2VuZDogZmFsc2UsXG4gICAgICAgICAgbWVzc2FnZUlkOiB1bmRlZmluZWQsXG4gICAgICAgICAgcmVjaXBpZW50czogY29udmVyc2F0aW9uLmdldFJlY2lwaWVudHMoKSxcbiAgICAgICAgICBzZW5kT3B0aW9uczogYXdhaXQgZ2V0U2VuZE9wdGlvbnMoY29udmVyc2F0aW9uLmF0dHJpYnV0ZXMpLFxuICAgICAgICAgIHNlbmRUYXJnZXQ6IGNvbnZlcnNhdGlvbi50b1NlbmRlcktleVRhcmdldCgpLFxuICAgICAgICAgIHNlbmRUeXBlOiAnY2FsbGluZ01lc3NhZ2UnLFxuICAgICAgICAgIHRpbWVzdGFtcCxcbiAgICAgICAgfSksXG4gICAgICAgIHsgbWVzc2FnZUlkczogW10sIHNlbmRUeXBlOiAnY2FsbGluZ01lc3NhZ2UnIH1cbiAgICAgIClcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBoYW5kbGVHcm91cENhbGxSaW5nVXBkYXRlKFxuICAgIGdyb3VwSWRCeXRlczogQnVmZmVyLFxuICAgIHJpbmdJZDogYmlnaW50LFxuICAgIHJpbmdlckJ5dGVzOiBCdWZmZXIsXG4gICAgdXBkYXRlOiBSaW5nVXBkYXRlXG4gICk6IFByb21pc2U8dm9pZD4ge1xuICAgIGxvZy5pbmZvKGBoYW5kbGVHcm91cENhbGxSaW5nVXBkYXRlKCk6IGdvdCByaW5nIHVwZGF0ZSAke3VwZGF0ZX1gKTtcblxuICAgIGNvbnN0IGdyb3VwSWQgPSBncm91cElkQnl0ZXMudG9TdHJpbmcoJ2Jhc2U2NCcpO1xuXG4gICAgY29uc3QgcmluZ2VyVXVpZCA9IGJ5dGVzVG9VdWlkKHJpbmdlckJ5dGVzKTtcbiAgICBpZiAoIXJpbmdlclV1aWQpIHtcbiAgICAgIGxvZy5lcnJvcignaGFuZGxlR3JvdXBDYWxsUmluZ1VwZGF0ZSgpOiByaW5nZXJVdWlkIHdhcyBpbnZhbGlkJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGdyb3VwSWQpO1xuICAgIGlmICghY29udmVyc2F0aW9uKSB7XG4gICAgICBsb2cuZXJyb3IoJ2hhbmRsZUdyb3VwQ2FsbFJpbmdVcGRhdGUoKTogY291bGQgbm90IGZpbmQgY29udmVyc2F0aW9uJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbklkID0gY29udmVyc2F0aW9uLmlkO1xuXG4gICAgbGV0IHNob3VsZFJpbmcgPSBmYWxzZTtcblxuICAgIGlmICh1cGRhdGUgPT09IFJpbmdVcGRhdGUuUmVxdWVzdGVkKSB7XG4gICAgICBjb25zdCBwcm9jZXNzUmVzdWx0ID0gYXdhaXQgcHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0KHJpbmdJZCk7XG4gICAgICBzd2l0Y2ggKHByb2Nlc3NSZXN1bHQpIHtcbiAgICAgICAgY2FzZSBQcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3RSZXN1bHQuU2hvdWxkUmluZzpcbiAgICAgICAgICBzaG91bGRSaW5nID0gdHJ1ZTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBQcm9jZXNzR3JvdXBDYWxsUmluZ1JlcXVlc3RSZXN1bHQuUmluZ1dhc1ByZXZpb3VzbHlDYW5jZWxlZDpcbiAgICAgICAgICBSaW5nUlRDLmNhbmNlbEdyb3VwUmluZyhncm91cElkQnl0ZXMsIHJpbmdJZCwgbnVsbCk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIGNhc2UgUHJvY2Vzc0dyb3VwQ2FsbFJpbmdSZXF1ZXN0UmVzdWx0LlRoZXJlSXNBbm90aGVyQWN0aXZlUmluZzpcbiAgICAgICAgICBSaW5nUlRDLmNhbmNlbEdyb3VwUmluZyhncm91cElkQnl0ZXMsIHJpbmdJZCwgUmluZ0NhbmNlbFJlYXNvbi5CdXN5KTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICB0aHJvdyBtaXNzaW5nQ2FzZUVycm9yKHByb2Nlc3NSZXN1bHQpO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhd2FpdCBwcm9jZXNzR3JvdXBDYWxsUmluZ0NhbmNlbGF0aW9uKHJpbmdJZCk7XG4gICAgfVxuXG4gICAgaWYgKHNob3VsZFJpbmcpIHtcbiAgICAgIGxvZy5pbmZvKCdoYW5kbGVHcm91cENhbGxSaW5nVXBkYXRlOiByaW5naW5nJyk7XG4gICAgICB0aGlzLnV4QWN0aW9ucz8ucmVjZWl2ZUluY29taW5nR3JvdXBDYWxsKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHJpbmdJZCxcbiAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgIH0pO1xuICAgIH0gZWxzZSB7XG4gICAgICBsb2cuaW5mbygnaGFuZGxlR3JvdXBDYWxsUmluZ1VwZGF0ZTogY2FuY2VsaW5nIGFueSBleGlzdGluZyByaW5nJyk7XG4gICAgICB0aGlzLnV4QWN0aW9ucz8uY2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgIHJpbmdJZCxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgaGFuZGxlT3V0Z29pbmdTaWduYWxpbmcoXG4gICAgcmVtb3RlVXNlcklkOiBVc2VySWQsXG4gICAgbWVzc2FnZTogQ2FsbGluZ01lc3NhZ2UsXG4gICAgdXJnZW5jeT86IENhbGxNZXNzYWdlVXJnZW5jeVxuICApOiBQcm9taXNlPGJvb2xlYW4+IHtcbiAgICBjb25zdCBjb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQocmVtb3RlVXNlcklkKTtcbiAgICBjb25zdCBzZW5kT3B0aW9ucyA9IGNvbnZlcnNhdGlvblxuICAgICAgPyBhd2FpdCBnZXRTZW5kT3B0aW9ucyhjb252ZXJzYXRpb24uYXR0cmlidXRlcylcbiAgICAgIDogdW5kZWZpbmVkO1xuXG4gICAgaWYgKCF3aW5kb3cudGV4dHNlY3VyZS5tZXNzYWdpbmcpIHtcbiAgICAgIGxvZy53YXJuKCdoYW5kbGVPdXRnb2luZ1NpZ25hbGluZygpIHJldHVybmluZyBmYWxzZTsgb2ZmbGluZScpO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBoYW5kbGVNZXNzYWdlU2VuZChcbiAgICAgICAgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLnNlbmRDYWxsaW5nTWVzc2FnZShcbiAgICAgICAgICByZW1vdGVVc2VySWQsXG4gICAgICAgICAgY2FsbGluZ01lc3NhZ2VUb1Byb3RvKG1lc3NhZ2UsIHVyZ2VuY3kpLFxuICAgICAgICAgIHNlbmRPcHRpb25zXG4gICAgICAgICksXG4gICAgICAgIHsgbWVzc2FnZUlkczogW10sIHNlbmRUeXBlOiAnY2FsbGluZ01lc3NhZ2UnIH1cbiAgICAgICk7XG5cbiAgICAgIGlmIChyZXN1bHQgJiYgcmVzdWx0LmVycm9ycyAmJiByZXN1bHQuZXJyb3JzLmxlbmd0aCkge1xuICAgICAgICB0aHJvdyByZXN1bHQuZXJyb3JzWzBdO1xuICAgICAgfVxuXG4gICAgICBsb2cuaW5mbygnaGFuZGxlT3V0Z29pbmdTaWduYWxpbmcoKSBjb21wbGV0ZWQgc3VjY2Vzc2Z1bGx5Jyk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGlmIChlcnIgJiYgZXJyLmVycm9ycyAmJiBlcnIuZXJyb3JzLmxlbmd0aCA+IDApIHtcbiAgICAgICAgbG9nLmVycm9yKGBoYW5kbGVPdXRnb2luZ1NpZ25hbGluZygpIGZhaWxlZDogJHtlcnIuZXJyb3JzWzBdLnJlYXNvbn1gKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5lcnJvcignaGFuZGxlT3V0Z29pbmdTaWduYWxpbmcoKSBmYWlsZWQnKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cblxuICAvLyBJZiB3ZSByZXR1cm4gbnVsbCBoZXJlLCB3ZSBoYW5nIHVwIHRoZSBjYWxsLlxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUluY29taW5nQ2FsbChjYWxsOiBDYWxsKTogUHJvbWlzZTxDYWxsU2V0dGluZ3MgfCBudWxsPiB7XG4gICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5oYW5kbGVJbmNvbWluZ0NhbGwoKScpO1xuXG4gICAgaWYgKCF0aGlzLnV4QWN0aW9ucyB8fCAhdGhpcy5sb2NhbERldmljZUlkKSB7XG4gICAgICBsb2cuZXJyb3IoJ01pc3NpbmcgcmVxdWlyZWQgb2JqZWN0cywgaWdub3JpbmcgaW5jb21pbmcgY2FsbC4nKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIGNvbnN0IGNvbnZlcnNhdGlvbiA9IHdpbmRvdy5Db252ZXJzYXRpb25Db250cm9sbGVyLmdldChjYWxsLnJlbW90ZVVzZXJJZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyBjb252ZXJzYXRpb24sIGlnbm9yaW5nIGluY29taW5nIGNhbGwuJyk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICB0cnkge1xuICAgICAgLy8gVGhlIHBlZXIgbXVzdCBiZSAndHJ1c3RlZCcgYmVmb3JlIGFjY2VwdGluZyBhIGNhbGwgZnJvbSB0aGVtLlxuICAgICAgLy8gVGhpcyBpcyBtb3N0bHkgdGhlIHNhZmV0eSBudW1iZXIgY2hlY2ssIHVudmVyaWZpZWQgbWVhbmluZyB0aGF0IHRoZXkgd2VyZVxuICAgICAgLy8gdmVyaWZpZWQgYmVmb3JlIGJ1dCBub3cgdGhleSBhcmUgbm90LlxuICAgICAgY29uc3QgdmVyaWZpZWRFbnVtID0gYXdhaXQgY29udmVyc2F0aW9uLnNhZmVHZXRWZXJpZmllZCgpO1xuICAgICAgaWYgKFxuICAgICAgICB2ZXJpZmllZEVudW0gPT09XG4gICAgICAgIHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UucHJvdG9jb2wuVmVyaWZpZWRTdGF0dXMuVU5WRVJJRklFRFxuICAgICAgKSB7XG4gICAgICAgIGxvZy5pbmZvKFxuICAgICAgICAgIGBQZWVyIGlzIG5vdCB0cnVzdGVkLCBpZ25vcmluZyBpbmNvbWluZyBjYWxsIGZvciBjb252ZXJzYXRpb246ICR7Y29udmVyc2F0aW9uLmlkRm9yTG9nZ2luZygpfWBcbiAgICAgICAgKTtcbiAgICAgICAgdGhpcy5hZGRDYWxsSGlzdG9yeUZvckZhaWxlZEluY29taW5nQ2FsbChcbiAgICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgICAgY2FsbC5pc1ZpZGVvQ2FsbCxcbiAgICAgICAgICBEYXRlLm5vdygpXG4gICAgICAgICk7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICB0aGlzLmF0dGFjaFRvQ2FsbChjb252ZXJzYXRpb24sIGNhbGwpO1xuXG4gICAgICB0aGlzLnV4QWN0aW9ucy5yZWNlaXZlSW5jb21pbmdEaXJlY3RDYWxsKHtcbiAgICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgaXNWaWRlb0NhbGw6IGNhbGwuaXNWaWRlb0NhbGwsXG4gICAgICB9KTtcblxuICAgICAgbG9nLmluZm8oJ0NhbGxpbmdDbGFzcy5oYW5kbGVJbmNvbWluZ0NhbGwoKTogUHJvY2VlZGluZycpO1xuXG4gICAgICByZXR1cm4gYXdhaXQgdGhpcy5nZXRDYWxsU2V0dGluZ3MoY29udmVyc2F0aW9uKTtcbiAgICB9IGNhdGNoIChlcnIpIHtcbiAgICAgIGxvZy5lcnJvcihgSWdub3JpbmcgaW5jb21pbmcgY2FsbDogJHtlcnIuc3RhY2t9YCk7XG4gICAgICB0aGlzLmFkZENhbGxIaXN0b3J5Rm9yRmFpbGVkSW5jb21pbmdDYWxsKFxuICAgICAgICBjb252ZXJzYXRpb24sXG4gICAgICAgIGNhbGwuaXNWaWRlb0NhbGwsXG4gICAgICAgIERhdGUubm93KClcbiAgICAgICk7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGhhbmRsZUF1dG9FbmRlZEluY29taW5nQ2FsbFJlcXVlc3QoXG4gICAgcmVtb3RlVXNlcklkOiBVc2VySWQsXG4gICAgcmVhc29uOiBDYWxsRW5kZWRSZWFzb24sXG4gICAgYWdlSW5TZWNvbmRzOiBudW1iZXIsXG4gICAgd2FzVmlkZW9DYWxsOiBib29sZWFuLFxuICAgIHJlY2VpdmVkQXRDb3VudGVyOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KHJlbW90ZVVzZXJJZCk7XG4gICAgaWYgKCFjb252ZXJzYXRpb24pIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICAvLyBUaGlzIGlzIGV4dHJhIGRlZmVuc2l2ZSwganVzdCBpbiBjYXNlIFJpbmdSVEMgcGFzc2VzIHVzIGEgYmFkIHZhbHVlLiAoSXQgcHJvYmFibHlcbiAgICAvLyAgIHdvbid0LilcbiAgICBjb25zdCBhZ2VJbk1pbGxpc2Vjb25kcyA9XG4gICAgICBpc05vcm1hbE51bWJlcihhZ2VJblNlY29uZHMpICYmIGFnZUluU2Vjb25kcyA+PSAwXG4gICAgICAgID8gYWdlSW5TZWNvbmRzICogZHVyYXRpb25zLlNFQ09ORFxuICAgICAgICA6IDA7XG4gICAgY29uc3QgZW5kZWRUaW1lID0gRGF0ZS5ub3coKSAtIGFnZUluTWlsbGlzZWNvbmRzO1xuXG4gICAgdGhpcy5hZGRDYWxsSGlzdG9yeUZvckF1dG9FbmRlZEluY29taW5nQ2FsbChcbiAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgIHJlYXNvbixcbiAgICAgIGVuZGVkVGltZSxcbiAgICAgIHdhc1ZpZGVvQ2FsbCxcbiAgICAgIHJlY2VpdmVkQXRDb3VudGVyXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYXR0YWNoVG9DYWxsKGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWwsIGNhbGw6IENhbGwpOiB2b2lkIHtcbiAgICB0aGlzLmNhbGxzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uLmlkXSA9IGNhbGw7XG5cbiAgICBjb25zdCB7IHV4QWN0aW9ucyB9ID0gdGhpcztcbiAgICBpZiAoIXV4QWN0aW9ucykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGxldCBhY2NlcHRlZFRpbWU6IG51bWJlciB8IHVuZGVmaW5lZDtcblxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgIGNhbGwuaGFuZGxlU3RhdGVDaGFuZ2VkID0gKCkgPT4ge1xuICAgICAgaWYgKGNhbGwuc3RhdGUgPT09IENhbGxTdGF0ZS5BY2NlcHRlZCkge1xuICAgICAgICBhY2NlcHRlZFRpbWUgPSBhY2NlcHRlZFRpbWUgfHwgRGF0ZS5ub3coKTtcbiAgICAgIH0gZWxzZSBpZiAoY2FsbC5zdGF0ZSA9PT0gQ2FsbFN0YXRlLkVuZGVkKSB7XG4gICAgICAgIHRoaXMuYWRkQ2FsbEhpc3RvcnlGb3JFbmRlZENhbGwoY29udmVyc2F0aW9uLCBjYWxsLCBhY2NlcHRlZFRpbWUpO1xuICAgICAgICB0aGlzLnN0b3BEZXZpY2VSZXNlbGVjdGlvblRpbWVyKCk7XG4gICAgICAgIHRoaXMubGFzdE1lZGlhRGV2aWNlU2V0dGluZ3MgPSB1bmRlZmluZWQ7XG4gICAgICAgIGRlbGV0ZSB0aGlzLmNhbGxzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uLmlkXTtcbiAgICAgIH1cbiAgICAgIHV4QWN0aW9ucy5jYWxsU3RhdGVDaGFuZ2Uoe1xuICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICBhY2NlcHRlZFRpbWUsXG4gICAgICAgIGNhbGxTdGF0ZTogY2FsbC5zdGF0ZSxcbiAgICAgICAgY2FsbEVuZGVkUmVhc29uOiBjYWxsLmVuZGVkUmVhc29uLFxuICAgICAgICBpc0luY29taW5nOiBjYWxsLmlzSW5jb21pbmcsXG4gICAgICAgIGlzVmlkZW9DYWxsOiBjYWxsLmlzVmlkZW9DYWxsLFxuICAgICAgICB0aXRsZTogY29udmVyc2F0aW9uLmdldFRpdGxlKCksXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgY2FsbC5oYW5kbGVSZW1vdGVWaWRlb0VuYWJsZWQgPSAoKSA9PiB7XG4gICAgICB1eEFjdGlvbnMucmVtb3RlVmlkZW9DaGFuZ2Uoe1xuICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICBoYXNWaWRlbzogY2FsbC5yZW1vdGVWaWRlb0VuYWJsZWQsXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLXBhcmFtLXJlYXNzaWduXG4gICAgY2FsbC5oYW5kbGVSZW1vdGVTaGFyaW5nU2NyZWVuID0gKCkgPT4ge1xuICAgICAgdXhBY3Rpb25zLnJlbW90ZVNoYXJpbmdTY3JlZW5DaGFuZ2Uoe1xuICAgICAgICBjb252ZXJzYXRpb25JZDogY29udmVyc2F0aW9uLmlkLFxuICAgICAgICBpc1NoYXJpbmdTY3JlZW46IEJvb2xlYW4oY2FsbC5yZW1vdGVTaGFyaW5nU2NyZWVuKSxcbiAgICAgIH0pO1xuICAgIH07XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZUxvZ01lc3NhZ2UoXG4gICAgbGV2ZWw6IENhbGxMb2dMZXZlbCxcbiAgICBmaWxlTmFtZTogc3RyaW5nLFxuICAgIGxpbmU6IG51bWJlcixcbiAgICBtZXNzYWdlOiBzdHJpbmdcbiAgKSB7XG4gICAgc3dpdGNoIChsZXZlbCkge1xuICAgICAgY2FzZSBDYWxsTG9nTGV2ZWwuSW5mbzpcbiAgICAgICAgbG9nLmluZm8oYCR7ZmlsZU5hbWV9OiR7bGluZX0gJHttZXNzYWdlfWApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgQ2FsbExvZ0xldmVsLldhcm46XG4gICAgICAgIGxvZy53YXJuKGAke2ZpbGVOYW1lfToke2xpbmV9ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIENhbGxMb2dMZXZlbC5FcnJvcjpcbiAgICAgICAgbG9nLmVycm9yKGAke2ZpbGVOYW1lfToke2xpbmV9ICR7bWVzc2FnZX1gKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIGFzeW5jIGhhbmRsZVNlbmRIdHRwUmVxdWVzdChcbiAgICByZXF1ZXN0SWQ6IG51bWJlcixcbiAgICB1cmw6IHN0cmluZyxcbiAgICBtZXRob2Q6IEh0dHBNZXRob2QsXG4gICAgaGVhZGVyczogeyBbbmFtZTogc3RyaW5nXTogc3RyaW5nIH0sXG4gICAgYm9keTogVWludDhBcnJheSB8IHVuZGVmaW5lZFxuICApIHtcbiAgICBpZiAoIXdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZykge1xuICAgICAgUmluZ1JUQy5odHRwUmVxdWVzdEZhaWxlZChyZXF1ZXN0SWQsICdXZSBhcmUgb2ZmbGluZScpO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGh0dHBNZXRob2QgPSBSSU5HUlRDX0hUVFBfTUVUSE9EX1RPX09VUl9IVFRQX01FVEhPRC5nZXQobWV0aG9kKTtcbiAgICBpZiAoaHR0cE1ldGhvZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBSaW5nUlRDLmh0dHBSZXF1ZXN0RmFpbGVkKFxuICAgICAgICByZXF1ZXN0SWQsXG4gICAgICAgIGBVbmtub3duIG1ldGhvZDogJHtKU09OLnN0cmluZ2lmeShtZXRob2QpfWBcbiAgICAgICk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgbGV0IHJlc3VsdDtcbiAgICB0cnkge1xuICAgICAgcmVzdWx0ID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLnNlcnZlci5tYWtlU2Z1UmVxdWVzdChcbiAgICAgICAgdXJsLFxuICAgICAgICBodHRwTWV0aG9kLFxuICAgICAgICBoZWFkZXJzLFxuICAgICAgICBib2R5XG4gICAgICApO1xuICAgIH0gY2F0Y2ggKGVycikge1xuICAgICAgaWYgKGVyci5jb2RlICE9PSAtMSkge1xuICAgICAgICAvLyBXZWJBUEkgdHJlYXRzIGNlcnRhaW4gcmVzcG9uc2UgY29kZXMgYXMgZXJyb3JzLCBidXQgUmluZ1JUQyBzdGlsbCBuZWVkcyB0b1xuICAgICAgICAvLyBzZWUgdGhlbS4gSXQgZG9lcyBub3QgY3VycmVudGx5IGxvb2sgYXQgdGhlIHJlc3BvbnNlIGJvZHksIHNvIHdlJ3JlIGdpdmluZ1xuICAgICAgICAvLyBpdCBhbiBlbXB0eSBvbmUuXG4gICAgICAgIFJpbmdSVEMucmVjZWl2ZWRIdHRwUmVzcG9uc2UocmVxdWVzdElkLCBlcnIuY29kZSwgQnVmZmVyLmFsbG9jKDApKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxvZy5lcnJvcignaGFuZGxlU2VuZEh0dHBSZXF1ZXN0OiBmZXRjaCBmYWlsZWQgd2l0aCBlcnJvcicsIGVycik7XG4gICAgICAgIFJpbmdSVEMuaHR0cFJlcXVlc3RGYWlsZWQocmVxdWVzdElkLCBTdHJpbmcoZXJyKSk7XG4gICAgICB9XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgUmluZ1JUQy5yZWNlaXZlZEh0dHBSZXNwb25zZShcbiAgICAgIHJlcXVlc3RJZCxcbiAgICAgIHJlc3VsdC5yZXNwb25zZS5zdGF0dXMsXG4gICAgICBCdWZmZXIuZnJvbShyZXN1bHQuZGF0YSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBnZXRSZW1vdGVVc2VySWRGcm9tQ29udmVyc2F0aW9uKFxuICAgIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbiAgKTogVXNlcklkIHwgdW5kZWZpbmVkIHwgbnVsbCB7XG4gICAgY29uc3QgcmVjaXBpZW50cyA9IGNvbnZlcnNhdGlvbi5nZXRSZWNpcGllbnRzKCk7XG4gICAgaWYgKHJlY2lwaWVudHMubGVuZ3RoICE9PSAxKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICByZXR1cm4gcmVjaXBpZW50c1swXTtcbiAgfVxuXG4gIHByaXZhdGUgZ2V0IGxvY2FsRGV2aWNlSWQoKTogRGV2aWNlSWQgfCBudWxsIHtcbiAgICByZXR1cm4gdGhpcy5wYXJzZURldmljZUlkKHdpbmRvdy50ZXh0c2VjdXJlLnN0b3JhZ2UudXNlci5nZXREZXZpY2VJZCgpKTtcbiAgfVxuXG4gIHByaXZhdGUgcGFyc2VEZXZpY2VJZChcbiAgICBkZXZpY2VJZDogbnVtYmVyIHwgc3RyaW5nIHwgdW5kZWZpbmVkXG4gICk6IERldmljZUlkIHwgbnVsbCB7XG4gICAgaWYgKHR5cGVvZiBkZXZpY2VJZCA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHJldHVybiBwYXJzZUludChkZXZpY2VJZCwgMTApO1xuICAgIH1cbiAgICBpZiAodHlwZW9mIGRldmljZUlkID09PSAnbnVtYmVyJykge1xuICAgICAgcmV0dXJuIGRldmljZUlkO1xuICAgIH1cbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgZ2V0Q2FsbFNldHRpbmdzKFxuICAgIGNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uTW9kZWxcbiAgKTogUHJvbWlzZTxDYWxsU2V0dGluZ3M+IHtcbiAgICBpZiAoIXdpbmRvdy50ZXh0c2VjdXJlLm1lc3NhZ2luZykge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCdnZXRDYWxsU2V0dGluZ3M6IG9mZmxpbmUhJyk7XG4gICAgfVxuXG4gICAgY29uc3QgaWNlU2VydmVyID0gYXdhaXQgd2luZG93LnRleHRzZWN1cmUubWVzc2FnaW5nLnNlcnZlci5nZXRJY2VTZXJ2ZXJzKCk7XG5cbiAgICBjb25zdCBzaG91bGRSZWxheUNhbGxzID0gd2luZG93LkV2ZW50cy5nZXRBbHdheXNSZWxheUNhbGxzKCk7XG5cbiAgICAvLyBJZiB0aGUgcGVlciBpcyAndW5rbm93bicsIGkuZS4gbm90IGluIHRoZSBjb250YWN0IGxpc3QsIGZvcmNlIElQIGhpZGluZy5cbiAgICBjb25zdCBpc0NvbnRhY3RVbmtub3duID0gIWNvbnZlcnNhdGlvbi5pc0Zyb21PckFkZGVkQnlUcnVzdGVkQ29udGFjdCgpO1xuXG4gICAgcmV0dXJuIHtcbiAgICAgIGljZVNlcnZlcjoge1xuICAgICAgICAuLi5pY2VTZXJ2ZXIsXG4gICAgICAgIHVybHM6IGljZVNlcnZlci51cmxzLnNsaWNlKCksXG4gICAgICB9LFxuICAgICAgaGlkZUlwOiBzaG91bGRSZWxheUNhbGxzIHx8IGlzQ29udGFjdFVua25vd24sXG4gICAgICBiYW5kd2lkdGhNb2RlOiBCYW5kd2lkdGhNb2RlLk5vcm1hbCxcbiAgICAgIC8vIFRPRE86IERFU0tUT1AtMzEwMVxuICAgICAgLy8gYXVkaW9MZXZlbHNJbnRlcnZhbE1pbGxpczogQVVESU9fTEVWRUxfSU5URVJWQUxfTVMsXG4gICAgfTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2FsbEhpc3RvcnlGb3JFbmRlZENhbGwoXG4gICAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAgICBjYWxsOiBDYWxsLFxuICAgIGFjY2VwdGVkVGltZVBhcmFtOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgbGV0IGFjY2VwdGVkVGltZSA9IGFjY2VwdGVkVGltZVBhcmFtO1xuXG4gICAgY29uc3QgeyBlbmRlZFJlYXNvbiwgaXNJbmNvbWluZyB9ID0gY2FsbDtcbiAgICBjb25zdCB3YXNBY2NlcHRlZCA9IEJvb2xlYW4oYWNjZXB0ZWRUaW1lKTtcbiAgICBjb25zdCBpc091dGdvaW5nID0gIWlzSW5jb21pbmc7XG4gICAgY29uc3Qgd2FzRGVjbGluZWQgPVxuICAgICAgIXdhc0FjY2VwdGVkICYmXG4gICAgICAoZW5kZWRSZWFzb24gPT09IENhbGxFbmRlZFJlYXNvbi5EZWNsaW5lZCB8fFxuICAgICAgICBlbmRlZFJlYXNvbiA9PT0gQ2FsbEVuZGVkUmVhc29uLkRlY2xpbmVkT25Bbm90aGVyRGV2aWNlIHx8XG4gICAgICAgIChpc0luY29taW5nICYmIGVuZGVkUmVhc29uID09PSBDYWxsRW5kZWRSZWFzb24uTG9jYWxIYW5ndXApIHx8XG4gICAgICAgIChpc091dGdvaW5nICYmIGVuZGVkUmVhc29uID09PSBDYWxsRW5kZWRSZWFzb24uUmVtb3RlSGFuZ3VwKSB8fFxuICAgICAgICAoaXNPdXRnb2luZyAmJlxuICAgICAgICAgIGVuZGVkUmVhc29uID09PSBDYWxsRW5kZWRSZWFzb24uUmVtb3RlSGFuZ3VwTmVlZFBlcm1pc3Npb24pKTtcbiAgICBpZiAoY2FsbC5lbmRlZFJlYXNvbiA9PT0gQ2FsbEVuZGVkUmVhc29uLkFjY2VwdGVkT25Bbm90aGVyRGV2aWNlKSB7XG4gICAgICBhY2NlcHRlZFRpbWUgPSBEYXRlLm5vdygpO1xuICAgIH1cblxuICAgIGNvbnZlcnNhdGlvbi5hZGRDYWxsSGlzdG9yeShcbiAgICAgIHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgd2FzSW5jb21pbmc6IGNhbGwuaXNJbmNvbWluZyxcbiAgICAgICAgd2FzVmlkZW9DYWxsOiBjYWxsLmlzVmlkZW9DYWxsLFxuICAgICAgICB3YXNEZWNsaW5lZCxcbiAgICAgICAgYWNjZXB0ZWRUaW1lLFxuICAgICAgICBlbmRlZFRpbWU6IERhdGUubm93KCksXG4gICAgICB9LFxuICAgICAgdW5kZWZpbmVkXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgYWRkQ2FsbEhpc3RvcnlGb3JGYWlsZWRJbmNvbWluZ0NhbGwoXG4gICAgY29udmVyc2F0aW9uOiBDb252ZXJzYXRpb25Nb2RlbCxcbiAgICB3YXNWaWRlb0NhbGw6IGJvb2xlYW4sXG4gICAgdGltZXN0YW1wOiBudW1iZXJcbiAgKSB7XG4gICAgY29udmVyc2F0aW9uLmFkZENhbGxIaXN0b3J5KFxuICAgICAge1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICB3YXNJbmNvbWluZzogdHJ1ZSxcbiAgICAgICAgd2FzVmlkZW9DYWxsLFxuICAgICAgICAvLyBTaW5jZSB0aGUgdXNlciBkaWRuJ3QgZGVjbGluZSwgbWFrZSBzdXJlIGl0IHNob3dzIHVwIGFzIGEgbWlzc2VkIGNhbGwgaW5zdGVhZFxuICAgICAgICB3YXNEZWNsaW5lZDogZmFsc2UsXG4gICAgICAgIGFjY2VwdGVkVGltZTogdW5kZWZpbmVkLFxuICAgICAgICBlbmRlZFRpbWU6IHRpbWVzdGFtcCxcbiAgICAgIH0sXG4gICAgICB1bmRlZmluZWRcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBhZGRDYWxsSGlzdG9yeUZvckF1dG9FbmRlZEluY29taW5nQ2FsbChcbiAgICBjb252ZXJzYXRpb246IENvbnZlcnNhdGlvbk1vZGVsLFxuICAgIHJlYXNvbjogQ2FsbEVuZGVkUmVhc29uLFxuICAgIGVuZGVkVGltZTogbnVtYmVyLFxuICAgIHdhc1ZpZGVvQ2FsbDogYm9vbGVhbixcbiAgICByZWNlaXZlZEF0Q291bnRlcjogbnVtYmVyIHwgdW5kZWZpbmVkXG4gICkge1xuICAgIGxldCB3YXNEZWNsaW5lZCA9IGZhbHNlO1xuICAgIGxldCBhY2NlcHRlZFRpbWU7XG5cbiAgICBpZiAocmVhc29uID09PSBDYWxsRW5kZWRSZWFzb24uQWNjZXB0ZWRPbkFub3RoZXJEZXZpY2UpIHtcbiAgICAgIGFjY2VwdGVkVGltZSA9IGVuZGVkVGltZTtcbiAgICB9IGVsc2UgaWYgKHJlYXNvbiA9PT0gQ2FsbEVuZGVkUmVhc29uLkRlY2xpbmVkT25Bbm90aGVyRGV2aWNlKSB7XG4gICAgICB3YXNEZWNsaW5lZCA9IHRydWU7XG4gICAgfVxuICAgIC8vIE90aGVyd2lzZSBpdCB3aWxsIHNob3cgdXAgYXMgYSBtaXNzZWQgY2FsbC5cblxuICAgIGNvbnZlcnNhdGlvbi5hZGRDYWxsSGlzdG9yeShcbiAgICAgIHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgd2FzSW5jb21pbmc6IHRydWUsXG4gICAgICAgIHdhc1ZpZGVvQ2FsbCxcbiAgICAgICAgd2FzRGVjbGluZWQsXG4gICAgICAgIGFjY2VwdGVkVGltZSxcbiAgICAgICAgZW5kZWRUaW1lLFxuICAgICAgfSxcbiAgICAgIHJlY2VpdmVkQXRDb3VudGVyXG4gICAgKTtcbiAgfVxuXG4gIHB1YmxpYyBhc3luYyB1cGRhdGVDYWxsSGlzdG9yeUZvckdyb3VwQ2FsbChcbiAgICBjb252ZXJzYXRpb25JZDogc3RyaW5nLFxuICAgIHBlZWtJbmZvOiB1bmRlZmluZWQgfCBQZWVrSW5mb1xuICApOiBQcm9taXNlPHZvaWQ+IHtcbiAgICAvLyBJZiB3ZSBkb24ndCBoYXZlIHRoZSBuZWNlc3NhcnkgcGllY2VzIHRvIHBlZWssIGJhaWwuIChJdCdzIG9rYXkgaWYgd2UgZG9uJ3QuKVxuICAgIGlmICghcGVla0luZm8gfHwgIXBlZWtJbmZvLmVyYUlkIHx8ICFwZWVrSW5mby5jcmVhdG9yKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNyZWF0b3JVdWlkID0gYnl0ZXNUb1V1aWQocGVla0luZm8uY3JlYXRvcik7XG4gICAgaWYgKCFjcmVhdG9yVXVpZCkge1xuICAgICAgbG9nLmVycm9yKCd1cGRhdGVDYWxsSGlzdG9yeUZvckdyb3VwQ2FsbCgpOiBiYWQgY3JlYXRvciBVVUlEJyk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGNyZWF0b3JDb252ZXJzYXRpb24gPSB3aW5kb3cuQ29udmVyc2F0aW9uQ29udHJvbGxlci5nZXQoY3JlYXRvclV1aWQpO1xuXG4gICAgY29uc3QgY29udmVyc2F0aW9uID0gd2luZG93LkNvbnZlcnNhdGlvbkNvbnRyb2xsZXIuZ2V0KGNvbnZlcnNhdGlvbklkKTtcbiAgICBpZiAoIWNvbnZlcnNhdGlvbikge1xuICAgICAgbG9nLmVycm9yKCd1cGRhdGVDYWxsSGlzdG9yeUZvckdyb3VwQ2FsbCgpOiBjb3VsZCBub3QgZmluZCBjb252ZXJzYXRpb24nKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpc05ld0NhbGwgPSBhd2FpdCBjb252ZXJzYXRpb24udXBkYXRlQ2FsbEhpc3RvcnlGb3JHcm91cENhbGwoXG4gICAgICBwZWVrSW5mby5lcmFJZCxcbiAgICAgIGNyZWF0b3JVdWlkXG4gICAgKTtcbiAgICBjb25zdCB3YXNTdGFydGVkQnlNZSA9IEJvb2xlYW4oXG4gICAgICBjcmVhdG9yQ29udmVyc2F0aW9uICYmIGlzTWUoY3JlYXRvckNvbnZlcnNhdGlvbi5hdHRyaWJ1dGVzKVxuICAgICk7XG4gICAgY29uc3QgaXNBbnlib2R5RWxzZUluR3JvdXBDYWxsID0gQm9vbGVhbihwZWVrSW5mby5kZXZpY2VzLmxlbmd0aCk7XG5cbiAgICBpZiAoXG4gICAgICBpc05ld0NhbGwgJiZcbiAgICAgICF3YXNTdGFydGVkQnlNZSAmJlxuICAgICAgaXNBbnlib2R5RWxzZUluR3JvdXBDYWxsICYmXG4gICAgICAhY29udmVyc2F0aW9uLmlzTXV0ZWQoKVxuICAgICkge1xuICAgICAgdGhpcy5ub3RpZnlGb3JHcm91cENhbGwoY29udmVyc2F0aW9uLCBjcmVhdG9yQ29udmVyc2F0aW9uKTtcbiAgICB9XG4gIH1cblxuICBwcml2YXRlIG5vdGlmeUZvckdyb3VwQ2FsbChcbiAgICBjb252ZXJzYXRpb246IFJlYWRvbmx5PENvbnZlcnNhdGlvbk1vZGVsPixcbiAgICBjcmVhdG9yQ29udmVyc2F0aW9uOiB1bmRlZmluZWQgfCBSZWFkb25seTxDb252ZXJzYXRpb25Nb2RlbD5cbiAgKTogdm9pZCB7XG4gICAgbGV0IG5vdGlmaWNhdGlvblRpdGxlOiBzdHJpbmc7XG4gICAgbGV0IG5vdGlmaWNhdGlvbk1lc3NhZ2U6IHN0cmluZztcblxuICAgIHN3aXRjaCAobm90aWZpY2F0aW9uU2VydmljZS5nZXROb3RpZmljYXRpb25TZXR0aW5nKCkpIHtcbiAgICAgIGNhc2UgTm90aWZpY2F0aW9uU2V0dGluZy5PZmY6XG4gICAgICAgIHJldHVybjtcbiAgICAgIGNhc2UgTm90aWZpY2F0aW9uU2V0dGluZy5Ob05hbWVPck1lc3NhZ2U6XG4gICAgICAgIG5vdGlmaWNhdGlvblRpdGxlID0gRkFMTEJBQ0tfTk9USUZJQ0FUSU9OX1RJVExFO1xuICAgICAgICBub3RpZmljYXRpb25NZXNzYWdlID0gd2luZG93LmkxOG4oXG4gICAgICAgICAgJ2NhbGxpbmdfX2NhbGwtbm90aWZpY2F0aW9uX19zdGFydGVkLWJ5LXNvbWVvbmUnXG4gICAgICAgICk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgZGVmYXVsdDpcbiAgICAgICAgLy8gVGhlc2UgZmFsbGJhY2tzIGV4aXN0IGp1c3QgaW4gY2FzZSBzb21ldGhpbmcgdW5leHBlY3RlZCBnb2VzIHdyb25nLlxuICAgICAgICBub3RpZmljYXRpb25UaXRsZSA9XG4gICAgICAgICAgY29udmVyc2F0aW9uPy5nZXRUaXRsZSgpIHx8IEZBTExCQUNLX05PVElGSUNBVElPTl9USVRMRTtcbiAgICAgICAgbm90aWZpY2F0aW9uTWVzc2FnZSA9IGNyZWF0b3JDb252ZXJzYXRpb25cbiAgICAgICAgICA/IHdpbmRvdy5pMThuKCdjYWxsaW5nX19jYWxsLW5vdGlmaWNhdGlvbl9fc3RhcnRlZCcsIFtcbiAgICAgICAgICAgICAgY3JlYXRvckNvbnZlcnNhdGlvbi5nZXRUaXRsZSgpLFxuICAgICAgICAgICAgXSlcbiAgICAgICAgICA6IHdpbmRvdy5pMThuKCdjYWxsaW5nX19jYWxsLW5vdGlmaWNhdGlvbl9fc3RhcnRlZC1ieS1zb21lb25lJyk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cblxuICAgIG5vdGlmaWNhdGlvblNlcnZpY2Uubm90aWZ5KHtcbiAgICAgIGljb246ICdpbWFnZXMvaWNvbnMvdjIvdmlkZW8tc29saWQtMjQuc3ZnJyxcbiAgICAgIG1lc3NhZ2U6IG5vdGlmaWNhdGlvbk1lc3NhZ2UsXG4gICAgICBvbk5vdGlmaWNhdGlvbkNsaWNrOiAoKSA9PiB7XG4gICAgICAgIHRoaXMudXhBY3Rpb25zPy5zdGFydENhbGxpbmdMb2JieSh7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6IGNvbnZlcnNhdGlvbi5pZCxcbiAgICAgICAgICBpc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9LFxuICAgICAgc2lsZW50OiBmYWxzZSxcbiAgICAgIHRpdGxlOiBub3RpZmljYXRpb25UaXRsZSxcbiAgICB9KTtcbiAgfVxuXG4gIHByaXZhdGUgYXN5bmMgY2xlYW5FeHBpcmVkR3JvdXBDYWxsUmluZ3NBbmRMb29wKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHRyeSB7XG4gICAgICBhd2FpdCBjbGVhbkV4cGlyZWRHcm91cENhbGxSaW5ncygpO1xuICAgIH0gY2F0Y2ggKGVycjogdW5rbm93bikge1xuICAgICAgLy8gVGhlc2UgZXJyb3JzIGFyZSBpZ25vcmVkIGhlcmUuIFRoZXkgc2hvdWxkIGJlIGxvZ2dlZCBlbHNld2hlcmUgYW5kIGl0J3Mgb2theSBpZlxuICAgICAgLy8gICB3ZSBkb24ndCBkbyBhIGNsZWFudXAgdGhpcyB0aW1lLlxuICAgIH1cblxuICAgIHNldFRpbWVvdXQoKCkgPT4ge1xuICAgICAgdGhpcy5jbGVhbkV4cGlyZWRHcm91cENhbGxSaW5nc0FuZExvb3AoKTtcbiAgICB9LCBDTEVBTl9FWFBJUkVEX0dST1VQX0NBTExfUklOR1NfSU5URVJWQUwpO1xuICB9XG59XG5cbmV4cG9ydCBjb25zdCBjYWxsaW5nID0gbmV3IENhbGxpbmdDbGFzcygpO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBQUE7QUFBQTtBQUFB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
