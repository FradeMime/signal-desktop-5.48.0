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
var import_uuid = require("uuid");
var import_lodash = require("lodash");
var import_reducer = require("../../../state/reducer");
var import_noop = require("../../../state/ducks/noop");
var import_conversationsEnums = require("../../../state/ducks/conversationsEnums");
var import_conversations = require("../../../state/ducks/conversations");
var import_MessageReadStatus = require("../../../messages/MessageReadStatus");
var import_contactSpoofing = require("../../../util/contactSpoofing");
var import_Calling = require("../../../types/Calling");
var import_UUID = require("../../../types/UUID");
var import_getDefaultConversation = require("../../../test-both/helpers/getDefaultConversation");
var import_Avatar = require("../../../types/Avatar");
var import_defaultComposerStates = require("../../../test-both/helpers/defaultComposerStates");
var import_RemoteConfigStub = require("../../../test-both/helpers/RemoteConfigStub");
const {
  clearGroupCreationError,
  clearInvitedUuidsForNewlyCreatedGroup,
  closeContactSpoofingReview,
  closeMaximumGroupSizeModal,
  closeRecommendedGroupSizeModal,
  conversationStoppedByMissingVerification,
  createGroup,
  discardMessages,
  messageChanged,
  repairNewestMessage,
  repairOldestMessage,
  resetAllChatColors,
  reviewGroupMemberNameCollision,
  reviewMessageRequestNameCollision,
  setComposeGroupAvatar,
  setComposeGroupName,
  setComposeSearchTerm,
  setPreJoinConversation,
  showArchivedConversations,
  showChooseGroupMembers,
  showConversation,
  showInbox,
  startComposing,
  startSettingGroupMetadata,
  toggleConversationInChooseMembers
} = import_conversations.actions;
describe("both/state/ducks/conversations", () => {
  const getEmptyRootState = /* @__PURE__ */ __name(() => (0, import_reducer.reducer)(void 0, (0, import_noop.noopAction)()), "getEmptyRootState");
  let sinonSandbox;
  let createGroupStub;
  beforeEach(() => {
    sinonSandbox = sinon.createSandbox();
    sinonSandbox.stub(window.Whisper.events, "trigger");
    createGroupStub = sinon.stub();
  });
  afterEach(() => {
    sinonSandbox.restore();
  });
  describe("helpers", () => {
    describe("getConversationCallMode", () => {
      const fakeConversation = (0, import_getDefaultConversation.getDefaultConversation)();
      it("returns CallMode.None if you've left the conversation", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          left: true
        }), import_Calling.CallMode.None);
      });
      it("returns CallMode.None if you've blocked the other person", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          isBlocked: true
        }), import_Calling.CallMode.None);
      });
      it("returns CallMode.None if you haven't accepted message requests", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          acceptedMessageRequest: false
        }), import_Calling.CallMode.None);
      });
      it("returns CallMode.None if the conversation is Note to Self", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          isMe: true
        }), import_Calling.CallMode.None);
      });
      it("returns CallMode.None for v1 groups", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          type: "group",
          groupVersion: 1,
          sharedGroupNames: []
        }), import_Calling.CallMode.None);
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          type: "group",
          sharedGroupNames: []
        }), import_Calling.CallMode.None);
      });
      it("returns CallMode.Direct if the conversation is a normal direct conversation", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)(fakeConversation), import_Calling.CallMode.Direct);
      });
      it("returns CallMode.Group if the conversation is a v2 group", () => {
        import_chai.assert.strictEqual((0, import_conversations.getConversationCallMode)({
          ...fakeConversation,
          type: "group",
          groupVersion: 2,
          sharedGroupNames: []
        }), import_Calling.CallMode.Group);
      });
    });
    describe("updateConversationLookups", () => {
      it("does not change lookups if no conversations provided", () => {
        const state = (0, import_conversations.getEmptyState)();
        const result = (0, import_conversations.updateConversationLookups)(void 0, void 0, state);
        import_chai.assert.strictEqual(state.conversationsByE164, result.conversationsByE164);
        import_chai.assert.strictEqual(state.conversationsByUuid, result.conversationsByUuid);
        import_chai.assert.strictEqual(state.conversationsByGroupId, result.conversationsByGroupId);
      });
      it("adds and removes e164-only contact", () => {
        const removed = (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id-removed",
          e164: "e164-removed",
          uuid: void 0
        });
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          conversationsByE164: {
            "e164-removed": removed
          }
        };
        const added = (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id-added",
          e164: "e164-added",
          uuid: void 0
        });
        const expected = {
          "e164-added": added
        };
        const actual = (0, import_conversations.updateConversationLookups)(added, removed, state);
        import_chai.assert.deepEqual(actual.conversationsByE164, expected);
        import_chai.assert.strictEqual(state.conversationsByUuid, actual.conversationsByUuid);
        import_chai.assert.strictEqual(state.conversationsByGroupId, actual.conversationsByGroupId);
      });
      it("adds and removes uuid-only contact", () => {
        const removed = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
          id: "id-removed",
          e164: void 0
        });
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          conversationsByuuid: {
            [removed.uuid]: removed
          }
        };
        const added = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
          id: "id-added",
          e164: void 0
        });
        const expected = {
          [added.uuid]: added
        };
        const actual = (0, import_conversations.updateConversationLookups)(added, removed, state);
        import_chai.assert.strictEqual(state.conversationsByE164, actual.conversationsByE164);
        import_chai.assert.deepEqual(actual.conversationsByUuid, expected);
        import_chai.assert.strictEqual(state.conversationsByGroupId, actual.conversationsByGroupId);
      });
      it("adds and removes groupId-only contact", () => {
        const removed = (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id-removed",
          groupId: "groupId-removed",
          e164: void 0,
          uuid: void 0
        });
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          conversationsBygroupId: {
            "groupId-removed": removed
          }
        };
        const added = (0, import_getDefaultConversation.getDefaultConversation)({
          id: "id-added",
          groupId: "groupId-added",
          e164: void 0,
          uuid: void 0
        });
        const expected = {
          "groupId-added": added
        };
        const actual = (0, import_conversations.updateConversationLookups)(added, removed, state);
        import_chai.assert.strictEqual(state.conversationsByE164, actual.conversationsByE164);
        import_chai.assert.strictEqual(state.conversationsByUuid, actual.conversationsByUuid);
        import_chai.assert.deepEqual(actual.conversationsByGroupId, expected);
      });
    });
  });
  describe("reducer", () => {
    const time = Date.now();
    const previousTime = time - 1;
    const conversationId = "conversation-guid-1";
    const messageId = "message-guid-1";
    const messageIdTwo = "message-guid-2";
    const messageIdThree = "message-guid-3";
    const sourceUuid = import_UUID.UUID.generate().toString();
    function getDefaultMessage(id) {
      return {
        attachments: [],
        conversationId,
        id,
        received_at: previousTime,
        sent_at: previousTime,
        source: "source",
        sourceUuid,
        timestamp: previousTime,
        type: "incoming",
        readStatus: import_MessageReadStatus.ReadStatus.Read
      };
    }
    function getDefaultConversationMessage() {
      return {
        messageChangeCounter: 0,
        messageIds: [],
        metrics: {
          totalUnseen: 0
        },
        scrollToMessageCounter: 0
      };
    }
    describe("showConversation", () => {
      it("selects a conversation id", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)()
        };
        const action = showConversation({ conversationId: "abc123" });
        const nextState = (0, import_conversations.reducer)(state, action);
        import_chai.assert.equal(nextState.selectedConversationId, "abc123");
        import_chai.assert.isUndefined(nextState.selectedMessage);
      });
      it("selects a conversation and a message", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)()
        };
        const action = showConversation({
          conversationId: "abc123",
          messageId: "xyz987"
        });
        const nextState = (0, import_conversations.reducer)(state, action);
        import_chai.assert.equal(nextState.selectedConversationId, "abc123");
        import_chai.assert.equal(nextState.selectedMessage, "xyz987");
      });
      describe("showConversation switchToAssociatedView=true", () => {
        let action;
        beforeEach(() => {
          action = showConversation({
            conversationId: "fake-conversation-id",
            switchToAssociatedView: true
          });
        });
        it("shows the inbox if the conversation is not archived", () => {
          const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
            id: "fake-conversation-id"
          });
          const state = {
            ...(0, import_conversations.getEmptyState)(),
            conversationLookup: {
              [conversation.id]: conversation
            }
          };
          const result = (0, import_conversations.reducer)(state, action);
          import_chai.assert.isUndefined(result.composer);
          import_chai.assert.isFalse(result.showArchived);
        });
        it("shows the archive if the conversation is archived", () => {
          const conversation = (0, import_getDefaultConversation.getDefaultConversation)({
            id: "fake-conversation-id",
            isArchived: true
          });
          const state = {
            ...(0, import_conversations.getEmptyState)(),
            conversationLookup: {
              [conversation.id]: conversation
            }
          };
          const result = (0, import_conversations.reducer)(state, action);
          import_chai.assert.isUndefined(result.composer);
          import_chai.assert.isTrue(result.showArchived);
        });
      });
    });
    describe("CLEAR_GROUP_CREATION_ERROR", () => {
      it("clears the group creation error", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            hasError: true
          }
        };
        const action = clearGroupCreationError();
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && result.composer.hasError === false);
      });
    });
    describe("CLEAR_INVITED_UUIDS_FOR_NEWLY_CREATED_GROUP", () => {
      it("clears the list of invited conversation UUIDs", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          invitedUuidsForNewlyCreatedGroup: [
            import_UUID.UUID.generate().toString(),
            import_UUID.UUID.generate().toString()
          ]
        };
        const action = clearInvitedUuidsForNewlyCreatedGroup();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isUndefined(result.invitedUuidsForNewlyCreatedGroup);
      });
    });
    describe("CLOSE_CONTACT_SPOOFING_REVIEW", () => {
      it("closes the contact spoofing review modal if it was open", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          contactSpoofingReview: {
            type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
            safeConversationId: "abc123"
          }
        };
        const action = closeContactSpoofingReview();
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isUndefined(actual.contactSpoofingReview);
      });
      it("does nothing if the modal wasn't already open", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = closeContactSpoofingReview();
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual, state);
      });
    });
    describe("CLOSE_MAXIMUM_GROUP_SIZE_MODAL", () => {
      it("closes the maximum group size modal if it was open", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
          }
        };
        const action = closeMaximumGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.ChooseGroupMembers && result.composer.maximumGroupSizeModalState === import_conversationsEnums.OneTimeModalState.Shown, "Expected the modal to be closed");
      });
      it("does nothing if the maximum group size modal was never shown", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        };
        const action = closeMaximumGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("does nothing if the maximum group size modal already closed", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
          }
        };
        const action = closeMaximumGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
    });
    describe("CLOSE_RECOMMENDED_GROUP_SIZE_MODAL", () => {
      it("closes the recommended group size modal if it was open", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
          }
        };
        const action = closeRecommendedGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.ChooseGroupMembers && result.composer.recommendedGroupSizeModalState === import_conversationsEnums.OneTimeModalState.Shown, "Expected the modal to be closed");
      });
      it("does nothing if the recommended group size modal was never shown", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        };
        const action = closeRecommendedGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("does nothing if the recommended group size modal already closed", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
          }
        };
        const action = closeRecommendedGroupSizeModal();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
    });
    describe("createGroup", () => {
      const conversationsState = {
        ...(0, import_conversations.getEmptyState)(),
        composer: {
          ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
          selectedConversationIds: ["abc123"],
          groupName: "Foo Bar Group",
          groupAvatar: new Uint8Array([1, 2, 3])
        }
      };
      it("immediately dispatches a CREATE_GROUP_PENDING action, which puts the composer in a loading state", () => {
        const dispatch = sinon.spy();
        createGroup()(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        sinon.assert.calledOnce(dispatch);
        sinon.assert.calledWith(dispatch, { type: "CREATE_GROUP_PENDING" });
        const action = dispatch.getCall(0).args[0];
        const result = (0, import_conversations.reducer)(conversationsState, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && result.composer.isCreating && !result.composer.hasError);
      });
      it("calls groups.createGroupV2", async () => {
        await createGroup(createGroupStub)(sinon.spy(), () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        sinon.assert.calledOnce(createGroupStub);
        sinon.assert.calledWith(createGroupStub, {
          name: "Foo Bar Group",
          avatar: new Uint8Array([1, 2, 3]),
          avatars: [],
          expireTimer: 0,
          conversationIds: ["abc123"]
        });
      });
      it("trims the group's title before calling groups.createGroupV2", async () => {
        await createGroup(createGroupStub)(sinon.spy(), () => ({
          ...getEmptyRootState(),
          conversations: {
            ...conversationsState,
            composer: {
              ...conversationsState.composer,
              groupName: "  To  Trim 	"
            }
          }
        }), null);
        sinon.assert.calledWith(createGroupStub, sinon.match({ name: "To  Trim" }));
      });
      it("dispatches a CREATE_GROUP_REJECTED action if group creation fails, which marks the state with an error", async () => {
        createGroupStub.rejects(new Error("uh oh"));
        const dispatch = sinon.spy();
        const createGroupPromise = createGroup(createGroupStub)(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        const pendingAction = dispatch.getCall(0).args[0];
        const stateAfterPending = (0, import_conversations.reducer)(conversationsState, pendingAction);
        await createGroupPromise;
        sinon.assert.calledTwice(dispatch);
        sinon.assert.calledWith(dispatch, { type: "CREATE_GROUP_REJECTED" });
        const rejectedAction = dispatch.getCall(1).args[0];
        const result = (0, import_conversations.reducer)(stateAfterPending, rejectedAction);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && !result.composer.isCreating && result.composer.hasError);
      });
      it("when rejecting, does nothing to the left pane if it's no longer in this composer state", async () => {
        createGroupStub.rejects(new Error("uh oh"));
        const dispatch = sinon.spy();
        const createGroupPromise = createGroup(createGroupStub)(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        await createGroupPromise;
        const state = (0, import_conversations.getEmptyState)();
        const rejectedAction = dispatch.getCall(1).args[0];
        const result = (0, import_conversations.reducer)(state, rejectedAction);
        import_chai.assert.strictEqual(result, state);
      });
      it("dispatches a CREATE_GROUP_FULFILLED event (which updates the newly-created conversation IDs), triggers a showConversation event and switches to the associated conversation on success", async () => {
        const abc = import_UUID.UUID.fromPrefix("abc").toString();
        createGroupStub.resolves({
          id: "9876",
          get: (key) => {
            if (key !== "pendingMembersV2") {
              throw new Error("This getter is not set up for this test");
            }
            return [{ uuid: abc }];
          }
        });
        const dispatch = sinon.spy();
        await createGroup(createGroupStub)(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        sinon.assert.calledWith(dispatch, {
          type: "CREATE_GROUP_FULFILLED",
          payload: { invitedUuids: [abc] }
        });
        sinon.assert.calledWith(dispatch, {
          type: import_conversations.SELECTED_CONVERSATION_CHANGED,
          payload: {
            id: "9876",
            messageId: void 0,
            switchToAssociatedView: true
          }
        });
        const fulfilledAction = dispatch.getCall(1).args[0];
        const result = (0, import_conversations.reducer)(conversationsState, fulfilledAction);
        import_chai.assert.deepEqual(result.invitedUuidsForNewlyCreatedGroup, [abc]);
      });
    });
    describe("CONVERSATION_STOPPED_BY_MISSING_VERIFICATION", () => {
      it("adds to state, removing duplicates", () => {
        const first = (0, import_conversations.reducer)((0, import_conversations.getEmptyState)(), conversationStoppedByMissingVerification({
          conversationId: "convo A",
          untrustedUuids: ["convo 1"]
        }));
        const second = (0, import_conversations.reducer)(first, conversationStoppedByMissingVerification({
          conversationId: "convo A",
          untrustedUuids: ["convo 2"]
        }));
        const third = (0, import_conversations.reducer)(second, conversationStoppedByMissingVerification({
          conversationId: "convo A",
          untrustedUuids: ["convo 1", "convo 3"]
        }));
        import_chai.assert.deepStrictEqual(third.verificationDataByConversation, {
          "convo A": {
            type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
            uuidsNeedingVerification: ["convo 1", "convo 2", "convo 3"]
          }
        });
      });
      it("stomps on VerificationCancelled state", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
              canceledAt: Date.now()
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, conversationStoppedByMissingVerification({
          conversationId: "convo A",
          untrustedUuids: ["convo 1", "convo 2"]
        }));
        import_chai.assert.deepStrictEqual(actual.verificationDataByConversation, {
          "convo A": {
            type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
            uuidsNeedingVerification: ["convo 1", "convo 2"]
          }
        });
      });
    });
    describe("CANCEL_CONVERSATION_PENDING_VERIFICATION", () => {
      function getAction(timestamp, conversationsState) {
        const dispatch = sinon.spy();
        (0, import_conversations.cancelConversationVerification)(timestamp)(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        return dispatch.getCall(0).args[0];
      }
      it("replaces existing PendingVerification state", () => {
        const now = Date.now();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["convo 1", "convo 2"]
            }
          }
        };
        const action = getAction(now, state);
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepStrictEqual(actual.verificationDataByConversation, {
          "convo A": {
            type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
            canceledAt: now
          }
        });
      });
      it("updates timestamp for existing VerificationCancelled state", () => {
        const now = Date.now();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
              canceledAt: now - 1
            }
          }
        };
        const action = getAction(now, state);
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepStrictEqual(actual.verificationDataByConversation, {
          "convo A": {
            type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
            canceledAt: now
          }
        });
      });
      it("uses newest timestamp when updating existing VerificationCancelled state", () => {
        const now = Date.now();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
              canceledAt: now
            }
          }
        };
        const action = getAction(now, state);
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepStrictEqual(actual.verificationDataByConversation, {
          "convo A": {
            type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
            canceledAt: now
          }
        });
      });
      it("does nothing if no existing state", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = getAction(Date.now(), state);
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(actual, state);
      });
    });
    describe("CANCEL_CONVERSATION_PENDING_VERIFICATION", () => {
      it("removes existing VerificationCancelled state", () => {
        const now = Date.now();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.VerificationCancelled,
              canceledAt: now
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, (0, import_conversations.clearCancelledConversationVerification)("convo A"));
        import_chai.assert.deepStrictEqual(actual.verificationDataByConversation, {});
      });
      it("leaves existing PendingVerification state", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          verificationDataByConversation: {
            "convo A": {
              type: import_conversationsEnums.ConversationVerificationState.PendingVerification,
              uuidsNeedingVerification: ["convo 1", "convo 2"]
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, (0, import_conversations.clearCancelledConversationVerification)("convo A"));
        import_chai.assert.deepStrictEqual(actual, state);
      });
      it("does nothing with empty state", () => {
        const state = (0, import_conversations.getEmptyState)();
        const actual = (0, import_conversations.reducer)(state, (0, import_conversations.clearCancelledConversationVerification)("convo A"));
        import_chai.assert.deepStrictEqual(actual, state);
      });
    });
    describe("REPAIR_NEWEST_MESSAGE", () => {
      it("updates newest", () => {
        const action = repairNewestMessage(conversationId);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time,
              sent_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [messageIdThree, messageIdTwo, messageId],
              metrics: {
                totalUnseen: 0
              }
            }
          }
        };
        const expected = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time,
              sent_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [messageIdThree, messageIdTwo, messageId],
              metrics: {
                totalUnseen: 0,
                newest: {
                  id: messageId,
                  received_at: time,
                  sent_at: time
                }
              }
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual, expected);
      });
      it("clears newest", () => {
        const action = repairNewestMessage(conversationId);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [],
              metrics: {
                totalUnseen: 0,
                newest: {
                  id: messageId,
                  received_at: time
                }
              }
            }
          }
        };
        const expected = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [],
              metrics: {
                newest: void 0,
                totalUnseen: 0
              }
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual, expected);
      });
      it("returns state if conversation not present", () => {
        const action = repairNewestMessage(conversationId);
        const state = (0, import_conversations.getEmptyState)();
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.equal(actual, state);
      });
    });
    describe("REPAIR_OLDEST_MESSAGE", () => {
      it("updates oldest", () => {
        const action = repairOldestMessage(conversationId);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time,
              sent_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [messageId, messageIdTwo, messageIdThree],
              metrics: {
                totalUnseen: 0
              }
            }
          }
        };
        const expected = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time,
              sent_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [messageId, messageIdTwo, messageIdThree],
              metrics: {
                totalUnseen: 0,
                oldest: {
                  id: messageId,
                  received_at: time,
                  sent_at: time
                }
              }
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual, expected);
      });
      it("clears oldest", () => {
        const action = repairOldestMessage(conversationId);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [],
              metrics: {
                totalUnseen: 0,
                oldest: {
                  id: messageId,
                  received_at: time
                }
              }
            }
          }
        };
        const expected = {
          ...(0, import_conversations.getEmptyState)(),
          messagesLookup: {
            [messageId]: {
              ...getDefaultMessage(messageId),
              received_at: time
            }
          },
          messagesByConversation: {
            [conversationId]: {
              ...getDefaultConversationMessage(),
              messageIds: [],
              metrics: {
                oldest: void 0,
                totalUnseen: 0
              }
            }
          }
        };
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual, expected);
      });
      it("returns state if conversation not present", () => {
        const action = repairOldestMessage(conversationId);
        const state = (0, import_conversations.getEmptyState)();
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.equal(actual, state);
      });
    });
    describe("REVIEW_GROUP_MEMBER_NAME_COLLISION", () => {
      it("starts reviewing a group member name collision", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = reviewGroupMemberNameCollision("abc123");
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual.contactSpoofingReview, {
          type: import_contactSpoofing.ContactSpoofingType.MultipleGroupMembersWithSameTitle,
          groupConversationId: "abc123"
        });
      });
    });
    describe("REVIEW_MESSAGE_REQUEST_NAME_COLLISION", () => {
      it("starts reviewing a message request name collision", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = reviewMessageRequestNameCollision({
          safeConversationId: "def"
        });
        const actual = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(actual.contactSpoofingReview, {
          type: import_contactSpoofing.ContactSpoofingType.DirectConversationWithSameTitle,
          safeConversationId: "def"
        });
      });
    });
    describe("SET_COMPOSE_GROUP_AVATAR", () => {
      it("can clear the composer's group avatar", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            groupAvatar: new Uint8Array(2)
          }
        };
        const action = setComposeGroupAvatar(void 0);
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && result.composer.groupAvatar === void 0);
      });
      it("can set the composer's group avatar", () => {
        const avatar = new Uint8Array([1, 2, 3]);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        };
        const action = setComposeGroupAvatar(avatar);
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && result.composer.groupAvatar === avatar);
      });
    });
    describe("SET_COMPOSE_GROUP_NAME", () => {
      it("can set the composer's group name", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        };
        const action = setComposeGroupName("bing bong");
        const result = (0, import_conversations.reducer)(state, action);
        (0, import_chai.assert)(result.composer?.step === import_conversationsEnums.ComposerStep.SetGroupMetadata && result.composer.groupName === "bing bong");
      });
    });
    describe("SET_COMPOSE_SEARCH_TERM", () => {
      it("updates the contact search term", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        };
        const result = (0, import_conversations.reducer)(state, setComposeSearchTerm("foo bar"));
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultStartDirectConversationComposerState,
          searchTerm: "foo bar"
        });
      });
    });
    describe("DISCARD_MESSAGES", () => {
      const startState = {
        ...(0, import_conversations.getEmptyState)(),
        messagesLookup: {
          [messageId]: getDefaultMessage(messageId),
          [messageIdTwo]: getDefaultMessage(messageIdTwo),
          [messageIdThree]: getDefaultMessage(messageIdThree)
        },
        messagesByConversation: {
          [conversationId]: {
            messageChangeCounter: 0,
            metrics: {
              totalUnseen: 0
            },
            scrollToMessageCounter: 0,
            messageIds: [messageId, messageIdTwo, messageIdThree]
          }
        }
      };
      it("eliminates older messages", () => {
        const toDiscard = {
          conversationId,
          numberToKeepAtBottom: 2
        };
        const state = (0, import_conversations.reducer)(startState, discardMessages(toDiscard));
        import_chai.assert.deepEqual(state.messagesByConversation[conversationId]?.messageIds, [messageIdTwo, messageIdThree]);
      });
      it("eliminates newer messages", () => {
        const toDiscard = {
          conversationId,
          numberToKeepAtTop: 2
        };
        const state = (0, import_conversations.reducer)(startState, discardMessages(toDiscard));
        import_chai.assert.deepEqual(state.messagesByConversation[conversationId]?.messageIds, [messageId, messageIdTwo]);
      });
    });
    describe("SET_PRE_JOIN_CONVERSATION", () => {
      const startState = {
        ...(0, import_conversations.getEmptyState)()
      };
      it("starts with empty value", () => {
        import_chai.assert.isUndefined(startState.preJoinConversation);
      });
      it("sets value as provided", () => {
        const preJoinConversation = {
          title: "Pre-join group!",
          memberCount: 4,
          approvalRequired: false
        };
        const stateWithData = (0, import_conversations.reducer)(startState, setPreJoinConversation(preJoinConversation));
        import_chai.assert.deepEqual(stateWithData.preJoinConversation, preJoinConversation);
        const resetState = (0, import_conversations.reducer)(stateWithData, setPreJoinConversation(void 0));
        import_chai.assert.isUndefined(resetState.preJoinConversation);
      });
    });
    describe("MESSAGE_CHANGED", () => {
      const startState = {
        ...(0, import_conversations.getEmptyState)(),
        conversationLookup: {
          [conversationId]: {
            ...(0, import_getDefaultConversation.getDefaultConversation)(),
            id: conversationId,
            groupVersion: 2,
            groupId: "dGhpc2lzYWdyb3VwaWR0aGlzaXNhZ3JvdXBpZHRoaXM="
          }
        },
        messagesByConversation: {
          [conversationId]: {
            messageChangeCounter: 0,
            messageIds: [messageId, messageIdTwo, messageIdThree],
            metrics: {
              totalUnseen: 0
            },
            scrollToMessageCounter: 0
          }
        },
        messagesLookup: {
          [messageId]: {
            ...getDefaultMessage(messageId),
            displayLimit: void 0
          },
          [messageIdTwo]: {
            ...getDefaultMessage(messageIdTwo),
            displayLimit: void 0
          },
          [messageIdThree]: {
            ...getDefaultMessage(messageIdThree),
            displayLimit: void 0
          }
        }
      };
      const changedMessage = {
        ...getDefaultMessage(messageId),
        body: "changed",
        displayLimit: void 0
      };
      it("updates message data", () => {
        const state = (0, import_conversations.reducer)(startState, messageChanged(messageId, conversationId, changedMessage));
        import_chai.assert.deepEqual(state.messagesLookup[messageId], changedMessage);
        import_chai.assert.strictEqual(state.messagesByConversation[conversationId]?.messageChangeCounter, 0);
      });
      it("does not update lookup if it is a story reply", () => {
        const state = (0, import_conversations.reducer)(startState, messageChanged(messageId, conversationId, {
          ...changedMessage,
          storyId: "story-id"
        }));
        import_chai.assert.deepEqual(state.messagesLookup[messageId], startState.messagesLookup[messageId]);
        import_chai.assert.strictEqual(state.messagesByConversation[conversationId]?.messageChangeCounter, 0);
      });
      it("increments message change counter if new message has reactions", () => {
        const changedMessageWithReaction = {
          ...changedMessage,
          reactions: [
            {
              emoji: "\u{1F381}",
              fromId: "some-other-id",
              timestamp: 2222,
              targetTimestamp: 1111,
              targetAuthorUuid: "author-uuid"
            }
          ]
        };
        const state = (0, import_conversations.reducer)(startState, messageChanged(messageId, conversationId, changedMessageWithReaction));
        import_chai.assert.deepEqual(state.messagesLookup[messageId], changedMessageWithReaction);
        import_chai.assert.strictEqual(state.messagesByConversation[conversationId]?.messageChangeCounter, 1);
      });
      it("does not increment message change counter if only old message had reactions", () => {
        const updatedStartState = {
          ...startState,
          messagesLookup: {
            [messageId]: {
              ...startState.messagesLookup[messageId],
              reactions: [
                {
                  emoji: "\u{1F381}",
                  fromId: "some-other-id",
                  timestamp: 2222,
                  targetTimestamp: 1111,
                  targetAuthorUuid: "author-uuid"
                }
              ]
            }
          }
        };
        const state = (0, import_conversations.reducer)(updatedStartState, messageChanged(messageId, conversationId, changedMessage));
        import_chai.assert.deepEqual(state.messagesLookup[messageId], changedMessage);
        import_chai.assert.strictEqual(state.messagesByConversation[conversationId]?.messageChangeCounter, 0);
      });
    });
    describe("SHOW_ARCHIVED_CONVERSATIONS", () => {
      it("is a no-op when already at the archive", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          showArchived: true
        };
        const action = showArchivedConversations();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isTrue(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
      it("switches from the inbox to the archive", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = showArchivedConversations();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isTrue(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
      it("switches from the composer to the archive", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        };
        const action = showArchivedConversations();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isTrue(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
    });
    describe("SHOW_INBOX", () => {
      it("is a no-op when already at the inbox", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = showInbox();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
      it("switches from the archive to the inbox", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          showArchived: true
        };
        const action = showInbox();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
      it("switches from the composer to the inbox", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        };
        const action = showInbox();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.isUndefined(result.composer);
      });
    });
    describe("START_COMPOSING", () => {
      it("does nothing if on the first step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultStartDirectConversationComposerState
        };
        const action = startComposing();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, import_defaultComposerStates.defaultStartDirectConversationComposerState);
      });
      it("if on the second step of the composer, goes back to the first step, clearing the search term", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            searchTerm: "to be cleared"
          }
        };
        const action = startComposing();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, import_defaultComposerStates.defaultStartDirectConversationComposerState);
      });
      it("if on the third step of the composer, goes back to the first step, clearing everything", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        };
        const action = startComposing();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, import_defaultComposerStates.defaultStartDirectConversationComposerState);
      });
      it("switches from the inbox to the composer", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = startComposing();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, import_defaultComposerStates.defaultStartDirectConversationComposerState);
      });
      it("switches from the archive to the inbox", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          showArchived: true
        };
        const action = startComposing();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, import_defaultComposerStates.defaultStartDirectConversationComposerState);
      });
    });
    describe("SHOW_CHOOSE_GROUP_MEMBERS", () => {
      it("switches to the second step of the composer if on the first step", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultStartDirectConversationComposerState,
            searchTerm: "to be cleared"
          }
        };
        const action = showChooseGroupMembers();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          userAvatarData: (0, import_Avatar.getDefaultAvatars)(true)
        });
      });
      it("does nothing if already on the second step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        };
        const action = showChooseGroupMembers();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
      it("returns to the second step if on the third step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
            groupName: "Foo Bar Group",
            groupAvatar: new Uint8Array([4, 2])
          }
        };
        const action = showChooseGroupMembers();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          groupName: "Foo Bar Group",
          groupAvatar: new Uint8Array([4, 2])
        });
      });
      it("switches from the inbox to the second step of the composer", () => {
        const state = (0, import_conversations.getEmptyState)();
        const action = showChooseGroupMembers();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          userAvatarData: (0, import_Avatar.getDefaultAvatars)(true)
        });
      });
      it("switches from the archive to the second step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          showArchived: true
        };
        const action = showChooseGroupMembers();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.isFalse(result.showArchived);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          userAvatarData: (0, import_Avatar.getDefaultAvatars)(true)
        });
      });
    });
    describe("START_SETTING_GROUP_METADATA", () => {
      it("moves from the second to the third step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: ["abc", "def"]
          }
        };
        const action = startSettingGroupMetadata();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
          selectedConversationIds: ["abc", "def"]
        });
      });
      it("maintains state when going from the second to third steps of the composer, if the second step already had some data (likely from a previous visit)", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            searchTerm: "foo bar",
            selectedConversationIds: ["abc", "def"],
            groupName: "Foo Bar Group",
            groupAvatar: new Uint8Array([6, 9])
          }
        };
        const action = startSettingGroupMetadata();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultSetGroupMetadataComposerState,
          selectedConversationIds: ["abc", "def"],
          groupName: "Foo Bar Group",
          groupAvatar: new Uint8Array([6, 9])
        });
      });
      it("does nothing if already on the third step of the composer", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultSetGroupMetadataComposerState
        };
        const action = startSettingGroupMetadata();
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.strictEqual(result, state);
      });
    });
    describe("TOGGLE_CONVERSATION_IN_CHOOSE_MEMBERS", () => {
      function getAction(id, conversationsState) {
        const dispatch = sinon.spy();
        toggleConversationInChooseMembers(id)(dispatch, () => ({
          ...getEmptyRootState(),
          conversations: conversationsState
        }), null);
        return dispatch.getCall(0).args[0];
      }
      beforeEach(async () => {
        await (0, import_RemoteConfigStub.updateRemoteConfig)([
          { name: "global.groupsv2.maxGroupSize", value: "22", enabled: true },
          {
            name: "global.groupsv2.groupSizeHardLimit",
            value: "33",
            enabled: true
          }
        ]);
      });
      it("adds conversation IDs to the list", () => {
        const zero = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        };
        const one = (0, import_conversations.reducer)(zero, getAction("abc", zero));
        const two = (0, import_conversations.reducer)(one, getAction("def", one));
        import_chai.assert.deepEqual(two.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: ["abc", "def"]
        });
      });
      it("removes conversation IDs from the list", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: ["abc", "def"]
          }
        };
        const action = getAction("abc", state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: ["def"]
        });
      });
      it("shows the recommended group size modal when first crossing the maximum recommended group size", () => {
        const oldSelectedConversationIds = (0, import_lodash.times)(21, () => (0, import_uuid.v4)());
        const newUuid = (0, import_uuid.v4)();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: oldSelectedConversationIds
          }
        };
        const action = getAction(newUuid, state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: [...oldSelectedConversationIds, newUuid],
          recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
        });
      });
      it("doesn't show the recommended group size modal twice", () => {
        const oldSelectedConversationIds = (0, import_lodash.times)(21, () => (0, import_uuid.v4)());
        const newUuid = (0, import_uuid.v4)();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: oldSelectedConversationIds,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
          }
        };
        const action = getAction(newUuid, state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: [...oldSelectedConversationIds, newUuid],
          recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
        });
      });
      it("defaults the maximum recommended size to 151", async () => {
        for (const value of [null, "xyz"]) {
          await (0, import_RemoteConfigStub.updateRemoteConfig)([
            {
              name: "global.groupsv2.maxGroupSize",
              value,
              enabled: true
            },
            {
              name: "global.groupsv2.groupSizeHardLimit",
              value: "33",
              enabled: true
            }
          ]);
          const state = {
            ...(0, import_conversations.getEmptyState)(),
            composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
          };
          const action = getAction((0, import_uuid.v4)(), state);
          import_chai.assert.strictEqual(action.payload.maxRecommendedGroupSize, 151);
        }
      });
      it("shows the maximum group size modal when first reaching the maximum group size", () => {
        const oldSelectedConversationIds = (0, import_lodash.times)(31, () => (0, import_uuid.v4)());
        const newUuid = (0, import_uuid.v4)();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: oldSelectedConversationIds,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown,
            maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.NeverShown
          }
        };
        const action = getAction(newUuid, state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: [...oldSelectedConversationIds, newUuid],
          recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown,
          maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Showing
        });
      });
      it("doesn't show the maximum group size modal twice", () => {
        const oldSelectedConversationIds = (0, import_lodash.times)(31, () => (0, import_uuid.v4)());
        const newUuid = (0, import_uuid.v4)();
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: oldSelectedConversationIds,
            recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown,
            maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
          }
        };
        const action = getAction(newUuid, state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result.composer, {
          ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
          selectedConversationIds: [...oldSelectedConversationIds, newUuid],
          recommendedGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown,
          maximumGroupSizeModalState: import_conversationsEnums.OneTimeModalState.Shown
        });
      });
      it("cannot select more than the maximum number of conversations", () => {
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: {
            ...import_defaultComposerStates.defaultChooseGroupMembersComposerState,
            selectedConversationIds: (0, import_lodash.times)(1e3, () => (0, import_uuid.v4)())
          }
        };
        const action = getAction((0, import_uuid.v4)(), state);
        const result = (0, import_conversations.reducer)(state, action);
        import_chai.assert.deepEqual(result, state);
      });
      it("defaults the maximum group size to 1001 if the recommended maximum is smaller", async () => {
        for (const value of [null, "xyz"]) {
          await (0, import_RemoteConfigStub.updateRemoteConfig)([
            { name: "global.groupsv2.maxGroupSize", value: "2", enabled: true },
            {
              name: "global.groupsv2.groupSizeHardLimit",
              value,
              enabled: true
            }
          ]);
          const state = {
            ...(0, import_conversations.getEmptyState)(),
            composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
          };
          const action = getAction((0, import_uuid.v4)(), state);
          import_chai.assert.strictEqual(action.payload.maxGroupSize, 1001);
        }
      });
      it("defaults the maximum group size to (recommended maximum + 1) if the recommended maximum is more than 1001", async () => {
        await (0, import_RemoteConfigStub.updateRemoteConfig)([
          {
            name: "global.groupsv2.maxGroupSize",
            value: "1234",
            enabled: true
          },
          {
            name: "global.groupsv2.groupSizeHardLimit",
            value: "2",
            enabled: true
          }
        ]);
        const state = {
          ...(0, import_conversations.getEmptyState)(),
          composer: import_defaultComposerStates.defaultChooseGroupMembersComposerState
        };
        const action = getAction((0, import_uuid.v4)(), state);
        import_chai.assert.strictEqual(action.payload.maxGroupSize, 1235);
      });
    });
  });
  describe("COLORS_CHANGED", () => {
    const abc = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
      id: "abc",
      conversationColor: "wintergreen"
    });
    const def = (0, import_getDefaultConversation.getDefaultConversationWithUuid)({
      id: "def",
      conversationColor: "infrared"
    });
    const ghi = (0, import_getDefaultConversation.getDefaultConversation)({
      id: "ghi",
      e164: "ghi",
      conversationColor: "ember"
    });
    const jkl = (0, import_getDefaultConversation.getDefaultConversation)({
      id: "jkl",
      groupId: "jkl",
      conversationColor: "plum"
    });
    const getState = /* @__PURE__ */ __name(() => ({
      ...getEmptyRootState(),
      conversations: {
        ...(0, import_conversations.getEmptyState)(),
        conversationLookup: {
          abc,
          def,
          ghi,
          jkl
        },
        conversationsByUuid: {
          abc,
          def
        },
        conversationsByE164: {
          ghi
        },
        conversationsByGroupId: {
          jkl
        }
      }
    }), "getState");
    it("resetAllChatColors", async () => {
      const dispatch = sinon.spy();
      await resetAllChatColors()(dispatch, getState, null);
      const [action] = dispatch.getCall(0).args;
      const nextState = (0, import_conversations.reducer)(getState().conversations, action);
      sinon.assert.calledOnce(dispatch);
      import_chai.assert.isUndefined(nextState.conversationLookup.abc.conversationColor);
      import_chai.assert.isUndefined(nextState.conversationLookup.def.conversationColor);
      import_chai.assert.isUndefined(nextState.conversationLookup.ghi.conversationColor);
      import_chai.assert.isUndefined(nextState.conversationLookup.jkl.conversationColor);
      import_chai.assert.isUndefined(nextState.conversationsByUuid[abc.uuid].conversationColor);
      import_chai.assert.isUndefined(nextState.conversationsByUuid[def.uuid].conversationColor);
      import_chai.assert.isUndefined(nextState.conversationsByE164.ghi.conversationColor);
      import_chai.assert.isUndefined(nextState.conversationsByGroupId.jkl.conversationColor);
      window.storage.remove("defaultConversationColor");
    });
  });
});
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiY29udmVyc2F0aW9uc190ZXN0LnRzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyIvLyBDb3B5cmlnaHQgMjAyMC0yMDIyIFNpZ25hbCBNZXNzZW5nZXIsIExMQ1xuLy8gU1BEWC1MaWNlbnNlLUlkZW50aWZpZXI6IEFHUEwtMy4wLW9ubHlcblxuaW1wb3J0IHsgYXNzZXJ0IH0gZnJvbSAnY2hhaSc7XG5pbXBvcnQgKiBhcyBzaW5vbiBmcm9tICdzaW5vbic7XG5pbXBvcnQgeyB2NCBhcyB1dWlkIH0gZnJvbSAndXVpZCc7XG5pbXBvcnQgeyB0aW1lcyB9IGZyb20gJ2xvZGFzaCc7XG5pbXBvcnQgeyByZWR1Y2VyIGFzIHJvb3RSZWR1Y2VyIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvcmVkdWNlcic7XG5pbXBvcnQgeyBub29wQWN0aW9uIH0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3Mvbm9vcCc7XG5pbXBvcnQge1xuICBDb21wb3NlclN0ZXAsXG4gIENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLFxuICBPbmVUaW1lTW9kYWxTdGF0ZSxcbn0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9uc0VudW1zJztcbmltcG9ydCB0eXBlIHtcbiAgQ2FuY2VsVmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uQWN0aW9uVHlwZSxcbiAgQ29udmVyc2F0aW9uTWVzc2FnZVR5cGUsXG4gIENvbnZlcnNhdGlvblR5cGUsXG4gIENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUsXG4gIE1lc3NhZ2VUeXBlLFxuICBTZWxlY3RlZENvbnZlcnNhdGlvbkNoYW5nZWRBY3Rpb25UeXBlLFxuICBUb2dnbGVDb252ZXJzYXRpb25JbkNob29zZU1lbWJlcnNBY3Rpb25UeXBlLFxufSBmcm9tICcuLi8uLi8uLi9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJztcbmltcG9ydCB7XG4gIFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VELFxuICBhY3Rpb25zLFxuICBjYW5jZWxDb252ZXJzYXRpb25WZXJpZmljYXRpb24sXG4gIGNsZWFyQ2FuY2VsbGVkQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uLFxuICBnZXRDb252ZXJzYXRpb25DYWxsTW9kZSxcbiAgZ2V0RW1wdHlTdGF0ZSxcbiAgcmVkdWNlcixcbiAgdXBkYXRlQ29udmVyc2F0aW9uTG9va3Vwcyxcbn0gZnJvbSAnLi4vLi4vLi4vc3RhdGUvZHVja3MvY29udmVyc2F0aW9ucyc7XG5pbXBvcnQgeyBSZWFkU3RhdHVzIH0gZnJvbSAnLi4vLi4vLi4vbWVzc2FnZXMvTWVzc2FnZVJlYWRTdGF0dXMnO1xuaW1wb3J0IHsgQ29udGFjdFNwb29maW5nVHlwZSB9IGZyb20gJy4uLy4uLy4uL3V0aWwvY29udGFjdFNwb29maW5nJztcbmltcG9ydCB7IENhbGxNb2RlIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvQ2FsbGluZyc7XG5pbXBvcnQgeyBVVUlEIH0gZnJvbSAnLi4vLi4vLi4vdHlwZXMvVVVJRCc7XG5pbXBvcnQge1xuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uLFxuICBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQsXG59IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL2dldERlZmF1bHRDb252ZXJzYXRpb24nO1xuaW1wb3J0IHsgZ2V0RGVmYXVsdEF2YXRhcnMgfSBmcm9tICcuLi8uLi8uLi90eXBlcy9BdmF0YXInO1xuaW1wb3J0IHtcbiAgZGVmYXVsdFN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uQ29tcG9zZXJTdGF0ZSxcbiAgZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gIGRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbn0gZnJvbSAnLi4vLi4vLi4vdGVzdC1ib3RoL2hlbHBlcnMvZGVmYXVsdENvbXBvc2VyU3RhdGVzJztcbmltcG9ydCB7IHVwZGF0ZVJlbW90ZUNvbmZpZyB9IGZyb20gJy4uLy4uLy4uL3Rlc3QtYm90aC9oZWxwZXJzL1JlbW90ZUNvbmZpZ1N0dWInO1xuXG5jb25zdCB7XG4gIGNsZWFyR3JvdXBDcmVhdGlvbkVycm9yLFxuICBjbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwLFxuICBjbG9zZUNvbnRhY3RTcG9vZmluZ1JldmlldyxcbiAgY2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWwsXG4gIGNsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbCxcbiAgY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbixcbiAgY3JlYXRlR3JvdXAsXG4gIGRpc2NhcmRNZXNzYWdlcyxcbiAgbWVzc2FnZUNoYW5nZWQsXG4gIHJlcGFpck5ld2VzdE1lc3NhZ2UsXG4gIHJlcGFpck9sZGVzdE1lc3NhZ2UsXG4gIHJlc2V0QWxsQ2hhdENvbG9ycyxcbiAgcmV2aWV3R3JvdXBNZW1iZXJOYW1lQ29sbGlzaW9uLFxuICByZXZpZXdNZXNzYWdlUmVxdWVzdE5hbWVDb2xsaXNpb24sXG4gIHNldENvbXBvc2VHcm91cEF2YXRhcixcbiAgc2V0Q29tcG9zZUdyb3VwTmFtZSxcbiAgc2V0Q29tcG9zZVNlYXJjaFRlcm0sXG4gIHNldFByZUpvaW5Db252ZXJzYXRpb24sXG4gIHNob3dBcmNoaXZlZENvbnZlcnNhdGlvbnMsXG4gIHNob3dDaG9vc2VHcm91cE1lbWJlcnMsXG4gIHNob3dDb252ZXJzYXRpb24sXG4gIHNob3dJbmJveCxcbiAgc3RhcnRDb21wb3NpbmcsXG4gIHN0YXJ0U2V0dGluZ0dyb3VwTWV0YWRhdGEsXG4gIHRvZ2dsZUNvbnZlcnNhdGlvbkluQ2hvb3NlTWVtYmVycyxcbn0gPSBhY3Rpb25zO1xuXG5kZXNjcmliZSgnYm90aC9zdGF0ZS9kdWNrcy9jb252ZXJzYXRpb25zJywgKCkgPT4ge1xuICBjb25zdCBnZXRFbXB0eVJvb3RTdGF0ZSA9ICgpID0+IHJvb3RSZWR1Y2VyKHVuZGVmaW5lZCwgbm9vcEFjdGlvbigpKTtcblxuICBsZXQgc2lub25TYW5kYm94OiBzaW5vbi5TaW5vblNhbmRib3g7XG4gIGxldCBjcmVhdGVHcm91cFN0dWI6IHNpbm9uLlNpbm9uU3R1YjtcblxuICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICBzaW5vblNhbmRib3ggPSBzaW5vbi5jcmVhdGVTYW5kYm94KCk7XG5cbiAgICBzaW5vblNhbmRib3guc3R1Yih3aW5kb3cuV2hpc3Blci5ldmVudHMsICd0cmlnZ2VyJyk7XG5cbiAgICBjcmVhdGVHcm91cFN0dWIgPSBzaW5vbi5zdHViKCk7XG4gIH0pO1xuXG4gIGFmdGVyRWFjaCgoKSA9PiB7XG4gICAgc2lub25TYW5kYm94LnJlc3RvcmUoKTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ2hlbHBlcnMnLCAoKSA9PiB7XG4gICAgZGVzY3JpYmUoJ2dldENvbnZlcnNhdGlvbkNhbGxNb2RlJywgKCkgPT4ge1xuICAgICAgY29uc3QgZmFrZUNvbnZlcnNhdGlvbjogQ29udmVyc2F0aW9uVHlwZSA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oKTtcblxuICAgICAgaXQoXCJyZXR1cm5zIENhbGxNb2RlLk5vbmUgaWYgeW91J3ZlIGxlZnQgdGhlIGNvbnZlcnNhdGlvblwiLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRDb252ZXJzYXRpb25DYWxsTW9kZSh7XG4gICAgICAgICAgICAuLi5mYWtlQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgbGVmdDogdHJ1ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBDYWxsTW9kZS5Ob25lXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJyZXR1cm5zIENhbGxNb2RlLk5vbmUgaWYgeW91J3ZlIGJsb2NrZWQgdGhlIG90aGVyIHBlcnNvblwiLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRDb252ZXJzYXRpb25DYWxsTW9kZSh7XG4gICAgICAgICAgICAuLi5mYWtlQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgaXNCbG9ja2VkOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIENhbGxNb2RlLk5vbmVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcInJldHVybnMgQ2FsbE1vZGUuTm9uZSBpZiB5b3UgaGF2ZW4ndCBhY2NlcHRlZCBtZXNzYWdlIHJlcXVlc3RzXCIsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldENvbnZlcnNhdGlvbkNhbGxNb2RlKHtcbiAgICAgICAgICAgIC4uLmZha2VDb252ZXJzYXRpb24sXG4gICAgICAgICAgICBhY2NlcHRlZE1lc3NhZ2VSZXF1ZXN0OiBmYWxzZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBDYWxsTW9kZS5Ob25lXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgQ2FsbE1vZGUuTm9uZSBpZiB0aGUgY29udmVyc2F0aW9uIGlzIE5vdGUgdG8gU2VsZicsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldENvbnZlcnNhdGlvbkNhbGxNb2RlKHtcbiAgICAgICAgICAgIC4uLmZha2VDb252ZXJzYXRpb24sXG4gICAgICAgICAgICBpc01lOiB0cnVlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIENhbGxNb2RlLk5vbmVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBDYWxsTW9kZS5Ob25lIGZvciB2MSBncm91cHMnLCAoKSA9PiB7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBnZXRDb252ZXJzYXRpb25DYWxsTW9kZSh7XG4gICAgICAgICAgICAuLi5mYWtlQ29udmVyc2F0aW9uLFxuICAgICAgICAgICAgdHlwZTogJ2dyb3VwJyxcbiAgICAgICAgICAgIGdyb3VwVmVyc2lvbjogMSxcbiAgICAgICAgICAgIHNoYXJlZEdyb3VwTmFtZXM6IFtdLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIENhbGxNb2RlLk5vbmVcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgZ2V0Q29udmVyc2F0aW9uQ2FsbE1vZGUoe1xuICAgICAgICAgICAgLi4uZmFrZUNvbnZlcnNhdGlvbixcbiAgICAgICAgICAgIHR5cGU6ICdncm91cCcsXG4gICAgICAgICAgICBzaGFyZWRHcm91cE5hbWVzOiBbXSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBDYWxsTW9kZS5Ob25lXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3JldHVybnMgQ2FsbE1vZGUuRGlyZWN0IGlmIHRoZSBjb252ZXJzYXRpb24gaXMgYSBub3JtYWwgZGlyZWN0IGNvbnZlcnNhdGlvbicsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldENvbnZlcnNhdGlvbkNhbGxNb2RlKGZha2VDb252ZXJzYXRpb24pLFxuICAgICAgICAgIENhbGxNb2RlLkRpcmVjdFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIENhbGxNb2RlLkdyb3VwIGlmIHRoZSBjb252ZXJzYXRpb24gaXMgYSB2MiBncm91cCcsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIGdldENvbnZlcnNhdGlvbkNhbGxNb2RlKHtcbiAgICAgICAgICAgIC4uLmZha2VDb252ZXJzYXRpb24sXG4gICAgICAgICAgICB0eXBlOiAnZ3JvdXAnLFxuICAgICAgICAgICAgZ3JvdXBWZXJzaW9uOiAyLFxuICAgICAgICAgICAgc2hhcmVkR3JvdXBOYW1lczogW10sXG4gICAgICAgICAgfSksXG4gICAgICAgICAgQ2FsbE1vZGUuR3JvdXBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ3VwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3QgY2hhbmdlIGxvb2t1cHMgaWYgbm8gY29udmVyc2F0aW9ucyBwcm92aWRlZCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHModW5kZWZpbmVkLCB1bmRlZmluZWQsIHN0YXRlKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5RTE2NCxcbiAgICAgICAgICByZXN1bHQuY29udmVyc2F0aW9uc0J5RTE2NFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5VXVpZCxcbiAgICAgICAgICByZXN1bHQuY29udmVyc2F0aW9uc0J5VXVpZFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5R3JvdXBJZCxcbiAgICAgICAgICByZXN1bHQuY29udmVyc2F0aW9uc0J5R3JvdXBJZFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhZGRzIGFuZCByZW1vdmVzIGUxNjQtb25seSBjb250YWN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCByZW1vdmVkID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICAgICAgaWQ6ICdpZC1yZW1vdmVkJyxcbiAgICAgICAgICBlMTY0OiAnZTE2NC1yZW1vdmVkJyxcbiAgICAgICAgICB1dWlkOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zQnlFMTY0OiB7XG4gICAgICAgICAgICAnZTE2NC1yZW1vdmVkJzogcmVtb3ZlZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhZGRlZCA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnaWQtYWRkZWQnLFxuICAgICAgICAgIGUxNjQ6ICdlMTY0LWFkZGVkJyxcbiAgICAgICAgICB1dWlkOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IGV4cGVjdGVkID0ge1xuICAgICAgICAgICdlMTY0LWFkZGVkJzogYWRkZWQsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gdXBkYXRlQ29udmVyc2F0aW9uTG9va3VwcyhhZGRlZCwgcmVtb3ZlZCwgc3RhdGUpO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoYWN0dWFsLmNvbnZlcnNhdGlvbnNCeUUxNjQsIGV4cGVjdGVkKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIHN0YXRlLmNvbnZlcnNhdGlvbnNCeVV1aWQsXG4gICAgICAgICAgYWN0dWFsLmNvbnZlcnNhdGlvbnNCeVV1aWRcbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIHN0YXRlLmNvbnZlcnNhdGlvbnNCeUdyb3VwSWQsXG4gICAgICAgICAgYWN0dWFsLmNvbnZlcnNhdGlvbnNCeUdyb3VwSWRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnYWRkcyBhbmQgcmVtb3ZlcyB1dWlkLW9ubHkgY29udGFjdCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgcmVtb3ZlZCA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gICAgICAgICAgaWQ6ICdpZC1yZW1vdmVkJyxcbiAgICAgICAgICBlMTY0OiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zQnl1dWlkOiB7XG4gICAgICAgICAgICBbcmVtb3ZlZC51dWlkXTogcmVtb3ZlZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhZGRlZCA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gICAgICAgICAgaWQ6ICdpZC1hZGRlZCcsXG4gICAgICAgICAgZTE2NDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgICBbYWRkZWQudXVpZF06IGFkZGVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoYWRkZWQsIHJlbW92ZWQsIHN0YXRlKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5RTE2NCxcbiAgICAgICAgICBhY3R1YWwuY29udmVyc2F0aW9uc0J5RTE2NFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbC5jb252ZXJzYXRpb25zQnlVdWlkLCBleHBlY3RlZCk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBzdGF0ZS5jb252ZXJzYXRpb25zQnlHcm91cElkLFxuICAgICAgICAgIGFjdHVhbC5jb252ZXJzYXRpb25zQnlHcm91cElkXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2FkZHMgYW5kIHJlbW92ZXMgZ3JvdXBJZC1vbmx5IGNvbnRhY3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHJlbW92ZWQgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICBpZDogJ2lkLXJlbW92ZWQnLFxuICAgICAgICAgIGdyb3VwSWQ6ICdncm91cElkLXJlbW92ZWQnLFxuICAgICAgICAgIGUxNjQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICB1dWlkOiB1bmRlZmluZWQsXG4gICAgICAgIH0pO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb252ZXJzYXRpb25zQnlncm91cElkOiB7XG4gICAgICAgICAgICAnZ3JvdXBJZC1yZW1vdmVkJzogcmVtb3ZlZCxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhZGRlZCA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgICAgIGlkOiAnaWQtYWRkZWQnLFxuICAgICAgICAgIGdyb3VwSWQ6ICdncm91cElkLWFkZGVkJyxcbiAgICAgICAgICBlMTY0OiB1bmRlZmluZWQsXG4gICAgICAgICAgdXVpZDogdW5kZWZpbmVkLFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBleHBlY3RlZCA9IHtcbiAgICAgICAgICAnZ3JvdXBJZC1hZGRlZCc6IGFkZGVkLFxuICAgICAgICB9O1xuXG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHVwZGF0ZUNvbnZlcnNhdGlvbkxvb2t1cHMoYWRkZWQsIHJlbW92ZWQsIHN0YXRlKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5RTE2NCxcbiAgICAgICAgICBhY3R1YWwuY29udmVyc2F0aW9uc0J5RTE2NFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUuY29udmVyc2F0aW9uc0J5VXVpZCxcbiAgICAgICAgICBhY3R1YWwuY29udmVyc2F0aW9uc0J5VXVpZFxuICAgICAgICApO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbC5jb252ZXJzYXRpb25zQnlHcm91cElkLCBleHBlY3RlZCk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ3JlZHVjZXInLCAoKSA9PiB7XG4gICAgY29uc3QgdGltZSA9IERhdGUubm93KCk7XG4gICAgY29uc3QgcHJldmlvdXNUaW1lID0gdGltZSAtIDE7XG4gICAgY29uc3QgY29udmVyc2F0aW9uSWQgPSAnY29udmVyc2F0aW9uLWd1aWQtMSc7XG4gICAgY29uc3QgbWVzc2FnZUlkID0gJ21lc3NhZ2UtZ3VpZC0xJztcbiAgICBjb25zdCBtZXNzYWdlSWRUd28gPSAnbWVzc2FnZS1ndWlkLTInO1xuICAgIGNvbnN0IG1lc3NhZ2VJZFRocmVlID0gJ21lc3NhZ2UtZ3VpZC0zJztcbiAgICBjb25zdCBzb3VyY2VVdWlkID0gVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCk7XG5cbiAgICBmdW5jdGlvbiBnZXREZWZhdWx0TWVzc2FnZShpZDogc3RyaW5nKTogTWVzc2FnZVR5cGUge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgYXR0YWNobWVudHM6IFtdLFxuICAgICAgICBjb252ZXJzYXRpb25JZCxcbiAgICAgICAgaWQsXG4gICAgICAgIHJlY2VpdmVkX2F0OiBwcmV2aW91c1RpbWUsXG4gICAgICAgIHNlbnRfYXQ6IHByZXZpb3VzVGltZSxcbiAgICAgICAgc291cmNlOiAnc291cmNlJyxcbiAgICAgICAgc291cmNlVXVpZCxcbiAgICAgICAgdGltZXN0YW1wOiBwcmV2aW91c1RpbWUsXG4gICAgICAgIHR5cGU6ICdpbmNvbWluZycgYXMgY29uc3QsXG4gICAgICAgIHJlYWRTdGF0dXM6IFJlYWRTdGF0dXMuUmVhZCxcbiAgICAgIH07XG4gICAgfVxuXG4gICAgZnVuY3Rpb24gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbk1lc3NhZ2UoKTogQ29udmVyc2F0aW9uTWVzc2FnZVR5cGUge1xuICAgICAgcmV0dXJuIHtcbiAgICAgICAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6IDAsXG4gICAgICAgIG1lc3NhZ2VJZHM6IFtdLFxuICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgIH0sXG4gICAgICAgIHNjcm9sbFRvTWVzc2FnZUNvdW50ZXI6IDAsXG4gICAgICB9O1xuICAgIH1cblxuICAgIGRlc2NyaWJlKCdzaG93Q29udmVyc2F0aW9uJywgKCkgPT4ge1xuICAgICAgaXQoJ3NlbGVjdHMgYSBjb252ZXJzYXRpb24gaWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0NvbnZlcnNhdGlvbih7IGNvbnZlcnNhdGlvbklkOiAnYWJjMTIzJyB9KTtcbiAgICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwobmV4dFN0YXRlLnNlbGVjdGVkQ29udmVyc2F0aW9uSWQsICdhYmMxMjMnKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKG5leHRTdGF0ZS5zZWxlY3RlZE1lc3NhZ2UpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzZWxlY3RzIGEgY29udmVyc2F0aW9uIGFuZCBhIG1lc3NhZ2UnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0NvbnZlcnNhdGlvbih7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICAgIG1lc3NhZ2VJZDogJ3h5ejk4NycsXG4gICAgICAgIH0pO1xuICAgICAgICBjb25zdCBuZXh0U3RhdGUgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5lcXVhbChuZXh0U3RhdGUuc2VsZWN0ZWRDb252ZXJzYXRpb25JZCwgJ2FiYzEyMycpO1xuICAgICAgICBhc3NlcnQuZXF1YWwobmV4dFN0YXRlLnNlbGVjdGVkTWVzc2FnZSwgJ3h5ejk4NycpO1xuICAgICAgfSk7XG5cbiAgICAgIGRlc2NyaWJlKCdzaG93Q29udmVyc2F0aW9uIHN3aXRjaFRvQXNzb2NpYXRlZFZpZXc9dHJ1ZScsICgpID0+IHtcbiAgICAgICAgbGV0IGFjdGlvbjogU2VsZWN0ZWRDb252ZXJzYXRpb25DaGFuZ2VkQWN0aW9uVHlwZTtcblxuICAgICAgICBiZWZvcmVFYWNoKCgpID0+IHtcbiAgICAgICAgICBhY3Rpb24gPSBzaG93Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbklkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgc3dpdGNoVG9Bc3NvY2lhdGVkVmlldzogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cbiAgICAgICAgaXQoJ3Nob3dzIHRoZSBpbmJveCBpZiB0aGUgY29udmVyc2F0aW9uIGlzIG5vdCBhcmNoaXZlZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGlkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgIH0pO1xuICAgICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgICAgIFtjb252ZXJzYXRpb24uaWRdOiBjb252ZXJzYXRpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH07XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuY29tcG9zZXIpO1xuICAgICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICB9KTtcblxuICAgICAgICBpdCgnc2hvd3MgdGhlIGFyY2hpdmUgaWYgdGhlIGNvbnZlcnNhdGlvbiBpcyBhcmNoaXZlZCcsICgpID0+IHtcbiAgICAgICAgICBjb25zdCBjb252ZXJzYXRpb24gPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uKHtcbiAgICAgICAgICAgIGlkOiAnZmFrZS1jb252ZXJzYXRpb24taWQnLFxuICAgICAgICAgICAgaXNBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgICB9KTtcbiAgICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbkxvb2t1cDoge1xuICAgICAgICAgICAgICBbY29udmVyc2F0aW9uLmlkXTogY29udmVyc2F0aW9uLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9O1xuICAgICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzdWx0LmNvbXBvc2VyKTtcbiAgICAgICAgICBhc3NlcnQuaXNUcnVlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NMRUFSX0dST1VQX0NSRUFUSU9OX0VSUk9SJywgKCkgPT4ge1xuICAgICAgaXQoJ2NsZWFycyB0aGUgZ3JvdXAgY3JlYXRpb24gZXJyb3InLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgaGFzRXJyb3I6IHRydWUgYXMgY29uc3QsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2xlYXJHcm91cENyZWF0aW9uRXJyb3IoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyPy5zdGVwID09PSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YSAmJlxuICAgICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLmhhc0Vycm9yID09PSBmYWxzZVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnQ0xFQVJfSU5WSVRFRF9VVUlEU19GT1JfTkVXTFlfQ1JFQVRFRF9HUk9VUCcsICgpID0+IHtcbiAgICAgIGl0KCdjbGVhcnMgdGhlIGxpc3Qgb2YgaW52aXRlZCBjb252ZXJzYXRpb24gVVVJRHMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBpbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cDogW1xuICAgICAgICAgICAgVVVJRC5nZW5lcmF0ZSgpLnRvU3RyaW5nKCksXG4gICAgICAgICAgICBVVUlELmdlbmVyYXRlKCkudG9TdHJpbmcoKSxcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjbGVhckludml0ZWRVdWlkc0Zvck5ld2x5Q3JlYXRlZEdyb3VwKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC5pbnZpdGVkVXVpZHNGb3JOZXdseUNyZWF0ZWRHcm91cCk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdDTE9TRV9DT05UQUNUX1NQT09GSU5HX1JFVklFVycsICgpID0+IHtcbiAgICAgIGl0KCdjbG9zZXMgdGhlIGNvbnRhY3Qgc3Bvb2ZpbmcgcmV2aWV3IG1vZGFsIGlmIGl0IHdhcyBvcGVuJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udGFjdFNwb29maW5nUmV2aWV3OiB7XG4gICAgICAgICAgICB0eXBlOiBDb250YWN0U3Bvb2ZpbmdUeXBlLkRpcmVjdENvbnZlcnNhdGlvbldpdGhTYW1lVGl0bGUgYXMgY29uc3QsXG4gICAgICAgICAgICBzYWZlQ29udmVyc2F0aW9uSWQ6ICdhYmMxMjMnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNsb3NlQ29udGFjdFNwb29maW5nUmV2aWV3KCk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKGFjdHVhbC5jb250YWN0U3Bvb2ZpbmdSZXZpZXcpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KFwiZG9lcyBub3RoaW5nIGlmIHRoZSBtb2RhbCB3YXNuJ3QgYWxyZWFkeSBvcGVuXCIsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNsb3NlQ29udGFjdFNwb29maW5nUmV2aWV3KCk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NMT1NFX01BWElNVU1fR1JPVVBfU0laRV9NT0RBTCcsICgpID0+IHtcbiAgICAgIGl0KCdjbG9zZXMgdGhlIG1heGltdW0gZ3JvdXAgc2l6ZSBtb2RhbCBpZiBpdCB3YXMgb3BlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIG1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93aW5nLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNsb3NlTWF4aW11bUdyb3VwU2l6ZU1vZGFsKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIHJlc3VsdC5jb21wb3Nlcj8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLkNob29zZUdyb3VwTWVtYmVycyAmJlxuICAgICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLm1heGltdW1Hcm91cFNpemVNb2RhbFN0YXRlID09PVxuICAgICAgICAgICAgICBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93bixcbiAgICAgICAgICAnRXhwZWN0ZWQgdGhlIG1vZGFsIHRvIGJlIGNsb3NlZCdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBtYXhpbXVtIGdyb3VwIHNpemUgbW9kYWwgd2FzIG5ldmVyIHNob3duJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjbG9zZU1heGltdW1Hcm91cFNpemVNb2RhbCgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSBtYXhpbXVtIGdyb3VwIHNpemUgbW9kYWwgYWxyZWFkeSBjbG9zZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2xvc2VNYXhpbXVtR3JvdXBTaXplTW9kYWwoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwocmVzdWx0LCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdDTE9TRV9SRUNPTU1FTkRFRF9HUk9VUF9TSVpFX01PREFMJywgKCkgPT4ge1xuICAgICAgaXQoJ2Nsb3NlcyB0aGUgcmVjb21tZW5kZWQgZ3JvdXAgc2l6ZSBtb2RhbCBpZiBpdCB3YXMgb3BlbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd2luZyxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBjbG9zZVJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWwoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyPy5zdGVwID09PSBDb21wb3NlclN0ZXAuQ2hvb3NlR3JvdXBNZW1iZXJzICYmXG4gICAgICAgICAgICByZXN1bHQuY29tcG9zZXIucmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlID09PVxuICAgICAgICAgICAgICBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93bixcbiAgICAgICAgICAnRXhwZWN0ZWQgdGhlIG1vZGFsIHRvIGJlIGNsb3NlZCdcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIHRoZSByZWNvbW1lbmRlZCBncm91cCBzaXplIG1vZGFsIHdhcyBuZXZlciBzaG93bicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gY2xvc2VSZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgdGhlIHJlY29tbWVuZGVkIGdyb3VwIHNpemUgbW9kYWwgYWxyZWFkeSBjbG9zZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlLlNob3duLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGNsb3NlUmVjb21tZW5kZWRHcm91cFNpemVNb2RhbCgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ2NyZWF0ZUdyb3VwJywgKCkgPT4ge1xuICAgICAgY29uc3QgY29udmVyc2F0aW9uc1N0YXRlID0ge1xuICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbJ2FiYzEyMyddLFxuICAgICAgICAgIGdyb3VwTmFtZTogJ0ZvbyBCYXIgR3JvdXAnLFxuICAgICAgICAgIGdyb3VwQXZhdGFyOiBuZXcgVWludDhBcnJheShbMSwgMiwgM10pLFxuICAgICAgICB9LFxuICAgICAgfTtcblxuICAgICAgaXQoJ2ltbWVkaWF0ZWx5IGRpc3BhdGNoZXMgYSBDUkVBVEVfR1JPVVBfUEVORElORyBhY3Rpb24sIHdoaWNoIHB1dHMgdGhlIGNvbXBvc2VyIGluIGEgbG9hZGluZyBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICBjcmVhdGVHcm91cCgpKFxuICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICgpID0+ICh7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uczogY29udmVyc2F0aW9uc1N0YXRlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkT25jZShkaXNwYXRjaCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7IHR5cGU6ICdDUkVBVEVfR1JPVVBfUEVORElORycgfSk7XG5cbiAgICAgICAgY29uc3QgYWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgwKS5hcmdzWzBdO1xuXG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoY29udmVyc2F0aW9uc1N0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydChcbiAgICAgICAgICByZXN1bHQuY29tcG9zZXI/LnN0ZXAgPT09IENvbXBvc2VyU3RlcC5TZXRHcm91cE1ldGFkYXRhICYmXG4gICAgICAgICAgICByZXN1bHQuY29tcG9zZXIuaXNDcmVhdGluZyAmJlxuICAgICAgICAgICAgIXJlc3VsdC5jb21wb3Nlci5oYXNFcnJvclxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjYWxscyBncm91cHMuY3JlYXRlR3JvdXBWMicsIGFzeW5jICgpID0+IHtcbiAgICAgICAgYXdhaXQgY3JlYXRlR3JvdXAoY3JlYXRlR3JvdXBTdHViKShcbiAgICAgICAgICBzaW5vbi5zcHkoKSxcbiAgICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IGNvbnZlcnNhdGlvbnNTdGF0ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZE9uY2UoY3JlYXRlR3JvdXBTdHViKTtcbiAgICAgICAgc2lub24uYXNzZXJ0LmNhbGxlZFdpdGgoY3JlYXRlR3JvdXBTdHViLCB7XG4gICAgICAgICAgbmFtZTogJ0ZvbyBCYXIgR3JvdXAnLFxuICAgICAgICAgIGF2YXRhcjogbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKSxcbiAgICAgICAgICBhdmF0YXJzOiBbXSxcbiAgICAgICAgICBleHBpcmVUaW1lcjogMCxcbiAgICAgICAgICBjb252ZXJzYXRpb25JZHM6IFsnYWJjMTIzJ10sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KFwidHJpbXMgdGhlIGdyb3VwJ3MgdGl0bGUgYmVmb3JlIGNhbGxpbmcgZ3JvdXBzLmNyZWF0ZUdyb3VwVjJcIiwgYXN5bmMgKCkgPT4ge1xuICAgICAgICBhd2FpdCBjcmVhdGVHcm91cChjcmVhdGVHcm91cFN0dWIpKFxuICAgICAgICAgIHNpbm9uLnNweSgpLFxuICAgICAgICAgICgpID0+ICh7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uczoge1xuICAgICAgICAgICAgICAuLi5jb252ZXJzYXRpb25zU3RhdGUsXG4gICAgICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAgICAgLi4uY29udmVyc2F0aW9uc1N0YXRlLmNvbXBvc2VyLFxuICAgICAgICAgICAgICAgIGdyb3VwTmFtZTogJyAgVG8gIFRyaW0gXFx0JyxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKFxuICAgICAgICAgIGNyZWF0ZUdyb3VwU3R1YixcbiAgICAgICAgICBzaW5vbi5tYXRjaCh7IG5hbWU6ICdUbyAgVHJpbScgfSlcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGlzcGF0Y2hlcyBhIENSRUFURV9HUk9VUF9SRUpFQ1RFRCBhY3Rpb24gaWYgZ3JvdXAgY3JlYXRpb24gZmFpbHMsIHdoaWNoIG1hcmtzIHRoZSBzdGF0ZSB3aXRoIGFuIGVycm9yJywgYXN5bmMgKCkgPT4ge1xuICAgICAgICBjcmVhdGVHcm91cFN0dWIucmVqZWN0cyhuZXcgRXJyb3IoJ3VoIG9oJykpO1xuXG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgY29uc3QgY3JlYXRlR3JvdXBQcm9taXNlID0gY3JlYXRlR3JvdXAoY3JlYXRlR3JvdXBTdHViKShcbiAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IGNvbnZlcnNhdGlvbnNTdGF0ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcGVuZGluZ0FjdGlvbiA9IGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcbiAgICAgICAgY29uc3Qgc3RhdGVBZnRlclBlbmRpbmcgPSByZWR1Y2VyKGNvbnZlcnNhdGlvbnNTdGF0ZSwgcGVuZGluZ0FjdGlvbik7XG5cbiAgICAgICAgYXdhaXQgY3JlYXRlR3JvdXBQcm9taXNlO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRUd2ljZShkaXNwYXRjaCk7XG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7IHR5cGU6ICdDUkVBVEVfR1JPVVBfUkVKRUNURUQnIH0pO1xuXG4gICAgICAgIGNvbnN0IHJlamVjdGVkQWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgxKS5hcmdzWzBdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlQWZ0ZXJQZW5kaW5nLCByZWplY3RlZEFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIHJlc3VsdC5jb21wb3Nlcj8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEgJiZcbiAgICAgICAgICAgICFyZXN1bHQuY29tcG9zZXIuaXNDcmVhdGluZyAmJlxuICAgICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLmhhc0Vycm9yXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJ3aGVuIHJlamVjdGluZywgZG9lcyBub3RoaW5nIHRvIHRoZSBsZWZ0IHBhbmUgaWYgaXQncyBubyBsb25nZXIgaW4gdGhpcyBjb21wb3NlciBzdGF0ZVwiLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGNyZWF0ZUdyb3VwU3R1Yi5yZWplY3RzKG5ldyBFcnJvcigndWggb2gnKSk7XG5cbiAgICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcblxuICAgICAgICBjb25zdCBjcmVhdGVHcm91cFByb21pc2UgPSBjcmVhdGVHcm91cChjcmVhdGVHcm91cFN0dWIpKFxuICAgICAgICAgIGRpc3BhdGNoLFxuICAgICAgICAgICgpID0+ICh7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVJvb3RTdGF0ZSgpLFxuICAgICAgICAgICAgY29udmVyc2F0aW9uczogY29udmVyc2F0aW9uc1N0YXRlLFxuICAgICAgICAgIH0pLFxuICAgICAgICAgIG51bGxcbiAgICAgICAgKTtcblxuICAgICAgICBhd2FpdCBjcmVhdGVHcm91cFByb21pc2U7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IHJlamVjdGVkQWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgxKS5hcmdzWzBdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCByZWplY3RlZEFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkaXNwYXRjaGVzIGEgQ1JFQVRFX0dST1VQX0ZVTEZJTExFRCBldmVudCAod2hpY2ggdXBkYXRlcyB0aGUgbmV3bHktY3JlYXRlZCBjb252ZXJzYXRpb24gSURzKSwgdHJpZ2dlcnMgYSBzaG93Q29udmVyc2F0aW9uIGV2ZW50IGFuZCBzd2l0Y2hlcyB0byB0aGUgYXNzb2NpYXRlZCBjb252ZXJzYXRpb24gb24gc3VjY2VzcycsIGFzeW5jICgpID0+IHtcbiAgICAgICAgY29uc3QgYWJjID0gVVVJRC5mcm9tUHJlZml4KCdhYmMnKS50b1N0cmluZygpO1xuICAgICAgICBjcmVhdGVHcm91cFN0dWIucmVzb2x2ZXMoe1xuICAgICAgICAgIGlkOiAnOTg3NicsXG4gICAgICAgICAgZ2V0OiAoa2V5OiBzdHJpbmcpID0+IHtcbiAgICAgICAgICAgIGlmIChrZXkgIT09ICdwZW5kaW5nTWVtYmVyc1YyJykge1xuICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1RoaXMgZ2V0dGVyIGlzIG5vdCBzZXQgdXAgZm9yIHRoaXMgdGVzdCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIFt7IHV1aWQ6IGFiYyB9XTtcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBjb25zdCBkaXNwYXRjaCA9IHNpbm9uLnNweSgpO1xuXG4gICAgICAgIGF3YWl0IGNyZWF0ZUdyb3VwKGNyZWF0ZUdyb3VwU3R1YikoXG4gICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgICBjb252ZXJzYXRpb25zOiBjb252ZXJzYXRpb25zU3RhdGUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRXaXRoKGRpc3BhdGNoLCB7XG4gICAgICAgICAgdHlwZTogJ0NSRUFURV9HUk9VUF9GVUxGSUxMRUQnLFxuICAgICAgICAgIHBheWxvYWQ6IHsgaW52aXRlZFV1aWRzOiBbYWJjXSB9LFxuICAgICAgICB9KTtcblxuICAgICAgICBzaW5vbi5hc3NlcnQuY2FsbGVkV2l0aChkaXNwYXRjaCwge1xuICAgICAgICAgIHR5cGU6IFNFTEVDVEVEX0NPTlZFUlNBVElPTl9DSEFOR0VELFxuICAgICAgICAgIHBheWxvYWQ6IHtcbiAgICAgICAgICAgIGlkOiAnOTg3NicsXG4gICAgICAgICAgICBtZXNzYWdlSWQ6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHN3aXRjaFRvQXNzb2NpYXRlZFZpZXc6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG5cbiAgICAgICAgY29uc3QgZnVsZmlsbGVkQWN0aW9uID0gZGlzcGF0Y2guZ2V0Q2FsbCgxKS5hcmdzWzBdO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKGNvbnZlcnNhdGlvbnNTdGF0ZSwgZnVsZmlsbGVkQWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuaW52aXRlZFV1aWRzRm9yTmV3bHlDcmVhdGVkR3JvdXAsIFthYmNdKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ0NPTlZFUlNBVElPTl9TVE9QUEVEX0JZX01JU1NJTkdfVkVSSUZJQ0FUSU9OJywgKCkgPT4ge1xuICAgICAgaXQoJ2FkZHMgdG8gc3RhdGUsIHJlbW92aW5nIGR1cGxpY2F0ZXMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGZpcnN0ID0gcmVkdWNlcihcbiAgICAgICAgICBnZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZvIEEnLFxuICAgICAgICAgICAgdW50cnVzdGVkVXVpZHM6IFsnY29udm8gMSddLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHNlY29uZCA9IHJlZHVjZXIoXG4gICAgICAgICAgZmlyc3QsXG4gICAgICAgICAgY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZvIEEnLFxuICAgICAgICAgICAgdW50cnVzdGVkVXVpZHM6IFsnY29udm8gMiddLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG4gICAgICAgIGNvbnN0IHRoaXJkID0gcmVkdWNlcihcbiAgICAgICAgICBzZWNvbmQsXG4gICAgICAgICAgY29udmVyc2F0aW9uU3RvcHBlZEJ5TWlzc2luZ1ZlcmlmaWNhdGlvbih7XG4gICAgICAgICAgICBjb252ZXJzYXRpb25JZDogJ2NvbnZvIEEnLFxuICAgICAgICAgICAgdW50cnVzdGVkVXVpZHM6IFsnY29udm8gMScsICdjb252byAzJ10sXG4gICAgICAgICAgfSlcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKHRoaXJkLnZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbiwge1xuICAgICAgICAgICdjb252byBBJzoge1xuICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuUGVuZGluZ1ZlcmlmaWNhdGlvbixcbiAgICAgICAgICAgIHV1aWRzTmVlZGluZ1ZlcmlmaWNhdGlvbjogWydjb252byAxJywgJ2NvbnZvIDInLCAnY29udm8gMyddLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzdG9tcHMgb24gVmVyaWZpY2F0aW9uQ2FuY2VsbGVkIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuVmVyaWZpY2F0aW9uQ2FuY2VsbGVkLFxuICAgICAgICAgICAgICBjYW5jZWxlZEF0OiBEYXRlLm5vdygpLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3R1YWwgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGNvbnZlcnNhdGlvblN0b3BwZWRCeU1pc3NpbmdWZXJpZmljYXRpb24oe1xuICAgICAgICAgICAgY29udmVyc2F0aW9uSWQ6ICdjb252byBBJyxcbiAgICAgICAgICAgIHVudHJ1c3RlZFV1aWRzOiBbJ2NvbnZvIDEnLCAnY29udm8gMiddLFxuICAgICAgICAgIH0pXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3R1YWwudmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLCB7XG4gICAgICAgICAgJ2NvbnZvIEEnOiB7XG4gICAgICAgICAgICB0eXBlOiBDb252ZXJzYXRpb25WZXJpZmljYXRpb25TdGF0ZS5QZW5kaW5nVmVyaWZpY2F0aW9uLFxuICAgICAgICAgICAgdXVpZHNOZWVkaW5nVmVyaWZpY2F0aW9uOiBbJ2NvbnZvIDEnLCAnY29udm8gMiddLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnQ0FOQ0VMX0NPTlZFUlNBVElPTl9QRU5ESU5HX1ZFUklGSUNBVElPTicsICgpID0+IHtcbiAgICAgIGZ1bmN0aW9uIGdldEFjdGlvbihcbiAgICAgICAgdGltZXN0YW1wOiBudW1iZXIsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNTdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZVxuICAgICAgKTogQ2FuY2VsVmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uQWN0aW9uVHlwZSB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgY2FuY2VsQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uKHRpbWVzdGFtcCkoXG4gICAgICAgICAgZGlzcGF0Y2gsXG4gICAgICAgICAgKCkgPT4gKHtcbiAgICAgICAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICAgICAgICBjb252ZXJzYXRpb25zOiBjb252ZXJzYXRpb25zU3RhdGUsXG4gICAgICAgICAgfSksXG4gICAgICAgICAgbnVsbFxuICAgICAgICApO1xuXG4gICAgICAgIHJldHVybiBkaXNwYXRjaC5nZXRDYWxsKDApLmFyZ3NbMF07XG4gICAgICB9XG5cbiAgICAgIGl0KCdyZXBsYWNlcyBleGlzdGluZyBQZW5kaW5nVmVyaWZpY2F0aW9uIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuUGVuZGluZ1ZlcmlmaWNhdGlvbixcbiAgICAgICAgICAgICAgdXVpZHNOZWVkaW5nVmVyaWZpY2F0aW9uOiBbJ2NvbnZvIDEnLCAnY29udm8gMiddLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24obm93LCBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3R1YWwudmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uLCB7XG4gICAgICAgICAgJ2NvbnZvIEEnOiB7XG4gICAgICAgICAgICB0eXBlOiBDb252ZXJzYXRpb25WZXJpZmljYXRpb25TdGF0ZS5WZXJpZmljYXRpb25DYW5jZWxsZWQsXG4gICAgICAgICAgICBjYW5jZWxlZEF0OiBub3csXG4gICAgICAgICAgfSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3VwZGF0ZXMgdGltZXN0YW1wIGZvciBleGlzdGluZyBWZXJpZmljYXRpb25DYW5jZWxsZWQgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG5vdyA9IERhdGUubm93KCk7XG4gICAgICAgIGNvbnN0IHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICB2ZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgICdjb252byBBJzoge1xuICAgICAgICAgICAgICB0eXBlOiBDb252ZXJzYXRpb25WZXJpZmljYXRpb25TdGF0ZS5WZXJpZmljYXRpb25DYW5jZWxsZWQsXG4gICAgICAgICAgICAgIGNhbmNlbGVkQXQ6IG5vdyAtIDEsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGdldEFjdGlvbihub3csIHN0YXRlKTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdHVhbC52ZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb24sIHtcbiAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlZlcmlmaWNhdGlvbkNhbmNlbGxlZCxcbiAgICAgICAgICAgIGNhbmNlbGVkQXQ6IG5vdyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgndXNlcyBuZXdlc3QgdGltZXN0YW1wIHdoZW4gdXBkYXRpbmcgZXhpc3RpbmcgVmVyaWZpY2F0aW9uQ2FuY2VsbGVkIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuVmVyaWZpY2F0aW9uQ2FuY2VsbGVkLFxuICAgICAgICAgICAgICBjYW5jZWxlZEF0OiBub3csXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGdldEFjdGlvbihub3csIHN0YXRlKTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdHVhbC52ZXJpZmljYXRpb25EYXRhQnlDb252ZXJzYXRpb24sIHtcbiAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlZlcmlmaWNhdGlvbkNhbmNlbGxlZCxcbiAgICAgICAgICAgIGNhbmNlbGVkQXQ6IG5vdyxcbiAgICAgICAgICB9LFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIG5vIGV4aXN0aW5nIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKERhdGUubm93KCksIHN0YXRlKTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0dWFsLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdDQU5DRUxfQ09OVkVSU0FUSU9OX1BFTkRJTkdfVkVSSUZJQ0FUSU9OJywgKCkgPT4ge1xuICAgICAgaXQoJ3JlbW92ZXMgZXhpc3RpbmcgVmVyaWZpY2F0aW9uQ2FuY2VsbGVkIHN0YXRlJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBub3cgPSBEYXRlLm5vdygpO1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgdmVyaWZpY2F0aW9uRGF0YUJ5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICAnY29udm8gQSc6IHtcbiAgICAgICAgICAgICAgdHlwZTogQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uU3RhdGUuVmVyaWZpY2F0aW9uQ2FuY2VsbGVkLFxuICAgICAgICAgICAgICBjYW5jZWxlZEF0OiBub3csXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGUsXG4gICAgICAgICAgY2xlYXJDYW5jZWxsZWRDb252ZXJzYXRpb25WZXJpZmljYXRpb24oJ2NvbnZvIEEnKVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwU3RyaWN0RXF1YWwoYWN0dWFsLnZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbiwge30pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdsZWF2ZXMgZXhpc3RpbmcgUGVuZGluZ1ZlcmlmaWNhdGlvbiBzdGF0ZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIHZlcmlmaWNhdGlvbkRhdGFCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgICAgJ2NvbnZvIEEnOiB7XG4gICAgICAgICAgICAgIHR5cGU6IENvbnZlcnNhdGlvblZlcmlmaWNhdGlvblN0YXRlLlBlbmRpbmdWZXJpZmljYXRpb24sXG4gICAgICAgICAgICAgIHV1aWRzTmVlZGluZ1ZlcmlmaWNhdGlvbjogWydjb252byAxJywgJ2NvbnZvIDInXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihcbiAgICAgICAgICBzdGF0ZSxcbiAgICAgICAgICBjbGVhckNhbmNlbGxlZENvbnZlcnNhdGlvblZlcmlmaWNhdGlvbignY29udm8gQScpXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBTdHJpY3RFcXVhbChhY3R1YWwsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIHdpdGggZW1wdHkgc3RhdGUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlID0gZ2V0RW1wdHlTdGF0ZSgpO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXRlLFxuICAgICAgICAgIGNsZWFyQ2FuY2VsbGVkQ29udmVyc2F0aW9uVmVyaWZpY2F0aW9uKCdjb252byBBJylcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZGVlcFN0cmljdEVxdWFsKGFjdHVhbCwgc3RhdGUpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnUkVQQUlSX05FV0VTVF9NRVNTQUdFJywgKCkgPT4ge1xuICAgICAgaXQoJ3VwZGF0ZXMgbmV3ZXN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSByZXBhaXJOZXdlc3RNZXNzYWdlKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgY29uc3Qgc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgICAgICBbbWVzc2FnZUlkXToge1xuICAgICAgICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgICAgICByZWNlaXZlZF9hdDogdGltZSxcbiAgICAgICAgICAgICAgc2VudF9hdDogdGltZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb25NZXNzYWdlKCksXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZHM6IFttZXNzYWdlSWRUaHJlZSwgbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRdLFxuICAgICAgICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZXhwZWN0ZWQ6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgICAgICBbbWVzc2FnZUlkXToge1xuICAgICAgICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgICAgICByZWNlaXZlZF9hdDogdGltZSxcbiAgICAgICAgICAgICAgc2VudF9hdDogdGltZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb25NZXNzYWdlKCksXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZHM6IFttZXNzYWdlSWRUaHJlZSwgbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRdLFxuICAgICAgICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgICAgICAgICAgbmV3ZXN0OiB7XG4gICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZUlkLFxuICAgICAgICAgICAgICAgICAgcmVjZWl2ZWRfYXQ6IHRpbWUsXG4gICAgICAgICAgICAgICAgICBzZW50X2F0OiB0aW1lLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2xlYXJzIG5ld2VzdCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmVwYWlyTmV3ZXN0TWVzc2FnZShjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIGNvbnN0IHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBtZXNzYWdlc0xvb2t1cDoge1xuICAgICAgICAgICAgW21lc3NhZ2VJZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2UobWVzc2FnZUlkKSxcbiAgICAgICAgICAgICAgcmVjZWl2ZWRfYXQ6IHRpbWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgICAuLi5nZXREZWZhdWx0Q29udmVyc2F0aW9uTWVzc2FnZSgpLFxuICAgICAgICAgICAgICBtZXNzYWdlSWRzOiBbXSxcbiAgICAgICAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgICAgICAgIHRvdGFsVW5zZWVuOiAwLFxuICAgICAgICAgICAgICAgIG5ld2VzdDoge1xuICAgICAgICAgICAgICAgICAgaWQ6IG1lc3NhZ2VJZCxcbiAgICAgICAgICAgICAgICAgIHJlY2VpdmVkX2F0OiB0aW1lLFxuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgZXhwZWN0ZWQ6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgICAgICBbbWVzc2FnZUlkXToge1xuICAgICAgICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgICAgICByZWNlaXZlZF9hdDogdGltZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb25NZXNzYWdlKCksXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZHM6IFtdLFxuICAgICAgICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgICAgICAgbmV3ZXN0OiB1bmRlZmluZWQsXG4gICAgICAgICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwsIGV4cGVjdGVkKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgncmV0dXJucyBzdGF0ZSBpZiBjb252ZXJzYXRpb24gbm90IHByZXNlbnQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHJlcGFpck5ld2VzdE1lc3NhZ2UoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZXF1YWwoYWN0dWFsLCBzdGF0ZSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdSRVBBSVJfT0xERVNUX01FU1NBR0UnLCAoKSA9PiB7XG4gICAgICBpdCgndXBkYXRlcyBvbGRlc3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHJlcGFpck9sZGVzdE1lc3NhZ2UoY29udmVyc2F0aW9uSWQpO1xuICAgICAgICBjb25zdCBzdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgbWVzc2FnZXNMb29rdXA6IHtcbiAgICAgICAgICAgIFttZXNzYWdlSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlKG1lc3NhZ2VJZCksXG4gICAgICAgICAgICAgIHJlY2VpdmVkX2F0OiB0aW1lLFxuICAgICAgICAgICAgICBzZW50X2F0OiB0aW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbk1lc3NhZ2UoKSxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkczogW21lc3NhZ2VJZCwgbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRUaHJlZV0sXG4gICAgICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBleHBlY3RlZDogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgbWVzc2FnZXNMb29rdXA6IHtcbiAgICAgICAgICAgIFttZXNzYWdlSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlKG1lc3NhZ2VJZCksXG4gICAgICAgICAgICAgIHJlY2VpdmVkX2F0OiB0aW1lLFxuICAgICAgICAgICAgICBzZW50X2F0OiB0aW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbk1lc3NhZ2UoKSxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkczogW21lc3NhZ2VJZCwgbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRUaHJlZV0sXG4gICAgICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICAgICAgICBvbGRlc3Q6IHtcbiAgICAgICAgICAgICAgICAgIGlkOiBtZXNzYWdlSWQsXG4gICAgICAgICAgICAgICAgICByZWNlaXZlZF9hdDogdGltZSxcbiAgICAgICAgICAgICAgICAgIHNlbnRfYXQ6IHRpbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhY3R1YWwgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdjbGVhcnMgb2xkZXN0JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBhY3Rpb24gPSByZXBhaXJPbGRlc3RNZXNzYWdlKGNvbnZlcnNhdGlvbklkKTtcbiAgICAgICAgY29uc3Qgc3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIG1lc3NhZ2VzTG9va3VwOiB7XG4gICAgICAgICAgICBbbWVzc2FnZUlkXToge1xuICAgICAgICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgICAgICByZWNlaXZlZF9hdDogdGltZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgICBbY29udmVyc2F0aW9uSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRDb252ZXJzYXRpb25NZXNzYWdlKCksXG4gICAgICAgICAgICAgIG1lc3NhZ2VJZHM6IFtdLFxuICAgICAgICAgICAgICBtZXRyaWNzOiB7XG4gICAgICAgICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgICAgICAgICAgb2xkZXN0OiB7XG4gICAgICAgICAgICAgICAgICBpZDogbWVzc2FnZUlkLFxuICAgICAgICAgICAgICAgICAgcmVjZWl2ZWRfYXQ6IHRpbWUsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBleHBlY3RlZDogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgbWVzc2FnZXNMb29rdXA6IHtcbiAgICAgICAgICAgIFttZXNzYWdlSWRdOiB7XG4gICAgICAgICAgICAgIC4uLmdldERlZmF1bHRNZXNzYWdlKG1lc3NhZ2VJZCksXG4gICAgICAgICAgICAgIHJlY2VpdmVkX2F0OiB0aW1lLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICAgIG1lc3NhZ2VzQnlDb252ZXJzYXRpb246IHtcbiAgICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbk1lc3NhZ2UoKSxcbiAgICAgICAgICAgICAgbWVzc2FnZUlkczogW10sXG4gICAgICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgICAgICBvbGRlc3Q6IHVuZGVmaW5lZCxcbiAgICAgICAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcblxuICAgICAgICBjb25zdCBhY3R1YWwgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbCwgZXhwZWN0ZWQpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHN0YXRlIGlmIGNvbnZlcnNhdGlvbiBub3QgcHJlc2VudCcsICgpID0+IHtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmVwYWlyT2xkZXN0TWVzc2FnZShjb252ZXJzYXRpb25JZCk7XG4gICAgICAgIGNvbnN0IHN0YXRlOiBDb252ZXJzYXRpb25zU3RhdGVUeXBlID0gZ2V0RW1wdHlTdGF0ZSgpO1xuICAgICAgICBjb25zdCBhY3R1YWwgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5lcXVhbChhY3R1YWwsIHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1JFVklFV19HUk9VUF9NRU1CRVJfTkFNRV9DT0xMSVNJT04nLCAoKSA9PiB7XG4gICAgICBpdCgnc3RhcnRzIHJldmlld2luZyBhIGdyb3VwIG1lbWJlciBuYW1lIGNvbGxpc2lvbicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHJldmlld0dyb3VwTWVtYmVyTmFtZUNvbGxpc2lvbignYWJjMTIzJyk7XG4gICAgICAgIGNvbnN0IGFjdHVhbCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChhY3R1YWwuY29udGFjdFNwb29maW5nUmV2aWV3LCB7XG4gICAgICAgICAgdHlwZTogQ29udGFjdFNwb29maW5nVHlwZS5NdWx0aXBsZUdyb3VwTWVtYmVyc1dpdGhTYW1lVGl0bGUgYXMgY29uc3QsXG4gICAgICAgICAgZ3JvdXBDb252ZXJzYXRpb25JZDogJ2FiYzEyMycsXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnUkVWSUVXX01FU1NBR0VfUkVRVUVTVF9OQU1FX0NPTExJU0lPTicsICgpID0+IHtcbiAgICAgIGl0KCdzdGFydHMgcmV2aWV3aW5nIGEgbWVzc2FnZSByZXF1ZXN0IG5hbWUgY29sbGlzaW9uJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gcmV2aWV3TWVzc2FnZVJlcXVlc3ROYW1lQ29sbGlzaW9uKHtcbiAgICAgICAgICBzYWZlQ29udmVyc2F0aW9uSWQ6ICdkZWYnLFxuICAgICAgICB9KTtcbiAgICAgICAgY29uc3QgYWN0dWFsID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKGFjdHVhbC5jb250YWN0U3Bvb2ZpbmdSZXZpZXcsIHtcbiAgICAgICAgICB0eXBlOiBDb250YWN0U3Bvb2ZpbmdUeXBlLkRpcmVjdENvbnZlcnNhdGlvbldpdGhTYW1lVGl0bGUgYXMgY29uc3QsXG4gICAgICAgICAgc2FmZUNvbnZlcnNhdGlvbklkOiAnZGVmJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdTRVRfQ09NUE9TRV9HUk9VUF9BVkFUQVInLCAoKSA9PiB7XG4gICAgICBpdChcImNhbiBjbGVhciB0aGUgY29tcG9zZXIncyBncm91cCBhdmF0YXJcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIGdyb3VwQXZhdGFyOiBuZXcgVWludDhBcnJheSgyKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzZXRDb21wb3NlR3JvdXBBdmF0YXIodW5kZWZpbmVkKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyPy5zdGVwID09PSBDb21wb3NlclN0ZXAuU2V0R3JvdXBNZXRhZGF0YSAmJlxuICAgICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLmdyb3VwQXZhdGFyID09PSB1bmRlZmluZWRcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdChcImNhbiBzZXQgdGhlIGNvbXBvc2VyJ3MgZ3JvdXAgYXZhdGFyXCIsICgpID0+IHtcbiAgICAgICAgY29uc3QgYXZhdGFyID0gbmV3IFVpbnQ4QXJyYXkoWzEsIDIsIDNdKTtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2V0Q29tcG9zZUdyb3VwQXZhdGFyKGF2YXRhcik7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIHJlc3VsdC5jb21wb3Nlcj8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEgJiZcbiAgICAgICAgICAgIHJlc3VsdC5jb21wb3Nlci5ncm91cEF2YXRhciA9PT0gYXZhdGFyXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdTRVRfQ09NUE9TRV9HUk9VUF9OQU1FJywgKCkgPT4ge1xuICAgICAgaXQoXCJjYW4gc2V0IHRoZSBjb21wb3NlcidzIGdyb3VwIG5hbWVcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2V0Q29tcG9zZUdyb3VwTmFtZSgnYmluZyBib25nJyk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0KFxuICAgICAgICAgIHJlc3VsdC5jb21wb3Nlcj8uc3RlcCA9PT0gQ29tcG9zZXJTdGVwLlNldEdyb3VwTWV0YWRhdGEgJiZcbiAgICAgICAgICAgIHJlc3VsdC5jb21wb3Nlci5ncm91cE5hbWUgPT09ICdiaW5nIGJvbmcnXG4gICAgICAgICk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdTRVRfQ09NUE9TRV9TRUFSQ0hfVEVSTScsICgpID0+IHtcbiAgICAgIGl0KCd1cGRhdGVzIHRoZSBjb250YWN0IHNlYXJjaCB0ZXJtJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGUsXG4gICAgICAgIH07XG5cbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgc2V0Q29tcG9zZVNlYXJjaFRlcm0oJ2ZvbyBiYXInKSk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY29tcG9zZXIsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlYXJjaFRlcm06ICdmb28gYmFyJyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdESVNDQVJEX01FU1NBR0VTJywgKCkgPT4ge1xuICAgICAgY29uc3Qgc3RhcnRTdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZSA9IHtcbiAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICBtZXNzYWdlc0xvb2t1cDoge1xuICAgICAgICAgIFttZXNzYWdlSWRdOiBnZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgIFttZXNzYWdlSWRUd29dOiBnZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWRUd28pLFxuICAgICAgICAgIFttZXNzYWdlSWRUaHJlZV06IGdldERlZmF1bHRNZXNzYWdlKG1lc3NhZ2VJZFRocmVlKSxcbiAgICAgICAgfSxcbiAgICAgICAgbWVzc2FnZXNCeUNvbnZlcnNhdGlvbjoge1xuICAgICAgICAgIFtjb252ZXJzYXRpb25JZF06IHtcbiAgICAgICAgICAgIG1lc3NhZ2VDaGFuZ2VDb3VudGVyOiAwLFxuICAgICAgICAgICAgbWV0cmljczoge1xuICAgICAgICAgICAgICB0b3RhbFVuc2VlbjogMCxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICBzY3JvbGxUb01lc3NhZ2VDb3VudGVyOiAwLFxuICAgICAgICAgICAgbWVzc2FnZUlkczogW21lc3NhZ2VJZCwgbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRUaHJlZV0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG5cbiAgICAgIGl0KCdlbGltaW5hdGVzIG9sZGVyIG1lc3NhZ2VzJywgKCkgPT4ge1xuICAgICAgICBjb25zdCB0b0Rpc2NhcmQgPSB7XG4gICAgICAgICAgY29udmVyc2F0aW9uSWQsXG4gICAgICAgICAgbnVtYmVyVG9LZWVwQXRCb3R0b206IDIsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IHN0YXRlID0gcmVkdWNlcihzdGFydFN0YXRlLCBkaXNjYXJkTWVzc2FnZXModG9EaXNjYXJkKSk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChcbiAgICAgICAgICBzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXT8ubWVzc2FnZUlkcyxcbiAgICAgICAgICBbbWVzc2FnZUlkVHdvLCBtZXNzYWdlSWRUaHJlZV1cbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZWxpbWluYXRlcyBuZXdlciBtZXNzYWdlcycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdG9EaXNjYXJkID0ge1xuICAgICAgICAgIGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgIG51bWJlclRvS2VlcEF0VG9wOiAyLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHJlZHVjZXIoc3RhcnRTdGF0ZSwgZGlzY2FyZE1lc3NhZ2VzKHRvRGlzY2FyZCkpO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgc3RhdGUubWVzc2FnZXNCeUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF0/Lm1lc3NhZ2VJZHMsXG4gICAgICAgICAgW21lc3NhZ2VJZCwgbWVzc2FnZUlkVHdvXVxuICAgICAgICApO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU0VUX1BSRV9KT0lOX0NPTlZFUlNBVElPTicsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0U3RhdGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgIH07XG5cbiAgICAgIGl0KCdzdGFydHMgd2l0aCBlbXB0eSB2YWx1ZScsICgpID0+IHtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHN0YXJ0U3RhdGUucHJlSm9pbkNvbnZlcnNhdGlvbik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3NldHMgdmFsdWUgYXMgcHJvdmlkZWQnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHByZUpvaW5Db252ZXJzYXRpb24gPSB7XG4gICAgICAgICAgdGl0bGU6ICdQcmUtam9pbiBncm91cCEnLFxuICAgICAgICAgIG1lbWJlckNvdW50OiA0LFxuICAgICAgICAgIGFwcHJvdmFsUmVxdWlyZWQ6IGZhbHNlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdGF0ZVdpdGhEYXRhID0gcmVkdWNlcihcbiAgICAgICAgICBzdGFydFN0YXRlLFxuICAgICAgICAgIHNldFByZUpvaW5Db252ZXJzYXRpb24ocHJlSm9pbkNvbnZlcnNhdGlvbilcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHN0YXRlV2l0aERhdGEucHJlSm9pbkNvbnZlcnNhdGlvbixcbiAgICAgICAgICBwcmVKb2luQ29udmVyc2F0aW9uXG4gICAgICAgICk7XG5cbiAgICAgICAgY29uc3QgcmVzZXRTdGF0ZSA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhdGVXaXRoRGF0YSxcbiAgICAgICAgICBzZXRQcmVKb2luQ29udmVyc2F0aW9uKHVuZGVmaW5lZClcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzZXRTdGF0ZS5wcmVKb2luQ29udmVyc2F0aW9uKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ01FU1NBR0VfQ0hBTkdFRCcsICgpID0+IHtcbiAgICAgIGNvbnN0IHN0YXJ0U3RhdGU6IENvbnZlcnNhdGlvbnNTdGF0ZVR5cGUgPSB7XG4gICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdENvbnZlcnNhdGlvbigpLFxuICAgICAgICAgICAgaWQ6IGNvbnZlcnNhdGlvbklkLFxuICAgICAgICAgICAgZ3JvdXBWZXJzaW9uOiAyLFxuICAgICAgICAgICAgZ3JvdXBJZDogJ2RHaHBjMmx6WVdkeWIzVndhV1IwYUdsemFYTmhaM0p2ZFhCcFpIUm9hWE09JyxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlc0J5Q29udmVyc2F0aW9uOiB7XG4gICAgICAgICAgW2NvbnZlcnNhdGlvbklkXToge1xuICAgICAgICAgICAgbWVzc2FnZUNoYW5nZUNvdW50ZXI6IDAsXG4gICAgICAgICAgICBtZXNzYWdlSWRzOiBbbWVzc2FnZUlkLCBtZXNzYWdlSWRUd28sIG1lc3NhZ2VJZFRocmVlXSxcbiAgICAgICAgICAgIG1ldHJpY3M6IHtcbiAgICAgICAgICAgICAgdG90YWxVbnNlZW46IDAsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgc2Nyb2xsVG9NZXNzYWdlQ291bnRlcjogMCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICBtZXNzYWdlc0xvb2t1cDoge1xuICAgICAgICAgIFttZXNzYWdlSWRdOiB7XG4gICAgICAgICAgICAuLi5nZXREZWZhdWx0TWVzc2FnZShtZXNzYWdlSWQpLFxuICAgICAgICAgICAgZGlzcGxheUxpbWl0OiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgICBbbWVzc2FnZUlkVHdvXToge1xuICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2UobWVzc2FnZUlkVHdvKSxcbiAgICAgICAgICAgIGRpc3BsYXlMaW1pdDogdW5kZWZpbmVkLFxuICAgICAgICAgIH0sXG4gICAgICAgICAgW21lc3NhZ2VJZFRocmVlXToge1xuICAgICAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2UobWVzc2FnZUlkVGhyZWUpLFxuICAgICAgICAgICAgZGlzcGxheUxpbWl0OiB1bmRlZmluZWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH07XG4gICAgICBjb25zdCBjaGFuZ2VkTWVzc2FnZSA9IHtcbiAgICAgICAgLi4uZ2V0RGVmYXVsdE1lc3NhZ2UobWVzc2FnZUlkKSxcbiAgICAgICAgYm9keTogJ2NoYW5nZWQnLFxuICAgICAgICBkaXNwbGF5TGltaXQ6IHVuZGVmaW5lZCxcbiAgICAgIH07XG5cbiAgICAgIGl0KCd1cGRhdGVzIG1lc3NhZ2UgZGF0YScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSByZWR1Y2VyKFxuICAgICAgICAgIHN0YXJ0U3RhdGUsXG4gICAgICAgICAgbWVzc2FnZUNoYW5nZWQobWVzc2FnZUlkLCBjb252ZXJzYXRpb25JZCwgY2hhbmdlZE1lc3NhZ2UpXG4gICAgICAgICk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChzdGF0ZS5tZXNzYWdlc0xvb2t1cFttZXNzYWdlSWRdLCBjaGFuZ2VkTWVzc2FnZSk7XG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChcbiAgICAgICAgICBzdGF0ZS5tZXNzYWdlc0J5Q29udmVyc2F0aW9uW2NvbnZlcnNhdGlvbklkXT8ubWVzc2FnZUNoYW5nZUNvdW50ZXIsXG4gICAgICAgICAgMFxuICAgICAgICApO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdCB1cGRhdGUgbG9va3VwIGlmIGl0IGlzIGEgc3RvcnkgcmVwbHknLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gcmVkdWNlcihcbiAgICAgICAgICBzdGFydFN0YXRlLFxuICAgICAgICAgIG1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2VJZCwgY29udmVyc2F0aW9uSWQsIHtcbiAgICAgICAgICAgIC4uLmNoYW5nZWRNZXNzYWdlLFxuICAgICAgICAgICAgc3RvcnlJZDogJ3N0b3J5LWlkJyxcbiAgICAgICAgICB9KVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgc3RhdGUubWVzc2FnZXNMb29rdXBbbWVzc2FnZUlkXSxcbiAgICAgICAgICBzdGFydFN0YXRlLm1lc3NhZ2VzTG9va3VwW21lc3NhZ2VJZF1cbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIHN0YXRlLm1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdPy5tZXNzYWdlQ2hhbmdlQ291bnRlcixcbiAgICAgICAgICAwXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2luY3JlbWVudHMgbWVzc2FnZSBjaGFuZ2UgY291bnRlciBpZiBuZXcgbWVzc2FnZSBoYXMgcmVhY3Rpb25zJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBjaGFuZ2VkTWVzc2FnZVdpdGhSZWFjdGlvbjogTWVzc2FnZVR5cGUgPSB7XG4gICAgICAgICAgLi4uY2hhbmdlZE1lc3NhZ2UsXG4gICAgICAgICAgcmVhY3Rpb25zOiBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVtb2ppOiAnXHVEODNDXHVERjgxJyxcbiAgICAgICAgICAgICAgZnJvbUlkOiAnc29tZS1vdGhlci1pZCcsXG4gICAgICAgICAgICAgIHRpbWVzdGFtcDogMjIyMixcbiAgICAgICAgICAgICAgdGFyZ2V0VGltZXN0YW1wOiAxMTExLFxuICAgICAgICAgICAgICB0YXJnZXRBdXRob3JVdWlkOiAnYXV0aG9yLXV1aWQnLFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHJlZHVjZXIoXG4gICAgICAgICAgc3RhcnRTdGF0ZSxcbiAgICAgICAgICBtZXNzYWdlQ2hhbmdlZChtZXNzYWdlSWQsIGNvbnZlcnNhdGlvbklkLCBjaGFuZ2VkTWVzc2FnZVdpdGhSZWFjdGlvbilcbiAgICAgICAgKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHN0YXRlLm1lc3NhZ2VzTG9va3VwW21lc3NhZ2VJZF0sXG4gICAgICAgICAgY2hhbmdlZE1lc3NhZ2VXaXRoUmVhY3Rpb25cbiAgICAgICAgKTtcbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKFxuICAgICAgICAgIHN0YXRlLm1lc3NhZ2VzQnlDb252ZXJzYXRpb25bY29udmVyc2F0aW9uSWRdPy5tZXNzYWdlQ2hhbmdlQ291bnRlcixcbiAgICAgICAgICAxXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2RvZXMgbm90IGluY3JlbWVudCBtZXNzYWdlIGNoYW5nZSBjb3VudGVyIGlmIG9ubHkgb2xkIG1lc3NhZ2UgaGFkIHJlYWN0aW9ucycsICgpID0+IHtcbiAgICAgICAgY29uc3QgdXBkYXRlZFN0YXJ0U3RhdGUgPSB7XG4gICAgICAgICAgLi4uc3RhcnRTdGF0ZSxcbiAgICAgICAgICBtZXNzYWdlc0xvb2t1cDoge1xuICAgICAgICAgICAgW21lc3NhZ2VJZF06IHtcbiAgICAgICAgICAgICAgLi4uc3RhcnRTdGF0ZS5tZXNzYWdlc0xvb2t1cFttZXNzYWdlSWRdLFxuICAgICAgICAgICAgICByZWFjdGlvbnM6IFtcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBlbW9qaTogJ1x1RDgzQ1x1REY4MScsXG4gICAgICAgICAgICAgICAgICBmcm9tSWQ6ICdzb21lLW90aGVyLWlkJyxcbiAgICAgICAgICAgICAgICAgIHRpbWVzdGFtcDogMjIyMixcbiAgICAgICAgICAgICAgICAgIHRhcmdldFRpbWVzdGFtcDogMTExMSxcbiAgICAgICAgICAgICAgICAgIHRhcmdldEF1dGhvclV1aWQ6ICdhdXRob3ItdXVpZCcsXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgXSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSByZWR1Y2VyKFxuICAgICAgICAgIHVwZGF0ZWRTdGFydFN0YXRlLFxuICAgICAgICAgIG1lc3NhZ2VDaGFuZ2VkKG1lc3NhZ2VJZCwgY29udmVyc2F0aW9uSWQsIGNoYW5nZWRNZXNzYWdlKVxuICAgICAgICApO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoc3RhdGUubWVzc2FnZXNMb29rdXBbbWVzc2FnZUlkXSwgY2hhbmdlZE1lc3NhZ2UpO1xuICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoXG4gICAgICAgICAgc3RhdGUubWVzc2FnZXNCeUNvbnZlcnNhdGlvbltjb252ZXJzYXRpb25JZF0/Lm1lc3NhZ2VDaGFuZ2VDb3VudGVyLFxuICAgICAgICAgIDBcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1NIT1dfQVJDSElWRURfQ09OVkVSU0FUSU9OUycsICgpID0+IHtcbiAgICAgIGl0KCdpcyBhIG5vLW9wIHdoZW4gYWxyZWFkeSBhdCB0aGUgYXJjaGl2ZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIHNob3dBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0FyY2hpdmVkQ29udmVyc2F0aW9ucygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc1RydWUocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuY29tcG9zZXIpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzd2l0Y2hlcyBmcm9tIHRoZSBpbmJveCB0byB0aGUgYXJjaGl2ZScsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNob3dBcmNoaXZlZENvbnZlcnNhdGlvbnMoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNUcnVlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICBhc3NlcnQuaXNVbmRlZmluZWQocmVzdWx0LmNvbXBvc2VyKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc3dpdGNoZXMgZnJvbSB0aGUgY29tcG9zZXIgdG8gdGhlIGFyY2hpdmUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdFN0YXJ0RGlyZWN0Q29udmVyc2F0aW9uQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0FyY2hpdmVkQ29udmVyc2F0aW9ucygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc1RydWUocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChyZXN1bHQuY29tcG9zZXIpO1xuICAgICAgfSk7XG4gICAgfSk7XG5cbiAgICBkZXNjcmliZSgnU0hPV19JTkJPWCcsICgpID0+IHtcbiAgICAgIGl0KCdpcyBhIG5vLW9wIHdoZW4gYWxyZWFkeSBhdCB0aGUgaW5ib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0gZ2V0RW1wdHlTdGF0ZSgpO1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93SW5ib3goKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuc2hvd0FyY2hpdmVkKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC5jb21wb3Nlcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N3aXRjaGVzIGZyb20gdGhlIGFyY2hpdmUgdG8gdGhlIGluYm94JywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgc2hvd0FyY2hpdmVkOiB0cnVlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93SW5ib3goKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuc2hvd0FyY2hpdmVkKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC5jb21wb3Nlcik7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N3aXRjaGVzIGZyb20gdGhlIGNvbXBvc2VyIHRvIHRoZSBpbmJveCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93SW5ib3goKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuc2hvd0FyY2hpdmVkKTtcbiAgICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKHJlc3VsdC5jb21wb3Nlcik7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdTVEFSVF9DT01QT1NJTkcnLCAoKSA9PiB7XG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIG9uIHRoZSBmaXJzdCBzdGVwIG9mIHRoZSBjb21wb3NlcicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzdGFydENvbXBvc2luZygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHJlc3VsdC5jb21wb3NlcixcbiAgICAgICAgICBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ2lmIG9uIHRoZSBzZWNvbmQgc3RlcCBvZiB0aGUgY29tcG9zZXIsIGdvZXMgYmFjayB0byB0aGUgZmlyc3Qgc3RlcCwgY2xlYXJpbmcgdGhlIHNlYXJjaCB0ZXJtJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgc2VhcmNoVGVybTogJ3RvIGJlIGNsZWFyZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHN0YXJ0Q29tcG9zaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLFxuICAgICAgICAgIGRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnaWYgb24gdGhlIHRoaXJkIHN0ZXAgb2YgdGhlIGNvbXBvc2VyLCBnb2VzIGJhY2sgdG8gdGhlIGZpcnN0IHN0ZXAsIGNsZWFyaW5nIGV2ZXJ5dGhpbmcnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzdGFydENvbXBvc2luZygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKFxuICAgICAgICAgIHJlc3VsdC5jb21wb3NlcixcbiAgICAgICAgICBkZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlXG4gICAgICAgICk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N3aXRjaGVzIGZyb20gdGhlIGluYm94IHRvIHRoZSBjb21wb3NlcicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSBnZXRFbXB0eVN0YXRlKCk7XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHN0YXJ0Q29tcG9zaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLFxuICAgICAgICAgIGRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc3dpdGNoZXMgZnJvbSB0aGUgYXJjaGl2ZSB0byB0aGUgaW5ib3gnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBzaG93QXJjaGl2ZWQ6IHRydWUsXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHN0YXJ0Q29tcG9zaW5nKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwoXG4gICAgICAgICAgcmVzdWx0LmNvbXBvc2VyLFxuICAgICAgICAgIGRlZmF1bHRTdGFydERpcmVjdENvbnZlcnNhdGlvbkNvbXBvc2VyU3RhdGVcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1NIT1dfQ0hPT1NFX0dST1VQX01FTUJFUlMnLCAoKSA9PiB7XG4gICAgICBpdCgnc3dpdGNoZXMgdG8gdGhlIHNlY29uZCBzdGVwIG9mIHRoZSBjb21wb3NlciBpZiBvbiB0aGUgZmlyc3Qgc3RlcCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0U3RhcnREaXJlY3RDb252ZXJzYXRpb25Db21wb3NlclN0YXRlLFxuICAgICAgICAgICAgc2VhcmNoVGVybTogJ3RvIGJlIGNsZWFyZWQnLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IHNob3dDaG9vc2VHcm91cE1lbWJlcnMoKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuaXNGYWxzZShyZXN1bHQuc2hvd0FyY2hpdmVkKTtcbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY29tcG9zZXIsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICB1c2VyQXZhdGFyRGF0YTogZ2V0RGVmYXVsdEF2YXRhcnModHJ1ZSksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkb2VzIG5vdGhpbmcgaWYgYWxyZWFkeSBvbiB0aGUgc2Vjb25kIHN0ZXAgb2YgdGhlIGNvbXBvc2VyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKHJlc3VsdCwgc3RhdGUpO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZXR1cm5zIHRvIHRoZSBzZWNvbmQgc3RlcCBpZiBvbiB0aGUgdGhpcmQgc3RlcCBvZiB0aGUgY29tcG9zZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAnRm9vIEJhciBHcm91cCcsXG4gICAgICAgICAgICBncm91cEF2YXRhcjogbmV3IFVpbnQ4QXJyYXkoWzQsIDJdKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzaG93Q2hvb3NlR3JvdXBNZW1iZXJzKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmlzRmFsc2UocmVzdWx0LnNob3dBcmNoaXZlZCk7XG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNvbXBvc2VyLCB7XG4gICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgZ3JvdXBOYW1lOiAnRm9vIEJhciBHcm91cCcsXG4gICAgICAgICAgZ3JvdXBBdmF0YXI6IG5ldyBVaW50OEFycmF5KFs0LCAyXSksXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdzd2l0Y2hlcyBmcm9tIHRoZSBpbmJveCB0byB0aGUgc2Vjb25kIHN0ZXAgb2YgdGhlIGNvbXBvc2VyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IGdldEVtcHR5U3RhdGUoKTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0Nob29zZUdyb3VwTWVtYmVycygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jb21wb3Nlciwge1xuICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHVzZXJBdmF0YXJEYXRhOiBnZXREZWZhdWx0QXZhdGFycyh0cnVlKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ3N3aXRjaGVzIGZyb20gdGhlIGFyY2hpdmUgdG8gdGhlIHNlY29uZCBzdGVwIG9mIHRoZSBjb21wb3NlcicsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIHNob3dBcmNoaXZlZDogdHJ1ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc2hvd0Nob29zZUdyb3VwTWVtYmVycygpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5pc0ZhbHNlKHJlc3VsdC5zaG93QXJjaGl2ZWQpO1xuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jb21wb3Nlciwge1xuICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHVzZXJBdmF0YXJEYXRhOiBnZXREZWZhdWx0QXZhdGFycyh0cnVlKSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcbiAgICB9KTtcblxuICAgIGRlc2NyaWJlKCdTVEFSVF9TRVRUSU5HX0dST1VQX01FVEFEQVRBJywgKCkgPT4ge1xuICAgICAgaXQoJ21vdmVzIGZyb20gdGhlIHNlY29uZCB0byB0aGUgdGhpcmQgc3RlcCBvZiB0aGUgY29tcG9zZXInLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogWydhYmMnLCAnZGVmJ10sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc3RhcnRTZXR0aW5nR3JvdXBNZXRhZGF0YSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNvbXBvc2VyLCB7XG4gICAgICAgICAgLi4uZGVmYXVsdFNldEdyb3VwTWV0YWRhdGFDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbJ2FiYycsICdkZWYnXSxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoJ21haW50YWlucyBzdGF0ZSB3aGVuIGdvaW5nIGZyb20gdGhlIHNlY29uZCB0byB0aGlyZCBzdGVwcyBvZiB0aGUgY29tcG9zZXIsIGlmIHRoZSBzZWNvbmQgc3RlcCBhbHJlYWR5IGhhZCBzb21lIGRhdGEgKGxpa2VseSBmcm9tIGEgcHJldmlvdXMgdmlzaXQpJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IHtcbiAgICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgICAgc2VhcmNoVGVybTogJ2ZvbyBiYXInLFxuICAgICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IFsnYWJjJywgJ2RlZiddLFxuICAgICAgICAgICAgZ3JvdXBOYW1lOiAnRm9vIEJhciBHcm91cCcsXG4gICAgICAgICAgICBncm91cEF2YXRhcjogbmV3IFVpbnQ4QXJyYXkoWzYsIDldKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBzdGFydFNldHRpbmdHcm91cE1ldGFkYXRhKCk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY29tcG9zZXIsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0U2V0R3JvdXBNZXRhZGF0YUNvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IFsnYWJjJywgJ2RlZiddLFxuICAgICAgICAgIGdyb3VwTmFtZTogJ0ZvbyBCYXIgR3JvdXAnLFxuICAgICAgICAgIGdyb3VwQXZhdGFyOiBuZXcgVWludDhBcnJheShbNiwgOV0pLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZG9lcyBub3RoaW5nIGlmIGFscmVhZHkgb24gdGhlIHRoaXJkIHN0ZXAgb2YgdGhlIGNvbXBvc2VyJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRTZXRHcm91cE1ldGFkYXRhQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gc3RhcnRTZXR0aW5nR3JvdXBNZXRhZGF0YSgpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5zdHJpY3RFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuXG4gICAgZGVzY3JpYmUoJ1RPR0dMRV9DT05WRVJTQVRJT05fSU5fQ0hPT1NFX01FTUJFUlMnLCAoKSA9PiB7XG4gICAgICBmdW5jdGlvbiBnZXRBY3Rpb24oXG4gICAgICAgIGlkOiBzdHJpbmcsXG4gICAgICAgIGNvbnZlcnNhdGlvbnNTdGF0ZTogQ29udmVyc2F0aW9uc1N0YXRlVHlwZVxuICAgICAgKTogVG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzQWN0aW9uVHlwZSB7XG4gICAgICAgIGNvbnN0IGRpc3BhdGNoID0gc2lub24uc3B5KCk7XG5cbiAgICAgICAgdG9nZ2xlQ29udmVyc2F0aW9uSW5DaG9vc2VNZW1iZXJzKGlkKShcbiAgICAgICAgICBkaXNwYXRjaCxcbiAgICAgICAgICAoKSA9PiAoe1xuICAgICAgICAgICAgLi4uZ2V0RW1wdHlSb290U3RhdGUoKSxcbiAgICAgICAgICAgIGNvbnZlcnNhdGlvbnM6IGNvbnZlcnNhdGlvbnNTdGF0ZSxcbiAgICAgICAgICB9KSxcbiAgICAgICAgICBudWxsXG4gICAgICAgICk7XG5cbiAgICAgICAgcmV0dXJuIGRpc3BhdGNoLmdldENhbGwoMCkuYXJnc1swXTtcbiAgICAgIH1cblxuICAgICAgYmVmb3JlRWFjaChhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVJlbW90ZUNvbmZpZyhbXG4gICAgICAgICAgeyBuYW1lOiAnZ2xvYmFsLmdyb3Vwc3YyLm1heEdyb3VwU2l6ZScsIHZhbHVlOiAnMjInLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2dsb2JhbC5ncm91cHN2Mi5ncm91cFNpemVIYXJkTGltaXQnLFxuICAgICAgICAgICAgdmFsdWU6ICczMycsXG4gICAgICAgICAgICBlbmFibGVkOiB0cnVlLFxuICAgICAgICAgIH0sXG4gICAgICAgIF0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdhZGRzIGNvbnZlcnNhdGlvbiBJRHMgdG8gdGhlIGxpc3QnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHplcm8gPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiBkZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3Qgb25lID0gcmVkdWNlcih6ZXJvLCBnZXRBY3Rpb24oJ2FiYycsIHplcm8pKTtcbiAgICAgICAgY29uc3QgdHdvID0gcmVkdWNlcihvbmUsIGdldEFjdGlvbignZGVmJywgb25lKSk7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbCh0d28uY29tcG9zZXIsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogWydhYmMnLCAnZGVmJ10sXG4gICAgICAgIH0pO1xuICAgICAgfSk7XG5cbiAgICAgIGl0KCdyZW1vdmVzIGNvbnZlcnNhdGlvbiBJRHMgZnJvbSB0aGUgbGlzdCcsICgpID0+IHtcbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbJ2FiYycsICdkZWYnXSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24oJ2FiYycsIHN0YXRlKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jb21wb3Nlciwge1xuICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbJ2RlZiddLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvd3MgdGhlIHJlY29tbWVuZGVkIGdyb3VwIHNpemUgbW9kYWwgd2hlbiBmaXJzdCBjcm9zc2luZyB0aGUgbWF4aW11bSByZWNvbW1lbmRlZCBncm91cCBzaXplJywgKCkgPT4ge1xuICAgICAgICBjb25zdCBvbGRTZWxlY3RlZENvbnZlcnNhdGlvbklkcyA9IHRpbWVzKDIxLCAoKSA9PiB1dWlkKCkpO1xuICAgICAgICBjb25zdCBuZXdVdWlkID0gdXVpZCgpO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogb2xkU2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKG5ld1V1aWQsIHN0YXRlKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jb21wb3Nlciwge1xuICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbLi4ub2xkU2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsIG5ld1V1aWRdLFxuICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd2luZyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJkb2Vzbid0IHNob3cgdGhlIHJlY29tbWVuZGVkIGdyb3VwIHNpemUgbW9kYWwgdHdpY2VcIiwgKCkgPT4ge1xuICAgICAgICBjb25zdCBvbGRTZWxlY3RlZENvbnZlcnNhdGlvbklkcyA9IHRpbWVzKDIxLCAoKSA9PiB1dWlkKCkpO1xuICAgICAgICBjb25zdCBuZXdVdWlkID0gdXVpZCgpO1xuXG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogb2xkU2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsXG4gICAgICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlLlNob3duLFxuICAgICAgICAgIH0sXG4gICAgICAgIH07XG4gICAgICAgIGNvbnN0IGFjdGlvbiA9IGdldEFjdGlvbihuZXdVdWlkLCBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQuY29tcG9zZXIsIHtcbiAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogWy4uLm9sZFNlbGVjdGVkQ29udmVyc2F0aW9uSWRzLCBuZXdVdWlkXSxcbiAgICAgICAgICByZWNvbW1lbmRlZEdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlLlNob3duLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGVmYXVsdHMgdGhlIG1heGltdW0gcmVjb21tZW5kZWQgc2l6ZSB0byAxNTEnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgW251bGwsICd4eXonXSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgbmFtZTogJ2dsb2JhbC5ncm91cHN2Mi5tYXhHcm91cFNpemUnLFxuICAgICAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdnbG9iYWwuZ3JvdXBzdjIuZ3JvdXBTaXplSGFyZExpbWl0JyxcbiAgICAgICAgICAgICAgdmFsdWU6ICczMycsXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24odXVpZCgpLCBzdGF0ZSk7XG5cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0aW9uLnBheWxvYWQubWF4UmVjb21tZW5kZWRHcm91cFNpemUsIDE1MSk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuXG4gICAgICBpdCgnc2hvd3MgdGhlIG1heGltdW0gZ3JvdXAgc2l6ZSBtb2RhbCB3aGVuIGZpcnN0IHJlYWNoaW5nIHRoZSBtYXhpbXVtIGdyb3VwIHNpemUnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkQ29udmVyc2F0aW9uSWRzID0gdGltZXMoMzEsICgpID0+IHV1aWQoKSk7XG4gICAgICAgIGNvbnN0IG5ld1V1aWQgPSB1dWlkKCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBvbGRTZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuTmV2ZXJTaG93bixcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24obmV3VXVpZCwgc3RhdGUpO1xuICAgICAgICBjb25zdCByZXN1bHQgPSByZWR1Y2VyKHN0YXRlLCBhY3Rpb24pO1xuXG4gICAgICAgIGFzc2VydC5kZWVwRXF1YWwocmVzdWx0LmNvbXBvc2VyLCB7XG4gICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgc2VsZWN0ZWRDb252ZXJzYXRpb25JZHM6IFsuLi5vbGRTZWxlY3RlZENvbnZlcnNhdGlvbklkcywgbmV3VXVpZF0sXG4gICAgICAgICAgcmVjb21tZW5kZWRHcm91cFNpemVNb2RhbFN0YXRlOiBPbmVUaW1lTW9kYWxTdGF0ZS5TaG93bixcbiAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd2luZyxcbiAgICAgICAgfSk7XG4gICAgICB9KTtcblxuICAgICAgaXQoXCJkb2Vzbid0IHNob3cgdGhlIG1heGltdW0gZ3JvdXAgc2l6ZSBtb2RhbCB0d2ljZVwiLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IG9sZFNlbGVjdGVkQ29udmVyc2F0aW9uSWRzID0gdGltZXMoMzEsICgpID0+IHV1aWQoKSk7XG4gICAgICAgIGNvbnN0IG5ld1V1aWQgPSB1dWlkKCk7XG5cbiAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgLi4uZ2V0RW1wdHlTdGF0ZSgpLFxuICAgICAgICAgIGNvbXBvc2VyOiB7XG4gICAgICAgICAgICAuLi5kZWZhdWx0Q2hvb3NlR3JvdXBNZW1iZXJzQ29tcG9zZXJTdGF0ZSxcbiAgICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBvbGRTZWxlY3RlZENvbnZlcnNhdGlvbklkcyxcbiAgICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgICAgICAgICBtYXhpbXVtR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgICAgICAgfSxcbiAgICAgICAgfTtcbiAgICAgICAgY29uc3QgYWN0aW9uID0gZ2V0QWN0aW9uKG5ld1V1aWQsIHN0YXRlKTtcbiAgICAgICAgY29uc3QgcmVzdWx0ID0gcmVkdWNlcihzdGF0ZSwgYWN0aW9uKTtcblxuICAgICAgICBhc3NlcnQuZGVlcEVxdWFsKHJlc3VsdC5jb21wb3Nlciwge1xuICAgICAgICAgIC4uLmRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICAgIHNlbGVjdGVkQ29udmVyc2F0aW9uSWRzOiBbLi4ub2xkU2VsZWN0ZWRDb252ZXJzYXRpb25JZHMsIG5ld1V1aWRdLFxuICAgICAgICAgIHJlY29tbWVuZGVkR3JvdXBTaXplTW9kYWxTdGF0ZTogT25lVGltZU1vZGFsU3RhdGUuU2hvd24sXG4gICAgICAgICAgbWF4aW11bUdyb3VwU2l6ZU1vZGFsU3RhdGU6IE9uZVRpbWVNb2RhbFN0YXRlLlNob3duLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnY2Fubm90IHNlbGVjdCBtb3JlIHRoYW4gdGhlIG1heGltdW0gbnVtYmVyIG9mIGNvbnZlcnNhdGlvbnMnLCAoKSA9PiB7XG4gICAgICAgIGNvbnN0IHN0YXRlID0ge1xuICAgICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgICBjb21wb3Nlcjoge1xuICAgICAgICAgICAgLi4uZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgICBzZWxlY3RlZENvbnZlcnNhdGlvbklkczogdGltZXMoMTAwMCwgKCkgPT4gdXVpZCgpKSxcbiAgICAgICAgICB9LFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24odXVpZCgpLCBzdGF0ZSk7XG4gICAgICAgIGNvbnN0IHJlc3VsdCA9IHJlZHVjZXIoc3RhdGUsIGFjdGlvbik7XG5cbiAgICAgICAgYXNzZXJ0LmRlZXBFcXVhbChyZXN1bHQsIHN0YXRlKTtcbiAgICAgIH0pO1xuXG4gICAgICBpdCgnZGVmYXVsdHMgdGhlIG1heGltdW0gZ3JvdXAgc2l6ZSB0byAxMDAxIGlmIHRoZSByZWNvbW1lbmRlZCBtYXhpbXVtIGlzIHNtYWxsZXInLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGZvciAoY29uc3QgdmFsdWUgb2YgW251bGwsICd4eXonXSkge1xuICAgICAgICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBuby1hd2FpdC1pbi1sb29wXG4gICAgICAgICAgYXdhaXQgdXBkYXRlUmVtb3RlQ29uZmlnKFtcbiAgICAgICAgICAgIHsgbmFtZTogJ2dsb2JhbC5ncm91cHN2Mi5tYXhHcm91cFNpemUnLCB2YWx1ZTogJzInLCBlbmFibGVkOiB0cnVlIH0sXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIG5hbWU6ICdnbG9iYWwuZ3JvdXBzdjIuZ3JvdXBTaXplSGFyZExpbWl0JyxcbiAgICAgICAgICAgICAgdmFsdWUsXG4gICAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0pO1xuXG4gICAgICAgICAgY29uc3Qgc3RhdGUgPSB7XG4gICAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgICBjb21wb3NlcjogZGVmYXVsdENob29zZUdyb3VwTWVtYmVyc0NvbXBvc2VyU3RhdGUsXG4gICAgICAgICAgfTtcbiAgICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24odXVpZCgpLCBzdGF0ZSk7XG5cbiAgICAgICAgICBhc3NlcnQuc3RyaWN0RXF1YWwoYWN0aW9uLnBheWxvYWQubWF4R3JvdXBTaXplLCAxMDAxKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG5cbiAgICAgIGl0KCdkZWZhdWx0cyB0aGUgbWF4aW11bSBncm91cCBzaXplIHRvIChyZWNvbW1lbmRlZCBtYXhpbXVtICsgMSkgaWYgdGhlIHJlY29tbWVuZGVkIG1heGltdW0gaXMgbW9yZSB0aGFuIDEwMDEnLCBhc3luYyAoKSA9PiB7XG4gICAgICAgIGF3YWl0IHVwZGF0ZVJlbW90ZUNvbmZpZyhbXG4gICAgICAgICAge1xuICAgICAgICAgICAgbmFtZTogJ2dsb2JhbC5ncm91cHN2Mi5tYXhHcm91cFNpemUnLFxuICAgICAgICAgICAgdmFsdWU6ICcxMjM0JyxcbiAgICAgICAgICAgIGVuYWJsZWQ6IHRydWUsXG4gICAgICAgICAgfSxcbiAgICAgICAgICB7XG4gICAgICAgICAgICBuYW1lOiAnZ2xvYmFsLmdyb3Vwc3YyLmdyb3VwU2l6ZUhhcmRMaW1pdCcsXG4gICAgICAgICAgICB2YWx1ZTogJzInLFxuICAgICAgICAgICAgZW5hYmxlZDogdHJ1ZSxcbiAgICAgICAgICB9LFxuICAgICAgICBdKTtcblxuICAgICAgICBjb25zdCBzdGF0ZSA9IHtcbiAgICAgICAgICAuLi5nZXRFbXB0eVN0YXRlKCksXG4gICAgICAgICAgY29tcG9zZXI6IGRlZmF1bHRDaG9vc2VHcm91cE1lbWJlcnNDb21wb3NlclN0YXRlLFxuICAgICAgICB9O1xuICAgICAgICBjb25zdCBhY3Rpb24gPSBnZXRBY3Rpb24odXVpZCgpLCBzdGF0ZSk7XG5cbiAgICAgICAgYXNzZXJ0LnN0cmljdEVxdWFsKGFjdGlvbi5wYXlsb2FkLm1heEdyb3VwU2l6ZSwgMTIzNSk7XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG5cbiAgZGVzY3JpYmUoJ0NPTE9SU19DSEFOR0VEJywgKCkgPT4ge1xuICAgIGNvbnN0IGFiYyA9IGdldERlZmF1bHRDb252ZXJzYXRpb25XaXRoVXVpZCh7XG4gICAgICBpZDogJ2FiYycsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogJ3dpbnRlcmdyZWVuJyxcbiAgICB9KTtcbiAgICBjb25zdCBkZWYgPSBnZXREZWZhdWx0Q29udmVyc2F0aW9uV2l0aFV1aWQoe1xuICAgICAgaWQ6ICdkZWYnLFxuICAgICAgY29udmVyc2F0aW9uQ29sb3I6ICdpbmZyYXJlZCcsXG4gICAgfSk7XG4gICAgY29uc3QgZ2hpID0gZ2V0RGVmYXVsdENvbnZlcnNhdGlvbih7XG4gICAgICBpZDogJ2doaScsXG4gICAgICBlMTY0OiAnZ2hpJyxcbiAgICAgIGNvbnZlcnNhdGlvbkNvbG9yOiAnZW1iZXInLFxuICAgIH0pO1xuICAgIGNvbnN0IGprbCA9IGdldERlZmF1bHRDb252ZXJzYXRpb24oe1xuICAgICAgaWQ6ICdqa2wnLFxuICAgICAgZ3JvdXBJZDogJ2prbCcsXG4gICAgICBjb252ZXJzYXRpb25Db2xvcjogJ3BsdW0nLFxuICAgIH0pO1xuICAgIGNvbnN0IGdldFN0YXRlID0gKCkgPT4gKHtcbiAgICAgIC4uLmdldEVtcHR5Um9vdFN0YXRlKCksXG4gICAgICBjb252ZXJzYXRpb25zOiB7XG4gICAgICAgIC4uLmdldEVtcHR5U3RhdGUoKSxcbiAgICAgICAgY29udmVyc2F0aW9uTG9va3VwOiB7XG4gICAgICAgICAgYWJjLFxuICAgICAgICAgIGRlZixcbiAgICAgICAgICBnaGksXG4gICAgICAgICAgamtsLFxuICAgICAgICB9LFxuICAgICAgICBjb252ZXJzYXRpb25zQnlVdWlkOiB7XG4gICAgICAgICAgYWJjLFxuICAgICAgICAgIGRlZixcbiAgICAgICAgfSxcbiAgICAgICAgY29udmVyc2F0aW9uc0J5RTE2NDoge1xuICAgICAgICAgIGdoaSxcbiAgICAgICAgfSxcbiAgICAgICAgY29udmVyc2F0aW9uc0J5R3JvdXBJZDoge1xuICAgICAgICAgIGprbCxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG5cbiAgICBpdCgncmVzZXRBbGxDaGF0Q29sb3JzJywgYXN5bmMgKCkgPT4ge1xuICAgICAgY29uc3QgZGlzcGF0Y2ggPSBzaW5vbi5zcHkoKTtcbiAgICAgIGF3YWl0IHJlc2V0QWxsQ2hhdENvbG9ycygpKGRpc3BhdGNoLCBnZXRTdGF0ZSwgbnVsbCk7XG5cbiAgICAgIGNvbnN0IFthY3Rpb25dID0gZGlzcGF0Y2guZ2V0Q2FsbCgwKS5hcmdzO1xuICAgICAgY29uc3QgbmV4dFN0YXRlID0gcmVkdWNlcihnZXRTdGF0ZSgpLmNvbnZlcnNhdGlvbnMsIGFjdGlvbik7XG5cbiAgICAgIHNpbm9uLmFzc2VydC5jYWxsZWRPbmNlKGRpc3BhdGNoKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChuZXh0U3RhdGUuY29udmVyc2F0aW9uTG9va3VwLmFiYy5jb252ZXJzYXRpb25Db2xvcik7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQobmV4dFN0YXRlLmNvbnZlcnNhdGlvbkxvb2t1cC5kZWYuY29udmVyc2F0aW9uQ29sb3IpO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKG5leHRTdGF0ZS5jb252ZXJzYXRpb25Mb29rdXAuZ2hpLmNvbnZlcnNhdGlvbkNvbG9yKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChuZXh0U3RhdGUuY29udmVyc2F0aW9uTG9va3VwLmprbC5jb252ZXJzYXRpb25Db2xvcik7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIG5leHRTdGF0ZS5jb252ZXJzYXRpb25zQnlVdWlkW2FiYy51dWlkXS5jb252ZXJzYXRpb25Db2xvclxuICAgICAgKTtcbiAgICAgIGFzc2VydC5pc1VuZGVmaW5lZChcbiAgICAgICAgbmV4dFN0YXRlLmNvbnZlcnNhdGlvbnNCeVV1aWRbZGVmLnV1aWRdLmNvbnZlcnNhdGlvbkNvbG9yXG4gICAgICApO1xuICAgICAgYXNzZXJ0LmlzVW5kZWZpbmVkKG5leHRTdGF0ZS5jb252ZXJzYXRpb25zQnlFMTY0LmdoaS5jb252ZXJzYXRpb25Db2xvcik7XG4gICAgICBhc3NlcnQuaXNVbmRlZmluZWQoXG4gICAgICAgIG5leHRTdGF0ZS5jb252ZXJzYXRpb25zQnlHcm91cElkLmprbC5jb252ZXJzYXRpb25Db2xvclxuICAgICAgKTtcbiAgICAgIHdpbmRvdy5zdG9yYWdlLnJlbW92ZSgnZGVmYXVsdENvbnZlcnNhdGlvbkNvbG9yJyk7XG4gICAgfSk7XG4gIH0pO1xufSk7XG4iXSwKICAibWFwcGluZ3MiOiAiOzs7Ozs7Ozs7Ozs7Ozs7O0FBR0Esa0JBQXVCO0FBQ3ZCLFlBQXVCO0FBQ3ZCLGtCQUEyQjtBQUMzQixvQkFBc0I7QUFDdEIscUJBQXVDO0FBQ3ZDLGtCQUEyQjtBQUMzQixnQ0FJTztBQVVQLDJCQVNPO0FBQ1AsK0JBQTJCO0FBQzNCLDZCQUFvQztBQUNwQyxxQkFBeUI7QUFDekIsa0JBQXFCO0FBQ3JCLG9DQUdPO0FBQ1Asb0JBQWtDO0FBQ2xDLG1DQUlPO0FBQ1AsOEJBQW1DO0FBRW5DLE1BQU07QUFBQSxFQUNKO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsRUFDQTtBQUFBLEVBQ0E7QUFBQSxFQUNBO0FBQUEsSUFDRTtBQUVKLFNBQVMsa0NBQWtDLE1BQU07QUFDL0MsUUFBTSxvQkFBb0IsNkJBQU0sNEJBQVksUUFBVyw0QkFBVyxDQUFDLEdBQXpDO0FBRTFCLE1BQUk7QUFDSixNQUFJO0FBRUosYUFBVyxNQUFNO0FBQ2YsbUJBQWUsTUFBTSxjQUFjO0FBRW5DLGlCQUFhLEtBQUssT0FBTyxRQUFRLFFBQVEsU0FBUztBQUVsRCxzQkFBa0IsTUFBTSxLQUFLO0FBQUEsRUFDL0IsQ0FBQztBQUVELFlBQVUsTUFBTTtBQUNkLGlCQUFhLFFBQVE7QUFBQSxFQUN2QixDQUFDO0FBRUQsV0FBUyxXQUFXLE1BQU07QUFDeEIsYUFBUywyQkFBMkIsTUFBTTtBQUN4QyxZQUFNLG1CQUFxQywwREFBdUI7QUFFbEUsU0FBRyx5REFBeUQsTUFBTTtBQUNoRSwyQkFBTyxZQUNMLGtEQUF3QjtBQUFBLGFBQ25CO0FBQUEsVUFDSCxNQUFNO0FBQUEsUUFDUixDQUFDLEdBQ0Qsd0JBQVMsSUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsNERBQTRELE1BQU07QUFDbkUsMkJBQU8sWUFDTCxrREFBd0I7QUFBQSxhQUNuQjtBQUFBLFVBQ0gsV0FBVztBQUFBLFFBQ2IsQ0FBQyxHQUNELHdCQUFTLElBQ1g7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLGtFQUFrRSxNQUFNO0FBQ3pFLDJCQUFPLFlBQ0wsa0RBQXdCO0FBQUEsYUFDbkI7QUFBQSxVQUNILHdCQUF3QjtBQUFBLFFBQzFCLENBQUMsR0FDRCx3QkFBUyxJQUNYO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRyw2REFBNkQsTUFBTTtBQUNwRSwyQkFBTyxZQUNMLGtEQUF3QjtBQUFBLGFBQ25CO0FBQUEsVUFDSCxNQUFNO0FBQUEsUUFDUixDQUFDLEdBQ0Qsd0JBQVMsSUFDWDtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsdUNBQXVDLE1BQU07QUFDOUMsMkJBQU8sWUFDTCxrREFBd0I7QUFBQSxhQUNuQjtBQUFBLFVBQ0gsTUFBTTtBQUFBLFVBQ04sY0FBYztBQUFBLFVBQ2Qsa0JBQWtCLENBQUM7QUFBQSxRQUNyQixDQUFDLEdBQ0Qsd0JBQVMsSUFDWDtBQUVBLDJCQUFPLFlBQ0wsa0RBQXdCO0FBQUEsYUFDbkI7QUFBQSxVQUNILE1BQU07QUFBQSxVQUNOLGtCQUFrQixDQUFDO0FBQUEsUUFDckIsQ0FBQyxHQUNELHdCQUFTLElBQ1g7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLCtFQUErRSxNQUFNO0FBQ3RGLDJCQUFPLFlBQ0wsa0RBQXdCLGdCQUFnQixHQUN4Qyx3QkFBUyxNQUNYO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRyw0REFBNEQsTUFBTTtBQUNuRSwyQkFBTyxZQUNMLGtEQUF3QjtBQUFBLGFBQ25CO0FBQUEsVUFDSCxNQUFNO0FBQUEsVUFDTixjQUFjO0FBQUEsVUFDZCxrQkFBa0IsQ0FBQztBQUFBLFFBQ3JCLENBQUMsR0FDRCx3QkFBUyxLQUNYO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyw2QkFBNkIsTUFBTTtBQUMxQyxTQUFHLHdEQUF3RCxNQUFNO0FBQy9ELGNBQU0sUUFBUSx3Q0FBYztBQUM1QixjQUFNLFNBQVMsb0RBQTBCLFFBQVcsUUFBVyxLQUFLO0FBRXBFLDJCQUFPLFlBQ0wsTUFBTSxxQkFDTixPQUFPLG1CQUNUO0FBQ0EsMkJBQU8sWUFDTCxNQUFNLHFCQUNOLE9BQU8sbUJBQ1Q7QUFDQSwyQkFBTyxZQUNMLE1BQU0sd0JBQ04sT0FBTyxzQkFDVDtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsc0NBQXNDLE1BQU07QUFDN0MsY0FBTSxVQUFVLDBEQUF1QjtBQUFBLFVBQ3JDLElBQUk7QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSLENBQUM7QUFFRCxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIscUJBQXFCO0FBQUEsWUFDbkIsZ0JBQWdCO0FBQUEsVUFDbEI7QUFBQSxRQUNGO0FBQ0EsY0FBTSxRQUFRLDBEQUF1QjtBQUFBLFVBQ25DLElBQUk7QUFBQSxVQUNKLE1BQU07QUFBQSxVQUNOLE1BQU07QUFBQSxRQUNSLENBQUM7QUFFRCxjQUFNLFdBQVc7QUFBQSxVQUNmLGNBQWM7QUFBQSxRQUNoQjtBQUVBLGNBQU0sU0FBUyxvREFBMEIsT0FBTyxTQUFTLEtBQUs7QUFFOUQsMkJBQU8sVUFBVSxPQUFPLHFCQUFxQixRQUFRO0FBQ3JELDJCQUFPLFlBQ0wsTUFBTSxxQkFDTixPQUFPLG1CQUNUO0FBQ0EsMkJBQU8sWUFDTCxNQUFNLHdCQUNOLE9BQU8sc0JBQ1Q7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLHNDQUFzQyxNQUFNO0FBQzdDLGNBQU0sVUFBVSxrRUFBK0I7QUFBQSxVQUM3QyxJQUFJO0FBQUEsVUFDSixNQUFNO0FBQUEsUUFDUixDQUFDO0FBRUQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLHFCQUFxQjtBQUFBLGFBQ2xCLFFBQVEsT0FBTztBQUFBLFVBQ2xCO0FBQUEsUUFDRjtBQUNBLGNBQU0sUUFBUSxrRUFBK0I7QUFBQSxVQUMzQyxJQUFJO0FBQUEsVUFDSixNQUFNO0FBQUEsUUFDUixDQUFDO0FBRUQsY0FBTSxXQUFXO0FBQUEsV0FDZCxNQUFNLE9BQU87QUFBQSxRQUNoQjtBQUVBLGNBQU0sU0FBUyxvREFBMEIsT0FBTyxTQUFTLEtBQUs7QUFFOUQsMkJBQU8sWUFDTCxNQUFNLHFCQUNOLE9BQU8sbUJBQ1Q7QUFDQSwyQkFBTyxVQUFVLE9BQU8scUJBQXFCLFFBQVE7QUFDckQsMkJBQU8sWUFDTCxNQUFNLHdCQUNOLE9BQU8sc0JBQ1Q7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLHlDQUF5QyxNQUFNO0FBQ2hELGNBQU0sVUFBVSwwREFBdUI7QUFBQSxVQUNyQyxJQUFJO0FBQUEsVUFDSixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUixDQUFDO0FBRUQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLHdCQUF3QjtBQUFBLFlBQ3RCLG1CQUFtQjtBQUFBLFVBQ3JCO0FBQUEsUUFDRjtBQUNBLGNBQU0sUUFBUSwwREFBdUI7QUFBQSxVQUNuQyxJQUFJO0FBQUEsVUFDSixTQUFTO0FBQUEsVUFDVCxNQUFNO0FBQUEsVUFDTixNQUFNO0FBQUEsUUFDUixDQUFDO0FBRUQsY0FBTSxXQUFXO0FBQUEsVUFDZixpQkFBaUI7QUFBQSxRQUNuQjtBQUVBLGNBQU0sU0FBUyxvREFBMEIsT0FBTyxTQUFTLEtBQUs7QUFFOUQsMkJBQU8sWUFDTCxNQUFNLHFCQUNOLE9BQU8sbUJBQ1Q7QUFDQSwyQkFBTyxZQUNMLE1BQU0scUJBQ04sT0FBTyxtQkFDVDtBQUNBLDJCQUFPLFVBQVUsT0FBTyx3QkFBd0IsUUFBUTtBQUFBLE1BQzFELENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLFdBQVcsTUFBTTtBQUN4QixVQUFNLE9BQU8sS0FBSyxJQUFJO0FBQ3RCLFVBQU0sZUFBZSxPQUFPO0FBQzVCLFVBQU0saUJBQWlCO0FBQ3ZCLFVBQU0sWUFBWTtBQUNsQixVQUFNLGVBQWU7QUFDckIsVUFBTSxpQkFBaUI7QUFDdkIsVUFBTSxhQUFhLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBRTVDLCtCQUEyQixJQUF5QjtBQUNsRCxhQUFPO0FBQUEsUUFDTCxhQUFhLENBQUM7QUFBQSxRQUNkO0FBQUEsUUFDQTtBQUFBLFFBQ0EsYUFBYTtBQUFBLFFBQ2IsU0FBUztBQUFBLFFBQ1QsUUFBUTtBQUFBLFFBQ1I7QUFBQSxRQUNBLFdBQVc7QUFBQSxRQUNYLE1BQU07QUFBQSxRQUNOLFlBQVksb0NBQVc7QUFBQSxNQUN6QjtBQUFBLElBQ0Y7QUFiUyxBQWVULDZDQUFrRTtBQUNoRSxhQUFPO0FBQUEsUUFDTCxzQkFBc0I7QUFBQSxRQUN0QixZQUFZLENBQUM7QUFBQSxRQUNiLFNBQVM7QUFBQSxVQUNQLGFBQWE7QUFBQSxRQUNmO0FBQUEsUUFDQSx3QkFBd0I7QUFBQSxNQUMxQjtBQUFBLElBQ0Y7QUFUUyxBQVdULGFBQVMsb0JBQW9CLE1BQU07QUFDakMsU0FBRyw2QkFBNkIsTUFBTTtBQUNwQyxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsUUFDbkI7QUFDQSxjQUFNLFNBQVMsaUJBQWlCLEVBQUUsZ0JBQWdCLFNBQVMsQ0FBQztBQUM1RCxjQUFNLFlBQVksa0NBQVEsT0FBTyxNQUFNO0FBRXZDLDJCQUFPLE1BQU0sVUFBVSx3QkFBd0IsUUFBUTtBQUN2RCwyQkFBTyxZQUFZLFVBQVUsZUFBZTtBQUFBLE1BQzlDLENBQUM7QUFFRCxTQUFHLHdDQUF3QyxNQUFNO0FBQy9DLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxRQUNuQjtBQUNBLGNBQU0sU0FBUyxpQkFBaUI7QUFBQSxVQUM5QixnQkFBZ0I7QUFBQSxVQUNoQixXQUFXO0FBQUEsUUFDYixDQUFDO0FBQ0QsY0FBTSxZQUFZLGtDQUFRLE9BQU8sTUFBTTtBQUV2QywyQkFBTyxNQUFNLFVBQVUsd0JBQXdCLFFBQVE7QUFDdkQsMkJBQU8sTUFBTSxVQUFVLGlCQUFpQixRQUFRO0FBQUEsTUFDbEQsQ0FBQztBQUVELGVBQVMsZ0RBQWdELE1BQU07QUFDN0QsWUFBSTtBQUVKLG1CQUFXLE1BQU07QUFDZixtQkFBUyxpQkFBaUI7QUFBQSxZQUN4QixnQkFBZ0I7QUFBQSxZQUNoQix3QkFBd0I7QUFBQSxVQUMxQixDQUFDO0FBQUEsUUFDSCxDQUFDO0FBRUQsV0FBRyx1REFBdUQsTUFBTTtBQUM5RCxnQkFBTSxlQUFlLDBEQUF1QjtBQUFBLFlBQzFDLElBQUk7QUFBQSxVQUNOLENBQUM7QUFDRCxnQkFBTSxRQUFRO0FBQUEsZUFDVCx3Q0FBYztBQUFBLFlBQ2pCLG9CQUFvQjtBQUFBLGVBQ2pCLGFBQWEsS0FBSztBQUFBLFlBQ3JCO0FBQUEsVUFDRjtBQUNBLGdCQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDZCQUFPLFlBQVksT0FBTyxRQUFRO0FBQ2xDLDZCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQUEsUUFDcEMsQ0FBQztBQUVELFdBQUcscURBQXFELE1BQU07QUFDNUQsZ0JBQU0sZUFBZSwwREFBdUI7QUFBQSxZQUMxQyxJQUFJO0FBQUEsWUFDSixZQUFZO0FBQUEsVUFDZCxDQUFDO0FBQ0QsZ0JBQU0sUUFBUTtBQUFBLGVBQ1Qsd0NBQWM7QUFBQSxZQUNqQixvQkFBb0I7QUFBQSxlQUNqQixhQUFhLEtBQUs7QUFBQSxZQUNyQjtBQUFBLFVBQ0Y7QUFDQSxnQkFBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQyw2QkFBTyxZQUFZLE9BQU8sUUFBUTtBQUNsQyw2QkFBTyxPQUFPLE9BQU8sWUFBWTtBQUFBLFFBQ25DLENBQUM7QUFBQSxNQUNILENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLDhCQUE4QixNQUFNO0FBQzNDLFNBQUcsbUNBQW1DLE1BQU07QUFDMUMsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCxVQUFVO0FBQUEsVUFDWjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsd0JBQXdCO0FBQ3ZDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsZ0NBQ0UsT0FBTyxVQUFVLFNBQVMsdUNBQWEsb0JBQ3JDLE9BQU8sU0FBUyxhQUFhLEtBQ2pDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUywrQ0FBK0MsTUFBTTtBQUM1RCxTQUFHLGlEQUFpRCxNQUFNO0FBQ3hELGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixrQ0FBa0M7QUFBQSxZQUNoQyxpQkFBSyxTQUFTLEVBQUUsU0FBUztBQUFBLFlBQ3pCLGlCQUFLLFNBQVMsRUFBRSxTQUFTO0FBQUEsVUFDM0I7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLHNDQUFzQztBQUNyRCxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFlBQVksT0FBTyxnQ0FBZ0M7QUFBQSxNQUM1RCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyxpQ0FBaUMsTUFBTTtBQUM5QyxTQUFHLDJEQUEyRCxNQUFNO0FBQ2xFLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQix1QkFBdUI7QUFBQSxZQUNyQixNQUFNLDJDQUFvQjtBQUFBLFlBQzFCLG9CQUFvQjtBQUFBLFVBQ3RCO0FBQUEsUUFDRjtBQUNBLGNBQU0sU0FBUywyQkFBMkI7QUFDMUMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxZQUFZLE9BQU8scUJBQXFCO0FBQUEsTUFDakQsQ0FBQztBQUVELFNBQUcsaURBQWlELE1BQU07QUFDeEQsY0FBTSxRQUFRLHdDQUFjO0FBQzVCLGNBQU0sU0FBUywyQkFBMkI7QUFDMUMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxVQUFVLFFBQVEsS0FBSztBQUFBLE1BQ2hDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLGtDQUFrQyxNQUFNO0FBQy9DLFNBQUcsc0RBQXNELE1BQU07QUFDN0QsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCw0QkFBNEIsNENBQWtCO0FBQUEsVUFDaEQ7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLDJCQUEyQjtBQUMxQyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLGdDQUNFLE9BQU8sVUFBVSxTQUFTLHVDQUFhLHNCQUNyQyxPQUFPLFNBQVMsK0JBQ2QsNENBQWtCLE9BQ3RCLGlDQUNGO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRyxnRUFBZ0UsTUFBTTtBQUN2RSxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLFFBQ1o7QUFDQSxjQUFNLFNBQVMsMkJBQTJCO0FBQzFDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sWUFBWSxRQUFRLEtBQUs7QUFBQSxNQUNsQyxDQUFDO0FBRUQsU0FBRywrREFBK0QsTUFBTTtBQUN0RSxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLGVBQ0w7QUFBQSxZQUNILDRCQUE0Qiw0Q0FBa0I7QUFBQSxVQUNoRDtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsMkJBQTJCO0FBQzFDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sWUFBWSxRQUFRLEtBQUs7QUFBQSxNQUNsQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyxzQ0FBc0MsTUFBTTtBQUNuRCxTQUFHLDBEQUEwRCxNQUFNO0FBQ2pFLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsZUFDTDtBQUFBLFlBQ0gsZ0NBQWdDLDRDQUFrQjtBQUFBLFVBQ3BEO0FBQUEsUUFDRjtBQUNBLGNBQU0sU0FBUywrQkFBK0I7QUFDOUMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQyxnQ0FDRSxPQUFPLFVBQVUsU0FBUyx1Q0FBYSxzQkFDckMsT0FBTyxTQUFTLG1DQUNkLDRDQUFrQixPQUN0QixpQ0FDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsb0VBQW9FLE1BQU07QUFDM0UsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLCtCQUErQjtBQUM5QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFlBQVksUUFBUSxLQUFLO0FBQUEsTUFDbEMsQ0FBQztBQUVELFNBQUcsbUVBQW1FLE1BQU07QUFDMUUsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCxnQ0FBZ0MsNENBQWtCO0FBQUEsVUFDcEQ7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLCtCQUErQjtBQUM5QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFlBQVksUUFBUSxLQUFLO0FBQUEsTUFDbEMsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsZUFBZSxNQUFNO0FBQzVCLFlBQU0scUJBQXFCO0FBQUEsV0FDdEIsd0NBQWM7QUFBQSxRQUNqQixVQUFVO0FBQUEsYUFDTDtBQUFBLFVBQ0gseUJBQXlCLENBQUMsUUFBUTtBQUFBLFVBQ2xDLFdBQVc7QUFBQSxVQUNYLGFBQWEsSUFBSSxXQUFXLENBQUMsR0FBRyxHQUFHLENBQUMsQ0FBQztBQUFBLFFBQ3ZDO0FBQUEsTUFDRjtBQUVBLFNBQUcsb0dBQW9HLE1BQU07QUFDM0csY0FBTSxXQUFXLE1BQU0sSUFBSTtBQUUzQixvQkFBWSxFQUNWLFVBQ0EsTUFBTztBQUFBLGFBQ0Ysa0JBQWtCO0FBQUEsVUFDckIsZUFBZTtBQUFBLFFBQ2pCLElBQ0EsSUFDRjtBQUVBLGNBQU0sT0FBTyxXQUFXLFFBQVE7QUFDaEMsY0FBTSxPQUFPLFdBQVcsVUFBVSxFQUFFLE1BQU0sdUJBQXVCLENBQUM7QUFFbEUsY0FBTSxTQUFTLFNBQVMsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUV4QyxjQUFNLFNBQVMsa0NBQVEsb0JBQW9CLE1BQU07QUFFakQsZ0NBQ0UsT0FBTyxVQUFVLFNBQVMsdUNBQWEsb0JBQ3JDLE9BQU8sU0FBUyxjQUNoQixDQUFDLE9BQU8sU0FBUyxRQUNyQjtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsOEJBQThCLFlBQVk7QUFDM0MsY0FBTSxZQUFZLGVBQWUsRUFDL0IsTUFBTSxJQUFJLEdBQ1YsTUFBTztBQUFBLGFBQ0Ysa0JBQWtCO0FBQUEsVUFDckIsZUFBZTtBQUFBLFFBQ2pCLElBQ0EsSUFDRjtBQUVBLGNBQU0sT0FBTyxXQUFXLGVBQWU7QUFDdkMsY0FBTSxPQUFPLFdBQVcsaUJBQWlCO0FBQUEsVUFDdkMsTUFBTTtBQUFBLFVBQ04sUUFBUSxJQUFJLFdBQVcsQ0FBQyxHQUFHLEdBQUcsQ0FBQyxDQUFDO0FBQUEsVUFDaEMsU0FBUyxDQUFDO0FBQUEsVUFDVixhQUFhO0FBQUEsVUFDYixpQkFBaUIsQ0FBQyxRQUFRO0FBQUEsUUFDNUIsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcsK0RBQStELFlBQVk7QUFDNUUsY0FBTSxZQUFZLGVBQWUsRUFDL0IsTUFBTSxJQUFJLEdBQ1YsTUFBTztBQUFBLGFBQ0Ysa0JBQWtCO0FBQUEsVUFDckIsZUFBZTtBQUFBLGVBQ1Y7QUFBQSxZQUNILFVBQVU7QUFBQSxpQkFDTCxtQkFBbUI7QUFBQSxjQUN0QixXQUFXO0FBQUEsWUFDYjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLElBQ0EsSUFDRjtBQUVBLGNBQU0sT0FBTyxXQUNYLGlCQUNBLE1BQU0sTUFBTSxFQUFFLE1BQU0sV0FBVyxDQUFDLENBQ2xDO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRywwR0FBMEcsWUFBWTtBQUN2SCx3QkFBZ0IsUUFBUSxJQUFJLE1BQU0sT0FBTyxDQUFDO0FBRTFDLGNBQU0sV0FBVyxNQUFNLElBQUk7QUFFM0IsY0FBTSxxQkFBcUIsWUFBWSxlQUFlLEVBQ3BELFVBQ0EsTUFBTztBQUFBLGFBQ0Ysa0JBQWtCO0FBQUEsVUFDckIsZUFBZTtBQUFBLFFBQ2pCLElBQ0EsSUFDRjtBQUVBLGNBQU0sZ0JBQWdCLFNBQVMsUUFBUSxDQUFDLEVBQUUsS0FBSztBQUMvQyxjQUFNLG9CQUFvQixrQ0FBUSxvQkFBb0IsYUFBYTtBQUVuRSxjQUFNO0FBRU4sY0FBTSxPQUFPLFlBQVksUUFBUTtBQUNqQyxjQUFNLE9BQU8sV0FBVyxVQUFVLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUVuRSxjQUFNLGlCQUFpQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDaEQsY0FBTSxTQUFTLGtDQUFRLG1CQUFtQixjQUFjO0FBRXhELGdDQUNFLE9BQU8sVUFBVSxTQUFTLHVDQUFhLG9CQUNyQyxDQUFDLE9BQU8sU0FBUyxjQUNqQixPQUFPLFNBQVMsUUFDcEI7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLDBGQUEwRixZQUFZO0FBQ3ZHLHdCQUFnQixRQUFRLElBQUksTUFBTSxPQUFPLENBQUM7QUFFMUMsY0FBTSxXQUFXLE1BQU0sSUFBSTtBQUUzQixjQUFNLHFCQUFxQixZQUFZLGVBQWUsRUFDcEQsVUFDQSxNQUFPO0FBQUEsYUFDRixrQkFBa0I7QUFBQSxVQUNyQixlQUFlO0FBQUEsUUFDakIsSUFDQSxJQUNGO0FBRUEsY0FBTTtBQUVOLGNBQU0sUUFBUSx3Q0FBYztBQUM1QixjQUFNLGlCQUFpQixTQUFTLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFDaEQsY0FBTSxTQUFTLGtDQUFRLE9BQU8sY0FBYztBQUU1QywyQkFBTyxZQUFZLFFBQVEsS0FBSztBQUFBLE1BQ2xDLENBQUM7QUFFRCxTQUFHLDBMQUEwTCxZQUFZO0FBQ3ZNLGNBQU0sTUFBTSxpQkFBSyxXQUFXLEtBQUssRUFBRSxTQUFTO0FBQzVDLHdCQUFnQixTQUFTO0FBQUEsVUFDdkIsSUFBSTtBQUFBLFVBQ0osS0FBSyxDQUFDLFFBQWdCO0FBQ3BCLGdCQUFJLFFBQVEsb0JBQW9CO0FBQzlCLG9CQUFNLElBQUksTUFBTSx5Q0FBeUM7QUFBQSxZQUMzRDtBQUNBLG1CQUFPLENBQUMsRUFBRSxNQUFNLElBQUksQ0FBQztBQUFBLFVBQ3ZCO0FBQUEsUUFDRixDQUFDO0FBRUQsY0FBTSxXQUFXLE1BQU0sSUFBSTtBQUUzQixjQUFNLFlBQVksZUFBZSxFQUMvQixVQUNBLE1BQU87QUFBQSxhQUNGLGtCQUFrQjtBQUFBLFVBQ3JCLGVBQWU7QUFBQSxRQUNqQixJQUNBLElBQ0Y7QUFFQSxjQUFNLE9BQU8sV0FBVyxVQUFVO0FBQUEsVUFDaEMsTUFBTTtBQUFBLFVBQ04sU0FBUyxFQUFFLGNBQWMsQ0FBQyxHQUFHLEVBQUU7QUFBQSxRQUNqQyxDQUFDO0FBRUQsY0FBTSxPQUFPLFdBQVcsVUFBVTtBQUFBLFVBQ2hDLE1BQU07QUFBQSxVQUNOLFNBQVM7QUFBQSxZQUNQLElBQUk7QUFBQSxZQUNKLFdBQVc7QUFBQSxZQUNYLHdCQUF3QjtBQUFBLFVBQzFCO0FBQUEsUUFDRixDQUFDO0FBRUQsY0FBTSxrQkFBa0IsU0FBUyxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQ2pELGNBQU0sU0FBUyxrQ0FBUSxvQkFBb0IsZUFBZTtBQUMxRCwyQkFBTyxVQUFVLE9BQU8sa0NBQWtDLENBQUMsR0FBRyxDQUFDO0FBQUEsTUFDakUsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsZ0RBQWdELE1BQU07QUFDN0QsU0FBRyxzQ0FBc0MsTUFBTTtBQUM3QyxjQUFNLFFBQVEsa0NBQ1osd0NBQWMsR0FDZCx5Q0FBeUM7QUFBQSxVQUN2QyxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0IsQ0FBQyxTQUFTO0FBQUEsUUFDNUIsQ0FBQyxDQUNIO0FBQ0EsY0FBTSxTQUFTLGtDQUNiLE9BQ0EseUNBQXlDO0FBQUEsVUFDdkMsZ0JBQWdCO0FBQUEsVUFDaEIsZ0JBQWdCLENBQUMsU0FBUztBQUFBLFFBQzVCLENBQUMsQ0FDSDtBQUNBLGNBQU0sUUFBUSxrQ0FDWixRQUNBLHlDQUF5QztBQUFBLFVBQ3ZDLGdCQUFnQjtBQUFBLFVBQ2hCLGdCQUFnQixDQUFDLFdBQVcsU0FBUztBQUFBLFFBQ3ZDLENBQUMsQ0FDSDtBQUVBLDJCQUFPLGdCQUFnQixNQUFNLGdDQUFnQztBQUFBLFVBQzNELFdBQVc7QUFBQSxZQUNULE1BQU0sd0RBQThCO0FBQUEsWUFDcEMsMEJBQTBCLENBQUMsV0FBVyxXQUFXLFNBQVM7QUFBQSxVQUM1RDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcseUNBQXlDLE1BQU07QUFDaEQsY0FBTSxRQUFnQztBQUFBLGFBQ2pDLHdDQUFjO0FBQUEsVUFDakIsZ0NBQWdDO0FBQUEsWUFDOUIsV0FBVztBQUFBLGNBQ1QsTUFBTSx3REFBOEI7QUFBQSxjQUNwQyxZQUFZLEtBQUssSUFBSTtBQUFBLFlBQ3ZCO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsa0NBQ2IsT0FDQSx5Q0FBeUM7QUFBQSxVQUN2QyxnQkFBZ0I7QUFBQSxVQUNoQixnQkFBZ0IsQ0FBQyxXQUFXLFNBQVM7QUFBQSxRQUN2QyxDQUFDLENBQ0g7QUFFQSwyQkFBTyxnQkFBZ0IsT0FBTyxnQ0FBZ0M7QUFBQSxVQUM1RCxXQUFXO0FBQUEsWUFDVCxNQUFNLHdEQUE4QjtBQUFBLFlBQ3BDLDBCQUEwQixDQUFDLFdBQVcsU0FBUztBQUFBLFVBQ2pEO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyw0Q0FBNEMsTUFBTTtBQUN6RCx5QkFDRSxXQUNBLG9CQUNnRDtBQUNoRCxjQUFNLFdBQVcsTUFBTSxJQUFJO0FBRTNCLGlFQUErQixTQUFTLEVBQ3RDLFVBQ0EsTUFBTztBQUFBLGFBQ0Ysa0JBQWtCO0FBQUEsVUFDckIsZUFBZTtBQUFBLFFBQ2pCLElBQ0EsSUFDRjtBQUVBLGVBQU8sU0FBUyxRQUFRLENBQUMsRUFBRSxLQUFLO0FBQUEsTUFDbEM7QUFoQlMsQUFrQlQsU0FBRywrQ0FBK0MsTUFBTTtBQUN0RCxjQUFNLE1BQU0sS0FBSyxJQUFJO0FBQ3JCLGNBQU0sUUFBZ0M7QUFBQSxhQUNqQyx3Q0FBYztBQUFBLFVBQ2pCLGdDQUFnQztBQUFBLFlBQzlCLFdBQVc7QUFBQSxjQUNULE1BQU0sd0RBQThCO0FBQUEsY0FDcEMsMEJBQTBCLENBQUMsV0FBVyxTQUFTO0FBQUEsWUFDakQ7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLGNBQU0sU0FBUyxVQUFVLEtBQUssS0FBSztBQUNuQyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLGdCQUFnQixPQUFPLGdDQUFnQztBQUFBLFVBQzVELFdBQVc7QUFBQSxZQUNULE1BQU0sd0RBQThCO0FBQUEsWUFDcEMsWUFBWTtBQUFBLFVBQ2Q7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxTQUFHLDhEQUE4RCxNQUFNO0FBQ3JFLGNBQU0sTUFBTSxLQUFLLElBQUk7QUFDckIsY0FBTSxRQUFnQztBQUFBLGFBQ2pDLHdDQUFjO0FBQUEsVUFDakIsZ0NBQWdDO0FBQUEsWUFDOUIsV0FBVztBQUFBLGNBQ1QsTUFBTSx3REFBOEI7QUFBQSxjQUNwQyxZQUFZLE1BQU07QUFBQSxZQUNwQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLFVBQVUsS0FBSyxLQUFLO0FBQ25DLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sZ0JBQWdCLE9BQU8sZ0NBQWdDO0FBQUEsVUFDNUQsV0FBVztBQUFBLFlBQ1QsTUFBTSx3REFBOEI7QUFBQSxZQUNwQyxZQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcsNEVBQTRFLE1BQU07QUFDbkYsY0FBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixjQUFNLFFBQWdDO0FBQUEsYUFDakMsd0NBQWM7QUFBQSxVQUNqQixnQ0FBZ0M7QUFBQSxZQUM5QixXQUFXO0FBQUEsY0FDVCxNQUFNLHdEQUE4QjtBQUFBLGNBQ3BDLFlBQVk7QUFBQSxZQUNkO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsVUFBVSxLQUFLLEtBQUs7QUFDbkMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxnQkFBZ0IsT0FBTyxnQ0FBZ0M7QUFBQSxVQUM1RCxXQUFXO0FBQUEsWUFDVCxNQUFNLHdEQUE4QjtBQUFBLFlBQ3BDLFlBQVk7QUFBQSxVQUNkO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyxxQ0FBcUMsTUFBTTtBQUM1QyxjQUFNLFFBQWdDLHdDQUFjO0FBQ3BELGNBQU0sU0FBUyxVQUFVLEtBQUssSUFBSSxHQUFHLEtBQUs7QUFDMUMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxZQUFZLFFBQVEsS0FBSztBQUFBLE1BQ2xDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLDRDQUE0QyxNQUFNO0FBQ3pELFNBQUcsZ0RBQWdELE1BQU07QUFDdkQsY0FBTSxNQUFNLEtBQUssSUFBSTtBQUNyQixjQUFNLFFBQWdDO0FBQUEsYUFDakMsd0NBQWM7QUFBQSxVQUNqQixnQ0FBZ0M7QUFBQSxZQUM5QixXQUFXO0FBQUEsY0FDVCxNQUFNLHdEQUE4QjtBQUFBLGNBQ3BDLFlBQVk7QUFBQSxZQUNkO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsa0NBQ2IsT0FDQSxpRUFBdUMsU0FBUyxDQUNsRDtBQUVBLDJCQUFPLGdCQUFnQixPQUFPLGdDQUFnQyxDQUFDLENBQUM7QUFBQSxNQUNsRSxDQUFDO0FBRUQsU0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCxjQUFNLFFBQWdDO0FBQUEsYUFDakMsd0NBQWM7QUFBQSxVQUNqQixnQ0FBZ0M7QUFBQSxZQUM5QixXQUFXO0FBQUEsY0FDVCxNQUFNLHdEQUE4QjtBQUFBLGNBQ3BDLDBCQUEwQixDQUFDLFdBQVcsU0FBUztBQUFBLFlBQ2pEO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsa0NBQ2IsT0FDQSxpRUFBdUMsU0FBUyxDQUNsRDtBQUVBLDJCQUFPLGdCQUFnQixRQUFRLEtBQUs7QUFBQSxNQUN0QyxDQUFDO0FBRUQsU0FBRyxpQ0FBaUMsTUFBTTtBQUN4QyxjQUFNLFFBQWdDLHdDQUFjO0FBQ3BELGNBQU0sU0FBUyxrQ0FDYixPQUNBLGlFQUF1QyxTQUFTLENBQ2xEO0FBRUEsMkJBQU8sZ0JBQWdCLFFBQVEsS0FBSztBQUFBLE1BQ3RDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLHlCQUF5QixNQUFNO0FBQ3RDLFNBQUcsa0JBQWtCLE1BQU07QUFDekIsY0FBTSxTQUFTLG9CQUFvQixjQUFjO0FBQ2pELGNBQU0sUUFBZ0M7QUFBQSxhQUNqQyx3Q0FBYztBQUFBLFVBQ2pCLGdCQUFnQjtBQUFBLGFBQ2IsWUFBWTtBQUFBLGlCQUNSLGtCQUFrQixTQUFTO0FBQUEsY0FDOUIsYUFBYTtBQUFBLGNBQ2IsU0FBUztBQUFBLFlBQ1g7QUFBQSxVQUNGO0FBQUEsVUFDQSx3QkFBd0I7QUFBQSxhQUNyQixpQkFBaUI7QUFBQSxpQkFDYiw4QkFBOEI7QUFBQSxjQUNqQyxZQUFZLENBQUMsZ0JBQWdCLGNBQWMsU0FBUztBQUFBLGNBQ3BELFNBQVM7QUFBQSxnQkFDUCxhQUFhO0FBQUEsY0FDZjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLGNBQU0sV0FBbUM7QUFBQSxhQUNwQyx3Q0FBYztBQUFBLFVBQ2pCLGdCQUFnQjtBQUFBLGFBQ2IsWUFBWTtBQUFBLGlCQUNSLGtCQUFrQixTQUFTO0FBQUEsY0FDOUIsYUFBYTtBQUFBLGNBQ2IsU0FBUztBQUFBLFlBQ1g7QUFBQSxVQUNGO0FBQUEsVUFDQSx3QkFBd0I7QUFBQSxhQUNyQixpQkFBaUI7QUFBQSxpQkFDYiw4QkFBOEI7QUFBQSxjQUNqQyxZQUFZLENBQUMsZ0JBQWdCLGNBQWMsU0FBUztBQUFBLGNBQ3BELFNBQVM7QUFBQSxnQkFDUCxhQUFhO0FBQUEsZ0JBQ2IsUUFBUTtBQUFBLGtCQUNOLElBQUk7QUFBQSxrQkFDSixhQUFhO0FBQUEsa0JBQ2IsU0FBUztBQUFBLGdCQUNYO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFDcEMsMkJBQU8sVUFBVSxRQUFRLFFBQVE7QUFBQSxNQUNuQyxDQUFDO0FBRUQsU0FBRyxpQkFBaUIsTUFBTTtBQUN4QixjQUFNLFNBQVMsb0JBQW9CLGNBQWM7QUFDakQsY0FBTSxRQUFnQztBQUFBLGFBQ2pDLHdDQUFjO0FBQUEsVUFDakIsZ0JBQWdCO0FBQUEsYUFDYixZQUFZO0FBQUEsaUJBQ1Isa0JBQWtCLFNBQVM7QUFBQSxjQUM5QixhQUFhO0FBQUEsWUFDZjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLHdCQUF3QjtBQUFBLGFBQ3JCLGlCQUFpQjtBQUFBLGlCQUNiLDhCQUE4QjtBQUFBLGNBQ2pDLFlBQVksQ0FBQztBQUFBLGNBQ2IsU0FBUztBQUFBLGdCQUNQLGFBQWE7QUFBQSxnQkFDYixRQUFRO0FBQUEsa0JBQ04sSUFBSTtBQUFBLGtCQUNKLGFBQWE7QUFBQSxnQkFDZjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFdBQW1DO0FBQUEsYUFDcEMsd0NBQWM7QUFBQSxVQUNqQixnQkFBZ0I7QUFBQSxhQUNiLFlBQVk7QUFBQSxpQkFDUixrQkFBa0IsU0FBUztBQUFBLGNBQzlCLGFBQWE7QUFBQSxZQUNmO0FBQUEsVUFDRjtBQUFBLFVBQ0Esd0JBQXdCO0FBQUEsYUFDckIsaUJBQWlCO0FBQUEsaUJBQ2IsOEJBQThCO0FBQUEsY0FDakMsWUFBWSxDQUFDO0FBQUEsY0FDYixTQUFTO0FBQUEsZ0JBQ1AsUUFBUTtBQUFBLGdCQUNSLGFBQWE7QUFBQSxjQUNmO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUNwQywyQkFBTyxVQUFVLFFBQVEsUUFBUTtBQUFBLE1BQ25DLENBQUM7QUFFRCxTQUFHLDZDQUE2QyxNQUFNO0FBQ3BELGNBQU0sU0FBUyxvQkFBb0IsY0FBYztBQUNqRCxjQUFNLFFBQWdDLHdDQUFjO0FBQ3BELGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sTUFBTSxRQUFRLEtBQUs7QUFBQSxNQUM1QixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyx5QkFBeUIsTUFBTTtBQUN0QyxTQUFHLGtCQUFrQixNQUFNO0FBQ3pCLGNBQU0sU0FBUyxvQkFBb0IsY0FBYztBQUNqRCxjQUFNLFFBQWdDO0FBQUEsYUFDakMsd0NBQWM7QUFBQSxVQUNqQixnQkFBZ0I7QUFBQSxhQUNiLFlBQVk7QUFBQSxpQkFDUixrQkFBa0IsU0FBUztBQUFBLGNBQzlCLGFBQWE7QUFBQSxjQUNiLFNBQVM7QUFBQSxZQUNYO0FBQUEsVUFDRjtBQUFBLFVBQ0Esd0JBQXdCO0FBQUEsYUFDckIsaUJBQWlCO0FBQUEsaUJBQ2IsOEJBQThCO0FBQUEsY0FDakMsWUFBWSxDQUFDLFdBQVcsY0FBYyxjQUFjO0FBQUEsY0FDcEQsU0FBUztBQUFBLGdCQUNQLGFBQWE7QUFBQSxjQUNmO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsY0FBTSxXQUFtQztBQUFBLGFBQ3BDLHdDQUFjO0FBQUEsVUFDakIsZ0JBQWdCO0FBQUEsYUFDYixZQUFZO0FBQUEsaUJBQ1Isa0JBQWtCLFNBQVM7QUFBQSxjQUM5QixhQUFhO0FBQUEsY0FDYixTQUFTO0FBQUEsWUFDWDtBQUFBLFVBQ0Y7QUFBQSxVQUNBLHdCQUF3QjtBQUFBLGFBQ3JCLGlCQUFpQjtBQUFBLGlCQUNiLDhCQUE4QjtBQUFBLGNBQ2pDLFlBQVksQ0FBQyxXQUFXLGNBQWMsY0FBYztBQUFBLGNBQ3BELFNBQVM7QUFBQSxnQkFDUCxhQUFhO0FBQUEsZ0JBQ2IsUUFBUTtBQUFBLGtCQUNOLElBQUk7QUFBQSxrQkFDSixhQUFhO0FBQUEsa0JBQ2IsU0FBUztBQUFBLGdCQUNYO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUVBLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFDcEMsMkJBQU8sVUFBVSxRQUFRLFFBQVE7QUFBQSxNQUNuQyxDQUFDO0FBRUQsU0FBRyxpQkFBaUIsTUFBTTtBQUN4QixjQUFNLFNBQVMsb0JBQW9CLGNBQWM7QUFDakQsY0FBTSxRQUFnQztBQUFBLGFBQ2pDLHdDQUFjO0FBQUEsVUFDakIsZ0JBQWdCO0FBQUEsYUFDYixZQUFZO0FBQUEsaUJBQ1Isa0JBQWtCLFNBQVM7QUFBQSxjQUM5QixhQUFhO0FBQUEsWUFDZjtBQUFBLFVBQ0Y7QUFBQSxVQUNBLHdCQUF3QjtBQUFBLGFBQ3JCLGlCQUFpQjtBQUFBLGlCQUNiLDhCQUE4QjtBQUFBLGNBQ2pDLFlBQVksQ0FBQztBQUFBLGNBQ2IsU0FBUztBQUFBLGdCQUNQLGFBQWE7QUFBQSxnQkFDYixRQUFRO0FBQUEsa0JBQ04sSUFBSTtBQUFBLGtCQUNKLGFBQWE7QUFBQSxnQkFDZjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFFQSxjQUFNLFdBQW1DO0FBQUEsYUFDcEMsd0NBQWM7QUFBQSxVQUNqQixnQkFBZ0I7QUFBQSxhQUNiLFlBQVk7QUFBQSxpQkFDUixrQkFBa0IsU0FBUztBQUFBLGNBQzlCLGFBQWE7QUFBQSxZQUNmO0FBQUEsVUFDRjtBQUFBLFVBQ0Esd0JBQXdCO0FBQUEsYUFDckIsaUJBQWlCO0FBQUEsaUJBQ2IsOEJBQThCO0FBQUEsY0FDakMsWUFBWSxDQUFDO0FBQUEsY0FDYixTQUFTO0FBQUEsZ0JBQ1AsUUFBUTtBQUFBLGdCQUNSLGFBQWE7QUFBQSxjQUNmO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBRUEsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUNwQywyQkFBTyxVQUFVLFFBQVEsUUFBUTtBQUFBLE1BQ25DLENBQUM7QUFFRCxTQUFHLDZDQUE2QyxNQUFNO0FBQ3BELGNBQU0sU0FBUyxvQkFBb0IsY0FBYztBQUNqRCxjQUFNLFFBQWdDLHdDQUFjO0FBQ3BELGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sTUFBTSxRQUFRLEtBQUs7QUFBQSxNQUM1QixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyxzQ0FBc0MsTUFBTTtBQUNuRCxTQUFHLGtEQUFrRCxNQUFNO0FBQ3pELGNBQU0sUUFBUSx3Q0FBYztBQUM1QixjQUFNLFNBQVMsK0JBQStCLFFBQVE7QUFDdEQsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxVQUFVLE9BQU8sdUJBQXVCO0FBQUEsVUFDN0MsTUFBTSwyQ0FBb0I7QUFBQSxVQUMxQixxQkFBcUI7QUFBQSxRQUN2QixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyx5Q0FBeUMsTUFBTTtBQUN0RCxTQUFHLHFEQUFxRCxNQUFNO0FBQzVELGNBQU0sUUFBUSx3Q0FBYztBQUM1QixjQUFNLFNBQVMsa0NBQWtDO0FBQUEsVUFDL0Msb0JBQW9CO0FBQUEsUUFDdEIsQ0FBQztBQUNELGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sVUFBVSxPQUFPLHVCQUF1QjtBQUFBLFVBQzdDLE1BQU0sMkNBQW9CO0FBQUEsVUFDMUIsb0JBQW9CO0FBQUEsUUFDdEIsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsNEJBQTRCLE1BQU07QUFDekMsU0FBRyx5Q0FBeUMsTUFBTTtBQUNoRCxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLGVBQ0w7QUFBQSxZQUNILGFBQWEsSUFBSSxXQUFXLENBQUM7QUFBQSxVQUMvQjtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsc0JBQXNCLE1BQVM7QUFDOUMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQyxnQ0FDRSxPQUFPLFVBQVUsU0FBUyx1Q0FBYSxvQkFDckMsT0FBTyxTQUFTLGdCQUFnQixNQUNwQztBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsdUNBQXVDLE1BQU07QUFDOUMsY0FBTSxTQUFTLElBQUksV0FBVyxDQUFDLEdBQUcsR0FBRyxDQUFDLENBQUM7QUFFdkMsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLHNCQUFzQixNQUFNO0FBQzNDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsZ0NBQ0UsT0FBTyxVQUFVLFNBQVMsdUNBQWEsb0JBQ3JDLE9BQU8sU0FBUyxnQkFBZ0IsTUFDcEM7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLDBCQUEwQixNQUFNO0FBQ3ZDLFNBQUcscUNBQXFDLE1BQU07QUFDNUMsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLG9CQUFvQixXQUFXO0FBQzlDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsZ0NBQ0UsT0FBTyxVQUFVLFNBQVMsdUNBQWEsb0JBQ3JDLE9BQU8sU0FBUyxjQUFjLFdBQ2xDO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUywyQkFBMkIsTUFBTTtBQUN4QyxTQUFHLG1DQUFtQyxNQUFNO0FBQzFDLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsUUFDWjtBQUVBLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLHFCQUFxQixTQUFTLENBQUM7QUFFN0QsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gsWUFBWTtBQUFBLFFBQ2QsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsb0JBQW9CLE1BQU07QUFDakMsWUFBTSxhQUFxQztBQUFBLFdBQ3RDLHdDQUFjO0FBQUEsUUFDakIsZ0JBQWdCO0FBQUEsV0FDYixZQUFZLGtCQUFrQixTQUFTO0FBQUEsV0FDdkMsZUFBZSxrQkFBa0IsWUFBWTtBQUFBLFdBQzdDLGlCQUFpQixrQkFBa0IsY0FBYztBQUFBLFFBQ3BEO0FBQUEsUUFDQSx3QkFBd0I7QUFBQSxXQUNyQixpQkFBaUI7QUFBQSxZQUNoQixzQkFBc0I7QUFBQSxZQUN0QixTQUFTO0FBQUEsY0FDUCxhQUFhO0FBQUEsWUFDZjtBQUFBLFlBQ0Esd0JBQXdCO0FBQUEsWUFDeEIsWUFBWSxDQUFDLFdBQVcsY0FBYyxjQUFjO0FBQUEsVUFDdEQ7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUVBLFNBQUcsNkJBQTZCLE1BQU07QUFDcEMsY0FBTSxZQUFZO0FBQUEsVUFDaEI7QUFBQSxVQUNBLHNCQUFzQjtBQUFBLFFBQ3hCO0FBQ0EsY0FBTSxRQUFRLGtDQUFRLFlBQVksZ0JBQWdCLFNBQVMsQ0FBQztBQUU1RCwyQkFBTyxVQUNMLE1BQU0sdUJBQXVCLGlCQUFpQixZQUM5QyxDQUFDLGNBQWMsY0FBYyxDQUMvQjtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsNkJBQTZCLE1BQU07QUFDcEMsY0FBTSxZQUFZO0FBQUEsVUFDaEI7QUFBQSxVQUNBLG1CQUFtQjtBQUFBLFFBQ3JCO0FBQ0EsY0FBTSxRQUFRLGtDQUFRLFlBQVksZ0JBQWdCLFNBQVMsQ0FBQztBQUU1RCwyQkFBTyxVQUNMLE1BQU0sdUJBQXVCLGlCQUFpQixZQUM5QyxDQUFDLFdBQVcsWUFBWSxDQUMxQjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsNkJBQTZCLE1BQU07QUFDMUMsWUFBTSxhQUFhO0FBQUEsV0FDZCx3Q0FBYztBQUFBLE1BQ25CO0FBRUEsU0FBRywyQkFBMkIsTUFBTTtBQUNsQywyQkFBTyxZQUFZLFdBQVcsbUJBQW1CO0FBQUEsTUFDbkQsQ0FBQztBQUVELFNBQUcsMEJBQTBCLE1BQU07QUFDakMsY0FBTSxzQkFBc0I7QUFBQSxVQUMxQixPQUFPO0FBQUEsVUFDUCxhQUFhO0FBQUEsVUFDYixrQkFBa0I7QUFBQSxRQUNwQjtBQUNBLGNBQU0sZ0JBQWdCLGtDQUNwQixZQUNBLHVCQUF1QixtQkFBbUIsQ0FDNUM7QUFFQSwyQkFBTyxVQUNMLGNBQWMscUJBQ2QsbUJBQ0Y7QUFFQSxjQUFNLGFBQWEsa0NBQ2pCLGVBQ0EsdUJBQXVCLE1BQVMsQ0FDbEM7QUFFQSwyQkFBTyxZQUFZLFdBQVcsbUJBQW1CO0FBQUEsTUFDbkQsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsbUJBQW1CLE1BQU07QUFDaEMsWUFBTSxhQUFxQztBQUFBLFdBQ3RDLHdDQUFjO0FBQUEsUUFDakIsb0JBQW9CO0FBQUEsV0FDakIsaUJBQWlCO0FBQUEsZUFDYiwwREFBdUI7QUFBQSxZQUMxQixJQUFJO0FBQUEsWUFDSixjQUFjO0FBQUEsWUFDZCxTQUFTO0FBQUEsVUFDWDtBQUFBLFFBQ0Y7QUFBQSxRQUNBLHdCQUF3QjtBQUFBLFdBQ3JCLGlCQUFpQjtBQUFBLFlBQ2hCLHNCQUFzQjtBQUFBLFlBQ3RCLFlBQVksQ0FBQyxXQUFXLGNBQWMsY0FBYztBQUFBLFlBQ3BELFNBQVM7QUFBQSxjQUNQLGFBQWE7QUFBQSxZQUNmO0FBQUEsWUFDQSx3QkFBd0I7QUFBQSxVQUMxQjtBQUFBLFFBQ0Y7QUFBQSxRQUNBLGdCQUFnQjtBQUFBLFdBQ2IsWUFBWTtBQUFBLGVBQ1Isa0JBQWtCLFNBQVM7QUFBQSxZQUM5QixjQUFjO0FBQUEsVUFDaEI7QUFBQSxXQUNDLGVBQWU7QUFBQSxlQUNYLGtCQUFrQixZQUFZO0FBQUEsWUFDakMsY0FBYztBQUFBLFVBQ2hCO0FBQUEsV0FDQyxpQkFBaUI7QUFBQSxlQUNiLGtCQUFrQixjQUFjO0FBQUEsWUFDbkMsY0FBYztBQUFBLFVBQ2hCO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFDQSxZQUFNLGlCQUFpQjtBQUFBLFdBQ2xCLGtCQUFrQixTQUFTO0FBQUEsUUFDOUIsTUFBTTtBQUFBLFFBQ04sY0FBYztBQUFBLE1BQ2hCO0FBRUEsU0FBRyx3QkFBd0IsTUFBTTtBQUMvQixjQUFNLFFBQVEsa0NBQ1osWUFDQSxlQUFlLFdBQVcsZ0JBQWdCLGNBQWMsQ0FDMUQ7QUFFQSwyQkFBTyxVQUFVLE1BQU0sZUFBZSxZQUFZLGNBQWM7QUFDaEUsMkJBQU8sWUFDTCxNQUFNLHVCQUF1QixpQkFBaUIsc0JBQzlDLENBQ0Y7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLGlEQUFpRCxNQUFNO0FBQ3hELGNBQU0sUUFBUSxrQ0FDWixZQUNBLGVBQWUsV0FBVyxnQkFBZ0I7QUFBQSxhQUNyQztBQUFBLFVBQ0gsU0FBUztBQUFBLFFBQ1gsQ0FBQyxDQUNIO0FBRUEsMkJBQU8sVUFDTCxNQUFNLGVBQWUsWUFDckIsV0FBVyxlQUFlLFVBQzVCO0FBQ0EsMkJBQU8sWUFDTCxNQUFNLHVCQUF1QixpQkFBaUIsc0JBQzlDLENBQ0Y7QUFBQSxNQUNGLENBQUM7QUFFRCxTQUFHLGtFQUFrRSxNQUFNO0FBQ3pFLGNBQU0sNkJBQTBDO0FBQUEsYUFDM0M7QUFBQSxVQUNILFdBQVc7QUFBQSxZQUNUO0FBQUEsY0FDRSxPQUFPO0FBQUEsY0FDUCxRQUFRO0FBQUEsY0FDUixXQUFXO0FBQUEsY0FDWCxpQkFBaUI7QUFBQSxjQUNqQixrQkFBa0I7QUFBQSxZQUNwQjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQ0EsY0FBTSxRQUFRLGtDQUNaLFlBQ0EsZUFBZSxXQUFXLGdCQUFnQiwwQkFBMEIsQ0FDdEU7QUFFQSwyQkFBTyxVQUNMLE1BQU0sZUFBZSxZQUNyQiwwQkFDRjtBQUNBLDJCQUFPLFlBQ0wsTUFBTSx1QkFBdUIsaUJBQWlCLHNCQUM5QyxDQUNGO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRywrRUFBK0UsTUFBTTtBQUN0RixjQUFNLG9CQUFvQjtBQUFBLGFBQ3JCO0FBQUEsVUFDSCxnQkFBZ0I7QUFBQSxhQUNiLFlBQVk7QUFBQSxpQkFDUixXQUFXLGVBQWU7QUFBQSxjQUM3QixXQUFXO0FBQUEsZ0JBQ1Q7QUFBQSxrQkFDRSxPQUFPO0FBQUEsa0JBQ1AsUUFBUTtBQUFBLGtCQUNSLFdBQVc7QUFBQSxrQkFDWCxpQkFBaUI7QUFBQSxrQkFDakIsa0JBQWtCO0FBQUEsZ0JBQ3BCO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUNBLGNBQU0sUUFBUSxrQ0FDWixtQkFDQSxlQUFlLFdBQVcsZ0JBQWdCLGNBQWMsQ0FDMUQ7QUFFQSwyQkFBTyxVQUFVLE1BQU0sZUFBZSxZQUFZLGNBQWM7QUFDaEUsMkJBQU8sWUFDTCxNQUFNLHVCQUF1QixpQkFBaUIsc0JBQzlDLENBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLCtCQUErQixNQUFNO0FBQzVDLFNBQUcsMENBQTBDLE1BQU07QUFDakQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLGNBQWM7QUFBQSxRQUNoQjtBQUNBLGNBQU0sU0FBUywwQkFBMEI7QUFDekMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxPQUFPLE9BQU8sWUFBWTtBQUNqQywyQkFBTyxZQUFZLE9BQU8sUUFBUTtBQUFBLE1BQ3BDLENBQUM7QUFFRCxTQUFHLDBDQUEwQyxNQUFNO0FBQ2pELGNBQU0sUUFBUSx3Q0FBYztBQUM1QixjQUFNLFNBQVMsMEJBQTBCO0FBQ3pDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sT0FBTyxPQUFPLFlBQVk7QUFDakMsMkJBQU8sWUFBWSxPQUFPLFFBQVE7QUFBQSxNQUNwQyxDQUFDO0FBRUQsU0FBRyw2Q0FBNkMsTUFBTTtBQUNwRCxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLFFBQ1o7QUFDQSxjQUFNLFNBQVMsMEJBQTBCO0FBQ3pDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sT0FBTyxPQUFPLFlBQVk7QUFDakMsMkJBQU8sWUFBWSxPQUFPLFFBQVE7QUFBQSxNQUNwQyxDQUFDO0FBQUEsSUFDSCxDQUFDO0FBRUQsYUFBUyxjQUFjLE1BQU07QUFDM0IsU0FBRyx3Q0FBd0MsTUFBTTtBQUMvQyxjQUFNLFFBQVEsd0NBQWM7QUFDNUIsY0FBTSxTQUFTLFVBQVU7QUFDekIsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxRQUFRLE9BQU8sWUFBWTtBQUNsQywyQkFBTyxZQUFZLE9BQU8sUUFBUTtBQUFBLE1BQ3BDLENBQUM7QUFFRCxTQUFHLDBDQUEwQyxNQUFNO0FBQ2pELGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixjQUFjO0FBQUEsUUFDaEI7QUFDQSxjQUFNLFNBQVMsVUFBVTtBQUN6QixjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQ2xDLDJCQUFPLFlBQVksT0FBTyxRQUFRO0FBQUEsTUFDcEMsQ0FBQztBQUVELFNBQUcsMkNBQTJDLE1BQU07QUFDbEQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLFVBQVU7QUFDekIsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxRQUFRLE9BQU8sWUFBWTtBQUNsQywyQkFBTyxZQUFZLE9BQU8sUUFBUTtBQUFBLE1BQ3BDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLG1CQUFtQixNQUFNO0FBQ2hDLFNBQUcscURBQXFELE1BQU07QUFDNUQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLGVBQWU7QUFDOUIsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxRQUFRLE9BQU8sWUFBWTtBQUNsQywyQkFBTyxVQUNMLE9BQU8sVUFDUCx3RUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsZ0dBQWdHLE1BQU07QUFDdkcsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCxZQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsZUFBZTtBQUM5QixjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQ2xDLDJCQUFPLFVBQ0wsT0FBTyxVQUNQLHdFQUNGO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRywwRkFBMEYsTUFBTTtBQUNqRyxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLFFBQ1o7QUFDQSxjQUFNLFNBQVMsZUFBZTtBQUM5QixjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQ2xDLDJCQUFPLFVBQ0wsT0FBTyxVQUNQLHdFQUNGO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRywyQ0FBMkMsTUFBTTtBQUNsRCxjQUFNLFFBQVEsd0NBQWM7QUFDNUIsY0FBTSxTQUFTLGVBQWU7QUFDOUIsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxRQUFRLE9BQU8sWUFBWTtBQUNsQywyQkFBTyxVQUNMLE9BQU8sVUFDUCx3RUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsMENBQTBDLE1BQU07QUFDakQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLGNBQWM7QUFBQSxRQUNoQjtBQUNBLGNBQU0sU0FBUyxlQUFlO0FBQzlCLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sUUFBUSxPQUFPLFlBQVk7QUFDbEMsMkJBQU8sVUFDTCxPQUFPLFVBQ1Asd0VBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLDZCQUE2QixNQUFNO0FBQzFDLFNBQUcsb0VBQW9FLE1BQU07QUFDM0UsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCxZQUFZO0FBQUEsVUFDZDtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsdUJBQXVCO0FBQ3RDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sUUFBUSxPQUFPLFlBQVk7QUFDbEMsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gsZ0JBQWdCLHFDQUFrQixJQUFJO0FBQUEsUUFDeEMsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcsOERBQThELE1BQU07QUFDckUsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLHVCQUF1QjtBQUN0QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFlBQVksUUFBUSxLQUFLO0FBQUEsTUFDbEMsQ0FBQztBQUVELFNBQUcsbUVBQW1FLE1BQU07QUFDMUUsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCxXQUFXO0FBQUEsWUFDWCxhQUFhLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQUEsVUFDcEM7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLHVCQUF1QjtBQUN0QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQ2xDLDJCQUFPLFVBQVUsT0FBTyxVQUFVO0FBQUEsYUFDN0I7QUFBQSxVQUNILFdBQVc7QUFBQSxVQUNYLGFBQWEsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFBQSxRQUNwQyxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyw4REFBOEQsTUFBTTtBQUNyRSxjQUFNLFFBQVEsd0NBQWM7QUFDNUIsY0FBTSxTQUFTLHVCQUF1QjtBQUN0QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFFBQVEsT0FBTyxZQUFZO0FBQ2xDLDJCQUFPLFVBQVUsT0FBTyxVQUFVO0FBQUEsYUFDN0I7QUFBQSxVQUNILGdCQUFnQixxQ0FBa0IsSUFBSTtBQUFBLFFBQ3hDLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxTQUFHLGdFQUFnRSxNQUFNO0FBQ3ZFLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixjQUFjO0FBQUEsUUFDaEI7QUFDQSxjQUFNLFNBQVMsdUJBQXVCO0FBQ3RDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sUUFBUSxPQUFPLFlBQVk7QUFDbEMsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gsZ0JBQWdCLHFDQUFrQixJQUFJO0FBQUEsUUFDeEMsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUFBLElBQ0gsQ0FBQztBQUVELGFBQVMsZ0NBQWdDLE1BQU07QUFDN0MsU0FBRywyREFBMkQsTUFBTTtBQUNsRSxjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLGVBQ0w7QUFBQSxZQUNILHlCQUF5QixDQUFDLE9BQU8sS0FBSztBQUFBLFVBQ3hDO0FBQUEsUUFDRjtBQUNBLGNBQU0sU0FBUywwQkFBMEI7QUFDekMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxVQUFVLE9BQU8sVUFBVTtBQUFBLGFBQzdCO0FBQUEsVUFDSCx5QkFBeUIsQ0FBQyxPQUFPLEtBQUs7QUFBQSxRQUN4QyxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyxzSkFBc0osTUFBTTtBQUM3SixjQUFNLFFBQVE7QUFBQSxhQUNULHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLGVBQ0w7QUFBQSxZQUNILFlBQVk7QUFBQSxZQUNaLHlCQUF5QixDQUFDLE9BQU8sS0FBSztBQUFBLFlBQ3RDLFdBQVc7QUFBQSxZQUNYLGFBQWEsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFBQSxVQUNwQztBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsMEJBQTBCO0FBQ3pDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gseUJBQXlCLENBQUMsT0FBTyxLQUFLO0FBQUEsVUFDdEMsV0FBVztBQUFBLFVBQ1gsYUFBYSxJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUFBLFFBQ3BDLENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxTQUFHLDZEQUE2RCxNQUFNO0FBQ3BFLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsUUFDWjtBQUNBLGNBQU0sU0FBUywwQkFBMEI7QUFDekMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxZQUFZLFFBQVEsS0FBSztBQUFBLE1BQ2xDLENBQUM7QUFBQSxJQUNILENBQUM7QUFFRCxhQUFTLHlDQUF5QyxNQUFNO0FBQ3RELHlCQUNFLElBQ0Esb0JBQzZDO0FBQzdDLGNBQU0sV0FBVyxNQUFNLElBQUk7QUFFM0IsMENBQWtDLEVBQUUsRUFDbEMsVUFDQSxNQUFPO0FBQUEsYUFDRixrQkFBa0I7QUFBQSxVQUNyQixlQUFlO0FBQUEsUUFDakIsSUFDQSxJQUNGO0FBRUEsZUFBTyxTQUFTLFFBQVEsQ0FBQyxFQUFFLEtBQUs7QUFBQSxNQUNsQztBQWhCUyxBQWtCVCxpQkFBVyxZQUFZO0FBQ3JCLGNBQU0sZ0RBQW1CO0FBQUEsVUFDdkIsRUFBRSxNQUFNLGdDQUFnQyxPQUFPLE1BQU0sU0FBUyxLQUFLO0FBQUEsVUFDbkU7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRixDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyxxQ0FBcUMsTUFBTTtBQUM1QyxjQUFNLE9BQU87QUFBQSxhQUNSLHdDQUFjO0FBQUEsVUFDakIsVUFBVTtBQUFBLFFBQ1o7QUFDQSxjQUFNLE1BQU0sa0NBQVEsTUFBTSxVQUFVLE9BQU8sSUFBSSxDQUFDO0FBQ2hELGNBQU0sTUFBTSxrQ0FBUSxLQUFLLFVBQVUsT0FBTyxHQUFHLENBQUM7QUFFOUMsMkJBQU8sVUFBVSxJQUFJLFVBQVU7QUFBQSxhQUMxQjtBQUFBLFVBQ0gseUJBQXlCLENBQUMsT0FBTyxLQUFLO0FBQUEsUUFDeEMsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcsMENBQTBDLE1BQU07QUFDakQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCx5QkFBeUIsQ0FBQyxPQUFPLEtBQUs7QUFBQSxVQUN4QztBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsVUFBVSxPQUFPLEtBQUs7QUFDckMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxVQUFVLE9BQU8sVUFBVTtBQUFBLGFBQzdCO0FBQUEsVUFDSCx5QkFBeUIsQ0FBQyxLQUFLO0FBQUEsUUFDakMsQ0FBQztBQUFBLE1BQ0gsQ0FBQztBQUVELFNBQUcsaUdBQWlHLE1BQU07QUFDeEcsY0FBTSw2QkFBNkIseUJBQU0sSUFBSSxNQUFNLG9CQUFLLENBQUM7QUFDekQsY0FBTSxVQUFVLG9CQUFLO0FBRXJCLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsZUFDTDtBQUFBLFlBQ0gseUJBQXlCO0FBQUEsVUFDM0I7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLFVBQVUsU0FBUyxLQUFLO0FBQ3ZDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gseUJBQXlCLENBQUMsR0FBRyw0QkFBNEIsT0FBTztBQUFBLFVBQ2hFLGdDQUFnQyw0Q0FBa0I7QUFBQSxRQUNwRCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyx1REFBdUQsTUFBTTtBQUM5RCxjQUFNLDZCQUE2Qix5QkFBTSxJQUFJLE1BQU0sb0JBQUssQ0FBQztBQUN6RCxjQUFNLFVBQVUsb0JBQUs7QUFFckIsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCx5QkFBeUI7QUFBQSxZQUN6QixnQ0FBZ0MsNENBQWtCO0FBQUEsVUFDcEQ7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLFVBQVUsU0FBUyxLQUFLO0FBQ3ZDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sVUFBVSxPQUFPLFVBQVU7QUFBQSxhQUM3QjtBQUFBLFVBQ0gseUJBQXlCLENBQUMsR0FBRyw0QkFBNEIsT0FBTztBQUFBLFVBQ2hFLGdDQUFnQyw0Q0FBa0I7QUFBQSxRQUNwRCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyxnREFBZ0QsWUFBWTtBQUM3RCxtQkFBVyxTQUFTLENBQUMsTUFBTSxLQUFLLEdBQUc7QUFFakMsZ0JBQU0sZ0RBQW1CO0FBQUEsWUFDdkI7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOO0FBQUEsY0FDQSxTQUFTO0FBQUEsWUFDWDtBQUFBLFlBQ0E7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOLE9BQU87QUFBQSxjQUNQLFNBQVM7QUFBQSxZQUNYO0FBQUEsVUFDRixDQUFDO0FBRUQsZ0JBQU0sUUFBUTtBQUFBLGVBQ1Qsd0NBQWM7QUFBQSxZQUNqQixVQUFVO0FBQUEsVUFDWjtBQUNBLGdCQUFNLFNBQVMsVUFBVSxvQkFBSyxHQUFHLEtBQUs7QUFFdEMsNkJBQU8sWUFBWSxPQUFPLFFBQVEseUJBQXlCLEdBQUc7QUFBQSxRQUNoRTtBQUFBLE1BQ0YsQ0FBQztBQUVELFNBQUcsaUZBQWlGLE1BQU07QUFDeEYsY0FBTSw2QkFBNkIseUJBQU0sSUFBSSxNQUFNLG9CQUFLLENBQUM7QUFDekQsY0FBTSxVQUFVLG9CQUFLO0FBRXJCLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsZUFDTDtBQUFBLFlBQ0gseUJBQXlCO0FBQUEsWUFDekIsZ0NBQWdDLDRDQUFrQjtBQUFBLFlBQ2xELDRCQUE0Qiw0Q0FBa0I7QUFBQSxVQUNoRDtBQUFBLFFBQ0Y7QUFDQSxjQUFNLFNBQVMsVUFBVSxTQUFTLEtBQUs7QUFDdkMsY0FBTSxTQUFTLGtDQUFRLE9BQU8sTUFBTTtBQUVwQywyQkFBTyxVQUFVLE9BQU8sVUFBVTtBQUFBLGFBQzdCO0FBQUEsVUFDSCx5QkFBeUIsQ0FBQyxHQUFHLDRCQUE0QixPQUFPO0FBQUEsVUFDaEUsZ0NBQWdDLDRDQUFrQjtBQUFBLFVBQ2xELDRCQUE0Qiw0Q0FBa0I7QUFBQSxRQUNoRCxDQUFDO0FBQUEsTUFDSCxDQUFDO0FBRUQsU0FBRyxtREFBbUQsTUFBTTtBQUMxRCxjQUFNLDZCQUE2Qix5QkFBTSxJQUFJLE1BQU0sb0JBQUssQ0FBQztBQUN6RCxjQUFNLFVBQVUsb0JBQUs7QUFFckIsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxlQUNMO0FBQUEsWUFDSCx5QkFBeUI7QUFBQSxZQUN6QixnQ0FBZ0MsNENBQWtCO0FBQUEsWUFDbEQsNEJBQTRCLDRDQUFrQjtBQUFBLFVBQ2hEO0FBQUEsUUFDRjtBQUNBLGNBQU0sU0FBUyxVQUFVLFNBQVMsS0FBSztBQUN2QyxjQUFNLFNBQVMsa0NBQVEsT0FBTyxNQUFNO0FBRXBDLDJCQUFPLFVBQVUsT0FBTyxVQUFVO0FBQUEsYUFDN0I7QUFBQSxVQUNILHlCQUF5QixDQUFDLEdBQUcsNEJBQTRCLE9BQU87QUFBQSxVQUNoRSxnQ0FBZ0MsNENBQWtCO0FBQUEsVUFDbEQsNEJBQTRCLDRDQUFrQjtBQUFBLFFBQ2hELENBQUM7QUFBQSxNQUNILENBQUM7QUFFRCxTQUFHLCtEQUErRCxNQUFNO0FBQ3RFLGNBQU0sUUFBUTtBQUFBLGFBQ1Qsd0NBQWM7QUFBQSxVQUNqQixVQUFVO0FBQUEsZUFDTDtBQUFBLFlBQ0gseUJBQXlCLHlCQUFNLEtBQU0sTUFBTSxvQkFBSyxDQUFDO0FBQUEsVUFDbkQ7QUFBQSxRQUNGO0FBQ0EsY0FBTSxTQUFTLFVBQVUsb0JBQUssR0FBRyxLQUFLO0FBQ3RDLGNBQU0sU0FBUyxrQ0FBUSxPQUFPLE1BQU07QUFFcEMsMkJBQU8sVUFBVSxRQUFRLEtBQUs7QUFBQSxNQUNoQyxDQUFDO0FBRUQsU0FBRyxpRkFBaUYsWUFBWTtBQUM5RixtQkFBVyxTQUFTLENBQUMsTUFBTSxLQUFLLEdBQUc7QUFFakMsZ0JBQU0sZ0RBQW1CO0FBQUEsWUFDdkIsRUFBRSxNQUFNLGdDQUFnQyxPQUFPLEtBQUssU0FBUyxLQUFLO0FBQUEsWUFDbEU7QUFBQSxjQUNFLE1BQU07QUFBQSxjQUNOO0FBQUEsY0FDQSxTQUFTO0FBQUEsWUFDWDtBQUFBLFVBQ0YsQ0FBQztBQUVELGdCQUFNLFFBQVE7QUFBQSxlQUNULHdDQUFjO0FBQUEsWUFDakIsVUFBVTtBQUFBLFVBQ1o7QUFDQSxnQkFBTSxTQUFTLFVBQVUsb0JBQUssR0FBRyxLQUFLO0FBRXRDLDZCQUFPLFlBQVksT0FBTyxRQUFRLGNBQWMsSUFBSTtBQUFBLFFBQ3REO0FBQUEsTUFDRixDQUFDO0FBRUQsU0FBRyw2R0FBNkcsWUFBWTtBQUMxSCxjQUFNLGdEQUFtQjtBQUFBLFVBQ3ZCO0FBQUEsWUFDRSxNQUFNO0FBQUEsWUFDTixPQUFPO0FBQUEsWUFDUCxTQUFTO0FBQUEsVUFDWDtBQUFBLFVBQ0E7QUFBQSxZQUNFLE1BQU07QUFBQSxZQUNOLE9BQU87QUFBQSxZQUNQLFNBQVM7QUFBQSxVQUNYO0FBQUEsUUFDRixDQUFDO0FBRUQsY0FBTSxRQUFRO0FBQUEsYUFDVCx3Q0FBYztBQUFBLFVBQ2pCLFVBQVU7QUFBQSxRQUNaO0FBQ0EsY0FBTSxTQUFTLFVBQVUsb0JBQUssR0FBRyxLQUFLO0FBRXRDLDJCQUFPLFlBQVksT0FBTyxRQUFRLGNBQWMsSUFBSTtBQUFBLE1BQ3RELENBQUM7QUFBQSxJQUNILENBQUM7QUFBQSxFQUNILENBQUM7QUFFRCxXQUFTLGtCQUFrQixNQUFNO0FBQy9CLFVBQU0sTUFBTSxrRUFBK0I7QUFBQSxNQUN6QyxJQUFJO0FBQUEsTUFDSixtQkFBbUI7QUFBQSxJQUNyQixDQUFDO0FBQ0QsVUFBTSxNQUFNLGtFQUErQjtBQUFBLE1BQ3pDLElBQUk7QUFBQSxNQUNKLG1CQUFtQjtBQUFBLElBQ3JCLENBQUM7QUFDRCxVQUFNLE1BQU0sMERBQXVCO0FBQUEsTUFDakMsSUFBSTtBQUFBLE1BQ0osTUFBTTtBQUFBLE1BQ04sbUJBQW1CO0FBQUEsSUFDckIsQ0FBQztBQUNELFVBQU0sTUFBTSwwREFBdUI7QUFBQSxNQUNqQyxJQUFJO0FBQUEsTUFDSixTQUFTO0FBQUEsTUFDVCxtQkFBbUI7QUFBQSxJQUNyQixDQUFDO0FBQ0QsVUFBTSxXQUFXLDZCQUFPO0FBQUEsU0FDbkIsa0JBQWtCO0FBQUEsTUFDckIsZUFBZTtBQUFBLFdBQ1Ysd0NBQWM7QUFBQSxRQUNqQixvQkFBb0I7QUFBQSxVQUNsQjtBQUFBLFVBQ0E7QUFBQSxVQUNBO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLHFCQUFxQjtBQUFBLFVBQ25CO0FBQUEsVUFDQTtBQUFBLFFBQ0Y7QUFBQSxRQUNBLHFCQUFxQjtBQUFBLFVBQ25CO0FBQUEsUUFDRjtBQUFBLFFBQ0Esd0JBQXdCO0FBQUEsVUFDdEI7QUFBQSxRQUNGO0FBQUEsTUFDRjtBQUFBLElBQ0YsSUFyQmlCO0FBdUJqQixPQUFHLHNCQUFzQixZQUFZO0FBQ25DLFlBQU0sV0FBVyxNQUFNLElBQUk7QUFDM0IsWUFBTSxtQkFBbUIsRUFBRSxVQUFVLFVBQVUsSUFBSTtBQUVuRCxZQUFNLENBQUMsVUFBVSxTQUFTLFFBQVEsQ0FBQyxFQUFFO0FBQ3JDLFlBQU0sWUFBWSxrQ0FBUSxTQUFTLEVBQUUsZUFBZSxNQUFNO0FBRTFELFlBQU0sT0FBTyxXQUFXLFFBQVE7QUFDaEMseUJBQU8sWUFBWSxVQUFVLG1CQUFtQixJQUFJLGlCQUFpQjtBQUNyRSx5QkFBTyxZQUFZLFVBQVUsbUJBQW1CLElBQUksaUJBQWlCO0FBQ3JFLHlCQUFPLFlBQVksVUFBVSxtQkFBbUIsSUFBSSxpQkFBaUI7QUFDckUseUJBQU8sWUFBWSxVQUFVLG1CQUFtQixJQUFJLGlCQUFpQjtBQUNyRSx5QkFBTyxZQUNMLFVBQVUsb0JBQW9CLElBQUksTUFBTSxpQkFDMUM7QUFDQSx5QkFBTyxZQUNMLFVBQVUsb0JBQW9CLElBQUksTUFBTSxpQkFDMUM7QUFDQSx5QkFBTyxZQUFZLFVBQVUsb0JBQW9CLElBQUksaUJBQWlCO0FBQ3RFLHlCQUFPLFlBQ0wsVUFBVSx1QkFBdUIsSUFBSSxpQkFDdkM7QUFDQSxhQUFPLFFBQVEsT0FBTywwQkFBMEI7QUFBQSxJQUNsRCxDQUFDO0FBQUEsRUFDSCxDQUFDO0FBQ0gsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
