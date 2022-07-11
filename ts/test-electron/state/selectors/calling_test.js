var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
var import_chai = require("chai");
var import_reducer = require("../../../state/reducer");
var import_noop = require("../../../state/ducks/noop");
var import_Calling = require("../../../types/Calling");
var import_calling = require("../../../state/selectors/calling");
var import_calling2 = require("../../../state/ducks/calling");
describe("state/selectors/calling", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)()), "getEmptyRootState");
  const getCallingState = /* @__PURE__ */ __name((calling) => ({
    ...getEmptyRootState(),
    calling
  }), "getCallingState");
  const stateWithDirectCall = {
    ...(0, import_calling2.getEmptyState)(),
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
  const incomingDirectCall = {
    callMode: import_Calling.CallMode.Direct,
    conversationId: "fake-direct-call-conversation-id",
    callState: import_Calling.CallState.Ringing,
    isIncoming: true,
    isVideoCall: false,
    hasRemoteVideo: false
  };
  const stateWithIncomingDirectCall = {
    ...(0, import_calling2.getEmptyState)(),
    callsByConversation: {
      "fake-direct-call-conversation-id": incomingDirectCall
    }
  };
  const incomingGroupCall = {
    callMode: import_Calling.CallMode.Group,
    conversationId: "fake-group-call-conversation-id",
    connectionState: import_Calling.GroupCallConnectionState.NotConnected,
    joinState: import_Calling.GroupCallJoinState.NotJoined,
    peekInfo: {
      uuids: ["c75b51da-d484-4674-9b2c-cc11de00e227"],
      creatorUuid: "c75b51da-d484-4674-9b2c-cc11de00e227",
      maxDevices: Infinity,
      deviceCount: 1
    },
    remoteParticipants: [],
    ringId: BigInt(123),
    ringerUuid: "c75b51da-d484-4674-9b2c-cc11de00e227"
  };
  const stateWithIncomingGroupCall = {
    ...(0, import_calling2.getEmptyState)(),
    callsByConversation: {
      "fake-group-call-conversation-id": incomingGroupCall
    }
  };
  describe("getCallsByConversation", () => {
    it("returns state.calling.callsByConversation", () => {
      import_chai.assert.deepEqual((0, import_calling.getCallsByConversation)(getEmptyRootState()), {});
      import_chai.assert.deepEqual((0, import_calling.getCallsByConversation)(getCallingState(stateWithDirectCall)), {
        "fake-direct-call-conversation-id": {
          callMode: import_Calling.CallMode.Direct,
          conversationId: "fake-direct-call-conversation-id",
          callState: import_Calling.CallState.Accepted,
          isIncoming: false,
          isVideoCall: false,
          hasRemoteVideo: false
        }
      });
    });
  });
  describe("getCallSelector", () => {
    it("returns a selector that returns undefined if selecting a conversation with no call", () => {
      import_chai.assert.isUndefined((0, import_calling.getCallSelector)(getEmptyRootState())("conversation-id"));
    });
    it("returns a selector that returns a conversation's call", () => {
      import_chai.assert.deepEqual((0, import_calling.getCallSelector)(getCallingState(stateWithDirectCall))("fake-direct-call-conversation-id"), {
        callMode: import_Calling.CallMode.Direct,
        conversationId: "fake-direct-call-conversation-id",
        callState: import_Calling.CallState.Accepted,
        isIncoming: false,
        isVideoCall: false,
        hasRemoteVideo: false
      });
    });
  });
  describe("getIncomingCall", () => {
    it("returns undefined if there are no calls", () => {
      import_chai.assert.isUndefined((0, import_calling.getIncomingCall)(getEmptyRootState()));
    });
    it("returns undefined if there is no incoming call", () => {
      import_chai.assert.isUndefined((0, import_calling.getIncomingCall)(getCallingState(stateWithDirectCall)));
      import_chai.assert.isUndefined((0, import_calling.getIncomingCall)(getCallingState(stateWithActiveDirectCall)));
    });
    it("returns undefined if there is a group call with no peeked participants", () => {
      const state = {
        ...stateWithIncomingGroupCall,
        callsByConversation: {
          "fake-group-call-conversation-id": {
            ...incomingGroupCall,
            peekInfo: {
              uuids: [],
              maxDevices: Infinity,
              deviceCount: 1
            }
          }
        }
      };
      import_chai.assert.isUndefined((0, import_calling.getIncomingCall)(getCallingState(state)));
    });
    it("returns an incoming direct call", () => {
      import_chai.assert.deepEqual((0, import_calling.getIncomingCall)(getCallingState(stateWithIncomingDirectCall)), incomingDirectCall);
    });
    it("returns an incoming group call", () => {
      import_chai.assert.deepEqual((0, import_calling.getIncomingCall)(getCallingState(stateWithIncomingGroupCall)), incomingGroupCall);
    });
  });
  describe("isInCall", () => {
    it("returns should be false if we are not in a call", () => {
      import_chai.assert.isFalse((0, import_calling.isInCall)(getEmptyRootState()));
    });
    it("should be true if we are in a call", () => {
      import_chai.assert.isTrue((0, import_calling.isInCall)(getCallingState(stateWithActiveDirectCall)));
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY2FsbGluZ190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAxOS0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvcmVkdWNlcic7XG5pbXBvcnQgeyBub29wQWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3Mvbm9vcCc7XG5pbXBvcnQge1xuICBDYWxsTW9kZSxcbiAgQ2FsbFN0YXRlLFxuICBDYWxsVmlld01vZGUsXG4gIEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZSxcbiAgR3JvdXBDYWxsSm9pblN0YXRlLFxufSBmcm9tICcuLi8uLi8uLi90eXBlcy9DYWxsaW5nJztcbmltcG9ydCB7XG4gIGdldENhbGxzQnlDb252ZXJzYXRpb24sXG4gIGdldENhbGxTZWxlY3RvcixcbiAgZ2V0SW5jb21pbmdDYWxsLFxuICBpc0luQ2FsbCxcbn0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvc2VsZWN0b3JzL2NhbGxpbmcnO1xuaW1wb3J0IHR5cGUge1xuICBDYWxsaW5nU3RhdGVUeXBlLFxuICBEaXJlY3RDYWxsU3RhdGVUeXBlLFxuICBHcm91cENhbGxTdGF0ZVR5cGUsXG59IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NhbGxpbmcnO1xuaW1wb3J0IHsgZ2V0RW1wdHlTdGF0ZSB9IGZyb20gJy4uLy4uLy4uL3N0YXRlL2R1Y2tzL2NhbGxpbmcnO1xuXG5kZXNjcmliZSgnc3RhdGUvc2VsZWN0b3JzL2NhbGxpbmcnLCAoKSA9PiB7XG4gIGNvbnN0IGdldEVtcHR5Um9vdFN0YXRlID0gKCkgPT4gcm9vdFJlZHVjZXIodW5kZWZpbmVkLCBub29wQWN0aW9uKCkpO1xuXG4gIGNvbnN0IGdldENhbGxpbmdTdGF0ZSA9IChjYWxsaW5nOiBDYWxsaW5nU3RhdGVUeXBlKSA9PiAoe1xuICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgY2FsbGluZyxcbiAgfSk7XG5cbiAgY29uc3Qgc3RhdGVXaXRoRGlyZWN0Q2FsbDogQ2FsbGluZ1N0YXRlVHlwZSA9IHtcbiAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgICAgY2FsbFN0YXRlOiBDYWxsU3RhdGUuQWNjZXB0ZWQsXG4gICAgICAgIGlzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICBpc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgICAgIGhhc1JlbW90ZVZpZGVvOiBmYWxzZSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcblxuICBjb25zdCBzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsOiBDYWxsaW5nU3RhdGVUeXBlID0ge1xuICAgIC4uLnN0YXRlV2l0aERpcmVjdENhbGwsXG4gICAgYWN0aXZlQ2FsbFN0YXRlOiB7XG4gICAgICBjb252ZXJzYXRpb25JZDogJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICAgIGhhc0xvY2FsQXVkaW86IHRydWUsXG4gICAgICBoYXNMb2NhbFZpZGVvOiBmYWxzZSxcbiAgICAgIGxvY2FsQXVkaW9MZXZlbDogMCxcbiAgICAgIHZpZXdNb2RlOiBDYWxsVmlld01vZGUuR3JpZCxcbiAgICAgIHNob3dQYXJ0aWNpcGFudHNMaXN0OiBmYWxzZSxcbiAgICAgIHNhZmV0eU51bWJlckNoYW5nZWRVdWlkczogW10sXG4gICAgICBvdXRnb2luZ1Jpbmc6IHRydWUsXG4gICAgICBwaXA6IGZhbHNlLFxuICAgICAgc2V0dGluZ3NEaWFsb2dPcGVuOiBmYWxzZSxcbiAgICB9LFxuICB9O1xuXG4gIGNvbnN0IGluY29taW5nRGlyZWN0Q2FsbDogRGlyZWN0Q2FsbFN0YXRlVHlwZSA9IHtcbiAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLlJpbmdpbmcsXG4gICAgaXNJbmNvbWluZzogdHJ1ZSxcbiAgICBpc1ZpZGVvQ2FsbDogZmFsc2UsXG4gICAgaGFzUmVtb3RlVmlkZW86IGZhbHNlLFxuICB9O1xuXG4gIGNvbnN0IHN0YXRlV2l0aEluY29taW5nRGlyZWN0Q2FsbDogQ2FsbGluZ1N0YXRlVHlwZSA9IHtcbiAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgY2FsbHNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJzogaW5jb21pbmdEaXJlY3RDYWxsLFxuICAgIH0sXG4gIH07XG5cbiAgY29uc3QgaW5jb21pbmdHcm91cENhbGw6IEdyb3VwQ2FsbFN0YXRlVHlwZSA9IHtcbiAgICBjYWxsTW9kZTogQ2FsbE1vZGUuR3JvdXAsXG4gICAgY29udmVyc2F0aW9uSWQ6ICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJyxcbiAgICBjb25uZWN0aW9uU3RhdGU6IEdyb3VwQ2FsbENvbm5lY3Rpb25TdGF0ZS5Ob3RDb25uZWN0ZWQsXG4gICAgam9pblN0YXRlOiBHcm91cENhbGxKb2luU3RhdGUuTm90Sm9pbmVkLFxuICAgIHBlZWtJbmZvOiB7XG4gICAgICB1dWlkczogWydjNzViNTFkYS1kNDg0LTQ2NzQtOWIyYy1jYzExZGUwMGUyMjcnXSxcbiAgICAgIGNyZWF0b3JVdWlkOiAnYzc1YjUxZGEtZDQ4NC00Njc0LTliMmMtY2MxMWRlMDBlMjI3JyxcbiAgICAgIG1heERldmljZXM6IEluZmluaXR5LFxuICAgICAgZGV2aWNlQ291bnQ6IDEsXG4gICAgfSxcbiAgICByZW1vdGVQYXJ0aWNpcGFudHM6IFtdLFxuICAgIHJpbmdJZDogQmlnSW50KDEyMyksXG4gICAgcmluZ2VyVXVpZDogJ2M3NWI1MWRhLWQ0ODQtNDY3NC05YjJjLWNjMTFkZTAwZTIyNycsXG4gIH07XG5cbiAgY29uc3Qgc3RhdGVXaXRoSW5jb21pbmdHcm91cENhbGw6IENhbGxpbmdTdGF0ZVR5cGUgPSB7XG4gICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgIGNhbGxzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICdmYWtlLWdyb3VwLWNhbGwtY29udmVyc2F0aW9uLWlkJzogaW5jb21pbmdHcm91cENhbGwsXG4gICAgfSxcbiAgfTtcblxuICBkZXNjcmliZSgnZ2V0Q2FsbHNCeUNvbnZlcnNhdGlvbicsICgpID0+IHtcbiAgICBpdCgncmV0dXJucyBzdGF0ZS5jYWxsaW5nLmNhbGxzQnlDb252ZXJzYXRpb24nLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKGdldENhbGxzQnlDb252ZXJzYXRpb24oZ2V0RW1wdHlSb290U3RhdGUoKSksIHt9KTtcblxuICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgZ2V0Q2FsbHNCeUNvbnZlcnNhdGlvbihnZXRDYWxsaW5nU3RhdGUoc3RhdGVXaXRoRGlyZWN0Q2FsbCkpLFxuICAgICAgICB7XG4gICAgICAgICAgJ2Zha2UtZGlyZWN0LWNhbGwtY29udmVyc2F0aW9uLWlkJzoge1xuICAgICAgICAgICAgY2FsbE1vZGU6IENhbGxNb2RlLkRpcmVjdCxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgY2FsbFN0YXRlOiBDYWxsU3RhdGUuQWNjZXB0ZWQsXG4gICAgICAgICAgICBpc0luY29taW5nOiBmYWxzZSxcbiAgICAgICAgICAgIGlzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgICAgIGhhc1JlbW90ZVZpZGVvOiBmYWxzZSxcbiAgICAgICAgICB9LFxuICAgICAgICB9XG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnZ2V0Q2FsbFNlbGVjdG9yJywgKCkgPT4ge1xuICAgIGl0KCdyZXR1cm5zIGEgc2VsZWN0b3IgdGhhdCByZXR1cm5zIHVuZGVmaW5lZCBpZiBzZWxlY3RpbmcgYSBjb252ZXJzYXRpb24gd2l0aCBubyBjYWxsJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICBnZXRDYWxsU2VsZWN0b3IoZ2V0RW1wdHlSb290U3RhdGUoKSkoJ2NvbnZlcnNhdGlvbi1pZCcpXG4gICAgICApO1xuICAgIH0pO1xuXG4gICAgaXQoXCJyZXR1cm5zIGEgc2VsZWN0b3IgdGhhdCByZXR1cm5zIGEgY29udmVyc2F0aW9uJ3MgY2FsbFwiLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBnZXRDYWxsU2VsZWN0b3IoZ2V0Q2FsbGluZ1N0YXRlKHN0YXRlV2l0aERpcmVjdENhbGwpKShcbiAgICAgICAgICAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnXG4gICAgICAgICksXG4gICAgICAgIHtcbiAgICAgICAgICBjYWxsTW9kZTogQ2FsbE1vZGUuRGlyZWN0LFxuICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1kaXJlY3QtY2FsbC1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIGNhbGxTdGF0ZTogQ2FsbFN0YXRlLkFjY2VwdGVkLFxuICAgICAgICAgIGlzSW5jb21pbmc6IGZhbHNlLFxuICAgICAgICAgIGlzVmlkZW9DYWxsOiBmYWxzZSxcbiAgICAgICAgICBoYXNSZW1vdGVWaWRlbzogZmFsc2UsXG4gICAgICAgIH1cbiAgICAgICk7XG4gICAgfSk7XG4gIH0pO1xuXG4gIGRlc2NyaWJlKCdnZXRJbmNvbWluZ0NhbGwnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGFyZSBubyBjYWxscycsICgpID0+IHtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChnZXRJbmNvbWluZ0NhbGwoZ2V0RW1wdHlSb290U3RhdGUoKSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3JldHVybnMgdW5kZWZpbmVkIGlmIHRoZXJlIGlzIG5vIGluY29taW5nIGNhbGwnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoZ2V0SW5jb21pbmdDYWxsKGdldENhbGxpbmdTdGF0ZShzdGF0ZVdpdGhEaXJlY3RDYWxsKSkpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKFxuICAgICAgICBnZXRJbmNvbWluZ0NhbGwoZ2V0Q2FsbGluZ1N0YXRlKHN0YXRlV2l0aEFjdGl2ZURpcmVjdENhbGwpKVxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIHVuZGVmaW5lZCBpZiB0aGVyZSBpcyBhIGdyb3VwIGNhbGwgd2l0aCBubyBwZWVrZWQgcGFydGljaXBhbnRzJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgIC4uLnN0YXRlV2l0aEluY29taW5nR3JvdXBDYWxsLFxuICAgICAgICBjYWxsc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgJ2Zha2UtZ3JvdXAtY2FsbC1jb252ZXJzYXRpb24taWQnOiB7XG4gICAgICAgICAgICAuLi5pbmNvbWluZ0dyb3VwQ2FsbCxcbiAgICAgICAgICAgIHBlZWtJbmZvOiB7XG4gICAgICAgICAgICAgIHV1aWRzOiBbXSxcbiAgICAgICAgICAgICAgbWF4RGV2aWNlczogSW5maW5pdHksXG4gICAgICAgICAgICAgIGRldmljZUNvdW50OiAxLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGdldEluY29taW5nQ2FsbChnZXRDYWxsaW5nU3RhdGUoc3RhdGUpKSk7XG4gICAgfSk7XG5cbiAgICBpdCgncmV0dXJucyBhbiBpbmNvbWluZyBkaXJlY3QgY2FsbCcsICgpID0+IHtcbiAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgIGdldEluY29taW5nQ2FsbChnZXRDYWxsaW5nU3RhdGUoc3RhdGVXaXRoSW5jb21pbmdEaXJlY3RDYWxsKSksXG4gICAgICAgIGluY29taW5nRGlyZWN0Q2FsbFxuICAgICAgKTtcbiAgICB9KTtcblxuICAgIGl0KCdyZXR1cm5zIGFuIGluY29taW5nIGdyb3VwIGNhbGwnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICBnZXRJbmNvbWluZ0NhbGwoZ2V0Q2FsbGluZ1N0YXRlKHN0YXRlV2l0aEluY29taW5nR3JvdXBDYWxsKSksXG4gICAgICAgIGluY29taW5nR3JvdXBDYWxsXG4gICAgICApO1xuICAgIH0pO1xuICB9KTtcblxuICBkZXNjcmliZSgnaXNJbkNhbGwnLCAoKSA9PiB7XG4gICAgaXQoJ3JldHVybnMgc2hvdWxkIGJlIGZhbHNlIGlmIHdlIGFyZSBub3QgaW4gYSBjYWxsJywgKCkgPT4ge1xuICAgICAgYXNzZXJ0LmlzRmFsc2UoaXNJbkNhbGwoZ2V0RW1wdHlSb290U3RhdGUoKSkpO1xuICAgIH0pO1xuXG4gICAgaXQoJ3Nob3VsZCBiZSB0cnVlIGlmIHdlIGFyZSBpbiBhIGNhbGwnLCAoKSA9PiB7XG4gICAgICBhc3NlcnQuaXNUcnVlKGlzSW5DYWxsKGdldENhbGxpbmdTdGF0ZShzdGF0ZVdpdGhBY3RpdmVEaXJlY3RDYWxsKSkpO1xuICAgIH0pO1xuICB9KTtcbn0pO1xuIl0sCiAgIm1hcHBpbmdzIjogIjs7QUFHQSxrQkFBdUI7QUFDdkIscUJBQXVDO0FBQ3ZDLGtCQUEyQjtBQUMzQixxQkFNTztBQUNQLHFCQUtPO0FBTVAsc0JBQThCO0FBRTlCLFNBQVMsMkJBQTJCLE1BQU07QUFDeEMsUUFBTSxvQkFBb0IsNkJBQU0sNEJBQVksUUFB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
