var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var import_chai = require("chai");
var sinon = __toESM(require("sinon"));
var import_lodash = require("lodash");
var import_reducer = require("../../../state/reducer");
var import_noop = require("../../../state/ducks/noop");
var import_calling = require("../../../state/ducks/calling");
var import_truncateAudioLevel = require("../../../calling/truncateAudioLevel");
var import_calling2 = require("../../../services/calling");
var import_Calling = require("../../../types/Calling");
var import_UUID = require("../../../types/UUID");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
describe("calling duck", () => {
  const stateWithDirectCall = {
    ...(0, import_calling.getEmptyState)(),
    callsByConversation: {
      "fake-direct-call-conversation-id": {
        callMode: import_Calling.CallMode.Direct,
        conversationId: "fake-direct-call-conversation-id",
        callState: import_Calling.CallState.Accepted,
        isIncoming: false,
        isVideoCall: false,
        hasRemoteVideo: false
      }
    }
  };
  const stateWithActiveDirectCall = {
    ...stateWithDirectCall,
    activeCallState: {
      conversationId: "fake-direct-call-conversation-id",
      hasLocalAudio: true,
      hasLocalVideo: false,
      localAudioLevel: 0,
      viewMode: import_Calling.CallViewMode.Grid,
      showParticipantsList: false,
      safetyNumberChangedUuids: [],
      outgoingRing: true,
      pip: false,
      settingsDialogOpen: false
    }
  };
  const stateWithIncomingDirectCall = {
    ...(0, import_calling.getEmptyState)(),
    callsByConversation: {
      "fake-direct-call-conversation-id": {
        callMode: import_Calling.CallMode.Direct,
        conversationId: "fake-direct-call-conversation-id",
        callState: import_Calling.CallState.Ringing,
        isIncoming: true,
        isVideoCall: false,
        hasRemoteVideo: false
      }
    }
  };
  const creatorUuid = import_UUID.UUID.generate().toString();
  const differentCreatorUuid = import_UUID.UUID.generate().toString();
  const remoteUuid = import_UUID.UUID.generate().toString();
  const ringerUuid = import_UUID.UUID.generate().toString();
  const stateWithGroupCall = {
    ...(0, import_calling.getEmptyState)(),
    callsByConversation: {
      "fake-group-call-conversation-id": {
        callMode: import_Calling.CallMode.Group,
        conversationId: "fake-group-call-conversation-id",
        connectionState: import_Calling.GroupCallConnectionState.Connected,
        joinState: import_Calling.GroupCallJoinState.NotJoined,
        peekInfo: {
          uuids: [creatorUuid],
          creatorUuid,
          eraId: "xyz",
          maxDevices: 16,
          deviceCount: 1
        },
        remoteParticipants: [
          {
            uuid: remoteUuid,
            demuxId: 123,
            hasRemoteAudio: true,
            hasRemoteVideo: true,
            presenting: false,
            sharingScreen: false,
            videoAspectRatio: 4 / 3
          }
        ]
      }
    }
  };
  const stateWithIncomingGroupCall = {
    ...stateWithGroupCall,
    callsByConversation: {
      ...stateWithGroupCall.callsByConversation,
      "fake-group-call-conversation-id": {
        ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
        ringId: BigInt(123),
        ringerUuid: import_UUID.UUID.generate().toString()
      }
    }
  };
  const stateWithActiveGroupCall = {
    ...stateWithGroupCall,
    activeCallState: {
      conversationId: "fake-group-call-conversation-id",
      hasLocalAudio: true,
      hasLocalVideo: false,
      localAudioLevel: 0,
      viewMode: import_Calling.CallViewMode.Grid,
      showParticipantsList: false,
      safetyNumberChangedUuids: [],
      outgoingRing: false,
      pip: false,
      settingsDialogOpen: false
    }
  };
  const stateWithActivePresentationViewGroupCall = {
    ...stateWithGroupCall,
    activeCallState: {
      ...stateWithActiveGroupCall.activeCallState,
      viewMode: import_Calling.CallViewMode.Presentation
    }
  };
  const stateWithActiveSpeakerViewGroupCall = {
    ...stateWithGroupCall,
    activeCallState: {
      ...stateWithActiveGroupCall.activeCallState,
      viewMode: import_Calling.CallViewMode.Speaker
    }
  };
  const ourUuid = import_UUID.UUID.generate().toString();
  const getEmptyRootState = /* @__PURE__ */ __name(() => {
    const rootState = (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)());
    return {
      ...rootState,
      user: {
        ...rootState.user,
        ourUuid
      }
    };
  }, "getEmptyRootState");
  beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
    this.sandbox = sinon.createSandbox();
  }, "beforeEach"));
  afterEach(/* @__PURE__ */ __name(function afterEach2() {
    this.sandbox.restore();
  }, "afterEach"));
  describe("actions", () => {
    describe("getPresentingSources", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServiceGetPresentingSources = this.sandbox.stub(import_calling2.calling, "getPresentingSources").resolves([
          {
            id: "foo.bar",
            name: "Foo Bar",
            thumbnail: "xyz"
          }
        ]);
      }, "beforeEach"));
      it("retrieves sources from the calling service", async function test() {
        const { getPresentingSources } = import_calling.actions;
        const dispatch = sinon.spy();
        await getPresentingSources()(dispatch, getEmptyRootState, null);
        sinon.assert.calledOnce(this.callingServiceGetPresentingSources);
      });
      it("dispatches SET_PRESENTING_SOURCES", async function test() {
        const { getPresentingSources } = import_calling.actions;
        const dispatch = sinon.spy();
        await getPresentingSources()(dispatch, getEmptyRootState, null);
        sinon.assert.calledOnce(dispatch);
        sinon.assert.calledWith(dispatch, {
          type: "calling/SET_PRESENTING_SOURCES",
          payload: [
            {
              id: "foo.bar",
              name: "Foo Bar",
              thumbnail: "xyz"
            }
          ]
        });
      });
    });
    describe("remoteSharingScreenChange", () => {
      it("updates whether someone's screen is being shared", () => {
        const { remoteSharingScreenChange } = import_calling.actions;
        const payload = {
          conversationId: "fake-direct-call-conversation-id",
          isSharingScreen: true
        };
        const state = {
          ...stateWithActiveDirectCall
        };
        const nextState = (0, import_calling.reducer)(state, remoteSharingScreenChange(payload));
        const expectedState = {
          ...stateWithActiveDirectCall,
          callsByConversation: {
            "fake-direct-call-conversation-id": {
              ...stateWithActiveDirectCall.callsByConversation["fake-direct-call-conversation-id"],
              isSharingScreen: true
            }
          }
        };
        import_chai.assert.deepEqual(nextState, expectedState);
      });
    });
    describe("setPresenting", () => {
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServiceSetPresenting = this.sandbox.stub(import_calling2.calling, "setPresenting");
      }, "beforeEach"));
      it("calls setPresenting on the calling service", function test() {
        const { setPresenting } = import_calling.actions;
        const dispatch = sinon.spy();
        const presentedSource = {
          id: "window:786",
          name: "Application"
        };
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: {
            ...stateWithActiveGroupCall
          }
        }), "getState");
        setPresenting(presentedSource)(dispatch, getState, null);
        sinon.assert.calledOnce(this.callingServiceSetPresenting);
        sinon.assert.calledWith(this.callingServiceSetPresenting, "fake-group-call-conversation-id", false, presentedSource);
      });
      it("dispatches SET_PRESENTING", () => {
        const { setPresenting } = import_calling.actions;
        const dispatch = sinon.spy();
        const presentedSource = {
          id: "window:786",
          name: "Application"
        };
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: {
            ...stateWithActiveGroupCall
          }
        }), "getState");
        setPresenting(presentedSource)(dispatch, getState, null);
        sinon.assert.calledOnce(dispatch);
        sinon.assert.calledWith(dispatch, {
          type: "calling/SET_PRESENTING",
          payload: presentedSource
        });
      });
      it("turns off presenting when no value is passed in", () => {
        const dispatch = sinon.spy();
        const { setPresenting } = import_calling.actions;
        const presentedSource = {
          id: "window:786",
          name: "Application"
        };
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: {
            ...stateWithActiveGroupCall
          }
        }), "getState");
        setPresenting(presentedSource)(dispatch, getState, null);
        const action = dispatch.getCall(0).args[0];
        const nextState = (0, import_calling.reducer)(getState().calling, action);
        import_chai.assert.isDefined(nextState.activeCallState);
        import_chai.assert.equal(nextState.activeCallState?.presentingSource, presentedSource);
        import_chai.assert.isUndefined(nextState.activeCallState?.presentingSourcesAvailable);
      });
      it("sets the presenting value when one is passed in", () => {
        const dispatch = sinon.spy();
        const { setPresenting } = import_calling.actions;
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: {
            ...stateWithActiveGroupCall
          }
        }), "getState");
        setPresenting()(dispatch, getState, null);
        const action = dispatch.getCall(0).args[0];
        const nextState = (0, import_calling.reducer)(getState().calling, action);
        import_chai.assert.isDefined(nextState.activeCallState);
        import_chai.assert.isUndefined(nextState.activeCallState?.presentingSource);
        import_chai.assert.isUndefined(nextState.activeCallState?.presentingSourcesAvailable);
      });
    });
    describe("acceptCall", () => {
      const { acceptCall } = import_calling.actions;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServiceAccept = this.sandbox.stub(import_calling2.calling, "acceptDirectCall").resolves();
        this.callingServiceJoin = this.sandbox.stub(import_calling2.calling, "joinGroupCall").resolves();
      }, "beforeEach"));
      describe("accepting a direct call", () => {
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: stateWithIncomingDirectCall
        }), "getState");
        it("dispatches an ACCEPT_CALL_PENDING action", async () => {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-direct-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          sinon.assert.calledOnce(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/ACCEPT_CALL_PENDING",
            payload: {
              conversationId: "fake-direct-call-conversation-id",
              asVideoCall: true
            }
          });
          await acceptCall({
            conversationId: "fake-direct-call-conversation-id",
            asVideoCall: false
          })(dispatch, getState, null);
          sinon.assert.calledTwice(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/ACCEPT_CALL_PENDING",
            payload: {
              conversationId: "fake-direct-call-conversation-id",
              asVideoCall: false
            }
          });
        });
        it("asks the calling service to accept the call", async function test() {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-direct-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          sinon.assert.calledOnce(this.callingServiceAccept);
          sinon.assert.calledWith(this.callingServiceAccept, "fake-direct-call-conversation-id", true);
          await acceptCall({
            conversationId: "fake-direct-call-conversation-id",
            asVideoCall: false
          })(dispatch, getState, null);
          sinon.assert.calledTwice(this.callingServiceAccept);
          sinon.assert.calledWith(this.callingServiceAccept, "fake-direct-call-conversation-id", false);
        });
        it("updates the active call state with ACCEPT_CALL_PENDING", async () => {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-direct-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          const action = dispatch.getCall(0).args[0];
          const result = (0, import_calling.reducer)(stateWithIncomingDirectCall, action);
          import_chai.assert.deepEqual(result.activeCallState, {
            conversationId: "fake-direct-call-conversation-id",
            hasLocalAudio: true,
            hasLocalVideo: true,
            localAudioLevel: 0,
            viewMode: import_Calling.CallViewMode.Grid,
            showParticipantsList: false,
            safetyNumberChangedUuids: [],
            outgoingRing: false,
            pip: false,
            settingsDialogOpen: false
          });
        });
      });
      describe("accepting a group call", () => {
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: stateWithIncomingGroupCall
        }), "getState");
        it("dispatches an ACCEPT_CALL_PENDING action", async () => {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-group-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          sinon.assert.calledOnce(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/ACCEPT_CALL_PENDING",
            payload: {
              conversationId: "fake-group-call-conversation-id",
              asVideoCall: true
            }
          });
          await acceptCall({
            conversationId: "fake-group-call-conversation-id",
            asVideoCall: false
          })(dispatch, getState, null);
          sinon.assert.calledTwice(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/ACCEPT_CALL_PENDING",
            payload: {
              conversationId: "fake-group-call-conversation-id",
              asVideoCall: false
            }
          });
        });
        it("asks the calling service to join the call", async function test() {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-group-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          sinon.assert.calledOnce(this.callingServiceJoin);
          sinon.assert.calledWith(this.callingServiceJoin, "fake-group-call-conversation-id", true, true);
          await acceptCall({
            conversationId: "fake-group-call-conversation-id",
            asVideoCall: false
          })(dispatch, getState, null);
          sinon.assert.calledTwice(this.callingServiceJoin);
          sinon.assert.calledWith(this.callingServiceJoin, "fake-group-call-conversation-id", true, false);
        });
        it("updates the active call state with ACCEPT_CALL_PENDING", async () => {
          const dispatch = sinon.spy();
          await acceptCall({
            conversationId: "fake-group-call-conversation-id",
            asVideoCall: true
          })(dispatch, getState, null);
          const action = dispatch.getCall(0).args[0];
          const result = (0, import_calling.reducer)(stateWithIncomingGroupCall, action);
          import_chai.assert.deepEqual(result.activeCallState, {
            conversationId: "fake-group-call-conversation-id",
            hasLocalAudio: true,
            hasLocalVideo: true,
            localAudioLevel: 0,
            viewMode: import_Calling.CallViewMode.Grid,
            showParticipantsList: false,
            safetyNumberChangedUuids: [],
            outgoingRing: false,
            pip: false,
            settingsDialogOpen: false
          });
        });
      });
    });
    describe("cancelCall", () => {
      const { cancelCall } = import_calling.actions;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServiceStopCallingLobby = this.sandbox.stub(import_calling2.calling, "stopCallingLobby");
      }, "beforeEach"));
      it("stops the calling lobby for that conversation", function test() {
        cancelCall({ conversationId: "123" });
        sinon.assert.calledOnce(this.callingServiceStopCallingLobby);
        sinon.assert.calledWith(this.callingServiceStopCallingLobby, "123");
      });
      it("completely removes an active direct call from the state", () => {
        const result = (0, import_calling.reducer)(stateWithActiveDirectCall, cancelCall({ conversationId: "fake-direct-call-conversation-id" }));
        import_chai.assert.notProperty(result.callsByConversation, "fake-direct-call-conversation-id");
        import_chai.assert.isUndefined(result.activeCallState);
      });
      it("removes the active group call, but leaves it in the state", () => {
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, cancelCall({ conversationId: "fake-group-call-conversation-id" }));
        import_chai.assert.property(result.callsByConversation, "fake-group-call-conversation-id");
        import_chai.assert.isUndefined(result.activeCallState);
      });
    });
    describe("cancelIncomingGroupCallRing", () => {
      const { cancelIncomingGroupCallRing } = import_calling.actions;
      it("does nothing if there is no associated group call", () => {
        const state = (0, import_calling.getEmptyState)();
        const action = cancelIncomingGroupCallRing({
          conversationId: "garbage",
          ringId: BigInt(1)
        });
        const result = (0, import_calling.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("does nothing if the ring to cancel isn't the same one", () => {
        const action = cancelIncomingGroupCallRing({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(999)
        });
        const result = (0, import_calling.reducer)(stateWithIncomingGroupCall, action);
        import_chai.assert.strictEqual(result, stateWithIncomingGroupCall);
      });
      it("removes the ring state, but not the call", () => {
        const action = cancelIncomingGroupCallRing({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(123)
        });
        const result = (0, import_calling.reducer)(stateWithIncomingGroupCall, action);
        const call = result.callsByConversation["fake-group-call-conversation-id"];
        if (call?.callMode !== import_Calling.CallMode.Group) {
          throw new Error("Expected to find a group call");
        }
        import_chai.assert.isUndefined(call.ringId);
        import_chai.assert.isUndefined(call.ringerUuid);
      });
    });
    describe("declineCall", () => {
      const { declineCall } = import_calling.actions;
      let declineDirectCall;
      let declineGroupCall;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        declineDirectCall = this.sandbox.stub(import_calling2.calling, "declineDirectCall");
        declineGroupCall = this.sandbox.stub(import_calling2.calling, "declineGroupCall");
      }, "beforeEach"));
      describe("declining a direct call", () => {
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: stateWithIncomingDirectCall
        }), "getState");
        it("dispatches a DECLINE_DIRECT_CALL action", () => {
          const dispatch = sinon.spy();
          declineCall({ conversationId: "fake-direct-call-conversation-id" })(dispatch, getState, null);
          sinon.assert.calledOnce(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/DECLINE_DIRECT_CALL",
            payload: {
              conversationId: "fake-direct-call-conversation-id"
            }
          });
        });
        it("asks the calling service to decline the call", () => {
          const dispatch = sinon.spy();
          declineCall({ conversationId: "fake-direct-call-conversation-id" })(dispatch, getState, null);
          sinon.assert.calledOnce(declineDirectCall);
          sinon.assert.calledWith(declineDirectCall, "fake-direct-call-conversation-id");
        });
        it("removes the call from the state", () => {
          const dispatch = sinon.spy();
          declineCall({ conversationId: "fake-direct-call-conversation-id" })(dispatch, getState, null);
          const action = dispatch.getCall(0).args[0];
          const result = (0, import_calling.reducer)(stateWithIncomingGroupCall, action);
          import_chai.assert.notProperty(result.callsByConversation, "fake-direct-call-conversation-id");
        });
      });
      describe("declining a group call", () => {
        const getState = /* @__PURE__ */ __name(() => ({
          ...getEmptyRootState(),
          calling: stateWithIncomingGroupCall
        }), "getState");
        it("dispatches a CANCEL_INCOMING_GROUP_CALL_RING action", () => {
          const dispatch = sinon.spy();
          declineCall({ conversationId: "fake-group-call-conversation-id" })(dispatch, getState, null);
          sinon.assert.calledOnce(dispatch);
          sinon.assert.calledWith(dispatch, {
            type: "calling/CANCEL_INCOMING_GROUP_CALL_RING",
            payload: {
              conversationId: "fake-group-call-conversation-id",
              ringId: BigInt(123)
            }
          });
        });
        it("asks the calling service to decline the call", () => {
          const dispatch = sinon.spy();
          declineCall({ conversationId: "fake-group-call-conversation-id" })(dispatch, getState, null);
          sinon.assert.calledOnce(declineGroupCall);
          sinon.assert.calledWith(declineGroupCall, "fake-group-call-conversation-id", BigInt(123));
        });
      });
    });
    describe("groupCallAudioLevelsChange", () => {
      const { groupCallAudioLevelsChange } = import_calling.actions;
      const remoteDeviceStates = [
        { audioLevel: 0.3, demuxId: 1 },
        { audioLevel: 0.4, demuxId: 2 },
        { audioLevel: 0.5, demuxId: 3 },
        { audioLevel: 0.2, demuxId: 7 },
        { audioLevel: 0.1, demuxId: 8 },
        { audioLevel: 0, demuxId: 9 }
      ];
      const remoteAudioLevels = /* @__PURE__ */ new Map([
        [1, (0, import_truncateAudioLevel.truncateAudioLevel)(0.3)],
        [2, (0, import_truncateAudioLevel.truncateAudioLevel)(0.4)],
        [3, (0, import_truncateAudioLevel.truncateAudioLevel)(0.5)],
        [7, (0, import_truncateAudioLevel.truncateAudioLevel)(0.2)],
        [8, (0, import_truncateAudioLevel.truncateAudioLevel)(0.1)]
      ]);
      it("does nothing if there's no relevant call", () => {
        const action = groupCallAudioLevelsChange({
          conversationId: "garbage",
          localAudioLevel: 1,
          remoteDeviceStates
        });
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, action);
        import_chai.assert.strictEqual(result, stateWithActiveGroupCall);
      });
      it("does nothing if the state change would be a no-op", () => {
        const state = {
          ...stateWithActiveGroupCall,
          callsByConversation: {
            "fake-group-call-conversation-id": {
              ...stateWithActiveGroupCall.callsByConversation["fake-group-call-conversation-id"],
              remoteAudioLevels
            }
          }
        };
        const action = groupCallAudioLevelsChange({
          conversationId: "fake-group-call-conversation-id",
          localAudioLevel: 1e-3,
          remoteDeviceStates
        });
        const result = (0, import_calling.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("updates the set of speaking participants, including yourself", () => {
        const action = groupCallAudioLevelsChange({
          conversationId: "fake-group-call-conversation-id",
          localAudioLevel: 0.8,
          remoteDeviceStates
        });
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, action);
        import_chai.assert.strictEqual(result.activeCallState?.localAudioLevel, (0, import_truncateAudioLevel.truncateAudioLevel)(0.8));
        const call = result.callsByConversation["fake-group-call-conversation-id"];
        if (call?.callMode !== import_Calling.CallMode.Group) {
          throw new Error("Expected a group call to be found");
        }
        import_chai.assert.deepStrictEqual(call.remoteAudioLevels, remoteAudioLevels);
      });
    });
    describe("groupCallStateChange", () => {
      const { groupCallStateChange } = import_calling.actions;
      function getAction(...args) {
        const dispatch = sinon.spy();
        groupCallStateChange(...args)(dispatch, getEmptyRootState, null);
        return dispatch.getCall(0).args[0];
      }
      it("saves a new call to the map of conversations", () => {
        const result = (0, import_calling.reducer)((0, import_calling.getEmptyState)(), getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joining,
          hasLocalAudio: true,
          hasLocalVideo: false,
          peekInfo: {
            uuids: [creatorUuid],
            creatorUuid,
            eraId: "xyz",
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 123,
              hasRemoteAudio: true,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 4 / 3
            }
          ]
        }));
        import_chai.assert.deepEqual(result.callsByConversation["fake-group-call-conversation-id"], {
          callMode: import_Calling.CallMode.Group,
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joining,
          peekInfo: {
            uuids: [creatorUuid],
            creatorUuid,
            eraId: "xyz",
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 123,
              hasRemoteAudio: true,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 4 / 3
            }
          ]
        });
      });
      it("updates a call in the map of conversations", () => {
        const result = (0, import_calling.reducer)(stateWithGroupCall, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: false,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.deepEqual(result.callsByConversation["fake-group-call-conversation-id"], {
          callMode: import_Calling.CallMode.Group,
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        });
      });
      it("keeps the existing ring state if you haven't joined the call", () => {
        const state = {
          ...stateWithGroupCall,
          callsByConversation: {
            ...stateWithGroupCall.callsByConversation,
            "fake-group-call-conversation-id": {
              ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
              ringId: BigInt(456),
              ringerUuid
            }
          }
        };
        const result = (0, import_calling.reducer)(state, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.NotJoined,
          hasLocalAudio: true,
          hasLocalVideo: false,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.include(result.callsByConversation["fake-group-call-conversation-id"], {
          callMode: import_Calling.CallMode.Group,
          ringId: BigInt(456),
          ringerUuid
        });
      });
      it("removes the ring state if you've joined the call", () => {
        const state = {
          ...stateWithGroupCall,
          callsByConversation: {
            ...stateWithGroupCall.callsByConversation,
            "fake-group-call-conversation-id": {
              ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
              ringId: BigInt(456),
              ringerUuid
            }
          }
        };
        const result = (0, import_calling.reducer)(state, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: false,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.notProperty(result.callsByConversation["fake-group-call-conversation-id"], "ringId");
        import_chai.assert.notProperty(result.callsByConversation["fake-group-call-conversation-id"], "ringerUuid");
      });
      it("if no call is active, doesn't touch the active call state", () => {
        const result = (0, import_calling.reducer)(stateWithGroupCall, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: false,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.isUndefined(result.activeCallState);
      });
      it("if the call is not active, doesn't touch the active call state", () => {
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, getAction({
          conversationId: "another-fake-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: true,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.deepEqual(result.activeCallState, {
          conversationId: "fake-group-call-conversation-id",
          hasLocalAudio: true,
          hasLocalVideo: false,
          localAudioLevel: 0,
          viewMode: import_Calling.CallViewMode.Grid,
          showParticipantsList: false,
          safetyNumberChangedUuids: [],
          outgoingRing: false,
          pip: false,
          settingsDialogOpen: false
        });
      });
      it("if the call is active, updates the active call state", () => {
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: true,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: [
            {
              uuid: remoteUuid,
              demuxId: 456,
              hasRemoteAudio: false,
              hasRemoteVideo: true,
              presenting: false,
              sharingScreen: false,
              videoAspectRatio: 16 / 9
            }
          ]
        }));
        import_chai.assert.strictEqual(result.activeCallState?.conversationId, "fake-group-call-conversation-id");
        import_chai.assert.isTrue(result.activeCallState?.hasLocalAudio);
        import_chai.assert.isTrue(result.activeCallState?.hasLocalVideo);
      });
      it("doesn't stop ringing if nobody is in the call", () => {
        const state = {
          ...stateWithActiveGroupCall,
          activeCallState: {
            ...stateWithActiveGroupCall.activeCallState,
            outgoingRing: true
          }
        };
        const result = (0, import_calling.reducer)(state, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: true,
          peekInfo: {
            uuids: [],
            maxDevices: 16,
            deviceCount: 0
          },
          remoteParticipants: []
        }));
        import_chai.assert.isTrue(result.activeCallState?.outgoingRing);
      });
      it("stops ringing if someone enters the call", () => {
        const state = {
          ...stateWithActiveGroupCall,
          activeCallState: {
            ...stateWithActiveGroupCall.activeCallState,
            outgoingRing: true
          }
        };
        const result = (0, import_calling.reducer)(state, getAction({
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.Connected,
          joinState: import_Calling.GroupCallJoinState.Joined,
          hasLocalAudio: true,
          hasLocalVideo: true,
          peekInfo: {
            uuids: ["1b9e4d42-1f56-45c5-b6f4-d1be5a54fefa"],
            maxDevices: 16,
            deviceCount: 1
          },
          remoteParticipants: []
        }));
        import_chai.assert.isFalse(result.activeCallState?.outgoingRing);
      });
    });
    describe("peekNotConnectedGroupCall", () => {
      const { peekNotConnectedGroupCall } = import_calling.actions;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServicePeekGroupCall = this.sandbox.stub(import_calling2.calling, "peekGroupCall");
        this.callingServiceUpdateCallHistoryForGroupCall = this.sandbox.stub(import_calling2.calling, "updateCallHistoryForGroupCall");
        this.clock = this.sandbox.useFakeTimers();
      }, "beforeEach"));
      describe("thunk", () => {
        function noopTest(connectionState) {
          return async function test() {
            const dispatch = sinon.spy();
            await peekNotConnectedGroupCall({
              conversationId: "fake-group-call-conversation-id"
            })(dispatch, () => ({
              ...getEmptyRootState(),
              calling: {
                ...stateWithGroupCall,
                callsByConversation: {
                  "fake-group-call-conversation-id": {
                    ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
                    connectionState
                  }
                }
              }
            }), null);
            sinon.assert.notCalled(dispatch);
            sinon.assert.notCalled(this.callingServicePeekGroupCall);
          };
        }
        it("no-ops if trying to peek at a connecting group call", noopTest(import_Calling.GroupCallConnectionState.Connecting));
        it("no-ops if trying to peek at a connected group call", noopTest(import_Calling.GroupCallConnectionState.Connected));
        it("no-ops if trying to peek at a reconnecting group call", noopTest(import_Calling.GroupCallConnectionState.Reconnecting));
      });
    });
    describe("returnToActiveCall", () => {
      const { returnToActiveCall } = import_calling.actions;
      it("does nothing if not in PiP mode", () => {
        const result = (0, import_calling.reducer)(stateWithActiveDirectCall, returnToActiveCall());
        import_chai.assert.deepEqual(result, stateWithActiveDirectCall);
      });
      it("closes the PiP", () => {
        const state = {
          ...stateWithActiveDirectCall,
          activeCallState: {
            ...stateWithActiveDirectCall.activeCallState,
            pip: true
          }
        };
        const result = (0, import_calling.reducer)(state, returnToActiveCall());
        import_chai.assert.deepEqual(result, stateWithActiveDirectCall);
      });
    });
    describe("receiveIncomingGroupCall", () => {
      const { receiveIncomingGroupCall } = import_calling.actions;
      it("does nothing if the call was already ringing", () => {
        const action = receiveIncomingGroupCall({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(456),
          ringerUuid
        });
        const result = (0, import_calling.reducer)(stateWithIncomingGroupCall, action);
        import_chai.assert.strictEqual(result, stateWithIncomingGroupCall);
      });
      it("does nothing if the call was already joined", () => {
        const state = {
          ...stateWithGroupCall,
          callsByConversation: {
            ...stateWithGroupCall.callsByConversation,
            "fake-group-call-conversation-id": {
              ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
              joinState: import_Calling.GroupCallJoinState.Joined
            }
          }
        };
        const action = receiveIncomingGroupCall({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(456),
          ringerUuid
        });
        const result = (0, import_calling.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("creates a new group call if one did not exist", () => {
        const action = receiveIncomingGroupCall({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(456),
          ringerUuid
        });
        const result = (0, import_calling.reducer)((0, import_calling.getEmptyState)(), action);
        import_chai.assert.deepEqual(result.callsByConversation["fake-group-call-conversation-id"], {
          callMode: import_Calling.CallMode.Group,
          conversationId: "fake-group-call-conversation-id",
          connectionState: import_Calling.GroupCallConnectionState.NotConnected,
          joinState: import_Calling.GroupCallJoinState.NotJoined,
          peekInfo: {
            uuids: [],
            maxDevices: Infinity,
            deviceCount: 0
          },
          remoteParticipants: [],
          ringId: BigInt(456),
          ringerUuid
        });
      });
      it("attaches ring state to an existing call", () => {
        const action = receiveIncomingGroupCall({
          conversationId: "fake-group-call-conversation-id",
          ringId: BigInt(456),
          ringerUuid
        });
        const result = (0, import_calling.reducer)(stateWithGroupCall, action);
        import_chai.assert.include(result.callsByConversation["fake-group-call-conversation-id"], {
          ringId: BigInt(456),
          ringerUuid
        });
      });
    });
    describe("setLocalAudio", () => {
      const { setLocalAudio } = import_calling.actions;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingServiceSetOutgoingAudio = this.sandbox.stub(import_calling2.calling, "setOutgoingAudio");
      }, "beforeEach"));
      it("dispatches a SET_LOCAL_AUDIO_FULFILLED action", () => {
        const dispatch = sinon.spy();
        setLocalAudio({ enabled: true })(dispatch, () => ({
          ...getEmptyRootState(),
          calling: stateWithActiveDirectCall
        }), null);
        sinon.assert.calledOnce(dispatch);
        sinon.assert.calledWith(dispatch, {
          type: "calling/SET_LOCAL_AUDIO_FULFILLED",
          payload: { enabled: true }
        });
      });
      it("updates the outgoing audio for the active call", function test() {
        const dispatch = sinon.spy();
        setLocalAudio({ enabled: false })(dispatch, () => ({
          ...getEmptyRootState(),
          calling: stateWithActiveDirectCall
        }), null);
        sinon.assert.calledOnce(this.callingServiceSetOutgoingAudio);
        sinon.assert.calledWith(this.callingServiceSetOutgoingAudio, "fake-direct-call-conversation-id", false);
        setLocalAudio({ enabled: true })(dispatch, () => ({
          ...getEmptyRootState(),
          calling: stateWithActiveDirectCall
        }), null);
        sinon.assert.calledTwice(this.callingServiceSetOutgoingAudio);
        sinon.assert.calledWith(this.callingServiceSetOutgoingAudio, "fake-direct-call-conversation-id", true);
      });
      it("updates the local audio state with SET_LOCAL_AUDIO_FULFILLED", () => {
        const dispatch = sinon.spy();
        setLocalAudio({ enabled: false })(dispatch, () => ({
          ...getEmptyRootState(),
          calling: stateWithActiveDirectCall
        }), null);
        const action = dispatch.getCall(0).args[0];
        const result = (0, import_calling.reducer)(stateWithActiveDirectCall, action);
        import_chai.assert.isFalse(result.activeCallState?.hasLocalAudio);
      });
    });
    describe("setOutgoingRing", () => {
      const { setOutgoingRing } = import_calling.actions;
      it("enables a desire to ring", () => {
        const action = setOutgoingRing(true);
        const result = (0, import_calling.reducer)(stateWithActiveGroupCall, action);
        import_chai.assert.isTrue(result.activeCallState?.outgoingRing);
      });
      it("disables a desire to ring", () => {
        const action = setOutgoingRing(false);
        const result = (0, import_calling.reducer)(stateWithActiveDirectCall, action);
        import_chai.assert.isFalse(result.activeCallState?.outgoingRing);
      });
    });
    describe("startCallingLobby", () => {
      const { startCallingLobby } = import_calling.actions;
      let rootState;
      let startCallingLobbyStub;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        startCallingLobbyStub = this.sandbox.stub(import_calling2.calling, "startCallingLobby").resolves();
        const emptyRootState = getEmptyRootState();
        rootState = {
          ...emptyRootState,
          conversations: {
            ...emptyRootState.conversations,
            conversationLookup: {
              "fake-conversation-id": (0, import_getDefaultConversation.getDefaultConversation)()
            }
          }
        };
      }, "beforeEach"));
      describe("thunk", () => {
        it("asks the calling service to start the lobby", async () => {
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(import_lodash.noop, () => rootState, null);
          sinon.assert.calledOnce(startCallingLobbyStub);
        });
        it("requests audio by default", async () => {
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(import_lodash.noop, () => rootState, null);
          sinon.assert.calledWithMatch(startCallingLobbyStub, {
            hasLocalAudio: true
          });
        });
        it("doesn't request audio if the group call already has 8 devices", async () => {
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(import_lodash.noop, () => {
            const callingState = (0, import_lodash.cloneDeep)(stateWithGroupCall);
            callingState.callsByConversation["fake-group-call-conversation-id"].peekInfo.deviceCount = 8;
            return { ...rootState, calling: callingState };
          }, null);
          sinon.assert.calledWithMatch(startCallingLobbyStub, {
            hasLocalVideo: true
          });
        });
        it("requests video when starting a video call", async () => {
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(import_lodash.noop, () => rootState, null);
          sinon.assert.calledWithMatch(startCallingLobbyStub, {
            hasLocalVideo: true
          });
        });
        it("doesn't request video when not a video call", async () => {
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: false
          })(import_lodash.noop, () => rootState, null);
          sinon.assert.calledWithMatch(startCallingLobbyStub, {
            hasLocalVideo: false
          });
        });
        it("dispatches an action if the calling lobby returns something", async () => {
          startCallingLobbyStub.resolves({
            callMode: import_Calling.CallMode.Direct,
            hasLocalAudio: true,
            hasLocalVideo: true
          });
          const dispatch = sinon.stub();
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(dispatch, () => rootState, null);
          sinon.assert.calledOnce(dispatch);
        });
        it("doesn't dispatch an action if the calling lobby returns nothing", async () => {
          const dispatch = sinon.stub();
          await startCallingLobby({
            conversationId: "fake-conversation-id",
            isVideoCall: true
          })(dispatch, () => rootState, null);
          sinon.assert.notCalled(dispatch);
        });
      });
      describe("action", () => {
        const getState = /* @__PURE__ */ __name(async (callingState, callingServiceResult, conversationId = "fake-conversation-id") => {
          startCallingLobbyStub.resolves(callingServiceResult);
          const dispatch = sinon.stub();
          await startCallingLobby({
            conversationId,
            isVideoCall: true
          })(dispatch, () => ({ ...rootState, calling: callingState }), null);
          const action = dispatch.getCall(0).args[0];
          return (0, import_calling.reducer)(callingState, action);
        }, "getState");
        it("saves a direct call and makes it active", async () => {
          const result = await getState((0, import_calling.getEmptyState)(), {
            callMode: import_Calling.CallMode.Direct,
            hasLocalAudio: true,
            hasLocalVideo: true
          });
          import_chai.assert.deepEqual(result.callsByConversation["fake-conversation-id"], {
            callMode: import_Calling.CallMode.Direct,
            conversationId: "fake-conversation-id",
            isIncoming: false,
            isVideoCall: true
          });
          import_chai.assert.deepEqual(result.activeCallState, {
            conversationId: "fake-conversation-id",
            hasLocalAudio: true,
            hasLocalVideo: true,
            localAudioLevel: 0,
            viewMode: import_Calling.CallViewMode.Grid,
            showParticipantsList: false,
            safetyNumberChangedUuids: [],
            pip: false,
            settingsDialogOpen: false,
            outgoingRing: true
          });
        });
        it("saves a group call and makes it active", async () => {
          const result = await getState((0, import_calling.getEmptyState)(), {
            callMode: import_Calling.CallMode.Group,
            hasLocalAudio: true,
            hasLocalVideo: true,
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: {
              uuids: [creatorUuid],
              creatorUuid,
              eraId: "xyz",
              maxDevices: 16,
              deviceCount: 1
            },
            remoteParticipants: [
              {
                uuid: remoteUuid,
                demuxId: 123,
                hasRemoteAudio: true,
                hasRemoteVideo: true,
                presenting: false,
                sharingScreen: false,
                videoAspectRatio: 4 / 3
              }
            ]
          });
          import_chai.assert.deepEqual(result.callsByConversation["fake-conversation-id"], {
            callMode: import_Calling.CallMode.Group,
            conversationId: "fake-conversation-id",
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: {
              uuids: [creatorUuid],
              creatorUuid,
              eraId: "xyz",
              maxDevices: 16,
              deviceCount: 1
            },
            remoteParticipants: [
              {
                uuid: remoteUuid,
                demuxId: 123,
                hasRemoteAudio: true,
                hasRemoteVideo: true,
                presenting: false,
                sharingScreen: false,
                videoAspectRatio: 4 / 3
              }
            ]
          });
          import_chai.assert.deepEqual(result.activeCallState?.conversationId, "fake-conversation-id");
          import_chai.assert.isFalse(result.activeCallState?.outgoingRing);
        });
        it("chooses fallback peek info if none is sent and there is no existing call", async () => {
          const result = await getState((0, import_calling.getEmptyState)(), {
            callMode: import_Calling.CallMode.Group,
            hasLocalAudio: true,
            hasLocalVideo: true,
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: void 0,
            remoteParticipants: []
          });
          const call = result.callsByConversation["fake-conversation-id"];
          import_chai.assert.deepEqual(call?.callMode === import_Calling.CallMode.Group && call.peekInfo, {
            uuids: [],
            maxDevices: Infinity,
            deviceCount: 0
          });
        });
        it("doesn't overwrite an existing group call's peek info if none was sent", async () => {
          const result = await getState(stateWithGroupCall, {
            callMode: import_Calling.CallMode.Group,
            hasLocalAudio: true,
            hasLocalVideo: true,
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: void 0,
            remoteParticipants: [
              {
                uuid: remoteUuid,
                demuxId: 123,
                hasRemoteAudio: true,
                hasRemoteVideo: true,
                presenting: false,
                sharingScreen: false,
                videoAspectRatio: 4 / 3
              }
            ]
          });
          const call = result.callsByConversation["fake-group-call-conversation-id"];
          import_chai.assert.deepEqual(call?.callMode === import_Calling.CallMode.Group && call.peekInfo, {
            uuids: [creatorUuid],
            creatorUuid,
            eraId: "xyz",
            maxDevices: 16,
            deviceCount: 1
          });
        });
        it("can overwrite an existing group call's peek info", async () => {
          const state = {
            ...(0, import_calling.getEmptyState)(),
            callsByConversation: {
              "fake-conversation-id": {
                ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
                conversationId: "fake-conversation-id"
              }
            }
          };
          const result = await getState(state, {
            callMode: import_Calling.CallMode.Group,
            hasLocalAudio: true,
            hasLocalVideo: true,
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: {
              uuids: [differentCreatorUuid],
              creatorUuid: differentCreatorUuid,
              eraId: "abc",
              maxDevices: 5,
              deviceCount: 1
            },
            remoteParticipants: [
              {
                uuid: remoteUuid,
                demuxId: 123,
                hasRemoteAudio: true,
                hasRemoteVideo: true,
                presenting: false,
                sharingScreen: false,
                videoAspectRatio: 4 / 3
              }
            ]
          });
          const call = result.callsByConversation["fake-conversation-id"];
          import_chai.assert.deepEqual(call?.callMode === import_Calling.CallMode.Group && call.peekInfo, {
            uuids: [differentCreatorUuid],
            creatorUuid: differentCreatorUuid,
            eraId: "abc",
            maxDevices: 5,
            deviceCount: 1
          });
        });
        it("doesn't overwrite an existing group call's ring state if it was set previously", async () => {
          const result = await getState({
            ...stateWithGroupCall,
            callsByConversation: {
              "fake-group-call-conversation-id": {
                ...stateWithGroupCall.callsByConversation["fake-group-call-conversation-id"],
                ringId: BigInt(987),
                ringerUuid
              }
            }
          }, {
            callMode: import_Calling.CallMode.Group,
            hasLocalAudio: true,
            hasLocalVideo: true,
            connectionState: import_Calling.GroupCallConnectionState.Connected,
            joinState: import_Calling.GroupCallJoinState.NotJoined,
            peekInfo: void 0,
            remoteParticipants: [
              {
                uuid: remoteUuid,
                demuxId: 123,
                hasRemoteAudio: true,
                hasRemoteVideo: true,
                presenting: false,
                sharingScreen: false,
                videoAspectRatio: 4 / 3
              }
            ]
          });
          const call = result.callsByConversation["fake-group-call-conversation-id"];
          if (call?.callMode !== import_Calling.CallMode.Group) {
            throw new Error("Expected to find a group call");
          }
          import_chai.assert.strictEqual(call.ringId, BigInt(987));
          import_chai.assert.strictEqual(call.ringerUuid, ringerUuid);
        });
      });
    });
    describe("startCall", () => {
      const { startCall } = import_calling.actions;
      beforeEach(/* @__PURE__ */ __name(function beforeEach2() {
        this.callingStartOutgoingDirectCall = this.sandbox.stub(import_calling2.calling, "startOutgoingDirectCall");
        this.callingJoinGroupCall = this.sandbox.stub(import_calling2.calling, "joinGroupCall").resolves();
      }, "beforeEach"));
      it("asks the calling service to start an outgoing direct call", async function test() {
        const dispatch = sinon.spy();
        await startCall({
          callMode: import_Calling.CallMode.Direct,
          conversationId: "123",
          hasLocalAudio: true,
          hasLocalVideo: false
        })(dispatch, getEmptyRootState, null);
        sinon.assert.calledOnce(this.callingStartOutgoingDirectCall);
        sinon.assert.calledWith(this.callingStartOutgoingDirectCall, "123", true, false);
        sinon.assert.notCalled(this.callingJoinGroupCall);
      });
      it("asks the calling service to join a group call", async function test() {
        const dispatch = sinon.spy();
        await startCall({
          callMode: import_Calling.CallMode.Group,
          conversationId: "123",
          hasLocalAudio: true,
          hasLocalVideo: false
        })(dispatch, getEmptyRootState, null);
        sinon.assert.calledOnce(this.callingJoinGroupCall);
        sinon.assert.calledWith(this.callingJoinGroupCall, "123", true, false);
        sinon.assert.notCalled(this.callingStartOutgoingDirectCall);
      });
      it("saves direct calls and makes them active", async () => {
        const dispatch = sinon.spy();
        await startCall({
          callMode: import_Calling.CallMode.Direct,
          conversationId: "fake-conversation-id",
          hasLocalAudio: true,
          hasLocalVideo: false
        })(dispatch, getEmptyRootState, null);
        const action = dispatch.getCall(0).args[0];
        const result = (0, import_calling.reducer)((0, import_calling.getEmptyState)(), action);
        import_chai.assert.deepEqual(result.callsByConversation["fake-conversation-id"], {
          callMode: import_Calling.CallMode.Direct,
          conversationId: "fake-conversation-id",
          callState: import_Calling.CallState.Prering,
          isIncoming: false,
          isVideoCall: false
        });
        import_chai.assert.deepEqual(result.activeCallState, {
          conversationId: "fake-conversation-id",
          hasLocalAudio: true,
          hasLocalVideo: false,
          localAudioLevel: 0,
          viewMode: import_Calling.CallViewMode.Grid,
          showParticipantsList: false,
          safetyNumberChangedUuids: [],
          pip: false,
          settingsDialogOpen: false,
          outgoingRing: true
        });
      });
      it("doesn't dispatch any actions for group calls", () => {
        const dispatch = sinon.spy();
        startCall({
          callMode: import_Calling.CallMode.Group,
          conversationId: "123",
          hasLocalAudio: true,
          hasLocalVideo: false
        })(dispatch, getEmptyRootState, null);
        sinon.assert.notCalled(dispatch);
      });
    });
    describe("toggleSettings", () => {
      const { toggleSettings } = import_calling.actions;
      it("toggles the settings dialog", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveDirectCall, toggleSettings());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, toggleSettings());
        const afterThreeToggles = (0, import_calling.reducer)(afterTwoToggles, toggleSettings());
        import_chai.assert.isTrue(afterOneToggle.activeCallState?.settingsDialogOpen);
        import_chai.assert.isFalse(afterTwoToggles.activeCallState?.settingsDialogOpen);
        import_chai.assert.isTrue(afterThreeToggles.activeCallState?.settingsDialogOpen);
      });
    });
    describe("toggleParticipants", () => {
      const { toggleParticipants } = import_calling.actions;
      it("toggles the participants list", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveDirectCall, toggleParticipants());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, toggleParticipants());
        const afterThreeToggles = (0, import_calling.reducer)(afterTwoToggles, toggleParticipants());
        import_chai.assert.isTrue(afterOneToggle.activeCallState?.showParticipantsList);
        import_chai.assert.isFalse(afterTwoToggles.activeCallState?.showParticipantsList);
        import_chai.assert.isTrue(afterThreeToggles.activeCallState?.showParticipantsList);
      });
    });
    describe("togglePip", () => {
      const { togglePip } = import_calling.actions;
      it("toggles the PiP", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveDirectCall, togglePip());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, togglePip());
        const afterThreeToggles = (0, import_calling.reducer)(afterTwoToggles, togglePip());
        import_chai.assert.isTrue(afterOneToggle.activeCallState?.pip);
        import_chai.assert.isFalse(afterTwoToggles.activeCallState?.pip);
        import_chai.assert.isTrue(afterThreeToggles.activeCallState?.pip);
      });
    });
    describe("toggleSpeakerView", () => {
      const { toggleSpeakerView } = import_calling.actions;
      it("toggles speaker view from grid view", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveGroupCall, toggleSpeakerView());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, toggleSpeakerView());
        const afterThreeToggles = (0, import_calling.reducer)(afterTwoToggles, toggleSpeakerView());
        import_chai.assert.strictEqual(afterOneToggle.activeCallState?.viewMode, import_Calling.CallViewMode.Speaker);
        import_chai.assert.strictEqual(afterTwoToggles.activeCallState?.viewMode, import_Calling.CallViewMode.Grid);
        import_chai.assert.strictEqual(afterThreeToggles.activeCallState?.viewMode, import_Calling.CallViewMode.Speaker);
      });
      it("toggles speaker view from presentation view", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActivePresentationViewGroupCall, toggleSpeakerView());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, toggleSpeakerView());
        const afterThreeToggles = (0, import_calling.reducer)(afterTwoToggles, toggleSpeakerView());
        import_chai.assert.strictEqual(afterOneToggle.activeCallState?.viewMode, import_Calling.CallViewMode.Grid);
        import_chai.assert.strictEqual(afterTwoToggles.activeCallState?.viewMode, import_Calling.CallViewMode.Speaker);
        import_chai.assert.strictEqual(afterThreeToggles.activeCallState?.viewMode, import_Calling.CallViewMode.Grid);
      });
    });
    describe("switchToPresentationView", () => {
      const { switchToPresentationView, switchFromPresentationView } = import_calling.actions;
      it("toggles presentation view from grid view", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveGroupCall, switchToPresentationView());
        const afterTwoToggles = (0, import_calling.reducer)(afterOneToggle, switchToPresentationView());
        const finalState = (0, import_calling.reducer)(afterOneToggle, switchFromPresentationView());
        import_chai.assert.strictEqual(afterOneToggle.activeCallState?.viewMode, import_Calling.CallViewMode.Presentation);
        import_chai.assert.strictEqual(afterTwoToggles.activeCallState?.viewMode, import_Calling.CallViewMode.Presentation);
        import_chai.assert.strictEqual(finalState.activeCallState?.viewMode, import_Calling.CallViewMode.Grid);
      });
      it("does not toggle presentation view from speaker view", () => {
        const afterOneToggle = (0, import_calling.reducer)(stateWithActiveSpeakerViewGroupCall, switchToPresentationView());
        const finalState = (0, import_calling.reducer)(afterOneToggle, switchFromPresentationView());
        import_chai.assert.strictEqual(afterOneToggle.activeCallState?.viewMode, import_Calling.CallViewMode.Speaker);
        import_chai.assert.strictEqual(finalState.activeCallState?.viewMode, import_Calling.CallViewMode.Speaker);
      });
    });
  });
  describe("helpers", () => {
    describe("getActiveCall", () => {
      it("returns undefined if there are no calls", () => {
        import_chai.assert.isUndefined((0, import_calling.getActiveCall)((0, import_calling.getEmptyState)()));
      });
      it("returns undefined if there is no active call", () => {
        import_chai.assert.isUndefined((0, import_calling.getActiveCall)(stateWithDirectCall));
      });
      it("returns the active call", () => {
        import_chai.assert.deepEqual((0, import_calling.getActiveCall)(stateWithActiveDirectCall), {
          callMode: import_Calling.CallMode.Direct,
          conversationId: "fake-direct-call-conversation-id",
          callState: import_Calling.CallState.Accepted,
          isIncoming: false,
          isVideoCall: false,
          hasRemoteVideo: false
        });
      });
    });
    describe("isAnybodyElseInGroupCall", () => {
      it("returns false with no peek info", () => {
        import_chai.assert.isFalse((0, import_calling.isAnybodyElseInGroupCall)(void 0, remoteUuid));
      });
      it("returns false if the peek info has no participants", () => {
        import_chai.assert.isFalse((0, import_calling.isAnybodyElseInGroupCall)({ uuids: [] }, remoteUuid));
      });
      it("returns false if the peek info has one participant, you", () => {
        import_chai.assert.isFalse((0, import_calling.isAnybodyElseInGroupCall)({ uuids: [creatorUuid] }, creatorUuid));
      });
      it("returns true if the peek info has one participant, someone else", () => {
        import_chai.assert.isTrue((0, import_calling.isAnybodyElseInGroupCall)({ uuids: [creatorUuid] }, remoteUuid));
      });
      it("returns true if the peek info has two participants, you and someone else", () => {
        import_chai.assert.isTrue((0, import_calling.isAnybodyElseInGroupCall)({ uuids: [creatorUuid, remoteUuid] }, remoteUuid));
      });
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyBjbG9uZURlZXAsIG5vb3AgfSBmcm9tICdsb2Rhc2gnO1xuaW1wb3J0IHR5cGUgeyBTdGF0ZVR5cGUgYXMgUm9vdFN0YXRlVHlwZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgcmVkdWNlciBhcyByb290UmVkdWNlciB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL3JlZHVjZXInO1xuaW1wb3J0IHsgbm9vcEFjdGlvbiB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL25vb3AnO1xuaW1wb3J0IHR5cGUge1xuICBDYWxsaW5nU3RhdGVUeXBlLFxuICBHcm91cENhbGxTdGF0ZUNoYW5nZUFjdGlvblR5cGUsXG59IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHtcbiAgYWN0aW9ucyxcbiAgZ2V0QWN0aXZlQ2FsbCxcbiAgZ2V0RW1wdHlTdGF0ZSxcbiAgaXNBbnlib2R5RWxzZUluR3JvdXBDYWxsLFxuICByZWR1Y2VyLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jYWxsaW5nJztcbmltcG9ydCB7IHRydW5jYXRlQXVkaW9MZXZlbCB9IGZyb20gJy4uLy4uLy4uL2NhbGxpbmcvdHJ1bmNhdGVBdWRpb0xldmVsJztcbmltcG9ydCB7IGNhbGxpbmcgYXMgY2FsbGluZ1NlcnZpY2UgfSBmcm9tICcuLi8uLi8uLi9zZXJ2aWNlcy9jYWxsaW5nJztcbmltcG9ydCB7XG4gIENhbGxNb2RlLFxuICBDYWxsU3RhdGUsXG4gIENhbGxWaWV3TW9kZSxcbiAgR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLFxuICBHcm91cENhbGxKb2luU3RhdGUsXG59IGZyb20gJy4uLy4uLy4uL3R5cGVzL0NhbGxpbmcnO1xuaW1wb3J0IHsgVVVJRCB9IGZyb20gJy4uLy4uLy4uL3R5cGVzL1VVSUQnO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdENvbnZlcnNhdGlvbiB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHR5cGUgeyBVbndyYXBQcm9taXNlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVXRpbCc7XG5cbmRlc2NyaWJlKCdjYWxsaW5nIGR1Y2snLCAoKSA9PiB7XG4gIGNvbnN0IHN0YXRlV2l0aERpcmVjdENhbGw6IENhbGxpbmdTdGF0ZVR5cGUgPSB7XG4gICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCBhcyBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5BY2NlcHRlZCxcbiAgICAgICAgaXNJbmNvbWluZzogZmFsc2UsXG4gICAgICAgIGlzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgaGFzUmVtb3RlVmlkZW86IGZhbHNlLFxuICAgICAgfSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwgPSB7XG4gICAgLi4uc3RhdGVXaXRoRGlyZWN0Q2FsbCxcbiAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgbG9jYWxBdWRpb0xldmVsOiAwLFxuICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5HcmlkLFxuICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGZhbHNlLFxuICAgICAgc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzOiBbXSxcbiAgICAgIG91dGdvaW5nUmluZzogdHJ1ZSxcbiAgICAgIHBpcDogZmFsc2UsXG4gICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgc3RhdGVXaXRoSW5jb21pbmdEaXJlY3RDYWxsID0ge1xuICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QgYXMgQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgY2FsbFN0YXRlOiBDYWxsU3RhdGUuUmluZ2luZyxcbiAgICAgICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgICAgICAgaXNWaWRlb0NhbGw6IGZhbHNlLFxuICAgICAgICBoYXNSZW1vdGVWaWRlbzogZmFsc2UsXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgY3JlYXRvclV1aWQgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbiAgY29uc3QgZGlmZmVyZW50Q3JlYXRvclV1aWQgPSBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKTtcbiAgY29uc3QgcmVtb3RlVXVpZCA9IFVVSUQuZ2VuZXJhdGUoKS50b1N0cmluZygpO1xuICBjb25zdCByaW5nZXJVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgY29uc3Qgc3RhdGVXaXRoR3JvdXBDYWxsID0ge1xuICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwIGFzIENhbGxNb2RlLkdyb3VwLFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQsXG4gICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgcGVla0luZm86IHtcbiAgICAgICAgICB1dWlkczogW2NyZWF0b3JVdWlkXSxcbiAgICAgICAgICBjcmVhdG9yVXVpZCxcbiAgICAgICAgICBlcmFJZDogJ3h5eicsXG4gICAgICAgICAgbWF4RGV2aWNlczogMTYsXG4gICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgIH0sXG4gICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgICAgICAgIHtcbiAgICAgICAgICAgIHV1aWQ6IHJlbW90ZVV1aWQsXG4gICAgICAgICAgICBkZW11eElkOiAxMjMsXG4gICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgIGhhc1JlbW90ZVZpZGVvOiB0cnVlLFxuICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgIHZpZGVvQXNwZWN0UmF0aW86IDQgLyAzLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICB9LFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3Qgc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwgPSB7XG4gICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLFxuICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uLFxuICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uW1xuICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ1xuICAgICAgICBdLFxuICAgICAgICByaW5nSWQ6IEJpZ0ludCgxMjMpLFxuICAgICAgICByaW5nZXJVdWlkOiBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwgPSB7XG4gICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLFxuICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgIHZpZXdNb2RlOiBDYWxsVmlld01vZGUuR3JpZCxcbiAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICBvdXRnb2luZ1Jpbmc6IGZhbHNlLFxuICAgICAgcGlwOiBmYWxzZSxcbiAgICAgIHNldHRpbmdzRGlhbG9nT3BlbjogZmFsc2UsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBzdGF0ZVdpdGhBY3RpdmVQcmVzZW50YXRpb25WaWV3R3JvdXBDYWxsID0ge1xuICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbC5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICB2aWV3TW9kZTogQ2FsbFZpZXdNb2RlLlByZXNlbnRhdGlvbixcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IHN0YXRlV2l0aEFjdGl2ZVNwZWFrZXJWaWV3R3JvdXBDYWxsID0ge1xuICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbC5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICB2aWV3TW9kZTogQ2FsbFZpZXdNb2RlLlNwZWFrZXIsXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBvdXJVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgY29uc3QgZ2V0RW1wdHlSb290U3RhdGUgPSAoKSA9PiB7XG4gICAgY29uc3Qgcm9vdFN0YXRlID0gcm9vdFJlZHVjZXIodW5kZWZpbmVkLCBub29wQWN0aW9uKCkpO1xuICAgIHJldHVybiB7XG4gICAgICAuLi5yb290U3RhdGUsXG4gICAgICB1c2VyOiB7XG4gICAgICAgIC4uLnJvb3RTdGF0ZS51c2VyLFxuICAgICAgICBvdXJVdWlkLFxuICAgICAgfSxcbiAgICB9O1xuICB9O1xuXG4gIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICB0aGlzLnNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaChmdW5jdGlvbiBhZnRlckVhY2goKSB7XG4gICAgdGhpcy5zYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2FjdGlvbnMnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2dldFByZXNlbnRpbmdTb3VyY2VzJywgKCkgPT4ge1xuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlR2V0UHJlc2VudGluZ1NvdXJjZXMgPSB0aGlzLnNhbmRib3hcbiAgICAgICAgICAuc3R1YihjYWxsaW5nU2VydmljZSwgJ2dldFByZXNlbnRpbmdTb3VyY2VzJylcbiAgICAgICAgICAucmVzb2x2ZXMoW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogJ2Zvby5iYXInLFxuICAgICAgICAgICAgICBuYW1lOiAnRm9vIEJhcicsXG4gICAgICAgICAgICAgIHRodW1ibmFpbDogJ3h5eicsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXRyaWV2ZXMgc291cmNlcyBmcm9tIHRoZSBjYWxsaW5nIHNlcnZpY2UnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBjb25zdCB7IGdldFByZXNlbnRpbmdTb3VyY2VzIH0gPSBhY3Rpb25zO1xuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBhd2FpdCBnZXRQcmVzZW50aW5nU291cmNlcygpKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5jYWxsaW5nU2VydmljZUdldFByZXNlbnRpbmdTb3VyY2VzKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyBTRVRfUFJFU0VOVElOR19TT1VSQ0VTJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgICAgY29uc3QgeyBnZXRQcmVzZW50aW5nU291cmNlcyB9ID0gYWN0aW9ucztcbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgYXdhaXQgZ2V0UHJlc2VudGluZ1NvdXJjZXMoKShkaXNwYXRjaCwgZ2V0RW1wdHlSb290U3RhdGUsIG51bGwpO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRpc3BhdGNoKTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgICB0eXBlOiAnY2FsbGluZy9TRVRfUFJFU0VOVElOR19TT1VSQ0VTJyxcbiAgICAgICAgICBwYXlsb2FkOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiAnZm9vLmJhcicsXG4gICAgICAgICAgICAgIG5hbWU6ICdGb28gQmFyJyxcbiAgICAgICAgICAgICAgdGh1bWJuYWlsOiAneHl6JyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZW1vdGVTaGFyaW5nU2NyZWVuQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgaXQoXCJ1cGRhdGVzIHdoZXRoZXIgc29tZW9uZSdzIHNjcmVlbiBpcyBiZWluZyBzaGFyZWRcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHJlbW90ZVNoYXJpbmdTY3JlZW5DaGFuZ2UgfSA9IGFjdGlvbnM7XG5cbiAgICAgICAgY29uc3QgcGF5bG9hZCA9IHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBpc1NoYXJpbmdTY3JlZW46IHRydWUsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlRGlyZWN0Q2FsbCxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgcmVtb3RlU2hhcmluZ1NjcmVlbkNoYW5nZShwYXlsb2FkKSk7XG5cbiAgICAgICAgY29uc3QgZXhwZWN0ZWRTdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLFxuICAgICAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlRGlyZWN0Q2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uW1xuICAgICAgICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgaXNTaGFyaW5nU2NyZWVuOiB0cnVlLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwobmV4dFN0YXRlLCBleHBlY3RlZFN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3NldFByZXNlbnRpbmcnLCAoKSA9PiB7XG4gICAgICBiZWZvcmVFYWNoKGZ1bmN0aW9uIGJlZm9yZUVhY2goKSB7XG4gICAgICAgIHRoaXMuY2FsbGluZ1NlcnZpY2VTZXRQcmVzZW50aW5nID0gdGhpcy5zYW5kYm94LnN0dWIoXG4gICAgICAgICAgY2FsbGluZ1NlcnZpY2UsXG4gICAgICAgICAgJ3NldFByZXNlbnRpbmcnXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2NhbGxzIHNldFByZXNlbnRpbmcgb24gdGhlIGNhbGxpbmcgc2VydmljZScsIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgIGNvbnN0IHsgc2V0UHJlc2VudGluZyB9ID0gYWN0aW9ucztcbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgY29uc3QgcHJlc2VudGVkU291cmNlID0ge1xuICAgICAgICAgIGlkOiAnd2luZG93Ojc4NicsXG4gICAgICAgICAgbmFtZTogJ0FwcGxpY2F0aW9uJyxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiAoe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY2FsbGluZzoge1xuICAgICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFByZXNlbnRpbmcocHJlc2VudGVkU291cmNlKShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHRoaXMuY2FsbGluZ1NlcnZpY2VTZXRQcmVzZW50aW5nKTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgICAgdGhpcy5jYWxsaW5nU2VydmljZVNldFByZXNlbnRpbmcsXG4gICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGZhbHNlLFxuICAgICAgICAgIHByZXNlbnRlZFNvdXJjZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNwYXRjaGVzIFNFVF9QUkVTRU5USU5HJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB7IHNldFByZXNlbnRpbmcgfSA9IGFjdGlvbnM7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICAgIGNvbnN0IHByZXNlbnRlZFNvdXJjZSA9IHtcbiAgICAgICAgICBpZDogJ3dpbmRvdzo3ODYnLFxuICAgICAgICAgIG5hbWU6ICdBcHBsaWNhdGlvbicsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGdldFN0YXRlID0gKCkgPT4gKHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgIGNhbGxpbmc6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbCxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBzZXRQcmVzZW50aW5nKHByZXNlbnRlZFNvdXJjZSkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShkaXNwYXRjaCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7XG4gICAgICAgICAgdHlwZTogJ2NhbGxpbmcvU0VUX1BSRVNFTlRJTkcnLFxuICAgICAgICAgIHBheWxvYWQ6IHByZXNlbnRlZFNvdXJjZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3R1cm5zIG9mZiBwcmVzZW50aW5nIHdoZW4gbm8gdmFsdWUgaXMgcGFzc2VkIGluJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBjb25zdCB7IHNldFByZXNlbnRpbmcgfSA9IGFjdGlvbnM7XG4gICAgICAgIGNvbnN0IHByZXNlbnRlZFNvdXJjZSA9IHtcbiAgICAgICAgICBpZDogJ3dpbmRvdzo3ODYnLFxuICAgICAgICAgIG5hbWU6ICdBcHBsaWNhdGlvbicsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiAoe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY2FsbGluZzoge1xuICAgICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFByZXNlbnRpbmcocHJlc2VudGVkU291cmNlKShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcblxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKGdldFN0YXRlKCkuY2FsbGluZywgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNEZWZpbmVkKG5leHRTdGF0ZS5hY3RpdmVDYWxsU3RhdGUpO1xuICAgICAgICBhc3NlcnQuZXF1YWwoXG4gICAgICAgICAgbmV4dFN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8ucHJlc2VudGluZ1NvdXJjZSxcbiAgICAgICAgICBwcmVzZW50ZWRTb3VyY2VcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICAgIG5leHRTdGF0ZS5hY3RpdmVDYWxsU3RhdGU/LnByZXNlbnRpbmdTb3VyY2VzQXZhaWxhYmxlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdGhlIHByZXNlbnRpbmcgdmFsdWUgd2hlbiBvbmUgaXMgcGFzc2VkIGluJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBjb25zdCB7IHNldFByZXNlbnRpbmcgfSA9IGFjdGlvbnM7XG5cbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiAoe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY2FsbGluZzoge1xuICAgICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuXG4gICAgICAgIHNldFByZXNlbnRpbmcoKShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcblxuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKGdldFN0YXRlKCkuY2FsbGluZywgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNEZWZpbmVkKG5leHRTdGF0ZS5hY3RpdmVDYWxsU3RhdGUpO1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQobmV4dFN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8ucHJlc2VudGluZ1NvdXJjZSk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgICBuZXh0U3RhdGUuYWN0aXZlQ2FsbFN0YXRlPy5wcmVzZW50aW5nU291cmNlc0F2YWlsYWJsZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnYWNjZXB0Q2FsbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgYWNjZXB0Q2FsbCB9ID0gYWN0aW9ucztcblxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlQWNjZXB0ID0gdGhpcy5zYW5kYm94XG4gICAgICAgICAgLnN0dWIoY2FsbGluZ1NlcnZpY2UsICdhY2NlcHREaXJlY3RDYWxsJylcbiAgICAgICAgICAucmVzb2x2ZXMoKTtcbiAgICAgICAgdGhpcy5jYWxsaW5nU2VydmljZUpvaW4gPSB0aGlzLnNhbmRib3hcbiAgICAgICAgICAuc3R1YihjYWxsaW5nU2VydmljZSwgJ2pvaW5Hcm91cENhbGwnKVxuICAgICAgICAgIC5yZXNvbHZlcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdhY2NlcHRpbmcgYSBkaXJlY3QgY2FsbCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiAoe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY2FsbGluZzogc3RhdGVXaXRoSW5jb21pbmdEaXJlY3RDYWxsLFxuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZGlzcGF0Y2hlcyBhbiBBQ0NFUFRfQ0FMTF9QRU5ESU5HIGFjdGlvbicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuXG4gICAgICAgICAgYXdhaXQgYWNjZXB0Q2FsbCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGFzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICAgIH0pKGRpc3BhdGNoLCBnZXRTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShkaXNwYXRjaCk7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYWxsaW5nL0FDQ0VQVF9DQUxMX1BFTkRJTkcnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgICAgYXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgYXdhaXQgYWNjZXB0Q2FsbCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGFzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKGRpc3BhdGNoKTtcbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgICAgdHlwZTogJ2NhbGxpbmcvQUNDRVBUX0NBTExfUEVORElORycsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgICBhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXNrcyB0aGUgY2FsbGluZyBzZXJ2aWNlIHRvIGFjY2VwdCB0aGUgY2FsbCcsIGFzeW5jIGZ1bmN0aW9uIHRlc3QoKSB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICAgIGF3YWl0IGFjY2VwdENhbGwoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5jYWxsaW5nU2VydmljZUFjY2VwdCk7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlQWNjZXB0LFxuICAgICAgICAgICAgJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIHRydWVcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgYXdhaXQgYWNjZXB0Q2FsbCh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGFzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFR3aWNlKHRoaXMuY2FsbGluZ1NlcnZpY2VBY2NlcHQpO1xuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgdGhpcy5jYWxsaW5nU2VydmljZUFjY2VwdCxcbiAgICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1cGRhdGVzIHRoZSBhY3RpdmUgY2FsbCBzdGF0ZSB3aXRoIEFDQ0VQVF9DQUxMX1BFTkRJTkcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgICBhd2FpdCBhY2NlcHRDYWxsKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgYXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgfSkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSBkaXNwYXRjaC5nZXRDYWxsKDApLmFyZ3NbMF07XG5cbiAgICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aEluY29taW5nRGlyZWN0Q2FsbCwgYWN0aW9uKTtcblxuICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmFjdGl2ZUNhbGxTdGF0ZSwge1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgICAgICAgIHZpZXdNb2RlOiBDYWxsVmlld01vZGUuR3JpZCxcbiAgICAgICAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICAgICAgICBvdXRnb2luZ1Jpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgICAgIHNldHRpbmdzRGlhbG9nT3BlbjogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdhY2NlcHRpbmcgYSBncm91cCBjYWxsJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnZXRTdGF0ZSA9ICgpID0+ICh7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICBjYWxsaW5nOiBzdGF0ZVdpdGhJbmNvbWluZ0dyb3VwQ2FsbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Rpc3BhdGNoZXMgYW4gQUNDRVBUX0NBTExfUEVORElORyBhY3Rpb24nLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICAgIGF3YWl0IGFjY2VwdENhbGwoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGFzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICAgIH0pKGRpc3BhdGNoLCBnZXRTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShkaXNwYXRjaCk7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYWxsaW5nL0FDQ0VQVF9DQUxMX1BFTkRJTkcnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgICBhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhd2FpdCBhY2NlcHRDYWxsKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgICAgfSkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShkaXNwYXRjaCk7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoZGlzcGF0Y2gsIHtcbiAgICAgICAgICAgIHR5cGU6ICdjYWxsaW5nL0FDQ0VQVF9DQUxMX1BFTkRJTkcnLFxuICAgICAgICAgICAgcGF5bG9hZDoge1xuICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgICBhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXNrcyB0aGUgY2FsbGluZyBzZXJ2aWNlIHRvIGpvaW4gdGhlIGNhbGwnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgICBhd2FpdCBhY2NlcHRDYWxsKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5jYWxsaW5nU2VydmljZUpvaW4pO1xuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgdGhpcy5jYWxsaW5nU2VydmljZUpvaW4sXG4gICAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICB0cnVlLFxuICAgICAgICAgICAgdHJ1ZVxuICAgICAgICAgICk7XG5cbiAgICAgICAgICBhd2FpdCBhY2NlcHRDYWxsKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBhc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgICAgfSkoZGlzcGF0Y2gsIGdldFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZSh0aGlzLmNhbGxpbmdTZXJ2aWNlSm9pbik7XG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoXG4gICAgICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlSm9pbixcbiAgICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIHRydWUsXG4gICAgICAgICAgICBmYWxzZVxuICAgICAgICAgICk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCd1cGRhdGVzIHRoZSBhY3RpdmUgY2FsbCBzdGF0ZSB3aXRoIEFDQ0VQVF9DQUxMX1BFTkRJTkcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgICBhd2FpdCBhY2NlcHRDYWxsKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBhc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgZ2V0U3RhdGUsIG51bGwpO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5hY3RpdmVDYWxsU3RhdGUsIHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgICAgICAgIHZpZXdNb2RlOiBDYWxsVmlld01vZGUuR3JpZCxcbiAgICAgICAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgICAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICAgICAgICBvdXRnb2luZ1Jpbmc6IGZhbHNlLFxuICAgICAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgICAgIHNldHRpbmdzRGlhbG9nT3BlbjogZmFsc2UsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuY2VsQ2FsbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgY2FuY2VsQ2FsbCB9ID0gYWN0aW9ucztcblxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlU3RvcENhbGxpbmdMb2JieSA9IHRoaXMuc2FuZGJveC5zdHViKFxuICAgICAgICAgIGNhbGxpbmdTZXJ2aWNlLFxuICAgICAgICAgICdzdG9wQ2FsbGluZ0xvYmJ5J1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzdG9wcyB0aGUgY2FsbGluZyBsb2JieSBmb3IgdGhhdCBjb252ZXJzYXRpb24nLCBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBjYW5jZWxDYWxsKHsgY29udmVyc2F0aW9uSWQ6ICcxMjMnIH0pO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHRoaXMuY2FsbGluZ1NlcnZpY2VTdG9wQ2FsbGluZ0xvYmJ5KTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgodGhpcy5jYWxsaW5nU2VydmljZVN0b3BDYWxsaW5nTG9iYnksICcxMjMnKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY29tcGxldGVseSByZW1vdmVzIGFuIGFjdGl2ZSBkaXJlY3QgY2FsbCBmcm9tIHRoZSBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLFxuICAgICAgICAgIGNhbmNlbENhbGwoeyBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5ub3RQcm9wZXJ0eShcbiAgICAgICAgICByZXN1bHQuY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgICAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmVtb3ZlcyB0aGUgYWN0aXZlIGdyb3VwIGNhbGwsIGJ1dCBsZWF2ZXMgaXQgaW4gdGhlIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbCxcbiAgICAgICAgICBjYW5jZWxDYWxsKHsgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5wcm9wZXJ0eShcbiAgICAgICAgICByZXN1bHQuY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC5hY3RpdmVDYWxsU3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnY2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBjYW5jZWxJbmNvbWluZ0dyb3VwQ2FsbFJpbmcgfSA9IGFjdGlvbnM7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlcmUgaXMgbm8gYXNzb2NpYXRlZCBncm91cCBjYWxsJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2dhcmJhZ2UnLFxuICAgICAgICAgIHJpbmdJZDogQmlnSW50KDEpLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcImRvZXMgbm90aGluZyBpZiB0aGUgcmluZyB0byBjYW5jZWwgaXNuJ3QgdGhlIHNhbWUgb25lXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2FuY2VsSW5jb21pbmdHcm91cENhbGxSaW5nKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIHJpbmdJZDogQmlnSW50KDk5OSksXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZW1vdmVzIHRoZSByaW5nIHN0YXRlLCBidXQgbm90IHRoZSBjYWxsJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjYW5jZWxJbmNvbWluZ0dyb3VwQ2FsbFJpbmcoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgcmluZ0lkOiBCaWdJbnQoMTIzKSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZVdpdGhJbmNvbWluZ0dyb3VwQ2FsbCwgYWN0aW9uKTtcbiAgICAgICAgY29uc3QgY2FsbCA9XG4gICAgICAgICAgcmVzdWx0LmNhbGxzQnlDb252ZXJzYXRpb25bJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXTtcbiAgICAgICAgLy8gSXQnZCBiZSBuaWNlIHRvIGRvIHRoaXMgd2l0aCBhbiBhc3NlcnQsIGJ1dCBDaGFpIGRvZXNuJ3QgdW5kZXJzdGFuZCBpdC5cbiAgICAgICAgaWYgKGNhbGw/LmNhbGxNb2RlICE9PSBDYWxsTW9kZS5Hcm91cCkge1xuICAgICAgICAgIHRocm93IG5ldyBFcnJvcignRXhwZWN0ZWQgdG8gZmluZCBhIGdyb3VwIGNhbGwnKTtcbiAgICAgICAgfVxuXG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChjYWxsLnJpbmdJZCk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChjYWxsLnJpbmdlclV1aWQpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnZGVjbGluZUNhbGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IGRlY2xpbmVDYWxsIH0gPSBhY3Rpb25zO1xuXG4gICAgICBsZXQgZGVjbGluZURpcmVjdENhbGw6IHNpbm9uLlNpbm9uU3R1YjtcbiAgICAgIGxldCBkZWNsaW5lR3JvdXBDYWxsOiBzaW5vbi5TaW5vblN0dWI7XG5cbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgZGVjbGluZURpcmVjdENhbGwgPSB0aGlzLnNhbmRib3guc3R1YihcbiAgICAgICAgICBjYWxsaW5nU2VydmljZSxcbiAgICAgICAgICAnZGVjbGluZURpcmVjdENhbGwnXG4gICAgICAgICk7XG4gICAgICAgIGRlY2xpbmVHcm91cENhbGwgPSB0aGlzLnNhbmRib3guc3R1YihcbiAgICAgICAgICBjYWxsaW5nU2VydmljZSxcbiAgICAgICAgICAnZGVjbGluZUdyb3VwQ2FsbCdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZGVjbGluaW5nIGEgZGlyZWN0IGNhbGwnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGdldFN0YXRlID0gKCkgPT4gKHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgIGNhbGxpbmc6IHN0YXRlV2l0aEluY29taW5nRGlyZWN0Q2FsbCxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Rpc3BhdGNoZXMgYSBERUNMSU5FX0RJUkVDVF9DQUxMIGFjdGlvbicsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuXG4gICAgICAgICAgZGVjbGluZUNhbGwoeyBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyB9KShcbiAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgZ2V0U3RhdGUsXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRpc3BhdGNoKTtcbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgICAgdHlwZTogJ2NhbGxpbmcvREVDTElORV9ESVJFQ1RfQ0FMTCcsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Fza3MgdGhlIGNhbGxpbmcgc2VydmljZSB0byBkZWNsaW5lIHRoZSBjYWxsJywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgICBkZWNsaW5lQ2FsbCh7IGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnIH0pKFxuICAgICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoZGVjbGluZURpcmVjdENhbGwpO1xuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgZGVjbGluZURpcmVjdENhbGwsXG4gICAgICAgICAgICAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3JlbW92ZXMgdGhlIGNhbGwgZnJvbSB0aGUgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgICBkZWNsaW5lQ2FsbCh7IGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnIH0pKFxuICAgICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgICBnZXRTdGF0ZSxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgICApO1xuICAgICAgICAgIGNvbnN0IGFjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgICBhc3NlcnQubm90UHJvcGVydHkoXG4gICAgICAgICAgICByZXN1bHQuY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgICApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnZGVjbGluaW5nIGEgZ3JvdXAgY2FsbCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgZ2V0U3RhdGUgPSAoKSA9PiAoe1xuICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgY2FsbGluZzogc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdkaXNwYXRjaGVzIGEgQ0FOQ0VMX0lOQ09NSU5HX0dST1VQX0NBTExfUklORyBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICAgIGRlY2xpbmVDYWxsKHsgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyB9KShcbiAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgZ2V0U3RhdGUsXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRpc3BhdGNoKTtcbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgICAgdHlwZTogJ2NhbGxpbmcvQ0FOQ0VMX0lOQ09NSU5HX0dST1VQX0NBTExfUklORycsXG4gICAgICAgICAgICBwYXlsb2FkOiB7XG4gICAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICAgIHJpbmdJZDogQmlnSW50KDEyMyksXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnYXNrcyB0aGUgY2FsbGluZyBzZXJ2aWNlIHRvIGRlY2xpbmUgdGhlIGNhbGwnLCAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICAgIGRlY2xpbmVDYWxsKHsgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyB9KShcbiAgICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICAgZ2V0U3RhdGUsXG4gICAgICAgICAgICBudWxsXG4gICAgICAgICAgKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRlY2xpbmVHcm91cENhbGwpO1xuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgICAgZGVjbGluZUdyb3VwQ2FsbCxcbiAgICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIEJpZ0ludCgxMjMpXG4gICAgICAgICAgKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgLy8gTk9URTogVGhlIHN0YXRlIGVmZmVjdHMgb2YgdGhpcyBhY3Rpb24gYXJlIHRlc3RlZCB3aXRoXG4gICAgICAgIC8vICAgYGNhbmNlbEluY29taW5nR3JvdXBDYWxsUmluZ2AuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdncm91cENhbGxBdWRpb0xldmVsc0NoYW5nZScsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgZ3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2UgfSA9IGFjdGlvbnM7XG5cbiAgICAgIGNvbnN0IHJlbW90ZURldmljZVN0YXRlcyA9IFtcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLjMsIGRlbXV4SWQ6IDEgfSxcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLjQsIGRlbXV4SWQ6IDIgfSxcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLjUsIGRlbXV4SWQ6IDMgfSxcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLjIsIGRlbXV4SWQ6IDcgfSxcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLjEsIGRlbXV4SWQ6IDggfSxcbiAgICAgICAgeyBhdWRpb0xldmVsOiAwLCBkZW11eElkOiA5IH0sXG4gICAgICBdO1xuXG4gICAgICBjb25zdCByZW1vdGVBdWRpb0xldmVscyA9IG5ldyBNYXA8bnVtYmVyLCBudW1iZXI+KFtcbiAgICAgICAgWzEsIHRydW5jYXRlQXVkaW9MZXZlbCgwLjMpXSxcbiAgICAgICAgWzIsIHRydW5jYXRlQXVkaW9MZXZlbCgwLjQpXSxcbiAgICAgICAgWzMsIHRydW5jYXRlQXVkaW9MZXZlbCgwLjUpXSxcbiAgICAgICAgWzcsIHRydW5jYXRlQXVkaW9MZXZlbCgwLjIpXSxcbiAgICAgICAgWzgsIHRydW5jYXRlQXVkaW9MZXZlbCgwLjEpXSxcbiAgICAgIF0pO1xuXG4gICAgICBpdChcImRvZXMgbm90aGluZyBpZiB0aGVyZSdzIG5vIHJlbGV2YW50IGNhbGxcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBncm91cENhbGxBdWRpb0xldmVsc0NoYW5nZSh7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdnYXJiYWdlJyxcbiAgICAgICAgICBsb2NhbEF1ZGlvTGV2ZWw6IDEsXG4gICAgICAgICAgcmVtb3RlRGV2aWNlU3RhdGVzLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbCwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIHN0YXRlIGNoYW5nZSB3b3VsZCBiZSBhIG5vLW9wJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwsXG4gICAgICAgICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uW1xuICAgICAgICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICByZW1vdGVBdWRpb0xldmVscyxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gZ3JvdXBDYWxsQXVkaW9MZXZlbHNDaGFuZ2Uoe1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgbG9jYWxBdWRpb0xldmVsOiAwLjAwMSxcbiAgICAgICAgICByZW1vdGVEZXZpY2VTdGF0ZXMsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBzZXQgb2Ygc3BlYWtpbmcgcGFydGljaXBhbnRzLCBpbmNsdWRpbmcgeW91cnNlbGYnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGdyb3VwQ2FsbEF1ZGlvTGV2ZWxzQ2hhbmdlKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMC44LFxuICAgICAgICAgIHJlbW90ZURldmljZVN0YXRlcyxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICByZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5sb2NhbEF1ZGlvTGV2ZWwsXG4gICAgICAgICAgdHJ1bmNhdGVBdWRpb0xldmVsKDAuOClcbiAgICAgICAgKTtcblxuICAgICAgICBjb25zdCBjYWxsID1cbiAgICAgICAgICByZXN1bHQuY2FsbHNCeUNvbnZlcnNhdGlvblsnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCddO1xuICAgICAgICBpZiAoY2FsbD8uY2FsbE1vZGUgIT09IENhbGxNb2RlLkdyb3VwKSB7XG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKCdFeHBlY3RlZCBhIGdyb3VwIGNhbGwgdG8gYmUgZm91bmQnKTtcbiAgICAgICAgfVxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGNhbGwucmVtb3RlQXVkaW9MZXZlbHMsIHJlbW90ZUF1ZGlvTGV2ZWxzKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2dyb3VwQ2FsbFN0YXRlQ2hhbmdlJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBncm91cENhbGxTdGF0ZUNoYW5nZSB9ID0gYWN0aW9ucztcblxuICAgICAgZnVuY3Rpb24gZ2V0QWN0aW9uKFxuICAgICAgICAuLi5hcmdzOiBQYXJhbWV0ZXJzPHR5cGVvZiBncm91cENhbGxTdGF0ZUNoYW5nZT5cbiAgICAgICk6IEdyb3VwQ2FsbFN0YXRlQ2hhbmdlQWN0aW9uVHlwZSB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgZ3JvdXBDYWxsU3RhdGVDaGFuZ2UoLi4uYXJncykoZGlzcGF0Y2gsIGdldEVtcHR5Um9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgICByZXR1cm4gZGlzcGF0Y2guZ2V0Q2FsbCgwKS5hcmdzWzBdO1xuICAgICAgfVxuXG4gICAgICBpdCgnc2F2ZXMgYSBuZXcgY2FsbCB0byB0aGUgbWFwIG9mIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoXG4gICAgICAgICAgZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGdldEFjdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmluZyxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbY3JlYXRvclV1aWRdLFxuICAgICAgICAgICAgICBjcmVhdG9yVXVpZCxcbiAgICAgICAgICAgICAgZXJhSWQ6ICd4eXonLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiA0IC8gMyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5pbmcsXG4gICAgICAgICAgICBwZWVrSW5mbzoge1xuICAgICAgICAgICAgICB1dWlkczogW2NyZWF0b3JVdWlkXSxcbiAgICAgICAgICAgICAgY3JlYXRvclV1aWQsXG4gICAgICAgICAgICAgIGVyYUlkOiAneHl6JyxcbiAgICAgICAgICAgICAgbWF4RGV2aWNlczogMTYsXG4gICAgICAgICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgdXVpZDogcmVtb3RlVXVpZCxcbiAgICAgICAgICAgICAgICBkZW11eElkOiAxMjMsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlQXVkaW86IHRydWUsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogNCAvIDMsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXBkYXRlcyBhIGNhbGwgaW4gdGhlIG1hcCBvZiBjb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICAgICAgICBnZXRBY3Rpb24oe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5lZCxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbJzFiOWU0ZDQyLTFmNTYtNDVjNS1iNmY0LWQxYmU1YTU0ZmVmYSddLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDQ1NixcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgcmVzdWx0LmNhbGxzQnlDb252ZXJzYXRpb25bJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkLFxuICAgICAgICAgICAgcGVla0luZm86IHtcbiAgICAgICAgICAgICAgdXVpZHM6IFsnMWI5ZTRkNDItMWY1Ni00NWM1LWI2ZjQtZDFiZTVhNTRmZWZhJ10sXG4gICAgICAgICAgICAgIG1heERldmljZXM6IDE2LFxuICAgICAgICAgICAgICBkZXZpY2VDb3VudDogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHV1aWQ6IHJlbW90ZVV1aWQsXG4gICAgICAgICAgICAgICAgZGVtdXhJZDogNDU2LFxuICAgICAgICAgICAgICAgIGhhc1JlbW90ZUF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiAxNiAvIDksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcImtlZXBzIHRoZSBleGlzdGluZyByaW5nIHN0YXRlIGlmIHlvdSBoYXZlbid0IGpvaW5lZCB0aGUgY2FsbFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICAgICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVdpdGhHcm91cENhbGwuY2FsbHNCeUNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgICAuLi5zdGF0ZVdpdGhHcm91cENhbGwuY2FsbHNCeUNvbnZlcnNhdGlvbltcbiAgICAgICAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgcmluZ0lkOiBCaWdJbnQoNDU2KSxcbiAgICAgICAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICBnZXRBY3Rpb24oe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbJzFiOWU0ZDQyLTFmNTYtNDVjNS1iNmY0LWQxYmU1YTU0ZmVmYSddLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDQ1NixcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5pbmNsdWRlKFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgcmluZ0lkOiBCaWdJbnQoNDU2KSxcbiAgICAgICAgICAgIHJpbmdlclV1aWQsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KFwicmVtb3ZlcyB0aGUgcmluZyBzdGF0ZSBpZiB5b3UndmUgam9pbmVkIHRoZSBjYWxsXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLFxuICAgICAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uLFxuICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uW1xuICAgICAgICAgICAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ1xuICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICByaW5nSWQ6IEJpZ0ludCg0NTYpLFxuICAgICAgICAgICAgICByaW5nZXJVdWlkLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGdldEFjdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkLFxuICAgICAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgICAgICAgcGVla0luZm86IHtcbiAgICAgICAgICAgICAgdXVpZHM6IFsnMWI5ZTRkNDItMWY1Ni00NWM1LWI2ZjQtZDFiZTVhNTRmZWZhJ10sXG4gICAgICAgICAgICAgIG1heERldmljZXM6IDE2LFxuICAgICAgICAgICAgICBkZXZpY2VDb3VudDogMSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtcbiAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHV1aWQ6IHJlbW90ZVV1aWQsXG4gICAgICAgICAgICAgICAgZGVtdXhJZDogNDU2LFxuICAgICAgICAgICAgICAgIGhhc1JlbW90ZUF1ZGlvOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiAxNiAvIDksXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBdLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5KFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAgJ3JpbmdJZCdcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0Lm5vdFByb3BlcnR5KFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAgJ3JpbmdlclV1aWQnXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJpZiBubyBjYWxsIGlzIGFjdGl2ZSwgZG9lc24ndCB0b3VjaCB0aGUgYWN0aXZlIGNhbGwgc3RhdGVcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICAgICAgICBnZXRBY3Rpb24oe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5lZCxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbJzFiOWU0ZDQyLTFmNTYtNDVjNS1iNmY0LWQxYmU1YTU0ZmVmYSddLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDQ1NixcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcImlmIHRoZSBjYWxsIGlzIG5vdCBhY3RpdmUsIGRvZXNuJ3QgdG91Y2ggdGhlIGFjdGl2ZSBjYWxsIHN0YXRlXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwsXG4gICAgICAgICAgZ2V0QWN0aW9uKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnYW5vdGhlci1mYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQsXG4gICAgICAgICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Kb2luZWQsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbJzFiOWU0ZDQyLTFmNTYtNDVjNS1iNmY0LWQxYmU1YTU0ZmVmYSddLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDQ1NixcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmFjdGl2ZUNhbGxTdGF0ZSwge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgICAgICBsb2NhbEF1ZGlvTGV2ZWw6IDAsXG4gICAgICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5HcmlkLFxuICAgICAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgICAgICBzYWZldHlOdW1iZXJDaGFuZ2VkVXVpZHM6IFtdLFxuICAgICAgICAgIG91dGdvaW5nUmluZzogZmFsc2UsXG4gICAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaWYgdGhlIGNhbGwgaXMgYWN0aXZlLCB1cGRhdGVzIHRoZSBhY3RpdmUgY2FsbCBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwsXG4gICAgICAgICAgZ2V0QWN0aW9uKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQsXG4gICAgICAgICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Kb2luZWQsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbJzFiOWU0ZDQyLTFmNTYtNDVjNS1iNmY0LWQxYmU1YTU0ZmVmYSddLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDQ1NixcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogZmFsc2UsXG4gICAgICAgICAgICAgICAgaGFzUmVtb3RlVmlkZW86IHRydWUsXG4gICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgc2hhcmluZ1NjcmVlbjogZmFsc2UsXG4gICAgICAgICAgICAgICAgdmlkZW9Bc3BlY3RSYXRpbzogMTYgLyA5LFxuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICByZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5jb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5oYXNMb2NhbEF1ZGlvKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5oYXNMb2NhbFZpZGVvKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcImRvZXNuJ3Qgc3RvcCByaW5naW5nIGlmIG5vYm9keSBpcyBpbiB0aGUgY2FsbFwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbCxcbiAgICAgICAgICBhY3RpdmVDYWxsU3RhdGU6IHtcbiAgICAgICAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbC5hY3RpdmVDYWxsU3RhdGUsXG4gICAgICAgICAgICBvdXRnb2luZ1Jpbmc6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICBnZXRBY3Rpb24oe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5lZCxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiB0cnVlLFxuICAgICAgICAgICAgcGVla0luZm86IHtcbiAgICAgICAgICAgICAgdXVpZHM6IFtdLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXSxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5pc1RydWUocmVzdWx0LmFjdGl2ZUNhbGxTdGF0ZT8ub3V0Z29pbmdSaW5nKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc3RvcHMgcmluZ2luZyBpZiBzb21lb25lIGVudGVycyB0aGUgY2FsbCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLFxuICAgICAgICAgIGFjdGl2ZUNhbGxTdGF0ZToge1xuICAgICAgICAgICAgLi4uc3RhdGVXaXRoQWN0aXZlR3JvdXBDYWxsLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgICAgIG91dGdvaW5nUmluZzogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGdldEFjdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuSm9pbmVkLFxuICAgICAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgIGhhc0xvY2FsVmlkZW86IHRydWUsXG4gICAgICAgICAgICBwZWVrSW5mbzoge1xuICAgICAgICAgICAgICB1dWlkczogWycxYjllNGQ0Mi0xZjU2LTQ1YzUtYjZmNC1kMWJlNWE1NGZlZmEnXSxcbiAgICAgICAgICAgICAgbWF4RGV2aWNlczogMTYsXG4gICAgICAgICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW10sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5vdXRnb2luZ1JpbmcpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncGVla05vdENvbm5lY3RlZEdyb3VwQ2FsbCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgcGVla05vdENvbm5lY3RlZEdyb3VwQ2FsbCB9ID0gYWN0aW9ucztcblxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlUGVla0dyb3VwQ2FsbCA9IHRoaXMuc2FuZGJveC5zdHViKFxuICAgICAgICAgIGNhbGxpbmdTZXJ2aWNlLFxuICAgICAgICAgICdwZWVrR3JvdXBDYWxsJ1xuICAgICAgICApO1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlVXBkYXRlQ2FsbEhpc3RvcnlGb3JHcm91cENhbGwgPSB0aGlzLnNhbmRib3guc3R1YihcbiAgICAgICAgICBjYWxsaW5nU2VydmljZSxcbiAgICAgICAgICAndXBkYXRlQ2FsbEhpc3RvcnlGb3JHcm91cENhbGwnXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2xvY2sgPSB0aGlzLnNhbmRib3gudXNlRmFrZVRpbWVycygpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCd0aHVuaycsICgpID0+IHtcbiAgICAgICAgZnVuY3Rpb24gbm9vcFRlc3QoY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUpIHtcbiAgICAgICAgICByZXR1cm4gYXN5bmMgZnVuY3Rpb24gdGVzdCh0aGlzOiBNb2NoYS5Db250ZXh0KSB7XG4gICAgICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuXG4gICAgICAgICAgICBhd2FpdCBwZWVrTm90Q29ubmVjdGVkR3JvdXBDYWxsKHtcbiAgICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIH0pKFxuICAgICAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgICAgICAgIGNhbGxpbmc6IHtcbiAgICAgICAgICAgICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbCxcbiAgICAgICAgICAgICAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgICAgICAgICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLmNhbGxzQnlDb252ZXJzYXRpb25bXG4gICAgICAgICAgICAgICAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCdcbiAgICAgICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZSxcbiAgICAgICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSksXG4gICAgICAgICAgICAgIG51bGxcbiAgICAgICAgICAgICk7XG5cbiAgICAgICAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZGlzcGF0Y2gpO1xuICAgICAgICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZCh0aGlzLmNhbGxpbmdTZXJ2aWNlUGVla0dyb3VwQ2FsbCk7XG4gICAgICAgICAgfTtcbiAgICAgICAgfVxuXG4gICAgICAgIGl0KFxuICAgICAgICAgICduby1vcHMgaWYgdHJ5aW5nIHRvIHBlZWsgYXQgYSBjb25uZWN0aW5nIGdyb3VwIGNhbGwnLFxuICAgICAgICAgIG5vb3BUZXN0KEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0aW5nKVxuICAgICAgICApO1xuXG4gICAgICAgIGl0KFxuICAgICAgICAgICduby1vcHMgaWYgdHJ5aW5nIHRvIHBlZWsgYXQgYSBjb25uZWN0ZWQgZ3JvdXAgY2FsbCcsXG4gICAgICAgICAgbm9vcFRlc3QoR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZClcbiAgICAgICAgKTtcblxuICAgICAgICBpdChcbiAgICAgICAgICAnbm8tb3BzIGlmIHRyeWluZyB0byBwZWVrIGF0IGEgcmVjb25uZWN0aW5nIGdyb3VwIGNhbGwnLFxuICAgICAgICAgIG5vb3BUZXN0KEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5SZWNvbm5lY3RpbmcpXG4gICAgICAgICk7XG5cbiAgICAgICAgLy8gVGhlc2UgdGVzdHMgYXJlIGluY29tcGxldGUuXG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdyZXR1cm5Ub0FjdGl2ZUNhbGwnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHJldHVyblRvQWN0aXZlQ2FsbCB9ID0gYWN0aW9ucztcblxuICAgICAgaXQoJ2RvZXMgbm90aGluZyBpZiBub3QgaW4gUGlQIG1vZGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoQWN0aXZlRGlyZWN0Q2FsbCwgcmV0dXJuVG9BY3RpdmVDYWxsKCkpO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LCBzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2xvc2VzIHRoZSBQaVAnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLnN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwsXG4gICAgICAgICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICAgICAgICAuLi5zdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLmFjdGl2ZUNhbGxTdGF0ZSxcbiAgICAgICAgICAgIHBpcDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCByZXR1cm5Ub0FjdGl2ZUNhbGwoKSk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgncmVjZWl2ZUluY29taW5nR3JvdXBDYWxsJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyByZWNlaXZlSW5jb21pbmdHcm91cENhbGwgfSA9IGFjdGlvbnM7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIGNhbGwgd2FzIGFscmVhZHkgcmluZ2luZycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmVjZWl2ZUluY29taW5nR3JvdXBDYWxsKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIHJpbmdJZDogQmlnSW50KDQ1NiksXG4gICAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGwpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIGNhbGwgd2FzIGFscmVhZHkgam9pbmVkJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5zdGF0ZVdpdGhHcm91cENhbGwsXG4gICAgICAgICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLmNhbGxzQnlDb252ZXJzYXRpb24sXG4gICAgICAgICAgICAnZmFrZS1ncm91cC1jYWxsLWNvbnZlcnNhdGlvbi1pZCc6IHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLmNhbGxzQnlDb252ZXJzYXRpb25bXG4gICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLkpvaW5lZCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmVjZWl2ZUluY29taW5nR3JvdXBDYWxsKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIHJpbmdJZDogQmlnSW50KDQ1NiksXG4gICAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjcmVhdGVzIGEgbmV3IGdyb3VwIGNhbGwgaWYgb25lIGRpZCBub3QgZXhpc3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHJlY2VpdmVJbmNvbWluZ0dyb3VwQ2FsbCh7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICByaW5nSWQ6IEJpZ0ludCg0NTYpLFxuICAgICAgICAgIHJpbmdlclV1aWQsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKGdldEVtcHR5U3RhdGUoKSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLk5vdENvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbXSxcbiAgICAgICAgICAgICAgbWF4RGV2aWNlczogSW5maW5pdHksXG4gICAgICAgICAgICAgIGRldmljZUNvdW50OiAwLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW10sXG4gICAgICAgICAgICByaW5nSWQ6IEJpZ0ludCg0NTYpLFxuICAgICAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgICAgICB9XG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2F0dGFjaGVzIHJpbmcgc3RhdGUgdG8gYW4gZXhpc3RpbmcgY2FsbCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmVjZWl2ZUluY29taW5nR3JvdXBDYWxsKHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIHJpbmdJZDogQmlnSW50KDQ1NiksXG4gICAgICAgICAgcmluZ2VyVXVpZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGVXaXRoR3JvdXBDYWxsLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pbmNsdWRlKFxuICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ10sXG4gICAgICAgICAge1xuICAgICAgICAgICAgcmluZ0lkOiBCaWdJbnQoNDU2KSxcbiAgICAgICAgICAgIHJpbmdlclV1aWQsXG4gICAgICAgICAgfVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0TG9jYWxBdWRpbycsICgpID0+IHtcbiAgICAgIGNvbnN0IHsgc2V0TG9jYWxBdWRpbyB9ID0gYWN0aW9ucztcblxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICB0aGlzLmNhbGxpbmdTZXJ2aWNlU2V0T3V0Z29pbmdBdWRpbyA9IHRoaXMuc2FuZGJveC5zdHViKFxuICAgICAgICAgIGNhbGxpbmdTZXJ2aWNlLFxuICAgICAgICAgICdzZXRPdXRnb2luZ0F1ZGlvJ1xuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNwYXRjaGVzIGEgU0VUX0xPQ0FMX0FVRElPX0ZVTEZJTExFRCBhY3Rpb24nLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgc2V0TG9jYWxBdWRpbyh7IGVuYWJsZWQ6IHRydWUgfSkoXG4gICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgICBjYWxsaW5nOiBzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShkaXNwYXRjaCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7XG4gICAgICAgICAgdHlwZTogJ2NhbGxpbmcvU0VUX0xPQ0FMX0FVRElPX0ZVTEZJTExFRCcsXG4gICAgICAgICAgcGF5bG9hZDogeyBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBvdXRnb2luZyBhdWRpbyBmb3IgdGhlIGFjdGl2ZSBjYWxsJywgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICBzZXRMb2NhbEF1ZGlvKHsgZW5hYmxlZDogZmFsc2UgfSkoXG4gICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgICBjYWxsaW5nOiBzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZSh0aGlzLmNhbGxpbmdTZXJ2aWNlU2V0T3V0Z29pbmdBdWRpbyk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgIHRoaXMuY2FsbGluZ1NlcnZpY2VTZXRPdXRnb2luZ0F1ZGlvLFxuICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgZmFsc2VcbiAgICAgICAgKTtcblxuICAgICAgICBzZXRMb2NhbEF1ZGlvKHsgZW5hYmxlZDogdHJ1ZSB9KShcbiAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICAgIGNhbGxpbmc6IHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZSh0aGlzLmNhbGxpbmdTZXJ2aWNlU2V0T3V0Z29pbmdBdWRpbyk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgIHRoaXMuY2FsbGluZ1NlcnZpY2VTZXRPdXRnb2luZ0F1ZGlvLFxuICAgICAgICAgICdmYWtlLWRpcmVjdC1jYWxsLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgdHJ1ZVxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBsb2NhbCBhdWRpbyBzdGF0ZSB3aXRoIFNFVF9MT0NBTF9BVURJT19GVUxGSUxMRUQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICAgIHNldExvY2FsQXVkaW8oeyBlbmFibGVkOiBmYWxzZSB9KShcbiAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICAgIGNhbGxpbmc6IHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBkaXNwYXRjaC5nZXRDYWxsKDApLmFyZ3NbMF07XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5hY3RpdmVDYWxsU3RhdGU/Lmhhc0xvY2FsQXVkaW8pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc2V0T3V0Z29pbmdSaW5nJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzZXRPdXRnb2luZ1JpbmcgfSA9IGFjdGlvbnM7XG5cbiAgICAgIGl0KCdlbmFibGVzIGEgZGVzaXJlIHRvIHJpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNldE91dGdvaW5nUmluZyh0cnVlKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlPy5vdXRnb2luZ1JpbmcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNhYmxlcyBhIGRlc2lyZSB0byByaW5nJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzZXRPdXRnb2luZ1JpbmcoZmFsc2UpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LmFjdGl2ZUNhbGxTdGF0ZT8ub3V0Z29pbmdSaW5nKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3N0YXJ0Q2FsbGluZ0xvYmJ5JywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzdGFydENhbGxpbmdMb2JieSB9ID0gYWN0aW9ucztcblxuICAgICAgbGV0IHJvb3RTdGF0ZTogUm9vdFN0YXRlVHlwZTtcbiAgICAgIGxldCBzdGFydENhbGxpbmdMb2JieVN0dWI6IHNpbm9uLlNpbm9uU3R1YjtcblxuICAgICAgYmVmb3JlRWFjaChmdW5jdGlvbiBiZWZvcmVFYWNoKCkge1xuICAgICAgICBzdGFydENhbGxpbmdMb2JieVN0dWIgPSB0aGlzLnNhbmRib3hcbiAgICAgICAgICAuc3R1YihjYWxsaW5nU2VydmljZSwgJ3N0YXJ0Q2FsbGluZ0xvYmJ5JylcbiAgICAgICAgICAucmVzb2x2ZXMoKTtcblxuICAgICAgICBjb25zdCBlbXB0eVJvb3RTdGF0ZSA9IGdldEVtcHR5Um9vdFN0YXRlKCk7XG4gICAgICAgIHJvb3RTdGF0ZSA9IHtcbiAgICAgICAgICAuLi5lbXB0eVJvb3RTdGF0ZSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgICAgICAuLi5lbXB0eVJvb3RTdGF0ZS5jb252ZXJzYXRpb25zLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAgICdmYWtlLWNvbnZlcnNhdGlvbi1pZCc6IGdldERlZmF1bHRDb252ZXJzYXRpb24oKSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgndGh1bmsnLCAoKSA9PiB7XG4gICAgICAgIGl0KCdhc2tzIHRoZSBjYWxsaW5nIHNlcnZpY2UgdG8gc3RhcnQgdGhlIGxvYmJ5JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgaXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgfSkobm9vcCwgKCkgPT4gcm9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKHN0YXJ0Q2FsbGluZ0xvYmJ5U3R1Yik7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXF1ZXN0cyBhdWRpbyBieSBkZWZhdWx0JywgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgaXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgfSkobm9vcCwgKCkgPT4gcm9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoTWF0Y2goc3RhcnRDYWxsaW5nTG9iYnlTdHViLCB7XG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdChcImRvZXNuJ3QgcmVxdWVzdCBhdWRpbyBpZiB0aGUgZ3JvdXAgY2FsbCBhbHJlYWR5IGhhcyA4IGRldmljZXNcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGF3YWl0IHN0YXJ0Q2FsbGluZ0xvYmJ5KHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgaXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgfSkoXG4gICAgICAgICAgICBub29wLFxuICAgICAgICAgICAgKCkgPT4ge1xuICAgICAgICAgICAgICBjb25zdCBjYWxsaW5nU3RhdGUgPSBjbG9uZURlZXAoc3RhdGVXaXRoR3JvdXBDYWxsKTtcbiAgICAgICAgICAgICAgY2FsbGluZ1N0YXRlLmNhbGxzQnlDb252ZXJzYXRpb25bXG4gICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICAgICAgIF0ucGVla0luZm8uZGV2aWNlQ291bnQgPSA4O1xuICAgICAgICAgICAgICByZXR1cm4geyAuLi5yb290U3RhdGUsIGNhbGxpbmc6IGNhbGxpbmdTdGF0ZSB9O1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIG51bGxcbiAgICAgICAgICApO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGhNYXRjaChzdGFydENhbGxpbmdMb2JieVN0dWIsIHtcbiAgICAgICAgICAgIGhhc0xvY2FsVmlkZW86IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KCdyZXF1ZXN0cyB2aWRlbyB3aGVuIHN0YXJ0aW5nIGEgdmlkZW8gY2FsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBzdGFydENhbGxpbmdMb2JieSh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGlzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICAgIH0pKG5vb3AsICgpID0+IHJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aE1hdGNoKHN0YXJ0Q2FsbGluZ0xvYmJ5U3R1Yiwge1xuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJkb2Vzbid0IHJlcXVlc3QgdmlkZW8gd2hlbiBub3QgYSB2aWRlbyBjYWxsXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBhd2FpdCBzdGFydENhbGxpbmdMb2JieSh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGlzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgICB9KShub29wLCAoKSA9PiByb290U3RhdGUsIG51bGwpO1xuXG4gICAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGhNYXRjaChzdGFydENhbGxpbmdMb2JieVN0dWIsIHtcbiAgICAgICAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnZGlzcGF0Y2hlcyBhbiBhY3Rpb24gaWYgdGhlIGNhbGxpbmcgbG9iYnkgcmV0dXJucyBzb21ldGhpbmcnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgc3RhcnRDYWxsaW5nTG9iYnlTdHViLnJlc29sdmVzKHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3R1YigpO1xuXG4gICAgICAgICAgYXdhaXQgc3RhcnRDYWxsaW5nTG9iYnkoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBpc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgKCkgPT4gcm9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRpc3BhdGNoKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJkb2Vzbid0IGRpc3BhdGNoIGFuIGFjdGlvbiBpZiB0aGUgY2FsbGluZyBsb2JieSByZXR1cm5zIG5vdGhpbmdcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3R1YigpO1xuXG4gICAgICAgICAgYXdhaXQgc3RhcnRDYWxsaW5nTG9iYnkoe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgICBpc1ZpZGVvQ2FsbDogdHJ1ZSxcbiAgICAgICAgICB9KShkaXNwYXRjaCwgKCkgPT4gcm9vdFN0YXRlLCBudWxsKTtcblxuICAgICAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZGlzcGF0Y2gpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBkZXNjcmliZSgnYWN0aW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBnZXRTdGF0ZSA9IGFzeW5jIChcbiAgICAgICAgICBjYWxsaW5nU3RhdGU6IENhbGxpbmdTdGF0ZVR5cGUsXG4gICAgICAgICAgY2FsbGluZ1NlcnZpY2VSZXN1bHQ6IFVud3JhcFByb21pc2U8XG4gICAgICAgICAgICBSZXR1cm5UeXBlPHR5cGVvZiBjYWxsaW5nU2VydmljZS5zdGFydENhbGxpbmdMb2JieT5cbiAgICAgICAgICA+LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkID0gJ2Zha2UtY29udmVyc2F0aW9uLWlkJ1xuICAgICAgICApOiBQcm9taXNlPENhbGxpbmdTdGF0ZVR5cGU+ID0+IHtcbiAgICAgICAgICBzdGFydENhbGxpbmdMb2JieVN0dWIucmVzb2x2ZXMoY2FsbGluZ1NlcnZpY2VSZXN1bHQpO1xuXG4gICAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zdHViKCk7XG5cbiAgICAgICAgICBhd2FpdCBzdGFydENhbGxpbmdMb2JieSh7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgICAgIGlzVmlkZW9DYWxsOiB0cnVlLFxuICAgICAgICAgIH0pKGRpc3BhdGNoLCAoKSA9PiAoeyAuLi5yb290U3RhdGUsIGNhbGxpbmc6IGNhbGxpbmdTdGF0ZSB9KSwgbnVsbCk7XG5cbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSBkaXNwYXRjaC5nZXRDYWxsKDApLmFyZ3NbMF07XG5cbiAgICAgICAgICByZXR1cm4gcmVkdWNlcihjYWxsaW5nU3RhdGUsIGFjdGlvbik7XG4gICAgICAgIH07XG5cbiAgICAgICAgaXQoJ3NhdmVzIGEgZGlyZWN0IGNhbGwgYW5kIG1ha2VzIGl0IGFjdGl2ZScsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRTdGF0ZShnZXRFbXB0eVN0YXRlKCksIHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QgYXMgY29uc3QsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICB9KTtcblxuICAgICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNhbGxzQnlDb252ZXJzYXRpb25bJ2Zha2UtY29udmVyc2F0aW9uLWlkJ10sIHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGlzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICAgICAgaXNWaWRlb0NhbGw6IHRydWUsXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuYWN0aXZlQ2FsbFN0YXRlLCB7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiB0cnVlLFxuICAgICAgICAgICAgbG9jYWxBdWRpb0xldmVsOiAwLFxuICAgICAgICAgICAgdmlld01vZGU6IENhbGxWaWV3TW9kZS5HcmlkLFxuICAgICAgICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGZhbHNlLFxuICAgICAgICAgICAgc2FmZXR5TnVtYmVyQ2hhbmdlZFV1aWRzOiBbXSxcbiAgICAgICAgICAgIHBpcDogZmFsc2UsXG4gICAgICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICAgICAgb3V0Z29pbmdSaW5nOiB0cnVlLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2F2ZXMgYSBncm91cCBjYWxsIGFuZCBtYWtlcyBpdCBhY3RpdmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgZ2V0U3RhdGUoZ2V0RW1wdHlTdGF0ZSgpLCB7XG4gICAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbY3JlYXRvclV1aWRdLFxuICAgICAgICAgICAgICBjcmVhdG9yVXVpZCxcbiAgICAgICAgICAgICAgZXJhSWQ6ICd4eXonLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiA0IC8gMyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWNvbnZlcnNhdGlvbi1pZCddLCB7XG4gICAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbY3JlYXRvclV1aWRdLFxuICAgICAgICAgICAgICBjcmVhdG9yVXVpZCxcbiAgICAgICAgICAgICAgZXJhSWQ6ICd4eXonLFxuICAgICAgICAgICAgICBtYXhEZXZpY2VzOiAxNixcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiA0IC8gMyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICAgIHJlc3VsdC5hY3RpdmVDYWxsU3RhdGU/LmNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgICAgJ2Zha2UtY29udmVyc2F0aW9uLWlkJ1xuICAgICAgICAgICk7XG4gICAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LmFjdGl2ZUNhbGxTdGF0ZT8ub3V0Z29pbmdSaW5nKTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ2Nob29zZXMgZmFsbGJhY2sgcGVlayBpbmZvIGlmIG5vbmUgaXMgc2VudCBhbmQgdGhlcmUgaXMgbm8gZXhpc3RpbmcgY2FsbCcsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRTdGF0ZShnZXRFbXB0eVN0YXRlKCksIHtcbiAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgICBoYXNMb2NhbFZpZGVvOiB0cnVlLFxuICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkLFxuICAgICAgICAgICAgcGVla0luZm86IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW10sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBjYWxsID0gcmVzdWx0LmNhbGxzQnlDb252ZXJzYXRpb25bJ2Zha2UtY29udmVyc2F0aW9uLWlkJ107XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjYWxsPy5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiYgY2FsbC5wZWVrSW5mbywge1xuICAgICAgICAgICAgdXVpZHM6IFtdLFxuICAgICAgICAgICAgbWF4RGV2aWNlczogSW5maW5pdHksXG4gICAgICAgICAgICBkZXZpY2VDb3VudDogMCxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoXCJkb2Vzbid0IG92ZXJ3cml0ZSBhbiBleGlzdGluZyBncm91cCBjYWxsJ3MgcGVlayBpbmZvIGlmIG5vbmUgd2FzIHNlbnRcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldFN0YXRlKHN0YXRlV2l0aEdyb3VwQ2FsbCwge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgIGhhc0xvY2FsVmlkZW86IHRydWUsXG4gICAgICAgICAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Db25uZWN0ZWQsXG4gICAgICAgICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQsXG4gICAgICAgICAgICBwZWVrSW5mbzogdW5kZWZpbmVkLFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiA0IC8gMyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBjYWxsID1cbiAgICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ107XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjYWxsPy5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiYgY2FsbC5wZWVrSW5mbywge1xuICAgICAgICAgICAgdXVpZHM6IFtjcmVhdG9yVXVpZF0sXG4gICAgICAgICAgICBjcmVhdG9yVXVpZCxcbiAgICAgICAgICAgIGVyYUlkOiAneHl6JyxcbiAgICAgICAgICAgIG1heERldmljZXM6IDE2LFxuICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiY2FuIG92ZXJ3cml0ZSBhbiBleGlzdGluZyBncm91cCBjYWxsJ3MgcGVlayBpbmZvXCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgICAgJ2Zha2UtY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgICAgIC4uLnN0YXRlV2l0aEdyb3VwQ2FsbC5jYWxsc0J5Q29udmVyc2F0aW9uW1xuICAgICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IGdldFN0YXRlKHN0YXRlLCB7XG4gICAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgIGNvbm5lY3Rpb25TdGF0ZTogR3JvdXBDYWxsQ29ubmVjdGlvblN0YXRlLkNvbm5lY3RlZCxcbiAgICAgICAgICAgIGpvaW5TdGF0ZTogR3JvdXBDYWxsSm9pblN0YXRlLk5vdEpvaW5lZCxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbZGlmZmVyZW50Q3JlYXRvclV1aWRdLFxuICAgICAgICAgICAgICBjcmVhdG9yVXVpZDogZGlmZmVyZW50Q3JlYXRvclV1aWQsXG4gICAgICAgICAgICAgIGVyYUlkOiAnYWJjJyxcbiAgICAgICAgICAgICAgbWF4RGV2aWNlczogNSxcbiAgICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgcmVtb3RlUGFydGljaXBhbnRzOiBbXG4gICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICB1dWlkOiByZW1vdGVVdWlkLFxuICAgICAgICAgICAgICAgIGRlbXV4SWQ6IDEyMyxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICBwcmVzZW50aW5nOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICB2aWRlb0FzcGVjdFJhdGlvOiA0IC8gMyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgfSk7XG5cbiAgICAgICAgICBjb25zdCBjYWxsID0gcmVzdWx0LmNhbGxzQnlDb252ZXJzYXRpb25bJ2Zha2UtY29udmVyc2F0aW9uLWlkJ107XG4gICAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChjYWxsPy5jYWxsTW9kZSA9PT0gQ2FsbE1vZGUuR3JvdXAgJiYgY2FsbC5wZWVrSW5mbywge1xuICAgICAgICAgICAgdXVpZHM6IFtkaWZmZXJlbnRDcmVhdG9yVXVpZF0sXG4gICAgICAgICAgICBjcmVhdG9yVXVpZDogZGlmZmVyZW50Q3JlYXRvclV1aWQsXG4gICAgICAgICAgICBlcmFJZDogJ2FiYycsXG4gICAgICAgICAgICBtYXhEZXZpY2VzOiA1LFxuICAgICAgICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgICAgICAgfSk7XG4gICAgICAgIH0pO1xuXG4gICAgICAgIGl0KFwiZG9lc24ndCBvdmVyd3JpdGUgYW4gZXhpc3RpbmcgZ3JvdXAgY2FsbCdzIHJpbmcgc3RhdGUgaWYgaXQgd2FzIHNldCBwcmV2aW91c2x5XCIsIGFzeW5jICgpID0+IHtcbiAgICAgICAgICBjb25zdCByZXN1bHQgPSBhd2FpdCBnZXRTdGF0ZShcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgLi4uc3RhdGVXaXRoR3JvdXBDYWxsLFxuICAgICAgICAgICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAgICAgICAuLi5zdGF0ZVdpdGhHcm91cENhbGwuY2FsbHNCeUNvbnZlcnNhdGlvbltcbiAgICAgICAgICAgICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICAgICAgICAgICBdLFxuICAgICAgICAgICAgICAgICAgcmluZ0lkOiBCaWdJbnQoOTg3KSxcbiAgICAgICAgICAgICAgICAgIHJpbmdlclV1aWQsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5Hcm91cCxcbiAgICAgICAgICAgICAgaGFzTG9jYWxBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgaGFzTG9jYWxWaWRlbzogdHJ1ZSxcbiAgICAgICAgICAgICAgY29ubmVjdGlvblN0YXRlOiBHcm91cENhbGxDb25uZWN0aW9uU3RhdGUuQ29ubmVjdGVkLFxuICAgICAgICAgICAgICBqb2luU3RhdGU6IEdyb3VwQ2FsbEpvaW5TdGF0ZS5Ob3RKb2luZWQsXG4gICAgICAgICAgICAgIHBlZWtJbmZvOiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgIHJlbW90ZVBhcnRpY2lwYW50czogW1xuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIHV1aWQ6IHJlbW90ZVV1aWQsXG4gICAgICAgICAgICAgICAgICBkZW11eElkOiAxMjMsXG4gICAgICAgICAgICAgICAgICBoYXNSZW1vdGVBdWRpbzogdHJ1ZSxcbiAgICAgICAgICAgICAgICAgIGhhc1JlbW90ZVZpZGVvOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgcHJlc2VudGluZzogZmFsc2UsXG4gICAgICAgICAgICAgICAgICBzaGFyaW5nU2NyZWVuOiBmYWxzZSxcbiAgICAgICAgICAgICAgICAgIHZpZGVvQXNwZWN0UmF0aW86IDQgLyAzLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIF0sXG4gICAgICAgICAgICB9XG4gICAgICAgICAgKTtcbiAgICAgICAgICBjb25zdCBjYWxsID1cbiAgICAgICAgICAgIHJlc3VsdC5jYWxsc0J5Q29udmVyc2F0aW9uWydmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJ107XG4gICAgICAgICAgLy8gSXQnZCBiZSBuaWNlIHRvIGRvIHRoaXMgd2l0aCBhbiBhc3NlcnQsIGJ1dCBDaGFpIGRvZXNuJ3QgdW5kZXJzdGFuZCBpdC5cbiAgICAgICAgICBpZiAoY2FsbD8uY2FsbE1vZGUgIT09IENhbGxNb2RlLkdyb3VwKSB7XG4gICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ0V4cGVjdGVkIHRvIGZpbmQgYSBncm91cCBjYWxsJyk7XG4gICAgICAgICAgfVxuXG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNhbGwucmluZ0lkLCBCaWdJbnQoOTg3KSk7XG4gICAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGNhbGwucmluZ2VyVXVpZCwgcmluZ2VyVXVpZCk7XG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3RhcnRDYWxsJywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzdGFydENhbGwgfSA9IGFjdGlvbnM7XG5cbiAgICAgIGJlZm9yZUVhY2goZnVuY3Rpb24gYmVmb3JlRWFjaCgpIHtcbiAgICAgICAgdGhpcy5jYWxsaW5nU3RhcnRPdXRnb2luZ0RpcmVjdENhbGwgPSB0aGlzLnNhbmRib3guc3R1YihcbiAgICAgICAgICBjYWxsaW5nU2VydmljZSxcbiAgICAgICAgICAnc3RhcnRPdXRnb2luZ0RpcmVjdENhbGwnXG4gICAgICAgICk7XG4gICAgICAgIHRoaXMuY2FsbGluZ0pvaW5Hcm91cENhbGwgPSB0aGlzLnNhbmRib3hcbiAgICAgICAgICAuc3R1YihjYWxsaW5nU2VydmljZSwgJ2pvaW5Hcm91cENhbGwnKVxuICAgICAgICAgIC5yZXNvbHZlcygpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhc2tzIHRoZSBjYWxsaW5nIHNlcnZpY2UgdG8gc3RhcnQgYW4gb3V0Z29pbmcgZGlyZWN0IGNhbGwnLCBhc3luYyBmdW5jdGlvbiB0ZXN0KCkge1xuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuICAgICAgICBhd2FpdCBzdGFydENhbGwoe1xuICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICcxMjMnLFxuICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgaGFzTG9jYWxWaWRlbzogZmFsc2UsXG4gICAgICAgIH0pKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5jYWxsaW5nU3RhcnRPdXRnb2luZ0RpcmVjdENhbGwpO1xuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChcbiAgICAgICAgICB0aGlzLmNhbGxpbmdTdGFydE91dGdvaW5nRGlyZWN0Q2FsbCxcbiAgICAgICAgICAnMTIzJyxcbiAgICAgICAgICB0cnVlLFxuICAgICAgICAgIGZhbHNlXG4gICAgICAgICk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZCh0aGlzLmNhbGxpbmdKb2luR3JvdXBDYWxsKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYXNrcyB0aGUgY2FsbGluZyBzZXJ2aWNlIHRvIGpvaW4gYSBncm91cCBjYWxsJywgYXN5bmMgZnVuY3Rpb24gdGVzdCgpIHtcbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgICAgYXdhaXQgc3RhcnRDYWxsKHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICcxMjMnLFxuICAgICAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICAgICAgaGFzTG9jYWxWaWRlbzogZmFsc2UsXG4gICAgICAgIH0pKGRpc3BhdGNoLCBnZXRFbXB0eVJvb3RTdGF0ZSwgbnVsbCk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UodGhpcy5jYWxsaW5nSm9pbkdyb3VwQ2FsbCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKHRoaXMuY2FsbGluZ0pvaW5Hcm91cENhbGwsICcxMjMnLCB0cnVlLCBmYWxzZSk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0Lm5vdENhbGxlZCh0aGlzLmNhbGxpbmdTdGFydE91dGdvaW5nRGlyZWN0Q2FsbCk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NhdmVzIGRpcmVjdCBjYWxscyBhbmQgbWFrZXMgdGhlbSBhY3RpdmUnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICAgIGF3YWl0IHN0YXJ0Q2FsbCh7XG4gICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgICB9KShkaXNwYXRjaCwgZ2V0RW1wdHlSb290U3RhdGUsIG51bGwpO1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBkaXNwYXRjaC5nZXRDYWxsKDApLmFyZ3NbMF07XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihnZXRFbXB0eVN0YXRlKCksIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY2FsbHNCeUNvbnZlcnNhdGlvblsnZmFrZS1jb252ZXJzYXRpb24taWQnXSwge1xuICAgICAgICAgIGNhbGxNb2RlOiBDYWxsTW9kZS5EaXJlY3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWNvbnZlcnNhdGlvbi1pZCcsXG4gICAgICAgICAgY2FsbFN0YXRlOiBDYWxsU3RhdGUuUHJlcmluZyxcbiAgICAgICAgICBpc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgICBpc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgIH0pO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5hY3RpdmVDYWxsU3RhdGUsIHtcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgICAgICB2aWV3TW9kZTogQ2FsbFZpZXdNb2RlLkdyaWQsXG4gICAgICAgICAgc2hvd1BhcnRpY2lwYW50c0xpc3Q6IGZhbHNlLFxuICAgICAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICAgICAgcGlwOiBmYWxzZSxcbiAgICAgICAgICBzZXR0aW5nc0RpYWxvZ09wZW46IGZhbHNlLFxuICAgICAgICAgIG91dGdvaW5nUmluZzogdHJ1ZSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJkb2Vzbid0IGRpc3BhdGNoIGFueSBhY3Rpb25zIGZvciBncm91cCBjYWxsc1wiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG4gICAgICAgIHN0YXJ0Q2FsbCh7XG4gICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkdyb3VwLFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnMTIzJyxcbiAgICAgICAgICBoYXNMb2NhbEF1ZGlvOiB0cnVlLFxuICAgICAgICAgIGhhc0xvY2FsVmlkZW86IGZhbHNlLFxuICAgICAgICB9KShkaXNwYXRjaCwgZ2V0RW1wdHlSb290U3RhdGUsIG51bGwpO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5ub3RDYWxsZWQoZGlzcGF0Y2gpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlU2V0dGluZ3MnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHRvZ2dsZVNldHRpbmdzIH0gPSBhY3Rpb25zO1xuXG4gICAgICBpdCgndG9nZ2xlcyB0aGUgc2V0dGluZ3MgZGlhbG9nJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhZnRlck9uZVRvZ2dsZSA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGVXaXRoQWN0aXZlRGlyZWN0Q2FsbCxcbiAgICAgICAgICB0b2dnbGVTZXR0aW5ncygpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGFmdGVyVHdvVG9nZ2xlcyA9IHJlZHVjZXIoYWZ0ZXJPbmVUb2dnbGUsIHRvZ2dsZVNldHRpbmdzKCkpO1xuICAgICAgICBjb25zdCBhZnRlclRocmVlVG9nZ2xlcyA9IHJlZHVjZXIoYWZ0ZXJUd29Ub2dnbGVzLCB0b2dnbGVTZXR0aW5ncygpKTtcblxuICAgICAgICBhc3NlcnQuaXNUcnVlKGFmdGVyT25lVG9nZ2xlLmFjdGl2ZUNhbGxTdGF0ZT8uc2V0dGluZ3NEaWFsb2dPcGVuKTtcbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UoYWZ0ZXJUd29Ub2dnbGVzLmFjdGl2ZUNhbGxTdGF0ZT8uc2V0dGluZ3NEaWFsb2dPcGVuKTtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShhZnRlclRocmVlVG9nZ2xlcy5hY3RpdmVDYWxsU3RhdGU/LnNldHRpbmdzRGlhbG9nT3Blbik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0b2dnbGVQYXJ0aWNpcGFudHMnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHRvZ2dsZVBhcnRpY2lwYW50cyB9ID0gYWN0aW9ucztcblxuICAgICAgaXQoJ3RvZ2dsZXMgdGhlIHBhcnRpY2lwYW50cyBsaXN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhZnRlck9uZVRvZ2dsZSA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGVXaXRoQWN0aXZlRGlyZWN0Q2FsbCxcbiAgICAgICAgICB0b2dnbGVQYXJ0aWNpcGFudHMoKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhZnRlclR3b1RvZ2dsZXMgPSByZWR1Y2VyKGFmdGVyT25lVG9nZ2xlLCB0b2dnbGVQYXJ0aWNpcGFudHMoKSk7XG4gICAgICAgIGNvbnN0IGFmdGVyVGhyZWVUb2dnbGVzID0gcmVkdWNlcihcbiAgICAgICAgICBhZnRlclR3b1RvZ2dsZXMsXG4gICAgICAgICAgdG9nZ2xlUGFydGljaXBhbnRzKClcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuaXNUcnVlKGFmdGVyT25lVG9nZ2xlLmFjdGl2ZUNhbGxTdGF0ZT8uc2hvd1BhcnRpY2lwYW50c0xpc3QpO1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShhZnRlclR3b1RvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy5zaG93UGFydGljaXBhbnRzTGlzdCk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoYWZ0ZXJUaHJlZVRvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy5zaG93UGFydGljaXBhbnRzTGlzdCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCd0b2dnbGVQaXAnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHRvZ2dsZVBpcCB9ID0gYWN0aW9ucztcblxuICAgICAgaXQoJ3RvZ2dsZXMgdGhlIFBpUCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWZ0ZXJPbmVUb2dnbGUgPSByZWR1Y2VyKHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwsIHRvZ2dsZVBpcCgpKTtcbiAgICAgICAgY29uc3QgYWZ0ZXJUd29Ub2dnbGVzID0gcmVkdWNlcihhZnRlck9uZVRvZ2dsZSwgdG9nZ2xlUGlwKCkpO1xuICAgICAgICBjb25zdCBhZnRlclRocmVlVG9nZ2xlcyA9IHJlZHVjZXIoYWZ0ZXJUd29Ub2dnbGVzLCB0b2dnbGVQaXAoKSk7XG5cbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShhZnRlck9uZVRvZ2dsZS5hY3RpdmVDYWxsU3RhdGU/LnBpcCk7XG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKGFmdGVyVHdvVG9nZ2xlcy5hY3RpdmVDYWxsU3RhdGU/LnBpcCk7XG4gICAgICAgIGFzc2VydC5pc1RydWUoYWZ0ZXJUaHJlZVRvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy5waXApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgndG9nZ2xlU3BlYWtlclZpZXcnLCAoKSA9PiB7XG4gICAgICBjb25zdCB7IHRvZ2dsZVNwZWFrZXJWaWV3IH0gPSBhY3Rpb25zO1xuXG4gICAgICBpdCgndG9nZ2xlcyBzcGVha2VyIHZpZXcgZnJvbSBncmlkIHZpZXcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFmdGVyT25lVG9nZ2xlID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZVdpdGhBY3RpdmVHcm91cENhbGwsXG4gICAgICAgICAgdG9nZ2xlU3BlYWtlclZpZXcoKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhZnRlclR3b1RvZ2dsZXMgPSByZWR1Y2VyKGFmdGVyT25lVG9nZ2xlLCB0b2dnbGVTcGVha2VyVmlldygpKTtcbiAgICAgICAgY29uc3QgYWZ0ZXJUaHJlZVRvZ2dsZXMgPSByZWR1Y2VyKGFmdGVyVHdvVG9nZ2xlcywgdG9nZ2xlU3BlYWtlclZpZXcoKSk7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGFmdGVyT25lVG9nZ2xlLmFjdGl2ZUNhbGxTdGF0ZT8udmlld01vZGUsXG4gICAgICAgICAgQ2FsbFZpZXdNb2RlLlNwZWFrZXJcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGFmdGVyVHdvVG9nZ2xlcy5hY3RpdmVDYWxsU3RhdGU/LnZpZXdNb2RlLFxuICAgICAgICAgIENhbGxWaWV3TW9kZS5HcmlkXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBhZnRlclRocmVlVG9nZ2xlcy5hY3RpdmVDYWxsU3RhdGU/LnZpZXdNb2RlLFxuICAgICAgICAgIENhbGxWaWV3TW9kZS5TcGVha2VyXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3RvZ2dsZXMgc3BlYWtlciB2aWV3IGZyb20gcHJlc2VudGF0aW9uIHZpZXcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFmdGVyT25lVG9nZ2xlID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZVdpdGhBY3RpdmVQcmVzZW50YXRpb25WaWV3R3JvdXBDYWxsLFxuICAgICAgICAgIHRvZ2dsZVNwZWFrZXJWaWV3KClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgYWZ0ZXJUd29Ub2dnbGVzID0gcmVkdWNlcihhZnRlck9uZVRvZ2dsZSwgdG9nZ2xlU3BlYWtlclZpZXcoKSk7XG4gICAgICAgIGNvbnN0IGFmdGVyVGhyZWVUb2dnbGVzID0gcmVkdWNlcihhZnRlclR3b1RvZ2dsZXMsIHRvZ2dsZVNwZWFrZXJWaWV3KCkpO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBhZnRlck9uZVRvZ2dsZS5hY3RpdmVDYWxsU3RhdGU/LnZpZXdNb2RlLFxuICAgICAgICAgIENhbGxWaWV3TW9kZS5HcmlkXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBhZnRlclR3b1RvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy52aWV3TW9kZSxcbiAgICAgICAgICBDYWxsVmlld01vZGUuU3BlYWtlclxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgYWZ0ZXJUaHJlZVRvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy52aWV3TW9kZSxcbiAgICAgICAgICBDYWxsVmlld01vZGUuR3JpZFxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3JywgKCkgPT4ge1xuICAgICAgY29uc3QgeyBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXcsIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3IH0gPSBhY3Rpb25zO1xuXG4gICAgICBpdCgndG9nZ2xlcyBwcmVzZW50YXRpb24gdmlldyBmcm9tIGdyaWQgdmlldycsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWZ0ZXJPbmVUb2dnbGUgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlV2l0aEFjdGl2ZUdyb3VwQ2FsbCxcbiAgICAgICAgICBzd2l0Y2hUb1ByZXNlbnRhdGlvblZpZXcoKVxuICAgICAgICApO1xuICAgICAgICBjb25zdCBhZnRlclR3b1RvZ2dsZXMgPSByZWR1Y2VyKFxuICAgICAgICAgIGFmdGVyT25lVG9nZ2xlLFxuICAgICAgICAgIHN3aXRjaFRvUHJlc2VudGF0aW9uVmlldygpXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IGZpbmFsU3RhdGUgPSByZWR1Y2VyKFxuICAgICAgICAgIGFmdGVyT25lVG9nZ2xlLFxuICAgICAgICAgIHN3aXRjaEZyb21QcmVzZW50YXRpb25WaWV3KClcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgYWZ0ZXJPbmVUb2dnbGUuYWN0aXZlQ2FsbFN0YXRlPy52aWV3TW9kZSxcbiAgICAgICAgICBDYWxsVmlld01vZGUuUHJlc2VudGF0aW9uXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBhZnRlclR3b1RvZ2dsZXMuYWN0aXZlQ2FsbFN0YXRlPy52aWV3TW9kZSxcbiAgICAgICAgICBDYWxsVmlld01vZGUuUHJlc2VudGF0aW9uXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBmaW5hbFN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8udmlld01vZGUsXG4gICAgICAgICAgQ2FsbFZpZXdNb2RlLkdyaWRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3QgdG9nZ2xlIHByZXNlbnRhdGlvbiB2aWV3IGZyb20gc3BlYWtlciB2aWV3JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhZnRlck9uZVRvZ2dsZSA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGVXaXRoQWN0aXZlU3BlYWtlclZpZXdHcm91cENhbGwsXG4gICAgICAgICAgc3dpdGNoVG9QcmVzZW50YXRpb25WaWV3KClcbiAgICAgICAgKTtcbiAgICAgICAgY29uc3QgZmluYWxTdGF0ZSA9IHJlZHVjZXIoXG4gICAgICAgICAgYWZ0ZXJPbmVUb2dnbGUsXG4gICAgICAgICAgc3dpdGNoRnJvbVByZXNlbnRhdGlvblZpZXcoKVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBhZnRlck9uZVRvZ2dsZS5hY3RpdmVDYWxsU3RhdGU/LnZpZXdNb2RlLFxuICAgICAgICAgIENhbGxWaWV3TW9kZS5TcGVha2VyXG4gICAgICAgICk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBmaW5hbFN0YXRlLmFjdGl2ZUNhbGxTdGF0ZT8udmlld01vZGUsXG4gICAgICAgICAgQ2FsbFZpZXdNb2RlLlNwZWFrZXJcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaGVscGVycycsICgpID0+IHtcbiAgICBkZXNjcmliZSgnZ2V0QWN0aXZlQ2FsbCcsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBhcmUgbm8gY2FsbHMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRBY3RpdmVDYWxsKGdldEVtcHR5U3RhdGUoKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBubyBhY3RpdmUgY2FsbCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGdldEFjdGl2ZUNhbGwoc3RhdGVXaXRoRGlyZWN0Q2FsbCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRoZSBhY3RpdmUgY2FsbCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChnZXRBY3RpdmVDYWxsKHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwpLCB7XG4gICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgICBjYWxsU3RhdGU6IENhbGxTdGF0ZS5BY2NlcHRlZCxcbiAgICAgICAgICBpc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgICBpc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgICAgaGFzUmVtb3RlVmlkZW86IGZhbHNlLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2lzQW55Ym9keUVsc2VJbkdyb3VwQ2FsbCcsICgpID0+IHtcbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIHdpdGggbm8gcGVlayBpbmZvJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwodW5kZWZpbmVkLCByZW1vdGVVdWlkKSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgZmFsc2UgaWYgdGhlIHBlZWsgaW5mbyBoYXMgbm8gcGFydGljaXBhbnRzJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwoeyB1dWlkczogW10gfSwgcmVtb3RlVXVpZCkpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIGZhbHNlIGlmIHRoZSBwZWVrIGluZm8gaGFzIG9uZSBwYXJ0aWNpcGFudCwgeW91JywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNGYWxzZShcbiAgICAgICAgICBpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwoeyB1dWlkczogW2NyZWF0b3JVdWlkXSB9LCBjcmVhdG9yVXVpZClcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyB0cnVlIGlmIHRoZSBwZWVrIGluZm8gaGFzIG9uZSBwYXJ0aWNpcGFudCwgc29tZW9uZSBlbHNlJywgKCkgPT4ge1xuICAgICAgICBhc3NlcnQuaXNUcnVlKFxuICAgICAgICAgIGlzQW55Ym9keUVsc2VJbkdyb3VwQ2FsbCh7IHV1aWRzOiBbY3JlYXRvclV1aWRdIH0sIHJlbW90ZVV1aWQpXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgdHJ1ZSBpZiB0aGUgcGVlayBpbmZvIGhhcyB0d28gcGFydGljaXBhbnRzLCB5b3UgYW5kIHNvbWVvbmUgZWxzZScsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVHJ1ZShcbiAgICAgICAgICBpc0FueWJvZHlFbHNlSW5Hcm91cENhbGwoXG4gICAgICAgICAgICB7IHV1aWRzOiBbY3JlYXRvclV1aWQsIHJlbW90ZVV1aWRdIH0sXG4gICAgICAgICAgICByZW1vdGVVdWlkXG4gICAgICAgICAgKVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLG9CQUFnQztBQUVoQyxxQkFBdUM7QUFDdkMsa0JBQTJCO0FBSzNCLHFCQU1PO0FBQ1AsZ0NBQW1DO0FBQ25DLHNCQUEwQztBQUMxQyxxQkFNTztBQUNQLGtCQUFxQjtBQUNyQixvQ0FBdUM7QUFHdkMsU0FBUyxnQkFBZ0IsTUFBTTtBQUM3QixRQUFNLHNCQUF3QztBQUFBLE9BQ3pDLGtDQUFjO0FBQUEsSUFDakIscUJBQXFCO0FBQUEsTUFDbkIsb0NBQW9DO0FBQUEsUUFDbEMsVUFBVSx3QkFBUztBQUFBLFFBQ25CLGdCQUFnQjtBQUFBLFFBQ2hCLFdBQVcseUJBQVU7QUFBQSxRQUNyQixZQUFZO0FBQUEsUUFDWixhQUFhO0FBQUEsUUFDYixnQkFB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
